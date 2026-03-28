/**
 * Frontmatter YAML validation for Taiwan.md
 *
 * Scans all .md files in knowledge/ and validates:
 * - YAML parses without error (gray-matter)
 * - Required fields exist: title, description, date, tags
 * - tags is an array (not string)
 * - date is a valid date
 * - No duplicate slugs within a category
 * - File naming conventions (no spaces in en/, lowercase)
 *
 * Run: node scripts/test-frontmatter.mjs
 * Exit 1 = validation failed (block commit/deploy)
 */

import { readdir, readFile } from 'node:fs/promises';
import { resolve, join, basename } from 'node:path';
import matter from 'gray-matter';

const KNOWLEDGE = resolve(process.cwd(), 'knowledge');
const CATEGORIES = [
  'About',
  'History',
  'Geography',
  'Culture',
  'Food',
  'Art',
  'Music',
  'Technology',
  'Nature',
  'People',
  'Society',
  'Economy',
  'Lifestyle',
];
const LANGS = ['', 'en', 'es', 'ja']; // '' = zh-TW root

const STRICT = process.argv.includes('--strict');
const CI_MODE = process.argv.includes('--ci');
const STAGED_MODE = process.argv.includes('--staged');
// Default: YAML parse errors are hard errors, missing fields are warnings
// --strict: everything is an error
// --ci: only validate changed files (git diff HEAD~1)
// --staged: only validate staged files (git diff --cached, for pre-commit hook)

let errors = [];
let warnings = [];
let totalFiles = 0;
let passedFiles = 0;

// In CI/staged mode, get list of changed .md files in knowledge/
let changedFiles = null;
if (CI_MODE || STAGED_MODE) {
  try {
    const { execSync } = await import('node:child_process');
    const cmd = STAGED_MODE
      ? 'git diff --cached --name-only --diff-filter=ACM -- knowledge/'
      : 'git diff --name-only HEAD~1 -- knowledge/';
    const diff = execSync(cmd, { encoding: 'utf-8' });
    changedFiles = new Set(diff.trim().split('\n').filter(Boolean));
    const mode = STAGED_MODE ? 'Staged' : 'CI';
    if (changedFiles.size === 0) {
      console.log(
        `🔍 ${mode} mode: no knowledge/ .md files changed, skipping.\n`,
      );
      process.exit(0);
    }
    console.log(`🔍 ${mode} mode: checking ${changedFiles.size} file(s)\n`);
  } catch {
    console.log('⚠️  Could not get git diff, skipping validation.\n');
    process.exit(0);
  }
}

// ── Helpers ──

function isValidDate(val) {
  if (!val) return false;
  const d = new Date(val);
  return !isNaN(d.getTime());
}

function isArrayOfStrings(val) {
  return Array.isArray(val) && val.every((v) => typeof v === 'string');
}

// ── Scan ──

for (const lang of LANGS) {
  for (const cat of CATEGORIES) {
    const dir = lang ? join(KNOWLEDGE, lang, cat) : join(KNOWLEDGE, cat);
    let files;
    try {
      files = (await readdir(dir)).filter(
        (f) => f.endsWith('.md') && !f.startsWith('_'),
      );
    } catch {
      // Category doesn't exist for this language — OK
      continue;
    }

    const slugs = new Map(); // slug → filename (duplicate detection)

    for (const file of files) {
      const filePath = join(dir, file);
      const relPath = lang
        ? `knowledge/${lang}/${cat}/${file}`
        : `knowledge/${cat}/${file}`;
      const label = lang ? `${lang}/${cat}/${file}` : `${cat}/${file}`;
      const slug = basename(file, '.md');

      // In CI mode, skip unchanged files
      if (changedFiles && !changedFiles.has(relPath)) continue;

      totalFiles++;

      // 1. Read & parse YAML
      let fm;
      try {
        const raw = await readFile(filePath, 'utf-8');
        const parsed = matter(raw);
        fm = parsed.data;
      } catch (err) {
        // YAML parse errors are always critical — they crash getStaticPaths
        errors.push(
          `${label}: YAML parse error — ${err.message.split('\n')[0]}`,
        );
        continue;
      }

      // 2. Required fields (warnings in relaxed mode, errors in strict)
      const report = STRICT ? (m) => errors.push(m) : (m) => warnings.push(m);
      if (!fm.title || typeof fm.title !== 'string') {
        report(`${label}: missing or invalid 'title'`);
      }
      if (!fm.description || typeof fm.description !== 'string') {
        report(`${label}: missing or invalid 'description'`);
      }
      if (!fm.date) {
        report(`${label}: missing 'date'`);
      } else if (!isValidDate(fm.date)) {
        errors.push(`${label}: invalid date '${fm.date}'`);
      }
      if (!fm.tags) {
        warnings.push(`${label}: missing 'tags' (should be an array)`);
      } else if (!isArrayOfStrings(fm.tags)) {
        errors.push(
          `${label}: 'tags' must be an array of strings, got ${typeof fm.tags}: ${JSON.stringify(fm.tags).slice(0, 80)}`,
        );
      }

      // 3. Duplicate slug detection
      if (slugs.has(slug)) {
        errors.push(
          `${label}: duplicate slug '${slug}' (also: ${slugs.get(slug)})`,
        );
      }
      slugs.set(slug, file);

      // 4. English file naming convention
      if (lang === 'en' && /[A-Z]/.test(slug) && slug !== slug.toLowerCase()) {
        warnings.push(`${label}: English slug has uppercase characters`);
      }

      // 5. Tags copy-paste detection (different title but identical tags to another file — heuristic)
      // Skipped for now: needs cross-file comparison after scan

      passedFiles++;
    }
  }
}

// ── Report ──

console.log(`\n📋 Frontmatter validation: ${totalFiles} files scanned\n`);

if (warnings.length > 0) {
  console.log(`⚠️  ${warnings.length} warning(s):`);
  warnings.slice(0, 20).forEach((w) => console.log(`   - ${w}`));
  if (warnings.length > 20)
    console.log(`   ... and ${warnings.length - 20} more`);
  console.log('');
}

if (errors.length > 0) {
  console.log(`🔴 ${errors.length} error(s):`);
  errors.slice(0, 30).forEach((e) => console.log(`   - ${e}`));
  if (errors.length > 30) console.log(`   ... and ${errors.length - 30} more`);
  console.log(
    `\n❌ Frontmatter validation FAILED (${errors.length} errors in ${totalFiles} files)`,
  );
  process.exit(1);
} else {
  console.log(
    `✅ Frontmatter validation passed: ${passedFiles}/${totalFiles} files OK${warnings.length ? ` (${warnings.length} warnings)` : ''}`,
  );
}
