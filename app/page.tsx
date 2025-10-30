import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useBetaSeats } from '@/hooks/useBetaSeats';

const FEATURE_VIRTUAL_ISA = process.env.NEXT_PUBLIC_FEATURE_VIRTUAL_ISA === 'true';
const FEATURE_BETA_COUNTER = process.env.NEXT_PUBLIC_FEATURE_BETA_COUNTER === 'true';
const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL || "/realty/contact";

function BetaSeatsCounter() {
  'use client';
  const { data, loading } = useBetaSeats('General');

  if (!FEATURE_BETA_COUNTER) {
    return (
      <div className="mb-8 animate-fade-in-up">
        <p className="text-base md:text-lg text-yellow-300 font-semibold">
          Limited beta: 10 seats per metro. Apply to claim yours.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="mb-8 animate-fade-in-up">
        <p className="text-base md:text-lg text-yellow-300 font-semibold">
          Limited beta: Loading availability...
        </p>
      </div>
    );
  }

  const claimed = data?.claimed || 0;
  const total = data?.total || 10;
  const available = data?.available || 10;

  return (
    <div className="mb-8 animate-fade-in-up">
      <p className="text-base md:text-lg text-yellow-300 font-semibold">
        Limited beta: <span className="text-white">{claimed}/{total}</span> seats claimed per metro. 
        {available > 0 ? (
          <span className="text-green-300"> {available} available</span>
        ) : (
          <span className="text-red-300"> Fully booked</span>
        )}
        . Apply to claim yours.
      </p>
    </div>
  );
}

export default function Home() {
  // If Virtual ISA feature is disabled, redirect to /realty (canonical page)
  if (!FEATURE_VIRTUAL_ISA) {
    redirect("/realty");
  }

  // When feature flag is enabled, show Virtual ISA hero on homepage
  return (
    <div className="min-h-screen">
      {/* Hero Section - Mirrored from /realty */}
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
          <BetaSeatsCounter />

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

          {/* CTA to explore full site */}
          <div className="mt-12">
            <Link
              href="/realty"
              className="text-white/80 hover:text-white text-sm font-semibold transition-colors"
            >
              Explore Full Site →
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Features Section */}
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

          {/* CTA to full site */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-12 text-white">
              <h3 className="text-3xl font-bold mb-4">Ready to Fill Your Calendar with Qualified Appointments?</h3>
              <p className="text-xl mb-8 opacity-90">
                Join real estate professionals who've automated their ISA workflow and 10x'd their appointment volume.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={CALENDLY_URL}
                  className="bg-white text-purple-600 hover:bg-gray-100 font-bold text-lg px-10 py-4 rounded-full transition-all duration-300 inline-block"
                >
                  Book Your Onboarding Call
                </Link>
                <Link
                  href="/realty"
                  className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white hover:text-purple-600 font-bold text-lg px-10 py-4 rounded-full transition-all duration-300 inline-block"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
