/**
 * pageData.ts — /industry 專題主頁各節共用的資料整理（契約 v1：純計算放 src/utils/industry/）。
 *
 * 主頁拆成 src/components/industry/sections/*.astro 之後，每一節都從這裡拿同一份整理好的資料。
 * 以語言為 key 快取在 module scope：.astro frontmatter 是 per-render scope，快取放那裡每節都會重算
 *（§神經迴路「.astro frontmatter 是 per-render scope」）。
 * 數列來源：src/data/industry/series.json；內容：src/data/industry/content/*.json。
 */
import { useTranslations, useTranslatedPath } from '../../i18n/utils';
import { useIndustryT } from '../../i18n/industry';
import { relatedList } from './related';
import { fmtYi } from '../budgetViz';
import {
  COMPANIES_SNAPSHOT_DATE,
  getCompanyConfigs,
  getFellOffCompanies,
} from '../dataConfig';
import {
  assignRanks,
  concentration,
  groupBy,
  type RankRow,
} from './companiesRank';
import series from '../../data/industry/series.json';
import companiesMeta from '../../data/industry/companies-meta.json';
import debates from '../../data/industry/content/debates.json';
import places from '../../data/industry/content/places.json';
import outlook from '../../data/industry/content/outlook.json';

async function build(lang: string) {
  const t = useTranslations(lang as any);
  const ti = useIndustryT(lang);
  const translatePath = useTranslatedPath(lang as any);
  const zh = lang === 'zh-TW';
  const S = series as any;
  // 四捨五入到一位：38.55 這種值 toFixed(1) 會因浮點變成 38.5，先加一個極小量
  const pct1 = (v: number) =>
    `${(Math.round((v + 1e-9) * 10) / 10).toFixed(1)}%`;
  const srcLine = (s: any) =>
    s ? `${s.publisher ?? ''}${s.title ? '〈' + s.title + '〉' : ''}` : '';
  const srcLineL = (s: any) =>
    zh ? srcLine(s) : `${s?.publisher ?? ''} — ${s?.title ?? ''}`;

  // ── 出口 ─────────────────────────────────────────────────────────────
  const exp = S.exportProducts;
  const expY0 = exp.years[0];
  const expY1 = exp.years[exp.years.length - 1];
  const expAt = (id: string, y: number) =>
    exp.rows.find((r: any) => r.id === id).values[
      exp.years.indexOf(y)
    ] as number;
  const elecShare = expAt('ec', expY1) + expAt('ict', expY1);
  const elecShare0 = expAt('ec', expY0) + expAt('ict', expY0);
  const expSlopeRows = exp.rows.map((r: any, i: number) => ({
    id: r.id,
    label: ti(`exp.${r.id}`),
    left: r.values[0],
    right: r.values[r.values.length - 1],
    cls: `bg-cat-${i % 8}`,
    highlight: ['ec', 'ict', 'textile'].includes(r.id),
  }));
  const mk = S.exportMarkets;
  const mkSeries = mk.rows.map((r: any, i: number) => ({
    id: r.id,
    label: ti(`mk.${r.id}`),
    values: r.values,
    cls: ['bg-s1', 'bg-s0', 'bg-s2', 'bg-mute', 'bg-mute'][i],
  }));
  const mkLast = (id: string) =>
    mk.rows.find((r: any) => r.id === id).values[mk.years.length - 1] as number;
  const lh = S.exportLongHistory;
  const lhCats = lh.rows.map((r: any, i: number) => ({
    id: r.id,
    label: ti(`lh.${r.id}`),
    cls: ['bg-cat-2', 'bg-cat-3', 'bg-cat-0'][i],
  }));
  const expTotalLast = S.exportTotals.values[S.exportTotals.values.length - 1];

  // ── GDP ──────────────────────────────────────────────────────────────
  const gs = S.gdpSectors;
  const gsCats = [
    { id: 'agriculture', label: ti('gdp.agriculture'), cls: 'bg-cat-2' },
    { id: 'industry', label: ti('gdp.industry'), cls: 'bg-cat-0' },
    { id: 'services', label: ti('gdp.services'), cls: 'bg-cat-3' },
  ];
  // 圖上每五年一點（1951 起）加最後一年；2015 之後逐年的點全畫會讓 x 軸標籤疊在一起，逐年值在資料檔
  const gsIdx = gs.years
    .map((y: number, i: number) => ({ y, i }))
    .filter(
      ({ y, i }: any) => y === 1951 || y % 5 === 0 || i === gs.years.length - 1,
    )
    .map(({ i }: any) => i as number);
  const gsYears = gsIdx.map((i: number) => gs.years[i] as number);
  const gsValues = gsCats.map((c) =>
    gsIdx.map(
      (i: number) =>
        gs.rows.find((r: any) => r.id === c.id).values[i] as number,
    ),
  );
  const mfgLast = gs.manufacturing[gs.manufacturing.length - 1] as number;
  const ge = S.gdpElectronics;
  const geLastYear = ge.years[ge.years.length - 1];
  const geComp = ge.rows.find((r: any) => r.id === 'components').values;
  const gl = S.gdpLevel;

  // ── 科學園區 ─────────────────────────────────────────────────────────
  const pk = S.parksRevenue;
  const pkLast = pk.years.length - 1;
  const pkTotalLast = pk.total[pkLast] as number;

  // ── 半導體產值（可能沒有資料）────────────────────────────────────────
  const ic = S.icOutput as any | undefined;

  // ── 榜單與集中度 ─────────────────────────────────────────────────────
  const companies = assignRanks(getCompanyConfigs(t));
  const rankRows: RankRow[] = companies.map((c) => {
    const m = (companiesMeta.companies as any)[c.ticker] ?? {};
    return {
      ticker: c.ticker,
      rank: c.rank,
      marketCap: c.marketCap,
      revenue: c.revenue,
      employees: c.employees,
      founded: c.founded,
      industryCode: m.industryCode ?? '',
      county: m.county ?? '',
      prevRank: m.prevRank ?? null,
    };
  });
  const snap = S.marketSnapshot as any;
  const conc = concentration(rankRows, snap.listedTotal100M);
  const concParts = [
    { k: 'top1', v: conc.top1Pct },
    { k: 'top2to10', v: conc.top2to10Pct },
    { k: 'rest', v: conc.restOfListPct },
    { k: 'outside', v: conc.outsidePct },
  ];
  const indGroups = groupBy(rankRows, 'industryCode');
  const indRows = indGroups.map((g) => ({
    id: g.key,
    label: `${ti(`tse.${g.key}`)}（${g.count}）`,
    now: g.capSum,
    highlight: g.key === '24',
  }));
  const mh = S.marketHistory as any | undefined;
  const mhCols = mh
    ? mh.years.filter((y: any) => (mh.pick as string[]).includes(y.label))
    : [];
  // 歷年表的公司名：中文頁用證交所簡稱；其他語言用既有 13 語公司譯名，沒有的用 mh.<代號>
  const mhNames: Record<string, string> = {};
  if (mh && !zh) {
    for (const c of [...companies, ...getFellOffCompanies(t)])
      // 「Hon Hai Foxconn 鴻海」這種雙語名在窄欄裡只留拉丁字那一段
      mhNames[c.ticker] =
        c.name.replace(/\s+[\u3400-\u9fff][\s\S]*$/, '') || c.name;
    for (const y of mh.years)
      for (const c of y.top)
        if (!mhNames[c.code] && ti(`mh.${c.code}`) !== `mh.${c.code}`)
          mhNames[c.code] = ti(`mh.${c.code}`);
  }

  // ── 縣市 ─────────────────────────────────────────────────────────────
  const fc = S.factoriesByCounty;
  const countyNames: Record<string, string> = Object.fromEntries(
    fc.rows.map((r: any) => [r.county, ti(`county.${r.county}`)]),
  );
  const hqCount = Object.fromEntries(
    groupBy(rankRows, 'county').map((g) => [g.key, g.count]),
  );
  const tileData = Object.fromEntries(
    fc.rows
      .filter((r: any) => r.revenue100M != null)
      .map((r: any) => [
        r.county,
        {
          value: r.revenue100M,
          text: zh
            ? r.revenue100M >= 10000
              ? `${(r.revenue100M / 10000).toFixed(1)} 兆`
              : `${r.revenue100M.toLocaleString('en-US')} 億`
            : fmtYi(r.revenue100M, lang).replace('NT$', ''),
          note: hqCount[r.county] ? String(hqCount[r.county]) : '',
        },
      ]),
  );
  const fcTop = [...fc.rows]
    .filter((r: any) => r.revenue100M != null)
    .sort((a: any, b: any) => b.revenue100M - a.revenue100M);

  // ── 立場 ─────────────────────────────────────────────────────────────
  const DB = debates as any;
  const PL = places as any;
  const OL = outlook as any;

  // ── 相關文章 ─────────────────────────────────────────────────────────
  const REL = {
    s1: await relatedList(lang, [
      ['Economy', '經濟奇蹟'],
      ['History', '美援'],
      ['History', '台灣土地改革'],
      ['History', '高雄加工出口區'],
      ['History', '十大建設'],
      ['Economy', '台灣糖業'],
      ['Economy', '紡織業'],
      ['People', '孫運璿'],
    ]),
    s2: await relatedList(lang, [
      ['Technology', '科技園區發展'],
      ['Economy', '台灣股市與資本市場'],
      ['Economy', '台灣產業轉型升級'],
      ['Economy', '新創生態系'],
      ['Economy', '新台幣'],
      ['People', '張忠謀'],
      ['People', '李登輝'],
    ]),
    s3: await relatedList(lang, [
      ['Economy', '台灣外貿與全球供應鏈'],
      ['Economy', '台灣國際貿易政策'],
      ['Economy', '台灣中小企業與隱形冠軍'],
      ['Economy', '台灣機械工具產業'],
      ['Economy', '螺絲'],
      ['Economy', '台灣造船業'],
    ]),
    s4: await relatedList(lang, [
      ['Technology', '半導體產業'],
      ['Technology', 'AI硬體供應鏈'],
      ['Technology', 'NVIDIA在台灣'],
      ['Technology', '台灣鎢供應鏈'],
      ['Technology', 'Computex'],
      ['Economy', '台灣企業：台積電'],
      ['People', '黃仁勳'],
      ['People', '魏哲家'],
    ]),
    s5: await relatedList(lang, [
      ['Economy', '台灣前50大企業'],
      ['Economy', '台灣股市與資本市場'],
      ['People', '王永慶'],
      ['People', '郭台銘'],
      ['People', '施振榮'],
      ['People', '林百里'],
      ['People', '童子賢'],
    ]),
    s6: await relatedList(lang, [
      ['Technology', '台灣科技園區外圍商圈生態'],
      ['Technology', '台灣自行車產業'],
      ['Economy', '中壢'],
      ['Technology', '台灣機器人產業'],
      ['Economy', '台灣離岸風電'],
    ]),
    s7: await relatedList(lang, [
      ['Technology', '半導體用水與台灣水資源'],
      ['Technology', '台灣的電力與半導體'],
      ['Economy', '台灣電價機制與台電'],
      ['Technology', 'AI供應鏈海外設廠'],
      ['Economy', '台灣前50大企業'],
    ]),
  };
  const GROUPS: [string, [string, string][]][] = [
    [
      'g.companies',
      [
        '台積電',
        '聯發科技',
        '台達電子',
        '鴻海精密',
        '日月光半導體',
        '廣達電腦',
        '聯華電子',
        '瑞昱半導體',
        '緯創資通',
        '和碩聯合',
        '仁寶電腦',
        '華碩',
        '宏碁',
        '研華科技',
        '大立光電',
        '宏達電',
        '富邦金控',
        '國泰金控',
        '兆豐金控',
        '玉山金控',
        '中華電信',
        '長榮海運',
        '中鋼',
        '台泥',
        '台塑集團',
        '長春石化',
        '奇美實業',
        '遠東集團',
        '統一企業',
        '義美食品',
        '巨大機械',
      ].map((n) => ['Economy', `台灣企業：${n}`] as [string, string]),
    ],
    [
      'g.industries',
      [
        ['Technology', '半導體產業'],
        ['Technology', 'AI硬體供應鏈'],
        ['Technology', 'AI人工智慧產業'],
        ['Technology', 'AI供應鏈海外設廠'],
        ['Technology', 'NVIDIA在台灣'],
        ['Technology', '台灣鎢供應鏈'],
        ['Technology', '台灣顯示器產業'],
        ['Technology', '台灣自行車產業'],
        ['Technology', '台灣電動車產業鏈發展'],
        ['Technology', '台灣機器人產業'],
        ['Technology', '台灣無人機產業'],
        ['Technology', '台灣太空產業發展'],
        ['Technology', '台灣軟體產業發展'],
        ['Technology', '台灣資安產業發展'],
        ['Economy', '台灣機械工具產業'],
        ['Economy', '紡織業'],
        ['Economy', '螺絲'],
        ['Economy', '台灣造船業'],
        ['Economy', '台灣離岸風電'],
        ['Economy', '台灣糖業'],
        ['Economy', '台灣中小企業與隱形冠軍'],
      ],
    ],
    [
      'g.system',
      [
        ['Economy', '經濟奇蹟'],
        ['Economy', '台灣產業轉型升級'],
        ['Economy', '台灣外貿與全球供應鏈'],
        ['Economy', '台灣國際貿易政策'],
        ['Economy', '台灣股市與資本市場'],
        ['Economy', '新台幣'],
        ['Economy', '新創生態系'],
        ['Technology', '科技園區發展'],
        ['History', '美援'],
        ['History', '台灣土地改革'],
        ['History', '高雄加工出口區'],
        ['History', '十大建設'],
      ],
    ],
    [
      'g.resources',
      [
        ['Technology', '半導體用水與台灣水資源'],
        ['Technology', '台灣的電力與半導體'],
        ['Economy', '台灣電價機制與台電'],
        ['Economy', '台灣油價機制與中油'],
        ['Technology', '台灣科技園區外圍商圈生態'],
      ],
    ],
    [
      'g.people',
      [
        '孫運璿',
        '李登輝',
        '張忠謀',
        '曹興誠',
        '王永慶',
        '許文龍',
        '郭台銘',
        '施振榮',
        '林百里',
        '童子賢',
        '劉德音',
        '魏哲家',
        '黃仁勳',
      ].map((n) => ['People', n] as [string, string]),
    ],
  ];
  const groups = [];
  for (const [k, items] of GROUPS) {
    groups.push({ k, cards: await relatedList(lang, items) });
  }

  const toc = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => ({
    id: `s${n}`,
    label: ti(`toc.s${n}`),
    take: ti(`toc.s${n}.take`),
  }));
  const companiesHref = translatePath('/companies/');
  const chainsHref = translatePath('/industry/supply-chain-map/');
  const timelineHref = translatePath('/industry/timeline/');
  const sourceList: any[] = [
    S.exportProducts.source,
    S.exportLongHistory.source,
    S.gdpSectors.source,
    S.gdpElectronics.source,
    S.gdpLevel.forecast2026.source,
    S.parksRevenue.source,
    S.factoriesByCounty.source,
    ...(ic?.source ? [ic.source] : []),
    ...(snap.sources ?? []),
    ...(mh?.source ? [mh.source] : []),
  ].filter(Boolean);
  return {
    lang,
    COMPANIES_SNAPSHOT_DATE,
    fmtYi,
    DB,
    OL,
    PL,
    REL,
    S,
    chainsHref,
    timelineHref,
    companies,
    companiesHref,
    conc,
    concParts,
    countyNames,
    elecShare,
    elecShare0,
    exp,
    expAt,
    expSlopeRows,
    expTotalLast,
    expY0,
    expY1,
    fc,
    fcTop,
    ge,
    geComp,
    geLastYear,
    gl,
    groups,
    gs,
    gsCats,
    gsIdx,
    gsValues,
    gsYears,
    hqCount,
    ic,
    indGroups,
    indRows,
    lh,
    lhCats,
    mfgLast,
    mh,
    mhCols,
    mhNames,
    mk,
    mkLast,
    mkSeries,
    pct1,
    pk,
    pkLast,
    pkTotalLast,
    rankRows,
    snap,
    sourceList,
    srcLine,
    srcLineL,
    t,
    ti,
    tileData,
    toc,
    translatePath,
    zh,
  };
}

export type IndustryPageData = Awaited<ReturnType<typeof build>>;
const _cache = new Map<string, Promise<IndustryPageData>>();

export function industryPageData(lang: string): Promise<IndustryPageData> {
  if (!_cache.has(lang)) _cache.set(lang, build(lang));
  return _cache.get(lang)!;
}
