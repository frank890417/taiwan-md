"""article_health.types — 共用資料型別。

每個 check plugin yields `Violation`s; runner aggregates 成 `CheckResult`s
和最終的 `HealthReport`。
"""

from __future__ import annotations
from dataclasses import dataclass, field
from enum import Enum
from pathlib import Path
from typing import Any


class Severity(str, Enum):
    """違反嚴重等級。

    HARD: 自動 block commit / PR / build。
    WARN: 列出但不擋。
    INFO: 純資訊（dashboard 用，不出現在 pre-commit）。
    """

    HARD = "hard"
    WARN = "warn"
    INFO = "info"

    def __lt__(self, other: 'Severity') -> bool:
        order = {Severity.INFO: 0, Severity.WARN: 1, Severity.HARD: 2}
        return order[self] < order[other]


@dataclass
class FileTarget:
    """一篇被檢查的文章。

    Loader 在掃 file 時做完一次：
      - YAML frontmatter 解析（cached）
      - body markdown 內文（去除 frontmatter）
      - 受保護區塊 mask（fenced code / inline code / link URL / HTML attr）

    Plugins 收到這個物件，避免每個 check 重複 parse / split。
    """

    path: Path
    text: str  # full file content (frontmatter + body)
    frontmatter: dict[str, Any] = field(default_factory=dict)
    # body is PADDED with leading blank lines equal to frontmatter line count
    # so any line N in body matches line N in the original file. For write-
    # back paths, use `body_text_offset` (char offset of where real body
    # content starts in `text`) and slice body from that point.
    body: str = ""
    body_text_offset: int = 0  # char offset in `text` where body starts
    body_pad_lines: int = 0  # how many blank lines were prepended to align line numbers
    lang: str = "zh-TW"  # zh-TW / en / ja / ko / es / fr
    category: str = ""  # About / History / Geography / ...
    slug: str = ""  # filename without .md

    # Protected text segments — list of (start, end, kind) tuples in body coords.
    # kind = "fenced-code" / "inline-code" / "link-url" / "html-tag"
    protected_regions: list[tuple[int, int, str]] = field(default_factory=list)

    # Section boundaries — name → (start, end) in body coords. Lets plugins
    # treat 延伸閱讀 / 參考資料 / 圖片來源 sections specially without
    # re-parsing markdown.
    #
    # Triggered by 2026-05-04 黃魚鴞 incident: the inline CJK punct converter
    # in commit 514dc9fd4 turned `[name](/url)` → `[name](/url）` in 延伸閱讀,
    # breaking 5 wikilinks. The fix lives in protected_regions (link-url),
    # but section-level metadata gives plugins a coarser hook.
    sections: dict[str, tuple[int, int]] = field(default_factory=dict)

    @property
    def is_translation(self) -> bool:
        return self.lang != "zh-TW"

    def body_without_protected(self) -> str:
        """Body with protected regions blanked out (preserves char positions)."""
        if not self.protected_regions:
            return self.body
        chars = list(self.body)
        for start, end, _ in self.protected_regions:
            for i in range(start, min(end, len(chars))):
                chars[i] = " "
        return "".join(chars)


@dataclass
class Violation:
    """單一違反實例。"""

    check: str  # check name (e.g. "cjk-punct")
    severity: Severity
    message: str
    line: int | None = None  # 1-indexed
    col: int | None = None  # 1-indexed
    snippet: str | None = None  # surrounding context
    fix_suggestion: str | None = None  # what would --fix do
    editorial_ref: str | None = None  # canonical doc reference


@dataclass
class CheckResult:
    """單一 check 跑完一個 file 的結果。"""

    check: str
    passed: bool  # True if no HARD violations
    violations: list[Violation] = field(default_factory=list)
    skipped: bool = False
    skip_reason: str | None = None

    @property
    def hard_count(self) -> int:
        return sum(1 for v in self.violations if v.severity == Severity.HARD)

    @property
    def warn_count(self) -> int:
        return sum(1 for v in self.violations if v.severity == Severity.WARN)

    @property
    def info_count(self) -> int:
        return sum(1 for v in self.violations if v.severity == Severity.INFO)


@dataclass
class HealthReport:
    """One file × N checks aggregate report."""

    target: FileTarget
    results: list[CheckResult] = field(default_factory=list)

    @property
    def hard_count(self) -> int:
        return sum(r.hard_count for r in self.results)

    @property
    def warn_count(self) -> int:
        return sum(r.warn_count for r in self.results)

    @property
    def info_count(self) -> int:
        return sum(r.info_count for r in self.results)

    @property
    def passed(self) -> bool:
        return self.hard_count == 0

    @property
    def all_violations(self) -> list[Violation]:
        return [v for r in self.results for v in r.violations]

    def as_dict(self) -> dict[str, Any]:
        """JSON-serializable representation."""
        return {
            "file": str(self.target.path),
            "lang": self.target.lang,
            "category": self.target.category,
            "slug": self.target.slug,
            "summary": {
                "hard": self.hard_count,
                "warn": self.warn_count,
                "info": self.info_count,
                "passed": self.passed,
            },
            "results": [
                {
                    "check": r.check,
                    "passed": r.passed,
                    "skipped": r.skipped,
                    "skip_reason": r.skip_reason,
                    "violations": [
                        {
                            "severity": v.severity.value,
                            "message": v.message,
                            "line": v.line,
                            "col": v.col,
                            "snippet": v.snippet,
                            "fix_suggestion": v.fix_suggestion,
                            "editorial_ref": v.editorial_ref,
                        }
                        for v in r.violations
                    ],
                }
                for r in self.results
            ],
        }
