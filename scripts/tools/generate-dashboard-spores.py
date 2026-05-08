#!/usr/bin/env python3
"""
generate-dashboard-spores.py — Parse SPORE-LOG.md + SPORE-HARVESTS/ → public/api/dashboard-spores.json

解析 docs/factory/SPORE-LOG.md 的兩張 markdown table（發文紀錄 + 成效追蹤）
+ docs/factory/SPORE-HARVESTS/ 目錄下的 harvest log frontmatter，
產出 Dashboard 繁殖系統 section 所需的結構化資料。

對應計畫：reports/dashboard-spore-section-plan-2026-04-18.md（Phase 1 data layer）
整合入口：scripts/tools/refresh-data.sh Phase 2.8

JSON 結構見 reports plan §1.2（8 top-level keys）：
  lastUpdated / totals / recent / topPerformers / amplification /
  platformComparison / backfillWarnings / weeklyPulse

v1.0 — 2026-04-18 δ-late session | SPORE-HARVEST-PIPELINE v1.0 配套
"""
from __future__ import annotations

import json
import re
import sys
from datetime import datetime, date, timedelta, timezone
from pathlib import Path
from collections import defaultdict

REPO_ROOT = Path(__file__).resolve().parents[2]
SPORE_LOG = REPO_ROOT / "docs" / "factory" / "SPORE-LOG.md"
HARVESTS_DIR = REPO_ROOT / "docs" / "factory" / "SPORE-HARVESTS"
GA_CACHE = Path.home() / ".config" / "taiwan-md" / "cache" / "ga4-latest.json"
TARGET = REPO_ROOT / "public" / "api" / "dashboard-spores.json"

TPE = timezone(timedelta(hours=8))


# ───────────────────────────────── markdown table 解析 ─────────────────────────────────

def split_tables(md_text):
    """Split markdown into the two tables: '發文紀錄' + '成效追蹤'."""
    lines = md_text.splitlines()
    sections = {}
    cur_section = None
    cur_buffer = []
    for line in lines:
        if line.startswith("## "):
            if cur_section and cur_buffer:
                sections[cur_section] = "\n".join(cur_buffer)
            cur_section = line[3:].strip()
            cur_buffer = []
        elif cur_section:
            cur_buffer.append(line)
    if cur_section and cur_buffer:
        sections[cur_section] = "\n".join(cur_buffer)
    return sections


def parse_pipe_table(text):
    """Parse a standard markdown pipe-table. Returns list of dicts keyed by header."""
    rows = []
    lines = [l for l in text.splitlines() if l.strip().startswith("|")]
    if len(lines) < 2:
        return rows
    # First line = header, second line = separator, rest = data
    header_cells = [c.strip() for c in lines[0].strip().strip("|").split("|")]
    for line in lines[2:]:
        cells = [c.strip() for c in line.strip().strip("|").split("|")]
        if len(cells) != len(header_cells):
            # skip malformed
            continue
        rows.append(dict(zip(header_cells, cells)))
    return rows


# ───────────────────────────────── helpers ─────────────────────────────────

def clean_cell(cell):
    """Remove markdown decorations / hyperlinks."""
    if not cell or cell in ("—", "-", "no-data", ""):
        return None
    # Remove [→](url) style links
    cell = re.sub(r"\[→\]\([^)]+\)", "", cell).strip()
    # Remove bold / italic markers
    cell = cell.replace("**", "").replace("*", "").strip()
    return cell if cell else None


def extract_url_from_link(cell):
    """Extract URL from markdown link `[→](url)` or `[text](url)`."""
    m = re.search(r"\[[^\]]*\]\((https?://[^)]+)\)", cell or "")
    return m.group(1) if m else None


def parse_number(s):
    """Parse number with K/M suffix or comma separator. '180K' / '120,000' / '1.5K'."""
    if not s or s in ("—", "-", "no-data"):
        return None
    s = s.strip().replace(",", "").replace("*", "").replace(" ", "")
    # Extract leading number portion (strip trailing annotations like '(8h)')
    m = re.match(r"^([\d.]+)([KkMm]?)", s)
    if not m:
        return None
    try:
        num = float(m.group(1))
    except ValueError:
        return None
    suffix = m.group(2).upper()
    if suffix == "K":
        num *= 1_000
    elif suffix == "M":
        num *= 1_000_000
    return int(num) if num.is_integer() else num


def parse_ga_referral(cell):
    """Parse cells like 'GA 375v/7d' or 'GA: 34→48 (#5→#4)'. Returns dict or None."""
    if not cell or cell in ("—", "-", "no-data"):
        return None
    # Pattern 1: GA N v/7d
    m = re.search(r"GA[:\s]+(?:(\d[\d,]*)v?/7d)", cell)
    if m:
        return {"7d_views": parse_number(m.group(1))}
    # Pattern 2: GA: N1→N2
    m2 = re.search(r"GA[:\s]+(\d[\d,]*)\s*→\s*(\d[\d,]*)", cell)
    if m2:
        return {"before": parse_number(m2.group(1)), "after": parse_number(m2.group(2))}
    return None


def strip_emoji_prefix(s):
    """Remove leading emoji markers like 🌋 🔥 in highlight cells."""
    if not s:
        return s
    return re.sub(r"^[\U0001F300-\U0001FAFF\u2600-\u27BF\s]+", "", s).strip()


# ───────────────────────────────── spore parse ─────────────────────────────────

def parse_publish_rows(raw_rows):
    """Normalize publish-table rows to spore entries."""
    entries = []
    for row in raw_rows:
        # Header keys may vary: ['#', '日期', '語言', '平台', '文章 slug', '分類', '模板', 'URL']
        n_str = clean_cell(row.get("#", ""))
        if not n_str or not n_str.isdigit():
            continue
        n = int(n_str)
        entry = {
            "n": n,
            "date": clean_cell(row.get("日期")),
            "lang": clean_cell(row.get("語言")),
            "platform": (clean_cell(row.get("平台")) or "").lower() or None,
            "article": clean_cell(row.get("文章 slug")),
            "category": clean_cell(row.get("分類")),
            "template": clean_cell(row.get("模板")),
            "url": extract_url_from_link(row.get("URL", "")),
            "highlight": None,
        }
        url_cell = row.get("URL", "")
        if url_cell and "—" in url_cell:
            # Remaining text after the hyperlink is "備註"/"highlight"
            after_link = re.sub(r"\[→\]\([^)]+\)", "", url_cell).split("—", 1)[-1].strip()
            entry["highlight"] = after_link or None
        entries.append(entry)
    return entries


def parse_latest_views_from_harvest(harvest_text):
    """Scan '最後 harvest' text for the FIRST 'N views' pattern (= latest harvest).

    Format examples produced by harvest write-back（clean_cell 已 strip ** markers）：
      'D+3 ~3.8d backfill (...)：24,435 views / 1,417♥ / 345🔁'
      'D+7 backfill (...)：65.4K views / 1K♥ / 23🔁'  (K-suffix variant)
      'D+0 ~30min 首抓 (...)：40 views / 3♥ / 1🔁'
      'D+5 backfill (...)：12.7K views / 1.1K♥ / 110🔁'

    Multiple D+N stacks: latest harvest is at the TOP (we prepend new harvests
    when backfilling). So FIRST 'N views' match = latest. Returns int or None.

    2026-05-03 objective-khorana day 2 fix: was failing on K/M-suffix forms
    (e.g. '65.4K views' -> None) because regex bracket-d-comma doesn't match '.4K'.
    Now handles: 65,400 / 65000 / 65.4K / 1.8K / 180K / 2.5M.
    """
    if not harvest_text:
        return None
    # Pattern: number with optional decimal/comma + optional K/M suffix
    # Tries 'X.YK' / 'X,YYY' / 'XYZ' followed by 'views'
    m = re.search(
        r"(\d+(?:\.\d+)?[KMkm]|\d{1,3}(?:,\d{3})+|\d+)\s+views?\b",
        harvest_text,
    )
    if not m:
        return None
    s = m.group(1)
    # K/M suffix conversion
    if s[-1] in "Kk":
        return int(float(s[:-1]) * 1000)
    if s[-1] in "Mm":
        return int(float(s[:-1]) * 1_000_000)
    # Plain integer with optional commas
    return int(s.replace(",", ""))


def parse_metrics_rows(raw_rows):
    """Normalize metrics-table rows. Keyed by (n, platform)."""
    metrics = {}
    for row in raw_rows:
        n_str = clean_cell(row.get("#", ""))
        if not n_str or not n_str.isdigit():
            continue
        n = int(n_str)
        platform = (clean_cell(row.get("平台")) or "").lower() or None
        views_7d_cell = clean_cell(row.get("7d 觸及"))
        engagements_7d_cell = clean_cell(row.get("7d 互動"))
        referral_cell = clean_cell(row.get("7d 導流"))
        harvest_cell = clean_cell(row.get("最後 harvest"))

        views = parse_number(views_7d_cell)
        engagements = parse_number(engagements_7d_cell)
        rate = round(engagements / views * 100, 2) if (views and engagements) else None

        # 2026-04-26 ε bug fix: parse "最後 harvest" rich text for latest views.
        # Recent spores (#41-#46) have "—（待 D+7）" in 7d 觸及 cell, but harvest
        # column has D+0/D+3 numbers like '**24,435 views**'. weeklyPulse / topPerformers
        # were showing 0 for current week. Fallback to views_latest when views_7d is None.
        views_latest = parse_latest_views_from_harvest(harvest_cell)

        metrics[(n, platform)] = {
            "views_7d": views,
            "views_latest": views_latest,
            "engagements_7d": engagements,
            "rate_7d": rate,
            "referral_7d": parse_ga_referral(referral_cell),
            "notes": clean_cell(row.get("備註")),
        }
    return metrics


def merge_publish_and_metrics(pubs, metrics, harvests=None):
    """Inner-merge publish entries with SPORE-LOG metrics. Phase 2 (2026-05-08):
    when a `harvests` map is provided, also pull in latest D+N body table data as
    supplementary fallback — so spores with harvest body data but missing SPORE-LOG
    struct cols still surface views/engagements in the dashboard.

    Priority for views_latest:
      1. SPORE-LOG narrative (parse_latest_views_from_harvest)
      2. SPORE-HARVESTS body table latest D+N views (Phase 2 fallback)

    Priority for views_7d:
      1. SPORE-LOG struct col `7d 觸及` (parsed by parse_metrics_rows)
      2. SPORE-HARVESTS body latest D+N where d_n_int >= 7 (Phase 2 fallback)
    """
    harvests = harvests or {}
    for e in pubs:
        key = (e["n"], e["platform"])
        m = metrics.get(key) or {}

        # Phase 2: fetch latest harvest body for this spore #
        body = latest_harvest_body(harvests, e["n"])
        body_views = _body_views(body) if body else None
        body_eng = _body_engagements(body) if body else None
        body_d_n = (body or {}).get("d_n_int", 0)

        # views_latest: SPORE-LOG narrative wins; else fall back to body
        views_latest = m.get("views_latest") or body_views

        # views_7d: SPORE-LOG struct wins; else fall back to body if D+N >= 7
        views_7d = m.get("views_7d")
        if not views_7d and body_views and body_d_n >= 7:
            views_7d = body_views

        # engagements_7d: similar logic
        engagements_7d = m.get("engagements_7d")
        if not engagements_7d and body_eng and body_d_n >= 7:
            engagements_7d = body_eng

        # rate_7d: recompute if we filled views_7d/engagements_7d from body
        rate_7d = m.get("rate_7d")
        if not rate_7d and views_7d and engagements_7d:
            rate_7d = round(engagements_7d / max(views_7d, 1) * 100, 2)

        views_eff = views_7d or views_latest

        e.update({
            "views_7d": views_7d,
            "views_latest": views_latest,
            "views_effective": views_eff,
            "engagements_7d": engagements_7d,
            "rate_7d": rate_7d,
            "referral_7d": m.get("referral_7d"),
            "notes": m.get("notes"),
        })
    return pubs


# ───────────────────────────────── harvest log parse ─────────────────────────────────


# Phase 2 (2026-05-08 laughing-goldstine): SPORE-HARVESTS body table column normalization
# Schema variation across batch logs handled here so we don't break old logs.
_HARVEST_COL_ALIASES = {
    "#": "n",
    "slug": "slug",
    "文章": "slug",
    "platform": "platform",
    "平台": "platform",
    "d+n": "d_n",
    "views": "views",
    "views (抓取時)": "views",
    "views (exact)": "views",
    "likes": "likes",
    "reposts": "reposts",
    "comments": "comments",
    "shares": "shares",
    "shares/bm": "shares",
    "engagements": "engagements",
    "rate": "rate",
    "互動率": "rate",
}


def _normalize_harvest_col(col):
    return _HARVEST_COL_ALIASES.get(col.strip().lower(), col.strip().lower())


def parse_harvest_frontmatter(md_path):
    """Read harvest log frontmatter YAML-lite. Returns dict or None.

    Phase 2: handle both `spore` (legacy singular) and `spores` (canonical plural list).
    """
    try:
        text = md_path.read_text(encoding="utf-8")
    except Exception:
        return None
    if not text.startswith("---"):
        return None
    end = text.find("---", 3)
    if end == -1:
        return None
    fm_text = text[3:end].strip()
    fm = {}
    for line in fm_text.splitlines():
        if ":" in line:
            k, v = line.split(":", 1)
            fm[k.strip()] = v.strip().strip("'\"")
    return fm


def parse_harvest_body_table(md_path):
    """Phase 2: Parse the FIRST markdown pipe-table in batch log body.

    Returns: list of dicts keyed by normalized column name (n, slug, platform, d_n,
    views, likes, reposts, comments, shares, engagements, rate). None if no parseable.

    Schema-tolerant: accepts variation across legacy batch logs via column aliases.
    """
    try:
        text = md_path.read_text(encoding="utf-8")
    except Exception:
        return None
    if text.startswith("---"):
        end = text.find("---", 3)
        if end != -1:
            text = text[end + 3:]

    table_lines = []
    in_table = False
    for line in text.splitlines():
        s = line.strip()
        if s.startswith("|") and s.endswith("|"):
            table_lines.append(s)
            in_table = True
        elif in_table and not s.startswith("|"):
            break

    if len(table_lines) < 3:
        return None

    headers = [_normalize_harvest_col(h) for h in
               (c.strip() for c in table_lines[0].strip("|").split("|"))]
    rows = []
    for line in table_lines[2:]:
        cells = [c.strip() for c in line.strip("|").split("|")]
        if len(cells) != len(headers):
            continue
        row = dict(zip(headers, cells))
        n_str = (row.get("n") or "").strip()
        if not n_str.isdigit():
            continue
        # parse d_n integer (D+10 → 10)
        d_n_str = (row.get("d_n") or "").strip().lstrip("D+").strip()
        row["d_n_int"] = int(d_n_str) if d_n_str.isdigit() else 0
        rows.append(row)

    return rows if rows else None


def _spore_ns_from_frontmatter(fm):
    """Extract list of spore #s from frontmatter `spore` (singular) OR `spores` (plural)."""
    spore_str = fm.get("spores") or fm.get("spore") or ""
    return [int(tok) for tok in re.findall(r"#?(\d+)", spore_str)]


def collect_harvests():
    """Walk SPORE-HARVESTS/, return {spore_n: [harvest_log_metadata]}.

    Phase 2 (2026-05-08): handles `spores` plural list + body table parse.
    Each entry now also includes `body` (parsed dict for that spore # from body table).
    """
    out = defaultdict(list)
    if not HARVESTS_DIR.exists():
        return out
    for p in sorted(HARVESTS_DIR.glob("*.md")):
        fm = parse_harvest_frontmatter(p)
        if not fm:
            continue
        spore_ns = _spore_ns_from_frontmatter(fm)
        if not spore_ns:
            continue

        # Parse body table once, index by spore #
        body_rows = parse_harvest_body_table(p) or []
        body_by_n = {}
        for row in body_rows:
            try:
                n = int(row["n"])
                # Multiple D+N rows possible; keep highest D+N (latest)
                if n not in body_by_n or body_by_n[n].get("d_n_int", -1) < row.get("d_n_int", 0):
                    body_by_n[n] = row
            except (ValueError, KeyError):
                continue

        reply_count_str = (fm.get("reply_count") or "").strip().split(" ")[0]
        reply_count = int(reply_count_str) if reply_count_str.isdigit() else None
        for n in spore_ns:
            out[n].append({
                "harvest_date": fm.get("harvest_date"),
                "harvest_window_day": fm.get("harvest_window_day"),
                "reply_count": reply_count,
                "log_path": str(p.relative_to(REPO_ROOT)),
                "body": body_by_n.get(n),
            })
    return out


def _body_views(body_row):
    """Extract integer views from body table row. None if absent/unparseable."""
    if not body_row:
        return None
    raw = body_row.get("views", "")
    if not raw:
        return None
    s = raw.strip().replace(",", "").replace("*", "").replace(" ", "")
    if not s or s in ("—", "-", "no-data", "n/a"):
        return None
    m = re.match(r"^([\d.]+)([KkMm]?)", s)
    if not m:
        return None
    try:
        n = float(m.group(1))
    except ValueError:
        return None
    suf = m.group(2).upper()
    if suf == "K":
        n *= 1_000
    elif suf == "M":
        n *= 1_000_000
    return int(n)


def _body_engagements(body_row):
    """Compute engagements from body row (engagements col OR sum of likes+reposts+comments+shares)."""
    if not body_row:
        return None
    eng_raw = body_row.get("engagements", "")
    if eng_raw:
        m = re.match(r"^[\d,]+", eng_raw.strip())
        if m:
            return int(m.group(0).replace(",", ""))
    total = 0
    found = False
    for k in ("likes", "reposts", "comments", "shares"):
        raw = body_row.get(k, "")
        m = re.match(r"^[\d,]+", raw.strip()) if raw else None
        if m:
            try:
                total += int(m.group(0).replace(",", ""))
                found = True
            except ValueError:
                pass
    return total if found else None


def latest_harvest_body(harvests, n):
    """Return latest harvest body row for spore #n (by d_n_int, then harvest_date)."""
    entries = harvests.get(n, [])
    bodies = [(e.get("body"), e.get("harvest_date") or "") for e in entries if e.get("body")]
    if not bodies:
        return None
    # Sort by (d_n_int desc, harvest_date desc)
    bodies.sort(key=lambda t: (t[0].get("d_n_int", 0), t[1]), reverse=True)
    return bodies[0][0]


# ───────────────────────────────── aggregations ─────────────────────────────────

def compute_totals(entries):
    platforms = defaultdict(int)
    languages = defaultdict(int)
    templates = defaultdict(int)
    for e in entries:
        p = e["platform"] or "other"
        platforms[p] += 1
        lang = e["lang"] or "zh"
        languages[lang] += 1
        tpl_raw = (e["template"] or "").strip()
        tpl_first = tpl_raw[0] if tpl_raw else "other"
        # Normalize to A/A2/B/C/D
        if tpl_first in "ABCD":
            if tpl_raw.startswith("A2"):
                templates["A2"] += 1
            else:
                templates[tpl_first] += 1
        else:
            templates["other"] += 1
    return {
        "count": len(entries),
        "platforms": dict(platforms),
        "languages": dict(languages),
        "templates": dict(templates),
    }


def compute_recent(entries, n=5):
    """Last N spores sorted by #."""
    sorted_e = sorted(entries, key=lambda e: e["n"], reverse=True)
    out = []
    for e in sorted_e[:n]:
        article_slug = (e["article"] or "").split("（")[0].strip()
        out.append({
            "n": e["n"],
            "date": e["date"],
            "platform": e["platform"],
            "article": e["article"],
            "articleSlug": article_slug,
            "category": e["category"],
            "template": e["template"],
            "url": e["url"],
            "highlight": e["highlight"],
            "views_7d": e["views_7d"],
            "views_latest": e.get("views_latest"),
            "engagements_7d": e["engagements_7d"],
            "rate_7d": e["rate_7d"],
            "backfilled": bool(e["views_7d"] or e["engagements_7d"] or e.get("views_latest")),
        })
    return out


def compute_top_performers(entries, n=5):
    """Top N spores by views_effective (7d || latest harvest fallback)."""
    # 2026-04-26 ε bug fix: 用 views_effective 取代 views_7d，讓本週新 spore 也能上榜
    scored = [e for e in entries if e.get("views_effective")]
    scored.sort(key=lambda e: e["views_effective"], reverse=True)
    out = []
    for e in scored[:n]:
        v = e["views_effective"]
        badge = None
        if v >= 150_000:
            badge = "🌋 史上最強"
        elif v >= 100_000:
            badge = "🔥 平台最強"
        elif v >= 50_000:
            badge = "⭐ 高峰"
        out.append({
            "n": e["n"],
            "article": e["article"],
            "platform": e["platform"],
            "views": v,
            "viewsSource": "7d" if e.get("views_7d") else "latest",
            "engagements": e["engagements_7d"],
            "rate": e["rate_7d"],
            "badge": badge,
            "date": e["date"],
        })
    return out


def compute_platform_comparison(entries):
    buckets = defaultdict(list)
    for e in entries:
        if not e["platform"] or not e.get("views_7d"):
            continue
        buckets[e["platform"]].append(e)
    out = {}
    for platform, items in buckets.items():
        views = [i["views_7d"] for i in items if i["views_7d"]]
        rates = [i["rate_7d"] for i in items if i["rate_7d"]]
        out[platform] = {
            "count": len(items),
            "avgViews": round(sum(views) / len(views)) if views else 0,
            "maxViews": max(views) if views else 0,
            "avgRate": round(sum(rates) / len(rates), 2) if rates else None,
            "maxRate": max(rates) if rates else None,
        }
    return out


def compute_amplification(entries):
    """Extract GA amplification estimates from notes / referral cells."""
    out = []
    seen_articles = set()
    # Merge same-article entries (threads + x same slug)
    for e in entries:
        article = e.get("article")
        if not article or article in seen_articles:
            continue
        ref = e.get("referral_7d")
        if not ref:
            continue
        # Prefer 'before/after' format; else compute multiplier from single 7d_views if we have baseline
        before = ref.get("before")
        after = ref.get("after")
        ga_7d = ref.get("7d_views")

        entry = {
            "article": article,
            "n": e["n"],
        }
        if before is not None and after is not None and before > 0:
            entry["ga_before"] = before
            entry["ga_7d_after"] = after
            entry["multiplier"] = round(after / max(before, 1), 1)
        elif ga_7d:
            entry["ga_7d_after"] = ga_7d
        out.append(entry)
        seen_articles.add(article)
    # Sort by multiplier desc
    out.sort(key=lambda x: x.get("multiplier", 0), reverse=True)
    return out[:10]


def compute_backfill_warnings(entries, today_iso=None):
    """Flag spores published >= 7 days ago without 7d metrics.

    v1.1 (2026-04-18 δ-late): 明確排除以下三類不算 warning：
    - 待發（platform 空白 / 不在 threads/x 清單）→ 尚未發布，不需 backfill
    - 歷史無 URL（#1/#2/#3/#12 SPORE-LOG 早期缺 URL）→ 無法 harvest，搬到
      no_url_historical 分類讓 dashboard 分開顯示
    - 已 backfilled（有 views_7d 或 engagements_7d）→ 不算 warning

    v1.2 (2026-04-20 γ): 再排除「已撤回」孢子（article 含 `已撤回` / `撤回` / `withdrawn`）。
    觸發：#28 李洋（事實錯誤撤回）連續 6 天當 waiting 顯示，dashboard 噪音。
    """
    withdrawn_markers = ("已撤回", "撤回", "withdrawn")
    if today_iso:
        today_dt = datetime.fromisoformat(today_iso).date()
    else:
        today_dt = datetime.now(TPE).date()
    warnings = []
    no_url_historical = []
    for e in entries:
        if not e.get("date"):
            continue
        try:
            pub_date = date.fromisoformat(e["date"])
        except ValueError:
            continue
        days_ago = (today_dt - pub_date).days

        # 待發（platform 空白 / 非 threads/x）→ 不算 warning
        platform = (e.get("platform") or "").lower()
        if platform not in ("threads", "x"):
            continue

        # 已 backfilled → 不算 warning
        if e.get("views_7d") or e.get("engagements_7d"):
            continue

        # 已撤回 → 不算 warning（v1.2）
        article = e.get("article") or ""
        if any(m in article for m in withdrawn_markers):
            continue

        # 歷史無 URL → 搬到 no_url_historical（不算 OVERDUE）
        if not e.get("url"):
            no_url_historical.append({
                "n": e["n"],
                "article": e["article"],
                "platform": platform,
                "publishedDays": days_ago,
                "status": "NO_URL",
            })
            continue

        status = "waiting" if days_ago < 7 else "OVERDUE"
        warnings.append({
            "n": e["n"],
            "article": e["article"],
            "platform": platform,
            "publishedDays": days_ago,
            "status": status,
            "url": e["url"],
        })

    warnings.sort(key=lambda w: (0 if w["status"] == "OVERDUE" else 1, -w["publishedDays"]))
    return {"warnings": warnings[:15], "noUrlHistorical": no_url_historical}


def compute_weekly_pulse(entries, weeks=8):
    """Group entries by ISO week, return last N weeks with publish count + avg views."""
    bucket = defaultdict(list)
    for e in entries:
        if not e.get("date"):
            continue
        try:
            d = date.fromisoformat(e["date"])
        except ValueError:
            continue
        iso_year, iso_week, _ = d.isocalendar()
        key = f"{iso_year}-W{iso_week:02d}"
        bucket[key].append(e)

    keys_sorted = sorted(bucket.keys(), reverse=True)[:weeks]
    out = []
    for k in reversed(keys_sorted):
        items = bucket[k]
        # 2026-04-26 ε bug fix: use views_effective (7d || latest harvest D+N fallback)
        # 原本只看 views_7d → 本週新 spore 沒到 D+7 都顯示 0。views_effective 兼容兩者。
        views = [i.get("views_effective") for i in items if i.get("views_effective")]
        out.append({
            "week": k,
            "published": len(items),
            "avgViews": round(sum(views) / len(views)) if views else 0,
        })
    return out


def compute_harvest_status(entries, harvest_map):
    """For each spore: list of harvest rounds + D+N since publish."""
    today_dt = datetime.now(TPE).date()
    out = []
    # Merge by spore #
    for e in entries:
        n = e["n"]
        pub_date = None
        if e.get("date"):
            try:
                pub_date = date.fromisoformat(e["date"])
            except ValueError:
                pass
        harvests = harvest_map.get(n, [])
        days_since_publish = (today_dt - pub_date).days if pub_date else None
        within_window = days_since_publish is not None and days_since_publish <= 7
        out.append({
            "n": n,
            "article": e.get("article"),
            "platform": e.get("platform"),
            "publishDate": e.get("date"),
            "daysSincePublish": days_since_publish,
            "withinHarvestWindow": within_window,
            "harvestCount": len(harvests),
            "lastHarvest": harvests[-1]["harvest_date"] if harvests else None,
        })
    return out


# ───────────────────────────────── main ─────────────────────────────────

def main():
    if not SPORE_LOG.exists():
        sys.stderr.write(f"❌ SPORE-LOG not found at {SPORE_LOG}\n")
        sys.exit(1)

    md_text = SPORE_LOG.read_text(encoding="utf-8")
    sections = split_tables(md_text)

    pub_section = sections.get("發文紀錄", "")
    metric_section = sections.get("成效追蹤（週回填）", "")

    pub_rows = parse_pipe_table(pub_section)
    metric_rows = parse_pipe_table(metric_section)

    publishes = parse_publish_rows(pub_rows)
    metrics = parse_metrics_rows(metric_rows)
    harvest_map = collect_harvests()
    entries = merge_publish_and_metrics(publishes, metrics, harvest_map)

    bf = compute_backfill_warnings(entries)
    result = {
        "lastUpdated": datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"),
        "schemaVersion": "1.1",
        "totals": compute_totals(entries),
        "recent": compute_recent(entries, 5),
        "topPerformers": compute_top_performers(entries, 8),
        "amplification": compute_amplification(entries),
        "platformComparison": compute_platform_comparison(entries),
        "backfillWarnings": bf["warnings"],
        "noUrlHistorical": bf["noUrlHistorical"],
        "weeklyPulse": compute_weekly_pulse(entries, 8),
        "harvestStatus": compute_harvest_status(entries, harvest_map),
    }

    TARGET.parent.mkdir(parents=True, exist_ok=True)
    TARGET.write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")

    print(f"✅ spore dashboard: {result['totals']['count']} spores, "
          f"top {result['topPerformers'][0]['views'] if result['topPerformers'] else 0:,} views, "
          f"{len(result['backfillWarnings'])} warnings "
          f"({sum(1 for w in result['backfillWarnings'] if w['status']=='OVERDUE')} OVERDUE / "
          f"{sum(1 for w in result['backfillWarnings'] if w['status']=='waiting')} waiting), "
          f"{len(result['noUrlHistorical'])} no-URL historical")
    print(f"   → {TARGET.relative_to(REPO_ROOT)}")


if __name__ == "__main__":
    main()
