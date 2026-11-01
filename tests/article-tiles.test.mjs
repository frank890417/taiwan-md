/**
 * article-tiles.test.mjs — tw-tiles 縣市磚圖多語契約
 *（跑：node --experimental-strip-types --test tests/article-tiles.test.mjs）
 *
 * 守的是 2026-10-23 修掉的缺陷：磚上一律印 renderer 寫死的中文縣市名，譯版頁面
 * 磚上全是漢字；韓文、越南文、俄文、印地文、法文、印尼文、葡文寫的縣市名對不上，
 * 整個模組退化成長條圖（型錄頁十三語有七語退化）。修完之後：
 *   - zh-TW 頁輸出跟改版前逐位元相同（磚上印 TILE_GRID 短名）
 *   - 其他語言磚上印作者那一列剝掉行政字首字尾的短名，新竹、嘉義印整列原文
 *   - 作者把縣市名留成漢字、頁面又不用漢字時（ar 型錄頁），印該語標準名
 *   - 逗號小數（24,18）的色階端點不再被當千分位放大一百倍
 *
 * 跟 article-footnote.test.mjs 同一條規矩：載入正式站在用的 renderVizBlock，
 * 不自己重寫一份對應規則來驗。素材直接讀型錄頁十三語的 tw-tiles 區塊。
 */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

import { renderVizBlock } from '../src/utils/article-render.ts';

const ROOT = new URL('..', import.meta.url);
const catalogBlock = (lang) => {
  const path =
    lang === 'zh-TW'
      ? 'knowledge/About/視覺化模組型錄.md'
      : `knowledge/${lang}/About/visualization-module-catalog.md`;
  const md = readFileSync(new URL(path, ROOT), 'utf8');
  return md.match(/```tw-tiles\n([\s\S]*?)\n```/)[1];
};
const tiles = (body, lang) => renderVizBlock('tw-tiles', body, lang);
const decode = (s) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"');
/** 磚陣由左上到右下的格名（含空磚） */
const names = (html) =>
  [...html.matchAll(/class="tw-tiles-name[^"]*">([^<]*)</g)].map((m) =>
    decode(m[1]),
  );
const scale = (html) =>
  html
    .match(/tw-tiles-scale"><span>([^<]*)<\/span>.*?<span>([^<]*)<\/span>/)
    .slice(1);

const LANGS = 'zh-TW en ja ko es fr vi id pt hi ar ru de'.split(' ');

test('型錄頁十三語都畫成磚圖，沒有退化成長條圖', () => {
  for (const lang of LANGS) {
    const html = tiles(catalogBlock(lang), lang);
    assert.ok(html.includes('tw-tiles-grid'), `${lang} 沒畫出磚陣`);
    assert.ok(!html.includes('tw-tiles--fallback'), `${lang} 退化成 bars`);
  }
});

test('zh-TW 磚上印 TILE_GRID 短名，不帶新加的長名 class', () => {
  const html = tiles(catalogBlock('zh-TW'), 'zh-TW');
  assert.deepEqual(names(html).slice(0, 9), [
    '連江', '台北', '基隆', '桃園', '新北', '宜蘭', '金門', '新竹市', '新竹縣',
  ]); // prettier-ignore
  assert.ok(!html.includes('--long'));
  assert.ok(!html.includes('tw-tiles-warn'));
});

test('譯版磚上沒有漢字，資料表跟磚上同名', () => {
  for (const lang of LANGS.filter((l) => l !== 'zh-TW' && l !== 'ja')) {
    const html = tiles(catalogBlock(lang), lang);
    for (const n of names(html))
      assert.ok(!/\p{Script=Han}/u.test(n), `${lang} 磚上有漢字：${n}`);
    const rows = [...html.matchAll(/<th scope="row">([^<]*)</g)].map((m) =>
      decode(m[1]),
    );
    for (const r of rows)
      assert.ok(names(html).includes(r), `${lang} 資料表名不在磚上：${r}`);
  }
});

test('剝掉行政字首字尾，只有新竹、嘉義保留市／縣', () => {
  const en = names(tiles(catalogBlock('en'), 'en'));
  assert.ok(en.includes('Taipei') && en.includes('Lienchiang'));
  assert.ok(en.includes('Hsinchu City') && en.includes('Hsinchu County'));
  const ko = names(tiles(catalogBlock('ko'), 'ko'));
  assert.ok(
    ko.includes('타이베이') && ko.includes('신주시') && ko.includes('자이현'),
  );
  const fr = names(tiles(catalogBlock('fr'), 'fr'));
  assert.ok(fr.includes('Taipei') && fr.includes('Comté de Hsinchu'));
});

test('新竹沒寫市或縣時，補進還空著的那一格（市優先）', () => {
  const html = tiles('t\nHsinchu County | 15\nHsinchu | 16\nTaipei | 24', 'de');
  assert.match(
    html,
    /tw-tiles-name">Hsinchu<\/span><b class="tw-tiles-val">16</,
  );
  assert.match(html, /Hsinchu County<\/span><b class="tw-tiles-val">15</);
});

test('作者留成漢字、頁面不用漢字時，印該語標準名', () => {
  const ar = names(tiles(catalogBlock('ar'), 'ar'));
  assert.ok(ar.includes('تايبيه') && ar.includes('مدينة هسينتشو'));
});

test('逗號小數的色階端點印作者原字串，不放大一百倍', () => {
  assert.deepEqual(scale(tiles(catalogBlock('fr'), 'fr')), ['15,08', '24,18']);
  assert.deepEqual(scale(tiles(catalogBlock('zh-TW'), 'zh-TW')), ['15.08', '24.18']); // prettier-ignore
});

test('未對應清單的分隔號跟著頁面語言走', () => {
  const zh = tiles(
    't\n臺北市 | 1\n新北市 | 2\n桃園市 | 3\n火星 | 4\n月球 | 5',
    'zh-TW',
  );
  assert.match(zh, /未對應縣市：火星、月球/);
  const en = tiles(
    't\nTaipei | 1\nKeelung | 2\nTaoyuan | 3\nMars | 4\nMoon | 5',
    'en',
  );
  assert.match(en, /Unmatched counties: Mars, Moon/);
});
