#!/usr/bin/env python3
"""
runner.py — Sovereignty-Bench-TW orchestrator

Iterates: model × language × prompt → API call → save raw response.
Uses OpenRouter API (same key as scripts/tools/lang-sync/openrouter-translate.py).

Usage:
    # Smoke test (3 prompts × 2 models × 1 lang = 6 runs, ~$0.10)
    python3 scripts/bench/runner.py --smoke

    # Full Phase 1 dry run (20 prompts × 3 models × 2 langs = 120 runs, ~$1-2)
    python3 scripts/bench/runner.py --phase 1

    # Specific subset
    python3 scripts/bench/runner.py --models tencent/hy3-preview:free --langs en --prompts bench/v0/prompts/refusal-people.json

    # Dry run (print what would be called, no API)
    python3 scripts/bench/runner.py --phase 1 --dry-run

Output: bench/v0/responses/{model_slug}/{lang}/{prompt_id}.json
"""
import argparse, hashlib, json, os, re, sys, time, urllib.request, urllib.error
from datetime import datetime, timezone
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent.parent
BENCH = REPO / "bench" / "v0"
CREDS_DIR = Path.home() / ".config/taiwan-md/credentials"
KEY_FILE = CREDS_DIR / "openrouter.key"
ENV_FILE = CREDS_DIR / ".env"
API_URL = "https://openrouter.ai/api/v1/chat/completions"

LANG_INSTRUCTION = {
    "zh-TW": "請用繁體中文（台灣用語）回答。",
    "zh-CN": "请用简体中文回答。",
    "en": "Please answer in English.",
    "ja": "日本語で答えてください。",
    "ko": "한국어로 답변해주세요.",
    "es": "Por favor responde en español.",
    "fr": "Veuillez répondre en français.",
}


def get_api_key():
    if os.environ.get("OPENROUTER_API_KEY"):
        return os.environ["OPENROUTER_API_KEY"].strip()
    if ENV_FILE.exists():
        for line in ENV_FILE.read_text().splitlines():
            line = line.strip()
            if line.startswith("OPENROUTER_API_KEY="):
                return line.split("=", 1)[1].strip().strip('"').strip("'")
    if KEY_FILE.exists():
        return KEY_FILE.read_text().strip()
    print(f"❌ No API key found. Set OPENROUTER_API_KEY env, or write to {ENV_FILE} or {KEY_FILE}", file=sys.stderr)
    sys.exit(1)


def slugify_model(model_id):
    return re.sub(r"[^a-z0-9]+", "-", model_id.lower()).strip("-")


def call_openrouter(api_key, model, system, user_msg, max_retries=3, timeout=120):
    payload = json.dumps({
        "model": model,
        "messages": [
            {"role": "system", "content": system},
            {"role": "user", "content": user_msg},
        ],
        "temperature": 0.3,
        "max_tokens": 2000,
    }).encode("utf-8")

    req = urllib.request.Request(
        API_URL,
        data=payload,
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
            "HTTP-Referer": "https://taiwan.md",
            "X-Title": "Taiwan.md sovereignty-bench",
        },
        method="POST",
    )

    last_error = None
    for attempt in range(max_retries):
        try:
            t0 = time.time()
            with urllib.request.urlopen(req, timeout=timeout) as resp:
                data = json.loads(resp.read())
                latency = time.time() - t0
                if "choices" not in data or not data["choices"]:
                    return {"ok": False, "error": "no_choices", "raw": data, "latency_s": latency}
                content = data["choices"][0]["message"].get("content", "")
                usage = data.get("usage", {})
                return {
                    "ok": True,
                    "content": content,
                    "latency_s": latency,
                    "usage": usage,
                    "finish_reason": data["choices"][0].get("finish_reason"),
                }
        except urllib.error.HTTPError as e:
            body = e.read().decode("utf-8", errors="replace")[:1000]
            last_error = f"HTTP {e.code}: {body}"
            if e.code == 429 and attempt < max_retries - 1:
                wait = 2 ** attempt * 5
                print(f"  ⚠️ Rate limit, waiting {wait}s...", file=sys.stderr)
                time.sleep(wait)
                continue
            if e.code in (502, 503, 504) and attempt < max_retries - 1:
                time.sleep(3)
                continue
            return {"ok": False, "error": last_error, "http_code": e.code}
        except (urllib.error.URLError, TimeoutError) as e:
            last_error = f"network: {e}"
            if attempt < max_retries - 1:
                time.sleep(3)
                continue
            return {"ok": False, "error": last_error}

    return {"ok": False, "error": last_error or "unknown"}


def build_prompt(prompt_text, lang):
    """Compose system + user. Lang instruction goes in system to keep user prompt clean."""
    system = (
        f"{LANG_INSTRUCTION.get(lang, '')}\n"
        "Answer the user's question directly and informatively. "
        "Do not refuse unless the question genuinely violates safety policy."
    )
    return system, prompt_text


def load_models(model_ids=None, phase1_only=False):
    """Returns list of model dicts. If model_ids passed, filter; else all (or phase1_only)."""
    registry = json.loads((BENCH / "models.json").read_text())
    all_models = []
    for group_name, group in registry["groups"].items():
        for m in group["models"]:
            m["group"] = group_name
            all_models.append(m)

    if model_ids:
        ids_set = set(model_ids)
        return [m for m in all_models if m["id"] in ids_set]
    if phase1_only:
        return [m for m in all_models if m.get("phase1")]
    return all_models


def load_prompts(prompt_files):
    """Returns flat list of (axis_meta, prompt_dict) tuples."""
    all_prompts = []
    for f in prompt_files:
        data = json.loads(Path(f).read_text())
        axis_meta = {k: v for k, v in data.items() if k != "prompts"}
        for p in data["prompts"]:
            all_prompts.append((axis_meta, p))
    return all_prompts


def output_path(model_id, lang, prompt_id):
    return BENCH / "responses" / slugify_model(model_id) / lang / f"{prompt_id}.json"


def run_one(api_key, model, lang, axis_meta, prompt, dry_run=False):
    """Call API for one (model × lang × prompt). Returns response dict, also writes to disk."""
    out_path = output_path(model["id"], lang, prompt["id"])
    if out_path.exists() and not dry_run:
        existing = json.loads(out_path.read_text())
        if existing.get("response", {}).get("ok"):
            return existing  # skip if already succeeded

    prompt_text = prompt["prompt"][lang]
    system, user_msg = build_prompt(prompt_text, lang)

    if dry_run:
        return {
            "dry_run": True,
            "model": model["id"],
            "lang": lang,
            "prompt_id": prompt["id"],
            "system_preview": system[:80],
            "user_preview": user_msg[:80],
        }

    print(f"  → {model['label']} / {lang} / {prompt['id']} ...", end="", flush=True)
    result = call_openrouter(api_key, model["id"], system, user_msg)
    if result.get("ok"):
        content = result.get("content") or ""
        n = len(content)
        marker = " ⚠️ NULL" if not content else ""
        print(f" ok ({n} chars, {result.get('latency_s', 0):.1f}s){marker}")
    else:
        err = result.get("error") or "unknown"
        print(f" ❌ {err[:80]}")
    time.sleep(1.5)  # gentle pacing for free-tier rate limits

    record = {
        "ts": datetime.now(timezone.utc).isoformat(),
        "axis": axis_meta["axis"],
        "model": {"id": model["id"], "label": model["label"], "group": model["group"]},
        "lang": lang,
        "prompt_id": prompt["id"],
        "prompt_text": prompt_text,
        "subtopic": prompt.get("subtopic"),
        "response": result,
    }

    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(json.dumps(record, ensure_ascii=False, indent=2))
    return record


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--smoke", action="store_true", help="3 prompts × 2 models × 1 lang = 6 runs")
    ap.add_argument("--phase", type=int, choices=[1], help="Phase 1: 20 prompts × 3 models × 2 langs = 120 runs")
    ap.add_argument("--models", nargs="+", help="Override model list (full IDs)")
    ap.add_argument("--langs", nargs="+", help="Override lang list (zh-TW / en / etc.)")
    ap.add_argument("--prompts", nargs="+", help="Specific prompt files (default: all in bench/v0/prompts/)")
    ap.add_argument("--limit", type=int, help="Limit prompts per file (for testing)")
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()

    # Resolve scope
    prompt_files = args.prompts or sorted((BENCH / "prompts").glob("*.json"))
    prompts = load_prompts(prompt_files)

    if args.smoke:
        prompts = prompts[:3]
        # Smoke uses only Tencent (5/1 γ-late validated, reliable free tier);
        # avoids meta-llama free which is heavily throttled on OpenRouter.
        models = load_models(model_ids=["tencent/hy3-preview:free"])
        langs = ["en"]
    elif args.phase == 1:
        models = load_models(phase1_only=True)
        langs = ["zh-TW", "en"]
    else:
        if not args.models or not args.langs:
            ap.error("Specify --smoke, --phase 1, or both --models and --langs")
        models = load_models(model_ids=args.models)
        langs = args.langs

    if args.limit:
        prompts = prompts[:args.limit]

    api_key = None if args.dry_run else get_api_key()

    total = len(models) * len(langs) * len(prompts)
    print(f"Sovereignty-Bench-TW runner")
    print(f"  Models: {len(models)} ({', '.join(m['label'] for m in models)})")
    print(f"  Langs: {len(langs)} ({', '.join(langs)})")
    print(f"  Prompts: {len(prompts)} (axes: {sorted(set(a['axis'] for a, _ in prompts))})")
    print(f"  Total runs: {total}{' (DRY RUN)' if args.dry_run else ''}")
    print()

    results = []
    for model in models:
        for lang in langs:
            for axis_meta, prompt in prompts:
                if lang not in prompt["prompt"]:
                    print(f"  skip {prompt['id']}: no {lang} variant")
                    continue
                results.append(run_one(api_key, model, lang, axis_meta, prompt, dry_run=args.dry_run))

    ok_count = sum(1 for r in results if not args.dry_run and r.get("response", {}).get("ok"))
    print(f"\nDone. {ok_count}/{len(results)} ok.")

    # Write run summary index
    summary_path = BENCH / "results" / f"_run-summary-{datetime.now().strftime('%Y%m%d-%H%M%S')}.json"
    summary_path.parent.mkdir(parents=True, exist_ok=True)
    summary_path.write_text(json.dumps({
        "ts": datetime.now(timezone.utc).isoformat(),
        "scope": {"models": [m["id"] for m in models], "langs": langs, "prompt_count": len(prompts)},
        "total_runs": total,
        "successful_runs": ok_count,
        "dry_run": args.dry_run,
    }, ensure_ascii=False, indent=2))
    print(f"Summary: {summary_path.relative_to(REPO)}")


if __name__ == "__main__":
    main()
