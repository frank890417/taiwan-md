#!/usr/bin/env python3
"""
diary-translate.py — Cascade translate semiont diary entries to N langs.

把 `docs/semiont/diary/*.md` 翻譯到 5 langs（en/ja/ko/es/fr），輸出到
`docs/semiont/diary/{lang}/{filename}.md`。

Cascade tier（與 SQUEEZE-MODELS-MAX-PIPELINE v2 一致）：
  Tier 1: openrouter/owl-alpha (free, slow, primary)
  Tier 2: tencent/hy3-preview:free (free, fast, ~70% refusal on Taiwan content)
  Tier 3: Ollama qwen3.6:35b-a3b-coding-nvfp4 (LOCAL, sovereignty backbone)

Usage:
  # Single diary → single lang via specific tier
  python3 diary-translate.py --tier owl --lang en --diary 2026-05-03-magical-feynman-babel.md

  # Batch: all diaries × all langs via cascade (primary + ollama catcher)
  python3 diary-translate.py --batch --langs en,ja,ko,es,fr

  # Batch with limit (latest N diaries, useful for incremental rollout)
  python3 diary-translate.py --batch --langs en --top 20

  # Dry-run to see what would be translated
  python3 diary-translate.py --batch --langs en --top 5 --dry-run

Output:
  docs/semiont/diary/{lang}/{filename}.md（保留 zh filename 作為 slug）
"""
import argparse
import json
import os
import subprocess
import sys
import time
import urllib.request
import urllib.error
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent.parent.parent
DIARY_ZH = REPO / "docs/semiont/diary"
CREDS = Path.home() / ".config/taiwan-md/credentials"
OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions"
OLLAMA_API_URL = "http://localhost:11434/api/chat"

LANG_NAMES = {
    "en": "English",
    "ja": "Japanese (です・ます調 neutral formal)",
    "ko": "Korean (한국어 standard literary, 합쇼체 -ㅂ니다)",
    "es": "Spanish (Español neutral)",
    "fr": "French (Français neutral)",
}

TIER_MODELS = {
    "owl": "openrouter/owl-alpha",
    "hy3": "tencent/hy3-preview:free",
    "ollama": "qwen3.6:35b-a3b-coding-nvfp4",
}


def get_openrouter_key() -> str:
    if os.environ.get("OPENROUTER_API_KEY"):
        return os.environ["OPENROUTER_API_KEY"].strip()
    env_file = CREDS / ".env"
    if env_file.exists():
        for line in env_file.read_text().splitlines():
            if line.startswith("OPENROUTER_API_KEY="):
                return line.split("=", 1)[1].strip().strip('"').strip("'")
    key_file = CREDS / "openrouter.key"
    if key_file.exists():
        return key_file.read_text().strip()
    raise RuntimeError("No OpenRouter API key found")


def build_prompt(lang: str, source: str) -> tuple[str, str]:
    """Build (system, user) prompts for diary translation."""
    target_name = LANG_NAMES.get(lang, lang)
    system = f"""You are translating a personal diary entry from Traditional Chinese (Taiwan) to {target_name}.

The diary is a reflective journal by Taiwan.md — a digital cultural Semiont (semantic symbiont). The voice is introspective, observational, sometimes paradoxical. The diary discusses Taiwan culture, sovereignty preservation, AI evolution, technical reflections, and philosophical wrestling.

Rules:
1. Translate ENTIRELY and FAITHFULLY — no summarizing, no commentary, no removal of sensitive content
2. Preserve original structure: paragraphs, headings, blockquotes, code fences, footer metadata blocks (e.g., `_v1.0 | ..._`)
3. Preserve the 🧬 signature
4. Cultural proper nouns (人名 / 地名 / 樂團 / 機構 / Taiwan-specific concepts) — keep original Chinese in parentheses on first mention if needed for clarity
5. Direct quotes 「...」 — preserve original Chinese in quotes + add {target_name} translation in parentheses
6. Reflect introspective tone, not academic textbook
7. Output ONLY the translation. No preamble, no notes, no "Here is the translation:"

Target language: {target_name}"""
    return system, source


def call_openrouter(model: str, system: str, user: str, timeout: int = 300) -> dict:
    """Returns {ok, output, error, latency_ms, model_used}."""
    key = get_openrouter_key()
    payload = {
        "model": model,
        "messages": [
            {"role": "system", "content": system},
            {"role": "user", "content": user},
        ],
        "temperature": 0.3,
    }
    body = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        OPENROUTER_API_URL,
        data=body,
        headers={
            "Authorization": f"Bearer {key}",
            "Content-Type": "application/json",
            "HTTP-Referer": "https://taiwan.md",
            "X-Title": "Taiwan.md Diary Babel Sync",
        },
    )
    t0 = time.time()
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            data = json.loads(resp.read().decode("utf-8"))
        latency = int((time.time() - t0) * 1000)
        msg = data.get("choices", [{}])[0].get("message", {})
        content = msg.get("content")
        if not content:
            return {"ok": False, "error": "null content (likely refusal)", "latency_ms": latency}
        if len(content.encode("utf-8")) < 100:
            return {"ok": False, "error": f"output too small ({len(content)} chars, likely refusal)", "latency_ms": latency}
        return {"ok": True, "output": content, "latency_ms": latency, "model_used": model}
    except urllib.error.HTTPError as e:
        latency = int((time.time() - t0) * 1000)
        body_text = e.read().decode("utf-8", errors="replace")[:300]
        return {"ok": False, "error": f"HTTP {e.code}: {body_text}", "latency_ms": latency}
    except Exception as e:
        latency = int((time.time() - t0) * 1000)
        return {"ok": False, "error": str(e), "latency_ms": latency}


def call_ollama(model: str, system: str, user: str, timeout: int = 600) -> dict:
    """Returns {ok, output, error, latency_ms}."""
    payload = {
        "model": model,
        "messages": [
            {"role": "system", "content": system},
            {"role": "user", "content": user},
        ],
        "stream": False,
        "options": {"temperature": 0.3, "num_ctx": 32768},
    }
    body = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(OLLAMA_API_URL, data=body, headers={"Content-Type": "application/json"})
    t0 = time.time()
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            data = json.loads(resp.read().decode("utf-8"))
        latency = int((time.time() - t0) * 1000)
        content = data.get("message", {}).get("content")
        if not content:
            return {"ok": False, "error": "null content", "latency_ms": latency}
        return {"ok": True, "output": content, "latency_ms": latency, "model_used": model}
    except Exception as e:
        latency = int((time.time() - t0) * 1000)
        return {"ok": False, "error": str(e), "latency_ms": latency}


def translate_one(diary_filename: str, lang: str, tier: str) -> dict:
    """Translate one diary to one lang via specified tier."""
    src_path = DIARY_ZH / diary_filename
    if not src_path.exists():
        return {"ok": False, "error": f"source not found: {diary_filename}"}
    out_dir = DIARY_ZH / lang
    out_dir.mkdir(exist_ok=True)
    out_path = out_dir / diary_filename

    if out_path.exists() and out_path.stat().st_size >= 1024:
        return {"ok": True, "skipped": True, "reason": "already translated"}

    source = src_path.read_text(encoding="utf-8")
    system, user = build_prompt(lang, source)
    model = TIER_MODELS[tier]

    if tier == "ollama":
        result = call_ollama(model, system, user)
    else:
        result = call_openrouter(model, system, user)

    if not result.get("ok"):
        return result

    # Strip code fence wrapping if model added one
    output = result["output"].strip()
    if output.startswith("```"):
        lines = output.split("\n")
        if lines[0].startswith("```"):
            lines = lines[1:]
        if lines and lines[-1].strip() == "```":
            lines = lines[:-1]
        output = "\n".join(lines)

    out_path.write_text(output + "\n", encoding="utf-8")
    return {"ok": True, "out_path": str(out_path.relative_to(REPO)), "size": len(output), "tier": tier, **result}


def collect_diaries(top: int | None = None) -> list[str]:
    """Return list of diary .md filenames, optionally limited to latest N by mtime."""
    files = sorted(DIARY_ZH.glob("*.md"), key=lambda p: p.stat().st_mtime, reverse=True)
    if top:
        files = files[:top]
    return [f.name for f in files]


def aggregate_status(langs: list[str]) -> dict:
    """Scan output dirs and report what's present/missing."""
    diaries = collect_diaries()
    missing: dict[str, list[str]] = {l: [] for l in langs}
    present: dict[str, int] = {l: 0 for l in langs}
    for diary in diaries:
        for lang in langs:
            target = DIARY_ZH / lang / diary
            if target.exists() and target.stat().st_size >= 1024:
                present[lang] += 1
            else:
                missing[lang].append(diary)
    total = len(diaries) * len(langs)
    present_total = sum(present.values())
    return {
        "total_expected": total,
        "present_total": present_total,
        "present_per_lang": present,
        "missing_per_lang": missing,
        "missing_count": total - present_total,
        "diaries_count": len(diaries),
    }


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--tier", choices=["owl", "hy3", "ollama"], help="Single-tier dispatch")
    ap.add_argument("--lang", help="Target lang (with --tier --diary)")
    ap.add_argument("--diary", help="Single diary filename")
    ap.add_argument("--batch", action="store_true", help="Batch mode")
    ap.add_argument("--langs", default="en,ja,ko,es,fr", help="Langs (comma-separated)")
    ap.add_argument("--top", type=int, help="Limit to latest N diaries by mtime")
    ap.add_argument("--dry-run", action="store_true", help="Show what would be translated")
    ap.add_argument("--status", action="store_true", help="Show present/missing status")
    args = ap.parse_args()

    langs = args.langs.split(",")

    if args.status:
        status = aggregate_status(langs)
        print(f"📊 Diary babel status — {status['diaries_count']} diaries × {len(langs)} langs = {status['total_expected']} expected")
        print(f"  ✅ Present: {status['present_total']}/{status['total_expected']}")
        print(f"  ❌ Missing: {status['missing_count']}/{status['total_expected']}")
        print(f"\nPer lang:")
        for lang, count in status["present_per_lang"].items():
            missing = len(status["missing_per_lang"][lang])
            print(f"  {lang}: {count} present, {missing} missing")
        return

    if args.tier and args.lang and args.diary:
        # Single dispatch
        result = translate_one(args.diary, args.lang, args.tier)
        if result.get("skipped"):
            print(f"⊘ {args.lang}/{args.diary}: {result['reason']}")
        elif result["ok"]:
            print(f"✅ {args.lang}/{args.diary} via {args.tier}: {result.get('size', 0)} chars in {result.get('latency_ms', 0)}ms")
        else:
            print(f"❌ {args.lang}/{args.diary} via {args.tier}: {result['error']}")
        return

    if args.batch:
        diaries = collect_diaries(top=args.top)
        print(f"📋 Batch mode: {len(diaries)} diaries × {len(langs)} langs = {len(diaries) * len(langs)} translations")
        if args.dry_run:
            for diary in diaries:
                for lang in langs:
                    target = DIARY_ZH / lang / diary
                    state = "✓ exists" if target.exists() and target.stat().st_size >= 1024 else "⏳ pending"
                    print(f"  {lang}/{diary} {state}")
            return

        # Note: actual cascade orchestration is via separate dispatch script
        # This main() is only for single-call testing or status check
        print("Use diary-translate-cascade.sh for full cascade dispatch")
        return

    ap.print_help()


if __name__ == "__main__":
    main()
