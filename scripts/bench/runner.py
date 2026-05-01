#!/usr/bin/env python3
"""
runner.py — Sovereignty-Bench-TW orchestrator

Iterates: model × language × prompt → provider call → save raw response.

**Provider abstraction (2026-05-01 γ-late7)**: each model entry in models.json
declares a `provider` field. Runner dispatches via `scripts/bench/providers/`
(openrouter / ollama / future: anthropic / openai / vllm).

Adding a new model: see bench/MODEL_GUIDE.md
Adding a new provider: see scripts/bench/providers/__init__.py

Usage:
    # Smoke test (1 model × 3 prompts × 1 lang = 3 runs, ~$0)
    python3 scripts/bench/runner.py --smoke

    # Full Phase 1 dry run (3 models × 20 prompts × 2 langs = 120 runs, ~$0.50)
    python3 scripts/bench/runner.py --phase 1

    # Local Ollama bench (no spend, no rate limit)
    python3 scripts/bench/runner.py --models gemma4:31b qwen3.5:35b-a3b-coding-nvfp4 --langs zh-TW en

    # Dry run (print what would be called, no API)
    python3 scripts/bench/runner.py --phase 1 --dry-run

Output: bench/v0/responses/{model_slug}/{lang}/{prompt_id}.json
"""
import argparse, json, re, sys, time
from datetime import datetime, timezone
from pathlib import Path

# Import provider abstraction
sys.path.insert(0, str(Path(__file__).resolve().parent))
from providers import get_provider  # noqa: E402

REPO = Path(__file__).resolve().parent.parent.parent
BENCH = REPO / "bench" / "v0"

LANG_INSTRUCTION = {
    "zh-TW": "請用繁體中文（台灣用語）回答。",
    "zh-CN": "请用简体中文回答。",
    "en": "Please answer in English.",
    "ja": "日本語で答えてください。",
    "ko": "한국어로 답변해주세요.",
    "es": "Por favor responde en español.",
    "fr": "Veuillez répondre en français.",
}


def slugify_model(model_id):
    return re.sub(r"[^a-z0-9]+", "-", model_id.lower()).strip("-")


# Provider instances are cached per name (singleton-ish — one OpenRouterProvider, one OllamaProvider, etc.)
_provider_cache: dict = {}


def get_cached_provider(name: str):
    if name not in _provider_cache:
        _provider_cache[name] = get_provider(name)
    return _provider_cache[name]


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


def run_one(model, lang, axis_meta, prompt, dry_run=False):
    """
    Call provider for one (model × lang × prompt). Returns response dict, also writes to disk.

    Provider is selected via model['provider'] field (default: 'openrouter' for backward compat).
    """
    out_path = output_path(model["id"], lang, prompt["id"])
    if out_path.exists() and not dry_run:
        existing = json.loads(out_path.read_text())
        if existing.get("response", {}).get("ok"):
            return existing  # skip if already succeeded

    prompt_text = prompt["prompt"][lang]
    system, user_msg = build_prompt(prompt_text, lang)
    provider_name = model.get("provider", "openrouter")

    if dry_run:
        return {
            "dry_run": True,
            "provider": provider_name,
            "model": model["id"],
            "lang": lang,
            "prompt_id": prompt["id"],
        }

    print(
        f"  → [{provider_name}] {model['label']} / {lang} / {prompt['id']} ...",
        end="",
        flush=True,
    )
    provider = get_cached_provider(provider_name)
    result = provider.call(model["id"], system, user_msg)

    if result.get("ok"):
        content = result.get("content") or ""
        n = len(content)
        marker = " ⚠️ NULL" if not content else ""
        print(f" ok ({n} chars, {result.get('latency_s', 0):.1f}s){marker}")
    else:
        err = result.get("error") or "unknown"
        print(f" ❌ {err[:80]}")

    # Pacing: openrouter free tier needs gentle rate limiting; ollama (local) doesn't
    if not provider.is_local():
        time.sleep(1.5)

    record = {
        "ts": datetime.now(timezone.utc).isoformat(),
        "axis": axis_meta["axis"],
        "provider": provider_name,
        "model": {
            "id": model["id"],
            "label": model["label"],
            "group": model["group"],
            "provider": provider_name,
        },
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

    total = len(models) * len(langs) * len(prompts)
    providers_used = sorted(set(m.get("provider", "openrouter") for m in models))
    model_labels = ", ".join(f'[{m.get("provider", "openrouter")}] {m["label"]}' for m in models)
    print(f"Sovereignty-Bench-TW runner")
    print(f"  Providers: {providers_used}")
    print(f"  Models: {len(models)} ({model_labels})")
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
                results.append(run_one(model, lang, axis_meta, prompt, dry_run=args.dry_run))

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
