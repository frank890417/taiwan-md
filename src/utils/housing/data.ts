/**
 * data.ts — /housing/ 主頁讀資料檔的小工具（只在伺服端 build 時用，不進瀏覽器）
 *
 * 規則：頁面上的數字一律從 src/data/housing/*.json 讀出，這裡只負責「找序列、取最新值、
 * 換期別字串、把 source 轉成可顯示的來源列」。文案在 src/i18n/housing-home.ts。
 */
import affordability from '../../data/housing/affordability.json';
import creditControls from '../../data/housing/credit-controls.json';
import fixtures from '../../data/housing/calc-fixtures.json';
import income from '../../data/housing/income.json';
import lending from '../../data/housing/lending.json';
import positions from '../../data/housing/positions.json';
import priceIndex from '../../data/housing/price-index.json';
import qingan from '../../data/housing/qingan.json';
import rates from '../../data/housing/rates.json';
import socialHousing from '../../data/housing/social-housing.json';
import stock from '../../data/housing/stock.json';
import tax from '../../data/housing/tax.json';
import timeline from '../../data/housing/timeline.json';
import transactions from '../../data/housing/transactions.json';
import vacancy from '../../data/housing/vacancy.json';
import { housingHome } from '../../i18n/housing-home';

const FILES = {
  affordability,
  'credit-controls': creditControls,
  income,
  lending,
  'price-index': priceIndex,
  rates,
  'social-housing': socialHousing,
  stock,
  tax,
  transactions,
  vacancy,
} as const;
export type FileKey = keyof typeof FILES;

export const DATA = {
  qingan,
  timeline,
  positions,
  fixtures,
} as const;

export interface Src {
  agency: string;
  title: string;
  url: string;
}
export interface Pt {
  t: string;
  v: number;
}
export interface Series {
  id: string;
  label: { zh: string; en: string };
  unit: string;
  cadence: string;
  asOf: string;
  derived?: boolean;
  source: Src;
  note?: string;
  points: Pt[];
}
export interface Table {
  id: string;
  label: { zh: string; en: string };
  period?: string;
  source: Src;
  note?: string;
  rows: any[];
  columns?: string[];
}

export function getSeries(file: FileKey, id: string): Series {
  const s = ((FILES[file] as any).series as Series[]).find((x) => x.id === id);
  if (!s) throw new Error(`housing data: series ${file}/${id} not found`);
  return s;
}
export function getTable(file: FileKey, id: string): Table {
  const t = ((FILES[file] as any).tables as Table[]).find((x) => x.id === id);
  if (!t) throw new Error(`housing data: table ${file}/${id} not found`);
  return t;
}
export function fileRetrieved(file: FileKey): string {
  return (FILES[file] as any).retrieved as string;
}

export const latest = (s: { points: Pt[] }): Pt =>
  s.points[s.points.length - 1];
export const first = (s: { points: Pt[] }): Pt => s.points[0];
export const pointAt = (s: { points: Pt[] }, t: string): Pt | undefined =>
  s.points.find((p) => p.t === t);
export const maxPoint = (s: { points: Pt[] }): Pt =>
  s.points.reduce((a, p) => (p.v > a.v ? p : a));
export const minPoint = (s: { points: Pt[] }): Pt =>
  s.points.reduce((a, p) => (p.v < a.v ? p : a));

/** 期別字串 → 數線上的年（2026Q1→2026，Q2→2026.25；2026-09→2026.667；2025H2→2025.5）。 */
export function xOfT(t: string): number {
  let m: RegExpMatchArray | null;
  if ((m = t.match(/^(\d{4})Q([1-4])$/))) return +m[1] + (+m[2] - 1) / 4;
  if ((m = t.match(/^(\d{4})H([12])$/))) return +m[1] + (+m[2] - 1) / 2;
  if ((m = t.match(/^(\d{4})-(\d{2})-(\d{2})$/)))
    return +m[1] + (+m[2] - 1) / 12 + (+m[3] - 1) / 365;
  if ((m = t.match(/^(\d{4})-(\d{2})$/))) return +m[1] + (+m[2] - 1) / 12;
  if ((m = t.match(/^(\d{4})$/))) return +m[1];
  return NaN;
}
export const yearOfT = (t: string): number => parseInt(t.slice(0, 4), 10);

/** 季序列 → 各年第 4 季，再補最新一季（最新季不是第 4 季時）。 */
export function annualQ4(points: Pt[]): Pt[] {
  const out = points.filter((p) => p.t.endsWith('Q4'));
  const last = points[points.length - 1];
  if (last && !last.t.endsWith('Q4')) out.push(last);
  return out;
}

/** 下一個季別：2026Q1 → 2026Q2；2026Q4 → 2027Q1。 */
export function nextQuarter(t: string): string {
  const m = t.match(/^(\d{4})Q([1-4])$/);
  if (!m) return t;
  const y = +m[1];
  const q = +m[2];
  return q === 4 ? `${y + 1}Q1` : `${y}Q${q + 1}`;
}

const MONTHS_EN = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

/** 期別 → 顯示字串（依語系）。 */
export function fmtPeriod(t: string, lang: string): string {
  const zh = lang === 'zh-TW';
  let m: RegExpMatchArray | null;
  if ((m = t.match(/^(\d{4})Q([1-4])$/)))
    return zh ? `${m[1]} 年第 ${m[2]} 季` : `Q${m[2]} ${m[1]}`;
  if ((m = t.match(/^(\d{4})H([12])$/)))
    return zh
      ? `${m[1]} 年${m[2] === '1' ? '上' : '下'}半年`
      : `H${m[2]} ${m[1]}`;
  if ((m = t.match(/^(\d{4})-(\d{2})-(\d{2})$/)))
    return zh
      ? `${m[1]} 年 ${+m[2]} 月 ${+m[3]} 日`
      : `${+m[3]} ${MONTHS_EN[+m[2] - 1]} ${m[1]}`;
  if ((m = t.match(/^(\d{4})-(\d{2})$/)))
    return zh ? `${m[1]} 年 ${+m[2]} 月` : `${MONTHS_EN[+m[2] - 1]} ${m[1]}`;
  if ((m = t.match(/^(\d{4})$/))) return zh ? `${m[1]} 年` : m[1];
  return t;
}

/** 圖軸與表格用的短期別（不帶「年」字）。 */
export function fmtPeriodShort(t: string, lang: string): string {
  const zh = lang === 'zh-TW';
  let m: RegExpMatchArray | null;
  if ((m = t.match(/^(\d{4})Q([1-4])$/))) return `${m[1]}Q${m[2]}`;
  if ((m = t.match(/^(\d{4})-(\d{2})$/))) return `${m[1]}-${m[2]}`;
  return zh ? t : t;
}

// ── 數字顯示 ─────────────────────────────────────────────────────────

export const grp = (n: number): string => Math.round(n).toLocaleString('en-US');

/** 固定小數位（資料原本的位數）。 */
export const dec = (n: number, d = 2): string => n.toFixed(d);

/** 去尾零：1.775 → 1.775；2.3 → 2.3；9.5 → 9.5。 */
export function trimNum(n: number, d = 3): string {
  const s = n.toFixed(d);
  return s.includes('.') ? s.replace(/0+$/, '').replace(/\.$/, '') : s;
}

/** 億元（輸入單位：億元）→ zh「9,439 億」「2.9 兆」；en「NT$94.4B」「NT$2.9T」。 */
export function fmtYi(v: number, lang: string, digits = 1): string {
  const zh = lang === 'zh-TW';
  const a = Math.abs(v);
  if (a >= 10000) {
    const t = v / 10000;
    return zh ? `${trimNum(t, 2)} 兆元` : `NT$${trimNum(t, 2)} trillion`;
  }
  return zh ? `${grp(v)} 億元` : `NT$${trimNum(v / 10, digits)} billion`;
}

/** 元 → zh「1,000 萬元」「966 萬元」；en「NT$10 million」「NT$9.66 million」。 */
export function fmtWanYuan(v: number, lang: string): string {
  const zh = lang === 'zh-TW';
  if (zh) {
    const w = v / 1e4;
    return `${Number.isInteger(w) ? grp(w) : trimNum(w, 2)} 萬元`;
  }
  return `NT$${trimNum(v / 1e6, 2)} million`;
}

/** 元 → 「14,792 元」「NT$14,792」。 */
export function fmtYuan(v: number, lang: string): string {
  return lang === 'zh-TW' ? `${grp(v)} 元` : `NT$${grp(v)}`;
}

/** 單位為「萬元」（家庭收支調查）→ 「101.8 萬元」「NT$1.018 million」。 */
export function fmtWanUnit(v: number, lang: string): string {
  return lang === 'zh-TW'
    ? `${trimNum(v, 2)} 萬元`
    : `NT$${trimNum(v / 100, 3)} million`;
}

// ── 來源列 ───────────────────────────────────────────────────────────

export interface SourceRef {
  agency: string;
  title: string;
  url: string;
  /** 截止期別原字串（2026Q1、2026-09…） */
  asOf: string;
  /** 本站自行相加或相除的值 */
  derived?: boolean;
}

export const srcOf = (s: Series): SourceRef => ({
  agency: s.source.agency,
  title: s.source.title,
  url: s.source.url,
  asOf: s.asOf,
  derived: !!s.derived,
});
export const srcOfTable = (t: Table, asOf?: string): SourceRef => ({
  agency: t.source.agency,
  title: t.source.title,
  url: t.source.url,
  asOf: asOf ?? t.period ?? '',
});

/** 機關名（資料裡是中文）→ 依語系顯示；先找完整名，再找去掉「（資料源…）」註記的名稱，都沒有就用原名。 */
export function agencyName(agency: string, lang: string): string {
  const strip = (a: string) => a.replace(/（資料[源含][^）]*）/g, '').trim();
  if (lang === 'zh-TW') return strip(agency);
  const map = housingHome(lang).agencies as Record<string, string>;
  return map[agency] ?? map[strip(agency)] ?? strip(agency);
}

/** 圖下方來源列用的機關名。 */
export const agencyShort = agencyName;

/** 取本站「去掉結尾品牌」的標題：「房貸試算 2026：…｜Taiwan.md」→ 「房貸試算 2026：…」。 */
export function stripBrand(s: string): string {
  return s.replace(/\s*[｜|]\s*Taiwan\.md\s*$/, '').trim();
}

/** 全部序列的最大值上界（圖軸用）。 */
export const maxOf = (arr: number[]): number => Math.max(...arr);

/** qingan.json 的 sources 表 → SourceRef（asOf 預設用該檔的 asOf）。 */
export function qinganSrc(key: string, asOf?: string): SourceRef {
  const q: any = DATA.qingan;
  const s = q.sources[key];
  if (!s) throw new Error(`qingan source ${key} not found`);
  return { agency: s.agency, title: s.title, url: s.url, asOf: asOf ?? q.asOf };
}

/** 來源列去重（同一網址與截止期別只留一筆）。 */
export function uniqSrc(arr: SourceRef[]): SourceRef[] {
  const seen = new Set<string>();
  return arr.filter((s) => {
    const k = `${s.url}|${s.asOf}|${s.derived ? 1 : 0}`;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

/** 縣市中文名 → 依語系顯示（英文名取自低度使用表，該表含 22 縣市）。 */
export function countyName(zhName: string, lang: string): string {
  if (lang === 'zh-TW') return zhName;
  const r = getTable('vacancy', 'low-use-by-county-2025H2').rows.find(
    (x: any) => x.key === zhName,
  );
  return r?.name?.en ?? zhName;
}

/** 季資料的滑過提示 x：2026.25 → 2026Q2。 */
export function fmtXq(x: number): string {
  const y = Math.floor(x + 1e-6);
  return `${y}Q${Math.round((x - y) * 4) + 1}`;
}
/** 月資料的滑過提示 x：2026.667 → 2026-09。 */
export function fmtXm(x: number): string {
  const y = Math.floor(x + 1e-6);
  return `${y}-${String(Math.round((x - y) * 12) + 1).padStart(2, '0')}`;
}

export interface MergedSrc {
  agency: string;
  url: string;
  title: string;
  asOfs: string[];
  derived: boolean;
}
/** 同一機關（且同為本站計算與否）的來源併成一筆，截止期別列出各自的值。 */
export function mergeSrc(arr: SourceRef[]): MergedSrc[] {
  const out: MergedSrc[] = [];
  for (const s of uniqSrc(arr)) {
    const hit = out.find(
      (o) => o.agency === s.agency && o.derived === !!s.derived,
    );
    if (hit) {
      if (s.asOf && !hit.asOfs.includes(s.asOf)) hit.asOfs.push(s.asOf);
    } else {
      out.push({
        agency: s.agency,
        url: s.url,
        title: s.title,
        asOfs: s.asOf ? [s.asOf] : [],
        derived: !!s.derived,
      });
    }
  }
  return out;
}
