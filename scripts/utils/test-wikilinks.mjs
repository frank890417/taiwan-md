#!/usr/bin/env node
/**
 * test-wikilinks.mjs — 檢查所有 knowledge/ 中的 [[wikilink]] 交叉引用
 * 找出死連結（指向不存在的文章）
 *
 * Usage:
 *   node scripts/test-wikilinks.mjs              # 全量掃描
 *   node scripts/test-wikilinks.mjs --category History  # 只掃特定分類
 *   node scripts/test-wikilinks.mjs --fix         # 顯示建議修正
 */

import { readdir, readFile } from 'node:fs/promises';
import { join, basename, relative } from 'node:path';

const KNOWLEDGE = join(process.cwd(), 'knowledge');
const CATEGORIES = [
  'About',
  'Art',
  'Culture',
  'Economy',
  'Food',
  'Geography',
  'History',
  'Lifestyle',
  'Music',
  'Nature',
  'People',
  'Society',
  'Technology',
];
const LANGS = ['', 'en', 'es', 'ja', 'ko'];

// Parse args
const args = process.argv.slice(2);
const categoryFilter = args.includes('--category')
  ? args[args.indexOf('--category') + 1]
  : null;
const showFix = args.includes('--fix');

// Build index of all article titles (without .md)
const articleIndex = new Map(); // title -> [file paths]

async function scanDir(dir, lang = '') {
  let files;
  try {
    files = await readdir(dir);
  } catch {
    return;
  }
  for (const f of files) {
    if (!f.endsWith('.md') || f.startsWith('_')) continue;
    const title = f.replace(/\.md$/, '').replace(/\.en$/, '');
    const fullPath = join(dir, f);
    if (!articleIndex.has(title)) articleIndex.set(title, []);
    articleIndex.get(title).push(fullPath);
  }
}

// Scan all categories in all languages
for (const lang of LANGS) {
  for (const cat of CATEGORIES) {
    const dir = lang ? join(KNOWLEDGE, lang, cat) : join(KNOWLEDGE, cat);
    await scanDir(dir, lang);
  }
}

console.log(`📚 Article index: ${articleIndex.size} unique titles\n`);

// Now scan for wikilinks
const wikiLinkRegex = /\[\[([^\]|]+?)(?:\|[^\]]+?)?\]\]/g;
let totalLinks = 0;
let brokenLinks = 0;
const brokenByFile = new Map();
const brokenTargets = new Map(); // target -> count

async function checkFile(filePath) {
  const content = await readFile(filePath, 'utf-8');
  const relPath = relative(KNOWLEDGE, filePath);
  let match;

  while ((match = wikiLinkRegex.exec(content)) !== null) {
    const target = match[1].trim();
    totalLinks++;

    // Check if target exists in index
    if (!articleIndex.has(target)) {
      brokenLinks++;
      if (!brokenByFile.has(relPath)) brokenByFile.set(relPath, []);
      brokenByFile.get(relPath).push(target);
      brokenTargets.set(target, (brokenTargets.get(target) || 0) + 1);
    }
  }
}

// Scan files
const categoriesToScan = categoryFilter ? [categoryFilter] : CATEGORIES;
for (const lang of LANGS) {
  for (const cat of categoriesToScan) {
    const dir = lang ? join(KNOWLEDGE, lang, cat) : join(KNOWLEDGE, cat);
    let files;
    try {
      files = await readdir(dir);
    } catch {
      continue;
    }
    for (const f of files) {
      if (!f.endsWith('.md')) continue;
      await checkFile(join(dir, f));
    }
  }
}

// Report
console.log(`🔗 Total wikilinks scanned: ${totalLinks}`);
console.log(
  `${brokenLinks === 0 ? '✅' : '❌'} Broken links: ${brokenLinks}\n`,
);

if (brokenByFile.size > 0) {
  // Sort by number of broken links
  const sorted = [...brokenByFile.entries()].sort(
    (a, b) => b[1].length - a[1].length,
  );

  for (const [file, targets] of sorted) {
    console.log(`📄 ${file} (${targets.length} broken):`);
    for (const t of targets) {
      // Find similar titles for fix suggestions
      if (showFix) {
        const similar = findSimilar(t);
        if (similar) {
          console.log(`   ❌ [[${t}]] → 💡 did you mean [[${similar}]]?`);
        } else {
          console.log(`   ❌ [[${t}]] — no similar article found`);
        }
      } else {
        console.log(`   ❌ [[${t}]]`);
      }
    }
  }

  // Top broken targets
  console.log(`\n📊 Most referenced broken targets:`);
  const topBroken = [...brokenTargets.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15);
  for (const [target, count] of topBroken) {
    const suggestion = showFix ? findSimilar(target) : null;
    const fix = suggestion ? ` → 💡 [[${suggestion}]]` : '';
    console.log(`   ${count}x [[${target}]]${fix}`);
  }
}

// Simple fuzzy match
function findSimilar(target) {
  const lower = target.toLowerCase();
  let bestMatch = null;
  let bestScore = 0;

  for (const title of articleIndex.keys()) {
    const titleLower = title.toLowerCase();
    // Exact substring match
    if (titleLower.includes(lower) || lower.includes(titleLower)) {
      const score =
        Math.min(lower.length, titleLower.length) /
        Math.max(lower.length, titleLower.length);
      if (score > bestScore) {
        bestScore = score;
        bestMatch = title;
      }
    }
    // Check if removing common suffixes helps
    const stripped = lower.replace(/[：:—–\-]/g, '').trim();
    const titleStripped = titleLower.replace(/[：:—–\-]/g, '').trim();
    if (titleStripped.includes(stripped) || stripped.includes(titleStripped)) {
      const score =
        Math.min(stripped.length, titleStripped.length) /
        Math.max(stripped.length, titleStripped.length);
      if (score > bestScore) {
        bestScore = score;
        bestMatch = title;
      }
    }
  }

  return bestScore > 0.5 ? bestMatch : null;
}

process.exit(brokenLinks > 0 ? 1 : 0);
