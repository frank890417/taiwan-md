/**
 * housing-sub.ts：/housing/ 三個子頁（發展歷程、青安貸款、各方立場）的文案。
 * zh-TW 與 en 完整，其他語言回 en。
 *
 * 規則：
 * - 文案裡的數字一律是 {佔位}，build 時從 src/data/housing/*.json 算出再用 fill() 填入。
 *   例外：法規與方案的專有名稱（銀行法第 72 條之 2、青安 2.0、青安 3.0）是名稱，直接寫在句子裡。
 * - 資料檔只有中文的欄位（三代條件對照、青安時間線、漲幅口徑、待解問題），英文版的對照翻譯放在
 *   本檔最後的 EN_DATA。tests/housing-pages.test.mjs 會檢查：EN_DATA 的鍵都對得到資料檔的項目，
 *   且英文裡出現的數字（三位數以上或帶小數、千分位者）都出現在對應的中文原文裡。
 * - 書寫紀律（MANIFESTO §11）：無對位句型、無破折號、不中英夾雜（專有名詞除外）。
 * - 需能被 `node --experimental-strip-types` 直接載入：不 import 任何 .astro 或 JSON。
 */

// 語言鍵包在 byLang 底下：check-ui-language.mjs 靠「'zh-TW': {」「en: {」這種行認語言區塊
const dicts = {
  byLang: {
    'zh-TW': {
      ui: {
        source: '來源：',
        asOf: '截至',
        derived: '本站計算',
        primary: '官方／當事團體',
        reported: '媒體報導',
        noData: '沒有資料',
        related: '相關文章',
        zhOnly: '中文',
        original: '中文原文',
        origNote: '此欄為資料檔的中文原文。',
        navLabel: '本頁章節',
        back: '回到專題主頁',
      },
      hist: {
        meta: {
          title: '台灣房價與住宅政策發展史 2026：六個時期',
          description:
            '整理 {from} 到 {to} 年台灣住宅政策與房價的 {n} 個節點，分六個時期，附五次房價循環與央行管制時間線，每筆有來源，資料截至 {iso}。',
        },
        hero: {
          eyebrow: '專題 · 居住 · 發展歷程',
          title: '台灣住宅政策發展歷程 2026',
          lede: '本頁收錄 {n} 個住宅政策與房價事件，最早 {from} 年，最晚 {last}，分成六個時期，資料截至 {date}。每個事件附來源，標明出自官方或當事團體，還是媒體報導。',
          nLabel: '收錄事件',
          nSub: '每一筆都有來源連結，只收讀過原文的項目。',
          spanLabel: '最早到最晚的事件年份',
          spanSub: '最早的一期（{a} 到 {b} 年），可查證的事件只有 {k} 筆。',
          lastLabel: '最近一次轉折',
          cue: '先看六個時期，再看五次房價循環與央行管制',
        },
        nav: {
          eras: '六個時期',
          cycles: '五次房價循環',
          controls: '利率與管制',
          links: '延伸閱讀',
        },
        erasNav: '跳到時期',
        erasH: '六個時期',
        filter: {
          label: '依類別篩選',
          all: '全部',
          count: '顯示 {shown} 筆，共 {total} 筆',
        },
        eraNote:
          '本期收錄 {n} 筆，其中 {p} 筆出自官方機關或當事團體自己的網站。',
        eraSrcLine: '各筆事件自附來源。',
        cycles: {
          kicker: '同樣是漲，每一次的原因和數字都不一樣。',
          h2: '{n} 次房價大漲，只有 {k} 次找得到漲幅數字',
          intro:
            '下表把各次大漲並排。找不到可靠數字的格子照實寫沒有資料。各個口徑的起迄年和地理範圍不同，同一格裡並列的數字不能互相驗算。',
          cols: {
            wave: '波次',
            rise: '漲幅',
            drivers: '成因',
            turning: '轉折',
            sources: '來源',
          },
          none: '沒有資料',
          dash: '沒有資料',
          indexTitle: '國泰房價指數（全國）從 {a} 升到 {b}，這是民間編製的指數',
          indexSub: '季資料，由內政部不動產資訊平台轉載，並非官方統計。',
          indexLine: '國泰指數（民間）',
          indexTag: '民間指數',
          indexTableX: '季別',
          indexNote:
            '指數的基期和編製方法以來源頁為準，本站沒有轉換。2000 年第 1 季是這條序列的起點。',
        },
        ctl: {
          kicker: '房價漲了，央行出手；央行出手後，利率和成數跟著動。',
          h2: '{from} 年起央行出了 {n} 波選擇性信用管制，放寬 {nEase} 次',
          intro:
            '下圖疊上五大銀行新承做購屋貸款的平均利率和管制生效日。數字代表第幾波，向下箭頭代表放寬。圖下的完整時間線有 {rows} 列，包含 2009 年起的前一輪措施。',
          rateTitle:
            '管制期間，五大銀行新承做購屋貸款利率在 {lo}% 到 {hi}% 之間',
          rateSub: '月資料，標線為央行管制條文生效日。',
          lineRate: '五大銀行新承做購屋貸款利率',
          lineRedis: '重貼現率',
          markWave: '第 {n} 波管制，{date}生效',
          markEase: '放寬，{date}生效',
          tableX: '期別',
          open: '展開完整時間線（{rows} 列）',
          cols: {
            date: '日期',
            effective: '生效日',
            wave: '波次',
            kind: '類型',
            summary: '內容',
            sources: '來源',
          },
          kinds: { rule: '條文', event: '決議或措施' },
          scheduled: '預定',
          noEffective: '未訂',
          note: '「波次」是央行自己的稱法，央行沒有編號的列留空。「預定」代表日期晚於資料檢查日。',
        },
        foot: {
          h2: '從這裡走出去',
          lede: '歷史之後，現行制度怎麼運作，可以接著看這幾頁。',
          hub: '專題主頁：房價所得比、房貸負擔與試算工具',
          qingan: '青安貸款：三代條件、利率補貼與到期後的月付',
          timeline: '全站時間軸：把住宅放回八個時代的背景',
        },
      },
      qa: {
        meta: {
          title: '青安貸款 2026：青安 3.0 條件、利率與補貼退場',
          description:
            '青安 3.0 自 {fromIso} 起申辦，前 {n} 年 {r0}%，第 {yr} 年起 {base}%。含三代條件、資格條文與月付試算，至 {iso}。',
        },
        hero: {
          eyebrow: '專題 · 居住 · 青安貸款',
          title: '青安貸款 2026：現行是青安 3.0',
          lede: '新青安就是青安 2.0，已在 {v2to}期滿。現行方案是 {v3from}上路的青安 3.0，一段式利率前 {n} 年 {r0}%，第 {yr} 年起 {base}%。截至 {date}，全部青安累計撥貸 {allH} 戶。',
          s1l: '青安 3.0 前 {n} 年利率',
          s1s: '之後每年調高 {step} 個百分點，第 {yr} 年起 {base}%。',
          s2l: '全部青安累計撥貸',
          s2s: '{amount}，統計到 {asOf}。',
          s3l: '青安 3.0 撥貸戶數',
          s3s: '{amount}，{v3from}上路至 {asOf}。',
          unitHu: '戶',
          cue: '先弄清楚名稱，再看條件、利率和到期後的月付',
        },
        nav: {
          naming: '名稱',
          gens: '三代對照',
          rate: '利率補貼',
          clauses: '資格條文',
          timeline: '歷次調整',
          limits: '限貸管制',
          scale: '規模',
          voices: '爭議評價',
          after: '到期後',
          open: '未解問題',
        },
        naming: {
          kicker: '新青安、青安 2.0、青安 3.0，指的是三個不同的時期。',
          h2: '新青安就是青安 2.0，{v2to}已期滿，現行是青安 3.0',
          intro:
            '媒體口中的新青安，官方名稱是青安 2.0。2026 年上半年有媒體把後來的 3.0 也稱作新青安 2.0，查資料時看日期比看名稱可靠。',
          now: '現行方案',
          ended: '已期滿',
          past: '已結束',
          range: '{from} 到 {to}',
          apply: '申辦期到 {to}，撥款日最遲 {draw}。',
          official: '官方名稱',
          nick: '俗稱',
        },
        gens: {
          kicker: '三代的差別，集中在年齡、所得、房價上限和計息方式。',
          h2: '三代青安並排：額度、年限、年齡和房價上限怎麼變',
          intro:
            '下表逐項對照原版、青安 2.0 和現行的青安 3.0。手機上每一項會展開成三行，橫向不需要捲動。',
          item: '項目',
          rows: {
            limit: '最高額度',
            years: '貸款年限',
            grace: '寬限期',
            ltv: '貸款成數',
            age: '年齡',
            incomeCap: '所得上限',
            priceCap: '房價上限',
            onceOnly: '限貸一次、自住切結',
            rateOptions: '計息方式',
            target: '購屋標的',
          },
          names: { v1: '原版', v2: '青安 2.0', v3: '青安 3.0' },
        },
        rate: {
          kicker: '利率有兩層：原貸款利率，和政府補貼後的利率。',
          h2: '青安 3.0 的利率：前 {n} 年 {r0}%，第 {yr} 年起 {base}%',
          formulaK: '一行算法',
          formula:
            '補貼後利率 = 郵局二年期定儲機動利率 {bench}% + 加碼 {spread} 個百分點 − 補貼。補貼前的原貸款利率是 {base}%。',
          p1: '基準是{benchName}，{since} 起 {bench}%。一段式機動利率在基準上加 {spread} 個百分點，原貸款利率 {base}%。',
          p2: '前 {n} 年補貼 {s0} 個百分點，所以是 {r0}%。第 {y2} 年起每年少補 {step} 個百分點（資料檔稱為減半碼），第 {yr} 年補貼歸零。',
          stepTitle:
            '補貼後利率：前 {n} 年 {r0}%，每年調高，第 {yr} 年起 {base}%',
          stepSub: '長條頂端是補貼後利率，頂端到虛線之間是政府補貼。',
          stepBase: '原貸款利率 {base}%',
          stepAxis: '貸款第幾年',
          stepSubsidy: '政府補貼',
          stepTip: '第 {x} 年：補貼後 {r}%，補貼 {s} 個百分點',
          stepHdr: {
            step: '貸款年份',
            rate: '補貼後利率',
            subsidy: '補貼（百分點）',
          },
          note: '資料檔註記',
          v2: '青安 2.0 既有貸戶同樣適用遞減：補貼滿 {n} 年的貸戶，{date}起開始每年減半碼。',
        },
        clauses: {
          kicker: '資格怎麼寫，以財政部的條文為準。',
          h2: '誰能申辦：{n} 條資格與規則，原文逐條列出',
          intro:
            '下面每一條都是財政部國庫署公布文件的原文，附出處連結。承辦銀行仍有審核裁量，最後一條原文也這樣寫。',
          labels: {
            age: '年齡與無自有住宅',
            onceOnly: '限貸一次',
            selfUse: '自住切結',
            noHome: '無自有住宅的認定',
            share: '持分的例外',
            noRent: '出租與自住',
            discretion: '銀行審核裁量',
            violation: '違規的處理',
            window: '申辦期間',
          },
          origin: '原文',
          toolK: '逐條比對',
          toolNote:
            '下面的自查工具只比對上列條文，不輸出能不能貸到的結論，核貸由承貸銀行決定。',
        },
        tl: {
          kicker: '三代之間，還有一連串小調整。',
          h2: '歷次調整：從 {first}開辦到 {last}青安 3.0 上路',
          intro: '共 {n} 筆，依日期排列，每筆附來源。',
          more: '來源',
        },
        limits: {
          kicker: '青安貸款由公股銀行辦理，放款量大，碰到了兩條限制。',
          h2: '限貸與信用管制：青安 3.0 是否續排除銀行法第 72 條之 2，官方文件還沒看到',
          intro:
            '和青安有關的限制有兩條：銀行法第 72 條之 2 的限額，和央行的選擇性信用管制。下面三則是官方文件記下的調整，之後是央行條文的原文摘要。',
          cbc: '央行協處',
          fsc: '金管會令釋',
          pending: '待撥款',
          pendingN: '{cases} 件',
          pendingA: '{amount}',
          pendingNote: '已核貸待撥款，統計到 {date}。',
          origTitle: '央行條文的原文摘要',
          origIntro:
            '以下是央行時間線中和青安相關的兩列，保留資料檔的中文原文。',
          openK: '還沒有答案',
        },
        scale: {
          kicker: '規模：撥貸出去的錢有多大。',
          h2: '全部青安累計撥貸 {h} 戶、{amount}，統計到 {asOf}',
          intro:
            '官方月報的累計數字，加上本站用月報相減得出的青安 2.0 期間估算。',
          all: '全部青安累計撥貸',
          allN: '2010 年 12 月開辦起，{asOf}止。',
          v3: '青安 3.0 累計撥貸',
          v3N: '{v3from}上路起，{asOf}止。',
          v3a: '青安 3.0 累計受理',
          v3aN: '受理案件，尚未全部撥款。',
          v2: '青安 2.0 期間撥貸',
          v2N: '{note}',
          npl: '逾放比',
          nplQ: '青安貸款',
          nplA: '本國銀行全部房貸',
          nplN: '{asOf}統計，逾放比是逾期放款佔全部放款的比率。',
          hu: '戶',
        },
        voices: {
          kicker: '同一個方案，不同的人看見不同的事。',
          h2: '爭議與各方評價：政府、居住團體與學者怎麼說',
          intro:
            '每張卡都是說話者自己在公開場合講過的話，附日期與出處。機關說法經媒體引述的標「轉述」。本頁不收政黨與候選人的說法。',
          quote: '逐字引語',
          paraphrase: '轉述',
          via: '出處',
          translation: '本站翻譯，原文為中文',
          coverage: '這一頁收集的限制',
          more: '更完整的各方說法還在整理中。',
          groups: {
            government: '政府機關',
            advocacy: '居住團體',
            scholars: '學者',
          },
        },
        after: {
          kicker: '寬限期結束、補貼逐年退場之後，月付會跳多少。',
          h2: '寬限期結束後，月付從 {p1} 跳到 {p2}，補貼退完是 {p3}',
          intro:
            '用下面的試算器看自己的條件。預設是青安 3.0、{amount}、{years} 年、寬限 {grace} 年，月付路徑如下。官方和公股銀行都沒有公布月付金試算表，這些數字是本站試算。',
          pathTitle: '預設案例的月付路徑',
          rows: {
            grace: '寬限期內（第 1 到 {g} 年）',
            y6: '寬限期結束的第 {y} 年',
            y7: '補貼退完的第 {y} 年起',
          },
          pathNote:
            '本站試算：{amount}、{years} 年、寬限 {grace} 年，利率依補貼階梯，每年第一期的月付。官方沒有公布試算表。',
          toolTitle: '房貸試算',
          toolSources: '利率與條件：財政部國庫署，截至 {asOf}。',
          todoK: '讀者可以做的三件事',
          t1h: '用不用寬限期，各算一次',
          t1: '同樣 {amount}、{years} 年、不用寬限期，第 1 年月付約 {a} 元，第 {y} 年起約 {b} 元。寬限期內月付低，換來本金延後攤還，總利息也更多，兩個版本都算過再比。',
          t2h: '提前還款有兩種模式',
          t2: '試算器的提前還款有兩種：月付不變、縮短還款期數，或期數不變、降低月付。兩種都輸入一次，看總利息和月付差多少。',
          t3h: '向承貸銀行洽詢調整還款方式',
          t3: '還款方式能不能調整、條件是什麼，由承貸銀行決定。本站沒有查到官方統一公布的展延辦法，請直接向承貸銀行確認。',
          fine: '本頁不評估該不該買房，也不評估該不該申辦青安。',
        },
        open: {
          kicker: '最後，列出本站查不到的事。',
          h2: '還沒有答案的問題與資料來源',
          qTitle: '還沒有答案的問題',
          sTitle: '資料來源',
          cols: { agency: '機關', title: '文件', kind: '性質', date: '日期' },
          kinds: { primary: '官方文件', reported: '媒體報導' },
          checked: '資料檢查日 {date}',
        },
        foot: {
          h2: '從這裡走出去',
          hub: '專題主頁：房價所得比、房貸負擔與四個試算工具',
          history: '發展歷程：從土地改革到信用管制，六個時期',
          tools: '便民工具：房貸試算、負擔自查、青安資格自查、買租比較',
        },
      },
      pos: {
        meta: {
          title: '各方立場：台灣房價與青安貸款的公開說法 2026',
          description:
            '並排政府機關、居住團體、產業與學者對房價、青安貸款與信用管制 {nIssues} 個爭點的公開說法，引語與轉述分開標示，每筆附出處，資料截至 {iso}。',
        },
        draft: '本頁整理中，尚未公開',
        hero: {
          eyebrow: '專題 · 居住 · 各方立場',
          title: '各方立場：房價與青安貸款的公開說法',
          lede: '本頁依 {nIssues} 個爭點並排各方的公開說法，涵蓋 {nActors} 個機關、團體與學者，共 {nQuotes} 則逐字引語，資料截至 {date}。每一句都標出處，一手與轉述分開標示。',
          s1l: '個爭點',
          s2l: '個機關、團體與學者',
          s3l: '則逐字引語',
          s3s: '引號內是說話者的原話。',
        },
        nav: {
          coverage: '收集範圍',
          issues: '爭點矩陣',
          actors: '各方卡片',
          surveys: '調查數據',
        },
        coverage: {
          kicker: '先說這一頁看不到什麼。',
          h2: '這一頁收了什麼，沒收什麼',
        },
        issues: {
          kicker: '每個爭點一個區塊，各方的說法並排。',
          h2: '{n} 個爭點，各方怎麼說',
          who: '陣營',
          said: '說法',
          src: '出處',
          missing: '這幾方的公開說法沒有找到：{names}',
          none: '這個爭點在資料檔裡沒有收到任何一方的說法。',
        },
        actors: {
          kicker: '把說話的人放回他們自己的位置。',
          h2: '各方卡片：{n} 個機關、團體與學者',
          stance: '立場摘要（間接敘述）',
          quotes: '逐字引語',
          thin: '這一方的公開說法我們只找到這些',
          none: '這一方的公開說法，資料檔裡沒有收到。',
          person: '代表人物',
        },
        surveys: {
          kicker: '數字看起來客觀，先看是誰調查、怎麼調查。',
          h2: '調查數據怎麼讀：{n} 筆，調查者與方法',
          finding: '調查結果',
          who: '調查者',
          method: '方法',
          when: '時間',
          src: '出處',
        },
        labels: {
          primary: '一手',
          reported: '轉述',
          quote: '逐字引語',
          via: '出處',
          translation: '本站翻譯，原文為中文',
          verbatim: '逐字',
        },
        foot: '本頁整理中，尚未公開。內容以資料檔收錄的公開說法為限。',
      },
    },
    en: {
      ui: {
        source: 'Source: ',
        asOf: 'as of',
        derived: 'Calculated by Taiwan.md',
        primary: 'Official / the group itself',
        reported: 'Media report',
        noData: 'no data',
        related: 'Related articles',
        zhOnly: 'Chinese',
        original: 'Original Chinese',
        origNote: 'This column keeps the Chinese wording of the data file.',
        navLabel: 'On this page',
        back: 'Back to the housing topic',
      },
      hist: {
        meta: {
          title: 'Taiwan Housing Policy History 2026: Six Eras',
          description:
            '{n} events in Taiwan housing policy, {from} to {to}, in six eras, plus price cycles and central bank controls. All sourced; data as of {iso}.',
        },
        hero: {
          eyebrow: 'Topic · Housing · History',
          title: "How Taiwan's Housing Policy Got Here, 2026",
          lede: 'This page lists {n} housing-policy and price events, from {from} to {last}, in six eras, with data as of {date}. Every event carries a source and is marked as coming from an official body or the group itself, or from a media report.',
          nLabel: 'Events listed',
          nSub: 'Every entry links to a source. Only items whose original text we read are included.',
          spanLabel: 'Earliest to latest event year',
          spanSub:
            'For the earliest era ({a} to {b}), only {k} events could be verified.',
          lastLabel: 'Latest turning point',
          cue: 'Start with the six eras, then the five price cycles and the central bank controls',
        },
        nav: {
          eras: 'Six eras',
          cycles: 'Five price cycles',
          controls: 'Rates and controls',
          links: 'Keep reading',
        },
        erasNav: 'Jump to an era',
        erasH: 'Six eras',
        filter: {
          label: 'Filter by type',
          all: 'All',
          count: 'Showing {shown} of {total}',
        },
        eraNote:
          'This era lists {n} entries, {p} of them from an official agency or the group itself.',
        eraSrcLine: 'Each event carries its own source.',
        cycles: {
          kicker:
            'Prices rose each time, but the causes and the numbers differ.',
          h2: 'Of {n} price surges, only {k} have a figure for the rise',
          intro:
            'The table sets the surges side by side. Where no reliable figure exists the cell says so. Each source uses its own start and end years and geography, so figures listed together in one cell cannot be checked against each other.',
          cols: {
            wave: 'Wave',
            rise: 'Rise',
            drivers: 'Causes',
            turning: 'Turning point',
            sources: 'Sources',
          },
          none: 'No data',
          dash: 'No data',
          indexTitle:
            'The Cathay house price index (national) rose from {a} to {b}; it is a private index',
          indexSub:
            'Quarterly data republished by the Ministry of the Interior platform. Not an official statistic.',
          indexLine: 'Cathay (private)',
          indexTag: 'Private index',
          indexTableX: 'Quarter',
          indexNote:
            'Base period and method follow the source page; we did not rebase the series. Q1 2000 is where it starts.',
        },
        ctl: {
          kicker:
            'Prices rose, the central bank stepped in, and rates and loan caps moved after that.',
          h2: 'Since {from} the central bank has issued {n} rounds of selective credit controls and eased {nEase} times',
          intro:
            'The chart overlays the average new-mortgage rate of the five big banks with the dates each control took effect. Numbers mark the round and a down arrow marks an easing. The full timeline below has {rows} rows, including the earlier round of measures that began in 2009.',
          rateTitle:
            "During the controls, the five big banks' new mortgage rate ranged from {lo}% to {hi}%",
          rateSub: 'Monthly data; markers show when each control took effect.',
          lineRate: 'New home-loan rate, five big banks',
          lineRedis: 'Rediscount rate',
          markWave: 'Round {n}, effective {date}',
          markEase: 'Easing, effective {date}',
          tableX: 'Period',
          open: 'Show the full timeline ({rows} rows)',
          cols: {
            date: 'Date',
            effective: 'Effective',
            wave: 'Round',
            kind: 'Type',
            summary: 'Content',
            sources: 'Sources',
          },
          kinds: { rule: 'Rule', event: 'Decision or measure' },
          scheduled: 'Scheduled',
          noEffective: 'n/a',
          note: "Round is the central bank's own numbering; rows it did not number are left blank. Scheduled means the date falls after the data check date.",
        },
        foot: {
          h2: 'Where to go next',
          lede: 'After the history, these pages show how the current system works.',
          hub: 'Housing topic: price-to-income ratio, mortgage burden and calculators',
          qingan:
            'The Qing-An loan: three versions, rate subsidies and payments after the subsidy ends',
          timeline:
            'Site-wide timeline: housing set against Taiwan’s eight eras',
        },
      },
      qa: {
        meta: {
          title: 'Qing-An Youth Home Loan 2026: Version 3.0 Terms',
          description:
            'Qing-An 3.0 open since {fromIso}: {r0}% for {n} years, {base}% from year {yr}. Terms of three versions, eligibility and payments; data as of {iso}.',
        },
        hero: {
          eyebrow: 'Topic · Housing · Qing-An loan',
          title: 'The Qing-An Youth Home Loan 2026: Version 3.0 Is Current',
          lede: 'The "new Qing-An" is Qing-An 2.0, which expired on {v2to}. The current scheme is Qing-An 3.0, open since {v3from}: {r0}% for the first {n} years on a single floating rate, {base}% from year {yr}. As of {date}, all Qing-An loans together have disbursed {allH} households. Qing-An (青安) is a subsidised first-home loan run through state-owned banks.',
          s1l: 'Qing-An 3.0 rate, first {n} years',
          s1s: 'Then +{step} points a year, reaching {base}% in year {yr}.',
          s2l: 'All Qing-An loans disbursed',
          s2s: '{amount}, as of {asOf}.',
          s3l: 'Qing-An 3.0 disbursed',
          s3s: '{amount}, from {v3from} to {asOf}.',
          unitHu: 'households',
          cue: 'Get the names straight first, then terms, rates and payments after the subsidy ends',
        },
        nav: {
          naming: 'Names',
          gens: 'Three versions',
          rate: 'Rate and subsidy',
          clauses: 'Eligibility',
          timeline: 'Changes',
          limits: 'Lending limits',
          scale: 'Scale',
          voices: 'Debate',
          after: 'After the subsidy',
          open: 'Open questions',
        },
        naming: {
          kicker:
            '"New Qing-An", "Qing-An 2.0" and "Qing-An 3.0" refer to different periods.',
          h2: 'The "new Qing-An" is Qing-An 2.0, expired {v2to}; the current scheme is 3.0',
          intro:
            'What the media called the new Qing-An has the official name Qing-An 2.0. In the first half of 2026 some outlets called the later 3.0 "new Qing-An 2.0" as well, so when searching, the date is more reliable than the name.',
          now: 'Current',
          ended: 'Expired',
          past: 'Closed',
          range: '{from} to {to}',
          apply: 'Applications until {to}; disbursement no later than {draw}.',
          official: 'Official name',
          nick: 'Also called',
        },
        gens: {
          kicker:
            'The three versions differ mainly in age, income, price caps and how interest is charged.',
          h2: 'Three versions side by side: limits, terms, age and price caps',
          intro:
            'The table compares the original, Qing-An 2.0 and the current 3.0 row by row. On a phone each row opens into three lines, so there is no sideways scrolling.',
          item: 'Item',
          rows: {
            limit: 'Maximum loan',
            years: 'Loan term',
            grace: 'Grace period',
            ltv: 'Loan-to-value',
            age: 'Age',
            incomeCap: 'Income cap',
            priceCap: 'Home price cap',
            onceOnly: 'One loan per person, owner-occupier pledge',
            rateOptions: 'Interest type',
            target: 'Property',
          },
          names: {
            v1: 'Original',
            v2: 'Qing-An 2.0',
            v3: 'Qing-An 3.0',
          },
        },
        rate: {
          kicker:
            'The rate has two layers: the base loan rate, and the rate after the government subsidy.',
          h2: 'Qing-An 3.0 rates: {r0}% for the first {n} years, {base}% from year {yr}',
          formulaK: 'The calculation in one line',
          formula:
            'Rate after subsidy = Chunghwa Post two-year floating deposit rate {bench}% + spread {spread} points − subsidy. The base loan rate before subsidy is {base}%.',
          p1: 'The benchmark is the {benchName}, {bench}% since {since}. The single floating rate adds {spread} points, giving a base loan rate of {base}%.',
          p2: 'The subsidy is {s0} points for the first {n} years, hence {r0}%. From year {y2} it shrinks by {step} points a year (the data file calls this half a "ma") and reaches zero in year {yr}.',
          stepTitle:
            'Rate after subsidy: {r0}% for {n} years, then rising each year to {base}% from year {yr}',
          stepSub:
            'The top of each bar is the rate after subsidy; the gap up to the dashed line is the government subsidy.',
          stepBase: 'Base loan rate {base}%',
          stepAxis: 'Loan year',
          stepSubsidy: 'Government subsidy',
          stepTip: 'Year {x}: {r}% after subsidy, subsidy {s} points',
          stepHdr: {
            step: 'Loan year',
            rate: 'Rate after subsidy',
            subsidy: 'Subsidy (points)',
          },
          note: 'Note from the data file',
          v2: 'Existing Qing-An 2.0 borrowers get the same step-down: those whose subsidy had run {n} years began the half-ma annual cut on {date}.',
        },
        clauses: {
          kicker: 'The wording that counts is the Ministry of Finance text.',
          h2: 'Who can apply: {n} eligibility rules, quoted word for word',
          intro:
            'Each rule below is quoted from a document of the Ministry of Finance, National Treasury Administration, with a link. The lending bank keeps discretion, as the last quoted rule says.',
          labels: {
            age: 'Age and no owned home',
            onceOnly: 'One loan only',
            selfUse: 'Owner-occupier pledge',
            noHome: 'How "no owned home" is judged',
            share: 'Exception for small shares',
            noRent: 'Renting out and owner-occupation',
            discretion: 'Bank discretion',
            violation: 'Handling of violations',
            window: 'Application window',
          },
          origin: 'Original wording (Chinese)',
          toolK: 'Check it clause by clause',
          toolNote:
            'The checker below only compares your answers with the clauses above. It never says you can borrow; the lending bank decides.',
        },
        tl: {
          kicker:
            'Between the three versions came a string of smaller changes.',
          h2: 'Changes over time: from the {first} launch to the {last} start of 3.0',
          intro: '{n} entries in date order, each with a source.',
          more: 'Source',
        },
        limits: {
          kicker:
            'State-owned banks run the Qing-An loan, and at that volume two limits come into play.',
          h2: 'Lending limits and credit controls: whether 3.0 stays outside Article 72-2 has no official document yet',
          intro:
            'Two limits bear on Qing-An: the cap under Article 72-2 of the Banking Act, and the central bank’s selective credit controls. Below are three adjustments recorded in official documents, followed by an extract of the central bank’s own wording.',
          cbc: 'Central bank relief',
          fsc: 'FSC ruling',
          pending: 'Awaiting disbursement',
          pendingN: '{cases} cases',
          pendingA: '{amount}',
          pendingNote: 'Approved but not yet disbursed, as of {date}.',
          origTitle: 'Extract of the central bank’s wording',
          origIntro:
            'Two rows of the central bank timeline that bear on Qing-An, kept in the Chinese wording of the data file.',
          openK: 'No answer yet',
        },
        scale: {
          kicker: 'Scale: how much has been lent.',
          h2: 'All Qing-An loans have disbursed {h} households and {amount}, as of {asOf}',
          intro:
            'Cumulative figures from the official monthly report, plus our own estimate for the Qing-An 2.0 period obtained by subtracting monthly reports.',
          all: 'All Qing-An loans disbursed',
          allN: 'Since launch in December 2010, to {asOf}.',
          v3: 'Qing-An 3.0 disbursed',
          v3N: 'From {v3from} to {asOf}.',
          v3a: 'Qing-An 3.0 applications accepted',
          v3aN: 'Accepted cases, not all disbursed yet.',
          v2: 'Disbursed in the 2.0 period',
          v2N: '{note}',
          npl: 'Non-performing ratio',
          nplQ: 'Qing-An loans',
          nplA: 'All mortgages at domestic banks',
          nplN: 'As of {asOf}. The ratio is overdue loans as a share of all loans.',
          hu: 'households',
        },
        voices: {
          kicker:
            'One scheme, and different people see different things in it.',
          h2: 'The debate: what government, housing groups and scholars say',
          intro:
            'Each card is something the speaker said in public, with date and source. Agency statements quoted by the media are marked as paraphrase. Political parties and candidates are not included here.',
          quote: 'Verbatim quote',
          paraphrase: 'Paraphrase',
          via: 'Source',
          translation: 'Our translation; the original is Chinese',
          coverage: 'Limits of what we collected',
          more: 'A fuller account of each side’s position is still being prepared.',
          groups: {
            government: 'Government agencies',
            advocacy: 'Housing advocacy groups',
            scholars: 'Scholars',
          },
        },
        after: {
          kicker:
            'What happens to the monthly payment once the grace period ends and the subsidy fades.',
          h2: 'After the grace period the payment jumps from {p1} to {p2}, and to {p3} once the subsidy is gone',
          intro:
            'Use the calculator below for your own terms. It starts on Qing-An 3.0 with {amount}, {years} years and a {grace}-year grace period, and the payment path is shown here. Neither the government nor the state-owned banks publish a payment table, so these numbers are our own calculation.',
          pathTitle: 'Monthly payment path in the default case',
          rows: {
            grace: 'During the grace period (years 1 to {g})',
            y6: 'Year {y}, when the grace period ends',
            y7: 'From year {y}, subsidy gone',
          },
          pathNote:
            'Calculated by Taiwan.md: {amount}, {years} years, {grace}-year grace period, rate following the subsidy steps, first payment of each year. No official payment table exists.',
          toolTitle: 'Mortgage calculator',
          toolSources:
            'Rates and terms: Ministry of Finance, National Treasury Administration, as of {asOf}.',
          todoK: 'Three things a borrower can do',
          t1h: 'Run it once with the grace period and once without',
          t1: 'For the same {amount} over {years} years with no grace period, the first-year payment is about NT${a} and from year {y} about NT${b}. The grace period lowers early payments and pushes principal later, which also raises total interest, so compare both versions.',
          t2h: 'Prepayment comes in two modes',
          t2: 'The calculator offers two prepayment modes: keep the payment and shorten the term, or keep the term and lower the payment. Enter each once and compare total interest and payment.',
          t3h: 'Ask the lending bank about adjusting repayment',
          t3: 'Whether the repayment arrangement can be adjusted, and on what terms, is up to the lending bank. We found no official, uniform rule on extensions, so confirm with the bank directly.',
          fine: 'This page does not judge whether to buy a home or whether to take a Qing-An loan.',
        },
        open: {
          kicker: 'Last, what we could not find.',
          h2: 'Open questions and sources',
          qTitle: 'Questions with no answer yet',
          sTitle: 'Sources',
          cols: {
            agency: 'Agency',
            title: 'Document',
            kind: 'Type',
            date: 'Date',
          },
          kinds: { primary: 'Official document', reported: 'Media report' },
          checked: 'Data checked {date}',
        },
        foot: {
          h2: 'Where to go next',
          hub: 'Housing topic: price-to-income ratio, mortgage burden and four calculators',
          history: 'History: from land reform to credit controls, in six eras',
          tools:
            'Tools: mortgage calculator, affordability check, Qing-An eligibility check, rent vs buy',
        },
      },
      pos: {
        meta: {
          title: 'Who Says What on Taiwan Housing and Qing-An 2026',
          description:
            'Public statements on {nIssues} issues in housing prices, the Qing-An loan and credit controls, quotes and paraphrase marked apart. Data as of {iso}.',
        },
        draft: 'This page is a work in progress and not yet public',
        hero: {
          eyebrow: 'Topic · Housing · Positions',
          title: 'Who Says What on Housing Prices and the Qing-An Loan',
          lede: 'This page sets public statements side by side on {nIssues} issues, covering {nActors} agencies, groups and scholars and {nQuotes} verbatim quotes, with data as of {date}. Every line has a source, and primary and reported material are marked apart.',
          s1l: 'issues',
          s2l: 'agencies, groups and scholars',
          s3l: 'verbatim quotes',
          s3s: 'Text in quotation marks is the speaker’s own words.',
        },
        nav: {
          coverage: 'Scope',
          issues: 'Issue matrix',
          actors: 'Each side',
          surveys: 'Surveys',
        },
        coverage: {
          kicker: 'First, what this page does not have.',
          h2: 'What this page covers and what it leaves out',
        },
        issues: {
          kicker:
            'One block per issue, with each side’s statement next to the others.',
          h2: '{n} issues and what each side says',
          who: 'Side',
          said: 'Statement',
          src: 'Source',
          missing: 'No public statement was found from: {names}',
          none: 'The data file has no statement from any side on this issue.',
        },
        actors: {
          kicker: 'Put each speaker back in their own place.',
          h2: 'Each side: {n} agencies, groups and scholars',
          stance: 'Position summary (indirect)',
          quotes: 'Verbatim quotes',
          thin: 'This is all the public material we found for this side',
          none: 'The data file has no public statement from this side.',
          person: 'Spokesperson',
        },
        surveys: {
          kicker:
            'Numbers look objective; first check who ran the survey and how.',
          h2: 'Reading the surveys: {n} results, who and how',
          finding: 'Result',
          who: 'Conducted by',
          method: 'Method',
          when: 'When',
          src: 'Source',
        },
        labels: {
          primary: 'Primary',
          reported: 'Reported',
          quote: 'Verbatim quote',
          via: 'Source',
          translation: 'Our translation; the original is Chinese',
          verbatim: 'verbatim',
        },
        foot: 'This page is a work in progress and not yet public. It carries only the public statements collected in the data file.',
      },
    },
  },
};
const zh = dicts.byLang['zh-TW'];
type Dict = typeof zh;
const en: Dict = dicts.byLang.en;

/** 其他語言回 en（ja、ko 也回 en）。 */
export function housingSub(lang: string): Dict {
  return lang === 'zh-TW' ? zh : en;
}
export type HousingSubDict = Dict;

// ── 英文版對照翻譯：資料檔只有中文的欄位 ────────────────────────────────

export interface EnData {
  naming: Record<string, { name: string; nick: string }>;
  generations: Record<string, Record<string, string>>;
  cycleRise: Record<string, string>;
  cycleNote: Record<string, string>;
  rateNote: string;
  timeline: Record<string, string>;
  open: string[];
  hosts: Record<string, string>;
  benchName: string;
  scaleNote: string;
  who: Record<string, string>;
  surveyDate: Record<string, string>;
  quotes: Record<string, string>;
}

export const EN_DATA: EnData = {
  naming: {
    v1: { name: 'Original Qing-An', nick: '"Old Qing-An"' },
    v2: { name: 'Qing-An 2.0 (loan refinement scheme)', nick: '"New Qing-An"' },
    v3: {
      name: 'Qing-An 3.0',
      nick: 'Some outlets called it "new Qing-An 2.0" in the first half of 2026',
    },
  },
  generations: {
    v1: {
      limit: 'NT$8 million (from 1 January 2016; NT$5 million at launch)',
      years: '30 years',
      grace: '3 years',
      ltv: 'Up to 80%',
      age: 'Adults',
      incomeCap: 'None',
      priceCap: 'None',
      onceOnly: 'None',
      rateOptions: 'Mixed fixed, or single floating (from 2019)',
      target: 'Existing homes',
    },
    v2: {
      limit: 'NT$10 million',
      years: '40 years',
      grace: '5 years',
      ltv: 'Up to 80%',
      age: 'Adults, no upper limit',
      incomeCap: 'None',
      priceCap: 'None',
      onceOnly:
        'One loan only from 2024-06-27; new borrowers sign an owner-occupier pledge',
      rateOptions: 'Single, two-stage or mixed',
      target: 'Existing homes',
    },
    v3: {
      limit:
        'NT$10 million; NT$12 million if registered as married within two years; NT$15 million with minor children',
      years: '40 years (including the grace period)',
      grace: 'Up to 5 years',
      ltv: 'Up to 80%',
      age: 'Under 50 at application, and age plus term no more than 80',
      incomeCap: 'Borrower’s own annual income no more than NT$2 million',
      priceCap:
        'Taipei NT$35 million; New Taipei and Hsinchu City and County NT$25 million; elsewhere NT$20 million',
      onceOnly: 'One loan only and the owner-occupier pledge continue',
      rateOptions: 'Single floating rate only',
      target:
        'A home whose ownership was acquired by purchase within six months before the application',
    },
  },
  cycleRise: {
    '1972-1974': 'No data',
    '1978-1980': 'No data',
    '1986-1990':
      '(1) Greater Taipei, per ping: NT$67,000 (1986) to NT$251,000 (1989), +274.5% (Chang Chin-oh et al. 2009, citing Hsu Tien-ching 2006).\n(2) Under NT$100,000 to nearly NT$250,000 per ping, about +150% (2015 Yearbook).\n(3) Average rise above 200% from 1987 to 1989 against about 40% for national income (United Daily News history feature, source of figures not stated).\n(4) Taipei City, per ping: NT$67,200 (1986) to NT$368,700 (1990), nearly 4.5 times (TVBS).\n(5) Under NT$100,000 in 1985 to nearly NT$300,000 in 1990, nearly 3 times (Lu Shao-wei column)',
    '2003-2014':
      'Sinyi house price index (national, Q4 of each year) 39.15 (2003) to 106.71 (2014), +173%; Cathay index 45.97 to 91.69, +99.5%; Sinyi Taipei index 38.92 to 108.44, about +179% (rises calculated by Taiwan.md). Separately, average transaction prices from a housing magazine survey (not an index): Taipei City NT$367,000 per ping (2002) to NT$803,000 (2011), New Taipei NT$168,000 to NT$336,000',
    '2020-2024':
      'No data: we could not find the 2020 base value or the cumulative rise. Only the Ministry of the Interior index for Q4 2024, 150.98, up 10.85% on the year and rising for 26 consecutive quarters (quoted by Commercial Times).',
  },
  cycleNote: {
    '1986-1990':
      'The five figures use different start and end years and geography. They are listed side by side and cannot be checked against each other.',
    '2003-2014':
      'The two Sinyi figures share one source, so they are not independent confirmation. We did not find the Ministry of the Interior price index series from 2003.',
  },
  rateNote:
    'Single floating rate (for new loans from 2021-01-01). The 2-ma subsidy is 1.5 ma from the Ministry of the Interior housing fund plus half a ma forgone by state-owned banks; after year 3 it falls by half a ma each year, and from year 7 the original loan rate applies. Existing Qing-An 2.0 borrowers get the same step-down.',
  timeline: {
    '2010-12-01':
      'The Ministry of Finance launched the Youth Home-Starter Loan, run by 8 state-owned banks from their own funds',
    '2016-01-01': 'The loan limit rose from NT$5 million to NT$8 million',
    '2023-07-13':
      'The Executive Yuan cabinet approved the refined scheme: NT$10 million limit, 40-year term, 5-year grace period, interest subsidy to 2026-07-31',
    '2023-08-01': 'The "new Qing-An" (Qing-An 2.0) took effect',
    '2024-03-22':
      'The central bank raised rates by half a ma and the government matched it with a larger subsidy, keeping the single-rate loan at 1.775% after subsidy',
    '2024-06-27':
      'A one-loan-only rule was added, and new borrowers must sign an owner-occupier pledge',
    '2024-07-16':
      'First inspection round: 1,502 cases not owner-occupied (1,332 rented out, 170 nominee borrowers)',
    '2024-08-21':
      'Second inspection round: 73 cases not owner-occupied (34 rented out, 39 nominee borrowers)',
    '2024-10-09':
      'Central bank relief measures: the new Qing-An (non-luxury homes) is exempt from the first-home and second-home limits of the seventh round of controls',
    '2025-09-04':
      'FSC ruling: new Qing-An loans disbursed after 2025-09-01 do not count toward the limit under Article 72-2 of the Banking Act',
    '2025-09-05':
      'Ministry of Finance: as of end-July 2025, 5,421 cases of subsidy recovered, over NT$103.48 million; 12,923 approved cases awaiting disbursement, over NT$125.7 billion',
    '2026-07-16':
      'The Executive Yuan cabinet (4012th meeting) approved Qing-An 3.0',
    '2026-08-01':
      'Qing-An 3.0 took effect; Qing-An 2.0 borrowers whose subsidy had run 3 years began the half-ma annual step-down',
  },
  open: [
    'Whether the FSC keeps Qing-An 3.0 outside the Article 72-2 limit: no 2026 official document was found',
    'The Ministry of Finance’s cumulative figure for recovered subsidies on the same basis in 2026: no data',
    'The new Qing-An’s share of all new home-purchase loans: no official figure',
    'An official or state-owned-bank payment table: none published',
  ],
  hosts: {
    'www.ey.gov.tw': 'Executive Yuan',
    'www.mof.gov.tw': 'Ministry of Finance',
  },
  benchName:
    'Chunghwa Post two-year time-deposit floating rate (balances under NT$5 million)',
  who: {
    永慶房屋: 'Yungching Realty',
    行政院主計總處: 'Directorate-General of Budget, Accounting and Statistics',
  },
  surveyDate: {
    '2026 年第 1 季調查（2025-12-24 經濟日報報導）':
      'Q1 2026 survey (reported by Economic Daily News on 2025-12-24)',
    '2026-11-05 公布': 'Released 2026-11-05',
  },
  scaleNote:
    'Calculated by Taiwan.md: cumulative disbursement at the end of 2026-06 minus the cumulative figure at the end of 2023-07. The official release says "over 170,000 households approved under Qing-An 2.0".',
  quotes: {
    最主要是希望政策更精準:
      'The main hope is that the policy helps people more precisely, so we want a cap on the total home price.',
    至於有什麼漏洞:
      'As for any loopholes, that is the Ministry of Finance’s responsibility; we will not overstep and go beyond our duties.',
    公股銀確實有背負政策性放款:
      'State-owned banks do carry policy-based lending, but the rule sets it at 30%; if the numerator cannot be adjusted, they can also enlarge the denominator by taking in deposits through their branches.',
    不論是蓋社會住宅或新青安貸款:
      'Whether it is building social housing or the new Youth Loan, neither really solves high home prices; if anything they help entrench them.',
    新青安透過低利率:
      'Through low rates, grace periods and 40-year mortgages, the new Youth Loan creates the illusion that young people can afford a home, but in reality it may leave them buying at the peak and carrying debt for a lifetime.',
  },
};
