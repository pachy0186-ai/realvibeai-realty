// app/realty/virtual-staging/page.tsx
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI-Powered Virtual Staging | RealVibeAI Realty",
  description:
    "Before & After gallery showcasing AI-generated home staging transformations in minutes, not days.",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

const gallery = [
  { title: "Living Room",  before: "/images/virtual-staging/living-before.jpg",  after: "/images/virtual-staging/living-after.jpg",  caption: "Modern, neutral style." },
  { title: "Master Bedroom", before: "/images/virtual-staging/bedroom-before.jpg", after: "/images/virtual-staging/bedroom-after.jpg", caption: "Elegant traditional style." },
  { title: "Kitchen & Dining", before: "/images/virtual-staging/kitchen-before.jpg", after: "/images/virtual-staging/kitchen-after.jpg", caption: "Bright, MLS-ready." },
];

export default function VirtualStagingPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">AI-Powered Virtual Staging</h1>
          <p className="text-lg text-gray-600 mb-12">
            Transform empty or outdated rooms into stunning, market-ready visuals. Professional
            results in minutes.
          </p>

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
                    <Image src={g.before} alt={`${g.title} before`} width={1200} height={800} className="rounded-lg object-cover w-full h-auto" sizes="(max-width:768px) 100vw, 50vw" />
                  </figure>
                  <figure className="bg-white rounded-lg p-2">
                    <div className="text-sm text-gray-500 mb-2 text-center">After AI Staging</div>
                    <Image src={g.after} alt={`${g.title} after`} width={1200} height={800} className="rounded-lg object-cover w-full h-auto" sizes="(max-width:768px) 100vw, 50vw" />
                  </figure>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-6 text-xs text-gray-500">
            AI-generated—may be imperfect. Use your judgment.
          </p>
        </div>
      </section>
    </main>
  );
}