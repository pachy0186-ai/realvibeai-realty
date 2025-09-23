import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  basePath: '/realty',
  async redirects() {
    return [
      {
        source: '/',
        destination: '/realty',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;