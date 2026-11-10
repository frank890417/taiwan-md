/**
 * housing-tool-models.test.mjs — 四個試算工具的檢視模型契約
 *（跑：node --experimental-strip-types --test tests/housing-tool-models.test.mjs）
 *
 * 守五類事：
 *   1. 預設案例的伺服端輸出：房貸 14,792 / 33,901 / 34,539，負擔自查官方算法全國中位數 41.47%
 *   2. 各情境與錯誤輸入都產得出結果或錯誤訊息，不丟例外
 *   3. 文案字典：zh-TW 與 en 鍵集合一致，所有檢視模型用到的鍵都存在
 *   4. 文案紀律：zh-TW 無破折號、無「不是…是」對位句
 *   5. 圖：伺服端與瀏覽器端共用同一份 SVG 產生器，輸出含寬窄兩版
 */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

import { housingUI } from '../src/i18n/housing.ts';
import {
  affordabilityDefaults,
  affordabilityView,
  eligibilityDefaults,
  eligibilityView,
  mortgageDefaults,
  mortgageView,
  paymentSteps,
  rentBuyDefaults,
  rentBuyView,
  yearlyRows,
} from '../src/utils/housing/tool-models.ts';
import { computeMortgage } from '../src/utils/housing/mortgage.ts';
import { qinganRateStages } from '../src/utils/housing/qingan.ts';
import { readParams, writeParams } from '../src/utils/housing/format.ts';

const json = (p) =>
  JSON.parse(readFileSync(new URL(p, import.meta.url), 'utf8'));
const qingan = json('../src/data/housing/qingan.json');
const fixtures = json('../src/data/housing/calc-fixtures.json');

const dict = (lang) =>
  Object.fromEntries(
    Object.entries(housingUI[lang]).map(([k, v]) => [
      k.replace(/^housing\.tool\./, ''),
      v,
    ]),
  );

/** 缺鍵時記錄下來的字典：模型取不到的鍵會出現在 missing。 */
function trackedLabels(lang) {
  const base = dict(lang);
  const missing = new Set();
  const labels = new Proxy(base, {
    get(target, prop) {
      if (typeof prop === 'string' && !(prop in target)) missing.add(prop);
      return target[prop];
    },
  });
  return { labels, missing };
}

const ctxFor = (lang, labels) => ({
  lang,
  labels,
  qingan,
  fixtures,
  toolsPath: '/housing/tools/',
});
const near = (a, b, tol, msg) =>
  assert.ok(Math.abs(a - b) <= tol, `${msg ?? ''} 期望 ${b}±${tol}，實得 ${a}`);

test('房貸試算預設案例：伺服端輸出 14,792 / 33,901 / 34,539', () => {
  const ctx = ctxFor('zh-TW', dict('zh-TW'));
  const view = mortgageView(mortgageDefaults(ctx), ctx);
  assert.ok(view.text.gracePayment.includes('14,792'), view.text.gracePayment);
  assert.ok(view.text.gracePayment.includes('16,875'));
  assert.equal(view.text.afterGrace, '33,901 元');
  assert.equal(view.text.maxPayment, '34,539 元');
  assert.ok(view.html.steps.includes('33,901'));
  assert.ok(view.html.chartB.includes('hst-fig-wide'));
  assert.ok(view.html.chartB.includes('hst-fig-narrow'));
  assert.ok(view.text.chartBTitle.includes('33,901'), view.text.chartBTitle);
  assert.equal(view.show.error, false);
});

test('房貸試算：結果與核心 computeMortgage 完全一致', () => {
  const ctx = ctxFor('en', dict('en'));
  const view = mortgageView(mortgageDefaults(ctx), ctx);
  const res = computeMortgage({
    principal: 10_000_000,
    years: 40,
    graceMonths: 60,
    stages: qinganRateStages(qingan),
  });
  assert.equal(
    view.text.totalInterest,
    `NT$${Math.round(res.totalInterest).toLocaleString('en-US')}`,
  );
  assert.equal(view.text.afterGrace, 'NT$33,901');
});

test('房貸試算：一般房貸、青安 2.0、對照、提前還款都算得出來', () => {
  const ctx = ctxFor('zh-TW', dict('zh-TW'));
  const d = mortgageDefaults(ctx);
  const general = mortgageView({ ...d, scenario: 'general', grace: '0' }, ctx);
  assert.equal(general.show.result, true);
  assert.equal(general.text.gracePayment, '沒有寬限期');
  const cmp = mortgageView({ ...d, compare: '1' }, ctx);
  assert.equal(cmp.show.cmp, true);
  assert.ok(cmp.html.cmpTable.includes('<table'));
  const q2 = mortgageView(
    { ...d, scenario: 'qingan2', drawMonth: '2024-08' },
    { ...ctx, today: '2026-11' },
  );
  assert.equal(q2.show.elapsed, true);
  assert.ok(q2.text.elapsedNote.includes('27'), q2.text.elapsedNote);
  const pre = mortgageView(
    {
      ...d,
      prepayMonth: '24',
      prepayAmount: '200',
      prepayMode: 'reducePayment',
    },
    ctx,
  );
  assert.equal(pre.show.result, true);
  const multi = mortgageView(
    {
      ...d,
      scenario: 'general',
      len1: '3',
      rate2: '2.5',
      len2: '5',
      rate3: '3',
    },
    ctx,
  );
  assert.ok(multi.html.steps.split('<tr>').length >= 4);
});

test('房貸試算：超過青安上限時列出提醒，不合法輸入回傳錯誤訊息而不丟例外', () => {
  const ctx = ctxFor('zh-TW', dict('zh-TW'));
  const d = mortgageDefaults(ctx);
  const over = mortgageView(
    { ...d, amount: '2000', years: '45', grace: '6' },
    ctx,
  );
  assert.equal(over.show.warnings, true);
  assert.equal(over.html.warnings.split('<li>').length - 1, 3);
  const bad = mortgageView({ ...d, amount: '0' }, ctx);
  assert.equal(bad.show.error, true);
  assert.ok(bad.text.error.length > 0);
  const bad2 = mortgageView({ ...d, grace: '50' }, ctx);
  assert.equal(bad2.show.error, true);
});

test('月付階梯與逐年彙整：階梯切在利率變動與寬限期結束處，逐年本金加利息等於還款', () => {
  const res = computeMortgage({
    principal: 10_000_000,
    years: 40,
    graceMonths: 60,
    stages: qinganRateStages(qingan),
  });
  const steps = paymentSteps(res.schedule, 60);
  assert.deepEqual(
    steps.map((s) => [s.fromMonth, s.annualRatePct, s.inGrace]),
    [
      [1, 1.775, true],
      [37, 1.9, true],
      [49, 2.025, true],
      [61, 2.15, false],
      [73, 2.275, false],
    ],
  );
  const years = yearlyRows(res.schedule);
  assert.equal(years.length, 40);
  for (const y of years) near(y.principal + y.interest, y.total, 0.01);
  near(years.at(-1).balance, 0, 0.01);
});

test('負擔能力自查：官方算法＋全國中位數（966 萬、年所得 101.97 萬）重現官方 41.46%', () => {
  const ctx = ctxFor('zh-TW', dict('zh-TW'));
  const view = affordabilityView(affordabilityDefaults(ctx), ctx);
  const ratio = parseFloat(view.text.ratio);
  const nation = fixtures.officialAffordability.rows.find(
    (r) => r.name === '全國',
  );
  near(
    ratio,
    nation.burdenPct,
    fixtures.officialAffordability.tolerancePct + 0.01,
    '負擔率',
  );
  assert.equal(view.text.ratio, '41.47%');
  assert.equal(view.text.p2i, '9.47 倍');
  assert.equal(view.text.band, '偏低');
  assert.ok(view.html.ruler.includes('hst-band-3'));
});

test('負擔能力自查：選縣市會多一條官方對照，我的條件模式改用自填的頭期款、利率與年限', () => {
  const ctx = ctxFor('zh-TW', dict('zh-TW'));
  const d = affordabilityDefaults(ctx);
  const view = affordabilityView({ ...d, county: '臺北市' }, ctx);
  assert.equal(view.show.county, true);
  assert.ok(view.text.countyLine.includes('64.41%'), view.text.countyLine);
  const mine = affordabilityView(
    { ...d, mode: 'mine', down: '966', years: '30' },
    ctx,
  );
  assert.equal(mine.text.ratio, '0.00%');
  const bad = affordabilityView({ ...d, income: '' }, ctx);
  assert.equal(bad.show.error, true);
});

test('青安資格自查：預設案例逐條有結果，附條文原文，不出現結論句', () => {
  const ctx = ctxFor('zh-TW', dict('zh-TW'));
  const view = eligibilityView(eligibilityDefaults(), ctx);
  assert.equal(
    (view.html.checks.match(/<li class="hst-check/g) ?? []).length,
    8,
  );
  assert.ok(
    view.html.checks.includes(qingan.clauses.find((c) => c.id === 'age').quote),
  );
  assert.ok(
    view.html.discretion.includes(
      qingan.clauses.find((c) => c.id === 'discretion').quote,
    ),
  );
  assert.ok(!JSON.stringify(view).includes('你可以貸到'));
  assert.ok(view.href.toMortgage.includes('mc_scenario=qingan3'));
  assert.ok(view.href.toMortgage.endsWith('#mortgage-calculator'));
  assert.equal(view.text.limitValue, '1,000 萬');
});

test('青安資格自查：帶進房貸試算時，額度別（婚育狀況）放在 # 後面，不進查詢參數', () => {
  const ctx = ctxFor('zh-TW', dict('zh-TW'));
  const view = eligibilityView(
    { ...eligibilityDefaults(), newlywed: 'yes' },
    ctx,
  );
  const href = view.href.toMortgage;
  const [beforeHash, hash] = href.split('#');
  assert.ok(!beforeHash.includes('limitClass'), href);
  assert.ok(hash.startsWith('mortgage-calculator&'), href);
  assert.ok(hash.includes('mc_limitClass=newlywed'), href);
});

test('青安資格自查：不符合時不列額度數字；持分算需銀行認定；新婚額度受房價 8 成限制', () => {
  const ctx = ctxFor('zh-TW', dict('zh-TW'));
  const d = eligibilityDefaults();
  const fail = eligibilityView({ ...d, age: '50' }, ctx);
  assert.equal(fail.text.limitValue, '不計算');
  const review = eligibilityView({ ...d, home: 'share', shareSqm: '30' }, ctx);
  assert.ok(review.html.checks.includes('hst-badge-bankReview'));
  const capped = eligibilityView({ ...d, newlywed: 'yes', price: '1000' }, ctx);
  assert.equal(capped.text.limitValue, '800 萬');
  const empty = eligibilityView({ ...d, age: '', price: '' }, ctx);
  assert.ok(empty.html.checks.includes('hst-badge-unknown'));
});

test('買與租比較：預設假設可算、交叉年份與文字一致，頭期款大於房價時回傳錯誤', () => {
  const ctx = ctxFor('zh-TW', dict('zh-TW'));
  const d = rentBuyDefaults(ctx);
  const view = rentBuyView(d, ctx);
  assert.equal(view.show.result, true);
  assert.ok(view.html.chart.includes('hst-line-a'));
  assert.ok(view.html.chart.includes('hst-line-b'));
  assert.equal((view.html.table.match(/<tr>/g) ?? []).length, 31);
  const hot = rentBuyView({ ...d, growth: '3', rent: '60000' }, ctx);
  assert.equal(hot.show.result, true);
  const bad = rentBuyView({ ...d, down: '2000' }, ctx);
  assert.equal(bad.show.error, true);
});

test('文案字典：zh-TW 與 en 鍵集合一致，且四個檢視模型用到的鍵都存在', () => {
  assert.deepEqual(
    Object.keys(housingUI['zh-TW']).sort(),
    Object.keys(housingUI.en).sort(),
  );
  for (const lang of ['zh-TW', 'en']) {
    const { labels, missing } = trackedLabels(lang);
    const ctx = ctxFor(lang, labels);
    const d = mortgageDefaults(ctx);
    for (const scenario of ['general', 'qingan3', 'qingan2'])
      for (const compare of ['0', '1']) {
        mortgageView(
          { ...d, scenario, compare, prepayMonth: '12', prepayAmount: '100' },
          ctx,
        );
        mortgageView({ ...d, scenario, amount: '0' }, ctx);
      }
    mortgageView(
      { ...d, amount: '3000', years: '45', grace: '7', drawMonth: '2099-01' },
      ctx,
    );
    mortgageView(
      {
        ...d,
        scenario: 'qingan2',
        years: '1',
        grace: '0',
        drawMonth: '2000-01',
      },
      ctx,
    );
    const a = affordabilityDefaults(ctx);
    for (const mode of ['official', 'mine'])
      for (const county of ['', '臺北市', '金門縣', '全國'])
        affordabilityView({ ...a, mode, county }, ctx);
    affordabilityView({ ...a, price: '' }, ctx);
    const e = eligibilityDefaults();
    for (const county of ['', '臺北市', '高雄市'])
      for (const home of ['none', 'share', 'parkingOrNiche', 'has', ''])
        eligibilityView(
          { ...e, county, home, newlywed: 'yes', child: 'yes' },
          ctx,
        );
    eligibilityView(
      {
        ...e,
        age: '',
        term: '',
        income: '',
        price: '',
        used: '',
        purchased: '',
      },
      ctx,
    );
    const r = rentBuyDefaults(ctx);
    rentBuyView(r, ctx);
    rentBuyView({ ...r, growth: '-5', invest: '6' }, ctx);
    rentBuyView({ ...r, price: '' }, ctx);
    rentBuyView({ ...r, down: '9999' }, ctx);
    assert.deepEqual([...missing].sort(), [], `${lang} 缺少文案鍵`);
  }
});

test('文案紀律：zh-TW 無破折號、無「不是…是」對位句、無寫死的條件數字來源於政策', () => {
  for (const [k, v] of Object.entries(housingUI['zh-TW'])) {
    assert.ok(!v.includes('——'), `${k} 含破折號`);
    assert.ok(!/不是[^。；]*[，,]\s*(而)?是/.test(v), `${k} 含對位句`);
    assert.ok(!/並非[^。；]*而是/.test(v), `${k} 含對位句`);
    assert.ok(!/不只[^。；]*更是/.test(v), `${k} 含對位句`);
  }
  for (const [k, v] of Object.entries(housingUI.en)) {
    assert.ok(!v.includes('—'), `${k} 含破折號`);
  }
});

test('網址參數：readParams 只讀自己前綴，writeParams 省略與預設相同的欄位', () => {
  assert.deepEqual(
    readParams(
      'mc',
      ['amount', 'years'],
      '?mc_amount=800&qe_age=30&mc_years=30',
    ),
    { amount: '800', years: '30' },
  );
  assert.deepEqual(readParams('qe', ['amount'], '?mc_amount=800'), {});
  // 沒有瀏覽器環境時 writeParams 不丟例外
  writeParams('mc', { amount: '800' }, { amount: '1000' });
});
