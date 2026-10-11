#!/usr/bin/env node
/**
 * generate-redirects.mjs — 資料驅動 `_redirects` 產生器
 *
 * 為什麼：全站在過去三個月對外（hreflang）公告了 13,014 條死 URL（根源已於
 * commit f369f3c8e 修掉），但爬蟲已經快取這些死 URL，會持續回打數週。
 * CF Pages 讀 build 輸出根目錄的 `_redirects`（static rule 上限 2000 條），
 * 這支腳本把「可推導出正確目標」的死 URL 組成 301 規則寫進去。
 *
 * 輸入：
 *   1. config/redirects-manual.txt — 手寫規則（committed source），原樣複製到輸出開頭
 *   2. public/api/lang-switch-map.json — getLangSwitchPath 的 registry，
 *      拿來補強 route 表（涵蓋 knowledge/ 樹單純掃描抓不到的跨語 canonical alias）
 *   3. reports/404-monitor/latest.json — 另一支工具產出的死連結清單
 *      （此檔可能還不存在；不存在時只輸出 manual 條目，不可 crash）
 *
 * 輸出：public/_redirects
 *   (a) manual 條目原樣在前
 *   (b) 資料驅動條目：latest.json 中 suggest 非空、family 屬於
 *       slug-variant / cross-lang-slug / renamed-or-truncated 的 top_paths，
 *       按 hits 降冪，每條驗證 target 存在於 route 表、source 不在 route 表、
 *       source !== target 才收錄
 *
 * 上限：資料驅動條目 cap 1500（含 manual 總數必須 < 2000）；超過時取 hits
 * 最高的，並在 stdout 報告丟了幾條 — 不可靜默截斷。
 *
 * Usage: node scripts/core/generate-redirects.mjs
 */

import { readFile, writeFile } from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';
import { readdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { LANGUAGES } from '../../src/config/languages.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const REPO = join(__dirname, '../..');

const MANUAL_PATH = join(REPO, 'config/redirects-manual.txt');
const LANG_SWITCH_MAP_PATH = join(REPO, 'public/api/lang-switch-map.json');
const MONITOR_PATH = join(REPO, 'reports/404-monitor/latest.json');
const KNOWLEDGE_DIR = join(REPO, 'knowledge');
const OUT_PATH = join(REPO, 'public/_redirects');

const DATA_DRIVEN_CAP = 1500;
const TOTAL_CAP = 2000; // hard CF Pages static-rule ceiling; final total must be < this
const ALLOWED_FAMILIES = new Set([
  'slug-variant',
  'cross-lang-slug',
  'renamed-or-truncated',
  // 2026-10-11 twmd-maintainer-daily：語言碼貼兩次（/enen/society/...）。
  // monitor-404 的 suggest 是「拿掉一份之後的同語言真實網址」，所以這族的
  // 目標永遠在站上存在（它只在存在時才給 suggest）。2026-10-09 實測 9 條
  // 38 次，UA 全是桌機瀏覽器不是爬蟲——是讀者在吃 404。
  'duplicated-lang-prefix',
]);

// 2026-07-25 article-alias：別名 registry 擁有的網址，這支工具一律讓路。
//
// 為什麼不是把 `cross-lang-slug` 整個家族拿掉：那個家族有兩個方向。一邊是
// 「中文路由 + 英文 slug」（/people/stan-shih），已由 config/article-aliases.json
// 系統性承接 827 篇；另一邊是反向的「外語路由 + 中文 slug」
// （/ja/economy/台灣企業：台積電 → /ja/economy/tsmc），別名 registry 完全沒有
// 覆蓋。整個家族拿掉會把後者那十幾條真 404 重新打開。
//
// 所以判準不是家族，是所有權：source 出現在別名 registry = 別名頁會服務它，
// 這裡就不要再發一份 Astro redirect。兩邊都發的話 Astro `redirects` 會贏，
// 而它的內建殼目標少了尾斜線，讀者多吃一跳。REFLEXES #38 混維度。
function loadAliasOwnedPaths() {
  const p = join(REPO, 'config/article-aliases.json');
  if (!existsSync(p)) return new Set();
  try {
    return new Set(
      Object.keys(JSON.parse(readFileSync(p, 'utf-8'))).map((k) => `/${k}`),
    );
  } catch (err) {
    console.warn('   ⚠️  article-aliases.json 讀取失敗，本次不排除別名：', err);
    return new Set();
  }
}
const ALIAS_OWNED = loadAliasOwnedPaths();
const isAliasOwned = (source) =>
  ALIAS_OWNED.has(source.replace(/\/$/, '')) ||
  ALIAS_OWNED.has(decodeURIComponent(source).replace(/\/$/, ''));

// 抄自 scripts/core/generate-lang-switch-map.mjs 的 CATEGORY_FOLDER_TO_SLUG
// （category 資料夾 → URL slug 對照表）。folder 不在表內時 fallback 用
// folder.toLowerCase()，跟 generate-lang-switch-map.mjs / generate-api.js
// 既有 route 產生邏輯一致（例如 Politics folder 不在表內，但 lowercase 剛好
// 就是正確 slug）。
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

const NON_DEFAULT_ENABLED_LANGS = LANGUAGES.filter(
  (l) => l.enabled && !l.isDefault,
).map((l) => l.code);

/**
 * 正規化一條 path 為 percent-encoded 形式（CF `_redirects` 對非 ASCII / 空白
 * 一定要編碼；空白沒編碼還會把 _redirects 的欄位分隔搞壞）。
 * 先 decode 再 encode 讓輸入無論本來是不是已經被編碼過都能收斂到同一種形式，
 * 用來讓 route 表比對、source===target 比對是 apples-to-apples。
 */
function normalizeEncodedPath(p) {
  if (!p) return p;
  return p
    .split('/')
    .map((seg) => {
      if (seg === '') return seg;
      let decoded = seg;
      try {
        decoded = decodeURIComponent(seg);
      } catch {
        decoded = seg;
      }
      try {
        return encodeURIComponent(decoded);
      } catch {
        return seg;
      }
    })
    .join('/');
}

async function readDirSafe(dir) {
  try {
    return await readdir(dir, { withFileTypes: true });
  } catch {
    return [];
  }
}

/**
 * 掃 knowledge/ 樹推導 route 表：
 *  - zh（預設語言）：knowledge/{CategoryFolder}/*.md → /{catSlug}/{slug}
 *    以及 knowledge/*.md（無分類）→ /{slug}
 *  - 非預設語言：knowledge/{lang}/{CategoryFolder}/*.md → /{lang}/{catSlug}/{slug}
 *    以及 knowledge/{lang}/*.md（無分類）→ /{lang}/{slug}
 * 一律跳過 `_` 開頭檔案（Hub 頁 / 非文章檔）。
 */
async function buildKnowledgeRouteTable() {
  const routes = new Set();

  async function addCategoryFiles(baseDir, prefix) {
    for (const [folder, slug] of Object.entries(CATEGORY_FOLDER_TO_SLUG)) {
      const entries = await readDirSafe(join(baseDir, folder));
      for (const e of entries) {
        if (!e.isFile()) continue;
        if (!e.name.endsWith('.md') || e.name.startsWith('_')) continue;
        const fileSlug = e.name.replace(/\.md$/, '');
        routes.add(normalizeEncodedPath(`${prefix}/${slug}/${fileSlug}`));
      }
    }
    // 也覆蓋沒有 CATEGORY_FOLDER_TO_SLUG 明確條目、但仍是 PascalCase 分類
    // 資料夾的情況（跟 staticRoutes.ts 的 /^[A-Z]/ 判斷 + toLowerCase()
    // fallback 一致，例如 Politics）。
    const topEntries = await readDirSafe(baseDir);
    for (const e of topEntries) {
      if (!e.isDirectory()) continue;
      if (CATEGORY_FOLDER_TO_SLUG[e.name]) continue; // 已處理
      if (!/^[A-Z]/.test(e.name)) continue; // 非分類資料夾（如小寫 resources）
      const slug = e.name.toLowerCase();
      const entries = await readDirSafe(join(baseDir, e.name));
      for (const f of entries) {
        if (!f.isFile()) continue;
        if (!f.name.endsWith('.md') || f.name.startsWith('_')) continue;
        const fileSlug = f.name.replace(/\.md$/, '');
        routes.add(normalizeEncodedPath(`${prefix}/${slug}/${fileSlug}`));
      }
    }
  }

  async function addTopLevelFiles(baseDir, prefix) {
    const entries = await readDirSafe(baseDir);
    for (const e of entries) {
      if (!e.isFile()) continue;
      if (!e.name.endsWith('.md') || e.name.startsWith('_')) continue;
      const fileSlug = e.name.replace(/\.md$/, '');
      routes.add(normalizeEncodedPath(`${prefix}/${fileSlug}`));
    }
  }

  // zh（預設，無語言前綴）
  await addCategoryFiles(KNOWLEDGE_DIR, '');
  await addTopLevelFiles(KNOWLEDGE_DIR, '');

  // 非預設語言
  for (const lang of NON_DEFAULT_ENABLED_LANGS) {
    const langDir = join(KNOWLEDGE_DIR, lang);
    await addCategoryFiles(langDir, `/${lang}`);
    await addTopLevelFiles(langDir, `/${lang}`);
  }

  return routes;
}

/** 用 lang-switch-map.json 的 registry（toZh/fromZh 的 key 跟 value）補強
 * route 表 — 這些是 getLangSwitchPath 已經驗證過的真實路由，涵蓋 knowledge/
 * 樹單純掃描抓不到的跨語 canonical-alias 案例。檔案不存在或格式不對就跳過，
 * 不 crash。
 */
async function loadLangSwitchMapRoutes() {
  const routes = new Set();
  let raw;
  try {
    raw = await readFile(LANG_SWITCH_MAP_PATH, 'utf-8');
  } catch {
    console.log(
      `   ⚠️  找不到 ${LANG_SWITCH_MAP_PATH}，跳過 route 表補強（不影響 knowledge/ 樹掃描結果）`,
    );
    return routes;
  }
  try {
    const data = JSON.parse(raw);
    for (const langEntry of Object.values(data.registry ?? {})) {
      for (const [k, v] of Object.entries(langEntry.toZh ?? {})) {
        routes.add(normalizeEncodedPath(k));
        routes.add(normalizeEncodedPath(v));
      }
      for (const [k, v] of Object.entries(langEntry.fromZh ?? {})) {
        routes.add(normalizeEncodedPath(k));
        routes.add(normalizeEncodedPath(v));
      }
    }
  } catch (e) {
    console.log(
      `   ⚠️  解析 ${LANG_SWITCH_MAP_PATH} 失敗（${e.message}），跳過 route 表補強`,
    );
  }
  return routes;
}

/** 讀 404-monitor/latest.json。不存在或格式不對回傳空陣列，絕不 crash。 */
async function loadMonitorTopPaths() {
  let raw;
  try {
    raw = await readFile(MONITOR_PATH, 'utf-8');
  } catch {
    console.log(
      `   ℹ️  ${MONITOR_PATH} 不存在，只輸出 manual 條目（這是預期行為，另一支工具尚未產出此檔）`,
    );
    return [];
  }
  try {
    const data = JSON.parse(raw);
    if (!Array.isArray(data.top_paths)) {
      console.log(`   ⚠️  ${MONITOR_PATH} 缺少 top_paths 陣列，視為空清單`);
      return [];
    }
    return data.top_paths;
  } catch (e) {
    console.log(`   ⚠️  解析 ${MONITOR_PATH} 失敗（${e.message}），視為空清單`);
    return [];
  }
}

/** 解析 manual 檔案的有效規則行（跳過註解 / 空行），用來算條數 + source 去重集合。 */
function parseManualEntries(rawText) {
  const lines = rawText.split('\n');
  const sources = new Set();
  let count = 0;
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    count++;
    const parts = trimmed.split(/\s+/);
    const source = parts[0];
    // 萬用字元規則（含 `*`）不是精確路徑，不能拿來做 source 去重比對
    if (source && !source.includes('*')) {
      sources.add(normalizeEncodedPath(source));
    }
  }
  return { count, sources };
}

async function main() {
  console.log('🔀 generate-redirects...');

  // 1. manual 條目
  let manualRaw;
  try {
    manualRaw = await readFile(MANUAL_PATH, 'utf-8');
  } catch (e) {
    console.log(
      `   ⚠️  找不到 ${MANUAL_PATH}（${e.message}），視為空白 manual 區塊`,
    );
    manualRaw = '';
  }
  const { count: manualCount, sources: manualSources } =
    parseManualEntries(manualRaw);

  // 2. route 表：knowledge/ 樹掃描 + lang-switch-map.json 補強
  const [knowledgeRoutes, langSwitchRoutes] = await Promise.all([
    buildKnowledgeRouteTable(),
    loadLangSwitchMapRoutes(),
  ]);
  const routeTable = new Set([...knowledgeRoutes, ...langSwitchRoutes]);

  // 3. 404-monitor 候選
  const topPaths = await loadMonitorTopPaths();

  const dropped = {
    wrong_family_or_no_suggest: 0,
    target_not_in_route_table: 0,
    source_is_live_page: 0,
    source_equals_target: 0,
    source_duplicates_manual: 0,
    duplicate_source_in_data: 0,
    owned_by_alias_registry: 0,
    cap_exceeded: 0,
  };

  const bySource = new Map(); // normalized source -> candidate entry

  for (const entry of topPaths) {
    const { path, hits, family, suggest } = entry ?? {};
    if (
      typeof path !== 'string' ||
      typeof suggest !== 'string' ||
      !suggest.trim() ||
      !ALLOWED_FAMILIES.has(family)
    ) {
      dropped.wrong_family_or_no_suggest++;
      continue;
    }

    const source = normalizeEncodedPath(path);
    const target = normalizeEncodedPath(suggest);

    if (!routeTable.has(target)) {
      dropped.target_not_in_route_table++;
      continue;
    }
    if (routeTable.has(source)) {
      dropped.source_is_live_page++;
      continue;
    }
    if (isAliasOwned(source)) {
      // 別名頁已經服務這條網址（而且轉得比 Astro 內建殼好）。
      dropped.owned_by_alias_registry++;
      continue;
    }
    if (source === target) {
      dropped.source_equals_target++;
      continue;
    }
    if (manualSources.has(source)) {
      dropped.source_duplicates_manual++;
      continue;
    }

    const hitsNum =
      typeof hits === 'number' && Number.isFinite(hits) ? hits : 0;

    const existing = bySource.get(source);
    if (existing) {
      dropped.duplicate_source_in_data++;
      if (hitsNum > existing.hits) {
        bySource.set(source, { source, target, hits: hitsNum });
      }
      continue;
    }
    bySource.set(source, { source, target, hits: hitsNum });
  }

  const candidates = [...bySource.values()].sort((a, b) => b.hits - a.hits);

  const capLimit = Math.min(DATA_DRIVEN_CAP, TOTAL_CAP - 1 - manualCount);
  let kept = candidates;
  if (candidates.length > capLimit) {
    dropped.cap_exceeded = candidates.length - Math.max(capLimit, 0);
    kept = candidates.slice(0, Math.max(capLimit, 0));
  }

  // 4. 組裝輸出
  const dataDrivenLines = kept.map((c) => `${c.source} ${c.target} 301`);

  const manualBlock = manualRaw.endsWith('\n') ? manualRaw : `${manualRaw}\n`;
  const dataDrivenBlock =
    dataDrivenLines.length > 0
      ? `\n# ═══ 資料驅動條目（由 reports/404-monitor/latest.json 產生，見 scripts/core/generate-redirects.mjs）═══\n${dataDrivenLines.join('\n')}\n`
      : '';

  const output = `${manualBlock}${dataDrivenBlock}`;
  await writeFile(OUT_PATH, output);

  // 4b. Astro config 版本（部署平台真相：GitHub Pages，_redirects 不被支援。
  // astro.config.mjs 讀這份 JSON 生成 meta-refresh + canonical stub 頁——
  // GH Pages 上唯一的原生 redirect 路徑。只收 HTML 導覽路徑：帶副檔名的
  // 資產請求不會跟 meta-refresh，交給真檔案處理）
  const astroRedirects = {};
  const parseRuleLine = (line) => {
    const m = line.trim().match(/^(\/\S+)\s+(\/\S+)\s+301$/);
    return m ? [m[1], m[2]] : null;
  };
  // Astro 的 redirects config 兩端都要「解碼後」的路徑（inline 條目一直是
  // raw CJK 字串）；沿用 _redirects 的 percent-encoded 字串會被 Astro 渲染
  // canonical 時再編一次成 %25——2026-07-17 夜 CI strict gate 第一戰擋下的
  // 就是這個雙重編碼。
  const dec = (s) => {
    try {
      return decodeURIComponent(s);
    } catch {
      return s;
    }
  };
  for (const line of manualBlock.split('\n')) {
    if (line.startsWith('#') || !line.trim()) continue;
    const rule = parseRuleLine(line);
    if (rule && !/\.[a-z0-9]{2,5}$/i.test(rule[0])) {
      astroRedirects[dec(rule[0])] = dec(rule[1]);
    }
  }
  for (const c of kept) {
    if (!/\.[a-z0-9]{2,5}$/i.test(c.source)) {
      astroRedirects[dec(c.source)] = dec(c.target);
    }
  }
  const ASTRO_OUT = join(REPO, 'config/redirects-generated.json');
  await writeFile(ASTRO_OUT, JSON.stringify(astroRedirects, null, 2) + '\n');
  console.log(
    `   ✓ ${ASTRO_OUT}（${Object.keys(astroRedirects).length} 條 HTML 導覽 redirect → astro.config 生成 stub）`,
  );

  const totalRuleCount = manualCount + kept.length;

  console.log(`   manual 條目：${manualCount} 條`);
  console.log(
    `   資料驅動候選（latest.json top_paths）：${topPaths.length} 條`,
  );
  console.log(`   資料驅動條目（採用）：${kept.length} 條`);
  console.log('   丟棄明細：');
  console.log(
    `     - family 不符 / suggest 空白：${dropped.wrong_family_or_no_suggest}`,
  );
  console.log(
    `     - target 不在 route 表：${dropped.target_not_in_route_table}`,
  );
  console.log(`     - source 本身已是活頁：${dropped.source_is_live_page}`);
  console.log(
    `     - 別名 registry 已擁有：${dropped.owned_by_alias_registry}`,
  );
  console.log(`     - source === target：${dropped.source_equals_target}`);
  console.log(
    `     - source 跟 manual 條目重複：${dropped.source_duplicates_manual}`,
  );
  console.log(
    `     - data 內 source 重複（保留 hits 較高者）：${dropped.duplicate_source_in_data}`,
  );
  console.log(`     - 超過 cap（${capLimit}）被丟棄：${dropped.cap_exceeded}`);
  console.log(
    `   輸出總條數：${totalRuleCount}（manual ${manualCount} + data-driven ${kept.length}），< ${TOTAL_CAP} 上限`,
  );
  console.log(`   ✓ ${OUT_PATH}`);

  return 0;
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
