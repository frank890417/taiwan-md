// 花磚識別 R2 樣張：標誌是「一片」花磚，島是這片磚的主花（2026-11-10）。
// 哲宇 13:1x：「我是想要 logo是花磚拼成島（一片花磚，不是一堆花磚，不然會太小）」
//            「然後深度幫我研究大量花磚，讓樣式更好看更有機」
// 用法：node docs/brand/tile/build-r2.mjs  →  docs/brand/tile/r2/index.html
// 島的輪廓與等高帶由高程格點算出（marching squares），沒有手描；花葉由文法生成，沒有描實物。
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '../../..');
const elev = JSON.parse(fs.readFileSync(path.join(ROOT, 'docs/brand/source/terrain/taiwan-elev-q4.json'), 'utf8'));
const tokens = JSON.parse(fs.readFileSync(path.join(ROOT, 'docs/brand/tokens.json'), 'utf8'));
const [QING, LANQUE, JIUCHONG, XIANGSI, KULIAN, ZHUAN] = tokens.categorical.light;
const QING_DEEP = tokens.modes.light.tokens['brand-strong'];
const CREAM = '#f7f1e3'; // 釉白
const BUTTER = '#edd27a'; // 奶油黃（實物常見；不在 v2 六色裡，暫定）
const INK = tokens.modes.light.tokens['ink-1'];
const INK_D = tokens.modes.dark.tokens['ink-1'];
const hex = (c) => [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16));
const mix = (c, d, t) => '#' + hex(c).map((v, i) => Math.round(v + (hex(d)[i] - v) * t).toString(16).padStart(2, '0')).join('');
const tint = (c, t) => mix(c, CREAM, t);
const shade = (c, t) => mix(c, '#0a1a1c', t);

// ── 高程 → 平滑輪廓 ─────────────────────────────────────
const { width: W, height: H, m: M } = elev;
function blur(src, r, passes = 2) {
  let a = Float32Array.from(src);
  for (let p = 0; p < passes; p++) {
    const b = new Float32Array(a.length);
    for (let y = 0; y < H; y++) { // 水平
      let s = 0, n = 0;
      for (let x = -r; x < W; x++) {
        const add = x + r, rem = x - r - 1;
        if (add < W) { s += a[y * W + add]; n++; }
        if (rem >= 0) { s -= a[y * W + rem]; n--; }
        if (x >= 0) b[y * W + x] = s / n;
      }
    }
    const c = new Float32Array(a.length);
    for (let x = 0; x < W; x++) { // 垂直
      let s = 0, n = 0;
      for (let y = -r; y < H; y++) {
        const add = y + r, rem = y - r - 1;
        if (add < H) { s += b[add * W + x]; n++; }
        if (rem >= 0) { s -= b[rem * W + x]; n--; }
        if (y >= 0) c[y * W + x] = s / n;
      }
    }
    a = c;
  }
  return a;
}
function contours(F, level) {
  const segs = new Map(), pts = new Map();
  const v = (x, y) => (x < 0 || y < 0 || x >= W || y >= H ? 0 : F[y * W + x]);
  const link = (a, b) => { if (!segs.has(a)) segs.set(a, []); if (!segs.has(b)) segs.set(b, []); segs.get(a).push(b); segs.get(b).push(a); };
  const hk = (x, y) => { const k = `h${x},${y}`; if (!pts.has(k)) { const a = v(x, y), b = v(x + 1, y); pts.set(k, [x + (level - a) / (b - a), y]); } return k; };
  const vk = (x, y) => { const k = `v${x},${y}`; if (!pts.has(k)) { const a = v(x, y), b = v(x, y + 1); pts.set(k, [x, y + (level - a) / (b - a)]); } return k; };
  for (let y = -1; y < H; y++) for (let x = -1; x < W; x++) {
    const i = (v(x, y) >= level ? 8 : 0) | (v(x + 1, y) >= level ? 4 : 0) | (v(x + 1, y + 1) >= level ? 2 : 0) | (v(x, y + 1) >= level ? 1 : 0);
    if (i === 0 || i === 15) continue;
    const T = () => hk(x, y), R = () => vk(x + 1, y), B = () => hk(x, y + 1), L = () => vk(x, y);
    switch (i) {
      case 1: case 14: link(L(), B()); break;
      case 2: case 13: link(B(), R()); break;
      case 3: case 12: link(L(), R()); break;
      case 4: case 11: link(T(), R()); break;
      case 6: case 9: link(T(), B()); break;
      case 7: case 8: link(T(), L()); break;
      case 5: link(T(), L()); link(B(), R()); break;
      case 10: link(T(), R()); link(L(), B()); break;
    }
  }
  const used = new Set(), loops = [];
  for (const start of segs.keys()) {
    if (used.has(start)) continue;
    const loop = [start]; used.add(start);
    let prev = null, cur = start;
    for (;;) {
      const next = segs.get(cur).find((n) => n !== prev && !used.has(n));
      if (next === undefined) break;
      used.add(next); loop.push(next); prev = cur; cur = next;
    }
    loops.push(loop.map((k) => pts.get(k)));
  }
  return loops;
}
const area = (p) => Math.abs(p.reduce((s, [x, y], i) => { const [u, w] = p[(i + 1) % p.length]; return s + x * w - u * y; }, 0) / 2);
function smooth(p, step = 3, iters = 2) {
  let q = p.filter((_, i) => i % step === 0);
  for (let k = 0; k < iters; k++) {
    const r = [];
    for (let i = 0; i < q.length; i++) {
      const [x0, y0] = q[i], [x1, y1] = q[(i + 1) % q.length];
      r.push([x0 * 0.75 + x1 * 0.25, y0 * 0.75 + y1 * 0.25], [x0 * 0.25 + x1 * 0.75, y0 * 0.25 + y1 * 0.75]);
    }
    q = r;
  }
  return q;
}
// 島放進 100×100 的磚：高 80，置中
const IS = 80 / H, IOX = (100 - W * IS) / 2, IOY = 10;
const toPath = (loops) => loops.map((p) => 'M' + p.map(([x, y]) => `${(IOX + x * IS).toFixed(1)} ${(IOY + y * IS).toFixed(1)}`).join('L') + 'Z').join('');
const landMask = blur(Float32Array.from(M, (v) => (v > 0 ? 1 : 0)), 3);
const elevSm = blur(Float32Array.from(M), 6);
const coast = (() => { const ls = contours(landMask, 0.5).sort((a, b) => area(b) - area(a)); return toPath([smooth(ls[0], 7, 2)]); })();
const bandPath = (lv) => toPath(contours(elevSm, lv).filter((p) => area(p) > 120).map((p) => smooth(p, 7, 2)));
const BANDS = [900].map(bandPath); // 只留一道：中央山脈。三層同心在細長的島上會讀成別的東西（R2 第一版親眼看到）
// 小尺寸用更圓的輪廓
const coastSoft = (() => { const m2 = blur(Float32Array.from(M, (v) => (v > 0 ? 1 : 0)), 7); const ls = contours(m2, 0.5).sort((a, b) => area(b) - area(a)); return toPath([smooth(ls[0], 6, 2)]); })();

// ── 花葉文法（有機的部分）──────────────────────────────
// 研究筆記見 Obsidian：實物的線是凸起的白線、粗細不勻；釉在凹處積得深；花瓣有缺口、葉有中脈。
const leaf = (x, y, ang, len, w = 0.3) =>
  `<g transform="translate(${x} ${y}) rotate(${ang})"><path class="f lf" d="M0 0C${len * 0.2} ${-len * w} ${len * 0.72} ${-len * w * 0.85} ${len} 0C${len * 0.72} ${len * w * 0.85} ${len * 0.2} ${len * w} 0 0Z"/><path class="vein" d="M${len * 0.08} 0L${len * 0.9} 0M${len * 0.35} 0L${len * 0.5} ${-len * w * 0.45}M${len * 0.35} 0L${len * 0.5} ${len * w * 0.45}M${len * 0.6} 0L${len * 0.72} ${-len * w * 0.32}M${len * 0.6} 0L${len * 0.72} ${len * w * 0.32}"/></g>`;
// 角隅四分之一朵玫瑰：四塊磚拼起來是一整朵
const quarterRose = (rot) => {
  const lobes = [15, 45, 75].map((a) => `<path class="f r1" transform="rotate(${a})" d="M10.5 -1.8C15 -3.6 20 -6.2 25.5 -4.6C29.5 -2.8 29.5 2.8 25.5 4.6C20 6.2 15 3.6 10.5 1.8Z"/>`).join('');
  return `<g transform="rotate(${rot} 50 50)">${lobes}<path class="f r2" d="M0 0L11 0A11 11 0 0 1 0 11Z"/><path class="f r3" d="M0 0L5 0A5 5 0 0 1 0 5Z"/></g>`;
};
const NOTCH = 'M50 50C36 42 33 24 44 14C47 12 49 14 50 17C51 14 53 12 56 14C67 24 64 42 50 50Z'; // 有缺口的花瓣
const NOTCH_S = 'M50 50C42 45 40 35 46 29C48 28 49 29 50 31C51 29 52 28 54 29C60 35 58 45 50 50Z';
const ring = (d, n, off, cls) => Array.from({ length: n }, (_, i) => `<path class="f ${cls}" d="${d}" transform="rotate(${off + (360 / n) * i} 50 50)"/>`).join('');

// 一片磚：fills（釉面）＋ lines（凸線）兩層，凸線打光、在釉面上落一點深色
function tileSvg({ ground, css, body, relief = true, extra = '' }, size = '') {
  const id = 't' + Math.abs(hash(css + body)).toString(36);
  return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" ${size} class="tile ${id}"><style>.${id} .f{stroke:none}${css.replace(/(^|})\s*\./g, `$1.${id} .`)}.${id} .ln *{fill:none!important;stroke:${CREAM};stroke-width:1.5;stroke-linejoin:round;stroke-linecap:round}.${id} .ln .vein{stroke-width:.8}.${id} .fl .vein{display:none}</style>
<g clip-path="url(#clip)"><rect width="100" height="100" fill="${ground}"/><g class="fl" ${relief ? 'filter="url(#wob)"' : ''}>${body}</g>${relief ? `<g class="ln" filter="url(#tube)">${body}</g><rect width="100" height="100" fill="url(#gloss)"/>` : `<g class="ln">${body}</g>`}${extra}</g></svg>`;
}
function hash(s) { let h = 0; for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0; return h; }

// ── 標誌磚：島是主花 ───────────────────────────────────
const islandBody = `<path class="f i0" d="${coast}"/><path class="f i1" d="${BANDS[0]}"/>`;
// 島往東北斜，左上與右下各空出一塊：放兩枝葉。四角放四分之一朵玫瑰。
const sprigs = leaf(9, 37, -62, 21) + leaf(20, 24, -28, 17, 0.34) + leaf(91, 63, 118, 21) + leaf(80, 76, 152, 17, 0.34);
const roses = [0, 90, 180, 270].map(quarterRose).join('');
const logoBody = roses + sprigs + islandBody;
const LOGOS = [
  { key: 'L1', name: '綠釉島', note: '深綠釉底，島是釉白，中央山脈是奶油黃，四角是粉色的花。最像老屋上那種綠底紅花的磚。',
    ground: QING_DEEP, css: `.i0{fill:${CREAM}}.i1{fill:${BUTTER}}.lf{fill:${tint(QING, 0.45)}}.r1{fill:${tint(JIUCHONG, 0.55)}}.r2{fill:${tint(JIUCHONG, 0.2)}}.r3{fill:${BUTTER}}`,
    flat: [QING_DEEP, CREAM, tint(JIUCHONG, 0.5), BUTTER] },
  { key: 'L2', name: '青葉島', note: '釉白底，島是一片葉，海岸淺、山深。最接近現在頁首那張地形小圖。',
    ground: CREAM, css: `.i0{fill:${tint(QING, 0.5)}}.i1{fill:${QING_DEEP}}.lf{fill:${tint(XIANGSI, 0.3)}}.r1{fill:${tint(JIUCHONG, 0.6)}}.r2{fill:${tint(JIUCHONG, 0.25)}}.r3{fill:${BUTTER}}`,
    flat: [CREAM, QING, tint(JIUCHONG, 0.5), QING_DEEP], lineColor: mix(CREAM, '#8a7a5c', 0.55) },
  { key: 'L3', name: '海藍島', note: '鈷藍釉底當海，島是釉白，山是奶油黃。跟政黨色距離最遠。',
    ground: LANQUE, css: `.i0{fill:${CREAM}}.i1{fill:${BUTTER}}.lf{fill:${tint(LANQUE, 0.55)}}.r1{fill:${tint(LANQUE, 0.7)}}.r2{fill:${CREAM}}.r3{fill:${BUTTER}}`,
    flat: [LANQUE, CREAM, tint(LANQUE, 0.6), BUTTER], lineColor: shade(LANQUE, 0.45) },
  { key: 'L4', name: '紅磚島', note: '紅磚橙底，島是釉白與青。暖，像閩南紅磚屋的牆。',
    ground: ZHUAN, css: `.i0{fill:${CREAM}}.i1{fill:${QING}}.lf{fill:${tint(XIANGSI, 0.35)}}.r1{fill:${tint(ZHUAN, 0.7)}}.r2{fill:${BUTTER}}.r3{fill:${QING}}`,
    flat: [ZHUAN, CREAM, BUTTER, QING], lineColor: shade(ZHUAN, 0.5) },
];
const logoTile = (L, relief = true) => {
  let css = L.css;
  // 淺底的凸線要夠深才看得見
  const extra = L.lineColor ? `<style>.x${L.key} .ln *{stroke:${L.lineColor}!important}</style>` : '';
  const svg = tileSvg({ ground: L.ground, css, body: logoBody, relief });
  return L.lineColor ? svg.replace('class="tile ', `class="tile x${L.key} `).replace('</svg>', `${extra}</svg>`) : svg;
};
// 凍結版：64 以下不要凸線與葉；32 只留底、島、四角；16 只留底與島
const frozen = (L, px) => {
  const [g, isl, cor, rng] = L.flat;
  const k = px >= 64 ? 1.06 : px >= 32 ? 1.16 : 1.3, tf = `transform="translate(50 50) scale(${k}) translate(-50 -50)"`;
  const corners = px >= 32 ? [[0, 0], [100, 0], [100, 100], [0, 100]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="${px >= 64 ? 20 : 22}" fill="${cor}"/>`).join('') : '';
  const inner = px >= 32 ? `<path d="${BANDS[0]}" fill="${rng}" ${tf}/>` : '';
  return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="${px}" height="${px}"><g clip-path="url(#clip)"><rect width="100" height="100" fill="${g}"/>${corners}<path d="${px >= 48 ? coast : coastSoft}" fill="${isl}" ${tf} ${px < 32 ? `stroke="${isl}" stroke-width="4" stroke-linejoin="round"` : ''}/>${inner}</g></svg>`;
};
// 單色素線版
const lineTile = (color) =>
  `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="tile"><g fill="none" stroke="${color}" stroke-width="1.4" stroke-linejoin="round" stroke-linecap="round"><rect x="1" y="1" width="98" height="98" rx="3"/><g clip-path="url(#clip)">${logoBody.replace(/class="[^"]*"/g, '')}</g></g></svg>`;

// 四拼：角隅合成整朵
const wallOf = (L, n = 3) => `<div class="g">${Array.from({ length: n * n }, () => logoTile(L)).join('')}</div>`;

// ── 一般磚（文章封面、專題）：加進有機的花 ─────────────
const ORG = [
  { name: '缺瓣八重', body: () => ring(NOTCH, 8, 22.5, 'b') + ring(NOTCH, 4, 0, 'a') + ring(NOTCH_S, 4, 45, 'c') + '<circle class="f d" cx="50" cy="50" r="5"/>' },
  { name: '葉輪', body: () => [45, 135, 225, 315].map((a) => leaf(50, 50, a, 40, 0.26)).join('') + ring(NOTCH_S, 4, 0, 'a') + '<circle class="f d" cx="50" cy="50" r="4.5"/>' },
  { name: '角玫瑰與菱心', body: () => roses.replace(/r1/g, 'b').replace(/r2/g, 'a').replace(/r3/g, 'd') + '<path class="f c" d="M50 24C58 38 62 42 76 50C62 58 58 62 50 76C42 62 38 58 24 50C38 42 42 38 50 24Z"/>' + ring(NOTCH_S, 4, 0, 'a') + '<circle class="f d" cx="50" cy="50" r="4.5"/>' },
  { name: '對角葉', body: () => leaf(6, 6, 45, 40, 0.3) + leaf(94, 94, 225, 40, 0.3) + leaf(94, 6, 135, 26, 0.34) + leaf(6, 94, -45, 26, 0.34) + ring(NOTCH, 4, 45, 'a') + ring(NOTCH_S, 4, 0, 'b') + '<circle class="f d" cx="50" cy="50" r="5"/>' },
];
const orgTile = (k, [g, a, b, c, d, lf], lineColor) => {
  const svg = tileSvg({ ground: g, css: `.a{fill:${a}}.b{fill:${b}}.c{fill:${c}}.d{fill:${d}}.lf{fill:${lf}}`, body: ORG[k].body() });
  return lineColor ? svg.replace('</svg>', `<style>.o${k}l .ln *{stroke:${lineColor}!important}</style></svg>`).replace('class="tile ', `class="tile o${k}l `) : svg;
};
const ORG_SAMPLES = [
  [0, [QING_DEEP, tint(JIUCHONG, 0.35), tint(JIUCHONG, 0.7), BUTTER, ZHUAN, tint(QING, 0.5)], null, '美食', '珍珠奶茶'],
  [1, [CREAM, tint(JIUCHONG, 0.3), BUTTER, BUTTER, JIUCHONG, QING], mix(CREAM, '#8a7a5c', 0.55), '自然', '黑冠麻鷺'],
  [2, [LANQUE, CREAM, tint(LANQUE, 0.65), tint(LANQUE, 0.35), BUTTER, CREAM], shade(LANQUE, 0.45), '經濟', '台積電'],
  [3, [tint(XIANGSI, 0.72), JIUCHONG, tint(JIUCHONG, 0.55), BUTTER, BUTTER, XIANGSI], mix(CREAM, '#6f7a4c', 0.6), '文化', '布袋戲'],
  [0, [ZHUAN, CREAM, tint(ZHUAN, 0.6), BUTTER, QING, tint(XIANGSI, 0.4)], shade(ZHUAN, 0.5), '歷史', '台灣鐵路'],
  [2, [tint(QING, 0.7), JIUCHONG, tint(JIUCHONG, 0.5), QING, BUTTER, QING], mix(CREAM, '#3f6e63', 0.6), '人物', '陳樹菊'],
  [1, [KULIAN, tint(KULIAN, 0.6), BUTTER, BUTTER, CREAM, tint(KULIAN, 0.7)], shade(KULIAN, 0.45), '音樂', '台語歌'],
  [3, [QING_DEEP, BUTTER, CREAM, tint(ZHUAN, 0.3), JIUCHONG, tint(QING, 0.45)], null, '地理', '玉山'],
];

// ── 版面 ────────────────────────────────────────────────
const word = `<span class="lk-word">Taiwan<i>.md</i></span>`;
const header = (L, dark) => `<div class="hdr ${dark ? 'dark' : ''}"><span class="hdr-logo">${frozen(L, 64).replace('width="64" height="64"', '')}</span>${word}<nav><span>探索</span><span>數據</span><span>資源</span><span>關於</span></nav></div>`;
const logoSection = (L) => `
<section>
  <header><span class="k">${L.key}</span><h2>${L.name}</h2><p class="one">${L.note}</p></header>
  <div class="row">
    <div class="hero">${logoTile(L)}</div>
    <div class="col">
      <div class="sizes">${[128, 64, 32, 16].map((px) => `<figure><span style="width:${px}px;height:${px}px">${px >= 128 ? logoTile(L) : frozen(L, px)}</span><figcaption>${px}${px >= 128 ? '（完整）' : '（凍結）'}</figcaption></figure>`).join('')}</div>
      ${header(L, false)}${header(L, true)}
      <div class="appicons"><span class="app">${logoTile(L)}</span><span class="app sm">${frozen(L, 64).replace('width="64" height="64"', '')}</span><p>App 圖示：磚本來就是圓角方形</p></div>
    </div>
    <div class="wall">${wallOf(L)}<p>四塊拼起來，角落合成整朵</p></div>
  </div>
</section>`;

const html = `<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex">
<title>Taiwan.md 花磚識別 R2：一片磚</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,500&family=Noto+Sans+TC:wght@400;500;700&family=IBM+Plex+Mono&display=swap" rel="stylesheet">
<style>
:root{--ink:${INK};--ink2:${tokens.modes.light.tokens['ink-2']};--line:${tokens.modes.light.tokens.line};--dark:${tokens.modes.dark.surface};--brand:${tokens.modes.light.tokens.brand}}
*{box-sizing:border-box}body{margin:0;background:#fff;color:var(--ink);font:400 16px/1.7 "Noto Sans TC",system-ui,sans-serif}
main{max-width:1280px;margin:0 auto;padding:56px 24px 120px}
h1{font:500 44px/1.15 Newsreader,serif;margin:0 0 10px}.lede{max-width:46em;color:var(--ink2);margin:0 0 8px}.meta{font:400 12px/1.6 "IBM Plex Mono",monospace;color:var(--ink2)}
section{margin-top:84px}section>header{display:grid;grid-template-columns:auto 1fr;column-gap:18px;align-items:baseline;border-top:1px solid var(--ink);padding-top:14px}
.k{font:500 40px/1 Newsreader,serif}h2{font:700 24px/1.3 "Noto Sans TC";margin:0}.one{grid-column:2;margin:6px 0 0;max-width:46em;color:var(--ink2)}h3{font:700 15px/1.5 "Noto Sans TC";margin:40px 0 16px}
.tile{display:block;width:100%;height:auto;border-radius:3%}
.row{display:grid;grid-template-columns:400px 1fr 300px;gap:36px;margin-top:28px;align-items:start}
.hero .tile{box-shadow:0 1px 0 rgba(0,0,0,.12),0 14px 34px -18px rgba(10,30,34,.45)}
.sizes{display:flex;gap:22px;align-items:flex-end}figure{margin:0}figure span{display:block}figure svg{display:block;width:100%;height:100%;border-radius:12%}figcaption{font:400 11px/1 "IBM Plex Mono",monospace;margin-top:8px;color:var(--ink2)}
.hdr{display:flex;align-items:center;gap:9px;margin-top:22px;padding:11px 16px;border:1px solid var(--line)}.hdr.dark{background:var(--dark);border-color:var(--dark);color:${INK_D}}
.hdr-logo{width:30px;height:30px;display:block}.hdr-logo svg{display:block;width:100%;height:100%;border-radius:14%}
.lk-word{font:500 23px/1 Newsreader,serif;letter-spacing:-.012em}.lk-word i{font-style:normal;color:var(--brand)}.dark .lk-word i{color:${tokens.modes.dark.tokens.brand}}
.hdr nav{margin-left:auto;display:flex;gap:18px;font-size:13.5px;opacity:.75}
.appicons{display:flex;align-items:flex-end;gap:14px;margin-top:22px}.app{display:block;width:92px;height:92px;border-radius:22%;overflow:hidden;box-shadow:0 8px 20px -10px rgba(0,0,0,.5)}.app.sm{width:44px;height:44px}.app svg{display:block;width:100%;height:100%;border-radius:0}.appicons p,.wall p{font-size:12.5px;color:var(--ink2);margin:0}
.wall .g{display:grid;grid-template-columns:repeat(3,1fr)}.wall .tile{border-radius:0}.wall p{margin-top:8px}
.mono{display:grid;grid-template-columns:repeat(2,220px);gap:0}.mono>div{padding:28px}.mono .d{background:var(--dark)}
.cards{display:grid;grid-template-columns:repeat(8,1fr);gap:14px}.cat{font:400 11px/1.4 "IBM Plex Mono",monospace;color:var(--ink2);margin:8px 0 0}.ttl{font:500 14px/1.45 "Noto Sans TC";margin:2px 0 0}
.study{columns:2;column-gap:40px;max-width:none;font-size:14.5px}.study li{break-inside:avoid;margin-bottom:8px}
footer{margin-top:84px;border-top:1px solid var(--line);padding-top:16px;color:var(--ink2);font-size:13.5px;max-width:56em}
@media(max-width:1100px){.row{grid-template-columns:1fr}.hero{max-width:400px}.cards{grid-template-columns:repeat(4,1fr)}.study{columns:1}}
</style></head><body>
<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
<clipPath id="clip"><rect width="100" height="100" rx="3"/></clipPath>
<filter id="wob" x="-2%" y="-2%" width="104%" height="104%"><feTurbulence type="fractalNoise" baseFrequency=".045" numOctaves="2" seed="4"/><feDisplacementMap in="SourceGraphic" scale="1.3" xChannelSelector="R" yChannelSelector="G"/></filter>
<filter id="tube" x="-4%" y="-4%" width="108%" height="108%" color-interpolation-filters="sRGB">
  <feTurbulence type="fractalNoise" baseFrequency=".045" numOctaves="2" seed="4" result="n"/>
  <feDisplacementMap in="SourceGraphic" in2="n" scale="1.3" xChannelSelector="R" yChannelSelector="G" result="g"/>
  <feGaussianBlur in="g" stdDeviation=".9" result="sb"/><feOffset in="sb" dx=".5" dy=".7" result="so"/>
  <feComponentTransfer in="so" result="sh"><feFuncR type="linear" slope="0"/><feFuncG type="linear" slope="0"/><feFuncB type="linear" slope="0"/><feFuncA type="linear" slope=".42"/></feComponentTransfer>
  <feGaussianBlur in="g" stdDeviation=".55" result="hb"/>
  <feSpecularLighting in="hb" surfaceScale="2.4" specularConstant=".9" specularExponent="18" lighting-color="#ffffff" result="sp"><feDistantLight azimuth="225" elevation="52"/></feSpecularLighting>
  <feComposite in="sp" in2="g" operator="in" result="spc"/>
  <feMerge><feMergeNode in="sh"/><feMergeNode in="g"/><feMergeNode in="spc"/></feMerge>
</filter>
<linearGradient id="gloss" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".2"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".1"/></linearGradient>
</defs></svg>
<main>
<p class="meta">Taiwan.md 識別 · 花磚方向 · R2 樣張 · 2026-11-10</p>
<h1>一片磚，島是它的花</h1>
<p class="lede">R1 用很多塊磚拼島，放小就看不見磚。這一輪改成標誌就是一片磚：島在磚心當主花，四角各有四分之一朵花，四塊拼起來會合成整朵。左上和右下島讓出來的空位各放一枝葉。</p>
<p class="lede">島的輪廓與中央山脈那一道（海拔 900 公尺以上）由高程資料算出，跟十月的行島同一份。四個版本只差釉色。每個版本給：完整版、64／32／16 像素的凍結版、頁首實際大小、App 圖示、四拼。</p>
${LOGOS.map(logoSection).join('')}
<section>
  <header><span class="k">線</span><h2>單色素線版</h2><p class="one">刻印、浮水印、單色印刷用。同一組路徑，只留線。</p></header>
  <div class="mono"><div>${lineTile(INK)}</div><div class="d">${lineTile(INK_D)}</div></div>
</section>
<section>
  <header><span class="k">磚</span><h2>一般磚也改成有機的畫法</h2><p class="one">R1 的磚是圓和三角拼的，太幾何。這一輪加了有缺口的花瓣、有中脈的葉、凸起的白線、釉面的光。下面八片是文章封面磚的新樣子，釉色與分類的對應仍是暫定。</p></header>
  <h3>四種花型 × 八組釉色</h3>
  <div class="cards">${ORG_SAMPLES.map(([k, pal, lc, cat, ttl]) => `<article>${orgTile(k, pal, lc)}<p class="cat">${cat} · ${ORG[k].name}</p><p class="ttl">${ttl}</p></article>`).join('')}</div>
</section>
<section>
  <header><span class="k">學</span><h2>看實物學到的，用在哪裡</h2><p class="one">看了換日線那篇、花磚博物館的磚牆與一批老花磚照片之後，改了這幾件事。</p></header>
  <ul class="study">
    <li><b>線是凸起來的。</b>實物的白線高出釉面，粗細不勻，旁邊的釉積得比較深。這一輪的線有受光面，在釉面上落一點深色，整片加了很輕的手抖。</li>
    <li><b>綠底配粉花最常見。</b>深瓶綠、粉紅、奶油黃、釉白是實物的主調，鈷藍次之。L1 照這個配，奶油黃是新加的顏色，不在十月驗證過的六色裡。</li>
    <li><b>花瓣有缺口，葉有中脈。</b>玫瑰、牡丹一層包一層。島的等高帶我原本也做成三層，但在細長的島上讀起來不對，所以只留中央山脈一道，讓島像一片有中脈的葉。</li>
    <li><b>角落是四分之一朵。</b>單看一片不完整，四片拼起來才是整朵。這是花磚跟一般圖示最不一樣的地方，也是它能鋪成牆的原因。</li>
    <li><b>有主角的磚。</b>實物不全是四向對稱，很多是一朵花、一籃水果當主角放在中間。標誌磚照這一型做，島是主角。</li>
    <li><b>還沒學到的。</b>釉色的深淺漸層（凹處深、凸處淺）這一輪只用整片的光帶過，沒有逐瓣做。浮雕型的磚也還沒試。</li>
  </ul>
</section>
<footer>高程：Tilezen Terrain Tiles（AWS Open Data），同 v2。顏色：docs/brand/tokens.json 的圖表六色加釉白，奶油黃 ${BUTTER} 為暫定新增。產生器：docs/brand/tile/build-r2.mjs。標準字仍是網頁字型並排示意。凍結版是另外畫的簡化版，不是把完整版縮小。</footer>
</main></body></html>`;
fs.mkdirSync(path.join(HERE, 'r2'), { recursive: true });
fs.writeFileSync(path.join(HERE, 'r2/index.html'), html);
console.log(`ok ${(html.length / 1024).toFixed(0)} KB · coast ${coast.length} · bands ${BANDS.map((b) => b.length).join('/')}`);
