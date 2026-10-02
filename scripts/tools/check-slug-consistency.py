#!/usr/bin/env python3
"""check-slug-consistency.py — 翻譯檔名必須與 en sibling 一致（en slug = canonical）。

背景（2026-07-17）：巴別塔免費模型翻譯時自作主張取檔名，累積 41 篇 /
98 檔 slug 漂移，成為 hreflang / 語言切換器死鏈家族的土壤（歷史清償見
unify-translation-slugs.py）。本 gate 讓漂移在 commit 時就被擋下。

規則：knowledge/{registered non-en language}/{Cat}/{slug}.md 若其 translatedFrom 對應
的 en 版存在，basename 必須與 en 版相同。en 是 canonical，不受檢。

用法：
    python3 scripts/tools/check-slug-consistency.py --staged   # pre-commit
    python3 scripts/tools/check-slug-consistency.py --all      # 全站
    python3 scripts/tools/check-slug-consistency.py --files knowledge/de/Food/x.md ...
    python3 scripts/tools/check-slug-consistency.py --pr 1749  # 投稿 PR 的譯文檔，不 checkout
既有漂移的白名單（unify 時人工 review 保留的案例）在下方 ALLOWLIST。

2026-09-19 補兩把尺（maintainer-am 連續五輪手動對照 sibling 檔名，REFLEXES #15）：
  (1) `--pr N` / `--files`：審投稿 PR 時直接量 PR 裡的譯文檔（內容從 refs/twmd/prN 讀，
      不 checkout 投稿者的樹——MAINTAINER §診斷紀律）。en 不存在時退而比對其他語言
      的多數檔名（≥ 2 個 sibling 同名才算慣例）。
  (2) 同語言撞號：同一 lang 目錄裡另一個檔的 translatedFrom 跟被查檔相同但檔名不同
      （2026-09-14 LESSONS `same-language-slug-collision-is-invisible-to-both-instruments`
      ——兩把既有尺都只比 en，看不見同語言裡已經有另一份）。分岔期間另一棵樹上的
      副本本工具看不到，那是 OBSERVER-QUEUE #67 的事。
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
sys.path.insert(0, str(ROOT / "scripts" / "tools" / "lang-sync"))
from langs import ALL_TRANSLATION_LANGS  # noqa: E402

CHECK_LANGS = set(ALL_TRANSLATION_LANGS) - {"en"}
# --pr / --files 也量 en：en 不受「檔名對 en」檢查，但同語言撞號一樣要抓——
# 2026-09-19 量到 en 自己有 6 組同源雙檔（黃春明／鄧雨賢／台灣小吃／手路菜／taiwan-md／
# 氣候危機），其中兩組是 08-28 投稿 PR 在既有 en 檔旁邊再開一個，當時沒有任何尺看得見。
PR_LANGS = set(ALL_TRANSLATION_LANGS)

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


def _pr_files(pr: str):
    """投稿 PR 裡的譯文檔：(相對路徑, 內容) 清單。fetch 到 refs/twmd/prN，不 checkout。"""
    out = subprocess.run(["gh", "pr", "view", pr, "--json", "files", "-q", ".files[].path"],
                         cwd=ROOT, capture_output=True, text=True, encoding="utf-8",
                         check=True).stdout
    ref = f"refs/twmd/pr{pr}"
    subprocess.run(["git", "fetch", "-q", "origin", f"pull/{pr}/head:{ref}", "-f"],
                   cwd=ROOT, check=True)
    pairs = []
    for rel in out.splitlines():
        if not (rel.startswith("knowledge/") and rel.endswith(".md")):
            continue
        if rel.split("/")[1] not in PR_LANGS or Path(rel).name.startswith("_"):
            continue
        body = subprocess.run(["git", "show", f"{ref}:{rel}"], cwd=ROOT,
                              capture_output=True, text=True, encoding="utf-8").stdout
        pairs.append((Path(rel), body))
    return pairs


def _translated_from_text(text: str):
    m = re.search(r"^translatedFrom:\s*['\"]?([^'\"\n]+)", text[:2000], re.M)
    return m.group(1).strip() if m else None


def build_sibling_index():
    """zh path -> {lang: [basename, ...]}，含 en（撞號要看得見 en 自己的雙檔）。"""
    idx = defaultdict(lambda: defaultdict(list))
    for lang in PR_LANGS:
        for f in (ROOT / "knowledge" / lang).rglob("*.md"):
            if f.name.startswith("_"):
                continue
            src = translated_from(f)
            if src:
                idx[src][lang].append(f.name)
    return idx


def check_pairs(pairs, en_index, sib_index):
    """pairs: [(rel_path, translatedFrom)]。回傳 (bad_en, bad_majority, collisions)。"""
    bad, bad_maj, coll = [], [], []
    for rel, src in pairs:
        if not src or src in ALLOWLIST:
            continue
        lang = rel.parts[1]
        en_name = None if lang == "en" else en_index.get(src)
        if lang == "en":
            pass  # en 是 canonical，不對自己量檔名；下面只量撞號
        elif en_name:
            if rel.name != en_name:
                bad.append((rel, en_name, src))
        else:
            names = [n for l, ns in sib_index.get(src, {}).items() if l != lang for n in ns]
            if names:
                top, cnt = max(((n, names.count(n)) for n in set(names)), key=lambda t: t[1])
                if cnt >= 2 and rel.name != top:
                    bad_maj.append((rel, top, cnt, src))
        others = [n for n in sib_index.get(src, {}).get(lang, []) if n != rel.name]
        if others:
            coll.append((rel, others, src))
    return bad, bad_maj, coll


def main():
    staged = "--staged" in sys.argv
    argv = sys.argv[1:]
    if "--pr" in argv or "--files" in argv:
        if "--pr" in argv:
            pr = argv[argv.index("--pr") + 1]
            pairs = [(rel, _translated_from_text(body)) for rel, body in _pr_files(pr)]
            label = f"PR #{pr}"
        else:
            paths = [Path(a) for a in argv[argv.index("--files") + 1:] if not a.startswith("--")]
            pairs = [(p if not p.is_absolute() else p.relative_to(ROOT),
                      translated_from(ROOT / p if not p.is_absolute() else p)) for p in paths]
            label = f"{len(pairs)} 檔"
        if not pairs:
            print(f"✅ slug 一致性：{label} 沒有譯文檔可查")
            return 0
        bad, bad_maj, coll = check_pairs(pairs, build_en_index(), build_sibling_index())
        for rel, en_name, src in bad:
            print(f"❌ {rel}\n     → 應命名為 {en_name}（en canonical，同源 {src}）")
        for rel, top, cnt, src in bad_maj:
            print(f"❌ {rel}\n     → 其他 {cnt} 個語言都叫 {top}（en 不存在，取多數；同源 {src}）")
        for rel, others, src in coll:
            print(f"❌ {rel}\n     → 同語言目錄已有同源檔 {', '.join(others)}（同源 {src}）——撞號，二擇一")
        if bad or bad_maj or coll:
            return 1
        print(f"✅ slug 一致性：{label} 檔名與 sibling 一致、同語言無撞號")
        return 0
    if staged:
        # core.quotePath=false 必帶：CJK 檔名不加這個會被 git 轉義成帶引號的字串，
        # 下面的 startswith("knowledge/") 全 False → 靜默零掃描（同 article-health）
        out = subprocess.run(
            ["git", "-c", "core.quotePath=false",
             "diff", "--cached", "--name-only", "--diff-filter=ACR"],
            # quotePath=false 之後是 UTF-8 原始位元組，要明講，否則 Windows 走 cp950 解碼失敗
            cwd=ROOT, capture_output=True, text=True, encoding="utf-8").stdout
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
    if not staged:
        # en 同源雙檔會讓「en canonical」變成 rglob 順序決定的隨機值，先把它報出來
        en_dups = defaultdict(list)
        for f in (ROOT / "knowledge" / "en").rglob("*.md"):
            if not f.name.startswith("_"):
                src = translated_from(f)
                if src:
                    en_dups[src].append(f.name)
        en_dups = {k: v for k, v in en_dups.items() if len(v) > 1}
        if en_dups:
            print(f"⚠️ en 同源雙檔 {len(en_dups)} 組（canonical 檔名因此不唯一，底下的漂移清單先看這裡）：")
            for src, names in sorted(en_dups.items()):
                print(f"   {src} → {', '.join(sorted(names))}")
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
