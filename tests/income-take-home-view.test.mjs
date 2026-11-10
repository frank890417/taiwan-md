/**
 * income-take-home-view.test.mjs — 實領薪資工具的結果與兩條堆疊條純函式
 *（跑：node --experimental-strip-types --test tests/income-take-home-view.test.mjs）
 */
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';

import {
  ariaVars,
  buildTakeHomeView,
  fillTpl,
  pctByKey,
  takeHomeOuts,
} from '../src/utils/income/takeHomeView.ts';

const read = (n) =>
  JSON.parse(
    readFileSync(
      new URL(`../src/data/income/${n}.json`, import.meta.url),
      'utf8',
    ),
  );
const labor = read('labor-2026');
const P = {
  labor: {
    laborInsurance: labor.laborInsurance,
    occupationalAccident: labor.occupationalAccident,
    laborPension: labor.laborPension,
  },
  tax: read('tax-115'),
};
const base = {
  wage: 45000,
  bonus: 1.5,
  selfRate: 0,
  nhi: null,
  withTax: true,
  dependents: 0,
  occRate: null,
};
const fmt = {
  money: (n) => `${Math.round(n)}`,
  pct: (x) => `${(x * 100).toFixed(1)}%`,
  unsetNhi: 'NHI?',
  unsetTax: 'TAX?',
};
const sum = (l) => l.reduce((a, s) => a + s.pct, 0);
const clean = (s) => !/NaN|undefined|Infinity/.test(s);

test('預設案例：月薪 45,000、年終 1.5 個月', () => {
  const v = buildTakeHomeView(base, P);
  // 勞保局 115 年分擔表 45,800 級：勞工 1,053＋92，雇主 3,687＋321
  assert.equal(v.result.worker.laborInsurance, 1053);
  assert.equal(v.result.worker.employmentInsurance, 92);
  assert.equal(v.result.employer.laborInsurance, 3687);
  assert.equal(v.result.employer.employmentInsurance, 321);
  // 稅：607,500 − 227,000 − 101,000 − 136,000 = 143,500，5% = 7,175
  assert.equal(v.annualTax, 7175);
  assert.equal(v.result.worker.incomeTaxMonthly, 598);
  assert.equal(v.result.worker.takeHomeMonthly, 43257);
  assert.equal(v.workerBar.length, 5);
  assert.equal(v.employerBar.length, 4);
  assert.ok(Math.abs(sum(v.workerBar) - 100) < 0.1);
  assert.ok(Math.abs(sum(v.employerBar) - 100) < 0.1);
});

test('輸出文字與替代文字沒有 NaN／undefined', () => {
  const v = buildTakeHomeView(base, P);
  const outs = takeHomeOuts(v, fmt);
  assert.equal(outs.nhi, 'NHI?');
  for (const val of Object.values(outs)) assert.ok(clean(val));
  const a = ariaVars(v, fmt);
  for (const val of [...Object.values(a.bar1), ...Object.values(a.bar2)])
    assert.ok(clean(val));
  const filled = fillTpl('實領 {take}、稅 {tax}', a.bar1);
  assert.ok(!filled.includes('{'));
});

test('勞退自提 6%：實領下降、所得稅下降', () => {
  const a = buildTakeHomeView(base, P);
  const b = buildTakeHomeView({ ...base, selfRate: 0.06 }, P);
  assert.equal(b.result.worker.pensionSelf, 2748);
  assert.ok(b.annualTax < a.annualTax);
  assert.ok(b.result.worker.takeHomeMonthly < a.result.worker.takeHomeMonthly);
});

test('健保費有填、不估算所得稅', () => {
  const v = buildTakeHomeView({ ...base, nhi: 800, withTax: false }, P);
  assert.equal(v.annualTax, null);
  assert.equal(v.result.worker.nhi, 800);
  const outs = takeHomeOuts(v, fmt);
  assert.equal(outs.tax, 'TAX?');
  assert.equal(outs.nhi, '800');
  assert.ok(pctByKey(v.workerBar)['w-nhi'] > 0);
  assert.equal(pctByKey(v.workerBar)['w-tax'], 0);
});

test('邊界：0、極大值、亂輸入', () => {
  for (const wage of [0, 1, 30000, 150000, 1e9]) {
    for (const bonus of [0, 24]) {
      const v = buildTakeHomeView(
        { ...base, wage, bonus, selfRate: 0.06, nhi: 0 },
        P,
      );
      const outs = takeHomeOuts(v, fmt);
      for (const val of Object.values(outs))
        assert.ok(clean(val), `${wage}:${val}`);
      for (const s of [...v.workerBar, ...v.employerBar]) {
        assert.ok(s.pct >= 0 && s.pct <= 100 && Number.isFinite(s.pct));
        assert.match(s.cls, /^inc-c[0-5]$/);
      }
    }
  }
  const odd = buildTakeHomeView(
    {
      wage: NaN,
      bonus: -3,
      selfRate: 9,
      nhi: -5,
      withTax: true,
      dependents: 99,
      occRate: 5,
    },
    P,
  );
  assert.ok(Number.isFinite(odd.result.worker.takeHomeMonthly));
  assert.equal(odd.takePct, 0);
  assert.ok(odd.result.worker.pensionSelf >= 0);
});

test('月薪超過 45,800：自付勞保不再增加，雇主職災與勞退仍增加', () => {
  const a = buildTakeHomeView({ ...base, wage: 46000 }, P);
  const b = buildTakeHomeView({ ...base, wage: 70000 }, P);
  assert.equal(a.result.worker.laborInsurance, b.result.worker.laborInsurance);
  assert.ok(
    b.result.employer.occupationalAccident >
      a.result.employer.occupationalAccident,
  );
  assert.ok(b.result.employer.pension > a.result.employer.pension);
});
