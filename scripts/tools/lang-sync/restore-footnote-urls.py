#!/usr/bin/env python3
"""restore-footnote-urls.py — 把譯文腳註裡被模型改動的來源網址還原成中文原稿的版本。

## 為什麼有這支

腳註的來源網址是「不可翻譯內容」，但模型常常動它。實際看到的形狀有三種：
截成根網址（`https://sec.nycu.edu.tw/sec/ch/app/...?id=38552&serno=...`
變成 `https://sec.nycu.edu.tw/`）、把查詢字串丟掉、把 percent-encoding 改一碼。
這類改動不會讓譯文讀起來有問題——它讓來源失去可追溯性，而
`verify-translation.py` 的 URL multiset 閘門會擋下整篇，於是一篇字字正確的
譯文因為兩個網址被退回重翻，等於為 0.1% 的瑕疵燒掉 100% 的算力。

既有工具都不做這件事：`footnote-format-fix.py` 修的是格式（缺描述、多餘括號），
不碰網址內容；`heal-passthrough-fields.py` 管的是 frontmatter。

## 為什麼只動腳註定義行，而且只在編號對得起來時動

腳註定義是譯文裡唯一能跟中文原稿「一對一」對齊的結構：`[^5]` 就是 `[^5]`，
不需要理解語意就能配對。正文裡的網址沒有這種錨，硬對會配錯。所以這支刻意
只處理 `[^N]:` 開頭的行，其餘一律回報不動——保守到寧可少修，因為修錯一個
來源網址比留著一個壞網址更糟：前者讀者點進去看到的是別人的內容，後者至少
會被閘門擋下來。

同理，同一個腳註裡中文有 k 個網址、譯文不是 k 個時也不動：數量不同代表模型
增刪了連結，位置對應已經不可靠，那需要判斷力不是機械替換。

用法：
    python3 restore-footnote-urls.py <zh_path> <translation_path>            # 預覽
    python3 restore-footnote-urls.py <zh_path> <translation_path> --apply    # 寫回

Exit code: 0 = 沒有需要還原的 / 已還原；1 = 有無法安全處理的差異（需人看）。
"""
import argparse
import re
import sys
from collections import Counter
from importlib import import_module
from pathlib import Path
from urllib.parse import unquote

sys.path.insert(0, str(Path(__file__).resolve().parent))
_verify = import_module("verify-translation")  # URL_PATTERN：跟閘門第 11 檢查同一把尺

# 網址的終止字元（閘門 URL_PATTERN 的否定字元類別）與尾端句讀
_URL_STOPS = _verify.URL_PATTERN[len("https?://[^"):-2]
_URL_TRAIL = ".,;:!?*_\\"


def _url_tokens(text: str) -> list[str]:
    """跟 verify-translation.extract_urls 同樣的切法，但不做反斜線還原——
    這裡要拿 token 回原文替換，必須是原文裡真的出現的字串。"""
    return [u.rstrip(_URL_TRAIL) for u in re.findall(_verify.URL_PATTERN, text)]


def _split_fm(text: str) -> tuple[str, str]:
    """回傳 (frontmatter 連同兩條 ---, 正文)；沒有 frontmatter 時前者為空字串。"""
    m = re.match(r"---\n.*?\n---\n", text, re.S)
    return (m.group(0), text[m.end():]) if m else ("", text)


# 整條網址才算命中：後面只能接尾端句讀，然後是終止字元或檔尾
_URL_END = "(?=[" + re.escape(_URL_TRAIL) + "]*(?:[" + _URL_STOPS + "]|$))"

FOOTNOTE_DEF = re.compile(r"^\[\^([^\]]+)\]:\s*(.*)$")
# markdown target `](URL)` 與 angle-wrapped `](<URL>)` 兩種都收。
# angle 形式優先整段吃下，否則含括號的維基網址會在第一個 `)` 被截斷
# （BABEL-VORTEX-LOOP v1.19-v1.20 修過同一個 regex 病，這裡沿用它的結論）。
URL_IN_LINK = re.compile(r"\]\(\s*(?:<([^>]+)>|([^)\s]+))")


def footnote_urls(line: str) -> list[str]:
    return [m.group(1) or m.group(2) for m in URL_IN_LINK.finditer(line)]


def collect(text: str) -> dict[str, tuple[int, str]]:
    """footnote id → (行號, 整行)"""
    out = {}
    for i, line in enumerate(text.splitlines()):
        m = FOOTNOTE_DEF.match(line)
        if m:
            out[m.group(1)] = (i, line)
    return out


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("zh_path")
    ap.add_argument("translation_path")
    ap.add_argument("--apply", action="store_true", help="寫回檔案（預設只預覽）")
    ap.add_argument("--quiet", action="store_true")
    args = ap.parse_args()

    zh_text = Path(args.zh_path).read_text(encoding="utf-8")
    tr_path = Path(args.translation_path)
    tr_lines = tr_path.read_text(encoding="utf-8").splitlines(keepends=True)

    zh_fn = collect(zh_text)
    tr_fn = collect("".join(tr_lines))

    # 整段消失要吼出來，不能回報成「沒事做」。
    # 2026-08-09 實撞：三篇委派譯文把整個腳註定義區丟掉（zh 62-72 條 → 譯文 0 條），
    # 這支當時回報「可還原 0 個網址；需人看 0 個」——跟一篇完全健康的譯文逐字相同。
    # 它比對的是「兩邊都有的腳註」，於是被比對物整批不存在時，它的沉默看起來像健康。
    # 這正是它要防的那種病（來源失去可追溯性）最嚴重的形態，卻是它最安靜的時候。
    if zh_fn and not tr_fn:
        print(
            f"❌ 譯文一條腳註定義都沒有，中文原稿有 {len(zh_fn)} 條 —— "
            "整個腳註定義區在翻譯時掉了，不是網址被改。這篇要重翻，不是修網址。"
        )
        return 2
    if zh_fn and len(tr_fn) < len(zh_fn) * 0.9:
        print(
            f"⚠️ 腳註條數落差大：中文 {len(zh_fn)} 條、譯文只有 {len(tr_fn)} 條 —— "
            "先確認是不是漏譯，再談還原網址。"
        )

    restored, skipped = [], []
    for fid, (idx, tr_line) in tr_fn.items():
        if fid not in zh_fn:
            skipped.append((fid, "中文原稿沒有這個編號"))
            continue
        zh_urls = footnote_urls(zh_fn[fid][1])
        tr_urls = footnote_urls(tr_line)
        # 中文腳註沒有連結、譯文卻長出一條 = 捏造來源（MANIFESTO §10）。
        # 2026-08-09 疫情篇 [^85] 實撞：中文是一段純敘述（說明某個數字為何無法
        # 核對），譯文憑空生出「衛福部函送立法院報告」的立法院連結，配上翻譯腔
        # 的標題，整條註的內容跟原稿毫無關係。
        # 這次是 URL 多重集多出一條才被抓到——但如果同一篇又剛好掉了一條真的
        # 網址，一多一少會互相抵銷，數量閘門就全盲。所以要直接認這個形狀，
        # 不倚賴總數。捏造的來源比缺來源嚴重：缺會被擋，捏造會被讀者相信。
        if not zh_urls and tr_urls:
            skipped.append((fid, f"❗中文原稿此註無連結，譯文卻有 {len(tr_urls)} 條 —— 疑似捏造來源，需人看"))
            continue
        if not zh_urls or zh_urls == tr_urls:
            continue
        if len(tr_urls) < len(zh_urls):
            # 多來源腳註被翻成單來源（實測外送專法 [^52]：zh 3 條、譯文剩 1 條）。
            # 少掉的那幾條是讀者查證的入口，掉了就等於這條註只剩一個孤證。
            # 跟圖說同一個處置：整組 `[標籤](網址)` 接到該行末尾，只增不改——
            # 插進翻好的句子中間需要判斷，接在尾端不需要。
            # 比對用整行做子字串檢查，不是比對 `tr_urls`。
            # `footnote_urls()` 只認 `](網址)`，而譯文可能把同一條來源寫成
            # autolink `<網址>`——那時 tr_urls 是空的，這裡就判成「缺」再補一次，
            # 同一條網址在一行裡出現兩遍（實測選舉公報篇 [^7]）。
            # 該問的是「這條網址在這行裡嗎」，它以什麼語法寫成不重要。
            missing = [u for u in zh_urls if u not in tr_line]
            zh_links = dict(re.findall(r"\[([^\]]*)\]\(\s*<?([^)>\s]+)", zh_fn[fid][1]))
            add = [
                f"[{next((k for k, v in zh_links.items() if v == u), '來源')}]({u})"
                for u in missing
            ]
            if add:
                tr_lines[idx] = tr_line.rstrip("\n").rstrip() + " " + " ".join(add) + "\n"
                restored += [(fid, "(缺)", u) for u in missing]
            continue
        if len(zh_urls) != len(tr_urls):
            skipped.append((fid, f"譯文連結比原稿多，不動（zh={len(zh_urls)} 譯文={len(tr_urls)}）"))
            continue
        # 位置替換：第 n 個連結換成中文原稿的第 n 個。
        it = iter(zh_urls)
        new_line = URL_IN_LINK.sub(lambda m: f"]({next(it)}", tr_line)
        for a, b in zip(tr_urls, zh_urls):
            if a != b:
                restored.append((fid, a, b))
        tr_lines[idx] = new_line + ("\n" if not new_line.endswith("\n") else "")

    # ── 腳註正文裡的 autolink ────────────────────────────────────────────
    # 來源網址在腳註裡有第三種住法：不是開頭的 `[標題](網址)`，而是解釋文字中間
    # 的 angle autolink——`自由時報報導（<https://news.ltn.com.tw/…>）另指出…`。
    # 上面兩段邏輯都用 `](網址)` 抓連結，所以這種形態對它們是隱形的：2026-08-09
    # 疫情篇 vi 版少 10 條網址而 verify 硬失敗，這支卻回報「可還原 0 個」。
    #
    # 譯者會掉它，是因為它長在句子裡——翻譯那句話時整個括號一起消失，而句子本身
    # 讀起來完好。掉的是讀者查證的入口。
    # 補回的方式跟上面同理：接在該行末尾，只增不改。它原本嵌在中文句子中間，
    # 而譯文那句已經是越南語，插回原位需要判斷句子結構；接在尾端不需要。
    # 中文原稿的網址後面常緊跟全形標點——`…j.stem.2010.08.012）與 Moderna 公司…`。
    # 只排除半形 `)` 的字元類會把 `）與` 一起吃進網址，接回去就成了
    # `（<https://…012）與>）` 這種髒東西（實測污染 5 條腳註，而且它「看起來像
    # 有補到」）。所以角括號 autolink 優先整段取出，剩下的裸網址才用排除全形
    # 標點的字元類抓——維基網址裡的漢字（`zh-tw/蛋堡`）要留著，被排除的只有標點。
    angle = re.compile(r"<(https?://[^>\s]+)>")
    bare = re.compile(r"https?://[^\s)\]<>\"'（）【】「」『』《》〈〉，。、；：！？]+")

    def prose_urls(line: str) -> list[str]:
        out = angle.findall(line)
        return out + bare.findall(angle.sub(lambda m: " " * len(m.group(0)), line))

    prose_restored = []
    # 「有沒有」要對整份譯文問，不是只問這一行。
    # 譯文常把腳註裡的網址挪到別的位置（正文、圖片來源清單、另一條腳註），
    # 只看本行會判成缺漏而再補一次——實測擎天崗篇因此多出 6 條，URL 總數
    # 超過原稿，verify 反而硬失敗。這一層的目的是「來源沒有消失」，
    # 只要它還在文件裡就達成了；補在哪一行是次要的。
    whole = "".join(tr_lines)
    for fid, (idx, _) in tr_fn.items():
        if fid not in zh_fn:
            continue
        cur = tr_lines[idx].rstrip("\n")
        missing = [u for u in prose_urls(zh_fn[fid][1]) if u not in whole]
        if not missing:
            continue
        tr_lines[idx] = cur.rstrip() + " " + " ".join(f"（<{u}>）" for u in missing) + "\n"
        prose_restored += [(fid, u) for u in missing]

    if not args.quiet:
        for fid, u in prose_restored:
            print(f"  [^{fid}] 補回正文 autolink → {u}")
        for fid, old, new in restored:
            print(f"  [^{fid}] {old}\n      → {new}")
        for fid, why in skipped:
            print(f"  ⚠️ [^{fid}] 不動：{why}")
        verb = "已還原" if args.apply else "可還原（預覽，加 --apply 寫回）"
        print(f"{verb} {len(restored) + len(prose_restored)} 個網址；需人看 {len(skipped)} 個")

    # ── 圖說層 ──────────────────────────────────────────────────────────
    # CC 圖的出處網址在原稿出現兩次：一次在圖片下方的斜體圖說（`Photo: 攝影者,
    # [標題](網址) — 授權`），一次在文末的圖片來源清單。譯文常保住清單、掉了圖說
    # 裡那條——2026-08-09 醫療法 vi 版 4 條全這樣掉，verify 的 URL multiset 因此
    # 硬失敗，而圖片本身 7 張都在。這是授權標示的缺口，不只是連結數對不上。
    # 對齊方式跟腳註同理：圖說跟著圖片走，第 n 張圖的圖說對第 n 張圖的圖說，
    # 數量不同就不動。
    # 圖說是「以底線開頭的斜體行」，行尾常跟著授權字樣（`— CC BY 4.0._`），
    # 所以不能要求 `)` 緊貼行尾——那寫法對真實圖說一行都匹配不到。
    #
    # 更關鍵的是不能用「有連結的圖說」來配對：實測譯文會把整條出處連結弄不見
    # （醫療法 vi 版 zh 7 行有連結、譯文只剩 4 行），這時兩邊清單長度不同，
    # 位置對應就失效，而那恰好是最需要救的情況。改用圖片本身當錨——圖說跟在
    # 圖片後面，第 n 張圖的圖說對第 n 張圖的圖說，跟連結在不在無關。
    img_re = re.compile(r"^!\[")

    def caption_lines(lines: list[str]) -> list[int]:
        out = []
        for i, line in enumerate(lines):
            if not img_re.match(line.lstrip()):
                continue
            for j in range(i + 1, min(i + 4, len(lines))):
                s = lines[j].strip()
                if not s:
                    continue
                if s.startswith("_"):
                    out.append(j)
                break
        return out

    zh_lines_all = zh_text.splitlines()
    zh_cap_idx = caption_lines(zh_lines_all)
    tr_idx = caption_lines([l.rstrip("\n") for l in tr_lines])
    zh_caps = [zh_lines_all[i] for i in zh_cap_idx]
    cap_restored = 0
    if zh_caps and len(zh_caps) == len(tr_idx):
        for zh_line, i in zip(zh_caps, tr_idx):
            zh_urls = footnote_urls(zh_line)
            tr_urls = footnote_urls(tr_lines[i])
            if zh_urls == tr_urls:
                continue
            line = tr_lines[i].rstrip("\n")
            if len(zh_urls) == len(tr_urls):
                it = iter(zh_urls)
                line = URL_IN_LINK.sub(lambda m: f"]({next(it)}", line)
                cap_restored += sum(1 for a, b in zip(tr_urls, zh_urls) if a != b)
            elif len(tr_urls) < len(zh_urls):
                # 授權連結整條不見（實測 medical-care-act／computex／外送專法都是
                # 這個形狀，各少 2-3 條）。這是 CC 授權的標示義務缺口，不是連結
                # 數對不上而已。把 zh 有而譯文沒有的整組 `[標籤](網址)` 補到圖說
                # 末尾——只增不改，一個字的譯文都不動；插進句子中間才需要判斷，
                # 接在尾端不需要。
                missing = [u for u in zh_urls if u not in tr_urls]
                zh_links = dict(re.findall(r"\[([^\]]*)\]\(\s*<?([^)>\s]+)", zh_line))
                add = []
                for url in missing:
                    label = next((k for k, v in zh_links.items() if v == url), "來源")
                    add.append(f"[{label}]({url})")
                if add:
                    stripped = line.rstrip()
                    tail = "_" if stripped.endswith("_") else ""
                    core = stripped[:-1].rstrip() if tail else stripped
                    line = f"{core} {' '.join(add)}{tail}"
                    cap_restored += len(add)
            else:
                skipped.append(("圖說", f"譯文連結比原稿多，不動（zh={len(zh_urls)} 譯文={len(tr_urls)}）"))
                continue
            tr_lines[i] = line + "\n"
    elif zh_caps and len(zh_caps) != len(tr_idx):
        skipped.append(("圖說", f"圖說行數不同 zh={len(zh_caps)} 譯文={len(tr_idx)}，位置對應不可靠"))

    if cap_restored and not args.quiet:
        print(f"  圖說層另還原 {cap_restored} 個出處網址")

    # ── 全文層：修被改掉幾個字元的網址 ────────────────────────────────────
    # 模型會把 percent-encoding 改一碼：`%E8%A1%97`（街）寫成 `%E8%A1%8B`。
    # 長度一樣、網域一樣、看起來一樣，點下去是死的。三次實撞（中山北路條通、
    # 台灣美食總覽、國道系統）都是這個形狀，而它不挑位置——正文、圖說、圖片來源
    # 清單都出現過，所以這一關放在全文層而不是綁在某種行上。
    #
    # 判準嚴到只認「幾乎就是同一條」：網域相同、長度相同、只差 1-3 個字元，
    # 而且那條正確網址在譯文裡找不到。差得多一點就不動——那可能是另一個來源，
    # 猜錯會把讀者送到錯的地方，比留著壞連結更糟。
    #
    # 比對用次數而不是集合（2026-09-27 babel-nightly）：`[網址](網址)` 這種
    # 連結文字與 href 同一條的寫法，只壞一邊時，好的那一邊讓集合以為「譯文裡有」，
    # 壞的那一邊永遠不被修。〈台灣火鍋〉ar/hi/ru/vi 四語就是這樣帶著一碼竄改的
    # 網址過了兩個月。替換也改成整條網址才算數：被截短的網址是正確網址的前綴，
    # 用 str.replace 會把正確那條的開頭也換掉。
    #
    # 抽網址用閘門那把尺（verify-translation 第 11 檢查的 URL_PATTERN＋尾端句讀
    # 剝除）。本層原本自帶一條只認空白與半形括號的 regex，會把 `…jpg`，授權為`
    # 整段中文吞進 token，再被「前 60 字相同」誤配，把原稿的中文貼進譯文。
    # 只比對正文（閘門也只比正文）：frontmatter 的引號風格兩側不同（zh 用 `"`、
    # 譯文用 `'`），閘門的尺不把 `'` 當終止符，掃進 frontmatter 會把
    # `imageSource: '…jpg'` 的收尾引號當成網址竄改「修」掉，YAML 直接壞。
    fm, text = _split_fm("".join(tr_lines))
    zh_count = Counter(_url_tokens(_split_fm(zh_text)[1]))
    tr_count = Counter(_url_tokens(text))
    zh_short = zh_count - tr_count   # 原稿有、譯文不夠次數的
    tr_extra = tr_count - zh_count   # 譯文多出來、原稿沒有這麼多次的
    mangled = 0
    for want in list(zh_short):
        host = want.split("/")[2] if want.count("/") > 2 else ""
        if not host:
            continue
        for got in list(tr_extra):
            if tr_extra[got] <= 0:
                continue
            if not got.startswith(f"{want[:8]}{host}"):
                continue
            # 兩種等價：(a) 解碼後完全相同——模型把 `(` 寫成 `%28` 這類正規化，
            # 連結能用但逐位元組比對視為不同，站上規則是保留原稿寫法；
            # (b) 長度相同且只差 1-3 個字元——真正的竄改。
            same_after_decode = unquote(got) == unquote(want)
            near_miss = (
                len(got) == len(want)
                and 1 <= sum(1 for a, b in zip(got, want) if a != b) <= 3
            )
            # 第三種形狀：percent-encoding 序列被截掉幾個位元組。
            # 實測澎湖 vi 版：`%E6%99%AF%E8%A7%80`（景觀）寫成 `%E6%99%80`，
            # 長度差 18，上面兩條都認不出來，而連結是死的。
            # 判準要求前 60 字元完全相同——同一台主機、同一條路徑走到一半才分岔，
            # 那不可能是「另一個來源」，只可能是同一條被寫壞。60 這個長度已經
            # 涵蓋 `https://upload.wikimedia.org/wikipedia/commons/thumb/x/xx/`
            # 這種共同前綴，所以真正比對到的是檔名本身。
            prefix_match = (
                len(want) > 60
                and len(got) > 60
                and got[:60] == want[:60]
                and abs(len(got) - len(want)) <= 40
            )
            # 第四種形狀：查詢字串被整段丟掉，只剩路徑（連結文字最常見）。
            # 要求 got 剛好停在 `?`／`&`／`#` 前——同一條路徑、只少了參數。
            query_dropped = (
                len(want) > len(got)
                and want.startswith(got)
                and want[len(got)] in "?&#"
            )
            if same_after_decode or near_miss or prefix_match or query_dropped:
                n = min(zh_short[want], tr_extra[got])
                token = re.compile(re.escape(got) + _URL_END)
                text, done = token.subn(lambda _m: want, text, count=n)
                if done:
                    zh_short[want] -= done
                    tr_extra[got] -= done
                    mangled += done
                if zh_short[want] <= 0:
                    break
    if mangled:
        tr_lines = (fm + text).splitlines(keepends=True)
        if not args.quiet:
            print(f"  全文層修復 {mangled} 個被改掉字元的網址（percent-encoding 竄改）")

    if args.apply and (restored or prose_restored or cap_restored or mangled):
        tr_path.write_text("".join(tr_lines), encoding="utf-8")

    return 1 if skipped else 0


if __name__ == "__main__":
    sys.exit(main())
