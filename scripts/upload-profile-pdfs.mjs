/**
 * Upload private subtype PDFs to Supabase Storage bucket `profile-pdfs`.
 *
 * Usage (from repo root):
 *   node scripts/upload-profile-pdfs.mjs
 *
 * Needs in .env:
 *   VITE_SUPABASE_URL  (or SUPABASE_URL)
 *   SUPABASE_SERVICE_ROLE_KEY
 *
 * Source files: private-assets/profile-pdfs/*.pdf
 */
import { createClient } from '@supabase/supabase-js';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const pdfDir = path.join(root, 'private-assets', 'profile-pdfs');
const bucket = 'profile-pdfs';

/** Minimal .env loader (no dotenv dependency). */
async function loadEnvFile() {
  try {
    const text = await readFile(path.join(root, '.env'), 'utf8');
    for (const line of text.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eq = trimmed.indexOf('=');
      if (eq <= 0) continue;
      const key = trimmed.slice(0, eq).trim();
      let value = trimmed.slice(eq + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      if (!(key in process.env)) process.env[key] = value;
    }
  } catch {
    // .env optional if vars already exported
  }
}

await loadEnvFile();

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceKey) {
  console.error('Missing SUPABASE_URL/VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceKey);

const files = (await readdir(pdfDir)).filter((f) => f.toLowerCase().endsWith('.pdf'));
if (files.length === 0) {
  console.error(`No PDFs found in ${pdfDir}`);
  process.exit(1);
}

console.log(`Uploading ${files.length} PDFs to bucket "${bucket}"…`);

for (const file of files) {
  const fullPath = path.join(pdfDir, file);
  const bytes = await readFile(fullPath);
  const { error } = await supabase.storage.from(bucket).upload(file, bytes, {
    contentType: 'application/pdf',
    upsert: true,
  });
  if (error) {
    console.error(`FAIL ${file}:`, error.message);
  } else {
    console.log(`OK   ${file}`);
  }
}

console.log('Done. Bucket is private — only service-role edge functions can read these files.');
