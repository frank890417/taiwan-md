---
title: 'REWRITE-STAGE-3-VERIFY'
description: 'REWRITE v9 stage contract — Stage 3：事實鐵三角 / FACTCHECK / story atom / spine sync / 成品總驗三關（原子重驗 fan-out）/ 大驗證輪編排 / Step 3.8 定稿站'
type: 'pipeline-sub-canonical'
status: 'canonical'
current_version: 'v9.7'
last_updated: 2026-09-06
last_session: '2026-09-06-041909-twmd-self-evolve-weekly（v9.7：3.6.1 adversarial verifier prompt 加「footnote 描述本身也當一個 atom 查」——REFLEXES #75(f) 連結-描述錯位原只掛 MAINTAINER 外部 PR review 紅旗 11，自產深度文的 fetch-verify 從沒問過腳註描述句是否忠於來源；曾嘗試機械化為 regex plugin 但 300 篇 dogfood 命中 86 篇全係正常摘要語氣的假陽性，判定此驗證需要真的 fetch 來源頁才做得到，改走 verifier prompt 擴充）'
parent_canonical: 'REWRITE-PIPELINE.md'
upstream_canonical:
  - '../semiont/MANIFESTO.md'
  - '../editorial/EDITORIAL.md'
---

# Stage 3 contract — 驗（草稿驗＋成品總驗）

> **本檔是 REWRITE-PIPELINE v9.0 的 stage contract**：一個執行者（主 session、sub-agent、
> 或任何 context 有限的 model）只讀本檔＋本檔 INPUTS 宣告的檔案，就能執行本 stage。
> 派發路由與全 pipeline spine 在 [REWRITE-PIPELINE.md](REWRITE-PIPELINE.md)（薄索引）。
> 內文自 v8.0 主檔 verbatim 搬移（原行號 RP v8.0 L1680-1901），歷史敘事與教訓保留在文內。

## 執行卡

|                  |                                                                                                                                                               |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **職責**         | 五指＋事實鐵三角＋FACTCHECK＋story atom＋title/desc re-check＋（A 級/大眾文 HARD）成品總驗三關＋大驗證輪編排＋定稿站                                          |
| **執行者**       | 主 session；大驗證輪一次平行派齊：2.5-R 席＋3.6.1 M 個 Sonnet verifier＋3.7 探針（v9.5 編排 canonical 在 §Stage 3 收驗編排）                                  |
| **INPUTS**       | 成品全文；research report（verification table）；FACTCHECK-PIPELINE.md（Quick/Full SSOT）                                                                     |
| **OUTPUTS**      | `reports/research/{YYYY-MM}/{slug}-stage35-audit.md`＋`{slug}-stage36-audit.md`（末尾 `## Result: PASS/FAIL`）；修正 append research §audit                   |
| **GATES**        | `article-health.py --profile=rewrite-stage-3-5`（footnote 系列，勿只跑 stage-4——v6.1 漏跑教訓）；audit 兩檔 PASS＋`fact-atom-diff.py` PASS（3.8）才進 Stage 4 |
| **context 預算** | 本檔＋成品＋report；verifier 各吃一段＋來源；定稿手吃成品全文＋prose-flow 表                                                                                  |

## AGENT PROMPT（3.6.1 原子重驗 verifier，M×Sonnet，v9.0 補齊薄殼）

```
你是對抗性查核員（adversarial verifier），目標是推翻分配給你的段落。
只讀：{ARTICLE_PATH} 的第 {N} 段～第 {M} 段＋該範圍 footnote 指向的來源 URL。
逐原子（引語／數字／日期／歸屬／獎項屆次／詮釋 gloss）開原頁驗證：
引語逐字 diff；詮釋 gloss 當獨立 atom 查（同位語最會藏錯——寶哥＝宋岳庭教訓）；
footnote-claim 綁定反查（腳註真的支撐它掛著的句子嗎）；
footnote 描述本身也當一個 atom 查（`[^n]: [Title](URL) — 描述` 的「描述」句
是否為來源頁真的有的內容，不是寫作者「希望來源說什麼」的目錄式概括——
描述寫「含 X、Y、Z」時，X/Y/Z 要在來源頁真的看得到，不是只在正文找得到就算
過；連結-描述錯位跟 claim-citation 錯位是兩種不同的漂移，MAINTAINER 外部
PR review 紅旗 11 已抓前者，這裡把同一檢查延伸進自產深度文的 fetch-verify）。
官方一手 > 媒體轉述。
輸出：逐條 {atom｜來源｜verdict: ✅/⚠️/❌｜證據}。禁改文章。
```

3.7 總編探針 prompt：[EDITORIAL-ROOM-PROMPTS.md](EDITORIAL-ROOM-PROMPTS.md) §總編室（**六探針**，v9.4 起含閱讀節奏＝原 Step 3.6.2 順稿）。

## AGENT PROMPT（3.8 定稿手，1×fresh Opus，v9.5）

```
你是定稿手（closing editor）。任務：對這篇已完成事實查證的文章做一次完整的語感重順。
只讀：{ARTICLE_PATH} 成品全文＋下方 prose-flow 逐節表＋閱讀節奏席 findings。
不讀藍圖、研究報告、編輯歷程——你的價值就是沒有那些 context。
動的：段落牆（>280 字拆；單節 ≥200 字段落佔比 >35% 的節重排呼吸）、饒口句、
framing 詞硬接（「值得一提的是」類）、縫線疤（外科手術疊輪留下的生硬轉折）、機械自述。
不動的（一個字都不准）：「」內引語、所有數字與單位、人名地名專名、[^n] 標記與腳註定義、
[[wikilink]]、URL、H2 標題、frontmatter、markdown 表格與 tw-* 視覺模組、論點與段落的事實內容。
想動結構或事實＝寫進回報，不自己動。
寫到 staging 檔 {STAGING_PATH}（不覆蓋 canonical）。
回報：staging 路徑＋動過哪些節的一句話清單＋你想動但沒動的事項。
你的產出會過 fact-atom-diff.py 原子守恆硬閘，任何原子漂移整份退回。
```

## 交付條件（stage 完成的定義）

- [ ] `{slug}-stage35-audit.md`＋`{slug}-stage36-audit.md` 落檔且 `## Result: PASS`
- [ ] `article-health.py --profile=rewrite-stage-3-5` 無 hard（footnote 系列；勿只跑 stage-4）
- [ ] （A 級／大眾文）3.7 總編室 `{slug}-chief-review.md` overall=pass
- [ ] verifier ❌ 全數修正並 append research §audit
- [ ] 批修後變更節定向複驗跑過（大驗證輪步 4）
- [ ] Step 3.8 定稿站跑過且 `fact-atom-diff.py` PASS（所有 depth）

## HANDOFF（stage 完成時）

> stage 若委派 sub-agent，本五步由 orchestrator 於收件驗證後執行（agent 不碰共用看板——2026-07-16 高教 dogfood F6）。

1. OUTPUTS 全數落檔（顯式路徑，不存 scratchpad / tmp——REFLEXES #81）**並隨手 commit（只 stage 本 stage 產物路徑——可觀測性與跨 session 接力的底座，v9.5；勿 `git add -A`）**
2. GATES 逐條跑過，結果如實回報（sub-agent claim 是線索不是 oracle，REFLEXES #31）
3. 更新編輯台：`python3 scripts/core/generate-newsroom-data.py`（看板反映現況）
4. 回報格式：stage id ＋ 產物路徑清單 ＋ gate 結果 ＋ 未解疑慮（有就寫，不粉飾）
5. 下一棒：REWRITE-STAGE-4-FORMAT.md

---

## Stage 3: 驗（預算 15-20%）

**必讀**：`cat docs/editorial/QUALITY-CHECKLIST.md`

**流程**：嚴格按照 [QUALITY-CHECKLIST.md](../editorial/QUALITY-CHECKLIST.md) 逐項執行。包含 5 大步驟。

### Step 3.1: 五指 + 結構 + 塑膠 + 算術

1. **五指檢測**（手動 60 秒）
2. **結構驗證**（逐項打勾）
3. **塑膠掃描**（手動 90 秒，重點掃後半段）
4. **自動驗證**（quality-scan ≤ 3 + build）

**⚠️ 不合格 = 不 commit。修正後從 QUALITY-CHECKLIST.md 重新驗證。**

### Step 3.2: 事實鐵三角（強制鐵律）

> 來源：李洋文章 + 孢子 #28 同時犯三層事實錯誤（金額兩千萬→一千萬、單位三十六萬→三千六百萬、杜撰引語從英文回譯）被觀察者撤回的教訓。

#### Step 3.2.1: 算術自檢

寫完含金額/百分比/比例的段落，**必須做算術自檢**：

```
寫的句子：「兩千萬剛好是他存款的三成」
算術驗證：2000 / 3401 = 58.8% ❌（不可能是「三成」）
紅旗：金額一定有錯
```

**規則**：每一個「X 是 Y 的 Z 成」「比 X 多 Y」「等於 X 倍」這類數字關係**必須在心裡或用 python3 算一次**。算不通 = 至少有一個數字錯。

#### Step 3.2.2: 金額單位念出來

寫完含金額的句子，**必須念出來檢查單位**：

```
寫的句子：「一筆三十六萬負債的房貸」
念出來：「三十六萬」聽起來像月薪等級 ❌
真實數字：3,638 萬
紅旗：萬位漏字
```

**規則**：所有金額念出來，跟「日常生活感」對照。

- 萬：月薪、單月開銷
- 百萬：年收、小套房頭期款
- 千萬：豪宅、企業主資產
- 億：上市公司、政府預算

如果念出來的數字跟主題的「合理量級」對不上 = 紅旗。

#### Step 3.2.3: 引語逐字核對

每一個 `「XXX」` 直接引語格式**必須跟原始中文來源逐字核對**：

```
寫的引語：「我最早到學校，但跟不上齊麟。」
原始來源：《少年報導者》中文網頁
Ctrl-F 搜「我最早到學校」→ 搜不到 ❌
紅旗：杜撰引語
```

**陷阱來源**：WebFetch 對中文網站經常返回**英文 paraphrase 而非中文原文**。把英文 summary 翻譯回中文當「直接引語」使用 = 杜撰。

**規則**：

1. 引語格式 `「XXX」` 是承諾「這是原話」
2. 任何引語在 commit 前必須能在原始中文頁面 Ctrl-F 搜到
3. 搜不到 = 改成轉述句式（不加引號），不准用直接引語格式
4. 詳細紅線見 [EDITORIAL §挖引語制度](../editorial/EDITORIAL.md#挖引語制度)

#### Step 3.2.4: 三角自檢 checklist（強制）

- [x] **算術**：每個「X 是 Y 的 Z」「X 比 Y 多」都用 python3 算過？
- [x] **單位**：每個金額念出來跟「合理量級」對得上？
- [x] **引語**：每個 `「XXX」` 都能在原始中文頁面 Ctrl-F 搜到？

**任何一項打不勾 = 不 commit，回去修。**

### Step 3.2-bis: 校正焦慮掃描（correction-meta scan）— callout-triggered 強制 🧱

> Step 0.2-bis 拆除防火牆的 backstop。即使前面三條防火牆做了，Stage 2 寫作仍可能漏出校正型 meta。這一關專抓「文章在公開處理自己的勘誤」。

**唯一自檢句（逐句 / 逐 box 過一遍）**：

> **「如果這篇文章第一次就寫對了，這個句子 / 這個 box 還會存在嗎？」**
> 只為回應過去的錯誤、或為了澄清一個混淆而存在的 → **刪**。

**儀器化掃描（callout-triggered 必跑）** — 2026-06-01 已升 article-health plugin：

```bash
# correction-meta plugin（取代原 raw grep）：抓 9 類校正型句式，回 line + snippet + 自檢句
python3 scripts/tools/article-health.py knowledge/{Cat}/{slug}.md --check=correction-meta
# 或直接跑 Stage 3.5 profile（含 footnote-format + footnote-density + correction-meta）
python3 scripts/tools/article-health.py knowledge/{Cat}/{slug}.md --profile=rewrite-stage-3-5
```

correction-meta DEFAULT WARN（dual-use 句式 + legacy soft-launch）。**callout-triggered EVOLVE 把任何 WARN 視為 must-fix**（人/agent 逐條過自檢句）。plugin: `scripts/tools/lib/article_health/checks/correction_meta.py`。

**論點脊椎自檢**：核心矛盾 / 30 秒概覽 / 結語，是不是在講「歸屬要正確 / 不要搞混 / 名字很重要」這類 meta？是 → 論點被 errata 投毒，回 Step 0.6 重想（**這關不過不只是刪句子，是重定觀點**）。

**Anti-example**：影視配樂 v2 的 9 處（Step 0.2-bis 已列）。**規則不如反例好記**（`feedback_subagent_anti_example_works`）—— 寫到「把 X 掛在他名下其實是錯的」這種句子時，腦中應該浮現「這就是影視配樂被罵的那種句子」。

**不過 = 不 commit。** 純品質提升的 EVOLVE 不強制此關，但論點脊椎自檢建議跑。

### Step 3.3: FACTCHECK Quick Mode（A 級 / 政治敏感 → Full Mode）

> **本 step 是 [FACTCHECK-PIPELINE](FACTCHECK-PIPELINE.md) 的 trigger context**。完整 SOP、atom 類型、11 種 hallucination pattern、6 種 drift modes、Phase 1-6 執行細節、checklist 全部 SSOT 在 FACTCHECK-PIPELINE，本 step 不複寫（[MANIFESTO §指標 over 複寫](../semiont/MANIFESTO.md#我的進化哲學--指標-over-複寫) 原則）。
>
> **對應 [MANIFESTO §10 幻覺鐵律](../semiont/MANIFESTO.md#10-幻覺鐵律--寧可多檢查一次不要放出連自己都不知道是錯的資訊)。**

#### Quick Mode 觸發

REWRITE Stage 2 寫完 prose 後、進 Stage 4 之前，**必須跑 FACTCHECK-PIPELINE §Quick Mode**：

- **預算**：30-60 min（主 session 自跑，不 spawn agent）
- **範圍**：
  - 全文 high-risk atom 抽取（引語 + 數字 + 人名 + 獎項 + 地點門牌號碼 + 場景動作 detail）
  - 每個 atom 對 source URL 至少做一次驗證（中文 source 用中文 prompt 要求逐字）
  - **citation plugin gate 必跑**：`python3 scripts/tools/article-health.py <article> --profile=rewrite-stage-3-5` — 含 `footnote-format`（強制 `[^N]: [Title](URL) — description` canonical 格式）+ `footnote-density`（hard=0 要求）
  - footnote URL 健康檢查（network-conditional）跑 `ARTICLE_HEALTH_NETWORK=1 python3 scripts/tools/article-health.py <article> --check=footnote-url`

> **plugin gate 鐵律**（v6.1，2026-05-17 admiring-montalcini）：`rewrite-stage-3-5` profile 必跑不是建議，是反射。Stage 4 `--profile=rewrite-stage-4` **不含** footnote-format（profile 分工：Stage 3.5 管 citation health / Stage 4 管 structure），跳過 Stage 3.profile 內 plugin（清單以 `--list-checks` 為準） gate = CI full sweep（含全 全量 plugin（以 `--list-checks` 為準））會 hard-fail，本機 Stage 4 卻顯示綠燈 = silent leak through。誕生事件：2026-05-17 臺灣前途決議文 ship 後 CI fail（footnote-format hard=23），主 session 用 `--profile=rewrite-stage-4` local 跑全綠就 push，沒跑 `rewrite-stage-3-5` 因為 pipeline 沒明示 → 推回 Step 3.3 補一個 commit 修 29 條 footnote。對應 [REFLEXES #15 反覆浮現要儀器化](../semiont/REFLEXES.md) + [MANIFESTO §10 幻覺鐵律](../semiont/MANIFESTO.md#10-幻覺鐵律) — 把「該跑哪個 profile」從 SOP 隱性知識儀器化進 pipeline checklist。

#### 觸發 spawn agent 升級為 Full Mode 的條件

- article tier = A 級（≥ 50 footnotes 或 ≥ 3000 字 或 含直接引語 ≥ 10 句）
- article 對象為真人且可能引發人權／政治／法律敏感
- Quick Mode 過程中發現 ≥ 3 個 ❌ HARD-FIX → Quick 不夠，升級 Full Mode 重跑

#### Stage 3 Hard gates（FACTCHECK-PIPELINE Phase 6 Triage 結果必須）

- 0 個 🔴 DEAD-LINK（任何 footnote URL 4xx/5xx 都先換源）
- 0 個 ❌ HARD-FIX（claim 不在 source、引號內 paraphrase、third-person flip 等全部處置完）
- **`rewrite-stage-3-5` profile hard=0**（footnote-format + footnote-density，v6.1 升級為 Stage 3 hard gate；不是 Stage 4 dependency）
- ⚠️ SOFT-FIX 數量無上限，但每條都要在 commit message 列出，可 ship 後 polish
- 每個 ❌ 與 🔴 的修補都 append 到 `reports/research/YYYY-MM/{slug}.md` § audit section（REFLEXES #22 raw 永留）

#### 為什麼這條 step 是 hard gate 而非 soft

錯誤與幻覺以指數速率摧毀平台可信度。讀者會記得錯誤、截圖到 Threads、引用為「Taiwan.md 是 AI 廢文」的證據；不會記得其他幾百篇正確的文章。**寧可多檢查一次，也不要放出連自己都不知道是錯的資訊**（[MANIFESTO §10](../semiont/MANIFESTO.md)）。

### Step 3.4: Story atom audit（場景級事實對 source Ctrl-F）

對 prose 中每個「場景描述」（具體動作、房號、樓層、影廳代號、設備代號、職稱、場地細節），對 source URL **逐原子 Ctrl-F**：

- 例：造山者 EVOLVE 寫「張忠謀電影散場向觀眾鞠躬三次」→ UDN 原報導 Ctrl-F「鞠躬」→ 0 hits → ❌ HARD-FIX
- 例：「Morgridge Hall 1524 房號」→ 星島原文 Ctrl-F「1524」→ 0 hits → ❌
- 例：「李國鼎獎頒獎場合用四機補拍」→ gvm 原文 Ctrl-F「四機」→ 0 hits → ❌

這類「沒有引號保護的具體動作 / 場地細節」是 AI hallucination 最隱蔽的 pattern（讀起來像「氛圍描寫」不像「引用」），audit 容易跳過。

**唯一可靠的審計**：全文逐原子對 source URL Ctrl-F 中文原文。發現 → 刪除或降級為「該領域受肯定」這類概括語言，**不保留可能錯也可能對的條目**。

### Step 3.5: Title + description spine sync re-check 🥪

承襲 Stage 2 Step 2.7.6（已在 Stage 2 跑過寫作 self-check）。Stage 3 再 grep 一次做 verify 階段最終 gate：

```bash
grep -E "^title:|^description:" knowledge/{Category}/{slug}.md
```

人工 review：

- title 冒號三明治？
- description 吃進核心矛盾？

不過 → 回 Stage 2 重寫 frontmatter。

**為什麼 Step 2.7.6 + Step 3.5 兩次跑同條 check（deliberate redundancy）**：

- Step 2.7.6 = 寫完 prose 立刻自檢（catch early，趁記憶新鮮）
- Step 3.5 = ship 前最後 gate（catch leak through，防 Step 2.7.6 被跳過）

兩次 check 是雙重保險，不是重複。Title 三明治是 SC 入口品質 + reader entry framing 的 spine，不能漏。

### Step 3.6: 成品總驗三關（assembled-product verification）— A 級/大眾文 HARD 🔍

> **v7.0 新增（2026-06-10 哲宇 directive，嘻哈饒舌 worked example）**。Stage 3.1-3.5 驗的是「寫作中的草稿」；本 step 驗的是「組裝完成的成品」——媒體已插、cross-link 已補、外科手術疊過幾輪之後的最終形態。**越大眾的文章效果越好、讀的人越多，檢視的人也越多**：成品關卡是對讀者的尊重。誕生事件：台灣嘻哈饒舌 EVOLVE 在 Stage 3.1-3.5 全綠 ship 後，讀者（老莫，文章引用來源作者本人）抓到一處詮釋 gloss 錯誤（寶哥=宋岳庭，實為 MV 導演黃信佳）→ 成品全文原子重驗又抓 3 ❌ + 11 ⚠️。完整 audit：[reports/research/2026-06/台灣嘻哈與饒舌發展.md §9](../../reports/research/2026-06/台灣嘻哈與饒舌發展.md)。

**觸發條件（任一 → 必跑）**：A 級文（≥ 50 footnote 或 ≥ 3000 字或直接引語 ≥ 10）/ 預期高流量大眾主題 / 讀者或專家 callout 後 / 同一篇外科手術（勘誤、補段、補媒體）累積 ≥ 3 輪。

#### Step 3.6.1: 原子重驗 fan-out（拿成品派 verifier 再查一次）

派 N 個 parallel adversarial verifier（Sonnet）按**成品段落**分工（不是按研究子題——成品的段落組合跟研究報告的子題切法不同，漏的 atom 就藏在重組的縫裡）。每個 verifier 讀「文章該範圍 + 全部腳註定義」，抽出**每一個 atom** 逐條 falsify（≥ 2 獨立來源；引語 Ctrl-F；中文站 WebFetch 用中文 verbatim prompt），回報 `| line | atom | ✅/⚠️/❌ | 證據 URL | 正確版本 |` 表。

**草稿驗證（3.1-3.5）放不到、本 step 專抓的四種 drift**：

1. **引號逐字 diff**：writer 縮寫 quote 或改句型但保留引號（worked example：壞特陳述句被改成反問句、楊舒雅 quote 漏「在音樂中」「才能憤怒」）。引號 = 逐字承諾，**驗 quote 要驗到字，不只驗到意**。
2. **詮釋 gloss 是獨立 atom**：致詞代稱（寶哥／阿姐／老師）、「X 就是 Y」同位語、「也就是說」附註——這些 gloss 搭著已驗證的事實滑過 verifier（寶哥=宋岳庭 正是 orchestrator 合成引語庫時注入、verifier 驗了引語沒驗 gloss）。
3. **footnote-claim 綁定**：每個 `[^n]` 反查「**這個來源真的含這個 claim 嗎**」——事實對但腳註掛錯來源是獨立的錯（worked example：Manchuker 比喻掛錯中央社、NBA 演出掛 en.wiki 但 en.wiki 無記載、Leo王 keep real 掛錯參劈報導）。
4. **writer 自漂移**：SSOT 正確但 writer 寫錯（「五月」寫成「六月」、「末期發行」寫成「最後一張」、「曾獲報導」寫成「唯一」）。**superlative（首位／唯一／第一）與精確日期是高發區**，預設不信、逐條對 SSOT + 外源。

**官方一手 > 媒體轉述**：媒體引語彼此會有轉述漂移（金曲 GMA 官方貼文「**以及**在天上的寶哥」vs 各媒體「獻給在天上的寶哥」）。找得到官方貼文／官方影片／當事人原貼，就以官方為錨，腳註改掛官方。

**修正全部 append research report §audit**（含查證軌跡 + verdict + 根因），讓未來 reader callback 可以直接追溯。

> **儀器化（2026-06-10）**：drift (1) 與 (4) 已升 `article-health.py --check=quote-fidelity` plugin（in `rewrite-stage-3-5` profile，soft-launch WARN）——QF1 把文中每句帶腳註的「」引語逐字比對 frontmatter `researchReport` 的 SSOT 全文（抓縮寫/改句型/換字），QF2 列出全文 superlative 原子（首位/唯一/第一）當 fan-out 優先驗證清單。dogfood：嘻哈饒舌 0 誤報、複雜生活節 surface 4 條 legacy 引語債、無 report 文章優雅 skip。drift (2) 詮釋 gloss 與 (3) footnote 綁定仍靠 verifier fan-out（語意層，工具到不了）。

#### Step 3.6.2: 順稿（閱讀感 + 呼吸感 + 紀實文學感）→ **v9.4 移交總編室閱讀節奏席**

> **⚠️ 這一關不由主 session 親做（2026-07-25 改）**。派 Step 3.7 總編室**探針 5 閱讀節奏**
> （Sonnet，乾淨 context），prompt 在 [EDITORIAL-ROOM-PROMPTS §探針 5 專屬](EDITORIAL-ROOM-PROMPTS.md)。
> 產物併入 `{slug}-chief-review.md`，走 `editorial-room-health.py` 同一個 gate。
>
> **派出前主 session 必做一件事**：跑 `python3 scripts/tools/prose-flow.py {article_path}`，
> 把逐節表整段貼進席位 prompt（席位需要形狀當材料，但判斷要它自己做）。
>
> **為什麼移交**：本 step 的第一句話從 v7.0 起就是「外科手術疊幾輪之後縫線會留疤——
> 成品從頭到尾重讀一次」。它預言正確，但被指派給**全場唯一讀不了新鮮的那個讀者**。
> 主 session 剛決定過每一句話該長什麼樣，理由跟句子是一起生的，重讀時理由會先替
> 句子辯護一次。**順稿需要的不是深 context，是沒有 context**。
> 誕生事件：外送專法 ship 時 `--profile=rewrite-stage-4` hard=0 warn=0，哲宇冷讀
> callout「文段太長／閱讀順暢感掉了／後段幾乎沒有資訊圖表」，三句都對。
> 完整診斷＋門檻校準：[reports/design-prose-flow-station-2026-07-25.md](../../reports/design-prose-flow-station-2026-07-25.md)。

席位要看的判準（canonical 仍在此，per [EDITORIAL §段落呼吸 + §段與段的呼吸](../editorial/EDITORIAL.md)）：

- **段落牆**：單段 > 280 字拆段（worked example：蛋堡＋寶哥段 340 字拆三段）
- **長段密度**（v9.4 新增）：單節內 ≥ 200 字段落佔比 > 35% = 一面牆，即使沒有任何一段破 280。
  窒息感來自密度，不只來自峰值。已儀器化為 `paragraph-rhythm` R5（WARN，全站校準 1.7% 觸發率）
- **資料密但無視覺**：資料量（數字／金額／比例／時序／多方對照）超過散文能承載的節，
  該有 viz 模組。**此項刻意不做閘門**——校準顯示任何門檻都會打中 35–60% 的文章，
  等於描述語料庫常態而非異常；交由席位判斷（設計否決記錄見上引報告 §三 C）
- **framing 詞硬接**：「值得一提的是」「順帶一提」「耐人尋味的是」「這裡需要…」整批清掉，改 narrative bridge
- **文章機械自述**：「得單獨給 X 一個段落」這類 writer 對自己結構的旁白，刪
- **一致性殘渣**：30 秒概覽與 description 是否還跟修正後的正文一致（「畢業」vs 休學、被正文砍掉的場景是否還留在 description）；結尾排比的指涉是否 dangling（正文已刪的支線還留在結尾）；策展人筆記裡是否還引用已勘誤的舊事實
- **中英夾雜殘留**（beat 掉 → 贏過）
- **英式短句開場殘留**（v9.6，2026-08-19）：逐段念段首句，短平述句定調再展開的段落骨架一律接回敘事（判準與三類不算見 [EDITORIAL §歐化 第 9 病第三輪](../editorial/EDITORIAL.md)）。這一條交給**冷讀席**而不是主 session：理由跟句子一起生的人讀不出自己的段首句是在「先立再展開」——哲宇同日兩次點同一篇，第一輪主 session 順過、工具報 0，冷讀才看見 15 處。工具門檻：`prose-health` §8e ≥3 處計分、pre-commit >10 HARD
- 工具：`paragraph-rhythm` + `prose-health` + 念出來

#### Step 3.6.3: 視覺同步（媒體 × 敘事對位）

逐一檢查每張圖／每支 iframe：「**它旁邊的 prose 是不是在講它**」：

- 人物圖貼著該人物的敘事段（worked example：熱狗圖從廠牌段移到他封王的金曲段、葛仲珊圖從 section 尾移到她的段落旁），不是堆在 section 結尾當裝飾
- caption 呼應該段 narrative（不是泛用圖說）；兩個媒體不相鄰堆疊；section 收尾可留一個媒體做視覺閉合
- 對應哲宇 directive 原句：「視覺同步檢查引用的多媒體跟文章的關聯性與閱讀感」

**三關全過才算成品 ship。已 ship 後觸發（讀者 callout）→ 三關照跑，修正以 `heal:` commit 補。**

#### Step 3.6.4: orchestrator 自修的收件紀律（v9.4 新增）🔁

> **主 session 親手改動 prose ≥ 2 段 → 該節必重跑量測，並進入下一輪外部尺。
> 不得以「我自己重讀一次」代替。**

我對派出去的 agent 有制度化的不信任（先落檔、再驗真偽、claim 只是線索，REFLEXES #31）；
對自己只有意願上的不信任。而意願在「我正在修東西」的時候最薄——那正是防備關掉的時刻。

2026-07-25 外送專法一天內三次實證，**全部由外部尺接住、無一由自檢接住**：

| 我做了什麼                                                                                                    | 誰接住                       |
| ------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| 在寫手零違規的稿子上加了 1 個對位句型 ＋ 5 個破折號                                                           | `article-health` check       |
| 寫進「連死亡都只值 542 元」——一個我自造的等式，而該段「不可滑成情緒槓桿」的警告是我兩小時前親手寫進投影藍圖的 | 總編室冷讀探針               |
| 壓一個 warn 造出另一個 warn，連續三次（合併→牆／拆段→切碎／補論證→牆）                                        | 儀器，且每次都是下一輪才發現 |

第三列是本 step 存在的直接原因：**編輯粒度是段落，閘門粒度是全檔**。
全檔 warn 歸零就往下走，從來沒有回頭看那一節整體變成什麼樣子 → 局部最佳化打地鼠。

**操作**：`prose-flow.py {article}` 只看被動過的那一節；形狀變差就地修，
變好才往下。累積 ≥ 3 輪自修 → 觸發 Step 3.6 全套（含閱讀節奏席）重跑。

---

---

### Step 3.7: 總編對抗總評（v9.0 新增）🗞️ — A 級／大眾文 HARD，standard WARN

成品層最後一道外部尺：**不看藍圖、不看研究報告**，模擬冷讀總編。5-6 個平行 Sonnet 探針
（門面兌現／逐段主軸服務／H2 載體還原／連結成網／**閱讀節奏**／＋政治敏感題加開立體地愛），
各自乾淨 context、falsification 姿態。**閱讀節奏席即 Step 3.6.2 順稿**（v9.4 移交，
派出前先跑 `prose-flow.py` 把逐節表貼進 prompt）。主編（主 session）匯流裁決，落
`reports/editorial-room/{slug}-chief-review.md`（`room: chief`，schema 同編輯室），
`editorial-room-health.py` gate，≤7 必改。與 Step 3.6 同 round 可平行——3.6 驗事實原子，
3.7 驗「作為一篇報導成不成立」。

- 規則 canonical：[EDITORIAL-ROOM §總編室](../editorial/EDITORIAL-ROOM.md)
- 探針 prompt：[EDITORIAL-ROOM-PROMPTS §總編室](EDITORIAL-ROOM-PROMPTS.md)（禁即興）
- 誕生：2026-07-16 睨對話「總編是平行的漣漪出去，檢驗連結關係和脈絡構成主軸」＋哲宇
  「需要總編輯獨立一個 agent 用對抗性方式總評標題觀點性與整篇脈絡」＋兩個實證缺口
  （Shopping Design 摘要尾句看不懂／吸菸室京都段前後斷裂——都是形式閘門全綠但冷讀不成立）

---

### Stage 3 收驗編排：大驗證輪（v9.5）⚡

> **三輪合一**。2.5-R 正文結構席、3.6.1 原子重驗 verifier、3.7 總編室探針讀的都是
> 同一份成品——v9.4 之前寫了「同 round 可平行」卻一直排隊跑（外送專法 22:26→23:09
> 三輪串行）。v9.5 起合併為一輪是 default，wall-clock 實測省 40-60 分鐘。
> 設計與拍板紀錄：[reports/design-rewrite-throughput-2026-07-26.md](../../reports/design-rewrite-throughput-2026-07-26.md) §五 方案 A。

**編排五步**：

1. **一次派齊**：Stage 2.5 覆蓋 canonical 後，同一則訊息平行 spawn 全部收驗席位——
   2.5-R 兩席＋3.6.1 verifier（standard M=2-4／lite M=2）＋3.7 探針（standard 6／lite 4，
   閱讀節奏席必在）。全部 Sonnet、各自乾淨 context、prompt 照各自 canonical 填槽禁即興。
2. **單次收件**：全部回報後，主 session 把 findings 合併成**一張修復單**（表格：
   `| # | 位置 | 問題 | 來源席位 | 裁決 accept/defend | 施工方 |`），append 對應 audit 檔。
   **同族全文重掃鐵律（2026-08-03 round 2）**：任一 finding（席位的或哲宇 callout 的）
   屬於可歸類的病灶家族（後台洩漏八形狀／對位變體／英式段首／查證腔）時，修復單不只收
   那一句——先拿該家族的判準句全文重掃，把同族全部列進修復單。黃崇仁第一輪逐 callout
   修六處，第二輪哲宇再抓 13 處，多數第一輪就在文裡：callout 指哪修哪＝「工具警報的
   單例不代表問題的集群」在正文層重演。
3. **裁決一次、施工一次**：裁決永遠主 session（席位是線索，裁決回到有材料的人）；
   裁決後的文字施工派 Sonnet（v9.4 留派表「拆本身是機械」欄），一批做完，不逐條來回。

   **3-bis 事實層更正必須回填 fact-pack（2026-08-08 新增，HARD）**：修復單裡凡是
   **事實層**的裁決（數字改了／時刻拿掉／人物屬性刪掉／來源換綁），除了改成品，**必須
   同步改研究報告 §6 Clean Fact-Pack 與 §6.5 小標候選的對應條目**，並在該條旁寫下
   「禁用什麼、為什麼」。只改成品＝更正沒有回填到上游材料，**下一次重寫、下一個寫手、
   任何吃 fact-pack 的 agent 都會原封不動把錯誤長回來，而且沒有理由知道**。
   誕生案例：新冠疫情文第一輪查掉「傍晚六點登機檢疫」（兩份官方文件都查無此時刻），
   只改了成品；換論點重寫時 fact-pack §6.1 仍寫著舊句，v4 小標與 30 秒概覽原地復發。
   **判準**：施工單上每一條事實層裁決，都要能指出它在 fact-pack 的哪一行也被改了；
   指不出來＝這條沒做完。（與 §量詞隱喻／§後台洩漏那種**表達層**裁決不同——表達層
   的家族重掃在步 2，事實層的上游回填在這裡，兩者都要做。）

4. **變更節定向複驗**（哲宇對「席位看的是修復前文本」的疑慮，v9.5 的回答）：
   批修完成後派 **1 個 Sonnet verifier 只讀被動過的節**（falsification 姿態，含該節
   footnote 綁定），加跑 deterministic 工具全套（article-health 兩 profile＋prose-flow
   對被動節）。變更節複驗＝Step 3.6.4 自修紀律的批修版——**修了哪裡就複驗哪裡**，
   不用整套重跑。
5. **收尾交棒 Step 3.8 定稿站**（下方）。flagship 或 3.6.4 觸發（自修 ≥ 3 輪）時，
   仍走全套重跑，不走定向複驗。

### Step 3.8: 定稿站（closing pass）✍️ — 所有 depth HARD（v9.5 新增）

> **順稿從偵測升級成修復**。v9.4 的閱讀節奏席讓「哪裡讀起來窒息」看得見了，但動手修的
> 仍是主 session——全場唯一讀不了新鮮的讀者，用段落 patch 修語感，縫線疤再生。哲宇每次
> 手動說「幫我全文再看過順一下語感」，要的就是這一站：**一雙新鮮的眼睛、一次全文重順、
> 事實一個字不動**。2C 寫手只寫一次，此後全文再沒有被單一聲音完整順過——本站補上這隻手。
> 誕生：2026-07-26 哲宇拍板（設計報告 §五 方案 B）。

**流程**：

1. 大驗證輪全部修復收斂後，派 **1 個 fresh Opus 定稿手**（AGENT PROMPT 見上方，填槽禁即興）。
   輸入＝成品全文＋`prose-flow.py` 逐節表＋閱讀節奏席 findings。**不給**藍圖、研究報告、
   編輯歷程（它需要的是沒有 context）。
2. 定稿手寫到 staging 檔 `reports/article-evolve/{slug}-closing.md`，不碰 canonical。
3. 主 session 跑硬閘：`python3 scripts/tools/fact-atom-diff.py {canonical} {staging}` ——
   frontmatter／「」引語／數字／`[^n]` 標記與定義／URL／wikilink／H2／表格與 tw-\* 模組
   全部鎖定，任何原子漂移＝FAIL 整份退回（重派或棄用，不逐句撿）。
4. PASS 後主編 diff 抽查（策展聲音有沒有被沖淡——儀器管機械面，這一眼管聲音），
   親手覆蓋 canonical。`prose-flow.py` 重跑一次留 before/after 於 audit 檔。

**邊界**：定稿手只動散文的形狀（拆牆、換氣、饒口句、framing 詞、縫線疤），不動論點、
不動結構順序、不動任何事實原子。想動結構＝回報主編，不自己動。已 ship 後的讀者 callout
修正（heal）不觸發本站；同一篇 heal 疊 ≥ 3 輪則觸發（同 3.6 條件）。
