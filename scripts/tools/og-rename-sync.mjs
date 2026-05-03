#!/usr/bin/env node
/**
 * og-rename-sync.mjs — 同步 OG cache file 對應 git rename，避免 cache miss 全 regen
 *
 * 背景（2026-05-03）：PR #797 cross-lang baseline rename 902 lang files 到 en
 * canonical slug (per URL convention 2026-04-12)。OG cache file 用 lang URL slug
 * 為 path（{lang}/{cat}/{urlSlug}.jpg），rename 後 outputPath 變 → cache miss →
 * 全 regen ~4500 images = 40 min build slowdown。
 *
 * Fix: 在 OG generation 前跑此 script，掃 git log rename history，把對應 OG
 * cache file 從舊 path mv 到新 path。
 *
 * Strategy:
 * 1. git log -M --name-status --diff-filter=R 抓最近 N commits 的 rename
 * 2. 過濾 knowledge/{lang}/Cat/file.md 的 lang file rename
 * 3. 計算對應 OG path（lang URL slug = file basename without .md）
 * 4. mv public/og-images/{lang}/{cat_slug}/{old_slug}.jpg → {new_slug}.jpg
 *
 * Usage:
 *   node scripts/tools/og-rename-sync.mjs                     # default since 30 days
 *   node scripts/tools/og-rename-sync.mjs --since '7 days ago'
 *   node scripts/tools/og-rename-sync.mjs --dry-run
 */

import { execSync } from 'node:child_process';
import { existsSync, statSync, renameSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { LANGUAGES } from '../../src/config/languages.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const REPO = join(__dirname, '../..');
const OG_DIR = join(REPO, 'public/og-images');

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const sinceIdx = args.indexOf('--since');
const since = sinceIdx >= 0 ? args[sinceIdx + 1] : '30 days ago';

const CATEGORY_FOLDER_TO_SLUG = {
  About: 'about',
  History: 'history',
  Geography: 'geography',
  Culture: 'culture',
  Food: 'food',
  Art: 'art',
  Music: 'music',
  Technology: 'technology',
  Nature: 'nature',
  People: 'people',
  Society: 'society',
  Economy: 'economy',
  Lifestyle: 'lifestyle',
  Resources: 'resources',
  Language: 'language',
};

// Derive non-default enabled lang codes from LANGUAGES_REGISTRY
// (avoid hardcode array — DNA #20 architecture-as-data)
const ENABLED_LANGS = new Set(
  LANGUAGES.filter((l) => l.enabled && !l.isDefault).map((l) => l.code),
);

function gitRenames() {
  // -M for rename detection, --diff-filter=R only renames, --name-status R000 old new
  const cmd = `git log -M --name-status --diff-filter=R --pretty=format: --since='${since}' -- knowledge/`;
  let out = '';
  try {
    out = execSync(cmd, { cwd: REPO, encoding: 'utf-8' });
  } catch (e) {
    console.error(`git log failed: ${e.message}`);
    return [];
  }

  const renames = [];
  for (const line of out.split('\n')) {
    if (!line.startsWith('R')) continue;
    // Format: R100\tknowledge/ja/Music/ktv.md\tknowledge/ja/Music/ktv-culture.md
    const parts = line.split('\t');
    if (parts.length < 3) continue;
    const [, oldPath, newPath] = parts;

    // Parse: knowledge/{lang}/{Category}/{slug}.md
    const oldMatch = oldPath.match(/^knowledge\/([^/]+)\/([^/]+)\/(.+)\.md$/);
    const newMatch = newPath.match(/^knowledge\/([^/]+)\/([^/]+)\/(.+)\.md$/);
    if (!oldMatch || !newMatch) continue;

    const [, oldLang, oldCat, oldSlug] = oldMatch;
    const [, newLang, newCat, newSlug] = newMatch;

    // Only handle non-zh lang renames within same lang+category
    if (!ENABLED_LANGS.has(oldLang)) continue;
    if (oldLang !== newLang) continue;
    if (oldCat !== newCat) continue;
    if (oldSlug === newSlug) continue;

    renames.push({ lang: oldLang, cat: oldCat, oldSlug, newSlug });
  }
  return renames;
}

function ogPathFor(lang, cat, slug) {
  const catSlug = CATEGORY_FOLDER_TO_SLUG[cat] || cat.toLowerCase();
  return join(OG_DIR, lang, catSlug, `${slug}.jpg`);
}

function main() {
  if (!existsSync(OG_DIR)) {
    console.log(`OG_DIR not found: ${OG_DIR} — skipping (no cache to sync)`);
    return 0;
  }

  const renames = gitRenames();
  console.log(`📋 git log rename detection (since '${since}'):`);
  console.log(`   ${renames.length} lang file renames found`);

  if (renames.length === 0) {
    console.log('✅ Nothing to sync.');
    return 0;
  }

  // Dedup: most recent rename wins (latest oldSlug→newSlug for given lang/cat/slug)
  // git log iterates newest first; first occurrence per (lang,cat,oldSlug) wins
  const seen = new Set();
  const dedupedRenames = [];
  for (const r of renames) {
    const key = `${r.lang}/${r.cat}/${r.oldSlug}`;
    if (seen.has(key)) continue;
    seen.add(key);
    dedupedRenames.push(r);
  }

  let applied = 0;
  let skipped_no_old = 0;
  let skipped_target_exists = 0;
  let failed = 0;

  for (const r of dedupedRenames) {
    const oldJpg = ogPathFor(r.lang, r.cat, r.oldSlug);
    const newJpg = ogPathFor(r.lang, r.cat, r.newSlug);

    if (!existsSync(oldJpg)) {
      skipped_no_old++;
      continue;
    }
    if (existsSync(newJpg)) {
      // Target already correct — old jpg is stale leftover, can delete or leave
      skipped_target_exists++;
      continue;
    }

    if (dryRun) {
      console.log(
        `  [dry-run] mv ${oldJpg.replace(REPO + '/', '')} → ${newJpg.replace(REPO + '/', '')}`,
      );
      applied++;
      continue;
    }

    try {
      renameSync(oldJpg, newJpg);
      applied++;
    } catch (e) {
      console.error(`  ❌ mv failed ${oldJpg} → ${newJpg}: ${e.message}`);
      failed++;
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`   Renames detected (deduped): ${dedupedRenames.length}`);
  console.log(`   ✅ Applied (mv old→new):     ${applied}`);
  console.log(`   ⏭️  Skipped (no old jpg):     ${skipped_no_old}`);
  console.log(`   ⏭️  Skipped (target exists):  ${skipped_target_exists}`);
  console.log(`   ❌ Failed:                    ${failed}`);

  if (dryRun) {
    console.log(`\n(dry-run; pass without --dry-run to apply)`);
  }

  return failed > 0 ? 1 : 0;
}

process.exit(main());
