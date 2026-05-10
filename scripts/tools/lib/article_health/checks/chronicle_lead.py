"""chronicle_lead — chronicle-style subheading detection (REWRITE Stage 2 #4 + #11).

Direction D Wave 1 from reports/rewrite-pipeline-evolution-plan-2026-05-09.md:
    把 REWRITE Stage 2 #4「小標題不編年體」+ #11「編年體自檢」從 prose 提醒
    升級為 plugin gate (DNA #15 第 N 次驗證：memory 是自律，pipeline 才是閘門).

Rule (REWRITE-PIPELINE.md §Stage 2 Step D + §Stage 2 Step G 自檢 3):
    H2 subheadings must NOT be chronicle-style「YYYY 年 X 月」/「YYYY 年《作品》」
    /「YYYY.MM.DD」 — these turn the article into a Wikipedia-style timeline
    (Cicada / 草東 / 康士坦 / 魏如萱 等 2026-04-18 教訓).

Detected patterns (HARD):
    ## 2016 年 5 月 X 事件          ← chronicle event with month
    ## 2020 年《作品名》            ← year + work title
    ## 2020.5.6                    ← date format
    ## 2020/5/6                    ← date format
    ## 2020-05-06                  ← ISO date

Allowed patterns (legitimate timeline / historical scope):
    ## 1949-1987 戒嚴體制         ← year range + description (historical)
    ## 1990 年代的台灣              ← decade reference
    ## 民國 X 年                    ← 民國紀年 (historical narrative)
    ## 第二次世界大戰前後           ← topical / period name
    ## 戰後初期                     ← named period (no specific year)

APPLIES_TO 設計：
    zh-TW articles 在 knowledge/{Category}/ 路徑下。
    Skip:
      - Hub pages (`_*.md`) — index pages 用 timeline 結構合法
      - Translation files (knowledge/en|ja|ko|es|fr/) — 非中文 prose
      - SPORE blueprints / harvests — handled by spore_writing.py
      - Memory / diary — timeline templates legit
      - reports/research/ — research notes 用日期合法

Future extensions (deferred to D Wave 2-5):
  - research_report_validator (Stage 1 #7 #9 核心矛盾 + 報告落檔)
  - media_matrix_validator (Stage 1.7 §1.7d 三表完整)
  - arithmetic_sanity (Stage 3 5a 算術自檢)
  - density_balance (Stage 2 #12 — needs LLM-as-judge)

Canonical:
  - docs/pipelines/REWRITE-PIPELINE.md §Stage 2 Step D 小標題先行決定 + §自檢 3 編年體自檢
  - docs/pipelines/REWRITE-PIPELINE.md ⚠️ Top 5 最常忘的 step #3
"""

from __future__ import annotations
import re
from typing import Any, Iterator

from ..types import FileTarget, Severity, Violation


CHECK_NAME = "chronicle-lead"
DIMENSION = "subheading"
# Soft-launch: WARN initially (~17 legacy violations on 2026-05-09 ship).
# Promote to HARD once legacy heal'd (per spore_writing.py Wave 2 Rule #14 pattern).
# rewrite-stage-4 profile applies severity_override = "hard" for new articles.
DEFAULT_SEVERITY = Severity.WARN
EDITORIAL_REF = "REWRITE-PIPELINE.md §Stage 2 Step D + §Stage 2 Step G 自檢 3 編年體自檢"
APPLIES_TO = ["zh-TW"]


# ── HARD: chronicle subheading patterns ──────────────────────────────────────

# YYYY 年 X 月... — most common AI failure mode (event date lead)
# e.g. ## 2016 年 5 月，《XX》發行
_RE_YEAR_MONTH = re.compile(r"^##\s+\d{4}\s*年\s*\d+\s*月")

# YYYY 年《作品名》 / YYYY 年〈作品名〉 — year + work title pattern
# e.g. ## 2020 年《棲居在溪源之上》
_RE_YEAR_WORK = re.compile(r"^##\s+\d{4}\s*年\s*[《〈]")

# YYYY 年「事件」/ YYYY 年：標題 — year-prefixed event lead
# e.g. ## 2018 年：金曲入圍 / ## 2018 年「金曲入圍」
_RE_YEAR_EVENT = re.compile(r"^##\s+\d{4}\s*年[：:「]")

# YYYY.MM.DD / YYYY/MM/DD / YYYY-MM-DD — date format
# e.g. ## 2020.5.6 / ## 2020/5/6 / ## 2020-05-06
_RE_DATE_FORMAT = re.compile(r"^##\s+\d{4}[/.\-]\s*\d{1,2}[/.\-]\s*\d{1,2}")


# ── Allowed patterns (regex to detect legitimate timeline scope, returns True
#    to skip HARD violation) ────────────────────────────────────────────────────

# Year range: ## 1949-1987 ... / ## 1949–1987 ... / ## 1949 — 1987 ...
_RE_YEAR_RANGE = re.compile(r"^##\s+\d{4}\s*[—–\-]\s*\d{4}")

# Decade: ## 1990 年代 / ## 二〇〇〇 年代
_RE_DECADE = re.compile(r"^##\s+\d{4}\s*年代")

# 民國紀年: ## 民國 X 年 (historical narrative, allowed)
_RE_MINGUO = re.compile(r"^##\s+民國\s*\d+\s*年")


def _is_excluded_path(path: str) -> bool:
    """Skip non-zh-TW articles, hubs, spores, and historical artifact paths.

    Includes /tmp/ ad-hoc draft testing (any tmp file is treated as if it were
    a knowledge/ article for testing purposes).
    """
    import os
    p = str(path)
    # Translation files
    if "/knowledge/en/" in p or "/knowledge/ja/" in p or "/knowledge/ko/" in p:
        return True
    if "/knowledge/es/" in p or "/knowledge/fr/" in p:
        return True
    # Hub pages — knowledge/{Category}/_X.md hub pattern
    if os.path.basename(p).startswith("_") and p.endswith(".md"):
        return True
    # Spore artifacts (handled by spore_writing.py)
    if "/SPORE-BLUEPRINTS/" in p or "/SPORE-HARVESTS/" in p:
        return True
    # Memory / diary (timeline templates legitimate)
    if "/memory/" in p or "/diary/" in p:
        return True
    # Research reports (date prefixes + chronologies legit)
    if "/reports/research/" in p:
        return True
    # Allowed: knowledge/{Category}/ articles + /tmp/ for ad-hoc testing
    return False


def _is_legitimate_chronicle(line: str) -> bool:
    """Return True if subheading is a legitimate timeline scope (skip HARD)."""
    return bool(
        _RE_YEAR_RANGE.match(line)
        or _RE_DECADE.match(line)
        or _RE_MINGUO.match(line)
    )


def _detect_chronicle_violation(line: str) -> str | None:
    """Return violation pattern name if line is a chronicle subheading, else None."""
    if _is_legitimate_chronicle(line):
        return None
    if _RE_YEAR_MONTH.match(line):
        return "year-month"
    if _RE_YEAR_WORK.match(line):
        return "year-work"
    if _RE_YEAR_EVENT.match(line):
        return "year-event"
    if _RE_DATE_FORMAT.match(line):
        return "date-format"
    return None


def check(target: FileTarget, config: dict[str, Any]) -> Iterator[Violation]:
    """Detect chronicle-style H2 subheadings (REWRITE Stage 2 #4 / #11).

    HARD violation: any subheading matching chronicle date patterns.
    Skipped paths: translations / hubs / spores / memory / diary / research reports.
    """
    if _is_excluded_path(str(target.path)):
        return

    text = target.text
    if not text:
        return

    for line_no, line in enumerate(text.split("\n"), start=1):
        stripped = line.rstrip()
        if not stripped.startswith("## "):
            continue
        kind = _detect_chronicle_violation(stripped)
        if not kind:
            continue
        yield Violation(
            check=CHECK_NAME,
            severity=DEFAULT_SEVERITY,
            message=(
                f"編年體小標題 (REWRITE Stage 2 #4): "
                f"「{stripped[:60]}」 = 維基百科時間軸，改用 場景 / 意象 / 衝突 / 物件 / 核心矛盾"
            ),
            line=line_no,
            snippet=stripped[:80],
            editorial_ref=EDITORIAL_REF,
            fix_suggestion=(
                "範例：「派對結束了」(場景) / 「凡凡的狗叫土豆」(物件) / "
                "「沒被認出的金曲歌后」(核心矛盾)。年份範圍如 「1949-1987 戒嚴體制」 OK。"
            ),
        )
