/**
 * home-facts.ts — 主頁多章共用的幾個事實（全部由資料檔算出，build 時一次）。
 */
import affordability from '../../data/housing/affordability.json';
import {
  DATA,
  fmtPeriod,
  getSeries,
  latest,
  nextQuarter,
  trimNum,
} from './data';

export interface BandLevel {
  id: string;
  label: { zh: string; en: string };
  min: number | null;
  max: number | null;
}
export const BAND_LEVELS = (affordability as any).bands.levels as BandLevel[];

/** 房貸負擔率落在官方四級的哪一級（min 含、max 不含）。 */
export function bandOf(v: number): BandLevel {
  return (
    BAND_LEVELS.find(
      (b) => (b.min === null || v >= b.min) && (b.max === null || v < b.max),
    ) ?? BAND_LEVELS[0]
  );
}

export function homeFacts(lang: string) {
  const ptiS = getSeries('affordability', 'price-to-income-national');
  const burS = getSeries('affordability', 'mortgage-burden-national');
  const ptiTp = getSeries('affordability', 'price-to-income-taipei');
  const burTp = getSeries('affordability', 'mortgage-burden-taipei');
  const pti = latest(ptiS);
  const bur = latest(burS);
  const q: any = DATA.qingan;
  const steps = q.rate.subsidySteps as {
    years: number | null;
    subsidyPct: number;
    netRatePct: number;
  }[];
  const finite = steps.filter((s) => s.years !== null);
  const firstStep = steps[0];
  const stepPct = +(steps[0].subsidyPct - steps[1].subsidyPct).toFixed(4);
  const lastYr = finite.reduce((a, s) => a + (s.years as number), 0) + 1;
  return {
    ptiS,
    burS,
    ptiTp,
    burTp,
    pti,
    bur,
    period: fmtPeriod(pti.t, lang),
    periodT: pti.t,
    year: pti.t.slice(0, 4),
    level: bandOf(bur.v),
    nextPeriodT: nextQuarter(pti.t),
    steps,
    firstStep,
    stepPct,
    openYear: lastYr,
    baseRate: q.rate.baseRatePct as number,
    firstYears: firstStep.years as number,
    rateStr: (n: number) => trimNum(n, 3),
  };
}
