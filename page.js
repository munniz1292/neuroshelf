'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter, useSearchParams } from 'next/navigation';

export default function UpgradePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const feature = searchParams.get('feature');

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }
      setUser(user);
      setLoading(false);
    };
    getUser();
  }, []);

  const getFeatureInfo = (feature) => {
    switch (feature) {
      case 'ia':
        return {
          icon: '🧠',
          title: 'IA Neuropsicológica',
          description: 'Converse com a Neura, sua assistente especializada em neuropsicologia',
          benefits: [
            'Respostas especializadas em neuropsicologia',
            'Acesso ao DSM-5-TR integrado',
            'Suporte para diagnósticos',
            'Orientações sobre protocolos'
          ]
        };
      case 'pacientes':
        return {
          icon: '👤',
          title: 'Gestão de Pacientes',
          description: 'Gerencie protocolos e histórico de atendimentos',
          benefits: [
            'Protocolos dinâmicos por paciente',
            'Histórico completo de sessões',
            'Anotações detalhadas',
            'Organização por idade e status'
          ]
        };
      default:
        return {
          icon: '⭐',
          title: 'Funcionalidades Premium',
          description: 'Acesse todas as funcionalidades avançadas do NeuroShelf',
          benefits: [
            'IA Neuropsicológica completa',
            'Gestão ilimitada de pacientes',
            'Estante de testes completa',
            'Suporte prioritário'
          ]
        };
    }
  };

  const featureInfo = getFeatureInfo(feature);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => router.back()}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Upgrade Premium</h1>
                <p className="text-sm text-gray-600">Desbloqueie funcionalidades avançadas</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Feature Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">{featureInfo.icon}</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{featureInfo.title}</h2>
            <p className="text-lg text-gray-600 mb-6">{featureInfo.description}</p>
            
            {/* Benefits */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 mb-8">
              <h3 className="font-semibold text-gray-900 mb-4">✨ O que você terá acesso:</h3>
              <ul className="space-y-3">
                {featureInfo.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <span className="text-green-500 mr-3">✓</span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Pricing */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Plano Mensal */}
            <div className="border border-gray-200 rounded-xl p-6 hover:border-blue-300 transition-colors">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Plano Mensal</h3>
                <div className="text-3xl font-bold text-blue-600 mb-4">
                  R$ 39,90<span className="text-lg text-gray-500">/mês</span>
                </div>
                <button
                  onClick={() => router.push('/pagamento?plan=monthly')}
                  className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Assinar Mensal
                </button>
              </div>
            </div>

            {/* Plano Anual */}
            <div className="border-2 border-purple-300 rounded-xl p-6 relative bg-gradient-to-br from-purple-50 to-blue-50">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                  25% OFF
                </span>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Plano Anual</h3>
                <div className="text-3xl font-bold text-purple-600 mb-1">
                  R$ 29,90<span className="text-lg text-gray-500">/mês</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">Cobrado R$ 358,80 anualmente</p>
                <button
                  onClick={() => router.push('/pagamento?plan=yearly')}
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all font-medium"
                >
                  Assinar Anual
                </button>
              </div>
            </div>
          </div>

          {/* Cupom Option */}
          <div className="text-center border-t border-gray-200 pt-6">
            <p className="text-gray-600 mb-4">Tem um cupom de desconto?</p>
            <button
              onClick={() => router.push('/cupom')}
              className="inline-flex items-center space-x-2 px-6 py-3 border border-purple-300 text-purple-700 rounded-lg hover:bg-purple-50 transition-colors font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
              <span>Ativar Cupom</span>
            </button>
          </div>
        </div>

        {/* Freemium Info */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 mb-3">🎁 Você já tem acesso gratuito a:</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Dashboard completo
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              20 testes na estante
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Links úteis especializados
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Busca de conteúdos
            </li>
          </ul>
        </div>
      </div>

      {/* Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex justify-around max-w-md mx-auto">
          <a href="/dashboard" className="flex flex-col items-center py-2 px-3 text-gray-600 hover:text-blue-600">
            <span className="text-xl mb-1">🏠</span>
            <span className="text-xs">Início</span>
          </a>
          <a href="/estante" className="flex flex-col items-center py-2 px-3 text-gray-600 hover:text-blue-600">
            <span className="text-xl mb-1">📋</span>
            <span className="text-xs">Estante</span>
          </a>
          <a href="/pacientes" className="flex flex-col items-center py-2 px-3 text-gray-600 hover:text-blue-600">
            <span className="text-xl mb-1">👤</span>
            <span className="text-xs">Pacientes</span>
          </a>
          <a href="/links" className="flex flex-col items-center py-2 px-3 text-gray-600 hover:text-blue-600">
            <span className="text-xl mb-1">🔗</span>
            <span className="text-xs">Links</span>
          </a>
          <a href="/ia" className="flex flex-col items-center py-2 px-3 text-gray-600 hover:text-blue-600">
            <span className="text-xl mb-1">🧠</span>
            <span className="text-xs">IA</span>
          </a>
          <a href="/buscar" className="flex flex-col items-center py-2 px-3 text-gray-600 hover:text-blue-600">
            <span className="text-xl mb-1">🔍</span>
            <span className="text-xs">Buscar</span>
          </a>
        </div>
      </div>
    </div>
  );
}

