/**
 * Post-build smoke test for Taiwan.md
 * 
 * Runs after `npm run build` to catch silent failures like:
 * - getStaticPaths returning 0 paths (empty catch swallowing errors)
 * - Category pages showing "內容準備中" instead of articles
 * - Build producing far fewer pages than expected
 * 
 * Exit code 1 = CI should NOT deploy.
 */

import { readdir, readFile, stat } from 'node:fs/promises';
import { resolve, join, relative } from 'node:path';

const DIST = resolve(process.cwd(), 'dist');
const MIN_TOTAL_PAGES = 300;
const MIN_ARTICLES_PER_CATEGORY = 3;
const CATEGORIES = [
  'history', 'geography', 'culture', 'food', 'art',
  'music', 'technology', 'nature', 'people', 'society',
  'economy', 'lifestyle'
];

let errors = [];
let warnings = [];

// ── 1. Count total HTML pages ──

async function countHtml(dir) {
  let count = 0;
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) {
        count += await countHtml(full);
      } else if (entry.name.endsWith('.html')) {
        count++;
      }
    }
  } catch {}
  return count;
}

const totalPages = await countHtml(DIST);
console.log(`📊 Total HTML pages: ${totalPages}`);

if (totalPages < MIN_TOTAL_PAGES) {
  errors.push(`Total pages (${totalPages}) below minimum (${MIN_TOTAL_PAGES}). Likely a getStaticPaths failure.`);
}

// ── 2. Check each category has article pages (not just index) ──

for (const cat of CATEGORIES) {
  const catDir = join(DIST, cat);
  try {
    const entries = await readdir(catDir, { withFileTypes: true });
    const articleDirs = entries.filter(e => e.isDirectory() && e.name !== 'index');
    const articleCount = articleDirs.length;
    
    if (articleCount < MIN_ARTICLES_PER_CATEGORY) {
      errors.push(`/${cat}/ has only ${articleCount} article pages (min: ${MIN_ARTICLES_PER_CATEGORY})`);
    } else {
      console.log(`  ✅ /${cat}/: ${articleCount} articles`);
    }
  } catch {
    errors.push(`/${cat}/ directory missing in dist/`);
  }
}

// ── 3. Spot-check: category index pages should have article cards ──

for (const cat of CATEGORIES) {
  const indexPath = join(DIST, cat, 'index.html');
  try {
    const html = await readFile(indexPath, 'utf-8');
    const hasArticles = html.includes('article-card') || html.includes('articlesGrid');
    const hasComingSoon = html.includes('coming-soon-content');
    // If the page has the "coming soon" block but no article cards, it's broken
    if (hasComingSoon && !hasArticles) {
      errors.push(`/${cat}/index.html has no article cards — only "coming soon" fallback`);
    }
  } catch {
    warnings.push(`/${cat}/index.html not found`);
  }
}

// ── 4. Spot-check: random article pages should have real content ──

const SAMPLE_CATEGORIES = ['history', 'people', 'culture'];
for (const cat of SAMPLE_CATEGORIES) {
  const catDir = join(DIST, cat);
  try {
    const entries = await readdir(catDir, { withFileTypes: true });
    const articleDirs = entries.filter(e => e.isDirectory());
    if (articleDirs.length > 0) {
      const sample = articleDirs[0];
      const htmlPath = join(catDir, sample.name, 'index.html');
      const s = await stat(htmlPath);
      if (s.size < 1024) {
        warnings.push(`/${cat}/${sample.name}/index.html is suspiciously small (${s.size} bytes)`);
      }
    }
  } catch {}
}

// ── Report ──

console.log('');
if (warnings.length > 0) {
  console.log(`⚠️  ${warnings.length} warning(s):`);
  warnings.forEach(w => console.log(`   - ${w}`));
}

if (errors.length > 0) {
  console.log(`\n🔴 ${errors.length} CRITICAL error(s):`);
  errors.forEach(e => console.log(`   - ${e}`));
  console.log('\n❌ Post-build check FAILED. Deploy blocked.');
  process.exit(1);
} else {
  console.log(`\n✅ Post-build check passed. ${totalPages} pages, all categories healthy.`);
}
