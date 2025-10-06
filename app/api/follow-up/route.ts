// app/api/follow-up/route.ts
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// ---------- helpers ----------
const toAscii = (input: string): string =>
  (input || '')
    .normalize('NFKC')
    .replace(/[\u2012-\u2015]/g, '-')  // various dashes → "-"
    .replace(/[\u2018\u2019]/g, "'")   // curly quotes → "'"
    .replace(/[\u201C\u201D]/g, '"')   // curly quotes → '"'
    .replace(/[^\x00-\x7F]/g, '');     // drop any remaining non-ASCII

const isEmail = (s: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

// ---------- types ----------
interface FollowUpInput {
  email: string;
  name?: string;
  message?: string;
  intent?: string;
  timestamp?: string; // ISO string
}

// ---------- handlers ----------
export async function POST(request: NextRequest) {
  try {
    const raw = (await request.json().catch(() => ({}))) as Partial<FollowUpInput>;

    const emailRaw = typeof raw.email === 'string' ? raw.email.trim() : '';
    if (!isEmail(emailRaw)) {
      return NextResponse.json({ ok: false, error: 'Invalid email' }, { status: 400 });
    }

    const payload: FollowUpInput = {
      email: toAscii(emailRaw),
      name: typeof raw.name === 'string' ? toAscii(raw.name.trim()) : undefined,
      message: typeof raw.message === 'string' ? toAscii(raw.message) : undefined,
      intent: typeof raw.intent === 'string' ? toAscii(raw.intent) : undefined,
      timestamp:
        typeof raw.timestamp === 'string' && raw.timestamp
          ? raw.timestamp
          : new Date().toISOString(),
    };

    return NextResponse.json(
      { ok: true, followUp: payload },
      { headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (err) {
    console.error('follow-up error', err);
    return NextResponse.json({ ok: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: true }, { headers: { 'Cache-Control': 'no-store' } });
}