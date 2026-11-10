/**
 * chart.ts — 房貸工具的 SVG 圖（純函式，回傳字串；伺服端與瀏覽器端共用同一份）
 *
 * 四張圖：
 *   repaymentChart  每年還款的本金與利息（堆疊長條）＋貸款餘額線（右軸）
 *   paymentLines    每月應繳金額隨時間的階梯線，可疊兩個情境對照
 *   ratioRuler      負擔率刻度尺，標出使用者、所選縣市、全國
 *   netWorthLines   買與租兩條淨資產線與交叉年份
 *
 * 配色規則：兩個系列用藍（實線／本金）與橘（虛線／利息），不靠紅綠分辨；
 * 顏色由 housing-tools.css 的 hst-* class 承接，這裡只寫 class，不寫色碼。
 * 文字標籤全部由呼叫端傳入（i18n），這裡不含任何自然語言。
 */
import { scaleLinear, niceTicks, estTextW } from '../budgetViz.ts';
import { escapeHtml } from './format.ts';

/** 圖表兩套幾何：寬版 760（桌機）、窄版 380（手機）；CSS 只顯示其中一套。 */
export const WIDTHS: readonly number[] = [760, 380];

/** 一次產出寬、窄兩個 SVG，包進各自的容器；CSS 依螢幕寬度顯示其一。 */
export function dualChart(build: (W: number) => string): string {
  return (
    `<span class="hst-fig hst-fig-wide">${build(WIDTHS[0])}</span>` +
    `<span class="hst-fig hst-fig-narrow">${build(WIDTHS[1])}</span>`
  );
}

const f = (n: number): string => n.toFixed(1);

function open(W: number, H: number, title: string, desc: string): string {
  return (
    `<svg class="hst-svg" viewBox="0 0 ${W} ${H}" role="img" ` +
    `aria-label="${escapeHtml(title)}" xmlns="http://www.w3.org/2000/svg">` +
    `<title>${escapeHtml(title)}</title><desc>${escapeHtml(desc)}</desc>`
  );
}

interface LegendItem {
  label: string;
  kind: 'p' | 'i' | 'a' | 'b' | 'ink';
}

/** 圖例排版：放不下就換行。回傳 svg 片段與總高度。 */
function legend(
  items: LegendItem[],
  W: number,
  y0: number,
): { svg: string; height: number } {
  const gap = 18;
  const sw = 22;
  let x = 8;
  let y = y0;
  let out = '';
  for (const it of items) {
    const w = sw + 6 + estTextW(it.label, 12, 6.8);
    if (x + w > W - 8 && x > 8) {
      x = 8;
      y += 20;
    }
    const cy = y + 6;
    if (it.kind === 'p' || it.kind === 'i') {
      out += `<rect class="hst-bar-${it.kind}" x="${f(x)}" y="${f(cy - 5)}" width="${sw}" height="10" rx="2"/>`;
    } else {
      out += `<line class="hst-line-${it.kind}" x1="${f(x)}" y1="${f(cy)}" x2="${f(x + sw)}" y2="${f(cy)}"/>`;
    }
    out += `<text class="hst-t" x="${f(x + sw + 6)}" y="${f(cy + 4)}">${escapeHtml(it.label)}</text>`;
    x += w + gap;
  }
  return { svg: out, height: y - y0 + 20 };
}

// ── 一、每年還款堆疊長條＋餘額線 ──────────────────────────────────────

export interface YearRow {
  year: number;
  principal: number;
  interest: number;
  /** 該年年底的貸款餘額 */
  balance: number;
}

export interface RepaymentChartOpts {
  rows: YearRow[];
  startBalance: number;
  W: number;
  title: string;
  desc: string;
  labels: {
    principal: string;
    interest: string;
    balance: string;
    axisLeft: string;
    axisRight: string;
    year: string;
  };
  fmtY: (v: number) => string;
}

export function repaymentChart(o: RepaymentChartOpts): string {
  const { W, rows } = o;
  const ml = W >= 600 ? 58 : 46;
  const mr = W >= 600 ? 62 : 48;
  const mt = 30;
  const plotH = 190;
  const mb = 40;
  const lg = legend(
    [
      { label: o.labels.principal, kind: 'p' },
      { label: o.labels.interest, kind: 'i' },
      { label: o.labels.balance, kind: 'ink' },
    ],
    W,
    mt + plotH + mb + 4,
  );
  const H = mt + plotH + mb + 4 + lg.height;
  const innerW = W - ml - mr;
  const n = Math.max(1, rows.length);
  const band = innerW / n;
  const bw = Math.max(2, band * 0.78);
  const maxPay = Math.max(1, ...rows.map((r) => r.principal + r.interest));
  const tl = niceTicks(maxPay, 4);
  const yL = scaleLinear(0, tl[tl.length - 1], mt + plotH, mt);
  const maxBal = Math.max(1, o.startBalance, ...rows.map((r) => r.balance));
  const tr = niceTicks(maxBal, 4);
  const yR = scaleLinear(0, tr[tr.length - 1], mt + plotH, mt);

  let s = open(W, H, o.title, o.desc);
  for (const v of tl) {
    s += `<line class="hst-grid" x1="${ml}" x2="${W - mr}" y1="${f(yL(v))}" y2="${f(yL(v))}"/>`;
    s += `<text class="hst-t" x="${ml - 6}" y="${f(yL(v) + 4)}" text-anchor="end">${escapeHtml(o.fmtY(v))}</text>`;
  }
  for (const v of tr) {
    s += `<text class="hst-t" x="${W - mr + 6}" y="${f(yR(v) + 4)}">${escapeHtml(o.fmtY(v))}</text>`;
  }
  s += `<text class="hst-t hst-t-strong" x="${ml}" y="14">${escapeHtml(o.labels.axisLeft)}</text>`;
  s += `<text class="hst-t hst-t-strong" x="${W - mr}" y="14" text-anchor="end">${escapeHtml(o.labels.axisRight)}</text>`;

  rows.forEach((r, i) => {
    const x = ml + i * band + (band - bw) / 2;
    const yP = yL(r.principal);
    const base = yL(0);
    const yTop = yL(r.principal + r.interest);
    if (r.principal > 0)
      s += `<rect class="hst-bar-p" x="${f(x)}" y="${f(yP)}" width="${f(bw)}" height="${f(base - yP)}"/>`;
    if (r.interest > 0)
      s += `<rect class="hst-bar-i" x="${f(x)}" y="${f(yTop)}" width="${f(bw)}" height="${f(yP - yTop)}"/>`;
  });

  const pts = [{ x: ml, y: yR(o.startBalance) }].concat(
    rows.map((r, i) => ({ x: ml + (i + 1) * band, y: yR(r.balance) })),
  );
  s += `<path class="hst-line-ink" fill="none" d="${pts
    .map((p, i) => `${i === 0 ? 'M' : 'L'}${f(p.x)},${f(p.y)}`)
    .join(' ')}"/>`;

  const maxTicks = W >= 600 ? 10 : 6;
  const stepYears = n <= maxTicks ? 1 : n > 30 ? 10 : n > 12 ? 5 : 2;
  rows.forEach((r, i) => {
    const show =
      n <= maxTicks ? true : r.year === 1 || r.year % stepYears === 0;
    if (!show) return;
    s += `<text class="hst-t" x="${f(ml + i * band + band / 2)}" y="${mt + plotH + 16}" text-anchor="middle">${r.year}</text>`;
  });
  s += `<text class="hst-t" x="${W - mr}" y="${mt + plotH + 34}" text-anchor="end">${escapeHtml(o.labels.year)}</text>`;
  s += `<line class="hst-axis" x1="${ml}" x2="${W - mr}" y1="${mt + plotH}" y2="${mt + plotH}"/>`;
  s += lg.svg;
  return `${s}</svg>`;
}

// ── 二、每月應繳金額的階梯線 ─────────────────────────────────────────

export interface PaySeries {
  label: string;
  cls: 'a' | 'b';
  /** 每期一點，month 從 1 起 */
  points: { month: number; payment: number }[];
}

export interface PaymentLinesOpts {
  series: PaySeries[];
  totalMonths: number;
  W: number;
  title: string;
  desc: string;
  axisLeft: string;
  axisBottom: string;
  fmtY: (v: number) => string;
}

/** 只保留金額變動處，並補上垂直段，畫成階梯。 */
export function stepPath(
  pts: { month: number; payment: number }[],
  x: (m: number) => number,
  y: (v: number) => number,
): string {
  if (!pts.length) return '';
  let d = `M${f(x(pts[0].month))},${f(y(pts[0].payment))}`;
  let prev = pts[0].payment;
  for (let i = 1; i < pts.length; i++) {
    const p = pts[i];
    if (Math.abs(p.payment - prev) > 0.5) {
      d += ` L${f(x(p.month))},${f(y(prev))} L${f(x(p.month))},${f(y(p.payment))}`;
      prev = p.payment;
    }
  }
  const last = pts[pts.length - 1];
  d += ` L${f(x(last.month))},${f(y(prev))}`;
  return d;
}

export function paymentLines(o: PaymentLinesOpts): string {
  const { W } = o;
  const ml = W >= 600 ? 58 : 46;
  const mr = 14;
  const mt = 30;
  const plotH = 180;
  const mb = 40;
  const lg = legend(
    o.series.map((s) => ({ label: s.label, kind: s.cls })),
    W,
    mt + plotH + mb + 4,
  );
  const H = mt + plotH + mb + 4 + lg.height;
  const maxV = Math.max(
    1,
    ...o.series.flatMap((s) => s.points.map((p) => p.payment)),
  );
  const ty = niceTicks(maxV, 4);
  const y = scaleLinear(0, ty[ty.length - 1], mt + plotH, mt);
  const x = scaleLinear(1, Math.max(2, o.totalMonths), ml, W - mr);

  let s = open(W, H, o.title, o.desc);
  for (const v of ty) {
    s += `<line class="hst-grid" x1="${ml}" x2="${W - mr}" y1="${f(y(v))}" y2="${f(y(v))}"/>`;
    s += `<text class="hst-t" x="${ml - 6}" y="${f(y(v) + 4)}" text-anchor="end">${escapeHtml(o.fmtY(v))}</text>`;
  }
  s += `<text class="hst-t hst-t-strong" x="${ml}" y="14">${escapeHtml(o.axisLeft)}</text>`;
  const totalYears = Math.ceil(o.totalMonths / 12);
  const stepY =
    totalYears > 30 ? 10 : totalYears > 12 ? 5 : totalYears > 6 ? 2 : 1;
  for (let yr = 0; yr <= totalYears; yr += stepY) {
    const px = x(Math.max(1, yr * 12));
    s += `<text class="hst-t" x="${f(px)}" y="${mt + plotH + 16}" text-anchor="${yr === 0 ? 'start' : 'middle'}">${yr}</text>`;
  }
  s += `<text class="hst-t" x="${W - mr}" y="${mt + plotH + 34}" text-anchor="end">${escapeHtml(o.axisBottom)}</text>`;
  s += `<line class="hst-axis" x1="${ml}" x2="${W - mr}" y1="${mt + plotH}" y2="${mt + plotH}"/>`;
  // 先畫橘（對照）再畫藍（主情境），藍線在上
  for (const ser of [...o.series].sort((a, b) => (a.cls < b.cls ? 1 : -1))) {
    s += `<path class="hst-line-${ser.cls}" fill="none" d="${stepPath(ser.points, x, y)}"/>`;
  }
  s += lg.svg;
  return `${s}</svg>`;
}

// ── 三、負擔率刻度尺 ─────────────────────────────────────────────────

export interface RulerMarker {
  kind: 'you' | 'county' | 'nation';
  value: number;
  label: string;
}

export interface RatioRulerOpts {
  W: number;
  title: string;
  desc: string;
  /** 分級，from/to 為百分比；最後一級 to 可為 null（延伸到刻度尺末端） */
  bands: { from: number; to: number | null; label: string }[];
  markers: RulerMarker[];
}

function clampLabel(
  cx: number,
  text: string,
  W: number,
): { x: number; anchor: string } {
  const w = estTextW(text, 12, 6.8);
  const left = cx - w / 2;
  if (left < 4) return { x: 4, anchor: 'start' };
  if (left + w > W - 4) return { x: W - 4, anchor: 'end' };
  return { x: cx, anchor: 'middle' };
}

export function ratioRuler(o: RatioRulerOpts): string {
  const { W } = o;
  const maxMarker = Math.max(0, ...o.markers.map((m) => m.value));
  const lastFrom = o.bands.length ? o.bands[o.bands.length - 1].from : 0;
  const max = Math.max(lastFrom + 20, Math.ceil((maxMarker * 1.08) / 10) * 10);
  const ml = 14;
  const mr = 14;
  const x = scaleLinear(0, max, ml, W - mr);
  const railTop = 62;
  const railH = 28;
  const H = railTop + railH + 76;

  let s = open(W, H, o.title, o.desc);
  o.bands.forEach((b, i) => {
    const x0 = x(b.from);
    const x1 = x(b.to ?? max);
    s += `<rect class="hst-band hst-band-${i}" x="${f(x0)}" y="${railTop}" width="${f(x1 - x0)}" height="${railH}"/>`;
    if (estTextW(b.label, 12, 6.8) <= x1 - x0 - 6) {
      s += `<text class="hst-t hst-t-band" x="${f((x0 + x1) / 2)}" y="${railTop + railH / 2 + 4}" text-anchor="middle">${escapeHtml(b.label)}</text>`;
    }
    if (i > 0) {
      s += `<text class="hst-t" x="${f(x0)}" y="${railTop - 4}" text-anchor="middle">${b.from}%</text>`;
      s += `<line class="hst-tick" x1="${f(x0)}" x2="${f(x0)}" y1="${railTop - 1}" y2="${railTop + railH}"/>`;
    }
  });

  for (const m of o.markers) {
    const cx = x(Math.min(m.value, max));
    const text = m.label;
    const lab = clampLabel(cx, text, W);
    if (m.kind === 'you') {
      s += `<path class="hst-mk-you" d="M${f(cx - 8)},${railTop - 22} L${f(cx + 8)},${railTop - 22} L${f(cx)},${railTop - 8} Z"/>`;
      s += `<line class="hst-mk-line" x1="${f(cx)}" x2="${f(cx)}" y1="${railTop - 8}" y2="${railTop + railH}"/>`;
      s += `<text class="hst-t hst-t-strong" x="${f(lab.x)}" y="${railTop - 28}" text-anchor="${lab.anchor}">${escapeHtml(text)}</text>`;
    } else if (m.kind === 'nation') {
      const yb = railTop + railH;
      s += `<path class="hst-mk-nation" d="M${f(cx - 7)},${yb + 14} L${f(cx + 7)},${yb + 14} L${f(cx)},${yb + 1} Z"/>`;
      s += `<text class="hst-t" x="${f(lab.x)}" y="${yb + 30}" text-anchor="${lab.anchor}">${escapeHtml(text)}</text>`;
    } else {
      const yb = railTop + railH;
      s += `<line class="hst-mk-line" x1="${f(cx)}" x2="${f(cx)}" y1="${yb}" y2="${yb + 40}"/>`;
      s += `<rect class="hst-mk-county" x="${f(cx - 5)}" y="${yb + 36}" width="10" height="10" transform="rotate(45 ${f(cx)} ${yb + 41})"/>`;
      s += `<text class="hst-t" x="${f(lab.x)}" y="${yb + 62}" text-anchor="${lab.anchor}">${escapeHtml(text)}</text>`;
    }
  }
  return `${s}</svg>`;
}

// ── 四、買與租的淨資產線 ─────────────────────────────────────────────

export interface NetWorthRow {
  year: number;
  buy: number;
  rent: number;
}

export interface NetWorthOpts {
  rows: NetWorthRow[];
  crossYear: number | null;
  W: number;
  title: string;
  desc: string;
  labels: {
    buy: string;
    rent: string;
    cross: string;
    axisLeft: string;
    axisBottom: string;
  };
  fmtY: (v: number) => string;
}

/** 含負值的刻度：沿用 niceTicks 的間距，向兩側延伸。 */
function signedTicks(min: number, max: number): number[] {
  const top = Math.max(Math.abs(min), Math.abs(max), 1);
  const t = niceTicks(top, 4);
  const step = t.length > 1 ? t[1] - t[0] : top;
  const lo = Math.floor(Math.min(0, min) / step) * step;
  const hi = Math.ceil(Math.max(0, max) / step) * step;
  const out: number[] = [];
  for (let v = lo; v <= hi + 1e-6; v += step) out.push(+v.toFixed(6));
  return out;
}

export function netWorthLines(o: NetWorthOpts): string {
  const { W, rows } = o;
  const ml = W >= 600 ? 62 : 50;
  const mr = 14;
  const mt = 30;
  const plotH = 190;
  const mb = 40;
  const lg = legend(
    [
      { label: o.labels.buy, kind: 'a' },
      { label: o.labels.rent, kind: 'b' },
    ],
    W,
    mt + plotH + mb + 4,
  );
  const H = mt + plotH + mb + 4 + lg.height;
  const all = rows.flatMap((r) => [r.buy, r.rent]);
  const ticks = signedTicks(Math.min(0, ...all), Math.max(0, ...all));
  const y = scaleLinear(ticks[0], ticks[ticks.length - 1], mt + plotH, mt);
  const first = rows.length ? rows[0].year : 1;
  const last = rows.length ? rows[rows.length - 1].year : 2;
  const x = scaleLinear(first, Math.max(first + 1, last), ml, W - mr);

  let s = open(W, H, o.title, o.desc);
  for (const v of ticks) {
    s += `<line class="${v === 0 ? 'hst-axis' : 'hst-grid'}" x1="${ml}" x2="${W - mr}" y1="${f(y(v))}" y2="${f(y(v))}"/>`;
    s += `<text class="hst-t" x="${ml - 6}" y="${f(y(v) + 4)}" text-anchor="end">${escapeHtml(o.fmtY(v))}</text>`;
  }
  s += `<text class="hst-t hst-t-strong" x="${ml}" y="14">${escapeHtml(o.labels.axisLeft)}</text>`;
  const stepY = last > 30 ? 10 : last > 12 ? 5 : last > 6 ? 2 : 1;
  for (let yr = first; yr <= last; yr++) {
    if (yr !== first && yr % stepY !== 0) continue;
    s += `<text class="hst-t" x="${f(x(yr))}" y="${mt + plotH + 16}" text-anchor="middle">${yr}</text>`;
  }
  s += `<text class="hst-t" x="${W - mr}" y="${mt + plotH + 34}" text-anchor="end">${escapeHtml(o.labels.axisBottom)}</text>`;

  if (o.crossYear !== null) {
    const cx = x(o.crossYear);
    const text = o.labels.cross;
    const w = estTextW(text, 12, 6.8);
    const right = cx + 6 + w > W - 4;
    s += `<line class="hst-mk-line" x1="${f(cx)}" x2="${f(cx)}" y1="${mt}" y2="${mt + plotH}"/>`;
    s += `<text class="hst-t hst-t-strong" x="${f(right ? cx - 6 : cx + 6)}" y="${mt + 12}" text-anchor="${right ? 'end' : 'start'}">${escapeHtml(text)}</text>`;
  }
  const path = (key: 'buy' | 'rent') =>
    rows
      .map((r, i) => `${i === 0 ? 'M' : 'L'}${f(x(r.year))},${f(y(r[key]))}`)
      .join(' ');
  s += `<path class="hst-line-b" fill="none" d="${path('rent')}"/>`;
  s += `<path class="hst-line-a" fill="none" d="${path('buy')}"/>`;
  s += lg.svg;
  return `${s}</svg>`;
}
