import Link from "next/link";

export default function Home() {
  return (
    <main style={{ maxWidth: 900, margin: "40px auto", padding: "0 16px" }}>
      <h1>AI-Powered Real Estate Solutions That Close More Deals</h1>
      <p style={{ fontSize: "1.2em", color: "#555", marginBottom: 32 }}>
        Transform empty properties into stunning staged homes in minutes. Qualify leads automatically. Integrate seamlessly with your CRM.
      </p>

      <div style={{ display: "flex", gap: "16px", marginBottom: 40, flexWrap: "wrap" }}>
        <Link href="/pricing" style={{ 
          padding: "12px 24px", 
          backgroundColor: "#007cba", 
          color: "white", 
          border: "none", 
          borderRadius: "6px",
          fontSize: "16px",
          fontWeight: "bold",
          textDecoration: "none",
          display: "inline-block"
        }}>
          Start Free Trial
        </Link>
        <Link href="/contact" style={{ 
          padding: "12px 24px", 
          backgroundColor: "transparent", 
          color: "#007cba", 
          border: "2px solid #007cba", 
          borderRadius: "6px",
          fontSize: "16px",
          fontWeight: "bold",
          textDecoration: "none",
          display: "inline-block"
        }}>
          Schedule Demo
        </Link>
      </div>

      <h2 style={{ marginTop: 32 }}>Our Services</h2>
      <ul style={{ fontSize: "1.1em", lineHeight: "1.6" }}>
        <li><strong>Virtual Property Staging</strong> - Transform empty spaces instantly</li>
        <li><strong>CRM Integration</strong> - Sync leads with HubSpot, Zoho, Apptivo</li>
        <li><strong>AI Lead Qualification</strong> - Identify hot prospects automatically</li>
      </ul>
    </main>
  )
}
