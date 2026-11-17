/**
 * housing-toolpages.test.mjs：房地產專題四個工具單獨頁與內嵌板的契約
 *（跑：node --experimental-strip-types --test tests/housing-toolpages.test.mjs）
 *
 * 守四類事：
 *   1. housing.json 登記的每個工具，13 語的單獨頁與內嵌板薄殼都存在，且 import 的模板檔存在
 *   2. 文案 zh-TW 與 en 的鍵集合（含陣列位置）一致，常見問題 4 到 6 題，q 與 a 非空
 *   3. zh 文案紀律：無破折號「——」、無「不是…是」對位句
 *   4. SEO 長度：metaTitle 中文 30 字內、英文 60 字元內；metaDescription 中文 70 到 80 字、英文 150 字元內
 *      （描述裡的佔位符用代表值代入再量，建置後的實際長度另在驗證時量）
 */
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

import { housingToolPages } from '../src/i18n/housing-toolpages.ts';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const LANGS = [
  'zh',
  'en',
  'ja',
  'ko',
  'es',
  'fr',
  'vi',
  'id',
  'pt',
  'hi',
  'ar',
  'ru',
  'de',
];
const topic = JSON.parse(
  readFileSync(resolve(ROOT, 'src/data/topics/housing.json'), 'utf8'),
);
const TOOLKEY = {
  'mortgage-calculator': 'mortgage',
  'affordability-check': 'affordability',
  'qingan-eligibility': 'qingan',
  'rent-vs-buy': 'rentBuy',
};

function shellPath(lang, kind, slug) {
  const pre = lang === 'zh' ? 'src/pages' : `src/pages/${lang}`;
  return resolve(
    ROOT,
    pre,
    kind === 'embed' ? 'embed/housing' : 'housing',
    slug,
    'index.astro',
  );
}

test('housing.json 的每個工具都有 13 語的單獨頁與內嵌板薄殼', () => {
  assert.equal(topic.tools.length, 4);
  for (const tool of topic.tools) {
    assert.ok(TOOLKEY[tool.slug], `未知的工具 ${tool.slug}`);
    assert.equal(tool.path, `/housing/${tool.slug}/`);
    assert.equal(tool.embedPath, `/embed/housing/${tool.slug}/`);
    for (const lang of LANGS) {
      for (const kind of ['page', 'embed']) {
        const file = shellPath(lang, kind, tool.slug);
        assert.ok(existsSync(file), `缺薄殼 ${file}`);
        const src = readFileSync(file, 'utf8');
        const m = /import \w+ from '([^']+)'/.exec(src);
        assert.ok(m, `${file} 沒有 import 模板`);
        const tpl = resolve(dirname(file), m[1]);
        assert.ok(existsSync(tpl), `${file} 的模板路徑不存在：${m[1]}`);
        assert.ok(
          tpl.endsWith(
            kind === 'embed'
              ? `housing-${tool.slug}-embed.template.astro`
              : `housing-${tool.slug}.template.astro`,
          ),
          `${file} import 了錯的模板`,
        );
        assert.equal(src.trim().split('\n').length, 5, `${file} 應為五行薄殼`);
      }
    }
  }
});

function keyPaths(v, prefix = '') {
  if (Array.isArray(v))
    return v.flatMap((x, i) => keyPaths(x, `${prefix}[${i}]`));
  if (v && typeof v === 'object') {
    return Object.keys(v).flatMap((k) =>
      keyPaths(v[k], prefix ? `${prefix}.${k}` : k),
    );
  }
  return [prefix];
}

test('zh-TW 與 en 的文案鍵集合一致，其他語言回 en', () => {
  const zh = housingToolPages('zh-TW');
  const en = housingToolPages('en');
  assert.deepEqual(keyPaths(zh).sort(), keyPaths(en).sort());
  for (const lang of [
    'ja',
    'ko',
    'es',
    'fr',
    'vi',
    'id',
    'pt',
    'hi',
    'ar',
    'ru',
    'de',
  ]) {
    assert.equal(housingToolPages(lang), en, `${lang} 應回 en`);
  }
});

for (const lang of ['zh-TW', 'en']) {
  const pages = housingToolPages(lang);
  for (const [name, key] of Object.entries(TOOLKEY)) {
    test(`${lang} ${name} 常見問題與文案不空`, () => {
      const p = pages[key];
      assert.ok(p.h1 && p.metaTitle && p.metaDescription && p.howItWorks);
      assert.ok(p.reading.length >= 1 && p.reading.every((x) => x.trim()));
      assert.ok(
        p.faq.length >= 4 && p.faq.length <= 6,
        `${name} 常見問題應為 4 到 6 題`,
      );
      for (const f of p.faq) {
        assert.ok(f.q.trim(), 'q 不可為空');
        assert.ok(f.a.trim(), `a 不可為空：${f.q}`);
      }
    });
  }
}

test('zh 文案紀律：無破折號、無不是…是對位句', () => {
  const zh = JSON.stringify(housingToolPages('zh-TW'));
  const strings = [];
  (function walk(v) {
    if (typeof v === 'string') strings.push(v);
    else if (Array.isArray(v)) v.forEach(walk);
    else if (v && typeof v === 'object') Object.values(v).forEach(walk);
  })(housingToolPages('zh-TW'));
  assert.ok(zh.length > 0);
  for (const s of strings) {
    assert.equal(s.includes('——'), false, `含破折號：${s.slice(0, 40)}`);
    assert.equal(
      /不是.{0,30}(是|而是)/.test(s),
      false,
      `含對位句：${s.slice(0, 40)}`,
    );
  }
});

const SAMPLE = {
  'zh-TW': {
    rateFirst: '1.775%',
    asOf: '2026-11-10',
    countyCount: '21',
    period: '115 年第 1 季',
    burden: '41.46%',
    p2i: '9.47',
    v3From: '2026-08-01',
    maxAge: '50',
    income: '200 萬',
    price: '1,500 萬',
    rent: '30,000 元',
    horizon: '30',
  },
  en: {
    rateFirst: '1.775%',
    asOf: '2026-11-10',
    countyCount: '21',
    period: '2026 Q1',
    burden: '41.46%',
    p2i: '9.47',
    v3From: '2026-08-01',
    maxAge: '50',
    income: 'NT$2M',
    price: 'NT$15M',
    rent: 'NT$30,000',
    horizon: '30',
  },
};
const sub = (s, lang) =>
  s.replace(/\{(\w+)\}/g, (m, k) => SAMPLE[lang][k] ?? m);

test('metaTitle 與 metaDescription 長度在契約範圍內', () => {
  for (const key of Object.values(TOOLKEY)) {
    const zh = housingToolPages('zh-TW')[key];
    const en = housingToolPages('en')[key];
    assert.ok(
      [...zh.metaTitle].length <= 30,
      `zh metaTitle 超過 30 字：${zh.metaTitle}`,
    );
    assert.ok(
      en.metaTitle.length <= 60,
      `en metaTitle 超過 60 字元：${en.metaTitle}`,
    );
    assert.ok(zh.metaTitle.includes('2026') && en.metaTitle.includes('2026'));
    const zd = [...sub(zh.metaDescription, 'zh-TW')].length;
    assert.ok(
      zd >= 70 && zd <= 80,
      `zh metaDescription ${zd} 字（應 70 到 80）：${key}`,
    );
    const ed = sub(en.metaDescription, 'en').length;
    assert.ok(ed <= 150, `en metaDescription ${ed} 字元（應 150 內）：${key}`);
    assert.equal(
      /\{\w+\}/.test(sub(zh.metaDescription, 'zh-TW')),
      false,
      `zh 描述有未代入的佔位：${key}`,
    );
    assert.equal(
      /\{\w+\}/.test(sub(en.metaDescription, 'en')),
      false,
      `en 描述有未代入的佔位：${key}`,
    );
  }
});
