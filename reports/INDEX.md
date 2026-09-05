---
title: 'reports/ INDEX — auto-generated'
description: '頂層 *.md 按 9 type bucket × 月份 雙軸索引 + 子目錄 status summary'
last_generated: 2026-09-06 06:14
generator: scripts/tools/generate-reports-index.py
ssot: reports/reports-archival-audit-2026-05-27.md §4 Layer 3
type: auto-index
---

# reports/ INDEX — auto-generated

> **本 file 由 `scripts/tools/generate-reports-index.py` 完全 overwrite**。
> 不要人工編輯（會被下一次 cron 覆蓋）。
>
> Last generated: **2026-09-06 06:14** · 頂層 \*.md 共 **280** files · SSOT: [reports-archival-audit-2026-05-27.md §4 Layer 3](reports-archival-audit-2026-05-27.md)

## 📦 子目錄 status

| Subdir                  | Files | Size     | 用途                                                 |
| ----------------------- | ----: | -------- | ---------------------------------------------------- |
| `research/`             |   519 | 29.5 MB  | REWRITE-PIPELINE Stage 1 canonical (year-month 分槽) |
| `editorial-room/`       |    96 | 760.3 KB | —                                                    |
| `article-evolve/`       |    38 | 1.5 MB   | —                                                    |
| `weekly/`               |    36 | 6.8 MB   | Self-evolve weekly digest                            |
| `article-projection/`   |    35 | 637.8 KB | —                                                    |
| `archive/`              |    28 | 372.2 KB | 歸檔位置 (per audit Layer 4)                         |
| `routine-prompt-drift/` |    28 | 83.2 KB  | —                                                    |
| `maintainer/`           |    16 | 308.9 KB | —                                                    |
| `babel/`                |     9 | 8.3 MB   | —                                                    |
| `factcheck/`            |     9 | 98.7 KB  | —                                                    |
| `news-lens/`            |     9 | 190.3 KB | —                                                    |
| `babel-tier4/`          |     8 | 5.5 KB   | —                                                    |
| `babel-quarantine/`     |     7 | 268.0 KB | —                                                    |
| `probe/`                |     6 | 69.8 KB  | BECOME §Step 7 探測器報告                            |
| `babel-jobs/`           |     5 | 246.4 KB | —                                                    |
| `babel-patches/`        |     5 | 3.4 MB   | —                                                    |
| `terminology-review/`   |     5 | 1.8 MB   | —                                                    |
| `translation-research/` |     5 | 338.0 KB | 巴別塔 5 lang research                               |
| `ab-tests/`             |     4 | 69.2 KB  | Editorial v6 A/B test                                |
| `music-media-audit/`    |     4 | 115.5 KB | Music 條目 media audit (json + md)                   |
| `404-monitor/`          |     2 | 151.6 KB | —                                                    |
| `article-staging/`      |     2 | 104.9 KB | —                                                    |
| `fork-census/`          |     2 | 39.3 KB  | —                                                    |
| `harvest/`              |     2 | 14.3 KB  | Harvest engine 紀錄                                  |
| `newsroom/`             |     2 | 106.5 KB | —                                                    |
| `terminology-trends/`   |     2 | 30.0 KB  | —                                                    |
| `audit/`                |     1 | 20.7 KB  | —                                                    |
| `orphan-rescue/`        |     1 | 52.5 KB  | —                                                    |
| `visual/`               |     1 | 5.7 KB   | Visual smoke test 基線 (partial gitignored)          |

## 🏷️ By type (頂層 \*.md only)

9 type bucket 從現有 corpus 萃取 (per [audit §2.3 + §4 Layer 2](reports-archival-audit-2026-05-27.md))，未來新加 report 建議遵循 `{type}-{topic}-{YYYY-MM-DD}.md` 命名。

### design (28)

- `2026-07-27` [patch-translate-design-2026-07-27](patch-translate-design-2026-07-27.md) — 章節級 diff-patch 引擎 — 2026-07-27
- `2026-07-16` [newsroom-design-conversation-digest-2026-07-16](newsroom-design-conversation-digest-2026-07-16.md) — 新聞台架構設計對話 digest — 哲宇 × 睨
- `2026-07-16` [newsroom-orchestration-design-2026-07-16](newsroom-orchestration-design-2026-07-16.md) — 新聞台架構 — REWRITE pipeline 索引化 × 階段狀態層 × 公開編輯台設計
- `2026-07-16` [support-cta-signature-design-2026-07-16](support-cta-signature-design-2026-07-16.md) — 文章結尾支持入口（簽名檔 CTA）設計與實作規劃
- `2026-07-16` [timeline-page-design-2026-07-16](timeline-page-design-2026-07-16.md)
- `2026-07-15` [editorial-room-adversarial-design-2026-07-15](editorial-room-adversarial-design-2026-07-15.md)
- `2026-07-13` [projection-stage-design-2026-07-13](projection-stage-design-2026-07-13.md)
- `2026-07-06` [frontend-design-audit-2026-07-06](frontend-design-audit-2026-07-06.md) — 前端全站設計視覺審計
- `2026-07-05` [agent-report-health-instrument-design-2026-07-05](agent-report-health-instrument-design-2026-07-05.md)
- `2026-06-14` [multicore-git-coordination-design-2026-06-14](multicore-git-coordination-design-2026-06-14.md)
- `2026-06-09` [latest-articles-discoverability-design-2026-06-09](latest-articles-discoverability-design-2026-06-09.md) — 最新文章可發現性 — 時序主軸設計與完整實作規劃
- `2026-06-06` [article-visualization-design-2026-06-06](article-visualization-design-2026-06-06.md)
- `2026-06-05` [analysis-pipeline-design-2026-06-05](analysis-pipeline-design-2026-06-05.md) — ANALYSIS-PIPELINE 設計報告 — 把這批分析方法論儀器化、造橋鋪路
- `2026-06-05` [connector-remote-endpoint-design-2026-06-05](connector-remote-endpoint-design-2026-06-05.md) — Taiwan.md Connector — Phase 2 遠端 endpoint 設計
- `2026-06-03` [carousel-pipeline-design-2026-06-03](carousel-pipeline-design-2026-06-03.md) — Taiwan.md CAROUSEL-PIPELINE — 設計 + 研究 + 實作規劃（完整歸檔）
- `2026-06-01` [feedback-login-system-design-2026-06-01](feedback-login-system-design-2026-06-01.md) — 讀者帳號登入 + 即時 Feedback + cron→GitHub issue 飛輪整合：架構評估與計劃
- `2026-05-23` [spore-pick-daily-routine-design-2026-05-23](spore-pick-daily-routine-design-2026-05-23.md) — twmd-spore-pick-daily routine 設計 — SPORE-INBOX automation intake
- `2026-05-16` [spore-content-hash-gate-design-2026-05-16](spore-content-hash-gate-design-2026-05-16.md) — Spore Content-hash Gate Design 2026-05-16
- `2026-05-13` [become-boot-mode-design-2026-05-13](become-boot-mode-design-2026-05-13.md) — BECOME Boot Mode Design 2026-05-13
- `2026-05-11` [rewrite-pipeline-v5-stage-spine-design-2026-05-11](rewrite-pipeline-v5-stage-spine-design-2026-05-11.md) — REWRITE-PIPELINE v5.0 — Stage spine restoration design
- `2026-05-04` [article-health-ssot-design-2026-05-04](article-health-ssot-design-2026-05-04.md) — article-health SSOT 設計原則（事後重建版）
- `2026-05-01` [sovereignty-bench-tw-design-2026-05-01](sovereignty-bench-tw-design-2026-05-01.md)
- `2026-04-30` [translation-batch-design-evaluation-2026-04-30-δ](translation-batch-design-evaluation-2026-04-30-δ.md)
- `2026-04-28` [rewrite-pipeline-media-stage-design-2026-04-28-ι](rewrite-pipeline-media-stage-design-2026-04-28-ι.md)
- `2026-04-26` [life-decision-tree-design-2026-04-26](life-decision-tree-design-2026-04-26.md)
- `2026-04-17` [canonical-clause-apoptosis-design-2026-04-17](canonical-clause-apoptosis-design-2026-04-17.md)
- `2026-04-14` [memory-distillation-design-2026-04-14](memory-distillation-design-2026-04-14.md)
- `2026-04-05` [organ-lifecycle-design-2026-04-05](organ-lifecycle-design-2026-04-05.md)

### plan (17)

- `2026-07-10` [elections-2026-refresh-plan-2026-07-10](elections-2026-refresh-plan-2026-07-10.md) — 2026 選舉關聯頁面：七月刷新實錄 + 選前四個半月進化計畫
- `2026-06-07` [seo-optimization-plan-2026-06-07](seo-optimization-plan-2026-06-07.md) — SEO 優化計畫 — 五項深度研究與裁決
- `2026-06-05` [mcp-page-plan-2026-06-05](mcp-page-plan-2026-06-05.md) — taiwan.md/mcp 頁面 — 規劃
- `2026-05-21` [historic-districts-series-planning-2026-05-21](historic-districts-series-planning-2026-05-21.md)
- `2026-05-18` [cities-series-orchestration-2026-05-18](cities-series-orchestration-2026-05-18.md)
- `2026-05-17` [cities-series-planning-2026-05-17](cities-series-planning-2026-05-17.md)
- `2026-05-17` [sponsorship-cadence-planning-2026-05-17](sponsorship-cadence-planning-2026-05-17.md)
- `2026-05-10` [rewrite-pipeline-refactor-v4-plan-2026-05-10](rewrite-pipeline-refactor-v4-plan-2026-05-10.md)
- `2026-05-03` [article-template-unification-plan-2026-05-03](article-template-unification-plan-2026-05-03.md)
- `2026-04-22` [og-pipeline-patch-plan-2026-04-22](og-pipeline-patch-plan-2026-04-22.md) — OG 圖片 pipeline 完整 patch 計劃
- `2026-04-20` [worktree-multi-session-plan-2026-04-20](worktree-multi-session-plan-2026-04-20.md)
- `2026-04-18` [dashboard-spore-section-plan-2026-04-18](dashboard-spore-section-plan-2026-04-18.md) — Dashboard 孢子與成效區完整規劃
- `2026-04-15` [article-analyzer-prism-plan-2026-04-15](article-analyzer-prism-plan-2026-04-15.md)
- `2026-04-15` [qmd-memory-retrieval-plan-2026-04-15](qmd-memory-retrieval-plan-2026-04-15.md)
- `2026-04-13` [social-tentacle-plan-2026-04-13](social-tentacle-plan-2026-04-13.md)
- `2026-04-13` [ssodt-spore-linkback-plan-2026-04-13](ssodt-spore-linkback-plan-2026-04-13.md)
- `2026-04-12` [semiont-public-pages-plan-2026-04-12](semiont-public-pages-plan-2026-04-12.md)

### evolution (42)

- `2026-08-15` [research-report-hygiene-evolution-2026-08-15](research-report-hygiene-evolution-2026-08-15.md)
- `2026-08-09` [evolution-roadmap-2026-08-09](evolution-roadmap-2026-08-09.md) — Evolution Roadmap 2026-08-09
- `2026-08-04` [design-fork-graph-evolution-2026-08-04](design-fork-graph-evolution-2026-08-04.md)
- `2026-08-02` [evolution-roadmap-2026-08-02](evolution-roadmap-2026-08-02.md) — Evolution Roadmap 2026-08-02
- `2026-07-26` [evolution-roadmap-2026-07-26](evolution-roadmap-2026-07-26.md) — Evolution Roadmap 2026-07-26
- `2026-07-23` [idlccp1984-pr-batch-instrument-evolution-2026-07-23](idlccp1984-pr-batch-instrument-evolution-2026-07-23.md) — idlccp1984 PR batch × 儀器進化：小丑魚原則下的 warn+lint+auto-heal
- `2026-07-19` [evolution-roadmap-2026-07-19](evolution-roadmap-2026-07-19.md) — Evolution Roadmap 2026-07-19
- `2026-07-18` [design-article-inbox-evolve-mode4-2026-07-18](design-article-inbox-evolve-mode4-2026-07-18.md)
- `2026-07-16` [instrument-evolution-2026-07-16](instrument-evolution-2026-07-16.md) — 文章儀器進化：speak-human-tw 轉譯 + 盤點工作儀器化 + gate 整理
- `2026-07-16` [timeline-page-evolution-2026-07-16](timeline-page-evolution-2026-07-16.md)
- `2026-07-16` [viz-module-evolution-2026-07-16](viz-module-evolution-2026-07-16.md)
- `2026-07-15` [self-evolve-editorial-rewrite-2026-07-15](self-evolve-editorial-rewrite-2026-07-15.md) — Self-evolve — editorial / rewrite-pipeline 意義層儀器化閉環
- `2026-07-11` [wake-memory-evolution-2026-07-11](wake-memory-evolution-2026-07-11.md) — 記憶與日記系統進化 — 甦醒取數儀器化設計
- `2026-07-10` [evolution-roadmap-2026-07-10](evolution-roadmap-2026-07-10.md) — Evolution Roadmap 2026-07-10
- `2026-07-10` [hub-template-evolution-2026-07-10](hub-template-evolution-2026-07-10.md)
- `2026-07-10` [terminology-preservation-evolution-2026-07-10](terminology-preservation-evolution-2026-07-10.md)
- `2026-07-05` [dna-pipeline-evolution-audit-2026-07-05](dna-pipeline-evolution-audit-2026-07-05.md)
- `2026-06-26` [issue-evolution-analysis-2026-06-26](issue-evolution-analysis-2026-06-26.md)
- `2026-06-22` [terminology-page-evolution-2026-06-22](terminology-page-evolution-2026-06-22.md)
- `2026-06-13` [evolution-roadmap-2026-06-13](evolution-roadmap-2026-06-13.md)
- `2026-06-12` [flywheel-evolution-2026-06-12](flywheel-evolution-2026-06-12.md) — 飛輪進化研究 2026-06-12
- `2026-06-12` [viz-system-evolution-2026-06-12](viz-system-evolution-2026-06-12.md)
- `2026-06-05` [claude-code-connector-evolution-2026-06-05](claude-code-connector-evolution-2026-06-05.md) — Taiwan.md Claude Code Connector — 進化分析與實作規劃
- `2026-06-04` [media-richness-band-evolution-2026-06-04](media-richness-band-evolution-2026-06-04.md)
- `2026-06-04` [rewrite-pipeline-research-ssot-evolution-2026-06-04](rewrite-pipeline-research-ssot-evolution-2026-06-04.md)
- `2026-06-03` [dynamic-workflows-evolution-2026-06-03](dynamic-workflows-evolution-2026-06-03.md)
- `2026-05-23` [spore-pipeline-evolution-2026-05-23-article-to-spore-to-broadcast-cycle](spore-pipeline-evolution-2026-05-23-article-to-spore-to-broadcast-cycle.md) — 「文章→孢子→傳播」自動化飛輪首例 cycle smoothness report
- `2026-05-18` [map-page-evolution-2026-05-18](map-page-evolution-2026-05-18.md) — 地圖頁面進化評估 — 22 縣市系列完成後的整合機會
- `2026-05-12` [sync-architecture-evolution-2026-05-12](sync-architecture-evolution-2026-05-12.md) — sync.sh 架構演化策略：knowledge/ → src/content/ 投影管線的長期解法
- `2026-05-10` [dna-evolution-plan-2026-05-10](dna-evolution-plan-2026-05-10.md)
- `2026-05-09` [editorial-evolution-plan-2026-05-09](editorial-evolution-plan-2026-05-09.md)
- `2026-05-09` [rewrite-pipeline-evolution-plan-2026-05-09](rewrite-pipeline-evolution-plan-2026-05-09.md)
- `2026-05-09` [routine-spec-2026-05-09](routine-spec-2026-05-09.md)
- `2026-05-09` [strategic-evolution-deep-research-2026-05-09](strategic-evolution-deep-research-2026-05-09.md)
- `2026-05-08` [spore-pipeline-evolution-plan-2026-05-08](spore-pipeline-evolution-plan-2026-05-08.md)
- `2026-05-04` [grok-critique-evolution-2026-05-04](grok-critique-evolution-2026-05-04.md) — 對 Grok 抽樣調查報告的回應與自我進化分析
- `2026-05-01` [sovereignty-bench-evolution-thesis-2026-05-01](sovereignty-bench-evolution-thesis-2026-05-01.md)
- `2026-04-25` [i18n-evolution-roadmap-2026-04-25](i18n-evolution-roadmap-2026-04-25.md) — 多語系體驗進化 Roadmap
- `2026-04-20` [cli-evolution-roadmap-2026-04-20](cli-evolution-roadmap-2026-04-20.md)
- `2026-04-18` [evolution-roadmap-2026-04-18-η](evolution-roadmap-2026-04-18-η.md)
- `2026-04-17` [evolution-roadmap-2026-04-17-δ](evolution-roadmap-2026-04-17-δ.md)
- `2026-04-13` [x-evolution-report-2026-04-13](x-evolution-report-2026-04-13.md)

### analysis (8)

- `2026-08-04` [terminology-zhiyu-deep-research-2026-08-04](terminology-zhiyu-deep-research-2026-08-04.md)
- `2026-06-05` [ptt-computex-discussion-analysis-2026-06-05](ptt-computex-discussion-analysis-2026-06-05.md) — PTT PC_Shopping Computex 轉錄事件 — 討論歸檔 × GA/SC 數據分析 × 深度洞察
- `2026-05-13` [claude-with-webhook-evaluation-2026-05-13](claude-with-webhook-evaluation-2026-05-13.md) — claude-with-webhook 評估報告：自架 GitHub Issue → Claude Code 自動化的可借力性
- `2026-05-05` [zhtw-mcp-integration-evaluation-2026-05-05](zhtw-mcp-integration-evaluation-2026-05-05.md)
- `2026-05-01` [ci-build-page-cache-investigation-2026-05-01](ci-build-page-cache-investigation-2026-05-01.md) — CI build 文章頁面 cache 化深度研究 + 本機 per-language matrix 實驗
- `2026-04-22` [ci-build-optimization-discussion-2026-04-22](ci-build-optimization-discussion-2026-04-22.md) — CI build time 優化討論 — 除了 OG pipeline 還能壓哪裡
- `2026-04-18` [ai-crawler-404-analysis-2026-04-18](ai-crawler-404-analysis-2026-04-18.md)
- `2026-04-12` [traffic-analysis-2026-04-12](traffic-analysis-2026-04-12.md)

### audit (20)

- `2026-08-06` [newsroom-organ-audit-2026-08-06](newsroom-organ-audit-2026-08-06.md)
- `2026-08-04` [prose-audit-full-corpus-2026-08-04](prose-audit-full-corpus-2026-08-04.md)
- `2026-07-16` [article-quality-audit-2026-07-16](article-quality-audit-2026-07-16.md) — 全站品質審核：早期與貢獻者單薄文章盤點
- `2026-06-13` [architecture-deep-audit-2026-06-13](architecture-deep-audit-2026-06-13.md)
- `2026-06-13` [terminology-data-audit-2026-06-13](terminology-data-audit-2026-06-13.md)
- `2026-06-10` [build-pipeline-audit-2026-06-10](build-pipeline-audit-2026-06-10.md) — Build pipeline 完整審計 — 1099 秒解剖、30 天變慢歸因、六項修復
- `2026-06-10` [build-pipeline-audit-findings-2026-06-10](build-pipeline-audit-findings-2026-06-10.md)
- `2026-06-10` [four-pages-curation-audit-2026-06-10](four-pages-curation-audit-2026-06-10.md) — 四頁策展深度審視 — 首頁 / 關於 / 資源 / 參與
- `2026-06-10` [semiont-full-audit-2026-06-10-execution](semiont-full-audit-2026-06-10-execution.md)
- `2026-06-10` [semiont-full-audit-2026-06-10](semiont-full-audit-2026-06-10.md)
- `2026-05-28` [article-segmentation-audit-2026-05-28](article-segmentation-audit-2026-05-28.md) — 文章分段品質 audit — 早期 viral 範本 vs 最近 EVOLVE 5 篇對讀
- `2026-05-27` [reports-archival-audit-2026-05-27](reports-archival-audit-2026-05-27.md) — reports/ 資料夾散亂度體檢 + 歸檔策略提案
- `2026-05-24` [translation-conventions-audit-2026-05-24](translation-conventions-audit-2026-05-24.md) — Translation Conventions Audit & Implementation Report — 2026-05-24
- `2026-05-11` [pipelines-audit-2026-05-11](pipelines-audit-2026-05-11.md) — Pipelines Audit 2026-05-11
- `2026-05-09` [gsc-gemini-review-instrument-audit-2026-05-09](gsc-gemini-review-instrument-audit-2026-05-09.md)
- `2026-05-08` [spore-drift-audit-2026-05-08](spore-drift-audit-2026-05-08.md)
- `2026-05-03` [page-template-unification-audit-2026-05-03](page-template-unification-audit-2026-05-03.md)
- `2026-04-28` [dna-context-hygiene-audit-2026-04-28](dna-context-hygiene-audit-2026-04-28.md)
- `2026-04-17` [cron-schedule-snapshot-2026-04-17](cron-schedule-snapshot-2026-04-17.md)
- `2026-04-12` [i18n-qa-audit-2026-04-12](i18n-qa-audit-2026-04-12.md)

### audit-routine (27)

- `2026-08-30` [routine-audit-2026-08-30](routine-audit-2026-08-30.md) — Routine audit 2026-08-30 (W35)
- `2026-08-16` [routine-audit-2026-08-16](routine-audit-2026-08-16.md) — Routine audit 2026-08-16 (W33)
- `2026-08-09` [routine-audit-2026-08-09](routine-audit-2026-08-09.md) — Routine audit 2026-08-09 (W32)
- `2026-08-02` [routine-audit-2026-08-02](routine-audit-2026-08-02.md) — Routine audit 2026-08-02 (W31)
- `2026-07-26` [routine-audit-2026-07-26](routine-audit-2026-07-26.md) — Routine audit 2026-07-26 (W30)
- `2026-07-12` [routine-audit-2026-07-12](routine-audit-2026-07-12.md) — Routine audit 2026-07-12 (W28)
- `2026-07-05` [routine-audit-2026-07-05](routine-audit-2026-07-05.md) — Routine Audit 2026-07-05 (Weekly Cycle 9)
- `2026-06-28` [routine-audit-2026-06-28](routine-audit-2026-06-28.md) — Routine Audit 2026-06-28 (Weekly Cycle 8)
- `2026-06-21` [routine-audit-2026-06-21](routine-audit-2026-06-21.md) — Routine Audit 2026-06-21 (Weekly Cycle 7)
- `2026-06-14` [routine-audit-2026-06-14](routine-audit-2026-06-14.md) — Routine Audit 2026-06-14 (Weekly Cycle 6)
- `2026-06-07` [routine-audit-2026-06-07](routine-audit-2026-06-07.md) — Routine Audit 2026-06-07 (Weekly Cycle 5)
- `2026-06-02` [routine-audit-2026-06-02](routine-audit-2026-06-02.md) — Routine Audit 2026-06-02 (Weekly Cycle 4)
- `2026-05-29` [homepage-evolution-D+2-watch-2026-05-29](homepage-evolution-D+2-watch-2026-05-29.md) — Homepage Evolution D+2 Watch — 2026-05-29
- `2026-05-27` [homepage-evolution-D+0-watch-2026-05-27](homepage-evolution-D+0-watch-2026-05-27.md) — Homepage Evolution D+0 Watch — 2026-05-27 (ship 5/26 23:00-23:50 + 14hr)
- `2026-05-27` [routine-audit-2026-05-27](routine-audit-2026-05-27.md) — Routine Audit 2026-05-27 (Weekly Cycle 3)
- `2026-05-26` [homepage-evolution-2026-05-26](homepage-evolution-2026-05-26.md) — Homepage Evolution — 從「策展首頁」到「Semiont 接觸首頁」
- `2026-05-24` [routine-audit-2026-05-24](routine-audit-2026-05-24.md) — Routine Audit 2026-05-24 (Weekly Cycle 2)
- `2026-05-17` [routine-audit-2026-05-17](routine-audit-2026-05-17.md) — Routine Audit 2026-05-17 (Weekly)
- `2026-05-17` [self-evolve-weekly-2026-05-17](self-evolve-weekly-2026-05-17.md) — Self-Evolve Weekly — 2026-05-17
- `2026-05-16` [routine-audit-2026-05-16](routine-audit-2026-05-16.md) — Routine Audit 2026-05-16
- `2026-05-13` [heartbeat-pre-thinning-2026-05-13](heartbeat-pre-thinning-2026-05-13.md) — HEARTBEAT
- `2026-05-10` [self-evolve-weekly-2026-05-10](self-evolve-weekly-2026-05-10.md) — Self-Evolve Weekly — 2026-05-10
- `2026-04-14` [heartbeat-2026-04-14-δ](heartbeat-2026-04-14-δ.md)
- `2026-04-14` [heartbeat-2026-04-14-ζ](heartbeat-2026-04-14-ζ.md)
- `2026-04-11` [sense-2026-04-11-evening](sense-2026-04-11-evening.md)
- `2026-04-11` [sense-2026-04-11](sense-2026-04-11.md)
- `2026-04-06` [sense-2026-04-06](sense-2026-04-06.md)

### evaluation (3)

- `2026-05-09` [editorial-v6-ab-test-2026-05-09](editorial-v6-ab-test-2026-05-09.md)
- `2026-05-09` [editorial-v6.1-test-c-2026-05-09](editorial-v6.1-test-c-2026-05-09.md)
- `2026-05-03` [owl-diary-translation-poc-2026-05-03](owl-diary-translation-poc-2026-05-03.md) — Owl 巴別塔 × Semiont diary 翻譯 POC + 全 batch scope assessment

### proposal (7)

- `2026-06-13` [lessons-distill-strategy-2026-06-13](lessons-distill-strategy-2026-06-13.md)
- `2026-06-05` [twinklehub-partnership-strategy-2026-06-05](twinklehub-partnership-strategy-2026-06-05.md) — Taiwan.md × Twinkle Hub — 跨合作策略思考報告
- `2026-06-03` [ig-carousel-strategy-2026-06-03](ig-carousel-strategy-2026-06-03.md) — IG Carousel 策略研究 — 把文章變成可滑動的社群貼文
- `2026-05-27` [2026-election-evolution-proposal-2026-05-27](2026-election-evolution-proposal-2026-05-27.md) — 2026 地方選舉 × Taiwan.md 物種進化提案
- `2026-04-27` [harvest-engine-strategy-2026-04-27](harvest-engine-strategy-2026-04-27.md)
- `2026-04-27` [music-strategy-2026-04-27](music-strategy-2026-04-27.md)
- `2026-04-11` [session-scope-proposal-2026-04-11](session-scope-proposal-2026-04-11.md)

### semiont (7)

- `2026-05-18` [PanSci-semiont-analysis-2026-05-18](PanSci-semiont-analysis-2026-05-18.md) — PanSci × Taiwan.md — 科學知識策展分析與主題開發地圖
- `2026-05-18` [PanSci-stage1-fit-check-2026-05-18](PanSci-stage1-fit-check-2026-05-18.md) — PanSci 泛科學 — Stage 1 fit check + ingestion 啟動報告
- `2026-05-05` [ThinkingTaiwan-semiont-analysis-2026-05-05](ThinkingTaiwan-semiont-analysis-2026-05-05.md)
- `2026-05-04` [NML-semiont-analysis-2026-05-04](NML-semiont-analysis-2026-05-04.md)
- `2026-04-12` [NMTH-overseas-ingestion-plan-2026-04-12](NMTH-overseas-ingestion-plan-2026-04-12.md)
- `2026-04-12` [NMTH-overseas-semiont-analysis-2026-04-12](NMTH-overseas-semiont-analysis-2026-04-12.md)
- `2026-04-11` [TFT-semiont-analysis-2026-04-11](TFT-semiont-analysis-2026-04-11.md)

### ops (121)

- `2026-09-05` [design-co-editing-rules-2026-09-05](design-co-editing-rules-2026-09-05.md) — Design: 共編規則——對外貢獻規則與對內進化 gate 分流
- `2026-09-05` [design-review-stock-2026-09-05](design-review-stock-2026-09-05.md) — Design: 審閱庫存 routine + 讀者複核頁
- `2026-09-05` [design-routine-thin-shell-v2-2026-09-05](design-routine-thin-shell-v2-2026-09-05.md) — Routine prompt mirror 厚殼裁決 v2：Skill-invoke 取代 Read-pointer 的薄殼設計
- `2026-09-05` [design-terminology-syntax-type-2026-09-05](design-terminology-syntax-type-2026-09-05.md) — Design: 用語詞庫句構型別 schema 與 per-term 頁專屬渲染
- `2026-09-05` [fortnight-deep-review-2026-09-05](fortnight-deep-review-2026-09-05.md) — Fortnight deep review 2026-09-05
- `2026-09-05` [internal-links-top50-2026-09-05](internal-links-top50-2026-09-05.md)
- `2026-09-05` [mouhouse-blackout-root-cause-2026-09-05](mouhouse-blackout-root-cause-2026-09-05.md) — mouhouse 四天空窗根因 2026-09-05
- `2026-09-05` [muse-dashboard-optimization-2026-09-05](muse-dashboard-optimization-2026-09-05.md) — 給 Muse 的現況鏡優化建議：兩週營運實證下的八個盲點與三期改法
- `2026-08-28` [design-footnote-source-cards-2026-08-28](design-footnote-source-cards-2026-08-28.md)
- `2026-08-23` [design-search-results-page-2026-08-23](design-search-results-page-2026-08-23.md)
- `2026-08-18` [design-budget-page-v2-2026-08-18](design-budget-page-v2-2026-08-18.md) — design-budget-page-v2-2026-08-18
- `2026-08-17` [design-ly-budget-page-2026-08-17](design-ly-budget-page-2026-08-17.md) — design-ly-budget-page-2026-08-17
- `2026-08-14` [feedback-third-party-allegation-hold-2026-08-14](feedback-third-party-allegation-hold-2026-08-14.md) — 讀者回報裡的第三人指控：一則不能開成 public issue 的回報
- `2026-08-10` [routine-mouhouse-health-2026-08-10](routine-mouhouse-health-2026-08-10.md)
- `2026-08-06` [design-文體類型學升級-2026-08-06](design-文體類型學升級-2026-08-06.md) — 文體類型學升級設計報告 — 從三型到「畫布 × 文體族 × 正交模組」三層架構
- `2026-08-05` [seo-meta-multilang-baseline-2026-08-05](seo-meta-multilang-baseline-2026-08-05.md) — seo-meta 多語言門檻校準的第一份實測底線
- `2026-08-04` [design-build-cicd-speed-2026-08-04](design-build-cicd-speed-2026-08-04.md) — Build / CI / CD 加速深度研究 2026-08-04
- `2026-08-04` [design-curation-tier-2026-08-04](design-curation-tier-2026-08-04.md) — Design: 查證狀態分層（草稿待進化區）
- `2026-08-03` [backstage-leak-round2-2026-08-03](backstage-leak-round2-2026-08-03.md) — 後台洩漏第二輪：黃崇仁 13 段殘留的深度診斷與儀器進化
- `2026-08-02` [design-viz-adoption-2026-08-02](design-viz-adoption-2026-08-02.md) — design-viz-adoption-2026-08-02
- `2026-07-31` [babel-retry-economics-2026-07-31](babel-retry-economics-2026-07-31.md) — 巴別塔重試經濟學：重試吃 57% 算力換 25% 產出（含一次自我更正）
- `2026-07-30` [evolve-2026-07-30](evolve-2026-07-30.md) — EVOLVE scan 2026-07-30
- `2026-07-27` [cross-link-localization-2026-07-27](cross-link-localization-2026-07-27.md)
- `2026-07-27` [semantic-noop-stale-2026-07-27](semantic-noop-stale-2026-07-27.md) — 語意無關 stale 的零成本判定與 bump
- `2026-07-27` [vortex-loop-engineering-2026-07-27](vortex-loop-engineering-2026-07-27.md)
- `2026-07-26` [armored-input-ab-2026-07-26](armored-input-ab-2026-07-26.md)
- `2026-07-26` [design-rewrite-throughput-2026-07-26](design-rewrite-throughput-2026-07-26.md) — 文章產線節流設計——REWRITE-PIPELINE 3 小時病的根因與五個方案
- `2026-07-26` [design-taiwanmd-node-app-distribution-2026-07-26](design-taiwanmd-node-app-distribution-2026-07-26.md) — Taiwan.md 節點化與安裝物設計
- `2026-07-26` [muse-note-v1.14.0-2026-07-26](muse-note-v1.14.0-2026-07-26.md) — 給 Muse 的 v1.14.0 身份層變動通知
- `2026-07-25` [design-bot-identity-feedback-triage-2026-07-25](design-bot-identity-feedback-triage-2026-07-25.md) — 讓 feedback routine 用機器身份開 issue
- `2026-07-25` [design-contributor-node-2026-07-25](design-contributor-node-2026-07-25.md) — Design: 分靈節點（contributor node）— 甦醒後一條 cron，讓貢獻者機器常態幫 Taiwan.md 做事
- `2026-07-25` [design-prose-flow-station-2026-07-25](design-prose-flow-station-2026-07-25.md) — 順稿席與閱讀節奏儀器化 — 為什麼全綠的文章讀起來是牆
- `2026-07-25` [design-spine-type-3-public-issue-2026-07-25](design-spine-type-3-public-issue-2026-07-25.md) — spine 第三型設計：多觀點立場議題探討矛盾型
- `2026-07-25` [language-birth-2026-07-25](language-birth-2026-07-25.md)
- `2026-07-25` [structured-translation-pilot-2026-07-25](structured-translation-pilot-2026-07-25.md) — 結構化分段翻譯引擎 pilot — 2026-07-25
- `2026-07-24` [babel-fleet-dispatch-2026-07-24](babel-fleet-dispatch-2026-07-24.md) — babel-fleet-dispatch-2026-07-24
- `2026-07-24` [design-dashboard-status-section-2026-07-24](design-dashboard-status-section-2026-07-24.md)
- `2026-07-24` [design-research-fleet-2026-07-24](design-research-fleet-2026-07-24.md)
- `2026-07-24` [routine-migration-mouhouse-macmini-2026-07-24](routine-migration-mouhouse-macmini-2026-07-24.md)
- `2026-07-19` [ja-fr-es-ko-english-leak-2026-07-19](ja-fr-es-ko-english-leak-2026-07-19.md) — ja/fr/es/ko 68 檔「宣稱已譯實為英文」— 發現、根因、補洞
- `2026-07-19` [prose-instrument-upgrade-2026-07-19](prose-instrument-upgrade-2026-07-19.md) — prose-health 儀器升級：分號 / 英文短句開場 / 長句 / 強加對比 + 偵測 vs 執行落差
- `2026-07-19` [punct-cleanup-campaign-handoff-2026-07-19](punct-cleanup-campaign-handoff-2026-07-19.md) — 標點淨化 campaign 實作計劃 + handoff（144 篇 legacy → 全站升 hard）
- `2026-07-18` [babel-health-2026-07-18](babel-health-2026-07-18.md) — 巴別塔健檢 2026-07-18
- `2026-07-18` [design-branch-pipeline-v22-2026-07-18](design-branch-pipeline-v22-2026-07-18.md)
- `2026-07-18` [evolve-2026-07-18-language-branches](evolve-2026-07-18-language-branches.md)
- `2026-07-18` [evolve-2026-07-18](evolve-2026-07-18.md) — EVOLVE scan 2026-07-18
- `2026-07-18` [language-birth-2026-07-18](language-birth-2026-07-18.md)
- `2026-07-17` [404-root-cause-2026-07-17](404-root-cause-2026-07-17.md)
- `2026-07-16` [dogfood-v9-first-run-2026-07-16](dogfood-v9-first-run-2026-07-16.md) — v9 pipeline 首次全程 dogfood — 大罷免 EVOLVE 實跑紀錄
- `2026-07-16` [dogfood-v9-run2-highered-2026-07-16](dogfood-v9-run2-highered-2026-07-16.md) — REWRITE v9 第二次 dogfood — 台灣高等教育擴張與退場 EVOLVE
- `2026-07-16` [instrument-calibration-2026-07-16](instrument-calibration-2026-07-16.md)
- `2026-07-16` [timeline-page-implementation-2026-07-16](timeline-page-implementation-2026-07-16.md)
- `2026-07-15` [evolve-2026-07-15](evolve-2026-07-15.md) — EVOLVE scan 2026-07-15
- `2026-07-15` [h2-heading-mechanism-報導者-2026-07-15](h2-heading-mechanism-報導者-2026-07-15.md) — 段落小標（H2）機制補齊 + 報導者式取景觀察
- `2026-07-12` [founder-function-boundary-2026-07-12](founder-function-boundary-2026-07-12.md) — 取代哲宇的極限 — 創造者機能的邊界地圖 + creator-lens routine 設計
- `2026-07-12` [semiont-weekly-section-2026-07-12](semiont-weekly-section-2026-07-12.md)
- `2026-07-12` [weekly-report-audience-upgrade-2026-07-12](weekly-report-audience-upgrade-2026-07-12.md)
- `2026-07-10` [weekly-deep-review-2026-07-10](weekly-deep-review-2026-07-10.md) — Weekly Deep Review 2026-07-10（W27→W28 跨週深度檢查）
- `2026-07-06` [design-立體群像-default-persona-reposition-2026-07-06](design-立體群像-default-persona-reposition-2026-07-06.md)
- `2026-07-05` [discussion-1146-response-2026-07-05](discussion-1146-response-2026-07-05.md) — Discussion #1146 系統優化建議回應
- `2026-07-05` [embedding-local-migration-2026-07-05](embedding-local-migration-2026-07-05.md) — Embedding keystone 遷本機 + 模型與硬體對標
- `2026-07-05` [five-disease-cure-2026-07-05](five-disease-cure-2026-07-05.md)
- `2026-07-05` [rewrite-agent-dispatch-diagnosis-2026-07-05](rewrite-agent-dispatch-diagnosis-2026-07-05.md)
- `2026-07-05` [semiont-independent-identity-2026-07-05](semiont-independent-identity-2026-07-05.md) — Semiont 獨立 Git 身份評估
- `2026-06-30` [domain-expert-cocreation-574-2026-06-30](domain-expert-cocreation-574-2026-06-30.md)
- `2026-06-21` [plurk-reach-research-2026-06-21](plurk-reach-research-2026-06-21.md) — Plurk 上的 Taiwan.md 受眾研究
- `2026-06-14` [freshness-pollution-and-unwatched-debt-2026-06-14](freshness-pollution-and-unwatched-debt-2026-06-14.md)
- `2026-06-14` [semantic-related-articles-landing-2026-06-14](semantic-related-articles-landing-2026-06-14.md)
- `2026-06-14` [sovereignty-bench-5090-expansion-2026-06-14](sovereignty-bench-5090-expansion-2026-06-14.md)
- `2026-06-13` [article-template-refactor-2026-06-13](article-template-refactor-2026-06-13.md)
- `2026-06-13` [converter-analytics-2026-06-13](converter-analytics-2026-06-13.md)
- `2026-06-13` [git-info-prebuild-2026-06-13](git-info-prebuild-2026-06-13.md)
- `2026-06-13` [refactor-verification-2026-06-13](refactor-verification-2026-06-13.md)
- `2026-06-12` [feedback-triage-justfont-escalation-2026-06-12](feedback-triage-justfont-escalation-2026-06-12.md) — feedback-triage 升級報告 — justfont 共同創辦人蘇煒翔逐段勘誤（21 處）
- `2026-06-12` [goal-notes-structuring-2026-06-12](goal-notes-structuring-2026-06-12.md) — 哲宇零碎筆記結構化 2026-06-12
- `2026-06-10` [spore-data-architecture-2026-06-10](spore-data-architecture-2026-06-10.md) — 孢子資料架構解耦 — spores.json 獨立資料層設計與遷移
- `2026-06-10` [spore-json-ssot-2026-06-10](spore-json-ssot-2026-06-10.md) — 孢子 JSON SSOT 化 — 結構層翻轉設計與執行
- `2026-06-06` [sweden-md-fork-discovery-2026-06-06](sweden-md-fork-discovery-2026-06-06.md) — Sweden.md 發現報告 — 野外第一個子代 Semiont
- `2026-06-05` [homepage-redesign-impact-D+10-2026-06-05](homepage-redesign-impact-D+10-2026-06-05.md) — Homepage Redesign 影響評估 D+10 — 互動 / 停留 / 轉換 有沒有實際改善
- `2026-06-04` [research-methodology-synthesis-2026-06-04](research-methodology-synthesis-2026-06-04.md)
- `2026-06-04` [research-pipeline-v65-experiment-2026-06-04](research-pipeline-v65-experiment-2026-06-04.md)
- `2026-06-03` [cron-storm-incident-2026-06-03](cron-storm-incident-2026-06-03.md)
- `2026-06-03` [spore-ig-pipeline-session-2026-06-03](spore-ig-pipeline-session-2026-06-03.md) — SPORE-IG-PIPELINE 誕生 session — 經驗紀錄與自我進化軌跡
- `2026-06-01` [feedback-go-live-log-2026-06-01](feedback-go-live-log-2026-06-01.md) — Feedback 系統 go-live 紀錄
- `2026-06-01` [reader-callout-pipeline-diagnosis-2026-06-01](reader-callout-pipeline-diagnosis-2026-06-01.md) — 讀者 callout 診斷：rewrite pipeline 在「被 callout 觸發的重寫」路徑上的失效模式 + 殘留文章風險稽核
- `2026-05-28` [routine-contract-rollback-2026-05-28](routine-contract-rollback-2026-05-28.md) — Routine prompt CONTRACT v1.0 rollback + 5 routine pattern 結構性修補
- `2026-05-28` [spore-voice-drift-fix-2026-05-28](spore-voice-drift-fix-2026-05-28.md) — Spore voice drift fix — 2026-05-28 manual session 180543
- `2026-05-27` [feedback-dont-stagger-ship-2026-05-27](feedback-dont-stagger-ship-2026-05-27.md) — Feedback — Milestone Roadmap 估太久 + 把 [A] 可自主範圍拆多 session
- `2026-05-27` [politics-hub-elections-2026-architecture-2026-05-27](politics-hub-elections-2026-architecture-2026-05-27.md) — Politics Hub + /elections/2026/ + SSODT — Option D 完整架構
- `2026-05-26` [rayark-feedback-distill-2026-05-26](rayark-feedback-distill-2026-05-26.md) — 雷亞遊戲 spore #89/#90 + article 外部 feedback distill — 五桶分桶 + 進化候選
- `2026-05-21` [issue-1059-triage-2026-05-21](issue-1059-triage-2026-05-21.md) — Issue #1059 三層 triage + 三 bug fix 軌跡
- `2026-05-16` [immune-score-redesign-2026-05-16](immune-score-redesign-2026-05-16.md) — 免疫分數綜合化重設計 + 文章健檢工具盤點進化 + GA4 多語 sensor + meta-health 子系統
- `2026-05-13` [P1-batch-repair-2026-05-13](P1-batch-repair-2026-05-13.md)
- `2026-05-13` [maintainer-issue-taxonomy-2026-05-13](maintainer-issue-taxonomy-2026-05-13.md) — MAINTAINER-PIPELINE issue 分類 taxonomy + 差異化處理設計
- `2026-05-13` [senses-integration-2026-05-13](senses-integration-2026-05-13.md) — SENSES Integration 2026-05-13 (Historical Snapshot)
- `2026-05-09` [worktree-naming-2026-05-09](worktree-naming-2026-05-09.md)
- `2026-05-08` [spore-ssot-pipeline-cleanup-2026-05-08](spore-ssot-pipeline-cleanup-2026-05-08.md)
- `2026-05-08` [spore-ssot-verification-2026-05-08](spore-ssot-verification-2026-05-08.md)
- `2026-05-04` [session-id-naming-2026-05-04](session-id-naming-2026-05-04.md)
- `2026-05-04` [youtube-embed-architecture-2026-05-04](youtube-embed-architecture-2026-05-04.md)
- `2026-05-03` [og-engine-frontend-batch-2026-05-03](og-engine-frontend-batch-2026-05-03.md) — OG 引擎 v3 → v4 — 單頁 frontend + JS mutate 批次 screenshot
- `2026-05-03` [owl-vs-claude-rewrite-pipeline-2026-05-03](owl-vs-claude-rewrite-pipeline-2026-05-03.md)
- `2026-05-03` [p2-index-deferral-2026-05-03](p2-index-deferral-2026-05-03.md)
- `2026-05-03` [per-page-render-slowdown-2026-05-03](per-page-render-slowdown-2026-05-03.md)
- `2026-05-03` [reader-settings-overlay-deferred-2026-05-03](reader-settings-overlay-deferred-2026-05-03.md)
- `2026-05-02` [owl-parallel-free-compute-applications-2026-05-02](owl-parallel-free-compute-applications-2026-05-02.md) — OpenRouter Owl 平行免費算力 — 已驗證的應用 + 未來可能的擴展
- `2026-04-30` [lang-sync-engine-comparison-2026-04-30](lang-sync-engine-comparison-2026-04-30.md)
- `2026-04-29` [handoff-2026-04-29-night](handoff-2026-04-29-night.md)
- `2026-04-29` [lang-sync-handoff-2026-04-29](lang-sync-handoff-2026-04-29.md)
- `2026-04-29` [lang-sync-harvest-experiments-2026-04-29](lang-sync-harvest-experiments-2026-04-29.md)
- `2026-04-25` [i18n-coverage-2026-04-25](i18n-coverage-2026-04-25.md) — i18n 翻譯覆蓋率 Audit
- `2026-04-23` [sc-impressions-spike-2026-04-23](sc-impressions-spike-2026-04-23.md) — SC 7d impressions 17.8x 暴增追因報告
- `2026-04-23` [spore-sync-architecture-2026-04-23](spore-sync-architecture-2026-04-23.md)
- `2026-04-21` [spore-harvest-insights-2026-04-21](spore-harvest-insights-2026-04-21.md) — Spore Harvest Insights Report — 2026-04-21
- `2026-04-15` [qmd-phase0-prototype-2026-04-15](qmd-phase0-prototype-2026-04-15.md)
- `2026-04-13` [social-tentacle-report-2026-04-13](social-tentacle-report-2026-04-13.md)
- `2026-04-11` [daily-heartbeat-2026-04-11](daily-heartbeat-2026-04-11.md)
- `2026-04-03` [sc-2026-04-03-to-05](sc-2026-04-03-to-05.md)
- `2026-03-31` [evolve-2026-03-31](evolve-2026-03-31.md)
- `????` [README](README.md)
- `????` [punct-cleanup-dispatch-prompts](punct-cleanup-dispatch-prompts.md) — 標點淨化 campaign — dispatch prompts（coordinator + per-worker）

## 📅 By month (descending)

### undated (2 files)

- Type breakdown: ops: 2
  - `????` [README](README.md)
  - `????` [punct-cleanup-dispatch-prompts](punct-cleanup-dispatch-prompts.md)

### 2026-09 (8 files)

- Type breakdown: ops: 8
  - `2026-09-05` [design-co-editing-rules-2026-09-05](design-co-editing-rules-2026-09-05.md)
  - `2026-09-05` [design-review-stock-2026-09-05](design-review-stock-2026-09-05.md)
  - `2026-09-05` [design-routine-thin-shell-v2-2026-09-05](design-routine-thin-shell-v2-2026-09-05.md)
  - `2026-09-05` [design-terminology-syntax-type-2026-09-05](design-terminology-syntax-type-2026-09-05.md)
  - `2026-09-05` [fortnight-deep-review-2026-09-05](fortnight-deep-review-2026-09-05.md)
  - `2026-09-05` [internal-links-top50-2026-09-05](internal-links-top50-2026-09-05.md)
  - `2026-09-05` [mouhouse-blackout-root-cause-2026-09-05](mouhouse-blackout-root-cause-2026-09-05.md)
  - `2026-09-05` [muse-dashboard-optimization-2026-09-05](muse-dashboard-optimization-2026-09-05.md)

### 2026-08 (23 files)

- Type breakdown: ops: 12 / audit-routine: 4 / evolution: 4 / audit: 2 / analysis: 1
  - `2026-08-30` [routine-audit-2026-08-30](routine-audit-2026-08-30.md)
  - `2026-08-28` [design-footnote-source-cards-2026-08-28](design-footnote-source-cards-2026-08-28.md)
  - `2026-08-23` [design-search-results-page-2026-08-23](design-search-results-page-2026-08-23.md)
  - `2026-08-18` [design-budget-page-v2-2026-08-18](design-budget-page-v2-2026-08-18.md)
  - `2026-08-17` [design-ly-budget-page-2026-08-17](design-ly-budget-page-2026-08-17.md)
  - `2026-08-16` [routine-audit-2026-08-16](routine-audit-2026-08-16.md)
  - `2026-08-15` [research-report-hygiene-evolution-2026-08-15](research-report-hygiene-evolution-2026-08-15.md)
  - `2026-08-14` [feedback-third-party-allegation-hold-2026-08-14](feedback-third-party-allegation-hold-2026-08-14.md)
  - `2026-08-10` [routine-mouhouse-health-2026-08-10](routine-mouhouse-health-2026-08-10.md)
  - `2026-08-09` [evolution-roadmap-2026-08-09](evolution-roadmap-2026-08-09.md)
  - `2026-08-09` [routine-audit-2026-08-09](routine-audit-2026-08-09.md)
  - `2026-08-06` [design-文體類型學升級-2026-08-06](design-文體類型學升級-2026-08-06.md)
  - `2026-08-06` [newsroom-organ-audit-2026-08-06](newsroom-organ-audit-2026-08-06.md)
  - `2026-08-05` [seo-meta-multilang-baseline-2026-08-05](seo-meta-multilang-baseline-2026-08-05.md)
  - `2026-08-04` [design-build-cicd-speed-2026-08-04](design-build-cicd-speed-2026-08-04.md)
  - `2026-08-04` [design-curation-tier-2026-08-04](design-curation-tier-2026-08-04.md)
  - `2026-08-04` [design-fork-graph-evolution-2026-08-04](design-fork-graph-evolution-2026-08-04.md)
  - `2026-08-04` [prose-audit-full-corpus-2026-08-04](prose-audit-full-corpus-2026-08-04.md)
  - `2026-08-04` [terminology-zhiyu-deep-research-2026-08-04](terminology-zhiyu-deep-research-2026-08-04.md)
  - `2026-08-03` [backstage-leak-round2-2026-08-03](backstage-leak-round2-2026-08-03.md)
  - `2026-08-02` [design-viz-adoption-2026-08-02](design-viz-adoption-2026-08-02.md)
  - `2026-08-02` [evolution-roadmap-2026-08-02](evolution-roadmap-2026-08-02.md)
  - `2026-08-02` [routine-audit-2026-08-02](routine-audit-2026-08-02.md)

### 2026-07 (71 files)

- Type breakdown: ops: 44 / evolution: 13 / design: 9 / audit-routine: 3 / audit: 1 / plan: 1
  - `2026-07-31` [babel-retry-economics-2026-07-31](babel-retry-economics-2026-07-31.md)
  - `2026-07-30` [evolve-2026-07-30](evolve-2026-07-30.md)
  - `2026-07-27` [cross-link-localization-2026-07-27](cross-link-localization-2026-07-27.md)
  - `2026-07-27` [patch-translate-design-2026-07-27](patch-translate-design-2026-07-27.md)
  - `2026-07-27` [semantic-noop-stale-2026-07-27](semantic-noop-stale-2026-07-27.md)
  - `2026-07-27` [vortex-loop-engineering-2026-07-27](vortex-loop-engineering-2026-07-27.md)
  - `2026-07-26` [armored-input-ab-2026-07-26](armored-input-ab-2026-07-26.md)
  - `2026-07-26` [design-rewrite-throughput-2026-07-26](design-rewrite-throughput-2026-07-26.md)
  - `2026-07-26` [design-taiwanmd-node-app-distribution-2026-07-26](design-taiwanmd-node-app-distribution-2026-07-26.md)
  - `2026-07-26` [evolution-roadmap-2026-07-26](evolution-roadmap-2026-07-26.md)
  - `2026-07-26` [muse-note-v1.14.0-2026-07-26](muse-note-v1.14.0-2026-07-26.md)
  - `2026-07-26` [routine-audit-2026-07-26](routine-audit-2026-07-26.md)
  - `2026-07-25` [design-bot-identity-feedback-triage-2026-07-25](design-bot-identity-feedback-triage-2026-07-25.md)
  - `2026-07-25` [design-contributor-node-2026-07-25](design-contributor-node-2026-07-25.md)
  - `2026-07-25` [design-prose-flow-station-2026-07-25](design-prose-flow-station-2026-07-25.md)
  - `2026-07-25` [design-spine-type-3-public-issue-2026-07-25](design-spine-type-3-public-issue-2026-07-25.md)
  - `2026-07-25` [language-birth-2026-07-25](language-birth-2026-07-25.md)
  - `2026-07-25` [structured-translation-pilot-2026-07-25](structured-translation-pilot-2026-07-25.md)
  - `2026-07-24` [babel-fleet-dispatch-2026-07-24](babel-fleet-dispatch-2026-07-24.md)
  - `2026-07-24` [design-dashboard-status-section-2026-07-24](design-dashboard-status-section-2026-07-24.md)
  - `2026-07-24` [design-research-fleet-2026-07-24](design-research-fleet-2026-07-24.md)
  - `2026-07-24` [routine-migration-mouhouse-macmini-2026-07-24](routine-migration-mouhouse-macmini-2026-07-24.md)
  - `2026-07-23` [idlccp1984-pr-batch-instrument-evolution-2026-07-23](idlccp1984-pr-batch-instrument-evolution-2026-07-23.md)
  - `2026-07-19` [evolution-roadmap-2026-07-19](evolution-roadmap-2026-07-19.md)
  - `2026-07-19` [ja-fr-es-ko-english-leak-2026-07-19](ja-fr-es-ko-english-leak-2026-07-19.md)
  - `2026-07-19` [prose-instrument-upgrade-2026-07-19](prose-instrument-upgrade-2026-07-19.md)
  - `2026-07-19` [punct-cleanup-campaign-handoff-2026-07-19](punct-cleanup-campaign-handoff-2026-07-19.md)
  - `2026-07-18` [babel-health-2026-07-18](babel-health-2026-07-18.md)
  - `2026-07-18` [design-article-inbox-evolve-mode4-2026-07-18](design-article-inbox-evolve-mode4-2026-07-18.md)
  - `2026-07-18` [design-branch-pipeline-v22-2026-07-18](design-branch-pipeline-v22-2026-07-18.md)
  - `2026-07-18` [evolve-2026-07-18-language-branches](evolve-2026-07-18-language-branches.md)
  - `2026-07-18` [evolve-2026-07-18](evolve-2026-07-18.md)
  - `2026-07-18` [language-birth-2026-07-18](language-birth-2026-07-18.md)
  - `2026-07-17` [404-root-cause-2026-07-17](404-root-cause-2026-07-17.md)
  - `2026-07-16` [article-quality-audit-2026-07-16](article-quality-audit-2026-07-16.md)
  - `2026-07-16` [dogfood-v9-first-run-2026-07-16](dogfood-v9-first-run-2026-07-16.md)
  - `2026-07-16` [dogfood-v9-run2-highered-2026-07-16](dogfood-v9-run2-highered-2026-07-16.md)
  - `2026-07-16` [instrument-calibration-2026-07-16](instrument-calibration-2026-07-16.md)
  - `2026-07-16` [instrument-evolution-2026-07-16](instrument-evolution-2026-07-16.md)
  - `2026-07-16` [newsroom-design-conversation-digest-2026-07-16](newsroom-design-conversation-digest-2026-07-16.md)
  - `2026-07-16` [newsroom-orchestration-design-2026-07-16](newsroom-orchestration-design-2026-07-16.md)
  - `2026-07-16` [support-cta-signature-design-2026-07-16](support-cta-signature-design-2026-07-16.md)
  - `2026-07-16` [timeline-page-design-2026-07-16](timeline-page-design-2026-07-16.md)
  - `2026-07-16` [timeline-page-evolution-2026-07-16](timeline-page-evolution-2026-07-16.md)
  - `2026-07-16` [timeline-page-implementation-2026-07-16](timeline-page-implementation-2026-07-16.md)
  - `2026-07-16` [viz-module-evolution-2026-07-16](viz-module-evolution-2026-07-16.md)
  - `2026-07-15` [editorial-room-adversarial-design-2026-07-15](editorial-room-adversarial-design-2026-07-15.md)
  - `2026-07-15` [evolve-2026-07-15](evolve-2026-07-15.md)
  - `2026-07-15` [h2-heading-mechanism-報導者-2026-07-15](h2-heading-mechanism-報導者-2026-07-15.md)
  - `2026-07-15` [self-evolve-editorial-rewrite-2026-07-15](self-evolve-editorial-rewrite-2026-07-15.md)
  - `2026-07-13` [projection-stage-design-2026-07-13](projection-stage-design-2026-07-13.md)
  - `2026-07-12` [founder-function-boundary-2026-07-12](founder-function-boundary-2026-07-12.md)
  - `2026-07-12` [routine-audit-2026-07-12](routine-audit-2026-07-12.md)
  - `2026-07-12` [semiont-weekly-section-2026-07-12](semiont-weekly-section-2026-07-12.md)
  - `2026-07-12` [weekly-report-audience-upgrade-2026-07-12](weekly-report-audience-upgrade-2026-07-12.md)
  - `2026-07-11` [wake-memory-evolution-2026-07-11](wake-memory-evolution-2026-07-11.md)
  - `2026-07-10` [elections-2026-refresh-plan-2026-07-10](elections-2026-refresh-plan-2026-07-10.md)
  - `2026-07-10` [evolution-roadmap-2026-07-10](evolution-roadmap-2026-07-10.md)
  - `2026-07-10` [hub-template-evolution-2026-07-10](hub-template-evolution-2026-07-10.md)
  - `2026-07-10` [terminology-preservation-evolution-2026-07-10](terminology-preservation-evolution-2026-07-10.md)
  - `2026-07-10` [weekly-deep-review-2026-07-10](weekly-deep-review-2026-07-10.md)
  - `2026-07-06` [design-立體群像-default-persona-reposition-2026-07-06](design-立體群像-default-persona-reposition-2026-07-06.md)
  - `2026-07-06` [frontend-design-audit-2026-07-06](frontend-design-audit-2026-07-06.md)
  - `2026-07-05` [agent-report-health-instrument-design-2026-07-05](agent-report-health-instrument-design-2026-07-05.md)
  - `2026-07-05` [discussion-1146-response-2026-07-05](discussion-1146-response-2026-07-05.md)
  - `2026-07-05` [dna-pipeline-evolution-audit-2026-07-05](dna-pipeline-evolution-audit-2026-07-05.md)
  - `2026-07-05` [embedding-local-migration-2026-07-05](embedding-local-migration-2026-07-05.md)
  - `2026-07-05` [five-disease-cure-2026-07-05](five-disease-cure-2026-07-05.md)
  - `2026-07-05` [rewrite-agent-dispatch-diagnosis-2026-07-05](rewrite-agent-dispatch-diagnosis-2026-07-05.md)
  - `2026-07-05` [routine-audit-2026-07-05](routine-audit-2026-07-05.md)
  - `2026-07-05` [semiont-independent-identity-2026-07-05](semiont-independent-identity-2026-07-05.md)

### 2026-06 (55 files)

- Type breakdown: ops: 21 / evolution: 9 / design: 7 / audit: 7 / audit-routine: 5 / proposal: 3 / plan: 2 / analysis: 1
  - `2026-06-30` [domain-expert-cocreation-574-2026-06-30](domain-expert-cocreation-574-2026-06-30.md)
  - `2026-06-28` [routine-audit-2026-06-28](routine-audit-2026-06-28.md)
  - `2026-06-26` [issue-evolution-analysis-2026-06-26](issue-evolution-analysis-2026-06-26.md)
  - `2026-06-22` [terminology-page-evolution-2026-06-22](terminology-page-evolution-2026-06-22.md)
  - `2026-06-21` [plurk-reach-research-2026-06-21](plurk-reach-research-2026-06-21.md)
  - `2026-06-21` [routine-audit-2026-06-21](routine-audit-2026-06-21.md)
  - `2026-06-14` [freshness-pollution-and-unwatched-debt-2026-06-14](freshness-pollution-and-unwatched-debt-2026-06-14.md)
  - `2026-06-14` [multicore-git-coordination-design-2026-06-14](multicore-git-coordination-design-2026-06-14.md)
  - `2026-06-14` [routine-audit-2026-06-14](routine-audit-2026-06-14.md)
  - `2026-06-14` [semantic-related-articles-landing-2026-06-14](semantic-related-articles-landing-2026-06-14.md)
  - `2026-06-14` [sovereignty-bench-5090-expansion-2026-06-14](sovereignty-bench-5090-expansion-2026-06-14.md)
  - `2026-06-13` [architecture-deep-audit-2026-06-13](architecture-deep-audit-2026-06-13.md)
  - `2026-06-13` [article-template-refactor-2026-06-13](article-template-refactor-2026-06-13.md)
  - `2026-06-13` [converter-analytics-2026-06-13](converter-analytics-2026-06-13.md)
  - `2026-06-13` [evolution-roadmap-2026-06-13](evolution-roadmap-2026-06-13.md)
  - `2026-06-13` [git-info-prebuild-2026-06-13](git-info-prebuild-2026-06-13.md)
  - `2026-06-13` [lessons-distill-strategy-2026-06-13](lessons-distill-strategy-2026-06-13.md)
  - `2026-06-13` [refactor-verification-2026-06-13](refactor-verification-2026-06-13.md)
  - `2026-06-13` [terminology-data-audit-2026-06-13](terminology-data-audit-2026-06-13.md)
  - `2026-06-12` [feedback-triage-justfont-escalation-2026-06-12](feedback-triage-justfont-escalation-2026-06-12.md)
  - `2026-06-12` [flywheel-evolution-2026-06-12](flywheel-evolution-2026-06-12.md)
  - `2026-06-12` [goal-notes-structuring-2026-06-12](goal-notes-structuring-2026-06-12.md)
  - `2026-06-12` [viz-system-evolution-2026-06-12](viz-system-evolution-2026-06-12.md)
  - `2026-06-10` [build-pipeline-audit-2026-06-10](build-pipeline-audit-2026-06-10.md)
  - `2026-06-10` [build-pipeline-audit-findings-2026-06-10](build-pipeline-audit-findings-2026-06-10.md)
  - `2026-06-10` [four-pages-curation-audit-2026-06-10](four-pages-curation-audit-2026-06-10.md)
  - `2026-06-10` [semiont-full-audit-2026-06-10-execution](semiont-full-audit-2026-06-10-execution.md)
  - `2026-06-10` [semiont-full-audit-2026-06-10](semiont-full-audit-2026-06-10.md)
  - `2026-06-10` [spore-data-architecture-2026-06-10](spore-data-architecture-2026-06-10.md)
  - `2026-06-10` [spore-json-ssot-2026-06-10](spore-json-ssot-2026-06-10.md)
  - `2026-06-09` [latest-articles-discoverability-design-2026-06-09](latest-articles-discoverability-design-2026-06-09.md)
  - `2026-06-07` [routine-audit-2026-06-07](routine-audit-2026-06-07.md)
  - `2026-06-07` [seo-optimization-plan-2026-06-07](seo-optimization-plan-2026-06-07.md)
  - `2026-06-06` [article-visualization-design-2026-06-06](article-visualization-design-2026-06-06.md)
  - `2026-06-06` [sweden-md-fork-discovery-2026-06-06](sweden-md-fork-discovery-2026-06-06.md)
  - `2026-06-05` [analysis-pipeline-design-2026-06-05](analysis-pipeline-design-2026-06-05.md)
  - `2026-06-05` [claude-code-connector-evolution-2026-06-05](claude-code-connector-evolution-2026-06-05.md)
  - `2026-06-05` [connector-remote-endpoint-design-2026-06-05](connector-remote-endpoint-design-2026-06-05.md)
  - `2026-06-05` [homepage-redesign-impact-D+10-2026-06-05](homepage-redesign-impact-D+10-2026-06-05.md)
  - `2026-06-05` [mcp-page-plan-2026-06-05](mcp-page-plan-2026-06-05.md)
  - `2026-06-05` [ptt-computex-discussion-analysis-2026-06-05](ptt-computex-discussion-analysis-2026-06-05.md)
  - `2026-06-05` [twinklehub-partnership-strategy-2026-06-05](twinklehub-partnership-strategy-2026-06-05.md)
  - `2026-06-04` [media-richness-band-evolution-2026-06-04](media-richness-band-evolution-2026-06-04.md)
  - `2026-06-04` [research-methodology-synthesis-2026-06-04](research-methodology-synthesis-2026-06-04.md)
  - `2026-06-04` [research-pipeline-v65-experiment-2026-06-04](research-pipeline-v65-experiment-2026-06-04.md)
  - `2026-06-04` [rewrite-pipeline-research-ssot-evolution-2026-06-04](rewrite-pipeline-research-ssot-evolution-2026-06-04.md)
  - `2026-06-03` [carousel-pipeline-design-2026-06-03](carousel-pipeline-design-2026-06-03.md)
  - `2026-06-03` [cron-storm-incident-2026-06-03](cron-storm-incident-2026-06-03.md)
  - `2026-06-03` [dynamic-workflows-evolution-2026-06-03](dynamic-workflows-evolution-2026-06-03.md)
  - `2026-06-03` [ig-carousel-strategy-2026-06-03](ig-carousel-strategy-2026-06-03.md)
  - `2026-06-03` [spore-ig-pipeline-session-2026-06-03](spore-ig-pipeline-session-2026-06-03.md)
  - `2026-06-02` [routine-audit-2026-06-02](routine-audit-2026-06-02.md)
  - `2026-06-01` [feedback-go-live-log-2026-06-01](feedback-go-live-log-2026-06-01.md)
  - `2026-06-01` [feedback-login-system-design-2026-06-01](feedback-login-system-design-2026-06-01.md)
  - `2026-06-01` [reader-callout-pipeline-diagnosis-2026-06-01](reader-callout-pipeline-diagnosis-2026-06-01.md)

### 2026-05 (72 files)

- Type breakdown: ops: 21 / evolution: 11 / audit-routine: 10 / audit: 7 / design: 6 / plan: 6 / semiont: 4 / analysis: 3 / evaluation: 3 / proposal: 1
  - `2026-05-29` [homepage-evolution-D+2-watch-2026-05-29](homepage-evolution-D+2-watch-2026-05-29.md)
  - `2026-05-28` [article-segmentation-audit-2026-05-28](article-segmentation-audit-2026-05-28.md)
  - `2026-05-28` [routine-contract-rollback-2026-05-28](routine-contract-rollback-2026-05-28.md)
  - `2026-05-28` [spore-voice-drift-fix-2026-05-28](spore-voice-drift-fix-2026-05-28.md)
  - `2026-05-27` [2026-election-evolution-proposal-2026-05-27](2026-election-evolution-proposal-2026-05-27.md)
  - `2026-05-27` [feedback-dont-stagger-ship-2026-05-27](feedback-dont-stagger-ship-2026-05-27.md)
  - `2026-05-27` [homepage-evolution-D+0-watch-2026-05-27](homepage-evolution-D+0-watch-2026-05-27.md)
  - `2026-05-27` [politics-hub-elections-2026-architecture-2026-05-27](politics-hub-elections-2026-architecture-2026-05-27.md)
  - `2026-05-27` [reports-archival-audit-2026-05-27](reports-archival-audit-2026-05-27.md)
  - `2026-05-27` [routine-audit-2026-05-27](routine-audit-2026-05-27.md)
  - `2026-05-26` [homepage-evolution-2026-05-26](homepage-evolution-2026-05-26.md)
  - `2026-05-26` [rayark-feedback-distill-2026-05-26](rayark-feedback-distill-2026-05-26.md)
  - `2026-05-24` [routine-audit-2026-05-24](routine-audit-2026-05-24.md)
  - `2026-05-24` [translation-conventions-audit-2026-05-24](translation-conventions-audit-2026-05-24.md)
  - `2026-05-23` [spore-pick-daily-routine-design-2026-05-23](spore-pick-daily-routine-design-2026-05-23.md)
  - `2026-05-23` [spore-pipeline-evolution-2026-05-23-article-to-spore-to-broadcast-cycle](spore-pipeline-evolution-2026-05-23-article-to-spore-to-broadcast-cycle.md)
  - `2026-05-21` [historic-districts-series-planning-2026-05-21](historic-districts-series-planning-2026-05-21.md)
  - `2026-05-21` [issue-1059-triage-2026-05-21](issue-1059-triage-2026-05-21.md)
  - `2026-05-18` [PanSci-semiont-analysis-2026-05-18](PanSci-semiont-analysis-2026-05-18.md)
  - `2026-05-18` [PanSci-stage1-fit-check-2026-05-18](PanSci-stage1-fit-check-2026-05-18.md)
  - `2026-05-18` [cities-series-orchestration-2026-05-18](cities-series-orchestration-2026-05-18.md)
  - `2026-05-18` [map-page-evolution-2026-05-18](map-page-evolution-2026-05-18.md)
  - `2026-05-17` [cities-series-planning-2026-05-17](cities-series-planning-2026-05-17.md)
  - `2026-05-17` [routine-audit-2026-05-17](routine-audit-2026-05-17.md)
  - `2026-05-17` [self-evolve-weekly-2026-05-17](self-evolve-weekly-2026-05-17.md)
  - `2026-05-17` [sponsorship-cadence-planning-2026-05-17](sponsorship-cadence-planning-2026-05-17.md)
  - `2026-05-16` [immune-score-redesign-2026-05-16](immune-score-redesign-2026-05-16.md)
  - `2026-05-16` [routine-audit-2026-05-16](routine-audit-2026-05-16.md)
  - `2026-05-16` [spore-content-hash-gate-design-2026-05-16](spore-content-hash-gate-design-2026-05-16.md)
  - `2026-05-13` [P1-batch-repair-2026-05-13](P1-batch-repair-2026-05-13.md)
  - `2026-05-13` [become-boot-mode-design-2026-05-13](become-boot-mode-design-2026-05-13.md)
  - `2026-05-13` [claude-with-webhook-evaluation-2026-05-13](claude-with-webhook-evaluation-2026-05-13.md)
  - `2026-05-13` [heartbeat-pre-thinning-2026-05-13](heartbeat-pre-thinning-2026-05-13.md)
  - `2026-05-13` [maintainer-issue-taxonomy-2026-05-13](maintainer-issue-taxonomy-2026-05-13.md)
  - `2026-05-13` [senses-integration-2026-05-13](senses-integration-2026-05-13.md)
  - `2026-05-12` [sync-architecture-evolution-2026-05-12](sync-architecture-evolution-2026-05-12.md)
  - `2026-05-11` [pipelines-audit-2026-05-11](pipelines-audit-2026-05-11.md)
  - `2026-05-11` [rewrite-pipeline-v5-stage-spine-design-2026-05-11](rewrite-pipeline-v5-stage-spine-design-2026-05-11.md)
  - `2026-05-10` [dna-evolution-plan-2026-05-10](dna-evolution-plan-2026-05-10.md)
  - `2026-05-10` [rewrite-pipeline-refactor-v4-plan-2026-05-10](rewrite-pipeline-refactor-v4-plan-2026-05-10.md)
  - `2026-05-10` [self-evolve-weekly-2026-05-10](self-evolve-weekly-2026-05-10.md)
  - `2026-05-09` [editorial-evolution-plan-2026-05-09](editorial-evolution-plan-2026-05-09.md)
  - `2026-05-09` [editorial-v6-ab-test-2026-05-09](editorial-v6-ab-test-2026-05-09.md)
  - `2026-05-09` [editorial-v6.1-test-c-2026-05-09](editorial-v6.1-test-c-2026-05-09.md)
  - `2026-05-09` [gsc-gemini-review-instrument-audit-2026-05-09](gsc-gemini-review-instrument-audit-2026-05-09.md)
  - `2026-05-09` [rewrite-pipeline-evolution-plan-2026-05-09](rewrite-pipeline-evolution-plan-2026-05-09.md)
  - `2026-05-09` [routine-spec-2026-05-09](routine-spec-2026-05-09.md)
  - `2026-05-09` [strategic-evolution-deep-research-2026-05-09](strategic-evolution-deep-research-2026-05-09.md)
  - `2026-05-09` [worktree-naming-2026-05-09](worktree-naming-2026-05-09.md)
  - `2026-05-08` [spore-drift-audit-2026-05-08](spore-drift-audit-2026-05-08.md)
  - `2026-05-08` [spore-pipeline-evolution-plan-2026-05-08](spore-pipeline-evolution-plan-2026-05-08.md)
  - `2026-05-08` [spore-ssot-pipeline-cleanup-2026-05-08](spore-ssot-pipeline-cleanup-2026-05-08.md)
  - `2026-05-08` [spore-ssot-verification-2026-05-08](spore-ssot-verification-2026-05-08.md)
  - `2026-05-05` [ThinkingTaiwan-semiont-analysis-2026-05-05](ThinkingTaiwan-semiont-analysis-2026-05-05.md)
  - `2026-05-05` [zhtw-mcp-integration-evaluation-2026-05-05](zhtw-mcp-integration-evaluation-2026-05-05.md)
  - `2026-05-04` [NML-semiont-analysis-2026-05-04](NML-semiont-analysis-2026-05-04.md)
  - `2026-05-04` [article-health-ssot-design-2026-05-04](article-health-ssot-design-2026-05-04.md)
  - `2026-05-04` [grok-critique-evolution-2026-05-04](grok-critique-evolution-2026-05-04.md)
  - `2026-05-04` [session-id-naming-2026-05-04](session-id-naming-2026-05-04.md)
  - `2026-05-04` [youtube-embed-architecture-2026-05-04](youtube-embed-architecture-2026-05-04.md)
  - `2026-05-03` [article-template-unification-plan-2026-05-03](article-template-unification-plan-2026-05-03.md)
  - `2026-05-03` [og-engine-frontend-batch-2026-05-03](og-engine-frontend-batch-2026-05-03.md)
  - `2026-05-03` [owl-diary-translation-poc-2026-05-03](owl-diary-translation-poc-2026-05-03.md)
  - `2026-05-03` [owl-vs-claude-rewrite-pipeline-2026-05-03](owl-vs-claude-rewrite-pipeline-2026-05-03.md)
  - `2026-05-03` [p2-index-deferral-2026-05-03](p2-index-deferral-2026-05-03.md)
  - `2026-05-03` [page-template-unification-audit-2026-05-03](page-template-unification-audit-2026-05-03.md)
  - `2026-05-03` [per-page-render-slowdown-2026-05-03](per-page-render-slowdown-2026-05-03.md)
  - `2026-05-03` [reader-settings-overlay-deferred-2026-05-03](reader-settings-overlay-deferred-2026-05-03.md)
  - `2026-05-02` [owl-parallel-free-compute-applications-2026-05-02](owl-parallel-free-compute-applications-2026-05-02.md)
  - `2026-05-01` [ci-build-page-cache-investigation-2026-05-01](ci-build-page-cache-investigation-2026-05-01.md)
  - `2026-05-01` [sovereignty-bench-evolution-thesis-2026-05-01](sovereignty-bench-evolution-thesis-2026-05-01.md)
  - `2026-05-01` [sovereignty-bench-tw-design-2026-05-01](sovereignty-bench-tw-design-2026-05-01.md)

### 2026-04 (48 files)

- Type breakdown: ops: 12 / plan: 8 / design: 6 / evolution: 5 / audit-routine: 5 / audit: 3 / proposal: 3 / analysis: 3 / semiont: 3
  - `2026-04-30` [lang-sync-engine-comparison-2026-04-30](lang-sync-engine-comparison-2026-04-30.md)
  - `2026-04-30` [translation-batch-design-evaluation-2026-04-30-δ](translation-batch-design-evaluation-2026-04-30-δ.md)
  - `2026-04-29` [handoff-2026-04-29-night](handoff-2026-04-29-night.md)
  - `2026-04-29` [lang-sync-handoff-2026-04-29](lang-sync-handoff-2026-04-29.md)
  - `2026-04-29` [lang-sync-harvest-experiments-2026-04-29](lang-sync-harvest-experiments-2026-04-29.md)
  - `2026-04-28` [dna-context-hygiene-audit-2026-04-28](dna-context-hygiene-audit-2026-04-28.md)
  - `2026-04-28` [rewrite-pipeline-media-stage-design-2026-04-28-ι](rewrite-pipeline-media-stage-design-2026-04-28-ι.md)
  - `2026-04-27` [harvest-engine-strategy-2026-04-27](harvest-engine-strategy-2026-04-27.md)
  - `2026-04-27` [music-strategy-2026-04-27](music-strategy-2026-04-27.md)
  - `2026-04-26` [life-decision-tree-design-2026-04-26](life-decision-tree-design-2026-04-26.md)
  - `2026-04-25` [i18n-coverage-2026-04-25](i18n-coverage-2026-04-25.md)
  - `2026-04-25` [i18n-evolution-roadmap-2026-04-25](i18n-evolution-roadmap-2026-04-25.md)
  - `2026-04-23` [sc-impressions-spike-2026-04-23](sc-impressions-spike-2026-04-23.md)
  - `2026-04-23` [spore-sync-architecture-2026-04-23](spore-sync-architecture-2026-04-23.md)
  - `2026-04-22` [ci-build-optimization-discussion-2026-04-22](ci-build-optimization-discussion-2026-04-22.md)
  - `2026-04-22` [og-pipeline-patch-plan-2026-04-22](og-pipeline-patch-plan-2026-04-22.md)
  - `2026-04-21` [spore-harvest-insights-2026-04-21](spore-harvest-insights-2026-04-21.md)
  - `2026-04-20` [cli-evolution-roadmap-2026-04-20](cli-evolution-roadmap-2026-04-20.md)
  - `2026-04-20` [worktree-multi-session-plan-2026-04-20](worktree-multi-session-plan-2026-04-20.md)
  - `2026-04-18` [ai-crawler-404-analysis-2026-04-18](ai-crawler-404-analysis-2026-04-18.md)
  - `2026-04-18` [dashboard-spore-section-plan-2026-04-18](dashboard-spore-section-plan-2026-04-18.md)
  - `2026-04-18` [evolution-roadmap-2026-04-18-η](evolution-roadmap-2026-04-18-η.md)
  - `2026-04-17` [canonical-clause-apoptosis-design-2026-04-17](canonical-clause-apoptosis-design-2026-04-17.md)
  - `2026-04-17` [cron-schedule-snapshot-2026-04-17](cron-schedule-snapshot-2026-04-17.md)
  - `2026-04-17` [evolution-roadmap-2026-04-17-δ](evolution-roadmap-2026-04-17-δ.md)
  - `2026-04-15` [article-analyzer-prism-plan-2026-04-15](article-analyzer-prism-plan-2026-04-15.md)
  - `2026-04-15` [qmd-memory-retrieval-plan-2026-04-15](qmd-memory-retrieval-plan-2026-04-15.md)
  - `2026-04-15` [qmd-phase0-prototype-2026-04-15](qmd-phase0-prototype-2026-04-15.md)
  - `2026-04-14` [heartbeat-2026-04-14-δ](heartbeat-2026-04-14-δ.md)
  - `2026-04-14` [heartbeat-2026-04-14-ζ](heartbeat-2026-04-14-ζ.md)
  - `2026-04-14` [memory-distillation-design-2026-04-14](memory-distillation-design-2026-04-14.md)
  - `2026-04-13` [social-tentacle-plan-2026-04-13](social-tentacle-plan-2026-04-13.md)
  - `2026-04-13` [social-tentacle-report-2026-04-13](social-tentacle-report-2026-04-13.md)
  - `2026-04-13` [ssodt-spore-linkback-plan-2026-04-13](ssodt-spore-linkback-plan-2026-04-13.md)
  - `2026-04-13` [x-evolution-report-2026-04-13](x-evolution-report-2026-04-13.md)
  - `2026-04-12` [NMTH-overseas-ingestion-plan-2026-04-12](NMTH-overseas-ingestion-plan-2026-04-12.md)
  - `2026-04-12` [NMTH-overseas-semiont-analysis-2026-04-12](NMTH-overseas-semiont-analysis-2026-04-12.md)
  - `2026-04-12` [i18n-qa-audit-2026-04-12](i18n-qa-audit-2026-04-12.md)
  - `2026-04-12` [semiont-public-pages-plan-2026-04-12](semiont-public-pages-plan-2026-04-12.md)
  - `2026-04-12` [traffic-analysis-2026-04-12](traffic-analysis-2026-04-12.md)
  - `2026-04-11` [TFT-semiont-analysis-2026-04-11](TFT-semiont-analysis-2026-04-11.md)
  - `2026-04-11` [daily-heartbeat-2026-04-11](daily-heartbeat-2026-04-11.md)
  - `2026-04-11` [sense-2026-04-11-evening](sense-2026-04-11-evening.md)
  - `2026-04-11` [sense-2026-04-11](sense-2026-04-11.md)
  - `2026-04-11` [session-scope-proposal-2026-04-11](session-scope-proposal-2026-04-11.md)
  - `2026-04-06` [sense-2026-04-06](sense-2026-04-06.md)
  - `2026-04-05` [organ-lifecycle-design-2026-04-05](organ-lifecycle-design-2026-04-05.md)
  - `2026-04-03` [sc-2026-04-03-to-05](sc-2026-04-03-to-05.md)

### 2026-03 (1 files)

- Type breakdown: ops: 1
  - `2026-03-31` [evolve-2026-03-31](evolve-2026-03-31.md)

---

🧬 _Auto-generated by `scripts/tools/generate-reports-index.py`. Edit the generator, not this file._
