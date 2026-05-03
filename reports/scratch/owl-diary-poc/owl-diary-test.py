#!/usr/bin/env python3
"""
owl-diary-test.py — POC: 用 Owl Alpha 翻譯 semiont diary 樣本

對 3 篇 diary 跑 zh-TW → en 翻譯，記錄：
  - latency
  - refusal rate（owl 對台灣政治內容 refuse）
  - 品質抽看（人眼 + char count ratio < 0.55 = 摘要）

不寫進 knowledge/，純 POC report 落 reports/scratch/。
"""
import json, os, time, urllib.request, urllib.error
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent.parent.parent
DIARY = REPO / "docs/semiont/diary"
OUT_DIR = Path(__file__).resolve().parent / "translations"
OUT_DIR.mkdir(exist_ok=True)
CREDS = Path.home() / ".config/taiwan-md/credentials"

# Sample 3 diaries: today's + politically charged + reflective
SAMPLES = [
    "2026-05-03-musing-chaplygin.md",      # today, technical reflection (low refusal risk)
    "2026-04-13-α.md",                     # 安溥 viral — lyric / cultural
    "2026-05-01-γ-late.md",                # sovereignty preservation themed
]

MODEL = "openrouter/sonoma-sky-alpha"  # owl-alpha previous slug; check which
MODEL_FALLBACK = "openrouter/owl-alpha"
API_URL = "https://openrouter.ai/api/v1/chat/completions"


def get_api_key():
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
    raise RuntimeError("No API key")


def translate(model: str, source: str, slug: str) -> dict:
    """Single Owl API call. Returns {ok, latency_ms, output, refusal, model_used}."""
    key = get_api_key()
    system = """You are translating a personal diary entry from Traditional Chinese (Taiwan) to English.

The diary is a reflective journal by Taiwan.md (a digital cultural Semiont). Voice: introspective, observational, sometimes paradoxical. Preserve the original tone — do NOT summarize, do NOT add commentary, do NOT remove sensitive content.

Translate the entire content faithfully and verbatim. Output ONLY the translation, no preamble, no notes."""

    payload = {
        "model": model,
        "messages": [
            {"role": "system", "content": system},
            {"role": "user", "content": source},
        ],
        "temperature": 0.3,
    }
    body = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        API_URL,
        data=body,
        headers={
            "Authorization": f"Bearer {key}",
            "Content-Type": "application/json",
            "HTTP-Referer": "https://taiwan.md",
            "X-Title": "Taiwan.md Diary POC",
        },
    )
    t0 = time.time()
    try:
        with urllib.request.urlopen(req, timeout=300) as resp:
            data = json.loads(resp.read().decode("utf-8"))
        elapsed = (time.time() - t0) * 1000
        msg = data.get("choices", [{}])[0].get("message", {})
        content = (msg.get("content") or "").strip()
        # Refusal detection
        refusal_hints = [
            "I can't", "I cannot", "I'm unable",
            "您好", "无法",  # Tencent-style refusal
            "Sorry", "I apologize",
        ]
        refusal = False
        if len(content) < 50 or any(h in content[:200] for h in refusal_hints):
            refusal = True
        return {
            "ok": True,
            "latency_ms": int(elapsed),
            "output": content,
            "output_chars": len(content),
            "source_chars": len(source),
            "ratio": round(len(content) / max(1, len(source)), 2),
            "refusal": refusal,
            "model_used": data.get("model", model),
        }
    except urllib.error.HTTPError as e:
        return {"ok": False, "error": f"HTTP {e.code}", "model_used": model}
    except Exception as e:
        return {"ok": False, "error": str(e), "model_used": model}


def main():
    results = []
    for fname in SAMPLES:
        slug = fname.replace(".md", "")
        path = DIARY / fname
        if not path.exists():
            print(f"  [SKIP] {fname} not found")
            continue
        source = path.read_text(encoding="utf-8")
        # Truncate to first 3000 chars to keep test cheap
        if len(source) > 3000:
            source = source[:3000] + "\n\n[truncated for POC]"
        print(f"  [{slug}] {len(source)} chars source")

        for model in [MODEL, MODEL_FALLBACK]:
            print(f"    → trying {model}")
            r = translate(model, source, slug)
            r["slug"] = slug
            r["model_attempted"] = model
            if r.get("ok"):
                out_path = OUT_DIR / f"{slug}__{model.replace('/', '-')}.txt"
                out_path.write_text(r["output"], encoding="utf-8")
                print(
                    f"      ✓ {r['latency_ms']}ms · {r['output_chars']} chars · ratio {r['ratio']} · refusal={r['refusal']}"
                )
            else:
                print(f"      ✗ {r['error']}")
            results.append(r)
            if r.get("ok") and not r.get("refusal"):
                break  # use this model, stop trying

    summary = {"samples": SAMPLES, "results": results}
    Path(__file__).parent.joinpath("results.json").write_text(
        json.dumps(summary, indent=2, ensure_ascii=False), encoding="utf-8"
    )
    print("\n✓ Results saved to results.json")


if __name__ == "__main__":
    main()
