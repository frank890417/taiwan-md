import test from 'node:test';
import assert from 'node:assert/strict';
import {
  mediaFields,
  loadCensusMedia,
  MEDIA_FIELDS,
} from '../scripts/core/lib/dashboard-media.mjs';

const media = {
  'knowledge/Food/珍珠奶茶.md': {
    c: 'local',
    cr: false,
    i: 3,
    il: 1,
    ir: 2,
    m: 4,
    d: 3,
    f: 1,
  },
};

test('join 到時照 census 讀數轉成文章欄位', () => {
  assert.deepEqual(mediaFields(media, 'Food/珍珠奶茶.md'), {
    cover: 'local',
    coverCredit: false,
    imageCount: 3,
    imageLocal: 1,
    imageRemote: 2,
    moduleCount: 4,
    dataModuleCount: 3,
    embedCount: 1,
  });
});

test('join 不到時全部 null（未知），不是 none 或 0', () => {
  for (const map of [null, {}, media]) {
    const f = mediaFields(map, 'Food/不存在.md');
    assert.deepEqual(Object.keys(f), MEDIA_FIELDS);
    for (const k of MEDIA_FIELDS) assert.equal(f[k], null, k);
  }
});

test('census 檔不存在或沒有 media 時 loadCensusMedia 回 null', () => {
  assert.equal(loadCensusMedia('/nonexistent/dashboard-census.json'), null);
});
