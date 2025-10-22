import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing | RealVibeAI Realty",
  description:
    "Transparent pricing for AI-powered lead qualification built for solo agents and small teams. Starting at $29/mo.",
};

export default function PricingPage() {
  return (
    <div className="min-h-screen py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Transparent Pricing
          </h1>
          <p className="text-lg md:text-xl text-gray-600">
            No hidden fees, no surprise charges. Designed for solo agents and small teams.
          </p>
        </header>

        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 max-w-2xl mx-auto">
          <div className="mb-6">
            <div className="text-3xl font-bold text-purple-600">$29/mo</div>
            <div className="text-gray-500">Starter</div>
          </div>

          <ul className="space-y-4">
            {[
              "AI lead qualification (Hot / Warm / Cold)",
              "Daily lead summaries by email",
              "1 brand profile",
              "Email support",
            ].map((feature) => (
              <li key={feature} className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-500 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <Link
              href="/realty/contact"
              className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-3 rounded-full transition-colors"
            >
              Start your free trial
            </Link>
          </div>

          <p className="mt-4 text-sm text-gray-500">
            No credit card required • Cancel anytime • 30-day money-back guarantee
          </p>
        </div>

        <div className="text-center mt-12">
          <Link
            href="/realty"
            className="text-purple-600 hover:text-purple-700 font-semibold"
          >
            ← Back to Realty
          </Link>
        </div>
      </div>
    </div>
  );
}

