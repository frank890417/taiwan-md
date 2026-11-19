/**
 * 關於頁展間的內容設定（2026-11-19 關於頁策展試作）。
 *
 * 設計：reports/design-about-curation-2026-11-19.md §3 方案 A。
 * 這一輪只做「序」與「貳　第一個週末」；其餘展間的條目仍在舊的「誕生」區。
 *
 * 文字不在這裡：展間名稱、導語、圖說在 src/i18n/about.ts（about.room2.*），
 * 時間軸條目在 about.timeline.*（原文不改）。這裡只放語言中性的東西：
 * 展間編號字形、哪幾則條目屬於哪一間、報導的原網址與原標題。
 */

/**
 * 展間編號。刻意用中文大寫數字當裝飾字形（每一語都一樣，aria-hidden），
 * 可讀的「第 N 展間」另外由字串表 about.room.label 提供。
 */
export const ROOM_NUMERALS = {
  prologue: '序',
  1: '壹',
  2: '貳',
  3: '參',
  4: '肆',
  5: '伍',
  6: '陸',
} as const;

/** 「貳　第一個週末」的時間軸條目（日期在 3/17–3/24），順序＝時間順序 */
export const ROOM2_ENTRY_KEYS = [
  '2026-03-17',
  '2026-03-18-1',
  '2026-03-18-2',
  '2026-03-19',
  '2026-03-20',
  '2026-03-22',
  '2026-03-22b',
  '2026-03-24',
] as const;

export const ROOM2_RANGE = { start: '2026-03-17', end: '2026-03-24' } as const;

/**
 * 報導牆。只放設計報告 §2 表格裡、日期落在這一間、2026-11-19 用瀏覽器實際打開過的三則。
 * 標題照原文（報導本身是中文，每一語都顯示原標題，標 lang）；媒體名稱走字串表。
 * gloss：既有字串表裡這篇報導標題的各語譯名（about.press.*.title），非中文頁顯示在原標題下。
 * 不用任何媒體標誌。
 */
export const ROOM2_PRESS = [
  {
    id: 'ltn',
    date: '2026-03-18',
    url: 'https://art.ltn.com.tw/article/breakingnews/5374934',
    title:
      '在AI時代搶回「台灣主體」敘事權！新媒體藝術家吳哲宇發起「taiwan.md」實驗 「早餐店阿姨」到「便利商店」皆成觀點',
    gloss: 'about.press.ltn.title',
  },
  {
    id: 'cna',
    date: '2026-03-19',
    url: 'https://www.cna.com.tw/news/ait/202603195002.aspx',
    title: '從台積電到早餐店阿姨　Taiwan.md知識庫AI時代下說台灣故事',
    gloss: 'about.press.cna.title',
  },
  {
    id: 'wiki',
    date: '2026-03-22',
    url: 'https://zh.wikipedia.org/wiki/Taiwan.md',
    title: 'Taiwan.md',
    gloss: null,
  },
] as const;

/**
 * 數字帶：3/18–3/22 四則里程碑標題裡的第一個數字（照標題原文抄，不重算），
 * 點下去捲到那一則。單位走字串表。
 */
export const ROOM2_BAND = [
  { key: '2026-03-18-1', date: '2026-03-18', value: 100, unit: 'stars' },
  { key: '2026-03-19', date: '2026-03-19', value: 500, unit: 'stars' },
  { key: '2026-03-20', date: '2026-03-20', value: 56000, unit: 'users' },
  { key: '2026-03-22', date: '2026-03-22', value: 700, unit: 'stars' },
] as const;
