import Image from "next/image";
import Link from "next/link";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "CRM Integrations | RealVibeAI Realty",
  description: "Connect your AI Virtual ISA with Follow Up Boss, Lofty, CINC, and more. Seamless CRM integration for automated lead qualification and appointment booking.",
  keywords: "Follow Up Boss integration, Lofty CRM, CINC integration, real estate CRM, AI ISA integration",
};

const FEATURE_VIRTUAL_ISA = process.env.NEXT_PUBLIC_FEATURE_VIRTUAL_ISA === 'true';

export default function IntegrationsPage() {
  if (!FEATURE_VIRTUAL_ISA) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Integrations Coming Soon</h1>
          <p className="text-xl text-gray-600 mb-8">
            We're working on powerful integrations to connect your favorite tools with RealVibeAI Realty.
          </p>
          <Link
            href="/realty"
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold px-8 py-3 rounded-full hover:from-purple-700 hover:to-blue-700 transition-all"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-900 to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Seamless CRM Integrations
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
              Your AI Virtual ISA plugs directly into your existing CRM. No data migration, no workflow disruption.
            </p>
          </div>
        </div>
      </section>

      {/* Current Integrations */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Available Now
            </h2>
            <p className="text-xl text-gray-600">
              Connect your AI Virtual ISA with these platforms today
            </p>
          </div>

          {/* Follow Up Boss Integration */}
          <div className="bg-white rounded-3xl shadow-2xl p-12 mb-12 border-4 border-green-500">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="w-32 h-32 bg-gradient-to-br from-green-500 to-green-600 rounded-3xl flex items-center justify-center">
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-3xl font-bold text-gray-900">Follow Up Boss</h3>
                  <span className="bg-green-500 text-white text-sm font-semibold px-4 py-1 rounded-full">
                    LIVE NOW
                  </span>
                </div>
                <p className="text-lg text-gray-600 mb-6">
                  Full bi-directional sync with Follow Up Boss. Your AI Virtual ISA reads leads from FUB, 
                  engages them via email/SMS, qualifies prospects, and books appointments directly to your calendar. 
                  All conversations and qualification data sync back to FUB in real-time.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Auto-sync new leads from FUB</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Push qualification scores back</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Log all conversations & emails</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Sync booked appointments</span>
                  </div>
                </div>
                <Link
                  href="/realty/contact"
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold px-8 py-3 rounded-full transition-all inline-block"
                >
                  Connect Follow Up Boss
                </Link>
              </div>
            </div>
          </div>

          {/* Google Calendar / Calendly */}
          <div className="bg-white rounded-3xl shadow-xl p-12 border border-gray-200">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center">
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-3xl font-bold text-gray-900">Google Calendar + Calendly</h3>
                  <span className="bg-blue-500 text-white text-sm font-semibold px-4 py-1 rounded-full">
                    LIVE NOW
                  </span>
                </div>
                <p className="text-lg text-gray-600 mb-6">
                  Qualified leads book directly to your Google Calendar or Calendly. Your AI ISA handles scheduling, 
                  time zone detection, conflict resolution, and sends confirmation reminders automatically.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Auto-detect availability</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Send booking confirmations</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Handle time zones automatically</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Send pre-appointment reminders</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Coming Soon
            </h2>
            <p className="text-xl text-gray-600">
              We're actively building integrations with these platforms
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Lofty */}
            <div className="bg-gray-50 rounded-2xl p-10 border-2 border-gray-200">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-500 rounded-2xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Lofty</h3>
                  <span className="text-sm text-purple-600 font-semibold">Q2 2025</span>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                Full integration with Lofty CRM. Auto-sync leads, push qualification data, and book appointments 
                with the same seamless experience as Follow Up Boss.
              </p>
              <button
                disabled
                className="bg-gray-300 text-gray-500 font-semibold px-6 py-2 rounded-full cursor-not-allowed"
              >
                In Development
              </button>
            </div>

            {/* CINC */}
            <div className="bg-gray-50 rounded-2xl p-10 border-2 border-gray-200">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">CINC</h3>
                  <span className="text-sm text-orange-600 font-semibold">Q2 2025</span>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                Native CINC integration for automated lead engagement and appointment booking. 
                Bi-directional sync with full conversation logging and qualification scoring.
              </p>
              <button
                disabled
                className="bg-gray-300 text-gray-500 font-semibold px-6 py-2 rounded-full cursor-not-allowed"
              >
                In Development
              </button>
            </div>
          </div>

          {/* Request Integration */}
          <div className="mt-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-12 text-white text-center">
            <h3 className="text-3xl font-bold mb-4">Need a Different Integration?</h3>
            <p className="text-xl mb-8 opacity-90">
              Let us know which CRM or calendar platform you use, and we'll prioritize it in our roadmap.
            </p>
            <Link
              href="/realty/contact"
              className="bg-white text-purple-600 hover:bg-gray-100 font-bold text-lg px-10 py-4 rounded-full transition-all duration-300 inline-block"
            >
              Request Integration
            </Link>
          </div>
        </div>
      </section>

      {/* How Integration Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How Integration Works
            </h2>
            <p className="text-xl text-gray-600">
              Connect your CRM in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Authorize Access</h3>
              <p className="text-gray-600">
                Click "Connect" and authorize RealVibeAI to access your CRM. We use OAuth 2.0 for secure, 
                read-write access to leads and activities.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Configure Sync</h3>
              <p className="text-gray-600">
                Choose which lead sources to sync, set qualification criteria, and map your calendar availability. 
                Takes less than 5 minutes.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Go Live</h3>
              <p className="text-gray-600">
                Your AI Virtual ISA starts engaging leads immediately. All conversations, qualifications, 
                and bookings sync back to your CRM in real-time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Connect Your CRM?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Book an onboarding call and we'll get you integrated in minutes.
          </p>
          <Link
            href="/realty/contact"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold text-lg px-12 py-5 rounded-full transition-all duration-300 inline-block shadow-xl"
          >
            Book Onboarding Call
          </Link>
        </div>
      </section>
    </div>
  );
}
