#!/usr/bin/env node
// verify-build-deps.mjs — 驗證「頁面輸入帳」準不準。
//
// 帳（TWMD_DEPS_OUT，src/utils/build-deps.ts 產的）說每一頁讀了哪些輸入。這支工具回答：
// 「帳預測會變的頁」跟「實際變了的頁」差多少。做法是拿兩個內容狀態（A、B）各建一次，
// 比對輸入與輸出。完整流程見 reports/incremental-build-prep-2026-11-28.md。
//
// 三個子指令：
//   inputs  <outDir>                  在目前的 repo 狀態拍一張「輸入快照」：整個 repo 的檔案雜湊
//                                      ＋所有小於 40MB 的 JSON 副本（逐筆比對 `檔#鍵` 要用）。
//                                      要在每個狀態 prebuild 之後、換狀態之前跑。
//   outputs <distDir> <out.json>      把 dist 每個檔案的雜湊寫成清單。HTML 內的 /_astro/*.css
//                                      檔名先正規化（檔名會隨分組變，不是內容變）。
//   compare [選項]                    用上面的快照與清單算四個數字（見 --help）。
//
// compare 選項：
//   --a-inputs DIR  --b-inputs DIR     狀態 A、B（B1）的輸入快照
//   --b2-inputs DIR                    （選用）B2 的輸入快照，用來找「同一份原始碼也會變」的輸入
//   --a-out F --b-out F --b2-out F     A、B1、B2 的輸出清單；B1 與 B2 的差異＝雜訊基準
//   --ledger F                         狀態 B 的帳（用來預測）
//   --ledger-a F                       （選用）狀態 A 的帳；報告「用 A 的帳」與「A、B 帳的聯集」
//   --dist-a DIR --dist-b DIR          （選用）兩份 dist，漏報時印出第一處差異
//   --show N                           漏報最多印 N 筆細節（預設 25）
//   --json F                           把結果寫成 JSON
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { createHash } from 'node:crypto';
import { execFileSync, spawnSync } from 'node:child_process';
import { dirname, join, relative, sep } from 'node:path';
import { cardDigest } from '../../src/utils/article-summary-core.mjs';

const [cmd, ...rest] = process.argv.slice(2);

// ── 共用 ────────────────────────────────────────────────────────────────────
const nfc = (s) => s.normalize('NFC');
const sha1 = (buf) => createHash('sha1').update(buf).digest('hex');
const md5 = (buf) => createHash('md5').update(buf).digest('hex');

function* walk(dir, skip, base = dir) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    const rel = relative(base, p).split(sep).join('/');
    if (e.isDirectory()) {
      if (skip(rel, e.name)) continue;
      yield* walk(p, skip, base);
    } else if (e.isFile()) {
      yield [p, nfc(rel)];
    } else if (e.isSymbolicLink()) {
      let st;
      try {
        st = statSync(p);
      } catch {
        continue;
      }
      if (st.isFile()) yield [p, nfc(rel)];
    }
  }
}

// ── inputs ──────────────────────────────────────────────────────────────────
function cmdInputs(outDir) {
  const root = process.cwd();
  const SKIP = new Set([
    'node_modules',
    'dist',
    '.git',
    '.shards',
    '.astro',
    '.astro-cache',
    '.claude',
    '.vite',
  ]);
  const hashes = {};
  // 文章「卡片欄位」指紋（src/utils/article-summary-core.mjs，跟 buildIndex 同一份定義）：
  // 帳裡的 `檔.md#summary` 記號用它判斷「這篇對索引／卡片的影響有沒有變」。
  const summaries = {};
  let jsonCopied = 0;
  mkdirSync(join(outDir, 'json'), { recursive: true });
  for (const [abs, rel] of walk(root, (_r, name) => SKIP.has(name))) {
    const buf = readFileSync(abs);
    hashes[rel] = sha1(buf);
    if (rel.startsWith('knowledge/') && rel.endsWith('.md'))
      summaries[rel] = md5(cardDigest(buf.toString('utf8')));
    if (
      rel.endsWith('.json') &&
      buf.length < 40e6 &&
      /^(public|src|config|data)\//.test(rel)
    ) {
      const dst = join(outDir, 'json', rel);
      mkdirSync(dirname(dst), { recursive: true });
      copyFileSync(abs, dst);
      jsonCopied++;
    }
  }
  writeFileSync(join(outDir, 'inputs.json'), JSON.stringify(hashes));
  writeFileSync(join(outDir, 'summaries.json'), JSON.stringify(summaries));
  console.log(
    `[inputs] ${Object.keys(hashes).length} 個檔的雜湊、${jsonCopied} 份 JSON 副本 → ${outDir}`,
  );
}

// ── summaries-from-git：不經檔案系統，直接從某個 commit 的樹算卡片指紋 ──────────
// 補拍用：快照當時沒有 summaries.json 時，用建置那個狀態對應的 commit 重算（只看 knowledge/*.md）。
function cmdSummariesFromGit(rev, outDir) {
  const names = execFileSync(
    'git',
    ['ls-tree', '-r', '--name-only', '-z', rev, '--', 'knowledge'],
    {
      maxBuffer: 1 << 28,
    },
  )
    .toString('utf8')
    .split('\0')
    .filter((n) => n.endsWith('.md'));
  const input = names.map((n) => `${rev}:${n}`).join('\n') + '\n';
  const r = spawnSync('git', ['cat-file', '--batch'], {
    input,
    maxBuffer: 2 ** 31 - 1,
  });
  const buf = r.stdout;
  const summaries = {};
  let pos = 0;
  for (const n of names) {
    const nl = buf.indexOf(10, pos);
    const header = buf.subarray(pos, nl).toString('utf8').split(' ');
    const size = Number(header[2]);
    const body = buf.subarray(nl + 1, nl + 1 + size);
    summaries[nfc(n)] = md5(cardDigest(body.toString('utf8')));
    pos = nl + 1 + size + 1;
  }
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, 'summaries.json'), JSON.stringify(summaries));
  console.log(
    `[summaries-from-git] ${rev} ${Object.keys(summaries).length} 篇 → ${outDir}`,
  );
}

// ── outputs ─────────────────────────────────────────────────────────────────
// 樣式表檔名（/_astro/xxx.<hash>.css）會因為建置分組而變，不代表頁面內容變了。
const CSS_NAME = /\/_astro\/[\w.@~+-]+?\.css/g;
// 房屋工具（src/utils/housing/uid.ts）的 id 流水號跟「這個行程已經渲染過幾次」有關，
// 同一份原始碼，頁面渲染順序一變編號就變（hst-qe7 ↔ hst-qe8）。只在 hst- 開頭的 id 上正規化。
const HST_UID = /\b(hst-[a-z]{1,3})\d+/g;
const normHtml = (t) =>
  t.replace(CSS_NAME, '/_astro/_.css').replace(HST_UID, '$1#');
function cmdOutputs(dist, out) {
  const h = {};
  for (const [abs, rel] of walk(dist, (r) => r === '.prerender')) {
    let buf = readFileSync(abs);
    if (rel.endsWith('.html')) {
      buf = Buffer.from(normHtml(buf.toString('utf8')), 'utf8');
    }
    h[rel] = md5(buf);
  }
  writeFileSync(out, JSON.stringify(h));
  console.log(`[outputs] ${Object.keys(h).length} 個檔 → ${out}`);
}

// ── compare ─────────────────────────────────────────────────────────────────
function parseOpts(argv) {
  const o = {};
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith('--')) ((o[argv[i].slice(2)] = argv[i + 1]), i++);
  }
  return o;
}
const loadJson = (f) => JSON.parse(readFileSync(f, 'utf8'));

/** 一個輸入快照：檔案雜湊＋資料夾清單＋JSON 副本的快取 */
function loadState(dir) {
  const hashes = loadJson(join(dir, 'inputs.json'));
  const summaries = existsSync(join(dir, 'summaries.json'))
    ? loadJson(join(dir, 'summaries.json'))
    : {};
  const listing = new Map(); // dir -> Set(直接子項名)
  const add = (d, name) => {
    if (!listing.has(d)) listing.set(d, new Set());
    listing.get(d).add(name);
  };
  for (const rel of Object.keys(hashes)) {
    const parts = rel.split('/');
    for (let i = 0; i < parts.length; i++)
      add(parts.slice(0, i).join('/'), parts[i]);
  }
  const jsonCache = new Map();
  return {
    hashes,
    summaries,
    listing,
    json(rel) {
      if (jsonCache.has(rel)) return jsonCache.get(rel);
      const f = join(dir, 'json', rel);
      let v;
      try {
        v = existsSync(f) ? JSON.parse(readFileSync(f, 'utf8')) : undefined;
      } catch {
        v = undefined;
      }
      jsonCache.set(rel, v);
      return v;
    },
  };
}

const getDot = (obj, path) =>
  path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj);

function fragmentValue(state, rel, fragJson) {
  const root = state.json(rel);
  if (root === undefined) return { missing: true };
  let v = root;
  for (const part of JSON.parse(fragJson)) {
    if (v == null) return { value: undefined };
    if (typeof part === 'string') v = v[part];
    else if (Array.isArray(v))
      v = v.filter((e) => getDot(e, part.p) === part.v);
    else return { value: undefined };
  }
  return { value: JSON.stringify(v ?? null) };
}

const mdKids = (state, dir) =>
  [...(state.listing.get(dir) ?? [])].some(
    (n) =>
      n.endsWith('.md') &&
      !n.startsWith('_') &&
      state.hashes[`${dir}/${n}`] !== undefined,
  );

/** 兩個狀態之間，一個輸入記號有沒有變。回 true / false / 'unknown'（保守視為變）。 */
function makeChangeTester(A, B, groups, ignore = new Set()) {
  const fileChanged = (rel) =>
    !ignore.has(rel) && A.hashes[rel] !== B.hashes[rel];
  const memo = new Map();
  const seen = new Set();
  const test = (dep) => {
    if (memo.has(dep)) return memo.get(dep);
    let r;
    if (dep.startsWith('@group:')) {
      if (seen.has(dep)) return false; // 群組互相引用的環
      seen.add(dep);
      const items = groups.get(dep);
      r =
        items === undefined ? 'unknown' : items.some((d) => test(d) !== false);
      seen.delete(dep);
    } else if (dep.startsWith('@dir:')) {
      const d = dep.slice(5);
      const a = [...(A.listing.get(d) ?? [])].sort().join('\0');
      const b = [...(B.listing.get(d) ?? [])].sort().join('\0');
      r = a !== b;
    } else if (dep.startsWith('@nonempty-md:')) {
      const d = dep.slice('@nonempty-md:'.length);
      r = mdKids(A, d) !== mdKids(B, d);
    } else if (dep.startsWith('@')) {
      r = 'unknown';
    } else {
      const i = dep.indexOf('#');
      if (i < 0) r = fileChanged(dep);
      else if (dep.slice(i + 1) === 'summary') {
        const rel = dep.slice(0, i);
        r = (A.summaries[rel] ?? 'absent') !== (B.summaries[rel] ?? 'absent');
      } else {
        const rel = dep.slice(0, i);
        if (!fileChanged(rel)) r = false;
        else {
          const a = fragmentValue(A, rel, dep.slice(i + 1));
          const b = fragmentValue(B, rel, dep.slice(i + 1));
          r = a.missing || b.missing ? true : a.value !== b.value;
        }
      }
    }
    if (!dep.startsWith('@group:')) memo.set(dep, r);
    return r;
  };
  return test;
}

const pageToFile = (p) => {
  if (p === '/404/') return '404.html';
  const d = nfc(p).replace(/^\//, '');
  if (p.endsWith('/')) return `${d}index.html`;
  return d;
};

function firstDiff(fa, fb) {
  let a, b;
  try {
    a = readFileSync(fa, 'utf8');
    b = readFileSync(fb, 'utf8');
  } catch (e) {
    return `(讀不到：${e.message})`;
  }
  a = normHtml(a);
  b = normHtml(b);
  let i = 0;
  while (i < a.length && i < b.length && a[i] === b[i]) i++;
  let j = 0;
  while (
    j < a.length - i &&
    j < b.length - i &&
    a[a.length - 1 - j] === b[b.length - 1 - j]
  )
    j++;
  const cut = (s) =>
    JSON.stringify(
      s.slice(Math.max(0, i - 40), s.length - j + 40).slice(0, 260),
    );
  return `\n      A: ${cut(a)}\n      B: ${cut(b)}`;
}

function cmdCompare(argv) {
  const o = parseOpts(argv);
  const show = Number(o.show ?? 25);
  const A = loadState(o['a-inputs']);
  const B = loadState(o['b-inputs']);
  const outA = loadJson(o['a-out']);
  const outB = loadJson(o['b-out']);
  const outB2 = o['b2-out'] ? loadJson(o['b2-out']) : null;
  const ledgerB = loadJson(o.ledger);
  const ledgerA = o['ledger-a'] ? loadJson(o['ledger-a']) : null;

  // ── 實際變了的檔 ──
  const allFiles = new Set([...Object.keys(outA), ...Object.keys(outB)]);
  const changed = new Set();
  const noisy = new Set();
  for (const f of allFiles) {
    if (outA[f] === outB[f]) continue;
    if (outB2 && outB[f] !== outB2[f]) noisy.add(f);
    else changed.add(f);
  }
  if (outB2)
    for (const f of Object.keys(outB)) if (outB[f] !== outB2[f]) noisy.add(f);

  const pagesOf = (ledger) =>
    Object.keys(ledger).filter((k) => k.startsWith('/'));
  const groupsOf = (ledger) =>
    new Map(
      Object.keys(ledger)
        .filter((k) => k.startsWith('@group:'))
        .map((k) => [k, ledger[k]]),
    );

  // ── 頁面 ↔ 輸出檔 對帳 ──
  const pagesB = pagesOf(ledgerB);
  // macOS 的檔案系統不分大小寫：/economy/pinkoi/（別名頁）與 /economy/Pinkoi/（真文章）
  // 會寫進同一個資料夾。CI 是 Linux 不會撞；這裡用小寫對照，撞到的頁都算指向同一個檔。
  const lowerOut = new Map(Object.keys(outB).map((f) => [f.toLowerCase(), f]));
  const resolveFile = (p) => {
    const f = pageToFile(p);
    return f in outB ? f : (lowerOut.get(f.toLowerCase()) ?? f);
  };
  const fileOfPage = new Map(pagesB.map((p) => [p, resolveFile(p)]));
  const pageOfFile = new Map(); // 檔 -> [頁…]
  for (const [p, f] of fileOfPage) {
    if (!pageOfFile.has(f)) pageOfFile.set(f, []);
    pageOfFile.get(f).push(p);
  }
  const ledgerNoFile = pagesB.filter((p) => !(fileOfPage.get(p) in outB));
  const htmlNoLedger = Object.keys(outB).filter(
    (f) =>
      (f.endsWith('.html') || f.endsWith('.md') || f.endsWith('.xml')) &&
      !pageOfFile.has(f),
  );

  const actualPages = new Set();
  const nonPageChanged = [];
  for (const f of changed) {
    const ps = pageOfFile.get(f);
    if (ps) for (const p of ps) actualPages.add(p);
    else nonPageChanged.push(f);
  }
  const noisyPages = new Set(
    [...noisy].flatMap((f) => pageOfFile.get(f) ?? []),
  );

  // ── 預測 ──
  function predict(ledger, label, onlyFine = false, ignore = new Set()) {
    const test = makeChangeTester(A, B, groupsOf(ledger), ignore);
    // 帳裡任何一頁有逐筆記帳（file#鍵）的檔＝已有精準記帳，靜態 import 的整檔記號對它不算數
    const fineGlobal = new Set();
    for (const p of pagesOf(ledger))
      for (const d of ledger[p])
        if (d.includes('#') && !d.startsWith('@'))
          fineGlobal.add(d.slice(0, d.indexOf('#')));
    const testStatic = (dep, led, fine) => {
      const items = led[dep];
      if (!Array.isArray(items)) return 'unknown'; // 這個路由沒有靜態 import 清單，保守視為變
      return items.some(
        (f) => !fineGlobal.has(f) && !fine.has(f) && test(f) !== false,
      );
    };
    const predicted = new Set();
    const trigger = new Map(); // 記號 -> 因它被預測的頁數
    const unknown = new Set();
    const hitsOf = new Map(); // 頁 -> 命中的記號
    for (const p of pagesOf(ledger)) {
      const hits = [];
      // 這一頁有逐筆記帳（file#鍵）的檔，整檔的靜態 import 記號不再算數
      const fine = new Set(
        ledger[p]
          .filter((d) => d.includes('#'))
          .map((d) => d.slice(0, d.indexOf('#'))),
      );
      for (const dep of ledger[p]) {
        if (onlyFine && (dep.startsWith('@group:') || dep.startsWith('@dir:')))
          continue;
        const r = dep.startsWith('@group:static:')
          ? testStatic(dep, ledger, fine)
          : test(dep);
        if (r === 'unknown') unknown.add(dep);
        if (r !== false) {
          hits.push(dep);
          trigger.set(dep, (trigger.get(dep) ?? 0) + 1);
        }
      }
      if (hits.length) {
        predicted.add(p);
        hitsOf.set(p, hits);
      }
    }
    return { label, predicted, trigger, unknown, hitsOf };
  }

  const resB = predict(ledgerB, '用 B 的帳');
  const resBfine = predict(ledgerB, '用 B 的帳（略過 @group/@dir）', true);
  const resA = ledgerA ? predict(ledgerA, '用 A 的帳') : null;
  // 每次 prebuild 都會變的輸入（B1 vs B2 的快照不同；同一份原始碼也會變，例如儀表板的時間戳）。
  // 這一組「假設它們是決定性的」只用來看精準度的上限，不是可採用的預測（它們也可能真的有內容變動）。
  const B2s = o['b2-inputs'] ? loadState(o['b2-inputs']) : null;
  const noiseInputs = new Set(
    B2s
      ? Object.keys({ ...B.hashes, ...B2s.hashes }).filter(
          (r) => B.hashes[r] !== B2s.hashes[r] && !r.startsWith('src/content/'),
        )
      : [],
  );
  const resBnn = B2s
    ? predict(
        ledgerB,
        `用 B 的帳（假設 ${noiseInputs.size} 個每次 prebuild 都會變的輸入檔不算變動）`,
        false,
        noiseInputs,
      )
    : null;

  const evalOne = (res) => {
    const evalPred = new Set(
      [...res.predicted].filter((p) => !noisyPages.has(p)),
    );
    const miss = [...actualPages].filter((p) => !res.predicted.has(p));
    const extra = [...evalPred].filter((p) => !actualPages.has(p));
    return { miss, extra, evalPred };
  };

  const report = {};
  const line = (s = '') => console.log(s);
  line(
    `輸出：A ${Object.keys(outA).length} 檔、B ${Object.keys(outB).length} 檔`,
  );
  line(
    `雜訊基準（B1 vs B2 內容不同）：${noisy.size} 個檔（其中頁面 ${noisyPages.size} 頁）`,
  );
  line(
    `A→B 實際變了（扣掉雜訊）：${changed.size} 個檔＝頁面 ${actualPages.size} 頁＋非頁面檔 ${nonPageChanged.length} 個`,
  );
  line(
    `帳 vs 輸出對帳：帳裡有、dist 沒有的頁 ${ledgerNoFile.length}；dist 有 .html/.md/.xml、帳沒有的 ${htmlNoLedger.length}`,
  );
  if (ledgerNoFile.length)
    line(`  帳有 dist 沒有（前 8）：${ledgerNoFile.slice(0, 8).join(' | ')}`);
  if (htmlNoLedger.length)
    line(`  dist 有帳沒有（前 8）：${htmlNoLedger.slice(0, 8).join(' | ')}`);

  for (const res of [
    resB,
    resBfine,
    ...(resBnn ? [resBnn] : []),
    ...(resA ? [resA] : []),
  ]) {
    const e = evalOne(res);
    report[res.label] = {
      predicted: res.predicted.size,
      miss: e.miss.length,
      extra: e.extra.length,
    };
    line('');
    line(`── ${res.label} ──`);
    line(
      `  實際變了 ${actualPages.size}｜預測 ${res.predicted.size}（扣雜訊頁後 ${e.evalPred.size}）｜漏報 ${e.miss.length}｜多報 ${e.extra.length}`,
    );
    if (res.unknown.size)
      line(`  無法判斷、保守視為變的記號：${[...res.unknown].join(', ')}`);
    if (res === resB) {
      const top = [...res.trigger.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 12);
      line('  讓最多頁被預測的記號（記號：頁數）：');
      for (const [d, n] of top) line(`    ${n}\t${d.slice(0, 150)}`);
    }
  }

  const eB = evalOne(resB);
  {
    const byTrig = new Map();
    for (const p of eB.extra) {
      const hs = resB.hitsOf.get(p) ?? [];
      for (const h of hs) {
        if (!byTrig.has(h)) byTrig.set(h, []);
        byTrig.get(h).push(p);
      }
    }
    line('');
    line(`── 多報的頁是被哪些記號帶進來的（記號：多報頁數｜例）──`);
    for (const [h, ps] of [...byTrig.entries()]
      .sort((a, b) => b[1].length - a[1].length)
      .slice(0, 18))
      line(`  ${ps.length}\t${h.slice(0, 110)}｜${ps.slice(0, 2).join(' ')}`);
    report.extraPages = eB.extra;
  }
  line('');
  line(`── 漏報明細（用 B 的帳；共 ${eB.miss.length}）──`);
  for (const p of eB.miss.slice(0, show)) {
    const deps = ledgerB[p];
    line(
      `  ${p}  （帳 ${deps.length} 筆：${deps.slice(0, 6).join(' , ').slice(0, 220)}）`,
    );
    if (o['dist-a'] && o['dist-b'])
      line(
        '    ' +
          firstDiff(
            join(o['dist-a'], fileOfPage.get(p)),
            join(o['dist-b'], fileOfPage.get(p)),
          ),
      );
  }
  if (nonPageChanged.length) {
    line('');
    line(`── 實際變了但不是頁面的檔（前 15／${nonPageChanged.length}）──`);
    for (const f of nonPageChanged.slice(0, 15)) line(`  ${f}`);
  }

  // 輸入側：變了哪些檔
  const changedInputs = Object.keys({ ...A.hashes, ...B.hashes }).filter(
    (r) => A.hashes[r] !== B.hashes[r],
  );
  line('');
  line(`A→B 輸入檔有差異：${changedInputs.length} 個`);
  report.changedInputs = changedInputs.length;
  report.actualPages = actualPages.size;
  report.noisyFiles = noisy.size;
  report.misses = eB.miss;
  if (o.json) writeFileSync(o.json, JSON.stringify(report, null, 1));
}

if (cmd === 'inputs') cmdInputs(rest[0]);
else if (cmd === 'summaries-from-git') cmdSummariesFromGit(rest[0], rest[1]);
else if (cmd === 'outputs') cmdOutputs(rest[0], rest[1]);
else if (cmd === 'compare') cmdCompare(rest);
else {
  console.error(
    '用法：verify-build-deps.mjs inputs <outDir> | outputs <dist> <out.json> | compare --a-inputs … （見檔頭）',
  );
  process.exit(2);
}
