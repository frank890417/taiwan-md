#!/usr/bin/env python3
"""
openrouter-translate.py — Single-article translator using OpenRouter free models

Replaces Claude Sonnet sub-agent for translation work. Free tier = no token budget.
Each invocation translates ONE article based on a manifest entry.

Usage:
    # Translate one article from manifest by zh_path
    python3 openrouter-translate.py --manifest .lang-sync-tasks/ja/_batch-manifest.json --zh-path "Lifestyle/合作社.md"

    # Translate all articles in a group file
    python3 openrouter-translate.py --group .lang-sync-tasks/ja/_group-A.json

    # Override model (default: tencent/hy3-preview:free)
    python3 openrouter-translate.py --group ... --model "deepseek/deepseek-chat:free"

Requires: ~/.config/taiwan-md/credentials/openrouter.key
"""
import argparse, json, os, re, sys, time, urllib.request, urllib.error
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent.parent.parent
KNOWLEDGE = REPO / "knowledge"
CREDS_DIR = Path.home() / ".config/taiwan-md/credentials"
KEY_FILE = CREDS_DIR / "openrouter.key"
ENV_FILE = CREDS_DIR / ".env"
DEFAULT_MODEL = "tencent/hy3-preview:free"
API_URL = "https://openrouter.ai/api/v1/chat/completions"

LANG_NAMES = {
    "en": "English",
    "ja": "Japanese (日本語, です・ます調 neutral formal)",
    "ko": "Korean (한국어 standard literary)",
    "es": "Spanish (Español neutral)",
    "fr": "French (Français neutral)",
}


def get_api_key():
    """Resolution order: env var → .env file → standalone key file."""
    # 1. Environment variable (CI / shell export)
    if os.environ.get("OPENROUTER_API_KEY"):
        return os.environ["OPENROUTER_API_KEY"].strip()
    # 2. Unified .env file
    if ENV_FILE.exists():
        for line in ENV_FILE.read_text().splitlines():
            line = line.strip()
            if line.startswith("OPENROUTER_API_KEY="):
                return line.split("=", 1)[1].strip().strip('"').strip("'")
    # 3. Standalone key file (legacy)
    if KEY_FILE.exists():
        return KEY_FILE.read_text().strip()
    print(f"❌ No API key found. Set OPENROUTER_API_KEY env, or write to {ENV_FILE} or {KEY_FILE}", file=sys.stderr)
    sys.exit(1)


def extract_zh_frontmatter_fields(zh_content):
    """Extract title/description/category/tags/date/author/etc. from zh frontmatter.

    Returns dict of field → raw YAML value (preserved as-is for translation context).
    Used to enrich the translation prompt so target frontmatter has all needed
    fields (title/desc translated; category/date/author preserved).
    """
    if not zh_content.startswith("---"):
        return {}
    end = zh_content.find("\n---\n", 4)
    if end == -1:
        end = zh_content.find("\n---", 4)
        if end == -1:
            return {}
    fm_block = zh_content[3:end].strip()
    fields = {}
    current_key = None
    multi_line_value = []
    for line in fm_block.split("\n"):
        if not line.strip():
            continue
        # Top-level key: "key:" or "key: value"
        m = re.match(r"^([a-zA-Z_][a-zA-Z0-9_]*):\s*(.*)$", line)
        if m:
            if current_key and multi_line_value:
                fields[current_key] = "\n".join(multi_line_value).strip()
                multi_line_value = []
            current_key = m.group(1)
            value = m.group(2).strip()
            if value:
                fields[current_key] = value
            else:
                multi_line_value = []
        elif current_key:
            multi_line_value.append(line)
    if current_key and multi_line_value:
        fields[current_key] = "\n".join(multi_line_value).strip()
    return fields


def build_translation_prompt(article, zh_content, lang):
    """Build system + user prompt for translation.

    2026-05-01 γ-late3: Enriched with zh frontmatter extraction so the model
    produces COMPLETE frontmatter (not just sync placeholder fields). Without
    this, strict-following models like owl-alpha output minimal 4-field
    frontmatter; permissive models like Hy3 infer but inconsistently. Now
    explicit instructions tell the model to translate title/description, keep
    category/tags/date/author, then append placeholder sync fields verbatim.
    """
    zh_fields = extract_zh_frontmatter_fields(zh_content)
    placeholder = article.get("frontmatter_placeholder", {}) or {}
    # Build a "target frontmatter scaffold" — what the model should emit
    target_fm_lines = []
    # Translate-from-zh fields
    for key in ["title", "description"]:
        if key in zh_fields:
            target_fm_lines.append(f"{key}: <translate from zh: {zh_fields[key]!r}>")
    # Preserve-as-is fields
    for key in ["date", "author", "category", "subcategory", "tags",
                "readingTime", "lastVerified", "lastHumanReview", "featured"]:
        if key in zh_fields:
            target_fm_lines.append(f"{key}: <preserve from zh: {zh_fields[key]!r}>")
    # Sync placeholder fields (verbatim)
    for key, value in placeholder.items():
        target_fm_lines.append(f"{key}: <verbatim from placeholder: {value!r}>")
    target_scaffold = "\n".join(target_fm_lines) if target_fm_lines else "(no zh frontmatter detected — use placeholder only)"

    system = f"""You are a translator for Taiwan.md, an open-source curated knowledge base about Taiwan.

Translate zh-TW articles to {LANG_NAMES.get(lang, lang)} following these rules:

1. **精準/專業/快速**: factual fidelity, academic register, no machine-translation tells
2. **不預設篇幅**: length follows zh content (no summarization, no over-expansion)
3. **Preserve verbatim**: core tension, anchors (people/dates/places/numbers), `> blockquote` quotes, footnote source URLs unchanged
4. **Reframe cultural common-knowledge** for {lang} readers (e.g., "夜市 = night market" inline)

CRITICAL frontmatter rules — emit ALL fields from the target scaffold:
- `title`: translate the zh title to {LANG_NAMES.get(lang, lang)}
- `description`: translate the zh description to {LANG_NAMES.get(lang, lang)}
- `tags`: translate each tag value to {LANG_NAMES.get(lang, lang)} (keep YAML list shape)
- `category`, `subcategory`, `date`, `author`, `readingTime`, `lastVerified`, `lastHumanReview`, `featured`: keep zh value VERBATIM (do not translate or alter)
- Sync placeholder fields (translatedFrom / sourceCommitSha / sourceContentHash / translatedAt): VERBATIM from placeholder
- ALL YAML string values quoted; descriptions with apostrophes use DOUBLE QUOTES
- Frontmatter ends with `\\n---\\n` newline before closing `---`

CRITICAL body rules:
- Wikilinks `[[X]]`: use manifest's `wikilink_targets[X]` mapping (markdown link if `/lang/...`, plain text + Chinese parenthesis if `(zh only)`)
- Footnotes `[^N]`: keep numbering, translate desc, KEEP source URL unchanged

CRITICAL output rules:
- Output ONLY the translated markdown file content (frontmatter + body)
- DO NOT add ```markdown wrapper or any meta-commentary
- DO NOT include any text before the opening `---` or after the body"""

    user_msg = f"""Translate this zh-TW article to {LANG_NAMES.get(lang, lang)}.

**Target frontmatter scaffold (produce these fields in your output, with values translated/preserved per system prompt rules)**:
```
{target_scaffold}
```

**Manifest entry (wikilink targets + slug + sync placeholder)**:
```json
{json.dumps(article, ensure_ascii=False, indent=2)}
```

**zh source content**:
```markdown
{zh_content}
```

Output ONLY the translated file content (frontmatter + body), nothing else."""

    return system, user_msg


def call_openrouter(api_key, model, system, user_msg, max_retries=3):
    """Call OpenRouter API with retry."""
    payload = json.dumps({
        "model": model,
        "messages": [
            {"role": "system", "content": system},
            {"role": "user", "content": user_msg},
        ],
        "temperature": 0.3,
        "max_tokens": 16000,
    }).encode("utf-8")

    req = urllib.request.Request(
        API_URL,
        data=payload,
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
            "HTTP-Referer": "https://taiwan.md",
            "X-Title": "Taiwan.md lang-sync",
        },
        method="POST",
    )

    for attempt in range(max_retries):
        try:
            with urllib.request.urlopen(req, timeout=300) as resp:
                data = json.loads(resp.read())
                if "choices" not in data or not data["choices"]:
                    raise RuntimeError(f"No choices in response: {data}")
                return data["choices"][0]["message"]["content"]
        except urllib.error.HTTPError as e:
            body = e.read().decode("utf-8", errors="replace")[:500]
            if e.code == 429:
                wait = 2 ** attempt * 10
                print(f"  ⚠️ Rate limit (attempt {attempt+1}), waiting {wait}s...", file=sys.stderr)
                time.sleep(wait)
                continue
            raise RuntimeError(f"HTTP {e.code}: {body}")
        except (urllib.error.URLError, TimeoutError) as e:
            if attempt < max_retries - 1:
                print(f"  ⚠️ Network error (attempt {attempt+1}): {e}, retrying...", file=sys.stderr)
                time.sleep(5)
                continue
            raise

    raise RuntimeError(f"Failed after {max_retries} retries")


def translate_one(article, lang, api_key, model, dry_run=False):
    """Translate one article. Returns (success, error_msg)."""
    zh_path = article["zh_path"]
    out_path = REPO / article["en_path"]  # field name "en_path" but actually target lang path

    zh_full = KNOWLEDGE / zh_path
    if not zh_full.exists():
        return False, f"zh source not found: {zh_path}"

    zh_content = zh_full.read_text()

    system, user_msg = build_translation_prompt(article, zh_content, lang)

    if dry_run:
        print(f"DRY RUN: would translate {zh_path} → {out_path}")
        return True, None

    try:
        result = call_openrouter(api_key, model, system, user_msg)
    except Exception as e:
        return False, f"API error: {e}"

    # 2026-05-01 γ-late3: PRC content moderation may return null content
    # (more aggressive than the 40-byte 「你好，我无法给到相关内容」 string
    # refusal). Guard before strip() to avoid AttributeError crash.
    if result is None:
        return False, "API returned null content (likely content-policy refusal)"
    if not isinstance(result, str):
        return False, f"API returned non-string content: type={type(result).__name__}"

    # Strip markdown code fence wrapper if present
    result = result.strip()
    if result.startswith("```markdown"):
        result = result[len("```markdown"):].lstrip("\n")
    elif result.startswith("```"):
        result = result[3:].lstrip("\n")
    if result.endswith("```"):
        result = result[:-3].rstrip("\n")

    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(result + "\n")

    size = out_path.stat().st_size
    if size < 1000:
        # 2026-05-01 γ-late3: cleanup stub on validation fail.
        # Previously the 40-byte refusal "你好，我无法给到相关内容" persisted
        # on disk, causing subsequent verify-batch / pre-commit hook failures
        # ("missing translatedFrom" because the stub has no frontmatter).
        try:
            out_path.unlink()
        except Exception:
            pass
        return False, f"output too small ({size} bytes) — file removed"

    return True, None


def run_orthogonal(zh_path, langs, model, api_key, dry_run, task_root):
    """
    Orthogonal mode (2026-05-01 γ-late3): one article × N langs per process.

    Reads each lang's manifest (.lang-sync-tasks/{lang}/_batch-manifest.json),
    finds the article entry, then translates the SAME zh source to all N langs
    sequentially within one process. Different from per-lang batch which does
    N articles × 1 lang per process.

    Returns (success_count, results_per_lang).

    Trade-off vs per-lang batch:
      Pro: zh source loaded once; cross-lang consistency easier to verify;
           atomic per-article output (all langs done together); refusal in
           one lang doesn't block others within the same article.
      Con: each lang call switches model context (potential cache miss on
           system prompt); single article wall-clock = N × per-lang latency.
    """
    results = {}
    for lang in langs:
        manifest_path = task_root / lang / "_batch-manifest.json"
        if not manifest_path.exists():
            results[lang] = (False, f"no manifest at {manifest_path}")
            continue
        manifest = json.load(open(manifest_path))
        article = next(
            (a for a in manifest["articles"] if a["zh_path"] == zh_path), None
        )
        if not article:
            results[lang] = (False, f"{zh_path} not in {lang} manifest")
            continue
        ok, err = translate_one(article, lang, api_key, model, dry_run)
        results[lang] = (ok, err)
    success = sum(1 for ok, _ in results.values() if ok)
    return success, results


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--manifest", help="Batch manifest JSON path")
    ap.add_argument("--zh-path", help="Single zh path to translate (use with --manifest or --orthogonal)")
    ap.add_argument("--group", help="Group manifest JSON (translates all)")
    ap.add_argument("--model", default=DEFAULT_MODEL)
    ap.add_argument("--lang", default=None, help="Override lang from manifest")
    ap.add_argument("--dry-run", action="store_true")
    # 2026-05-01 γ-late3: orthogonal mode
    ap.add_argument("--orthogonal", action="store_true",
                    help="Translate one article to MULTIPLE langs (use with --zh-path --langs)")
    ap.add_argument("--langs", default=None,
                    help="Comma-separated lang codes for --orthogonal mode, e.g. ja,ko,es,fr")
    ap.add_argument("--task-root", default=str(REPO / ".lang-sync-tasks"),
                    help="Root dir of per-lang manifests (default .lang-sync-tasks/)")
    args = ap.parse_args()

    api_key = get_api_key()

    # Orthogonal mode short-circuit
    if args.orthogonal:
        if not args.zh_path or not args.langs:
            ap.error("--orthogonal requires --zh-path AND --langs")
        langs = [l.strip() for l in args.langs.split(",") if l.strip()]
        print(f"📋 Orthogonal: {args.zh_path} → {len(langs)} langs ({','.join(langs)}) via {args.model}")
        if args.dry_run:
            print("DRY RUN mode")
        t_start = time.time()
        success, results = run_orthogonal(
            args.zh_path, langs, args.model, api_key, args.dry_run, Path(args.task_root)
        )
        wall = time.time() - t_start
        print(f"\n=== {success}/{len(langs)} langs success in {wall:.1f}s ===")
        for lang, (ok, err) in results.items():
            mark = "✅" if ok else "❌"
            extra = "" if ok else f" — {err}"
            print(f"  {mark} {lang}{extra}")
        if success < len(langs):
            sys.exit(1)
        return

    # Load articles
    if args.group:
        data = json.load(open(args.group))
        articles = data["articles"]
        # Lang from parent manifest
        manifest_path = Path(args.group).parent / "_batch-manifest.json"
        if manifest_path.exists():
            lang = json.load(open(manifest_path))["lang"]
        else:
            lang = args.lang or "en"
    elif args.manifest:
        manifest = json.load(open(args.manifest))
        lang = manifest["lang"]
        if args.zh_path:
            articles = [a for a in manifest["articles"] if a["zh_path"] == args.zh_path]
            if not articles:
                print(f"❌ {args.zh_path} not in manifest", file=sys.stderr)
                sys.exit(1)
        else:
            articles = manifest["articles"]
    else:
        ap.error("--manifest or --group or --orthogonal required")

    if args.lang:
        lang = args.lang

    print(f"📋 Translating {len(articles)} article(s) to {lang} via {args.model}")
    if args.dry_run:
        print("DRY RUN mode")

    success = 0
    failed = []
    for i, article in enumerate(articles, 1):
        zh = article["zh_path"]
        print(f"[{i}/{len(articles)}] {zh}...", end=" ", flush=True)
        ok, err = translate_one(article, lang, api_key, args.model, args.dry_run)
        if ok:
            success += 1
            print("✅")
        else:
            failed.append((zh, err))
            print(f"❌ {err}")

    print(f"\n=== {success}/{len(articles)} success ===")
    if failed:
        print("Failed:")
        for zh, err in failed:
            print(f"  {zh}: {err}")
        sys.exit(1)


if __name__ == "__main__":
    main()
