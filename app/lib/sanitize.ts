/**
 * Sanitizes text input to remove unsafe / non-ASCII characters.
 */
export function sanitize(input: unknown): string {
  const s = (typeof input === 'string' ? input : input ?? '').toString();
  return s
    .replace(/[—–]/g, '-')   // em/en dashes → hyphen
    .replace(/[“”]/g, '"')   // curly double quotes → "
    .replace(/[‘’]/g, "'")   // curly single quotes → '
    .replace(/[^\x00-\x7F]/g, ''); // strip any remaining non-ASCII
}

