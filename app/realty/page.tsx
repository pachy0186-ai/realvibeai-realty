
import Image from "next/image";
import Link from "next/link";
import { Metadata } from 'next';
import BetaCounter from "@/app/components/BetaCounter";
// import { useBetaSeats } from '@/hooks/useBetaSeats'; // Phase B: live counter

import { realtyMetadata } from "../../lib/seo_metadata";

export const metadata = {
  title: realtyMetadata.title,
  description: realtyMetadata.description,
  keywords: realtyMetadata.keywords,
  openGraph: realtyMetadata.openGraph,
  twitter: realtyMetadata.twitter,
};

const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL || "/realty/contact";
const FEATURE_VIRTUAL_ISA = process.env.NEXT_PUBLIC_FEATURE_VIRTUAL_ISA === 'true';

export default function RealtyPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
          
          {FEATURE_VIRTUAL_ISA ? (
            <>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in-up leading-tight">
                Turn cold real-estate leads into
                <span className="block text-transparent bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text">
                  booked appointments—automatically
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-200 mb-4 max-w-4xl mx-auto animate-fade-in-up leading-relaxed">
                Your AI Virtual ISA engages, qualifies, and books to your calendar. Plugs straight into Follow Up Boss (Lofty/CINC next).
              </p>

              {/* Beta Limited Seats Subhead */}
              <div className="mb-8 animate-fade-in-up">
                <BetaCounter />
              </div>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up">
                <Link
                  href={CALENDLY_URL}
                  className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold text-lg px-10 py-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
                >
                  Book Onboarding Call
                </Link>
                <Link
                  href="/realty/integrations"
                  className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white hover:text-purple-600 font-semibold text-lg px-10 py-4 rounded-full transition-all duration-300"
                >
                  View Integrations
                </Link>
              </div>

              <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto text-center">
                <div className="text-gray-300">
                  <div className="text-2xl font-bold text-green-400">24/7</div>
                  <div className="text-sm">AI Virtual ISA</div>
                </div>
                <div className="text-gray-300">
                  <div className="text-2xl font-bold text-blue-400">Auto</div>
                  <div className="text-sm">Calendar Booking</div>
                </div>
                <div className="text-gray-300">
                  <div className="text-2xl font-bold text-purple-400">FUB</div>
                  <div className="text-sm">Direct Integration</div>
                </div>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in-up leading-tight">
                AI-Powered Lead Generation
                <span className="block text-transparent bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text">
                  That Actually Works
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-4xl mx-auto animate-fade-in-up leading-relaxed">
                Stop chasing cold leads. Our intelligent system automatically qualifies prospects, sends personalized follow-ups, 
                and delivers hot leads directly to your inbox. Built for real estate professionals who want to close more deals 
                with less effort.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up">
                <Link
                  href="/realty/contact"
                  className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold text-lg px-10 py-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
                >
                  Get Hot Leads Now
                </Link>
                <Link
                  href="/realty/virtual-staging"
                  className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white hover:text-purple-600 font-semibold text-lg px-10 py-4 rounded-full transition-all duration-300"
                >
                  Get AI previews in minutes & final renders in 24–48 h
                </Link>
              </div>

              <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto text-center">
                <div className="text-gray-300">
                  <div className="text-2xl font-bold text-green-400">2 min</div>
                  <div className="text-sm">Setup Time</div>
                </div>
                <div className="text-gray-300">
                  <div className="text-2xl font-bold text-blue-400">24/7</div>
                  <div className="text-sm">AI Working</div>
                </div>
                <div className="text-gray-300">
                  <div className="text-2xl font-bold text-purple-400">Significantly</div>
                  <div className="text-sm">More Closings</div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Virtual ISA Features Section (Feature Flag) */}
      {FEATURE_VIRTUAL_ISA && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Your AI Virtual ISA: Qualified Appointments on Autopilot
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                From first contact to calendar booking, our AI Virtual ISA handles every conversation. 
                Automatic qualification, intelligent follow-ups, and seamless calendar integration—all working 24/7 to fill your pipeline with qualified appointments.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-purple-200">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Auto Calendar Booking</h3>
                <p className="text-gray-600 leading-relaxed">
                  Qualified leads book directly to your Google Calendar or Calendly. No back-and-forth emails. 
                  Your AI ISA handles scheduling conflicts, time zones, and confirmation reminders.
                </p>
                <div className="mt-4 text-sm text-purple-600 font-semibold">
                  → More appointments, zero scheduling hassle
                </div>
              </div>

              {/* Feature 2 */}
              <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Instant Qualification</h3>
                <p className="text-gray-600 leading-relaxed">
                  Every conversation is analyzed in real-time. Budget, timeline, motivation—your AI ISA asks the right questions 
                  and only books appointments with qualified prospects.
                </p>
                <div className="mt-4 text-sm text-blue-600 font-semibold">
                  → Talk to buyers ready to move
                </div>
              </div>

              {/* Feature 3 */}
              <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-green-200">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">CRM Integration</h3>
                <p className="text-gray-600 leading-relaxed">
                  Plugs directly into Follow Up Boss. Lofty and CINC integrations coming soon. 
                  All conversations, qualifications, and bookings sync automatically to your CRM.
                </p>
                <div className="mt-4 text-sm text-green-600 font-semibold">
                  → One source of truth for your pipeline
                </div>
              </div>
            </div>

            {/* CTA Section within Features */}
            <div className="mt-16 text-center">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-12 text-white">
                <h3 className="text-3xl font-bold mb-4">Ready to Fill Your Calendar with Qualified Appointments?</h3>
                <p className="text-xl mb-8 opacity-90">
                  Join real estate professionals who've automated their ISA workflow and 10x'd their appointment volume.
                </p>
                <Link
                  href={CALENDLY_URL}
                  className="bg-white text-purple-600 hover:bg-gray-100 font-bold text-lg px-10 py-4 rounded-full transition-all duration-300 inline-block"
                >
                  Book Your Onboarding Call
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Legacy Lead Generation Features (No Feature Flag) */}
      {!FEATURE_VIRTUAL_ISA && (
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
                  Every lead gets scored as Hot, Warm, or Cold within seconds. Our AI analyzes 50+ data points 
                  including urgency, budget indicators, and engagement patterns to prioritize your follow-ups.
                </p>
                <div className="mt-4 text-sm text-purple-600 font-semibold">
                  → Significantly reduce time spent on unqualified leads
                </div>
              </div>

              {/* Feature 2 */}
              <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Automated Follow-Ups</h3>
                <p className="text-gray-600 leading-relaxed">
                  Personalized email sequences sent at optimal times (48h, 7 days, monthly). 
                  Each message is tailored to the lead's interest level and previous interactions.
                </p>
                <div className="mt-4 text-sm text-blue-600 font-semibold">
                  → Improved response rates
                </div>
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
                  Track conversion rates, lead quality trends, and ROI in real-time. 
                  Identify your best lead sources and optimize your marketing spend.
                </p>
                <div className="mt-4 text-sm text-green-600 font-semibold">
                  → Data-driven decisions
                </div>
              </div>
            </div>

            {/* CTA Section within Features */}
            <div className="mt-16 text-center">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-12 text-white">
                <h3 className="text-3xl font-bold mb-4">Ready to Enhance Your Lead Conversion?</h3>
                <p className="text-xl mb-8 opacity-90">
                  Join 500+ real estate professionals who've transformed their business with AI-powered lead generation.
                </p>
                <Link
                  href="/realty/contact"
                  className="bg-white text-purple-600 hover:bg-gray-100 font-bold text-lg px-10 py-4 rounded-full transition-all duration-300 inline-block"
                >
                  Start Your Free Trial Today
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get up and running in three simple steps. No technical expertise required.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {FEATURE_VIRTUAL_ISA ? "Connect Your CRM" : "Connect Your Leads"}
              </h3>
              <p className="text-gray-600">
                {FEATURE_VIRTUAL_ISA 
                  ? "Integrate with Follow Up Boss in minutes. Your AI Virtual ISA syncs all conversations and bookings automatically."
                  : "Integrate with your existing lead sources in minutes. Works with most CRMs, lead capture forms, and marketing platforms."
                }
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {FEATURE_VIRTUAL_ISA ? "AI Engages & Qualifies" : "AI Analyzes & Scores"}
              </h3>
              <p className="text-gray-600">
                {FEATURE_VIRTUAL_ISA
                  ? "Your AI ISA engages every lead via email/SMS, asks qualifying questions, and identifies appointment-ready prospects."
                  : "Our AI automatically analyzes each lead's behavior, responses, and engagement to provide instant Hot/Warm/Cold scoring with detailed reasoning."
                }
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {FEATURE_VIRTUAL_ISA ? "Appointments Booked" : "Focus on Hot Leads"}
              </h3>
              <p className="text-gray-600">
                {FEATURE_VIRTUAL_ISA
                  ? "Qualified leads book directly to your calendar. You show up to pre-qualified appointments ready to close."
                  : "Receive prioritized lead lists with clear action recommendations. Spend your time on prospects most likely to convert."
                }
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Teaser Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Choose the plan that fits your business. No hidden fees, cancel anytime.
          </p>
          <Link
            href="/realty/pricing"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold text-lg px-10 py-4 rounded-full transition-all duration-300 inline-block"
          >
            View Pricing Plans
          </Link>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trusted by Real Estate Professionals
            </h2>
            <p className="text-xl text-gray-600">
              See what our clients are saying about RealVibeAI Realty
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "RealVibeAI has completely transformed how I handle leads. I'm closing more deals than ever before."
              </p>
              <div className="font-semibold text-gray-900">Sarah M.</div>
              <div className="text-sm text-gray-600">Real Estate Agent, Miami</div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "The AI lead scoring is incredibly accurate. I no longer waste time on unqualified prospects."
              </p>
              <div className="font-semibold text-gray-900">James T.</div>
              <div className="text-sm text-gray-600">Broker, Los Angeles</div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "Setup was incredibly easy. Within 24 hours, I was getting qualified leads delivered to my inbox."
              </p>
              <div className="font-semibold text-gray-900">Maria G.</div>
              <div className="text-sm text-gray-600">Team Lead, New York</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900 to-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {FEATURE_VIRTUAL_ISA 
              ? "Ready to Automate Your Appointment Pipeline?"
              : "Ready to Transform Your Lead Generation?"
            }
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {FEATURE_VIRTUAL_ISA
              ? "Join real estate professionals who've automated their ISA workflow and 10x'd their qualified appointments."
              : "Join hundreds of real estate professionals who've transformed their business with AI."
            }
          </p>
          <Link
            href={FEATURE_VIRTUAL_ISA ? CALENDLY_URL : "/realty/contact"}
            className="bg-white text-purple-600 hover:bg-gray-100 font-bold text-lg px-12 py-5 rounded-full transition-all duration-300 inline-block shadow-2xl"
          >
            {FEATURE_VIRTUAL_ISA ? "Book Your Onboarding Call" : "Get Started Today"}
          </Link>
        </div>
      </section>
    </div>
  );
}
