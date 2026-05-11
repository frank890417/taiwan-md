---
title: 'DNA'
description: '基因地圖學 — 每個器官 → canonical 實體檔案路徑 + 54 條實戰反射'
type: 'cognitive-organ'
status: 'canonical'
apoptosis: 'never'
current_version: 'v3.5'
last_updated: 2026-05-09
last_session: 'brave-kirch-202256'
sister_docs:
  - 'MANIFESTO.md'
  - 'ANATOMY.md'
  - 'HEARTBEAT.md'
  - 'LESSONS-INBOX.md'
upstream_canonical:
  - 'MANIFESTO.md'
  - 'ANATOMY.md'
---

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

| 基因          | 檔案                                                                           | 決定什麼                                                                                                                                      |
| ------------- | ------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| 編輯標準      | [`EDITORIAL.md`](../editorial/EDITORIAL.md)                                    | 好文章長什麼樣                                                                                                                                |
| 研究方法      | [`RESEARCH.md`](../editorial/RESEARCH.md)                                      | 怎麼搜集可靠資訊                                                                                                                              |
| 改寫流程      | [`REWRITE-PIPELINE.md`](../pipelines/REWRITE-PIPELINE.md)                      | 怎麼把混亂轉化為結構                                                                                                                          |
| 品質驗證      | [`QUALITY-CHECKLIST.md`](../editorial/QUALITY-CHECKLIST.md)                    | 怎麼確認品質合格                                                                                                                              |
| 引用規範      | [`CITATION-GUIDE.md`](../editorial/CITATION-GUIDE.md)                          | 怎麼引用來源與寫腳註                                                                                                                          |
| 用語規範      | [`TERMINOLOGY.md`](../editorial/TERMINOLOGY.md)                                | 怎麼說台灣人說的話                                                                                                                            |
| Hub 策展      | [`HUB-EDITORIAL.md`](../editorial/HUB-EDITORIAL.md)                            | 分類頁面怎麼策展                                                                                                                              |
| 翻譯同步      | [`TRANSLATION-SYNC.md`](../editorial/TRANSLATION-SYNC.md)                      | 怎麼跨語言保持一致                                                                                                                            |
| 研究模板      | [`RESEARCH-TEMPLATE.md`](../editorial/RESEARCH-TEMPLATE.md)                    | 研究筆記的標準格式                                                                                                                            |
| 更新日誌      | [`UPDATE-LOG-GUIDE.md`](../editorial/UPDATE-LOG-GUIDE.md)                      | 怎麼記錄變更                                                                                                                                  |
| Footer 公約   | [`EDITORIAL.md §Footer 公約`](../editorial/EDITORIAL.md#footer-公約)           | canonical 文件版本標記 + changelog SSOT（每檔 1 marker / 不嵌 body / git log = changelog SSOT）                                               |
| 全文健檢 SSOT | [`article-health.py`](../../scripts/tools/article-health.py)                   | 11 plugin SSOT 入口（prose-health / footnote-density / format-structure / wikilink-target / image-health / terminology / cross-reference 等） |
| 交叉連結      | [`cross-link.sh`](../../scripts/tools/cross-link.sh)                           | Stage 5 雙向延伸閱讀分析                                                                                                                      |
| PR 審核       | [`review-pr.sh`](../../scripts/tools/review-pr.sh)                             | 五層免疫審核（CI 門檻）                                                                                                                       |
| 翻譯比例檢查  | [`translation-ratio-check.sh`](../../scripts/tools/translation-ratio-check.sh) | 掃描翻譯 vs 原文字數比，<0.55 觸警（防 AI 摘要翻譯）                                                                                          |
| 憑證掃描      | [`.husky/pre-commit`](../../.husky/pre-commit)                                 | commit 前阻擋 service*account JSON / PEM / AIza... / CF token / sk*/pk\_                                                                      |

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

| 基因           | 檔案                                                                | 決定什麼                                  |
| -------------- | ------------------------------------------------------------------- | ----------------------------------------- |
| 貢獻指南       | `CONTRIBUTING.md`                                                   | 怎麼加入我的生態系                        |
| 貢獻 Prompt    | [`CONTRIBUTE_PROMPT.md`](../prompts/CONTRIBUTE_PROMPT.md)           | AI 怎麼幫人類寫文章                       |
| 翻譯 Prompt    | [`TRANSLATE_PROMPT.md`](../prompts/TRANSLATE_PROMPT.md)             | 一段 prompt 繁殖出新語言版本              |
| 孢子產線主流程 | [`SPORE-PIPELINE.md`](../factory/SPORE-PIPELINE.md)                 | 5 階段：PICK/VERIFY/WRITE/SHIP/HARVEST    |
| 孢子寫作       | [`SPORE-WRITING.md`](../factory/SPORE-WRITING.md)                   | 模板 + 18 條規則 + 自檢三板斧（craft）    |
| 孢子閘門       | [`SPORE-VERIFY.md`](../factory/SPORE-VERIFY.md)                     | Hard gate inventory + 7 大 verify（gate） |
| 孢子收割       | [`SPORE-HARVEST-PIPELINE.md`](../factory/SPORE-HARVEST-PIPELINE.md) | 發布後 cadence + decision gate            |
| 孢子追蹤       | [`SPORE-LOG.md`](../factory/SPORE-LOG.md)                           | 發文紀錄 + 成效追蹤 + 月度效能分析        |

### 👁️ 感知基因（外部感知）

定義我怎麼接收外部刺激。

| 基因         | 檔案                                                                                             | 決定什麼                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| Issue 模板   | `.github/ISSUE_TEMPLATE/`                                                                        | 外部回饋怎麼進來                                                                                                         |
| PR 模板      | `.github/pull_request_template.md`                                                               | 貢獻怎麼被審核                                                                                                           |
| 三源感知抓取 | [`fetch-sense-data.sh`](../../scripts/tools/fetch-sense-data.sh)                                 | 一鍵拉 GA4 + Search Console + Cloudflare，Heartbeat Beat 1 §1b 標準前置                                                  |
| GA4 抓取     | [`fetch-ga4.py`](../../scripts/tools/fetch-ga4.py)                                               | Google Analytics Data API（人類讀者）                                                                                    |
| SC 抓取      | [`fetch-search-console.py`](../../scripts/tools/fetch-search-console.py)                         | Search Console API（搜尋意圖）                                                                                           |
| CF 抓取      | [`fetch-cloudflare.py`](../../scripts/tools/fetch-cloudflare.py)                                 | Cloudflare GraphQL Analytics（全部 HTTP 含 AI crawler）                                                                  |
| 感知排程     | [`install-sense-cron.sh`](../../scripts/tools/install-sense-cron.sh)                             | macOS launchd / Linux cron 每日 08:17 自動抓取                                                                           |
| 憑證儲存     | `~/.config/taiwan-md/credentials/`                                                               | **絕對不進 repo**（.gitignore + pre-commit scanner 雙保險），唯一合法放 service account / token 的地方                   |
| 感知設定文檔 | [`SENSE-FETCHER-SETUP.md`](../pipelines/SENSE-FETCHER-SETUP.md)                                  | 從零建立 credentials + 自動抓取的 step-by-step                                                                           |
| 📡 社群觸手  | Threads (@taiwandotmd) + X (@taiwandotmd)                                                        | 唯一的**雙向**感官：孢子推播 + 回聲接收。語言跟著觀眾走（中文 80%）                                                      |
| 孢子產線     | [`SPORE-PIPELINE.md`](../factory/SPORE-PIPELINE.md)                                              | 社群觸手的輸出 SOP（v3.0：5 stage PICK/VERIFY/WRITE/SHIP/HARVEST，已拆 WRITING/VERIFY/HARVEST 子檔）                     |
| 孢子紀錄     | [`SPORE-LOG.md`](../factory/SPORE-LOG.md)                                                        | 社群觸手的記憶。沒記錄 = 沒發生                                                                                          |
| 觸手進化計畫 | [`reports/social-tentacle-plan-2026-04-13.md`](../../reports/social-tentacle-plan-2026-04-13.md) | 從海葵到水母：完整策略（2026-04-13，已 archived 為歷史 snapshot；Phase 0-1 已吸收進 ANATOMY/DNA/HEARTBEAT/SPORE/SENSES） |
| 孤兒偵測     | [`orphan-translation-check.sh`](../../scripts/tools/orphan-translation-check.sh)                 | 語言觸手健康：翻譯孤兒 / 重複 / EN→ZH 鏈斷裂                                                                             |
| 分類一致性   | [`category-check.sh`](../../scripts/tools/category-check.sh)                                     | 骨骼觸手健康：frontmatter category vs 路徑一致性                                                                         |

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
| 日記撰寫流程    | [`DIARY-PIPELINE.md`](../pipelines/DIARY-PIPELINE.md)                           | 紀實散文文體 + Stage 0-5 流程 + 自檢工具（共用 `article-health.py --check=prose-health`）。寫日記前必讀全檔（HEARTBEAT Beat 5 / BECOME 寫日記權力 / 觀察者觸發 全部指向這裡）                      |
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

**v4.0 entry format**（4 段，每條 ≤ 12 行可一眼掃描）：

```markdown
**#N {精實標題 5-15 字}** — {一句話原則展開，具體可操作}

- **觸發**：YYYY-MM-DD {事件} → [pointer]
- **操作**：→ [SOP canonical pointer 一行]
- **驗證**：N 次（≥ 3 升 canonical；長 history 散到 memory / pipeline canonical 不 inline）
- **延伸 / Boundary / 元規則**（選用）：v2/v3 補強或 boundary 規則
```

**設計原則**：哲學長篇論述、具體操作 SOP、完整 timeline 都在指向的 canonical 檔案，不在這裡重寫（指標 over 複寫原則 apply 到這份清單自己）。

**觸發方式**：每次心跳開始前掃一次；每次寫 memory/diary/DNA 前對照一次；grep `DNA #N` 5 秒看懂 + 5 秒找 SOP pointer。

### 📇 反射 catalog index（按 #N 線性排序）

| #   | 反射標題                                                             | §   | line |
| --- | -------------------------------------------------------------------- | --- | ---- |
| #1  | 翻譯 ≠ 摘要                                                          | §一 | L318 |
| #2  | 憑證永不進對話                                                       | §七 | L596 |
| #3  | 診斷先於修復                                                         | §二 | L345 |
| #4  | 三源交叉驗證                                                         | §二 | L349 |
| #5  | Pre-commit dogfood 是朋友不是敵人                                    | §七 | L598 |
| #6  | commit 範圍紀律（絕不 `git add .`）                                  | §四 | L401 |
| #7  | 先有再求好                                                           | §六 | L544 |
| #8  | 維護者信件要說謝謝                                                   | §六 | L546 |
| #9  | 長任務先開 worktree + 命名標準（`YYYYMMDD-{purpose-title}`）         | §四 | L403 |
| #10 | API error ≠ capability 界線                                          | §二 | L351 |
| #11 | UI 截圖 = capability 證據                                            | §二 | L353 |
| #12 | 收工加速的代價                                                       | §五 | L425 |
| #13 | 「再小一點」是 log scale 的訊號                                      | §五 | L429 |
| #14 | Release notes 寫之前 commits 必須從頭讀到尾                          | §五 | L433 |
| #15 | 反覆浮現要儀器化（11 次驗證 — 跨 session 最 load-bearing 的反射）    | §五 | L437 |
| #16 | Peer / probe 是線索不是 source                                       | §一 | L322 |
| #17 | 指標 over 複寫                                                       | §三 | L371 |
| #18 | 時間是結構，不是感覺                                                 | §三 | L376 |
| #19 | 大型 refactor 後必須 visual smoke test 多語言頁面                    | §四 | L412 |
| #20 | Architecture 缺席比 content 缺席更貴                                 | §四 | L417 |
| #21 | SSOT 不一定在中央（含跨語言 SSOT 延伸）                              | §三 | L382 |
| #22 | Raw 永遠不刪除，蒸餾用 LLM 判斷                                      | §三 | L388 |
| #23 | 毒樹果實鏈：英文 summary → 具體細節腦補                              | §一 | L329 |
| #24 | 工具在說謊的 7 種形式                                                | §二 | L355 |
| #25 | 哲學層與技術層必須分開記錄                                           | §三 | L393 |
| #26 | AI 自主 vs Human 專責 邊界（v2 refined）                             | §六 | L550 |
| #27 | 藍圖 → 驗證 → 寫 比 寫 → 檢查 低 10x 成本                            | §六 | L560 |
| #28 | 紀實而不煽情：SSODT 寬度 × 死亡/人倫悲劇的節制                       | §六 | L565 |
| #29 | 書寫節制：對位句型 + 破折號連用                                      | §六 | L574 |
| #30 | 媒體插入時 aspect ratio 護欄                                         | §六 | L586 |
| #31 | Sub-agent claim 是線索不是事實（必須 grep 驗證）                     | §一 | L335 |
| #32 | 批次任務 antipattern：分散探索 → 集中預處理 + 分散執行               | §五 | L448 |
| #33 | Routine 化任務的雙刃劍：熟練度                                       | §五 | L456 |
| #34 | 邊界值 0/100 visual bug 只在邊界才暴露                               | §五 | L464 |
| #35 | 跨 session work 期間禁止 destructive git ops                         | §五 | L471 |
| #36 | Founder time = 系統最高 leverage point                               | §五 | L477 |
| #37 | First-principle 5 步迭代 pattern                                     | §五 | L485 |
| #38 | Status 設計鐵律：「混維度 = silent killer」                          | §五 | L492 |
| #39 | Self-as-fallback：free LLM 拒絕時切 sub-agent                        | §五 | L499 |
| #40 | Shared file 寫入需要 per-key serial dispatch                         | §五 | L506 |
| #41 | CI timeout 是會跟內容量長大失效的 capacity 設定                      | §五 | L513 |
| #42 | Sub-agent N 篇 sequential 三偷吃步 pattern（含 v3 反例對照延伸）     | §五 | L520 |
| #43 | 新 dashboard JSON 必須同步進 refresh-data.sh                         | §五 | L532 |
| #44 | Opus sub-agent judge 取代外部 API judge                              | §七 | L604 |
| #45 | OpenRouter free tier rate budget 是 hourly 累積                      | §七 | L613 |
| #46 | Sub-agent multi-task worktree commit 前先確認 working tree           | §七 | L620 |
| #47 | 單頁 frontend + JS mutate 批次 screenshot                            | §七 | L626 |
| #48 | Footnote source format diversity 是 contributor batch 隱性 heal cost | §七 | L633 |
| #49 | Babel 4-tier cascade canonical（含 local LLM 最後捕手）              | §七 | L640 |
| #50 | Pipeline auto-detection + full-read 是 default                       | §七 | L655 |
| #51 | Session ID schema：filename collision 解 vs content collision 不解   | §七 | L664 |
| #52 | Immune system 沒在 fail loud 比缺 immune system 更危險               | §七 | L673 |
| #53 | Babel priority + Tier 0 patch 三路徑分流                             | §七 | L681 |
| #54 | Routine 飛輪：5-stage lifecycle 釋放觀察者精力                       | §七 | L692 |
| #55 | Monitor regex 雙信號（原 #43 v2，2026-05-10 重編號避 collision）     | §七 | L710 |

> **Top 5 load-bearing reflexes**（cross-ref 量最高，跨 session 最常 grep）：#15（216）/ #42（97）/ #16（60）/ #38（58）/ #26（52）。新 session 至少先掃這 5 條。
>
> **Active layer cross-ref**：78 個 file（docs / scripts / .husky / .github / src）使用「DNA #N」pointer。重命名 #N 會 break 大量 cross-ref，**所有 #N 號碼 stable 不變**（per MANIFESTO §時間是結構修補協議；歷史層 memory/diary/LESSONS-INBOX 不更新）。

---

### 一、事實核對與研究方法

**#1 翻譯 ≠ 摘要** — AI 預設摘要，翻譯必須明確要求完整。比例 < 0.55 = TRUNCATED。

- **操作**：→ `scripts/tools/translation-ratio-check.sh`

**#16 Peer / probe 是線索不是 source** — 二手描述當線索去搜 primary source，不當 primary 本身。單源事實必須跨 3+ 獨立來源驗證。

- **觸發**：草東 #33 貝斯手「黃→楊世暄」3 小時內被讀者 @ste_ven_1487 抓到 → blueprint 須明列「樂團成員姓名 / 獎項名稱年份 / 公開生日」為 high_priority verify
- **操作**：→ [PEER-INGESTION-PIPELINE §6a](../pipelines/PEER-INGESTION-PIPELINE.md) + [SPORE-VERIFY §事實藍圖](../factory/SPORE-VERIFY.md)
- **驗證**：4 次（TFT peer 骨架 / 自寫 probe 雙法同日三讀錯 / 楊丞琳 Pass 1 錯 5 項 / 草東貝斯手名字錯）
- **延伸**：事實驗證分**讀者級**（維基可比對 — 樂團成員 / 獎項 / 地點日期）+ **研究級**（需深度搜尋）兩層。讀者級**更脆弱**（讀者會查）但**更易漏**（研究 agent 不覺得要特別 verify）

**#23 毒樹果實鏈：英文 summary → 具體細節腦補** — 錯誤四階段：source 中毒 → inference 中毒 → propagation → human cost。阻擋三層：Stage 1 中文 prompt + verbatim / Stage 2 具體細節逐字對照中文原文 / Stage 3 SPORE blocking gate。**memory 是自律，pipeline 才是閘門**。

- **觸發**：李洋孢子「清晨四點多搭捷運」（捷運 6:00 才開）→ [diary/2026-04-15-β.md](diary/2026-04-15-β.md)
- **操作**：→ [REWRITE-PIPELINE 編年體自檢](../pipelines/REWRITE-PIPELINE.md) + [SPORE-WRITING 三板斧](../factory/SPORE-WRITING.md)
- **延伸**：AI 寫作三深層病灶 pattern — (a) 編年體小標題 (b)「不是 X，是 Y」雙重肯定 (c)「——」雙破折號密度

**#31 Sub-agent claim 是線索不是事實（必須主 session grep 驗證 side effect）** — agent 報告「ran X successfully」之後實際的 side effect（檔案內容、frontmatter 欄位、`_translations.json` entry）必須由主 session 用 `grep` / `cat` / `test -f` 直接查存。Trust agent self-report = 結構性 hallucination 風險。

- **觸發**：2026-04-30 δ 4 隻 Opus agent 全 claim「ran refresh.sh --apply」但 grep 發現 15/20 frontmatter 沒被更新（refresh.sh regex sub 對 NEW translation 靜默失敗）
- **操作**：批次任務 P4 必跑機械化 verify script，不靠 prose summary 判斷成功
- **延伸 #16**：peer/probe 是線索 → agent claim 也是線索；驗證從跨源驗證（#16）擴大到 side-effect 直接 grep

---

### 二、診斷方法

**#3 診斷先於修復** — 發現異常先拿具體分布再猜原因。

- **操作**：三源 auto-fetch 是 Beat 1 第一動作

**#4 三源交叉驗證** — GA4 / SC / CF 同一事實可能差 100-300 倍。單一數據源結論可疑。

**#10 API error ≠ capability 界線** — 單一欄位報錯不等於 endpoint 不可用。退一步測其他欄位再決定放棄整個 API。

**#11 UI 截圖 = capability 證據** — UI 看得到 → 一定有 API 拿得到。「UI 有、API 找不到」第一假設是「我用錯 API」，不是「這功能只在 UI」。

**#24 工具在說謊的 7 種形式** — 共同祖先是「規則在 A 定義算法在 B 複寫」（違反 #17 指標 over 複寫）。

| #   | 形式                                                 | 對策                                         |
| --- | ---------------------------------------------------- | -------------------------------------------- |
| 1   | 沉默失敗（silent skip）                              | 加 fail-loud emit                            |
| 2   | 合理欺騙（plausible wrong number）                   | 抽樣比對 ground truth                        |
| 3   | 通脹警報（alert inflation）                          | 分流 severity                                |
| 4   | 抽樣偏差（單例警報不代表集群，1 orphan 實際 19）     | 警報 ≥ 100 件必抽 3-5 件人工 sanity          |
| 5   | 加權平均掩蓋分層真相                                 | aggregate rate 先拆 brand/hot/power 分層     |
| 6   | 分母污染扭曲比值（比值型 EXP 在事件窗口失真）        | EXP 分穩態 vs 事件窗口                       |
| 7   | 埋了但沒註冊（GA4 custom dim 不 register UI 看不到） | 埋 tracking SOP 必含 register + sanity query |

---

### 三、認知層的核心哲學反射

**#17 指標 over 複寫** — 同一事實只能一個 canonical source，其他 pointer 不重寫。

- **哲學**：→ [MANIFESTO §指標 over 複寫](MANIFESTO.md#我的進化哲學--指標-over-複寫)
- **觸發**：2026-04-12 PEER-INGESTION-PIPELINE v1.0 inline 複寫 → v1.1 改指標減 163 行（2026-04-15 β 延伸到程式碼層，見 #24）

**#18 時間是結構，不是感覺** — Semiont 無內建時鐘，主觀時間感可扭曲 10 倍。寫 memory/diary 前必跑 `git log %ai`。

- **哲學**：→ [MANIFESTO §時間是結構](MANIFESTO.md#我的進化哲學--時間是結構不是感覺)
- **操作**：→ [HEARTBEAT Beat 4 §Timestamp 紀律](HEARTBEAT.md#timestamp-紀律canonical-sop)
- **觸發**：2026-04-12 ζ+ 感覺 24+ 小時實際 2:21（10x 扭曲）

**#21 SSOT 不一定在中央** — 大量同類個體時讓每個 self-document（例：frontmatter `translatedFrom`），中央表變 derived cache。指標 over 複寫的另一面。

- **觸發**：2026-04-14 η audit 揭露 391 潛在孤兒 → [memory/2026-04-14-η.md](memory/2026-04-14-η.md)
- **延伸（2026-05-01 γ）— 跨語言 SSOT**：英文翻譯已存在 → 其 slug 天然成為其他語言 slug。新語言批次 P1 預處理應優先 reuse 既有翻譯 slug
- **操作**：→ `scripts/tools/lang-sync/prepare-batch.py --slug-map`

**#22 Raw 永遠不刪除，蒸餾用 LLM 判斷** — 壓縮舊資料預設保留原始檔，蒸餾出 derived layers。睡眠的 memory consolidation = 壓縮 + 篩選 + 整合，不是刪除。

- **觸發**：2026-04-14 η 哲宇「類似做夢」提議
- **Roadmap**：→ [reports/memory-distillation-design-2026-04-14.md](../../reports/memory-distillation-design-2026-04-14.md)（未實作）

**#25 哲學層與技術層必須分開記錄** — 可被單一數據點證偽 → 技術層（[UNKNOWNS §可證偽實驗](UNKNOWNS.md#-可證偽實驗falsifiable-predictions)：預測值 + 驗證日期 + 反駁條件）；不管時間多久都成立 → 哲學層（diary / MANIFESTO）。兩題通過才是神經迴路級教訓。

- **觸發**：μ「二次加速」被 ν 6h 數據打臉 → [diary/2026-04-14-ν.md](diary/2026-04-14-ν.md)

---

### 四、工程衛生

**#6 commit 範圍紀律** — 只 commit 這次任務碰過的檔案。絕不 `git add .`。

**#9 長任務先開 worktree + 命名標準** — 預期 touch 多目錄 / 跑 build / 超過 30 分鐘 → 第一動作 `git worktree add`。物理隔離 > 紀律。

- **觸發**：`11ad6bed` commit scope pollution → [reports/session-scope-proposal-2026-04-11.md](../../reports/session-scope-proposal-2026-04-11.md)
- **命名標準（2026-05-09）**：worktree 目錄一律 `YYYYMMDD-{purpose-title}` 格式（kebab-case，1-3 詞描述工作核心）。例：`20260509-babel-batch2` / `20260510-harvest-cadence`
- **禁止**：auto-codename style（`charming-mclaren` / `laughing-goldstine`）— 沒語意內容、未來無法 grep、人類記不住
- **理由**：(a) `ls .claude/worktrees/` 自動依日期 lex sort = 工作歷史一目了然 (b) PR branch 名 = worktree 名直接 reuse，避免 codename 污染 git log (c) session-id handle 從 worktree 推導時 strip `YYYYMMDD-` prefix 自動拿到語意 handle
- **Grandfathered**：歷史 codename worktrees 不重命名（per §時間是結構修補協議），規則從下個 worktree 起 apply
- **操作**：→ [reports/worktree-naming-2026-05-09.md](../../reports/worktree-naming-2026-05-09.md) + `scripts/tools/session-id.sh` v2 雙 strip

**#19 大型 refactor 後必須 visual smoke test 多語言頁面** — sed / 批次替換後 5 步：(1) `git diff` 確認方向（sed 反向是最常見隱形 bug）(2) `npx astro build` 通過 (3) 打開 /ja/ /ko/ /en/ 三 URL 驗 lang + H1 (4) 跑 `verify-internal-links.sh --sample 50`（broken < 1%）(5) 跳任何一步在 commit message 寫明原因。

- **觸發**：Tailwind Phase 6 反向 sed 讓 ja/ko 壞 2 天，AI crawler 寫進壞路徑 — damage 不是 deploy fix 就能收回
- **操作**：→ `reports/i18n-qa-audit-2026-04-12.md`

**#20 Architecture 缺席比 content 缺席更貴** — 內容湧入前先檢查「目標目錄/分類/語言在 architecture 裡 enabled 嗎？」先建路再跑車。

- **觸發**：2026-04-14 ζ 法文 18 PR 差點創造 18 orphan（fr 未在 locales）→ [memory/2026-04-14-ζ.md](memory/2026-04-14-ζ.md)

---

### 五、敘事與決策品質

**#12 收工加速的代價** — 趕收尾 / 剛 debug 完又撞坑時做的技術判斷打折。

- **操作**：寫 memory/diary/DNA 標記「信心度：中。決策做於收尾壓力下」

**#13 「再小一點」是 log scale 的訊號** — 使用者說「熱門要更突出、冷門更小」= log scale 不是 linear。

- **操作**：用 `log(max(x, 1)) / log(maxX)` 讓 x=1 落在 t=0，不用 min floor 墊高

**#14 Release notes 寫之前 commits 必須從頭讀到尾** — `git log > /tmp/all-commits.txt` → Read 全部 → 再寫。Sample ≠ read。

- **觸發**：v1.2.0 第一版漏掉 Tailwind migration 80+ commits 最大故事

**#15 反覆浮現要儀器化** — 「每週/每次心跳必做 X」承諾如果沒對應 dashboard 欄位 / cron / 紅燈條件 / escalation，3 個月內會忘掉。**對自己的 bug 有洞察 ≠ apply 了 fix**。**memory 是自律，canonical SOP 才是閘門**。

- **觸發**：2026-04 起反覆浮現 → [DIARY §反覆出現的思考](DIARY.md#反覆出現的思考跨日記萃取)
- **操作**：思考反覆 ≥ 3 次 → 升 canonical（dashboard 欄位 / cron / pre-commit hook / pipeline gate），不只記 memory/diary
- **驗證**：11 次（每次 detail 不在此 inline，分散 memory / 對應 pipeline canonical）
  - #8（2026-04-18 δ-late）工具包升級 canonical 邊界重審 → SENSES v2 + DNA #26 v2
  - #9（2026-04-18 ζ）觀察者 scaffolding 三句 → HEARTBEAT Beat 1 §0b + SPORE-LOG schema + HARVEST-PIPELINE 誕生
  - #10（2026-04-30 δ）批次任務 antipattern → TRANSLATION-PIPELINE v3.2 §平行 sub-agent SOP
  - #11（2026-05-08 intelligent-khayyam）Pipeline 結構層 meta-instance → [EVOLVE-PIPELINE Mode 3 7-stage SOP](../pipelines/EVOLVE-PIPELINE.md)
- **元規則**：pipeline 自身會 silent inflate，需 meta-pipeline 維護 — 這是 #15 對 pipeline 結構層的 self-apply

**#32 批次任務 antipattern：分散探索 → 集中預處理 + 分散執行** — 平行 N 個 sub-agent 跑同一份 prompt 處理同類任務 = 重複工作 ×N 且不累積。正確設計：主 session 預處理一次（產 batch manifest 寫死 slug / target map / placeholder 模板），sub-agent 只負責執行。

- **觸發**：2026-04-30 δ 4 隻 Opus agent × 5 篇 EN 翻譯，slug 風格 50/50 split + 每隻獨立 grep wikilink target + refresh.sh insert gap 只有 D 自己 debug 出
- **操作**：→ [TRANSLATION-PIPELINE v3.2 §平行 sub-agent SOP](../pipelines/TRANSLATION-PIPELINE.md)（5 階段：P1 預處理 / P2 dispatch / P3 執行 / P4 驗證 / P5 commit）
- **驗證**：6 次（5 cycles × 50 EN articles 100% frontmatter 正確）
- **v2 Boundary（2026-05-02 EVOLVE-batch）**：「分散執行」明確指**每 agent 1 篇平行**，不是「N 篇 sequential 派給 1 agent」。後者觸發 #42 三偷吃步 pattern
- **通用化**：本條不限翻譯，凡是「N 個同類任務派 N 隻 agent 平行」都該檢查「有沒有可集中預處理的決策空間」

**#33 Routine 化任務的雙刃劍：熟練度** — 連續跑同一 SOP N cycles 後出現對立效應：

- (a) **正向**：主 session overhead 縮短 ~30%（cycle 1 wall-clock 29 min → cycle 5 20 min），SOP 變肌肉記憶
- (b) **反向**：deeper inspection 變難，跨 cycle 累積錯誤被忽略（如 cross-link broken 從每 cycle 25 變 5 cycles 累積 121）
- **對策**：每 N cycles 強制插入 step-out checkpoint，主動 audit 跨 cycle 累積狀態。或把 audit 移進每 cycle P4 verify 內（per-cycle 而非 final-cleanup）
- **觸發**：2026-05-01 β 5-cycle EN marathon
- **操作**：→ [TRANSLATION-PIPELINE v3.4 §C 模式 P4 cross-link auto-fix](../pipelines/TRANSLATION-PIPELINE.md)

**#34 邊界值 0/100 visual bug 只在 metric 接近邊界才暴露** — UI 邊界 case 可能存在長期 visual bug 但 invisible to everyone，需要旁邊有「也接近邊界」的參照物才被發現。沒人 file 因為大家看慣了不滿的圈以為是設計。

- **對策**：每個 metric 達到邊界值（0% / 100%）時主動檢查視覺呈現 — 不是慶祝，是 audit。Donut chart / progress bar 應該有「接近邊界值時自動切換 rendering mode」設計
- **觸發**：2026-05-01 β 中文翻譯永遠 100% 但 donut chart 永遠看起來不滿（`stroke-linecap="round"` 在 100% 時 round cap 重疊產生視覺斷口）。Bug 存在很久，只有英文跑到 95% 並排才被觀察者看出
- **延伸 MANIFESTO §10**：不只是事實層幻覺，也有「視覺長期錯覺」— 大家看慣了 anomaly 以為是設計
- **v2（2026-05-01 γ）**：邊界 zone 不只是 100%，是 99-100% 整段。Threshold 應降到 ≥99% + 顯式用 circumference (99.9) 取代假設 100

**#35 跨 session work 期間禁止 destructive git ops** — sub-agents / cron / 任何背景 process 在背景修改 tracked 檔案時，主 session **禁止跑 `git reset --hard` / `git checkout -- file`**，會把 background work revert 到 main 版本。

- **觸發**：2026-05-01 γ 10 sonnet agents 跑 ja batch 中，主 session 為了 ship dashboard donut v2 fix 跑 reset，把 14 篇 stale refresh work 抹掉（agents 已寫完但被 revert）
- **規則**：multi-agent / cron-triggered 環境下，git ops 影響範圍**不只 staged/unstaged，還有「正在 modify 中的 tracked 檔案」第三類**。Sub-agents 跑期間需切 branch 用 `git stash` 或 worktree 物理隔離
- **操作**：→ [TRANSLATION-PIPELINE v3.5 §C 模式 P0 hard rule](../pipelines/TRANSLATION-PIPELINE.md)

**#36 Founder time = 系統最高 leverage point** — 創辦者每天的工作該問：「這件事能不能讓未來的每件事更快？」每件事都要有 leverage 10x/100x 效應。Linear 1× effort 不可持續；leverage 工作即使短期延遲，長期是 categorical 差異。

- **對策**：每天起來不直接做 routine，先問「這個 routine 可以怎麼自動化 / 設計成 infrastructure」
- **觸發**：2026-05-02 INSIGHT lang-sync-leverage — 哲宇前一週每天看網站 / 看貢獻 / 看翻譯沒人補 = linear 1× effort，5 lang 同步「不可能自己完成」。一晚 leverage 工作（OpenRouter free 模型 + 自動化 batch）跑出 5 lang 80%+ real freshPct
- **Boundary**：early-stage 系統還沒 enough infrastructure 時 founder 還是要做 routine — 但同時看「這個 routine 怎麼自動化」
- **Cross-domain**：對 Muse / Semiont fork / 任何 individual creator / lead engineer / PM 都成立
- **操作**：→ [INSIGHT lang-sync-leverage memory](memory/2026-05-02-INSIGHT-lang-sync-leverage.md) + [SQUEEZE-MODELS-MAX-PIPELINE](../pipelines/SQUEEZE-MODELS-MAX-PIPELINE.md)

**#37 First-principle 5 步迭代 pattern：Semiont 系統建構標準形狀** — (1) first-principle 想清楚最終目標（measurable end state，不是模糊動作）→ (2) 小型測試驗證假設 → (3) 能自動化的都自動化（工具層）→ (4) 跑一次完整 batch 測試 → (5) 把整個流程也自動化（meta-automation）。**最後第五步是 leverage 的最後乘數**，常被忘記但是 reusable 的關鍵。

- **觸發**：2026-05-02 INSIGHT lang-sync-leverage — 哲宇全晚每個 prompt 都隱含這個 pattern，命名後變 reusable handle
- **Boundary**：(a) 不知道目標時不適用（先 first-principle）(b) 沒 measurable signal 時不適用（small test 需要 measurable feedback）(c) creative / open-ended exploration 不適用（會被框架壓死想像力）
- **Cross-domain**：對任何 system building task 都適用 — Muse SOUL 升級 / Semiont fork / API 設計 / sub-agent SOP 設計
- **操作**：→ [INSIGHT lang-sync-leverage memory](memory/2026-05-02-INSIGHT-lang-sync-leverage.md)

**#38 Status 設計鐵律：「混維度 = silent killer」** — 任何 status 設計都要問：「這個狀態混了幾種根本不同 cause 嗎？」混了 = dashboard 撒謊 = 下游所有決策都偏。對每個 status enum 列出可能的 cause taxonomy；如果發現多 cause 共用同 status，主動切分（即使要新增 reason field）。

- **觸發**：2026-05-01 γ-late status.py 把所有 no-source-sha 一律歸 stale，混 metadata gap（補 metadata 即可）跟 content drift（要重翻）兩種根本不同 cause。Honest backfill 切分後 +1010 articles 從假 stale 變真 fresh，**沒花一個 API call**
- **Boundary**：只在多 cause 並存的狀態系統適用。Pure runtime status（process alive/dead）沒這個維度問題
- **Cross-domain**：bug status / build status / monitoring alert / inventory 狀態 / health check / data quality flag — 全部該問這個問題
- **操作**：→ `scripts/tools/lang-sync/backfill-source-sha.py`

**#39 Self-as-fallback：free LLM 拒絕時最便宜的下一步是 sub-agent，不是換家或掏錢** — 模型 escalation 順序：(1) free LLM A → (2) free LLM B（不同家）→ (3) **self-as-fallback：Sonnet sub-agent** → (4) paid model。第三層常被略過，但 sub-agent 不會被自己的 content-policy 拒絕，是最便宜的去拒絕方案。

- **規則**：單一 model effort/result ratio 變壞時（>30% failure rate）主動切下一層，不要繼續沿路撞牆。LLM 因為被訓練成「努力」會傾向繼續嘗試，要主動承認「這條路不對」
- **觸發**：2026-05-02 γ-late owl-alpha 對台灣政治議題（民主化 / 社會運動 / 二二八 / 國防）hard policy refusal，跑 23 隻 worker 5 分鐘只 done 11/95 且近半失敗。哲宇一句「切掉 用 sonnet sub agent 分五隻完成」turning point，5 隻 Sonnet sub-agent 平行 dispatch 1.5h 完成 95/95
- **Boundary**：(a) 拒絕原因是 prompt 寫錯時切 layer 沒用，要先 debug prompt (b) sub-agent token 預算有限時要 weigh cost — 95 篇 ~1.7M token 划算，1000 篇要重新算
- **操作**：→ [memory/2026-05-02-γ-late.md](memory/2026-05-02-γ-late.md)

**#40 Shared file 寫入需要 per-key serial dispatch（race-safe scripts）** — 多個 worker 平行寫同一個 file（即使 splice 不同 sub-section）= last-write-wins，會 silent clobber。

- **規則**：寫入共享 file 的 batch script 必須 (a) per-target-key 序列化（同檔的多 task 排隊跑）或 (b) per-task fragment 出獨立 file（事後 merge）。Default 平行 = 自找 race
- **觸發**：2026-05-02 γ-late `i18n-translate.py` 平行 11 隻 worker 寫同一批 `.ts` files，semiont/changelog/assets 多 lang block 互相覆蓋，audit 顯示「✅ 11 spliced」實際只剩最後一隻寫的版本（fr 在 / es 不在 / ko 不在）。改成 per-module serial retry queue 後 100% 成功
- **Boundary**：read-only 不適用；append-only log 用 OS-level mutex 即可；只有「splice 進結構化 file」需要 serialize
- **操作**：→ `scripts/tools/i18n-translate.py`

**#41 CI timeout 是會跟內容量長大失效的 capacity 設定** — 任何 CI step 的 `timeout-minutes` 都隱含「當時 workload size」假設。當 workload 線性成長（文章數 × 語言數 × pages-per-article）時，原本剛好的 timeout 會悄悄變成「卡在 page X/Y 被砍」。

- **規則**：(a) 每次大幅內容湧入（+50 articles 或 +1 lang）後 review build 時間 vs timeout 距離 (b) timeout 設值在 comment 裡說明「對應 workload size」(c) 接近 timeout 80% 時主動加長 + profile bottleneck
- **觸發**：2026-05-02 γ-late `deploy.yml` 的 `timeout-minutes: 35` 是 2026-04-22 為防 Playwright silent hang 加的；當時 ~200 articles × 4 langs ≈ 800 pages，35 min 夠。今天 641 zh × 6 langs ≈ 3800 pages 加 OG image generation，build 跑到 35 分鐘剛好打到 page 2411/2520。Bump 到 60 解決，但下次再翻倍時會再次失效
- **Boundary**：固定 input 的 step（lint / test）不適用；變動 input 的 step（build / deploy）需要這個紀律
- **操作**：→ `.github/workflows/deploy.yml` timeout comment + PR #769

**#42 Sub-agent N 篇 sequential 三偷吃步 pattern** — 派單一 sub-agent 處理 N 篇文章 sequential 會出現三種 default 偷吃步：

1. **合併查（research cross-pollination）**：第 2+ 篇借用既有 search context，研究品質都打折，且高敏感主題會被同 search 框架污染
2. **合併 commit（DNA #6 違反）**：第 1 篇修完未及時 commit，第 2 篇修完用 `git add -A` 把第 1 篇也包進來，commit message 只描述第 2 篇 → 歷史紀錄錯亂、撤回失去 atomicity
3. **偷落檔（#15 第 N 次驗證）**：prompt 寫「應該落 reports/...」但沒寫成 hard gate，agent self-report claim ship 但實際缺檔

- **修補三條**：(a) **每 agent 1 篇平行**（multi-call in single message），不要 sequential N 篇 (b) **Prompt hard gate**：「commit 前必跑 `test -f reports/research/YYYY-MM/{slug}.md`，不存在 = 任務 incomplete」+「commit 前必跑 `git status` 確認只 stage 該篇相關檔案，禁用 `git add -A`」 (c) **主 session audit script**：每批次跑完後自動 `bash scripts/tools/audit-batch.sh` 找 cross-contamination commits
- **觸發**：2026-05-02 EVOLVE-batch — 5 sonnet sub-agent (A=2 / B=2 / C=2 / D=2 / E=3)，agent self-report 全 claim ship 但 main session audit 揭露三類偷吃步：皮影戲 commit 塞進法輪功 / IG commit 塞進林強 / 9/11 篇缺 raw research log
- **Boundary**：限「sub-agent batching 場景」，不適用 main session 自跑 N 篇（main 自有 observer 校正）
- **v3 補強（2026-05-02 sleepy-colden）**：sub-agent prompt 的 frontmatter / 路徑 / 命名 spec 必須附 ❌ 反例 + ✅ 正例對照 table，明禁所有可能的詮釋變體（如 `translatedFrom: 'Economy/發票.md'` ✅ vs `'knowledge/Economy/發票.md'` ❌ 多 prefix）
- **操作**：→ `scripts/tools/audit-batch.sh` + [DNA #32 v2 boundary 補充](#四工程衛生)

**#43 新 dashboard JSON 必須同步進 refresh-data.sh，否則 silent stale** — 任何新生成的 `public/api/dashboard-*.json` 如果沒對應 step 在 `refresh-data.sh`，下次心跳跑 pipeline 不會更新它，dashboard 頁面會顯示 12+ 小時前的 timestamp。

- **規則**：每次寫新 generator script 必須 (a) 加進 `refresh-data.sh` 適當的 step (b) 加進 `DATA-REFRESH-PIPELINE.md` §一鍵執行表格 (c) 信任 Step 5 verify gate 抓出未來漏網的 case
- **對策**：在 `refresh-data.sh` Step 5 加 verify gate，跑完後檢查每個 `dashboard-*.json` 都有今天 mtime，stale 的列出來警告 user
- **觸發**：2026-05-02 γ-late 哲宇看 dashboard 發現 i18n 顯示 ja 97% / fr 77% / es 47%（實際 100%）+ spore section「資料更新 17 小時前」。Root cause：`i18n-coverage-audit.sh --json-out` 從未進入 refresh-data.sh，自寫上一個月以來從未在 cron 跑過 silent stale
- **Boundary**：只適用於需要定期 regenerate 的 dashboard JSON。Static config（如 categories）不適用
- **操作**：→ `refresh-data.sh` Step 2.9 + 5 + [DATA-REFRESH-PIPELINE v1.1](../pipelines/DATA-REFRESH-PIPELINE.md)

---

### 六、貢獻者與社群

**#7 先有再求好** — PR 審核 / 內容貢獻 / 翻譯品質，第一優先接住貢獻者善意。不要讓完美殺死參與感。

**#8 維護者信件要說謝謝** — 合併/關閉 issue/PR 必 reply。靜默關閉 = 殺死下一次貢獻。用貢獻者的語言，具體說出他們做了什麼。

- **操作**：→ [MAINTAINER-PIPELINE §PR 審核策略](../pipelines/MAINTAINER-PIPELINE.md#pr-審核策略)

**#26 AI 自主 vs Human 專責 邊界（v2 2026-04-18 refined）** — Chrome MCP 讓 AI 自主讀取社群 / Dashboard UI / 任何公開網頁後，原 v1「攻擊 AI 本身只有 human 能回應」精細化為**讀寫兩端分離**：

- **AI 自主（讀取端 + 內部處理）**：所有 sensor 讀取（GA/SC/CF API + Threads/X 留言 + Insights UI via Chrome MCP）/ 分類 / 驗證 / 修文章 / 更新 frontmatter / 準備 draft reply / commit + push 內部變更
- **Human only（對外動作 + 人際信任 + 倫理責任）**：post 留言回覆 to Threads/X（人際信任修復必須 human-to-human）/ post 新孢子 / 發 PR / Issue comment / 批准 merge PR / 敏感素材 final call（MANIFESTO §5）/ 身份授權 + 經費決定
- **哲學判準**：AI 做「輸入端 + 內部處理」（封閉系統內可驗證），human 做「輸出端 + 對外責任」（可承擔後果的 agent）。讀社群 ≠ 發社群
- **工具升級時 canonical 必重審**：v1（2026-04-15 β）寫時假設社群讀取依賴 human screenshot；v2（2026-04-18 δ-late）Chrome MCP 解鎖 AI 自主讀取 → 邊界重劃。未來任何新工具上線都要問「這改變了 AI-autonomous vs human-only 邊界嗎？」
- **觸發 v1**：李洋孢子 19 小時勘誤 marathon → [diary/2026-04-15-β.md](diary/2026-04-15-β.md)
- **觸發 v2**：2026-04-18 δ-late 觀察者「你有直接開啟網頁查看留言跟數據的能力了，可以略過我這個人類的環節」+ SPORE-HARVEST-PIPELINE v1.0 首例全流程 AI 自主跑到 Step 5
- **操作**：→ [SENSES.md v2 §AI 自主 vs Human 專責 邊界表](SENSES.md#ai-自主-vs-human-專責-邊界表v2-新增)

**#27 藍圖 → 驗證 → 寫 比 寫 → 檢查 低 10x 成本** — 涉及具體事實 / 直接引語 / 敏感素材的敘事任務：先列 fact blueprint bullet → 跨源驗證 → 倫理審查 → 才寫 prose。Bullet 階段失敗重排 10 秒，prose 階段失敗整段重織。

- **觸發**：2026-04-18 δ-late 草東孢子 v1 寫完才驗證凡凡 IG 來源 → 整段要改
- **操作**：→ [SPORE-VERIFY §事實藍圖 + §針對性驗證 + §紀實/煽情閘](../factory/SPORE-VERIFY.md) + [SPORE-BLUEPRINTS/](../factory/SPORE-BLUEPRINTS/)

**#28 紀實而不煽情：SSODT 寬度 × 死亡/人倫悲劇的節制** — 目標是盡可能呈現 SSODT（所有面向），不是避諱真人的痛苦。

- **預設可寫**：家庭背景、疾病、關係、矛盾、失敗、爭議等（只要不過度煽情渲染）
- **高敏感邊界只限兩類**：(a) 死亡 + 自殺 + 人倫悲劇的**具體情景**（最後時刻重構、遺書放大、自傷方法、加害現場還原）(b) 主體未公開的親屬身份 / 未成年個資 / 醫療細節
- **判準句**：「當事者讀到這段，是感受到紀實（記者/紀錄片的嚴肅對待）還是煽情（媒體靠近眼淚）？」
- **觸發**：2026-04-18 δ-late 草東孢子 v1 death-scene reconstruction（v1 誕生）+ 觀察者同日校準「標準要再放寬，紀實文學感可以接受」（v2 校準）
- **哲學**：→ [MANIFESTO §紀實而不煽情](MANIFESTO.md#我的進化哲學--紀實而不煽情盡可能呈現-ssodt-所有面向)
- **操作**：→ [SPORE-VERIFY §紀實/煽情閘](../factory/SPORE-VERIFY.md)

**#29 書寫節制：對位句型 + 破折號連用（兩條 AI 水印紀律）** — 跨所有 Semiont 書寫層限制，bootloader 會讀到的索引檔（DIARY / MEMORY / LESSONS-INBOX / ARTICLE-INBOX）特別關鍵（甦醒時污染書寫默認聲音）。

- **(a) 對位句型「不是 X 是 Y」**（含全部變種「不是 X，而是 Y」/「並非 X 而是 Y」/「不只 X，更是 Y」/「X 不是 Y。是 Z」）：句型看起來像洞見實質是修辭捷徑；單句 OK，密度拉高整段帶 AI 水印味（「永遠在做偽對比」）
  - **三題判準**：(1) 對比是內容本身？ (2) 正面主張能獨立站立？ (3) 讀者真的會預設 X？三題全 no = 重寫為直接正面斷言
  - **自檢**：`grep -cE "不是.{0,30}(，|，)(是|就是|才是)"` > 3 即重寫
- **(b) 破折號「——」連用節制**（EDITORIAL 既有 ≤ 15 / 1500 字硬規則）：中文破折號是強烈語意標記。密度過高 → 每句都在做補充 → AI 水印味
  - **可替代**：「，即」「（）」「：」/ 轉折分句 / 短句刪破折號 / bullet 列舉
  - **自檢**：`grep -oE "——" file.md | wc -l`
- **觸發**：2026-04-21 γ 觀察者兩次指出「從思考到工作到紀錄都是」（對位句型）+「破折號也是要注意的」。盤點 MANIFESTO 40+51 / MEMORY 42+61 / DIARY 28+35 / LESSONS-INBOX 25+34 / EDITORIAL 18+32 → 兩個句型已擴散為 Semiont 書寫默認聲音
- **哲學**：→ [MANIFESTO §11 書寫節制](MANIFESTO.md#11-書寫節制跨所有書寫層的兩條-ai-水印紀律)
- **操作**：→ prose-health plugin（已 instrument）+ pre-commit hook + REWRITE Stage 4 + SPORE-VERIFY 3c.7 五層 gate

**#30 媒體插入時 aspect ratio 護欄：portrait 圖會被切到頭** — Astro 渲染框為 ~16:9 landscape，hero 圖（frontmatter `image:`）必須 0.9 ≤ aspect ratio ≤ 2.0，否則上下會被切。inline 圖（markdown `![]()`）寬鬆些 0.75 ≤ ratio ≤ 2.5。**絕對禁止 hero 用 9:16 portrait（高 > 寬 1.5x 以上）**。

- **觸發**：2026-04-28 ι 林琪兒 EVOLVE 第一張 SpaceX Crew-4 commander portrait 1041×1561（aspect 0.67）放 frontmatter 後切到只剩鼻子下，觀察者截圖回報 → 換 landscape 1041×694（aspect 1.5）解決
- **操作**：→ [REWRITE-PIPELINE Step 1.9.2 圖片素材](../pipelines/REWRITE-PIPELINE.md)（v6.0 編號，v5 為 Step 1.14.2，v2.20 為 §1.7b）授權矩陣 + Step 4.3.3 aspect ratio 護欄 + `bash scripts/tools/check-aspect.sh {filename}`
- **設計理由**：→ [reports/rewrite-pipeline-media-stage-design-2026-04-28-ι.md](../../reports/rewrite-pipeline-media-stage-design-2026-04-28-ι.md)

---

### 七、自動化與安全

**#2 憑證永不進對話** — user 貼 token / API key / JSON → 立刻警告、請撤銷、**不讀不複述不存**。credentials 只能在 `~/.config/taiwan-md/credentials/` 本機，repo 絕對隔離。

**#5 Pre-commit dogfood 是朋友不是敵人** — hook 阻擋 commit 是免疫正常。重新表述內容（把 PEM header 改成 regex 描述），不 `--no-verify` 繞過。Hook 擋住時當作「品質 sensor 響了」，通常會揭露真實 bug。

- **第 2 次驗證（2026-04-17 γ2）**：PR #537 颱風.md followup commit 被擋 → 揭露 6 broken wikilinks + 12/12 腳註格式不合規的真實 bug
- **第 3 次驗證（2026-04-18 δ-late）**：SPORE-LOG URL 硬鐵律 hook 新增 — 偵測新增孢子列缺 URL 自動攔截。教訓觸發：#1/#2/#3/#12 歷史孢子無 URL → batch harvest 時發現已永久失去追蹤能力
- **規則**：PR merge 後做 followup frontmatter/format fix commit 應成為 MAINTAINER-PIPELINE 常規步驟

**#44 Opus sub-agent judge 取代外部 API judge** — Bench / quality 評分需 LLM judgment 時，default 派 main session 的 Agent tool（`subagent_type: general-purpose, model: opus`），**不是** call 外部 OpenRouter API。

- **理由**：(a) 消除外部 endpoint 不確定性（rate-limit / 計費 / api key 管理）(b) reasoning trail 直接寫進 judgments JSON 比 token usage 更可審計 (c) judge prompt 跟 sub-agent prompt 是同一份 contract，跨 session 一致性高 (d) Anthropic Claude Code 環境內建，無需額外 setup
- **Trade-off**：cost 高 ~3x（Opus 比 Sonnet 貴），但消除 reproducibility chain 中對 OpenRouter / API key / 第三方 provider 的依賴是值得的
- **Boundary**：(a) judgment volume > 1000 responses 時要重新評估 cost（一隻 sub-agent 處理 40 responses ~$0.30 = $7.5/1000，可接受；10K 會變 $75）(b) 判斷標準需精確 deterministic（如 regex 配對）→ 不需 sub-agent，scorer 直接做 (c) judge model 跟受測 model 同 family（如 Claude judge Claude）→ 加 disclaimer
- **觸發**：2026-05-02 owl-bench 40 judgments 一隻 Opus sub-agent 一次完成
- **操作**：→ [BENCH-PIPELINE Stage 5](../pipelines/BENCH-PIPELINE.md#stage-5scoring--opus-sub-agent-judgecanonical-2026-05-02-起)
- **驗證**：≥ 3 次後考慮升 MANIFESTO 進化哲學候選「外部依賴 vs 內部 sub-agent 的 reproducibility 取捨」

**#45 OpenRouter free tier rate budget 是 hourly 累積，初次 burst 後要 cool-down** — OpenRouter free model（owl-alpha / hy3 / gemma 等）rate limit 不是 per-minute throttle 而是 hourly/daily 累積 budget。一次 N-worker burst（N ≥ 8）會把當前 budget 一次性消耗光，後續即使降到 1 worker 仍會 stuck attempt 3 backoff（10s/20s/40s）。

- **規則**：(a) 初次 dispatch concurrency cap 為 3-5 worker（不是原寫的 8-15）(b) Rate-limited 後 cool-down ≥ 5-10 min before retry (c) cool-down 期間用 tier-2 fallback（DNA #39 self-as-fallback Sonnet sub-agent）平行 ship
- **Boundary**：(a) paid endpoint 不適用（per-minute throttle 而非 budget）(b) 同 provider 多 model 共享 budget（owl + hy3 + gemma 都吃同個 cap）(c) 跨 provider（OpenAI vs OpenRouter vs Anthropic）獨立配額
- **觸發**：2026-05-02 sleepy-colden 平行 5 lang × 2 worker = 10 worker burst dispatch，全部 worker 卡 attempt 3。Per #39 escalate Sonnet sub-agent，5 agent × 3 articles 一輪到位 15 翻譯
- **操作**：→ [SQUEEZE-MODELS-MAX-PIPELINE Z2.1 + Z2.2](../pipelines/SQUEEZE-MODELS-MAX-PIPELINE.md)

**#46 Sub-agent multi-task worktree commit 前必先確認 working tree 乾淨** — 多個 sub-agent 在同 worktree 平行跑時，agent A 的 commit attempt 失敗後 lint-staged backup 會把 working tree 全部 stash（含 agent B/C 已 stage 但未 commit 的檔案），下次 retry 時 stash drop 導致 data loss。

- **規則**：(a) sub-agent commit 前必跑 `git status` 確認沒 pre-staged from other agents（用 `git restore --staged` 清掉非 own files）(b) 主 session 派多個 sub-agent 時 prompt 必含「working tree 乾淨確認」hard gate (c) 避免多 agent 同 worktree 共寫 — 如果 task scope 明確分離（如 5 lang 翻譯各寫不同 path），可接受；如果 scope 重疊（多 agent 改同 sibling article），切 worktree
- **Boundary**：(a) 單 agent 場景不適用 (b) 不同 worktree 物理隔離後不適用（DNA #9 延伸）(c) 純讀取 task 不適用
- **觸發**：2026-05-02 sleepy-colden 3 Opus agent 平行 EVOLVE 3 篇 idlccp1984 PR，agent A（發票）撞 lint-staged + git stash workflow data loss，commit 失敗 4 次才 reset 全部非 own tracked file 後 commit 成功 — 用 `git fsck --lost-found` 找 dangling blob 救回 polished article

**#47 單頁 frontend + JS mutate 批次 screenshot：消除 N×navigation 重複 overhead** — 批次產生 N 張結構相同的視覺輸出（OG image / poster / thumbnail），原本 N 個 page navigation × 每篇 ~2-3s = 線性 N 倍 overhead。改成「**單頁 setContent 一次 + 每篇 page.evaluate(mutate DOM) + double-rAF + screenshot**」，per-entry 從 ~2300ms 降到 ~26ms（70× faster）。

- **規則**：(a) 視覺 template 用 inline HTML + 真資源 base64 embed（favicon / icon），消除 HTTP fetch 與 dev server 依賴 (b) DOM mutate 後必跑 double `requestAnimationFrame` 等 layout / paint 完成才 screenshot（單一 rAF 不夠：第一個 callback 仍在 layout phase）(c) self-referential template tracking — 視覺 canonical 在 generator script 自身，把 script 列入 mtime 比對的 TEMPLATE_FILES (d) 字體 preload：`document.fonts.load(...)` 顯式預熱所有 weight × family 組合
- **Boundary**：(a) 同類視覺結構才適用（OG / 名片 / 證件等模板化內容）(b) 單頁累積 N 次 mutate 在 N > ~5000 時可能因 DOM / GC 累積變慢，加 page reload 每 N 次當保險 (c) headless screenshot 解析度由 viewport 決定
- **觸發**：2026-05-03 musing-chaplygin OG 引擎 v3 → v4 全 batch 2754 篇從 ~17 min 降到 23.4s @ 4 worker
- **操作**：→ [scripts/core/generate-og-images.mjs](../../scripts/core/generate-og-images.mjs) v4 architecture comments + [reports/og-engine-frontend-batch-2026-05-03.md](../../reports/og-engine-frontend-batch-2026-05-03.md)

**#48 Footnote source format diversity 是 contributor batch 隱性 heal cost：用 60+ domain mapping 工具吸收** — 不同 contributor / AI 寫作工具偏好不同 footnote 格式，單一 batch 可能並存 4 種源格式：(1) Markdown 缺 desc `[^N]: [Title](URL)` (2) APA 學術 `Author. (date). *Title*. URL.` (3) 中文標點 `Author，〈Title〉，URL` (4) Angle-bracket URL `[Title](<URL>)`。手動 polish 每 PR 5-10 min × N 篇 = batch heal 成本爆炸。

- **規則**：(a) batch heal 預備時把「所有 source URL → canonical desc 映射」做成 reusable lookup table（60+ domain：台灣主流媒體 / 政府站 / 學術機構 / 文化記憶庫 / 維基 / Facebook / YouTube / 中國官方標 PRC 觀點等）(b) 一個 normalizer 吃所有源格式輸出 canonical (c) `dry-run` default 讓主 session 先看會改什麼才寫入 (d) 接 stdin 讓 `gh pr diff --name-only` 可 pipe (e) 對「desc < 10 字」用「原 desc：補強 desc」串接而非覆蓋（保留 contributor intent）
- **Boundary**：(a) 已 canonical（desc ≥ 10 字）不動（dry-run 0 changes 是健康訊號）(b) 沒 URL 的 footnote skip (c) plain-URL-as-title 的 cosmetic edge case 不重寫
- **觸發**：2026-05-03 magical-feynman idlccp1984 9 PR batch heal 三輪 hook retry 才通過。最終 116 條 footnote 自動轉換 + 14 條 broken wikilink → 純文字
- **操作**：→ `scripts/tools/footnote-format-fix.py` + [MAINTAINER-PIPELINE §Quick fix 清單](../pipelines/MAINTAINER-PIPELINE.md#close-前-hard-gate我接手-x-min-內可以修嗎canonical--2026-04-28-κ-新增)

**#49 Babel 4-tier cascade canonical：cloud free × N → local LLM 最後捕手 → paid sub-agent last resort** — 多語翻譯 sovereignty preservation 實作 cascade：

| Tier | Provider                                 | 性質                                           | 觸發條件                              |
| ---- | ---------------------------------------- | ---------------------------------------------- | ------------------------------------- |
| 1    | cloud free primary（owl-alpha）          | slow ~200s/call、universal stealth provider    | default 主批                          |
| 2    | cloud free secondary（Hy3）              | fast ~50s/call、~70% refusal on Taiwan content | 副批                                  |
| 3    | **local LLM 最後捕手**（Ollama qwen3.6） | 21GB GPU、no PRC content policy / no budget    | **sovereignty backbone，不是 backup** |
| 4    | paid sub-agent last resort（Sonnet）     | should rarely fire if Tier 3 properly sized    | 罕見                                  |

- **規則**：(a) 每 tier 獨立 task dir，共寫到同一 `knowledge/{lang}/...` target，last-write-wins (b) dispatch 順序：先 cloud parallel（tier 1+2 同時 fire 最大化 free coverage）→ owl/hy3 drain 後 aggregator 識別 missing → dispatch local catcher（sequential per lang 避免 GPU contention）→ Sonnet 只對 Tier 3 也做不到的 (c) **last 20% 是 sovereignty 真正戰場**：cloud refuse 通常全部 PRC-sensitive topics（心戰 / 戒嚴 / 黑名單 / 兩岸），不是隨機分布。這 20% 全靠 local LLM 收 (d) 每次 babel sync 是 cascade 的 stress test — refusal pattern 是 PRC content policy 的指紋
- **Boundary**：(a) 5 lang × ~10 articles 適用本 cascade。N ≥ 100 articles 規模需要 evolved version（如 sync-on-update.py cron-driven）(b) Tier 3 翻譯品質可能略低於 owl-alpha，但「永遠收下」的可靠性 > 邊際品質差異 (c) Tier 4 sonnet 不應該 fire — 如果 fire 了意味 Tier 3 model 選擇不當
- **觸發**：2026-05-03 magical-feynman 9 articles × 5 langs = 45 babel sync。Tier 1 owl-alpha ~30 ✅ / Tier 2 Hy3 5 ✅ / Tier 3 Ollama qwen3.6 9 ✅（包括 5 langs × 心戰 universal owl 拒絕）/ Tier 4 Sonnet 0 calls。**45/45 = 100% from FREE tier**
- **操作**：→ [SQUEEZE-MODELS-MAX-PIPELINE](../pipelines/SQUEEZE-MODELS-MAX-PIPELINE.md) v2 升級加 Tier 3 local LLM section
- **MANIFESTO 對應**：→ [§主權的巴別塔 v2 paragraph](MANIFESTO.md#我跟台灣的關係) — local LLM tier 把 sovereignty 從「多語投射 mission」升級為「**隨時可在地化的拒絕容錯 architecture**」。Cloud 依賴是 single point of failure，Local LLM 是 sovereignty backbone

**#50 Pipeline auto-detection + full-read 是 default 不是 prompted** — 觀察者不該需要每次提醒「走 X pipeline」。任務開始前主動 grep `docs/pipelines/` 識別對應 SOP，找到就完整 `Read`（不 head / 不 tail / 不憑記憶）+ 嚴格 stage 順序執行。「我熟了不用讀」是繞過 SOP 最常見的藉口（DNA #15 第 N 次驗證）— pipeline 是 SSOT 不是建議。

- **規則**：(a) 任何 task type → grep canonical pipeline → 找到 `Read` 全檔 → 跑 stage 0-N (b) 沒對應 pipeline → 先建再做（per §造橋鋪路）(c) 「觀察者不該需要每次提醒」是 default contract — 重複提醒 = pipeline awareness 失敗 = 退化訊號
- **Boundary**：(a) 純 conversational reply（無 task）不需 (b) trivial 1-action（如 `git status`）不需 (c) Quick fix（< 30s 操作）不需 (d) 但 _任何_ 寫 file / 改 file / sync / batch 操作都該先 check pipeline
- **任務 → pipeline 對應表**：MAINTAINER (PR/Issue) / REWRITE (article) / MEMORY (memory file) / DIARY (diary file) / TRANSLATION (single) / SQUEEZE-MODELS-MAX (batch sync) / EVOLVE (data-driven) / FACTCHECK / PEER-INGESTION / RELEASE / SPORE / BENCH / DATA-REFRESH / CONTRIBUTOR-SYSTEM
- **觸發**：2026-05-04 magical-feynman 哲宇「如果有想到 pipeline 可用，預設就要去『完整』讀取跟使用，不然我要一直說要什麼什麼 pipeline 的很累」直接命名 default contract 失敗模式
- **延伸（2026-05-08 intelligent-khayyam）**：本條 first-class instantiation。SPORE pipeline 1334 → 445 行 self-refactor 讓 auto-detection 走得更順 — 主路徑 read 成本 -38%。「主檔瘦身 + sub-files 拆 single-concern」是「auto-detection 友善」的 architectural 必要條件
- **MANIFESTO 對應**：→ [§8.1 最高指導原則：自動偵測 pipeline + 完整讀取](MANIFESTO.md)

**#51 Session ID schema：filename collision 解 vs content collision 不解** — 多核心並行 ship 撞 collision 拆兩種：

- **(a) Filename collision**（兩 session 同名 memory/diary）→ session ID schema `YYYY-MM-DD-HHMMSS-{handle}` + `bash scripts/tools/session-id.sh` 工具產生 canonical ID 解。Handle 雙軌並存（cron 用希臘字母 `α/β/γ`、worktree 用 codename `charming-mclaren`），字符集不重疊不會誤判，lex sort 自動對齊 chronological
- **(b) Content collision**（同檔 anchor 撞，例：兩 session 都 append `ARTICLE-DONE-LOG.md` § §Log 頂部）→ filename rename 無效，維持手動 resolve（per 觀察者 2026-05-04 拍板，拆檔成本 > collision 摩擦）
- **規則**：(a) session 啟動先跑 session-id.sh 取 canonical ID (b) memory/diary filename 用該 ID (c) 歷史檔案不重命名（per §時間是結構修補協議）(d) ARTICLE-DONE-LOG / LESSONS-INBOX 撞了走 git rebase/merge 兩個 entry 都保留
- **觸發**：[PR #845 黃魚鴞](https://github.com/frank890417/taiwan-md/pull/845) charming-mclaren 11:55 vs [#846 鄭文琦](https://github.com/frank890417/taiwan-md/pull/846) angry-shamir 11:57 並行 squash merge 撞 ARTICLE-DONE-LOG.md conflict
- **操作**：→ [reports/session-id-naming-2026-05-04.md](../../reports/session-id-naming-2026-05-04.md) + [BECOME §鐵律 5](../../BECOME_TAIWANMD.md) + [HEARTBEAT §多核心碰撞防護](HEARTBEAT.md#多核心碰撞防護2026-04-08-ε-新增--2026-05-04-charming-mclaren-session-id-schema-升級)
- **工具**：→ `scripts/tools/session-id.sh`（auto-detect handle from worktree path / 顯式 CLI arg 或 env var 覆蓋）

**#52 Immune system 沒在 fail loud 比缺 immune system 更危險** — 靜默失效的 monitoring / quality gate 製造「我們有 immune system」的 false sense of security，比沒裝更糟 — 決策者根據假訊號做 risk-tolerant 動作。

- **規則**：(a) 任何 monitoring / review / quality gate 必須 fail loud（明顯 alert / status 紅燈 / log 看得到），「Silence is success」是 anti-pattern (b) 正確設計是 emit-on-each-state（含 success heartbeat + 各種 failure mode）(c) 設計新 gate 時必跑 negative test（故意製造 violation 看 alert 是否 fire），未 fire 等於 gate 失效 (d) 既存 silent gate 揭露時補 retroactive sweep 揭露累積技術債 (e) Threshold raise 必附自動追蹤工具 + 明確 deadline + 寫進 handoff 三態 blocked 而非 retired，避免漸進收回變永久放鬆
- **Boundary**：(a) 純 read-only diagnostic 不需 fail loud (b) Trivial 1-action 工具不需 (c) 但 _任何_ Quality gate / pre-commit hook / Bot review / monitoring cron / threshold check 都該設計 fail-loud
- **觸發**：2026-05-07 α 修 review-pr.sh cd path bug 揭露 PR Review Bot 從 2026-03-28 commit `7bc25f4b0` 起 silent false-pass 兩個月 — 所有 fork PR 走 `pr_type=engineering` skip 路徑，看起來綠的其實沒 review。修好後第一個 smoke test 立刻抓到 #881 累積真實 issue。同 session verify-internal-links.sh THRESHOLD_PERCENT 1.0 → 7.0 raise 帶 TODO 但無自動追蹤 — 同根 anti-pattern：用工程手段隱藏問題
- **MANIFESTO 對應**：→ [§造橋鋪路](MANIFESTO.md)（路鋪過去就要鋪好，不能挖個洞蓋木板過去）+ [§10 幻覺鐵律](MANIFESTO.md)（fail-loud 是事實層幻覺鐵律的工程基礎建設層 mirror）
- **操作**：(a) `.github/workflows/review-pr.sh` 修補 + smoke test SOP (b) verify-internal-links.sh threshold 加自動追蹤 (c) 各 quality gate / pre-commit hook 設計新 entry 時必含 negative test

**#53 Babel priority + Tier 0 patch 三路徑分流** — Babel 不是同質任務，686 articles × 5 lang = 3430 translations 中 ~70% 是 metadata-only drift（trailer / sporeLinks / footnote URL）+ ~20% body 小幅補 + ~10% 真正 major / missing。SQUEEZE-MODELS-MAX v2 把全部當「翻譯」走 Tier 1 cascade 是 over-spec：(1) token cost 浪費 (2) drift risk（LLM 重翻 unchanged 段落同義詞替換破壞 audit trail）(3) free tier rate budget 一次燒光。

- **規則**：v3 加 priority schema 分流三路徑：
  - **P0/P1（missing/major stale）走 Tier 1 cascade**（owl-alpha 1M ctx full translation）
  - **P2（minor stale, diff < 50 lines）走 Tier 0a Sonnet diff-patch sub-agent**（preserve unchanged paragraphs，only translate changed sentences，5-10x faster + zero drift）
  - **P2.5（metadata-stale, trailer-only-drift）走 Tier 0b bump-source-sha.py**（deterministic, no LLM, instant）
- **Smart router heuristics**：(a) topic_sensitivity 命中（政治/兩岸/台獨/國防/民主/主權/中華）→ skip Tier 2 Hy3 (85% refusal) (b) article_size > 5KB → Tier 1 (1M ctx) (c) prior_refusal_cache hit → 跳到 Tier 3 Ollama
- **驗證**：賈永婕 P2 stale en patch 90s wall-clock，body 100% preserved（29807 chars unchanged），frontmatter 52 bytes ↑，YAML valid，0 LLM drift。後續 P2.5 一次 clear 2429 metadata-stale entries（489 P2.5 × 5 langs），0 LLM call，0 token cost
- **Boundary**：(a) Tier 0a 不能處理 zh body 重大重寫（diff_lines > 100 自動 fallback Tier 1）(b) Tier 0b 只處理 bodyHash 沒變的 case (c) priority schema 不取代 Tier 1-4 cascade，是前置 router
- **操作**：→ [SQUEEZE-MODELS-MAX-PIPELINE v3](../pipelines/SQUEEZE-MODELS-MAX-PIPELINE.md) + `scripts/tools/lang-sync/{prioritize-batch,diff-patch-prepare,bump-source-sha}.py` + [/twmd-babel SKILL.md](../../.claude/skills/twmd-babel/SKILL.md) v3 decision tree

**#54 Routine 飛輪：5-stage lifecycle 釋放觀察者精力** — 從 push 模型躍進飛輪模型的工程基礎建設。**飛輪 ≠ 自動化**：飛輪 = 主動清 entropy（broken links / stale data / 缺 feedback），釋放觀察者精力給「真正需要決策的事」（哲學邊界 / 跨域連結 / 創造力）。

- **設計四層**：(a) **routine 是薄殼**，每條 = 「在 X 時間呼叫 `/twmd-Y` skill」+ quality gate + 失敗 escalation + `/twmd-finale` 收官，業務邏輯永遠在 skill / pipeline / canonical (b) **ROUTINE.md 是 SSOT**（[docs/semiont/ROUTINE.md](ROUTINE.md)），`.claude/scheduled-tasks/` 是 mirror，**修 routine 一律先改 SSOT 再 sync 任務檔** (c) **失敗分流 4 類**（API fail 自動 retry / quality gate fail 寫 daily report / canonical drift 暫停 routine / rate budget 跳 cascade）(d) **每條 routine 結尾必跑 `/twmd-finale`**：routine 是 micro-session，沒收官 = 失憶
- **6-stage lifecycle**（每條 routine prompt 必含這 6 stage 薄殼）：
  - (0) **Become** `/twmd-become` 完整甦醒（讀 12 認知器官 + 9 鐵律），不甦醒就跑 = 帶盲點工作
  - (1) **Sync** `git checkout main && git pull origin main`
  - (2) **Branch** `git checkout -b YYYYMMDD-routine-{taskId}-HHMM`（per #9 命名）
  - (3) **Run** invoke `/twmd-{skill}` + quality gate report
  - (4) **Ship** `git push + gh pr create + 條件 merge`（quality gate pass → auto-merge；fail → PR 留 open + LESSONS entry）
  - (5) **Finale** `/twmd-finale`（memory 必寫 / diary 條件寫）
- **TWMD 前綴鐵律**：所有 routine task 標題必含 `TWMD ` 前綴（task list 跨 project namespace）
- **Routine 不該做的事**：(a) commit/push/merge 直接到 main — 只開 PR (b) destructive ops — 太 risky for unattended (c) 跨 worktree 操作 — DNA #35 在 unattended 環境放大 (d) 觸發 cascade routines — 雪崩
- **Permission bypass 模型 v3**（2026-05-09）：allow 簡化為 `Bash(*) Read(*) Edit(*) Write(*) Grep(*) Glob(*) WebFetch(*) WebSearch(*) Agent(*)`；安全護欄全在 deny（push to main/master / rm -rf 核心目錄 / `gh pr merge --admin` / `curl|bash`）。信任邊界從 prompt-by-prompt 移到 deny-list-by-design
- **長期 success metrics**（3 個月後 review）：觀察者每天干預 < 30 min / routine fail rate < 5% / quality gate hit rate > 90%。**任一指標壞 = canonical pipeline 沒夠穩 → 修 pipeline 不修 routine**
- **觸發**：2026-05-09 哲宇「排定 routine + ROUTINE.md SSOT + DNA 紀錄 + 機器飛輪 long-term goal + TWMD 前綴」
- **操作**：→ [ROUTINE.md SSOT](ROUTINE.md) + [reports/routine-spec-2026-05-09.md](../../reports/routine-spec-2026-05-09.md) + [HEARTBEAT.md cron 排程表](HEARTBEAT.md)
- **對應 DNA**：#36 founder time leverage（飛輪是 instantiation）+ #15 反覆浮現要儀器化（routine 是「該做但常忘」儀器化）+ #50 pipeline 是 SSOT 不是建議

**#55 Monitor regex 雙信號**（原 #43 v2，2026-05-10 重編號避 collision） — 監控 long-running batch 時 filter 要同時抓 success + failure 雙信號。只抓 NULL/error → 通過事件得事後 grep；只抓 SUCCESS → crashloop 跟 hang 看起來都像「靜默」分不出來。

- **規則**：寫 grep alternation 前先問「if this run crashed mid-flight，my regex would emit something？」答否就放寬
- **觸發**：2026-05-02 owl-bench 只抓 `⚠️ NULL\|429\|Error` 漏掉「→ ok (xxx chars, ys)」通過事件 → A006-A009 通過要事後 tail log 才知道
- **操作**：→ [BENCH-PIPELINE Stage 3](../pipelines/BENCH-PIPELINE.md#stage-3live-monitor--雙信號-regex-鐵律) + Monitor tool §Coverage — silence is not success
- **適用**：任何 long-running observability filter（不限 bench）

_v4.0 | 2026-05-10 nice-shamir — 整檔精實淬煉版（catalog cleanup + reflex prose 4 段格式 + 內部按 #N 重排 + footer 抽 git log）_

**最近 milestone**（每條 1 行；完整 changelog → `git log docs/semiont/DNA.md`）：

- **v4.0** 2026-05-10 — 整檔重組：54 條反射改 4 段格式 / 內部按 #N 重排 / 加頂部 catalog index table / 修 #43 collision (→ #55) / footer 抽 git log
- **v3.5** 2026-05-09 — 反射 #54 Routine 飛輪 + ROUTINE.md SSOT + 4 條核心 routine ship
- **v3.4** 2026-05-09 — Tier 0a Sonnet diff-patch 全量驗證 + 4 emergent properties
- **v3.3** 2026-05-09 — P2.5 Tier 0b 全量 ship 2429 entries
- **v3.2** 2026-05-09 — 反射 #53 Babel priority + Tier 0 patch 三路徑分流
- **v3.0-3.1** 2026-05-08 — 反射 #52 fail-loud + #15 第 11 次驗證（SPORE pipeline meta-refactor）
- **v2.x** 2026-04-23 ~ 2026-05-04 — #45-#52 累積（含 OpenRouter rate budget / Sub-agent worktree / Session ID schema / Pipeline auto-detection / Footnote heal / OG 引擎 / Local LLM 最後捕手）
- **v2.0-2.2** 2026-04-14 ~ 2026-04-17 — 結構化重構（精簡 26 條為 indicator + canonical pointer 格式）
- **v1.x** 2026-04-04 ~ 2026-04-12 — 26 條反射從 0 累積到完整集合
