/**
 * tax.ts — 綜合所得稅試算（純函式，不 import JSON、不碰 DOM）
 *
 * 參數（TaxParams）由呼叫端從 src/data/income/tax-{114,115}.json 傳入。
 * 規則來源：所得稅法第 15、17 條、納稅者權利保護法施行細則第 3 條；
 * 算式結構照稅務入口網與國稅局官方算例（見 reports/research/2026-11/income-topic-01-income-tax.md §C、§D）。
 *
 * 不處理：執行業務所得、財產交易、退職所得、海外所得、基本稅額本身的計算、
 * 分居或年度中結婚的分開申報。
 * 只用可被 --experimental-strip-types 剝除的語法（無 enum / namespace / 參數屬性）。
 */

export interface Sourced {
  source: string | null;
  announced: string | null;
}

export interface TaxParams {
  _meta: {
    fiscalYear: number;
    filingPeriod: string;
    asOf: string;
    notes: string[];
  };
  exemption: Sourced & {
    general: number;
    elderly70: number;
    /** 未成年受扶養子女的免稅額（115 年度起 = 一般 × 1.5）；114 年度為 null，一律用一般免稅額 */
    minorChild: number | null;
  };
  standardDeduction: Sourced & { single: number; married: number };
  salaryDeduction: Sourced & { cap: number };
  disabledDeduction: Sourced & { amount: number };
  savingsDeduction: Sourced & { cap: number };
  educationDeduction: Sourced & { perStudent: number };
  preschoolDeduction: Sourced & { first: number; second: number };
  longTermCareDeduction: Sourced & { perPerson: number };
  rentDeduction: Sourced & { cap: number };
  brackets: Sourced & {
    rows: { upTo: number | null; rate: number; differential: number }[];
  };
  /** perPerson 為 null = 財政部尚未公告 */
  basicLiving: Sourced & { perPerson: number | null };
  dividend: Sourced & {
    creditRate: number;
    creditCap: number;
    separateRate: number;
  };
  amt: Sourced & { threshold: number };
  /** 長照與房租排富：減除後適用稅率達此值以上即不得扣 */
  exclusion: Sourced & { rate: number };
}

export interface PartyIncome {
  /** 薪資收入（未扣薪資所得特別扣除額） */
  salary: number;
  interest: number;
  /** 股利（營利所得） */
  dividend: number;
  other: number;
}

export interface TaxInput {
  married: boolean;
  self: PartyIncome;
  spouse?: PartyIncome;
  dependents: {
    /** 其餘一般受扶養親屬（不含未成年子女、不含 70 歲以上直系尊親屬） */
    general: number;
    /** 70 歲以上受扶養直系尊親屬人數（本人與配偶另用 selfElderly70 / spouseElderly70） */
    elderly70: number;
    /** 未成年受扶養子女總數（115 年度免稅額加 50%）；114 年度仍用一般免稅額 */
    minorChildren: number;
    /** 6 歲以下子女數（必 ≤ minorChildren；超過會被截斷並出 warning）。第 1 名 15 萬、第 2 名起 22.5 萬 */
    preschool: number;
    /** 就讀大專以上院校的子女數，每人 25,000 元。只影響教育學費特別扣除額，不另增加人頭（其人頭應已算在 general） */
    college: number;
    /** 全戶（含本人配偶）符合身心障礙特別扣除額的人數 */
    disabled: number;
    /** 全戶（含本人配偶）符合長期照顧特別扣除額的人數 */
    longTermCare: number;
  };
  selfElderly70?: boolean;
  spouseElderly70?: boolean;
  deduction: { type: 'standard' } | { type: 'itemized'; amount: number };
  /** 全年房屋租金支出（工具不判斷是否有自有房屋） */
  rent: number;
  /** 已扣繳稅額，選填 */
  withheld?: number;
  /**
   * 受扶養親屬（非本人與配偶）的利息所得合計，選填，預設 0。
   * 工具沒有受扶養親屬所得欄；官方算例的受扶養親屬有利息，用這欄重現：
   * 併入綜合所得總額、併入儲蓄投資特別扣除額的計算（各類所得分開時先扣他方與受扶養親屬）。
   */
  dependentsInterest?: number;
}

export type TaxMethod =
  | 'joint'
  | 'selfSalarySeparate'
  | 'spouseSalarySeparate'
  | 'selfAllSeparate'
  | 'spouseAllSeparate';

export type DividendMethod = 'combined' | 'separate28' | 'none';

export interface MethodOutcome {
  method: TaxMethod;
  dividendMethod: DividendMethod;
  /** 應納稅額（合併計稅為扣抵股利前；28% 分開計稅不含股利稅） */
  taxPayable: number;
  /** combined：taxPayable − 股利抵減；separate28：taxPayable + 28% 股利稅；none：= taxPayable。可為負（退稅） */
  totalDue: number;
}

export interface TaxResult {
  /** 綜合所得總額（選 28% 分開計稅時不含股利） */
  grossIncome: number;
  exemptions: number;
  /** 標準或列舉扣除額 */
  generalDeduction: number;
  specialDeductions: {
    salary: number;
    savings: number;
    disabled: number;
    education: number;
    preschool: number;
    longTermCare: number;
    rent: number;
  };
  /** 該年度基本生活費未公告時為 null（視為 0） */
  basicLivingDifference: number | null;
  /** 各計稅部分的淨額加總（分開計稅時 = 分開部分 + 其餘部分，各自下限 0） */
  netIncome: number;
  /** 各部分中最高的級距 index（0 起算） */
  bracketIndex: number;
  marginalRate: number;
  taxPayable: number;
  method: TaxMethod;
  dividendMethod: DividendMethod;
  dividendCredit: number;
  dividendSeparateTax: number;
  methods: MethodOutcome[];
  /** 應納稅額 − 股利抵減 + 28% 股利稅，尚未減扣繳 */
  totalDue: number;
  /** totalDue − withheld；負數為退稅 */
  balance: number;
  /** totalDue ÷ 綜合所得總額（含股利）；總額 0 時為 0 */
  effectiveRate: number;
  /** 機器可讀代碼 */
  warnings: string[];
}

export interface TaxOptions {
  /** 預設 true；false = 未成年子女免稅額不加成（用於對 2025-11-27 財政部門檻） */
  minorBonus?: boolean;
}

// ---------------------------------------------------------------------------
// 基本函式
// ---------------------------------------------------------------------------

function yuan(x: number | undefined): number {
  const v = Math.round(Number(x) || 0);
  return v > 0 ? v : 0;
}

function rateToPct(rate: number): number {
  return Math.round(rate * 100);
}

/** 以萬分位整數運算，避免 1,600,000 × 0.085 之類的浮點誤差；無條件捨去到元 */
function floorRate(amount: number, rate: number): number {
  return Math.floor((amount * Math.round(rate * 10000)) / 10000);
}

export function bracketIndexOf(net: number, params: TaxParams): number {
  const rows = params.brackets.rows;
  for (let i = 0; i < rows.length; i++) {
    const up = rows[i].upTo;
    if (up === null || net <= up) return i;
  }
  return rows.length - 1;
}

/** 淨額 × 稅率 − 累進差額，算到元、不足元無條件捨去；淨額 ≤ 0 為 0 */
export function bracketTax(net: number, params: TaxParams): number {
  if (!(net > 0)) return 0;
  const row = params.brackets.rows[bracketIndexOf(net, params)];
  const pct = rateToPct(row.rate);
  return Math.max(0, Math.floor((net * pct - row.differential * 100) / 100));
}

// ---------------------------------------------------------------------------
// 前處理
// ---------------------------------------------------------------------------

interface Prep {
  married: boolean;
  self: PartyIncome;
  spouse: PartyIncome;
  selfSalaryDed: number;
  spouseSalaryDed: number;
  selfSalaryInc: number;
  spouseSalaryInc: number;
  depInterest: number;
  exSelf: number;
  exSpouse: number;
  exemptionsAll: number;
  persons: number;
  general: number;
  disabled: number;
  education: number;
  preschool: number;
  ltc: number;
  rent: number;
  totalInterest: number;
  warnings: string[];
}

const ZERO: PartyIncome = { salary: 0, interest: 0, dividend: 0, other: 0 };

function cleanParty(p: PartyIncome | undefined): PartyIncome {
  const s = p || ZERO;
  return {
    salary: yuan(s.salary),
    interest: yuan(s.interest),
    dividend: yuan(s.dividend),
    other: yuan(s.other),
  };
}

function prepare(input: TaxInput, params: TaxParams, opts: TaxOptions): Prep {
  const warnings: string[] = [];
  const married = !!input.married;
  const self = cleanParty(input.self);
  const spouse = married ? cleanParty(input.spouse) : cleanParty(undefined);
  const d = input.dependents;
  const general = Math.floor(yuan(d.general));
  const elderly = Math.floor(yuan(d.elderly70));
  const minor = Math.floor(yuan(d.minorChildren));
  let preschool = Math.floor(yuan(d.preschool));
  if (preschool > minor) {
    preschool = minor;
    warnings.push('PRESCHOOL_EXCEEDS_MINOR');
  }
  const college = Math.floor(yuan(d.college));
  const disabled = Math.floor(yuan(d.disabled));
  const ltcCount = Math.floor(yuan(d.longTermCare));

  const ex = params.exemption;
  const minorAmt =
    opts.minorBonus === false || ex.minorChild === null
      ? ex.general
      : ex.minorChild;
  const exSelf = input.selfElderly70 ? ex.elderly70 : ex.general;
  const exSpouse = married
    ? input.spouseElderly70
      ? ex.elderly70
      : ex.general
    : 0;
  const exemptionsAll =
    exSelf +
    exSpouse +
    general * ex.general +
    elderly * ex.elderly70 +
    minor * minorAmt;
  const persons = 1 + (married ? 1 : 0) + general + elderly + minor;

  const cap = params.salaryDeduction.cap;
  const selfSalaryDed = Math.min(self.salary, cap);
  const spouseSalaryDed = Math.min(spouse.salary, cap);

  const std = params.standardDeduction;
  const generalDed =
    input.deduction.type === 'itemized'
      ? yuan(input.deduction.amount)
      : married
        ? std.married
        : std.single;

  const pd = params.preschoolDeduction;
  const preschoolDed =
    preschool > 0 ? pd.first + (preschool - 1) * pd.second : 0;

  const depInterest = yuan(input.dependentsInterest);

  return {
    married,
    self,
    spouse,
    selfSalaryDed,
    spouseSalaryDed,
    selfSalaryInc: self.salary - selfSalaryDed,
    spouseSalaryInc: spouse.salary - spouseSalaryDed,
    depInterest,
    exSelf,
    exSpouse,
    exemptionsAll,
    persons,
    general: generalDed,
    disabled: disabled * params.disabledDeduction.amount,
    education: college * params.educationDeduction.perStudent,
    preschool: preschoolDed,
    ltc: ltcCount * params.longTermCareDeduction.perPerson,
    rent: Math.min(yuan(input.rent), params.rentDeduction.cap),
    totalInterest: self.interest + spouse.interest + depInterest,
    warnings,
  };
}

// ---------------------------------------------------------------------------
// 單一「計稅方式 × 股利方式」的計算
// ---------------------------------------------------------------------------

interface Part {
  net: number;
  tax: number;
}

interface Evaluation {
  parts: Part[];
  taxPayable: number;
  gross: number;
  savings: number;
  ltc: number;
  rent: number;
  diff: number | null;
  maxIndex: number;
  maxRate: number;
  exclusion: 'RATE20' | 'DIVIDEND28' | null;
}

function evaluate(
  prep: Prep,
  params: TaxParams,
  method: TaxMethod,
  divMode: DividendMethod,
  withLtcRent: boolean,
): Evaluation {
  const exclDiv = divMode === 'separate28';
  const { self, spouse } = prep;
  const selfTot =
    prep.selfSalaryInc +
    self.interest +
    self.other +
    (exclDiv ? 0 : self.dividend);
  const spouseTot =
    prep.spouseSalaryInc +
    spouse.interest +
    spouse.other +
    (exclDiv ? 0 : spouse.dividend);
  const gross = selfTot + spouseTot + prep.depInterest;

  const useLR = withLtcRent && !exclDiv;
  const ltc = useLR ? prep.ltc : 0;
  const rent = useLR ? prep.rent : 0;
  const cap = params.savingsDeduction.cap;
  const savings = Math.min(prep.totalInterest, cap);
  const special =
    savings + prep.disabled + prep.education + prep.preschool + ltc + rent;

  const bl = params.basicLiving.perPerson;
  let diff: number | null = null;
  if (bl !== null) {
    const compare = prep.exemptionsAll + prep.general + special;
    diff = Math.max(0, prep.persons * bl - compare);
  }
  const d = diff || 0;

  const parts: Part[] = [];
  const push = (net: number) => {
    const n = net > 0 ? net : 0;
    parts.push({ net: n, tax: bracketTax(n, params) });
  };

  if (method === 'joint') {
    push(gross - prep.exemptionsAll - prep.general - special - d);
  } else if (
    method === 'selfSalarySeparate' ||
    method === 'spouseSalarySeparate'
  ) {
    const isSelf = method === 'selfSalarySeparate';
    const sepInc = isSelf ? prep.selfSalaryInc : prep.spouseSalaryInc;
    const sepEx = isSelf ? prep.exSelf : prep.exSpouse;
    push(sepInc - sepEx);
    push(
      gross -
        sepInc -
        (prep.exemptionsAll - sepEx) -
        prep.general -
        special -
        d,
    );
  } else {
    const isSelf = method === 'selfAllSeparate';
    const sepInc = isSelf ? selfTot : spouseTot;
    const sepEx = isSelf ? prep.exSelf : prep.exSpouse;
    const sepInterest = isSelf ? self.interest : spouse.interest;
    const otherInterest = prep.totalInterest - sepInterest;
    // 儲蓄投資特別扣除額：先扣他方與受扶養親屬，餘額再給分開者
    const otherSav = Math.min(otherInterest, cap);
    const sepSav = Math.min(sepInterest, cap - otherSav);
    push(sepInc - sepEx - sepSav);
    // 身心障礙特別扣除額：輸入沒有歸屬，一律留在其餘部分
    push(
      gross -
        sepInc -
        (prep.exemptionsAll - sepEx) -
        (prep.general + special - sepSav) -
        d,
    );
  }

  let maxIndex = 0;
  let maxRate = 0;
  let taxPayable = 0;
  for (const p of parts) {
    taxPayable += p.tax;
    if (p.net > 0) {
      const i = bracketIndexOf(p.net, params);
      if (i > maxIndex) maxIndex = i;
      const r = params.brackets.rows[i].rate;
      if (r > maxRate) maxRate = r;
    }
  }
  return {
    parts,
    taxPayable,
    gross,
    savings,
    ltc,
    rent,
    diff,
    maxIndex,
    maxRate,
    exclusion: null,
  };
}

function evaluateWithRule(
  prep: Prep,
  params: TaxParams,
  method: TaxMethod,
  divMode: DividendMethod,
): Evaluation {
  const requested = prep.ltc + prep.rent;
  const first = evaluate(prep, params, method, divMode, true);
  if (requested > 0 && divMode === 'separate28') {
    first.exclusion = 'DIVIDEND28';
    return first;
  }
  if (requested > 0 && first.maxRate >= params.exclusion.rate) {
    const second = evaluate(prep, params, method, divMode, false);
    second.exclusion = 'RATE20';
    return second;
  }
  return first;
}

// ---------------------------------------------------------------------------
// 主函式
// ---------------------------------------------------------------------------

export function computeIncomeTax(
  input: TaxInput,
  params: TaxParams,
  opts: TaxOptions = {},
): TaxResult {
  const prep = prepare(input, params, opts);
  const warnings = prep.warnings.slice();
  const divTotal = prep.self.dividend + prep.spouse.dividend;
  const dv = params.dividend;
  const credit = Math.min(floorRate(divTotal, dv.creditRate), dv.creditCap);
  const sepTax = floorRate(divTotal, dv.separateRate);

  const methodList: TaxMethod[] = prep.married
    ? [
        'joint',
        'selfSalarySeparate',
        'spouseSalarySeparate',
        'selfAllSeparate',
        'spouseAllSeparate',
      ]
    : ['joint'];
  const divModes: DividendMethod[] =
    divTotal > 0 ? ['combined', 'separate28'] : ['none'];

  const methods: MethodOutcome[] = [];
  let best: { ev: Evaluation; outcome: MethodOutcome } | null = null;
  for (const dm of divModes) {
    for (const m of methodList) {
      const ev = evaluateWithRule(
        prep,
        params,
        m,
        dm === 'none' ? 'combined' : dm,
      );
      const totalDue =
        dm === 'combined'
          ? ev.taxPayable - credit
          : dm === 'separate28'
            ? ev.taxPayable + sepTax
            : ev.taxPayable;
      const outcome: MethodOutcome = {
        method: m,
        dividendMethod: dm,
        taxPayable: ev.taxPayable,
        totalDue,
      };
      methods.push(outcome);
      if (best === null || totalDue < best.outcome.totalDue)
        best = { ev, outcome };
    }
  }
  const { ev, outcome } = best as { ev: Evaluation; outcome: MethodOutcome };

  if (ev.diff === null) warnings.push('BASIC_LIVING_NOT_ANNOUNCED');
  if (ev.exclusion === 'RATE20') warnings.push('LTC_RENT_EXCLUDED_RATE20');
  if (ev.exclusion === 'DIVIDEND28')
    warnings.push('LTC_RENT_EXCLUDED_DIVIDEND28');

  const grossWithDividend =
    prep.selfSalaryInc +
    prep.spouseSalaryInc +
    prep.self.interest +
    prep.spouse.interest +
    prep.self.other +
    prep.spouse.other +
    prep.depInterest +
    divTotal;
  if (grossWithDividend > params.amt.threshold)
    warnings.push('AMT_NOT_COMPUTED');

  const salaryDed = prep.selfSalaryDed + prep.spouseSalaryDed;
  const totalDue = outcome.totalDue;
  const withheld = yuan(input.withheld);
  const net = ev.parts.reduce((a, p) => a + p.net, 0);

  return {
    grossIncome: ev.gross,
    exemptions: prep.exemptionsAll,
    generalDeduction: prep.general,
    specialDeductions: {
      salary: salaryDed,
      savings: ev.savings,
      disabled: prep.disabled,
      education: prep.education,
      preschool: prep.preschool,
      longTermCare: ev.ltc,
      rent: ev.rent,
    },
    basicLivingDifference: ev.diff,
    netIncome: net,
    bracketIndex: ev.maxIndex,
    marginalRate: params.brackets.rows[ev.maxIndex].rate,
    taxPayable: outcome.taxPayable,
    method: outcome.method,
    dividendMethod: outcome.dividendMethod,
    dividendCredit: outcome.dividendMethod === 'combined' ? credit : 0,
    dividendSeparateTax: outcome.dividendMethod === 'separate28' ? sepTax : 0,
    methods,
    totalDue,
    balance: totalDue - withheld,
    effectiveRate: grossWithDividend > 0 ? totalDue / grossWithDividend : 0,
    warnings,
  };
}

/**
 * 「薪資收入在多少以下免繳稅」。
 * input 只取家戶組成與扣除項（薪資欄忽略；利息／股利／其他所得與 dependentsInterest 照填，
 * 會從門檻中扣除）。雙薪（已婚）時回傳全戶薪資合計，假設兩人薪資都 ≥ 薪資所得特別扣除額上限；
 * 單身為本人薪資。可用 opts.earners 覆寫賺薪資的人數（預設已婚 2、單身 1）。
 * 淨額 ≤ 0 即免繳；含基本生活費差額（參數為 null 時視為 0）；不套用排富（淨額 0 時稅率 5%，不會觸發）。
 */
export function taxFreeThreshold(
  input: TaxInput,
  params: TaxParams,
  opts: TaxOptions & { earners?: 1 | 2 } = {},
): number {
  const prep = prepare(input, params, opts);
  const earners = opts.earners || (prep.married ? 2 : 1);
  const special =
    Math.min(prep.totalInterest, params.savingsDeduction.cap) +
    prep.disabled +
    prep.education +
    prep.preschool +
    prep.ltc +
    prep.rent;
  const bl = params.basicLiving.perPerson;
  const diff =
    bl === null
      ? 0
      : Math.max(
          0,
          prep.persons * bl - (prep.exemptionsAll + prep.general + special),
        );
  const otherIncome =
    prep.self.interest +
    prep.self.dividend +
    prep.self.other +
    prep.spouse.interest +
    prep.spouse.dividend +
    prep.spouse.other +
    prep.depInterest;
  const t =
    prep.exemptionsAll +
    prep.general +
    special +
    diff +
    earners * params.salaryDeduction.cap -
    otherIncome;
  return t > 0 ? t : 0;
}
