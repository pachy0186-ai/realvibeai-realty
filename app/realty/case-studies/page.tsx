import Image from "next/image";
import Link from "next/link";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Case Studies | RealVibeAI Realty",
  description: "See how real estate professionals are using RealVibeAI's AI Virtual ISA to book more qualified appointments and close more deals.",
  keywords: "real estate case studies, AI ISA results, appointment booking success stories",
};

const FEATURE_VIRTUAL_ISA = process.env.NEXT_PUBLIC_FEATURE_VIRTUAL_ISA === 'true';

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-900 to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Success Stories
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
              {FEATURE_VIRTUAL_ISA 
                ? "See how real estate professionals are using our AI Virtual ISA to book more qualified appointments."
                : "Real results from real estate professionals using RealVibeAI Realty."
              }
            </p>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Case Study 1 */}
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="h-64 bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl font-bold mb-2">3x</div>
                  <div className="text-xl">Appointment Volume</div>
                </div>
              </div>
              <div className="p-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-600">SM</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Sarah Martinez</h3>
                    <p className="text-gray-600">Luxury Agent, Miami</p>
                  </div>
                </div>
                <blockquote className="text-lg text-gray-700 mb-6 italic">
                  "Before RealVibeAI, I was manually qualifying every lead and spending hours on the phone. 
                  Now my AI Virtual ISA handles initial conversations, qualifies prospects, and books appointments 
                  while I'm closing deals. My appointment volume tripled in the first month."
                </blockquote>
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Key Results:</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>3x increase in qualified appointments</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>15 hours/week saved on lead qualification</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>85% appointment show-up rate</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Case Study 2 */}
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="h-64 bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl font-bold mb-2">$2.4M</div>
                  <div className="text-xl">Additional Revenue</div>
                </div>
              </div>
              <div className="p-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-600">JT</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">James Thompson</h3>
                    <p className="text-gray-600">Team Lead, Los Angeles</p>
                  </div>
                </div>
                <blockquote className="text-lg text-gray-700 mb-6 italic">
                  "Our team was drowning in unqualified leads from Zillow and Realtor.com. RealVibeAI's Virtual ISA 
                  filters out tire-kickers and only books appointments with serious buyers. We closed an extra $2.4M 
                  in our first 6 months just from better lead qualification."
                </blockquote>
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Key Results:</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>$2.4M in additional closed volume</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>60% reduction in wasted agent time</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>4.2x ROI in first 6 months</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* More Coming Soon */}
          <div className="mt-16 bg-gradient-to-r from-purple-100 to-blue-100 rounded-3xl p-12 text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">More Success Stories Coming Soon</h3>
            <p className="text-xl text-gray-600 mb-8">
              We're working with dozens of real estate professionals to document their results. 
              Check back soon for more case studies.
            </p>
            <Link
              href="/realty/contact"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-8 py-3 rounded-full transition-all inline-block"
            >
              Become a Success Story
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Platform-Wide Results
            </h2>
            <p className="text-xl text-gray-600">
              Aggregate performance across all RealVibeAI users
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-purple-600 mb-2">2.8x</div>
              <div className="text-gray-600">Avg. Appointment Increase</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600 mb-2">82%</div>
              <div className="text-gray-600">Avg. Show-Up Rate</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-green-600 mb-2">18hrs</div>
              <div className="text-gray-600">Avg. Time Saved/Week</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-orange-600 mb-2">5.1x</div>
              <div className="text-gray-600">Avg. ROI (6 months)</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900 to-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Write Your Success Story?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {FEATURE_VIRTUAL_ISA
              ? "Book an onboarding call and start automating your appointment pipeline today."
              : "Join hundreds of real estate professionals transforming their business with AI."
            }
          </p>
          <Link
            href="/realty/contact"
            className="bg-white text-purple-600 hover:bg-gray-100 font-bold text-lg px-12 py-5 rounded-full transition-all duration-300 inline-block shadow-2xl"
          >
            {FEATURE_VIRTUAL_ISA ? "Book Onboarding Call" : "Get Started Today"}
          </Link>
        </div>
      </section>
    </div>
  );
}
