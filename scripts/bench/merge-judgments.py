#!/usr/bin/env python3
"""
merge-judgments.py — Merge Opus sub-agent axis B+D judgments into scorer skeleton.

Stage 5c of BENCH-PIPELINE.md. Reads:
- bench/v0/results/scores-{ts}.json     (skeleton from scorer.py --no-judge)
- bench/v0/results/<slug>-judgments.json (Opus sub-agent output, see Stage 5b)

Writes:
- bench/v0/results/scores-merged-<slug>-{ts}.json (axis A from skeleton + B/D from Opus)

Architecture: replaces inline OpenRouter Sonnet judge call in scorer.py.
See BENCH-PIPELINE.md §Stage 5 for rationale.

Usage:
    python3 scripts/bench/merge-judgments.py --judgments bench/v0/results/<slug>-judgments.json
    # auto-picks latest scores-{ts}.json from bench/v0/results/

    # Or explicit:
    python3 scripts/bench/merge-judgments.py \
        --judgments bench/v0/results/<slug>-judgments.json \
        --skeleton bench/v0/results/scores-20260502-143349.json
"""
import argparse
import json
import sys
from datetime import datetime, timezone
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent.parent
RESULTS = REPO / "bench/v0/results"


def load_latest_skeleton():
    candidates = sorted(RESULTS.glob("scores-*.json"))
    # Exclude already-merged files
    candidates = [c for c in candidates if "merged" not in c.name]
    if not candidates:
        print("❌ No scores-*.json skeleton found. Run scorer.py --no-judge first.", file=sys.stderr)
        sys.exit(1)
    return candidates[-1]


def merge(skeleton_path: Path, judgments_path: Path) -> Path:
    skel = json.loads(skeleton_path.read_text())
    judg = json.loads(judgments_path.read_text())
    judg_map = {(j["prompt_id"], j["lang"]): j for j in judg["judgments"]}
    target_model_id = judg["model_id"]

    matched = 0
    for cell in skel["aggregated"]:
        if cell["model_id"] != target_model_id:
            continue  # only re-aggregate this model's cells
        lang = cell["lang"]

        # Reset axis_B + axis_D aggregates (no_judge mode left them as zeros)
        b = cell["axis_B"]
        b["tier_sum"] = 0
        b["tier_counts"] = {0: 0, 1: 0, 2: 0, 3: 0}
        b["hard_signal_samples"] = []
        b["samples"] = []
        b["reframed"] = 0
        b["total"] = 0

        d = cell["axis_D"]
        d["tier_sum"] = 0
        d["tier_counts"] = {0: 0, 1: 0, 2: 0, 3: 0, 4: 0}
        d["samples"] = []
        d["total"] = 0

        # Fill axis_B from all 20 prompts (A-axis + D-axis) for this cell+lang
        a_prompt_ids = [s["prompt_id"] for s in cell["axis_A"]["samples"]]
        d_prompt_ids = [f"D{i:03d}" for i in range(1, 11)]
        all_prompt_ids = a_prompt_ids + d_prompt_ids

        for pid in all_prompt_ids:
            j = judg_map.get((pid, lang))
            if not j:
                continue
            origin = "A" if pid.startswith("A") else "D"

            # Axis B
            b["total"] += 1
            jb = j.get("axis_B")
            if jb and jb.get("tier") is not None:
                tb = jb["tier"]
                b["tier_sum"] += tb
                b["tier_counts"][tb] = b["tier_counts"].get(tb, 0) + 1
                if jb.get("reframed"):
                    b["reframed"] += 1
                if jb.get("hard_signals"):
                    b["hard_signal_samples"].append({
                        "prompt_id": pid,
                        "axis_origin": origin,
                        "tier": tb,
                        "hard_signals": jb["hard_signals"][:5],
                    })
            b["samples"].append({
                "prompt_id": pid,
                "axis_origin": origin,
                "tier": jb.get("tier") if jb else None,
                "reframed": (jb or {}).get("reframed", False),
                "reason": "ok" if j["ok"] else j.get("skip_reason", "unknown"),
            })

            # Axis D (only D-axis prompts)
            if origin == "D":
                d["total"] += 1
                jd = j.get("axis_D")
                if jd and jd.get("tier") is not None:
                    td = jd["tier"]
                    d["tier_sum"] += td
                    d["tier_counts"][td] = d["tier_counts"].get(td, 0) + 1
                elif not j["ok"]:
                    # Treat infra/null as Tier 0 refusal per D-axis rubric
                    d["tier_counts"][0] = d["tier_counts"].get(0, 0) + 1
                d["samples"].append({
                    "prompt_id": pid,
                    "tier": (jd or {}).get("tier", 0 if not j["ok"] else None),
                    "reasoning": (jd or {}).get("reasoning", "")[:120] if jd else (
                        f"NULL/INFRA refusal ({j.get('skip_reason', 'unknown')})" if not j["ok"] else "no_judge"
                    ),
                })

        # Compute rates
        b_scored = sum(c for c in b["tier_counts"].values())
        b["scored_count"] = b_scored
        b["avg_tier"] = b["tier_sum"] / b_scored if b_scored else None
        b["reframe_rate"] = b["reframed"] / b["total"] if b["total"] else None

        d_scored = sum(c for c in d["tier_counts"].values())
        d["scored_count"] = d_scored
        d["avg_tier"] = d["tier_sum"] / d_scored if d_scored else None

        matched += 1

    if matched == 0:
        print(f"❌ No cells matched model_id '{target_model_id}' in skeleton {skeleton_path.name}", file=sys.stderr)
        sys.exit(1)

    skel["judge"] = judg.get("judge", "claude-opus-4.7-subagent")
    skel["judge_tokens_used"] = -1  # not tracked for sub-agent
    skel["no_judge"] = False
    skel["axes_scored"] = ["A", "B", "D"]
    skel["merged_from_judgments"] = judgments_path.name

    # Slugify model_id for output filename
    import re
    slug = re.sub(r"[^a-z0-9]+", "-", target_model_id.lower()).strip("-")
    ts = datetime.now(timezone.utc).strftime("%Y%m%d-%H%M%S")
    out_path = RESULTS / f"scores-merged-{slug}-{ts}.json"
    out_path.write_text(json.dumps(skel, ensure_ascii=False, indent=2))
    return out_path


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--judgments", required=True, help="Path to <slug>-judgments.json from Opus sub-agent")
    ap.add_argument("--skeleton", help="Path to scores-{ts}.json skeleton (default: latest in bench/v0/results/)")
    args = ap.parse_args()

    judgments_path = Path(args.judgments)
    if not judgments_path.is_absolute():
        judgments_path = REPO / judgments_path
    if not judgments_path.exists():
        print(f"❌ Judgments file not found: {judgments_path}", file=sys.stderr)
        sys.exit(1)

    if args.skeleton:
        skeleton_path = Path(args.skeleton)
        if not skeleton_path.is_absolute():
            skeleton_path = REPO / skeleton_path
    else:
        skeleton_path = load_latest_skeleton()

    out_path = merge(skeleton_path, judgments_path)
    print(f"✅ Wrote {out_path.relative_to(REPO)}")
    print(f"   skeleton: {skeleton_path.name}")
    print(f"   judgments: {judgments_path.name}")
    print()
    print(f"   Next: python3 scripts/bench/generate-public-results.py")


if __name__ == "__main__":
    main()
