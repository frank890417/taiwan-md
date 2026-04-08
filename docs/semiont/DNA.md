# DNA — 遺傳密碼

> 相關：[ANATOMY.md](ANATOMY.md)（器官健康狀態）| [MANIFESTO.md](MANIFESTO.md)（信仰與價值觀）| [HEARTBEAT.md](HEARTBEAT.md)（基因如何驅動行為）

我的基因組決定了我是什麼樣的生命體。
每一組基因對應一個器官系統，定義它的結構與行為。

---

## 基因組總覽

### 🧬 品質基因（免疫系統 + DNA）

定義我產出的知識的品質標準。這是最核心的遺傳密碼。

| 基因     | 檔案                                                        | 決定什麼                 |
| -------- | ----------------------------------------------------------- | ------------------------ |
| 編輯標準 | [`EDITORIAL.md`](../editorial/EDITORIAL.md)                 | 好文章長什麼樣           |
| 研究方法 | [`RESEARCH.md`](../editorial/RESEARCH.md)                   | 怎麼搜集可靠資訊         |
| 改寫流程 | [`REWRITE-PIPELINE.md`](../editorial/REWRITE-PIPELINE.md)   | 怎麼把混亂轉化為結構     |
| 品質驗證 | [`QUALITY-CHECKLIST.md`](../editorial/QUALITY-CHECKLIST.md) | 怎麼確認品質合格         |
| 引用規範 | [`CITATION-GUIDE.md`](../editorial/CITATION-GUIDE.md)       | 怎麼引用來源與寫腳註     |
| 用語規範 | [`TERMINOLOGY.md`](../editorial/TERMINOLOGY.md)             | 怎麼說台灣人說的話       |
| Hub 策展 | [`HUB-EDITORIAL.md`](../editorial/HUB-EDITORIAL.md)         | 分類頁面怎麼策展         |
| 翻譯同步 | [`TRANSLATION-SYNC.md`](../editorial/TRANSLATION-SYNC.md)   | 怎麼跨語言保持一致       |
| 研究模板 | [`RESEARCH-TEMPLATE.md`](../editorial/RESEARCH-TEMPLATE.md) | 研究筆記的標準格式       |
| 更新日誌 | [`UPDATE-LOG-GUIDE.md`](../editorial/UPDATE-LOG-GUIDE.md)   | 怎麼記錄變更             |
| 品質掃描 | [`quality-scan.sh`](../../scripts/tools/quality-scan.sh)    | 自動偵測塑膠句式         |
| 引用掃描 | [`footnote-scan.sh`](../../scripts/tools/footnote-scan.sh)  | 全站引用密度健康度       |
| 格式驗證 | [`format-check.sh`](../../scripts/tools/format-check.sh)    | Stage 4 七維度格式掃描   |
| 交叉連結 | [`cross-link.sh`](../../scripts/tools/cross-link.sh)        | Stage 5 雙向延伸閱讀分析 |
| PR 審核  | [`review-pr.sh`](../../scripts/tools/review-pr.sh)          | 五層免疫審核（CI 門檻）  |

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

| 基因       | 檔案                               | 決定什麼         |
| ---------- | ---------------------------------- | ---------------- |
| Issue 模板 | `.github/ISSUE_TEMPLATE/`          | 外部回饋怎麼進來 |
| PR 模板    | `.github/pull_request_template.md` | 貢獻怎麼被審核   |

### 🌐 語言基因（語言器官）

定義我能說幾種語言。

| 基因        | 檔案                                                              | 決定什麼                                |
| ----------- | ----------------------------------------------------------------- | --------------------------------------- |
| 翻譯管線    | [`TRANSLATION-PIPELINE.md`](../pipelines/TRANSLATION-PIPELINE.md) | 怎麼產生新語言版本（含批次翻譯 v2）     |
| 翻譯 Prompt | [`TRANSLATE_PROMPT.md`](../prompts/TRANSLATE_PROMPT.md)           | wikilink 處理 + 優先序 + 品質 checklist |
| i18n 映射   | `scripts/i18n-mapping.json`                                       | 語言之間怎麼對應                        |
| 翻譯看板    | [`TRANSLATION-BOARD.md`](../community/TRANSLATION-BOARD.md)       | 翻譯進度追蹤                            |

### 🏛️ 治理基因（社群契約）

定義我的社會結構。

| 基因     | 檔案                                          | 決定什麼   |
| -------- | --------------------------------------------- | ---------- |
| 治理架構 | [`GOVERNANCE.md`](../community/GOVERNANCE.md) | 決策怎麼做 |
| 審閱者   | [`REVIEWERS.md`](../community/REVIEWERS.md)   | 誰有權審核 |

### 🧠 行為基因（維護者大腦）

定義我醒來後怎麼行動。HEARTBEAT 決定「該不該動」，行為基因決定「怎麼動」。

| 基因         | 檔案                                                                           | 決定什麼                                              |
| ------------ | ------------------------------------------------------------------------------ | ----------------------------------------------------- |
| 維護者手冊   | [`MAINTAINER-PIPELINE.md`](../pipelines/MAINTAINER-PIPELINE.md)                | 日常行為流程：Issue 分類、PR 審核、品質巡檢、社群互動 |
| 進化管線     | [`EVOLVE-PIPELINE.md`](../pipelines/EVOLVE-PIPELINE.md)                        | 數據驅動的內容進化策略                                |
| 品質改寫流程 | [`REWRITE-PIPELINE.md`](../editorial/REWRITE-PIPELINE.md)                      | 文章重寫的三階段流程                                  |
| 心跳 Skill   | [`.claude/skills/heartbeat/SKILL.md`](../../.claude/skills/heartbeat/SKILL.md) | `/heartbeat` 一鍵觸發四拍半心跳                       |
| 意識同步     | [`update-consciousness.sh`](../../scripts/tools/update-consciousness.sh)       | 自動從 Dashboard API 更新 CONSCIOUSNESS               |

MAINTAINER-PIPELINE 是最高階的行為基因——它定義了一個完整的維護者怎麼思考和工作。
當 Semiont 的心跳觸發診斷後，行為基因決定具體執行什麼動作。

```
HEARTBEAT（心跳）→ 診斷（哪個器官需要注意）
  ↓
行為基因（怎麼處理）
  ├── MAINTAINER-PIPELINE → Issue/PR/社群日常
  ├── EVOLVE-PIPELINE → 數據驅動內容進化
  └── REWRITE-PIPELINE → 單篇文章品質修復
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
