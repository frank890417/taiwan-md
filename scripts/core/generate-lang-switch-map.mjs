#!/usr/bin/env node
/**
 * generate-lang-switch-map.mjs — pre-build LangMap registry JSON
 *
 * 為什麼：getLangSwitchPath.ts 在 Header.astro / Banner.astro 用，6950 pages
 * 各自 build registry from `_translations.json` + readdir 14 categories +
 * decode/encode pairs。即使 module-level cache（Tier 1.2）讓一個 process 只
 * 跑一次，那次仍是 ~150-300ms 重活，且未來 dev mode multi-worker 會每 worker
 * 重做。
 *
 * 本腳本一次性把 registry 算完寫進 `public/api/lang-switch-map.json`，
 * runtime 只 readFile + JSON.parse → O(1) Map lookup。
 *
 * Output schema:
 * {
 *   "generated_at": "2026-05-03T...",
 *   "languages": ["en", "ja", "ko", "es", "fr"],
 *   "registry": {
 *     "en": {
 *       "toZh": { "/en/cat/slug": "/cat/中文檔" },
 *       "fromZh": { "/cat/中文檔": "/en/cat/slug" }
 *     },
 *     ...
 *   }
 * }
 *
 * Usage: node scripts/core/generate-lang-switch-map.mjs
 */

import { readFile, readdir, writeFile, mkdir } from 'node:fs/promises';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { LANGUAGES } from '../../src/config/languages.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const REPO = join(__dirname, '../..');
const KNOWLEDGE_DIR = join(REPO, 'knowledge');
const TRANSLATIONS_PATH = join(KNOWLEDGE_DIR, '_translations.json');
const OUT_PATH = join(REPO, 'public/api/lang-switch-map.json');

const NON_DEFAULT_ENABLED_LANGS = LANGUAGES.filter(
  (l) => l.enabled && !l.isDefault,
).map((l) => l.code);

const CATEGORY_FOLDER_TO_SLUG = {
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
  About: 'about',
  Resources: 'resources',
};

function normalizePath(path) {
  if (!path) return '/';
  const withLeading = path.startsWith('/') ? path : `/${path}`;
  if (withLeading.length > 1 && withLeading.endsWith('/')) {
    return withLeading.slice(0, -1);
  }
  return withLeading;
}

async function getValidZhFiles() {
  const set = new Set();
  for (const folder of Object.keys(CATEGORY_FOLDER_TO_SLUG)) {
    try {
      const files = await readdir(join(KNOWLEDGE_DIR, folder));
      for (const f of files) {
        if (f.endsWith('.md') && !f.startsWith('_')) {
          set.add(`${folder}/${f}`);
        }
      }
    } catch {}
  }
  try {
    const topFiles = await readdir(KNOWLEDGE_DIR);
    for (const f of topFiles) {
      if (f.endsWith('.md') && !f.startsWith('_')) set.add(f);
    }
  } catch {}
  return set;
}

async function buildRegistry() {
  const registry = {};
  for (const lang of NON_DEFAULT_ENABLED_LANGS) {
    registry[lang] = { toZh: {}, fromZh: {} };
  }

  let translations = {};
  try {
    const raw = await readFile(TRANSLATIONS_PATH, 'utf-8');
    const translationsRaw = JSON.parse(raw);
    const validZh = await getValidZhFiles();
    for (const [lf, zf] of Object.entries(translationsRaw)) {
      if (validZh.has(zf)) translations[lf] = zf;
    }
  } catch (e) {
    console.error(`⚠️  讀 _translations.json 失敗: ${e.message}`);
    return registry;
  }

  // Build zhFile → enEntry index
  const zhToEnEntry = {};
  for (const [langFile, zhFile] of Object.entries(translations)) {
    if (!langFile.startsWith('en/')) continue;
    const parts = langFile.replace(/\.md$/, '').split('/');
    if (parts.length < 3) continue;
    const catSlug = CATEGORY_FOLDER_TO_SLUG[parts[1]] || parts[1].toLowerCase();
    zhToEnEntry[zhFile] = { catSlug, slug: parts[2] };
  }

  function add(lang, langUrl, zhUrl) {
    const m = registry[lang];
    if (!m) return;
    const nL = normalizePath(langUrl);
    const nZ = normalizePath(zhUrl);
    const langKeys = new Set([nL, decodeURIComponent(nL)]);
    const zhKeys = new Set([nZ, decodeURIComponent(nZ)]);
    for (const k of langKeys) m.toZh[k] = nZ;
    for (const k of zhKeys) m.fromZh[k] = nL;
  }

  for (const [langFile, zhFile] of Object.entries(translations)) {
    const langParts = langFile.replace(/\.md$/, '').split('/');
    const zhParts = zhFile.replace(/\.md$/, '').split('/');
    if (langParts.length < 2) continue;

    const langPrefix = langParts[0];
    if (!NON_DEFAULT_ENABLED_LANGS.includes(langPrefix)) continue;

    if (langParts.length >= 3 && zhParts.length >= 2) {
      const zhCatSlug =
        CATEGORY_FOLDER_TO_SLUG[zhParts[0]] || zhParts[0].toLowerCase();
      const zhUrl = `/${zhCatSlug}/${encodeURIComponent(zhParts[1])}`;
      const langCatSlug =
        CATEGORY_FOLDER_TO_SLUG[langParts[1]] || langParts[1].toLowerCase();

      if (langPrefix === 'en') {
        add(langPrefix, `/en/${langCatSlug}/${langParts[2]}`, zhUrl);
      } else {
        const nativeLangUrl = `/${langPrefix}/${langCatSlug}/${langParts[2]}`;
        add(langPrefix, nativeLangUrl, zhUrl);
        const enEntry = zhToEnEntry[zhFile];
        if (enEntry) {
          const canonicalLangUrl = `/${langPrefix}/${enEntry.catSlug}/${enEntry.slug}`;
          add(langPrefix, canonicalLangUrl, zhUrl);
        }
      }
    } else if (langParts.length === 2 && zhParts.length === 1) {
      const langUrl = `/${langPrefix}/${langParts[1]}`;
      const zhUrl = `/${encodeURIComponent(zhParts[0])}`;
      add(langPrefix, langUrl, zhUrl);
    }
  }

  return registry;
}

async function main() {
  console.log('🌐 generate-lang-switch-map...');
  const registry = await buildRegistry();

  const totalEntries = Object.values(registry).reduce(
    (sum, m) => sum + Object.keys(m.toZh).length + Object.keys(m.fromZh).length,
    0,
  );

  const output = {
    generated_at: new Date().toISOString(),
    languages: NON_DEFAULT_ENABLED_LANGS,
    total_entries: totalEntries,
    registry,
  };

  await mkdir(dirname(OUT_PATH), { recursive: true });
  await writeFile(OUT_PATH, JSON.stringify(output, null, 2));

  console.log(
    `   ✓ ${OUT_PATH} (${NON_DEFAULT_ENABLED_LANGS.length} langs, ${totalEntries} entries)`,
  );
  return 0;
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
