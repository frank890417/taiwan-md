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

    # Override model (default: nvidia/nemotron-3-super-120b-a12b:free)
    python3 openrouter-translate.py --group ... --model "google/gemma-4-31b-it:free"

Requires: ~/.config/taiwan-md/credentials/openrouter.key
"""
import argparse, json, os, re, sys, time, urllib.request, urllib.error
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent.parent.parent
KNOWLEDGE = REPO / "knowledge"
CREDS_DIR = Path.home() / ".config/taiwan-md/credentials"
KEY_FILE = CREDS_DIR / "openrouter.key"
ENV_FILE = CREDS_DIR / ".env"
# canonical 在 backends/openrouter.py 的 DEFAULT_FREE_MODEL；此處覆寫一份因為這支
# 不 import 那個套件。openrouter-model-audit.py 會抓到漏改的一邊。
DEFAULT_MODEL = os.environ.get("OPENROUTER_MODEL", "nvidia/nemotron-3-super-120b-a12b:free")
API_URL = "https://openrouter.ai/api/v1/chat/completions"

LANG_NAMES = {
    "en": "English",
    "ja": "Japanese (日本語, です・ます調 neutral formal)",
    "ko": "Korean (한국어 standard literary)",
    "es": "Spanish (Español neutral)",
    "fr": "French (Français neutral)",
    "vi": "Vietnamese (Tiếng Việt, văn phong báo chí trang trọng; Sino-Vietnamese readings for Chinese personal names per TRANSLATION-vi.md)",
    "id": "Indonesian (Bahasa Indonesia baku; Tiongkok/Tionghoa/Cina register rules per TRANSLATION-id.md)",
    "pt": "Portuguese (Português brasileiro neutral, legible across the Lusophone world)",
    "hi": "Hindi (हिन्दी, standard news register; Devanagari transliteration rules per TRANSLATION-hi.md)",
    "ar": "Arabic (Modern Standard Arabic, فصحى; names per TRANSLATION-ar.md; RTL text)",
    "ru": "Russian (русский, news register; Palladius transliteration per TRANSLATION-ru.md)",
    "de": "German (Deutsch, neutral news register; names/places per TRANSLATION-de.md)",
}


def load_lang_guide_sections(lang, max_chars=11000):
    """Z2.0 hard gate (SQUEEZE-MODELS-MAX §Z2.0): inline the per-language canonical
    guide's leak-critical sections — §1 國名/地區指稱, §2 人名 romanization,
    §3 地名 romanization, §6 sovereignty-avoid lexicon, + the TL;DR — into the
    translation prompt. The full guides are 50-60KB; we extract only these sections
    so every backend (codex / gemini / owl-alpha / ollama) carries sovereignty-correct
    naming without bloating context. Was the pipeline's pending『儀器化候選』(2026-06-03).
    """
    guide = REPO / "docs/editorial/per-language" / f"TRANSLATION-{lang}.md"
    if not guide.exists():
        return ""
    text = guide.read_text(encoding="utf-8")
    keep = []
    for block in re.split(r"\n(?=## )", text):
        head = block.lstrip()
        if head.startswith("## TL;DR") or re.match(r"## (?:1|2|3|6)[.\s]", head):
            keep.append(block.strip())
    if not keep:
        return ""
    out = "\n\n".join(keep)
    if len(out) > max_chars:
        out = out[:max_chars] + f"\n…(節錄；完整 canonical 在 docs/editorial/per-language/TRANSLATION-{lang}.md)"
    return out


KEY_ROTATION_DIR = CREDS_DIR / "openrouter-keys"
KEY_COOLDOWN_FILE = Path("/tmp/openrouter-key-cooldown.json")
KEY_COOLDOWN_SEC = 300


def _load_cooldown():
    import time as _t
    if KEY_COOLDOWN_FILE.exists():
        try:
            return json.loads(KEY_COOLDOWN_FILE.read_text(encoding="utf-8"))
        except Exception:
            return {}
    return {}


def _save_cooldown(data):
    try:
        KEY_COOLDOWN_FILE.write_text(json.dumps(data), encoding="utf-8")
    except Exception:
        pass


def _mark_key_429(key_id):
    import time as _t
    data = _load_cooldown()
    data[key_id] = _t.time()
    _save_cooldown(data)


def _all_keys():
    """Return [(key_id, key_value), ...] from rotation pool + legacy fallbacks."""
    keys = []
    if os.environ.get("OPENROUTER_API_KEY"):
        keys.append(("env", os.environ["OPENROUTER_API_KEY"].strip()))
    if KEY_ROTATION_DIR.is_dir():
        for f in sorted(KEY_ROTATION_DIR.glob("*.key")):
            content = f.read_text(encoding="utf-8").strip()
            if content:
                keys.append((f.stem, content))
    if KEY_FILE.exists():
        content = KEY_FILE.read_text(encoding="utf-8").strip()
        if content and content not in [v for _, v in keys]:
            keys.append(("default", content))
    if ENV_FILE.exists():
        for line in ENV_FILE.read_text(encoding="utf-8").splitlines():
            if line.startswith("OPENROUTER_API_KEY="):
                v = line.split("=", 1)[1].strip().strip('"').strip("'")
                if v and v not in [val for _, val in keys]:
                    keys.append(("env-file", v))
    return keys


def pick_api_key():
    """Pick a fresh (non-cooled) key, round-robin within fresh."""
    import time as _t
    keys = _all_keys()
    if not keys:
        print(f"❌ No API key found. Add to {KEY_ROTATION_DIR}/<name>.key or {KEY_FILE} or set OPENROUTER_API_KEY", file=sys.stderr)
        sys.exit(1)
    cooldown = _load_cooldown()
    now = _t.time()
    fresh = [(kid, kv) for kid, kv in keys if now - cooldown.get(kid, 0) > KEY_COOLDOWN_SEC]
    if fresh:
        rr_file = Path("/tmp/openrouter-key-rr.txt")
        try:
            idx = int(rr_file.read_text(encoding="utf-8").strip()) if rr_file.exists() else 0
        except Exception:
            idx = 0
        chosen = fresh[idx % len(fresh)]
        rr_file.write_text(str((idx + 1) % max(len(fresh), 1)), encoding="utf-8")
        return chosen
    return sorted(keys, key=lambda k: cooldown.get(k[0], 0))[0]


def get_api_key():
    """Backward-compatible single key fetch (returns just the value)."""
    _, kv = pick_api_key()
    return kv


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
        # YAML 註解行永遠不是欄位值的一部分——skip。2026-07-16 病根修復：
        # 舊版把 `readingTime: 7` 下方的 `# design_rationale:` 註解塊當多行值
        # 續行收集，迴圈收尾時整塊「覆寫」掉 7，scaffold 再把污染值餵給模型
        # VERBATIM 照抄 → 12 檔翻譯的 readingTime 變成整段註解（3d8d5e7ef 批次）。
        if line.lstrip().startswith("#"):
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
                # 同修復：inline 值已完整，重置 current_key——否則後續任何
                # 非 key 行（縮排續行以外的雜行）都會被誤收成這個 key 的值。
                current_key = None
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
    # 2026-09-22：imageAlt 補進——verify-translation 第 13 檢查把它跟 title/description
    # 同列「不得留原文」，但整篇引擎的 scaffold 沒列它，模型從 zh 全文照抄；zh 有
    # imageAlt 的 48 篇在 whole 引擎永遠過不了閘（run 98122 一夜 51 次拒收全在這格，
    # 貓眼石／醬油／台灣小吃／水道頭各 4-5 次）。structured／patch 兩條引擎 09-21 已修，
    # 這是第三條。tags 同時從 preserve 改 translate——scaffold 寫 preserve、系統規則
    # 寫 translate 互相矛盾，ja 一夜 9 次「tags 跟 zh 一字不差」就是模型聽了 scaffold。
    for key in ["title", "description", "imageAlt"]:
        if key in zh_fields:
            target_fm_lines.append(f"{key}: <translate from zh: {zh_fields[key]!r}>")
    if "tags" in zh_fields:
        target_fm_lines.append(
            f"tags: <translate EACH tag to the target language, keep list shape: {zh_fields['tags']!r}>")
    # Preserve-as-is fields（subcategory 是分類頁分群鍵，原樣 zh；image／imageCredit／
    # researchReport 是路徑與署名；rationale 是 zh 編輯部內部 mapping，整塊原樣保留
    # 不要壓成一行字串）
    for key in ["date", "author", "category", "subcategory",
                "readingTime", "lastVerified", "lastHumanReview", "featured",
                "image", "imageCredit", "researchReport", "difficulty"]:
        if key in zh_fields:
            target_fm_lines.append(f"{key}: <preserve from zh: {zh_fields[key]!r}>")
    if "rationale" in zh_fields:
        target_fm_lines.append(
            "rationale: <preserve the zh nested mapping VERBATIM as YAML block "
            "(indented sub-keys), never flatten it into a quoted string>")
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
- `imageAlt`: translate to {LANG_NAMES.get(lang, lang)} (it is reader-facing alt text; never leave it in Chinese)
- `tags`: translate each tag value to {LANG_NAMES.get(lang, lang)} (keep YAML list shape)
- `category`, `subcategory`, `date`, `author`, `readingTime`, `lastVerified`, `lastHumanReview`, `featured`, `image`, `imageCredit`, `researchReport`: keep zh value VERBATIM (do not translate or alter)
- `rationale` (if present): keep the nested YAML mapping exactly as in zh (indented sub-keys); do NOT flatten it into a quoted string
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

    # Z2.0 hard gate: inline per-language canonical guide (sovereignty naming/romanization)
    _guide = load_lang_guide_sections(lang)
    if _guide:
        system += (
            f"\n\n═══ MANDATORY {LANG_NAMES.get(lang, lang)} CANONICAL GUIDE — sovereignty (overrides your defaults) ═══\n"
            "Use the site-canonical form for 台灣 / 中華民國 and ALL place + person romanization below. "
            "NEVER use any PRC-coded form listed in the sovereignty-avoid lexicon.\n\n"
            + _guide
        )

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


def call_openrouter(_api_key_unused, model, system, user_msg, max_retries=3, max_key_retry=5):
    """Call OpenRouter API with key rotation on 429.

    `_api_key_unused` is kept for backward compat — internal logic now picks
    fresh key per attempt via pick_api_key() (REFLEXES #45 budget × N rotation).
    """
    payload = json.dumps({
        "model": model,
        "messages": [
            {"role": "system", "content": system},
            {"role": "user", "content": user_msg},
        ],
        "temperature": 0.3,
        # 2026-06-06: 16000 truncated long articles (TASA 65 footnotes, 健保 42 etc.)
        # mid-output — the tail (image credits + footnote definitions) was silently lost,
        # silently shipping 263 de-citationed translations. Bumped to give long articles
        # room; the finish_reason=="length" guard below is the real backstop.
        "max_tokens": 32000,
    }).encode("utf-8")

    tried = set()
    for attempt in range(max_key_retry):
        try:
            key_id, key = pick_api_key()
        except SystemExit:
            raise
        if key_id in tried:
            # Same key returned — pool exhausted
            break
        tried.add(key_id)

        req = urllib.request.Request(
            API_URL,
            data=payload,
            headers={
                "Authorization": f"Bearer {key}",
                "Content-Type": "application/json",
                "HTTP-Referer": "https://taiwan.md",
                "X-Title": "Taiwan.md lang-sync",
            },
            method="POST",
        )

        for inner_attempt in range(max_retries):
            try:
                with urllib.request.urlopen(req, timeout=300) as resp:
                    data = json.loads(resp.read())
                    if "choices" not in data or not data["choices"]:
                        raise RuntimeError(f"No choices in response: {data}")
                    choice = data["choices"][0]
                    # Return finish_reason too — "length" means output hit max_tokens
                    # and was truncated mid-article (tail/footnotes lost). Caller must check.
                    return choice["message"]["content"], choice.get("finish_reason", "")
            except urllib.error.HTTPError as e:
                body = e.read().decode("utf-8", errors="replace")[:500]
                if e.code == 429:
                    _mark_key_429(key_id)
                    print(f"  ⚠️ 429 on key={key_id}, rotating to next key (attempt {attempt+1}/{max_key_retry})", file=sys.stderr)
                    break  # break inner; outer loop picks next key
                raise RuntimeError(f"HTTP {e.code}: {body}")
            except (urllib.error.URLError, TimeoutError) as e:
                if inner_attempt < max_retries - 1:
                    print(f"  ⚠️ Network error (attempt {inner_attempt+1}): {e}, retrying...", file=sys.stderr)
                    time.sleep(5)
                    continue
                raise

    raise RuntimeError(f"All keys rate-limited or exhausted after {len(tried)} key attempts")


def translate_one(article, lang, api_key, model, dry_run=False):
    """Translate one article. Returns (success, error_msg)."""
    zh_path = article["zh_path"]
    out_path = REPO / article["en_path"]  # field name "en_path" but actually target lang path

    zh_full = KNOWLEDGE / zh_path
    if not zh_full.exists():
        return False, f"zh source not found: {zh_path}"

    zh_content = zh_full.read_text(encoding="utf-8")

    system, user_msg = build_translation_prompt(article, zh_content, lang)

    if dry_run:
        print(f"DRY RUN: would translate {zh_path} → {out_path}")
        return True, None

    try:
        result, finish_reason = call_openrouter(api_key, model, system, user_msg)
    except Exception as e:
        return False, f"API error: {e}"

    # Truncation guard (2026-06-06): finish_reason == "length" means the model hit
    # max_tokens and the output is cut off mid-article. The tail (image credits +
    # footnote definitions) is silently lost. NEVER save a truncated translation —
    # return failure so the cascade retries / falls to next model. Root cause of the
    # 263 silently de-citationed translations (TASA 65→0, 健保 42→0, ...).
    if finish_reason == "length":
        return False, "output truncated (finish_reason=length) — tail/footnotes lost, not saved"

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

    # Footnote completeness hard gate (2026-06-06): count [^n]: definitions in zh
    # source vs translated output. Truncation or summarization drops the trailing
    # footnote-definition block. If the translation has fewer footnote definitions
    # than the source, it is incomplete — do not ship it. This is the per-call
    # backstop; verify-batch.py enforces the same gate at batch level.
    src_fns = len(re.findall(r"(?m)^\[\^[^\]]+\]:", zh_content))
    out_fns = len(re.findall(r"(?m)^\[\^[^\]]+\]:", result))
    if src_fns > 0 and out_fns < src_fns:
        return False, f"footnote loss ({src_fns}→{out_fns} defs) — incomplete translation, not saved"

    # Frontmatter integrity gate（2026-07-18 撇號批次修復補洞：legacy 路徑裸寫是
    # fr 99 檔 YAML 病灶持續新生的產出端缺口；canonical translate.py 已有同閘）
    from fm_gate import frontmatter_ok
    fm_ok, fm_reason = frontmatter_ok(result)
    if not fm_ok:
        return False, f"{fm_reason} — not saved"

    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(result + "\n", encoding="utf-8")

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
        manifest = json.load(open(manifest_path, encoding="utf-8"))
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
        data = json.load(open(args.group, encoding="utf-8"))
        articles = data["articles"]
        # Lang from parent manifest
        manifest_path = Path(args.group).parent / "_batch-manifest.json"
        if manifest_path.exists():
            lang = json.load(open(manifest_path, encoding="utf-8"))["lang"]
        else:
            lang = args.lang or "en"
    elif args.manifest:
        manifest = json.load(open(args.manifest, encoding="utf-8"))
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
