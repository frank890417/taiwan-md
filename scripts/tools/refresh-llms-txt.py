#!/usr/bin/env python3
"""
refresh-llms-txt.py — auto-refresh public/llms.txt content statistics

Reads dashboard-vitals.json + counts People articles + reads dashboard-i18n.json,
then patches the numerical lines in public/llms.txt in-place using regex replace.

Lines patched:
1. "Total articles: **N** Chinese (SSOT) + N English + N Japanese + N Korean + N Spanish + N French = N across 6 languages"
2. "5 non-Chinese languages each ≥ 80% real freshPct (en X% / ja Y% / ko Z% / fr W% / es V%)"
3. "People profiles: N+"
4. "Contributors: N"
5. "Average revisions per article: N"
6. "210+" appearing in `People (人物) — N+ profiles:`

Triggered from refresh-data.sh Step 2.95 (added 2026-05-04 per DNA #43:
new dashboard-* generators must register in refresh-data.sh or go silent stale).

Usage:
  python3 scripts/tools/refresh-llms-txt.py [--check] [--dry-run]

  --check    exit 1 if llms.txt would change (CI gate)
  --dry-run  print diff without writing

Per DNA #48 (mechanical first, LLM last) — this script is pure deterministic
regex replace, no LLM calls, runs in <100ms.
"""

import argparse
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent.parent
LLMS_TXT = ROOT / "public" / "llms.txt"
VITALS_JSON = ROOT / "public" / "api" / "dashboard-vitals.json"
I18N_JSON = ROOT / "public" / "api" / "dashboard-i18n.json"
PEOPLE_DIR = ROOT / "knowledge" / "People"


def count_people_articles() -> int:
    if not PEOPLE_DIR.is_dir():
        return 0
    return sum(1 for f in PEOPLE_DIR.glob("*.md") if not f.name.startswith("_"))


def round_to_tens(n: int) -> int:
    """Round down to nearest 10 for display (210+ not 213+)."""
    return (n // 10) * 10


def load_vitals() -> dict:
    if not VITALS_JSON.exists():
        print(f"⚠️  {VITALS_JSON} not found — run prebuild first", file=sys.stderr)
        sys.exit(2)
    return json.loads(VITALS_JSON.read_text())


def load_i18n_fresh_pct() -> dict:
    """Return {lang: pct} from dashboard-i18n.json. Missing file = empty dict."""
    if not I18N_JSON.exists():
        return {}
    try:
        data = json.loads(I18N_JSON.read_text())
        # Schema: data['languages'] = [{lang: 'en', freshPct: 96.0, ...}, ...]
        out = {}
        for entry in data.get("languages", []):
            lang = entry.get("lang") or entry.get("code")
            pct = entry.get("freshPct") or entry.get("realFreshPct")
            if lang and pct is not None:
                out[lang] = pct
        return out
    except (json.JSONDecodeError, KeyError):
        return {}


def fmt_lang_freshpct(fresh: dict) -> str:
    """Build 'en 96% / ja 97% / ko 93% / fr 93% / es 80%' string."""
    order = ["en", "ja", "ko", "fr", "es"]
    parts = []
    for lang in order:
        pct = fresh.get(lang)
        if pct is None:
            continue
        parts.append(f"{lang} {int(round(pct))}%")
    return " / ".join(parts)


def patch_llms_txt(content: str, vitals: dict, fresh: dict, people_count: int) -> str:
    cov = vitals.get("languageCoverage", {})
    zh = cov.get("zh-TW", 0)
    en = cov.get("en", 0)
    ja = cov.get("ja", 0)
    ko = cov.get("ko", 0)
    es = cov.get("es", 0)
    fr = cov.get("fr", 0)
    total = zh + en + ja + ko + es + fr
    contributors = vitals.get("contributors", 0)
    avg_rev = vitals.get("avgRevision", 0)

    # 1. Total articles line
    content = re.sub(
        r"Total articles: \*\*\d+\*\* Chinese \(SSOT\) \+ \d+ English \+ \d+ Japanese \+ \d+ Korean \+ \d+ Spanish \+ \d+ French = [\d,]+ across 6 languages",
        f"Total articles: **{zh}** Chinese (SSOT) + {en} English + {ja} Japanese + {ko} Korean + {es} Spanish + {fr} French = {total:,} across 6 languages",
        content,
    )

    # 2. Lang freshPct line (only if i18n data available)
    if fresh:
        fresh_str = fmt_lang_freshpct(fresh)
        if fresh_str:
            content = re.sub(
                r"5 non-Chinese languages each ≥ 80% real freshPct \([^)]+\)",
                f"5 non-Chinese languages each ≥ 80% real freshPct ({fresh_str})",
                content,
            )

    # 3. People profiles
    rounded = round_to_tens(people_count)
    content = re.sub(
        r"People profiles: \d+\+",
        f"People profiles: {rounded}+",
        content,
    )
    # Also patch "People (人物) — N+ profiles:" line
    content = re.sub(
        r"People \(人物\) — \d+\+ profiles:",
        f"People (人物) — {rounded}+ profiles:",
        content,
    )

    # 4. Contributors
    content = re.sub(
        r"^- Contributors: \d+$",
        f"- Contributors: {contributors}",
        content,
        flags=re.MULTILINE,
    )

    # 5. Average revisions
    content = re.sub(
        r"Average revisions per article: [\d.]+",
        f"Average revisions per article: {avg_rev}",
        content,
    )

    return content


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--check", action="store_true", help="exit 1 if llms.txt would change (CI gate)")
    parser.add_argument("--dry-run", action="store_true", help="print diff without writing")
    args = parser.parse_args()

    if not LLMS_TXT.exists():
        print(f"❌ {LLMS_TXT} not found", file=sys.stderr)
        sys.exit(2)

    original = LLMS_TXT.read_text()
    vitals = load_vitals()
    fresh = load_i18n_fresh_pct()
    people = count_people_articles()
    updated = patch_llms_txt(original, vitals, fresh, people)

    if updated == original:
        print(f"✓ llms.txt 已是最新 (zh {vitals['languageCoverage']['zh-TW']} / contributors {vitals['contributors']} / People ~{round_to_tens(people)}+)")
        return 0

    if args.check:
        print(f"❌ llms.txt 過時 — 跑 python3 scripts/tools/refresh-llms-txt.py 修復", file=sys.stderr)
        return 1

    if args.dry_run:
        # Show first 5 changed lines for preview
        from difflib import unified_diff
        diff = unified_diff(
            original.splitlines(keepends=True),
            updated.splitlines(keepends=True),
            fromfile="llms.txt (current)",
            tofile="llms.txt (refreshed)",
            n=1,
        )
        sys.stdout.writelines(diff)
        return 0

    LLMS_TXT.write_text(updated)
    cov = vitals["languageCoverage"]
    print(f"✓ llms.txt refreshed: zh {cov['zh-TW']} / en {cov['en']} / ja {cov['ja']} / ko {cov['ko']} / es {cov['es']} / fr {cov['fr']} / contributors {vitals['contributors']} / People ~{round_to_tens(people)}+")
    return 0


if __name__ == "__main__":
    sys.exit(main())
