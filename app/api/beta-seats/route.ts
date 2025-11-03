import { NextResponse } from "next/server";

export async function GET() {
  // TODO: Replace with real seat count logic as needed
  const seats = 10;
  return NextResponse.json({ seats });
}
