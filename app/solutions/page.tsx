import Link from "next/link";

export default function Solutions() {
  return (
    <main style={{ maxWidth: 900, margin: "40px auto", padding: "0 16px" }}>
      <h1>Our Solutions</h1>
      <p style={{ fontSize: "1.1em", color: "#555", marginBottom: 32 }}>
        Transform your real estate business with AI-powered tools that help you close more deals faster.
      </p>
      
      <div style={{ display: "grid", gap: "32px", marginBottom: 40 }}>
        <div style={{ padding: "24px", border: "1px solid #ddd", borderRadius: "8px" }}>
          <h3 style={{ color: "#007cba", marginTop: 0 }}>⚡ Virtual Property Staging</h3>
          <p>Instantly transform empty spaces into beautifully staged rooms with AI-powered design. Show buyers the full potential of any property.</p>
          <Link href="/virtual-staging" style={{ 
            padding: "8px 16px", 
            backgroundColor: "#007cba", 
            color: "white", 
            borderRadius: "4px",
            textDecoration: "none",
            display: "inline-block"
          }}>
            Try Virtual Staging
          </Link>
        </div>
        
        <div style={{ padding: "24px", border: "1px solid #ddd", borderRadius: "8px" }}>
          <h3 style={{ color: "#007cba", marginTop: 0 }}>📊 CRM Integration</h3>
          <p>Sync leads and contacts directly with your existing CRM (HubSpot, Zoho, Apptivo). Never lose a lead again with automated follow-ups.</p>
          <Link href="/contact" style={{ 
            padding: "8px 16px", 
            backgroundColor: "#007cba", 
            color: "white", 
            borderRadius: "4px",
            textDecoration: "none",
            display: "inline-block"
          }}>
            Connect Your CRM
          </Link>
        </div>
        
        <div style={{ padding: "24px", border: "1px solid #ddd", borderRadius: "8px" }}>
          <h3 style={{ color: "#007cba", marginTop: 0 }}>🤖 AI Lead Qualification</h3>
          <p>Automatically identify hot leads and prioritize follow-ups. Focus your time on prospects most likely to buy or sell.</p>
          <Link href="/contact" style={{ 
            padding: "8px 16px", 
            backgroundColor: "#007cba", 
            color: "white", 
            borderRadius: "4px",
            textDecoration: "none",
            display: "inline-block"
          }}>
            See Lead Scoring
          </Link>
        </div>
      </div>
    </main>
  );
}