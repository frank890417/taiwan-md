#!/usr/bin/env python3
"""
audit-quality.py — Stage Z6 自動掃描品質 audit

「fresh」是 metadata fresh，不是 content quality。status.py 看 frontmatter
元資料；本工具看實際內容品質：size ratio / frontmatter completeness /
YAML 合法性。

Usage:
  python3 scripts/tools/lang-sync/audit-quality.py --base-sha af2de883
  python3 scripts/tools/lang-sync/audit-quality.py --files knowledge/ja/People/foo.md
  python3 scripts/tools/lang-sync/audit-quality.py --base-sha HEAD~5 --purge

Output: report stdout + exit 0 if healthy ratio > 90%, else 1
"""
import argparse, json, os, re, subprocess, sys
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent.parent.parent

# Per-language expected size ratio range (trans / zh_source)
EXPECTED_RATIO = {
    "en": (0.7, 1.4),
    "ja": (0.8, 1.4),
    "ko": (0.5, 1.0),
    "es": (1.0, 1.8),
    "fr": (1.0, 1.8),
    "de": (1.0, 1.6),
    "vi": (0.9, 1.5),
}
SUSPICIOUS_THRESHOLD = 0.5  # size ratio < 0.5 → flag


def get_lang_from_path(p: str) -> str:
    """Extract lang code from knowledge/{lang}/Cat/file.md path."""
    parts = p.split("/")
    return parts[1] if len(parts) >= 3 and parts[0] == "knowledge" else ""


def find_zh_source(trans_path: str) -> str:
    """Read translatedFrom from frontmatter; return knowledge/{zh_path}."""
    full = REPO / trans_path
    if not full.exists():
        return ""
    content = full.read_text(encoding="utf-8", errors="replace")
    m = re.search(r"^translatedFrom:\s*['\"]?(.+?\.md)['\"]?\s*$", content, re.M)
    if not m:
        return ""
    return f"knowledge/{m.group(1).strip()}"


def has_frontmatter_field(content: str, key: str) -> bool:
    return bool(re.search(rf"^{key}:\s*\S", content, re.M))


def yaml_self_test(content: str) -> tuple[bool, str]:
    """Heuristic YAML check without `yaml` import (stdlib only)."""
    if not content.startswith("---"):
        return False, "no opening ---"
    end = content.find("\n---", 4)
    if end == -1:
        return False, "no closing ---"
    fm = content[4:end]
    # Heuristics for common bugs:
    # 1. Single-quoted string with bare apostrophe inside (description: '...it's...')
    for line in fm.split("\n"):
        if not line.startswith(("title:", "description:")):
            continue
        # Find single-quoted value
        m = re.match(r"^[a-z]+:\s*'(.+)'\s*$", line)
        if m:
            inner = m.group(1)
            # Check for unescaped single quote inside
            if "'" in inner:
                return False, f"unescaped apostrophe in single-quoted: {line[:80]}"
    # 2. Duplicate top-level keys
    keys = []
    for line in fm.split("\n"):
        m = re.match(r"^([a-zA-Z_][a-zA-Z0-9_]*):", line)
        if m:
            keys.append(m.group(1))
    seen = set()
    for k in keys:
        if k in seen:
            return False, f"duplicate key: {k}"
        seen.add(k)
    return True, ""


def audit_file(trans_path: str) -> dict:
    """Audit single file. Returns dict with checks."""
    full = REPO / trans_path
    result = {
        "path": trans_path,
        "size": 0,
        "zh_size": 0,
        "ratio": 0.0,
        "has_title": False,
        "has_description": False,
        "has_category": False,
        "yaml_ok": False,
        "yaml_error": "",
        "issues": [],
    }
    if not full.exists():
        result["issues"].append("file not found")
        return result
    content = full.read_text(encoding="utf-8", errors="replace")
    result["size"] = len(content.encode("utf-8"))

    zh_path = find_zh_source(trans_path)
    if zh_path:
        zh_full = REPO / zh_path
        if zh_full.exists():
            result["zh_size"] = zh_full.stat().st_size
            if result["zh_size"] > 0:
                result["ratio"] = result["size"] / result["zh_size"]
        else:
            result["issues"].append(f"zh source not found: {zh_path}")

    result["has_title"] = has_frontmatter_field(content, "title")
    result["has_description"] = has_frontmatter_field(content, "description")
    result["has_category"] = has_frontmatter_field(content, "category")

    yaml_ok, yaml_err = yaml_self_test(content)
    result["yaml_ok"] = yaml_ok
    result["yaml_error"] = yaml_err

    # Aggregate issues
    if result["zh_size"] == 0:
        result["issues"].append("zh source empty (0 bytes)")
    elif result["ratio"] < SUSPICIOUS_THRESHOLD:
        result["issues"].append(f"size ratio {result['ratio']:.2f} < {SUSPICIOUS_THRESHOLD} (truncated?)")
    if not result["has_title"]:
        result["issues"].append("missing title")
    if not result["has_description"]:
        result["issues"].append("missing description")
    if not result["has_category"]:
        result["issues"].append("missing category")
    if not yaml_ok:
        result["issues"].append(f"yaml: {yaml_err}")

    return result


def get_files_since(base_sha: str) -> list[str]:
    """Files added since base_sha."""
    out = subprocess.check_output(
        ["git", "log", "--name-status", "--pretty=format:", f"{base_sha}..HEAD", "--diff-filter=A"],
        cwd=REPO,
    ).decode()
    files = []
    for line in out.splitlines():
        parts = line.strip().split("\t")
        if (
            len(parts) == 2
            and parts[0] == "A"
            and parts[1].startswith("knowledge/")
            and parts[1].endswith(".md")
            and not parts[1].endswith("_translation-status.json")
        ):
            lang = get_lang_from_path(parts[1])
            if lang in EXPECTED_RATIO:  # only translation langs
                files.append(parts[1])
    return files


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--base-sha", help="audit files added since this SHA")
    ap.add_argument("--files", nargs="*", help="audit specific files")
    ap.add_argument("--purge", action="store_true", help="rm files with critical issues (size ratio<0.5 OR yaml-fail)")
    ap.add_argument("--lang", help="filter to one lang")
    args = ap.parse_args()

    if args.files:
        files = args.files
    elif args.base_sha:
        files = get_files_since(args.base_sha)
    else:
        ap.error("--base-sha or --files required")

    if args.lang:
        files = [f for f in files if f"knowledge/{args.lang}/" in f]

    # Filter to currently-existing files only (git log shows files added even
    # if later deleted; we only audit live files)
    before = len(files)
    files = [f for f in files if (REPO / f).exists()]
    if before != len(files):
        print(f"  (filtered out {before - len(files)} deleted files)")

    print(f"📋 Auditing {len(files)} files\n")

    results = [audit_file(f) for f in files]
    healthy = [r for r in results if not r["issues"]]
    suspicious = [r for r in results if r["issues"]]

    # Critical issues that warrant purge
    critical = [r for r in suspicious if any(
        "size ratio" in i or "zh source empty" in i or "yaml:" in i
        for i in r["issues"]
    )]

    print(f"✅ healthy: {len(healthy)}")
    print(f"⚠️  suspicious: {len(suspicious)}")
    print(f"🔴 critical (purge candidates): {len(critical)}")
    print()

    if suspicious:
        print("=== Issues ===")
        for r in sorted(suspicious, key=lambda x: x["ratio"]):
            issues_str = " / ".join(r["issues"])
            print(f"  ratio={r['ratio']:.2f} size={r['size']:>6} zh={r['zh_size']:>6} {r['path']}")
            print(f"    └─ {issues_str}")
        print()

    healthy_pct = len(healthy) / len(results) * 100 if results else 0
    print(f"=== Healthy ratio: {len(healthy)}/{len(results)} = {healthy_pct:.1f}% ===")
    print(f"=== Action recommendation: ", end="")
    if healthy_pct >= 90:
        print("ship ===")
    elif healthy_pct >= 70:
        print("retry round (purge critical, dispatch new model) ===")
    else:
        print("STOP — investigate root cause ===")

    if args.purge and critical:
        print(f"\n🧹 Purging {len(critical)} critical files...")
        for r in critical:
            full = REPO / r["path"]
            if full.exists():
                full.unlink()
                print(f"  rm {r['path']}")

    sys.exit(0 if healthy_pct >= 90 else 1)


if __name__ == "__main__":
    main()
