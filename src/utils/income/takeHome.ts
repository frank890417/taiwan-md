/**
 * takeHome.ts — 實領薪資與雇主成本（2026 年費率）。
 *
 * 勞保、就保、職災、勞退在這裡算；健保費歸醫療專題、綜所稅歸稅制專題，
 * 都由呼叫端算好傳進來，傳 null 就不扣並在 notes 標出「未含」。
 * 年終獎金只進年度合計，不影響每月勞保與勞退（本函式把投保薪資與月提繳工資都只看月薪）。
 */
import {
  insuredSalaryGrade,
  monthlyPremium,
  roundHalfUp,
} from './laborInsurance.ts';
import type { PremiumParams, MonthlyPremium } from './laborInsurance.ts';
import { contributionGrade } from './laborPension.ts';

export interface TakeHomeParams {
  laborInsurance: PremiumParams & { insuredSalaryGrades: number[] };
  occupationalAccident: { averageRate: number; insuredSalaryGrades: number[] };
  laborPension: {
    employerMinRate: number;
    selfMaxRate: number;
    contributionGrades: number[];
  };
}

export interface TakeHomeInput {
  monthlyWage: number;
  /** 年終與其他獎金月數（折成幾個月薪資） */
  bonusMonths: number;
  /** 勞退自提率，0 到 0.06 */
  selfContributionRate: number;
  /** 每月健保自付額；null ＝ 本工具不含 */
  nhiPremium: number | null;
  /** 全年綜所稅額；null ＝ 本工具不含 */
  annualIncomeTax: number | null;
  /** 職災費率，預設用行業平均 */
  occupationalRate?: number;
}

export interface TakeHomeResult {
  insuredSalary: number;
  contributionWage: number;
  worker: {
    laborInsurance: number;
    employmentInsurance: number;
    pensionSelf: number;
    nhi: number | null;
    incomeTaxMonthly: number | null;
    totalDeductions: number;
    takeHomeMonthly: number;
  };
  employer: {
    laborInsurance: number;
    employmentInsurance: number;
    occupationalAccident: number;
    pension: number;
    nhi: null;
    totalMonthly: number;
    totalCostMonthly: number;
  };
  annual: { gross: number; takeHome: number };
  premium: MonthlyPremium;
  notes: string[];
}

export function computeTakeHome(
  input: TakeHomeInput,
  params: TakeHomeParams,
): TakeHomeResult {
  const { monthlyWage } = input;
  const insuredSalary = insuredSalaryGrade(
    monthlyWage,
    params.laborInsurance.insuredSalaryGrades,
  );
  const premium = monthlyPremium(insuredSalary, params.laborInsurance);
  const contributionWage = contributionGrade(
    monthlyWage,
    params.laborPension.contributionGrades,
  );

  const selfRate = Math.min(
    Math.max(input.selfContributionRate, 0),
    params.laborPension.selfMaxRate,
  );
  const pensionSelf = roundHalfUp(contributionWage * selfRate);
  const employerPension = roundHalfUp(
    contributionWage * params.laborPension.employerMinRate,
  );

  const occGrade = insuredSalaryGrade(
    monthlyWage,
    params.occupationalAccident.insuredSalaryGrades,
  );
  const occRate =
    input.occupationalRate ?? params.occupationalAccident.averageRate;
  const occupationalAccident = roundHalfUp(occGrade * occRate);

  const nhi = input.nhiPremium;
  const incomeTaxMonthly =
    input.annualIncomeTax === null
      ? null
      : roundHalfUp(input.annualIncomeTax / 12);

  const fixedDeductions =
    premium.worker.laborInsurance +
    premium.worker.employmentInsurance +
    pensionSelf +
    (nhi ?? 0);
  const totalDeductions = fixedDeductions + (incomeTaxMonthly ?? 0);

  const employerTotal =
    premium.employer.laborInsurance +
    premium.employer.employmentInsurance +
    occupationalAccident +
    employerPension;

  const gross = monthlyWage * (12 + input.bonusMonths);
  const notes: string[] = ['EMPLOYER_NHI_NOT_INCLUDED'];
  if (nhi === null) notes.push('NHI_NOT_INCLUDED');
  if (input.annualIncomeTax === null) notes.push('INCOME_TAX_NOT_INCLUDED');
  if (input.bonusMonths > 0) notes.push('BONUS_NO_INSURANCE_ADJUSTMENT');

  return {
    insuredSalary,
    contributionWage,
    worker: {
      laborInsurance: premium.worker.laborInsurance,
      employmentInsurance: premium.worker.employmentInsurance,
      pensionSelf,
      nhi,
      incomeTaxMonthly,
      totalDeductions,
      takeHomeMonthly: monthlyWage - totalDeductions,
    },
    employer: {
      laborInsurance: premium.employer.laborInsurance,
      employmentInsurance: premium.employer.employmentInsurance,
      occupationalAccident,
      pension: employerPension,
      nhi: null,
      totalMonthly: employerTotal,
      totalCostMonthly: monthlyWage + employerTotal,
    },
    // 年度實領＝全年總收入（含獎金）− 12 個月固定扣項 − 全年所得稅（用呼叫端給的全年稅額，不用月均攤的四捨五入值）
    annual: {
      gross,
      takeHome: gross - 12 * fixedDeductions - (input.annualIncomeTax ?? 0),
    },
    premium,
    notes,
  };
}
