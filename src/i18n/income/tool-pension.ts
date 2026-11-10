/**
 * 勞保年金與勞退試算：文案（zh-TW／en）。
 * 事實來源：reports/research/2026-11/income-topic-02-pension.md（§5 至 §9、§15）。
 * `income.pension.msg.*` 會整包塞進元件的 data-i18n，給瀏覽器端重算時組句用，
 * 句子裡的 {name} 由 src/utils/income/pensionView.ts 代入。
 */
export const toolPension = {
  en: {
    'income.pension.title':
      'Labor Insurance pension and Labor Pension estimate',
    'income.pension.description':
      'Enter your birth year, insured years and pay to estimate the monthly Labor Insurance old-age pension and the Labor Pension annuity, rules as of 2026.',

    'income.pension.legend.li': 'Labor Insurance old-age pension',
    'income.pension.legend.lp': 'Labor Pension (new system)',

    'income.pension.field.birthYear': 'Birth year (ROC calendar)',
    'income.pension.field.birthYear.hint':
      'ROC year 60 is 1971. Your statutory claiming age depends on it.',
    'income.pension.field.claimAge': 'Age you plan to claim',
    'income.pension.field.claimAge.hint':
      'Between 55 and 70. Claiming earlier or later than the statutory age changes the monthly amount.',
    'income.pension.field.years': 'Insured years',
    'income.pension.field.years.hint':
      'Total Labor Insurance years. You need 15 years to receive a pension rather than a lump sum.',
    'income.pension.field.months': 'Extra months',
    'income.pension.field.months.hint':
      'The months beyond whole years (0 to 11).',
    'income.pension.field.avgSalary':
      'Average insured salary, highest 60 months (NT$)',
    'income.pension.field.avgSalary.hint':
      'Capped at NT${max}, the top grade of the {year} insured salary table. This is an average of insured salary grades, not your actual monthly pay.',

    'income.pension.field.wage': 'Current monthly pay (NT$)',
    'income.pension.field.wage.hint':
      'Converted to a contribution grade using the {year} table.',
    'income.pension.field.balance': 'Current account balance (NT$)',
    'income.pension.field.balance.hint':
      'The amount in your Labor Pension individual account today.',
    'income.pension.field.yearsLeft': 'Years until you claim',
    'income.pension.field.yearsLeft.hint':
      'Years of contributions still to come.',
    'income.pension.field.paidYears': 'Years already contributed',
    'income.pension.field.paidYears.hint':
      'Paid-in years plus years to come must reach 15 for a monthly annuity.',
    'income.pension.field.employerRate': 'Employer contribution rate (%)',
    'income.pension.field.employerRate.hint': 'By law at least {min}%.',
    'income.pension.field.selfRate': 'Voluntary contribution rate (%)',
    'income.pension.field.selfRate.hint': '0 to {max}% of monthly pay.',

    'income.pension.more': 'Advanced assumptions',
    'income.pension.field.ret': 'Expected annual return (%)',
    'income.pension.field.ret.hint':
      'The default {def}% is the default of the Ministry of Labor calculator (version of {asOf}), the average since the fund began. It is not a guarantee. For a conservative case, use the guaranteed minimum return, {guarantee}% (announced {guaranteeDate}, based on two-year bank deposit rates).',
    'income.pension.field.growth': 'Annual pay growth (%)',
    'income.pension.field.growth.hint':
      'Default {def}% is the Ministry of Labor calculator default for average monthly regular pay growth.',
    'income.pension.field.pensionAge': 'Age you claim the Labor Pension',
    'income.pension.field.pensionAge.hint': 'At least 60.',

    'income.pension.result.total': 'Both together, per month',
    'income.pension.result.li': 'Labor Insurance old-age pension',
    'income.pension.result.lp': 'Labor Pension monthly annuity',
    'income.pension.result.lb.monthly': 'Pension per month',
    'income.pension.result.lb.formula': 'Formula used',
    'income.pension.result.lb.statAge': 'Statutory claiming age',
    'income.pension.result.lb.adj': 'Your claiming age',
    'income.pension.result.lb.seniority': 'Insured years used',
    'income.pension.result.lp.balance':
      'Account balance at claiming (estimate)',
    'income.pension.result.lp.life': 'Average remaining life',
    'income.pension.result.lp.age': 'Claiming age',
    'income.pension.result.lp.monthly': 'Annuity per month',
    'income.pension.result.nominalTag': 'nominal, not adjusted for inflation',
    'income.pension.result.lp.scenario': 'Return assumption',
    'income.pension.result.chartTitle':
      'Monthly Labor Insurance pension by claiming age',
    'income.pension.result.formulaNote':
      'The pension is the higher of two formulas: average insured salary × years × {coefA}% + NT${constA}, or average insured salary × years × {coefB}%.',
    'income.pension.result.returnNote':
      'The expected return is an assumption, not a guarantee. The real balance depends on fund returns, your pay and your contributions.',
    'income.pension.result.note2027':
      'From 2027 the Labor Insurance rate changes (the ordinary-risk rate goes from 12.5% to 13%, already announced) and the insured salary table is not yet announced. This tool follows the rules in force in {year}.',

    'income.pension.msg.ratio': 'About {pct} of your current monthly pay',
    'income.pension.msg.scenario.low':
      'If the return is only the guaranteed {rate}%',
    'income.pension.msg.scenario.ret': 'At the {rate}% return you entered',
    'income.pension.msg.ratioNote':
      'This ratio is only a rough comparison and is not the official income replacement rate. The Labor Insurance pension is calculated from the insured salary you entered today, while the Labor Pension amount is in nominal money of the year you claim, with no deduction for price rises over the years in between.',
    'income.pension.msg.ratioNone':
      'Enter your current monthly pay to see what share of it the total covers.',
    'income.pension.msg.mixNote':
      'The two payments start at the ages you chose for each. The total simply adds the two monthly amounts.',
    'income.pension.msg.formula.A': 'Formula 1',
    'income.pension.msg.formula.B': 'Formula 2',
    'income.pension.msg.age': 'age {n}',
    'income.pension.msg.years': '{n} years',
    'income.pension.msg.adj.0': 'At the statutory age, no adjustment',
    'income.pension.msg.adj.late': '{n} years later: {pct}% more',
    'income.pension.msg.adj.early': '{n} years earlier: {pct}% less',
    'income.pension.msg.reason.SENIORITY_UNDER_MIN':
      'Insured years are {years}, under the {min} needed for a pension. You would receive the old-age lump sum instead, about {months} months of average insured salary. This tool does not estimate the lump sum amount.',
    'income.pension.msg.reason.TOO_EARLY':
      'For birth year {birth} the statutory claiming age is {stat}, and you can claim at most {max} years early, so the earliest is age {earliest}. Age {age} is too early.',
    'income.pension.msg.reason.NO_SALARY':
      'Enter your average insured salary and insured years to see the pension.',
    'income.pension.msg.lpNo':
      'Contributions would total {n} years, under the {min} needed for a monthly annuity. You could only take a lump sum. Estimated account balance at claiming: {balance} (nominal, not adjusted for inflation).',
    'income.pension.result.balChartTitle':
      'Labor Pension account balance over the years',
    'income.pension.msg.bal.x': 'Years from now',
    'income.pension.msg.bal.tick': '{n}M',
    'income.pension.msg.bal.aria':
      'Labor Pension account balance from now to {n} years ahead, nominal and not adjusted for inflation. {lowLabel}: {low} at the end. {retLabel}: {ret} at the end.',
    'income.pension.msg.chart.x': 'Claiming age',
    'income.pension.msg.chart.statutory': 'Statutory {age}',
    'income.pension.msg.chart.aria':
      'Monthly Labor Insurance pension by claiming age, from {from} to {to}. Claiming {n} years early at {earlyAge} gives {early} a month. The statutory age {stat} gives {base}. Claiming {n} years late at {lateAge} gives {late}.',
    'income.pension.msg.chart.ariaSel':
      ' Your chosen age {sel} gives {amount} a month.',

    'income.pension.disclaimer':
      'This estimate is for reference only and is not tax or financial advice. Actual amounts are set by the Bureau of Labor Insurance, Ministry of Labor.',
    'income.pension.sourcesLine':
      'Sources: Bureau of Labor Insurance, Ministry of Labor, Bureau of Labor Funds. Rules and parameters as of 2026-11-10, covering 2026 (ROC year 115).',

    'income.pension.page.metaTitle':
      'Labor Insurance Pension Calculator 2026 (Taiwan)',
    'income.pension.page.metaDescription':
      'Estimate your monthly Labor Insurance pension and Labor Pension annuity for 2026. Example: 30 insured years at NT$45,800 pays NT$21,297 a month at 65.',
    'income.pension.page.intro':
      'This calculator estimates what you could receive each month from the Labor Insurance old-age pension and the Labor Pension annuity, using the rules in force in 2026.',
    'income.pension.page.reading':
      'The big number adds the two monthly payments. Below it, the Labor Insurance part shows which formula applied and how much your claiming age raises or lowers the amount, and the chart shows every claiming age from the earliest allowed to 70. The Labor Pension part depends on the return you assume, so try a lower return too. For Labor Insurance finances and government funding, see the topic main page.',
    'income.pension.page.method':
      'Labor Insurance old-age pension (2026 rules): the higher of average insured salary × years × 0.775% + NT$3,000, and average insured salary × years × 1.55%. The average is over the highest 60 months of insured salary. Years are counted as years plus months ÷ 12, rounded to two decimals (the third decimal rounds), and a part month of under 30 days counts as 1 month. Each year of delay adds 4% (up to 20%). Each year of early claiming cuts 4%, for at most 5 years and at most 20%. A pension needs 15 insured years.\nLabor Pension: the account is projected year by year the way the Ministry of Labor calculator does it. The monthly contribution wage is matched to the 2026 contribution table, contributions made during a year earn interest for 5.5 months, and pay grows at the rate you set. The monthly annuity is the account balance ÷ the annuity present-value factor ÷ 12. The factor uses the average remaining life at your claiming age (2022 abridged life table: 23 years at 60, 19 years at 65) and an interest rate of 1.1473%.\nAssumptions: the default return and pay growth are those of the Ministry of Labor calculator, version of 2026-03-05. Later price adjustments to the Labor Insurance pension are not included.',
    'income.pension.page.sources':
      'Bureau of Labor Insurance pension and annuity pages, the Ministry of Labor individual pension calculator (2026-03-05 version), the Labor Insurance Act and the Labor Pension Act. Data as of 2026-11-10.',
    'income.pension.page.source1.label':
      'Bureau of Labor Insurance: old-age pension benefits',
    'income.pension.page.source1.url': 'https://www.bli.gov.tw/0019825.html',
    'income.pension.page.source2.label':
      'Bureau of Labor Insurance: claiming conditions and age',
    'income.pension.page.source2.url': 'https://www.bli.gov.tw/0019821.html',
    'income.pension.page.source3.label':
      'Bureau of Labor Insurance: Labor Pension monthly annuity',
    'income.pension.page.source3.url': 'https://www.bli.gov.tw/0018437.html',
    'income.pension.page.source4.label':
      'Ministry of Labor: individual pension calculator',
    'income.pension.page.source4.url': 'https://calcr2.mol.gov.tw/trial',
    'income.pension.page.source5.label': 'Labor Insurance Act',
    'income.pension.page.source5.url':
      'https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=N0050001',
    'income.pension.page.source6.label': 'Labor Pension Act',
    'income.pension.page.source6.url':
      'https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=N0030020',

    'income.pension.page.faq1.q':
      'At what age can I claim the Labor Insurance pension?',
    'income.pension.page.faq1.a':
      'It depends on your birth year (ROC calendar). Born in year 46 or earlier: age 60. Year 47: 61. Year 48: 62. Year 49: 63. Year 50: 64. Year 51 or later: 65. You also need 15 insured years and must have left the insured job (Bureau of Labor Insurance, accessed 2026-11-10).',
    'income.pension.page.faq2.q':
      'How much does claiming early or late change the pension?',
    'income.pension.page.faq2.a':
      'Each year of delay adds 4%, up to 20%. With 15 or more insured years you can claim up to 5 years early, and each year early cuts 4%, up to 20%. In the Bureau of Labor Insurance examples, a base of NT$19,012 becomes NT$21,293 after claiming 3 years late, and NT$16,368 becomes NT$14,404 after claiming 3 years early (rules of 2026).',
    'income.pension.page.faq3.q':
      'What are the two formulas, and who gets the first one?',
    'income.pension.page.faq3.a':
      'Formula 1 is average insured salary × years × 0.775% + NT$3,000. Formula 2 is average insured salary × years × 1.55%. You get the higher one. The two are equal when average insured salary × years × 0.775% = NT$3,000, which is when average salary × years is about NT$387,097, so Formula 1 only wins below that. This figure is derived on this site from the two formulas. It is not an official number. With 15 years, that means an average insured salary under about NT$25,800.',
    'income.pension.page.faq4.q':
      'Are the Labor Insurance pension and the Labor Pension the same money?',
    'income.pension.page.faq4.a':
      'No. Labor Insurance is social insurance. For ordinary-risk premiums the worker pays 20%, the employer 70% and the central government 10%, and the pension depends on insured salary and years. The Labor Pension, in force since 2005-07-01, is an individual account. The employer must contribute at least 6% of monthly pay, and you may add up to 6% yourself (Labor Insurance Act art. 15, Labor Pension Act art. 14).',
    'income.pension.page.faq5.q':
      'What do I gain by contributing 6% of my own pay to the Labor Pension?',
    'income.pension.page.faq5.a':
      'The amount you contribute voluntarily is not counted as salary income for tax in that year, and the Bureau of Labor Insurance says it can be deducted in full from total income. The fund return also cannot be lower than the return on a two-year bank deposit, and the national treasury covers any shortfall (Labor Pension Act arts. 14 and 23).',
    'income.pension.page.faq6.q': 'What if I have fewer than 15 insured years?',
    'income.pension.page.faq6.a':
      'Labor Insurance pays an old-age lump sum instead: 1 month of average insured salary per full year, 2 months per full year beyond 15, up to 45 months (up to 50 if you keep working past 60). If Labor Insurance years are under 15 but they reach 15 once National Pension years are added, you may choose the pension at 65. The Labor Pension pays only a lump sum when contribution years are under 15.',
  },
  'zh-TW': {
    'income.pension.title': '勞保年金與勞退試算',
    'income.pension.description':
      '輸入出生年、勞保年資與薪資，算出勞保老年年金與勞退月退休金每月各領多少，規定依 2026 年。',

    'income.pension.legend.li': '勞保老年年金',
    'income.pension.legend.lp': '勞退新制',

    'income.pension.field.birthYear': '出生年（民國）',
    'income.pension.field.birthYear.hint':
      '民國 60 年就是 1971 年。法定請領年齡看出生年次。',
    'income.pension.field.claimAge': '預計請領年齡',
    'income.pension.field.claimAge.hint':
      '可填 55 到 70 歲。比法定年齡早領或晚領，月領金額會增減。',
    'income.pension.field.years': '勞保年資（年）',
    'income.pension.field.years.hint':
      '勞保年資合計要滿 15 年才能領年金，否則領一次金。',
    'income.pension.field.months': '零頭月數',
    'income.pension.field.months.hint': '不滿一年的月數（0 到 11）。',
    'income.pension.field.avgSalary': '最高 60 個月平均月投保薪資（元）',
    'income.pension.field.avgSalary.hint':
      '上限是 {max} 元，也就是 {year} 年投保薪資分級表的最高級。這是投保薪資的平均，不是你實際的月薪。',

    'income.pension.field.wage': '目前月薪（元）',
    'income.pension.field.wage.hint':
      '提繳時會對照 {year} 年的月提繳工資分級表。',
    'income.pension.field.balance': '目前勞退專戶累積（元）',
    'income.pension.field.balance.hint': '你的勞退個人專戶現在有多少。',
    'income.pension.field.yearsLeft': '距離請領還有幾年',
    'income.pension.field.yearsLeft.hint': '之後還會繼續提繳的年數。',
    'income.pension.field.paidYears': '已提繳年資（年）',
    'income.pension.field.paidYears.hint':
      '已提繳的年數加上還要提繳的年數，要滿 15 年才能領月退休金。',
    'income.pension.field.employerRate': '雇主提繳率（%）',
    'income.pension.field.employerRate.hint': '法定不得低於 {min}%。',
    'income.pension.field.selfRate': '自願提繳率（%）',
    'income.pension.field.selfRate.hint': '月薪的 0 到 {max}%。',

    'income.pension.more': '進階假設',
    'income.pension.field.ret': '預估年報酬率（%）',
    'income.pension.field.ret.hint':
      '預設 {def}% 是勞動部試算表的預設值（基金成立以來的平均），不是保證（{asOf} 版）。想看保守情境，可以改成最低保證收益率 {guarantee}%（勞動基金運用局 {guaranteeDate} 公告，以兩年定存利率為基礎）。',
    'income.pension.field.growth': '薪資年成長率（%）',
    'income.pension.field.growth.hint':
      '預設 {def}% 是勞動部試算表預設的每人每月經常性薪資年化成長率。',
    'income.pension.field.pensionAge': '勞退請領年齡',
    'income.pension.field.pensionAge.hint': '最低 60 歲。',

    'income.pension.result.total': '兩者合計每月可領',
    'income.pension.result.li': '勞保老年年金',
    'income.pension.result.lp': '勞退月退休金',
    'income.pension.result.lb.monthly': '勞保年金每月',
    'income.pension.result.lb.formula': '採用的算式',
    'income.pension.result.lb.statAge': '法定請領年齡',
    'income.pension.result.lb.adj': '你選的請領年齡',
    'income.pension.result.lb.seniority': '計算用的年資',
    'income.pension.result.lp.balance': '請領時專戶累積（估計）',
    'income.pension.result.lp.life': '平均餘命',
    'income.pension.result.lp.age': '請領年齡',
    'income.pension.result.lp.monthly': '勞退月退每月',
    'income.pension.result.nominalTag': '名目金額，未扣物價',
    'income.pension.result.lp.scenario': '報酬率假設',
    'income.pension.result.chartTitle': '各請領年齡的勞保年金月領金額',
    'income.pension.result.formulaNote':
      '年金取兩個算式中較高的一個。第一式是平均月投保薪資 × 年資 × {coefA}% + {constA} 元，第二式是平均月投保薪資 × 年資 × {coefB}%。',
    'income.pension.result.returnNote':
      '預估報酬率是假設，不是保證。實際專戶金額會隨基金收益、薪資與提繳情形變動。',
    'income.pension.result.note2027':
      '2027 年起勞保費率另有調整（普通事故費率由 12.5% 調為 13%，已公告），投保薪資分級表尚未公告。本工具依 {year} 年現行規定計算。',

    'income.pension.msg.ratio': '約占你目前月薪的 {pct}',
    'income.pension.msg.scenario.low': '保證收益率 {rate}% 情境',
    'income.pension.msg.scenario.ret': '你填的報酬率 {rate}% 情境',
    'income.pension.msg.ratioNote':
      '這個比率只是粗略對照，不是官方所得替代率。勞保年金用你現在填的投保薪資計算，勞退金額則是到請領那一年的名目金額，沒有扣掉這段期間的物價上漲，兩者的年份基準不同。',
    'income.pension.msg.ratioNone':
      '輸入目前月薪後，這裡會顯示合計占月薪的比率。',
    'income.pension.msg.mixNote':
      '兩筆錢各在你選的請領年齡開始領，合計只是把兩個月領金額相加。',
    'income.pension.msg.formula.A': '第一式',
    'income.pension.msg.formula.B': '第二式',
    'income.pension.msg.age': '{n} 歲',
    'income.pension.msg.years': '{n} 年',
    'income.pension.msg.adj.0': '剛好是法定年齡，不增減',
    'income.pension.msg.adj.late': '晚 {n} 年領，增給 {pct}%',
    'income.pension.msg.adj.early': '早 {n} 年領，減給 {pct}%',
    'income.pension.msg.reason.SENIORITY_UNDER_MIN':
      '勞保年資 {years} 年，未滿 {min} 年，不符年金條件，改領老年一次金，約 {months} 個月的平均月投保薪資。本工具不試算一次金的金額。',
    'income.pension.msg.reason.TOO_EARLY':
      '出生年次 {birth} 的法定請領年齡是 {stat} 歲，最多提前 {max} 年，最早 {earliest} 歲才能請領。你選的 {age} 歲太早。',
    'income.pension.msg.reason.NO_SALARY':
      '請輸入平均月投保薪資與勞保年資，才能算出年金。',
    'income.pension.msg.lpNo':
      '預計提繳年資 {n} 年，未滿 {min} 年，只能一次領，不能領月退休金。請領時專戶累積估計 {balance}（名目金額，未扣物價）。',
    'income.pension.result.balChartTitle': '勞退專戶累積隨年數的變化',
    'income.pension.msg.bal.x': '距今年數',
    'income.pension.msg.bal.tick': '{n} 萬',
    'income.pension.msg.bal.aria':
      '勞退專戶累積，距今 0 到 {n} 年，名目金額，未扣物價。{lowLabel}，終點 {low}。{retLabel}，終點 {ret}。',
    'income.pension.msg.chart.x': '請領年齡',
    'income.pension.msg.chart.statutory': '法定 {age} 歲',
    'income.pension.msg.chart.aria':
      '勞保年金每月金額，依請領年齡 {from} 到 {to} 歲。提前 {n} 年在 {earlyAge} 歲領，每月 {early}。法定 {stat} 歲領，每月 {base}。延後 {n} 年在 {lateAge} 歲領，每月 {late}。',
    'income.pension.msg.chart.ariaSel': '你選的 {sel} 歲，每月 {amount}。',

    'income.pension.disclaimer':
      '試算結果僅供參考，不構成稅務或財務建議，實際金額以勞動部勞工保險局核定為準。',
    'income.pension.sourcesLine':
      '資料來源：勞動部勞工保險局、勞動部、勞動基金運用局。規定與參數截至 2026-11-10，適用 2026 年（民國 115 年）。',

    'income.pension.page.metaTitle': '勞保年金試算 2026：含勞退月退一起算',
    'income.pension.page.metaDescription':
      '輸入出生年、勞保年資與投保薪資，算出勞保老年年金每月能領多少，再加上勞退月退。例如年資 30 年、投保薪資 45,800 元，65 歲月領 21,297 元。',
    'income.pension.page.intro':
      '這個工具依 2026 年現行規定，算出勞保老年年金與勞退月退休金，退休後每月各能領多少。',
    'income.pension.page.reading':
      '最上面的大數字是兩筆月領金額相加。往下看，勞保年金會告訴你用了哪一個算式，以及你選的請領年齡讓金額增減多少，圖則畫出從最早可請領的年齡到 70 歲，每個年齡的月領金額。勞退月退取決於你假設的報酬率，建議也改成保守的數字試一次。勞保財務與政府撥補，請看專題主頁。',
    'income.pension.page.method':
      '勞保老年年金（2026 年規定）：取「平均月投保薪資 × 年資 × 0.775% + 3,000 元」與「平均月投保薪資 × 年資 × 1.55%」中較高的一個。平均月投保薪資是加保期間最高 60 個月的平均。年資以年加月除以 12 計算，算到小數第二位（第三位四捨五入），未滿 30 日算 1 個月。每晚領 1 年增給 4%，最多 20%。每早領 1 年減給 4%，最多提前 5 年、最多減 20%。年資要滿 15 年才能領年金。\n勞退新制：專戶累積照勞動部勞工個人退休金試算表的算法逐年推算。月提繳工資對照 2026 年的月提繳分級表，當年新增的提繳以 5.5 個月計息，薪資依你設定的成長率每年調整。月退休金等於專戶累積除以年金現值因子，再除以 12。因子用請領年齡的平均餘命（111 年簡易生命表，60 歲 23 年、65 歲 19 年）與利率 1.1473% 計算。\n假設：預設的報酬率與薪資成長率採勞動部試算表 2026-03-05 版的預設值。勞保年金日後的物價調整不計入。',
    'income.pension.page.sources':
      '勞動部勞工保險局的老年年金與月退休金說明、勞動部勞工個人退休金試算表（2026-03-05 版）、勞工保險條例、勞工退休金條例。資料截至 2026-11-10。',
    'income.pension.page.source1.label': '勞保局：老年年金給付',
    'income.pension.page.source1.url': 'https://www.bli.gov.tw/0019825.html',
    'income.pension.page.source2.label': '勞保局：老年給付請領條件與年齡',
    'income.pension.page.source2.url': 'https://www.bli.gov.tw/0019821.html',
    'income.pension.page.source3.label': '勞保局：勞退月退休金說明',
    'income.pension.page.source3.url': 'https://www.bli.gov.tw/0018437.html',
    'income.pension.page.source4.label': '勞動部：勞工個人退休金試算表',
    'income.pension.page.source4.url': 'https://calcr2.mol.gov.tw/trial',
    'income.pension.page.source5.label': '勞工保險條例',
    'income.pension.page.source5.url':
      'https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=N0050001',
    'income.pension.page.source6.label': '勞工退休金條例',
    'income.pension.page.source6.url':
      'https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=N0030020',

    'income.pension.page.faq1.q': '勞保老年年金幾歲可以領？',
    'income.pension.page.faq1.a':
      '要看出生年次（民國）。46 年次以前 60 歲，47 年次 61 歲，48 年次 62 歲，49 年次 63 歲，50 年次 64 歲，51 年次以後 65 歲。另外保險年資要合計滿 15 年，並且離職退保（勞保局，查閱日 2026-11-10）。',
    'income.pension.page.faq2.q': '提前領或延後領，差多少？',
    'income.pension.page.faq2.a':
      '每延後 1 年請領，增給 4%，最多 20%。保險年資滿 15 年的人，最多可以提前 5 年請領，每提前 1 年減給 4%，最多減 20%。勞保局的算例中，原計算金額 19,012 元晚 3 年領，月領 21,293 元。原計算金額 16,368 元早 3 年領，月領 14,404 元（2026 年規定）。',
    'income.pension.page.faq3.q': '年金的兩個公式差在哪？誰適用第一式？',
    'income.pension.page.faq3.a':
      '第一式是平均月投保薪資 × 年資 × 0.775% + 3,000 元，第二式是平均月投保薪資 × 年資 × 1.55%，兩式擇優，取較高的。兩式相等的條件是平均月投保薪資 × 年資 × 0.775% = 3,000 元，也就是平均月投保薪資 × 年資約為 387,097，低於這個數才是第一式較高。這個數字是本站由兩個公式算出來的，不是官方數字。以年資 15 年來算，平均月投保薪資要低於約 25,800 元才適用第一式。',
    'income.pension.page.faq4.q': '勞保年金和勞退是同一筆錢嗎？',
    'income.pension.page.faq4.a':
      '不是同一筆。勞保是社會保險，普通事故保險費由勞工負擔 20%、雇主 70%、中央政府補助 10%，年金依投保薪資與年資計算。勞退新制從 2005-07-01 施行，是個人專戶，雇主每月至少要提繳工資的 6%，勞工可以在月薪 6% 的範圍內自願再提繳（勞工保險條例第 15 條、勞工退休金條例第 14 條）。',
    'income.pension.page.faq5.q': '勞退自提 6% 有什麼好處？',
    'income.pension.page.faq5.a':
      '自願提繳的部分不計入提繳年度的薪資所得課稅，勞保局的說明是可以從當年度個人綜合所得總額中全數扣除。另外基金運用收益不得低於以當地銀行二年定期存款利率計算的收益，不足的部分由國庫補足（勞工退休金條例第 14、23 條）。',
    'income.pension.page.faq6.q': '勞保年資不到 15 年怎麼辦？',
    'income.pension.page.faq6.a':
      '未滿 15 年改領老年一次金：每滿 1 年發給 1 個月，超過 15 年的部分每滿 1 年發給 2 個月，最高 45 個月，逾 60 歲繼續工作的年資最多再計 5 年，合計最高 50 個月。如果勞保年資未滿 15 年，但併計國民年金年資滿 15 年，年滿 65 歲時可以選擇請領勞保老年年金。勞退提繳年資未滿 15 年，則只能一次領。',
  },
};
