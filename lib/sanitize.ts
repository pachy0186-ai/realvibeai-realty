export interface ContactInput {
  name: string;
  email: string;
  phone?: string;
  intent?: string;
  timeframe?: string;
  budget?: string;
  financing?: string;
  message: string;
  aiConsent?: boolean;
  followUpConsent?: boolean;
  source?: string;
  sourceUrl?: string;
}

export interface ContactResponse {
  ok: boolean;
  warnings: string[];
  error?: string;
  detail?: string;
  leadId?: string;
}

const NON_ASCII_DASH = /[\u2012-\u2015]/g;
const NON_ASCII_SINGLE = /[\u2018\u2019]/g;
const NON_ASCII_DOUBLE = /[\u201C\u201D]/g;
const NON_ASCII = /[^\x00-\x7F]/g;

export const toAscii = (input?: string | null): string =>
  (input ?? '')
    .normalize('NFKC')
    .replace(NON_ASCII_DASH, '-')
    .replace(NON_ASCII_SINGLE, "'")
    .replace(NON_ASCII_DOUBLE, '"')
    .replace(NON_ASCII, '')
    .trim();

export const escapeHtml = (value: string): string =>
  toAscii(value).replace(/[&<>"']/g, (char) =>
    ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    }[char] ?? char)
  );

export const isEmail = (value: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export const sanitizeOptional = (value?: string | null): string | undefined => {
  const next = toAscii(value);
  return next ? next : undefined;
};

export function sanitizeContactInput(raw: Partial<ContactInput> | null | undefined): ContactInput | null {
  if (!raw) return null;

  const name = toAscii(raw.name);
  const email = toAscii(raw.email);
  const message = toAscii(raw.message);

  if (!name || !message || !isEmail(email)) {
    return null;
  }

  if (!raw.aiConsent) {
    return null;
  }

  return {
    name,
    email,
    phone: sanitizeOptional(raw.phone),
    intent: sanitizeOptional(raw.intent),
    timeframe: sanitizeOptional(raw.timeframe),
    budget: sanitizeOptional(raw.budget),
    financing: sanitizeOptional(raw.financing),
    message,
    aiConsent: Boolean(raw.aiConsent),
    followUpConsent: Boolean(raw.followUpConsent),
    source: sanitizeOptional(raw.source),
    sourceUrl: sanitizeOptional(raw.sourceUrl),
  };
}
