const CHAR_MAP: Record<string, string> = {
  '\u2014': '-',
  '\u2013': '-',
  '\u00A0': ' ',
  '\u2018': "'",
  '\u2019': "'",
  '\u201C': '"',
  '\u201D': '"'
};

export function sanitizeASCII(input: unknown): string {
  return String(input ?? '')
    .normalize('NFKD')
    .replace(/[^\x00-\x7F]/g, (ch) => CHAR_MAP[ch] ?? '?');
}
