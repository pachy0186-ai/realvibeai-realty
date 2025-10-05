// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// ---------- helpers ----------
function toAscii(input: string): string {
  return input
    .replace(/[\u2012-\u2015]/g, '-')
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[^\x00-\x7F]/g, '');
}
function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  return toAscii(raw.trim());
}
function isEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

// ---------- types ----------
interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  intent?: string;
  aiConsent: boolean;
  token?: string;
}

// ---------- email senders ----------
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

async function sendEmailWithResend(data: ContactFormData, recipient: string) {
  if (!resend) throw new Error('Resend not configured');
  const intentText = data.intent ? ` (${toAscii(data.intent)})` : '';
  const subject = toAscii(`New Lead: ${data.name}${intentText}`);
  const fromAddr = process.env.BUSINESS_EMAIL || 'realvibeairealty@gmail.com';
  const fromHeader = toAscii(`RealVibeAI Contact <${fromAddr}>`);

  await resend.emails.send({
    from: fromHeader,
    to: [recipient],
    subject,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
      ${data.intent ? `<p><strong>Intent:</strong> ${data.intent}</p>` : ''}
      <p><strong>Message:</strong></p>
      <p>${(data.message || '').replace(/\n/g, '<br>')}</p>
      <hr>
      <p><small>AI Consent: ${data.aiConsent ? 'Yes' : 'No'}</small></p>
      <p><small>Submitted at: ${new Date().toISOString()}</small></p>
    `,
  });
}

async function sendEmailWithSMTP(data: ContactFormData, recipient: string) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_PORT === '465',
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

  const intentText = data.intent ? ` (${toAscii(data.intent)})` : '';
  const subject = toAscii(`New Lead: ${data.name}${intentText}`);

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: recipient,
    subject,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
      ${data.intent ? `<p><strong>Intent:</strong> ${data.intent}</p>` : ''}
      <p><strong>Message:</strong></p>
      <p>${(data.message || '').replace(/\n/g, '<br>')}</p>
      <hr>
      <p><small>AI Consent: ${data.aiConsent ? 'Yes' : 'No'}</small></p>
      <p><small>Submitted at: ${new Date().toISOString()}</small></p>
    `,
  });
}

// ---------- handler ----------
export async function POST(request: NextRequest) {
  try {
    const raw = await request.json().catch(() => ({}));
    const data = raw as Partial<ContactFormData>;

    // manual validation
    if (
      typeof data.name !== 'string' || data.name.trim().length < 2 ||
      typeof data.email !== 'string' || !isEmail(data.email) ||
      typeof data.message !== 'string' || data.message.trim().length < 1 ||
      data.aiConsent !== true
    ) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const clean: ContactFormData = {
      name: data.name.trim(),
      email: data.email.trim(),
      phone: (data.phone || '').toString().trim() || undefined,
      message: data.message.trim(),
      intent: (data.intent || '').toString().trim() || undefined,
      aiConsent: true,
    };

    const recipient = toAscii(
      (process.env.BUSINESS_EMAIL || process.env.CONTACT_TO || 'realvibeairealty@gmail.com').trim()
    );

    try {
      if (resend) {
        await sendEmailWithResend(clean, recipient);
      } else if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
        await sendEmailWithSMTP(clean, recipient);
      } else {
        console.log('NEW CONTACT FORM SUBMISSION', {
          name: clean.name, email: clean.email, phone: clean.phone,
          intent: clean.intent, aiConsent: clean.aiConsent, ts: new Date().toISOString(),
        });
      }

      const siteUrl = getSiteUrl();

      // Lead qualification (best-effort)
      try {
        const r = await fetch(`${siteUrl}/api/lead-qualification`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: clean.name, email: clean.email, phone: clean.phone,
            message: clean.message, intent: clean.intent, timestamp: new Date().toISOString(),
          }),
          cache: 'no-store',
        });
        if (r.ok) console.log('Lead qualification completed');
      } catch {}

      // Lead enrichment (fire-and-forget)
      try {
        fetch(`${siteUrl}/api/lead-enrichment`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: clean.name, email: clean.email, phone: clean.phone }),
          cache: 'no-store',
        }).catch(() => {});
      } catch {}

      return NextResponse.json({ ok: true });
    } catch (emailError) {
      console.error('Email sending failed', emailError);
      // still return ok to the user; downstream attempts are non-blocking
      return NextResponse.json({ ok: true });
    }
  } catch (error) {
    console.error('Contact API error', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}