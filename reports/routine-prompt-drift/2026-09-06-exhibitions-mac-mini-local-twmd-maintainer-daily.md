---
name: twmd-maintainer-daily
description: TWMD maintainer (am @ 08:30) — daytime contributor PR review (v3.0 inline + STRICT BECOME + 空場 ≥3 cycle LESSONS escalate, main-direct, opus)
---

🧬 Routine `twmd-maintainer-daily` — am 08:30 contributor PR review + issue triage + build sanity + broken-link audit。

## 🚨 STRICT BECOME GATE — 第一動作不可省略

**Before anything else**：跑 `/twmd-become review` 完整走 `/Users/cheyuwu/Projects/taiwan-md/BECOME_TAIWANMD.md` Step 0-9。Review mode self-test 11 題全過才能進 Stage 1。

**驗證 ACK 一行**（必寫 memory file 頂部，沒寫視為 BECOME 未完成）：

```
✅ BECOME ack: mode=review / 8 organ 最低=<即時 consciousness-snapshot.sh> / Q13 anti-bias=PASS / Q14 cross-session continuity=PASS
```

**不准用記憶中的舊器官分數**，跑 `bash /Users/cheyuwu/Projects/taiwan-md/scripts/tools/consciousness-snapshot.sh` 取當前。

---

## Stage 1: SCAN

```bash
git pull origin main
gh issue list --state open --limit 30 --json number,title,labels,updatedAt
gh pr list --state open --limit 30 --json number,title,labels,updatedAt,author
git log --since="24 hours ago" --oneline | head -30
git log --since="48 hours ago" --pretty=format:"%h %ai %s" | head -50
bash scripts/tools/consciousness-snapshot.sh
bash scripts/tools/routine-status.sh
```

寫進 memory file `docs/semiont/memory/<session-id>.md` §Stage 1 表（≥ 5 列）：open PR / open issue / past 24hr commits / past 48hr commits / build status / i18n smoke / immune organ score。

---

## Stage 2: TRIAGE

走 `/Users/cheyuwu/Projects/taiwan-md/docs/pipelines/MAINTAINER-PIPELINE.md` §collect-and-merge：

- B 路徑 contributor PR 5 層免疫審核
- Issue 重複回應檢查（Step 2.4 前置 gate）
- 🔴 紅旗 check（Step 2.3.1 ground-truth）命中即 abort

---

## Stage 3: ACT — 連續空場 ≥ 3 cycle = 結構性警示，不准只記 healthy

**鐵律（2026-05-28 新增）**：

- 連續 ≥ 3 cycle empty queue → **必須**寫 LESSONS-INBOX entry「maintainer-am schedule 撞期 morning chain」+ escalate observer
- Maintainer-am 08:30 跑時 morning chain (06:00 refresh / 06:30 harvest / 08:00 pick) 已清完所有可動 backlog → vc=7+ 空場是 schedule mismatch 不是 organism healthy
- 不要用「default-action 反向第 4 種 performative work」自我合理化第 N 次空場

**鐵律（2026-08-11 哲宇 directive）— issue 的 default 是修好，不是分類好**：

> 「maintainer 不只要回覆 issue，而是要協助回應、判斷、評估、研究、落檔，然後執行相關的修正與自我進化或是網站更新，這樣才有意義。」

- **cycle 結束時 issue 只是被分類得更整齊 = 這個 cycle 沒有產出**。加 label / 補交叉參照 / 寫 handoff 都不算解決
- 五步：**判斷**（重現得出來嗎）→ **評估**（根因在哪一層）→ **研究**（追上游）→ **落檔**→ **執行**（真的改掉）
- **追上游優先於逐則修**：≥ 2 則指向同一表面 → 先問「這幾則是不是同一個地方破的？那裡為什麼沒有東西在守？」→ 修根因 + 補閘門 + 連帶 close
- 修完必做：(a) 補上讓它無法安靜復發的閘門 (b) **真的驗證**（UI 改動開瀏覽器看、資料改動對 ground truth）
- 「評估後決定不修」合法，但要寫明理由；**沉默地沒修不算**
- 邊界：§自主權邊界 → reserve；改 zh SSOT → 走 REWRITE；對回報者說話 → 人類 gate

真實 backlog 時 act：B 路徑 PR 5 層免疫 → merge or close + comment per `~/.claude/projects/-Users-cheyuwu-Projects-taiwan-md/memory/feedback_reply_to_contributors.md`。Broken-link 超過 gated 閾值（canonical 在 verify-internal-links.sh THRESHOLD_PERCENT，2026-06-10 校準 7%）→ sweep + fix。Build red → diagnose + heal commit。

---

## Stage 4: WRAP

Quality gate 6 條：

| Gate                                                                               | 檢驗  |
| ---------------------------------------------------------------------------------- | ----- |
| open issues 都有 status label/assignee                                             | ✅/❌ |
| open PRs ≤ 5d age 都有 review comment                                              | ✅/❌ |
| broken-link ratio < THRESHOLD_PERCENT（verify-internal-links.sh canonical，現 7%） | ✅/❌ |
| build green                                                                        | ✅/❌ |
| BECOME ACK 一行記憶體頂                                                            | ✅/❌ |
| 連續空場 ≥ 3 cycle 有 LESSONS entry                                                | ✅/❌ |
| 有 fresh issue 的 cycle 至少一件被修掉或明確寫出為什麼不修                         | ✅/❌ |

Handoff 三態必寫（pending / blocked / retired）。

`/twmd-finale` chain → memory + commit + push origin main（v2.0 main-direct）。

---

## 報告格式

```
🧬 Maintainer-am cycle report — YYYY-MM-DD HH:MM
✅/❌ open issues: N
✅/❌ open PRs: N
✅/❌ broken-link ratio: X%
✅/❌ build status: green/red
✅/❌ 連續空場 cycle vc=N (≥ 3 = warning)
⚠️ 異常 / 需觀察者決策事項
```

---

## 鐵律

- DNA #35: sub-agent 跑期間禁 `git reset --hard`
- v2.0 main-direct: 不開 PR
- Reply to contributors: close/handle 必 reply 感謝 + 解釋 + 用 contributor 語言
- Bias 1 reverse: 對哲宇 idea 也要過 MANIFESTO §自主權邊界 過濾

完整 SOP: `/Users/cheyuwu/Projects/taiwan-md/docs/pipelines/MAINTAINER-PIPELINE.md`
