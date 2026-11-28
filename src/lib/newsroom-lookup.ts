// newsroom-lookup.ts — 文章頁「編輯台足跡」的 build-time 查找層
//
// dashboard-newsroom.json（generate-newsroom-data.py 產）→ slug/knowledge 路徑雙鍵 Map。
// Module scope：整個 build 進程建一次（.astro frontmatter 是 per-render scope，
// cache 放那裡每頁重建——2026-06-13 refactor-article 教訓）。
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { recordJsonKey, untracked } from '../utils/build-deps';

// Runtime 讀檔＋容錯（2026-07-16 hotfix）：這個 JSON 是 prebuild:dashboard 生成的
// gitignored 產物，`npm run dev` 不一定跑過生成器——靜態 ESM import 會讓「缺檔」
// 直接炸掉每一個文章頁的 SSR（FailedToLoadModuleSSR）。缺檔時 fallback 空板，
// 文章頁只是不顯示編輯台足跡，不崩。
function loadBoard(): { articles: NewsroomRecord[] } {
  try {
    return JSON.parse(
      readFileSync(
        resolve(process.cwd(), 'public/api/dashboard-newsroom.json'),
        'utf-8',
      ),
    );
  } catch {
    return { articles: [] };
  }
}
const board = untracked('newsroom-board', loadBoard);

export interface NewsroomStage {
  status?: string;
  artifact?: string;
  at?: string;
  rounds?: string;
  stage35?: string;
  stage36?: string;
  [key: string]: unknown;
}
export interface NewsroomRecord {
  slug: string;
  title: string;
  spine_type?: string | null;
  stages: Record<string, NewsroomStage>;
}

let _byKnowledgePath: Map<string, NewsroomRecord> | null = null;
let _bySlug: Map<string, NewsroomRecord> | null = null;

function build() {
  _byKnowledgePath = new Map();
  _bySlug = new Map();
  for (const a of board.articles) {
    _bySlug.set(a.slug, a);
    const ship = a.stages?.ship?.artifact;
    if (ship) _byKnowledgePath.set(ship, a);
  }
}

/** 用 knowledge 檔路徑（category + slug）找編輯台紀錄；找不到回 null。 */
export function findNewsroomRecord(
  category: string,
  slug: string,
): NewsroomRecord | null {
  // 頁面輸入帳：這一頁只依賴 board 裡「ship 產物＝這篇」與「slug＝這篇」的紀錄，
  // 不是整份 dashboard-newsroom.json（路徑元素 {p, v} 表示「陣列裡 p 欄位等於 v 的元素」）。
  recordJsonKey('public/api/dashboard-newsroom.json', 'articles', {
    p: 'stages.ship.artifact',
    v: `knowledge/${category}/${slug}.md`,
  });
  recordJsonKey('public/api/dashboard-newsroom.json', 'articles', {
    p: 'slug',
    v: slug,
  });
  if (!_byKnowledgePath) build();
  return (
    _byKnowledgePath!.get(`knowledge/${category}/${slug}.md`) ??
    _bySlug!.get(slug) ??
    null
  );
}

/**
 * 這筆紀錄有沒有「編輯室現場」making-of 頁所需的產物。
 *
 * 必須對齊 `getMakingOfSlugs()`（semiont-newsroom.ts）：靜態路由只為
 * reports/article-projection/* 與 reports/editorial-room/* 建頁。
 * 只有 research 不算——否則 CTA 連到 /semiont/newsroom/{slug}/ 會 404
 * （2026-07-24 哲宇 callout：多篇點「編輯室現場」404）。
 */
export function hasMakingOf(rec: NewsroomRecord | null): boolean {
  if (!rec) return false;
  const s = rec.stages;
  return !!(s.projection || s.room_projection || s.room_prose || s.room_chief);
}

/**
 * 從 artifact 路徑推 making-of 路由 slug（對齊檔名，不對齊 board 上可能漂移的 rec.slug）。
 * 例：knowledge 檔是 `Shopping Design.md`，但投影檔是 `Shopping-Design.md`。
 */
export function resolveMakingOfSlug(rec: NewsroomRecord | null): string | null {
  if (!rec || !hasMakingOf(rec)) return null;
  const s = rec.stages;
  const candidates = [
    s.projection?.artifact,
    s.room_projection?.artifact,
    s.room_prose?.artifact,
    s.room_chief?.artifact,
  ].filter((x): x is string => typeof x === 'string' && x.length > 0);

  for (const art of candidates) {
    const base = art.split('/').pop()?.replace(/\.md$/i, '') ?? '';
    if (!base) continue;
    if (art.includes('article-projection/')) return base;
    const m = base.match(
      /^(.+?)-(projection-review|prose-structure-review|chief-review)(?:-r\d+)?$/i,
    );
    if (m) return m[1];
  }

  // 最後手段：空白→連字，貼近檔名慣例
  return rec.slug.replace(/\s+/g, '-');
}

/**
 * 這筆紀錄有沒有任何可溯源產物（含研究報告 alone）。
 * 用於「原始產物」連結列；編輯室 CTA 請用 hasMakingOf + resolveMakingOfSlug。
 */
export function hasTrail(rec: NewsroomRecord | null): boolean {
  if (!rec) return false;
  const s = rec.stages;
  return !!(hasMakingOf(rec) || s.research || s.verify);
}
