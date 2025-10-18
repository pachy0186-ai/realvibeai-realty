
import Link from "next/link";
import Image from "next/image";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const gallery = [
  { title: "Living Room",  before: "/images/virtual-staging/before-staging.webp",  after: "/images/virtual-staging/after-staging.webp",  caption: "Modern, neutral style." },
  { title: "Master Bedroom", before: "/images/virtual-staging/before-staging.webp", after: "/images/virtual-staging/after-staging.webp", caption: "Elegant traditional style." },
  { title: "Kitchen & Dining", before: "/images/virtual-staging/before-staging.webp", after: "/images/virtual-staging/after-staging.webp", caption: "Bright, MLS-ready." },
];

export default function VirtualStagingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Banner */}
      <section className="relative h-96 overflow-hidden">
        <Image
          src="/images/realvibeai-banner.jpg"
          alt="RealVibeAI Virtual Staging Banner"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-blue-900/80"></div>
        
        {/* Logo and Title Overlay */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <div className="mb-6">
            <Image
              src="/images/realvibeai-logo.png"
              alt="RealVibeAI Logo"
              width={120}
              height={120}
              className="mx-auto"
            />
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">Virtual Staging</h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Showcase empty properties with AI-enhanced, photo-realistic interiors — faster, cheaper, and on brand.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Multiple Styles</h3>
              <p className="text-gray-600 text-sm">Modern, Traditional, Luxury, and Minimalist design options</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">MLS-Safe</h3>
              <p className="text-gray-600 text-sm">Professional quality images ready for MLS and marketing</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Bulk Pricing</h3>
              <p className="text-gray-600 text-sm">Volume discounts for multiple rooms and properties</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Fast Turnaround</h3>
              <p className="text-gray-600 text-sm">AI preview images delivered within minutes. Final enhanced renders delivered within 24–48 hours depending on room count and style complexity.</p>
            </div>
          </div>

          {/* Before & After Gallery */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Before &amp; After Gallery</h2>
            {gallery.map(g => (
              <div key={g.title} className="mb-12">
                <h3 className="text-2xl font-semibold text-center mb-4">{g.title}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <figure className="bg-white rounded-lg p-2">
                    <div className="text-sm text-gray-500 mb-2 text-center">Before</div>
                    <Image src="/images/virtual-staging/before-staging.webp" alt={`${g.title} before`} width={1200} height={800} className="rounded-lg object-cover w-full h-auto" sizes="(max-width:768px) 100vw, 50vw" />
                  </figure>
                  <figure className="bg-white rounded-lg p-2">
                    <div className="text-sm text-gray-500 mb-2 text-center">After AI Staging</div>
                    <Image src="/images/virtual-staging/after-staging.webp" alt={`${g.title} after`} width={1200} height={800} className="rounded-lg object-cover w-full h-auto" sizes="(max-width:768px) 100vw, 50vw" />
                  </figure>
                </div>
                <p className="text-center text-gray-600 mt-3">{g.caption}</p>
              </div>
            ))}
          </section>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Listings?</h2>
            <p className="text-xl mb-8 opacity-90">
              Studies have shown that professionally staged homes tend to sell faster and at higher prices compared to unstaged homes. Actual results may vary depending on market conditions and property type.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/pricing"
                className="bg-white text-purple-600 hover:bg-gray-100 font-semibold text-lg px-8 py-4 rounded-full transition-colors inline-block"
              >
                View Pricing
              </Link>
              
              <a
                href="mailto:realvibeairealty@gmail.com"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-purple-600 font-semibold text-lg px-8 py-4 rounded-full transition-colors inline-block"
              >
                Email Us
              </a>
              
              <a
                href="tel:+19542478275"
                className="bg-green-500 hover:bg-green-600 text-white font-semibold text-lg px-8 py-4 rounded-full transition-colors inline-block"
              >
                Call (954) 247-8275
              </a>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Choose RealVibeAI Virtual Staging?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Cost Effective</h4>
                <p className="text-gray-600">Save thousands compared to traditional staging while achieving the same visual impact.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Quick Delivery</h4>
                <p className="text-gray-600">AI preview images delivered within minutes. Final enhanced renders delivered within 24–48 hours depending on room count and style complexity.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Proven Results</h4>
                <p className="text-gray-600">Studies have shown that professionally staged homes tend to sell faster and at higher prices compared to unstaged homes. Actual results may vary depending on market conditions and property type.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

