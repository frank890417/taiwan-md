/**
 * pensionView.ts — 勞保年金與勞退試算工具的「檢視層」純函式。
 *
 * 伺服端（Astro frontmatter）與瀏覽器端（元件 <script>）共用同一份：
 *   buildPensionView   狀態 → 要寫進各個 [data-out] 的字串、[data-show] 的開關、曲線圖 SVG
 *   curveSvg           各請領年齡月領金額 → SVG 字串
 *   summarizeCurve     取出「提前 5 年／法定年齡／延後 5 年」三個點，給 aria-label 用
 *
 * 計算全部呼叫 laborInsurance.ts／laborPension.ts，這裡不放任何費率、公式常數。
 * 句子由呼叫端傳入的訊息表 M 組成（zh／en 文案在 src/i18n/income/tool-pension.ts）。
 */
import {
  computeOldAgePension,
  pensionByClaimAge,
  statutoryPensionAge,
} from './laborInsurance.ts';
import type { OldAgePensionParams } from './laborInsurance.ts';
import { monthlyPensionFromBalance, projectBalance } from './laborPension.ts';
import type { PensionParams } from './laborPension.ts';

/* ── 型別 ─────────────────────────────────────────────────────────── */

export interface ToolParams {
  li: OldAgePensionParams & { insuredSalaryGrades: number[] };
  lp: PensionParams & {
    employerMinRate: number;
    selfMaxRate: number;
    minSeniorityYearsForAnnuity: number;
    /** 最近公告的最低保證收益率（小數），保守情境用 */
    guaranteedReturn: number;
  };
}

export interface PensionState {
  birthYear: number;
  claimAge: number;
  years: number;
  months: number;
  avgSalary: number;
  wage: number;
  balance: number;
  yearsLeft: number;
  paidYears: number;
  /** %，例如 6 */
  employerRate: number;
  selfRate: number;
  ret: number;
  growth: number;
  pensionAge: number;
}

export interface CurvePoint {
  age: number;
  monthly: number;
  eligible: boolean;
}

export interface CurveOpts {
  statutoryAge: number;
  /** 使用者選的請領年齡；不在曲線範圍或不可請領就不畫標記 */
  selectedAge?: number | null;
  ariaLabel: string;
  xLabel: string;
  statutoryLabel: string;
  /** 金額顯示（標籤用），預設千分位 */
  formatAmount?: (n: number) => string;
}

export interface PensionView {
  out: Record<string, string>;
  show: Record<string, boolean>;
  svg: string;
}

/* ── 小工具 ───────────────────────────────────────────────────────── */

export function fillTemplate(
  tpl: string,
  vars: Record<string, string | number>,
): string {
  let s = tpl ?? '';
  for (const [k, v] of Object.entries(vars))
    s = s.split(`{${k}}`).join(String(v));
  return s;
}

const clamp = (x: number, lo: number, hi: number) =>
  Math.min(Math.max(x, lo), hi);
const num = (x: unknown, fallback = 0) => {
  const v = Number(x);
  return Number.isFinite(v) ? v : fallback;
};
const groupInt = (n: number) => Math.round(n).toLocaleString('en-US');
const money = (n: number, loc: string) =>
  loc === 'zh-TW' ? `${groupInt(n)} 元` : `NT$${groupInt(n)}`;
/** 0.00775 → "0.775" */
const pctText = (x: number) => String(+(x * 100).toFixed(3));

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function niceMax(v: number): number {
  if (!(v > 0)) return 1;
  const p = 10 ** Math.floor(Math.log10(v));
  for (const m of [1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10]) {
    if (m * p >= v * 1.12) return m * p;
  }
  return 10 * p;
}

/* ── 曲線圖 ───────────────────────────────────────────────────────── */

const W = 360;
const H = 222;
const ML = 56;
const MR = 16;
const MT = 30;
const MB = 44;

const f1 = (n: number) => (Math.round(n * 10) / 10).toString();

/**
 * 各請領年齡的月領金額折線。不可請領的年齡不畫點。
 * 回傳完整的 <svg> 字串（viewBox 固定，寬度 100%）。
 */
export function curveSvg(points: CurvePoint[], o: CurveOpts): string {
  const fmt = o.formatAmount ?? ((n: number) => groupInt(n));
  const ok = points.filter((p) => p.eligible && Number.isFinite(p.monthly));
  const plotW = W - ML - MR;
  const plotH = H - MT - MB;
  const head = `<svg class="inc-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(o.ariaLabel)}" xmlns="http://www.w3.org/2000/svg">`;
  if (ok.length === 0) {
    return `${head}<line class="inc-axis" x1="${ML}" y1="${MT + plotH}" x2="${W - MR}" y2="${MT + plotH}"/></svg>`;
  }

  const minAge = ok[0].age;
  const maxAge = ok[ok.length - 1].age;
  const span = Math.max(maxAge - minAge, 1);
  const yMax = niceMax(Math.max(...ok.map((p) => p.monthly)));
  const X = (age: number) => ML + ((age - minAge) / span) * plotW;
  const Y = (v: number) => MT + plotH - (v / yMax) * plotH;
  const baseY = MT + plotH;

  const parts: string[] = [head];

  // 橫格線與 y 軸刻度（0、一半、頂）
  for (const v of [0, yMax / 2, yMax]) {
    const y = f1(Y(v));
    parts.push(
      `<line class="inc-axis" x1="${ML}" y1="${y}" x2="${W - MR}" y2="${y}"${v === 0 ? '' : ' stroke-dasharray="2 3"'}/>`,
    );
    parts.push(
      `<text x="${ML - 6}" y="${f1(Y(v) + 4)}" text-anchor="end">${esc(fmt(v))}</text>`,
    );
  }

  // x 軸刻度：隔一個標一個（手機寬度下才不擠）
  for (const p of ok) {
    if ((p.age - minAge) % 2 !== 0) continue;
    parts.push(
      `<text x="${f1(X(p.age))}" y="${baseY + 18}" text-anchor="middle">${p.age}</text>`,
    );
  }
  parts.push(
    `<text x="${f1(ML + plotW / 2)}" y="${H - 5}" text-anchor="middle">${esc(o.xLabel)}</text>`,
  );

  // 面積與折線
  const coords = ok.map((p) => `${f1(X(p.age))} ${f1(Y(p.monthly))}`);
  parts.push(
    `<path class="inc-area" d="M${f1(X(minAge))} ${f1(baseY)} L${coords.join(' L')} L${f1(X(maxAge))} ${f1(baseY)} Z"/>`,
  );
  parts.push(`<path class="inc-line" d="M${coords.join(' L')}"/>`);

  // 法定年齡：垂直虛線與標籤
  if (o.statutoryAge >= minAge && o.statutoryAge <= maxAge) {
    const x = X(o.statutoryAge);
    const anchor = x < ML + 40 ? 'start' : x > W - MR - 40 ? 'end' : 'middle';
    parts.push(
      `<line class="pen-stat" x1="${f1(x)}" y1="${MT - 4}" x2="${f1(x)}" y2="${baseY}" stroke-dasharray="4 3"/>`,
    );
    parts.push(
      `<text class="pen-stat-label" x="${f1(x)}" y="${MT - 10}" text-anchor="${anchor}">${esc(o.statutoryLabel)}</text>`,
    );
  }

  // 每個可請領年齡一個點
  for (const p of ok) {
    parts.push(
      `<circle class="pen-pt" cx="${f1(X(p.age))}" cy="${f1(Y(p.monthly))}" r="3"/>`,
    );
  }

  // 目前選的年齡：大點加金額
  const sel =
    o.selectedAge == null ? undefined : ok.find((p) => p.age === o.selectedAge);
  if (sel) {
    const x = X(sel.age);
    const y = Y(sel.monthly);
    const anchor = x < ML + 30 ? 'start' : x > W - MR - 30 ? 'end' : 'middle';
    parts.push(`<circle class="inc-dot" cx="${f1(x)}" cy="${f1(y)}" r="5.5"/>`);
    parts.push(
      `<text class="pen-sel-label" x="${f1(x)}" y="${f1(y - 10)}" text-anchor="${anchor}">${esc(fmt(sel.monthly))}</text>`,
    );
  }

  parts.push('</svg>');
  return parts.join('');
}

/**
 * 取「提前 n 年、法定年齡、延後 n 年」三個點（n 預設 5）。
 * 範圍外或不可請領的點回 null。
 */
export function summarizeCurve(
  points: CurvePoint[],
  statutoryAge: number,
  n = 5,
) {
  const at = (age: number) =>
    points.find((p) => p.age === age && p.eligible) ?? null;
  return {
    n,
    earlyAge: statutoryAge - n,
    lateAge: statutoryAge + n,
    early: at(statutoryAge - n),
    base: at(statutoryAge),
    late: at(statutoryAge + n),
  };
}

/* ── 整個結果區 ───────────────────────────────────────────────────── */

const MAX_CLAIM_AGE = 70;
const MIN_CLAIM_AGE = 55;

/**
 * 狀態 → 結果區所有文字、顯示開關與圖。
 * M：訊息表（鍵為 income.pension.msg. 後面那一段，例如 "adj.late"）。
 * loc：'zh-TW' 或 'en'，只決定金額格式。
 */
export function buildPensionView(
  s: PensionState,
  P: ToolParams,
  M: Record<string, string>,
  loc: string,
): PensionView {
  const m = (k: string, vars: Record<string, string | number> = {}) =>
    fillTemplate(M[k] ?? k, vars);
  const out: Record<string, string> = {};
  const show: Record<string, boolean> = {};
  const gradeMax =
    P.li.insuredSalaryGrades[P.li.insuredSalaryGrades.length - 1];

  /* 勞保老年年金 */
  const birth = Math.round(num(s.birthYear));
  const claimAge = clamp(
    Math.round(num(s.claimAge)),
    MIN_CLAIM_AGE,
    MAX_CLAIM_AGE,
  );
  const totalMonths = Math.max(
    0,
    Math.round(num(s.years)) * 12 + Math.round(num(s.months)),
  );
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const avg = clamp(num(s.avgSalary), 0, gradeMax);
  const statutory = statutoryPensionAge(birth, P.li.claimAgeByBirthYear);
  const earliest = statutory - P.li.pension.maxEarlyYears;

  let lbMonthly = 0;
  let lbEligible = false;
  let curve: CurvePoint[] = [];

  out.lbStatAge = m('age', { n: statutory });
  if (avg <= 0 || totalMonths === 0) {
    out.lbReason = m('reason.NO_SALARY');
    out.lbMonthly = money(0, loc);
    out.lbFormula = '—';
    out.lbAdj = '—';
    out.lbSeniority = '—';
  } else {
    const base = { avgInsuredSalary: avg, years, months, birthYearROC: birth };
    const r = computeOldAgePension({ ...base, claimAge }, P.li);
    out.lbSeniority = m('years', { n: r.seniorityYears });
    out.lbFormula = m(`formula.${r.chosen}`);
    const diff = Math.trunc(claimAge - r.statutoryAge);
    const pct = Math.round(Math.abs(r.adjustmentRate) * 100);
    out.lbAdj = `${m('age', { n: claimAge })}，${
      diff === 0
        ? m('adj.0')
        : diff > 0
          ? m('adj.late', { n: diff, pct })
          : m('adj.early', { n: -diff, pct })
    }`;
    lbEligible = r.eligible;
    lbMonthly = r.eligible ? r.monthly : 0;
    out.lbMonthly = money(lbMonthly, loc);
    if (!r.eligible) {
      out.lbReason = m(`reason.${r.reason}`, {
        years: r.seniorityYears,
        min: P.li.pension.minSeniorityYears,
        months: r.lumpSumMonths ?? 0,
        birth,
        stat: r.statutoryAge,
        max: P.li.pension.maxEarlyYears,
        earliest,
        age: claimAge,
      });
    }
    if (r.reason !== 'SENIORITY_UNDER_MIN') {
      curve = pensionByClaimAge(base, P.li, earliest, MAX_CLAIM_AGE);
    }
  }
  show.lbOk = lbEligible;
  show.lbNo = !lbEligible;

  /* 勞退新制 */
  const yearsLeft = Math.max(0, Math.round(num(s.yearsLeft)));
  const paidYears = Math.max(0, num(s.paidYears));
  const pensionAge = Math.max(
    P.lp.lifeExpectancy[0].age,
    Math.round(num(s.pensionAge, 65)),
  );
  const employer =
    Math.max(P.lp.employerMinRate * 100, num(s.employerRate)) / 100;
  const self = clamp(num(s.selfRate), 0, P.lp.selfMaxRate * 100) / 100;
  const proj = projectBalance(
    {
      monthlyWage: Math.max(0, num(s.wage)),
      currentBalance: Math.max(0, num(s.balance)),
      yearsToRetire: yearsLeft,
      employerRate: employer,
      selfRate: self,
      annualReturn: num(s.ret) / 100,
      wageGrowth: num(s.growth) / 100,
    },
    P.lp,
  );
  const finalBalance = proj.finalBalance;
  const contribYears = paidYears + yearsLeft;
  const lpEligible = contribYears >= P.lp.minSeniorityYearsForAnnuity;
  let lpMonthly = 0;
  out.lpBalance = money(finalBalance, loc);
  if (lpEligible) {
    const r = monthlyPensionFromBalance(finalBalance, pensionAge, P.lp);
    lpMonthly = r.monthly;
    out.lpLife = m('years', { n: r.lifeExpectancy });
    out.lpAge = m('age', { n: pensionAge });
    out.lpMonthly = money(lpMonthly, loc);
    const low = projectBalance(
      {
        monthlyWage: Math.max(0, num(s.wage)),
        currentBalance: Math.max(0, num(s.balance)),
        yearsToRetire: yearsLeft,
        employerRate: employer,
        selfRate: self,
        annualReturn: P.lp.guaranteedReturn,
        wageGrowth: num(s.growth) / 100,
      },
      P.lp,
    );
    out.lpMonthlyLow = money(
      monthlyPensionFromBalance(low.finalBalance, pensionAge, P.lp).monthly,
      loc,
    );
  } else {
    out.lpLife = '—';
    out.lpAge = m('age', { n: pensionAge });
    out.lpMonthly = money(0, loc);
    out.lpReason = m('lpNo', {
      n: +contribYears.toFixed(2),
      min: P.lp.minSeniorityYearsForAnnuity,
      balance: money(finalBalance, loc),
    });
  }
  show.lpOk = lpEligible;
  show.lpNo = !lpEligible;

  /* 合計 */
  const total = lbMonthly + lpMonthly;
  out.total = money(total, loc);
  const wage = num(s.wage);
  out.ratio =
    wage > 0
      ? m('ratio', { pct: `${((total / wage) * 100).toFixed(1)}%` }) +
        m('nominal')
      : m('ratioNone') + m('nominal');

  /* 圖 */
  const hasCurve = curve.some((p) => p.eligible);
  show.chart = hasCurve;
  const sum = summarizeCurve(curve, statutory, P.li.pension.maxEarlyYears);
  const selPoint = curve.find((p) => p.age === claimAge && p.eligible) ?? null;
  let aria = '';
  if (hasCurve) {
    const amt = (p: CurvePoint | null) => (p ? money(p.monthly, loc) : '—');
    aria =
      m('chart.aria', {
        from: curve[0].age,
        to: curve[curve.length - 1].age,
        n: sum.n,
        earlyAge: sum.earlyAge,
        lateAge: sum.lateAge,
        stat: statutory,
        early: amt(sum.early),
        base: amt(sum.base),
        late: amt(sum.late),
      }) +
      (selPoint
        ? m('chart.ariaSel', {
            sel: claimAge,
            amount: money(selPoint.monthly, loc),
          })
        : '');
  }
  out.chartAria = aria;
  const svg = curveSvg(curve, {
    statutoryAge: statutory,
    selectedAge: selPoint ? claimAge : null,
    ariaLabel: aria,
    xLabel: m('chart.x'),
    statutoryLabel: m('chart.statutory', { age: statutory }),
  });

  return { out, show, svg };
}

/** 公式說明用的係數文字（0.00775 → "0.775"），元件和測試共用。 */
export function formulaTexts(P: ToolParams) {
  return {
    coefA: pctText(P.li.pension.formulaA.coefficient),
    constA: groupInt(P.li.pension.formulaA.constant),
    coefB: pctText(P.li.pension.formulaB.coefficient),
  };
}
