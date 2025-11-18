import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import BetaCounter from "@/app/components/BetaCounter";
import { realtyMetadata } from "../../lib/seo_metadata";

export const metadata: Metadata = {
  title: realtyMetadata.title,
  description: realtyMetadata.description,
  keywords: realtyMetadata.keywords,
  openGraph: realtyMetadata.openGraph,
  twitter: realtyMetadata.twitter,
};

const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL || "/contact";

const PROOF_POINTS = [
  {
    stat: "40%",
    label: "of an agent's week is burned on manual lead follow-up",
    detail: "We hand it to your AI Virtual ISA so you get time back.",
  },
  {
    stat: "70%",
    label: "consult success when expectations are clear",
    detail: "VibeMatch scripts every convo in your tone before the call.",
  },
  {
    stat: "60 days",
    label: "to stabilize your pipeline",
    detail: "Most teams feel the shift within the first two months.",
  },
];

const HOW_IT_WORKS = [
  {
    title: "Qualify",
    description:
      "AI lead qualification across email + SMS. Budget, timing, motivation, and objections captured automatically.",
  },
  {
    title: "Engage",
    description:
      "Omnichannel follow-up with VibeMatch tone mirroring. Every touchpoint feels like you, even at 2am.",
  },
  {
    title: "Book",
    description:
      "Calendar sync + routing logic so the right agent meets the right lead without back-and-forth.",
  },
];

const COMPARISON = [
  {
    title: "Manual",
    tone: "bg-rose-50 border-rose-200",
    bullets: [
      "Spreadsheets, sticky notes, and late-night callbacks",
      "Leads wait days, forget you, or book elsewhere",
      "Team burnout from chasing misaligned consults",
    ],
  },
  {
    title: "Automated",
    tone: "bg-emerald-50 border-emerald-200",
    bullets: [
      "AI concierge greets every lead instantly",
      "Expectations set, documents collected, and objections cleared",
      "Your calendar fills with high-fit buyers and sellers",
    ],
  },
];

const SUCCESS_60 = [
  {
    title: "Week 1",
    detail: "Connect Follow Up Boss, import playbooks, and go live with your VibeMatch profile.",
  },
  {
    title: "Week 3",
    detail: "Pipeline clarity report shows which leads are ready, stalled, or nurture-only.",
  },
  {
    title: "Week 6",
    detail: "Calendar reliability: more qualified consults, fewer no-shows, predictable energy.",
  },
];

const VIBEMATCH_FEATURES = [
  {
    title: "Tone mirroring",
    detail: "We map your cadence, slang, and empathy markers so AI sounds like your top agent.",
  },
  {
    title: "Personality routing",
    detail: "Buyers that vibe with bold, calm, or analytical personalities route to the right person automatically.",
  },
  {
    title: "Context memory",
    detail: "Every answer travels with the lead: budget, timelines, even family details, so consults feel effortless.",
  },
];

export default function RealtyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/hero-banner-realvibeai.jpg"
            alt="RealVibeAI Realty Hero Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f1a]/90 via-[#181033]/80 to-[#0d1c2f]/85" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center text-white">
          <p className="uppercase tracking-[0.4em] text-sm text-white/60 mb-6">RealVibeAI Realty</p>
          <h1 className="text-4xl md:text-6xl font-semibold leading-tight mb-6">
            AI Virtual ISA for top agents who refuse chaos
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-sky-300 mt-3">
              Automate. Match. Fill your calendar.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-8">
            RealVibeAI handles lead engagement, VibeMatch™ personality pairing, and appointment booking
            so experienced agents and boutique brokerages reclaim their week and protect their energy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link
              href={CALENDLY_URL}
              className="bg-white text-gray-900 font-semibold px-10 py-4 rounded-full shadow-lg hover:shadow-xl transition"
            >
              Book a 15-min fit call
            </Link>
            <Link
              href="/contact?demo=vibematch"
              className="text-white/90 border border-white/40 px-8 py-3 rounded-full hover:bg-white/10 transition"
            >
              See VibeMatch in action →
            </Link>
          </div>
          <div className="max-w-md mx-auto">
            <BetaCounter />
            <p className="text-xs text-white/60 mt-3">Limited to 10 seats per metro. Once a seat is taken, we pause invites.</p>
          </div>
        </div>
      </section>

      {/* Proof layer */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PROOF_POINTS.map((point) => (
              <div key={point.stat} className="p-8 rounded-3xl border border-gray-100 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.8)]">
                <div className="text-4xl font-semibold text-gray-900 mb-3">{point.stat}</div>
                <p className="text-lg text-gray-700 mb-2">{point.label}</p>
                <p className="text-sm text-gray-500">{point.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VibeMatch Engine */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="uppercase tracking-[0.3em] text-xs text-gray-500 mb-4">VibeMatch Engine™</p>
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-6">
              Precision matching for real estate success
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              The VibeMatch Engine mirrors how your team actually speaks. Every interaction adapts to the lead's tone,
              preferred channel, and urgency so conversations feel bespoke—not bot-like.
            </p>
            <div className="space-y-4">
              {VIBEMATCH_FEATURES.map((feature) => (
                <div key={feature.title} className="bg-white border border-gray-100 rounded-2xl p-5">
                  <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 mt-2">{feature.detail}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={CALENDLY_URL}
                className="bg-gradient-to-r from-emerald-500 to-sky-500 text-white px-6 py-3 rounded-full font-semibold shadow"
              >
                See the scripts we build
              </Link>
              <Link href="/integrations" className="text-emerald-700 font-medium">
                Explore CRM integrations →
              </Link>
            </div>
          </div>
          <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900 uppercase tracking-[0.4em] mb-6">Proof Layer</h3>
            <ul className="space-y-5">
              <li>
                <p className="text-2xl font-semibold text-gray-900">24/7</p>
                <p className="text-gray-600">AI lead concierge so no inquiry is left on read.</p>
              </li>
              <li>
                <p className="text-2xl font-semibold text-gray-900">+3 hrs / day</p>
                <p className="text-gray-600">Average time reclaimed per agent who lets AI manage nurture conversations.</p>
              </li>
              <li>
                <p className="text-2xl font-semibold text-gray-900">10 seats / metro</p>
                <p className="text-gray-600">We cap access to keep performance high and protect local differentiation.</p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="uppercase tracking-[0.3em] text-xs text-gray-500 mb-3">Three pillars</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">Qualify → Engage → Book</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
            RealVibeAI becomes your Virtual ISA in one onboarding call. You provide your scripts. We infuse them with
            AI guardrails so every interaction stays compliant, on brand, and outcome-driven.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map((step, index) => (
              <div key={step.title} className="p-8 border border-gray-100 rounded-3xl shadow-sm">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gray-900 text-white flex items-center justify-center font-semibold">
                  {index + 1}
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Manual vs automated */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {COMPARISON.map((column) => (
              <div key={column.title} className={`p-8 rounded-3xl border ${column.tone}`}>
                <p className="uppercase tracking-[0.4em] text-xs text-gray-500 mb-3">{column.title}</p>
                <ul className="space-y-4 text-gray-700 text-lg">
                  {column.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3">
                      <span className="mt-1 text-sm text-gray-400">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success in 60 days */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="uppercase tracking-[0.3em] text-xs text-gray-500 mb-3">Outcome framing</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">What most teams experience within 60 days</h2>
          <p className="text-lg text-gray-600 mb-12">
            Not a guarantee—just the pattern we see when agents let RealVibeAI run conversations end-to-end.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {SUCCESS_60.map((milestone) => (
              <div key={milestone.title} className="p-8 border border-gray-100 rounded-3xl h-full">
                <p className="text-sm uppercase tracking-[0.4em] text-gray-500 mb-3">{milestone.title}</p>
                <p className="text-gray-700 text-lg">{milestone.detail}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-10">We measure everything with your CRM + HubSpot logs so you always know the inputs.</p>
        </div>
      </section>

      {/* Integrations & pricing teaser */}
      <section className="py-20 bg-gradient-to-r from-[#0d1c2f] to-[#1c2c52] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-3xl font-semibold mb-4">Plugged into your systems</h3>
            <p className="text-white/80 mb-6">
              Follow Up Boss integration is live now. Lofty and CINC follow next. Every conversation, score, and appointment syncs back to your CRM and HubSpot automatically.
            </p>
            <ul className="space-y-4 text-white/80">
              <li>• Follow Up Boss (live)</li>
              <li>• Google Calendar + Calendly</li>
              <li>• Lofty (Q2 2025) & CINC (Q2 2025)</li>
            </ul>
            <Link href="/integrations" className="inline-flex mt-6 text-emerald-200 font-semibold">
              View integration details →
            </Link>
          </div>
          <div className="bg-white/10 rounded-3xl p-8 backdrop-blur">
            <p className="uppercase tracking-[0.4em] text-xs text-white/80 mb-3">Pricing narrative</p>
            <h3 className="text-2xl font-semibold mb-4">Built for agents who scale relationships, not workloads.</h3>
            <p className="text-white/80 mb-6">
              Choose the tier that matches your roster. Every plan includes the same AI brain—only routing logic and reporting depth change.
            </p>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center bg-white text-gray-900 px-6 py-3 rounded-full font-semibold"
            >
              Explore plans
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">Ready for a calmer, more profitable pipeline?</h2>
          <p className="text-lg text-gray-600 mb-8">
            We partner with high-performing agents and boutique brokerages only. If we are not a fit, we will say so fast.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={CALENDLY_URL}
              className="bg-gray-900 text-white px-10 py-4 rounded-full font-semibold hover:bg-gray-800"
            >
              Book a 15-min fit call
            </Link>
            <Link
              href="/contact"
              className="border border-gray-300 px-8 py-4 rounded-full font-semibold text-gray-900"
            >
              Talk with our team
            </Link>
          </div>
          <p className="text-sm text-gray-500 mt-6">Human onboarding in under 24 hours. No spammy drip sequences—just clarity.</p>
        </div>
      </section>
    </div>
  );
}
