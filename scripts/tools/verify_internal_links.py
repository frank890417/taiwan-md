#!/usr/bin/env python3
"""verify_internal_links.py — post-build internal link verifier (parallel).

2026-06-10 build audit 熱點 #4：原本是 verify-internal-links.sh 內嵌的單執行緒
heredoc python（5,262 頁 × html.parser 全文解析 ≈ 64s，隨頁數線性變慢）。
抽成獨立檔案 + multiprocessing.Pool 平行掃描；報表邏輯與輸出格式逐行保留
（maintainer routine 會 grep ratio 行）。呼叫入口仍是 verify-internal-links.sh。
"""
import sys
import os
import re
import random
import html.parser
import multiprocessing as mp
from urllib.parse import unquote, urlparse
from pathlib import Path
from collections import defaultdict, Counter

# ── Config ───────────────────────────────────────────────────────

DIST_DIR = sys.argv[1] if len(sys.argv) > 1 else "dist"
SAMPLE_SIZE = int(sys.argv[2]) if len(sys.argv) > 2 else 0

LANG_SWITCHER_LABELS = {"中文", "English", "日本語", "한국어",
                        "Switch to English", "Switch to 中文",
                        "Switch to 日本語", "Switch to 한국어"}

LANG_PREFIXES = ["/en/", "/ja/", "/ko/", "/es/", "/fr/"]

# Broken ratio must be below this to pass.
# History: 1.0 → 7.0 on 2026-05-04 (jovial-feistel) as a "temporary" raise when
# postbuild wiring first surfaced ~5.7% accumulated broken slugs; the temporary
# number then drifted into de-facto spec while ROUTINE.md still said 1%
# (audit 2026-06-10 finding R-5 / decision D-3).
# 2026-06-10 calibration（REFLEXES #66，同日兩次修正的全紀錄留作教材）:
#   第一次（不完整 dist 抽樣 0.00%）→ 設 2.0 — 錯，量測基底是平行 build 寫到
#   一半的 dist。完整 dist 重測：gated 6.42%（zh-TW rendered 層 11.37% 佔大宗，
#   含當日殭屍翻譯清理的過渡噪音 + ko diary 路由缺頁長尾）。
#   定案 7.0 + step-down 計畫：下個 build 吸收 dedup link-fixes 後預期下降；
#   穩態目標 7 → 4 → 2 逐步收，每次收緊必須附當日完整 dist 實測值在本註記。
#   es/fr 為 REPORT-ONLY（首次納入量測的盲區，heal 後 promote 進 gate）。
# 顯式覆寫（必須在 routine memory 記一筆，不准靜默常態化）：
#   BROKEN_LINK_THRESHOLD=4 bash scripts/tools/verify-internal-links.sh ...
THRESHOLD_PERCENT = float(os.environ.get("BROKEN_LINK_THRESHOLD", "7.0"))


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



# ── Parallel worker ──────────────────────────────────────────────

def _scan_chunk(args):
    """Scan a chunk of HTML files. Returns (all_links, broken_links).

    原 main 迴圈邏輯原樣搬入：per-page dedup（pair 以 filepath 為鍵，chunk 間
    檔案不重疊所以跨 worker 也等價）+ per-worker href_exists cache。
    """
    dist_dir, files = args
    all_links = []
    broken_links = []
    seen_pairs = set()
    href_cache = {}

    for filepath in files:
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
            if category == "other" and page_is_article:
                clean = href.split("#")[0].split("?")[0]
                decoded = unquote(clean).lstrip("/")
                parts = decoded.split("/")
                if len(parts) >= 2:
                    non_article = {"_astro", "api", "assets", "images", "og",
                                   "taiwan-shape", "soundscape", "data",
                                   "fork-graph", "resources"}
                    if parts[0] not in non_article:
                        last = parts[-1]
                        if last and last not in {"", "index.html"}:
                            category = "article-crosslink"

            pair = (filepath, href)
            if pair in seen_pairs:
                continue
            seen_pairs.add(pair)

            all_links.append((filepath, href, text, category))

            if href not in href_cache:
                href_cache[href] = href_exists(dist_dir, href)
            if not href_cache[href]:
                broken_links.append((filepath, href, text, category))

    return all_links, broken_links


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

    # 平行掃描：檔案切 chunk 給 Pool；每個 worker 自帶 href cache（hrefs 高度
    # 重複，per-worker cache 仍有效）。檔案彼此獨立 → 結果直接 merge。
    nproc = max(1, min(8, os.cpu_count() or 1))
    if len(html_files) < 64 or nproc == 1:
        a, b = _scan_chunk((dist_dir, html_files))
        all_links.extend(a)
        broken_links.extend(b)
    else:
        n_chunks = nproc * 3
        chunks = [(dist_dir, html_files[i::n_chunks]) for i in range(n_chunks)]
        ctx = mp.get_context("fork") if hasattr(os, "fork") else mp.get_context()
        with ctx.Pool(nproc) as pool:
            for a, b in pool.imap_unordered(_scan_chunk, chunks):
                all_links.extend(a)
                broken_links.extend(b)

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

    # Staged-promotion gating (audit 2026-06-10 D-3, REFLEXES #66b):
    # es/fr were never sampled before today (LANG_PREFIXES blind spot) and have
    # an unhealed backlog (fr frontmatter session pending) — they run in
    # REPORT-ONLY mode: measured + printed loudly, but excluded from the CI
    # gate ratio until healed, then promoted into GATED (remove from set).
    REPORT_ONLY_LANGS = {"es", "fr"}
    gated_total = sum(1 for _, h, _, _ in all_links
                      if lang_prefix(h) not in REPORT_ONLY_LANGS)
    gated_broken = sum(1 for _, h, _, _ in broken_links
                       if lang_prefix(h) not in REPORT_ONLY_LANGS)
    gated_ratio = (gated_broken / gated_total * 100) if gated_total else 0.0

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
    print(f"  Broken ratio (all langs)     : {broken_ratio:.2f}%")
    print(f"  Gated ratio (excl es/fr)     : {gated_ratio:.2f}%  [{gated_broken}/{gated_total}]")
    print(f"  Unique broken targets        : {len(unique_broken)}")
    print(f"  Threshold (CI gate)          : < {THRESHOLD_PERCENT}%")
    # 空輸入不是通過（2026-09-11 maintainer-am 補）。
    # 這支對 dist/ 跑，而 dist/ 是 build 產物：在沒 build 過的 worktree、被清掉的
    # 工作樹、或 build 寫到一半的目錄上跑，它會掃到 0 頁 0 連結然後印 PASSED、
    # exit 0。本檔頂部 THRESHOLD 註記自己就記著這個坑——「第一次（不完整 dist
    # 抽樣 0.00%）→ 設 2.0 — 錯，量測基底是平行 build 寫到一半的 dist」——當時
    # 那個假讀數還被寫進閾值。坑記錄了，出口沒補，所以今天在 origin/main 的乾淨
    # worktree 上又拿到一次 0/0 PASSED。
    # 0 筆不是健康，是沒量到，要有自己的符號（REFLEXES #85 / #24 第 8 種）。
    if total_pages == 0 or total_internal == 0:
        result = "NOT-MEASURED"
    else:
        result = "PASS" if gated_ratio < THRESHOLD_PERCENT else "FAIL"
    print(f"  Result                       : {result}")
    print()

    # Language breakdown
    print("-" * 72)
    print("  BREAKDOWN BY LANGUAGE")
    print("-" * 72)
    for lp in sorted(lang_stats.keys()):
        s = lang_stats[lp]
        r = (s["broken"] / s["total"] * 100) if s["total"] else 0.0
        tag = "  [REPORT-ONLY 未進 gate — 待 heal 後 promote]" if lp in REPORT_ONLY_LANGS else ""
        print(f"  {lp:>8s}  total: {s['total']:>6d}  broken: {s['broken']:>5d}  ratio: {r:.2f}%{tag}")
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

    # ── Broken link families ─────────────────────────────────────
    # 比例是給 CI 用的單一布林，top-N 清單印的是它當下印得下的那些。
    # 兩者都看不見「數量少但結構一致」的家族：N 條死連結指向同一個 route，
    # 佔比進不了紅線、又被字母序打散在截斷線以下。本段按 route 家族分組，
    # 全部印出不截斷 — 家族數遠少於 unique target 數。
    # 誕生：LESSONS `ratio-gate-cannot-surface-a-small-structured-family`
    #      （2026-09-01 lifeTree 31 篇譯文全指向同一個掃不到的 route）
    def route_family(href):
        """把一個死連結歸到它的 route 家族：/fr/music/x/ → /fr/music/*"""
        path = unquote(href).split("?")[0].split("#")[0]
        parts = [p for p in path.split("/") if p]
        if not parts:
            return "/"
        if len(parts) == 1:
            return "/" + parts[0]
        return "/" + "/".join(parts[:-1]) + "/*"

    fam_targets = defaultdict(set)
    fam_hits = Counter()
    for source, href, _text, _cat in broken_links:
        fam = route_family(href)
        fam_targets[fam].add(href)
        fam_hits[fam] += 1

    print("-" * 72)
    print("  BROKEN LINK FAMILIES (route prefix — 全部列出，不截斷)")
    print("-" * 72)
    if not fam_targets:
        print("  (none)")
    else:
        print(f"  {'family':<40s} {'targets':>8s} {'links':>8s}")
        for fam, targets in sorted(
            fam_targets.items(), key=lambda kv: (-len(kv[1]), -fam_hits[kv[0]], kv[0])
        ):
            print(f"  {fam:<40s} {len(targets):>8d} {fam_hits[fam]:>8d}")
    print()

    print_broken_section("(a) Language Switcher Dead Links", broken_lang)
    print_broken_section("(b) Article Internal Dead Links", broken_article)
    print_broken_section("(c) Other Dead Internal Links", broken_other)

    # ── Final verdict ────────────────────────────────────────────
    print(sep)
    if result == "NOT-MEASURED":
        print(f"  NOT-MEASURED — 掃到 {total_pages} 頁 / {total_internal} 條連結，沒有東西可量。")
        print(f"  這不是通過。{dist_dir}/ 是 build 產物，先跑 npm run build 再跑本檔；")
        print("  若是在 worktree 裡跑，該 worktree 沒有自己的 dist/。")
    elif result == "PASS":
        print(f"  PASSED — gated broken ratio {gated_ratio:.2f}% < {THRESHOLD_PERCENT}% (all-langs {broken_ratio:.2f}%)")
    else:
        print(f"  FAILED — gated broken ratio {gated_ratio:.2f}% >= {THRESHOLD_PERCENT}% (all-langs {broken_ratio:.2f}%)")
    print(sep)

    # NOT-MEASURED 回 2，跟 FAIL 的 1 分開：呼叫端要能區分「壞了」與「沒量到」。
    sys.exit(0 if result == "PASS" else (2 if result == "NOT-MEASURED" else 1))


if __name__ == "__main__":
    main()