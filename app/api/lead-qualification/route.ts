import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { sanitize as S } from '@/app/lib/sanitize';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

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
  priority: 'Hot' | 'Warm' | 'Cold';
  reasoning: string[];
}

function qualifyLead(data: LeadData): LeadScore {
  let score = 0;
  const reasoning: string[] = [];

  // Intent-based scoring
  if (data.intent === 'demo') {
    score += 40;
    reasoning.push('Requested demo (high intent)');
  } else if (data.intent === 'pricing') {
    score += 30;
    reasoning.push('Asked about pricing (medium-high intent)');
  } else if (data.intent === 'question') {
    score += 10;
    reasoning.push('General inquiry (low-medium intent)');
  }

  // Phone number provided
  if (data.phone && data.phone.trim()) {
    score += 20;
    reasoning.push('Provided phone number (higher engagement)');
  }

  // Message quality and urgency indicators
  const message = data.message.toLowerCase();
  const urgentKeywords = ['urgent', 'asap', 'immediately', 'soon', 'quickly', 'ready to buy', 'looking to purchase'];
  const businessKeywords = ['business', 'company', 'team', 'organization', 'enterprise'];
  const timeKeywords = ['today', 'tomorrow', 'this week', 'next week'];

  if (urgentKeywords.some(keyword => message.includes(keyword))) {
    score += 25;
    reasoning.push('Contains urgency indicators');
  }

  if (businessKeywords.some(keyword => message.includes(keyword))) {
    score += 15;
    reasoning.push('Business/enterprise inquiry');
  }

  if (timeKeywords.some(keyword => message.includes(keyword))) {
    score += 15;
    reasoning.push('Specific timeline mentioned');
  }

  // Message length (longer messages often indicate higher intent)
  if (message.length > 100) {
    score += 10;
    reasoning.push('Detailed message (higher engagement)');
  }

  // Determine priority
  let priority: 'Hot' | 'Warm' | 'Cold';
  if (score >= 60) {
    priority = 'Hot';
  } else if (score >= 30) {
    priority = 'Warm';
  } else {
    priority = 'Cold';
  }

  return { score, priority, reasoning };
}

async function sendAutoReply(data: LeadData, leadScore: LeadScore) {
  if (!resend) {
    console.log('Auto-reply not sent: Resend not configured');
    return;
  }

  const businessEmail = process.env.BUSINESS_EMAIL || 'realvibeairealty@gmail.com';
  
  // Customize response based on intent and priority
  let responseTemplate = '';
  let subject = '';

  if (data.intent === 'demo') {
    subject = 'Demo Request Received - Next Steps';
    responseTemplate = `
      <h2>Thank you for your demo request!</h2>
      <p>Hi ${data.name},</p>
      <p>We received your request for a demo of our AI-powered lead qualification system. This is exciting!</p>
      
      <h3>What happens next:</h3>
      <ul>
        <li><strong>Within 2 hours:</strong> We'll review your specific needs</li>
        <li><strong>Within 24 hours:</strong> You'll receive a personalized demo link</li>
        <li><strong>Demo duration:</strong> 15-20 minutes of your time</li>
      </ul>

      <p>In the meantime, feel free to explore our <a href="https://www.realvibeai.com/realty/virtual-staging">Virtual Staging</a> examples.</p>
      
      <p>Questions? Simply reply to this email.</p>
      
      <p>Best regards,<br>
      RealVibeAI Team<br>
      <a href="mailto:${businessEmail}">${businessEmail}</a></p>
    `;
  } else if (data.intent === 'pricing') {
    subject = 'Pricing Information - RealVibeAI';
    responseTemplate = `
      <h2>Pricing Information</h2>
      <p>Hi ${data.name},</p>
      <p>Thank you for your interest in RealVibeAI! We're excited to help you qualify leads more effectively.</p>
      
      <h3>Our Transparent Pricing:</h3>
      <ul>
        <li><strong>Starter:</strong> $49/month - Up to 100 leads/month</li>
        <li><strong>Professional:</strong> $99/month - Up to 500 leads/month</li>
        <li><strong>Enterprise:</strong> Custom pricing for 1000+ leads/month</li>
      </ul>

      <p><strong>All plans include:</strong></p>
      <ul>
        <li>AI lead qualification (Hot/Warm/Cold scoring)</li>
        <li>Automated follow-up sequences</li>
        <li>Virtual staging tools</li>
        <li>Email & SMS notifications</li>
        <li>10-minute setup</li>
      </ul>

      <p>Ready to get started? <a href="https://www.realvibeai.com/realty/contact">Schedule a quick call</a> to discuss your specific needs.</p>
      
      <p>Best regards,<br>
      RealVibeAI Team<br>
      <a href="mailto:${businessEmail}">${businessEmail}</a></p>
    `;
  } else {
    subject = 'Thank you for contacting RealVibeAI';
    responseTemplate = `
      <h2>Thank you for reaching out!</h2>
      <p>Hi ${data.name},</p>
      <p>We received your message and appreciate your interest in RealVibeAI.</p>
      
      <p><strong>Your message:</strong><br>
      "${data.message}"</p>

      <p>We'll review your inquiry and get back to you within 24 hours with a personalized response.</p>
      
      <p>In the meantime, you might find these resources helpful:</p>
      <ul>
        <li><a href="https://www.realvibeai.com/realty/solutions">Our Solutions</a></li>
        <li><a href="https://www.realvibeai.com/realty/virtual-staging">Virtual Staging Examples</a></li>
        <li><a href="https://www.realvibeai.com/realty/faq">Frequently Asked Questions</a></li>
      </ul>
      
      <p>Best regards,<br>
      RealVibeAI Team<br>
      <a href="mailto:${businessEmail}">${businessEmail}</a></p>
    `;
  }

  try {
    await resend.emails.send({
      from: `RealVibeAI Team <${businessEmail}>`,
      to: [data.email],
      subject: subject,
      html: responseTemplate + `
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
        <p style="font-size: 12px; color: #666;">
          This email was generated by AI and may contain imperfections. Please verify important information.
          <br>Lead Priority: ${leadScore.priority} (Score: ${leadScore.score}/100)
        </p>
      `,
    });

    console.log(`Auto-reply sent to ${data.email} (${leadScore.priority} priority)`);
  } catch (error) {
    console.error('Auto-reply failed:', error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const rawData: unknown = await request.json();
    const body = rawData as Record<string, unknown>;
    const data: LeadData = {
      name: S(body.name),
      email: S(body.email),
      phone: body.phone ? S(body.phone) : undefined,
      message: S(body.message),
      intent: body.intent ? S(body.intent) : undefined,
      timestamp: S(body.timestamp),
    };

    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Qualify the lead
    const leadScore = qualifyLead(data);

    // Send auto-reply
    await sendAutoReply(data, leadScore);

    // Log for audit purposes
    console.log('Lead qualified:', {
      name: data.name,
      email: data.email,
      priority: leadScore.priority,
      score: leadScore.score,
      reasoning: leadScore.reasoning,
      timestamp: data.timestamp || new Date().toISOString(),
    });

    return NextResponse.json({
      ok: true,
      leadScore: {
        priority: leadScore.priority,
        score: leadScore.score,
        reasoning: leadScore.reasoning,
      },
      autoReplyStatus: resend ? 'sent' : 'skipped (no email service)',
    });
  } catch (error) {
    console.error('Lead qualification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
