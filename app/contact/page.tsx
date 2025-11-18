import InlineContactForm from "./InlineContactForm";
import { Metadata } from "next";
import Link from "next/link";
import { contactMetadata } from "@/lib/seo_metadata";

export const metadata: Metadata = {
  title: contactMetadata.title,
  description: contactMetadata.description,
  keywords: contactMetadata.keywords,
  openGraph: contactMetadata.openGraph,
  twitter: contactMetadata.twitter,
};

const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/realvibeairealty/fit-call";
const isCalendlyEmbed = CALENDLY_URL.includes("calendly.com");

const NEXT_STEPS = [
  {
    title: "Book",
    detail: "Pick a 15-minute slot. You will meet a RealVibeAI partner—not a junior SDR.",
  },
  {
    title: "Prep",
    detail: "We send a short intake + VibeMatch questionnaire so we understand your tone and CRM setup.",
  },
  {
    title: "Decide",
    detail: "Within 24 hours you receive a seat recommendation, pricing confirmation, and integration checklist.",
  },
];

export default function ContactPage() {
  return (
    <main className="bg-white min-h-screen">
      <section className="bg-gradient-to-b from-[#0d1c2f] to-[#17223c] text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="uppercase tracking-[0.4em] text-xs text-white/60 mb-4">Contact</p>
          <h1 className="text-4xl font-semibold mb-4">Book a RealVibeAI fit call or send us a note.</h1>
          <p className="text-lg text-white/80">
            We respond within one business day. Seats are limited to 10 per metro so every conversation stays high fidelity.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Book a 15-min fit call</h2>
            <p className="text-gray-600 mb-6">
              Choose a time that works for you. We will review your current lead flow, CRM stack, and goals.
            </p>
            <div className="rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              {isCalendlyEmbed ? (
                <iframe
                  src={`${CALENDLY_URL}?embed_domain=realvibeai.com&embed_type=Inline`}
                  className="w-full h-[600px]"
                  title="RealVibeAI Calendly"
                />
              ) : (
                <div className="p-8 text-center">
                  <p className="text-gray-700 mb-4">Calendly is unavailable in this environment.</p>
                  <Link
                    href={CALENDLY_URL}
                    className="inline-flex items-center justify-center rounded-full bg-gray-900 px-6 py-3 text-white font-semibold"
                  >
                    Open Calendly
                  </Link>
                </div>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-4">Prefer email? Write us at realvibeairealty@gmail.com</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Send a note</h2>
            <p className="text-gray-600 mb-6">
              The form syncs to HubSpot + Follow Up Boss automatically so our partners see your request in real time.
            </p>
            <InlineContactForm />
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">What happens after you reach out</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {NEXT_STEPS.map((step) => (
              <div key={step.title} className="rounded-3xl border border-gray-100 bg-white p-6">
                <p className="uppercase tracking-[0.4em] text-xs text-gray-500 mb-3">{step.title}</p>
                <p className="text-gray-700">{step.detail}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 rounded-3xl border border-emerald-200 bg-emerald-50 p-6 text-emerald-900">
            We never resell leads. RealVibeAI is an AI Virtual ISA that works inside your stack to protect your brand tone.
          </div>
        </div>
      </section>
    </main>
  );
}
