import { NextRequest, NextResponse } from 'next/server';
import { Twilio } from 'twilio';

const twilio = process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN 
  ? new Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
  : null;

interface AlertData {
  name: string;
  intent: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: AlertData = await request.json();

    // Check if SMS is configured
    if (!twilio || !process.env.ALERT_TO_PHONE || !process.env.TWILIO_FROM) {
      console.log('SMS alert not configured, skipping');
      return NextResponse.json({ ok: true, message: 'SMS not configured' });
    }

    // Validate required fields
    if (!data.name || !data.intent) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Send SMS alert (brief message only)
    const message = `New lead: ${data.name} / ${data.intent}`;
    
    await twilio.messages.create({
      body: message,
      from: process.env.TWILIO_FROM,
      to: process.env.ALERT_TO_PHONE,
    });

    console.log('SMS alert sent successfully');
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('SMS alert error:', error);
    // Don't fail the request if SMS fails - it's optional
    return NextResponse.json({ ok: true, message: 'SMS failed but request processed' });
  }
}
