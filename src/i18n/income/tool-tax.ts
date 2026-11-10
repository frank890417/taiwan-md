/** 所得稅試算：文案（zh-TW／en）。事實來源：reports/research/2026-11/income-topic-01-income-tax.md */
export const toolTax = {
  en: {
    'income.tax.title': 'Income tax calculator (tax year 2026, filed May 2027)',
    'income.tax.desc':
      'Enter salary, dependents and deductions to estimate your individual income tax, and switch to tax year 2025 (ROC year 114).',

    'income.tax.legend.year': 'Tax year',
    'income.tax.year.115': 'ROC year 115 (2026 income, filed May 2027)',
    'income.tax.year.114': 'ROC year 114 (2025 income, filed May 2026)',
    'income.tax.legend.household': 'Household',
    'income.tax.married.0': 'Single',
    'income.tax.married.1': 'Married',
    'income.tax.field.salary': 'Your annual salary',
    'income.tax.field.salary.hint':
      'Total pay for the year before anything is taken out, including year-end and other bonuses.',
    'income.tax.field.spouseSalary': "Spouse's annual salary",
    'income.tax.legend.family': 'Dependents',
    'income.tax.field.general': 'Other dependents',
    'income.tax.field.general.hint':
      'Not counting the minor children and parents aged 70 or over listed below.',
    'income.tax.field.elderly70': 'Dependent parents or grandparents aged 70+',
    'income.tax.field.minorChildren': 'Minor children',
    'income.tax.field.minorChildren.hint':
      'The exemption is 50% higher from tax year 2026 (law published 2026-09-11). Tax year 2025 has no increase.',
    'income.tax.field.preschool': 'Of those, aged 6 or under',
    'income.tax.field.preschool.hint':
      'Preschool special deduction: the first child and each further child have different amounts.',
    'income.tax.clamp':
      'Children aged 6 or under cannot exceed minor children. Calculated with {n}.',

    'income.tax.more': 'More: other income, deductions, tax withheld',
    'income.tax.field.interest': 'Your interest income',
    'income.tax.field.dividend': 'Your dividend income',
    'income.tax.field.other': 'Your other income',
    'income.tax.field.spouseInterest': "Spouse's interest income",
    'income.tax.field.spouseDividend': "Spouse's dividend income",
    'income.tax.field.spouseOther': "Spouse's other income",
    'income.tax.field.selfElderly70': 'You are aged 70 or over',
    'income.tax.field.spouseElderly70': 'Your spouse is aged 70 or over',
    'income.tax.field.college': 'Children in college or university',
    'income.tax.field.college.hint':
      'Tuition special deduction, counted at the per-student cap.',
    'income.tax.field.disabled': 'People with disabilities in the household',
    'income.tax.field.longTermCare':
      'People needing long-term care in the household',
    'income.tax.legend.deduction': 'General deduction',
    'income.tax.deduction.standard': 'Standard deduction',
    'income.tax.deduction.itemized': 'Itemized deductions',
    'income.tax.field.itemized': 'Total itemized deductions',
    'income.tax.field.rent': 'Rent paid during the year',
    'income.tax.field.rent.hint':
      'Only deductible if you rent your home and own no home in Taiwan during the rental period (with exceptions). The tool does not check this.',
    'income.tax.field.withheld': 'Tax already withheld',
    'income.tax.field.withheld.hint':
      'Optional. Used to work out how much you still owe or get back.',

    'income.tax.result.total': 'Tax payable',
    'income.tax.result.eff': 'Effective tax rate',
    'income.tax.result.top': 'Highest bracket rate applied',
    'income.tax.kv.salaryDed': 'Salary special deduction',
    'income.tax.kv.gross': 'Gross income',
    'income.tax.kv.note':
      'Gross income is salary after the salary special deduction, plus any other income you entered.',
    'income.tax.kv.exemptions': 'Personal exemptions',
    'income.tax.kv.general': 'General deduction',
    'income.tax.kv.special': 'Other special deductions',
    'income.tax.kv.basic': 'Basic living expense difference',
    'income.tax.kv.net': 'Net income',
    'income.tax.kv.taxPayable': 'Tax from the brackets',
    'income.tax.kv.total': 'Tax payable',
    'income.tax.kv.withheld': 'Tax withheld',
    'income.tax.balance.due': 'Still to pay',
    'income.tax.balance.refund': 'Refund',
    'income.tax.notAnnounced': 'Not announced, left out',
    'income.tax.none': '-',
    'income.tax.unit.wan': '',
    'income.tax.unit.k': 'K',
    'income.tax.unit.m': 'M',
    'income.tax.yearNote.115':
      'Tax year 2026 (ROC year 115), filed May 2027. Amounts from the Ministry of Finance notice of 2025-11-27, plus the 2026-09-11 amendment for minor children.',
    'income.tax.yearNote.114':
      'Tax year 2025 (ROC year 114), filed May 2026. Amounts from the Ministry of Finance notice of 2024-11-28 (unchanged from tax year 2024).',

    'income.tax.method.joint': 'combined filing of both incomes',
    'income.tax.method.selfSalarySeparate': 'your salary taxed separately',
    'income.tax.method.spouseSalarySeparate':
      "your spouse's salary taxed separately",
    'income.tax.method.selfAllSeparate': 'all your income taxed separately',
    'income.tax.method.spouseAllSeparate':
      "all your spouse's income taxed separately",
    'income.tax.best.joint':
      'Combined filing is the lowest of the five methods. The other four are not cheaper.',
    'income.tax.best.other':
      'The lowest method is "{method}", which pays {saving} less than combined filing.',
    'income.tax.divBest.combined':
      'Adding dividends to your income pays {saving} less than the separate flat rate.',
    'income.tax.divBest.separate':
      'The separate flat rate on dividends pays {saving} less than adding them to your income.',
    'income.tax.divBest.same': 'Both dividend methods give the same tax.',
    'income.tax.divCredit': 'Dividend tax credit ({rate}, capped at {cap})',
    'income.tax.divSeparate': 'Tax on dividends taxed separately ({rate})',

    'income.tax.chart.title':
      'Where your net income falls on the five brackets',
    'income.tax.chart.note':
      'Five equal cells, one per bracket. Large number: the rate. Below each cell: the net income range (NT$). Small number in a cell: the tax collected in that bracket (NT$).',
    'income.tax.chart.marker': 'Your net NT${net}',
    'income.tax.chart.aria':
      'Tax bracket chart: net income {net} falls in the {rate} bracket, and the tax across brackets adds up to {tax}.',
    'income.tax.chart.ariaTop':
      'Tax bracket chart: with separate filing, the highest rate applied is {rate}.',
    'income.tax.range.first': 'up to {up}',
    'income.tax.range.last': 'over {lo}',
    'income.tax.sepNote':
      'The cheapest method taxes part of the income separately, so the chart does not mark one net income. The outlined cell is the highest bracket any part reaches.',

    'income.tax.w.basic':
      'The Ministry of Finance announces the basic living expense per person for tax year 2026 by the end of December and had not by 2026-11-10, so the difference is left out for now. A household with many members and few deductions may owe less once it is announced.',
    'income.tax.w.rate20':
      'Long-term care and rent special deductions are not allowed here, because the tax rate after deducting them is 20% or higher (Income Tax Act Article 17). They are already left out.',
    'income.tax.w.div28':
      'With dividends taxed separately at the flat rate, the long-term care and rent special deductions are not allowed. They are already left out.',
    'income.tax.w.amt':
      'Your income is above {threshold}. You may also owe the alternative minimum tax (basic tax), which this tool does not calculate, so the real amount can be higher.',

    'income.tax.disclaimer':
      'This estimate is for reference only and is not tax or financial advice. The Ministry of Finance and the National Taxation Bureaus decide the amount actually due.',
    'income.tax.sourcesLine':
      'Source: Ministry of Finance notices for tax years 2025 and 2026 (ROC years 114 and 115) and Income Tax Act Articles 15 and 17, as of 2026-11-10.',

    'income.tax.page.metaTitle':
      'Taiwan Income Tax Calculator, Tax Year 2026 (Filed May 2027)',
    'income.tax.page.metaDescription':
      'Estimate Taiwan individual income tax for tax year 2026 (filed May 2027) with the five rates. A single filer earning NT$600,000 owes NT$6,800.',
    'income.tax.page.intro':
      "This calculator uses the Ministry of Finance's exemptions, deductions and five tax brackets to estimate your individual income tax, and for married filers it finds the cheapest of five methods.",
    'income.tax.page.reading':
      'The big number is the tax payable after the dividend credit and before tax already withheld. The balance below it is what you still owe or get back. The effective rate is tax divided by gross income and is usually well below the top bracket rate, because exemptions and deductions come off first and a higher rate only applies to the slice above each bracket limit. The bracket chart shows where your net income sits, and the figures under each block show the tax collected in that bracket.',
    'income.tax.page.method':
      "Order of calculation: gross income (salary after the salary special deduction, other income as entered), minus personal exemptions, minus the standard or itemized deduction (one of the two), minus special deductions, minus the basic living expense difference, gives net income. Tax is net income times the bracket rate minus the progressive difference, worked out to the dollar and rounded down.\nMarried filers: the tool works out five methods, which are combined filing, your salary taxed separately, your spouse's salary taxed separately, all your income taxed separately and all your spouse's income taxed separately, and shows the lowest.\nDividends: the tool works out both adding dividends to income (8.5% of dividends as a credit, capped at NT$80,000 per filing household) and the separate 28% flat rate (Income Tax Act Article 15), and shows the lower. With the 28% method, the long-term care and rent special deductions are not allowed.\nLong-term care and rent: if the rate after deducting these two is 20% or higher, they are not allowed. The tool leaves them out automatically.\nBasic living expense difference: the Ministry of Finance announces a basic living expense per person each year (NT$213,000 for tax year 2025). Multiply it by the number of people covered. The part above your total exemptions, general deduction and six special deductions (savings and investment, disability, tuition, preschool, long-term care, rent) comes off your income again. The tax year 2026 amount had not been announced by 2026-11-10, so it is left out for now.\nMinor children, tax year 2026: the exemption is NT$151,500 each, worked out from the law published 2026-09-11 and the ministry's press release. The tax year 2026 return form was not out yet.\nTuition: counted at NT$25,000 per college student. If the real tuition is lower, adjust by hand.\nNot covered: professional service income, property transaction income, retirement income, overseas income, the calculation of the basic tax itself, and separate filing by separated spouses or in the year of marriage.",
    'income.tax.page.sources':
      'Executive Yuan Gazette notices for ROC years 114 and 115 (the tax year 2026 notice is Ministry of Finance document 11404664070, 2025-11-27), Ministry of Finance press releases (2025-09-23 and 2025-11-27), Department of Taxation press release of 2026-08-21 (minor children exemption), Income Tax Act Articles 15 and 17, Taxpayer Rights Protection Act enforcement rules Article 3, and the Taxation Portal saving manual. Data as of 2026-11-10.',
    'income.tax.page.source1.label':
      'Executive Yuan Gazette: tax year 2026 amounts (2025-11-27)',
    'income.tax.page.source1.url':
      'https://gazette.nat.gov.tw/EG_FileManager/eguploadpub/eg031224/ch04/type3/gov30/num12/Eg.htm',
    'income.tax.page.source2.label':
      'Ministry of Finance: tax year 2026 adjustments and tax-free salary levels (2025-11-27)',
    'income.tax.page.source2.url':
      'https://www.mof.gov.tw/singlehtml/384fb3077bb349ea973e7fc6f13b6974?cntId=34b463dc8f1b49f29d440d92a6fd5139',
    'income.tax.page.source3.label':
      'Ministry of Finance: tax year 2025 tax-free salary for a single renter (2025-09-23)',
    'income.tax.page.source3.url':
      'https://www.mof.gov.tw/singlehtml/384fb3077bb349ea973e7fc6f13b6974?cntId=ef27a333aeb6491782f526bff6e0d966',
    'income.tax.page.source4.label':
      'Department of Taxation: minor children exemption up 50% (2026-08-21)',
    'income.tax.page.source4.url':
      'https://www.dot.gov.tw/singlehtml/ch26?cntId=9665f10945c74724805d51a8bf52a09f',
    'income.tax.page.source5.label':
      'Income Tax Act Article 15 (filing methods and dividends)',
    'income.tax.page.source5.url':
      'https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=G0340003&flno=15',
    'income.tax.page.source6.label':
      'Income Tax Act Article 17 (exemptions, deductions, long-term care and rent rules)',
    'income.tax.page.source6.url':
      'https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=G0340003&flno=17',
    'income.tax.page.source7.label':
      'Income Tax Act history: Presidential order of 2026-09-11 amending Articles 17 and 126',
    'income.tax.page.source7.url':
      'https://law.moj.gov.tw/LawClass/LawHistory.aspx?pcode=G0340003',

    'income.tax.page.faq1.q':
      'How much salary can I earn before I owe income tax?',
    'income.tax.page.faq1.a':
      'It depends on the household. The Ministry of Finance worked out cases for renters: for tax year 2025 (ROC 114, filed May 2026) a single worker owes nothing up to NT$626,000. For tax year 2026 (ROC 115, filed May 2027) the levels are NT$644,000 for a single renter, NT$1,108,000 for a two-earner renting couple and NT$1,685,000 for a renting family of four with two children aged 6 or under. Those three tax year 2026 levels were published on 2025-11-27, before the September 2026 amendment that raised the minor child exemption by 50%, so they leave that increase out. Families with minor children should run the calculator above.',
    'income.tax.page.faq2.q':
      'Which amounts go up for tax year 2026 (ROC year 115)?',
    'income.tax.page.faq2.a':
      'On 2025-11-27 the Ministry of Finance announced increases because consumer prices rose 4.13% from tax year 2024. The personal exemption goes from NT$97,000 to NT$101,000 and from NT$145,500 to NT$151,500 for people aged 70 or over. The standard deduction goes from NT$131,000 to NT$136,000 for a single filer and from NT$262,000 to NT$272,000 with a spouse. The salary and disability special deductions go from NT$218,000 to NT$227,000, and the bracket limits rise too. Tax year 2025 was not adjusted. A separate amendment published 2026-09-11 raises the minor child exemption by 50% to NT$151,500 from tax year 2026.',
    'income.tax.page.faq3.q':
      'Should I take the standard deduction or itemize?',
    'income.tax.page.faq3.a':
      'You pick one of the two. For tax year 2026 the standard deduction is NT$136,000 for a single filer and NT$272,000 with a spouse (NT$131,000 and NT$262,000 for tax year 2025). Itemizing only pays if your qualifying items add up to more than that. One example in the Taxation Portal manual for tax year 2025 is interest on a loan for your own home, capped at NT$300,000 per household. When you choose itemized here, enter the total yourself.',
    'income.tax.page.faq4.q': 'Do married couples have to file together?',
    'income.tax.page.faq4.a':
      "Under Article 15 of the Income Tax Act, when both spouses have income they must file one combined return, and only separated spouses may file on their own. In the year of marriage the couple can choose to file separately or together, according to the Taxation Portal. Within the combined return you can still have the salary or all of one spouse's income taxed separately, which gives five methods in all. This tool works out all five and shows the lowest.",
    'income.tax.page.faq5.q':
      'Should dividends be added to income or taxed separately?',
    'income.tax.page.faq5.a':
      'Either is allowed. If you add dividends to your income, 8.5% of the total dividends is a credit against your tax, up to NT$80,000 per filing household. If you tax them separately, the total dividends are taxed at a flat 28% (Income Tax Act Article 15). Which is cheaper depends on your bracket and how much you receive, so the tool works out both and shows the difference. Choosing the 28% method also rules out the long-term care and rent special deductions.',
  },
  'zh-TW': {
    'income.tax.title': '所得稅試算 115 年度（2027 年報稅）',
    'income.tax.desc':
      '輸入薪資、扶養親屬與扣除額，算出綜合所得稅要繳多少，也可以切換 114 年度。',

    'income.tax.legend.year': '適用年度',
    'income.tax.year.115': '115 年度（2026 年所得，2027 年 5 月申報）',
    'income.tax.year.114': '114 年度（2025 年所得，2026 年 5 月申報）',
    'income.tax.legend.household': '家庭狀況',
    'income.tax.married.0': '單身',
    'income.tax.married.1': '有配偶',
    'income.tax.field.salary': '本人全年薪資收入',
    'income.tax.field.salary.hint':
      '還沒扣任何東西的全年薪資，包含年終與各種獎金。',
    'income.tax.field.spouseSalary': '配偶全年薪資收入',
    'income.tax.legend.family': '受扶養親屬',
    'income.tax.field.general': '一般受扶養親屬（人）',
    'income.tax.field.general.hint':
      '不含下面的未成年子女與 70 歲以上直系尊親屬。',
    'income.tax.field.elderly70': '70 歲以上直系尊親屬（人）',
    'income.tax.field.minorChildren': '未成年子女（人）',
    'income.tax.field.minorChildren.hint':
      '115 年度起免稅額加 50%（2026-09-11 公布），114 年度沒有加成。',
    'income.tax.field.preschool': '其中 6 歲以下（人）',
    'income.tax.field.preschool.hint':
      '幼兒學前特別扣除額，第 1 名與第 2 名起金額不同。',
    'income.tax.clamp': '6 歲以下子女不會比未成年子女多，已改用 {n} 人計算。',

    'income.tax.more': '進階：其他所得、扣除額與已扣繳稅額',
    'income.tax.field.interest': '本人利息所得',
    'income.tax.field.dividend': '本人股利所得',
    'income.tax.field.other': '本人其他所得',
    'income.tax.field.spouseInterest': '配偶利息所得',
    'income.tax.field.spouseDividend': '配偶股利所得',
    'income.tax.field.spouseOther': '配偶其他所得',
    'income.tax.field.selfElderly70': '本人年滿 70 歲',
    'income.tax.field.spouseElderly70': '配偶年滿 70 歲',
    'income.tax.field.college': '就讀大專以上的子女（人）',
    'income.tax.field.college.hint': '教育學費特別扣除額，每人以上限金額計。',
    'income.tax.field.disabled': '全戶身心障礙人數',
    'income.tax.field.longTermCare': '全戶長期照顧需求人數',
    'income.tax.legend.deduction': '一般扣除額',
    'income.tax.deduction.standard': '標準扣除額',
    'income.tax.deduction.itemized': '列舉扣除額',
    'income.tax.field.itemized': '列舉扣除額總額',
    'income.tax.field.rent': '全年房屋租金支出',
    'income.tax.field.rent.hint':
      '租屋期間在台灣境內有房屋者不得扣（有例外），本工具不判斷。',
    'income.tax.field.withheld': '已扣繳稅額',
    'income.tax.field.withheld.hint': '選填。用來算還要補多少或可退多少。',

    'income.tax.result.total': '應納稅額',
    'income.tax.result.eff': '有效稅率',
    'income.tax.result.top': '適用最高稅率',
    'income.tax.kv.salaryDed': '薪資特別扣除額',
    'income.tax.kv.gross': '綜合所得總額',
    'income.tax.kv.note':
      '綜合所得總額是薪資先扣掉薪資特別扣除額之後的數字，再加上你填的其他所得。',
    'income.tax.kv.exemptions': '免稅額',
    'income.tax.kv.general': '一般扣除額',
    'income.tax.kv.special': '其他特別扣除額',
    'income.tax.kv.basic': '基本生活費差額',
    'income.tax.kv.net': '綜合所得淨額',
    'income.tax.kv.taxPayable': '依級距算出的稅額',
    'income.tax.kv.total': '應納稅額',
    'income.tax.kv.withheld': '已扣繳稅額',
    'income.tax.balance.due': '應補稅額',
    'income.tax.balance.refund': '應退稅額',
    'income.tax.notAnnounced': '尚未公告，暫不計入',
    'income.tax.none': '–',
    'income.tax.unit.wan': '萬',
    'income.tax.unit.k': '千',
    'income.tax.unit.m': '百萬',
    'income.tax.yearNote.115':
      '115 年度（2026 年所得），2027 年 5 月申報。金額依財政部 2025-11-27 公告，加上 2026-09-11 公布的未成年子女免稅額修法。',
    'income.tax.yearNote.114':
      '114 年度（2025 年所得），2026 年 5 月申報。金額依財政部 2024-11-28 公告，與 113 年度相同。',

    'income.tax.method.joint': '夫妻所得合併計稅',
    'income.tax.method.selfSalarySeparate': '本人薪資分開計稅',
    'income.tax.method.spouseSalarySeparate': '配偶薪資分開計稅',
    'income.tax.method.selfAllSeparate': '本人各類所得分開計稅',
    'income.tax.method.spouseAllSeparate': '配偶各類所得分開計稅',
    'income.tax.best.joint':
      '五種計稅方式裡，夫妻所得合併計稅最省，其他四種沒有比較低。',
    'income.tax.best.other':
      '最省的計稅方式是「{method}」，比夫妻所得合併計稅少繳 {saving}。',
    'income.tax.divBest.combined':
      '股利併入綜合所得，比分開計稅少繳 {saving}。',
    'income.tax.divBest.separate':
      '股利分開計稅，比併入綜合所得少繳 {saving}。',
    'income.tax.divBest.same': '股利併入綜合所得與分開計稅的稅額相同。',
    'income.tax.divCredit': '股利可抵減稅額（{rate}，上限 {cap}）',
    'income.tax.divSeparate': '股利分開計稅的稅額（{rate}）',

    'income.tax.chart.title': '綜合所得淨額落在五級稅率的哪一級',
    'income.tax.chart.note':
      '五個級距各佔一格。格內大字是稅率，格子下方是這一級的淨額範圍，格內小字是這一級課到的稅額（元）。',
    'income.tax.chart.marker': '你的淨額 {net}',
    'income.tax.chart.aria':
      '稅額階梯圖：綜合所得淨額 {net} 落在 {rate} 這一級，各級距課到的稅合計 {tax}。',
    'income.tax.chart.ariaTop':
      '稅額階梯圖：分開計稅，適用的最高稅率是 {rate}。',
    'income.tax.range.first': '{up}以下',
    'income.tax.range.last': '{lo}以上',
    'income.tax.sepNote':
      '目前最省的方式有一部分分開計稅，所以圖上不標單一的淨額。框起來的是各部分中最高的那一級稅率。',

    'income.tax.w.basic':
      '115 年度每人基本生活所需費用，財政部預計 12 月底前公告，截至 2026-11-10 還沒公告，所以基本生活費差額暫不計入。人口多、扣除額少的家庭，公告後實際稅額可能比這裡低。',
    'income.tax.w.rate20':
      '長期照顧與房屋租金特別扣除額，因為減除後適用稅率達 20% 以上，依所得稅法第 17 條不得扣除，上面的結果已經排除。',
    'income.tax.w.div28':
      '股利選擇 28% 分開計稅時，長期照顧與房屋租金特別扣除額不得扣除，上面的結果已經排除。',
    'income.tax.w.amt':
      '你的所得超過 {threshold}，可能還要另外計算基本稅額（最低稅負制）。本工具沒有計算基本稅額，實際要繳的可能更多。',

    'income.tax.disclaimer':
      '試算結果僅供參考，不構成稅務或財務建議，實際金額以財政部各區國稅局核定為準。',
    'income.tax.sourcesLine':
      '資料：財政部 114、115 年度公告與所得稅法第 15、17 條，截至 2026-11-10。',

    'income.tax.page.metaTitle':
      '所得稅試算 115 年度（2027 年報稅）免稅額與稅率',
    'income.tax.page.metaDescription':
      '輸入薪資、扶養人數與扣除額，算出 115 年度（2027 年 5 月申報）綜合所得稅應納稅額，可切換 114 年度。單身年薪 60 萬應納 6,800 元。',
    'income.tax.page.intro':
      '這個工具用財政部公告的免稅額、扣除額和五級稅率，算出你的綜合所得稅要繳多少，有配偶時一併找出五種計稅方式裡最省的一種。',
    'income.tax.page.reading':
      '最上面的大數字是扣掉股利抵減之後的應納稅額，還沒減已扣繳的稅。下面的應補或應退，才是減掉已扣繳稅額之後要補或可退的錢。有效稅率是應納稅額除以綜合所得總額，通常遠低於最高稅率，因為免稅額和扣除額先從所得扣掉，高稅率只課在超過級距的那一段。稅額階梯圖把你的淨額放在五個級距上，色塊下方的數字是每一級課到的稅。',
    'income.tax.page.method':
      '計算順序：綜合所得總額（薪資先扣薪資所得特別扣除額，其他所得照你填的列入）減免稅額，減一般扣除額（標準或列舉擇一），減特別扣除額，再減基本生活費差額，得到綜合所得淨額。稅額是淨額乘以稅率再減累進差額，算到元，不足一元無條件捨去。\n有配偶時：試算夫妻所得合併計稅、本人薪資分開、配偶薪資分開、本人各類所得分開、配偶各類所得分開共五種，取稅額最低的一種。\n股利：試算併入綜合所得（股利合計的 8.5% 可抵減稅額，每一申報戶上限 8 萬元）與 28% 單一稅率分開計稅兩種（所得稅法第 15 條），取較低的一種。選 28% 分開計稅時，長期照顧與房屋租金特別扣除額不得扣除。\n長期照顧與房屋租金：減除這兩項之後適用稅率達 20% 以上就不得扣除，工具會自動排除。\n基本生活費差額：財政部每年公告每人基本生活所需費用（114 年度是 213,000 元），乘以本人、配偶與受扶養親屬的人數。超過免稅額、一般扣除額和六項特別扣除額（儲蓄投資、身心障礙、教育學費、幼兒學前、長期照顧、房屋租金）合計的部分，可以再從所得扣掉。115 年度的金額截至 2026-11-10 還沒公告，所以暫不計入。\n115 年度未成年子女：免稅額每人 151,500 元，依 2026-09-11 公布的法條與財政部新聞稿推得，115 年度申報書還沒公布。\n教育學費：就讀大專以上的子女每人以 25,000 元計，實際學費比較低的人請自己調整。\n不處理的項目：執行業務所得、財產交易所得、退職所得、海外所得、基本稅額本身的計算，以及分居或年度中結婚的分開申報。',
    'income.tax.page.sources':
      '行政院公報 114、115 年度公告（115 年度為財政部台財稅字第 11404664070 號，2025-11-27）、財政部新聞稿（2025-09-23、2025-11-27）、賦稅署 2026-08-21 新聞稿（未成年子女免稅額）、所得稅法第 15、17 條、納稅者權利保護法施行細則第 3 條、稅務入口網節稅手冊。資料截至 2026-11-10。',
    'income.tax.page.source1.label':
      '行政院公報：115 年度綜合所得稅各項金額公告（2025-11-27）',
    'income.tax.page.source1.url':
      'https://gazette.nat.gov.tw/EG_FileManager/eguploadpub/eg031224/ch04/type3/gov30/num12/Eg.htm',
    'income.tax.page.source2.label':
      '財政部新聞稿：115 年度金額調整與免稅年薪門檻（2025-11-27）',
    'income.tax.page.source2.url':
      'https://www.mof.gov.tw/singlehtml/384fb3077bb349ea973e7fc6f13b6974?cntId=34b463dc8f1b49f29d440d92a6fd5139',
    'income.tax.page.source3.label':
      '財政部新聞稿：114 年度單身租屋免稅年薪 62.6 萬（2025-09-23）',
    'income.tax.page.source3.url':
      'https://www.mof.gov.tw/singlehtml/384fb3077bb349ea973e7fc6f13b6974?cntId=ef27a333aeb6491782f526bff6e0d966',
    'income.tax.page.source4.label':
      '賦稅署新聞稿：未成年子女免稅額加 50%（2026-08-21）',
    'income.tax.page.source4.url':
      'https://www.dot.gov.tw/singlehtml/ch26?cntId=9665f10945c74724805d51a8bf52a09f',
    'income.tax.page.source5.label': '所得稅法第 15 條（計稅方式與股利）',
    'income.tax.page.source5.url':
      'https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=G0340003&flno=15',
    'income.tax.page.source6.label':
      '所得稅法第 17 條（免稅額、扣除額與長照房租排除規定）',
    'income.tax.page.source6.url':
      'https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=G0340003&flno=17',
    'income.tax.page.source7.label':
      '所得稅法沿革：2026-09-11 總統令修正公布第 17、126 條',
    'income.tax.page.source7.url':
      'https://law.moj.gov.tw/LawClass/LawHistory.aspx?pcode=G0340003',

    'income.tax.page.faq1.q': '年薪多少以下不用繳所得稅？',
    'income.tax.page.faq1.a':
      '要看家庭條件。財政部用租屋自住的情境算過：114 年度（2026 年 5 月申報）單身上班族年薪 62.6 萬元以下可免繳。115 年度（2027 年 5 月申報）單身 64.4 萬元、雙薪租屋家庭 110.8 萬元、租屋且扶養 2 名 6 歲以下子女的四口之家 168.5 萬元以下可免繳。這三個 115 年度數字是 2025-11-27 公布，早於 2026-09 修法的未成年子女免稅額加 50%，所以沒有計入加成，有未成年子女的家庭請用上面的工具直接算。',
    'income.tax.page.faq2.q': '115 年度有哪些金額調高？',
    'income.tax.page.faq2.a':
      '財政部 2025-11-27 公告，因消費者物價指數比 113 年度上漲 4.13%，達到調整標準。免稅額從每人 97,000 元調到 101,000 元，70 歲以上從 145,500 元調到 151,500 元。標準扣除額單身從 131,000 元調到 136,000 元，有配偶從 262,000 元調到 272,000 元。薪資所得與身心障礙特別扣除額都從 218,000 元調到 227,000 元，五級稅率的級距上限也跟著調高。114 年度沒有調整。另外 2026-09-11 公布的修法，自 115 年 1 月 1 日起，未成年子女免稅額加 50%，每人 151,500 元。',
    'income.tax.page.faq3.q': '標準扣除額和列舉扣除額怎麼選？',
    'income.tax.page.faq3.a':
      '兩種擇一，不能同時用。115 年度標準扣除額單身 136,000 元，有配偶 272,000 元（114 年度是 131,000 元與 262,000 元）。你符合規定的列舉項目加起來超過標準扣除額，列舉才划算。稅務入口網 114 年度手冊列的例子之一是自用住宅購屋借款利息，每戶以 30 萬元為限。本工具選列舉時，請自己填加總金額。',
    'income.tax.page.faq4.q': '夫妻一定要合併申報嗎？',
    'income.tax.page.faq4.a':
      '依所得稅法第 15 條，夫妻雙方都有所得時一定要合併辦理結算申報，只有分居的可以各自申報。年度中結婚的，當年度可以選擇各自或合併申報（稅務入口網說明）。合併申報之後，薪資所得或各類所得仍可以分開計算稅額，一共有五種計稅方式。本工具五種都算，取最低的一種。',
    'income.tax.page.faq5.q': '股利要併入綜合所得還是分開計稅？',
    'income.tax.page.faq5.a':
      '兩種都可以選。併入綜合所得的話，股利合計的 8.5% 可以抵減應納稅額，每一申報戶最多抵 8 萬元。分開計稅則是股利合計按 28% 單一稅率另外課稅（所得稅法第 15 條）。哪一種省，要看你的所得落在哪一級、股利有多少，工具兩種都算，並告訴你差多少。選 28% 分開計稅的話，長期照顧與房屋租金特別扣除額就不能用。',
  },
};
