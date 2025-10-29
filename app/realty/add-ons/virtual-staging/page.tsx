import Image from "next/image";
import Link from "next/link";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Virtual Staging Add-On | RealVibeAI Realty",
  description: "Add AI-powered virtual staging to your Virtual ISA subscription. Transform empty listings in minutes.",
  keywords: "virtual staging, AI staging, real estate photography, listing photos",
};

const FEATURE_VIRTUAL_ISA = process.env.NEXT_PUBLIC_FEATURE_VIRTUAL_ISA === 'true';

export default function VirtualStagingAddOnPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block bg-purple-100 text-purple-700 text-sm font-semibold px-4 py-2 rounded-full mb-4">
              ADD-ON SERVICE
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              AI Virtual Staging
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Complement your AI Virtual ISA with professional virtual staging. 
              Get AI previews in minutes and final renders in 24-48 hours.
            </p>
            {FEATURE_VIRTUAL_ISA && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-2xl mx-auto">
                <p className="text-blue-800">
                  <strong>Note:</strong> Our primary focus is qualified appointment booking through the AI Virtual ISA. 
                  Virtual staging is available as an optional add-on for existing customers.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Fast Turnaround</h3>
              <p className="text-gray-600">AI previews in minutes, final renders in 24-48 hours</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Professional Quality</h3>
              <p className="text-gray-600">Market-ready visuals that help listings sell faster</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Affordable Pricing</h3>
              <p className="text-gray-600">Fraction of the cost of traditional staging</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Add-On Pricing</h2>
            <p className="text-gray-600">Available to Virtual ISA subscribers</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Per Room</h3>
                <div className="text-4xl font-bold text-purple-600 mb-2">$29</div>
                <p className="text-gray-600 mb-4">One-time fee per staged room</p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>AI preview in minutes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Final render in 24-48h</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>High-resolution output</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Bulk Package</h3>
                <div className="text-4xl font-bold text-blue-600 mb-2">$199</div>
                <p className="text-gray-600 mb-4">10 rooms (save 31%)</p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Everything in Per Room</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Priority processing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Unused credits roll over</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/realty/contact"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-8 py-3 rounded-full transition-all inline-block"
              >
                Contact to Add Virtual Staging
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA - Focus on Core Product */}
      {FEATURE_VIRTUAL_ISA && (
        <section className="py-16 bg-gradient-to-r from-purple-900 to-blue-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Not a Virtual ISA Customer Yet?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Start with our AI Virtual ISA to automate your appointment pipeline, 
              then add virtual staging as needed.
            </p>
            <Link
              href="/realty"
              className="bg-white text-purple-600 hover:bg-gray-100 font-bold text-lg px-10 py-4 rounded-full transition-all duration-300 inline-block shadow-2xl"
            >
              Learn About Virtual ISA
            </Link>
          </div>
        </section>
      )}

      {/* Legacy CTA */}
      {!FEATURE_VIRTUAL_ISA && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Stage Your Listings?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Contact us to get started with AI virtual staging.
            </p>
            <Link
              href="/realty/contact"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold text-lg px-10 py-4 rounded-full transition-all duration-300 inline-block"
            >
              Get Started
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
