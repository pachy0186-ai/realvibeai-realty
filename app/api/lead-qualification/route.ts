import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { sanitize as S } from '@/app/lib/sanitize';

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

  // Normalize intent
  const intent = (data.intent || '').toLowerCase();

  // Intent-based scoring
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

  // Message length (longer messages often indicate higher intent)
  if (msg.length > 100) {
    score += 10;
    reasoning.push('Detailed message (higher engagement)');
  }

  const priority: Priority = score >= 60 ? 'Hot' : score >= 30 ? 'Warm' : 'Cold';
  return { score, priority, reasoning };
}

async function sendAutoReply(data: LeadData, leadScore: LeadScore) {
  if (!resend) {
    console.log('Auto-reply not sent: Resend not configured');
    return;
  }

  const businessEmail = process.env.BUSINESS_EMAIL || 'realvibeairealty@gmail.com';

  // Normalize intent
  const intent = (data.intent || '').toLowerCase();

  // Build subject and body using ASCII-only content
  let subject = 'Thank you for contacting RealVibeAI';
  let body = `
    <h2>Thank you for reaching out</h2>
    <p>Hi ${data.name},</p>
    <p>We received your message and appreciate your interest in RealVibeAI.</p>
    <p><strong>Your message:</strong><br>${data.message}</p>
    <p>We will review your inquiry and get back to you within 24 hours with a personalized response.</p>
    <p>In the meantime, you may find these resources helpful:</p>
    <ul>
      <li><a href="https://www.realvibeai.com/realty/solutions">Our Solutions</a></li>
      <li><a href="https://www.realvibeai.com/realty/virtual-staging">Virtual Staging Examples</a></li>
      <li><a href="https://www.realvibeai.com/realty/faq">Frequently Asked Questions</a></li>
    </ul>
    <p>Best regards,<br>
    RealVibeAI Team<br>
    <a href="mailto:${businessEmail}">${businessEmail}</a></p>
  `;

  if (intent === 'demo') {
    subject = 'Demo request received - next steps';
    body = `
      <h2>Thank you for your demo request</h2>
      <p>Hi ${data.name},</p>
      <p>We received your request for a demo of our AI-powered lead qualification system.</p>
      <h3>What happens next:</h3>
      <ul>
        <li><strong>Within 2 hours:</strong> We will review your specific needs</li>
        <li><strong>Within 24 hours:</strong> You will receive a personalized demo link</li>
        <li><strong>Demo duration:</strong> 15-20 minutes</li>
      </ul>
      <p>In the meantime, you can explore our <a href="https://www.realvibeai.com/realty/virtual-staging">virtual staging examples</a>.</p>
      <p>Best regards,<br>
      RealVibeAI Team<br>
      <a href="mailto:${businessEmail}">${businessEmail}</a></p>
    `;
  } else if (intent === 'pricing') {
    subject = 'Pricing information - RealVibeAI';
    body = `
      <h2>Pricing information</h2>
      <p>Hi ${data.name},</p>
      <p>Thank you for your interest in RealVibeAI. We are excited to help you qualify leads more effectively.</p>
      <h3>Plans:</h3>
      <ul>
        <li><strong>Starter:</strong> $49/month - up to 100 leads per month</li>
        <li><strong>Professional:</strong> $99/month - up to 500 leads per month</li>
        <li><strong>Enterprise:</strong> Custom pricing for 1000+ leads per month</li>
      </ul>
      <p>All plans include: AI lead scoring, automated follow-ups, virtual staging tools, and email/SMS notifications.</p>
      <p>Ready to get started? <a href="https://www.realvibeai.com/realty/contact">Schedule a quick call</a>.</p>
      <p>Best regards,<br>
      RealVibeAI Team<br>
      <a href="mailto:${businessEmail}">${businessEmail}</a></p>
    `;
  }

  try {
    await resend.emails.send({
      from: `RealVibeAI Team <${businessEmail}>`,
      to: [data.email],
      subject,
      html: `
        ${body}
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #eeeeee;">
        <p style="font-size: 12px; color: #666666;">
          This email was generated by AI and may contain imperfections. Please verify important information.
          <br>Lead Priority: ${leadScore.priority} (Score: ${leadScore.score}/100)
        </p>
      `,
    });
    console.log(\Auto-reply sent to \${data.email} (\${leadScore.priority} priority)\);
  } catch (err) {
    console.error('Auto-reply failed:', err);
  }
}

export async function POST(request: NextRequest) {
  try {
    const raw = (await request.json()) as Record<string, unknown>;

    // Strict ASCII sanitization via shared util
    const data: LeadData = {
      name: S(raw.name),
      email: S(raw.email),
      phone: raw.phone ? S(raw.phone) : undefined,
      message: S(raw.message),
      intent: raw.intent ? S(raw.intent) : undefined,
      timestamp: S(raw.timestamp) || new Date().toISOString(),
    };

    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Qualify lead and send auto-reply
    const leadScore = qualifyLead(data);
    await sendAutoReply(data, leadScore);

    // Safe server log (ASCII only content should already be enforced by S)
    console.log('Lead qualified', {
      name: data.name,
      email: data.email,
      priority: leadScore.priority,
      score: leadScore.score,
      reasoning: leadScore.reasoning,
      timestamp: data.timestamp,
    });

    return NextResponse.json(
      {
        ok: true,
        leadScore,
        autoReplyStatus: resend ? 'sent' : 'skipped',
      },
      { status: 200 }
    );
  } catch (err) {
    console.error('Lead qualification error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
