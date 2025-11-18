// SEO Metadata for RealVibeAI-Realty
// Based on Next.js metadata object structure for easy integration

const baseMetadata = {
  siteName: 'RealVibeAI Realty',
  url: 'https://realvibeai-realty.vercel.app',
  image: '/og-image.jpg', // Assuming a default OG image is in the public folder
  twitterCard: 'summary_large_image',
  keywords: 'AI lead qualification, real estate AI assistant, automated appointment setting, boutique brokerage AI, VibeMatch Engine',
};

type MetadataInput = {
  title: string;
  description: string;
  path?: string;
  keywords?: string;
};

// Helper to build metadata objects quickly
const buildMetadata = ({ title, description, path = '', keywords }: MetadataInput) => ({
  title,
  description,
  keywords: keywords ? `${keywords}, ${baseMetadata.keywords}` : baseMetadata.keywords,
  openGraph: {
    title,
    description,
    url: `${baseMetadata.url}${path}`,
    siteName: baseMetadata.siteName,
    images: [{ url: baseMetadata.image }],
  },
  twitter: {
    card: baseMetadata.twitterCard,
    title,
    description,
    images: [baseMetadata.image],
  },
});

// 1. Home Page (/)
export const homeMetadata = buildMetadata({
  title: 'RealVibeAI: Boutique AI for Real Estate Pros',
  description: 'Automate lead engagement, qualification, and appointment booking with RealVibeAI. Designed for top agents and boutique brokerages.',
  path: '',
});

// 2. Realty Page (/realty)
export const realtyMetadata = buildMetadata({
  title: 'RealVibeAI Realty | AI-Powered Virtual ISA for Top Agents',
  description: 'Automate conversations, match personalities, and fill your calendar. RealVibeAI Realty is the VibeMatch-enabled Virtual ISA for elite agents and boutique brokerages.',
  path: '/realty',
  keywords: 'virtual ISA, AI lead concierge, VibeMatch AI, freedom for agents',
});

// 3. Pricing Page (/pricing)
export const pricingMetadata = buildMetadata({
  title: 'RealVibeAI Pricing | Built for Agents Who Scale Relationships',
  description: 'Compare Agent Elite, Team Performer, Brokerage Premier, and Founders Private tiers. Choose the AI virtual ISA plan that protects your time and fills your pipeline.',
  path: '/pricing',
  keywords: 'Agent Elite plan, Team Performer plan, Brokerage Premier pricing, invite-only real estate AI',
});

// 4. Integrations Page (/integrations)
export const integrationsMetadata = buildMetadata({
  title: 'RealVibeAI Integrations | Follow Up Boss, Lofty, CINC',
  description: 'Sync RealVibeAI with Follow Up Boss today and Lofty/CINC soon. Keep AI conversations, qualification data, and appointments in lockstep with your CRM.',
  path: '/integrations',
  keywords: 'Follow Up Boss integration, Lofty integration, CINC integration, CRM sync',
});

// 5. Contact Page (/contact)
export const contactMetadata = buildMetadata({
  title: 'Book a RealVibeAI Fit Call | Contact RealVibeAI Realty',
  description: 'Book a 15-minute fit call or send a note to the RealVibeAI team. We respond within one business day.',
  path: '/contact',
  keywords: 'book AI demo, RealVibeAI contact, schedule Calendly, HubSpot form',
});

// 6. FAQ Page (/faq)
export const faqMetadata = buildMetadata({
  title: 'RealVibeAI FAQ | AI Lead Qualification & Appointment Setting',
  description: 'Answers to common questions about VibeMatch, exclusivity, compliance, integrations, and how RealVibeAI differs from lead vendors.',
  path: '/faq',
  keywords: 'real estate AI FAQ, appointment setting FAQ, boutique exclusivity, compliance',
});

const seoMetadata = {
  homeMetadata,
  realtyMetadata,
  pricingMetadata,
  integrationsMetadata,
  contactMetadata,
  faqMetadata,
};

export default seoMetadata;
