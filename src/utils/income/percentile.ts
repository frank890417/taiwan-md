/**
 * percentile.ts — 「薪資位置自查」工具的百分位估計純函式。
 *
 * 資料來源：主計總處《工業及服務業受僱員工全年總薪資中位數及分布統計結果》
 * （src/data/income/salary-distribution-2024.json）。官方只公布十分位 D1–D9 與
 * 四分位 Q1、Q3，沒有更細的百分位。
 *
 * 內插是「本工具的假設」，不是官方數字：在兩個相鄰官方分界點之間，假設人數沿薪資線性
 * 分布，因此結果只能標「內插估計」。低於最低分界點、高於最高分界點一律不外推。
 */

/** 一個官方分界點：p 是百分位（10＝D1、25＝Q1、50＝中位數、75＝Q3、90＝D9），value 是年薪（元）。 */
export interface Breakpoint {
  p: number;
  value: number;
}

export type PercentileBand = 'below-d1' | 'interpolated' | 'above-d9';

export interface PercentileEstimate {
  /** 估計百分位（整數，0–100 之間）；低於最低或高於最高分界點時為 null。 */
  percentile: number | null;
  band: PercentileBand;
  /** 內插所用的下界分界點；above-d9 時是最高的分界點。 */
  lower?: Breakpoint;
  /** 內插所用的上界分界點；below-d1 時是最低的分界點。 */
  upper?: Breakpoint;
}

export type QuartileBand = 'below-q1' | 'q1-median' | 'median-q3' | 'above-q3';

function cleanBreakpoints(breakpoints: Breakpoint[]): Breakpoint[] {
  const ok = breakpoints.filter(
    (b) =>
      b !== null &&
      typeof b === 'object' &&
      Number.isFinite(b.p) &&
      Number.isFinite(b.value),
  );
  // 依 value 排序（同值時依 p），同一個 p 只留一筆（D5 與 median 都是 50）
  ok.sort((a, b) => a.value - b.value || a.p - b.p);
  const seen = new Set<number>();
  return ok.filter((b) => (seen.has(b.p) ? false : (seen.add(b.p), true)));
}

/**
 * 估計 annualSalary 落在第幾百分位（比他低的人約占多少 %）。
 * - 剛好等於某分界點：回該點的 p。
 * - 兩個相鄰分界點之間：線性內插後取到整數（四捨五入）。
 * - 低於最低分界點：band 'below-d1'，percentile null。
 * - 高於最高分界點：band 'above-d9'，percentile null。
 */
export function estimatePercentile(
  annualSalary: number,
  breakpoints: Breakpoint[],
): PercentileEstimate {
  if (typeof annualSalary !== 'number' || !Number.isFinite(annualSalary)) {
    throw new TypeError('annualSalary must be a finite number');
  }
  const pts = cleanBreakpoints(breakpoints);
  if (pts.length === 0) {
    throw new RangeError('breakpoints must contain at least one valid point');
  }
  const first = pts[0];
  const last = pts[pts.length - 1];
  if (annualSalary < first.value) {
    return { percentile: null, band: 'below-d1', upper: first };
  }
  if (annualSalary > last.value) {
    return { percentile: null, band: 'above-d9', lower: last };
  }
  for (let i = 0; i < pts.length; i++) {
    const cur = pts[i];
    if (annualSalary === cur.value) {
      return {
        percentile: cur.p,
        band: 'interpolated',
        lower: cur,
        upper: cur,
      };
    }
    const next = pts[i + 1];
    if (next && annualSalary > cur.value && annualSalary < next.value) {
      const ratio = (annualSalary - cur.value) / (next.value - cur.value);
      const p = cur.p + ratio * (next.p - cur.p);
      return {
        percentile: Math.round(p),
        band: 'interpolated',
        lower: cur,
        upper: next,
      };
    }
  }
  /* c8 ignore next */
  return { percentile: null, band: 'above-d9', lower: last };
}

/**
 * 四分位落點：低於 Q1、Q1 到中位數、中位數到 Q3、高於 Q3。
 * 邊界值歸入較高的一段（剛好等於 Q1 → 'q1-median'；剛好等於 Q3 → 'above-q3'）。
 * 任何一個分界值為 null／非數字，回 null（年齡、行業等官方只有這三個點）。
 */
export function quartileBand(
  annualSalary: number,
  q: { q1: number | null; median: number | null; q3: number | null },
): QuartileBand | null {
  if (typeof annualSalary !== 'number' || !Number.isFinite(annualSalary)) {
    return null;
  }
  const { q1, median, q3 } = q ?? ({} as typeof q);
  for (const v of [q1, median, q3]) {
    if (typeof v !== 'number' || !Number.isFinite(v)) return null;
  }
  if (annualSalary < (q1 as number)) return 'below-q1';
  if (annualSalary < (median as number)) return 'q1-median';
  if (annualSalary < (q3 as number)) return 'median-q3';
  return 'above-q3';
}

const DECILE_KEYS: Record<string, number> = {
  d1: 10,
  d2: 20,
  d3: 30,
  d4: 40,
  d5: 50,
  d6: 60,
  d7: 70,
  d8: 80,
  d9: 90,
  q1: 25,
  median: 50,
  q3: 75,
};

/**
 * 把資料檔裡某一組（all／domesticFullTime／groups 的一筆）轉成 breakpoints。
 * 認得 D1–D9、Q1、Q3、median（大小寫不拘），null 與非數字跳過；D5 與 median 同為 50，只留一筆。
 */
export function breakpointsFrom(
  distribution: Record<string, unknown> | null | undefined,
): Breakpoint[] {
  if (!distribution || typeof distribution !== 'object') return [];
  const byP = new Map<number, number>();
  for (const [key, raw] of Object.entries(distribution)) {
    const p = DECILE_KEYS[key.toLowerCase()];
    if (p === undefined) continue;
    if (typeof raw !== 'number' || !Number.isFinite(raw)) continue;
    if (!byP.has(p)) byP.set(p, raw);
  }
  return [...byP.entries()]
    .map(([p, value]) => ({ p, value }))
    .sort((a, b) => a.value - b.value || a.p - b.p);
}
