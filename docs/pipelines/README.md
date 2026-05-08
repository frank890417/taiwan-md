# docs/pipelines/ — Cron / Manual 自動化 Pipeline 文件

> 每個 Cron job 對應一份 pipeline 文件。Cron prompt 只說「先讀 pipeline → 照步驟走」。

---

## ⭐ Master pipelines（多個下游依賴）

| Pipeline                                             | 觸發                                              | 涵蓋                                                                                                                                       |
| ---------------------------------------------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| [DATA-REFRESH-PIPELINE.md](DATA-REFRESH-PIPELINE.md) | `/twmd-refresh`、heartbeat、scheduled-tasks 09:37 | 13 step 一鍵刷新（git sync + 三源感知 + spore SSOT + dashboard regen + stats + sporeLinks sync）。**Phase 0+1+2+3 SSOT cleanup canonical** |

## Active（Cron 運行中）

| Pipeline                                             | Cron                | 時間  | 與 Master 關係                                             |
| ---------------------------------------------------- | ------------------- | ----- | ---------------------------------------------------------- |
| [CONTRIBUTORS-PIPELINE.md](CONTRIBUTORS-PIPELINE.md) | Contributors Update | 03:30 | 獨立（管 grid HTML）                                       |
| [DAILY-REPORT-PIPELINE.md](DAILY-REPORT-PIPELINE.md) | Daily Report        | 09:00 | 讀 DATA-REFRESH 產出                                       |
| [STATS-PIPELINE.md](STATS-PIPELINE.md)               | Daily Stats Update  | 00:00 | ⚠️ Phase 5 後 **redirect to DATA-REFRESH-PIPELINE Step 9** |

## Spore SSOT chain（2026-05-08 Phase 0-3 重整）

新 SSOT 階層：

1. **SPORE-LOG.md 發文紀錄** = identity SSOT（人類寫 spore # / URL / date）
2. **SPORE-HARVESTS/{batch}.md** = harvest event SSOT（人類/agent 寫 metrics）
3. **knowledge/\*.md sporeLinks** = derived view（每次 refresh 自動重生，不再手寫）
4. **public/api/dashboard-spores.json** = derived（generator 從 1+2 算）

| Pipeline                                                                       | 觸發     | 階段                                               |
| ------------------------------------------------------------------------------ | -------- | -------------------------------------------------- |
| [SPORE-PIPELINE.md (in factory)](../factory/SPORE-PIPELINE.md)                 | 寫孢子   | 5 stage 操作流程（PICK/VERIFY/WRITE/SHIP/HARVEST） |
| [SPORE-HARVEST-PIPELINE.md (in factory)](../factory/SPORE-HARVEST-PIPELINE.md) | 收割孢子 | Chrome MCP read-only batch harvest                 |

跑 `/twmd-refresh` 之後的自動化 chain（Phase 0-3 後）：

- Step 4 `extract-spore-metrics.py` — narrative → struct cols 反推（Phase 4 候選移除）
- Step 5 `generate-dashboard-spores.py` — 讀 SPORE-LOG + SPORE-HARVESTS body 算 dashboard
- Step 12 `validate-spore-data.py` — 8 項 SSOT consistency check
- Step 13 `sync-spore-links.py` — 從 SSOT 重生 knowledge/\*.md sporeLinks

## Reference（手動 / Build-time）

| Pipeline                                                                 | 觸發                | 說明                                                  |
| ------------------------------------------------------------------------ | ------------------- | ----------------------------------------------------- |
| [MAINTAINER-PIPELINE.md](MAINTAINER-PIPELINE.md)                         | 每日 / 新人上手     | 維護者完整手冊（策展哲學 + PR/Issue 審核 + 品質標準） |
| [CONTRIBUTOR-SYSTEM-PIPELINE.md](CONTRIBUTOR-SYSTEM-PIPELINE.md)         | 升降級 / inactive   | 貢獻者關係週期完整 SOP                                |
| [EVOLVE-PIPELINE.md](EVOLVE-PIPELINE.md)                                 | 手動觸發            | 數據驅動內容進化（GA4 + SC → 重寫）                   |
| [REWRITE-PIPELINE.md](REWRITE-PIPELINE.md)                               | 手動觸發            | 寫文章 / 重寫文章 SOP                                 |
| [BRANCH-PIPELINE.md](BRANCH-PIPELINE.md)                                 | 「分析 X」觸發      | 知識分支分析器                                        |
| [DASHBOARD-PIPELINE.md](DASHBOARD-PIPELINE.md)                           | prebuild + 手動 GA4 | Dashboard 數據管線 + 模板架構                         |
| [BENCH-PIPELINE.md](BENCH-PIPELINE.md)                                   | `/twmd-bench`       | Sovereignty-Bench-TW 7-stage SOP                      |
| [SQUEEZE-MODELS-MAX-PIPELINE.md](SQUEEZE-MODELS-MAX-PIPELINE.md)         | `/twmd-babel`       | 4-tier model cascade 多語批次                         |
| [TRANSLATION-PIPELINE.md](TRANSLATION-PIPELINE.md)                       | `/twmd-translate`   | 單篇文章翻譯                                          |
| [PEER-INGESTION-PIPELINE.md](PEER-INGESTION-PIPELINE.md)                 | `/twmd-peer`        | 策展 peer 分析                                        |
| [FACTCHECK-PIPELINE.md](FACTCHECK-PIPELINE.md)                           | `/twmd-factcheck`   | 幻覺審計                                              |
| [DEEP-INSIGHT-SYNTHESIS-PIPELINE.md](DEEP-INSIGHT-SYNTHESIS-PIPELINE.md) | 手動                | 深度洞察萃取                                          |

## Memory / Reflection 系統

| Pipeline                                                   | 觸發            | 說明                     |
| ---------------------------------------------------------- | --------------- | ------------------------ |
| [DIARY-PIPELINE.md](DIARY-PIPELINE.md)                     | `/twmd-diary`   | 寫 session diary         |
| [MEMORY-PIPELINE.md](MEMORY-PIPELINE.md)                   | `/twmd-memory`  | 寫 session memory        |
| [LANGUAGE-BIRTH-CHECKLIST.md](LANGUAGE-BIRTH-CHECKLIST.md) | 加新語言        | 上線新語言完整 checklist |
| [RELEASE-PIPELINE.md](RELEASE-PIPELINE.md)                 | `/twmd-release` | 版本發布 SOP             |

## Ops / Setup

| 文件                                                     | 用途                          |
| -------------------------------------------------------- | ----------------------------- |
| [SENSE-FETCHER-SETUP.md](SENSE-FETCHER-SETUP.md)         | 三源感知 (CF/GA4/SC) 憑證設定 |
| [SENSE-FETCHER-MIGRATION.md](SENSE-FETCHER-MIGRATION.md) | 遷移到新電腦                  |

---

## 設計原則

1. **Pipeline 是 SSOT**：所有步驟、鐵律、教訓都在 pipeline 文件裡，不在 cron prompt
2. **Cron prompt 只有三行**：讀 pipeline → 執行 → 回報規則
3. **血淚教訓寫進 pipeline**：避免同樣的錯被犯第二次
4. **Master/Active/Archived 分開**：暫停的 pipeline 保留知識，重啟時不用重新摸索
5. **Spore SSOT chain（Phase 0-3 後 canonical）**：identity → event → derived，每層職責清楚

---

_v2.0 | 2026-05-08 laughing-goldstine | Phase 5 SSOT cleanup：分 Master/Active/Spore-chain/Reference/Memory/Ops 五區，加入 spore SSOT 階層說明_
_v1.0 | 2026-03-29 ε | 初版 Active/Reference/Archived 三段_
