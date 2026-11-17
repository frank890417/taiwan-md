/**
 * laborInsurance.ts — 勞保老年年金與勞保保險費的純計算函式。
 *
 * 資料來源是 src/data/income/labor-2026.json（呼叫端把 `laborInsurance` 區塊當 params 傳進來）。
 * 全部是純函式，沒有 I/O，可以直接用 node --experimental-strip-types 測
 * （tests/income-labor.test.mjs）。
 *
 * 四捨五入約定：
 *   年資    年＋月/12，計到小數第二位，第三位四捨五入（勞保局 https://www.bli.gov.tw/0019818.html）。
 *   年金    先把兩式擇優的金額四捨五入到元，再乘增減給比例後四捨五入到元
 *           （重現勞保局 https://www.bli.gov.tw/0019825.html 的算例：19,012 再乘 1.12 得 21,293）。
 *   保費    每一項各自四捨五入到元，再相加（重現勞保局 115 年保險費分擔金額表）。
 */

export interface ClaimAgeRule {
  fromBirthYear: number | null;
  toBirthYear: number | null;
  age: number;
}

export interface OldAgePensionParams {
  pension: {
    formulaA: { coefficient: number; constant: number };
    formulaB: { coefficient: number };
    adjustmentPerYear: number;
    adjustmentCap: number;
    maxEarlyYears: number;
    minSeniorityYears: number;
  };
  claimAgeByBirthYear: ClaimAgeRule[];
  lumpSum: {
    monthsPerYear: number;
    monthsPerYearBeyond15: number;
    thresholdYears: number;
    maxMonths: number;
    maxYearsAfter60: number;
    maxMonthsWithAfter60: number;
  };
}

export interface PremiumParams {
  ordinaryAccidentRate: number;
  employmentRate: number;
  shares: { worker: number; employer: number; government: number };
}

export interface OldAgePensionInput {
  /** 最高 60 個月的平均月投保薪資（元） */
  avgInsuredSalary: number;
  /** 保險年資的整年數 */
  years: number;
  /** 保險年資的零頭月數 */
  months: number;
  /** 出生年次（民國） */
  birthYearROC: number;
  /** 實際請領年齡（整歲） */
  claimAge: number;
  /** 逾 60 歲仍在保的年資（年），只用在一次金上限；預設 0 */
  yearsAfter60?: number;
}

export interface OldAgePensionResult {
  eligible: boolean;
  seniorityYears: number;
  formulaA: number;
  formulaB: number;
  base: number;
  chosen: 'A' | 'B';
  statutoryAge: number;
  adjustmentRate: number;
  monthly: number;
  lumpSumMonths: number | null;
  reason?: string;
}

export interface PremiumShare {
  laborInsurance: number;
  employmentInsurance: number;
}

export interface MonthlyPremium {
  insuredSalary: number;
  worker: PremiumShare;
  employer: PremiumShare;
  government: PremiumShare;
}

/** 四捨五入到整數（half up），加一點點 epsilon 吃掉浮點誤差，例如 29500×0.115×0.2。 */
export function roundHalfUp(x: number): number {
  return Math.floor(x + 0.5 + 1e-7);
}

/** 四捨五入到小數第 n 位 */
function roundTo(x: number, n: number): number {
  const m = 10 ** n;
  return Math.floor(x * m + 0.5 + 1e-7) / m;
}

/**
 * 法定請領年齡。出生年次（民國）對照表，46 年次以前 60 歲，每晚一年次加一歲，51 年次以後 65 歲。
 * 來源：https://www.bli.gov.tw/0019821.html
 */
export function statutoryPensionAge(
  birthYearROC: number,
  table: ClaimAgeRule[],
): number {
  for (const r of table) {
    const lo = r.fromBirthYear ?? -Infinity;
    const hi = r.toBirthYear ?? Infinity;
    if (birthYearROC >= lo && birthYearROC <= hi) return r.age;
  }
  throw new RangeError(`no claim age rule for birth year ${birthYearROC}`);
}

/**
 * 投保薪資級距：取不低於薪資的最低一級，超過最高級取最高級。
 * grades 要由小到大排序。
 */
export function insuredSalaryGrade(
  monthlyWage: number,
  grades: number[],
): number {
  for (const g of grades) if (g >= monthlyWage) return g;
  return grades[grades.length - 1];
}

/** 年資換算：年＋月/12，小數第二位四捨五入 */
export function seniorityToYears(years: number, months: number): number {
  return roundTo(years + months / 12, 2);
}

/**
 * 老年一次金月數（勞保條例第 59 條）。
 * 每滿一年 1 個月；超過 15 年部分每滿一年 2 個月，最高 45 個月；
 * 逾 60 歲年資最多計 5 年，合計最高 50 個月。
 * 只算整年（條文寫「每滿一年」），零頭月數不計。這不是勞保局公布的算例，是照條文手算。
 */
export function oldAgeLumpSumMonths(
  seniorityYears: number,
  params: OldAgePensionParams,
  yearsAfter60 = 0,
): number {
  const L = params.lumpSum;
  const full = Math.floor(seniorityYears + 1e-9);
  const base =
    full <= L.thresholdYears
      ? full * L.monthsPerYear
      : L.thresholdYears * L.monthsPerYear +
        (full - L.thresholdYears) * L.monthsPerYearBeyond15;
  // 45 個月上限只看 60 歲以前的年資；逾 60 歲的年資最多再計 5 年，合計最高 50 個月。
  const after = Math.min(Math.max(yearsAfter60, 0), L.maxYearsAfter60);
  if (after > 0) {
    const before = Math.max(full - Math.floor(yearsAfter60), 0);
    const beforeMonths =
      before <= L.thresholdYears
        ? before * L.monthsPerYear
        : L.thresholdYears * L.monthsPerYear +
          (before - L.thresholdYears) * L.monthsPerYearBeyond15;
    const afterMonths = after * L.monthsPerYearBeyond15;
    return Math.min(
      Math.min(beforeMonths, L.maxMonths) + afterMonths,
      L.maxMonthsWithAfter60,
    );
  }
  return Math.min(base, L.maxMonths);
}

/**
 * 勞保老年年金。
 * 兩式擇優：avg×年資×0.775%＋3,000、avg×年資×1.55%。
 * 展延每年增給 4%（最多 20%）；提前每年減給 4%（最多提前 5 年，最多減 20%）。
 * 年資未滿 15 年不符年金條件，eligible=false，並給一次金月數。
 * claimAge 是整歲；有小數時只計整年。
 */
export function computeOldAgePension(
  input: OldAgePensionInput,
  params: OldAgePensionParams,
): OldAgePensionResult {
  const P = params.pension;
  const seniorityYears = seniorityToYears(input.years, input.months);
  const formulaA =
    input.avgInsuredSalary * seniorityYears * P.formulaA.coefficient +
    P.formulaA.constant;
  const formulaB =
    input.avgInsuredSalary * seniorityYears * P.formulaB.coefficient;
  const chosen: 'A' | 'B' = formulaA >= formulaB ? 'A' : 'B';
  const base = roundHalfUp(chosen === 'A' ? formulaA : formulaB);
  const statutoryAge = statutoryPensionAge(
    input.birthYearROC,
    params.claimAgeByBirthYear,
  );

  const diff = Math.trunc(input.claimAge - statutoryAge);
  const stepPct = Math.round(P.adjustmentPerYear * 100);
  const capPct = Math.round(P.adjustmentCap * 100);
  const adjPct =
    diff >= 0
      ? Math.min(diff * stepPct, capPct)
      : Math.max(diff * stepPct, -capPct);
  const adjustmentRate = adjPct / 100;

  const result: OldAgePensionResult = {
    eligible: true,
    seniorityYears,
    formulaA: roundTo(formulaA, 2),
    formulaB: roundTo(formulaB, 2),
    base,
    chosen,
    statutoryAge,
    adjustmentRate,
    monthly: roundHalfUp((base * (100 + adjPct)) / 100),
    lumpSumMonths: null,
  };

  if (seniorityYears < P.minSeniorityYears) {
    result.eligible = false;
    result.monthly = 0;
    result.lumpSumMonths = oldAgeLumpSumMonths(
      seniorityYears,
      params,
      input.yearsAfter60 ?? 0,
    );
    result.reason = 'SENIORITY_UNDER_MIN';
    return result;
  }
  if (diff < -P.maxEarlyYears) {
    result.eligible = false;
    result.monthly = 0;
    result.reason = 'TOO_EARLY';
    return result;
  }
  return result;
}

/**
 * 各請領年齡的月領金額（給曲線圖用）。
 * keepWorking=false（預設）：年資固定，只看展延與減給。
 * keepWorking=true：每多工作一年，年資加一年（claimAge 超過法定年齡後才加；提前請領年資不縮減）。
 * 每個整歲一筆；提前超過 5 年的年齡 eligible=false、monthly=0。
 */
export function pensionByClaimAge(
  input: Omit<OldAgePensionInput, 'claimAge'>,
  params: OldAgePensionParams,
  fromAge: number,
  toAge: number,
  keepWorking = false,
): {
  age: number;
  monthly: number;
  eligible: boolean;
  adjustmentRate: number;
  reason?: string;
}[] {
  const statutoryAge = statutoryPensionAge(
    input.birthYearROC,
    params.claimAgeByBirthYear,
  );
  const out = [];
  for (let age = fromAge; age <= toAge; age++) {
    const extra = keepWorking ? Math.max(age - statutoryAge, 0) : 0;
    const r = computeOldAgePension(
      { ...input, years: input.years + extra, claimAge: age },
      params,
    );
    out.push({
      age,
      monthly: r.monthly,
      eligible: r.eligible,
      adjustmentRate: r.adjustmentRate,
      reason: r.reason,
    });
  }
  return out;
}

/**
 * 每月勞保（普通事故，扣除內含就保後 11.5%）與就業保險（1%）保費。
 * 勞工 20%、雇主 70%、政府 10%。每項各自四捨五入到元後相加。
 * 重現勞保局 115 年保險費分擔金額表（https://www.bli.gov.tw/Files/25696、/Files/25690）的整月金額。
 * 政府負擔的數字表上沒有，這裡照比例算。
 */
export function monthlyPremium(
  insuredSalary: number,
  params: PremiumParams,
): MonthlyPremium {
  const part = (rate: number, share: number) =>
    roundHalfUp(insuredSalary * rate * share);
  const side = (share: number): PremiumShare => ({
    laborInsurance: part(params.ordinaryAccidentRate, share),
    employmentInsurance: part(params.employmentRate, share),
  });
  return {
    insuredSalary,
    worker: side(params.shares.worker),
    employer: side(params.shares.employer),
    government: side(params.shares.government),
  };
}
