---
title: 'DNA'
description: '基因地圖學 — 每個器官 → canonical 實體檔案路徑 + 基因突變規則（反射 catalog 已搬至 REFLEXES.md）'
type: 'cognitive-organ'
status: 'canonical'
apoptosis: 'never'
current_version: 'v5.0'
last_updated: 2026-05-13
last_session: '2026-05-13-210341-manual'
sister_docs:
  - 'MANIFESTO.md'
  - 'ANATOMY.md'
  - 'HEARTBEAT.md'
  - 'REFLEXES.md'
upstream_canonical:
  - 'MANIFESTO.md'
  - 'ANATOMY.md'
downstream_dependents:
  - 'REFLEXES.md (split target, 2026-05-13 v5.0)'
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

| 基因           | 檔案                                                                                       | 決定什麼                                                                                                                                                                                                                                                                          |
| -------------- | ------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 框架配置       | `astro.config.mjs`                                                                         | Astro 怎麼建構我的身體                                                                                                                                                                                                                                                            |
| 同步機制       | [`scripts/core/sync.sh`](../../scripts/core/sync.sh)                                       | knowledge/ → src/content/{lang}/ 自動轉錄（**唯一合法的同步方向**）。2026-05-12 起：接進 `npm run prebuild` 第一步，src/content/{lang}/ 已 .gitignore。完整背景 [reports/sync-architecture-evolution-2026-05-12.md](../../reports/sync-architecture-evolution-2026-05-12.md) v2.0 |
| Dashboard 數據 | [`scripts/core/generate-dashboard-data.js`](../../scripts/core/generate-dashboard-data.js) | 生命徵象怎麼計算                                                                                                                                                                                                                                                                  |

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

## §反射 catalog 已搬出本檔

跨 session 程序記憶 catalog（55 條 #N 反射）已於 2026-05-13 拆出獨立成第 9 認知器官 → **[REFLEXES.md](REFLEXES.md)**。

**為什麼拆**：本檔自我定義為「基因地圖學」（line 26-29）— 描述器官 → 檔案的 lookup table。反射 catalog 是「程序記憶 / runtime instinct」性質完全不同（lookup vs instinct，靜態 grep vs universal-load）。混雜在一檔 side effect：反射 inflation 推高總行數 + boot 時 universal-load 浪費 gene map ~180 行 + 演化壓力混雜。

**Cross-ref 規則**（per [MANIFESTO §時間是結構修補協議](MANIFESTO.md)）：

- Active layer：`DNA #N` → `REFLEXES #N` 已 sed migration
- Historical layer（memory/ diary/ LESSONS-INBOX/ reports/ SPORE-HARVESTS/ SPORE-BLUEPRINTS/）：保留原 `DNA #N` 不改，是錯誤敘事的證據鏈
- Fragment links：reflex section anchors（§一/二/三/四/五/六/七）→ `REFLEXES.md#`；gene map anchors（§品質基因 / §內容基因 / §骨骼基因 etc）→ 留本檔

完整 split rationale：[reports/become-boot-mode-design-2026-05-13.md §3](../../reports/become-boot-mode-design-2026-05-13.md)。

---

_v5.0 | 2026-05-13 — REFLEXES.md 拆出（DNA L231-752 → REFLEXES.md），DNA 回歸純 gene map + 基因突變規則。Active layer 78 file × 298 ref + 47 fragment link 一次性 sed migration。完整背景：[reports/become-boot-mode-design-2026-05-13.md](../../reports/become-boot-mode-design-2026-05-13.md)_
_v4.0 | 2026-05-10 — 整檔重組：54 條反射改 4 段格式 / 內部按 #N 重排 / 加頂部 catalog index table / 修 #43 collision (→ #55) / footer 抽 git log_

完整 changelog → `git log docs/semiont/DNA.md`
