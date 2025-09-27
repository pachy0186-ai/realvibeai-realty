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

async function sendEmailWithResend(data: ContactFormData, recipient: string) {
  if (!resend) {
    throw new Error('Resend not configured');
  }

  const intentText = data.intent ? ` (${data.intent})` : '';
  
  await resend.emails.send({
    from: 'RealVibeAI Contact <noreply@realvibeai.com>',
    to: [recipient],
    subject: `New Lead: ${data.name}${intentText}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
      ${data.intent ? `<p><strong>Intent:</strong> ${data.intent}</p>` : ''}
      <p><strong>Message:</strong></p>
      <p>${data.message.replace(/\n/g, '<br>')}</p>
      <hr>
      <p><small>AI Consent: ${data.aiConsent ? 'Yes' : 'No'}</small></p>
      <p><small>Submitted at: ${new Date().toISOString()}</small></p>
    `,
  });
}

async function sendEmailWithSMTP(data: ContactFormData, recipient: string) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_PORT === '465',
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
      ${data.intent ? `<p><strong>Intent:</strong> ${data.intent}</p>` : ''}
      <p><strong>Message:</strong></p>
      <p>${data.message.replace(/\n/g, '<br>')}</p>
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
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const recipient = process.env.CONTACT_TO || 'realvibeairealty@gmail.com';

    try {
      // Try Resend first
      if (resend) {
        await sendEmailWithResend(data, recipient);
      }
      // Fallback to SMTP if Resend is not available
      else if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
        await sendEmailWithSMTP(data, recipient);
      }
      // Fallback to console logging
      else {
        console.log('📧 New Contact Form Submission:', {
          name: data.name,
          email: data.email,
          phone: data.phone,
          intent: data.intent,
          message: data.message,
          aiConsent: data.aiConsent,
          timestamp: new Date().toISOString(),
        });
      }

      return NextResponse.json({ ok: true });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      
      // Log to console as fallback
      console.log('📧 New Contact Form Submission (email failed):', {
        name: data.name,
        email: data.email,
        phone: data.phone,
        intent: data.intent,
        message: data.message,
        aiConsent: data.aiConsent,
        timestamp: new Date().toISOString(),
        error: emailError,
      });

      return NextResponse.json({ ok: true }); // Still return success to user
    }
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
