#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────
# verify-internal-links.sh — Post-build internal link verifier
# ─────────────────────────────────────────────────────────────────
#
# Validates every internal link (<a href="/...">) in the built Astro
# site under dist/. Catches dead language-switcher links, broken
# article cross-references, and any other orphaned internal hrefs.
#
# Run AFTER `npx astro build`:
#
#   bash scripts/tools/verify-internal-links.sh          # full scan
#   bash scripts/tools/verify-internal-links.sh --sample 50  # smoke test
#
# Exit codes:
#   0  broken ratio < 1%  (CI pass)
#   1  broken ratio >= 1% or dist/ missing
#
# Requires: python3 (stdlib only, no pip installs)
# ─────────────────────────────────────────────────────────────────

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
DIST_DIR="$PROJECT_ROOT/dist"

SAMPLE_SIZE=0  # 0 = all pages

while [[ $# -gt 0 ]]; do
  case "$1" in
    --sample)
      SAMPLE_SIZE="$2"
      shift 2
      ;;
    --help|-h)
      echo "Usage: $0 [--sample N]"
      echo "  --sample N   randomly test N pages instead of all"
      exit 0
      ;;
    *)
      echo "Unknown argument: $1" >&2
      exit 1
      ;;
  esac
done

if [[ ! -d "$DIST_DIR" ]]; then
  echo "ERROR: dist/ directory not found at $DIST_DIR" >&2
  echo "Run 'npx astro build' first." >&2
  exit 1
fi

# ── Run the Python verifier ──────────────────────────────────────
exec python3 - "$DIST_DIR" "$SAMPLE_SIZE" <<'PYTHON_SCRIPT'
import sys
import os
import re
import random
import html.parser
from urllib.parse import unquote, urlparse
from pathlib import Path
from collections import defaultdict

# ── Config ───────────────────────────────────────────────────────

DIST_DIR = sys.argv[1]
SAMPLE_SIZE = int(sys.argv[2])

LANG_SWITCHER_LABELS = {"中文", "English", "日本語", "한국어",
                        "Switch to English", "Switch to 中文",
                        "Switch to 日本語", "Switch to 한국어"}

LANG_PREFIXES = ["/en/", "/ja/", "/ko/"]

THRESHOLD_PERCENT = 1.0  # broken ratio must be below this to pass


# ── HTML parser ──────────────────────────────────────────────────

class LinkExtractor(html.parser.HTMLParser):
    """Extract <a href> tags with their text content and context."""

    def __init__(self):
        super().__init__()
        self._in_a = False
        self._href = None
        self._cls = ""
        self._text_parts = []
        self._in_related = False
        self._depth_since_related = 0
        self.links = []  # (href, text, category)

    def handle_starttag(self, tag, attrs):
        d = dict(attrs)
        # Track "Related articles" sections via HTML comments or heading text
        if tag in ("section", "div"):
            cls = d.get("class", "")
            if "related" in cls.lower():
                self._in_related = True
                self._depth_since_related = 0
        if self._in_related:
            self._depth_since_related += 1

        if tag == "a":
            self._in_a = True
            self._href = d.get("href", "")
            self._cls = d.get("class", "")
            self._text_parts = []

    def handle_data(self, data):
        if self._in_a:
            self._text_parts.append(data)
        # Detect "相關文章" or "Related" headings to mark related section
        text = data.strip()
        if text in ("相關文章", "Related articles", "Related Articles"):
            self._in_related = True
            self._depth_since_related = 0

    def handle_comment(self, data):
        if "Related articles" in data or "相關文章" in data:
            self._in_related = True
            self._depth_since_related = 0

    def handle_endtag(self, tag):
        if self._in_related:
            self._depth_since_related -= 1
            if self._depth_since_related <= 0 and tag in ("section", "div"):
                self._in_related = False

        if tag == "a" and self._in_a:
            self._in_a = False
            href = self._href or ""
            text = " ".join(self._text_parts).strip()
            cls = self._cls

            if not href.startswith("/"):
                return  # skip external, anchor-only, etc.

            # Categorize
            category = "other"
            if any(label in text for label in LANG_SWITCHER_LABELS):
                category = "lang-switcher"
            elif "lang-btn" in cls or "lang-switch" in cls:
                category = "lang-switcher"
            elif self._in_related:
                category = "related-article"
            # Article cross-links: links from article pages to other articles
            # (will be refined per-page in the main loop)

            self.links.append((href, text, category))


# ── Path resolution ──────────────────────────────────────────────

def href_exists(dist_dir, href):
    """Check if an internal href resolves to a real file in dist/.

    Handles:
      - URL-encoded Unicode paths (%E5%8F%B0... -> 台灣...)
      - Anchors (#section) stripped
      - Trailing slashes
      - /path -> /path/index.html or /path.html
    """
    # Strip anchor and query string
    clean = href.split("#")[0].split("?")[0]
    if not clean or clean == "/":
        # Root always exists (index.html)
        root_index = os.path.join(dist_dir, "index.html")
        return os.path.isfile(root_index)

    # URL-decode (handles %E5%8F%B0 etc.)
    decoded = unquote(clean)

    # Remove leading slash for filesystem join
    rel = decoded.lstrip("/")

    # Try: dist/{rel}/index.html  (directory with index)
    candidate_dir = os.path.join(dist_dir, rel, "index.html")
    if os.path.isfile(candidate_dir):
        return True

    # Try: dist/{rel}  (exact file, e.g. /404.html or asset)
    candidate_file = os.path.join(dist_dir, rel)
    if os.path.isfile(candidate_file):
        return True

    # Try: dist/{rel}.html
    candidate_html = os.path.join(dist_dir, rel + ".html")
    if os.path.isfile(candidate_html):
        return True

    # Try: dist/{rel}/  (directory exists but no index.html — still counts
    # for category pages that might be client-rendered)
    candidate_dironly = os.path.join(dist_dir, rel)
    if os.path.isdir(candidate_dironly):
        # Check if there's any .html inside
        for f in os.listdir(candidate_dironly):
            if f.endswith(".html"):
                return True

    return False


def lang_prefix(href):
    """Return the language prefix (/en/, /ja/, /ko/) or 'zh-TW' for root."""
    for lp in LANG_PREFIXES:
        if href.startswith(lp):
            return lp.strip("/")
    return "zh-TW"


def is_article_page(filepath, dist_dir):
    """Heuristic: article pages live inside category dirs, not top-level."""
    rel = os.path.relpath(filepath, dist_dir)
    parts = Path(rel).parts
    # Article pages: /{category}/{slug}/index.html  (depth >= 2)
    # or /en/{category}/{slug}/index.html (depth >= 3 for translated)
    if len(parts) >= 3:
        return True
    return False


# ── Main scan ────────────────────────────────────────────────────

def main():
    dist_dir = DIST_DIR

    # Collect all HTML files
    html_files = []
    for root, dirs, files in os.walk(dist_dir):
        # Skip _astro (build assets)
        dirs[:] = [d for d in dirs if d != "_astro"]
        for f in files:
            if f.endswith(".html"):
                html_files.append(os.path.join(root, f))

    html_files.sort()

    # Sample mode
    if SAMPLE_SIZE > 0 and SAMPLE_SIZE < len(html_files):
        random.seed(42)  # reproducible sampling
        html_files = random.sample(html_files, SAMPLE_SIZE)
        html_files.sort()

    total_pages = len(html_files)

    # ── Extract and verify links ─────────────────────────────────

    all_links = []          # (source_file, href, text, category)
    broken_links = []       # same shape
    seen_pairs = set()      # (source_file, href) dedup within a page

    # Cache for href resolution
    href_cache = {}

    for filepath in html_files:
        try:
            with open(filepath, "r", encoding="utf-8") as fh:
                content = fh.read()
        except Exception as e:
            print(f"WARNING: cannot read {filepath}: {e}", file=sys.stderr)
            continue

        parser = LinkExtractor()
        try:
            parser.feed(content)
        except Exception as e:
            print(f"WARNING: parse error in {filepath}: {e}", file=sys.stderr)
            continue

        page_is_article = is_article_page(filepath, dist_dir)

        for href, text, category in parser.links:
            # Refine category for article cross-links
            if category == "other" and page_is_article:
                # If the link target looks like an article path (not a
                # category index, not a top-level page), mark it
                clean = href.split("#")[0].split("?")[0]
                decoded = unquote(clean).lstrip("/")
                parts = decoded.split("/")
                # Article link: /{category}/{slug} or /en/{category}/{slug}
                if len(parts) >= 2:
                    # Exclude known non-article paths
                    non_article = {"_astro", "api", "assets", "images", "og",
                                   "taiwan-shape", "soundscape", "data",
                                   "fork-graph", "resources"}
                    if parts[0] not in non_article:
                        # If it doesn't end at a category index
                        last = parts[-1]
                        if last and last not in {"", "index.html"}:
                            category = "article-crosslink"

            pair = (filepath, href)
            if pair in seen_pairs:
                continue
            seen_pairs.add(pair)

            all_links.append((filepath, href, text, category))

            # Check existence
            if href not in href_cache:
                href_cache[href] = href_exists(dist_dir, href)

            if not href_cache[href]:
                broken_links.append((filepath, href, text, category))

    # ── Categorize broken links ──────────────────────────────────

    broken_lang = [(s, h, t, c) for s, h, t, c in broken_links
                   if c == "lang-switcher"]
    broken_article = [(s, h, t, c) for s, h, t, c in broken_links
                      if c in ("related-article", "article-crosslink")]
    broken_other = [(s, h, t, c) for s, h, t, c in broken_links
                    if c not in ("lang-switcher", "related-article",
                                 "article-crosslink")]

    # ── Statistics ───────────────────────────────────────────────

    total_internal = len(all_links)
    total_broken = len(broken_links)
    broken_ratio = (total_broken / total_internal * 100) if total_internal else 0.0

    # Per-language breakdown
    lang_stats = defaultdict(lambda: {"total": 0, "broken": 0})
    for _, href, _, _ in all_links:
        lp = lang_prefix(href)
        lang_stats[lp]["total"] += 1
    for _, href, _, _ in broken_links:
        lp = lang_prefix(href)
        lang_stats[lp]["broken"] += 1

    # Unique broken hrefs
    unique_broken = sorted(set(h for _, h, _, _ in broken_links))

    # ── Report ───────────────────────────────────────────────────

    sep = "=" * 72

    print(sep)
    print("  INTERNAL LINK VERIFICATION REPORT")
    print(f"  dist/ : {dist_dir}")
    if SAMPLE_SIZE > 0:
        print(f"  mode  : SAMPLE ({total_pages} of all pages)")
    else:
        print(f"  mode  : FULL SCAN ({total_pages} pages)")
    print(sep)
    print()

    # Summary
    print(f"  Total internal links checked : {total_internal}")
    print(f"  Total broken links           : {total_broken}")
    print(f"  Broken ratio                 : {broken_ratio:.2f}%")
    print(f"  Unique broken targets        : {len(unique_broken)}")
    print(f"  Threshold (CI gate)          : < {THRESHOLD_PERCENT}%")
    result = "PASS" if broken_ratio < THRESHOLD_PERCENT else "FAIL"
    print(f"  Result                       : {result}")
    print()

    # Language breakdown
    print("-" * 72)
    print("  BREAKDOWN BY LANGUAGE")
    print("-" * 72)
    for lp in sorted(lang_stats.keys()):
        s = lang_stats[lp]
        r = (s["broken"] / s["total"] * 100) if s["total"] else 0.0
        print(f"  {lp:>8s}  total: {s['total']:>6d}  broken: {s['broken']:>5d}  ratio: {r:.2f}%")
    print()

    # Category breakdown
    print("-" * 72)
    print("  BROKEN LINKS BY CATEGORY")
    print("-" * 72)
    print(f"  (a) Language switcher dead links : {len(broken_lang)}")
    print(f"  (b) Article internal dead links  : {len(broken_article)}")
    print(f"  (c) Other dead internal links    : {len(broken_other)}")
    print()

    def print_broken_section(title, items, max_show=50):
        if not items:
            return
        print(f"  --- {title} ({len(items)} total) ---")
        # Group by broken href
        by_href = defaultdict(list)
        for source, href, text, cat in items:
            rel_source = os.path.relpath(source, dist_dir)
            by_href[href].append((rel_source, text))

        shown = 0
        for href in sorted(by_href.keys()):
            if shown >= max_show:
                remaining = len(by_href) - shown
                print(f"    ... and {remaining} more unique broken targets")
                break
            sources = by_href[href]
            decoded = unquote(href)
            if decoded != href:
                print(f"    BROKEN: {href}")
                print(f"            ({decoded})")
            else:
                print(f"    BROKEN: {href}")
            # Show up to 3 source pages
            for src, txt in sources[:3]:
                label = txt[:60] if txt else "(no text)"
                print(f"      <- {src}  [{label}]")
            if len(sources) > 3:
                print(f"      ... and {len(sources) - 3} more pages")
            shown += 1
        print()

    print_broken_section("(a) Language Switcher Dead Links", broken_lang)
    print_broken_section("(b) Article Internal Dead Links", broken_article)
    print_broken_section("(c) Other Dead Internal Links", broken_other)

    # ── Final verdict ────────────────────────────────────────────
    print(sep)
    if result == "PASS":
        print(f"  PASSED — broken ratio {broken_ratio:.2f}% < {THRESHOLD_PERCENT}%")
    else:
        print(f"  FAILED — broken ratio {broken_ratio:.2f}% >= {THRESHOLD_PERCENT}%")
    print(sep)

    sys.exit(0 if result == "PASS" else 1)


if __name__ == "__main__":
    main()
PYTHON_SCRIPT
