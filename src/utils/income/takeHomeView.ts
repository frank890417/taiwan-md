/**
 * takeHomeView.ts — 實領薪資工具的「輸入 → 結果 → 兩條堆疊條」純函式。
 *
 * 伺服端（TakeHomePayCalculator.astro 的 frontmatter）與瀏覽器端（元件 script）共用這一份，
 * 所以預設結果與輸入後的結果用同一套邏輯。這裡沒有任何費率或稅率常數，全部從參數來。
 * 只用可被 --experimental-strip-types 剝除的語法。
 */
import { computeTakeHome } from './takeHome.ts';
import type { TakeHomeParams, TakeHomeResult } from './takeHome.ts';
import { computeIncomeTax } from './tax.ts';
import type { TaxParams } from './tax.ts';

export interface TakeHomeViewParams {
  labor: TakeHomeParams;
  tax: TaxParams;
}

export interface TakeHomeState {
  /** 月薪（元） */
  wage: number;
  /** 年終與獎金月數 */
  bonus: number;
  /** 勞退自提率，0 到 0.06（小數，不是百分比） */
  selfRate: number;
  /** 每月健保自付額；null ＝ 沒填 */
  nhi: number | null;
  /** 是否估算所得稅 */
  withTax: boolean;
  /** 一般受扶養人數（單身申報戶） */
  dependents: number;
  /** 職災費率（小數）；null ＝ 用參數裡的行業平均 */
  occRate: number | null;
}

export interface BarSeg {
  key: string;
  /** 0 到 100，占整條的百分比 */
  pct: number;
  /** .inc-c0 到 .inc-c5 的 class 名 */
  cls: string;
}

export interface TakeHomeView {
  result: TakeHomeResult;
  /** 全年所得稅估算；沒估算時為 null */
  annualTax: number | null;
  /** 實領占月薪的比例（0 到 1） */
  takePct: number;
  /** 雇主另外多付占月薪的比例（0 到 1） */
  employerExtraPct: number;
  workerBar: BarSeg[];
  employerBar: BarSeg[];
}

function num(x: unknown, min = 0, max = Infinity): number {
  const v = Number(x);
  if (!Number.isFinite(v)) return min;
  return Math.min(Math.max(v, min), max);
}

function round2(x: number): number {
  return Math.round(x * 100) / 100;
}

function segs(parts: { key: string; value: number; cls: string }[]): BarSeg[] {
  const positive = parts.map((p) => ({ ...p, value: Math.max(p.value, 0) }));
  const total = positive.reduce((a, p) => a + p.value, 0);
  return positive.map((p) => ({
    key: p.key,
    pct: total > 0 ? round2((p.value / total) * 100) : 0,
    cls: p.cls,
  }));
}

/** 「你的月薪去哪裡」：實領、勞保與就保、勞退自提、健保、所得稅 */
export function workerBarSegs(r: TakeHomeResult): BarSeg[] {
  const w = r.worker;
  return segs([
    { key: 'w-take', value: w.takeHomeMonthly, cls: 'inc-c2' },
    {
      key: 'w-ins',
      value: w.laborInsurance + w.employmentInsurance,
      cls: 'inc-c0',
    },
    { key: 'w-pen', value: w.pensionSelf, cls: 'inc-c4' },
    { key: 'w-nhi', value: w.nhi ?? 0, cls: 'inc-c3' },
    { key: 'w-tax', value: w.incomeTaxMonthly ?? 0, cls: 'inc-c1' },
  ]);
}

/** 「雇主為你付出的總成本」：月薪、雇主勞保與就保、職災、勞退 6% */
export function employerBarSegs(r: TakeHomeResult, wage: number): BarSeg[] {
  const e = r.employer;
  return segs([
    { key: 'e-wage', value: wage, cls: 'inc-c5' },
    {
      key: 'e-ins',
      value: e.laborInsurance + e.employmentInsurance,
      cls: 'inc-c0',
    },
    { key: 'e-occ', value: e.occupationalAccident, cls: 'inc-c1' },
    { key: 'e-pen', value: e.pension, cls: 'inc-c4' },
  ]);
}

/** 把一條的區段轉成 key → 百分比的對照，給圖例與替代文字用 */
export function pctByKey(list: BarSeg[]): Record<string, number> {
  const out: Record<string, number> = {};
  for (const s of list) out[s.key] = s.pct;
  return out;
}

const NO_TAX_INPUT_DEPENDENTS = {
  elderly70: 0,
  minorChildren: 0,
  preschool: 0,
  college: 0,
  disabled: 0,
  longTermCare: 0,
};

/**
 * 輸入 → 結果。所得稅估算：全年薪資收入（月薪 ×（12 ＋ 獎金月數））先扣掉全年勞退自提，
 * 單身、標準扣除額、一般扶養人數照輸入，用參數裡的年度稅制呼叫 computeIncomeTax。
 * 稅制參數裡基本生活費未公告的 warning 不處理。
 */
export function buildTakeHomeView(
  s: TakeHomeState,
  P: TakeHomeViewParams,
): TakeHomeView {
  const wage = num(s.wage);
  const bonus = num(s.bonus);
  const selfRate = num(s.selfRate, 0, P.labor.laborPension.selfMaxRate);
  const nhi = s.nhi === null ? null : num(s.nhi);
  const occupationalRate =
    s.occRate === null ? undefined : num(s.occRate, 0, 1);
  const base = {
    monthlyWage: wage,
    bonusMonths: bonus,
    selfContributionRate: selfRate,
    nhiPremium: nhi,
    occupationalRate,
  };

  let annualTax: number | null = null;
  if (s.withTax) {
    // 第一輪不含所得稅，只為了拿到每月勞退自提金額
    const first = computeTakeHome({ ...base, annualIncomeTax: null }, P.labor);
    const salary = Math.max(
      wage * (12 + bonus) - first.worker.pensionSelf * 12,
      0,
    );
    const zero = { salary: 0, interest: 0, dividend: 0, other: 0 };
    const tax = computeIncomeTax(
      {
        married: false,
        self: { ...zero, salary },
        dependents: {
          ...NO_TAX_INPUT_DEPENDENTS,
          general: Math.floor(num(s.dependents, 0, 30)),
        },
        deduction: { type: 'standard' },
        rent: 0,
      },
      P.tax,
    );
    annualTax = Math.max(tax.totalDue, 0);
  }

  const result = computeTakeHome(
    { ...base, annualIncomeTax: annualTax },
    P.labor,
  );
  return {
    result,
    annualTax,
    takePct: wage > 0 ? result.worker.takeHomeMonthly / wage : 0,
    employerExtraPct: wage > 0 ? result.employer.totalMonthly / wage : 0,
    workerBar: workerBarSegs(result),
    employerBar: employerBarSegs(result, wage),
  };
}

export interface TakeHomeFormat {
  money: (n: number) => string;
  /** 傳入 0 到 1 的比例，回傳顯示字串 */
  pct: (x: number) => string;
  unsetNhi: string;
  unsetTax: string;
}

/** 把 {pct} 這類占位換成實際字串 */
export function fillTpl(tpl: string, vars: Record<string, string>): string {
  let out = tpl;
  for (const [k, v] of Object.entries(vars)) out = out.split(`{${k}}`).join(v);
  return out;
}

/** 所有 [data-out] 要顯示的文字（伺服端第一次渲染與瀏覽器端重算都用這份） */
export function takeHomeOuts(
  v: TakeHomeView,
  f: TakeHomeFormat,
): Record<string, string> {
  const r = v.result;
  const w = r.worker;
  const e = r.employer;
  const out: Record<string, string> = {
    take: f.money(w.takeHomeMonthly),
    takePct: f.pct(v.takePct),
    extraPct: f.pct(v.employerExtraPct),
    lab: f.money(w.laborInsurance),
    emp: f.money(w.employmentInsurance),
    pen: f.money(w.pensionSelf),
    nhi: w.nhi === null ? f.unsetNhi : f.money(w.nhi),
    tax: w.incomeTaxMonthly === null ? f.unsetTax : f.money(w.incomeTaxMonthly),
    ded: f.money(w.totalDeductions),
    eLab: f.money(e.laborInsurance),
    eEmp: f.money(e.employmentInsurance),
    eOcc: f.money(e.occupationalAccident),
    ePen: f.money(e.pension),
    eTotal: f.money(e.totalMonthly),
    eCost: f.money(e.totalCostMonthly),
    gross: f.money(r.annual.gross),
    annualTake: f.money(r.annual.takeHome),
    insured: f.money(r.insuredSalary),
    contrib: f.money(r.contributionWage),
  };
  for (const s of v.workerBar) out[`pct-${s.key}`] = f.pct(s.pct / 100);
  for (const s of v.employerBar) out[`pct-${s.key}`] = f.pct(s.pct / 100);
  return out;
}

/** 兩條圖的替代文字占位值 */
export function ariaVars(
  v: TakeHomeView,
  f: TakeHomeFormat,
): { bar1: Record<string, string>; bar2: Record<string, string> } {
  const a = pctByKey(v.workerBar);
  const b = pctByKey(v.employerBar);
  const p = (x: number) => f.pct(x / 100);
  return {
    bar1: {
      take: p(a['w-take']),
      ins: p(a['w-ins']),
      pen: p(a['w-pen']),
      nhi: p(a['w-nhi']),
      tax: p(a['w-tax']),
    },
    bar2: {
      wage: p(b['e-wage']),
      ins: p(b['e-ins']),
      occ: p(b['e-occ']),
      pen: p(b['e-pen']),
    },
  };
}
