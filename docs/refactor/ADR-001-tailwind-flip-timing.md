# ADR-001: Flip Tailwind early (Phase 3), not late (Phase 6)

**Status**: Accepted
**Date**: 2026-04-10
**Decider**: 哲宇
**Supersedes**: Original Obsidian plan's Phase 6 preflight timing
**Affects**: Phase 3 onwards

---

## Context

The original Tailwind refactor plan (`Projects/Taiwan.md/Taiwan.md — Tailwind Refactor 完整企劃.md`) scheduled `@import 'tailwindcss'` (the "real" Tailwind import with preflight reset) for Phase 6, the second-to-last phase. The reasoning was: keep visual risk deferred, migrate components with plain CSS first, flip Tailwind only after everything else is stable.

Phases 0–2 executed cleanly under this assumption:

- Phase 0: baseline tooling
- Phase 1: extract tokens to `tokens.css`, install Tailwind + wire Vite plugin (but don't import from CSS)
- Phase 2: build a `tw-*` component class library in `@layer components` using **plain CSS** (no `@apply`), avoiding Tailwind import entirely

Phase 1 discovered empirically that `@import 'tailwindcss' source(none)` (the plan's originally suggested syntax) still injects preflight, producing ~5–12% visual diff across every page. This validated the "defer Tailwind import" strategy for the short term.

However, before starting Phase 3 (leaf component migration), 哲宇 raised a strategic question: what does it actually take to do the "ultimate refactor" — real `@import 'tailwindcss'`, atomic utilities, `@apply`, `dark:` variants, responsive breakpoints — and when should we do it?

## Decision drivers

哲宇's answers to the three forcing questions:

1. **Want dark mode?** → Yes
2. **Expect future responsive-heavy pages (dashboard / admin)?** → Yes
3. **Writing CSS or writing class soup — which hurts more?** → Writing CSS hurts more

Additional constraint: **"儘早執行這件事情，避免後續更麻煩"** — do it as early as possible, to avoid downstream rework.

Given (1) + (2) + (3), the answer is clear: we **will** flip Tailwind eventually. The only remaining question is when.

## Options considered

### Option A: Flip at Phase 3 (immediately, reordered)

Restructure Phase 3 to be "Tailwind flip + base layer rebuild" instead of leaf migration.

**Pros**:

- No double work — Phase 4 onwards can use `@apply` + atomic utilities directly
- Dark mode path unblocked by Phase 3 completion
- Responsive variants (`md:`, `lg:`) available for every subsequent migration
- Phase 2's `tw-*` library is still young; optionally rewrite it with `@apply` after the flip (~30 min)
- AI agents (Claude Code, Semiont) become much more productive because Tailwind is their native language

**Cons**:

- Phase 3 becomes higher-risk than "simple leaf migration"
- Requires rebuilding `@layer base` NOW (pulling in Phase 4 scope)
- Visual diff may show 1–5% cumulative drift during debugging before we hit zero

### Option B: Flip at Phase 4.5 (between layout shell and pages)

Keep the plan sequential: Phase 3 leaf migration with plain CSS, Phase 4 layout shell, then a new Phase 4.5 for Tailwind flip.

**Pros**:

- Lower per-phase risk
- Phase 4 naturally produces the base layer we need
- Phase 3's 14 component migrations are low-risk and quick

**Cons**:

- Phase 3 migrations use plain CSS; if we later want them to use `@apply`, that's ~14 components × ~15 min rewrite = ~3.5 hours of double work
- Dark mode delayed by another ~1–2 weeks of phase work
- If Phase 5 (pages) starts before flip, even more double work

### Option C: Flip at original Phase 6 (most conservative)

Do everything with plain CSS first, flip Tailwind last.

**Pros**:

- Minimum per-phase risk
- All migration work validated before Tailwind complexity enters

**Cons**:

- Maximum double work: Phases 3, 4, 5 all use plain CSS, then Phase 6 potentially rewrites them
- Dark mode blocked until Phase 6.5 (weeks away)
- Responsive design stays painful throughout migration
- "儘早執行" constraint violated

## Decision

**Option A — flip Tailwind at Phase 3, before leaf migration**.

This means the revised plan structure is:

```
Phase 0 — Foundation           ✅ done (merged)
Phase 1 — Design Tokens        ✅ done (merged)
Phase 2 — Component Layer      ✅ done (merged)
Phase 3 — Tailwind Flip        🆕 rebuild @layer base + enable @import tailwindcss
Phase 4 — Leaf Migration       ← formerly Phase 3
Phase 5 — Layout Shell         ← formerly Phase 4
Phase 5.5 — Typography Plugin  🆕 @tailwindcss/typography for Markdown article body
Phase 6 — Pages & Routes       ← formerly Phase 5
Phase 6.5 — Dark Mode          🆕 dark: variants + theme toggle
Phase 7 — Cleanup + Docs       ← formerly Phase 6 cleanup + Phase 7 docs combined
```

### Why this ordering specifically

The key insight: **Phase 4's "Layout Shell" work is mostly about moving `Layout.astro`'s global `<style is:global>` block into `@layer base`**. This is also the exact work required to flip Tailwind safely (because the base layer must compensate for preflight removal of heading sizes, list bullets, link colors, etc.).

So instead of doing it twice (once in Phase 4, once in Phase 4.5 again), we **combine them into Phase 3**: rebuild the base layer + flip Tailwind in one phase. The leaf migration (formerly Phase 3) becomes Phase 4 and benefits from having real Tailwind available from day one.

## Consequences

### Positive

- **Zero double work**: every `@layer components` class written from Phase 4 onwards can use `@apply`; every leaf migration can use atomic utilities
- **Dark mode unblocked**: once Phase 3 ships, `dark:` variants work immediately
- **Responsive variants available**: `md:grid-cols-2` etc. can ship in any future component
- **AI agent productivity boost**: Claude Code, Semiont, etc. all know Tailwind fluently
- **@tailwindcss/typography plugin** becomes available for article body styling (Phase 5.5)
- **Long-term ecosystem lock-in**: project aligns with the dominant CSS framework (docs, hiring, community, templates)

### Negative

- **Phase 3 is now the highest-risk phase** of the entire refactor (it touches preflight, base layer, and every page's global styles in one go)
- **Requires most rigorous visual diff verification** of any phase so far — probably 2–4 rounds of diff-fix-diff before hitting zero regression
- **HTML will gradually become more verbose** as atomic utilities proliferate. Must be disciplined about pulling repeated patterns into `@layer components` with `@apply` rather than letting class soup grow unchecked
- **Tailwind v4 → v5 migration cost** eventually (every ~18 months): estimate 1–2 days per major version bump
- **Cognitive load shifts**: from "where is this CSS" (Phase 1–2 solved this) to "what does this class combination do" (Tailwind fluency required)

### Neutral

- **Class name collisions must be audited** before flipping: `container`, `prose`, `btn`, `card` are all candidates for conflict. Grep audit is part of Phase 3 Stage 0.
- **Bundle size**: estimated +20–40 KB CSS gzip-unfriendly, +5–10 KB gzipped. Negligible for a content site with aggressive caching.
- **Phase 2's plain-CSS `tw-*` library remains valid**. Optionally rewrite with `@apply` in Phase 3's final commit for consistency. Either style works.

## Phase 3 execution plan

Concrete steps, in order:

1. **Collision audit**: `grep -rn 'class.*"\(container\|prose\|btn\|card\)"' src/` — if any of these names have site-specific meaning, rename them before flipping
2. **Extract Layout.astro globals → `@layer base`**: copy html/body/main/h1-h6/blockquote/a/img/footer/etc. rules from Layout.astro's `<style is:global>` block into `src/styles/global.css @layer base`
3. **Add explicit font-sizes to h1-h6** in `@layer base` (preflight removes browser defaults)
4. **Add list-style + padding to `ul`, `ol`** in `@layer base` (preflight removes bullets)
5. **Enable Tailwind import**:

   ```css
   @layer theme, base, components, utilities;

   @import 'tailwindcss/theme.css' layer(theme);
   @import 'tailwindcss/preflight.css' layer(base);
   @import 'tailwindcss/utilities.css' layer(utilities);
   @import './tokens.css';

   @source "../**/*.{astro,ts,tsx,js,jsx,mdx}";
   ```

6. **Add `@theme` bridge** mapping our tokens to Tailwind's naming (so `font-title`, `max-w-reading`, `bg-ink`, etc. become real utility classes)
7. **Delete Layout.astro's `<style is:global>` block** (now lives in `@layer base`)
8. **Build + visual diff**. Expect 1–5% drift initially, fix iteratively to < 0.5%
9. **Open preview in browser**, manually check: long article page, dashboard, contribute, hub page (headings, lists, links, article typography specifically)
10. **Optional**: rewrite Phase 2's 16 `.tw-*` classes to use `@apply` instead of direct CSS. Can defer to a follow-up commit.
11. **Commit atomically**. One commit per logical step above.
12. **Push PR**, merge to main.

Visual diff passing at < 0.5% and manual browser verification on 4+ page types is the **Phase 3 DOD**.

## Related decisions

- Phase 5.5 (@tailwindcss/typography) and Phase 6.5 (dark mode) become possible after Phase 3 ships and will be scheduled as their own phases
- Phase 7 may eventually include "strip `tw-` prefix" if the legacy naming becomes obsolete, or retain it as a namespace (TBD, low priority)

## Rollback plan

If Phase 3 produces unfixable visual regressions:

1. Each commit in the phase is atomic and independently revertable
2. The entire branch can be abandoned; main remains at Phase 2's stable state
3. Fallback is to do Option B (Phase 4.5 flip) or Option C (Phase 6 flip)
4. Baseline PNGs for Phase 2 are locally cached and can be regenerated at any commit

## References

- Obsidian plan: `Projects/Taiwan.md/Taiwan.md — Tailwind Refactor 完整企劃.md`
- REFACTOR-LOG: `docs/refactor/REFACTOR-LOG.md`
- Cheatsheet: `docs/refactor/TAILWIND-CHEATSHEET.md`
- Phase 1 preflight discovery: commit `99dabfaa` commit message in phase-1 branch history
