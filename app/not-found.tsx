// app/not-found.tsx
export default function NotFound() {
  return (
    <main className="min-h-dvh grid place-items-center p-8 text-center">
      <div>
        <h1 className="text-3xl font-bold mb-2">Page Not Found</h1>
        <p className="text-gray-500">Sorry, the page you requested doesn’t exist.</p>
      </div>
    </main>
  );
}