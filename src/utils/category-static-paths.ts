/**
 * category-static-paths.ts — getStaticPaths props for the category hub template ([category]/index.astro × 6 langs)
 *
 * 為什麼：6 個 [category]/index.astro 各自重複的 readdir + readFile + matter()
 * + topPicks 計算 + sort 邏輯 ~150 行。本 util 把這套邏輯收進一個 lang-aware
 * factory，6 wrappers 各自 call `getCategoryHubStaticPaths('zh-TW')` etc.
 *
 * 注意：Astro 限制 — getStaticPaths 必須在 page level export。所以 wrapper
 * 仍需 export getStaticPaths，本 util 提供 body 邏輯。
 *
 * 2026-05-03 sleepy-colden P1 follow-up unification。
 * 2026-07-10 hub-template data-layer 擴充：`updated` / `groups` /
 * `categoryUpdated` / `essayMinutes` — backward compatible additive props,
 * 既有 { category, hubContent, topPicks, articles, lang } 不變（含 sort
 * order），template 消費邏輯留給後續任務遷移。
 */

import { defineGroup, depsProp, recordDep, untracked } from './build-deps';
import { readdir, readFile } from 'node:fs/promises';
import { resolve, join, basename } from 'node:path';
import matter from 'gray-matter';

const CATEGORY_MAPPING: Record<string, string> = {
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

const CATEGORY_LIST = Object.keys(CATEGORY_MAPPING);

interface ArticleSummary {
  slug: string;
  title: string;
  description: string;
  status: string;
  readingTime: number | null;
  date: string | null;
  featured: boolean;
  tags: string[];
  lang: string;
  image: string | null;
  imageAlt: string;
  imageCredit: string;
  subcategory: string;
  footnotes: number;
  /** ISO timestamp of last substantive content change. content-dates.json
   * entry when available, else frontmatter `date` converted to ISO, else
   * null. See loadContentDates()/contentDatesUrlKey() below. */
  updated: string | null;
}

/**
 * A subcategory grouping of a category's articles, computed server-side
 * (moved out of category-hub.template.astro, which currently does this
 * grouping itself — see §1b design note; template migration to consume
 * this prop is a later task, so it is additive here, not wired in yet).
 */
export interface SubcategoryGroup {
  key: string; // canonical subcategory value, or '__others__' for the merged tail group
  count: number;
  articles: ArticleSummary[];
}

const OTHERS_KEY = '__others__';

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

/* ───────────────────────────────────────────────────────────────────────────
 * content-dates.json lookup — mirrors the loadContentDates()/latestUrlKey()
 * pattern in src/utils/articles-index.ts (~L246-269). Kept as a local copy
 * rather than importing from articles-index.ts to avoid coupling this
 * static-paths util to the article-index module; the origin pattern is the
 * source of truth for any future behavioural change to the URL-key scheme.
 * ──────────────────────────────────────────────────────────────────────────*/

let _contentDates: Promise<Record<string, string>> | null = null;
function loadContentDates(): Promise<Record<string, string>> {
  recordDep('src/data/content-dates.json'); // 頁面輸入帳：整份（用法是整張表排序／查詢）
  if (!_contentDates) {
    _contentDates = untracked('content-dates', () =>
      readFile(resolve(process.cwd(), 'src/data/content-dates.json'), 'utf-8'),
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

// URL key aligned with content-dates.json: zh-TW → `/${category}/${slug}/`,
// other langs → `/${lang}/${category}/${slug}/` (raw path, NOT
// percent-encoded).
function contentDatesUrlKey(
  lang: string,
  category: string,
  slug: string,
): string {
  return lang === 'zh-TW'
    ? `/${category}/${slug}/`
    : `/${lang}/${category}/${slug}/`;
}

// Best-effort Date → ISO string conversion. gray-matter/js-yaml parses
// unquoted YAML `date: 2026-03-23` frontmatter as a native Date object (not
// a string), so frontmatter.date may already be a Date; quoted frontmatter
// dates come through as plain strings. Either way we just convert whatever
// is there to ISO, no timezone reinterpretation. Returns null on missing or
// unparseable input.
function toIsoStringSafe(value: unknown): string | null {
  if (!value) return null;
  const d = value instanceof Date ? value : new Date(value as any);
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
}

/**
 * Shared article ordering: featured first, then footnotes desc, then title.
 * Used both for the top-level `articles` prop and for the article list
 * within each SubcategoryGroup, so the two orderings never drift apart.
 */
function compareArticles(a: ArticleSummary, b: ArticleSummary): number {
  if (a.featured && !b.featured) return -1;
  if (!a.featured && b.featured) return 1;
  if ((b.footnotes || 0) !== (a.footnotes || 0))
    return (b.footnotes || 0) - (a.footnotes || 0);
  return a.title.localeCompare(b.title);
}

function computeTopPicks(articles: ArticleSummary[]): ArticleSummary[] {
  if (articles.length === 0) return [];

  const tryThreshold = (featThr: number, normalThr: number) =>
    articles.filter((a) => {
      const thr = a.featured ? featThr : normalThr;
      return (a.footnotes || 0) >= thr;
    });

  let candidates = tryThreshold(8, 15);
  if (candidates.length < 2) candidates = tryThreshold(3, 8);
  if (candidates.length === 0) candidates = articles.filter((a) => a.featured);
  if (candidates.length === 0) return [];

  const sorted = [...candidates].sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    if ((b.footnotes || 0) !== (a.footnotes || 0))
      return (b.footnotes || 0) - (a.footnotes || 0);
    return String(b.date || '').localeCompare(String(a.date || ''));
  });

  // Subcategory diversification: one per subcategory first, then fill
  const result: ArticleSummary[] = [];
  const seenSub = new Set<string>();
  for (const a of sorted) {
    const sub = a.subcategory || '';
    if (!seenSub.has(sub)) {
      result.push(a);
      seenSub.add(sub);
    }
    if (result.length >= 5) break;
  }
  if (result.length < 5) {
    for (const a of sorted) {
      if (!result.includes(a)) result.push(a);
      if (result.length >= 5) break;
    }
  }
  return result;
}

/**
 * Group articles by exact `subcategory` value.
 *
 * - Empty subcategory, or a subcategory equal to the category's folder name
 *   (fallback leaks, e.g. subcategory 'Technology' inside knowledge/Technology)
 *   are treated as "no real subcategory" and routed to '__others__'.
 * - Any resulting group with fewer than 2 articles is merged into
 *   '__others__' too (collapses singleton-section noise).
 * - Real groups are ordered by count DESC, ties broken by key
 *   localeCompare; '__others__' is always last, even if it ends up the
 *   largest group.
 * - Article order within each group reuses compareArticles(), the same
 *   comparator as the top-level `articles` prop.
 * - If every article ends up in '__others__', that single group is still
 *   returned (not an empty list).
 */
function buildSubcategoryGroups(
  articles: ArticleSummary[],
  folderName: string,
): SubcategoryGroup[] {
  const buckets = new Map<string, ArticleSummary[]>();
  for (const article of articles) {
    const raw = article.subcategory || '';
    const key = !raw || raw === folderName ? OTHERS_KEY : raw;
    if (!buckets.has(key)) buckets.set(key, []);
    buckets.get(key)!.push(article);
  }

  // Merge any group with < 2 articles into '__others__'.
  const others = buckets.get(OTHERS_KEY) ?? [];
  for (const [key, arts] of [...buckets.entries()]) {
    if (key === OTHERS_KEY) continue;
    if (arts.length < 2) {
      others.push(...arts);
      buckets.delete(key);
    }
  }

  const groups: SubcategoryGroup[] = [];
  for (const [key, arts] of buckets) {
    if (key === OTHERS_KEY) continue;
    groups.push({
      key,
      count: arts.length,
      articles: [...arts].sort(compareArticles),
    });
  }
  groups.sort((a, b) => {
    if (b.count !== a.count) return b.count - a.count;
    return a.key.localeCompare(b.key);
  });

  if (others.length > 0) {
    groups.push({
      key: OTHERS_KEY,
      count: others.length,
      articles: [...others].sort(compareArticles),
    });
  }

  return groups;
}

/** Max `updated` across a category's articles, compared as epoch ms
 * (Date.parse), not lexicographically — content-dates.json timestamps mix
 * `Z` and `+08:00` offsets, which don't sort correctly as plain strings. */
function computeCategoryUpdated(articles: ArticleSummary[]): string | null {
  let max: string | null = null;
  let maxMs = -Infinity;
  for (const a of articles) {
    if (!a.updated) continue;
    const ms = Date.parse(a.updated);
    if (Number.isNaN(ms)) continue;
    if (ms > maxMs) {
      maxMs = ms;
      max = a.updated;
    }
  }
  return max;
}

/**
 * Rough reading-minutes estimate for hub essay content. Strips the markdown
 * noise that would otherwise skew the char/word counts (images dropped
 * entirely, standard links and [[wikilinks]] collapsed to their visible
 * text, fenced code blocks dropped), then applies
 * `ceil(cjkChars / 450 + latinWords / 220)`, minimum 1. Returns null for
 * empty hubContent.
 */
function estimateEssayMinutes(hubContent: string): number | null {
  if (!hubContent || !hubContent.trim()) return null;

  let text = hubContent;
  text = text.replace(/```[\s\S]*?```/g, ''); // fenced code blocks removed
  text = text.replace(/!\[[^\]]*\]\([^)]*\)/g, ''); // ![alt](url) images removed
  text = text.replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, '$2'); // [[target|label]] → label
  text = text.replace(/\[\[([^\]|]+)\]\]/g, '$1'); // [[target]] → target
  text = text.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1'); // [text](url) → text

  const cjkMatches = text.match(/[一-鿿぀-ヿ가-힯]/g);
  const cjkCount = cjkMatches ? cjkMatches.length : 0;

  // Blank out CJK runs before splitting on whitespace so CJK text doesn't
  // get counted a second time as spurious "latin words".
  const latinOnly = text.replace(/[一-鿿぀-ヿ가-힯]/g, ' ');
  const latinWords = latinOnly.split(/\s+/).filter(Boolean).length;

  const minutes = Math.ceil(cjkCount / 450 + latinWords / 220);
  return Math.max(1, minutes);
}

/**
 * Build getStaticPaths array for [category]/index.astro of a given lang.
 * zh-TW reads knowledge/{Cat}/, others read knowledge/{lang}/{Cat}/.
 */
export async function getCategoryHubStaticPaths(lang: string) {
  const paths: any[] = [];
  const contentDates = await loadContentDates();

  for (const category of CATEGORY_LIST) {
    const folderName = CATEGORY_MAPPING[category];
    if (!folderName) continue;
    const articles: ArticleSummary[] = [];

    const folderPath =
      lang === 'zh-TW'
        ? resolve(process.cwd(), 'knowledge', folderName)
        : resolve(process.cwd(), 'knowledge', lang, folderName);

    try {
      const files = await readdir(folderPath);
      const markdownFiles = files.filter(
        (f) => f.endsWith('.md') && !f.startsWith('_'),
      );

      for (const file of markdownFiles) {
        const filePath = join(folderPath, file);
        const fileContent = await readFile(filePath, 'utf-8');
        const { data: frontmatter } = safeMatter(fileContent);
        const slug = basename(file, '.md');
        const fnCount = (fileContent.match(/^\[\^\d+\]:/gm) || []).length;
        const updated =
          contentDates[contentDatesUrlKey(lang, category, slug)] ??
          toIsoStringSafe(frontmatter.date);

        articles.push({
          slug,
          title: frontmatter.title || slug,
          description: frontmatter.description || '',
          status: frontmatter.status || '',
          readingTime: frontmatter.readingTime || null,
          date: frontmatter.date || null,
          featured: frontmatter.featured || false,
          tags: frontmatter.tags || [],
          lang,
          image: frontmatter.image || null,
          imageAlt: frontmatter.imageAlt || '',
          imageCredit: frontmatter.imageCredit || '',
          subcategory: frontmatter.subcategory || '',
          footnotes: fnCount,
          updated,
        });
      }
    } catch (err) {
      // Lang folder missing (e.g., en/Music) is OK — skip silently.
      // Only log if zh-TW because that's SSOT.
      if (lang === 'zh-TW') {
        console.error(
          `[category-hub-static-paths] Error loading "${category}" for ${lang}:`,
          (err as Error).message,
        );
      }
    }

    // 頁面輸入帳：這個分類總覽頁讀了資料夾清單、每篇文章（整份，卡片欄位比索引多）、
    // 每篇的上站日期、Hub 檔。檔很多，記成一個群組。
    const hubDepTokens: string[] = [`@dir:${folderPath}`];
    try {
      for (const f of await readdir(folderPath)) {
        if (f.endsWith('.md') && !f.startsWith('_')) {
          hubDepTokens.push(join(folderPath, f));
          hubDepTokens.push(
            `src/data/content-dates.json#${JSON.stringify(['dates', contentDatesUrlKey(lang, category, basename(f, '.md'))])}`,
          );
        } else if (f.startsWith('_') && f.includes('Hub')) {
          hubDepTokens.push(join(folderPath, f));
        }
      }
    } catch {}
    defineGroup(`category-hub:${lang}:${category}`, hubDepTokens);

    let hubContent = '';
    try {
      const hubFiles = await readdir(folderPath);
      const hubFile = hubFiles.find(
        (f) => f.startsWith('_') && f.includes('Hub'),
      );
      if (hubFile) {
        const hubPath = join(folderPath, hubFile);
        const hubRaw = await readFile(hubPath, 'utf-8');
        const { content } = safeMatter(hubRaw);
        hubContent = content.replace(/^#\s+.+\n/, '').trim();
      }
    } catch {}

    const topPicks = computeTopPicks(articles);
    const groups = buildSubcategoryGroups(articles, folderName);
    const categoryUpdated = computeCategoryUpdated(articles);
    const essayMinutes = estimateEssayMinutes(hubContent);

    paths.push({
      params: { category },
      props: {
        ...depsProp(`@group:category-hub:${lang}:${category}`),
        category,
        hubContent,
        topPicks,
        articles: articles.sort(compareArticles),
        groups,
        categoryUpdated,
        essayMinutes,
        lang,
      },
    });
  }

  return paths;
}
