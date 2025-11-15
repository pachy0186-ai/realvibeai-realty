/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  
  // Force webpack instead of turbopack
  experimental: {
    turbo: undefined,
  },
};

module.exports = nextConfig;