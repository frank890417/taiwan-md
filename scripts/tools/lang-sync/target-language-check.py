#!/usr/bin/env python3
"""
target-language-check.py — 譯文到底是不是它宣稱的那個語言。

為什麼需要這支：
  2026-09-09 一隻委派 agent 把 `Technology/Threads在台灣.md` 翻成**英文**寫進
  `knowledge/de/`，而委派層的六道閘全部放行——結構對靶 55/55、verify 17 pass、
  cjk-leak 0、cjk-adjacency 0、article-health hard=0。整套閘門量的都是形式
  （結構數字、中文殘留、網址一致、frontmatter 欄位），**沒有任何一道在問
  「這是不是目標語言」**。一篇英文譯文對所有既有檢查來說都是完美的德文譯文。

  這是 REFLEXES #69「形式閘門 ≠ 意義閘門」最基本的一格。它不會被讀者以外的
  任何東西抓到，而讀者抓到的時候，那篇已經在站上了。

判準為什麼是這樣：
  非拉丁書寫系統（ru/ar/hi/ja/ko）用字符集判定，因為書寫系統本身就是最強的
  訊號，不會誤判。拉丁字母語言（en/de/es/fr/pt/id/vi）彼此共用字母，只能靠
  功能詞（冠詞、介系詞、連接詞）——這些詞在任何一篇散文裡都必然大量出現，
  而且跨語言幾乎不重疊。用功能詞而不是內容詞，是因為內容詞會被專有名詞
  （台灣地名、人名、品牌）稀釋，而功能詞不會。

  刻意不引入 langdetect / fasttext 這類套件：多一個相依就是產線多一個會壞的
  地方，而這裡要判的只有十二個已知語言的二選一，功能詞表就夠了。

  分數低於門檻不代表一定錯——短文、清單體、程式碼密集的文章功能詞會偏少。
  所以輸出的是「最像哪個語言」加分差，讓呼叫端決定；只有在「判定語言 ≠ 目標
  語言且分差夠大」時才 hard fail。

  整篇多數票看不到局部漂移（2026-09-18 heartbeat 補第二把尺）：
  hi/ar/ru 有 1,100+ 篇譯文的**尾段**（媒體授權說明、參考資料區、腳註描述）整段是
  韓文——本機模型翻到長輸出的尾巴語言漂到韓文，正文仍是天城文／阿拉伯文，所以
  整篇字符占比的多數票照樣把它判成目標語言。cjk-leak-check 只看漢字四連且豁免
  腳註行，看不見韓文。所以多加一條**逐行**判準：剝掉連結文字、引號、括號、網址
  之後，一行裡韓文字 ≥ 4 且不少於目標語言字母數，就是「外來文字行」；兩行以上、
  或單行 ≥ 20 個韓文字而目標語言字母為零，hard fail；恰一行 warn。
  只量韓文不量假名：假名的合法提及密度太高（莫那·魯道的日文原句在九個語系都是
  blockquote 引文），同一把尺對假名在 9 語系各誤殺 1 篇。單字級的融合殘留
  （印地文句子裡掉一個「추진」）不在這把尺的射程，那是 cjk-residue-check 的事。

  2026-09-26 逐行尺擴到西里爾字母／天城文／阿拉伯文：委派層一隻 ja agent 回報寫到
  一半看見自己的段落冒出俄文碎片（當場改掉）。回頭用同一把尺掃全庫，韓文以外的漂移
  也已經在站上：id 一篇的腳註描述整段是阿拉伯文、ko 一篇段落之間掉了一截天城文
  「ीकरण」、id 一篇整篇是印地文（整篇多數票已擋，逐行尺是第二道）。這三種文字在
  全庫零誤判——沒有任何一行合法的俄文／印地文／阿拉伯文提及被標到——所以直接納入。
  每語跳過自己的文字（ru 不量西里爾、ko 不量韓文），ko 因此第一次有逐行尺。
  假名仍不量，理由同上。

用法：
  python3 scripts/tools/lang-sync/target-language-check.py knowledge/de/Foo/bar.md
  python3 scripts/tools/lang-sync/target-language-check.py --scan de        # 掃整個語言目錄
  python3 scripts/tools/lang-sync/target-language-check.py --scan all --json
"""
import argparse
import json
import re
import sys
import unicodedata
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent.parent.parent
KNOWLEDGE = REPO / "knowledge"

# 非拉丁語言：字符集即判準（範圍取自 Unicode block）
SCRIPT_RANGES = {
    "ru": r"[Ѐ-ӿ]",       # Cyrillic
    "ar": r"[؀-ۿ]",       # Arabic
    "hi": r"[ऀ-ॿ]",       # Devanagari
    "ko": r"[가-힯]",       # Hangul syllables
    "ja": r"[぀-ゟ゠-ヿ]",  # Hiragana + Katakana（漢字不算，會跟 zh 撞）
}

# 拉丁語言：功能詞。刻意只收冠詞/介系詞/連接詞/助動詞，不收內容詞。
FUNCTION_WORDS = {
    "en": {"the", "and", "of", "to", "in", "that", "is", "for", "with", "as", "was", "on", "are", "it", "this", "by", "from", "has", "but", "not"},
    "de": {"der", "die", "das", "und", "ist", "nicht", "von", "mit", "für", "den", "dem", "ein", "eine", "auch", "sich", "wurde", "werden", "auf", "im", "des", "zu", "als", "aber", "durch", "über"},
    "es": {"de", "la", "el", "que", "en", "los", "del", "se", "las", "por", "con", "una", "para", "es", "más", "como", "pero", "sus", "al", "lo"},
    "fr": {"de", "la", "le", "les", "des", "et", "en", "un", "une", "du", "que", "pour", "dans", "qui", "est", "sur", "par", "au", "aux", "plus"},
    "pt": {"de", "que", "do", "da", "em", "para", "com", "uma", "os", "as", "no", "na", "por", "mais", "dos", "das", "foi", "ao", "como", "mas"},
    "id": {"yang", "dan", "di", "ini", "itu", "dengan", "untuk", "dari", "pada", "tidak", "dalam", "adalah", "akan", "juga", "oleh", "sebagai", "ke", "atau", "telah", "para"},
    "vi": {"của", "và", "là", "các", "có", "được", "trong", "người", "những", "một", "cho", "với", "để", "không", "này", "đã", "khi", "về", "từ", "tại"},
}

# 拉丁字母詞的字元類。越南文的疊加聲調字母住在 U+1E00–1EFF（ạ ả ấ ợ ữ⋯），
# 舊字元類只收到 U+024F，「được／của／những／với／tại」被切成碎片，vi 功能詞表
# 有一半永遠比對不到：全庫 vi 平均分數 0.049，補上後 0.130（2026-09-26 實測，
# 判定結果零變動——vi 只是一直在用三分之一的訊號險勝）。跟同日 cjk-adjacency-check
# 修掉的是同一個字元範圍的病。
LATIN_WORD = r"[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF]+"

LATIN_LANGS = set(FUNCTION_WORDS)
ALL_LANGS = sorted(set(SCRIPT_RANGES) | LATIN_LANGS)

# 判定語言 ≠ 目標語言時，領先幅度要多大才算 hard fail。
# 設 1.5 倍而不是「只要領先就 fail」：es/pt、id/vi 這幾組功能詞有零星重疊，
# 短文上會出現接近的分數，那種情況該給人看不該直接擋。
FAIL_RATIO = 1.5
MIN_TOKENS = 80  # 低於這個字數的正文不判（清單體、極短文）


def body_of(text: str) -> str:
    """去掉 frontmatter 與程式碼區塊——它們的語言跟譯文語言無關。
    先轉 NFC：有 32 篇 vi 以 NFD 存檔（基底字母＋組合聲調符號），不轉的話同一個
    功能詞在兩種存法下是兩個字串。"""
    text = unicodedata.normalize("NFC", text)
    if text.startswith("---"):
        parts = text.split("---", 2)
        if len(parts) >= 3:
            text = parts[2]
    text = re.sub(r"```.*?```", " ", text, flags=re.S)
    text = re.sub(r"`[^`]*`", " ", text)
    text = re.sub(r"https?://\S+", " ", text)          # 網址裡的英文單字會污染判定
    text = re.sub(r"\[\^[^\]]*\]:?", " ", text)
    return text


def score(text: str) -> dict[str, float]:
    """回傳每個語言的分數。非拉丁看字符佔比，拉丁看功能詞佔比，兩者都正規化到 0-1。"""
    body = body_of(text)
    out: dict[str, float] = {}
    total_chars = max(len(body), 1)
    for lang, pat in SCRIPT_RANGES.items():
        out[lang] = len(re.findall(pat, body)) / total_chars

    words = re.findall(LATIN_WORD + r"|[А-я]+", body.lower())
    n = len(words)
    if n >= MIN_TOKENS:
        for lang, fw in FUNCTION_WORDS.items():
            out[lang] = sum(1 for w in words if w in fw) / n
    else:
        for lang in FUNCTION_WORDS:
            out.setdefault(lang, 0.0)
    return out


# 西里爾字母的近親語言互換，靠字元區間分不出來——它們共用同一個 Unicode block。
# 2026-09-10：`ru/People/tsai-heipi.md` **整篇是烏克蘭文**（「народився」不是
# 「родился」、「нікнейм」不是「никнейм」），1,669 個烏克蘭專有字母對 39 個俄文
# 專有字母，而這支檢查器判它 ok 並讓它上線。用字母表差集當判準：
#   烏克蘭有、俄文沒有：і ї є ґ
#   俄文有、烏克蘭沒有：ы э ъ ё
# 專有字母數反過來就是整篇語言錯，不是零星混入。
CYRILLIC_EXCLUSIVE = {
    "ru": (re.compile(r"[ыэъё]"), re.compile(r"[іїєґ]"), "烏克蘭文"),
    "uk": (re.compile(r"[іїєґ]"), re.compile(r"[ыэъё]"), "俄文"),
}


def cyrillic_sibling_check(text: str, target: str) -> str | None:
    """近親西里爾語誤植：回傳錯誤描述，沒問題回 None。"""
    pair = CYRILLIC_EXCLUSIVE.get(target)
    if pair is None:
        return None
    own, other, other_name = pair
    n_own, n_other = len(own.findall(text)), len(other.findall(text))
    if n_other > n_own and n_other >= 20:
        return f"整篇疑似{other_name}——{other_name}專有字母 {n_other} 個 > {target} 專有字母 {n_own} 個"
    return None


# 外來文字行：局部語言漂移的尺（整篇多數票看不到）。剝除的是「提及」會住的位置——
# 連結文字（韓文來源的標題）、引號／括號（「대만감성」這種被討論的詞）、網址、腳註標籤。
# blockquote 整行豁免：原文引句（莫那·魯道的日文遺言）本來就該是外語。
FOREIGN_STRIP = re.compile(
    r"```.*?```|`[^`]*`|https?://\S+|\[[^\]]*\]\([^)]*\)|\([^)]*\)|（[^）]*）"
    r"|\"[^\"]*\"|“[^”]*”|«[^»]*»|「[^」]*」|『[^』]*』|\[\[[^\]]*\]\]|\[\^[^\]]*\]:?",
    re.S,
)
# 逐行要量的外來文字：本機模型長輸出漂去的方向。每語跳過自己的文字。
FOREIGN_SCRIPTS = {
    "ko": ("韓文", re.compile(r"[가-힣]")),
    "ru": ("西里爾字母", re.compile(SCRIPT_RANGES["ru"])),
    "hi": ("天城文", re.compile(SCRIPT_RANGES["hi"])),
    "ar": ("阿拉伯文", re.compile(SCRIPT_RANGES["ar"])),
}
LATIN_LETTERS = r"[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF]"
OWN_SCRIPT = {
    "ru": SCRIPT_RANGES["ru"],
    "ar": SCRIPT_RANGES["ar"],
    "hi": SCRIPT_RANGES["hi"],
    "ko": SCRIPT_RANGES["ko"],
    "ja": r"[぀-ゟ゠-ヿ一-鿿]",  # ja 的「自己的字」含漢字，外來文字行才會是少數
}
FOREIGN_MIN_CHARS = 4      # 一行至少幾個外來字才算數（低於這個是單字融合殘留，另一把尺）
FOREIGN_SOLO_CHARS = 20    # 單行 ≥ 這個數且目標語言字母為零 → 直接 fail


def foreign_script_check(text: str, target: str) -> tuple[str, str]:
    """回傳 (verdict, note)：verdict ∈ {"ok", "warn", "fail"}。

    note 以「<文字>漂入[<代碼>]」開頭，babel-dispatch 靠方括號裡的代碼記
    fail_reason（foreign-script[ar]），人讀前半段。

    吃原始全文而不是 body_of() 的產物：行號要對得回檔案（body_of 會把程式碼區塊
    壓成一格，行號會漂），frontmatter 只跳過不重排。NFC 不動換行，行號照樣對得上。"""
    text = unicodedata.normalize("NFC", text)
    own = re.compile(OWN_SCRIPT.get(target, LATIN_LETTERS))
    scripts = [(code, name, pat) for code, (name, pat) in FOREIGN_SCRIPTS.items() if code != target]
    start = 1
    m = re.match(r"^---\n.*?\n---\n", text, re.S)
    if m:
        start = text[: m.end()].count("\n") + 1
        text = text[m.end():]
    bad: list[tuple[int, str, str, int, int, str]] = []
    for i, line in enumerate(text.splitlines(), start):
        if line.lstrip().startswith(">"):
            continue
        stripped = FOREIGN_STRIP.sub(" ", line)
        for code, name, pat in scripts:
            h = len(pat.findall(stripped))
            if h < FOREIGN_MIN_CHARS:
                continue
            o = len(own.findall(stripped))
            if h >= o:
                bad.append((i, code, name, h, o, line.strip()[:60]))
                break
    if not bad:
        return "ok", ""
    _, code, name, h1, o1, snippet = bad[0]
    per_script = {}
    for b in bad:
        per_script[b[2]] = per_script.get(b[2], 0) + 1
    mix = "、".join(f"{n} {c} 行" for n, c in per_script.items())
    note = (f"{name}漂入[{code}]：{len(bad)} 行以外來文字為主（{mix}），第一處 L{bad[0][0]}"
            f"（{name} {h1} 字 vs {target} {o1} 字）「{snippet}」")
    if len(bad) >= 2 or any(o == 0 and h >= FOREIGN_SOLO_CHARS for _, _, _, h, o, _ in bad):
        return "fail", note
    return "warn", note


def judge(path: Path, target: str) -> dict:
    text = path.read_text(encoding="utf-8", errors="replace")
    body = body_of(text)
    words = re.findall(LATIN_WORD, body.lower())
    scores = score(text)
    ranked = sorted(scores.items(), key=lambda kv: kv[1], reverse=True)
    best, best_s = ranked[0]
    tgt_s = scores.get(target, 0.0)

    sibling = cyrillic_sibling_check(body, target)
    foreign_verdict, foreign_note = foreign_script_check(text, target)
    verdict = "ok"
    if sibling:
        verdict = "fail"
    elif len(words) < MIN_TOKENS and target in LATIN_LANGS:
        verdict = "skip-too-short"
    elif best == target:
        verdict = "ok"
    elif tgt_s == 0 or best_s > tgt_s * FAIL_RATIO:
        verdict = "fail"
    else:
        verdict = "warn"
    # 整篇語言錯是更根本的病，先報它；整篇沒錯才輪到局部的外來文字漂入
    note = sibling or ""
    if verdict in ("ok", "skip-too-short", "warn") and not sibling:
        if foreign_verdict == "fail":
            verdict, note = "fail", foreign_note
        elif foreign_verdict == "warn" and verdict == "ok":
            verdict, note = "warn", foreign_note
    return {
        "path": str(path.relative_to(REPO)),
        "target": target,
        "detected": best,
        "verdict": verdict,
        "target_score": round(tgt_s, 4),
        "detected_score": round(best_s, 4),
        "tokens": len(words),
        "note": note,
    }


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("paths", nargs="*", help="譯文檔案路徑（語言從 knowledge/<lang>/ 推得）")
    ap.add_argument("--scan", help="掃整個語言目錄；'all' 掃全部")
    ap.add_argument("--json", action="store_true")
    args = ap.parse_args()

    targets: list[tuple[Path, str]] = []
    if args.scan:
        langs = ALL_LANGS if args.scan == "all" else args.scan.split(",")
        for lang in langs:
            d = KNOWLEDGE / lang
            if not d.is_dir():
                continue
            for p in sorted(d.rglob("*.md")):
                if p.name.startswith("_"):
                    continue
                targets.append((p, lang))
    for raw in args.paths:
        p = Path(raw)
        if not p.is_absolute():
            p = REPO / raw
        try:
            lang = p.relative_to(KNOWLEDGE).parts[0]
        except ValueError:
            sys.exit(f"❌ {raw} 不在 knowledge/ 底下，推不出目標語言")
        targets.append((p, lang))

    if not targets:
        sys.exit("用法：給檔案路徑，或 --scan <lang|all>")

    results = [judge(p, lang) for p, lang in targets]
    fails = [r for r in results if r["verdict"] == "fail"]
    warns = [r for r in results if r["verdict"] == "warn"]

    if args.json:
        print(json.dumps({"results": results, "fail": len(fails), "warn": len(warns)}, ensure_ascii=False, indent=1))
    else:
        for r in fails:
            # 近親西里爾語誤植時字元分數會一樣（共用 Unicode block），只印分數會變成
            # 「目標 ru 但看起來是 ru」這種讀不懂的話。有 note 就印 note。
            reason = r.get("note") or (
                f"目標 {r['target']}（{r['target_score']}）但看起來是 "
                f"{r['detected']}（{r['detected_score']}）")
            print(f"❌ {r['path']}\n   {reason}")
        for r in warns:
            if r.get("note"):
                print(f"⚠️  {r['path']}: {r['note']} — 請人看")
            else:
                print(f"⚠️  {r['path']}: 目標 {r['target']}({r['target_score']}) vs 最像 {r['detected']}({r['detected_score']}) — 分數接近，請人看")
        print(f"\n{len(fails)} fail / {len(warns)} warn / {len(results)} 檔")

    sys.exit(1 if fails else 0)


if __name__ == "__main__":
    main()
