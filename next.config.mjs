/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configurações de produção
  experimental: {
    serverActions: true,
  },
  
  // Configurações de imagem
  images: {
    domains: [
      'wibbrmofnenksvxrcqqr.supabase.co', // Supabase Storage
      'neuroshelf.com',
      'localhost'
    ],
    unoptimized: true // Para deploy estático se necessário
  },
  
  // Configurações de headers de segurança
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ]
      }
    ];
  },
  
  // Configurações de redirecionamento
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: false,
      }
    ];
  },
  
  // Configurações de reescrita para API
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*'
      }
    ];
  },
  
  // Configurações de build
  output: 'standalone', // Para deploy em servidores
  
  // Configurações de webpack
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
  
  // Configurações de ambiente
  env: {
    CUSTOM_KEY: 'neuroshelf-production',
  },
  
  // Configurações de compressão
  compress: true,
  
  // Configurações de cache
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  
  // Configurações de TypeScript
  typescript: {
    ignoreBuildErrors: false,
  },
  
  // Configurações de ESLint
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;

