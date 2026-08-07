#!/usr/bin/env python3
"""check-slug-consistency.py — 翻譯檔名必須與 en sibling 一致（en slug = canonical）。

背景（2026-07-17）：巴別塔免費模型翻譯時自作主張取檔名，累積 41 篇 /
98 檔 slug 漂移，成為 hreflang / 語言切換器死鏈家族的土壤（歷史清償見
unify-translation-slugs.py）。本 gate 讓漂移在 commit 時就被擋下。

規則：knowledge/{ja,ko,es,fr}/{Cat}/{slug}.md 若其 translatedFrom 對應
的 en 版存在，basename 必須與 en 版相同。en 是 canonical，不受檢。

用法：
    python3 scripts/tools/check-slug-consistency.py --staged   # pre-commit
    python3 scripts/tools/check-slug-consistency.py --all      # 全站
既有漂移的白名單（unify 時人工 review 保留的案例）在下方 ALLOWLIST。
"""
import json
import re
import subprocess
import sys
from collections import defaultdict
from pathlib import Path

# Windows cp950 console 強制 UTF-8（不影響 Linux/macOS）
if sys.stdout.encoding and sys.stdout.encoding.lower() not in ("utf-8", "utf8"):
    sys.stdout.reconfigure(encoding="utf-8")
    sys.stderr.reconfigure(encoding="utf-8")

ROOT = Path(__file__).resolve().parents[2]
CHECK_LANGS = {"ja", "ko", "es", "fr"}

# unify-translation-slugs.py 2026-07-17 review 保留的歷史漂移（zh path）。
# 清償一案就從這裡刪一行；新檔案不得加入。
ALLOWLIST = set()  # 2026-07-17 晚間 7 案全數清償，歸零


def translated_from(path: Path):
    try:
        head = path.read_text(encoding="utf-8", errors="replace")[:2000]
    except OSError:
        return None
    m = re.search(r"^translatedFrom:\s*['\"]?([^'\"\n]+)", head, re.M)
    return m.group(1).strip() if m else None


def build_en_index():
    """zh path -> en basename，從 en 檔的 frontmatter 建。"""
    idx = {}
    en_root = ROOT / "knowledge" / "en"
    for f in en_root.rglob("*.md"):
        if f.name.startswith("_"):
            continue
        src = translated_from(f)
        if src:
            idx[src] = f.name
    return idx


def main():
    staged = "--staged" in sys.argv
    if staged:
        out = subprocess.run(
            ["git", "diff", "--cached", "--name-only", "--diff-filter=ACR"],
            cwd=ROOT, capture_output=True, text=True).stdout
        files = [ROOT / p for p in out.splitlines()
                 if p.startswith("knowledge/")
                 and p.split("/")[1] in CHECK_LANGS
                 and p.endswith(".md")
                 and not Path(p).name.startswith("_")]
        if not files:
            return 0
    else:
        files = [f for lang in CHECK_LANGS
                 for f in (ROOT / "knowledge" / lang).rglob("*.md")
                 if not f.name.startswith("_")]

    en_index = build_en_index()
    bad = []
    for f in files:
        src = translated_from(f)
        if not src or src in ALLOWLIST:
            continue
        en_name = en_index.get(src)
        if en_name and f.name != en_name:
            bad.append((f.relative_to(ROOT), en_name, src))

    if bad:
        print("❌ slug 一致性：翻譯檔名必須與 en 版相同（en slug = canonical）")
        for p, en_name, src in bad[:20]:
            print(f"   {p}")
            print(f"     → 應命名為 {en_name}（同源 {src}）")
        print("   改名請用 git mv 並在 config/redirects-manual.txt 補舊 URL 301。")
        print("   背景：2026-07-17 slug 統一清償，見 unify-translation-slugs.py 檔頭。")
        return 1
    if not staged:
        print(f"✅ slug 一致性：{len(files)} 檔全部與 en 對齊（白名單 {len(ALLOWLIST)} 案除外）")
    return 0


if __name__ == "__main__":
    sys.exit(main())
