/**
 * housing-mortgage.test.mjs — /housing/ 房貸試算核心契約
 *（跑：node --experimental-strip-types --test tests/housing-mortgage.test.mjs）
 *
 * 守三類事：
 *   1. 數學不變量：本金全數還清、利息 = 逐期餘額 × 月利率、寬限期內本金不動
 *   2. 與公開數字對照（src/data/housing/calc-fixtures.json，每筆附出處網址）：
 *      內政部 115Q1 房貸負擔率全國＋21 縣市、合庫與兆豐揭露的總費用年百分率
 *   3. 邊界：零利率、寬限期、分段利率、提前還款兩種模式、不合法輸入
 */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

import {
  affordabilityBand,
  annualPercentageRate,
  annuityPayment,
  compareRentVsBuy,
  computeMortgage,
  debtServiceRatio,
  priceToIncome,
  principalForPayment,
  validateInput,
} from '../src/utils/housing/mortgage.ts';

const fixtures = JSON.parse(
  readFileSync(
    new URL('../src/data/housing/calc-fixtures.json', import.meta.url),
    'utf8',
  ),
);

const near = (actual, expected, tol, msg) =>
  assert.ok(
    Math.abs(actual - expected) <= tol,
    `${msg ?? ''} 期望 ${expected}±${tol}，實得 ${actual}`,
  );

const sum = (rows, key) => rows.reduce((acc, row) => acc + row[key], 0);

test('本息平均攤還：獨立手算對照（1,000 萬、2%、30 年）', () => {
  // 手算：r = 0.02/12；M = P·r·(1+r)^360 / ((1+r)^360 − 1) = 36,961.95
  const res = computeMortgage({
    principal: 10_000_000,
    years: 30,
    stages: [{ months: 360, annualRatePct: 2 }],
  });
  near(res.firstAmortizingPayment, 36961.95, 0.01);
  near(res.totalInterest, 36961.95 * 360 - 10_000_000, 5);
  assert.equal(res.payoffMonth, 360);
  assert.equal(res.gracePayment, null);
});

test('本金全數還清，期末餘額為 0', () => {
  for (const method of ['annuity', 'equalPrincipal']) {
    const res = computeMortgage({
      principal: 8_765_432,
      years: 40,
      graceMonths: 60,
      method,
      stages: [
        { months: 24, annualRatePct: 1.775 },
        { months: 0, annualRatePct: 2.275 },
      ],
    });
    near(sum(res.schedule, 'principalPaid'), 8_765_432, 0.01, method);
    assert.equal(res.schedule.at(-1).balance, 0);
    assert.equal(res.payoffMonth, 480);
  }
});

test('每期利息 = 期初餘額 × 月利率', () => {
  const res = computeMortgage({
    principal: 5_000_000,
    years: 20,
    stages: [{ months: 240, annualRatePct: 2.5 }],
  });
  let balance = 5_000_000;
  for (const row of res.schedule) {
    near(row.interest, (balance * 0.025) / 12, 1e-6);
    balance -= row.principalPaid;
  }
});

test('寬限期：只繳息、本金不動，結束後月付跳升', () => {
  const res = computeMortgage({
    principal: 10_000_000,
    years: 40,
    graceMonths: 60,
    stages: [{ months: 480, annualRatePct: 2.275 }],
  });
  for (const row of res.schedule.slice(0, 60)) {
    assert.equal(row.principalPaid, 0);
    assert.equal(row.balance, 10_000_000);
  }
  near(res.gracePayment, (10_000_000 * 0.02275) / 12, 0.01);
  // 寬限期後等同「1,000 萬、35 年」的本息平均攤還
  near(
    res.firstAmortizingPayment,
    annuityPayment(10_000_000, 2.275, 420),
    0.01,
  );
  assert.ok(res.firstAmortizingPayment > res.gracePayment * 1.5);
});

test('寬限期讓總利息變多（同本金、利率、年限）', () => {
  const base = {
    principal: 10_000_000,
    years: 30,
    stages: [{ months: 360, annualRatePct: 2.2 }],
  };
  const noGrace = computeMortgage(base);
  const grace = computeMortgage({ ...base, graceMonths: 36 });
  assert.ok(grace.totalInterest > noGrace.totalInterest);
});

test('本金平均攤還：每期本金相同、月付遞減、總利息低於本息平均', () => {
  const input = {
    principal: 6_000_000,
    years: 20,
    stages: [{ months: 240, annualRatePct: 2.4 }],
  };
  const ep = computeMortgage({ ...input, method: 'equalPrincipal' });
  const an = computeMortgage({ ...input, method: 'annuity' });
  for (const row of ep.schedule) near(row.principalPaid, 25_000, 0.01);
  for (let i = 1; i < ep.schedule.length; i++)
    assert.ok(ep.schedule[i].payment < ep.schedule[i - 1].payment);
  // 手算：利息 = P·r·(n+1)/2
  near(ep.totalInterest, (6_000_000 * (0.024 / 12) * 241) / 2, 0.5);
  assert.ok(ep.totalInterest < an.totalInterest);
});

test('零利率：月付 = 本金 / 期數，利息為 0', () => {
  const res = computeMortgage({
    principal: 1_200_000,
    years: 10,
    stages: [{ months: 120, annualRatePct: 0 }],
  });
  near(res.firstAmortizingPayment, 10_000, 1e-6);
  assert.equal(res.totalInterest, 0);
});

test('分段利率：換段當期依餘額與剩餘期數重算', () => {
  const res = computeMortgage({
    principal: 10_000_000,
    years: 30,
    stages: [
      { months: 12, annualRatePct: 2 },
      { months: 12, annualRatePct: 2.2 },
      { months: 0, annualRatePct: 2.5 },
    ],
  });
  const [m12, m13, m25] = [11, 12, 24].map((i) => res.schedule[i]);
  assert.equal(m12.annualRatePct, 2);
  assert.equal(m13.annualRatePct, 2.2);
  assert.equal(m25.annualRatePct, 2.5);
  near(m13.payment, annuityPayment(res.schedule[11].balance, 2.2, 348), 0.01);
  near(m25.payment, annuityPayment(res.schedule[23].balance, 2.5, 336), 0.01);
  assert.equal(res.schedule.at(-1).balance, 0);
});

test('提前還款（縮短年限）：月付不變、提早結清、總利息下降', () => {
  const base = {
    principal: 10_000_000,
    years: 30,
    stages: [{ months: 360, annualRatePct: 2.2 }],
  };
  const plain = computeMortgage(base);
  const pre = computeMortgage({
    ...base,
    prepayments: [{ month: 60, amount: 1_000_000, mode: 'shortenTerm' }],
  });
  near(pre.schedule[60].payment, plain.schedule[60].payment, 0.01);
  assert.ok(pre.payoffMonth < 360);
  assert.ok(pre.totalInterest < plain.totalInterest);
  near(sum(pre.schedule, 'principalPaid') + 1_000_000, 10_000_000, 0.01);
  assert.equal(pre.schedule.at(-1).balance, 0);
});

test('提前還款（降低月付）：期數不變、月付下降', () => {
  const base = {
    principal: 10_000_000,
    years: 30,
    stages: [{ months: 360, annualRatePct: 2.2 }],
  };
  const pre = computeMortgage({
    ...base,
    prepayments: [{ month: 60, amount: 1_000_000, mode: 'reducePayment' }],
  });
  assert.equal(pre.payoffMonth, 360);
  near(
    pre.schedule[60].payment,
    annuityPayment(pre.schedule[59].balance, 2.2, 300),
    0.01,
  );
  assert.ok(pre.schedule[60].payment < pre.schedule[59].payment);
  assert.equal(pre.schedule.at(-1).balance, 0);
});

// 2026-11-10 協調者審查抓到：縮短年限在有寬限期或分段利率時，換段重算用回原始年限，
// 兩種模式算出同樣 480 期、同樣總利息。下面三組守住「縮短年限」真的有縮短。
const shortenVsReduce = (base, prepay) => {
  const s = computeMortgage({
    ...base,
    prepayments: [{ ...prepay, mode: 'shortenTerm' }],
  });
  const r = computeMortgage({
    ...base,
    prepayments: [{ ...prepay, mode: 'reducePayment' }],
  });
  return { s, r };
};

test('提前還款（縮短年限）＋寬限期：期數與總利息都少於降低月付', () => {
  const { s, r } = shortenVsReduce(
    {
      principal: 10_000_000,
      years: 40,
      graceMonths: 60,
      stages: [{ months: 480, annualRatePct: 2.275 }],
    },
    { month: 12, amount: 2_000_000 },
  );
  assert.equal(r.payoffMonth, 480);
  assert.ok(s.payoffMonth < r.payoffMonth, `縮短 ${s.payoffMonth} 期`);
  assert.ok(s.totalInterest < r.totalInterest);
  // 寬限期後月付維持「沒提前還款時」的水準
  near(s.firstAmortizingPayment, annuityPayment(10_000_000, 2.275, 420), 0.01);
  assert.equal(s.schedule.at(-1).balance, 0);
});

test('提前還款（縮短年限）＋分段利率：換段後仍維持縮短後的期數', () => {
  const { s, r } = shortenVsReduce(
    {
      principal: 10_000_000,
      years: 30,
      stages: [
        { months: 24, annualRatePct: 2 },
        { months: 0, annualRatePct: 2.5 },
      ],
    },
    { month: 12, amount: 2_000_000 },
  );
  assert.equal(r.payoffMonth, 360);
  assert.ok(s.payoffMonth < r.payoffMonth, `縮短 ${s.payoffMonth} 期`);
  assert.ok(s.totalInterest < r.totalInterest);
  assert.equal(s.schedule.at(-1).balance, 0);
});

test('提前還款（縮短年限）＋寬限期＋階梯利率（青安 3.0 形狀）', () => {
  const { s, r } = shortenVsReduce(
    {
      principal: 10_000_000,
      years: 40,
      graceMonths: 60,
      stages: [
        { months: 36, annualRatePct: 1.775 },
        { months: 12, annualRatePct: 1.9 },
        { months: 12, annualRatePct: 2.025 },
        { months: 12, annualRatePct: 2.15 },
        { months: 0, annualRatePct: 2.275 },
      ],
    },
    { month: 12, amount: 2_000_000 },
  );
  assert.equal(r.payoffMonth, 480);
  assert.ok(s.payoffMonth < r.payoffMonth, `縮短 ${s.payoffMonth} 期`);
  assert.ok(s.totalInterest < r.totalInterest);
  near(sum(s.schedule, 'principalPaid') + 2_000_000, 10_000_000, 0.01);
  assert.equal(s.schedule.at(-1).balance, 0);
});

test('提前還款（縮短年限）＋本金平均攤還＋寬限期', () => {
  const { s, r } = shortenVsReduce(
    {
      principal: 6_000_000,
      years: 20,
      graceMonths: 24,
      method: 'equalPrincipal',
      stages: [{ months: 240, annualRatePct: 2.4 }],
    },
    { month: 12, amount: 1_200_000 },
  );
  // 原本每月還本 6,000,000 ÷ 216；提前還 120 萬後在同樣的每月還本下要 173 期
  assert.equal(s.payoffMonth, 24 + Math.ceil(4_800_000 / (6_000_000 / 216)));
  assert.equal(r.payoffMonth, 240);
  assert.ok(s.totalInterest < r.totalInterest);
});

test('提前還款金額超過餘額時只還到 0', () => {
  const res = computeMortgage({
    principal: 1_000_000,
    years: 10,
    stages: [{ months: 120, annualRatePct: 2 }],
    prepayments: [{ month: 12, amount: 99_000_000, mode: 'shortenTerm' }],
  });
  assert.equal(res.payoffMonth, 12);
  assert.equal(res.schedule.at(-1).balance, 0);
  near(res.totalPaid - res.totalInterest, 1_000_000, 0.01);
});

test('principalForPayment 是 annuityPayment 的反函數', () => {
  for (const [p, rate, n] of [
    [10_000_000, 2.185, 360],
    [3_210_000, 3.1, 240],
    [500_000, 0, 60],
  ]) {
    near(principalForPayment(annuityPayment(p, rate, n), rate, n), p, 0.01);
  }
});

test('不合法輸入會被擋下', () => {
  const ok = {
    principal: 1,
    years: 1,
    stages: [{ months: 12, annualRatePct: 2 }],
  };
  assert.deepEqual(validateInput(ok), []);
  assert.throws(() => computeMortgage({ ...ok, principal: 0 }), RangeError);
  assert.throws(() => computeMortgage({ ...ok, years: 0 }), RangeError);
  assert.throws(() => computeMortgage({ ...ok, graceMonths: 12 }), RangeError);
  assert.throws(() => computeMortgage({ ...ok, stages: [] }), RangeError);
  assert.throws(
    () =>
      computeMortgage({ ...ok, stages: [{ months: 12, annualRatePct: -1 }] }),
    RangeError,
  );
});

test('負擔指標：貸款負擔率、房價所得比、分級', () => {
  near(debtServiceRatio(40_000, 100_000), 40, 1e-9);
  near(priceToIncome(12_000_000, 1_200_000), 10, 1e-9);
  assert.ok(Number.isNaN(debtServiceRatio(1, 0)));
  const bands = fixtures.affordabilityBands;
  assert.ok(bands.length >= 2, 'fixture 要帶內政部分級門檻');
  assert.equal(affordabilityBand(0, bands), bands[0].key);
  assert.equal(affordabilityBand(999, bands), bands.at(-1).key);
});

test('買租比較：零成長、零報酬、零成本時可手算', () => {
  // 房價 1,000 萬、頭期 200 萬、貸 800 萬零利率 20 年（月付 33,333.33）；
  // 月租 33,333.33 與月付相同 → 租方只留著頭期款 200 萬；
  // 10 年後買方已還 400 萬本金 → 淨資產 1,000 萬 − 400 萬 = 600 萬。
  const rows = compareRentVsBuy({
    price: 10_000_000,
    downPayment: 2_000_000,
    mortgage: { years: 20, stages: [{ months: 240, annualRatePct: 0 }] },
    buyCostPct: 0,
    holdingCostPct: 0,
    sellCostPct: 0,
    priceGrowthPct: 0,
    monthlyRent: 8_000_000 / 240,
    rentGrowthPct: 0,
    investReturnPct: 0,
    horizonYears: 10,
  });
  assert.equal(rows.length, 10);
  near(rows.at(-1).buyNetWorth, 6_000_000, 1);
  near(rows.at(-1).rentNetWorth, 2_000_000, 1);
});

test('重現內政部房貸負擔率：全國（中位數房價、所得、利率皆官方公布值）', () => {
  const o = fixtures.officialAffordability;
  assert.match(o.sourceUrl, /^https:\/\/pip\.moi\.gov\.tw\//);
  const payment = annuityPayment(
    o.nation.medianPrice * o.ltv,
    o.annualRatePct,
    o.years * 12,
  );
  near(
    debtServiceRatio(payment, o.nation.medianHouseholdIncome / 12),
    o.nation.burdenPct,
    0.01,
    `${o.period} 全國`,
  );
  near(
    priceToIncome(o.nation.medianPrice, o.nation.medianHouseholdIncome),
    o.nation.priceToIncome,
    0.005,
  );
});

test('重現內政部房貸負擔率：全國＋21 縣市（由官方房價所得比反推）', () => {
  // 負擔率 = 房價所得比 × 成數 × 12 × 每元月付金；官方房價所得比只印到小數兩位，
  // 所以容許值取 fixture 宣告的捨入誤差。
  const o = fixtures.officialAffordability;
  assert.equal(o.rows.length, 22);
  const perDollar = annuityPayment(1, o.annualRatePct, o.years * 12);
  for (const row of o.rows) {
    near(
      row.priceToIncome * o.ltv * 12 * perDollar * 100,
      row.burdenPct,
      o.tolerancePct,
      `${o.period} ${row.name}`,
    );
  }
});

test('重現公股銀行揭露的總費用年百分率', () => {
  assert.ok(fixtures.aprCases.length >= 2);
  for (const c of fixtures.aprCases) {
    assert.match(c.sourceUrl, /^https:\/\//, `${c.id} 缺出處網址`);
    near(
      annualPercentageRate(c.input, c.fees),
      c.expectAprPct,
      c.tolerance,
      c.id,
    );
  }
});
