// app/lib/sanitize.ts
export function sanitize(input: unknown): string {
  if (input === null || input === undefined) return '';
  let s = String(input);

  // Normalize & strip everything non-ASCII (0–127)
  s = s.normalize('NFKD').replace(/[^\x00-\x7F]/g, '');

  // Collapse whitespace and trim
  s = s.replace(/\s+/g, ' ').trim();

  return s;
}

// keep an alias some files import
export { sanitize as S };