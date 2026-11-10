/**
 * industry-data.test.mjs — 「台灣產業」專題的資料完整性
 *（跑：node --experimental-strip-types --test tests/industry-data.test.mjs）
 *
 * 守三件事：
 *  1. 每個數列有來源網址、年份與數值對得上、占比類加總合理（抓整理腳本接錯欄）。
 *  2. 內容檔（時間軸、立場、供應鏈、聚落、展望）每一筆有日期／出處，每段文字中英都有。
 *  3. 個股相關文案沒有評價與預測用語；zh／en 兩份字串鍵一致。
 * 數字本身對不對，靠研究檔裡的原文片段與人工抽驗，不在這裡（測試只能守形狀）。
 */
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { test } from 'node:test';

const read = (p) =>
  JSON.parse(readFileSync(new URL(p, import.meta.url), 'utf8'));
const S = read('../src/data/industry/series.json');
const C = (name) => read(`../src/data/industry/content/${name}.json`);
const { zh } = await import('../src/i18n/industry/zh.ts');
const { en } = await import('../src/i18n/industry/en.ts');
const { flattenContent } = await import('../src/i18n/industry/flatten.ts');
const R = await import('../src/utils/industry/companiesRank.ts');

const isUrl = (u) => typeof u === 'string' && /^https?:\/\/\S+$/.test(u);
const asc = (xs) => xs.every((v, i) => i === 0 || v > xs[i - 1]);
const near = (a, b, tol) => Math.abs(a - b) <= tol;

// ── 數列 ────────────────────────────────────────────────────────────
const TABLES = [
  'exportProducts',
  'exportMarkets',
  'exportLongHistory',
  'gdpSectors',
  'gdpElectronics',
  'parksRevenue',
  'icOutput',
];
for (const k of TABLES) {
  test(`series.${k}：有來源網址、年份遞增、每列長度等於年份數`, () => {
    const s = S[k];
    assert.ok(s, `${k} 不在 series.json（缺研究檔？）`);
    assert.ok(isUrl(s.source?.url), `${k}.source.url`);
    assert.ok(s.source.publisher, `${k}.source.publisher`);
    assert.ok(asc(s.years), `${k}.years 沒有遞增`);
    for (const r of s.rows)
      assert.equal(r.values.length, s.years.length, `${k}.${r.id}`);
  });
}
test('出口長期結構：三類相加約 100%', () => {
  const s = S.exportLongHistory;
  s.years.forEach((y, i) => {
    const sum = s.rows.reduce((a, r) => a + r.values[i], 0);
    assert.ok(near(sum, 100, 0.3), `${y} 年加總 ${sum}`);
  });
});
test('出口貨品占比：每個值在 0–100，十一類相加不超過 100', () => {
  const s = S.exportProducts;
  s.years.forEach((y, i) => {
    const vals = s.rows.map((r) => r.values[i]);
    for (const v of vals) assert.ok(v > 0 && v < 100, `${y} 年有值 ${v}`);
    assert.ok(
      vals.reduce((a, b) => a + b, 0) <= 100.5,
      `${y} 年十一類相加超過 100`,
    );
  });
});
test('出口市場占比：五個市場相加不超過 100（歐洲與東協不重疊）', () => {
  const s = S.exportMarkets;
  s.years.forEach((y, i) => {
    const sum = s.rows.reduce((a, r) => a + r.values[i], 0);
    assert.ok(sum > 50 && sum <= 100.5, `${y} 年五市場相加 ${sum}`);
  });
});
test('三級產業占 GDP：農、工、服務相加約 100%，製造業不大於工業', () => {
  const s = S.gdpSectors;
  const get = (id) => s.rows.find((r) => r.id === id).values;
  s.years.forEach((y, i) => {
    const sum = get('agriculture')[i] + get('industry')[i] + get('services')[i];
    assert.ok(near(sum, 100, 0.2), `${y} 年加總 ${sum}`);
    assert.ok(
      s.manufacturing[i] <= get('industry')[i],
      `${y} 年製造業大於工業`,
    );
  });
});
test('科學園區：三園區相加等於合計', () => {
  const s = S.parksRevenue;
  s.years.forEach((y, i) => {
    const sum = s.rows.reduce((a, r) => a + r.values[i], 0);
    assert.ok(near(sum, s.total[i], 0.05), `${y} 年 ${sum} vs ${s.total[i]}`);
  });
  for (const p of s.partial)
    assert.ok(!s.years.includes(p.year), '非全年的資料不該進折線');
});
test('IC 產值：五段相加等於總產值', () => {
  const s = S.icOutput;
  s.years.forEach((y, i) => {
    const sum = s.rows.reduce((a, r) => a + r.values[i], 0);
    assert.equal(sum, s.total[i], `${y} 年`);
  });
  assert.ok(isUrl(s.estimate2026.source.url));
});
test('各縣市工廠：22 縣市、家數相加等於全國公布數', () => {
  const f = S.factoriesByCounty;
  assert.equal(f.rows.length, 22);
  assert.equal(
    f.rows.reduce((a, r) => a + r.factories, 0),
    f.national.operatingFactories,
  );
  assert.ok(isUrl(f.source.url));
});
test('市值快照：上市加上櫃等於合計，前 50 大不超過合計', () => {
  const m = S.marketSnapshot;
  assert.equal(m.twseTotal100M + m.tpexTotal100M, m.listedTotal100M);
  assert.ok(m.top50Total100M < m.listedTotal100M);
  assert.match(m.date, /^\d{4}-\d{2}-\d{2}$/);
  for (const s of m.sources) assert.ok(isUrl(s.url));
});
test('歷年前十名：每年十家、代號不重複、市值遞減、台積電占比等於第一名市值÷總市值', () => {
  const h = S.marketHistory;
  assert.ok(h.years.length >= 5);
  for (const y of h.years) {
    assert.equal(y.top.length, 10, y.label);
    assert.equal(new Set(y.top.map((c) => c.code)).size, 10, y.label);
    assert.ok(
      y.top.every((c, i) => i === 0 || c.cap100M <= y.top[i - 1].cap100M),
      `${y.label} 沒有遞減`,
    );
    const tsmc = y.top.find((c) => c.code === '2330');
    assert.ok(
      near((tsmc.cap100M / y.listedTotal100M) * 100, y.tsmcSharePct, 0.05),
      `${y.label} 台積電占比`,
    );
    const sum = y.top.reduce((a, c) => a + c.cap100M, 0);
    assert.ok(
      near((sum / y.listedTotal100M) * 100, y.top10SharePct, 0.05),
      `${y.label} 前十名占比`,
    );
  }
  for (const p of h.pick)
    assert.ok(
      h.years.some((y) => y.label === p),
      `pick ${p} 沒有資料`,
    );
  assert.ok(asc(h.tsmcShare.years));
});
test('集中度：用正式資料算出來四段相加為 100，且每段為正', () => {
  const ts = readFileSync(
    new URL('../src/utils/dataConfig.ts', import.meta.url),
    'utf8',
  );
  const block = ts.split('export const getCompanyConfigs')[1].split('\n];')[0];
  const rows = block
    .split('\n  {')
    .slice(1)
    .map((b, i) => ({
      ticker: /ticker: '(\w+)'/.exec(b)[1],
      rank: i + 1,
      marketCap: Number(/marketCap: (\d+)/.exec(b)[1]),
      revenue: 0,
      employees: 0,
      founded: 0,
      industryCode: '',
      county: '',
      prevRank: null,
    }));
  const c = R.concentration(rows, S.marketSnapshot.listedTotal100M);
  for (const v of Object.values(c)) assert.ok(v > 0);
  assert.ok(
    near(c.top1Pct + c.top2to10Pct + c.restOfListPct + c.outsidePct, 100, 1e-9),
  );
  // 榜單合計要等於快照檔記的前 50 大合計：兩個檔案換快照時必須一起換
  assert.equal(
    rows.reduce((a, r) => a + r.marketCap, 0),
    S.marketSnapshot.top50Total100M,
  );
});

// ── 內容檔 ──────────────────────────────────────────────────────────
test('時間軸：每筆有日期、軌道、時期、出處網址；id 不重複', () => {
  const t = C('timeline');
  assert.ok(t.events.length >= 25, `只有 ${t.events.length} 筆`);
  const eras = new Set(t.eras.map((e) => e.id));
  const ids = new Set();
  for (const e of t.events) {
    assert.match(e.date, /^\d{4}(-\d{2}(-\d{2})?)?$/, `${e.id} 日期`);
    assert.ok(
      ['policy', 'company', 'market', 'world'].includes(e.track),
      `${e.id} 軌道`,
    );
    assert.ok(eras.has(e.era), `${e.id} 時期 ${e.era}`);
    assert.ok(isUrl(e.url), `${e.id} 沒有出處`);
    assert.ok(!ids.has(e.id), `${e.id} 重複`);
    ids.add(e.id);
    const year = Number(e.date.slice(0, 4));
    const era = t.eras.find((x) => x.id === e.era);
    assert.ok(
      year >= era.from && year <= era.to,
      `${e.id}（${year}）不在時期 ${era.id} 的年份範圍內`,
    );
  }
});
test('立場：六個爭論，每個至少兩方，每張卡有具名、日期、原文、出處', () => {
  const d = C('debates').debates;
  assert.equal(d.length, 6);
  for (const x of d) {
    assert.ok(x.voices.length >= 2, `${x.id} 只有 ${x.voices.length} 張卡`);
    assert.ok(
      new Set(x.voices.map((v) => v.side)).size >= 2,
      `${x.id} 只有單一方`,
    );
    for (const v of x.voices) {
      assert.ok(
        ['concern', 'response', 'other'].includes(v.side),
        `${x.id}.${v.id} side`,
      );
      assert.match(v.date, /^\d{4}(-\d{2}(-\d{2})?)?$/, `${x.id}.${v.id} 日期`);
      assert.ok(v.quote && v.quote.length >= 8, `${x.id}.${v.id} 引句`);
      assert.ok(
        ['zh', 'en'].includes(v.quoteLang),
        `${x.id}.${v.id} quoteLang`,
      );
      assert.ok(
        ['direct', 'document', 'reported'].includes(v.kind),
        `${x.id}.${v.id} kind（直接引語／文件原文／轉述）`,
      );
      assert.ok(isUrl(v.url), `${x.id}.${v.id} 出處`);
      assert.ok(
        v.who?.zh && v.who?.en && v.role?.zh && v.role?.en,
        `${x.id}.${v.id} 具名`,
      );
      assert.ok(v.tr?.zh && v.tr?.en, `${x.id}.${v.id} 譯文`);
    }
    for (const f of x.facts ?? [])
      assert.ok(isUrl(f.url) && f.v?.zh && f.v?.en, `${x.id} 數字卡 ${f.id}`);
  }
});
test('供應鏈：三條鏈，每個環節有公司或有缺口說明，每家有角色與出處，環節內代號不重複', () => {
  const ch = C('chains');
  assert.equal(ch.chains.length, 3);
  assert.match(ch.asOf, /^\d{4}-\d{2}-\d{2}$/);
  for (const c of ch.chains) {
    assert.ok(c.stages.length >= 4, `${c.id} 只有 ${c.stages.length} 環`);
    for (const s of c.stages) {
      assert.ok(
        s.companies.length <= 5,
        `${c.id}.${s.id} 家數 ${s.companies.length}`,
      );
      // 沒有列台灣公司的環節必須寫明這一環靠誰、或為什麼不列
      assert.ok(
        s.companies.length >= 1 || (s.gap?.zh && s.gap?.en),
        `${c.id}.${s.id} 沒有公司也沒有說明`,
      );
      assert.equal(
        new Set(s.companies.map((x) => x.id)).size,
        s.companies.length,
        `${c.id}.${s.id} 重複`,
      );
      for (const co of s.companies) {
        assert.ok(isUrl(co.url), `${c.id}.${s.id}.${co.id} 沒有出處`);
        assert.ok(co.role?.zh && co.role?.en, `${c.id}.${s.id}.${co.id} 角色`);
      }
      if (s.gap) assert.ok(s.gap.zh && s.gap.en, `${c.id}.${s.id} gap`);
    }
  }
});
test('聚落與展望：每筆有出處', () => {
  for (const c of C('places').clusters)
    assert.ok(isUrl(c.url) && c.counties.length, c.id);
  const o = C('outlook');
  for (const k of ['strengths', 'constraints', 'scheduled']) {
    assert.ok(o[k].length >= 3, `${k} 少於三項`);
    for (const it of o[k])
      assert.ok(isUrl(it.url) || /^#/.test(it.url), `${k}.${it.id} 出處`);
  }
  for (const f of o.tsmc) assert.ok(isUrl(f.url) && f.v, `tsmc.${f.id}`);
  for (const k of ['policy', 'parks', 'tax', 'capital'])
    assert.ok(isUrl(o.institutions[k]?.url), `institutions.${k}`);
});
test('內容檔：每個文字節點中英都有，沒有只寫一半的', () => {
  const dir = new URL('../src/data/industry/content/', import.meta.url);
  for (const f of readdirSync(dir).filter((x) => x.endsWith('.json'))) {
    const raw = readFileSync(new URL(f, dir), 'utf8');
    const z = {};
    const e = {};
    flattenContent(JSON.parse(raw), f.replace('.json', ''), z, e);
    for (const k of Object.keys(z)) {
      assert.ok(z[k].trim() && e[k].trim(), `${k} 有空字串`);
    }
    const nZh = (raw.match(/"zh":/g) || []).length;
    const nEn = (raw.match(/"en":/g) || []).length;
    assert.equal(nZh, nEn, `${f} 的 zh 與 en 節點數不同`);
    assert.equal(
      Object.keys(z).length,
      nZh,
      `${f} 有 {zh,en} 節點沒被攤平到（結構不符 flatten 規則）`,
    );
  }
});

// ── 文案 ────────────────────────────────────────────────────────────
test('zh.ts 與 en.ts 鍵一致', () => {
  assert.deepEqual(Object.keys(en).sort(), Object.keys(zh).sort());
});
test('頁面用到的 tse.<代號> 與 county.<縣市> 都有字串', () => {
  const meta = read('../src/data/industry/companies-meta.json').companies;
  for (const m of Object.values(meta)) {
    if (m.inTop50)
      assert.ok(zh[`tse.${m.industryCode}`], `缺 tse.${m.industryCode}`);
    assert.ok(zh[`county.${m.county}`], `缺 county.${m.county}`);
  }
  for (const r of S.factoriesByCounty.rows)
    assert.ok(zh[`county.${r.county}`], `缺 county.${r.county}`);
});
test('個股相關文案沒有評價、預測、買賣建議用語（聲明句本身除外）', () => {
  const BAD = [
    /看好|看壞|看多|看空|目標價|逢低|加碼|減碼|值得買|可以買|建議買進|建議賣出|必漲|飆股|潛力股|低估|高估|護盤/,
    /\b(undervalued|overvalued|price target|buy rating|sell rating|outperform|underperform|bullish|bearish|upside potential)\b/i,
  ];
  const all = {};
  const allEn = {};
  for (const n of ['timeline', 'places', 'chains', 'outlook'])
    flattenContent(C(n), n, all, allEn);
  const texts = [
    ...Object.entries(zh),
    ...Object.entries(en),
    ...Object.entries(all),
    ...Object.entries(allEn),
  ];
  for (const [k, v] of texts) {
    for (const re of BAD)
      assert.ok(!re.test(v), `${k} 含評價或預測用語：${v.match(re)?.[0]}`);
  }
});
test('敘事聲音不寫「中國大陸」「mainland」（TERMINOLOGY 2026-10-10；引句與官方名稱除外）', () => {
  for (const [k, v] of [...Object.entries(zh), ...Object.entries(en)]) {
    assert.ok(!/中國大陸|mainland/i.test(v), k);
  }
});
