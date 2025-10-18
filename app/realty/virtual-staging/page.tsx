import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI-Powered Virtual Staging | RealVibeAI Realty",
  description: "Before & After gallery ready for MLS and marketing.",
};

function BeforeAfter({ before, after, label }: { before: string; after: string; label: string }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <figure className="relative overflow-hidden rounded-xl bg-gray-100" style={{ aspectRatio: "16/9" }}>
        <Image src={before} alt={`${label} before`} fill className="object-cover" />
        <figcaption className="absolute bottom-2 left-2 bg-white/85 text-xs px-2 py-1 rounded">Before</figcaption>
      </figure>
      <figure className="relative overflow-hidden rounded-xl bg-gray-100" style={{ aspectRatio: "16/9" }}>
        <Image src={after} alt={`${label} after`} fill className="object-cover" />
        <figcaption className="absolute bottom-2 left-2 bg-white/85 text-xs px-2 py-1 rounded">After</figcaption>
      </figure>
    </div>
  );
}

export default function VirtualStagingPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-12 space-y-12">
      <header className="text-center">
        <h1 className="text-4xl font-bold mb-3">AI-Powered Virtual Staging</h1>
        <p className="text-gray-600">Professional results in minutes. Multiple styles. MLS-ready exports.</p>
      </header>

      <BeforeAfter
        label="Bedroom"
        before="/images/virtual-staging/bedroom-before.jpg"
        after="/images/virtual-staging/bedroom-after.jpg"
      />
      <BeforeAfter
        label="Kitchen"
        before="/images/virtual-staging/kitchen-before.jpg"
        after="/images/virtual-staging/kitchen-after.jpg"
      />
      <BeforeAfter
        label="Living Room"
        before="/images/virtual-staging/living-before.jpg"
        after="/images/virtual-staging/living-after.jpg"
      />

      <p className="text-xs text-blue-600 italic">
        AI-generated previews may be imperfect. Use your judgment.
      </p>
    </main>
  );
}