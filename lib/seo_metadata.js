// SEO Metadata for RealVibeAI-Realty
// Based on Next.js metadata object structure for easy integration

const baseMetadata = {
  siteName: 'RealVibeAI Realty',
  url: 'https://realvibeai-realty.vercel.app',
  image: '/og-image.jpg', // Assuming a default OG image is in the public folder
  twitterCard: 'summary_large_image',
  keywords: 'AI real estate, virtual staging, real estate automation, property marketing, AI-powered realty, cost savings, speed, efficiency',
};

// 1. Home Page (/)
export const homeMetadata = {
  title: 'RealVibeAI: AI-Powered Virtual Staging & Real Estate Automation',
  description: 'Transform property listings with AI virtual staging and automate your real estate workflow. Save time and money with RealVibeAI\'s cutting-edge solutions.',
  keywords: `virtual staging, AI staging, real estate automation, property marketing, ${baseMetadata.keywords}`,
  openGraph: {
    title: 'RealVibeAI: AI-Powered Virtual Staging & Real Estate Automation',
    description: 'Transform property listings with AI virtual staging and automate your real estate workflow. Save time and money with RealVibeAI\'s cutting-edge solutions.',
    url: baseMetadata.url,
    siteName: baseMetadata.siteName,
    images: [{ url: baseMetadata.image }],
  },
  twitter: {
    card: baseMetadata.twitterCard,
    title: 'RealVibeAI: AI-Powered Virtual Staging & Real Estate Automation',
    description: 'Transform property listings with AI virtual staging and automate your real estate workflow. Save time and money with RealVibeAI\'s cutting-edge solutions.',
    images: [baseMetadata.image],
  },
};

// 2. Realty Page (/realty)
export const realtyMetadata = {
  title: 'Real Estate Automation Tools for Agents & Brokers | RealVibeAI',
  description: 'Streamline your entire real estate process with RealVibeAI\'s suite of AI automation tools. Boost efficiency, reduce costs, and close deals faster.',
  keywords: `real estate automation, agent tools, broker software, property listing management, ${baseMetadata.keywords}`,
  openGraph: {
    title: 'Real Estate Automation Tools for Agents & Brokers | RealVibeAI',
    description: 'Streamline your entire real estate process with RealVibeAI\'s suite of AI automation tools. Boost efficiency, reduce costs, and close deals faster.',
    url: `${baseMetadata.url}/realty`,
    siteName: baseMetadata.siteName,
    images: [{ url: baseMetadata.image }],
  },
  twitter: {
    card: baseMetadata.twitterCard,
    title: 'Real Estate Automation Tools for Agents & Brokers | RealVibeAI',
    description: 'Streamline your entire real estate process with RealVibeAI\'s suite of AI automation tools. Boost efficiency, reduce costs, and close deals faster.',
    images: [baseMetadata.image],
  },
};

// 3. Virtual Staging Page (/virtual-staging)
export const stagingMetadata = {
  title: 'Instant AI Virtual Staging: Fast, Affordable, and Realistic',
  description: 'Get photorealistic virtual staging in minutes, not days. RealVibeAI\'s AI technology saves you up to 90% compared to traditional staging costs.',
  keywords: `virtual staging cost, AI staging software, instant staging, photorealistic staging, ${baseMetadata.keywords}`,
  openGraph: {
    title: 'Instant AI Virtual Staging: Fast, Affordable, and Realistic',
    description: 'Get photorealistic virtual staging in minutes, not days. RealVibeAI\'s AI technology saves you up to 90% compared to traditional staging costs.',
    url: `${baseMetadata.url}/virtual-staging`,
    siteName: baseMetadata.siteName,
    images: [{ url: baseMetadata.image }],
  },
  twitter: {
    card: baseMetadata.twitterCard,
    title: 'Instant AI Virtual Staging: Fast, Affordable, and Realistic',
    description: 'Get photorealistic virtual staging in minutes, not days. RealVibeAI\'s AI technology saves you up to 90% compared to traditional staging costs.',
    images: [baseMetadata.image],
  },
};

// 4. Pricing Page (/pricing)
export const pricingMetadata = {
  title: 'Affordable Pricing for AI Virtual Staging & Realty Tools',
  description: 'Transparent and flexible pricing plans for RealVibeAI\'s virtual staging and real estate automation services. Start saving money today.',
  keywords: `AI staging pricing, real estate software cost, virtual staging plans, affordable realty tools, ${baseMetadata.keywords}`,
  openGraph: {
    title: 'Affordable Pricing for AI Virtual Staging & Realty Tools',
    description: 'Transparent and flexible pricing plans for RealVibeAI\'s virtual staging and real estate automation services. Start saving money today.',
    url: `${baseMetadata.url}/pricing`,
    siteName: baseMetadata.siteName,
    images: [{ url: baseMetadata.image }],
  },
  twitter: {
    card: baseMetadata.twitterCard,
    title: 'Affordable Pricing for AI Virtual Staging & Realty Tools',
    description: 'Transparent and flexible pricing plans for RealVibeAI\'s virtual staging and real estate automation services. Start saving money today.',
    images: [baseMetadata.image],
  },
};

// Export all metadata objects
export default {
  homeMetadata,
  realtyMetadata,
  stagingMetadata,
  pricingMetadata,
};
