# RealVibeAI Realty

AI-powered real estate solutions that help agents close more deals with virtual staging, automated lead qualification, and seamless CRM integration.

## 🚀 Quick Start

### Development

```bash
# Install dependencies
npm ci

# Start development server
npm run dev
```

Visit `http://localhost:3000/realty` to view the application.

### Build & Deploy

```bash
# Type check
npm run type-check

# Lint code
npm run lint

# Build for production
npm run build

# Start production server
npm start
```

## 🔧 Environment Variables

### Required for Production

Create a `.env.local` file with the following variables:

```bash
# Public URLs
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_FACEBOOK_URL=https://www.facebook.com/share/1G11RPicxJ/?mibextid=wwXIfr
NEXT_PUBLIC_LINKEDIN_URL=https://www.linkedin.com/company/realvibe-ai-realty/

# Private API Keys (post-launch)
HUBSPOT_PORTAL_ID=
HUBSPOT_FORM_ID_CONTACT=
HUBSPOT_API_KEY=
COLLOV_API_KEY=
INSTANTDECO_API_KEY=
BLOB_READ_WRITE_TOKEN=
```

See `.env.example` for the complete list of available variables.

## 🏗️ Architecture

- **Framework:** Next.js 15 with App Router
- **Base Path:** `/realty` (configured in `next.config.ts`)
- **Styling:** Tailwind CSS v4
- **Type Safety:** TypeScript with strict mode
- **Deployment:** Vercel with GitHub integration

## 📦 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. PRs automatically create Preview deployments
4. Merges to `main` deploy to Production

### Manual Deployment

```bash
npm run build
npm start
```

## 🔒 Code Freeze Policy

**This repository is in pre-launch code freeze.**

- ✅ **Allowed:** Content updates, SEO improvements, accessibility fixes, configuration changes
- ❌ **Restricted:** New features, major refactoring, breaking changes
- 📋 **Process:** All changes must go through PRs with required reviews
- 🎯 **Focus:** Stability and launch readiness

### Contributing

1. Create feature branch from `main`
2. Make changes following existing patterns
3. Open PR with clear description
4. Ensure CI passes and get required reviews
5. Merge only after approval

## 📁 Project Structure

```
app/                    # Next.js App Router pages
├── api/               # API routes (/lead, /staging)
├── (pages)/           # Marketing pages
└── globals.css        # Global styles

lib/                   # Utilities and configuration
├── siteConfig.ts      # Centralized site configuration

.github/               # Repository governance
├── CODEOWNERS         # Required reviewers
└── workflows/ci.yml   # Automated testing
```

## 🎯 Post-Launch Roadmap

Tracked as GitHub issues with `post-launch` label:

- Contact form integration with validation
- Pricing page with comparison tables  
- FAQ section with collapsible UI
- Schema.org structured data
- Performance optimization
- Privacy policy and legal pages

## 🎨 Customization Guide

### Updating Copy & Content

**Homepage (`app/realty/page.tsx`)**
- Hero headline and description
- Feature descriptions and benefits  
- Testimonials and social proof
- Call-to-action buttons

**Pricing (`app/realty/pricing/page.tsx`)**
- Pricing tiers and features
- Plan descriptions and benefits
- Special offers or discounts

**Solutions (`app/realty/solutions/page.tsx`)**
- Feature explanations
- Sample lead analysis examples
- Integration details

### Changing Assets

**Logo**: Replace `public/logo-realvibeai-realty.png`
- Recommended size: 200x80px
- Format: PNG with transparent background

**Hero Banner**: Replace `public/hero-banner-realvibeai.jpg`
- Recommended size: 1920x600px
- Format: JPG or WebP for best performance

**Favicon**: Add `public/favicon.ico`

### Updating Contact Information

**Email**: Update environment variables:
```bash
CONTACT_TO=your-email@domain.com
NEXT_PUBLIC_CONTACT_EMAIL=your-email@domain.com
```

**Phone/Address**: Update in:
- `app/realty/contact/page.tsx`
- `app/layout.tsx` (footer)

### Pricing Configuration

Update pricing in `app/realty/pricing/page.tsx`:
```tsx
const pricingPlans = [
  {
    name: "Starter",
    price: "$49", 
    features: ["Feature 1", "Feature 2"]
  }
];
```

## 📊 Analytics Setup

### Google Analytics 4
1. Create GA4 property
2. Add to Vercel environment variables:
   ```
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```

### Microsoft Clarity
1. Create Clarity project  
2. Add to Vercel environment variables:
   ```
   NEXT_PUBLIC_CLARITY_ID=xxxxxxxxxx
   ```

### Tracked Events
- `lead_form_submit` - Contact form submissions
- `cta_click` - Call-to-action button clicks
- `pricing_view` - Pricing page views

## 📞 Support

For questions about this codebase, contact @pachy0186-ai.

For business inquiries and support, email: realvibeairealty@gmail.com# RealVibeAI Realty - Last updated: Fri Sep 26 11:12:54 EDT 2025
