#!/usr/bin/env node
/**
 * generate-og-images.mjs
 * 
 * Scans markdown articles across all enabled languages and categories.
 * visits `/og/[lang]/[category]/[slug]` to take a screenshot.
 * Stores output in `public/og-images/[lang]/[category]/[slug].png`.
 * 
 * Usage:
 *   npm run dev (in another tab)
 *   npm run og:generate -- --lang ko --category food
 *   npm run og:generate -- [slug]
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

// Language configuration (Should match src/config/languages.ts)
// We only scan these folders in knowledge/
const LANGUAGES = ['zh-TW', 'en', 'ja', 'ko']; 
const DEFAULT_LANG = 'zh-TW';

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

async function findMarkdownFiles(filterLang, filterCategory) {
  const results = [];
  const dirs = Object.keys(CATEGORY_MAP);
  
  const langsToScan = filterLang ? [filterLang] : LANGUAGES;

  for (const lang of langsToScan) {
    const isDefault = lang === DEFAULT_LANG;
    // Default is at root, others in subdirectories
    const langBasePath = isDefault ? knowledgeDir : join(knowledgeDir, lang);
    
    if (!existsSync(langBasePath)) continue;

    for (const folderName of dirs) {
        const categorySlug = CATEGORY_MAP[folderName];
        if (filterCategory && categorySlug !== filterCategory) continue;

        const folderPath = join(langBasePath, folderName);
        if (!existsSync(folderPath)) continue;
        
        const files = await readdir(folderPath);
        for (const file of files) {
          if (file.endsWith('.md') && !file.startsWith('_')) {
            const filePath = join(folderPath, file).normalize('NFC');
            const fileStat = await stat(filePath);
            
            results.push({
              lang,
              folderName,
              file,
              filePath,
              mtimeMs: fileStat.mtimeMs,
              categorySlug,
              slug: basename(file, '.md'),
            });
          }
        }
    }
  }
  return results;
}

async function main() {
  console.log(`\n🖼️  OG Image Generator (Multi-language)`);
  console.log(`   target: ${baseUrl}`);
  console.log(`   output: public/og-images/\n`);

  // Parse Simple Args
  const args = process.argv.slice(2);
  const filterLang = args.find(a => a.startsWith('--lang='))?.split('=')[1] || (args.includes('--lang') ? args[args.indexOf('--lang') + 1] : null);
  const filterCategory = args.find(a => a.startsWith('--category='))?.split('=')[1] || (args.includes('--category') ? args[args.indexOf('--category') + 1] : null);
  
  // Identify positional slug by ensuring it doesn't start with '-' AND doesn't immediately follow a flag
  const filterSlug = args.find((a, i) => {
    if (a.startsWith('-')) return false;
    if (i > 0 && args[i - 1].startsWith('--')) return false;
    return true;
  }) || (args.includes('--slug') ? args[args.indexOf('--slug') + 1] : null);

  if (filterLang) console.log(`🔍 Filter Language: ${filterLang}`);
  if (filterCategory) console.log(`🔍 Filter Category: ${filterCategory}`);
  if (filterSlug) console.log(`🔍 Filter Slug: ${filterSlug}`);

  const serverOk = await checkServer();
  if (!serverOk) process.exit(1);

  const entries = await findMarkdownFiles(filterLang, filterCategory);
  
  // Filter out those that don't need update
  const toUpdate = entries.filter((entry) => {
    // Slug filter
    if (filterSlug && entry.slug !== filterSlug) return false;

    const isDefault = entry.lang === DEFAULT_LANG;
    // Default: public/og-images/[cat]/[slug].png
    // Multi: public/og-images/[lang]/[cat]/[slug].png
    const langPath = isDefault ? '' : entry.lang;
    const categoryOutDir = join(outDir, langPath, entry.categorySlug);
    const pngPath = join(categoryOutDir, `${entry.slug}.png`);
    
    if (!existsSync(pngPath)) return true;
    
    const pngMtimeMs = statSync(pngPath).mtimeMs;
    return entry.mtimeMs > pngMtimeMs;
  });

  if (toUpdate.length === 0) {
    console.log(`✅ No images need generation.`);
    return;
  }

  console.log(`📝 Need to generate ${toUpdate.length} images.\n`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
    reducedMotion: 'reduce',
  });

  let succeeded = 0;
  let failed = 0;

  try {
    for (let i = 0; i < toUpdate.length; i++) {
        const entry = toUpdate[i];
        const isDefault = entry.lang === DEFAULT_LANG;
        const langPath = isDefault ? '' : entry.lang;
        const categoryOutDir = join(outDir, langPath, entry.categorySlug);
        
        if (!existsSync(categoryOutDir)) {
          mkdirSync(categoryOutDir, { recursive: true });
        }
        const pngPath = join(categoryOutDir, `${entry.slug}.png`);
        
        const encodedSlug = encodeURIComponent(entry.slug);
        // Visit /og/[lang]/[category]/[slug] or /og/[category]/[slug]
        const urlToVisit = isDefault 
            ? `${baseUrl}/og/${entry.categorySlug}/${encodedSlug}`
            : `${baseUrl}/og/${entry.lang}/${entry.categorySlug}/${encodedSlug}`;
        
        process.stdout.write(`[${i+1}/${toUpdate.length}] ${entry.lang}/${entry.categorySlug}/${entry.slug} ... `);

        const page = await context.newPage();
        try {
          await page.goto(urlToVisit, {
            waitUntil: 'networkidle',
            timeout: 15000,
          });

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
