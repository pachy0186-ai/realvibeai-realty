// app/api/follow-up/route.ts
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const norm = (v: unknown) => (typeof v === 'string' ? v.normalize('NFKC') : v);
const toUtf8 = (s: string) => Buffer.from(s ?? '', 'utf8');
const isEmail = (s: unknown): s is string =>
  typeof s === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

export async function POST(request: NextRequest) {
  try {
    const raw = (await request.json().catch(() => ({}))) as Record<string, unknown>;
    const payload = {
      name: norm(raw.name) as string | undefined,
      email: norm(raw.email) as string | undefined,
      phone: norm(raw.phone) as string | undefined,
      message: norm(raw.message) as string | undefined,
      intent: norm(raw.intent) as string | undefined,
      timestamp: (typeof raw.timestamp === 'string' && raw.timestamp) || new Date().toISOString(),
    };

    if (payload.email && !isEmail(payload.email)) {
      return NextResponse.json({ ok: false, error: 'Invalid email' }, { status: 400 });
    }

    // Example if you sign payloads:
    // import crypto from 'crypto';
    // const sig = crypto.createHmac('sha256', process.env.SECRET ?? '')
    //   .update(toUtf8(JSON.stringify(payload)))
    //   .digest('hex');

    return NextResponse.json({ ok: true, followUp: payload /*, sig*/ }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: String(err?.message || err) }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: true }, { headers: { 'Cache-Control': 'no-store' } });
}