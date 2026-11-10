/**
 * housing-toolpages.ts：房地產專題四個試算工具「單獨網址頁」的文案。
 *
 * 範圍：標題、描述、計算方式、結果怎麼讀、常見問題、相關連結的錨點文字、內嵌板來源行。
 * 工具本體（欄位、結果、免責聲明、資料來源清單）的文案在 src/i18n/housing.ts，這裡不重寫。
 *
 * 語言：zh-TW 與 en 完整；其他語言一律回 en（跟頁面薄殼 13 語共用同一份模板）。
 * 佔位符 {name} 一律由 src/utils/housing/toolpage-facts.ts 在建置時從
 * src/data/housing/*.json 與 mortgage.ts、qingan.ts 算出再填入，本檔不寫任何會過期的數字。
 * 純 TypeScript、不 import 任何東西，node --experimental-strip-types 可以直接載入。
 *
 * 書寫紀律：MANIFESTO §11（zh 無破折號、無對位句型、不中英夾雜）。
 */

export interface ToolFaq {
  q: string;
  a: string;
}

export interface ToolPageText {
  /** 頁面 H1。 */
  h1: string;
  metaTitle: string;
  metaDescription: string;
  /** 計算方式的開頭一段（公式與假設的文字版）。 */
  howItWorks: string;
  /** 結果怎麼讀，每個元素一段。 */
  reading: string[];
  faq: ToolFaq[];
}

export interface HousingToolPages {
  common: {
    /** 單獨頁的工具外框標題（H1 之下的小標，不重複工具名）。 */
    frameTitle: string;
    /** 內嵌板底部一行資料來源，{agencies} 機關名、{asOf} 截止日。 */
    embedSourceNote: string;
    relatedTools: string;
    relatedQingan: string;
    relatedOtherTool: string;
    relatedArticleJustice: string;
    relatedArticleNational: string;
    /** 範例銀行名稱（合作金庫商業銀行）。 */
    aprBankName: string;
    /** 房價上限清單裡「其他縣市」的說法。 */
    capOther: string;
    /** 青安利率基準（郵局定儲）的名稱。 */
    benchmarkName: string;
  };
  mortgage: ToolPageText;
  affordability: ToolPageText;
  qingan: ToolPageText;
  rentBuy: ToolPageText;
}

const zh: HousingToolPages = {
  common: {
    frameTitle: '輸入你的條件',
    embedSourceNote: '{agencies}，截至 {asOf}',
    relatedTools: '房貸與購屋試算工具集',
    relatedQingan: '青安貸款：三代條件、利率與各方說法',
    relatedOtherTool: '同一組工具：{title}',
    relatedArticleJustice: '居住正義：社會住宅如何成為長期公共制度',
    relatedArticleNational: '國宅與居住正義',
    capOther: '其他縣市',
    aprBankName: '合作金庫商業銀行',
    benchmarkName: '中華郵政二年期定期儲金（額度未達 500 萬元）機動利率',
  },

  mortgage: {
    h1: '房貸試算 2026',
    metaTitle: '房貸試算 2026：本息、本金、寬限期與青安 3.0',
    metaDescription:
      '輸入貸款金額、年限與利率，算出每月還款、總利息與還款曲線。內建青安 3.0 階梯利率（{rateFirst} 起），支援寬限期與提前還款，截至 {asOf}。',
    howItWorks:
      '本息平均攤還的月付 = 本金 × 月利率 × (1 + 月利率)^期數 ÷ ((1 + 月利率)^期數 − 1)，月利率取年利率除以 12。本金平均攤還每月還本 = 餘額 ÷ 剩餘期數，利息隨餘額遞減。寬限期內只繳利息，寬限期結束或利率變動的那一期，依當時餘額與剩餘期數重算月付。',
    reading: [
      '結果分成三塊：月付金、總利息與還款曲線。月付金會隨利率階梯與寬限期結束而改變，請看月付階梯表每一段的金額。總利息等於全部還款減去本金，年限越長、寬限期越長，總利息通常越高。',
      '情境切到「一般房貸」可以和青安 3.0 疊在同一張圖比較。試算只算本金與利息，開辦費、帳管費等費用不在內。',
    ],
    faq: [
      {
        q: '寬限期內要還多少？',
        a: '寬限期內只繳利息，本金不動。以 {amount}、{years} 年、寬限期 {graceYears} 年、青安 3.0 階梯利率試算，寬限期內每月 {graceStart}到 {graceEnd}，利率隨階梯上調；寬限期結束後第一期 {afterGrace}，全程最高月付 {maxPay}。寬限期把還本金的時間往後移，總利息不會因此變少。',
      },
      {
        q: '本息平均和本金平均差在哪？',
        a: '以 {amount}、{years2} 年、年利率 {rate}（內政部 {period}房價負擔能力統計採用的利率）、無寬限期試算。本息平均每月固定 {annuityPay}，總利息 {annuityInterest}；本金平均第 1 個月 {equalFirst}，逐月遞減到最後一個月 {equalLast}，總利息 {equalInterest}。本金平均前期月付較高、總利息較少，本息平均每月金額固定，比較好編預算。',
      },
      {
        q: '提前還款選縮短年限還是降低月付？',
        a: '以 {amount}、{years2} 年、年利率 {rate}、第 {prepayYear} 年底提前還 {prepayAmount}試算。縮短年限：月付維持 {basePay}，{shortenPayoff}後還清，總利息 {shortenInterest}。降低月付：期數不變，月付降到 {reducePay}，總利息 {reduceInterest}。未提前還款的總利息是 {baseInterest}。同樣的金額，縮短年限省下的利息較多，降低月付則讓每月現金壓力變小。',
      },
      {
        q: '青安 3.0 的利率之後會怎麼變？',
        a: '青安 3.0 目前是一段式機動利率，基準為{benchmarkName} {benchmark}%，加碼 {spread}%，補貼前利率 {baseRate}%。政府補貼從 {subsidyFirst} 個百分點起，前 {yearsFirst} 年實付 {rateFirst}，之後逐年減少補貼，依序是 {stepsText}，第 {fullFromYear} 年起回到 {baseRate}%。機動利率會隨基準利率調整，本站不預測。',
      },
      {
        q: '試算結果為什麼和銀行給的差一點？',
        a: '本站用年利率除以 12 的月利率逐期計算，內部不四捨五入，銀行則是逐期取整，加上實際撥款日、機動利率調整和各項費用，金額會有些許落差。以{aprBank}公開的青安貸款說明為例，{aprPrincipal}、{aprYears} 年的各項費用總金額 {aprFees}起，這些費用本工具沒有計入。實際月付以承貸銀行的核貸通知為準。',
      },
    ],
  },

  affordability: {
    h1: '房價負擔能力自查 2026',
    metaTitle: '房價負擔能力自查 2026：房貸負擔率與房價所得比',
    metaDescription:
      '輸入收入與房價，算出房貸負擔率與房價所得比，對照內政部分級。{period}全國房貸負擔率 {burden}、房價所得比 {p2i} 倍，附 {countyCount} 縣市數字。',
    howItWorks:
      '房貸負擔率 = 月付金 ÷ 月收入；房價所得比 = 房屋總價 ÷ 家庭年收入；月付金用本息平均攤還計算。四級門檻出自內政部不動產資訊平台公布的分級備註。官方縣市數字用{period}的中位數價格與中位數所得推算。',
    reading: [
      '房貸負擔率越高，代表每月收入中拿去還房貸的比例越高。結果會對照內政部的四級分類與全國官方數字，並列出各縣市的官方值供比較。',
      '房價所得比用倍數表示，數字越大代表同樣的收入要累積更多年才買得起。官方模式使用統計機關的假設，自訂模式則用你輸入的價格、收入、頭期款與年限。',
    ],
    faq: [
      {
        q: '房貸負擔率多少算合理？',
        a: '內政部把貸款負擔率分成四級：未滿 {band1}% 為「{name1}」，{band1}% 到未滿 {band2}% 為「{name2}」，{band2}% 到未滿 {band3}% 為「{name3}」，{band3}% 以上為「{name4}」。{period}全國數字是 {burden}，落在「{nationBand}」。這是統計上的分級，個人實際能否負擔，還要看其他負債與生活支出。',
      },
      {
        q: '官方的負擔率怎麼算？',
        a: '內政部用 {officialYears} 年期、本利均等攤還、貸款成數 {officialLtv}、利率 {officialRate}的條件，算出中位數價格住宅（{medianPrice}）的月付，再除以中位數家戶月可支配所得（年所得 {medianIncome}除以 12）。{period}全國結果是 {burden}。',
      },
      {
        q: '房價所得比是什麼？',
        a: '房價所得比是住宅總價除以家戶年可支配所得，單位是倍，代表要累積幾年的所得才買得起。{period}全國是 {p2i} 倍；官方表列的縣市中，最高是{maxName}（{maxP2i} 倍），最低是{minName}（{minP2i} 倍）。',
      },
      {
        q: '自己輸入的結果為什麼和官方數字不一樣？',
        a: '官方數字固定用中位數價格、中位數所得、{officialYears} 年期、貸款成數 {officialLtv} 與利率 {officialRate}。自訂模式讓你改成自己的價格、收入、頭期款、利率與年限，條件不同結果就不同。比較兩邊時，請先看年限與貸款成數是否一致。',
      },
    ],
  },

  qingan: {
    h1: '青安 3.0 資格自查 2026',
    metaTitle: '青安 3.0 資格自查 2026：年齡、所得與房價上限',
    metaDescription:
      '逐條比對青安 3.0 資格：年齡未滿 {maxAge} 歲、本人年所得 {income}以下、房價上限與限貸一次，附條文原文與額度上限，條件截至 {asOf}。',
    howItWorks:
      '工具把財政部公布的青安 3.0 辦理原則與問答拆成逐條規則，依你填的年齡、年所得、房屋總價、縣市與名下住宅狀況，各給出符合、不符合、需銀行審認或資料不足四種結果之一，並附條文原文。條文把判斷留給承貸銀行的項目，工具不下結論。',
    reading: [
      '每一條規則會顯示一個狀態與條文原文。「符合」代表依你填的資料達到條件，「需銀行審認」代表條文讓承貸銀行依實況判斷，工具只列原文。',
      '全部條件符合時，頁面會列出你這一類別的額度上限，並可以把額度與年限帶進房貸試算。是否核貸由承貸銀行審核決定。',
    ],
    faq: [
      {
        q: '青安 3.0 的年齡與所得限制？',
        a: '申貸時須成年且未滿 {maxAge} 歲，年齡加貸款年限不超過 {ageTerm}；借款人本人年所得不超過 {income}。年齡上限與所得限制都是 3.0 新增的條件，2.0 沒有。以上依財政部國庫署公布內容整理，截至 {asOf}。',
      },
      {
        q: '以前貸過新青安還能再貸嗎？',
        a: '不能。{onceOnlySince} 以後經銀行核貸青安貸款，或經農業金融機構核貸青年安居購屋優惠貸款者，不得再申貸。這項限貸一次規定於 {onceOnlyDate} 公告。核貸日在 {onceOnlySince} 之前的舊青安，條文沒有列入這項限制，實際仍由承貸銀行審核。',
      },
      {
        q: '名下有車位或持分算有房嗎？',
        a: '原則上以借款人本人、配偶及未成年子女的財產歸戶清單查無建物資料為準。持有的建物若是停車位或靈骨塔位，經承貸銀行查核後可視為無自有住宅；所持有建物的持分換算面積合計未滿 {shareSqm} 平方公尺，也可以申辦。',
      },
      {
        q: '預售屋可以用青安嗎？',
        a: '青安 3.0 的標的限於申請日前 {purchaseMonths} 個月內因買賣取得所有權的住宅。預售屋在登記取得所有權之前，尚未符合這個前提，實際是否受理以承貸銀行的審核為準。',
      },
      {
        q: '房子可以出租嗎？',
        a: '核貸時須簽訂自用住宅使用切結書，由承貸銀行查證確實作為自用住宅。把超過自住需求的居住空間出租，包括房間分租、整層出租與頂樓加蓋出租，都與購屋自住的政策目的不符。',
      },
      {
        q: '房價上限與貸款額度是多少？',
        a: '房價上限：{capLines}。貸款額度：一般 {limitGeneral}，{newlywedYears} 年內有結婚登記 {limitNewlywed}，育有未成年子女 {limitChild}。貸款年限最長 {maxYears} 年（含寬限期），寬限期最長 {graceYears} 年，貸款成數最高 {maxLtv}。',
      },
    ],
  },

  rentBuy: {
    h1: '買房還是租房試算 2026',
    metaTitle: '買房還是租房試算 2026：用你的假設比較淨資產',
    metaDescription:
      '輸入房價、租金、利率與你對房價和報酬的假設，逐年比較買與租的淨資產。預設 {price}的房子、月租 {rent}、比較 {horizon} 年，假設都能改。',
    howItWorks:
      '買方淨資產 = 房屋現值扣賣出成本與貸款餘額。租方淨資產 = 頭期款加買方一次性成本，再加每月省下的差額，以你填的年報酬率複利累積。兩邊每月現金流出取較大者當共同預算，花得少的一方把差額存起來。不含房貸利息扣除、稅負差異與租屋期間的搬遷成本。',
    reading: [
      '圖上兩條線是買與租兩條路逐年的淨資產，交叉的那一年代表領先的一方換人。沒有交叉就表示整段期間同一方領先。',
      '結果完全取決於你填的假設，尤其是房價年變動率與租方的投資報酬率。改動這兩項再看圖，可以看出結論對假設有多敏感。',
    ],
    faq: [
      {
        q: '這個工具怎麼比較買和租？',
        a: '買方的淨資產是房屋現值扣掉賣出成本與貸款餘額。租方的淨資產是頭期款加買方一次性成本，再加每月省下的差額，以你填的年報酬率複利累積。預設案例是 {price}的房子、頭期款 {down}、貸款 {loanYears} 年、利率 {rate}、月租 {rent}，比較 {horizon} 年。',
      },
      {
        q: '為什麼預設房價成長是 0？',
        a: '預設房價年變動率 {growth}%、租金年成長率 {rentGrowth}%、租方投資報酬率 {invest}%，刻意不替讀者預設樂觀或悲觀的未來。要看房價上漲或下跌的情境，請自己改這三項，結果會跟著明顯變動。',
      },
      {
        q: '買方的成本包含哪些？',
        a: '預設買方一次性成本占總價 {buyCost}%（仲介費、代書費、契稅等），每年持有成本 {holdCost}%（房屋稅、地價稅、管理費、修繕），賣出成本占售價 {sellCost}%。這些屬於示意用的假設，請依自己的情況修改。',
      },
      {
        q: '結果可以當成買房建議嗎？',
        a: '不行。結果完全取決於你填的假設，工具沒有計入房貸利息扣除、稅負差異與租屋期間的搬遷成本，也不預測房價。預設案例在第 {horizon} 年底，買方淨資產 {endBuy}，租方 {endRent}，只用來示範計算方式。',
      },
    ],
  },
};

const en: HousingToolPages = {
  common: {
    frameTitle: 'Enter your numbers',
    embedSourceNote: '{agencies}, as of {asOf}',
    relatedTools: 'Mortgage and home-buying calculators',
    relatedQingan:
      'The Qingan loan: three generations of terms, rates and positions',
    relatedOtherTool: 'Same toolkit: {title}',
    relatedArticleJustice:
      'Housing justice: how social housing became a long-term public institution',
    relatedArticleNational: 'National Housing and housing justice',
    capOther: 'all other counties',
    aprBankName: 'Taiwan Cooperative Bank',
    benchmarkName:
      'Chunghwa Post two-year time-deposit floating rate (deposits under NT$5 million)',
  },

  mortgage: {
    h1: 'Taiwan Mortgage Calculator 2026',
    metaTitle: 'Taiwan Mortgage Calculator 2026: Qingan 3.0 Step Rates',
    metaDescription:
      'Monthly payment, total interest and repayment curve for a Taiwan mortgage, with Qingan 3.0 step rates from {rateFirst}, grace period and prepayment.',
    howItWorks:
      'Equal-payment installment = principal × r × (1 + r)^n ÷ ((1 + r)^n − 1), where r is the annual rate divided by 12 and n is the number of months. Equal-principal repays balance ÷ remaining months each month, with interest falling as the balance falls. During a grace period (months when you pay interest only) the balance does not move; when the grace period ends or the rate changes, the payment is recomputed from the balance and remaining months.',
    reading: [
      'The result has three parts: the monthly payment, total interest and the repayment curve. The payment changes as the rate steps up and when the grace period ends, so read each row of the payment-step table. Total interest is everything repaid minus the principal; a longer term or a longer grace period usually means more interest.',
      'Switch the scenario to a normal loan to overlay it on the Qingan 3.0 curve. The calculation covers principal and interest only; set-up and account fees are not included.',
    ],
    faq: [
      {
        q: 'How much do I pay during the grace period?',
        a: 'During the grace period you pay interest only and the principal stays untouched. For {amount} over {years} years with a {graceYears}-year grace period at Qingan 3.0 step rates, the monthly payment during the grace period runs from {graceStart} to {graceEnd} as the rate steps up. The first payment after the grace period is {afterGrace}, and the highest payment over the whole loan is {maxPay}. A grace period only postpones repaying principal, so it does not lower total interest.',
      },
      {
        q: 'What is the difference between equal-payment and equal-principal repayment?',
        a: 'Example: {amount} over {years2} years at {rate} a year (the rate the Ministry of the Interior used for its {period} affordability statistics), no grace period. Equal-payment repayment costs a fixed {annuityPay} each month and {annuityInterest} in total interest. Equal-principal starts at {equalFirst} in month 1 and falls to {equalLast} in the last month, with {equalInterest} in total interest. Equal-principal costs more at first and less in total; equal-payment keeps the monthly amount constant.',
      },
      {
        q: 'Should a prepayment shorten the term or lower the monthly payment?',
        a: 'Example: {amount} over {years2} years at {rate}, prepaying {prepayAmount} at the end of year {prepayYear}. Shorten the term: the payment stays {basePay}, the loan is paid off after {shortenPayoff}, total interest {shortenInterest}. Lower the payment: the term is unchanged, the payment drops to {reducePay}, total interest {reduceInterest}. Without prepayment, total interest is {baseInterest}. For the same amount, shortening the term saves more interest, while lowering the payment eases monthly cash flow.',
      },
      {
        q: 'How will the Qingan 3.0 rate change over time?',
        a: 'The Qingan loan (Taiwan’s state-subsidised Youth Home-Starter Loan) is currently a single floating rate: the benchmark, {benchmarkName}, is {benchmark}% plus a spread of {spread}%, for an unsubsidised rate of {baseRate}%. The government subsidy starts at {subsidyFirst} percentage points, so the borrower pays {rateFirst} for the first {yearsFirst} years. The subsidy then shrinks each year and the rate runs {stepsText}, returning to {baseRate}% from year {fullFromYear}. The floating rate moves with the benchmark; this site does not forecast it.',
      },
      {
        q: 'Why does the result differ slightly from my bank’s figure?',
        a: 'This site divides the annual rate by 12 and does not round internally, while banks round each installment, and the drawdown date, floating-rate changes and fees also move the figure. As an example, {aprBank} states total fees of {aprFees} and up on a {aprPrincipal} Qingan loan over {aprYears} years; this calculator does not include such fees. The bank’s approval notice sets the actual payment.',
      },
    ],
  },

  affordability: {
    h1: 'Home Affordability Check 2026',
    metaTitle: 'Home Affordability Check 2026: Burden and Price-to-Income',
    metaDescription:
      'Enter income and home price for your mortgage burden and price-to-income ratio. Official {period} national figures: {burden} and {p2i}x.',
    howItWorks:
      'Mortgage burden ratio = monthly payment ÷ monthly income; price-to-income ratio = home price ÷ annual household income; the payment uses equal-payment amortization. The four level thresholds come from the notes published with the Ministry of the Interior index. Official county figures are built from {period} median prices and median incomes.',
    reading: [
      'A higher burden ratio means a larger share of monthly income goes to the mortgage. The result is placed on the Ministry of the Interior four-level scale next to the national official figure, with the county figures listed for comparison.',
      'The price-to-income ratio is a multiple: the larger it is, the more years of income the same home takes. Official mode uses the statistics agency’s assumptions; custom mode uses the price, income, down payment and term you enter.',
    ],
    faq: [
      {
        q: 'What mortgage burden ratio counts as reasonable?',
        a: 'The Ministry of the Interior sorts the burden ratio into four levels: below {band1}% is “{name1}”, {band1}% up to {band2}% is “{name2}”, {band2}% up to {band3}% is “{name3}”, and {band3}% or more is “{name4}”. The {period} national figure is {burden}, in the “{nationBand}” level. This is a statistical scale; what a household can actually carry also depends on its other debts and living costs.',
      },
      {
        q: 'How does the official burden ratio work?',
        a: 'The Ministry of the Interior assumes a {officialYears}-year equal-payment loan, a {officialLtv} loan-to-value ratio and a {officialRate} rate. It takes the monthly payment on the median-priced home ({medianPrice}) and divides it by median monthly disposable household income (annual {medianIncome} divided by 12). The {period} national result is {burden}.',
      },
      {
        q: 'What is the price-to-income ratio?',
        a: 'The price-to-income ratio is the home price divided by annual disposable household income, expressed as a multiple: how many years of income the home costs. The {period} national figure is {p2i}. Among the counties in the official table, the highest is {maxName} ({maxP2i}) and the lowest is {minName} ({minP2i}).',
      },
      {
        q: 'Why does my result differ from the official figure?',
        a: 'The official figure fixes the median price, the median income, a {officialYears}-year term, a {officialLtv} loan-to-value ratio and a {officialRate} rate. Custom mode lets you replace all of these with your own price, income, down payment, rate and term, so different inputs give different results. When comparing, check first that the term and loan-to-value ratio match.',
      },
    ],
  },

  qingan: {
    h1: 'Qingan 3.0 Eligibility Check 2026',
    metaTitle: 'Qingan 3.0 Eligibility Check 2026: Age, Income, Price Cap',
    metaDescription:
      'Check Qingan 3.0 youth home loan terms clause by clause: age under {maxAge}, income up to {income}, price caps, one loan only. As of {asOf}.',
    howItWorks:
      'The tool splits the Treasury’s Qingan 3.0 rules and Q&A into individual clauses. From your age, income, home price, county and current home ownership it returns one of four results for each clause: pass, fail, bank review or not enough information, with the original wording. Where a clause leaves the judgement to the lending bank, the tool draws no conclusion.',
    reading: [
      'Each clause shows a status and the original text. “Pass” means your inputs meet the condition; “bank review” means the clause leaves the judgement to the lending bank, so the tool shows the wording only.',
      'When every clause passes, the page shows the loan ceiling for your category and can send the ceiling and term to the mortgage calculator. Approval is decided by the lending bank.',
    ],
    faq: [
      {
        q: 'What are the age and income limits for Qingan 3.0?',
        a: 'The Qingan loan (Taiwan’s state-subsidised Youth Home-Starter Loan, run by state-owned banks) requires the borrower to be an adult under {maxAge} at application, with age plus loan term no more than {ageTerm}, and the borrower’s own annual income no more than {income}. The age cap and the income limit are new in 3.0 and did not exist in 2.0. Based on Treasury publications, as of {asOf}.',
      },
      {
        q: 'Can I borrow again if I already have an earlier Qingan loan?',
        a: 'Not if the earlier loan was approved on or after {onceOnlySince}. Anyone approved for a Qingan loan by a bank, or for the agricultural-bank youth home loan, from that date cannot apply again. The one-loan rule was announced on {onceOnlyDate}. Loans approved before {onceOnlySince} are not covered by the rule in the text, and the lending bank still reviews each case.',
      },
      {
        q: 'Does owning a parking space or a share of a property count as owning a home?',
        a: 'In principle the borrower, spouse and minor children must show no building records on the national property register. A parking space or columbarium niche can be treated as no home ownership after the bank checks the facts, and holding shares in buildings that add up to under {shareSqm} square metres is also allowed.',
      },
      {
        q: 'Can I use Qingan 3.0 for a pre-sale home?',
        a: 'Qingan 3.0 covers homes whose ownership was acquired by purchase within {purchaseMonths} months before the application date. A pre-sale home does not meet that condition until ownership is registered, and whether the bank accepts a given case is for the bank to decide.',
      },
      {
        q: 'Can I rent out the home?',
        a: 'At approval the borrower signs a statement that the home is for own use, and the bank checks it. Renting out living space beyond what the borrower needs, whether room sharing, renting the whole unit or renting a rooftop addition, conflicts with the policy aim of owner-occupation.',
      },
      {
        q: 'What are the price caps and loan limits?',
        a: 'Price caps: {capLines}. Loan limits: {limitGeneral} in general, {limitNewlywed} if married within {newlywedYears} years, {limitChild} with minor children. The maximum term is {maxYears} years including the grace period, the grace period is at most {graceYears} years, and the loan-to-value ratio is at most {maxLtv}.',
      },
    ],
  },

  rentBuy: {
    h1: 'Rent vs Buy Calculator 2026',
    metaTitle: 'Rent vs Buy Calculator 2026: Net Worth on Your Assumptions',
    metaDescription:
      'Compare buying and renting year by year on your own assumptions. Default: a {price} home, {rent} monthly rent, {horizon} years.',
    howItWorks:
      'Buyer net worth = home value less selling costs and loan balance. Renter net worth = the down payment plus one-off buying costs, plus the monthly difference saved, compounded at the return you enter. Whichever side spends more each month sets the shared budget, and the other side saves the difference. Mortgage interest deductions, tax differences and moving costs while renting are not included.',
    reading: [
      'The two lines are the net worth of the buy path and the rent path by year. Where they cross, the leader changes; if they never cross, the same side leads throughout.',
      'The result depends entirely on your assumptions, above all the yearly change in home prices and the renter’s investment return. Change those two and watch the chart to see how sensitive the conclusion is.',
    ],
    faq: [
      {
        q: 'How does this tool compare buying and renting?',
        a: 'Buyer net worth is the home value less selling costs and the loan balance. Renter net worth is the down payment plus one-off buying costs, plus the monthly difference saved, compounded at the return you enter. The default case is a {price} home with {down} down, a {loanYears}-year loan at {rate} and {rent} monthly rent, compared over {horizon} years.',
      },
      {
        q: 'Why is the default home-price growth 0?',
        a: 'The defaults are {growth}% yearly price change, {rentGrowth}% yearly rent growth and {invest}% return for the renter, so the tool does not start from an optimistic or pessimistic future. To test rising or falling prices, change these three; the result moves noticeably.',
      },
      {
        q: 'What costs does the buyer pay?',
        a: 'By default the buyer pays one-off costs of {buyCost}% of the price (agent and paperwork fees, deed tax), yearly holding costs of {holdCost}% (property and land tax, management fees, repairs) and selling costs of {sellCost}% of the sale price. These are illustrative assumptions; change them to fit your case.',
      },
      {
        q: 'Can I treat the result as advice on whether to buy?',
        a: 'No. The result depends entirely on your assumptions, leaves out mortgage interest deductions, tax differences and moving costs while renting, and does not forecast prices. In the default case, at the end of year {horizon} the buyer’s net worth is {endBuy} and the renter’s is {endRent}; this only shows how the calculation works.',
      },
    ],
  },
};

/** 取某語言的工具單獨頁文案。zh-TW 與 en 完整，其他語言回 en。 */
export function housingToolPages(lang: string): HousingToolPages {
  return lang === 'zh-TW' ? zh : en;
}
