/**
 * 首圖去重：封面是收進庫的本地檔、正文是同一個 Commons 檔案的熱連結時，
 * 文章頂端那張要讓位（2026-11-19 封面健檢，reports/cover-image-health-2026-11-19.md）。
 *
 * 載入正式站在用的 renderArticleHtml，不另寫一份規則來驗。
 *   node --experimental-strip-types --test tests/article-hero-dedupe.test.mjs
 */
import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  commonsFileKey,
  renderArticleHtml,
} from '../src/utils/article-render.ts';

const HERO = {
  src: '/article-images/geography/wuqiu-lighthouse.webp',
  creditHtml: 'credit',
  sourceUrl:
    'https://commons.wikimedia.org/wiki/File:%E7%83%8F%E5%9D%B5%E7%99%BE%E5%B9%B4%E7%87%88%E5%A1%941.jpg',
};
const THUMB =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/%E7%83%8F%E5%9D%B5%E7%99%BE%E5%B9%B4%E7%87%88%E5%A1%941.jpg/1920px-%E7%83%8F%E5%9D%B5%E7%99%BE%E5%B9%B4%E7%87%88%E5%A1%941.jpg';

test('commonsFileKey：檔案頁、FilePath、原檔、縮圖收成同一個 key', () => {
  const key = '烏坵百年燈塔1.jpg';
  assert.equal(commonsFileKey(HERO.sourceUrl), key);
  assert.equal(commonsFileKey(THUMB), key);
  assert.equal(
    commonsFileKey(
      'https://upload.wikimedia.org/wikipedia/commons/a/ab/烏坵百年燈塔1.jpg',
    ),
    key,
  );
  assert.equal(
    commonsFileKey(
      'https://commons.wikimedia.org/wiki/Special:FilePath/烏坵百年燈塔1.jpg?width=1280',
    ),
    key,
  );
  // 底線與空白是同一個檔名
  assert.equal(
    commonsFileKey('https://commons.wikimedia.org/wiki/File:Homing_pigeon.jpg'),
    commonsFileKey(
      'https://commons.wikimedia.org/wiki/Special:FilePath/Homing%20pigeon.jpg',
    ),
  );
  // 不是 Commons 的網址不給 key，才不會把兩張不相干的圖認成同一張
  assert.equal(commonsFileKey('/article-images/food/a.webp'), '');
  assert.equal(commonsFileKey('https://example.com/a.jpg'), '');
  assert.equal(commonsFileKey(undefined), '');
});

test('正文開頭是同一個 Commons 檔案的熱連結 → 頂端封面讓位', () => {
  const md = `開頭一段。\n\n![烏坵燈塔](${THUMB})\n\n後面一段。`;
  assert.equal(renderArticleHtml('t', md, 'zh-TW', HERO).heroImageInBody, true);
});

test('正文是別張 Commons 圖 → 不讓位', () => {
  const other =
    'https://upload.wikimedia.org/wikipedia/commons/0/0e/Taiwan_Railway_Bento_No.1_20190615.jpg';
  const md = `開頭一段。\n\n![別張圖](${other})\n\n後面一段。`;
  assert.equal(
    renderArticleHtml('t', md, 'zh-TW', HERO).heroImageInBody,
    false,
  );
});

test('沒有 imageSource 時行為不變：只比路徑', () => {
  const md = `開頭一段。\n\n![烏坵燈塔](${THUMB})\n\n後面一段。`;
  assert.equal(
    renderArticleHtml('t', md, 'zh-TW', { src: HERO.src }).heroImageInBody,
    false,
  );
});
