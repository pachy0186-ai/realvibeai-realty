import { NextRequest, NextResponse } from "next/server";

// Helper: sanitize strings to plain ASCII
function sanitize(input: string): string {
  return input
    .replace(/[—–]/g, "-") // replace em/en dashes
    .replace(/[“”]/g, '"') // replace curly quotes
    .replace(/[‘’]/g, "'") // replace curly apostrophes
    .replace(/[^\x00-\x7F]/g, ""); // strip any non-ASCII
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const name = sanitize(body.name || "Unknown");
    const email = sanitize(body.email || "no-email");
    const message = sanitize(body.message || "");
    const intent = sanitize(body.intent || "");

    console.log("📩 Follow-up received:", { name, email, message, intent });

    // Example: store or forward this data
    // (Replace with your CRM or HubSpot logic)
    // await saveLead({ name, email, message, intent });

    return NextResponse.json({ ok: true, sanitized: { name, email, message, intent } });
  } catch (error) {
    console.error("❌ Follow-up API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
