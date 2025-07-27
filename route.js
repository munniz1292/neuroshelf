import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabase } from '@/lib/supabaseClient';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    // Verificar assinatura do Stripe
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error(`❌ Erro na verificação da assinatura: ${err.message}`);
      return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    console.log(`🔥 Evento recebido: ${event.type}`);

    // Processar evento de assinatura concluída
    if (event.type === 'invoice.payment_succeeded') {
      const invoice = event.data.object;
      
      // Buscar detalhes do cliente
      const customer = await stripe.customers.retrieve(invoice.customer);
      const customerEmail = customer.email;

      if (!customerEmail) {
        console.error("❌ E-mail do cliente não encontrado.");
        return NextResponse.json({ error: 'E-mail não encontrado' }, { status: 400 });
      }

      console.log(`📧 Processando assinatura para: ${customerEmail}`);

      // Criar usuário no Supabase
      const randomPassword = Math.random().toString(36).slice(-8);

      const { error: authError } = await supabase.auth.signUp({
        email: customerEmail,
        password: randomPassword,
      });

      if (authError) {
        console.error("❌ Erro ao criar usuário no Supabase:", authError.message);
      } else {
        console.log(`🚀 USUÁRIO CRIADO COM SUCESSO! E-mail: ${customerEmail}`);
      }
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    console.error("❌ Erro geral:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request) {
  return NextResponse.json({ 
    message: 'Webhook endpoint está funcionando!',
    status: 'ativo'
  });
}
