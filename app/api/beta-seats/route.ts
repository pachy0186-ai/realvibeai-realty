import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

// Fallback value as per instructions
const FALLBACK_SEATS = 10;

export async function GET() {
  try {
    // Try to select available_seats from beta_settings where id = 1.
    // Since the user's SQL uses a UUID primary key, we will select the first row.
    const { data, error } = await supabaseAdmin
      .from("beta_settings")
      .select("available_seats")
      .limit(1)
      .single();

    if (error || !data) {
      // If fail or missing: return { seats: 10, hint: 'fallback' } with Cache-Control: no-store.
      console.error("Supabase read error, falling back:", error);
      return NextResponse.json(
        { seats: FALLBACK_SEATS, hint: "fallback" },
        {
          status: 200,
          headers: {
            "Cache-Control": "no-store",
          },
        }
      );
    }

    // If success: return { seats } with headers Cache-Control: s-maxage=60, stale-while-revalidate=300.
    const seats = data.available_seats;
    return NextResponse.json(
      { seats },
      {
        status: 200,
        headers: {
          "Cache-Control": "s-maxage=60, stale-while-revalidate=300",
        },
      }
    );
  } catch (e) {
    // Catch any unexpected errors (e.g., network issues, client initialization failure)
    console.error("Unexpected error in /api/beta-seats GET:", e);
    return NextResponse.json(
      { seats: FALLBACK_SEATS, hint: "fallback" },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  }
}
