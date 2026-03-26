export interface ResourceSite {
  nameKey: string;    // i18n key, e.g. 'resources.site.president'
  url: string;
  domain: string;
  descKey?: string;   // optional description i18n key (featured sites only)
  featured?: boolean; // Top 3 featured per chapter
}

export interface HeroCategory {
  id: string;
  labelKey: string;
  color: string;
  sites: ResourceSite[];
}

// ─── Hero Mindmap Data ───
export const heroCategories: HeroCategory[] = [
  {
    id: 'government',
    labelKey: 'resources.category.government.label',
    color: '#065f46',
    sites: [
      { nameKey: 'resources.site.president', url: 'https://www.president.gov.tw/', domain: 'president.gov.tw' },
      { nameKey: 'resources.site.executiveYuan', url: 'https://www.ey.gov.tw/', domain: 'ey.gov.tw' },
      { nameKey: 'resources.site.legislativeYuan', url: 'https://www.ly.gov.tw/', domain: 'ly.gov.tw', featured: true, descKey: 'resources.featured.legislativeYuan' },
      { nameKey: 'resources.site.mofa', url: 'https://www.mofa.gov.tw/', domain: 'mofa.gov.tw' },
      { nameKey: 'resources.site.moda', url: 'https://moda.gov.tw/', domain: 'moda.gov.tw' },
      { nameKey: 'resources.site.cip', url: 'https://www.cip.gov.tw/', domain: 'cip.gov.tw' },
      { nameKey: 'resources.site.moc', url: 'https://www.moc.gov.tw/', domain: 'moc.gov.tw' },
      { nameKey: 'resources.site.moe', url: 'https://www.moe.gov.tw/', domain: 'moe.gov.tw' },
      { nameKey: 'resources.site.moea', url: 'https://www.moea.gov.tw/', domain: 'moea.gov.tw' },
      { nameKey: 'resources.site.motc', url: 'https://www.motc.gov.tw/', domain: 'motc.gov.tw' },
    ],
  },
  {
    id: 'culture',
    labelKey: 'resources.category.culture.label',
    color: '#059669',
    sites: [
      { nameKey: 'resources.site.ncl', url: 'https://www.ncl.edu.tw/', domain: 'ncl.edu.tw', featured: true, descKey: 'resources.featured.ncl' },
      { nameKey: 'resources.site.npm', url: 'https://www.npm.gov.tw/', domain: 'npm.gov.tw', featured: true, descKey: 'resources.featured.npm' },
      { nameKey: 'resources.site.ntm', url: 'https://www.ntm.gov.tw/', domain: 'ntm.gov.tw' },
      { nameKey: 'resources.site.moc', url: 'https://www.moc.gov.tw/', domain: 'moc.gov.tw' },
      { nameKey: 'resources.site.npgov', url: 'https://np.cpami.gov.tw/', domain: 'np.cpami.gov.tw', featured: true, descKey: 'resources.featured.npgov' },
    ],
  },
  {
    id: 'tourism',
    labelKey: 'resources.category.tourism.label',
    color: '#10b981',
    sites: [
      { nameKey: 'resources.site.taiwanTourism', url: 'https://eng.taiwan.net.tw/', domain: 'eng.taiwan.net.tw' },
      { nameKey: 'resources.site.sunMoonLake', url: 'https://www.sunmoonlake.gov.tw/', domain: 'sunmoonlake.gov.tw' },
      { nameKey: 'resources.site.alishan', url: 'https://www.ali-nsa.net/', domain: 'ali-nsa.net' },
    ],
  },
  {
    id: 'economy',
    labelKey: 'resources.category.economy.label',
    color: '#047857',
    sites: [
      { nameKey: 'resources.site.tsmc', url: 'https://www.tsmc.com/chinese', domain: 'tsmc.com', featured: true, descKey: 'resources.featured.tsmc' },
      { nameKey: 'resources.site.iii', url: 'https://www.iii.org.tw/', domain: 'iii.org.tw' },
      { nameKey: 'resources.site.stat', url: 'https://www.stat.gov.tw/', domain: 'stat.gov.tw' },
      { nameKey: 'resources.site.twse', url: 'https://www.twse.com.tw/', domain: 'twse.com.tw' },
    ],
  },
  {
    id: 'media',
    labelKey: 'resources.category.media.label',
    color: '#064e3b',
    sites: [
      { nameKey: 'resources.site.cna', url: 'https://www.cna.com.tw', domain: 'cna.com.tw' },
      { nameKey: 'resources.site.ptt', url: 'https://www.ptt.cc/', domain: 'ptt.cc', featured: true, descKey: 'resources.featured.ptt' },
      { nameKey: 'resources.site.ptsNews', url: 'https://news.pts.org.tw/', domain: 'news.pts.org.tw', featured: true, descKey: 'resources.featured.ptsNews' },
      { nameKey: 'resources.site.twreporter', url: 'https://www.twreporter.org/', domain: 'twreporter.org', featured: true, descKey: 'resources.featured.twreporter' },
      { nameKey: 'resources.site.taiwanNews', url: 'https://www.taiwannews.com.tw/', domain: 'taiwannews.com.tw' },
    ],
  },
  {
    id: 'opendata',
    labelKey: 'resources.category.opendata.label',
    color: '#059669',
    sites: [
      { nameKey: 'resources.site.dataGov', url: 'https://data.gov.tw/', domain: 'data.gov.tw', featured: true, descKey: 'resources.featured.dataGov' },
      { nameKey: 'resources.site.taiwanGov', url: 'https://www.taiwan.gov.tw/', domain: 'taiwan.gov.tw' },
      { nameKey: 'resources.site.lawDb', url: 'https://law.moj.gov.tw/', domain: 'law.moj.gov.tw' },
      { nameKey: 'resources.site.g0v', url: 'https://g0v.tw/', domain: 'g0v.tw', featured: true, descKey: 'resources.featured.g0vGov' },
    ],
  },
  {
    id: 'taiwanmd',
    labelKey: 'resources.category.taiwanmd.label',
    color: '#10b981',
    sites: [
      { nameKey: 'resources.site.github', url: 'https://github.com/frank890417/taiwan-md', domain: 'github.com' },
      { nameKey: 'resources.site.contribute', url: '/contribute', domain: 'taiwan.md' },
      { nameKey: 'resources.site.rss', url: '/rss.xml', domain: 'taiwan.md' },
    ],
  },
];

// ─── Chapter 1: Government ───
export const governmentFiveYuan: ResourceSite[] = [
  { nameKey: 'resources.site.president', url: 'https://www.president.gov.tw/', domain: 'president.gov.tw' },
  { nameKey: 'resources.site.executiveYuan', url: 'https://www.ey.gov.tw/', domain: 'ey.gov.tw' },
  { nameKey: 'resources.site.legislativeYuan', url: 'https://www.ly.gov.tw/', domain: 'ly.gov.tw', featured: true, descKey: 'resources.featured.legislativeYuan' },
  { nameKey: 'resources.site.judicialYuan', url: 'https://www.judicial.gov.tw/', domain: 'judicial.gov.tw' },
  { nameKey: 'resources.site.examinationYuan', url: 'https://www.exam.gov.tw/', domain: 'exam.gov.tw' },
  { nameKey: 'resources.site.controlYuan', url: 'https://www.cy.gov.tw/', domain: 'cy.gov.tw' },
];

export const governmentMinistries: ResourceSite[] = [
  { nameKey: 'resources.site.mofa', url: 'https://www.mofa.gov.tw/', domain: 'mofa.gov.tw' },
  { nameKey: 'resources.site.moda', url: 'https://moda.gov.tw/', domain: 'moda.gov.tw' },
  { nameKey: 'resources.site.cip', url: 'https://www.cip.gov.tw/', domain: 'cip.gov.tw' },
  { nameKey: 'resources.site.moc', url: 'https://www.moc.gov.tw/', domain: 'moc.gov.tw' },
  { nameKey: 'resources.site.moe', url: 'https://www.moe.gov.tw/', domain: 'moe.gov.tw' },
  { nameKey: 'resources.site.moea', url: 'https://www.moea.gov.tw/', domain: 'moea.gov.tw' },
  { nameKey: 'resources.site.motc', url: 'https://www.motc.gov.tw/', domain: 'motc.gov.tw' },
  { nameKey: 'resources.site.moi', url: 'https://www.moi.gov.tw/', domain: 'moi.gov.tw' },
  { nameKey: 'resources.site.ndc', url: 'https://www.ndc.gov.tw/', domain: 'ndc.gov.tw' },
  { nameKey: 'resources.site.mac', url: 'https://www.mac.gov.tw/', domain: 'mac.gov.tw' },
  { nameKey: 'resources.site.mol', url: 'https://www.mol.gov.tw/', domain: 'mol.gov.tw' },
  { nameKey: 'resources.site.moenv', url: 'https://www.moenv.gov.tw/', domain: 'moenv.gov.tw' },
  { nameKey: 'resources.site.moa', url: 'https://www.moa.gov.tw/', domain: 'moa.gov.tw' },
  { nameKey: 'resources.site.mnd', url: 'https://www.mnd.gov.tw/', domain: 'mnd.gov.tw' },
  { nameKey: 'resources.site.moj', url: 'https://www.moj.gov.tw/', domain: 'moj.gov.tw' },
  { nameKey: 'resources.site.mohw', url: 'https://www.mohw.gov.tw/', domain: 'mohw.gov.tw' },
  { nameKey: 'resources.site.trade', url: 'https://www.trade.gov.tw/', domain: 'trade.gov.tw' },
  { nameKey: 'resources.site.sme', url: 'https://www.sme.gov.tw/', domain: 'sme.gov.tw' },
  { nameKey: 'resources.site.tipo', url: 'https://www.tipo.gov.tw/', domain: 'tipo.gov.tw' },
  { nameKey: 'resources.site.fsc', url: 'https://www.fsc.gov.tw/', domain: 'fsc.gov.tw' },
  { nameKey: 'resources.site.immigration', url: 'https://www.immigration.gov.tw/', domain: 'immigration.gov.tw' },
  { nameKey: 'resources.site.cwa', url: 'https://www.cwa.gov.tw/', domain: 'cwa.gov.tw' },
  { nameKey: 'resources.site.nstc', url: 'https://www.nstc.gov.tw/', domain: 'nstc.gov.tw' },
];

export const governmentLocalGov: ResourceSite[] = [
  { nameKey: 'resources.site.taipei', url: 'https://www.gov.taipei/', domain: 'gov.taipei' },
  { nameKey: 'resources.site.newTaipei', url: 'https://www.ntpc.gov.tw/', domain: 'ntpc.gov.tw' },
  { nameKey: 'resources.site.taichung', url: 'https://www.taichung.gov.tw/', domain: 'taichung.gov.tw' },
  { nameKey: 'resources.site.kaohsiung', url: 'https://www.kcg.gov.tw/', domain: 'kcg.gov.tw' },
  { nameKey: 'resources.site.tainan', url: 'https://www.tainan.gov.tw/', domain: 'tainan.gov.tw' },
  { nameKey: 'resources.site.taoyuan', url: 'https://www.tycg.gov.tw/', domain: 'tycg.gov.tw' },
  { nameKey: 'resources.site.keelung', url: 'https://www.klcg.gov.tw/', domain: 'klcg.gov.tw' },
  { nameKey: 'resources.site.hsinchu', url: 'https://www.hccg.gov.tw/', domain: 'hccg.gov.tw' },
  { nameKey: 'resources.site.chiayi', url: 'https://www.chiayi.gov.tw/', domain: 'chiayi.gov.tw' },
  { nameKey: 'resources.site.yilan', url: 'https://www.e-land.gov.tw/', domain: 'e-land.gov.tw' },
  { nameKey: 'resources.site.hsinchuCounty', url: 'https://www.hsinchu.gov.tw/', domain: 'hsinchu.gov.tw' },
  { nameKey: 'resources.site.miaoli', url: 'https://www.miaoli.gov.tw/', domain: 'miaoli.gov.tw' },
  { nameKey: 'resources.site.changhua', url: 'https://www.chcg.gov.tw/', domain: 'chcg.gov.tw' },
  { nameKey: 'resources.site.nantou', url: 'https://www.nantou.gov.tw/', domain: 'nantou.gov.tw' },
  { nameKey: 'resources.site.yunlin', url: 'https://www.yunlin.gov.tw/', domain: 'yunlin.gov.tw' },
  { nameKey: 'resources.site.chiayiCounty', url: 'https://www.cyhg.gov.tw/', domain: 'cyhg.gov.tw' },
  { nameKey: 'resources.site.pingtung', url: 'https://www.pthg.gov.tw/', domain: 'pthg.gov.tw' },
  { nameKey: 'resources.site.taitung', url: 'https://www.taitung.gov.tw/', domain: 'taitung.gov.tw' },
  { nameKey: 'resources.site.hualien', url: 'https://www.hl.gov.tw/', domain: 'hl.gov.tw' },
  { nameKey: 'resources.site.penghu', url: 'https://www.penghu.gov.tw/', domain: 'penghu.gov.tw' },
  { nameKey: 'resources.site.kinmenGov', url: 'https://www.kinmen.gov.tw/', domain: 'kinmen.gov.tw' },
  { nameKey: 'resources.site.lienchiang', url: 'https://www.matsu.gov.tw/', domain: 'matsu.gov.tw' },
];

export const governmentOpenData: ResourceSite[] = [
  { nameKey: 'resources.site.dataGov', url: 'https://data.gov.tw/', domain: 'data.gov.tw', featured: true, descKey: 'resources.featured.dataGov' },
  { nameKey: 'resources.site.taiwanGov', url: 'https://www.taiwan.gov.tw/', domain: 'taiwan.gov.tw' },
  { nameKey: 'resources.site.lawDb', url: 'https://law.moj.gov.tw/', domain: 'law.moj.gov.tw' },
  { nameKey: 'resources.site.g0v', url: 'https://g0v.tw/', domain: 'g0v.tw', featured: true, descKey: 'resources.featured.g0vGov' },
];

// ─── Chapter 2: Culture ───
export const cultureUniversities: ResourceSite[] = [
  { nameKey: 'resources.site.ntu', url: 'https://www.ntu.edu.tw/', domain: 'ntu.edu.tw' },
  { nameKey: 'resources.site.nthu', url: 'https://www.nthu.edu.tw/', domain: 'nthu.edu.tw' },
  { nameKey: 'resources.site.nycu', url: 'https://www.nycu.edu.tw/', domain: 'nycu.edu.tw' },
  { nameKey: 'resources.site.ncku', url: 'https://web.ncku.edu.tw/', domain: 'ncku.edu.tw' },
  { nameKey: 'resources.site.nccu', url: 'https://www.nccu.edu.tw/', domain: 'nccu.edu.tw' },
  { nameKey: 'resources.site.ntnu', url: 'https://www.ntnu.edu.tw/', domain: 'ntnu.edu.tw' },
  { nameKey: 'resources.site.sinica', url: 'https://www.sinica.edu.tw/', domain: 'sinica.edu.tw' },
  { nameKey: 'resources.site.tesd', url: 'https://tesd.survey.sinica.edu.tw/', domain: 'tesd.survey.sinica.edu.tw' },
  { nameKey: 'resources.site.tcs', url: 'https://crctaiwan.dcat.nycu.edu.tw/index.asp', domain: 'crctaiwan.dcat.nycu.edu.tw' },
  { nameKey: 'resources.site.brill', url: 'https://referenceworks.brill.com/display/db/etso', domain: 'referenceworks.brill.com' },
  { nameKey: 'resources.site.itri', url: 'https://www.itri.org.tw/', domain: 'itri.org.tw' },
  { nameKey: 'resources.site.niar', url: 'https://www.niar.org.tw/', domain: 'niar.org.tw' },
  { nameKey: 'resources.site.airitilibrary', url: 'https://www.airitilibrary.com/', domain: 'airitilibrary.com' },
  { nameKey: 'resources.site.ndltd', url: 'https://ndltd.ncl.edu.tw', domain: 'ndltd.ncl.edu.tw' },
];

export const cultureMuseums: ResourceSite[] = [
  { nameKey: 'resources.site.ncl', url: 'https://www.ncl.edu.tw/', domain: 'ncl.edu.tw', featured: true, descKey: 'resources.featured.ncl' },
  { nameKey: 'resources.site.npm', url: 'https://www.npm.gov.tw/', domain: 'npm.gov.tw', featured: true, descKey: 'resources.featured.npm' },
  { nameKey: 'resources.site.ntm', url: 'https://www.ntm.gov.tw/', domain: 'ntm.gov.tw' },
  { nameKey: 'resources.site.nmth', url: 'https://www.nmth.gov.tw/', domain: 'nmth.gov.tw' },
  { nameKey: 'resources.site.nmns', url: 'https://www.nmns.edu.tw/ch/', domain: 'nmns.edu.tw' },
  { nameKey: 'resources.site.nmmba', url: 'https://www.nmmba.gov.tw/', domain: 'nmmba.gov.tw' },
  { nameKey: 'resources.site.nmtl', url: 'https://www.nmtl.gov.tw/', domain: 'nmtl.gov.tw' },
  { nameKey: 'resources.site.ntmofa', url: 'https://www.ntmofa.gov.tw/', domain: 'ntmofa.gov.tw' },
];

export const cultureVenues: ResourceSite[] = [
  { nameKey: 'resources.site.tfam', url: 'https://www.tfam.museum/', domain: 'tfam.museum' },
  { nameKey: 'resources.site.kmfa', url: 'https://www.kmfa.gov.tw/', domain: 'kmfa.gov.tw' },
  { nameKey: 'resources.site.npacNtt', url: 'https://www.npac-ntt.org/', domain: 'npac-ntt.org' },
  { nameKey: 'resources.site.npacNtch', url: 'https://npac-ntch.org/zh', domain: 'npac-ntch.org' },
  { nameKey: 'resources.site.weiwuying', url: 'https://www.npac-weiwuying.org/', domain: 'npac-weiwuying.org' },
  { nameKey: 'resources.site.songshan', url: 'https://www.songshanculturalpark.org/', domain: 'songshanculturalpark.org' },
  { nameKey: 'resources.site.huashan', url: 'https://www.huashan1914.com/', domain: 'huashan1914.com' },
  { nameKey: 'resources.site.pier2', url: 'https://pier2.org/', domain: 'pier2.org' },
  { nameKey: 'resources.site.digitalArchives', url: 'https://digitalarchives.tw/', domain: 'digitalarchives.tw' },
  { nameKey: 'resources.site.scitechVista', url: 'https://scitechvista.nat.gov.tw/', domain: 'scitechvista.nat.gov.tw' },
  { nameKey: 'resources.site.tcmb', url: 'https://tcmb.culture.tw/zh-tw', domain: 'tcmb.culture.tw' },
  { nameKey: 'resources.site.taicca', url: 'https://taicca.tw/', domain: 'taicca.tw' },
];

export const cultureParks: ResourceSite[] = [
  { nameKey: 'resources.site.npgov', url: 'https://np.cpami.gov.tw/', domain: 'np.cpami.gov.tw', featured: true, descKey: 'resources.featured.npgov' },
  { nameKey: 'resources.site.yushan', url: 'https://www.ysnp.gov.tw/', domain: 'ysnp.gov.tw' },
  { nameKey: 'resources.site.taroko', url: 'https://www.taroko.gov.tw/', domain: 'taroko.gov.tw' },
  { nameKey: 'resources.site.kenting', url: 'https://www.ktnp.gov.tw/', domain: 'ktnp.gov.tw' },
  { nameKey: 'resources.site.sheipa', url: 'https://www.spnp.gov.tw/', domain: 'spnp.gov.tw' },
  { nameKey: 'resources.site.yangmingshan', url: 'https://www.ymsnp.gov.tw/', domain: 'ymsnp.gov.tw' },
  { nameKey: 'resources.site.kinmenPark', url: 'https://www.kmnp.gov.tw/', domain: 'kmnp.gov.tw' },
  { nameKey: 'resources.site.taijiang', url: 'https://www.tjnp.gov.tw/', domain: 'tjnp.gov.tw' },
  { nameKey: 'resources.site.dongsha', url: 'https://www.marine.gov.tw/', domain: 'marine.gov.tw' },
  { nameKey: 'resources.site.southPenghu', url: 'https://www.marine.gov.tw/', domain: 'marine.gov.tw' },
  { nameKey: 'resources.site.taiwanTourism', url: 'https://eng.taiwan.net.tw/', domain: 'eng.taiwan.net.tw' },
  { nameKey: 'resources.site.sunMoonLake', url: 'https://www.sunmoonlake.gov.tw/', domain: 'sunmoonlake.gov.tw' },
  { nameKey: 'resources.site.alishan', url: 'https://www.ali-nsa.net/', domain: 'ali-nsa.net' },
];

// ─── Chapter 3: Media ───
export const mediaMainstream: ResourceSite[] = [
  { nameKey: 'resources.site.cna', url: 'https://www.cna.com.tw', domain: 'cna.com.tw' },
  { nameKey: 'resources.site.ptsNews', url: 'https://news.pts.org.tw/', domain: 'news.pts.org.tw', featured: true, descKey: 'resources.featured.ptsNews' },
  { nameKey: 'resources.site.pts', url: 'https://www.pts.org.tw/', domain: 'pts.org.tw' },
  { nameKey: 'resources.site.focusTaiwan', url: 'https://focustaiwan.tw/', domain: 'focustaiwan.tw' },
  { nameKey: 'resources.site.taiwanToday', url: 'https://www.taiwantoday.tw/', domain: 'taiwantoday.tw' },
  { nameKey: 'resources.site.panorama', url: 'https://www.taiwan-panorama.com/', domain: 'taiwan-panorama.com' },
  { nameKey: 'resources.site.rti', url: 'https://www.rti.org.tw/', domain: 'rti.org.tw' },
  { nameKey: 'resources.site.udn', url: 'https://udn.com/', domain: 'udn.com' },
  { nameKey: 'resources.site.ltn', url: 'https://www.ltn.com.tw/', domain: 'ltn.com.tw' },
  { nameKey: 'resources.site.tvbs', url: 'https://news.tvbs.com.tw/', domain: 'news.tvbs.com.tw' },
  { nameKey: 'resources.site.setn', url: 'https://www.setn.com/', domain: 'setn.com' },
  { nameKey: 'resources.site.ebc', url: 'https://news.ebc.net.tw/', domain: 'news.ebc.net.tw' },
  { nameKey: 'resources.site.commonwealth', url: 'https://www.cw.com.tw/', domain: 'cw.com.tw' },
  { nameKey: 'resources.site.businesstoday', url: 'https://www.businesstoday.com.tw/', domain: 'businesstoday.com.tw' },
  { nameKey: 'resources.site.businessweekly', url: 'https://www.businessweekly.com.tw/', domain: 'businessweekly.com.tw' },
];

export const mediaDigital: ResourceSite[] = [
  { nameKey: 'resources.site.twreporter', url: 'https://www.twreporter.org/', domain: 'twreporter.org', featured: true, descKey: 'resources.featured.twreporter' },
  { nameKey: 'resources.site.ptt', url: 'https://www.ptt.cc/', domain: 'ptt.cc', featured: true, descKey: 'resources.featured.ptt' },
  { nameKey: 'resources.site.taiwanNews', url: 'https://www.taiwannews.com.tw/', domain: 'taiwannews.com.tw' },
  { nameKey: 'resources.site.thenewslens', url: 'https://www.thenewslens.com/', domain: 'thenewslens.com' },
  { nameKey: 'resources.site.upmedia', url: 'http://www.upmedia.mg/', domain: 'upmedia.mg' },
  { nameKey: 'resources.site.storm', url: 'https://www.storm.mg/', domain: 'storm.mg' },
];

export const mediaNgo: ResourceSite[] = [
  { nameKey: 'resources.site.tahr', url: 'https://www.tahr.org.tw/', domain: 'tahr.org.tw' },
  { nameKey: 'resources.site.teia', url: 'https://teia.tw/', domain: 'teia.tw' },
  { nameKey: 'resources.site.sow', url: 'https://www.sow.org.tw/', domain: 'sow.org.tw' },
  { nameKey: 'resources.site.ocf', url: 'https://ocf.tw/', domain: 'ocf.tw' },
  { nameKey: 'resources.site.tfc', url: 'https://tfc-taiwan.org.tw/', domain: 'tfc-taiwan.org.tw' },
  { nameKey: 'resources.site.twnic', url: 'https://www.twnic.net.tw/', domain: 'twnic.net.tw' },
  { nameKey: 'resources.site.wikimedia', url: 'https://wikimedia.tw/', domain: 'wikimedia.tw' },
  { nameKey: 'resources.site.digitalDiplomacy', url: 'https://www.digitaldiplomacy.tw/', domain: 'digitaldiplomacy.tw' },
];

// ─── Chapter 4: Economy ───
export const econCompanies: ResourceSite[] = [
  { nameKey: 'resources.site.tsmc', url: 'https://www.tsmc.com/chinese', domain: 'tsmc.com', featured: true, descKey: 'resources.featured.tsmc' },
  { nameKey: 'resources.site.umc', url: 'https://www.umc.com/', domain: 'umc.com' },
  { nameKey: 'resources.site.foxconn', url: 'https://www.foxconn.com/', domain: 'foxconn.com' },
  { nameKey: 'resources.site.delta', url: 'https://www.deltaww.com/', domain: 'deltaww.com' },
  { nameKey: 'resources.site.taiwanExcellence', url: 'https://www.taiwanexcellence.org/en', domain: 'taiwanexcellence.org' },
  { nameKey: 'resources.site.cht', url: 'https://www.cht.com.tw/', domain: 'cht.com.tw' },
  { nameKey: 'resources.site.taipower', url: 'https://www.taipower.com.tw/', domain: 'taipower.com.tw' },
  { nameKey: 'resources.site.iii', url: 'https://www.iii.org.tw/', domain: 'iii.org.tw' },
  { nameKey: 'resources.site.investTaiwan', url: 'https://investtaiwan.nat.gov.tw/', domain: 'investtaiwan.nat.gov.tw' },
];

export const econTransport: ResourceSite[] = [
  { nameKey: 'resources.site.railway', url: 'https://www.railway.gov.tw/tra-tip-web/tip', domain: 'railway.gov.tw' },
  { nameKey: 'resources.site.thsrc', url: 'https://www.thsrc.com.tw/', domain: 'thsrc.com.tw' },
  { nameKey: 'resources.site.taiwanTrip', url: 'https://www.taiwantrip.com.tw/', domain: 'taiwantrip.com.tw' },
  { nameKey: 'resources.site.taoyuanAirport', url: 'https://www.taoyuan-airport.com/', domain: 'taoyuan-airport.com' },
  { nameKey: 'resources.site.metroTaipei', url: 'https://www.metro.taipei/', domain: 'metro.taipei' },
  { nameKey: 'resources.site.krtc', url: 'https://www.krtco.com.tw/', domain: 'krtco.com.tw' },
];

export const econHealth: ResourceSite[] = [
  { nameKey: 'resources.site.cdc', url: 'https://www.cdc.gov.tw/', domain: 'cdc.gov.tw' },
  { nameKey: 'resources.site.nhi', url: 'https://www.nhi.gov.tw/', domain: 'nhi.gov.tw', featured: true, descKey: 'resources.featured.nhi' },
  { nameKey: 'resources.site.ntuh', url: 'https://www.ntuh.gov.tw/ntuh/Index.action', domain: 'ntuh.gov.tw' },
  { nameKey: 'resources.site.vghtpe', url: 'https://www.vghtpe.gov.tw/', domain: 'vghtpe.gov.tw' },
  { nameKey: 'resources.site.cgmh', url: 'https://www.cgmh.org.tw/', domain: 'cgmh.org.tw' },
  { nameKey: 'resources.site.cmuh', url: 'https://www.cmuh.cmu.edu.tw/', domain: 'cmuh.cmu.edu.tw' },
  { nameKey: 'resources.site.kmuh', url: 'https://www.kmuh.org.tw/', domain: 'kmuh.org.tw' },
];

export const econFinance: ResourceSite[] = [
  { nameKey: 'resources.site.stat', url: 'https://www.stat.gov.tw/', domain: 'stat.gov.tw' },
  { nameKey: 'resources.site.twse', url: 'https://www.twse.com.tw/', domain: 'twse.com.tw', featured: true, descKey: 'resources.featured.twse' },
  { nameKey: 'resources.site.tpex', url: 'https://www.tpex.org.tw/', domain: 'tpex.org.tw' },
];

// ─── Chapter 5: Community ───
export const communityProjects: ResourceSite[] = [
  { nameKey: 'resources.site.g0v', url: 'https://g0v.tw/', domain: 'g0v.tw', featured: true, descKey: 'resources.featured.g0v' },
  { nameKey: 'resources.site.cofacts', url: 'https://cofacts.tw/', domain: 'cofacts.tw', featured: true, descKey: 'resources.featured.cofacts' },
  { nameKey: 'resources.site.disfactory', url: 'https://disfactory.tw/', domain: 'disfactory.tw' },
  { nameKey: 'resources.site.electionMap', url: 'https://votes.tw/', domain: 'votes.tw' },
  { nameKey: 'resources.site.maskMap', url: 'https://kiang.github.io/pharmacies/', domain: 'kiang.github.io' },
  { nameKey: 'resources.site.goodinfo', url: 'https://goodinfo.tw/', domain: 'goodinfo.tw' },
  { nameKey: 'resources.site.ccw', url: 'https://www.ccw.org.tw/', domain: 'ccw.org.tw' },
  { nameKey: 'resources.site.thaubing', url: 'https://thaubing.gcaa.org.tw/', domain: 'thaubing.gcaa.org.tw' },
  { nameKey: 'resources.site.politicalDonation', url: 'https://campaign-finance.g0v.ronny.tw/', domain: 'campaign-finance.g0v.ronny.tw' },
  { nameKey: 'resources.site.taiwanmd', url: 'https://taiwan.md/', domain: 'taiwan.md', featured: true, descKey: 'resources.featured.taiwanmd' },
];

export const communityFood: ResourceSite[] = [
  { nameKey: 'resources.site.burgerMap', url: 'https://hsieh-george.github.io/taipei-burger-map/', domain: 'hsieh-george.github.io' },
  { nameKey: 'resources.site.nightMarket', url: 'https://github.com/hsiu0305/NightMarketSwift', domain: 'github.com' },
];

// ─── Taiwan.md Links (footer) ───
export const taiwanmdLinks: ResourceSite[] = [
  { nameKey: 'resources.site.github', url: 'https://github.com/frank890417/taiwan-md', domain: 'github.com' },
  { nameKey: 'resources.site.contribute', url: '/contribute', domain: 'taiwan.md' },
  { nameKey: 'resources.site.rss', url: '/rss.xml', domain: 'taiwan.md' },
];
