/* scripts/strip-sourcemaps.cjs */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '.next');
const exts = new Set(['.js', '.mjs', '.cjs']);

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else if (exts.has(path.extname(entry.name))) {
      let txt = fs.readFileSync(p, 'utf8');
      // remove //# sourceMappingURL=... on any line
      txt = txt.replace(/^[ \t]*\/\/#\s*sourceMappingURL=.*$/gm, '');
      fs.writeFileSync(p, txt);
    }
  }
}

if (fs.existsSync(ROOT)) walk(ROOT);