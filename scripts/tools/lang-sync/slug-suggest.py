#!/usr/bin/env python3
"""
slug-suggest.py — Suggest English slugs for zh-TW articles missing en counterparts.

Reads a list of zh paths (one per line, or from --skip-list) and asks owl-alpha
to propose canonical slugs (kebab-case, ASCII, < 60 chars).

Output: JSON file that can be passed to prepare-batch.py via --slug-map.

Usage:
  python3 scripts/tools/lang-sync/slug-suggest.py --input /tmp/es-skip.txt --out .lang-sync-tasks/slug-suggested.json
  python3 scripts/tools/lang-sync/slug-suggest.py --paths "People/曹興誠.md,People/陳水扁.md" --out /tmp/slugs.json
"""
import argparse, json, os, sys, urllib.request, urllib.error
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent.parent.parent
CREDS = Path.home() / ".config/taiwan-md/credentials"
KEY_FILE = CREDS / "openrouter.key"
ENV_FILE = CREDS / ".env"


def get_api_key():
    if os.environ.get("OPENROUTER_API_KEY"):
        return os.environ["OPENROUTER_API_KEY"].strip()
    if ENV_FILE.exists():
        for line in ENV_FILE.read_text().splitlines():
            if line.startswith("OPENROUTER_API_KEY="):
                return line.split("=", 1)[1].strip().strip('"').strip("'")
    if KEY_FILE.exists():
        return KEY_FILE.read_text().strip()
    sys.exit("❌ No OpenRouter API key")


def call_owl(api_key, system, user):
    payload = json.dumps({
        "model": "openrouter/owl-alpha",
        "messages": [
            {"role": "system", "content": system},
            {"role": "user", "content": user},
        ],
        "temperature": 0.1,
        "max_tokens": 4000,
    }).encode()
    req = urllib.request.Request(
        "https://openrouter.ai/api/v1/chat/completions",
        data=payload,
        headers={"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"},
    )
    with urllib.request.urlopen(req, timeout=300) as resp:
        d = json.loads(resp.read())
        return d.get("choices", [{}])[0].get("message", {}).get("content", "")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--input", help="file with one zh_path per line OR comma-separated")
    ap.add_argument("--paths", help="comma-separated zh paths")
    ap.add_argument("--out", required=True)
    args = ap.parse_args()

    paths = []
    if args.input:
        text = Path(args.input).read_text().strip()
        if "," in text and "\n" not in text:
            paths = [p.strip() for p in text.split(",") if p.strip()]
        else:
            paths = [p.strip() for p in text.splitlines() if p.strip()]
    if args.paths:
        paths.extend(p.strip() for p in args.paths.split(",") if p.strip())
    paths = sorted(set(paths))
    if not paths:
        sys.exit("❌ no paths")

    print(f"📋 Suggesting slugs for {len(paths)} zh paths")

    # Read article titles to give the model context
    items = []
    for p in paths:
        zh_file = REPO / "knowledge/zh-TW" / p
        title = ""
        desc = ""
        if zh_file.exists():
            text = zh_file.read_text(errors="ignore")
            for line in text.split("\n")[:30]:
                if line.startswith("title:"):
                    title = line.split(":", 1)[1].strip().strip("'\"")
                elif line.startswith("description:"):
                    desc = line.split(":", 1)[1].strip().strip("'\"")[:120]
        items.append({"zh_path": p, "title": title, "desc": desc})

    api_key = get_api_key()
    system = """You are a slug generator for Taiwan.md.

Generate canonical English slugs (kebab-case, ASCII only, max 60 chars) for Chinese articles.

Rules:
1. For person names: use Pinyin or commonly-used English name (e.g. 蔡英文 → tsai-ing-wen, 鄭成功 → koxinga, 曹興誠 → robert-tsao)
2. For places/concepts: use meaningful English translation (e.g. 二二八事件 → 228-incident, 戒嚴 → martial-law)
3. ALL lowercase, words separated by `-`, no special chars except `-`
4. NO file extension
5. Output ONLY JSON: {"zh_path": "slug", ...}, no markdown fence, no commentary

Bias toward shorter, recognizable English forms over literal translation."""

    user = "Generate slugs for these:\n\n" + json.dumps(items, ensure_ascii=False, indent=2)

    print("→ Calling owl-alpha...")
    result = call_owl(api_key, system, user).strip()
    if result.startswith("```"):
        import re
        result = re.sub(r"^```(?:json)?\n?", "", result)
        result = re.sub(r"\n?```$", "", result)

    try:
        slugs = json.loads(result)
    except json.JSONDecodeError as e:
        print(f"❌ JSON parse fail: {e}")
        print(f"Raw: {result[:500]}")
        sys.exit(1)

    # Merge with existing slug-map if it exists
    out_path = Path(args.out)
    if out_path.exists():
        existing = json.loads(out_path.read_text())
        existing.update(slugs)
        slugs = existing

    out_path.write_text(json.dumps(slugs, ensure_ascii=False, indent=2))
    print(f"✅ {len(slugs)} slugs saved to {out_path}")
    for k, v in list(slugs.items())[:10]:
        print(f"   {k} → {v}")


if __name__ == "__main__":
    main()
