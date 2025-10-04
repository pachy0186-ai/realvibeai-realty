export const siteConfig = {
  name: "RealVibeAI Realty",
  description: "AI-powered real estate solutions",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.realvibeai.com",
  basePath: "/realty",
  social: {
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || "https://www.facebook.com/share/1G11RPicxJ/?mibextid=wwXIfr",
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://www.linkedin.com/company/realvibe-ai-realty/",
  },
  api: {
    hubspot: {
      portalId: process.env.HUBSPOT_PORTAL_ID || "",
      formIdContact: process.env.HUBSPOT_FORM_ID_CONTACT || "",
      apiKey: process.env.HUBSPOT_API_KEY || "",
    },
    staging: {
      collovApiKey: process.env.COLLOV_API_KEY || "",
      instantdecoApiKey: process.env.INSTANTDECO_API_KEY || "",
    },
    storage: {
      blobToken: process.env.BLOB_READ_WRITE_TOKEN || "",
    },
  },
} as const;

export type SiteConfig = typeof siteConfig;