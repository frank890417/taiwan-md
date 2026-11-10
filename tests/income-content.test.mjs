/**
 * income-content.test.mjs — 「薪資、稅與退休」專題三份內容資料檔的結構契約
 *（跑：node --experimental-strip-types --test tests/income-content.test.mjs）
 *
 * 守四件事：
 *   1. 年表每筆有日期、中英標題、至少一個 https 來源，且依日期排序。
 *   2. 立場並列：verified 為 true 才有 quote，其餘 quote 為 null 且有 paraphrase；
 *      每個議題至少兩個不同的群體，並有 gaps。
 *   3. 低薪成因：每筆有中英摘要、機關、年份、https 來源。
 *   4. 中文欄位不出現「——」，也不出現「不是……而是……」對位句。
 *      quote 欄是說話者的原話，不在這條檢查範圍。
 *   5. 「破產」：本站敘述（context、gaps）不用；轉述裡出現時要明確歸屬給說話者。
 */
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const load = (name) =>
  JSON.parse(readFileSync(join(ROOT, 'src/data/income', name), 'utf8'));

const timeline = load('timeline.json');
const stances = load('stances.json');
const lowWage = load('low-wage-explanations.json');

const CATEGORIES = new Set([
  'labor-insurance',
  'labor-law',
  'pension',
  'tax',
  'wage',
  'reform',
  'demography',
]);
const GROUPS = new Set([
  'labor',
  'business',
  'civil-servants',
  'youth-scholars',
  'government',
  'party',
]);
const isNonEmpty = (v) => typeof v === 'string' && v.trim().length > 0;
const isHttps = (v) => typeof v === 'string' && /^https:\/\/\S+$/.test(v);
const isBilingual = (v) => v && isNonEmpty(v.zh) && isNonEmpty(v.en);
const isDate = (v) => /^\d{4}(-\d{2}-\d{2})?$/.test(v);

/** 收集物件裡所有 zh 字串，略過 quote 欄（說話者原話）。 */
function collectZh(node, path, out) {
  if (node === null || typeof node !== 'object') return;
  if (Array.isArray(node)) {
    node.forEach((item, i) => collectZh(item, `${path}[${i}]`, out));
    return;
  }
  for (const [key, value] of Object.entries(node)) {
    if (key === 'quote' || key === 'quoteEn') continue;
    if (key === 'zh' && typeof value === 'string')
      out.push([`${path}.zh`, value]);
    else collectZh(value, `${path}.${key}`, out);
  }
}

test('年表：每筆事件的欄位完整', () => {
  assert.ok(isNonEmpty(timeline._meta.asOf));
  assert.ok(isNonEmpty(timeline._meta.fetched));
  assert.ok(Array.isArray(timeline.events) && timeline.events.length >= 30);
  for (const e of timeline.events) {
    const label = `${e.date} ${e.title?.zh}`;
    assert.ok(isDate(e.date), `日期格式不對：${label}`);
    assert.ok(isBilingual(e.title), `標題缺中文或英文：${label}`);
    assert.ok(isBilingual(e.desc), `說明缺中文或英文：${label}`);
    assert.ok(CATEGORIES.has(e.category), `類別不在清單內：${label}`);
    assert.ok(
      Array.isArray(e.sources) && e.sources.length >= 1,
      `沒有來源：${label}`,
    );
    for (const s of e.sources) {
      assert.ok(isNonEmpty(s.name), `來源缺名稱：${label}`);
      assert.ok(isHttps(s.url), `來源不是 https：${label} ${s.url}`);
    }
    if (e.note !== undefined)
      assert.ok(isBilingual(e.note), `note 缺中文或英文：${label}`);
  }
});

test('年表：依日期排序，且日期不重複', () => {
  const keys = timeline.events.map((e) => (e.date + '-00-00').slice(0, 10));
  assert.deepEqual(keys, [...keys].sort());
  const seen = new Set();
  for (const e of timeline.events) {
    const id = `${e.date}|${e.title.zh}`;
    assert.ok(!seen.has(id), `重複事件：${id}`);
    seen.add(id);
  }
});

test('年表：被省略的事件都說明缺什麼', () => {
  assert.ok(
    Array.isArray(timeline._meta.omitted) && timeline._meta.omitted.length > 0,
  );
  for (const o of timeline._meta.omitted) {
    assert.ok(isBilingual(o.event));
    assert.ok(isBilingual(o.missing));
  }
});

test('年表：憲法法庭的最新狀態有寫查詢日', () => {
  // 查詢現況是查證紀錄，放在 _meta.courtStatus，不混進 events
  const court = timeline._meta.courtStatus;
  assert.ok(court, '缺 _meta.courtStatus');
  assert.ok(isDate(court.date));
  assert.ok(isBilingual(court.status));
  assert.match(court.status.zh, new RegExp(court.date));
  assert.ok(court.sources.length >= 2);
  for (const s of court.sources) assert.ok(isHttps(s.url));
  assert.ok(isHttps(court.lastReport.url));
  assert.ok(
    !timeline.events.some((e) =>
      /未查到|not found|no judgment/i.test(`${e.title.zh} ${e.title.en}`),
    ),
    '查證紀錄不該出現在 events',
  );
});

test('立場並列：議題與群體', () => {
  const ids = stances.topics.map((t) => t.id);
  for (const required of [
    'pension-freeze',
    'labor-insurance-finance',
    'minimum-wage',
    'generational-fairness',
  ]) {
    assert.ok(ids.includes(required), `缺議題：${required}`);
  }
  assert.equal(new Set(ids).size, ids.length, '議題 id 重複');
  for (const t of stances.topics) {
    assert.ok(isBilingual(t.title), `${t.id} 標題`);
    assert.ok(isBilingual(t.context), `${t.id} context`);
    assert.ok(isBilingual(t.gaps), `${t.id} gaps`);
    const groups = new Set(t.positions.map((p) => p.group));
    assert.ok(groups.size >= 2, `${t.id} 少於兩個不同群體`);
    for (const g of groups) assert.ok(GROUPS.has(g), `${t.id} 未知群體 ${g}`);
  }
});

test('立場並列：verified 與 quote／paraphrase 的關係', () => {
  for (const t of stances.topics) {
    for (const p of t.positions) {
      const label = `${t.id} / ${p.actor?.zh}`;
      assert.ok(isBilingual(p.actor), `${label} actor`);
      assert.ok(isDate(p.date), `${label} 日期格式`);
      assert.ok(isBilingual(p.venue), `${label} venue`);
      assert.ok(isNonEmpty(p.source?.name), `${label} 來源名稱`);
      assert.ok(isHttps(p.source?.url), `${label} 來源不是 https`);
      assert.equal(typeof p.verified, 'boolean', `${label} verified 型別`);
      if (p.verified === true) {
        assert.ok(isNonEmpty(p.quote), `${label} verified 但 quote 是空的`);
        assert.ok(isNonEmpty(p.quoteEn), `${label} 有 quote 卻沒有 quoteEn`);
        assert.equal(p.paraphrase, null, `${label} 有 quote 時不放 paraphrase`);
      } else {
        assert.equal(p.quote, null, `${label} 未驗證卻有 quote`);
        assert.equal(p.quoteEn, null, `${label} 沒有 quote 卻有 quoteEn`);
        assert.ok(isBilingual(p.paraphrase), `${label} 缺 paraphrase`);
        assert.ok(p.note, `${label} 未驗證要在 note 寫原因`);
      }
      if (p.note !== undefined) assert.ok(isBilingual(p.note), `${label} note`);
    }
  }
});

test('立場並列：quote 不含改寫痕跡（省略號與方括號）', () => {
  for (const t of stances.topics) {
    for (const p of t.positions) {
      if (!p.quote) continue;
      assert.ok(
        !/…|\.\.\.|\[|\]/.test(p.quote),
        `${t.id} 引句含省略或插入：${p.quote}`,
      );
    }
  }
});

test('低薪成因：五種解釋，欄位完整，不排序', () => {
  assert.equal(lowWage.explanations.length, 5);
  assert.ok(isBilingual(lowWage._meta.gaps));
  assert.match(lowWage._meta.gaps.zh, /非典型就業/);
  for (const x of lowWage.explanations) {
    assert.ok(isNonEmpty(x.id));
    assert.ok(isBilingual(x.title), `${x.id} title`);
    assert.ok(isBilingual(x.summary), `${x.id} summary`);
    assert.ok(isBilingual(x.proponent), `${x.id} proponent`);
    assert.ok(Number.isInteger(x.year) && x.year >= 2000 && x.year <= 2026);
    assert.ok(isNonEmpty(x.source?.name));
    assert.ok(isHttps(x.source?.url), `${x.id} 來源不是 https`);
    assert.equal(typeof x.verified, 'boolean');
    assert.ok(!('rank' in x) && !('order' in x), `${x.id} 不可排序`);
  }
});

test('中文欄位：沒有「——」，沒有「不是……而是……」對位句', () => {
  const zh = [];
  collectZh(timeline, 'timeline', zh);
  collectZh(stances, 'stances', zh);
  collectZh(lowWage, 'lowWage', zh);
  assert.ok(zh.length > 200, '收集到的中文欄位數量不合理');
  const contrast = /不是[^。！？\n]{0,30}而是/;
  for (const [path, text] of zh) {
    assert.ok(!text.includes('——'), `${path} 含「——」`);
    assert.ok(
      !contrast.test(text),
      `${path} 含「不是……而是……」對位句：${text}`,
    );
  }
});

test('立場並列的中性用語：context 與 gaps 不用「破產」；轉述裡的「破產」要歸屬給說話者', () => {
  // 本站自己的敘述（context、gaps）用中性詞。轉述是別人的立場，說話者用了
  // 「破產」就照寫，但同一句裡「破產」之前要有「表示／稱／認為／說／指」，
  // 讓讀者看得出這是說話者的用詞。
  const attributed = /(表示|稱|認為|說|指)[^。]*破產/;
  for (const t of stances.topics) {
    for (const [path, text] of [
      [`${t.id}.context`, t.context.zh],
      [`${t.id}.gaps`, t.gaps.zh],
    ]) {
      assert.ok(!/破產/.test(text), `${path} 用了「破產」`);
    }
    for (const p of t.positions) {
      if (!p.paraphrase) continue;
      for (const sentence of p.paraphrase.zh.split('。')) {
        if (!/破產/.test(sentence)) continue;
        assert.ok(
          attributed.test(sentence),
          `${t.id} / ${p.actor.zh} 的轉述用了「破產」卻沒有歸屬給說話者`,
        );
      }
    }
  }
});
