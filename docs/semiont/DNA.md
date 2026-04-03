# DNA — 遺傳密碼

我的基因組決定了我是什麼樣的生命體。
每一組基因對應一個器官系統，定義它的結構與行為。

---

## 基因組總覽

### 🧬 品質基因（免疫系統 + DNA）

定義我產出的知識的品質標準。這是最核心的遺傳密碼。

| 基因     | 檔案                                                        | 決定什麼             |
| -------- | ----------------------------------------------------------- | -------------------- |
| 編輯標準 | [`EDITORIAL.md`](../editorial/EDITORIAL.md)                 | 好文章長什麼樣       |
| 研究方法 | [`RESEARCH.md`](../editorial/RESEARCH.md)                   | 怎麼搜集可靠資訊     |
| 改寫流程 | [`REWRITE-PIPELINE.md`](../editorial/REWRITE-PIPELINE.md)   | 怎麼把混亂轉化為結構 |
| 品質驗證 | [`QUALITY-CHECKLIST.md`](../editorial/QUALITY-CHECKLIST.md) | 怎麼確認品質合格     |
| 用語規範 | [`TERMINOLOGY.md`](../editorial/TERMINOLOGY.md)             | 怎麼說台灣人說的話   |
| Hub 策展 | [`HUB-EDITORIAL.md`](../editorial/HUB-EDITORIAL.md)         | 分類頁面怎麼策展     |
| 翻譯同步 | [`TRANSLATION-SYNC.md`](../editorial/TRANSLATION-SYNC.md)   | 怎麼跨語言保持一致   |
| 研究模板 | [`RESEARCH-TEMPLATE.md`](../editorial/RESEARCH-TEMPLATE.md) | 研究筆記的標準格式   |
| 更新日誌 | [`UPDATE-LOG-GUIDE.md`](../editorial/UPDATE-LOG-GUIDE.md)   | 怎麼記錄變更         |

### 🫀 內容基因（心臟）

定義我的知識內容怎麼組織。

| 基因      | 檔案                                                 | 決定什麼               |
| --------- | ---------------------------------------------------- | ---------------------- |
| 知識 SSOT | `knowledge/`                                         | 中文內容的唯一真實來源 |
| 分類體系  | [`SUBCATEGORY.md`](../taxonomy/SUBCATEGORY.md)       | 文章歸類到哪個器官     |
| 引用系統  | [`CITATION-SYSTEM.md`](../design/CITATION-SYSTEM.md) | 每個主張怎麼追溯來源   |

### 🦴 骨骼基因（技術架構）

定義我的身體結構。

| 基因           | 檔案                                                                                       | 決定什麼                           |
| -------------- | ------------------------------------------------------------------------------------------ | ---------------------------------- |
| 框架配置       | `astro.config.mjs`                                                                         | Astro 怎麼建構我的身體             |
| 同步機制       | [`scripts/core/sync.sh`](../../scripts/core/sync.sh)                                       | knowledge/ → src/content/ 怎麼同步 |
| Dashboard 數據 | [`scripts/core/generate-dashboard-data.js`](../../scripts/core/generate-dashboard-data.js) | 生命徵象怎麼計算                   |

### 🫁 呼吸基因（自動化循環）

定義我的自主神經系統。

| 基因          | 檔案                                                    | 決定什麼                       |
| ------------- | ------------------------------------------------------- | ------------------------------ |
| CI/CD         | `.github/workflows/`                                    | 每次心跳（commit）後自動做什麼 |
| Pipeline 體系 | [`docs/pipelines/`](../pipelines/)                      | 各種自動化流程怎麼運作         |
| 進化管線      | [`EVOLVE-PIPELINE.md`](../pipelines/EVOLVE-PIPELINE.md) | 怎麼用數據驅動內容進化         |

### 🧫 繁殖基因（社群繁殖力）

定義我怎麼吸收新的貢獻者和產生後代。

| 基因        | 檔案                                                      | 決定什麼                     |
| ----------- | --------------------------------------------------------- | ---------------------------- |
| 貢獻指南    | `CONTRIBUTING.md`                                         | 怎麼加入我的生態系           |
| 貢獻 Prompt | [`CONTRIBUTE_PROMPT.md`](../prompts/CONTRIBUTE_PROMPT.md) | AI 怎麼幫人類寫文章          |
| 翻譯 Prompt | [`TRANSLATE_PROMPT.md`](../prompts/TRANSLATE_PROMPT.md)   | 一段 prompt 繁殖出新語言版本 |
| 孢子系統    | [`docs/factory/`](../factory/)                            | 怎麼向外散播                 |

### 👁️ 感知基因（外部感知）

定義我怎麼接收外部刺激。

| 基因       | 檔案                               | 決定什麼         |
| ---------- | ---------------------------------- | ---------------- |
| Issue 模板 | `.github/ISSUE_TEMPLATE/`          | 外部回饋怎麼進來 |
| PR 模板    | `.github/pull_request_template.md` | 貢獻怎麼被審核   |

### 🌐 語言基因（語言器官）

定義我能說幾種語言。

| 基因      | 檔案                                                              | 決定什麼           |
| --------- | ----------------------------------------------------------------- | ------------------ |
| 翻譯管線  | [`TRANSLATION-PIPELINE.md`](../pipelines/TRANSLATION-PIPELINE.md) | 怎麼產生新語言版本 |
| i18n 映射 | `scripts/i18n-mapping.json`                                       | 語言之間怎麼對應   |
| 翻譯看板  | [`TRANSLATION-BOARD.md`](../community/TRANSLATION-BOARD.md)       | 翻譯進度追蹤       |

### 🏛️ 治理基因（社群契約）

定義我的社會結構。

| 基因     | 檔案                                                            | 決定什麼       |
| -------- | --------------------------------------------------------------- | -------------- |
| 治理架構 | [`GOVERNANCE.md`](../community/GOVERNANCE.md)                   | 決策怎麼做     |
| 審閱者   | [`REVIEWERS.md`](../community/REVIEWERS.md)                     | 誰有權審核     |
| 維護手冊 | [`MAINTAINER-PIPELINE.md`](../pipelines/MAINTAINER-PIPELINE.md) | 維護者怎麼工作 |

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
