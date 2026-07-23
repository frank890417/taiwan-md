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
# v3 (2026-06-10 audit D-4): 新增 external_rulers 維度 — 免疫系統實際演化成
# 儀器免疫（FACTCHECK / quote-fidelity / falsification agent / 讀者勘誤飛輪），
# 但分數只量「人類讀過幾篇」。external_rulers 量「文章被幾把獨立外部尺量過」
# （per 本週 meta-umbrella「每層自評都需要外部尺」vc=5 + MANIFESTO §12 受眾端飛輪）。
# 權重從 review_coverage 0.30→0.25 + plugin_pass_rate 0.25→0.20 各讓 0.05。
# 校準（REFLEXES #66）：2026-06-10 實測 external 覆蓋 ~3%（9 factcheck + 16 勘誤
# commits/30d），分數 61→~56 的下降是「量出新缺口」的誠實成本，不是退步。
DIMENSION_WEIGHTS = {
    "review_coverage": 0.25,
    "plugin_pass_rate": 0.20,
    "plugin_health": 0.15,
    "citation_density": 0.15,
    "tool_freshness": 0.10,
    "drift_velocity": 0.05,
    "external_rulers": 0.10,
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
            ["git", "-c", "core.quotepath=false", "log", "--since=7 days ago",
             "--name-only", "--pretty=format:", "--diff-filter=A"],
            capture_output=True, encoding="utf-8", errors="replace",
            cwd=REPO_ROOT, timeout=30,
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


def compute_external_rulers(articles: list[dict]) -> tuple[float, dict]:
    """v3 external_rulers（audit 2026-06-10 D-4）— 文章被獨立外部尺量過的比例.

    外部尺定義（可機械歸因的兩種，90 天窗）：
      (a) FACTCHECK Full-mode 報告存在 — reports/factcheck/**/{文章名}.md
      (b) 讀者勘誤 commit — git log 訊息含 勘誤/讀者/callout/errata/fact-fix
          且 touch 該 zh 文章

    刻意不算的：lastVerified frontmatter（2026-06-10 實測 99.6% 飽和 backfill，
    無鑑別力）、quote-fidelity/prose-health plugin pass（屬 plugin_pass_rate
    維度，且是自家儀器不是「獨立」尺）。
    Tier 加權同 review_coverage（T1 文章被外部尺量過價值 ×3）。
    """
    import subprocess

    ruled = set()

    # (a) factcheck reports — filename stem match
    factcheck_dir = Path("reports/factcheck")
    if factcheck_dir.exists():
        for p in factcheck_dir.rglob("*.md"):
            if not p.name.startswith("_"):
                ruled.add(p.stem)

    # (b) reader-errata commits in 90d touching zh knowledge files.
    # Pattern 校準（第一版 dogfood 抓到自己灌水，REFLEXES #59/#65 現場）：
    # 寬 pattern「callout/讀者」90d 命中 350 commits（「被哲宇 callout」「讀者
    # 參與器官」全是誤傷）→ 收緊為 勘誤/errata/fact-fix 三個窄訊號；
    # 並加「單 commit touch ≤5 篇 zh 文章」護欄 — 讀者勘誤天然是 1-3 篇的
    # 點修，批次 heal/feature 掃過幾十篇不構成「這篇被外部尺量過」。
    try:
        out = subprocess.run(
            ["git", "-c", "core.quotepath=false", "log", "--since=90 days ago",
             "--name-only", "--grep=勘誤", "--grep=errata", "--grep=fact-fix",
             "--pretty=format:@@COMMIT@@"],
            capture_output=True, encoding="utf-8", errors="replace", timeout=60,
        ).stdout
        for block in out.split("@@COMMIT@@"):
            zh_files = [
                ln.strip() for ln in block.splitlines()
                if ln.strip().startswith("knowledge/") and ln.strip().endswith(".md")
                and not any(f"/{l}/" in ln for l in ("en", "ja", "ko", "es", "fr"))
            ]
            if 0 < len(zh_files) <= 5:
                for f in zh_files:
                    ruled.add(Path(f).stem)
    except Exception:
        pass

    weighted_ruled = 0.0
    weighted_total = 0.0
    ruled_count = 0
    for a in articles:
        tier = a.get("tier", DEFAULT_TIER)
        w = TIER_WEIGHT.get(tier, TIER_WEIGHT[DEFAULT_TIER])
        weighted_total += w
        if Path(a.get("path", "")).stem in ruled:
            weighted_ruled += w
            ruled_count += 1

    score = round((weighted_ruled / weighted_total * 100) if weighted_total else 0.0, 1)
    detail = {
        "ruledArticles": ruled_count,
        "totalArticles": len(articles),
        "rulerSources": {"factcheckReports": True, "readerErrataCommits90d": True,
                          "lastVerifiedExcluded": "99.6% saturated backfill (2026-06-10)"},
        "windowDays": 90,
    }
    return score, detail


def compute_plugin_health() -> tuple[float, dict]:
    """Meta-health v2: % of plugins that load + register + pass interface validation.

    v2（2026-07-10 哲宇拍板 C'，weekly-deep-review P0-7）：v1 的 drift 定義
    （EDITORIAL <14d 有 commit AND plugin >30d 沒 commit）把「穩定」讀成「生病」——
    EDITORIAL 是全站最熱 canonical，任何一次修訂都會把所有成熟 plugin 打成 drifted
    14 天（2026-07 實況 21/25 中招、免疫連 6+ cycle 紅燈，但 25 個 plugin 天天在
    pre-commit / pre-push 全綠工作）。REFLEXES #59 自製指標 self-validation trap。

    v2 保留 meta-health 原意：真正的病是 orphan（檔案在但沒註冊）、import crash、
    介面缺欄——這些由 registry.discover_checks() 的載入驗證直接量測。
    齡數照算照存（age_watch 資訊欄），但不再進分數。

    Future scope（沿 v1 註記保留）：per-section EDITORIAL drift（需 EDITORIAL_REF
    diff 對照）/ false_positive_rate / violation_trend。
    """
    editorial_days = _git_last_modified_days(
        str(EDITORIAL_FILE.relative_to(REPO_ROOT))
    )
    if editorial_days is None:
        editorial_days = 999

    AGE_WATCH_DAYS = 30  # 資訊性門檻：超過只標 age_watch，不扣分

    # registry 載入驗證：import 失敗 / 缺必要欄位的 plugin 不會出現在 registry
    sys.path.insert(0, str(REPO_ROOT / "scripts" / "tools" / "lib"))
    try:
        from article_health.registry import discover_checks  # type: ignore

        registered = set()
        for _name, mod in discover_checks(reload=True).items():
            mod_file = getattr(mod, "__file__", "") or ""
            registered.add(Path(mod_file).stem)
    except Exception as exc:  # registry 自身壞掉 = 全部 plugin 視為不可用
        print(f"   ⚠️ plugin registry load failed: {exc}", file=sys.stderr)
        registered = set()

    plugin_details = []
    healthy_count = 0
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

        healthy = plugin_file.stem in registered
        if healthy:
            healthy_count += 1

        plugin_details.append({
            "plugin": plugin_file.stem,
            "plugin_age_days": plugin_days,
            "healthy": healthy,
            "age_watch": plugin_days > AGE_WATCH_DAYS,
        })

    score = (healthy_count / total * 100) if total else 0

    return round(score, 1), {
        "schema": "v2-loadable-2026-07-10",
        "plugin_count": total,
        "healthy_count": healthy_count,
        "unhealthy_count": total - healthy_count,
        "editorial_age_days": editorial_days,
        "age_watch_days": AGE_WATCH_DAYS,
        "plugins": plugin_details,
        "note": (
            "v2 score = loadable+registered ratio（orphan / import crash / 介面缺欄"
            "才算病）。age_watch 為資訊欄不進分數。v1 drift 定義的診斷與拍板紀錄："
            "LESSONS immune-chronic entry §一頁診斷 2026-07-10。"
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

    # 6. external_rulers (v3 2026-06-10 audit D-4)
    external_score, external_detail = compute_external_rulers(articles)
    print(f"   external_rulers: {external_score}", file=sys.stderr)

    # ── Weighted total ───────────────────────────────────────────────────────
    components = {
        "review_coverage": review_score,
        "plugin_pass_rate": plugin_pass_score,
        "plugin_health": plugin_health_score,
        "citation_density": citation_score,
        "tool_freshness": freshness_score,
        "drift_velocity": drift_score,
        "external_rulers": external_score,
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
        "externalRulersDetail": external_detail,
        "designReport": "reports/immune-score-redesign-2026-05-16.md",
        "v3Note": "external_rulers added 2026-06-10 (audit D-4): % articles touched by an independent external ruler in 90d (factcheck full-mode report OR reader-errata commit). Baseline ~3% is honest — the dimension exists to make external verification growth visible.",
    }

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    OUTPUT_FILE.write_text(json.dumps(output, indent=2, ensure_ascii=False) + "\n")

    print(f"\n🛡️  immune_score = {immune_score} ({status})", file=sys.stderr)
    print(f"   ✅ wrote {OUTPUT_FILE.relative_to(REPO_ROOT)}", file=sys.stderr)


if __name__ == "__main__":
    main()
