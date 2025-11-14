// app/not-found.tsx

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-3">Page not found</h1>
        <p className="text-gray-600 mb-6">
          The page you’re looking for doesn’t exist or may have been moved.
        </p>
        <a
          href="/realty"
          className="inline-flex items-center justify-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-100 transition"
        >
          Go back to RealVibeAI Realty
        </a>
      </div>
    </main>
  );
}