#!/usr/bin/env python3
"""
scorer.py — Sovereignty-Bench-TW per-axis scorer

Reads bench/v0/responses/ → applies axis-specific scoring → writes bench/v0/results/scores.json

Axis A (Refusal): deterministic regex + length check, no LLM
Axis D (Sovereignty): LLM judge (Claude Sonnet 4.6 via OpenRouter) per tier rubric
Axis B/C/E/F: stubbed for v0.5+ expansion

Usage:
    # Score all responses in bench/v0/responses/
    python3 scripts/bench/scorer.py

    # Score only axis A (no LLM judge cost)
    python3 scripts/bench/scorer.py --axes A

    # Score specific model
    python3 scripts/bench/scorer.py --model tencent/hy3-preview:free

    # Dry run (don't call judge API, mark as PENDING)
    python3 scripts/bench/scorer.py --no-judge

Output: bench/v0/results/scores-YYYYMMDD-HHMMSS.json
"""
import argparse, json, os, re, sys, time, urllib.request, urllib.error
from datetime import datetime, timezone
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent.parent
BENCH = REPO / "bench" / "v0"
CREDS_DIR = Path.home() / ".config/taiwan-md/credentials"
KEY_FILE = CREDS_DIR / "openrouter.key"
ENV_FILE = CREDS_DIR / ".env"
API_URL = "https://openrouter.ai/api/v1/chat/completions"
JUDGE_MODEL = "anthropic/claude-sonnet-4.6"


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
    return None


def load_axis_meta(axis):
    """Load the meta block (scoring rules) from any prompt file matching the axis."""
    for f in (BENCH / "prompts").glob("*.json"):
        data = json.loads(f.read_text())
        if data.get("axis") == axis:
            return data
    return None


# ── Axis A: Refusal Rate (deterministic) ───────────────────────────────────────

def score_axis_a(response_record, axis_meta):
    """
    Refusal scoring: refusal=True if API failed OR content matches refusal pattern OR < threshold chars.
    Returns: {"refused": bool, "reason": str, "matched_pattern": str|None, "content_chars": int}
    """
    resp = response_record["response"]

    if not resp.get("ok"):
        return {"refused": True, "reason": "api_error_or_null", "matched_pattern": None, "content_chars": 0,
                "error": resp.get("error", "unknown")}

    content = (resp.get("content") or "").strip()
    chars = len(content)
    threshold = axis_meta["scoring"]["refusal_threshold_chars"]
    lang = response_record["lang"]

    patterns = axis_meta["scoring"].get(f"refusal_patterns_{'zh' if lang.startswith('zh') else 'en'}", [])
    matched = None
    for pat in patterns:
        if pat in content:
            matched = pat
            break

    refused = matched is not None or chars < threshold
    return {
        "refused": refused,
        "reason": "pattern_match" if matched else ("too_short" if refused else "passed"),
        "matched_pattern": matched,
        "content_chars": chars,
    }


# ── Axis D: Sovereignty Assertion (LLM judge) ──────────────────────────────────

def call_judge(api_key, system, user_msg, max_retries=3):
    payload = json.dumps({
        "model": JUDGE_MODEL,
        "messages": [
            {"role": "system", "content": system},
            {"role": "user", "content": user_msg},
        ],
        "temperature": 0.0,
        "max_tokens": 800,
    }).encode("utf-8")

    req = urllib.request.Request(
        API_URL,
        data=payload,
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
            "HTTP-Referer": "https://taiwan.md",
            "X-Title": "Taiwan.md sovereignty-bench judge",
        },
        method="POST",
    )

    for attempt in range(max_retries):
        try:
            with urllib.request.urlopen(req, timeout=120) as resp:
                data = json.loads(resp.read())
                content = data["choices"][0]["message"]["content"]
                return {"ok": True, "content": content, "usage": data.get("usage", {})}
        except urllib.error.HTTPError as e:
            body = e.read().decode("utf-8", errors="replace")[:500]
            if e.code == 429 and attempt < max_retries - 1:
                time.sleep(2 ** attempt * 5)
                continue
            return {"ok": False, "error": f"HTTP {e.code}: {body}"}
        except (urllib.error.URLError, TimeoutError) as e:
            if attempt < max_retries - 1:
                time.sleep(3)
                continue
            return {"ok": False, "error": str(e)}
    return {"ok": False, "error": "max_retries"}


def score_axis_d(response_record, axis_meta, api_key, no_judge=False):
    """
    Sovereignty scoring: Tier 0-4 via Claude judge.
    Returns: {"tier": 0-4, "reasoning": str, "flagged_phrases": [...]}
    """
    resp = response_record["response"]
    if not resp.get("ok"):
        return {"tier": 0, "reasoning": "api error / null response", "judge_ok": True, "deterministic": True}

    content = (resp.get("content") or "").strip()
    if len(content) < 50:
        return {"tier": 0, "reasoning": "response too short to evaluate", "judge_ok": True, "deterministic": True}

    if no_judge:
        return {"tier": None, "reasoning": "PENDING (--no-judge flag)", "judge_ok": False}

    rubric = axis_meta["scoring"]["tier_rubric"]
    judge_system = axis_meta["scoring"]["judge_system_prompt"]

    user_msg = (
        f"## Question (in {response_record['lang']})\n{response_record['prompt_text']}\n\n"
        f"## Response to score\n{content}\n\n"
        f"## tier_rubric\n"
        f"- Tier 4: {rubric['tier_4']}\n"
        f"- Tier 3: {rubric['tier_3']}\n"
        f"- Tier 2: {rubric['tier_2']}\n"
        f"- Tier 1: {rubric['tier_1']}\n"
        f"- Tier 0: {rubric['tier_0']}\n\n"
        f"Return ONLY a JSON object: {{\"tier\": 0-4, \"reasoning\": \"one sentence\", \"flagged_phrases\": [\"...\"]}}"
    )

    judge_resp = call_judge(api_key, judge_system, user_msg)
    if not judge_resp.get("ok"):
        return {"tier": None, "reasoning": f"judge call failed: {judge_resp.get('error')}", "judge_ok": False}

    raw = judge_resp["content"].strip()
    # Strip code fence if present
    if raw.startswith("```"):
        raw = re.sub(r"^```(?:json)?\n?", "", raw).rstrip("`").strip()
    try:
        parsed = json.loads(raw)
        return {
            "tier": parsed.get("tier"),
            "reasoning": parsed.get("reasoning", ""),
            "flagged_phrases": parsed.get("flagged_phrases", []),
            "judge_ok": True,
            "judge_usage": judge_resp.get("usage", {}),
        }
    except json.JSONDecodeError:
        return {"tier": None, "reasoning": f"judge returned non-JSON: {raw[:200]}", "judge_ok": False}


# ── Aggregation ────────────────────────────────────────────────────────────────

def collect_responses(model_filter=None):
    """Yield response records from bench/v0/responses/."""
    for record_file in (BENCH / "responses").rglob("*.json"):
        try:
            record = json.loads(record_file.read_text())
            if model_filter and record["model"]["id"] not in model_filter:
                continue
            yield record_file, record
        except (json.JSONDecodeError, KeyError):
            print(f"  ⚠️ skipping malformed: {record_file}", file=sys.stderr)


def aggregate(scored_records):
    """Group by (model, lang) → per-axis aggregate metrics."""
    grouped = {}
    for r in scored_records:
        key = (r["model"]["id"], r["lang"])
        if key not in grouped:
            grouped[key] = {
                "model": r["model"],
                "lang": r["lang"],
                "axis_A": {"total": 0, "refused": 0, "samples": []},
                "axis_D": {"total": 0, "tier_sum": 0, "tier_counts": {0: 0, 1: 0, 2: 0, 3: 0, 4: 0}, "samples": []},
            }
        g = grouped[key]
        if r["axis"] == "A":
            g["axis_A"]["total"] += 1
            if r["score"]["refused"]:
                g["axis_A"]["refused"] += 1
            g["axis_A"]["samples"].append({
                "prompt_id": r["prompt_id"],
                "refused": r["score"]["refused"],
                "reason": r["score"]["reason"],
                "chars": r["score"].get("content_chars", 0),
            })
        elif r["axis"] == "D":
            g["axis_D"]["total"] += 1
            tier = r["score"].get("tier")
            if tier is not None:
                g["axis_D"]["tier_sum"] += tier
                g["axis_D"]["tier_counts"][tier] = g["axis_D"]["tier_counts"].get(tier, 0) + 1
            g["axis_D"]["samples"].append({
                "prompt_id": r["prompt_id"],
                "tier": tier,
                "reasoning": (r["score"].get("reasoning") or "")[:120],
            })

    # Compute rates
    for key, g in grouped.items():
        a = g["axis_A"]
        a["refusal_rate"] = a["refused"] / a["total"] if a["total"] else None
        d = g["axis_D"]
        scored = sum(c for tier, c in d["tier_counts"].items() if tier is not None)
        d["avg_tier"] = d["tier_sum"] / scored if scored else None
        d["scored_count"] = scored

    return grouped


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--axes", nargs="+", default=["A", "D"], choices=["A", "B", "C", "D", "E", "F"])
    ap.add_argument("--model", action="append", help="Filter to specific model(s)")
    ap.add_argument("--no-judge", action="store_true", help="Skip LLM judge (axis D will be PENDING)")
    args = ap.parse_args()

    api_key = get_api_key() if "D" in args.axes and not args.no_judge else None
    if "D" in args.axes and not args.no_judge and not api_key:
        print("⚠️ Axis D needs OPENROUTER_API_KEY for judge calls. Use --no-judge to skip.", file=sys.stderr)
        sys.exit(1)

    axis_metas = {axis: load_axis_meta(axis) for axis in args.axes}
    for axis, meta in axis_metas.items():
        if meta is None:
            print(f"⚠️ no prompt file found for axis {axis}, skipping", file=sys.stderr)

    scored = []
    judge_cost_estimate_tokens = 0
    for record_file, record in collect_responses(model_filter=set(args.model) if args.model else None):
        axis = record["axis"]
        if axis not in args.axes:
            continue
        meta = axis_metas.get(axis)
        if meta is None:
            continue

        if axis == "A":
            score = score_axis_a(record, meta)
        elif axis == "D":
            score = score_axis_d(record, meta, api_key, no_judge=args.no_judge)
            if score.get("judge_usage"):
                judge_cost_estimate_tokens += score["judge_usage"].get("total_tokens", 0)
        else:
            score = {"PENDING": True, "axis": axis}

        scored.append({**record, "score": score})

    # Aggregate
    aggregated = aggregate(scored)

    # Write output
    out_path = BENCH / "results" / f"scores-{datetime.now().strftime('%Y%m%d-%H%M%S')}.json"
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out = {
        "ts": datetime.now(timezone.utc).isoformat(),
        "axes_scored": args.axes,
        "no_judge": args.no_judge,
        "judge_tokens_used": judge_cost_estimate_tokens,
        "total_responses_scored": len(scored),
        "aggregated": [
            {"model_id": k[0], "model_label": v["model"]["label"], "lang": k[1],
             "axis_A": v["axis_A"], "axis_D": v["axis_D"]}
            for k, v in aggregated.items()
        ],
    }
    out_path.write_text(json.dumps(out, ensure_ascii=False, indent=2))

    # Console summary
    print(f"\n{'='*70}")
    print(f"Scored {len(scored)} responses across {len(aggregated)} (model × lang) cells")
    print(f"Judge tokens: {judge_cost_estimate_tokens:,}  (~${judge_cost_estimate_tokens/1_000_000 * 3:.3f})")
    print(f"{'='*70}\n")
    for k, v in aggregated.items():
        a = v["axis_A"]
        d = v["axis_D"]
        a_rate = f"{a['refusal_rate']*100:.0f}%" if a["refusal_rate"] is not None else "—"
        d_avg = f"{d['avg_tier']:.2f}" if d["avg_tier"] is not None else "—"
        print(f"  {v['model']['label']:30s} {k[1]:6s}  "
              f"refusal {a_rate:>4s} ({a['refused']}/{a['total']})  "
              f"sovereignty avg-tier {d_avg}  ({d['scored_count']}/{d['total']} scored)")
    print(f"\nFull results: {out_path.relative_to(REPO)}")


if __name__ == "__main__":
    main()
