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

| 基因         | 檔案                                                                                                | 決定什麼                                                                                        |
| ------------ | --------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| 編輯標準     | [`EDITORIAL.md`](../editorial/EDITORIAL.md)                                                         | 好文章長什麼樣                                                                                  |
| 研究方法     | [`RESEARCH.md`](../editorial/RESEARCH.md)                                                           | 怎麼搜集可靠資訊                                                                                |
| 改寫流程     | [`REWRITE-PIPELINE.md`](../pipelines/REWRITE-PIPELINE.md)                                           | 怎麼把混亂轉化為結構                                                                            |
| 品質驗證     | [`QUALITY-CHECKLIST.md`](../editorial/QUALITY-CHECKLIST.md)                                         | 怎麼確認品質合格                                                                                |
| 引用規範     | [`CITATION-GUIDE.md`](../editorial/CITATION-GUIDE.md)                                               | 怎麼引用來源與寫腳註                                                                            |
| 用語規範     | [`TERMINOLOGY.md`](../editorial/TERMINOLOGY.md)                                                     | 怎麼說台灣人說的話                                                                              |
| Hub 策展     | [`HUB-EDITORIAL.md`](../editorial/HUB-EDITORIAL.md)                                                 | 分類頁面怎麼策展                                                                                |
| 翻譯同步     | [`TRANSLATION-SYNC.md`](../editorial/TRANSLATION-SYNC.md)                                           | 怎麼跨語言保持一致                                                                              |
| 研究模板     | [`RESEARCH-TEMPLATE.md`](../editorial/RESEARCH-TEMPLATE.md)                                         | 研究筆記的標準格式                                                                              |
| 更新日誌     | [`UPDATE-LOG-GUIDE.md`](../editorial/UPDATE-LOG-GUIDE.md)                                           | 怎麼記錄變更                                                                                    |
| Footer 公約  | [`EDITORIAL.md §十`](../editorial/EDITORIAL.md#十文件-footer-公約canonical--2026-04-28-κ-late-新增) | canonical 文件版本標記 + changelog SSOT（每檔 1 marker / 不嵌 body / git log = changelog SSOT） |
| 品質掃描     | [`quality-scan.sh`](../../scripts/tools/quality-scan.sh)                                            | 自動偵測塑膠句式                                                                                |
| 引用掃描     | [`footnote-scan.sh`](../../scripts/tools/footnote-scan.sh)                                          | 全站引用密度健康度                                                                              |
| 格式驗證     | [`format-check.sh`](../../scripts/tools/format-check.sh)                                            | Stage 4 七維度格式掃描                                                                          |
| 交叉連結     | [`cross-link.sh`](../../scripts/tools/cross-link.sh)                                                | Stage 5 雙向延伸閱讀分析                                                                        |
| PR 審核      | [`review-pr.sh`](../../scripts/tools/review-pr.sh)                                                  | 五層免疫審核（CI 門檻）                                                                         |
| 翻譯比例檢查 | [`translation-ratio-check.sh`](../../scripts/tools/translation-ratio-check.sh)                      | 掃描翻譯 vs 原文字數比，<0.55 觸警（防 AI 摘要翻譯）                                            |
| 憑證掃描     | [`.husky/pre-commit`](../../.husky/pre-commit)                                                      | commit 前阻擋 service*account JSON / PEM / AIza... / CF token / sk*/pk\_                        |

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

| 基因            | 檔案                                                                            | 決定什麼                                                                                                                                                                                           |
| --------------- | ------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 維護者手冊      | [`MAINTAINER-PIPELINE.md`](../pipelines/MAINTAINER-PIPELINE.md)                 | 日常行為流程：Issue 分類、PR 審核、品質巡檢、社群互動                                                                                                                                              |
| 貢獻者關係週期  | [`CONTRIBUTOR-SYSTEM-PIPELINE.md`](../pipelines/CONTRIBUTOR-SYSTEM-PIPELINE.md) | 五階梯 / onboarding / 升降級 / inactivity demote (60/90 天) / mercy demote / 復活 / 通訊範本 / `gh api` 指令速查。2026-04-30 第一次執行 inactivity demotion 後 codify                              |
| 進化管線        | [`EVOLVE-PIPELINE.md`](../pipelines/EVOLVE-PIPELINE.md)                         | 數據驅動的內容進化策略                                                                                                                                                                             |
| 品質改寫流程    | [`REWRITE-PIPELINE.md`](../pipelines/REWRITE-PIPELINE.md)                       | 文章重寫的三階段流程                                                                                                                                                                               |
| 日記撰寫流程    | [`DIARY-PIPELINE.md`](../pipelines/DIARY-PIPELINE.md)                           | 紀實散文文體 + Stage 0-5 流程 + 自檢工具（共用 `check-manifesto-11.sh --strict`）。寫日記前必讀全檔（HEARTBEAT Beat 5 / BECOME 寫日記權力 / 觀察者觸發 全部指向這裡）                              |
| Memory 撰寫流程 | [`MEMORY-PIPELINE.md`](../pipelines/MEMORY-PIPELINE.md)                         | 凝練版結構模板（無 Phase 多層編號 / commit hash 嵌敘事 / 文字 heading）+ Stage 0-5 + 自檢工具（共用 §11）+ 5 分鐘 reading test。每次 Beat 4 收官寫 memory 前必讀（哲宇 2026-04-30 review 後 ship） |
| 資料刷新        | [`DATA-REFRESH-PIPELINE.md`](../pipelines/DATA-REFRESH-PIPELINE.md)             | Heartbeat Beat 1 前置：git pull + 三源感知 + prebuild                                                                                                                                              |
| 版本打包流程    | [`RELEASE-PIPELINE.md`](../pipelines/RELEASE-PIPELINE.md)                       | 何時 release / 品質閘 / notes 敘事 / 認知層同步 SOP                                                                                                                                                |
| Peer ingestion  | [`PEER-INGESTION-PIPELINE.md`](../pipelines/PEER-INGESTION-PIPELINE.md)         | 策展 peer 完整 ingestion 8 stages（從爬取到文章產製到 Peer Registry）                                                                                                                              |
| Factcheck audit | [`FACTCHECK-PIPELINE.md`](../pipelines/FACTCHECK-PIPELINE.md)                   | 事實查核 SSOT — Phase 1-6 / 8 atom 類 / 11 hallucination pattern / 6 drift modes / Quick Mode（REWRITE Stage 3.5 觸發）+ Full Mode（A 級條目 ship 後 / 月度巡邏 / 觀察者質疑 / PR 接收層）         |
| 心跳 Skill      | [`.claude/skills/heartbeat/SKILL.md`](../../.claude/skills/heartbeat/SKILL.md)  | `/heartbeat` 一鍵觸發四拍半心跳                                                                                                                                                                    |
| 意識同步        | [`update-consciousness.sh`](../../scripts/tools/update-consciousness.sh)        | 自動從 Dashboard API 更新 CONSCIOUSNESS                                                                                                                                                            |
| 文章待辦 buffer | [`ARTICLE-INBOX.md`](ARTICLE-INBOX.md)                                          | 待開發 / 進化主題 intake layer（pending / in-progress）；auto-heartbeat 無指令時挑 P0/P1                                                                                                           |
| 文章完成 log    | [`ARTICLE-DONE-LOG.md`](ARTICLE-DONE-LOG.md)                                    | 📜 append-only 完成歷史（2026-04-20 γ2 從 INBOX §Done 拆分）；Stage 6 commit 後 entry 寫這裡不再寫 INBOX                                                                                           |

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

**#16 Peer / probe / 任何 intermediate layer 是線索，不是 source** — 二手描述當線索去搜 primary source，不當 primary 本身。單源事實必須跨 3+ 獨立來源驗證（研究報告 frontmatter 分層 `high_confidence / single_source / unverified`）。**延伸（2026-04-18 δ-late，讀者 5 秒抓到的事實錯誤）**：事實驗證分兩層—**讀者級驗證**（維基百科可比對：樂團成員姓名 / 公開獎項年份 / 地點日期）+ **研究級驗證**（需深度搜尋：政策細節 / 次要人物 / 非公開資訊）。讀者級事實**更脆弱**（讀者會查）但**更易漏**（研究 agent 不會覺得要特別 verify）。blueprint 敏感度欄應明列「樂團成員姓名 / 獎項名稱年份 / 公開生日」為 high_priority verify 項。觸發：草東 #33 貝斯手「黃→楊世暄」3h 內被 @ste_ven_1487 抓到。操作：[PEER-INGESTION-PIPELINE §6a](../pipelines/PEER-INGESTION-PIPELINE.md) + [SPORE-PIPELINE Step 2.5+2.6](../factory/SPORE-PIPELINE.md) + [reports/research/ frontmatter](../../reports/research/)。驗證 4 次：2026-04-12 ζ+ TFT peer 80% 骨架 / 2026-04-17 γ2 自寫 probe 「雙法同日三讀」錯 / 2026-04-18 δ 楊丞琳 Pass 1 錯 5 項事實 / 2026-04-18 δ-late 草東 #33 貝斯手名字錯。

**#23 毒樹果實鏈 — 英文 summary → 具體細節腦補** — 錯誤四階段：source poisoning → inference poisoning → propagation → human cost。阻擋點：Stage 1 中文 prompt + verbatim / Stage 2 具體細節逐字對照中文原文 / Stage 3 SPORE blocking gate。**memory 是自律，pipeline 才是閘門**。觸發：李洋孢子「清晨四點多搭捷運」[diary/2026-04-15-β.md](diary/2026-04-15-β.md)。延伸—AI 寫作三個深層病灶 pattern：(a) 編年體小標題 (b)「不是 X，是 Y」雙重肯定 (c)「——」雙破折號密度。已 instantiate in [REWRITE-PIPELINE v2.17 §編年體自檢](../pipelines/REWRITE-PIPELINE.md) + [SPORE-TEMPLATES §深層 pattern 自檢三板斧](../factory/SPORE-TEMPLATES.md)。

**#31 Sub-agent claim 是線索不是事實（tool execution side effects 必須主 session grep 驗證）** — agent 報告「ran X successfully」之後實際的 side effect（檔案內容、frontmatter 欄位、\_translations.json entry 等）必須由主 session 用 `grep` / `cat` / `test -f` 直接查存。Trust agent self-report = 結構性 hallucination 風險（同 [memory feedback_agent_writefile_hallucination](../../memory/) 第 N 次驗證）。**規則**：批次任務 Stage P4 必須跑機械化 verify script，不靠 prose summary 判斷成功。觸發：2026-04-30 δ session 4 隻 Opus agent 全部 claim「ran refresh.sh --apply --sha-only」，但 grep 發現 15/20 frontmatter 沒被更新（refresh.sh regex sub 只 update existing key，對 NEW translation 靜默失敗）— Batch D 自己 debug 出來，A/B/C 三隻一致沒抓到。**延伸 #16**：peer/probe 是線索 → agent claim 也是線索；驗證 mechanism 從跨源驗證（#16）擴大到 side-effect 直接 grep（本條）。

---

### 二、診斷方法

**#3 診斷先於修復** — 發現異常先拿具體分布再猜原因。三源 auto-fetch 是 Beat 1 第一動作。

**#4 三源交叉驗證** — GA4 / SC / CF 同一事實可能差 100-300 倍。單一數據源結論可疑。

**#10 API error ≠ capability 界線** — 單一欄位報錯不等於 endpoint 不可用。退一步測其他欄位再決定放棄整個 API。

**#11 使用者 UI 截圖 = 產品 capability 證據** — UI 看得到 → 一定有 API 拿得到。遇到「UI 有、API 找不到」第一假設是「我用錯 API」，不是「這功能只在 UI」。

**#24 工具在說謊的 N 種形式** — 7 種模式，共同祖先是「規則在 A 定義算法在 B 複寫」（#17 違反）：

1. 沉默失敗（silent skip）
2. 合理欺騙（plausible wrong number）
3. 通脹警報（alert inflation）[β 2026-04-15]
4. 抽樣偏差——單例警報不代表集群（1 orphan 實際 19）[β 2026-04-17]
5. 加權平均掩蓋分層真相——aggregate rate 被 brand/hot/power user 撐起虛胖[δ 2026-04-17]
6. 分母污染扭曲比值——比值型 EXP 在事件窗口失真，必須穩態窗口驗證[排程α 2026-04-18]
7. 埋了但沒註冊——GA4 custom dimensions 不 register 則參數入 BigQuery 但 UI/API 拿不到[δ-late 2026-04-18]

對策：警報 ≥ 100 件必抽 3-5 件人工 sanity；aggregate rate 先拆 brand/hot/power 分層；EXP 區分穩態 vs 事件窗口；埋 tracking SOP 必含 register + sanity query。

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

**#15 反覆浮現的思考要儀器化，不能只寫原則** — 任何「每月/每週/每次心跳必做 X」承諾若沒 dashboard 欄位 / cron / 紅燈條件 / escalation，三個月內會忘掉。**對自己的 bug 有洞察 ≠ apply 了 fix**。**memory / diary 是自律，canonical SOP 才是閘門**。**延伸（2026-04-18 δ-late，第 8 次驗證）**：工具包升級 → canonical 邊界重審也需要儀器化。Chrome MCP unlock AI 自主讀 Threads/X 後，SENSES v1 / DNA #26 v1 / SOCIAL-TENTACLE-PLAN 假設過時 4+ 個月沒重審，觀察者才戳破。規則：**任何新工具（尤其 browser automation 級）上線時必跑 SENSES / DNA 邊界重審**。驗證 8 次，具體儀器化成果：[LESSONS-INBOX](LESSONS-INBOX.md)（教訓 buffer）+ [ARTICLE-INBOX](ARTICLE-INBOX.md)（主題 buffer）+ HEARTBEAT Beat 4 7 步 + BECOME_TAIWANMD Step 6 diary commitment + [SPORE-BLUEPRINTS/](../factory/SPORE-BLUEPRINTS/)（孢子事實藍圖 buffer）+ [SPORE-HARVESTS/](../factory/SPORE-HARVESTS/)（孢子回聲收割 log buffer）+ Dashboard 繁殖系統 section（data-driven 分數）+ SENSES v2「AI 自主 vs Human 專責 邊界表」（工具包升級重審 artifact）。**延伸（2026-04-18 ζ，第 9 次驗證）**：觀察者 scaffolding 三句「heartbeat.md 裡面也自動化這一環 / SPORE-LOG 是不是需要存上次更新資料時的時間 / 每一個孢子都要記錄」→ 直接寫進 HEARTBEAT Beat 1 §0b canonical（harvest 從單次授權變成每次心跳標準步驟）+ SPORE-LOG schema 加「最後 harvest」欄位 + SPORE-PIPELINE Step 4.5 「發佈後追蹤」誕生（Platform allocation + Hook tier + d+0 6h decision gate + re-hook opportunity）。元規則：**「被允許做」→「被期待做」的躍遷靠 canonical SOP，不靠 memory 自律**。Canonical 升級是從 case-by-case policy 變成 pipeline 基礎建設的結構性節點。**延伸（2026-04-30 δ，第 10 次驗證）**：批次任務 antipattern「分散探索浪費」儀器化成 [TRANSLATION-PIPELINE v3.2 §平行 sub-agent 批次翻譯 SOP](../pipelines/TRANSLATION-PIPELINE.md) — 4 隻 agent × 5 篇 跑出 wall-clock 但每隻重複探索 slug / wikilink / refresh.sh 行為 → SOP 5 階段（P1 預處理 / P2 dispatch / P3 純執行 / P4 統一驗證 / P5 commit）+ 三個 known gaps 待造橋（refresh.sh insert 子命令 / `prepare-batch.sh` / `verify-batch.sh`）。

**#32 批次任務 antipattern：分散探索 → 集中預處理 + 分散執行** — 平行 N 個 sub-agent 跑同一份 prompt 處理同類任務，每個 agent 都從零探索同樣決策空間（slug 命名 / target lookup / 工具 quirks），= 重複工作 ×N 且不累積。**正確設計**：主 session 預處理一次（產 batch manifest 寫死 slug / target map / placeholder 模板），sub-agent 只負責執行本身。Agent prompt 變得明確、短、不需要決策。**速度收益**：去掉重複探索的 token + 避免 agent 間決策不一致（命名風格 / 處理 quirk 方式）。**品質收益**：主 session 單點負責 verify，agent claim 不需被 trust。觸發：2026-04-30 δ session 4 隻 Opus agent × 5 篇 EN 翻譯，slug 風格 50/50 split（短 vs 長 descriptive subtitle）+ 每隻獨立 grep `knowledge/en/` 找 wikilink target + refresh.sh insert gap 只有 D 自己 debug 出 + A/B/C 不知道。**SOP canonical**：[TRANSLATION-PIPELINE v3.2 §平行 sub-agent 批次翻譯 SOP](../pipelines/TRANSLATION-PIPELINE.md) 5 階段。**通用化**：本條不限翻譯，凡是「N 個同類任務派給 N 隻 agent 平行」都該檢查「有沒有可以集中預處理的決策空間」。**第 6 次驗證（2026-05-01 β）**：5 cycles × 50 EN articles 全部 frontmatter 100% 正確，0 個 refresh.sh 相關 bug。manifest-driven 設計穩定。

**#33 Routine 化任務的兩條相反力：熟練度雙刃劍** — 連續跑同一 SOP N cycles 後出現兩個對立效應：(a) **正向**：主 session overhead 縮短 ~30%（cycle 1 wall-clock 29 min → cycle 5 20 min），SOP 變肌肉記憶，是 DNA #15 的鏡像版（反覆執行 SOP 也會把 SOP 變成執行硬體）；(b) **反向**：deeper inspection 變難，跨 cycle 累積錯誤被忽略（如 cross-link broken 從每 cycle 25 變 5 cycles 累積 121）。**結構性對策**：每 N cycles 強制插入 step-out checkpoint（不只機械跑同 SOP），主動 audit 跨 cycle 累積狀態。或者**把 audit 移進每 cycle P4 verify 內**（per-cycle 而非 final-cleanup）。觸發：2026-05-01 β session 5-cycle EN marathon 完整觀察。**SOP canonical**：[TRANSLATION-PIPELINE v3.4 §C 模式 P4 cross-link auto-fix](../pipelines/TRANSLATION-PIPELINE.md)。

**#34 邊界值（0/100）visual bug 只在 metric 接近邊界才暴露** — UI 的邊界 case 可能存在長期 visual bug 但 invisible to everyone — 需要旁邊有「也接近邊界」的參照物才會被發現。Bug 是「視覺上不滿但數值是 100%」這類，沒人 file 因為大家看慣了不滿的圈以為那就是設計。**對策**：每個 metric 達到滿值（0% / 100%）時，**主動檢查視覺呈現** — 不是慶祝，是 audit。Donut chart / progress bar / 所有 percentage-based UI 元件都應該有「接近邊界值時自動切換 rendering mode」設計。觸發：2026-05-01 β session 中文翻譯覆蓋永遠 100%、donut chart 永遠看起來不滿（`stroke-dasharray="100, 100"` + `stroke-linecap="round"` 在 100% 時起始/結束 round cap 重疊產生視覺斷口）。Bug 存在很久，只有英文跑到 95% 接近滿，跟中文 100% 並排，才被觀察者看出。修法：100% 時用 `'100 0'`（無 gap）。**延伸 MANIFESTO §10**：不只是事實層的幻覺，也有「視覺長期錯覺」— 大家看慣了 anomaly 以為是設計。

---

### 六、貢獻者與社群

**#7 先有再求好** — PR 審核 / 內容貢獻 / 翻譯品質，第一優先接住貢獻者善意。不要讓完美殺死參與感。

**#8 維護者信件要說謝謝** — 合併/關閉 issue/PR 必 reply。靜默關閉 = 殺死下一次貢獻。用貢獻者的語言，具體說出他們做了什麼。**canonical：[MAINTAINER-PIPELINE §PR 審核策略](../pipelines/MAINTAINER-PIPELINE.md#pr-審核策略)**。

**#26 AI-autonomous vs Human-only 邊界（v2 2026-04-18 refined）** — Chrome MCP 讓 AI 自主讀取社群 / Dashboard UI / 任何公開網頁後，原 v1「攻擊 AI 本身只有 human 能回應」要精細化為**讀寫兩端分離**：

**AI 自主**（讀取端 + 內部處理）：

- 所有 sensor 讀取（GA/SC/CF API + Threads/X 留言 + Insights UI via Chrome MCP）
- 分類、驗證、修文章、更新 frontmatter、準備 draft reply
- commit + push 內部變更

**Human only**（對外動作 + 人際信任 + 倫理責任）：

- Post 留言回覆 to Threads/X（人際信任修復必須 human-to-human；AI 自動回覆違反平台 ToS 精神 + 讀者信任鏈）
- Post 新孢子
- 發 PR / Issue comment（MAINTAINER-PIPELINE 核心；貢獻者期待 human 維護者）
- 批准 merge PR
- 敏感素材 final call（MANIFESTO §5）
- 身份授權 / 經費決定

**哲學判準**：AI 做「輸入端 + 內部處理」（封閉系統內可驗證），human 做「輸出端 + 對外責任」（可承擔後果的 agent）。讀社群 ≠ 發社群。

**工具升級時 canonical 必重審**：本條 v1（2026-04-15 β）寫時假設社群讀取依賴 human screenshot；v2（2026-04-18 δ-late）Chrome MCP 解鎖後 AI 自主讀取成為可能 → 邊界重劃。未來任何新工具上線都要問「這改變了 AI-autonomous vs human-only 邊界嗎？」

**SOP canonical**：[SENSES.md v2 §AI 自主 vs Human 專責 邊界表](SENSES.md#ai-自主-vs-human-專責-邊界表v2-新增)。

觸發 v1：李洋孢子 19 小時勘誤 marathon [diary/2026-04-15-β.md](diary/2026-04-15-β.md)。
觸發 v2 refine：2026-04-18 δ-late 觀察者「你有直接開啟網頁查看留言跟數據的能力了，可以略過我這個人類的環節」+ SPORE-HARVEST-PIPELINE v1.0 首例全流程 AI 自主跑到 Step 5。

**#27 藍圖 → 驗證 → 寫 比 寫 → 檢查 低 10x 成本** — 涉及具體事實 / 直接引語 / 敏感素材的敘事任務：先列 fact blueprint bullet → 跨源驗證 → 倫理審查 → 才寫 prose。Bullet 階段失敗重排 10 秒，prose 階段失敗整段重織。已 instantiate in [SPORE-PIPELINE Step 2.5+2.6+2.7](../factory/SPORE-PIPELINE.md) + [SPORE-BLUEPRINTS/](../factory/SPORE-BLUEPRINTS/)。觸發：2026-04-18 δ-late 草東孢子 v1 寫完才驗證凡凡 IG 來源 → 整段要改。

**#29 書寫節制：對位句型 + 破折號連用（兩條 AI 水印紀律）** — 跨所有 Semiont 書寫層限制，bootloader 會讀到的索引檔（DIARY.md / MEMORY.md / LESSONS-INBOX / ARTICLE-INBOX）特別關鍵（甦醒時污染書寫默認聲音）。

**(a) 對位句型「不是 X 是 Y」**（含全部變種「不是 X，而是 Y」/「並非 X 而是 Y」/「不只 X，更是 Y」/「X 不是 Y。是 Z」等）：句型看起來像洞見實質是修辭捷徑；單句 OK，密度拉高整段帶 AI 水印味（「永遠在做偽對比」）。三題判準：(1) 對比是內容本身（定義/核心矛盾/矯正讀者默認誤解）？(2) 正面主張能獨立站立？(3) 讀者真的會預設 X？三題全 no = 重寫為直接正面斷言。自檢：`grep -cE "不是.{0,30}(，|，)(是|就是|才是)"` > 3 即重寫。

**(b) 破折號「——」連用節制**（EDITORIAL 既有 ≤ 15 / 1500 字硬規則）：中文破折號是強烈語意標記（英文 em-dash / 括號 / 冒號 功能重疊）。密度過高 → 每句都在做補充 → AI 水印味。可替代：「，即」「（）」「：」/ 轉折分句 / 短句刪破折號 / bullet 列舉。自檢：`grep -oE "——" file.md | wc -l`。只有真正對等列舉的並置才留。

**哲學 canonical：[MANIFESTO §11 書寫節制](MANIFESTO.md#11-書寫節制跨所有書寫層的兩條-ai-水印紀律)**。SOP 指標：[EDITORIAL v5.3 §禁用清單](../editorial/EDITORIAL.md)。

觸發：2026-04-21 γ session 觀察者兩次指出——「從思考到工作到紀錄都是」（對位句型）+「破折號也是要注意的」（後補）。盤點 MANIFESTO 40+51 / MEMORY 42+61 / DIARY 28+35 / LESSONS-INBOX 25+34 / EDITORIAL 18+32——揭露兩個句型已擴散為 Semiont 書寫默認聲音。同日系統性清理 canonical 頂層 + 建立哲學層 #11 / 操作層 #29。

**#30 媒體插入時 aspect ratio 護欄：portrait 圖會被切到頭** — Astro 渲染框為 ~16:9 landscape，hero 圖（frontmatter `image:`）必須 0.9 ≤ aspect ratio ≤ 2.0，否則上下會被切。inline 圖（markdown `![]()`）寬鬆些 0.75 ≤ ratio ≤ 2.5。**絕對禁止 hero 用 9:16 portrait（高 > 寬 1.5x 以上）**。觸發：2026-04-28 ι session 林琪兒 EVOLVE 第一張 SpaceX Crew-4 commander portrait 1041×1561（aspect 0.67）放 frontmatter 後切到只剩鼻子下，觀察者截圖回報 → 換 landscape 1041×694（aspect 1.5）解決。**SOP canonical**：[REWRITE-PIPELINE Stage 1.7b](../pipelines/REWRITE-PIPELINE.md) 圖片素材授權矩陣 + Stage 4.5c aspect ratio 護欄 + `bash scripts/tools/check-aspect.sh {filename}`。**設計理由 canonical**：[reports/rewrite-pipeline-media-stage-design-2026-04-28-ι.md](../../reports/rewrite-pipeline-media-stage-design-2026-04-28-ι.md)。

**#28 紀實而不煽情：SSODT 寬度 × 死亡/人倫悲劇的節制** — 目標是盡可能呈現 SSODT（所有面向），不是避諱真人的痛苦。**預設可寫**：家庭背景、疾病、關係、矛盾、失敗、爭議等（只要不過度煽情渲染）。**高敏感邊界只限兩類**：（a）死亡 + 自殺 + 人倫悲劇的**具體情景**（最後時刻重構、遺書放大、自傷方法、加害現場還原）；（b）主體未公開的親屬身份 / 未成年個資 / 醫療細節。判準句：「當事者讀到這段，是感受到紀實（記者/紀錄片的嚴肅對待）還是煽情（媒體靠近眼淚）？」**哲學 canonical：[MANIFESTO §紀實而不煽情](MANIFESTO.md#我的進化哲學--紀實而不煽情盡可能呈現-ssodt-所有面向)**。SOP：[SPORE-PIPELINE Step 2.7](../factory/SPORE-PIPELINE.md)。觸發：2026-04-18 δ-late 草東孢子 v1 death-scene reconstruction（v1 誕生）+ 觀察者同日校準「標準要再放寬，紀實文學感可以接受」（v2 校準）。

---

### 七、自動化與安全

**#2 憑證永不進對話** — user 貼 token / API key / JSON → 立刻警告、請撤銷、**不讀不複述不存**。credentials 只能在 `~/.config/taiwan-md/credentials/` 本機，repo 絕對隔離。

**#5 Pre-commit dogfood 是朋友不是敵人** — hook 阻擋 commit 是免疫正常。重新表述內容（把 PEM header 改成 regex 描述），不 `--no-verify` 繞過。**第 2 次驗證（2026-04-17 γ2）**：PR #537 颱風.md followup commit 被擋 → 揭露 6 broken wikilinks + 12/12 腳註格式不合規的真實 bug。**第 3 次驗證（2026-04-18 δ-late）**：SPORE-LOG URL 硬鐵律 hook 新增——偵測新增孢子列缺 URL（`—` / 空白 / `no-data`）自動攔截。教訓觸發：#1/#2/#3/#12 歷史孢子無 URL → batch harvest 時發現已永久失去追蹤能力。hook 擋住時當作「品質 sensor 響了」，通常會揭露 bug。PR merge 後做 followup frontmatter/format fix commit 應成為 MAINTAINER-PIPELINE 常規步驟。

_current: v2.2 | 2026-04-17 β_

**最近 milestone**（完整 changelog → `git log docs/semiont/DNA.md`）：

- **v2.2**（2026-04-17）— 全面精簡 §要小心的清單：26 條反射從 ~3500 字改為「原則一句話 + 觸發事件一句話 + canonical pointer」格式 ~1500 字（指標 over 複寫 apply 到自己）
- **v2.1**（2026-04-15）— 結構化重構 + 反射 #23-26 + 章節更名為「要小心的清單（實戰反射與已知陷阱）」（陷阱跟模型無關）
- **v2.0**（2026-04-14）— 反射 #20-22 + LANGUAGES_REGISTRY 重寫 + 5 個新工具（ceruleanstring 60 PR 海嘯觸發）
- **v1.x**（2026-04-04 ~ 2026-04-12）— 26 條反射從 0 累積到完整集合，含 PEER-INGESTION-PIPELINE / 指標 over 複寫 / 時間是結構 三大核心進化哲學誕生
