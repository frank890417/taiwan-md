/**
 * mortgage.ts — 房貸試算核心（/housing/ 專題的試算工具共用）
 *
 * 純函式、無 DOM、無外部依賴；頁面端與 tests/housing-mortgage.test.mjs 共用同一份。
 * 需能被 `node --experimental-strip-types` 直接載入，所以只用可抹除的型別語法。
 *
 * 計算慣例（與國內銀行公開試算一致的部分）：
 *   - 月利率 = 年利率 / 12（不做日計息）
 *   - 寬限期內只繳息，本金不動；寬限期結束後在「剩餘期數」內攤還全部本金
 *   - 本息平均攤還：利率變動、寬限期結束、或「縮短月付」型提前還款後，依當時餘額與剩餘期數重算月付金
 *   - 本金平均攤還：每月攤還本金 = 餘額 / 剩餘期數，利息隨餘額遞減
 *   - 內部用浮點數算到底，逐期四捨五入只在顯示層做；銀行實際逐期取整，總額會有數十元內的差距
 *
 * 這裡算的是數學，不是任何一家銀行的核貸結果。
 */

export type RepaymentMethod = 'annuity' | 'equalPrincipal';

/** 一段利率：從上一段結束的次月起，持續 months 個月；最後一段自動延伸到期滿。 */
export interface RateStage {
  months: number;
  annualRatePct: number;
}

/** 提前還款：在第 month 期繳款後，額外償還 amount 本金。 */
export interface Prepayment {
  month: number;
  amount: number;
  /** shortenTerm＝月付不變、提早還清；reducePayment＝期數不變、月付降低 */
  mode: 'shortenTerm' | 'reducePayment';
}

export interface MortgageInput {
  /** 貸款本金（元） */
  principal: number;
  /** 貸款年限（含寬限期） */
  years: number;
  /** 寬限期月數（只繳息） */
  graceMonths?: number;
  method?: RepaymentMethod;
  /** 分段利率；只給一段就是單一利率 */
  stages: RateStage[];
  prepayments?: Prepayment[];
}

export interface ScheduleRow {
  month: number;
  annualRatePct: number;
  /** 當期應繳（本金＋利息，不含提前還款） */
  payment: number;
  interest: number;
  principalPaid: number;
  prepaid: number;
  balance: number;
}

export interface MortgageResult {
  schedule: ScheduleRow[];
  totalInterest: number;
  /** 本金＋利息＋提前還款的總流出 */
  totalPaid: number;
  /** 寬限期內的月付（無寬限期時為 null） */
  gracePayment: number | null;
  /** 寬限期結束後第一期的月付（無寬限期時為第一期） */
  firstAmortizingPayment: number;
  maxPayment: number;
  /** 實際還清的期數（提前還款可能小於 years*12） */
  payoffMonth: number;
}

const EPS = 0.005;

/** 本息平均攤還的月付金。月利率為 0 時退化成本金均分。 */
export function annuityPayment(
  balance: number,
  annualRatePct: number,
  months: number,
): number {
  if (months <= 0) return balance;
  const r = annualRatePct / 100 / 12;
  if (r === 0) return balance / months;
  const f = Math.pow(1 + r, months);
  return (balance * r * f) / (f - 1);
}

/** 給定月付金、利率、期數，反推可貸本金（annuityPayment 的反函數）。 */
export function principalForPayment(
  payment: number,
  annualRatePct: number,
  months: number,
): number {
  if (months <= 0) return 0;
  const r = annualRatePct / 100 / 12;
  if (r === 0) return payment * months;
  const f = Math.pow(1 + r, months);
  return (payment * (f - 1)) / (r * f);
}

function rateAt(stages: RateStage[], month: number): number {
  let end = 0;
  for (let i = 0; i < stages.length; i++) {
    end += stages[i].months;
    if (month <= end || i === stages.length - 1) return stages[i].annualRatePct;
  }
  return stages[stages.length - 1].annualRatePct;
}

export function validateInput(input: MortgageInput): string[] {
  const errs: string[] = [];
  const total = Math.round(input.years * 12);
  const grace = input.graceMonths ?? 0;
  if (!(input.principal > 0)) errs.push('principal');
  if (!(total > 0) || total > 600) errs.push('years');
  if (grace < 0 || grace >= total) errs.push('graceMonths');
  if (!input.stages?.length) errs.push('stages');
  for (const s of input.stages ?? []) {
    if (!(s.annualRatePct >= 0) || s.annualRatePct > 30) errs.push('rate');
    if (s.months < 0) errs.push('stageMonths');
  }
  for (const p of input.prepayments ?? []) {
    if (!(p.amount > 0) || p.month < 1 || p.month > total)
      errs.push('prepayment');
  }
  return [...new Set(errs)];
}

export function computeMortgage(input: MortgageInput): MortgageResult {
  const errs = validateInput(input);
  if (errs.length) throw new RangeError(`invalid mortgage input: ${errs}`);

  const total = Math.round(input.years * 12);
  const grace = input.graceMonths ?? 0;
  const method = input.method ?? 'annuity';
  const prepayByMonth = new Map<number, Prepayment[]>();
  for (const p of input.prepayments ?? []) {
    const list = prepayByMonth.get(p.month) ?? [];
    list.push(p);
    prepayByMonth.set(p.month, list);
  }

  const schedule: ScheduleRow[] = [];
  let balance = input.principal;
  let totalInterest = 0;
  let totalPaid = 0;
  // annuity：目前的月付金；equalPrincipal：目前每月攤還的本金
  let level: number | null = null;
  let prevRate: number | null = null;

  for (let m = 1; m <= total && balance > EPS; m++) {
    const rate = rateAt(input.stages, m);
    const r = rate / 100 / 12;
    const interest = balance * r;
    const remaining = total - m + 1;
    let principalPaid = 0;

    if (m > grace) {
      if (method === 'annuity') {
        if (level === null || rate !== prevRate)
          level = annuityPayment(balance, rate, remaining);
        principalPaid = Math.min(balance, level - interest);
      } else {
        if (level === null) level = balance / remaining;
        principalPaid = Math.min(balance, level);
      }
      // 最後一期收尾，避免浮點殘值
      if (m === total || balance - principalPaid < EPS) principalPaid = balance;
    }
    prevRate = rate;

    balance -= principalPaid;
    let prepaid = 0;
    for (const p of prepayByMonth.get(m) ?? []) {
      const amt = Math.min(balance, p.amount);
      prepaid += amt;
      balance -= amt;
      // reducePayment：下期依新餘額重算；shortenTerm：level 不動，自然提早結清
      if (p.mode === 'reducePayment' && m >= grace) level = null;
    }
    // 寬限期內提前還款：寬限期結束時本來就會重算，不需額外處理
    if (m === grace) level = null;

    const payment = interest + principalPaid;
    totalInterest += interest;
    totalPaid += payment + prepaid;
    schedule.push({
      month: m,
      annualRatePct: rate,
      payment,
      interest,
      principalPaid,
      prepaid,
      balance: balance < EPS ? 0 : balance,
    });
  }

  const firstAmort = schedule.find((row) => row.month > grace);
  return {
    schedule,
    totalInterest,
    totalPaid,
    gracePayment: grace > 0 ? schedule[0].payment : null,
    firstAmortizingPayment: firstAmort ? firstAmort.payment : 0,
    maxPayment: Math.max(...schedule.map((row) => row.payment)),
    payoffMonth: schedule.length,
  };
}

/** 貸款負擔率＝月付金 / 月所得（回傳百分比）。 */
export function debtServiceRatio(
  monthlyPayment: number,
  monthlyIncome: number,
): number {
  if (!(monthlyIncome > 0)) return NaN;
  return (monthlyPayment / monthlyIncome) * 100;
}

/** 房價所得比＝總價 / 年所得（倍）。 */
export function priceToIncome(price: number, annualIncome: number): number {
  if (!(annualIncome > 0)) return NaN;
  return price / annualIncome;
}

/**
 * 內政部「房價負擔能力」分級（以貸款負擔率 % 判定）。
 * 門檻出處見 src/data/housing/calc-fixtures.json 的 affordabilityBands。
 */
export function affordabilityBand(
  ratioPct: number,
  bands: { max: number | null; key: string }[],
): string {
  for (const b of bands) if (b.max === null || ratioPct < b.max) return b.key;
  return bands[bands.length - 1].key;
}

export interface RentVsBuyInput {
  price: number;
  downPayment: number;
  mortgage: Omit<MortgageInput, 'principal'>;
  /** 買方一次性成本（仲介費、代書、契稅等）占總價 % */
  buyCostPct: number;
  /** 每年持有成本（房屋稅、地價稅、管理費、修繕）占總價 % */
  holdingCostPct: number;
  /** 賣出成本占售價 % */
  sellCostPct: number;
  /** 假設的房價年變動率 %（可為負） */
  priceGrowthPct: number;
  monthlyRent: number;
  rentGrowthPct: number;
  /** 租屋者把省下的錢拿去存／投資的年報酬率 % */
  investReturnPct: number;
  /** 比較的年數 */
  horizonYears: number;
}

export interface RentVsBuyYear {
  year: number;
  /** 買方淨資產＝房屋現值扣賣出成本與貸款餘額 */
  buyNetWorth: number;
  /** 租方淨資產＝頭期款與每月差額的累積投資 */
  rentNetWorth: number;
}

/**
 * 買與租的淨資產比較。兩邊每月現金流出取較大者為共同預算，
 * 花得少的一方把差額存起來。結果完全取決於使用者填的假設。
 */
export function compareRentVsBuy(input: RentVsBuyInput): RentVsBuyYear[] {
  const loan = computeMortgage({
    ...input.mortgage,
    principal: input.price - input.downPayment,
  });
  const months = Math.round(input.horizonYears * 12);
  const rMonthly = Math.pow(1 + input.investReturnPct / 100, 1 / 12) - 1;
  const upfront = input.downPayment + (input.price * input.buyCostPct) / 100;

  let rentPortfolio = upfront;
  let buyPortfolio = 0;
  const out: RentVsBuyYear[] = [];
  for (let m = 1; m <= months; m++) {
    const yearIdx = Math.floor((m - 1) / 12);
    const row = loan.schedule[m - 1];
    const price =
      input.price * Math.pow(1 + input.priceGrowthPct / 100, m / 12);
    const buyOut =
      (row ? row.payment + row.prepaid : 0) +
      (price * input.holdingCostPct) / 100 / 12;
    const rentOut =
      input.monthlyRent * Math.pow(1 + input.rentGrowthPct / 100, yearIdx);
    rentPortfolio =
      rentPortfolio * (1 + rMonthly) + Math.max(0, buyOut - rentOut);
    buyPortfolio =
      buyPortfolio * (1 + rMonthly) + Math.max(0, rentOut - buyOut);
    if (m % 12 === 0) {
      const balance = row ? row.balance : 0;
      out.push({
        year: m / 12,
        buyNetWorth:
          price * (1 - input.sellCostPct / 100) - balance + buyPortfolio,
        rentNetWorth: rentPortfolio,
      });
    }
  }
  return out;
}

/**
 * 總費用年百分率（APR）：把開辦費等一次性費用算進去後的實質年利率。
 * 解「實拿金額（本金 − 費用）＝各期還款以月利率 i 折現的現值」的 i，再乘 12。
 * 銀行依金管會規定揭露的「總費用年百分率」即此算法（月複利不年化）。
 */
export function annualPercentageRate(
  input: MortgageInput,
  fees: number,
): number {
  const { schedule } = computeMortgage(input);
  const net = input.principal - fees;
  const pv = (i: number) =>
    schedule.reduce(
      (acc, row) =>
        acc + (row.payment + row.prepaid) / Math.pow(1 + i, row.month),
      0,
    );
  let lo = 0;
  let hi = 0.05;
  for (let k = 0; k < 80; k++) {
    const mid = (lo + hi) / 2;
    if (pv(mid) > net) lo = mid;
    else hi = mid;
  }
  return ((lo + hi) / 2) * 12 * 100;
}
