/**
 * format.ts — 房貸工具的金額、百分比、期數格式化與網址查詢參數同步
 *
 * 伺服端（Astro 先算預設案例）與瀏覽器端（互動重算）共用同一份，輸出必須逐字一致。
 * zh-TW 用「元」「萬」「億」；其他語言用 NT$ 與千分位。
 */

const isZh = (lang: string): boolean => lang === 'zh-TW';

const group = (n: number): string => Math.round(n).toLocaleString('en-US');

/** 去掉小數尾端多餘的 0。 */
const trim = (s: string): string =>
  s.includes('.') ? s.replace(/0+$/, '').replace(/\.$/, '') : s;

/** 精確到元：14,792 元／NT$14,792。 */
export function fmtNTD(v: number, lang: string): string {
  if (!Number.isFinite(v)) return '—';
  return isZh(lang) ? `${group(v)} 元` : `NT$${group(v)}`;
}

/** 大額簡寫（輸入單位為元）：zh 為「1,000 萬」「1.25 億」，其他語言為 NT$10M。 */
export function fmtWan(v: number, lang: string): string {
  if (!Number.isFinite(v)) return '—';
  const a = Math.abs(v);
  if (isZh(lang)) {
    if (a >= 1e8) return `${trim((v / 1e8).toFixed(2))} 億`;
    if (a >= 1e6) return `${group(v / 1e4)} 萬`;
    return `${trim((v / 1e4).toFixed(1))} 萬`;
  }
  if (a >= 1e9) return `NT$${trim((v / 1e9).toFixed(2))}B`;
  return `NT$${trim((v / 1e6).toFixed(a >= 1e7 ? 1 : 2))}M`;
}

/** 圖表座標軸用的短版：zh「40萬」，其他語言「0.4M」。 */
export function fmtAxisMoney(v: number, lang: string): string {
  if (!Number.isFinite(v)) return '';
  if (isZh(lang)) {
    if (Math.abs(v) >= 1e8) return `${trim((v / 1e8).toFixed(1))}億`;
    return `${trim((v / 1e4).toFixed(Math.abs(v) < 1e5 && v !== 0 ? 1 : 0))}萬`;
  }
  return `${trim((v / 1e6).toFixed(2))}M`;
}

/** 百分比；digits 預設 2。 */
export function fmtPercent(v: number, digits = 2): string {
  if (!Number.isFinite(v)) return '—';
  return `${v.toFixed(digits)}%`;
}

/** 利率：最多 3 位小數，不補尾零（1.9%、2.275%）。 */
export function fmtRate(v: number): string {
  return Number.isFinite(v) ? `${trim(v.toFixed(3))}%` : '—';
}

/** 括號：中文用全形，其他語言用半形。 */
export function paren(s: string, lang: string): string {
  return isZh(lang) ? `（${s}）` : ` (${s})`;
}

/** 數字；digits 預設 2，不補尾零。 */
export function fmtNum(v: number, digits = 2): string {
  if (!Number.isFinite(v)) return '—';
  return trim(v.toFixed(digits));
}

/** 月數 → 「5 年 3 個月」「5 yr 3 mo」。 */
export function fmtYearsMonths(months: number, lang: string): string {
  const y = Math.floor(months / 12);
  const m = Math.round(months - y * 12);
  if (isZh(lang)) {
    if (y === 0) return `${m} 個月`;
    return m === 0 ? `${y} 年` : `${y} 年 ${m} 個月`;
  }
  if (y === 0) return `${m} mo`;
  return m === 0 ? `${y} yr` : `${y} yr ${m} mo`;
}

/** 期數：「480 期（40 年）」「480 months (40 yr)」。 */
export function fmtPeriods(months: number, lang: string): string {
  const n = Math.round(months);
  return isZh(lang)
    ? `${group(n)} 期（${fmtYearsMonths(n, lang)}）`
    : `${group(n)} months (${fmtYearsMonths(n, lang)})`;
}

/** 把 {name} 佔位換成值；找不到的佔位原樣保留。 */
export function fill(
  tpl: string,
  vars: Record<string, string | number>,
): string {
  return tpl.replace(/\{(\w+)\}/g, (m, k: string) =>
    k in vars ? String(vars[k]) : m,
  );
}

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * 會透露婚育或家庭狀況的欄位（新婚、育有未成年子女的額度別）不放查詢參數，
 * 改放網址 `#` 後面：不會送到伺服器、也不進分析事件（專題共用契約 §11 規則 1）。
 */
const HASH_ONLY_KEYS = new Set(['limitClass']);

/** `#錨點&k=v&k2=v2` → 錨點與參數。錨點可以是空的。 */
function splitHash(hash: string): { anchor: string; sp: URLSearchParams } {
  const raw = hash.startsWith('#') ? hash.slice(1) : hash;
  const i = raw.indexOf('&');
  const head = i === -1 ? raw : raw.slice(0, i);
  const rest = i === -1 ? '' : raw.slice(i + 1);
  if (head.includes('=')) return { anchor: '', sp: new URLSearchParams(raw) };
  return { anchor: head, sp: new URLSearchParams(rest) };
}

/** 給「帶進另一個工具」的連結用：把只放 `#` 後面的欄位接在錨點之後。 */
export function hashWithParams(
  anchor: string,
  params: Record<string, string>,
): string {
  const sp = new URLSearchParams(params).toString();
  return `#${anchor}${sp ? `&${sp}` : ''}`;
}

/**
 * 從網址查詢參數讀取某個前綴的欄位。
 * 參數名為 `${prefix}_${key}`，同頁多個工具用各自前綴互不干擾。
 */
export function readParams(
  prefix: string,
  keys: string[],
  search?: string,
): Record<string, string> {
  const out: Record<string, string> = {};
  const src =
    search ?? (typeof location === 'undefined' ? '' : location.search);
  const sp = new URLSearchParams(src);
  const hs =
    search === undefined && typeof location !== 'undefined'
      ? splitHash(location.hash).sp
      : new URLSearchParams();
  for (const k of keys) {
    const name = `${prefix}_${k}`;
    const v = HASH_ONLY_KEYS.has(k) ? hs.get(name) : sp.get(name);
    if (v !== null) out[k] = v;
  }
  return out;
}

/**
 * 把欄位寫回網址（history.replaceState，不新增歷史紀錄）。
 * 與預設值相同的欄位不寫，網址保持短；其他前綴與無關參數原樣保留。
 */
export function writeParams(
  prefix: string,
  values: Record<string, string>,
  defaults: Record<string, string>,
): void {
  if (typeof location === 'undefined' || typeof history === 'undefined') return;
  const sp = new URLSearchParams(location.search);
  const { anchor, sp: hs } = splitHash(location.hash);
  for (const k of Object.keys(values)) {
    const name = `${prefix}_${k}`;
    const target = HASH_ONLY_KEYS.has(k) ? hs : sp;
    sp.delete(name);
    if (values[k] !== defaults[k] && values[k] !== '')
      target.set(name, values[k]);
  }
  const qs = sp.toString();
  const hq = hs.toString();
  const hash = anchor || hq ? `#${anchor}${anchor && hq ? '&' : ''}${hq}` : '';
  const next = `${location.pathname}${qs ? `?${qs}` : ''}${hash}`;
  try {
    history.replaceState(history.state, '', next);
  } catch {
    /* 沙箱 iframe 可能不允許，忽略 */
  }
}
