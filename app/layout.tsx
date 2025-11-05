// app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'

// ✅ Corrected import — named export
import { Analytics } from './components/Analytics'
import SocialLinks from './components/SocialLinks'
import ContactWidget from './components/ContactWidget'
import ComplianceBanner from './components/ComplianceBanner'

// Set metadata (resolves Next.js warning about metadataBase)
const site =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  'https://realvibeai-realty.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: {
    default:
      'RealVibeAI Realty — Turn cold real-estate leads into booked appointments',
    template: '%s | RealVibeAI Realty',
  },
  description:
    'Your AI Virtual ISA engages, qualifies, and books to your calendar—automatically. Limited beta: 10 seats per metro. Follow Up Boss now, Lofty/CINC next.',
  openGraph: {
    type: 'website',
    url: site,
    siteName: 'RealVibeAI Realty',
    title:
      'Turn cold real-estate leads into booked appointments—automatically',
    description:
      'AI that qualifies Hot/Warm/Cold and books to your calendar. Privacy-first. Transparent pricing.',
    images: [
      {
        url: '/og.jpg',
        width: 1200,
        height: 630,
        alt: 'RealVibeAI Realty — AI Virtual ISA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'Turn cold real-estate leads into booked appointments—automatically',
    description:
      'Your AI Virtual ISA engages, qualifies, and books to your calendar. Limited beta: 10 seats per metro.',
    images: ['/og.jpg'],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <body
        className="min-h-dvh bg-white text-neutral-900 antialiased"
        style={{ colorScheme: 'light' }}
      >
        {/* Compliance + notices */}
        <ComplianceBanner />

        {/* Page content */}
        {children}

        {/* Global footer and widgets */}
        <SocialLinks />
        <ContactWidget />

        {/* Analytics last for performance */}
        <Analytics />
      </body>
    </html>
  )
}