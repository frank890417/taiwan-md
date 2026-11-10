/** 薪資位置自查：文案（zh-TW／en）。資料：主計總處 2024 年（民國 113 年）全年總薪資分布。 */
const P = 'income.percentile.';

const NEWS = 'https://www.stat.gov.tw/News_Content.aspx?n=2716&s=235514';
const PDF =
  'https://ws.dgbas.gov.tw/001/Upload/463/relfile/10980/235514/113%E5%B9%B4%E5%8F%97%E5%83%B1%E5%93%A1%E5%B7%A5%E8%96%AA%E8%B3%87%E4%B8%AD%E4%BD%8D%E6%95%B8%E7%B5%B1%E8%A8%88%E7%B5%90%E6%9E%9C%E6%96%B0%E8%81%9E%E7%A8%BF.pdf';
const XLSX =
  'https://ws.dgbas.gov.tw/001/Upload/463/relfile/10980/235514/%E8%A1%A82%E3%80%80%E5%B7%A5%E6%A5%AD%E5%8F%8A%E6%9C%8D%E5%8B%99%E6%A5%AD%E5%8D%81%E7%AD%89%E5%88%86%E4%BD%8D%E7%B5%84%E5%88%86%E7%95%8C%E9%BB%9E%E4%B9%8B%E5%85%A8%E5%B9%B4%E7%B8%BD%E8%96%AA%E8%B3%87%EF%BC%8D%E5%85%A8%E9%AB%94%E5%8F%97%E5%83%B1%E5%93%A1%E5%B7%A5.xlsx';
const DEF =
  'https://www.stat.gov.tw/News_NoticeCalendar_Content.aspx?Ln=1&MetaI_D=1626';

function prefix(d: Record<string, string>): Record<string, string> {
  return Object.fromEntries(Object.entries(d).map(([k, v]) => [P + k, v]));
}

const en = prefix({
  title: 'Salary percentile checker',
  description:
    'Enter your total annual pay to see where you stand among Taiwan employees, using 2024 DGBAS data.',
  'field.salary': 'Total annual pay (before tax)',
  'field.salary.hint':
    'Before tax, including year-end and other bonuses and overtime pay. Not your monthly pay times 12.',
  'legend.you': 'Your pay',
  'legend.compare': 'Optional: compare with your group',
  'field.age': 'Age group',
  'field.industry': 'Industry',
  'field.sex': 'Sex',
  'option.none': 'Not selected',
  'headline.k': 'Where you stand among all employees',
  'row.all': 'Median, all employees',
  'row.domestic': 'Median, Taiwanese full-time employees',
  'row.group': '{field}: {label}',
  'row.quartile.hint':
    'Q1 is the amount a quarter of employees earn less than; Q3 is the amount three quarters earn less than.',
  'value.pct': 'Around percentile {n}',
  'value.below': 'Within the bottom 10%',
  'value.above': 'Within the top 10%',
  'sub.above': '{amount} ({pct}) above the all-employee median of {median}',
  'sub.below': '{amount} ({pct}) below the all-employee median of {median}',
  'sub.equal': 'Exactly the all-employee median of {median}',
  'edge.below':
    'Your pay is below the official first decile (D1), {bp}. DGBAS publishes nothing finer than deciles, so no percentile number is given.',
  'edge.above':
    'Your pay is above the official ninth decile (D9), {bp}. DGBAS publishes nothing finer than deciles, so no percentile number is given.',
  'band.below-q1': 'Below Q1',
  'band.q1-median': 'Between Q1 and the median',
  'band.median-q3': 'Between the median and Q3',
  'band.above-q3': 'Q3 or above',
  nodata: 'No data',
  'scale.caption':
    'Official decile breakpoints D1 to D9 for all employees, 2024 (NT$ thousands). Each step covers 10% of employees.',
  'scale.you': 'You: {amount}',
  'scale.below': 'Below D1',
  'scale.above': 'Above D9',
  'scale.aria': 'Decile scale. Your annual pay of {amount} is placed: {place}.',
  'note.interp':
    'The percentile is estimated by straight-line interpolation between official breakpoints. It is not an official figure.',
  'note.scope':
    'Basis: 2024 (ROC year 113) data. It covers foreign migrant workers and part-time employees, and excludes civil servants, staff of schools from primary level up, agriculture, forestry, fishing and animal husbandry, and the self-employed. Amounts are before tax.',
  'note.update':
    'DGBAS has not yet published the 2025 (ROC year 114) edition. This tool will be updated once it is out.',
  'link.companies': 'Pay by industry and company',
  'link.companies.desc': 'See how pay differs across industries and employers.',
  'page.metaTitle': 'Taiwan salary percentile checker (2024 data)',
  'page.metaDescription':
    'Enter your annual pay to see your percentile among Taiwan employees using 2024 DGBAS data. The all-employee median is NT$546,000 a year.',
  'page.intro':
    'This tool estimates where your total annual pay falls among Taiwan employees in industry and services, using DGBAS 2024 data.',
  'page.reading':
    'The big number is your estimated percentile among all employees: around percentile 60 means about 60% of employees earn less than you. The subtitle shows how far you are from the all-employee median. The scale shows your place between the official decile breakpoints. Below the scale, the median rows show how you compare with Taiwanese full-time employees and with the age group, industry and sex you chose.',
  'page.method':
    'DGBAS publishes the pay at each decile (D1 to D9) and at the first and third quartiles for all employees. Between two neighbouring official breakpoints, this tool assumes employees are spread evenly along the pay range and interpolates in a straight line, then rounds to a whole percentile.\nBelow D1 or above D9 there is no official bound, so no percentile is shown.\nFor the Taiwanese full-time group and for the age, industry and sex groups, DGBAS gives only the first quartile, median and third quartile. The tool therefore only tells you which segment you fall in, not a percentile.\nPay means total annual pay before tax: regular pay plus year-end bonuses, other bonuses, employee profit sharing and overtime pay.',
  'page.sources':
    'Directorate-General of Budget, Accounting and Statistics (DGBAS), Executive Yuan: results on the median and distribution of annual total earnings of employees in industry and services, 2024 (ROC year 113), published 2025-11-25. The 2025 edition had not been published as of 2026-11-10.',
  'page.source1.label':
    'DGBAS press release: 2024 median and distribution of annual total earnings (web page)',
  'page.source1.url': NEWS,
  'page.source2.label': 'Press release (PDF), including definitions and scope',
  'page.source2.url': PDF,
  'page.source3.label': 'Table 2: decile breakpoints, all employees (xlsx)',
  'page.source3.url': XLSX,
  'page.source4.label': 'DGBAS release calendar: statistical definitions',
  'page.source4.url': DEF,
  'page.faq1.q': 'What is the median annual pay in Taiwan?',
  'page.faq1.a':
    'In 2024 (ROC year 113), the median total annual pay of all employees in industry and services was NT$546,000. For Taiwanese full-time employees only it was NT$585,000. These are DGBAS figures published on 2025-11-25.',
  'page.faq2.q': 'Why is the median lower than the average?',
  'page.faq2.a':
    'The 2024 average was NT$732,000 against a median of NT$546,000. A small number of very high earners pulls the average up, while the median only looks at the person in the middle. DGBAS data shows about 68.75% of employees earned less than the average.',
  'page.faq3.q': 'How much do I need to earn to be in the top 10%?',
  'page.faq3.a':
    'Among all employees in 2024, total annual pay above NT$1,336,000 (the ninth decile, D9) puts you in the top 10%. DGBAS does not publish deciles for Taiwanese full-time employees alone, so this threshold includes migrant workers and part-time employees.',
  'page.faq4.q': 'Who is included in this statistic, and who is not?',
  'page.faq4.a':
    'It covers paid employees of establishments in industry and services: Taiwanese and foreign, full-time and part-time. It excludes agriculture, forestry, fishing and animal husbandry, government agencies, schools from primary level up, religious and professional organisations, the self-employed and employers. People who worked fewer than 30 days in the year are left out, and Kinmen and Lienchiang are not covered.',
  'page.faq5.q': 'How do I turn my monthly pay into total annual pay?',
  'page.faq5.a':
    'Add up everything you are paid in a year before tax: twelve months of pay, year-end and festival bonuses, performance bonuses, employee profit sharing and overtime pay. Leave out dividends, interest, side income, rent, and the insurance and pension your employer pays on top. For example, NT$50,000 a month plus a two-month year-end bonus and no overtime comes to NT$50,000 x 14 = NT$700,000.',
  'page.faq6.q': 'Why is there no finer percentile than deciles?',
  'page.faq6.a':
    'DGBAS publishes only deciles (D1 to D9) and the first and third quartiles. This tool estimates the percentile between neighbouring breakpoints assuming an even spread, so the result is an interpolated estimate and not an official number. Beyond D1 and D9 there is no official bound; the top tail keeps stretching, so the tool gives no number there.',
  disclaimer:
    "This estimate is for reference only and is not tax or financial advice. Figures come from the Directorate-General of Budget, Accounting and Statistics (DGBAS) for 2024 (ROC year 113). The percentile is this tool's interpolation; the official distribution is as published by DGBAS.",
  sourcesLine:
    'Source: DGBAS, annual total earnings of employees in industry and services, 2024 (ROC year 113), published 2025-11-25.',
});

const zh = prefix({
  title: '薪資位置自查',
  description:
    '輸入全年總薪資，對照 2024 年主計總處的受僱員工薪資分布，看你落在第幾百分位。',
  'field.salary': '全年總薪資（稅前）',
  'field.salary.hint': '稅前、含年終與獎金、含加班費，不是月薪乘以 12。',
  'legend.you': '你的薪資',
  'legend.compare': '選填：跟同類的人比',
  'field.age': '年齡組',
  'field.industry': '行業',
  'field.sex': '性別',
  'option.none': '不選',
  'headline.k': '你在全體受僱員工中的位置',
  'row.all': '全體受僱員工中位數',
  'row.domestic': '本國籍全時員工中位數',
  'row.group': '{field}：{label}',
  'row.quartile.hint':
    'Q1 是四分之一的人低於它的金額，Q3 是四分之三的人低於它的金額。',
  'value.pct': '約第 {n} 百分位',
  'value.below': '在後 10% 以內',
  'value.above': '在前 10% 以內',
  'sub.above': '比全體中位數 {median} 高 {amount}（高 {pct}）',
  'sub.below': '比全體中位數 {median} 低 {amount}（低 {pct}）',
  'sub.equal': '剛好等於全體中位數 {median}',
  'edge.below':
    '你的薪資低於官方第 1 十分位數（D1）{bp}。主計總處沒有公布更細的分位，所以這裡不給百分位數字。',
  'edge.above':
    '你的薪資高於官方第 9 十分位數（D9）{bp}。主計總處沒有公布更細的分位，所以這裡不給百分位數字。',
  'band.below-q1': '低於 Q1',
  'band.q1-median': 'Q1 到中位數之間',
  'band.median-q3': '中位數到 Q3 之間',
  'band.above-q3': 'Q3 以上',
  nodata: '沒有資料',
  'scale.caption':
    '2024 年全體受僱員工的官方十分位數 D1 到 D9（單位：萬元），每一格代表一成的人。',
  'scale.you': '你：{amount}',
  'scale.below': 'D1 以下',
  'scale.above': 'D9 以上',
  'scale.aria': '十分位刻度條。你的年薪 {amount}，位置：{place}。',
  'note.interp': '百分位是在官方分界點之間用線性內插估計的結果，不是官方數字。',
  'note.scope':
    '口徑：2024 年（民國 113 年）資料。含外籍移工與部分工時員工，不含公務員、小學以上各級學校教職員、農林漁牧業與自營作業者。金額為稅前。',
  'note.update':
    '主計總處 2025 年（民國 114 年）版還沒有發布，新版發布後更新。',
  'link.companies': '行業薪資與公司',
  'link.companies.desc': '看不同行業與公司的薪資差多少。',
  'page.metaTitle': '年薪百分位查詢：我的薪水贏過多少人（2024）',
  'page.metaDescription':
    '輸入全年總薪資，對照主計總處 2024 年受僱員工薪資分布，看你落在第幾百分位，也能比年齡、行業與性別。全體年薪中位數 54.6 萬元，資料為工業及服務業。',
  'page.intro':
    '用主計總處 2024 年的資料，估計你的全年總薪資在台灣工業及服務業受僱員工裡排第幾。',
  'page.reading':
    '大數字是你在全體受僱員工中的估計百分位。第 60 百分位的意思是，大約有六成的受僱員工薪水比你低。副行告訴你跟全體中位數差多少。刻度條顯示你落在官方十分位分界點之間的哪裡。下方的中位數列，則讓你看跟本國籍全時員工，以及你選的年齡組、行業、性別比起來落在哪一段。',
  'page.method':
    '主計總處公布全體受僱員工全年總薪資的十分位數（D1 到 D9）與第 1、第 3 四分位數。兩個相鄰的官方分界點之間，本工具假設人數沿著薪資平均分布，用直線內插估計百分位，再四捨五入到整數。\n低於 D1 或高於 D9 的部分官方沒有上下界，所以不顯示百分位。\n本國籍全時員工，以及年齡、行業、性別各組，官方只公布第 1 四分位數、中位數與第 3 四分位數。這幾列因此只告訴你落在哪一段，不給百分位。\n這裡的薪資指稅前全年總薪資，包含經常性薪資、年終獎金、其他獎金、員工酬勞與加班費。',
  'page.sources':
    '行政院主計總處，工業及服務業受僱員工全年總薪資中位數及分布統計結果，113 年（2024 年）版，2025 年 11 月 25 日發布。截至 2026 年 11 月 10 日，114 年（2025 年）版尚未發布。',
  'page.source1.label':
    '主計總處新聞稿：113 年工業及服務業受僱員工全年總薪資中位數及分布（網頁）',
  'page.source1.url': NEWS,
  'page.source2.label': '新聞稿 PDF（含統計定義與範圍）',
  'page.source2.url': PDF,
  'page.source3.label': '表 2：全體受僱員工十等分位組分界點（xlsx）',
  'page.source3.url': XLSX,
  'page.source4.label': '主計總處預告發布時間表：統計資料項目說明',
  'page.source4.url': DEF,
  'page.faq1.q': '台灣年薪中位數是多少？',
  'page.faq1.a':
    '2024 年（民國 113 年），工業及服務業全體受僱員工的全年總薪資中位數是 54.6 萬元。只看本國籍全時員工是 58.5 萬元。這是主計總處 2025 年 11 月 25 日發布的數字。',
  'page.faq2.q': '為什麼中位數比平均數低？',
  'page.faq2.a':
    '2024 年的平均數是 73.2 萬元，中位數是 54.6 萬元。少數高薪的人金額很大，會把平均數往上拉，中位數只看排在正中間的那個人。官方資料顯示，約 68.75% 的受僱員工年薪低於平均數。',
  'page.faq3.q': '年薪多少算前 10%？',
  'page.faq3.a':
    '以 2024 年全體受僱員工來看，全年總薪資超過 133.6 萬元（第 9 十分位數 D9）就在前 10%。主計總處沒有單獨公布本國籍全時員工的十分位數，所以這個門檻包含外籍移工與部分工時員工。',
  'page.faq4.q': '這個統計包含哪些人、不包含哪些人？',
  'page.faq4.a':
    '包含工業及服務業場所單位僱用的領薪員工，本國籍與外國籍、全時與部分工時都算。不包含農林漁牧業、政府機關、小學以上各級學校、宗教與職業團體等僱用的員工，也不含自營作業者與雇主。全年工作未滿 30 日的人被排除，金門縣與連江縣不在統計範圍內。',
  'page.faq5.q': '我的月薪要怎麼換成全年總薪資？',
  'page.faq5.a':
    '把一年內領到的稅前薪資全部加起來：十二個月的月薪、年終與年節獎金、績效獎金、員工酬勞和加班費。股息、利息、兼職、租金收入，還有雇主另外負擔的保險費和退休金，都不要算進去。例如月薪 5 萬元，年終兩個月，沒有加班費，全年總薪資是 5 萬元乘以 14，等於 70 萬元。',
  'page.faq6.q': '為什麼沒有更細的百分位？',
  'page.faq6.a':
    '主計總處只公布十分位數（D1 到 D9）與第 1、第 3 四分位數。本工具在相鄰兩個分界點之間假設人數平均分布來估計，所以結果是內插估計，不是官方數字。低於 D1 或高於 D9 的部分官方沒有上下界，最高薪的一端一路延伸下去，所以那裡不給數字。',
  disclaimer:
    '試算結果僅供參考，不構成稅務或財務建議。數字出自行政院主計總處 2024 年（民國 113 年）統計，百分位是本工具的內插估計，實際分布以主計總處公布為準。',
  sourcesLine:
    '資料：行政院主計總處，工業及服務業受僱員工全年總薪資，113 年（2024 年）版，2025 年 11 月 25 日發布。',
});

export const toolPercentile = {
  en,
  'zh-TW': zh,
};
