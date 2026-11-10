/**
 * nhiCalc.ts — 全民健保保費試算（純函式，SSR 與瀏覽器共用）。
 *
 * 規則全部從 src/data/health/nhi-rules.json 傳進來（費率、分級表、負擔比率、平均眷口數各帶官方出處與生效日）。
 * 算法照健保署「保險費負擔金額表」的做法：先算每人保費並四捨五入到元，再乘以計費人數
 * （本人＋眷屬，眷屬超過上限口數以上限計）。
 */

export interface NhiShare {
  /** 被保險人自付比率 */
  insured: number;
  /** 投保單位負擔比率 */
  employer: number;
  /** 政府補助比率 */
  government: number;
}

export interface NhiRules {
  asOf: string;
  premiumRate: number;
  supplementaryRate: number;
  /** 平均眷口數（算投保單位與政府負擔用） */
  avgDependents: number;
  /** 眷屬計費上限口數 */
  maxDependents: number;
  /** 投保金額分級表（遞增） */
  grades: number[];
  /** 各身分負擔比率，key＝身分 id */
  shares: Record<string, NhiShare>;
  /** 身分的投保金額下限（例：雇主、專技人員、職業工會會員），key＝身分 id */
  minInsured?: Record<string, number>;
  /** 固定投保金額的身分（例：農漁民），key＝身分 id */
  fixedInsured?: Record<string, number>;
  /** 第六類地區人口：以平均保險費計 */
  regional: { averagePremium: number; insured: number; government: number };
  supplementary: {
    /** 單次給付門檻（元）：執行業務收入、股利、利息、租金 */
    singleThreshold: number;
    /** 兼職薪資門檻（基本工資） */
    partTimeThreshold: number;
    /** 單次計費上限（元） */
    singleCap: number;
    /** 獎金：全年累計超過當月投保金額幾倍的部分才計 */
    bonusMultiple: number;
  };
}

/** 四捨五入到元。 */
export function roundYuan(v: number): number {
  return Math.round(v + Number.EPSILON);
}

/** 月薪 → 月投保金額：分級表中第一個不低於月薪的級距；超過最高級以最高級計。 */
export function insuredAmountFor(grades: number[], salary: number): number {
  if (!(salary > 0)) return grades[0];
  for (const g of grades) if (g >= salary) return g;
  return grades[grades.length - 1];
}

export interface PremiumInput {
  /** 身分 id（對應 rules.shares 的 key）；'regional' ＝第六類地區人口 */
  category: string;
  /** 月薪或月投保金額；會自動對到分級表 */
  salary?: number;
  /** 眷屬人數 */
  dependents?: number;
}

export interface PremiumResult {
  /** 月投保金額（地區人口為 null） */
  insuredAmount: number | null;
  /** 本人每月保費（一人份） */
  perPerson: number;
  /** 計費人數（本人＋計費眷屬） */
  heads: number;
  /** 被保險人每月自付合計 */
  insuredTotal: number;
  /** 投保單位每月負擔（含平均眷口數） */
  employer: number;
  /** 政府每月補助（含平均眷口數；地區人口為每人補助 × 人數） */
  government: number;
  /** 一年自付合計 */
  yearly: number;
}

export function calcPremium(
  rules: NhiRules,
  input: PremiumInput,
): PremiumResult {
  const deps = Math.max(0, Math.trunc(input.dependents ?? 0));
  const heads = 1 + Math.min(deps, rules.maxDependents);

  if (input.category === 'regional') {
    const per = roundYuan(
      rules.regional.averagePremium * rules.regional.insured,
    );
    const gov = roundYuan(
      rules.regional.averagePremium * rules.regional.government,
    );
    return {
      insuredAmount: null,
      perPerson: per,
      heads,
      insuredTotal: per * heads,
      employer: 0,
      government: gov * heads,
      yearly: per * heads * 12,
    };
  }

  const share = rules.shares[input.category];
  if (!share) throw new Error(`unknown NHI category: ${input.category}`);
  const fixed = rules.fixedInsured?.[input.category];
  const floor = rules.minInsured?.[input.category] ?? 0;
  const insuredAmount =
    fixed ?? insuredAmountFor(rules.grades, Math.max(input.salary ?? 0, floor));
  const full = insuredAmount * rules.premiumRate;
  const per = roundYuan(full * share.insured);
  const employer = roundYuan(full * share.employer * (1 + rules.avgDependents));
  const government = roundYuan(
    full * share.government * (1 + rules.avgDependents),
  );
  return {
    insuredAmount,
    perPerson: per,
    heads,
    insuredTotal: per * heads,
    employer,
    government,
    yearly: per * heads * 12,
  };
}

export type SuppKind =
  | 'bonus'
  | 'partTime'
  | 'professional'
  | 'dividend'
  | 'interest'
  | 'rent';

export interface SuppInput {
  kind: SuppKind;
  /** 單次給付金額（獎金則為「全年累計獎金」） */
  amount: number;
  /** 當月投保金額（只有獎金需要） */
  insuredAmount?: number;
}

export interface SuppResult {
  /** 計費基礎（元）；0＝未達門檻不扣 */
  base: number;
  premium: number;
  /** 沒扣的原因 */
  reason?: 'below-threshold' | 'bonus-within-multiple';
}

export function calcSupplementary(
  rules: NhiRules,
  input: SuppInput,
): SuppResult {
  const s = rules.supplementary;
  const amt = Math.max(0, input.amount);
  if (input.kind === 'bonus') {
    const cap = (input.insuredAmount ?? 0) * s.bonusMultiple;
    const over = amt - cap;
    if (over <= 0)
      return { base: 0, premium: 0, reason: 'bonus-within-multiple' };
    const base = Math.min(over, s.singleCap);
    return { base, premium: roundYuan(base * rules.supplementaryRate) };
  }
  const threshold =
    input.kind === 'partTime' ? s.partTimeThreshold : s.singleThreshold;
  if (amt < threshold)
    return { base: 0, premium: 0, reason: 'below-threshold' };
  const base = Math.min(amt, s.singleCap);
  return { base, premium: roundYuan(base * rules.supplementaryRate) };
}
