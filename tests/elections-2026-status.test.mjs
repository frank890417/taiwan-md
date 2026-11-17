/**
 * elections-2026-status.test.mjs — 選舉主頁狀態列（選前／投票日／選後）的契約
 *（跑：node --experimental-strip-types --test tests/elections-2026-status.test.mjs）
 *
 * 主頁在建置時用 src/utils/elections/status.ts 判斷台北日期落在哪一段。
 * 這裡把日期注入進去，確認三種狀態的切換點、倒數天數、以及
 * 「接下來要留意」取到的日期（資料來自正式的時程檔與 elections-2026.json）。
 */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

import {
  daysUntil,
  electionPhase,
  itemState,
  nextSteps,
  resolveToday,
  taipeiDate,
  upcoming,
  voterDates,
} from '../src/utils/elections/status.ts';

const readJson = (rel) =>
  JSON.parse(readFileSync(new URL(rel, import.meta.url), 'utf8'));
const timeline = readJson('../src/data/elections-2026-timeline.json');
const data = readJson('../src/data/elections-2026.json');

const ris = data.lookups.risPollingPlace;
const extra = [
  { id: 'ris-lookup', start: ris.opens, end: ris.closes, cats: ['voters'] },
];
const ids = (list) => list.map((i) => i.id);

test('台北日期：UTC 16:00 之後算隔天', () => {
  assert.equal(taipeiDate(new Date('2026-11-27T15:59:00Z')), '2026-11-27');
  assert.equal(taipeiDate(new Date('2026-11-27T16:00:00Z')), '2026-11-28');
});

test('日期覆寫只接受 YYYY-MM-DD', () => {
  const now = new Date('2026-11-17T02:00:00Z');
  assert.equal(resolveToday('2026-11-28', now), '2026-11-28');
  assert.equal(resolveToday('tomorrow', now), '2026-11-17');
  assert.equal(resolveToday(undefined, now), '2026-11-17');
});

test('三種狀態的切換點', () => {
  assert.equal(electionPhase('2026-11-17'), 'pre');
  assert.equal(electionPhase('2026-11-27'), 'pre');
  assert.equal(electionPhase('2026-11-28'), 'day');
  assert.equal(electionPhase('2026-11-29'), 'post');
  assert.equal(electionPhase('2026-12-26'), 'post');
});

test('倒數比日曆日，不比時刻', () => {
  assert.equal(daysUntil('2026-11-17'), 11);
  assert.equal(daysUntil('2026-11-27'), 1);
  assert.equal(daysUntil('2026-11-28'), 0);
});

test('選前 11/17：接下來三個日期是查投票所、公報送達、投票日', () => {
  assert.deepEqual(ids(voterDates(timeline.items, extra, '2026-11-17')), [
    'ris-lookup',
    'bulletins-delivered',
    'voting-day',
  ]);
});

test('11/24：查投票所進行中仍列在第一個；11/26 公報已過', () => {
  const on24 = voterDates(timeline.items, extra, '2026-11-24');
  assert.equal(on24[0].id, 'ris-lookup');
  assert.equal(itemState(on24[0], '2026-11-24'), 'now');
  assert.deepEqual(ids(voterDates(timeline.items, extra, '2026-11-26')), [
    'ris-lookup',
    'voting-day',
  ]);
});

test('選後：選民日期全部結束，時程只剩公告當選與就職等', () => {
  assert.deepEqual(voterDates(timeline.items, extra, '2026-11-29'), []);
  const next = ids(upcoming(timeline.items, '2026-11-29', 5));
  assert.ok(next.includes('winners-announced'));
  assert.ok(next.includes('inauguration'));
});

test('主頁「接下來五步」在 11/17 有五項，依開始日排序，不含已在進行的長期間', () => {
  const steps = nextSteps(timeline.items, '2026-11-17', 5);
  assert.equal(steps.length, 5);
  for (let i = 1; i < steps.length; i++) {
    assert.ok(steps[i - 1].start <= steps[i].start);
  }
  assert.ok(steps.every((s) => s.start >= '2026-11-17'));
  assert.ok(!ids(steps).includes('mayor-campaign'));
});

test('11/26 起「接下來五步」第一項就是投票日', () => {
  assert.equal(nextSteps(timeline.items, '2026-11-26', 5)[0].id, 'voting-day');
});
