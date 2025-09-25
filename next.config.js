/** @type {import('next').NextConfig} */
const nextConfig = {
  // basePath removed
  async redirects() {
    return [
      // Optional safety: if anything still links to /realty, send it to /
      { source: '/realty', destination: '/', permanent: true },
      { source: '/realty/:path*', destination: '/:path*', permanent: true },
    ];
  },
};

module.exports = nextConfig;
