import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import nodemailer from 'nodemailer';
import { sanitize as S } from '@/app/lib/sanitize';

export const dynamic = 'force-dynamic'; // ensure purely dynamic API route

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  intent?: 'Buy' | 'Sell' | 'Rent' | 'Investor';
  lead_priority?: 'High' | 'Medium' | 'Low';
  linkedin_profile?: string;
  aiConsent: boolean;
}

async function sendEmailWithResend(data: ContactFormData, recipient: string) {
  if (!resend) throw new Error('Resend not configured');

  const intentText = data.intent ? ` (${data.intent})` : '';

  await resend.emails.send({
    from: `RealVibeAI Contact <${process.env.BUSINESS_EMAIL || 'realvibeairealty@gmail.com'}>`,
    to: [recipient],
    subject: `New Lead: ${data.name}${intentText}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
      ${data.intent ? `<p><strong>Lead Intent:</strong> ${data.intent}</p>` : ''}
      ${data.lead_priority ? `<p><strong>Lead Priority:</strong> ${data.lead_priority}</p>` : ''}
      ${data.linkedin_profile ? `<p><strong>LinkedIn Profile:</strong> <a href="${data.linkedin_profile}">${data.linkedin_profile}</a></p>` : ''}
      <p><strong>Message:</strong></p>
      <p>${(data.message || '').replace(/\n/g, '<br>')}</p>
      <hr>
      <p><small>AI Consent: ${data.aiConsent ? 'Yes' : 'No'}</small></p>
      <p><small>Submitted at: ${new Date().toISOString()}</small></p>
    `,
  });
}

async function sendEmailWithSMTP(data: ContactFormData, recipient: string) {
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const intentText = data.intent ? ` (${data.intent})` : '';

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: recipient,
    subject: `New Lead: ${data.name}${intentText}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
      ${data.intent ? `<p><strong>Lead Intent:</strong> ${data.intent}</p>` : ''}
      ${data.lead_priority ? `<p><strong>Lead Priority:</strong> ${data.lead_priority}</p>` : ''}
      ${data.linkedin_profile ? `<p><strong>LinkedIn Profile:</strong> <a href="${data.linkedin_profile}">${data.linkedin_profile}</a></p>` : ''}
      <p><strong>Message:</strong></p>
      <p>${(data.message || '').replace(/\n/g, '<br>')}</p>
      <hr>
      <p><small>AI Consent: ${data.aiConsent ? 'Yes' : 'No'}</small></p>
      <p><small>Submitted at: ${new Date().toISOString()}</small></p>
    `,
  });
}

export async function POST(request: NextRequest) {
  try {
    const rawData: any = await request.json();
    const data: ContactFormData = {
      name: S(rawData.name),
      email: S(rawData.email),
      phone: rawData.phone ? S(rawData.phone) : undefined,
      message: S(rawData.message),
      intent: rawData.intent ? S(rawData.intent) : undefined,
      lead_priority: rawData.lead_priority ? S(rawData.lead_priority) : undefined,
      linkedin_profile: rawData.linkedin_profile ? S(rawData.linkedin_profile) : undefined,
      aiConsent: Boolean(rawData.aiConsent),
    };

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

    // Try Resend -> SMTP -> console fallback
    try {
      if (resend) {
        await sendEmailWithResend(data, recipient);
      } else if (
        process.env.SMTP_HOST &&
        process.env.SMTP_USER &&
        process.env.SMTP_PASS
      ) {
        await sendEmailWithSMTP(data, recipient);
      } else {
        // Console fallback (ASCII only text)
        console.log('New Contact Form Submission', {
          name: data.name,
          email: data.email,
          phone: data.phone || '',
          intent: data.intent || '',
          message: data.message,
          aiConsent: data.aiConsent,
          timestamp: new Date().toISOString(),
        });
      }

      // Trigger lead qualification (non-blocking for user experience)
      try {
        const base =
          process.env.NEXT_PUBLIC_SITE_URL ||
          process.env.VERCEL_URL ||
          '';
        const url = base
          ? `https://${base.replace(/^https?:\/\//, '')}/api/lead-qualification`
          : '/api/lead-qualification';

        const qualificationResponse = await fetch(url, {
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

        if (qualificationResponse.ok) {
          const result = await qualificationResponse.json();
          console.log('Lead qualification completed', result);
        }
      } catch (err) {
        console.error('Lead qualification failed (non-critical)', err);
      }

      // Trigger lead enrichment (fire and forget)
      try {
        const base =
          process.env.NEXT_PUBLIC_SITE_URL ||
          process.env.VERCEL_URL ||
          '';
        const url = base
          ? `https://${base.replace(/^https?:\/\//, '')}/api/lead-enrichment`
          : '/api/lead-enrichment';

        fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            phone: data.phone,
          }),
        }).catch((e) => console.log('Lead enrichment failed (non-critical)', e));
      } catch {
        // ignore
      }

      return NextResponse.json({ ok: true });
    } catch (emailError) {
      console.error('Email sending failed', emailError);

      // Log details but keep ASCII
      console.log('New Contact Form Submission (email failed)', {
        name: data.name,
        email: data.email,
        phone: data.phone || '',
        intent: data.intent || '',
        message: data.message,
        aiConsent: data.aiConsent,
        timestamp: new Date().toISOString(),
      });

      // Retry those auxiliary tasks but do not block response
      try {
        const base =
          process.env.NEXT_PUBLIC_SITE_URL ||
          process.env.VERCEL_URL ||
          '';
        const url = base
          ? `https://${base.replace(/^https?:\/\//, '')}/api/lead-qualification`
          : '/api/lead-qualification';

        fetch(url, {
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
        }).catch((e) =>
          console.error('Lead qualification failed (non-critical)', e)
        );
      } catch {
        // ignore
      }

      try {
        const base =
          process.env.NEXT_PUBLIC_SITE_URL ||
          process.env.VERCEL_URL ||
          '';
        const url = base
          ? `https://${base.replace(/^https?:\/\//, '')}/api/lead-enrichment`
          : '/api/lead-enrichment';

        fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            phone: data.phone,
          }),
        }).catch((e) =>
          console.log('Lead enrichment failed (non-critical)', e)
        );
      } catch {
        // ignore
      }

      // Still return success to the user
      return NextResponse.json({ ok: true });
    }
  } catch (error) {
    console.error('Contact API error', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
