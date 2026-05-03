/**
 * category-static-paths.ts — getStaticPaths factory for [category]/index.astro × 6 langs
 *
 * 為什麼：6 個 [category]/index.astro 各自重複的 readdir + readFile + matter()
 * + topPicks 計算 + sort 邏輯 ~150 行。本 util 把這套邏輯收進一個 lang-aware
 * factory，6 wrappers 各自 call `getCategoryHubStaticPaths('zh-TW')` etc.
 *
 * 注意：Astro 限制 — getStaticPaths 必須在 page level export。所以 wrapper
 * 仍需 export getStaticPaths，本 util 提供 body 邏輯。
 *
 * 2026-05-03 sleepy-colden P1 follow-up unification。
 */

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
}

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
 * Build getStaticPaths array for [category]/index.astro of a given lang.
 * zh-TW reads knowledge/{Cat}/, others read knowledge/{lang}/{Cat}/.
 */
export async function getCategoryHubStaticPaths(lang: string) {
  const paths: any[] = [];

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

    paths.push({
      params: { category },
      props: {
        category,
        hubContent,
        topPicks,
        articles: articles.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          if ((b.footnotes || 0) !== (a.footnotes || 0))
            return (b.footnotes || 0) - (a.footnotes || 0);
          return a.title.localeCompare(b.title);
        }),
        lang,
      },
    });
  }

  return paths;
}
