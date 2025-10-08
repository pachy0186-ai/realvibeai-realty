import Image from "next/image";
import Link from "next/link";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'RealVibeAI Realty - Intelligent Real Estate Solutions | AI Lead Qualification',
  description: 'AI-powered lead qualification that saves real estate agents time and helps them focus on hot prospects. Transparent pricing starting at $29/mo, privacy-first approach.',
  keywords: 'real estate AI, lead qualification, virtual staging, real estate agents, CRM integration',
  openGraph: {
    title: 'RealVibeAI Realty - Intelligent Real Estate Solutions',
    description: 'AI-powered lead qualification that saves real estate agents time and helps them focus on hot prospects.',
    url: 'https://www.realvibeai.com/realty',
    siteName: 'RealVibeAI Realty',
    images: [
      {
        url: 'https://www.realvibeai.com/hero-banner-realvibeai.jpg',
        width: 1200,
        height: 630,
        alt: 'RealVibeAI Realty - Intelligent Real Estate Solutions',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RealVibeAI Realty - Intelligent Real Estate Solutions',
    description: 'AI-powered lead qualification that saves real estate agents time and helps them focus on hot prospects.',
    images: ['https://www.realvibeai.com/hero-banner-realvibeai.jpg'],
  },
};

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
              href="/realty/pricing"
              className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold text-lg px-10 py-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
            >
              See plans & get started
            </Link>
            <Link
              href="/realty/contact"
              className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white hover:text-purple-600 font-semibold text-lg px-10 py-4 rounded-full transition-all duration-300"
            >
<<<<<<< HEAD
              Get AI previews in minutes & final renders in 24–48 h
=======
              Book a demo
>>>>>>> 74b369d (feat: Align pricing language and CTAs across realty pages)
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
        </div>
      </section>

      {/* Key Features Section */}
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
                href="/realty/pricing"
                className="bg-white text-purple-600 hover:bg-gray-100 font-bold text-lg px-10 py-4 rounded-full transition-all duration-300 inline-block"
              >
                See plans & get started
              </Link>
            </div>
          </div>
        </div>
      </section>

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
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Connect Your Leads</h3>
              <p className="text-gray-600">
                Integrate with your existing lead sources in minutes. Works with most CRMs, 
                lead capture forms, and marketing platforms.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">AI Analyzes & Scores</h3>
              <p className="text-gray-600">
                Our AI automatically analyzes each lead's behavior, responses, and engagement 
                to provide instant Hot/Warm/Cold scoring with detailed reasoning.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Focus on Hot Leads</h3>
              <p className="text-gray-600">
                Receive prioritized lead lists with clear action recommendations. 
                Spend your time on prospects most likely to convert.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Teaser Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            No hidden fees, no surprise charges. Pay only for what you use with our simple, 
            transparent pricing structure designed for solo agents.
          </p>
          
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto mb-8">
            <div className="text-3xl font-bold text-purple-600 mb-2">Starting at $29/mo</div>
            
            <ul className="text-left space-y-3 mb-8">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                AI Lead Qualification (Hot / Warm / Cold)
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Daily lead summaries by email
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                1 brand profile
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Standard support
              </li>
            </ul>
          </div>

          <Link
            href="/realty/pricing"
            className="btn-primary text-lg px-8 py-4"
          >
            See plans & get started
          </Link>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Agents Are Saying
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "RealVibeAI has completely transformed how I handle leads. I'm now focusing on the right prospects 
                and closing more deals. The setup was incredibly easy."
              </p>
              <div className="font-semibold text-gray-900">Sarah M.</div>
              <div className="text-sm text-gray-500">Independent Agent, Austin TX</div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "The AI scoring is incredibly accurate. I save 3-4 hours every day by not chasing cold leads. 
                The transparency in pricing was exactly what I needed as a solo agent."
              </p>
              <div className="font-semibold text-gray-900">Mike R.</div>
              <div className="text-sm text-gray-500">Solo Agent, Denver CO</div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "Finally, a tool built for agents like me. No enterprise complexity, just smart lead qualification 
                that actually works. The privacy-first approach gives me peace of mind."
              </p>
              <div className="font-semibold text-gray-900">Lisa K.</div>
              <div className="text-sm text-gray-500">Independent Agent, Miami FL</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Qualify Leads Smarter?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Join hundreds of solo agents who are already saving time and closing more deals with AI-powered lead qualification.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/realty/contact"
              className="btn-primary bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-4"
            >
              Start Your Free Trial
            </Link>
            <Link
              href="/realty/solutions"
              className="btn-secondary border-white text-white hover:bg-white hover:text-purple-600 text-lg px-8 py-4"
            >
              Learn More
            </Link>
          </div>

          <div className="mt-8 text-sm text-gray-300">
            No credit card required • Cancel anytime • 30-day money-back guarantee
          </div>
        </div>
      </section>
    </div>
  );
}
