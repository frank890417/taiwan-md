#!/usr/bin/env python3
"""
fetch-nml-data.py — 數位荒原 No Man's Land peer content ingester

Idempotent crawler with provenance preservation. Uses sitemap-driven HTML
scraping because heath.tw's custom post types (nml-issue / nml-article /
nml-podcast / nml-announcement / nml-navigation) are NOT exposed via REST.

Usage:
    python3 scripts/tools/fetch-nml-data.py
    python3 scripts/tools/fetch-nml-data.py --types issue,article
    python3 scripts/tools/fetch-nml-data.py --dry-run
    python3 scripts/tools/fetch-nml-data.py --limit 5

Output:
    data/NML/
    ├── README.md
    ├── issues/        56 期 (nml-issue)
    │   ├── INDEX.md
    │   └── {slug}.md
    ├── articles/      ~336+ 篇 (scraped from issue contents)
    │   ├── INDEX.md
    │   └── {slug}.md
    ├── podcasts/      31 集 (nml-podcast)
    ├── announcements/ 74 篇 (nml-announcement)
    ├── navigations/   3 篇 (nml-navigation)
    ├── pages/         ABOUT/CONTRIBUTOR (wp/v2/pages REST works)
    └── raw/
        ├── manifest.json
        ├── sitemap-{type}.xml
        ├── issues-meta.json
        ├── articles-meta.json
        └── ...

Source: PEER-INGESTION-PIPELINE Stage 2 for No Man's Land (heath.tw)
Born: 2026-05-04
"""

from __future__ import annotations

import argparse
import json
import re
import sys
import time
from dataclasses import dataclass, field
from datetime import datetime, timezone
from html import unescape
from html.parser import HTMLParser
from pathlib import Path
from typing import Dict, Iterable, List, Optional, Set
from urllib.error import HTTPError, URLError
from urllib.parse import unquote, urljoin, urlparse
from urllib.request import Request, urlopen

# ============================================================================
# Configuration
# ============================================================================

SITE_ROOT = "https://www.heath.tw"
SITEMAP_INDEX = f"{SITE_ROOT}/wp-sitemap.xml"
USER_AGENT = "Taiwan.md-Semiont/1.0 (+https://taiwan.md; peer-ingestion-pipeline)"
TIMEOUT = 30
RATE_LIMIT = 0.5  # seconds between requests
RETRY_MAX = 3

OUT_DIR = Path(__file__).resolve().parents[2] / "data" / "NML"
RAW_DIR = OUT_DIR / "raw"

# Sitemap → output dir mapping
TYPE_CONFIG = {
    "issue":        {"sitemap": "wp-sitemap-posts-nml-issue-1.xml",        "dir": "issues"},
    "article":      {"sitemap": None,                                       "dir": "articles"},  # sitemap is 500 → from issues
    "podcast":      {"sitemap": "wp-sitemap-posts-nml-podcast-1.xml",      "dir": "podcasts"},
    "announcement": {"sitemap": "wp-sitemap-posts-nml-announcement-1.xml", "dir": "announcements"},
    "navigation":   {"sitemap": "wp-sitemap-posts-nml-navigation-1.xml",   "dir": "navigations"},
}

# REST-accessible types
REST_PAGES_BASE = f"{SITE_ROOT}/wp-json/wp/v2/pages"
PAGES_TO_FETCH = ["about", "contributor", "issue", "article", "podcast", "navigator", "announcement"]

# ============================================================================
# HTTP helpers
# ============================================================================

def http_get(url: str, *, timeout: int = TIMEOUT) -> str:
    """GET URL with retries and polite delay. Returns body text."""
    last_err = None
    for attempt in range(RETRY_MAX):
        try:
            req = Request(url, headers={
                "User-Agent": USER_AGENT,
                "Accept": "*/*",
                "Accept-Language": "zh-TW,zh;q=0.9,en;q=0.8",
            })
            with urlopen(req, timeout=timeout) as resp:
                return resp.read().decode("utf-8", errors="replace")
        except (HTTPError, URLError, Exception) as e:
            last_err = e
            if attempt < RETRY_MAX - 1:
                time.sleep(1.0 * (attempt + 1))
    print(f"  ❌ FAILED {url}: {last_err}", file=sys.stderr)
    return ""


def http_get_json(url: str) -> Optional[object]:
    """GET URL expecting JSON."""
    body = http_get(url)
    if not body:
        return None
    try:
        return json.loads(body)
    except json.JSONDecodeError as e:
        print(f"  ⚠️  JSON decode failed for {url}: {e}", file=sys.stderr)
        return None


# ============================================================================
# Sitemap parsing
# ============================================================================

LOC_RE = re.compile(r"<loc>([^<]+)</loc>", re.I)


def fetch_sitemap_urls(sitemap_path: str) -> List[str]:
    """Fetch sitemap XML and return list of <loc> URLs."""
    url = urljoin(SITE_ROOT + "/", sitemap_path)
    body = http_get(url)
    time.sleep(RATE_LIMIT)
    if not body:
        return []
    return [m.group(1).strip() for m in LOC_RE.finditer(body)]


# ============================================================================
# HTML → Markdown (forked from fetch-tft-data.py with simplifications)
# ============================================================================

VOID_TAGS = {"area", "base", "br", "col", "embed", "hr", "img", "input", "link",
             "meta", "param", "source", "track", "wbr"}
SKIP_TAGS = {"script", "style", "svg", "noscript"}


@dataclass
class Node:
    tag: str
    attrs: Dict[str, str] = field(default_factory=dict)
    children: List[object] = field(default_factory=list)


class TreeBuilder(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.root = Node("root")
        self.stack: List[Node] = [self.root]
        self.skip_depth = 0

    def handle_starttag(self, tag, attrs):
        if self.skip_depth:
            self.skip_depth += 1
            return
        if tag in SKIP_TAGS:
            self.skip_depth = 1
            return
        node = Node(tag, {k: (v or "") for k, v in attrs})
        self.stack[-1].children.append(node)
        if tag not in VOID_TAGS:
            self.stack.append(node)

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag not in VOID_TAGS and self.skip_depth == 0:
            self.handle_endtag(tag)

    def handle_endtag(self, tag):
        if self.skip_depth:
            self.skip_depth -= 1
            return
        for idx in range(len(self.stack) - 1, 0, -1):
            if self.stack[idx].tag == tag:
                del self.stack[idx:]
                break

    def handle_data(self, data):
        if self.skip_depth or not data:
            return
        self.stack[-1].children.append(data)


def parse_html(html: str) -> Node:
    parser = TreeBuilder()
    parser.feed(html or "")
    parser.close()
    return parser.root


def find_all(node: Node, predicate) -> List[Node]:
    """DFS. Return all nodes matching predicate (lambda Node -> bool)."""
    matches: List[Node] = []
    def walk(n: Node):
        if not isinstance(n, Node):
            return
        if predicate(n):
            matches.append(n)
        for c in n.children:
            walk(c)
    walk(node)
    return matches


def text_content(node: Node) -> str:
    """Concatenate all text descendants."""
    parts: List[str] = []
    def walk(n):
        if isinstance(n, str):
            parts.append(n)
            return
        if not isinstance(n, Node):
            return
        if n.tag.lower() in SKIP_TAGS:
            return
        for c in n.children:
            walk(c)
    walk(node)
    return re.sub(r"\s+", " ", unescape("".join(parts))).strip()


def get_attr(node: Node, key: str) -> str:
    if not isinstance(node, Node):
        return ""
    return node.attrs.get(key, "")


def has_class(node: Node, cls: str) -> bool:
    classes = get_attr(node, "class").split()
    return cls in classes


def select_meta(root: Node, prop: str) -> str:
    """Return content attr of <meta property|name="prop">."""
    metas = find_all(root, lambda n: n.tag.lower() == "meta" and (
        n.attrs.get("property", "") == prop or n.attrs.get("name", "") == prop))
    if metas:
        return metas[0].attrs.get("content", "").strip()
    return ""


# ============================================================================
# Markdown rendering (simplified — keep paragraphs, headings, links, lists)
# ============================================================================

class MarkdownRenderer:
    def render(self, html: str) -> str:
        if not html:
            return ""
        root = parse_html(html)
        text = self.render_children(root.children)
        text = re.sub(r"\n{3,}", "\n\n", text)
        return text.strip()

    def render_children(self, children, indent="") -> str:
        return "".join(self.render_node(c, indent) for c in children)

    def render_node(self, node, indent="") -> str:
        if isinstance(node, str):
            return self.clean_text(node)
        if not isinstance(node, Node):
            return ""

        tag = node.tag.lower()
        attrs = node.attrs

        if tag in {"div", "section", "article", "main", "header", "footer", "aside"}:
            return self.render_children(node.children, indent)
        if tag == "p":
            text = self.inline(node.children).strip()
            return f"{text}\n\n" if text else ""
        if tag in {"h1", "h2", "h3", "h4", "h5", "h6"}:
            level = int(tag[1])
            text = self.inline(node.children).strip()
            return f"{'#' * level} {text}\n\n" if text else ""
        if tag == "blockquote":
            text = self.render_children(node.children, indent).strip()
            if not text:
                return ""
            lines = [f"> {ln}" if ln.strip() else ">" for ln in text.splitlines()]
            return "\n".join(lines) + "\n\n"
        if tag == "ul":
            return self.render_list(node, ordered=False)
        if tag == "ol":
            return self.render_list(node, ordered=True)
        if tag == "li":
            text = self.render_children(node.children, indent).strip()
            return text + "\n" if text else ""
        if tag == "hr":
            return "---\n\n"
        if tag == "figure":
            return self.render_children(node.children, indent)
        if tag in {"iframe", "video"}:
            src = attrs.get("src", "").strip()
            return f"{src}\n\n" if src else ""
        if tag in {"a", "span", "strong", "b", "em", "i", "code", "sup", "img", "br"}:
            return self.inline([node])
        return self.render_children(node.children, indent)

    def render_list(self, node, ordered):
        items = [c for c in node.children if isinstance(c, Node) and c.tag.lower() == "li"]
        if not items:
            return ""
        lines = []
        for idx, it in enumerate(items, start=1):
            rendered = self.render_children(it.children).strip()
            if not rendered:
                continue
            split = rendered.splitlines()
            marker = f"{idx}. " if ordered else "- "
            lines.append(marker + split[0].strip())
            for extra in split[1:]:
                if extra.strip():
                    lines.append("   " + extra.strip())
        return "\n".join(lines) + "\n\n"

    def inline(self, children) -> str:
        return self.clean_inline("".join(self.inline_node(c) for c in children))

    def inline_node(self, node) -> str:
        if isinstance(node, str):
            return self.clean_text(node)
        if not isinstance(node, Node):
            return ""
        tag = node.tag.lower()
        attrs = node.attrs
        if tag == "a":
            href = attrs.get("href", "").strip()
            text = self.inline(node.children).strip() or href
            if not href:
                return text
            return f"[{text}]({href})"
        if tag in {"strong", "b"}:
            text = self.inline(node.children).strip()
            return f"**{text}**" if text else ""
        if tag in {"em", "i"}:
            text = self.inline(node.children).strip()
            return f"*{text}*" if text else ""
        if tag == "code":
            text = self.inline(node.children).strip()
            return f"`{text}`" if text else ""
        if tag == "br":
            return "\n"
        if tag == "img":
            src = attrs.get("src", "").strip()
            alt = attrs.get("alt", "").strip() or "image"
            return f"![{alt}]({src})" if src else ""
        if tag == "sup":
            text = self.inline(node.children).strip()
            return f"[^{text}]" if text.isdigit() else text
        if tag in {"span", "small", "mark"}:
            return self.inline(node.children)
        return self.inline(node.children)

    @staticmethod
    def clean_text(text):
        text = unescape(text).replace("\xa0", " ")
        text = re.sub(r"\s+", " ", text)
        return text

    @staticmethod
    def clean_inline(text):
        text = text.replace(" ](", "](")
        text = re.sub(r" +\n", "\n", text)
        text = re.sub(r"\n +", "\n", text)
        text = re.sub(r" {2,}", " ", text)
        return text


# ============================================================================
# Page extractors (HTML → metadata + content + linked URLs)
# ============================================================================

def extract_main_content(root: Node) -> Optional[Node]:
    """Find the article/main content node (heath.tw uses <article> or div.entry-content)."""
    # Try <article> first
    arts = find_all(root, lambda n: n.tag.lower() == "article")
    if arts:
        return arts[0]
    # Try div.entry-content
    ec = find_all(root, lambda n: n.tag.lower() == "div" and has_class(n, "entry-content"))
    if ec:
        return ec[0]
    # Try main
    mains = find_all(root, lambda n: n.tag.lower() == "main")
    if mains:
        return mains[0]
    # Fallback to body
    bodies = find_all(root, lambda n: n.tag.lower() == "body")
    return bodies[0] if bodies else None


def extract_nml_metadata_blocks(root: Node) -> Dict[str, List[str]]:
    """Parse <div class="mdatename"> blocks for NML-specific metadata.

    Each mdatename block has form like:
      <div class="mdatename">
        <span class="fb500">作者：</span>
        <span class="nameisue"><a>王柏偉</a></span>
      </div>

    Or:
      <div class="mdatename">
        <span>December 8th, 2011</span>／<span class="fb500">類型：</span>
        <span class="nameisue">Performance</span>
      </div>

    Returns dict keyed by Chinese label: {作者, 編輯, 出處, 譯者, 類型, ...}
    Plus 'date_text' for the loose first-span date.
    """
    out: Dict[str, List[str]] = {}
    blocks = find_all(root, lambda n: n.tag.lower() == "div" and has_class(n, "mdatename"))
    for block in blocks:
        # Date detection: first <span> child without a class fb500 typically holds date
        spans = find_all(block, lambda n: n.tag.lower() == "span")
        if spans:
            first_text = text_content(spans[0]).strip()
            # Date pattern: e.g. "December 8th, 2011" or "Jan 2012"
            if re.search(r"(?:January|February|March|April|May|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{1,2}(?:st|nd|rd|th)?,?\s+\d{4}", first_text):
                out.setdefault("date_text", []).append(first_text)
            elif re.search(r"\d{4}年\d{1,2}月", first_text):
                out.setdefault("date_text", []).append(first_text)

        # Label parsing: each <span class="fb500"> holds label, next sibling is value
        # We walk children in order
        children = block.children
        i = 0
        while i < len(children):
            child = children[i]
            if isinstance(child, Node) and child.tag.lower() == "span" and has_class(child, "fb500"):
                label = text_content(child).rstrip("：:").strip()
                # Find next .nameisue or non-fb500 span
                value_text = ""
                for j in range(i + 1, len(children)):
                    c2 = children[j]
                    if isinstance(c2, Node) and c2.tag.lower() == "span":
                        value_text = text_content(c2).strip()
                        if value_text:
                            break
                if label and value_text:
                    out.setdefault(label, []).append(value_text)
            i += 1
    return out


def parse_english_date_to_iso(date_text: str) -> str:
    """Convert 'December 8th, 2011' → '2011-12-08' or 'Jan 2012' → '2012-01-01'."""
    months = {
        "january": 1, "february": 2, "march": 3, "april": 4, "may": 5, "june": 6,
        "july": 7, "august": 8, "september": 9, "october": 10, "november": 11, "december": 12,
        "jan": 1, "feb": 2, "mar": 3, "apr": 4, "jun": 6, "jul": 7, "aug": 8,
        "sep": 9, "sept": 9, "oct": 10, "nov": 11, "dec": 12,
    }
    s = date_text.strip().lower().replace(",", "")
    # Try "month day year"
    m = re.match(r"(\w+)\s+(\d{1,2})(?:st|nd|rd|th)?\s+(\d{4})", s)
    if m:
        mo = months.get(m.group(1))
        if mo:
            return f"{m.group(3)}-{mo:02d}-{int(m.group(2)):02d}"
    # Try "month year" or "year month"
    m = re.match(r"(\w+)\s+(\d{4})", s)
    if m:
        mo = months.get(m.group(1))
        if mo:
            return f"{m.group(2)}-{mo:02d}-01"
    # Try Chinese
    m = re.match(r"(\d{4})年(\d{1,2})月(?:(\d{1,2})日)?", date_text)
    if m:
        d = m.group(3) or "1"
        return f"{m.group(1)}-{int(m.group(2)):02d}-{int(d):02d}"
    return ""


def extract_post_metadata(root: Node, url: str) -> Dict[str, str]:
    """Extract title / date / author / category from HTML head + body."""
    meta = {
        "url": url,
        "title": select_meta(root, "og:title") or "",
        "description": select_meta(root, "og:description") or select_meta(root, "description") or "",
        "type": select_meta(root, "og:type") or "",
        "published": select_meta(root, "article:published_time") or "",
        "modified": select_meta(root, "article:modified_time") or "",
        "author": select_meta(root, "article:author") or "",
        "image": select_meta(root, "og:image") or "",
        "site_name": select_meta(root, "og:site_name") or "",
    }

    # Strip site suffix from title (handles og:site_name + Chinese name)
    if meta["title"]:
        # Try og:site_name first
        for sep in (" – ", " | ", " - ", "｜"):
            for site in (meta.get("site_name", ""), "數位荒原", "No Man's Land", "No Man’s Land"):
                if not site:
                    continue
                suffix = f"{sep}{site}"
                if meta["title"].endswith(suffix):
                    meta["title"] = meta["title"][: -len(suffix)].strip()
                    break

    # NML-specific: parse <div class="mdatename"> blocks
    nml_meta = extract_nml_metadata_blocks(root)
    if nml_meta.get("作者") and not meta["author"]:
        meta["author"] = ", ".join(nml_meta["作者"])
    if nml_meta.get("編輯"):
        meta["editor"] = ", ".join(nml_meta["編輯"])
    if nml_meta.get("譯者"):
        meta["translator"] = ", ".join(nml_meta["譯者"])
    if nml_meta.get("出處"):
        meta["original_source"] = ", ".join(nml_meta["出處"])
    if nml_meta.get("類型"):
        meta["nml_category"] = ", ".join(nml_meta["類型"])
    if nml_meta.get("date_text"):
        meta["date_text"] = nml_meta["date_text"][0]
        if not meta["published"]:
            iso = parse_english_date_to_iso(nml_meta["date_text"][0])
            if iso:
                meta["published"] = iso

    # If still no author try rel=author / class=author
    if not meta["author"]:
        author_links = find_all(root, lambda n: n.tag.lower() == "a" and (
            "author" in get_attr(n, "rel") or "author" in get_attr(n, "class")))
        if author_links:
            meta["author"] = text_content(author_links[0])

    # Extract slug from URL
    path = urlparse(url).path.rstrip("/")
    meta["slug"] = unquote(path.split("/")[-1]) if path else ""

    # Extract path type prefix (nml-issue / nml-article / etc.)
    parts = [p for p in path.split("/") if p]
    meta["url_type"] = parts[0] if parts else ""

    return meta


def extract_internal_article_links(content: Node) -> List[str]:
    """Find all /nml-article/{slug}/ links inside content."""
    article_re = re.compile(r"/nml-article/[^/]+/?$")
    links: Set[str] = set()
    for a in find_all(content, lambda n: n.tag.lower() == "a"):
        href = get_attr(a, "href").strip()
        if not href:
            continue
        absolute = urljoin(SITE_ROOT, href)
        path = urlparse(absolute).path
        if article_re.search(path):
            # Normalize trailing slash
            if not path.endswith("/"):
                path += "/"
            links.add(f"{SITE_ROOT}{path}")
    return sorted(links)


def extract_categories(root: Node) -> List[str]:
    """Find article-cat / category taxonomy links."""
    cats: Set[str] = set()
    for a in find_all(root, lambda n: n.tag.lower() == "a"):
        href = get_attr(a, "href").strip()
        if "/article-cat/" in href or "/category/" in href:
            text = text_content(a)
            if text:
                cats.add(text)
    return sorted(cats)


# ============================================================================
# Page (REST) — for pages/about, pages/contributor (wp/v2/pages works)
# ============================================================================

def fetch_page_rest(slug: str) -> Optional[dict]:
    url = f"{REST_PAGES_BASE}?slug={slug}&per_page=1&_embed=1"
    data = http_get_json(url)
    time.sleep(RATE_LIMIT)
    if isinstance(data, list) and data:
        return data[0]
    return None


# ============================================================================
# Output formatting
# ============================================================================

def format_post_markdown(meta: Dict[str, str], body_md: str, *, internal_articles: List[str] = None,
                         categories: List[str] = None, all_links: Dict[str, List[str]] = None) -> str:
    lines = [f"# {meta.get('title', meta.get('slug', 'untitled'))}", ""]
    lines.extend([
        f"- Source: {meta.get('url', '')}",
        f"- Slug: {meta.get('slug', '')}",
        f"- Type: {meta.get('url_type', '')}",
    ])
    if meta.get("published"):
        lines.append(f"- Published: {meta['published']}")
    if meta.get("modified"):
        lines.append(f"- Modified: {meta['modified']}")
    if meta.get("author"):
        lines.append(f"- Author: {meta['author']}")
    if meta.get("editor"):
        lines.append(f"- Editor: {meta['editor']}")
    if meta.get("translator"):
        lines.append(f"- Translator: {meta['translator']}")
    if meta.get("original_source"):
        lines.append(f"- Original Source: {meta['original_source']}")
    if meta.get("nml_category"):
        lines.append(f"- NML Category: {meta['nml_category']}")
    if meta.get("date_text"):
        lines.append(f"- Date Text: {meta['date_text']}")
    if categories:
        lines.append(f"- Categories: {', '.join(categories)}")
    if meta.get("image"):
        lines.append(f"- Featured Image: {meta['image']}")

    if meta.get("description"):
        lines.extend(["", "## Excerpt", "", meta["description"]])

    if body_md:
        lines.extend(["", "## Content", "", body_md])

    if internal_articles:
        lines.extend(["", "## Linked Articles (internal)", ""])
        lines.extend(f"- {url}" for url in internal_articles)

    if all_links:
        if all_links.get("internal"):
            lines.extend(["", "## Internal Links", ""])
            lines.extend(f"- {u}" for u in all_links["internal"])
        if all_links.get("external"):
            lines.extend(["", "## External Links", ""])
            lines.extend(f"- {u}" for u in all_links["external"])

    return "\n".join(lines).strip() + "\n"


def collect_all_links(content: Node) -> Dict[str, List[str]]:
    """Collect all internal vs external links from content node."""
    internal: Set[str] = set()
    external: Set[str] = set()
    for a in find_all(content, lambda n: n.tag.lower() == "a"):
        href = get_attr(a, "href").strip()
        if not href or href.startswith("#"):
            continue
        absolute = urljoin(SITE_ROOT, href)
        netloc = urlparse(absolute).netloc
        if netloc.endswith("heath.tw"):
            internal.add(absolute)
        elif netloc:
            external.add(absolute)
    return {
        "internal": sorted(internal),
        "external": sorted(external),
    }


def write_text(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content.rstrip() + "\n", encoding="utf-8")


def write_json(path: Path, data) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def safe_slug(url: str) -> str:
    path = urlparse(url).path.rstrip("/")
    return unquote(path.split("/")[-1]) if path else "item"


# ============================================================================
# Crawl orchestration
# ============================================================================

def crawl_type(type_name: str, sitemap_path: str, *, dry_run: bool, limit: Optional[int],
               renderer: MarkdownRenderer) -> List[Dict]:
    """Crawl all URLs from a sitemap, save markdown + return metadata list."""
    urls = fetch_sitemap_urls(sitemap_path)
    print(f"  📄 [{type_name}] sitemap: {len(urls)} URLs")
    if limit:
        urls = urls[:limit]
        print(f"     (limited to {limit})")

    out_dir = OUT_DIR / TYPE_CONFIG[type_name]["dir"]
    out_dir.mkdir(parents=True, exist_ok=True)

    metadata_list: List[Dict] = []
    for i, url in enumerate(urls, start=1):
        slug = safe_slug(url)
        print(f"     [{i}/{len(urls)}] {slug}")
        if dry_run:
            metadata_list.append({"url": url, "slug": slug, "skipped": True})
            continue

        body = http_get(url)
        time.sleep(RATE_LIMIT)
        if not body:
            metadata_list.append({"url": url, "slug": slug, "error": "fetch_failed"})
            continue

        # Save raw HTML for provenance
        raw_html_path = RAW_DIR / f"html-{type_name}" / f"{slug}.html"
        raw_html_path.parent.mkdir(parents=True, exist_ok=True)
        raw_html_path.write_text(body, encoding="utf-8")

        root = parse_html(body)
        meta = extract_post_metadata(root, url)
        content_node = extract_main_content(root)

        body_md = ""
        internal_articles: List[str] = []
        categories: List[str] = []
        all_links: Dict[str, List[str]] = {}
        if content_node:
            # Render content as markdown
            body_md = renderer.render_children(content_node.children).strip()
            body_md = re.sub(r"\n{3,}", "\n\n", body_md)
            # Issue pages: extract article links
            if type_name == "issue":
                internal_articles = extract_internal_article_links(content_node)
            categories = extract_categories(content_node)
            all_links = collect_all_links(content_node)

        markdown = format_post_markdown(
            meta, body_md,
            internal_articles=internal_articles,
            categories=categories,
            all_links=all_links,
        )
        write_text(out_dir / f"{slug}.md", markdown)

        meta["internal_articles"] = internal_articles
        meta["categories"] = categories
        meta["body_length"] = len(body_md)
        metadata_list.append(meta)

    return metadata_list


def discover_articles_from_issues(issues_meta: List[Dict]) -> List[str]:
    """Collect unique article URLs from all issue metadata."""
    urls: Set[str] = set()
    for m in issues_meta:
        for u in m.get("internal_articles", []):
            urls.add(u)
    return sorted(urls)


def crawl_articles(article_urls: List[str], *, dry_run: bool, limit: Optional[int],
                   renderer: MarkdownRenderer) -> List[Dict]:
    """Crawl articles discovered from issues."""
    if limit:
        article_urls = article_urls[:limit]
    print(f"  📄 [article] from issues: {len(article_urls)} URLs")
    out_dir = OUT_DIR / "articles"
    out_dir.mkdir(parents=True, exist_ok=True)

    metadata_list: List[Dict] = []
    for i, url in enumerate(article_urls, start=1):
        slug = safe_slug(url)
        print(f"     [{i}/{len(article_urls)}] {slug}")
        if dry_run:
            metadata_list.append({"url": url, "slug": slug, "skipped": True})
            continue

        body = http_get(url)
        time.sleep(RATE_LIMIT)
        if not body:
            metadata_list.append({"url": url, "slug": slug, "error": "fetch_failed"})
            continue

        # Save raw HTML
        raw_html_path = RAW_DIR / "html-article" / f"{slug}.html"
        raw_html_path.parent.mkdir(parents=True, exist_ok=True)
        raw_html_path.write_text(body, encoding="utf-8")

        root = parse_html(body)
        meta = extract_post_metadata(root, url)
        meta["url_type"] = "nml-article"
        content_node = extract_main_content(root)

        body_md = ""
        categories: List[str] = []
        all_links: Dict[str, List[str]] = {}
        if content_node:
            body_md = renderer.render_children(content_node.children).strip()
            body_md = re.sub(r"\n{3,}", "\n\n", body_md)
            categories = extract_categories(content_node)
            all_links = collect_all_links(content_node)

        markdown = format_post_markdown(
            meta, body_md,
            internal_articles=None,
            categories=categories,
            all_links=all_links,
        )
        write_text(out_dir / f"{slug}.md", markdown)

        meta["categories"] = categories
        meta["body_length"] = len(body_md)
        metadata_list.append(meta)

    return metadata_list


def crawl_pages(*, dry_run: bool) -> List[Dict]:
    """Fetch important landing pages via REST (which works for pages/)."""
    out_dir = OUT_DIR / "pages"
    out_dir.mkdir(parents=True, exist_ok=True)

    renderer = MarkdownRenderer()
    metadata_list: List[Dict] = []
    for slug in PAGES_TO_FETCH:
        print(f"     [page] {slug}")
        if dry_run:
            metadata_list.append({"slug": slug, "skipped": True})
            continue
        page = fetch_page_rest(slug)
        if not page:
            metadata_list.append({"slug": slug, "error": "rest_not_found"})
            continue
        title = unescape(page.get("title", {}).get("rendered", "") or slug)
        body_html = page.get("content", {}).get("rendered", "")
        body_md = renderer.render(body_html)

        meta = {
            "slug": slug,
            "id": page.get("id"),
            "title": title,
            "url": page.get("link", ""),
            "modified": page.get("modified", ""),
        }

        markdown = format_post_markdown(
            {**meta, "url_type": "page", "published": "", "author": ""},
            body_md, internal_articles=None, categories=None, all_links=None,
        )
        write_text(out_dir / f"{slug}.md", markdown)
        # Also save raw JSON
        write_json(RAW_DIR / "pages" / f"{slug}.json", page)
        metadata_list.append(meta)
    return metadata_list


# ============================================================================
# Index + README generation
# ============================================================================

def build_type_index(type_name: str, metadata: List[Dict]) -> str:
    """Build INDEX.md for a content type directory."""
    lines = [f"# NML {type_name} 索引", ""]
    lines.append(f"Total: {len(metadata)}")
    lines.append("")
    for m in metadata:
        title = m.get("title") or m.get("slug") or "(untitled)"
        lines.append(f"- {title}")
        if m.get("url"):
            lines.append(f"  - URL: {m['url']}")
        if m.get("published"):
            lines.append(f"  - Published: {m['published']}")
        if m.get("author"):
            lines.append(f"  - Author: {m['author']}")
        if m.get("categories"):
            lines.append(f"  - Categories: {', '.join(m['categories'])}")
        lines.append(f"  - File: `{m.get('slug', 'unknown')}.md`")
    return "\n".join(lines).strip() + "\n"


def build_manifest(generated_at: str, results: Dict[str, List[Dict]]) -> dict:
    """Build manifest.json."""
    counts = {k: len(v) for k, v in results.items()}
    return {
        "generatedAt": generated_at,
        "source": SITE_ROOT,
        "siteName": "數位荒原 No Man's Land",
        "crawler": "fetch-nml-data.py",
        "method": "sitemap-driven HTML scrape (custom REST not exposed)",
        "counts": counts,
        "totalItems": sum(counts.values()),
        "license": "Cite-original via heath.tw About: 「使用者得按此原則自由分享本站收錄之文章，且註明作者姓名、轉載出處『數位荒原』與網頁的直接連結」",
    }


def build_readme(generated_at: str, results: Dict[str, List[Dict]]) -> str:
    counts = {k: len(v) for k, v in results.items()}
    lines = [
        "# 數位荒原 No Man's Land 資料集",
        "",
        f"- Generated: {generated_at}",
        "- Source: https://www.heath.tw",
        "- CMS: WordPress (custom post types: nml-issue / nml-article / nml-podcast / nml-announcement / nml-navigation)",
        "- Crawler: `scripts/tools/fetch-nml-data.py`",
        "- Method: sitemap-driven HTML scrape (custom REST endpoints return 404)",
        "",
        f"- Issues: {counts.get('issue', 0)} 期",
        f"- Articles: {counts.get('article', 0)} 篇（從 issue 鏈接萃取）",
        f"- Podcasts: {counts.get('podcast', 0)} 集",
        f"- Announcements: {counts.get('announcement', 0)} 篇",
        f"- Navigations: {counts.get('navigation', 0)} 篇",
        f"- Pages: {counts.get('page', 0)} 個",
        "",
        "## Structure",
        "",
        "- `issues/` — 56 期 ISSUE 主題介紹（含每期收錄的 article URL）",
        "- `articles/` — 從 issue 鏈接抓的個別文章主體",
        "- `podcasts/` — 31 集 PODCAST",
        "- `announcements/` — 74 篇 ANNOUNCEMENT",
        "- `navigations/` — 3 篇 NAVIGATOR",
        "- `pages/` — ABOUT / CONTRIBUTOR 等 landing pages",
        "- `raw/` — 原始 HTML + manifest + sitemap 備份",
        "",
        "## 授權",
        "",
        "「數位荒原」網站上文章之著作權由原發表人或媒體所有，原發表人（媒體）同意授權本站可自由重製及公開散佈該文章。使用者得按此原則自由分享本站收錄之文章，且**註明作者姓名、轉載出處「數位荒原」與網頁的直接連結**。",
        "",
        "Taiwan.md 引用本資料集時依此原則：每篇引用必須標註原作者 + 「數位荒原」 + 原 URL。",
        "",
        "## 爬取器",
        "",
        "可重跑：`python3 scripts/tools/fetch-nml-data.py`",
        f"上次爬取：{generated_at}",
        "下次建議：6 個月後（peer 內容更新頻率約 2-4 篇/月）",
        "",
    ]
    return "\n".join(lines).strip() + "\n"


# ============================================================================
# Main
# ============================================================================

def merge_meta(existing_path: Path, new_metas: List[Dict], key: str = "slug") -> List[Dict]:
    """Merge new_metas into existing meta JSON file by key (default: slug).

    Idempotency rule: a partial re-run with --limit should NOT shrink the meta
    file. Existing entries are preserved unless the new run produces a fresh
    entry for the same key (which then replaces the old one).
    """
    if existing_path.exists():
        try:
            existing = json.loads(existing_path.read_text(encoding="utf-8"))
            if not isinstance(existing, list):
                existing = []
        except (json.JSONDecodeError, OSError):
            existing = []
    else:
        existing = []

    new_keys = {m.get(key) for m in new_metas if m.get(key)}
    merged = [m for m in existing if m.get(key) not in new_keys]
    merged.extend(new_metas)
    return merged


def main() -> None:
    parser = argparse.ArgumentParser(description="Fetch No Man's Land peer content")
    parser.add_argument("--dry-run", action="store_true", help="Print URLs without fetching content")
    parser.add_argument("--types", default="issue,podcast,announcement,navigation,page,article",
                        help="Comma-separated types to crawl")
    parser.add_argument("--limit", type=int, default=None, help="Limit URLs per type (for testing)")
    args = parser.parse_args()
    is_partial = args.limit is not None or set(args.types.split(",")) != {
        "issue", "podcast", "announcement", "navigation", "page", "article"}

    requested_types = [t.strip() for t in args.types.split(",") if t.strip()]
    generated_at = datetime.now(timezone.utc).isoformat()
    renderer = MarkdownRenderer()

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    RAW_DIR.mkdir(parents=True, exist_ok=True)

    results: Dict[str, List[Dict]] = {}

    # Phase 1: crawl issue first (because article URLs are extracted from issues)
    if "issue" in requested_types:
        print(f"📦 [Phase 1] Crawling issues...")
        new_meta = crawl_type("issue", TYPE_CONFIG["issue"]["sitemap"],
                              dry_run=args.dry_run, limit=args.limit, renderer=renderer)
        meta_path = RAW_DIR / "issues-meta.json"
        results["issue"] = merge_meta(meta_path, new_meta) if is_partial else new_meta
        write_json(meta_path, results["issue"])
        write_text(OUT_DIR / "issues" / "INDEX.md", build_type_index("issue", results["issue"]))

    # Phase 2: crawl other types in parallel-conceptually (sequential here for politeness)
    for t in ("podcast", "announcement", "navigation"):
        if t in requested_types:
            print(f"📦 [Phase 2] Crawling {t}...")
            new_meta = crawl_type(t, TYPE_CONFIG[t]["sitemap"],
                                   dry_run=args.dry_run, limit=args.limit, renderer=renderer)
            meta_path = RAW_DIR / f"{t}s-meta.json"
            results[t] = merge_meta(meta_path, new_meta) if is_partial else new_meta
            write_json(meta_path, results[t])
            write_text(OUT_DIR / TYPE_CONFIG[t]["dir"] / "INDEX.md",
                       build_type_index(t, results[t]))

    # Phase 3: pages via REST
    if "page" in requested_types:
        print(f"📦 [Phase 3] Crawling pages...")
        new_meta = crawl_pages(dry_run=args.dry_run)
        meta_path = RAW_DIR / "pages-meta.json"
        results["page"] = merge_meta(meta_path, new_meta) if is_partial else new_meta
        write_json(meta_path, results["page"])
        write_text(OUT_DIR / "pages" / "INDEX.md", build_type_index("page", results["page"]))

    # Phase 4: articles discovered from issues
    if "article" in requested_types and "issue" in results:
        article_urls = discover_articles_from_issues(results["issue"])
        print(f"📦 [Phase 4] Crawling {len(article_urls)} articles from issues...")
        new_meta = crawl_articles(article_urls, dry_run=args.dry_run,
                                   limit=args.limit, renderer=renderer)
        meta_path = RAW_DIR / "articles-meta.json"
        results["article"] = merge_meta(meta_path, new_meta) if is_partial else new_meta
        write_json(meta_path, results["article"])
        write_text(OUT_DIR / "articles" / "INDEX.md", build_type_index("article", results["article"]))

    # Manifest + README
    manifest = build_manifest(generated_at, results)
    write_json(RAW_DIR / "manifest.json", manifest)
    write_text(OUT_DIR / "README.md", build_readme(generated_at, results))

    # Backup sitemap index
    sitemap_index_body = http_get(SITEMAP_INDEX)
    if sitemap_index_body:
        write_text(RAW_DIR / "sitemap-index.xml", sitemap_index_body)

    print(f"\n✅ Done. Output: {OUT_DIR}")
    for k, v in results.items():
        print(f"   {k}: {len(v)} items")


if __name__ == "__main__":
    main()
