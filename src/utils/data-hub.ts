/**
 * data-hub.ts — /data 資料中樞的資料層：型別、在地化、數字格式、迷你折線。
 *
 * 內容 SSOT 在 src/data/data-hub/*.json（指標、七章、資料來源目錄、
 * 國際資料庫怎麼標台灣、七十五年總覽）。每個要給人讀的欄位都是 { 'zh-TW': …, en: …, … }
 * 的在地化物件；缺語言時退英文、再退中文（內容層一律先退英文：非中文讀者
 * 讀英文比讀中文容易，日韓也一樣——UI 字串層的 ja/ko→zh 退路是另一回事）。
 *
 * 數字格式交給 Intl（compact notation 會照語言寫成 2,340萬／2340万／23.4M），
 * 單位與前綴各語言自己填，數值本身只存一份。
 */

import indicatorsJson from '../data/data-hub/indicators.json';
import threadsJson from '../data/data-hub/threads.json';
import sourcesJson from '../data/data-hub/sources.json';
import intlJson from '../data/data-hub/intl.json';
import storyJson from '../data/data-hub/story.json';

export type Loc = Partial<Record<string, string>> & { 'zh-TW': string };

// ── 內容層多語：data/data-hub/content/{lang}.json 是「路徑 → 譯文」的平面表 ──
// 路徑由 walkLocs 產生（物件鍵以 / 串起，陣列元素有 id 用 id、沒有用索引），
// scripts/tools/data-hub-i18n.py 用同一套規則匯出待譯原文與對賬，兩邊不可分岔。
// SSOT 只寫 zh-TW 與 en；其他語言在 build 時疊上去，翻譯分身各寫各的檔。
const overlayModules = import.meta.glob('../../data/data-hub/content/*.json', {
  eager: true,
  import: 'default',
}) as Record<string, Record<string, string>>;

function isLoc(v: unknown): v is Loc {
  return (
    !!v &&
    typeof v === 'object' &&
    !Array.isArray(v) &&
    typeof (v as any)['zh-TW'] === 'string'
  );
}

export function walkLocs(
  node: unknown,
  path: string,
  visit: (loc: Loc, path: string) => void,
): void {
  if (isLoc(node)) {
    visit(node, path);
    return;
  }
  if (Array.isArray(node)) {
    node.forEach((item, i) => {
      const key =
        item && typeof item === 'object' && typeof (item as any).id === 'string'
          ? (item as any).id
          : String(i);
      walkLocs(item, `${path}/${key}`, visit);
    });
    return;
  }
  if (node && typeof node === 'object') {
    for (const [k, v] of Object.entries(node)) {
      if (k.startsWith('$')) continue;
      walkLocs(v, path ? `${path}/${k}` : k, visit);
    }
  }
}

const CONTENT_ROOTS: [string, unknown][] = [
  ['indicators', indicatorsJson],
  ['threads', threadsJson],
  ['sources', sourcesJson],
  ['intl', intlJson],
  ['story', storyJson],
];

for (const [file, table] of Object.entries(overlayModules)) {
  const lang = file
    .split('/')
    .pop()!
    .replace(/\.json$/, '');
  if (lang.startsWith('_') || !table) continue;
  for (const [root, data] of CONTENT_ROOTS) {
    walkLocs(data, root, (l, p) => {
      const v = table[p];
      if (typeof v === 'string' && v.trim() && !l[lang]) l[lang] = v;
    });
  }
}

export const threadsData = threadsJson;
export const sourcesData = sourcesJson;
export const intlData = intlJson;
/** 總覽「七十五年」的敘事與時間帶（報告 §10.7） */
export const storyData = storyJson;

// 退路：中日韓先退中文、其他語言先退英文（跟 UI 字串的 FALLBACK_CHAIN 同方向）。
// 「有這個鍵但值是空字串」算有填：金額欄的 prefix／unit 靠它分家，中日韓寫
// 「9,224.5 億美元」（prefix 空、unit 美元），其他語言寫「US$922.5B」（unit 空）。
const CJK_LANGS = new Set(['zh-TW', 'ja', 'ko']);
export function loc(field: Loc | string | undefined, lang: string): string {
  if (!field) return '';
  if (typeof field === 'string') return field;
  const order = CJK_LANGS.has(lang)
    ? [lang, 'zh-TW', 'en']
    : [lang, 'en', 'zh-TW'];
  for (const l of order) {
    const v = field[l];
    if (typeof v === 'string') return v;
  }
  return '';
}

export type ValueFormat =
  | 'count' // 人數、件數：compact（萬／M）
  | 'number' // 一般數字：千分位，不 compact
  | 'percent'
  | 'money' // 金額：compact，前綴／單位由各語言填
  | 'rank'; // 名次：用 display 欄位

export interface IndicatorSource {
  agency: Loc;
  url: string;
  download?: string;
}

export interface Indicator {
  id: string;
  /** 小寫分類 slug（對齊 categoryConfig） */
  category: string;
  title: Loc;
  value: number;
  format: ValueFormat;
  decimals?: number;
  prefix?: Loc;
  unit?: Loc;
  /** 格式化規則寫不出來時（名次、區間）直接給每語言的寫法 */
  display?: Loc;
  period: Loc;
  /** 參考期間的結束日（ISO，例如 2026-09-30），給過期檢查與下載檔用 */
  asOf: string;
  compare?: { value: number; period: Loc; display?: Loc };
  /** [年, 值]，年度序列，只收官方表直接抄得到的 */
  series?: [number, number][];
  seriesNote?: Loc;
  source: IndicatorSource;
  /**
   * 數字的性質（REFLEXES #38：一個欄位不能混三種東西）：
   * official＝官方統計發布值；estimate＝業界或研究機構估計；
   * projection＝推估或預測；ranking＝國際評比名次（評比方的方法）。
   */
  basis?: 'official' | 'estimate' | 'projection' | 'ranking';
  /** 官方多久發布一次新值；過期檢查（scripts/tools/data-hub-staleness.py）用 */
  cadence?: 'monthly' | 'quarterly' | 'annual' | 'irregular' | 'fixed';
  insight: Loc;
  /**
   * 為什麼重要：這個數字推動或限制了什麼（誰、哪一年、多少）。insight 回答
   * 「數字說了什麼」，why 回答「所以呢」（報告 §10.5）。
   */
  why?: Loc;
  /** zh 路徑 `Folder/slug`（不含 .md），各語言用 getArticleByZhPath 對回譯文 */
  articles?: string[];
  /** 這個數字也出現在哪幾條跨主題的線 */
  threads?: string[];
  /** 首頁頂端那排「今天的台灣」 */
  headline?: boolean;
}

export interface IndicatorsFile {
  meta: {
    generated: string;
    verifiedAt: string;
    license: Loc;
    method: Loc;
  };
  indicators: Indicator[];
}

export const indicatorsData = indicatorsJson as unknown as IndicatorsFile;

const fmtCache = new Map<string, Intl.NumberFormat>();
function nf(lang: string, opts: Intl.NumberFormatOptions): Intl.NumberFormat {
  const key = `${lang}|${JSON.stringify(opts)}`;
  let f = fmtCache.get(key);
  if (!f) {
    f = new Intl.NumberFormat(lang, opts);
    fmtCache.set(key, f);
  }
  return f;
}

// 中日韓用萬進位。Intl 的 compact 會寫成「2321.3萬」，台灣官方發布的寫法
// 是「2,321.3 萬」「6,407.5 億美元」（帶千分位），所以這三語自己換算。
const MYRIAD_UNITS: Record<string, [number, string][]> = {
  'zh-TW': [
    [1e12, '兆'],
    [1e8, '億'],
    [1e4, '萬'],
  ],
  ja: [
    [1e12, '兆'],
    [1e8, '億'],
    [1e4, '万'],
  ],
  ko: [
    [1e12, '조'],
    [1e8, '억'],
    [1e4, '만'],
  ],
};

/** 依語言把一個數值寫成人讀的樣子（不含單位） */
export function formatNumber(
  v: number,
  format: ValueFormat,
  lang: string,
  decimals?: number,
): string {
  const d = decimals ?? (format === 'percent' ? 1 : 0);
  if (format === 'count' || format === 'money') {
    // 小於一萬的數字 compact 沒有意義，直接千分位
    if (Math.abs(v) < 10000) {
      return nf(lang, { maximumFractionDigits: d }).format(v);
    }
    const myriad = MYRIAD_UNITS[lang];
    if (myriad) {
      for (const [base, unit] of myriad) {
        if (Math.abs(v) >= base) {
          return (
            nf(lang, { maximumFractionDigits: decimals ?? 1 }).format(
              v / base,
            ) + unit
          );
        }
      }
    }
    return nf(lang, {
      notation: 'compact',
      maximumFractionDigits: decimals ?? 1,
    }).format(v);
  }
  return nf(lang, {
    minimumFractionDigits: format === 'percent' ? d : 0,
    maximumFractionDigits: d,
  }).format(v);
}

export interface FormattedValue {
  prefix: string;
  number: string;
  unit: string;
  /** 整串，給 aria-label／純文字輸出 */
  text: string;
}

export function formatIndicator(ind: Indicator, lang: string): FormattedValue {
  if (ind.display) {
    const t = loc(ind.display, lang);
    return { prefix: '', number: t, unit: '', text: t };
  }
  const prefix = loc(ind.prefix, lang);
  const number = formatNumber(ind.value, ind.format, lang, ind.decimals);
  const unit =
    ind.format === 'percent' && !ind.unit ? '%' : loc(ind.unit, lang);
  const sep = unit && /^[A-Za-z]/.test(unit) ? ' ' : '';
  return { prefix, number, unit, text: `${prefix}${number}${sep}${unit}` };
}

export function formatCompare(ind: Indicator, lang: string): string {
  if (!ind.compare) return '';
  if (ind.compare.display) return loc(ind.compare.display, lang);
  const prefix = loc(ind.prefix, lang);
  const n = formatNumber(ind.compare.value, ind.format, lang, ind.decimals);
  const unit =
    ind.format === 'percent' && !ind.unit ? '%' : loc(ind.unit, lang);
  const sep = unit && /^[A-Za-z]/.test(unit) ? ' ' : '';
  return `${prefix}${n}${sep}${unit}`;
}

/** 迷你折線的 SVG path（viewBox 0 0 W H，留 2px 邊） */
export function sparkPath(
  series: [number, number][],
  W = 120,
  H = 32,
): { d: string; last: [number, number]; first: [number, number] } | null {
  if (!series || series.length < 2) return null;
  const xs = series.map((p) => p[0]);
  const ys = series.map((p) => p[1]);
  const x0 = Math.min(...xs);
  const x1 = Math.max(...xs);
  let y0 = Math.min(...ys);
  let y1 = Math.max(...ys);
  if (y0 === y1) {
    y0 -= 1;
    y1 += 1;
  }
  const px = (x: number) => 2 + ((x - x0) / (x1 - x0 || 1)) * (W - 4);
  const py = (y: number) => H - 2 - ((y - y0) / (y1 - y0)) * (H - 4);
  const pts = series.map(([x, y]) => [px(x), py(y)] as [number, number]);
  const d = pts
    .map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`)
    .join('');
  return { d, last: pts[pts.length - 1], first: pts[0] };
}

/** 依分類分組，保留 JSON 內的順序 */
export function groupByCategory(list: Indicator[]): Map<string, Indicator[]> {
  const m = new Map<string, Indicator[]>();
  for (const ind of list) {
    const arr = m.get(ind.category) ?? [];
    arr.push(ind);
    m.set(ind.category, arr);
  }
  return m;
}
