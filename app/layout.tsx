import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "RealVibeAI Realty | AI-Powered Virtual Staging & CRM for Real Estate Professionals",
  description: "Transform your real estate business with AI-powered staging, automated lead qualification, and seamless CRM integration. Boost sales and save time.",
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
        <nav aria-label="Main navigation" style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          padding: "16px",
          background: "#222", // darker background
          borderBottom: "1px solid #444",
        }}>
          <Link href="/" style={{ color: "white", textDecoration: "none" }}>Home</Link>
          <Link href="/solutions" style={{ color: "white", textDecoration: "none" }}>Solutions</Link>
          <Link href="/virtual-staging" style={{ color: "white", textDecoration: "none" }}>Virtual Staging</Link>
          <Link href="/pricing" style={{ color: "white", textDecoration: "none" }}>Pricing</Link>
          <Link href="/about" style={{ color: "white", textDecoration: "none" }}>About</Link>
          <Link href="/contact" style={{ color: "white", textDecoration: "none" }}>Get Demo</Link>
          <Link href="/faq" style={{ color: "white", textDecoration: "none" }}>FAQ</Link>
          <Link href="/privacy" style={{ color: "white", textDecoration: "none" }}>Privacy</Link>
        </nav>

        {/* Page content */}
        <main style={{ padding: "24px" }}>{children}</main>
      </body>
    </html>
  );
}
