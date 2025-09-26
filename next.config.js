/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/realty',
        permanent: false, // use false for flexibility during testing
      },
    ];
  },
};

module.exports = nextConfig;