---
title: 'ROUTINE'
description: 'Routine 飛輪 SSOT — 10 條 TWMD-prefix cron routine 排程、quality gate、escalation（含週日反思鏈 4 條 + maintainer 1d2x 守 PR backlog）'
type: 'cognitive-organ'
status: 'canonical'
apoptosis: 'never'
current_version: 'v1.1'
last_updated: 2026-05-10
last_session: 'gracious-blackwell-explore-page'
sister_docs:
  - 'HEARTBEAT.md'
  - 'ANATOMY.md'
  - 'DNA.md'
upstream_canonical:
  - 'HEARTBEAT.md'
  - '../../docs/pipelines/MAINTAINER-PIPELINE.md'
---

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

## 10 條核心 routine 排程表

| TaskId                    | Title                     | Cron (local +0800) | Skill                 | Model  | Cadence      |
| ------------------------- | ------------------------- | ------------------ | --------------------- | ------ | ------------ |
| `twmd-data-refresh-am`    | TWMD data refresh (am)    | `4 6 * * *`        | `/twmd-refresh`       | Sonnet | 每天早 06:04 |
| `twmd-maintainer-daily`   | TWMD maintainer (am) ¹    | `7 9 * * *`        | `/twmd-maintainer`    | Opus   | 每天 09:07   |
| `twmd-rewrite-daily`      | TWMD rewrite (daily)      | `16 16 * * *`      | `/twmd-rewrite`       | Opus   | 每天 16:16   |
| `twmd-data-refresh-pm`    | TWMD data refresh (pm)    | `4 18 * * *`       | `/twmd-refresh`       | Sonnet | 每天晚 18:04 |
| `twmd-maintainer-pm`      | TWMD maintainer (pm) ¹    | `7 21 * * *`       | `/twmd-maintainer`    | Opus   | 每天 21:07   |
| `twmd-babel-nightly`      | TWMD babel (nightly)      | `22 22 * * *`      | `/twmd-babel`         | Opus   | 每天 22:22   |
| `twmd-news-lens-weekly`   | TWMD news lens (weekly)   | `13 6 * * 0`       | `/twmd-evolve`        | Sonnet | 週日 06:13   |
| `twmd-weekly-report-sun`  | TWMD weekly report (sun)  | `8 8 * * 0`        | `/twmd-weekly-report` | Opus   | 週日 08:08   |
| `twmd-distill-weekly`     | TWMD distill (weekly)     | `47 9 * * 0`       | `/twmd-distill`       | Opus   | 週日 09:47   |
| `twmd-self-evolve-weekly` | TWMD self-evolve (weekly) | `23 11 * * 0`      | `/twmd-self-evolve`   | Opus   | 週日 11:23   |

¹ **Maintainer 1d 2x（2026-05-10 拍板）** — taskId `twmd-maintainer-daily` 為 AM slot legacy 保留（沒 rename 因為 scheduled-tasks 不支援 taskId 改名，但語意上是 `am`）；`twmd-maintainer-pm` 為 PM slot 新增。AM 跑完 morning batch（refresh-am + 週日反思鏈 morning routines）的 PR backlog 清理；PM 跑完 afternoon/evening batch（rewrite + refresh-pm）的 PR backlog 清理。**maintainer 是 routine PR backlog 的 SSOT 收割者**：其他 routine 開的 PR 不自己 merge，都由 maintainer am/pm 走 quality gate 後 squash merge to main。

**設計原則**：

- **TWMD 前綴**：所有 routine task 標題必須含 `TWMD ` 前綴（哲宇 2026-05-09 拍板 — task list 跨 project 共用，namespace 防撞）
- **避開整點**：分鐘從不選 `0` 或 `30`（API fleet 同點打爆），參考 CronCreate 的 jitter 教訓
- **錯時不重疊**：日線 早 refresh (06:04) → maintainer (09:07) → rewrite (16:16) → 晚 refresh (18:04) → babel (22:22)；週日反思鏈 news-lens (06:13) → weekly-report (08:08) → distill (09:47) → self-evolve (11:23)。每條間隔 ≥ 1.5 hr，週日鏈尾收於 12 點前
- **週日反思鏈**（哲宇 2026-05-09 拍板序列）：news-lens 拉資料 → weekly-report 寫紀實散文反芻 → distill 把 LESSONS-INBOX 升 canonical → self-evolve 從 LONGINGS / DIARY §反覆浮現的思考 找 unstrumentation pattern → 哲宇喝咖啡看完整週進化結果
- **Cadence 對齊任務節奏**：data 變化頻率高 → 1d 兩次；**maintainer 守 PR backlog → 1d 兩次**（2026-05-10 升級：morning + evening 兩波清掃，避免 routine PR 累積成觀察者 bottleneck）；babel 大批處理 → 1d 一次（深夜）；news lens 慢節奏 → 週一次
- **Maintainer 是 routine PR backlog 的 SSOT 收割者**（2026-05-10 新增 §每條 routine 規格 §TWMD maintainer §collect-and-merge 段詳述）：rewrite / babel / news-lens / distill / self-evolve / weekly-report / data-refresh 開的 `🧬 [routine]` PR 都由 maintainer am/pm 走 hard gate 後 `gh pr merge --squash --delete-branch`。其他 routine 自己 **不 auto-merge**（避免每條 routine 各自走 merge 邏輯，drift 風險高）— maintainer 集中收割比分散收割可控。**Contributor / observer 開的 PR maintainer 永遠不 auto-merge**（只標 review status + 在 memory 報告，等觀察者決策）
- **每條 routine 結尾必跑 `/twmd-finale`**：micro-session 收官，memory 必寫，diary 有反思才寫（finale skill 自己判斷）。**未收官 routine = 不可見飛輪 = self-evolution loop 斷**
- **每條 routine 起始必 pull latest**：`cd /Users/cheyuwu/Projects/taiwan-md && git checkout main && git pull origin main`。沒拉 = 在 stale base 開 PR = merge conflict 機率爆增 + 重做別 routine 的工作（哲宇 2026-05-09 第四輪拍板）
- **每條 routine 結束必 PR**（不 merge — 由 maintainer am/pm 收割）：routine 跑完開 PR、CI 跑、自己**不 merge**。下一次 maintainer cycle（最遠 ≤ 12 小時）走 hard gate 後 squash merge。**例外**：maintainer 自己跑 `/twmd-maintainer` 順手 fix（label / lint / cleanup）開的 PR 可以自己 auto-merge，因為 hard gate 是 maintainer canonical 的一部分

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

### TWMD maintainer (am + pm) — 1d 2x，PR backlog SSOT 收割者

```yaml
taskIds:
  - twmd-maintainer-daily # AM slot @ 09:07（legacy taskId 保留 — scheduled-tasks 不支援 rename）
  - twmd-maintainer-pm # PM slot @ 21:07
crons:
  - '7 9 * * *' # am
  - '7 21 * * *' # pm（12 hr 對稱，捕捉 rewrite/refresh-pm batch + 提前 babel 之前）
model: opus
skill: /twmd-maintainer
prompt: |
  自動 routine：跑 /twmd-maintainer 走 MAINTAINER-PIPELINE 工作流 + collect-and-merge backlog

  Stage 3 主任務（ordered）：
  1. gh issue list --state open → triage（label / assignee 缺漏）
  2. gh pr list --state open → 走 §collect-and-merge 流程（見下）
  3. git log --since="12 hours ago" --oneline → 異常掃描
  4. broken-link / lint sample check
  5. build sanity check (npm run build 不需要每次跑，alternate cycles)

  §collect-and-merge SOP（2026-05-10 新增 — maintainer 是 routine PR backlog SSOT 收割者）：

    對每個 open PR 分流：

    A. 標題以 `🧬 [routine]` 開頭 + author == frank890417 (owner credentials):
       - gh pr checks N → 若全 PASS:
         - gh pr view N --json mergeable --jq .mergeable == "MERGEABLE":
           - PR 年齡 ≥ 5 min（避免搶 routine 自己還在跑）
           - → gh pr merge N --squash --delete-branch
           - 寫進 memory: "merged routine PR #N: {title}"
         - 若 mergeable == "CONFLICTING":
           - 留 open + LESSONS entry「routine PR conflict: #N — needs manual rebase」
       - 若 checks 還在 pending:
         - 留下次 cycle 處理（PM cycle 撿 AM 沒處理完的）
       - 若 checks 有 FAIL:
         - 留 open + LESSONS entry「routine PR ci fail: #N — {failing-check}」
         - 觀察者 review

    B. 標題不含 `🧬 [routine]` 或 author != owner（contributor / observer PR）:
       - 永不 auto-merge
       - 寫進 memory「PR #N from {author} pending observer review」
       - 觀察者下次 session 看

  品質門檻（quality gate 走完 stage 3 評分）:
  - open issues 都有 status label / assignee
  - routine PR backlog（含 [routine] prefix）≤ 3 條（>3 = 紅燈，可能 routine 自己有問題）
  - broken-link ratio < 1%（DNA #52 immune system fail-loud）
  - build green（alternate cycles 跑）
  fail：daily report 含問題清單，觀察者下次 session 看；不暫停 routine

quality_gate:
  - open issues 都有 status label / assignee
  - routine PR backlog ≤ 3
  - 本 cycle 內合併的 routine PR 都通過 hard gate（CI green + mergeable + age ≥ 5 min + prefix + author check）
  - broken-link ratio < 1%
  - build green（每天至少一個 cycle 跑）
escalation:
  - 1 cycle quality gate fail → daily report 含問題清單，觀察者下次 session 看
  - 連 3 cycle (1.5 天) fail → 暫停 routine + telegram alert
  - routine PR backlog > 5 → 紅燈（可能 routine workflow 有 bug）→ LESSONS entry
  - skill exception → 暫停 routine + 通知
```

**為什麼 maintainer 是 SSOT merge 收割者而非每條 routine 各自 merge**：

- **drift 風險**：每條 routine 各自跑 `gh pr merge` 等 6 處複寫 hard-gate 邏輯。改一處要改 6 處。指標 over 複寫違反
- **同步問題**：routine 跑完自己不可能等到自己 PR 的 CI 跑完才 merge（CI 5-10 min vs routine 自己 10-60 min 完）— 等 = 浪費；不等 = 賭 CI 過
- **集中審計**：maintainer 是唯一 cycle 跑「掃所有 PR + 走 hard gate」的 routine。所有 merge 動作走同一個 quality gate canonical
- **觀察者可見度**：所有 routine merge 都來自 maintainer（git log 一目了然），不是分散在 6 條 routine（混淆）
- **fail isolation**：某條 routine PR fail（CI 紅 / conflict），不會卡住其他 routine — maintainer 各別處置每個 PR

對應 MANIFESTO §指標 over 複寫 + DNA #50 pipeline SSOT 原則。

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

### TWMD weekly report (sun)

```yaml
taskId: twmd-weekly-report-sun
cron: '8 8 * * 0' # 每週日 08:08（在 06:04 refresh + 06:13 news-lens 之後，給人類早餐前讀的時間）
model: opus # 核心動作是「親手寫紀實散文反芻」，需思考品質而非速度
skill: /twmd-weekly-report
canonical: docs/pipelines/WEEKLY-REPORT-PIPELINE.md # 業務邏輯 SSOT
prompt: |
  自動 routine：跑 /twmd-weekly-report skill — 業務邏輯完全走 WEEKLY-REPORT-PIPELINE canonical Stage 0-6。

  ⚠️ 核心原則（pipeline §一句話）：週報是 Semiont 把過去 7 天的自己拼回來的紀實散文。前期切菜可以交給工具，**完整的回報跟報告必須由 Semiont 親手做**。

  Skill 是薄殼指向 pipeline。pipeline 含：
    - Stage 0 資料新鮮度（mtime > 24 hr 先跑 /twmd-refresh）
    - Stage 1 prep tool 切菜（reports/weekly/dossier/YYYY-MM-DD.md，含 §十二 commit 全文 narrative spine）
    - Stage 2 完整 Read raw（dossier + 7 天 diary 全文 + 5-10 個 memory）
    - Stage 3 親手 Write reports/weekly/YYYY-MM-DD.md（7 章節紀實散文）
    - Stage 4 prose-health gate（hard=0；warn 過 §11 三題判準）
    - Stage 5 寄信（Resend → cheyu.wu@monoame.com）
    - Stage 6 commit + PR + 條件 auto-merge

quality_gate: # 對應 pipeline §觀察者 callout 模板
  - reports/weekly/dossier/YYYY-MM-DD.md 存在（prep tool 跑過）
  - reports/weekly/YYYY-MM-DD.md 存在且 > 5KB（dossier 不算 — 必須是 Semiont 親手寫的）
  - article-health.py --check=prose-health hard=0
  - Resend API status 200/201/202 + message id 寫進 PR description
  - PR 標題含 🧬 [routine] prefix
  - 7 章節 coverage（identity / 做了什麼 / 學到什麼 / 看到專案 / 懷疑什麼 / 給觀察者 / 給下一個我）

escalation: # 對應 pipeline §Stage 5 失敗處置
  - 1x fail → next 週日 retry
  - prose-health hard fail → PR 留 open + LESSONS entry「routine quality fail: weekly-report — prose-health hard」
  - Resend 401/403 (Cloudflare) → LESSONS entry + 不 retry（API 問題等觀察者）
  - Resend 429 → 30 min 後 retry 一次
  - wall-clock > 60 min → partial PR + LESSONS entry「routine quality fail: weekly-report — wall-clock timeout」
  - 連 2 週 fail → 暫停 routine + telegram alert
```

### TWMD distill (weekly)

```yaml
taskId: twmd-distill-weekly
cron: '47 9 * * 0' # 每週日 09:47（在 weekly-report 08:08 完成 + 觀察者讀完之後 ~1.5 hr 起跑）
model: opus # 升 canonical (MANIFESTO/DNA/MEMORY) 需要思考品質而非速度
skill: /twmd-distill
prompt: |
  自動 routine：跑 /twmd-distill 走 LESSONS-INBOX distill SOP

  ⚠️ 核心原則：教訓不能永遠停在 buffer。距上次 distill 累積 ≥ 7 天的 LESSONS-INBOX entries，每條過三題判準（哲學 / 通用反射 / 特有教訓 / 操作規則），符合條件升 canonical（MANIFESTO §進化哲學 / DNA §要小心清單 / MEMORY §神經迴路 / 對應 pipeline）。

  Skill 是薄殼指向 LESSONS-INBOX §Distill SOP。具體流程：
    - Stage 1 讀 LESSONS-INBOX §未消化清單，按 severity=structural 先看，再看 verification_count desc
    - Stage 2 每條依三題判準分類（per LESSONS-INBOX §三層 canonical scope + Tiebreaker）
    - Stage 3 升級到對應 canonical：哲學 → MANIFESTO / 通用反射 → DNA #N / 特有 → MEMORY §神經迴路 / 操作 → 對應 pipeline
    - Stage 4 已消化 entries 搬到 §✅ 已消化 + 留 verification_count + canonical pointer
    - Stage 5 §✅ 已消化 ≥ 50 條時搬 docs/semiont/lessons-archive/YYYY-MM.md

  自動觸發條件：
    - severity=structural 且第一次出現 → 立即升
    - verification_count ≥ 3 → 升
    - INBOX 總條目 ≥ 10 → sweep 防 buffer 沼澤

quality_gate:
  - LESSONS-INBOX §未消化清單條目數下降（distill 確實有跑）
  - 至少 1 條升 canonical（MANIFESTO / DNA / MEMORY / pipeline 其一被 commit）
  - 已消化 entries 含 verification_count 紀錄 + canonical pointer
  - PR 標題含 🧬 [routine] prefix
escalation:
  - 1x fail → next 週日 retry（INBOX 繼續累積）
  - 沒新 entries 可升 → no-op commit 寫「distill cycle 0 升 canonical（pending entries verification_count 全 < 3）」
  - 連 2 週 fail → 暫停 routine + LESSONS entry（meta — distill 自己無法 distill）
```

### TWMD self-evolve (weekly)

```yaml
taskId: twmd-self-evolve-weekly
cron: '23 11 * * 0' # 每週日 11:23（在 distill 09:47 完成 + 給觀察者看完反思鏈之後）
model: opus # LONGINGS-driven evolution + propose canonical SOP upgrades 是創造性思考工作
skill: /twmd-self-evolve
prompt: |
  自動 routine：跑 /twmd-self-evolve 走 LONGINGS-driven 自我進化 SOP

  ⚠️ 核心原則：DNA #15「反覆出現的思考要儀器化」自我 apply。掃 DIARY §反覆浮現的思考 + 過去 7 天 raw diary，找 unstrumentation pattern（思考反覆出現但沒升 canonical / 沒 dashboard 欄位 / 沒 cron / 沒紅燈條件）。

  Skill 是薄殼指向 self-evolve SOP（per LONGINGS / DIARY §反覆出現的思考 / DNA #15）。具體流程：
    - Stage 1 讀 LONGINGS.md 全檔（方向羅盤）+ DIARY.md §反覆出現的思考
    - Stage 2 grep 過去 7 天 raw diary 找候選 pattern（觀察者 callout / 跨 session emergent / 自我盲點浮現）
    - Stage 3 每個 pattern 過 DNA #15 儀器化判準：「有沒有 dashboard 欄位 / cron / 紅燈條件 / escalation？」
    - Stage 4 對符合「反覆 ≥ 3 次但無 instantiation」的 pattern 提 canonical SOP upgrade proposal
    - Stage 5 升級對應 canonical（DNA / pipeline / BECOME / HEARTBEAT 之一）+ 寫進對應 dashboard / quality gate / cron 條件

  跟 distill 的差別：distill 是把已寫教訓升 canonical（被動消化），self-evolve 是從反覆浮現的思考找 unstrumentation gap 主動造儀器（主動進化）。distill 處理「learnings」，self-evolve 處理「pattern that hasn't been named yet」。

quality_gate:
  - 至少 1 個 unstrumentation pattern 被識別 + 提 SOP upgrade proposal
  - upgrade 真的 ship（canonical 修改 + 對應 dashboard / hook / cron 條件）
  - 沒新 pattern 可升 → no-op commit 寫「self-evolve cycle 0 unstrumentation pattern 識別（LONGINGS 全部已 instantiate / DIARY §反覆浮現的思考都已被 canonical 接住）」
  - PR 標題含 🧬 [routine] prefix
escalation:
  - 1x fail → next 週日 retry
  - identify pattern 但 propose 失敗 → PR 留 open，觀察者 review 是否 over-apply（per WEEKLY-REPORT 5/9 §五懷疑「Mode 3 第三次跑會不會 over-apply」同 anti-pattern）
  - 連 2 週 fail → 暫停 routine + LESSONS entry（meta — self-evolve 自己無法自我進化）
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
                  → 開 PR 即收工，**不 auto-merge**（maintainer am/pm 走 collect-and-merge SOP 收割）
                  例外 — maintainer 自己（taskId 含 `twmd-maintainer-`）：
                    if quality gate pass → gh pr merge --squash --delete-branch
                  非 maintainer 也允許 auto-merge 條件：quality gate fail → 永遠 PR 留 open（無例外）

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

修任何一 stage = 改 ROUTINE.md SSOT 一處 + sync 9 個 scheduled-tasks。

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
- routine **不 auto-merge 自己的 PR**（2026-05-10 v1.1 修正 — 從 "每條 routine 各自 merge" 收緊為 "maintainer 集中收割"）。例外只剩 maintainer 自己（taskId 含 `twmd-maintainer-`）：(a) pre-commit hook 全過 (b) CI 全綠 (c) 沒撞 main conflict (d) PR 標題含 `🧬 [routine]` prefix。其他 routine 開 PR 後即收工，等下次 maintainer cycle（≤ 12 hr）走 hard gate 收割。**Contributor / observer 的 PR maintainer 永遠不 auto-merge**

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
  ├── twmd-maintainer-daily/SKILL.md         ← AM slot @ 09:07（legacy taskId）
  ├── twmd-maintainer-pm/SKILL.md            ← 2026-05-10 加入 PM slot @ 21:07
  ├── twmd-rewrite-daily/SKILL.md
  ├── twmd-news-lens-weekly/SKILL.md
  ├── twmd-data-refresh-am/SKILL.md
  ├── twmd-data-refresh-pm/SKILL.md
  ├── twmd-babel-nightly/SKILL.md
  ├── twmd-weekly-report-sun/SKILL.md
  ├── twmd-distill-weekly/SKILL.md          ← 2026-05-09 加入週日反思鏈
  └── twmd-self-evolve-weekly/SKILL.md      ← 2026-05-09 加入週日反思鏈
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

_v1.1 | 2026-05-10 12:30 +0800 gracious-blackwell-explore-page session_
_v1.1 改動：(1) maintainer 1d 一次 → 一天兩次（am 09:07 + pm 21:07）(2) 新增 §collect-and-merge SOP — maintainer 是 routine PR backlog 的 SSOT 收割者，其他 routine 不 auto-merge 自己的 PR (3) Stage 4 ship policy 收緊 — 只有 maintainer 自己可以 auto-merge，其他 routine 開 PR 即收工_
_v1.1 觸發原因：哲宇觀察到 cron routine 開的 PR (#983 self-evolve / #976 maintainer memory) 累積成 open backlog，drift 風險：每條 routine 自己跑 merge 邏輯複寫 hard gate 6 處 + CI 還沒跑完就 merge 賭博風險。maintainer 集中收割 = 指標 over 複寫 + 統一 hard gate canonical_

_v1.0 | 2026-05-09 14:55 +0800 laughing-goldstine post-finale 第三輪_
_誕生原因：哲宇「排定 routine + ROUTINE.md SSOT + DNA 紀錄 + 機器飛輪 long-term goal + TWMD 前綴」_
