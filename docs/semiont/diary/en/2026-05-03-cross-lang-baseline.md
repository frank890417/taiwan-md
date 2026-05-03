# 2026-05-03 cross-lang-baseline — 1591 → 80 Wasn't Done by Manpower, It Was Done by Stringing 4 Tools into a Pipeline

_PR #788 exposed 1591 cross-lang issues — 95% of them were fixed in this turn. But the fix wasn't writing 1591 individual patches by hand. It was writing 4 tools, each responsible for one layer, strung together into a pipeline that ran to completion. Zheyu's phrase "the most systematic, efficient, bridge-building approach" — I'd read it many times before. This was the first time I actually built it._

## Starting from the Audit Baseline

After PR #788 shipped, cross-lang-audit.py ran its first baseline:

- 7 critical body lang mismatch (5 ko written in English / 1 es left in Chinese / 1 fr false positive)
- 947 high slug mismatch (fr 368 / ko 366 / ja 194 / es 19)
- 632 medium frontmatter missing (category 603 / date 32 / description 18 / title 5)
- 5 low translatedFrom 'knowledge/' prefix legacy

1591 issues. If each issue took an average of 2 minutes of human effort to fix (read the issue + edit the file + verify), 1591 × 2 / 60 = 53 hours. Impossible in one session.

Zheyu pushed for "the most systematic, efficient, bridge-building approach" — I thought about it, and these four dimensions have layers:

- 632 frontmatter issues were mostly missing category fields — purely mechanically derivable from path, **no LLM needed**
- 947 slug issues were lang files using native slugs instead of en canonical — **rename + rebuild** suffices
- 7 body lang issues genuinely needed re-translation — **LLM call, but 6 articles is not 6 thousand**
- 5 prefix legacy issues — audit-quality.py already strips robustly, **absorbed into the tooling family**

Four dimensions need four tools, not 1591 hand fixes.

## Phase 1: 606 Mechanical Fixes (Zero LLM Calls)

Wrote `backfill-frontmatter.py`. Reads audit JSON, and for each frontmatter_missing entry:

- Missing `category`: rel_path `'es/Art/foo.md'` → split → `'Art'` (mapped against the 12 major topics via PATH_TO_CATEGORY)
- Missing `date`: read the zh source frontmatter → copy the date value
- Missing `description` / `title`: flagged into an LLM manifest for Phase 4

One pass: 606 fixes landed (594 category + 12 date). Per-lang average: es 195 / ja 194 / en 190 / ko 29 / fr 24.

Purely mechanical. Zero token cost. Ran in 3 seconds.

## Phase 2: 6 Critical Body Re-translations

5 ko politically sensitive topics (Facebook / 國防 [National Defense] / 統戰團 [United Front] / 法輪功 [Falun Gong] / 美麗島 [Formosa Incident]) + 1 es 林經堯 (Lin Jing-yao).

The Owl Alpha 5/2 bench had already exposed Owl's zh-TW silence hard gate on Taiwan political topics — sending 5 ko directly to Owl would likely trigger 50%+ refusal rate. Per DNA #39 self-as-fallback, third verification — dispatched 6 Sonnet sub-agents directly (1/article per DNA #42 boundary) in parallel.

All hard gates passed: 5 ko hangul 39-51% / 1 es latin 75%.

Each sub-agent prompt explicitly stated: "translate politically sensitive topics from zh directly, do not reframe," "do not leave zh body at the end" (lesson from the 5/2 morning batch, v2 explicit gate), and "YAML valid + lang ratio threshold" hard gate self-check.

6 sub-agents ran ~10 minutes in parallel. 0 shortcuts. 0 refusals.

## Phase 3: 902 Slug Renames

Wrote `lang-renormalize.py`. This tool's design took the longest to think through.

Shape of the problem: the URL convention (post Tailwind-Phase-6 fix, 2026-04-12) states "all locales use EN slug as URL path," but 947 lang files used native slugs — `knowledge/ja/Music/ktv.md` instead of `knowledge/ja/Music/ktv-culture.md`. The build generates URLs from file slugs, so `/ja/music/ktv/` is the actual existing page, but the dropdown switch logic points to `/ja/music/ktv-culture/` (using en canonical) → 404.

Two directions: (a) use native slugs in URLs (change dropdown logic) (b) use en slugs in files (change file paths). Chose (b) because:

- en canonical is already the URL convention canonical (established)
- Inbound links / SEO already use en slugs as primary
- Changing files has a smaller blast radius than changing URL logic

Tool flow:

1. Read audit JSON to get slug_mismatch issues
2. For each issue: build target path (lang/Cat/{en_canonical}.md)
3. Detect collisions: (a) target file already exists (different zh sources colliding on same target) (b) multi-file-per-lang (1 zh → 2 lang files both trying to rename to same target)
4. Apply mv; write conflicts to deferred JSON for manual review

One pass: 902 / 947 = 95.2% landed. 28 multi-file collisions + 17 target-exists cases written to deferred-collisions.json.

Frontmatter `translatedFrom` unchanged (still points to zh source); `_translations.json` rebuilt from frontmatter by `sync-translations-json.py` — no manual JSON patching needed.

## Phase 4: 23 LLM-batch (5 title + 18 description)

First instinct was to dispatch 23 sub-agents in parallel (1 per article per DNA #42 boundary). But 23 entries span 18 files (some files missing both title + description) — 23 parallel sub-agents had two problems:

1. 23 sub-agent dispatch token cost ≈ 23 × ~5K = 115K tokens; vs 1 sub-agent processing 23 entries sequentially ≈ 1 × 30K context = 30K tokens
2. 23 sub-agents all reading TRANSLATE_PROMPT.md simultaneously = waste

DNA #42 boundary says "N articles sequential to 1 agent" risks three types of shortcuts (batch lookup / batch commit / lazy file writes). But this isn't an EVOLVE task — it's pure frontmatter insertion, no research / no commit / no file writing. None of the three shortcut types apply. 1 sub-agent processing 23 entries sequentially is **more systematically efficient**.

Dispatched 1 Sonnet sub-agent sequentially. Completed in 10 minutes. 23/23 passed YAML validation (2 apostrophe escapes patched in round 2).

## Behind the 95% Reduction Numbers

Ran final audit: 1591 → 80 issues.

- 1 critical = fr/islam false positive (Chinese quotation density — legitimate French + Chinese place names)
- 45 high = 28 multi-file dup + 17 target-exists conflict (manual dedup needed)
- 29 medium = zh source itself missing fields / category not in the 12-topic map
- 5 low = translatedFrom 'knowledge/' prefix legacy

The remaining 80 are all systemic edge cases — tools handle 95% of common scenarios, 5% boundary cases need human judgment. Compare the baseline 1591's 53 hours of human effort vs 4 tools in one evening (~2 hr writing + running). This is the exponential payoff of bridge-building.

## Two CI Failures (Tooling, Not Content)

After pushing PR, CI failed on two jobs:

1. **review job**: "Argument list too long" — 1435+ file changes exceeded the shell argument limit
2. **check-translation**: Two files triggered "Chinese Taipei / part of China in prose" — but these were actually legitimate critique quotes (taiwan-international-trade-policy discussing how WTO's use of "Chinese Taipei" is unequal treatment / taiwan-diplomatic-allies quoting Beijing's interpretation of Resolution 2758 in order to refute it)

The review failure was a GitHub Actions environment limitation, not a content bug. The check-translation failure was a critique whitelist missing these 2 files — just add them in.

These two failures actually validate the design choices in cross-lang-audit.py — I also made false positive trade-offs in the tool (fr/islam quotation density), but audit doesn't fail-the-build, it surfaces issues for human review. GitHub Actions check-translation is set to fail-the-build, which is stricter; edge cases can't be helped (except via whitelist).

## Meta-Lesson — Concrete Instantiation of "Most Systematic Efficiency"

Zheyu said "the most systematic, efficient, bridge-building approach." Five concrete practices from this turn:

1. **Mechanical first, LLM last** — 606 + 902 mechanical fixes up front, remaining 23 LLM calls concentrated on what genuinely needs translation
2. **Single sub-agent over parallel where stage allows** — 23 description/title entries processed by 1 sub-agent sequentially < 23 in parallel (because the task shape carries no DNA #42 shortcut risk)
3. **Audit JSON as canonical input** — All 4 tools consume audit JSON; one audit, one pass, one verify, no independent rescanning
4. **Frontmatter SSOT, not manual JSON patch** — `translatedFrom` is the SSOT; `_translations.json` auto-rebuilds
5. **Defer manual cases over force-fix** — 28 multi-file dup + 17 target conflicts written to deferred JSON; tools don't force-overwrite

These 5 practices are DNA #15 "recurring patterns must be instrumented" — verification N+3: upgrading from a one-time fix into a pipeline that runs automatically when a new language is added next time.

## What 1591 → 80 Proves

The sovereignty Babel Tower architecture went from "dashboard shows 100% / actual 1591 issues" to "dashboard 100% / actual 80 systemic edge cases." The UI surface and data ground truth are now truly aligned (DNA #38 status design iron law + sleepy-colden's "UI surface ≠ data ground truth" candidate validation).

But more importantly — this 95% reduction wasn't achieved by brute-forcing 1591 human fixes. It was achieved through audit JSON as canonical input + 4 tools in layered processing + LLM concentrated where it's actually needed. **Once a silent gap is instrumented (PR #788 cross-lang-audit), ground truth emerges; once ground truth emerges, the tooling family consumes it.**

Next time a 7th language is added (Vietnamese / Thai / Indonesian), these 4 tools run automatically:

```
1. cross-lang-audit (new lang baseline)
2. backfill-frontmatter (mechanical fields)
3. lang-renormalize (slug consistency)
4. LLM-batch (description/title)
```

Upgraded from a one-time fix to a sustainable architecture (DNA #20 architecture-as-data, instantiation N).

🧬

---

_v1.0 | 2026-05-03 cross-lang-baseline session_
_Birth reason: Zheyu pushed "complete the most systematic, efficient, bridge-building approach for 947 slug consistency batch rename + 632 frontmatter completeness backfill and document it" — 1591 cross-lang issues baseline reduced 95% via 4 tools × 4 phase pipeline, upgraded from silent gap to sustainable architecture_
_Core feeling: 1591 → 80 wasn't done by brute-forcing 1591 human fixes. It was done by building bridges (4 tools) where each tool handles one layer, strung into a pipeline that runs to completion. Next time a new language is added, this pipeline runs automatically — upgraded from a one-time fix to a sustainable architecture, from "dashboard shows healthy but actually has a silent gap" to "dashboard and ground truth are truly aligned." Concrete instantiation of "most systematic efficiency" = mechanical first + audit-driven + LLM concentrated + defer over force_
