/**
 * tool-models.ts — 四個試算工具的「檢視模型」（純函式，無 DOM）
 *
 * 輸入：欄位字串（Values）＋情境資料（Ctx）。輸出：文字、HTML 片段、顯示開關、連結。
 * 伺服端用預設欄位值算一次直接輸出（沒有 JS 也看得到結果）；
 * 瀏覽器端每次輸入變動再算一次，把同樣格式的結果寫回同樣的標記。
 * 公式在 mortgage.ts／qingan.ts，數字條件在 src/data/housing/*.json，這裡只負責組裝與排版。
 * 文案由呼叫端傳入 ctx.labels（鍵為去掉 housing.tool. 前綴的名稱），這裡不含自然語言。
 */
import {
  affordabilityBand,
  annuityPayment,
  compareRentVsBuy,
  computeMortgage,
  debtServiceRatio,
  principalForPayment,
  priceToIncome,
} from './mortgage.ts';
import type { MortgageInput, ScheduleRow } from './mortgage.ts';
import {
  checkQinganEligibility,
  qinganRateStages,
  remainingLoanInput,
} from './qingan.ts';
import type {
  EligibilityAnswers,
  EligibilityCheck,
  HomeStatus,
  LimitClass,
  QinganConfig,
} from './qingan.ts';
import {
  escapeHtml,
  fill,
  fmtAxisMoney,
  fmtNTD,
  fmtNum,
  fmtPercent,
  fmtPeriods,
  fmtRate,
  paren,
  fmtWan,
} from './format.ts';
import {
  dualChart,
  netWorthLines,
  paymentLines,
  ratioRuler,
  repaymentChart,
} from './chart.ts';
import type { PaySeries, RulerMarker, YearRow } from './chart.ts';

export type Values = Record<string, string>;

export interface ToolView {
  text: Record<string, string>;
  html: Record<string, string>;
  show: Record<string, boolean>;
  href: Record<string, string>;
}

export interface SourceRef {
  agency: string;
  title: string;
  url: string;
  kind?: string;
}

export type QinganData = QinganConfig & {
  sources: Record<string, SourceRef>;
  generations: Record<string, string>[];
};

export interface AffordabilityFixtures {
  affordabilityBands: { key: string; max: number | null }[];
  officialAffordability: {
    period: string;
    periodCe: string;
    years: number;
    ltv: number;
    annualRatePct: number;
    rows: {
      name: string;
      burdenPct: number;
      priceToIncome: number;
      smallSample: boolean;
    }[];
  };
}

export interface Ctx {
  lang: string;
  /** 文案字典，鍵為去掉 housing.tool. 前綴的名稱 */
  labels: Record<string, string>;
  qingan: QinganData;
  fixtures: AffordabilityFixtures;
  /** 房貸試算頁自己的路徑（含語言前綴），青安資格自查用來組連結 */
  toolsPath?: string;
  /** 目前年月 YYYY-MM；青安 2.0 既有貸戶換算已撥貸月數用，預設取資料截止日 */
  today?: string;
}

/** 各工具的網址查詢參數前綴，同頁多個工具互不干擾。 */
export const PARAM_PREFIX = {
  mortgage: 'mc',
  afford: 'af',
  elig: 'qe',
  rentbuy: 'rb',
} as const;

/** 青安縣市下拉的順序與名稱（價格上限數字讀 qingan.json，不在這裡）。 */
export const QINGAN_COUNTIES: readonly string[] = [
  '臺北市',
  '新北市',
  '桃園市',
  '臺中市',
  '臺南市',
  '高雄市',
  '基隆市',
  '新竹市',
  '新竹縣',
  '苗栗縣',
  '彰化縣',
  '南投縣',
  '雲林縣',
  '嘉義市',
  '嘉義縣',
  '屏東縣',
  '宜蘭縣',
  '花蓮縣',
  '臺東縣',
  '澎湖縣',
  '金門縣',
  '連江縣',
];

// ── 共用小工具 ──────────────────────────────────────────────────────

const mkL =
  (ctx: Ctx) =>
  (k: string): string =>
    ctx.labels[k] ?? k;

const opt = (v: Values, k: string): number | undefined => {
  const x = parseFloat(v[k] ?? '');
  return Number.isFinite(x) ? x : undefined;
};
const num = (v: Values, k: string, d: number): number => opt(v, k) ?? d;

const WAN = 10000;

function table(headers: string[], rows: string[][], cls = 'hst-table'): string {
  const head = headers.map((h) => `<th scope="col">${escapeHtml(h)}</th>`);
  const body = rows.map(
    (r) =>
      `<tr>${r
        .map((c, i) =>
          i === 0
            ? `<th scope="row">${escapeHtml(c)}</th>`
            : `<td>${escapeHtml(c)}</td>`,
        )
        .join('')}</tr>`,
  );
  return (
    `<table class="${cls}"><thead><tr>${head.join('')}</tr></thead>` +
    `<tbody>${body.join('')}</tbody></table>`
  );
}

function emptyView(): ToolView {
  return { text: {}, html: {}, show: {}, href: {} };
}

function errorView(
  message: string,
  extraShow: Record<string, boolean> = {},
): ToolView {
  const v = emptyView();
  v.text.error = message;
  v.show = { result: false, error: true, ...extraShow };
  return v;
}

export function periodLabel(fx: AffordabilityFixtures, lang: string): string {
  const ce = fx.officialAffordability.periodCe; // 例：2026Q1
  const roc = fx.officialAffordability.period; // 例：115Q1
  const q = roc.split('Q')[1];
  if (lang === 'zh-TW') return `${roc.split('Q')[0]} 年第 ${q} 季`;
  return `${ce.split('Q')[0]} Q${q}`;
}

// ── 一、房貸試算 ────────────────────────────────────────────────────

export function mortgageDefaults(ctx: Ctx): Values {
  const rate = String(ctx.fixtures.officialAffordability.annualRatePct);
  return {
    scenario: 'qingan3',
    limitClass: 'general',
    amount: '1000',
    years: '40',
    grace: '5',
    method: 'annuity',
    rate1: rate,
    len1: '0',
    rate2: '',
    len2: '0',
    rate3: '',
    drawMonth: '2024-08',
    compare: '0',
    cmpRate: rate,
    prepayMonth: '',
    prepayAmount: '',
    prepayMode: 'shortenTerm',
  };
}

export interface PayStep {
  fromMonth: number;
  toMonth: number;
  annualRatePct: number;
  inGrace: boolean;
  first: number;
  last: number;
}

/** 把逐期表依「利率＋是否在寬限期」分段，供月付階梯表使用。 */
export function paymentSteps(
  schedule: ScheduleRow[],
  graceMonths: number,
): PayStep[] {
  const out: PayStep[] = [];
  for (const row of schedule) {
    const inGrace = row.month <= graceMonths;
    const cur = out[out.length - 1];
    if (
      cur &&
      cur.annualRatePct === row.annualRatePct &&
      cur.inGrace === inGrace
    ) {
      cur.toMonth = row.month;
      cur.last = row.payment;
    } else {
      out.push({
        fromMonth: row.month,
        toMonth: row.month,
        annualRatePct: row.annualRatePct,
        inGrace,
        first: row.payment,
        last: row.payment,
      });
    }
  }
  return out;
}

export interface YearTotals extends YearRow {
  total: number;
}

/** 逐期表彙整成逐年：還款總額、利息、本金（含提前還款）、年底餘額。 */
export function yearlyRows(schedule: ScheduleRow[]): YearTotals[] {
  const out: YearTotals[] = [];
  for (const row of schedule) {
    const year = Math.ceil(row.month / 12);
    let cur = out[out.length - 1];
    if (!cur || cur.year !== year) {
      cur = { year, principal: 0, interest: 0, balance: 0, total: 0 };
      out.push(cur);
    }
    cur.interest += row.interest;
    cur.principal += row.principalPaid + row.prepaid;
    cur.total += row.payment + row.prepaid;
    cur.balance = row.balance;
  }
  return out;
}

interface Loan {
  input: MortgageInput;
  warnings: string[];
  elapsed: number | null;
}

function monthIndex(ym: string): number | null {
  const m = /^(\d{4})-(\d{2})$/.exec(ym);
  return m ? Number(m[1]) * 12 + Number(m[2]) : null;
}

function buildLoan(v: Values, ctx: Ctx, defaultRate: number): Loan {
  const L = mkL(ctx);
  const q = ctx.qingan;
  const scenario = v.scenario ?? 'qingan3';
  const principal = num(v, 'amount', 0) * WAN;
  const years = num(v, 'years', 0);
  const graceMonths = Math.max(0, Math.round(num(v, 'grace', 0) * 12));
  const method = v.method === 'equalPrincipal' ? 'equalPrincipal' : 'annuity';
  const warnings: string[] = [];

  const prepayments: MortgageInput['prepayments'] = [];
  const pm = opt(v, 'prepayMonth');
  const pa = opt(v, 'prepayAmount');
  if (pm !== undefined && pa !== undefined && pa > 0) {
    prepayments.push({
      month: Math.round(pm),
      amount: pa * WAN,
      mode: v.prepayMode === 'reducePayment' ? 'reducePayment' : 'shortenTerm',
    });
  }

  if (scenario === 'qingan2') {
    const total = Math.round(years * 12);
    const nowIdx = monthIndex(ctx.today ?? q.asOf.slice(0, 7));
    const drawIdx = monthIndex(v.drawMonth ?? '');
    if (nowIdx === null || drawIdx === null) throw new RangeError('drawMonth');
    const elapsed = Math.max(0, nowIdx - drawIdx);
    if (drawIdx > nowIdx) warnings.push(L('mortgage.warn.drawFuture'));
    if (elapsed >= total) throw new RangeError('elapsed');
    const rest = remainingLoanInput(q, {
      principal,
      years,
      graceMonths,
      elapsedMonths: elapsed,
    });
    return {
      input: { ...rest, method, prepayments },
      warnings,
      elapsed,
    };
  }

  if (scenario === 'qingan3') {
    const c = q.current;
    const cls = (v.limitClass ?? 'general') as LimitClass;
    const limit = c.limits[cls] ?? c.limits.general;
    if (principal > limit)
      warnings.push(
        fill(L('mortgage.warn.limit'), { limit: fmtWan(limit, ctx.lang) }),
      );
    if (years > c.maxYears)
      warnings.push(fill(L('mortgage.warn.years'), { max: c.maxYears }));
    if (graceMonths > c.maxGraceMonths)
      warnings.push(
        fill(L('mortgage.warn.grace'), { max: c.maxGraceMonths / 12 }),
      );
    return {
      input: {
        principal,
        years,
        graceMonths,
        method,
        stages: qinganRateStages(q),
        prepayments,
      },
      warnings,
      elapsed: null,
    };
  }

  // 一般房貸：最多三段利率；持續年數為 0 代表「一直到還清」
  const r1 = num(v, 'rate1', defaultRate);
  const r2 = num(v, 'rate2', r1);
  const r3 = num(v, 'rate3', r2);
  const len1 = num(v, 'len1', 0);
  const len2 = num(v, 'len2', 0);
  const stages: MortgageInput['stages'] = [
    { months: Math.round(len1 * 12), annualRatePct: r1 },
  ];
  if (len1 > 0) {
    stages.push({ months: Math.round(len2 * 12), annualRatePct: r2 });
    if (len2 > 0) stages.push({ months: 0, annualRatePct: r3 });
  }
  return {
    input: { principal, years, graceMonths, method, stages, prepayments },
    warnings,
    elapsed: null,
  };
}

function rangeText(
  a: number,
  b: number,
  ctx: Ctx,
  fmt: (x: number, lang: string) => string,
): string {
  const L = mkL(ctx);
  return Math.abs(a - b) < 0.5
    ? fmt(a, ctx.lang)
    : fill(L('common.range'), { a: fmt(a, ctx.lang), b: fmt(b, ctx.lang) });
}

export function mortgageView(v: Values, ctx: Ctx): ToolView {
  const L = mkL(ctx);
  const lang = ctx.lang;
  const defaultRate = ctx.fixtures.officialAffordability.annualRatePct;
  let loan: Loan;
  let res;
  try {
    loan = buildLoan(v, ctx, defaultRate);
    res = computeMortgage(loan.input);
  } catch (e) {
    const msg = e instanceof Error ? e.message : '';
    const codes = /:\s*(.+)$/.exec(msg)?.[1]?.split(',') ?? [msg];
    const text = codes
      .map((c) => ctx.labels[`mortgage.err.${c.trim()}`] ?? '')
      .filter(Boolean);
    return errorView(text.length ? text.join('；') : L('mortgage.err.generic'));
  }

  const input = loan.input;
  const graceMonths = input.graceMonths ?? 0;
  const steps = paymentSteps(res.schedule, graceMonths);
  const view = emptyView();

  const isQ2 = (v.scenario ?? 'qingan3') === 'qingan2';
  view.text.amountLabel = L(
    isQ2 ? 'mortgage.f.amount.qingan2' : 'mortgage.f.amount',
  );
  view.text.principalLabel = L(
    isQ2 ? 'mortgage.stat.principal.qingan2' : 'mortgage.stat.principal',
  );

  // 結果數字
  const graceSteps = steps.filter((s) => s.inGrace);
  view.text.principal = fmtWan(input.principal, lang);
  view.text.gracePayment =
    res.gracePayment === null
      ? L('mortgage.noGrace')
      : rangeText(
          Math.min(...graceSteps.map((s) => s.first)),
          Math.max(...graceSteps.map((s) => s.first)),
          ctx,
          fmtNTD,
        );
  view.text.afterGrace = fmtNTD(res.firstAmortizingPayment, lang);
  view.text.maxPayment = fmtNTD(res.maxPayment, lang);
  view.text.totalInterest = fmtNTD(res.totalInterest, lang);
  view.text.totalPaid = fmtNTD(res.totalPaid, lang);
  view.text.payoff = fmtPeriods(res.payoffMonth, lang);
  view.text.rateNow = (() => {
    const first = res.schedule[0].annualRatePct;
    const lastRate = res.schedule[res.schedule.length - 1].annualRatePct;
    return first === lastRate
      ? fmtRate(first)
      : fill(L('common.range'), {
          a: fmtRate(first),
          b: fmtRate(lastRate),
        });
  })();

  // 月付階梯表
  view.html.steps = table(
    [
      L('mortgage.steps.range'),
      L('mortgage.steps.rate'),
      L('mortgage.steps.payment'),
    ],
    steps.map((s) => [
      fill(L('mortgage.steps.rangeCell'), { a: s.fromMonth, b: s.toMonth }) +
        (s.inGrace ? paren(L('mortgage.steps.grace'), lang) : ''),
      fmtRate(s.annualRatePct),
      Math.abs(s.first - s.last) < 0.5
        ? fmtNTD(s.first, lang)
        : fill(L('common.arrow'), {
            a: fmtNTD(s.first, lang),
            b: fmtNTD(s.last, lang),
          }),
    ]),
    'hst-table hst-table-steps',
  );

  // 逐年攤還表與長條圖
  const years = yearlyRows(res.schedule);
  view.html.yearly = table(
    [
      L('mortgage.yearly.year'),
      L('mortgage.yearly.total'),
      L('mortgage.yearly.interest'),
      L('mortgage.yearly.principal'),
      L('mortgage.yearly.balance'),
    ],
    years.map((y) => [
      String(y.year),
      fmtNTD(y.total, lang),
      fmtNTD(y.interest, lang),
      fmtNTD(y.principal, lang),
      fmtNTD(y.balance, lang),
    ]),
    'hst-table hst-table-yearly',
  );
  view.text.chartATitle = fill(L('mortgage.chartA.take'), {
    interest: fmtWan(res.totalInterest, lang),
    share: `${fmtNum((res.totalInterest / res.totalPaid) * 100, 0)}%`,
  });
  view.html.chartA = dualChart((W) =>
    repaymentChart({
      rows: years,
      startBalance: input.principal,
      W,
      title: view.text.chartATitle,
      desc: L('mortgage.chartA.desc'),
      labels: {
        principal: L('mortgage.chart.principal'),
        interest: L('mortgage.chart.interest'),
        balance: L('mortgage.chart.balance'),
        axisLeft: L('mortgage.chartA.axisLeft'),
        axisRight: L('mortgage.chartA.axisRight'),
        year: L('mortgage.chart.year'),
      },
      fmtY: (x) => fmtAxisMoney(x, lang),
    }),
  );

  // 對照情境
  let cmp: ReturnType<typeof computeMortgage> | null = null;
  const cmpRate = num(v, 'cmpRate', defaultRate);
  if (v.compare === '1') {
    cmp = computeMortgage({
      ...input,
      stages: [{ months: 0, annualRatePct: cmpRate }],
    });
  }

  // 月付曲線標題：抓出最大的一次跳升當結論句
  let jump: { year: number; a: number; b: number } | null = null;
  for (let i = 1; i < steps.length; i++) {
    const a = steps[i - 1].last;
    const b = steps[i].first;
    if (b / a >= 1.05 && (!jump || b / a > jump.b / jump.a))
      jump = { year: Math.ceil(steps[i].fromMonth / 12), a, b };
  }
  view.text.chartBTitle = jump
    ? fill(L('mortgage.chartB.takeJump'), {
        year: jump.year,
        a: fmtNTD(jump.a, lang),
        b: fmtNTD(jump.b, lang),
      })
    : fill(L('mortgage.chartB.takeFlat'), {
        a: fmtNTD(Math.min(...res.schedule.map((r) => r.payment)), lang),
        b: fmtNTD(res.maxPayment, lang),
      });
  const scenarioName = L(`mortgage.scn.${v.scenario ?? 'qingan3'}`);
  const series: PaySeries[] = [
    {
      label: scenarioName,
      cls: 'a' as const,
      points: res.schedule.map((r) => ({ month: r.month, payment: r.payment })),
    },
  ];
  if (cmp) {
    series.push({
      label: `${L('mortgage.cmp.name')} ${fmtRate(cmpRate)}`,
      cls: 'b' as const,
      points: cmp.schedule.map((r) => ({ month: r.month, payment: r.payment })),
    });
  }
  const totalMonths = Math.max(res.payoffMonth, cmp ? cmp.payoffMonth : 0);
  view.html.chartB = dualChart((W) =>
    paymentLines({
      series,
      totalMonths,
      W,
      title: view.text.chartBTitle,
      desc: L('mortgage.chartB.desc'),
      axisLeft: L('mortgage.chartB.axisLeft'),
      axisBottom: L('mortgage.chart.year'),
      fmtY: (x) => fmtAxisMoney(x, lang),
    }),
  );

  if (cmp) {
    const diff = res.totalInterest - cmp.totalInterest;
    view.text.cmpTake = fill(
      L(diff <= 0 ? 'mortgage.cmp.less' : 'mortgage.cmp.more'),
      { amount: fmtWan(Math.abs(diff), lang), name: scenarioName },
    );
    view.html.cmpTable = table(
      [
        L('mortgage.cmp.col.scenario'),
        L('mortgage.cmp.col.first'),
        L('mortgage.cmp.col.max'),
        L('mortgage.cmp.col.interest'),
      ],
      [
        [
          scenarioName,
          fmtNTD(res.schedule[0].payment, lang),
          fmtNTD(res.maxPayment, lang),
          fmtWan(res.totalInterest, lang),
        ],
        [
          `${L('mortgage.cmp.name')} ${fmtRate(cmpRate)}`,
          fmtNTD(cmp.schedule[0].payment, lang),
          fmtNTD(cmp.maxPayment, lang),
          fmtWan(cmp.totalInterest, lang),
        ],
      ],
      'hst-table hst-table-cmp',
    );
  }

  if (loan.elapsed !== null) {
    view.text.elapsedNote = fill(L('mortgage.elapsedNote'), {
      n: loan.elapsed,
      bal: fmtWan(input.principal, lang),
      left: fmtPeriods(Math.round(input.years * 12), lang),
    });
  }
  view.html.warnings = `<ul>${loan.warnings
    .map((w) => `<li>${escapeHtml(w)}</li>`)
    .join('')}</ul>`;
  view.show = {
    result: true,
    error: false,
    cmp: cmp !== null,
    warnings: loan.warnings.length > 0,
    elapsed: loan.elapsed !== null,
  };
  return view;
}

// ── 二、負擔能力自查 ────────────────────────────────────────────────

export function affordabilityDefaults(ctx: Ctx): Values {
  return {
    mode: 'official',
    county: '',
    price: '966',
    income: '101.97',
    down: '290',
    rate: String(ctx.fixtures.officialAffordability.annualRatePct),
    years: '30',
  };
}

export function affordabilityView(v: Values, ctx: Ctx): ToolView {
  const L = mkL(ctx);
  const lang = ctx.lang;
  const fx = ctx.fixtures.officialAffordability;
  const bands = ctx.fixtures.affordabilityBands;
  const official = v.mode !== 'mine';
  const price = num(v, 'price', NaN) * WAN;
  const income = num(v, 'income', NaN) * WAN;
  const down = num(v, 'down', 0) * WAN;
  if (!(price > 0) || !(income > 0)) return errorView(L('afford.err.input'));

  const rate = official ? fx.annualRatePct : num(v, 'rate', fx.annualRatePct);
  const years = official ? fx.years : num(v, 'years', fx.years);
  const months = Math.round(years * 12);
  if (!(months > 0) || months > 600 || rate < 0 || rate > 30)
    return errorView(L('afford.err.input'));
  const loan = official ? price * fx.ltv : Math.max(0, price - down);
  const payment = loan > 0 ? annuityPayment(loan, rate, months) : 0;
  const monthlyIncome = income / 12;
  const ratio = debtServiceRatio(payment, monthlyIncome);
  const p2i = priceToIncome(price, income);
  const bandKey = affordabilityBand(ratio, bands);
  const bandLabel = L(`band.${bandKey}`);

  const view = emptyView();
  view.text.loan = fmtWan(loan, lang);
  view.text.payment = fmtNTD(payment, lang);
  view.text.ratio = fmtPercent(ratio, 2);
  view.text.p2i = fill(L('afford.times'), { n: fmtNum(p2i, 2) });
  view.text.band = bandLabel;
  view.text.monthlyIncome = fmtNTD(monthlyIncome, lang);

  const limitPct = bands[0].max ?? 30;
  const maxLoan = principalForPayment(
    (monthlyIncome * limitPct) / 100,
    rate,
    months,
  );
  const maxPrice = official ? maxLoan / fx.ltv : maxLoan + down;
  view.text.maxLabel = fill(L('afford.max.label'), { pct: `${limitPct}%` });
  view.text.maxLoan = fmtWan(maxLoan, lang);
  view.text.maxPrice = fmtWan(maxPrice, lang);
  view.text.officialNote = fill(L('afford.officialNote'), {
    years: fx.years,
    ltv: fmtNum(fx.ltv * 10, 1),
    ltvPct: `${fmtNum(fx.ltv * 100, 0)}%`,
    rate: fmtRate(fx.annualRatePct),
  });

  const period = periodLabel(ctx.fixtures, lang);
  const nation = fx.rows.find((r) => r.name === '全國');
  const county =
    v.county && v.county !== '全國'
      ? fx.rows.find((r) => r.name === v.county)
      : undefined;
  const line = (
    name: string,
    row: { burdenPct: number; priceToIncome: number; smallSample: boolean },
  ): string =>
    fill(L('afford.officialLine'), {
      name,
      period,
      b: fmtPercent(row.burdenPct, 2),
      p: fmtNum(row.priceToIncome, 2),
    }) + (row.smallSample ? ` ${L('afford.smallSample')}` : '');
  const countyName = (n: string): string => L(`county.${n}`);
  view.text.nationLine = nation ? line(L('afford.nation'), nation) : '';
  view.text.countyLine = county ? line(countyName(county.name), county) : '';

  view.text.rulerTake = fill(L('afford.ruler.take'), {
    ratio: fmtPercent(ratio, 1),
    band: bandLabel,
    nation: nation ? fmtPercent(nation.burdenPct, 2) : '—',
  });
  const markers: RulerMarker[] = [
    {
      kind: 'you',
      value: ratio,
      label: `${L('afford.ruler.you')} ${fmtPercent(ratio, 1)}`,
    },
  ];
  if (nation)
    markers.push({
      kind: 'nation',
      value: nation.burdenPct,
      label: `${L('afford.nation')} ${fmtPercent(nation.burdenPct, 1)}`,
    });
  if (county && county.name !== '全國')
    markers.push({
      kind: 'county',
      value: county.burdenPct,
      label: `${countyName(county.name)} ${fmtPercent(county.burdenPct, 1)}`,
    });
  const bandSpec = bands.map((b, i) => ({
    from: i === 0 ? 0 : (bands[i - 1].max as number),
    to: b.max,
    label: L(`band.${b.key}`),
  }));
  view.html.ruler = dualChart((W) =>
    ratioRuler({
      W,
      title: view.text.rulerTake,
      desc: L('afford.ruler.desc'),
      bands: bandSpec,
      markers,
    }),
  );
  view.html.bandTable = table(
    [L('afford.bandTable.band'), L('afford.bandTable.range')],
    bands.map((b, i) => [
      L(`band.${b.key}`),
      b.max === null
        ? `≥ ${bands[i - 1].max}%`
        : i === 0
          ? `< ${b.max}%`
          : `${bands[i - 1].max}% – ${b.max}%`,
    ]),
    'hst-table hst-table-bands',
  );
  view.show = {
    result: true,
    error: false,
    county: !!county && county.name !== '全國',
  };
  return view;
}

// ── 三、青安 3.0 資格自查 ───────────────────────────────────────────

export function eligibilityDefaults(): Values {
  return {
    age: '32',
    term: '40',
    income: '90',
    county: '新北市',
    price: '1800',
    newlywed: 'no',
    child: 'no',
    home: 'none',
    shareSqm: '30',
    used: 'no',
    purchased: 'yes',
  };
}

const yn = (s: string | undefined): boolean | undefined =>
  s === 'yes' ? true : s === 'no' ? false : undefined;

export function eligibilityAnswers(v: Values): EligibilityAnswers {
  const age = opt(v, 'age');
  const term = opt(v, 'term');
  const income = opt(v, 'income');
  const price = opt(v, 'price');
  const home = (['none', 'share', 'parkingOrNiche', 'has'] as const).includes(
    v.home as HomeStatus,
  )
    ? (v.home as HomeStatus)
    : undefined;
  return {
    age,
    termYears: term,
    annualIncome: income === undefined ? undefined : income * WAN,
    county: v.county || undefined,
    price: price === undefined ? undefined : price * WAN,
    newlywed: yn(v.newlywed),
    hasMinorChild: yn(v.child),
    home,
    shareSqm: opt(v, 'shareSqm'),
    usedBefore: yn(v.used),
    purchasedWithin6m: yn(v.purchased),
  };
}

const STATUS_MARK: Record<string, string> = {
  pass: '✓',
  fail: '✗',
  bankReview: '?',
  unknown: '–',
};

function sourceLink(src: SourceRef | undefined): string {
  if (!src) return '';
  return `<a href="${escapeHtml(src.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(
    `${src.agency}：${src.title}`,
  )}</a>`;
}

function checkItem(c: EligibilityCheck, ctx: Ctx): string {
  const L = mkL(ctx);
  const lang = ctx.lang;
  const q = ctx.qingan;
  const d = c.detail;
  const vars: Record<string, string | number> = {
    max: typeof d.max === 'number' ? d.max : '',
    sqm: typeof d.sqm === 'number' ? d.sqm : '',
    months: typeof d.months === 'number' ? d.months : '',
    cap: typeof d.cap === 'number' ? fmtWan(d.cap, lang) : '',
    sum: d.sum === '' || d.sum === undefined ? '' : String(d.sum),
  };
  if (c.id === 'income') vars.max = fmtWan(d.max as number, lang);
  const key =
    c.id === 'priceCap' && d.cap === ''
      ? 'elig.check.priceCapNone'
      : `elig.check.${c.id}`;
  const text = fill(L(key), vars);
  let body = '';
  if (c.clauseId) {
    const clause = q.clauses.find((x) => x.id === c.clauseId);
    if (clause) {
      body =
        `<p class="hst-quote-label">${escapeHtml(L('elig.quoteLabel'))}</p>` +
        `<blockquote class="hst-quote">${escapeHtml(clause.quote)}</blockquote>` +
        `<p class="hst-src">${sourceLink(q.sources[clause.source])}</p>`;
    }
  } else if (c.genKey) {
    const v3 = q.generations.find((g) => g.id === 'v3');
    const summary = v3 ? v3[c.genKey] : '';
    body =
      `<p class="hst-quote-label">${escapeHtml(L('elig.summaryLabel'))}</p>` +
      `<blockquote class="hst-quote">${escapeHtml(summary ?? '')}</blockquote>` +
      `<p class="hst-src">${sourceLink(q.sources.v3Release)}</p>`;
  }
  return (
    `<li class="hst-check hst-check-${c.status}"><details>` +
    `<summary><span class="hst-badge hst-badge-${c.status}"><span aria-hidden="true">${STATUS_MARK[c.status]}</span> ${escapeHtml(L(`elig.status.${c.status}`))}</span>` +
    `<span class="hst-check-text">${escapeHtml(text)}</span></summary>` +
    `<div class="hst-check-body">${body}</div></details></li>`
  );
}

export function eligibilityView(v: Values, ctx: Ctx): ToolView {
  const L = mkL(ctx);
  const lang = ctx.lang;
  const q = ctx.qingan;
  const answers = eligibilityAnswers(v);
  const r = checkQinganEligibility(q, answers);
  const view = emptyView();

  view.html.checks = `<ol class="hst-checks">${r.checks
    .map((c) => checkItem(c, ctx))
    .join('')}</ol>`;

  // 彙整：只計各狀態的數量，不下「可以貸到」的結論
  const count = (s: string): number =>
    r.checks.filter((c) => c.status === s).length;
  view.text.tally = fill(L('elig.tally'), {
    pass: count('pass'),
    fail: count('fail'),
    review: count('bankReview'),
    unknown: count('unknown'),
  });

  view.text.limitClass = L(`elig.class.${r.limitClass}`);
  view.text.limitValue =
    r.anyFail || r.maxLimit === null
      ? r.anyFail
        ? L('elig.limit.blocked')
        : fmtWan(r.classLimit, lang)
      : fmtWan(r.maxLimit, lang);
  view.text.limitNote = r.anyFail
    ? L('elig.limit.blockedNote')
    : fill(L(r.maxLimit === null ? 'elig.limit.noPrice' : 'elig.limit.note'), {
        cls: L(`elig.class.${r.limitClass}`),
        classLimit: fmtWan(r.classLimit, lang),
        ltv: fmtNum(q.current.maxLtv * 10, 1),
        ltvPct: `${fmtNum(q.current.maxLtv * 100, 0)}%`,
      }) + (r.capByLtv ? ` ${L('elig.limit.ltvBinds')}` : '');

  const discretion = q.clauses.find((c) => c.id === 'discretion');
  view.html.discretion = discretion
    ? `<blockquote class="hst-quote">${escapeHtml(discretion.quote)}</blockquote>` +
      `<p class="hst-src">${sourceLink(q.sources[discretion.source])}</p>`
    : '';
  const others = ['selfUse', 'noRent', 'violation', 'window']
    .map((id) => q.clauses.find((c) => c.id === id))
    .filter((c): c is NonNullable<typeof c> => !!c);
  view.html.others = others
    .map(
      (c) =>
        `<blockquote class="hst-quote">${escapeHtml(c.quote)}</blockquote>` +
        `<p class="hst-src">${sourceLink(q.sources[c.source])}</p>`,
    )
    .join('');

  // 帶進房貸試算的連結（查詢參數用房貸試算的前綴）
  const amountWan = Math.round(
    (r.anyFail || r.maxLimit === null ? r.classLimit : r.maxLimit) / WAN,
  );
  const years = Math.min(
    answers.termYears ?? q.current.maxYears,
    q.current.maxYears,
  );
  const sp = new URLSearchParams({
    [`${PARAM_PREFIX.mortgage}_scenario`]: 'qingan3',
    [`${PARAM_PREFIX.mortgage}_limitClass`]: r.limitClass,
    [`${PARAM_PREFIX.mortgage}_amount`]: String(amountWan),
    [`${PARAM_PREFIX.mortgage}_years`]: String(years),
  });
  view.href.toMortgage = `${ctx.toolsPath ?? ''}?${sp.toString()}#mortgage-calculator`;
  view.show = { result: true, error: false };
  return view;
}

// ── 四、買與租比較 ──────────────────────────────────────────────────

/**
 * 預設值是示意用的假設，不是統計數字：
 * 買方一次性成本、每年持有成本、賣出成本、租金都由讀者依自己的情況改。
 * 房價年變動率與投資報酬率刻意預設 0，不替讀者預設樂觀或悲觀。
 */
export function rentBuyDefaults(ctx: Ctx): Values {
  return {
    price: '1500',
    down: '450',
    years: '30',
    rate: String(ctx.fixtures.officialAffordability.annualRatePct),
    buyCost: '2',
    holdCost: '1',
    sellCost: '4',
    rent: '30000',
    rentGrowth: '0',
    horizon: '30',
    growth: '0',
    invest: '0',
  };
}

export function rentBuyView(v: Values, ctx: Ctx): ToolView {
  const L = mkL(ctx);
  const lang = ctx.lang;
  const price = num(v, 'price', NaN) * WAN;
  const down = num(v, 'down', NaN) * WAN;
  const horizon = Math.round(num(v, 'horizon', NaN));
  if (!(price > 0) || !(down >= 0) || !(horizon >= 1) || horizon > 50)
    return errorView(L('rentbuy.err.input'));
  if (down >= price) return errorView(L('rentbuy.err.down'));

  let rows;
  try {
    rows = compareRentVsBuy({
      price,
      downPayment: down,
      mortgage: {
        years: num(v, 'years', 30),
        graceMonths: 0,
        stages: [{ months: 0, annualRatePct: num(v, 'rate', 0) }],
      },
      buyCostPct: num(v, 'buyCost', 0),
      holdingCostPct: num(v, 'holdCost', 0),
      sellCostPct: num(v, 'sellCost', 0),
      priceGrowthPct: num(v, 'growth', 0),
      monthlyRent: num(v, 'rent', 0),
      rentGrowthPct: num(v, 'rentGrowth', 0),
      investReturnPct: num(v, 'invest', 0),
      horizonYears: horizon,
    });
  } catch {
    return errorView(L('rentbuy.err.input'));
  }

  // 交叉年份：誰領先的符號和第一年不同的那一年
  const lead = (r: { buyNetWorth: number; rentNetWorth: number }): number =>
    Math.sign(r.buyNetWorth - r.rentNetWorth);
  const first = lead(rows[0]);
  const crossRow = rows.find((r) => lead(r) !== first && lead(r) !== 0);
  const crossYear = crossRow ? crossRow.year : null;
  const finalRow = rows[rows.length - 1];

  const view = emptyView();
  const tpl = (key: string): string => L(`rentbuy.${key}`);
  if (crossYear !== null) {
    view.text.take = fill(
      tpl(first < 0 ? 'take.buyOvertakes' : 'take.rentOvertakes'),
      { year: crossYear },
    );
  } else {
    const ahead = lead(finalRow);
    view.text.take = fill(
      tpl(ahead >= 0 ? 'take.buyAlways' : 'take.rentAlways'),
      { years: horizon },
    );
  }
  view.text.endBuy = fmtWan(finalRow.buyNetWorth, lang);
  view.text.endRent = fmtWan(finalRow.rentNetWorth, lang);
  view.text.atYear = fill(tpl('atYear'), { year: horizon });
  view.text.atYear2 = view.text.atYear;
  view.text.crossYear =
    crossYear === null
      ? tpl('noCross')
      : fill(tpl('crossAt'), { year: crossYear });
  const diff = finalRow.buyNetWorth - finalRow.rentNetWorth;
  view.text.diff = `${diff >= 0 ? '+' : '−'}${fmtWan(Math.abs(diff), lang)}`;

  view.html.chart = dualChart((W) =>
    netWorthLines({
      rows: rows.map((r) => ({
        year: r.year,
        buy: r.buyNetWorth,
        rent: r.rentNetWorth,
      })),
      crossYear,
      W,
      title: view.text.take,
      desc: tpl('chart.desc'),
      labels: {
        buy: tpl('chart.buy'),
        rent: tpl('chart.rent'),
        cross:
          crossYear === null ? '' : fill(tpl('crossAt'), { year: crossYear }),
        axisLeft: tpl('chart.axisLeft'),
        axisBottom: tpl('chart.year'),
      },
      fmtY: (x) => fmtAxisMoney(x, lang),
    }),
  );
  view.html.table = table(
    [tpl('table.year'), tpl('table.buy'), tpl('table.rent'), tpl('table.diff')],
    rows.map((r) => [
      String(r.year),
      fmtWan(r.buyNetWorth, lang),
      fmtWan(r.rentNetWorth, lang),
      `${r.buyNetWorth - r.rentNetWorth >= 0 ? '+' : '−'}${fmtWan(
        Math.abs(r.buyNetWorth - r.rentNetWorth),
        lang,
      )}`,
    ]),
    'hst-table hst-table-networth',
  );
  view.show = { result: true, error: false };
  return view;
}
