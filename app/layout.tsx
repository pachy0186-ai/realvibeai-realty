import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "RealVibeAI Realty | AI-Powered Solutions for Real Estate Professionals",
  description: "Transform your real estate business with RealVibeAI Realty. AI-powered lead qualification, virtual property staging, and seamless CRM integration for real estate agents and brokers.",
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
    background: "#222", // darker background
    borderBottom: "1px solid #444",
  }}
>
  <Link href="/" style={{ color: "white", textDecoration: "none" }}>Home</Link>
  <Link href="/about" style={{ color: "white", textDecoration: "none" }}>About</Link>
  <Link href="/solutions" style={{ color: "white", textDecoration: "none" }}>Solutions</Link>
  <Link href="/contact" style={{ color: "white", textDecoration: "none" }}>Contact</Link>
</header>

        {/* Page content */}
        <main style={{ padding: "24px" }}>{children}</main>
      </body>
    </html>
  );
}
