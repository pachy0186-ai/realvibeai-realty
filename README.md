# RealVibeAI Realty

AI-powered real estate solutions that help agents close more deals with virtual staging, automated lead qualification, and seamless CRM integration.

##  Quick Start

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

##  Environment Variables

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

##  Architecture

- **Framework:** Next.js 15 with App Router
- **Base Path:** `/realty` (configured in `next.config.ts`)
- **Styling:** Tailwind CSS v4
- **Type Safety:** TypeScript with strict mode
- **Deployment:** Vercel with GitHub integration

##  Deployment

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

##  Code Freeze Policy

**This repository is in pre-launch code freeze.**

-  **Allowed:** Content updates, SEO improvements, accessibility fixes, configuration changes
-  **Restricted:** New features, major refactoring, breaking changes
-  **Process:** All changes must go through PRs with required reviews
-  **Focus:** Stability and launch readiness

### Contributing

1. Create feature branch from `main`
2. Make changes following existing patterns
3. Open PR with clear description
4. Ensure CI passes and get required reviews
5. Merge only after approval

##  Project Structure

```
app/                    # Next.js App Router pages
 api/               # API routes (/lead, /staging)
 (pages)/           # Marketing pages
 globals.css        # Global styles

lib/                   # Utilities and configuration
 siteConfig.ts      # Centralized site configuration

.github/               # Repository governance
 CODEOWNERS         # Required reviewers
 workflows/ci.yml   # Automated testing
```

##  Post-Launch Roadmap

Tracked as GitHub issues with `post-launch` label:

- Contact form integration with validation
- Pricing page with comparison tables  
- FAQ section with collapsible UI
- Schema.org structured data
- Performance optimization
- Privacy policy and legal pages

##  Support

For questions about this codebase, contact @pachy0186-ai.