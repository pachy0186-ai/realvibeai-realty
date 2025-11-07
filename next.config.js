/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, { dev }) {
    if (!dev) {
      // Disable source maps entirely in prod
      config.devtool = false;
      // Belt & suspenders: remove SourceMapDevToolPlugin if present
      config.plugins = config.plugins.filter(
        (p) => p?.constructor?.name !== 'SourceMapDevToolPlugin'
      );
    }
    return config;
  },
  // Make sure we’re not turning on browser source maps elsewhere:
  productionBrowserSourceMaps: false
};

module.exports = nextConfig;