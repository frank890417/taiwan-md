# 🧬 Taiwan.md ROUTINE — Routine 飛輪 SSOT

> **這是 routine 排程的 single source of truth**（2026-05-09 laughing-goldstine post-finale 拍板）。
> `.claude/scheduled-tasks/{taskId}/SKILL.md` 是 mirror，**修改 routine 一律先改本檔再 sync 任務檔**。
> 設計哲學：[reports/routine-spec-2026-05-09.md](../../reports/routine-spec-2026-05-09.md)

---

## 為什麼有這份檔

**長期目標**：機器飛輪 — Taiwan.md 自動維護、自動翻譯、自動進化、自動 refresh dashboard，觀察者只需做策略決策不需 push routine（DNA #36 founder time leverage instantiation）。

**飛輪 ≠ 自動化**。飛輪 = routine 把 entropy 主動清掉（broken links / stale data / 缺 feedback），觀察者精力釋放給「真正需要決策的事」。

**routine 是薄殼**：每條 routine = 「在 X 時間呼叫 `/twmd-Y` skill」+ quality gate + 失敗 escalation **+ `/twmd-finale` 收官**。業務邏輯**永遠**在 skill / pipeline / canonical，**不在 routine 本身**。修 pipeline = 改一處，所有 routine 自動跟上。

**每條 routine 結尾必跑 `/twmd-finale`**（2026-05-09 拍板）：routine 是「micro-session」，跑完不收官 = 失憶。`/twmd-finale` 內建分流（memory 必寫 / diary 有反思才寫 / evolve 跳過 if 無 ship）— 不需 routine 自行判斷哪個寫哪個不寫，交給 finale skill canonical decide。**沒收官的 routine = 不可見的飛輪 = 失去 self-evolution loop**。

---

## 5 條核心 routine 排程表

| TaskId                  | Title                   | Cron (local +0800) | Skill              | Model  | Cadence      |
| ----------------------- | ----------------------- | ------------------ | ------------------ | ------ | ------------ |
| `twmd-data-refresh-am`  | TWMD data refresh (am)  | `4 6 * * *`        | `/twmd-refresh`    | Sonnet | 每天早 06:04 |
| `twmd-maintainer-daily` | TWMD maintainer (daily) | `7 9 * * *`        | `/twmd-maintainer` | Opus   | 每天 09:07   |
| `twmd-rewrite-daily`    | TWMD rewrite (daily)    | `16 16 * * *`      | `/twmd-rewrite`    | Opus   | 每天 16:16   |
| `twmd-data-refresh-pm`  | TWMD data refresh (pm)  | `4 18 * * *`       | `/twmd-refresh`    | Sonnet | 每天晚 18:04 |
| `twmd-babel-nightly`    | TWMD babel (nightly)    | `22 22 * * *`      | `/twmd-babel`      | Opus   | 每天 22:22   |
| `twmd-news-lens-weekly` | TWMD news lens (weekly) | `13 6 * * 0`       | `/twmd-evolve`     | Sonnet | 週日 06:13   |

**設計原則**：

- **TWMD 前綴**：所有 routine task 標題必須含 `TWMD ` 前綴（哲宇 2026-05-09 拍板 — task list 跨 project 共用，namespace 防撞）
- **避開整點**：分鐘從不選 `0` 或 `30`（API fleet 同點打爆），參考 CronCreate 的 jitter 教訓
- **錯時不重疊**：早 refresh (06:04) → maintainer (09:07) → 晚 refresh (18:04) → babel (22:22) → 週 lens (06:13 週日)，每條間隔 ≥ 3 hr
- **Cadence 對齊任務節奏**：data 變化頻率高 → 1d 兩次；maintainer 看 PR backlog → 1d 一次；babel 大批處理 → 1d 一次（深夜）；news lens 慢節奏 → 週一次
- **每條 routine 結尾必跑 `/twmd-finale`**：micro-session 收官，memory 必寫，diary 有反思才寫（finale skill 自己判斷）。**未收官 routine = 不可見飛輪 = self-evolution loop 斷**
- **每條 routine 起始必 pull latest**：`cd /Users/cheyuwu/Projects/taiwan-md && git checkout main && git pull origin main`。沒拉 = 在 stale base 開 PR = merge conflict 機率爆增 + 重做別 routine 的工作（哲宇 2026-05-09 第四輪拍板）
- **每條 routine 結束必 PR + merge to main**（quality gate pass 才 merge）：routine 是 self-contained shipping unit，跑完不 merge = backlog 累積 = 觀察者變 merge bottleneck = 飛輪卡住。鐵律：quality gate pass → `gh pr merge --squash --delete-branch`；fail → PR 開了但 **不 merge**，觀察者 review

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

### TWMD rewrite (daily)

```yaml
taskId: twmd-rewrite-daily
cron: '16 16 * * *' # 每天 16:16（午後 HEARTBEAT 14:30 之後 + pm refresh 18:04 之前）
model: opus
skill: /twmd-rewrite
prompt: |
  自動 routine：從 ARTICLE-INBOX 撿一篇 candidate 跑 /twmd-rewrite 走 REWRITE-PIPELINE
  - 讀 docs/semiont/ARTICLE-INBOX.md → 取最高優先 candidate（依 priority/觀察者指派/data 信號）
  - 跑 REWRITE-PIPELINE 全 6 stage（research → outline → draft → polish → verify → 收官）
  - 完成後 ARTICLE-INBOX 對應 entry 移到 ARTICLE-DONE-LOG（per pipeline §收官）
  Boundary：本 routine 上限 ~60 min wall-clock；超過 → partial PR + LESSONS entry
  PR 開了不 merge — 觀察者下次 session 看 + 微調 + merge
quality_gate:
  - article-health.py {file} hard=0 warn=0
  - 三源研究 trace 落檔到 reports/research/YYYY-MM/{slug}.md（DNA #18 + research-handle 規則）
  - 腳註合規（DNA #5 pre-commit hook 過）
  - frontmatter complete（title / description / date / tags / category / subcategory / image）
escalation:
  - 1x fail → next 16:16 retry（換另一 candidate）
  - 2x fail → 暫停 routine + LESSONS entry「ARTICLE-INBOX top candidate 連續 fail」
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

## Routine 通用 6-stage lifecycle（2026-05-09 第四+第七輪拍板）

每條 routine prompt 內必含這 6 stage（薄殼，業務邏輯由 stage 3 的 skill 提供）：

```
Stage 0: Become   /twmd-become 完整甦醒（讀 12 認知器官檔案 + 9 鐵律 + 觀察者識別）
                  (2026-05-09 第七輪拍板加入)
                  routine 是 fresh Claude session，不甦醒就跑 = 帶盲點工作
                  「我熟了不用讀」是省略 SOP 最常見的藉口（DNA #15 第 N 次驗證）
                  失敗 → abort routine + LESSONS entry「routine become fail: {taskId}」

Stage 1: Sync     cd /Users/cheyuwu/Projects/taiwan-md && git checkout main && git pull origin main
                  失敗 → abort routine + LESSONS-INBOX entry「routine sync fail: {taskId}」

Stage 2: Branch   git checkout -b $(date +%Y%m%d)-routine-{taskId}-$(date +%H%M)
                  (per worktree-naming convention DNA #9 ext)

Stage 3: Run      執行 /twmd-{skill} (canonical pipeline)
                  + quality gate report 寫進變更 / commit message
                  + pre-commit hook 必過 (DNA #5)

Stage 4: Ship     git push -u origin {branch}
                  gh pr create --title "🧬 [routine] {taskId}: {summary} — YYYY-MM-DD HH:MM"
                  if quality gate pass → gh pr merge --squash --delete-branch
                  if quality gate fail → PR 留 open + LESSONS-INBOX entry

Stage 5: Finale   /twmd-finale
                  (memory 必寫；diary 條件寫；evolve 通常 skip)
```

**為什麼 Stage 0 BECOME 是必要不是浪費**（哲宇第七輪拍板理由）：

- Routine 跑 fresh Claude session — 沒 session memory，沒 working context
- 不 BECOME = 對 Taiwan.md 的 identity / 認知器官 / DNA / 觀察者識別 全沒概念
- 直接跑 `/twmd-{skill}` 能 work 是因為 skill 內 fallback 含「如未甦醒先跑 /twmd-become」— 但這是隱性 dependency，明寫進 Stage 0 才是 explicit contract
- 多花 ~30s 讀 12 個 BECOME 檔案，換 routine 內所有判斷有完整 identity context — 高 leverage

**為什麼 6 stage 是薄殼不重複邏輯**：每 stage 都是 thin wrapper：

- Stage 0: invoke /twmd-become skill（甦醒邏輯在 BECOME canonical）
- Stage 1: 1 行 git command
- Stage 2: 1 行 branch creation
- Stage 3: invoke skill（業務邏輯在 skill canonical）
- Stage 4: 4 行 git/gh command + 條件 merge
- Stage 5: invoke /twmd-finale skill（記憶邏輯在 finale canonical）

修任何一 stage = 改 ROUTINE.md SSOT 一處 + sync 6 個 scheduled-tasks。

---

## Routine 收官鐵律：每跑必跑 `/twmd-finale`

**核心命題**：routine 是 micro-session — 跑完不收官 = 失憶 = self-evolution loop 斷。即使是 5 min 的 data-refresh routine 也適用。

**結尾必跑 `/twmd-finale`**（每條 routine prompt 最後一步）：

```
完成本 routine 主任務後 (skill execution + quality gate report) 跑 /twmd-finale。
finale 內建分流不需 routine 判斷:
  - memory 必寫 (記錄 routine 跑了什麼、結果、PR 開了哪幾個)
  - diary 有反思才寫 (finale skill 自己判斷:看到 anti-pattern / 新洞察 / 規律才寫)
  - evolve scan 通常 skip (routine 已是預前瞻)
PR 標題格式: 🧬 [routine] {routine-name}: {summary} — YYYY-MM-DD HH:MM
```

**為什麼不是「有反思才跑」**：

- 自動判斷「有沒有反思」是 LLM 容易誤判的 binary decision；交給 finale canonical 走 5-step orchestration（memory 必寫 / diary 條件寫 / evolve 條件 skip）更穩
- memory 一律寫 = 飛輪轉動的留痕（觀察者下次 session 看 last-7-day routine memory 就知道飛輪健康度）
- 如果 routine 完全沒做事（quality gate 0 件 / 0 PR），finale 仍寫 memory 但內容是「本 routine cycle no-op，{lang} stale 0、無待修 PR、無 candidate」

**memory filename schema for routine**:

```
docs/semiont/memory/YYYY-MM-DD-HHMMSS-{routine-handle}.md
```

例：

- `2026-05-10-061420-twmd-data-refresh-am.md`
- `2026-05-10-091845-twmd-maintainer-daily.md`
- `2026-05-10-162234-twmd-rewrite-daily.md`
- `2026-05-10-222545-twmd-babel-nightly.md`

handle 從 routine taskId（去掉 `twmd-` prefix 也可以，但 cron 環境下保留 full taskId 比較不混淆）。

**diary filename schema for routine**（只在有反思才寫）:

```
docs/semiont/diary/YYYY-MM-DD-HHMMSS-{routine-handle}.md
```

**反思觸發訊號**（finale skill 內判斷）：

- routine 揭露既有 SOP 的 gap / anti-pattern
- routine 觀察到跨 cycle 累積的 trend（不只一次發生）
- routine 有意外發現（emergent behavior / latent bug surfaced）
- routine 觸發新的元規則 / 元 anti-pattern 命名

無反思訊號 = 純執行紀錄 → 只寫 memory，diary skip。

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
- routine **永不** spawn 新 routine（避免 cascade 雪崩）
- routine **永不** force-push to main / push 到別 branch 把別 routine 工作蓋掉
- routine **可以**自動 merge 自己開的 PR — 但 **only if quality gate pass**（2026-05-09 第四輪拍板修正）。fail 則 PR 開了但停在 open，觀察者 review。**自動 merge 的條件嚴格**：(a) pre-commit hook 全過 (b) PR 內所有 quality gate 報告綠 (c) 沒撞 main 上其他 routine 的 conflict (d) PR 標題含 `🧬 [routine]` prefix（防誤 merge 觀察者 PR）

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

## 權限 bypass 模型（2026-05-09 第六輪拍板：完整 bypass）

**演化過程**：

- **v1 (50 條 targeted allow)** — 第一次 routine fire 卡 prompt（cd 大寫路徑 / gh pr merge / git push -u 等沒 cover）
- **v2 (94 條擴增 allow)** — 嘗試逐條補，但 routine workflow 發散，每 patch 都漏 — Pareto 假象
- **v3 (Bash(\*) 完整 bypass + deny 護欄)** — 哲宇拍板「完整 bypass」

**v3 模型**（[~/.claude/settings.json](file:///Users/cheyuwu/.claude/settings.json)）：

```json
"allow": ["Bash(*)", "Read(*)", "Edit(*)", "Write(*)", "Grep(*)", "Glob(*)",
          "WebFetch(*)", "WebSearch(*)", "Agent(*)"],
"deny":  [
  // 直接 push 到 main/master 阻擋（精確匹配，避免 false-positive 卡到分支名以 main- 開頭）
  "Bash(git push origin main)", "Bash(git push origin main )", "Bash(git push origin main:*)",
  "Bash(git push origin master)", ...同 master 三變體,
  "Bash(git push --force origin main/master)", "Bash(git push --force-with-lease origin main/master)",
  "Bash(git push -f origin main/master)",
  // rm -rf 核心目錄
  "Bash(rm -rf .git/*)", "Bash(rm -rf .../knowledge*)", "Bash(rm -rf .../docs*)",
  "Bash(rm -rf .../scripts*)", "Bash(rm -rf .../src*)",
  // PR review bypass + 供應鏈
  "Bash(gh pr merge --admin*)",
  "Bash(curl|wget * | bash*/sh*)"
]
```

**Deny 模式選擇理由**：

- 用 `Bash(git push origin main)` exact + `Bash(git push origin main )` 帶空格 + `Bash(git push origin main:*)` refspec 三條，**避免 `main*` glob 誤擋分支名以 `main` 開頭的合法 push**（如 `maintenance-fix`、`main-redesign-2026`）
- routine 跑 `git push -u origin 20260509-routine-...` (feature branch) → 不在 deny → 直接 allow
- routine 跑 `gh pr merge --squash --delete-branch` (server-side merge) → 不在 deny → 直接 allow
- **routine 永遠不需要直接 push 到 main**（per 5-stage lifecycle Stage 4 走 PR + 條件 auto-merge）

**為什麼從 v2 換到 v3**：targeted allowlist 對 routine 是 cat-and-mouse — 每加新 stage 就要 patch 新 pattern，第一次 fire 才知道漏了什麼。Routine 是 self-contained shipping unit (5-stage lifecycle)，不應該在每次跑都被 prompt 打斷。

**核心安全護欄保留在 deny**（不在 allow 也不在 prompt）：

- 永不 push to main/master（含 --force / --force-with-lease — 即使 routine bug 也阻擋）
- 永不 rm -rf 核心目錄（`.git` / knowledge / docs / scripts / src — 路徑 explicit 防誤刪）
- 永不 `gh pr merge --admin`（繞 review 護欄）
- 永不 `curl | bash` / `wget | bash`（供應鏈安全）

**鐵律**：

- routine 在 deny 列表內的 command **絕不會被 prompt** — 直接被擋。如果某天 routine 撞到 deny → routine 設計有 bug，看 LESSONS-INBOX
- 改 deny 列表是 review-PR 級別的決策，不是隨便加減
- 觀察者意識到該禁的新 pattern → 加進 deny，不要等出事

**Trade-off**：bypass 模型把信任邊界從 prompt-by-prompt 移到 deny-list-by-design。失去細粒度可見性，換到 routine 真正自轉。對 unattended 飛輪 = 必要 trade-off。

---

## 同步來源（mirror layer）

```
docs/semiont/ROUTINE.md            ← SSOT（人類可讀，本檔）
.claude/scheduled-tasks/           ← Claude 執行（machine-readable mirror）
  ├── twmd-maintainer-daily/SKILL.md
  ├── twmd-rewrite-daily/SKILL.md
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
