#!/usr/bin/env python3
"""
codex-translate.py — Translate via OpenAI Codex CLI (subscription-backed gpt-5.5)

Wrapper that reuses openrouter-translate.py's prompt builder + manifest reader,
but pipes the prompt to `codex exec` instead of OpenRouter API.

Use when OpenRouter free tier is rate-limited (per REFLEXES #45) and Sonnet sub-agent
is disabled (per哲宇 explicit constraint 2026-05-12).

Usage:
    python3 codex-translate.py --group .lang-sync-tasks/ja/_group-A.json
    python3 codex-translate.py --group .lang-sync-tasks/ja/_group-A.json --lang ja --max-articles 12

Requires: codex CLI authenticated via ~/.codex/auth.json (gpt-5.5 access via subscription)

2026-05-12 admiring-montalcini-post-finale session — observer Tier 1 OpenRouter全
rate-limited + Hy3 轉 paid + Sonnet 禁用 → 走哲宇 OpenAI Codex 訂閱繞 OpenRouter。
"""
import argparse, json, os, subprocess, sys, time
from pathlib import Path

# Reuse from openrouter-translate.py
sys.path.insert(0, str(Path(__file__).parent))
from importlib import import_module
_or = import_module("openrouter-translate")
build_translation_prompt = _or.build_translation_prompt
extract_zh_frontmatter_fields = _or.extract_zh_frontmatter_fields

REPO = Path(__file__).resolve().parent.parent.parent.parent
KNOWLEDGE = REPO / "knowledge"


def call_codex(system: str, user_msg: str, timeout: int = 600) -> str:
    """Invoke codex exec with combined system + user prompt, return raw output."""
    # Combine into a single prompt (codex exec doesn't have separate system/user roles)
    full_prompt = (
        "System instructions (follow strictly):\n"
        "================================================================\n"
        f"{system}\n\n"
        "================================================================\n"
        "User request:\n"
        f"{user_msg}"
    )

    try:
        result = subprocess.run(
            ["codex", "exec", "--skip-git-repo-check"],
            input=full_prompt,
            capture_output=True,
            text=True,
            timeout=timeout,
            env={**os.environ, "TERM": "dumb"},
        )
    except subprocess.TimeoutExpired:
        raise RuntimeError(f"codex exec timed out after {timeout}s")

    if result.returncode != 0:
        raise RuntimeError(f"codex exec exit {result.returncode}: {result.stderr[:500]}")

    return _extract_codex_output(result.stdout)


def _extract_codex_output(stdout: str) -> str:
    """Strip codex's preamble (workdir/model/session id) and trailing token report.

    Codex exec output looks like:
        OpenAI Codex v0.125.0 (research preview)
        --------
        workdir: /Users/...
        model: gpt-5.5
        ...
        --------
        user
        <user prompt echo>
        codex
        <ACTUAL OUTPUT>
        tokens used
        XXX
    """
    lines = stdout.splitlines()
    # Find "codex" line (the assistant's response start marker)
    start = -1
    for i, line in enumerate(lines):
        if line.strip() == "codex":
            start = i + 1
            break
    if start < 0:
        # Fallback: return everything (might be unwrapped output)
        return stdout.strip()

    # Find "tokens used" line (end marker)
    end = len(lines)
    for i in range(start, len(lines)):
        if lines[i].strip() == "tokens used" or lines[i].startswith("tokens used"):
            end = i
            break
        # Also stop at the rollout-record error line that sometimes appears
        if "failed to record rollout items" in lines[i]:
            end = i
            break

    return "\n".join(lines[start:end]).strip()


def translate_one(article: dict, lang: str, dry_run: bool = False) -> tuple[bool, str | None]:
    """Translate one article via codex exec."""
    zh_path = article["zh_path"]
    out_path = REPO / article["en_path"]

    zh_full = KNOWLEDGE / zh_path
    if not zh_full.exists():
        return False, f"zh source not found: {zh_path}"

    zh_content = zh_full.read_text()
    system, user_msg = build_translation_prompt(article, zh_content, lang)

    if dry_run:
        print(f"DRY RUN: would translate {zh_path} → {out_path}")
        return True, None

    try:
        result = call_codex(system, user_msg)
    except Exception as e:
        return False, f"codex error: {e}"

    if not result or not isinstance(result, str):
        return False, f"empty output from codex"

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
        try:
            out_path.unlink()
        except Exception:
            pass
        return False, f"output too small ({size} bytes) — file removed"

    return True, None


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--group", required=True, help="group manifest JSON (created by prepare-batch.py)")
    ap.add_argument("--lang", help="override lang (default from manifest dir name)")
    ap.add_argument("--max-articles", type=int, help="only translate top N articles")
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()

    group_path = Path(args.group).resolve()
    group = json.loads(group_path.read_text())

    # Derive lang from path: .lang-sync-tasks/{lang}/_group-X.json
    lang = args.lang or group_path.parent.name
    articles = group.get("articles", group) if isinstance(group, dict) else group
    if args.max_articles:
        articles = articles[: args.max_articles]

    print(f"📋 Translating {len(articles)} article(s) to {lang} via codex exec (gpt-5.5)")

    ok_count = 0
    fail_count = 0
    start = time.time()
    for idx, article in enumerate(articles, 1):
        zh_path = article["zh_path"]
        t0 = time.time()
        print(f"[{idx}/{len(articles)}] {zh_path}...", end=" ", flush=True)
        success, err = translate_one(article, lang, dry_run=args.dry_run)
        dt = int(time.time() - t0)
        if success:
            ok_count += 1
            out = article["en_path"]
            print(f"→ ok ({dt}s)" if not args.dry_run else "DRY")
        else:
            fail_count += 1
            print(f"❌ {err} ({dt}s)")

    elapsed = int(time.time() - start)
    print(f"\n✅ done: {ok_count}/{len(articles)} ok, {fail_count} fail in {elapsed}s ({elapsed // 60}m{elapsed % 60}s)")
    sys.exit(0 if fail_count == 0 else 1)


if __name__ == "__main__":
    main()
