/**
 * budget.ts — /budget（總預算十年）頁面 UI 字串。
 * zh-TW 與 en 完整；其他語言走 utils.ts 的 fallback chain（→ en）。
 * 機關名／政事別名住 src/data/ly-budget.json（zh + en 兩欄），不在這裡。
 *
 * 書寫紀律：MANIFESTO §11（對位句型 ≤3／破折號節制／零晶晶體）；
 * kicker 是詩句層，H2 是斷言層（graph.md §三.1），兩者不互相取代。
 */
// 其他語言的 219 key（v1 182 ＋ v2 37）由翻譯 sub-agent 落在 data/budget/i18n/{lang}.json（對賬：scripts/tools/check-budget-i18n.py）
import ja from '../../data/budget/i18n/ja.json';
import ko from '../../data/budget/i18n/ko.json';
import es from '../../data/budget/i18n/es.json';
import fr from '../../data/budget/i18n/fr.json';
import pt from '../../data/budget/i18n/pt.json';
import hi from '../../data/budget/i18n/hi.json';
import ar from '../../data/budget/i18n/ar.json';
import ru from '../../data/budget/i18n/ru.json';
import vi from '../../data/budget/i18n/vi.json';
import id from '../../data/budget/i18n/id.json';
import de from '../../data/budget/i18n/de.json';

export const budgetUI = {
  en: {
    'budget.meta.title':
      'Budget Decade — Taiwan’s central government budget, 2016–2026',
    'budget.meta.description':
      'Ten years of Taiwan’s central government budget in one page: how NT$3 trillion is split, which ministries grew, what the Legislative Yuan cut in 2025 and 2026, and how much of it actually gets spent. Inline SVG, source-linked, machine-readable.',
    'budget.hero.eyebrow': 'Data · Budget Decade',
    'budget.hero.title': 'Budget Decade',
    'budget.hero.subtitle':
      'A three-trillion-dollar household ledger: how it is split, who grew, where the cuts fell',
    'budget.hero.verse':
      'A ledger of three trillion dollars,\nstamped this year only on the fourteenth of August.\nWhere the money went these ten years — this page lays it flat.',
    'budget.hero.stat.legal': 'FY2026 legal expenditure',
    'budget.hero.stat.passed': 'Passed on',
    'budget.hero.stat.passed.sub': 'latest passage on record',
    'budget.hero.stat.cut': 'Cut by the Legislative Yuan',
    'budget.hero.stat.cut.sub': 'of the NT$3.035T proposed',
    'budget.hero.stat.growth': 'Ten-year growth',
    'budget.hero.stat.growth.sub': 'legal expenditure, FY2016 → FY2026',
    'budget.hero.updated': 'Data as of',
    'budget.hero.jump': 'Jump to',
    'budget.hero.fy116.k':
      'FY2027 (ROC 116) bill · before the Legislative Yuan, not passed',
    'budget.hero.fy116':
      'Cabinet-approved on 2026-08-20: NT$3.9266T of revenue and of expenditure, 29.4% above the FY2026 proposal, including NT$235.7B for a universal cash payout. Referred to committees on 2026-10-02; review starts after the Premier’s briefing on 2026-10-27. The four figures above are FY2026 legal numbers and do not include this bill.',

    // §0 process
    'budget.s0.kicker':
      'A sum of money walks a year and a half,\nthrough three branches of government,\nbefore anyone can say it was truly spent.',
    'budget.s0.h2':
      'The life of a budget: the Executive Yuan drafts, the Legislative Yuan reviews, the President promulgates, agencies spend, the audit closes the books',
    'budget.s0.lede':
      'Every fiscal year (1 January to 31 December) has a budget that starts life the January before and is only closed in the July after. Seven stations, each with a statutory deadline. The bottom row of each card shows where FY2026 actually stood — that is where the 351-day story lives.',
    'budget.s0.col.actor': 'Who',
    'budget.s0.col.when': 'Deadline',
    'budget.s0.col.law': 'Legal basis',
    'budget.s0.col.actual': 'FY2025 / FY2026 / FY2027 in reality',
    'budget.s0.step1.title': 'Draft',
    'budget.s0.step1.actor': 'Agencies → DGBAS → Cabinet',
    'budget.s0.step1.when': 'Jan–Aug of the year before',
    'budget.s0.step1.what':
      'Each agency estimates its needs (概算); the Cabinet sets ceilings; DGBAS compiles the general budget bill.',
    'budget.s0.step1.law': 'Budget Act §2, §46',
    'budget.s0.step1.actual':
      'FY2026: Cabinet approved 2025-08-21; FY2027: 2026-08-20',
    'budget.s0.step2.title': 'Submit',
    'budget.s0.step2.actor': 'Executive Yuan → Legislative Yuan',
    'budget.s0.step2.when': '4 months before the fiscal year (by 31 Aug)',
    'budget.s0.step2.what':
      'The bill and the policy plan are delivered to the legislature.',
    'budget.s0.step2.law': 'Budget Act §46; Constitution §59',
    'budget.s0.step2.actual':
      'FY2026: delivered end of Aug 2025; FY2027: by end of Aug 2026',
    'budget.s0.step3.title': 'Review',
    'budget.s0.step3.actor': 'Legislative Yuan',
    'budget.s0.step3.when': '1 month before the fiscal year (by 30 Nov)',
    'budget.s0.step3.what':
      'Plenary Q&A → referral to committees → caucus negotiation → second and third readings. Legislators may cut, freeze, or attach resolutions; they may not raise spending.',
    'budget.s0.step3.law': 'Budget Act §51',
    'budget.s0.step3.actual':
      'FY2026: referred 2026-04-17, passed 2026-08-14 (257 days past deadline); FY2027: referred 2026-10-02, review after the Premier’s briefing on 2026-10-27',
    'budget.s0.step4.title': 'Promulgate / reconsider',
    'budget.s0.step4.actor': 'President; Executive Yuan',
    'budget.s0.step4.when': '15 days before the fiscal year (by 16 Dec)',
    'budget.s0.step4.what':
      'Promulgation turns the bill into the legal budget. If the Cabinet finds the result unworkable it may, within 10 days, ask for reconsideration; the legislature decides within 15 days and a simple majority upholds the original.',
    'budget.s0.step4.law': 'Budget Act §51; Additional Articles §3',
    'budget.s0.step4.actual': 'FY2025: reconsideration rejected 2025-03-12',
    'budget.s0.step5.title': 'Execute',
    'budget.s0.step5.actor': 'Every agency',
    'budget.s0.step5.when': '1 Jan – 31 Dec',
    'budget.s0.step5.what':
      'Allocations released month by month; frozen items need a committee report to unlock; supplementary (§79) and special (§83) budgets live outside. If the budget is late, only continuing items may be spent (§54).',
    'budget.s0.step5.law': 'Budget Act §54, §79, §83',
    'budget.s0.step5.actual': 'FY2026: ran under §54 from 1 Jan to 14 Aug',
    'budget.s0.step6.title': 'Final accounts',
    'budget.s0.step6.actor': 'DGBAS → Cabinet → Control Yuan',
    'budget.s0.step6.when': 'Within 4 months after year-end (by 30 Apr)',
    'budget.s0.step6.what':
      'The general final account is compiled and sent to the Control Yuan (National Audit Office).',
    'budget.s0.step6.law': 'Final Accounts Act §21; Constitution §60',
    'budget.s0.step6.actual':
      'FY2025: Cabinet final-account release 2026-04-23',
    'budget.s0.step7.title': 'Audit',
    'budget.s0.step7.actor': 'Auditor-General → Legislative Yuan',
    'budget.s0.step7.when': 'Within 3 months of receipt (by 31 Jul)',
    'budget.s0.step7.what':
      'The audit report and the final audited figures go to the legislature. Those audited figures are what §2 of this page uses for FY2016–FY2024.',
    'budget.s0.step7.law': 'Final Accounts Act §26; Constitution §105',
    'budget.s0.step7.actual':
      'FY2024 audited figures feed the ten-year function table',
    'budget.s0.note':
      'Sources: Budget Act §46, §51, §54, §79, §83; Final Accounts Act §21, §26; Constitution §59, §60, §105 and Additional Articles §3 (all at law.moj.gov.tw). Deadlines assume a calendar fiscal year.',

    // §1 river
    'budget.s1.kicker':
      'The river set out at one point nine trillion,\nten years later it stands at the door of three;\nin one of those years the water rose four hundred billion at once.',
    'budget.s1.h2':
      'Central government legal expenditure grew from NT$1.98T to NT$2.99T in ten years, up 51%',
    'budget.s1.lede':
      'Three lines, three moments of the same money: what the Executive Yuan proposed, what the Legislative Yuan passed, and what was actually spent by year-end. The proposal is always the highest line, the final account always the lowest; the gap between them is this page’s subject.',
    'budget.s1.chart.title':
      'Proposed, legal and final expenditure, FY2016–FY2027 (NT$100M)',
    'budget.s1.series.proposed': 'Proposed',
    'budget.s1.series.legal': 'Legal',
    'budget.s1.series.final': 'Final accounts',
    'budget.s1.annot.2023': '+NT$438B in one year',
    'budget.s1.annot.2025': 'cut NT$207.6B',
    'budget.s1.p1':
      'The jump sits in FY2023: legal expenditure went from NT$2.25T to NT$2.69T, a 19.5% rise in a single year, the largest step of the decade. FY2025 shows the other kind of gap: the Executive Yuan proposed NT$3.13T, the Legislative Yuan passed NT$2.92T, and the distance between the two lines is the cut this page returns to in §4.',
    'budget.s1.p2':
      'Measured against the economy the river is calmer than it looks. Expenditure as a share of nominal GDP stayed between 9.6% and 11.1% across the ten years, and the one-year-plus debt ratio fell from 33.0% to 25.2% against a statutory ceiling of 40.6%. The budget grew because the country did.',
    'budget.s1.p3':
      'The dashed point at the far right is the FY2027 proposal: NT$3.9266T, NT$891.6B above the FY2026 proposal. DGBAS lists NT$235.7B for the universal cash payout and NT$39.2B for civil-service and military pay, social welfare at NT$1.1889T (+41.1%) and the Ministry of National Defense at NT$691.9B (+23.2%); adding special budgets, special funds, veterans’ pensions and the Coast Guard, defense on the NATO basis comes to NT$1.1225T. Revenue and expenditure balance, and NT$179B of debt repayment is fully re-borrowed; DGBAS projects the debt ratio at 23.4% by end-2027. It is the Cabinet’s proposal, not yet reviewed, and the legal figure will differ, which is why it appears only on the “Proposed” line. A separate FY2026 supplementary bill of NT$607.6B was approved by the Cabinet on 2026-09-03 and has not passed; it is not on this chart.',
    'budget.s1.chart2.title':
      'Expenditure as % of GDP and debt ratio, FY2016–FY2027',
    'budget.s1.series.gdp': 'Spending / GDP',
    'budget.s1.series.debt': 'Debt ratio',
    'budget.s1.note':
      'Sources: DGBAS press releases on Legislative Yuan review results, each fiscal year; Executive Yuan final-account press releases; National Audit Office report on the FY2025 final account (2026-07-24); DGBAS FY2026 general explanation ref. table 4 (GDP ratio) and DGBAS press release on the FY2027 bill (2026-08-20); National Treasury Administration debt tables. FY2026 and FY2027 have no final accounts yet; FY2027 is a proposal.',

    // §2 functions
    'budget.s2.kicker':
      'Three parts in ten to the old, the young, the sick, the poor;\ntwo parts to schools and laboratories;\ntwo more to guns and soldiers’ pay.',
    'budget.s2.h2':
      'Social welfare has been the largest function all decade; defense reached a ten-year-high 18.1% share, only NT$7.8B behind education',
    'budget.s2.lede':
      'The government sorts every dollar into nine “functions”. Read the stacked area for the total and how each band thickens; read the slope for whose share rose and whose fell between FY2016 and FY2026. Note the basis: FY2016–FY2024 are audited final accounts, FY2025 is the legal budget, FY2026 is the proposal — the only ten-year series DGBAS publishes on one table. The last column, FY2027, is the new budget bill; DGBAS re-sorted FY2026 in that book too, so part of the jump from FY2026 to FY2027 is reclassification.',
    'budget.s2.chart.title': 'Expenditure by function, FY2016–FY2027 (NT$100M)',
    'budget.s2.chart2.title': 'Share of expenditure by function, FY2016–FY2026',
    'budget.s2.p1':
      'Social welfare rose from NT$460B to NT$832B and never left first place; the idea that welfare “overtook” education recently is wrong — it was already ahead in FY2016. Defense went from NT$309B to NT$549B and its share from 15.9% to 18.1%, a ten-year high; it slipped to fourth in FY2023–24 when economic-development spending swelled, and was back in third by FY2025. Education, science and culture grew too, from NT$382B to NT$557B, but its share slipped from 19.7% to 18.3%, tied with FY2023 for the decade’s low; among the four big functions it grew slowest over the decade (+46% vs welfare +81%, defense +77%, economic development +60%) and is the only one whose share fell.',
    'budget.s2.p2':
      'The two flat bands are pensions and debt service: pensions moved from NT$147B to NT$184B, debt service stayed near NT$100B as interest rates and outstanding debt both fell. Community and environment, at NT$27B, is the thinnest band on the chart and the easiest to lose sight of.',
    'budget.s2.note':
      'Source: DGBAS, FY2026 Central Government General Budget general explanation, reference table 6 (歷年中央政府歲入歲出淨收支概況表). Basis differs by year as stated above; the FY2026 row will change once the post-passage table is published. FY2027 comes from the FY2027 budget-bill table by function (proposal, updated 2026-10-22). That book re-sorts FY2026 itself: the same FY2026 proposal shows grants and other at NT$18.4B instead of NT$50.4B and social welfare at NT$842.8B instead of NT$831.8B, with the total unchanged at NT$3.035T.',

    // §3 agencies
    'budget.s3.kicker':
      'Same table, ten years:\nsome bowls have doubled in size,\nsome bowls are still the same bowl.',
    'budget.s3.h2':
      'In ten years the Ministry of Labor and Ministry of Economic Affairs more than doubled; the Ministry of Finance shrank 14%',
    'budget.s3.lede':
      'The same money cut by who is in charge of spending it. Bars are the FY2026 proposal (the post-passage table is not out yet), the dark tick is FY2016. Colour is only spent on two agencies — Defense and Culture — because they are the two this page keeps coming back to.',
    'budget.s3.chart.title':
      'Budget by supervising agency: FY2026 proposal vs FY2016 legal (NT$100M)',
    'budget.s3.now': 'FY2026 (proposed)',
    'budget.s3.then': 'FY2016',
    'budget.s3.chart2.title': 'Ten-year growth by agency, indexed FY2016 = 100',
    'budget.s3.p1':
      'Labor rose from NT$117B to NT$297B, mostly transfers into the Labor Insurance fund (NT$130B in FY2024 alone). Economic Affairs went from NT$59B to NT$148B. Health and Welfare (+79%) and National Defense (+75%) grew by similar ratios but very different amounts: defense added NT$241B, the single largest increase of any ministry.',
    'budget.s3.p2':
      'The Ministry of Culture grew 65%, from NT$16.5B to NT$27.3B, and still sits under 1% of the total (0.84% → 0.90%). Finance is the one large ministry that fell, −14%, as debt service and its share of transfers declined. Two rows need a footnote: Education (NT$361B → NT$266B) and Interior (NT$148B → NT$119B) drop in FY2026 because the amended Fiscal Allocation Act reclassified part of their local grants — the “grants to local governments” row rises from NT$187B to NT$250B in the same year.',
    'budget.s3.note':
      'Source: DGBAS, 歲出機關別預算總表 (supervising-agency totals), FY2016–FY2026. Renamed agencies (Council of Agriculture → Ministry of Agriculture, EPA → Ministry of Environment, MOST → NSTC, Coast Guard → Ocean Affairs Council) are one continuous series. FY2026 = Executive Yuan proposal; the NT$48B cut is not yet distributed by agency in any published table.',
    'budget.s3.growthUnit': 'index',

    // §4 the legislature's hand
    'budget.s4.kicker':
      'Nine years the blade fell near one percent;\nin the tenth, six percent in a single stroke;\nin the eleventh the blade drew halfway back — but the calendar had turned to August.',
    'budget.s4.h2':
      'The Legislative Yuan cut 1.0–1.25% for nine years, 6.6% in FY2025, and 1.6% in FY2026',
    'budget.s4.lede':
      'The cut ratio is the cleanest political signal in this dataset. When the presidency and the legislative majority belonged to the same party — KMT in FY2016, DPP from FY2017 to FY2024 — the line is almost flat; under the KMT–TPP majority elected in 2024 it spikes, then falls back but not to the old band — and the passage date slides from December-before to August-after.',
    'budget.s4.chart.title':
      'Share of proposed expenditure cut by the Legislative Yuan, FY2016–FY2026',
    'budget.s4.series.cut': 'Cut %',
    'budget.s4.annot.2025': 'NT$207.6B',
    'budget.s4.annot.2026': 'NT$48B',
    'budget.s4.p1':
      'A cut deletes money for the year; a freeze keeps the line item but blocks spending until a committee lifts it. FY2025 had both at record scale: NT$207.6B cut (about NT$100B of it the Taipower subsidy) and roughly NT$260B frozen. The Executive Yuan asked for reconsideration; the Legislative Yuan rejected it on 12 March 2025.',
    'budget.s4.p2':
      'FY2026’s NT$48B is a fifth of the previous year in money, but the across-the-board rules were sharper: special allowances cut 60% and fully removed for 20 agencies with no reallocation, publicity budgets cut 50%, overseas travel up to 70%, military equipment 2.5%. The 1.58% shown here is NT$48B over the NT$3.035T proposed; some reports use 1.689% against a different base.',
    'budget.s4.table.h': 'Across-the-board items, FY2025 vs FY2026',
    'budget.s4.table.item': 'Item',
    'budget.s4.table.kind': 'Type',
    'budget.s4.table.value': 'Decision',
    'budget.s4.kind.cut': 'cut',
    'budget.s4.kind.freeze': 'frozen',
    'budget.s4.kind.kept': 'kept',
    'budget.s4.fy114': 'FY2025 (passed 2025-01-21)',
    'budget.s4.fy115': 'FY2026 (passed 2026-08-14)',

    // §5 the two-year contest
    'budget.s5.kicker':
      'A budget stood outside the door for over three hundred days;\nthe people inside counted the days,\nand every one of them counted a different number.',
    'budget.s5.h2':
      'FY2026: sent in August 2025, passed 14 August 2026 — three ways to count the days',
    'budget.s5.lede':
      'The Budget Act says the general budget should be decided a month before the fiscal year begins. For FY2026 that deadline was 30 November 2025. What happened between the Executive Yuan’s approval on 21 August 2025 and the third reading on 14 August 2026 depends on who is telling it — so here are the three counts, attributed.',
    'budget.s5.days.h': 'Three counts of “how late”',
    'budget.s5.days.unit': 'days',
    'budget.s5.timeline.h': 'Timeline, FY2025, FY2026 and FY2027',
    'budget.s5.culture.h': 'Culture and public media: FY2025 vs FY2026',
    'budget.s5.culture.item': 'Item',
    'budget.s5.culture.p1':
      'The Ministry of Culture’s media publicity line is NT$47.38M — 0.16% of the ministry’s NT$29.6B — and for two years running it has been the only ministry publicity budget cut to zero. The committee stage in July 2026 froze NT$8M; the floor vote in August deleted the whole line. Public Television lost NT$21.85M and had NT$200M frozen pending a new board chair; TaiwanPlus lost NT$200M; TAICCA over NT$100M cut or frozen.',
    'budget.s5.voices.h': 'Who says what',
    'budget.s5.note':
      'Sources: CNA, LTN, UDN, RTI, Executive Yuan and Ministry of Culture press releases as linked per row in the data file. Figures for the Council of Indigenous Peoples, Hakka Affairs Council and CTS were not found in this research round and are not shown.',

    // §6 execution
    'budget.s6.kicker':
      'Of the money written down,\nninety-seven parts in a hundred are truly spent;\nthe rest is carry-over and what never got used.',
    'budget.s6.h2':
      'Final-account execution ran 97–98% for ten straight years; the story hides in the denominator',
    'budget.s6.lede':
      'Each bar is one year’s legal budget; the blue is the share the audited final account took of it, the pale tail is what went unspent. Execution rate here is final ÷ legal, without supplementary budgets. It is a rate of spending, not a measure of whether the spending worked.',
    'budget.s6.chart.title':
      'Execution rate = final accounts ÷ legal budget, FY2016–FY2025',
    'budget.s6.p1':
      'FY2025 is the textbook case for denominators: against the post-cut legal budget of NT$2.925T, the NT$2.934T final account looks like overspending; against the NT$3.007T available after the NT$81.9B supplementary budget, it is 97.6% executed. Same number, two stories.',
    'budget.s6.p2':
      'And the general budget is not the whole purse. Special budgets — infrastructure, fighter jets, sea-air combat power, post-pandemic resilience — sit outside it, each with its own law and ceiling. Defense is where the confusion is loudest: the “3.32% of GDP” figure bundles the MND budget with veterans’ pensions, coast guard, special budgets and special funds.',
    'budget.s6.defense.h': 'One defense number, four pieces (FY2026, NT$100M)',
    'budget.s6.defense.total': 'NATO-basis total',
    'budget.s6.defense.function': 'the “defense” function line alone',
    'budget.s6.special.h': 'Special budgets outside the general budget',
    'budget.s6.special.period': 'Period',
    'budget.s6.note':
      'Sources: Executive Yuan final-account press releases FY2020–FY2025; DGBAS FY2026 general explanation; MyGoPen fact-check on the 9,495 breakdown; CNA on the sea-air special budget. Special budget amounts marked as “cap” or “phase” are statutory or per-phase figures, not cumulative spending.',

    // §7 how to read
    'budget.s7.kicker':
      'Every number on this page has a twin\nthat is also true.\nBefore you argue, ask which one you are holding.',
    'budget.s7.h2': 'How to read this table: six pairs that get mixed up',
    'budget.s7.g1.h': 'Proposed / legal / final',
    'budget.s7.g1.p':
      'Three moments of one budget: what the Executive Yuan asked for, what the Legislative Yuan passed, what was actually spent. “NT$3.03T” is the FY2026 proposal; the legal figure is NT$2.99T. Headlines mix them freely.',
    'budget.s7.g2.h': 'Cut / frozen',
    'budget.s7.g2.p':
      'A cut is gone for the year. A freeze keeps the money on the books but requires a report to committee before it can be spent — most FY2025 freezes were later lifted. Both are called “砍” in the news.',
    'budget.s7.g3.h': 'General budget / special budget / special fund',
    'budget.s7.g3.p':
      'This page is the general budget. Fighter jets, infrastructure and pandemic relief live in special budgets with their own laws. Defense at NT$949.5B is a NATO-basis sum across all three; the general-budget defense line is NT$548.8B.',
    'budget.s7.g4.h': 'Nominal / % of GDP / per person',
    'budget.s7.g4.p':
      'Up 51% in ten years sounds like a lot; as a share of GDP it is flat around 10%. Per person, NT$2.99T is roughly NT$128,000 a year for each of Taiwan’s 23.3 million residents.',
    'budget.s7.g5.h': 'By agency / by function',
    'budget.s7.g5.p':
      'The Ministry of Culture is NT$29.6B; the “education, science and culture” function is NT$556.6B because it counts universities, research and every school. Ask which cut a number refers to before comparing.',
    'budget.s7.g6.h': 'Execution rate / effectiveness',
    'budget.s7.g6.p':
      '97% spent means the money left the treasury, not that it bought what was promised. Taiwan publishes execution rates every year and effectiveness reviews only for some programmes; this page shows the first and does not pretend to the second.',
    'budget.s7.sources.h': 'Sources and method',
    'budget.s7.sources.p':
      'All amounts are NT$100 million (億). Agency and function tables were downloaded as DGBAS xls/xlsx and PDF originals and normalised without hand-editing; totals reconcile to the official total row within rounding. Curated items (events, cuts, quotes) each carry a source URL in the data file. Charts are inline SVG rendered at build time; every chart has a data table beneath it.',
    'budget.s7.download': 'Download the data (JSON)',
    'budget.s7.corrections': 'Spot an error? Open an issue',
    'budget.s7.related.h': 'Read on',
    'budget.s7.related.taicca':
      'TAICCA — the culture agency in the middle of the media-budget fight',
    'budget.s7.related.pts': 'Public Television Service',
    'budget.s7.related.recall': 'The 2025 mass recall',
    'budget.s7.related.politics': 'Taiwan’s political system and elections',
    'budget.s7.related.data': 'Data hub',
    'budget.s7.related.companies': 'Enterprise map',
    'budget.s7.related.opendata': 'Open-data curation',
    'budget.basis.final': 'final accounts',
    'budget.basis.legal': 'legal budget',
    'budget.basis.proposed': 'proposal',
    'budget.era.president': 'President',
    'budget.era.ly': 'Legislative majority',
    'budget.unit.yi': 'NT$100M',
    'budget.table.year': 'Year',
    'budget.table.source': 'Source',
    'budget.toc.s0': 'How a budget is made',
    'budget.toc.s1': 'Ten-year river',
    'budget.toc.s2': 'Where it goes',
    'budget.toc.s3': 'Ministries',
    'budget.toc.s4': 'The legislature’s hand',
    'budget.toc.s5': 'Two-year contest',
    'budget.toc.s6': 'Spent',
    'budget.toc.s7': 'How to read',

    // v2（2026-08-18）：三分鐘版 takeaway、黏頂子導覽、圖表斷言標題、日曆條、量表——reports/design-budget-page-v2-2026-08-18.md
    'budget.hero.brief': 'The three-minute version: eight sentences',
    'budget.toc.s0.take':
      'A budget passes seven stations in three branches over eighteen months; FY2026 sat at station three 257 days past the deadline.',
    'budget.toc.s1.take':
      'Legal expenditure grew from NT$1.98T to NT$2.99T (+51%); as a share of GDP it stayed near 10% all decade.',
    'budget.toc.s2.take':
      'Social welfare stayed the largest function (27.4%); defense rose to a ten-year-high 18.1% share; education is the only big-four function whose share fell.',
    'budget.toc.s3.take':
      'Labor and Economic Affairs more than doubled, Finance shrank 14%; Defense added NT$241.3B, the largest increase of any ministry.',
    'budget.toc.s4.take':
      'The Legislative Yuan cut 1.04–1.25% for eight years, 6.62% in FY2025, 1.58% in FY2026.',
    'budget.toc.s5.take':
      'FY2026 was sent in August 2025 and passed 14 August 2026; “how late” has three counts — 351, 266, 115 days — each attributed.',
    'budget.toc.s6.take':
      'Execution ran 97–98% for ten straight years, leaving NT$36.1B–73.7B unspent a year; the “NT$949.5B” defense figure is four blocks added together.',
    'budget.toc.s7.take':
      'Every number has a twin that is also true: proposed/legal/final, cut/frozen, general/special budget.',
    'budget.subnav.label': 'Sections',
    'budget.s0.overview': 'Seven stations at a glance',
    'budget.s1.chart.gap': 'LY cut',
    'budget.s1.chart2.take':
      'Spending stayed at 9.6–11.1% of GDP; the debt ratio fell from 33.0% to 25.2%',
    'budget.s2.chart2.take':
      'Shares over ten years: welfare 23.7% → 27.4%, defense 15.9% → 18.1%, education 19.7% → 18.3%',
    'budget.s2.legend.share': 'FY2027 proposal value · share',
    'budget.s2.slope.left': 'FY2016',
    'budget.s2.slope.right': 'FY2026',
    'budget.s2.growth.take':
      'Among the four big functions education grew slowest: +46%, vs welfare +81%, defense +77%, economic development +60%',
    'budget.s2.growth.sub': 'Growth FY2016 → FY2026 (audited final → proposal)',
    'budget.s3.chart2.take':
      'With FY2016 = 100, Labor reached 254, Economic Affairs 251, Finance 86',
    'budget.s3.table.share': 'Share of FY2026',
    'budget.s4.band': 'Eight-year band',
    'budget.s5.cal.title':
      'FY2026’s year in the legislature: sent, deadline, referred, passed',
    'budget.s5.cal.sub':
      'Top: the calendar and six milestones. Bottom: three counts of “how late”, all measured back from the passage date',
    'budget.s5.cal.approved': 'Cabinet approved',
    'budget.s5.cal.sent': 'Delivered to LY',
    'budget.s5.cal.deadline': 'Budget Act §51 deadline',
    'budget.s5.cal.fystart': 'Fiscal year starts',
    'budget.s5.cal.referred': 'Referred to committee',
    'budget.s5.cal.passed': 'Passed',
    'budget.s5.cal.s54': 'Running under §54',
    'budget.s5.cal.note':
      'The three counts start from different points (Cabinet approval, delivery, referral); the chart measures all of them back from 2026-08-14. Delivery to passage: 348 days; statutory deadline to passage: 257 days.',
    'budget.s6.exec.spent': 'Executed (final ÷ legal)',
    'budget.s6.exec.unspent': 'Unspent',
    'budget.s6.exec.take':
      'Each year 1.6–2.9% of the legal budget went unspent; the most was FY2025’s NT$73.7B',
    'budget.s6.defense.tick': '“Defense” function line',
    'budget.tip.close': 'Close',
  },
  'zh-TW': {
    'budget.meta.title':
      '總預算十年 — 中央政府總預算 2016–2026 的分配、增減與執行',
    'budget.meta.description':
      '一頁讀懂中央政府總預算十年：三兆元怎麼分、哪些部會在長、立法院 2025 與 2026 年砍在哪、錢最後有沒有真的花掉。inline SVG、逐筆帶來源、機器可讀。',
    'budget.hero.eyebrow': '資料 · 總預算十年',
    'budget.hero.title': '總預算十年',
    'budget.hero.subtitle': '三兆元的家計簿：怎麼分、誰在長、砍在哪',
    'budget.hero.verse':
      '一本三兆元的家計簿，\n今年八月十四日才蓋章。\n十年來錢往哪裡去，這一頁把它攤開。',
    'budget.hero.stat.legal': '115 年度法定歲出',
    'budget.hero.stat.passed': '三讀日',
    'budget.hero.stat.passed.sub': '史上最晚三讀',
    'budget.hero.stat.cut': '立法院減列',
    'budget.hero.stat.cut.sub': '占原列 3.035 兆',
    'budget.hero.stat.growth': '十年增幅',
    'budget.hero.stat.growth.sub': '法定歲出 105 → 115 年度',
    'budget.hero.updated': '資料截至',
    'budget.hero.jump': '跳到',
    'budget.hero.fy116.k': '116 年度預算案（2027）｜已送立法院，尚未三讀',
    'budget.hero.fy116':
      '行政院 2026-08-20 通過：歲入歲出各 3 兆 9,266 億，比 115 年度預算案多 29.4%，其中普發現金 2,357 億。2026-10-02 一讀交付委員會，10-27 行政院長報告後才開始審。上面四格是 115 年度的法定數，不含這一案。',

    // §0 process
    'budget.s0.kicker': '一筆錢從概算走到決算，\n要走一年半，\n經過三個院。',
    'budget.s0.h2':
      '預算的一生：行政院編、立法院審、總統公布、各機關花、審計部查',
    'budget.s0.lede':
      '每一個會計年度（1 月 1 日到 12 月 31 日）的預算，前一年一月就開始編，到隔年七月才算結案。七個站，每一站都有法定期限。每張卡最下面一行是 115 年度實際走到哪裡，351 天的故事就在那一行。',
    'budget.s0.col.actor': '誰',
    'budget.s0.col.when': '期限',
    'budget.s0.col.law': '法源',
    'budget.s0.col.actual': '114／115／116 年度實際',
    'budget.s0.step1.title': '籌編',
    'budget.s0.step1.actor': '各機關 → 主計總處 → 行政院院會',
    'budget.s0.step1.when': '前一年 1–8 月',
    'budget.s0.step1.what':
      '各機關依施政計畫估「概算」；行政院核定歲出額度；主計總處彙編成總預算案。',
    'budget.s0.step1.law': '預算法 §2、§46',
    'budget.s0.step1.actual':
      '115 年度：2025-08-21 院會通過；116 年度：2026-08-20 院會通過',
    'budget.s0.step2.title': '提出',
    'budget.s0.step2.actor': '行政院 → 立法院',
    'budget.s0.step2.when': '會計年度開始四個月前（8 月 31 日前）',
    'budget.s0.step2.what': '總預算案連同施政計畫送立法院。',
    'budget.s0.step2.law': '預算法 §46、憲法 §59',
    'budget.s0.step2.actual':
      '115 年度：2025 年 8 月底送院；116 年度：2026 年 8 月底前送院',
    'budget.s0.step3.title': '審議',
    'budget.s0.step3.actor': '立法院',
    'budget.s0.step3.when': '會計年度開始一個月前議決（11 月 30 日前）',
    'budget.s0.step3.what':
      '院會聽取報告與詢答 → 交付各委員會分組審查 → 黨團協商 → 二讀、三讀。立委可以刪減、凍結、附帶決議，不能增加歲出。',
    'budget.s0.step3.law': '預算法 §51',
    'budget.s0.step3.actual':
      '115 年度：2026-04-17 付委、8-14 三讀（逾期 257 天）；116 年度：2026-10-02 一讀付委，10-27 院長報告後審查',
    'budget.s0.step4.title': '公布／覆議',
    'budget.s0.step4.actor': '總統；行政院',
    'budget.s0.step4.when': '會計年度開始十五日前公布（12 月 16 日前）',
    'budget.s0.step4.what':
      '總統公布後成為法定預算。行政院若認為窒礙難行，可在十日內移請覆議。立法院十五日內議決，全體二分之一維持原案，行政院長即須接受。',
    'budget.s0.step4.law': '預算法 §51、憲法增修條文 §3',
    'budget.s0.step4.actual': '114 年度：2025-03-12 覆議遭否決',
    'budget.s0.step5.title': '執行',
    'budget.s0.step5.actor': '各機關',
    'budget.s0.step5.when': '1 月 1 日–12 月 31 日',
    'budget.s0.step5.what':
      '按月分配執行。凍結款要向委員會提報告才能解凍。追加預算（§79）、特別預算（§83）在總預算之外。預算沒過的期間，只能動支延續性經費（§54）。',
    'budget.s0.step5.law': '預算法 §54、§79、§83',
    'budget.s0.step5.actual': '115 年度：1 月 1 日到 8 月 14 日依 §54 運作',
    'budget.s0.step6.title': '決算',
    'budget.s0.step6.actor': '主計總處 → 行政院 → 監察院',
    'budget.s0.step6.when': '年度結束後四個月內（次年 4 月 30 日前）',
    'budget.s0.step6.what': '編成總決算，提出於監察院（審計部）。',
    'budget.s0.step6.law': '決算法 §21、憲法 §60',
    'budget.s0.step6.actual': '114 年度：行政院決算新聞稿 2026-04-23',
    'budget.s0.step7.title': '審核',
    'budget.s0.step7.actor': '審計長 → 立法院',
    'budget.s0.step7.when': '決算送達後三個月內（次年 7 月 31 日前）',
    'budget.s0.step7.what':
      '審核報告與最終審定數額表送立法院。本頁 §2 的 105–113 年度政事別，用的就是這份審定數。',
    'budget.s0.step7.law': '決算法 §26、憲法 §105',
    'budget.s0.step7.actual': '113 年度審定數是十年政事別表的基礎',
    'budget.s0.note':
      '來源：預算法 §46、§51、§54、§79、§83、決算法 §21、§26、憲法 §59、§60、§105 與增修條文 §3（全國法規資料庫）。期限以曆年制會計年度計算。',

    'budget.s1.kicker':
      '河從一兆九千億出發，\n十年後站在三兆的門口。\n中間有一年，水位一次漲了四千億。',
    'budget.s1.h2': '十年間，中央政府法定歲出從 1.98 兆長到 2.99 兆，增加 51%',
    'budget.s1.lede':
      '同一筆錢的三個時刻：行政院提出的、立法院通過的、年底真正花掉的。提案永遠是最高的那條線，決算永遠是最低的那條。兩條線之間的距離，就是這一頁要講的事。',
    'budget.s1.chart.title': '原列、法定、決算歲出，105–116 年度（億元）',
    'budget.s1.series.proposed': '行政院原列',
    'budget.s1.series.legal': '立法院法定',
    'budget.s1.series.final': '決算',
    'budget.s1.annot.2023': '一年 +4,380 億',
    'budget.s1.annot.2025': '減列 2,076 億',
    'budget.s1.p1':
      '跳躍落在 112 年度：法定歲出從 2.25 兆到 2.69 兆，一年 +19.5%，是十年最大的一級台階。114 年度是另一種缺口：行政院提出 3.13 兆，立法院通過 2.92 兆，兩條線之間的距離就是 §4 會回頭談的那一刀。',
    'budget.s1.p2':
      '拿經濟體當尺，這條河比看起來平靜。歲出占名目 GDP 的比率十年都在 9.6% 到 11.1% 之間。一年以上債務占前三年平均 GDP 的比率從 33.0% 降到 25.2%，法定上限是 40.6%。預算變大，是因為國家也變大了。',
    'budget.s1.p3':
      '圖最右邊虛線上的點是 116 年度預算案：3 兆 9,266 億，比 115 年度預算案多 8,916 億。主計總處列出的增量有普發現金 2,357 億、軍公教待遇調整 392 億，社會福利 1 兆 1,889 億（增 41.1%），國防部主管 6,919 億（增 23.2%）；加上特別預算、特種基金、退除給付與海巡，北約口徑的國防整體是 1 兆 1,225 億。歲入歲出相抵平衡，另有債務還本 1,790 億全數舉債，預估 116 年底債務比 23.4%。這是行政院的提案，立法院還沒審，法定數會不一樣，所以它只出現在「原列」那條線上。另外 115 年度還有一份 6,076 億的追加預算案，2026-09-03 行政院通過、尚未三讀，不在這張圖裡。',
    'budget.s1.chart2.title': '歲出占 GDP 比率與債務比率，105–116 年度',
    'budget.s1.series.gdp': '歲出／GDP',
    'budget.s1.series.debt': '債務比',
    'budget.s1.note':
      '來源：主計總處各年度「中央政府總預算案立法院審議結果」新聞稿。行政院各年度總決算新聞稿。審計部 114 年度總決算審核報告（2026-07-24）。主計總處 115 年度總說明參考表 4（GDP 比率）與 116 年度總預算案新聞稿（2026-08-20）。財政部國庫署債務概況表。115、116 年度尚無決算；116 年度是預算案。',

    'budget.s2.kicker':
      '十分之三給了老小病弱，\n兩分給了學校與實驗室，\n再兩分給了槍砲與軍餉。',
    'budget.s2.h2':
      '社會福利十年都是第一大支出，國防占比升到十年最高的 18.1%，跟教科文只差 78 億',
    'budget.s2.lede':
      '政府把每一塊錢歸進九個「政事別」。看堆疊面積讀總量與每一層的厚薄，看斜率圖讀十年間占比誰升誰降。口徑要先說：105–113 年度是審計部審定的決算數、114 年度是法定預算數、115 年度是預算案數——這是主計總處唯一在同一張表上給出的十年序列。圖最右邊多出的 116 年度是預算案，用的是 116 年度預算書，主計總處在書裡把 115 年度也重新歸類過，所以 115 到 116 的跳升有一部分是分類改變。',
    'budget.s2.chart.title': '歲出政事別，105–116 年度（億元）',
    'budget.s2.chart2.title': '歲出政事別占比，105–115 年度',
    'budget.s2.p1':
      '社會福利從 4,601 億走到 8,318 億，十年沒離開過第一位。「社福最近才超越教科文」的說法是錯的，105 年度它就已經領先。國防從 3,093 億到 5,488 億，占比從 15.9% 升到 18.1%，是十年最高。112、113 年度它一度落到第四，那兩年經濟發展支出放大，114 年度回到第三。教育科學文化也在長，3,824 億到 5,566 億，但占比從 19.7% 滑到 18.3%，跟 112 年度並列十年最低；四大支出裡它十年成長 46%，比社福 81%、國防 77%、經濟發展 60% 都慢，占比也是四塊裡唯一下滑的。',
    'budget.s2.p2':
      '兩條幾乎平的帶子是退休撫卹與債務：退撫從 1,468 億到 1,844 億，債務支出一直在一千億上下，利率與未償餘額同時往下走。社區發展及環保只有 266 億，是圖上最薄、也最容易被忽略的一層。',
    'budget.s2.note':
      '來源：主計總處《115 年度中央政府總預算案總說明》參考表 6「歷年中央政府歲入歲出淨收支概況表」。各年度口徑如上。115 年度那一列在三讀後的表上架後會改變。116 年度取自 116 年度預算書政事別表（預算案，2026-10-22 更新），該書把 115 年度重新歸類：同一個 115 年度預算案，補助及其他由 504 億變 184 億，社會福利由 8,318 億變 8,428 億，總額不變 3 兆 350 億。',

    'budget.s3.kicker':
      '同一張桌子，十年，\n有人的碗變成兩倍大，\n有人的碗還是那個碗。',
    'budget.s3.h2': '十年裡勞動部、經濟部預算翻了一倍多，財政部反而少了 14%',
    'budget.s3.lede':
      '同一筆錢，按「誰負責花」來切。橫條是 115 年度提案數（三讀後的機關別表還沒上架），深色直槓是 105 年度。整張圖只給兩個機關上色，國防部與文化部，因為這一頁一直會回到它們身上。',
    'budget.s3.chart.title':
      '主管機關預算：115 年度提案 vs 105 年度法定（億元）',
    'budget.s3.now': '115 年度（提案）',
    'budget.s3.then': '105 年度',
    'budget.s3.chart2.title': '各機關十年成長，以 105 年度＝100 為基準',
    'budget.s3.p1':
      '勞動部從 1,168 億到 2,971 億，大部分是撥補勞保基金（113 年度一年就 1,300 億）。經濟部從 590 億到 1,480 億。衛福部（+79%）與國防部（+75%）比率相近、金額差很多：國防部十年多了 2,413 億，是所有部會裡增加最多的一個。',
    'budget.s3.p2':
      '文化部長了 65%，從 165 億到 273 億，占總預算仍不到 1%（0.84% → 0.90%）。財政部是大部會裡唯一縮水的，−14%，債務利息與移轉支出都在降。有兩列要加註腳：教育部（3,606 億 → 2,659 億）與內政部（1,477 億 → 1,187 億）在 115 年度下降，是因為財劃法修正後部分對地方的補助改列，同一年「直轄市及縣市政府」那一列從 1,865 億升到 2,501 億。',
    'budget.s3.note':
      '來源：主計總處《中央政府總預算》歲出機關別預算總表（主管別彙總），105–115 年度。改制機關（農委會→農業部、環保署→環境部、科技部→國科會、海巡署→海洋委員會）視為同一條序列。115 年度為行政院提案數，480 億的刪減如何分到各機關，尚無公開表可查。',
    'budget.s3.growthUnit': '指數',

    'budget.s4.kicker':
      '九年，刀口都落在百分之一附近。\n第十年，一刀六個百分點。\n第十一年刀收回一半，日曆卻翻到了八月。',
    'budget.s4.h2':
      '立法院刪減比例九年落在 1.0–1.25%，114 年度跳到 6.6%，115 年度回到 1.6%',
    'budget.s4.lede':
      '刪減比例是這組資料裡最乾淨的政治訊號。總統與國會多數同黨的年份，105 年度的國民黨、106 到 113 年度的民進黨，都幾乎是一條平線。2024 年選出國民黨與民眾黨合計過半的國會之後，它跳起來、再落回，但沒回到舊的區間。三讀日期也從「前一年十二月」滑到「當年八月」。',
    'budget.s4.chart.title': '立法院刪減占行政院原列歲出的比例，105–115 年度',
    'budget.s4.series.cut': '刪減 %',
    'budget.s4.annot.2025': '2,076 億',
    'budget.s4.annot.2026': '480 億',
    'budget.s4.p1':
      '刪除是這一年的錢沒了。凍結是科目還在，但要先向委員會提報告、經同意才能動。114 年度兩者都是紀錄規模：減列 2,076 億（其中約 1,000 億是經濟部對台電的補貼），另凍結約 2,600 億。行政院提覆議，立法院 2025 年 3 月 12 日否決。',
    'budget.s4.p2':
      '115 年度的 480 億只有前一年的五分之一，但通案規則更利：特別費統刪 60%、20 個機關全刪且不得流用。媒體政策及業務宣導費統刪 50%。國外旅費最高統刪 70%。軍事裝備及設施統刪 2.5%。這裡的 1.58% 是 480 億除以原列 3 兆 350 億。部分報導用另一個分母算出 1.689%。',
    'budget.s4.table.h': '通案刪凍項目，114 vs 115 年度',
    'budget.s4.table.item': '項目',
    'budget.s4.table.kind': '性質',
    'budget.s4.table.value': '決議',
    'budget.s4.kind.cut': '刪除',
    'budget.s4.kind.freeze': '凍結',
    'budget.s4.kind.kept': '保留',
    'budget.s4.fy114': '114 年度（2025-01-21 三讀）',
    'budget.s4.fy115': '115 年度（2026-08-14 三讀）',

    'budget.s5.kicker':
      '一份預算在門外站了三百多天，\n門裡的人數著日子，\n每個人數出來的天數都不一樣。',
    'budget.s5.h2':
      '115 年度總預算 2025 年 8 月送院、2026 年 8 月 14 日三讀：三種「幾天」的算法',
    'budget.s5.lede':
      '預算法說，總預算案要在會計年度開始一個月前議決。115 年度的期限是 2025 年 11 月 30 日。從行政院 2025 年 8 月 21 日院會通過，到 2026 年 8 月 14 日三讀，中間發生了什麼，要看誰在說——所以這裡把三種算法都列出來，各歸各的說話者。',
    'budget.s5.days.h': '三種「拖了幾天」',
    'budget.s5.days.unit': '天',
    'budget.s5.timeline.h': '時間軸：114、115 與 116 年度',
    'budget.s5.culture.h': '文化與公共媒體：114 vs 115 年度',
    'budget.s5.culture.item': '項目',
    'budget.s5.culture.p1':
      '文化部的媒體宣傳費是 4,738 萬，占文化部 296 億的 0.16%，卻連續兩年成為唯一被歸零的部會媒宣費。2026 年 7 月委員會階段凍 800 萬，8 月院會表決改成整條刪除。公視刪 2,185 萬、凍 2 億（等新任董事長到任提專案報告）。TaiwanPlus 刪 2 億。文策院刪凍逾 1 億。',
    'budget.s5.voices.h': '誰說了什麼',
    'budget.s5.note':
      '來源：中央社、自由、聯合、央廣、行政院與文化部新聞稿，逐列連結見資料檔。原民會、客委會、華視的數字本輪研究未查得，不列。',

    'budget.s6.kicker':
      '寫下來的錢，\n一百塊裡有九十七塊會真的花出去。\n剩下的是保留款，和沒花完的。',
    'budget.s6.h2': '連續十年決算執行率都在 97–98% 之間，故事藏在分母',
    'budget.s6.lede':
      '每一條是一個年度的法定預算，藍色是事後審定的決算占它的比例，右邊淺色是沒花完的部分。這裡的執行率＝決算 ÷ 法定預算，不含追加預算。它量的是錢有沒有花出去，不是花得對不對。',
    'budget.s6.chart.title': '決算執行率＝決算 ÷ 法定預算，105–114 年度',
    'budget.s6.p1':
      '114 年度是分母的教科書案例：對三讀後的 2.925 兆算，決算 2.934 兆看起來是超支。對追加 819 億之後可支用的 3.007 兆算，是執行 97.6%。同一個數字，兩個故事。',
    'budget.s6.p2':
      '總預算也不是全部的錢包。前瞻建設、新式戰機、海空戰力、疫後韌性，這些特別預算各有自己的條例與上限，都在總預算之外。國防是最容易混的地方：「占 GDP 3.32%」把國防部主管預算、退輔會退除給付、海巡署、特別預算、特種基金全部加在一起。',
    'budget.s6.defense.h': '一個國防數字，四塊積木（115 年度，億元）',
    'budget.s6.defense.total': 'NATO 口徑合計',
    'budget.s6.defense.function': '只算政事別「國防」一項',
    'budget.s6.special.h': '總預算之外的特別預算',
    'budget.s6.special.period': '期程',
    'budget.s6.note':
      '來源：行政院 109–114 年度總決算新聞稿。主計總處 115 年度總說明。MyGoPen 對 9,495 億拆解的查核。中央社海空戰力特別預算報導。特別預算標「上限」「期別」者為法定或分期數字，不是累計實支。',

    'budget.s7.kicker':
      '這一頁的每個數字都有一個雙胞胎，\n也是真的。\n吵架之前，先問你手上拿的是哪一個。',
    'budget.s7.h2': '怎麼讀這張表：六組最常被搞混的數字',
    'budget.s7.g1.h': '提案數／法定數／決算數',
    'budget.s7.g1.p':
      '同一份預算的三個時刻：行政院要的、立法院給的、最後真的花的。「3.03 兆」是 115 年度提案，法定是 2.99 兆。新聞標題常混著用。',
    'budget.s7.g2.h': '刪除／凍結',
    'budget.s7.g2.p':
      '刪除是這一年沒了。凍結是錢還在帳上，但要先向委員會提報告才能動，114 年度多數凍結後來都解了。新聞裡兩個都叫「砍」。',
    'budget.s7.g3.h': '總預算／特別預算／特種基金',
    'budget.s7.g3.p':
      '這一頁講的是總預算。戰機、前瞻、防疫紓困都在特別預算，各有自己的條例。國防 9,495 億是 NATO 口徑三者加總。總預算裡的國防政事別是 5,488 億。',
    'budget.s7.g4.h': '名目／占 GDP／每人',
    'budget.s7.g4.p':
      '十年 +51% 聽起來很多。占 GDP 十年都在一成上下。換成每人，2.99 兆除以台灣約 2,330 萬人，一年大約 12.8 萬元。',
    'budget.s7.g5.h': '機關別／政事別',
    'budget.s7.g5.p':
      '文化部是 296 億。「教育科學文化」政事別是 5,566 億，因為它把大學、研究、每一所學校都算進去。比較之前先問這個數字是哪一種切法。',
    'budget.s7.g6.h': '執行率／成效',
    'budget.s7.g6.p':
      '花了 97% 表示錢離開了國庫，不表示買到了說好的東西。台灣每年公布執行率，成效評估只有部分計畫有。這一頁給前者，不假裝有後者。',
    'budget.s7.sources.h': '來源與方法',
    'budget.s7.sources.p':
      '金額一律億元。機關別與政事別表直接下載主計總處 xls／xlsx 與 PDF 原檔正規化，未手改。逐年合計與官方合計列在四捨五入內一致。策展項目（事件、刪凍、引語）在資料檔逐筆帶來源 URL。圖表為 build 時渲染的 inline SVG，每張圖下方都有資料表。',
    'budget.s7.download': '下載資料（JSON）',
    'budget.s7.corrections': '看到錯誤？開一個 issue',
    'budget.s7.related.h': '延伸閱讀',
    'budget.s7.related.taicca': '文化內容策進院：媒體預算攻防中間的那個機構',
    'budget.s7.related.pts': '公視',
    'budget.s7.related.recall': '大罷免',
    'budget.s7.related.politics': '台灣政治環境與選舉制度',
    'budget.s7.related.data': '資料總覽',
    'budget.s7.related.companies': '企業版圖',
    'budget.s7.related.opendata': '開放資料策展',
    'budget.basis.final': '決算',
    'budget.basis.legal': '法定',
    'budget.basis.proposed': '提案',
    'budget.era.president': '總統',
    'budget.era.ly': '國會多數',
    'budget.unit.yi': '億元',
    'budget.table.year': '年度',
    'budget.table.source': '來源',
    'budget.toc.s0': '預算怎麼過',
    'budget.toc.s1': '十年河流',
    'budget.toc.s2': '錢往哪裡去',
    'budget.toc.s3': '部會的十年',
    'budget.toc.s4': '立法院的手',
    'budget.toc.s5': '兩年的角力',
    'budget.toc.s6': '編了，花了多少',
    'budget.toc.s7': '怎麼讀',

    // v2（2026-08-18）：三分鐘版 takeaway、黏頂子導覽、圖表斷言標題、日曆條、量表——reports/design-budget-page-v2-2026-08-18.md
    'budget.hero.brief': '三分鐘版：八句話讀完這一頁',
    'budget.toc.s0.take':
      '預算走七站、經三個院、要一年半。115 年度在第三站卡了 257 天。',
    'budget.toc.s1.take':
      '法定歲出十年從 1.98 兆長到 2.99 兆（+51%），占 GDP 十年都在一成上下。',
    'budget.toc.s2.take':
      '社福十年都是第一大支出（27.4%）。國防占比升到十年最高的 18.1%，教科文是四大支出裡唯一占比下滑的。',
    'budget.toc.s3.take':
      '勞動部、經濟部十年翻一倍多，財政部少 14%。國防部多了 2,413 億，是增加最多的部會。',
    'budget.toc.s4.take':
      '立法院刪減比例八年落在 1.04–1.25%，114 年度 6.62%，115 年度 1.58%。',
    'budget.toc.s5.take':
      '115 年度總預算 2025 年 8 月送院、2026 年 8 月 14 日三讀。「拖了幾天」有 351、266、115 三種算法，各歸說話者。',
    'budget.toc.s6.take':
      '決算執行率連續十年 97–98%，沒花完的錢每年 360 到 737 億。國防「9,495 億」是四塊積木加起來的。',
    'budget.toc.s7.take':
      '每個數字都有一個也是真的雙胞胎：提案／法定／決算、刪除／凍結、總預算／特別預算。',
    'budget.subnav.label': '本頁章節',
    'budget.s0.overview': '七站總覽',
    'budget.s1.chart.gap': '立法院刪減',
    'budget.s1.chart2.take':
      '歲出占 GDP 十年在 9.6–11.1% 之間，債務比從 33.0% 降到 25.2%',
    'budget.s2.chart2.take':
      '占比十年：社福 23.7% → 27.4%、國防 15.9% → 18.1%、教科文 19.7% → 18.3%',
    'budget.s2.legend.share': '116 年度預算案值 · 占比',
    'budget.s2.slope.left': '105 年度',
    'budget.s2.slope.right': '115 年度',
    'budget.s2.growth.take':
      '四大支出裡教科文十年成長最慢：+46%，社福 +81%、國防 +77%、經濟發展 +60%',
    'budget.s2.growth.sub':
      '105 → 115 年度成長率（105 年度決算審定數 → 115 年度預算案數）',
    'budget.s3.chart2.take':
      '以 105 年度＝100，勞動部走到 254、經濟部 251，財政部 86',
    'budget.s3.table.share': '占 115 年度歲出',
    'budget.s4.band': '八年窄帶',
    'budget.s5.cal.title':
      '115 年度總預算在立法院的一年：送院、期限、付委、三讀',
    'budget.s5.cal.sub':
      '上：日曆與六個節點。下：三種「拖了幾天」，一律從三讀日往回量',
    'budget.s5.cal.approved': '院會通過',
    'budget.s5.cal.sent': '送達立法院',
    'budget.s5.cal.deadline': '預算法 §51 期限',
    'budget.s5.cal.fystart': '年度開始',
    'budget.s5.cal.referred': '付委',
    'budget.s5.cal.passed': '三讀',
    'budget.s5.cal.s54': '依 §54 運作',
    'budget.s5.cal.note':
      '三個天數的起點各不相同（院會通過、送院、付委），圖上一律從 2026-08-14 往回量。送達到三讀 348 天，法定期限到三讀 257 天。',
    'budget.s6.exec.spent': '已執行（決算 ÷ 法定）',
    'budget.s6.exec.unspent': '未執行',
    'budget.s6.exec.take':
      '每年法定預算有 1.6–2.9% 沒花完，最多的一年是 114 年度的 737 億',
    'budget.s6.defense.tick': '政事別「國防」',
    'budget.tip.close': '關閉',
  },
  ja,
  ko,
  es,
  fr,
  pt,
  hi,
  ar,
  ru,
  vi,
  id,
  de,
} as const;
