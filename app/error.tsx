'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error(error);
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-3">Something went wrong</h1>
        <p className="text-gray-600 mb-6">
          Please refresh the page or try again later.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
        >
          Try again
        </button>
      </div>
    </main>
  );
}