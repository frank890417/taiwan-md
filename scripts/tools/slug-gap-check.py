#!/usr/bin/env python3
"""
slug-gap-check.py — 合併前就看見「這篇中文檔名的新文章排不進翻譯佇列」

為什麼存在（2026-10-25 self-evolve，MEMORY §神經迴路「缺 slug 的缺口在合併那刻產生」
vc=3 之後又手補兩次）：純中文檔名、還沒有任何譯文、也沒登記在 `knowledge/_slug-map.json`
的母稿，prepare-batch 反推不出 slug，十二語整篇跳過。偵測一直住在 `babel-preflight.py`
（翻譯班的第一個指令），而缺口產生在維護班或投稿者自己按 GitHub 合併鈕的那一刻，中間隔
一整天；dispatcher 照常重啟、印「零派工」，讀起來像沒事可做。07-27、10-20、10-21 三次，
10-24、10-25 兩夜又各手補一次。交接寫給 maintainer「合併時同一個 merge 補 slug」寫對了
席位，但投稿者自己按合併鈕的那條路上沒有人讀交接（REFLEXES #97）。

判準不另訂：直接呼叫 `babel-preflight.check_slug_registration()`，兩支工具對同一篇文章
永遠給同一個答案（REFLEXES #83 兩把尺 divergence 的預防）。

本工具只警告不擋：缺 slug 不讓文章壞掉，只讓翻譯晚到；擋下合併等於把一個登記表缺列
升級成投稿被退，代價不對稱。

用法：
  python3 scripts/tools/slug-gap-check.py                       # 全庫缺 slug 的母稿
  python3 scripts/tools/slug-gap-check.py knowledge/History/熱蘭遮城.md ...   # 只看這幾篇
  python3 scripts/tools/slug-gap-check.py --changed-json .pr-changed-files.json --github
exit: 0（永遠；這是警告）/ 2（判準本身讀不到檔，結果不可信）
"""
import argparse
import importlib.util
import json
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parents[2]
PREFLIGHT = REPO / "scripts/tools/lang-sync/babel-preflight.py"


def load_unslugged():
    spec = importlib.util.spec_from_file_location("babel_preflight", PREFLIGHT)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod.check_slug_registration()


def normalize(path):
    p = path.strip()
    return p[len("knowledge/"):] if p.startswith("knowledge/") else p


def find_gaps(unslugged, wanted=None):
    """wanted=None → 全庫；否則只回 wanted 裡缺 slug 的那幾篇（保留 unslugged 的順序）。"""
    if wanted is None:
        return list(unslugged)
    want = {normalize(w) for w in wanted}
    return [u for u in unslugged if u in want]


def report_lines(gaps):
    if not gaps:
        return ["✅ 沒有缺 slug 的中文檔名新文章"]
    lines = [f"⚠️ {len(gaps)} 篇中文檔名的文章還沒有英文 slug，十二語翻譯會整篇跳過："]
    lines += [f"   knowledge/{g}" for g in gaps]
    lines += [
        "→ 在 knowledge/_slug-map.json 加一列 \"分類/檔名.md\": \"kebab-case-ascii-slug\"",
        "  （純 ASCII、60 字元內，先 git ls-files 確認沒撞到既有 slug），跟文章同一個 PR 或同一個 merge 補上。",
        "  這是警告，不擋合併；沒補的話翻譯會晚一天以上才被發現。",
    ]
    return lines


def main():
    ap = argparse.ArgumentParser(description=__doc__.split("\n")[1])
    ap.add_argument("paths", nargs="*", help="只檢查這些檔（knowledge/ 前綴可有可無）")
    ap.add_argument("--changed-json", help="pr-changed-files.mjs 產的 JSON，讀它的 zh_kn")
    ap.add_argument("--github", action="store_true", help="另印 ::warning 註記給 Actions")
    args = ap.parse_args()

    res = load_unslugged()
    if not res.get("available"):
        print(f"⚠️ 判準讀不到檔，結果不可信：{res.get('error')}", file=sys.stderr)
        return 2

    wanted = None
    if args.changed_json:
        wanted = json.loads(Path(args.changed_json).read_text(encoding="utf-8")).get("zh_kn", [])
    elif args.paths:
        wanted = args.paths

    gaps = find_gaps(res["unslugged"], wanted)
    for line in report_lines(gaps):
        print(line)
    if args.github:
        for g in gaps:
            print(f"::warning file=knowledge/{g}::中文檔名還沒有英文 slug，十二語翻譯會跳過這篇；"
                  f"在 knowledge/_slug-map.json 補一列")
    return 0


if __name__ == "__main__":
    sys.exit(main())
