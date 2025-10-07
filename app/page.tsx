import Link from "next/link";

export default function Home() {
  return (
    <main style={{ maxWidth: 900 }}>
      <h1>RealVibeAI Realty - AI-Powered Real Estate Tools</h1>

      <p style={{ fontSize: "1.2em" }}>
        Transform your real estate marketing with AI-driven automation.
        Streamline lead qualification and integrate seamlessly with your existing CRM.
        Boost efficiency, enhance client engagement, and close deals faster.
      </p>

      <div style={{ display: "flex", gap: "1rem" }}>
        <Link
          href="/pricing"
          style={{
            padding: "12px 24px",
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontSize: "16px",
            fontWeight: "bold",
            textDecoration: "none",
            display: "inline-block",
          }}
        >
          Start Free Trial
        </Link>
      </div>
    </main>
  );
}


