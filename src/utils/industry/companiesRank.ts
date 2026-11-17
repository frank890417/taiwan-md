/**
 * companiesRank.ts — /companies 排行表的排序、篩選、名次變化與集中度計算。
 *
 * 純函式、零 import：同一份邏輯給 SSR（算摘要與集中度）、頁面上的 <script>（重排表格列）
 * 與 tests/industry-rank.test.mjs（node --experimental-strip-types）三邊共用。
 * 金額單位一律「億 TWD」，跟 dataConfig.ts 的來源資料一致；換算只在顯示層做。
 */

export interface RankRow {
  ticker: string;
  /** 依市值的名次（1 起算），排序後仍顯示這個名次 */
  rank: number;
  marketCap: number;
  revenue: number;
  employees: number;
  founded: number;
  /** 證交所／櫃買官方產業別代碼（'24' 半導體業 …） */
  industryCode: string;
  /** 公司登記住址所在縣市（臺北市、新竹縣 …） */
  county: string;
  /** 上一次快照的名次；上一次不在榜內為 null */
  prevRank: number | null;
}

export type SortKey =
  | 'rank'
  | 'marketCap'
  | 'revenue'
  | 'employees'
  | 'founded';
export type SortDir = 'asc' | 'desc';

export interface RankState {
  sort: SortKey;
  dir: SortDir;
  /** 空字串＝不篩 */
  industry: string;
  county: string;
}

export const DEFAULT_STATE: RankState = {
  sort: 'rank',
  dir: 'asc',
  industry: '',
  county: '',
};

const SORT_KEYS: SortKey[] = [
  'rank',
  'marketCap',
  'revenue',
  'employees',
  'founded',
];

/** 第一次點某欄時的方向：名次與成立年由小到大，金額與人數由大到小。 */
export function defaultDir(key: SortKey): SortDir {
  return key === 'rank' || key === 'founded' ? 'asc' : 'desc';
}

/**
 * 依名次指派 1..n（市值由大到小；同市值時代號小的在前，結果可重現）。
 * 輸入不需要先排好。
 */
export function assignRanks<T extends { ticker: string; marketCap: number }>(
  items: T[],
): (T & { rank: number })[] {
  return [...items]
    .sort(
      (a, b) =>
        b.marketCap - a.marketCap || a.ticker.localeCompare(b.ticker, 'en'),
    )
    .map((c, i) => ({ ...c, rank: i + 1 }));
}

/**
 * 排序。穩定：值相同時維持市值名次的先後，所以連點兩次同一欄只會整張表反過來，
 * 不會讓同值的列互換位置。不改動輸入陣列。
 */
export function sortRows<T extends RankRow>(
  rows: T[],
  key: SortKey,
  dir: SortDir,
): T[] {
  const sign = dir === 'asc' ? 1 : -1;
  return [...rows].sort((a, b) => {
    const d = (a[key] - b[key]) * sign;
    return d !== 0 ? d : a.rank - b.rank;
  });
}

/** 篩選：產業別與縣市是「且」的關係；空字串＝該條件不篩。 */
export function filterRows<T extends RankRow>(
  rows: T[],
  f: { industry?: string; county?: string },
): T[] {
  return rows.filter(
    (r) =>
      (!f.industry || r.industryCode === f.industry) &&
      (!f.county || r.county === f.county),
  );
}

export function applyState<T extends RankRow>(rows: T[], s: RankState): T[] {
  return sortRows(filterRows(rows, s), s.sort, s.dir);
}

/**
 * 名次變化：正數＝往前（上次第 8、這次第 5 → +3），負數＝往後，0＝不變，
 * null＝上一次快照不在榜內（新進榜）。
 */
export function rankDelta(row: {
  rank: number;
  prevRank: number | null;
}): number | null {
  return row.prevRank == null ? null : row.prevRank - row.rank;
}

export interface Summary {
  count: number;
  capSum: number;
  revenueSum: number;
  /** 占 base 的百分比；base 沒給或為 0 時是 null */
  capSharePct: number | null;
}

/** 篩選結果的家數與合計；base 傳整張榜的市值合計（或上市櫃總市值）算占比。 */
export function summarize(rows: RankRow[], base?: number): Summary {
  const capSum = rows.reduce((s, r) => s + r.marketCap, 0);
  const revenueSum = rows.reduce((s, r) => s + r.revenue, 0);
  return {
    count: rows.length,
    capSum,
    revenueSum,
    capSharePct: base ? (capSum / base) * 100 : null,
  };
}

/** 依某個欄位分組，回傳家數與市值合計，市值大的在前。 */
export function groupBy(
  rows: RankRow[],
  field: 'industryCode' | 'county',
): { key: string; count: number; capSum: number }[] {
  const m = new Map<string, { key: string; count: number; capSum: number }>();
  for (const r of rows) {
    const g = m.get(r[field]) ?? { key: r[field], count: 0, capSum: 0 };
    g.count += 1;
    g.capSum += r.marketCap;
    m.set(r[field], g);
  }
  return [...m.values()].sort(
    (a, b) => b.capSum - a.capSum || a.key.localeCompare(b.key, 'zh-Hant'),
  );
}

export interface Concentration {
  /** 四段相加＝100：第一名、第 2–10 名、第 11–N 名、榜外 */
  top1Pct: number;
  top2to10Pct: number;
  restOfListPct: number;
  outsidePct: number;
}

/**
 * 市值集中度：把上市櫃總市值切成四段。rows 要是完整榜單；
 * marketTotal 是同一天、同口徑的上市＋上櫃總市值（億 TWD）。
 */
export function concentration(
  rows: RankRow[],
  marketTotal: number,
): Concentration {
  if (!(marketTotal > 0)) throw new Error('marketTotal must be positive');
  const sorted = sortRows(rows, 'rank', 'asc');
  const sum = (xs: RankRow[]) => xs.reduce((s, r) => s + r.marketCap, 0);
  const top1 = sum(sorted.slice(0, 1));
  const top2to10 = sum(sorted.slice(1, 10));
  const rest = sum(sorted.slice(10));
  const pct = (v: number) => (v / marketTotal) * 100;
  return {
    top1Pct: pct(top1),
    top2to10Pct: pct(top2to10),
    restOfListPct: pct(rest),
    outsidePct: pct(marketTotal - top1 - top2to10 - rest),
  };
}

/**
 * 億 TWD → 顯示用數字。zh-TW／ja／ko 原樣用億；其餘語言換算成 billion（÷10）。
 * 2026-08 的 #1317 是把億的數字直接貼上「B」，每家公司都被誇大十倍；換算集中在這裡。
 */
export const MYRIAD_UNIT_LANGS = ['zh-TW', 'ja', 'ko'];
export function displayMoney(valueYi: number, lang: string): number {
  return MYRIAD_UNIT_LANGS.includes(lang) ? valueYi : Math.round(valueYi) / 10;
}

/**
 * 表格狀態 ⇄ 網址查詢參數（`?sort=revenue&dir=desc&industry=24&county=新竹市`）。
 * serializeState 回傳不帶問號的查詢字串，預設狀態回空字串；parseState 吃 location.search。
 * 契約 v1 第 4 節：工具狀態放查詢參數，結果可以分享、可以被連結。
 */
export function serializeState(s: RankState): string {
  const p = new URLSearchParams();
  if (s.sort !== DEFAULT_STATE.sort) p.set('sort', s.sort);
  if (s.dir !== defaultDir(s.sort)) p.set('dir', s.dir);
  if (s.industry) p.set('industry', s.industry);
  if (s.county) p.set('county', s.county);
  return p.toString();
}

export function parseState(search: string): RankState {
  const p = new URLSearchParams(search || '');
  const sortRaw = p.get('sort') as SortKey | null;
  const sort = sortRaw && SORT_KEYS.includes(sortRaw) ? sortRaw : 'rank';
  const dirRaw = p.get('dir');
  const dir: SortDir =
    dirRaw === 'asc' || dirRaw === 'desc' ? dirRaw : defaultDir(sort);
  return {
    sort,
    dir,
    industry: p.get('industry') ?? '',
    county: p.get('county') ?? '',
  };
}
