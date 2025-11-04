import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

// The token is for server-side comparison only.
const ADMIN_TOKEN = process.env.BETA_ADMIN_TOKEN;

export async function POST(request: Request) {
  // 1. Guard with Authorization: Bearer <ADMIN_TOKEN>
  const authHeader = request.headers.get("Authorization");
  const token = authHeader?.split("Bearer ")[1];

  if (!ADMIN_TOKEN || token !== ADMIN_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 2. Parse request body
  let body;
  try {
    body = await request.json();
  } catch (e) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { seats } = body;

  if (typeof seats !== "number" || seats < 0) {
    return NextResponse.json({ error: "Invalid 'seats' value" }, { status: 400 });
  }

  try {
    // 3. Update beta_settings.available_seats.
    // Since the table uses a UUID PK, we will update the first row found.
    const { data, error } = await supabaseAdmin
      .from("beta_settings")
      .update({ available_seats: seats, updated_at: new Date().toISOString() })
      .limit(1)
      .select("available_seats")
      .single();

    if (error) {
      console.error("Supabase update error:", error);
      return NextResponse.json({ error: "Database update failed" }, { status: 500 });
    }

    // 4. Return updated { seats }.
    return NextResponse.json({ seats: data.available_seats });
  } catch (e) {
    console.error("Unexpected error in /api/admin/beta-seats POST:", e);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
