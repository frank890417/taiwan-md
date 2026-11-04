/**
 * Remote-fallback search (articles.json) must report the real category for
 * every shape the file has had.
 *
 * Why this file exists: articles.json gave translations `category` = language
 * code ("vi") until 2026-11-04; that day it gained `lang` + `categorySlug`, and
 * `category` is scheduled to become the real category. The CLI used to print
 * `category` as-is, so a Vietnamese hit showed "vi" in the 分類 column. These
 * tests pin the reading order (categorySlug → path → category) against the old,
 * current and future files, so the switch-over can land without the CLI noticing.
 *
 * Run with: cd cli && npx vitest run test/search-remote-category.test.js
 */

import { describe, it, expect, vi, afterEach } from 'vitest';

const zhOld = {
  title: '二二八事件',
  description: '',
  category: 'History',
  tags: [],
  path: 'History/二二八事件.md',
  url: 'https://taiwan.md/history/二二八事件',
};
const viOld = {
  title: 'Sự kiện 228',
  description: '',
  category: 'vi',
  tags: [],
  path: 'vi/History/228-incident.md',
  url: 'https://taiwan.md/vi/history/228-incident',
};
const extra = (row, lang, cat) => ({ ...row, lang, categorySlug: cat });

const shapes = {
  old: [zhOld, viOld],
  current: [extra(zhOld, 'zh-TW', 'history'), extra(viOld, 'vi', 'history')],
  future: [
    extra(zhOld, 'zh-TW', 'history'),
    { ...extra(viOld, 'vi', 'history'), category: 'History' },
  ],
};

afterEach(() => {
  vi.unstubAllGlobals();
  vi.resetModules();
});

describe('searchRemote over articles.json', () => {
  for (const [shape, rows] of Object.entries(shapes)) {
    it(`reports the real category (${shape} file)`, async () => {
      vi.stubGlobal('fetch', async () => Response.json(rows));
      // Fresh module per shape: the remote list is cached in a module global.
      const { searchRemote } = await import('../src/lib/search.js');

      const [zh] = await searchRemote('二二八', 5);
      expect(zh).toMatchObject({ title: '二二八事件', category: 'history' });

      const [vn] = await searchRemote('228', 5);
      expect(vn).toMatchObject({ title: 'Sự kiện 228', category: 'history' });
    });
  }
});
