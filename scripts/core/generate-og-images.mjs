#!/usr/bin/env node
/**
 * generate-og-images.mjs
 * 
 * Scans all markdown tracking knowledge base entries, and dynamically visits the local
 * `/og/<category>/<slug>` route to take a screenshot and generate an OG Image for each article.
 * Stores output in `public/og-images/`.
 * 
 * Uses incremental building (checks modification time of the .md file vs .png file).
 * 
 * Usage:
 *   # Start dev server in another tab:
 *   npm run dev
 * 
 *   # Then run generator
 *   npm run og:generate
 */

import { chromium } from 'playwright';
import { statSync, mkdirSync, existsSync } from 'node:fs';
import { readdir, stat } from 'node:fs/promises';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = join(__dirname, '..', '..');

const knowledgeDir = join(repoRoot, 'knowledge');
const outDir = join(repoRoot, 'public', 'og-images');

// Mapping Category from knowledge -> categorySlug in url
const CATEGORY_MAP = {
  'About': 'about',
  'History': 'history',
  'Geography': 'geography',
  'Culture': 'culture',
  'Food': 'food',
  'Art': 'art',
  'Music': 'music',
  'Technology': 'technology',
  'Nature': 'nature',
  'People': 'people',
  'Society': 'society',
  'Economy': 'economy',
  'Lifestyle': 'lifestyle',
};

const baseUrl = process.env.BASE_URL || 'http://localhost:4321';

async function checkServer() {
  try {
    const res = await fetch(baseUrl + '/');
    if (!res.ok) throw new Error(`status ${res.status}`);
    return true;
  } catch (err) {
    console.error(`\n❌ Cannot reach ${baseUrl}`);
    console.error(`\n   Run \`npm run dev\` in another shell first.\n`);
    return false;
  }
}

async function findMarkdownFiles() {
  // Returns array of { folderName, file, path, mdMtime, categorySlug, slug }
  const results = [];
  const dirs = Object.keys(CATEGORY_MAP);
  
  for (const folderName of dirs) {
    const folderPath = join(knowledgeDir, folderName);
    if (!existsSync(folderPath)) continue;
    
    const files = await readdir(folderPath);
    for (const file of files) {
      if (file.endsWith('.md') && !file.startsWith('_')) {
        const filePath = join(folderPath, file).normalize('NFC');
        const fileStat = await stat(filePath);
        
        results.push({
          folderName,
          file,
          filePath,
          mtimeMs: fileStat.mtimeMs,
          categorySlug: CATEGORY_MAP[folderName],
          slug: basename(file, '.md'),
        });
      }
    }
  }
  return results;
}

async function main() {
  console.log(`\n🖼️ OG Image Generator`);
  console.log(`   target: ${baseUrl}`);
  console.log(`   output: public/og-images/\n`);

  const serverOk = await checkServer();
  if (!serverOk) process.exit(1);

  const entries = await findMarkdownFiles();
  console.log(`Found ${entries.length} markdown articles to check...`);

  // Filter out those that don't need update
  const toUpdate = entries.filter((entry) => {
    const categoryOutDir = join(outDir, entry.categorySlug);
    const pngPath = join(categoryOutDir, `${entry.slug}.png`);
    
    if (!existsSync(pngPath)) return true;
    
    const pngMtimeMs = statSync(pngPath).mtimeMs;
    // If markdown is newer than PNG, we need to update
    return entry.mtimeMs > pngMtimeMs;
  });

  if (toUpdate.length === 0) {
    console.log(`✅ All ${entries.length} OG images are up-to-date! No screenshot needed.`);
    return;
  }

  console.log(`📝 Need to generate ${toUpdate.length} images.\n`);

  const browser = await chromium.launch({ headless: true });
  // We can share context 
  const context = await browser.newContext({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1, // 1x is fine for 1200x630 sharing images
    reducedMotion: 'reduce',
  });

  let succeeded = 0;
  let failed = 0;

  try {
    for (let i = 0; i < toUpdate.length; i++) {
        const entry = toUpdate[i];
        
        const categoryOutDir = join(outDir, entry.categorySlug);
        if (!existsSync(categoryOutDir)) {
          mkdirSync(categoryOutDir, { recursive: true });
        }
        const pngPath = join(categoryOutDir, `${entry.slug}.png`);
        
        // Encode slug for URL because standard URLs use URI encoding for Chinese
        const encodedSlug = encodeURIComponent(entry.slug);
        const urlToVisit = `${baseUrl}/og/${entry.categorySlug}/${encodedSlug}`;
        
        process.stdout.write(`[${i+1}/${toUpdate.length}] ${entry.categorySlug}/${entry.slug} ... `);

        const page = await context.newPage();
        try {
          await page.goto(urlToVisit, {
            waitUntil: 'networkidle',
            timeout: 10000,
          });

          // Wait for web fonts to load
          await page.evaluate(() => document.fonts?.ready);
          
          await page.screenshot({
            path: pngPath,
            clip: { x: 0, y: 0, width: 1200, height: 630 },
            animations: 'disabled',
          });
          
          console.log(`✓ DONE`);
          succeeded++;
        } catch (err) {
          console.log(`✗ ERROR: ${err.message}`);
          failed++;
        } finally {
          await page.close();
        }
    }
  } finally {
    await browser.close();
  }

  console.log(`\n${failed === 0 ? '✅' : '⚠️'}  ${succeeded}/${toUpdate.length} screenshots generated${failed ? `, ${failed} failed` : ''}\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
