/** 實領薪資與雇主成本工具：文案（zh-TW／en）。 */
export const toolTakeHome = {
  en: {
    'income.takehome.field.wage': 'Monthly salary',
    'income.takehome.field.wage.hint':
      'Before any deductions, in NT$ per month.',
    'income.takehome.field.bonus': 'Year-end and bonus (months)',
    'income.takehome.field.bonus.hint':
      'Counted only in the annual totals and the income tax estimate. Insurance and pension here follow the monthly salary only.',
    'income.takehome.field.selfRate': 'Voluntary pension contribution (%)',
    'income.takehome.field.selfRate.hint':
      'From 0% to 6% of the monthly contribution wage. Not counted as taxable salary income for that year.',
    'income.takehome.field.nhi': 'National Health Insurance premium (optional)',
    'income.takehome.field.nhi.hint':
      'Your own monthly NHI premium in NT$. Leave blank to leave it out.',
    'income.takehome.nhi.link': 'Open the NHI premium calculator',
    'income.takehome.nhi.note':
      'This tool does not calculate NHI premiums. Work yours out with the premium calculator in the health topic, then enter it here.',
    'income.takehome.more.summary': 'Tax estimate and other settings',
    'income.takehome.field.dependents': 'Dependents (exemption count)',
    'income.takehome.field.dependents.hint':
      'For the tax estimate only. The estimate assumes a single filer taking the standard deduction.',
    'income.takehome.field.withTax': 'Estimate individual income tax',
    'income.takehome.field.withTax.hint':
      'Spreads the estimated annual tax evenly over 12 months.',
    'income.takehome.field.occRate': 'Occupational accident insurance rate (%)',
    'income.takehome.field.occRate.hint':
      'Rates differ by industry and the employer pays all of it. The default is the all-industry average.',

    'income.takehome.result.take.k': 'Monthly take-home pay',
    'income.takehome.result.take.k.noNhi':
      'After Labor Insurance, voluntary pension and income tax (before NHI premium)',
    'income.takehome.result.take.sub': '{pct} of your monthly salary',
    'income.takehome.group.worker': 'Deducted from your pay',
    'income.takehome.row.lab': 'Labor Insurance (your share)',
    'income.takehome.row.emp': 'Employment Insurance (your share)',
    'income.takehome.row.pen': 'Voluntary pension contribution',
    'income.takehome.row.nhi': 'National Health Insurance',
    'income.takehome.row.tax': 'Income tax (monthly average)',
    'income.takehome.row.ded': 'Total deductions',
    'income.takehome.row.take': 'Monthly take-home pay',
    'income.takehome.unset.nhi': 'Not entered',
    'income.takehome.unset.tax': 'Not estimated',
    'income.takehome.noNhi':
      'The National Health Insurance premium is not deducted yet.',

    'income.takehome.group.employer': 'Paid by your employer on top',
    'income.takehome.row.eLab': 'Labor Insurance',
    'income.takehome.row.eEmp': 'Employment Insurance',
    'income.takehome.row.eOcc': 'Occupational accident insurance',
    'income.takehome.row.ePen': 'Labor Pension contribution (at least 6%)',
    'income.takehome.row.eTotal': 'Employer contributions in total',
    'income.takehome.row.eCost': 'Employer cost per month',
    'income.takehome.employer.note':
      'Employer cost is your monthly salary plus the employer contributions above. It leaves out the employer share of National Health Insurance.',

    'income.takehome.group.annual': 'Whole year',
    'income.takehome.row.gross': 'Gross pay for the year',
    'income.takehome.row.annualTake': 'Take-home pay for the year',

    'income.takehome.chart.bar1.title':
      'Take-home pay is {pct} of your monthly salary',
    'income.takehome.chart.bar2.title':
      'Your employer pays {pct} of your monthly salary on top of it (before the employer share of NHI)',
    'income.takehome.chart.bar1.aria':
      'Where your monthly salary goes: take-home {take}, Labor and Employment Insurance {ins}, voluntary pension {pen}, health insurance {nhi}, income tax {tax}.',
    'income.takehome.chart.bar2.aria':
      'What your employer pays in total: your salary {wage}, employer Labor and Employment Insurance {ins}, occupational accident insurance {occ}, pension contribution {pen}. The employer share of National Health Insurance is not included.',
    'income.takehome.legend.w-take': 'Take-home',
    'income.takehome.legend.w-ins': 'Labor and Employment Insurance',
    'income.takehome.legend.w-pen': 'Voluntary pension',
    'income.takehome.legend.w-nhi': 'Health insurance',
    'income.takehome.legend.w-tax': 'Income tax',
    'income.takehome.legend.e-wage': 'Your salary',
    'income.takehome.legend.e-ins': 'Employer Labor and Employment Insurance',
    'income.takehome.legend.e-occ': 'Occupational accident',
    'income.takehome.legend.e-pen': 'Pension (6%)',

    'income.takehome.gradeNote':
      'Labor and Employment Insurance are charged on the insured salary bracket ({insured}) and the pension on the contribution wage bracket ({contrib}). Both come from 2026 bracket tables, so they can differ from your actual salary.',
    'income.takehome.taxNote':
      'The income tax is an estimate for a single filer on salary income only, using the amounts announced for tax year 2026 (ROC year 115). The basic living expense amount for that year has not been announced and is left out.',

    'income.takehome.page.metaTitle':
      'Take-home pay calculator 2026: Taiwan insurance and tax',
    'income.takehome.page.metaDescription':
      'Enter a monthly salary to see take-home pay after Labor Insurance, pension and tax. NT$45,000 with a 1.5-month bonus gives NT$43,257, before NHI.',
    'income.takehome.page.intro':
      'Enter your monthly salary and see what is deducted for Labor Insurance, Employment Insurance, voluntary pension and income tax, and what your employer pays on top.',
    'income.takehome.page.reading':
      "The big number is what lands in your account each month using 2026 rates, before the National Health Insurance premium unless you enter it. The first bar splits your salary into take-home and deductions. The second bar shows your employer's full cost, which is your salary plus the insurance and pension the employer pays for you. Health insurance is left out unless you enter it.",
    'income.takehome.page.method':
      'Insured salary: your monthly salary is matched to the 2026 Labor Insurance bracket table (11 brackets, NT$29,500 to NT$45,800), and to a separate 62-bracket pension table.\nLabor Insurance is the insured salary times 11.5%, and Employment Insurance is the insured salary times 1%. Workers pay 20%, employers 70% and the government 10%. Each item is rounded to the nearest NT$1.\nOccupational accident insurance uses the all-industry average rate of 0.21% by default, on its own bracket table up to NT$72,800, and the employer pays all of it.\nThe employer pension contribution is 6% of the contribution wage. Your voluntary contribution is the rate you choose, up to 6%, on the same wage.\nIncome tax: annual salary is monthly salary times (12 plus bonus months), less your voluntary pension for the year. The tax is worked out for a single filer with the standard deduction, the salary special deduction and the exemptions for the dependents you enter, using tax year 2026 (ROC year 115) amounts. The estimated annual tax is divided by 12.\nThe 2027 insurance rate has been announced but the 2027 bracket tables have not, so this tool stays on 2026.',
    'income.takehome.page.sources':
      'Bureau of Labor Insurance 2026 premium tables, bracket tables and pension contribution brackets; Ministry of Labor occupational accident rate notice; Ministry of Finance notice of tax year 2026 amounts. Checked 2026-11-10.',
    'income.takehome.page.source1.label':
      'Bureau of Labor Insurance: 2026 premium share table',
    'income.takehome.page.source1.url': 'https://www.bli.gov.tw/Files/25696',
    'income.takehome.page.source2.label':
      'Bureau of Labor Insurance: 2026 insured salary brackets',
    'income.takehome.page.source2.url': 'https://www.bli.gov.tw/Files/25661',
    'income.takehome.page.source3.label':
      'Ministry of Labor: occupational accident insurance rates',
    'income.takehome.page.source3.url':
      'https://www.mol.gov.tw/1607/1632/1633/76836/',
    'income.takehome.page.source4.label':
      'Bureau of Labor Insurance: 2026 pension contribution brackets',
    'income.takehome.page.source4.url': 'https://www.bli.gov.tw/Files/25709',
    'income.takehome.page.source5.label':
      'Bureau of Labor Insurance: Labor Pension basics (Article 14)',
    'income.takehome.page.source5.url': 'https://www.bli.gov.tw/0012933.html',
    'income.takehome.page.source6.label':
      'Executive Yuan Gazette: tax year 2026 amounts (announced 2025-11-27)',
    'income.takehome.page.source6.url':
      'https://gazette.nat.gov.tw/EG_FileManager/eguploadpub/eg031224/ch04/type3/gov30/num12/Eg.htm',
    'income.takehome.page.faq1.q':
      'How is my Labor Insurance premium worked out?',
    'income.takehome.page.faq1.a':
      'In 2026 the ordinary-risk rate is 11.5% for Labor Insurance, plus 1% for Employment Insurance. Workers pay 20% of each. The rate applies to your insured salary bracket, not your exact pay. At the top bracket of NT$45,800 you pay NT$1,053 and NT$92 a month.',
    'income.takehome.page.faq2.q':
      'Does my Labor Insurance premium keep rising above NT$45,800?',
    'income.takehome.page.faq2.a':
      "No. In 2026 the highest Labor Insurance bracket is NT$45,800, and any salary above NT$43,900 is counted as NT$45,800. Your share stays the same above that. The pension contribution wage goes up to NT$150,000 and occupational accident insurance to NT$72,800, so the employer's costs keep rising.",
    'income.takehome.page.faq3.q':
      'What does my employer pay besides my salary?',
    'income.takehome.page.faq3.a':
      'In 2026 the employer pays 70% of Labor Insurance and Employment Insurance, all of the occupational accident insurance (0.21% on average across industries) and at least 6% of your wage into your Labor Pension account. The employer also pays a share of National Health Insurance, which this tool does not include.',
    'income.takehome.page.faq4.q':
      'If I put in a voluntary pension contribution, do I pay less tax?',
    'income.takehome.page.faq4.a':
      'Yes. Your take-home pay falls by the amount you contribute, but up to 6% of your wage is not counted as taxable salary income for that year. For NT$45,000 a month with 1.5 bonus months, contributing 6% lowers monthly take-home pay (before NHI) from NT$43,257 to NT$40,646 and the estimated annual tax from NT$7,175 to NT$5,526 (tax year 2026).',
    'income.takehome.page.faq5.q':
      'Why is National Health Insurance not included?',
    'income.takehome.page.faq5.a':
      'Health insurance premiums are covered by the health topic. If you work out your premium there and enter it in the field next to it, it is deducted from your take-home pay. Otherwise the result says it is not included.',
    'income.takehome.disclaimer':
      'This estimate is for reference only and is not tax or financial advice. Actual amounts depend on the Bureau of Labor Insurance, the Ministry of Labor and the Ministry of Finance, and on your personal situation.',
    'income.takehome.sourcesLine':
      'Source: Bureau of Labor Insurance 2026 premium tables, Ministry of Labor, Ministry of Finance tax year 2026 amounts. Checked 2026-11-10.',
  },
  'zh-TW': {
    'income.takehome.field.wage': '月薪',
    'income.takehome.field.wage.hint': '扣款前的每月薪資，單位是元。',
    'income.takehome.field.bonus': '年終與獎金月數',
    'income.takehome.field.bonus.hint':
      '只算進全年合計與所得稅估算。這裡的勞保與勞退只看月薪。',
    'income.takehome.field.selfRate': '勞退自提率（%）',
    'income.takehome.field.selfRate.hint':
      '0 到 6%，以月提繳工資計算。自提的部分，當年度不計入薪資所得課稅。',
    'income.takehome.field.nhi': '健保自付額（選填）',
    'income.takehome.field.nhi.hint':
      '你自己每月要繳的健保費，單位是元。不填就不計入。',
    'income.takehome.nhi.link': '前往健保費試算',
    'income.takehome.nhi.note':
      '健保費請用醫療專題的健保費試算算出後填入，本工具不計算健保費。',
    'income.takehome.more.summary': '所得稅估算與其他設定',
    'income.takehome.field.dependents': '一般扶養人數',
    'income.takehome.field.dependents.hint':
      '只用在所得稅估算。估算以單身、標準扣除額計算。',
    'income.takehome.field.withTax': '估算綜合所得稅',
    'income.takehome.field.withTax.hint':
      '把估算的全年稅額平均分攤到 12 個月。',
    'income.takehome.field.occRate': '職災保險費率（%）',
    'income.takehome.field.occRate.hint':
      '各行業費率不同，由雇主全額負擔。預設是各行業平均。',

    'income.takehome.result.take.k': '每月實領',
    'income.takehome.result.take.k.noNhi':
      '扣勞保、勞退自提與所得稅後（未含健保費）',
    'income.takehome.result.take.sub': '占月薪的 {pct}',
    'income.takehome.group.worker': '你這邊被扣的',
    'income.takehome.row.lab': '勞保自付',
    'income.takehome.row.emp': '就保自付',
    'income.takehome.row.pen': '勞退自提',
    'income.takehome.row.nhi': '健保',
    'income.takehome.row.tax': '所得稅（月均攤）',
    'income.takehome.row.ded': '合計扣除',
    'income.takehome.row.take': '每月實領',
    'income.takehome.unset.nhi': '未填',
    'income.takehome.unset.tax': '未估算',
    'income.takehome.noNhi': '健保費還沒扣。',

    'income.takehome.group.employer': '雇主另外付的',
    'income.takehome.row.eLab': '勞保',
    'income.takehome.row.eEmp': '就保',
    'income.takehome.row.eOcc': '職災保險',
    'income.takehome.row.ePen': '勞退提繳（至少 6%）',
    'income.takehome.row.eTotal': '雇主負擔合計',
    'income.takehome.row.eCost': '雇主每月總成本',
    'income.takehome.employer.note':
      '雇主總成本是月薪加上面這些雇主負擔，未含雇主負擔的健保費。',

    'income.takehome.group.annual': '全年',
    'income.takehome.row.gross': '稅前全年總薪資',
    'income.takehome.row.annualTake': '全年實領',

    'income.takehome.chart.bar1.title': '實領占月薪的 {pct}',
    'income.takehome.chart.bar2.title':
      '雇主另外多付的，相當於月薪的 {pct}（未含雇主負擔的健保費）',
    'income.takehome.chart.bar1.aria':
      '你的月薪去哪裡：實領 {take}、勞保與就保 {ins}、勞退自提 {pen}、健保 {nhi}、所得稅 {tax}。',
    'income.takehome.chart.bar2.aria':
      '雇主為你付出的總成本：月薪 {wage}、雇主勞保與就保 {ins}、職災保險 {occ}、勞退提繳 {pen}。未含雇主負擔的健保費。',
    'income.takehome.legend.w-take': '實領',
    'income.takehome.legend.w-ins': '勞保與就保',
    'income.takehome.legend.w-pen': '勞退自提',
    'income.takehome.legend.w-nhi': '健保',
    'income.takehome.legend.w-tax': '所得稅',
    'income.takehome.legend.e-wage': '月薪',
    'income.takehome.legend.e-ins': '雇主勞保與就保',
    'income.takehome.legend.e-occ': '職災',
    'income.takehome.legend.e-pen': '勞退 6%',

    'income.takehome.gradeNote':
      '勞保與就保依投保薪資（{insured}）計算，勞退依月提繳工資（{contrib}）計算。兩者都對應 2026 年的分級表，級距可能跟你的實際月薪不同。',
    'income.takehome.taxNote':
      '所得稅是估算，以單身、只有薪資所得計，採用 115 年度（2026 年所得）已公告的金額。該年度的基本生活費尚未公告，沒有納入。',

    'income.takehome.page.metaTitle':
      '實領薪資試算 2026：勞保、勞退、所得稅後每月拿多少',
    'income.takehome.page.metaDescription':
      '輸入月薪，算出扣掉勞保、就保、勞退自提與所得稅後的每月實領，也列出雇主另付的成本。月薪 4.5 萬、年終 1.5 個月，實領約 43,257 元，未含健保費。',
    'income.takehome.page.intro':
      '輸入月薪，看勞保、就保、勞退自提和所得稅各扣多少，每月實領多少，還有雇主另外替你付了多少。',
    'income.takehome.page.reading':
      '大數字是 2026 年費率下，每月實際入帳的金額，健保費沒填的話還沒扣。第一條圖把你的月薪分成實領和各項扣款。第二條圖是雇主的總成本，也就是月薪加上雇主替你付的保險與勞退。',
    'income.takehome.page.method':
      '投保薪資：月薪會對應到 2026 年勞保投保薪資分級表（共 11 級，29,500 元到 45,800 元），勞退另有一張 62 級的月提繳分級表。\n勞保費是投保薪資乘 11.5%，就保費是投保薪資乘 1%，勞工負擔 20%、雇主 70%、政府 10%，每一項各自四捨五入到元。\n職災保險預設用各行業平均費率 0.21%，另有自己的分級表，最高 72,800 元，全部由雇主負擔。\n雇主勞退提繳是月提繳工資的 6%，你的自提是你選的比率，最高 6%，用同一個工資計算。\n所得稅：全年薪資收入是月薪乘（12 加獎金月數），再扣掉全年勞退自提。稅額以單身、標準扣除額、薪資所得特別扣除額，加上你填的一般扶養人數的免稅額計算，採用 115 年度（2026 年所得）的已公告金額。估算的全年稅額除以 12 就是月均攤。\n2027 年的保險費率已經公告，但 2027 年的分級表還沒公告，所以本工具仍以 2026 年計算。',
    'income.takehome.page.sources':
      '勞保局 2026 年保險費分擔金額表、投保薪資分級表與勞退月提繳分級表，勞動部職災保險費率公告，財政部 115 年度金額公告。資料查證日期 2026-11-10。',
    'income.takehome.page.source1.label': '勞保局：115 年保險費分擔金額表',
    'income.takehome.page.source1.url': 'https://www.bli.gov.tw/Files/25696',
    'income.takehome.page.source2.label':
      '勞保局：115 年勞工保險投保薪資分級表',
    'income.takehome.page.source2.url': 'https://www.bli.gov.tw/Files/25661',
    'income.takehome.page.source3.label': '勞動部：職災保險行業別費率公告',
    'income.takehome.page.source3.url':
      'https://www.mol.gov.tw/1607/1632/1633/76836/',
    'income.takehome.page.source4.label': '勞保局：115 年勞退月提繳分級表',
    'income.takehome.page.source4.url': 'https://www.bli.gov.tw/Files/25709',
    'income.takehome.page.source5.label':
      '勞保局：勞工退休金制度說明（條例第 14 條）',
    'income.takehome.page.source5.url': 'https://www.bli.gov.tw/0012933.html',
    'income.takehome.page.source6.label':
      '行政院公報：115 年度金額公告（2025-11-27）',
    'income.takehome.page.source6.url':
      'https://gazette.nat.gov.tw/EG_FileManager/eguploadpub/eg031224/ch04/type3/gov30/num12/Eg.htm',
    'income.takehome.page.faq1.q': '勞保自付額怎麼算？',
    'income.takehome.page.faq1.a':
      '2026 年勞保普通事故費率是 11.5%，另外加就業保險 1%，勞工各自負擔 20%。費率乘的是投保薪資級距，跟你的實際月薪可能有出入。投保薪資在最高一級 45,800 元時，每月勞保自付 1,053 元，就保自付 92 元。',
    'income.takehome.page.faq2.q': '月薪超過 45,800 元，勞保費還會增加嗎？',
    'income.takehome.page.faq2.a':
      '不會。2026 年勞保投保薪資最高一級是 45,800 元，月薪超過 43,900 元都算 45,800 元，再往上你自付的勞保費就不變。不過勞退的月提繳工資最高到 150,000 元，職災保險最高到 72,800 元，雇主的負擔還會繼續增加。',
    'income.takehome.page.faq3.q': '雇主除了薪水還要付什麼？',
    'income.takehome.page.faq3.a':
      '2026 年雇主要負擔勞保與就保的 70%、全部的職災保險（各行業平均費率 0.21%），還有至少 6% 的工資提繳到你的勞退帳戶。雇主也要負擔一部分健保費，本工具沒有算進去。',
    'income.takehome.page.faq4.q': '勞退自提會讓實領變少，但稅也變少嗎？',
    'income.takehome.page.faq4.a':
      '會。你的實領會減少自提的金額，但工資 6% 以內的自提，當年度不計入薪資所得課稅。以月薪 45,000 元、年終 1.5 個月為例，自提 6% 後，每月實領（未含健保費）從 43,257 元降到 40,646 元，估算的全年所得稅從 7,175 元降到 5,526 元（115 年度稅制）。',
    'income.takehome.page.faq5.q': '為什麼這裡沒有算健保費？',
    'income.takehome.page.faq5.a':
      '健保費歸醫療專題處理。你可以先用那邊的健保費試算算出金額，再填進旁邊的欄位，這裡就會從實領裡扣掉。沒填的話，結果會註明未含健保費。',
    'income.takehome.disclaimer':
      '試算結果僅供參考，不構成稅務或財務建議。實際金額以勞保局、勞動部與財政部的核定為準，也會因個人情況而不同。',
    'income.takehome.sourcesLine':
      '資料來源：勞保局 2026 年保險費分擔金額表、勞動部、財政部 115 年度金額公告。查證日期 2026-11-10。',
  },
};
