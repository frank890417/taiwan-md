/**
 * income-percentile-view.test.mjs — 薪資位置自查的 View 純函式與文案契約測試
 *（跑：node --experimental-strip-types --test tests/income-percentile-view.test.mjs）
 */
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  computePercentileView,
  viewTexts,
  renderScaleSvg,
  markerPosition,
  tickLabel,
  shortMoney,
  fillTemplate,
  PCT_MSG_KEYS,
} from '../src/utils/income/percentileView.ts';
import { toolPercentile } from '../src/i18n/income/tool-percentile.ts';

const here = dirname(fileURLToPath(import.meta.url));
const dist = JSON.parse(
  readFileSync(
    join(here, '../src/data/income/salary-distribution-2024.json'),
    'utf8',
  ),
);

const groups = (list) =>
  list.map((g) => ({
    id: g.id,
    label: g.label.zh,
    median: g.median,
    q1: g.q1,
    q3: g.q3,
  }));
const P = {
  all: dist.all,
  domestic: {
    q1: dist.domesticFullTime.Q1,
    median: dist.domesticFullTime.median,
    q3: dist.domesticFullTime.Q3,
  },
  groups: {
    age: groups(dist.byAge),
    industry: groups(dist.byIndustry),
    sex: groups(dist.bySex),
  },
};
const base = { salary: 600000, age: '', industry: '', sex: '' };

function msgs(loc) {
  const d = toolPercentile[loc === 'zh-TW' ? 'zh-TW' : 'en'];
  return Object.fromEntries(
    PCT_MSG_KEYS.map((k) => [k, d['income.percentile.' + k]]),
  );
}

function assertClean(s) {
  assert.ok(!/NaN|undefined|Infinity/.test(s), s.slice(0, 200));
}

test('預設案例：60 萬落在 D5 與 D6 之間，百分位約 57', () => {
  const v = computePercentileView(base, P);
  assert.equal(v.band, 'interpolated');
  assert.ok(v.percentile >= 50 && v.percentile <= 60);
  assert.equal(v.direction, 'above');
  assert.equal(v.diff, 600000 - dist.all.median);
  assert.equal(v.scale.place, 'within');
  assert.ok(v.scale.pos > 50 && v.scale.pos < 62.5);
});

test('markerPosition：D1 為 0、D9 為 100、兩端外停在端點、中位數為 50', () => {
  const vals = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((x) => x * 100);
  assert.deepEqual(markerPosition(100, vals), { pos: 0, place: 'within' });
  assert.deepEqual(markerPosition(900, vals), { pos: 100, place: 'within' });
  assert.deepEqual(markerPosition(50, vals), { pos: 0, place: 'below' });
  assert.deepEqual(markerPosition(1e9, vals), { pos: 100, place: 'above' });
  assert.equal(markerPosition(500, vals).pos, 50);
  assert.equal(markerPosition(550, vals).pos, 56.25);
});

test('低於 D1、高於 D9：不給百分位，顯示邊界文案', () => {
  const lo = computePercentileView({ ...base, salary: 100000 }, P);
  assert.equal(lo.percentile, null);
  assert.equal(lo.band, 'below-d1');
  assert.equal(lo.scale.pos, 0);
  const hi = computePercentileView({ ...base, salary: 5000000 }, P);
  assert.equal(hi.percentile, null);
  assert.equal(hi.band, 'above-d9');
  assert.equal(hi.scale.pos, 100);
  for (const loc of ['zh-TW', 'en']) {
    const M = msgs(loc);
    const a = viewTexts(lo, M, loc);
    const b = viewTexts(hi, M, loc);
    assert.equal(a.show.edge, true);
    assert.equal(b.show.edge, true);
    assert.ok(a.out.value && !/\d/.test(a.out.value.replace(/10/, '')));
    assert.ok(b.out.value && !/\d/.test(b.out.value.replace(/10/, '')));
    assertClean(JSON.stringify([a, b]));
  }
});

test('邊界輸入：0、負數、極大值、NaN 不會壞', () => {
  for (const salary of [0, -5, 1e15, NaN, Infinity]) {
    for (const loc of ['zh-TW', 'en']) {
      const v = computePercentileView({ ...base, salary }, P);
      const M = msgs(loc);
      const tx = viewTexts(v, M, loc);
      const svg = renderScaleSvg(v.scale, M, loc, tx.out.value);
      assertClean(svg);
      assertClean(JSON.stringify(tx));
    }
  }
});

test('SVG 是合法片段：有 svg 根、九個刻度、標記、aria-label', () => {
  for (const loc of ['zh-TW', 'en']) {
    const M = msgs(loc);
    const v = computePercentileView(base, P);
    const tx = viewTexts(v, M, loc);
    const svg = renderScaleSvg(v.scale, M, loc, tx.out.value);
    assert.ok(svg.startsWith('<svg') && svg.endsWith('</svg>'));
    assert.match(svg, /role="img"/);
    assert.match(svg, /aria-label="[^"]+"/);
    assert.equal((svg.match(/class="inc-axis/g) ?? []).length, 9);
    assert.match(svg, /inc-pct-mline/);
    assert.match(svg, /D1/);
    assert.match(svg, /D9/);
    assertClean(svg);
  }
  const edge = computePercentileView({ ...base, salary: 10 }, P);
  const svg = renderScaleSvg(edge.scale, msgs('zh-TW'), 'zh-TW', 'x');
  assert.match(svg, /D1 以下/);
  const up = computePercentileView({ ...base, salary: 9e6 }, P);
  assert.match(renderScaleSvg(up.scale, msgs('en'), 'en', 'x'), /Above D9/);
});

test('SVG 文字會跳脫，不會被注入', () => {
  const v = computePercentileView(base, P);
  const svg = renderScaleSvg(
    v.scale,
    { 'scale.you': '<b>"x"</b> {amount}', 'scale.aria': '"><script>' },
    'en',
    '',
  );
  assert.ok(!svg.includes('<b>'));
  assert.ok(!svg.includes('<script>'));
});

test('比較組：年齡、行業、性別各顯示中位數與落點；沒選不顯示；null 顯示沒有資料', () => {
  const M = msgs('zh-TW');
  const none = viewTexts(computePercentileView(base, P), M, 'zh-TW');
  assert.equal(none.show['row-age'], false);
  assert.equal(none.show['row-industry'], false);
  assert.equal(none.show['row-sex'], false);

  const v = computePercentileView(
    { ...base, age: '30-39', industry: 'finance-insurance', sex: 'female' },
    P,
  );
  const tx = viewTexts(v, M, 'zh-TW');
  assert.equal(tx.show['row-age'], true);
  assert.match(tx.out['row-age-median'], /581,000/);
  assert.equal(tx.out['row-age-band'], M['band.median-q3']);
  assert.match(tx.out['row-industry-median'], /\d/);
  assert.match(tx.out['row-sex-label'], /女/);

  const nd = viewTexts(
    computePercentileView(base, {
      ...P,
      groups: {
        ...P.groups,
        age: [{ id: 'x', label: 'X', median: null, q1: null, q3: null }],
      },
    }),
    M,
    'zh-TW',
  );
  assert.ok(nd.out.value);
  const nd2 = viewTexts(
    computePercentileView(
      { ...base, age: 'x' },
      {
        ...P,
        groups: {
          ...P.groups,
          age: [{ id: 'x', label: 'X', median: null, q1: null, q3: null }],
        },
      },
    ),
    M,
    'zh-TW',
  );
  assert.equal(nd2.out['row-age-median'], '沒有資料');
  assert.equal(nd2.out['row-age-band'], '沒有資料');
});

test('本國籍全時列：中位數 58.5 萬與落點', () => {
  const tx = viewTexts(computePercentileView(base, P), msgs('zh-TW'), 'zh-TW');
  assert.equal(tx.out['dom-median'], '585,000 元');
  assert.equal(tx.out['dom-band'], msgs('zh-TW')['band.median-q3']);
});

test('格式化：刻度與短金額', () => {
  assert.equal(tickLabel(330000, 'zh-TW'), '33');
  assert.equal(tickLabel(1336000, 'zh-TW'), '133.6');
  assert.equal(tickLabel(330000, 'en'), '330k');
  assert.equal(shortMoney(546000, 'zh-TW'), '54.6 萬');
  assert.equal(shortMoney(600000, 'en'), 'NT$600k');
  assert.equal(fillTemplate('a {x} {x}', { x: 1 }), 'a 1 1');
});

test('文案：zh-TW 與 en 的 key 完全一致、動態訊息 key 都存在', () => {
  const zh = Object.keys(toolPercentile['zh-TW']).sort();
  const en = Object.keys(toolPercentile.en).sort();
  assert.deepEqual(zh, en);
  assert.ok(zh.every((k) => k.startsWith('income.percentile.')));
  for (const k of PCT_MSG_KEYS) {
    assert.ok('income.percentile.' + k in toolPercentile['zh-TW'], k);
  }
});

test('文案：FAQ 與資料檔的數字一致', () => {
  const zh = toolPercentile['zh-TW'];
  const wan = (n) => String(Math.round(n / 1000) / 10);
  const p = 'income.percentile.';
  assert.ok(zh[p + 'page.faq1.a'].includes(wan(dist.all.median) + ' 萬'));
  assert.ok(
    zh[p + 'page.faq1.a'].includes(wan(dist.domesticFullTime.median) + ' 萬'),
  );
  assert.ok(zh[p + 'page.faq2.a'].includes(wan(dist.all.mean) + ' 萬'));
  assert.ok(zh[p + 'page.faq3.a'].includes(wan(dist.all.D9) + ' 萬'));
  const en = toolPercentile.en;
  assert.ok(
    en[p + 'page.faq1.a'].includes(dist.all.median.toLocaleString('en-US')),
  );
  assert.ok(
    en[p + 'page.faq1.a'].includes(
      dist.domesticFullTime.median.toLocaleString('en-US'),
    ),
  );
  assert.ok(
    en[p + 'page.faq2.a'].includes(dist.all.mean.toLocaleString('en-US')),
  );
  assert.ok(
    en[p + 'page.faq3.a'].includes(dist.all.D9.toLocaleString('en-US')),
  );
});

test('文案：中文不含破折號，網址可解析', () => {
  const zh = toolPercentile['zh-TW'];
  for (const [k, v] of Object.entries(zh)) assert.ok(!v.includes('——'), k);
  for (const [k, v] of Object.entries(toolPercentile.en)) {
    if (k.endsWith('.url')) assert.doesNotThrow(() => new URL(v), k);
  }
});
