import Link from "next/link";
import { Metadata } from "next";
import { pricingMetadata } from "@/lib/seo_metadata";

export const metadata: Metadata = {
  title: pricingMetadata.title,
  description: pricingMetadata.description,
  keywords: pricingMetadata.keywords,
  openGraph: pricingMetadata.openGraph,
  twitter: pricingMetadata.twitter,
};

const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL || "/contact";

type Tier = {
  name: string;
  price: string;
  cadence: string;
  description: string;
  badge?: string;
  features: string[];
  highlight?: boolean;
  disclaimer?: string;
};

const TIERS: Tier[] = [
  {
    name: "Agent Elite",
    price: "$147",
    cadence: "/mo",
    description: "Solo agents who need an AI virtual ISA to qualify leads and fill their personal calendar.",
    badge: "Solo",
    features: [
      "1 seat + VibeMatch profile",
      "Follow Up Boss + Calendly sync",
      "AI qualification transcripts in your inbox",
    ],
  },
  {
    name: "Team Performer",
    price: "$397",
    cadence: "/mo",
    description: "Small teams that want shared pipelines, routing logic, and transparency across 2-5 agents.",
    badge: "Teams",
    highlight: true,
    features: [
      "Up to 5 seats with routing",
      "Round-robin + priority rules",
      "Weekly pipeline clarity report",
    ],
  },
  {
    name: "Brokerage Premier",
    price: "$997",
    cadence: "/mo",
    description: "Boutique brokerages needing brokerage-level oversight, multi-agent coordination, and concierge support.",
    badge: "Brokerage",
    features: [
      "10 seats included + API access",
      "Custom data warehouse sync",
      "Dedicated success architect",
    ],
  },
  {
    name: "Founders Private",
    price: "$597",
    cadence: "/mo",
    description: "Invite-only partners in metros where we have open seats. Built for operators who demand exclusivity.",
    badge: "Invite only",
    disclaimer: "Limited to 10 seats per metro. NDA + interview required.",
    features: [
      "Metro exclusivity",
      "Custom intent playbooks",
      "Early access to Lofty + CINC",
    ],
  },
];

export default function PricingPage() {
  return (
    <main className="bg-white min-h-screen">
      <section className="bg-gradient-to-b from-[#0f172a] to-[#111827] text-white py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="uppercase tracking-[0.4em] text-xs text-white/60 mb-4">Pricing</p>
          <h1 className="text-4xl md:text-5xl font-semibold mb-4">Built for agents who scale relationships, not workloads.</h1>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            Every tier unlocks the same AI brain. You choose the level of routing, reporting, and human support required
            to keep your calendar full of high-fit conversations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Link href={CALENDLY_URL} className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold">
              Book a fit call
            </Link>
            <Link href="/contact" className="px-8 py-4 rounded-full border border-white/30 text-white font-semibold">
              Request pricing breakdown →
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-3xl border p-8 flex flex-col shadow-sm ${
                tier.highlight ? "border-emerald-400 shadow-xl" : "border-gray-100"
              }`}
            >
              {tier.badge && (
                <span className="uppercase tracking-[0.3em] text-xs text-gray-500 mb-4">{tier.badge}</span>
              )}
              <h2 className="text-2xl font-semibold text-gray-900">{tier.name}</h2>
              <p className="text-gray-600 mt-3 mb-6">{tier.description}</p>
              <div className="text-4xl font-semibold text-gray-900">
                {tier.price}
                <span className="text-base font-normal text-gray-500">{tier.cadence}</span>
              </div>
              <ul className="mt-6 space-y-3 text-gray-700 flex-1">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className="text-emerald-500 mt-1">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              {tier.disclaimer && <p className="text-xs text-gray-500 mt-6">{tier.disclaimer}</p>}
              <Link
                href={tier.name === "Founders Private" ? "/contact?tier=founders" : CALENDLY_URL}
                className={`mt-8 text-center px-6 py-3 rounded-full font-semibold ${
                  tier.highlight
                    ? "bg-gradient-to-r from-emerald-500 to-sky-500 text-white"
                    : "border border-gray-300 text-gray-900"
                }`}
              >
                {tier.name === "Founders Private" ? "Apply for invite" : "Get started"}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-12 md:grid-cols-2">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Every plan includes</h3>
            <ul className="space-y-3 text-gray-700">
              <li>• VibeMatch Engine onboarding + tone calibration</li>
              <li>• AI appointment setting with Google Calendar / Calendly</li>
              <li>• Follow Up Boss integration & HubSpot logging</li>
              <li>• Compliance review + conversation archives</li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Add-ons available</h3>
            <ul className="space-y-3 text-gray-700">
              <li>• Seat packs for larger teams</li>
              <li>• Done-for-you nurture playbook creation</li>
              <li>• White-glove data migration</li>
              <li>• Metro exclusivity extensions</li>
            </ul>
          </div>
        </div>
        <p className="text-center text-sm text-gray-500 mt-12">
          Billing is monthly. Cancel anytime with 15 days notice. No lead resale, ever.
        </p>
      </section>
    </main>
  );
}
