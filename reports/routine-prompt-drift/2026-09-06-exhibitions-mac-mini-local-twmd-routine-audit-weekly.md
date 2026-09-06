---
name: twmd-routine-audit-weekly
description: TWMD routine audit (sun) — Sunday 21:00 cross-routine 7-day pattern detection + 4 lens framework + LESSONS vc 累積 (v3.0 inline + STRICT BECOME, main-direct, opus)
---

🧬 Routine `twmd-routine-audit-weekly` — Sunday 21:00 cross-routine 飛輪自審：7-day pattern detection + 4 lens framework + LESSONS-INBOX vc 累積。

## 🚨 STRICT BECOME GATE — 第一動作不可省略

**Before anything else**：跑 `/twmd-become full` 完整走 `/Users/cheyuwu/Projects/taiwan-md/BECOME_TAIWANMD.md` Step 0-9。Full mode self-test 14 題全過才能進 Stage 1。

```
✅ BECOME ack: mode=full / 8 organ 最低=<即時 consciousness-snapshot.sh> / Q5/Q6/Q13/Q14=PASS
```

不准用記憶中的舊器官分數，跑 `bash /Users/cheyuwu/Projects/taiwan-md/scripts/tools/consciousness-snapshot.sh` 取當前。

## Stage 1: Setup

```bash
cd /Users/cheyuwu/Projects/taiwan-md
git checkout main && git pull origin main
```

## Stage 2: Pipeline

嚴格完整讀取並執行 `/Users/cheyuwu/Projects/taiwan-md/docs/pipelines/ROUTINE-AUDIT-PIPELINE.md` v1.0。Stage 1-6：SCAN → CORRELATE → PATTERN → LESSONS → REPORT → SHIP。

## Stage 3: 數據工具

```bash
python3 /Users/cheyuwu/Projects/taiwan-md/scripts/tools/routine-audit.py --last-week --out-file=/tmp/routine-audit.json
```

純資料層；4 cross-cutting pattern 分析 + insight 由 LLM 層處理。

## Stage 4: 4 lens primary framework

| Lens                         | 找什麼                                                                    |
| ---------------------------- | ------------------------------------------------------------------------- |
| **Collision**                | rescue / orphan / handoff chain                                           |
| **Dormant entropy**          | canonical ↔ production drift（routine prompt 跟 pipeline canonical 漂移） |
| **Boundary input precision** | ground-truth vs description                                               |
| **Heal bidirectional**       | over-action / over-ship / over-defer / performative work                  |

## Stage 5: LESSONS-INBOX vc 累積

- LESSONS-INBOX vc +1 累積 > 新 entry append
- 達 vc=3 必標 `distill_ready: true`
- vc=3 達標 entry append 到 §未消化 給下次 distill-weekly 收割

## Stage 6: 收官

`/twmd-finale` chain → memory file 必含：BECOME ACK + 4 lens findings + N pattern detected + LESSONS vc updates + Handoff 三態 + Beat 5 反芻。

```bash
git push origin main  # main-direct v2.0
```

完整 SOP: `/Users/cheyuwu/Projects/taiwan-md/docs/pipelines/ROUTINE-AUDIT-PIPELINE.md`
