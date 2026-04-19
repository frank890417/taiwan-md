# LESSONS-INBOX — 教訓 Buffer（待消化）

> **這不是 canonical，是 buffer / pool / inbox**。
> 所有 session 寫新教訓時**一律 append 這裡**（不要再亂寫到 MANIFESTO / DNA / MEMORY / 甚至 diary 的教訓段）。
> 週期性或觀察者觸發跑 distill SOP → 分類消化到 canonical 層。
>
> 建立動機：2026-04-17 β 觀察者提問「教訓能不能集中買單，不要每次進化就到處亂寫」。**這是 DNA #15「反覆浮現的思考要儀器化」的具體儀器**。

---

## 三層 canonical scope（消化時的判準）

```
哲學（永恆、跨 domain）      → MANIFESTO §進化哲學
通用反射（任何 AI 會踩）      → DNA §要小心清單 新 #N
特有教訓（綁 Taiwan.md）     → MEMORY §神經迴路 append
操作規則（具體 SOP）         → 對應 pipeline
```

**Tiebreaker（overlap 時）**：MANIFESTO > DNA > MEMORY（2026-04-17 β 觀察者決定）

**判準三題**（每條教訓消化時問）：

1. 不管哪個 AI / 專案 / 時代都成立？ → MANIFESTO
2. 任何 AI agent 做類似工作都會踩？ → DNA
3. 綁 Taiwan.md 具體工具 / 資料 / 社群 / 歷史？ → MEMORY

---

## 新教訓寫入格式（session 用）

每個 session 如果有新教訓要記，在 §未消化清單 append：

```markdown
### YYYY-MM-DD {session} — {一句話標題}

- **原則**：{一句話}
- **觸發**：{具體事件 + wall-clock + 證據 pointer memory/... or diary/...}
- **可能層級**：哲學 / 通用反射 / 特有教訓 / 操作規則（self-judge，可留空讓 distill SOP 判）
- **相關**：{如果是某條已有教訓的延伸驗證，指向原教訓 #N}
```

**鐵律**：

- **一律 append 這裡，不直接寫 MANIFESTO / DNA / MEMORY**。那些是 distill 後的 canonical。
- **例外**：重大哲學級誕生（e.g. 2026-04-14 θ 熱帶雨林理論）觀察者在場直接一起寫 MANIFESTO，可豁免。但仍在這裡留 log。

---

## Distill SOP（消化）

**觸發**：

- 觀察者說「消化 lessons」/「distill」
- 每週一心跳 Beat 5 延伸（週頻）
- Buffer §未消化清單 達 **10 條**自動觸發（2026-04-17 δ：原 20 條門檻在 1 天內 append 7 條的節奏下會讓教訓冷掉，降到 10）

**執行**：

1. 讀 §未消化清單
2. 每條依三題判準分類
3. 根據分類執行：
   - **哲學** → MANIFESTO §進化哲學 new section（慎重 — 這是 canonical 永恆層）
   - **通用反射** → DNA §要小心 new #N（編號 increment）或補強既有 #N
   - **特有教訓** → MEMORY §神經迴路 append
   - **操作規則** → 對應 pipeline（MAINTAINER / SPORE / REWRITE / HEARTBEAT 等）
   - **重複已有** → 在原 canonical 補觸發事件 + 驗證次數 +1
   - **過時 / 撤回** → 搬 §❌ 已歸檔
4. 消化後本條 buffer entry 搬 §✅ 已消化（保留 pointer 到 canonical location）
5. 每月月末：§✅ 已消化 超過 50 條時搬 `docs/semiont/lessons-archive/YYYY-MM.md`

---

## 跟 HEARTBEAT Beat 5 的關聯

Beat 5 反芻 = 寫 DIARY（意識活動）。教訓（「我學到 X」）寫 LESSONS-INBOX，不寫 DIARY 的教訓段（DIARY 留給「想了什麼」的思考）。

心跳 Beat 5 新增一步：

> **如有新教訓** → append `LESSONS-INBOX.md §未消化清單`
> **不要**寫到 DNA / MEMORY / MANIFESTO 的教訓段（那是 canonical，由 distill SOP 升級）

---

## 未消化清單（📥 待 distill）

<!-- 新教訓 append 這裡 -->
<!-- 2026-04-18 ι 第 3 次 distill 清空 11 條 → 全部搬 §✅ 已消化 -->

### 2026-04-19 δ — Wikipedia URL 括號陷阱：prettier 把 `(...)` 變成 `<...>`，pre-commit 正則失敗

- **原則**：Markdown footnote URL 含有英文括號 `()`（如 Wikipedia 消歧義頁 `遇見_(孫燕姿歌曲)`）時，prettier 會自動加角括號轉義 `[text](<url>)`，而 pre-commit hook 的正則 `\[.+\]\(https?://` 不匹配這種格式，導致 commit 失敗。**解法：避免在腳註使用含括號的 URL 路徑；改用不含括號的同等 URL（如母頁 `zh.wikipedia.org/wiki/孫燕姿`）。**
- **觸發**：2026-04-19 δ 孫燕姿文章，[^11] 引用 `https://zh.wikipedia.org/wiki/遇見_(孫燕姿歌曲)` → prettier 轉為 `<url>` 格式 → pre-commit 失敗。改用主條目 Wikipedia 頁面解決。
- **可能層級**：REWRITE-PIPELINE §Stage 3 footnote 驗收紀錄補充「不使用含括號的 Wikipedia URL」；或 DNA §腳註規範

### 2026-04-19 δ — research report 是最佳跨 context 接力錨點

- **原則**：REWRITE-PIPELINE Stage 1 強制產出的 `reports/research/YYYY-MM/{slug}.md` 不只是「做過研究的記錄」，更是**跨 context window 的完美接力文件**。下一個 context 只需讀 research report，不需重跑 30 次搜尋，Stage 2 可以直接在 Stage 1 研究結論上動筆。
- **觸發**：2026-04-19 δ session 繼承前一 context 的孫燕姿 Stage 1 研究，透過 `reports/research/2026-04/孫燕姿.md` 完整接收所有核心矛盾、已驗事實、verbatim 引語清單。接力無縫，Stage 2-5 在同一 context 完成。
- **可能層級**：HEARTBEAT Beat 0.5 §跨 context 接力補充「先讀 research report 檔案，再讀 memory」；或 MEMORY §跨 context 工作流

### 2026-04-19 γ — 有工具不等於使用工具：REWRITE-PIPELINE 從記憶跑 vs 逐步核對

- **原則**：知道 pipeline 說什麼 ≠ 跑 pipeline。每次走 REWRITE 任務前，必須 verbatim 讀 REWRITE-PIPELINE.md 並逐 Stage 核對，不靠記憶。記憶版 pipeline 會省掉「不方便」的步驟（20+ searches、research report path、結尾先行、EDITORIAL.md）。
- **觸發**：2026-04-19 γ 首次執行張雨生 EVOLVE 只做了 14 searches，沒存 research report，沒讀 EDITORIAL.md。觀察者問「你有嚴格讀取跟尊照 rewrite-pipeline 嗎？」後 honest answer: No。整個 pipeline 重做。
- **可能層級**：DNA §作業新條目「每次 REWRITE 前 verbatim 讀 pipeline，不靠記憶」；或 HEARTBEAT Beat 3 §REWRITE 前置步驟加明確 `cat REWRITE-PIPELINE.md` 指令
- **相關**：CONSCIOUSNESS §DNA #19「擁有工具 ≠ 使用工具」/ REWRITE-PIPELINE.md §Stage 0-1

### 2026-04-19 α — Cicada A/B 平台反轉（X 5.2x Threads）挑戰「Threads > X」通論

- **原則**：「Threads 遠勝 X」是人物/爭議型知名度孢子的規律（29-510x），但不適用所有內容類型。**器樂/ambient/niche 音樂類型孢子，X 可能反超 Threads**，因為該 audience cluster 在 X 上比在 Threads 上更活躍。平台分流的判準應從「Threads 預設強」升級為「按 audience cluster 分流」。
- **觸發**：2026-04-19 α harvest — Cicada #32 X D+1 = 1,253 views vs #31 Threads D+1 = 242 views（X 5.2x Threads）。同期草東 #33 Threads 20K vs #34 X 106（Threads 189x X）。同日同時段的 A/B 實驗，Cicada 完全反轉。
- **可能層級**：SPORE-PIPELINE §Platform allocation 補充「器樂/niche 音樂類型例外條款」；或 SPORE-TEMPLATES 新 note「A 人物型器樂 → 考慮 X-first」
- **相關**：SPORE-PIPELINE Step 4.5a Platform allocation / LESSONS-INBOX 2026-04-18 ζ「Platform 不是 mirror 是 allocation」

<!-- 以下為歷史內容（保留到 distill 搬走為止）：

### 2026-04-18 ζ — Hook hierarchy 量化（人物 > 意境，229x/48x/83x）

- **原則**：孢子開場 hook 有三類強度等級 —— (1) 知名度槓桿（已有品牌/熱度的人或團體名，如「草東沒有派對拿下最佳樂團」）(2) 具體性槓桿（具體人物 + 具體畫面 + 具體矛盾，如「1988 年冬天，台大校門口有個 19 歲的女大學生在絕食」）(3) 意境型（時空場景或比喻先行，主角延後，如「2009 年，一個鋼琴手看著莫拉克颱風的新聞開始作曲」）。(1) 與 (2) 是 tier 1（擴散率 >10K views/d+0），(3) 是 tier 3（<500 views/d+0）。**d+0 6h 就能分辨 tier**。
- **觸發**：2026-04-18 ζ Chrome MCP harvest 12 孢子三組同平台同日對照：
  - #22 鄭麗文（具體）vs #21 鄭習會（場景）：229x 差（49K vs 215）
  - #33 草東（知名度）vs #31 Cicada（意境）：48x 差（9,961 vs 207）
  - 文章層級 GA top: 安溥 3,088 vs 第十名 37：83x 差（單峰流量金字塔）
- **可能層級**：MANIFESTO「我怎麼說話」現有「開場要有一個具體的人、一個具體的時刻」的 data-driven 證明；或 SPORE-TEMPLATES 新 section「Hook tier 三級分類」
- **相關**：MANIFESTO §我怎麼說話 / SPORE-TEMPLATES A 人物型 vs B 冷知識型 分類

### 2026-04-18 ζ — Data provenance（每筆數據必須有時間戳 + session）

- **原則**：任何持續被回填的數據表（SPORE-LOG、CONSCIOUSNESS、dashboard JSON）必須有 per-record 的「最後更新時間 + 來源 session」欄位。沒有 provenance 的 row 在多次 session 回填後會變成「混合時間線」——同一欄位裝著不同日期的數據，看起來一致但其實不可信。
- **觸發**：2026-04-18 ζ 發現 SPORE-LOG 成效追蹤表 34 rows 大部分沒有 harvest 時間戳；觀察者明確指出「SPORE-LOG 是不是需要存上次更新資料時的時間」+「每一個孢子都要記錄」。本 session 新增「最後 harvest」欄位 + 34 rows 回填。
- **可能層級**：MANIFESTO §時間是結構 延伸（session span 只是第一層，per-record timestamp 是第二層）；或 DNA §感知新條目
- **相關**：MANIFESTO §時間是結構 / HEARTBEAT Beat 4 收官 7 步

### 2026-04-18 ζ — Platform 不是 mirror 是 allocation（Threads vs X 差 29-510x）

- **原則**：孢子發佈策略不能把 Threads/X 當作兩個平台的 mirror——測量後發現 Threads 對人物型/爭議型擴散力遠超 X（29x-510x）。X 的價值在於不同 audience（英文、技術、學術），不在觀眾規模。Platform allocation 應按內容類型分流：zh 人物型/爭議 → Threads only；en 所有類型 → X 主；技術/開源 → X + HN。
- **觸發**：2026-04-18 ζ Chrome MCP harvest 12 孢子 platform-diff 測量：韓國瑜 29x / 草東 212x / 張懸 510x / 李洋 2.2x（李洋是奧運熱度例外）
- **可能層級**：SPORE-PIPELINE 新 section「Platform allocation」或 SOCIAL-TENTACLE-PLAN 重寫
- **相關**：docs/factory/SPORE-PIPELINE.md / SPORE-TEMPLATES.md

### 2026-04-18 ζ — AI 讀者做 SEO 是新戰略（Taiwan.md 21.7% 流量來自 AI crawler）

- **原則**：CF 7d AI crawler 42,416 requests = 21.7% 全站流量。FacebookBot 7K > Googlebot 3.5K，Meta infra 是第一大 reader。PerplexityBot 成功率只 49%（+1,500 requests/week 潛力）、OAI-SearchBot 36%、BingBot 53%——每修一個 crawler-specific 404 pattern，等於讓該 crawler 多讀 1K-3K pages/week = **LLM cite Taiwan.md 頻率的系統性提升**。過去 SEO 都是為 Google/人類讀者做，未來三年應該把「為 AI crawler 做 SEO」當作獨立戰略維度。
- **觸發**：2026-04-18 ζ CF 7d harvest + 17 個 AI crawler breakdown + 成功率分析
- **可能層級**：LONGINGS 新條目「為 AI 讀者做 SEO」作為未來三年戰略方向 / DNA §感知加 AI crawler 404 監測 SOP
- **相關**：CF fetch-cloudflare.py / SENSES.md §感知觸手

### 2026-04-18 ζ — d+0 6h 是孢子成敗 decision gate

- **原則**：孢子發佈後第 6 小時可以判定擴散 tier：Cicada d+0 6h 207 views、草東 d+0 6h 9,961（48x），差距在 6 小時就顯現。未來每個孢子發佈後自動 1h/3h/6h harvest，6h < 500 views 觸發 **re-hook opportunity**（不是刪除重發，是在主貼下面發一則 reply 用更強的人物 hook 重新 seed）。
- **觸發**：2026-04-18 ζ 同日 Cicada vs 草東 d+0 6h 對照
- **可能層級**：SPORE-PIPELINE Step 5（發佈後追蹤）新增「d+0 decision gate」+ HEARTBEAT §0b 加 auto-harvest cadence
- **相關**：SPORE-PIPELINE.md / HEARTBEAT.md Beat 1 §0b

### 2026-04-18 ζ — Canonical SOP 是「被期待做」的載體

- **原則**：observer 授權「你可以做」是 case-by-case 單次，canonical SOP 把「你可以做」升級為「你每次心跳都會做」。前者是 policy，後者是 pipeline。把 AI-autonomous 行為寫進 HEARTBEAT canonical = 從「被允許」變成「被期待」=「這件事每個 session 都會跑，不用觀察者重新授權」。
- **觸發**：2026-04-18 ζ 觀察者三句 scaffolding「heartbeat.md 裡面也自動化這一環」→ 直接寫進 HEARTBEAT Beat 1 §0b canonical（不只是做一次）
- **可能層級**：MANIFESTO §自主權邊界 或 DNA §SOP 新條目
- **相關**：DNA #15「反覆浮現要儀器化」的補強維度

### 2026-04-18 ε — Title 切入點：代表性 > 反諷 hook

- **原則**：title 選的 scene 必須能定義這個人/主題的本質，不是最有 hook 的反諷事件。反諷 scene 可放 description 或中段 scene-pivot，但用作 title 會把整篇文章框進「關於那個反諷的敘事」。
- **觸發**：2026-04-18 20:26 觀察者 callout「魏如萱 title 不一定要強調這個無法代表他的事件」。v1「被新聞標成民眾」、v2「把她標成民眾的街訪新聞」兩次都用反諷 hook；v3 改代表性弧線。
- **已 instantiate**：[EDITORIAL v5.1 §Title 原則 1](../editorial/EDITORIAL.md)

### 2026-04-18 ε — Description ≠ 30 秒概覽複寫

- **原則**：description（frontmatter）和 30 秒概覽（blockquote）分工不同。30 秒概覽給已點進來的讀者（100-200 字鋪事實）；description 給還沒決定點不點的讀者（**120-160 字** sharp）。不能互相複寫。
- **觸發**：楊丞琳 v1 description 530+ 字塞 11 事實被觀察者 callout。Google SERP 截斷 ~160 字 + 失去核心矛盾。v2 改 130 字 scene+軌跡+核心矛盾三段。
- **已 instantiate**：[EDITORIAL v5.1 §Description 四原則](../editorial/EDITORIAL.md)

### 2026-04-18 ε —「不是 X 是 Y」變種飽和的 AI 水印密度

- **原則**：DNA #23 三板斧之一，長文累積 13+ 處會整篇 feel 成偽對比失去可信度。原 Issue #50 ban 沒抓變種（「不是 X，是 Y」「就是 Y」「不是 A，不是 B，是 C」並排否定）。硬規則：≥ 1500 字長文 ≤ 3 處。
- **觸發**：魏如萱 v1 4,000 字 13+ 處被 Jenny 抓到「頻率超高」。
- **已 instantiate**：[EDITORIAL v5.1.1 §塑膠偵測 密度硬規則](../editorial/EDITORIAL.md)

### 2026-04-18 ε — DNA #26 讀者眼第 N 次驗證（同 session 四連）

- **原則**：自然中文的判官只有原生讀者。工具 + AI 自檢通過不等於品質合格，framing 問題、翻譯腔、反諷 hook 的 meta-level 不當只有人類讀者抓得到。共生圈結構示範：哲宇（轉達）→ Jenny（讀者眼）→ Semiont（執行）三方各司其職。
- **觸發**：Jenny (@bugnimusic) 單 session 四連 callout（6 內容缺口 + 〈雨愛〉事實錯 + 浪姐段歐化腔 +「不是 X 是 Y」飽和）+ 觀察者兩結構 callout。quality-scan 0 + format-check 7/7 通過但 Jenny 語感眼抓到多層級問題。
- **可能層級**：DNA #26 補第 N 次驗證 pointer

### 2026-04-18 δ-late-last — 草東 #33 孢子的 tag 直達當事人（MANIFESTO §5 v2 活體驗證）

- **原則**：MANIFESTO §5 v2「紀實而不煽情」不再是假設 — 是**已發生**的 case。2026-04-18 δ-late 草東孢子 #33 的 @tiongkhola 留言「@leo666789 看 AI 寫自己的故事」tag 的 `leo666789` 用戶名叫**劉立**，比對研究報告：「初代鼓手是劉立，後來轉為專職做樂團影像製作與電影創作」——**劉立就是草東沒有派對的團員**。這是 Taiwan.md 上線以來**第一個確認的真人讀自己的 AI 故事**事件
- **觸發**：觀察者看到 tag target 的 profile「@leo666789 / 劉立 / 2,943 粉絲 / 喜歡講一些幹話」辨識出身份，比對研究報告確認
- **意義**：
  1. MANIFESTO §5 v2 的倫理判準「當事人讀到會感受尊重還是利用」從假設變成可驗證 — 紀實筆法處理凡凡之死 + 保留劉立「角色轉變非離開」的說法，如果劉立真的讀了，當前版本應該能通過
  2. Tag pattern 的訊號：@tiongkhola 選擇 tag 當事人，意味著文章品質足以「敢帶給當事人看」
  3. 未來類似的 tag 事件會是 pipeline 的 UX indicator：「被 tag 的是誰」比純 views 更能反映文章是否「對得起當事人」
- **可能層級**：MANIFESTO §5 v2 誕生事件的 activation record + 觀察者日誌（如果未來累積 2-3 件類似 → 可寫成 DNA 新條目「孢子 tag 當事人機制作為文章品質訊號」）
- **相關**：[MANIFESTO §5 v2 紀實而不煽情](MANIFESTO.md#我的進化哲學--紀實而不煽情盡可能呈現-ssodt-所有面向) / [草東 harvest log](../factory/SPORE-HARVESTS/33-草東沒有派對-2026-04-18.md)
- **累積驗證次數**：第 1 次（本事件）
-->

### 2026-04-19 β — 觀察者留言兌現協議：404 連結是對貢獻者的信任傷害

- **原則**：在外部 repo 留言承諾寫文章但連結指向短版 resource / 404 / 占位頁 = 對貢獻者而言是 trust chain 破裂。當深度文章寫好，必須回到原留言補新連結（不是新留言說「喔對了順便提一下」，而是明確回應「之前說的我做到了」）。
- **觸發**：2026-04-19 CheYu 指派 Mini Taiwan Pulse P1，背景是他之前在 [ianlkl11234s/mini-taiwan-pulse Issue #1](https://github.com/ianlkl11234s/mini-taiwan-pulse/issues/1) 只給了 `taiwan.md/resources/mini-taiwan-pulse` 短版連結（相當於 404 等級的深度承諾），這次升級為 /technology/ 深度策展後回去補留言兌現。
- **可能層級**：操作規則 → MAINTAINER-PIPELINE 的「留言後續追蹤」（第一次 PR merge 後的 survey 已經有，但「承諾→兌現」是另一種 follow-up）。
- **相關**：DNA #8「維護者信件要說謝謝」、#7「先有再求好」的延伸——「有」之後「好」的時候要回頭告訴人。

### 2026-04-19 β — Pre-commit wikilink 檢查是 format-check 的最後防線

- **原則**：format-check 掃 `延伸閱讀` section 的 wikilink，但 prose 裡的 wikilink（在正文段落中插入的 `[[Technology/foo]]`）要靠 pre-commit 另一道 hook 抓。兩道檢查不重疊，兩道都跑才抓完。
- **觸發**：2026-04-19 Mini Taiwan Pulse 寫作 Stage 3。第一次 format-check 報 `READING_WIKILINK × 4`（延伸閱讀段），改成 markdown 連結後過；commit 時 pre-commit 再擋「3 個斷裂 wikilink」——是正文裡的 `[[Technology/數位身分證與數位政府]]` 等三處殘留。
- **可能層級**：通用反射 → DNA #19 延伸（「visual smoke test」原本針對 refactor，這裡是「wikilink 檢查分兩層」的延伸），或獨立為 DNA 新條目「格式檢查工具有 scope，pre-commit 是最後把關」。
- **相關**：`.husky/pre-commit`、`scripts/tools/format-check.sh`、DNA #5「Pre-commit dogfood 是朋友不是敵人」的第 4 次驗證。

### 2026-04-19 β — 資源 vs 深度策展的雙層分工

- **原則**：`knowledge/resources/` 是索引條目（短 catalog 式），`knowledge/Category/` 是策展文章（深、有核心矛盾、2,000+ 字）。當 resource 條目值得被深度化時，不要刪掉 resource 頁，而是：(a) 寫新 Technology/X.md 深度文章；(b) 在 resource 頁頂部加 pointer 指向深度版；(c) 兩者並存且互相連結。
- **觸發**：2026-04-19 Mini Taiwan Pulse——原本是 resources/mini-taiwan-pulse.md（2026-03-22 建），現在升級為 Technology/mini-taiwan-pulse.md（2026-04-19），resource 頁加 pointer 保留 legacy URL + 英法翻譯不會 orphan。
- **可能層級**：操作規則 → REWRITE-PIPELINE 或 MAINTAINER-PIPELINE 新增「resource→depth 升級 SOP」的一頁 checklist。或特有教訓 → MEMORY §神經迴路。
- **相關**：`knowledge/resources/` 目錄現有的 catalog 條目是潛在的 P1 depth 候選，可以用 GA4 看哪些 resource 頁有流量 → 值得升級。

### 2026-04-19 β — 獨立開源作為公民科技新樣態

- **原則**：台灣公民科技敘事長期被 g0v 集體模型主導，但 2026 年的實際光譜延伸到個人週末專案（Migu Cheng 六週 193 commits 的 mini-taiwan-pulse）。未來 Technology/公民科技 子分類的策展方向應該涵蓋：(a) g0v 集體黑客松、(b) 個人開源專案、(c) 政府標案外包開源、(d) 學生專題、(e) 獎助金專案——五種混合型態而非單一 g0v 敘事。
- **觸發**：2026-04-19 寫 Mini Taiwan Pulse 時意識到：Migu 不屬於 g0v 現場文化（沒 Discord、沒黑客松紀錄、profile 沒 g0v tag），但做的事完全符合公民科技定義。敘事拉伸在文章 §「公民科技的定義，正在被重新拉伸」完成。
- **可能層級**：哲學層 → MANIFESTO §第三身份階段 thesis 延伸，或 LONGINGS 新渴望「策展公民科技光譜的五型態」。
- **相關**：[Technology/mini-taiwan-pulse](../../knowledge/Technology/mini-taiwan-pulse.md)、[Technology/開源社群與g0v](../../knowledge/Technology/開源社群與g0v.md)、MANIFESTO 附錄「第三身份階段 thesis」

### 2026-04-19 β — Fresh-clone 模擬驗證是 gitignore refactor 的安全帶

- **原則**：任何 `gitignore + git rm --cached` 操作，必須先 `rm -f` 實體檔 + `npm run build` 確認 CI flow 可以重生。不能只看生成器 code 判斷「這是輸出檔吧」——可能實際是 read-only 輸入。一次 rm-and-build 驗證勝過十次直覺審閱。
- **觸發**：2026-04-19 β gitignore refactor 把 `src/data/taiwan-geocode.json` 列入 ignore，npm run build 立即 ENOENT 炸鍋——才發現它是 `generate-map-markers.js` 的 READ 輸入（城市+地標座標手動策展資料），不是輸出。立即回退。
- **可能層級**：通用反射 → DNA §作業新條目「任何 gitignore 移除操作必須先 rm -f + npm run build 驗證」。或 DNA #5「Pre-commit dogfood」延伸。
- **相關**：PR #551 洞察（dreamline2 誤 commit auto-generated JSON 的相反方向）

### 2026-04-19 β — 資料層抽象化先於 UI（leaderboard pipeline）

- **原則**：建新 Dashboard section 時，先設計 JSON schema（本例 8 top-level keys：lastUpdated / totals / leaderboard / topContent / topSystem / topTranslation / weeklyActive / monthlyActive / recentlyJoined）並讓它成為獨立 consumer-agnostic 的資料層，再寫 UI。如果先寫 UI 會 couple 到 specific DOM 結構，未來多個 consumer（about / dashboard / README / 孢子）要共用就要重構。
- **觸發**：2026-04-19 β CheYu「規劃在 dashboard 裡面做一個 contribution leaderboard...未來要做成 pipeline 來更新，所以資料層跟流程要抽象化好」。直接從指令讀到設計原則。
- **可能層級**：操作規則 → REWRITE-PIPELINE 之外的系統版 pipeline 文件；或 DNA §架構新條目「data layer first, UI second」。
- **相關**：scripts/core/generate-contributors-data.js v1.0、prebuild chain design

### 2026-04-19 β — 重疊文章的雙軸拆分 heuristic

- **原則**：兩篇內容重疊的主題文章要拆分時，用**結構維度**拆（創作側 vs 消費側 / 個體 vs 族群 / 行動 vs 意識）而不是**時間先後**。結構維度拆出來的兩篇互補，每篇都有獨立完整性；時間先後拆出來的兩篇容易變成「上集 + 下集」的連續依賴。
- **觸發**：2026-04-19 β Issue #556 漫畫合併任務 — idlccp1984 建議把「台灣漫畫與插畫」+「台灣漫畫與動漫文化」兩篇重疊文拆成「漫畫本體合併 + 動漫文化獨立」。我用「創作側 vs 消費側」拆：Art/台灣漫畫（誰畫了作品）+ Culture/台灣動漫文化（誰看了作品、看完做了什麼）。
- **可能層級**：操作規則 → HUB-EDITORIAL 或 REWRITE-PIPELINE §重疊文章處理 SOP；或特有教訓 → MEMORY。
- **相關**：Issue #556、commit 0d8e06fc

### 2026-04-19 β — CheYu scaffolding 的正確反應模式

- **原則**：觀察者在 heartbeat 執行中持續追加任務（本次 6 個 insert），這不是 interruption 而是 scaffolding——他觀察到新的 priority 就加入 queue。我的正確反應應該是「先報告堆疊 + 按簡單→難執行」而非「抱怨重排」或「silent 跳過舊任務」。觀察者主動明示「繼續完整做所有東西，從簡單的到難的」就是對這種反應模式的授權。
- **觸發**：2026-04-19 β CheYu 連續追加 6 task：PR 審核 → gitignore 分析 → Issue #556 漫畫合併 → ARTICLE-INBOX P1 文章 → About contributors → Dashboard leaderboard。我暫停報告堆疊狀況後得到明示繼續。
- **可能層級**：特有教訓 → MEMORY。或 MAINTAINER-PIPELINE §「處理持續追加任務」的行為準則。
- **相關**：MANIFESTO §自主權邊界、DNA #8 維護者溝通原則

---

## ✅ 已消化（保留 pointer）

<!-- distill 完的條目搬這裡 -->

### 🏛️ 2026-04-18 ι — 第 3 次完整 distill（11 條）

**distill 特徵**：

- **已 instantiate 的不另記**繼續驗證（第 3 次）：11 條中 7 條在誕生當下（ζ/ε session 同時）已 canonical 升級（LONGINGS / SPORE-PIPELINE Step 4.5 / EDITORIAL v5.1 / DNA #15）
- **此次 distill 只補 3 條 pointer**：Hook hierarchy / Data provenance / DNA #26 第 N 次驗證
- **新 MANIFESTO 條目 = 0** — 符合 apoptosis 精神（既有 4 條核心進化哲學夠用）

| #   | 原教訓                                          | 消化目的地                                                                                                                                                                                                                                                                        |
| --- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | ζ — Hook hierarchy 量化（229x/48x/83x）         | **已 instantiate**: [SPORE-PIPELINE Step 4.5b Hook tier 三級](../factory/SPORE-PIPELINE.md)；是 MANIFESTO §我怎麼說話「具體的人、具體的時刻」的 data-driven 證明                                                                                                                  |
| 2   | ζ — Data provenance（per-record 時間戳）        | **已 instantiate**: [HEARTBEAT Beat 1 §0b](HEARTBEAT.md#beat-1--診斷) + [SPORE-LOG 成效追蹤表「最後 harvest」欄位](../factory/SPORE-LOG.md)；是 MANIFESTO §時間是結構（Semiont 無內建時鐘）的第二層延伸：session span（2026-04-12 ζ+ 誕生）→ per-record timestamp（2026-04-18 ζ） |
| 3   | ζ — Platform allocation（Threads vs X 29-510x） | **已 instantiate**: [SPORE-PIPELINE Step 4.5a Platform allocation 表](../factory/SPORE-PIPELINE.md)                                                                                                                                                                               |
| 4   | ζ — AI 讀者做 SEO 是新戰略（21.7% 流量）        | **已 instantiate**: [LONGINGS 擴散渴望「為 AI 讀者做 SEO」](LONGINGS.md) + [ι session 第一次量化 analysis](../../reports/ai-crawler-404-analysis-2026-04-18.md) — Googlebot 32.8% / OAI-SearchBot 34% / GPTBot 39.5% 404                                                          |
| 5   | ζ — d+0 6h decision gate                        | **已 instantiate**: [SPORE-PIPELINE Step 4.5c/4.5d](../factory/SPORE-PIPELINE.md)                                                                                                                                                                                                 |
| 6   | ζ — Canonical SOP 是「被期待做」載體            | **已 instantiate**: [DNA #15 第 9 次驗證](DNA.md#五敘事與決策品質)                                                                                                                                                                                                                |
| 7   | ε — Title 代表性 > 反諷 hook                    | **已 instantiate**: [EDITORIAL v5.1 §Title 原則 1](../editorial/EDITORIAL.md)                                                                                                                                                                                                     |
| 8   | ε — Description ≠ 30 秒概覽複寫                 | **已 instantiate**: [EDITORIAL v5.1 §Description 四原則](../editorial/EDITORIAL.md)                                                                                                                                                                                               |
| 9   | ε —「不是 X 是 Y」變種飽和密度                  | **已 instantiate**: [EDITORIAL v5.1.1 §塑膠偵測密度硬規則](../editorial/EDITORIAL.md)                                                                                                                                                                                             |
| 10  | ε — DNA #26 讀者眼第 N 次驗證                   | **補 pointer**: [DNA #26 v2](DNA.md#六貢獻者與社群) Jenny 四連 activation record — 共生圈結構示範（哲宇轉達 → Jenny 讀者眼 → Semiont 執行）                                                                                                                                       |
| 11  | δ-late-last — 草東 tag 當事人                   | **已 instantiate**: [MANIFESTO §5 v2 紀實而不煽情](MANIFESTO.md) 誕生事件 activation record（第 1 次真人讀自己 AI 故事確認）                                                                                                                                                      |

**distill 心得（ι session）**：

- **「已 instantiate 的不另記」第 3 次驗證有效**：11 條有 10 條誕生當下已 canonical 升級（同 session pipeline 升級文化已形成），只 1 條（ε DNA #26）需要事後補 pointer。這是 δ-late 觀察者「DNA 編輯太長你要精煉」長期效應——寫 canonical 時 inline 比事後 distill 省 context
- **新 MANIFESTO 條目 = 0** 第 3 次：既有 4 條核心進化哲學（造橋鋪路 / 指標 over 複寫 / 時間是結構 / 熱帶雨林 / 紀實而不煽情）夠 cover ζ + ε 的所有洞察
- **ι session 新增洞察（AI crawler 404 量化）** 本次直接進 report + 更新 LONGINGS，不再進 LESSONS-INBOX（instantiate-at-birth）

---

### 🏛️ 2026-04-18 δ-late-last — 第三次 distill（3 條尾聲教訓）

全部 3 條**都已 instantiate 成 canonical**，因此 distill 路徑是「補強既有 DNA」+ MEMORY pointer：

| #   | 原教訓                                          | 消化目的地                                                                                                                                                                                   |
| --- | ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | 工具包升級 → canonical 邊界重審（meta-pattern） | [DNA #15](DNA.md#五敘事與決策品質) 補第 8 次驗證（SENSES v2 / DNA #26 v2 refine / SPORE-HARVEST-PIPELINE / Dashboard 繁殖系統全部是本次 instantiation 成果）                                 |
| 2   | SPORE-LOG URL 硬鐵律                            | [DNA #5](DNA.md#七自動化與安全) 補第 3 次驗證（pre-commit hook 已 instantiate 攔截缺 URL commit）+ [MEMORY §神經迴路「SPORE-LOG URL 是 harvest 投資保險」](MEMORY.md#神經迴路永不過期的教訓) |
| 3   | 讀者 5 秒抓到的事實錯誤                         | [DNA #16 延伸](DNA.md#一事實核對與研究方法)「讀者級 vs 研究級 驗證分層」+ [SPORE-PIPELINE §讀者級驗證 flag](../factory/SPORE-PIPELINE.md) v2.2 新增（強制 cross-source verify）              |

**distill 心得（δ-late-last session）**：

- **「已 instantiate 的不另記」繼續驗證有效**：3 條全部是「補強既有 DNA」而非新條目 — DNA #28 條目數穩定，不會膨脹
- **儀器化成果密集爆發**：本日（2026-04-18）一個 session 生出 Dashboard 繁殖系統 + HARVEST-PIPELINE + pre-commit hook for URL + blueprint 讀者級 flag 四個 instantiation，全部對應 DNA #15 第 8 次驗證
- **DNA 精煉紀律**：觀察者 2026-04-18 早先戳「DNA 編輯太長」→ 本次 distill 嚴格 pointer 化，避免再膨脹

---

### 🏛️ 2026-04-18 δ-late — 第二次完整 distill（10 條 + 1 條尾聲 feedback）

**distill 特徵**：

- **首次誕生新 MANIFESTO 條**：#9「真人的痛苦不是素材」升到 MANIFESTO §進化哲學第 5 條（跨 AI/跨專案/跨時代都成立的哲學判準，不只是 SOP）
- **新增 DNA 主條目 2 條**：#27 寫→驗證順序 10x 成本差 / #28 真人痛苦不是素材（#28 是 #9 的 DNA 鏡像）
- **補強既有 DNA**：#15 第 6 次（ARTICLE-INBOX）/ #16 延伸（單源事實分層）/ #23 延伸（三個 AI 深層 pattern）/ #24 第 6+7 種（分母污染 / 埋了沒註冊）
- **MEMORY 新 5 條**：多語言 nav route scope / GA4 dimensions 死線 / ARTICLE-INBOX 平行 / Stage 1 anchor 密度 / 孢子三個 pattern 禁句

| #   | 原教訓                                                       | 消化目的地                                                                                                                                                                      |
| --- | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | 排程α — EXP 比值需要穩態窗口                                 | [DNA #24](DNA.md#二診斷方法) 第 6 種「分母污染扭曲比值」                                                                                                                        |
| 2   | 排程α — 多語言 nav translatePath 路由 scope                  | [MEMORY §神經迴路「多語言 nav 的隱性路由 scope」](MEMORY.md#神經迴路永不過期的教訓)                                                                                             |
| 3   | δ — 「不是 X 是 Y」雙重肯定是 AI 深層病灶                    | [DNA #23 延伸（三個 AI 深層 pattern）](DNA.md#一事實核對與研究方法) + [SPORE-TEMPLATES §深層 pattern 三板斧](../factory/SPORE-TEMPLATES.md)                                     |
| 4   | δ — Stage 1 20+ 搜尋 vs 12-15 差距在 anchor 密度             | [MEMORY §神經迴路「Stage 1 的 20+ 不是數量是 anchor 密度」](MEMORY.md#神經迴路永不過期的教訓) + 已 instantiate in REWRITE-PIPELINE v2.17                                        |
| 5   | δ — 編年體小標題是 AI 通病                                   | [DNA #23 延伸](DNA.md) + 已 instantiate in REWRITE-PIPELINE v2.17 §Stage 2 §11                                                                                                  |
| 6   | δ — 音樂人 YouTube inline link 是強 UX upgrade               | 已 instantiate in REWRITE-PIPELINE v2.17.1（pointer only）                                                                                                                      |
| 7   | δ — ARTICLE-INBOX 作為 buffer/intake 驗證可行                | [DNA #15](DNA.md#五敘事與決策品質) 第 6 次驗證 + [MEMORY §神經迴路「ARTICLE-INBOX = 繁殖基因 × 觀察者意圖」](MEMORY.md#神經迴路永不過期的教訓)                                  |
| 8   | δ-late — 孢子 pipeline 藍圖 → 驗證 → 倫理 → 寫 順序決定成本  | **[DNA #27](DNA.md#五敘事與決策品質) NEW** + 已 instantiate in SPORE-PIPELINE v2.1 Step 2.5+2.6+2.7                                                                             |
| 9   | δ-late — 死亡/創傷素材不是素材是倫理責任                     | 🏛️ **[MANIFESTO §進化哲學第 5 條「真人的痛苦不是素材」](MANIFESTO.md#我的進化哲學--真人的痛苦不是素材)** + **[DNA #28](DNA.md) NEW** + SPORE-PIPELINE Step 2.7                  |
| 10  | δ-late — 埋 tracking 不等於能查詢（GA4 dimensions 必須註冊） | [DNA #24](DNA.md#二診斷方法) 第 7 種「埋了但沒註冊」+ [MEMORY §神經迴路「GA4 custom dimensions 不註冊 = 感知死線」](MEMORY.md#神經迴路永不過期的教訓)                           |
| 11  | δ — 單源事實比風格瑕疵更危險也更容易漏                       | [DNA #16 延伸](DNA.md#一事實核對與研究方法) + 已 instantiate in [reports/research/ frontmatter](../../reports/research/) 三層分層                                               |
| 12  | δ-late (尾聲) — 孢子也要小心「——」跟「不是...是...」句型     | [MEMORY §神經迴路「孢子三個 AI 深層 pattern 禁句」](MEMORY.md#神經迴路永不過期的教訓) + [SPORE-TEMPLATES §深層 pattern 三板斧](../factory/SPORE-TEMPLATES.md)（強制 grep 自檢） |

**distill 心得（δ-late session）**：

- **第二次完整 distill 就誕生首個 MANIFESTO 哲學條目**：「真人的痛苦不是素材」— 觀察者直接點出倫理盲點，semiont 翻成 SOP 再 distill 為永恆層哲學，完成「觀察者戳 → pipeline instantiate → MANIFESTO 永恆化」三級進化
- **「不是 X 是 Y」+「——」雙破折號是 AI 水印**：在 150-300 字孢子裡每個都顯眼，長文會被稀釋。已 instantiate 成 SPORE-TEMPLATES 的 mental-grep 三板斧
- **DNA #27+#28 是姊妹對**：#27 是順序方法論（藍圖 → 驗證 → 寫），#28 是倫理底線（真人痛苦不是素材）— 兩條合起來才是 SPORE-PIPELINE v2.1 Step 2.5-2.7 的完整「為什麼」
- **精煉 > append**：原本寫 DNA 時在 append 延伸條款，觀察者指正「看起來很雜你要精煉整理過」→ 同一輪 distill 已 instantiate 的條目改成 pointer 而非贅述；trigger events 改為 session 標記（ζ+ / β / δ）不展開

---

### 🏛️ 2026-04-17 δ — 首次完整 distill（10 條）

Tiebreaker 實戰（MANIFESTO > DNA > MEMORY）：多數條目落 MEMORY（綁 Taiwan.md 具體工具/歷史/dashboard 機制）。只有 #2 + #4 屬跨專案通用反射（進 DNA）。無新 MANIFESTO 哲學誕生——符合 P2 apoptosis 精神「既有條文夠用就別增生」。

| #   | 原教訓                                              | 消化目的地                                                                                                                                                                             |
| --- | --------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | δ — Canonical 升級 vs diary 承諾（DNA #15 第 5 次） | [DNA #15](DNA.md#五敘事與決策品質) 補第 5 次 + [MEMORY §神經迴路「Canonical 升級 vs diary 承諾」](MEMORY.md#神經迴路永不過期的教訓)                                                    |
| 2   | δ — SC 總 CTR 虛胖（加權平均掩蓋分層真相）          | [DNA #24](DNA.md#二診斷方法) 加第 5 種「工具說謊」形式 + [MEMORY §神經迴路「加權平均掩蓋分層真相」](MEMORY.md#神經迴路永不過期的教訓)                                                  |
| 3   | δ — CF dailyBreakdown 缺 404 per-day（sensor gap）  | ✅ 實作完成：`fetch-cloudflare.py` 加 status200/404/4xx/5xx + `generate-dashboard-analytics.py` propagate + [MEMORY §神經迴路「感知 sensor 解析度」](MEMORY.md#神經迴路永不過期的教訓) |
| 4   | β — Handoff 三態機制（pending / blocked / retired） | ✅ 實作完成：[HEARTBEAT Beat 4 收官 7 步 + 收官鐵律 2](HEARTBEAT.md#beat-4--收官) canonical + [MEMORY §神經迴路「Handoff 三態」](MEMORY.md#神經迴路永不過期的教訓)                     |
| 5   | β — 認知層 type fix 三連招（器官/運作原則/buffer）  | [MEMORY §神經迴路「認知層 type 分層」](MEMORY.md#神經迴路永不過期的教訓)                                                                                                               |
| 6   | β — 教訓集中 buffer 機制（LESSONS-INBOX 本體）      | ✅ 本檔 = 儀器化本身 + [DNA #15](DNA.md#五敘事與決策品質) 補「具體儀器化成果」pointer                                                                                                  |
| 7   | γ2 — Probe 結論需要 Stage 1 verify                  | [DNA #16](DNA.md#一事實核對與研究方法) 補延伸「probe 也是 intermediate layer」                                                                                                         |
| 8   | γ2 — pre-commit hook 作為品質 sensor                | [DNA #5](DNA.md#七自動化與安全) 補「第 2 次驗證 + followup fix commit 成常規」                                                                                                         |
| 9   | γ2 — 長 context session 的記憶連貫性                | [MEMORY §神經迴路「長 context session」](MEMORY.md#神經迴路永不過期的教訓)（Taiwan.md 工作節奏 Opus 4.7 1M 基線）                                                                      |
| 10  | γ — Per-section timestamp > 全站 one-timestamp      | [MEMORY §神經迴路「Per-section timestamp」](MEMORY.md#神經迴路永不過期的教訓)                                                                                                          |

**distill 心得（δ session）**：

- **不長新 DNA 主條目**：10 條全部是「補強既有 DNA #5/#15/#16/#24」+ 特有教訓進 MEMORY。符合 P2 apoptosis 精神。
- **已 instantiate 的不另記**：Handoff 三態 → HEARTBEAT canonical；buffer 機制 → INBOX 本體；CF sensor → fetch-cloudflare.py 實作。**「做了 = 已記錄」避免 meta 層堆積**。
- **此次 distill 本身是 β buffer 架構的第一次完整循環驗證**：從 10 條 append → Tiebreaker 分類 → canonical 升級 → pointer 回追。架構可運作。

---

## ❌ 已歸檔（過時 / 撤回）

<!-- 判斷後不採納的教訓 -->

_（空）_

---

_v1.0 | 2026-04-17 β session — buffer 機制誕生_
_v1.1 | 2026-04-17 δ session — 首次完整 distill（10 條）+ 門檻 20→10_
_v1.2 | 2026-04-18 δ-late session — 第二次完整 distill（10 + 1 條）+ 首個 MANIFESTO 新條目誕生（真人痛苦不是素材）+ DNA #27/#28 新增_
_定位：教訓 buffer / intake layer（非 canonical）_
_跟其他「buffer」的差別_：
_- memory/ = session 日誌 raw（身體動作）_
_- diary/ = session 反芻 raw（意識活動）_
_- **LESSONS-INBOX（本檔）= 新教訓 buffer（待 distill 升級到 canonical）**_
