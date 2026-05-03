#!/usr/bin/env python3
"""
backfill-source-body-hash.py — One-time backfill `sourceBodyHash` 進現有 translation frontmatter.

對每篇翻譯：
  1. 讀 frontmatter 的 sourceCommitSha
  2. 用 `git show <sha>:knowledge/<zh_path>` 取那 commit 時的 zh content
  3. 計算 body_hash_pure（同 status.py 的 stripped 版本）
  4. 寫回 translation frontmatter 加 `sourceBodyHash: <hash>`

若 src_sha vanished（rebase/squash）→ 跳過，留給 status.py 用 sha-lost-body-match 判定。

DNA #38 第 2 次 instantiation — 拆 stale 為 body-drift / metadata-stale 兩態。

Usage:
  python3 backfill-source-body-hash.py --dry-run                  # 看會改幾篇
  python3 backfill-source-body-hash.py --apply                    # 寫入
  python3 backfill-source-body-hash.py --apply --lang en          # 限定單一 lang
  python3 backfill-source-body-hash.py --apply --only-stale       # 只處理目前 stale 的
"""
import argparse
import hashlib
import re
import subprocess
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent.parent.parent
KNOWLEDGE = REPO / "knowledge"
LANGS = ["en", "ja", "ko", "es", "fr"]

_TRAILER_PATTERNS = [
    r"\n#{1,4}\s*延伸閱讀\s*\n.*?(?=\n#{1,4}\s|\Z)",
    r"\n#{1,4}\s*參考(?:資料|來源)?\s*\n.*?(?=\n#{1,4}\s|\Z)",
    r"\n#{1,4}\s*(?:同分類更多文章|相關閱讀|延伸資源|See also)\s*\n.*?(?=\n#{1,4}\s|\Z)",
    r"\n_v\d+\.\d+[^\n]*$",
]


def _strip_frontmatter(content: str) -> str:
    if content.startswith("---"):
        end = content.find("---", 3)
        if end != -1:
            return content[end + 3:]
    return content


def body_hash_pure(content: str) -> str:
    body = _strip_frontmatter(content)
    for pattern in _TRAILER_PATTERNS:
        body = re.sub(pattern, "", body, flags=re.DOTALL | re.MULTILINE)
    body = re.sub(r"\n\[\^[\w-]+\]:\s.+?(?=\n\[\^|\n#|\Z)", "\n", body, flags=re.DOTALL)
    body = re.sub(r"\n{3,}", "\n\n", body).strip()
    return "sha256:" + hashlib.sha256(body.encode("utf-8")).hexdigest()[:16]


def parse_frontmatter(content: str) -> dict:
    """Minimal YAML-ish frontmatter parser (key: value, single-line only)."""
    if not content.startswith("---"):
        return {}
    end = content.find("---", 3)
    if end == -1:
        return {}
    fm_text = content[3:end].strip()
    out: dict[str, str] = {}
    for line in fm_text.split("\n"):
        line = line.rstrip()
        if not line or line.startswith("#"):
            continue
        m = re.match(r"^([\w-]+):\s*(.+?)\s*$", line)
        if m:
            key, val = m.groups()
            val = val.strip().strip("'").strip('"')
            out[key] = val
    return out


def get_zh_at_commit(zh_rel: str, sha: str) -> str | None:
    """git show <sha>:knowledge/<zh_rel> → content or None if vanished."""
    try:
        out = subprocess.run(
            ["git", "show", f"{sha}:knowledge/{zh_rel}"],
            cwd=REPO, capture_output=True, text=True, timeout=10,
        )
        if out.returncode != 0:
            return None
        return out.stdout
    except Exception:
        return None


def backfill_one(trans_md: Path, apply: bool) -> dict:
    """Returns {status, lang, path, reason} where status ∈ {written, skipped, vanished, no-src-sha, already-has}."""
    content = trans_md.read_text(encoding="utf-8")
    fm = parse_frontmatter(content)
    src_sha = fm.get("sourceCommitSha", "")
    if not src_sha:
        return {"status": "no-src-sha", "path": str(trans_md.relative_to(REPO))}
    if src_sha == "pre-toolkit":
        return {"status": "pre-toolkit", "path": str(trans_md.relative_to(REPO))}
    if "sourceBodyHash" in fm:
        return {"status": "already-has", "path": str(trans_md.relative_to(REPO))}
    tf = fm.get("translatedFrom", "").replace("knowledge/", "")
    if not tf:
        return {"status": "no-translated-from", "path": str(trans_md.relative_to(REPO))}

    zh_at_src = get_zh_at_commit(tf, src_sha)
    if zh_at_src is None:
        return {"status": "vanished", "path": str(trans_md.relative_to(REPO))}

    body_hash = body_hash_pure(zh_at_src)
    if not apply:
        return {"status": "would-write", "path": str(trans_md.relative_to(REPO)), "bodyHash": body_hash}

    # Write back: insert `sourceBodyHash: <hash>` after sourceContentHash if present, else after sourceCommitSha
    lines = content.split("\n")
    out_lines = []
    inserted = False
    in_fm = False
    fm_count = 0
    for line in lines:
        if line.strip() == "---":
            fm_count += 1
            in_fm = (fm_count == 1)
            out_lines.append(line)
            if fm_count == 2 and not inserted:
                # Closing frontmatter — inject before
                out_lines.insert(-1, f"sourceBodyHash: '{body_hash}'")
                inserted = True
            continue
        out_lines.append(line)
        if in_fm and not inserted:
            if line.startswith("sourceContentHash:"):
                out_lines.append(f"sourceBodyHash: '{body_hash}'")
                inserted = True
    trans_md.write_text("\n".join(out_lines), encoding="utf-8")
    return {"status": "written", "path": str(trans_md.relative_to(REPO)), "bodyHash": body_hash}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--apply", action="store_true", help="actually write")
    ap.add_argument("--lang", default=None, help="limit to single lang (en/ja/ko/es/fr)")
    ap.add_argument("--only-stale", action="store_true", help="only process current stale (TODO: status integration)")
    ap.add_argument("--quiet", action="store_true")
    args = ap.parse_args()

    langs = [args.lang] if args.lang else LANGS
    counts = {"written": 0, "would-write": 0, "skipped": 0, "vanished": 0, "no-src-sha": 0, "pre-toolkit": 0, "already-has": 0, "no-translated-from": 0}

    for lang in langs:
        lang_dir = KNOWLEDGE / lang
        if not lang_dir.exists():
            continue
        for md in lang_dir.rglob("*.md"):
            if md.name.startswith("_"):
                continue
            res = backfill_one(md, apply=args.apply)
            counts[res["status"]] = counts.get(res["status"], 0) + 1
            if not args.quiet and res["status"] in ("written", "would-write", "vanished"):
                print(f"  [{res['status']}] {res['path']}")

    print()
    mode = "APPLY" if args.apply else "DRY-RUN"
    print(f"📊 backfill-source-body-hash [{mode}]")
    for k, v in counts.items():
        if v:
            print(f"  {k}: {v}")


if __name__ == "__main__":
    main()
