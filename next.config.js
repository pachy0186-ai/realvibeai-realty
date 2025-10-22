/** @type {import('next').NextConfig} */
const nextConfig = {
  // silences the wrong-root Turbopack warning
  turbopack: { root: __dirname },

  // prevents nodemailer from being bundled into client code
  serverExternalPackages: ['nodemailer'],
};

module.exports = nextConfig;