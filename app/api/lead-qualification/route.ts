// app/api/lead-qualification/route.ts
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0; // ensure no build-time pre-rendering/caching

// -------- helpers --------
function toAscii(input: string): string {
  // Normalize then drop any non-ASCII to avoid ByteString/latin1 issues
  return (input || '')
    .normalize('NFKC')
    .replace(/[^\x00-\x7F]/g, '');
}

function isEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

// -------- types --------
interface LeadInput {
  name: string;
  email: string;
  phone?: string;
  message?: string;
  intent?: string;
  timestamp?: string;
}

// -------- handlers --------
export async function POST(request: NextRequest) {
  try {
    const raw = (await request.json().catch(() => ({}))) as Partial<LeadInput>;

    // minimal validation
    if (typeof raw.email !== 'string' || !isEmail(raw.email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }
    if (typeof raw.name !== 'string' || raw.name.trim().length < 2) {
      return NextResponse.json({ error: 'Invalid name' }, { status: 400 });
    }

    // sanitize to ASCII
    const lead: LeadInput = {
      name: toAscii(raw.name.trim()),
      email: toAscii(raw.email.trim()),
      phone: raw.phone ? toAscii(String(raw.phone).trim()) : undefined,
      message: raw.message ? toAscii(String(raw.message)) : undefined,
      intent: raw.intent ? toAscii(String(raw.intent)) : undefined,
      timestamp: raw.timestamp || new Date().toISOString(),
    };

    // simple qualification heuristic (adjust as needed)
    const qualified =
      (!!lead.intent && /buy|sell|rent|list|cash/i.test(lead.intent)) ||
      (!!lead.message && /pre[- ]?approved|budget|neighborhood/i.test(lead.message || ''));

    return NextResponse.json(
      { ok: true, qualified, lead },
      { headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (err) {
    console.error('lead-qualification error', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  // quick health check endpoint
  return NextResponse.json({ ok: true }, { headers: { 'Cache-Control': 'no-store' } });
}