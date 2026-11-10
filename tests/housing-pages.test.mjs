/**
 * housing-pages.test.mjs：/housing/ 三個子頁（發展歷程、青安貸款、各方立場）的契約
 *（跑：node --experimental-strip-types --test tests/housing-pages.test.mjs）
 *
 * 守六類事：
 *   1. 文案 housingSub('zh-TW') 與 ('en') 的鍵集合與 {佔位符} 相同；zh 無破折號「——」、無「不是…是」對位句；en 無長破折號
 *   2. SEO 長度：標題中文 30 字內含 2026、英文 60 字元內；描述中文 70 到 80 字、英文 150 字元內（佔位符用資料檔實際值代入）
 *   3. 專題登記檔 subpages 不含 positions；原始碼裡只有立場頁自己與 13 語薄殼提到 /housing/positions
 *   4. timeline.json：每筆 event 的 era 都在 eras 內、date 不遞減；cycles 的 rise 有 note 或 value
 *   5. qingan.json：subsidySteps 的 netRatePct ＝ baseRatePct − subsidyPct；原貸款利率 ＝ 基準 + 加碼；
 *      timeline 每筆有 source（指到 sources 表）或 sourceUrl；EN_DATA 的鍵都對得到資料檔，英文裡的數字都出現在中文原文
 *   6. positions.json：每個 verbatim 引語有 https 來源網址；13 語 × 2 頁薄殼共 26 個且 import 的模板存在；/housing/positions/ 選前沒有薄殼
 */
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

import { EN_DATA, housingSub } from '../src/i18n/housing-sub.ts';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const json = (p) => JSON.parse(readFileSync(join(ROOT, p), 'utf8'));
const timeline = json('src/data/housing/timeline.json');
const qingan = json('src/data/housing/qingan.json');
const positions = json('src/data/housing/positions.json');
const topic = json('src/data/topics/housing.json');
const zh = housingSub('zh-TW');
const en = housingSub('en');

// ── 工具 ────────────────────────────────────────────────────────────

/** 展開成 path → 字串（陣列用索引）。 */
function flat(obj, prefix = '', out = {}) {
  if (typeof obj === 'string') out[prefix] = obj;
  else if (Array.isArray(obj))
    obj.forEach((v, i) => flat(v, `${prefix}[${i}]`, out));
  else if (obj && typeof obj === 'object')
    for (const [k, v] of Object.entries(obj))
      flat(v, prefix ? `${prefix}.${k}` : k, out);
  return out;
}
const placeholders = (s) =>
  [...s.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort();
const fill = (s, vars) =>
  s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? `{${k}}`));
const MON = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
function fmtDate(d, lang) {
  const m = d.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return d;
  return lang === 'zh-TW'
    ? `${m[1]} 年 ${+m[2]} 月 ${+m[3]} 日`
    : `${+m[3]} ${MON[+m[2] - 1]} ${m[1]}`;
}
const trim = (n) => String(+n.toFixed(3));

// ── 1. 文案 ─────────────────────────────────────────────────────────

test('housingSub：zh-TW 與 en 鍵集合相同，佔位符一致', () => {
  const a = flat(zh);
  const b = flat(en);
  assert.deepEqual(Object.keys(a).sort(), Object.keys(b).sort());
  for (const k of Object.keys(a)) {
    assert.deepEqual(
      placeholders(a[k]),
      placeholders(b[k]),
      `placeholders of ${k}`,
    );
    assert.ok(a[k].trim() && b[k].trim(), `empty string at ${k}`);
  }
  assert.equal(housingSub('ja'), en, '其他語言回 en');
});

test('housingSub：zh 無破折號與對位句，en 無長破折號', () => {
  for (const [k, v] of Object.entries(flat(zh))) {
    assert.ok(!v.includes('——'), `「——」 in ${k}`);
    assert.ok(!/不是.{0,30}(是|而是)/.test(v), `對位句 in ${k}: ${v}`);
  }
  for (const [k, v] of Object.entries(flat(en)))
    assert.ok(!v.includes('—'), `em dash in ${k}`);
  for (const [k, v] of Object.entries(flat(EN_DATA)))
    assert.ok(!v.includes('—'), `em dash in EN_DATA ${k}`);
});

// ── 2. SEO ──────────────────────────────────────────────────────────

function seoVars() {
  const years = timeline.events.map((e) => +e.date.slice(0, 4));
  const steps = qingan.rate.subsidySteps;
  const v3 = qingan.naming.find((n) => n.id === 'v3');
  const issues = positions.issues.length;
  return (lang) => ({
    // history
    n: timeline.events.length,
    from: Math.min(...years),
    to: Math.max(...years),
    iso: timeline.retrieved,
    // positions
    nIssues: issues,
  });
}

test('SEO：標題與描述長度', () => {
  const vars = seoVars();
  const years = timeline.events.map((e) => +e.date.slice(0, 4));
  const steps = qingan.rate.subsidySteps;
  const v3 = qingan.naming.find((n) => n.id === 'v3');
  const cases = (lang) => {
    const T = housingSub(lang);
    const hv = vars(lang);
    const qv = {
      fromIso: v3.from,
      n: steps[0].years,
      r0: trim(steps[0].netRatePct),
      yr: steps.reduce((a, s) => a + (s.years ?? 0), 0) + 1,
      base: trim(qingan.rate.baseRatePct),
      iso: qingan.asOf,
    };
    const pv = { nIssues: positions.issues.length, iso: positions.retrieved };
    return {
      hist: [fill(T.hist.meta.title, hv), fill(T.hist.meta.description, hv)],
      qa: [fill(T.qa.meta.title, qv), fill(T.qa.meta.description, qv)],
      pos: [fill(T.pos.meta.title, pv), fill(T.pos.meta.description, pv)],
    };
  };
  for (const [name, [title, desc]] of Object.entries(cases('zh-TW'))) {
    assert.ok(
      [...title].length <= 30,
      `zh title ${name} ${[...title].length}: ${title}`,
    );
    assert.ok(title.includes('2026'), `zh title ${name} needs 2026`);
    const n = [...desc].length;
    assert.ok(
      n >= 70 && n <= 80,
      `zh description ${name} is ${n} chars: ${desc}`,
    );
  }
  for (const [name, [title, desc]] of Object.entries(cases('en'))) {
    assert.ok(title.length <= 60, `en title ${name} ${title.length}: ${title}`);
    assert.ok(title.includes('2026'), `en title ${name} needs 2026`);
    assert.ok(
      desc.length <= 150,
      `en description ${name} is ${desc.length} chars: ${desc}`,
    );
  }
  assert.ok(years.length > 0);
});

// ── 3. 立場頁不公開 ─────────────────────────────────────────────────

test('專題登記檔 subpages 不含 positions', () => {
  assert.ok(!JSON.stringify(topic.subpages).includes('positions'));
  assert.ok(!JSON.stringify(topic.tools).includes('positions'));
});

test('只有立場頁自己、薄殼與本測試提到 /housing/positions', () => {
  const hits = [];
  const walk = (dir) => {
    for (const f of readdirSync(dir)) {
      const p = join(dir, f);
      const st = statSync(p);
      if (st.isDirectory()) walk(p);
      else if (/\.(astro|ts|json|css|md)$/.test(f)) {
        const s = readFileSync(p, 'utf8');
        // 引號、括號後緊接 /housing/positions 才算連結或路徑常數；註解裡的說明文字不算
        if (/['"`(]\/?housing\/positions/.test(s))
          hits.push(p.slice(ROOT.length + 1));
      }
    }
  };
  walk(join(ROOT, 'src'));
  assert.deepEqual(
    hits,
    [],
    `不應有任何 src 檔連到 /housing/positions/：${hits.join(', ')}`,
  );
});

// ── 4. timeline.json ───────────────────────────────────────────────

test('timeline.json：event 的 era 都在 eras 內、date 不遞減', () => {
  const eraIds = new Set(timeline.eras.map((e) => e.id));
  assert.equal(eraIds.size, 6);
  let prev = '';
  for (const e of timeline.events) {
    assert.ok(eraIds.has(e.era), `unknown era ${e.era} at ${e.date}`);
    assert.ok(
      e.date >= prev,
      `date goes backwards at ${e.date} (prev ${prev})`,
    );
    prev = e.date;
    assert.ok(e.sources?.length > 0, `no source at ${e.date} ${e.title.zh}`);
    for (const s of e.sources) assert.match(s.url, /^https?:\/\//);
    assert.ok(e.title.zh && e.title.en && e.body.zh && e.body.en);
  }
  for (const c of timeline.cycles)
    assert.ok(
      c.rise.value !== null || c.rise.note,
      `cycle ${c.id} needs rise value or note`,
    );
});

// ── 5. qingan.json ──────────────────────────────────────────────────

test('qingan.json：階梯利率與公式', () => {
  const base = qingan.rate.baseRatePct;
  for (const s of qingan.rate.subsidySteps)
    assert.ok(
      Math.abs(s.netRatePct - (base - s.subsidyPct)) < 1e-9,
      `step ${JSON.stringify(s)}`,
    );
  assert.ok(
    Math.abs(qingan.rate.benchmark.pct + qingan.rate.spreadPct - base) < 1e-9,
    'baseRatePct = benchmark + spread',
  );
});

test('qingan.json：timeline 每筆有 source 或 sourceUrl', () => {
  for (const t of qingan.timeline) {
    assert.ok(t.source || t.sourceUrl, `no source at ${t.date}`);
    if (t.source)
      assert.ok(qingan.sources[t.source], `unknown source key ${t.source}`);
    if (t.sourceUrl) assert.match(t.sourceUrl, /^https:\/\//);
  }
  assert.equal(
    new Set(qingan.timeline.map((t) => t.date)).size,
    qingan.timeline.length,
    'EN_DATA 以日期為鍵，日期不可重複',
  );
  assert.ok(
    qingan.scale.nplPct.source in qingan.sources,
    'nplPct.source 指到 sources 表',
  );
});

/** 文字裡的數字（含萬、億換算）。回傳 { raw: Set, big: [ {raw, vals:Set} ] } */
function numTokens(text) {
  const items = [];
  const push = (rawStr, vals) =>
    items.push({ rawStr, vals: vals.map((v) => +v.toFixed(4)) });
  for (const m of text.matchAll(
    /(\d[\d,]*(?:\.\d+)?)\s*億\s*(\d[\d,]*(?:\.\d+)?)\s*萬/g,
  ))
    push('compound', [
      +m[1].replace(/,/g, '') * 1e8 + +m[2].replace(/,/g, '') * 1e4,
    ]);
  for (const m of text.matchAll(
    /(\d[\d,]*(?:\.\d+)?)\s*(萬|億|兆|million|billion)?/g,
  )) {
    const v = +m[1].replace(/,/g, '');
    const mult =
      { 萬: 1e4, 億: 1e8, 兆: 1e12, million: 1e6, billion: 1e9 }[m[2]] ?? 1;
    push(m[1], mult === 1 ? [v] : [v, v * mult]);
  }
  return items;
}
function assertNumbersCovered(enText, zhText, where) {
  const zhVals = new Set(numTokens(zhText).flatMap((t) => t.vals));
  for (const t of numTokens(enText)) {
    const significant =
      t.rawStr.replace(/\D/g, '').length >= 3 || /[.,]/.test(t.rawStr);
    if (!significant) continue;
    assert.ok(
      t.vals.some((v) => zhVals.has(v)),
      `${where}: 英文數字 ${t.rawStr} 沒有出現在中文原文\n  en: ${enText}\n  zh: ${zhText}`,
    );
  }
}

test('EN_DATA：鍵對得到資料檔，英文數字都出現在中文原文', () => {
  const ids = (a) => a.map((x) => x.id).sort();
  assert.deepEqual(Object.keys(EN_DATA.naming).sort(), ids(qingan.naming));
  assert.deepEqual(
    Object.keys(EN_DATA.generations).sort(),
    ids(qingan.generations),
  );
  for (const g of qingan.generations) {
    const fields = Object.keys(g).filter((k) => k !== 'id');
    assert.deepEqual(
      Object.keys(EN_DATA.generations[g.id]).sort(),
      fields.sort(),
      `generation ${g.id}`,
    );
    for (const f of fields)
      assertNumbersCovered(
        EN_DATA.generations[g.id][f],
        g[f],
        `generation ${g.id}.${f}`,
      );
  }
  for (const c of timeline.cycles) {
    assert.ok(EN_DATA.cycleRise[c.id], `cycleRise ${c.id}`);
    const src = `${c.rise.value ?? ''} ${c.rise.note ?? ''}`;
    assertNumbersCovered(EN_DATA.cycleRise[c.id], src, `cycleRise ${c.id}`);
    if (c.rise.value !== null) {
      assert.ok(EN_DATA.cycleNote[c.id] || !c.rise.note, `cycleNote ${c.id}`);
      if (EN_DATA.cycleNote[c.id])
        assertNumbersCovered(
          EN_DATA.cycleNote[c.id],
          c.rise.note,
          `cycleNote ${c.id}`,
        );
    }
  }
  assert.deepEqual(
    Object.keys(EN_DATA.timeline).sort(),
    qingan.timeline.map((t) => t.date).sort(),
  );
  for (const t of qingan.timeline)
    assertNumbersCovered(
      EN_DATA.timeline[t.date],
      t.event,
      `timeline ${t.date}`,
    );
  assert.equal(EN_DATA.open.length, qingan.openQuestions.length);
  EN_DATA.open.forEach((x, i) =>
    assertNumbersCovered(x, qingan.openQuestions[i], `open[${i}]`),
  );
  assertNumbersCovered(EN_DATA.rateNote, qingan.rate.note, 'rateNote');
  assertNumbersCovered(
    EN_DATA.scaleNote,
    qingan.scale.v2Approx.note,
    'scaleNote',
  );
  assertNumbersCovered(
    EN_DATA.benchName,
    qingan.rate.benchmark.name,
    'benchName',
  );
  for (const [k, v] of Object.entries(EN_DATA.hosts))
    assert.match(k, /\./) && assert.ok(v);
  const allQuotes = positions.actors.flatMap((a) => a.quotes);
  for (const [key, text] of Object.entries(EN_DATA.quotes)) {
    const hit = allQuotes.find((q) =>
      q.text.replace(/[，。、：；「」『』\s]/g, '').startsWith(key),
    );
    assert.ok(hit, `EN_DATA.quotes key 對不到引語: ${key}`);
    assert.ok(hit.verbatim, `quote ${key} 要是逐字引語`);
    assertNumbersCovered(text, hit.text, `quote ${key}`);
  }
  for (const k of Object.keys(EN_DATA.who))
    assert.ok(
      positions.surveys.some((s) => s.who === k),
      `who ${k}`,
    );
  for (const k of Object.keys(EN_DATA.surveyDate))
    assert.ok(
      positions.surveys.some((s) => s.date === k),
      `surveyDate ${k}`,
    );
});

// ── 6. positions.json 與薄殼 ────────────────────────────────────────

test('positions.json：每個 verbatim 引語有 https 來源網址', () => {
  let n = 0;
  for (const a of positions.actors)
    for (const q of a.quotes) {
      assert.ok(q.speaker && q.date && q.text, `quote of ${a.id} incomplete`);
      if (q.verbatim === true) {
        n += 1;
        assert.match(
          q.source?.url ?? '',
          /^https:\/\//,
          `${a.id}: ${q.text.slice(0, 20)}`,
        );
        assert.ok(q.source.publisher, `${a.id} quote has no publisher`);
      }
    }
  assert.ok(n > 0);
  for (const i of positions.issues)
    for (const c of i.cells)
      assert.match(
        c.source?.url ?? '',
        /^https:\/\//,
        `cell ${i.id}/${c.actor}`,
      );
  for (const s of positions.surveys)
    assert.match(s.source?.url ?? '', /^https:\/\//);
  assert.ok(positions.coverageNote.zh && positions.coverageNote.en);
});

test('13 語 × 2 頁薄殼共 26 個，import 的模板存在；各方立場頁選前沒有薄殼', () => {
  const langs = [
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
  let count = 0;
  for (const L of langs)
    for (const page of ['history', 'qingan']) {
      const file = join(ROOT, 'src/pages', L, 'housing', page, 'index.astro');
      assert.ok(existsSync(file), `missing ${file}`);
      const src = readFileSync(file, 'utf8');
      assert.equal(
        src.trim().split('\n').length,
        5,
        `${file} should be a 5-line shell`,
      );
      const m = src.match(/from '([^']+)'/);
      assert.ok(
        m && m[1].endsWith(`housing-${page}.template.astro`),
        `${file} imports ${m?.[1]}`,
      );
      assert.ok(
        existsSync(resolve(dirname(file), m[1])),
        `${file}: template not found`,
      );
      count += 1;
    }
  assert.equal(count, 26);
  // 各方立場頁選前不公開：頁面檔只要在 src/pages 底下就會被建出來、網址打得到
  for (const L of langs)
    assert.ok(
      !existsSync(join(ROOT, 'src/pages', L, 'housing', 'positions')),
      `${L || 'zh'} 不該有 /housing/positions/ 薄殼`,
    );
});
