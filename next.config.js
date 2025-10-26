/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [{ source: "/", destination: "/realty", permanent: true }];
  },
  // keep other settings here (images, serverExternalPackages, etc.)
};
module.exports = nextConfig;