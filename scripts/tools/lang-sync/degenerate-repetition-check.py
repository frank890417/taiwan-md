#!/usr/bin/env python3
"""
degenerate-repetition-check.py — 抓模型退化成「同一個詞連印 N 次」的輸出。

誕生：2026-11-22 twmd-maintainer-daily。讀者 Jasi Duy Nguyễn 在站上回報
〈TASA 台灣太空中心〉越南文版開頭的摘要「重複 tên 約 60 次」（issue #2055，
實測 49 次）。那一行是 description，會原樣印在搜尋結果裡，所以讀者看到的
Taiwan.md 門面就是一個壞掉的迴圈。

為什麼需要一支專門的尺：
  這個壞法穿得過既有的每一道閘門。article-health 的 `seo-meta` 只量
  description 的「長度」——而退化迴圈讓它變長，所以那道閘門看到的是一個
  超長但合法的字串（warn，不是 hard）。`verify-translation.py` 19 項全過：
  腳註數對、章節數對、網址 multiset 對、passthrough 欄位對、
  `frontmatter not untranslated` 也對（它問的是「有沒有翻」，不是
  「翻出來的是不是一句話」）。ratio 甚至因為變長而更「健康」。
  退化迴圈同時還**吃掉內容**：中文原文寫「沒有名字、沒有火箭、沒有自己的地」
  三件事，越南文版只剩第一件，後兩件被 49 個 `tên` 蓋掉了——所以這不只是
  難看，是靜默的內容缺失，而結構類閘門全部數不出來。

  一句話：既有的尺量結構與長度，沒有一支在問「這串字還是人話嗎」。

門檻怎麼定的（REFLEXES #66 用真實產出校準，不憑想像設）：
  2026-11-22 對全庫 15,629 檔實測：

  | 門檻（連續同詞次數） | 門面行命中 | 正文命中 |
  | -------------------- | ---------- | -------- |
  | >= 5                 | 1          | 1        |
  | >= 6                 | 0          | 0        |

  門面行（title / description）那 1 筆就是 issue #2055 本身（49 次），
  修掉之後歸零，所以門面層用 **>= 5**：門面行是短的、策展過的，沒有任何
  正當理由讓同一個詞連著出現五次。

  正文那 1 筆是**合法的假陽性**，留在這裡免得下一個人再推導一次：
  `knowledge/fr/Technology/east-asian-input-methods.md` 寫 `shì, shì, shì,
  shì, shì`——那是一篇講東亞輸入法的文章在示範拼音同音字（是/事/市/試/視）。
  正文會有詞表、同音示範、歌詞這類正當重複，所以正文層用 **>= 6**，
  跟那個真實案例留一格，跟真正的退化（49 次）留很大一格。

  門面與正文是兩個維度，門檻不共用（REFLEXES #38：一個訊號承載兩種根因）。

用法：
  python3 scripts/tools/lang-sync/degenerate-repetition-check.py --scan all
  python3 scripts/tools/lang-sync/degenerate-repetition-check.py --files knowledge/vi/Technology/x.md
  python3 scripts/tools/lang-sync/degenerate-repetition-check.py --selftest

exit code：0 乾淨 / 1 有命中 / 2 尺自己壞了（掃不到任何檔、或正控制沒過）。
「掃到 0 檔」回 2 不回 0——一把尺量不到東西時不可以回答「乾淨」
（REFLEXES #85：「不知道」要有自己的符號，不能借用「沒事」的那個）。
"""

import argparse
import glob
import re
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent.parent.parent

FACADE_MIN = 5  # title / description：連續同詞 >= 5 即命中
BODY_MIN = 6  # 正文：>= 6（為 fr 輸入法那篇的同音示範留一格）

FACADE_KEYS = ("title", "description")


def _pattern(min_run: int) -> re.Pattern:
    """同一個詞連續出現 min_run 次（含第一次）。

    `[^\\W\\d_]` 才能同時吃 CJK、天城文、阿拉伯文、越南變音字母；用 `\\w`
    會把數字也算進去，年份表「2024 2024 2024」是正當排版。
    """
    return re.compile(
        r"(?<!\w)([^\W\d_]{1,20})(?:[\s,、，]+\1\b){%d,}" % (min_run - 1),
        re.UNICODE,
    )


FACADE_PAT = _pattern(FACADE_MIN)
BODY_PAT = _pattern(BODY_MIN)


def split_md(text: str) -> tuple[str, str]:
    """回傳 (frontmatter, body)。沒有 frontmatter 時 frontmatter 為空字串。"""
    if text.startswith("---"):
        parts = text.split("---", 2)
        if len(parts) >= 3:
            return parts[1], parts[2]
    return "", text


def facade_values(frontmatter: str) -> list[tuple[str, str]]:
    out = []
    for key in FACADE_KEYS:
        m = re.search(
            r"^%s:\s*(['\"])(.*?)\1\s*$" % key, frontmatter, re.M | re.S
        )
        if m:
            out.append((key, m.group(2)))
    return out


def check_file(path: Path) -> list[tuple[str, str, int, str]]:
    """回傳 [(where, token, run_len, excerpt)]。"""
    try:
        text = path.read_text(encoding="utf-8")
    except (OSError, UnicodeDecodeError) as exc:
        return [("unreadable", "", 0, str(exc))]

    frontmatter, body = split_md(text)
    hits = []

    for key, value in facade_values(frontmatter):
        m = FACADE_PAT.search(value)
        if m:
            token = m.group(1)
            run = len(re.findall(r"(?<!\w)%s\b" % re.escape(token), m.group(0)))
            hits.append((key, token, run, m.group(0)[:70]))

    m = BODY_PAT.search(body)
    if m:
        token = m.group(1)
        run = len(re.findall(r"(?<!\w)%s\b" % re.escape(token), m.group(0)))
        line = body[: m.start()].count("\n") + 1
        hits.append((f"body:L{line}", token, run, m.group(0)[:70]))

    return hits


def selftest() -> bool:
    """正控制：造得出的退化一定要抓到，正當重複一定不能抓
    （REFLEXES #99 尺先驗再用——新尺的讀數在抽驗之前不可引用）。"""
    cases = [
        # (說明, frontmatter, body, 預期命中)
        (
            "門面 49 次（issue #2055 原形）",
            "description: '" + "không có " + "tên " * 49 + "'",
            "nội dung bình thường ở đây.\n",
            True,
        ),
        ("門面剛好 5 次", "title: 'a tên tên tên tên tên b'", "ok\n", True),
        ("門面 4 次（門檻下，不該叫）", "title: 'a tên tên tên tên b'", "ok\n", False),
        (
            "正文同音示範 5 次（fr 輸入法那篇，不該叫）",
            "title: 'x'",
            "les homophones shì, shì, shì, shì, shì en pinyin.\n",
            False,
        ),
        (
            "正文退化 12 次（該叫）",
            "title: 'x'",
            "loop " + "tên " * 12 + "end\n",
            True,
        ),
        ("乾淨檔", "title: 'Normal title here'", "Normal prose, no loops.\n", False),
        (
            "數字重複不算（年份表排版）",
            "title: 'x'",
            "2024 2024 2024 2024 2024 2024 2024\n",
            False,
        ),
    ]
    # 用 TemporaryDirectory 讓暫存檔隨 context 自己消失，不在這支工具裡寫任何
    # 刪檔呼叫：檔名帶 check 的工具不該有 unlink（REFLEXES #96，
    # tests/test_readonly_named_tools_do_not_delete.py 2026-11-22 擋下本檔第一版）。
    import tempfile

    ok = True
    with tempfile.TemporaryDirectory() as td:
        for i, (name, fm, body, expect) in enumerate(cases):
            tmp = Path(td) / f"case{i}.md"
            tmp.write_text(f"---\n{fm}\n---\n{body}", encoding="utf-8")
            got = bool(check_file(tmp))
            mark = "✅" if got == expect else "❌"
            if got != expect:
                ok = False
            print(f"  {mark} {name}: 命中={got} 預期={expect}")
    return ok


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--scan", help="語言代碼，或 'all' 掃 knowledge/ 全部")
    ap.add_argument("--files", nargs="*", default=[])
    ap.add_argument("--selftest", action="store_true")
    ap.add_argument("--quiet", action="store_true")
    args = ap.parse_args()

    if args.selftest:
        print("🧪 正控制（門面 >= %d / 正文 >= %d）" % (FACADE_MIN, BODY_MIN))
        return 0 if selftest() else 2

    paths: list[Path] = [Path(p) for p in args.files]
    if args.scan:
        pat = (
            "knowledge/**/*.md"
            if args.scan == "all"
            else f"knowledge/{args.scan}/**/*.md"
        )
        paths += [Path(p) for p in glob.glob(str(REPO / pat), recursive=True)]

    paths = [p for p in paths if p.suffix == ".md"]
    if not paths:
        print("❌ 掃到 0 檔——尺量不到東西，不當成乾淨（給 --scan 或 --files）")
        return 2

    total_hits = 0
    for p in sorted(set(paths)):
        for where, token, run, excerpt in check_file(p):
            total_hits += 1
            # 倉庫外的路徑（測試的 tmp_path、隔離 worktree）不能讓 relative_to 炸掉：
            # 2026-11-22 首版就這樣炸過一次，而 crash 的 exit code 剛好也是 1，
            # 於是「擋下了」與「自己壞了」長得一樣（REFLEXES #38 混維度）。
            try:
                rel = p.relative_to(REPO) if p.is_absolute() else p
            except ValueError:
                rel = p
            print(f"⚠️  {rel}")
            print(f"    [{where}] '{token}' 連續 {run} 次 :: {excerpt!r}")

    if total_hits:
        print(f"\n❌ {total_hits} 處退化重複（掃 {len(set(paths))} 檔）")
        return 1
    if not args.quiet:
        print(f"✅ {len(set(paths))} 檔無退化重複")
    return 0


if __name__ == "__main__":
    sys.exit(main())
