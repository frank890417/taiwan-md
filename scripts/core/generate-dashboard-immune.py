#!/usr/bin/env python3
"""generate-dashboard-immune.py — 免疫系統儀表板 v2 generator.

Per reports/immune-score-redesign-2026-05-16.md §2.A — 從 single-metric
`humanReviewedPercent` 升 6-dimension weighted formula:

  immuneScore = round(
      review_coverage    × 0.30 +
      plugin_pass_rate   × 0.25 +
      plugin_health      × 0.15 +
      citation_density   × 0.15 +
      tool_freshness     × 0.10 +
      drift_velocity     × 0.05
  )

Tier-weighted review (T1 ×3 / T2 ×1.5 / T3 ×0.5) — sovereignty-sensitive 文章
review 比 Food/Nature 更值得，避免 700 篇 ×50% review 永遠不可能達成。

Output: public/api/dashboard-immune.json

Feature flag IMMUNE_V2 (env var) decides whether downstream dashboard reads
this file. Default: V1 (humanReviewedPercent in generate-dashboard-data.js)
still ships; V2 stable observation period 7 days then switch default.
"""

from __future__ import annotations
import json
import os
import re
import subprocess
import sys
from datetime import datetime, timedelta
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[2]
KNOWLEDGE_DIR = REPO_ROOT / "knowledge"
OUTPUT_DIR = REPO_ROOT / "public" / "api"
OUTPUT_FILE = OUTPUT_DIR / "dashboard-immune.json"
ARTICLE_HEALTH = REPO_ROOT / "scripts" / "tools" / "article-health.py"
EDITORIAL_FILE = REPO_ROOT / "docs" / "editorial" / "EDITORIAL.md"
PLUGINS_DIR = REPO_ROOT / "scripts" / "tools" / "lib" / "article_health" / "checks"

# ── Tier classification ───────────────────────────────────────────────────────
# Sovereignty-sensitive + 人物 = T1 ×3 (政治 / 二二八 / 兩岸 / 戒嚴 / 名人爭議).
# 中度爭議 / 文化技術經濟 = T2 ×1.5.
# 低爭議性 = T3 ×0.5.
# Per reports/immune-score-redesign-2026-05-16.md §2.A.1 — category-level mapping
# as v1; per-article frontmatter `risk_tier` override 為 v2 future scope.

TIER_MAP = {
    "People": "T1",      # 人物（音樂人 / 政治人物 / 運動員 = PRC AI 最常 refuse 類別）
    "Society": "T1",     # 社會議題（含轉型正義、原住民、性別、勞動）
    "History": "T1",     # 歷史（二二八 / 白色恐怖 / 戒嚴 / 兩岸關係）
    "Music": "T2",       # 音樂（部分人物會升 T1 by override，暫 T2）
    "Culture": "T2",
    "Technology": "T2",
    "Economy": "T2",
    "Art": "T2",
    "Geography": "T2",
    "Lifestyle": "T2",
    "About": "T2",
    "Food": "T3",
    "Nature": "T3",
}

TIER_WEIGHT = {"T1": 3.0, "T2": 1.5, "T3": 0.5}
DEFAULT_TIER = "T2"  # unknown category → middle weight

# ── Weights ───────────────────────────────────────────────────────────────────
DIMENSION_WEIGHTS = {
    "review_coverage": 0.30,
    "plugin_pass_rate": 0.25,
    "plugin_health": 0.15,
    "citation_density": 0.15,
    "tool_freshness": 0.10,
    "drift_velocity": 0.05,
}


def parse_frontmatter(text: str) -> dict:
    """Extract frontmatter dict from markdown file (lightweight, no yaml dep)."""
    if not text.startswith("---"):
        return {}
    end = text.find("---", 3)
    if end < 0:
        return {}
    fm = {}
    for line in text[3:end].splitlines():
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        m = re.match(r"^([a-zA-Z_][a-zA-Z0-9_]*)\s*:\s*(.*)$", line)
        if not m:
            continue
        key, val = m.group(1), m.group(2).strip()
        # Strip surrounding quotes
        if (val.startswith("'") and val.endswith("'")) or (val.startswith('"') and val.endswith('"')):
            val = val[1:-1]
        # Parse boolean / numeric
        if val.lower() == "true":
            val = True
        elif val.lower() == "false":
            val = False
        fm[key] = val
    return fm


def load_articles() -> list[dict]:
    """Load zh-TW knowledge articles (excludes /_*.md hub pages + non-zh dirs)."""
    articles = []
    for cat_dir in KNOWLEDGE_DIR.iterdir():
        if not cat_dir.is_dir() or cat_dir.name in ("en", "ja", "ko", "es", "fr", "resources", "zh-TW"):
            continue
        for md in cat_dir.glob("*.md"):
            if md.name.startswith("_"):
                continue
            try:
                text = md.read_text(encoding="utf-8")
            except Exception:
                continue
            fm = parse_frontmatter(text)
            articles.append({
                "path": str(md.relative_to(REPO_ROOT)),
                "category": cat_dir.name,
                "slug": md.stem,
                "lastHumanReview": fm.get("lastHumanReview") is True,
                "frontmatter": fm,
            })
    return articles


def compute_review_coverage(articles: list[dict]) -> tuple[float, dict]:
    """Tier-weighted human-review coverage. Returns (score, breakdown)."""
    tier_totals = {"T1": 0, "T2": 0, "T3": 0}
    tier_reviewed = {"T1": 0, "T2": 0, "T3": 0}

    for a in articles:
        tier = TIER_MAP.get(a["category"], DEFAULT_TIER)
        tier_totals[tier] += 1
        if a["lastHumanReview"]:
            tier_reviewed[tier] += 1

    weighted_total = sum(tier_totals[t] * TIER_WEIGHT[t] for t in tier_totals)
    weighted_reviewed = sum(tier_reviewed[t] * TIER_WEIGHT[t] for t in tier_reviewed)

    score = (weighted_reviewed / weighted_total * 100) if weighted_total > 0 else 0

    breakdown = {
        tier: {
            "total": tier_totals[tier],
            "reviewed": tier_reviewed[tier],
            "pct": round(tier_reviewed[tier] / tier_totals[tier] * 100, 1) if tier_totals[tier] > 0 else 0,
            "weight": TIER_WEIGHT[tier],
        }
        for tier in tier_totals
    }
    return round(score, 1), breakdown


def run_article_health_sweep() -> dict | None:
    """Run article-health.py --all and capture per-file results.

    Returns the parsed JSON dict, or None on error.
    """
    try:
        result = subprocess.run(
            ["python3", str(ARTICLE_HEALTH), "--all", "--output=json"],
            capture_output=True, text=True, cwd=REPO_ROOT,
            timeout=300,
        )
        if result.returncode != 0 and not result.stdout:
            print(f"⚠️  article-health.py exit {result.returncode}", file=sys.stderr)
            return None
        return json.loads(result.stdout)
    except subprocess.TimeoutExpired:
        print("⚠️  article-health.py timeout (>300s)", file=sys.stderr)
        return None
    except (json.JSONDecodeError, FileNotFoundError) as e:
        print(f"⚠️  article-health.py failed: {e}", file=sys.stderr)
        return None


def compute_plugin_pass_rate(health_data: dict) -> tuple[float, dict]:
    """Weighted HARD + WARN pass rate.

    Formula: HARD-pass × 0.7 + WARN-pass × 0.3

    Rationale: Taiwan.md's existing HARD gates are tight (pre-commit + ci-deploy
    enforce hard plugins, so 698/698 pass = 100% — saturated signal). Real
    immune capacity gap lives at WARN level (e.g. seo-meta 615 warns / legacy
    description bloat). 70/30 weight preserves HARD primacy while letting
    WARN backlog visibly pull down immune score.
    """
    reports = health_data.get("reports", [])
    if not reports:
        return 0, {"total_files": 0, "hard_pass": 0, "warn_pass": 0}

    hard_pass = sum(1 for r in reports if r["summary"]["hard"] == 0)
    warn_pass = sum(1 for r in reports if r["summary"]["warn"] == 0)
    total = len(reports)

    hard_pct = (hard_pass / total * 100) if total else 0
    warn_pct = (warn_pass / total * 100) if total else 0

    # Weighted: HARD 70 % + WARN 30 %
    score = hard_pct * 0.7 + warn_pct * 0.3

    return round(score, 1), {
        "total_files": total,
        "hard_pass_files": hard_pass,
        "hard_pass_pct": round(hard_pct, 1),
        "warn_pass_files": warn_pass,
        "warn_pass_pct": round(warn_pct, 1),
        "weight_formula": "hard×0.7 + warn×0.3",
    }


def compute_citation_density(articles: list[dict]) -> tuple[float, dict]:
    """Mean A-F grade (A=100 / B=80 / C=60 / D=40 / F=0).

    Replicates footnote-density plugin logic (`_grade()`) inline because the
    plugin only emits violations for C/D/F (A/B = silent pass). We need ALL
    articles graded for the average.

    Grade rules per footnote_density.py:
      A: ≥3 footnotes AND density ≤ 300 words per footnote
      B: ≥1 footnote (insufficient density)
      C: no footnotes but ≥3 inline URLs
      D: 1-2 inline URLs only
      F: no footnotes, no URLs
    """
    grade_score = {"A": 100, "B": 80, "C": 60, "D": 40, "F": 0}
    grade_counts = {g: 0 for g in grade_score}
    grades = []

    _RE_DEF = re.compile(r"^\[\^[0-9a-zA-Z_-]+\]:", re.MULTILINE)

    for a in articles:
        try:
            text = (REPO_ROOT / a["path"]).read_text(encoding="utf-8")
        except Exception:
            continue

        # Skip frontmatter
        body = text
        if body.startswith("---"):
            end = body.find("---", 3)
            if end > 0:
                body = body[end + 3:]

        fn_count = len(_RE_DEF.findall(body))
        url_count = body.count("http")
        words = len(body.split())
        density = words // fn_count if fn_count > 0 else None

        if fn_count >= 3 and density is not None and density <= 300:
            g = "A"
        elif fn_count >= 1:
            g = "B"
        elif url_count >= 3:
            g = "C"
        elif url_count >= 1:
            g = "D"
        else:
            g = "F"

        grades.append(grade_score[g])
        grade_counts[g] += 1

    if not grades:
        return 0, {"grades": grade_counts, "files_with_grade": 0}

    score = sum(grades) / len(grades)
    return round(score, 1), {
        "grades": grade_counts,
        "files_with_grade": len(grades),
    }


def _git_last_modified_days(rel_path: str) -> int | None:
    """Use git log %ai (NOT file mtime) — worktree creation resets fs mtimes."""
    try:
        result = subprocess.run(
            ["git", "log", "-1", "--format=%ai", "--", rel_path],
            capture_output=True, text=True, cwd=REPO_ROOT, timeout=10,
        )
        if not result.stdout.strip():
            return None
        # Parse "2026-05-13 22:02:23 +0800"
        date_str = result.stdout.strip().split()[0]
        commit_date = datetime.strptime(date_str, "%Y-%m-%d")
        return (datetime.now() - commit_date).days
    except Exception:
        return None


def compute_tool_freshness() -> tuple[float, dict]:
    """EDITORIAL.md vs plugin file last-commit time (per REFLEXES #18 時間是結構).

    Uses git log %ai (commit time) NOT filesystem mtime — worktree creation
    resets fs mtimes to "now" so plugin .py files always look "fresh" in a
    new worktree but EDITORIAL.md was actually modified days ago.
    """
    editorial_days = _git_last_modified_days(
        str(EDITORIAL_FILE.relative_to(REPO_ROOT))
    ) or 999

    plugin_days = []
    plugin_count = 0
    for plugin_file in PLUGINS_DIR.glob("*.py"):
        if plugin_file.name == "__init__.py":
            continue
        plugin_count += 1
        d = _git_last_modified_days(str(plugin_file.relative_to(REPO_ROOT)))
        if d is not None:
            plugin_days.append(d)

    avg_plugin_days = sum(plugin_days) / len(plugin_days) if plugin_days else 999

    # Score: closer to 100 = both EDITORIAL and plugins recently touched
    if editorial_days < 7 and avg_plugin_days < 14:
        score = 100
    elif editorial_days < 30 and avg_plugin_days < 30:
        score = 80
    elif editorial_days < 90:
        score = 60
    else:
        score = 40

    return score, {
        "editorial_days_old": editorial_days,
        "avg_plugin_days_old": round(avg_plugin_days, 1),
        "plugin_count": plugin_count,
        "source": "git log %ai (not fs mtime — worktree-safe)",
    }


def compute_drift_velocity(articles: list[dict]) -> tuple[float, dict]:
    """Recent violation rate per new article (last 7 days)."""
    # Use git log to find articles added/modified in last 7d
    try:
        result = subprocess.run(
            ["git", "log", "--since=7 days ago", "--name-only",
             "--pretty=format:", "--diff-filter=A"],
            capture_output=True, text=True, cwd=REPO_ROOT, timeout=30,
        )
        added_files = set(
            line for line in result.stdout.splitlines()
            if line.startswith("knowledge/") and line.endswith(".md")
        )
    except Exception as e:
        print(f"⚠️  git log failed: {e}", file=sys.stderr)
        added_files = set()

    new_zh_articles = sum(
        1 for path in added_files
        if not any(f"/{lang}/" in path for lang in ("en", "ja", "ko", "es", "fr"))
        and not Path(path).name.startswith("_")
    )

    # No new articles → no drift possible
    if new_zh_articles == 0:
        return 100, {"new_articles_7d": 0, "rate_per_article": 0.0}

    # Heuristic: assume each new article averages 1 violation (conservative)
    # Future: tie to actual article-health sweep per-file count for new articles
    # but that requires longitudinal tracking which we don't have yet.
    estimated_violations = new_zh_articles * 1.0  # placeholder
    rate = estimated_violations / new_zh_articles
    score = max(0, min(100, 100 - rate * 10))

    return round(score, 1), {
        "new_articles_7d": new_zh_articles,
        "rate_per_article": round(rate, 2),
        "note": "v1 heuristic — longitudinal tracking pending (B-line meta-health)",
    }


def compute_plugin_health() -> tuple[float, dict]:
    """Meta-health: plugin self-health monitoring (Phase 7 — B-line).

    Per design report §2.B. Per-plugin metrics:
      - plugin_age_days: git log %ai of plugin .py file
      - editorial_age_days: git log %ai of EDITORIAL.md (shared canonical)
      - drifted: EDITORIAL changed < 14d ago AND plugin > 30d unchanged
        (符號：規範改了但工具沒跟上)

    Plugin health score = % of plugins NOT drifted.

    Future scope (not in Phase 7 v1):
      - per-section EDITORIAL drift (needs EDITORIAL_REF parsing per plugin)
      - false_positive_rate (needs opt-in contributor labeling)
      - last_run_days (needs cron / pre-commit log persistence)
      - violation_trend_7d (needs longitudinal snapshots)
    """
    editorial_days = _git_last_modified_days(
        str(EDITORIAL_FILE.relative_to(REPO_ROOT))
    )
    if editorial_days is None:
        editorial_days = 999

    DRIFT_EDITORIAL_RECENT = 14  # EDITORIAL changed within N days = "recent"
    DRIFT_PLUGIN_STALE = 30      # Plugin unchanged for N days = "stale"

    plugin_details = []
    drifted_count = 0
    total = 0

    for plugin_file in sorted(PLUGINS_DIR.glob("*.py")):
        if plugin_file.name == "__init__.py":
            continue
        total += 1
        plugin_days = _git_last_modified_days(
            str(plugin_file.relative_to(REPO_ROOT))
        )
        if plugin_days is None:
            plugin_days = 999

        drifted = (
            editorial_days < DRIFT_EDITORIAL_RECENT
            and plugin_days > DRIFT_PLUGIN_STALE
        )
        if drifted:
            drifted_count += 1

        plugin_details.append({
            "plugin": plugin_file.stem,
            "plugin_age_days": plugin_days,
            "drifted": drifted,
        })

    fresh_count = total - drifted_count
    score = (fresh_count / total * 100) if total else 0

    return round(score, 1), {
        "plugin_count": total,
        "fresh_count": fresh_count,
        "drifted_count": drifted_count,
        "editorial_age_days": editorial_days,
        "drift_thresholds": {
            "editorial_recent_days": DRIFT_EDITORIAL_RECENT,
            "plugin_stale_days": DRIFT_PLUGIN_STALE,
        },
        "plugins": plugin_details,
        "note": (
            "Phase 7 v1 — per-plugin drift only. Future: per-section EDITORIAL,"
            " false-positive-rate, longitudinal violation trend."
        ),
    }


def main():
    print("🛡️  generate-dashboard-immune.py — computing 6-dimension immune score", file=sys.stderr)

    articles = load_articles()
    print(f"   loaded {len(articles)} zh-TW articles", file=sys.stderr)

    # 1. review_coverage (tier-weighted)
    review_score, review_breakdown = compute_review_coverage(articles)
    print(f"   review_coverage (tier-weighted): {review_score}", file=sys.stderr)

    # 2. plugin_pass_rate (run article-health full sweep)
    print(f"   running article-health.py --all (this may take ~2 min)...", file=sys.stderr)
    health_data = run_article_health_sweep()
    if health_data:
        plugin_pass_score, plugin_pass_detail = compute_plugin_pass_rate(health_data)
    else:
        plugin_pass_score, plugin_pass_detail = 0, {"error": "article-health failed"}
    # citation_density independent of health_data (grades A/B silent in plugin)
    citation_score, citation_detail = compute_citation_density(articles)
    print(f"   plugin_pass_rate: {plugin_pass_score}", file=sys.stderr)
    print(f"   citation_density (A-F mean): {citation_score}", file=sys.stderr)

    # 3. tool_freshness
    freshness_score, freshness_detail = compute_tool_freshness()
    print(f"   tool_freshness: {freshness_score}", file=sys.stderr)

    # 4. drift_velocity
    drift_score, drift_detail = compute_drift_velocity(articles)
    print(f"   drift_velocity: {drift_score}", file=sys.stderr)

    # 5. plugin_health (Phase 7 — B-line meta-health)
    plugin_health_score, plugin_health_detail = compute_plugin_health()
    print(f"   plugin_health (meta-health): {plugin_health_score}", file=sys.stderr)

    # ── Weighted total ───────────────────────────────────────────────────────
    components = {
        "review_coverage": review_score,
        "plugin_pass_rate": plugin_pass_score,
        "plugin_health": plugin_health_score,
        "citation_density": citation_score,
        "tool_freshness": freshness_score,
        "drift_velocity": drift_score,
    }
    immune_score = round(sum(
        components[d] * DIMENSION_WEIGHTS[d] for d in components
    ))

    # Status label
    if immune_score >= 80:
        status = "健康 — risk-stratified review + plugins green"
    elif immune_score >= 60:
        status = "需關注 — T1 review < 80% OR plugin pass < 90%"
    elif immune_score >= 40:
        status = "漂移 — 多維度退化中"
    else:
        status = "🔴 危險 — 結構性免疫不足"

    # ── Output ───────────────────────────────────────────────────────────────
    output = {
        "lastUpdated": datetime.now().isoformat(),
        "schemaVersion": "v2-2026-05-16",
        "featureFlag": "IMMUNE_V2",
        "immuneScore": immune_score,
        "status": status,
        "components": components,
        "componentWeights": DIMENSION_WEIGHTS,
        "tierBreakdown": review_breakdown,
        "pluginPassDetail": plugin_pass_detail,
        "citationDetail": citation_detail,
        "freshnessDetail": freshness_detail,
        "driftDetail": drift_detail,
        "pluginHealthDetail": plugin_health_detail,
        "designReport": "reports/immune-score-redesign-2026-05-16.md",
    }

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    OUTPUT_FILE.write_text(json.dumps(output, indent=2, ensure_ascii=False) + "\n")

    print(f"\n🛡️  immune_score = {immune_score} ({status})", file=sys.stderr)
    print(f"   ✅ wrote {OUTPUT_FILE.relative_to(REPO_ROOT)}", file=sys.stderr)


if __name__ == "__main__":
    main()
