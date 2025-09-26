/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    // Safety: if anything still hits /realty, send it home
    return [
      { source: '/realty', destination: '/', permanent: true },
      { source: '/realty/:path*', destination: '/:path*', permanent: true },
    ];
  },
};
module.exports = nextConfig;