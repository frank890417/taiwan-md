#!/usr/bin/env python3
"""section-parity-check.py — 譯文的 `## ` 章節比中文少了幾節（只量，`--requeue` 才動檔）。

為什麼要這支（2026-10-23 babel-nightly）：verify-translation.py 第 10 項「section count」
對差一節只給 WARN（`diff == 1`），差兩節以上才 FAIL。整篇重翻的模型偶爾會把一整章
略掉，剛好落在 WARN 那格，於是過閘、寫上新的 sourceCommitSha、status.py 判 fresh，
此後沒有路徑會回頭看。當夜全庫掃到 470 份譯文的 `## ` 數跟中文不同，其中 334 份是
「譯文比中文少」；隨機抽 8 份對讀，7 份是正文整章不見（〈無名小站〉en 少了「一個
追蹤數 12 的帳號」、〈臺灣穿山甲〉es 少了台北動物園那章、〈國家歌劇院〉ja 少了聲學那章），
1 份是延伸閱讀整節不見。字數比例、腳註數、網址數都量不到這種缺口：被略掉的章常常
沒有腳註，篇幅又被其他章的譯文膨脹蓋過去。

跟 status.py 已有的三道結構閘（footnote-loss／truncated／armor-residue）同一個形狀：
provenance 對得上，內容卻缺一塊。但這支**不**直接進 status.classify——verify 那道
±1 容許不改的話，重翻出來又少一節照樣過閘，status 又判 stale，產線會無限重翻。
兩道閘要一起改，那是閘門數值調整（BECOME 鐵律 10），交 OBSERVER-QUEUE。

所以這支分兩段：
  預設：只報告。每份「譯文比中文少」的譯文印一列（語言、路徑、中文節數、譯文節數、
        作者是機器還是人），最後印分佈。
  --requeue：把指定或篩出的譯文標成 stale（來源版本號改 pre-toolkit、兩個
        hash 換成 `sha256:requeue-section-loss`；版本號用 pre-toolkit，見 requeue() 註解），讓產線整篇重翻（章數不等時
        patch-translate 回 2，dispatcher 走整篇）。人寫的譯文一律跳過（OBSERVER-QUEUE
        #67，判斷借 contributor_guard，不另寫一份）。

用法：
  python3 section-parity-check.py                      # 全庫報告
  python3 section-parity-check.py --lang ar --min-loss 2
  python3 section-parity-check.py --requeue --min-loss 2          # 只動既有閘門本來就該擋的
  python3 section-parity-check.py --requeue knowledge/ar/People/chen-hsing-yu.md ...
  exit 0 = 沒有缺節；exit 1 = 有缺節（報告模式）
"""
from __future__ import annotations

import argparse
import collections
import re
import subprocess
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parents[3]
sys.path.insert(0, str(REPO / "scripts" / "tools" / "lang-sync"))
from langs import ALL_TRANSLATION_LANGS  # noqa: E402
from contributor_guard import translation_authorship  # noqa: E402

FM_RE = re.compile(r"^---\n(.*?)\n---\n", re.S)
H2_RE = re.compile(r"^##\s+", re.M)          # 同 verify-translation.py 第 10 項的尺
FROM_RE = re.compile(r"^translatedFrom:\s*['\"]?([^'\"\n]+?)['\"]?\s*$", re.M)
REQUEUE_HASH = "sha256:requeue-section-loss"


def h2_count(text: str) -> int:
    return len(H2_RE.findall(FM_RE.sub("", text, count=1)))


def scan(langs: list[str], min_loss: int):
    cache: dict = {}
    for lang in langs:
        for f in sorted((REPO / "knowledge" / lang).glob("*/*.md")):
            # Hub 是各語言自己策展重寫的入口頁（韓文 Hub 用「韓台平行線」重組），
            # 節數本來就不跟中文對齊，不是翻譯缺口
            if f.name.startswith("_"):
                continue
            text = f.read_text(encoding="utf-8", errors="replace")
            m = FROM_RE.search(text)
            if not m:
                continue
            zh = REPO / "knowledge" / m.group(1).strip()
            if not zh.exists():
                continue
            zh_n = h2_count(zh.read_text(encoding="utf-8", errors="replace"))
            tr_n = h2_count(text)
            loss = zh_n - tr_n
            if loss < min_loss:
                continue
            rel = str(f.relative_to(REPO))
            a = translation_authorship(REPO, rel, cache)
            yield {
                "lang": lang, "path": rel, "zh": str(zh.relative_to(REPO)),
                "zh_n": zh_n, "tr_n": tr_n, "loss": loss,
                "machine": bool(a and a.machine), "author": a.label() if a else "(untracked)",
            }


def requeue(rel: str) -> bool:
    p = REPO / rel
    text = p.read_text(encoding="utf-8")
    fm = FM_RE.match(text)
    if not fm:
        return False
    block = fm.group(1)
    # 用 pre-toolkit 而不是中文的上一個 commit：退到上一版時，若那一版到現在只差
    # 標點，dispatcher 的 semantic-noop-bump 會直接蓋新版本號、不呼叫模型
    # （2026-10-23 ko〈陳幸妤〉實撞：送回佇列幾分鐘後就以「只差標點」被判 fresh，
    # 缺的那章還是缺）。pre-toolkit 沒有可比的舊版，noop 判不了、patch 回 2，
    # 只剩整篇重翻一條路。
    new = re.sub(r"^sourceCommitSha:.*$", "sourceCommitSha: 'pre-toolkit'", block, count=1, flags=re.M)
    new = re.sub(r"^sourceContentHash:.*$", f"sourceContentHash: '{REQUEUE_HASH}'", new, count=1, flags=re.M)
    new = re.sub(r"^sourceBodyHash:.*$", f"sourceBodyHash: '{REQUEUE_HASH}'", new, count=1, flags=re.M)
    if new == block:
        return False
    p.write_text(text[:fm.start(1)] + new + text[fm.end(1):], encoding="utf-8")
    return True


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    ap.add_argument("paths", nargs="*", help="只看這些譯文（repo 相對路徑）")
    ap.add_argument("--lang", help="只掃一個語言")
    ap.add_argument("--min-loss", type=int, default=1, help="少幾節以上才列（預設 1）")
    ap.add_argument("--requeue", action="store_true", help="把列出的機器譯文標成 stale")
    ap.add_argument("--tsv", action="store_true", help="輸出 TSV")
    args = ap.parse_args()

    langs = [args.lang] if args.lang else list(ALL_TRANSLATION_LANGS)
    rows = list(scan(langs, args.min_loss))
    if args.paths:
        wanted = {p.lstrip("./") for p in args.paths}
        # 打錯路徑也會回「缺節 0 份」，跟真的沒缺節長得一模一樣；
        # 2026-10-24 驗交接時拿錯 slug，差點把沒量到當成量過了。
        for p in sorted(wanted):
            if not (REPO / p).is_file():
                print(f"⚠️ 找不到 {p}——這一份沒有被量，不是沒缺節", file=sys.stderr)
        rows = [r for r in rows if r["path"] in wanted]

    for r in rows:
        who = "machine" if r["machine"] else "HUMAN"
        if args.tsv:
            print("\t".join(str(r[k]) for k in ("lang", "path", "zh_n", "tr_n", "loss")) + f"\t{who}")
        else:
            print(f"{r['path']}  zh={r['zh_n']} tr={r['tr_n']} 少{r['loss']}節  [{who}]")

    by_loss = collections.Counter(r["loss"] for r in rows)
    by_lang = collections.Counter(r["lang"] for r in rows)
    humans = sum(1 for r in rows if not r["machine"])
    print(f"\n缺節譯文 {len(rows)} 份（人寫 {humans}）｜少幾節：{dict(sorted(by_loss.items()))}｜"
          f"各語言：{dict(by_lang.most_common())}", file=sys.stderr)

    if args.requeue:
        done = skipped = 0
        for r in rows:
            if not r["machine"]:
                skipped += 1
                print(f"🙇 skip {r['path']}：人寫的譯文不覆蓋（#67）", file=sys.stderr)
                continue
            if requeue(r["path"]):
                done += 1
        print(f"♻️ 標成 stale {done} 份，人寫跳過 {skipped} 份", file=sys.stderr)
        return 0
    return 1 if rows else 0


if __name__ == "__main__":
    sys.exit(main())
