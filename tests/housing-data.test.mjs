/**
 * housing-data.test.mjs — /housing/ 房地產專題資料檔契約
 *（跑：node --test tests/housing-data.test.mjs）
 *
 * src/data/housing/*.json 是 scripts/tools/build-housing-data.py 從兩份研究檔
 * （reports/research/2026-11/housing-statistics.md、housing-cbc-credit-rates.md）
 * 解析出來的，數字會直接進到讀者看的圖表與試算，所以資料檔本身要守住這幾件事：
 *   - 每個 series／table 都附官方來源網址（https://）
 *   - points 的時間鍵格式合法、嚴格遞增、不重複；數值是有限數字
 *   - 季／月／年序列中間不缺期；官方本來就缺的，要在 series.gaps 明列
 *   - 負擔率、比率類序列落在 0–100
 *   - 115Q1 縣市負擔能力表與 calc-fixtures.json（試算頁另一條獨立轉錄）逐列相同
 *   - 重跑建置腳本（--check）與現有檔一致，也就是沒有人手改過 JSON
 *
 * 排除：calc-fixtures.json、qingan.json、timeline.json、positions.json
 * （這幾個不是由建置腳本產生的資料檔）。
 */
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';

const root = new URL('../', import.meta.url);
const dir = new URL('src/data/housing/', root);
const EXCLUDE = new Set([
  'calc-fixtures.json',
  'qingan.json',
  'timeline.json',
  'positions.json',
]);

const files = readdirSync(dir)
  .filter((f) => f.endsWith('.json') && !EXCLUDE.has(f))
  .sort();
const data = Object.fromEntries(
  files.map((f) => [f, JSON.parse(readFileSync(new URL(f, dir), 'utf8'))]),
);

const EXPECTED_FILES = [
  'affordability.json',
  'credit-controls.json',
  'income.json',
  'lending.json',
  'price-index.json',
  'rates.json',
  'social-housing.json',
  'stock.json',
  'tax.json',
  'transactions.json',
  'vacancy.json',
];

const allSeries = files.flatMap((f) =>
  (data[f].series ?? []).map((s) => ({ file: f, s })),
);
const allTables = files.flatMap((f) =>
  (data[f].tables ?? []).map((t) => ({ file: f, t })),
);

const isHttps = (u) => typeof u === 'string' && u.startsWith('https://');

// 時間鍵格式：依 cadence 限定；irregular 只要是下列任一種合法格式
const T_FORMATS = {
  quarterly: /^\d{4}Q[1-4]$/,
  semiannual: /^\d{4}H[12]$/,
  monthly: /^\d{4}-(0[1-9]|1[0-2])$/,
  annual: /^\d{4}$/,
  event: /^\d{4}-(0[1-9]|1[0-2])(-(0[1-9]|[12]\d|3[01]))?$/,
};
T_FORMATS.irregular = new RegExp(
  Object.values(T_FORMATS)
    .map((r) => r.source)
    .join('|'),
);

function periodsBetween(first, last, cadence) {
  const out = [];
  if (cadence === 'quarterly') {
    let y = +first.slice(0, 4);
    let q = +first[5];
    const ey = +last.slice(0, 4);
    const eq = +last[5];
    while (y < ey || (y === ey && q <= eq)) {
      out.push(`${y}Q${q}`);
      if (++q === 5) [y, q] = [y + 1, 1];
    }
  } else if (cadence === 'monthly') {
    let y = +first.slice(0, 4);
    let m = +first.slice(5, 7);
    const ey = +last.slice(0, 4);
    const em = +last.slice(5, 7);
    while (y < ey || (y === ey && m <= em)) {
      out.push(`${y}-${String(m).padStart(2, '0')}`);
      if (++m === 13) [y, m] = [y + 1, 1];
    }
  } else if (cadence === 'annual') {
    for (let y = +first; y <= +last; y++) out.push(String(y));
  }
  return out;
}

test('該有的 11 個資料檔都在，且共用同一個外形', () => {
  assert.deepEqual(files, EXPECTED_FILES);
  for (const f of files) {
    const d = data[f];
    assert.match(d.$comment, /build-housing-data\.py/, `${f} 缺 $comment`);
    assert.equal(d.retrieved, '2026-11-10', `${f} retrieved`);
    assert.ok(Array.isArray(d.series), `${f} series 不是陣列`);
    assert.ok(Array.isArray(d.tables), `${f} tables 不是陣列`);
  }
});

test('series／table 的 id 在全站不重複', () => {
  const ids = [
    ...allSeries.map(({ s }) => s.id),
    ...allTables.map(({ t }) => t.id),
  ];
  assert.equal(new Set(ids).size, ids.length, 'id 重複');
});

test('每個 series／table 都有 source，且網址以 https:// 開頭', () => {
  for (const { file, s } of allSeries) {
    assert.ok(s.source?.agency && s.source?.title, `${file} ${s.id} 缺 source`);
    assert.ok(isHttps(s.source.url), `${file} ${s.id} source.url 不是 https`);
  }
  for (const { file, t } of allTables) {
    assert.ok(t.source?.agency && t.source?.title, `${file} ${t.id} 缺 source`);
    assert.ok(isHttps(t.source.url), `${file} ${t.id} source.url 不是 https`);
    // 列層級的來源（信用管制時間線等）也要有網址
    for (const row of t.rows) {
      for (const src of row.sources ?? []) {
        assert.ok(
          isHttps(src.url),
          `${file} ${t.id} ${row.key} 列來源不是 https`,
        );
      }
    }
  }
  for (const f of files) {
    for (const k of ['source', 'corroboratedBy']) {
      const src = data[f].bands?.[k];
      if (src) assert.ok(isHttps(src.url), `${f} bands.${k} 不是 https`);
    }
    if (data[f].bands) assert.ok(data[f].bands.source, `${f} bands 缺 source`);
  }
});

test('series 形狀：label 中英文、unit、cadence、asOf 等於最後一點', () => {
  for (const { file, s } of allSeries) {
    const where = `${file} ${s.id}`;
    assert.ok(s.label?.zh && s.label?.en, `${where} label`);
    assert.ok(typeof s.unit === 'string' && s.unit, `${where} unit`);
    assert.ok(s.cadence in T_FORMATS, `${where} cadence ${s.cadence}`);
    assert.equal(typeof s.derived, 'boolean', `${where} derived`);
    assert.ok(s.points.length > 0, `${where} 沒有 points`);
    assert.equal(s.asOf, s.points.at(-1).t, `${where} asOf != 最後一點`);
  }
});

test('points：t 格式合法、嚴格遞增不重複；v 是有限數字', () => {
  for (const { file, s } of allSeries) {
    const where = `${file} ${s.id}`;
    const re = T_FORMATS[s.cadence];
    let prev = null;
    for (const p of s.points) {
      assert.match(p.t, re, `${where} t=${p.t} 不符 ${s.cadence} 格式`);
      assert.ok(
        typeof p.v === 'number' && Number.isFinite(p.v),
        `${where} ${p.t} v 不是有限數字`,
      );
      if (prev !== null) assert.ok(p.t > prev, `${where} ${p.t} 沒有嚴格遞增`);
      prev = p.t;
    }
  }
});

test('季／月／年序列中間不缺期（官方本來就缺的要在 gaps 明列）', () => {
  for (const { file, s } of allSeries) {
    const expected = periodsBetween(
      s.points[0].t,
      s.points.at(-1).t,
      s.cadence,
    );
    if (!expected.length) continue; // semiannual / event / irregular 不檢查
    const have = new Set(s.points.map((p) => p.t));
    const missing = expected.filter((t) => !have.has(t));
    assert.deepEqual(
      missing,
      s.gaps ?? [],
      `${file} ${s.id} 缺期與 gaps 宣告不符`,
    );
  }
});

test('比率類序列（負擔率、空閒率、自有率、集中度）落在 0–100', () => {
  const ratioLike =
    /burden|vacancy-rate|low-use-ratio|homeownership|concentration/;
  for (const { file, s } of allSeries) {
    if (!ratioLike.test(s.id)) continue;
    assert.equal(s.unit, '%', `${file} ${s.id} 單位應為 %`);
    assert.deepEqual(s.bounds, [0, 100], `${file} ${s.id} 缺 bounds`);
  }
  for (const { file, s } of allSeries) {
    if (!s.bounds) continue;
    for (const p of s.points) {
      assert.ok(
        p.v >= s.bounds[0] && p.v <= s.bounds[1],
        `${file} ${s.id} ${p.t}=${p.v} 超出 ${s.bounds}`,
      );
    }
  }
  for (const { file, t } of allTables) {
    for (const col of t.columns) {
      if (!/Pct$/.test(col) || /(QoQ|YoY)/.test(col)) continue;
      for (const row of t.rows) {
        const v = row[col];
        if (v == null) continue;
        assert.ok(v >= 0 && v <= 100, `${file} ${t.id} ${row.key}.${col}=${v}`);
      }
    }
  }
});

test('table 形狀：rows 的 key 不重複，columns 對得上列內欄位', () => {
  for (const { file, t } of allTables) {
    const where = `${file} ${t.id}`;
    assert.ok(t.label?.zh && t.label?.en, `${where} label`);
    assert.ok(t.rows.length > 0, `${where} 沒有 rows`);
    const keys = t.rows.map((r) => r.key);
    assert.equal(new Set(keys).size, keys.length, `${where} row.key 重複`);
    for (const row of t.rows) {
      for (const col of t.columns) {
        assert.ok(col in row, `${where} ${row.key} 缺欄位 ${col}`);
      }
    }
  }
});

test('115Q1 縣市負擔能力表與 calc-fixtures.json 逐列相同', () => {
  const table = data['affordability.json'].tables.find(
    (t) => t.id === 'affordability-by-county-2026Q1',
  );
  assert.ok(table, '缺 affordability-by-county-2026Q1');
  const fixtures = JSON.parse(
    readFileSync(new URL('calc-fixtures.json', dir), 'utf8'),
  ).officialAffordability;
  assert.equal(table.period, fixtures.periodCe, '期別不同');
  assert.equal(table.rows.length, fixtures.rows.length, '列數不同');
  for (const [i, fx] of fixtures.rows.entries()) {
    const row = table.rows[i];
    assert.equal(row.key, fx.name, `第 ${i} 列縣市不同`);
    assert.equal(row.burdenPct, fx.burdenPct, `${fx.name} 房貸負擔率`);
    assert.equal(row.priceToIncome, fx.priceToIncome, `${fx.name} 房價所得比`);
    assert.equal(row.smallSample, fx.smallSample, `${fx.name} smallSample`);
  }
  // 全國列也要跟全國季序列的 2026Q1 一致
  const nat = data['affordability.json'].series;
  const last = (id) => nat.find((s) => s.id === id).points.at(-1);
  assert.equal(last('mortgage-burden-national').t, '2026Q1');
  assert.equal(last('mortgage-burden-national').v, fixtures.nation.burdenPct);
  assert.equal(
    last('price-to-income-national').v,
    fixtures.nation.priceToIncome,
  );
});

test('官方四級門檻：50／40／30，含下界不含上界', () => {
  const { levels } = data['affordability.json'].bands;
  assert.deepEqual(
    levels.map((l) => [l.min, l.max]),
    [
      [50, null],
      [40, 50],
      [30, 40],
      [null, 30],
    ],
  );
});

test('建置腳本 --check：JSON 與研究檔重算結果一致（沒有人手改）', () => {
  const script = fileURLToPath(
    new URL('scripts/tools/build-housing-data.py', root),
  );
  const r = spawnSync('python3', [script, '--check'], {
    cwd: fileURLToPath(root),
    encoding: 'utf8',
  });
  assert.equal(r.status, 0, `--check 失敗：\n${r.stdout}\n${r.stderr}`);
});
