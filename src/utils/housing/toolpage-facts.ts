/**
 * toolpage-facts.ts：四個試算工具單獨頁／內嵌板的「事實」層。
 *
 * 文案（src/i18n/housing-toolpages.ts）只帶 {佔位符}，數字在這裡於建置時算出或讀出：
 *   - 條件與利率：src/data/housing/qingan.json
 *   - 官方對照值與四級門檻：src/data/housing/calc-fixtures.json
 *   - 月付與利息：mortgage.ts 的 computeMortgage，預設案例取自 tool-models.ts 的 *Defaults
 * 輸出的字串格式與工具元件用同一組 format.ts，頁面上前後讀到的數字逐字一致。
 * 只在 .astro frontmatter 內 import（需要 JSON 與 vite 解析）。
 */
import qingan from '../../data/housing/qingan.json';
import fixtures from '../../data/housing/calc-fixtures.json';
import { computeMortgage, affordabilityBand } from './mortgage.ts';
import type { MortgageInput } from './mortgage.ts';
import { qinganRateStages } from './qingan.ts';
import {
  fill,
  fmtNTD,
  fmtPercent,
  fmtRate,
  fmtWan,
  fmtYearsMonths,
} from './format.ts';
import {
  mortgageDefaults,
  mortgageView,
  periodLabel,
  rentBuyDefaults,
  rentBuyView,
  type AffordabilityFixtures,
  type Ctx,
  type QinganData,
} from './tool-models.ts';
import type { HousingToolPages } from '../../i18n/housing-toolpages.ts';

export type FactVars = Record<string, string | number>;
export interface FactSource {
  agency: string;
  title: string;
  url: string;
  date: string;
}
export type ToolKey = 'mortgage' | 'affordability' | 'qingan' | 'rentBuy';

const q = qingan as unknown as QinganData;
const fx = fixtures as unknown as AffordabilityFixtures;
const fxAny = fixtures as any;

/** 範例貸款的固定參數：年限與提前還款是示範用的假設，金額與利率取自工具預設案例。 */
const EXAMPLE_YEARS = 30;
const PREPAY_MONTH = 60;
const PREPAY_AMOUNT = 2_000_000;

const isZh = (lang: string): boolean => lang === 'zh-TW';
const plain = (v: number): string => String(Number(v.toFixed(3)));

export function makeCtx(lang: string, labels: Record<string, string>): Ctx {
  return { lang, labels, qingan: q, fixtures: fx, toolsPath: '' };
}

/** 各工具頁「資料來源」清單，跟工具元件裡的清單同一批。 */
export function toolSources(tool: ToolKey): FactSource[] {
  const qs = (...keys: string[]): FactSource[] =>
    keys.map((k) => {
      const s = (q.sources as any)[k];
      return { agency: s.agency, title: s.title, url: s.url, date: q.asOf };
    });
  const moi: FactSource = {
    agency: '內政部不動產資訊平台',
    title: fxAny.officialAffordability.sourceTitle,
    url: fxAny.officialAffordability.sourceUrl,
    date: fxAny.asOf,
  };
  switch (tool) {
    case 'mortgage':
      return [...qs('v3Release', 'principles'), moi];
    case 'affordability':
      return [
        moi,
        {
          agency: fxAny.affordabilityBandsSource.agency,
          title: fxAny.affordabilityBandsSource.title,
          url: fxAny.affordabilityBandsSource.url,
          date: fxAny.asOf,
        },
      ];
    case 'qingan':
      return qs('principles', 'faq', 'v3Release');
    case 'rentBuy':
      return [moi];
  }
}

/** 內嵌板底部一行：機關名（去重）加最新的截止日。 */
export function embedSourceNote(
  tool: ToolKey,
  lang: string,
  pages: HousingToolPages,
): string {
  const srcs = toolSources(tool);
  const agencies = [...new Set(srcs.map((s) => s.agency))].join(
    isZh(lang) ? '、' : ', ',
  );
  const asOf = srcs.map((s) => s.date).sort()[srcs.length - 1] ?? q.asOf;
  return fill(pages.common.embedSourceNote, { agencies, asOf });
}

function mortgageFacts(ctx: Ctx, pages: HousingToolPages): FactVars {
  const lang = ctx.lang;
  const d = mortgageDefaults(ctx);
  const amount = Number(d.amount) * 10000;
  const years = Number(d.years);
  const graceYears = Number(d.grace);
  const stages = qinganRateStages(q);

  const demo = computeMortgage({
    principal: amount,
    years,
    graceMonths: graceYears * 12,
    stages,
  });
  const gm = graceYears * 12;
  const graceStart = demo.schedule[0].payment;
  const graceEnd = demo.schedule[gm - 1].payment;

  // 與房貸試算元件的預設畫面核對：寬限期內第一期、寬限期結束後第一期、最高月付
  const view = mortgageView(d, ctx);
  if (
    view.text.gracePayment &&
    view.text.maxPayment !== fmtNTD(demo.maxPayment, lang)
  ) {
    throw new Error('toolpage-facts: 預設案例最高月付與房貸試算畫面不一致');
  }

  // 月付方式比較：同一筆 1,000 萬、30 年、官方利率、無寬限期
  const rate = fx.officialAffordability.annualRatePct;
  const base: MortgageInput = {
    principal: amount,
    years: EXAMPLE_YEARS,
    stages: [{ months: 0, annualRatePct: rate }],
  };
  const annuity = computeMortgage(base);
  const equal = computeMortgage({ ...base, method: 'equalPrincipal' });
  if (!(equal.totalInterest < annuity.totalInterest)) {
    throw new Error('toolpage-facts: 本金平均總利息應低於本息平均');
  }

  // 提前還款：第 60 期後提前還 200 萬，兩種模式
  const shorten = computeMortgage({
    ...base,
    prepayments: [
      { month: PREPAY_MONTH, amount: PREPAY_AMOUNT, mode: 'shortenTerm' },
    ],
  });
  const reduce = computeMortgage({
    ...base,
    prepayments: [
      { month: PREPAY_MONTH, amount: PREPAY_AMOUNT, mode: 'reducePayment' },
    ],
  });
  if (!(shorten.totalInterest < reduce.totalInterest)) {
    throw new Error('toolpage-facts: 縮短年限的總利息應低於降低月付');
  }

  // 青安 3.0 利率階梯
  const r = q.rate as typeof q.rate & {
    benchmark: { pct: number; name: string };
    spreadPct: number;
  };
  const finite = r.subsidySteps.filter((s) => s.years !== null);
  if (Math.abs(r.benchmark.pct + r.spreadPct - r.baseRatePct) > 1e-9) {
    throw new Error('toolpage-facts: 青安基準利率加碼不等於補貼前利率');
  }

  const apr = fxAny.aprCases[0];
  return {
    asOf: q.asOf,
    rateFirst: fmtRate(stages[0].annualRatePct),
    amount: fmtWan(amount, lang),
    years,
    graceYears,
    graceStart: fmtNTD(graceStart, lang),
    graceEnd: fmtNTD(graceEnd, lang),
    afterGrace: fmtNTD(demo.firstAmortizingPayment, lang),
    maxPay: fmtNTD(demo.maxPayment, lang),
    years2: EXAMPLE_YEARS,
    rate: fmtRate(rate),
    period: periodLabel(fx, lang),
    annuityPay: fmtNTD(annuity.schedule[0].payment, lang),
    annuityInterest: fmtNTD(annuity.totalInterest, lang),
    equalFirst: fmtNTD(equal.schedule[0].payment, lang),
    equalLast: fmtNTD(equal.schedule[equal.schedule.length - 1].payment, lang),
    equalInterest: fmtNTD(equal.totalInterest, lang),
    prepayYear: PREPAY_MONTH / 12,
    prepayAmount: fmtWan(PREPAY_AMOUNT, lang),
    basePay: fmtNTD(annuity.schedule[0].payment, lang),
    baseInterest: fmtNTD(annuity.totalInterest, lang),
    shortenPayoff: fmtYearsMonths(shorten.payoffMonth, lang),
    shortenInterest: fmtNTD(shorten.totalInterest, lang),
    reducePay: fmtNTD(reduce.schedule[PREPAY_MONTH].payment, lang),
    reduceInterest: fmtNTD(reduce.totalInterest, lang),
    benchmarkName: pages.common.benchmarkName,
    benchmark: plain(r.benchmark.pct),
    spread: plain(r.spreadPct),
    baseRate: plain(r.baseRatePct),
    subsidyFirst: plain(r.subsidySteps[0].subsidyPct),
    yearsFirst: finite[0].years as number,
    stepsText: stages.map((s) => fmtRate(s.annualRatePct)).join(' → '),
    fullFromYear: finite.reduce((n, s) => n + (s.years as number), 0) + 1,
    aprBank: pages.common.aprBankName,
    aprPrincipal: fmtWan(apr.input.principal, lang),
    aprYears: apr.input.years,
    aprFees: fmtNTD(apr.fees, lang),
  };
}

function affordabilityFacts(ctx: Ctx): FactVars {
  const lang = ctx.lang;
  const o = fxAny.officialAffordability;
  const bands = fx.affordabilityBands;
  const L = (k: string): string => ctx.labels[k] ?? k;
  const counties = fx.officialAffordability.rows.filter(
    (r) => r.name !== '全國',
  );
  const sorted = [...counties].sort(
    (a, b) => b.priceToIncome - a.priceToIncome,
  );
  const hi = sorted[0];
  const lo = sorted[sorted.length - 1];
  const countyName = (n: string): string => L(`county.${n}`);
  const nationBand = affordabilityBand(o.nation.burdenPct, bands);
  const keys = bands.map((b) => b.key);
  return {
    countyCount: counties.length,
    period: periodLabel(fx, lang),
    burden: fmtPercent(o.nation.burdenPct),
    p2i: plain(o.nation.priceToIncome),
    band1: plain(bands[0].max as number),
    band2: plain(bands[1].max as number),
    band3: plain(bands[2].max as number),
    name1: L(`band.${keys[0]}`),
    name2: L(`band.${keys[1]}`),
    name3: L(`band.${keys[2]}`),
    name4: L(`band.${keys[3]}`),
    nationBand: L(`band.${nationBand}`),
    officialYears: o.years,
    officialLtv: fmtPercent(o.ltv * 100, 0),
    officialRate: fmtRate(o.annualRatePct),
    medianPrice: fmtWan(o.nation.medianPrice, lang),
    medianIncome: fmtNTD(o.nation.medianHouseholdIncome, lang),
    maxName: countyName(hi.name),
    maxP2i: plain(hi.priceToIncome),
    minName: countyName(lo.name),
    minP2i: plain(lo.priceToIncome),
    asOf: fxAny.asOf,
  };
}

function qinganFacts(ctx: Ctx, pages: HousingToolPages): FactVars {
  const lang = ctx.lang;
  const c = q.current as any;
  if (!c.ageAtApplicationExclusive) {
    throw new Error('toolpage-facts: 年齡上限應為「未滿」');
  }
  const v3 = (q as any).naming.find((n: any) => n.id === 'v3');
  const once = (q as any).timeline.find((t: any) =>
    String(t.event).includes('限貸一次'),
  );
  const L = (k: string): string => ctx.labels[k] ?? k;
  // 房價上限：同一個金額的縣市併成一行，default 併成「其他縣市」
  const groups = new Map<number, string[]>();
  for (const [name, cap] of Object.entries(
    c.priceCaps as Record<string, number>,
  )) {
    const label =
      name === 'default' ? pages.common.capOther : L(`county.${name}`);
    groups.set(cap, [...(groups.get(cap) ?? []), label]);
  }
  const joinNames = (xs: string[]): string => xs.join(isZh(lang) ? '、' : ', ');
  const capLines = [...groups.entries()]
    .sort((a, b) => b[0] - a[0])
    .map(([cap, names]) => `${joinNames(names)} ${fmtWan(cap, lang)}`)
    .join(isZh(lang) ? '；' : '; ');
  return {
    asOf: q.asOf,
    v3From: v3.from,
    maxAge: c.maxAgeAtApplication,
    ageTerm: c.agePlusTermMax,
    income: fmtWan(c.maxBorrowerAnnualIncome, lang),
    onceOnlySince: c.onceOnlySince,
    onceOnlyDate: once.date,
    shareSqm: c.minShareExemptSqm,
    purchaseMonths: c.purchasedWithinMonths,
    capLines,
    limitGeneral: fmtWan(c.limits.general, lang),
    limitNewlywed: fmtWan(c.limits.newlywed, lang),
    newlywedYears: c.newlywedWithinYears,
    limitChild: fmtWan(c.limits.withMinorChild, lang),
    maxYears: c.maxYears,
    graceYears: c.maxGraceMonths / 12,
    maxLtv: fmtPercent(c.maxLtv * 100, 0),
  };
}

function rentBuyFacts(ctx: Ctx): FactVars {
  const lang = ctx.lang;
  const d = rentBuyDefaults(ctx);
  const view = rentBuyView(d, ctx);
  return {
    price: fmtWan(Number(d.price) * 10000, lang),
    down: fmtWan(Number(d.down) * 10000, lang),
    loanYears: d.years,
    rate: fmtRate(Number(d.rate)),
    rent: fmtNTD(Number(d.rent), lang),
    horizon: d.horizon,
    growth: d.growth,
    rentGrowth: d.rentGrowth,
    invest: d.invest,
    buyCost: d.buyCost,
    holdCost: d.holdCost,
    sellCost: d.sellCost,
    endBuy: view.text.endBuy,
    endRent: view.text.endRent,
  };
}

/** 某工具頁用到的全部佔位值。 */
export function toolFacts(
  tool: ToolKey,
  ctx: Ctx,
  pages: HousingToolPages,
): FactVars {
  switch (tool) {
    case 'mortgage':
      return mortgageFacts(ctx, pages);
    case 'affordability':
      return affordabilityFacts(ctx);
    case 'qingan':
      return qinganFacts(ctx, pages);
    case 'rentBuy':
      return rentBuyFacts(ctx);
  }
}

/** 填佔位；填完還留下 {xxx} 就當建置錯誤，避免把半成品文案發出去。 */
export function fillStrict(tpl: string, vars: FactVars, where: string): string {
  const out = fill(tpl, vars);
  const left = out.match(/\{\w+\}/g);
  if (left) {
    throw new Error(
      `toolpage-facts: ${where} 還有未填的佔位 ${left.join(' ')}`,
    );
  }
  return out;
}

/**
 * 專題串進來的兩篇既有文章。中文版用中文路徑，其他語言的檔名都是英文 slug
 * （knowledge/<lang>/Society/ 下同名）。
 */
const ARTICLE_SLUGS = {
  justice: { zh: '/society/居住正義/', other: 'housing-justice-taiwan' },
  national: { zh: '/society/國宅與居住正義/', other: 'public-housing-justice' },
} as const;

export function articleHref(lang: string, key: 'justice' | 'national'): string {
  const a = ARTICLE_SLUGS[key];
  return isZh(lang) ? a.zh : `/${lang}/society/${a.other}/`;
}

/** 工具 slug 對到 src/i18n/housing.ts 裡 housing.tool.<key>.title 的 key。 */
export function toolLabelKey(slug: string): string {
  const map: Record<string, string> = {
    'mortgage-calculator': 'mortgage',
    'affordability-check': 'afford',
    'qingan-eligibility': 'elig',
    'rent-vs-buy': 'rentbuy',
  };
  return map[slug] ?? slug;
}
