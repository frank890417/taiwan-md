/**
 * qingan.ts — 青安貸款的階梯利率與資格比對（純函式，無 DOM）
 *
 * 條件與利率全部讀 src/data/housing/qingan.json（呼叫端傳入 cfg），這裡不寫死任何數字。
 * 需能被 `node --experimental-strip-types` 直接載入：不用 enum、不用 parameter properties。
 *
 * 這裡做的是「條文比對」，不是核貸結論。承貸銀行仍有審核裁量
 * （clauses 的 discretion 條文原文：並非每案均得以最高額度、8 成、5 年寬限期、40 年期核貸）。
 */
import type { MortgageInput, RateStage } from './mortgage.ts';
import { computeMortgage } from './mortgage.ts';

export interface SubsidyStep {
  years: number | null;
  subsidyPct: number;
  netRatePct: number;
}

export interface QinganClause {
  id: string;
  quote: string;
  source: string;
}

/** qingan.json 中本模組會讀到的欄位（其餘欄位不在此宣告）。 */
export interface QinganConfig {
  asOf: string;
  rate: { baseRatePct: number; subsidySteps: SubsidyStep[] };
  current: {
    limits: { general: number; newlywed: number; withMinorChild: number };
    maxYears: number;
    maxGraceMonths: number;
    maxLtv: number;
    maxAgeAtApplication: number;
    ageAtApplicationExclusive: boolean;
    agePlusTermMax: number;
    maxBorrowerAnnualIncome: number;
    priceCaps: Record<string, number>;
    purchasedWithinMonths: number;
    minShareExemptSqm: number;
    onceOnlySince: string;
    newlywedWithinYears: number;
  };
  clauses: QinganClause[];
}

/**
 * 由補貼階梯產生 mortgage.ts 的分段利率。
 * startOffsetMonths：青安 2.0 既有貸戶已撥貸的月數，從路徑中段接著算。
 * 最後一段（years＝null）months 填 0，由 computeMortgage 自動延伸到期滿。
 */
export function qinganRateStages(
  cfg: QinganConfig,
  opts: { startOffsetMonths?: number } = {},
): RateStage[] {
  let offset = Math.max(0, Math.round(opts.startOffsetMonths ?? 0));
  const out: RateStage[] = [];
  for (const step of cfg.rate.subsidySteps) {
    if (step.years === null) {
      out.push({ months: 0, annualRatePct: step.netRatePct });
      continue;
    }
    const months = step.years * 12;
    if (offset >= months) {
      offset -= months;
      continue;
    }
    out.push({ months: months - offset, annualRatePct: step.netRatePct });
    offset = 0;
  }
  return out;
}

export interface ExistingLoan {
  /** 原始貸款本金（元） */
  principal: number;
  years: number;
  graceMonths: number;
  /** 已撥貸月數（已繳的期數） */
  elapsedMonths: number;
}

/**
 * 青安 2.0 既有貸戶：先依原條件模擬到「已撥貸月數」，取當時餘額，
 * 再以餘額、剩餘期數、剩餘寬限期與接續的階梯利率組成「從現在起」的試算輸入。
 * 已撥貸期間不含提前還款（使用者若已提前還款，請直接改填目前餘額）。
 */
export function remainingLoanInput(
  cfg: QinganConfig,
  loan: ExistingLoan,
): MortgageInput {
  const total = Math.round(loan.years * 12);
  const elapsed = Math.round(loan.elapsedMonths);
  if (!(elapsed >= 0) || elapsed >= total) {
    throw new RangeError('elapsedMonths must be within the loan term');
  }
  let balance = loan.principal;
  if (elapsed > 0) {
    const full = computeMortgage({
      principal: loan.principal,
      years: loan.years,
      graceMonths: loan.graceMonths,
      stages: qinganRateStages(cfg),
    });
    balance = full.schedule[elapsed - 1].balance;
  }
  return {
    principal: balance,
    years: (total - elapsed) / 12,
    graceMonths: Math.max(0, loan.graceMonths - elapsed),
    stages: qinganRateStages(cfg, { startOffsetMonths: elapsed }),
  };
}

export type EligibilityStatus = 'pass' | 'fail' | 'bankReview' | 'unknown';
export type HomeStatus = 'none' | 'share' | 'parkingOrNiche' | 'has';
export type LimitClass = 'general' | 'newlywed' | 'withMinorChild';

/** 全部欄位可省略；省略者該條回傳 unknown。金額單位為元。 */
export interface EligibilityAnswers {
  age?: number;
  termYears?: number;
  annualIncome?: number;
  county?: string;
  price?: number;
  /** 2023-08-01 後是否已核貸過青安或農安 */
  usedBefore?: boolean;
  home?: HomeStatus;
  /** home 為 share 時，持分換算面積合計（平方公尺） */
  shareSqm?: number;
  /** 是否為申請日前 6 個月內因買賣取得所有權的成屋 */
  purchasedWithin6m?: boolean;
  newlywed?: boolean;
  hasMinorChild?: boolean;
}

export interface EligibilityCheck {
  id:
    | 'age'
    | 'agePlusTerm'
    | 'term'
    | 'income'
    | 'priceCap'
    | 'onceOnly'
    | 'noHome'
    | 'purchased6m';
  status: EligibilityStatus;
  /** 對應 qingan.json clauses 的條文 id；沒有逐字條文的條件為 null */
  clauseId: string | null;
  /** clauseId 為 null 時，改指向 qingan.json generations[v3] 的欄位（方案條件摘要） */
  genKey: 'age' | 'incomeCap' | 'priceCap' | 'years' | 'target' | null;
  /** 供顯示的數字（皆來自 cfg 或使用者輸入） */
  detail: Record<string, number | string>;
}

export interface EligibilityResult {
  checks: EligibilityCheck[];
  limitClass: LimitClass;
  /** 額度別上限（尚未受房價 8 成限制） */
  classLimit: number;
  /** 額度別上限與房價 × 成數取小；房價未填時為 null */
  maxLimit: number | null;
  capByLtv: boolean;
  priceCap: number | null;
  anyFail: boolean;
  anyReview: boolean;
  anyUnknown: boolean;
}

const known = (v: unknown): boolean =>
  v !== undefined && v !== null && !(typeof v === 'number' && Number.isNaN(v));

export function checkQinganEligibility(
  cfg: QinganConfig,
  a: EligibilityAnswers,
): EligibilityResult {
  const c = cfg.current;
  const checks: EligibilityCheck[] = [];

  // 年齡：申貸時未滿 50 歲
  {
    let status: EligibilityStatus = 'unknown';
    if (known(a.age)) {
      const ok = c.ageAtApplicationExclusive
        ? (a.age as number) < c.maxAgeAtApplication
        : (a.age as number) <= c.maxAgeAtApplication;
      status = ok ? 'pass' : 'fail';
    }
    checks.push({
      id: 'age',
      status,
      clauseId: 'age',
      genKey: null,
      detail: { max: c.maxAgeAtApplication },
    });
  }

  // 年齡加年限不逾 80
  {
    let status: EligibilityStatus = 'unknown';
    if (known(a.age) && known(a.termYears)) {
      status =
        (a.age as number) + (a.termYears as number) <= c.agePlusTermMax
          ? 'pass'
          : 'fail';
    }
    checks.push({
      id: 'agePlusTerm',
      status,
      clauseId: null,
      genKey: 'age',
      detail: {
        max: c.agePlusTermMax,
        sum:
          known(a.age) && known(a.termYears)
            ? (a.age as number) + (a.termYears as number)
            : '',
      },
    });
  }

  // 年限不逾上限
  {
    let status: EligibilityStatus = 'unknown';
    if (known(a.termYears)) {
      status = (a.termYears as number) <= c.maxYears ? 'pass' : 'fail';
    }
    checks.push({
      id: 'term',
      status,
      clauseId: null,
      genKey: 'years',
      detail: { max: c.maxYears },
    });
  }

  // 本人年所得
  {
    let status: EligibilityStatus = 'unknown';
    if (known(a.annualIncome)) {
      status =
        (a.annualIncome as number) <= c.maxBorrowerAnnualIncome
          ? 'pass'
          : 'fail';
    }
    checks.push({
      id: 'income',
      status,
      clauseId: null,
      genKey: 'incomeCap',
      detail: { max: c.maxBorrowerAnnualIncome },
    });
  }

  // 房價上限（依縣市）
  const priceCap = known(a.county)
    ? (c.priceCaps[a.county as string] ?? c.priceCaps.default)
    : null;
  {
    let status: EligibilityStatus = 'unknown';
    if (priceCap !== null && known(a.price)) {
      status = (a.price as number) <= priceCap ? 'pass' : 'fail';
    }
    checks.push({
      id: 'priceCap',
      status,
      clauseId: null,
      genKey: 'priceCap',
      detail: { cap: priceCap ?? '' },
    });
  }

  // 限貸一次
  {
    let status: EligibilityStatus = 'unknown';
    if (known(a.usedBefore)) status = a.usedBefore ? 'fail' : 'pass';
    checks.push({
      id: 'onceOnly',
      status,
      clauseId: 'onceOnly',
      genKey: null,
      detail: {},
    });
  }

  // 無自有住宅：持分未滿 40 平方公尺、車位、塔位須經銀行查核審認
  {
    let status: EligibilityStatus = 'unknown';
    let clauseId = 'noHome';
    if (a.home === 'none') status = 'pass';
    else if (a.home === 'has') status = 'fail';
    else if (a.home === 'parkingOrNiche') status = 'bankReview';
    else if (a.home === 'share') {
      clauseId = 'share';
      if (!known(a.shareSqm)) status = 'unknown';
      else
        status =
          (a.shareSqm as number) < c.minShareExemptSqm ? 'bankReview' : 'fail';
    }
    checks.push({
      id: 'noHome',
      status,
      clauseId,
      genKey: null,
      detail: { sqm: c.minShareExemptSqm },
    });
  }

  // 申請日前 N 個月內因買賣取得所有權的成屋
  {
    let status: EligibilityStatus = 'unknown';
    if (known(a.purchasedWithin6m))
      status = a.purchasedWithin6m ? 'pass' : 'fail';
    checks.push({
      id: 'purchased6m',
      status,
      clauseId: null,
      genKey: 'target',
      detail: { months: c.purchasedWithinMonths },
    });
  }

  // 額度別：取適用者最高；再受房價 × 成數限制
  const limitClass: LimitClass = a.hasMinorChild
    ? 'withMinorChild'
    : a.newlywed
      ? 'newlywed'
      : 'general';
  const classLimit = c.limits[limitClass];
  let maxLimit: number | null = null;
  let capByLtv = false;
  if (known(a.price)) {
    const ltvCap = (a.price as number) * c.maxLtv;
    capByLtv = ltvCap < classLimit;
    maxLimit = Math.min(classLimit, ltvCap);
  }

  const statuses = checks.map((x) => x.status);
  return {
    checks,
    limitClass,
    classLimit,
    maxLimit,
    capByLtv,
    priceCap,
    anyFail: statuses.includes('fail'),
    anyReview: statuses.includes('bankReview'),
    anyUnknown: statuses.includes('unknown'),
  };
}
