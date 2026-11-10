/**
 * /health 專題主頁與子頁文案（zh-TW／en）。
 * 數字一律用 {佔位}，由 src/utils/health/pageContext.ts 從資料檔帶入；[[key]] 是腳註，
 * key 對應 src/utils/health/sources.ts 的來源登記表（認不得會讓建置失敗）。
 */
export const page = {
  zh: {
    'hub.name': '醫療與長照',
    'meta.title': '台灣醫療與長照 2026：健保、長照 3.0、補助試算與各方立場',
    'meta.description':
      '一頁看懂台灣的健保與長照：制度怎麼來的、錢從哪裡來、急診與護理人力卡在哪、各方怎麼說。附長照補助與健保費試算，數字都有官方出處，截至 {asOf}。',
    'hero.eyebrow': '專題 · 醫療與長照',
    'hero.title': '台灣醫療與長照：一張健保卡之後的事',
    'hero.subtitle':
      '健保把「看病」接住了三十年。{reach20}，台灣 65 歲以上人口超過兩成，接下來要接住的是「老」：照顧的錢和人從哪裡來。',
    'hero.verse': '一張卡接住了病，\n下一張網要接住老。',
    'hero.stat.enroll': '健保納保率',
    'hero.stat.nhe': '{nheYear} 年醫療保健支出占 GDP',
    'hero.stat.elder': '65 歲以上人口（{elderAsOf}）',
    'hero.stat.er': '{erYear} 年急診留置超過 24 小時',
    'hero.stat.er.sub': '人次',
    'hero.brief': '三分鐘版',
    'hero.jump': '跳到各區',
    'hero.tools': '先算再讀',
    'subnav.label': '頁內導覽',
    'related.h': '延伸閱讀',
    pending: '待上線',

    'toc.s0': '制度',
    'toc.s0.take':
      '看診、住院、急診、長照、安寧，各有一本帳：健保靠保費，長照靠稅。',
    'toc.s1': '歷史',
    'toc.s1.take': '勞保、公保、農保各管各的四十五年，1995 年併成全民健保。',
    'toc.s2': '錢',
    'toc.s2.take':
      '健保連五年入不敷出後轉正，{resYear} 年底安全準備回到 {resMonths} 個月。',
    'toc.s3': '老',
    'toc.s3.take':
      '65 歲以上從 14% 到 20% 只用了七年；長照基金一年花掉 {ltcSpend} 億。',
    'toc.s4': '困境',
    'toc.s4.take': '醫學中心最危急的急診病人，每五位有一位等超過一天。',
    'toc.s5': '各方',
    'toc.s5.take': '錢怎麼補、點值保不保、護病比多快上路、長照要不要改保險。',
    'toc.s6': '未來',
    'toc.s6.take':
      '2040 年每三個人有一個 65 歲以上，已經排定的事與沒有答案的題目。',
    'toc.s7': '工具與來源',
    'toc.s7.take': '三個試算、一份流程指南、全部數字的官方出處。',

    's0.kicker': '先看全貌。',
    's0.h2': '從診所到安寧病房，一個人會經過六個制度站',
    's0.lede':
      '台灣的醫療與照顧分成兩本帳。看病、住院、急診、安寧走健保，錢來自保費；失能之後的日常照顧走長照，錢來自指定稅收。兩套制度各有自己的評估、額度與自付規則。',
    's0.col.pay': '誰出錢',
    's0.col.you': '你付多少',
    's0.st1.h': '診所與家醫',
    's0.st1.p':
      '多數人看病的第一站。健保特約院所 {contracted} 家，占全國院所 {contractedPct}%。[[coverage]]',
    's0.st1.pay': '健保（保費）',
    's0.st1.you': '門診基本部分負擔 {opdClinic} 元',
    's0.st2.h': '醫院門診',
    's0.st2.p':
      '分級醫療用價差引導：帶轉診單去大醫院比較便宜。[[nhi.copayOpd]]',
    's0.st2.pay': '健保（保費）',
    's0.st2.you': '醫學中心：轉診 {opdMcRef} 元，沒轉診 {opdMc} 元',
    's0.st3.h': '急診',
    's0.st3.p': '{erYear} 年全國急診 {erVisits} 萬人次。[[monitor2024]]',
    's0.st3.pay': '健保（保費）',
    's0.st3.you':
      '醫學中心 {emMc} 元、區域醫院 {emReg} 元、地區醫院與診所 {emDist} 元',
    's0.st4.h': '住院',
    's0.st4.p':
      '急性病房前 30 天自付一成，住越久比率越高，另有年度上限。[[nhi.law]][[nhi.copayCap]]',
    's0.st4.pay': '健保（保費）',
    's0.st4.you': '{capYear} 年上限：每次 {capStay} 元、全年 {capYearly} 元',
    's0.st5.h': '長期照顧',
    's0.st5.p':
      '撥 1966，照管專員到府評估第 2 到 8 級，核定四包額度。[[ltc.apply]]',
    's0.st5.pay': '長照基金（稅收）',
    's0.st5.you': '額度內自付 0%、5% 或 16%（照顧及專業服務）',
    's0.st6.h': '安寧與預立醫療決定',
    's0.st6.p':
      '安寧療護由健保給付；預立醫療決定要先做諮商，累計 {adTotal} 萬人次簽署。[[acpStats]]',
    's0.st6.pay': '健保（保費）',
    's0.st6.you': '符合條件者，諮商費由健保支付一次',
    's0.note':
      '**兩本帳的大小**：{bYear} 年健保總額 {b2026} 億元[[budgetHist]]；同年長照 3.0 跨部會經費 {plan2026} 億元[[plan3]]。{nheYear} 年全國醫療保健支出 {nheWan}，公部門出 {publicPct}%，家庭自己付 {householdPct}%。[[nhe]]',

    's1.kicker': '制度不是一天蓋好的。',
    's1.h2': '勞保、公保、農保各管各的四十五年，1995 年併成全民健保',
    's1.lede':
      '1950 年勞工保險開辦，之後公務人員、農民各有自己的保險，有工作身分才有醫療保障。1995 年 3 月 1 日全民健保上路，把所有人放進同一個保險。長照走了另一條路：2007 年的十年計畫、2017 年的長照 2.0、2026 年的長照 3.0，都用稅收支應。',
    's1.chart.title': '健保費率三十年調了五次，2021 年回到 2010 年的 5.17%',
    's1.chart.sub': '一般保險費率（%），1995 到 2026 年',
    's1.series.rate': '一般保險費率',
    's1.p1':
      '費率開辦時是 4.25%，2002 年調到 4.55%，2010 年到 5.17%。2013 年二代健保加收補充保費（股利、利息、租金、兼職所得等），一般費率降到 4.91%，2016 年再降到 4.69%，2021 年調回 5.17% 沿用至今。[[annual]][[rate2026]]',
    's1.p2':
      '長照這邊，2015 年《長期照顧服務法》公布，2017 年 6 月施行並設置長照服務發展基金；同年長照 2.0 上路，把服務對象從失能老人擴大到失智者與失能身心障礙者。長照 3.0 的計畫期是 2026 到 2035 年，行政院在 2025 年 12 月 31 日核定。[[plan3]]',
    's1.tl.h': '制度時間軸',

    's2.kicker': '保費收進來，醫療費付出去。',
    's2.h2': '健保連五年入不敷出之後轉正，安全準備回到三個月',
    's2.lede':
      '健保的帳很單純：一年收多少保費、付多少醫療費，差額進出「安全準備」這個水庫。法律要求水庫維持在一到三個月的給付額。',
    's2.c1.title': '2017 到 2021 年支出大於收入，2021 年調費率後翻回來',
    's2.c1.sub':
      '保險收入與保險成本（億元，權責基礎審定決算），2010 到 2023 年',
    's2.series.income': '保險收入',
    's2.series.cost': '保險成本',
    's2.c2.title':
      '安全準備從 2,474 億掉到 936 億，{resYear} 年底回到 {reserve} 億',
    's2.c2.sub': '年底安全準備累計餘額（億元），2010 到 {resYear} 年',
    's2.series.reserve': '安全準備餘額',
    's2.p1':
      '2016 年底安全準備有 2,474 億元。之後五年每年都是支出大於收入，2020 年單年短少 676 億，到 2021 年底只剩 936 億，約 1.55 個月。[[trend2023]][[fin111]] 2021 年費率調回 5.17%，2022 年起轉為結餘，{resYear} 年底累計 {reserve} 億元，約當 {resMonths} 個月的給付。[[final2025]]',
    's2.p2':
      '支出端由「總額」控制：每年先談好一個上限。總額從 2014 年的 {b2014} 億元長到 2026 年的 {b2026} 億元[[budgetHist]]，2027 年度的協商結果是 {b2027} 億元，第一次超過一兆，還要等衛福部核定。健保會同時推估，在費率不變下 2027 年底安全準備會降到 819 億元、約 1.01 個月。[[budget2027]] 行政院在 2027 年度總預算案編了 600 億元撥補健保基金，這筆錢還要立法院審。[[dgbas2027]]',
    's2.c3.title': '台灣花 GDP 的 7% 上下在醫療保健，二十年沒有超過 8%',
    's2.c3.sub': '國民醫療保健支出占 GDP（%），2000 到 {nheYear} 年',
    's2.series.nhe': '醫療保健支出占 GDP',
    's2.p3':
      '把健保、政府預算、家庭自費全部加起來，{nheYear} 年全國醫療保健支出是 {nheWan}，占 GDP {nheGdp}%，平均每人 {nhePerCap} 元。2024 年占比下降，是因為那一年名目 GDP 成長 9.1%，分母長得比醫療支出快。[[nhe]]',
    's2.note':
      '**讀圖注意**：2024、2025 年的收入與成本改用基金決算口徑，跟前面不能接成同一條線，所以第一張圖只畫到 2023 年；安全準備餘額兩種口徑一致，可以畫到 {resYear} 年。',

    's3.kicker': '人變老的速度，比制度長大的速度快。',
    's3.h2': '65 歲以上從 7% 到 14% 走了二十五年，從 14% 到 20% 只用七年',
    's3.lede':
      '1993 年底，台灣 65 歲以上人口占 7.10%。2018 年 3 月到 14.05%，2025 年 12 月底到 20.06%，進入國際定義的超高齡社會。{elderAsOf}是 {elderPct}%，{elderWan} 萬人。[[moi2018]][[moi202512]][[moi202609]]',
    's3.c1.title': '照國發會的中推估，2040 年每三個人有一個 65 歲以上',
    's3.c1.sub':
      '65 歲以上人口占比（%）：1993 到 2025 年為年底戶籍人口，之後為 2024 年版中推估',
    's3.series.elder': '65 歲以上占比',
    's3.proj': '推估',
    's3.th7': '7% 高齡化社會',
    's3.th14': '14% 高齡社會',
    's3.th20': '20% 超高齡社會',
    's3.p1':
      '國發會 2024 年版的中推估：2030 年 24.2%、2040 年 31.0%、2050 年 38.4%，老年人口在 2050 年到頂，757 萬人。[[ndc2024]] 國發會已經發布 2026 到 2075 年的新版推估，官方原頁我們這次打不開，圖上用的是前一版。',
    's3.c2.title':
      '長照基金支出八年從 14 億長到 {ltcSpend} 億，收入一直比支出多',
    's3.c2.sub': '長照服務發展基金決算（億元），2017 到 {fundYear} 年',
    's3.series.fundIn': '基金收入',
    's3.series.fundOut': '基金支出',
    's3.p2':
      '長照的錢來自指定稅收：房地合一稅、菸稅、遺產及贈與稅的增額。基金 2017 年設立那年支出 13.5 億元，{fundYear} 年 {ltcSpend} 億元；收入每年都高於支出，{fundYear} 年底累積餘額 {ltcBalance} 億元。[[ltcFund]] 長照 3.0 估 2026 年跨部會經費 {plan2026} 億元，十年合計 1 兆 4,457 億元。[[plan3]]',
    's3.p3':
      '領長照給付的人數，2017 年是 {ltcPaid2017} 萬人，{fundYear} 年 {ltcPaid} 萬人；加上住宿式機構與失智、衰弱長者的服務，{fundYear} 年合計 {ltcUsers} 萬人，官方算出的服務涵蓋率 {ltcCoverage}%。[[coverage2025]] 這個涵蓋率的算法在 2019 年與 2022 年各改過一次，前後不能直接比。',
    's3.c3.title':
      '家裡的照顧主力：外籍看護工 {migrantWan} 萬人，長照體系的照服員 {careWan} 萬人',
    's3.c3.sub':
      '人數（萬人）：外籍看護工為年底數，照顧服務員為登錄於長照單位人數',
    's3.series.migrant': '外籍看護工',
    's3.series.care': '照顧服務員',
    's3.p4':
      '{migrantAsOf}，在台外籍看護工 {migrant} 人[[molMonthly]]；{fundYear} 年底登錄在長照服務單位的照顧服務員 {careWorkers} 人[[careWorkers]]。聘了外籍看護的家庭，長照的照顧服務額度只給三成。兩套照顧系統怎麼接，是長照 3.0 還在處理的題目。',

    's4.kicker': '制度撐得住平常日，卡在尖峰與邊緣。',
    's4.h2': '卡住的地方有三個：急診的床、夜班的人、離醫院的距離',
    's4.lede':
      '健保的滿意度 {satYear} 年是 {satisfaction}%[[coverage]]，同一年醫學中心急診的留置比率是近三年最高。兩個數字都是真的。',
    's4.c1.title':
      '急診留置超過 24 小時：{erYear} 年全國 {erAll}%，醫學中心 {erMc}%',
    's4.c1.sub':
      '留置超過 24 小時人次 ÷ 急診總人次（%）；2020、2021 年沒有資料',
    's4.series.erAll': '醫院整體',
    's4.series.erMc': '醫學中心',
    's4.p1':
      '{erYear} 年全國 {erVisits} 萬急診人次裡，{erOver24} 萬人次在急診室待超過 24 小時。醫學中心檢傷第 1 級（需要立即處理）的病人，留置比率 {triage1}%，每五位有一位。健保署自己列的原因有兩個：非急重症病人湧進急診、住院病床與護理人力不足讓病人上不了病房。[[monitor2024]]',
    's4.c2.title': '護理人員十年多了 4.8 萬人，2023 年醫院空缺率還是升到 9%',
    's4.c2.sub': '機構執業護理人員數（萬人），2015 到 {wfYear} 年',
    's4.series.nurses': '執業護理人員',
    's4.p2':
      '{wfYear} 年底機構執業的護理師與護士 {nurses} 人，每萬人口 {nursesPer10k} 人。[[stat43]] 人數年年增加，醫院的空缺率卻從 2019 年的 4.52% 升到 2023 年的 9.05%，離職率 12.61%。[[lyNurse]] 2025 年 12 月領有證書（不含 65 歲以上未執業者）的有 {licensed} 人，在執業的 {practising} 人。[[nurseMonthly]]',
    's4.p2b':
      '三班護病比 2024 年 3 月起有了標準：醫學中心白班 1 位護理師照顧 6 床、小夜 9 床、大夜 11 床。[[ratioStd]] 2026 年 5 月 15 日修正公布的《醫療法》把它寫進法律並訂出罰則；實際開罰日期由子法決定，我們沒有查到已發布的官方日期。[[medAct]]',
    's4.c3.title': '每萬人口醫師數：臺北市 {docTop} 人，金門縣 {docLow} 人',
    's4.c3.sub':
      '各縣市每萬人口執業西醫師數，{wfYear} 年底；黑色為全國平均 {docAvg} 人',
    's4.c3.avg': '全國',
    's4.p3':
      '{wfYear} 年底全國每萬人口有 {docAvg} 位執業西醫師。臺北市 {docTop}、嘉義市 37.73、花蓮縣 28.71 在前段；金門縣 {docLow}、苗栗縣 10.88、澎湖縣 12.18 在後段。[[stat17]] 嘉義市與花蓮縣的數字高，是因為那裡的大醫院也收外縣市的病人。',

    's5.kicker': '同一筆錢，從不同位置看出去不一樣。',
    's5.h2': '四個還在吵的題目，各方自己怎麼說',
    's5.lede':
      '下面每一則都帶姓名、職稱、日期與出處。引號裡是來源頁上的原話；標「轉述」的是報導改寫，不是當事人原句。我們不替任何一方下結論。',
    's5.paraphrase': '轉述',
    's5.missing': '沒有找到的聲音：',

    's6.kicker': '有些事已經寫在行事曆上。',
    's6.h2': '2040 年每三個人有一個 65 歲以上：排定的事與沒有答案的題目',
    's6.lede':
      '長照 3.0 推估，需要長照的失能人數會從 2026 年的 {need2026} 萬人增加到 2035 年的 {need2035} 萬人（高推估）。[[plan3]] 接下來幾年有幾件事日期已定。',
    's6.sched.h': '已經排定',
    's6.sched.1':
      '**2026 年 1 月**：長照對象納入不分年齡的失智症者與急性後期照護個案；住宿式機構補助提高到每年最高 18 萬元。[[ltc.amend]][[ltc.residentialNews]]',
    's6.sched.2':
      '**2026 年 7 月**：長照輔具新增第二組額度（每 3 年 6 萬元），可租智慧科技輔具。[[ltc.table2]]',
    's6.sched.3':
      '**2027 年**：健保總額協商結果 {b2027} 億元，待核定；總預算案編列 600 億元撥補健保基金，待立法院審議。[[budget2027]][[dgbas2027]]',
    's6.sched.4':
      '**2026 到 2035 年**：長照 3.0 計畫期，十年經費估 1 兆 4,457 億元。[[plan3]]',
    's6.open.h': '還沒有答案',
    's6.open.1':
      '健保的收入要靠什麼長大：調費率、改補充保費、每年撥公務預算，還是改用家戶所得計費。',
    's6.open.2':
      '長照繼續用稅收，還是改成保險。3.0 核定本寫的是以指定稅收為財源，並保留研議其他穩定稅源。[[plan3]]',
    's6.open.3':
      '二十多萬名外籍家庭看護工，要不要納進長照體系，由誰聘、適用什麼勞動條件。',
    's6.open.4': '護病比的罰則什麼時候開始算，醫院補得到人嗎。',
    's6.p1':
      '壽命也在這張圖裡：2025 年國人平均壽命 {lifeAll} 歲[[lifeMoi]]；2024 年的健康平均餘命是 {healthy} 歲，同年平均餘命 {life2024} 歲，兩個數字相差約 {lifeGap} 年。[[lifeStat]] 那幾年怎麼過，是醫療與長照加在一起的題目。',

    's7.kicker': '數字要能自己查，工具要能自己算。',
    's7.h2': '三個試算、一份流程指南，與這一頁的所有出處',
    's7.tools.h': '便民工具',
    's7.read.h': '站上相關文章',
    's7.read.pending': '下列文章已有投稿，審查後上線：',
    's7.guide.h': '怎麼讀這一頁',
    's7.g1.h': '數字的日期',
    's7.g1.p':
      '每個數字後面的小數字連到出處，出處寫了資料截止時間。補助金額與費率截至 {asOf}。',
    's7.g2.h': '沒有資料就寫沒有',
    's7.g2.p':
      '查不到官方原文的年份在圖上留空、在表裡寫「沒有資料」，不內插、不估算。',
    's7.g3.h': '口徑不同不硬接',
    's7.g3.p':
      '長照涵蓋率、照服員人數、健保收支都換過算法。換算法的地方，圖會斷開或在說明裡寫明。',
    's7.g4.h': '引句與轉述分開',
    's7.g4.p':
      '各方立場裡，引號內的話都用腳本對過來源頁原文；報導改寫的標為轉述。',
    's7.sources.h': '資料來源',
    's7.sources.p':
      '下面是這個專題用到的全部來源。原始查證檔與資料檔都在 GitHub 上，歡迎指出錯誤。',
    's7.download': '下載資料檔（JSON）',
    's7.corrections': '回報錯誤',
    's7.more.h': '其他入口',
    's7.more.budget': '總預算十年',
    's7.more.data': '資料指標',
    's7.more.timeline': '台灣時間軸',
    's7.more.map': '地圖',
    updated: '資料截至 ',

    'tool.k': '試算工具',
    'tool.k.guide': '流程指南',
    'tool.sources.h': '資料來源與截止日期',
    'tool.more.h': '接著看',
    'tool.more.hub.k': '專題主頁',
    'tool.more.hub.d': '制度怎麼來的、錢從哪裡來、卡在哪裡、各方怎麼說。',
    'tool.long-term-care-subsidy.t': '長照補助額度試算',
    'tool.long-term-care-subsidy.d':
      '依等級、身分別、縣市，算四項給付的額度與自付上限。',
    'tool.long-term-care-eligibility.t': '長照資格自查',
    'tool.long-term-care-eligibility.d':
      '五個問題，對照現行條文看是不是給付對象。',
    'tool.nhi-premium-calculator.t': '健保費試算',
    'tool.nhi-premium-calculator.d': '月薪、身分、眷屬人數，加上補充保費。',
    'tool.advance-care-planning.t': '安寧與預立醫療決定',
    'tool.advance-care-planning.d':
      '從諮商到註記健保卡的四個步驟，與兩部法律的差別。',
  },
  en: {
    'hub.name': 'Health and Long-Term Care',
    'meta.title': "Taiwan's Health Care and Long-Term Care in 2026 | Taiwan.md",
    'meta.description':
      "How Taiwan's National Health Insurance and long-term care work: history, money, pressure points and what each side says, with subsidy and premium calculators. Official sources, as of {asOf}.",
    'hero.eyebrow': 'Topic · Health and long-term care',
    'hero.title':
      "Taiwan's health care and long-term care: what comes after the NHI card",
    'hero.subtitle':
      'National Health Insurance has covered illness for thirty years. {reach20}, people 65 and over passed one fifth of the population. The next thing to cover is old age: where the money and the carers will come from.',
    'hero.verse':
      'One card caught illness.\nThe next net has to catch old age.',
    'hero.stat.enroll': 'NHI enrollment',
    'hero.stat.nhe': 'Health spending as share of GDP, {nheYear}',
    'hero.stat.elder': 'Aged 65 and over ({elderAsOf})',
    'hero.stat.er': 'ER stays over 24 hours, {erYear}',
    'hero.stat.er.sub': 'visits',
    'hero.brief': 'The three-minute version',
    'hero.jump': 'Jump to a section',
    'hero.tools': 'Calculate first',
    'subnav.label': 'On this page',
    'related.h': 'Further reading',
    pending: 'coming soon',

    'toc.s0': 'System',
    'toc.s0.take':
      'Clinic, hospital, ER, long-term care, hospice: NHI runs on premiums, long-term care on taxes.',
    'toc.s1': 'History',
    'toc.s1.take':
      'Labour, civil service and farmer insurance ran apart for 45 years before merging in 1995.',
    'toc.s2': 'Money',
    'toc.s2.take':
      'After five years of deficits the NHI turned positive; reserves were back to {resMonths} months at end-{resYear}.',
    'toc.s3': 'Ageing',
    'toc.s3.take':
      'From 14% to 20% aged 65 and over took seven years; the care fund now spends {ltcSpend} a year.',
    'toc.s4': 'Pressure',
    'toc.s4.take':
      'One in five of the most urgent ER patients at medical centers waits more than a day.',
    'toc.s5': 'Positions',
    'toc.s5.take':
      'How to fund it, whether to guarantee point values, how fast to enforce nurse ratios, tax or insurance for care.',
    'toc.s6': 'Ahead',
    'toc.s6.take':
      'By 2040 one in three will be 65 or over: what is scheduled and what is unanswered.',
    'toc.s7': 'Tools and sources',
    'toc.s7.take':
      'Three calculators, one guide, and the official source for every figure.',

    's0.kicker': 'The whole picture first.',
    's0.h2': 'From clinic to hospice, a person passes six stations',
    's0.lede':
      'Health and care in Taiwan run on two ledgers. Doctor visits, hospital stays, emergency care and hospice go through the NHI, funded by premiums. Daily care after disability goes through long-term care, funded by earmarked taxes. Each has its own assessment, ceilings and copay rules.',
    's0.col.pay': 'Who pays',
    's0.col.you': 'What you pay',
    's0.st1.h': 'Clinics and family doctors',
    's0.st1.p':
      'The first stop for most people. {contracted} contracted providers, {contractedPct}% of all facilities.[[coverage]]',
    's0.st1.pay': 'NHI (premiums)',
    's0.st1.you': 'Basic outpatient copay NT${opdClinic}',
    's0.st2.h': 'Hospital outpatient',
    's0.st2.p':
      'Tiered care steers with price: a referral makes a large hospital cheaper.[[nhi.copayOpd]]',
    's0.st2.pay': 'NHI (premiums)',
    's0.st2.you':
      'Medical center: NT${opdMcRef} with referral, NT${opdMc} without',
    's0.st3.h': 'Emergency room',
    's0.st3.p': '{erVisits} ER visits nationwide in {erYear}.[[monitor2024]]',
    's0.st3.pay': 'NHI (premiums)',
    's0.st3.you':
      'Medical center NT${emMc}, regional NT${emReg}, district hospitals and clinics NT${emDist}',
    's0.st4.h': 'Hospital stay',
    's0.st4.p':
      '10% for the first 30 days in an acute ward, rising with length of stay, with annual caps.[[nhi.law]][[nhi.copayCap]]',
    's0.st4.pay': 'NHI (premiums)',
    's0.st4.you':
      '{capYear} caps: NT${capStay} per stay, NT${capYearly} per year',
    's0.st5.h': 'Long-term care',
    's0.st5.p':
      'Call 1966; a care manager assesses Level 2 to 8 at home and sets four allowances.[[ltc.apply]]',
    's0.st5.pay': 'Long-term care fund (taxes)',
    's0.st5.you': '0%, 5% or 16% within the allowance (care services)',
    's0.st6.h': 'Hospice and advance decisions',
    's0.st6.p':
      'Hospice is covered by the NHI; an advance decision requires a consultation first. {adTotal} have signed.[[acpStats]]',
    's0.st6.pay': 'NHI (premiums)',
    's0.st6.you': 'For eligible patients the NHI pays the consultation once',
    's0.note':
      '**Size of the two ledgers**: the {bYear} NHI global budget is {b2026}[[budgetHist]]; long-term care 3.0 across ministries is {plan2026} the same year[[plan3]]. National health expenditure in {nheYear} was {nheWan}: {publicPct}% public, {householdPct}% paid by households.[[nhe]]',

    's1.kicker': 'The system was not built in a day.',
    's1.h2':
      'Labour, civil service and farmer insurance ran apart for 45 years, then merged in 1995',
    's1.lede':
      'Labour Insurance began in 1950; civil servants and farmers later got their own schemes, and medical cover depended on employment status. On 1 March 1995 National Health Insurance put everyone in one scheme. Long-term care took another route: the ten-year plan of 2007, version 2.0 in 2017 and 3.0 in 2026 are all tax-funded.',
    's1.chart.title':
      'The premium rate changed five times in thirty years and in 2021 returned to the 5.17% of 2010',
    's1.chart.sub': 'General premium rate (%), 1995 to 2026',
    's1.series.rate': 'General premium rate',
    's1.p1':
      'The rate started at 4.25%, rose to 4.55% in 2002 and 5.17% in 2010. In 2013 second-generation NHI added a supplementary premium on dividends, interest, rent and part-time pay, and the general rate fell to 4.91%, then 4.69% in 2016. It returned to 5.17% in 2021 and has stayed there.[[annual]][[rate2026]]',
    's1.p2':
      'On the care side, the Long-Term Care Services Act was promulgated in 2015 and took effect in June 2017 together with the care fund; version 2.0 began the same year and extended eligibility to people with dementia and disabled people under 65. Version 3.0 runs from 2026 to 2035 and was approved by the Executive Yuan on 31 December 2025.[[plan3]]',
    's1.tl.h': 'Timeline',

    's2.kicker': 'Premiums in, medical bills out.',
    's2.h2':
      'After five years in the red the NHI turned positive and reserves are back to three months',
    's2.lede':
      'The NHI ledger is simple: premiums collected and medical costs paid in a year, with the difference flowing in or out of a reserve. The law asks for a reserve of one to three months of benefits.',
    's2.c1.title':
      'Costs exceeded revenue from 2017 to 2021; the 2021 rate rise reversed it',
    's2.c1.sub':
      'Insurance revenue and cost (NT$100 million, audited accrual accounts), 2010 to 2023',
    's2.series.income': 'Revenue',
    's2.series.cost': 'Cost',
    's2.c2.title':
      'The reserve fell from 2,474 to 936 and recovered to {reserve} by end-{resYear}',
    's2.c2.sub': 'Year-end reserve (NT$100 million), 2010 to {resYear}',
    's2.series.reserve': 'Reserve',
    's2.p1':
      'The reserve stood at NT$247.4 billion at end-2016. Costs then exceeded revenue five years running, with a NT$67.6 billion shortfall in 2020, leaving NT$93.6 billion or about 1.55 months at end-2021.[[trend2023]][[fin111]] The rate went back to 5.17% in 2021; surpluses resumed in 2022 and the reserve reached {reserve} at end-{resYear}, about {resMonths} months of benefits.[[final2025]]',
    's2.p2':
      'Spending is capped by a global budget negotiated each year. It grew from {b2014} in 2014 to {b2026} in 2026[[budgetHist]]; the negotiated figure for 2027 is {b2027}, the first above NT$1 trillion, pending ministry approval. The NHI Committee projects that at the current rate the reserve would fall to NT$81.9 billion, about 1.01 months, by end-2027.[[budget2027]] The 2027 budget bill includes a NT$60 billion transfer to the NHI fund, subject to legislative review.[[dgbas2027]]',
    's2.c3.title':
      'Taiwan spends about 7% of GDP on health and has not passed 8% in twenty years',
    's2.c3.sub':
      'National health expenditure as share of GDP (%), 2000 to {nheYear}',
    's2.series.nhe': 'Health spending / GDP',
    's2.p3':
      'Adding NHI, government budgets and household spending, national health expenditure in {nheYear} was {nheWan}, {nheGdp}% of GDP, or NT${nhePerCap} per person. The share fell in 2024 because nominal GDP grew 9.1% that year, faster than health spending.[[nhe]]',
    's2.note':
      '**Reading the charts**: revenue and cost for 2024 and 2025 use the fund accounts, a different basis, so the first chart stops at 2023; the reserve is consistent across both and runs to {resYear}.',

    's3.kicker': 'People age faster than systems grow.',
    's3.h2':
      'From 7% to 14% aged 65 and over took 25 years; from 14% to 20% took seven',
    's3.lede':
      'At end-1993, 7.10% of the population was 65 or over. It reached 14.05% in March 2018 and 20.06% at end-December 2025, the international threshold for a super-aged society. In {elderAsOf} it was {elderPct}%, or {elderWan} people.[[moi2018]][[moi202512]][[moi202609]]',
    's3.c1.title':
      'On the medium projection, one in three people will be 65 or over by 2040',
    's3.c1.sub':
      'Share aged 65 and over (%): year-end registered population to 2025, then the 2024 medium projection',
    's3.series.elder': 'Aged 65+',
    's3.proj': 'Projection',
    's3.th7': '7% ageing',
    's3.th14': '14% aged',
    's3.th20': '20% super-aged',
    's3.p1':
      "The National Development Council's 2024 medium projection gives 24.2% in 2030, 31.0% in 2040 and 38.4% in 2050, when the older population peaks at 7.57 million.[[ndc2024]] A newer 2026 to 2075 projection has been published; we could not open the official page this time, so the chart uses the previous edition.",
    's3.c2.title':
      'Care fund spending rose from NT$1.4 billion to {ltcSpend} in eight years, with income always higher',
    's3.c2.sub':
      'Long-term care fund accounts (NT$100 million), 2017 to {fundYear}',
    's3.series.fundIn': 'Fund income',
    's3.series.fundOut': 'Fund spending',
    's3.p2':
      'Long-term care is paid from earmarked taxes: the consolidated property tax and increases in tobacco and estate and gift taxes. The fund spent NT$1.35 billion in its first year, 2017, and {ltcSpend} in {fundYear}; income has exceeded spending every year and the balance was {ltcBalance} at end-{fundYear}.[[ltcFund]] Version 3.0 estimates {plan2026} across ministries for 2026 and NT$1.4457 trillion over ten years.[[plan3]]',
    's3.p3':
      'People receiving care benefits rose from {ltcPaid2017} in 2017 to {ltcPaid} in {fundYear}; with residential facilities and services for dementia and frail elders the total was {ltcUsers}, an official coverage rate of {ltcCoverage}%.[[coverage2025]] The definition of that rate changed in 2019 and 2022, so earlier and later values are not directly comparable.',
    's3.c3.title':
      'Who does the caring at home: {migrantWan} migrant care workers, {careWan} care workers in the system',
    's3.c3.sub':
      'Headcount (10,000 persons): migrant care workers at year-end; care workers registered with care providers',
    's3.series.migrant': 'Migrant care workers',
    's3.series.care': 'Care workers',
    's3.p4':
      'In {migrantAsOf} there were {migrant} migrant care workers in Taiwan[[molMonthly]]; {careWorkers} care workers were registered with care providers at end-{fundYear}[[careWorkers]]. Households with a migrant caregiver receive only 30% of the care service allowance. How the two care systems connect is still being worked out under version 3.0.',

    's4.kicker':
      'The system holds on ordinary days and strains at the peaks and edges.',
    's4.h2':
      'Three places where it sticks: ER beds, night shifts, and distance from a hospital',
    's4.lede':
      'Satisfaction with the NHI was {satisfaction}% in {satYear}[[coverage]]; the same year the share of long ER stays at medical centers was the highest in three years. Both figures are true.',
    's4.c1.title':
      'ER stays over 24 hours: {erAll}% nationwide and {erMc}% at medical centers in {erYear}',
    's4.c1.sub':
      'Visits staying over 24 hours ÷ all ER visits (%); no data for 2020 and 2021',
    's4.series.erAll': 'All hospitals',
    's4.series.erMc': 'Medical centers',
    's4.p1':
      'Of {erVisits} ER visits in {erYear}, {erOver24} stayed more than 24 hours. Among triage level 1 patients at medical centers, who need immediate treatment, the share was {triage1}%, one in five. The NHI Administration lists two causes: non-urgent patients crowding the ER, and too few beds and nurses to move patients to wards.[[monitor2024]]',
    's4.c2.title':
      'Nurses grew by 48,000 in ten years, yet hospital vacancies still rose to 9% in 2023',
    's4.c2.sub':
      'Practising nurses in facilities (10,000 persons), 2015 to {wfYear}',
    's4.series.nurses': 'Practising nurses',
    's4.p2':
      'At end-{wfYear} there were {nurses} practising nurses in facilities, {nursesPer10k} per 10,000 people.[[stat43]] Numbers rise every year, but hospital vacancy rates went from 4.52% in 2019 to 9.05% in 2023, with turnover at 12.61%.[[lyNurse]] In December 2025, {licensed} people held a licence (excluding those over 65 not practising) and {practising} were practising.[[nurseMonthly]]',
    's4.p2b':
      'Three-shift nurse-to-patient standards took effect in March 2024: at medical centers one nurse to 6 beds by day, 9 in the evening and 11 at night.[[ratioStd]] The Medical Care Act as amended on 15 May 2026 wrote the ratios into law with fines; the date fines begin is set by subordinate rules, and we found no published official date.[[medAct]]',
    's4.c3.title':
      'Physicians per 10,000 people: {docTop} in Taipei, {docLow} in Kinmen',
    's4.c3.sub':
      'Practising physicians per 10,000 people by county, end-{wfYear}; black is the national average of {docAvg}',
    's4.c3.avg': 'Taiwan',
    's4.p3':
      'At end-{wfYear} there were {docAvg} practising physicians per 10,000 people. Taipei ({docTop}), Chiayi City (37.73) and Hualien (28.71) are at the top; Kinmen ({docLow}), Miaoli (10.88) and Penghu (12.18) at the bottom.[[stat17]] Chiayi City and Hualien rank high because their large hospitals also serve patients from other counties.',

    's5.kicker': 'The same money looks different from each seat.',
    's5.h2': 'Four open disputes, in each side’s own words',
    's5.lede':
      'Every item carries a name, title, date and source. Quotation marks hold words found on the source page (translated here; the original Chinese is on the zh-TW page). Items marked "paraphrase" are reporters’ summaries. We draw no conclusion for any side.',
    's5.paraphrase': 'paraphrase',
    's5.missing': 'Voices we could not find: ',

    's6.kicker': 'Some things are already on the calendar.',
    's6.h2':
      'One in three aged 65 or over by 2040: what is scheduled and what is unanswered',
    's6.lede':
      'Version 3.0 projects that people needing long-term care will rise from {need2026} in 2026 to {need2035} in 2035 (high projection).[[plan3]] Several dates in the coming years are fixed.',
    's6.sched.h': 'Scheduled',
    's6.sched.1':
      '**January 2026**: care eligibility extends to dementia at any age and post-acute care cases; the residential subsidy rises to as much as NT$180,000 a year.[[ltc.amend]][[ltc.residentialNews]]',
    's6.sched.2':
      '**July 2026**: a second device allowance (NT$60,000 every three years) for renting smart assistive technology.[[ltc.table2]]',
    's6.sched.3':
      '**2027**: negotiated NHI global budget of {b2027}, pending approval; a NT$60 billion transfer to the NHI fund in the budget bill, pending legislative review.[[budget2027]][[dgbas2027]]',
    's6.sched.4':
      '**2026 to 2035**: long-term care 3.0, estimated at NT$1.4457 trillion over ten years.[[plan3]]',
    's6.open.h': 'Unanswered',
    's6.open.1':
      'What NHI revenue should grow on: a higher rate, a reformed supplementary premium, annual budget transfers, or a household-income base.',
    's6.open.2':
      'Whether long-term care stays tax-funded or moves to insurance. The 3.0 plan keeps earmarked taxes and leaves room to study other stable tax sources.[[plan3]]',
    's6.open.3':
      'Whether more than 200,000 migrant live-in caregivers should be brought into the care system, who would employ them and under what labour conditions.',
    's6.open.4':
      'When fines for nurse ratios begin, and whether hospitals can hire enough people.',
    's6.p1':
      'Life expectancy belongs in this picture too: {lifeAll} years in 2025[[lifeMoi]]; healthy life expectancy was {healthy} years in 2024 against a life expectancy of {life2024}, a gap of about {lifeGap} years.[[lifeStat]] How those years are lived is a question for health care and long-term care together.',

    's7.kicker': 'Figures you can check, tools you can run.',
    's7.h2': 'Three calculators, one guide, and every source on this page',
    's7.tools.h': 'Tools',
    's7.read.h': 'Related articles on Taiwan.md',
    's7.read.pending': 'Submitted and under review:',
    's7.guide.h': 'How to read this page',
    's7.g1.h': 'Dates on figures',
    's7.g1.p':
      'The small number after each figure links to its source, which states the cut-off. Subsidies and rates are as of {asOf}.',
    's7.g2.h': 'No data means no data',
    's7.g2.p':
      'Years without an official figure are left blank on charts and marked in tables. Nothing is interpolated or estimated.',
    's7.g3.h': 'Different definitions are not joined',
    's7.g3.p':
      'Coverage rates, care worker counts and NHI accounts have all changed definition. Where they did, lines break or the note says so.',
    's7.g4.h': 'Quotes and paraphrase kept apart',
    's7.g4.p':
      'Quoted words were checked against the source pages by script; reporters’ summaries are marked as paraphrase.',
    's7.sources.h': 'Sources',
    's7.sources.p':
      'All sources used in this topic. The research notes and data files are on GitHub; corrections are welcome.',
    's7.download': 'Download the data (JSON)',
    's7.corrections': 'Report an error',
    's7.more.h': 'Elsewhere on the site',
    's7.more.budget': 'A decade of budgets',
    's7.more.data': 'Data indicators',
    's7.more.timeline': 'Timeline',
    's7.more.map': 'Map',
    updated: 'Data as of ',

    'tool.k': 'Calculator',
    'tool.k.guide': 'Guide',
    'tool.sources.h': 'Sources and cut-off dates',
    'tool.more.h': 'Keep reading',
    'tool.more.hub.k': 'Topic home',
    'tool.more.hub.d':
      'How the system came about, where the money comes from, where it strains, and what each side says.',
    'tool.long-term-care-subsidy.t': 'Long-term care subsidy calculator',
    'tool.long-term-care-subsidy.d':
      'Allowances and copay ceilings by level, category and county.',
    'tool.long-term-care-eligibility.t': 'Long-term care eligibility check',
    'tool.long-term-care-eligibility.d':
      'Five questions against the current rules.',
    'tool.nhi-premium-calculator.t': 'NHI premium calculator',
    'tool.nhi-premium-calculator.d':
      'Salary, category, dependents, plus the supplementary premium.',
    'tool.advance-care-planning.t': 'Hospice and advance decisions',
    'tool.advance-care-planning.d':
      'Four steps from consultation to the note on your NHI card, and how the two laws differ.',
  },
} as const;
