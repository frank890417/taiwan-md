"""link-target — verify markdown link path is well-formed and resolves.

Two-phase validation of internal markdown links `[text](/path/)`:

  Phase 1 — CASING: `/en/History/...` is broken because Astro routes lowercase
            the category segment (CATEGORY_MAPPING in `[category]/[slug].astro`
            uses lowercase keys). Auto-fixable.

  Phase 2 — EXISTENCE: `/en/history/non-existent-slug/` is broken even with
            correct casing. Cross-checks against the actual filesystem
            (`knowledge/{lang}/{Category}/{slug}.md`).

            Evolution 2026-07-23 (idlccp1984 batch / clownfish instrument):
              - unquote percent-encoded paths before existence check
                (false-negative: `/culture/%E9%95%B7%E8%BC%A9%E5%9C%96` was
                flagged broken while `/culture/長輩圖` exists)
              - surface max-match + ratio via difflib when missing
              - auto-heal: decode-if-exists; high-confidence unique fuzzy
                rewrite (ratio ≥ 0.90)
              - medium confidence (0.70–0.90) stays WARN + suggestions
                (advanced-review-required surface in message)

Source-layer counterpart of `verify-internal-links.sh` (post-build dist scan).
Catching at source means pre-commit / pre-PR gates fire instead of waiting
for the full build.

Trigger: 2026-05-04 jovial-feistel session — CI run 25325225046 failed with
649 broken `](/lang/UpperCase/...)` links (Phase 1). Cheyu pushed for Phase 2
during fix: "目前有檢查內容交叉連結能否到達真實頁面嗎？沒有的話怎麼改良工具".
"""

from __future__ import annotations
import re
from difflib import SequenceMatcher, get_close_matches
from pathlib import Path
from typing import Any, Iterator
from urllib.parse import unquote

from ..langs import ALL_LANGS, TRANSLATION_LANGS
from ..types import FileTarget, Severity, Violation


CHECK_NAME = "link-target"
DIMENSION = "structure"
# Phase 1 (casing) is HARD inside check(); Phase 2 (existence) is WARN by
# default so pre-commit doesn't block parallel cron / agent work that touches
# articles with long-accumulated broken slugs. release-pr profile sets
# fail_on="warn" so CI still catches existence issues.
DEFAULT_SEVERITY = Severity.HARD
EDITORIAL_REF = "src/pages/{lang}/[category]/[slug].astro CATEGORY_MAPPING (lowercase routing) + knowledge/{lang}/{Category}/*.md (existence)"
APPLIES_TO = ["*"]

# 語言清單吃 langs.py SSOT，不寫死。2026-07-24：原本兩個集合都停在出生戰役前的
# 五語，後果有二 ——
#   (1) `_existing_link_targets()` 走 else 分支把 knowledge/{vi,id,pt,hi}/ 當成
#       zh-TW 分類目錄，那 263 篇的 `/{lang}/{cat}/{slug}` 一條都沒進索引，
#       任何指過去的連結都會被判定「目標不存在」。
#   (2) Phase 1 的大小寫 HARD gate 由 `_LANGS` 組正則，四個新語言完全不在守備
#       範圍 —— `](/pt/Technology/foo)` 這種該擋的大寫分類擋不到。
# 目前 corpus 還沒有任何一條連結指向這四語，所以是潛伏而非正在誤報；但這道 gate
# 存在的意義就是第一條連結寫錯時要當場接住。
_LANGS = set(ALL_LANGS)
_TRANSLATION_LANGS = set(TRANSLATION_LANGS)
_KNOWLEDGE_ROOT = Path("knowledge")

# High-confidence fuzzy auto-heal threshold (unique top match only).
_FUZZY_AUTO_RATIO = 0.90
# Medium confidence: surface suggestions, advanced-review-required.
_FUZZY_SUGGEST_RATIO = 0.70

# Phase 1: capitalized category in link path.
_RE_CASING = re.compile(
    rf"(\]\(/(?:{'|'.join(sorted(_LANGS))})/)([A-Z][a-zA-Z-]*)(/[^)]*\))"
)

# Phase 2: any internal absolute link, for existence check.
# Captures the path part (without anchor/query) for lookup.
_RE_INTERNAL = re.compile(r"\]\((/[^)\s#?]+)(?:[#?][^)]*)?\)")


def _existing_link_targets() -> set[str]:
    """Set of valid internal link paths (no trailing slash, no anchor).

    Format:
      `/{lang}/{category-lower}/{slug}` for translations
      `/{category-lower}/{slug}`        for zh-TW (default routing)
      `/zh-TW/{category-lower}/{slug}`  for explicit zh-TW prefix

    Cached per-process — call `_reset_cache()` in tests when filesystem changes.
    """
    cached = getattr(_existing_link_targets, "_cache", None)
    if cached is not None:
        return cached
    paths: set[str] = set()
    if _KNOWLEDGE_ROOT.exists():
        for entry in _KNOWLEDGE_ROOT.iterdir():
            if not entry.is_dir() or entry.name.startswith("_"):
                continue
            if entry.name in _TRANSLATION_LANGS:
                lang = entry.name
                for cat_dir in entry.iterdir():
                    if not cat_dir.is_dir() or cat_dir.name.startswith("_"):
                        continue
                    cat_lower = cat_dir.name.lower()
                    for md in cat_dir.glob("*.md"):
                        if md.name.startswith("_"):
                            continue
                        paths.add(f"/{lang}/{cat_lower}/{md.stem}")
            else:
                # zh-TW category dir at root.
                cat_lower = entry.name.lower()
                for md in entry.glob("*.md"):
                    if md.name.startswith("_"):
                        continue
                    paths.add(f"/{cat_lower}/{md.stem}")
                    paths.add(f"/zh-TW/{cat_lower}/{md.stem}")
    _existing_link_targets._cache = paths  # type: ignore[attr-defined]
    return paths


def _reset_cache() -> None:
    """Test helper — invalidate the path cache."""
    if hasattr(_existing_link_targets, "_cache"):
        delattr(_existing_link_targets, "_cache")


def _line_col(text: str, pos: int) -> tuple[int, int]:
    line = text.count("\n", 0, pos) + 1
    line_start = text.rfind("\n", 0, pos) + 1
    col = pos - line_start + 1
    return line, col


def _snippet(body: str, pos: int, end: int) -> str:
    line_start = body.rfind("\n", 0, pos) + 1
    line_end = body.find("\n", end)
    if line_end == -1:
        line_end = len(body)
    return body[line_start:line_end].strip()[:120]


def _looks_like_article_path(path: str) -> bool:
    """Path matches `/lang/cat/slug` or `/cat/slug` shape — worth resolving.

    Skips `/about/`, `/dashboard/`, `/contribute/`, etc. (static pages handled
    by other gates) and weird shapes like `/api/...`.
    """
    parts = path.strip("/").split("/")
    if len(parts) == 3 and parts[0] in _LANGS:
        return True
    if len(parts) == 2 and parts[0] not in _LANGS and parts[0] not in {
        "api", "og-images", "assets", "_astro",
    }:
        return True
    return False


def _canonicalize_path(path: str) -> str:
    """Lowercase category segment; keep slug as-is (CJK/latin)."""
    parts = path.strip("/").split("/")
    if not parts:
        return path
    if parts[0] in _LANGS and len(parts) >= 3:
        parts[1] = parts[1].lower()
    else:
        parts[0] = parts[0].lower()
    return "/" + "/".join(parts)


def _slug_of(path: str) -> str:
    parts = path.strip("/").split("/")
    return parts[-1] if parts else path


def _prefix_of(path: str) -> str:
    """Everything except the final slug segment, with trailing slash."""
    parts = path.strip("/").split("/")
    if len(parts) <= 1:
        return "/"
    return "/" + "/".join(parts[:-1]) + "/"


def _suggest_paths(canonical: str, valid: set[str], n: int = 3) -> list[tuple[str, float]]:
    """Return top-n (path, ratio) suggestions for a missing path.

    Strategy:
      1. Prefer candidates sharing the same category/lang prefix.
      2. Fall back to whole-corpus slug fuzzy match.
    """
    slug = _slug_of(canonical)
    prefix = _prefix_of(canonical)
    same_prefix = [p for p in valid if p.startswith(prefix)]
    pool = same_prefix if same_prefix else list(valid)

    # Score by slug similarity (not full path — category mismatches inflate).
    scored: list[tuple[str, float]] = []
    for p in pool:
        ratio = SequenceMatcher(None, slug, _slug_of(p)).ratio()
        if ratio >= _FUZZY_SUGGEST_RATIO:
            scored.append((p, ratio))
    scored.sort(key=lambda x: (-x[1], x[0]))

    if scored:
        return scored[:n]

    # Last resort: get_close_matches on full path strings (cheap).
    close = get_close_matches(canonical, list(valid), n=n, cutoff=_FUZZY_SUGGEST_RATIO)
    return [(c, SequenceMatcher(None, canonical, c).ratio()) for c in close]


def _resolve_path(path: str, valid: set[str]) -> tuple[str | None, list[tuple[str, float]], str]:
    """Resolve a raw link path against the valid set.

    Returns (resolved_path_or_None, suggestions, status) where status is one of:
      ok | decode-ok | fuzzy-auto | missing
    """
    # 1. raw (after strip trailing slash)
    raw = path.rstrip("/")
    if not _looks_like_article_path(raw):
        return None, [], "ok"  # not an article path — skip

    # 2. unquote percent-encoding
    decoded = unquote(raw)
    # 3. canonicalize category casing
    candidates = []
    for p in (raw, decoded):
        candidates.append(_canonicalize_path(p))
        # also try decoded even if same
    # dedupe preserve order
    seen: set[str] = set()
    ordered: list[str] = []
    for c in candidates:
        if c not in seen:
            seen.add(c)
            ordered.append(c)

    for i, c in enumerate(ordered):
        if c in valid:
            if i == 0 and c == _canonicalize_path(raw) and "%" not in raw:
                return c, [], "ok"
            if "%" in raw or decoded != raw:
                return c, [], "decode-ok"
            return c, [], "ok"

    # 4. fuzzy on the best canonical form (prefer decoded)
    probe = ordered[-1] if ordered else _canonicalize_path(decoded)
    suggestions = _suggest_paths(probe, valid, n=3)
    if (
        suggestions
        and suggestions[0][1] >= _FUZZY_AUTO_RATIO
        and (
            len(suggestions) == 1
            or suggestions[0][1] - suggestions[1][1] >= 0.05
        )
    ):
        return suggestions[0][0], suggestions, "fuzzy-auto"
    return None, suggestions, "missing"


def check(target: FileTarget, config: dict[str, Any]) -> Iterator[Violation]:
    body = target.body
    valid = _existing_link_targets()

    # Phase 1: casing violations — HARD (auto-fixable, obvious)
    casing_positions: set[int] = set()
    for m in _RE_CASING.finditer(body):
        casing_positions.add(m.start())
        category = m.group(2)
        line, col = _line_col(body, m.start())
        yield Violation(
            check=CHECK_NAME,
            severity=Severity.HARD,
            message=f"link 路徑 category 必須小寫：/{category}/ → /{category.lower()}/",
            line=line,
            col=col,
            snippet=_snippet(body, m.start(), m.end()),
            fix_suggestion=f"{m.group(1)}{category.lower()}{m.group(3)}",
            editorial_ref=EDITORIAL_REF,
        )

    # Phase 2: existence + decode + fuzzy suggest
    for m in _RE_INTERNAL.finditer(body):
        if m.start() in casing_positions:
            continue
        path = m.group(1).rstrip("/")
        if not _looks_like_article_path(path):
            continue
        resolved, suggestions, status = _resolve_path(path, valid)
        line, col = _line_col(body, m.start())

        if status == "ok":
            continue

        if status == "decode-ok":
            # Percent-encoded but target exists after unquote — WARN + fixable.
            yield Violation(
                check=CHECK_NAME,
                severity=Severity.WARN,
                message=(
                    f"link 路徑含 percent-encoding，解碼後存在："
                    f"{path} → {resolved}"
                ),
                line=line,
                col=col,
                snippet=_snippet(body, m.start(), m.end()),
                fix_suggestion=resolved,
                editorial_ref=EDITORIAL_REF,
            )
            continue

        if status == "fuzzy-auto":
            top = suggestions[0]
            yield Violation(
                check=CHECK_NAME,
                severity=Severity.WARN,
                message=(
                    f"link 目標不存在：{path} — 高信心 match "
                    f"{top[0]} (ratio={top[1]:.2f})，--fix 可 auto-heal"
                ),
                line=line,
                col=col,
                snippet=_snippet(body, m.start(), m.end()),
                fix_suggestion=top[0],
                editorial_ref=EDITORIAL_REF,
            )
            continue

        # missing — surface max match for advanced review
        if suggestions:
            tops = ", ".join(f"{p} ({r:.2f})" for p, r in suggestions[:3])
            msg = (
                f"link 目標不存在：{path} — max match: {suggestions[0][0]} "
                f"(ratio={suggestions[0][1]:.2f}); candidates: {tops} "
                f"[advanced-review-required]"
            )
            fix_sugg = suggestions[0][0] if suggestions[0][1] >= _FUZZY_SUGGEST_RATIO else None
        else:
            msg = f"link 目標不存在：{path} — 無接近 match [advanced-review-required]"
            fix_sugg = None
        yield Violation(
            check=CHECK_NAME,
            severity=Severity.WARN,
            message=msg,
            line=line,
            col=col,
            snippet=_snippet(body, m.start(), m.end()),
            fix_suggestion=fix_sugg,
            editorial_ref=EDITORIAL_REF,
        )


def fix(target: FileTarget, config: dict[str, Any]) -> int:
    """Phase 1 casing + Phase 2 decode / high-confidence fuzzy rewrites.

    Returns number of link paths rewritten. Respects config['dry_run'].
    """
    text = target.text
    valid = _existing_link_targets()
    changes = 0

    # Phase 1: casing
    def _casing_sub(m: re.Match) -> str:
        nonlocal changes
        new = f"{m.group(1)}{m.group(2).lower()}{m.group(3)}"
        if new != m.group(0):
            changes += 1
        return new

    text = _RE_CASING.sub(_casing_sub, text)

    # Phase 2: rewrite internal links that resolve via decode or fuzzy-auto
    def _internal_sub(m: re.Match) -> str:
        nonlocal changes
        full = m.group(0)
        path = m.group(1)
        path_stripped = path.rstrip("/")
        if not _looks_like_article_path(path_stripped):
            return full
        resolved, _suggestions, status = _resolve_path(path_stripped, valid)
        if status in ("decode-ok", "fuzzy-auto") and resolved:
            # Preserve trailing slash if original had one inside the capture
            # (capture excludes trailing slash already via rstrip in check;
            # keep path as resolved without trailing slash — site accepts both).
            new = full.replace(path, resolved, 1)
            if new != full:
                changes += 1
            return new
        return full

    text = _RE_INTERNAL.sub(_internal_sub, text)

    if changes == 0:
        return 0
    if config.get("dry_run"):
        return changes
    target.path.write_text(text, encoding="utf-8")
    return changes
