/**
 * laborPension.ts — 勞退新制（個人專戶）的月提繳級距、專戶累積與月退休金換算。
 * 純函式；資料來自 src/data/income/labor-2026.json 的 `laborPension` 區塊。
 */

export interface LifeExpectancyRow {
  age: number;
  years: number;
}

export interface PensionParams {
  contributionGrades: number[];
  annuityRate: number;
  lifeExpectancy: LifeExpectancyRow[];
}

export interface MonthlyPensionResult {
  lifeExpectancy: number;
  factor: number;
  monthly: number;
}

export interface ProjectBalanceInput {
  monthlyWage: number;
  currentBalance: number;
  yearsToRetire: number;
  employerRate: number;
  selfRate: number;
  /** 年報酬率，小數（0.0764 ＝ 7.64%） */
  annualReturn: number;
  /** 薪資年成長率，小數 */
  wageGrowth: number;
}

export interface BalanceYear {
  year: number;
  /** 該年月薪 */
  wage: number;
  /** 該年月提繳工資（對照分級表） */
  contributionWage: number;
  /** 該年提繳金額（雇主加自提，12 個月） */
  contributed: number;
  /** 累計收益（跟勞動部試算表「累計收益」同義，是累計值，不是當年新增） */
  interest: number;
  /** 累計本金及收益 */
  balance: number;
  /** 累計提繳本金（含期初專戶金額） */
  principal: number;
}

/** 月提繳工資：對照分級表取不低於薪資的最低一級，超過取最高級（跟勞動部試算表 getSalaryMonth 同）。 */
export function contributionGrade(
  monthlyWage: number,
  grades: number[],
): number {
  for (const g of grades) if (g >= monthlyWage) return g;
  return grades[grades.length - 1];
}

/**
 * 期初年金現值因子（勞保局 https://www.bli.gov.tw/0018437.html）：
 *   [ (1 − (1+i)^−T) ÷ ((1+i)^(1/12) − 1) × (1+i)^(1/12) ] ÷ 12
 * T＝平均餘命（年），i＝利率。T=23、i=1.1473% 時是 20.239737682。
 * 每月月退休金＝專戶累積總額 ÷ 因子 ÷ 12。
 */
export function annuityFactor(
  lifeExpectancyYears: number,
  rate: number,
): number {
  const g = (1 + rate) ** (1 / 12);
  return (((1 - (1 + rate) ** -lifeExpectancyYears) / (g - 1)) * g) / 12;
}

/** 平均餘命（月退採計，整數年）。超過表內最大年齡用最大年齡那列；低於 60 歲丟 RangeError。 */
export function lifeExpectancyAt(
  age: number,
  table: LifeExpectancyRow[],
): number {
  const sorted = [...table].sort((a, b) => a.age - b.age);
  if (age < sorted[0].age)
    throw new RangeError(`age ${age} is below the first row of the table`);
  let hit = sorted[0];
  for (const r of sorted) if (r.age <= age) hit = r;
  return hit.years;
}

/** 專戶累積換算月退休金，四捨五入到元。 */
export function monthlyPensionFromBalance(
  balance: number,
  claimAge: number,
  params: PensionParams,
): MonthlyPensionResult {
  const lifeExpectancy = lifeExpectancyAt(claimAge, params.lifeExpectancy);
  const factor = annuityFactor(lifeExpectancy, params.annuityRate);
  return {
    lifeExpectancy,
    factor,
    monthly: Math.floor(balance / factor / 12 + 0.5 + 1e-9),
  };
}

/**
 * 逐年累積專戶，照勞動部試算表 trial.js 的 calculateAnnity（https://calcr2.mol.gov.tw/js/zhHantTW/trial.js）：
 *   累計收益（第 1 年）＝(月提繳工資×提繳率×5.5 ＋ 期初專戶金額) × 報酬率
 *   每年提繳＝round(月提繳工資×提繳率) × 12
 *   之後每年：薪資＋＝round(薪資×成長率)，重對照月提繳工資；
 *             累計收益＋＝(月提繳工資×提繳率×5.5 ＋ 上一年的累計本金及收益) × 報酬率
 * 當年新增提繳以 5.5 個月計息；列上的數字跟官方一樣取整數顯示，內部用未取整的值滾動。
 */
export function projectBalance(
  input: ProjectBalanceInput,
  params: Pick<PensionParams, 'contributionGrades'>,
): { yearly: BalanceYear[]; finalBalance: number } {
  const rate = input.employerRate + input.selfRate;
  let salary = input.monthlyWage;
  let m = contributionGrade(salary, params.contributionGrades);
  let revenue = (m * rate * 5.5 + input.currentBalance) * input.annualReturn;
  let yWithdraw = Math.round(m * rate) * 12;
  let principal = yWithdraw + input.currentBalance;
  let annuity = principal + revenue;

  const yearly: BalanceYear[] = [];
  for (let i = 0; i < input.yearsToRetire; i++) {
    yearly.push({
      year: i + 1,
      wage: Math.round(salary),
      contributionWage: m,
      contributed: Math.round(yWithdraw),
      interest: Math.round(revenue),
      balance: Math.round(annuity),
      principal: Math.round(principal),
    });
    salary += Math.round(salary * input.wageGrowth);
    m = contributionGrade(salary, params.contributionGrades);
    yWithdraw = Math.round(m * rate) * 12;
    principal += yWithdraw;
    revenue += (m * rate * 5.5 + annuity) * input.annualReturn;
    annuity = principal + revenue;
  }
  const finalBalance = yearly.length
    ? yearly[yearly.length - 1].balance
    : Math.round(input.currentBalance);
  return { yearly, finalBalance };
}
