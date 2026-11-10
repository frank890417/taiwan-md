/**
 * industry-tools.test.mjs — 專題工具的網址狀態解析與登記檔
 *（跑：node --experimental-strip-types --test tests/industry-tools.test.mjs）
 *
 * 契約 v1 第 4 節：工具狀態同步到查詢參數；每個工具有單獨頁與 13 語內嵌板薄殼。
 */
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';

const T = await import('../src/utils/industry/toolState.ts');
const root = new URL('../', import.meta.url);
const topic = JSON.parse(
  readFileSync(new URL('src/data/topics/industry.json', root), 'utf8'),
);
const LANGS = [
  '',
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

test('parseTrack：認得四條線，其餘回 all', () => {
  assert.equal(T.parseTrack('?track=policy'), 'policy');
  assert.equal(T.parseTrack('?track=market&x=1'), 'market');
  assert.equal(T.parseTrack('?track=politics'), 'all');
  assert.equal(T.parseTrack(''), 'all');
});
test('parseChain：不認得的鏈回第一條', () => {
  const ids = ['semi', 'ai', 'tungsten'];
  assert.equal(T.parseChain('?chain=ai', ids), 'ai');
  assert.equal(T.parseChain('?chain=bicycle', ids), 'semi');
  assert.equal(T.parseChain('', ids), 'semi');
  assert.equal(T.parseChain('?chain=ai', []), '');
});
test('parseQuery：去空白、轉小寫、截到 40 字', () => {
  assert.equal(T.parseQuery('?q=%20TSMC%20'), 'tsmc');
  assert.equal(T.parseQuery('?q=台積電'), '台積電');
  assert.equal(T.parseQuery('?q=' + 'a'.repeat(80)).length, 40);
  assert.equal(T.parseQuery('?chain=ai'), '');
});
test('findNodes：名稱或代號子字串都找得到，空字串不回任何節點', () => {
  const nodes = [
    { key: '台積電 tsmc 2330' },
    { key: '日月光投控 aseh 3711' },
    { key: '聯電 umc 2303' },
  ];
  assert.deepEqual(
    T.findNodes(nodes, '2330').map((n) => n.key),
    ['台積電 tsmc 2330'],
  );
  assert.equal(T.findNodes(nodes, 'UMC').length, 1);
  assert.equal(T.findNodes(nodes, '電').length, 2);
  assert.equal(T.findNodes(nodes, '').length, 0);
  assert.equal(T.findNodes(nodes, '   ').length, 0);
  assert.equal(T.findNodes(nodes, '鴻海').length, 0);
});

test('登記檔：三個工具，slug、路徑、中英標題與描述齊全', () => {
  assert.equal(topic.id, 'industry');
  assert.equal(topic.path, '/industry/');
  assert.equal(topic.tools.length, 3);
  for (const t of topic.tools) {
    assert.match(t.slug, /^[a-z][a-z-]+$/);
    assert.match(t.path, /^\/.+\/$/);
    assert.equal(t.embedPath, `/embed/industry/${t.slug}/`);
    for (const k of ['title', 'description']) {
      assert.ok(t[k].zh && t[k].en, `${t.slug}.${k}`);
    }
    assert.ok(t.keywords.length >= 3, `${t.slug}.keywords`);
    // 契約第 5 節：中文描述 70 到 80 字上下、英文 150 字元內（這裡守上限）
    assert.ok([...t.description.zh].length <= 90, `${t.slug} 中文描述過長`);
    assert.ok(t.description.en.length <= 260, `${t.slug} 英文描述過長`);
  }
});
test('每個工具的單獨頁與內嵌板，13 語薄殼都在', () => {
  for (const t of topic.tools) {
    for (const l of LANGS) {
      const pre = l ? `src/pages/${l}` : 'src/pages';
      const page =
        t.path === '/companies/'
          ? `${pre}/companies.astro`
          : `${pre}${t.path.replace(/\/$/, '')}.astro`;
      assert.ok(existsSync(new URL(page, root)), `缺 ${page}`);
      const embed = `${pre}${t.embedPath.replace(/\/$/, '')}.astro`;
      assert.ok(existsSync(new URL(embed, root)), `缺 ${embed}`);
    }
  }
});
test('登記的相關文章都存在於 knowledge/', () => {
  const cap = {
    economy: 'Economy',
    technology: 'Technology',
    history: 'History',
    people: 'People',
  };
  for (const a of topic.relatedArticles) {
    const [, cat, slug] = a.split('/');
    assert.ok(
      existsSync(new URL(`knowledge/${cap[cat]}/${slug}.md`, root)),
      `relatedArticles 指到不存在的文章 ${a}`,
    );
  }
});
