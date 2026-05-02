#!/usr/bin/env python3
"""
ollama-translate.py — local Ollama fallback for owl-alpha refusals.

Translates a single article using local Ollama (qwen3.6:35b-a3b-coding-nvfp4).
Same input/output contract as openrouter-translate.py but uses local model
that doesn't refuse politically-sensitive Taiwan content.

Usage:
  python3 ollama-translate.py --group .lang-sync-tasks/ja/_group-A.json
  python3 ollama-translate.py --group ... --model qwen3.6:35b-a3b-coding-nvfp4
"""
import argparse, json, os, sys, urllib.request, urllib.error, hashlib
from pathlib import Path
from datetime import datetime, timezone, timedelta

REPO = Path(__file__).resolve().parent.parent.parent.parent
OLLAMA_URL = "http://localhost:11434/api/chat"

LANG_NAMES = {
    "en": "English",
    "ja": "Japanese (です・ます調 neutral formal)",
    "ko": "Korean (한국어 standard literary, 합쇼체 -ㅂ니다)",
    "es": "Spanish (Español neutral)",
    "fr": "French (Français neutral)",
}


def call_ollama(model, system, user, max_tokens=8192):
    payload = json.dumps({
        "model": model,
        "messages": [
            {"role": "system", "content": system},
            {"role": "user", "content": user},
        ],
        "stream": False,
        "options": {"num_predict": max_tokens, "temperature": 0.3},
        "think": False,
    }).encode()
    req = urllib.request.Request(OLLAMA_URL, data=payload, headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=600) as resp:
        d = json.loads(resp.read())
        return d.get("message", {}).get("content", "")


def get_lang_from_path(en_path):
    """Extract lang from path like 'en/People/foo.md' or 'ja/...'"""
    return en_path.split("/")[0]


def translate_article(item, model, lang):
    zh_path = item["zh_path"]
    src_file = REPO / "knowledge" / zh_path
    if not src_file.exists():
        return False, f"source not found: {zh_path}"

    src_text = src_file.read_text()
    src_size = len(src_text.encode())

    # Compute content hash from source
    chash = "sha256:" + hashlib.sha256(src_text.encode()).hexdigest()[:16]

    # en_path may or may not include "knowledge/" prefix — handle both
    en_path = item["en_path"]
    if en_path.startswith("knowledge/"):
        en_path = en_path[len("knowledge/"):]
    out_path = REPO / "knowledge" / en_path
    out_path.parent.mkdir(parents=True, exist_ok=True)

    lang_name = LANG_NAMES.get(lang, lang)

    system = f"""You are a Taiwan.md translator. Translate Chinese (zh-TW) articles to {lang_name}.

Output rules:
1. Output ONLY the translated markdown — no preamble, no explanation, no thinking
2. Translate ALL content faithfully (do not summarize)
3. Preserve markdown structure (headers, lists, blockquotes, tables, code blocks)
4. Preserve all `[^N]` footnotes and the reference list at bottom
5. Preserve `[[wikilinks]]` exactly as-is
6. Numbers, dates, URLs, code blocks unchanged
7. Output the FULL frontmatter (---) at top with translated title/description in {lang_name}

Frontmatter format (CRITICAL — strict YAML):
```yaml
---
title: "..."
description: "..."
date: 2026-XX-XX
tags: ['tag1', 'tag2']
subcategory: '原中文 subcategory'
author: 'Taiwan.md'
category: '...'
readingTime: 12
lastVerified: 2026-XX-XX
lastHumanReview: false
translatedFrom: '{zh_path}'
sourceCommitSha: '{item.get("zh_head_sha","")}'
sourceContentHash: '{chash}'
translatedAt: '{datetime.now(timezone(timedelta(hours=8))).isoformat(timespec="seconds")}'
---
```

YAML rules: title with apostrophes → DOUBLE quotes; tags array with single-quoted strings."""

    user = f"Translate this Taiwan.md article to {lang_name}.\n\n```\n{src_text}\n```"

    print(f"[{zh_path}] → {item['en_path']} ({src_size} bytes)", flush=True)
    try:
        result = call_ollama(model, system, user, max_tokens=max(8192, src_size * 2))
    except Exception as e:
        return False, f"ollama error: {e}"

    if not result or len(result.encode()) < src_size * 0.3:
        return False, f"output too small ({len(result.encode())} bytes vs source {src_size})"

    # Strip code fence if model wrapped output
    if result.startswith("```markdown\n"):
        result = result[len("```markdown\n"):]
    if result.startswith("```\n"):
        result = result[len("```\n"):]
    if result.endswith("\n```"):
        result = result[:-4]

    out_path.write_text(result)
    return True, f"saved {len(result.encode())} bytes"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--group", required=True, help="group .json file")
    ap.add_argument("--model", default="qwen3.6:35b-a3b-coding-nvfp4")
    args = ap.parse_args()

    group = json.loads(Path(args.group).read_text())
    lang = group["articles"][0]["en_path"].split("/")[0] if group["articles"] else "en"

    print(f"📋 Translating {len(group['articles'])} article(s) to {lang} via Ollama {args.model}", flush=True)

    ok = 0
    failed = []
    for i, item in enumerate(group["articles"]):
        print(f"[{i+1}/{len(group['articles'])}] {item['zh_path']}...", flush=True)
        success, msg = translate_article(item, args.model, lang)
        if success:
            ok += 1
            print(f"  ✓ {msg}", flush=True)
        else:
            failed.append((item["zh_path"], msg))
            print(f"  ✗ {msg}", flush=True)

    print(f"\n=== {ok}/{len(group['articles'])} success ===", flush=True)
    if failed:
        print("Failed:")
        for p, m in failed:
            print(f"  {p}: {m}")


if __name__ == "__main__":
    main()
