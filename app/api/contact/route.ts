import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// ---------- helpers ----------
const toAscii = (input: string): string =>
  (input || '')
    .normalize('NFKC')
    .replace(/[\u2012-\u2015]/g, '-')  // figure/en/em dashes -> hyphen
    .replace(/[\u2018\u2019]/g, "'")   // curly single quotes -> '
    .replace(/[\u201C\u201D]/g, '"')   // curly double quotes -> "
    .replace(/[^\x00-\x7F]/g, '');     // drop any remaining non-ASCII

const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

// ---------- types ----------
interface ContactInput {
  name: string;
  email: string;
  phone?: string;
  intent?: string;
  message: string;
  aiConsent?: boolean;
}

// ---------- handler ----------
export async function POST(request: NextRequest) {
  try {
    const raw = (await request.json().catch(() => ({}))) as Partial<ContactInput>;

    // validate
    const name = typeof raw.name === 'string' ? raw.name.trim() : '';
    const email = typeof raw.email === 'string' ? raw.email.trim() : '';
    const message = typeof raw.message === 'string' ? raw.message : '';

    if (!name || !isEmail(email) || !message.trim()) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    // sanitize inputs to ASCII
    const data: ContactInput = {
      name: toAscii(name),
      email: toAscii(email),
      phone: raw.phone ? toAscii(String(raw.phone)) : undefined,
      intent: raw.intent ? toAscii(String(raw.intent)) : undefined,
      message: toAscii(message),
      aiConsent: !!raw.aiConsent,
    };

    // Build a simple ASCII-only email
    const subject = `New contact: ${data.name}${data.intent ? ` (${data.intent})` : ''}`;
    const textLines = [
      'New contact form submission',
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      data.phone ? `Phone: ${data.phone}` : '',
      data.intent ? `Intent: ${data.intent}` : '',
      '',
      'Message:',
      data.message,
      '',
      `AI Consent: ${data.aiConsent ? 'Yes' : 'No'}`,
    ].filter(Boolean);
    const text = textLines.join('\n');

    // Optional send via Resend (lazy import so nothing runs at build time)
    if (process.env.RESEND_API_KEY && (process.env.CONTACT_TO || process.env.BUSINESS_EMAIL)) {
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);
      const to = (process.env.CONTACT_TO || process.env.BUSINESS_EMAIL || 'realvibeairealty@gmail.com').trim();
      try {
        await resend.emails.send({
          from: toAscii(process.env.BUSINESS_EMAIL || 'realvibeai-realty@no-reply.example'),
          to: [toAscii(to)],
          subject: toAscii(subject),
          text, // ASCII-only
        });
      } catch (e) {
        console.error('Resend send error', e);
      }
    }

    // Optional send via SMTP (also lazy)
    if (process.env.SMTP_HOST && (process.env.CONTACT_TO || process.env.BUSINESS_EMAIL)) {
      try {
        const nodemailer = await import('nodemailer');
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: parseInt(process.env.SMTP_PORT || '587', 10),
          secure: process.env.SMTP_PORT === '465',
          auth: process.env.SMTP_USER && process.env.SMTP_PASS
            ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
            : undefined,
        });
        const to = (process.env.CONTACT_TO || process.env.BUSINESS_EMAIL || 'realvibeairealty@gmail.com').trim();
        await transporter.sendMail({
          from: toAscii(process.env.BUSINESS_EMAIL || 'realvibeai-realty@no-reply.example'),
          to: toAscii(to),
          subject: toAscii(subject),
          text, // ASCII-only
        });
      } catch (e) {
        console.error('SMTP send error', e);
      }
    }

    // success response
    return NextResponse.json(
      { ok: true },
      { headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (err) {
    console.error('Contact API error', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: true }, { headers: { 'Cache-Control': 'no-store' } });
}