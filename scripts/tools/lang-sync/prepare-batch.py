#!/usr/bin/env python3
"""
prepare-batch.py — Stage P1 預處理（per TRANSLATION-PIPELINE v3.3 §平行 sub-agent 批次翻譯 SOP）

對 N 篇 zh 文章一次性產出 batch manifest + N 個 group files：
1. Determine slug + en_path for each article (stale: existing / missing: needs slug input)
2. Compute frontmatter placeholder (translatedFrom + zh_head_sha + zh_content_hash + now)
3. Compute wikilink target map (scan zh source [[X]], lookup _translations.json)
4. Snake-balance into N groups by zh source size
5. Output `_batch-manifest.json` + `_group-{A..}.json`

Usage:
    # Auto-fetch top N stale/missing for {lang}
    python3 scripts/tools/lang-sync/prepare-batch.py --lang en --top 50 --groups 5

    # Use a custom article list (one zh path per line)
    python3 scripts/tools/lang-sync/prepare-batch.py --lang en --input <file> --groups 5

    # Provide slugs via JSON map (required for missing translations)
    python3 scripts/tools/lang-sync/prepare-batch.py --lang en --top 50 --groups 5 --slug-map slugs.json

If a slug is missing for a `missing`-status article, falls back to a romanization placeholder
that the agent should reject and report back. Best practice: pass --slug-map.

Output: .lang-sync-tasks/{lang}/_batch-manifest.json + _group-{A..N}.json
"""
import argparse, json, hashlib, re, subprocess, sys
from pathlib import Path
from datetime import datetime, timezone, timedelta

REPO = Path(__file__).resolve().parent.parent.parent.parent
KNOWLEDGE = REPO / "knowledge"
TASKS = REPO / ".lang-sync-tasks"


def get_zh_meta(zh_path):
    """Get zh HEAD sha + body content hash."""
    full = KNOWLEDGE / zh_path
    sha = subprocess.check_output(
        ["git", "log", "-1", "--format=%h", "--", f"knowledge/{zh_path}"],
        cwd=REPO,
    ).decode().strip()
    content = full.read_text()
    if content.startswith("---"):
        e = content.find("---", 3)
        body = content[e + 3:] if e != -1 else content
    else:
        body = content
    h = "sha256:" + hashlib.sha256(body.encode()).hexdigest()[:16]
    return sha, h


def extract_wikilinks(zh_path):
    full = KNOWLEDGE / zh_path
    text = full.read_text()
    if text.startswith("---"):
        e = text.find("---", 3)
        text = text[e + 3:] if e != -1 else text
    return list(set(re.findall(r"\[\[([^\]]+)\]\]", text)))


def lookup_wikilink_target(target_zh, en_translations_idx):
    """Find en path for a zh wikilink target. Returns en path with leading slash, or None."""
    target = target_zh.split("|")[0].strip()
    candidates = [
        target + ".md",
        f"People/{target}.md",
        f"Society/{target}.md",
        f"History/{target}.md",
        f"Culture/{target}.md",
        f"Music/{target}.md",
        f"Nature/{target}.md",
        f"Technology/{target}.md",
        f"Food/{target}.md",
        f"Art/{target}.md",
        f"Lifestyle/{target}.md",
        f"Geography/{target}.md",
        f"Economy/{target}.md",
    ]
    for c in candidates:
        en = en_translations_idx.get(c)
        if en:
            return "/" + en.replace(".md", "/")
    return None


def get_top_stale_missing(lang, top, skip_paths=None):
    """Auto-fetch top N stale+missing articles by zh.lastModified desc."""
    skip = set(skip_paths or [])
    data = json.load(open(KNOWLEDGE / "_translation-status.json"))
    arts = data["byArticle"]
    candidates = []
    for path, info in arts.items():
        if path in skip:
            continue
        translation = info.get("translations", {}).get(lang, {})
        if translation.get("status") in ("stale", "missing"):
            candidates.append({
                "zh_path": path,
                "zh_modified": info["zh"]["lastModified"],
                "status": translation["status"],
                "en_path_existing": translation.get("path", ""),
            })
    candidates.sort(key=lambda x: x["zh_modified"], reverse=True)
    return candidates[:top]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--lang", default="en")
    ap.add_argument("--top", type=int, help="Auto-fetch top N stale/missing")
    ap.add_argument("--input", help="Path to file with one zh_path per line")
    ap.add_argument("--groups", type=int, default=5)
    ap.add_argument("--slug-map", help="JSON file with {zh_path: slug} for missing translations")
    ap.add_argument("--batch-id", default=None)
    ap.add_argument("--skip", help="Comma-separated zh_paths to skip (already-attempted in prior batch)")
    args = ap.parse_args()

    skip_paths = args.skip.split(",") if args.skip else []

    # Step 1: get article list
    if args.input:
        zh_paths = [line.strip() for line in open(args.input) if line.strip()]
        # need to look up status for each
        data = json.load(open(KNOWLEDGE / "_translation-status.json"))
        arts = data["byArticle"]
        candidates = []
        for p in zh_paths:
            if p not in arts:
                print(f"⚠️ Skipping unknown {p}", file=sys.stderr)
                continue
            t = arts[p].get("translations", {}).get(args.lang, {})
            candidates.append({
                "zh_path": p,
                "zh_modified": arts[p]["zh"]["lastModified"],
                "status": t.get("status", "missing"),
                "en_path_existing": t.get("path", ""),
            })
    elif args.top:
        candidates = get_top_stale_missing(args.lang, args.top, skip_paths)
    else:
        print("❌ Must specify --top or --input", file=sys.stderr)
        sys.exit(1)

    # Step 2: load slug map if provided
    slug_map = json.load(open(args.slug_map)) if args.slug_map else {}

    # Step 3: build en translations index for wikilink lookup
    trans_data = json.load(open(KNOWLEDGE / "_translations.json"))
    zh_to_en = {}
    for en_p, zh_p in trans_data.items():
        if en_p.startswith(f"{args.lang}/"):
            if zh_p not in zh_to_en:
                zh_to_en[zh_p] = en_p

    # Step 4: build manifest entries
    now_taipei = datetime.now(timezone(timedelta(hours=8))).strftime(
        "%Y-%m-%dT%H:%M:%S+08:00"
    )
    batch_id = args.batch_id or datetime.now(timezone(timedelta(hours=8))).strftime("%Y-%m-%d-%H%M")

    manifest_articles = []
    missing_slugs = []
    for entry in candidates:
        zh_path = entry["zh_path"]
        status = entry["status"]
        category = zh_path.split("/")[0]

        if status == "stale" and entry["en_path_existing"]:
            en_path = "knowledge/" + entry["en_path_existing"]
            slug = Path(en_path).stem
        else:
            slug = slug_map.get(zh_path)
            if not slug:
                # fallback: use zh title minus .md, romanized poorly
                fallback = Path(zh_path).stem.lower().replace(" ", "-")
                # strip non-ascii to mark as "needs review"
                ascii_fallback = "".join(c for c in fallback if c.isascii() and (c.isalnum() or c == "-"))
                slug = ascii_fallback or "TBD-NEEDS-SLUG"
                missing_slugs.append((zh_path, slug))
            en_path = f"knowledge/{args.lang}/{category}/{slug}.md"

        sha, content_hash = get_zh_meta(zh_path)

        wikilinks = extract_wikilinks(zh_path)
        target_map = {}
        for wl in wikilinks:
            wl_clean = wl.split("|")[0].strip()
            target = lookup_wikilink_target(wl, zh_to_en)
            target_map[wl_clean] = target if target else "(zh only — convert to plain text + Chinese parenthesis)"

        manifest_articles.append({
            "zh_path": zh_path,
            "status": status,
            "en_path": en_path,
            "slug": slug,
            "zh_head_sha": sha,
            "zh_content_hash": content_hash,
            "_zh_size": (KNOWLEDGE / zh_path).stat().st_size,
            "wikilink_targets": target_map,
            "frontmatter_placeholder": {
                "translatedFrom": zh_path,
                "sourceCommitSha": sha,
                "sourceContentHash": content_hash,
                "translatedAt": now_taipei,
            },
        })

    # Step 5: snake-balance into groups by size
    manifest_articles.sort(key=lambda x: x["_zh_size"], reverse=True)
    groups = [[] for _ in range(args.groups)]
    for i, a in enumerate(manifest_articles):
        cycle = i // args.groups
        pos = i % args.groups
        idx = pos if cycle % 2 == 0 else (args.groups - 1 - pos)
        groups[idx].append(a)

    # Strip _zh_size before saving
    for a in manifest_articles:
        a.pop("_zh_size", None)

    # Step 6: write outputs
    out_dir = TASKS / args.lang
    out_dir.mkdir(parents=True, exist_ok=True)

    manifest = {
        "lang": args.lang,
        "batch_id": batch_id,
        "generated_at": now_taipei,
        "total_articles": len(manifest_articles),
        "groups": args.groups,
        "model_recommendation": "sonnet",
        "articles": manifest_articles,
    }
    with open(out_dir / "_batch-manifest.json", "w") as f:
        json.dump(manifest, f, ensure_ascii=False, indent=2)

    for i, g in enumerate(groups):
        letter = chr(65 + i)
        with open(out_dir / f"_group-{letter}.json", "w") as f:
            json.dump({"agent": letter, "articles": g}, f, ensure_ascii=False, indent=2)

    # Stats
    print(f"✅ Manifest: {out_dir}/_batch-manifest.json")
    print(f"   Total: {len(manifest_articles)} articles")
    print(f"   Stale: {sum(1 for a in manifest_articles if a['status'] == 'stale')}")
    print(f"   Missing: {sum(1 for a in manifest_articles if a['status'] == 'missing')}")
    total_targets = sum(len(a["wikilink_targets"]) for a in manifest_articles)
    resolved = sum(
        1 for a in manifest_articles
        for t in a["wikilink_targets"].values()
        if not t.startswith("(zh only")
    )
    print(f"   Wikilink targets: {resolved}/{total_targets} resolved to {args.lang} paths")

    print(f"\n✅ {args.groups} group files: _group-{{A..{chr(64+args.groups)}}}.json")
    for i, g in enumerate(groups):
        sizes = [(KNOWLEDGE / a["zh_path"]).stat().st_size for a in g]
        print(f"   Group {chr(65+i)}: {len(g)} articles, total {sum(sizes):,} bytes")

    if missing_slugs:
        print(f"\n⚠️ {len(missing_slugs)} articles missing slug (used ASCII fallback):")
        for zh, slug in missing_slugs[:10]:
            print(f"   {zh} → {slug}")
        print(f"\n   Recommend: provide --slug-map with proper romanizations.")
        sys.exit(2)


if __name__ == "__main__":
    main()
