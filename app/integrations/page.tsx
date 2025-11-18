import Link from "next/link";
import { Metadata } from "next";
import { integrationsMetadata } from "@/lib/seo_metadata";

export const metadata: Metadata = {
  title: integrationsMetadata.title,
  description: integrationsMetadata.description,
  keywords: integrationsMetadata.keywords,
  openGraph: integrationsMetadata.openGraph,
  twitter: integrationsMetadata.twitter,
};

const LIVE_INTEGRATIONS = [
  {
    name: "Follow Up Boss",
    status: "Live",
    color: "from-emerald-500 to-emerald-600",
    bullets: [
      "Bi-directional sync: leads, notes, appointments",
      "Qualification data + transcripts pushed as timeline events",
      "Lead source + tags honored so automations stay intact",
    ],
  },
  {
    name: "Google Calendar + Calendly",
    status: "Live",
    color: "from-sky-500 to-indigo-500",
    bullets: [
      "AI books consults directly to your availability",
      "Automatic reminders + confirmations",
      "Routing logic per agent, team, or round robin",
    ],
  },
];

const COMING_SOON = [
  {
    name: "Lofty",
    eta: "Q2 2025",
    bullets: [
      "Lead import + Smart Plans updates",
      "Push VibeMatch scores back as tags",
    ],
  },
  {
    name: "CINC",
    eta: "Q2 2025",
    bullets: [
      "Native inbox sync",
      "Appointment + outcome logging",
    ],
  },
];

const STEPS = [
  {
    title: "Authorize",
    detail: "Secure OAuth connection or API token depending on your CRM.",
  },
  {
    title: "Map",
    detail: "Choose lead sources, assign routing rules, and set calendar availability.",
  },
  {
    title: "Sync",
    detail: "VibeMatch AI begins conversations and mirrors everything back to your CRM instantly.",
  },
];

export default function IntegrationsPage() {
  return (
    <main className="bg-white min-h-screen">
      <section className="bg-gradient-to-r from-[#0d1c2f] to-[#1f2a44] text-white py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="uppercase tracking-[0.4em] text-xs text-white/60 mb-4">Integrations</p>
          <h1 className="text-4xl md:text-5xl font-semibold mb-4">RealVibeAI stays in lockstep with your CRM.</h1>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            Follow Up Boss is live today. Lofty and CINC ship next. No data migrations. No shadow systems. Just your AI Virtual
            ISA working where your team already lives.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-8 md:grid-cols-2">
          {LIVE_INTEGRATIONS.map((integration) => (
            <div key={integration.name} className="rounded-3xl border border-gray-100 p-8 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-gray-900">{integration.name}</h2>
                <span className={`text-xs font-semibold uppercase tracking-[0.3em] bg-gradient-to-r ${integration.color} text-white px-4 py-1 rounded-full`}>
                  {integration.status}
                </span>
              </div>
              <ul className="space-y-3 text-gray-700">
                {integration.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3">
                    <span className="text-emerald-500 mt-1">•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="inline-flex mt-6 text-emerald-600 font-semibold">
                Connect {integration.name} →
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="uppercase tracking-[0.4em] text-xs text-gray-500 mb-3">Roadmap</p>
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">Coming soon</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12">
            Lofty and CINC integrations are already in pilot. Join the waitlist and we will prioritize your market.
          </p>
          <div className="grid gap-8 md:grid-cols-2 text-left">
            {COMING_SOON.map((item) => (
              <div key={item.name} className="bg-white rounded-3xl border border-gray-100 p-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-semibold text-gray-900">{item.name}</h3>
                  <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">{item.eta}</span>
                </div>
                <ul className="space-y-3 text-gray-700">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3">
                      <span className="text-sky-500 mt-1">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="uppercase tracking-[0.4em] text-xs text-gray-500 mb-3">How it works</p>
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">Three-step connection</h2>
          <div className="grid gap-8 md:grid-cols-3 text-left mt-10">
            {STEPS.map((step, index) => (
              <div key={step.title} className="p-8 border border-gray-100 rounded-3xl">
                <div className="w-12 h-12 rounded-full bg-gray-900 text-white flex items-center justify-center font-semibold mb-4">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.detail}</p>
              </div>
            ))}
          </div>
          <Link
            href="/contact?topic=integrations"
            className="inline-flex mt-10 bg-gray-900 text-white px-8 py-4 rounded-full font-semibold"
          >
            Request integration support
          </Link>
          <p className="text-sm text-gray-500 mt-4">Typical setup time: under 15 minutes. White-glove support included.</p>
        </div>
      </section>
    </main>
  );
}
