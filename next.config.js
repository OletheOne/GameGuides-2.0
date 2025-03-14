/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['localhost'],
    },
    experimental: {
      serverComponentsExternalPackages: ['mongoose'],
    },
    // Add rewrites for API backend compatibility if needed
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: '/api/:path*',
        },
      ];
    },
  }
  
  module.exports = nextConfig