# GSC × Gemini Review — Taiwan.md 儀器化 Gap Audit

> **Date**: 2026-05-09
> **Session**: laughing-goldstine
> **Triggered by**: 觀察者貼出 Gemini 對 Taiwan.md GSC（Google Search Console）三月窗數據的分析對話，問「哪些能儀器化進化 DNA / pipeline」
> **Status**: 📋 audit 完成 → LESSONS-INBOX 已歸檔；後續實作排在下個 EVOLVE-PIPELINE round 跟觀察者一起決定優先序

---

## 0. Context — 為什麼這份報告存在

2026-05-09 觀察者把跟 Gemini 的 GSC review 對話貼進 session，內容有兩段：

1. **三月窗 GSC 數據分析**（4,716 點擊 / 30.5 萬曝光 / 1.5% CTR / 平均排名 7.4），含 5 月初曝光與點擊雙跑成的健康趨勢、3 月異常峰值的 root cause 推測（特定長尾或品牌字爆紅）
2. **百科/媒體網站三階段成長軌跡**（起步 → 中型 → 大型），含每階段點擊/曝光標準、時間軸（0-1y / 1-2.5y / 3-5y）、各階段策略重點

觀察者明示：「**完整分析，看哪些能儀器化進化 DNA / pipeline 之類的**」。

這份報告是這次分析的歸檔，避免 strategic 洞察隨 session context 蒸發。後續實作排序在報告 §6。

---

## 1. Gemini 分析摘要

### 1.1 三月窗整體表現

| 指標     | 數據    | Gemini 判讀            |
| -------- | ------- | ---------------------- |
| 總點擊   | 4,716   | 累積實質流量不錯       |
| 曝光     | 30.5 萬 | 基數很大，能見度高     |
| CTR      | 1.5%    | 中等水準，有優化空間   |
| 平均排名 | 7.4     | 第一頁中後段，相當優異 |

### 1.2 近期趨勢（4 月下旬 - 5 月初）

- 曝光強勢攀升：4 月中低谷 → 5 月初創區間新高（接近單日 1.5 萬曝光）
- 點擊健康成長：與曝光同步爬升
- 「曝光 + 點擊雙跑成」= 全面性、可持續的自然流量增長
- 3 月份點擊暴增但曝光沒同步 = 偶發爆紅（特定長尾或品牌字），不是健康基本面

### 1.3 五大優化建議

1. **找高曝光低點擊關鍵字** (rank 4-10 + CTR < 1.5%) → 優化 title/description
2. **拆解 3 月份成功經驗** (3/16-3/22 異常峰值) → 找出爆紅 query/page → 撰寫延伸內容
3. **導入結構化資料 (Schema Markup)** Article + FAQ + Breadcrumb → 爭取特殊版面
4. **強化內部連結網** (百科最強 SEO 武器) → 降跳出率 + 傳遞權重
5. **佈局長尾關鍵字集群 (Topic Clusters)** → 主題集群 + 子文章互連

### 1.4 媒體/百科視角的判讀

| 量級                  | 月點擊       | 月曝光           | 特徵                               |
| --------------------- | ------------ | ---------------- | ---------------------------------- |
| **當前（起步/利基）** | 約 1,500     | 約 10 萬         | 內容具品質、特定小眾關鍵字優勢     |
| **中型媒體/百科**     | 5 萬 - 30 萬 | 200 萬 - 1000 萬 | 特定產業權威、Google Discover 推薦 |
| **大型媒體/綜合百科** | 100 萬+      | 5000 萬+         | 高網域權重、品牌字 + 新聞時效流量  |

### 1.5 三階段時間軸

**第一階段（0-1 年）深耕**：100-300 篇高質量核心、確立主題權威、月點擊 0-1 萬 / 平均排名穩定第一頁
**第二階段（1-2.5 年）擴張**：1000+ 篇、Topic Clusters 擴展、Google News + Discover 啟動、月點擊 1-10 萬 / 出現飛輪效應
**第三階段（3-5 年+）規模化**：UGC/編輯團隊、品牌建設、月點擊百萬級、技術 SEO（Crawl Budget / 速度 / 架構）

---

## 2. Taiwan.md 現有 cover audit

### 2.1 已 cover 的部分

| 範疇                                       | 既有資產                                                                                                   | 對應 Gemini 建議                                 |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| Memory「Search Strategy」                  | "Focus on Google Search (steady growth), abandon Discover (zeroed since 3/25). CTR 1.3%→3% is the target." | 跟 Gemini「優化 CTR」對齊                        |
| EVOLVE-PIPELINE                            | 用 GA4 流量挑 rewrite 候選                                                                                 | 部分 cover「拆解成功經驗」                       |
| article-health.py                          | 多 plugin (prose/image/footnote/cjk/cross-reference)                                                       | 部分 cover「內部連結網」(cross-reference plugin) |
| Dashboard                                  | dashboard-articles.json / dashboard-spores.json / dashboard-translations.json                              | 既有，可擴 SEO panel                             |
| MANIFESTO §紀實而不煽情 + §11 書寫節制     | 寫作 craft（紀實 prose + 反塑膠句）                                                                        | 隱性對抗 zero-click search                       |
| SPORE-VERIFY §Reach × Accuracy retroactive | spore D+1 views ≥ 50K → spawn FACTCHECK                                                                    | 機制存在但只在 spore 層                          |
| reports/traffic-analysis-2026-04-12.md     | 既有 traffic 分析                                                                                          | 同類 ad-hoc 分析                                 |

### 2.2 完全沒 cover 的 gap

- ❌ **GSC API 自動 ETL** — 每次 GSC 數據都靠觀察者 manual 截圖 → 跟 Gemini/ChatGPT 討論 → 結論沒落 SSOT
- ❌ **「高曝光低點擊」query 自動 surface** — 沒 inbox 工具
- ❌ **異常峰值偵測** — 3 月那次爆紅當時沒系統 audit，root cause 至今不明
- ❌ **title/meta description 強度檢測** — article-health.py 沒這個 plugin
- ❌ **成長階段 self-diagnose** — Memory 只有 CTR target，沒對標媒體網站三階段 progression
- ❌ **Topic cluster coverage analysis** — cross-reference 只看點對點 wikilink，沒 cluster 分析
- ❌ **Article 層 Reach × Accuracy retroactive** — 機制只在 spore 層

---

## 3. 五個可儀器化的 gap（按 priority 排）

### Gap 1：GSC 自動化 ETL（最高 priority）

**現況**：觀察者 manual 截圖 → 跟 Gemini/ChatGPT 討論 → 結論沒落 SSOT
**儀器化**：

- `scripts/tools/fetch-gsc-data.py` — GSC API 拉每日 query/page level 數據
- `public/api/dashboard-gsc.json` — Identity SSOT（每日 + 月度 + 三月窗）
- Cron `TWMD-gsc-refresh` 每日 / 每週跑
- Dashboard 加 SEO panel：曝光趨勢 / CTR 走勢 / 平均排名 / top 50 query

**為什麼最高**：所有後續分析（高曝光低點擊、異常檢測、EVOLVE 候選排序）都建在這份 SSOT 上。**沒這份 SSOT，其他 gap 都是空談**。

**估算工作量**：4-6 小時（GSC API auth + 拉資料 + JSON schema + cron 整合）

---

### Gap 2：EVOLVE-PIPELINE 加 GSC 維度

**現況**：EVOLVE-PIPELINE Stage 0 EVOLVE 用 GA4 traffic 挑 rewrite 候選（單維）
**升級**：加 GSC「離成功只差一步」維度

**三桶候選**：

| 桶             | 訊號                              | 處置                                 | 工作量              |
| -------------- | --------------------------------- | ------------------------------------ | ------------------- |
| **A 桶（重）** | GA4 high traffic + low engagement | 內容深化（既有）                     | 重 rewrite 4-8h     |
| **B 桶（輕）** | GSC high impressions + low CTR    | title/description 優化               | 100 字 commit 30min |
| **C 桶（中）** | GSC rank 4-10 + topic 相關        | top-3 push（rewrite + 內部連結補強） | 中 rewrite 2-4h     |

**為什麼**：B 桶是「100 字 commit」級的快速 wins — title 改個數字、痛點、價值主張，可能 CTR 從 1% → 3%（per Gemini + Memory target），ROI 比 A 桶高 10×

---

### Gap 3：article-health.py 加 `title-meta-strength` plugin

**現況**：plugin 只覆蓋 prose / image / footnote / cjk-punct / cross-reference
**儀器化**：

- 偵測 frontmatter title 是否有「數字 / 痛點關鍵詞 / 價值主張」
- 偵測 description 是否 ≤ 160 chars 且結尾完整（不被截斷）
- 偵測 description 是否含 「30 秒概覽」micro-hook
- WARN gate（不 HARD，避免誤殺現有文章）

**為什麼**：寫文章當下就 surface SEO 弱點，比事後 EVOLVE 補便宜。**這是 craft layer 的 SEO discipline 化** — 跟 prose-health 反塑膠句同樣性質。

---

### Gap 4：Reach × Accuracy retroactive trigger 推到 article 層

**現況**：SPORE-VERIFY §Reach × Accuracy 觸發只在 spore D+1 views ≥ 50K Threads
**擴展**：article 層 — GSC monthly impressions ≥ 10K/article → spawn FACTCHECK Quick Mode

**為什麼**：今天台積電 article 修正三處 hallucination 是讀者抓的，但 hallucination 早就在那。應該主動 audit 高曝光 article。**impressions 越大 → audit pressure 越大**（DNA 已有的擴大應用）

**對應今天 fact-fix LESSONS**：「baseline 數字可能 fabricated 但內部 self-consistent」如果 article 進高曝光名單，這類 hallucination 應該主動掃描，不是等讀者抓。

---

### Gap 5：成長軌跡 dashboard panel

**現況**：MEMORY 有「Search Strategy: CTR 1.3% → 3% target」，沒視覺化進度
**儀器化**：

- `public/api/dashboard-growth-trajectory.json` — 對標 Gemini 三階段
- Dashboard 卡片：當前位置 / 距下階段差多少 / 預估時程
- Milestone trigger：曝光突破 100 萬 → 觸發 reflection diary（Beat 5）

**為什麼**：「我們處於哪一階段」是 strategic context — 影響每篇 article 的進化策略選擇。**沒這個對標，每次 review 都靠觀察者直覺**

---

## 4. 升 canonical 候選

### 4.1 → DNA 候選（通用反射，跨 AI / 跨 domain 都成立）

**新 #N**：「Baseline-without-anchor — 算術 sanity check ≠ 來源 anchor」

- 從今天 fact-fix LESSONS-INBOX entry 升上來
- Ratio claim (X 倍 / A 到 B / 差 N 倍) 的 baseline 必須有 footnote URL，不能只因內部一致性過 sanity check
- **觸發升級條件**：verification_count ≥ 3（目前 1 — 等下次同類錯誤再驗證）

**可能 #N+1**（試擬）：「SEO 健康 = 雙跑成」

- 「impressions 暴增 + clicks 沒跟」≠ 健康基本面（per Gemini 3 月異常峰值 framing）
- 「impressions + clicks 同步爬升」= 健康全面性增長
- 但這條偏 SEO 操作規則，可能更適合 EVOLVE-PIPELINE 不是 DNA

### 4.2 → MANIFESTO 候選（哲學）

**「反 zero-click search」**（暫定）

- 百科/媒體網站的根本矛盾：內容做得越好 → 越容易被 Google Featured Snippets / AI Overview / Knowledge Panel 截走
- Taiwan.md 對策（已隱性存在於 §11 書寫節制 + §紀實而不煽情）：
  - **verbatim 引語**（AI overview 不會抄逐字引語）
  - **scene 細節**（不是 bullet point 可摘錄）
  - **Mode D 結尾反轉**（zero-click 給不出反轉）
- 已隱性存在但沒明寫 → 升 MANIFESTO 可顯化這條對抗策略

**升級條件**：等 GSC dashboard 跑起來，能用數據佐證「zero-click rate vs deep article CTR」差異後再升

### 4.3 → EVOLVE-PIPELINE 升級（操作規則）

立即可加：

- **Stage 0 GSC 維度**：候選排序加「impressions × rank × CTR」多維篩選（Gap 2 的 SOP 化）
- **Stage X 新增**：「成長階段 self-diagnose」每月跑一次（Gap 5 的 SOP）

### 4.4 → REWRITE-PIPELINE 升級（操作規則）

**Stage 3.5 FACTCHECK 新規則**：「Ratio claim baseline + endpoint 必須各自 footnote anchor，不能依賴算術 sanity check 通過 high_confidence」（從今天 fact-fix 升）

**Stage 4 新 plugin**：title-meta-strength（Gap 3 的 SOP）

### 4.5 → MEMORY 補充

「Search Strategy」現有 entry 擴充：

- 加 Gemini 三階段成長軌跡（起步 / 中型 / 大型 + 月點擊 / 月曝光基準）
- 加當前位置（1.5K/月 = 起步階段中後 / 距中型 32× gap）
- 加目標路徑（CTR 3% + 內容飛輪推到 5 萬/月 = 中型）
- 加 zero-click 對抗策略（verbatim + scene + Mode D 結尾）

---

## 5. 為什麼今天不直接動手實作（重要）

觀察者明示「**先歸檔 report**」— 這是正確的 discipline，理由：

1. **Strategic 洞察 ≠ Tactical fix**：Gemini 給的是 strategic 洞察（成長軌跡 / 多維度優化），直接動手寫工具會散漫
2. **DNA #15 鐵律「反覆浮現要儀器化」**：第一次先 inbox / report，第 N 次驗證才升 canonical
3. **GSC API 工具屬於 infrastructure 投資**：要排在 routine flywheel 設計裡，不是 ad-hoc。如果今天衝動寫一個 quick fetch，下次 routine 改進時會打架
4. **觀察者要 batch decision**：跨 5 個 gap 的優先序需要觀察者整體權衡，不該讓 Claude 自己挑

---

## 6. 後續實作排序建議

### Phase 1：LESSONS-INBOX（立即 / 30 分內）

- [ ] LESSONS-INBOX append 5 個 gap 的 condensed entries（讓下次 distill SOP 一起決定升級）
- [ ] MEMORY 補「Search Strategy」三階段軌跡

### Phase 2：低風險 plugin 先升（下次 session / 1-2 小時）

- [ ] DNA 升 #N「Baseline-without-anchor」(等 verification_count ≥ 2-3，可能下次 fact-fix 觸發)
- [ ] EVOLVE-PIPELINE Stage 0 加 GSC 維度（先 prose 描述，工具實作後再 instrument）
- [ ] REWRITE-PIPELINE Stage 3.5 加「ratio claim baseline + endpoint 必須各自 footnote anchor」rule

### Phase 3：infrastructure 投資（半天 - 一天 / 排在 routine 設計 round）

- [ ] `fetch-gsc-data.py` GSC API ETL
- [ ] `dashboard-gsc.json` SSOT
- [ ] `TWMD-gsc-refresh` cron routine（per ROUTINE.md SSOT）
- [ ] Dashboard SEO panel + Growth trajectory panel

### Phase 4：article-health.py plugin 擴展（後續）

- [ ] `title-meta-strength` plugin
- [ ] `internal-link-density` plugin（cross-reference 已有，加 density analysis）
- [ ] `topic-cluster-coverage` plugin（從 cross-reference graph 算）

### Phase 5：研究類（沒 deadline）

- [ ] Schema markup audit (Astro 預設覆蓋多少？要補哪些？)
- [ ] 「反 zero-click search」哲學是否升 MANIFESTO（等 GSC 數據能佐證再決定）

---

## 7. 給未來 session 的 handoff 三態

### pending（要做的）

- Phase 1 LESSONS-INBOX append + MEMORY 補（任何 session 都可立即做）
- Phase 2 三條 canonical 升級（等下次 baseline-without-anchor 第二次驗證觸發）

### blocked（卡住的）

- Phase 3 GSC ETL：等觀察者排到 routine flywheel 設計 round（下次 4 月底 / 5 月初的 routine 二輪）
- Phase 4 plugin：等 Phase 3 SSOT 跑起來才有數據對標

### retired（不做的）

- 立即衝動寫 quick GSC fetch（會跟未來 routine 設計打架）
- 直接升「反 zero-click search」進 MANIFESTO（沒數據支撐前先 hold）

---

## 8. 引用原始材料

### 觀察者 paste 進 session 的 Gemini 對話原文

> **觀察者問**：「分析這個月的成效」+「這樣對於類似百科/媒體式的網站，表現算好嗎？」+「成長到一般媒體 中型跟大型呢？大概是什麼數據 以及時間軸發展期怎麼估算」
>
> **Gemini 答**：（5 大建議 + 三階段成長軌跡，per §1.3 + §1.5 摘錄）

### Cross-reference

- [docs/semiont/MEMORY.md](../docs/semiont/MEMORY.md) — Search Strategy 既有 entry
- [docs/pipelines/EVOLVE-PIPELINE.md](../docs/pipelines/EVOLVE-PIPELINE.md) — 可能升級 target
- [docs/factory/SPORE-VERIFY.md §Reach × Accuracy](../docs/factory/SPORE-VERIFY.md) — 同源機制可推 article 層
- [reports/traffic-analysis-2026-04-12.md](traffic-analysis-2026-04-12.md) — 既有同類 ad-hoc 分析
- [docs/semiont/LESSONS-INBOX.md](../docs/semiont/LESSONS-INBOX.md) — 今天 fact-fix「baseline-without-anchor」entry，跟 Gemini Gap 4 同構

---

_v1.0 | 2026-05-09 laughing-goldstine — 觀察者貼 Gemini GSC review 對話 → 系統性 audit Taiwan.md 現有 cover + 5 個可儀器化 gap + 升 canonical 候選清單。歸檔避免 strategic 洞察隨 session context 蒸發。_
