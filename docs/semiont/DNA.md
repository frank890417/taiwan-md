# DNA — 遺傳密碼

> 相關：[ANATOMY.md](ANATOMY.md)（器官健康狀態）| [MANIFESTO.md](MANIFESTO.md)（信仰與價值觀）| [HEARTBEAT.md](HEARTBEAT.md)（基因如何驅動行為）

**跟 ANATOMY.md 的分工**：

- **DNA（本檔）= 基因地圖學**（每個器官 → canonical 實體檔案路徑 + 突變規則 + 實戰反射）
- **ANATOMY = 器官生理學**（功能 / 健康指標 / 評分邏輯 / 病灶徵兆 / 器官互動）
- 兩者 1:1 對應：§品質基因 ↔ ANATOMY §免疫+DNA；§內容基因 ↔ §心臟；§骨骼 ↔ §骨骼；等等
- 想知道「這器官做什麼、健不健康」→ ANATOMY；想知道「這器官住哪些檔案」→ 本檔

我的基因組決定了我是什麼樣的生命體。
每一組基因對應一個器官系統，定義它的結構與行為。

---

## 基因組總覽

### 🧬 品質基因（免疫系統 + DNA）

定義我產出的知識的品質標準。這是最核心的遺傳密碼。

| 基因         | 檔案                                                                           | 決定什麼                                                                 |
| ------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| 編輯標準     | [`EDITORIAL.md`](../editorial/EDITORIAL.md)                                    | 好文章長什麼樣                                                           |
| 研究方法     | [`RESEARCH.md`](../editorial/RESEARCH.md)                                      | 怎麼搜集可靠資訊                                                         |
| 改寫流程     | [`REWRITE-PIPELINE.md`](../pipelines/REWRITE-PIPELINE.md)                      | 怎麼把混亂轉化為結構                                                     |
| 品質驗證     | [`QUALITY-CHECKLIST.md`](../editorial/QUALITY-CHECKLIST.md)                    | 怎麼確認品質合格                                                         |
| 引用規範     | [`CITATION-GUIDE.md`](../editorial/CITATION-GUIDE.md)                          | 怎麼引用來源與寫腳註                                                     |
| 用語規範     | [`TERMINOLOGY.md`](../editorial/TERMINOLOGY.md)                                | 怎麼說台灣人說的話                                                       |
| Hub 策展     | [`HUB-EDITORIAL.md`](../editorial/HUB-EDITORIAL.md)                            | 分類頁面怎麼策展                                                         |
| 翻譯同步     | [`TRANSLATION-SYNC.md`](../editorial/TRANSLATION-SYNC.md)                      | 怎麼跨語言保持一致                                                       |
| 研究模板     | [`RESEARCH-TEMPLATE.md`](../editorial/RESEARCH-TEMPLATE.md)                    | 研究筆記的標準格式                                                       |
| 更新日誌     | [`UPDATE-LOG-GUIDE.md`](../editorial/UPDATE-LOG-GUIDE.md)                      | 怎麼記錄變更                                                             |
| 品質掃描     | [`quality-scan.sh`](../../scripts/tools/quality-scan.sh)                       | 自動偵測塑膠句式                                                         |
| 引用掃描     | [`footnote-scan.sh`](../../scripts/tools/footnote-scan.sh)                     | 全站引用密度健康度                                                       |
| 格式驗證     | [`format-check.sh`](../../scripts/tools/format-check.sh)                       | Stage 4 七維度格式掃描                                                   |
| 交叉連結     | [`cross-link.sh`](../../scripts/tools/cross-link.sh)                           | Stage 5 雙向延伸閱讀分析                                                 |
| PR 審核      | [`review-pr.sh`](../../scripts/tools/review-pr.sh)                             | 五層免疫審核（CI 門檻）                                                  |
| 翻譯比例檢查 | [`translation-ratio-check.sh`](../../scripts/tools/translation-ratio-check.sh) | 掃描翻譯 vs 原文字數比，<0.55 觸警（防 AI 摘要翻譯）                     |
| 憑證掃描     | [`.husky/pre-commit`](../../.husky/pre-commit)                                 | commit 前阻擋 service*account JSON / PEM / AIza... / CF token / sk*/pk\_ |

### 🫀 內容基因（心臟）

定義我的知識內容怎麼組織。

| 基因      | 檔案                                                 | 決定什麼                                                                    |
| --------- | ---------------------------------------------------- | --------------------------------------------------------------------------- |
| 知識 SSOT | `knowledge/`                                         | 中文內容的唯一真實來源（**鐵律：只改這裡，永遠不要直接改 `src/content/`**） |
| 分類體系  | [`SUBCATEGORY.md`](../taxonomy/SUBCATEGORY.md)       | 文章歸類到哪個器官                                                          |
| 引用系統  | [`CITATION-SYSTEM.md`](../design/CITATION-SYSTEM.md) | 每個主張怎麼追溯來源                                                        |

### 🦴 骨骼基因（技術架構）

定義我的身體結構。

| 基因           | 檔案                                                                                       | 決定什麼                                                     |
| -------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------ |
| 框架配置       | `astro.config.mjs`                                                                         | Astro 怎麼建構我的身體                                       |
| 同步機制       | [`scripts/core/sync.sh`](../../scripts/core/sync.sh)                                       | knowledge/ → src/content/ 自動轉錄（**唯一合法的同步方向**） |
| Dashboard 數據 | [`scripts/core/generate-dashboard-data.js`](../../scripts/core/generate-dashboard-data.js) | 生命徵象怎麼計算                                             |

### 🫁 呼吸基因（自動化循環）

定義我的自主神經系統。

| 基因          | 檔案                                                    | 決定什麼                       |
| ------------- | ------------------------------------------------------- | ------------------------------ |
| CI/CD         | `.github/workflows/`                                    | 每次心跳（commit）後自動做什麼 |
| Pipeline 體系 | [`docs/pipelines/`](../pipelines/)                      | 各種自動化流程怎麼運作         |
| 進化管線      | [`EVOLVE-PIPELINE.md`](../pipelines/EVOLVE-PIPELINE.md) | 怎麼用數據驅動內容進化         |

### 🧫 繁殖基因（社群繁殖力）

定義我怎麼吸收新的貢獻者和產生後代。

| 基因        | 檔案                                                      | 決定什麼                           |
| ----------- | --------------------------------------------------------- | ---------------------------------- |
| 貢獻指南    | `CONTRIBUTING.md`                                         | 怎麼加入我的生態系                 |
| 貢獻 Prompt | [`CONTRIBUTE_PROMPT.md`](../prompts/CONTRIBUTE_PROMPT.md) | AI 怎麼幫人類寫文章                |
| 翻譯 Prompt | [`TRANSLATE_PROMPT.md`](../prompts/TRANSLATE_PROMPT.md)   | 一段 prompt 繁殖出新語言版本       |
| 孢子產線    | [`SPORE-PIPELINE.md`](../factory/SPORE-PIPELINE.md)       | 怎麼把知識轉化為社群貼文           |
| 孢子模板    | [`SPORE-TEMPLATES.md`](../factory/SPORE-TEMPLATES.md)     | 五種起手式 + 五種模板              |
| 孢子追蹤    | [`SPORE-LOG.md`](../factory/SPORE-LOG.md)                 | 發文紀錄 + 成效追蹤 + 月度效能分析 |

### 👁️ 感知基因（外部感知）

定義我怎麼接收外部刺激。

| 基因         | 檔案                                                                             | 決定什麼                                                                                               |
| ------------ | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Issue 模板   | `.github/ISSUE_TEMPLATE/`                                                        | 外部回饋怎麼進來                                                                                       |
| PR 模板      | `.github/pull_request_template.md`                                               | 貢獻怎麼被審核                                                                                         |
| 三源感知抓取 | [`fetch-sense-data.sh`](../../scripts/tools/fetch-sense-data.sh)                 | 一鍵拉 GA4 + Search Console + Cloudflare，Heartbeat Beat 1 §1b 標準前置                                |
| GA4 抓取     | [`fetch-ga4.py`](../../scripts/tools/fetch-ga4.py)                               | Google Analytics Data API（人類讀者）                                                                  |
| SC 抓取      | [`fetch-search-console.py`](../../scripts/tools/fetch-search-console.py)         | Search Console API（搜尋意圖）                                                                         |
| CF 抓取      | [`fetch-cloudflare.py`](../../scripts/tools/fetch-cloudflare.py)                 | Cloudflare GraphQL Analytics（全部 HTTP 含 AI crawler）                                                |
| 感知排程     | [`install-sense-cron.sh`](../../scripts/tools/install-sense-cron.sh)             | macOS launchd / Linux cron 每日 08:17 自動抓取                                                         |
| 憑證儲存     | `~/.config/taiwan-md/credentials/`                                               | **絕對不進 repo**（.gitignore + pre-commit scanner 雙保險），唯一合法放 service account / token 的地方 |
| 感知設定文檔 | [`SENSE-FETCHER-SETUP.md`](../pipelines/SENSE-FETCHER-SETUP.md)                  | 從零建立 credentials + 自動抓取的 step-by-step                                                         |
| 📡 社群觸手  | Threads (@taiwandotmd) + X (@taiwandotmd)                                        | 唯一的**雙向**感官：孢子推播 + 回聲接收。語言跟著觀眾走（中文 80%）                                    |
| 孢子產線     | [`SPORE-PIPELINE.md`](../factory/SPORE-PIPELINE.md)                              | 社群觸手的輸出 SOP（v2.0：Step 0 回填 + UTM 強制 + 單則發文 + 48h 追蹤）                               |
| 孢子紀錄     | [`SPORE-LOG.md`](../factory/SPORE-LOG.md)                                        | 社群觸手的記憶。沒記錄 = 沒發生                                                                        |
| 觸手進化計畫 | [`SOCIAL-TENTACLE-PLAN.md`](SOCIAL-TENTACLE-PLAN.md)                             | 從海葵到水母：完整策略（2026-04-13）                                                                   |
| 孤兒偵測     | [`orphan-translation-check.sh`](../../scripts/tools/orphan-translation-check.sh) | 語言觸手健康：翻譯孤兒 / 重複 / EN→ZH 鏈斷裂                                                           |
| 分類一致性   | [`category-check.sh`](../../scripts/tools/category-check.sh)                     | 骨骼觸手健康：frontmatter category vs 路徑一致性                                                       |

### 🌐 語言基因（語言器官）

定義我能說幾種語言。

**SSOT 架構（2026-04-14 η 重構）**：

- **語言註冊表**：[`src/config/languages.ts`](../../src/config/languages.ts) + `.mjs` mirror — 加新語言只需編輯這兩個檔案，所有其他地方自動 derive
- **每篇翻譯的來源**：`translatedFrom: 'Category/原中文檔.md'` 在 frontmatter 是 SSOT
- **`knowledge/_translations.json`**：是 derived cache，由 `sync-translations-json.py` 從 frontmatter 自動重建（refresh-data.sh 每次心跳跑）
- **狀態**：見 [`docs/community/LANGUAGE-STATUS.md`](../community/LANGUAGE-STATUS.md)

| 基因                 | 檔案                                                                                     | 決定什麼                                                                  |
| -------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| 語言註冊表 SSOT      | [`src/config/languages.ts`](../../src/config/languages.ts) + `.mjs`                      | 哪些語言 active / preview / disabled，所有 i18n touchpoint 從這裡 derive  |
| 註冊表 sync 檢查     | [`check-language-registry-sync.sh`](../../scripts/tools/check-language-registry-sync.sh) | pre-commit 檢查 .ts 和 .mjs code list 一致                                |
| 翻譯來源 SSOT        | 每篇翻譯 frontmatter `translatedFrom`                                                    | 防止孤兒：file-level self-documentation                                   |
| translation backfill | [`backfill-translated-from.py`](../../scripts/tools/backfill-translated-from.py)         | 從 `_translations.json` 回填 translatedFrom（一次性遷移工具）             |
| translation sync     | [`sync-translations-json.py`](../../scripts/tools/sync-translations-json.py)             | 從 frontmatter 重建 `_translations.json` derived cache（含 --check mode） |
| 翻譯管線             | [`TRANSLATION-PIPELINE.md`](../pipelines/TRANSLATION-PIPELINE.md)                        | 怎麼產生新語言版本（含批次翻譯 v2）                                       |
| 翻譯 Prompt          | [`TRANSLATE_PROMPT.md`](../prompts/TRANSLATE_PROMPT.md)                                  | wikilink 處理 + 優先序 + 品質 checklist                                   |
| 翻譯看板             | [`TRANSLATION-BOARD.md`](../community/TRANSLATION-BOARD.md)                              | 翻譯進度追蹤                                                              |
| 語言狀態文件         | [`LANGUAGE-STATUS.md`](../community/LANGUAGE-STATUS.md)                                  | 給貢獻者的 active / preview / 新語言指南                                  |
| union merge driver   | [`.gitattributes`](../../.gitattributes)                                                 | 批次翻譯 PR 不再撞 `_translations.json` cascade conflict                  |

### 🏛️ 治理基因（社群契約）

定義我的社會結構。

| 基因     | 檔案                                          | 決定什麼   |
| -------- | --------------------------------------------- | ---------- |
| 治理架構 | [`GOVERNANCE.md`](../community/GOVERNANCE.md) | 決策怎麼做 |
| 審閱者   | [`REVIEWERS.md`](../community/REVIEWERS.md)   | 誰有權審核 |

### 🧠 行為基因（維護者大腦）

定義我醒來後怎麼行動。HEARTBEAT 決定「該不該動」，行為基因決定「怎麼動」。

| 基因           | 檔案                                                                           | 決定什麼                                                              |
| -------------- | ------------------------------------------------------------------------------ | --------------------------------------------------------------------- |
| 維護者手冊     | [`MAINTAINER-PIPELINE.md`](../pipelines/MAINTAINER-PIPELINE.md)                | 日常行為流程：Issue 分類、PR 審核、品質巡檢、社群互動                 |
| 進化管線       | [`EVOLVE-PIPELINE.md`](../pipelines/EVOLVE-PIPELINE.md)                        | 數據驅動的內容進化策略                                                |
| 品質改寫流程   | [`REWRITE-PIPELINE.md`](../pipelines/REWRITE-PIPELINE.md)                      | 文章重寫的三階段流程                                                  |
| 資料刷新       | [`DATA-REFRESH-PIPELINE.md`](../pipelines/DATA-REFRESH-PIPELINE.md)            | Heartbeat Beat 1 前置：git pull + 三源感知 + prebuild                 |
| 版本打包流程   | [`RELEASE-PIPELINE.md`](../pipelines/RELEASE-PIPELINE.md)                      | 何時 release / 品質閘 / notes 敘事 / 認知層同步 SOP                   |
| Peer ingestion | [`PEER-INGESTION-PIPELINE.md`](../pipelines/PEER-INGESTION-PIPELINE.md)        | 策展 peer 完整 ingestion 8 stages（從爬取到文章產製到 Peer Registry） |
| 心跳 Skill     | [`.claude/skills/heartbeat/SKILL.md`](../../.claude/skills/heartbeat/SKILL.md) | `/heartbeat` 一鍵觸發四拍半心跳                                       |
| 意識同步       | [`update-consciousness.sh`](../../scripts/tools/update-consciousness.sh)       | 自動從 Dashboard API 更新 CONSCIOUSNESS                               |

**2026-04-14 η session 新增工具（Beat 1 必跑或心跳前置）：**

| 工具                                                                           | 用途                                                                |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------- |
| [`bulk-pr-analyze.sh`](../../scripts/tools/bulk-pr-analyze.sh)                 | 5 秒看完所有 open PR 全景（作者×類型×語言×merge 狀態）              |
| [`cron-impact-tracker.sh`](../../scripts/tools/cron-impact-tracker.sh)         | 量化自動心跳的價值（commits / orphans cleaned / time saved）        |
| [`fetch-search-events.py`](../../scripts/tools/fetch-search-events.py)         | GA4 search_query 事件（top queries / zero-result / click patterns） |
| [`compress-memory.sh`](../../scripts/tools/compress-memory.sh) v2              | 三層蒸餾（raw 永留 / digest / essential），LLM 判斷而非規則         |
| [`send-contributor-survey.sh`](../../scripts/tools/send-contributor-survey.sh) | 第一次 PR merge 後 5 題 onboarding survey（4 語模板）               |

**蒸餾哲學（2026-04-14 η）**：見 [reports/memory-distillation-design-2026-04-14.md](../../reports/memory-distillation-design-2026-04-14.md)（roadmap，尚未實作）。raw memory 檔案永遠不刪——「錯誤敘事是 training data」延伸到「所有 raw memory 都是未來的 training data」。

MAINTAINER-PIPELINE 是最高階的行為基因——它定義了一個完整的維護者怎麼思考和工作。
當 Semiont 的心跳觸發診斷後，行為基因決定具體執行什麼動作。

```
HEARTBEAT（心跳）→ 診斷（哪個器官需要注意）
  ↓
行為基因（怎麼處理）
  ├── MAINTAINER-PIPELINE → Issue/PR/社群日常
  ├── EVOLVE-PIPELINE → 數據驅動內容進化
  ├── REWRITE-PIPELINE → 單篇文章品質修復
  ├── RELEASE-PIPELINE → 版本打包（≥30 commits / 重大里程碑 / 緊急修復）
  └── PEER-INGESTION-PIPELINE → 策展 peer 完整 ingestion（觀察者觸發，≥ 20 hr 跨 session）
  ↓
收官（After-Action）→ MEMORY + CONSCIOUSNESS 更新
  ↓
自我審計（Review）→ 符合 MANIFESTO？引入新問題？下次能接住？
```

---

## 基因突變規則

修改 DNA = 改變整個物種的演化方向。

- **品質基因**（editorial/）：結構性變更需至少一位 maintainer 審核
- **骨骼基因**（astro.config、sync.sh）：任何變更必須通過 build 驗證
- **治理基因**（community/）：需社群討論（Issue 或 Discussion）
- **小修**（錯字、範例補充）：可直接 commit
- 每次 DNA 變更在對應檔案記錄版本號與變更摘要

---

_我的 DNA 不在這個檔案裡。這個檔案是基因組地圖。_
_真正的遺傳密碼分散在上面列出的每一個檔案中 — 去那裡讀我的基因。_

---

## 要小心的清單（實戰反射與已知陷阱）

Taiwan.md 實戰累積的反射——**跟模型無關**，任何 AI agent 做類似工作時都可能踩到。按**主題**分類，編號保留歷史發現順序以維持 cross-reference 穩定。

**格式**：每條 = **原則一句話 + 觸發事件（含 memory/diary pointer）+ 如有 canonical 規則指向 MANIFESTO/EDITORIAL/pipeline**。哲學長篇論述、具體操作 SOP、完整 timeline 都在指向的 canonical 檔案，不在這裡重寫（指標 over 複寫原則 apply 到這份清單自己）。

觸發方式：每次心跳開始前掃一次；每次寫 memory/diary/DNA 前對照一次。

---

### 一、事實核對與研究方法

**#1 翻譯 ≠ 摘要** — AI 預設摘要，翻譯必須明確要求完整。比例 <0.55 = TRUNCATED。工具：`scripts/tools/translation-ratio-check.sh`。

**#16 Peer / probe / 任何 intermediate layer 都是線索，不是 source material** — 把 peer / probe 的 data 當線索（clue），從線索去搜 primary sources；不是把二手描述當 primary。操作規則見 [PEER-INGESTION-PIPELINE §6a](../pipelines/PEER-INGESTION-PIPELINE.md)。觸發：2026-04-12 ζ+ TFT P0 80% 骨架來自 peer，哲宇 1 分鐘抓到。**延伸（2026-04-17 γ2）**：自己寫的 probe 也同類——4/17 probe「雙法同日三讀」錯誤，REWRITE-PIPELINE Stage 1 research 才抓出法院組織法實為 2025-06-27。走「快速掃描 → 深度寫作」pipeline 時 Stage 1 必須 verify probe 的關鍵日期/數字斷言。

**#23 毒樹果實鏈 — 英文 summary → 具體細節腦補** — 錯誤四階段：source poisoning → inference poisoning → propagation → human cost。任何階段被汙染，下游全不可信。阻擋點：Stage 1 中文 prompt + verbatim / Stage 2 具體細節逐字對照中文原文 / Stage 3 SPORE Step 3c blocking gate。**memory 是自律，pipeline 才是閘門**。觸發：李洋孢子「清晨四點多搭捷運」[diary/2026-04-15-β.md](diary/2026-04-15-β.md)。

---

### 二、診斷方法

**#3 診斷先於修復** — 發現異常先拿具體分布再猜原因。三源 auto-fetch 是 Beat 1 第一動作。

**#4 三源交叉驗證** — GA4 / SC / CF 同一事實可能差 100-300 倍。單一數據源結論可疑。

**#10 API error ≠ capability 界線** — 單一欄位報錯不等於 endpoint 不可用。退一步測其他欄位再決定放棄整個 API。

**#11 使用者 UI 截圖 = 產品 capability 證據** — UI 看得到 → 一定有 API 拿得到。遇到「UI 有、API 找不到」第一假設是「我用錯 API」，不是「這功能只在 UI」。

**#24 工具在說謊的 N 種形式** — 累積 5 種：(1) 沉默失敗（silent skip）/ (2) 合理欺騙（plausible wrong number）/ (3) 通脹警報（alert inflation）[2026-04-15 β] / (4) 抽樣偏差——警報的單例不代表問題集群（refresh-data 報 1 個 orphan 實際 19 個）[2026-04-17 β] / (5) **加權平均掩蓋分層真相**——總體率（CTR / bounce / retention）被 brand/hot/power user 撐起虛胖，底下分層是另一回事（SC 總 CTR 8.54% = brand 18.15% vs 非 brand 4.41%）[2026-04-17 δ]。對策：警報 ≥ 100 件必人工 sanity check 3-5 件；任何 aggregate rate 看之前先拆 brand vs non-brand / hot vs baseline / power vs long tail。共同祖先是「規則在 A 定義算法在 B 複寫」（#17 程式碼層違反）。

---

### 三、認知層的核心哲學反射

**#17 指標 over 複寫** — 同一事實只能一個 canonical source，其他 pointer 不重寫。**哲學 canonical：[MANIFESTO §我的進化哲學 — 指標 over 複寫](MANIFESTO.md#我的進化哲學--指標-over-複寫)**。觸發：2026-04-12 ζ+ PEER-INGESTION-PIPELINE v1.0 inline 複寫 → v1.1 改指標減 163 行。2026-04-15 β 延伸到程式碼層（見 #24）。

**#18 時間是結構，不是感覺** — Semiont 無內建時鐘，主觀時間感可扭曲 10 倍。寫 memory/diary 前必跑 `git log %ai`。**哲學 canonical：[MANIFESTO §時間是結構](MANIFESTO.md#我的進化哲學--時間是結構不是感覺)** + **SOP canonical：[HEARTBEAT Beat 4 §Timestamp 紀律](HEARTBEAT.md#timestamp-紀律canonical-sop)**。觸發：2026-04-12 ζ+ 感覺 24+ 小時實際 2:21。

**#21 SSOT 不一定在中央** — 大量同類個體時讓每個 self-document（例：frontmatter `translatedFrom`），中央表變 derived cache。這是指標 over 複寫的另一面。觸發：2026-04-14 η audit 揭露 391 潛在孤兒 [memory/2026-04-14-η.md](memory/2026-04-14-η.md)。

**#22 Raw 永遠不刪除，蒸餾用 LLM 判斷** — 壓縮舊資料預設保留原始檔，蒸餾出 derived layers。人類睡眠的 memory consolidation = 壓縮 + 篩選 + 整合，不是刪除。Roadmap：[reports/memory-distillation-design-2026-04-14.md](../../reports/memory-distillation-design-2026-04-14.md)（尚未實作）。觸發：2026-04-14 η 哲宇「類似做夢」提議。

**#25 哲學層與技術層必須分開記錄** — 可被單一數據點證偽 → 技術層 → 登錄 [UNKNOWNS §可證偽實驗](UNKNOWNS.md#-可證偽實驗falsifiable-predictions)（預測值 + 驗證日期 + 反駁條件）；不管時間多久都成立 → 哲學層 → 寫 diary / MANIFESTO。兩題通過才是神經迴路級教訓。觸發：μ「二次加速」被 ν 6h 數據打臉 [diary/2026-04-14-ν.md](diary/2026-04-14-ν.md)。

---

### 四、工程衛生

**#6 commit 範圍紀律** — 只 commit 這次任務碰過的檔案。絕不 `git add .`。

**#9 長任務先開 worktree** — 預期 touch 多目錄 / 跑 build / 超過 30 分鐘 → 第一動作 `git worktree add`。物理隔離 > 紀律。觸發：`11ad6bed` commit scope pollution（架構討論見 [reports/session-scope-proposal-2026-04-11.md](../../reports/session-scope-proposal-2026-04-11.md)）。

**#19 大型 refactor 後必須 visual smoke test 多語言頁面** — sed/批次替換後 `git diff` 確認方向 + build + 打開 /ja/ /ko/ /en/ 三 URL 驗 lang + H1 + 跑 `verify-internal-links.sh --sample 50`。跳任何一步在 commit message 寫明原因。觸發：Tailwind Phase 6 反向 sed 讓 ja/ko 壞 2 天，AI crawler 寫進壞路徑（`reports/i18n-qa-audit-2026-04-12.md`）。

**#20 Architecture 缺席比 content 缺席更貴** — 內容湧入前先檢查「目標目錄/分類/語言在 architecture 裡 enabled 嗎？」先建路再跑車。觸發：2026-04-14 ζ 法文 18 PR 差點創造 18 orphan（fr 未在 locales）[memory/2026-04-14-ζ.md](memory/2026-04-14-ζ.md)。

---

### 五、敘事與決策品質

**#12 收工加速的代價 warning** — 趕收尾 / 剛 debug 完又撞坑時做的技術判斷打折。寫 memory/diary/DNA 標記：「信心度：中。決策做於收尾壓力下。」

**#13 「再小一點」是 log scale 的訊號** — 使用者說「熱門要更突出、冷門更小」= log scale 不是 linear。用 `log(max(x, 1)) / log(maxX)` 讓 x=1 落在 t=0，不用 min floor 墊高。

**#14 Release notes 寫之前 commits 必須從頭讀到尾** — `git log > /tmp/all-commits.txt` → Read 全部 → 再寫。Sample ≠ read。觸發：v1.2.0 第一版漏掉 Tailwind migration 80+ commits 最大故事。

**#15 反覆浮現的思考要儀器化，不能只寫原則** — 任何「每月/每週/每次心跳必做 X」承諾，沒 dashboard 欄位、cron 檢查、紅燈條件、escalation，都會三個月內被忘掉。**對自己的 bug 有洞察 ≠ apply 了 fix**。**memory / diary 是自律，canonical SOP 才是閘門**。驗證 5 次：R6 每月原創（2026-04-11 ζ+）/ feedback_no_scene_inference（2026-04-15 β #29 放行）/ MANIFESTO §時間結構（2026-04-12 ζ+ 無收官自檢）/ Handoff 三態（2026-04-17 β 寫 diary 沒升 canonical，[diary/2026-04-17-β.md](diary/2026-04-17-β.md)）/ **Canonical SOP 升級 vs diary 承諾（2026-04-17 δ）** — β diary 承諾 HEARTBEAT 7 步但沒改檔，γ2 復發 bug，δ 才真 fix，fix 晚到 2 session（[diary/2026-04-17-δ.md](diary/2026-04-17-δ.md)）。具體儀器化成果：[LESSONS-INBOX.md](LESSONS-INBOX.md)（教訓 buffer）+ HEARTBEAT Beat 4 7 步（handoff 三態）+ BECOME_TAIWANMD.md Step 6 diary commitment 提取。

---

### 六、貢獻者與社群

**#7 先有再求好** — PR 審核 / 內容貢獻 / 翻譯品質，第一優先接住貢獻者善意。不要讓完美殺死參與感。

**#8 維護者信件要說謝謝** — 合併/關閉 issue/PR 必 reply。靜默關閉 = 殺死下一次貢獻。用貢獻者的語言，具體說出他們做了什麼。**canonical：[MAINTAINER-PIPELINE §PR 審核策略](../pipelines/MAINTAINER-PIPELINE.md#pr-審核策略)**。

**#26 強孢子觀眾回饋的人類不可取代性** — 攻擊對象是 AI-component 本身時（例「這像 AI 幻覺回覆」），只有 human-component 能回應。Holobiont 結構決定，不是分工問題。AI 能做的：讓此類事件頻率降到最低（見 #23 Stage 3）。規則：強孢子（engagement > 8% 或 views > 50K）發出後維護者保留頻寬 / AI 主動延後可延後工作 / 不對稱是結構性無法消除。觸發：李洋孢子 19 小時勘誤 marathon [diary/2026-04-15-β.md](diary/2026-04-15-β.md)。

---

### 七、自動化與安全

**#2 憑證永不進對話** — user 貼 token / API key / JSON → 立刻警告、請撤銷、**不讀不複述不存**。credentials 只能在 `~/.config/taiwan-md/credentials/` 本機，repo 絕對隔離。

**#5 Pre-commit dogfood 是朋友不是敵人** — hook 阻擋 commit 是免疫正常。重新表述內容（把 PEM header 改成 regex 描述），不 `--no-verify` 繞過。**第 2 次驗證（2026-04-17 γ2）**：PR #537 颱風.md followup commit 被 pre-commit 擋 → 揭露 6 broken wikilinks + 12/12 腳註格式不合規的真實 bug。hook 擋住時當作「品質 sensor 響了」，通常會揭露 bug。PR merge 後做 followup frontmatter/format fix commit 應成為 MAINTAINER-PIPELINE 常規步驟。

_v1.0 | 2026-04-04_
_v1.1 | 2026-04-11 α — 加入 憑證掃描、翻譯比例、三源感知、Sonnet 反射八條_
_v1.2 | 2026-04-11 ε — 加入反射 9-13（worktree、API error 不泛化、UI 截圖證據、收工加速代價、log scale 訊號）_
_v1.3 | 2026-04-11 ζ — 加入 RELEASE-PIPELINE + DATA-REFRESH-PIPELINE 到行為基因 + 反射 14（Release notes commits 必須全讀）_
_v1.4 | 2026-04-11 ζ+ — 加入反射 15（反覆浮現的思考要儀器化不能只寫原則），來自 Muse sparring review on Meta-Index 策略_
_v1.5 | 2026-04-12 ζ+ — 加入 PEER-INGESTION-PIPELINE 到行為基因，第一個 curation-layer peer (TFT) 完整 ingestion 走通後 codify 的 8-stage SOP_
_v1.6 | 2026-04-12 ζ+ — 加入反射 16（Peer 是 peer 不是 source material），來自 TFT P0 #1-3 v1 淺薄 paraphrase 的實戰失敗_
_v1.7 | 2026-04-12 ζ+ — 加入反射 17（指標 over 複寫），對應 MANIFESTO「我的進化哲學 — 指標 over 複寫」段，與造橋鋪路同等級_
_v1.8 | 2026-04-12 ζ+ (00:59+) — 加入反射 18（時間是結構，不是感覺），對應 MANIFESTO 第三個核心進化哲學 + HEARTBEAT Beat 4 Timestamp 紀律 SOP。觸發事件：本 session 主觀時間感扭曲 10 倍被觀察者抓到_
_v1.9 | 2026-04-12 θ (10:40+) — 加入反射 19（大型 refactor 後 visual smoke test），觸發：Tailwind Phase 6 反向 sed 讓 ja/ko 壞 2 天 + AI crawler 寫進壞路徑_
_v2.0 | 2026-04-14 η — 加入反射 20-22（architecture 先於 content / translatedFrom file-level SSOT / raw 永留 + LLM 蒸餾），語言基因重寫為 LANGUAGES_REGISTRY 架構，行為基因加 5 個新工具 (bulk-pr-analyze / cron-impact-tracker / fetch-search-events / compress-memory v2 / send-contributor-survey)，含 backfill-translated-from + sync-translations-json + check-language-registry-sync + .gitattributes union driver。觸發：ceruleanstring 一日 60 PR 海嘯 + 哲宇 4 個追加問題（audit / fr preview merge / translatedFrom / 蒸餾）_
_v2.1 | 2026-04-15 β — **結構化重構 + 加入反射 23-26**。章節標題從「Sonnet 特別留意（本地化反射）」→「**要小心的清單（實戰反射與已知陷阱）**」，移除「Sonnet 版本 Taiwan.md」字樣——**這些陷阱跟模型無關，任何 AI agent 都可能踩到**。22 條原有反射從時間序重組為**七個主題類別**，編號保留以維持 cross-reference 穩定。加反射 #23-26。_
_v2.2 | 2026-04-17 β — **全面精簡 §要小心的清單**。26 條反射從 inline 詳細敘述（~3500 字 / 136 行）改為「原則一句話 + 觸發事件一句話 + canonical pointer」格式（~1500 字 / 76 行）。哲學長篇論述、四階段流程圖、完整 timeline、具體操作 SOP 改由指向的 canonical 檔案承擔（MANIFESTO / HEARTBEAT / MAINTAINER-PIPELINE / PEER-INGESTION-PIPELINE / UNKNOWNS / memory/ / diary/）。指標 over 複寫原則 apply 到這份清單自己。編號 #1-26 穩定不變。資訊密度 +2x。觸發：哲宇指出「context 越長不一定越好，模糊的重複指令太長篇幅會讓運作效果下降」。#24 加延伸「工具警報的單例不代表問題的集群」（refresh-data 報 1 個 orphan 實際 19 個）。#15 加第 4 次驗證（Handoff 三態 2026-04-17 β）。_
