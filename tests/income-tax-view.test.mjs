/**
 * income-tax-view.test.mjs — 所得稅試算視圖層（taxView.ts）的測試
 *（跑：node --experimental-strip-types --test tests/income-tax-view.test.mjs）
 */
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  bracketStepsSvg,
  runTax,
  stepLabels,
  toTaxInput,
  TAX_DEFAULT_STATE,
  TAX_MSG_KEYS,
} from '../src/utils/income/taxView.ts';
import { toolTax } from '../src/i18n/income/tool-tax.ts';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const load = (n) =>
  JSON.parse(readFileSync(join(ROOT, `src/data/income/tax-${n}.json`), 'utf8'));
const ALL = { 114: load(114), 115: load(115) };

const msgs = (lang) =>
  Object.fromEntries(
    TAX_MSG_KEYS.map((k) => [k, toolTax[lang][`income.tax.${k}`]]),
  );
const LOC = { 'zh-TW': 'zh-TW', en: 'en' };
const BAD = /NaN|undefined|Infinity|null/;

test('i18n：兩種語言 key 完全一致、動態訊息 key 都有字', () => {
  const a = Object.keys(toolTax.en).sort();
  const b = Object.keys(toolTax['zh-TW']).sort();
  assert.deepEqual(a, b);
  for (const lang of ['en', 'zh-TW'])
    for (const k of TAX_MSG_KEYS)
      assert.notEqual(
        toolTax[lang][`income.tax.${k}`],
        undefined,
        `${lang} 缺 ${k}`,
      );
});

test('預設案例（單身、年薪 60 萬）：應納 6,800，淨額 136,000，落在第 1 級', () => {
  for (const lang of ['zh-TW', 'en']) {
    const v = runTax(TAX_DEFAULT_STATE, ALL, msgs(lang), LOC[lang]);
    assert.equal(v.result.totalDue, 6800);
    assert.equal(v.result.netIncome, 136000);
    assert.equal(v.result.bracketIndex, 0);
    assert.match(v.svg, /^<svg /);
    assert.match(v.svg, /<\/svg>$/);
    assert.equal((v.svg.match(/<rect /g) || []).length, 5);
    assert.doesNotMatch(v.svg, BAD);
    for (const [k, s] of Object.entries(v.out)) assert.doesNotMatch(s, BAD, k);
    assert.equal(v.show.wBasic, true); // 115 年度基本生活費未公告
    assert.equal(v.show.best, false);
    assert.equal(v.show.div, false);
    assert.equal(v.show.spouse, false);
  }
});

test('114 年度：基本生活費有公告，不顯示未公告警告', () => {
  const v = runTax(
    { ...TAX_DEFAULT_STATE, year: '114' },
    ALL,
    msgs('zh-TW'),
    'zh-TW',
  );
  assert.equal(v.show.wBasic, false);
  assert.doesNotMatch(v.out.basicLiving, /尚未/);
});

test('有配偶與股利：最省計稅方式與股利比較有字、有旗標', () => {
  const s = {
    ...TAX_DEFAULT_STATE,
    married: '1',
    salary: 1800000,
    spouseSalary: 500000,
    dividend: 300000,
    withheld: 100000,
  };
  const v = runTax(s, ALL, msgs('zh-TW'), 'zh-TW');
  assert.equal(v.show.best, true);
  assert.equal(v.show.div, true);
  assert.equal(v.show.spouse, true);
  assert.ok(v.out.best.length > 0);
  assert.ok(v.out.divBest.length > 0);
  assert.equal(v.result.methods.length, 10);
  for (const [k, t] of Object.entries(v.out)) assert.doesNotMatch(t, BAD, k);
  assert.doesNotMatch(v.svg, BAD);
});

test('6 歲以下超過未成年子女：夾到上限並出提示', () => {
  const { input, clampedTo } = toTaxInput({
    ...TAX_DEFAULT_STATE,
    minorChildren: 1,
    preschool: 3,
  });
  assert.equal(input.dependents.preschool, 1);
  assert.equal(clampedTo, 1);
  const v = runTax(
    { ...TAX_DEFAULT_STATE, minorChildren: 1, preschool: 3 },
    ALL,
    msgs('en'),
    'en',
  );
  assert.equal(v.show.clamp, true);
  assert.match(v.out.clamp, /1/);
});

test('負數與空值當 0', () => {
  const v = runTax(
    { ...TAX_DEFAULT_STATE, salary: -5, general: -2, rent: '', withheld: NaN },
    ALL,
    msgs('en'),
    'en',
  );
  assert.equal(v.result.totalDue, 0);
  assert.doesNotMatch(v.svg, BAD);
});

test('階梯圖：每個淨額都合法，五格等寬，只有一格加框', () => {
  for (const lang of ['zh-TW', 'en']) {
    const labels = stepLabels(msgs(lang), lang);
    for (const p of [ALL[114], ALL[115]]) {
      for (const net of [
        0,
        1,
        610000,
        610001,
        1380000,
        2770000,
        5190000,
        5190001,
        1e7,
        1e12,
        -100,
        NaN,
        Infinity,
      ]) {
        const svg = bracketStepsSvg(net, p, labels);
        assert.match(svg, /^<svg /, String(net));
        assert.doesNotMatch(svg, BAD, String(net));
        const ws = [...svg.matchAll(/<rect [^>]*width="([\d.]+)"/g)].map(
          (m) => m[1],
        );
        assert.equal(ws.length, 5);
        assert.equal(new Set(ws).size, 1);
        assert.equal((svg.match(/is-cur/g) || []).length, 1);
        assert.equal((svg.match(/class="inc-step-mark"/g) || []).length, 1);
        const xs = [...svg.matchAll(/class="inc-step-mark" x="([\d.]+)"/g)].map(
          (m) => Number(m[1]),
        );
        assert.ok(xs[0] >= 0 && xs[0] <= 360, `${net} → ${xs[0]}`);
      }
    }
  }
});

test('階梯圖：範圍文字與課到的稅額', () => {
  const zh = bracketStepsSvg(
    1000000,
    ALL[115],
    stepLabels(msgs('zh-TW'), 'zh-TW'),
  );
  for (const t of [
    '61萬以下',
    '61–138萬',
    '138–277萬',
    '277–519萬',
    '519萬以上',
  ])
    assert.ok(zh.includes(t), t);
  assert.ok(zh.includes('你的淨額 100萬'));
  // 淨額 100 萬：第 1 級 30,500、第 2 級 (1,000,000-610,000)×12% = 46,800，其餘沒課到就不寫
  assert.equal((zh.match(/class="inc-step-tax"/g) || []).length, 2);
  assert.ok(zh.includes('>30,500<') && zh.includes('>46,800<'));
  const en = bracketStepsSvg(136000, ALL[115], stepLabels(msgs('en'), 'en'));
  assert.ok(en.includes('up to 610K'));
  assert.ok(en.includes('610K–1.38M'));
  assert.ok(en.includes('over 5.19M'));
  assert.ok(en.includes('Your net NT$136K'));
});

test('階梯圖：極大所得每級都亮，無所得只亮第一級', () => {
  const labels = stepLabels(msgs('en'), 'en');
  const big = bracketStepsSvg(1e9, ALL[115], labels);
  assert.equal((big.match(/inc-step-\d is-on/g) || []).length, 5);
  const zero = bracketStepsSvg(0, ALL[115], labels);
  assert.equal((zero.match(/inc-step-\d is-on/g) || []).length, 1);
  assert.equal((zero.match(/class="inc-step-tax"/g) || []).length, 0);
});

test('階梯圖：分開計稅只框最高稅率那格，不標淨額也不寫各級稅額', () => {
  const labels = stepLabels(msgs('zh-TW'), 'zh-TW');
  const svg = bracketStepsSvg(900000, ALL[115], labels, {
    mode: 'top',
    topIndex: 2,
  });
  assert.equal((svg.match(/is-cur/g) || []).length, 1);
  assert.match(svg, /inc-step-2 is-on is-cur/);
  assert.doesNotMatch(svg, /inc-step-mark|inc-step-pin|inc-step-tax/);
  assert.doesNotMatch(svg, BAD);
});

test('有配偶且最省方式為分開計稅時，runTax 用 top 模式並顯示 sepNote', () => {
  const s = {
    ...TAX_DEFAULT_STATE,
    married: '1',
    salary: 1800000,
    spouseSalary: 500000,
  };
  const v = runTax(s, ALL, msgs('zh-TW'), 'zh-TW');
  if (v.result.method !== 'joint') {
    assert.equal(v.show.sepNote, true);
    assert.doesNotMatch(v.svg, /inc-step-mark/);
  } else {
    assert.equal(v.show.sepNote, false);
  }
  const single = runTax(TAX_DEFAULT_STATE, ALL, msgs('zh-TW'), 'zh-TW');
  assert.equal(single.show.sepNote, false);
  assert.match(single.svg, /inc-step-mark/);
});

test('階梯圖：標籤文字會跳脫', () => {
  const labels = {
    markerText: () => '<b>"x"</b>',
    aria: 'a "{net}"',
    ariaTop: 'b',
    money: (n) => String(n),
    compact: (n) => String(n),
    range: () => '&',
  };
  const svg = bracketStepsSvg(100000, ALL[115], labels);
  assert.ok(!svg.includes('<b>'));
  assert.ok(svg.includes('&lt;b&gt;'));
});
