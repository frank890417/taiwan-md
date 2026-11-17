/**
 * elections-2026-ballot-numbers.test.mjs — 選舉專頁候選人號次契約
 *（跑：node --test tests/elections-2026-ballot-numbers.test.mjs）
 *
 * 2026-10-23 起各選委會陸續抽籤（21 區因颱風延到 10/27），號次逐區填進
 * src/data/elections-2026.json。主頁與候選人頁只在「該區全部有號次」時改依號次
 * 排序，所以資料檔本身要守住四件事：
 *   - 同一選區已填的號次不重複
 *   - 一區全部有號次時，號次集合恰為 1..n
 *   - 全部有號次的選區，陣列順序就是號次順序
 *   - 每個填了號次的候選人都附 numberSource（出處網址）
 */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const data = JSON.parse(
  readFileSync(
    new URL('../src/data/elections-2026.json', import.meta.url),
    'utf8',
  ),
);

const numbered = (race) => race.candidates.filter((c) => c.number != null);
const fullyNumbered = (race) =>
  numbered(race).length === race.candidates.length;

test('同一選區的號次不重複', () => {
  for (const race of data.races) {
    const nums = numbered(race).map((c) => c.number);
    assert.equal(new Set(nums).size, nums.length, `${race.area} 號次重複`);
  }
});

test('全部有號次的選區，號次集合恰為 1..n', () => {
  for (const race of data.races.filter(fullyNumbered)) {
    const nums = race.candidates.map((c) => c.number).sort((a, b) => a - b);
    const expected = race.candidates.map((_, i) => i + 1);
    assert.deepEqual(nums, expected, `${race.area} 號次不是 1..n`);
  }
});

test('全部有號次的選區，陣列順序等於號次順序', () => {
  for (const race of data.races.filter(fullyNumbered)) {
    const nums = race.candidates.map((c) => c.number);
    assert.deepEqual(
      nums,
      [...nums].sort((a, b) => a - b),
      `${race.area} 陣列沒有依號次排列`,
    );
  }
});

test('填了號次的候選人都有 numberSource', () => {
  for (const race of data.races) {
    for (const c of numbered(race)) {
      assert.ok(
        Number.isInteger(c.number) && c.number > 0,
        `${race.area} ${c.name} 號次不是正整數`,
      );
      assert.match(
        c.numberSource ?? '',
        /^https:\/\//,
        `${race.area} ${c.name} 缺 numberSource`,
      );
    }
  }
});
