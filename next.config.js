/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/realty',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;

