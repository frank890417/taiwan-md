#!/usr/bin/env python3
"""enrich-batch-targets.py — 把「這篇該長成什麼樣」的結構數字寫進派工單。

## 為什麼有這支

委派翻譯的失敗幾乎都不是「翻錯」，是「翻掉了」：整個腳註定義區不見、圖說的
出處連結消失、章節少一節。這些在譯文裡讀不出來——譯文本身通順、術語正確、
沒有中文殘留，看起來完全健康，直到閘門說 URL 數對不上。

而 agent 沒有辦法知道自己漏了什麼。它手上只有中文原稿跟一句「完整翻譯，不是
摘要」，那是個沒有刻度的要求。它翻完之後也不會回頭數，因為它不知道該數到幾。

這支把「該數到幾」算好放進派工單：腳註幾條、H2 幾個、圖片幾張、帶出處連結的
圖說幾行、網址幾個。agent 拿到的不再是形容詞而是靶子，交件前自己能對。

這是 REFLEXES #42 v4 那條的落地：**判斷標準從 sub-agent 的直覺移到主 session
的預處理**。同樣一句「要完整」，寫成「腳註 62 條、圖說 7 行帶連結」之後，
它就從自律變成可驗收的條件。

用法：
    python3 enrich-batch-targets.py .lang-sync-tasks/vi-w1              # 寫入靶子
    python3 enrich-batch-targets.py --check <group.json> <譯文路徑>     # 對靶
"""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parents[3]
FN_DEF = re.compile(r"^\[\^[^\]]+\]:")
H2 = re.compile(r"^## ")
IMG = re.compile(r"^!\[")
URL = re.compile(r"https?://")
CAPTION_START = re.compile(r"^\\?[_*](?![\s*_])")


def counts(md: str) -> dict:
    lines = md.splitlines()
    cap_with_link = 0
    for i, line in enumerate(lines):
        if not IMG.match(line.lstrip()):
            continue
        for j in range(i + 1, min(i + 4, len(lines))):
            s = lines[j].strip()
            if not s:
                continue
            # `\_` 也算。prettier 會把行首底線跳脫成 `\_`（避免被當成斜體標記），
            # 而這裡只認 `_`，於是每一個被跳脫的圖說都漏數——這是 hard gate，
            # 漏數會讓派工單的期望值偏低，正確交件反而被判失敗。
            # 2026-09-09 蛋撻那篇：zh 有 2 個帶授權連結的圖說、期望值卻寫 1，
            # 譯者兩個都正確搬過去反而紅燈。CC 標示義務的閘門不該懲罰做對的人。
            # 星號斜體也是圖說。2026-09-27：zh〈阿里山林業鐵路〉三個帶授權連結的圖說都寫成
            # `*圖：…*`，這裡只認 `_`，期望值算成 0；譯者照搬（或 prettier 改成 `_`）
            # 之後實際值 2～3，三篇 Haiku 交件因此全被判結構不符。列表項的 `* ` 與粗體
            # `**` 不算——標記後面接空白或第二個標記的一律跳過。
            if CAPTION_START.match(s) and "](" in s:
                cap_with_link += 1
            break
    return {
        "footnote_defs": sum(1 for l in lines if FN_DEF.match(l)),
        "h2_sections": sum(1 for l in lines if H2.match(l)),
        "inline_images": sum(1 for l in lines if IMG.match(l.lstrip())),
        "captions_with_source_link": cap_with_link,
        "urls": sum(len(URL.findall(l)) for l in lines),
    }


def write_plan(md: str) -> dict:
    """算出「這篇要分幾次寫」，並把章節標題列出來當寫入清單。

    委派翻譯最主要的死因不是翻不好，是**單次回應超過 32K output token 上限**
    ——模型想一次吐完整篇，API 直接中止，工作樹留下一個空殼或半截檔案，而
    agent 自己回報的還是「翻譯完成」。2026-08-09 一批 25 次派工裡有 5 次這樣死。

    叫模型「注意不要太長」沒有用，它無法預估自己的輸出長度。能算的是我們：
    章節邊界是現成的切點，每個 H2 各寫一次，每次的量就被原稿結構天然限制住。
    所以這裡把章節標題列出來，讓寫入從「一次生成一篇」變成「照清單逐節追加」。

    門檻用原稿位元組估：越南語譯文約是中文原稿的 2.3-2.8 倍位元組，而 32K
    token 的安全水位大約落在 40KB 輸出，回推原稿 ~15KB。超過就必須分節寫。
    """
    lines = md.splitlines()
    titles = [l[3:].strip() for l in lines if H2.match(l)]
    zh_bytes = len(md.encode("utf-8"))
    return {
        "zh_bytes": zh_bytes,
        "must_write_in_chunks": zh_bytes > 15_000,
        "h2_titles": titles,
        "sequence": (
            ["frontmatter + 開頭到第一個 ## 之前"]
            + [f"## {t}" for t in titles]
            + ["腳註定義區（所有 [^N]: 行）"]
        ),
    }


def check(group_json: str, out_file: str) -> int:
    """對靶：印出「該有幾個 / 實際幾個」，差一項就 exit 1。

    刻意做成一行指令而不是叫 agent 自己數：自己數的東西會數成自己想要的答案，
    而這五個數字全都是機械可得的。腳註是 hard fail（整區掉光是最常見的破損），
    圖說出處連結也是 hard——那是 CC 授權的標示義務，掉了不只是連結數對不上。
    """
    arts = json.loads(Path(group_json).read_text(encoding="utf-8"))["articles"]
    # 用產出檔的路徑去認是哪一篇，不要固定拿 [0]。舊版寫死索引 0，在多篇一組的
    # 派工單上會拿甲篇的期望值去量乙篇的產出——而它照樣印出漂亮的 ✅/❌ 清單，
    # 沒有任何地方會說「你對錯靶了」。2026-09-09 對 pt group-B（48 篇一組）驗收時
    # 撞見；此前的單篇批次剛好都是 [0]，所以這個洞一直被批次形狀遮著。
    out_name = Path(out_file).name
    art = next((a for a in arts if Path(a.get("en_path", "")).name == out_name), None)
    if art is None:
        if len(arts) == 1:
            # 單篇派工單仍對靶，但要出聲：不出聲的話，指錯產出檔會得到一份
            # 看起來像「這篇結構壞掉」的 ❌ 清單，而真正壞掉的是你指的路徑
            art = arts[0]
            print(f"⚠️ 派工單裡是 {Path(art.get('en_path','?')).name}，你指的是 {out_name}——"
                  "單篇派工單仍照對，但先確認沒指錯檔")
        else:
            print(f"❌ 這份派工單有 {len(arts)} 篇，但沒有一篇的 en_path 對得上 {out_name}——"
                  "確認你驗的是不是這一組的產出")
            return 1
    want = art.get("expected_structure")
    if not want:
        print("⚠️ 這份派工單沒有 expected_structure，先跑 enrich-batch-targets.py")
        return 0
    out_p = Path(out_file)
    if not out_p.exists():
        print(f"❌ 產出檔不存在：{out_file}——agent 說寫好了但檔案不在，是最常見的一種假交件")
        return 1
    got = counts(out_p.read_text(encoding="utf-8"))
    hard = {"footnote_defs", "h2_sections", "captions_with_source_link"}
    bad = False
    for k, w in want.items():
        g = got.get(k, 0)
        if g == w:
            mark = "✅"
        elif k in hard:
            mark, bad = "❌", True
        else:
            mark = "⚠️"
        print(f"  {mark} {k}: 該有 {w} / 實際 {g}")
    print("❌ 結構沒對上——回去把缺的補完，不要交件" if bad else "✅ 結構對上了")
    return 1 if bad else 0


def main() -> int:
    if sys.argv[1] == "--check":
        return check(sys.argv[2], sys.argv[3])
    out_dir = Path(sys.argv[1])
    n = 0
    for group in sorted(out_dir.glob("_group-*.json")):
        data = json.loads(group.read_text(encoding="utf-8"))
        for art in data["articles"]:
            zh = REPO / "knowledge" / art["zh_path"]
            md = zh.read_text(encoding="utf-8")
            art["expected_structure"] = counts(md)
            art["write_plan"] = write_plan(md)
            n += 1
        group.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"✅ {n} 篇派工單已寫入 expected_structure（腳註／H2／圖片／圖說連結／網址）")
    return 0


if __name__ == "__main__":
    sys.exit(main())
