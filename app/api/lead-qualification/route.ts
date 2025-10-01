import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { sanitize } from '@/app/lib/sanitize';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

type Priority = 'Hot' | 'Warm' | 'Cold';

interface LeadData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  intent?: string;
  timestamp: string;
}

interface LeadScore {
  score: number;
  priority: Priority;
  reasoning: string[];
}

function qualifyLead(data: LeadData): LeadScore {
  let score = 0;
  const reasoning: string[] = [];

  // Intent-based scoring
  const intent = (data.intent || '').toLowerCase();
  if (intent === 'demo') {
    score += 40;
    reasoning.push('Requested demo (high intent)');
  } else if (intent === 'pricing') {
    score += 30;
    reasoning.push('Asked about pricing (medium-high intent)');
  } else if (intent === 'question') {
    score += 10;
    reasoning.push('General inquiry (low-medium intent)');
  }

  // Phone number provided
  if (data.phone && data.phone.trim()) {
    score += 20;
    reasoning.push('Provided phone number (higher engagement)');
  }

  // Message indicators
  const msg = (data.message || '').toLowerCase();
  const urgent = ['urgent', 'asap', 'immediately', 'soon', 'quickly', 'ready to buy', 'looking to purchase'];
  const business = ['business', 'company', 'team', 'organization', 'enterprise'];
  const timing = ['today', 'tomorrow', 'this week', 'next week'];

  if (urgent.some(k => msg.includes(k))) {
    score += 25;
    reasoning.push('Contains urgency indicators');
  }
  if (business.some(k => msg.includes(k))) {
    score += 15;
    reasoning.push('Business/enterprise inquiry');
  }
  if (timing.some(k => msg.includes(k))) {
    score += 15;
    reasoning.push('Specific timeline mentioned');
  }
  if (msg.length > 100) {
    score += 10;
    reasoning.push('Detailed message (higher engagement)');
  }

  const priority: Priority = score >= 60 ? 'Hot' : score >= 30 ? 'Warm' : 'Cold';
  return { score, priority, reasoning };
}

async function sendAutoReply(data: LeadData, leadScore: LeadScore) {
  if (!resend) return;

  const businessEmail = process.env.BUSINESS_EMAIL || 'realvibeairealty@gmail.com';

  let subject = 'Thank you for contacting RealVibeAI';
  let body = `
    <h2>Thank you for reaching out!</h2>
    <p>Hi ${data.name},</p>
    <p>We received your message and appreciate your interest in RealVibeAI.</p>
    <p><strong>Your message:</strong><br>${data.message}</p>
    <p>We will get back to you within 24 hours.</p>
  `;

  const intent = (data.intent || '').toLowerCase();
  if (intent === 'demo') {
    subject = 'Demo request received - next steps';
    body = `
      <h2>Thank you for your demo request!</h2>
      <p>Hi ${data.name},</p>
      <p>We will review your needs and send a demo link within 24 hours.</p>
    `;
  } else if (intent === 'pricing') {
    subject = 'Pricing information - RealVibeAI';
    body = `
      <h2>Pricing information</h2>
      <p>Hi ${data.name},</p>
      <p>Starter $49/mo, Pro $99/mo, Enterprise custom. Reply if you would like a quick call.</p>
    `;
  }

  await resend.emails.send({
    from: RealVibeAI Team <${businessEmail}>,
    to: [data.email],
    subject,
    html: `${body}
      <hr style="margin:20px 0;border:none;border-top:1px solid #eee;">
      <p style="font-size:12px;color:#666">
        Lead Priority: ${leadScore.priority} (Score: ${leadScore.score}/100)
      </p>`,
  });
}

export async function POST(request: NextRequest) {
  try {
    const raw = (await request.json()) as Record<string, unknown>;

    // Strict ASCII sanitization to avoid ByteString issues
    const data: LeadData = {
      name: sanitize(String(raw.name ?? '')),
      email: sanitize(String(raw.email ?? '')),
      phone: raw.phone ? sanitize(String(raw.phone)) : undefined,
      message: sanitize(String(raw.message ?? '')),
      intent: raw.intent ? sanitize(String(raw.intent)) : undefined,
      timestamp: sanitize(String(raw.timestamp ?? new Date().toISOString())),
    };

    if (!data.name || !data.email || !data.message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const leadScore = qualifyLead(data);
    await sendAutoReply(data, leadScore);

    // Server log (safe ASCII)
    console.log('Lead qualified', {
      name: data.name,
      email: data.email,
      priority: leadScore.priority,
      score: leadScore.score,
      timestamp: data.timestamp,
    });

    return NextResponse.json({
      ok: true,
      leadScore,
      autoReplyStatus: resend ? 'sent' : 'skipped',
    });
  } catch (err) {
    console.error('Lead qualification error', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
