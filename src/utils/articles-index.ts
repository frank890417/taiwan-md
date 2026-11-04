/**
 * articles-index.ts — Module-level shared frontmatter cache for all [slug].astro
 *
 * 為什麼：6 個 [slug].astro（zh + en + ja + ko + es + fr）每個 page render 都
 * 重做「relatedArticles 同 category 掃 + allArticles 全 category 掃」= readdir
 * + readFile + matter() loop。每篇文章 × N 篇同 cat + N×14 篇跨 cat = O(N²)
 * 重複工作。Article page 6950 × 這個 loop = build time 主要 hot path 之一。
 *
 * 本模組把整個 lang 的 article index 在 module 第一次呼叫時 build 完整次，
 * 後續所有 [slug].astro page render 共享同一個 in-memory Map。Build 整 process
 * 只 readdir 一次 + readFile 一次 + matter 一次 per file。
 *
 * 2026-05-03 sleepy-colden Tier 1.4 build-perf optimization。
 */

import { readdir, readFile } from 'node:fs/promises';
import { resolve, join, basename } from 'node:path';
import matter from 'gray-matter';

export interface ArticleSummary {
  title: string;
  slug: string;
  description: string;
  image: string;
  category: string; // category slug (lowercase)
  readingTime?: number; // frontmatter readingTime (分鐘)
  tags?: string[]; // frontmatter tags
  footnotes?: number; // count of [^n]: footnote definitions (引用深度訊號)
  /** 查證狀態三態（reports/design-curation-tier-2026-08-04.md）：
   * 'incubating' = 🌱 進化中（待查證／待擴寫），'verified' = 🔎 已深度查證，
   * undefined = 一般正式文章（缺省，多數）。只認顯式 frontmatter 值，不從
   * lastHumanReview 等其他欄位推導。非 zh-TW 語言：frontmatter 缺 curation
   * 時，若有 `translatedFrom` 指回 zh-TW 來源，繼承來源文章的 curation
   * （見 buildIndex 內 zhCurationMap）。 */
  curation?: 'incubating' | 'verified';
  /** incubating 的說明條種類（frontmatter curationReason，2026-11-04）：'thin' = 待擴寫；
   * 'unverified' 或缺省 = 待查證。譯文沒標時跟 curation 一起從 zh 來源繼承。 */
  curationReason?: 'unverified' | 'thin';
  /** 譯文層 frontmatter `translatedFrom: 'Technology/台灣鎢供應鏈.md'`（zh-TW
   * 來源檔的 Folder/slug.md 寫法）。zh-TW 自己沒有。文內嵌入卡（tw-article）靠
   * 它把作者寫的 zh 路徑對回這一語的譯文，見 getArticleByZhPath。 */
  translatedFrom?: string;
}

/** 只接受顯式 'incubating' / 'verified' 字串；其他任何值（含 true/false/其他
 * 字串）一律視為未設定，避免舊資料的雜訊被誤讀成查證狀態。 */
function normalizeCurationReason(
  value: unknown,
): 'unverified' | 'thin' | undefined {
  return value === 'unverified' || value === 'thin' ? value : undefined;
}

function normalizeCuration(
  value: unknown,
): 'incubating' | 'verified' | undefined {
  return value === 'incubating' || value === 'verified' ? value : undefined;
}

const CATEGORY_MAPPING: Record<string, string> = {
  about: 'About',
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

function safeMatter(fileContent: string): {
  data: Record<string, any>;
  content: string;
} {
  try {
    return matter(fileContent) as any;
  } catch {
    const stripped = fileContent.replace(/^---\s*\n[\s\S]*?\n---\s*\n/, '');
    return { data: {}, content: stripped };
  }
}

// Per-lang cache. 'zh-TW' reads knowledge/{Cat}/, others read knowledge/{lang}/{Cat}/
const _cache = new Map<string, Promise<Map<string, ArticleSummary[]>>>();

async function buildIndex(
  lang: string,
): Promise<Map<string, ArticleSummary[]>> {
  const result = new Map<string, ArticleSummary[]>();

  // 譯文層 curation 繼承（非 zh-TW only）：先把 zh-TW 索引攤成
  // `folderName/slug` → curation 的 lookup map（folderName 對齊 frontmatter
  // `translatedFrom: 'History/蓬萊米.md'` 的路徑寫法，不是 catSlug）。下面逐檔
  // fallback 用：譯文自己沒標 curation、但找得到來源 zh 文章時，沿用來源的
  // 查證狀態，讀者在任何語言都看得到同一篇文章的階段標籤。
  let zhCurationMap: Map<string, 'incubating' | 'verified'> | null = null;
  let zhReasonMap: Map<string, 'unverified' | 'thin'> | null = null;
  if (lang !== 'zh-TW') {
    const zhIndex = await getArticlesIndex('zh-TW');
    zhCurationMap = new Map();
    zhReasonMap = new Map();
    for (const [catSlug, zhArticles] of zhIndex) {
      const folderName = CATEGORY_MAPPING[catSlug];
      if (!folderName) continue;
      for (const a of zhArticles) {
        if (a.curation)
          zhCurationMap.set(`${folderName}/${a.slug}`, a.curation);
        if (a.curationReason)
          zhReasonMap.set(`${folderName}/${a.slug}`, a.curationReason);
      }
    }
  }

  for (const [catSlug, folderName] of Object.entries(CATEGORY_MAPPING)) {
    const folderPath =
      lang === 'zh-TW'
        ? resolve(process.cwd(), 'knowledge', folderName)
        : resolve(process.cwd(), 'knowledge', lang, folderName);
    try {
      const files = await readdir(folderPath);
      const articles: ArticleSummary[] = [];
      for (const file of files) {
        if (!file.endsWith('.md') || file.startsWith('_')) continue;
        const articleSlug = basename(file, '.md');
        const filePath = join(folderPath, file);
        try {
          const fileContent = await readFile(filePath, 'utf-8');
          const { data: fm } = safeMatter(fileContent);
          // Footnote definitions ([^n]:) — citation-depth signal, same count
          // explore.template uses for its featured deep-dive cards.
          const footnotes = (fileContent.match(/^\[\^\d+\]:/gm) || []).length;
          let curation = normalizeCuration(fm.curation);
          let curationReason = normalizeCurationReason(fm.curationReason);
          if (
            !curation &&
            zhCurationMap &&
            typeof fm.translatedFrom === 'string'
          ) {
            const zhKey = fm.translatedFrom.replace(/\.md$/, '');
            curation = zhCurationMap.get(zhKey);
            if (curation === 'incubating' && !curationReason)
              curationReason = zhReasonMap?.get(zhKey);
          }
          if (curation !== 'incubating') curationReason = undefined;
          articles.push({
            title: fm.title || articleSlug,
            slug: articleSlug,
            description: fm.description || '',
            image: fm.image || '',
            category: catSlug,
            readingTime:
              typeof fm.readingTime === 'number' ? fm.readingTime : undefined,
            tags: Array.isArray(fm.tags) ? fm.tags : undefined,
            footnotes,
            curation,
            curationReason,
            translatedFrom:
              typeof fm.translatedFrom === 'string'
                ? fm.translatedFrom
                : undefined,
          });
        } catch {
          // unreadable file — skip silently
        }
      }
      result.set(catSlug, articles);
    } catch {
      // missing category folder for this lang — skip
    }
  }
  return result;
}

/**
 * Get articles index for a language (zh-TW / en / ja / ko / es / fr).
 * First call: builds the index by reading all knowledge files; subsequent
 * calls within the same process return the cached Map.
 */
export function getArticlesIndex(
  lang: string,
): Promise<Map<string, ArticleSummary[]>> {
  let entry = _cache.get(lang);
  if (!entry) {
    entry = buildIndex(lang);
    _cache.set(lang, entry);
  }
  return entry;
}

/* ───────────────────────────────────────────────────────────────────────────
 * Semantic related articles (RAG Phase 1, 2026-06-14)
 *
 * src/data/related/{lang}.json maps `${cat}/${slug}` → up to 5 nearest-neighbour
 * `${cat}/${slug}` strings, pre-computed offline from bge-m3 embeddings on the
 * GPU fleet (scripts/core/build-embeddings.mjs → slimmed to slug-only). The
 * reader gets cross-topic semantic neighbours (e.g. a 戒嚴 article surfaces a
 * 白色恐怖 piece in a different category) instead of same-category proximity —
 * with ZERO browser model: the links are baked into the article HTML at build.
 *
 * Graceful degrade: if the file is absent (CI build without a fleet rebuild) or
 * the article isn't in the map, getRelatedArticles falls back to the original
 * same-category behaviour. Architecture: reports/research/2026-06/
 * p0-compute-experiments-2026-06-14.md + rag-design-research-2026-06-13.md.
 * ──────────────────────────────────────────────────────────────────────────*/

const _semanticRelated = new Map<string, Promise<Record<string, string[]>>>();
function loadSemanticRelated(lang: string): Promise<Record<string, string[]>> {
  let entry = _semanticRelated.get(lang);
  if (!entry) {
    entry = readFile(
      resolve(process.cwd(), 'src/data/related', `${lang}.json`),
      'utf-8',
    )
      .then((raw) => {
        try {
          return JSON.parse(raw) as Record<string, string[]>;
        } catch {
          return {};
        }
      })
      .catch(() => ({})); // no semantic index → category fallback
    _semanticRelated.set(lang, entry);
  }
  return entry;
}

// Flat `${cat}/${slug}` → ArticleSummary lookup, memoised per lang. Lets the
// semantic neighbour slugs resolve back to full summaries for the card render.
const _bySlug = new Map<string, Promise<Map<string, ArticleSummary>>>();
function getBySlugIndex(lang: string): Promise<Map<string, ArticleSummary>> {
  let entry = _bySlug.get(lang);
  if (!entry) {
    entry = getArticlesIndex(lang).then((index) => {
      const flat = new Map<string, ArticleSummary>();
      for (const [cat, articles] of index) {
        for (const a of articles) flat.set(`${cat}/${a.slug}`, a);
      }
      return flat;
    });
    _bySlug.set(lang, entry);
  }
  return entry;
}

/**
 * Related articles for the article-page footer. Prefers semantic neighbours
 * (cross-category, meaning-based) from the pre-computed index; falls back to
 * same-category proximity when the semantic index is absent or the article is
 * not indexed. Return shape is unchanged (ArticleSummary[]) so callers and the
 * shared ArticleCard (premium) need no changes.
 */
export async function getRelatedArticles(
  lang: string,
  category: string,
  excludeSlug: string,
  limit = 3,
): Promise<ArticleSummary[]> {
  const index = await getArticlesIndex(lang);

  // Semantic first.
  const semantic = await loadSemanticRelated(lang);
  const neighbours = semantic[`${category}/${excludeSlug}`];
  if (neighbours && neighbours.length) {
    const bySlug = await getBySlugIndex(lang);
    const out: ArticleSummary[] = [];
    for (const key of neighbours) {
      const art = bySlug.get(key);
      if (art && art.slug !== excludeSlug) out.push(art);
      if (out.length >= limit) break;
    }
    if (out.length) return out;
  }

  // Fallback: same-category proximity (original behaviour).
  const inCategory = index.get(category) ?? [];
  return inCategory.filter((a) => a.slug !== excludeSlug).slice(0, limit);
}

/**
 * Convenience: all articles across all categories (for "explore more" widgets).
 */
export async function getAllArticles(
  lang: string,
  excludeCategory?: string,
): Promise<ArticleSummary[]> {
  const index = await getArticlesIndex(lang);
  const out: ArticleSummary[] = [];
  for (const [cat, articles] of index) {
    if (cat === excludeCategory) continue;
    for (const a of articles) out.push(a);
  }
  return out;
}

/* ───────────────────────────────────────────────────────────────────────────
 * Latest articles (時序主軸) — joins the article index with content-dates.json
 * (git last-content-change times) so "latest" reflects when an article was
 * actually shipped, not a hand-set frontmatter date. Used by the /latest page,
 * the /explore section, the homepage strip, and (via /api/latest.json) the
 * client-side article-page rail. Design: reports/latest-articles-discoverability
 * -design-2026-06-09.md §4.
 * ──────────────────────────────────────────────────────────────────────────*/

export interface DatedArticle extends ArticleSummary {
  date: string; // ISO 8601 git-ship timestamp
}

let _contentDates: Promise<Record<string, string>> | null = null;
function loadContentDates(): Promise<Record<string, string>> {
  if (!_contentDates) {
    _contentDates = readFile(
      resolve(process.cwd(), 'src/data/content-dates.json'),
      'utf-8',
    )
      .then((raw) => {
        try {
          return (JSON.parse(raw).dates as Record<string, string>) ?? {};
        } catch {
          return {};
        }
      })
      .catch(() => ({}));
  }
  return _contentDates;
}

// URL key aligned with content-dates.json: zh-TW → `/${cat}/${slug}/`,
// other langs → `/${lang}/${cat}/${slug}/` (raw, not percent-encoded).
function latestUrlKey(lang: string, cat: string, slug: string): string {
  return lang === 'zh-TW' ? `/${cat}/${slug}/` : `/${lang}/${cat}/${slug}/`;
}

/**
 * Latest articles across all categories for a language, newest-first by git
 * ship time. Articles without a content-dates entry, plus the `about` meta
 * folder, are excluded. `excludeSlug` drops the current article (for the rail).
 */
export async function getLatestArticles(
  lang: string,
  limit = 12,
  excludeSlug?: string,
): Promise<DatedArticle[]> {
  const [all, dates] = await Promise.all([
    getAllArticles(lang),
    loadContentDates(),
  ]);
  const out: DatedArticle[] = [];
  for (const a of all) {
    if (a.category === 'about') continue;
    if (excludeSlug && a.slug === excludeSlug) continue;
    const date = dates[latestUrlKey(lang, a.category, a.slug)] ?? '';
    if (!date) continue;
    out.push({ ...a, date });
  }
  // Newest first by epoch — robust even if content-dates mixes timezone
  // formats (lexicographic compare breaks on Z vs +08:00). Stable sort keeps
  // same-second batch entries in index order.
  out.sort((x, y) => Date.parse(y.date) - Date.parse(x.date));
  return out.slice(0, limit);
}

/* ───────────────────────────────────────────────────────────────────────────
 * 文內嵌入卡（tw-article，2026-08-19）— 由 zh 路徑解析到「這一語」的文章
 *
 * 作者在正文寫的是 zh 路徑（`technology/台灣鎢供應鏈`），十二語譯文的 slug 卻是
 * 各語自己的（en: taiwan-tungsten-supply-chain）。這裡用譯文 frontmatter 的
 * `translatedFrom: 'Technology/台灣鎢供應鏈.md'` 反查；找不到譯文就退回 zh 文章
 * 本身（連到 zh 頁），讀者至少不會撞 404。呼叫端用回傳的 `lang` 組 href。
 * ──────────────────────────────────────────────────────────────────────────*/

export interface ResolvedArticleRef {
  article: ArticleSummary;
  /** 實際命中的語言：可能等於請求的 lang，也可能退回 'zh-TW' */
  lang: string;
}

// per-lang：`Folder/slug.md`（translatedFrom 寫法）→ 該語 ArticleSummary
const _byTranslatedFrom = new Map<
  string,
  Promise<Map<string, ArticleSummary>>
>();
function getByTranslatedFromIndex(
  lang: string,
): Promise<Map<string, ArticleSummary>> {
  let entry = _byTranslatedFrom.get(lang);
  if (!entry) {
    entry = getArticlesIndex(lang).then((index) => {
      const flat = new Map<string, ArticleSummary>();
      for (const [, articles] of index) {
        for (const a of articles) {
          if (a.translatedFrom) flat.set(a.translatedFrom, a);
        }
      }
      return flat;
    });
    _byTranslatedFrom.set(lang, entry);
  }
  return entry;
}

export async function getArticleByZhPath(
  lang: string,
  catSlug: string,
  zhSlug: string,
): Promise<ResolvedArticleRef | null> {
  const cat = catSlug.toLowerCase();
  const zh = (await getBySlugIndex('zh-TW')).get(`${cat}/${zhSlug}`);
  if (lang === 'zh-TW') return zh ? { article: zh, lang: 'zh-TW' } : null;
  const folder = CATEGORY_MAPPING[cat];
  if (folder) {
    const hit = (await getByTranslatedFromIndex(lang)).get(
      `${folder}/${zhSlug}.md`,
    );
    if (hit) return { article: hit, lang };
  }
  return zh ? { article: zh, lang: 'zh-TW' } : null;
}

/** 該文章的 git 上站時間（與 /latest 同一份 content-dates.json），沒有就空字串。 */
export async function getArticleShipDate(
  lang: string,
  catSlug: string,
  slug: string,
): Promise<string> {
  const dates = await loadContentDates();
  return dates[latestUrlKey(lang, catSlug, slug)] ?? '';
}
