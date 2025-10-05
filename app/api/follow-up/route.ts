// app/api/follow-up/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// ---------- helpers ----------
function toAscii(input: string): string {
  return (input ?? '')
    .replace(/[\u2012-\u2015]/g, '-')       // figure/em dashes -> hyphen
    .replace(/[\u2018\u2019]/g, "'")        // curly quotes -> '
    .replace(/[\u201C\u201D]/g, '"')        // curly double quotes -> "
    .replace(/[^\x00-\x7F]/g, '');          // drop any remaining non-ASCII
}

function isEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s ?? '');
}

function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  return toAscii(raw.trim());
}

// ---------- types ----------
interface FollowUpData {
  name: string;
  email: string;
  message: string;
  threadId?: string;
  intent?: string;
  aiConsent: boolean;
}

// ---------- email senders ----------
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

async function sendWithResend(data: FollowUpData, recipient: string) {
  if (!resend) throw new Error('Resend not configured');

  const intentText = data.intent ? ` (${toAscii(data.intent)})` : '';
  const subject = toAscii(`Follow up from ${data.name}${intentText}`);
  const fromAddr = process.env.BUSINESS_EMAIL || 'realvibeairealty@gmail.com';
  const fromHeader = toAscii(`RealVibeAI Follow-Up <${fromAddr}>`);

  await resend.emails.send({
    from: fromHeader,
    to: [recipient],
    subject,
    html: `
      <h2>Follow-up Message</h2>
      <p><strong>Name:</strong> ${toAscii(data.name)}</p>
      <p><strong>Email:</strong> ${toAscii(data.email)}</p>
      ${data.threadId ? `<p><strong>Thread ID:</strong> ${toAscii(data.threadId)}</p>` : ''}
      ${data.intent ? `<p><strong>Intent:</strong> ${toAscii(data.intent)}</p>` : ''}
      <p><strong>Message:</strong></p>
      <p>${toAscii(data.message).replace(/\n/g, '<br>')}</p>
      <hr>
      <p><small>AI Consent: ${data.aiConsent ? 'Yes' : 'No'}</small></p>
      <p><small>Submitted at: ${new Date().toISOString()}</small></p>
    `,
  });
}

async function sendWithSMTP(data: FollowUpData, recipient: string) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_PORT === '465',
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

  const intentText = data.intent ? ` (${toAscii(data.intent)})` : '';
  const subject = toAscii(`Follow up from ${data.name}${intentText}`);

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: recipient,
    subject,
    html: `
      <h2>Follow-up Message</h2>
      <p><strong>Name:</strong> ${toAscii(data.name)}</p>
      <p><strong>Email:</strong> ${toAscii(data.email)}</p>
      ${data.threadId ? `<p><strong>Thread ID:</strong> ${toAscii(data.threadId)}</p>` : ''}
      ${data.intent ? `<p><strong>Intent:</strong> ${toAscii(data.intent)}</p>` : ''}
      <p><strong>Message:</strong></p>
      <p>${toAscii(data.message).replace(/\n/g, '<br>')}</p>
      <hr>
      <p><small>AI Consent: ${data.aiConsent ? 'Yes' : 'No'}</small></p>
      <p><small>Submitted at: ${new Date().toISOString()}</small></p>
    `,
  });
}

// ---------- handler ----------
export async function POST(req: NextRequest) {
  try {
    const raw = await req.json().catch(() => ({}));
    const data = raw as Partial<FollowUpData>;

    // minimal validation (no zod)
    if (
      typeof data.name !== 'string' || data.name.trim().length < 2 ||
      typeof data.email !== 'string' || !isEmail(data.email) ||
      typeof data.message !== 'string' || data.message.trim().length < 1 ||
      data.aiConsent !== true
    ) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const clean: FollowUpData = {
      name: data.name.trim(),
      email: data.email.trim(),
      message: data.message.trim(),
      threadId: (data.threadId || '').toString().trim() || undefined,
      intent: (data.intent || '').toString().trim() || undefined,
      aiConsent: true,
    };

    const recipient = toAscii(
      (process.env.BUSINESS_EMAIL || process.env.CONTACT_TO || 'realvibeairealty@gmail.com').trim()
    );

    if (resend) {
      await sendWithResend(clean, recipient);
    } else if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      await sendWithSMTP(clean, recipient);
    } else {
      console.log('FOLLOW-UP (no email configured)', { clean, ts: new Date().toISOString() });
    }

    // Optional: call any downstream workflows (best-effort)
    const siteUrl = getSiteUrl();
    fetch(`${siteUrl}/api/lead-enrichment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: clean.name, email: clean.email }),
      cache: 'no-store',
    }).catch(() => {});

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Follow-up API error', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}