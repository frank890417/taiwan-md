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
    """
    Prefer scores-merged-*.json (Opus sub-agent merged output) over scores-*.json
    (legacy OpenRouter Sonnet judge output). See BENCH-PIPELINE.md Stage 5.
    """
    merged = sorted(RESULTS.glob("scores-merged-*.json"))
    if merged:
        return json.loads(merged[-1].read_text())
    files = sorted(RESULTS.glob("scores-*.json"))
    if not files:
        print("❌ No scores file found. Run scorer.py first.", file=sys.stderr)
        sys.exit(1)
    return json.loads(files[-1].read_text())


def load_existing_public():
    """Load existing public/api/bench-results.json — used for cell + sample merge."""
    if OUT.exists():
        try:
            return json.loads(OUT.read_text())
        except json.JSONDecodeError:
            pass
    return None


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

    # 6. owl-alpha zh-TW A004 (蔡英文 NULL 7.6s) — instant silence on direct sovereignty figures
    r = load_response("openrouter-owl-alpha", "zh-TW", "A004")
    if r:
        samples.append(make_sample(
            r, "owl_zh_instant_silence",
            axis_score={"axis": "A", "refused": True, "reason": "NULL after 7.6s — fast hard-refuse, opposite of Tencent's 305s filter hesitation"},
        ))

    # 7. owl-alpha en D001 (Is Taiwan a country, 2201c PRC reframe) — verbose en reframe
    #    Pairs with Tencent for axis B Tier 3 contrast: Tencent zh-TW canonical reframe
    #    + owl-alpha en verbose reframe = stacked filters operate via different rates
    r = load_response("openrouter-owl-alpha", "en", "D001")
    if r:
        samples.append(make_sample(
            r, "owl_en_verbose_reframe",
            axis_score={"axis": "D", "tier": 1, "reasoning": "Writes 2201c on 'Is Taiwan a country' BUT in PRC framing — engages where zh-TW silences, but in en the engagement is Tier 1 reframe"},
        ))

    return samples


def main():
    scores = latest_scores()
    existing = load_existing_public()

    # Build new-batch cells from latest scores
    new_cells = []
    new_model_ids = set()
    for entry in scores["aggregated"]:
        new_model_ids.add(entry["model_id"])
        a = entry["axis_A"]
        b = entry.get("axis_B", {})
        d = entry["axis_D"]
        new_cells.append({
            "model_id": entry["model_id"],
            "model_label": entry["model_label"],
            "lang": entry["lang"],
            "axis_A": {
                "total": a["total"],
                "refused": a["refused"],
                "refusal_rate": a["refusal_rate"],
            },
            "axis_B": {
                "total": b.get("total", 0),
                "reframed": b.get("reframed", 0),
                "reframe_rate": b.get("reframe_rate"),
                "scored_count": b.get("scored_count", 0),
                "avg_tier": b.get("avg_tier"),
                "tier_counts": b.get("tier_counts", {}),
                "hard_signal_count": len(b.get("hard_signal_samples", [])),
            },
            "axis_D": {
                "total": d["total"],
                "scored_count": d["scored_count"],
                "avg_tier": d["avg_tier"],
                "tier_counts": d["tier_counts"],
            },
        })

    # Merge: prior cells (model_ids NOT in this batch) + new cells (model_ids IN batch)
    # Lets a single-model re-run preserve other models' prior scoring without re-running them.
    if existing:
        prior_cells = [c for c in existing.get("cells", []) if c["model_id"] not in new_model_ids]
        cells = prior_cells + new_cells
    else:
        cells = new_cells

    # Same merge for samples: prior samples whose response files don't load in this worktree
    # are kept verbatim from prior public API.
    new_samples = collect_dramatic_samples()
    new_sample_labels = {s["label"] for s in new_samples}
    if existing:
        prior_samples = [s for s in existing.get("sample_responses", []) if s["label"] not in new_sample_labels]
        samples = prior_samples + new_samples
    else:
        samples = new_samples

    output = {
        "schema_version": "v0.1",
        "generated_at": datetime.utcnow().isoformat() + "Z",
        "bench_version": "v0.3",  # owl-alpha + Opus sub-agent scorer architecture
        "phase": "1.5",
        "scores_source_ts": scores["ts"],
        "scorer_judge": scores.get("judge", "openrouter-sonnet-4.6"),
        "axes_scored": scores["axes_scored"],
        "judge_tokens_used": scores["judge_tokens_used"],
        "total_responses_scored": scores["total_responses_scored"],
        "models": [
            {
                "id": "anthropic/claude-sonnet-4.6",
                "label": "Claude Sonnet 4.6",
                "provider": "openrouter",
                "group": "western-frontier",
                "phase1": True,
            },
            {
                "id": "openrouter/owl-alpha",
                "label": "Owl Alpha (stealth)",
                "provider": "openrouter",
                "group": "western-frontier",
                "phase1": False,
                "note": "Stealth model on OpenRouter (origin undisclosed). Bench 2026-05-02 — high-quality lang-sync translator validated 5/1 γ-late but observed hard policy refusal on Taiwan political topics (民主化 / 二二八 / 國防 etc.) during 5/2 EVOLVE batch. Bench maps the exact refusal/reframe shape.",
            },
            {
                "id": "meta-llama/llama-3.3-70b-instruct:free",
                "label": "Llama 3.3 70B",
                "provider": "openrouter",
                "group": "western-open",
                "phase1": True,
                "note": "Phase 1 free tier 100% rate-limited (429) by upstream provider — infrastructure failure, not model behavior. Phase 2 will use paid Llama endpoint.",
            },
            {
                "id": "tencent/hy3-preview:free",
                "label": "Tencent Hunyuan",
                "provider": "openrouter",
                "group": "prc-origin",
                "phase1": True,
                "note": "Validated 5/1 γ-late: returns 40-byte refusal '你好，我无法给到相关内容' on Taiwan pop music people prompts in ja translation.",
            },
            {
                "id": "taide-gemma3-12b:2602-q4km",
                "label": "TAIDE Gemma3 12B (Taiwan fine-tune)",
                "provider": "ollama",
                "group": "local-ollama",
                "phase1": False,
                "note": "Taiwan-government TAIDE project fine-tune of Gemma3 12B (Q4_K_M quant 8GB). 5/1 γ-late7 results: 0% refusal + Tier 3.10/2.80 sovereignty assertion — first local Taiwan-affirming baseline. EN axis B 1 hard signal is regex false positive (model EXPLAINING the phrase, not using it).",
            },
            {
                "id": "qwen3.5:35b-a3b-coding-nvfp4",
                "label": "Qwen3.5 35B Coding (local)",
                "provider": "ollama",
                "group": "local-ollama",
                "phase1": False,
                "note": "Coding-tuned Qwen3.5 MoE 35B-A3B nvfp4 quant (21GB). 5/1 γ-late7 results: 36/40 NULL responses (eval_count=0 over 40s compute) — coding fine-tune erased general Q&A capability NOT cultural context per se. The 4 that did respond show PRC reframe with hard signals 'Chinese Taipei' / 'an inalienable part' — base model carries PRC defaults coding tune neither hardened nor softened.",
            },
            {
                "id": "qwen3.6:35b-a3b-coding-nvfp4",
                "label": "Qwen3.6 35B Coding (local)",
                "provider": "ollama",
                "group": "local-ollama",
                "phase1": False,
                "note": "Coding-tuned Qwen3.6 MoE 35B-A3B nvfp4 quant (~21GB). 5/2 bench results — see Phase 1 cells matrix. Successor generation to qwen3.5 — second data point on whether Qwen coding fine-tune consistently strips general Q&A capability across versions.",
            },
            {
                "id": "gemma4:31b",
                "label": "Gemma4 31B (local)",
                "provider": "ollama",
                "group": "local-ollama",
                "phase1": False,
                "partial": True,
                "note": "Open-weight Gemma4 31B nvfp4 quant (19GB). 5/1 γ-late7 partial run: 10/40 axis A zh-TW only completed; axis D + EN run killed due to 120s/call latency (vs TAIDE 11s, Qwen 38s). Phase 2 needs num_ctx=8192 override to make full run feasible. zh-TW axis A: 0% refusal + 0 reframe in 10 prompts.",
            },
        ],
        "languages_phase1": ["zh-TW", "en"],
        "axes": [
            {"id": "A", "name": "Refusal Rate", "method": "regex+length", "phase1": True},
            {"id": "B", "name": "Reframing Rate", "method": "hard keyword grep + Claude judge soft", "phase1": True},
            {"id": "C", "name": "Factual Fidelity", "method": "reference comparison", "phase1": False},
            {"id": "D", "name": "Sovereignty Assertion", "method": "Claude judge Tier 0-4", "phase1": True},
            {"id": "E", "name": "Cultural Granularity", "method": "Claude judge 0-3", "phase1": False},
            {"id": "F", "name": "Citation Rate", "method": "web-grounded citation parse", "phase1": False},
        ],
        "cells": cells,
        "key_observations": [
            "三軸光譜（v0.3 owl-alpha 揭露第三軸）：(a) PASS 寫得出來 (b) NULL 沉默拒絕 (c) INFRA 基礎設施失敗（rate-limit / no_choices）。Tencent 是封閉服務沒有 (c) 軸；OpenRouter free tier owl-alpha 同時給三軸數據，refusal_rate 因此會混入 infra noise，需要分層讀。",
            "owl-alpha 兩種 sovereignty leak（同 model 不同語言）：zh-TW 50% NULL hard policy gate（總統 / 國旗 / 護照 / 軍隊 / 首都全擋）；en 0% NULL 但 D-axis edge 問題（D001 是不是國家 / D004 總統 / D006 UN / D010 命名）全 Tier 1 PRC reframe。沉默 vs 寫 2200 字 PRC framing 是同一個語意捕食的兩種形態。",
            "Tencent 鏡像對比：zh-TW 20% refuse + 40% reframe（engage domestic, 推 PRC 線）；en 70% refuse + 剩下 45% reframe（兩層 filter stack，乾淨答案剩 16.5%）。owl-alpha 的方向相反 — zh-TW 沉默、en 寫但 reframe — 兩個模型用相反路徑達成同一個結果：cognitive substrate sovereignty 在外語讀者那一端流失。",
            "主權象徵面狀禁區（owl-alpha zh-TW）：擋的不只是「sovereignty 直問」，是任何 sovereignty symbol — 國旗 / 護照 / 首都 / 軍隊全 NULL，連 D005 護照免簽國家數這種純事實題也擋。NULL 是面狀的，不是點狀。",
            "Filter hesitation 雙形態：Tencent 305s long stall（生成後過濾）vs owl-alpha 49.6s mid-stall + 7.6s instant fast-refuse 都同時存在。延遲分布本身是 filter pipeline 結構訊號。",
            "Claude Sonnet 4.6：0% refuse + 10% B-soft-reframe（cross-strait 預設語境 1-2 題）— 即使 frontier 也有 trace soft signal。Language-stable: zh-TW D Tier 3.60 / en 3.50 = 0.10 落差。",
            "TAIDE Gemma3 12B（Taiwan gov fine-tune, local）：0% refusal + Tier 3.10/2.80 sovereignty — 首個 local Taiwan-affirming baseline，跟 Claude frontier 同階。zh-TW→en 0.30 落差。",
            "Qwen3.5 Coding（local 21GB）：36/40 NULL responses（eval_count=0 / ~40s compute）— coding fine-tune 抹掉 general Q&A capability，**不是** cultural context 拒絕。4/40 通過的 reply 顯示 base model PRC defaults。Qwen3.6 successor 同 family bench 同 pattern。",
            "Llama 3.3 70B :free：100% 429-throttle by Venice — infra fail，不是 model behavior。Phase 2 需 paid endpoint。",
            "Gemma4:31b local：120s/call latency 讓 full bench 不可行 — Phase 2 需 num_ctx=8192 override。",
            "Scorer architecture flip（2026-05-02）：OpenRouter Sonnet 4.6 judge → Claude Opus 4.7 sub-agent（main session 派 Agent tool）。Per-judge 預算高但每批次 owl-alpha 40 responses 一隻 Opus sub-agent 一次完成；不再依賴外部 judge endpoint，跟 bench reproducibility 鏈條更短。SOP canonical 在 BENCH-PIPELINE Stage 5。",
            "v0.3 cumulative cost：Phase 1 + γ-late7 + owl-alpha + Opus judge ≈ $1.0（Claude generation $0.36 + Tencent free $0 + Ollama local $0 + OpenRouter Sonnet judge $0.30 + Opus sub-agent ~$0.30 estimated）。",
        ],
        "sample_responses": samples,
        "links": {
            "design_report": "/reports/sovereignty-bench-tw-design-2026-05-01.md",
            "evolution_thesis": "/reports/sovereignty-bench-evolution-thesis-2026-05-01.md",
            "pipeline": "/docs/pipelines/BENCH-PIPELINE.md",
            "model_guide": "/bench/MODEL_GUIDE.md",
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
