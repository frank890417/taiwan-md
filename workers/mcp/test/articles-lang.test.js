import test from 'node:test';
import assert from 'node:assert/strict';

// articles.json has had three shapes for a translation row:
//   old (≤ 2026-11-04):   category = lang code, no `lang`
//   current (2026-11-04): category = lang code, plus `lang` + `categorySlug`
//   future (planned):     category = real category, plus `lang` + `categorySlug`
// The worker must serve only the zh-TW originals from every one of them —
// counting a translation as zh-TW would flood search with ~14k translations
// and point taiwanmd_read at /raw URLs that do not exist.
const zh = {
  path: 'History/二二八事件.md',
  category: 'History',
  title: '二二八事件',
  lang: 'zh-TW',
  categorySlug: 'history',
};
const shapes = {
  old: [
    { path: 'History/二二八事件.md', category: 'History', title: '二二八事件' },
    {
      path: 'en/History/228-incident.md',
      category: 'en',
      title: '228 Incident',
    },
    { path: 'vi/People/hung-hsing-fu.md', category: 'vi', title: 'Hung' },
  ],
  current: [
    zh,
    {
      path: 'en/History/228-incident.md',
      category: 'en',
      title: '228 Incident',
      lang: 'en',
      categorySlug: 'history',
    },
    {
      path: 'vi/People/hung-hsing-fu.md',
      category: 'vi',
      title: 'Hung',
      lang: 'vi',
      categorySlug: 'people',
    },
  ],
  future: [
    zh,
    {
      path: 'en/History/228-incident.md',
      category: 'History',
      title: '228 Incident',
      lang: 'en',
      categorySlug: 'history',
    },
    {
      path: 'vi/People/hung-hsing-fu.md',
      category: 'People',
      title: 'Hung',
      lang: 'vi',
      categorySlug: 'people',
    },
  ],
};

const call = async (worker, name, args = {}) =>
  (
    await (
      await worker.fetch(
        new Request('https://test/', {
          method: 'POST',
          body: JSON.stringify({
            jsonrpc: '2.0',
            id: 1,
            method: 'tools/call',
            params: { name, arguments: args },
          }),
        }),
      )
    ).json()
  ).result;

for (const [shape, rows] of Object.entries(shapes)) {
  test(`only zh-TW originals are served (${shape} articles.json)`, async () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async (url) =>
      String(url).endsWith('articles.json')
        ? Response.json(rows)
        : new Response(`body of ${url}`);
    try {
      // A fresh module instance per shape: the article index is a module global.
      const { default: worker } = await import(
        `../src/index.js?shape=${shape}`
      );
      const stats = JSON.parse(
        (await call(worker, 'taiwanmd_stats')).content[0].text,
      );
      assert.equal(stats.totalArticles, 1);
      assert.deepEqual(stats.byCategory, { History: 1 });

      const hits = JSON.parse(
        (await call(worker, 'taiwanmd_search', { query: '228' })).content[0]
          .text,
      );
      assert.deepEqual(hits, []); // the English title must not leak in

      const hit = JSON.parse(
        (await call(worker, 'taiwanmd_search', { query: '二二八' })).content[0]
          .text,
      );
      assert.equal(hit.length, 1);
      assert.equal(hit[0].category, 'History');
      assert.equal(hit[0].path, 'History/二二八事件.md');

      const read = await call(worker, 'taiwanmd_read', { slug: '二二八事件' });
      assert.match(read.content[0].text, /raw\/history\//);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
}
