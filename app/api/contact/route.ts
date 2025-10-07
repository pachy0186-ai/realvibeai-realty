import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// ---------- helpers ----------
const toAscii = (input: string): string =>
  (input || '')
    .normalize('NFKC')
    .replace(/[\u2012-\u2015]/g, '-') // figure/en/em dashes -> hyphen
    .replace(/[\u2018\u2019]/g, "'")  // curly single quotes -> '
    .replace(/[\u201C\u201D]/g, '"')  // curly double quotes -> "
    .replace(/[^\x00-\x7F]/g, '');    // drop any remaining non-ASCII

const escapeHtml = (s: string) =>
  toAscii(s).replace(/[&<>"']/g, (c) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]!));

const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

// error helpers (lint-safe)
const isDev = process.env.NODE_ENV !== 'production';
const errMsg = (e: unknown): string => (e instanceof Error ? e.message : (() => { try { return JSON.stringify(e); } catch { return String(e); } })());
const errStack = (e: unknown): string | undefined => (e instanceof Error && e.stack ? e.stack : undefined);

// ---------- types ----------
interface ContactInput {
  name: string;
  email: string;
  phone?: string;
  intent?: string;
  timeframe?: string;
  budget?: string;
  financing?: string; // yes | no | unsure
  message: string;
  aiConsent?: boolean;
}

// ---------- handler ----------
export async function POST(request: NextRequest) {
  try {
    const raw = (await request.json().catch(() => ({}))) as Partial<ContactInput>;
    console.log('Incoming contact form data:', raw);

    // validate requireds
    const name = typeof raw.name === 'string' ? raw.name.trim() : '';
    const email = typeof raw.email === 'string' ? raw.email.trim() : '';
    const message = typeof raw.message === 'string' ? raw.message : '';

    if (!name || !isEmail(email) || !message.trim()) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    // sanitize to ASCII
    const data: ContactInput = {
      name: toAscii(name),
      email: toAscii(email),
      phone: raw.phone ? toAscii(String(raw.phone)) : undefined,
      intent: raw.intent ? toAscii(String(raw.intent)) : undefined,
      timeframe: raw.timeframe ? toAscii(String(raw.timeframe)) : undefined,
      budget: raw.budget ? toAscii(String(raw.budget)) : undefined,
      financing: raw.financing ? toAscii(String(raw.financing)) : undefined,
      message: toAscii(message),
      aiConsent: !!raw.aiConsent,
    };

    // subject + bodies
    const subject = `New contact: ${data.name}${data.intent ? ` (${data.intent})` : ''}`;

    const textLines = [
      'New contact form submission',
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      data.phone ? `Phone: ${data.phone}` : '',
      data.intent ? `Intent: ${data.intent}` : '',
      data.timeframe ? `Timeframe: ${data.timeframe}` : '',
      data.budget ? `Budget: ${data.budget}` : '',
      data.financing ? `Financing: ${data.financing}` : '',
      '',
      'Message:',
      data.message,
      '',
      `AI Consent: ${data.aiConsent ? 'Yes' : 'No'}`,
    ].filter(Boolean);
    const text = textLines.join('\n');

    const html = [
      '<h2>New contact form submission</h2>',
      `<p><strong>Name:</strong> ${escapeHtml(data.name)}</p>`,
      `<p><strong>Email:</strong> ${escapeHtml(data.email)}</p>`,
      data.phone ? `<p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>` : '',
      data.intent ? `<p><strong>Intent:</strong> ${escapeHtml(data.intent)}</p>` : '',
      data.timeframe ? `<p><strong>Timeframe:</strong> ${escapeHtml(data.timeframe)}</p>` : '',
      data.budget ? `<p><strong>Budget:</strong> ${escapeHtml(data.budget)}</p>` : '',
      data.financing ? `<p><strong>Financing:</strong> ${escapeHtml(data.financing)}</p>` : '',
      `<p><strong>AI Consent:</strong> ${data.aiConsent ? 'Yes' : 'No'}</p>`,
      '<hr>',
      `<p><strong>Message</strong><br>${escapeHtml(data.message).replace(/\n/g, '<br>')}</p>`,
    ].filter(Boolean).join('');

    // ----------------- Resend (optional) -----------------
    const toEnv = process.env.CONTACT_TO_EMAIL || process.env.CONTACT_TO || process.env.BUSINESS_EMAIL || 'realvibeairealty@gmail.com';
    const fromEnv = process.env.FROM_EMAIL || process.env.BUSINESS_EMAIL || 'onboarding@resend.dev';

    if (process.env.RESEND_API_KEY && toEnv) {
      try {
        const { Resend } = await import('resend');
        const resend = new Resend(process.env.RESEND_API_KEY);
        const to = toAscii(toEnv.trim());
        await resend.emails.send({
          from: toAscii(fromEnv),
          to: [to],
          subject: toAscii(subject),
          text,
          html,
        });
      } catch (e: unknown) {
        console.error('Resend send error', errMsg(e), isDev ? errStack(e) : '');
      }
    }

    // ----------------- SMTP (optional) -----------------
    if (process.env.SMTP_HOST && toEnv) {
      try {
        const nodemailerMod = await import('nodemailer');
        const { createTransport } = nodemailerMod as unknown as { createTransport: typeof import('nodemailer')['createTransport'] };

        const transporter = createTransport({
          host: process.env.SMTP_HOST,
          port: parseInt(process.env.SMTP_PORT || '587', 10),
          secure: process.env.SMTP_PORT === '465',
          auth: process.env.SMTP_USER && process.env.SMTP_PASS
            ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
            : undefined,
        });

        const to = toAscii(toEnv.trim());
        await transporter.sendMail({
          from: toAscii(fromEnv),
          to,
          subject: toAscii(subject),
          text,
          html,
        });
      } catch (e: unknown) {
        console.error('SMTP send error', errMsg(e), isDev ? errStack(e) : '');
      }
    }

    return NextResponse.json({ ok: true }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (err: unknown) {
    console.error('Contact API error', errMsg(err), isDev ? errStack(err) : '');
    return NextResponse.json(
      {
        error: 'Internal server error',
        detail: isDev ? errMsg(err) : undefined,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ ok: true }, { headers: { 'Cache-Control': 'no-store' } });
}