/**
 * income 專題主頁第 5 到第 8 區文案（zh-TW／en）。
 *
 * 元件：src/components/income/sections/S5PensionLayers、S6LaborInsuranceFinance、
 * S7ReformStances、S8WhatsNext。句子裡的 {占位符} 由元件從資料檔帶入，文案本身不寫死數字。
 * 事實來源：reports/research/2026-11/income-topic-02-pension.md、-04-history-stances.md。
 * 第 6、7 區是政治爭議題：只陳述可查證的事實與各方原話，本站不下結論；
 * 勞保財務用精算報告自己的用語。共用字放 income.commonb.*（避免跟 sections-a 的 income.common.* 撞名）。
 */
export const sectionsB: {
  en: Record<string, string>;
  'zh-TW': Record<string, string>;
} = {
  en: {
    // ── shared ──
    'income.commonb.nodata': 'No data',
    'income.commonb.source': 'Source',
    'income.commonb.sourcePrefix': 'Source: ',
    'income.commonb.table': 'Data table',
    'income.commonb.related': 'Related articles',
    'income.commonb.year': 'Year',
    'income.commonb.yearRoc': '{ce}',
    'income.commonb.zhao': 'NT${tr} trillion',
    'income.commonb.yi': 'NT${bn} billion',
    'income.commonb.listsep': ', ',

    // ── S5 ──
    'income.s5.kicker': 'Old age is paid from several pockets',
    'income.s5.h2': 'How many layers does a pension have?',
    'income.s5.lede':
      'Most employees have two layers. Labor Insurance (勞保), a social insurance scheme, pays an old-age pension based on insured years and insured salary. The Labor Pension (勞退新制) is an individual account into which the employer pays at least {r} of wages every month. People who are not in another social insurance scheme are covered by the National Pension, and military personnel, civil servants and teachers have schemes of their own. At the end of {asOf}, {cases} Labor Insurance old-age pensions were being paid, averaging {avg} a month.',
    'income.s5.tl.h': 'Timeline of the schemes',
    'income.s5.tl.more': 'See the full timeline ({n} more events)',
    'income.s5.tl.lsa':
      'Official sources give two effective dates: the act says it takes effect on promulgation, {d1}, and an Executive Yuan fact sheet says {d2}.',
    'income.s5.tbl.h': '{n} schemes side by side',
    'income.s5.col.system': 'Scheme',
    'income.s5.col.who': 'Who is covered',
    'income.s5.col.pay': 'Who pays',
    'income.s5.col.calc': 'How it is calculated',
    'income.s5.col.age': 'When you can claim',
    'income.s5.col.law': 'Legal basis',
    'income.s5.missing': 'Not covered here',

    'income.s5.row.li.name': 'Labor Insurance old-age pension (勞保老年年金)',
    'income.s5.row.li.who':
      'Insured workers: employees, and members of occupational unions, whose cost split is different.',
    'income.s5.row.li.pay':
      'In {year} the ordinary-risk premium rate is {total}, of which {ei} is Employment Insurance and {li} is Labor Insurance itself. For employees the worker pays {worker}, the employer {employer} and the government {gov}.',
    'income.s5.row.li.calc':
      'The better of two formulas: average monthly insured salary × years × {a} + NT${c}, or average monthly insured salary × years × {b}. The average is taken over the highest {months} months.',
    'income.s5.row.li.age':
      'At least {min} insured years. The statutory age runs from {a0} to {a1} by birth year ({a1} for people born in ROC year {by} or later). You may claim up to {n} years early or late, with {adj} less or more per year.',
    'income.s5.row.li.law': 'Labor Insurance Act, Articles 58, 58-1 and 58-2',

    'income.s5.row.lpn.name': 'Labor Pension, new system (勞退新制)',
    'income.s5.row.lpn.who':
      "Workers covered by the Labor Standards Act; the employer must contribute for them every month. Those already under that act before {start} who stayed with the same employer could keep the old system, or switch to the new one within {n} years. The money sits in an individual account in the worker's own name, and service years are counted by actual contributions.",
    'income.s5.row.lpn.pay':
      'The employer contributes at least {r} of monthly wages. The worker may add up to {s} voluntarily, and that amount is not taxed as salary in the year it is paid in.',
    'income.s5.row.lpn.calc':
      'Account principal plus accumulated returns, converted into a monthly pension using life expectancy and an interest rate (currently {rate}), or taken as a lump sum.',
    'income.s5.row.lpn.age':
      'From age {age}. With {y} or more contribution years you may choose a monthly pension or a lump sum; with fewer, a lump sum only.',
    'income.s5.row.lpn.law': 'Labor Pension Act, Articles 14, 23 and 24',

    'income.s5.row.lpo.name': 'Labor Pension, old system (勞退舊制)',
    'income.s5.row.lpo.who':
      'Workers already under the Labor Standards Act before {start} who stayed with the same employer and chose to remain in the old system.',
    'income.s5.row.lpo.pay':
      "Paid by the employer, within {days} days of retirement. The employer's reserve contribution rate is not covered here.",
    'income.s5.row.lpo.calc':
      '{u} base units for each year of service; beyond {f} years, {u2} unit per year; {max} units at most. One unit is one month of average wages at the time retirement is approved. Paid as a lump sum.',
    'income.s5.row.lpo.age':
      'Voluntary retirement after {y1} years of service at age {a1}, after {y2} years of service, or after {y3} years at age {a3}. The years must be with the same employer.',
    'income.s5.row.lpo.law': 'Labor Standards Act, Articles 53 and 55',

    'income.s5.row.np.name': 'National Pension (國民年金)',
    'income.s5.row.np.who':
      'Nationals aged {min} or over and under {max}, with household registration in Taiwan, who are not in another social insurance scheme and have not drawn an old-age benefit from one. Separate rules cover people whose earlier old-age benefit was below set thresholds.',
    'income.s5.row.np.pay':
      'The premium rate is {rate} (from {rateFrom}) and the monthly insured amount is {amount} (from {amountFrom}). An ordinary insured person pays {self} and the central government {gov}. Low-income and lower-middle-income households, people below set income levels and people with disabilities pay a smaller share or nothing.',
    'income.s5.row.np.calc':
      'Formula A: monthly insured amount × years × {a} + an add-on of {add} (announced by the Bureau of Labor Insurance, in force from {addFrom}). Formula B: monthly insured amount × years × {b}. The better of the two is paid, though some people may not choose Formula A.',
    'income.s5.row.np.age': 'From age {age}.',
    'income.s5.row.np.law':
      'National Pension Act, Articles 7, 10, 12, 29 and 30',

    'income.s5.row.cs.name':
      'Civil servants and public school staff, defined benefit (first hired before {start})',
    'income.s5.row.cs.who':
      'Civil servants first hired before {start}. Public school staff are covered by a separate act.',
    'income.s5.row.cs.pay':
      'Contributions are {lo} to {hi} of twice the base salary. The government pays {gov} and the civil servant {self}.',
    'income.s5.row.cs.calc':
      'The monthly pension is calculated by years of service and capped by a statutory income-replacement ceiling. Since the amendment promulgated on {amend}, the ceiling is {r15} for {lo} years of service and {r35} for {hi} years, the {fzy} level. The original {ly} schedule lowered it year by year to {f15} and {f35} from {fy}. While petitions to the Constitutional Court are pending, retirees were first paid under the earlier rules and receive the difference after reassessment; the United Daily News reported on {paid} that the back payments had been made.',
    'income.s5.row.cs.age':
      'The full monthly pension starts at age {age} for retirements from {from}. Claiming early costs {cut} per year, up to {n} years.',
    'income.s5.row.cs.law':
      'Civil Servants Retirement, Severance and Pension Act, Articles 7, 31 and 37',

    'income.s5.row.csa.name':
      'Civil servants, individual accounts (first hired on or after {start})',
    'income.s5.row.csa.who':
      'Civil servants first hired on or after {start}. Teachers have a separate act.',
    'income.s5.row.csa.pay':
      'Contributions are {rate} of twice the base salary, {gov} from the government and {self} from the employee, paid into an individual account. The employee may add more voluntarily, up to {extra}.',
    'income.s5.row.csa.calc':
      'The benefit depends on what the individual account has accumulated. How it is paid out is not covered here.',
    'income.s5.row.csa.age': 'Claiming age',
    'income.s5.row.csa.law':
      "Act Governing Civil Servants' Individual-Account Retirement, Discharge and Pensions, Articles 1 and 9",

    'income.s5.row.mil.name': 'Military personnel',
    'income.s5.row.mil.who': 'Officers and noncommissioned officers.',
    'income.s5.row.mil.pay':
      'Contributions are {lo} to {hi} of twice the base pay. The government pays {gov} and serving personnel {self}.',
    'income.s5.row.mil.calc':
      'Retirement pay = base × rate. The rate is {r} after {y} years of service and rises {p} for each further year, capped at {co} for officers and {cn} for noncommissioned officers. The base is twice the average base pay, for the same rank and grade, over the last fifth of the service period.',
    'income.s5.row.mil.age':
      'Based on service years: retirement pay starts after {y} years. Age conditions are not covered here.',
    'income.s5.row.mil.law':
      'Act of Military Service for Officers and Noncommissioned Officers, Articles 26 and 29',

    'income.s5.tbl.note':
      'Rules as of {asOf}. Each cell links to the official page it comes from. For items marked “Not covered here”, see the legal basis link.',
    'income.s5.p1':
      'Under the new Labor Pension the money is in your own account, so changing jobs does not reset it and your years count by actual contributions. The old system required you to complete your years with one employer. The law also sets a floor on the returns of the Labor Pension fund: they may not fall below the two-year time deposit rate, and the treasury makes up any shortfall. The guaranteed minimum announced for {period} is {g} a year.',
    'income.s5.p2':
      'The parameters in every layer can change each year: premium rates, salary grades, the insured amount. The calculator below uses the {year} rules. Enter your insured years and salary to see what each of the two layers pays, and how much earlier or later claiming changes it.',
    'income.s5.rr.h': 'Why there is no replacement-rate chart here',
    'income.s5.rr.p1':
      'Many readers want one chart comparing the income replacement rate of every scheme. This page does not draw it. The official figures are not on the same basis: Labor Insurance and the National Pension publish formulas, the civil service law sets a ceiling, the military has a pay rate, and the new Labor Pension depends on what each account holds. Putting them in one bar chart would suggest they can be compared directly. The pension report of the Organisation for Economic Co-operation and Development (OECD) does not list Taiwan either.',
    'income.s5.rr.p2':
      'Two actual numbers do have official sources. Bureau of Labor Insurance statistics show {cases} old-age pensions in payment at the end of {asOf}, averaging {avg} a month. The same group had an average insured salary of {wage} and {yrs} insured years on average. That is the Labor Insurance layer only, without the Labor Pension. The other number is the yearly return of the new Labor Pension fund, shown below.',
    'income.s5.chart.title':
      'The Labor Pension fund lost money in {neg} of {n} years; each of the last three years returned more than {floor}%',
    'income.s5.chart.sub':
      'Percent. This is the yearly return of the fund as a whole; individual accounts also carry a guaranteed minimum return. Cumulative return at December of each year, which is the full-year return. {py} runs only to {pm} ({pv}%), not a full year, and is left out.',
    'income.s5.chart.src':
      'Bureau of Labor Funds, yearly returns of the new Labor Pension fund, data to {asOf}',
    'income.s5.chart.value': 'Annual return',
    'income.s5.note':
      "Past returns do not predict future ones. The Ministry of Labor's pension calculator defaults to the average since the fund began, {d} (version of {asOf}).",

    // ── S6 ──
    'income.s6.kicker': 'Premiums, benefits and transfers',
    'income.s6.h2':
      'Since {year}, Labor Insurance premium income has been below benefit payments',
    'income.s6.lede':
      'Ordinary-risk premium income for Labor Insurance (勞保) first fell below benefit payments in {year}, and has stayed below in every year with data since. In {last} the scheme took in {prem} and paid out {ben}. Over the same period the fund did not shrink. With investment income and government transfers, it stood at {fund} at the end of {fy}.',
    'income.s6.chart1.title':
      'Premium income has been below benefits since {year}; the gap in {last} was {gap}',
    'income.s6.chart1.sub':
      'NT$100 million. Premium income is ordinary-risk premiums. Benefits are the total of lump sums, difference payments (差額金) and pensions; injury and sickness benefits include COVID-19 payments.',
    'income.s6.series.premium': 'Premium income',
    'income.s6.series.benefit': 'Benefit payments',
    'income.s6.chart1.gap': 'Gap',
    'income.s6.chart1.src':
      'Bureau of Labor Insurance, 2024 actuarial report on ordinary-risk premium rates, tables 2-1 and 2-2 ({y0}–{y1})',
    'income.s6.note1':
      'The chart is blank for {nulls}: the official statistics for those years have not been obtained first-hand, and this page does not use the final-account figures quoted in media reports.',
    'income.s6.p1':
      'The fund under management grew from {v0} at the end of {y0} to {v1} at the end of {y1}, and its return in {y1} was {ret}. From {s0} the government budgeted a transfer every year, {cum} budgeted in total by {s1}. Meanwhile the “unfunded actuarial liability” in the actuarial reports rose from {u0} (valuation date {b0}) to {u1} (valuation date {b1}). The balance is growing, and so is the amount the scheme has promised to pay in the future.',
    'income.s6.tbl.h': '{n} actuarial reports compared',
    'income.s6.tbl.item': 'Item',
    'income.s6.tbl.report': '{ce} report (ROC {roc})',
    'income.s6.tbl.row.base': 'Valuation date',
    'income.s6.tbl.row.al': 'Actuarial liability',
    'income.s6.tbl.row.fund': 'Fund balance',
    'income.s6.tbl.row.ual': 'Unfunded actuarial liability',
    'income.s6.tbl.row.deficit': 'Year premium income fell short of spending',
    'income.s6.tbl.row.negative':
      'Year the accumulated fund balance turns negative',
    'income.s6.tbl.row.exhaust':
      'Year the fund is exhausted if future transfers are excluded',
    'income.s6.tbl.row.balancedAmortized':
      'Balanced premium rate, amortizing past unfunded liability',
    'income.s6.tbl.row.balancedUnamortized':
      'Balanced premium rate, not amortizing past unfunded liability',
    'income.s6.tbl.row.discount': 'Discount rate',
    'income.s6.tbl.note':
      "The row labels follow the summary tables of the actuarial reports, except “Year the fund is exhausted if future transfers are excluded”, which comes from a note in the reports. The two balanced premium rates for the 2018 report are taken from the prior-valuation column of the 2021 report. The three reports use different assumptions, including the discount rate, so the amounts are not strictly comparable across columns. The fund balance here is the actuarial figure, which differs from the Bureau of Labor Funds' “assets under management”.",
    'income.s6.p2':
      "The latest valuation (as of {b}) puts the “year the accumulated fund balance turns negative” at {neg}, {d} years later than the previous report's {prevNeg}. The report states that this year does not count future government transfers. The report gives two balanced premium rates: {balA} “amortizing past unfunded liability” and {balN} “not amortizing past unfunded liability”. It describes the second as the rate at which actuarial income and spending are equal. The ordinary-risk rate in force in {year} is {cur}, and under the Labor Insurance Act it rises to {next} in {ny}, the statutory cap. The {year} and {ny} rates both include {ei} for Employment Insurance.",
    'income.s6.chart2.title':
      'Government transfers grew from {a0} in {y0} to {a1} in {y1}, {cum} in total',
    'income.s6.chart2.sub':
      'NT$100 million. General budget plus special budget for each year.',
    'income.s6.chart2.now': 'Transfer that year',
    'income.s6.chart2.cum': 'cumulative {cum}',
    'income.s6.chart2.src':
      'Bureau of Labor Insurance, 2024 actuarial report, section 8; cumulative totals added by this site',
    'income.s6.note2': 'The {y1} figure is the budgeted amount.',
    'income.s6.note2.pending':
      'The {ny} transfer is not in the chart. A Presidential Office press release of {d} says {amt} was budgeted for {ny}, bringing the {n}-year total to {cum}, and that the Legislative Yuan had not yet passed the budget when the release was issued.',
    'income.s6.note2.passed':
      'The {ce} (ROC year {ny}) central government budget passed its third reading on {date}, with NT$48 billion cut in total (CNA report). Neither the report nor the Ministry of Labor and Bureau of Labor Insurance pages, checked on {checked}, say whether this transfer was kept as budgeted.',
    'income.s6.p3':
      "The amendment to the Labor Insurance Act promulgated on {date} wrote two things into law. Article 66 requires the government to budget a transfer every year. Article 69 says the central government bears final responsibility for payment of Labor Insurance finances, and that the scheme's finances must be reviewed at least every three years. (Original text of its first sentence: {a69}) The amendment did not change the benefit formula, the claiming age, the premium rate or the cost split.",
    'income.s6.p4':
      'As of {asOf} there is no public timetable for changing Labor Insurance benefits or premium rates. At a press conference on {d} the Minister of Labor said no system reform or benefit cut was being studied (reported by the Liberty Times; a paraphrase).',
    'income.s6.tos7':
      'The next section sets out how each side reads these numbers.',

    // ── S7 ──
    'income.s7.kicker': "One issue, each side's own words",
    'income.s7.h2': 'How to reform pensions: what each side says',
    'income.s7.lede':
      'This section puts statements on the same issue side by side: labor groups, business groups, military, civil service and teacher groups, youth groups and scholars, government agencies, and political parties. Sentences in quotation marks were checked word for word against the source page. Entries marked “Paraphrase” are indirect speech from a report. This site draws no conclusion for any side, and evaluative words inside quotes belong to the speaker.',
    'income.s7.tl.h': 'What happened, in order',
    'income.s7.tl.earlier': 'How it got here, {y0} to {y1} ({n} events)',
    'income.s7.tl.fallback.promulgated':
      'Civil Servants Retirement, Severance and Pension Act promulgated',
    'income.s7.tl.fallback.effective': 'Most articles of the act take effect',
    'income.s7.tl.fallback.third':
      'Legislative Yuan passes the amendment that stops the scheduled lowering of the ceiling',
    'income.s7.tl.fallback.amended': 'The amendment is promulgated',
    'income.s7.tl.fallback.status':
      'The Executive Yuan, the Examination Yuan and the Democratic Progressive Party caucus have petitioned the Constitutional Court. As of {date}, the judgments and press releases published by the court include no judgment or interim order on these petitions.',
    'income.s7.tl.court':
      'As of {date}, the judgments and press releases published by the Constitutional Court include no judgment or interim order on these petitions.',
    'income.s7.tl.court.report':
      'A Central News Agency report of {rd} said the result had not yet come out.',
    'income.s7.chart.title':
      'Ceiling for {y} years of service: scheduled to fall to {rf} by {fy}, held at {rz} after the amendment',
    'income.s7.chart.sub':
      'Percent. Income-replacement ceiling for {y} years of service under Schedule 3 of the act. This is a ceiling, not the ratio people actually receive. Calendar-year values compiled by this site from the periods in the schedule.',
    'income.s7.series.original': 'Original {ly} schedule',
    'income.s7.series.after': 'After the {d} amendment',
    'income.s7.chart.src':
      'Civil Servants Retirement, Severance and Pension Act, Article 37 and Schedule 3, Laws and Regulations Database, read {asOf}',
    'income.s7.chart.note':
      "The first period runs from {from} to {to}, so {ya} and {yb} share one value. The line after the amendment shows the ceiling that applies; how each retiree's pension is reassessed is outside this chart.",
    'income.s7.p1':
      'The Civil Servants Retirement, Severance and Pension Act promulgated on {prom} set a ten-year schedule. The income-replacement ceiling for {y35} years of service started at {r0} and fell {step} percentage points a year, reaching {rf} in {fy}. The schedule took effect on {eff}.',
    'income.s7.p2':
      'The amendment passed by the Legislative Yuan on {third} and promulgated on {prom} says that everyone, whether retired before or after it, is assessed at the {fzy} ceiling, and the later yearly reductions no longer apply. That holds {y35} years of service at {rz} and {y15} years at {rz15}. The Executive Yuan and the Examination Yuan have petitioned the Constitutional Court for a ruling and an interim order. The Democratic Progressive Party caucus has also petitioned.',
    'income.s7.p2b':
      'After the amendment was promulgated, the Ministry of Civil Service said the replacement rates of nearly {n}0,000 retired civil servants had to be reassessed, that pensions would be paid under the earlier rules until that was done, and that the difference would be paid afterwards (Central News Agency report of {d1}; a paraphrase). The United Daily News reported on {d2} that the government had paid the difference. The Executive Yuan said the same day that whether those payments would be recovered if the amendment were ruled unconstitutional would be handled by the agencies concerned according to the judgment, once the Constitutional Court issues one (a paraphrase from the report).',
    'income.s7.p3':
      'An earlier constitutional review ended on {d}. Interpretation No. 782 held that the {ly} reductions did not involve retroactive legislation and did not violate the principles of legitimate expectation or proportionality. It also asked the authorities to adopt suitable adjustments at the first periodic review. The same interpretation struck down Article 77, Paragraph 1, Subparagraph 3 of the act, which suspended the monthly pension of retirees who took a job at a private school paying more than the statutory basic wage. It held that the provision was contrary to the constitutional guarantee of equality and lost effect from the date of the interpretation.',
    'income.s7.nostances':
      "There is no data on each side's statements yet. Only the timeline and chart are shown.",
    'income.s7.group.labor': 'Labor groups',
    'income.s7.group.business': 'Business groups',
    'income.s7.group.civil-servants':
      'Military, civil service and teacher groups',
    'income.s7.group.youth-scholars': 'Youth groups and scholars',
    'income.s7.group.government': 'Government agencies',
    'income.s7.group.party': 'Political parties',
    'income.s7.tag.paraphrase': 'Paraphrase',
    'income.s7.tag.translated': 'Translated from Chinese',
    'income.s7.quote': '“{q}”',
    'income.s7.gaps.k': 'What was not found: ',
    'income.s7.more': '{title} ({n} statements)',
    'income.s7.note':
      'Cards within each issue follow a fixed order: labor groups, business groups, military, civil service and teacher groups, youth groups and scholars, government agencies, political parties. The order implies no ranking. The quotes were checked on {asOf}; each card links to its source.',

    // ── S8 ──
    'income.s8.kicker': 'Dates already circled on the calendar',
    'income.s8.h2': 'What changes next',
    'income.s8.lede':
      'In {y0} Taiwan has {p0} people aged 15 to 64 for every person aged 65 or over. The projection the National Development Council published on {pub} gives only {n} years: the figure is {p1} in {y1}, {pa} in {ya} and {pb} in {yb}. Fewer people pay premiums and taxes while more draw pensions, which affects the Labor Insurance and tax revenue charts earlier on this page.',
    'income.s8.chart.title':
      '{p0} working-age people per person aged 65 or over in {y0}, {p1} in {y1}, {pb} in {yb}',
    'income.s8.chart.sub':
      'Percent. Old-age dependency ratio = people aged 65 or over per 100 people aged 15 to 64, shown here as a percentage. The potential support ratio in the title is its inverse.',
    'income.s8.series.share65': 'Aged 65+ as share of population',
    'income.s8.series.oadr': 'Old-age dependency ratio',
    'income.s8.chart.src':
      'National Development Council, Population Projections for the Republic of China ({y0}–{yl}), published {pub}',
    'income.s8.chart.note':
      'The official release gives only {n} years. The lines between points are a reading aid; this site did not interpolate. People aged 65 or over are {s0} of the population in {y0} and {sl} in {yl}.',
    'income.s8.cal.h': 'Dates that change every year',
    'income.s8.cal.nextk': 'Next announced figure',
    'income.s8.cal.jan.when': '1 January',
    'income.s8.cal.jan.what':
      'The Labor Insurance premium rate, the insured salary grades and the minimum wage all take effect on this day. Under the Labor Insurance Act the ordinary-risk rate rises {step} percentage points every two years up to a cap of {cap}. It reaches the cap in {capYear}, after which this mechanism raises it no further.',
    'income.s8.cal.jan.next':
      '1 January {ny}: the ordinary-risk rate goes from {cur} to {next} (announced by the Bureau of Labor Insurance on {ann}). The {mwy} minimum wage is {m} a month and {h} an hour (published {pub}). The {ny} insured salary grades had not been announced as of {asOf}.',
    'income.s8.cal.may.when': 'May',
    'income.s8.cal.may.what':
      'Individual income tax filing. You file for the income of the previous year.',
    'income.s8.cal.may.next':
      'In May {fyear} you file for tax year {ce} (ROC {fy}): personal exemption {ex}, standard deduction for a single filer {sd}, special deduction for salary income up to {sal}.',
    'income.s8.cal.sep.when': 'Around September',
    'income.s8.cal.sep.what':
      "The Minimum Wage Review Committee meets, sets next year's monthly and hourly wage, and sends the decision to the Executive Yuan for approval. The Minimum Wage Act took effect on {eff}.",
    'income.s8.cal.sep.next':
      "The committee's decision on {d}: the monthly wage rises from {pm} to {m}, up {inc}%. The {after} figure waits for the next review.",
    'income.s8.cal.nov.when': 'Late November',
    'income.s8.cal.nov.what':
      "The Ministry of Finance announces next year's exemptions, deductions and tax brackets. They are adjusted only when consumer prices have risen a cumulative {th} or more since the last adjustment.",
    'income.s8.cal.nov.next':
      'The last announcement, on {ann}, covers tax year {ce} (ROC {fy}). The amounts for tax year {nce} had not been announced as of {asOf}.',
    'income.s8.cal.dec.when': 'By the end of December',
    'income.s8.cal.dec.what':
      'The Ministry of Finance announces the basic living expense per person. When you file, the part of the household total that exceeds your exemptions and deductions can be subtracted as well. The special deduction for salary income and property transaction losses are left out of that comparison.',
    'income.s8.cal.dec.pending':
      'The amount for tax year {ce} (ROC {fy}) had not been announced as of {asOf}.',
    'income.s8.cal.dec.done':
      'The amount for tax year {ce} (ROC {fy}) is {v} per person.',
    'income.s8.cal.tri.when': 'Every three years',
    'income.s8.cal.tri.what':
      "The Labor Insurance actuarial valuation. Article 69 of the Labor Insurance Act, promulgated on {date}, requires a review of the scheme's finances at least every three years.",
    'income.s8.cal.tri.next':
      'The latest valuation date is {b}, published {pub}. No official date has been announced for the next one.',
    'income.s8.p1':
      'Some items on this calendar run on a fixed mechanism. Exemptions follow prices, the minimum wage is reviewed every year, and the cap on the Labor Insurance rate and the government transfers are written into law. Other items have no date yet. There is no public timetable for changing Labor Insurance benefits or rates. The Executive Yuan, the Examination Yuan and the Democratic Progressive Party caucus have petitioned the Constitutional Court over the civil service pension amendment; as of {court}, the judgments the court has published do not include this case.',
    'income.s8.p2':
      'Each of the four tools takes about a minute: what you take home, where you stand, what you owe next May, and what the two pension layers will pay. Run them, then come back to this calendar and see which dates are yours.',
    'income.s8.act.k': 'Calculate your own',
    'income.s8.act.takehome': 'Take-home pay',
    'income.s8.act.percentile': 'Salary position',
    'income.s8.act.tax': 'Income tax',
    'income.s8.act.pension': 'Labor Insurance and Labor Pension',
    'income.s8.cross.lead':
      'Care after retirement and where to live are in two other topics: ',
    'income.s8.cross.health': 'Health',
    'income.s8.cross.housing': 'Housing',
  },

  'zh-TW': {
    // ── 共用 ──
    'income.commonb.nodata': '沒有資料',
    'income.commonb.source': '來源',
    'income.commonb.sourcePrefix': '來源：',
    'income.commonb.table': '資料表',
    'income.commonb.related': '相關文章',
    'income.commonb.year': '年度',
    'income.commonb.yearRoc': '{ce}（民國 {roc} 年）',
    'income.commonb.zhao': '{z} 兆 {y} 億元',
    'income.commonb.yi': '{y} 億元',
    'income.commonb.listsep': '、',

    // ── S5 ──
    'income.s5.kicker': '老了以後，錢從哪幾處來',
    'income.s5.h2': '退休金有幾層？',
    'income.s5.lede':
      '多數受僱勞工的退休金有兩層。一層是勞保老年年金，屬於社會保險，按年資與投保薪資計算。另一層是勞退新制的個人專戶，雇主每月至少提繳工資的 {r}。沒有參加其他社會保險的國民由國民年金承保，軍公教另有自己的退撫制度。{asOf} 年底，勞保老年年金有 {cases} 件在領，平均每月 {avg}。',
    'income.s5.tl.h': '制度年表',
    'income.s5.tl.more': '看完整年表（其餘 {n} 筆）',
    'income.s5.tl.lsa':
      '施行日有兩種官方寫法：條文寫公布日 {d1} 施行，行政院的國情簡介寫 {d2}。',
    'income.s5.tbl.h': '{n} 種制度放在一起看',
    'income.s5.col.system': '制度',
    'income.s5.col.who': '誰適用',
    'income.s5.col.pay': '誰出錢',
    'income.s5.col.calc': '怎麼算',
    'income.s5.col.age': '幾歲可領',
    'income.s5.col.law': '法源',
    'income.s5.missing': '未收錄',

    'income.s5.row.li.name': '勞保老年年金',
    'income.s5.row.li.who':
      '參加勞保的被保險人：受僱勞工，以及職業工會會員（負擔比例不同）。',
    'income.s5.row.li.pay':
      '{year} 年普通事故費率 {total}，其中 {ei} 是就業保險，勞保實收 {li}。受僱勞工自付 {worker}，雇主 {employer}，政府 {gov}。',
    'income.s5.row.li.calc':
      '兩式擇優：平均月投保薪資 × 年資 × {a}＋{c} 元，或平均月投保薪資 × 年資 × {b}。平均月投保薪資取最高 {months} 個月平均。',
    'income.s5.row.li.age':
      '年資滿 {min} 年。法定請領年齡依出生年次從 {a0}歲到 {a1}歲，民國 {by} 年次以後是 {a1}歲。可以提前或延後最多 {n} 年，每年減或增 {adj}。',
    'income.s5.row.li.law': '勞工保險條例第 58、58-1、58-2 條',

    'income.s5.row.lpn.name': '勞退新制',
    'income.s5.row.lpn.who':
      '適用勞基法的勞工，雇主都要按月提繳。{start} 施行前就適用勞基法、留在同一事業單位的人，可以選擇繼續適用舊制，或在施行後 {n} 年內改選新制。退休金存進自己名下的個人專戶，年資以實際提繳為準。',
    'income.s5.row.lpn.pay':
      '雇主每月提繳不低於工資的 {r}。勞工可以在 {s} 以內自願提繳，自提的錢不計入當年薪資所得課稅。',
    'income.s5.row.lpn.calc':
      '專戶本金加累積收益，依平均餘命與利率（現行 {rate}）換算成月退休金，或一次領回。',
    'income.s5.row.lpn.age':
      '滿 {age} 歲。提繳年資滿 {y} 年可以選月退或一次領，未滿只能一次領。',
    'income.s5.row.lpn.law': '勞工退休金條例第 14、23、24 條',

    'income.s5.row.lpo.name': '勞退舊制',
    'income.s5.row.lpo.who':
      '{start} 前就適用勞基法、留在同一事業單位並選擇繼續適用舊制的勞工。',
    'income.s5.row.lpo.pay':
      '由雇主給付，退休之日起 {days} 日內付清。雇主提撥準備金的比率未收錄。',
    'income.s5.row.lpo.calc':
      '年資每滿一年給 {u} 個基數，超過 {f} 年的部分每年 {u2} 個基數，最高 {max} 個基數。一個基數是核准退休時一個月的平均工資。一次給付。',
    'income.s5.row.lpo.age':
      '自請退休的條件：工作 {y1} 年以上滿 {a1}歲、工作 {y2} 年以上，或工作 {y3} 年以上滿 {a3} 歲。年資要在同一事業單位。',
    'income.s5.row.lpo.law': '勞動基準法第 53、55 條',

    'income.s5.row.np.name': '國民年金',
    'income.s5.row.np.who':
      '年滿 {min} 歲、未滿 {max} 歲，在國內設有戶籍，沒有參加相關社會保險，也還沒領取相關社會保險老年給付的國民。已領老年給付但年資或金額未達標準的人另有規定。',
    'income.s5.row.np.pay':
      '費率 {rate}（{rateFrom} 起），月投保金額 {amount}（{amountFrom} 起）。一般被保險人自付 {self}，中央主管機關負擔 {gov}。低收入戶、中低收入戶、所得未達一定標準的人與身心障礙者，自付比例較低或由政府全額負擔。',
    'income.s5.row.np.calc':
      'A 式：月投保金額 × 年資 × {a}＋加計金額 {add}（勞保局公告，{addFrom} 起適用）。B 式：月投保金額 × 年資 × {b}。兩式擇優，部分情形不得選 A 式。',
    'income.s5.row.np.age': '滿 {age} 歲。',
    'income.s5.row.np.law': '國民年金法第 7、10、12、29、30 條',

    'income.s5.row.cs.name': '公教退撫（{start} 前初任，確定給付）',
    'income.s5.row.cs.who':
      '{start} 前初任的公務人員。公立學校教職員適用另一部條例。',
    'income.s5.row.cs.pay':
      '按本（年功）俸額加一倍的 {lo} 到 {hi} 提撥，政府撥繳 {gov}，公務人員繳付 {self}。',
    'income.s5.row.cs.calc':
      '月退休金按年資計給，另受「退休所得替代率上限」限制。{amend} 公布的修法之後，任職 {lo} 年的上限是 {r15}，{hi} 年是 {r35}，也就是 {fzy} 年的水準。{ly} 年原訂時程是逐年下降，{fy} 年起為 {f15} 與 {f35}。聲請釋憲期間，已退休人員先照原規定領，重新審定後補發差額。聯合報 {paid} 報導政府已補發。',
    'income.s5.row.cs.age':
      '{from} 以後退休的人，月退休金起支年齡是 {age} 歲。提前領每年減 {cut}，最多提前 {n} 年。',
    'income.s5.row.cs.law': '公務人員退休資遣撫卹法第 7、31、37 條',

    'income.s5.row.csa.name': '公教個人專戶制（{start} 以後初任）',
    'income.s5.row.csa.who': '{start} 以後初任的公務人員。教職員另有條例。',
    'income.s5.row.csa.pay':
      '按本（年功）俸額加一倍的 {rate} 提撥，政府 {gov}、個人 {self}，存進個人專戶。個人可以再自願增加提繳，上限 {extra}。',
    'income.s5.row.csa.calc': '領多少看個人專戶累積的金額。給付方式未收錄。',
    'income.s5.row.csa.age': '請領年齡',
    'income.s5.row.csa.law': '公務人員個人專戶制退休資遣撫卹法第 1、9 條',

    'income.s5.row.mil.name': '軍人退撫',
    'income.s5.row.mil.who': '軍官與士官。',
    'income.s5.row.mil.pay':
      '按本俸加一倍的 {lo} 到 {hi} 提撥，政府撥付 {gov}，現役人員繳付 {self}。',
    'income.s5.row.mil.calc':
      '退休俸等於基數乘以俸率。服役滿 {y} 年俸率 {r}，每多一年加 {p}，軍官最高 {co}，士官最高 {cn}。基數是同官階俸級人員服役期間最後五分之一年資的本俸平均數加一倍。',
    'income.s5.row.mil.age':
      '以服役年資計，滿 {y} 年起支退休俸。年齡條件未收錄。',
    'income.s5.row.mil.law': '陸海空軍軍官士官服役條例第 26、29 條',

    'income.s5.tbl.note':
      '表內為 {asOf} 的現行規定，每一格後面的箭頭連到該格依據的官方頁面。未收錄的欄位請看法源連結。',
    'income.s5.p1':
      '勞退新制的錢在你自己的專戶裡，換工作不會歸零，年資以實際提繳為準。舊制則要在同一家公司做滿年資才領得到。法律也替勞退基金的收益設了下限：運用收益不得低於兩年期定存利率，不足的部分由國庫補足，{period} 公告的最低保證收益率是年利率 {g}。',
    'income.s5.p2':
      '每一層的參數每年都可能動，像是費率、分級表、月投保金額。下面的試算工具用 {year} 年現行規定。輸入你的年資與投保薪資，可以看到勞保與勞退兩層各領多少，還有提前或延後請領差多少。',
    'income.s5.rr.h': '為什麼這裡沒有所得替代率比較圖',
    'income.s5.rr.p1':
      '很多人想看一張各制度所得替代率的比較圖，這頁沒有畫。官方給的數字口徑不同：勞保與國保是公式，公教是法條訂的替代率上限，軍人是俸率，勞退新制看個人專戶累積多少。把它們畫成同一張長條圖，會讓人以為可以直接相比。經濟合作暨發展組織（OECD）的年金報告也沒有列出台灣。',
    'income.s5.rr.p2':
      '有官方出處的實際數字有兩個，第一個來自勞保局統計：{asOf} 年底在領勞保老年年金的有 {cases} 件，平均每月領 {avg}。這群人的平均投保薪資是 {wage}，平均投保年資 {yrs} 年。這只是勞保一層，不含勞退。第二個是勞退新制基金的逐年收益率，見下圖。',
    'income.s5.chart.title':
      '勞退新制基金 {n} 年裡有 {neg}年是負的，最近三年每年都超過 {floor}%',
    'income.s5.chart.sub':
      '單位 %。這是基金整體的年度收益率，個人專戶另有保證收益。各年 12 月的累計收益率，也就是全年收益率。{py} 年只到 {pm}（{pv}%），未滿一年，不放進圖裡。',
    'income.s5.chart.src':
      '勞動基金運用局「新制勞工退休金基金歷年收益率」，資料截至 {asOf}',
    'income.s5.chart.value': '年度收益率',
    'income.s5.note':
      '過去的收益率不代表未來。勞動部的勞工個人退休金試算表預設用基金成立以來的平均 {d}（{asOf} 版）。',

    // ── S6 ──
    'income.s6.kicker': '保費、給付與撥補',
    'income.s6.h2': '勞保從 {year} 年起，保費收入低於給付支出',
    'income.s6.lede':
      '勞保的普通事故保費收入在 {year} 年第一次低於給付支出，之後有資料的每一年都是。{last} 年收進 {prem}，付出 {ben}。同一段時間基金沒有變小：加上投資收益與政府撥補，{fy} 年底的基金運用規模是 {fund}。',
    'income.s6.chart1.title':
      '{year} 年起保費收入低於給付支出，{last} 年差 {gap}',
    'income.s6.chart1.sub':
      '單位億元。保費收入是普通事故保險費。給付合計含一次給付、差額金與年金給付，其中傷病給付含 COVID-19 給付。',
    'income.s6.series.premium': '保費收入',
    'income.s6.series.benefit': '給付支出',
    'income.s6.chart1.gap': '差距',
    'income.s6.chart1.src':
      '勞保局 113 年度勞工保險普通事故保險費率精算報告表 2-1、2-2（{y0} 至 {y1} 年）',
    'income.s6.note1':
      '{nulls} 年圖上留空：這些年份的官方統計原文尚未取得，媒體引用的決算數字本頁不採用。',
    'income.s6.p1':
      '基金運用規模從 {y0} 年底的 {v0}增加到 {y1} 年底的 {v1}，{y1} 年的運用收益率是 {ret}。政府從 {s0} 年起每年編預算撥補，到 {s1} 年已編列累計 {cum}。同一段時間，精算報告裡的「未提存精算負債」從 {u0}（基準日 {b0}）增加到 {u1}（基準日 {b1}）。基金餘額在增加，制度承諾未來要付的金額也在增加。',
    'income.s6.tbl.h': '{n} 次精算報告對照',
    'income.s6.tbl.item': '項目',
    'income.s6.tbl.report': '{roc} 年度報告',
    'income.s6.tbl.row.base': '精算基準日',
    'income.s6.tbl.row.al': '精算負債',
    'income.s6.tbl.row.fund': '勞保基金結餘',
    'income.s6.tbl.row.ual': '未提存精算負債',
    'income.s6.tbl.row.deficit': '保費收入不足支出年度',
    'income.s6.tbl.row.negative': '基金累積餘額出現負值年度',
    'income.s6.tbl.row.exhaust': '不計入未來撥補時的基金用罄年度',
    'income.s6.tbl.row.balancedAmortized': '攤提過去未提存負債之平衡費率',
    'income.s6.tbl.row.balancedUnamortized': '不攤提過去未提存負債之平衡費率',
    'income.s6.tbl.row.discount': '折現率',
    'income.s6.tbl.note':
      '列名照精算報告摘要表的用語，只有「不計入未來撥補時的基金用罄年度」一列取自報告的註。107 年度的兩個平衡費率取自 110 年度報告的前次精算對照欄。三次報告的假設不同，折現率就是其中一項，所以金額不能直接跨欄比較。表內的基金結餘是精算報告口徑，跟勞動基金運用局的「基金運用規模」不同。',
    'income.s6.p2':
      '最近一次精算（基準日 {b}）估計的「基金累積餘額出現負值年度」是 {neg}，比前一次報告的 {prevNeg}晚 {d} 年。報告寫明這個年度沒有把未來的政府撥補算進去。報告列了兩個平衡費率：「攤提過去未提存負債之平衡費率」是 {balA}，「不攤提過去未提存負債之平衡費率」是 {balN}，報告把後者稱為「精算收支相等之費率」。{year} 年現行的普通事故費率是 {cur}，依勞保條例 {ny} 年調到 {next}，也就是法定上限。{year} 與 {ny} 年這兩個費率都內含就業保險的 {ei}。',
    'income.s6.chart2.title':
      '政府撥補從 {y0} 年的 {a0}增加到 {y1} 年的 {a1}，累計 {cum}',
    'income.s6.chart2.sub': '單位億元。各年公務預算加特別預算。',
    'income.s6.chart2.now': '當年撥補',
    'income.s6.chart2.cum': '累計 {cum}',
    'income.s6.chart2.src': '勞保局 113 年度精算報告第 8 節，累計為本站加總',
    'income.s6.note2': '{y1} 年是已編列的預算數。',
    'income.s6.note2.pending':
      '{ny} 年的撥補沒有放進圖裡。總統府 {d} 的新聞稿寫，{ny} 年編列 {amt}，{n} 年累計 {cum}，截至該新聞稿發布時立法院尚未通過相關預算。',
    'income.s6.note2.passed':
      '之後 {ny} 年度中央政府總預算在 {date} 三讀，共減列 480 億元（中央社報導）。這筆撥補是否照列，報導沒有寫，{checked} 查勞動部與勞保局的頁面也沒有查到。',
    'income.s6.p3':
      '{date} 公布的勞保條例修正，把兩件事寫進法律。第 66 條規定政府每年編列預算撥補。第 69 條第一句是：「{a69}」同條並規定中央主管機關至少每三年檢討一次保險財務。這次修正沒有改動給付公式、請領年齡、費率與負擔比例。',
    'income.s6.p4':
      '勞保的給付與費率要不要改，截至 {asOf} 沒有公開的時程。勞動部長在 {d} 的記者會表示，目前沒有研議制度改革或調降給付的規劃（自由時報報導，轉述）。',
    'income.s6.tos7': '各方怎麼看這些數字，下一區並列。',

    // ── S7 ──
    'income.s7.kicker': '同一件事，各自的說法',
    'income.s7.h2': '年金怎麼改，各方怎麼說',
    'income.s7.lede':
      '這一區把同一件事的各方說法放在一起：勞工團體、資方團體、軍公教團體、青年與學者、政府機關、政黨。放進引號的句子，都回到來源網頁逐字比對過。標「轉述」的是報導裡的間接敘述。本站不替任何一方下結論，引號裡的評價用語屬於說話的人。',
    'income.s7.tl.h': '先看發生了什麼',
    'income.s7.tl.earlier': '{y0} 到 {y1} 年的經過（{n} 筆）',
    'income.s7.tl.fallback.promulgated': '公務人員退休資遣撫卹法公布',
    'income.s7.tl.fallback.effective': '多數條文施行',
    'income.s7.tl.fallback.third':
      '立法院三讀通過停止調降所得替代率上限的修正條文',
    'income.s7.tl.fallback.amended': '修正條文公布',
    'income.s7.tl.fallback.status':
      '行政院、考試院與民進黨立法院黨團已向憲法法庭聲請釋憲。截至 {date}，憲法法庭公布的判決與新聞稿裡沒有這件聲請的判決或暫時處分。',
    'income.s7.tl.court':
      '截至 {date}，憲法法庭公布的判決與新聞稿裡沒有這件聲請的判決或暫時處分。',
    'income.s7.tl.court.report': '中央社 {rd} 的報導寫，結果尚未出爐。',
    'income.s7.chart.title':
      '任職 {y} 年的替代率上限：原訂 {fy} 年降到 {rf}，修法後停在 {rz}',
    'income.s7.chart.sub':
      '單位 %。法條附表三訂的任職 {y} 年退休所得替代率上限。這是上限，跟實際領到的比率不同。各日曆年的數值由本站依附表三的期間整理。',
    'income.s7.series.original': '{ly} 年原訂時程',
    'income.s7.series.after': '{d} 公布的修法後',
    'income.s7.chart.src':
      '全國法規資料庫《公務人員退休資遣撫卹法》第 37 條與附表三，讀取日 {asOf}',
    'income.s7.chart.note':
      '第一期從 {from} 到 {to}，所以 {ya} 與 {yb} 年是同一個值。修法後那條線畫的是適用的上限，已退休人員各自怎麼重新審定，不在這張圖的範圍。',
    'income.s7.p1':
      '{prom} 公布的《公務人員退休資遣撫卹法》訂了一張十年時程表。任職 {y35} 年的退休所得替代率上限從 {r0} 開始，每年降 {step} 個百分點，到 {fy} 年降到 {rf}。這張表從 {eff} 起施行。',
    'income.s7.p2':
      '{third} 立法院三讀、{prom} 總統公布的修正條文規定，不論修法前後退休，一律用 {fzy} 年的上限認定，之後逐年下降的部分不再適用。也就是任職 {y35} 年停在 {rz}，{y15} 年停在 {rz15}。行政院與考試院已向憲法法庭聲請釋憲與暫時處分。民進黨立法院黨團也提出聲請。',
    'income.s7.p2b':
      '修法公布後，銓敘部說要重新審定近 {n} 萬名已退休公務人員的退休所得替代率，審定完成前暫時照原規定發放，差額之後補發（中央社 {d1} 報導，轉述）。聯合報 {d2} 報導，政府已補發差額。行政院同日表示，修法如果被判違憲，已補發的差額是否追回，要等憲法法庭作成判決後由相關機關依判決辦理（報導轉述）。',
    'income.s7.p3':
      '更早的一次憲法審查在 {d} 有了結果。釋字第 782 號解釋認定 {ly} 年的調降規定「無涉法律不溯及既往原則，與信賴保護原則、比例原則尚無違背」，同時要求相關機關在第一次定期檢討時採行適當調整措施。同一號解釋也宣告同法第 77 條第 1 項第 3 款違憲。這一款規定，退休人員再任私立學校職務、每月薪酬總額超過法定基本工資就停發月退休金，解釋文認定它「與憲法保障平等權之意旨有違，應自本解釋公布之日起，失其效力」。',
    'income.s7.nostances': '各方說法暫時沒有資料，這裡先放事實時間線與圖。',
    'income.s7.group.labor': '勞工團體',
    'income.s7.group.business': '資方團體',
    'income.s7.group.civil-servants': '軍公教團體',
    'income.s7.group.youth-scholars': '青年與學者',
    'income.s7.group.government': '政府機關',
    'income.s7.group.party': '政黨',
    'income.s7.tag.paraphrase': '轉述',
    'income.s7.tag.translated': '',
    'income.s7.quote': '「{q}」',
    'income.s7.gaps.k': '沒有找到的聲音：',
    'income.s7.more': '{title}（{n} 則說法）',
    'income.s7.note':
      '同一議題的卡片依固定順序排列：勞工團體、資方團體、軍公教團體、青年與學者、政府機關、政黨。順序不代表輕重。引句的核對日是 {asOf}，每張卡片都連到來源。',

    // ── S8 ──
    'income.s8.kicker': '日曆上已經圈好的幾天',
    'income.s8.h2': '接下來會變的事',
    'income.s8.lede':
      '{y0} 年，台灣每 {p0} 個 15 到 64 歲的人對 1 位 65 歲以上的長者。國發會 {pub} 發布的人口推估只公布 {n} 個年份，這個數字 {y1} 年是 {p1}，{ya} 年是 {pa}，{yb} 年是 {pb}。繳保費與繳稅的人變少，領年金的人變多，前面勞保財務與稅收的幾張圖都會受影響。',
    'income.s8.chart.title':
      '{y0} 年每 {p0} 個工作年齡人口對 1 位長者，{y1} 年是 {p1} 個，{yb} 年是 {pb} 個',
    'income.s8.chart.sub':
      '單位 %。扶老比是每百名 15 到 64 歲人口對應的 65 歲以上人數，圖上寫成 %。標題的潛在支持比是它的倒數。',
    'income.s8.series.share65': '65 歲以上占總人口',
    'income.s8.series.oadr': '扶老比',
    'income.s8.chart.src':
      '國家發展委員會《中華民國人口推估（{y0}年至{yl}年）》，{pub} 發布',
    'income.s8.chart.note':
      '官方新聞稿只列 {n} 個年份，點與點之間的連線是輔助閱讀，本站沒有內插。65 歲以上人口占比 {y0} 年是 {s0}，{yl} 年是 {sl}。',
    'income.s8.cal.h': '每年固定會變的日子',
    'income.s8.cal.nextk': '已公告的下一個數字',
    'income.s8.cal.jan.when': '1 月 1 日',
    'income.s8.cal.jan.what':
      '勞保費率、投保薪資分級表與最低工資都在這一天生效。勞保普通事故費率依勞保條例每兩年調高 {step} 個百分點，上限是 {cap}。{capYear} 年到上限以後，這個機制不再往上調。',
    'income.s8.cal.jan.next':
      '{ny} 年 1 月 1 日起，普通事故費率由 {cur} 調為 {next}（勞保局 {ann} 公告）。{mwy} 年最低工資月薪 {m}、時薪 {h}（{pub} 發布）。{ny} 年的投保薪資分級表截至 {asOf} 尚未公告。',
    'income.s8.cal.may.when': '5 月',
    'income.s8.cal.may.what': '綜合所得稅結算申報，報的是前一年的所得。',
    'income.s8.cal.may.next':
      '{fyear} 年 5 月申報的是 {fy} 年度（{ce} 年）所得：每人免稅額 {ex}，單身標準扣除額 {sd}，薪資所得特別扣除額上限 {sal}。',
    'income.s8.cal.sep.when': '9 月前後',
    'income.s8.cal.sep.what':
      '最低工資審議會開會，決定下一年的月薪與時薪，再報行政院核定。《最低工資法》從 {eff} 起施行。',
    'income.s8.cal.sep.next':
      '{d} 的審議會決議：月薪由 {pm}調為 {m}，調幅 {inc}%。{after} 年的數字要等下一次審議。',
    'income.s8.cal.nov.when': '11 月底',
    'income.s8.cal.nov.what':
      '財政部公告下一年度的免稅額、扣除額與課稅級距。消費者物價指數比上次調整累計上漲達 {th} 以上才會調。',
    'income.s8.cal.nov.next':
      '上一次公告在 {ann}，適用 {fy} 年度（{ce} 年）。{nfy} 年度的金額截至 {asOf} 尚未公告。',
    'income.s8.cal.dec.when': '12 月底前',
    'income.s8.cal.dec.what':
      '財政部公告每人基本生活所需費用。報稅時，全戶基本生活所需費用總額高於免稅額與扣除額合計的部分可以再減除，合計時不算薪資所得特別扣除額與財產交易損失。',
    'income.s8.cal.dec.pending':
      '{fy} 年度（{ce} 年）的金額截至 {asOf} 尚未公告。',
    'income.s8.cal.dec.done': '{fy} 年度（{ce} 年）每人 {v}。',
    'income.s8.cal.tri.when': '每三年一次',
    'income.s8.cal.tri.what':
      '勞保財務精算。{date} 公布的勞保條例第 69 條規定，至少每三年檢討一次保險財務。',
    'income.s8.cal.tri.next':
      '最近一次的精算基準日是 {b}，{pub} 公布。下一次的公布日期沒有官方公告。',
    'income.s8.p1':
      '這張行事曆上有些事有固定的機制，像是免稅額跟著物價調、最低工資每年審議、勞保費率的上限與政府撥補寫在法律裡。有些事還沒有日期。勞保的給付與費率要不要改，沒有公開時程。公教年金的修法已有行政院、考試院與民進黨立法院黨團聲請釋憲，截至 {court}，憲法法庭公布的判決裡沒有這一件。',
    'income.s8.p2':
      '四個工具各花一分鐘：每月實領多少、落在哪個位置、明年 5 月繳多少稅、退休後兩層各領多少。算完再回來看這張行事曆，就知道哪幾天跟自己有關。',
    'income.s8.act.k': '自己算一次',
    'income.s8.act.takehome': '實領薪資',
    'income.s8.act.percentile': '薪資位置',
    'income.s8.act.tax': '所得稅',
    'income.s8.act.pension': '勞保與勞退',
    'income.s8.cross.lead': '退休後的照顧與住的問題，在另外兩個專題：',
    'income.s8.cross.health': '醫療',
    'income.s8.cross.housing': '居住',
  },
};
