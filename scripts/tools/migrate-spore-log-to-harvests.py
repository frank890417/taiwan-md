#!/usr/bin/env python3
"""migrate-spore-log-to-harvests.py — one-time migration: SPORE-LOG narrative → canonical batch log

Phase 6 of reports/spore-ssot-pipeline-cleanup-2026-05-08.md (Q1 翻牌：demolish 雙寫).

## Why

SPORE-LOG.md 成效追蹤 table 過去是 narrative SSOT — humans/agents wrote D+N harvest
metrics into rich-text cells. This is SSOT-fragile (parser regressions, format drift).
Phase 6 demolishes it. Before砍, this script preserves all historical D+N data points
by converting them to canonical SPORE-HARVESTS body table format.

## Algorithm

1. Index existing SPORE-HARVESTS body rows by (n, d_n_int) — these are already canonical.
2. Walk SPORE-LOG 成效追蹤 rows:
   - Parse narrative cell for ALL D+N segments (D+0/D+1/D+3/D+5/D+7/D+8/D+9/D+10/D+30 ...)
   - Extract: views / likes / reposts / comments / shares / engagements / rate
3. Output ONE consolidated `batch-historical-2026-05-08-migration.md`:
   - frontmatter: `spores: '#1, #2, ...'`, `harvest_date: '2026-05-08'`, `triggered_by: migration`
   - body table: one row per (n, D+N) tuple NOT already in existing batches
4. Skip duplicates — if a (n, d_n_int) is already in a SPORE-HARVESTS body, don't migrate.

## Usage

  python3 scripts/tools/migrate-spore-log-to-harvests.py            # dry-run
  python3 scripts/tools/migrate-spore-log-to-harvests.py --apply    # write batch log
  python3 scripts/tools/migrate-spore-log-to-harvests.py --diff     # show parsed segments

## Safety

- Default dry-run, --apply required to write.
- Output is one new file (no overwrites). Reversal: rm the migration file.
- Existing batch logs unchanged.
- Migration is idempotent: re-running produces same output (or empty if all already migrated).

2026-05-08 laughing-goldstine | Phase 6 of spore SSOT cleanup
"""
from __future__ import annotations

import argparse
import re
import sys
from collections import defaultdict
from datetime import date
from pathlib import Path

REPO = Path(__file__).resolve().parents[2]
SPORE_LOG = REPO / "docs/factory/SPORE-LOG.md"
HARVESTS_DIR = REPO / "docs/factory/SPORE-HARVESTS"
TODAY = date.today().isoformat()
MIGRATION_FILE = HARVESTS_DIR / f"batch-historical-{TODAY}-migration.md"


# ────────────────── narrative parser ──────────────────


_DAY_RE = re.compile(r"\bD\+(\d+(?:\.\d+)?)\b")
_VIEWS_RE = re.compile(
    r"(\d+(?:\.\d+)?[KMkm]|\d{1,3}(?:,\d{3})+|\d+)\s+views?\b",
)
_NUMBER_RE = r"(\d+(?:\.\d+)?[KMkm]|\d{1,3}(?:,\d{3})+|\d+)"

# Marker → field name map (emoji-based, since narrative uses these)
_MARKERS = {
    "♥": "likes",
    "🔁": "reposts",
    "💬": "comments",
    "📮": "shares",  # bookmarks/shares
}


def parse_number(s):
    if not s:
        return None
    s = s.strip().replace(",", "").replace("*", "").replace(" ", "")
    if not s or s in ("—", "-", "no-data", "n/a"):
        return None
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
    return int(num)


def split_dn_segments(narrative):
    """Split narrative cell into segments by D+N markers.

    Returns list of (d_n_int, segment_text) tuples. d_n_int is float (D+0.5 → 0.5)
    but we cast to int for integer days; keep float D+0.5 as 0.5 (will round to 0 for canonical d_n).
    """
    if not narrative:
        return []
    matches = list(_DAY_RE.finditer(narrative))
    if not matches:
        return []
    segments = []
    for i, m in enumerate(matches):
        d_n = float(m.group(1))
        start = m.start()
        end = matches[i + 1].start() if i + 1 < len(matches) else len(narrative)
        seg_text = narrative[start:end]
        segments.append((d_n, seg_text))
    return segments


def parse_segment_metrics(d_n, seg_text):
    """Extract structured metrics from one D+N segment.

    Returns dict {d_n, views, likes, reposts, comments, shares, engagements, rate}
    or None if no parseable views.
    """
    # views (first 'N views' match in segment)
    vm = _VIEWS_RE.search(seg_text)
    if not vm:
        return None
    views = parse_number(vm.group(1))
    if views is None:
        return None

    # emoji-tagged metrics: scan for "N♥" / "N🔁" / "N💬" / "N📮"
    # Use lookahead to handle bold markers: "**1,000♥**"
    out = {
        "d_n": int(d_n) if d_n.is_integer() else d_n,
        "views": views,
    }
    for emoji, key in _MARKERS.items():
        pat = rf"({_NUMBER_RE})\s*{re.escape(emoji)}"
        m = re.search(pat, seg_text)
        if m:
            n = parse_number(m.group(1))
            if n is not None:
                out[key] = n

    # engagements (after '=' sign, before /):
    em = re.search(rf"=\s*{_NUMBER_RE}\s+engagements?\b", seg_text)
    if em:
        out["engagements"] = parse_number(em.group(1))

    # rate (e.g., "rate 1.8%")
    rm = re.search(r"rate\s*([\d.]+)\s*%", seg_text, re.IGNORECASE)
    if rm:
        out["rate"] = f"{rm.group(1)}%"

    return out


# ────────────────── SPORE-LOG row parser ──────────────────


def parse_spore_log_metrics_rows():
    """Parse 成效追蹤 table → list of {n, slug, platform, narrative, struct_views_7d, ...}.

    Returns rich dict including struct cols (7d 觸及 / 7d 互動 / 30d 觸及 / 30d 互動)
    so we can synthesize D+7 / D+30 entries from struct data even when narrative
    has no D+N markers (common for old spores #1-#28 with simple struct-only rows).
    """
    if not SPORE_LOG.exists():
        return []
    text = SPORE_LOG.read_text(encoding="utf-8")
    in_section = False
    in_table = False
    headers = None
    rows = []
    for line in text.splitlines():
        if line.startswith("## 成效追蹤"):
            in_section = True
            continue
        if in_section and line.startswith("## "):
            break
        if not in_section:
            continue
        if not line.startswith("|"):
            continue
        if line.startswith("| #"):
            headers = [c.strip() for c in line.strip("|").split("|")]
            in_table = True
            continue
        if not in_table:
            continue
        if re.match(r"^\|\s*-+", line):
            continue
        cells = [c.strip() for c in line.strip("|").split("|")]
        if not headers or len(cells) != len(headers):
            continue
        row = dict(zip(headers, cells))
        n_str = row.get("#", "").strip()
        if not n_str.isdigit():
            continue
        rows.append({
            "n": int(n_str),
            "slug": row.get("文章 slug", row.get("文章", "")),
            "platform": (row.get("平台") or "").strip(),
            "narrative": row.get("最後 harvest", ""),
            "last_harvest_at": row.get("最後 harvest 時間", ""),
            # Phase 6 supplemental: also capture struct cols
            "struct_views_7d": parse_number(row.get("7d 觸及", "")),
            "struct_engagements_7d": parse_number(row.get("7d 互動", "")),
            "struct_views_30d": parse_number(row.get("30d 觸及", "")),
            "struct_engagements_30d": parse_number(row.get("30d 互動", "")),
        })
    return rows


# ────────────────── existing SPORE-HARVESTS coverage ──────────────────


def collect_existing_coverage():
    """Walk SPORE-HARVESTS/, return set of (n, d_n_int) tuples already in canonical batch logs."""
    covered = set()
    if not HARVESTS_DIR.exists():
        return covered
    for md in sorted(HARVESTS_DIR.glob("*.md")):
        # Skip our own migration file if it already exists (idempotent re-run)
        if md.name.startswith("batch-historical-") and "migration" in md.name:
            continue
        text = md.read_text(encoding="utf-8")
        # Strip frontmatter
        if text.startswith("---"):
            end = text.find("---", 3)
            if end != -1:
                text = text[end + 3:]
        in_table = False
        headers = None
        for line in text.splitlines():
            s = line.strip()
            if s.startswith("|") and s.endswith("|"):
                if not in_table:
                    headers = [c.strip().lower() for c in s.strip("|").split("|")]
                    if "#" in headers and ("d+n" in headers or "platform" in headers or "平台" in headers):
                        in_table = True
                    continue
                if re.match(r"^\|\s*-+", line):
                    continue
                cells = [c.strip() for c in s.strip("|").split("|")]
                if not headers or len(cells) != len(headers):
                    continue
                row = dict(zip(headers, cells))
                n_str = (row.get("#") or "").strip()
                if not n_str.isdigit():
                    continue
                n = int(n_str)
                d_n_str = (row.get("d+n") or "").strip().lstrip("D+").strip()
                # d_n could be "D+10" or just "10" or have decimal
                d_n_match = re.match(r"^([\d.]+)", d_n_str)
                if d_n_match:
                    try:
                        d_n_int = int(float(d_n_match.group(1)))
                        covered.add((n, d_n_int))
                    except ValueError:
                        pass
            elif in_table and not s.startswith("|"):
                in_table = False
                headers = None
    return covered


# ────────────────── output formatter ──────────────────


def render_migration_batch(parsed_rows):
    """Render canonical batch log markdown.

    parsed_rows: list of dicts {n, slug, platform, d_n, views, likes, reposts, comments, shares, engagements, rate}
    """
    spore_ns = sorted(set(r["n"] for r in parsed_rows))
    fm_lines = [
        "---",
        f"spores: '{', '.join(f'#{n}' for n in spore_ns)}'",
        f"harvest_date: '{TODAY}'",
        f"harvest_window_day: 'mixed (historical D+0 to D+30, migrated)'",
        f"batch_reason: 'one-time migration from SPORE-LOG 成效追蹤 narrative SSOT to canonical batch log SSOT (Phase 6 demolition)'",
        f"triggered_by: 'observer (migrate-spore-log-to-harvests.py)'",
        f"reply_count: 'n/a (historical migration, no fresh reply scan)'",
        "---",
        "",
        f"# Batch Harvest Historical Migration {TODAY}",
        "",
        f"> Phase 6 SSOT cleanup — converts SPORE-LOG.md 成效追蹤 narrative cells to canonical body table.",
        f"> Source: SPORE-LOG narrative (rich-text human-written D+N segments).",
        f"> Output: {len(parsed_rows)} (n, D+N) tuples not previously in any SPORE-HARVESTS batch log.",
        "",
        "## 數據總覽",
        "",
        "| #   | Slug                       | Platform | D+N  | Views   | Likes  | Reposts | Comments | Shares | Engagements | Rate  |",
        "| --- | -------------------------- | -------- | ---- | ------- | ------ | ------- | -------- | ------ | ----------- | ----- |",
    ]
    # Sort by n asc, then d_n asc
    parsed_rows.sort(key=lambda r: (r["n"], r["d_n"]))
    for r in parsed_rows:
        cells = [
            str(r["n"]),
            r.get("slug", "")[:26],
            r.get("platform", ""),
            f"D+{r['d_n']}",
            f"{r.get('views', '—'):,}" if isinstance(r.get("views"), int) else "—",
            f"{r.get('likes', '—'):,}" if isinstance(r.get("likes"), int) else "—",
            f"{r.get('reposts', '—'):,}" if isinstance(r.get("reposts"), int) else "—",
            f"{r.get('comments', '—'):,}" if isinstance(r.get("comments"), int) else "—",
            f"{r.get('shares', '—'):,}" if isinstance(r.get("shares"), int) else "—",
            f"{r.get('engagements', '—'):,}" if isinstance(r.get("engagements"), int) else "—",
            r.get("rate", "—"),
        ]
        fm_lines.append("| " + " | ".join(cells) + " |")
    fm_lines.extend([
        "",
        "---",
        "",
        f"_Generated by migrate-spore-log-to-harvests.py on {TODAY}._",
        "_Source: SPORE-LOG.md 成效追蹤 narrative cells, parsed and structured for SSOT canonicalization._",
        "_After this migration, SPORE-LOG 成效追蹤 table is deprecated — see Phase 6 of reports/spore-ssot-pipeline-cleanup-2026-05-08.md._",
    ])
    return "\n".join(fm_lines) + "\n"


# ────────────────── main ──────────────────


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--apply", action="store_true",
                    help="Write migration batch log (default: dry-run)")
    ap.add_argument("--diff", action="store_true",
                    help="Show parsed segments per row")
    args = ap.parse_args()

    print("===== migrate-spore-log-to-harvests =====")
    print(f"  mode: {'APPLY (write)' if args.apply else 'DRY-RUN (read-only)'}")
    print(f"  output: {MIGRATION_FILE.relative_to(REPO)}")
    print()

    sl_rows = parse_spore_log_metrics_rows()
    print(f"  SPORE-LOG 成效追蹤 rows: {len(sl_rows)}")

    existing_coverage = collect_existing_coverage()
    print(f"  Existing canonical (n, D+N) coverage: {len(existing_coverage)} tuples")

    # Parse all narratives → list of (n, d_n, metrics)
    # Dedupe within (n, d_n_int): when narrative has multiple D+N entries for same day
    # (e.g., "D+4 first scan" + "D+4 confirmed exact"), keep the row with MOST fields filled.
    parsed_by_key = {}  # (n, d_n_int) → metrics dict
    skipped_dup = 0
    skipped_no_views = 0
    skipped_within_dup = 0
    for row in sl_rows:
        n = row["n"]
        slug = row["slug"]
        platform = row["platform"]
        narrative = row["narrative"]
        segments = split_dn_segments(narrative)
        for d_n_float, seg_text in segments:
            metrics = parse_segment_metrics(d_n_float, seg_text)
            if not metrics:
                skipped_no_views += 1
                continue
            d_n_int = metrics["d_n"]
            d_n_round = int(d_n_int) if isinstance(d_n_int, (int, float)) else 0
            if (n, d_n_round) in existing_coverage:
                skipped_dup += 1
                if args.diff:
                    print(f"  ⏩ skip dup #{n} D+{d_n_int} (already in batch log)")
                continue
            metrics["n"] = n
            metrics["slug"] = slug
            metrics["platform"] = platform
            key = (n, d_n_round)
            existing = parsed_by_key.get(key)
            if existing:
                # Prefer row with more structured fields filled
                existing_fields = sum(1 for k in ("likes", "reposts", "comments", "shares", "engagements", "rate") if k in existing)
                new_fields = sum(1 for k in ("likes", "reposts", "comments", "shares", "engagements", "rate") if k in metrics)
                if new_fields > existing_fields:
                    parsed_by_key[key] = metrics
                    if args.diff:
                        print(f"  🔄 replace #{n} D+{d_n_int} ({platform}): more fields ({new_fields} > {existing_fields})")
                else:
                    skipped_within_dup += 1
                    if args.diff:
                        print(f"  ⏩ skip within-narrative dup #{n} D+{d_n_int} (existing has {existing_fields} fields)")
            else:
                parsed_by_key[key] = metrics
                if args.diff:
                    print(f"  ✅ #{n} D+{d_n_int} ({platform}): views={metrics.get('views'):,}")
    parsed = list(parsed_by_key.values())

    # Phase 6 supplemental: synthesize D+7 / D+30 rows from struct cols when no
    # narrative D+N segment captured them (common for old spores with simple struct-only rows).
    skipped_struct_dup = 0
    for row in sl_rows:
        n = row["n"]
        slug = row["slug"]
        platform = row["platform"]
        for d_n_marker, views_key, eng_key in (
            (7, "struct_views_7d", "struct_engagements_7d"),
            (30, "struct_views_30d", "struct_engagements_30d"),
        ):
            views = row.get(views_key)
            if not views:
                continue
            if (n, d_n_marker) in existing_coverage:
                continue
            # Skip if narrative parser already captured this (n, d_n)
            if any(p["n"] == n and p["d_n"] == d_n_marker for p in parsed):
                skipped_struct_dup += 1
                continue
            entry = {
                "n": n,
                "slug": slug,
                "platform": platform,
                "d_n": d_n_marker,
                "views": views,
            }
            eng = row.get(eng_key)
            if eng:
                entry["engagements"] = eng
            parsed.append(entry)
            if args.diff:
                print(f"  ➕ struct-only #{n} D+{d_n_marker} ({platform}): views={views:,}")

    if skipped_struct_dup:
        print(f"   (also skipped {skipped_struct_dup} struct cols already covered by narrative)")

    print()
    print(f"📊 Parsed segments: {len(parsed)} new + {skipped_dup} cross-batch dup + {skipped_within_dup} within-narrative dup + {skipped_no_views} no-views")
    print(f"   Spores covered: {len(set(r['n'] for r in parsed))}")

    if not parsed:
        print("\n✅ Nothing to migrate — all narrative D+N already in canonical batch logs.")
        return 0

    output = render_migration_batch(parsed)

    if args.apply:
        MIGRATION_FILE.write_text(output, encoding="utf-8")
        print(f"\n✅ Wrote migration batch log → {MIGRATION_FILE.relative_to(REPO)}")
        print(f"   {len(parsed)} (n, D+N) rows preserved as canonical SSOT.")
    else:
        print(f"\n💡 Dry-run only. Run with --apply to write.")
        print(f"   Preview first ~30 lines of output:")
        print()
        for line in output.splitlines()[:30]:
            print(f"  {line}")
        print(f"  ... ({len(output.splitlines()) - 30} more lines)")

    return 0


if __name__ == "__main__":
    sys.exit(main())
