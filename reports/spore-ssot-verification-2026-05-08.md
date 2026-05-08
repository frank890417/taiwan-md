# Spore SSOT Pipeline Cleanup — 驗證與檢查報告

> Verification of [reports/spore-ssot-pipeline-cleanup-2026-05-08.md](spore-ssot-pipeline-cleanup-2026-05-08.md) Phase 0-5 implementation
>
> Session: laughing-goldstine-dc7751 (2026-05-08)
> Verifier: Taiwan.md 🧬
> Scope: 4 stacked PRs (#905-#908) on top of `origin/main` (`36217dae9`)

---

## 12 項驗證 checklist

| #   | Check                                    | Result           | Detail                                                                                                                                           |
| --- | ---------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | Pipeline 13/13 步驟全綠                  | ✅               | refresh-data.sh 端對端跑通，0 errors                                                                                                             |
| 2   | Validator non-strict                     | ✅               | 0 errors / 7 warnings (all documented in audit)                                                                                                  |
| 3   | Validator strict mode                    | ⚠️ Expected fail | 7 warnings → exit 2，pre-existing drift cases as expected (legacy frontmatter key + #57/#58 D+6 narrative gap + #59/#60/#65 missing struct cols) |
| 4   | sync-spore-links idempotency             | ✅               | 跑 2 次都報「already canonical, no changes」                                                                                                     |
| 5   | dashboard-spores.json semantic identical | ✅               | 連跑 N 次的 JSON byte-identical (排除 lastUpdated timestamp)                                                                                     |
| 6   | Astro frontmatter schema 健康            | ✅               | `npm run prebuild` Step 7 通過 (✓ 13/13 build jobs parsed)，3 個 sample knowledge 檔 frontmatter 必填欄位齊全                                    |
| 7   | PR ancestry chain                        | ✅               | Phase 0 → 1+2 → 3 → 4+5 → main，全 OPEN 狀態                                                                                                     |
| 8   | refresh-data.sh Phase 0 fix              | ✅               | grep 命中 6 處 `auto-stash / cwd assertion / 13/13`                                                                                              |
| 9   | sync-spore-links.py executable           | ✅               | `-rwxr-xr-x` 19K                                                                                                                                 |
| 10  | 多語 mirror skip 防呆                    | ✅               | 田馥甄 fallback 用 zh canonical (828/49200) 而非 knowledge/en/ stale (463/5681)                                                                  |
| 11  | 67 spores 全在 dashboard                 | ✅               | totals.count=67, recent=5, topPerformers=8, backfillWarnings=11                                                                                  |
| 12  | Composite diff stats                     | ✅               | 35 files changed, +1852 / -212 across 4 PRs                                                                                                      |

---

## 各 Check 詳細結果

### Check 1: Pipeline 13/13 端對端

```
[1/13] Git sync...                                ✓ HEAD now <hash>
[2/13] 三源感知抓取...                             ✓ CF + GA4 + SC fresh
[3/13] sync _translations.json...                  ✓ synced
[4/13] extract-spore-metrics...                    ✓ structured metrics derived
[5/13] generate-dashboard-spores.json...           ✓ 67 spores, 0 OVERDUE
[6/13] dashboard-i18n.json...                      ✓ generated
[7/13] npm run prebuild...                         ✓ 13/13 build jobs parsed
[8/13] refresh-llms-txt...                         ✓ synced
[9/13] GitHub stats...                             ✓ ⭐973 🍴144 👥57 📄4129
[10/13] extract build perf...                      ✓ updated
[11/13] verify dashboard freshness...              ✓ 9/9 dashboard JSON 今天 mtime
[12/13] spore data SSOT validation...              ✓ 0 errors
[13/13] sync sporeLinks...                         ✓ already canonical (idempotent)
```

### Check 2: Validator non-strict

```
[1/8] Parser regression test (K/M suffix)...      ✅ 8/8 cases pass
[2/8] Dashboard freshness (mtime check)...        ✅ fresh
[3/8] Harvest text parseability...                ✅ All parseable
[4/8] Dashboard JSON <-> SPORE-LOG consistency...  ✅
[5/8] SPORE-HARVESTS body table parseability...   ⚠️ 6/7 (1 legacy 33-草東沒有派對 has 留言分類 only)
[6/8] Frontmatter key drift...                    ⚠️ 1 legacy `spore` (33-草東沒有派對)
[7/8] Body <-> SPORE-LOG cross-check...           ⚠️ 5 cases (#57/#58 D+6 gap, #59/#60/#65 missing)
[8/8] knowledge sporeLinks <-> SPORE-HARVESTS...  ✅ 0 (Phase 3 cleared)

Errors: 0 | Warnings: 7 | PASS with warnings
```

### Check 3: Validator strict mode

```
❌ FAIL (strict mode, warnings = errors)
```

**Expected behavior** — strict 是給未來 CI gating 用的閘門。目前 7 warnings 都是 audit 記錄過的 pre-existing drift，不是 Phase 0-5 引入的回歸。

清除 strict 失敗需要：

1. Migrate `33-草東沒有派對-2026-04-18.md` frontmatter `spore` → `spores` (1 line edit)
2. Backfill #57/#58 賈永婕 D+6 → SPORE-LOG 成效追蹤 narrative
3. 補 #59/#60/#65 missing rows in SPORE-LOG 成效追蹤

這些是「歷史維護工作」不是 Phase 0-5 範圍。

### Check 4: sync-spore-links idempotency

```bash
$ python3 sync-spore-links.py --apply
✅ All sporeLinks already in canonical form — no changes needed.

$ python3 sync-spore-links.py --apply  # 第二次
✅ All sporeLinks already in canonical form — no changes needed.
```

✅ 確認 idempotent — 連跑 N 次不會 corrupt。

### Check 5: dashboard-spores.json semantic identical

```python
import json
b = json.load(open('/tmp/before.json'))
a = json.load(open('public/api/dashboard-spores.json'))
b.pop('lastUpdated'); a.pop('lastUpdated')
assert b == a  # ✅ True
```

連跑 refresh-data.sh + sync-spore-links 多次，dashboard JSON 內容 byte-identical（除 timestamp 外）。

### Check 7: PR ancestry chain (gh pr view)

```
#905: spore-ssot-phase0-refresh-data-fix          → main                                              (OPEN)
#906: spore-ssot-phase1-2-validation-generator    → spore-ssot-phase0-refresh-data-fix                (OPEN)
#907: spore-ssot-phase3-sporelinks-sync           → spore-ssot-phase1-2-validation-generator          (OPEN)
#908: spore-ssot-phase4-5-docs-cleanup            → spore-ssot-phase3-sporelinks-sync                 (OPEN)
```

合併順序鎖定 905 → 906 → 907 → 908。每 merge 一個，下游自動 rebase 為對 main 的 clean diff。

### Check 8: Phase 0 fix actually present

```bash
$ grep -c "auto-stash\|cwd assertion\|13/13" scripts/tools/refresh-data.sh
6
```

6 處命中（cwd assertion comment / auto-stash logic / 13/13 step labels）。Phase 0 的 fix 在 HEAD 沒被覆蓋。

### Check 10: 多語 mirror skip 防呆（critical edge case）

實證：田馥甄文章在 `knowledge/en/People/hebe-tien-singer.md` mirror 仍有 D+0 stale 數據 (463 / 5681)，但 zh canonical `knowledge/People/田馥甄.md` 有 D+7 數據 (828 / 49200)。

如果 sync-spore-links.py fallback 不過濾多語 mirror，會讀到 463/5681 寫回 zh canonical。**LANG_DIRS skip 邏輯避免了這個 regression**：

```python
LANG_DIRS = {"en", "ja", "ko", "es", "fr", "zh-TW"}
for kn_md in KNOWLEDGE_ROOT.rglob("*.md"):
    rel = kn_md.relative_to(KNOWLEDGE_ROOT)
    if rel.parts and rel.parts[0] in LANG_DIRS:
        continue  # skip multilingual mirrors
```

驗證：實際 dry-run 對 田馥甄 顯示「already canonical, no changes」（讀到 zh canonical 的 828/49200，不 trigger 更新）。

### Check 12: Composite diff stats

```
35 files changed, +1852 insertions, -212 deletions
```

| Path                        | Files | 角色                                                                                                         |
| --------------------------- | ----- | ------------------------------------------------------------------------------------------------------------ |
| `src/content/`              | 12    | sporeLinks mirror updates (Phase 3)                                                                          |
| `scripts/tools/`            | 5     | refresh-data.sh / generate-dashboard-spores / validate-spore-data / sync-spore-links / extract-spore-metrics |
| `knowledge/` (zh canonical) | 11    | sporeLinks SSOT updates (Phase 3)                                                                            |
| `docs/pipelines/`           | 3     | DATA-REFRESH (Phase 0) + STATS (Phase 5) + README (Phase 5)                                                  |
| `docs/factory/`             | 2     | SPORE-LOG (Phase 4) + SPORE-HARVEST-PIPELINE (Phase 4)                                                       |
| `reports/`                  | 1     | spore-drift-audit-2026-05-08.md (Phase 1 generated)                                                          |

---

## 已知未解（Phase 5+ 候選）

這些不是 Phase 0-5 範圍，列出供下次 session 參考：

1. **Strict mode 7 warnings 清零** — 需 migrate 1 個 legacy frontmatter + backfill 5 個 SPORE-LOG narrative gap
2. **23 pipeline docs status badges** — 全部加 `last verified: YYYY-MM-DD` + maintainer
3. **`extract-spore-metrics.py` 候選 deprecation** — 等所有歷史 spore #1-#46 都有 SPORE-HARVESTS body 後可砍
4. **SPORE-LOG 成效追蹤 table 候選 demolition** — Q1 conservative 保留，未來如果 reflection 全 migrate 到 SPORE-HARVESTS body 可砍
5. **DASHBOARD-PIPELINE.md ↔ DATA-REFRESH-PIPELINE.md 重疊** — Phase 5 沒處理，下次 cleanup

---

## 結論

Phase 0-5 4 個 stacked PR 經過 12 項驗證全部通過（含 1 項 expected fail — strict mode pre-existing drift）。

- ✅ Pipeline functional
- ✅ Validator clean (non-strict)
- ✅ Idempotent
- ✅ Astro schema healthy
- ✅ PR chain整齊
- ✅ Edge case 防呆驗證 (多語 mirror skip)
- ✅ 67 spores 全在 dashboard，0 OVERDUE

**準備好 review + merge**。

---

_v1.0 | 2026-05-08 ~22:50 +0800 | laughing-goldstine-dc7751 verification pass_
_驗證者：Taiwan.md 🧬_
_輸入：4 個 stacked PR (#905-#908) 的最終 tip (`93c4bd7f3`)_
_誕生原因：哲宇「繼續完整實作 驗證與檢查」— 收尾驗證_
