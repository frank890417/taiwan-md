/**
 * housing-home.ts — /housing/ 主頁（長卷）的文案。zh-TW 與 en 完整，其他語言回 en。
 *
 * 規則：
 * - 文案裡的數字一律是 {佔位}，由各章元件在 build 時從 src/data/housing/*.json 算出後用 fill() 填入，
 *   這裡不寫任何資料數字。
 * - 書寫紀律（MANIFESTO §11）：無對位句型、無破折號、不中英夾雜（專有名詞除外）。
 * - en 版給不熟台灣制度的讀者：Qing-An loan、grace period、actual price registration
 *   各在第一次出現處加一句解釋。
 * - 與 src/i18n/housing.ts（工具文案）互不引用。
 */

// 語言鍵包在 byLang 底下：check-ui-language.mjs 靠「'zh-TW': {」「en: {」這種行認語言區塊
const dicts = {
  byLang: {
    'zh-TW': {
      meta: {
        title: '台灣房地產 2026：房價所得比、房貸、青安與各方立場',
        description:
          '{year} 年全國房價所得比 {pti} 倍（{period}，內政部）。整理戰後住宅政策、青安貸款三代條件與各方公開說法，另附房貸試算等 {nTools} 個便民工具，數字都附官方來源與截止日。',
      },
      ui: {
        source: '來源：',
        asOf: '截至',
        derived: '本站計算',
        dataTable: '資料表',
        primary: '一手',
        reported: '轉述',
        noData: '沒有資料',
        item: '項目',
        period: '期別',
        note: '備註',
        yes: '是',
        zhOnly: '中文',
        related: '延伸閱讀',
      },
      agencies: {} as Record<string, string>,
      hero: {
        eyebrow: '專題 · 居住',
        title: '台灣的房價、房貸與青安 2026',
        lede: '{period}，全國房價所得比是 {pti} 倍，房貸負擔率 {burden}%（內政部）。這一頁把價格、貸款、制度、歷史和各方說法排在同一條捲軸上，每個數字都附官方來源與截止日。',
        pti: {
          label: '全國房價所得比',
          unit: '倍',
          sub: '中位數住宅價格是中位數家戶可支配所得的幾倍，{period}。',
        },
        burden: {
          label: '全國房貸負擔率',
          sub: '每月房貸佔可支配所得的比例，內政部分級為「{level}」。',
        },
        qingan: {
          label: '青安 3.0 前 {n} 年利率',
          sub: '一段式機動利率，之後每年調高 {step} 個百分點，第 {yr} 年起是 {base}%。',
        },
        cue: '先試算自己的房貸，再往下看這些數字怎麼來的',
        cta: '先試算房貸',
      },
      nav: {
        label: '本頁章節',
        tool: '房貸試算',
        price: '房價所得比',
        county: '各縣市',
        history: '歷史',
        system: '制度',
        controls: '央行管制',
        qingan: '青安 3.0',
        positions: '各方立場',
        strengths: '優勢',
        gaps: '困境',
        future: '未來',
        links: '延伸閱讀',
        sources: '資料來源',
      },
      s1: {
        kicker: '看別人的數字之前，先算自己的。',
        h2: '先算自己的：貸 {amount}，每個月要付多少',
        intro:
          '輸入貸款金額、年限和利率，圖會畫出每個月付多少、其中多少是利息。預設利率是五大銀行新承做購屋貸款的平均利率 {rate}%（{rateAsOf}），也能切到青安 3.0 的階梯利率做對照。寬限期是前幾年只繳利息、不還本金的期間，結束後月付會跳高，圖上看得到。',
        othersTitle: '另外 {n} 個工具',
        othersNote: '工具只做算術，不判斷該不該買。',
        open: '前往工具',
      },
      s2: {
        kicker: '一個家庭得存多久，才買得起一間中位數的房子？',
        h2: '買一間中位數的房子，要一個家庭 {pti} 年的全部可支配所得',
        chartTitle:
          '房價所得比從 {first} 倍（{firstPeriod}）到 {last} 倍（{lastPeriod}）',
        chartSub: '中位數房價除以中位數家戶可支配所得，全國與臺北市。',
        national: '全國',
        taipei: '臺北市',
        breakLabel: '房價資料來源更換',
        p1: '{period}，全國中位數住宅價格是 {price}，中位數家戶可支配所得是 {income}，相除得 {pti} 倍；臺北市是 {tpPti} 倍。全國這條線在 {minPeriod}最低，只有 {min} 倍，在 {maxPeriod}最高，到 {max} 倍，之後回落到 {last} 倍。',
        p2: '看這條線有兩件事要留意。{breakPeriod}起房價改用實價登錄的成交價計算，之前用銀行放款的鑑價，跨過這一點的比較要保守。另外這是官方用中位數算出的比值，每個家庭的實際狀況不同，自己的數字可以放進上面的試算工具。',
        ctxTitle: '分母是這樣長大的',
        income: {
          label: '每戶可支配所得中位數',
          sub: '{year}，家庭收支調查',
        },
        quintile: {
          label: '所得五等分位差距',
          unit: '倍',
          sub: '最高所得組是最低所得組的幾倍，{year}',
        },
        tableX: '期別',
      },
      s3: {
        kicker: '同一個國家，每個縣市的帳不一樣。',
        h2: '同一個國家，{minName}的房貸負擔率是 {minPct}%，{maxName}是 {maxPct}%',
        chartTitle:
          '{n} 個縣市的房貸負擔率，從 {minPct}% 到 {maxPct}%（{period}）',
        chartSub: '底色是內政部的四級分級，虛線是全國值。',
        refLabel: '全國',
        valueHeader: '房貸負擔率（%）',
        p1: '內政部把房貸負擔率分成四級：低於 {b1}% 是「{l0}」，{b1}% 到 {b2}% 是「{l1}」，{b2}% 到 {b3}% 是「{l2}」，{b3}% 以上是「{l3}」。{period}，有 {nHigh} 個縣市在 {b3}% 以上（{highNames}），有 {nLow} 個縣市在 {b1}% 以下（{lowNames}）。',
        p2: '圖中標「＊」的{smallNames}，實價登錄樣本少於 100 筆，數字起伏大。官方表沒有{missing}的數字。官方算法是 {years} 年期、{ltv} 成貸款、中位數所得，和個人條件不同。',
        toolLead: '想知道自己落在哪一級：',
        toolLink: '用負擔能力自查',
        sep: '、',
      },
      s4: {
        kicker:
          '{y1} 年有人夜宿忠孝東路，{y2} 年有人夜宿仁愛路，中間隔了 {gap} 年。',
        h2: '{n} 波房價大漲，把政策從蓋國宅推到管制貸款',
        intro:
          '文獻把台灣的房價大漲分成 {n} 波，約從 {from} 年算到 {to} 年。下面五張小卡標出每一波有沒有可靠的數字，接著是一條精簡時間軸，只放最重要的 {nFeat} 個節點。',
        waveNone: '漲幅與成因：這項目前沒有官方資料。',
        waveMulti: '有數字，但各家口徑的起迄年和地區不同，並列在發展歷程頁。',
        timelineTitle: '重要節點',
        timelineNote:
          '節點只收讀過原文的事件；人數有多種說法的並列，不挑一個。',
        full: '看完整的發展歷程（{nEvents} 個節點）',
      },
      s5: {
        kicker: '政府手上的牌，分成錢、稅、地、屋。',
        h2: '政府調節住宅市場的手段，集中在貸款、稅、土地交易和住宅供給',
        money: {
          tag: '貸款',
          title: '錢的價格與數量',
          body: '央行用重貼現率決定資金成本，用不動產抵押貸款規定限制成數與寬限期；財政部國庫署透過公股銀行辦青安貸款，補貼年輕人的利息。',
          f1: '央行重貼現率',
          f1n: '{since}起維持',
          f2: '購置住宅貸款餘額',
          f2n: '全體銀行，{asOf}',
          f3: '不動產貸款佔總放款',
          f3n: '{asOf}',
          f4: '青安貸款累計撥貸',
          f4v: '{h} 戶',
          f4n: '{amount}，{asOf}',
        },
        tax: {
          tag: '稅',
          title: '買、持有、賣，各課一筆',
          body: '賣房賺的價差課房地合一稅，持有課房屋稅，移轉土地課土地增值稅。下面是國庫實收的金額，不是稅率。',
          f1: '房地合一稅',
          f1n: '{year} 年實徵，本站把四個季值相加',
          f2: '土地增值稅',
          f2n: '{year} 年實徵淨額',
          f3: '房屋稅',
          f3n: '{year} 年實徵淨額',
        },
        land: {
          tag: '土地與交易',
          title: '每筆交易都要登記，成交價要公開',
          body: '買賣要辦移轉登記，{rrYear} 年起成交價也要向政府申報並公開，內政部才算得出房價所得比和住宅價格指數。',
          f1: '建物買賣移轉',
          f1v: '{n} 棟',
          f1n: '{year} 年，比前一年少 {drop}%',
          f2: '住宅存量',
          f2v: '{n} 宅',
          f2n: '{period}',
          f3: '普通家戶數',
          f3v: '{n} 戶',
          f3n: '{period}',
        },
        supply: {
          tag: '住宅供給',
          title: '政府自己蓋，也向民間租',
          body: '政府直接興建社會住宅，也向民間房東承租再轉租給需要的家庭（包租代管），另外發租金補貼。',
          f1: '社宅興辦達成',
          f1v: '{n} 戶',
          f1n: '含興建中，{asOf}',
          f2: '既有加新完工',
          f2v: '{n} 戶',
          f2n: '已經完工的社宅',
          f3: '包租代管有效契約',
          f3v: '{n} 戶',
          f3n: '{asOf}',
          f4: '租金補貼戶數',
          f4v: '{n} 戶',
          f4n: '{period}',
        },
      },
      s6: {
        kicker: '央行手上有兩個旋鈕：利率，和你最多能借幾成。',
        h2: '央行用 {n} 波管制收緊貸款，{easeYear} 年起放寬了 {nEase} 次',
        rateTitle:
          '房貸利率從 {lo}%（{loPeriod}）爬到 {hi}%，央行在 {from} 到 {to} 年出了 {n} 波管制',
        rateSub:
          '線是五大銀行新承做購屋貸款的月加權平均利率，階梯是央行重貼現率，編號是各波管制生效日，向下箭頭是放寬。',
        lineRate: '房貸利率（五大銀行）',
        lineRedis: '重貼現率',
        markWave: '第 {n} 波管制，{date}生效',
        markEase: '放寬第 2 戶成數，{date}生效',
        ltvTitle: '第 2 戶的銀行平均貸款成數，從 {pre}% 降到 {now}%',
        ltvSub:
          '各類受限貸款在管制前、第 7 波前一個月與最近一次統計的銀行平均成數，短槓是央行訂的上限。',
        ltvNote:
          '管制前的基準月份每一類不同，第 2 戶是特定地區的數字，詳見資料表備註。',
        sPre: '管制前',
        sAug: '第 7 波前一個月',
        sNow: '最近一次統計',
        cap: '央行上限',
        txTitle: '{year} 年建物買賣移轉 {cnt} 棟，比前一年少 {drop}%',
        txSub: '全國建物買賣移轉棟數，每年（內政部平台的四個季值相加）。',
        txLine: '建物買賣移轉',
        concNow: '不動產貸款佔總放款',
        concPeak: '近期高點',
        concHist: '歷史高點',
        p1: '{d1}，央行發動第一波選擇性信用管制，對公司法人和多屋族設下成數上限。到 {d7}的第 {n} 波，第 2 戶購屋貸款的限制擴大到全國。',
        p2: '管制之後，不動產貸款佔總放款的比重從 {peak}%（{peakPeriod}）降到 {conc}%（{concPeriod}）。央行以管制成效顯現、集中度回降為由，在 {e1}和 {e2}先後把第 2 戶貸款成數上限放寬到 {cap1} 成和 {cap2} 成。',
        p3: '青安貸款依央行的協處措施，不受自然人第 1 戶、第 2 戶購屋貸款的限制，高價住宅等其餘部分仍受管制。',
        more: '完整的管制時間線在發展歷程頁。',
        tableX: '年',
        itemHeader: '貸款類別',
      },
      s7: {
        kicker: '大家口中的「新青安」，已經不是現在的青安。',
        h2: '新青安已換成青安 3.0，補貼會一年一年退',
        intro:
          '青安貸款是財政部透過 {nBanks} 家公股銀行辦理的購屋優惠貸款，政府補貼一部分利息。{v2name}（{v2nick}）在 {v2to}期滿，{v3from}上路的是{v3name}，申辦到 {v3to}。{y} 年上半年媒體說的「新青安 2.0」，指的就是後來的 3.0。',
        names: {
          v1: '青安貸款',
          v2: '青安 2.0',
          v3: '青安 3.0',
        },
        nicks: {
          v1: '俗稱舊青安',
          v2: '俗稱新青安',
          v3: '',
        },
        nameNow: '現行',
        stepTitle: '青安 3.0 的利率從 {r0}% 一年一年爬到 {r4}%',
        stepSub: '柱頂是補貼後利率，斜紋是政府補貼，虛線是原貸款利率。',
        stepBase: '原貸款利率 {base}%',
        stepAxis: '貸款第幾年',
        stepSubsidy: '政府補貼',
        stepTip: '第 {x} 年，補貼後 {r}%，補貼 {s} 個百分點',
        stepHdr: {
          step: '貸款年次',
          rate: '補貼後利率',
          subsidy: '補貼（百分點）',
        },
        stepP:
          '階梯從貸款第一天開始：前 {n0} 年補貼 {s0} 個百分點，利率 {r0}%；之後每年少補 {step} 個百分點，第 {yr} 年起回到原貸款利率 {base}%。2.0 的既有貸戶同樣適用這個遞減。',
        payTitle:
          '貸 {amount}、{years} 年、寬限 {grace} 年：月付從 {p1} 跳到 {p2}',
        paySub:
          '本站試算：本息平均攤還，利率依上圖階梯，每年第一期的月付金額。官方沒有公布月付金試算表。',
        payLine: '每月應繳',
        payTableX: '貸款年次',
        payP: '寬限期內只繳利息，月付 {p1}。第 {gy} 年寬限期一結束就開始還本金，月付跳到 {p2}，第 {y3} 年起是 {p3}，一個月多出 {delta}。這是動手借之前最該先算過的一筆。',
        condTitle: '現行條件',
        cond: {
          limit: '額度',
          limitV: '一般 {g}；兩年內結婚登記 {n}；育有未成年子女 {c}',
          term: '年限',
          termV: '最長 {y} 年，含寬限期，寬限期最長 {gr} 年',
          ltv: '成數',
          ltvV: '最高 {n} 成',
          age: '年齡',
          ageV: '申貸時未滿 {a} 歲，且年齡加貸款年限不逾 {s}',
          income: '所得',
          incomeV: '借款人本人年所得不逾 {i}',
          cap: '房價上限',
          capV: '{tiers}',
          capTier: '{names} {v}',
          otherName: '其他縣市',
          nameSep: '、',
          once: '次數',
          onceV:
            '{since}以後核貸過青安或農安貸款的人，不能再申貸；新貸戶要簽自住切結',
          sep: '；',
        },
        scaleTitle: '貸出去多少',
        scaleAll: '累計撥貸',
        scaleAllV: '{h} 戶',
        scaleAllN: '{amount}，{asOf}',
        scale3: '3.0 上路後撥貸',
        scale3V: '{h} 戶',
        scale3N: '{amount}，{asOf}',
        scale2: '2.0 期間核貸',
        scale2V: '{h} 戶',
        scale2N: '{amount}，本站計算',
        open: '3.0 是否繼續不計入銀行法第 72 條之 2 的放款限額，我們沒有讀到 2026 年的官方文件，這項目前沒有官方資料。',
        ctaFull: '青安貸款完整專章',
        ctaElig: '用資格自查逐條比對',
        ctaCalc: '試算青安 3.0 月付',
      },
      s8: {
        kicker: '同一件事，政府和居住團體各說了什麼。',
        h2: '政府機關和居住團體，對房價與青安各怎麼說',
        intro:
          '下面每張卡都是當事人公開說過的話，標出說話者、日期和出處。有些是機關的說法經媒體引述，卡片上有標。本頁不收政黨與候選人的主張。',
        quote: '逐字引語',
        paraphrase: '機關說法，經媒體引述',
        via: '出處',
        translation: '本站翻譯，原文為中文',
        foot: '各方說法的完整整理還在準備，這一頁先放可以逐字查證的引語。',
        limits: '收集範圍的限制',
      },
      s9: {
        kicker: '批評之前，先看這個體系已經做到的。',
        h2: '這套體系做對的事，數字都看得到',
        own: {
          big: '{n}%',
          title: '的家庭住在自己或家人擁有的房子裡',
          sub: '{year} 年家庭收支調查，戶內經常居住成員自有。最低所得組 {q1}%，最高所得組 {q5}%。',
          q: ['最低所得組', '次低', '中間', '次高', '最高所得組'],
        },
        open: {
          big: '{year}',
          title: '年起，每筆成交價都要申報並公開',
          sub: '內政部據此按季發布住宅價格指數，全國指數從 {a}（{p0}）到 {b}（{p1}），{base} 年為 100。',
        },
        npl: {
          big: '{n}%',
          title: '青安貸款的逾放比，全體房貸是 {all}%',
          sub: '逾放比是逾期未還的貸款佔全部貸款的比率，{asOf}，財政部。',
        },
        social: {
          big: '{n}',
          title: '戶社會住宅已經完工',
          sub: '既有加新完工。另有 {uc} 戶興建中，包租代管有效契約 {eff} 戶。',
        },
        hpiTitle: '全國住宅價格指數從 {a}（{p0}）到 {b}（{p1}），六都各有斜率',
        hpiSub: '內政部住宅價格指數，{base} 年為 100，以實價登錄資料編製。',
        hpiNational: '全國',
        socTitle:
          '全國社宅：既有加新完工 {done} 戶，興建中 {uc} 戶，規劃中 {pl} 戶',
        socSub: '依興辦進度由深到淺堆疊，列尾數字是達成數（前三段合計）。',
        socNote: '「其他縣市」是全國合計減六都，本站計算。',
        segExisting: '既有',
        segNew: '新完工',
        segUnder: '興建中',
        segPlanned: '規劃中',
        achieved: '達成數',
        others: '其他縣市',
        region: '地區',
      },
      s10: {
        kicker: '房子夠住，卻有人買不起。',
        h2: '空著的房子和買不起的人，同時存在',
        lowTitle:
          '低度使用住宅比率，{maxName}最高（{maxPct}%），{tpName}只有 {tpPct}%',
        lowSub:
          '用電量很低、看起來沒人住的住宅，佔房屋稅籍住宅的比率，{period}。虛線是全國值。',
        lowValue: '低度使用比率（%）',
        unsoldTitleMax: '待售新成屋 {last} 宅，是這組統計 {first}起的最高',
        unsoldTitle: '待售新成屋從 {a} 宅到 {last} 宅（{first} 到 {lastP}）',
        unsoldSub: '全國已完工、還沒賣出去的新成屋戶數，每季。',
        unsoldLine: '待售新成屋',
        p1: '房貸負擔率最高的{c1}（{b1}%），低度使用的住宅只有 {l1}%；低度使用比率最高的{c2}（{l2}%），房貸負擔率是 {b2}%。這兩個縣市的排序剛好相反。',
        p2: '社會住宅興辦計畫第二階段的目標，是 {y2} 年前共 {t2} 萬戶（政府直接興建 {d2} 萬、包租代管 {r2} 萬）。目前興辦達成 {achieved} 戶，其中 {uc} 戶還在興建中；包租代管累計媒合 {matched} 戶，有效契約 {eff} 戶。目標與達成的口徑不同，興建中的還沒有人住，媒合累計也不等於有效契約，不能直接相減。',
        noData:
          '持有集中度：財政部公布的級距沒有「持有 4 戶以上」這一項，這項目前沒有官方資料，所以本頁不畫圖，也不估。',
        actTitle: '負擔重，不代表沒有入口。三個可以先做的事：',
        act1: '算出自己落在哪一級',
        act2: '逐條比對青安 3.0 資格',
        act3: '社宅、包租代管與租金補貼的制度',
      },
      s11: {
        kicker: '接下來幾個月，有幾件事會改寫這一頁的數字。',
        h2: '接下來要看的 {n} 件事',
        i1: {
          badge: '{date}',
          title: '青安 3.0 的補貼開始退場',
          body: '最早一批 3.0 貸戶，利率在 {date}前後從 {r0}% 調到 {r1}%；3.0 的申辦期到 {to}。',
        },
        i2: {
          badge: '待發布',
          title: '{next} 的房價負擔能力指標',
          body: '內政部目前最新一期是 {period}，房價所得比 {pti} 倍。新一期發布後，這頁的圖跟著更新。',
        },
        i3: {
          badge: '{date}',
          title: '央行下一次理監事會',
          body: '{easeYear} 年已經 {nEase} 度放寬第 2 戶成數。不動產貸款佔總放款 {conc}%（{concPeriod}），在近期高點 {peak}% 之下。',
        },
        i4: {
          badge: '進行中',
          title: '社會住宅從興建中轉成完工',
          body: '{uc} 戶在興建中，取得使用執照才算完工、才住得進去；另有 {pl} 戶規劃中。',
        },
        i5: {
          badge: '每季更新',
          title: '人口與家戶數',
          body: '戶量從 {hs0} 人（{hp0}）降到 {hs1} 人（{hp1}），出生數從 {b0} 人降到 {b1} 人（{y0} 到 {y1} 年）。國發會的人口推估這次沒有取得，所以未來的家戶數不估，這項目前沒有官方資料。',
        },
        birthsTitle: '出生數從 {b0} 人降到 {b1} 人（{y0} 到 {y1} 年）',
        birthsSub: '全國每年出生人數，內政部平台的四個季值相加。',
        birthsLine: '出生數',
        tableX: '年',
      },
      s12: {
        kicker: '看完這一頁，可以往這幾個方向走。',
        h2: '從這裡走出去：站內相關的文章與資料',
        groups: {
          system: '制度與歷史',
          scenes: '困境現場',
          places: '地方與新市鎮',
          people: '人與世代',
          buildings: '房子的樣子',
        },
        hubTitle: '站內的資料專區',
        hub: {
          data: {
            t: '資料中樞',
            d: '房貸負擔率等指標，與其他領域放在一起看。',
          },
          budget: {
            t: '總預算十年',
            d: '社宅與租金補貼的預算，看政府花了多少。',
          },
          map: { t: '台灣地圖', d: '從縣市進入各地的條目。' },
          timeline: { t: '台灣時間軸', d: '把住宅放回八個時代的大背景。' },
          opendata: { t: '開放資料', d: '不動產與地政、稅務的原始資料入口。' },
          companies: { t: '企業地圖', d: '蓋房子的建商、放款的金控。' },
        },
      },
      s13: {
        h2: '這一頁的資料來源與截止日',
        intro:
          '頁面上的數字在建站時從資料檔讀出，沒有手打。下表列出每組資料的來源機關與截止期別；標「本站計算」的，是我們自己相加或相除的值。',
        cols: { data: '資料', agency: '來源機關', asOf: '截止' },
        noDataTitle: '目前沒有官方資料的項目',
        noData: [
          '持有 4 戶以上的人數：財政部公布的級距沒有這一項。',
          '國發會的人口推估：這次沒有取得。',
          '1970 年代兩波房價大漲的漲幅與成因。',
          '官方或公股銀行公布的月付金試算表。',
          '青安貸款佔全體新承做房貸的比重。',
          '金管會 2026 年是否繼續把青安 3.0 排除在銀行法第 72 條之 2 限額之外。',
        ],
        disclaimer:
          '本頁數字來自官方統計與本站試算，不構成財務、稅務或法律建議。',
        checked: '資料檢查日 {date}',
        perItem: '各卡片、各節點自附出處',
        rows: {
          affordability: '房價所得比與房貸負擔率',
          affordabilityCounty: '各縣市房價負擔能力',
          priceIndex: '住宅價格指數',
          rates: '五大銀行購屋貸款利率與重貼現率',
          creditControls: '央行選擇性信用管制',
          lending: '購置住宅貸款餘額與不動產貸款集中度',
          transactions: '建物買賣移轉棟數',
          vacancy: '低度使用住宅與待售新成屋',
          socialHousing: '社會住宅與包租代管進度',
          income: '家庭可支配所得',
          stock: '住宅存量、家戶與人口',
          homeownership: '住宅自有率（所得五等分位）',
          tax: '房地合一稅、土地增值稅與房屋稅',
          qingan: '青安貸款條件與利率補貼',
          qinganScale: '青安貸款規模與逾放比',
          timeline: '發展歷程時間軸',
          positions: '各方公開說法',
        },
      },
      timeline: {
        more: '展開內文與來源',
        kinds: {
          policy: '政策',
          law: '法規',
          credit: '貸款管制',
          tax: '稅制',
          movement: '社會運動',
          event: '事件',
          market: '市場',
        },
      },
      pos: {
        government: '政府機關',
        advocacy: '居住團體',
      },
      quotesEn: {} as Record<string, string>,
    },
    en: {
      meta: {
        title: 'Taiwan Housing 2026: Prices, Mortgages and Policy',
        description:
          "Taiwan's home price-to-income ratio hit {pti} in {period}. Policy history, Youth Loan 3.0, each side's views and {nTools} calculators, with sources.",
      },
      ui: {
        source: 'Source: ',
        asOf: 'as of',
        derived: 'Calculated by Taiwan.md',
        dataTable: 'Data table',
        primary: 'primary',
        reported: 'reported',
        noData: 'no data',
        item: 'Item',
        period: 'Period',
        note: 'Note',
        yes: 'Yes',
        zhOnly: 'Chinese',
        related: 'Further reading',
      },
      agencies: {
        內政部不動產資訊平台:
          'Ministry of the Interior, Real Estate Information Platform',
        '內政部營建署（現國土管理署）／不動產資訊平台':
          'Ministry of the Interior, Construction and Planning Agency (now Land Administration Agency) / Real Estate Information Platform',
        中央銀行: 'Central Bank of the Republic of China (Taiwan)',
        行政院主計總處:
          'Directorate-General of Budget, Accounting and Statistics',
        '行政院主計總處（政府資料開放平臺）':
          'Directorate-General of Budget, Accounting and Statistics (via the open-data portal)',
        '內政部不動產資訊平台轉載國泰建設／政大台灣房地產研究中心指數':
          'Ministry of the Interior Real Estate Information Platform, republishing the Cathay / NCCU index',
        財政部國庫署: 'Ministry of Finance, National Treasury Administration',
        行政院: 'Executive Yuan',
        金融監督管理委員會: 'Financial Supervisory Commission',
        合作金庫商業銀行: 'Taiwan Cooperative Bank',
        '中華郵政 網路郵局': 'Chunghwa Post (i-Post)',
        '內政部不動產資訊平台／國土管理署':
          'Ministry of the Interior, Real Estate Information Platform / Land Administration Agency',
        財政部: 'Ministry of Finance',
        '內政部（國土管理署／統計處）':
          'Ministry of the Interior (Land Administration Agency / Department of Statistics)',
      },
      hero: {
        eyebrow: 'Topic · Housing',
        title: 'Taiwan Housing 2026: Prices, Mortgages and the Youth Loan',
        lede: "In {period}, Taiwan's national price-to-income ratio was {pti} and the mortgage burden ratio {burden}% (Ministry of the Interior). This page lines up prices, lending, institutions, history and each side's views on one scroll, with an official source and cut-off date for every number.",
        pti: {
          label: 'National price-to-income ratio',
          unit: 'x',
          sub: 'Median home price divided by median household disposable income, {period}.',
        },
        burden: {
          label: 'National mortgage burden',
          sub: 'Monthly mortgage payment as a share of disposable income; the ministry rates this level "{level}".',
        },
        qingan: {
          label: 'Qing-An 3.0 rate, first {n} years',
          sub: 'Qing-An (青安) is a subsidised first-home loan run through state-owned banks. Floating rate, then +{step} points a year, reaching {base}% in year {yr}.',
        },
        cue: 'Try your own mortgage first, then see where these numbers come from',
        cta: 'Calculate a mortgage',
      },
      nav: {
        label: 'On this page',
        tool: 'Calculator',
        price: 'Price-to-income',
        county: 'Counties',
        history: 'History',
        system: 'Institutions',
        controls: 'Credit controls',
        qingan: 'Qing-An 3.0',
        positions: 'Positions',
        strengths: 'Strengths',
        gaps: 'Strains',
        future: 'Ahead',
        links: 'Further reading',
        sources: 'Sources',
      },
      s1: {
        kicker: "Before anyone else's numbers, work out your own.",
        h2: 'Start with your own: what does a {amount} mortgage cost each month?',
        intro:
          'Enter a loan amount, term and rate and the chart shows the monthly payment and how much of it is interest. The default rate is the average new home-loan rate at the five largest banks, {rate}% ({rateAsOf}); you can switch to the Qing-An 3.0 step rates to compare. A grace period is the early stretch when you pay interest only and no principal; the monthly payment jumps when it ends, and the chart shows that jump.',
        othersTitle: '{n} more tools',
        othersNote:
          'The tools only do arithmetic. They do not tell you whether to buy.',
        open: 'Open tool',
      },
      s2: {
        kicker: 'How long must a household save to afford a median home?',
        h2: 'A median home costs one household {pti} years of its entire disposable income',
        chartTitle:
          'Price-to-income ratio: from {first} ({firstPeriod}) to {last} ({lastPeriod})',
        chartSub:
          'Median home price divided by median household disposable income, nation and Taipei.',
        national: 'Nation',
        taipei: 'Taipei',
        breakLabel: 'Price data source changes',
        p1: 'In {period} the national median home price was {price} and median household disposable income was {income}, a ratio of {pti}; Taipei was {tpPti}. The national line bottomed in {minPeriod} at {min}, peaked in {maxPeriod} at {max}, and has since eased to {last}.',
        p2: 'Two cautions. From {breakPeriod} prices come from actual price registration (since 2012 every sale must be reported to the government with its transaction price, and the data is public); before that they came from bank appraisals, so comparisons across that point should be treated carefully. And this is an official ratio of medians; every household differs, so put your own numbers into the calculator above.',
        ctxTitle: 'How the denominator grew',
        income: {
          label: 'Median household disposable income',
          sub: '{year}, Household Income and Expenditure Survey',
        },
        quintile: {
          label: 'Top-to-bottom quintile income ratio',
          unit: 'x',
          sub: 'How many times the top fifth earns the bottom fifth, {year}',
        },
        tableX: 'Period',
      },
      s3: {
        kicker: 'One country, but every county keeps different books.',
        h2: 'In one country, the mortgage burden is {minPct}% in {minName} and {maxPct}% in {maxName}',
        chartTitle:
          'Mortgage burden in {n} counties, from {minPct}% to {maxPct}% ({period})',
        chartSub:
          "Shading shows the ministry's four affordability bands; the dashed line is the national figure.",
        refLabel: 'Nation',
        valueHeader: 'Mortgage burden (%)',
        p1: 'The ministry rates the mortgage burden in four bands: below {b1}% is "{l0}", {b1}% to {b2}% is "{l1}", {b2}% to {b3}% is "{l2}", and {b3}% or more is "{l3}". In {period}, {nHigh} counties were at {b3}% or more ({highNames}) and {nLow} were below {b1}% ({lowNames}).',
        p2: 'Counties marked ＊ ({smallNames}) had fewer than 100 registered sales, so their numbers swing. The official table has no figure for {missing}. The official method assumes a {years}-year loan, {ltv} loan-to-value and median income, which differs from any one household.',
        toolLead: 'To see which band you fall in: ',
        toolLink: 'use the affordability check',
        sep: ', ',
      },
      s4: {
        kicker:
          "In {y1} people slept out on Zhongxiao East Road; in {y2} they slept out on Ren'ai Road. {gap} years apart.",
        h2: '{n} price surges pushed policy from building public housing to controlling credit',
        intro:
          'The literature counts {n} major price surges in Taiwan, running from about {from} to {to}. The five small cards show which waves have reliable figures, followed by a short timeline of the {nFeat} most important events.',
        waveNone: 'Size and causes: no official data for this wave.',
        waveMulti:
          'Figures exist, but sources differ on start and end years and on geography; they are listed side by side on the history page.',
        timelineTitle: 'Key events',
        timelineNote:
          'Only events whose original text we read are included; where attendance has several versions, all are listed.',
        full: 'Read the full history ({nEvents} events)',
      },
      s5: {
        kicker:
          "The government's levers fall into four: money, tax, land and homes.",
        h2: 'The state steers the housing market through lending, tax, land transactions and supply',
        money: {
          tag: 'Lending',
          title: 'The price and quantity of money',
          body: "The central bank sets the cost of funds with its rediscount rate and caps loan-to-value ratios and grace periods in its mortgage rules. The Treasury runs the Qing-An loan through state-owned banks to subsidise young buyers' interest.",
          f1: 'Central bank rediscount rate',
          f1n: 'unchanged since {since}',
          f2: 'Home-purchase loans outstanding',
          f2n: 'all banks, {asOf}',
          f3: 'Real estate loans as share of lending',
          f3n: '{asOf}',
          f4: 'Qing-An loans disbursed to date',
          f4v: '{h} households',
          f4n: '{amount}, {asOf}',
        },
        tax: {
          tag: 'Tax',
          title: 'Buying, holding, selling: a levy at each step',
          body: 'Profit on a sale falls under the combined housing-and-land income tax, holding a home under the house tax, and transferring land under the land value increment tax. The figures below are revenue actually collected, not tax rates.',
          f1: 'Combined housing-and-land tax',
          f1n: '{year} collected; Taiwan.md sums four quarters',
          f2: 'Land value increment tax',
          f2n: '{year}, net collected',
          f3: 'House tax',
          f3n: '{year}, net collected',
        },
        land: {
          tag: 'Land and sales',
          title: 'Every sale is registered and its price made public',
          body: 'Sales must be registered, and since {rrYear} the transaction price must also be reported and published. That is how the ministry can compute the price-to-income ratio and the housing price index.',
          f1: 'Building transfers by sale',
          f1v: '{n} buildings',
          f1n: '{year}, down {drop}% on the year before',
          f2: 'Housing stock',
          f2v: '{n} homes',
          f2n: '{period}',
          f3: 'Ordinary households',
          f3v: '{n} households',
          f3n: '{period}',
        },
        supply: {
          tag: 'Supply',
          title: 'The state builds, and also rents from private owners',
          body: 'The government builds social housing directly, leases homes from private landlords and sub-lets them to households in need (master-leasing), and pays rent subsidies.',
          f1: 'Social housing delivered',
          f1v: '{n} units',
          f1n: 'including under construction, {asOf}',
          f2: 'Existing plus newly completed',
          f2v: '{n} units',
          f2n: 'ready for occupancy',
          f3: 'Master-lease contracts in force',
          f3v: '{n} units',
          f3n: '{asOf}',
          f4: 'Households on rent subsidy',
          f4v: '{n} households',
          f4n: '{period}',
        },
      },
      s6: {
        kicker:
          'The central bank has two dials: the interest rate, and how much of the price you may borrow.',
        h2: 'The central bank tightened lending in {n} rounds, then eased {nEase} times from {easeYear}',
        rateTitle:
          'Mortgage rates climbed from {lo}% ({loPeriod}) to {hi}%, with {n} rounds of controls between {from} and {to}',
        rateSub:
          'The line is the monthly weighted average new home-loan rate at the five largest banks, the steps are the central bank rediscount rate, numbers mark when each round took effect, and downward arrows mark easing.',
        lineRate: 'Home-loan rate (five largest banks)',
        lineRedis: 'Rediscount rate',
        markWave: 'Round {n} of controls, effective {date}',
        markEase: 'Second-home loan-to-value cap eased, effective {date}',
        ltvTitle:
          'Average loan-to-value on second homes fell from {pre}% to {now}%',
        ltvSub:
          'Average bank loan-to-value for each restricted loan type before the controls, one month before round 7, and in the latest count. The short bar is the central bank cap.',
        ltvNote:
          'The pre-control base month differs by category; for second homes it is a figure for designated areas. See the notes in the data table.',
        sPre: 'Before controls',
        sAug: 'One month before round 7',
        sNow: 'Latest count',
        cap: 'Central bank cap',
        txTitle:
          'Building transfers by sale in {year}: {cnt}, down {drop}% on the year before',
        txSub:
          'Nationwide, per year (sum of four quarters from the Ministry of the Interior platform).',
        txLine: 'Building transfers by sale',
        concNow: 'Real estate loans as share of lending',
        concPeak: 'Recent peak',
        concHist: 'Historical peak',
        p1: 'On {d1} the central bank launched its first round of selective credit controls, capping loan-to-value for companies and owners of several homes. By round {n} on {d7}, the second-home limit covered the whole country.',
        p2: "Since then real estate loans fell from {peak}% of all lending ({peakPeriod}) to {conc}% ({concPeriod}). Citing the controls' effect and lower concentration, the bank raised the second-home loan-to-value cap to {cap1} on {e1} and to {cap2} on {e2}.",
        p3: "Under the bank's relief measures, Qing-An loans are exempt from the first- and second-home limits for individuals; high-priced homes and the rest remain restricted.",
        more: 'The full controls timeline is on the history page.',
        tableX: 'Year',
        itemHeader: 'Loan type',
      },
      s7: {
        kicker:
          'The "new Qing-An" people talk about is no longer the current Qing-An.',
        h2: 'The new Qing-An has become Qing-An 3.0, and the subsidy shrinks every year',
        intro:
          'The Qing-An loan (青安, Youth Home-Starter Loan) is a subsidised first-home mortgage run by the Ministry of Finance through {nBanks} state-owned banks. {v2name}, {v2nick}, expired on {v2to}. {v3name} took effect on {v3from} and accepts applications until {v3to}. Media in the first half of {y} called what became 3.0 "new Qing-An 2.0".',
        names: {
          v1: 'The original Qing-An',
          v2: 'Qing-An 2.0',
          v3: 'Qing-An 3.0',
        },
        nicks: {
          v1: 'the old one',
          v2: 'the "new Qing-An"',
          v3: '',
        },
        nameNow: 'current',
        stepTitle:
          'Qing-An 3.0 rates climb from {r0}% to {r4}%, a step each year',
        stepSub:
          'Bar tops are the subsidised rate, hatching is the government subsidy, and the dashed line is the unsubsidised loan rate.',
        stepBase: 'Unsubsidised rate {base}%',
        stepAxis: 'Year of the loan',
        stepSubsidy: 'Subsidy',
        stepTip: 'Year {x}: {r}% after subsidy, subsidy {s} points',
        stepHdr: {
          step: 'Loan year',
          rate: 'Rate after subsidy',
          subsidy: 'Subsidy (points)',
        },
        stepP:
          'The staircase starts on day one: for the first {n0} years the subsidy is {s0} points and the rate {r0}%. After that the subsidy shrinks by {step} points a year, and from year {yr} the borrower pays the unsubsidised {base}%. Existing 2.0 borrowers follow the same taper.',
        payTitle:
          'A {amount} loan over {years} years with a {grace}-year grace period: the monthly payment jumps from {p1} to {p2}',
        paySub:
          'Our own calculation: level-payment amortisation at the step rates above, showing the first payment of each year. There is no official payment table.',
        payLine: 'Monthly payment',
        payTableX: 'Loan year',
        payP: 'During the grace period you pay interest only, {p1} a month. The year it ends (year {gy}) principal repayment starts and the payment jumps to {p2}, then {p3} from year {y3}: {delta} more every month. This is the number to work out before you borrow.',
        condTitle: 'Current terms',
        cond: {
          limit: 'Limit',
          limitV:
            'Standard {g}; married within two years {n}; with a minor child {c}',
          term: 'Term',
          termV:
            'Up to {y} years including grace period, which can last up to {gr} years',
          ltv: 'Loan-to-value',
          ltvV: 'Up to {n}',
          age: 'Age',
          ageV: 'Under {a} when applying, and age plus term no more than {s}',
          income: 'Income',
          incomeV: "Borrower's own annual income no more than {i}",
          cap: 'Price cap',
          capV: '{tiers}',
          capTier: '{names} {v}',
          otherName: 'elsewhere',
          nameSep: ', ',
          once: 'Frequency',
          onceV:
            'Anyone approved for a Qing-An or farmer-youth loan since {since} cannot borrow again; borrowers sign an owner-occupation pledge',
          sep: '; ',
        },
        scaleTitle: 'How much has been lent',
        scaleAll: 'Disbursed to date',
        scaleAllV: '{h} households',
        scaleAllN: '{amount}, {asOf}',
        scale3: 'Disbursed since 3.0 began',
        scale3V: '{h} households',
        scale3N: '{amount}, {asOf}',
        scale2: 'Approved under 2.0',
        scale2V: '{h} households',
        scale2N: '{amount}, calculated by Taiwan.md',
        open: 'We found no 2026 official document on whether 3.0 loans stay outside the bank lending cap in Article 72-2 of the Banking Act, so there is no official data on this yet.',
        ctaFull: 'The full Qing-An chapter',
        ctaElig: 'Check your eligibility clause by clause',
        ctaCalc: 'Calculate a Qing-An 3.0 payment',
      },
      s8: {
        kicker:
          'On the same issue, what government and housing groups have said.',
        h2: 'What government agencies and housing groups say about prices and the Youth Loan',
        intro:
          'Every card below is something the speaker said in public, with the speaker, date and source. Some are agency statements quoted by the media, and the card says so. Political parties and candidates are not included on this page.',
        quote: 'Verbatim quote',
        paraphrase: 'Agency statement, quoted by the media',
        via: 'Source',
        translation: 'Our translation; the original is Chinese',
        foot: "A fuller account of each side's position is still being prepared. This page carries only quotes that can be checked word for word.",
        limits: 'Limits of what we collected',
      },
      s9: {
        kicker: 'Before the criticism, look at what this system has achieved.',
        h2: 'What this system gets right, in numbers you can check',
        own: {
          big: '{n}%',
          title:
            'of households live in a home owned by a member of the household',
          sub: '{year} household survey. Lowest income group {q1}%, highest {q5}%.',
          q: ['Lowest fifth', '2nd', 'Middle', '4th', 'Highest fifth'],
        },
        open: {
          big: '{year}',
          title: 'is when every sale price had to be reported and made public',
          sub: 'The ministry builds a quarterly housing price index from it: the national index went from {a} ({p0}) to {b} ({p1}), with {base} as 100.',
        },
        npl: {
          big: '{n}%',
          title:
            'non-performing ratio on Qing-An loans, against {all}% for all mortgages',
          sub: 'The share of loans overdue, {asOf}, Ministry of Finance.',
        },
        social: {
          big: '{n}',
          title: 'social housing units already completed',
          sub: 'Existing plus newly completed. Another {uc} are under construction, and {eff} master-lease contracts are in force.',
        },
        hpiTitle:
          'The national housing price index went from {a} ({p0}) to {b} ({p1}), and each big city has its own slope',
        hpiSub:
          'Ministry of the Interior housing price index, base year {base} = 100, built from registered sale prices.',
        hpiNational: 'Nation',
        socTitle:
          'Social housing nationwide: {done} done, {uc} under construction, {pl} planned',
        socSub:
          'Stacked from most to least advanced; the number at each bar end counts the first three stages.',
        socNote:
          '"Other counties" is the national total minus the six big cities, calculated by Taiwan.md.',
        segExisting: 'Existing',
        segNew: 'Newly completed',
        segUnder: 'Under construction',
        segPlanned: 'Planned',
        achieved: 'Delivered',
        others: 'Other counties',
        region: 'Region',
      },
      s10: {
        kicker: 'There are enough homes, and still some cannot afford one.',
        h2: 'Empty homes and people who cannot afford one exist side by side',
        lowTitle:
          'Low-use homes: {maxPct}% in {maxName}, only {tpPct}% in {tpName}',
        lowSub:
          'Homes with electricity use so low they look unoccupied, as a share of taxed homes, {period}. The dashed line is the national figure.',
        lowValue: 'Low-use share (%)',
        unsoldTitleMax:
          'Unsold new homes: {last}, the highest since this series began in {first}',
        unsoldTitle:
          'Unsold new homes went from {a} to {last} ({first} to {lastP})',
        unsoldSub: 'Completed new homes not yet sold nationwide, per quarter.',
        unsoldLine: 'Unsold new homes',
        p1: 'In {c1}, where the mortgage burden is highest ({b1}%), only {l1}% of homes are low-use. In {c2}, where the low-use share is highest ({l2}%), the mortgage burden is {b2}%. The ranking is reversed between the two.',
        p2: 'The second stage of the social housing plan targets {t2} ten-thousand units by {y2} ({d2} built directly, {r2} through master-leasing). So far {achieved} units are delivered, {uc} of them still under construction; master-leasing has matched {matched} households cumulatively, with {eff} contracts in force. The target and the count use different definitions: units under construction have no tenants, and cumulative matches are not contracts in force, so the two cannot simply be subtracted.',
        noData:
          'Ownership concentration: the Ministry of Finance publishes no "four or more homes" bracket, so there is no official data on this and the page draws no chart and makes no estimate.',
        actTitle:
          'A heavy burden still leaves doors open. Three things to try first:',
        act1: 'Find which band you fall in',
        act2: 'Check Qing-An 3.0 eligibility clause by clause',
        act3: 'How social housing, master-leasing and rent subsidies work',
      },
      s11: {
        kicker:
          'In the coming months a few events will rewrite the numbers on this page.',
        h2: '{n} things to watch next',
        i1: {
          badge: '{date}',
          title: 'Qing-An 3.0 subsidies start to taper',
          body: 'For the earliest 3.0 borrowers the rate moves from {r0}% to {r1}% around {date}. Applications for 3.0 are open until {to}.',
        },
        i2: {
          badge: 'Pending',
          title: 'The {next} affordability indicators',
          body: 'The latest the ministry has published is {period}, with a price-to-income ratio of {pti}. The charts here will update when the next quarter appears.',
        },
        i3: {
          badge: '{date}',
          title: 'The next central bank board meeting',
          body: 'The second-home cap has been eased {nEase} times in {easeYear}. Real estate loans are {conc}% of lending ({concPeriod}), below the recent peak of {peak}%.',
        },
        i4: {
          badge: 'Ongoing',
          title: 'Social housing moving from construction to completion',
          body: '{uc} units are under construction; a unit counts as complete, and can house people, only once it has an occupancy permit. Another {pl} are planned.',
        },
        i5: {
          badge: 'Quarterly',
          title: 'Population and households',
          body: 'Household size fell from {hs0} people ({hp0}) to {hs1} ({hp1}), and births fell from {b0} to {b1} ({y0} to {y1}). We could not obtain the National Development Council projections, so future household numbers are not estimated and there is no official data on this here.',
        },
        birthsTitle: 'Births fell from {b0} to {b1} ({y0} to {y1})',
        birthsSub:
          'Annual births nationwide, sum of four quarters from the Ministry of the Interior platform.',
        birthsLine: 'Births',
        tableX: 'Year',
      },
      s12: {
        kicker: 'Once you have read this page, here is where to go next.',
        h2: 'Further out: related articles and data on this site',
        groups: {
          system: 'Institutions and history',
          scenes: 'On the ground',
          places: 'Places and new towns',
          people: 'People and generations',
          buildings: 'What homes look like',
        },
        hubTitle: 'Data sections on this site',
        hub: {
          data: {
            t: 'Data hub',
            d: 'Mortgage burden and other indicators, alongside other fields.',
          },
          budget: {
            t: 'Budget decade',
            d: 'Social housing and rent subsidy budgets: what the state spent.',
          },
          map: { t: 'Map of Taiwan', d: 'Enter county articles from the map.' },
          timeline: {
            t: 'Taiwan timeline',
            d: 'Housing set against eight eras of history.',
          },
          opendata: {
            t: 'Open data',
            d: 'Entry points to land, real estate and tax data.',
          },
          companies: {
            t: 'Company map',
            d: 'The developers who build and the financial groups who lend.',
          },
        },
      },
      s13: {
        h2: 'Sources and cut-off dates for this page',
        intro:
          'Numbers on this page are read from data files at build time and none are typed by hand. The table lists the source agency and cut-off period for each data set; "calculated by Taiwan.md" marks values we added or divided ourselves.',
        cols: { data: 'Data', agency: 'Source agency', asOf: 'As of' },
        noDataTitle: 'Items with no official data',
        noData: [
          'Number of people owning four or more homes: the Ministry of Finance brackets do not include it.',
          'National Development Council population projections: not obtained this time.',
          'The size and causes of the two price surges of the 1970s.',
          'An official or state-bank payment table for monthly mortgage payments.',
          'Qing-An loans as a share of all new mortgage lending.',
          'Whether the Financial Supervisory Commission still excludes Qing-An 3.0 from the Article 72-2 lending cap in 2026.',
        ],
        disclaimer:
          'Numbers on this page come from official statistics and our own calculations. They are not financial, tax or legal advice.',
        checked: 'Data checked on {date}',
        perItem: 'Cited on each card and event',
        rows: {
          affordability: 'Price-to-income ratio and mortgage burden',
          affordabilityCounty: 'Affordability by county',
          priceIndex: 'Housing price index',
          rates:
            'Home-loan rates at the five largest banks and the rediscount rate',
          creditControls: 'Central bank selective credit controls',
          lending:
            'Home-purchase loans outstanding and real estate loan concentration',
          transactions: 'Building transfers by sale',
          vacancy: 'Low-use homes and unsold new homes',
          socialHousing: 'Social housing and master-lease progress',
          income: 'Household disposable income',
          stock: 'Housing stock, households and population',
          homeownership: 'Home ownership by income fifth',
          tax: 'Combined housing-and-land tax, land value increment tax and house tax',
          qingan: 'Qing-An terms and interest subsidy',
          qinganScale: 'Qing-An volume and non-performing ratio',
          timeline: 'Housing history timeline',
          positions: 'Public statements by each side',
        },
      },
      timeline: {
        more: 'Show details and sources',
        kinds: {
          policy: 'Policy',
          law: 'Law',
          credit: 'Credit control',
          tax: 'Tax',
          movement: 'Movement',
          event: 'Event',
          market: 'Market',
        },
      },
      pos: {
        government: 'Government agencies',
        advocacy: 'Housing advocacy groups',
      },
      quotesEn: {
        為避免變成懲罰結婚者:
          "To avoid it becoming a penalty for getting married, we decided the means-test threshold is the borrower's own annual income of NT$2 million.",
        選擇性信用管制到目前為止:
          'As of now, selective credit controls actually stop here.',
        政府推動社會住宅的整體計畫:
          'The overall plan to promote social housing has not changed. We will keep expanding housing support through direct construction, master-leasing and rent subsidies.',
        寬限期最長5年:
          'The grace period can be up to five years, but only 23% of borrowers actually get the full five.',
        借越多: 'Borrow more, repay longer, and prices go even higher.',
        如果現在就停止興建社宅:
          'If we stop building social housing now, Taiwan may become the country that started building social housing the latest in the world and stopped the earliest.',
        好好地蓋社會住宅:
          'Building social housing well is the best remedy for encouraging births.',
        若要對市場起到平衡作用:
          'To balance the market, public housing with controlled rents, lease terms and quality must reach 5% of all housing, about 500,000 units.',
      },
    },
  },
};
const zh = dicts.byLang['zh-TW'];
type Dict = typeof zh;
const en: Dict = dicts.byLang.en;

/** 其他語言回 en（ja、ko 也回 en）。 */
export function housingHome(lang: string): Dict {
  return lang === 'zh-TW' ? zh : en;
}
export type HousingHomeDict = Dict;
