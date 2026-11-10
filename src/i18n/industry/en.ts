/**
 * en.ts — topic UI strings (English). Keys must mirror zh.ts
 * (scripts/tools/check-industry-i18n.mjs reconciles them).
 * No evaluation, forecast or buy/sell language about individual stocks.
 */
import type { zh } from './zh';

export const en: Record<keyof typeof zh, string> = {
  // ── /companies upgrade ─────────────────────────────────────────────
  'co.disclaimer.h':
    'This page organises public data. It is not investment advice',
  'co.disclaimer.p':
    'The ranking is compiled from public filings: market capitalisation is a snapshot at the close on {date}, revenue is the full year 2025. Taiwan.md does not rate individual stocks, forecast prices or recommend any trade.',
  'co.topic.h': 'Why the list looks like this',
  'co.topic.p':
    'Seven of the top ten make electronics, and one company holds about four-tenths of the listed market’s value. It took seventy years, from sugar and textiles to wafers, to grow this structure — and some worry it is too concentrated.',
  'co.topic.cta1': 'Read the industry feature',
  'co.topic.cta2': 'See the supply-chain maps',
  'co.ctl.h': 'Sort and filter',
  'co.ctl.sort': 'Sort by',
  'co.ctl.industry': 'Industry (TWSE classification)',
  'co.ctl.county': 'Headquarters',
  'co.ctl.all': 'All',
  'co.ctl.reset': 'Reset',
  'co.ctl.dir.asc': 'Ascending',
  'co.ctl.dir.desc': 'Descending',
  'co.sort.rank': 'Market-cap rank',
  'co.sort.marketCap': 'Market cap',
  'co.sort.revenue': '2025 revenue',
  'co.sort.employees': 'Employees',
  'co.sort.founded': 'Founded',
  'co.summary':
    'Showing {n} companies, NT${cap} combined market cap, {pct}% of the top 50',
  'co.summary.empty': 'No company matches both filters',
  'co.unit.money': 'B',
  'co.col.hq': 'HQ',
  'co.col.change': 'vs June list',
  'co.change.new': 'New entry',
  'co.change.same': 'Unchanged',
  'co.change.up': 'Up {n}',
  'co.change.down': 'Down {n}',
  'co.note.change':
    '“vs June list” compares against this page’s June 2026 edition. That edition covered TWSE-listed companies only and derived market cap from index weights; this edition multiplies the closing price by common shares outstanding and covers both the TWSE and the TPEx. The methods differ, so read the rank changes for direction only.',
  'co.note.hq':
    'Headquarters is the registered address in the TWSE and TPEx company profiles (as of {date}); operations may be elsewhere. The industry filter uses the official TWSE classification, which differs from the “Sector” column — that column is Taiwan.md’s own grouping by supply-chain position.',

  // ── TWSE / TPEx industry classification ────────────────────────────
  'tse.01': 'Cement',
  'tse.02': 'Food',
  'tse.03': 'Plastics',
  'tse.04': 'Textiles',
  'tse.10': 'Iron & steel',
  'tse.15': 'Shipping & transport',
  'tse.17': 'Finance & insurance',
  'tse.22': 'Biotech & medical',
  'tse.23': 'Oil, gas & electricity',
  'tse.24': 'Semiconductors',
  'tse.25': 'Computers & peripherals',
  'tse.26': 'Optoelectronics',
  'tse.27': 'Communications & internet',
  'tse.28': 'Electronic components',
  'tse.31': 'Other electronics',
  'tse.37': 'Sports & leisure',

  // ── 22 counties and cities ─────────────────────────────────────────
  'county.臺北市': 'Taipei',
  'county.新北市': 'New Taipei',
  'county.桃園市': 'Taoyuan',
  'county.臺中市': 'Taichung',
  'county.臺南市': 'Tainan',
  'county.高雄市': 'Kaohsiung',
  'county.基隆市': 'Keelung',
  'county.新竹市': 'Hsinchu City',
  'county.嘉義市': 'Chiayi City',
  'county.新竹縣': 'Hsinchu County',
  'county.苗栗縣': 'Miaoli',
  'county.彰化縣': 'Changhua',
  'county.南投縣': 'Nantou',
  'county.雲林縣': 'Yunlin',
  'county.嘉義縣': 'Chiayi County',
  'county.屏東縣': 'Pingtung',
  'county.宜蘭縣': 'Yilan',
  'county.花蓮縣': 'Hualien',
  'county.臺東縣': 'Taitung',
  'county.澎湖縣': 'Penghu',
  'county.金門縣': 'Kinmen',
  'county.連江縣': 'Lienchiang',

  // ── /industry: meta and hero ───────────────────────────────────────
  'meta.title':
    'Taiwan’s Industries: exports, GDP, science parks and listed companies — seventy years on the way to the wafer',
  'meta.description':
    'In 2025, 74% of Taiwan’s exports were electronics, manufacturing was 38.6% of GDP, and one company made up 38% of the listed market. This page uses official statistics to show how that structure came about: long-run exports and GDP, science parks, factories by county, semiconductor output, institutions and a timeline, plus six public debates in the words of each side. Every figure carries a source and a date.',
  'hero.eyebrow': 'Feature · Industries and listed companies',
  'hero.title': 'Taiwan’s Industries',
  'hero.subtitle':
    'From sugar to wafers: what this country earns its living from, who is worried, and what is already on the calendar',
  'hero.verse':
    'In 1952, nine-tenths of exports came from the fields.\nIn 2025, three of every four export dollars were electronics.\nThe seventy years in between are laid out on this page.',
  'hero.stat.export':
    'Electronic components plus ICT and audio-video products as a share of {year} exports',
  'hero.stat.mfg': 'Manufacturing as a share of GDP, {year}',
  'hero.stat.parks': 'Revenue of the three science parks, {year}',
  'hero.stat.tsmc': 'TSMC’s share of total listed market cap (close of {date})',
  'hero.brief': 'The three-minute version',
  'hero.jump': 'Jump to a section',
  'subnav.label': 'Sections on this page',
  'disclaimer.h': 'Organised public data, not investment advice. ',
  'disclaimer.p':
    'The market capitalisation, revenue and industry classifications cited in this feature come from public filings and are used only to describe industrial structure. Taiwan.md does not rate individual stocks, forecast prices or recommend any trade.',
  langnote:
    'This page has not been translated into this language yet, so it is shown in English.',
  'label.related': 'Related articles on Taiwan.md',
  'label.source': 'Source',
  'label.readmore': 'Read the article',
  'label.translated': 'Translation: ',
  'label.accessed': 'accessed',
  'label.generated': 'Data file generated',

  'toc.s1': 'History',
  'toc.s1.take':
    'In under forty years, exports went from nine-tenths farm goods to 95% industrial goods',
  'toc.s2': 'Institutions',
  'toc.s2.take':
    'Industrial policy, science parks, tax incentives and the capital market — four tools in relay',
  'toc.s3': 'Today',
  'toc.s3.take':
    '74% of 2025 exports were electronics, and the United States became the largest market',
  'toc.s4': 'Chips and AI',
  'toc.s4.take':
    'From wafer to server rack: which links of three supply chains sit in Taiwan',
  'toc.s5': 'The ranking',
  'toc.s5.take':
    'One company is 38% of the listed market; the top fifty are 76%',
  'toc.s6': 'The map',
  'toc.s6.take':
    'Taoyuan has the highest factory revenue; the Southern Taiwan Science Park the highest park revenue',
  'toc.s7': 'Viewpoints',
  'toc.s7.take': 'Six debates, each side in its own words',
  'toc.s8': 'Assets and constraints',
  'toc.s8.take': 'Strengths, sticking points, and what is already scheduled',
  'toc.s9': 'Tools and data',
  'toc.s9.take':
    'Ranking, supply-chain maps, data download, and every related article',

  // ── §1 History ─────────────────────────────────────────────────────
  's1.kicker':
    'First, what grew in the fields.\nThen, what factories made.\nOnly then, what comes out of a cleanroom.',
  's1.h2':
    'In under forty years, exports went from nine-tenths farm goods to 95% industrial goods',
  's1.lede':
    'In 1952, agricultural and processed agricultural products were 91.9% of exports. By 1970 industrial products were already 78.6%; by 1990, 95.5%. Every later section stands on this curve.',
  's1.chart.title':
    'Export structure 1952–1990: farm and processed farm goods fell from 92% to 4.5%',
  's1.chart.sub':
    'Share of total exports. One point each for 1952, 1955, 1960, 1965 and 1970; annual from 1973.',
  's1.p1':
    'The turn is concentrated in the 1960s. Industrial products were 32.3% of exports in 1960, 46.0% in 1965 and 78.6% in 1970. The institutions that arrived in that decade are on the timeline below.',
  's1.p2':
    'The chart stops at 1990 because the two data sets do not join: before 1990 it is the three-way split in the CEPD’s Taiwan Statistical Data Book, and from 2001 the Ministry of Finance classifies by commodity. We do not draw a line across the gap; the structure after 2001 is in section 3.',
  's1.tl.h':
    'Timeline: policy, companies, markets and the world, on four tracks',
  's1.tl.note':
    'Every entry cites an official source or the institution itself; follow the arrow for the original. You can view one track at a time.',
  'tl.all': 'All',
  'tl.track.policy': 'Policy and institutions',
  'tl.track.company': 'Companies and technology',
  'tl.track.market': 'Capital market',
  'tl.track.world': 'International',
  'lh.agri': 'Agricultural products',
  'lh.proc': 'Processed agricultural products',
  'lh.ind': 'Industrial products',

  // ── §2 Institutions ────────────────────────────────────────────────
  's2.kicker':
    'The state levelled the land,\nthe state gave up the tax,\nand later the market learned to run on its own.',
  's2.h2':
    'The state first supplied land, tax breaks and technology; the capital market then scaled it up',
  's2.lede':
    'The way Taiwan raised its industries can be split into four tools. They came on stage in different decades, and all four are still at work.',
  's2.chart.title':
    'The three science parks made {total} in {year}; the Southern park has overtaken Hsinchu',
  's2.chart.sub':
    'Annual revenue of park enterprises. Official monthly data on one basis for all three parks start in 2017, so the chart does too.',
  's2.p1':
    'The three parks together made NT$2.46 trillion in 2017 and NT$5.80 trillion in 2025. The Southern Taiwan Science Park grew most, from NT$878.8 billion to NT$2.97 trillion, up 34% in 2025 alone. Hsinchu went from NT$1.02 trillion to NT$1.70 trillion over the same period.',
  's2.p2':
    'Headcount did not rise in proportion. The parks employed 272,000 people at the end of 2017 and 340,000 at the end of 2025, a quarter more, while revenue became 2.4 times as large.',
  'park.hsinchu': 'Hsinchu',
  'park.central': 'Central',
  'park.southern': 'Southern',

  // ── §3 Today ───────────────────────────────────────────────────────
  's3.kicker':
    'Textiles fell from a tenth to one percent.\nICT products first lost half their share,\nthen tripled it in three years.',
  's3.h2': 'In {year}, three of every four export dollars were electronics',
  's3.lede':
    'In {y0}, electronic components plus ICT and audio-video products were {s0} of exports; in {y1} they were {s1}. Total exports that year were US${totalB} billion.',
  's3.chart1.title':
    'Export shares {y0} → {y1}: ICT and audio-video products went from {ict0} to {ict1}, overtaking electronic components',
  's3.chart1.sub':
    'Ministry of Finance major-commodity classification, share of total exports. The current classification has been applied back to 2001, so both ends are on the same basis.',
  's3.p1':
    'ICT and audio-video products traced a U: 24.8% in 2001, 11.3% in 2010, 13.5% in 2022, 27.9% in 2024 and 39.2% in 2025, passing electronic components (34.7%) for the first time. A table note in the Ministry of Finance’s December 2025 release says the sales flows of the two categories have “undergone structural change with the reorganisation of global supply chains and some manufacturers expanding production in Taiwan”. Over the same years textiles fell from 10.0% to 1.0% and machinery from 8.0% to 4.0%.',
  's3.chart2.title':
    'In {year} the United States took {us} of exports, more than China and Hong Kong’s {cn}',
  's3.chart2.sub':
    'Share by destination, computed from Ministry of Finance export values by country. One point each for 2001, 2005, 2010 and 2015; annual from 2018.',
  's3.p2':
    'China and Hong Kong took 43.9% in 2020 and 26.6% five years later. The United States rose from 14.7% to 31.0% and ASEAN from 15.4% to 18.5%; Japan and Europe both declined.',
  's3.chart3.title':
    'Industry as a share of GDP: 44.7% in 1985, 30.9% in 2000, back to {ind} in {y}',
  's3.chart3.sub':
    'Shares of nominal GDP (production side) by sector. For 1951–1980 the DGBAS publishes amounts only; shares are computed from them.',
  's3.chart4.title':
    'Electronic-components manufacturing as a share of GDP: {v0} in {y0}, {v1} in {y1}',
  's3.chart4.sub':
    'DGBAS value added by detailed industry, as a share of GDP. The 2025 detailed-industry figures have not been published.',
  's3.p3':
    'By DGBAS figures the economy grew {growth25}% in 2025; the forecast released on {released} put 2026 at {f26}%.',
  's3.note':
    '“Electronics” is counted two ways in this section. Exports use the Ministry of Finance commodity classification (electronic components; ICT and audio-video products); GDP uses the DGBAS industry classification (electronic-components manufacturing; computers, electronic and optical products). The two cover different ground and cannot be converted into each other.',
  'exp.ec': 'Electronic components',
  'exp.ict': 'ICT & audio-video',
  'exp.metal': 'Base metals',
  'exp.machinery': 'Machinery',
  'exp.plastics': 'Plastics & rubber',
  'exp.chem': 'Chemicals',
  'exp.mineral': 'Mineral products',
  'exp.textile': 'Textiles',
  'exp.optics': 'Optical instruments',
  'exp.transport': 'Transport equipment',
  'exp.electrical': 'Electrical machinery',
  'mk.cnhk': 'China & Hong Kong',
  'mk.us': 'United States',
  'mk.asean': 'ASEAN',
  'mk.jp': 'Japan',
  'mk.eu': 'Europe',
  'gdp.agriculture': 'Agriculture',
  'gdp.industry': 'Industry',
  'gdp.services': 'Services',
  'gdp.components': 'Electronic components',
  'gdp.computers': 'Computers, electronic & optical',

  // ── §5 The ranking ─────────────────────────────────────────────────
  's5.kicker':
    'A table of fifty rows,\nand the first row is nearly four-tenths of it.',
  's5.h2':
    'One company is {top1}% of the listed market; the top fifty together are {top50}%',
  's5.lede':
    'At the close on {date}, the common shares listed on the TWSE and the TPEx were worth {total} in total. Cut that into four pieces.',
  's5.chart1.title': 'What the listed market is made of (close of {date})',
  's5.chart1.src':
    'Market cap = closing price on {date} × common shares outstanding; TWSE plus TPEx, excluding the Emerging Stock Board, ETFs and preferred shares. Source: TWSE and TPEx OpenAPI.',
  's5.conc.top1': 'TSMC',
  's5.conc.top2to10': 'Ranks 2–10',
  's5.conc.rest': 'Ranks 11–50',
  's5.conc.outside': 'All other listed companies',
  's5.p1':
    'Counting TWSE-listed companies only, TSMC is {twsePct}% and the top ten together are {top10}%.',
  's5.chart2.title':
    'Of the top fifty, the TWSE classifies {n} as semiconductors; they hold {share}% of the list’s market cap',
  's5.chart2.sub':
    'Market cap summed by official TWSE industry; number of companies in brackets.',
  's5.chart2.now': 'Combined market cap',
  's5.chart2.src':
    'Snapshot at the close of {date}; industry from TWSE and TPEx company profiles',
  's5.hist.title': 'Top ten by market cap at each year-end',
  's5.hist.rank': 'Rank',
  's5.hist.nodata':
    'We could not obtain official year-end top-ten lists on a single consistent basis, so no chart is drawn here. The only comparison available is between this site’s June and October 2026 snapshots, in the “vs June list” column of the ranking page.',
  's5.p2':
    'Five names on the list changed in four months. Between June and October 2026 ASPEED, Advantech, Kinsus, PharmaEssentia and MPI entered; Uni-President, Far EasTone, BizLink, KYEC and WinWay dropped out. Finance and insurance has 12 companies on the list, one more than semiconductors, with less than a sixth of their combined market cap.',

  // ── §6 The map ─────────────────────────────────────────────────────
  's6.kicker':
    'Taichung has the most factories,\nTaoyuan the most revenue,\nand the Southern park the largest park revenue.',
  's6.h2': '{c1} has the highest factory revenue; {c2} is second',
  's6.lede':
    'According to the Ministry of Economic Affairs’ factory census, {n} factories were operating in {year}, with combined annual revenue of {rev}. Here they are allocated to the 22 counties and cities by factory location.',
  's6.chart.title': 'Factory revenue by county, {year}: {c1} leads with {v1}',
  's6.chart.sub':
    'Darker means more. Counted by factory location; factories inside science parks belong to the county they stand in.',
  's6.chart.value': 'Factory revenue',
  's6.chart.hq': 'Top-fifty headquarters',
  's6.p1':
    'The top six are Taoyuan, Kaohsiung, Tainan, Taichung, Hsinchu County and New Taipei: NT$16.6 trillion together, three-quarters of the national total. Taipei City’s factories made only NT$118.4 billion, yet it is the registered address of 23 of the top fifty companies — the plants are elsewhere, the head offices and financial holdings are in Taipei.',
  's6.p2':
    'Rank by number of factories and the picture changes. Taichung has the most with 18,809, then New Taipei with 17,669, Changhua with 12,619 and Taoyuan with 11,827. Changhua has nearly seven times as many factories as Hsinchu County and four-tenths of its revenue.',
  's6.clusters.h': 'A few clusters with an official source',
  's6.parks.h': 'Bases of the three science parks',
  's6.parks.park': 'Park',
  's6.parks.base': 'Base',
  's6.parks.county': 'County / city',
  's6.parks.year': 'Approved or founded',
  's6.note':
    'The tile map shows totals, not divided by population or area. It answers “where is the output”, not “where do people earn more”. Lienchiang County’s revenue is withheld because it has too few factories.',

  // ── §9 Tools and data ──────────────────────────────────────────────
  's9.kicker':
    'Sort the table yourself,\ntrace the chain yourself,\ntake the numbers with you.',
  's9.h2':
    'The ranking, the supply chains, the timeline and the data file are all there to be used',
  's9.tool.k': 'Tool',
  's9.tool.rank.h': 'Top fifty by market cap',
  's9.tool.rank.p':
    'Sort by market cap, revenue, employees or founding year; filter by TWSE industry and headquarters county.',
  's9.tool.rank.cta': 'Open the ranking',
  's9.tool.chains.h': 'Supply-chain maps',
  's9.tool.chains.p':
    'Semiconductors, AI servers and tungsten: link by link, which companies are in Taiwan and which link is imported.',
  's9.tool.chains.cta': 'See the three chains',
  's9.tool.tl.h': 'Industry timeline',
  's9.tool.tl.p':
    'From the 1950s to 2026 on four tracks — policy, companies, capital market, international — viewable separately.',
  's9.tool.tl.cta': 'Back to the timeline',
  's9.tool.data.h': 'Data download',
  's9.tool.data.p':
    'Every series on this page with its unit, source URL and access date, in one JSON file. CC BY-SA 4.0.',
  's9.tool.data.cta': 'Download JSON',
  's9.articles.h': 'Every related article on the site',
  'g.companies': 'Companies',
  'g.industries': 'Industries',
  'g.system': 'Institutions and history',
  'g.resources': 'Water, power and park surroundings',
  'g.people': 'People',
  's9.link.timeline': 'Taiwan history timeline',
  's9.link.map': 'Map',
  's9.sources.h': 'Sources',
  's9.sources.p':
    'Official statistics come first. Each series in the data file carries its source URL, period and access date; verbatim excerpts kept during research are in the repository’s research files. Where data could not be obtained the page says so; nothing is estimated.',
  's9.research': 'Research files and source excerpts (GitHub)',
  's9.corrections': 'Found an error? Open an issue',

  // ── §4 Chips and AI ────────────────────────────────────────────────
  's4.kicker':
    'After a wafer leaves the fab\nit still has to be packaged, tested, powered and cooled\nbefore it becomes a rack of servers.',
  's4.h2':
    'Taiwan’s IC industry produced NT$6.5 trillion in 2025; foundry was 64% of it',
  's4.lede':
    'The Taiwan Semiconductor Industry Association divides the IC industry into design, manufacturing, packaging and testing. Together the four made NT$1.77 trillion in 2010 and NT$6.52 trillion in 2025. The figure counts only companies headquartered in Taiwan.',
  's4.chart.title':
    'Taiwan IC industry output: {total} in {y}, 3.7 times the level of fifteen years earlier',
  's4.chart.sub':
    'Companies headquartered in Taiwan. IC manufacturing is split into foundry and memory & other manufacturing.',
  's4.nodata':
    'Semiconductor output data could not be obtained this time, so no chart is drawn.',
  's4.p1':
    'Foundry grew most over the fifteen years, from NT$583 billion to NT$4.17 trillion. IC design went from NT$455 billion to NT$1.42 trillion. Packaging and testing together went from NT$415 billion to NT$711 billion, and their share of the total fell from 23% to 11%.',
  's4.p2':
    'The line fell in two years: by 11.7% in 2011 and by 10.2% in 2023. The association’s August 2026 estimate puts the whole of 2026 at NT$9.19 trillion, up 40.9%. That is an estimate, not an outcome.',
  'ic.design': 'IC design',
  'ic.foundry': 'Foundry',
  'ic.memory_and_other': 'Memory & other mfg.',
  'ic.packaging': 'Packaging',
  'ic.testing': 'Testing',
  's4.chain.k': 'Supply-chain map',
  's4.chain.semi.h': 'Semiconductors',
  's4.chain.semi.p':
    'From silicon IP, design, wafer materials and foundry to equipment, packaging and testing: which companies are in Taiwan, link by link.',
  's4.chain.ai.h': 'AI servers',
  's4.chain.ai.p':
    'What happens after the chip: substrates, cooling, power, chassis, cabling, then system and rack assembly.',
  's4.chain.tungsten.h': 'Tungsten',
  's4.chain.tungsten.p':
    'The path of one metal: where the ore comes from, who turns it into powder, who turns it into cutting tools and the wiring inside chips.',
  's4.chain.cta': 'See this chain',

  // ── §7 Viewpoints ──────────────────────────────────────────────────
  's7.kicker': 'The same wafer fab:\nsome see a shield,\nsome see a risk.',
  's7.h2': 'Six debates, each side in its own words',
  's7.lede':
    'Every card below is a named, public statement, quoted from the original with its date and source. The order is fixed: those raising a concern first, those responding after. This section draws no conclusion.',
  's7.note':
    'The quotations are excerpts from longer documents or remarks; follow the source link for the full context. Where no named public statement could be found for a position, we have not written one on its behalf.',

  // ── §8 Assets and constraints ──────────────────────────────────────
  's8.kicker': 'The cards are in hand,\nand the problems are on the table.',
  's8.h2': 'Strengths, sticking points, and what is already scheduled',
  's8.lede':
    'All three columns contain only facts that appear earlier on this page or have an official source. The third lists announced plans and timetables only; it makes no forecast.',
  's8.strengths.h': 'Strengths',
  's8.constraints.h': 'Sticking points',
  's8.scheduled.h': 'Already scheduled',
  's8.note':
    'Dates and amounts in the third column are the plans as announced and may change.',

  // ── §2 institution cards ───────────────────────────────────────────
  's2.tool.policy.k': 'Tool one',
  's2.tool.policy.h':
    'Industrial policy: pick the field, supply the technology',
  's2.tool.parks.k': 'Tool two',
  's2.tool.parks.h': 'Parks: land, utilities and a single window',
  's2.tool.tax.k': 'Tool three',
  's2.tool.tax.h':
    'Tax incentives: three statutes in relay for over sixty years',
  's2.tool.capital.k': 'Tool four',
  's2.tool.capital.h':
    'Capital market: four boards for companies of different sizes',

  // ── /industry/supply-chains ────────────────────────────────────────
  'ch.meta.title':
    'Taiwan Supply-Chain Maps: semiconductors, AI servers and tungsten, link by link',
  'ch.meta.description':
    'Three supply chains broken into links: what each link does, which Taiwanese companies work in it, and which link depends mainly on foreign suppliers. Company roles are compiled from annual reports and corporate websites, with a source on every node. Organised public data, not investment advice.',
  'ch.hero.eyebrow': 'Feature · Taiwan’s Industries',
  'ch.hero.title': 'Supply-Chain Maps',
  'ch.hero.subtitle':
    'Semiconductors, AI servers, tungsten: who does what, link by link, and which links Taiwan does not have',
  'ch.hero.verse':
    'A rack of servers passes through many pairs of hands.\nThis page shows which of them are in Taiwan.',
  'ch.disclaimer.p':
    'The companies and roles on this page are compiled from public information and are used only to describe supply-chain structure. Being listed is not a recommendation, and not being listed does not mean a company is unimportant. Taiwan.md does not rate individual stocks or forecast prices.',
  'ch.h2': 'Three chains, each broken into links',
  'ch.lede':
    'One card per link: what the link does, which Taiwanese companies work in it, and what each of them does there. The dashed box says where the link depends mainly on foreign suppliers. Underlined company names lead to the market-cap ranking or to an article on this site.',
  'ch.toc': 'The three chains',
  'ch.back': 'Back to the industry feature',
  'ch.find.label': 'Which chain is this company on?',
  'ch.find.placeholder': 'Type a company name or stock code',
  'ch.find.none': 'This company is not listed on these three chains.',
  'ch.find.hit': 'Appears in: ',
  'ch.label.stage': 'Link',
  'ch.label.company': 'Company',
  'ch.label.role': 'What it does in this link',
  'ch.label.hq': 'HQ',
  'ch.label.gap': 'Mainly supplied from abroad: ',
  'ch.label.table': 'Data table',
  'ch.method.h2': 'How these maps were made, and what they leave out',
  'ch.method.p1':
    'Each company is placed according to the business overview in its annual report, its website, or the principal business registered on the Market Observation Post System; the arrow beside each node leads to that source. Many companies span several links; only the main one is shown.',
  'ch.method.p2':
    'Each link lists at most five companies and is not a complete roster. Market shares and rankings are omitted because such figures mostly come from paid market-research reports whose originals we cannot check one by one.',
  'ch.method.p3':
    'Only three chains have been drawn. Bicycles, machine tools, display panels and offshore wind are still to come.',
  'ch.asof': 'Node sources accessed: {date}',

  // ── Year-end top ten ───────────────────────────────────────────────
  's5.hist.chart.title':
    'TSMC’s share of TWSE market cap: {v0} at the end of {y0}, {v1} at the end of {y1}',
  's5.hist.chart.sub':
    'Last trading day of each year, TWSE-listed companies only. The exchange’s historical shares-outstanding data begin in 2004; earlier years are not available.',
  's5.hist.top10': 'Top ten as a share of TWSE market cap',
  's5.hist.tsmc': 'of which TSMC',
  's5.hist.note':
    '＋ marks a company that was not in the top ten in the previous column. Market cap = closing price on the last trading day of the year × shares outstanding that day, TWSE-listed companies only. The lists for 2023 to 2025 were checked against the top ten published in the exchange’s monthly review and match in names and order.',
  's5.hist.p':
    'At the end of 2005 the top ten included Formosa Petrochemical, UMC, Nan Ya Plastics, ASUS and AUO. Twenty years later five remain: TSMC, Hon Hai, MediaTek, Chunghwa Telecom and Cathay Financial. TSMC went from 9.9% of TWSE market cap to 42.6%, and the top ten together from 34.9% to 58.1%.',
  'co.hist.h': 'Twenty years back: the year-end top ten',
  'co.hist.p':
    'The ranking above is a snapshot from October 2026. Taking the same list at the end of every fifth year shows who stayed and who changed places.',
  'co.hist.more':
    'How the structure changed over these twenty years is in section 5 of the industry feature',
  'mh.2409': 'AUO',
  'mh.1326': 'Formosa Chemicals & Fibre',
  'label.reported': ' (paraphrase, not a verbatim quote)',
};
