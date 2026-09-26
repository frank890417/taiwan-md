#!/usr/bin/env python3
"""name-consistency-check.py — 同一個人在不同語言版本被拼成不同的名字。

2026-09-10 出生：一波裡連續撞到三種形態——
  · id〈戰後台灣文學〉宣稱用威妥瑪，`Pai Hsien-yung`（白先勇）確實是，但同一份清單裡
    `Ye Shitao`（葉石濤）、`Wang Wenxing`（王文興）、`Chen Yingzhen`、`Huang Chunming`
    全是漢語拼音，共 47 處。
  · ar〈台灣建築〉把王大閎寫成 `Wang Dahuang`（閎是 hóng 不是 huáng）、
    李祖原寫成 `Lee Zu-yuan`（他的通用名是 C.Y. Lee）、伊東豐雄寫成 `Ito Toyo`。
  · 台中州廳的森山松之助在四個語言裡有三種錯法。

**每一隻 agent 都在報告裡寫「已套用威妥瑪」**——問題不是不知道規則，是他們分不出
手上那個拼寫屬於哪一套。這是提示解決不了的，只能靠對照。

⚠️ 這支**刻意不判斷誰對**。原因是 2026-09-10 建表時發現「拿 en 標題當正規形式」本身就錯：
  · 林琪兒的 zh 原文寫「林琪兒（Kjell N. Lindgren）」——fr/id 用 Kjell Lindgren 是對的，
    en/es/pt 的 `Lin Chi-er`／`Lin Qier`／`Lin Kuei-er` 反而是把英文名音譯回去再拼回來。
  · 簡立峰的 slug 是 `jamie-lin-ai-industry-pioneer`，但 Jamie Lin 是林之晨，不同人。
    文章內容是簡立峰沒錯，錯的是網址。
所以「哪個拼法是對的」是編輯判斷，要人來定（OBSERVER-QUEUE #63）。這支只做兩件
不需要裁決就成立的事：

  規則 A（新變體）：譯文替某人用了一個**其他語言版本都沒出現過**的拉丁拼寫 → warn。
      判準是「你發明了第 N 種拼法」，不是「你拼錯了」。
  規則 B（張冠李戴）：譯文用的拼寫是**另一個人**的已知拼寫 → 硬失敗。
      實例：施振榮的 fr 版標題寫成 `Shih Ming-te`——那是施明德，完全不同的人。

資料來源 `name-variants.json` 由 `--rebuild` 從全庫掃出來，含 zh 原文括號裡自己給的拼寫
（那 16 筆最權威）。它是**盤點不是權威**，curation 之前不要拿它當判準。

用法：
    python3 name-consistency-check.py <譯文...>    # exit 1 = 有張冠李戴
    python3 name-consistency-check.py --audit      # 列出全部跨語言歧異
    python3 name-consistency-check.py --rebuild    # 重掃 name-variants.json
    python3 name-consistency-check.py --names-for People/施振榮.md fr   # 派工單用的拼寫表
"""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parents[3]
TABLE = Path(__file__).with_name("name-variants.json")
# 盤點與裁決分檔。TABLE 是 --rebuild 從標題掃出來的，會忠實記下錯的拼法；AUTHORITY 是
# 人手寫的覆寫層，優先。混在一份檔裡的話 --rebuild 會把人的裁決刷掉。
AUTHORITY = Path(__file__).with_name("name-authority.json")
LANGS = ["en", "es", "fr", "pt", "id", "vi", "de", "ru", "hi", "ar", "ja", "ko"]

# 太短或太通用的拼寫不當指紋——「Li Ang」「San Mao」這種兩個常見音節的組合，
# 在別人的文章裡撞到的機率高過真的張冠李戴。四個字元以下或單一 token 一律不比。
def _usable(form: str) -> bool:
    return len(form) >= 6 and len(form.split()) >= 2


def _slugify(form: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", form.lower()).strip("-")


def load() -> dict:
    return json.loads(TABLE.read_text(encoding="utf-8")) if TABLE.exists() else {}


def load_authority() -> dict:
    if not AUTHORITY.exists():
        return {}
    return json.loads(AUTHORITY.read_text(encoding="utf-8")).get("authority", {})


def lang_of(path: Path) -> str | None:
    try:
        parts = path.resolve().relative_to(REPO / "knowledge").parts
    except ValueError:
        return None
    return parts[0] if len(parts) >= 2 and re.fullmatch(r"[a-z]{2}", parts[0]) else None


def zh_source(text: str) -> Path | None:
    m = re.search(r"^translatedFrom:\s*['\"]?([^'\"\n]+)", text, re.M)
    return (REPO / "knowledge" / m.group(1).strip()) if m else None


def _owner(path: Path, tbl: dict) -> str | None:
    """這個檔案是誰的人物頁？不是人物頁就回 None。"""
    try:
        rel = path.resolve().relative_to(REPO / "knowledge")
    except ValueError:
        return None
    slug = "/".join(rel.parts[1:]).replace(".md", "")
    for han, v in tbl.items():
        if v["slug"] == slug:
            return han
    return None


def scan(path: Path, tbl: dict) -> tuple[list[str], list[str]]:
    """回傳 (硬失敗, 需人看)。

    ⚠️ 範圍刻意只到「某人自己的人物頁」。第一版是全文掃「譯文有沒有用到別人的拼寫」，
    全庫掃出 277 處，抽樣一看誤報居多：`蔣中正` 跟原文寫的 `蔣介石` 是同一個人的不同稱呼、
    `Lin Liang` 這種兩音節拼寫會跟別的林姓撞。判準太寬，數字就是雜訊（REFLEXES #66）。
    收到人物頁之後，「這一頁是誰的」是已知的，比對不需要任何猜測。
    """
    if not path.is_file():
        return [], []
    owner = _owner(path, tbl)
    if owner is None:
        return [], []
    text = path.read_text(encoding="utf-8")
    m = re.search(r"^title:\s*['\"](.+?)['\"]\s*$", text, re.M)
    if not m:
        return [], []
    lead = re.split(r"[:：]", m.group(1))[0].strip()
    if not re.fullmatch(r"[A-Za-z'’\-\. ]{3,40}", lead):
        return [], []          # 非拉丁標題（ru/hi/ar/ja/ko）或標題是引言／綽號，不比

    v = tbl[owner]
    known = set(v["forms"]) | ({v["zh_given"]} if v["zh_given"] else set())

    hard, review = [], []
    # 規則 B：這個拼寫同時掛在別人名下。判準演化過三次，兩次都是自己把自己騙了：
    #   v1「lead 不在 owner 的 forms 裡」→ 零命中。表是從這些檔案建出來的，錯的拼法
    #      會被記成 owner「自己的」拼法之一，判準自我循環。
    #   v2「同一個拼寫掛在兩個以上不同的人名下」→ 命中 2 處，但是**對稱**的：
    #      `Shih Ming-te` 在施明德的 en 頁跟施振榮的 fr 頁各報一次，而施明德那邊是對的。
    #      兩邊都只有一個語言在用，票數分不出誰是原主。
    #   v3（現行）用 slug 當歸屬證據——`People/shih-ming-te` 這個網址就是施明德的。
    #      「這個拼寫 slug 化之後等於誰的網址」不是編輯裁決，是查表，所以這支仍然
    #      不判斷哪個羅馬拼音對（那是 OBSERVER-QUEUE #63 的事）。
    #      代價：slug 本身錯的人（簡立峰的 slug 寫成 jamie-lin-…）這條救不到。
    if _usable(lead) and _slugify(lead) != v["slug"].split("/")[-1]:
        also = [o for o, ov in tbl.items()
                if o != owner and lead in ov["forms"]
                and _slugify(lead) == ov["slug"].split("/")[-1]]
        if also:
            hard.append(f"這是 {owner} 的頁面，標題卻用了 {'／'.join(also)} 的拼寫「{lead}」")
    # 規則 A：少數形。原本寫成「lead 不在 owner 的 forms 裡」，全庫 0 命中——同一個
    # 自我循環：表從標題建出來，標題必然在表裡。閘門模式下它其實會動（表是已 commit
    # 的狀態，新譯文的標題確實是新的），但那代表這條**只在新譯文上有效、盤點時失效**，
    # 是把量測工具跟閘門工具混成一支的後果。改成兩種模式都成立的判準：
    # 「只有你這一個語言這樣拼，另外有 ≥2 個語言拼成同一個別的樣子」。
    if not hard:
        mine = v["forms"].get(lead, [])
        major = [(f, ls) for f, ls in v["forms"].items() if f != lead and len(ls) >= 2]
        if len(mine) == 1 and major:
            major.sort(key=lambda x: -len(x[1]))
            alt = "、".join(f"{f}({','.join(ls)})" for f, ls in major)
            # 大小寫差異單獨一桶。全庫 132 筆少數形裡有一大族是 `Chuang Chih-Yuan`
            # 對 `Chuang Chih-yuan`——威妥瑪連字號後小寫，這是排版慣例不是認錯人，
            # 跟「洪婕倪被拼成 Hong Li」擺在同一份清單裡會稀釋掉後者。
            if any(f.lower() == lead.lower() for f, _ in major):
                review.append(f"[大小寫] {owner}：{mine[0]} 用「{lead}」，多數用 {major[0][0]}")
            else:
                review.append(f"{owner}：只有 {mine[0]} 拼成「{lead}」，另有 {alt}")
        elif lead not in known:
            review.append(f"{owner}：標題用「{lead}」，其他語言版本用 {sorted(known)}")
    return hard, review


# 表項的漢字同時是一句普通白話的那幾個。`People/這群人.md` 是 YouTube 頻道，而
# 〈外省人〉裡的「這群人」是白話的「這群人」——第一版對 hi 派工單印出「這群人 → This
# Group」，等於叫 agent 把一句白話翻成頻道名。
# 兩種自動判準都試過都壞掉，記在這裡免得下次再試一遍（REFLEXES #66）：
#   · 出現篇數：這群人 39 篇，夾在侯孝賢 32、劉銘傳 33 之間，蔡英文 83 篇——分不出來。
#   · 正文關鍵字（樂團／團體／頻道…）：57 項命中，張雨生、賴清德、李遠哲全在裡面，
#     因為他們的文章順口提到樂團。誤報過半。
# 所以改成手維護＋一條精確守則：這幾個詞只有被「」／[[]]／《》框起來才算名字。
AMBIGUOUS = {"這群人"}


def _marked(text: str, han: str) -> bool:
    return any(f"{a}{han}{b}" in text for a, b in
               (("「", "」"), ("[[", "]]"), ("《", "》"), ("『", "』")))


# 同語言語料裡的括號對照（2026-09-26）。名字表只收有人物頁的人，演員、編劇、學者、
# 地方人物全不在表上，派工單又說「表上沒有就音譯」，於是同一個人在同一個語言裡長出
# 第二種寫法：en〈植劇場〉把許光漢音譯成 Hsu Kuang-han，站上另外三篇早就寫 Greg Hsu；
# fr〈高速公路〉照著另一篇錯的寫了 Sun Xiu-luan。譯文習慣在第一次出現時附漢字，這些
# 括號本身就是一張沒人整理過的表。只收拉丁字母語言，日韓俄印阿的譯名不是這個形狀。
LATIN_TOKEN = r"[A-Z][A-Za-z'’.\-]*"
HAN_NAME = r"[一-鿿]{2,4}"
LATIN_BEFORE_HAN = re.compile(rf"((?:{LATIN_TOKEN}[ \t])+{LATIN_TOKEN})\s*[（(]({HAN_NAME})[）)]")
HAN_BEFORE_LATIN = re.compile(rf"({HAN_NAME})\s*[（(]({LATIN_TOKEN}(?:[ \t]{LATIN_TOKEN}){{1,3}})[）)]")
LATIN_LANGS = {"en", "es", "fr", "pt", "id", "vi", "de"}


# 句首的大寫虛詞不是名字的一部分：「In Taipei (台北)」「According Lee (李)」。
LEADING_NOISE = {"In", "At", "On", "The", "A", "An", "By", "For", "From", "With", "As", "And",
                 "But", "When", "After", "Before", "While", "According", "Both", "Le", "La",
                 "Les", "Du", "De", "Des", "El", "Los", "Las", "Der", "Die", "Das", "Em", "No",
                 "Na", "Di", "Ke", "Dan", "Của", "Và", "Ở", "Tại"}


def gloss_pairs(text: str) -> list[tuple[str, str]]:
    """(漢字, 拉丁寫法)。括號前的大寫詞取最後四個以內、剝掉句首虛詞：獎項與團體名常是
    三四個字（Golden Bell Awards、Cloud Gate Dance Theatre），只取兩個會切掉一半。"""
    out = []
    for m in LATIN_BEFORE_HAN.finditer(text):
        toks = m.group(1).split()[-4:]
        while len(toks) > 1 and toks[0] in LEADING_NOISE:
            toks = toks[1:]
        out.append((m.group(2), " ".join(toks)))
    for m in HAN_BEFORE_LATIN.finditer(text):
        out.append((m.group(1), m.group(2)))
    return out


def corpus_glosses(lang: str) -> dict[str, dict[str, set[str]]]:
    """{漢字: {拉丁寫法: {出現的檔名}}}，掃 knowledge/<lang>/ 全部譯文。"""
    idx: dict[str, dict[str, set[str]]] = {}
    for p in (REPO / "knowledge" / lang).rglob("*.md"):
        try:
            text = p.read_text(encoding="utf-8")
        except OSError:
            continue
        for han, form in gloss_pairs(text):
            idx.setdefault(han, {}).setdefault(form, set()).add(p.name)
    return idx


def names_for(zh_path: str, lang: str, tbl: dict) -> int:
    """派工單用：這篇 zh 原文提到的人，在別的語言已經怎麼拼。

    這是「升級產線」的那一半。閘門只能在交件後說「你拼錯了」，而 agent 拼錯的原因
    不是不知道規則——2026-09-10 每一隻都在報告裡寫「已套用威妥瑪」，錯的是他們分不出
    手上那個字串屬於哪一套。分不出來的東西，用查表取代推導。
    """
    src = REPO / "knowledge" / zh_path.replace("knowledge/", "", 1)
    if not src.exists():
        print(f"找不到 {src}", file=sys.stderr)
        return 2
    text = src.read_text(encoding="utf-8")
    auth = load_authority()
    rows = []
    for han, v in sorted(tbl.items()):
        if han not in text:
            continue
        if han in AMBIGUOUS and not _marked(text, han):
            continue
        if han in auth:
            rows.append((han, auth[han]["form"], "已裁決（name-authority.json）"))
            continue
        if v["zh_given"]:
            rows.append((han, v["zh_given"], "zh 原文自己給的"))
            continue
        best = max(v["forms"].items(), key=lambda x: (len(x[1]), x[0]), default=None)
        if not best:
            continue
        form, ls = best
        if lang in ls:
            continue          # 這個語言已經跟多數一致，不用再說
        mine = next((f for f, l2 in v["forms"].items() if lang in l2), None)
        note = f"{lang} 目前寫 {mine} ← 跟多數不一樣" if mine else f"{len(ls)} 個語言用"
        rows.append((han, form, note))
    if rows:
        print(f"## 人名拼寫（{len(rows)} 位，取自 name-variants.json，不要自己推導）")
        for han, form, note in rows:
            print(f"  {han} → {form}    # {note}")
    else:
        print(f"（{zh_path} 沒有對照表覆蓋到的人名）")
    if lang in LATIN_LANGS:
        covered = {han for han, _, _ in rows}
        seen = []
        for han, forms in corpus_glosses(lang).items():
            if han in covered or han not in text:
                continue
            seen.append((text.index(han), han, forms))
        if seen:
            print(f"\n## 站上既有寫法（{lang} 語料裡的「拉丁名 (漢字)」括號對照，表上沒有的名字）")
            for _, han, forms in sorted(seen)[:60]:
                ranked = sorted(forms.items(), key=lambda kv: -len(kv[1]))
                shown = "｜".join(f"{f}（{len(files)} 篇）" for f, files in ranked[:3])
                warn = "    # 有分歧：照 TRANSLATION 指南挑，不要發明第 N 種" if len(ranked) > 1 else ""
                print(f"  {han} → {shown}{warn}")
    if lang in LATIN_LANGS:
        print("語料寫法是盤點不是權威：跟 TRANSLATION 指南衝突時（例如台灣人名寫成拼音）照指南，並在回報裡列出。")
    print("表上與語料都沒有的人：音譯＋括號附漢字，不要拿你知道的名人填空。")
    return 0


def rebuild() -> int:
    st = json.loads((REPO / "knowledge" / "_translation-status.json").read_text(encoding="utf-8"))
    out = {}

    def title_name(p: Path) -> str | None:
        m = re.search(r"^title:\s*['\"](.+?)['\"]\s*$", p.read_text(encoding="utf-8"), re.M)
        if not m:
            return None
        n = re.split(r"[:：]", m.group(1))[0].strip()
        return n if re.fullmatch(r"[A-Za-z'’\-\. ]{3,40}", n) else None

    for art, v in st["byArticle"].items():
        if not art.startswith("People/"):
            continue
        han = art.split("/")[1].replace(".md", "")
        if not re.fullmatch(r"[一-鿿·‧]{2,5}", han):
            continue
        ref = next((x["path"] for x in v["translations"].values() if x.get("path")), None)
        if not ref:
            continue
        slug = ref.split("/", 1)[1]
        forms: dict[str, list[str]] = {}
        for L in LANGS:
            p = REPO / "knowledge" / L / slug
            if p.exists():
                n = title_name(p)
                if n:
                    forms.setdefault(n, []).append(L)
        zt = (REPO / "knowledge" / art).read_text(encoding="utf-8")
        m = re.search(re.escape(han) + r"[（(]([A-Z][A-Za-z'’\-\. ]{2,34})[）)]", zt)
        if not forms and not m:
            continue
        out[han] = {"slug": slug.replace(".md", ""),
                    "zh_given": m.group(1).strip() if m else None,
                    "forms": {n: sorted(ls) for n, ls in forms.items()}}
    TABLE.write_text(json.dumps(out, ensure_ascii=False, indent=1, sort_keys=True), encoding="utf-8")
    multi = sum(1 for v in out.values() if len(v["forms"]) > 1)
    print(f"✅ {len(out)} 人寫進 {TABLE.name}；{multi} 人跨語言拼法不一致")
    return 0


def audit(tbl: dict) -> int:
    rows = [(h, v) for h, v in tbl.items() if len(v["forms"]) > 1]
    print(f"════ {len(rows)} 人跨語言拼法不一致（共 {len(tbl)} 人）════")
    for h, v in sorted(rows):
        zg = f"  zh 原文給：{v['zh_given']}" if v["zh_given"] else ""
        print(f"\n{h}  slug={v['slug']}{zg}")
        for f, ls in sorted(v["forms"].items(), key=lambda x: -len(x[1])):
            print(f"    {f:36} {','.join(ls)}")
    print("\n哪個拼法是對的要人來定（OBSERVER-QUEUE #63）——這支不裁決。")
    return 0


def main() -> int:
    args = sys.argv[1:]
    if not args:
        print(__doc__)
        return 2
    if args[0] == "--rebuild":
        return rebuild()
    tbl = load()
    if not tbl:
        print("找不到 name-variants.json，先跑 --rebuild")
        return 2
    if args[0] == "--audit":
        return audit(tbl)
    if args[0] == "--names-for":
        if len(args) < 3:
            print("用法：--names-for <zh 原文路徑> <目標語言>")
            return 2
        return names_for(args[1], args[2], tbl)

    total_hard = 0
    for a in args:
        p = Path(a)
        if lang_of(p) is None:
            continue
        hard, review = scan(p, tbl)
        if hard or review:
            print(f"{'❌' if hard else '👀'} {p.resolve().relative_to(REPO)}")
            for h in hard:
                print(f"     張冠李戴：{h}")
            for r in review[:4]:
                print(f"     需人看：{r}")
        total_hard += len(hard)
    if total_hard:
        print(f"\n════ {total_hard} 處張冠李戴 ════")
        print("譯文用了另一個人的拼寫。實例：施振榮的 fr 版標題寫成 `Shih Ming-te`——那是施明德。")
        return 1
    print("✅ 沒有把某個人寫成另一個人")
    return 0


if __name__ == "__main__":
    sys.exit(main())
