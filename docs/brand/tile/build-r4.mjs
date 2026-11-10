// 花磚識別 R4 樣張：R2 的配色與畫法，島改用三種彩色分格（2026-11-10）。
// 哲宇 13:3x 看完 R3b：「有好一點，但是顏色不漂亮 我反而覺得r2更好看」
// 前半與 build-r2.mjs 相同（配色、輪廓、花葉、tileSvg），切法取自 build-r3b.mjs；定案後抽共用模組。
// 哲宇 13:1x：「我是想要 logo是花磚拼成島（一片花磚，不是一堆花磚，不然會太小）」
//            「然後深度幫我研究大量花磚，讓樣式更好看更有機」
// 用法：node docs/brand/tile/build-r4.mjs  →  docs/brand/tile/r4/index.html
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
  return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" ${size} class="tile ${id}"><style>.${id} .f{stroke:none}${css.replace(/(^|})\s*\./g, `$1.${id} .`)}.${id} .ln *{fill:none!important;stroke:${CREAM};stroke-width:1.5;stroke-linejoin:round;stroke-linecap:round}.${id} .ln .vein{stroke-width:.8}.${id} .fl .vein,.${id} .fl .arc{display:none}.${id} .ln .nl{display:none}</style>
<g clip-path="url(#clip)"><rect width="100" height="100" fill="${ground}"/><g class="fl" ${relief ? 'filter="url(#wob)"' : ''}>${body}</g>${relief ? `<g class="ln" filter="url(#tube)">${body}</g><rect width="100" height="100" fill="url(#gloss)"/>` : `<g class="ln">${body}</g>`}${extra}</g></svg>`;
}
function hash(s) { let h = 0; for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0; return h; }

// ── 島的幾何：每一條水平線上的左右海岸與中線（磚座標）───
const rowSpan = (ty) => {
  const gy = Math.round((ty - IOY) / IS);
  if (gy < 0 || gy >= H) return null;
  let l = -1, r = -1;
  for (let x = 0; x < W; x++) if (landMask[gy * W + x] > 0.5) { if (l < 0) l = x; r = x; }
  return l < 0 ? null : [IOX + l * IS, IOX + r * IS];
};
const SPANS = []; for (let ty = 0; ty <= 100; ty++) SPANS[ty] = rowSpan(ty);
const firstY = SPANS.findIndex(Boolean), lastY = 100 - [...SPANS].reverse().findIndex(Boolean);
const mid = (ty) => { const y = Math.max(firstY, Math.min(lastY, Math.round(ty))); const s = SPANS[y]; return (s[0] + s[1]) / 2; };
const inside = (x, y) => { const s = SPANS[Math.round(y)]; return !!s && x >= s[0] && x <= s[1]; };
const P = (pts) => 'M' + pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join('L') + 'Z';
const cell = (d, i, n) => `<path class="f c${i % n}" d="${d}"/>`;

// 切法一：鱗瓣。一排一排往下疊，下面的蓋住上面的下緣，露出來的是一個個拱。
function cutScales(step = 9.5, w = 8.6, n = 6) {
  let fills = '', arcs = '', k = 0;
  const f1 = (v) => v.toFixed(1);
  for (let y = firstY - 3; y < lastY + step; y += step, k++) {
    const m = mid(y + step * 0.5), xs = k % 2 ? [-w, w] : [-2 * w, 0, 2 * w];
    xs.forEach((dx, j) => {
      const cx = m + dx, arc = `M${f1(cx - w)} ${f1(y + step)}C${f1(cx - w)} ${f1(y + step * 0.3)} ${f1(cx - w * 0.55)} ${f1(y)} ${f1(cx)} ${f1(y)}C${f1(cx + w * 0.55)} ${f1(y)} ${f1(cx + w)} ${f1(y + step * 0.3)} ${f1(cx + w)} ${f1(y + step)}`;
      fills += `<path class="f nl c${(k * 3 + j * 2) % n}" d="${arc}L${f1(cx + w)} ${f1(y + step * 2.2)}L${f1(cx - w)} ${f1(y + step * 2.2)}Z"/>`;
      arcs += `<path class="arc" d="${arc}"/>`;
      
    });
  }
  return fills + arcs;
}
// 切法二：葉脈。一條彎彎的中脈順著島的中線走，左右交錯分出側脈，脈與脈之間是一格。
function cutVeins(gap = 12, n = 6) {
  const spine = (y) => [mid(y) + 2.4 * Math.sin(y / 6.5), y];
  const branch = (y, side) => { // 從中脈往外、往上彎
    const [sx, sy] = spine(y), pts = [];
    for (let t = 0; t <= 1.0001; t += 0.125) {
      const cx = sx + side * 13, cy = sy + 1.5, ex = sx + side * 34, ey = sy - 15;
      pts.push([(1 - t) ** 2 * sx + 2 * (1 - t) * t * cx + t * t * ex, (1 - t) ** 2 * sy + 2 * (1 - t) * t * cy + t * t * ey]);
    }
    return pts;
  };
  const spineSeg = (y0, y1) => { const pts = []; for (let y = y0; y >= y1; y -= 2) pts.push(spine(y)); pts.push(spine(y1)); return pts; };
  let o = '', idx = 0;
  for (const side of [-1, 1]) {
    const ys = []; for (let y = firstY - 14 + (side > 0 ? gap / 2 : 0); y < lastY + 30; y += gap) ys.push(y);
    for (let i = 0; i < ys.length - 1; i++) {
      const a = branch(ys[i], side), b = branch(ys[i + 1], side);
      o += cell(P([...a, ...b.reverse(), ...spineSeg(ys[i + 1], ys[i])]), idx * 2 + (side > 0 ? 3 : 0) + i, n); idx++;
    }
  }
  return o;
}
// 切法三：冰裂。在島裡撒點，每一格是離那個點最近的範圍（Voronoi），像釉面的開片。
function cutCrackle(step = 14, n = 6, seed = 5) {
  let a = seed; const rnd = () => { a = (a * 1664525 + 1013904223) >>> 0; return a / 4294967296; };
  const seeds = [];
  for (let y = firstY + 3, k = 0; y < lastY; y += step * 0.82, k++)
    for (let x = 20 + (k % 2 ? step / 2 : 0); x < 82; x += step) {
      const px = x + (rnd() - 0.5) * step * 0.55, py = y + (rnd() - 0.5) * step * 0.5;
      if (inside(px, Math.min(99, Math.max(1, py))) || inside(px + 3, py) || inside(px - 3, py)) seeds.push([px, py]);
    }
  const clipHalf = (poly, [ax, ay], [bx, by]) => { // 留下離 a 比較近的那一半
    const mx = (ax + bx) / 2, my = (ay + by) / 2, nx = bx - ax, ny = by - ay, f = ([x, y]) => (x - mx) * nx + (y - my) * ny, out = [];
    for (let i = 0; i < poly.length; i++) {
      const p = poly[i], q = poly[(i + 1) % poly.length], fp = f(p), fq = f(q);
      if (fp <= 0) out.push(p);
      if ((fp < 0 && fq > 0) || (fp > 0 && fq < 0)) { const t = fp / (fp - fq); out.push([p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t]); }
    }
    return out;
  };
  const colors = [];
  return seeds.map((s, i) => {
    let poly = [[-20, -20], [120, -20], [120, 120], [-20, 120]];
    seeds.forEach((t, j) => { if (j !== i && poly.length) poly = clipHalf(poly, s, t); });
    // 顏色：避開最近四個鄰居已經用掉的
    const near = seeds.map((t, j) => [Math.hypot(t[0] - s[0], t[1] - s[1]), j]).filter(([, j]) => j < i).sort((p, q) => p[0] - q[0]).slice(0, 4).map(([, j]) => colors[j]);
    let c = i % n; for (let k = 0; k < n; k++) { if (!near.includes((i + k) % n)) { c = (i + k) % n; break; } }
    colors[i] = c;
    return poly.length ? cell(P(poly), c, n) : '';
  }).join('');
}


const CUTS = [
  { key: '鱗', name: '鱗瓣', full: cutScales(11.5, 10.2, 4), mid: cutScales(14, 12, 4), small: cutScales(20, 15, 4) },
  { key: '脈', name: '葉脈', full: cutVeins(14.5, 4), mid: cutVeins(18, 4), small: cutVeins(26, 4) },
  { key: '裂', name: '冰裂', full: cutCrackle(16.5, 4, 9), mid: cutCrackle(20, 4, 9), small: cutCrackle(27, 4, 3) },
];
const sprigs = leaf(9, 37, -62, 21) + leaf(20, 24, -28, 17, 0.34) + leaf(91, 63, 118, 21) + leaf(80, 76, 152, 17, 0.34);
const roses = [0, 90, 180, 270].map(quarterRose).join('');
const R2_ISLAND = `<path class="f i0" d="${coast}"/><path class="f i1" d="${BANDS[0]}"/>`;
const islandOf = (cut) => `<g clip-path="url(#isl)">${cut}</g><path class="co" d="${coast}"/>`;
// 四種釉底完全照 R2（L1–L4）。島的格子只用那一片磚自己已經有的顏色，四色以內。
const LOGOS = [
  { key: 'L1', name: '綠釉', ground: QING_DEEP, deco: `.lf{fill:${tint(QING, 0.45)}}.r1{fill:${tint(JIUCHONG, 0.55)}}.r2{fill:${tint(JIUCHONG, 0.2)}}.r3{fill:${BUTTER}}`, i: [CREAM, BUTTER], cells: [CREAM, BUTTER, tint(JIUCHONG, 0.55), tint(QING, 0.45)], corner: tint(JIUCHONG, 0.5) },
  { key: 'L2', name: '釉白', ground: CREAM, deco: `.lf{fill:${tint(XIANGSI, 0.3)}}.r1{fill:${tint(JIUCHONG, 0.6)}}.r2{fill:${tint(JIUCHONG, 0.25)}}.r3{fill:${BUTTER}}`, i: [tint(QING, 0.5), QING_DEEP], cells: [tint(QING, 0.5), QING_DEEP, tint(JIUCHONG, 0.6), BUTTER], corner: tint(JIUCHONG, 0.5), lineColor: mix(CREAM, '#8a7a5c', 0.55) },
  { key: 'L3', name: '海藍', ground: LANQUE, deco: `.lf{fill:${tint(LANQUE, 0.55)}}.r1{fill:${tint(LANQUE, 0.7)}}.r2{fill:${CREAM}}.r3{fill:${BUTTER}}`, i: [CREAM, BUTTER], cells: [CREAM, BUTTER, tint(LANQUE, 0.7), tint(LANQUE, 0.4)], corner: tint(LANQUE, 0.6), lineColor: shade(LANQUE, 0.45) },
  { key: 'L4', name: '紅磚', ground: ZHUAN, deco: `.lf{fill:${tint(XIANGSI, 0.35)}}.r1{fill:${tint(ZHUAN, 0.7)}}.r2{fill:${BUTTER}}.r3{fill:${QING}}`, i: [CREAM, QING], cells: [CREAM, QING, BUTTER, tint(ZHUAN, 0.7)], corner: BUTTER, lineColor: shade(ZHUAN, 0.5) },
];
const cssOf = (L) => L.deco + `.i0{fill:${L.i[0]}}.i1{fill:${L.i[1]}}.co{fill:none}` + L.cells.map((c, i) => `.c${i}{fill:${c}}`).join('');
const logo = (L, island) => {
  const svg = tileSvg({ ground: L.ground, css: cssOf(L), body: roses + sprigs + island });
  return L.lineColor ? svg.replace('class="tile ', `class="tile x${L.key} `).replace('</svg>', `<style>.x${L.key} .ln *{stroke:${L.lineColor}!important}</style></svg>`) : svg;
};
const frozen = (C, L, px) => {
  const cut = px >= 64 ? C.mid : C.small, k = px >= 64 ? 1.06 : px >= 32 ? 1.16 : 1.3;
  const cells = cut.replace(/<path class="arc[^>]*>/g, '').replace(/class="f (?:nl )?c(\d)"/g, (_, i) => `fill="${L.cells[i]}" stroke="${L.ground}" stroke-width="${px >= 64 ? 1.6 : px >= 32 ? 2.4 : 0}"`);
  const corners = px >= 32 ? [[0, 0], [100, 0], [100, 100], [0, 100]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="20" fill="${L.corner}"/>`).join('') : '';
  return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="${px}" height="${px}"><g clip-path="url(#clip)"><rect width="100" height="100" fill="${L.ground}"/>${corners}<g transform="translate(50 50) scale(${k}) translate(-50 -50)"><g clip-path="url(#${px >= 48 ? 'isl' : 'islS'})"><rect width="100" height="100" fill="${L.cells[0]}"/>${cells}</g></g></g></svg>`;
};
const word = `<span class="lk-word">Taiwan<i>.md</i></span>`;
const header = (C, L, dark) => `<div class="hdr ${dark ? 'dark' : ''}"><span class="hdr-logo">${frozen(C, L, 64).replace('width="64" height="64"', '')}</span>${word}<nav><span>探索</span><span>數據</span><span>資源</span><span>關於</span></nav></div>`;
const rowOf = (L) => `
<section>
  <header><span class="k">${L.key}</span><h2>${L.name}釉底</h2><p class="one">最左邊是 R2 原樣（海岸與中央山脈兩色），右邊三個是同一片磚、同一組顏色，島換成三種分格。</p></header>
  <div class="grid4"><figure>${logo(L, R2_ISLAND)}<figcaption>R2 原樣</figcaption></figure>${CUTS.map((C) => `<figure>${logo(L, islandOf(C.full))}<figcaption>${C.name}</figcaption></figure>`).join('')}</div>
  <div class="under">${CUTS.map((C) => `<div><div class="sizes">${[64, 32, 16].map((px) => `<figure><span style="width:${px}px;height:${px}px">${frozen(C, L, px)}</span><figcaption>${px}</figcaption></figure>`).join('')}</div>${header(C, L, false)}${header(C, L, true)}</div>`).join('')}</div>
</section>`;

const html = `<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex">
<title>Taiwan.md 花磚識別 R4：R2 的顏色，島分格</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,500&family=Noto+Sans+TC:wght@400;500;700&family=IBM+Plex+Mono&display=swap" rel="stylesheet">
<style>
:root{--ink:${INK};--ink2:${tokens.modes.light.tokens['ink-2']};--line:${tokens.modes.light.tokens.line};--dark:${tokens.modes.dark.surface};--brand:${tokens.modes.light.tokens.brand}}
*{box-sizing:border-box}body{margin:0;background:#fff;color:var(--ink);font:400 16px/1.7 "Noto Sans TC",system-ui,sans-serif}
main{max-width:1280px;margin:0 auto;padding:56px 24px 120px}
h1{font:500 44px/1.15 Newsreader,serif;margin:0 0 10px}.lede{max-width:46em;color:var(--ink2);margin:0 0 8px}.meta{font:400 12px/1.6 "IBM Plex Mono",monospace;color:var(--ink2)}
section{margin-top:76px}section>header{display:grid;grid-template-columns:auto 1fr;column-gap:18px;align-items:baseline;border-top:1px solid var(--ink);padding-top:14px}
.k{font:500 40px/1 Newsreader,serif}h2{font:700 24px/1.3 "Noto Sans TC";margin:0}.one{grid-column:2;margin:6px 0 0;max-width:46em;color:var(--ink2)}
.tile{display:block;width:100%;height:auto;border-radius:3%;box-shadow:0 1px 0 rgba(0,0,0,.1),0 12px 28px -18px rgba(10,30,34,.45)}
.grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:22px;margin-top:26px}
.under{display:grid;grid-template-columns:repeat(4,1fr);gap:22px;margin-top:18px}.under>div:first-child{grid-column:2}
figure{margin:0}figcaption{font:400 11.5px/1 "IBM Plex Mono",monospace;margin-top:9px;color:var(--ink2)}
.sizes{display:flex;gap:16px;align-items:flex-end}.sizes span{display:block}.sizes svg{display:block;width:100%;height:100%;border-radius:12%}
.hdr{display:flex;align-items:center;gap:8px;margin-top:12px;padding:9px 12px;border:1px solid var(--line)}.hdr.dark{background:var(--dark);border-color:var(--dark);color:${INK_D}}
.hdr-logo{width:28px;height:28px;display:block}.hdr-logo svg{display:block;width:100%;height:100%;border-radius:14%}
.lk-word{font:500 21px/1 Newsreader,serif;letter-spacing:-.012em}.lk-word i{font-style:normal;color:var(--brand)}.dark .lk-word i{color:${tokens.modes.dark.tokens.brand}}
.hdr nav{display:none}
footer{margin-top:76px;border-top:1px solid var(--line);padding-top:16px;color:var(--ink2);font-size:13.5px;max-width:56em}
@media(max-width:1000px){.grid4,.under{grid-template-columns:repeat(2,1fr)}.under>div:first-child{grid-column:auto}}
</style></head><body>
<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
<clipPath id="clip"><rect width="100" height="100" rx="3"/></clipPath>
<clipPath id="isl"><path d="${coast}"/></clipPath><clipPath id="islS"><path d="${coastSoft}"/></clipPath>
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
<p class="meta">Taiwan.md 識別 · 花磚方向 · R4 樣張 · 2026-11-10</p>
<h1>回到 R2 的顏色，只換島的切法</h1>
<p class="lede">你說 R2 比較好看、R3 的顏色不漂亮。這一版把 R2 整片搬回來：四種釉底、四角的花、兩枝葉、釉面的畫法都跟 R2 一模一樣。只改一件事，島從兩色換成你畫的三種分格。</p>
<p class="lede">格子的顏色不新增，只用那一片磚上本來就有的顏色，四個以內。每一列最左邊放 R2 原樣當對照。</p>
${LOGOS.map(rowOf).join('')}
<footer>配色與 R2 相同：docs/brand/tokens.json 的圖表六色調出的深淺，加釉白與奶油黃 ${BUTTER}（奶油黃仍未跑色彩驗證）。切法與 R3 相同，格子放大。產生器：docs/brand/tile/build-r4.mjs。</footer>
</main></body></html>`;
fs.mkdirSync(path.join(HERE, 'r4/shots'), { recursive: true });
fs.writeFileSync(path.join(HERE, 'r4/index.html'), html);
console.log(`ok ${(html.length / 1024).toFixed(0)} KB`);
