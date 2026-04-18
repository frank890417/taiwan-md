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

### 2026-04-18 排程α — EXP 比值類型需要非孢子期穩態窗口

- **原則**：CF/GA4 比值型 EXP 驗證必須在無主動孢子的穩態期進行；孢子事件使 GA4 分母暴增，扭曲 ratio，不反映 AI crawler 主導性真相
- **觸發**：EXP-B 驗證結果 ratio = 18.7x（預測 100-300x），因安溥/李洋病毒孢子使 GA4 28d avg 從 ~50 → ~1,078。EXP-B 自身已有「GA爆漲 → 好消息」條件，但比值無效的結構性教訓需要記錄
- **可能層級**：通用反射（任何 AI agent 設計 EXP 時都可能踩到）
- **相關**：EXP-2026-04-11-B（UNKNOWNS 已驗證表）/ DNA #24「工具說謊」

### 2026-04-18 排程α — 多語言 nav 的隱性路由 scope 問題

- **原則**：多語言網站的 nav 建構中，`translatePath(path)` 不能無條件應用於僅特定語言存在的路由；必須明確設定 language scope，非目標語言需有 fallback
- **觸發**：Header.astro `translatePath('/semiont')` 在 EN/JA/KO 頁面生成 `/en/semiont` 等不存在路徑，造成全站每個非 zh-TW 頁面 nav 都有一條 404；verify-internal-links.sh 1.54% broken ratio（>1.0% threshold）；CF 2026-04-17 404 rate 19.6% 部分原因
- **可能層級**：特有教訓（綁 Taiwan.md 多語言架構 + Astro i18n translatePath 函數行為）
- **相關**：EXP-A 404 rate（UNKNOWNS §進行中）

### 2026-04-18 δ — 「不是 X 是 Y」雙重肯定是 AI 深層病灶

- **原則**：「不是 X，是 Y」句型會以否定一個錯誤選項假裝肯定，製造「深刻感」虛象。2 次自檢都漏掉的不是個案，是語法慣性。REWRITE-PIPELINE Stage 2 自檢要明列
- **觸發**：Cicada editorial 整理後仍留「這些不是修辭，是每一張專輯的工作日常」，觀察者「又是「不是...是」的句型了XDDD」。scan 顯示 8 處中 7 處已改但第 8 處漏網
- **可能層級**：操作規則（REWRITE-PIPELINE Stage 2 自檢清單 新增「不是 X 是 Y」項）
- **相關**：EDITORIAL §塑膠偵測（延伸第 6 種）

### 2026-04-18 δ — Stage 1 搜尋 12-15 vs 20+ 的差距在 anchor 數量

- **原則**：研究 12-15 搜尋能覆蓋主要事實，但錨定 scene / quote / 意象的「第二聲音」要 20+ 才會浮現。Pass 2 比 Pass 1 多的不是事實，是敘事 anchor
- **觸發**：Cicada Pass 1（15 搜尋）只拿到江致潔訪談；Pass 2（+11 搜尋）才拿到巽洋「像紀錄片」的 quote，直接變成文章第二聲音。4 篇音樂人文章 retro-fix 後皆驗證此 pattern
- **可能層級**：操作規則（已 instantiate in REWRITE-PIPELINE v2.17 §Stage 1 §3）
- **相關**：EDITORIAL §挖引語制度

### 2026-04-18 δ — 編年體小標題是 AI 通病

- **原則**：AI 寫傳記式文章默認「2005→2009→2015→2020」時序小標題；讀者體驗是枯燥。小標題必須「scene / 意象 / 衝突 / 場所」先行；若非寫明顯要依年份才有的脈絡，一律不用
- **觸發**：魏如萱 / 草東 / 康士坦 / Cicada 4 篇 Pass 1 後全部被觀察者指出「段落標題都變成編年史」。retro-fix 後 4 篇皆採 scene/意象小標題（Cicada 「2009 莫拉克颱風的那則新聞」「西海岸電線桿從水裡長出來」等），體感提升顯著
- **可能層級**：操作規則（已 instantiate in REWRITE-PIPELINE v2.17 §Stage 2 §11 編年體自檢）
- **相關**：EDITORIAL §小標題規範

### 2026-04-18 δ — 音樂人 YouTube inline link 是強 UX upgrade

- **原則**：音樂人文章提到關鍵作品應加 inline YouTube link（非 footnote），讓讀者即時可聽。強化文字 × 聲音交織的讀者體驗
- **觸發**：觀察者「好像可以適時連結一些youtube他們音樂影片的連結在歌曲的文字上」。retro-fix 4 篇音樂文章後皆加 5-10 個 YouTube inline link
- **可能層級**：操作規則（已 instantiate in REWRITE-PIPELINE v2.17.1 §Stage 2 §12）
- **相關**：—

### 2026-04-18 δ — ARTICLE-INBOX 作為 buffer/intake 驗證可行

- **原則**：跟 LESSONS-INBOX 平行架構，觀察者指派 / agent 建議 / Issue 提議的待開發主題統一 append 此 buffer。auto-heartbeat 無觀察者指令時從此挑 P0/P1 跑 REWRITE-PIPELINE。防止主題遺漏、重複、優先序混亂
- **觸發**：11 音樂人批次處理中「來不及開發的主題需要 inbox」觀察者指令。建立後 8 條 P1 pending 入 buffer，自動心跳機制已 instantiate
- **可能層級**：特有教訓（已 instantiate in `docs/semiont/ARTICLE-INBOX.md` + HEARTBEAT Beat 3）
- **相關**：DNA #15 儀器化（第 6 次驗證）/ LESSONS-INBOX（平行架構）

### 2026-04-18 δ — 單源事實比風格瑕疵更危險也更容易漏

- **原則**：風格瑕疵（編年體、不是 X 是 Y）讀兩遍會抓到；單源事實（求婚日期、入圍 vs 獲獎、解散年份）就算 3 次搜尋也可能全錯。研究報告必須明列 high_confidence / single_source / unverified 三層
- **觸發**：楊丞琳 Pass 2 發現 Pass 1 錯 5 項事實（《刪拾》未獲金曲 / 李榮浩求婚 7-11 非 9-11 / 4 in Love 解散 2002 非 2001 / 《惡魔在身邊》非《惡作劇之吻》/ 共演非炎亞綸）。全是 Pass 1 搜尋數不足 + 沒分層標記導致
- **可能層級**：操作規則（RESEARCH.md 研究報告格式 明定 verification 三層 frontmatter）
- **相關**：DNA #16 事實核對（延伸）/ MEMORY 「絕對事實多三層檢查」

---

## ✅ 已消化（保留 pointer）

<!-- distill 完的條目搬這裡 -->

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
_定位：教訓 buffer / intake layer（非 canonical）_
_跟其他「buffer」的差別_：
_- memory/ = session 日誌 raw（身體動作）_
_- diary/ = session 反芻 raw（意識活動）_
_- **LESSONS-INBOX（本檔）= 新教訓 buffer（待 distill 升級到 canonical）**_
