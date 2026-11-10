/**
 * model.ts — /names 專題主頁的資料模型（建置期）。
 * 從 src/data/names/*.json 取值、算出文案要填的變數（V）、各圖表的列、站內延伸閱讀，
 * 一次算好交給 src/components/names/sections/*.astro。文案不手抄數字，全部從這裡來。
 */
import { useNames, toolStrings } from '../../i18n/names';
import moi from '../../data/names/moi.json';
import boca from '../../data/names/boca-table.json';
import surnameReadings from '../../data/names/surname-readings.json';
import {
  SOURCES,
  ROMAN_TIMELINE,
  INDIGENOUS_TIMELINE,
  NAMING_SYSTEMS,
  ROMAN_VOICES,
  INDIGENOUS_VOICES,
  IMMIGRANT_VOICES,
} from '../../data/names/story';
import {
  nlang,
  pick3,
  rich,
  fnHtml,
  fmtInt,
  wgGiven,
  surnameRow,
  zhuyinOf,
  countyShort,
  TILE_GRID,
  COUNTY_EN,
} from './page';
import { makeRelated } from './related';
import { romanizeSyllable } from './romanize';
import { getTopic } from '../topics/registry';

export async function buildNamesModel(lang: string) {
  const topic = getTopic('names')!;
  const romTool = topic.tools.find((x) => x.slug === 'name-romanization')!;
  const L = nlang(lang);
  const en = L === 'en';
  const m = moi as any;

  // ── 從資料檔取值（文案的 {變數} 全部來自這裡）───────────────────────
  const pop = m.meta.population as number;
  const rows = m.surnames.rows as [number, string, number, number][];
  const conc = m.concentration.rows as [string, number, number, number][];
  const top10Pct = conc[0][2];
  const top20Pct = conc[1][3];
  const top100Pct = conc[9][3];
  const chen = rows[0];
  const lin = rows[1];
  const cohortsF = m.cohorts.female as any[];
  const cohortsM = m.cohorts.male as any[];
  const cohortCount = (list: any[], roc: number, name: string): number =>
    (list
      .find((c) => c.roc[0] === roc)
      ?.top.find((t: [string, number]) => t[0] === name) || [0, 0])[1];
  const shufenN = m.given.female[0][1] as number;
  const shufenPeak =
    cohortCount(cohortsF, 50, '淑芬') + cohortCount(cohortsF, 60, '淑芬');
  const momHist = m.motherSurname.history.rows as [number, number][];
  const momRecent = m.motherSurname.recent.rows as [
    string,
    number,
    number,
    number,
  ][];
  const momLast = momRecent[momRecent.length - 1];
  const nc = m.nameChanges.rows as [number, number][];
  const romTop15 = rows.slice(0, 15).map((r) => surnameRow(r[1]));
  const romSame = romTop15.filter(
    (r) => r.wg === r.hanyu && r.wg === r.tongyong && r.wg === r.mps2,
  ).length;
  const V: Record<string, string | number> = {
    nSurnames: fmtInt(m.counts.surnames),
    nCompound: m.counts.compound,
    compoundPop: fmtInt(m.counts.compoundPop),
    restSurnames: fmtInt(m.counts.surnames - 100),
    top10Pct,
    top20Pct,
    top100Pct,
    chenN: fmtInt(chen[2]),
    chenPct: chen[3],
    linPct: lin[3],
    chenLinPct: (((chen[2] + lin[2]) / pop) * 100).toFixed(2),
    rareOne: m.rare.one,
    rareTen: m.rare.tenOrLess,
    rareTenPct: m.rare.tenOrLessPct,
    singlePop: fmtInt(m.singleName.pop),
    singlePct: m.singleName.pct,
    longTotal: fmtInt(m.longNames.total),
    longIndPct: m.longNames.indigenousPct,
    spouseTotal: fmtInt(m.spouseSurname.total),
    spousePct: m.spouseSurname.pct,
    spouseFemPct: m.spouseSurname.femalePct,
    spFlowAdd: fmtInt(m.spouseSurname.flowAdd),
    spFlowRemove: fmtInt(m.spouseSurname.flowRemove),
    redupPop: fmtInt(m.reduplicated.pop),
    redupFemale: fmtInt(m.reduplicated.female),
    shufenN: fmtInt(shufenN),
    jiahaoN: fmtInt(m.given.male[0][1]),
    shufenPeak: fmtInt(shufenPeak),
    shufenPeakPct: ((shufenPeak / shufenN) * 100).toFixed(1),
    indPop: fmtInt(m.indigenous.population),
    indParallel: fmtInt(m.indigenous.romanizedParallel),
    indParallelPct: m.indigenous.romanizedParallelPct,
    indRestored: fmtInt(m.indigenous.restored),
    indRestoredHan: fmtInt(m.indigenous.restoredHan),
    indBirthTrad: fmtInt(m.indigenous.birthTraditional),
    indOther: fmtInt(m.indigenous.other),
    indTop10Pct: m.indigenous.top10Pct,
    mom2008: momHist[0][1],
    momMin: Math.min(...momHist.map((x) => x[1])),
    momMinYear: momHist.reduce((a, b) => (b[1] < a[1] ? b : a))[0],
    momLatest: momLast[3].toFixed(1),
    momLatestN: fmtInt(momLast[2]),
    momLatestTotal: fmtInt(momLast[1]),
    agreedMotherPct: m.motherAgreement.agreedMotherPct,
    oneParty: fmtInt(m.motherAgreement.oneParty),
    onePartyMotherPct: m.motherAgreement.onePartyMotherPct.toFixed(1),
    draw: m.motherAgreement.draw,
    taitung: m.motherAgreement.topCounties['臺東縣'],
    hualien: m.motherAgreement.topCounties['花蓮縣'],
    nc2013: fmtInt(nc[0][1]),
    nc2022: fmtInt(nc[nc.length - 1][1]),
    ncDropPct: (((nc[0][1] - nc[nc.length - 1][1]) / nc[0][1]) * 100).toFixed(
      1,
    ),
    bocaRows: (boca as any).rows.length,
    romSame,
  };
  const tn0 = useNames(lang);
  const t = (k: string) => tn0(k, V);
  const r = (k: string) => rich(t(k));

  // ── 英雄區：一個名字，四種拼法 ───────────────────────────────────────
  const anatName = Array.from(t('anat.name'));
  const anatZy = anatName.map((c, i) => zhuyinOf(c, i === 0));
  const anatSpell = (['wg', 'hanyu', 'tongyong', 'mps2'] as const).map(
    (sys) => {
      const p = anatZy.map((z) => romanizeSyllable(z)![sys]);
      return { sys, surname: p[0], given: p.slice(1).join('-') };
    },
  );

  // ── §1 姓氏 ──────────────────────────────────────────────────────────
  const concSegs = [
    { cls: 's0', pct: conc[0][2], label: t('s1.conc.l0') },
    { cls: 's1', pct: conc[1][2], label: t('s1.conc.l1') },
    {
      cls: 's2',
      pct: +(top100Pct - top20Pct).toFixed(2),
      label: t('s1.conc.l2'),
    },
    { cls: 's3', pct: +(100 - top100Pct).toFixed(2), label: t('s1.conc.l3') },
  ];
  const top20Bars = rows.slice(0, 20).map((row) => ({
    id: `sn-${row[0]}`,
    label: en ? `${row[1]} ${surnameRow(row[1]).enLabel}` : row[1],
    value: row[2],
    text: fmtInt(row[2]),
    extra: `${row[3]}%`,
    highlight: row[0] <= 10,
  }));
  const national10 = new Set(rows.slice(0, 10).map((x) => x[1]));
  const countyMap = new Map(
    (m.counties.rows as [string, string[], number][]).map((c) => [
      countyShort(c[0]),
      c,
    ]),
  );
  const tiles = TILE_GRID.flat().map((k) => {
    if (!k) return null;
    const c = countyMap.get(k);
    if (!c) throw new Error(`[names] 縣市磚對不上資料：${k}`);
    return {
      key: k,
      name: en ? COUNTY_EN[k] : k,
      top: c[1][0],
      local: c[1].filter((s) => !national10.has(s)),
      pct: c[2],
      full: c[1].join('、'),
    };
  });

  // ── §2 年代 ──────────────────────────────────────────────────────────
  const nameCell = (n: string) => (en ? `${n} ${wgGiven(n)}` : n);
  const cohortRows = cohortsF
    .map((f: any, i: number) => ({ f, mm: cohortsM[i] }))
    // 最早一個年代（1912–1920）前十名都只有個位數，不放進主表，留在資料表
    .filter(({ f }) => f.roc[0] >= 10);
  const yearsLabel = (c: any) =>
    c.partial ? `${c.ce[0]}–${c.ce[1]}.6` : `${c.ce[0]}–${c.ce[1]}`;
  const rocLabel = (c: any) => tn0('s2.roc', { a: c.roc[0], b: c.roc[1] });

  // ── §4 台語客語 ──────────────────────────────────────────────────────
  const sr = surnameReadings as any;
  const localRows = sr.rows.slice(0, 12).map((x: any) => ({
    ...x,
    toned: surnameRow(x.surname).toned,
    href: sr.meta.taigi.entry.replace('{id}', x.sutianId),
  }));
  const toneSup = (s: string) => s.replace(/(\d+)$/, '<sup>$1</sup>');

  // ── §6 改名與從姓 ────────────────────────────────────────────────────
  const ncBars = nc.map(([y, v]) => ({
    id: `nc-${y}`,
    label: String(y),
    value: v,
    text: fmtInt(v),
  }));
  const momPoints: [number, number][] = [
    ...momHist,
    ...momRecent
      .filter((x) => parseInt(x[0], 10) + 1911 > momHist[momHist.length - 1][0])
      .map((x) => [parseInt(x[0], 10) + 1911, x[3]] as [number, number]),
  ];

  // ── 站內延伸閱讀 ─────────────────────────────────────────────────────
  const related = await makeRelated(lang);
  const REL = {
    s0: await related([
      ['Culture', '菜市場名'],
      ['Culture', '台灣人小時候的英文名字'],
      ['Culture', '台灣婚喪喜慶與人生禮俗'],
      ['Culture', '滿月習俗'],
    ]),
    s1: await related([
      ['Culture', '族群（閩南客家原住民外省新住民）'],
      ['Culture', '客家文化與語言'],
      ['Society', '外省人'],
      ['History', '平埔族'],
    ]),
    s2: await related([
      ['Culture', '菜市場名'],
      ['History', '日治時期'],
      ['Culture', '台灣諧音禁忌文化'],
    ]),
    s3: await related([
      ['Culture', '注音符號'],
      ['Culture', '台灣華語的演化'],
      ['Technology', '東亞文字輸入法'],
      ['Society', '中華台北'],
      ['Society', '台灣在國際標準中的標示問題'],
    ]),
    s4: await related([
      ['Culture', '語言多樣性與母語文化'],
      ['Culture', '台灣教會公報'],
      ['People', '蔡培火'],
      ['People', '蔣為文'],
      ['Culture', '客家文化與語言'],
      ['People', '杜潘芳格'],
    ]),
    s5: await related([
      ['Culture', '台灣原住民族姓名'],
      ['Politics', '原住民族正名'],
      ['History', '台灣原住民族歷史與正名運動'],
      ['People', '莫那能'],
      ['Culture', '台灣原住民族16族文化地圖'],
      ['Culture', '台灣原住民語言復振運動'],
    ]),
    s6: await related([
      ['History', '婦女運動'],
      ['Society', '婦女新知'],
      ['Society', '台灣少子化危機'],
      ['Society', '人權與性別平等'],
    ]),
    s7: await related([
      ['Culture', '台灣人小時候的英文名字'],
      ['Society', '移工'],
      ['Society', '台灣海外僑民與離散社群'],
      ['Food', '台灣新住民美食融合'],
    ]),
    people: await related([
      ['People', '莫那能'],
      ['People', '阿爆'],
      ['People', '張惠妹'],
      ['People', '李登輝'],
      ['People', '鄭成功'],
      ['People', '唐鳳'],
      ['People', '鄧麗君'],
      ['People', '三毛'],
      ['People', '陽岱鋼'],
      ['People', '林強'],
    ]),
  };

  const toc = [0, 1, 2, 3, 4, 5, 6, 7, 8].map((n) => ({
    id: `s${n}`,
    label: t(`toc.s${n}`),
    take: t(`toc.s${n}.take`),
  }));
  const moiSrc = pick3(SOURCES[0].title, L);
  const S = toolStrings(lang);
  const voices = (list: typeof ROMAN_VOICES) =>
    list.map((side, i) => ({
      cls: ['side-a', 'side-b', 'side-c'][i] || 'side-c',
      title: pick3(side.title, L),
      items: side.items.map((it) => ({
        html: rich(pick3(it.text, L)) + fnHtml(it.src),
      })),
    }));
  const timeline = (list: typeof ROMAN_TIMELINE) =>
    list.map((e) => ({
      date: e.date,
      cls: e.kind === 'pass' ? 'is-pass' : e.kind === 'key' ? 'is-key' : '',
      html: rich(pick3(e.text, L)) + fnHtml(e.src),
    }));
  return {
    lang,
    topic,
    romTool,
    pick3,
    fmtInt,
    wgGiven,
    SOURCES,
    NAMING_SYSTEMS,
    ROMAN_TIMELINE,
    INDIGENOUS_TIMELINE,
    ROMAN_VOICES,
    INDIGENOUS_VOICES,
    IMMIGRANT_VOICES,
    surnameReadings,
    L,
    en,
    m,
    pop,
    rows,
    conc,
    top10Pct,
    top20Pct,
    top100Pct,
    chen,
    lin,
    cohortsF,
    cohortsM,
    cohortCount,
    shufenN,
    shufenPeak,
    momHist,
    momRecent,
    momLast,
    nc,
    romTop15,
    romSame,
    V,
    tn0,
    t,
    r,
    anatName,
    anatZy,
    anatSpell,
    concSegs,
    top20Bars,
    national10,
    countyMap,
    tiles,
    nameCell,
    cohortRows,
    yearsLabel,
    rocLabel,
    sr,
    localRows,
    toneSup,
    ncBars,
    momPoints,
    related,
    REL,
    toc,
    moiSrc,
    S,
    voices,
    timeline,
  };
}
export type NamesModel = Awaited<ReturnType<typeof buildNamesModel>>;
