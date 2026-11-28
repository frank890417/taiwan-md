/**
 * staticRoutes.ts — 靜態頁面路由的 per-lang 存在性（filesystem-derived SSOT）。
 *
 * 2026-06-10 deploy-heal：broken-link 6.67% 的兩大結構源都來自「假設某路由
 * 在所有語言都存在」——語言切換器對 zh-only 頁（/semiont/diary/* ×650、
 * /companies、/lifetree…）生死鏈、nav 對 es/fr 生 /es/bench。
 * 手維清單會在新語言／新頁出生時過期（神經迴路：「新語言出生時感知系統
 * 不會自動更新」），所以改從 src/pages 樹 derive：頁面檔存在 ⟺ 路由存在。
 * 對應 MANIFESTO §架構解 > 守備修補 + REFLEXES #20 architecture-as-data。
 *
 * 範圍：只管「靜態頁」（src/pages 下的 .astro 檔）。文章路由（content
 * collection 動態頁）由 getLangSwitchPath 的 _translations.json registry 管。
 */
import { readdirSync, statSync } from 'fs';
import { resolve, join } from 'path';
import type { Lang } from '../config/languages';
import { LANGUAGES } from '../config/languages';
import { recordDirDep, recordGroup, untracked } from './build-deps';

const NON_DEFAULT_LANGS = LANGUAGES.filter(
  (l) => l.enabled && !('isDefault' in l && l.isDefault),
).map((l) => l.code) as readonly Lang[];

interface PageNode {
  /** 子目錄 / 巢狀路由 */
  children: Map<string, PageNode>;
  /** 本層的 .astro / .ts 頁面檔名（去副檔名），含 [param] / [...rest] */
  pages: Set<string>;
  /** 本層的動態 segment 名（[slug] 等，不含 [...rest]） */
  dynamicNames: Set<string>;
  /** 本層是否有 rest segment（[...slug].astro）— 吃掉剩餘所有層 */
  hasRest: boolean;
}

// 分類 slug 的 SSOT 是 knowledge/ 的目錄名（lowercase 即 URL slug）。
// [category].astro 的動態匹配只該放行這個集合——否則 /ja/semiont 這種
// 「該語言沒有的靜態頁」會被誤判為可能的分類頁（2026-06-10 deploy-heal 實撞）。
// 2026-07-24 起 export 給 getLangSwitchPath 判斷「兩段路徑是不是文章頁」共用。
let _categorySlugs: Set<string> | null = null;
export function getCategorySlugs(): Set<string> {
  recordDirDep('knowledge'); // 頁面輸入帳：分類清單＝knowledge/ 第一層的目錄
  if (_categorySlugs) return _categorySlugs;
  const set = new Set<string>();
  try {
    for (const e of readdirSync(resolve(process.cwd(), 'knowledge'), {
      withFileTypes: true,
    })) {
      if (e.isDirectory() && /^[A-Z]/.test(e.name))
        set.add(e.name.toLowerCase());
    }
  } catch {}
  _categorySlugs = set;
  return set;
}

let _categoryDirMap: Record<string, string> | null = null;

/**
 * 分類 slug（小寫）→ knowledge/ 真實目錄名（如 history → History）。
 * 給 Layout 的 .md raw-link 用：判斷 URL 第一段是不是真分類，
 * 不是就不能指向 knowledge/{Cap}/_{Cap} Hub.md（2026-08-23 rawlink-fix，
 * 修功能頁 /explore /latest /timeline… 全家族斷鏈）。
 */
export function getCategoryDirMap(): Record<string, string> {
  recordDirDep('knowledge');
  if (_categoryDirMap) return _categoryDirMap;
  const map: Record<string, string> = {};
  try {
    for (const e of readdirSync(resolve(process.cwd(), 'knowledge'), {
      withFileTypes: true,
    })) {
      if (e.isDirectory() && /^[A-Z]/.test(e.name))
        map[e.name.toLowerCase()] = e.name;
    }
  } catch {}
  _categoryDirMap = map;
  return map;
}

let _hubPresence: Record<string, string[]> | null = null;

/**
 * 每個非預設語言有哪些分類存在翻譯版 Hub 檔（`knowledge/{lang}/{Cat}/_{Cat} Hub.md`）。
 * raw-link 對缺檔語言（ja/ar/ru 部分分類）fallback 到 zh hub，避免指向 404。
 * module-level cache：一個 build 進程只掃一次（.astro frontmatter 是 per-render scope）。
 */
export function getTranslatedHubPresence(): Record<string, string[]> {
  // 頁面輸入帳：每個語言 × 分類各一個 Hub 檔的有無，合成一個群組（不逐筆記 180 條）
  recordGroup('hub-presence');
  recordDirDep('knowledge');
  if (_hubPresence) return _hubPresence;
  return untracked('hub-presence', buildHubPresence);
}
function buildHubPresence(): Record<string, string[]> {
  const map: Record<string, string[]> = {};
  const dirMap = getCategoryDirMap();
  for (const lang of NON_DEFAULT_LANGS) {
    const has: string[] = [];
    for (const [slug, dir] of Object.entries(dirMap)) {
      try {
        statSync(
          resolve(process.cwd(), 'knowledge', lang, dir, `_${dir} Hub.md`),
        );
        has.push(slug);
      } catch {}
    }
    map[lang] = has;
  }
  _hubPresence = map;
  return map;
}

/** 這個 segment 能不能被本層的動態頁吃掉。[category] 只吃真實分類 slug。 */
function dynamicAccepts(node: PageNode, seg: string): boolean {
  for (const dn of node.dynamicNames) {
    if (dn === '[category]') {
      if (getCategorySlugs().has(seg)) return true;
    } else {
      return true;
    }
  }
  return false;
}

function buildTree(dir: string): PageNode {
  const node: PageNode = {
    children: new Map(),
    pages: new Set(),
    dynamicNames: new Set(),
    hasRest: false,
  };
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return node;
  }
  for (const e of entries) {
    if (e.isDirectory()) {
      const child = buildTree(join(dir, e.name));
      node.children.set(e.name, child);
      if (e.name.startsWith('[...')) node.hasRest = true;
      else if (e.name.startsWith('[')) node.dynamicNames.add(e.name);
    } else if (/\.(astro|ts)$/.test(e.name) && !e.name.startsWith('_')) {
      const base = e.name.replace(/\.(astro|ts)$/, '');
      node.pages.add(base);
      if (base.startsWith('[...')) node.hasRest = true;
      else if (base.startsWith('[')) node.dynamicNames.add(base);
    }
  }
  return node;
}

// Module-level cache：一個 build process 走一次 src/pages 樹。
let _root: PageNode | null = null;
function getRoot(): PageNode {
  // 頁面輸入帳：整棵 src/pages 樹是一個群組（看整個目錄型的讀取）。
  recordGroup('static-routes');
  // 分片建置（scripts/core/build-sharded.mjs）時，每個行程的 cwd 底下只有
  // 自己那一份的頁；要看全站有哪些頁，得看腳本用 TWMD_PAGES_ROOT 指的真目錄。
  if (!_root)
    _root = untracked('static-routes', () =>
      buildTree(
        process.env.TWMD_PAGES_ROOT ?? resolve(process.cwd(), 'src/pages'),
      ),
    );
  return _root;
}

/**
 * 該語言下這條靜態路由有沒有對應頁面檔。
 * basePath 不含語言前綴（如 '/semiont/diary/2026-04-04'、'/bench'、'/'）。
 * 動態 segment（[slug]）視為可匹配（保守放行——hub/[category] 等動態頁
 * 的 slug 有效性由各自的 getStaticPaths 決定，不在本 util 職責內）。
 */
export function staticPageExists(
  lang: Lang | 'zh-TW',
  basePath: string,
): boolean {
  let node = getRoot();
  if (lang !== 'zh-TW') {
    const langChild = node.children.get(lang);
    if (!langChild) return false;
    node = langChild;
  }
  const segments = basePath.split('/').filter(Boolean);
  if (segments.length === 0) return node.pages.has('index');

  for (let i = 0; i < segments.length; i++) {
    const seg = decodeURIComponent(segments[i]);
    const isLast = i === segments.length - 1;
    if (node.hasRest) return true;
    if (isLast) {
      if (node.pages.has(seg)) return true;
      const dir = node.children.get(seg);
      if (dir && (dir.pages.has('index') || dir.hasRest)) return true;
      return dynamicAccepts(node, seg);
    }
    const child = node.children.get(seg);
    if (child) {
      node = child;
      continue;
    }
    // 動態目錄（[param]/...）：seg 被動態頁接受才放行剩餘層
    return dynamicAccepts(node, seg);
  }
  return false;
}

/**
 * Nav / dropdown 用的 lang-aware href：該語言版本存在 → 帶語言前綴；
 * 不存在 → 退回 zh 路徑（讀者至少到得了內容，不是 404）。
 */
export function resolveStaticHref(
  lang: Lang | 'zh-TW',
  basePath: string,
): string {
  if (lang === 'zh-TW') return basePath;
  if (staticPageExists(lang, basePath)) {
    return basePath === '/' ? `/${lang}` : `/${lang}${basePath}`;
  }
  return basePath;
}

export { NON_DEFAULT_LANGS };
