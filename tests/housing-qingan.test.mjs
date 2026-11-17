/**
 * housing-qingan.test.mjs — 青安階梯利率路徑與資格比對契約
 *（跑：node --experimental-strip-types --test tests/housing-qingan.test.mjs）
 *
 * 守三類事：
 *   1. 階梯利率路徑：與 src/data/housing/qingan.json 的 subsidySteps 逐段一致，含既有貸戶的起點位移
 *   2. 月付路徑：1,000 萬、40 年、寬限 60 月，第 1/37/49/61/73 期對得上手算值
 *   3. 資格邊界：年齡、年齡加年限、所得、房價上限、限貸一次、持分例外、額度別與成數
 * 月付金為本站試算（官方沒有公布試算表），數字出處見 reports/design-housing-hub-2026-11-10.md §5.7。
 */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

import { computeMortgage } from '../src/utils/housing/mortgage.ts';
import {
  checkQinganEligibility,
  qinganRateStages,
  remainingLoanInput,
} from '../src/utils/housing/qingan.ts';

const cfg = JSON.parse(
  readFileSync(
    new URL('../src/data/housing/qingan.json', import.meta.url),
    'utf8',
  ),
);

const near = (actual, expected, tol, msg) =>
  assert.ok(
    Math.abs(actual - expected) <= tol,
    `${msg ?? ''} 期望 ${expected}±${tol}，實得 ${actual}`,
  );

const base = {
  age: 32,
  termYears: 40,
  annualIncome: 900000,
  county: '新北市',
  price: 18000000,
  usedBefore: false,
  home: 'none',
  purchasedWithin6m: true,
  newlywed: false,
  hasMinorChild: false,
};
const statusOf = (answers, id) =>
  checkQinganEligibility(cfg, { ...base, ...answers }).checks.find(
    (c) => c.id === id,
  ).status;

test('階梯利率路徑：3 年 1.775，之後每年加半碼的 1/4 碼，第 7 年起 2.275', () => {
  const stages = qinganRateStages(cfg);
  assert.deepEqual(
    stages.map((s) => s.annualRatePct),
    [1.775, 1.9, 2.025, 2.15, 2.275],
  );
  assert.deepEqual(
    stages.slice(0, 4).map((s) => s.months),
    [36, 12, 12, 12],
  );
});

test('階梯利率路徑：每段淨利率等於基準利率減補貼', () => {
  for (const step of cfg.rate.subsidySteps) {
    near(cfg.rate.baseRatePct - step.subsidyPct, step.netRatePct, 1e-9);
  }
});

test('既有貸戶起點位移：已撥貸 40 個月，剩下第 2 段 8 個月起', () => {
  const stages = qinganRateStages(cfg, { startOffsetMonths: 40 });
  assert.deepEqual(
    stages.map((s) => s.annualRatePct),
    [1.9, 2.025, 2.15, 2.275],
  );
  assert.equal(stages[0].months, 8);
  const done = qinganRateStages(cfg, { startOffsetMonths: 200 });
  assert.deepEqual(
    done.map((s) => s.annualRatePct),
    [2.275],
  );
});

test('月付路徑：1,000 萬、40 年、寬限 60 月', () => {
  const r = computeMortgage({
    principal: 10_000_000,
    years: 40,
    graceMonths: 60,
    stages: qinganRateStages(cfg),
  });
  const pay = (month) => r.schedule[month - 1].payment;
  near(pay(1), 14791.67, 0.01, '第 1 期');
  near(pay(37), 15833.33, 0.01, '第 37 期');
  near(pay(49), 16875.0, 0.01, '第 49 期');
  near(pay(61), 33901.26, 0.01, '第 61 期');
  near(pay(73), 34538.79, 0.01, '第 73 期');
  assert.equal(r.payoffMonth, 480);
  near(r.schedule.at(-1).balance, 0, 0.01);
});

test('既有貸戶：從現在起的路徑與整筆貸款的後半段完全一致', () => {
  const full = computeMortgage({
    principal: 10_000_000,
    years: 40,
    graceMonths: 60,
    stages: qinganRateStages(cfg),
  });
  for (const elapsed of [10, 40, 60, 75]) {
    const rest = computeMortgage(
      remainingLoanInput(cfg, {
        principal: 10_000_000,
        years: 40,
        graceMonths: 60,
        elapsedMonths: elapsed,
      }),
    );
    assert.equal(rest.schedule.length, 480 - elapsed);
    for (const k of [0, 30, 100, rest.schedule.length - 1]) {
      near(
        rest.schedule[k].payment,
        full.schedule[elapsed + k].payment,
        0.01,
        `已撥貸 ${elapsed} 個月，第 ${k + 1} 期`,
      );
    }
  }
  assert.throws(() =>
    remainingLoanInput(cfg, {
      principal: 1,
      years: 40,
      graceMonths: 60,
      elapsedMonths: 480,
    }),
  );
});

test('資格：未滿 50 歲，49 歲過、50 歲不過', () => {
  assert.equal(statusOf({ age: 49, termYears: 30 }, 'age'), 'pass');
  assert.equal(statusOf({ age: 50, termYears: 30 }, 'age'), 'fail');
});

test('資格：年齡加年限不逾 80，45 歲選 40 年不過、45 歲選 35 年過', () => {
  assert.equal(statusOf({ age: 45, termYears: 40 }, 'agePlusTerm'), 'fail');
  assert.equal(statusOf({ age: 45, termYears: 35 }, 'agePlusTerm'), 'pass');
  assert.equal(statusOf({ age: 40, termYears: 40 }, 'agePlusTerm'), 'pass');
  assert.equal(statusOf({ termYears: 41 }, 'term'), 'fail');
});

test('資格：本人年所得 200 萬過、200 萬零 1 元不過', () => {
  assert.equal(statusOf({ annualIncome: 2_000_000 }, 'income'), 'pass');
  assert.equal(statusOf({ annualIncome: 2_000_001 }, 'income'), 'fail');
});

test('資格：房價上限依縣市（臺北 3,500 萬過、新北 2,600 萬不過、高雄 2,000 萬過）', () => {
  assert.equal(
    statusOf({ county: '臺北市', price: 35_000_000 }, 'priceCap'),
    'pass',
  );
  assert.equal(
    statusOf({ county: '臺北市', price: 35_000_001 }, 'priceCap'),
    'fail',
  );
  assert.equal(
    statusOf({ county: '新北市', price: 26_000_000 }, 'priceCap'),
    'fail',
  );
  assert.equal(
    statusOf({ county: '新竹市', price: 25_000_000 }, 'priceCap'),
    'pass',
  );
  assert.equal(
    statusOf({ county: '高雄市', price: 20_000_000 }, 'priceCap'),
    'pass',
  );
  assert.equal(
    statusOf({ county: '高雄市', price: 20_000_001 }, 'priceCap'),
    'fail',
  );
});

test('資格：限貸一次，貸過不過', () => {
  assert.equal(statusOf({ usedBefore: true }, 'onceOnly'), 'fail');
  assert.equal(statusOf({ usedBefore: false }, 'onceOnly'), 'pass');
});

test('資格：無自有住宅，持分 30 平方公尺與車位塔位需銀行認定，40 平方公尺不過', () => {
  assert.equal(statusOf({ home: 'none' }, 'noHome'), 'pass');
  assert.equal(statusOf({ home: 'has' }, 'noHome'), 'fail');
  assert.equal(
    statusOf({ home: 'share', shareSqm: 30 }, 'noHome'),
    'bankReview',
  );
  assert.equal(statusOf({ home: 'share', shareSqm: 40 }, 'noHome'), 'fail');
  assert.equal(statusOf({ home: 'parkingOrNiche' }, 'noHome'), 'bankReview');
  const share = checkQinganEligibility(cfg, {
    ...base,
    home: 'share',
    shareSqm: 30,
  }).checks.find((c) => c.id === 'noHome');
  assert.equal(share.clauseId, 'share');
});

test('資格條件：登記日在申請前或核准後 6 個月內都算（國庫署問答集第 17 問）', () => {
  const cfg = JSON.parse(
    readFileSync(
      new URL('../src/data/housing/qingan.json', import.meta.url),
      'utf8',
    ),
  );
  assert.equal(cfg.current.purchaseWindow.beforeApplicationMonths, 6);
  assert.equal(cfg.current.purchaseWindow.afterApprovalMonths, 6);
  assert.match(cfg.generations.find((g) => g.id === 'v3').target, /核准後/);
});

test('資格：6 個月內買賣取得的成屋', () => {
  assert.equal(statusOf({ purchasedWithin6m: true }, 'purchased6m'), 'pass');
  assert.equal(statusOf({ purchasedWithin6m: false }, 'purchased6m'), 'fail');
});

test('資格：沒填的欄位回傳 unknown，不當成通過', () => {
  const r = checkQinganEligibility(cfg, {});
  assert.ok(r.checks.every((c) => c.status === 'unknown'));
  assert.equal(r.maxLimit, null);
  assert.equal(r.anyFail, false);
  assert.equal(r.anyUnknown, true);
});

test('資格：每條的 clauseId 都存在於 qingan.json，或改指向方案摘要欄位', () => {
  const ids = new Set(cfg.clauses.map((c) => c.id));
  const v3 = cfg.generations.find((g) => g.id === 'v3');
  const r = checkQinganEligibility(cfg, base);
  for (const c of r.checks) {
    if (c.clauseId !== null) assert.ok(ids.has(c.clauseId), c.id);
    else assert.ok(c.genKey && v3[c.genKey], c.id);
  }
});

test('額度：一般 1,000 萬、新婚 1,200 萬、育兒 1,500 萬，再受房價 8 成限制', () => {
  const lim = (answers) =>
    checkQinganEligibility(cfg, { ...base, ...answers }).maxLimit;
  assert.equal(lim({ price: 20_000_000 }), 10_000_000);
  assert.equal(lim({ price: 20_000_000, newlywed: true }), 12_000_000);
  assert.equal(lim({ price: 20_000_000, hasMinorChild: true }), 15_000_000);
  assert.equal(
    lim({ price: 20_000_000, newlywed: true, hasMinorChild: true }),
    15_000_000,
  );
  // 房價 1,000 萬 × 8 成 = 800 萬，低於額度別上限
  assert.equal(lim({ price: 10_000_000 }), 8_000_000);
  const r = checkQinganEligibility(cfg, { ...base, price: 10_000_000 });
  assert.equal(r.capByLtv, true);
});
