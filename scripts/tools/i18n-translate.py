#!/usr/bin/env python3
"""
i18n-translate.py — 批次翻譯 src/i18n/ UI strings 到 target lang

從每個 module file 抽出 en block，整批 prompt owl-alpha 翻譯成 target lang，
splice 進原檔案（在現有 en/ja/ko 之後加新 lang block）。

Usage:
  python3 scripts/tools/i18n-translate.py --module home --target fr
  python3 scripts/tools/i18n-translate.py --module semiont --target ja
  python3 scripts/tools/i18n-translate.py --all --target fr  # 所有 12 modules
"""
import argparse, json, os, re, subprocess, sys, urllib.request, urllib.error
from datetime import datetime, timezone, timedelta
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent.parent
I18N_DIR = REPO / "src/i18n"
CREDS = Path.home() / ".config/taiwan-md/credentials"
KEY_FILE = CREDS / "openrouter.key"
ENV_FILE = CREDS / ".env"

LANG_NAMES = {
    "en": "English",
    "ja": "Japanese (です・ます調 neutral formal)",
    "ko": "Korean (한국어 standard literary)",
    "es": "Spanish (Español neutral)",
    "fr": "French (Français neutral)",
    "zh-TW": "Traditional Chinese (繁體中文 台灣)",
}

MODULES = ["home", "about", "contribute", "changelog", "dashboard", "data",
           "resources", "map", "assets", "notfound", "taiwanShape", "semiont"]


def get_api_key():
    if os.environ.get("OPENROUTER_API_KEY"):
        return os.environ["OPENROUTER_API_KEY"].strip()
    if ENV_FILE.exists():
        for line in ENV_FILE.read_text().splitlines():
            if line.startswith("OPENROUTER_API_KEY="):
                return line.split("=", 1)[1].strip().strip('"').strip("'")
    if KEY_FILE.exists():
        return KEY_FILE.read_text().strip()
    sys.exit("❌ No OpenRouter API key")


def extract_lang_block(content: str, lang: str) -> tuple[int, int, str]:
    """Find lang: { ... } block; return (start_line, end_line, body)."""
    lines = content.split("\n")
    # Match `  en: {` or `  'zh-TW': {`
    pattern = re.compile(rf"^  '?{re.escape(lang)}'?: \{{")
    start_idx = None
    for i, line in enumerate(lines):
        if pattern.match(line):
            start_idx = i
            break
    if start_idx is None:
        return -1, -1, ""
    # Find matching close brace at same indent
    depth = 1
    for j in range(start_idx + 1, len(lines)):
        line = lines[j].rstrip()
        # Count braces at indent boundaries (simple heuristic)
        if line == "  }," or line == "  }":
            depth -= 1
            if depth == 0:
                # Body is between start_idx+1 and j-1
                body = "\n".join(lines[start_idx+1:j])
                return start_idx, j, body
    return start_idx, -1, ""


def parse_kv_pairs(body: str) -> list[tuple[str, str]]:
    """Parse 'key': 'value' pairs from a lang block body. Multi-line + comment tolerant."""
    pairs = []
    lines = body.split("\n")
    cur_key = None
    cur_val_lines = []
    key_re = re.compile(r"^    '([^']+)':\s*(.*?)\s*$")
    for line in lines:
        stripped = line.strip()
        # Skip comment-only lines and blank lines
        if not stripped or stripped.startswith("//") or stripped.startswith("/*") or stripped.startswith("*"):
            continue
        m = key_re.match(line)
        if m:
            if cur_key:
                raw = "\n".join(cur_val_lines).strip().rstrip(",").strip()
                pairs.append((cur_key, _unquote_ts_string(raw)))
            cur_key = m.group(1)
            cur_val_lines = [m.group(2)] if m.group(2) else []
        elif cur_key:
            cur_val_lines.append(stripped)
    if cur_key:
        raw = "\n".join(cur_val_lines).strip().rstrip(",").strip()
        pairs.append((cur_key, _unquote_ts_string(raw)))
    return pairs


def _unquote_ts_string(raw: str) -> str:
    """Unquote a TS string literal, handling concatenated multi-line ones."""
    raw = raw.strip()
    if not raw:
        return ""
    # Concatenated strings split by newlines: '"part1"\n"part2"' or "'part1' + 'part2'"
    # Most common: just one quoted string, possibly with escaped quotes inside
    # Try to extract the content between matching outer quotes
    if (raw.startswith("'") and raw.endswith("'")) or (raw.startswith('"') and raw.endswith('"')):
        q = raw[0]
        inner = raw[1:-1]
        # Unescape \' or \" or \\
        inner = inner.replace(f"\\{q}", q).replace("\\\\", "\\").replace("\\n", "\n")
        return inner
    # Fallback: best-effort - strip outermost quotes
    return raw.strip("'\"")


def call_owl(api_key, system, user, max_retries=3, max_tokens=32000):
    payload = json.dumps({
        "model": "openrouter/owl-alpha",
        "messages": [{"role": "system", "content": system}, {"role": "user", "content": user}],
        "temperature": 0.2,
        "max_tokens": max_tokens,
    }).encode()
    req = urllib.request.Request(
        "https://openrouter.ai/api/v1/chat/completions",
        data=payload,
        headers={"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"},
    )
    import time
    for attempt in range(max_retries):
        try:
            with urllib.request.urlopen(req, timeout=300) as resp:
                d = json.loads(resp.read())
                content = d.get("choices", [{}])[0].get("message", {}).get("content")
                if content is None:
                    raise RuntimeError("null content")
                return content
        except urllib.error.HTTPError as e:
            if e.code == 429:
                time.sleep(2 ** attempt * 10); continue
            raise RuntimeError(f"HTTP {e.code}")
        except (urllib.error.URLError, TimeoutError):
            if attempt < max_retries-1: time.sleep(5); continue
            raise


def translate_module(module: str, target_lang: str, api_key: str, dry_run: bool = False):
    """Translate one module's en block to target_lang and splice in."""
    f = I18N_DIR / f"{module}.ts"
    if not f.exists():
        print(f"  ❌ {module}.ts not found"); return False
    content = f.read_text()

    # Already has target_lang?
    if extract_lang_block(content, target_lang)[0] != -1:
        print(f"  ⏭  {module}/{target_lang}: already exists, skip"); return True

    # Get en block
    en_start, en_end, en_body = extract_lang_block(content, "en")
    if en_start == -1:
        print(f"  ❌ {module}: no en block"); return False

    pairs = parse_kv_pairs(en_body)
    if not pairs:
        print(f"  ❌ {module}: no kv pairs parsed"); return False
    print(f"  → {module}/{target_lang}: {len(pairs)} keys to translate")

    # Build prompt — values are already unquoted by parser
    en_json = {k: v for k, v in pairs}
    system = f"""You are a UI string translator for Taiwan.md.

Translate this JSON of English UI strings to {LANG_NAMES.get(target_lang, target_lang)}.

CRITICAL rules:
1. Output ONLY a JSON object, no markdown wrapper, no explanation
2. Keep all keys EXACTLY as input (don't translate keys)
3. Translate values to {LANG_NAMES.get(target_lang, target_lang)} preserving meaning + tone
4. Keep proper nouns (Taiwan, Mazu, Audrey Tang, etc.) appropriately rendered
5. Keep emoji + numbers + URL references unchanged
6. Strings with HTML / markdown markup: preserve markup, only translate text
7. Keep punctuation appropriate to target language (e.g., Spanish ¿? ¡!, French « », etc.)
8. Keep length similar — UI space is constrained
"""
    user = f"Source language: English\nTarget language: {LANG_NAMES.get(target_lang, target_lang)}\n\nJSON to translate:\n```json\n{json.dumps(en_json, ensure_ascii=False, indent=2)}\n```\n\nOutput ONLY the translated JSON object."

    if dry_run:
        print(f"    DRY RUN: would translate {len(pairs)} keys")
        return True

    # Chunk if too many keys (avoids JSON truncation on large modules like map.ts)
    CHUNK_THRESHOLD = 100
    chunks = []
    if len(en_json) > CHUNK_THRESHOLD:
        items = list(en_json.items())
        chunk_size = 75
        for i in range(0, len(items), chunk_size):
            chunks.append(dict(items[i:i+chunk_size]))
        print(f"    chunked into {len(chunks)} batches of ~{chunk_size}", flush=True)
    else:
        chunks = [en_json]

    translated = {}
    chunk_failures = 0
    for ci, chunk in enumerate(chunks):
        chunk_user = f"Source language: English\nTarget language: {LANG_NAMES.get(target_lang, target_lang)}\n\nJSON to translate:\n```json\n{json.dumps(chunk, ensure_ascii=False, indent=2)}\n```\n\nOutput ONLY the translated JSON object."
        # Up to 2 attempts per chunk (model output can be flaky)
        chunk_translated = None
        last_err = None
        for attempt in range(2):
            try:
                result = call_owl(api_key, system, chunk_user)
            except Exception as e:
                last_err = f"API error {e}"; continue

            result = result.strip()
            if result.startswith("```"):
                result = re.sub(r"^```(?:json)?\n", "", result)
                result = re.sub(r"\n```$", "", result)

            try:
                chunk_translated = json.loads(result)
                break
            except json.JSONDecodeError as e:
                last_err = f"JSON parse fail — {e}"
                continue

        if chunk_translated is None:
            print(f"  ⚠️  {module}/{target_lang} chunk {ci+1}/{len(chunks)}: SKIPPED ({last_err})", flush=True)
            chunk_failures += 1
            continue
        translated.update(chunk_translated)
        if len(chunks) > 1:
            print(f"    chunk {ci+1}/{len(chunks)} ✓ ({len(chunk_translated)} keys)", flush=True)

    if not translated:
        print(f"  ❌ {module}/{target_lang}: all chunks failed"); return False
    if len(translated) != len(en_json):
        print(f"  ⚠️  {module}/{target_lang}: key count {len(translated)}/{len(en_json)} ({chunk_failures} chunks skipped)")

    # Build target lang block (TypeScript format) — always JSON-escape via json.dumps
    # which yields valid double-quoted strings safe for TS.
    out_lines = [f"  '{target_lang}': {{"]
    for k, v in translated.items():
        v_str = str(v)
        # json.dumps gives a valid JS/TS string literal (double-quoted, properly escaped)
        quoted = json.dumps(v_str, ensure_ascii=False)
        out_lines.append(f"    '{k}': {quoted},")
    out_lines.append("  },")
    new_block = "\n".join(out_lines)

    # Splice: insert new block right before the closing `} as const;` or `};`
    content_lines = content.split("\n")
    insert_at = None
    for i in range(len(content_lines)-1, -1, -1):
        s = content_lines[i].strip()
        if s == "} as const;" or s == "};":
            insert_at = i
            break
    if insert_at is None:
        print(f"  ❌ {module}: no closing }} as const; or }};"); return False

    # Insert new block
    content_lines.insert(insert_at, new_block)
    f.write_text("\n".join(content_lines))
    print(f"  ✅ {module}/{target_lang}: spliced {len(translated)} keys")
    return True


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--module", help="single module name (or --all)")
    ap.add_argument("--all", action="store_true", help="all 12 modules")
    ap.add_argument("--target", required=True, help="target lang code")
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()

    api_key = get_api_key()
    targets = MODULES if args.all else [args.module]
    if not args.all and not args.module:
        ap.error("--module or --all required")

    print(f"📋 Translating {len(targets)} module(s) to {args.target}")
    ok = 0
    for m in targets:
        if translate_module(m, args.target, api_key, args.dry_run):
            ok += 1
    print(f"\n=== {ok}/{len(targets)} success ===")


if __name__ == "__main__":
    main()
