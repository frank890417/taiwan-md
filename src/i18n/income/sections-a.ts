/**
 * income 專題主頁第 0 到第 4 區文案（zh-TW／en）。
 *
 * 文案裡的數字一律用 {占位符}，由各區元件從 src/data/income/*.json 帶入或現場計算，
 * 這裡不寫死任何金額、比率與年度。共用字放 income.common.*。
 */
export const sectionsA = {
  en: {
    // ── common ──
    'income.common.source': 'Source: ',
    'income.common.datatable': 'Data table',
    'income.common.table.item': 'Item',
    'income.common.table.value': 'Value',
    'income.common.table.rate': 'Rate',
    'income.common.table.year': 'Year',
    'income.common.above': 'Over {v}',
    'income.common.srclink': 'Source',
    'income.common.related': 'Related articles',
    'income.common.nodata': 'No data',
    'income.common.fy': '{ce} (ROC {fy})',

    // ── s0 ──
    'income.s0.kicker': 'Split before it lands',
    'income.s0.h2': 'How many ways is one paycheck split?',
    'income.s0.lede':
      'Take the {wyear} average regular monthly wage of {wage} as an example. At {year} rates, Labor Insurance（勞保）takes {li} and Employment Insurance（就業保險）takes {ei} before the money arrives. National Health Insurance and income tax come on top. In the same month your employer pays another {er} on your behalf, an amount that usually does not appear on the payslip.',
    'income.s0.p1':
      'The Labor Insurance ordinary-risk premium rate is {liRate} and the Employment Insurance rate is {eiRate}. For both, the worker pays {w}, the employer {e} and the government {g}. Occupational accident insurance is paid entirely by the employer, at an all-industry average rate of {occ}. For the labor pension（勞退）, the employer must contribute at least {pen} of wages every month into an individual account in your name, and the account follows you when you change jobs.',
    'income.s0.p2':
      'Premiums are charged on an insured salary grade, not on your exact pay. The top Labor Insurance grade is {cap}. If you earn more than that, your premium stops there, and so does the salary used to work out your future pension. You may add up to {self} of your own to the labor pension, and that money is not counted as salary income for the year. Enter your own monthly pay in the tool above to see every line, including the full cost your employer carries.',
    'income.s0.note':
      'Rates and grade tables are the versions in force from {effective}. Employment Insurance is shared in the same proportions as Labor Insurance. Occupational accident rates differ by industry and the table uses the average. The employer figure in the example leaves out National Health Insurance.',
    'income.s0.tbl.caption': 'Who pays what on one paycheck ({year})',
    'income.s0.tbl.col.item': 'Item',
    'income.s0.tbl.col.rate': 'Rate',
    'income.s0.tbl.col.worker': 'Worker',
    'income.s0.tbl.col.employer': 'Employer',
    'income.s0.tbl.col.gov': 'Government',
    'income.s0.tbl.row.li': 'Labor Insurance (ordinary risk)',
    'income.s0.tbl.row.ei': 'Employment Insurance',
    'income.s0.tbl.row.occ': 'Occupational accident insurance',
    'income.s0.tbl.row.pen': 'Labor pension',
    'income.s0.tbl.row.nhi': 'National Health Insurance',
    'income.s0.tbl.none': 'Pays nothing',
    'income.s0.tbl.occRate': 'Industry average {rate}',
    'income.s0.tbl.penRate': 'Share of monthly contribution wage',
    'income.s0.tbl.penWorker': 'Voluntary, up to {max}',
    'income.s0.tbl.penEmployer': 'At least {min}',
    'income.s0.tbl.nhi':
      'How NHI premiums work is covered in the health topic.',
    'income.s0.tbl.nhiLink': 'Open the health topic',
    'income.s0.src.li': 'Bureau of Labor Insurance premium share table',
    'income.s0.src.occ': 'Ministry of Labor occupational accident rate notice',
    'income.s0.src.pen': 'Labor pension monthly contribution grade table',

    // ── s1 ──
    'income.s1.kicker': 'What the person in the middle earns',
    'income.s1.h2':
      'Median annual pay for employees was {median} in {year}. Where are you?',
    'income.s1.lede':
      'Line up every employee in Taiwan by total annual pay in {year}, and the person in the exact middle earned {median}. The mean was {mean}, which is {gap} above the median, because the high end stretches a long way. The top tenth starts at {d9}. The bottom tenth earned less than {d1}.',
    'income.s1.chart1.title':
      'Median annual pay is {median}, and the top tenth earns more than {d9}',
    'income.s1.chart1.sub':
      'The nine decile cut-offs of total annual pay for all employees, {year}, before tax. Each block holds one tenth of employees. A narrower, darker block means people are packed more closely. The dashed ends are the bottom and top tenths, for which no boundary is published.',
    'income.s1.chart1.unit': 'Unit: NT$ thousand',
    'income.s1.marker.median': 'Median {v}',
    'income.s1.marker.mean': 'Mean {v}',
    'income.s1.chart.source':
      'DGBAS, median and distribution of total annual earnings of employees in industry and services (ROC year {roc}), released {pub}',
    'income.s1.p1':
      'This median counts migrant workers and part-time employees. For full-time employees who are Taiwanese nationals alone, the median is {dft}, which is {diff} higher. The statistics office notes that most people earning less than the first decile of {d1} are migrant workers and part-timers. A Taiwanese full-time worker who compares against the all-employee figures will rank a little higher than among true peers. The tool below lets you choose either basis.',
    'income.s1.chart2.title':
      'The {peak} age group has the highest median, at {peakv}',
    'income.s1.chart2.sub':
      'Median total annual pay by age group, all employees, {year}, before tax',
    'income.s1.p2':
      "The median is {m} for men and {f} for women. The difference is {sexdiff}, and the women's median is about {ratio} of the men's. This is one median subtracted from the other, with no adjustment for industry, seniority or hours. By age, the {peak} group has the highest median at {peakv}. For the {oldlabel} group it falls to {old}, and the statistics office explains that this group includes people who went back to work after retiring.",
    'income.s1.industry.summary': 'Median annual pay by industry ({year})',
    'income.s1.industry.col.name': 'Industry',
    'income.s1.industry.col.median': 'Median',
    'income.s1.note':
      'The survey covers employees in industry and services. It leaves out civil servants, school teachers and staff, agriculture, forestry, fishing and animal husbandry, and the self-employed. Amounts are total annual pay before tax, including year-end and other bonuses. Data are for {year}, released {pub}. This page will be updated when the next edition comes out.',

    // ── s2 ──
    'income.s2.kicker': 'Bigger numbers, same groceries',
    'income.s2.h2':
      'From {y0} to {y1}, regular wages rose {nom} on paper and {real} after prices',
    'income.s2.lede':
      'In {y0} the average regular monthly wage of employees in industry and services was {w0}. In {y1} it was {w1}, a nominal rise of {nom}. Consumer prices rose {cpi} over the same years. After prices, a regular wage in {y1} bought {real} more than it did in {y0}.',
    'income.s2.chart1.title':
      'Real GDP in {y1} was {gdp} times its {y0} level. The real regular wage was {wage} times.',
    'income.s2.chart1.sub':
      'Index, {y0} = 100%. Both lines are calculated by this site from DGBAS data. Real GDP chains the annual real growth rates. The real regular wage divides the nominal regular wage by the consumer price index.',
    'income.s2.series.gdp': 'Real GDP',
    'income.s2.series.wage': 'Real regular wage',
    'income.s2.chart1.source':
      'DGBAS national income statistics, earnings and productivity statistics, and consumer price index, data to {asOf}',
    'income.s2.p1':
      'The real wage line runs downhill for a stretch. In {minY}, after the global financial crisis, the index fell to {minV}, below where it stood in {y0}. It did not climb back above the {y0} level until {backY}. For several years in between, a regular wage bought less than it had at the start of the century.',
    'income.s2.p2':
      'Read the gap between the two lines with care. Part of GDP growth comes from more people working, and part of it turns into company depreciation and profits, so the gap is not simply pay that each worker missed. To see whether your own pay kept up, compare it with {cpi}. If your pay rose by less than that between {y0} and {y1}, your purchasing power went backwards.',
    'income.s2.chart2.title':
      'Compensation of employees as a share of GDP: {c0} in {cy0}, {c1} in {cy1}',
    'income.s2.chart2.sub':
      'Compensation of employees as a share of GDP. Up to {sumTo}, only the National Income Statistics summary edition is available. From {annFrom}, the newer annual report edition is used. The two editions differ in precision. No data for {missing}.',
    'income.s2.series.summary': 'Summary edition',
    'income.s2.series.annual': 'Annual report edition',
    'income.s2.chart2.source':
      'DGBAS National Income Statistics summary and annual report, data to {asOf}',
    'income.s2.p3':
      'Another common measure is compensation of employees as a share of GDP, meaning how much of everything the economy produces goes to employees as pay and benefits. It was {c0} in {cy0} and {c1} in {cy1}. The {y1} wage figures are still preliminary, and the wage survey widened its industry coverage once along the way, so neighbouring years are not fully comparable.',
    'income.s2.explain.h': 'Why has pay grown slowly? {n} explanations',
    'income.s2.explain.intro':
      'Each explanation below has its own source and looks at a different layer of the problem. This site lists them side by side, in no ranked order, and does not rule on which is right.',
    'income.s2.explain.by': '{who}, {year}',
    'income.s2.explain.unverified': 'Secondhand source',
    'income.s2.note':
      "Wages are average regular monthly earnings of all employees in industry and services, including migrant and part-time workers. No official real wage series on a single base year exists for {y0} to {y1}. The real index on the chart is this site's calculation, not an official figure.",
    'income.s2.src.wage': 'DGBAS wage series',
    'income.s2.src.gdp': 'DGBAS national income series',

    // ── s3 ──
    'income.s3.kicker': 'A floor that stood still',
    'income.s3.h2':
      'The minimum wage restarted in {to} and reaches {m} in {ny}',
    'income.s3.lede':
      'The minimum wage is the legal floor under pay. From {eff}, monthly pay may not be lower than {m} and hourly pay may not be lower than {h}. That is {pct} above the {cy} levels of {pm} and {ph}. The Minimum Wage Deliberation Committee set the amount on {council} and it was published on {pub}.',
    'income.s3.chart.title':
      'Stuck at {frozen} from {from} to {to}, reaching {m} in {ny}',
    'income.s3.chart.sub':
      'Monthly minimum wage in force at the start of each year, in NT$ (called the basic wage before {lawY}). Mid-year changes show up in the following year.',
    'income.s3.chart.era': '{from}–{to}: no change',
    'income.s3.chart.law': 'Minimum Wage Act in force',
    'income.s3.chart.end': '{y}: {v}',
    'income.s3.chart.unit': 'NT$',
    'income.s3.chart.source':
      'Ministry of Labor, minimum wage and basic wage adjustments by year, updated to {asOf}',
    'income.s3.tbl.year': 'Year',
    'income.s3.tbl.monthly': 'Monthly (NT$)',
    'income.s3.tbl.hourly': 'Hourly (NT$)',
    'income.s3.p1':
      'This floor once stood still for a long time. After it was set at {frozen} on {fromDate}, the next change came on {toDate}, more than {gap} years later. Several uneven adjustments followed. Since {streakY} it has gone up at the start of every year, {streak} years in a row counting {ny}. The monthly floor was {m0} in {y0} and will be {m} in {ny}, a nominal rise of {tot}.',
    'income.s3.p2':
      'The Minimum Wage Act（最低工資法）took effect on {lawDate}. The basic wage was renamed the minimum wage, and the yearly review gained a legal footing. The law says the review must take the annual change in the consumer price index into account, and may also consider labor productivity, average wages, economic growth and household income and spending. If you are paid by the hour or near the floor, check your payslip. In {cy} the floor is {pm} a month and {ph} an hour, and the new amounts apply from {eff}. Labor, employers and scholars disagree on how large each increase should be.',
    'income.s3.tos7': 'Their positions are set side by side further down.',
    'income.s3.note':
      "The series uses the amount in force at the start of each year, compiled from the adjustments published by the Ministry of Labor. The publication and effective dates for {ny} come from the ministry's adjustment history page. The page does not list a separate date for the Executive Yuan's approval.",

    // ── s4 ──
    'income.s4.kicker': 'Subtract first, then multiply',
    'income.s4.h2': 'How income tax is worked out: subtract, then multiply',
    'income.s4.lede':
      'Individual income tax（綜合所得稅）is worked out by subtracting first and multiplying second. Exemptions and deductions come off your income for the year. What is left is net taxable income, and the rate for each bracket is applied to that. For tax year {fy}, filed in {file}, a single employee takes off {sum} from just three items: the personal exemption of {ex}, the standard deduction of {std} and the special deduction for salary income of {sal}.',
    'income.s4.chart1.title':
      'Tax year {fy} has {n} rates: {r1} on net income up to {b1}, and {rN} on the part above {bN}',
    'income.s4.chart1.sub':
      'The horizontal axis is net taxable income. The vertical axis is the rate on that slice. Each rate applies only to the slice above its threshold, never to the whole income. The top bracket has no upper limit.',
    'income.s4.chart1.unit': 'Net taxable income (NT$ million)',
    'income.s4.chart1.source':
      'Executive Yuan Gazette, notice of exemptions, deductions and tax brackets for tax year {fy}, announced {ann}',
    'income.s4.tbl.caption': 'Main subtractions: tax years {fyA} and {fyB}',
    'income.s4.tbl.col.item': 'Item',
    'income.s4.tbl.col.fy': 'Tax year {fy}, filed {file}',
    'income.s4.tbl.pending': 'Not yet announced by the Ministry of Finance',
    'income.s4.tbl.notyet': 'Not yet in force',
    'income.s4.tbl.row.exemption': 'Personal exemption (per person)',
    'income.s4.tbl.row.minor': 'Exemption for a minor child',
    'income.s4.tbl.row.standard': 'Standard deduction (single)',
    'income.s4.tbl.row.salary': 'Special deduction for salary income (cap)',
    'income.s4.tbl.row.living': 'Basic living expense (per person)',
    'income.s4.tbl.row.bracket1': 'Top of the {r} bracket',
    'income.s4.p1':
      'The order of subtraction decides whether many people owe any tax at all. For tax year {fyB}, because cumulative inflation reached the legal threshold for adjustment, the Ministry of Finance announced higher amounts on {ann}. The personal exemption rose from {exA} to {exB}, the standard deduction from {stdA} to {stdB}, and the special deduction for salary income from {salA} to {salB}. The top of the lowest bracket moved from {bA} to {bB}.',
    'income.s4.p1b':
      'From tax year {fyB}, the exemption for a dependent minor child is {minorPct} higher, at {minor} per child. The basic living expense per person was {living} for tax year {fyA}. The Ministry of Finance has not yet announced the amount for tax year {fyB}, and this page and the calculator will be updated when it does.',
    'income.s4.cat.individualIncomeTax': 'Individual income tax',
    'income.s4.cat.corporateIncomeTax': 'Corporate income tax',
    'income.s4.cat.businessTax': 'Business tax',
    'income.s4.cat.securitiesTransactionTax': 'Securities transaction tax',
    'income.s4.cat.commodityTax': 'Commodity tax',
    'income.s4.cat.landTaxSubtotal': 'Land taxes',
    'income.s4.cat.customs': 'Customs duties',
    'income.s4.cat.other': 'Other (site calculation)',
    'income.s4.chart2.title':
      'Individual and corporate income tax made up {inc} of tax revenue in {y1}, up from {inc0} in {y0}',
    'income.s4.chart2.sub':
      "National tax revenue, net actual collection by calendar year, in NT$100 million. “Other” is this site's calculation: the total minus the taxes shown. It includes house tax, tobacco and alcohol tax, estate and gift tax and futures transaction tax, among others.",
    'income.s4.chart2.share': 'Share',
    'income.s4.chart2.source':
      'Ministry of Finance statistics database, national net tax collection by calendar year and by tax, data to {asOf}',
    'income.s4.chart3.title':
      'In tax year {fy}, {zero} of filing households had zero net taxable income and {top} were in the top bracket',
    'income.s4.chart3.sub':
      "Share of individual income tax filing households in each net-income bracket, assessed data for tax year {fy}. The shares are this site's calculation, dividing households in each bracket by the total. They are not official ratios.",
    'income.s4.chart3.top': '{amt} and above ({rate} bracket)',
    'income.s4.chart3.source':
      'Fiscal Information Agency, Ministry of Finance, statistics on assessed individual income tax returns for tax year {fy}',
    'income.s4.p2':
      'Who pays this tax? In the assessed data for tax year {fy}, {zero} of filing households had zero net taxable income after subtractions. Households in the top bracket were {top} of the total and accounted for {topTax} of tax payable. Among all types of income, salaries made up {sal} and dividends {div}. For dividends, a household may add them to total income and take a credit of {credit}, capped at {cap} per household, or have them taxed separately at {sep}.',
    'income.s4.p3':
      'On the revenue side, individual income tax was {iit} of national tax revenue in {y1}. Corporate income tax was {cit} and business tax {biz}. These are amounts actually collected during the calendar year. For how the money is shared among ministries once it reaches the treasury,',
    'income.s4.tobudget': 'see the central government budget topic.',
    'income.s4.note':
      "The agency notes that these statistics exclude separately taxed, exempt and non-taxable income and should not be used to compare wealth gaps. Tax revenue here is the amount collected in a calendar year, a different basis from the net revenue by tax year that the Ministry of Finance also publishes. The National Taxation Bureau's assessment is final for any individual case.",
    'income.s4.src.gazette': 'Executive Yuan Gazette notice',
    'income.s4.src.revenue': 'Ministry of Finance revenue statistics',
    'income.s4.src.filers': 'Assessed returns statistics',
  } as Record<string, string>,

  'zh-TW': {
    // ── common ──
    'income.common.source': '來源：',
    'income.common.datatable': '資料表',
    'income.common.table.item': '項目',
    'income.common.table.value': '數值',
    'income.common.table.rate': '稅率',
    'income.common.table.year': '年',
    'income.common.above': '{v} 以上',
    'income.common.srclink': '資料來源',
    'income.common.related': '相關文章',
    'income.common.nodata': '沒有資料',
    'income.common.fy': '{fy}',

    // ── s0 ──
    'income.s0.kicker': '薪水還沒進帳，先分好了',
    'income.s0.h2': '一份薪水會被分成幾份？',
    'income.s0.lede':
      '拿 {wyear} 年的平均經常性薪資 {wage} 當例子。照 {year} 年的費率，這份月薪進帳前，勞保先扣 {li}，就業保險再扣 {ei}，健保費和所得稅另外算。同一個月，雇主還替你付了 {er}，這筆錢通常不會印在薪資單上。',
    'income.s0.p1':
      '勞保普通事故保險的費率是 {liRate}，就業保險是 {eiRate}，兩種都由勞工付 {w}、雇主付 {e}、政府付 {g}。職業災害保險全部由雇主負擔，各行業平均費率 {occ}。勞工退休金由雇主每月至少提繳工資的 {pen}，存進你名下的個人專戶，換工作也跟著你走。',
    'income.s0.p2':
      '保費是用投保薪資的級距算的，跟實際月薪會有落差。勞保投保薪資最高一級是 {cap}，月薪超過這一級的人，保費就停在這裡，將來算年金也用這個上限。勞退可以自己再提繳最多 {self}，自提的錢不算進當年的薪資所得。把自己的月薪填進上面的工具，可以看到每一筆的金額，還有雇主為你付出的總成本。',
    'income.s0.note':
      '費率與分級表是 {effective} 起適用的版本。就業保險的負擔比例與勞保相同。職災費率各行業不同，表上用的是平均值。例子裡的雇主負擔沒有算健保費。',
    'income.s0.tbl.caption': '一份薪水的保費，誰付多少（{year} 年）',
    'income.s0.tbl.col.item': '項目',
    'income.s0.tbl.col.rate': '費率',
    'income.s0.tbl.col.worker': '勞工',
    'income.s0.tbl.col.employer': '雇主',
    'income.s0.tbl.col.gov': '政府',
    'income.s0.tbl.row.li': '勞保（普通事故）',
    'income.s0.tbl.row.ei': '就業保險',
    'income.s0.tbl.row.occ': '職業災害保險',
    'income.s0.tbl.row.pen': '勞工退休金',
    'income.s0.tbl.row.nhi': '全民健保',
    'income.s0.tbl.none': '不負擔',
    'income.s0.tbl.occRate': '行業平均 {rate}',
    'income.s0.tbl.penRate': '按月提繳工資的比率',
    'income.s0.tbl.penWorker': '自願提繳，最多 {max}',
    'income.s0.tbl.penEmployer': '至少 {min}',
    'income.s0.tbl.nhi': '健保費怎麼算放在醫療專題。',
    'income.s0.tbl.nhiLink': '看醫療專題',
    'income.s0.src.li': '勞保局保險費分擔金額表',
    'income.s0.src.occ': '勞動部職災保險費率公告',
    'income.s0.src.pen': '勞退月提繳分級表',

    // ── s1 ──
    'income.s1.kicker': '中間那個人領多少',
    'income.s1.h2': '{year} 年受僱者年薪中位數 {median}，你在哪裡？',
    'income.s1.lede':
      '{year} 年，把台灣受僱員工的全年總薪資從低排到高，站在正中間的人領 {median}。平均數是 {mean}，比中位數多 {gap}，因為高薪那一端拉得很長。最高一成的門檻是 {d9}，最低一成在 {d1}以下。',
    'income.s1.chart1.title': '年薪中位數 {median}，最高一成超過 {d9}',
    'income.s1.chart1.sub':
      '全體受僱員工全年總薪資的九個十分位分界點，{year} 年，稅前。每一格是一成的人，格子越窄、顏色越深，代表人越集中。兩端虛線是最低與最高一成，官方沒有公布邊界。',
    'income.s1.chart1.unit': '單位：萬元',
    'income.s1.marker.median': '中位數 {v}',
    'income.s1.marker.mean': '平均數 {v}',
    'income.s1.chart.source':
      '行政院主計總處《{roc} 年工業及服務業受僱員工全年總薪資中位數及分布統計結果》，{pub} 發布',
    'income.s1.p1':
      '這個中位數把外籍移工和部分工時員工都算在裡面。只看本國籍的全時員工，中位數是 {dft}，高出 {diff}。主計總處在統計結果裡註明，年薪低於第 1 十分位數 {d1}的人，多數是外籍移工與部分工時員工。本國籍全職的人拿全體的數字來比，排名會比在同類裡好看一些。下面的工具兩種口徑都可以選。',
    'income.s1.chart2.title': '{peak}的年薪中位數最高，有 {peakv}',
    'income.s1.chart2.sub':
      '各年齡組全年總薪資中位數，全體受僱員工，{year} 年，稅前',
    'income.s1.p2':
      '男性的中位數是 {m}，女性是 {f}，相差 {sexdiff}，女性約是男性的 {ratio}。這是兩個中位數直接相減，沒有控制行業、年資與工時。年齡上，{peak}的中位數最高，有 {peakv}。{oldlabel}降到 {old}，主計總處的說明是這一組包含退休後再就業的人。',
    'income.s1.industry.summary': '行業大類的年薪中位數（{year} 年）',
    'income.s1.industry.col.name': '行業',
    'income.s1.industry.col.median': '中位數',
    'income.s1.note':
      '統計對象是工業及服務業的受僱員工，不含公務員、學校教職員、農林漁牧業與自營作業者。金額是稅前的全年總薪資，含年終與獎金。資料年度 {year} 年，{pub} 發布，下一版發布後本頁會更新。',

    // ── s2 ──
    'income.s2.kicker': '數字在長，日子呢',
    'income.s2.h2':
      '{y0} 到 {y1} 年，經常性薪資名目上漲 {nom}，扣掉物價後多 {real}',
    'income.s2.lede':
      '{y0} 年，工業及服務業受僱員工平均每月經常性薪資是 {w0}，{y1} 年是 {w1}，名目上漲了 {nom}。同一段時間物價漲了 {cpi}。扣掉物價，{y1} 年的經常性薪資買得到的東西，比 {y0} 年多 {real}。',
    'income.s2.chart1.title':
      '{y1} 年實質 GDP 是 {y0} 年的 {gdp} 倍，實質經常性薪資是 {wage} 倍',
    'income.s2.chart1.sub':
      '指數，{y0} 年＝100%。兩條線都是本站依主計總處資料計算。實質 GDP 以各年實質成長率連乘，實質經常性薪資以名目經常性薪資除以消費者物價指數。',
    'income.s2.series.gdp': '實質 GDP',
    'income.s2.series.wage': '實質經常性薪資',
    'income.s2.chart1.source':
      '行政院主計總處國民所得統計、薪資及生產力統計、消費者物價指數，資料至 {asOf}',
    'income.s2.p1':
      '實質薪資這條線有一段是往下走的。金融海嘯後的 {minY} 年，指數降到 {minV}，比 {y0} 年還低。之後一直到 {backY} 年，才回到 {y0} 年的水準以上。中間有好幾年，經常性薪資買得到的東西比世紀初還少。',
    'income.s2.p2':
      '兩條線的差距要小心讀。GDP 成長有一部分來自就業人數增加，也有一部分成為企業的折舊與盈餘，所以差距不能直接讀成每個人少領的錢。想知道自己的薪水有沒有跟上，可以拿 {cpi} 這個數字來比。{y0} 到 {y1} 年間，你的薪水漲幅低於它，購買力就往後退了。',
    'income.s2.chart2.title':
      '受僱人員報酬占 GDP：{cy0} 年 {c0}，{cy1} 年 {c1}',
    'income.s2.chart2.sub':
      '受僱人員報酬占 GDP 的比率。{sumTo} 年以前只有《國民所得統計摘要》的數字，{annFrom} 年起採較新的《國民所得統計年報》，兩版精度不同。{missing} 年沒有資料。',
    'income.s2.series.summary': '摘要版',
    'income.s2.series.annual': '年報版',
    'income.s2.chart2.source':
      '行政院主計總處《國民所得統計摘要》與《國民所得統計年報》，資料至 {asOf}',
    'income.s2.p3':
      '另一個常用的指標是受僱人員報酬占 GDP 的比率，也就是整個經濟的產出裡，分給受僱者的薪資與福利占多少。{cy0} 年是 {c0}，{cy1} 年是 {c1}。{y1} 年的薪資還是初步值，薪資統計的行業範圍中途也擴大過一次，前後幾年不完全可比。',
    'income.s2.explain.h': '薪水為什麼漲得慢？{n} 種解釋',
    'income.s2.explain.intro':
      '下面幾種說法各有出處，看的層面也不同。本站把它們並列，不排順序，也不判定哪一個對。',
    'income.s2.explain.by': '{who}，{year} 年',
    'income.s2.explain.unverified': '二手來源',
    'income.s2.note':
      '薪資是工業及服務業全體受僱員工的每人每月經常性薪資，含外籍與部分工時員工。官方沒有同一基期的 {y0} 到 {y1} 年連續實質薪資序列，圖上的實質指數是本站計算，不是官方數字。',
    'income.s2.src.wage': '主計總處薪資序列',
    'income.s2.src.gdp': '主計總處國民所得序列',

    // ── s3 ──
    'income.s3.kicker': '地板曾經很久沒動',
    'income.s3.h2': '最低工資從 {to} 年重新起跑，{ny} 年到 {m}',
    'income.s3.lede':
      '最低工資是法律規定的薪水地板。{eff} 起，月薪不得低於 {m}，時薪不得低於 {h}，比 {cy} 年的 {pm} 與 {ph} 高 {pct}。這個金額由最低工資審議會在 {council} 決定，{pub} 發布。',
    'income.s3.chart.title': '{from} 到 {to} 年停在 {frozen}，{ny} 年到 {m}',
    'income.s3.chart.sub':
      '每年年初適用的每月最低工資，單位元（{lawY} 年以前稱基本工資）。年中生效的調整顯示在下一年。',
    'income.s3.chart.era': '{from}–{to} 年沒有調整',
    'income.s3.chart.law': '《最低工資法》施行',
    'income.s3.chart.end': '{y} 年 {v}',
    'income.s3.chart.unit': '元',
    'income.s3.chart.source':
      '勞動部「歷年最低工資／基本工資調整」，更新至 {asOf}',
    'income.s3.tbl.year': '年',
    'income.s3.tbl.monthly': '月薪（元）',
    'income.s3.tbl.hourly': '時薪（元）',
    'income.s3.p1':
      '這塊地板停過很久。{fromDate} 調到 {frozen} 之後，下一次調整是 {toDate}，中間隔了 {gap} 年多。之後又斷斷續續調了幾次。從 {streakY} 年起，每年年初都往上調，算到 {ny} 年是連續 {streak} 年。{y0} 年的月薪地板是 {m0}，{ny} 年是 {m}，名目上多了 {tot}。',
    'income.s3.p2':
      '{lawDate}《最低工資法》施行，基本工資改名最低工資，每年的審議也有了法律依據。法律寫明審議要參採消費者物價指數年增率，另外可以參考勞動生產力、平均薪資、經濟成長與家庭收支等資料。領時薪或月薪接近地板的人，可以拿薪資單對一下。{cy} 年是月薪 {pm}、時薪 {ph}，{eff} 起換成新金額。調幅該多大，勞方、資方與學者的看法不同。',
    'income.s3.tos7': '各方的說法並列在後面的立場區。',
    'income.s3.note':
      '序列取每年年初適用的金額，由勞動部公布的歷次調整整理。{ny} 年金額的發布與生效日期取自勞動部歷年調整頁。行政院核定的日期官方頁面沒有另外列出。',

    // ── s4 ──
    'income.s4.kicker': '先扣，再乘',
    'income.s4.h2': '綜所稅怎麼算：先扣再乘',
    'income.s4.lede':
      '綜合所得稅的算法是先扣再乘，全年所得先減掉免稅額和各種扣除額，剩下的叫所得淨額，再照級距乘上稅率。以 {fy} 年度（{ce} 年的所得，{file}申報）來說，一個單身上班族光是免稅額 {ex}、標準扣除額 {std}、薪資所得特別扣除額 {sal} 三項，就先扣掉 {sum}。',
    'income.s4.chart1.title':
      '{fy} 年度有 {n} 級稅率：淨額 {b1}以下 {r1}，超過 {bN}的部分 {rN}',
    'income.s4.chart1.sub':
      '橫軸是綜合所得淨額，縱軸是那一段適用的稅率。每一級稅率只乘在超過門檻的那一段，整筆所得不會都用最高那一級算。最高一級沒有上限。',
    'income.s4.chart1.unit': '綜合所得淨額（萬元）',
    'income.s4.chart1.source':
      '行政院公報 {fy} 年度綜合所得稅免稅額、扣除額及課稅級距金額公告，{ann} 公告',
    'income.s4.tbl.caption': '主要減項：{fyA} 與 {fyB} 年度',
    'income.s4.tbl.col.item': '項目',
    'income.s4.tbl.col.fy': '{fy} 年度（{file}申報）',
    'income.s4.tbl.pending': '財政部尚未公告',
    'income.s4.tbl.notyet': '尚未施行',
    'income.s4.tbl.row.exemption': '免稅額（每人）',
    'income.s4.tbl.row.minor': '未成年子女免稅額',
    'income.s4.tbl.row.standard': '標準扣除額（單身）',
    'income.s4.tbl.row.salary': '薪資所得特別扣除額（上限）',
    'income.s4.tbl.row.living': '基本生活費（每人）',
    'income.s4.tbl.row.bracket1': '稅率 {r} 的級距上限',
    'income.s4.p1':
      '扣的順序會決定很多人到底要不要繳稅。{fyB} 年度因為物價累計漲幅達到法定調整標準，財政部在 {ann} 公告調高金額。免稅額從 {exA} 調到 {exB}，標準扣除額從 {stdA} 調到 {stdB}，薪資所得特別扣除額從 {salA} 調到 {salB}。最低一級的級距上限也從 {bA} 拉到 {bB}。',
    'income.s4.p1b':
      '{fyB} 年度起，扶養未成年子女的免稅額多 {minorPct}，每人 {minor}。每人基本生活費在 {fyA} 年度是 {living}。{fyB} 年度的金額財政部還沒公告，公告後本頁與試算工具會更新。',
    'income.s4.cat.individualIncomeTax': '綜合所得稅',
    'income.s4.cat.corporateIncomeTax': '營利事業所得稅',
    'income.s4.cat.businessTax': '營業稅',
    'income.s4.cat.securitiesTransactionTax': '證券交易稅',
    'income.s4.cat.commodityTax': '貨物稅',
    'income.s4.cat.landTaxSubtotal': '土地稅',
    'income.s4.cat.customs': '關稅',
    'income.s4.cat.other': '其他（本站計算）',
    'income.s4.chart2.title':
      '{y1} 年綜所稅加營所稅占賦稅收入 {inc}，{y0} 年是 {inc0}',
    'income.s4.chart2.sub':
      '全國賦稅收入實徵淨額，日曆年別，單位億元。「其他」是本站以總計減去圖上各稅目算出，包含房屋稅、菸酒稅、遺產及贈與稅、期貨交易稅等。',
    'income.s4.chart2.share': '占比',
    'income.s4.chart2.source':
      '財政部統計資料庫「全國實徵淨額日曆年別－按稅目別分」，資料至 {asOf}',
    'income.s4.chart3.title':
      '{fy} 年度 {zero} 的申報戶所得淨額是 0，適用最高稅率的占 {top}',
    'income.s4.chart3.sub':
      '綜合所得稅申報戶落在各所得淨額級距的比率，{fy} 年度核定資料。比率是本站以各級距戶數除以合計戶數算出，不是官方比率。',
    'income.s4.chart3.top': '{amt}以上（{rate} 檔）',
    'income.s4.chart3.source':
      '財政部財政資訊中心《{fy} 年度綜合所得稅申報核定統計專冊》',
    'income.s4.p2':
      '誰在繳這筆稅？{fy} 年度的核定資料裡，{zero} 的申報戶扣完之後所得淨額是 0。適用最高稅率的戶數占 {top}，應納稅額占全部的 {topTax}。各類所得裡，薪資所得占 {sal}，股利占 {div}。股利可以選擇併入所得總額、按 {credit} 抵減稅額（每戶上限 {cap}），也可以按 {sep} 分開計稅。',
    'income.s4.p3':
      '稅收這一邊，{y1} 年綜所稅占全國賦稅收入 {iit}，營利事業所得稅占 {cit}，營業稅占 {biz}。這裡的數字是日曆年實際入庫的金額。稅收進了國庫之後怎麼分給各部會，',
    'income.s4.tobudget': '可以看中央政府總預算專題。',
    'income.s4.note':
      '專冊註明統計不含分離課稅、免稅及非課稅所得，不宜拿來比較貧富差距。賦稅收入是日曆年入庫數，和財政部按申報年度公布的稅收淨額口徑不同。個案稅額以國稅局核定為準。',
    'income.s4.src.gazette': '行政院公報公告',
    'income.s4.src.revenue': '財政部賦稅收入統計',
    'income.s4.src.filers': '申報核定統計專冊',
  } as Record<string, string>,
};
