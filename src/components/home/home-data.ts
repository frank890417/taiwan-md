/**
 * home-data.ts — 首頁第一期新區塊在建置時讀的資料。
 *
 * 首頁上每一個數字、每一張縮圖都要追得到 repo 裡的檔（設計原則七）。這支把
 * 「去哪個檔拿、拿不到怎麼辦」集中在一處：拿不到就回 null，由元件決定整塊
 * 不顯示。不放備援數字——舊版 `articleCount = 752` 那種寫死的備援值，資料檔一
 * 缺席就會把過期的數字印在首頁上。
 *
 * 全部是同步讀檔加上 module 層快取，13 個語言的首頁共用一次讀取。
 */
import { readFileSync, readdirSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { ENABLED_LANGUAGE_CODES } from '../../config/languages';
import { TAIWAN_BBOX, projectToOutline, outlineYToLat } from './taiwan-outline';

function readJson<T = any>(relPath: string): T | null {
  try {
    return JSON.parse(readFileSync(resolve(process.cwd(), relPath), 'utf-8'));
  } catch {
    return null;
  }
}

const memo = new Map<string, unknown>();
function once<T>(key: string, fn: () => T): T {
  if (!memo.has(key)) memo.set(key, fn());
  return memo.get(key) as T;
}

/* ── 開場的三個活數字 ───────────────────────────────────────────────── */

export interface LiveNumbers {
  /** public/api/dashboard-vitals.json → totalArticles */
  articles: number | null;
  /** src/config/languages → 啟用中的語言數 */
  languages: number;
  /** public/api/contributors.json → totals.contributors */
  writers: number | null;
}

export function getLiveNumbers(): LiveNumbers {
  return once('live', () => {
    const vitals = readJson<any>('public/api/dashboard-vitals.json');
    const contributors = readJson<any>('public/api/contributors.json');
    const articles =
      vitals && typeof vitals.totalArticles === 'number'
        ? vitals.totalArticles
        : null;
    const writers =
      contributors && typeof contributors?.totals?.contributors === 'number'
        ? contributors.totals.contributors
        : null;
    return { articles, languages: ENABLED_LANGUAGE_CODES.length, writers };
  });
}

/* ── 寫作者 ────────────────────────────────────────────────────────── */

export interface Writer {
  login: string;
  name: string;
  avatarUrl: string;
  profileUrl: string;
}

/**
 * 寫作者頭像牆的名單（public/api/contributors.json → allContributors）。
 * 站主排在最後：他是把大家的稿子合進來的人，排第一會把真正寫的人擠到後面。
 */
export function getWriters(): Writer[] {
  return once('writers', () => {
    const data = readJson<any>('public/api/contributors.json');
    const all: any[] = Array.isArray(data?.allContributors)
      ? data.allContributors
      : [];
    const list = all
      .filter((c) => c && c.login && c.avatarUrl && c.profileUrl)
      .map((c) => ({
        login: String(c.login),
        name: String(c.name || c.login),
        avatarUrl: String(c.avatarUrl),
        profileUrl: String(c.profileUrl),
      }));
    const owner = list.filter((c) => c.login === 'frank890417');
    return [...list.filter((c) => c.login !== 'frank890417'), ...owner];
  });
}

/* ── 分類篇數 ──────────────────────────────────────────────────────── */

const CATEGORY_DIR: Record<string, string> = {
  history: 'History',
  geography: 'Geography',
  culture: 'Culture',
  food: 'Food',
  art: 'Art',
  music: 'Music',
  technology: 'Technology',
  nature: 'Nature',
  people: 'People',
  society: 'Society',
  economy: 'Economy',
  lifestyle: 'Lifestyle',
  politics: 'Politics',
};

/** 該語言在某分類底下有幾篇（跟 CategoryGrid 同一個算法：數 knowledge/ 的檔）。 */
export function countCategoryArticles(lang: string, slug: string): number {
  return once(`count:${lang}:${slug}`, () => {
    const dir = join(
      process.cwd(),
      'knowledge',
      lang === 'zh-TW' ? '' : lang,
      CATEGORY_DIR[slug] || slug,
    );
    try {
      return readdirSync(dir).filter(
        (f) => f.endsWith('.md') && !f.startsWith('_'),
      ).length;
    } catch {
      return 0;
    }
  });
}

/* ── 展廳壹：有地點的文章，由北到南 ─────────────────────────────────── */

export interface MapDensity {
  /** 畫在圖上的格點：輪廓座標系的中心點與篇數 */
  cells: Array<{ x: number; y: number; n: number }>;
  /** 由北到南的緯度帶：輪廓座標系的 y 範圍與篇數 */
  bands: Array<{ y0: number; y1: number; n: number; latMid: number }>;
  maxCell: number;
  maxBand: number;
  /** 畫在圖上的篇數（本島與鄰近離島） */
  plotted: number;
  /** 圖框以外：金門、馬祖，以及其他 */
  kinmen: number;
  matsu: number;
  elsewhere: number;
  /** 全部有地點的篇數 */
  total: number;
  frame: { x0: number; x1: number; y0: number; y1: number };
}

const DENSITY_CELL = 30;
const BAND_ROWS = 2;

/**
 * 地圖頁的落點（src/data/map-markers.json，中文那一份）依格子加總。
 * 圖框涵蓋本島、澎湖、綠島、蘭嶼、龜山島；金門與馬祖離本島太遠，放進同一張圖
 * 會把本島縮得看不清楚，所以另外報數字，不畫點，也不混進由北到南的長條。
 */
export function getMapDensity(): MapDensity | null {
  return once('density', () => {
    const markers = readJson<any[]>('src/data/map-markers.json');
    if (!Array.isArray(markers)) return null;
    const zh = markers.filter(
      (m) =>
        m &&
        m.lang === 'zh-TW' &&
        typeof m.lat === 'number' &&
        typeof m.lng === 'number',
    );
    if (zh.length === 0) return null;

    // 圖框：輪廓外框往西多留到澎湖，其餘留一點邊
    // 高度取成緯度帶的整數倍，圖旁的長條才能跟地圖一列一列對齊
    const bandH = DENSITY_CELL * BAND_ROWS;
    const y0 = TAIWAN_BBOX.y0 - 15;
    const bandCount = Math.ceil((TAIWAN_BBOX.y1 + 15 - y0) / bandH);
    const frame = {
      x0: TAIWAN_BBOX.x0 - 150,
      x1: TAIWAN_BBOX.x1 + 15,
      y0,
      y1: y0 + bandCount * bandH,
    };
    const cellMap = new Map<string, { x: number; y: number; n: number }>();
    const bandN = new Array<number>(bandCount).fill(0);
    let plotted = 0;
    let kinmen = 0;
    let matsu = 0;
    let elsewhere = 0;

    for (const m of zh) {
      const [x, y] = projectToOutline(m.lat, m.lng);
      if (x < frame.x0 || x > frame.x1 || y < frame.y0 || y > frame.y1) {
        if (m.lat > 24.2 && m.lat < 25.1 && m.lng > 118.1 && m.lng < 119.6)
          kinmen++;
        else if (m.lat > 25.8 && m.lat < 26.5 && m.lng > 119.7 && m.lng < 120.7)
          matsu++;
        else elsewhere++;
        continue;
      }
      plotted++;
      const cx = Math.floor((x - frame.x0) / DENSITY_CELL);
      const cy = Math.floor((y - frame.y0) / DENSITY_CELL);
      const key = `${cx}:${cy}`;
      const cell = cellMap.get(key) || {
        x: frame.x0 + (cx + 0.5) * DENSITY_CELL,
        y: frame.y0 + (cy + 0.5) * DENSITY_CELL,
        n: 0,
      };
      cell.n++;
      cellMap.set(key, cell);
      bandN[Math.min(bandCount - 1, Math.floor(cy / BAND_ROWS))]++;
    }

    const cells = [...cellMap.values()];
    const bands = bandN.map((n, i) => {
      const by0 = frame.y0 + i * bandH;
      const by1 = by0 + bandH;
      return { y0: by0, y1: by1, n, latMid: outlineYToLat((by0 + by1) / 2) };
    });
    return {
      cells,
      bands,
      maxCell: Math.max(...cells.map((c) => c.n)),
      maxBand: Math.max(...bandN),
      plotted,
      kinmen,
      matsu,
      elsewhere,
      total: zh.length,
      frame,
    };
  });
}

/* ── 展廳貳：時間軸頁的八個時期 ─────────────────────────────────────── */

export interface EraBand {
  eras: Array<{
    id: string;
    title: string;
    /** 慣用的時期名（明鄭時期、日治時期…） */
    subtitle: string;
    /** 西元年；第一個時期沒有起點（史前） */
    start: number | null;
    end: number;
    articles: number;
  }>;
  totalArticles: number;
  firstYear: number;
  lastYear: number;
}

function pickLocalized(value: unknown, lang: string): string {
  if (typeof value === 'string') return value;
  if (value && typeof value === 'object') {
    const v = value as Record<string, string>;
    return v[lang] || v.en || v['zh-TW'] || '';
  }
  return '';
}

/**
 * /timeline 的策展資料（src/data/timeline-eras.json）。每個時期掛的文章是那一頁
 * 編輯挑進去的清單，不是「所有歷史文章依年代分類」，圖說要照實寫。
 * 起訖年從 yearsLabel 的四位數讀；讀不到起點的（史前）當成沒有起點。
 */
export function getEraBand(lang: string): EraBand | null {
  return once(`eras:${lang}`, () => {
    const data = readJson<any>('src/data/timeline-eras.json');
    const eras: any[] = Array.isArray(data?.eras) ? data.eras : [];
    if (eras.length === 0) return null;
    const starts = eras.map((e) => {
      const label = pickLocalized(e.yearsLabel, 'zh-TW');
      const m = label.match(/^\s*(\d{4})/);
      return m ? parseInt(m[1], 10) : null;
    });
    const thisYear = new Date().getFullYear();
    const out = eras.map((e, i) => {
      const nextStart = starts.slice(i + 1).find((s) => s !== null) ?? null;
      return {
        id: String(e.id),
        title: pickLocalized(e.title, lang),
        subtitle: pickLocalized(e.subtitle, lang),
        start: starts[i],
        end: nextStart ?? thisYear,
        articles: Array.isArray(e.articles) ? e.articles.length : 0,
      };
    });
    const dated = out.filter((e) => e.start !== null);
    if (dated.length === 0) return null;
    return {
      eras: out,
      totalArticles: out.reduce((s, e) => s + e.articles, 0),
      firstYear: dated[0].start as number,
      lastYear: thisYear,
    };
  });
}

/* ── 展廳肆：市值區塊圖 ─────────────────────────────────────────────── */

export interface TreemapCell {
  name: string;
  ticker: string;
  value: number;
  share: number;
  x: number;
  y: number;
  w: number;
  h: number;
}

/**
 * Squarified treemap（Bruls, Huizing & van Wijk 2000）。建置時算好座標，頁面上
 * 只有 SVG 的矩形，不載任何圖表程式庫。items 要先由大到小排好。
 */
export function squarify(
  items: Array<{ name: string; ticker: string; value: number }>,
  width: number,
  height: number,
): TreemapCell[] {
  const total = items.reduce((s, i) => s + i.value, 0);
  if (total <= 0) return [];
  const scale = (width * height) / total;
  const nodes = items.map((i) => ({ ...i, area: i.value * scale }));
  const out: TreemapCell[] = [];
  let x = 0;
  let y = 0;
  let w = width;
  let h = height;

  const worst = (row: typeof nodes, side: number) => {
    const sum = row.reduce((s, n) => s + n.area, 0);
    const max = Math.max(...row.map((n) => n.area));
    const min = Math.min(...row.map((n) => n.area));
    return Math.max(
      (side * side * max) / (sum * sum),
      (sum * sum) / (side * side * min),
    );
  };

  const layout = (row: typeof nodes) => {
    const sum = row.reduce((s, n) => s + n.area, 0);
    if (w >= h) {
      // 這一排直放在左側
      const rowW = sum / h;
      let cy = y;
      for (const n of row) {
        const ch = n.area / rowW;
        out.push({
          name: n.name,
          ticker: n.ticker,
          value: n.value,
          share: n.value / total,
          x,
          y: cy,
          w: rowW,
          h: ch,
        });
        cy += ch;
      }
      x += rowW;
      w -= rowW;
    } else {
      const rowH = sum / w;
      let cx = x;
      for (const n of row) {
        const cw = n.area / rowH;
        out.push({
          name: n.name,
          ticker: n.ticker,
          value: n.value,
          share: n.value / total,
          x: cx,
          y,
          w: cw,
          h: rowH,
        });
        cx += cw;
      }
      y += rowH;
      h -= rowH;
    }
  };

  let row: typeof nodes = [];
  for (const node of nodes) {
    const side = Math.min(w, h);
    if (row.length === 0 || worst([...row, node], side) <= worst(row, side)) {
      row.push(node);
    } else {
      layout(row);
      row = [node];
    }
  }
  if (row.length) layout(row);
  return out;
}

/* ── 直接能用的 ────────────────────────────────────────────────────── */

export interface ElectionState {
  /** 建置當天（台北時間）還沒過投票日 */
  active: boolean;
  /** YYYY-MM-DD，來自 src/data/elections-2026.json → election.date */
  date: string;
  races: number;
}

/**
 * 選舉卡的到期日寫在資料檔裡（election.date），建置當天用台北時間的日期比。
 * 投票日當天還算有效，隔天起首頁的那一格自動換成時間軸。
 */
export function getElectionState(now: Date = new Date()): ElectionState | null {
  const data = readJson<any>('src/data/elections-2026.json');
  const date = data?.election?.date;
  if (typeof date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(date))
    return null;
  const today = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Taipei',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now);
  return {
    active: today <= date,
    date,
    races: Array.isArray(data?.races) ? data.races.length : 0,
  };
}

/** 用語庫的條目數：data/terminology/ 底下的 yaml 檔數。 */
export function getTerminologyCount(): number | null {
  return once('terms', () => {
    try {
      const n = readdirSync(resolve(process.cwd(), 'data/terminology')).filter(
        (f) => f.endsWith('.yaml') && !f.startsWith('_'),
      ).length;
      return n > 0 ? n : null;
    } catch {
      return null;
    }
  });
}

/**
 * 用語庫裡的幾組對照（data/terminology/<台灣用語>.yaml 的 display 欄）。
 * 轉換器那一格拿它當示例，讀不到的那一組就跳過。
 */
export function getTermPairs(
  ids: string[],
): Array<{ taiwan: string; china: string }> {
  return once(`pairs:${ids.join(',')}`, () => {
    const out: Array<{ taiwan: string; china: string }> = [];
    for (const id of ids) {
      try {
        const raw = readFileSync(
          resolve(process.cwd(), 'data/terminology', `${id}.yaml`),
          'utf-8',
        );
        const block = raw.match(/^display:\n((?:[ \t]+.*\n?)+)/m)?.[1] || '';
        const pick = (key: string) =>
          block
            .match(new RegExp(`^[ \\t]+${key}:[ \\t]*(.+)$`, 'm'))?.[1]
            ?.trim()
            .replace(/^['"]|['"]$/g, '');
        const taiwan = pick('taiwan');
        const china = pick('china');
        if (taiwan && china) out.push({ taiwan, china });
      } catch {}
    }
    return out;
  });
}
