/**
 * hall-data.ts — 四展廳的結構與精選文章。首頁（大廳）與展廳頁共用。
 *
 * 2026-11-19 首頁第二期：精選文章的挑法原本寫在 home.template.astro 的
 * frontmatter 裡，逐行搬過來（門檻、排序、同一廳去重都沒有改），多了一層
 * 依語言的快取：13 個語言的首頁加上 65 個展廳頁都要用，一個語言只掃一次。
 */
import matter from 'gray-matter';
import { readFileSync, readdirSync } from 'node:fs';
import { resolve, join, basename } from 'node:path';
import type { HallId } from '../../data/halls';

export interface PickArticle {
  title: string;
  href: string;
  /** 分類代碼（geography…） */
  category: string;
  footnotes: number;
  readingTime: number;
  description: string;
  image: string;
  featured?: boolean;
}

/**
 * 每一廳的散文講哪三個分類（也是精選文章同廳去重的分組）。
 * 展廳頁「分類」那一區列的分類另外看 HALL_CATEGORY_LIST：第四廳多一個政治，
 * 政治沒有對應的散文段落，也不參與精選。
 */
export const HALL_PROSE_CATEGORIES: Record<HallId, readonly string[]> = {
  1: ['geography', 'nature', 'lifestyle'],
  2: ['history', 'culture', 'society'],
  3: ['people', 'art', 'music'],
  4: ['technology', 'economy', 'food'],
};

const categoryFolders: Record<string, string> = {
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

const picksMemo = new Map<string, Record<string, PickArticle[]>>();

/**
 * 每個分類最多兩篇精選：腳註 15 則以上（標成 featured 的 8 則以上），
 * featured 優先、再依腳註數；同一廳裡標題前四個字相同的只留一篇。
 */
export function getHallPicks(lang: string): Record<string, PickArticle[]> {
  const cached = picksMemo.get(lang);
  if (cached) return cached;

  const isZh = lang === 'zh-TW';
  const langUrlPrefix = isZh ? '' : `/${lang}`;
  const topPicks: Record<string, PickArticle[]> = {};

  for (const [slug, folder] of Object.entries(categoryFolders)) {
    // Lang-aware folder: zh reads knowledge/{Cat}/, others knowledge/{lang}/{Cat}/
    const dir = isZh
      ? resolve(process.cwd(), 'knowledge', folder)
      : resolve(process.cwd(), 'knowledge', lang, folder);
    const picks: PickArticle[] = [];
    try {
      const files = readdirSync(dir).filter(
        (f) => f.endsWith('.md') && !f.startsWith('_'),
      );
      for (const file of files) {
        const raw = readFileSync(join(dir, file), 'utf-8');
        const { data } = matter(raw);
        const fnCount = (raw.match(/^\[\^\d+\]:/gm) || []).length;
        // Two-tier threshold: featured articles at ≥8fn, others at ≥15fn
        const threshold = data.featured ? 8 : 15;
        if (fnCount >= threshold) {
          picks.push({
            title: data.title || basename(file, '.md'),
            href: `${langUrlPrefix}/${slug}/${encodeURIComponent(basename(file, '.md'))}`,
            category: slug,
            footnotes: fnCount,
            readingTime: data.readingTime || 10,
            description: data.description || '',
            image: typeof data.image === 'string' ? data.image : '',
            featured: data.featured || false,
          });
        }
      }
    } catch {}
    // Featured first, then by footnotes
    topPicks[slug] = picks
      .sort((a, b) => {
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        return b.footnotes - a.footnotes;
      })
      .slice(0, 3);
  }

  // Hall-level dedup: remove near-duplicate titles across categories in same hall
  for (const cats of Object.values(HALL_PROSE_CATEGORIES)) {
    const seen = new Set<string>();
    for (const cat of cats) {
      topPicks[cat] = (topPicks[cat] || [])
        .filter((p) => {
          const prefix = p.title.slice(0, 4);
          if (seen.has(prefix)) return false;
          seen.add(prefix);
          return true;
        })
        .slice(0, 2); // max 2 per category within a hall
    }
  }

  picksMemo.set(lang, topPicks);
  return topPicks;
}
