import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "RealVibeAI Realty",
  description: "AI-powered real estate solutions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", margin: 0 }}>
        {/* Navigation bar */}
        <header
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            padding: "16px",
            background: "#f8f9fa",
            borderBottom: "1px solid #ddd",
          }}
        >
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/solutions">Solutions</Link>
          <Link href="/contact">Contact</Link>
        </header>

        {/* Page content */}
        <main style={{ padding: "24px" }}>{children}</main>
      </body>
    </html>
  );
}
