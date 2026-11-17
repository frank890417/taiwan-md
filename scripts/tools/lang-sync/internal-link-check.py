#!/usr/bin/env python3
"""internal-link-check.py — 檢查譯文裡的站內連結會不會 404。

為什麼要這支：2026-09-09 委派層一隻 agent「好心」把能用的中文路徑
`/culture/台灣宗教與寺廟文化` 換成它自己編的英文 slug
`/culture/taiwan-religion-temples-culture`——站上沒有那個頁面，而原本那條是通的。
七道閘沒有一道在看內部連結指向哪裡：`verify-translation` 比的是 URL multiset（換掉
一個換成另一個，數量不變就過），`article-health` 管的是圖片與外部引用，
`cross_link_localizer` 只認得中文 slug 與已知譯文，看到沒見過的拉丁 slug 就判
no-translation 保守跳過——**沒有東西會說「這條連結是死的」**。

全庫掃描的結果：785 條硬 404（排除圖片資產後），vi 465／es 80／ko 67／en 59。
失效形態：543 條是編出來的拉丁 slug、155 條用底線或大寫（站上一律小寫連字號）、
53 條諺文、22 條天城文、8 條百分號編碼中文、4 條阿拉伯文——全是把「slug」
當成「可以翻譯的文字」的結果。slug 是網址不是文案。

**權威來源是 `knowledge/` 不是 `dist/`**。第一版拿 dist 當尺，量出 785 條死連結，
接著發現本機 dist 是四天前 build 的——四天內新增的文章全部會被誤判成 404。尺比被量的
東西舊，量出來的差異有一部分是尺自己的年紀（今天第二次撞見自己的尺壞掉，前一次是
BSD find 沒有 -newermt）。`knowledge/` 是 SSOT 且永遠跟 HEAD 同步，改用它。

判準（保守，只報有把握的）：
  1. 只看 `[文字](/path)` 形式、不含 http 的站內連結
  2. 圖片與靜態資產路徑（/images/ /article-images/ /assets/ …）另有工具管，跳過
  3. `/lang/分類/slug` → `knowledge/<lang>/<分類>/<slug>.md` 在不在（分類段不分大小寫）
  4. `/分類/中文名` → `knowledge/<分類>/<中文名>.md` 在不在
  5. 判不出來的一律不報（寧可漏報也不誤報，同 cross_link_localizer 的紀律）

用法：
  python3 scripts/tools/lang-sync/internal-link-check.py <檔案...>
  python3 scripts/tools/lang-sync/internal-link-check.py --lang vi     # 掃整個語言
  python3 scripts/tools/lang-sync/internal-link-check.py --all --json
exit 1 = 有死連結。
"""
import argparse
import json
import re
import sys
import urllib.parse
from pathlib import Path

REPO = Path(__file__).resolve().parents[3]
KNOWLEDGE = REPO / "knowledge"
DIST = REPO / "dist"
sys.path.insert(0, str(Path(__file__).resolve().parent))
from langs import ALL_TRANSLATION_LANGS  # noqa: E402

LANGS = set(ALL_TRANSLATION_LANGS)
LINK = re.compile(r"\]\((/[^)\s]+)\)")
ASSET = re.compile(r"^/(images|article-images|assets|og-images|_astro|api|fonts)/")
# 站上不是文章的路由（src/pages/ 下的靜態頁與非 [category] 動態路由）。第一版沒有
# 這份清單，於是把 /semiont/manifesto、/elections/2026/、/terminology/xxx 這些真的
# 存在的頁面全報成死連結——閘門誤報比漏報更貴，因為它會訓練人忽略它。
NON_ARTICLE_ROOTS = {
    "about", "assets", "bench", "budget", "changelog", "companies", "contribute",
    "dashboard", "data", "elections", "embed", "explore", "feedback-uxtest", "fork-graph",
    "graph", "health", "housing", "income", "industry", "latest", "lifetree", "map", "mcp",
    "names", "opendata", "projects", "resources",
    "search", "semiont", "soundscape", "taiwan-shape", "terminology", "timeline",
    "tools", "topics",
}


def _index() -> tuple[dict, dict]:
    """(語言 → {slug 小寫: 路徑}, 中文檔名 → 路徑)。從 knowledge/ 直接建，跟 HEAD 同步。"""
    per_lang: dict[str, set] = {}
    zh: set = set()
    for f in KNOWLEDGE.rglob("*.md"):
        rel = f.relative_to(KNOWLEDGE)
        parts = rel.parts
        if len(parts) < 2 or parts[0].startswith("_"):
            continue
        if parts[0] in LANGS:
            per_lang.setdefault(parts[0], set()).add((parts[1].lower(), f.stem.lower()))
        else:
            zh.add((parts[0].lower(), f.stem))
    return per_lang, zh


def _zh_source(f: Path) -> Path | None:
    """從譯文的 translatedFrom 找 zh 來源（比從檔名反推可靠，slug 跟中文檔名本來就不對應）。"""
    try:
        head = f.read_text(encoding="utf-8", errors="ignore")[:4000]
    except OSError:
        return None
    m = re.search(r"^translatedFrom:\s*['\"]?([^'\"\n]+)", head, re.M)
    return KNOWLEDGE / m.group(1).strip() if m else None


def check_file(f: Path, idx) -> list[tuple[str, str]]:
    per_lang, zh = idx
    dead = []
    text = f.read_text(encoding="utf-8", errors="ignore")
    for m in LINK.finditer(text):
        url = m.group(1).split("#")[0].split("?")[0]
        if ASSET.match(url):
            continue
        seg = [urllib.parse.unquote(s) for s in url.strip("/").split("/") if s]
        if len(seg) < 2:
            continue
        root = seg[1].lower() if seg[0] in LANGS else seg[0].lower()
        if root in NON_ARTICLE_ROOTS:
            continue  # 不是文章路由，不歸這支管
        if seg[0] in LANGS:
            lang, cat, slug = seg[0], seg[1].lower(), seg[-1].lower()
            # 大小寫要單獨報。站上分類目錄一律小寫，`/en/People/x/` 在 case-sensitive
            # 主機（Cloudflare Pages）上是 404——而本機 macOS 檔案系統不分大小寫，
            # 開發機上永遠看不出來。我這支第一版把路徑 .lower() 之後才比對，等於自己
            # 把這個病遮起來了（2026-09-09 修 7 條時發現）。
            if seg[1] != seg[1].lower():
                dead.append((url, f"分類段有大寫（{seg[1]}）——case-sensitive 主機上是 404，"
                                  f"應為 {seg[1].lower()}"))
                continue
            if (cat, slug) not in per_lang.get(lang, set()):
                dead.append((url, f"knowledge/{lang}/ 沒有 {cat}/{slug}.md"))
        else:
            cat, name = seg[0].lower(), seg[-1]
            if (cat, name) not in zh:
                dead.append((url, f"knowledge/ 沒有 {seg[0]}/{name}.md"))
    return dead


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("files", nargs="*")
    ap.add_argument("--lang")
    ap.add_argument("--all", action="store_true")
    ap.add_argument("--json", action="store_true")
    ap.add_argument("--vs-source", action="store_true",
                    help="只報譯者製造的死連結：拿譯文的死連結扣掉 zh 來源自己就有的那些。"
                         "沒有這個開關時，一條 zh 原文自己就連錯的連結會讓每一個語言版本都紅燈，"
                         "而那不是譯者的錯、也不是重譯能修的——那是來源端的維護工作。"
                         "閘門要擋的是這一輪新造出來的破壞。")
    a = ap.parse_args()

    targets: list[Path] = [Path(x) for x in a.files]
    if a.lang:
        targets += sorted((KNOWLEDGE / a.lang).rglob("*.md"))
    if a.all:
        for l in sorted(LANGS):
            d = KNOWLEDGE / l
            if d.exists():
                targets += sorted(d.rglob("*.md"))
    if not targets:
        ap.error("要給檔案，或 --lang / --all")

    idx = _index()

    out, total = {}, 0
    for f in targets:
        if not f.exists():
            print(f"❌ 不存在：{f}", file=sys.stderr)
            return 2
        d = check_file(f, idx)
        if d and a.vs_source:
            src = _zh_source(f)
            if src and src.exists():
                inherited = {u for u, _ in check_file(src, idx)}
                d = [(u, w) for u, w in d if u not in inherited]
        if d:
            try:
                key = str(f.relative_to(REPO))
            except ValueError:
                key = str(f)  # 倉庫外的檔案（校準用的臨時樣本）也要能驗
            out[key] = d
            total += len(d)

    if a.json:
        print(json.dumps({"files": len(targets), "dead": total, "detail": out},
                         ensure_ascii=False, indent=2))
        return 1 if total else 0

    for fn, rows in out.items():
        print(f"❌ {fn}")
        for url, why in rows:
            print(f"      {url}  — {why}")
    if total:
        print(f"\n════ {len(targets)} 檔，{total} 條死連結 ════")
        print("slug 是網址不是文案：不要把它翻譯，也不要自己編。查目標語言有沒有那篇譯文——")
        print("有就用它真正的 slug，沒有就保留中文原路徑（至少讀得到中文版，好過 404）。")
        return 1
    print(f"✅ {len(targets)} 檔，站內連結全部指得到")
    return 0


if __name__ == "__main__":
    sys.exit(main())
