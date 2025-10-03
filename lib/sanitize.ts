export function sanitizeASCII(str: string): string {
  return str
    .replace(/[—–]/g, '-') // em-dash, en-dash
    .replace(/[“”]/g, '"') // smart double quotes
    .replace(/[‘’]/g, "'") // smart single quotes
    .replace(/…/g, '...') // ellipsis
    .replace(/•/g, '-') // bullet
    .replace(/[^\x00-\x7F]/g, ''); // remove any remaining non-ASCII characters
}

