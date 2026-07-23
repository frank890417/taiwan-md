"""article_health — SSOT 文章健檢工具模組。

Public API:
    from scripts.tools.lib.article_health import run_checks, FileTarget, Severity

設計提案：reports/article-health-ssot-design-2026-05-04.md
"""

from .langs import ALL_LANGS, TRANSLATION_LANGS
from .types import (
    FileTarget,
    Severity,
    Violation,
    CheckResult,
    HealthReport,
)
from .loader import load_target
from .registry import (
    discover_checks,
    get_check,
    list_checks,
)
from .config import load_config
from .runner import run_checks

__all__ = [
    "FileTarget",
    "Severity",
    "Violation",
    "CheckResult",
    "HealthReport",
    "load_target",
    "discover_checks",
    "get_check",
    "list_checks",
    "load_config",
    "run_checks",
    "ALL_LANGS",
    "TRANSLATION_LANGS",
]

__version__ = "0.1.0-phase1"
