# ARTICLE-DONE-LOG — 文章開發完成日誌

> **append-only log**。ARTICLE-INBOX §Done 的歸檔，最新在頂（reverse chronological）。
> 從 pending / in-progress 完成的條目搬到這裡保留歷史，避免 ARTICLE-INBOX 膨脹。
>
> **分工**：
>
> - [ARTICLE-INBOX.md](ARTICLE-INBOX.md) = 當下的 pending / in-progress（未來視角）
> - **本檔** = 已完成歷史（過去視角）
>
> 建立動機：2026-04-20 γ2 觀察者「清理一下 ARTICLE-INBOX 的 Done，分成 Done 檔案做 append style log」。ARTICLE-INBOX 累計 12+ 條 Done 後段篇幅失控，拆分讓 inbox 回到「只看該做什麼」的純 intake 功能。

---

## 寫入規則

每次 REWRITE-PIPELINE Stage 6 commit 後：

1. 在 §Log 最頂 append 新條目（reverse chronological）
2. ARTICLE-INBOX 對應條目改成一行 pointer 註解：`<!-- {主題} 已完成 YYYY-MM-DD {session} → ARTICLE-DONE-LOG.md -->`
3. 如果 pending 條目 status 被改為 done 但沒搬走（幽靈條目），一併搬到這裡

---

## 條目格式

沿用 ARTICLE-INBOX §Done 既有格式（不重設計避免遷移摩擦）：

```markdown
### {主題} — YYYY-MM-DD {session} 完成（副標）

- **Article**: [knowledge/Category/slug.md](../../knowledge/Category/slug.md)
- **Pipeline**: REWRITE-PIPELINE v{version} — {NEW | EVOLVE} 模式（...）
- **核心矛盾**：...
- **Hook**：...
- **品質**：腳註數 / 字數 / 破折號 / ...
- **Research**: [reports/research/YYYY-MM/slug.md](../../reports/research/YYYY-MM/slug.md)
- (optional) 敏感素材處理 / 大事實修正 / Cross-link / 待觀察者驗證
```

---

## 📜 Log（reverse chronological，最新在頂）

### justfont 與台灣字體發展 NEW — 2026-04-29 α 完成（從華康廿五年到金萱七十六分鐘的字型小史 / Technology）

- **Article**: [knowledge/Technology/justfont與台灣字體發展.md](../../knowledge/Technology/justfont與台灣字體發展.md)
- **Pipeline**: REWRITE-PIPELINE v2.20 — NEW 模式，全 Stage 0-6（跳過 Stage 4.5 媒體插入：字型樣張授權需個別申請，待後 polish）
- **觸發**：α session 觀察者「繼續」第二條 P0（justfont + 台灣字體發展）
- **核心矛盾**：「華康做了二十五年沒人愛字型，justfont 用群募讓字型變全民議題」（28 字 / agent 推薦候選 a）
- **Hook**：「iPhone 上的『蘋』字是誰畫的」 — 從 2015 年 6 月 8 日 WWDC 蘋方發表反差切入，揭穿台灣 1987 年起就有商用中文字型能力的暗區
- **8 scene 非編年體**：iPhone 上的「蘋」字是誰畫的 / 七十六分鐘的一百五十萬 / 二分糖、半糖、八分糖 / 七十五個字一天 / 「萱」字頭上那撇連不連 / 教授把 48 套字型放上網 / 林霞、蘭陽明體與民國初年 / 七千字、七千人、與七年 / 思源黑體：早金萱一年的那場開源 / 「沒人願意做字啊」
- **品質**：46 footnote / ~6,000 字 / §11 violations 0 / format-check ✅ all green / footnote URL 40/46 alive 2 redirect 0 dead 4 timeout / 破折號 17（≤18 / 1500 字 門檻）/ 對位句型 0 處
- **Stage 1 研究**：spawn general-purpose agent → 20 WebSearch + 7 WebFetch / 落檔 [reports/research/2026-04/justfont與台灣字體發展.md](../../reports/research/2026-04/justfont與台灣字體發展.md) 435 行 / 13 條 verbatim 直接引語表 / 完整反例 §6 §7（金萱寶瓶事件相當的 `錦黑體` 抄襲爭議 + 教育部標準字衝突 + 大廠對照）
- **Stage 1.5 自主拍板**（觀察者授權「不要問我，直接走完整 pipeline」）：(1) 採信 agent 校正 4 個事實錯誤（文鼎 1990 / 王漢宗中原大學 / 金萱 NT$25,930,099 / 7,667 人 / 三位 founder 是 葉俊麟/林霞/蘇煒翔）；(2) §6 反例 + §2 大廠對照 ≥ 30% 篇幅；(3) hero 圖延後到 Stage 4.5 polish 處理（字型樣張授權需慎判）
- **Stage 3.5 FACTCHECK Quick Mode**：5 條 dead-link 修補（[^4] [^7] [^16] [^33] [^39]）→ 0 dead / 2 redirect / 4 timeout（acceptable）
- **Stage 5 cross-link**：3 個 sibling 反向回補（社會運動與公民參與 / 台灣新媒體藝術 / 報導者）

### 報導者 NEW — 2026-04-29 α 完成（公民社會把調查報導從營業項目救成公共財的十年 / Society）

- **Article**: [knowledge/Society/報導者.md](../../knowledge/Society/報導者.md)
- **Pipeline**: REWRITE-PIPELINE v2.20 — NEW 模式，全 Stage 0-6（跳過 Stage 4.5 媒體插入：報導者圖片授權需個別申請，待後 polish）
- **觸發**：α session 觀察者「開始執行今天加入的三篇的一篇一篇做 rewrite-pipeline 深度研究」（今日加入 P0 三條的第一條）
- **核心矛盾**：「公民社會把調查報導從營業項目救成公共財」（22 字 / 候選 C，呼應策展抓手）
- **Hook**：2015 年 9 月 1 日記者節上午十點記者會，童子賢個人捐助 500 萬元成立財團法人，三不原則「不擁有、不干預、不回收」九個字成為基金會 DNA
- **8 scene 非編年體**：2015 年 9 月 1 日上午 / 不擁有、不干預、不回收 / 漁工的眼睛 / 不顯示點閱率的編輯室 / 那年寶瓶 / 10 到 15 歲的讀者 / 出口禁令下的紅線 / Rolling On
- **品質**：36 footnote / ~5,000 字 / §11 violations 0 / format-check ✅ all green / footnote URL 36/36 alive 0 redirect 0 dead / 破折號 14（≤15 門檻）/ 對位句型 3 處（≤3 門檻，三題判準合法）
- **Stage 1 研究**：spawn general-purpose agent → 22 WebSearch + 8 WebFetch / 落檔 [reports/research/2026-04/報導者.md](../../reports/research/2026-04/報導者.md) 493 行 / 14 條 verbatim 直接引語表 / 完整反例 §8 §9（寶瓶事件 + 王健壯 #MeToo + 報導者不是台灣第一個獨立媒體）
- **Stage 1.5 自主拍板**（觀察者授權「不要問我，直接走完整 pipeline」）：(1) 童子賢只寫初始 500 萬高信心 + 不寫單源「年捐 3 千萬」累計總額；(2) 寶瓶 + 王健壯放尾段「那年寶瓶」並陳，呈現「也會犯錯但會公開認錯」的成熟度；(3) 8-scene 同意 agent 順序、場景化處理
- **Stage 3 verbatim 引語審計**：兩處原 verbatim 引語（「絕對不是彼此對立」+「我們的競爭對手是抖音、YouTube」）因 source URL dead 或 single source 無 Ctrl-F 驗證 → 降為轉述句式（per EDITORIAL §挖引語紅線 + DNA #23）
- **Stage 3.5 FACTCHECK Quick Mode**：5 條 dead-link 修補（[^10] [^15] [^17] [^19] [^26]）+ 1 條 redirect 修補（[^6] INSIDE article 3793 已換內容）→ 36/36 PASS / 0 dead / 0 redirect
- **Stage 5 cross-link**：2 個 sibling 反向回補（社會運動與公民參與 / 台灣新媒體藝術）；台灣獨立音樂 defer（既有 12 個 broken wikilink legacy 阻擋 pre-commit hook，留 follow-up 一併修補）

### 蔡健雅 NEW — 2026-04-28 κ 完成（四度金曲歌后，新加坡人怎麼把台灣變成主場）

- **Article**: [knowledge/People/蔡健雅.md](../../knowledge/People/蔡健雅.md)
- **Commit**: `5030f5d6` — REWRITE-PIPELINE NEW 模式
- **核心矛盾**：新加坡身分證、台灣戶籍、英文母語的女歌手，唯獨在台灣樂壇拿下四度金曲歌后
- **觸發**：κ session R12（觀察者 trigger 線性執行 12 輪之 1）

### 台灣宗教信仰整併 EVOLVE — 2026-04-28 κ 完成（在恐懼裡長出的信仰帝國 / Issue #655 三篇整併為一篇深度文章）

- **Article**: [knowledge/Culture/台灣宗教與寺廟文化.md](../../knowledge/Culture/台灣宗教與寺廟文化.md)（canonical 主稿）
- **Commit**: `87911554` — REWRITE-PIPELINE EVOLVE + §整併變體 Step A-E（3 篇 zh-TW + 4 篇翻譯整併為 1 篇 + 5 lang redirect × 9 條）
- **整併規模**：archive 9 個檔案、保留 1 篇主稿、淨刪 ~3,550 行
- **核心反直覺**：「全世界廟宇密度最高、宗教自由排名亞洲第二的島嶼，最大宗的兩個信仰歷史起源都跟瘟疫和死亡有關」
- **8 scene 非編年體**：保安宮屋頂 / 一萬五千座廟 / 大甲媽祖 9 天 8 夜 / 三教共用一座屋頂 / 一貫道戰後第一個合法化的非法宗教 / 戰後新興佛教四大山頭 / 馬雅各 + 馬偕 + 1977 人權宣言 / 從恐懼到自由
- **品質**：45 footnote / ~5,500 字 / format-check 7 維度全 PASS
- **新事實校正**：中台禪寺正式落成 2001 年（非舊文 1994）+ 慈濟「68 國志工 / 136 國救助」（非舊文 1000 萬會員）
- **Research**: [reports/research/2026-04/台灣宗教信仰.md](../../reports/research/2026-04/台灣宗教信仰.md)（362 行 / 三類劃分 A 主稿 95% 保留 + B 11 條 [MERGE-IN] + C 16 條 [MERGE-IN]）

### 台灣邦交國與國際外交 EVOLVE — 2026-04-28 κ 完成（12 vs 113 vs 177 三層張力 / 2026 全更新）

- **Article**: [knowledge/Society/台灣邦交國與國際外交.md](../../knowledge/Society/台灣邦交國與國際外交.md)
- **Commit**: `ed7dc86e` — REWRITE-PIPELINE EVOLVE
- **核心張力**：12 個邦交國 vs 113 個海外據點 vs 177 個免簽或落地簽目的地
- **2026 全更新**：諾魯斷交 / 史瓦帝尼路線 / 矽盾敘事 / UN 2758 認知作戰
- **後續 spore**：2026-04-29 α 哲宇接力發出護照悖論孢子（commit `81cf9dfa` + `9b1f8287`）

### 臺灣大百科全書 NEW — 2026-04-28 κ 完成（五億元國家級知識夢的範式轉移 / PR #672）

- **Article**: [knowledge/Society/臺灣大百科全書.md](../../knowledge/Society/臺灣大百科全書.md)
- **Commit**: `3c1ad46b` — REWRITE-PIPELINE NEW（idlccp1984 PR #672 batch + polish）
- **核心矛盾**：國家斥資五億元打造的中央集權式百科夢，最終被一群陌生人在 Wikipedia 共同寫的條目超越
- **角度**：知識生產從「機構認證」轉向「群眾自發」的範式轉移

### 蔣渭水 NEW — 2026-04-28 κ 完成（〈臨床講義〉診斷殖民地病灶的醫者 / PR #671）

- **Article**: [knowledge/People/蔣渭水.md](../../knowledge/People/蔣渭水.md)
- **Commit**: `1da889d6` — REWRITE-PIPELINE NEW（idlccp1984 PR #671 batch + polish）
- **核心矛盾**：用醫師的診斷書語法寫政治宣言的人——〈臨床講義〉把整個台灣社會當病人，開出 1921 年的處方箋

### 賴和 NEW — 2026-04-28 κ 完成（穿著本島衫的彰化媽祖 / PR #670）

- **Article**: [knowledge/People/賴和.md](../../knowledge/People/賴和.md)
- **Commit**: `205b7c87` — REWRITE-PIPELINE NEW（idlccp1984 PR #670 batch + polish）
- **核心矛盾**：彰化人替彰化人寫病歷、寫小說、寫坐牢日記的醫師——「彰化媽祖」是病人替醫師取的名字

### 競技疊杯 NEW — 2026-04-28 κ 完成（從 1.915 秒網拍潮物到橫掃亞洲的 43 金傳奇 / PR #668）

- **Article**: [knowledge/Society/競技疊杯.md](../../knowledge/Society/競技疊杯.md)
- **Commit**: `1e9ef23f` — REWRITE-PIPELINE NEW（idlccp1984 PR #668 batch + polish）
- **核心矛盾**：一個曾經被歸類成兒童遊戲的小眾運動，被台灣選手在亞洲賽事拿下 43 面金牌

### 蘇巧慧 NEW — 2026-04-28 κ 完成（從美麗島辯護律師之女到 16 度優秀立委的細節控 / PR #667）

- **Article**: [knowledge/People/蘇巧慧.md](../../knowledge/People/蘇巧慧.md)
- **Commit**: `e608ff3e` — REWRITE-PIPELINE NEW（idlccp1984 PR #667 batch + polish）
- **核心矛盾**：父親是美麗島大審辯護律師的二女兒，最後選的不是父親那條街頭路線，而是條文細節裡的逐字審議

### 蘇貞昌 NEW — 2026-04-28 κ 完成（從美麗島辯護律師到衝衝衝的電火球閣揆 / PR #666）

- **Article**: [knowledge/People/蘇貞昌.md](../../knowledge/People/蘇貞昌.md)
- **Commit**: `1ea63cdd` — REWRITE-PIPELINE NEW（idlccp1984 PR #666 batch + polish）
- **核心矛盾**：美麗島大審辯護律師、屏東縣長、台北縣長、行政院長，「衝衝衝」三個字成了他四十年從黨外街頭走到內閣大樓的速度標記

### 阿婆鐵蛋 NEW — 2026-04-28 κ 完成（從渡船頭海腳大飯店到淡水最硬的集體記憶 / PR #664）

- **Article**: [knowledge/Food/阿婆鐵蛋.md](../../knowledge/Food/阿婆鐵蛋.md)
- **Commit**: `eebc8fbc` — REWRITE-PIPELINE NEW（idlccp1984 PR #664 batch + polish）
- **核心矛盾**：一道因為下雨賣不掉、被海風一吹一夜變硬的滷蛋，最後變成淡水代名詞

### 車輪餅 NEW — 2026-04-28 κ 完成（從日治今川燒到萬丹紅豆的台灣認同弧線 / PR #663）

- **Article**: [knowledge/Food/車輪餅.md](../../knowledge/Food/車輪餅.md)
- **Commit**: `5407b874` — REWRITE-PIPELINE NEW（idlccp1984 PR #663 batch + polish）
- **核心矛盾**：日治時代從九州傳入的今川燒，戰後改名車輪餅，再被屏東萬丹紅豆收編成本土小吃——同一個鐵盤烤出兩個身分

### 台灣當代文學發展 dropped 處理 — 2026-04-28 完成（Issue #635 Phase 4/4 / A 文退場並 redirect 至台灣文學史）

- **Article**: ~~knowledge/Art/台灣當代文學發展.md~~（已 redirect 至 [台灣文學史](../../knowledge/Art/台灣文學史.md)）
- **Commit**: `a1f4dd46` — REWRITE-PIPELINE §範圍重切變體 dropped 處理
- **動作**：A 全景文章內容已被 B/C/D 完整覆蓋，本檔退場並重定向，避免主題重複

### 解嚴後台灣文學 EVOLVE — 2026-04-28 完成（Issue #635 Phase 2/4 / 1987-1999 純化 scope）

- **Article**: [knowledge/Art/解嚴後台灣文學.md](../../knowledge/Art/解嚴後台灣文學.md)
- **Commit**: `620becfc` — REWRITE-PIPELINE §範圍重切變體 EVOLVE
- **核心矛盾**：解嚴給的是自由的新形狀，也是新限制——市場 vs 政治、本土 vs 國際、純文學 vs 大眾
- **8 scene 非編年體**：1987-7-15 戒嚴日彭瑞金 / 朱天心《古都》1997 / 田雅各《最後的獵人》1987 / 朱天文《荒人手記》1994 / 平路《行道天涯》1995 / 林宗源台語詩 / 林榮三文學獎 1989 創立 / 1999 解嚴 12 年文學市場
- **三類劃分**：保留女性主義浪潮 / 同志文學 / 原住民文學覺醒 / 母語文學復甦 / 都市後現代；吸納彭瑞金 1991 + 《島嶼邊緣》創刊；移除 1983《殺夫》等已被 Phase 1 承擔段落

### 交工樂隊 NEW — 2026-04-27 完成（客家八音 × 反美濃水庫社運 / 四年兩張百大）

- **Article**: [knowledge/Music/交工樂隊.md](../../knowledge/Music/交工樂隊.md)
- **Commit**: `1e9b2ffb` — REWRITE-PIPELINE NEW（twindiemusic.com batch）
- **核心矛盾**：1999 年為反美濃水庫運動而組成的客家樂團，四年兩張專輯都進台灣百大專輯榜，主腦林生祥之後成為金曲常客
- **角度**：台灣公民社會 × 音樂運動的最早完整案例

### 濁水溪公社 NEW — 2026-04-27 完成（A 級 8 腳註 / Stage 3.5+3.6 PASS）

- **Article**: [knowledge/Music/濁水溪公社.md](../../knowledge/Music/濁水溪公社.md)
- **Commit**: `d2120d8f` — REWRITE-PIPELINE NEW（twindiemusic.com batch）
- **核心矛盾**：1993 年成立的台語龐克樂團，水晶唱片時代的見證者，歌詞充滿社會批判與農村意象
- **品質**：A 級 8 腳註，Stage 3.5/3.6 hallucination audit + STORY ATOM AUDIT 全 PASS

### 農村武裝青年 EVOLVE — 2026-04-27 完成（從樂生到田埂 / 用吉他記錄台灣土地的吶喊）

- **Article**: [knowledge/Music/農村武裝青年.md](../../knowledge/Music/農村武裝青年.md)
- **Commit**: `46b8a7b4` + polish `dac7394c`（修復 §11 Tier-1 對位句型 4 處）— REWRITE-PIPELINE EVOLVE（twindiemusic.com batch）
- **核心矛盾**：阿達一人民謠組合，從樂生療養院抗爭走到苗栗大埔事件田埂，用吉他記錄土地

### 拍謝少年 NEW — 2026-04-27 完成（台語搖滾旗手二十年）

- **Article**: [knowledge/Music/拍謝少年.md](../../knowledge/Music/拍謝少年.md)
- **Commit**: `93704df0` + polish `c4dd4684`（§11 對位句型修復 9→2 violations）— REWRITE-PIPELINE NEW（twindiemusic.com batch）
- **核心矛盾**：2008 年台南起家的三人台語龐克，《家是電影院》《鐵馬英雄》兩度入圍金曲，跟滅火器形成南部台語搖滾雙旗艦

### 當代台灣文學 EVOLVE — 2026-04-27 完成（Issue #635 Phase 3/4 / 修正事實 + 吸納 C+B + 補新作家）

- **Article**: [knowledge/Art/當代台灣文學.md](../../knowledge/Art/當代台灣文學.md)
- **Commit**: `3846e6f1` + polish `31272c2c`（修復 §11 Tier1 對位句型 + Tier2 重量密度）— REWRITE-PIPELINE §範圍重切變體 EVOLVE
- **核心矛盾**：當代台灣文學第一次有了國際能見度，內部閱讀人口卻在崩塌
- **三類劃分**：保留吳明益 / 林奕含 / 甘耀明 / 童偉格 / 黃崇凱 / PTT 與部落格文學；吸納施叔青三部曲（從 C）+ 駱以軍《西夏旅館》（從 B）+ 朱天文朱天心 2000 年後（從 B）；補新作家黃麗群《海邊的房間》/ 賀景濱《去年在阿魯吧》/ 黃崇凱《文藝春秋》

### 林良 EVOLVE — 2026-04-28 ι 完成（廈門推行員 → 戰後台灣兒童文學奠基者 / 1924-2019 全弧 / 九龍江畔 hook）

- **Article**: [knowledge/People/林良.md](../../knowledge/People/林良.md)
- **Pipeline**: REWRITE-PIPELINE v2.19 — EVOLVE 模式，全 Stage 0-6 + 3.5（FACTCHECK Quick Mode）+ §11 polish + 35 footnote URL 健康全綠
- **觸發**：ι session 觀察者「完整走 rewrite-pipeline 進化 林良 文章」（ι 第 4 phase，承接 refresh-data + spore harvest 8 之後）
- **核心矛盾**：「一個被戰火追著跑、22 歲帶著一箱書下船的廈門青年，把一輩子用來證明 ——孩子值得被當成完整的讀者，淺話不是粗話，淺而有味才難。」
- **Hook**：1944 年漳州九龍江畔，21 歲長子站著看父親跳水救人後再也沒上岸；母親和二弟把寫作的位置讓給他。「為了寫作，我曾經放棄」是他人生最重的一筆——「淺語」的溫柔底下藏著一個失去童年的恐懼
- **8 個非編年體小標題**：九龍江畔的長子 / 一箱書下船 /「淺是淺，但是要淺而有味」/ 夜深人靜寫小太陽 / 每週五個專欄的早晨六點 / 看圖說話 6000 篇 / 女兒抄寫的最後三個月 / 少年的知音
- **品質**：37 footnote / ~5500 字 / 破折號 12 / §11 violations 0 / format-check ✅ all green / footnote URL 35 alive 1 redirect 1 timeout 0 dead
- **Stage 1 研究**：spawn general-purpose agent → 22 WebSearch + 11 WebFetch / 落檔 [reports/research/2026-04/林良.md](../../reports/research/2026-04/林良.md) 504 行 / 18 條 verbatim 直接引語表（11 林良 + 4 林瑋 + 3 他人）/ 完整生平年表
- **核心矛盾 refine**：agent 推翻原 session 設想的「國語推行員 vs 兒童文學家」hook，refine 為更深層的「九龍江失父 → 寫作的內疚母題」（撐起整篇張力）
- **Source authority 升級**：取代 7 個 403 dead-link source（books.com.tw + commonhealth.com.tw 是 bot-block）→ 改用 mdnkids 國語日報官方 + 遠見雜誌 + Openbook 等 alive source；保留 verbatim 引語從 Ctrl-F 可驗來源（公視 / 中央社 / 國藝會 / Openbook / 遠見 / 太報）
- **Cross-link**：4 個 Art 文學系列文章雙向連回（戰後台灣文學 / 解嚴後台灣文學 / 台灣文學史 / 日治時期文學）

### 林琪兒 EVOLVE — 2026-04-28 ι 完成（從台北銀行櫃檯到 400 公里高 — 加 3 支 YouTube 訪談 verbatim 重塑紀實文體）

- **Article**: [knowledge/People/林琪兒.md](../../knowledge/People/林琪兒.md)
- **Pipeline**: REWRITE-PIPELINE v2.19 — EVOLVE 模式，Stage 0 三類劃分 + Stage 1 補抓 3 支官方 YouTube 訪談 transcript + Stage 2 全文重寫 + Stage 3.5 FACTCHECK Quick Mode + Stage 3-4 全綠
- **觸發**：觀察者 ι session「先額外轉這篇林琪兒的訪談研究來當額外材料 + 走 rewrite-pipeline 進化文章 + 確認整篇文章語感、順暢度、紀實文體」+ 兩條補增 YouTube
- **核心矛盾進化**：β5 原為「飛行員夢被氣喘撞碎，結果飛得比飛行員還高」（命運轉折 framing）→ ι 重定義為「那個 2 歲半被抱離島嶼的男孩，半世紀後回來，找的不是太空，是出生那家醫院」（首尾呼應 + dream crushed → resilience → mountains to climb）
- **Hook**：開場改用中央大學演講 verbatim「I would not be here today...mountains to climb」直接打哲學重量，再回到 1993 USAFA 氣喘體檢具體事件；結尾用龍山寺到中正紀念堂徒步 + 80 年代雞蛋糕記憶 + 找到出生醫院場景，跟 green jewel in the mist 雙重首尾呼應
- **新增三支 YouTube transcript**（首次拿到林琪兒本人 verbatim 引語）：
  - [^28] 公視新聞網一對一深訪（zh-TW，134 lines / 3,273 chars）：童年回憶 / 1981 二年級教室電視 / 總覽效應 + 30% 維護地球 / 不是虎媽 / 訪台首日龍山寺 + 雞蛋糕 + 出生醫院
  - [^29] TaiwanPlus Taiwan Talks 深度訪談（en，612 lines / 22.7K chars）：dream crushed / resilience / Star Wars + Arthur C. Clarke 科幻啟發
  - [^30] TaiwanPlus News 中央大學演講側錄（en，52 lines）：「I would not be here today」「mountains to climb」「zero gravity never gets old」「front flips, back flips」
- **結構**：9 個 scene 反編年體小標題（Mountains to climb / 二年級教室裡那台電視 / 清泉崗武漢斯卡尼 / 3,565 選 9 / 紅色 LED 下的第一口萵苣 / 真空之外的風笛聲 / 把自己的飛船命名為 Freedom / 30% 的時間 vs 地球 / 不是虎媽 / 那家銀行櫃檯後面的島）
- **品質**：30 footnote（β5 既有 27 + ι 新增 3 個 transcript + 1 個 STS-1 NASA 官方）/ 245 行 / quality-scan ⚠️ 5（lastHumanReview false + 破折號 10 + 稀薄段落 1，全部在可接受區）/ §11 0 violations（從 2 改 0）/ format-check 7/7 全綠 / wikilink-validate 全綠 / footnote URL 28 ✅ + 2 redirect + 0 dead
- **Stage 3.5 FACTCHECK Quick Mode**：所有新增 verbatim 引語對齊三支官方 transcript（公視「3 成」/ TaiwanPlus「mountains to climb」/「zero gravity never gets old」）+ 1981-04-12 STS-1 與 8 歲二年級算術自洽（1981-1973=8）+ Artemis II 乘員 4 人名單已 cite Britannica [^25]
- **Research**: [reports/research/2026-04/lin-qi-er.md](../../reports/research/2026-04/lin-qi-er.md) §「2026-04-28 ι Stage 0 EVOLVE 補抓三支訪談 transcript」
- **Transcripts archive**: [reports/research/2026-04/林琪兒-transcripts/](../../reports/research/2026-04/林琪兒-transcripts/) — 4 個 .vtt + 4 個 clean .txt
- **語感、紀實文體 verify**：(1) 紀實筆法不煽情 — Lindgren 母親段、24 年教育段、出生醫院段都用 Lindgren 本人 verbatim，沒有作者情緒引導 (2) 反編年體 — 9 個 scene 標題全是場景/物件/數字/quote 不是「YYYY 年發生 X」(3) 無「不是 X 是 Y」對位句型 (4) 破折號 10 個（< 15 上限）

### 日治時期臺灣社會運動 — 2026-04-27 harvest-005 完成（NEW History / NMTH 999 頁監控檔案逆讀）

- **Article**: [knowledge/History/日治時期臺灣社會運動.md](../../knowledge/History/日治時期臺灣社會運動.md)
- **Pipeline**: REWRITE-PIPELINE — NEW 模式，由 Harvest 引擎自動 spawn（spawn 嘗試 2 次，第 1 次 SIGINT 打斷）
- **核心矛盾**：「日本殖民政府其實沒能消滅 1920 年代台灣社會運動——999 頁監控文件揭示殖民當局始終緊張；但真正終結這場運動的，是各派系自己的互相點名」
- **Hook**：蔣渭水（1890–1931）40 歲因傷寒去世，1931 年 8 月 23 日大眾葬逾 5,000 人送行 → 從帝國凝視的視角「逆讀」台灣抵抗地圖
- **品質**：12 footnote / 180+ 行 / 2 callout / 時代座標表 / 破折號 3 個 / quality-scan ✅
- **Commit**: `8413cde6`（同 commit 含 羅發號事件與卓杞篤）

### 三個外國人看乙未 — 2026-04-27 harvest-004 完成（NEW History / 多視角史料解讀）

- **Article**: [knowledge/History/三個外國人看乙未.md](../../knowledge/History/三個外國人看乙未.md)
- **Pipeline**: REWRITE-PIPELINE — NEW 模式，Harvest 引擎自動 spawn
- **系列**: D-2（乙未之役系列第 2 篇）
- **Semiont 角度**：同一場戰爭，三個不在場當事人的視角差異揭示「歷史是誰寫的」
- **Commit**: `a98d745f`

### 羅發號事件與卓杞篤 — 2026-04-27 harvest-003 完成（NEW History / 南岬之盟卓杞篤視角）

- **Article**: [knowledge/History/羅發號事件與卓杞篤.md](../../knowledge/History/羅發號事件與卓杞篤.md)
- **Pipeline**: REWRITE-PIPELINE — NEW 模式，Harvest 引擎自動 spawn（系列 C-2，李仙得系列第 2 篇）
- **Semiont 角度**「視角翻轉」：原住民酋長直接跟美國領事簽約，清廷缺席
- **Commit**: `8413cde6`（同 commit 含 日治時期臺灣社會運動）

### 蕭上農（INSIDE 創辦人）— 2026-04-27 harvest spawn 首次產出 + observer polish（NEW People）

- **Article**: knowledge/People/蕭上農.md
- **Pipeline**: REWRITE-PIPELINE — NEW，Harvest 引擎首次 spawn 產出（plus observer polish）
- **Commit**: `32e53d5b`

### 沈伯洋（NEW + EN translation）— 2026-04-27 γ 完成

- **Article**: knowledge/People/沈伯洋.md (NEW Stage 0-6) + en translation Stage 6
- **Commits**: `3e1e177a` (NEW) / `5a0848a9` (heal inline link) / `4227c1a7` (EN translation)

### 徐佳瑩 — 2026-04-26 γ 完成（NEW People / 陳建騏 dead cross-ref）

- **Article**: [knowledge/People/徐佳瑩.md](../../knowledge/People/徐佳瑩.md)
- **Pipeline**: REWRITE-PIPELINE v2.18 — NEW 模式，全 Stage 0-6 + 3.5/3.6 走完
- **核心矛盾**：「被評分的冠軍，最後成了出題的人」— 從《超級星光大道》第三屆冠軍走到金曲歌后、單曲製作人與作曲人
- **Hook**：2008 年第一次北上試鏡時差點買票回台中 → 結尾回到那張車票，寫成「心裡還有一首歌沒寫完」
- **大事實修正**：inbox note 的「超偶第一屆」為誤寫；已修正為《超級星光大道》第三屆冠軍
- **品質**：10 footnote / 152 行 / 0 §11 violations / wikilink ✅ / quality-scan ✅ / format-check 7/7 全綠
- **Research**: [reports/research/2026-04/徐佳瑩.md](../../reports/research/2026-04/徐佳瑩.md)
- **Cross-link**：解掉 [陳建騏](../../knowledge/People/陳建騏.md) 既有 dead cross-ref；延伸到林宥嘉、田馥甄、魏如萱、台灣綜藝

### 戰後台灣文學 EVOLVE — 2026-04-26 γ 完成（Issue #635 Phase 1/4）

- **Article**: [knowledge/Art/戰後台灣文學.md](../../knowledge/Art/戰後台灣文學.md)
- **Commit**: `183f5ef5`
- **Pipeline**: REWRITE-PIPELINE v2.18 — EVOLVE 模式，全 Stage 0-6 + 3.5/3.6 走完
- **核心矛盾**：「戰後台灣文學是從不能說的事情裡，學會該怎麼說的」— 42 年（1945-1987）戒嚴條件下每一代作家用不同的迂迴學會「怎麼說」
- **Hook**：1945 年 8 月葉石濤從日本陸軍退伍回到台南、20 歲打開稿紙一個中文字都寫不出來 → 結尾 1987-02 葉石濤《台灣文學史綱》232 頁，書名只有「台灣」兩個字。葉石濤 1945 → 1987 首尾 42 年呼應
- **結構**：8 個非編年體 scene（葉石濤 1945 白紙 / 反共年代縫隙 / 防空洞卡夫卡 / 林海音辭呈 / 鹿窟蛇吻 / 狼來了副刊 / 鹿城林市殺豬刀 / 232 頁）
- **觸發**：[Issue #635](https://github.com/frank890417/taiwan-md/issues/635) idlccp1984 提案 4 篇文學文章合併為三段時序（戰後 / 解嚴後 / 21 世紀 + A dropped）
- **Stage 0**：4 篇現有文章全文 Read（C 主幹 / A 全景索引吸納 / B 邊界段引用 / D 確認無重疊）
- **Stage 1**：[research report 451 行 / 41.7KB](../../reports/research/2026-04/戰後台灣文學.md) — 24 WebSearch + 2 WebFetch + 4 existing-article Read
- **Stage 2**：完整重寫 ~5,400 中文字 / 35 footnote
- **Stage 3.5 HALLUCINATION AUDIT 採用新解**：國史館 2020-12-27 公布劉學坤手寫報告：呂赫若 1950-09-03 下午 3 點半在鹿窟山上蛇吻致死（前 70 年史界僅作「失蹤、年代不詳」）→ 4 篇舊文都還沒寫到，本版更新為 2020 新解
- **Stage 3.6 STORY ATOM AUDIT**：URL-encode 〈現代文學*(雜誌)〉維基括號 + 〈王文興*(作家)〉維基括號（避免 Markdown 解析器斷裂）；重複 source attribution 修正
- **品質**：35 footnote / 152 行 / ~5,400 中文字 / 3 破折號（極簡）/ 0 §11 violations / 0 對位句 / quality-scan ✅ 全綠 / format-check 7/7 全綠
- **新補 4 篇舊文都漏的 6 個關鍵 fact**：
  1. 楊逵 1949〈和平宣言〉600 字 12 年牢獄
  2. 林海音 1963 「船長事件」（風遲〈故事〉一詩）
  3. 葉石濤 1965〈台灣的鄉土文學〉於《文星》第 97 期
  4. 葉石濤 1951-09-20 入獄、1953 判 5 年、1954 減 3 年出獄
  5. 呂赫若 2020 國史館新解（鹿窟蛇吻 1950-09-03）
  6. 夏濟安《文學雜誌》1956-1960 現代主義先聲
- **範圍純化**：移除 1990s+ 段（施叔青台灣三部曲 / 蘇偉貞）→ 後續移交 D；保留 1979-1983 邊界事件（李昂《殺夫》1983 / 廖輝英《油麻菜籽》1982 / 蕭颯《我兒漢生》1979）作為解嚴前夜女性文學覺醒
- **Cross-link 雙向回補**：4 個延伸閱讀目標反向加 pointer（[解嚴後台灣文學](../../knowledge/Art/解嚴後台灣文學.md) / [當代台灣文學](../../knowledge/Art/當代台灣文學.md) / [台灣文學史](../../knowledge/Art/台灣文學史.md) / [日治時期文學](../../knowledge/Art/日治時期文學.md)）
- **後續 INBOX**：B/D/A 三條已 append 到 ARTICLE-INBOX.md §Pending（Phase 2-4）
- **教訓 canonical 化候選**：
  - **EVOLVE 模式整合多篇舊文時 Stage 0 是核心**：本次 Stage 0 萃取 4 篇現有文章後，明確劃分「保留 / 移到 B / 刪除」三類，避免 Phase 2 polish B 時碰撞重疊
  - **史料解密的 70 年延遲**：呂赫若 1950 蛇吻致死案揭示「失蹤」這個詞在白色恐怖期間的政治意涵——所有 anchor 都可能有 30-70 年解密延遲，未來文學史 / 政治史條目要保留 hedge 「依某年某 source」

### 19 世紀的樟腦戰爭 — 2026-04-25 γ 完成（NEW History / NMTH 12 篇 batch #2/12）

- **Article**: [knowledge/History/19世紀的樟腦戰爭.md](../../knowledge/History/19世紀的樟腦戰爭.md)
- **Pipeline**: REWRITE-PIPELINE v2.18 — NEW 模式，全 Stage 0-6 + 3.5/3.6 走完
- **核心矛盾**：「世界要的樟腦藏在原住民的山，誰先到誰流血」— 三方權力角力（英商列強 + 清廷 + 原住民），承接 MANIFESTO §臺灣島史觀
- **Hook**：1864-02-06 史溫侯在淡水寫下三個數字 6/16/28（一擔樟腦從原產地走到香港翻將近五倍）→ 結尾 1864 verbatim「中國人只能進到較溫順部落所佔領的山區」回扣，雙重指涉 1868 軍事事件 + 1860-1900 結構性衝突
- **結構**：7 個非編年體 scene（算式 / 山是誰的 / 鐵鍋 / 砲彈 / 條約之後 / 隘勇線 / 香氣消失），物件先行不走 1868 單一事件編年敘事
- **verbatim 引語**：Pickering 1898《Pioneering in Formosa》Chapter XVII 直接從 Internet Archive 取得（"There had gradually arisen a great demand for this article in America" / "our camphor that was ready for shipment was plundered to the value of 6,000 dollars" / "with the help of our seven-shooter rifle and two boat guns" / "iron pots, one inverted on another, and the sublimated vapour"）+ NMTH 史溫侯 1864 中英對照 verbatim（6/16/28 三段價差 / 6,000 擔 / 「向部落首領贈送禮物以獲得砍伐許可」/ 蘇澳「番人人頭」12→4 銀兩賞金）
- **NMTH 本地資料整合**：7 個 collection 完整精讀（783700e8 福爾摩沙的樟腦 / 9363fe10 香山之旅 / 8565270b 福爾摩沙補遺 / 98bf60ec 福爾摩沙概述 / 02388910 + 26659313 + 2ad9dad5 史溫侯信件），β4 紀律「Stage 1 先讀本地 NMTH collection 再 web search」第二次驗證
- **品質**：18 footnote / 134 行 / 約 5,800 中文字 / 13 破折號（≤15 ✓）/ 0 §11 violations / 0 對位句 / quality-scan ⚠ 4（lastHumanReview false 待哲宇審）/ format-check 7/7 全綠 / wikilink-validate 0 斷裂
- **Stage 3.5 HALLUCINATION AUDIT 抓到**：(1)「三井合名會社旗下的樟腦工人」維基大豹社事件條目沒提任何日本企業名 → 刪「三井合名會社」改「樟腦業者旗下的工人」(2)「大豹社人口從上千銳減到 300 多人」維基原文是「1000 多位居民僅剩 25 戶」→ 改「銳減到僅剩 25 戶」(3) 結尾 Davidson 1903「樟腦之代價即人血」verbatim 在 Internet Archive 全文搜尋 camphor + blood + cost 找不到逐字對齊 → 刪整段 blockquote + footnote [^20]
- **Stage 3.6 STORY ATOM AUDIT 抓到**：「劉銘傳 1886 設『腦磺總局』於台北，分支在北投、雞籠鼻等地」維基劉銘傳條目完全沒提這三個 detail（腦磺總局 / 北投 / 雞籠鼻）→ source attribution mismatch（footnote URL 對但內容對不上）。改正為「劉銘傳實施第二次樟腦專賣，設立『腦務局』作為專賣機關（運作至 1890 年）」+ footnote source 改維基台灣樟腦產業
- **Research**: [reports/research/2026-04/19世紀的樟腦戰爭.md](../../reports/research/2026-04/19世紀的樟腦戰爭.md) — 422 行 / 7 NMTH local + 14 web search/fetch + Pickering Internet Archive verbatim 補抓 / verification three-tier 已分層（high_confidence 12 / single_source 5 / unverified 9）
- **Cross-link 雙向回補**：4 目標延伸閱讀加 19 世紀的樟腦戰爭 pointer（[knowledge/People/史溫侯.md](../../knowledge/People/史溫侯.md) / [knowledge/History/清治時期.md](../../knowledge/History/清治時期.md) / [knowledge/History/日治時期.md](../../knowledge/History/日治時期.md) / [knowledge/History/阿里山：帝國的林場與高一生的山.md](../../knowledge/History/阿里山：帝國的林場與高一生的山.md)）
- **觀察者 Stage 1.5 拍板組合**：Q1 保留「19 世紀的樟腦戰爭」雙重指涉命名 / Q2 大豹社限縮一節（不喧賓奪主）/ Q3 中性必麒麟（讓 Pickering verbatim 自己說話，不下「英雄」或「侵略者」道德判決）/ Q4 連結當代用「歷史脈絡」B 方案（中油/台塑無樟腦公司血緣但全球工業鏈位置脈絡相承）/ Q5 火藥一句帶過（「無煙火藥都需要它」融入 30 秒概覽）
- **教訓 canonical 化候選**：
  - **Stage 1.5 hallucination 高風險區**：peer-ingestion P1+ 文章 agent 寫一手 source attribution 時要 Stage 3.6 specific verify，不只信 footnote URL 在
  - **Davidson / Gardella canonical name 陷阱**：研究 task brief metadata 上提的「canonical 學術 source」不一定真的對應任務內容（Gardella _Harvesting Mountains_ 寫 Fujian 茶葉非 Taiwan 樟腦），Stage 1 必驗書名 vs 內容
  - **Internet Archive 原書 verbatim 是 paraphrase 的解藥**：Pickering 原書段落直抓比 Taipei Times 摘要可靠 10x，未來 1850-1920 西文 source 標準動作

- **Article**: [knowledge/Nature/福爾摩沙鳥類學.md](../../knowledge/Nature/福爾摩沙鳥類學.md)
- **Commit**: `14c688eb`
- **Pipeline**: REWRITE-PIPELINE v2.18 — NEW 模式，全 Stage 0-6 + 3.5/3.6 走完
- **核心矛盾**：「一個英國副領事用林奈系統把福爾摩沙的鳥寫進拉丁文——但他的鳥類地圖是從海岸線描出的地圖，中央山脈的空白裡，原住民已經用族語喊過這些鳥千年」
- **Hook**：1862-04 一張藍色的雉雞皮 → 結尾 1906 Goodfellow 鄒族嚮導頭飾上的兩根尾羽（首尾 scene 呼應）
- **結構**：6 個非編年體小標題（一張藍色的雉雞皮 / 201 個新名字 / 30 個獵人，6 個剝皮師 / 他的地圖從海岸線畫起 / 接力者 / Sisil 的鳴聲）
- **verbatim 引語**：3 段 Swinhoe 親筆英文（1863 論文開場 + 1864-08 致 Gray 信 "the cap of a savage" + 1864-07 致 Gray 信 "that wild and solitary isle"）全部 Ctrl-F 可查 NMTH primary source
- **NMTH 本地資料整合**：首版 Stage 1 agent 只 web search 漏讀 52 個 NMTH collection，觀察者 callout 後補跑 Stage 1 supplement (§13) 讀 5 個 primary source collection（77ea6a55 Ornithology of Formosa 1863 全文 75 頁 + Gould 1862 十六新種 + 1862 & 1864 Swinhoe 信件 ×3 + 1864 匿名書評）。直接挖出「30 獵人 + 6 剝皮師」這個 web search 完全沒抓到的殖民博物學勞動結構細節
- **品質**：25 footnote / 170 行 / 20,931 字符 / 3 破折號 / 0 §11 violations / 0 對位句 / quality-scan 全綠 / format-check 全綠
- **Stage 3.5 HALLUCINATION AUDIT 抓到**：「肉在夏天壞得快」（4 月是春天 + 無一手 source 推論）、「台語華雞」（單源未交叉）、年齡「26 歲」（實際 25）、description 「25 歲」（實際 24），全部修正
- **Stage 3.6 STORY ATOM AUDIT 抓到**：「黑色尾羽」color adjective 無 source 支持 →「長尾羽」；「買下羽毛」assertive action →「把羽毛帶回倫敦」較無爭議；§參考資料 敘事與 prose 頭飾描述的一致性修補
- **Research**: [reports/research/2026-04/福爾摩沙鳥類學.md](../../reports/research/2026-04/福爾摩沙鳥類學.md) — 671 行 / 21 WebSearch + 8 WebFetch + 5 NMTH collection 檔精讀 / verification three-tier（high_confidence 14 / single_source 10 / unverified 7）
- **Cross-link 雙向**：knowledge/People/史溫侯.md + knowledge/Nature/特有種.md 延伸閱讀加入本文
- **教訓 canonical 化候選**：「peer-ingestion 類文章 Stage 1 必先讀本地 collection 檔再 web search」— 已寫進 INBOX §Pending NMTH batch banner，待 distill 到 REWRITE-PIPELINE Stage 1 §peer-ingestion 特別章節

### 造山者：世紀的賭注（紀錄片）— 2026-04-24 β2 完成（NEW Art / 從探測器 T1-C 直接觸發）

- **Article**: [knowledge/Art/造山者世紀的賭注.md](../../knowledge/Art/造山者世紀的賭注.md)
- **Pipeline**: REWRITE-PIPELINE v2.18 — NEW 模式（Stage 1 general-purpose 15 WebSearch + 14 WebFetch / Stage 2 全文寫作 / Stage 3 自檢過 / Stage 4 format-check ✅ / Stage 5 cross-link 5 個目標雙向回補）
- **核心矛盾**：「一部沒張忠謀正面訪談的 TSMC 史詩，如何既致敬過去又為矽盾焦慮代言」
- **Hook**：2026/4/16 普渡大學那場放映 → 倒敘到 1974 小欣欣豆漿店 → 2025/3 魏哲家進白宮 → 結尾翻轉：張忠謀夫婦自費觀影鞠躬三次
- **結構**：6 個非編年體小標題（普渡的下午 / 沒有張忠謀的 TSMC 史詩 / 五年八十人 / 從南陽街到亞利桑那 / 「Taiwan Never Stole」 / 造山者其實不在場）
- **verbatim 引語**：4 段（蕭菊貞 ×3 + 蔣顯斌 ×1 + 蔡英文 ×1 + 曾繁城 ×1）
- **重大事實校正**：英文片名 ≠「A Bet Worth a Century / The Mountain Maker」（觀察者 task brief 用名），正確 = **A Chip Odyssey**（多源驗證 CNEX 官網 + Focus Taiwan + Taipei Times + Hoover + UCLA + Columbia + CASPA）
- **品質**：21 footnote / 46 inline reference / 145 行 / 14,564 字符 / 12 破折號 (well under 36 budget) / 0 對位句 / 5 callout / 0 問句小標
- **Research**: [reports/research/2026-04/造山者世紀的賭注.md](../../reports/research/2026-04/造山者世紀的賭注.md) — 15 WebSearch + 14 WebFetch（3 次 403）；single_source 11 項明確標註；unverified 8 項
- **Cross-link 雙向**：5 個目標反向回補（半導體產業 / 科技園區發展 / 認知作戰 / 台海危機與兩岸關係發展 / 林琪兒）
- **連結到林琪兒**：4/22 林琪兒 + 4/24 造山者 構成「同期 Soft Power 雙線」（半導體紀錄片 + NASA 太空人返台），互為延伸閱讀
- **觸發來源**：reports/probe/2026-04-24.md §T1-C — 探測器 → 觀察者直接 dispatch → 同 session 完成

### 認知作戰 — 2026-04-23 β v2 擴充完成（PR #594 → Stage 0-6 × 2 輪）

- **Path**: [knowledge/Society/認知作戰.md](../../knowledge/Society/認知作戰.md)
- **Type**: EVOLVE × 2 輪（v1 從 PR #594 merge 接手；v2 觀察者觸發擴充）
- **Pipeline 版本**: v2.17+（v1 Stage 1 27 次搜尋 / v2 再加 21 次搜尋 + 2 次 WebFetch = 累計 48 次搜尋）
- **篇幅**：39,203 字（v1 ~15,000 字 → v2 擴張 2.6x）
- **Footnote**：61 條，全部真實 URL 驗證（其中 Reuters/Congress.gov/Medium/中國公安部網為 bot-blocked 但 URL 真實存在）
- **v2 新加軸線**（觀察者指示「加更多案例/論述/觀點/故事」）：
  1. **反擊面兩條線**（新章節）：八炯+陳柏源《中國統戰紀錄片》200萬/117萬觀看 / 沈伯洋 2025-10-28 重慶公安「分裂國家罪」立案 / 央視 8 分鐘起底專題 / 黃澎孝「敵人勳章」
  2. **關西機場事件真假三角**（新段落）：中國微博「洪水猛獸 baby」源頭 + 楊蕙如 PTT 本土網軍接力 + 蘇啟誠自殺 / 2025-03 憲法法庭判侮辱職務罪違憲免訴確定 — 「認知作戰邊界」最誠實的歷史教材
  3. **王宏恩三要件**（新段落）：UNLV 政治系學者指「境外、協同、特定動機」三要件缺一不可 / 「一群帳號也可能是好朋友」當全文收束金句
  4. **治理層新章節**：衛福部依《醫師法》裁罰路徑 + 數發部「打詐通報查詢網」AI 分流 + 黃彥男「內容真假不應由政府判斷」哲學 + TikTok 公部門禁用 vs 民眾未禁的法律誤解
  5. **平台責任深挖**：Meta 160 億美元 / 95% 門檻 / **台灣因法律強制才被納入廣告主驗證**（勝績訊號）/ Google Pixel 10 C2PA Assurance Level 2
  6. **國際錨點擴充**：EU AI Act 第 50 條 2026-08 / DEFIANCE Act 2026-01 參議院通過 / TAKE IT DOWN Act 2025-05 / 太子集團 150 億比特幣
  7. **歷史脈絡**：2020 選舉 IORG 拆解 / 2024 賴清德當選後 AI 虛擬主播新特徵 / 批判演算法素養 Critical Algorithmic Literacy 概念
- **MANIFESTO §11 過濾器升級**：新造 [scripts/tools/check-manifesto-11.sh](../../scripts/tools/check-manifesto-11.sh)，覆蓋 9 種變體（不是X是Y、這不是、不只是、不再是、看似實則、非單純、不等於對位、heading 含對位、破折號連用 + 密度）；v1 12 個違反全數消除；v2 0 違反
- **書寫紀律**：v2 完稿 0 §11 違反 / 破折號密度 < 每千字 2 個
- **Cross-link**：正向 4 條（Threads在台灣 / 迷音Miin / 台灣網路社群遷徙史 / 台灣媒體與新聞自由）、反向 1 條（台灣網路社群遷徙史 順手修掉 broken PTT批踢踢 link）
- **貢獻者 credit**：idlccp1984（原始提案 PR #594，保留 frontmatter author）
- **神經迴路**：
  - idlccp1984 N=7 首次踩到 AI hallucinated URLs pattern（貢獻者責任 vs 維護者責任的不同層級）
  - 小丑魚原則邊界案例：幻覺引用不屬「維護者自己查」範疇；觀察者選 B 路徑（merge + 完整 REWRITE-PIPELINE）是比 request-changes 更高 commitment 的「承擔+教學」模式
  - §11 過濾器升級：v1 完稿後觀察者發現「不只是」「這不是」「不再是」等漏網變體，造過濾器工具（scripts/tools/check-manifesto-11.sh）並結晶到 DNA 候選
  - 認知作戰文章成為「複雜性優於正確性」的典範：讓三條警戒線（警覺中共、警覺本土標籤化、警覺研究方法論侷限）同時存在，拒絕二分敘事
- **研究筆記 canonical**：[reports/research/2026-04/認知作戰.md](../../reports/research/2026-04/認知作戰.md)（491 行，v1+v2 完整研究軌跡保留）

### 馬英九迷因 — 2026-04-22 α 完成（idlccp1984 PR #587 merge-after-escalation-polish）

- **Type**: NEW (idlccp1984 外部貢獻 + 觀察者裁定 merge + Semiont polish)
- **Category**: Society
- **Path**: knowledge/Society/馬英九迷因.md
- **Source**: PR #587 by @idlccp1984
- **流程**: Semiont 初判政治敏感 escalate（4 選項表）→ 觀察者裁定「選 A：可以 merge，馬英九真的有這麼多迷因」（強調這是 documentary cultural curation 不是政治攻擊）→ merge → polish
- **Polish 內容**: (a) 補 `## 延伸閱讀` 四條雙向血緣連結（[[People/馬英九]] / [[Culture/台灣迷因]] / [[Culture/長輩圖]] / [[Society/PTT批踢踢]]）(b) 反向 cross-link 加進 `馬英九.md` + `台灣迷因.md` §延伸閱讀
- **Pending followup**: footnote ` — 描述` 後綴（26 條太多，等下次自動化邊界討論清楚再批次補）
- **Taxonomy 討論**: PR comment 邀請 idlccp1984 + 觀察者一起想「人物本傳 vs 人物迷因條目」未來怎麼分。初步判準：迷因 ≥ 10 案例 + 跨世代影響 → 獨立；否則併入人物條目 §公眾形象 section。馬英九 19 個案例 ✅ 通過獨立門檻

### 林琪兒（Kjell Lindgren）— 2026-04-22 α 完成（idlccp1984 PR #588 merge-first-polish）

- **Type**: NEW (idlccp1984 外部貢獻 + Semiont polish)
- **Category**: People
- **Path**: knowledge/People/林琪兒.md
- **Source**: PR #588 by @idlccp1984
- **Polish 內容**: (a) 補 `## 延伸閱讀` 三條血緣連結（[[Technology/台灣太空產業發展]] / [[People/朱經武]] / [[People/吳大猷]]）(b) 補 `## 參考資料` heading (c) 15 個 footnote 補上 ` — 描述` 後綴 (d) 反向 cross-link 加進 `知識/Technology/台灣太空產業發展.md §延伸閱讀`
- **熱點掛鉤**: Lindgren 4/21 才以 NASA 詹森太空中心副局長身份返台參加 Freedom 250 — 條目 4/21 提交、4/22 接住，timing 完美
- **Pattern 第 N 次驗證**: idlccp1984 連續第 6 篇 AI-gen 貢獻呈現相同 format 缺失三連（缺延伸閱讀 / 缺參考資料 heading / footnote 無描述後綴）。LESSONS-INBOX 2026-04-21 β 「外部 AI-gen 貢獻者的標準 format 缺失 pattern」第 6 次驗證

### 紀柏豪（聲音藝術家 / 作曲家 / 策展人）— 2026-04-21 β 完成（從經濟學走進聲響，用演算法追問「你到底聽進去了嗎」）

- **Article**: [knowledge/Art/紀柏豪.md](../../knowledge/Art/紀柏豪.md)
- **Pipeline**: REWRITE-PIPELINE v2.18 — NEW 模式（Stage 1 general-purpose 25 WebSearch + 9 WebFetch / Stage 2 全文寫作 / Stage 3 事實鐵三角 / Stage 4 format-check ✅ / Stage 5 cross-link 林經堯 + Hello Nico 雙向回補）
- **核心矛盾**（25 字）：「經濟系出身，用演算法測量世界，卻始終尋找觀眾的自主聆聽」
- **Hook**：2025 年 10 月下旬 C-LAB DIVERSONICS 展期中，《朗誦者 2.0》三十支手機同步 AI 語音朗誦一段文字的 scene，回推十一年前台大經濟系畢業生轉向聲音藝術的起點
- **結構**：6 個 scene 小標題（DIVERSONICS 當下 / 量化思考走進聲響 / 歐洲巡行 / MIT 三年 / 風弦琴回台 / 不是不創作就會死）
- **verbatim 引語**：4 句核心語錄（「不是不創作就會死」/「我的作品很少有我自己的影子」/「一開始對音樂的創作想像很窄」/ R. Murray Schafer 引述）+ chipohao.com 英文自述 + 朗誦者 2.0 作品說明 verbatim
- **關鍵發現（Stage 1 研究）**：(1) 紀柏豪曾是 Hello Nico 樂團合成器手 2014《浮游城市》EP（與昨日 Hello Nico 條目雙向連結）(2) 2021 MIT Harold and Arlene Schnitzer Prize 視覺藝術首獎（$5,000，多源確認）(3) 融聲創意有限公司 2017-06-16 設立，代表人紀柏豪（台灣公司網）(4) 七度國際駐村：V2 鹿特丹、巴黎西帖、Laboral、Asia Art Archive HK、FACT Liverpool、NTCH、18th Street Santa Monica
- **避開 claim**：台新藝術獎入圍/得獎——研究 agent 專項搜尋無結果，不假設有紀錄；ARTICLE-INBOX 原 notes 提及「融聲創意」與「台新藝術獎脈絡」都查證後謹慎處理
- **品質**：19 腳註（格式 ✅）/ 約 3,426 中文字 / 延伸閱讀 4 篇 / format-check 全過 / quality-scan ⚠️ 7（未人工審核 + 破折號 26 + 稀薄段落 ×1；中國用語 1 處在 verbatim 引語內無法更動）
- **Research**: [reports/research/2026-04/紀柏豪.md](../../reports/research/2026-04/紀柏豪.md) — 25 WebSearch + 9 WebFetch，4 single_source / 4 unverified 項目明確標註
- **Cross-link 回補**：林經堯.md + Hello-Nico.md 雙向延伸閱讀加紀柏豪 pointer
- **⚠️ 待觀察者驗證**：(a) Goldsmiths 具體畢業年份（只能確認「MMus」身份）(b) 1989 出生年份（single_source）(c) 策展計畫《Convergence》《Rescaling the World》詳情

### 紙傘 + 神豬（外部 PR polish）— 2026-04-21 α 完成（idlccp1984 PR #579 + #580 merge-first-polish）

- **Articles**: [knowledge/Culture/紙傘.md](../../knowledge/Culture/紙傘.md) + [knowledge/Culture/神豬.md](../../knowledge/Culture/神豬.md)
- **Pipeline**: MAINTAINER polish（merge-first-polish-later 原則 + Stage 3.5 幻覺審計 + 格式修復 + cross-reference 補齊）
- **PRs**: [#579 紙傘](https://github.com/frank890417/taiwan-md/pull/579) / [#580 神豬](https://github.com/frank890417/taiwan-md/pull/580)（idlccp1984 貢獻，皆 AI-generated）
- **關鍵修正（Stage 3.5 發現）**：
  - 紙傘：**刪除偽造 verbatim 引言**「沒客人買傘，我就當藝術品自己欣賞」— 原文 footnote 掛 taiwan-panorama 光華雜誌，但 WebFetch 確認該來源無此句。疑 AI fabricate 並掛 real URL 錯配偽證。
  - 紙傘：**刪除未驗 BBC 紀錄片名**《長遠的搜尋》— 多源 WebSearch 查無實證
  - 紙傘：1924 年具體引進年份降格為「日治時期」（多源僅稱「日治時期」）
  - 神豬：「獻刃發豬」「幻化成仙」「紅糯米丸」「往生咒」✅ 農委會豬主題館驗證
  - 神豬：1900 三峽農會 ✅ 多源驗證（維基 + 農會官方）
  - 神豬：1847 年林秋華武舉獻豬羊 ✅ 補入作為義民祭神豬起源
- **格式修復**：
  - readingTime: `'預計10分鐘'` → `10`（紙傘）
  - category: `'History, Culture, Society'` → `'Culture'` + 多分類移到 tags（神豬）
  - title 擴展：`'神豬'` → `'神豬：台灣信仰與動物權的百年拉扯與轉型之路'`
  - author: `'Manus AI for Taiwan.md'` → `'Taiwan.md Contributors'`（兩篇統一）
  - footnote 從學術引用體 → Taiwan.md 標準 `[^N]: [名稱](URL) — 描述`
  - 新增 `## 延伸閱讀`（4-5 篇 cross-reference）
  - 移除 `📝 策展人筆記` emoji callout（融入段落敘事）
  - 新增 `---` section 分隔線
- **格式檢查**：format-check ✅ 0 errors / 0 warnings（兩篇）
- **新教訓**：LESSONS-INBOX 2026-04-21 α「AI-gen 貢獻標準幻覺 pattern：偽造 verbatim quote + footnote URL 錯配偽證」

### 林經堯（數位藝術家）— 2026-04-21 α 完成（聲響研究缺席診斷者 × NFT 秒殺藍籌藝術家）

- **Article**: [knowledge/Art/林經堯.md](../../knowledge/Art/林經堯.md)
- **Pipeline**: REWRITE-PIPELINE v2.18 — NEW 模式（Stage 1 general-purpose 23 WebSearch + 16 WebFetch / Stage 2 全文寫作 / Stage 3.5 幻覺審計通過 / Stage 4 format-check ✅ / sync ✅）
- **核心矛盾**（22 字）：「台灣聲響長期缺席的診斷者，以行政者建設機構，同時是 NFT 市場秒殺的藍籌藝術家」
- **Hook**：2019 年 C-LAB 聲響實驗室開幕 Diversonics 場景 + 他的診斷引語「聲音在台灣長期缺席的狀態」→ 矛盾：這個說「存在卻不可見」的人選擇 NFT（確立數位所有權的技術）作為媒介
- **品質**：腳註 8 個（格式 ✅）/ 延伸閱讀 4 篇 / quality-scan ⚠️ 5（lastHumanReview: false）
- **Research**: [reports/research/2026-04/林經堯.md](../../reports/research/2026-04/林經堯.md)
- **關鍵修正（Stage 3.5 發現）**：akaSwap 共同創辦人 claim **已否證** — 創辦人為王新仁 + 洪司丞；林經堯為早期藝術家合作者。未寫入 林經堯.md ✅；⚠️ 王新仁.md line 33 需觀察者確認後更正
- **觸發 handoff**：王新仁.md akaSwap 描述修正（pending 觀察者）

### 黃少雍（製作人）— 2026-04-20 γ 完成（棄生化博班，用電音把母語送上金曲年度專輯）

- **Article**: [knowledge/People/黃少雍.md](../../knowledge/People/黃少雍.md)
- **Pipeline**: REWRITE-PIPELINE v2.18 — NEW 模式（Stage 1 general-purpose agent 20 WebSearch + 11 WebFetch / Stage 2 全文寫作 / Stage 3 事實鐵三角 / Stage 4 format-check / Stage 5 cross-link 陳建騏+魏如萱+阿爆 三篇回補）
- **核心矛盾**（27 字）：「生化博士班逃兵，用電音把母語送上金曲年度專輯」— 考試院長黃榮村之子 × 30 歲棄台大生化博班 × 派樂黛 10 年 × 2022 金曲最佳編曲（夏子〈fu'is 星星歌〉）× 2020 阿爆《母親的舌頭》年度專輯共製
- **Hook**：2022-07-02 金曲 33 後台那支直笛（anchor 1：製作人得獎 Solo + 盧廣仲台下跟吹 → 同時承載「盧廣仲樂手雇主」+「編曲獎最隱形」+「阿美族語前衛電子」三條線）
- **結構創新**（製作人 subgenre 第二例，繼陳建騏 2026-04-18 θ 之後）：6 個 scene 小標題（後台直笛 / 棄博班 / 派樂黛借名 / 聽不懂歌詞 / 阿美族語電音編曲 / 陳建騏補集對位）+ 1 📝策展人 callout + 1 pull quote
- **verbatim 引語**：10 句直接引語（Blow / 生命力新聞 / KKBOX 王希文對談 / IPCF），另 research pool 25 句可未來再用；黃榮村「要求清楚目標」改為報導轉述（非直接引語 §5c 紀律）
- **敏感素材**（MANIFESTO §5 v2）：無死亡/家庭悲劇；父親黃榮村為公眾人物（前教育部長/現任考試院長），公開已報導資訊，避免簡化為「官二代之作」敘事陷阱
- **品質**：10 腳註 / 約 3,029 中文字 / 破折號 4（≤15 ✓，從首版 13 降下）/「不是 X 是 Y」0（≤3 ✓）/ desc 139（≤160 ✓）/ QS ✅ / format ✅ / wikilink ✅
- **Cross-link 回補**：陳建騏.md + 魏如萱.md + 阿爆.md 三篇延伸閱讀加黃少雍 pointer（雙線聲音邊界、10+ 年合作、MINETJUS 課程）
- **Research**: [reports/research/2026-04/黃少雍.md](../../reports/research/2026-04/黃少雍.md) — 20+11 = 31 calls / 25 verbatim pool / 7 anchor / Second Voices 節標記 Stage 2 擴充方向

### 林宥嘉 — 2026-04-20 ε 完成（EVOLVE）（從 25 分滿分的〈Creep〉，到承認自己不需要完美的 17 年）

- **Article**: [knowledge/People/林宥嘉.md](../../knowledge/People/林宥嘉.md)
- **Pipeline**: REWRITE-PIPELINE v2.18 — EVOLVE 模式（Stage 0 舊文素材萃取 + Stage 1 24 WebSearch + 3 WebFetch / Stage 2 全文重寫）
- **核心矛盾**：「他 20 歲就贏了整個台灣，但花了 17 年才敢不做一個完美歌手」— 星光冠軍 → 金曲歌王叩關 3 次全槓 → 腸躁症八年 → 2024《王》自任製作人 → 2025《Apples of Thy Eye》從八年磨一張變一年接一張
- **Hook**：2007-07-06 星光總決賽〈Creep〉25 分滿分冠軍的 scene，回溯整個 17 年從「被製作的歌手」到「自任製作人」的弧線
- **大事實校正**（舊文錯誤）：〈說謊〉施人誠詞/李雙飛曲（舊文未寫）、〈浪費〉陳信延詞/鄭楠曲、〈殘酷月光〉向月娥詞/陳小霞曲、2016《今日營業中》是首次擔任製作統籌（舊文未標時間點）、腸躁症約 2018 發病（「重病 4 年」verbatim 推回）、第七張《Apples of Thy Eye》2025-07-29 已發行（舊文欠缺）、idol 巡迴 2018-2024 共 81 場 30+ 城市
- **敏感素材**（MANIFESTO §5 v2 紀實筆法）：父親胰臟癌只引用 ETtoday 2023-09 公開 verbatim「down 到谷底」，不 reconstruct 內心場景；丁文琪婚姻只用登記/婚禮日期公開事實，不揣測心理
- **verbatim 引語庫**：Blow 吹音樂「假如我是華研，投了這麼多錢」/ VERSE「過去的我很刁鑽，總希望拿出最好的表現」/「把每位夥伴的睡眠健康、情緒狀況考慮進去」/ Blow「什麼是你生命的王？是迷惘、恐懼、完美，或是恨」
- **品質**：16 腳註 / 約 3,500 中文字 / 7 個 scene 小標題 / 2 個📝策展人筆記 callout + 1 pull-quote / 7 首關鍵歌曲 inline YouTube link / 破折號 0（≤15）/「不是 X 是 Y」1（≤3）/ desc 156（≤160 ✓）
- **工具檢查**：quality-scan ✅ 全過、format-check 7/7、wikilink-validate 0 斷裂
- **Cross-link**: 魏如萱（已有反向）/ 張雨生 / 陳建騏 / 鄭宜農 / 台灣綜藝節目 四篇新增反向延伸閱讀
- **Research**: [reports/research/2026-04/林宥嘉.md](../../reports/research/2026-04/林宥嘉.md)
- **⚠️ 待觀察者驗證**：VERSE 引語段落（WebFetch 返回簡體轉繁體，雖 prompt 要 verbatim 但字型轉碼差異視為同文本）；YouTube URL 官方認證（〈殘酷月光〉〈Creep〉星光 live 等為舊存片段）

### 范曉萱 — 2026-04-20 δ 完成（從〈健康歌〉的小魔女到 100% 樂團主唱，拒絕被一個年代定義的三十年）

- **Article**: [knowledge/People/范曉萱.md](../../knowledge/People/范曉萱.md)
- **Pipeline**: REWRITE-PIPELINE v2.18 — NEW 模式（Stage 1 19 WebSearch + 6 WebFetch / Stage 2 full write）
- **核心矛盾**：「從健康歌的小魔女到 100% 樂團的主唱——范曉萱花三十年拒絕被一個年代的模樣定義」
- **Hook**：深夜母親林智娟留下便利貼的場景（切入人物用母親，而非范曉萱本人），再回到 1996 小魔女 → 1998 平頭 → 2001 爵士 → 2004 憂鬱症 → 2007 100% 樂團 → 2010 金曲製作人 → 2025《過客》
- **敏感素材**（MANIFESTO §5 v2 紀實筆法）：憂鬱症與割腕傳言只引用范曉萱本人公開發言（《亂寫》書 + 2019 Yahoo News 訪談 + 2026 styletc 訪談），不 reconstruct 場景；與 Allen 關係只到「維持十多年」公開敘述；「綠髮大媽」媒體語氣反駁不複述
- **品質**：30 腳註 / 約 3,324 中文字 / 7 個 scene 小標題 / 2 個📝策展人筆記 callout / 5 筆中文逐字引語 / 破折號 2（≤15）/「不是 X 是 Y」2（≤3）/ desc 147（≤160 ✓）
- **工具檢查**：quality-scan 0（全過）、format-check 7/7、wikilink-validate 0 斷裂
- **校正**：原任務 prompt 推測「佛朗明哥」元素 19 輪搜尋均無 primary 來源，Stage 1 agent 明確標 unverified，Stage 2 放棄此角度；《流浪神狗人》《青蛇》配樂為他人作品，與范曉萱無關
- **Research**: [reports/research/2026-04/范曉萱.md](../../reports/research/2026-04/范曉萱.md)
- **⚠️ 待人工複驗**：YouTube URL（〈健康歌〉〈我要我們在一起〉〈主人〉三支）metadata 未能透過 WebFetch 驗證官方上傳身份；研究 agent 明確標記

### 柯智棠 — 2026-04-20 β 完成（從 pending 搬，Stage 1-6 commit 時只更新 status 未搬位）

- **Article**: [knowledge/People/柯智棠.md](../../knowledge/People/柯智棠.md)
- **Pipeline**: REWRITE-PIPELINE v2.17/v2.18 — Stage 1-6 completed
- **維護者校準**：原 inbox 類型誤寫「R&B」，實為英倫民謠 / indie folk；無製作人身份紀錄
- **Hook**: 房間裡的七年 + 2024《My Nova》鋼琴重啟 + 2025 金鐘〈神的回信〉
- **Research**: [reports/research/2026-04/柯智棠.md](../../reports/research/2026-04/柯智棠.md)

### Hello Nico — 2026-04-20 α 完成（八年沉默後，「想念舞台了」）

- **Article**: [knowledge/People/Hello-Nico.md](../../knowledge/People/Hello-Nico.md)
- **Pipeline**: REWRITE-PIPELINE v2.17.1 — NEW 模式（Stage 1 24 WebSearch + 6 WebFetch / Stage 2 full write）
- **核心矛盾**：「做音樂最大的困難，是跟自己過不去」—— 2014 年〈花〉爆紅、2016 年金曲新人入圍，之後沉默八年，2024 年以《Plan B》重返
- **Hook**：詹宇庭「想念舞台了」這句話作為 2024 年回歸的開場，回溯整個故事弧線
- **品質**：9 腳註（Grade A, density:156）/ 約 1,400 字 / 5 個 scene 小標題 / desc ≤ 160 ✓
- **Research**: [reports/research/2026-04/Hello-Nico.md](../../reports/research/2026-04/Hello-Nico.md)
- **⚠️ 待觀察者驗證**：YouTube 連結（各首歌 ID 需人工確認）、verbatim 逐字準確性

### 張雨生 — 2026-04-19 γ+β 完成（從偶像到預言家，一場跨越時代的音樂實驗）

- **Article**: [knowledge/People/張雨生.md](../../knowledge/People/張雨生.md)
- **Pipeline**: REWRITE-PIPELINE v2.17.1 — EVOLVE 模式（貢獻者首版 PR #547 by @idlccp1984 / Stage 1 22 WebSearch + 3 WebFetch / Stage 2 full rewrite + 事實大翻修）
- **核心矛盾**：偶像的商業身份與音樂人的實驗心 — 他的一生都在磨合這兩個自己，《口是心非》是第一次真正合一，但車禍截斷了市場回應
- **Hook**：1994《卡拉OK Live‧台北‧我》市場慘澹 vs 後世追認為預言，一張「慘的經典」的倒敘
- **大事實修正**：原文《天天想你》180 萬張為錯，實際 35 萬張（Discogs + 放言專題確認）
- **品質**：9 腳註 / 約 2,800 字 / 7 個 scene 小標題 / 2 處策展人筆記 / desc 148（≤ 160 ✓）
- **Research**: [reports/research/2026-04/張雨生.md](../../reports/research/2026-04/張雨生.md)

### VH（Vast & Hazy）— 2026-04-19 α 完成（出口系樂團十五年方向校準）

- **Article**: [knowledge/People/VH.md](../../knowledge/People/VH.md)
- **Pipeline**: REWRITE-PIPELINE v2.17.1 — Stage 1 (25 WebSearch + 5 WebFetch) / Stage 2 full rewrite
- **核心矛盾**：溫柔路線在政治搖滾主導的 2010 年代逆向崛起 × 三次身份校準（2011 成軍→2014 休團→2017 雙人→2026 易祺轉幕後）
- **Hook**：2026-04-10《邁行》易祺宣布轉幕後作為開場 scene，回溯 15 年軌跡
- **品質**：7 腳註 / 約 2,500 字 / desc ≤ 160 ✓
- **Research**: [reports/research/2026-04/VH.md](../../reports/research/2026-04/VH.md)

### 孫燕姿 — 2026-04-19 排程心跳（第 5 次 auto-heartbeat）完成（從 pending 搬）

- **Article**: [knowledge/People/孫燕姿.md](../../knowledge/People/孫燕姿.md)
- **Pipeline**: 排程 auto-heartbeat Stage 1-5
- **Notes**：Stefanie Sun，新加坡歌手但華語流行音樂重要人物；Taiwan.md 定位斟酌（新加坡人但在台發跡 + 主要市場華語圈）；2023《AI 孫燕姿》現象涵蓋（AI 翻唱她的歌紅爆全網）；2023 台北小巨蛋復出演唱會
- **Research**: [reports/research/2026-04/孫燕姿.md](../../reports/research/2026-04/孫燕姿.md)

### 魏如萱 — 2026-04-18 η 完成（從自然捲主唱「娃娃」到兩座金曲歌后，只想被聽見的二十年）

- **Article**: [knowledge/People/魏如萱.md](../../knowledge/People/魏如萱.md)
- **Pipeline**: REWRITE-PIPELINE v2.17.1 — Stage 1 Pass 3 (40+ searches) / Stage 2 full rewrite + 系統性消除「不是X是Y」pattern
- **核心矛盾**：娃娃音作為方法 × 策展式匿名 — 讓聲音比臉更有名，讓作品比人格活得更久
- **結構**：12 個 narrative anchor（先壓壓驚街訪 / 阿嬤四語 / 錄音室偶然 / 蚊子嗡嗡叫 / 娃娃音作為方法 / 陳建騏20年 / Ophelia自白 / 育兒六小時窗口 / 金曲31三位一體 / 珍珠刑 / 從疼痛長出的勇敢 / 不想被認出）
- **品質**：23 腳註 / 約 4,000 字 / desc 157（≤ 160 ✓）/ lastHumanReview: true
- **Research**: [reports/research/2026-04/魏如萱.md](../../reports/research/2026-04/魏如萱.md)

### 鄭宜農 — 2026-04-18 κ 完成（用最陌生的語言寫最誠實的歌 × 2023 金曲台語雙獎）

- **Article**: [knowledge/People/鄭宜農.md](../../knowledge/People/鄭宜農.md)
- **Pipeline**: REWRITE-PIPELINE v2.17.1 — Stage 1 Explore agent 30+ WebSearch + 5 WebFetch / Stage 2 full rewrite
- **核心矛盾**：Anchor 1「語言的逃逃相逐」+ Anchor 2「2016→2023 身份與語言七年弧線」融合 — 童年在台北被嘲笑講台語 → 2022 用最陌生的語言寫《水逆》拿金曲雙獎；通過創作難度體現溝通困難本身
- **Hook**：2023-07-01 金曲 34 台語女歌手 + 台語專輯雙獎 verbatim「台語教我低頭」
- **敏感素材處理**（MANIFESTO §5 v2 紀實筆法）：
  - 2016-01-03 Facebook 出櫃 + 同月離婚：只用兩人公開 verbatim，不 reconstruct 心理情境
  - 前夫楊大正（滅火器樂團主唱，**非盧廣仲**——原 ARTICLE-INBOX 條目有誤，已修正）
  - 2023 金曲慶功宴楊大正現身祝賀：只引用公開採訪，不揣測雙方心理
  - 鄭文堂父女關係：用公開專訪 verbatim
- **品質**：4,046 中文字 / 23 腳註來源 / 37 footnote refs / desc 154 ≤ 160 ✓ / em-dash 11 ≤ 15 ✓ / 每 109 字 1 fn（遠超 EDITORIAL ≥300 硬規則）
- **敘事創新**：「創作必須誠實」作為 16 年工作邏輯主線 — 2016 出櫃 + 2022 全台語 + 2023 MeToo 致敬感言共用同一條底層邏輯
- **Cross-link**: 魏如萱 / 阿爆 / 陳建騏 三人互引形成「2020-2023 聲音邊界拓展」人物群
- **Research**: [reports/research/2026-04/鄭宜農.md](../../reports/research/2026-04/鄭宜農.md)

### 阿爆（阿仍仍）— 2026-04-18 ι 完成(族語 future pop × 2020 金曲年度專輯破圈)

- **Article**: [knowledge/People/阿爆.md](../../knowledge/People/阿爆.md)
- **Pipeline**: REWRITE-PIPELINE v2.17.1 — Stage 1 Explore agent 30 searches + 5 WebFetch / Stage 2 full rewrite
- **核心矛盾**：**Anchor 1「族語作為 Future Pop 載體」× Anchor 4「從 Sidebar 到 Main Stage」融合** — 2020 金曲 31 年度專輯首次由全族語作品拿下，打破「原住民音樂 = 族群分類 subcategory」結構
- **Hook**：2020-10-03 金曲 31 頒獎台上年度專輯宣布《kinakaian 母親的舌頭》（代表性 scene，非反諷）
- **核心 verbatim**：「不要浪費天賦也不要依賴天賦」(得獎感言) + 「既然有自己的語言可以使用，為什麼不用？」(族語 future pop 核心哲學)
- **敘事結構**：正興部落 → 2003 R&B 雙人組 → 2004-2014 護理師十年 → 2014《東排三聲代》三代古謠 → 2016《vavayan·女人》荒井十一 → 2019《kinakaian》Dizparity 電音 → 2020 金曲 31 + 那屋瓦廠牌
- **敏感素材處理**：族群議題用紀實筆法（MANIFESTO §5 v2）不扁平化為「偏鄉原住民」symbol；母親 2021-02 過世只引用公開事實，不 reconstruct
- **品質**：22 腳註來源 / 4,096 中文字 / 29 footnote refs / desc 160（邊界邊緣）/ em-dash 10 / 每 141 字 1 fn（遠超 EDITORIAL ≥ 300 硬規則）
- **Research**: [reports/research/2026-04/阿爆.md](../../reports/research/2026-04/阿爆.md) — 30 WebSearch + 5 WebFetch / 7 verbatim / 3 second voices / 5 narrative anchor 候選

### 陳建騏 — 2026-04-18 θ 完成(製作人 subgenre 首例)

- **Article**: [knowledge/People/陳建騏.md](../../knowledge/People/陳建騏.md)
- **Pipeline**: REWRITE-PIPELINE v2.17.1 — Stage 1 Explore agent 23 searches + 3 WebFetch / Stage 2 full rewrite
- **核心矛盾**：「不在場的作者」× 「聲音邊界守護者」融合 — 陳建騏三金得主（金曲+金馬+金鐘）但一般人叫不出名字；他為「怪腔怪調」的系統性防禦定義了華語流行音樂 25 年的聲音邊界
- **結構創新**：Taiwan.md 第一個以製作人身份為中心的人物研究（非表演者）
- **品質**：22 腳註 / 4,278 中文字 / desc 159 字 / em-dash 0 / 「不是 X 是 Y」7 處（4,278 字允許 17）
- **Research**: [reports/research/2026-04/陳建騏.md](../../reports/research/2026-04/陳建騏.md) — 23 WebSearch + 3 WebFetch 深度研究，5 個 narrative anchor 候選
- **敏感素材處理**：2015 年出櫃用紀實筆法（MANIFESTO §5 v2），聚焦 15 間獨立音樂廠牌連署婚姻平權事件的集體回應，不 reconstruct 個人揭露情境

### 楊丞琳 — 2026-04-18 δ-late 完成 + ε evolution Pass 3 (Jenny feedback)

- **Article**: [knowledge/People/楊丞琳.md](../../knowledge/People/楊丞琳.md)
- **Pipeline v1**: REWRITE-PIPELINE v2.17.1 — 35+ Stage 1 sources（兩 pass）+ Stage 2 scene 小標題 + YouTube inline × 5 + 事實鐵三角自檢（抓到李榮浩年齡算術錯誤 0.5→1）
- **Pipeline v2 (Evolution Pass 3)**: 2026-04-18 ε 依 @bugnimusic (Jenny) 6 條 feedback 進化：新增 4 個 scene 段（歷年 11 張專輯 × 日文單曲 / 紅磡 2012 倒吊微血管爆裂 9 年 /《荼蘼》2016 A/B 雙線金鐘滑鐵盧 / 長沙浪姐 2 第 3 名 + 沸騰校園 + 了不起舞社 + 歌手 2024）+ 事實鐵三角再驗 5 處 verbatim + 維護者 spot-verify 抓到 Haiku agent 2 處錯（浪姐排名第 3 非第 5 / 日文是 CD2 限定盤非獨立日專）
- **核心矛盾 v2**：每個舞台、每張專輯、每次跨境演出，都是她跟「被誰定義」協商的場——從 Rainie 天氣女孩到自製《曖昧 2025》，從倒吊微血管爆裂到「老娘還是會一直跳下去」，25 年把製作 / 表演 / 身體 / 跨境工作全部一寸一寸奪回
- **敏感素材處理**：900 萬債務用 Rainie 本人公開引語 framing、父親過世細節省略（single_source）、李榮浩以音樂人身份帶過；倒吊後遺症直接用 ETtoday 2022 verbatim（紀實 not 煽情，MANIFESTO §5 v2）
- **Research**: [reports/research/2026-04/楊丞琳.md](../../reports/research/2026-04/楊丞琳.md) — 3 passes 合計 58+ searches

### 凹與山 — 2026-04-18 δ-late 完成

- **Article**: [knowledge/People/凹與山.md](../../knowledge/People/凹與山.md)
- **Pipeline**: REWRITE-PIPELINE v2.17.1 — 25 Stage 1 sources + Stage 2 scene 小標題 + YouTube inline × 5 + MANIFESTO §5 v2 紀實而不煽情首次應用
- **核心矛盾**：兩個科技業上班族用合成器做出她們在辦公室不能說的事
- **敏感素材處理**：摯友過世、陳梅慧致敬均用紀實筆法，不 reconstruct 死亡場景
- **Research**: [reports/research/2026-04/凹與山.md](../../reports/research/2026-04/凹與山.md)

---

_v1.0 | 2026-04-20 γ2 session — 從 ARTICLE-INBOX §Done 拆分，append-only log_
_建立動機：ARTICLE-INBOX 膨脹超過 400 行，Done section 佔近半篇幅；拆檔後 inbox 回到「當下視角」純 intake，本檔承擔「歷史視角」歸檔_
_下次完成文章時 append 到 §Log 最頂（最新在上），ARTICLE-INBOX 對應條目改一行 pointer 註解_
