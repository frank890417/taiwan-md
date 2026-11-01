/** Taiwan.md 標誌幾何：把台灣本島一行一行掃描（行島）。
 *
 * 唯一的地理來源是 terrain/taiwan-rows.json（extract-terrain.py 從開放高程資料抽出，
 * 每一列的西端、東端都是真實海岸線）。這裡不畫、不修形狀，只決定「掃幾行」。
 * 規則：
 *   1. 行距固定（本島高 ÷ 行數），其中一行的中心固定落在北迴歸線（北緯 23.4365°）。
 *   2. 每一行的東西兩端取該行涵蓋列的海岸線中位數，所以海岸的小凹凸不會讓行抖動。
 *   3. 兩端平切（不加圓頭）：圓頭會吃掉島的尖端，富貴角與鵝鑾鼻就不見了。
 * 標誌、像素版 favicon、island 圖示、地形行，全部從這一支取幾何。
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const ROWS = JSON.parse(
  readFileSync(
    fileURLToPath(new URL('./terrain/taiwan-rows.json', import.meta.url)),
  ),
);
const ELEV = JSON.parse(
  readFileSync(
    fileURLToPath(new URL('./terrain/taiwan-elev-q4.json', import.meta.url)),
  ),
);

export const island = {
  width: ROWS.width,
  height: ROWS.height,
  aspect: ROWS.height / ROWS.width, // ≈ 1.89
  tropicRow: ROWS.tropicRow,
  bounds: ROWS.bounds,
  peak: ROWS.peak,
  source: ROWS.source,
};

const median = (a) => {
  const s = [...a].sort((x, y) => x - y);
  return s[Math.floor(s.length / 2)];
};

/** 掃 count 行。回傳的座標以本島列與欄為單位（0..width, 0..height）。 */
export function scanLines(count) {
  const H = ROWS.height;
  const p = H / count;
  const k0 = Math.round(ROWS.tropicRow / p - 0.5);
  const out = [];
  for (let i = -2; i < count + 3; i++) {
    const y = ROWS.tropicRow + (i - k0) * p;
    if (y < p * 0.25 || y > H - p * 0.25) continue;
    const r0 = Math.max(0, Math.floor(y - p / 2));
    const r1 = Math.min(H - 1, Math.ceil(y + p / 2));
    const rows = [];
    for (let r = r0; r <= r1; r++) if (ROWS.rows[r]) rows.push(ROWS.rows[r]);
    if (!rows.length) continue;
    out.push({
      y,
      x0: median(rows.map((v) => v[0])),
      x1: median(rows.map((v) => v[1])),
      peak: Math.max(...rows.map((v) => v[2])),
      tropic: Math.abs(y - ROWS.tropicRow) < 1e-6,
    });
  }
  return { lines: out, pitch: p };
}

/** 把行島畫進一個方框。box＝{x,y,w,h}；weight＝行粗佔行距的比例。
 *  回傳 rect 陣列（已轉成方框座標），呼叫端自己決定顏色。 */
export function layoutMark(count, box, weight = 0.56) {
  const { lines, pitch } = scanLines(count);
  const s = Math.min(box.w / ROWS.width, box.h / ROWS.height);
  const ox = box.x + (box.w - ROWS.width * s) / 2;
  const oy = box.y + (box.h - ROWS.height * s) / 2;
  const t = pitch * weight * s;
  return lines.map((l) => ({
    x: ox + l.x0 * s,
    y: oy + l.y * s - t / 2,
    w: Math.max(t, (l.x1 - l.x0) * s),
    h: t,
    tropic: l.tropic,
    peak: l.peak,
  }));
}

/** 地形行：每一行依高程抬升。回傳每行的折線點（方框座標）。 */
export function ridgeLines(count, box, lift = 0.12, smooth = 3) {
  const { width: W, height: H, step, m } = ELEV;
  const at = (x, y) => m[y * W + x] || 0;
  const s = Math.min(box.w / ROWS.width, box.h / ROWS.height);
  const ox = box.x + (box.w - ROWS.width * s) / 2;
  const oy = box.y + (box.h - ROWS.height * s) / 2;
  const { lines } = scanLines(count);
  const maxLift = box.h * lift;
  return lines.map((l) => {
    const gy = Math.min(H - 1, Math.round(l.y / step));
    const gx0 = Math.floor(l.x0 / step);
    const gx1 = Math.ceil(l.x1 / step);
    const raw = [];
    for (let gx = gx0; gx <= gx1; gx++) {
      let acc = 0;
      let n = 0;
      for (let d = -smooth; d <= smooth; d++) {
        const xx = gx + d;
        if (xx < 0 || xx >= W) continue;
        for (let e = -1; e <= 1; e++) {
          const yy = gy + e;
          if (yy < 0 || yy >= H) continue;
          acc += at(xx, yy);
          n++;
        }
      }
      raw.push([gx * step, acc / n]);
    }
    return {
      tropic: l.tropic,
      base: oy + l.y * s,
      points: raw.map(([x, e]) => [
        ox + Math.min(Math.max(x, l.x0), l.x1) * s,
        oy + l.y * s - (e / 3952) * maxLift,
      ]),
    };
  });
}
