#!/usr/bin/env node
// compare-build-styles.mjs — 兩份 dist 在瀏覽器裡算出來的樣式是不是一樣。
//
// 為什麼需要：分片建置（scripts/core/build-sharded.mjs）會改變 CSS 的分組與
// <link> 的順序。「每頁載入的規則集合相同」不保證「誰蓋誰」相同，這只有
// 瀏覽器算過才知道。這支把兩份 dist 各起一個本機靜態伺服器，用同一個
// Chromium 開同一批頁，逐元素比 getComputedStyle 的全部屬性；可另存截圖逐像素比。
//
// 用法：
//   node scripts/tools/compare-build-styles.mjs <distA> <distB> [--shots <dir>] [--limit N]
// 兩份都不對外連線（字型、分析腳本一律擋掉），所以結果只跟 dist 本身有關。
// 結束碼：有任何元素的算出樣式不同 → 1。

import { createServer } from 'node:http';
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  statSync,
} from 'node:fs';
import { extname, join } from 'node:path';
import { chromium } from 'playwright';

const [distA, distB, ...rest] = process.argv.slice(2);
if (!distA || !distB) {
  console.error(
    '用法：compare-build-styles.mjs <distA> <distB> [--shots dir] [--limit N]',
  );
  process.exit(2);
}
const opt = (name, dflt) => {
  const i = rest.indexOf(name);
  return i >= 0 ? rest[i + 1] : dflt;
};
const SHOTS = opt('--shots', null);
const LIMIT = Number(opt('--limit', '0'));

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.xml': 'application/xml',
  '.woff2': 'font/woff2',
};
const serve = (root) =>
  new Promise((res) => {
    const srv = createServer((req, rsp) => {
      let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
      let f = join(root, p);
      if (existsSync(f) && statSync(f).isDirectory()) f = join(f, 'index.html');
      if (!existsSync(f)) {
        rsp.writeHead(404);
        rsp.end('404');
        return;
      }
      rsp.writeHead(200, {
        'content-type': MIME[extname(f)] ?? 'application/octet-stream',
      });
      rsp.end(readFileSync(f));
    });
    srv.listen(0, '127.0.0.1', () => res(srv));
  });

// ── 挑頁：每種頁型都要有，含由右到左的語言 ──
const firstArticles = (root, lang, cat, n) => {
  const dir = join(root, lang === 'zh' ? '' : lang, cat);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((e) => existsSync(join(dir, e, 'index.html')))
    .sort()
    .slice(0, n)
    .map((e) => `/${lang === 'zh' ? '' : lang + '/'}${cat}/${e}/`);
};
const pages = new Set();
const fixed = [
  '/',
  '/about/',
  '/dashboard/',
  '/latest/',
  '/data/',
  '/budget/',
  '/graph/',
  '/map/',
  '/search/',
  '/explore/',
  '/housing/',
  '/income/',
  '/health/',
  '/names/',
  '/industry/',
  '/elections/2026/',
  '/terminology/',
  '/semiont/',
  '/contribute/',
  '/companies/',
];
for (const lang of ['zh', 'en', 'ja', 'ar', 'de']) {
  const pre = lang === 'zh' ? '' : `/${lang}`;
  for (const p of lang === 'zh'
    ? fixed
    : ['/', '/about/', '/dashboard/', '/housing/', '/income/', '/latest/'])
    pages.add(`${pre}${p}`.replace('//', '/'));
  for (const cat of ['people', 'history'])
    for (const u of firstArticles(distA, lang, cat, lang === 'zh' ? 2 : 1))
      pages.add(u);
  pages.add(`${pre}/people/`);
}
for (const e of readdirSync(join(distA, 'terminology'))
  .filter((x) => existsSync(join(distA, 'terminology', x, 'index.html')))
  .slice(0, 3))
  pages.add(`/terminology/${e}/`);
const diaryDir = join(distA, 'semiont/diary');
if (existsSync(diaryDir))
  for (const e of readdirSync(diaryDir)
    .filter((x) => existsSync(join(diaryDir, x, 'index.html')))
    .slice(-2))
    pages.add(`/semiont/diary/${e}/`);

let list = [...pages].filter(
  (p) =>
    existsSync(join(distA, decodeURIComponent(p), 'index.html')) &&
    existsSync(join(distB, decodeURIComponent(p), 'index.html')),
);
if (LIMIT > 0) list = list.slice(0, LIMIT);

const VIEWPORTS = [
  { name: 'desktop', width: 1280, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
];

const snapshot = () => {
  // 逐元素收全部 computed style。整份樣式在頁面裡先壓成一個雜湊再傳回來
  // （一頁幾千個元素 × 三百多個屬性，原樣傳回太慢）；另留少數屬性原值，
  // 兩邊雜湊不同時用來說明差在哪。
  const skip = new Set([
    'SCRIPT',
    'STYLE',
    'LINK',
    'META',
    'TITLE',
    'HEAD',
    'NOSCRIPT',
    'TEMPLATE',
  ]);
  const KEEP = [
    'display',
    'position',
    'color',
    'background-color',
    'font-size',
    'font-family',
    'font-weight',
    'line-height',
    'margin-top',
    'margin-bottom',
    'padding-top',
    'padding-left',
    'width',
    'height',
    'border-top-width',
    'z-index',
    'opacity',
    'text-align',
    'direction',
  ];
  const hash = (str) => {
    let h1 = 0xdeadbeef;
    let h2 = 0x41c6ce57;
    for (let i = 0; i < str.length; i++) {
      const ch = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    return (h1 >>> 0).toString(36) + (h2 >>> 0).toString(36);
  };
  const out = [];
  const els = [...document.querySelectorAll('*')].filter(
    (el) => !skip.has(el.tagName),
  );
  // 元素很多的頁（儀表板五萬多個）等距抽樣，上限約 6000 個
  const step = Math.max(1, Math.ceil(els.length / 6000));
  for (let n = 0; n < els.length; n += step) {
    const el = els[n];
    const cs = getComputedStyle(el);
    // 屬性要先排序：CSS 變數的列舉順序跟著樣式表的宣告順序走，兩份 dist 的
    // 樣式表分組不同，順序就不同，但「屬性→值」其實一樣
    const parts = [];
    // 兩份 dist 各有自己的本機埠號，算出來的絕對網址（背景圖等）要把埠號抹掉
    for (let i = 0; i < cs.length; i++)
      parts.push(
        cs[i] +
          ':' +
          cs.getPropertyValue(cs[i]).replace(/127\.0\.0\.1:\d+/g, 'HOST'),
      );
    const all = parts.sort().join(';');
    const o = {};
    for (const k of KEEP) o[k] = cs.getPropertyValue(k);
    out.push({
      tag: el.tagName,
      cls: String(el.className?.baseVal ?? el.className ?? '').slice(0, 80),
      h: hash(all),
      style: o,
    });
  }
  return out;
};

const [srvA, srvB] = await Promise.all([serve(distA), serve(distB)]);
const base = (s) => `http://127.0.0.1:${s.address().port}`;
const browser = await chromium.launch({ headless: true });
if (SHOTS) mkdirSync(SHOTS, { recursive: true });

let totalEls = 0;
let diffEls = 0;
let pagesWithDiff = 0;
let structureMismatch = 0;
const samples = [];
const propCount = {};
const shotDiffs = [];

for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    reducedMotion: 'reduce',
  });
  // 只准連本機，外部的字型與分析腳本一律擋掉
  await ctx.route('**/*', (route) =>
    route.request().url().startsWith('http://127.0.0.1')
      ? route.continue()
      : route.abort(),
  );
  for (const p of list) {
    const snaps = [];
    const shots = [];
    for (const s of [srvA, srvB]) {
      const page = await ctx.newPage();
      await page.goto(base(s) + p, { waitUntil: 'load', timeout: 60000 });
      await page.waitForTimeout(1300); // 等字型閘門的逾時出口（800ms）走完
      snaps.push(await page.evaluate(snapshot));
      if (SHOTS && vp.name === 'desktop')
        shots.push(
          await page.screenshot({ fullPage: false, animations: 'disabled' }),
        );
      await page.close();
    }
    const [a, b] = snaps;
    if (a.length !== b.length) {
      structureMismatch += 1;
      samples.push(`${vp.name} ${p}：元素數不同 ${a.length} vs ${b.length}`);
      continue;
    }
    let pageDiff = 0;
    for (let i = 0; i < a.length; i++) {
      totalEls += 1;
      if (a[i].h !== b[i].h) {
        pageDiff += 1;
        const ka = a[i].style;
        const kb = b[i].style;
        const changed = Object.keys(ka).filter((k) => ka[k] !== kb[k]);
        for (const k of changed.length ? changed : ['(其他屬性)'])
          propCount[k] = (propCount[k] ?? 0) + 1;
        if (samples.length < 25)
          samples.push(
            `${vp.name} ${p} <${a[i].tag} class="${a[i].cls}"> ${
              changed
                .slice(0, 3)
                .map((k) => `${k}: ${ka[k]} → ${kb[k]}`)
                .join('；') || '差在沒列出的屬性'
            }`,
          );
      }
    }
    if (pageDiff > 0) {
      pagesWithDiff += 1;
      diffEls += pageDiff;
    }
    process.stderr.write(
      `[${vp.name}] ${p} 元素 ${a.length}，不同 ${pageDiff}\n`,
    );
    if (shots.length === 2) {
      const same = Buffer.compare(shots[0], shots[1]) === 0;
      if (!same) {
        const name = p.replace(/[^\w一-鿿]+/g, '_').slice(0, 80) || 'home';
        const { writeFileSync } = await import('node:fs');
        writeFileSync(join(SHOTS, `${name}.A.png`), shots[0]);
        writeFileSync(join(SHOTS, `${name}.B.png`), shots[1]);
        shotDiffs.push(p);
      }
    }
  }
  await ctx.close();
}
await browser.close();
srvA.close();
srvB.close();

console.log(
  `頁數 ${list.length} × 視窗 ${VIEWPORTS.length}；比了 ${totalEls} 個元素`,
);
console.log(
  `算出樣式不同的元素：${diffEls}（分佈在 ${pagesWithDiff} 個頁面×視窗）；元素數對不上的頁：${structureMismatch}`,
);
if (Object.keys(propCount).length)
  console.log(
    '不同的屬性（前 12）：',
    Object.entries(propCount)
      .sort((x, y) => y[1] - x[1])
      .slice(0, 12),
  );
for (const s of samples) console.log('  ', s);
if (SHOTS)
  console.log(
    `桌面截圖逐位元組不同的頁：${shotDiffs.length}`,
    shotDiffs.slice(0, 20),
  );
process.exit(diffEls > 0 || structureMismatch > 0 ? 1 : 0);
