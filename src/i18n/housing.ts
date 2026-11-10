/**
 * housing.ts — /housing/ 專題的試算工具文案（zh-TW 與 en 完整）。
 * 其他語言走 utils.ts 的 fallback chain（vi/id/hi/ar/ru/de/fr/es/pt → en；ja/ko → zh-TW）。
 * key 一律 housing.tool.*。大括號 {name} 是佔位，由 format.ts 的 fill() 換成值。
 * 數字條件（額度、年齡、所得、房價上限、利率）一律不寫在這裡，執行時讀 src/data/housing/*.json。
 *
 * 書寫紀律：MANIFESTO §11（無對位句型、無破折號、不中英夾雜）。
 */

const zh = {
  // ── 共用 ──────────────────────────────────────────────────────────
  'housing.tool.common.range': '{a} 到 {b}',
  'housing.tool.common.arrow': '{a} → {b}',
  'housing.tool.common.disclaimer':
    '試算結果僅供參考，不構成財務、稅務或法律建議。實際利率、額度、寬限期與核貸條件以承貸銀行的審核結果為準；政策條件截至 {asOf}，之後若有調整請以財政部與各銀行公告為準。',
  'housing.tool.common.sourcesTitle': '資料來源',
  'housing.tool.common.sourceLine': '{agency}《{title}》，截至 {date}',
  'housing.tool.common.reset': '還原預設值',
  'housing.tool.common.result': '試算結果',
  'housing.tool.common.assumptions': '算法與假設',
  'housing.tool.common.yes': '是',
  'housing.tool.common.no': '否',
  'housing.tool.common.noteTitle': '提醒',
  'housing.tool.common.chartData': '圖表數字（表格）',

  // ── 房貸試算 ──────────────────────────────────────────────────────
  'housing.tool.mortgage.title': '房貸試算',
  'housing.tool.mortgage.intro':
    '輸入貸款金額、年限與利率，算出每月還款、總利息與還款曲線。可切換青安 3.0 階梯利率，並與一般房貸疊在同一張圖比較。',
  'housing.tool.mortgage.group.loan': '貸款條件',
  'housing.tool.mortgage.f.scenario': '情境',
  'housing.tool.mortgage.scn.general': '一般房貸',
  'housing.tool.mortgage.scn.qingan3': '青安 3.0',
  'housing.tool.mortgage.scn.qingan2': '青安 2.0 既有貸戶',
  'housing.tool.mortgage.f.limitClass': '額度別',
  'housing.tool.mortgage.class.general': '一般',
  'housing.tool.mortgage.class.newlywed': '新婚（{years} 年內結婚登記）',
  'housing.tool.mortgage.class.withMinorChild': '育有未成年子女',
  'housing.tool.mortgage.f.amount': '貸款金額（萬元）',
  'housing.tool.mortgage.f.amount.qingan2': '原始貸款金額（萬元）',
  'housing.tool.mortgage.f.years': '貸款年限（年，含寬限期）',
  'housing.tool.mortgage.f.grace': '寬限期（年，0 表示沒有）',
  'housing.tool.mortgage.f.method': '還款方式',
  'housing.tool.mortgage.method.annuity': '本息平均攤還',
  'housing.tool.mortgage.method.equalPrincipal': '本金平均攤還',
  'housing.tool.mortgage.f.drawMonth': '撥貸年月',
  'housing.tool.mortgage.drawHelp':
    '填原本的貸款金額、年限、寬限期與撥貸年月。工具先算到今天的餘額，再從現在起依遞減後的補貼利率往後算。',
  'housing.tool.mortgage.group.rate': '分段利率（選填）',
  'housing.tool.mortgage.f.rate1': '第一段利率（%）',
  'housing.tool.mortgage.f.len1': '第一段持續年數（0 表示一直到還清）',
  'housing.tool.mortgage.f.rate2': '第二段利率（%，空白沿用上一段）',
  'housing.tool.mortgage.f.len2': '第二段持續年數（0 表示一直到還清）',
  'housing.tool.mortgage.f.rate3': '第三段利率（%，空白沿用上一段）',
  'housing.tool.mortgage.rateNote.general':
    '預設利率是五大銀行新承做購屋貸款平均利率，{period}：{rate}。',
  'housing.tool.mortgage.rateNote.qingan3':
    '青安 3.0 利率自動帶入階梯：{steps}。資料截至 {asOf}。',
  'housing.tool.mortgage.rateNote.qingan2':
    '青安 2.0 既有貸戶同樣適用補貼遞減，利率自動帶入階梯：{steps}。資料截至 {asOf}。',
  'housing.tool.mortgage.group.compare': '對照',
  'housing.tool.mortgage.f.compare': '與一般房貸對照',
  'housing.tool.mortgage.f.cmpRate': '對照的一般房貸利率（%）',
  'housing.tool.mortgage.group.prepay': '提前還款（選填）',
  'housing.tool.mortgage.f.prepayMonth': '第幾期繳款後提前還款',
  'housing.tool.mortgage.f.prepayAmount': '提前還款金額（萬元）',
  'housing.tool.mortgage.f.prepayMode': '提前還款方式',
  'housing.tool.mortgage.prepay.shortenTerm': '月付不變，縮短還款期數',
  'housing.tool.mortgage.prepay.reducePayment': '期數不變，降低月付',
  'housing.tool.mortgage.stat.principal': '貸款本金',
  'housing.tool.mortgage.stat.principal.qingan2': '目前餘額',
  'housing.tool.mortgage.stat.rateNow': '年利率',
  'housing.tool.mortgage.stat.gracePayment': '寬限期內月付',
  'housing.tool.mortgage.stat.afterGrace': '寬限期後第一期月付',
  'housing.tool.mortgage.stat.maxPayment': '最高月付',
  'housing.tool.mortgage.stat.totalInterest': '總利息',
  'housing.tool.mortgage.stat.totalPaid': '總還款',
  'housing.tool.mortgage.stat.payoff': '還清期數',
  'housing.tool.mortgage.noGrace': '沒有寬限期',
  'housing.tool.mortgage.elapsedNote':
    '已撥貸 {n} 個月，目前餘額 {bal}，剩餘 {left}。下方圖表與表格從現在起算，第 1 期是下一期。',
  'housing.tool.mortgage.stepsTitle': '月付階梯',
  'housing.tool.mortgage.steps.range': '期間',
  'housing.tool.mortgage.steps.rate': '年利率',
  'housing.tool.mortgage.steps.payment': '每月應繳',
  'housing.tool.mortgage.steps.rangeCell': '第 {a} 到 {b} 期',
  'housing.tool.mortgage.steps.grace': '寬限期，只繳息',
  'housing.tool.mortgage.yearlyTitle': '逐年攤還表',
  'housing.tool.mortgage.yearly.year': '年次',
  'housing.tool.mortgage.yearly.total': '當年還款',
  'housing.tool.mortgage.yearly.interest': '其中利息',
  'housing.tool.mortgage.yearly.principal': '其中本金',
  'housing.tool.mortgage.yearly.balance': '年底餘額',
  'housing.tool.mortgage.chart.principal': '本金',
  'housing.tool.mortgage.chart.interest': '利息',
  'housing.tool.mortgage.chart.balance': '貸款餘額（右軸）',
  'housing.tool.mortgage.chart.year': '年',
  'housing.tool.mortgage.chartA.take': '利息共 {interest}，佔總還款的 {share}',
  'housing.tool.mortgage.chartA.desc':
    '長條圖，每一年的還款拆成本金與利息，折線是年底貸款餘額。逐年數字見下方攤還表。',
  'housing.tool.mortgage.chartA.axisLeft': '每年還款（元）',
  'housing.tool.mortgage.chartA.axisRight': '餘額（元）',
  'housing.tool.mortgage.chartB.takeJump':
    '第 {year} 年起，月付從 {a} 跳到 {b}',
  'housing.tool.mortgage.chartB.takeFlat': '整段期間月付在 {a} 到 {b} 之間',
  'housing.tool.mortgage.chartB.desc':
    '階梯線圖，橫軸是還款年次，縱軸是每月應繳金額。勾選對照時，橘色虛線是一般房貸。',
  'housing.tool.mortgage.chartB.axisLeft': '每月應繳（元）',
  'housing.tool.mortgage.cmp.name': '一般房貸',
  'housing.tool.mortgage.cmp.less': '{name}的總利息比一般房貸少 {amount}',
  'housing.tool.mortgage.cmp.more': '{name}的總利息比一般房貸多 {amount}',
  'housing.tool.mortgage.cmp.col.scenario': '情境',
  'housing.tool.mortgage.cmp.col.first': '第 1 期月付',
  'housing.tool.mortgage.cmp.col.max': '最高月付',
  'housing.tool.mortgage.cmp.col.interest': '總利息',
  'housing.tool.mortgage.warn.limit':
    '貸款金額超過所選額度別的上限 {limit}，青安 3.0 不會核貸到這個金額。',
  'housing.tool.mortgage.warn.years': '貸款年限超過青安 3.0 的上限 {max} 年。',
  'housing.tool.mortgage.warn.grace': '寬限期超過青安 3.0 的上限 {max} 年。',
  'housing.tool.mortgage.warn.drawFuture':
    '撥貸年月晚於今天，已當成剛撥貸計算。',
  'housing.tool.mortgage.err.principal': '貸款金額要大於 0。',
  'housing.tool.mortgage.err.years': '貸款年限要在 1 到 50 年之間。',
  'housing.tool.mortgage.err.graceMonths': '寬限期要短於貸款年限。',
  'housing.tool.mortgage.err.stages': '請填入利率。',
  'housing.tool.mortgage.err.rate': '利率要在 0 到 30 之間。',
  'housing.tool.mortgage.err.stageMonths': '各段利率的持續年數不能是負數。',
  'housing.tool.mortgage.err.prepayment':
    '提前還款的期數要落在貸款期間內，金額要大於 0。',
  'housing.tool.mortgage.err.drawMonth': '請選擇撥貸年月。',
  'housing.tool.mortgage.err.elapsed':
    '撥貸至今已超過貸款年限，沒有剩餘期數可以試算。',
  'housing.tool.mortgage.err.generic': '輸入的數字無法試算，請檢查各欄位。',
  'housing.tool.mortgage.assump':
    '月利率取年利率除以 12，不做日計息。寬限期內只繳利息，寬限期結束或利率變動的那一期，依當時餘額與剩餘期數重算月付。銀行實際逐期取整，總額會有數十元內的差距。機動利率未來走勢不預測，分段利率由你自己填。青安 3.0 的月付金是本站依公布的利率階梯試算，官方與公股銀行沒有公布試算表。',
  'housing.tool.mortgage.formula':
    '本息平均攤還的月付 = 本金 × 月利率 × (1 + 月利率)^期數 ÷ ((1 + 月利率)^期數 − 1)；本金平均攤還每月還本 = 餘額 ÷ 剩餘期數，利息隨餘額遞減。',

  // ── 負擔能力自查 ─────────────────────────────────────────────────
  'housing.tool.afford.title': '房價負擔能力自查',
  'housing.tool.afford.intro':
    '輸入家庭年收入與房屋總價，算出房貸負擔率與房價所得比，對照內政部四級分級與各縣市官方數字。',
  'housing.tool.afford.group.inputs': '你的條件',
  'housing.tool.afford.f.mode': '算法',
  'housing.tool.afford.mode.official': '官方算法',
  'housing.tool.afford.mode.mine': '我的條件',
  'housing.tool.afford.f.county': '對照縣市（選填）',
  'housing.tool.afford.county.none': '不選',
  'housing.tool.afford.f.price': '房屋總價（萬元）',
  'housing.tool.afford.f.income': '家庭年收入（萬元）',
  'housing.tool.afford.f.down': '頭期款（萬元）',
  'housing.tool.afford.f.rate': '房貸利率（%）',
  'housing.tool.afford.f.years': '貸款年限（年）',
  'housing.tool.afford.officialNote':
    '官方算法固定為 {years} 年期、貸款成數 {ltv} 成、利率 {rate}，頭期款、利率與年限欄位停用。這是內政部指標的算法，和你自己的貸款條件會有落差。',
  'housing.tool.afford.mineNote':
    '用你填的頭期款、利率與年限計算。結果和內政部官方指標的算法不同，不能直接比大小。',
  'housing.tool.afford.stat.loan': '貸款金額',
  'housing.tool.afford.stat.payment': '每月房貸月付',
  'housing.tool.afford.stat.monthlyIncome': '月收入（年收入除以 12）',
  'housing.tool.afford.stat.ratio': '房貸負擔率',
  'housing.tool.afford.stat.p2i': '房價所得比',
  'housing.tool.afford.stat.band': '內政部分級（負擔能力）',
  'housing.tool.afford.max.label': '月付不超過月收入 {pct} 時，可貸約',
  'housing.tool.afford.max.price': '對應的房價約',
  'housing.tool.afford.nation': '全國',
  'housing.tool.afford.times': '{n} 倍',
  'housing.tool.afford.officialLine':
    '{name}官方中位數（{period}）：房貸負擔率 {b}，房價所得比 {p} 倍。',
  'housing.tool.afford.smallSample': '實價登錄樣本少於 100 筆，僅供參考。',
  'housing.tool.afford.ruler.take':
    '你的負擔率 {ratio}，落在「{band}」，全國官方值 {nation}',
  'housing.tool.afford.ruler.you': '你',
  'housing.tool.afford.ruler.desc':
    '橫軸是房貸負擔率，背景色塊是內政部的四級分級。三個標記分別是你的算法結果、所選縣市與全國的官方值。',
  'housing.tool.afford.bandTable.band': '分級',
  'housing.tool.afford.bandTable.range': '房貸負擔率',
  'housing.tool.afford.err.input':
    '請填入大於 0 的房屋總價與家庭年收入，並確認年限與利率合理。',
  'housing.tool.afford.assump':
    '房貸負擔率 = 月付 ÷ 月收入；房價所得比 = 總價 ÷ 年收入；本息平均攤還。四級門檻出自內政部不動產資訊平台公布的分級備註。官方各縣市數字是 {period} 的中位數推算，用 20 年期、七成貸款與官方利率，連江縣官方表沒有資料。',
  'housing.tool.band.affordable': '可合理負擔',
  'housing.tool.band.slightlyLow': '略低',
  'housing.tool.band.low': '偏低',
  'housing.tool.band.veryLow': '過低',

  // ── 青安 3.0 資格自查 ────────────────────────────────────────────
  'housing.tool.elig.title': '青安 3.0 資格自查',
  'housing.tool.elig.intro':
    '依財政部公布的青安 3.0 條件逐條比對。這裡只列比對結果與條文原文，核貸與否由承貸銀行審核決定。',
  'housing.tool.elig.group.person': '申請人',
  'housing.tool.elig.group.property': '房屋',
  'housing.tool.elig.group.household': '名下住宅與申貸紀錄',
  'housing.tool.elig.f.age': '申貸時年齡（歲）',
  'housing.tool.elig.f.term': '預計貸款年限（年）',
  'housing.tool.elig.f.income': '本人年所得（萬元）',
  'housing.tool.elig.f.county': '購屋縣市',
  'housing.tool.elig.f.price': '房屋總價（萬元）',
  'housing.tool.elig.f.newlywed': '{years} 年內有結婚登記',
  'housing.tool.elig.f.child': '有未成年子女',
  'housing.tool.elig.f.home': '本人、配偶與未成年子女名下的住宅',
  'housing.tool.elig.f.shareSqm': '持分換算面積合計（平方公尺）',
  'housing.tool.elig.f.used': '{date} 之後已核貸過青安或農安貸款',
  'housing.tool.elig.f.purchased':
    '房屋是申請日前 {months} 個月內因買賣取得所有權的成屋',
  'housing.tool.elig.home.none': '都沒有',
  'housing.tool.elig.home.share': '有建物持分（另填面積）',
  'housing.tool.elig.home.parkingOrNiche': '只有車位或靈骨塔位',
  'housing.tool.elig.home.has': '有自有住宅',
  'housing.tool.elig.resultsTitle': '逐條比對',
  'housing.tool.elig.check.age': '年齡：申貸時未滿 {max} 歲',
  'housing.tool.elig.check.agePlusTerm': '年齡加貸款年限：合計不超過 {max}',
  'housing.tool.elig.check.term': '貸款年限：不超過 {max} 年',
  'housing.tool.elig.check.income': '借款人本人年所得：不超過 {max}',
  'housing.tool.elig.check.priceCap': '房屋總價：不超過所在縣市的上限 {cap}',
  'housing.tool.elig.check.priceCapNone':
    '房屋總價：不超過所在縣市的上限（請先選縣市）',
  'housing.tool.elig.check.onceOnly': '限貸一次：沒有核貸過青安或農安貸款',
  'housing.tool.elig.check.noHome': '本人、配偶及未成年子女均無自有住宅',
  'housing.tool.elig.check.purchased6m':
    '標的：申請日前 {months} 個月內因買賣取得所有權的成屋',
  'housing.tool.elig.status.pass': '符合',
  'housing.tool.elig.status.fail': '不符合',
  'housing.tool.elig.status.bankReview': '需銀行認定',
  'housing.tool.elig.status.unknown': '尚未填寫',
  'housing.tool.elig.quoteLabel': '條文原文',
  'housing.tool.elig.summaryLabel':
    '方案條件摘要（本站依國庫署新聞稿整理，並非條文逐字）',
  'housing.tool.elig.tally':
    '符合 {pass} 項、不符合 {fail} 項、需銀行認定 {review} 項、尚未填寫 {unknown} 項',
  'housing.tool.elig.class.general': '一般額度',
  'housing.tool.elig.class.newlywed': '新婚額度',
  'housing.tool.elig.class.withMinorChild': '育兒額度',
  'housing.tool.elig.limitTitle': '依條文計算的額度上限',
  'housing.tool.elig.limit.blocked': '不計算',
  'housing.tool.elig.limit.blockedNote':
    '至少有一項條件與條文不符，所以不列額度數字。請對照上方逐條結果。',
  'housing.tool.elig.limit.noPrice':
    '「{cls}」上限 {classLimit}。填入房屋總價後，會再與房價的 {ltv} 成取小。',
  'housing.tool.elig.limit.note':
    '「{cls}」上限 {classLimit}，與房價的 {ltv} 成取小，尚未計入銀行的審核裁量。',
  'housing.tool.elig.limit.ltvBinds': '這次的上限受房價成數限制。',
  'housing.tool.elig.discretionTitle': '銀行仍有審核裁量',
  'housing.tool.elig.othersTitle': '其他條文：自住、出租、違規處理與申請期間',
  'housing.tool.elig.toMortgage': '把額度與條件帶進房貸試算',
  'housing.tool.elig.assump':
    '比對的是國庫署公布的貸款原則與問答集。標「需銀行認定」的項目，條文把判斷交給承貸銀行查核，工具不替銀行下結論。申請人是否符合，以送件時銀行的審核為準。',

  // ── 買與租比較 ──────────────────────────────────────────────────
  'housing.tool.rentbuy.title': '買與租比較',
  'housing.tool.rentbuy.intro':
    '逐年比較買房與租房兩條路的淨資產。房價會漲或跌、租房省下的錢能賺多少，全由你填的假設決定。',
  'housing.tool.rentbuy.group.buy': '買房',
  'housing.tool.rentbuy.group.rent': '租房',
  'housing.tool.rentbuy.group.assume': '你的假設',
  'housing.tool.rentbuy.f.price': '房價（萬元）',
  'housing.tool.rentbuy.f.down': '頭期款（萬元）',
  'housing.tool.rentbuy.f.years': '房貸年限（年）',
  'housing.tool.rentbuy.f.rate': '房貸利率（%）',
  'housing.tool.rentbuy.f.buyCost': '買方一次性成本（佔總價 %）',
  'housing.tool.rentbuy.f.holdCost': '每年持有成本（佔房價 %）',
  'housing.tool.rentbuy.f.sellCost': '賣出成本（佔售價 %）',
  'housing.tool.rentbuy.f.rent': '每月租金（元）',
  'housing.tool.rentbuy.f.rentGrowth': '租金年增率（%）',
  'housing.tool.rentbuy.f.horizon': '比較年數',
  'housing.tool.rentbuy.f.growth': '房價年變動率（%，可填負數）',
  'housing.tool.rentbuy.f.invest': '租方把差額拿去存或投資的年報酬率（%）',
  'housing.tool.rentbuy.defaultNote':
    '房價年變動率與投資報酬率預設都是 0%，不替你預設樂觀或悲觀。買方成本、持有成本、賣出成本與租金的預設值只是示意，請換成你自己的數字。租金年增率預設 0%，因為本站目前沒有收錄主計總處房租類物價指數的最新年增率，請自行填入。',
  'housing.tool.rentbuy.takeNote':
    '這是用示意假設算出的結果，請換成你自己的數字再看。',
  'housing.tool.rentbuy.stat.endBuy': '買房淨資產',
  'housing.tool.rentbuy.stat.endRent': '租房淨資產',
  'housing.tool.rentbuy.stat.diff': '買減租的差額',
  'housing.tool.rentbuy.stat.cross': '交叉年份',
  'housing.tool.rentbuy.atYear': '第 {year} 年底',
  'housing.tool.rentbuy.noCross': '期間內沒有交叉',
  'housing.tool.rentbuy.crossAt': '第 {year} 年',
  'housing.tool.rentbuy.take.buyOvertakes':
    '第 {year} 年起，買房的淨資產超過租房',
  'housing.tool.rentbuy.take.rentOvertakes':
    '第 {year} 年起，租房的淨資產超過買房',
  'housing.tool.rentbuy.take.buyAlways':
    '{years} 年內，買房的淨資產一直高於租房',
  'housing.tool.rentbuy.take.rentAlways':
    '{years} 年內，租房的淨資產一直高於買房',
  'housing.tool.rentbuy.chart.desc':
    '折線圖，橫軸是年次，縱軸是淨資產。藍色實線是買房，橘色虛線是租房，垂直線標出兩條線交叉的年份。',
  'housing.tool.rentbuy.chart.buy': '買房淨資產',
  'housing.tool.rentbuy.chart.rent': '租房淨資產',
  'housing.tool.rentbuy.chart.axisLeft': '淨資產（元）',
  'housing.tool.rentbuy.chart.year': '年',
  'housing.tool.rentbuy.table.year': '年次',
  'housing.tool.rentbuy.table.buy': '買房淨資產',
  'housing.tool.rentbuy.table.rent': '租房淨資產',
  'housing.tool.rentbuy.table.diff': '買減租',
  'housing.tool.rentbuy.err.input':
    '請填入大於 0 的房價，比較年數請填 1 到 50 年。',
  'housing.tool.rentbuy.err.down': '頭期款要小於房價，才有貸款可以算。',
  'housing.tool.rentbuy.assump':
    '買方淨資產 = 房屋現值扣賣出成本與貸款餘額。租方淨資產 = 頭期款加買方一次性成本，再加每月省下的差額，以你填的年報酬率複利累積。兩邊每月現金流出取較大者當共同預算，花得少的一方把差額存起來。不含房貸利息扣除、稅負差異與租屋期間的搬遷成本。結果完全取決於你填的假設。',

  // ── 縣市名 ──────────────────────────────────────────────────────
  'housing.tool.county.臺北市': '臺北市',
  'housing.tool.county.新北市': '新北市',
  'housing.tool.county.桃園市': '桃園市',
  'housing.tool.county.臺中市': '臺中市',
  'housing.tool.county.臺南市': '臺南市',
  'housing.tool.county.高雄市': '高雄市',
  'housing.tool.county.基隆市': '基隆市',
  'housing.tool.county.新竹市': '新竹市',
  'housing.tool.county.新竹縣': '新竹縣',
  'housing.tool.county.苗栗縣': '苗栗縣',
  'housing.tool.county.彰化縣': '彰化縣',
  'housing.tool.county.南投縣': '南投縣',
  'housing.tool.county.雲林縣': '雲林縣',
  'housing.tool.county.嘉義市': '嘉義市',
  'housing.tool.county.嘉義縣': '嘉義縣',
  'housing.tool.county.屏東縣': '屏東縣',
  'housing.tool.county.宜蘭縣': '宜蘭縣',
  'housing.tool.county.花蓮縣': '花蓮縣',
  'housing.tool.county.臺東縣': '臺東縣',
  'housing.tool.county.澎湖縣': '澎湖縣',
  'housing.tool.county.金門縣': '金門縣',
  'housing.tool.county.連江縣': '連江縣',

  // ── 工具集頁 ────────────────────────────────────────────────────
  'housing.tool.page.metaTitle': '房貸試算 2026：青安 3.0、負擔能力、買租比較',
  'housing.tool.page.metaDescription':
    '輸入貸款金額、年限與利率，算出每月還款、總利息與還款曲線。同頁有青安 3.0 資格逐條比對、房價負擔能力自查與買租淨資產比較，條件截至 {asOf}。',
  'housing.tool.page.eyebrow': '居住專題 · 便民工具',
  'housing.tool.page.heroTitle': '房貸與購屋試算工具',
  'housing.tool.page.heroSubtitle':
    '四個工具，用公開的政策條件與官方統計算你自己的數字',
  'housing.tool.page.intro':
    '房貸試算的預設案例是 {amount}、{years} 年、寬限期 {graceYears} 年的青安 3.0：寬限期內月付 {gracePay}，寬限期結束後第一期跳到 {after}，最高 {max}。條件與利率讀自財政部國庫署公布的資料，截至 {asOf}。',
  'housing.tool.page.back': '回到居住專題',
  'housing.tool.page.toc': '本頁的工具',
  'housing.tool.page.toc.mortgage': '房貸試算',
  'housing.tool.page.toc.afford': '負擔能力自查',
  'housing.tool.page.toc.elig': '青安 3.0 資格自查',
  'housing.tool.page.toc.rentbuy': '買與租比較',
  'housing.tool.page.h2.mortgage': '一筆貸款每個月要繳多少，利率階梯怎麼影響',
  'housing.tool.page.h2.afford': '月收入扣掉房貸之後，負擔落在哪一級',
  'housing.tool.page.h2.elig': '青安 3.0 的條件，你逐條符合幾項',
  'housing.tool.page.h2.rentbuy': '買房與租房，哪一條路的淨資產先累積起來',
} as const;

const en = {
  // ── Common ────────────────────────────────────────────────────────
  'housing.tool.common.range': '{a} to {b}',
  'housing.tool.common.arrow': '{a} → {b}',
  'housing.tool.common.disclaimer':
    'Results are estimates for reference and are not financial, tax or legal advice. Actual rates, loan limits, grace periods and approval depend on the lending bank. Policy terms are as of {asOf}; check the Ministry of Finance and each bank for later changes.',
  'housing.tool.common.sourcesTitle': 'Sources',
  'housing.tool.common.sourceLine': '{agency}, “{title}”, as of {date}',
  'housing.tool.common.reset': 'Reset to defaults',
  'housing.tool.common.result': 'Results',
  'housing.tool.common.assumptions': 'Method and assumptions',
  'housing.tool.common.yes': 'Yes',
  'housing.tool.common.no': 'No',
  'housing.tool.common.noteTitle': 'Note',
  'housing.tool.common.chartData': 'Chart data (table)',

  // ── Mortgage calculator ───────────────────────────────────────────
  'housing.tool.mortgage.title': 'Mortgage calculator',
  'housing.tool.mortgage.intro':
    'Enter a loan amount, term and rate to see the monthly payment, total interest and repayment curve. Switch to the Qing-An 3.0 step-rate path and overlay a standard mortgage on the same chart.',
  'housing.tool.mortgage.group.loan': 'Loan terms',
  'housing.tool.mortgage.f.scenario': 'Scenario',
  'housing.tool.mortgage.scn.general': 'Standard mortgage',
  'housing.tool.mortgage.scn.qingan3': 'Qing-An 3.0',
  'housing.tool.mortgage.scn.qingan2': 'Qing-An 2.0 existing borrower',
  'housing.tool.mortgage.f.limitClass': 'Loan limit class',
  'housing.tool.mortgage.class.general': 'General',
  'housing.tool.mortgage.class.newlywed':
    'Newlywed (married within {years} years)',
  'housing.tool.mortgage.class.withMinorChild': 'With a minor child',
  'housing.tool.mortgage.f.amount': 'Loan amount (NT$10,000 units)',
  'housing.tool.mortgage.f.amount.qingan2':
    'Original loan amount (NT$10,000 units)',
  'housing.tool.mortgage.f.years': 'Loan term (years, grace period included)',
  'housing.tool.mortgage.f.grace': 'Grace period (years, 0 for none)',
  'housing.tool.mortgage.f.method': 'Repayment method',
  'housing.tool.mortgage.method.annuity':
    'Equal payment (principal and interest)',
  'housing.tool.mortgage.method.equalPrincipal': 'Equal principal',
  'housing.tool.mortgage.f.drawMonth': 'Month the loan was drawn',
  'housing.tool.mortgage.drawHelp':
    'Enter the original amount, term, grace period and draw month. The tool rolls the loan forward to today, then continues from now on the reduced-subsidy rate path.',
  'housing.tool.mortgage.group.rate': 'Step rates (optional)',
  'housing.tool.mortgage.f.rate1': 'Stage 1 rate (%)',
  'housing.tool.mortgage.f.len1':
    'Stage 1 length (years, 0 for the whole term)',
  'housing.tool.mortgage.f.rate2': 'Stage 2 rate (%, blank keeps the previous)',
  'housing.tool.mortgage.f.len2':
    'Stage 2 length (years, 0 for the rest of the term)',
  'housing.tool.mortgage.f.rate3': 'Stage 3 rate (%, blank keeps the previous)',
  'housing.tool.mortgage.rateNote.general':
    'The default rate is the average rate on new home loans at the five largest banks, {period}: {rate}.',
  'housing.tool.mortgage.rateNote.qingan3':
    'Qing-An 3.0 loads its step rates automatically: {steps}. Data as of {asOf}.',
  'housing.tool.mortgage.rateNote.qingan2':
    'Qing-An 2.0 borrowers get the same stepping subsidy. Step rates loaded automatically: {steps}. Data as of {asOf}.',
  'housing.tool.mortgage.group.compare': 'Comparison',
  'housing.tool.mortgage.f.compare': 'Compare with a standard mortgage',
  'housing.tool.mortgage.f.cmpRate':
    'Standard mortgage rate for comparison (%)',
  'housing.tool.mortgage.group.prepay': 'Prepayment (optional)',
  'housing.tool.mortgage.f.prepayMonth': 'Prepay after payment number',
  'housing.tool.mortgage.f.prepayAmount': 'Prepayment amount (NT$10,000 units)',
  'housing.tool.mortgage.f.prepayMode': 'Prepayment mode',
  'housing.tool.mortgage.prepay.shortenTerm':
    'Keep the payment, finish earlier',
  'housing.tool.mortgage.prepay.reducePayment':
    'Keep the term, lower the payment',
  'housing.tool.mortgage.stat.principal': 'Loan principal',
  'housing.tool.mortgage.stat.principal.qingan2': 'Current balance',
  'housing.tool.mortgage.stat.rateNow': 'Annual rate',
  'housing.tool.mortgage.stat.gracePayment': 'Monthly payment in grace period',
  'housing.tool.mortgage.stat.afterGrace': 'First payment after grace period',
  'housing.tool.mortgage.stat.maxPayment': 'Highest monthly payment',
  'housing.tool.mortgage.stat.totalInterest': 'Total interest',
  'housing.tool.mortgage.stat.totalPaid': 'Total repaid',
  'housing.tool.mortgage.stat.payoff': 'Payoff',
  'housing.tool.mortgage.noGrace': 'No grace period',
  'housing.tool.mortgage.elapsedNote':
    '{n} months since the draw, current balance {bal}, {left} left. The chart and tables below start from now, and payment 1 is the next one due.',
  'housing.tool.mortgage.stepsTitle': 'Payment steps',
  'housing.tool.mortgage.steps.range': 'Period',
  'housing.tool.mortgage.steps.rate': 'Annual rate',
  'housing.tool.mortgage.steps.payment': 'Monthly payment',
  'housing.tool.mortgage.steps.rangeCell': 'Months {a} to {b}',
  'housing.tool.mortgage.steps.grace': 'grace period, interest only',
  'housing.tool.mortgage.yearlyTitle': 'Year-by-year schedule',
  'housing.tool.mortgage.yearly.year': 'Year',
  'housing.tool.mortgage.yearly.total': 'Paid in year',
  'housing.tool.mortgage.yearly.interest': 'of which interest',
  'housing.tool.mortgage.yearly.principal': 'of which principal',
  'housing.tool.mortgage.yearly.balance': 'Year-end balance',
  'housing.tool.mortgage.chart.principal': 'Principal',
  'housing.tool.mortgage.chart.interest': 'Interest',
  'housing.tool.mortgage.chart.balance': 'Loan balance (right axis)',
  'housing.tool.mortgage.chart.year': 'yr',
  'housing.tool.mortgage.chartA.take':
    'Interest totals {interest}, {share} of everything repaid',
  'housing.tool.mortgage.chartA.desc':
    'Bar chart of each year’s repayment split into principal and interest, with a line for the year-end loan balance. Year-by-year figures are in the schedule table below.',
  'housing.tool.mortgage.chartA.axisLeft': 'Repaid per year (NT$)',
  'housing.tool.mortgage.chartA.axisRight': 'Balance (NT$)',
  'housing.tool.mortgage.chartB.takeJump':
    'From year {year}, the monthly payment jumps from {a} to {b}',
  'housing.tool.mortgage.chartB.takeFlat':
    'The monthly payment stays between {a} and {b}',
  'housing.tool.mortgage.chartB.desc':
    'Step line chart: repayment year on the horizontal axis, monthly payment on the vertical axis. With comparison on, the dashed orange line is the standard mortgage.',
  'housing.tool.mortgage.chartB.axisLeft': 'Monthly payment (NT$)',
  'housing.tool.mortgage.cmp.name': 'Standard mortgage',
  'housing.tool.mortgage.cmp.less':
    '{name} costs {amount} less total interest than a standard mortgage',
  'housing.tool.mortgage.cmp.more':
    '{name} costs {amount} more total interest than a standard mortgage',
  'housing.tool.mortgage.cmp.col.scenario': 'Scenario',
  'housing.tool.mortgage.cmp.col.first': 'Payment 1',
  'housing.tool.mortgage.cmp.col.max': 'Highest payment',
  'housing.tool.mortgage.cmp.col.interest': 'Total interest',
  'housing.tool.mortgage.warn.limit':
    'The amount is above the {limit} cap for the chosen class, so Qing-An 3.0 would not lend this much.',
  'housing.tool.mortgage.warn.years':
    'The term is longer than the Qing-An 3.0 maximum of {max} years.',
  'housing.tool.mortgage.warn.grace':
    'The grace period is longer than the Qing-An 3.0 maximum of {max} years.',
  'housing.tool.mortgage.warn.drawFuture':
    'The draw month is in the future, so the loan is treated as just drawn.',
  'housing.tool.mortgage.err.principal': 'The loan amount must be above 0.',
  'housing.tool.mortgage.err.years': 'The term must be between 1 and 50 years.',
  'housing.tool.mortgage.err.graceMonths':
    'The grace period must be shorter than the loan term.',
  'housing.tool.mortgage.err.stages': 'Enter a rate.',
  'housing.tool.mortgage.err.rate': 'Rates must be between 0 and 30.',
  'housing.tool.mortgage.err.stageMonths': 'Stage lengths cannot be negative.',
  'housing.tool.mortgage.err.prepayment':
    'The prepayment must fall inside the loan term and be above 0.',
  'housing.tool.mortgage.err.drawMonth': 'Choose the draw month.',
  'housing.tool.mortgage.err.elapsed':
    'The loan term has already passed, so there is nothing left to calculate.',
  'housing.tool.mortgage.err.generic':
    'These numbers cannot be calculated. Please check each field.',
  'housing.tool.mortgage.assump':
    'The monthly rate is the annual rate divided by 12, with no daily accrual. Grace-period payments are interest only; when the grace period ends or the rate changes, the payment is recomputed from the balance and remaining months. Banks round each installment, so totals can differ by a few dozen dollars. Future floating rates are not forecast; step rates are whatever you enter. Qing-An 3.0 payments here are this site’s own calculation from the published rate steps, because neither the Ministry of Finance nor the state banks publish a payment table.',
  'housing.tool.mortgage.formula':
    'Equal-payment installment = principal × r × (1 + r)^n ÷ ((1 + r)^n − 1), where r is the monthly rate and n the number of months. Equal-principal repays balance ÷ remaining months each month, with interest falling as the balance falls.',

  // ── Affordability check ───────────────────────────────────────────
  'housing.tool.afford.title': 'Housing affordability check',
  'housing.tool.afford.intro':
    'Enter household income and a home price to get the mortgage burden ratio and price-to-income ratio, set against the Ministry of the Interior’s four-level scale and official figures by county.',
  'housing.tool.afford.group.inputs': 'Your figures',
  'housing.tool.afford.f.mode': 'Method',
  'housing.tool.afford.mode.official': 'Official method',
  'housing.tool.afford.mode.mine': 'My own terms',
  'housing.tool.afford.f.county': 'Compare with a county (optional)',
  'housing.tool.afford.county.none': 'None',
  'housing.tool.afford.f.price': 'Home price (NT$10,000 units)',
  'housing.tool.afford.f.income': 'Household annual income (NT$10,000 units)',
  'housing.tool.afford.f.down': 'Down payment (NT$10,000 units)',
  'housing.tool.afford.f.rate': 'Mortgage rate (%)',
  'housing.tool.afford.f.years': 'Loan term (years)',
  'housing.tool.afford.officialNote':
    'The official method fixes a {years}-year term, a {ltvPct} loan-to-value ratio and a {rate} rate, so the down payment, rate and term fields are disabled. This is how the Ministry of the Interior builds its index, and it will differ from your own loan.',
  'housing.tool.afford.mineNote':
    'Uses the down payment, rate and term you entered. This is not the same calculation as the official index, so the two cannot be compared directly.',
  'housing.tool.afford.stat.loan': 'Loan amount',
  'housing.tool.afford.stat.payment': 'Monthly mortgage payment',
  'housing.tool.afford.stat.monthlyIncome': 'Monthly income (annual ÷ 12)',
  'housing.tool.afford.stat.ratio': 'Mortgage burden ratio',
  'housing.tool.afford.stat.p2i': 'Price-to-income ratio',
  'housing.tool.afford.stat.band': 'Ministry of the Interior level',
  'housing.tool.afford.max.label':
    'Loan size at a payment of {pct} of monthly income, about',
  'housing.tool.afford.max.price': 'Home price that implies, about',
  'housing.tool.afford.nation': 'Nationwide',
  'housing.tool.afford.times': '{n}×',
  'housing.tool.afford.officialLine':
    '{name}, official median ({period}): burden ratio {b}, price-to-income ratio {p}.',
  'housing.tool.afford.smallSample':
    'Fewer than 100 registered transactions, treat with care.',
  'housing.tool.afford.ruler.take':
    'Your burden ratio is {ratio}, in the “{band}” level; the official national figure is {nation}',
  'housing.tool.afford.ruler.you': 'You',
  'housing.tool.afford.ruler.desc':
    'Horizontal axis is the mortgage burden ratio; the shaded blocks are the ministry’s four levels. The three markers are your result, the chosen county and the national official figure.',
  'housing.tool.afford.bandTable.band': 'Level',
  'housing.tool.afford.bandTable.range': 'Mortgage burden ratio',
  'housing.tool.afford.err.input':
    'Enter a home price and household income above 0, and check that the term and rate are reasonable.',
  'housing.tool.afford.assump':
    'Burden ratio = monthly payment ÷ monthly income; price-to-income = price ÷ annual income; equal-payment amortization. Level thresholds come from the notes published with the Ministry of the Interior index. County figures are {period} medians built on a 20-year term, 70% loan and the official rate; the official table has no row for Lienchiang County.',
  'housing.tool.band.affordable': 'Affordable',
  'housing.tool.band.slightlyLow': 'Slightly low',
  'housing.tool.band.low': 'Low',
  'housing.tool.band.veryLow': 'Very low',

  // ── Qing-An 3.0 eligibility ────────────────────────────────────────
  'housing.tool.elig.title': 'Qing-An 3.0 eligibility check',
  'housing.tool.elig.intro':
    'Compares your answers with the Ministry of Finance’s Qing-An 3.0 conditions one by one. It lists the match result and the original clause text only; the lending bank decides approval.',
  'housing.tool.elig.group.person': 'Applicant',
  'housing.tool.elig.group.property': 'The home',
  'housing.tool.elig.group.household': 'Existing homes and loan history',
  'housing.tool.elig.f.age': 'Age at application',
  'housing.tool.elig.f.term': 'Planned loan term (years)',
  'housing.tool.elig.f.income': 'Your own annual income (NT$10,000 units)',
  'housing.tool.elig.f.county': 'County or city of the home',
  'housing.tool.elig.f.price': 'Home price (NT$10,000 units)',
  'housing.tool.elig.f.newlywed': 'Married (registered) within {years} years',
  'housing.tool.elig.f.child': 'Have a minor child',
  'housing.tool.elig.f.home':
    'Homes owned by you, your spouse and minor children',
  'housing.tool.elig.f.shareSqm': 'Total floor area of shares held (m²)',
  'housing.tool.elig.f.used':
    'Already approved for a Qing-An or Nongan loan after {date}',
  'housing.tool.elig.f.purchased':
    'The home is a completed home you bought and took title to within {months} months before applying',
  'housing.tool.elig.home.none': 'None',
  'housing.tool.elig.home.share': 'Hold a share of a building (enter area)',
  'housing.tool.elig.home.parkingOrNiche':
    'Only a parking space or columbarium niche',
  'housing.tool.elig.home.has': 'Own a home',
  'housing.tool.elig.resultsTitle': 'Condition-by-condition result',
  'housing.tool.elig.check.age': 'Age: under {max} at application',
  'housing.tool.elig.check.agePlusTerm':
    'Age plus loan term: total of {max} or less',
  'housing.tool.elig.check.term': 'Loan term: {max} years or less',
  'housing.tool.elig.check.income':
    'Borrower’s own annual income: {max} or less',
  'housing.tool.elig.check.priceCap':
    'Home price: {cap} or less for this county',
  'housing.tool.elig.check.priceCapNone':
    'Home price: within the county cap (choose a county first)',
  'housing.tool.elig.check.onceOnly':
    'One loan only: no earlier Qing-An or Nongan approval',
  'housing.tool.elig.check.noHome':
    'No owned home for you, your spouse or minor children',
  'housing.tool.elig.check.purchased6m':
    'Property: a completed home bought and titled within {months} months before applying',
  'housing.tool.elig.status.pass': 'Meets',
  'housing.tool.elig.status.fail': 'Does not meet',
  'housing.tool.elig.status.bankReview': 'Bank to decide',
  'housing.tool.elig.status.unknown': 'Not filled in',
  'housing.tool.elig.quoteLabel': 'Original clause (Chinese)',
  'housing.tool.elig.summaryLabel':
    'Program summary (this site’s condensation of the Treasury’s press release, not verbatim clause text)',
  'housing.tool.elig.tally':
    '{pass} met, {fail} not met, {review} for the bank to decide, {unknown} not filled in',
  'housing.tool.elig.class.general': 'General limit',
  'housing.tool.elig.class.newlywed': 'Newlywed limit',
  'housing.tool.elig.class.withMinorChild': 'Child-raising limit',
  'housing.tool.elig.limitTitle': 'Loan cap under the clauses',
  'housing.tool.elig.limit.blocked': 'Not calculated',
  'housing.tool.elig.limit.blockedNote':
    'At least one condition does not match the clauses, so no cap is shown. See the results above.',
  'housing.tool.elig.limit.noPrice':
    '“{cls}” cap is {classLimit}. Once you enter a home price, the lower of that and {ltvPct} of the price applies.',
  'housing.tool.elig.limit.note':
    '“{cls}” cap is {classLimit}, taking the lower of that and {ltvPct} of the price. Bank discretion is not included.',
  'housing.tool.elig.limit.ltvBinds':
    'The loan-to-value limit sets the cap this time.',
  'housing.tool.elig.discretionTitle': 'The bank still has discretion',
  'housing.tool.elig.othersTitle':
    'Other clauses: owner-occupancy, renting out, violations and the application window',
  'housing.tool.elig.toMortgage':
    'Send this cap and these terms to the mortgage calculator',
  'housing.tool.elig.assump':
    'The comparison uses the Treasury’s loan rules and Q&A. Where an item says the bank decides, the clause leaves the judgement to the lending bank and this tool does not draw a conclusion for it. Whether an applicant qualifies is up to the bank’s review at filing.',

  // ── Rent vs buy ───────────────────────────────────────────────────
  'housing.tool.rentbuy.title': 'Rent vs buy comparison',
  'housing.tool.rentbuy.intro':
    'Compares net worth year by year on the buy path and the rent path. Whether prices rise or fall, and what the renter earns on the money saved, comes entirely from the assumptions you enter.',
  'housing.tool.rentbuy.group.buy': 'Buying',
  'housing.tool.rentbuy.group.rent': 'Renting',
  'housing.tool.rentbuy.group.assume': 'Your assumptions',
  'housing.tool.rentbuy.f.price': 'Home price (NT$10,000 units)',
  'housing.tool.rentbuy.f.down': 'Down payment (NT$10,000 units)',
  'housing.tool.rentbuy.f.years': 'Mortgage term (years)',
  'housing.tool.rentbuy.f.rate': 'Mortgage rate (%)',
  'housing.tool.rentbuy.f.buyCost': 'One-off buying costs (% of price)',
  'housing.tool.rentbuy.f.holdCost': 'Yearly holding costs (% of home value)',
  'housing.tool.rentbuy.f.sellCost': 'Selling costs (% of sale price)',
  'housing.tool.rentbuy.f.rent': 'Monthly rent (NT$)',
  'housing.tool.rentbuy.f.rentGrowth': 'Yearly rent increase (%)',
  'housing.tool.rentbuy.f.horizon': 'Years to compare',
  'housing.tool.rentbuy.f.growth':
    'Yearly home price change (%, negative allowed)',
  'housing.tool.rentbuy.f.invest': 'Yearly return on the renter’s savings (%)',
  'housing.tool.rentbuy.defaultNote':
    'Home price change and investment return both default to 0%, so the tool assumes neither optimism nor pessimism for you. The buying, holding and selling costs and the rent are placeholders for illustration; replace them with your own numbers. Rent growth defaults to 0% because this site does not yet carry the latest rent component of the consumer price index from the Directorate-General of Budget, Accounting and Statistics; enter your own.',
  'housing.tool.rentbuy.takeNote':
    'This result comes from placeholder assumptions. Replace them with your own numbers before reading anything into it.',
  'housing.tool.rentbuy.stat.endBuy': 'Net worth if buying',
  'housing.tool.rentbuy.stat.endRent': 'Net worth if renting',
  'housing.tool.rentbuy.stat.diff': 'Buy minus rent',
  'housing.tool.rentbuy.stat.cross': 'Crossover year',
  'housing.tool.rentbuy.atYear': 'End of year {year}',
  'housing.tool.rentbuy.noCross': 'No crossover in the period',
  'housing.tool.rentbuy.crossAt': 'Year {year}',
  'housing.tool.rentbuy.take.buyOvertakes':
    'From year {year}, net worth from buying passes net worth from renting',
  'housing.tool.rentbuy.take.rentOvertakes':
    'From year {year}, net worth from renting passes net worth from buying',
  'housing.tool.rentbuy.take.buyAlways':
    'Over {years} years, buying stays ahead of renting on net worth',
  'housing.tool.rentbuy.take.rentAlways':
    'Over {years} years, renting stays ahead of buying on net worth',
  'housing.tool.rentbuy.chart.desc':
    'Line chart with years on the horizontal axis and net worth on the vertical axis. The solid blue line is buying, the dashed orange line is renting, and a vertical line marks the year the two cross.',
  'housing.tool.rentbuy.chart.buy': 'Net worth if buying',
  'housing.tool.rentbuy.chart.rent': 'Net worth if renting',
  'housing.tool.rentbuy.chart.axisLeft': 'Net worth (NT$)',
  'housing.tool.rentbuy.chart.year': 'yr',
  'housing.tool.rentbuy.table.year': 'Year',
  'housing.tool.rentbuy.table.buy': 'Buying',
  'housing.tool.rentbuy.table.rent': 'Renting',
  'housing.tool.rentbuy.table.diff': 'Buy minus rent',
  'housing.tool.rentbuy.err.input':
    'Enter a home price above 0 and a comparison period of 1 to 50 years.',
  'housing.tool.rentbuy.err.down':
    'The down payment must be below the home price so that there is a loan to calculate.',
  'housing.tool.rentbuy.assump':
    'Buyer net worth = home value less selling costs and loan balance. Renter net worth = the down payment plus one-off buying costs, plus the monthly difference saved, compounded at the return you enter. Whichever side spends more each month sets the shared budget, and the other side saves the difference. Mortgage interest deductions, tax differences and moving costs while renting are not included. The result depends entirely on your assumptions.',

  // ── County names ──────────────────────────────────────────────────
  'housing.tool.county.臺北市': 'Taipei City',
  'housing.tool.county.新北市': 'New Taipei City',
  'housing.tool.county.桃園市': 'Taoyuan City',
  'housing.tool.county.臺中市': 'Taichung City',
  'housing.tool.county.臺南市': 'Tainan City',
  'housing.tool.county.高雄市': 'Kaohsiung City',
  'housing.tool.county.基隆市': 'Keelung City',
  'housing.tool.county.新竹市': 'Hsinchu City',
  'housing.tool.county.新竹縣': 'Hsinchu County',
  'housing.tool.county.苗栗縣': 'Miaoli County',
  'housing.tool.county.彰化縣': 'Changhua County',
  'housing.tool.county.南投縣': 'Nantou County',
  'housing.tool.county.雲林縣': 'Yunlin County',
  'housing.tool.county.嘉義市': 'Chiayi City',
  'housing.tool.county.嘉義縣': 'Chiayi County',
  'housing.tool.county.屏東縣': 'Pingtung County',
  'housing.tool.county.宜蘭縣': 'Yilan County',
  'housing.tool.county.花蓮縣': 'Hualien County',
  'housing.tool.county.臺東縣': 'Taitung County',
  'housing.tool.county.澎湖縣': 'Penghu County',
  'housing.tool.county.金門縣': 'Kinmen County',
  'housing.tool.county.連江縣': 'Lienchiang County',

  // ── Tools hub page ────────────────────────────────────────────────
  'housing.tool.page.metaTitle':
    'Taiwan Mortgage Calculator 2026: Qing-An 3.0 and More',
  'housing.tool.page.metaDescription':
    'Free Taiwan mortgage calculator with Qing-An 3.0 step rates, a clause-by-clause eligibility check, an affordability check and a rent vs buy comparison. Terms as of {asOf}.',
  'housing.tool.page.eyebrow': 'Housing · Tools',
  'housing.tool.page.heroTitle': 'Mortgage and home-buying calculators',
  'housing.tool.page.heroSubtitle':
    'Four tools that run your own numbers on published policy terms and official statistics',
  'housing.tool.page.intro':
    'The mortgage calculator opens on a Qing-An 3.0 example: {amount} over {years} years with a {graceYears}-year grace period. Payments during the grace period are {gracePay}, the first payment after it is {after}, and the highest is {max}. Terms and rates are read from data published by the Treasury of the Ministry of Finance, as of {asOf}.',
  'housing.tool.page.back': 'Back to the housing topic',
  'housing.tool.page.toc': 'Tools on this page',
  'housing.tool.page.toc.mortgage': 'Mortgage calculator',
  'housing.tool.page.toc.afford': 'Affordability check',
  'housing.tool.page.toc.elig': 'Qing-An 3.0 eligibility',
  'housing.tool.page.toc.rentbuy': 'Rent vs buy',
  'housing.tool.page.h2.mortgage':
    'What a loan costs each month, and how the rate steps change it',
  'housing.tool.page.h2.afford':
    'Where the mortgage burden lands on the official scale',
  'housing.tool.page.h2.elig':
    'How many Qing-An 3.0 conditions you meet, one by one',
  'housing.tool.page.h2.rentbuy':
    'Whether buying or renting builds net worth first',
} as const;

export const housingUI = {
  en,
  'zh-TW': zh,
} as const;
