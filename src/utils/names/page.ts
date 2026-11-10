/**
 * page.ts — /names 兩個模板共用的建置期小工具：語言選欄、來源編號、文案轉 HTML、
 * 建置時用字音表把名字轉成拼音（英文頁在漢字旁邊標威妥瑪）。
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { SOURCES, type L3 } from '../../data/names/story';
import {
  romanizeSyllable,
  parseZhuyin,
  toHanyuToned,
  SURNAME_READINGS,
} from './romanize';

export type NLang = 'zh' | 'en' | 'ja';
export const nlang = (lang: string): NLang =>
  lang === 'zh-TW' ? 'zh' : lang === 'ja' ? 'ja' : 'en';
export const pick3 = (o: L3, l: NLang): string => o[l] ?? o.en ?? o.zh;

const esc = (s: string) =>
  s.replace(
    /[&<>"]/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!,
  );

const srcIndex = new Map(SOURCES.map((s, i) => [s.id, i + 1]));
/** 來源 id → 頁面上的編號（1 起） */
export const srcNo = (id: string): number => {
  const n = srcIndex.get(id);
  if (!n) throw new Error(`[names] 文案引用了不存在的來源 id：${id}`);
  return n;
};
/** 來源編號連結的 HTML；page 例："p.26" */
export function fnHtml(id: string, page = ''): string {
  const n = srcNo(id);
  const title = page ? ` title="${esc(page)}"` : '';
  return `<a class="np-fn" href="#src-${id}"${title}>[${n}]</a>`;
}

/**
 * 文案字串 → HTML。先整段跳脫，再還原三種記號：
 *   [^S1 p.26] 來源編號、**粗體**、以及文案表裡刻意寫的 <b>／<b class="…"> 標籤。
 * 引用不存在的來源 id 會讓 build 失敗（寧可紅燈，不要出一個點不到的編號）。
 */
export function rich(str: string): string {
  let h = esc(str);
  h = h.replace(/&lt;b(?: class=&quot;([a-z ]+)&quot;)?&gt;/g, (_, c) =>
    c ? `<b class="${c}">` : '<b>',
  );
  h = h.replace(/&lt;\/b&gt;/g, '</b>');
  h = h.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  h = h.replace(/\[\^(S\d+)(?: ([^\]]+))?\]/g, (_, id, page) =>
    fnHtml(id, page || ''),
  );
  return h;
}

export const fmtInt = (n: number): string =>
  Math.round(n).toLocaleString('en-US');

// ── 建置期字音 ───────────────────────────────────────────────────────
let _dict: Record<string, string> | null = null;
function dict(): Record<string, string> {
  if (!_dict) {
    const p = resolve(process.cwd(), 'public/data/names/readings.json');
    _dict = JSON.parse(readFileSync(p, 'utf8')).r as Record<string, string>;
  }
  return _dict;
}
/** 字的預設注音（當姓時套姓氏讀音）。查不到就丟錯，讓 build 失敗。 */
export function zhuyinOf(ch: string, asSurname = false): string {
  if (asSurname && SURNAME_READINGS[ch]) return SURNAME_READINGS[ch];
  const r = dict()[ch];
  if (!r) throw new Error(`[names] 字音表缺字：${ch}`);
  return r.split(',')[0];
}
const cap = (s: string) => s.charAt(0) + s.slice(1).toLowerCase();
/** 名（不含姓）→ 威妥瑪，英文行文格式：Shu-fen */
export function wgGiven(name: string): string {
  const parts = Array.from(name).map((c) =>
    romanizeSyllable(zhuyinOf(c))!.wg.toLowerCase(),
  );
  const j = parts.join('-');
  return j.charAt(0).toUpperCase() + j.slice(1);
}
/** 姓 → 四套拼法（護照格式大寫）與注音 */
export function surnameRow(surname: string) {
  const zs = Array.from(surname).map((c) => zhuyinOf(c, true));
  const r = zs.map((z) => romanizeSyllable(z)!);
  const join = (k: 'wg' | 'hanyu' | 'tongyong' | 'mps2') =>
    r.map((x) => x[k]).join('');
  return {
    surname,
    zhuyin: zs.join(' '),
    wg: join('wg'),
    hanyu: join('hanyu'),
    tongyong: join('tongyong'),
    mps2: join('mps2'),
    toned: zs.map((z) => toHanyuToned(parseZhuyin(z)!)).join(''),
    /** 英文行文用：Chen／Chang (Zhang) */
    enLabel: (() => {
      const w = cap(join('wg'));
      const h = cap(join('hanyu'));
      return w === h ? w : `${w} (${h})`;
    })(),
  };
}

/** 內政部的縣市全名 → 磚圖短名 */
export function countyShort(full: string): string {
  if (/^(新竹|嘉義)/.test(full)) return full.replace('臺', '台');
  return full.replace('臺', '台').replace(/[市縣]$/, '');
}
/** 22 縣市磚圖佈局（跟文章模組 tw-tiles 同一張，佈局寫死不畫輪廓，REFLEXES #61） */
export const TILE_GRID: (string | null)[][] = [
  ['連江', null, '台北', '基隆', null],
  [null, '桃園', '新北', '宜蘭', null],
  ['金門', '新竹市', '新竹縣', null, null],
  [null, '苗栗', '台中', '花蓮', null],
  [null, '彰化', '南投', null, null],
  ['澎湖', '雲林', '嘉義市', null, null],
  [null, '嘉義縣', '台南', null, null],
  [null, null, '高雄', '屏東', '台東'],
];
export const COUNTY_EN: Record<string, string> = {
  台北: 'Taipei',
  新北: 'New Taipei',
  基隆: 'Keelung',
  桃園: 'Taoyuan',
  新竹市: 'Hsinchu City',
  新竹縣: 'Hsinchu Co.',
  苗栗: 'Miaoli',
  台中: 'Taichung',
  彰化: 'Changhua',
  南投: 'Nantou',
  雲林: 'Yunlin',
  嘉義市: 'Chiayi City',
  嘉義縣: 'Chiayi Co.',
  台南: 'Tainan',
  高雄: 'Kaohsiung',
  屏東: 'Pingtung',
  宜蘭: 'Yilan',
  花蓮: 'Hualien',
  台東: 'Taitung',
  澎湖: 'Penghu',
  金門: 'Kinmen',
  連江: 'Lienchiang',
};
