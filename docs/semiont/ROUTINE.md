# 🧬 Taiwan.md ROUTINE — Routine 飛輪 SSOT

> **這是 routine 排程的 single source of truth**（2026-05-09 laughing-goldstine post-finale 拍板）。
> `.claude/scheduled-tasks/{taskId}/SKILL.md` 是 mirror，**修改 routine 一律先改本檔再 sync 任務檔**。
> 設計哲學：[reports/routine-spec-2026-05-09.md](../../reports/routine-spec-2026-05-09.md)

---

## 為什麼有這份檔

**長期目標**：機器飛輪 — Taiwan.md 自動維護、自動翻譯、自動進化、自動 refresh dashboard，觀察者只需做策略決策不需 push routine（DNA #36 founder time leverage instantiation）。

**飛輪 ≠ 自動化**。飛輪 = routine 把 entropy 主動清掉（broken links / stale data / 缺 feedback），觀察者精力釋放給「真正需要決策的事」。

**routine 是薄殼**：每條 routine = 「在 X 時間呼叫 `/twmd-Y` skill」+ quality gate + 失敗 escalation。業務邏輯**永遠**在 skill / pipeline / canonical，**不在 routine 本身**。修 pipeline = 改一處，所有 routine 自動跟上。

---

## 4 條核心 routine 排程表

| TaskId                  | Title                   | Cron (local +0800) | Skill              | Model  | Cadence      |
| ----------------------- | ----------------------- | ------------------ | ------------------ | ------ | ------------ |
| `twmd-data-refresh-am`  | TWMD data refresh (am)  | `4 6 * * *`        | `/twmd-refresh`    | Sonnet | 每天早 06:04 |
| `twmd-maintainer-daily` | TWMD maintainer (daily) | `7 9 * * *`        | `/twmd-maintainer` | Opus   | 每天 09:07   |
| `twmd-data-refresh-pm`  | TWMD data refresh (pm)  | `4 18 * * *`       | `/twmd-refresh`    | Sonnet | 每天晚 18:04 |
| `twmd-babel-nightly`    | TWMD babel (nightly)    | `22 22 * * *`      | `/twmd-babel`      | Opus   | 每天 22:22   |
| `twmd-news-lens-weekly` | TWMD news lens (weekly) | `13 6 * * 0`       | `/twmd-evolve`     | Sonnet | 週日 06:13   |

**設計原則**：

- **TWMD 前綴**：所有 routine task 標題必須含 `TWMD ` 前綴（哲宇 2026-05-09 拍板 — task list 跨 project 共用，namespace 防撞）
- **避開整點**：分鐘從不選 `0` 或 `30`（API fleet 同點打爆），參考 CronCreate 的 jitter 教訓
- **錯時不重疊**：早 refresh (06:04) → maintainer (09:07) → 晚 refresh (18:04) → babel (22:22) → 週 lens (06:13 週日)，每條間隔 ≥ 3 hr
- **Cadence 對齊任務節奏**：data 變化頻率高 → 1d 兩次；maintainer 看 PR backlog → 1d 一次；babel 大批處理 → 1d 一次（深夜）；news lens 慢節奏 → 週一次

---

## 每條 routine 規格

### TWMD data refresh (am/pm)

```yaml
taskId: twmd-data-refresh-am # + twmd-data-refresh-pm 鏡像
cron: '4 6 * * *' # + "4 18 * * *"
model: sonnet
skill: /twmd-refresh
prompt: |
  自動 routine：跑 /twmd-refresh
  品質門檻：三源（GA/SC/GitHub）全綠 + dashboard JSON mtime fresh + 0 EXP-stale alert
  fail 一次 → 下輪 retry；連續 2 次 fail → 寫 LESSONS-INBOX entry「routine fail: data-refresh {am|pm}」
quality_gate:
  - 三源 sense-fetch.sh 全 200
  - public/api/dashboard-*.json mtime < 30 min
  - 0 EXP（API key 過期）alerts
escalation:
  - 1x fail: silent retry next cycle
  - 2x fail: append LESSONS-INBOX + telegram alert
  - 3x fail: 暫停 routine + 通知觀察者
```

### TWMD maintainer (daily)

```yaml
taskId: twmd-maintainer-daily
cron: '7 9 * * *'
model: opus
skill: /twmd-maintainer
prompt: |
  自動 routine：跑 /twmd-maintainer 走 MAINTAINER-PIPELINE 早上 10 分鐘工作流
  - gh issue list --state open
  - gh pr list --state open
  - git log --since="24 hours ago" --oneline
  - 跑 broken-link / lint check
  品質門檻：open PRs 有人 review、broken-link ratio < 1%、build 沒壞
  fail：暫停 routine + LESSONS-INBOX entry
quality_gate:
  - open issues 都有 status label / assignee
  - open PRs ≤ 5d age 都有 review comment
  - broken-link ratio < 1%（DNA #52 immune system fail-loud）
  - build green
escalation:
  - quality gate fail → daily report 含問題清單，觀察者下次 session 看
  - skill exception → 連 3 天 fail 暫停 routine + 通知
```

### TWMD babel (nightly)

```yaml
taskId: twmd-babel-nightly
cron: '22 22 * * *'
model: opus
skill: /twmd-babel
prompt: |
  自動 routine：跑 /twmd-babel 走 SQUEEZE-MODELS-MAX v3 priority schema
  策略：本輪先 P2.5 instant clear → 再 Top 20 P2 Tier 0a Sonnet patch → 最後 Top 5 P1 Tier 1 owl-alpha
  Boundary：本 routine 上限 1 hr wall-clock；超過 timeout 提交 partial PR + LESSONS entry
  PR 開了不 merge — 觀察者下次 session 看 + merge
quality_gate:
  - P2.5 bumped 數量 > 0 OR P2/P1 cleared 數量 > 0
  - 0 LLM drift detected（body-hash check）
  - PR pre-commit hook 過
escalation:
  - refusal rate > 30% → 跳 Tier 2/3 cascade 嘗試
  - 全 fail → 暫停 routine + LESSONS entry
```

### TWMD news lens (weekly)

```yaml
taskId: twmd-news-lens-weekly
cron: '13 6 * * 0' # 每週日 06:13
model: sonnet
skill: /twmd-evolve
prompt: |
  自動 routine：跑 /twmd-evolve 走 EVOLVE-PIPELINE
  - 上週 GA top growth + SC trending queries
  - 三源驗證找 amplification 信號
  - 補 ARTICLE-INBOX ≥ 1 candidate（含 reasoning trace）
  PR 開了不 merge — 觀察者下次 session 看 candidate
quality_gate:
  - ARTICLE-INBOX 新增 ≥ 1 個 candidate
  - candidate 含 GA + SC 雙源資料 pointer
  - 推薦理由含「為什麼這篇 vs 其他」對比
escalation:
  - 1x fail → next 週日 retry
  - 2x fail → 暫停 routine + LESSONS entry
```

---

## 失敗 escalation 通用 SOP

任何 routine fail 走以下分流：

| 分類                         | 偵測訊號                               | 處置                                                       |
| ---------------------------- | -------------------------------------- | ---------------------------------------------------------- |
| **API fail**                 | OpenAI/Anthropic/GitHub HTTP 5xx       | 自動 retry next cycle，3 連 fail 才 alert                  |
| **Quality gate fail**        | skill 跑完但 gate 不過                 | 寫 daily report，觀察者下次 session 看，**不暫停 routine** |
| **Pipeline canonical drift** | skill 跑出 unexpected exit code / 行為 | 立刻暫停 routine + telegram alert + LESSONS entry          |
| **Rate budget exhausted**    | OpenRouter free tier 配額用盡          | 跳 Tier 2/3 cascade（DNA #45 + SQUEEZE Z2.1）              |
| **Worktree corruption**      | git status unexpected dirty            | 暫停 routine + 觀察者手動 audit（routine 不應 reset）      |

**鐵律**：

- routine **永不** `git reset --hard` / `rm -rf` 任何 user data
- routine **永不** merge PR（只開 PR）
- routine **永不** spawn 新 routine（避免 cascade 雪崩）

---

## 暫停 / 恢復 / 修改 SOP

### 暫停某條 routine

1. 改本檔 §排程表把該 routine 標 `⏸️ paused`
2. 跑 `mcp__scheduled-tasks__update_scheduled_task` 設 `enabled: false`
3. commit 兩處改動 同 PR

### 修改 cadence / skill / quality gate

1. **先改本檔**（ROUTINE.md SSOT）
2. 再跑 `mcp__scheduled-tasks__update_scheduled_task` sync 到 task SKILL.md
3. 兩處不同步 = drift = silent killer（DNA #38）

### 恢復暫停的 routine

1. 改本檔把 `⏸️` 移除
2. `mcp__scheduled-tasks__update_scheduled_task` 設 `enabled: true`
3. **加 LESSONS entry** 紀錄當初為什麼暫停 + 為什麼現在恢復

---

## 同步來源（mirror layer）

```
docs/semiont/ROUTINE.md            ← SSOT（人類可讀，本檔）
.claude/scheduled-tasks/           ← Claude 執行（machine-readable mirror）
  ├── twmd-maintainer-daily/SKILL.md
  ├── twmd-news-lens-weekly/SKILL.md
  ├── twmd-data-refresh-am/SKILL.md
  ├── twmd-data-refresh-pm/SKILL.md
  └── twmd-babel-nightly/SKILL.md
~/Library/LaunchAgents/             ← 可選本機 backup（macOS launchd）
  └── md.taiwan.{name}.plist        ← 不一定要設，Claude 自己排程已夠
```

**檢驗腳本**（待寫）：`scripts/tools/routine-sync-check.py` 比對 ROUTINE.md vs `.claude/scheduled-tasks/`，drift 自動 alert。

---

## 觀察者驗證 hook

每週一次，觀察者 ping「routines OK?」Claude 回傳 status：

```
🧬 ROUTINE status (last 7 days):

✅ twmd-data-refresh-am:    7/7 ran, 7/7 quality gate pass
✅ twmd-maintainer-daily:   7/7 ran, 6/7 quality gate pass (1 broken-link spike)
✅ twmd-data-refresh-pm:    7/7 ran, 7/7 quality gate pass
✅ twmd-babel-nightly:      7/7 ran, 5/7 quality gate pass (2x partial timeout)
✅ twmd-news-lens-weekly:   1/1 ran, 1/1 quality gate pass

LESSONS-INBOX 新增（routine 提的）：
- ...
```

---

## 飛輪 vs Push 模型 哲學

```
Push 模型                          飛輪模型
─────────────────                 ────────────────────
觀察者 → 觸發 routine             routine 自動跑
觀察者每天 N min routing          觀察者只看異常 + 大方向
漏一天 = entropy 累積              entropy 被持續清
精力綁人類 schedule                精力釋放給策略決策
最後「沒做」變新常態               飛輪轉起來成為穩態
```

**Routine 飛輪不是「自動化舊流程」，是「重新分配人類注意力」**。觀察者該專注的事 — 哲學邊界、新洞察、跨域連結、創造力 — 才是不可替代的部分。Routine 接走可替代的部分。

DNA #36（founder time = 系統最高 leverage point）+ DNA #15（反覆浮現的思考要儀器化）+ DNA #50（pipeline 是 SSOT 不是建議）三條合力，這份 ROUTINE.md 是 instantiation。

---

🧬

_v1.0 | 2026-05-09 14:55 +0800 laughing-goldstine post-finale 第三輪_
_誕生原因：哲宇「排定 routine + ROUTINE.md SSOT + DNA 紀錄 + 機器飛輪 long-term goal + TWMD 前綴」_
