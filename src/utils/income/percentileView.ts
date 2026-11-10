/**
 * percentileView.ts — 「薪資位置自查」工具的「輸入 → 結果 → 十分位刻度條」純函式。
 *
 * 伺服端（SalaryPercentile.astro 的 frontmatter）與瀏覽器端（元件 script）共用這一份，
 * 預設結果與輸入後的結果走同一套邏輯。百分位與四分位的計算在 percentile.ts，
 * 這裡只負責組合、定位與格式化，沒有任何薪資數字常數（資料從參數來）。
 * 只用可被 --experimental-strip-types 剝除的語法。
 */
import {
  estimatePercentile,
  quartileBand,
  breakpointsFrom,
} from './percentile.ts';
import type { PercentileBand, QuartileBand } from './percentile.ts';

export type GroupKey = 'age' | 'industry' | 'sex';

export interface PctGroup {
  id: string;
  /** 已依語言取好的名稱 */
  label: string;
  median: number | null;
  q1: number | null;
  q3: number | null;
}

export interface PctParams {
  /** 全體受僱員工：D1–D9、Q1、Q3、median（資料檔 all 的欄位名稱） */
  all: Record<string, number | null>;
  /** 本國籍全時受僱員工：只有 q1、median、q3 */
  domestic: { q1: number | null; median: number | null; q3: number | null };
  groups: Record<GroupKey, PctGroup[]>;
}

export interface PctState {
  salary: number;
  age: string;
  industry: string;
  sex: string;
}

export interface PctRow {
  key: GroupKey;
  label: string;
  median: number | null;
  band: QuartileBand | null;
}

export interface ScaleModel {
  /** D1 到 D9 九個分界點（元），由低到高 */
  values: number[];
  salary: number;
  /** 0 到 100：標記在刻度條上的位置（九個分界點等距，格內依比例） */
  pos: number;
  place: 'below' | 'within' | 'above';
}

export interface PctView {
  salary: number;
  percentile: number | null;
  band: PercentileBand;
  median: number;
  diff: number;
  /** 與中位數相差的比例（絕對值，0.05 ＝ 5%） */
  diffRatio: number;
  direction: 'above' | 'below' | 'equal';
  firstDecile: number;
  lastDecile: number;
  domestic: { median: number | null; band: QuartileBand | null };
  rows: PctRow[];
  scale: ScaleModel;
}

/** 動態文案的 key（元件把這些放進 data-i18n，伺服端與瀏覽器端用同一份）。 */
export const PCT_MSG_KEYS = [
  'value.pct',
  'value.below',
  'value.above',
  'sub.above',
  'sub.below',
  'sub.equal',
  'edge.below',
  'edge.above',
  'band.below-q1',
  'band.q1-median',
  'band.median-q3',
  'band.above-q3',
  'nodata',
  'row.group',
  'field.age',
  'field.industry',
  'field.sex',
  'scale.you',
  'scale.below',
  'scale.above',
  'scale.aria',
] as const;

const DECILES = ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9'];

export function fillTemplate(
  tpl: string,
  vars: Record<string, string | number>,
): string {
  let out = tpl;
  for (const [k, v] of Object.entries(vars))
    out = out.split(`{${k}}`).join(String(v));
  return out;
}

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function num(x: unknown, min = 0, max = 1e12): number {
  const v = Number(x);
  if (!Number.isFinite(v)) return min;
  return Math.min(Math.max(v, min), max);
}

function isNum(x: unknown): x is number {
  return typeof x === 'number' && Number.isFinite(x);
}

/** 完整金額：中文「12,345 元」，英文「NT$12,345」。 */
export function money(n: number, loc: string): string {
  const s = Math.round(n).toLocaleString('en-US');
  return loc === 'zh-TW' ? `${s} 元` : `NT$${s}`;
}

function trim1(v: number): string {
  return String(Math.round(v * 10) / 10);
}

/** 短金額：中文「54.6 萬」，英文「NT$546k」。用在標記標籤與文案。 */
export function shortMoney(n: number, loc: string): string {
  if (loc === 'zh-TW') return `${trim1(n / 10000)} 萬`;
  return `NT$${Math.round(n / 1000).toLocaleString('en-US')}k`;
}

/** 刻度金額：中文只寫數字（單位在圖說明裡，萬元），英文「330k」。 */
export function tickLabel(n: number, loc: string): string {
  if (loc === 'zh-TW') return trim1(n / 10000);
  return `${Math.round(n / 1000).toLocaleString('en-US')}k`;
}

function pct1(x: number): string {
  return `${(x * 100).toFixed(1)}%`;
}

/**
 * 標記位置：九個分界點等距排列，格內依金額線性定位。
 * 低於 D1 停在 0，高於 D9 停在 100。
 */
export function markerPosition(
  salary: number,
  values: number[],
): { pos: number; place: 'below' | 'within' | 'above' } {
  const n = values.length;
  if (n < 2) return { pos: 50, place: 'within' };
  if (salary < values[0]) return { pos: 0, place: 'below' };
  if (salary > values[n - 1]) return { pos: 100, place: 'above' };
  for (let i = 0; i < n - 1; i++) {
    const a = values[i];
    const b = values[i + 1];
    if (salary >= a && salary <= b) {
      const r = b > a ? (salary - a) / (b - a) : 0;
      return { pos: ((i + r) / (n - 1)) * 100, place: 'within' };
    }
  }
  return { pos: 100, place: 'above' };
}

function groupRow(
  key: GroupKey,
  id: string,
  list: PctGroup[],
  salary: number,
): PctRow | null {
  if (!id) return null;
  const g = list.find((x) => x.id === id);
  if (!g) return null;
  return {
    key,
    label: g.label,
    median: isNum(g.median) ? g.median : null,
    band: quartileBand(salary, { q1: g.q1, median: g.median, q3: g.q3 }),
  };
}

export function computePercentileView(state: PctState, P: PctParams): PctView {
  const salary = num(state.salary);
  const bps = breakpointsFrom(P.all);
  const est = estimatePercentile(salary, bps);
  const values = DECILES.map((k) => P.all[k]).filter(isNum);
  const median = num(P.all.median);
  const diff = salary - median;
  const direction = diff > 0 ? 'above' : diff < 0 ? 'below' : 'equal';
  const rows: PctRow[] = [];
  for (const key of ['age', 'industry', 'sex'] as GroupKey[]) {
    const r = groupRow(
      key,
      String(state[key] ?? ''),
      P.groups[key] ?? [],
      salary,
    );
    if (r) rows.push(r);
  }
  const mp = markerPosition(salary, values);
  return {
    salary,
    percentile: est.percentile,
    band: est.band,
    median,
    diff,
    diffRatio: median > 0 ? Math.abs(diff) / median : 0,
    direction,
    firstDecile: values[0] ?? 0,
    lastDecile: values[values.length - 1] ?? 0,
    domestic: {
      median: isNum(P.domestic?.median) ? P.domestic.median : null,
      band: quartileBand(
        salary,
        P.domestic ?? { q1: null, median: null, q3: null },
      ),
    },
    rows,
    scale: { values, salary, pos: mp.pos, place: mp.place },
  };
}

export interface ViewTexts {
  out: Record<string, string>;
  show: Record<string, boolean>;
}

/**
 * 把 view 轉成 data-out／data-show 對應的字串，伺服端與瀏覽器端共用。
 * M 是 data-i18n 那包動態文案（key 不含 income.percentile. 前綴）。
 */
export function viewTexts(
  view: PctView,
  M: Record<string, string>,
  loc: string,
): ViewTexts {
  const m = (k: string) => M[k] ?? k;
  const out: Record<string, string> = {};
  const show: Record<string, boolean> = {};

  if (view.band === 'below-d1') out.value = m('value.below');
  else if (view.band === 'above-d9') out.value = m('value.above');
  else out.value = fillTemplate(m('value.pct'), { n: view.percentile ?? 0 });

  const edge = view.band !== 'interpolated';
  show.edge = edge;
  out.edge =
    view.band === 'below-d1'
      ? fillTemplate(m('edge.below'), { bp: money(view.firstDecile, loc) })
      : view.band === 'above-d9'
        ? fillTemplate(m('edge.above'), { bp: money(view.lastDecile, loc) })
        : '';

  out.sub = fillTemplate(m(`sub.${view.direction}`), {
    median: money(view.median, loc),
    amount: money(Math.abs(view.diff), loc),
    pct: pct1(view.diffRatio),
  });

  out.median = money(view.median, loc);
  out['dom-median'] =
    view.domestic.median == null
      ? m('nodata')
      : money(view.domestic.median, loc);
  out['dom-band'] = view.domestic.band
    ? m(`band.${view.domestic.band}`)
    : m('nodata');

  for (const key of ['age', 'industry', 'sex'] as GroupKey[]) {
    const r = view.rows.find((x) => x.key === key);
    show[`row-${key}`] = !!r;
    out[`row-${key}-label`] = r
      ? fillTemplate(m('row.group'), {
          field: m(`field.${key}`),
          label: r.label,
        })
      : '';
    out[`row-${key}-median`] = r
      ? r.median == null
        ? m('nodata')
        : money(r.median, loc)
      : '';
    out[`row-${key}-band`] = r
      ? r.band
        ? m(`band.${r.band}`)
        : m('nodata')
      : '';
  }
  return { out, show };
}

/**
 * 十分位刻度條 SVG（完整的 <svg> 字串）。九個分界點 D1–D9 等距排列，
 * 刻度下方標金額與 D 編號，標記依內插比例定位；低於 D1 或高於 D9 停在兩端並加註。
 */
export function renderScaleSvg(
  s: ScaleModel,
  M: Record<string, string>,
  loc: string,
  place: string,
): string {
  const m = (k: string) => M[k] ?? k;
  const n = s.values.length;
  if (n < 2) return '';
  const W = 360;
  const x0 = 26;
  const x1 = 334;
  const step = (x1 - x0) / (n - 1);
  const mx = x0 + (s.pos / 100) * (x1 - x0);
  const amount = shortMoney(s.salary, loc);
  const you = fillTemplate(m('scale.you'), { amount });
  const aria = fillTemplate(m('scale.aria'), { amount, place });
  const edgeNote =
    s.place === 'below'
      ? m('scale.below')
      : s.place === 'above'
        ? m('scale.above')
        : '';
  const lx = Math.min(Math.max(mx, 40), W - 40);

  const parts: string[] = [];
  parts.push(
    `<svg class="inc-svg inc-pct-svg" viewBox="0 0 ${W} 112" role="img" aria-label="${esc(aria)}">`,
  );
  for (let i = 0; i < n - 1; i++) {
    parts.push(
      `<rect class="inc-area${i % 2 ? ' inc-pct-alt' : ''}" x="${(x0 + i * step).toFixed(2)}" y="52" width="${step.toFixed(2)}" height="10" />`,
    );
  }
  if (mx > x0) {
    parts.push(
      `<rect class="inc-pct-fill" x="${x0}" y="52" width="${(mx - x0).toFixed(2)}" height="10" />`,
    );
  }
  for (let i = 0; i < n; i++) {
    const x = (x0 + i * step).toFixed(2);
    const mid = i === 4;
    parts.push(
      `<line class="inc-axis${mid ? ' inc-pct-mid' : ''}" x1="${x}" y1="${mid ? 46 : 48}" x2="${x}" y2="${mid ? 68 : 66}" />`,
      `<text x="${x}" y="82" text-anchor="middle">${esc(tickLabel(s.values[i], loc))}</text>`,
      `<text class="inc-pct-dn" x="${x}" y="96" text-anchor="middle">${DECILES[i] ?? ''}</text>`,
    );
  }
  parts.push(
    `<line class="inc-pct-mline" x1="${mx.toFixed(2)}" y1="34" x2="${mx.toFixed(2)}" y2="64" />`,
    `<circle class="inc-dot" cx="${mx.toFixed(2)}" cy="57" r="5" />`,
    `<text class="inc-pct-me" x="${lx.toFixed(2)}" y="${edgeNote ? 15 : 24}" text-anchor="middle">${esc(you)}</text>`,
  );
  if (edgeNote) {
    parts.push(
      `<text class="inc-pct-me" x="${lx.toFixed(2)}" y="28" text-anchor="middle">${esc(edgeNote)}</text>`,
    );
  }
  parts.push('</svg>');
  return parts.join('');
}
