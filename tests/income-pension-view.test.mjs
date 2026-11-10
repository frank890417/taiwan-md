/**
 * income-pension-view.test.mjs — 勞保年金與勞退試算的檢視層純函式
 *（跑：node --experimental-strip-types --test tests/income-pension-view.test.mjs）
 */
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';

import {
  buildPensionView,
  curveSvg,
  summarizeCurve,
  fillTemplate,
  formulaTexts,
} from '../src/utils/income/pensionView.ts';
import { toolPension } from '../src/i18n/income/tool-pension.ts';

const data = JSON.parse(
  readFileSync(
    new URL('../src/data/income/labor-2026.json', import.meta.url),
    'utf8',
  ),
);
const li = data.laborInsurance;
const lp = data.laborPension;
const P = {
  li: {
    pension: li.pension,
    claimAgeByBirthYear: li.claimAgeByBirthYear,
    lumpSum: li.lumpSum,
    insuredSalaryGrades: li.insuredSalaryGrades,
  },
  lp: {
    contributionGrades: lp.contributionGrades,
    annuityRate: lp.annuityRate,
    lifeExpectancy: lp.lifeExpectancy,
    employerMinRate: lp.employerMinRate,
    selfMaxRate: lp.selfMaxRate,
    minSeniorityYearsForAnnuity: lp.minSeniorityYearsForAnnuity,
    guaranteedReturn: lp.guaranteedReturn.rate,
  },
};

function msgs(locale) {
  const dict = toolPension[locale];
  const p = 'income.pension.msg.';
  return Object.fromEntries(
    Object.keys(dict)
      .filter((k) => k.startsWith(p))
      .map((k) => [k.slice(p.length), dict[k]]),
  );
}

const DEFAULT = {
  birthYear: 60,
  claimAge: 65,
  years: 30,
  months: 0,
  avgSalary: 45800,
  wage: 45000,
  balance: 0,
  yearsLeft: 30,
  paidYears: 0,
  employerRate: 6,
  selfRate: 0,
  ret: 7.64,
  growth: 1.52,
  pensionAge: 65,
};

const BAD = /NaN|undefined|Infinity|\{[a-zA-Z]+\}/;

function assertClean(view) {
  for (const [k, v] of Object.entries(view.out))
    assert.doesNotMatch(v, BAD, `out.${k}: ${v}`);
  assert.doesNotMatch(view.svg, BAD);
}

test('zh 與 en 的 key 完全一致', () => {
  assert.deepEqual(
    Object.keys(toolPension.en).sort(),
    Object.keys(toolPension['zh-TW']).sort(),
  );
});

test('預設案例：45,800 × 30 年 × 1.55% = 21,297，65 歲領', () => {
  const v = buildPensionView(DEFAULT, P, msgs('zh-TW'), 'zh-TW');
  assertClean(v);
  assert.equal(v.out.lbMonthly, '21,297 元');
  assert.equal(v.out.lbFormula, '第二式');
  assert.equal(v.out.lbStatAge, '65 歲');
  assert.equal(v.show.lbOk, true);
  assert.equal(v.show.lbNo, false);
  assert.equal(v.show.lpOk, true);
  assert.equal(v.show.chart, true);
  assert.match(v.svg, /^<svg[^>]*role="img"[^>]*aria-label="[^"]+"/);
  assert.match(v.svg, /<path class="inc-line"/);
  assert.match(v.svg, /<\/svg>$/);
  // 60 到 70 歲共 11 個點，其中一個是選取點
  assert.equal((v.svg.match(/class="pen-pt"/g) ?? []).length, 11);
  assert.equal((v.svg.match(/class="inc-dot"/g) ?? []).length, 1);
  assert.match(v.out.chartAria, /提前 5 年/);
  assert.match(v.out.chartAria, /延後 5 年/);
});

test('英文版金額格式與訊息', () => {
  const v = buildPensionView(DEFAULT, P, msgs('en'), 'en');
  assertClean(v);
  assert.match(v.out.lbMonthly, /^NT\$21,297$/);
  assert.match(v.out.total, /^NT\$/);
});

test('合計 = 勞保 + 勞退', () => {
  const v = buildPensionView(DEFAULT, P, msgs('zh-TW'), 'zh-TW');
  const n = (s) => Number(s.replace(/[^0-9]/g, ''));
  assert.equal(n(v.out.total), n(v.out.lbMonthly) + n(v.out.lpMonthly));
});

test('提前 3 年與延後 3 年的增減', () => {
  const early = buildPensionView(
    { ...DEFAULT, claimAge: 62 },
    P,
    msgs('zh-TW'),
    'zh-TW',
  );
  assert.match(early.out.lbAdj, /早 3 年領，減給 12%/);
  const late = buildPensionView(
    { ...DEFAULT, claimAge: 68 },
    P,
    msgs('zh-TW'),
    'zh-TW',
  );
  assert.match(late.out.lbAdj, /晚 3 年領，增給 12%/);
  assert.equal(late.out.lbMonthly, '23,853 元'); // 21,297 × 1.12
});

test('年資未滿 15 年：不符年金條件、給一次金月數、沒有曲線', () => {
  const v = buildPensionView(
    { ...DEFAULT, years: 10 },
    P,
    msgs('zh-TW'),
    'zh-TW',
  );
  assertClean(v);
  assert.equal(v.show.lbOk, false);
  assert.equal(v.show.lbNo, true);
  assert.equal(v.show.chart, false);
  assert.match(v.out.lbReason, /10 個月/);
  assert.equal(v.out.lbMonthly, '0 元');
});

test('請領年齡早於可提前下限：TOO_EARLY，曲線仍在', () => {
  // 60 年次法定 65，最早 60 歲；輸入 58 歲會被夾到下限 55，也就是太早
  const v = buildPensionView(
    { ...DEFAULT, claimAge: 58 },
    P,
    msgs('zh-TW'),
    'zh-TW',
  );
  assertClean(v);
  assert.equal(v.show.lbNo, true);
  assert.match(v.out.lbReason, /最早 60 歲/);
  assert.equal(v.show.chart, true);
  assert.equal((v.svg.match(/class="inc-dot"/g) ?? []).length, 0);
});

test('勞退提繳年資未滿 15 年：只能一次領，顯示專戶累積，不算月退', () => {
  const v = buildPensionView(
    { ...DEFAULT, yearsLeft: 10, paidYears: 2 },
    P,
    msgs('zh-TW'),
    'zh-TW',
  );
  assertClean(v);
  assert.equal(v.show.lpOk, false);
  assert.equal(v.show.lpNo, true);
  assert.equal(v.out.lpMonthly, '0 元');
  assert.match(v.out.lpReason, /12 年/);
  assert.match(v.out.lpReason, /元/);
});

test('已提繳年資補足 15 年就能領月退', () => {
  const v = buildPensionView(
    { ...DEFAULT, yearsLeft: 5, paidYears: 10 },
    P,
    msgs('zh-TW'),
    'zh-TW',
  );
  assert.equal(v.show.lpOk, true);
});

test('邊界：全 0、極大值、空欄位都不會壞', () => {
  const zero = buildPensionView(
    {
      ...DEFAULT,
      years: 0,
      months: 0,
      avgSalary: 0,
      wage: 0,
      balance: 0,
      yearsLeft: 0,
    },
    P,
    msgs('zh-TW'),
    'zh-TW',
  );
  assertClean(zero);
  assert.equal(zero.show.chart, false);
  const big = buildPensionView(
    {
      ...DEFAULT,
      years: 99,
      months: 99,
      avgSalary: 1e12,
      wage: 1e9,
      balance: 1e12,
      yearsLeft: 60,
      claimAge: 999,
      pensionAge: 999,
      birthYear: 999,
      ret: 30,
      growth: 20,
    },
    P,
    msgs('en'),
    'en',
  );
  assertClean(big);
  const nan = buildPensionView(
    { ...DEFAULT, years: NaN, avgSalary: NaN, wage: NaN },
    P,
    msgs('zh-TW'),
    'zh-TW',
  );
  assertClean(nan);
});

test('老出生年次（法定 60 歲）：曲線從 55 歲開始', () => {
  const v = buildPensionView(
    { ...DEFAULT, birthYear: 40, claimAge: 60 },
    P,
    msgs('zh-TW'),
    'zh-TW',
  );
  assertClean(v);
  assert.equal((v.svg.match(/class="pen-pt"/g) ?? []).length, 16);
  assert.match(v.out.lbAdj, /剛好是法定年齡/);
});

test('curveSvg：沒有可請領的點時只有座標軸；標籤會跳脫', () => {
  const s = curveSvg([{ age: 60, monthly: 0, eligible: false }], {
    statutoryAge: 65,
    ariaLabel: 'a"<b>',
    xLabel: 'x',
    statutoryLabel: 's',
  });
  assert.match(s, /aria-label="a&quot;&lt;b&gt;"/);
  assert.doesNotMatch(s, /pen-pt/);
  const one = curveSvg([{ age: 65, monthly: 100, eligible: true }], {
    statutoryAge: 65,
    selectedAge: 65,
    ariaLabel: 'a',
    xLabel: 'x',
    statutoryLabel: 's',
  });
  assert.doesNotMatch(one, BAD);
});

test('summarizeCurve 與 fillTemplate / formulaTexts', () => {
  const pts = [60, 65, 70].map((age) => ({
    age,
    monthly: age * 100,
    eligible: true,
  }));
  const s = summarizeCurve(pts, 65, 5);
  assert.equal(s.early.monthly, 6000);
  assert.equal(s.late.monthly, 7000);
  assert.equal(fillTemplate('a{x}b{x}', { x: 1 }), 'a1b1');
  assert.deepEqual(formulaTexts(P), {
    coefA: '0.775',
    constA: '3,000',
    coefB: '1.55',
  });
});

test('保證收益率情境：月退比預設報酬率低，且比率副行有兩句', () => {
  const v = buildPensionView(DEFAULT, P, msgs('zh-TW'), 'zh-TW');
  assertClean(v);
  const n = (x) => Number(x.replace(/[^0-9]/g, ''));
  assert.ok(n(v.out.lpMonthlyLow) > 0);
  assert.ok(n(v.out.lpMonthlyLow) < n(v.out.lpMonthly));
  assert.match(v.out.ratio, /不是官方所得替代率/);
  assert.match(v.out.ratio, /名目金額/);
  const same = buildPensionView(
    { ...DEFAULT, ret: lp.guaranteedReturn.rate * 100 },
    P,
    msgs('en'),
    'en',
  );
  assert.equal(same.out.lpMonthlyLow, same.out.lpMonthly);
  assert.match(same.out.ratio, /nominal/);
});

test('x 軸刻度隔一個標一個', () => {
  const v = buildPensionView(DEFAULT, P, msgs('zh-TW'), 'zh-TW');
  const ticks = [
    ...v.svg.matchAll(/text-anchor="middle">(\d{2})<\/text>/g),
  ].map((m) => Number(m[1]));
  assert.deepEqual(ticks, [60, 62, 64, 66, 68, 70]);
});
