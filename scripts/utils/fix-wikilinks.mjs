#!/usr/bin/env node
/**
 * fix-wikilinks.mjs — Auto-fix broken [[wikilinks]] in knowledge/
 *
 * Fixes:
 * 1. Path prefix: [[Category/article]] → [[article]]
 * 2. Case mismatch: [[TSMC]] → [[tsmc]] (match against actual filenames)
 * 3. Known renames: [[便利商店文化]] → [[台灣便利商店文化]]
 * 4. Reports truly missing (no fix available)
 */

import { readdirSync, readFileSync, writeFileSync, statSync } from 'fs';
import { join, basename, extname } from 'path';

const KNOWLEDGE = 'knowledge';
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
const LANGS = ['', 'en', 'es', 'ja'];

// ── Build article index ──
const titleToFile = new Map(); // lowercase title → actual filename (without .md)
const titleSet = new Set(); // original case titles

function indexDir(dir) {
  try {
    for (const f of readdirSync(dir)) {
      const full = join(dir, f);
      if (statSync(full).isDirectory()) continue;
      if (!f.endsWith('.md') || f.startsWith('_')) continue;
      const name = f.replace(/\.en\.md$/, '.md').replace(/\.md$/, '');
      titleSet.add(name);
      titleToFile.set(name.toLowerCase(), name);
    }
  } catch {}
}

for (const lang of LANGS) {
  for (const cat of CATEGORIES) {
    const dir = lang ? join(KNOWLEDGE, lang, cat) : join(KNOWLEDGE, cat);
    indexDir(dir);
  }
}

console.log(`📚 Indexed ${titleSet.size} articles`);

// ── Known renames (from --fix suggestions) ──
const RENAMES = {
  便利商店文化: '台灣便利商店文化',
  台灣半導體產業: '半導體產業',
  台灣特有種: '特有種',
  'taiwanese-tea-culture': 'tea-culture',
};

// ── Process all .md files ──
let totalFixed = 0;
let totalUnfixable = 0;
const unfixableSet = new Map(); // title → count

function processFile(filepath) {
  let content = readFileSync(filepath, 'utf8');
  let changed = false;

  // Match [[...]] but not ![[...]] (images)
  const newContent = content.replace(
    /(?<!!)\[\[([^\]]+)\]\]/g,
    (match, linkText) => {
      // Skip if contains | (display text) — only fix the link part
      let displayPart = '';
      let target = linkText;
      if (linkText.includes('|')) {
        [target, displayPart] = linkText.split('|', 2);
        displayPart = '|' + displayPart;
      }

      const origTarget = target.trim();
      let fixedTarget = origTarget;

      // Fix 1: Remove category path prefix
      const pathMatch = fixedTarget.match(
        /^(About|Art|Culture|Economy|Food|Geography|History|Lifestyle|Music|Nature|People|Society|Technology)\/(.+)$/i,
      );
      if (pathMatch) {
        fixedTarget = pathMatch[2];
      }

      // Fix 2: Known renames
      if (RENAMES[fixedTarget]) {
        fixedTarget = RENAMES[fixedTarget];
      }

      // Fix 3: Case-insensitive match
      if (!titleSet.has(fixedTarget)) {
        const lower = fixedTarget.toLowerCase();
        if (titleToFile.has(lower)) {
          fixedTarget = titleToFile.get(lower);
        }
      }

      // Check if fixed
      if (
        fixedTarget !== origTarget &&
        (titleSet.has(fixedTarget) ||
          titleToFile.has(fixedTarget.toLowerCase()))
      ) {
        changed = true;
        totalFixed++;
        return `[[${fixedTarget}${displayPart}]]`;
      }

      // Still broken?
      if (
        !titleSet.has(origTarget) &&
        !titleToFile.has(origTarget.toLowerCase())
      ) {
        // Check if the fixed version exists
        if (fixedTarget !== origTarget && titleSet.has(fixedTarget)) {
          changed = true;
          totalFixed++;
          return `[[${fixedTarget}${displayPart}]]`;
        }
        unfixableSet.set(origTarget, (unfixableSet.get(origTarget) || 0) + 1);
        totalUnfixable++;
      }

      return match;
    },
  );

  if (changed) {
    writeFileSync(filepath, newContent, 'utf8');
    return true;
  }
  return false;
}

let filesFixed = 0;
function walkDir(dir) {
  try {
    for (const f of readdirSync(dir)) {
      const full = join(dir, f);
      if (statSync(full).isDirectory()) {
        walkDir(full);
      } else if (f.endsWith('.md')) {
        if (processFile(full)) filesFixed++;
      }
    }
  } catch {}
}

walkDir(KNOWLEDGE);

console.log(`\n✅ Fixed ${totalFixed} wikilinks across ${filesFixed} files`);
console.log(`⚠️  ${totalUnfixable} unfixable (article doesn't exist)`);

if (unfixableSet.size > 0) {
  console.log(`\n📋 Top unfixable targets (article needs to be created):`);
  const sorted = [...unfixableSet.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 30);
  for (const [title, count] of sorted) {
    console.log(`   ${count}x [[${title}]]`);
  }
}
