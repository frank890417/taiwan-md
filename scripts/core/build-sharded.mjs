#!/usr/bin/env node
// build-sharded.mjs — 把 `astro build` 切成 N 份同時跑，最後併回一份 dist。
//
// 為什麼：astro 產靜態頁幾乎只用一顆核心（2026-11-28 量測，
// reports/cicd-speed-evaluation-2026-11-28.md §2.6、§三之 B1），CI runner 有 4 顆。
// 把 13 個語言分到 N 個行程，各建自己的頁，牆鐘時間接近「最慢的那一份」。
//
// 怎麼切：頁面由 src/pages/ 的目錄決定。每一份有自己的「影子根目錄」
// .shards/s<k>/：除了 src/pages 之外全部是指回 repo 的符號連結，src/pages 只放
// 這一份負責的頂層項目。第 0 份＝中文與所有不分語言的頁；其餘各份＝若干語言目錄。
// 不改任何頁面檔。
//
// 併回：各份的 dist 逐檔搬進 ./dist（同名檔必須內容相同，否則報錯）。
// sitemap 需要看到全站的頁才配得出各語言互連，所以各份只記下自己產了哪些頁，
// 併完之後用 astro.config.mjs 裡同一個 @astrojs/sitemap 設定對全部頁產一次。
//
// 用法：node scripts/core/build-sharded.mjs [--shards 4] [--keep]
// 跑之前要先跑過 prebuild（跟 `astro build` 一樣）。跑完照舊接 postbuild。

import { spawn } from 'node:child_process';
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  renameSync,
  rmSync,
  statSync,
  symlinkSync,
  writeFileSync,
} from 'node:fs';
import { createHash } from 'node:crypto';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import {
  ENABLED_LANGUAGE_CODES,
  DEFAULT_LANGUAGE,
} from '../../src/config/languages.mjs';

const ROOT = process.cwd();
const args = process.argv.slice(2);
const argVal = (name, dflt) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : dflt;
};
const N = Math.max(2, parseInt(argVal('--shards', '4'), 10));
const KEEP = args.includes('--keep');
const SHARD_DIR = join(ROOT, '.shards');
const DIST = join(ROOT, 'dist');

const log = (m) => console.log(`[build-sharded] ${m}`);
const now = () => Number(process.hrtime.bigint() / 1000000n);

// ── 1. 分配：語言目錄按「預估頁數」貪婪分到 N-1 份，第 0 份固定是其餘全部 ──
const pagesDir = join(ROOT, 'src/pages');
const langCodes = ENABLED_LANGUAGE_CODES.filter(
  (c) => c !== DEFAULT_LANGUAGE.code && existsSync(join(pagesDir, c)),
);
const countMd = (dir) => {
  if (!existsSync(dir)) return 0;
  let n = 0;
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) n += countMd(join(dir, e.name));
    else if (e.name.endsWith('.md')) n += 1;
  }
  return n;
};
const weightOf = (lang) => {
  const articles = countMd(join(ROOT, 'src/content', lang));
  // 有 raw/ 端點的語言，每篇文章多一個 .md 路由
  const hasRaw = existsSync(join(pagesDir, lang, 'raw'));
  return articles * (hasRaw ? 2 : 1) + 100;
};
const bins = Array.from({ length: N - 1 }, () => ({ langs: [], weight: 0 }));
for (const lang of [...langCodes].sort((a, b) => weightOf(b) - weightOf(a))) {
  const bin = bins.reduce((m, b) => (b.weight < m.weight ? b : m));
  bin.langs.push(lang);
  bin.weight += weightOf(lang);
}
const rootEntries = readdirSync(pagesDir).filter((e) => !langCodes.includes(e));
const shards = [
  { id: 0, entries: rootEntries, label: 'zh＋不分語言的頁' },
  ...bins.map((b, i) => ({
    id: i + 1,
    entries: b.langs,
    label: `${b.langs.join(' ')}（預估 ${b.weight} 頁）`,
  })),
].filter((s) => s.entries.length > 0);

// ── 2. 建影子根目錄 ──
rmSync(SHARD_DIR, { recursive: true, force: true });
const SKIP_TOP = new Set(['src', 'dist', '.astro', '.shards', '.git']);
for (const s of shards) {
  const sroot = join(SHARD_DIR, `s${s.id}`);
  mkdirSync(join(sroot, 'src/pages'), { recursive: true });
  for (const e of readdirSync(ROOT)) {
    if (SKIP_TOP.has(e)) continue;
    symlinkSync(join(ROOT, e), join(sroot, e));
  }
  for (const e of readdirSync(join(ROOT, 'src'))) {
    if (e === 'pages') continue;
    symlinkSync(join(ROOT, 'src', e), join(sroot, 'src', e));
  }
  for (const e of s.entries) {
    symlinkSync(join(pagesDir, e), join(sroot, 'src/pages', e));
  }
  mkdirSync(join(sroot, '.empty-public'), { recursive: true });
  s.root = sroot;
  s.pagesOut = join(sroot, 'pages.json');
}

// ── 3. 同時跑 N 個 astro build ──
const astroBin = join(ROOT, 'node_modules/astro/bin/astro.mjs');
const runShard = (s) =>
  new Promise((res, rej) => {
    const t0 = now();
    const logFile = join(s.root, 'build.log');
    const out = [];
    const child = spawn(process.execPath, [astroBin, 'build'], {
      cwd: s.root,
      env: {
        ...process.env,
        TWMD_SHARD: String(s.id),
        TWMD_SHARD_PAGES_OUT: s.pagesOut,
        // src/utils/staticRoutes.ts 用它看「全站有哪些靜態頁」
        TWMD_PAGES_ROOT: pagesDir,
        // 靜態資產（public/）只由第 0 份複製，其餘各份給空目錄
        ...(s.id === 0 ? {} : { TWMD_SHARD_EMPTY_PUBLIC: '1' }),
        FORCE_COLOR: '0',
      },
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    children.push(child);
    child.stdout.on('data', (d) => out.push(d));
    child.stderr.on('data', (d) => out.push(d));
    child.on('close', (code) => {
      writeFileSync(logFile, Buffer.concat(out));
      s.seconds = (now() - t0) / 1000;
      const text = Buffer.concat(out).toString('utf8');
      const m = text.match(/(\d+) page\(s\) built in ([^\n]+)/);
      s.pages = m ? Number(m[1]) : null;
      if (code !== 0) {
        console.error(text.split('\n').slice(-40).join('\n'));
        rej(
          new Error(`第 ${s.id} 份建置失敗（exit ${code}），log：${logFile}`),
        );
      } else {
        log(
          `第 ${s.id} 份完成：${s.pages} 頁、${s.seconds.toFixed(1)} 秒｜${s.label}`,
        );
        res();
      }
    });
  });

const children = [];
const T0 = now();
log(`切 ${shards.length} 份：`);
for (const s of shards) log(`  第 ${s.id} 份：${s.label}`);
try {
  await Promise.all(shards.map(runShard));
} catch (err) {
  // 一份失敗就把其他幾份也停掉，不留孤兒行程
  for (const c of children) if (c.exitCode === null) c.kill('SIGTERM');
  console.error(`[build-sharded] ⛔ ${err.message}`);
  process.exit(1);
}
const tBuild = (now() - T0) / 1000;

// ── 4. 併回 ./dist ──
const tM0 = now();
rmSync(DIST, { recursive: true, force: true });
renameSync(join(shards[0].root, 'dist'), DIST);
const md5 = (p) => createHash('md5').update(readFileSync(p)).digest('hex');
let moved = 0;
let same = 0;
const conflicts = [];
const isSitemap = (rel) => /^sitemap-(index|\d+)\.xml$/.test(rel);
const mergeDir = (src, dst, rel = '') => {
  for (const e of readdirSync(src, { withFileTypes: true })) {
    const s = join(src, e.name);
    const d = join(dst, e.name);
    const r = rel ? `${rel}/${e.name}` : e.name;
    if (e.isDirectory()) {
      if (!existsSync(d)) {
        renameSync(s, d); // 整個目錄一次搬走
        moved += 1;
      } else {
        mergeDir(s, d, r);
      }
    } else if (isSitemap(r)) {
      // 各份自己的 sitemap 丟掉，第 5 步對全站重產
    } else if (!existsSync(d)) {
      renameSync(s, d);
      moved += 1;
    } else if (statSync(s).size === statSync(d).size && md5(s) === md5(d)) {
      same += 1;
    } else {
      conflicts.push(r);
    }
  }
};
for (const s of shards.slice(1)) mergeDir(join(s.root, 'dist'), DIST);
for (const f of readdirSync(DIST)) if (isSitemap(f)) rmSync(join(DIST, f));
if (conflicts.length > 0) {
  console.error(
    `[build-sharded] ⛔ ${conflicts.length} 個檔在不同份裡同名但內容不同，例：\n  ` +
      conflicts.slice(0, 20).join('\n  '),
  );
  process.exit(1);
}

// ── 5. 對全站的頁產一次 sitemap（用 astro.config.mjs 裡同一份設定）──
const allPages = [];
const seen = new Set();
for (const s of shards) {
  for (const p of JSON.parse(readFileSync(s.pagesOut, 'utf8'))) {
    const pathname = p.startsWith('/') ? p.slice(1) : p;
    if (seen.has(pathname)) continue;
    seen.add(pathname);
    allPages.push({ pathname });
  }
}
const cfgMod = await import(pathToFileURL(join(ROOT, 'astro.config.mjs')).href);
const cfg = cfgMod.default;
const sitemapIntegration = (cfg.integrations ?? [])
  .flat()
  .find((i) => i && i.name === '@astrojs/sitemap');
if (!sitemapIntegration) {
  console.error(
    '[build-sharded] ⛔ astro.config.mjs 裡找不到 @astrojs/sitemap',
  );
  process.exit(1);
}
const sitemapLogger = {
  info: (m) => log(`sitemap: ${m}`),
  warn: (m) => console.warn(`[build-sharded] sitemap ⚠️ ${m}`),
  error: (m) => {
    console.error(`[build-sharded] sitemap ⛔ ${m}`);
    process.exitCode = 1;
  },
};
await sitemapIntegration.hooks['astro:routes:resolved']?.({ routes: [] });
await sitemapIntegration.hooks['astro:config:done']({
  config: {
    site: cfg.site,
    base: cfg.base ?? '/',
    trailingSlash: cfg.trailingSlash ?? 'ignore',
    build: { format: cfg.build?.format ?? 'directory' },
  },
});
await sitemapIntegration.hooks['astro:build:done']({
  dir: pathToFileURL(DIST + '/'),
  pages: allPages,
  logger: sitemapLogger,
});
if (!existsSync(join(DIST, 'sitemap-index.xml'))) {
  console.error('[build-sharded] ⛔ sitemap-index.xml 沒有產出');
  process.exit(1);
}
const tMerge = (now() - tM0) / 1000;

// ── 6. 收尾 ──
const summary = {
  shards: shards.map((s) => ({
    id: s.id,
    entries: s.id === 0 ? '(root)' : s.entries,
    pages: s.pages,
    seconds: s.seconds,
  })),
  build_seconds: tBuild,
  merge_seconds: tMerge,
  total_pages_recorded: allPages.length,
  files_moved: moved,
  files_identical_across_shards: same,
};
writeFileSync(
  join(ROOT, '.shards-summary.json'),
  JSON.stringify(summary, null, 2),
);
if (!KEEP) rmSync(SHARD_DIR, { recursive: true, force: true });
log(
  `全部完成：建置 ${tBuild.toFixed(1)} 秒（最慢的一份 ${Math.max(...shards.map((s) => s.seconds)).toFixed(1)} 秒）＋合併 ${tMerge.toFixed(1)} 秒；` +
    `${allPages.length} 頁；跨份同名同內容的檔 ${same} 個`,
);
