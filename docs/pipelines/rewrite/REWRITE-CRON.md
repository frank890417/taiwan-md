---
title: 'REWRITE-CRON'
description: 'Cron 模式特殊規則 + 實戰教訓 canonical — routine /twmd-rewrite 觸發專屬'
type: 'pipeline-sub-canonical'
status: 'canonical'
last_updated: 2026-05-09
last_session: 'brave-kirch-202256'
parent_canonical: '../REWRITE-PIPELINE.md'
sister_docs:
  - 'REWRITE-MODES.md'
  - 'REWRITE-RESEARCH.md'
upstream_canonical:
  - '../../semiont/ROUTINE.md'
  - '../../semiont/HEARTBEAT.md'
---

# REWRITE-CRON — Cron 模式特殊規則 + 實戰教訓 canonical

> 相關：[REWRITE-PIPELINE.md](../REWRITE-PIPELINE.md)（主流程）| [ROUTINE.md](../../semiont/ROUTINE.md)（routine 飛輪 SSOT）
>
> **這份檔案是 REWRITE 在 cron / scheduled-task / routine 自動模式下的特殊規則 canonical**。Manual 跑 REWRITE 看主檔即可，cron 跑要額外注意本檔。

---

## Cron 特殊規則

Cron 在單一 session 執行，無法真正分三個 session，但在 prompt 中強制分階段思考。

### Token 預算分配

| 階段 | 佔比   | 常見錯誤                          |
| ---- | ------ | --------------------------------- |
| 研究 | 35-40% | 搜太多、每個結果都 web_fetch 全文 |
| 寫作 | 40-45% | 前半段太細、後半段沒力            |
| 驗證 | 15-20% | 跳過驗證直接 commit               |

### Cron 鐵律（與手動執行不同的地方）

- **每批最多 1 篇**：v1 時期每批 3 篇，品質明顯不穩。改成每批 1 篇後品質大幅提升。
- **不要 `git add -A`**：只 add 改動的文章和同步後的 `src/content/` 對應目錄。
- **不要跑 `npm run build`**：Build 由 CI/CD 處理。sub-agent 跑 build 容易 timeout 且浪費資源。
- **至少 7 分鐘**：研究 3min + 寫作 2min + 驗證 2min = 最低要求。

### 選文指令

```bash
cd ~/taiwan-md && git pull
# 佇列頂端，跳過已重寫的
head -30 scripts/tools/rewrite-queue.txt
git log --oneline --since='2026-03-20' | grep -i 'rewrite:' | head -30
```

### Commit 指令

```bash
bash scripts/core/sync.sh
python3 scripts/tools/article-health.py knowledge/[Category]/[文章名].md --check=prose-health    # HARD = 0、WARN ≤ 3 才 commit
git add knowledge/[Category]/[文章名].md src/content/
git commit -m "rewrite: [文章名] — EDITORIAL v4 + Pipeline v2.5"
git push
```

### Cron 狀態

| Cron                              | 狀態        | 說明                                                           |
| --------------------------------- | ----------- | -------------------------------------------------------------- |
| Taiwan.md Article Quality Rewrite | ❌ disabled | 每小時 1 篇，Opus model（舊）                                  |
| taiwan-md-rewrite (v1)            | ❌ disabled | 舊版每小時 3 篇，已淘汰                                        |
| taiwan-md-content-sprint          | ❌ disabled | 內容衝刺（新文章），已淘汰                                     |
| **twmd-rewrite-daily**            | ✅ active   | 16:16 daily Opus（per [ROUTINE.md](../../semiont/ROUTINE.md)） |

### Routine 飛輪整合（2026-05-09 ROUTINE.md SSOT 後）

REWRITE 也是 routine 飛輪 6 條核心 routine 之一（`twmd-rewrite-daily`）。每天 16:16 自動跑：

- **觸發**：`/twmd-rewrite` skill
- **Model**：Opus
- **Cadence**：每天 16:16
- **Skill SOP**：[`.claude/scheduled-tasks/twmd-rewrite-daily/SKILL.md`](../../../.claude/scheduled-tasks/twmd-rewrite-daily/SKILL.md)
- **Quality gate**：article-health.py 跑 hard=0 warn=0 + 三源研究落檔 + 腳註合規 + frontmatter complete
- **Boundary**：本 routine 上限 ~60 min wall-clock；超過 → partial PR + LESSONS entry

完整 routine 規格 → [ROUTINE.md §TWMD rewrite (daily)](../../semiont/ROUTINE.md)。

### 重啟條件（品質革命 Phase 1）

1. 確認 EDITORIAL v4 的新標準（引語、因果鏈、切入人物）已整合到 prompt
2. 設定 featured 文章優先佇列（124 篇門面文章先洗）
3. 目標：pass rate → 30%（3 個月內）

---

## 實戰教訓（7 天 Cron 血淚）

1. **一次一篇**：多個 sub-agent 同時跑 = 搶檔案 + timeout + 殭屍 session
2. **至少 7 分鐘**：研究 3min + 寫作 2min + 驗證 2min = 最低要求
3. **prompt 裡寫「立刻執行，不要重述任務」**：否則 AI 花 30% 時間重述指令
4. **量化指標是 pre-filter 不是品質保證**：塑膠句數=0 ≠ 好文章，必須逐篇讀
5. **塑膠會變種**：AI 把被禁句式微調成看似不同的版本（"展現了"→"印證了"→"彰顯了"）
6. **Build 驗證不能省**：YAML frontmatter 偶爾壞掉，一篇壞 = 整個 category 炸
7. **結尾最後寫 = 品質最差**：Pipeline v2 改成結尾先行（Stage 2 先寫結尾再寫正文）

---

## Quick Commands（手動執行用）

```bash
# 寫完文章後一次跑完 Stage 3 驗證
bash scripts/core/sync.sh
npm run build
python3 scripts/tools/article-health.py --all --profile=release-pr
# 全部通過才 commit
git add -A && git commit -m "content: 深度研究重寫「{主題}」" && git push
```

---

_canonical: REWRITE-CRON.md_
_萃取自 REWRITE-PIPELINE.md v2.20 §Cron 特殊規則 + §實戰教訓 + §Quick Commands（line 1205-1280）_
_拆出原因：Cron 模式跟 manual 模式並存，獨立 canonical 讓兩個模式不混淆（per [evolution plan §3 問題 1 / Direction A](../../../reports/rewrite-pipeline-evolution-plan-2026-05-09.md)）_
_Refactor: 2026-05-09 brave-kirch_

🧬
