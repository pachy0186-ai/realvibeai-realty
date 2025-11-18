import { NextRequest, NextResponse } from 'next/server';
import {
  ContactInput,
  ContactResponse,
  escapeHtml,
  sanitizeContactInput,
  toAscii,
} from '@/lib/sanitize';
import { storeLeadInSupabase, syncHubSpotContact } from '@/lib/contact-integrations';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const isDev = process.env.NODE_ENV !== 'production';
const asciiKey = /^[\x00-\x7F]+$/;

const errMsg = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  try {
    return JSON.stringify(error);
  } catch {
    return String(error);
  }
};

const errStack = (error: unknown): string | undefined =>
  error instanceof Error && error.stack ? error.stack : undefined;

const buildEmailPayload = (data: ContactInput) => {
  const subject = `New contact: ${data.name}${data.intent ? ` (${data.intent})` : ''}`;

  const text = [
    'New contact form submission',
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.phone ? `Phone: ${data.phone}` : '',
    data.intent ? `Intent: ${data.intent}` : '',
    data.timeframe ? `Timeframe: ${data.timeframe}` : '',
    data.budget ? `Budget: ${data.budget}` : '',
    data.financing ? `Financing: ${data.financing}` : '',
    data.followUpConsent ? 'Follow-up consent: Yes' : '',
    data.sourceUrl ? `Source URL: ${data.sourceUrl}` : '',
    '',
    'Message:',
    data.message,
    '',
    `AI Consent: ${data.aiConsent ? 'Yes' : 'No'}`,
  ]
    .filter(Boolean)
    .join('\n');

  const html = [
    '<h2>New contact form submission</h2>',
    `<p><strong>Name:</strong> ${escapeHtml(data.name)}</p>`,
    `<p><strong>Email:</strong> ${escapeHtml(data.email)}</p>`,
    data.phone ? `<p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>` : '',
    data.intent ? `<p><strong>Intent:</strong> ${escapeHtml(data.intent)}</p>` : '',
    data.timeframe ? `<p><strong>Timeframe:</strong> ${escapeHtml(data.timeframe)}</p>` : '',
    data.budget ? `<p><strong>Budget:</strong> ${escapeHtml(data.budget)}</p>` : '',
    data.financing ? `<p><strong>Financing:</strong> ${escapeHtml(data.financing)}</p>` : '',
    data.followUpConsent ? '<p><strong>Follow-up consent:</strong> Yes</p>' : '',
    data.sourceUrl ? `<p><strong>Source URL:</strong> ${escapeHtml(data.sourceUrl)}</p>` : '',
    `<p><strong>AI Consent:</strong> ${data.aiConsent ? 'Yes' : 'No'}</p>`,
    '<hr>',
    `<p><strong>Message</strong><br>${escapeHtml(data.message).replace(/\n/g, '<br>')}</p>`,
  ]
    .filter(Boolean)
    .join('');

  return { subject, text, html };
};

const sendResendEmail = async (
  data: ContactInput,
  emailContent: { subject: string; text: string; html: string },
): Promise<string | null> => {
  const apiKey = process.env.RESEND_API_KEY;
  const toEnv =
    process.env.CONTACT_TO_EMAIL ||
    process.env.CONTACT_TO ||
    process.env.BUSINESS_EMAIL ||
    '';
  const fromEnv = process.env.FROM_EMAIL || process.env.BUSINESS_EMAIL || 'onboarding@resend.dev';

  if (!apiKey || !toEnv) {
    return null;
  }

  if (!asciiKey.test(apiKey)) {
    return 'We could not send an email confirmation because the API key is invalid.';
  }

  try {
    const { Resend } = await import('resend');
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: toAscii(fromEnv),
      to: [toAscii(toEnv)],
      subject: toAscii(emailContent.subject),
      text: emailContent.text,
      html: emailContent.html,
      reply_to: data.email,
    });
    return null;
  } catch (error) {
    console.error('Resend send error', errMsg(error), isDev ? errStack(error) : '');
    return 'We could not send the automated email notification. Our team will reply manually.';
  }
};

const sendSmtpEmail = async (
  emailContent: { subject: string; text: string; html: string },
): Promise<string | null> => {
  if (!process.env.SMTP_HOST) {
    return null;
  }

  const toEnv =
    process.env.CONTACT_TO_EMAIL ||
    process.env.CONTACT_TO ||
    process.env.BUSINESS_EMAIL ||
    '';
  const fromEnv = process.env.FROM_EMAIL || process.env.BUSINESS_EMAIL || 'no-reply@realvibe.ai';

  if (!toEnv) {
    return null;
  }

  try {
    const nodemailerMod = await import('nodemailer');
    const { createTransport } =
      nodemailerMod as unknown as { createTransport: typeof import('nodemailer')['createTransport'] };

    const transporter = createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: process.env.SMTP_PORT === '465',
      auth:
        process.env.SMTP_USER && process.env.SMTP_PASS
          ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
          : undefined,
    });

    await transporter.sendMail({
      from: toAscii(fromEnv),
      to: toAscii(toEnv),
      subject: toAscii(emailContent.subject),
      text: emailContent.text,
      html: emailContent.html,
    });
    return null;
  } catch (error) {
    console.error('SMTP send error', errMsg(error), isDev ? errStack(error) : '');
    return 'Our backup email channel is unavailable right now.';
  }
};

const invalidResponse = (status: number): NextResponse<ContactResponse> =>
  NextResponse.json(
    {
      ok: false,
      error: 'Invalid payload',
      warnings: [],
    },
    { status },
  );

export async function POST(request: NextRequest) {
  const warnings: string[] = [];

  try {
    const raw = ((await request.json().catch(() => null)) || null) as Partial<ContactInput> | null;
    const sanitized = sanitizeContactInput(raw);

    if (!sanitized) {
      return invalidResponse(400);
    }

    const referer = request.headers.get('referer') || request.headers.get('origin') || undefined;
    const contact: ContactInput = {
      ...sanitized,
      source: sanitized.source || 'contact_form',
      sourceUrl: sanitized.sourceUrl || referer,
    };

    const emailContent = buildEmailPayload(contact);

    let leadId: string | undefined;

    const supabaseResult = await storeLeadInSupabase(contact).catch((error) => {
      warnings.push('We could not store your info in our lead vault, but our team still received your request.');
      console.error('Supabase contact insert failed', errMsg(error), isDev ? errStack(error) : '');
      return null;
    });
    if (supabaseResult?.warning) warnings.push(supabaseResult.warning);
    if (supabaseResult?.leadId) leadId = supabaseResult.leadId;

    const hubspotResult = await syncHubSpotContact(contact).catch((error) => {
      warnings.push('We could not sync your info to our CRM automatically. No action is needed on your end.');
      console.error('HubSpot sync failed', errMsg(error), isDev ? errStack(error) : '');
      return null;
    });
    if (hubspotResult?.warning) warnings.push(hubspotResult.warning);

    const resendWarning = await sendResendEmail(contact, emailContent);
    if (resendWarning) warnings.push(resendWarning);

    const smtpWarning = await sendSmtpEmail(emailContent);
    if (smtpWarning) warnings.push(smtpWarning);

    return NextResponse.json(
      {
        ok: true,
        warnings: [...new Set(warnings)],
        leadId,
      },
      { headers: { 'Cache-Control': 'no-store' } },
    );
  } catch (error) {
    console.error('Contact API error', errMsg(error), isDev ? errStack(error) : '');
    return NextResponse.json(
      {
        ok: false,
        error: 'Internal server error',
        warnings: [],
        detail: isDev ? errMsg(error) : undefined,
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { ok: true, warnings: [] },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}