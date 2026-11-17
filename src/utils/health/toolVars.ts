/**
 * toolVars.ts — 工具頁文案（src/i18n/health/toolpages.ts）裡 {佔位} 的數字，全部從規則檔算出來，
 * 單獨頁與內嵌板共用。
 */
import ltc from '../../data/health/ltc-rules.json';
import nhi from '../../data/health/nhi-rules.json';
import { calcPremium, calcSupplementary } from './nhiCalc';

const nf = (n: number) => n.toLocaleString('en-US');

export function toolVars(slug: string): Record<string, string | number> {
  const ex = calcPremium(nhi as any, { category: 'employee', salary: 45800 });
  return {
    year: 2026,
    asOf: slug === 'nhi-premium-calculator' ? nhi.asOf : ltc.asOf,
    q2: nf(ltc.care.monthly['2']),
    q8: nf(ltc.care.monthly['8']),
    assist: nf(ltc.assistive.amount),
    assist2: nf(ltc.assistive.group2.amount),
    assist2Since: ltc.assistive.group2.since,
    resp1: nf(ltc.respite.yearly[0].amount),
    resp2: nf(ltc.respite.yearly[1].amount),
    resMonthly: nf(ltc.residential.monthlyMax),
    resYearly: nf(ltc.residential.yearlyMax),
    rate: (nhi.premiumRate * 100).toFixed(2),
    supp: (nhi.supplementaryRate * 100).toFixed(2),
    gmin: nf(nhi.grades[0]),
    gmax: nf(nhi.grades[nhi.grades.length - 1]),
    gn: nhi.grades.length,
    maxDeps: nhi.maxDependents,
    avg: nhi.avgDependents,
    exSalary: nf(45800),
    exSelf: nf(ex.insuredTotal),
    regAvg: nf(nhi.regional.averagePremium),
    regSelf: nf(Math.round(nhi.regional.averagePremium * nhi.regional.insured)),
    suppTh: nf(nhi.supplementary.singleThreshold),
    minWage: nf(nhi.supplementary.partTimeThreshold),
    bonusM: nhi.supplementary.bonusMultiple,
    exDiv: nf(
      calcSupplementary(nhi as any, { kind: 'dividend', amount: 50000 })
        .premium,
    ),
  };
}

export function fillVars(
  s: string,
  vars: Record<string, string | number>,
): string {
  return Object.entries(vars).reduce(
    (a, [k, v]) => a.split(`{${k}}`).join(String(v)),
    s,
  );
}
