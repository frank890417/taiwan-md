// 花磚識別 R1 樣張產生器（2026-11-10）。
// 用法：node docs/brand/tile/build-r1.mjs  →  docs/brand/tile/r1/index.html
// 資料：docs/brand/source/terrain/taiwan-elev-q4.json（v2 識別同一份高程）、
//       docs/brand/tokens.json（v2 驗證過的圖表六色）、knowledge/ 的 frontmatter（文章磚）。
// 圖樣全部由下面的文法生成，沒有描任何實物或參考圖。
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '../../..');
const elev = JSON.parse(
  fs.readFileSync(path.join(ROOT, 'docs/brand/source/terrain/taiwan-elev-q4.json'), 'utf8'),
);
const tokens = JSON.parse(fs.readFileSync(path.join(ROOT, 'docs/brand/tokens.json'), 'utf8'));
const identity = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/brand/identity.json'), 'utf8'));

// ── 顏色 ────────────────────────────────────────────────
const [QING, LANQUE, JIUCHONG, XIANGSI, KULIAN, ZHUAN] = tokens.categorical.light;
const GLAZE_WHITE = '#f8f4ea'; // 釉白：凸線與留白
const BISQUE = '#eadbc8'; // 素燒：還沒上釉的胎
const BISQUE_LINE = '#cdb89f';
const INK = tokens.modes.light.tokens['ink-1'];
const INK_DARK = tokens.modes.dark.tokens['ink-1'];
const hex = (c) => [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16));
const mix = (c, d, t) => {
  const a = hex(c), b = hex(d);
  return '#' + a.map((v, i) => Math.round(v + (b[i] - v) * t).toString(16).padStart(2, '0')).join('');
};
const tint = (c, t) => mix(c, GLAZE_WHITE, t);

// ── 亂數（可重現）───────────────────────────────────────
const fnv = (s) => {
  let h = 0x811c9dc5;
  for (const ch of Buffer.from(String(s))) { h ^= ch; h = Math.imul(h, 0x01000193); }
  return h >>> 0;
};
const rng = (seed) => {
  let a = seed >>> 0;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};
const pick = (r, xs) => xs[Math.floor(r() * xs.length)];

// ── 磚的文法：100×100，四向對稱 ─────────────────────────
// 角隅（四塊拼起來會合成一朵）＋邊中（跟鄰磚合成一個）＋中心花＋可選內框。
const R4 = (d, attrs) =>
  [0, 90, 180, 270].map((a) => `<path d="${d}" transform="rotate(${a} 50 50)" ${attrs}/>`).join('');
const R4o = (d, attrs) =>
  [45, 135, 225, 315].map((a) => `<path d="${d}" transform="rotate(${a} 50 50)" ${attrs}/>`).join('');
const CORNER = {
  qc: 'M0 0L30 0A30 30 0 0 1 0 30Z',
  tri: 'M0 0L32 0L0 32Z',
  leaf: 'M0 0C24 3 33 12 36 36C12 33 3 24 0 0Z',
};
const EDGE = { half: 'M37 0A13 13 0 0 0 63 0Z', dia: 'M35 0L50 15L65 0Z' };
const PETAL = 'M50 50C37 39 39 19 50 11C61 19 63 39 50 50Z';
const PETAL_S = 'M50 50C42 43 43 31 50 26C57 31 58 43 50 50Z';
const star8 = (R, r) =>
  Array.from({ length: 16 }, (_, i) => {
    const a = (i * Math.PI) / 8 - Math.PI / 2, q = i % 2 ? r : R;
    return `${(50 + q * Math.cos(a)).toFixed(1)} ${(50 + q * Math.sin(a)).toFixed(1)}`;
  }).join(' ');

function tile(spec, pal, { line = false, lineColor = 'currentColor', lw = 2.6 } = {}) {
  const st = line
    ? `stroke="${lineColor}" stroke-width="${lw}" stroke-linejoin="round"`
    : `stroke="${pal.w}" stroke-width="${lw}" stroke-linejoin="round"`;
  const f = (c) => (line ? `fill="${pal.g}"` : `fill="${c}"`);
  let o = `<rect x="1.5" y="1.5" width="97" height="97" rx="2" ${f(pal.g)} ${line ? st : ''}/>`;
  o += '<g clip-path="url(#tc)">';
  if (spec.frame) o += `<rect x="9" y="9" width="82" height="82" fill="none" ${st}/>`;
  if (spec.corner === 'ring') {
    o += R4(CORNER.qc, `${f(pal.a)} ${st}`) + R4('M0 0L16 0A16 16 0 0 1 0 16Z', `${f(pal.b)} ${st}`);
  } else if (CORNER[spec.corner]) o += R4(CORNER[spec.corner], `${f(pal.a)} ${st}`);
  if (EDGE[spec.edge]) o += R4(EDGE[spec.edge], `${f(pal.b)} ${st}`);
  switch (spec.center) {
    case 'petal4': o += R4(PETAL, `${f(pal.a)} ${st}`); break;
    case 'petal8': o += R4o(PETAL, `${f(pal.b)} ${st}`) + R4(PETAL, `${f(pal.a)} ${st}`); break;
    case 'petal4s': o += R4(PETAL, `${f(pal.a)} ${st}`) + R4o(PETAL_S, `${f(pal.b)} ${st}`); break;
    case 'quatre':
      o += [[50, 34], [66, 50], [50, 66], [34, 50]]
        .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="13" ${f(pal.a)} ${st}/>`).join('');
      break;
    case 'diamond':
      o += `<path d="M50 20L80 50L50 80L20 50Z" ${f(pal.a)} ${st}/><path d="M50 36L64 50L50 64L36 50Z" ${f(pal.b)} ${st}/>`;
      break;
    case 'star8': o += `<polygon points="${star8(31, 15)}" ${f(pal.a)} ${st}/>`; break;
    case 'ring':
      o += `<circle cx="50" cy="50" r="27" ${f(pal.a)} ${st}/><circle cx="50" cy="50" r="15" ${f(pal.b)} ${st}/>`;
      break;
  }
  if (spec.center && spec.dot !== false) o += `<circle cx="50" cy="50" r="5.5" ${f(pal.c || pal.b)} ${st}/>`;
  return o + '</g>';
}

const CORNERS = ['qc', 'tri', 'leaf', 'ring'];
const EDGES = ['half', 'dia', 'none'];
const CENTERS = ['petal4', 'petal8', 'petal4s', 'quatre', 'diamond', 'star8', 'ring'];
const specFrom = (seed) => {
  const r = rng(seed);
  return { corner: pick(r, CORNERS), edge: pick(r, EDGES), center: pick(r, CENTERS), frame: r() < 0.3 };
};

// ── 符號庫 ──────────────────────────────────────────────
const symbols = new Map();
const sym = (id, body) => { if (!symbols.has(id)) symbols.set(id, body); return id; };
const use = (id, x, y, s = 100) => `<use href="#${id}" x="${x}" y="${y}" width="${s}" height="${s}"/>`;

// ── 島的格子 ────────────────────────────────────────────
const { width: EW, height: EH, m: EM } = elev;
function grid(cols) {
  const cs = EW / cols, rows = Math.round(EH / cs);
  const cells = [];
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    let land = 0, sum = 0, n = 0, max = 0;
    for (let y = Math.floor(r * cs); y < Math.min(EH, Math.floor((r + 1) * cs)); y++)
      for (let x = Math.floor(c * cs); x < Math.min(EW, Math.floor((c + 1) * cs)); x++) {
        const v = EM[y * EW + x]; n++;
        if (v > 0) { land++; sum += v; if (v > max) max = v; }
      }
    cells.push({ r, c, frac: n ? land / n : 0, mean: land ? sum / land : 0, max });
  }
  return { cols, rows, cells };
}
const islandCells = (g, minFrac = 0.42) => g.cells.filter((c) => c.frac >= minFrac);
const peakOf = (cells) => cells.reduce((a, b) => (b.max > a.max ? b : a));
const band = (m) => (m < 80 ? 0 : m < 450 ? 1 : m < 1300 ? 2 : m < 2400 ? 3 : 4);
const svgWrap = (g, inner, extra = '') =>
  `<svg viewBox="0 0 ${g.cols * 100} ${g.rows * 100}" xmlns="http://www.w3.org/2000/svg" ${extra}>${inner}</svg>`;

// 五階高程各一款磚。平原不用綠：紅磚橙（花磚真正貼在的閩南紅磚屋）；往山上走變冷。
const BAND_PAL = [
  { g: tint(ZHUAN, 0.86), a: ZHUAN, b: tint(JIUCHONG, 0.55), c: GLAZE_WHITE, w: GLAZE_WHITE },
  { g: tint(XIANGSI, 0.8), a: XIANGSI, b: tint(ZHUAN, 0.45), c: GLAZE_WHITE, w: GLAZE_WHITE },
  { g: tint(QING, 0.72), a: QING, b: GLAZE_WHITE, c: tint(ZHUAN, 0.3), w: GLAZE_WHITE },
  { g: LANQUE, a: tint(LANQUE, 0.62), b: GLAZE_WHITE, c: LANQUE, w: GLAZE_WHITE },
  { g: KULIAN, a: GLAZE_WHITE, b: tint(KULIAN, 0.6), c: KULIAN, w: GLAZE_WHITE },
];
const BAND_SPEC = [
  { corner: 'qc', edge: 'none', center: 'petal4', frame: false },
  { corner: 'leaf', edge: 'none', center: 'quatre', frame: false },
  { corner: 'tri', edge: 'half', center: 'petal8', frame: false },
  { corner: 'ring', edge: 'none', center: 'star8', frame: false },
  { corner: 'qc', edge: 'dia', center: 'diamond', frame: false },
];
const PEAK_PAL = { g: JIUCHONG, a: GLAZE_WHITE, b: tint(JIUCHONG, 0.55), c: JIUCHONG, w: GLAZE_WHITE };
const PEAK_SPEC = { corner: 'qc', edge: 'none', center: 'petal8', frame: false };
BAND_SPEC.forEach((s, i) => sym(`a${i}`, tile(s, BAND_PAL[i])));
sym('apeak', tile(PEAK_SPEC, PEAK_PAL));

// A 釉色地形磚島
function markA(cols = 12) {
  const g = grid(cols), cells = islandCells(g), pk = peakOf(cells);
  return svgWrap(g, cells.map((c) => use(c === pk ? 'apeak' : `a${band(c.mean)}`, c.c * 100, c.r * 100)).join(''));
}
// B 素磚加一塊上釉
function markB(cols = 12, dark = false) {
  const g = grid(cols), cells = islandCells(g), pk = peakOf(cells);
  const k = dark ? 'd' : 'l';
  BAND_SPEC.forEach((s, i) =>
    sym(`b${k}${i}`, tile(s, { g: 'none' }, { line: true, lineColor: dark ? INK_DARK : INK, lw: 2.2 })));
  return svgWrap(g, cells.map((c) => use(c === pk ? 'apeak' : `b${k}${band(c.mean)}`, c.c * 100, c.r * 100)).join(''));
}
// D 馬賽克磚
const BAND_FLAT = [tint(ZHUAN, 0.35), tint(XIANGSI, 0.3), QING, LANQUE, KULIAN];
function markD(cols = 26) {
  const g = grid(cols), cells = islandCells(g, 0.5), pk = peakOf(cells), r = rng(7);
  return svgWrap(g, cells.map((c) => {
    const base = c === pk ? JIUCHONG : BAND_FLAT[band(c.mean)];
    const j = r(), col = j < 0.5 ? mix(base, '#ffffff', j * 0.36) : mix(base, '#10202a', (j - 0.5) * 0.3);
    return `<rect x="${c.c * 100 + 7}" y="${c.r * 100 + 7}" width="86" height="86" rx="10" fill="${col}"/>`;
  }).join(''));
}

// C 文章磚：一格一篇，有人審過的才上釉
const CATS = ['About', 'Art', 'Culture', 'Economy', 'Food', 'Geography', 'History', 'Lifestyle', 'Music', 'Nature', 'People', 'Politics', 'Society', 'Technology'];
const CAT_ZH = { About: '關於', Art: '藝術', Culture: '文化', Economy: '經濟', Food: '美食', Geography: '地理', History: '歷史', Lifestyle: '生活', Music: '音樂', Nature: '自然', People: '人物', Politics: '政治', Society: '社會', Technology: '科技' };
const articles = [];
for (const cat of CATS) {
  const dir = path.join(ROOT, 'knowledge', cat);
  if (!fs.existsSync(dir)) continue;
  for (const f of fs.readdirSync(dir)) {
    if (!f.endsWith('.md') || f.startsWith('_')) continue;
    const head = fs.readFileSync(path.join(dir, f), 'utf8').slice(0, 3000);
    const m = head.match(/^lastHumanReview:\s*(.*)$/m);
    const v = m ? m[1].trim().replace(/^['"]|['"]$/g, '') : '';
    const t = head.match(/^title:\s*(.*)$/m);
    articles.push({ cat, slug: f.replace(/\.md$/, ''), reviewed: !!v && v !== 'false' && v !== 'null', title: t ? t[1].trim().replace(/^['"]|['"]$/g, '') : f.replace(/\.md$/, '') });
  }
}
const reviewedN = articles.filter((a) => a.reviewed).length;
// 每個分類一款固定圖樣（只用中心花，小格看得清）
const CAT_SPEC = Object.fromEntries(CATS.map((c, i) => [c, { corner: ['qc', 'tri', 'none', 'leaf'][i % 4], edge: 'none', center: CENTERS[i % CENTERS.length], frame: false, dot: false }]));
const C_GLAZE = { g: QING, a: GLAZE_WHITE, b: tint(QING, 0.5), w: GLAZE_WHITE };
for (const c of CATS) {
  sym(`cg${c}`, tile(CAT_SPEC[c], C_GLAZE, { lw: 4 }));
  sym(`cu${c}`, tile(CAT_SPEC[c], { g: BISQUE }, { line: true, lineColor: BISQUE_LINE, lw: 3 }));
}
function markC() {
  // 找一個欄數，讓島的格數剛好裝得下全部文章；取陸地比例最高的那幾格
  let cols = 30, g, cells;
  for (; cols < 60; cols++) { g = grid(cols); cells = islandCells(g, 0.3); if (cells.length >= articles.length) break; }
  cells = [...cells].sort((a, b) => b.frac - a.frac).slice(0, articles.length).sort((a, b) => a.r - b.r || a.c - b.c);
  // 位置沒有意義：文章照 slug 的雜湊打散
  const order = [...articles].sort((a, b) => fnv(a.slug) - fnv(b.slug));
  return { cols, svg: svgWrap(g, cells.map((c, i) => use(`${order[i].reviewed ? 'cg' : 'cu'}${order[i].cat}`, c.c * 100, c.r * 100)).join('')) };
}

// E 合成：C 的規則（一格一篇、審過才上釉）＋ A 的長相（釉色照那一格的高程）
const E_PAL = [
  { g: ZHUAN, a: GLAZE_WHITE, b: tint(ZHUAN, 0.5), w: GLAZE_WHITE },
  { g: XIANGSI, a: GLAZE_WHITE, b: tint(XIANGSI, 0.5), w: GLAZE_WHITE },
  { g: QING, a: GLAZE_WHITE, b: tint(QING, 0.5), w: GLAZE_WHITE },
  { g: LANQUE, a: GLAZE_WHITE, b: tint(LANQUE, 0.5), w: GLAZE_WHITE },
  { g: KULIAN, a: GLAZE_WHITE, b: tint(KULIAN, 0.5), w: GLAZE_WHITE },
];
for (const c of CATS) E_PAL.forEach((pal, i) => sym(`e${i}${c}`, tile(CAT_SPEC[c], pal, { lw: 4 })));
function markE() {
  let cols = 30, g, cells;
  for (; cols < 60; cols++) { g = grid(cols); cells = islandCells(g, 0.3); if (cells.length >= articles.length) break; }
  cells = [...cells].sort((a, b) => b.frac - a.frac).slice(0, articles.length).sort((a, b) => a.r - b.r || a.c - b.c);
  const order = [...articles].sort((a, b) => fnv(a.slug) - fnv(b.slug));
  return svgWrap(g, cells.map((c, i) => use(order[i].reviewed ? `e${band(c.mean)}${order[i].cat}` : `cu${order[i].cat}`, c.c * 100, c.r * 100)).join(''));
}
const flatE = (cols) => { const r = rng(11); return flat(cols, (c) => (r() < reviewedN / articles.length ? [ZHUAN, XIANGSI, QING, LANQUE, KULIAN][band(c.mean)] : BISQUE_LINE)); };

// 小尺寸凍結版：沒有花，只有色塊
function flat(cols, colorOf, gap = 6, minFrac = 0.42) {
  const g = grid(cols), cells = islandCells(g, minFrac), pk = peakOf(cells);
  return svgWrap(g, cells.map((c) =>
    `<rect x="${c.c * 100 + gap}" y="${c.r * 100 + gap}" width="${100 - gap * 2}" height="${100 - gap * 2}" fill="${colorOf(c, c === pk)}"/>`).join(''));
}
const flatA = (cols) => flat(cols, (c, pk) => (pk ? JIUCHONG : [ZHUAN, XIANGSI, QING, LANQUE, KULIAN][band(c.mean)]));
const flatB = (cols, dark) => flat(cols, (c, pk) => (pk ? JIUCHONG : dark ? INK_DARK : INK));
const flatC = (cols) => { const r = rng(11); return flat(cols, () => (r() < reviewedN / articles.length ? QING : BISQUE_LINE)); };

// ── 應用：文章封面磚、專題主磚、磚縫分隔 ───────────────
const FAMILY = [QING, LANQUE, JIUCHONG, XIANGSI, KULIAN, ZHUAN];
function articleTile(a) {
  const r = rng(fnv(a.cat)), base = FAMILY[CATS.indexOf(a.cat) % 6], second = pick(r, FAMILY.filter((x) => x !== base));
  const spec = { ...specFrom(fnv(a.slug)), corner: CAT_SPEC[a.cat].corner === 'none' ? 'qc' : CAT_SPEC[a.cat].corner };
  const dark = fnv(a.slug) % 3 === 0;
  const pal = dark
    ? { g: base, a: GLAZE_WHITE, b: tint(second, 0.5), c: base, w: GLAZE_WHITE }
    : { g: tint(base, 0.82), a: base, b: tint(second, 0.45), c: GLAZE_WHITE, w: GLAZE_WHITE };
  return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">${tile(spec, pal)}</svg>`;
}
const wall = (seedStr, base, second, n = 3) => {
  const spec = specFrom(fnv(seedStr));
  const pal = { g: tint(base, 0.84), a: base, b: tint(second, 0.5), c: GLAZE_WHITE, w: GLAZE_WHITE };
  const id = sym(`w${fnv(seedStr)}`, tile(spec, pal));
  let o = '';
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) o += use(id, x * 100, y * 100);
  return `<svg viewBox="0 0 ${n * 100} ${n * 100}" xmlns="http://www.w3.org/2000/svg">${o}</svg>`;
};
const sampleSlugs = ['珍珠奶茶', '台灣鐵路', '陳樹菊', '黑冠麻鷺', '全民健康保險', '台積電', '布袋戲', '玉山'];
const samples = sampleSlugs.map((s) => articles.find((a) => a.slug === s) || articles.find((a) => a.slug.includes(s))).filter(Boolean);
while (samples.length < 8) samples.push(articles[(samples.length * 137) % articles.length]);
const TOPICS = [['housing', '房地產', ZHUAN, JIUCHONG], ['health', '醫療與長照', QING, LANQUE], ['industry', '產業', LANQUE, ZHUAN], ['income', '薪資・稅・退休', XIANGSI, ZHUAN], ['names', '台灣人的名字', KULIAN, JIUCHONG]];
const divider = (() => {
  const ids = [0, 1, 2, 3, 4].map((i) => `a${i}`);
  let o = '';
  for (let i = 0; i < 28; i++) o += use(ids[[0, 0, 1, 2, 3, 4, 3, 2, 1, 0][i % 10]], i * 100, 0);
  return `<svg viewBox="0 0 2800 100" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">${o}</svg>`;
})();

// ── 版面 ────────────────────────────────────────────────
const C = markC();
const lockup = (mark) =>
  `<div class="lockup"><span class="lk-mark">${mark}</span><span class="lk-word">Taiwan<i>.md</i></span></div>`;
const sizes = (fn) => [64, 32, 16].map((px) => `<figure class="sz"><span style="height:${px}px">${fn(px)}</span><figcaption>${px}</figcaption></figure>`).join('');
const panel = (cls, big, lk, small) =>
  `<div class="panel ${cls}"><div class="big">${big}</div><div class="side">${lockup(lk)}<div class="sizes">${small}</div></div></div>`;
const section = (key, name, line, strong, weak, rule, light, dark) => `
<section id="${key}">
  <header><span class="k">${key.toUpperCase()}</span><h2>${name}</h2><p class="one">${line}</p></header>
  <div class="pair">${light}${dark}</div>
  <dl><div><dt>強</dt><dd>${strong}</dd></div><div><dt>弱</dt><dd>${weak}</dd></div><div><dt>選它，規範會寫</dt><dd>${rule}</dd></div></dl>
</section>`;

const sA = section('a', '釉色地形磚島', '磚格拼出本島，釉色照高程分五階。平原是紅磚橙，往山上走變冷，最高的一塊（玉山）用九重葛。',
  '最接近原本那張小圖：遠看是地形，近看是磚。平原不再是綠的。', '五種磚加一塊主峰，是四個方向裡最熱鬧的，放小會吵，所以 64 px 以下改用沒有花的色塊版。',
  '高程五階各對應哪一款磚、哪一組釉色。主版 12 欄。小尺寸用色塊凍結版。',
  panel('light', markA(12), flatA(8), sizes((px) => flatA(px >= 64 ? 12 : px >= 32 ? 8 : 6))),
  panel('dark', markA(12), flatA(8), sizes((px) => flatA(px >= 64 ? 12 : px >= 32 ? 8 : 6))));
const sB = section('b', '素磚加一塊上釉', '全部是墨線素磚，只有玉山那一塊上了釉。',
  '最克制，接得上 v2 的墨與紙。單色印刷、浮水印、刻印都能用。', '少了顏色，溫度靠那一塊九重葛撐。',
  '線寬與行島圖示同一個語彙。上釉的那一塊永遠只有一塊。',
  panel('light', markB(12, false), flatB(8, false), sizes((px) => flatB(px >= 64 ? 12 : px >= 32 ? 8 : 6, false))),
  panel('dark', markB(12, true), flatB(8, true), sizes((px) => flatB(px >= 64 ? 12 : px >= 32 ? 8 : 6, true))));
const sC = section('c', '文章磚', `${articles.length} 格，一格是一篇中文文章。圖樣照分類，有人審閱過的 ${reviewedN} 篇上了臺灣青的釉，其餘是還沒上釉的素燒。位置由檔名打散，沒有地理意義。`,
  '標誌就是資料，每次建置都會變。審一篇，島上就多一塊上釉。', `現在上釉的只有 ${(reviewedN / articles.length * 100).toFixed(1)}%，看起來就是這麼空。這是照實。`,
  '上釉的條件（lastHumanReview）。格數等於文章數。每個分類一款固定圖樣。',
  panel('light', C.svg, flatC(10), sizes((px) => flatC(px >= 64 ? 14 : px >= 32 ? 8 : 6))),
  panel('dark', C.svg, flatC(10), sizes((px) => flatC(px >= 64 ? 14 : px >= 32 ? 8 : 6))));
const sD = section('d', '馬賽克磚', '不用彩瓷花磚，用 1960 年代起貼在門面、澡缸、灶腳的小顆馬賽克磚。每一顆的釉色深淺略有不同。',
  '最日常、最不像紀念品。本來就是像素，縮到多小都成立。', '沒有花，辨識度只靠輪廓與顏色，跟一般像素地圖的距離比較近。',
  '磚縫寬度、每顆釉色的深淺變化範圍、五階顏色。',
  panel('light', markD(26), markD(14), sizes((px) => (px >= 64 ? markD(18) : flatA(px >= 32 ? 8 : 6)))),
  panel('dark', markD(26), markD(14), sizes((px) => (px >= 64 ? markD(18) : flatA(px >= 32 ? 8 : 6)))));

const sE = section('e', '合成：文章磚的規則，地形磚的釉色', `一格一篇、審過才上釉（同 C），上釉的磚照它落在的那一格高程取色（同 A）。現在是 ${reviewedN} 塊有顏色。全部審完的那一天，它會長成 A。`,
  '把 A 和 C 接成同一件事的兩個時間點：C 是現在，A 是終點。', '現在的樣子還是很空，而且位置沒有地理意義這件事要說清楚。',
  '同 C，加上釉色照高程五階。對外用 A 當標準版，這一版當「現況版」放在儀表板與關於頁。',
  panel('light', markE(), flatE(10), sizes((px) => flatE(px >= 64 ? 14 : px >= 32 ? 8 : 6))),
  panel('dark', markE(), flatE(10), sizes((px) => flatE(px >= 64 ? 14 : px >= 32 ? 8 : 6))));

const apps = `
<section id="apps">
  <header><span class="k">應用</span><h2>同一套文法能長出什麼</h2><p class="one">下面三樣都用 A 的磚文法生成。分類與釉色的對應是暫定的。</p></header>
  <h3>文章封面磚：沒有封面圖的文章，由檔名生一塊自己的磚</h3>
  <div class="cards">${samples.slice(0, 8).map((a) => `<article><div class="cover">${articleTile(a)}</div><p class="cat">${CAT_ZH[a.cat]}</p><p class="ttl">${a.title.replace(/</g, '&lt;')}</p></article>`).join('')}</div>
  <h3>專題主磚：一個專題一面牆</h3>
  <div class="topics">${TOPICS.map(([id, zh, a, b]) => `<article><div class="wall">${wall(id, a, b)}</div><p class="ttl">${zh}</p><p class="cat">/${id}/</p></article>`).join('')}</div>
  <h3>磚縫分隔線</h3>
  <div class="divider">${divider}</div>
</section>`;

const html = `<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex"><title>Taiwan.md 花磚識別 R1 樣張</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,500&family=Noto+Sans+TC:wght@400;500;700&family=IBM+Plex+Mono&display=swap" rel="stylesheet">
<style>
:root{--ink:${INK};--ink2:${tokens.modes.light.tokens['ink-2']};--line:${tokens.modes.light.tokens.line};--paper2:${tokens.modes.light.tokens['paper-2']};--dark:${tokens.modes.dark.surface};--brand:${tokens.modes.light.tokens.brand}}
*{box-sizing:border-box}body{margin:0;background:#fff;color:var(--ink);font:400 16px/1.7 "Noto Sans TC",system-ui,sans-serif}
main{max-width:1240px;margin:0 auto;padding:56px 24px 120px}
h1{font:500 44px/1.15 Newsreader,serif;margin:0 0 10px;letter-spacing:-.01em}.lede{max-width:44em;color:var(--ink2);margin:0 0 8px}
.meta{font:400 12px/1.6 "IBM Plex Mono",monospace;color:var(--ink2)}
section{margin-top:88px}section>header{display:grid;grid-template-columns:auto 1fr;column-gap:18px;align-items:baseline;border-top:1px solid var(--ink);padding-top:14px}
.k{font:500 40px/1 Newsreader,serif}h2{font:700 24px/1.3 "Noto Sans TC";margin:0}.one{grid-column:2;margin:6px 0 0;max-width:46em;color:var(--ink2)}
h3{font:700 15px/1.5 "Noto Sans TC";margin:44px 0 16px}
.pair{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:24px}
.panel{display:grid;grid-template-columns:minmax(0,1fr) 190px;gap:20px;padding:32px 28px;border:1px solid var(--line);align-items:center}
.panel.dark{background:var(--dark);border-color:var(--dark);color:${INK_DARK}}
.big svg{display:block;height:470px;width:auto;margin:0 auto;max-width:100%}
.lockup{display:flex;align-items:center;gap:9px}.lk-mark svg{display:block;height:46px;width:auto}
.lk-word{font:500 25px/1 Newsreader,serif;letter-spacing:-.012em}.lk-word i{font-style:normal;color:var(--brand)}.dark .lk-word i{color:${tokens.modes.dark.tokens.brand}}
.sizes{display:flex;gap:18px;align-items:flex-end;margin-top:40px}.sz{margin:0;text-align:center}.sz span{display:block}.sz svg{height:100%;width:auto;display:block;margin:0 auto}
.sz figcaption{font:400 11px/1 "IBM Plex Mono",monospace;margin-top:8px;opacity:.6}
dl{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin:20px 0 0}dt{font:700 12px/1.4 "Noto Sans TC";letter-spacing:.08em;color:var(--ink2)}dd{margin:4px 0 0;font-size:14.5px}
.cards{display:grid;grid-template-columns:repeat(8,1fr);gap:14px}.topics{display:grid;grid-template-columns:repeat(5,1fr);gap:18px}
.cover svg,.wall svg{display:block;width:100%;height:auto}.cat{font:400 11px/1.4 "IBM Plex Mono",monospace;color:var(--ink2);margin:8px 0 0}.ttl{font:500 14px/1.45 "Noto Sans TC";margin:2px 0 0}
.divider svg{display:block;width:100%;height:34px}
footer{margin-top:88px;border-top:1px solid var(--line);padding-top:16px;color:var(--ink2);font-size:13.5px;max-width:52em}
@media(max-width:900px){.pair{grid-template-columns:1fr}.panel{grid-template-columns:1fr}.big svg{height:380px}dl{grid-template-columns:1fr}.cards{grid-template-columns:repeat(4,1fr)}.topics{grid-template-columns:repeat(2,1fr)}}
</style></head><body>
<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs><clipPath id="tc"><rect x="1.5" y="1.5" width="97" height="97" rx="2"/></clipPath>
${[...symbols].map(([id, body]) => `<symbol id="${id}" viewBox="0 0 100 100">${body}</symbol>`).join('\n')}</defs></svg>
<main>
<p class="meta">Taiwan.md 識別 · 花磚方向 · R1 樣張 · 2026-11-10</p>
<h1>用磚拼一座島</h1>
<p class="lede">四個方向加一個合成，同一份高程資料（跟十月的行島同一份），同一套六色。每個方向在白底與深色底各放一次，右邊是標準字並排與 64、32、16 像素的小尺寸。</p>
<p class="lede">圖樣全部由程式依文法生成：四向對稱，角隅四塊拼成一朵，白色凸線把釉色隔開。沒有描任何實物。</p>
${sA}${sB}${sC}${sD}${sE}${apps}
<footer>高程：${identity.island.source}。顏色：docs/brand/tokens.json 的圖表六色（臺灣青、藍鵲藍、九重葛、相思綠、苦楝紫、紅磚橙）加釉白。文章數與審閱狀態：建置當下 knowledge/ 的 frontmatter。產生器：docs/brand/tile/build-r1.mjs。標準字這一版只是用網頁字型並排示意，還沒轉外框。</footer>
</main></body></html>`;

fs.mkdirSync(path.join(HERE, 'r1'), { recursive: true });
fs.writeFileSync(path.join(HERE, 'r1/index.html'), html);
console.log(`ok ${(html.length / 1024).toFixed(0)} KB · 文章 ${articles.length} · 已審 ${reviewedN} · C 欄數 ${C.cols} · 符號 ${symbols.size}`);
