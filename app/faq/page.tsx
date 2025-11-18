import Link from "next/link";
import { Metadata } from "next";
import { faqMetadata } from "@/lib/seo_metadata";

export const metadata: Metadata = {
  title: faqMetadata.title,
  description: faqMetadata.description,
  keywords: faqMetadata.keywords,
  openGraph: faqMetadata.openGraph,
  twitter: faqMetadata.twitter,
};

const FAQS = [
  {
    question: "How is RealVibeAI different from lead vendors?",
    answer:
      "We do not sell leads. You already have lead sources. RealVibeAI acts as your Virtual ISA—engaging, qualifying, and booking those leads so you stop wasting time on cold conversations.",
  },
  {
    question: "Do you sell the same appointments to multiple agents?",
    answer:
      "No. Access is capped at 10 seats per metro. Your leads stay in your CRM, and the appointments we book land only on your calendar.",
  },
  {
    question: "How do you match tone to my brand?",
    answer:
      "The VibeMatch Engine builds a tone profile from your emails, call recordings, and preferences. Every AI conversation mirrors your cadence, empathy level, and compliance requirements.",
  },
  {
    question: "Is this compliant with my local regulations?",
    answer:
      "We follow TCPA and local texting/email rules. Messages are logged in your CRM + HubSpot for audit purposes, and you can disable AI follow-up for any lead with a single click.",
  },
  {
    question: "What happens if I pause or cancel?",
    answer:
      "You can pause with 15 days notice. We immediately stop contacting new leads and hand off all active conversations back to your team with full transcripts.",
  },
  {
    question: "Can you integrate with CRMs beyond Follow Up Boss?",
    answer:
      "Google Calendar and Calendly are live today. Lofty and CINC are next on the roadmap, and we offer custom integrations for Brokerage Premier clients.",
  },
];

export default function FAQPage() {
  return (
    <main className="bg-white min-h-screen">
      <section className="bg-gradient-to-b from-[#0d1c2f] to-[#13213a] text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="uppercase tracking-[0.4em] text-xs text-white/60 mb-4">FAQ</p>
          <h1 className="text-4xl font-semibold mb-4">Answers for high-performing agents and boutique brokerages.</h1>
          <p className="text-lg text-white/80">
            If you do not see your question, reach out and we will add it. Transparency beats fluff.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          {FAQS.map((faq) => (
            <div key={faq.question} className="rounded-3xl border border-gray-100 p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">{faq.question}</h2>
              <p className="text-gray-700">{faq.answer}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Need more detail?</p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-gray-900 px-6 py-3 text-white font-semibold"
          >
            Talk with our team
          </Link>
        </div>
      </section>
    </main>
  );
}
