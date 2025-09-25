/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/realty',
  async redirects() {
    return [{ source: '/', destination: '/realty', permanent: true }];
  },
};

module.exports = nextConfig;


