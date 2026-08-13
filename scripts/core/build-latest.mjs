/**
 * build-latest.mjs — generate public/api/latest.json (時序主軸 client data)
 * + public/api/random-index-{lang}.json (隨機探索 per-lang href pool)
 *
 * Why: the article-page "站上最新" rail is rendered CLIENT-SIDE (so the static
 * HTML of every article page never changes when a new article ships — avoids
 * crawl churn + the lastmod=now freshness anti-pattern killed in c1403e259).
 * The client can't read src/data/content-dates.json (not under public/), so we
 * emit a small per-language latest list here.
 *
 * random-index (2026-06-10 build audit §5.1): article.template 原本把整語言
 * 文章清單（~50KB）define:vars 內嵌進每一頁只為了「隨機探索」按鈕 — 4,895 頁
 * × 50KB ≈ dist 多 250MB。改為 per-lang 共用 JSON（{category: [href...]}），
 * 按鈕 click 時才 lazy fetch。順手修 latent bug：譯文頁隨機跳轉原本沒帶
 * lang prefix（href 在這裡就含前綴）。
 *
 * Source of truth: knowledge/ frontmatter (title/description/readingTime) joined
 * with src/data/content-dates.json (git last-content-change time → accurate
 * "shipped" ordering, NOT hand-set frontmatter dates). Mirrors
 * src/utils/articles-index.ts getLatestArticles().
 *
 * Runs in the prebuild chain AFTER content-dates.json is generated; refresh-data
 * regenerates it via `npm run prebuild` (REFLEXES #43). Non-fatal on error.
 *
 * Design: reports/latest-articles-discoverability-design-2026-06-09.md §4 / WS1.
 */
import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve, join, basename } from 'node:path';
import matter from 'gray-matter';
import { ENABLED_LANGUAGE_CODES } from '../../src/config/languages.mjs';

const ROOT = process.cwd();
const LANGS = ENABLED_LANGUAGE_CODES;
const PER_LANG = 30;

// category slug (lowercase, matches URL + content-dates key) → knowledge/ folder
const CATEGORIES = {
  history: 'History',
  geography: 'Geography',
  culture: 'Culture',
  food: 'Food',
  art: 'Art',
  music: 'Music',
  technology: 'Technology',
  nature: 'Nature',
  people: 'People',
  society: 'Society',
  economy: 'Economy',
  lifestyle: 'Lifestyle',
  politics: 'Politics',
};

// content-dates.json key: zh-TW → `/${cat}/${slug}/`, else `/${lang}/${cat}/${slug}/`
function urlKey(lang, cat, slug) {
  return lang === 'zh-TW' ? `/${cat}/${slug}/` : `/${lang}/${cat}/${slug}/`;
}
// reader-facing href (percent-encoded slug)
function href(lang, cat, slug) {
  const enc = encodeURIComponent(slug);
  return lang === 'zh-TW' ? `/${cat}/${enc}` : `/${lang}/${cat}/${enc}`;
}

async function main() {
  let dates = {};
  try {
    const raw = await readFile(
      resolve(ROOT, 'src/data/content-dates.json'),
      'utf-8',
    );
    dates = JSON.parse(raw).dates ?? {};
  } catch {
    // content-dates not built yet — emit empty buckets, never break the build
  }

  await mkdir(resolve(ROOT, 'public/api'), { recursive: true });

  const byLang = {};
  for (const lang of LANGS) {
    const items = [];
    const randomPool = {}; // category → [href...] (all articles, no date filter)
    for (const [catSlug, folder] of Object.entries(CATEGORIES)) {
      const dir =
        lang === 'zh-TW'
          ? resolve(ROOT, 'knowledge', folder)
          : resolve(ROOT, 'knowledge', lang, folder);
      let files;
      try {
        files = await readdir(dir);
      } catch {
        continue; // missing category folder for this lang
      }
      for (const f of files) {
        if (!f.endsWith('.md') || f.startsWith('_')) continue;
        const slug = basename(f, '.md');
        (randomPool[catSlug] ??= []).push(href(lang, catSlug, slug));
        const date = dates[urlKey(lang, catSlug, slug)];
        if (!date) continue; // no git date → skip (matches getLatestArticles)
        let fm = {};
        try {
          fm = matter(await readFile(join(dir, f), 'utf-8')).data ?? {};
        } catch {
          /* unreadable frontmatter — fall back to slug title */
        }
        items.push({
          title: fm.title || slug,
          desc: fm.description || '',
          category: catSlug,
          href: href(lang, catSlug, slug),
          date,
          readingTime: fm.readingTime || null,
          image: fm.image || '', // cover for the full article-card rail (2026-06-14)
        });
      }
    }
    items.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
    byLang[lang] = items.slice(0, PER_LANG);

    // 隨機探索 per-lang pool（gitignored，prebuild 重生）
    await writeFile(
      resolve(ROOT, `public/api/random-index-${lang}.json`),
      JSON.stringify({ byCat: randomPool }),
    );
  }

  const out = {
    _generated: new Date().toISOString(),
    perLang: PER_LANG,
    byLang,
  };
  await writeFile(resolve(ROOT, 'public/api/latest.json'), JSON.stringify(out));
  const total = Object.values(byLang).reduce((s, a) => s + a.length, 0);
  console.log(
    `✓ latest.json: ${total} entries across ${LANGS.length} langs (top ${PER_LANG}/lang)`,
  );
}

main().catch((e) => {
  console.error('build-latest.mjs failed (non-fatal):', e.message);
});
