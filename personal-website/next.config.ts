import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ['@/lib', '@/components']
  },
  
  // Configure domains for production deployment on windflash.us
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ]
  },
  
  // Environment-specific configurations
  env: {
    SITE_NAME: 'WindFlash AI Daily',
    PRODUCTION_URL: 'https://windflash.us',
  },
  
  // Image optimization for production
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'windflash.us',
      },
    ],
  },
};

export default nextConfig;
