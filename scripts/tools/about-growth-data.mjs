#!/usr/bin/env node
/**
 * about-growth-data.mjs — 關於頁展間用的成長資料（src/data/about/growth.json）
 *
 * 誕生 2026-11-19（關於頁策展，reports/design-about-curation-2026-11-19.md §8）。
 * 「貳　第一個週末」那一間的曲線要真資料：開站頭幾天每天的中文篇數、GitHub 星數、
 * git 作者人數。站上沒有這幾條的歷史紀錄（dashboard 的 JSON 只有當下一個數字），
 * 這支從 git 與 GitHub 算出來，寫成一份可以提交、可以重現的 JSON。
 *
 * 不進每次建置：星數要網路與 gh 登入，建置環境不一定有。手動或資料刷新流程跑：
 *
 *   node scripts/tools/about-growth-data.mjs            # 有 gh 就更新星數，沒有就保留舊值
 *   node scripts/tools/about-growth-data.mjs --no-stars # 只重算 git 的部分
 *   node scripts/tools/about-growth-data.mjs --ref origin/main
 *
 * 口徑（頁面圖說照這裡寫）：
 *   - 日界：台北時間（+0800）當天 23:59:59。
 *   - 中文篇數：當天最後一個 commit 的檔案樹裡 knowledge/<14 個分類>/*.md，
 *     排除 _ 開頭（同 dashboard-vitals 的 totalArticles 算法，11/19 = 1,189）。
 *   - git 作者：作者名（套 .mailmap）第一次出現的日期累計，不含機器帳號
 *     （[bot]、Claude、Taiwan.md 系列、github-actions）。git 作者不等於人。
 *   - 合併：當天的 merge commit 數（git log --merges，作者日期）。
 *   - 星數：GitHub stargazers API 的 starred_at 依日累計。只有「現在還按著星」的人，
 *     取消過的人不在裡面，所以會比當時實際的數字略少（時間軸 3/24 寫 837，這裡 825）。
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../..',
);
const OUT = path.join(ROOT, 'src/data/about/growth.json');
const REPO = 'frank890417/taiwan-md';
const FIRST_DAY = '2026-03-17';
const LAST_DAY = '2026-03-31'; // 三月逐日；之後的展間要月資料時再加
const CATS =
  'About Art Culture Economy Food Geography History Lifestyle Music Nature People Politics Society Technology'.split(
    ' ',
  );
const BOT =
  /\[bot\]$|^Claude$|^Taiwan\.md\b|^github-actions|dependabot|copilot/i;

const args = process.argv.slice(2);
const refIdx = args.indexOf('--ref');
const REF = refIdx >= 0 ? args[refIdx + 1] : 'HEAD';
const SKIP_STARS = args.includes('--no-stars');

const git = (...a) =>
  execFileSync('git', ['-C', ROOT, ...a], {
    encoding: 'utf8',
    maxBuffer: 512 * 1024 * 1024,
  });

/** ISO 時間 → 台北日期 YYYY-MM-DD */
const tpeDay = (iso) =>
  new Date(Date.parse(iso) + 8 * 3600_000).toISOString().slice(0, 10);

const days = [];
for (
  let d = new Date(`${FIRST_DAY}T00:00:00Z`);
  d <= new Date(`${LAST_DAY}T00:00:00Z`);
  d = new Date(d.getTime() + 86_400_000)
) {
  days.push(d.toISOString().slice(0, 10));
}

// ── 中文篇數（每天最後一個 commit 的檔案樹） ──
const catRe = new RegExp(`^knowledge/(${CATS.join('|')})/[^/]+\\.md$`);
const zhArticles = {};
for (const day of days) {
  const c = git('rev-list', '-1', `--before=${day} 23:59:59 +0800`, REF).trim();
  if (!c) {
    zhArticles[day] = null;
    continue;
  }
  const names = git('ls-tree', '-r', '--name-only', c).split('\n');
  zhArticles[day] = names.filter(
    (n) => catRe.test(n) && !path.basename(n).startsWith('_'),
  ).length;
}

// ── git 作者（第一次出現日累計）與每天的 merge commit ──
const firstSeen = new Map();
for (const line of git('log', '--reverse', '--format=%aN\t%aI', REF).split(
  '\n',
)) {
  if (!line) continue;
  const [name, iso] = line.split('\t');
  if (BOT.test(name) || firstSeen.has(name)) continue;
  firstSeen.set(name, tpeDay(iso));
}
const mergesPerDay = {};
for (const iso of git(
  'log',
  '--merges',
  '--format=%aI',
  `--since=${FIRST_DAY} 00:00:00 +0800`,
  `--until=${LAST_DAY} 23:59:59 +0800`,
  REF,
).split('\n')) {
  if (!iso) continue;
  const d = tpeDay(iso);
  mergesPerDay[d] = (mergesPerDay[d] || 0) + 1;
}

const firstCommitIso = git('log', '--reverse', '--format=%aI', REF)
  .split('\n')[0]
  .trim();

// ── 星數（gh 可用才更新；否則保留舊值） ──
let prev = null;
try {
  prev = JSON.parse(fs.readFileSync(OUT, 'utf8'));
} catch {
  prev = null;
}
let stars = prev?.stars ?? null;
if (!SKIP_STARS) {
  try {
    const raw = execFileSync(
      'gh',
      [
        'api',
        '--paginate',
        '-H',
        'Accept: application/vnd.github.star+json',
        `repos/${REPO}/stargazers?per_page=100`,
        '--jq',
        '.[].starred_at',
      ],
      { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 },
    );
    const at = raw.split('\n').filter(Boolean).map(tpeDay).sort();
    const daily = {};
    for (const day of days) daily[day] = at.filter((d) => d <= day).length;
    stars = {
      fetchedAt: new Date().toISOString(),
      total: at.length,
      daily,
    };
    console.log(`[stars] gh 取得 ${at.length} 筆 starred_at`);
  } catch (e) {
    console.warn(
      `[stars] gh 無法使用，保留舊值（${stars ? stars.fetchedAt : '沒有舊值'}）：${String(e.message).split('\n')[0]}`,
    );
  }
}

const today = tpeDay(new Date().toISOString());
const out = {
  asOf: today,
  generatedBy: 'scripts/tools/about-growth-data.mjs',
  ref: `${REF}@${git('rev-parse', '--short=10', REF).trim()}`,
  firstCommit: firstCommitIso,
  notes: {
    dayBoundary: '台北時間（+0800）當天 23:59:59',
    zhArticles:
      'knowledge/<14 分類>/*.md，排除 _ 開頭，當天最後一個 commit 的檔案樹',
    gitAuthors:
      '作者名（套 .mailmap）第一次出現日累計，不含機器帳號；git 作者不等於人',
    merges: '當天的 merge commit 數',
    stars: 'GitHub stargazers API 的 starred_at 依日累計；只含現在仍按著星的人',
  },
  daily: days.map((day) => ({
    date: day,
    zhArticles: zhArticles[day],
    gitAuthors: [...firstSeen.values()].filter((d) => d <= day).length,
    merges: mergesPerDay[day] || 0,
    stars: stars?.daily?.[day] ?? null,
  })),
  // 逐日星數也存一份在這裡：下次沒有 gh 時，從這裡保留舊值
  stars: stars
    ? { fetchedAt: stars.fetchedAt, total: stars.total, daily: stars.daily }
    : null,
};

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(out, null, 2) + '\n');
console.log(`寫入 ${path.relative(ROOT, OUT)}（asOf ${today}）`);
for (const r of out.daily.slice(0, 8))
  console.log(
    `  ${r.date}  篇 ${r.zhArticles}  星 ${r.stars}  作者 ${r.gitAuthors}  合併 ${r.merges}`,
  );
