'use client';

import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'NeuroShelf - Gestão Neuropsicológica',
  description: 'Sistema completo de gestão para neuropsicólogos - Estante de testes, pacientes, IA especializada e muito mais',
  keywords: 'neuropsicologia, testes neuropsicológicos, gestão, pacientes, WISC-V, D2-R, FDT, NEUPSILIN',
  authors: [{ name: 'NeuroShelf Team' }],
  creator: 'NeuroShelf',
  publisher: 'NeuroShelf',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://neuroshelf.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'NeuroShelf - Gestão Neuropsicológica',
    description: 'Sistema completo de gestão para neuropsicólogos',
    url: 'https://neuroshelf.com',
    siteName: 'NeuroShelf',
    images: [
      {
        url: '/logo-completo.png',
        width: 512,
        height: 512,
        alt: 'NeuroShelf - Gestão Neuropsicológica',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NeuroShelf - Gestão Neuropsicológica',
    description: 'Sistema completo de gestão para neuropsicólogos',
    images: ['/logo-completo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/icone.png', sizes: '32x32', type: 'image/png' },
      { url: '/icone.png', sizes: '16x16', type: 'image/png' }
    ],
    apple: [
      { url: '/icone.png', sizes: '180x180', type: 'image/png' }
    ],
  },
  themeColor: '#3B82F6',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/icone.png" />
        <link rel="apple-touch-icon" href="/icone.png" />
        <meta name="theme-color" content="#3B82F6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="NeuroShelf" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#3B82F6" />
        <meta name="msapplication-TileImage" content="/icone.png" />
      </head>
      <body className={inter.className}>
        {/* Header Global Simples - SEM LOGO */}
        <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            {/* Apenas Texto - SEM LOGO */}
            <div>
              <h1 className="text-xl font-bold text-gray-800">NeuroShelf</h1>
              <p className="text-xs text-gray-600">Sempre à mão</p>
            </div>

            {/* Status/Info */}
            <div className="hidden sm:flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600">Online</span>
              </div>
            </div>
          </div>
        </header>

        {/* Conteúdo Principal */}
        <main className="pt-16">
          {children}
        </main>

        {/* PWA Install Prompt Corrigido */}
        <div id="pwa-install-prompt" className="hidden fixed bottom-20 left-4 right-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg z-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <span className="text-sm font-bold">📱</span>
              </div>
              <div>
                <p className="font-medium">Instalar NeuroShelf</p>
                <p className="text-sm opacity-90">Acesse rapidamente do seu dispositivo</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button id="pwa-install-btn" className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-medium">
                Instalar
              </button>
              <button id="pwa-dismiss-btn" className="text-white/80 hover:text-white px-2">
                ✕
              </button>
            </div>
          </div>
        </div>

        {/* PWA Script Corrigido */}
        <script dangerouslySetInnerHTML={{
          __html: `
            // PWA Install Prompt
            let deferredPrompt;
            
            window.addEventListener('beforeinstallprompt', (e) => {
              console.log('PWA install prompt triggered');
              e.preventDefault();
              deferredPrompt = e;
              
              // Mostrar prompt personalizado
              const installPrompt = document.getElementById('pwa-install-prompt');
              if (installPrompt) {
                installPrompt.classList.remove('hidden');
              }
            });

            // Aguardar DOM carregar
            document.addEventListener('DOMContentLoaded', function() {
              const installBtn = document.getElementById('pwa-install-btn');
              const dismissBtn = document.getElementById('pwa-dismiss-btn');

              if (installBtn) {
                installBtn.addEventListener('click', async () => {
                  console.log('Install button clicked');
                  if (deferredPrompt) {
                    deferredPrompt.prompt();
                    const { outcome } = await deferredPrompt.userChoice;
                    console.log('User choice:', outcome);
                    deferredPrompt = null;
                    
                    const installPrompt = document.getElementById('pwa-install-prompt');
                    if (installPrompt) {
                      installPrompt.classList.add('hidden');
                    }
                  } else {
                    alert('Instalação não disponível neste momento. Tente adicionar à tela inicial pelo menu do navegador.');
                  }
                });
              }

              if (dismissBtn) {
                dismissBtn.addEventListener('click', () => {
                  const installPrompt = document.getElementById('pwa-install-prompt');
                  if (installPrompt) {
                    installPrompt.classList.add('hidden');
                  }
                });
              }
            });

            // Registrar Service Worker
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                  .then((registration) => {
                    console.log('SW registered: ', registration);
                  })
                  .catch((registrationError) => {
                    console.log('SW registration failed: ', registrationError);
                  });
              });
            }
          `
        }} />
      </body>
    </html>
  )
}

