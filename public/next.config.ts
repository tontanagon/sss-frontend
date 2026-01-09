import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'sss-api',
        port: '8000',
        pathname: '/storage/images/**',
      },
      {
        protocol: 'https',
        hostname: 'sss-*.mininggarden.com',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5189',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'sss-api',
        port: '8000',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'sss-api',
        port: '8000',
        pathname: '/**',
      },
    ],
  },
  reactStrictMode: false,

  async rewrites() {
    return [
      {
        source: '/storage/:path*',
        destination: 'http://sss-api:8000/storage/:path*',
      },
    ]
  },

};

export default nextConfig;