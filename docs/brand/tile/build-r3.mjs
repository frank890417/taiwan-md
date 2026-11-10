// 花磚識別 R3 樣張：島不照高度切，照花磚的分格切成彩色交錯（2026-11-10）。
// 哲宇 13:17 手繪三種切法＋「也許台灣本島的花磚切法不一定要照高度，也可以用類似這樣 變成彩色的交錯」
// 前半（高程→輪廓、花葉文法、tileSvg）與 build-r2.mjs 相同；定案後抽成共用模組。
// 哲宇 13:1x：「我是想要 logo是花磚拼成島（一片花磚，不是一堆花磚，不然會太小）」
//            「然後深度幫我研究大量花磚，讓樣式更好看更有機」
// 用法：node docs/brand/tile/build-r3.mjs  →  docs/brand/tile/r3/index.html
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
const BUTTER = '#f0d67c'; // 奶油黃
// 以下照兩張老花磚牆的照片取色（不在 v2 六色裡，R3 暫定；定案後要跑色彩驗證）
const MINT = '#93d6c6', TURQ = '#35a79b', BOTTLE = '#0d5343', ROSE = '#eba3ae', ROSE_D = '#cf5d79', CORAL = '#dc6a55', NAVY = '#26418c', LILAC = '#b9a8da';
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
  `<g transform="translate(${x} ${y}) rotate(${ang})"><path class="f lf" d="M0 0C${len * 0.2} ${-len * w} ${len * 0.72} ${-len * w * 0.85} ${len} 0C${len * 0.72} ${len * w * 0.85} ${len * 0.2} ${len * w} 0 0Z"/><path class="f lf2 nl" d="M${len * 0.06} 0C${len * 0.25} ${-len * w * 0.8} ${len * 0.7} ${-len * w * 0.7} ${len * 0.96} 0Z"/><path class="vein" d="M${len * 0.08} 0L${len * 0.9} 0M${len * 0.35} 0L${len * 0.5} ${-len * w * 0.45}M${len * 0.35} 0L${len * 0.5} ${len * w * 0.45}M${len * 0.6} 0L${len * 0.72} ${-len * w * 0.32}M${len * 0.6} 0L${len * 0.72} ${len * w * 0.32}"/></g>`;
// 角隅四分之一朵玫瑰：四塊磚拼起來是一整朵
const quarterRose = (rot) => {
  // 底盤兩圈＋三片兩色花瓣＋花心＋三點花蕊。四塊磚拼起來是一整朵十二瓣。
  const petal = 'M10.5 -1.8C15 -3.6 20 -6.2 25.5 -4.6C29.5 -2.8 29.5 2.8 25.5 4.6C20 6.2 15 3.6 10.5 1.8Z';
  const inner = 'M11.5 -1.1C15 -2.2 18.5 -3.4 21.5 -2.5C23.6 -1.5 23.6 1.5 21.5 2.5C18.5 3.4 15 2.2 11.5 1.1Z';
  const lobes = [15, 45, 75].map((a) => `<g transform="rotate(${a})"><path class="f p1" d="${petal}"/><path class="f p2 nl" d="${inner}"/></g>`).join('');
  const stamens = [20, 45, 70].map((a) => { const r = (a * Math.PI) / 180; return `<circle class="f p4 nl" cx="${(8 * Math.cos(r)).toFixed(1)}" cy="${(8 * Math.sin(r)).toFixed(1)}" r=".9"/>`; }).join('');
  return `<g transform="rotate(${rot} 50 50)"><path class="f m1" d="M0 0L30 0A30 30 0 0 1 0 30Z"/><path class="f m2" d="M0 0L27.4 0A27.4 27.4 0 0 1 0 27.4Z"/><g transform="scale(.86)">${lobes}</g><path class="f p3" d="M0 0L11 0A11 11 0 0 1 0 11Z"/>${stamens}<path class="f p4" d="M0 0L4.6 0A4.6 4.6 0 0 1 0 4.6Z"/></g>`;
};
// 邊中半朵小花：跟鄰磚合成一朵
const edgeBuds = [0, 90, 180, 270].map((a) => `<g transform="rotate(${a} 50 50)"><path class="f e1" d="M43.5 0A6.5 6.5 0 0 0 56.5 0Z"/><path class="f e2" d="M47.2 0A2.8 2.8 0 0 0 52.8 0Z"/></g>`).join('');
const stems = '<path class="vein" d="M21.5 21.5Q21 23 20 24M21.5 21.5Q12 26 9 37M78.5 78.5Q79 77 80 76M78.5 78.5Q88 74 91 63"/>';
const dew = [[33, 11], [11, 56], [22, 66], [89, 44], [78, 34], [67, 89], [38, 92], [62, 7.5]].map(([x, y], i) => `<circle class="arc" cx="${x}" cy="${y}" r="${i % 2 ? 0.9 : 0.6}"/>`).join('');
const NOTCH = 'M50 50C36 42 33 24 44 14C47 12 49 14 50 17C51 14 53 12 56 14C67 24 64 42 50 50Z'; // 有缺口的花瓣
const NOTCH_S = 'M50 50C42 45 40 35 46 29C48 28 49 29 50 31C51 29 52 28 54 29C60 35 58 45 50 50Z';
const ring = (d, n, off, cls) => Array.from({ length: n }, (_, i) => `<path class="f ${cls}" d="${d}" transform="rotate(${off + (360 / n) * i} 50 50)"/>`).join('');

// 一片磚：fills（釉面）＋ lines（凸線）兩層，凸線打光、在釉面上落一點深色
function tileSvg({ ground, css, body, relief = true, extra = '' }, size = '') {
  const id = 't' + Math.abs(hash(css + body)).toString(36);
  return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" ${size} class="tile ${id}"><style>.${id} .f{stroke:none}${css.replace(/(^|})\s*\./g, `$1.${id} .`)}.${id} .ln *{fill:none!important;stroke:${CREAM};stroke-width:1.25;stroke-linejoin:round;stroke-linecap:round}.${id} .ln .vein{stroke-width:.8}.${id} .fl .vein,.${id} .fl .arc{display:none}.${id} .ln .nl{display:none}</style>
<g clip-path="url(#clip)"><rect width="100" height="100" fill="${ground}"/><g class="fl" ${relief ? 'filter="url(#glaze)"' : ''}>${body}</g>${relief ? `<g class="ln" filter="url(#tube)">${body}</g><rect width="100" height="100" fill="url(#gloss)"/><rect x=".7" y=".7" width="98.6" height="98.6" rx="2.6" fill="none" stroke="#fff" stroke-opacity=".3" stroke-width="1.1"/>` : `<g class="ln">${body}</g>`}${extra}</g></svg>`;
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
      fills += `<path class="f nl c${(k * 2 + j * 3 + (k % 2)) % n}" d="${arc}L${f1(cx + w)} ${f1(y + step * 2.2)}L${f1(cx - w)} ${f1(y + step * 2.2)}Z"/>`;
      arcs += `<path class="arc" d="${arc}"/>`;
      arcs += `<path class="arc vein" d="M${f1(cx - w * 0.45)} ${f1(y + step * 0.95)}Q${f1(cx)} ${f1(y + step * 0.2)} ${f1(cx + w * 0.45)} ${f1(y + step * 0.95)}"/>`;
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
  { key: '鱗', name: '鱗瓣', note: '一排一排往下疊的拱，像花瓣、魚鱗、屋瓦。對應你畫的第一個。', full: cutScales(), mid: cutScales(13, 11.5), small: cutScales(20, 15) },
  { key: '脈', name: '葉脈', note: '一條彎的中脈順著島走，左右交錯分出側脈。對應你畫的第二個。島本來就像一片葉。', full: cutVeins(), mid: cutVeins(17), small: cutVeins(26) },
  { key: '裂', name: '冰裂', note: '不規則的格，像釉面的開片，也像彩色玻璃。對應你畫的第三個。', full: cutCrackle(), mid: cutCrackle(19, 6, 9), small: cutCrackle(27, 6, 3) },
];
const sprigs = leaf(9, 37, -62, 21) + leaf(20, 24, -28, 17, 0.34) + leaf(91, 63, 118, 21) + leaf(80, 76, 152, 17, 0.34);
const roses = [0, 90, 180, 270].map(quarterRose).join('') + edgeBuds + stems + dew;
const islandOf = (cut) => `<g clip-path="url(#isl)">${cut}</g><path class="co" d="${coast}"/>`;
const GROUNDS = [
  { key: 'g', name: '瓶綠釉底', ground: BOTTLE, cells: [ROSE, BUTTER, CREAM, MINT, CORAL, LILAC], lf: TURQ, lf2: MINT, m1: CREAM, m2: MINT, p: [ROSE, ROSE_D, BUTTER, CORAL], e: [BUTTER, CORAL], dw: BUTTER, line: null },
  { key: 'm', name: '薄荷釉底', ground: MINT, cells: [CREAM, ROSE, BUTTER, TURQ, CORAL, tint(NAVY, 0.25)], lf: BOTTLE, lf2: TURQ, m1: BOTTLE, m2: TURQ, p: [ROSE, ROSE_D, BUTTER, CORAL], e: [CREAM, ROSE_D], dw: CREAM, line: null },
  { key: 'w', name: '象牙釉底', ground: CREAM, cells: [TURQ, ROSE, BUTTER, NAVY, MINT, CORAL], lf: BOTTLE, lf2: TURQ, m1: TURQ, m2: MINT, p: [ROSE, ROSE_D, BUTTER, CORAL], e: [ROSE, ROSE_D], dw: TURQ, line: mix(CREAM, '#5d4a2c', 0.62) },
];
const cssOf = (G) => G.cells.map((c, i) => `.c${i}{fill:${c}}`).join('') + `.co{fill:none}.lf{fill:${G.lf}}.lf2{fill:${G.lf2}}.m1{fill:${G.m1}}.m2{fill:${G.m2}}.p1{fill:${G.p[0]}}.p2{fill:${G.p[1]}}.p3{fill:${G.p[2]}}.p4{fill:${G.p[3]}}.e1{fill:${G.e[0]}}.e2{fill:${G.e[1]}}.dw{fill:${G.dw}}`;
const logo = (cut, G, withDeco = true) => {
  const svg = tileSvg({ ground: G.ground, css: cssOf(G), body: (withDeco ? roses + sprigs : '') + islandOf(cut) });
  return G.line ? svg.replace('class="tile ', `class="tile ln${G.key} `).replace('</svg>', `<style>.ln${G.key} .ln *{stroke:${G.line}!important}</style></svg>`) : svg;
};
// 凍結版：沒有凸線濾鏡，格子變大變少，格與格之間留一條底色細縫
const frozen = (C, G, px) => {
  const cut = px >= 64 ? C.mid : C.small, k = px >= 64 ? 1.06 : px >= 32 ? 1.16 : 1.3;
  const cells = cut.replace(/<path class="arc[^>]*>/g, '').replace(/class="f (?:nl )?c(\d)"/g, (_, i) => `fill="${G.cells[i]}" stroke="${G.ground}" stroke-width="${px >= 64 ? 1.6 : px >= 32 ? 2.4 : 0}"`);
  const corners = px >= 32 ? [[0, 0], [100, 0], [100, 100], [0, 100]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="24" fill="${G.m1}"/><circle cx="${x}" cy="${y}" r="13" fill="${G.p[0]}"/>`).join('') : '';
  return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="${px}" height="${px}"><g clip-path="url(#clip)"><rect width="100" height="100" fill="${G.ground}"/>${corners}<g transform="translate(50 50) scale(${k}) translate(-50 -50)"><g clip-path="url(#${px >= 48 ? 'isl' : 'islS'})">${px >= 32 ? cells : `<rect width="100" height="100" fill="${G.cells[1]}"/>` + cells}</g></g></g></svg>`;
};
const word = `<span class="lk-word">Taiwan<i>.md</i></span>`;
const header = (C, G, dark) => `<div class="hdr ${dark ? 'dark' : ''}"><span class="hdr-logo">${frozen(C, G, 64).replace('width="64" height="64"', '')}</span>${word}<nav><span>探索</span><span>數據</span><span>資源</span><span>關於</span></nav></div>`;
const section = (C) => `
<section>
  <header><span class="k">${C.key}</span><h2>${C.name}</h2><p class="one">${C.note}</p></header>
  <div class="row">
    <div class="hero">${logo(C.full, GROUNDS[0])}</div>
    <div class="col">
      <div class="two">${GROUNDS.slice(1).map((G) => `<figure>${logo(C.full, G)}<figcaption>${G.name}</figcaption></figure>`).join('')}</div>
      <div class="sizes">${[64, 32, 16].map((px) => `<figure><span style="width:${px}px;height:${px}px">${frozen(C, GROUNDS[0], px)}</span><figcaption>${px}</figcaption></figure>`).join('')}${[64, 32, 16].map((px) => `<figure><span style="width:${px}px;height:${px}px">${frozen(C, GROUNDS[1], px)}</span><figcaption>${px}</figcaption></figure>`).join('')}</div>
      ${header(C, GROUNDS[0], false)}${header(C, GROUNDS[0], true)}
    </div>
    <div class="wall"><div class="g">${Array.from({ length: 9 }, () => logo(C.full, GROUNDS[0])).join('')}</div><p>九片拼牆</p></div>
  </div>
</section>`;

const html = `<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex">
<title>Taiwan.md 花磚識別 R3：島的切法</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,500&family=Noto+Sans+TC:wght@400;500;700&family=IBM+Plex+Mono&display=swap" rel="stylesheet">
<style>
:root{--ink:${INK};--ink2:${tokens.modes.light.tokens['ink-2']};--line:${tokens.modes.light.tokens.line};--dark:${tokens.modes.dark.surface};--brand:${tokens.modes.light.tokens.brand}}
*{box-sizing:border-box}body{margin:0;background:#fff;color:var(--ink);font:400 16px/1.7 "Noto Sans TC",system-ui,sans-serif}
main{max-width:1280px;margin:0 auto;padding:56px 24px 120px}
h1{font:500 44px/1.15 Newsreader,serif;margin:0 0 10px}.lede{max-width:46em;color:var(--ink2);margin:0 0 8px}.meta{font:400 12px/1.6 "IBM Plex Mono",monospace;color:var(--ink2)}
section{margin-top:84px}section>header{display:grid;grid-template-columns:auto 1fr;column-gap:18px;align-items:baseline;border-top:1px solid var(--ink);padding-top:14px}
.k{font:500 40px/1 "Noto Sans TC",serif}h2{font:700 24px/1.3 "Noto Sans TC";margin:0}.one{grid-column:2;margin:6px 0 0;max-width:46em;color:var(--ink2)}
.tile{display:block;width:100%;height:auto;border-radius:3%}
.row{display:grid;grid-template-columns:420px 1fr 280px;gap:36px;margin-top:28px;align-items:start}
.hero .tile{box-shadow:0 1px 0 rgba(0,0,0,.12),0 14px 34px -18px rgba(10,30,34,.45)}
.two{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.sizes{display:flex;gap:18px;align-items:flex-end;margin-top:22px}figure{margin:0}figure span{display:block}.sizes svg{display:block;width:100%;height:100%;border-radius:12%}figcaption{font:400 11px/1 "IBM Plex Mono",monospace;margin-top:8px;color:var(--ink2)}
.hdr{display:flex;align-items:center;gap:9px;margin-top:18px;padding:11px 16px;border:1px solid var(--line)}.hdr.dark{background:var(--dark);border-color:var(--dark);color:${INK_D}}
.hdr-logo{width:30px;height:30px;display:block}.hdr-logo svg{display:block;width:100%;height:100%;border-radius:14%}
.lk-word{font:500 23px/1 Newsreader,serif;letter-spacing:-.012em}.lk-word i{font-style:normal;color:var(--brand)}.dark .lk-word i{color:${tokens.modes.dark.tokens.brand}}
.hdr nav{margin-left:auto;display:flex;gap:18px;font-size:13.5px;opacity:.75}
.wall .g{display:grid;grid-template-columns:repeat(3,1fr)}.wall .tile{border-radius:0}.wall p{font-size:12.5px;color:var(--ink2);margin:8px 0 0}
.bare{display:grid;grid-template-columns:repeat(3,1fr);gap:28px;max-width:900px;margin-top:28px}
footer{margin-top:84px;border-top:1px solid var(--line);padding-top:16px;color:var(--ink2);font-size:13.5px;max-width:56em}
@media(max-width:1100px){.row{grid-template-columns:1fr}.hero{max-width:420px}}
</style></head><body>
<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
<clipPath id="clip"><rect width="100" height="100" rx="3"/></clipPath>
<clipPath id="isl"><path d="${coast}"/></clipPath><clipPath id="islS"><path d="${coastSoft}"/></clipPath>
<filter id="glaze" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
  <feTurbulence type="fractalNoise" baseFrequency=".045" numOctaves="2" seed="4" result="n"/>
  <feDisplacementMap in="SourceGraphic" in2="n" scale="1.3" xChannelSelector="R" yChannelSelector="G" result="d"/>
  <feTurbulence type="fractalNoise" baseFrequency=".11 .035" numOctaves="3" seed="9" result="m"/>
  <feColorMatrix in="m" type="matrix" values="0 0 0 0 .02  0 0 0 0 .08  0 0 0 0 .07  0 0 0 -.9 .52" result="dk"/>
  <feComposite in="dk" in2="d" operator="in" result="dkc"/>
  <feColorMatrix in="m" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  .9 0 0 0 -.36" result="lt"/>
  <feComposite in="lt" in2="d" operator="in" result="ltc"/>
  <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="1" seed="2" result="sp"/>
  <feColorMatrix in="sp" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -.3 .19" result="spk"/>
  <feComposite in="spk" in2="d" operator="in" result="spc"/>
  <feMerge><feMergeNode in="d"/><feMergeNode in="dkc"/><feMergeNode in="ltc"/><feMergeNode in="spc"/></feMerge>
</filter>
<filter id="tube" x="-4%" y="-4%" width="108%" height="108%" color-interpolation-filters="sRGB">
  <feTurbulence type="fractalNoise" baseFrequency=".045" numOctaves="2" seed="4" result="n"/>
  <feDisplacementMap in="SourceGraphic" in2="n" scale="1.3" xChannelSelector="R" yChannelSelector="G" result="g0"/>
  <feTurbulence type="fractalNoise" baseFrequency=".2" numOctaves="1" seed="7" result="n2"/>
  <feDisplacementMap in="g0" in2="n2" scale=".3" xChannelSelector="G" yChannelSelector="B" result="g"/>
  <feGaussianBlur in="g" stdDeviation="1.7" result="pb"/>
  <feColorMatrix in="pb" type="matrix" values="0 0 0 0 .02  0 0 0 0 .1  0 0 0 0 .1  0 0 0 .5 0" result="pool"/>
  <feGaussianBlur in="g" stdDeviation=".8" result="sb"/><feOffset in="sb" dx=".5" dy=".7" result="so"/>
  <feColorMatrix in="so" type="matrix" values="0 0 0 0 0  0 0 0 0 .05  0 0 0 0 .05  0 0 0 .5 0" result="sh"/>
  <feGaussianBlur in="g" stdDeviation=".55" result="hb"/>
  <feSpecularLighting in="hb" surfaceScale="2.6" specularConstant=".95" specularExponent="16" lighting-color="#ffffff" result="sp"><feDistantLight azimuth="225" elevation="50"/></feSpecularLighting>
  <feComposite in="sp" in2="g" operator="in" result="spc"/>
  <feMerge><feMergeNode in="pool"/><feMergeNode in="sh"/><feMergeNode in="g"/><feMergeNode in="spc"/></feMerge>
</filter>
<filter id="sheen" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
  <feTurbulence type="fractalNoise" baseFrequency=".014" numOctaves="2" seed="3" result="t"/>
  <feSpecularLighting in="t" surfaceScale="7" specularConstant=".75" specularExponent="30" lighting-color="#ffffff"><feDistantLight azimuth="235" elevation="60"/></feSpecularLighting>
</filter>
<linearGradient id="gloss" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".2"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".1"/></linearGradient>
</defs></svg>
<main>
<p class="meta">Taiwan.md 識別 · 花磚方向 · R3 樣張 · 2026-11-10</p>
<h1>島不照高度切，照磚的分格切</h1>
<p class="lede">R2 的島只有海岸和中央山脈兩色。這一輪照你畫的三種切法，把島分成很多格，每格一個釉色，格與格之間是凸起的線。三種切法各放在三種釉底上，另有 64／32／16 像素的簡化版（格子變大變少）、頁首實際大小、九片拼牆。</p>
<p class="lede">格子的顏色只求相鄰不同色，沒有對應任何資料。釉色改照老花磚牆的實物取：瓶綠、薄荷、象牙白、玫瑰粉、奶油黃、珊瑚、鈷藍、淡紫。釉面加了深淺不勻、線邊積釉、反光。四角的花改成有底盤的兩色玫瑰，邊中多了半朵小花，葉有兩色與梗。</p>
${CUTS.map(section).join('')}
<section>
  <header><span class="k">淨</span><h2>拿掉角花與葉，只留島</h2><p class="one">島變彩色之後，四角的花可能太多。這一排是只有底和島的樣子，給你比較。</p></header>
  <div class="bare">${CUTS.map((C) => `<figure>${logo(C.full, GROUNDS[0], false)}<figcaption>${C.name}</figcaption></figure>`).join('')}</div>
</section>
<footer>島的輪廓由高程資料算出（同 v2、同 R2）。三種切法都是程式生成：鱗瓣是沿島的中線排的拱，葉脈是一條正弦擺動的中脈加交錯側脈，冰裂是在島內撒點後取最近範圍。產生器：docs/brand/tile/build-r3.mjs。這一輪的釉色是照實物照片取的，不在十月驗證過的六色裡，都還沒跑色彩驗證。</footer>
</main></body></html>`;
fs.mkdirSync(path.join(HERE, 'r3'), { recursive: true });
fs.writeFileSync(path.join(HERE, 'r3/index.html'), html);
console.log(`ok ${(html.length / 1024).toFixed(0)} KB · y ${firstY}–${lastY}`);
