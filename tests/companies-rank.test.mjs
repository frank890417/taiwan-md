/**
 * companies-rank.test.mjs — /companies 排行表的排序、篩選、名次變化、集中度與資料完整性
 *（跑：node --experimental-strip-types --test tests/companies-rank.test.mjs）
 *
 * 兩組：
 *  1. 純函式契約（src/utils/companiesRank.ts）——載入正式站在用的那支模組，不另寫一份規則。
 *  2. 資料完整性——直接讀 src/utils/dataConfig.ts 的榜單與 src/data/industry/companies-meta.json，
 *     換快照時漏跑 scripts/tools/industry-companies-meta.py 會在這裡紅燈。
 */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const R = await import('../src/utils/companiesRank.ts');

const row = (o) => ({
  ticker: '0000',
  rank: 1,
  marketCap: 0,
  revenue: 0,
  employees: 0,
  founded: 2000,
  industryCode: '24',
  county: '臺北市',
  prevRank: null,
  ...o,
});
const SAMPLE = [
  row({
    ticker: 'A',
    rank: 1,
    marketCap: 900,
    revenue: 50,
    employees: 10,
    founded: 1987,
    industryCode: '24',
    county: '新竹市',
    prevRank: 1,
  }),
  row({
    ticker: 'B',
    rank: 2,
    marketCap: 300,
    revenue: 800,
    employees: 900,
    founded: 1974,
    industryCode: '31',
    county: '新北市',
    prevRank: 4,
  }),
  row({
    ticker: 'C',
    rank: 3,
    marketCap: 200,
    revenue: 50,
    employees: 40,
    founded: 1997,
    industryCode: '24',
    county: '新竹市',
    prevRank: 2,
  }),
  row({
    ticker: 'D',
    rank: 4,
    marketCap: 100,
    revenue: 30,
    employees: 40,
    founded: 2001,
    industryCode: '17',
    county: '臺北市',
    prevRank: null,
  }),
];
const tickers = (rows) => rows.map((r) => r.ticker).join('');

// ── 排序 ────────────────────────────────────────────────────────────
test('sortRows：市值降冪與升冪', () => {
  assert.equal(tickers(R.sortRows(SAMPLE, 'marketCap', 'desc')), 'ABCD');
  assert.equal(tickers(R.sortRows(SAMPLE, 'marketCap', 'asc')), 'DCBA');
});
test('sortRows：營收降冪，同值維持市值名次先後（A 在 C 前）', () => {
  assert.equal(tickers(R.sortRows(SAMPLE, 'revenue', 'desc')), 'BACD');
});
test('sortRows：同值在升冪時也維持市值名次先後，不會因為方向反過來而互換', () => {
  assert.equal(tickers(R.sortRows(SAMPLE, 'revenue', 'asc')), 'DACB');
  assert.equal(tickers(R.sortRows(SAMPLE, 'employees', 'asc')), 'ACDB');
});
test('sortRows：成立年升冪＝最老的在前', () => {
  assert.equal(tickers(R.sortRows(SAMPLE, 'founded', 'asc')), 'BACD');
});
test('sortRows：不改動輸入陣列', () => {
  const before = tickers(SAMPLE);
  R.sortRows(SAMPLE, 'revenue', 'desc');
  assert.equal(tickers(SAMPLE), before);
});
test('sortRows：輸入順序被打亂，結果仍相同', () => {
  const shuffled = [SAMPLE[2], SAMPLE[0], SAMPLE[3], SAMPLE[1]];
  assert.equal(tickers(R.sortRows(shuffled, 'revenue', 'desc')), 'BACD');
  assert.equal(tickers(R.sortRows(shuffled, 'rank', 'asc')), 'ABCD');
});
test('defaultDir：名次與成立年預設升冪，金額與人數預設降冪', () => {
  assert.equal(R.defaultDir('rank'), 'asc');
  assert.equal(R.defaultDir('founded'), 'asc');
  assert.equal(R.defaultDir('marketCap'), 'desc');
  assert.equal(R.defaultDir('revenue'), 'desc');
  assert.equal(R.defaultDir('employees'), 'desc');
});

// ── 名次指派 ────────────────────────────────────────────────────────
test('assignRanks：依市值由大到小給 1..n，輸入不必先排好', () => {
  const out = R.assignRanks([
    { ticker: 'X', marketCap: 5 },
    { ticker: 'Y', marketCap: 50 },
    { ticker: 'Z', marketCap: 20 },
  ]);
  assert.deepEqual(
    out.map((c) => [c.ticker, c.rank]),
    [
      ['Y', 1],
      ['Z', 2],
      ['X', 3],
    ],
  );
});
test('assignRanks：同市值時代號小的在前', () => {
  const out = R.assignRanks([
    { ticker: '2882', marketCap: 10 },
    { ticker: '2881', marketCap: 10 },
  ]);
  assert.deepEqual(
    out.map((c) => c.ticker),
    ['2881', '2882'],
  );
});

// ── 篩選 ────────────────────────────────────────────────────────────
test('filterRows：單一條件', () => {
  assert.equal(tickers(R.filterRows(SAMPLE, { industry: '24' })), 'AC');
  assert.equal(tickers(R.filterRows(SAMPLE, { county: '臺北市' })), 'D');
});
test('filterRows：產業與縣市是「且」', () => {
  assert.equal(
    tickers(R.filterRows(SAMPLE, { industry: '24', county: '新竹市' })),
    'AC',
  );
  assert.equal(
    tickers(R.filterRows(SAMPLE, { industry: '24', county: '臺北市' })),
    '',
  );
});
test('filterRows：空字串與未給＝不篩', () => {
  assert.equal(R.filterRows(SAMPLE, {}).length, 4);
  assert.equal(R.filterRows(SAMPLE, { industry: '', county: '' }).length, 4);
});
test('applyState：先篩再排', () => {
  const s = { sort: 'founded', dir: 'desc', industry: '24', county: '' };
  assert.equal(tickers(R.applyState(SAMPLE, s)), 'CA');
});

// ── 名次變化 ────────────────────────────────────────────────────────
test('rankDelta：往前為正、往後為負、不變為 0、新進榜為 null', () => {
  assert.equal(R.rankDelta(SAMPLE[1]), 2);
  assert.equal(R.rankDelta(SAMPLE[2]), -1);
  assert.equal(R.rankDelta(SAMPLE[0]), 0);
  assert.equal(R.rankDelta(SAMPLE[3]), null);
});

// ── 摘要與分組 ──────────────────────────────────────────────────────
test('summarize：家數、合計、占比', () => {
  const s = R.summarize(R.filterRows(SAMPLE, { industry: '24' }), 1500);
  assert.equal(s.count, 2);
  assert.equal(s.capSum, 1100);
  assert.equal(s.revenueSum, 100);
  assert.ok(Math.abs(s.capSharePct - 73.3333) < 0.001);
});
test('summarize：空結果回 0，沒有 base 時占比為 null', () => {
  const s = R.summarize([]);
  assert.deepEqual(s, {
    count: 0,
    capSum: 0,
    revenueSum: 0,
    capSharePct: null,
  });
});
test('groupBy：依市值合計排序', () => {
  const g = R.groupBy(SAMPLE, 'industryCode');
  assert.deepEqual(
    g.map((x) => [x.key, x.count, x.capSum]),
    [
      ['24', 2, 1100],
      ['31', 1, 300],
      ['17', 1, 100],
    ],
  );
  assert.deepEqual(
    R.groupBy(SAMPLE, 'county').map((x) => x.key),
    ['新竹市', '新北市', '臺北市'],
  );
});

// ── 集中度 ──────────────────────────────────────────────────────────
test('concentration：四段相加為 100', () => {
  const rows = Array.from({ length: 12 }, (_, i) =>
    row({ ticker: `T${i}`, rank: i + 1, marketCap: 100 - i * 5 }),
  );
  const c = R.concentration(rows, 2000);
  assert.ok(Math.abs(c.top1Pct - 5) < 1e-9);
  // 第 2–10 名：95+90+…+55 = 675
  assert.ok(Math.abs(c.top2to10Pct - 33.75) < 1e-9);
  // 第 11–12 名：50+45 = 95
  assert.ok(Math.abs(c.restOfListPct - 4.75) < 1e-9);
  assert.ok(
    Math.abs(c.top1Pct + c.top2to10Pct + c.restOfListPct + c.outsidePct - 100) <
      1e-9,
  );
});
test('concentration：總市值不是正數就丟錯，不回一個看起來合理的數字', () => {
  assert.throws(() => R.concentration(SAMPLE, 0));
  assert.throws(() => R.concentration(SAMPLE, NaN));
});

// ── 單位 ────────────────────────────────────────────────────────────
test('displayMoney：zh／ja／ko 用億原值，其餘 ÷10 成 billion（#1317 十倍誤植的回歸測試）', () => {
  assert.equal(R.displayMoney(618487, 'zh-TW'), 618487);
  assert.equal(R.displayMoney(618487, 'ja'), 618487);
  assert.equal(R.displayMoney(618487, 'ko'), 618487);
  assert.equal(R.displayMoney(618487, 'en'), 61848.7);
  assert.equal(R.displayMoney(4533, 'fr'), 453.3);
});

// ── 網址狀態 ────────────────────────────────────────────────────────
test('serializeState／parseState：來回一致', () => {
  for (const s of [
    { sort: 'revenue', dir: 'desc', industry: '24', county: '新竹市' },
    { sort: 'founded', dir: 'desc', industry: '', county: '' },
    { sort: 'rank', dir: 'asc', industry: '', county: '臺北市' },
    { sort: 'employees', dir: 'asc', industry: '17', county: '' },
  ]) {
    assert.deepEqual(R.parseState(R.serializeState(s)), s);
  }
});
test('serializeState：預設狀態不留 hash', () => {
  assert.equal(R.serializeState(R.DEFAULT_STATE), '');
});
test('parseState：不認得的 hash 與亂填的欄位回到預設', () => {
  assert.deepEqual(R.parseState(''), R.DEFAULT_STATE);
  assert.deepEqual(R.parseState('#bubble-chart'), R.DEFAULT_STATE);
  const s = R.parseState('#rank?sort=price&dir=sideways');
  assert.equal(s.sort, 'rank');
  assert.equal(s.dir, 'asc');
});

// ── 資料完整性（正式資料）──────────────────────────────────────────
const ts = readFileSync(
  new URL('../src/utils/dataConfig.ts', import.meta.url),
  'utf8',
);
const meta = JSON.parse(
  readFileSync(
    new URL('../src/data/industry/companies-meta.json', import.meta.url),
    'utf8',
  ),
);
const block = ts.split('export const getCompanyConfigs')[1].split('\n];')[0];
const LIST = block
  .split('\n  {')
  .slice(1)
  .map((b) => ({
    ticker: /ticker: '(\w+)'/.exec(b)?.[1],
    marketCap: Number(/marketCap: (\d+)/.exec(b)?.[1]),
    revenue: Number(/revenue: (\d+)/.exec(b)?.[1]),
    employees: Number(/employees: (\d+)/.exec(b)?.[1]),
    founded: Number(/founded: (\d+)/.exec(b)?.[1]),
  }));
const FELL = [
  ...ts
    .split('export const getFellOffCompanies')[1]
    .matchAll(/ticker: '(\w+)'/g),
].map((m) => m[1]);

test('榜單：50 家、代號不重複、每個數值欄位都是正數', () => {
  assert.equal(LIST.length, 50);
  assert.equal(new Set(LIST.map((c) => c.ticker)).size, 50);
  for (const c of LIST) {
    for (const k of ['marketCap', 'revenue', 'employees', 'founded']) {
      assert.ok(Number.isFinite(c[k]) && c[k] > 0, `${c.ticker}.${k}`);
    }
    assert.ok(c.founded >= 1900 && c.founded <= 2026, `${c.ticker}.founded`);
  }
});
test('榜單：檔案裡的順序就是市值遞減（表格的名次欄靠這個順序）', () => {
  const ranked = R.assignRanks(LIST);
  assert.deepEqual(
    ranked.map((c) => c.ticker),
    LIST.map((c) => c.ticker),
  );
});
test('掉榜名單的每一家市值都低於第 50 名，且不在榜內', () => {
  const inList = new Set(LIST.map((c) => c.ticker));
  for (const t of FELL) assert.ok(!inList.has(t), `${t} 同時在榜內與掉榜名單`);
});
test('補充欄位：榜內與掉榜的每一家都有縣市、官方產業別、上市日', () => {
  const COUNTIES = new Set([
    '臺北市',
    '新北市',
    '桃園市',
    '臺中市',
    '臺南市',
    '高雄市',
    '基隆市',
    '新竹市',
    '嘉義市',
    '新竹縣',
    '苗栗縣',
    '彰化縣',
    '南投縣',
    '雲林縣',
    '嘉義縣',
    '屏東縣',
    '宜蘭縣',
    '花蓮縣',
    '臺東縣',
    '澎湖縣',
    '金門縣',
    '連江縣',
  ]);
  for (const t of [...LIST.map((c) => c.ticker), ...FELL]) {
    const m = meta.companies[t];
    assert.ok(
      m,
      `${t} 不在 companies-meta.json，請重跑 scripts/tools/industry-companies-meta.py`,
    );
    assert.ok(
      COUNTIES.has(m.county),
      `${t} 縣市「${m.county}」不是 22 縣市之一`,
    );
    assert.ok(m.industry && /^\d{2}$/.test(m.industryCode), `${t} 產業別`);
    assert.match(m.listed, /^\d{4}-\d{2}-\d{2}$/, `${t} 上市日`);
    assert.ok(['TWSE', 'TPEx'].includes(m.market), `${t} 市場`);
  }
});
test('補充欄位：上次名次是 1–50 的整數或 null，且彼此不重複', () => {
  const prev = LIST.map((c) => meta.companies[c.ticker].prevRank).filter(
    (x) => x != null,
  );
  for (const p of prev) assert.ok(Number.isInteger(p) && p >= 1 && p <= 50);
  assert.equal(new Set(prev).size, prev.length);
});
test('補充欄位：來源帶網址與基本資料的出表日', () => {
  assert.match(meta.basicDataAsOf, /^\d{4}-\d{2}-\d{2}$/);
  assert.ok(meta.sources.length >= 2);
  for (const s of meta.sources) assert.match(s.url, /^https:\/\//);
});
