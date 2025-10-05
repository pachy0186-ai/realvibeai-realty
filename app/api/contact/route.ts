// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import nodemailer from 'nodemailer';
import { z } from 'zod';

// Ensure Node runtime so nodemailer is supported
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// ---------------- utils / guards ----------------
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

// Zod validation (server-side)
const ContactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email(),
  phone: z.string().trim().optional(),
  message: z.string().trim().min(1).max(5000),
  intent: z.string().trim().optional(),
  aiConsent: z.boolean().refine(v => v === true, 'AI consent required'),
  // optional Turnstile/Recaptcha token if you enable it
  token: z.string().optional(),
});
type ContactFormData = z.infer<typeof ContactSchema>;

// Basic IP rate limit (Upstash-like stub; swap with your provider)
async function rateLimit(ip: string) {
  // TODO: plug in Upstash Redis/Rate Limit here.
  // For now, simple in-memory clamp for example only (stateless envs reset often).
  // Return { allowed: boolean, retryAfter?: number }
  return { allowed: true } as const;
}

// Cloudflare Turnstile verify (or reCAPTCHA) – optional but recommended
async function verifyTurnstile(token?: string, ip?: string) {
  if (!process.env.TURNSTILE_SECRET) return true; // skip if not configured
  if (!token) return false;
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: process.env.TURNSTILE_SECRET!,
        response: token,
        remoteip: ip ?? '',
      }),
      cache: 'no-store',
    });
    const data = (await res.json()) as { success: boolean };
    return !!data.success;
  } catch {
    return false;
  }
}

// AbortController timeout wrapper for fetch
async function fetchWithTimeout(input: string, init: RequestInit = {}, ms = 8000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(input, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(id);
  }
}

// ---------------- email senders ----------------
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

async function sendEmailWithResend(data: ContactFormData, recipient: string) {
  if (!resend) throw new Error('Resend not configured');
  const intentText = data.intent ? ` (${toAscii(data.intent)})` : '';
  const subject = toAscii(`New Lead: ${data.name}${intentText}`);
  const fromAddr = process.env.BUSINESS_EMAIL || 'no-reply@realvibeai.com';
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

// ---------------- handler ----------------
export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const raw = await req.json().catch(() => ({}));
    const parsed = ContactSchema.safeParse(raw);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid payload', details: parsed.error.flatten() }, { status: 400 });
    }
    const data = parsed.data;

    // Bot & abuse protection
    const captchaOk = await verifyTurnstile(data.token, ip);
    if (!captchaOk) return NextResponse.json({ error: 'Bot verification failed' }, { status: 400 });

    const rl = await rateLimit(ip);
    if (!rl.allowed) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429, headers: rl.retryAfter ? { 'Retry-After': String(rl.retryAfter) } : {} });
    }

    const recipient = toAscii(
      (process.env.BUSINESS_EMAIL || process.env.CONTACT_TO || 'realvibeairealty@gmail.com').trim()
    );

    // Try Resend → SMTP → console
    try {
      if (resend) {
        await sendEmailWithResend(data, recipient);
      } else if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
        await sendEmailWithSMTP(data, recipient);
      } else {
        console.log('NEW CONTACT FORM SUBMISSION', {
          name: data.name, email: data.email, phone: data.phone, intent: data.intent,
          aiConsent: data.aiConsent, ts: new Date().toISOString(),
        });
      }

      // Downstream workflows (timeouts & non-fatal)
      const siteUrl = getSiteUrl();

      const q = await fetchWithTimeout(`${siteUrl}/api/lead-qualification`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name, email: data.email, phone: data.phone,
          message: data.message, intent: data.intent, timestamp: new Date().toISOString(),
        }),
        cache: 'no-store',
      }).catch(() => null);
      if (q?.ok) console.log('Lead qualification ok');

      fetchWithTimeout(`${siteUrl}/api/lead-enrichment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: data.name, email: data.email, phone: data.phone }),
        cache: 'no-store',
      }).catch(() => null);

      return NextResponse.json({ ok: true }, { status: 200 });
    } catch (err) {
      console.error('Email send failed', err);
      // still fire downstream but never block user
      const siteUrl = getSiteUrl();
      fetchWithTimeout(`${siteUrl}/api/lead-qualification`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name, email: data.email, phone: data.phone,
          message: data.message, intent: data.intent, timestamp: new Date().toISOString(),
        }),
        cache: 'no-store',
      }).catch(() => null);

      fetchWithTimeout(`${siteUrl}/api/lead-enrichment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: data.name, email: data.email, phone: data.phone }),
        cache: 'no-store',
      }).catch(() => null);

      return NextResponse.json({ ok: true }, { status: 200 });
    }
  } catch (e) {
    console.error('Contact API error', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}