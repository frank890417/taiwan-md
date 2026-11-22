#!/usr/bin/env python3
"""
sovereignty-lexicon-check.py — 譯文裡出現了該語言 §6 列出的 PRC 編碼詞的位置清單。

⚠️ **這是盤點工具，不是閘門。不要接進 dispatcher 的 verify_one()。**

為什麼不能當閘門（2026-09-09 首跑實測，寫在最前面免得下一個人重做一次）：
  跑完全庫 9,161 檔命中 2,476 筆，抽驗結果是**假陽性率接近 100%**，而且不是
  解析錯誤——是這件事本身判不了。三類：

  1. **語境依賴的合法用法**：兩筆 critical 命中都是對的中文——
     `de/Geography/tainan-city.md` 寫「1885 年清朝宣布設立台灣省」（史實），
     `de/History/taiwan-forestry-history.md` 寫「台灣省林務局（台灣省林務局）」
     （歷史機關全名）。TRANSLATION-de.md §6 的「例外」欄正好寫了這兩種情形。
  2. **已經有更好的尺在管的**：`the island`／`la isla`／`a ilha` 合計 990 筆，
     但 MANIFESTO §自稱那條明講「島嶼的文學意象自由使用，判準是這裡是不敢寫
     台灣的迴避、還是島嶼本身有意義」，而 `prose-health` plugin 已經用 ratio
     判準在抓（島佔國名指稱 > 1/4 且 ≥3）。這支再報一次就是 REFLEXES #83 的
     「兩把尺各自維護」。
  3. **目標語言的日常詞**：`thống nhất`（越南文的「統一」）170 筆——表上寫的是
     「當成必然未來事件時」才是問題，那要讀整句。

  §6 每一列都帶「例外」欄，那不是裝飾：**主權用詞的對錯住在語境裡，不住在字串裡**。
  SQUEEZE §Z2.0 把這道 grep 標成「儀器化候選（pending）」而一直沒實作，很可能
  不是忘了接線，是前人也走到這裡。本檔留下實測數字，讓下一個人不必再撞一次。

它還能做什麼：
  當**盤點**用——出生新語言後掃一遍該語言全庫，把所有需要人眼判斷的位置列出來，
  比人自己想關鍵字全。也可以在 guide 補完「嚴重度」與「例外」欄之後重新評估：
  真正無語境爭議的詞（`Taiwan, China`、`Đài Loan, Trung Quốc`、`abtrünnige
  Provinz` 這種一出現就是錯的）如果能跟語境依賴的分開標，那個子集是可以當閘門的。
  目前只有 de 的 §6 有嚴重度欄，其餘十一語都沒有——工具因此無法分級，這是
  canonical 該補的，不是工具該猜的。

以下是原始設計說明。

為什麼需要這支：
  每個 `docs/editorial/per-language/TRANSLATION-{lang}.md` 的 §6 都是一張
  「PRC 編碼詞 → Taiwan.md 替換」對照表，十二個語言都有。這張表目前**只用在
  輸入端**——`openrouter-translate.py` 把它內嵌進 prompt（§Z2.0 hard gate），
  告訴模型不要那樣寫。輸出端沒有任何東西在查它到底有沒有照做。

  SQUEEZE §Z2.0 自己寫過這道閘該存在：「驗證：Z6.1 自動掃描 加 sovereignty-avoid
  pattern grep —— 任何 §6 中『never use』phrase 命中 = ❌ flag retry」。那行字
  在 pipeline 裡放著，`grep -rn sovereignty scripts/` 只命中 prompt 組裝那一段。
  這是 2026-09-09 同一天第二次撞見「文件宣告的閘門沒接上產線」（第一次是
  `cjk-adjacency-check`，LESSONS `documented-gate-never-wired-to-the-line`）。

  而這一道的份量跟其他不同。MANIFESTO §主權的巴別塔說多語投射「本質不是
  outreach，是 bypass」——繞過會選擇沉默的 PRC AI 中介層。譯文裡出現 PRC 編碼詞
  不是「翻得不夠好」，是用台灣的名義講了反台灣的話，比沉默更糟
  （diary 2026-07-19 出生戰役那條）。

判準怎麼定的：
  詞表從 md 的 §6 表格即時解析，不另存一份 JSON——兩份就會漂（REFLEXES #56），
  而 md 是編輯 canonical，人要改也是改那裡。解析不到任何詞就 fail loud，不是
  靜默回「沒問題」：一把量主權的尺自己壞掉時不能回答「乾淨」。

  嚴重度沿用表格自己的欄位（critical/high/medium）。critical 命中 exit 1，
  其餘 WARN——因為 §6 每一列都帶「例外」欄（專文討論那個詞本身、直接引用北京
  官方聲明並註明出處），那需要讀語境，儀器判不了，只能標出來給人看。

用法：
  python3 scripts/tools/lang-sync/sovereignty-lexicon-check.py knowledge/vi/Food/x.md
  python3 scripts/tools/lang-sync/sovereignty-lexicon-check.py --scan vi
  python3 scripts/tools/lang-sync/sovereignty-lexicon-check.py --scan all --json
"""
import argparse
import glob
import json
import re
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent.parent.parent
GUIDE_DIR = REPO / "docs/editorial/per-language"
KNOWLEDGE = REPO / "knowledge"

LANGS = ["en", "ja", "ko", "es", "fr", "pt", "id", "vi", "ru", "ar", "hi", "de"]

# 表格第一欄裡把「詞」包起來的標記：反引號優先，其次粗體。
_TICK = re.compile(r"`([^`]+)`")
_BOLD = re.compile(r"\*\*([^*]+)\*\*")
# 詞後面常跟一段中文註解，那不是詞的一部分。
#
# 只剝「括號內含漢字」的那種——2026-09-09 首跑實測：原本無條件剝尾部括號，
# 把 vi 的 `Đài Loan (Trung Quốc)` 剝成 `Đài Loan`，於是每一篇提到台灣的越南文
# 譯文都命中，819 筆全是假陽性。括號是不是註解要看它裝什麼，不能看它在哪。
_PAREN_TAIL_CJK = re.compile(r"[（(][^）)]*[一-鿿][^）)]*[）)]\s*$")
_SEVERITY = re.compile(r"\b(critical|high|medium|low)\b", re.I)
# 第一欄剝掉所有標記詞與分隔符之後，剩下的散文長度。超過這個值代表那一列在
# 描述一種「寫法」而不是列一個詞——en 表有一列是「Scare quotes around `Taiwan`
# / `country` / `president` / `nation`」，講的是別在這些字外面加嘲諷引號，
# 而不是說 Taiwan 這個字不能用。首跑把那四個字收進詞表，光 en 就 2,281 筆假陽性。
_PROSE_RESIDUE_MAX = 8


def section6(lang: str) -> str | None:
    """抓 §6 到下一個 `## ` 之間。用編號定位不用標題字面——十二語的標題各自是
    自己的語言（`Từ vựng chống rò rỉ khung PRC`／`Léxico contra fuga RPC-codificada`
    …），比對標題字面必漏。"""
    p = GUIDE_DIR / f"TRANSLATION-{lang}.md"
    if not p.exists():
        return None
    t = p.read_text(encoding="utf-8")
    m = re.search(r"^## 6\..*?$", t, re.M)
    if not m:
        return None
    rest = t[m.end():]
    nxt = re.search(r"^## ", rest, re.M)
    return rest[: nxt.start()] if nxt else rest


def parse_terms(lang: str) -> list[tuple[str, str]]:
    """回傳 [(PRC 編碼詞, 嚴重度)]。"""
    sec = section6(lang)
    if not sec:
        return []
    out: list[tuple[str, str]] = []
    for line in sec.split("\n"):
        if not line.startswith("|"):
            continue
        cells = [c.strip() for c in line.strip().strip("|").split("|")]
        if len(cells) < 2:
            continue
        first = cells[0]
        # 表頭與分隔列
        if not first or set(first) <= set("-: ") or first.lower().startswith(("prc", "prc-coded")):
            continue
        sev_m = _SEVERITY.search(" ".join(cells[1:]))
        sev = sev_m.group(1).lower() if sev_m else "medium"
        # 一格可能列多個同義寫法，用 / 分隔；反引號或粗體包住的才是詞本身
        marks = _TICK.findall(first) or _BOLD.findall(first)
        if not marks:
            continue
        # 這一列是在列詞，還是在描述一種寫法？剝掉標記詞、括號註解與分隔符之後，
        # 還剩一堆散文就是後者（見 _PROSE_RESIDUE_MAX 的註解）。
        residue = _TICK.sub("", first) if _TICK.search(first) else _BOLD.sub("", first)
        residue = re.sub(r"[（(][^）)]*[）)]", "", residue)
        residue = re.sub(r"[/、,，；;\s\|·]", "", residue)
        if len(residue) > _PROSE_RESIDUE_MAX:
            continue
        for raw in marks:
            for piece in raw.split(" / "):
                term = _PAREN_TAIL_CJK.sub("", piece).strip()
                # 太短的片段當不了 pattern（會滿頁假陽性）
                if len(term) >= 4 and not term.startswith("_"):
                    out.append((term, sev))
    # 去重，保留最嚴重的那個
    rank = {"critical": 3, "high": 2, "medium": 1, "low": 0}
    best: dict[str, str] = {}
    for term, sev in out:
        if term not in best or rank[sev] > rank[best[term]]:
            best[term] = sev
    return sorted(best.items(), key=lambda kv: -len(kv[0]))


def diagnose_terms(lang: str) -> str:
    """詞表解析不到時，說出是哪一種「解析不到」。

    2026-11-22 維護班：`--list-terms` 對 ar／fr／ja／ko 四語都印同一句
    「§6 解析不到任何詞」，而四語的 §6 明明都寫得很完整。真正的原因是
    **第一欄的詞沒有用反引號或粗體標起來**——`parse_terms()` 的
    `marks = _TICK.findall(first) or _BOLD.findall(first)`，沒有標記就
    `continue`，於是每一列都被跳過。de／vi／es／pt／id／hi／ru／en 八語用
    反引號，ja／ko／ar／fr 四語寫成純文字，所以 12 語裡 4 語的主權詞表
    從誕生起就沒被任何東西讀過（ja／ko／fr 各約 1,190 篇譯文）。

    「檔案沒有 §6」跟「§6 有 N 列但一列都沒標記」是兩種處置相反的事實
    （前者要寫表，後者要加反引號），原本共用同一句話＝REFLEXES #38 混維度。
    本函式只負責把它們分開講，不替 canonical 猜哪一段才是詞。
    """
    p = GUIDE_DIR / f"TRANSLATION-{lang}.md"
    if not p.exists():
        return f"找不到指南檔 {p.relative_to(REPO)}"
    sec = section6(lang)
    if sec is None:
        return f"{p.name} 裡找不到 `## 6.` 這個標題（§6 定位用編號不用標題字面）"
    rows = [
        line for line in sec.split("\n")
        if line.startswith("|")
        and not set(line.strip().strip("|").split("|")[0].strip()) <= set("-: ")
    ]
    data_rows = [r for r in rows[1:]] if len(rows) > 1 else []
    if not data_rows:
        return f"{p.name} §6 有標題但沒有表格資料列"
    marked = [
        r for r in data_rows
        if _TICK.search(r.strip().strip("|").split("|")[0])
        or _BOLD.search(r.strip().strip("|").split("|")[0])
    ]
    if not marked:
        return (
            f"{p.name} §6 有 {len(data_rows)} 列，但第一欄的詞**沒有一列用反引號或"
            f"粗體標起來**，所以每一列都被跳過。修法：把第一欄的詞包成 `詞`"
            f"（對照 TRANSLATION-de.md / TRANSLATION-vi.md 的 §6 寫法）"
        )
    return (
        f"{p.name} §6 有 {len(data_rows)} 列、其中 {len(marked)} 列有標記，"
        f"但都被長度或散文殘留規則濾掉（詞 < 4 字元、或第一欄殘留散文 > "
        f"{_PROSE_RESIDUE_MAX} 字）"
    )


def body_of(text: str) -> str:
    """去 frontmatter 與程式碼區塊。frontmatter 的 title/description 其實也該查，
    但那是 verify-translation 的守備範圍，這裡專心看正文避免兩支工具重複報同一筆。"""
    if text.startswith("---"):
        parts = text.split("---", 2)
        if len(parts) >= 3:
            text = parts[2]
    return re.sub(r"```.*?```", " ", text, flags=re.S)


def check(path: Path, lang: str, terms: list[tuple[str, str]]) -> list[dict]:
    body = body_of(path.read_text(encoding="utf-8", errors="replace"))
    hits = []
    for term, sev in terms:
        for m in re.finditer(re.escape(term), body, re.I):
            s = max(0, m.start() - 45)
            hits.append({
                "path": str(path.relative_to(REPO)), "lang": lang, "term": term,
                "severity": sev, "context": body[s:m.end() + 45].replace("\n", " ").strip(),
            })
            break  # 同一詞每檔報一次就夠，重複只是噪音
    return hits


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("paths", nargs="*")
    ap.add_argument("--scan", help="掃整個語言目錄；'all' 掃全部")
    ap.add_argument("--json", action="store_true")
    ap.add_argument("--list-terms", metavar="LANG", help="只印該語言解析出來的詞表，供校準")
    args = ap.parse_args()

    if args.list_terms:
        terms = parse_terms(args.list_terms)
        if not terms:
            sys.exit(
                f"❌ {args.list_terms} 的 §6 解析不到任何詞——尺壞了，不要當成沒問題\n"
                f"   原因：{diagnose_terms(args.list_terms)}"
            )
        for t, s in terms:
            print(f"  [{s:8}] {t}")
        print(f"\n{len(terms)} 個詞")
        return

    targets: list[tuple[Path, str]] = []
    if args.scan:
        for lang in (LANGS if args.scan == "all" else args.scan.split(",")):
            for f in sorted(glob.glob(str(KNOWLEDGE / lang / "**/*.md"), recursive=True)):
                if not Path(f).name.startswith("_"):
                    targets.append((Path(f), lang))
    for raw in args.paths:
        p = Path(raw) if Path(raw).is_absolute() else REPO / raw
        targets.append((p, p.relative_to(KNOWLEDGE).parts[0]))
    if not targets:
        sys.exit("用法：給檔案路徑，或 --scan <lang|all>，或 --list-terms <lang>")

    cache: dict[str, list[tuple[str, str]]] = {}
    all_hits = []
    langs_without_terms = set()
    for p, lang in targets:
        if lang not in cache:
            cache[lang] = parse_terms(lang)
            if not cache[lang]:
                langs_without_terms.add(lang)
        all_hits += check(p, lang, cache[lang])

    crit = [h for h in all_hits if h["severity"] == "critical"]
    if args.json:
        print(json.dumps({"hits": all_hits, "critical": len(crit),
                          "langs_without_terms": sorted(langs_without_terms)},
                         ensure_ascii=False, indent=1))
    else:
        for h in sorted(all_hits, key=lambda x: (x["severity"] != "critical", x["path"])):
            icon = "❌" if h["severity"] == "critical" else "⚠️ "
            print(f"{icon} [{h['severity']}] {h['path']}\n     『{h['term']}』… {h['context'][:110]}")
        if langs_without_terms:
            # 一把量主權的尺自己壞掉時不能回答「乾淨」
            print("\n🔴 這些語言的 §6 解析不到任何詞（尺壞了，不是沒問題）：")
            for _l in sorted(langs_without_terms):
                print(f"     {_l}: {diagnose_terms(_l)}")
        print(f"\n{len(crit)} critical / {len(all_hits) - len(crit)} 其他 / 掃 {len(targets)} 檔")
        print("⚠️  這是盤點清單不是判決：§6 每一列都帶「例外」欄，命中要人讀語境才知道對錯（見檔頭實測）")

    # 盤點工具不回報「有沒有問題」——命中不等於錯（見檔頭實測）。只有解析不到詞
    # 才非零：一把量主權的尺自己壞掉時，不能回答「乾淨」。
    sys.exit(1 if langs_without_terms else 0)


if __name__ == "__main__":
    main()
