import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { useTranslations } from '../i18n/utils';

export type Sector =
  | 'semiconductor'
  | 'electronicsManufacturing'
  | 'electronicComponents'
  | 'financial'
  | 'telecommunications'
  | 'foodBeverage'
  | 'shipping'
  | 'computerBrand'
  | 'steel'
  | 'petrochemical'
  | 'cement'
  | 'optics'
  | 'bicycle'
  | 'textileFiber'
  | 'transportation'
  | 'consumerElectronics'
  | 'industrialComputer'
  | 'casing'
  | 'petrochemicalPanel'
  | 'server'
  | 'pcb'
  | 'precisionMachinery'
  | 'networking'
  | 'cooling'
  | 'testing'
  | 'biotech';

export type Company = {
  name: string; // from translation function
  sector: Sector; // camelCase sector type
  marketCap: number; // 億 TWD（收盤價 × 已發行普通股數，2026/10/22 snapshot）
  revenue: number; // 億 TWD（2025 全年合併營收）
  employees: number; // 約略員工數（集團/合併基準，見頁面方法說明）
  founded: number;
  ticker: string;
  articleUrl?: string; // optional link to knowledge article
};

// Sector color mapping
export const sectorColors: Record<Sector, string> = {
  semiconductor: '#3b82f6',
  electronicsManufacturing: '#f59e0b',
  financial: '#10b981',
  petrochemical: '#8b5cf6',
  electronicComponents: '#06b6d4',
  telecommunications: '#ec4899',
  foodBeverage: '#f97316',
  shipping: '#0ea5e9',
  computerBrand: '#6366f1',
  steel: '#64748b',
  cement: '#a78bfa',
  optics: '#14b8a6',
  bicycle: '#22c55e',
  textileFiber: '#d946ef',
  transportation: '#0891b2',
  consumerElectronics: '#e11d48',
  industrialComputer: '#2563eb',
  casing: '#7c3aed',
  petrochemicalPanel: '#9333ea',
  server: '#0284c7',
  pcb: '#059669',
  precisionMachinery: '#b45309',
  networking: '#0d9488',
  cooling: '#2dd4bf',
  testing: '#eab308',
  biotech: '#f43f5e',
};

// 台灣前 50 大上市櫃企業（依 2026/10/22 收盤市值排序）
// 市值：2026-10-22 收盤價 × 已發行普通股數（TWSE／TPEx OpenAPI），可重現腳本：
//   scripts/tools/companies-marketcap-snapshot.py；中間檔 reports/research/2026-10/companies-snapshot-20261022.json
// 營收：2025 全年合併營收（金控為合併營業收入，含保險）。單位皆為「億 TWD」。
// 資料來源與逐家出處：reports/research/2026-10/companies-refresh-2026-10.md
// 市值為快照，僅供結構參考，不構成投資建議。
// ── articleUrl 的語言解析 ───────────────────────────────────────────────
// 下面每一筆 `articleUrl` 都是 zh-TW 的文章網址（`/economy/台灣企業：台積電`）。
// 過去頁面直接對它套 `translatePath()`／`'/' + lang + articleUrl`，等於假設
// 每個語言的同一篇文章都住在中文標題底下——但譯文的 slug 是在地化的
// （`/en/economy/delta-electronics-taiwan-power-giant`）。於是十二個語言的
// /companies 各自發出十來條指向不存在網址的連結，中文版反而是對的，所以
// 沒有人從中文站點看得出來。這是 §神經迴路「多語言 nav 的隱性路由 scope」
// 的第 N 次：只在特定語言存在的路由，不能讓 translatePath 隱性生成。
//
// 正確的對照表站上早就有：`public/api/lang-switch-map.json` 的 `fromZh`
// 就是「給定一個 zh 網址，這個語言該連到哪」，由
// `scripts/core/generate-lang-switch-map.mjs` 從各譯文的 `translatedFrom`
// 產生。這裡讀它，不要另建第二份對照（REFLEXES #21 SSOT）。
//
// cache 放在 module scope 不放 .astro frontmatter：Astro 會把 frontmatter
// 編譯進 per-render function，cache 擺那裡每頁都會重新讀檔（§神經迴路
// 「`.astro` frontmatter 是 per-render scope」）。
type FromZhRegistry = Record<string, Record<string, string>>;
let _fromZhCache: FromZhRegistry | null = null;

function getFromZhRegistry(): FromZhRegistry {
  if (_fromZhCache) return _fromZhCache;
  let registry: FromZhRegistry = {};
  try {
    const raw = readFileSync(
      resolve(process.cwd(), 'public/api/lang-switch-map.json'),
      'utf-8',
    );
    const data = JSON.parse(raw) as {
      registry: Record<string, { fromZh?: Record<string, string> }>;
    };
    for (const [lang, entry] of Object.entries(data.registry ?? {})) {
      registry[lang] = entry?.fromZh ?? {};
    }
  } catch {
    // 對照表還沒 prebuild（dev 首跑）時退回空表 —— 結果是不出連結，
    // 不是出壞連結。壞連結比沒連結貴，因為讀者點了才知道。
    registry = {};
  }
  _fromZhCache = registry;
  return registry;
}

/**
 * 把一個寫死在版面設定裡的 zh 文章網址，換成 `lang` 讀得到的那個。
 * 沒有該語言的譯文就回 `undefined`——呼叫端要據此**不出連結**，
 * 而不是退回 zh 網址：把英文讀者送到中文頁跟送到 404 一樣是壞體驗，
 * 只是壞得比較不明顯。
 *
 * `lang === 'zh-TW'` 原樣回傳（它本來就是 zh 網址）。
 */
export function localizeArticlePath(
  path: string | undefined,
  lang: string,
): string | undefined {
  if (!path) return undefined;
  if (lang === 'zh-TW') return path;
  const fromZh = getFromZhRegistry()[lang] ?? {};
  // 設定檔裡有的寫尾斜線有的沒寫，對照表的 key 一律沒有 —— 兩種都試，
  // 免得同一份對照表因為一個斜線而對半失效。
  const bare = path.endsWith('/') ? path.slice(0, -1) : path;
  return fromZh[bare] ?? fromZh[path];
}

/**
 * 把一批公司的 zh `articleUrl` 換成 `lang` 讀得到的網址。
 * 該語言沒有這篇譯文時把 `articleUrl` 拿掉——頁面既有的無文章分支會把它
 * 渲染成純文字，讀者不會點到一個 404。
 */
export function localizeCompanyArticleUrls<T extends { articleUrl?: string }>(
  companies: T[],
  lang: string,
): T[] {
  if (lang === 'zh-TW') return companies;
  return companies.map((c) =>
    c.articleUrl
      ? { ...c, articleUrl: localizeArticlePath(c.articleUrl, lang) }
      : c,
  );
}

export const getCompanyConfigs = (
  t: ReturnType<typeof useTranslations>,
): Company[] => [
  {
    name: t('data.company.taiwan-semiconductor'),
    sector: 'semiconductor',
    marketCap: 618487,
    revenue: 38090,
    employees: 90557,
    founded: 1987,
    ticker: '2330',
    articleUrl: '/economy/台灣企業：台積電',
  },
  {
    name: t('data.company.mediatek'),
    sector: 'semiconductor',
    marketCap: 64359,
    revenue: 5960,
    employees: 22546,
    founded: 1997,
    ticker: '2454',
    articleUrl: '/economy/台灣企業：聯發科技',
  },
  {
    name: t('data.company.delta-electronics'),
    sector: 'electronicComponents',
    marketCap: 40522,
    revenue: 5549,
    employees: 83000,
    founded: 1971,
    ticker: '2308',
    articleUrl: '/economy/台灣企業：台達電子',
  },
  {
    name: t('data.company.hon-hai-foxconn'),
    sector: 'electronicsManufacturing',
    marketCap: 34486,
    revenue: 81000,
    employees: 826608,
    founded: 1974,
    ticker: '2317',
    articleUrl: '/economy/台灣企業：鴻海精密',
  },
  {
    name: t('data.company.ase-group'),
    sector: 'semiconductor',
    marketCap: 29238,
    revenue: 6454,
    employees: 84000,
    founded: 1984,
    ticker: '3711',
    articleUrl: '/economy/台灣企業：日月光半導體',
  },
  {
    name: t('data.company.nan-ya-plastics'),
    sector: 'petrochemical',
    marketCap: 23872,
    revenue: 2599,
    employees: 29108,
    founded: 1958,
    ticker: '1303',
  },
  {
    name: t('data.company.fubon-financial'),
    sector: 'financial',
    marketCap: 22202,
    revenue: 3815,
    employees: 43000,
    founded: 2001,
    ticker: '2881',
    articleUrl: '/economy/台灣企業：富邦金控',
  },
  {
    name: t('data.company.elite-material'),
    sector: 'pcb',
    marketCap: 18167,
    revenue: 943,
    employees: 5310,
    founded: 1992,
    ticker: '2383',
  },
  {
    name: t('data.company.unimicron-technology'),
    sector: 'pcb',
    marketCap: 17808,
    revenue: 1312,
    employees: 14592,
    founded: 1990,
    ticker: '3037',
  },
  {
    name: t('data.company.cathay-financial'),
    sector: 'financial',
    marketCap: 16650,
    revenue: 3492,
    employees: 54009,
    founded: 2001,
    ticker: '2882',
    articleUrl: '/economy/台灣企業：國泰金控',
  },
  {
    name: t('data.company.umc'),
    sector: 'semiconductor',
    marketCap: 15775,
    revenue: 2376,
    employees: 20000,
    founded: 1980,
    ticker: '2303',
    articleUrl: '/economy/台灣企業：聯華電子',
  },
  {
    name: t('data.company.ctbc-financial'),
    sector: 'financial',
    marketCap: 14737,
    revenue: 2449,
    employees: 31000,
    founded: 2002,
    ticker: '2891',
  },
  {
    name: t('data.company.nanya-technology'),
    sector: 'semiconductor',
    marketCap: 14284,
    revenue: 666,
    employees: 3693,
    founded: 1995,
    ticker: '2408',
  },
  {
    name: t('data.company.quanta-computer'),
    sector: 'electronicsManufacturing',
    marketCap: 13227,
    revenue: 21237,
    employees: 64935,
    founded: 1988,
    ticker: '2382',
    articleUrl: '/economy/台灣企業：廣達電腦',
  },
  {
    name: t('data.company.avc'),
    sector: 'cooling',
    marketCap: 12349,
    revenue: 1396,
    employees: 10732,
    founded: 1991,
    ticker: '3017',
  },
  {
    name: t('data.company.chunghwa-telecom'),
    sector: 'telecommunications',
    marketCap: 12257,
    revenue: 2361,
    employees: 20143,
    founded: 1996,
    ticker: '2412',
    articleUrl: '/economy/台灣企業：中華電信',
  },
  {
    name: t('data.company.taishin-shinkong'),
    sector: 'financial',
    marketCap: 10573,
    revenue: 1509,
    employees: 30000,
    founded: 2002,
    ticker: '2887',
  },
  {
    name: t('data.company.yageo'),
    sector: 'electronicComponents',
    marketCap: 10460,
    revenue: 1329,
    employees: 30624,
    founded: 1987,
    ticker: '2327',
  },
  {
    name: t('data.company.wiwynn'),
    sector: 'server',
    marketCap: 10308,
    revenue: 9507,
    employees: 7257,
    founded: 2012,
    ticker: '6669',
  },
  {
    name: t('data.company.global-unichip'),
    sector: 'semiconductor',
    marketCap: 10165,
    revenue: 341,
    employees: 882,
    founded: 1998,
    ticker: '3443',
  },
  {
    name: t('data.company.formosa-petrochemical'),
    sector: 'petrochemical',
    marketCap: 10145,
    revenue: 6261,
    employees: 5110,
    founded: 1992,
    ticker: '6505',
  },
  {
    name: t('data.company.yuanta-financial'),
    sector: 'financial',
    marketCap: 10038,
    revenue: 1284,
    employees: 15548,
    founded: 2002,
    ticker: '2885',
  },
  {
    name: t('data.company.accton'),
    sector: 'networking',
    marketCap: 9960,
    revenue: 2483,
    employees: 6930,
    founded: 1988,
    ticker: '2345',
  },
  {
    name: t('data.company.hon-precision'),
    sector: 'testing',
    marketCap: 9491,
    revenue: 303,
    employees: 800,
    founded: 2015,
    ticker: '7769',
  },
  {
    name: t('data.company.king-slide'),
    sector: 'precisionMachinery',
    marketCap: 9296,
    revenue: 175,
    employees: 1500,
    founded: 1986,
    ticker: '2059',
  },
  {
    name: t('data.company.jentech'),
    sector: 'cooling',
    marketCap: 8935,
    revenue: 203,
    employees: 1839,
    founded: 1987,
    ticker: '3653',
  },
  {
    name: t('data.company.e-sun-financial'),
    sector: 'financial',
    marketCap: 8817,
    revenue: 918,
    employees: 9268,
    founded: 2002,
    ticker: '2884',
    articleUrl: '/economy/台灣企業：玉山金控',
  },
  {
    name: t('data.company.chroma-ate'),
    sector: 'testing',
    marketCap: 8420,
    revenue: 283,
    employees: 3582,
    founded: 1984,
    ticker: '2360',
  },
  {
    name: t('data.company.mega-financial'),
    sector: 'financial',
    marketCap: 8188,
    revenue: 820,
    employees: 9838,
    founded: 2002,
    ticker: '2886',
    articleUrl: '/economy/台灣企業：兆豐金控',
  },
  {
    name: t('data.company.nan-ya-pcb'),
    sector: 'pcb',
    marketCap: 8174,
    revenue: 402,
    employees: 5920,
    founded: 1997,
    ticker: '8046',
  },
  {
    name: t('data.company.largan-precision'),
    sector: 'optics',
    marketCap: 8077,
    revenue: 612,
    employees: 8755,
    founded: 1987,
    ticker: '3008',
    articleUrl: '/economy/台灣企業：大立光電',
  },
  {
    name: t('data.company.hua-nan-financial'),
    sector: 'financial',
    marketCap: 7070,
    revenue: 695,
    employees: 11423,
    founded: 2001,
    ticker: '2880',
  },
  {
    name: t('data.company.asustek'),
    sector: 'computerBrand',
    marketCap: 7027,
    revenue: 7389,
    employees: 17000,
    founded: 1989,
    ticker: '2357',
  },
  {
    name: t('data.company.winbond'),
    sector: 'semiconductor',
    marketCap: 6953,
    revenue: 894,
    employees: 8097,
    founded: 1987,
    ticker: '2344',
  },
  {
    name: t('data.company.sinopac-financial'),
    sector: 'financial',
    marketCap: 6852,
    revenue: 744,
    employees: 15268,
    founded: 2002,
    ticker: '2890',
  },
  {
    name: t('data.company.aspeed'),
    sector: 'semiconductor',
    marketCap: 6657,
    revenue: 91,
    employees: 140,
    founded: 2004,
    ticker: '5274',
  },
  {
    name: t('data.company.wistron'),
    sector: 'electronicsManufacturing',
    marketCap: 6517,
    revenue: 21865,
    employees: 80000,
    founded: 2001,
    ticker: '3231',
  },
  {
    name: t('data.company.zhen-ding'),
    sector: 'pcb',
    marketCap: 6426,
    revenue: 1825,
    employees: 48141,
    founded: 2006,
    ticker: '4958',
  },
  {
    name: t('data.company.kgi-financial'),
    sector: 'financial',
    marketCap: 6408,
    revenue: 650,
    employees: 25000,
    founded: 2001,
    ticker: '2883',
  },
  {
    name: t('data.company.first-financial'),
    sector: 'financial',
    marketCap: 6090,
    revenue: 776,
    employees: 8623,
    founded: 2003,
    ticker: '2892',
  },
  {
    name: t('data.company.lite-on-technology'),
    sector: 'electronicComponents',
    marketCap: 5918,
    revenue: 1661,
    employees: 33163,
    founded: 1975,
    ticker: '2301',
  },
  {
    name: t('data.company.gold-circuit'),
    sector: 'pcb',
    marketCap: 5916,
    revenue: 597,
    employees: 8150,
    founded: 1981,
    ticker: '2368',
  },
  {
    name: t('data.company.advantech'),
    sector: 'industrialComputer',
    marketCap: 5823,
    revenue: 709,
    employees: 8849,
    founded: 1981,
    ticker: '2395',
    articleUrl: '/economy/台灣企業：研華科技',
  },
  {
    name: t('data.company.evergreen-marine'),
    sector: 'shipping',
    marketCap: 5629,
    revenue: 3790,
    employees: 13265,
    founded: 1968,
    ticker: '2603',
  },
  {
    name: t('data.company.kinsus'),
    sector: 'pcb',
    marketCap: 5195,
    revenue: 394,
    employees: 6401,
    founded: 2000,
    ticker: '3189',
  },
  {
    name: t('data.company.taiwan-mobile'),
    sector: 'telecommunications',
    marketCap: 4952,
    revenue: 1988,
    employees: 10645,
    founded: 1997,
    ticker: '3045',
  },
  {
    name: t('data.company.pharmaessentia'),
    sector: 'biotech',
    marketCap: 4900,
    revenue: 156,
    employees: 600,
    founded: 2000,
    ticker: '6446',
  },
  {
    name: t('data.company.mpi'),
    sector: 'testing',
    marketCap: 4791,
    revenue: 134,
    employees: 1800,
    founded: 1995,
    ticker: '6223',
  },
  {
    name: t('data.company.formosa-plastics'),
    sector: 'petrochemical',
    marketCap: 4698,
    revenue: 1754,
    employees: 7306,
    founded: 1954,
    ticker: '1301',
  },
  {
    name: t('data.company.taiwan-cooperative-bank'),
    sector: 'financial',
    marketCap: 4533,
    revenue: 738,
    employees: 8771,
    founded: 2011,
    ticker: '5880',
  },
];

// 掉出前 50 大的代表性企業（2026/10/22 收盤）。
// 前五家是 2026/06 版就已掉出的傳產與舊消費電子（AI 重新定價的輸家）；
// 後五家是 2026/06 版還在榜上、這次被擠出的（第 50 名門檻從約 3,500 億升到 4,533 億）。
// reason 文案走 i18n（data.fellOff.*）。marketCapNow 為 2026/10/22 收盤市值（億 TWD）。
export type FellOffCompany = {
  name: string;
  ticker: string;
  marketCapNow: number;
  reason: string;
};

export const getFellOffCompanies = (
  t: ReturnType<typeof useTranslations>,
): FellOffCompany[] => [
  {
    name: t('data.company.china-steel'),
    ticker: '2002',
    marketCapNow: 3076,
    reason: t('data.fellOff.china-steel'),
  },
  {
    name: t('data.company.htc'),
    ticker: '2498',
    marketCapNow: 332,
    reason: t('data.fellOff.htc'),
  },
  {
    name: t('data.company.taiwan-cement'),
    ticker: '1101',
    marketCapNow: 2103,
    reason: t('data.fellOff.taiwan-cement'),
  },
  {
    name: t('data.company.far-eastern-new-century'),
    ticker: '1402',
    marketCapNow: 1547,
    reason: t('data.fellOff.far-eastern-new-century'),
  },
  {
    name: t('data.company.giant-manufacturing'),
    ticker: '9921',
    marketCapNow: 335,
    reason: t('data.fellOff.giant-manufacturing'),
  },
  {
    name: t('data.company.uni-president'),
    ticker: '1216',
    marketCapNow: 4523,
    reason: t('data.fellOff.uni-president'),
  },
  {
    name: t('data.company.fareastone'),
    ticker: '4904',
    marketCapNow: 4149,
    reason: t('data.fellOff.fareastone'),
  },
  {
    name: t('data.company.bizlink'),
    ticker: '3665',
    marketCapNow: 3742,
    reason: t('data.fellOff.bizlink'),
  },
  {
    name: t('data.company.kyec'),
    ticker: '2449',
    marketCapNow: 3370,
    reason: t('data.fellOff.kyec'),
  },
  {
    name: t('data.company.winway'),
    ticker: '6515',
    marketCapNow: 1748,
    reason: t('data.fellOff.winway'),
  },
];

export type CategoryItem = {
  name: string;
  url: string;
  desc: string;
};

export type Category = {
  icon: string;
  title: string;
  description: string;
  items: CategoryItem[];
};

export const getCategories = (
  t: ReturnType<typeof useTranslations>,
): Category[] => [
  {
    icon: '📊',
    title: t('data.category.1.title'),
    description: t('data.category.1.description'),
    items: [
      {
        name: t('data.category.1.item.1.name'),
        url: 'https://data.gov.tw/',
        desc: t('data.category.1.item.1.desc'),
      },
      {
        name: t('data.category.1.item.2.name'),
        url: 'https://statdb.dgbas.gov.tw/',
        desc: t('data.category.1.item.2.desc'),
      },
      {
        name: t('data.category.1.item.3.name'),
        url: 'https://db.cec.gov.tw/',
        desc: t('data.category.1.item.3.desc'),
      },
      {
        name: t('data.category.1.item.4.name'),
        url: 'https://law.moj.gov.tw/',
        desc: t('data.category.1.item.4.desc'),
      },
      {
        name: t('data.category.1.item.5.name'),
        url: 'https://airtw.moenv.gov.tw/',
        desc: t('data.category.1.item.5.desc'),
      },
    ],
  },
  {
    icon: '🗺️',
    title: t('data.category.2.title'),
    description: t('data.category.2.description'),
    items: [
      {
        name: t('data.category.2.item.1.name'),
        url: 'https://smc.peering.tw/',
        desc: t('data.category.2.item.1.desc'),
      },
      {
        name: t('data.category.2.item.2.name'),
        url: 'https://maps.nlsc.gov.tw/',
        desc: t('data.category.2.item.2.desc'),
      },
      {
        name: t('data.category.2.item.3.name'),
        url: 'https://scweb.cwa.gov.tw/',
        desc: t('data.category.2.item.3.desc'),
      },
      {
        name: t('data.category.2.item.4.name'),
        url: 'https://fhy.wra.gov.tw/',
        desc: t('data.category.2.item.4.desc'),
      },
      {
        name: t('data.category.2.item.5.name'),
        url: 'https://env.gov.tw/',
        desc: t('data.category.2.item.5.desc'),
      },
    ],
  },
  {
    icon: '🤖',
    title: t('data.category.3.title'),
    description: t('data.category.3.description'),
    items: [
      {
        name: t('data.category.3.item.1.name'),
        url: 'https://g0v.tw/',
        desc: t('data.category.3.item.1.desc'),
      },
      {
        name: t('data.category.3.item.2.name'),
        url: 'https://g0v-jothon.kktix.cc/',
        desc: t('data.category.3.item.2.desc'),
      },
      {
        name: t('data.category.3.item.3.name'),
        url: 'https://cofacts.tw/',
        desc: t('data.category.3.item.3.desc'),
      },
      {
        name: t('data.category.3.item.4.name'),
        url: 'https://vtaiwan.tw/',
        desc: t('data.category.3.item.4.desc'),
      },
      {
        name: t('data.category.3.item.5.name'),
        url: 'https://join.gov.tw/',
        desc: t('data.category.3.item.5.desc'),
      },
    ],
  },
  {
    icon: '📰',
    title: t('data.category.4.title'),
    description: t('data.category.4.description'),
    items: [
      {
        name: t('data.category.4.item.1.name'),
        url: 'https://www.twreporter.org/',
        desc: t('data.category.4.item.1.desc'),
      },
      {
        name: t('data.category.4.item.2.name'),
        url: 'https://tfc-taiwan.org.tw/',
        desc: t('data.category.4.item.2.desc'),
      },
      {
        name: t('data.category.4.item.3.name'),
        url: 'https://www.readr.tw/',
        desc: t('data.category.4.item.3.desc'),
      },
      {
        name: t('data.category.4.item.4.name'),
        url: 'https://artouch.com/',
        desc: t('data.category.4.item.4.desc'),
      },
    ],
  },
  {
    icon: '🔬',
    title: t('data.category.5.title'),
    description: t('data.category.5.description'),
    items: [
      {
        name: t('data.category.5.item.1.name'),
        url: 'https://openmuseum.tw/',
        desc: t('data.category.5.item.1.desc'),
      },
      {
        name: t('data.category.5.item.2.name'),
        url: 'https://tcmb.culture.tw/',
        desc: t('data.category.5.item.2.desc'),
      },
      {
        name: t('data.category.5.item.3.name'),
        url: 'https://tbn.biodiv.tw/',
        desc: t('data.category.5.item.3.desc'),
      },
      {
        name: t('data.category.5.item.4.name'),
        url: 'https://huggingface.co/TAIDE',
        desc: t('data.category.5.item.4.desc'),
      },
    ],
  },
];
