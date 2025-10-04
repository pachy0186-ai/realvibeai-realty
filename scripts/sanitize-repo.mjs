import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

const TEXT_EXTENSIONS = ['.js', '.jsx', '.ts', '.tsx', '.md', '.mdx', '.json', '.yml', '.yaml', '.css', '.scss', '.html', '.txt', '.mjs', '.cjs'];
const SKIP_DIRS = ['node_modules', '.next', '.git', '.vercel', 'dist', 'build', '.turbo', 'attached_assets'];
const SKIP_FILES = ['package-lock.json', 'pnpm-lock.yaml', 'yarn.lock'];

const dryRun = process.argv.includes('--dry-run');

function sanitizeASCII(str) {
  let result = str
    .replace(/-/g, '-')           // em dash (U+2014)
    .replace(/-/g, '-')           // en dash (U+2013)
    .replace(/[""]/g, '"')        // smart double quotes (U+201C, U+201D)
    .replace(/['']/g, "'")        // smart single quotes (U+2018, U+2019)
    .replace(/.../g, '...')         // ellipsis (U+2026)
    .replace(/-/g, '-')           // bullet (U+2022)
    .replace(/\u00A0/g, ' ')      // non-breaking space
    .replace(/[^\x00-\x7F]/g, ''); // remove any remaining non-ASCII
  
  return result;
}

function shouldSkipDir(dirName) {
  return SKIP_DIRS.includes(dirName) || dirName.startsWith('.');
}

function shouldProcessFile(fileName) {
  if (SKIP_FILES.includes(fileName)) return false;
  const ext = path.extname(fileName);
  return TEXT_EXTENSIONS.includes(ext);
}

function walkDir(dir, callback) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      if (!shouldSkipDir(file)) {
        walkDir(filePath, callback);
      }
    } else if (stat.isFile() && shouldProcessFile(file)) {
      callback(filePath);
    }
  }
}

function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const sanitized = sanitizeASCII(content);
    
    if (content !== sanitized) {
      const changes = content.length - sanitized.length;
      const relativePath = path.relative(rootDir, filePath);
      
      console.log(`${relativePath}: ${changes} character(s) replaced`);
      
      if (!dryRun) {
        fs.writeFileSync(filePath, sanitized, 'utf-8');
      }
      
      return 1;
    }
    
    return 0;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return 0;
  }
}

console.log(dryRun ? '=== DRY RUN MODE ===' : '=== SANITIZING REPO ===');
console.log('');

let filesChanged = 0;
let totalFiles = 0;

walkDir(rootDir, (filePath) => {
  totalFiles++;
  filesChanged += processFile(filePath);
});

console.log('');
console.log(`Processed ${totalFiles} files`);
console.log(`Changed ${filesChanged} file(s)`);

if (dryRun) {
  console.log('');
  console.log('Run without --dry-run to apply changes');
}
