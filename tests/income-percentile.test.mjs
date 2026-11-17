/**
 * income-percentile.test.mjs — 「薪資位置自查」百分位估計的契約測試
 *（跑：node --experimental-strip-types --test tests/income-percentile.test.mjs）
 *
 * 分界點的官方數字出處（主計總處新聞稿，2025-11-25 發布，113 年／2024 年資料）：
 *   https://www.stat.gov.tw/News_Content.aspx?n=2716&s=235514
 *   D1 33.0、D5（中位數）54.6、D9 133.6、Q1 40.6、Q3 84.2（單位萬元）。
 * 內插是本工具的假設，不是官方數字：兩個官方分界點之間假設線性。
 */
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  estimatePercentile,
  quartileBand,
  breakpointsFrom,
} from '../src/utils/income/percentile.ts';

const here = dirname(fileURLToPath(import.meta.url));
const data = JSON.parse(
  readFileSync(
    join(here, '..', 'src', 'data', 'income', 'salary-distribution-2024.json'),
    'utf8',
  ),
);
const bp = breakpointsFrom(data.all);

test('breakpointsFrom：全體 11 個點，D5 與 median 合併、依薪資排序、跳過 mean', () => {
  assert.equal(bp.length, 11);
  assert.deepEqual(
    bp.map((b) => b.p),
    [10, 20, 25, 30, 40, 50, 60, 70, 75, 80, 90],
  );
  for (let i = 1; i < bp.length; i++) assert.ok(bp[i].value > bp[i - 1].value);
});

test('breakpointsFrom：null 跳過、空物件回空陣列', () => {
  assert.deepEqual(
    breakpointsFrom({ D1: null, D2: 100, median: null, q1: 50 }),
    [
      { p: 25, value: 50 },
      { p: 20, value: 100 },
    ].sort((a, b) => a.value - b.value),
  );
  assert.deepEqual(breakpointsFrom({}), []);
  assert.deepEqual(breakpointsFrom(null), []);
  // 本國籍全時：十分位全是 null，只剩 Q1／median／Q3
  assert.deepEqual(
    breakpointsFrom(data.domesticFullTime).map((b) => b.p),
    [25, 50, 75],
  );
});

test('分界點本身回該點的 p（官方數字）', () => {
  assert.equal(estimatePercentile(330000, bp).percentile, 10); // D1 33.0 萬
  assert.equal(estimatePercentile(546000, bp).percentile, 50); // 中位數 54.6 萬
  assert.equal(estimatePercentile(1336000, bp).percentile, 90); // D9 133.6 萬
  assert.equal(estimatePercentile(406000, bp).percentile, 25); // Q1 40.6 萬
  assert.equal(estimatePercentile(842000, bp).percentile, 75); // Q3 84.2 萬
  const hit = estimatePercentile(546000, bp);
  assert.equal(hit.band, 'interpolated');
  assert.equal(hit.lower.value, 546000);
  assert.equal(hit.upper.value, 546000);
});

test('兩點之間線性內插（本工具的假設，非官方數字）', () => {
  // 54.6 萬（p50）與 62.8 萬（p60）的正中間 58.7 萬：
  // 50 + (587000 − 546000) / (628000 − 546000) × 10 = 50 + 41000/82000 × 10 = 55
  const mid = estimatePercentile(587000, bp);
  assert.equal(mid.percentile, 55);
  assert.equal(mid.band, 'interpolated');
  assert.deepEqual(mid.lower, { p: 50, value: 546000 });
  assert.deepEqual(mid.upper, { p: 60, value: 628000 });

  // D1 33.0 萬（p10）與 D2 38.1 萬（p20）的正中間 35.55 萬：
  // 10 + (355500 − 330000) / (381000 − 330000) × 10 = 10 + 25500/51000 × 10 = 15
  assert.equal(estimatePercentile(355500, bp).percentile, 15);

  // Q1 40.6 萬（p25）到 D3 43.2 萬（p30）：41.9 萬在正中間，p＝27.5，四捨五入到 28
  // 25 + (419000 − 406000) / (432000 − 406000) × 5 = 25 + 13000/26000 × 5 = 27.5 → 28
  const q = estimatePercentile(419000, bp);
  assert.equal(q.percentile, 28);
  assert.deepEqual(q.lower, { p: 25, value: 406000 });
  assert.deepEqual(q.upper, { p: 30, value: 432000 });

  // Q3 84.2 萬（p75）到 D8 95.9 萬（p80）：90.05 萬在正中間，p＝77.5 → 78
  // 75 + (900500 − 842000) / (959000 − 842000) × 5 = 75 + 58500/117000 × 5 = 77.5 → 78
  assert.equal(estimatePercentile(900500, bp).percentile, 78);
});

test('內插結果單調：薪資越高百分位不會變低', () => {
  let prev = -1;
  for (let v = 330000; v <= 1336000; v += 7000) {
    const r = estimatePercentile(v, bp);
    assert.equal(r.band, 'interpolated');
    assert.ok(r.percentile >= prev, `${v} → ${r.percentile} < ${prev}`);
    assert.ok(r.percentile >= 10 && r.percentile <= 90);
    prev = r.percentile;
  }
});

test('上下界不外推', () => {
  const below = estimatePercentile(329999, bp);
  assert.equal(below.band, 'below-d1');
  assert.equal(below.percentile, null);
  assert.equal(below.upper.p, 10);
  assert.equal(estimatePercentile(0, bp).band, 'below-d1');

  const above = estimatePercentile(1336001, bp);
  assert.equal(above.band, 'above-d9');
  assert.equal(above.percentile, null);
  assert.equal(above.lower.p, 90);
  assert.equal(estimatePercentile(50_000_000, bp).band, 'above-d9');
});

test('輸入不照順序給也行；非法輸入丟錯', () => {
  const shuffled = [...bp].reverse();
  assert.equal(estimatePercentile(587000, shuffled).percentile, 55);
  assert.throws(() => estimatePercentile(NaN, bp), TypeError);
  assert.throws(() => estimatePercentile(500000, []), RangeError);
});

test('quartileBand：四段與邊界值', () => {
  const q = { q1: 406000, median: 546000, q3: 842000 };
  assert.equal(quartileBand(300000, q), 'below-q1');
  assert.equal(quartileBand(406000, q), 'q1-median');
  assert.equal(quartileBand(500000, q), 'q1-median');
  assert.equal(quartileBand(546000, q), 'median-q3');
  assert.equal(quartileBand(700000, q), 'median-q3');
  assert.equal(quartileBand(842000, q), 'above-q3');
  assert.equal(quartileBand(2000000, q), 'above-q3');
});

test('quartileBand：任何一個值為 null 回 null', () => {
  assert.equal(quartileBand(500000, { q1: null, median: 1, q3: 2 }), null);
  assert.equal(quartileBand(500000, { q1: 1, median: null, q3: 2 }), null);
  assert.equal(quartileBand(500000, { q1: 1, median: 2, q3: null }), null);
});

test('資料檔完整性：全體 D1<…<D9、Q1<median<Q3、median＝D5', () => {
  const a = data.all;
  const ds = [a.D1, a.D2, a.D3, a.D4, a.D5, a.D6, a.D7, a.D8, a.D9];
  for (const v of ds) assert.ok(Number.isInteger(v) && v > 0);
  for (let i = 1; i < ds.length; i++) assert.ok(ds[i] > ds[i - 1]);
  assert.ok(a.Q1 < a.median && a.median < a.Q3);
  assert.equal(a.median, a.D5);
  assert.ok(a.D2 < a.Q1 && a.Q1 < a.D3);
  assert.ok(a.D7 < a.Q3 && a.Q3 < a.D8);
  assert.equal(a.mean, 732000);
  // 本國籍全時：58.5 萬（新聞稿摘要二）
  assert.equal(data.domesticFullTime.median, 585000);
  assert.ok(data.domesticFullTime.Q1 < data.domesticFullTime.median);
  assert.ok(data.domesticFullTime.median < data.domesticFullTime.Q3);
});

test('資料檔完整性：各組 median 為正數或 null，且 q1<median<q3（有值時）', () => {
  const groups = [
    ...data.bySex,
    ...data.byAge,
    ...data.byEducation,
    ...data.byIndustry,
    ...data.byFirmSize,
    ...data.domesticFullTime.bySex,
    ...data.domesticFullTime.byAge,
    ...data.domesticFullTime.byEducation,
    ...data.domesticFullTime.byIndustry,
  ];
  assert.ok(groups.length > 100);
  const ids = new Set();
  for (const g of groups) {
    assert.ok(g.id && g.label.zh && g.label.en, JSON.stringify(g));
    assert.ok(
      g.median === null || (typeof g.median === 'number' && g.median > 0),
      g.id,
    );
    if (g.q1 !== null && g.median !== null && g.q3 !== null) {
      assert.ok(g.q1 < g.median && g.median < g.q3, g.id);
    }
    ids.add(g.id);
  }
  for (const g of data.byIndustry) {
    assert.ok(typeof g.median === 'number', g.id);
  }
  // 抽查（表 3／表 5）：研究所 109.9 萬、金融及保險業 110.6 萬、女性 51.2 萬
  const by = (arr, id) => arr.find((x) => x.id === id);
  assert.equal(by(data.byEducation, 'graduate').median, 1099000);
  assert.equal(by(data.byIndustry, 'finance-insurance').median, 1106000);
  assert.equal(by(data.bySex, 'female').median, 512000);
  // 100-299 人：表 5 沒有四分位
  assert.equal(by(data.byFirmSize, '100-299').q1, null);
  assert.equal(by(data.byFirmSize, '100-299').median, 591000);
  assert.equal(data.domesticFullTime.byFirmSize, null);
});

test('資料檔完整性：歷年序列等長、逐年遞增、113 年與 all 一致', () => {
  const h = data.history;
  assert.equal(h.years.length, 11);
  assert.equal(h.years[0], 2014);
  assert.equal(h.years.at(-1), 2024);
  for (const k of [
    'D1',
    'D2',
    'D3',
    'D4',
    'D5',
    'D6',
    'D7',
    'D8',
    'D9',
    'median',
    'Q1',
    'Q3',
    'mean',
  ]) {
    assert.equal(h[k].length, 11, k);
  }
  // D9 在 112 年小跌（128.1 → 127.9 萬，表 2 原樣），所以只檢查 D1、中位數逐年不降
  for (const k of ['D1', 'D5', 'median']) {
    for (let i = 1; i < 11; i++)
      assert.ok(h[k][i] >= h[k][i - 1], `${k} ${h.years[i]}`);
  }
  assert.equal(h.D1.at(-1), data.all.D1);
  assert.equal(h.D9.at(-1), data.all.D9);
  assert.equal(h.D1[0], 248000); // 103 年 D1 24.8 萬
  assert.equal(h.median[0], 452000); // 103 年中位數 45.2 萬
});
