/**
 * taxView.ts — 所得稅試算工具的「視圖層」純函式（不碰 DOM、不 import JSON）。
 *
 * 伺服端（Astro frontmatter）與瀏覽器端（<script>）共用同一份：
 *   runTax(state, params, M, loc)   表單狀態 → 計算結果 + 所有要顯示的字串與顯示旗標 + 稅額階梯圖
 *   bracketStepsSvg(net, params, labels)  稅額階梯圖（整個 <svg>）
 * 公式在 tax.ts；這裡只負責「把結果排成畫面要的字」與畫圖，不放任何稅率或金額常數。
 */
import { computeIncomeTax } from './tax.ts';
import type { TaxInput, TaxParams, TaxResult, TaxMethod } from './tax.ts';

/* ── 小工具 ─────────────────────────────────────────────────────────── */

function int(n: number): string {
  return Math.round(n).toLocaleString('en-US');
}

/** 金額：中文「12,345 元」，英文「NT$12,345」（與 toolDom.fmtMoney 同格式）。 */
export function money(n: number, loc: string): string {
  if (!Number.isFinite(n)) return '—';
  return loc === 'zh-TW' ? `${int(n)} 元` : `NT$${int(n)}`;
}

function pct(x: number, digits = 0): string {
  return `${(x * 100).toFixed(digits)}%`;
}

function fill(tpl: string, vars: Record<string, string | number>): string {
  let out = tpl ?? '';
  for (const [k, v] of Object.entries(vars))
    out = out.split(`{${k}}`).join(String(v));
  return out;
}

function esc(s: string): string {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function num(x: unknown): number {
  const v = Number(x);
  return Number.isFinite(v) && v > 0 ? v : 0;
}

/** 動態訊息用到的 key（元件把這些 key 對應的字串塞進 data-i18n）。 */
export const TAX_MSG_KEYS = [
  'unit.wan',
  'unit.k',
  'unit.m',
  'notAnnounced',
  'yearNote.114',
  'yearNote.115',
  'method.joint',
  'method.selfSalarySeparate',
  'method.spouseSalarySeparate',
  'method.selfAllSeparate',
  'method.spouseAllSeparate',
  'best.joint',
  'best.other',
  'divBest.combined',
  'divBest.separate',
  'divBest.same',
  'divCredit',
  'divSeparate',
  'balance.due',
  'balance.refund',
  'w.basic',
  'w.rate20',
  'w.div28',
  'w.amt',
  'clamp',
  'chart.marker',
  'chart.aria',
  'chart.ariaTop',
  'range.first',
  'range.last',
] as const;

/* ── 稅額階梯圖 ─────────────────────────────────────────────────────── */

export interface StepLabels {
  /** 標記上的文字，例如「你的淨額 13.6 萬」 */
  markerText: (net: number) => string;
  /** 整張圖的 aria-label：{net} {rate} {tax} 三個變數 */
  aria: string;
  /** 分開計稅時的 aria-label：{rate} */
  ariaTop: string;
  /** 金額完整格式 */
  money: (n: number) => string;
  /** 緊湊金額（13.6 萬、136K） */
  compact: (n: number) => string;
  /** 級距範圍：first = 「61 萬以下」，mid = 「61–138 萬」，last = 「519 萬以上」 */
  range: (lo: number, up: number | null) => string;
}

const VB_W = 360;
const PAD = 10;
const GAP = 4;
const CELL_Y = 30;
const CELL_H = 58;
const VB_H = CELL_Y + CELL_H + 22;

/** 從 messages 與語系建出 StepLabels。 */
export function stepLabels(M: Record<string, string>, loc: string): StepLabels {
  const parts = (n: number): { num: string; unit: string } => {
    if (loc === 'zh-TW') {
      const w = n / 10000;
      return {
        num: Number.isInteger(w) ? String(w) : w.toFixed(1).replace(/\.0$/, ''),
        unit: M['unit.wan'] ?? '',
      };
    }
    if (n >= 1000000) {
      const m = n / 1000000;
      return {
        num: Number.isInteger(m)
          ? String(m)
          : m.toFixed(2).replace(/0+$/, '').replace(/\.$/, ''),
        unit: M['unit.m'] ?? '',
      };
    }
    const k = n / 1000;
    return {
      num: Number.isInteger(k) ? String(k) : k.toFixed(1).replace(/\.0$/, ''),
      unit: M['unit.k'] ?? '',
    };
  };
  const compact = (n: number) => {
    const p = parts(n);
    return `${p.num}${p.unit}`;
  };
  return {
    markerText: (net) =>
      fill(M['chart.marker'] ?? '{net}', { net: compact(net) }),
    aria: M['chart.aria'] ?? '',
    ariaTop: M['chart.ariaTop'] ?? '',
    money: (n) => money(n, loc),
    compact,
    range: (lo, up) => {
      if (up === null)
        return fill(M['range.last'] ?? '{lo}', { lo: compact(lo) });
      if (lo <= 0) return fill(M['range.first'] ?? '{up}', { up: compact(up) });
      const a = parts(lo);
      const b = parts(up);
      return a.unit === b.unit
        ? `${a.num}–${b.num}${b.unit}`
        : `${a.num}${a.unit}–${b.num}${b.unit}`;
    },
  };
}

export interface StepsOptions {
  /**
   * 'net'（預設）：標出「你的淨額」並框出所在級距，每格顯示課到的稅額。
   * 'top'：分開計稅時淨額沒有單一位置，只框出 topIndex 那一級，不標淨額、不顯示各級稅額。
   */
  mode?: 'net' | 'top';
  topIndex?: number;
}

function bandTax(
  net: number,
  lo: number,
  up: number | null,
  rate: number,
): number {
  const top = up === null ? net : Math.min(net, up);
  const span = top - lo;
  if (!(span > 0)) return 0;
  return Math.floor((span * Math.round(rate * 100)) / 100);
}

/**
 * 稅額階梯圖：五個級距等寬五格，格內上方是稅率（大字），格子下方是該級的淨額範圍；
 * 目前淨額所在的一格加粗框並在上方標「你的淨額」；有課到稅的格子內用小字顯示該級課到的稅額。
 * 回傳整個 <svg>。顏色只用 CSS 變數與 class（樣式在元件裡）。
 */
export function bracketStepsSvg(
  netIn: number,
  params: TaxParams,
  labels: StepLabels,
  opts: StepsOptions = {},
): string {
  const net = Number.isFinite(netIn) && netIn > 0 ? netIn : 0;
  const rows = params.brackets.rows;
  const count = rows.length;
  const topMode = opts.mode === 'top';
  let idx = count - 1;
  if (topMode) {
    idx = Math.max(0, Math.min(count - 1, Math.floor(opts.topIndex ?? 0)));
  } else {
    for (let i = 0; i < count; i++) {
      const up = rows[i].upTo;
      if (up === null || net <= up) {
        idx = i;
        break;
      }
    }
  }
  const cw = (VB_W - PAD * 2 - GAP * (count - 1)) / count;
  const parts: string[] = [];
  let totalTax = 0;
  rows.forEach((r, i) => {
    const lo = i ? (rows[i - 1].upTo as number) : 0;
    const x = PAD + i * (cw + GAP);
    const cx = x + cw / 2;
    const t = topMode ? 0 : bandTax(net, lo, r.upTo, r.rate);
    totalTax += t;
    const cls = [`inc-step`, `inc-step-${i}`];
    if (i <= idx) cls.push('is-on');
    if (i === idx) cls.push('is-cur');
    parts.push(
      `<rect class="${cls.join(' ')}" x="${x.toFixed(1)}" y="${CELL_Y}" width="${cw.toFixed(1)}" height="${CELL_H}" rx="4"/>`,
    );
    parts.push(
      `<text class="inc-step-rate${i > idx ? ' is-off' : ''}" x="${cx.toFixed(1)}" y="${CELL_Y + 26}" text-anchor="middle">${esc(pct(r.rate))}</text>`,
    );
    if (t > 0) {
      parts.push(
        `<text class="inc-step-tax" x="${cx.toFixed(1)}" y="${CELL_Y + 46}" text-anchor="middle">${esc(int(t))}</text>`,
      );
    }
    parts.push(
      `<text class="inc-step-edge" x="${cx.toFixed(1)}" y="${CELL_Y + CELL_H + 16}" text-anchor="middle">${esc(labels.range(lo, r.upTo))}</text>`,
    );
  });

  let marker = '';
  if (!topMode) {
    const mx = PAD + idx * (cw + GAP) + cw / 2;
    const anchor = idx === 0 ? 'start' : idx === count - 1 ? 'end' : 'middle';
    const tx = anchor === 'start' ? PAD : anchor === 'end' ? VB_W - PAD : mx;
    marker =
      `<path class="inc-step-pin" d="M${(mx - 5).toFixed(1)} ${CELL_Y - 8} L${(mx + 5).toFixed(1)} ${CELL_Y - 8} L${mx.toFixed(1)} ${CELL_Y - 2} Z"/>` +
      `<text class="inc-step-mark" x="${tx.toFixed(1)}" y="${CELL_Y - 13}" text-anchor="${anchor}">${esc(labels.markerText(net))}</text>`;
  }

  const aria = topMode
    ? fill(labels.ariaTop, { rate: pct(rows[idx].rate) })
    : fill(labels.aria, {
        net: labels.money(net),
        rate: pct(rows[idx].rate),
        tax: labels.money(totalTax),
      });
  return (
    `<svg class="inc-svg inc-steps" viewBox="0 0 ${VB_W} ${VB_H}" role="img" aria-label="${esc(aria)}" preserveAspectRatio="xMidYMid meet">` +
    parts.join('') +
    marker +
    `</svg>`
  );
}

/* ── 表單狀態 → TaxInput ───────────────────────────────────────────── */

export type TaxState = Record<string, number | string | boolean>;

/** 伺服端渲染用的預設表單值（與元件 HTML 的 checked／value 必須一致）。 */
export const TAX_DEFAULT_STATE: TaxState = {
  year: '115',
  married: '0',
  salary: 600000,
  spouseSalary: 0,
  general: 0,
  elderly70: 0,
  minorChildren: 0,
  preschool: 0,
  interest: 0,
  dividend: 0,
  other: 0,
  spouseInterest: 0,
  spouseDividend: 0,
  spouseOther: 0,
  selfElderly70: false,
  spouseElderly70: false,
  college: 0,
  disabled: 0,
  longTermCare: 0,
  deduction: 'standard',
  itemized: 0,
  rent: 0,
  withheld: 0,
};

function n(s: TaxState, k: string): number {
  return Math.floor(num(s[k]));
}

/** 6 歲以下子女數大於未成年子女數時夾到上限。回傳夾過的 input 與是否夾過。 */
export function toTaxInput(s: TaxState): {
  input: TaxInput;
  clampedTo: number | null;
} {
  const married = String(s.married) === '1';
  const minor = n(s, 'minorChildren');
  let pre = n(s, 'preschool');
  let clampedTo: number | null = null;
  if (pre > minor) {
    pre = minor;
    clampedTo = minor;
  }
  const input: TaxInput = {
    married,
    self: {
      salary: num(s.salary),
      interest: num(s.interest),
      dividend: num(s.dividend),
      other: num(s.other),
    },
    spouse: married
      ? {
          salary: num(s.spouseSalary),
          interest: num(s.spouseInterest),
          dividend: num(s.spouseDividend),
          other: num(s.spouseOther),
        }
      : undefined,
    dependents: {
      general: n(s, 'general'),
      elderly70: n(s, 'elderly70'),
      minorChildren: minor,
      preschool: pre,
      college: n(s, 'college'),
      disabled: n(s, 'disabled'),
      longTermCare: n(s, 'longTermCare'),
    },
    selfElderly70: !!s.selfElderly70,
    spouseElderly70: married && !!s.spouseElderly70,
    deduction:
      String(s.deduction) === 'itemized'
        ? { type: 'itemized', amount: num(s.itemized) }
        : { type: 'standard' },
    rent: num(s.rent),
    withheld: num(s.withheld),
  };
  return { input, clampedTo };
}

/* ── 結果 → 畫面字串 ───────────────────────────────────────────────── */

export interface TaxView {
  result: TaxResult;
  /** [data-out] 的文字 */
  out: Record<string, string>;
  /** [data-show] 的顯示旗標 */
  show: Record<string, boolean>;
  /** 稅額階梯圖（整個 <svg>） */
  svg: string;
}

function dividendBest(r: TaxResult): 'combined' | 'separate' | 'same' | null {
  if (r.dividendMethod === 'none') return null;
  const best = (dm: 'combined' | 'separate28') =>
    Math.min(
      ...r.methods
        .filter((m) => m.dividendMethod === dm)
        .map((m) => m.totalDue),
    );
  const a = best('combined');
  const b = best('separate28');
  return a < b ? 'combined' : b < a ? 'separate' : 'same';
}

export function viewFromResult(
  r: TaxResult,
  s: TaxState,
  P: TaxParams,
  M: Record<string, string>,
  loc: string,
  clampedTo: number | null,
): TaxView {
  const $ = (v: number) => money(v, loc);
  const married = String(s.married) === '1';
  const sp = r.specialDeductions;
  const special =
    sp.savings +
    sp.disabled +
    sp.education +
    sp.preschool +
    sp.longTermCare +
    sp.rent;
  const fy = String(P._meta.fiscalYear);

  // 最省的計稅方式（只有有配偶才有意義）：和同一股利方式下的合併計稅比
  let best = '';
  if (married) {
    const joint = r.methods.find(
      (m) => m.method === 'joint' && m.dividendMethod === r.dividendMethod,
    );
    const saving = joint ? joint.totalDue - r.totalDue : 0;
    best =
      r.method === 'joint' || saving <= 0
        ? M['best.joint']
        : fill(M['best.other'], {
            method: M[`method.${r.method as TaxMethod}`],
            saving: $(saving),
          });
  }

  // 股利：併入或分開哪個省
  let divBest = '';
  const db = dividendBest(r);
  if (db) {
    const combined = Math.min(
      ...r.methods
        .filter((m) => m.dividendMethod === 'combined')
        .map((m) => m.totalDue),
    );
    const separate = Math.min(
      ...r.methods
        .filter((m) => m.dividendMethod === 'separate28')
        .map((m) => m.totalDue),
    );
    divBest =
      db === 'same'
        ? M['divBest.same']
        : db === 'combined'
          ? fill(M['divBest.combined'], { saving: $(separate - combined) })
          : fill(M['divBest.separate'], { saving: $(combined - separate) });
  }

  const divLabel =
    r.dividendMethod === 'separate28'
      ? fill(M['divSeparate'], { rate: pct(P.dividend.separateRate) })
      : fill(M['divCredit'], {
          rate: pct(P.dividend.creditRate, 1),
          cap: $(P.dividend.creditCap),
        });
  const divValue =
    r.dividendMethod === 'separate28'
      ? $(r.dividendSeparateTax)
      : $(r.dividendCredit);

  const refund = r.balance < 0;
  const w = new Set(r.warnings);
  const sep = married && r.method !== 'joint';
  const eff = r.effectiveRate;

  const out: Record<string, string> = {
    totalDue: $(r.totalDue),
    effRate: `${(eff * 100).toFixed(1)}%`,
    topRate: pct(r.marginalRate),
    gross: $(r.grossIncome),
    salaryDed: $(sp.salary),
    exemptions: $(r.exemptions),
    generalDed: $(r.generalDeduction),
    special: $(special),
    basicLiving:
      r.basicLivingDifference === null
        ? M['notAnnounced']
        : $(r.basicLivingDifference),
    net: $(r.netIncome),
    taxPayable: $(r.taxPayable),
    divLabel,
    divValue,
    withheld: $(num(s.withheld)),
    balanceLabel: refund ? M['balance.refund'] : M['balance.due'],
    balance: $(Math.abs(r.balance)),
    yearNote: M[`yearNote.${fy}`] ?? '',
    best,
    divBest,
    clamp: clampedTo === null ? '' : fill(M['clamp'], { n: clampedTo }),
    wBasic: fill(M['w.basic'], {}),
    wRate20: M['w.rate20'],
    wDiv28: M['w.div28'],
    wAmt: fill(M['w.amt'], { threshold: $(P.amt.threshold) }),
  };

  const show: Record<string, boolean> = {
    spouse: married,
    itemized: String(s.deduction) === 'itemized',
    best: married,
    div: r.dividendMethod !== 'none',
    divBest: r.dividendMethod !== 'none',
    sepNote: sep,
    clamp: clampedTo !== null,
    wBasic: w.has('BASIC_LIVING_NOT_ANNOUNCED'),
    wRate20: w.has('LTC_RENT_EXCLUDED_RATE20'),
    wDiv28: w.has('LTC_RENT_EXCLUDED_DIVIDEND28'),
    wAmt: w.has('AMT_NOT_COMPUTED'),
  };

  const svg = bracketStepsSvg(
    r.netIncome,
    P,
    stepLabels(M, loc),
    sep ? { mode: 'top', topIndex: r.bracketIndex } : {},
  );
  return { result: r, out, show, svg };
}

/** 表單狀態 → 年度參數 → 計算 → 畫面。 */
export function runTax(
  s: TaxState,
  all: Record<string, TaxParams>,
  M: Record<string, string>,
  loc: string,
): TaxView {
  const P = all[String(s.year)] ?? all['115'] ?? Object.values(all)[0];
  const { input, clampedTo } = toTaxInput(s);
  const r = computeIncomeTax(input, P);
  return viewFromResult(r, s, P, M, loc, clampedTo);
}
