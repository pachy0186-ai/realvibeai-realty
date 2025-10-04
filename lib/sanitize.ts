/**
 * Sanitizes strings by replacing non-ASCII characters with ASCII equivalents
 * Use this for any user input or content that will be used in:
 * - Email subjects/bodies
 * - HTTP headers
 * - API responses
 * - Any string serialization
 */
export function sanitizeASCII(str: string): string {
  return str
    .replace(/—/g, '-')           // em dash (U+2014)
    .replace(/–/g, '-')           // en dash (U+2013)
    .replace(/[""]/g, '"')        // smart double quotes
    .replace(/['']/g, "'")        // smart single quotes
    .replace(/…/g, '...')         // ellipsis (U+2026)
    .replace(/•/g, '-')           // bullet (U+2022)
    .replace(/\u00A0/g, ' ')      // non-breaking space
    .replace(/[^\x00-\x7F]/g, ''); // remove remaining non-ASCII
}

/**
 * Helper to safely sanitize unknown values
 */
export function cleanString(value: unknown): string {
  return sanitizeASCII(String(value ?? ''));
}
