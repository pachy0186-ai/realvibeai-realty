// app/realty/virtual-staging/page.tsx
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI-Powered Virtual Staging | RealVibeAI Realty",
  description:
    "Before & After gallery showcasing AI-generated home staging transformations in minutes, not days.",
};

// keep dynamic so changes show immediately in Preview/Prod while iterating
export const dynamic = "force-dynamic";
export const revalidate = 0;

const gallery = [
  {
    title: "Living Room",
    before: "/images/virtual-staging/living-before.jpg",
    after: "/images/virtual-staging/living-after.jpg",
  },
  {
    title: "Master Bedroom",
    before: "/images/virtual-staging/bedroom-before.jpg",
    after: "/images/virtual-staging/bedroom-after.jpg",
  },
  {
    title: "Kitchen & Dining",
    before: "/images/virtual-staging/kitchen-before.jpg",
    after: "/images/virtual-staging/kitchen-after.jpg",
  },
];

export default function VirtualStagingPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">AI-Powered Virtual Staging</h1>
          <p className="text-lg text-gray-600 mb-12">
            Transform empty or outdated rooms into stunning, market-ready visuals. Professional results in minutes.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {gallery.map(({ title, before, after }) => (
              <div key={title} className="space-y-3">
                <h3 className="font-semibold text-gray-800">{title}</h3>

                <div className="grid grid-cols-2 gap-3">
                  <figure className="relative">
                    <Image
                      src={before}
                      alt={`${title} before`}
                      width={600}
                      height={450}
                      className="rounded-lg object-cover border"
                    />
                    <figcaption className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                      Before
                    </figcaption>
                  </figure>

                  <figure className="relative">
                    <Image
                      src={after}
                      alt={`${title} after`}
                      width={600}
                      height={450}
                      className="rounded-lg object-cover border"
                    />
                    <figcaption className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                      After
                    </figcaption>
                  </figure>
                </div>
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

          <p className="mt-6 text-xs text-gray-500">
            AI-generated—may be imperfect. Use your judgment.
          </p>
        </div>
      </section>
    </main>
  );
}