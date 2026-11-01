/**
 * data-charts.ts — 全站文章裡的量化圖表索引（/data 資料中樞「站上的圖」區用）
 *
 * 為什麼：文章裡的 tw-* 視覺模組（graph.md §四）每一張都有一句斷言式標題
 * （graph.md §三.1「標題說重點，不說標籤」）跟一列來源。把它們集中索引，
 * /data 就能從資料的視角把讀者送回故事：一句話的洞察＋來源＋那一段文章。
 * 文章新增圖表時這裡自動長出來，不用回頭維護清單。
 *
 * 只收量化模組（有數值、能畫形狀的那些）；timeline / versus / quote / note /
 * figure / source / article 是編輯模組，不算「資料圖」。
 *
 * 錨點：圖表所在段落最近的上一個 ## / ### 標題，用文章渲染器同一支
 * slugifyHeadingId 算 id，連結直接跳到那一段。
 *
 * 讀檔路徑與 articles-index.ts 相同：zh-TW 讀 knowledge/{Cat}/，其他語言讀
 * knowledge/{lang}/{Cat}/。module scope cache，整個 build 只掃一次（.astro
 * frontmatter 是 per-render scope，cache 不能放那裡，見 MEMORY §神經迴路）。
 */

import { readdir, readFile } from 'node:fs/promises';
import { resolve, join, basename } from 'node:path';
import matter from 'gray-matter';
import { slugifyHeadingId } from './article-render';

export const QUANT_MODULES = [
  'tw-bars',
  'tw-line',
  'tw-slope',
  'tw-dot',
  'tw-heatmap',
  'tw-stack',
  'tw-waffle',
  'tw-pyramid',
  'tw-tiles',
  'tw-iso',
  'tw-arc',
  'tw-multiples',
  'tw-stat',
] as const;
export type QuantModule = (typeof QUANT_MODULES)[number];
const QUANT_SET = new Set<string>(QUANT_MODULES);

const CATEGORY_FOLDERS: Record<string, string> = {
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

export interface CorpusChart {
  /** `${category}/${slug}#${n}`，n 是該篇第幾個量化模組（從 1 起） */
  id: string;
  module: QuantModule;
  /** 模組的斷言式標題；模組沒寫標題時退回所在段落的小標 */
  title: string;
  /** 模組內 `來源：` 列（已去掉前綴）；沒有就是空字串 */
  source: string;
  articleTitle: string;
  articleSlug: string;
  /** 小寫分類 slug，與 categoryConfig / ArticleSummary.category 同 */
  category: string;
  /** 本語言的文章網址，含段落錨點 */
  url: string;
  heading: string;
  /** fenced block 內文原樣（給 renderVizBlock 畫出來用） */
  raw: string;
}

// 來源列：中文與十二語的「來源」前綴。這裡只用來把來源列跟標題列分開，
// 判斷寬鬆即可；真正的 caption 解析在 article-render.ts 的 SRC_LINE_RE。
const SRC_RE =
  /^(?:資料)?來源\s*[:：]\s*(.+)$|^(?:sources?|fuentes?|sources|fonte|quelle|nguồn|sumber|स्रोत|المصدر|источник|出典|출처)\s*[:：]\s*(.+)$/i;

const FENCE_RE = /```(tw-[a-z]+)[^\n]*\n([\s\S]*?)```/g;

function stripMd(s: string): string {
  return s
    .replace(/\[\^[^\]]+\]/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[*_`]/g, '')
    .trim();
}

function chartsFromBody(body: string): {
  module: QuantModule;
  raw: string;
  title: string;
  source: string;
  heading: string;
}[] {
  const out: ReturnType<typeof chartsFromBody> = [];
  // 先標出每個標題的位置，給圖表找「所在段落」
  const headings: { at: number; text: string }[] = [];
  for (const m of body.matchAll(/^#{2,3}\s+(.+)$/gm)) {
    headings.push({ at: m.index ?? 0, text: m[1].trim() });
  }
  for (const m of body.matchAll(FENCE_RE)) {
    const mod = m[1];
    if (!QUANT_SET.has(mod)) continue;
    const raw = m[2];
    const lines = raw
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean);
    let source = '';
    const rest: string[] = [];
    for (const l of lines) {
      const sm = l.match(SRC_RE);
      if (sm) source = stripMd(sm[1] ?? sm[2] ?? '');
      else rest.push(l);
    }
    const at = m.index ?? 0;
    let heading = '';
    for (const h of headings) {
      if (h.at < at) heading = h.text;
      else break;
    }
    const first = rest[0] ?? '';
    const titled = first && (mod === 'tw-line' || !first.includes('|'));
    const title = stripMd(titled ? first : heading);
    if (!title) continue;
    out.push({ module: mod as QuantModule, raw, title, source, heading });
  }
  return out;
}

const _cache = new Map<string, Promise<CorpusChart[]>>();

async function build(lang: string): Promise<CorpusChart[]> {
  const prefix = lang === 'zh-TW' ? '' : `/${lang}`;
  const charts: CorpusChart[] = [];
  for (const [cat, folder] of Object.entries(CATEGORY_FOLDERS)) {
    const dir =
      lang === 'zh-TW'
        ? resolve(process.cwd(), 'knowledge', folder)
        : resolve(process.cwd(), 'knowledge', lang, folder);
    let files: string[] = [];
    try {
      files = await readdir(dir);
    } catch {
      continue;
    }
    for (const file of files.sort()) {
      if (!file.endsWith('.md') || file.startsWith('_')) continue;
      let text = '';
      try {
        text = await readFile(join(dir, file), 'utf-8');
      } catch {
        continue;
      }
      if (!text.includes('```tw-')) continue;
      let fm: Record<string, any> = {};
      let body = text;
      try {
        const parsed = matter(text);
        fm = parsed.data;
        body = parsed.content;
      } catch {
        body = text.replace(/^---\s*\n[\s\S]*?\n---\s*\n/, '');
      }
      if (fm.draft === true) continue;
      const slug = basename(file, '.md');
      const found = chartsFromBody(body);
      found.forEach((c, i) => {
        const anchor = c.heading ? `#${slugifyHeadingId(c.heading)}` : '';
        charts.push({
          id: `${cat}/${slug}#${i + 1}`,
          module: c.module,
          title: c.title,
          source: c.source,
          articleTitle: String(fm.title || slug),
          articleSlug: slug,
          category: cat,
          url: `${prefix}/${cat}/${encodeURIComponent(slug)}${anchor}`,
          heading: stripMd(c.heading),
          raw: c.raw,
        });
      });
    }
  }
  return charts;
}

/** 某語言全站文章裡的量化圖表（build 期間每語言只掃一次） */
export function getCorpusCharts(lang: string): Promise<CorpusChart[]> {
  let entry = _cache.get(lang);
  if (!entry) {
    entry = build(lang);
    _cache.set(lang, entry);
  }
  return entry;
}

export interface CorpusChartStats {
  charts: number;
  articles: number;
  byCategory: Record<string, number>;
  byModule: Record<string, number>;
}

export function summarizeCharts(charts: CorpusChart[]): CorpusChartStats {
  const byCategory: Record<string, number> = {};
  const byModule: Record<string, number> = {};
  const articles = new Set<string>();
  for (const c of charts) {
    byCategory[c.category] = (byCategory[c.category] ?? 0) + 1;
    byModule[c.module] = (byModule[c.module] ?? 0) + 1;
    articles.add(`${c.category}/${c.articleSlug}`);
  }
  return {
    charts: charts.length,
    articles: articles.size,
    byCategory,
    byModule,
  };
}
