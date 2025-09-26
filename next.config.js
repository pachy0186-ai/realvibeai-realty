/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove any basePath - causes routing issues
  // basePath: '/realty', // REMOVED
  
  // Optional: Safe redirects only (make these idempotent)
  async redirects() {
    return [
      // Only add if you need specific redirects
      // Remove if causing issues
    ]
  },
  
  // Standard Next.js 15 App Router config
  experimental: {
    // Remove if not needed
  }
}

module.exports = nextConfig
