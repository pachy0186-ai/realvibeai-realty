/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: __dirname, // explicitly set project root
  },
  serverExternalPackages: ["nodemailer"], // don't bundle server-only lib
};

module.exports = nextConfig; // CommonJS export

