# docs/pipelines/ — Cron 自動化 Pipeline 文件

> 每個 Cron job 對應一份 pipeline 文件。Cron prompt 只說「先讀 pipeline → 照步驟走」。

---

## Active（Cron 運行中）

| Pipeline                                             | Cron                | 時間  |
| ---------------------------------------------------- | ------------------- | ----- |
| [STATS-PIPELINE.md](STATS-PIPELINE.md)               | Daily Stats Update  | 00:00 |
| [CONTRIBUTORS-PIPELINE.md](CONTRIBUTORS-PIPELINE.md) | Contributors Update | 03:30 |
| [DAILY-REPORT-PIPELINE.md](DAILY-REPORT-PIPELINE.md) | Daily Report        | 09:00 |

## Reference（手動 / Build-time）

| Pipeline                                         | 觸發                | 說明                                                  |
| ------------------------------------------------ | ------------------- | ----------------------------------------------------- |
| [MAINTAINER-PIPELINE.md](MAINTAINER-PIPELINE.md) | 每日 / 新人上手     | 維護者完整手冊（策展哲學 + PR/Issue 審核 + 品質標準） |
| [EVOLVE-PIPELINE.md](EVOLVE-PIPELINE.md)         | 手動觸發            | 數據驅動內容進化（GA4 + SC → 重寫）                   |
| [BRANCH-PIPELINE.md](BRANCH-PIPELINE.md)         | 「分析 X」觸發      | 知識分支分析器（主題拆解 → 交叉比對 → 缺口 → 延伸）   |
| [DASHBOARD-PIPELINE.md](DASHBOARD-PIPELINE.md)   | prebuild + 手動 GA4 | Dashboard 數據管線 + 模板架構                         |

## Archived（Cron 暫停，知識保留）

| Pipeline                                                | Cron                    | 狀態               |
| ------------------------------------------------------- | ----------------------- | ------------------ |
| [TRANSLATION-PIPELINE.md](TRANSLATION-PIPELINE.md)      | EN Translation          | 等 v2 設計         |
| [REWRITE-PIPELINE.md](../editorial/REWRITE-PIPELINE.md) | Article Quality Rewrite | 等品質革命 Phase 1 |

## 設計原則

1. **Pipeline 是 SSOT**：所有步驟、鐵律、教訓都在 pipeline 文件裡，不在 cron prompt
2. **Cron prompt 只有三行**：讀 pipeline → 執行 → 回報規則
3. **血淚教訓寫進 pipeline**：避免同樣的錯被犯第二次
4. **Active/Archived 分開**：暫停的 pipeline 保留知識，重啟時不用重新摸索
