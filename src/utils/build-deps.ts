/**
 * build-deps.ts — 建置時的「頁面輸入帳」：每一頁在渲染時讀了哪些輸入檔。
 *
 * 為什麼存在（reports/incremental-build-prep-2026-11-28.md）：
 * 想做「只重建受影響的頁」。最危險的一步是「算出這次該重建哪些頁」，手寫規則會
 * 漏（2026-11-28 staticRoutes.ts 看整個 src/pages 目錄，沒人記得）。所以改成
 * 「渲染時記帳」：頁面自己讀了什麼就記什麼，建完輸出對照表。
 *
 * 開關：環境變數 TWMD_DEPS_OUT 有設才記帳。沒設時：
 *   - 本檔頂層只做一次 `process.env` 判斷，不碰 fs、不建 AsyncLocalStorage；
 *   - 所有匯出函式第一行就 return（或原樣回傳參數）。
 * 所以 `npm run build` / 正式部署的行為與產物不變。
 *
 * 記帳來源有三種（越上面越準）：
 *   1. 明確呼叫：recordDep / recordDirDep / recordInput / recordGroup（查表那一刻記）。
 *   2. fs 攔截（只有開關打開時才裝）：頁面渲染途中任何 readFile / readdir / stat /
 *      existsSync 都自動記在「目前這一頁」。這是兜底：漏接的讀取點不會變成靜默漏報。
 *   3. 靜態 import 的資料檔（打包後沒有 fs 呼叫）：astro.config.mjs 的 Vite 外掛在打包結束時
 *      算每個路由檔的靜態 import 閉包，存成群組 `static:<路由樣式>`，middleware 記下頁面屬於哪個路由。
 * 文章頁的 Markdown 是 getStaticPaths 讀的、渲染時不再讀，所以 article.template.astro
 * 在渲染時明確 recordDep 自己的來源檔（props 上掛來源檔的做法不採用：Astro 可能複製 props）。
 *
 * 「目前是哪一頁」靠 AsyncLocalStorage，在 src/middleware.ts 進入每個請求時設定。
 * Astro 產頁是交錯進行的，所以不能用全域變數。
 *
 * 模組層快取（第一次呼叫時把全部讀進記憶體、之後各頁查表）：
 *   - 快取建立那一段用 untracked(群組名, fn) 包起來，讀到的檔記到「群組」而不是第一個
 *     觸發的那一頁；
 *   - 每一頁查表時 recordGroup(群組名)（粗粒度）或 recordDep(那一筆)（逐筆）。
 *   - 輸出時 `@group:<名>` 會展開成檔案清單，驗證工具用它判斷群組有沒有變。
 */
import { AsyncLocalStorage } from 'node:async_hooks';
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import { syncBuiltinESMExports } from 'node:module';
import { dirname, isAbsolute, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

export const DEPS_ENABLED = Boolean(process.env.TWMD_DEPS_OUT);

interface Ctx {
  /** 目前這一頁的路徑；null 表示「不屬於任何一頁」（getStaticPaths、快取建立）。 */
  page: string | null;
  /** page 為 null 時，讀到的檔記到這個群組。 */
  group?: string;
  /** 群組內 fs 攔截不記「讀檔」（資料夾清單照記）；群組靠明確的 recordDep（如 `#summary`）。 */
  silentFileReads?: boolean;
}

interface Ledger {
  als: AsyncLocalStorage<Ctx>;
  pages: Map<string, Set<string>>;
  groups: Map<string, Set<string>>;
  /** 不屬於任何頁、也不在群組裡的讀取（getStaticPaths 等），只記次數，診斷用。 */
  init: Map<string, number>;
  root: string;
  patched: boolean;
  /** astro.config.mjs（另一個模組實例）靠它取帳，不必 import 本檔。 */
  snapshot: () => Record<string, unknown>;
}

const G = globalThis as unknown as { __twmdDeps?: Ledger };

function ledger(): Ledger {
  if (!G.__twmdDeps) {
    // 分片建置的 cwd 是 <repo>/.shards/sN，帳裡一律用 repo 相對路徑。
    const cwd = process.cwd();
    const m = cwd.match(/^(.*?)[\\/]\.shards[\\/]s\d+$/);
    G.__twmdDeps = {
      als: new AsyncLocalStorage<Ctx>(),
      pages: new Map(),
      groups: new Map(),
      init: new Map(),
      root: m ? m[1] : cwd,
      patched: false,
      snapshot: snapshotLedger,
    };
  }
  return G.__twmdDeps;
}

// ── 路徑正規化 ──────────────────────────────────────────────────────────────
const IGNORE =
  /(^|\/)(node_modules|dist|\.git|\.astro|\.astro-cache|\.shards|\.empty-public|\.vite|\.cache)(\/|$)/;

/** 任意路徑 → repo 相對路徑；不在 repo 裡或屬於建置產物則回 null。 */
function toRel(p: unknown): string | null {
  let s: string;
  if (typeof p === 'string') s = p;
  else if (p instanceof URL) {
    if (p.protocol !== 'file:') return null;
    s = fileURLToPath(p);
  } else if (
    p &&
    typeof (p as Buffer).toString === 'function' &&
    Buffer.isBuffer(p)
  ) {
    s = (p as Buffer).toString();
  } else return null;
  const L = ledger();
  const abs = isAbsolute(s) ? s : resolve(process.cwd(), s);
  // 把 .shards/sN/ 這一層拿掉（影子根目錄裡全是指回 repo 的符號連結）
  let r = relative(
    L.root,
    abs.replace(/[\\/]\.shards[\\/]s\d+(?=[\\/]|$)/, ''),
  );
  if (!r || r.startsWith('..')) return null;
  r = r.split(sep).join('/').normalize('NFC');
  if (IGNORE.test(r)) return null;
  return r;
}

function currentCtx(): Ctx | undefined {
  return ledger().als.getStore();
}

function addTo(map: Map<string, Set<string>>, key: string, dep: string) {
  let s = map.get(key);
  if (!s) map.set(key, (s = new Set()));
  s.add(dep);
}

/** 把一筆輸入記到「現在這個情境」：頁 / 群組 / init。 */
function note(dep: string) {
  const L = ledger();
  const ctx = L.als.getStore();
  if (ctx?.page) addTo(L.pages, ctx.page, dep);
  else if (ctx?.group) addTo(L.groups, ctx.group, dep);
  else {
    const top = dep.split('/').slice(0, 2).join('/');
    L.init.set(top, (L.init.get(top) ?? 0) + 1);
  }
}

// ── 對外 API ────────────────────────────────────────────────────────────────

/** 在「這一頁」的情境裡跑 fn。只給 middleware 用。 */
export function runInPage<T>(
  page: string,
  fn: () => T,
  routePattern?: string,
): T {
  if (!DEPS_ENABLED) return fn();
  installFsHooks();
  const L = ledger();
  // 每一頁都先登記（就算之後一筆都沒記到），驗證時才能對得上「實際產了哪些頁」。
  if (!L.pages.has(page)) L.pages.set(page, new Set());
  // 這一頁屬於哪個路由 → 該路由靜態 import 的資料檔群組（astro.config.mjs 的外掛產出）
  if (routePattern) addTo(L.pages, page, `@group:static:${routePattern}`);
  return L.als.run({ page }, fn);
}

/**
 * 模組層快取的建立段：裡面讀到的檔記到群組 `group`，不記到第一個觸發的頁。
 * 回傳 fn 的結果（含 Promise，AsyncLocalStorage 會跟著 await 走）。
 */
export function untracked<T>(
  group: string,
  fn: () => T,
  opts?: { silentFileReads?: boolean },
): T {
  if (!DEPS_ENABLED) return fn();
  installFsHooks();
  return ledger().als.run(
    { page: null, group, silentFileReads: opts?.silentFileReads },
    fn,
  );
}

/** 記一個輸入檔（repo 相對路徑，或帶 #片段）。 */
export function recordDep(path: string): void {
  if (!DEPS_ENABLED) return;
  const [file, frag] = splitFrag(path);
  const rel = toRel(file);
  if (rel) note(frag === undefined ? rel : `${rel}#${frag}`);
}

/**
 * 記 JSON 檔裡的某一筆：`src/data/foo.json` 的 ["dates","/a/b/"]。
 * 驗證工具會逐筆比對，不會因為同一個 JSON 別的鍵變了就算這頁受影響。
 * 路徑元素是字串＝物件的鍵；是 {p, v}＝「陣列裡 p 欄位（可用 a.b 點路徑）等於 v 的所有元素」。
 */
export type KeyPart = string | { p: string; v: string | number };
export function recordJsonKey(file: string, ...keyPath: KeyPart[]): void {
  if (!DEPS_ENABLED) return;
  const rel = toRel(file);
  if (rel) note(`${rel}#${JSON.stringify(keyPath)}`);
}

/** 「看整個目錄」型的讀取。 */
export function recordDirDep(dir: string): void {
  if (!DEPS_ENABLED) return;
  const rel = toRel(dir);
  if (rel) note(`@dir:${rel}`);
}

/** 具名的粗粒度輸入（例如 `@all-articles-frontmatter:en`）。 */
export function recordInput(name: string): void {
  if (!DEPS_ENABLED) return;
  note(name.startsWith('@') ? name : `@${name}`);
}

/** 這一頁用了某個模組層快取群組（群組的檔案清單在輸出裡展開）。 */
export function recordGroup(group: string): void {
  if (!DEPS_ENABLED) return;
  note(`@group:${group}`);
}

/**
 * 動態路由（[slug]、[id]、[category] 這類）的來源檔是 getStaticPaths 讀的，渲染時不再讀，
 * fs 攔截看不到。getStaticPaths 回傳的 props 用 `...depsProp(來源記號…)` 帶一個
 * `__deps` 欄位，頁面 frontmatter 呼叫 `recordPropDeps(Astro.props)` 記進這一頁。
 * 記號可以是檔案路徑、`檔#鍵`、`@dir:<目錄>`、`@group:<名>`。
 * 沒設 TWMD_DEPS_OUT 時回傳 `{}`，展開後 props 與原本完全相同。
 */
export function depsProp(...tokens: string[]): { __deps?: string[] } {
  return DEPS_ENABLED ? { __deps: tokens } : {};
}

export function recordPropDeps(props: unknown): void {
  if (!DEPS_ENABLED || !props || typeof props !== 'object') return;
  const deps = (props as { __deps?: unknown }).__deps;
  if (!Array.isArray(deps)) return;
  for (const t of deps) {
    const tok = String(t);
    if (tok.startsWith('@dir:')) recordDirDep(tok.slice(5));
    else if (tok.startsWith('@')) note(tok);
    else recordDep(tok);
  }
}

/** 具名群組（檔案清單由呼叫端給）。群組內容在 getStaticPaths 階段才知道時用。 */
export function defineGroup(name: string, tokens: string[]): void {
  if (!DEPS_ENABLED) return;
  const L = ledger();
  const set = L.groups.get(name) ?? new Set<string>();
  for (const t of tokens) {
    if (t.startsWith('@dir:')) {
      const rel = toRel(t.slice(5));
      if (rel) set.add(`@dir:${rel}`);
    } else if (t.startsWith('@')) set.add(t);
    else {
      const [file, frag] = splitFrag(t);
      const rel = toRel(file);
      if (rel) set.add(frag === undefined ? rel : `${rel}#${frag}`);
    }
  }
  L.groups.set(name, set);
}

function splitFrag(p: string): [string, string | undefined] {
  const i = p.indexOf('#');
  return i < 0 ? [p, undefined] : [p.slice(0, i), p.slice(i + 1)];
}

// ── fs 攔截（只有 DEPS_ENABLED 才裝）──────────────────────────────────────────
function hookRead(p: unknown) {
  if (ledger().als.getStore()?.silentFileReads) return;
  const rel = toRel(p);
  if (rel) note(rel);
}
function hookDir(p: unknown) {
  const rel = toRel(p);
  if (rel) note(`@dir:${rel}`);
}

function installFsHooks() {
  const L = ledger();
  if (L.patched) return;
  L.patched = true;
  const wrapSync = (obj: any, name: string, hook: (p: unknown) => void) => {
    const orig = obj[name];
    if (typeof orig !== 'function') return;
    obj[name] = function (this: unknown, p: unknown, ...rest: unknown[]) {
      hook(p);
      return orig.call(this, p, ...rest);
    };
  };
  // existsSync / statSync 也記：檔案「出現或消失」會改變頁面輸出。
  for (const n of ['readFileSync', 'existsSync', 'statSync', 'lstatSync'])
    wrapSync(fs, n, hookRead);
  wrapSync(fs, 'readdirSync', hookDir);
  wrapSync(fs, 'readFile', hookRead);
  wrapSync(fs, 'readdir', hookDir);
  for (const n of ['readFile', 'stat', 'lstat', 'access'])
    wrapSync(fsp, n, hookRead);
  wrapSync(fsp, 'readdir', hookDir);
  // fs.promises 與 fs/promises 是同一個物件，上面已涵蓋；同步具名匯出給 ESM 綁定
  syncBuiltinESMExports();
}

// ── 輸出 ────────────────────────────────────────────────────────────────────
/** 把帳本轉成 `{ 頁面路徑: [輸入…], '@group:名': [檔…], '@init': {…} }`。 */
export function snapshotLedger(): Record<string, unknown> {
  const L = G.__twmdDeps;
  if (!L) return {};
  const out: Record<string, unknown> = {};
  for (const [page, deps] of L.pages) out[page] = [...deps].sort();
  for (const [g, files] of L.groups) out[`@group:${g}`] = [...files].sort();
  out['@init'] = Object.fromEntries(L.init);
  return out;
}

/** build:done 時由 astro.config.mjs 的整合呼叫。 */
export function writeLedgerFile(file: string): void {
  fs.mkdirSync(dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(snapshotLedger()));
}
