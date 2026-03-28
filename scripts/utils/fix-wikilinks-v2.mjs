#!/usr/bin/env node
/**
 * fix-wikilinks-v2.mjs — Deep auto-fix for broken [[wikilinks]]
 *
 * Strategy:
 * 1. Path prefix: [[Category/article]] → [[article]]
 * 2. Known renames: [[便利商店文化]] → [[台灣便利商店文化]]
 * 3. Case-insensitive match
 * 4. Slug match: [[Morris Chang]] → [[morris-chang]] (kebab-case match)
 * 5. Title-from-frontmatter match: read title: field from .md files
 * 6. Hub references: [[_Society Hub]] → [[_Society Hub]] (skip Hub refs)
 * 7. Cross-lang: en/ files referencing zh articles → try en/ slug
 */

import { readdirSync, readFileSync, writeFileSync, statSync } from 'fs';
import { join, basename, relative } from 'path';

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

// ── Build comprehensive article index ──
const exactMatch = new Set(); // exact filename (no .md)
const lowerMap = new Map(); // lowercase → actual name
const slugMap = new Map(); // kebab-slug → actual name
const titleMap = new Map(); // frontmatter title (lower) → actual name
const filesByLang = new Map(); // 'en' → Set of filenames

function toSlug(s) {
  return s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '') // strip accents
    .replace(/[^a-z0-9\u4e00-\u9fff\u3400-\u4dbf]+/g, '-')
    .replace(/^-|-$/g, '');
}

function indexFile(filepath, lang) {
  const f = basename(filepath);
  if (!f.endsWith('.md') || f.startsWith('_')) return;

  const name = f.replace(/\.en\.md$/, '.md').replace(/\.md$/, '');
  exactMatch.add(name);
  lowerMap.set(name.toLowerCase(), name);
  slugMap.set(toSlug(name), name);

  if (!filesByLang.has(lang)) filesByLang.set(lang, new Set());
  filesByLang.get(lang).add(name);

  // Read frontmatter title
  try {
    const content = readFileSync(filepath, 'utf8');
    const fm = content.match(/^---\n([\s\S]*?)\n---/);
    if (fm) {
      const titleLine = fm[1].match(/^title:\s*['"]?(.+?)['"]?\s*$/m);
      if (titleLine) {
        const title = titleLine[1].trim();
        titleMap.set(title.toLowerCase(), name);
        slugMap.set(toSlug(title), name);
      }
    }
  } catch {}
}

for (const lang of LANGS) {
  for (const cat of CATEGORIES) {
    const dir = lang ? join(KNOWLEDGE, lang, cat) : join(KNOWLEDGE, cat);
    try {
      for (const f of readdirSync(dir)) {
        const full = join(dir, f);
        if (!statSync(full).isDirectory()) indexFile(full, lang || 'zh');
      }
    } catch {}
  }
}

console.log(
  `📚 Indexed ${exactMatch.size} articles (${titleMap.size} with titles)`,
);

// ── Known renames ──
const RENAMES = {
  便利商店文化: '台灣便利商店文化',
  台灣半導體產業: '半導體產業',
  台灣特有種: '特有種',
  'taiwanese-tea-culture': 'tea-culture',
  台積電: '台灣企業：台積電',
  雲門舞集: '雲門舞集：台灣現代舞蹈的開創者',
};

// ── Resolve a wikilink target ──
function resolve(target, fileLang) {
  // Skip Hub references
  if (target.includes('Hub')) return null;

  // Direct match
  if (exactMatch.has(target)) return target;

  // Strip path prefix
  let t = target;
  const pathMatch = t.match(
    /^(?:About|Art|Culture|Economy|Food|Geography|History|Lifestyle|Music|Nature|People|Society|Technology)\/(.+)$/i,
  );
  if (pathMatch) t = pathMatch[1];
  if (exactMatch.has(t)) return t;

  // Known renames
  if (RENAMES[t]) {
    const r = RENAMES[t];
    if (exactMatch.has(r)) return r;
  }

  // Case-insensitive
  const lower = t.toLowerCase();
  if (lowerMap.has(lower)) return lowerMap.get(lower);

  // Slug match
  const slug = toSlug(t);
  if (slug && slugMap.has(slug)) return slugMap.get(slug);

  // Title match (frontmatter)
  if (titleMap.has(lower)) return titleMap.get(lower);

  // Partial slug match (e.g. "Morris Chang" → "morris-chang" exists in some file like "morris-chang-tsmc-founder.md")
  if (slug) {
    for (const [s, name] of slugMap) {
      if (s.startsWith(slug + '-') || s.startsWith(slug)) {
        return name;
      }
    }
  }

  return null;
}

// ── Process files ──
let totalFixed = 0;
let totalUnfixable = 0;
let filesFixed = 0;
const unfixableSet = new Map();

function processFile(filepath) {
  const rel = relative(KNOWLEDGE, filepath);
  const lang = rel.startsWith('en/')
    ? 'en'
    : rel.startsWith('es/')
      ? 'es'
      : rel.startsWith('ja/')
        ? 'ja'
        : 'zh';

  let content = readFileSync(filepath, 'utf8');
  let changed = false;

  const newContent = content.replace(
    /(?<!!)\[\[([^\]]+)\]\]/g,
    (match, linkText) => {
      let displayPart = '';
      let target = linkText;
      if (linkText.includes('|')) {
        [target, displayPart] = linkText.split('|', 2);
        displayPart = '|' + displayPart;
      }

      const origTarget = target.trim();

      // Skip Hub links and anchors
      if (origTarget.includes('Hub') || origTarget.includes('#')) return match;

      // Already valid?
      if (exactMatch.has(origTarget)) return match;

      const resolved = resolve(origTarget, lang);
      if (resolved && resolved !== origTarget) {
        changed = true;
        totalFixed++;
        return `[[${resolved}${displayPart}]]`;
      }

      if (!resolved) {
        unfixableSet.set(origTarget, (unfixableSet.get(origTarget) || 0) + 1);
        totalUnfixable++;
      }

      return match;
    },
  );

  if (changed) {
    writeFileSync(filepath, newContent, 'utf8');
    filesFixed++;
  }
}

function walk(dir) {
  try {
    for (const f of readdirSync(dir)) {
      const full = join(dir, f);
      if (statSync(full).isDirectory()) walk(full);
      else if (f.endsWith('.md')) processFile(full);
    }
  } catch {}
}

walk(KNOWLEDGE);

console.log(`\n✅ Fixed ${totalFixed} wikilinks across ${filesFixed} files`);
console.log(`⚠️  ${totalUnfixable} remaining unfixable`);

if (unfixableSet.size > 0) {
  console.log(`\n📋 Top 30 unfixable targets:`);
  const sorted = [...unfixableSet.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 30);
  for (const [title, count] of sorted) {
    console.log(`   ${count}x [[${title}]]`);
  }
}
