#!/usr/bin/env python3
"""sync-spore-links.py — regenerate knowledge/{...}.md sporeLinks frontmatter from SSOT.

Phase 3 of reports/spore-ssot-pipeline-cleanup-2026-05-08.md.

## Why

knowledge/*.md frontmatter `sporeLinks` is currently human/agent-written, drifts from
SPORE-LOG (identity SSOT) + SPORE-HARVESTS (event SSOT). This script makes sporeLinks
a DERIVED VIEW: regenerate from canonical sources, never human-edited.

After Phase 3, the rule is:
  - SPORE-LOG.md 發文紀錄 table         = identity SSOT (humans write spore #/URL/date)
  - SPORE-HARVESTS/{batch}.md body      = harvest event SSOT (humans/agents write metrics)
  - knowledge/*.md sporeLinks           = generated, never human-edited
  - src/content/*.md sporeLinks         = mirror of knowledge (existing sync covers it)

## Algorithm

1. Build URL → spore #/article-slug from SPORE-LOG 發文紀錄.
2. Walk SPORE-HARVESTS/, parse body tables, index latest D+N body per spore #.
3. Group spores by article slug → list of canonical sporeLink entries.
4. For each article in knowledge/, replace sporeLinks block in frontmatter.

Each canonical sporeLink entry shape:
  - platform: 'threads' | 'x'
  - date:     'YYYY-MM-DD'                 ← from SPORE-LOG 發文紀錄 row
  - url:      '<canonical URL>'             ← from SPORE-LOG (SSOT for URL)
  - views, likes, reposts, comments, shares ← from latest D+N harvest body row

## Usage

  python3 scripts/tools/sync-spore-links.py                 # dry-run (default)
  python3 scripts/tools/sync-spore-links.py --apply         # write changes
  python3 scripts/tools/sync-spore-links.py --diff          # show full diff
  python3 scripts/tools/sync-spore-links.py --article SLUG  # only this article

## Safety

- Default mode is dry-run — no writes without --apply.
- Each article diff shown explicitly before write.
- Articles without spores in SPORE-LOG → sporeLinks block REMOVED (was orphan).
- Articles without harvest body data yet → sporeLink with date+url only (no metrics).

2026-05-08 laughing-goldstine | Phase 3 of spore SSOT cleanup
"""
from __future__ import annotations

import argparse
import re
import sys
from collections import defaultdict
from pathlib import Path

REPO = Path(__file__).resolve().parents[2]
SPORE_LOG = REPO / "docs/factory/SPORE-LOG.md"
HARVESTS_DIR = REPO / "docs/factory/SPORE-HARVESTS"
KNOWLEDGE_ROOT = REPO / "knowledge"
SRC_CONTENT_ROOT = REPO / "src/content/zh-TW"  # mirror target

# Map knowledge/ category dir → src/content/zh-TW/ slug dir
# (knowledge uses Capitalized names; src/content uses lowercased)
_CAT_MAP = {
    "Art": "art",
    "Culture": "culture",
    "Economics": "economics",
    "History": "history",
    "Music": "music",
    "Nature": "nature",
    "People": "people",
    "Society": "society",
    "Technology": "technology",
}


# ────────────────── parsers ──────────────────

_HARVEST_COL_ALIASES = {
    "#": "n", "slug": "slug", "文章": "slug",
    "platform": "platform", "平台": "platform",
    "d+n": "d_n",
    "views": "views", "views (抓取時)": "views", "views (exact)": "views",
    "likes": "likes", "reposts": "reposts", "comments": "comments",
    "shares": "shares", "shares/bm": "shares",
    "engagements": "engagements", "rate": "rate", "互動率": "rate",
}


def _normalize_col(c):
    return _HARVEST_COL_ALIASES.get(c.strip().lower(), c.strip().lower())


def parse_publication_table():
    """Parse SPORE-LOG 發文紀錄 → list of {n, date, lang, platform, slug, url}."""
    if not SPORE_LOG.exists():
        return []
    text = SPORE_LOG.read_text(encoding="utf-8")
    sections = {}
    cur, buf = None, []
    for line in text.splitlines():
        if line.startswith("## "):
            if cur:
                sections[cur] = "\n".join(buf)
            cur, buf = line[3:].strip(), []
        elif cur is not None:
            buf.append(line)
    if cur:
        sections[cur] = "\n".join(buf)

    pub_section = sections.get("發文紀錄", "")
    rows = []
    table_lines = [l for l in pub_section.splitlines() if l.strip().startswith("|")]
    if len(table_lines) < 3:
        return rows
    headers = [c.strip() for c in table_lines[0].strip("|").split("|")]
    for line in table_lines[2:]:
        cells = [c.strip() for c in line.strip("|").split("|")]
        if len(cells) != len(headers):
            continue
        row = dict(zip(headers, cells))
        n_str = row.get("#", "").strip()
        if not n_str.isdigit():
            continue
        # Extract URL from markdown link
        url_cell = row.get("URL", "")
        m = re.search(r"\((https?://[^\)]+)\)", url_cell)
        url = m.group(1) if m else None
        rows.append({
            "n": int(n_str),
            "date": row.get("日期", "").strip(),
            "lang": row.get("語言", "").strip().lower(),
            "platform": row.get("平台", "").strip().lower(),
            "slug": row.get("文章 slug", "").strip(),
            "url": url,
        })
    return rows


def parse_frontmatter_dict(md_path):
    text = md_path.read_text(encoding="utf-8")
    if not text.startswith("---"):
        return None
    end = text.find("---", 3)
    if end == -1:
        return None
    fm = {}
    for line in text[3:end].splitlines():
        if ":" in line:
            k, v = line.split(":", 1)
            fm[k.strip()] = v.strip().strip("'\"")
    return fm


def parse_harvest_body(md_path):
    text = md_path.read_text(encoding="utf-8")
    if text.startswith("---"):
        end = text.find("---", 3)
        if end != -1:
            text = text[end + 3:]
    table_lines = []
    in_t = False
    for line in text.splitlines():
        s = line.strip()
        if s.startswith("|") and s.endswith("|"):
            table_lines.append(s)
            in_t = True
        elif in_t and not s.startswith("|"):
            break
    if len(table_lines) < 3:
        return []
    headers = [_normalize_col(h) for h in
               (c.strip() for c in table_lines[0].strip("|").split("|"))]
    rows = []
    for line in table_lines[2:]:
        cells = [c.strip() for c in line.strip("|").split("|")]
        if len(cells) != len(headers):
            continue
        row = dict(zip(headers, cells))
        n = row.get("n", "").strip()
        if not n.isdigit():
            continue
        d_n = row.get("d_n", "").strip().lstrip("D+").strip()
        row["d_n_int"] = int(d_n) if d_n.isdigit() else 0
        row["n"] = int(n)
        rows.append(row)
    return rows


def collect_latest_harvest_per_spore():
    """Walk SPORE-HARVESTS/, return {n: latest body row}."""
    spores_to_body = {}  # n → (d_n_int, harvest_date, body_row)
    for md in sorted(HARVESTS_DIR.glob("*.md")):
        fm = parse_frontmatter_dict(md)
        if not fm:
            continue
        # Read which spores this batch covers
        spore_str = fm.get("spores") or fm.get("spore") or ""
        spore_ns = [int(t) for t in re.findall(r"#?(\d+)", spore_str)]
        if not spore_ns:
            continue
        body_rows = parse_harvest_body(md)
        body_by_n = {r["n"]: r for r in body_rows}
        harvest_date = fm.get("harvest_date", "")
        for n in spore_ns:
            row = body_by_n.get(n)
            if not row:
                continue
            # Keep latest by d_n_int desc, then harvest_date desc
            cur = spores_to_body.get(n)
            if cur is None or (row["d_n_int"], harvest_date) > (cur[0], cur[1]):
                spores_to_body[n] = (row["d_n_int"], harvest_date, row)
    return {n: t[2] for n, t in spores_to_body.items()}


# ────────────────── helpers ──────────────────


def _parse_int(v):
    if v is None:
        return None
    s = str(v).strip().replace(",", "").replace("*", "").replace(" ", "")
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


def find_article_path(slug):
    """Find knowledge/*/{slug}.md by basename match. Returns Path or None."""
    matches = list(KNOWLEDGE_ROOT.rglob(f"{slug}.md"))
    return matches[0] if matches else None


def src_content_mirror(knowledge_path):
    """Map knowledge/Cat/{slug}.md → src/content/zh-TW/cat/{slug}.md (or None if absent)."""
    try:
        rel = knowledge_path.relative_to(KNOWLEDGE_ROOT)
    except ValueError:
        return None
    parts = rel.parts
    if len(parts) != 2:
        return None
    cat_kn = parts[0]
    cat_sc = _CAT_MAP.get(cat_kn, cat_kn.lower())
    target = SRC_CONTENT_ROOT / cat_sc / parts[1]
    return target if target.exists() else None


# ────────────────── canonical sporeLink builder ──────────────────


def parse_existing_sporelinks(md_path):
    """Read existing sporeLinks block, return list of dicts. Used as fallback when
    SPORE-HARVESTS body has no data — preserve human-written metrics rather than nuking.
    """
    if not md_path.exists():
        return []
    text = md_path.read_text(encoding="utf-8")
    if not text.startswith("---"):
        return []
    end = text.find("---", 3)
    if end == -1:
        return []
    fm = text[3:end]
    if "sporeLinks:" not in fm:
        return []
    items = []
    cur = None
    in_block = False
    for line in fm.split("\n"):
        if line.strip().startswith("sporeLinks:"):
            in_block = True
            continue
        if not in_block:
            continue
        if line.startswith("  - "):
            if cur:
                items.append(cur)
            cur = {}
            kv = line[4:].split(":", 1)
            if len(kv) == 2:
                cur[kv[0].strip()] = kv[1].strip().strip("'\"")
        elif line.startswith("    "):
            if cur is None:
                continue
            kv = line.strip().split(":", 1)
            if len(kv) == 2:
                cur[kv[0].strip()] = kv[1].strip().strip("'\"")
        else:
            if cur:
                items.append(cur)
                cur = None
            if line.strip() and not line.startswith(" "):
                in_block = False
    if cur:
        items.append(cur)
    return items


def build_canonical_sporelinks(pub_rows, harvests):
    """Group by article slug → list of canonical sporeLinks entries.

    Entry shape matches existing frontmatter convention:
      - platform / date / url / views / likes / reposts / comments / shares

    Phase 3 fallback rule (avoid lossy regen):
      1. SPORE-HARVESTS body data wins (canonical SSOT)
      2. If body has no entry for spore #, fall back to existing knowledge/*.md
         sporeLinks values for matching URL — preserve human-written metrics
         rather than blanking them.
    """
    by_slug = defaultdict(list)
    # Pre-index existing sporeLinks by URL for fallback lookup.
    # IMPORTANT: only walk zh canonical (knowledge/{Cat}/*.md), NOT knowledge/en/, ja/ etc
    # — multilingual mirrors can have stale metrics that would corrupt fallback.
    existing_by_url = {}
    LANG_DIRS = {"en", "ja", "ko", "es", "fr", "zh-TW"}
    for kn_md in KNOWLEDGE_ROOT.rglob("*.md"):
        rel = kn_md.relative_to(KNOWLEDGE_ROOT)
        if rel.parts and rel.parts[0] in LANG_DIRS:
            continue  # skip multilingual mirrors
        for sl in parse_existing_sporelinks(kn_md):
            url = sl.get("url", "")
            if url:
                existing_by_url[url] = sl

    for pub in pub_rows:
        if not pub["url"] or not pub["slug"]:
            continue
        if pub.get("lang") and pub["lang"] != "zh":
            continue
        if pub["platform"] not in ("threads", "x"):
            continue

        body = harvests.get(pub["n"])
        existing = existing_by_url.get(pub["url"])

        entry = {
            "platform": pub["platform"],
            "date": pub["date"],
            "url": pub["url"],
        }
        for key in ("views", "likes", "reposts", "comments", "shares"):
            # Priority: harvest body → existing sporeLinks
            v = _parse_int(body.get(key)) if body else None
            if v is None and existing:
                v = _parse_int(existing.get(key))
            if v is not None:
                entry[key] = v

        by_slug[pub["slug"]].append(entry)

    for slug in by_slug:
        by_slug[slug].sort(key=lambda e: (e["date"], e["platform"]))
    return by_slug


# ────────────────── frontmatter rewriter ──────────────────


SPORELINK_BLOCK_RE = re.compile(
    r"(?ms)^sporeLinks:\s*\n(?:(?:  - .*?\n(?:    .*?\n)*)+)?",
)


def render_sporelinks_block(entries):
    """Render canonical sporeLinks YAML block (string)."""
    if not entries:
        return ""
    out = ["sporeLinks:"]
    for e in entries:
        out.append(f"  - platform: '{e['platform']}'")
        out.append(f"    date: '{e['date']}'")
        out.append(f"    url: '{e['url']}'")
        for k in ("views", "likes", "reposts", "comments", "shares"):
            if k in e:
                out.append(f"    {k}: {e[k]}")
    return "\n".join(out) + "\n"


def update_article_sporelinks(article_path, new_block):
    """Replace sporeLinks frontmatter block. Returns (changed, before, after).

    If article has no sporeLinks block AND new_block is non-empty: insert before closing ---.
    If article has sporeLinks block AND new_block is empty: remove block.
    Otherwise: replace.
    """
    text = article_path.read_text(encoding="utf-8")
    if not text.startswith("---"):
        return False, text, text
    end = text.find("---", 3)
    if end == -1:
        return False, text, text

    fm = text[3:end]
    body = text[end:]

    has_existing = bool(SPORELINK_BLOCK_RE.search(fm))

    if has_existing:
        new_fm = SPORELINK_BLOCK_RE.sub(new_block, fm, count=1)
    elif new_block:
        # Insert before closing newline of frontmatter
        new_fm = fm.rstrip() + "\n" + new_block
    else:
        return False, text, text

    new_text = "---" + new_fm + body
    if new_text == text:
        return False, text, text
    return True, text, new_text


# ────────────────── diff helper ──────────────────


def show_diff(before, after, name):
    """Show unified diff snippet for sporeLinks section only."""
    import difflib
    b_lines = before.splitlines(keepends=True)
    a_lines = after.splitlines(keepends=True)
    diff = list(difflib.unified_diff(b_lines, a_lines, fromfile=f"a/{name}",
                                      tofile=f"b/{name}", n=2))
    return "".join(diff)


# ────────────────── main ──────────────────


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--apply", action="store_true",
                    help="Write changes (default: dry-run)")
    ap.add_argument("--diff", action="store_true",
                    help="Show full diff for each changed file")
    ap.add_argument("--article", default=None,
                    help="Only sync this article slug (for testing)")
    args = ap.parse_args()

    print("===== sync-spore-links =====")
    print(f"  mode: {'APPLY (write)' if args.apply else 'DRY-RUN (read-only)'}")
    if args.article:
        print(f"  filter: {args.article} only")
    print()

    pub_rows = parse_publication_table()
    print(f"  SPORE-LOG identity rows: {len(pub_rows)}")

    harvests = collect_latest_harvest_per_spore()
    print(f"  SPORE-HARVESTS body rows indexed: {len(harvests)} spores")

    canonical = build_canonical_sporelinks(pub_rows, harvests)
    print(f"  Articles with canonical sporeLinks: {len(canonical)}")
    print()

    changes = []        # knowledge/ changes
    mirror_changes = [] # src/content/ changes (independent of knowledge/ status)
    missing = []
    for slug, entries in sorted(canonical.items()):
        if args.article and slug != args.article:
            continue
        path = find_article_path(slug)
        if not path:
            missing.append(slug)
            continue
        new_block = render_sporelinks_block(entries)
        changed, before, after = update_article_sporelinks(path, new_block)
        if changed:
            changes.append((slug, path, before, after))

        # src/content/ mirror — check independently
        mirror = src_content_mirror(path)
        if mirror:
            m_changed, m_before, m_after = update_article_sporelinks(mirror, new_block)
            if m_changed:
                mirror_changes.append((slug, mirror, m_before, m_after))

    if missing:
        print(f"⚠️  {len(missing)} articles in SPORE-LOG but no knowledge/*.md found:")
        for s in missing[:10]:
            print(f"     - {s}")
        if len(missing) > 10:
            print(f"     ... ({len(missing) - 10} more)")
        print()

    if not changes and not mirror_changes:
        print("✅ All sporeLinks already in canonical form — no changes needed.")
        return 0

    if changes:
        print(f"📋 {len(changes)} knowledge/ files would change:")
        for slug, path, before, after in changes:
            rel = path.relative_to(REPO)
            if args.diff:
                print(f"\n--- {rel} ---")
                print(show_diff(before, after, str(rel)))
            else:
                b_count = before.count("\n  - platform:")
                a_count = after.count("\n  - platform:")
                print(f"  {rel} (entries {b_count} → {a_count})")

    if mirror_changes:
        print(f"\n📋 {len(mirror_changes)} src/content/ mirror files would change:")
        for slug, path, before, after in mirror_changes:
            rel = path.relative_to(REPO)
            if args.diff:
                print(f"\n--- {rel} ---")
                print(show_diff(before, after, str(rel)))
            else:
                b_count = before.count("\n  - platform:")
                a_count = after.count("\n  - platform:")
                print(f"  {rel} (entries {b_count} → {a_count})")

    if args.apply:
        for slug, path, _, after in changes:
            path.write_text(after, encoding="utf-8")
        for slug, path, _, after in mirror_changes:
            path.write_text(after, encoding="utf-8")
        print(f"\n✅ Wrote {len(changes)} knowledge files + {len(mirror_changes)} src/content mirrors.")
    else:
        print(f"\n💡 Dry-run only. Run with --apply to write changes.")
        print(f"   Inspect first: python3 {Path(__file__).name} --diff [--article SLUG]")

    return 0


if __name__ == "__main__":
    sys.exit(main())
