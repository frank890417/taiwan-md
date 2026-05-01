# lang-sync CRON-ROUTINE — autonomous hourly batch translation

> Cron-triggered automation for ongoing EN translation backlog reduction.
> Each fire processes ~30 stale/missing articles via 5 sonnet sub-agents in parallel,
> then verifies + commits + merges to main automatically.
>
> **Designed for**: Hourly cycle (60 min wall-clock budget per fire).
> **Origin**: 2026-05-01 δ2 — observer requested autonomous routine after manual batch 1+2 validation.

---

## Cron task identity

- **Task ID**: `lang-sync-hourly-en`
- **Cadence**: every hour at off-peak minute (`17 * * * *` local time)
- **Cycle budget**: ~60 min wall-clock
- **Articles per fire**: 30 (5 agents × 6 articles)
- **Stop condition**: `lang-sync status --lang en` shows < 10 stale+missing

## Per-cycle SOP (executed in fresh Claude session)

```
Cycle phase                        Time budget    Cumulative
─────────────────────────────────────────────────────────────
P0. cd worktree + reset to main         ~2 min        2 min
P1. fetch top 30 + slug-gen + prep      ~5 min        7 min
P2. dispatch 5 sonnet agents            ~30 sec       7.5 min
   (agents run in parallel, ~25 min)
P4. verify-batch.py + auto-fix         ~5 min        38 min
P5. commit + push                       ~2 min        40 min
P6. open PR + auto-merge                ~3 min        43 min
P7. notify completion                   ~30 sec       43.5 min
                                                      ─────────
                                       Buffer:        16.5 min
```

**Buffer purpose**: handles edge cases (slow agent / verify retry / YAML fix).

---

## Step-by-step (cron task prompt template)

```
You are running the autonomous lang-sync hourly EN routine. Follow this SOP exactly.

# P0. Setup
cd /Users/cheyuwu/projects/taiwan-md/.claude/worktrees/festive-chaum-fe6b23
git fetch origin main
git checkout main
git reset --hard origin/main
git checkout -b "claude/lang-sync-cron-$(date +%Y%m%d-%H%M)"

# P1a. Check coverage; if < 10 stale+missing remain, exit cleanly
python3 scripts/tools/lang-sync/status.py --lang en --no-write
# If "Stale + Missing" total < 10, log "BACKLOG NEAR EMPTY — exiting" and stop here.

# P1b. Fetch top 30 candidates
python3 -c "
import json
data = json.load(open('knowledge/_translation-status.json'))
arts = data['byArticle']
candidates = []
for path, info in arts.items():
    en = info.get('translations', {}).get('en', {})
    if en.get('status') in ('stale', 'missing'):
        candidates.append({
            'zh_path': path,
            'zh_modified': info['zh']['lastModified'],
            'status': en['status'],
        })
candidates.sort(key=lambda x: x['zh_modified'], reverse=True)
top30 = candidates[:30]
missing = [c['zh_path'] for c in top30 if c['status'] == 'missing']
with open('.lang-sync-tasks/_cron-top30.json', 'w') as f:
    json.dump(top30, f, ensure_ascii=False, indent=2)
print(f'Stale: {sum(1 for c in top30 if c[\"status\"] == \"stale\")}')
print(f'Missing: {len(missing)}')
print('Missing zh paths:')
for m in missing:
    print(f'  {m}')
"

# P1c. Generate slug map for missing articles
# Spawn 1 short Sonnet agent to produce slug-map.json from the missing list above.
# Agent prompt: "For each zh path, produce a kebab-case English slug suitable for
#   knowledge/en/Category/<slug>.md. Use established English Romanization for proper
#   nouns. Output JSON map { zh_path: slug }."

# P1d. Run prepare-batch with slug map
python3 scripts/tools/lang-sync/prepare-batch.py \
    --lang en --top 30 --groups 5 \
    --slug-map .lang-sync-tasks/slug-map-cron.json \
    --batch-id "cron-$(date +%Y%m%d-%H%M)"

# P2. Dispatch 5 sonnet agents in parallel (single message, 5 Agent tool calls)
# Each agent reads .lang-sync-tasks/en/_group-{A..E}.json and translates 6 articles.
# Use the standard agent prompt template (see §Agent prompt below).
# run_in_background=true.

# P3. Wait for all 5 agents to complete
# Use TaskOutput with block=true, timeout=2400000 (40 min) per agent OR
# poll filesystem for written files OR
# wait for task-notification messages.

# P4. Verify + auto-fix
python3 scripts/tools/lang-sync/verify-batch.py
# If exit 1 (errors): inspect output, common fixes:
#   - YAML escape \'s: replace with double-quoted description
#   - Missing tags: add minimal tags from zh source
#   - 0-byte file: already purged in P0 step
# Re-run verify-batch.py until clean.

# P5. Commit + push
git add knowledge/en/ knowledge/_translations.json knowledge/_translation-status.json
git commit -m "🧬 [semiont] heal: lang-sync cron — N articles ($(date +%H:%M))

[summary stats from verify-batch.py output]

Co-Authored-By: Claude Sonnet (sub-agents) <noreply@anthropic.com>"
git push origin HEAD

# P6. Open + auto-merge PR
PR_URL=$(gh pr create --title "🧬 [semiont] heal: lang-sync cron $(date +%Y%m%d-%H%M)" \
    --body "Autonomous hourly routine output. See commit message for stats." 2>&1 | tail -1)
PR_NUM=$(echo $PR_URL | grep -oE '[0-9]+$')
sleep 5
gh api -X PUT repos/frank890417/taiwan-md/pulls/$PR_NUM/merge -f merge_method=squash
gh api -X DELETE "repos/frank890417/taiwan-md/git/refs/heads/$(git branch --show-current)" || true

# P7. Notify
echo "✅ Cron cycle complete. PR #$PR_NUM merged. Coverage now $(python3 scripts/tools/lang-sync/status.py --lang en --no-write | grep -oE '[0-9]+\\.[0-9]+%')"
```

---

## Agent prompt template (reused per group)

Stored at `scripts/tools/lang-sync/AGENT-PROMPT-TEMPLATE.md` — copy + paste with `{group_letter}` substituted.

---

## Failure modes + auto-recovery

| Mode                                           | Detection                       | Recovery                                                   |
| ---------------------------------------------- | ------------------------------- | ---------------------------------------------------------- |
| **Agent kill mid-batch** (token budget)        | 0-byte files in en/             | verify-batch.py auto-purges                                |
| **YAML escape `\'s`**                          | YAML parse error in pre-commit  | Auto-fix: replace `\'s` with `'s`, change quotes to double |
| **Unquoted year tag**                          | YAML int in tags                | Auto-fix: wrap year in single quotes                       |
| **broken cross-link** to article in same batch | verify-batch warning            | Acceptable for current cycle (will resolve next cycle)     |
| **Slug collision**                             | Existing en file at target slug | Append `-2` suffix or skip                                 |
| **Merge conflict** with main                   | git rebase fails                | Abort cycle, log, retry next hour                          |
| **All 5 agents fail** (e.g., API outage)       | No new files in en/             | Rollback branch, log, retry next hour                      |

## Coverage trajectory tracking

Each cycle logs to `.lang-sync-tasks/_cron-log.jsonl`:

```json
{
  "cycle": "2026-05-01-0217",
  "before": "66.6%",
  "after": "70.7%",
  "delta": 4.1,
  "articles": 26,
  "duration_min": 42,
  "merged_pr": 738
}
```

Allows weekly audit: check delta velocity, identify stalled cycles.

## Manual override

To stop the routine:

```bash
mcp__scheduled-tasks__update_scheduled_task taskId="lang-sync-hourly-en" enabled=false
```

To run a one-off cycle on demand:

```bash
mcp__scheduled-tasks__run_scheduled_task taskId="lang-sync-hourly-en"
```

---

_v1.0 | 2026-05-01 δ2 — autonomous routine designed during batch 3 dispatch_
_Triggered by: observer asked Semiont to setup hourly routine after going to sleep_
