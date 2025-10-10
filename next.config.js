/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: __dirname, // explicitly set project root
  },
};

module.exports = nextConfig; // CommonJS export
