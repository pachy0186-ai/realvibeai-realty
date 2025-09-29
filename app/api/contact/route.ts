// Force Node runtime (Edge would choke on nodemailer and some headers)
export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import nodemailer from 'nodemailer';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  intent?: string;
  aiConsent: boolean;
}

// Replace non-ASCII characters to avoid ByteString issues anywhere headers might be involved
function toAscii(input: string): string {
  return input.replace(/[^\x00-\x7F]/g, '?');
}

async function sendEmailWithResend(data: ContactFormData, recipient: string) {
  if (!resend) throw new Error('Resend not configured');

  const intentText = data.intent ? ` (${toAscii(data.intent)})` : '';
  const subject = `New Lead: ${toAscii(data.name)}${intentText}`;

  await resend.emails.send({
    // NOTE: Resend usually requires a verified sender domain/from
    from: `RealVibeAI Contact <${process.env.BUSINESS_EMAIL || 'realvibeairealty@gmail.com'}>`,
    to: [recipient],
    subject,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${toAscii(data.name)}</p>
      <p><strong>Email:</strong> ${toAscii(data.email)}</p>
      ${data.phone ? `<p><strong>Phone:</strong> ${toAscii(data.phone)}</p>` : ''}
      ${data.intent ? `<p><strong>Intent:</strong> ${toAscii(data.intent)}</p>` : ''}
      <p><strong>Message:</strong></p>
      <p>${toAscii(data.message).replace(/\n/g, '<br>')}</p>
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
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const intentText = data.intent ? ` (${toAscii(data.intent)})` : '';
  const subject = `New Lead: ${toAscii(data.name)}${intentText}`;

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: recipient,
    subject,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${toAscii(data.name)}</p>
      <p><strong>Email:</strong> ${toAscii(data.email)}</p>
      ${data.phone ? `<p><strong>Phone:</strong> ${toAscii(data.phone)}</p>` : ''}
      ${data.intent ? `<p><strong>Intent:</strong> ${toAscii(data.intent)}</p>` : ''}
      <p><strong>Message:</strong></p>
      <p>${toAscii(data.message).replace(/\n/g, '<br>')}</p>
      <hr>
      <p><small>AI Consent: ${data.aiConsent ? 'Yes' : 'No'}</small></p>
      <p><small>Submitted at: ${new Date().toISOString()}</small></p>
    `,
  });
}

export async function POST(request: NextRequest) {
  try {
    const data: ContactFormData = await request.json();

    // Validate required fields
    if (!data.name || !data.email || !data.message || !data.aiConsent) {
      return NextResponse.json(
        { error: 'Missing required fields or AI consent not provided' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    const recipient =
      process.env.BUSINESS_EMAIL ||
      process.env.CONTACT_TO ||
      'realvibeairealty@gmail.com';

    try {
      // Prefer Resend
      if (resend) {
        await sendEmailWithResend(data, recipient);
      }
      // Fallback: SMTP
      else if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
        await sendEmailWithSMTP(data, recipient);
      }
      // Last resort: log (ASCII-only)
      else {
        console.log('New Contact Form Submission:', {
          name: toAscii(data.name),
          email: toAscii(data.email),
          phone: data.phone ? toAscii(data.phone) : undefined,
          intent: data.intent ? toAscii(data.intent) : undefined,
          message: toAscii(data.message),
          aiConsent: data.aiConsent,
          timestamp: new Date().toISOString(),
        });
      }

      // Trigger lead qualification (best-effort)
      try {
        const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
        const q = await fetch(`${base}/api/lead-qualification`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            phone: data.phone,
            message: data.message,
            intent: data.intent,
            timestamp: new Date().toISOString(),
          }),
        });
        if (q.ok) {
          const result = await q.json();
          console.log('Lead qualification completed:', result);
        }
      } catch (err) {
        console.error('Lead qualification failed (non-critical):', err);
      }

      // Fire-and-forget lead enrichment
      try {
        const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
        fetch(`${base}/api/lead-enrichment`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            phone: data.phone,
          }),
        }).catch((err) => console.log('Lead enrichment failed (non-critical):', err));
      } catch (err) {
        console.log('Lead enrichment skipped:', err);
      }

      return NextResponse.json({ ok: true });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);

      // Log fallback (ASCII)
      console.log('New Contact Form Submission (email failed):', {
        name: toAscii(data.name),
        email: toAscii(data.email),
        phone: data.phone ? toAscii(data.phone) : undefined,
        intent: data.intent ? toAscii(data.intent) : undefined,
        message: toAscii(data.message),
        aiConsent: data.aiConsent,
        timestamp: new Date().toISOString(),
      });

      // Still try background workflows
      try {
        const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
        const q = await fetch(`${base}/api/lead-qualification`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            phone: data.phone,
            message: data.message,
            intent: data.intent,
            timestamp: new Date().toISOString(),
          }),
        });
        if (q.ok) {
          const result = await q.json();
          console.log('Lead qualification completed:', result);
        }
      } catch (err) {
        console.error('Lead qualification failed (non-critical):', err);
      }

      try {
        const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
        fetch(`${base}/api/lead-enrichment`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            phone: data.phone,
          }),
        }).catch((err) => console.log('Lead enrichment failed (non-critical):', err));
      } catch (err) {
        console.log('Lead enrichment skipped:', err);
      }

      // Return success to the user even if email failed
      return NextResponse.json({ ok: true });
    }
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
