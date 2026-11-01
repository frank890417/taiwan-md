#!/usr/bin/env node
/** Taiwan.md 識別系統 v2 產生器。
 *
 * 讀：terrain/（真實海岸線與高程）、mark.mjs（行島幾何）、wordmark.json（標準字外框）、
 *     ../tokens.json（色彩）。
 * 寫：src/data/brand/identity.json  識別手冊頁（/brand）讀的唯一資料
 *     public/brand/*                下載用的 SVG／PNG（設計師、媒體、fork 用）
 * 規範改了就改上游那幾份，再跑：node docs/brand/source/build-identity.mjs
 * 不要手改輸出檔，下次重建會被蓋掉。
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import sharp from 'sharp';
import { island, layoutMark, ridgeLines, scanLines } from './mark.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '../../..');
const W = JSON.parse(readFileSync(join(HERE, 'wordmark.json'), 'utf8'));
const T = JSON.parse(readFileSync(join(HERE, '../tokens.json'), 'utf8'));
const L = T.modes.light.tokens;
const D = T.modes.dark.tokens;

const f = (n) => +n.toFixed(2);

// ── 標誌規格（數字住這裡，手冊頁照印）────────────────────────────────
export const SPEC = {
  lines: 10, // 掃 10 行（v2.2：12 行在頁首尺寸太細，10 行在 20 px 以上都站得住）
  weight: 0.6, // 行粗＝行距 × 0.6
  smallLines: 8, // 24 px 以下（island 圖示）
  markToCap: 1.9, // 組合時標誌高＝大寫高 × 1.9
  gapToCap: 0.42, // 標誌與字的間距＝大寫高 × 0.42
  clearToCap: 0.5, // 組合四周淨空＝大寫高 × 0.5
  minLockupPx: 20, // 組合最小：大寫高 ≥ 10 px（整組高約 20 px）
  minMarkPx: 16,
};

// ── 行島（主版）：座標用本島單位，寬 716 高 1354 ─────────────────────
const box = { x: 0, y: 0, w: island.width, h: island.height };
const master = layoutMark(SPEC.lines, box, SPEC.weight).map((r) => ({
  x: f(r.x),
  y: f(r.y),
  w: f(r.w),
  h: f(r.h),
  t: r.tropic ? 1 : 0,
  p: r.peak, // 這一行經過的最高點（公尺），手冊「基因」讀法用來決定帶寬
}));
const small = layoutMark(SPEC.smallLines, box, SPEC.weight).map((r) => ({
  x: f(r.x),
  y: f(r.y),
  w: f(r.w),
  h: f(r.h),
  t: r.tropic ? 1 : 0,
}));

// ── 16 px 像素版：7 行、行高 1 px、行距 1 px，北迴歸線那行對齊像素格 ─────
function pixelMark(size, count, bar, gap) {
  const pitch = bar + gap;
  const s = (count * pitch - gap) / island.height;
  const ox = (size - island.width * s) / 2;
  const oy = (size - island.height * s) / 2;
  const { lines } = scanLines(count);
  const ti = lines.findIndex((l) => l.tropic);
  const anchor = Math.round(oy + lines[ti].y * s - bar / 2);
  return lines
    .map((l, i) => {
      const x0 = Math.floor(ox + l.x0 * s + 0.25);
      const x1 = Math.max(x0 + 1, Math.ceil(ox + l.x1 * s - 0.25));
      return {
        x: x0,
        y: anchor + (i - ti) * pitch,
        w: x1 - x0,
        h: bar,
        t: l.tropic ? 1 : 0,
      };
    })
    .filter((r) => r.y >= 0 && r.y + r.h <= size);
}
// 16 px 逐像素手排（演算法排出來只剩 6 行、尖端糊掉，這裡照 scanLines(8) 的比例手修）：
// 7 行、行高 1 px、行距 1 px；第 4 行（y=8）是北迴歸線。x 依海岸線比例，北端往東偏、南端收成 1–2 px。
const px16 = [
  { x: 9, y: 2, w: 3, h: 1, t: 0 },
  { x: 7, y: 4, w: 5, h: 1, t: 0 },
  { x: 6, y: 6, w: 5, h: 1, t: 0 },
  { x: 5, y: 8, w: 6, h: 1, t: 1 },
  { x: 5, y: 10, w: 5, h: 1, t: 0 },
  { x: 6, y: 12, w: 3, h: 1, t: 0 },
  { x: 7, y: 14, w: 1, h: 1, t: 0 },
];
const px32 = pixelMark(32, 13, 1, 1);

// ── 地形行（B 層）：26 行，依高程抬升；路徑存本島座標 ─────────────────
const ridge = ridgeLines(26, box, 0.1, 3).map((r) => ({
  t: r.tropic ? 1 : 0,
  base: f(r.base),
  d: 'M' + r.points.map(([x, y]) => `${f(x)} ${f(y)}`).join('L'),
}));

// ── 組合（標準字 + 標誌）：單位＝字級 1000 ───────────────────────────
const capH = W.capHeight;
const markH = capH * SPEC.markToCap;
const markW = markH / island.aspect;
const lockup = {
  capHeight: f(capH),
  markHeight: f(markH),
  markWidth: f(markW),
  markTop: f(-capH / 2 - markH / 2),
  textX: f(markW + capH * SPEC.gapToCap),
  wordWidth: f(W.width),
  zhBaseline: f(W.zh.baseline),
  zhWidth: f(W.zh.width),
  clear: f(capH * SPEC.clearToCap),
};

// ── SVG 字串（下載檔與手冊頁共用）────────────────────────────────────
const rects = (rs, ink, acc, sx = 1, ox = 0, oy = 0) =>
  rs
    .map(
      (r) =>
        `<rect x="${f(ox + r.x * sx)}" y="${f(oy + r.y * sx)}" width="${f(r.w * sx)}" height="${f(r.h * sx)}" fill="${r.t ? acc : ink}"/>`,
    )
    .join('');
const wordPaths = (ink, acc) =>
  W.paths
    .map((p) => `<path d="${p.d}" fill="${p.role === 'md' ? acc : ink}"/>`)
    .join('');
const zhPaths = (ink) =>
  W.zh.paths.map((d) => `<path d="${d}" fill="${ink}"/>`).join('');

function svgMark({ ink, acc, bg }) {
  const pad = island.width * 0.12;
  const vw = island.width + pad * 2;
  const vh = island.height + pad * 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${-pad} ${-pad} ${f(vw)} ${f(vh)}" width="${f(vw / 4)}" height="${f(vh / 4)}"><title>Taiwan.md</title>${bg ? `<rect x="${-pad}" y="${-pad}" width="${f(vw)}" height="${f(vh)}" fill="${bg}"/>` : ''}${rects(master, ink, acc)}</svg>\n`;
}
function svgLockup({ ink, acc, sub, bg, zh }) {
  const s = markH / island.height;
  const c = lockup.clear;
  const top = Math.min(lockup.markTop, -capH) - c;
  const bottom =
    Math.max(lockup.markTop + markH, zh ? W.zh.baseline + capH * 0.12 : 0) + c;
  const width = lockup.textX + Math.max(W.width, zh ? W.zh.width : 0) + c * 2;
  const h = bottom - top;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${f(-c)} ${f(top)} ${f(width)} ${f(h)}" width="${f(width / 10)}" height="${f(h / 10)}"><title>Taiwan.md</title>${bg ? `<rect x="${f(-c)}" y="${f(top)}" width="${f(width)}" height="${f(h)}" fill="${bg}"/>` : ''}<g>${rects(master, ink, acc, s, 0, lockup.markTop)}</g><g transform="translate(${lockup.textX} 0)">${wordPaths(ink, acc)}${zh ? zhPaths(sub) : ''}</g></svg>\n`;
}
function svgWordmark({ ink, acc }) {
  const c = capH * 0.25;
  const top = -capH - c;
  const h = capH + c * 2 + Math.abs(W.descender) * 0.1;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${f(W.inkLeft - c)} ${f(top)} ${f(W.width - W.inkLeft + c * 2)} ${f(h)}"><title>Taiwan.md</title>${wordPaths(ink, acc)}</svg>\n`;
}
function svgPixel(rs, size, { ink, acc, bg }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" shape-rendering="crispEdges">${bg ? `<rect width="${size}" height="${size}" fill="${bg}"/>` : ''}${rects(rs, ink, acc)}</svg>\n`;
}
function svgAppIcon({ ink, acc, bg }, size = 512) {
  // App 圖示：墨色方塊，行島佔高 72%，北迴歸線那行仍是臺灣青
  const h = size * 0.72;
  const s = h / island.height;
  const ox = (size - island.width * s) / 2;
  const oy = (size - h) / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}"><rect width="${size}" height="${size}" fill="${bg}"/>${rects(master, ink, acc, s, ox, oy)}</svg>\n`;
}
function svgRidge({ ink, acc, bg }) {
  const pad = island.width * 0.1;
  const lift = island.height * 0.1;
  const vw = island.width + pad * 2;
  const vh = island.height + pad * 2 + lift;
  const sw = (island.height / 26) * 0.14;
  const body = ridge
    .map(
      (r) =>
        `<path d="${r.d}L${r.d.match(/([\d.]+) [\d.]+$/)[1]} ${r.base}" fill="${bg}" stroke="none"/><path d="${r.d}" fill="none" stroke="${r.t ? acc : ink}" stroke-width="${f(sw)}" stroke-linejoin="round"/>`,
    )
    .join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${-pad} ${f(-pad - lift)} ${f(vw)} ${f(vh)}" width="${f(vw / 2)}" height="${f(vh / 2)}"><rect x="${-pad}" y="${f(-pad - lift)}" width="${f(vw)}" height="${f(vh)}" fill="${bg}"/>${body}</svg>\n`;
}

const light = { ink: L['ink-1'], acc: L.brand, sub: L['ink-2'] };
const dark = { ink: D['ink-1'], acc: D.brand, sub: D['ink-2'], bg: D.paper };
const files = {
  'taiwanmd-mark.svg': svgMark(light),
  'taiwanmd-mark-dark.svg': svgMark(dark),
  'taiwanmd-mark-mono.svg': svgMark({
    ink: 'currentColor',
    acc: 'currentColor',
  }),
  'taiwanmd-lockup.svg': svgLockup(light),
  'taiwanmd-lockup-dark.svg': svgLockup(dark),
  'taiwanmd-lockup-zh.svg': svgLockup({ ...light, zh: true }),
  'taiwanmd-lockup-zh-dark.svg': svgLockup({ ...dark, zh: true }),
  'taiwanmd-wordmark.svg': svgWordmark(light),
  'taiwanmd-favicon-16.svg': svgPixel(px16, 16, light),
  'taiwanmd-favicon-32.svg': svgPixel(px32, 32, light),
  'taiwanmd-app-icon.svg': svgAppIcon({
    ink: D['ink-1'],
    acc: D.brand,
    bg: D.paper,
  }),
  'taiwanmd-ridge.svg': svgRidge({
    ink: L['ink-1'],
    acc: L.brand,
    bg: L.paper,
  }),
  'taiwanmd-ridge-dark.svg': svgRidge({
    ink: D['ink-1'],
    acc: D.brand,
    bg: D.paper,
  }),
};

const OUT = join(ROOT, 'public/brand');
mkdirSync(OUT, { recursive: true });
for (const [name, body] of Object.entries(files))
  writeFileSync(join(OUT, name), body);
for (const size of [180, 192, 512]) {
  await sharp(Buffer.from(files['taiwanmd-app-icon.svg']))
    .resize(size, size)
    .png()
    .toFile(join(OUT, `taiwanmd-app-icon-${size}.png`));
}
await sharp(Buffer.from(files['taiwanmd-lockup.svg']), { density: 300 })
  .resize({ height: 256 })
  .png()
  .toFile(join(OUT, 'taiwanmd-lockup-256.png'));
await sharp(Buffer.from(files['taiwanmd-lockup-dark.svg']), { density: 300 })
  .resize({ height: 256 })
  .png()
  .toFile(join(OUT, 'taiwanmd-lockup-dark-256.png'));
writeFileSync(
  join(OUT, 'taiwanmd-tokens.json'),
  JSON.stringify(T, null, 2) + '\n',
);

// ── 手冊頁資料 ──────────────────────────────────────────────────────
const DATA = join(ROOT, 'src/data/brand');
mkdirSync(DATA, { recursive: true });
writeFileSync(
  join(DATA, 'identity.json'),
  JSON.stringify({
    version: '2.2',
    date: '2026-10-23',
    spec: SPEC,
    island: {
      width: island.width,
      height: island.height,
      aspect: f(island.aspect),
      tropicLat: 23.4365,
      bounds: island.bounds,
      peak: island.peak,
      source: island.source,
    },
    master,
    small,
    px16,
    px32,
    ridge,
    lockup,
    wordmark: {
      paths: W.paths,
      zh: W.zh,
      kern: W.kern,
      fonts: W.fonts,
      inkLeft: W.inkLeft,
      width: W.width,
      capHeight: W.capHeight,
      xHeight: W.xHeight,
    },
    tokens: T,
    downloads: Object.keys(files)
      .concat([
        'taiwanmd-app-icon-180.png',
        'taiwanmd-app-icon-192.png',
        'taiwanmd-app-icon-512.png',
        'taiwanmd-lockup-256.png',
        'taiwanmd-lockup-dark-256.png',
        'taiwanmd-tokens.json',
      ])
      .sort(),
  }) + '\n',
);
console.log(
  `identity: ${master.length} 行（主版）、${small.length} 行（小）、16px ${px16.length} 行、地形行 ${ridge.length} 行、${Object.keys(files).length + 6} 個下載檔`,
);
