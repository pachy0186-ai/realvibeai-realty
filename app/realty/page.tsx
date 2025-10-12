import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { realtyMetadata } from "../../lib/seo_metadata";

export const metadata: Metadata = realtyMetadata;

export default function RealtyPage() {
  return (
    <div className="min-h-[70vh]">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-banner-realvibeai.jpg"
            alt="RealVibeAI Realty Hero Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-blue-900/80"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <Image
              src="/logo-realvibeai-realty.png"
              alt="RealVibeAI Realty Logo"
              width={120}
              height={120}
              className="mx-auto mb-6"
            />
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in-up">
            AI-Powered Lead Generation
            <span className="block text-transparent bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text">
              That Actually Works
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-4xl mx-auto animate-fade-in-up leading-relaxed">
            Stop chasing cold leads. Our intelligent system automatically qualifies prospects,
            sends personalized follow-ups, and delivers hot leads directly to your inbox.
            Built for real estate professionals who want to close more deals with less effort.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up">
            <Link
              href="/realty/pricing"
              className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold text-lg px-10 py-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
            >
              See plans & get started
            </Link>
            <Link
              href="/realty/contact"
              className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white hover:text-purple-600 font-semibold text-lg px-10 py-4 rounded-full transition-all duration-300"
            >
              Book a demo
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              The Complete Lead Generation System
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              From initial contact to closing, our AI handles every step of lead nurturing.
              Automatic qualification, personalized follow-ups, and intelligent prioritization—all working 24/7 to grow your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-purple-200">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Instant Lead Scoring</h3>
              <p className="text-gray-600 leading-relaxed">
                Every lead gets scored as Hot, Warm, or Cold within seconds. Our AI analyzes 50+ data points including urgency, budget indicators, and engagement patterns to prioritize your follow-ups.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Automated Follow-Ups</h3>
              <p className="text-gray-600 leading-relaxed">
                Personalized email sequences sent at optimal times (48h, 7 days, monthly). Each message is tailored to the lead&apos;s interest level and previous interactions.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-green-200">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2-2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Smart Analytics</h3>
              <p className="text-gray-600 leading-relaxed">
                Track conversion rates, lead quality trends, and ROI in real-time. Identify your best lead sources and optimize your marketing spend.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
