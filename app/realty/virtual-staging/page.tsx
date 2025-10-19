import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI-Powered Virtual Staging | RealVibeAI Realty",
  description:
    "Before & After gallery showcasing AI-generated home staging transformations in minutes, not days.",
};

// Keep this page dynamic so it never caches a broken render
export const dynamic = "force-dynamic";
export const revalidate = 0;

// IMPORTANT: file names must match exactly what exists under /public/images/virtual-staging
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
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold text-center mb-10">
            Before &amp; After Gallery
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {gallery.map(({ title, before, after }) => (
              <div key={title}>
                <h3 className="text-lg font-semibold text-center mb-3">
                  {title}
                </h3>

                <div className="grid grid-cols-2 gap-3">
                  <figure className="relative">
                    <img
                      src={before}
                      alt={`${title} before`}
                      width={600}
                      height={450}
                      loading="lazy"
                      className="w-full h-auto rounded-lg object-cover border"
                    />
                    <figcaption className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                      Before
                    </figcaption>
                  </figure>

                  <figure className="relative">
                    <img
                      src={after}
                      alt={`${title} after`}
                      width={600}
                      height={450}
                      loading="lazy"
                      className="w-full h-auto rounded-lg object-cover border"
                    />
                    <figcaption className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                      After
                    </figcaption>
                  </figure>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-6 text-xs text-gray-500 text-center">
            AI-generated—may be imperfect. Use your judgment.
          </p>
        </div>
      </section>
    </main>
  );
}