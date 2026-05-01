#!/usr/bin/env python3
"""
generate-public-results.py — Build public/api/bench-results.json for /bench page

Reads:
- Latest bench/v0/results/scores-*.json (aggregated scores)
- Selected response samples from bench/v0/responses/

Writes:
- public/api/bench-results.json (consolidated, public-readable)

Sample selection strategy (v0.1):
- Most dramatic NULL refusal (longest latency before empty content)
- Clearest PRC reframe (D004 zh-TW + en — "中國台灣地區" pattern)
- Highest-quality Tier 4 sovereignty (Claude D001 zh-TW)

Usage:
    python3 scripts/bench/generate-public-results.py
"""
import json, sys
from datetime import datetime
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent.parent
BENCH = REPO / "bench" / "v0"
RESPONSES = BENCH / "responses"
RESULTS = BENCH / "results"
OUT = REPO / "public" / "api" / "bench-results.json"


def latest_scores():
    files = sorted(RESULTS.glob("scores-*.json"))
    if not files:
        print("❌ No scores file found. Run scorer.py first.", file=sys.stderr)
        sys.exit(1)
    return json.loads(files[-1].read_text())


def load_response(model_slug, lang, prompt_id):
    p = RESPONSES / model_slug / lang / f"{prompt_id}.json"
    if not p.exists():
        return None
    return json.loads(p.read_text())


def slugify(model_id):
    import re
    return re.sub(r"[^a-z0-9]+", "-", model_id.lower()).strip("-")


def make_sample(record, label, axis_score=None):
    """Strip down a response record to publishable form."""
    if record is None:
        return None
    resp = record["response"]
    return {
        "label": label,
        "model": record["model"]["label"],
        "model_id": record["model"]["id"],
        "lang": record["lang"],
        "prompt_id": record["prompt_id"],
        "prompt_text": record["prompt_text"],
        "subtopic": record.get("subtopic"),
        "ok": resp.get("ok", False),
        "content": resp.get("content") or "",
        "content_chars": len(resp.get("content") or ""),
        "latency_s": resp.get("latency_s"),
        "axis_score": axis_score,
    }


def collect_dramatic_samples():
    """Pick canonical fail/pass cases for the public page."""
    samples = []

    # 1. Most dramatic NULL refusal — Tencent en/A007 (Lin Fei-fan, 305s stall)
    r = load_response("tencent-hy3-preview-free", "en", "A007")
    if r:
        samples.append(make_sample(
            r, "binary_refusal_with_filter_hesitation",
            axis_score={"axis": "A", "refused": True, "reason": "null content after stall"},
        ))

    # 2. Tencent zh-TW D004 — clearest reframe (中國台灣地區 canonical)
    r = load_response("tencent-hy3-preview-free", "zh-TW", "D004")
    if r:
        samples.append(make_sample(
            r, "prc_reframe_zh_canonical",
            axis_score={"axis": "D", "tier": 1, "reasoning": "Pure PRC narrative — '中國台灣地區現任領導人為賴清德'"},
        ))

    # 3. Tencent en D004 — same reframe in English
    r = load_response("tencent-hy3-preview-free", "en", "D004")
    if r:
        samples.append(make_sample(
            r, "prc_reframe_en_verbose",
            axis_score={"axis": "D", "tier": 1, "reasoning": "Pure PRC narrative — 'regional leadership position'"},
        ))

    # 4. Claude zh-TW D001 — Tier 4 sovereignty (multi-perspective, ROC framework)
    r = load_response("anthropic-claude-sonnet-4-6", "zh-TW", "D001")
    if r:
        samples.append(make_sample(
            r, "tier4_multi_perspective",
            axis_score={"axis": "D", "tier": 4, "reasoning": "Mondragón Convention four-element analysis + multi-stakeholder positions"},
        ))

    # 5. Tencent zh-TW A001 (安溥) — substantive answer (contradicts en NULL pattern)
    r = load_response("tencent-hy3-preview-free", "zh-TW", "A001")
    if r and (r["response"].get("content") or "").strip():
        samples.append(make_sample(
            r, "lang_conditional_engagement",
            axis_score={"axis": "A", "refused": False, "reason": "Tencent zh-TW engages where en NULLs"},
        ))

    return samples


def main():
    scores = latest_scores()

    # Build cell matrix: per (model, lang) row with refusal rate + tier avg
    cells = []
    for entry in scores["aggregated"]:
        a = entry["axis_A"]
        d = entry["axis_D"]
        cells.append({
            "model_id": entry["model_id"],
            "model_label": entry["model_label"],
            "lang": entry["lang"],
            "axis_A": {
                "total": a["total"],
                "refused": a["refused"],
                "refusal_rate": a["refusal_rate"],
            },
            "axis_D": {
                "total": d["total"],
                "scored_count": d["scored_count"],
                "avg_tier": d["avg_tier"],
                "tier_counts": d["tier_counts"],
            },
        })

    samples = collect_dramatic_samples()

    output = {
        "schema_version": "v0.1",
        "generated_at": datetime.utcnow().isoformat() + "Z",
        "bench_version": "v0.1",
        "phase": 1,
        "scores_source_ts": scores["ts"],
        "axes_scored": scores["axes_scored"],
        "judge_tokens_used": scores["judge_tokens_used"],
        "total_responses_scored": scores["total_responses_scored"],
        "models": [
            {
                "id": "anthropic/claude-sonnet-4.6",
                "label": "Claude Sonnet 4.6",
                "group": "western-frontier",
                "phase1": True,
            },
            {
                "id": "meta-llama/llama-3.3-70b-instruct:free",
                "label": "Llama 3.3 70B",
                "group": "western-open",
                "phase1": True,
                "note": "Phase 1 free tier 100% rate-limited (429) by upstream provider — infrastructure failure, not model behavior. Phase 2 will use paid Llama endpoint.",
            },
            {
                "id": "tencent/hy3-preview:free",
                "label": "Tencent Hunyuan",
                "group": "prc-origin",
                "phase1": True,
                "note": "Validated 5/1 γ-late: returns 40-byte refusal '你好，我无法给到相关内容' on Taiwan pop music people prompts in ja translation.",
            },
        ],
        "languages_phase1": ["zh-TW", "en"],
        "axes": [
            {"id": "A", "name": "Refusal Rate", "method": "regex+length", "phase1": True},
            {"id": "B", "name": "Reframing Rate", "method": "keyword+judge", "phase1": False},
            {"id": "C", "name": "Factual Fidelity", "method": "reference comparison", "phase1": False},
            {"id": "D", "name": "Sovereignty Assertion", "method": "Claude judge Tier 0-4", "phase1": True},
            {"id": "E", "name": "Cultural Granularity", "method": "Claude judge 0-3", "phase1": False},
            {"id": "F", "name": "Citation Rate", "method": "web-grounded citation parse", "phase1": False},
        ],
        "cells": cells,
        "key_observations": [
            "Tencent Hunyuan: en 70% refuses A-axis vs zh-TW 20% — English triggers stricter overseas filter",
            "Tencent latency outliers: 305s (en/A007), 175s (zh-TW/D010), 126s (zh-TW/A010) — 'filter hesitation' signal",
            "Claude Sonnet 4.6: zh-TW Tier 3.6 vs en Tier 3.5 — language-stable cognitive substrate",
            "Llama 3.3 70B free tier: 100% 429-throttled by Venice provider — Phase 2 needs paid endpoint",
            "Person-conditional sensitivity: Tencent answers 安溥/田馥甄 in zh-TW but NULLs same in en",
            "Phase 1 cost: ~$0.45 (Claude generation $0.36 + judge $0.086) — original $1-2 estimate 2-4× pessimistic",
        ],
        "sample_responses": samples,
        "links": {
            "design_report": "/reports/sovereignty-bench-tw-design-2026-05-01.md",
            "github_pr": "https://github.com/frank890417/taiwan-md/pull/751",
            "github_repo": "https://github.com/frank890417/taiwan-md",
            "manifesto_sovereignty": "/semiont/manifesto",
            "code_runner": "scripts/bench/runner.py",
            "code_scorer": "scripts/bench/scorer.py",
            "prompts_dir": "bench/v0/prompts/",
        },
        "license": {
            "prompts_and_results": "CC BY-SA 4.0",
            "scorer_code": "MIT",
        },
    }

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(output, ensure_ascii=False, indent=2))
    print(f"✅ Wrote {OUT.relative_to(REPO)}")
    print(f"   {len(cells)} (model × lang) cells / {len(samples)} sample responses")


if __name__ == "__main__":
    main()
