import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const dynamic = 'force-dynamic';

interface FollowUpFormData {
  email: string;
  name: string;
  subject: string;
  message: string;
  send: boolean;
}

async function sendFollowUpEmail(data: FollowUpFormData, recipient: string) {
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

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: recipient,
    subject: data.subject,
    html: `
      <h2>Follow-up Message from ${data.name}</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Subject:</strong> ${data.subject}</p>
      <p><strong>Message:</strong></p>
      <p>${(data.message || '').replace(/\n/g, '<br>')}</p>
      <hr>
      <p><small>Submitted at: ${new Date().toISOString()}</small></p>
    `,
  });
}

export async function POST(request: NextRequest) {
  try {
    const data: FollowUpFormData = await request.json();

    if (!data.email || !data.name || !data.subject || !data.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (data.send) {
      const recipient =
        process.env.BUSINESS_EMAIL ||
        process.env.CONTACT_TO ||
        'realvibeairealty@gmail.com';
      await sendFollowUpEmail(data, recipient);
      console.log('Follow-up email sent successfully');
      return NextResponse.json({ ok: true, sent: true });
    } else {
      console.log('Follow-up email not sent (send: false)', {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
        timestamp: new Date().toISOString(),
      });
      return NextResponse.json({ ok: true, sent: false });
    }
  } catch (error) {
    console.error('Follow-up API error', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

