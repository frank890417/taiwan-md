"""terminology — China-term detection (audit O5 / quality-scan §15).

Reads `data/terminology/.china-terms.detection.tsv` (auto-generated from
data/terminology/*.yaml) and flags A-severity terms in body. B-severity
terms are reported as INFO (potentially ambiguous, not penalized).

Severity (per quality-scan.sh §15):
  A: red — Taiwan-side prose should always swap (HARD)
  B: yellow — context-dependent ambiguity (INFO)

False-positive corrections via `.china-terms.false-positives.tsv` —
e.g. `博客來` (Bookstore name) reduces `博客` count by N.

Skipped if TSV files don't exist (graceful).
"""

from __future__ import annotations
from pathlib import Path
from typing import Any, Iterator

from ..types import FileTarget, Severity, Violation


CHECK_NAME = "terminology"
DIMENSION = "language"
DEFAULT_SEVERITY = Severity.HARD
EDITORIAL_REF = "TERMINOLOGY.md + EDITORIAL.md §兩岸用語"
APPLIES_TO = ["zh-TW"]


def _load_detection() -> list[tuple[str, str, str, str]]:
    """Load (cterm, severity, taiwan, fork_type) tuples from TSV."""
    path = Path("data/terminology/.china-terms.detection.tsv")
    if not path.exists():
        return []
    out = []
    for line in path.read_text(encoding="utf-8").splitlines():
        if not line or line.startswith("#"):
            continue
        parts = line.split("\t")
        if len(parts) < 2:
            continue
        cterm = parts[0].strip()
        severity = parts[1].strip()
        taiwan = parts[2].strip() if len(parts) > 2 else ""
        fork = parts[3].strip() if len(parts) > 3 else ""
        if cterm and severity:
            out.append((cterm, severity, taiwan, fork))
    return out


def _load_false_positives() -> dict[str, list[str]]:
    """cterm → list of false-positive patterns."""
    path = Path("data/terminology/.china-terms.false-positives.tsv")
    if not path.exists():
        return {}
    fp: dict[str, list[str]] = {}
    for line in path.read_text(encoding="utf-8").splitlines():
        if not line or line.startswith("#"):
            continue
        parts = line.split("\t")
        if len(parts) < 2:
            continue
        cterm = parts[0].strip()
        pattern = parts[1].strip()
        if cterm and pattern:
            fp.setdefault(cterm, []).append(pattern)
    return fp


def check(target: FileTarget, config: dict[str, Any]) -> Iterator[Violation]:
    detection = _load_detection()
    false_positives = _load_false_positives()
    if not detection:
        return

    # 2026-05-04: language / linguistics / terminology-meta articles legitimately
    # CITE 中國用語 as the subject of discussion (not as author voice). These
    # articles can opt out via `terminology_exempt: true` in frontmatter.
    # Use sparingly — only for articles whose subject IS the term itself.
    if target.frontmatter.get("terminology_exempt") is True:
        return

    body = target.body
    # 2026-05-04: pre-strip content inside Chinese quotes 「」 and book/essay
    # title brackets 《》〈〉. China-terms appearing as CITATIONS (quoting
    # someone else's words, naming a Chinese platform/product, citing a
    # cross-strait comparison like "「視頻」而非「影片」") should not count
    # as author voice violations. Editorial judgment: 「X」 is "X as quoted",
    # 《X》 is a work title, 〈X〉 is an article/chapter title — none of these
    # is the author claiming X is correct usage.
    import re as _re
    body_for_count = _re.sub(r"「[^「」]*」|《[^《》]*》|〈[^〈〉]*〉", "", body)
    for cterm, severity, taiwan, _fork in detection:
        count = body_for_count.count(cterm)
        if count == 0:
            continue
        # Subtract false-positive matches
        for fp_pat in false_positives.get(cterm, []):
            count -= body_for_count.count(fp_pat)
        if count <= 0:
            continue

        suggested = f"建議改用台灣用語：「{taiwan}」" if taiwan else ""
        if severity == "A":
            yield Violation(
                check=CHECK_NAME,
                severity=Severity.HARD,
                message=f"中國用語「{cterm}」({count} 處) — {suggested}",
                fix_suggestion=taiwan or None,
                editorial_ref=EDITORIAL_REF,
            )
        elif severity == "B":
            yield Violation(
                check=CHECK_NAME,
                severity=Severity.INFO,
                message=(
                    f"可能歧義「{cterm}」({count} 處) — {suggested}（語境決定）"
                ),
                editorial_ref=EDITORIAL_REF,
            )
