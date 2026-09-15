#!/usr/bin/env python3
"""
cjk-leak-check.py — detect partial zh leakage into any target-language body.

verify-translation.py's CJK checks only catch a whole field being byte-
identical to the zh source (the "whole tags array left in Chinese" class of
bug). They can't see a PARTIAL leak — a few zh words or even a whole sentence
left untranslated in the middle of an otherwise-genuine translation.

Two strategies depending on target script:
- ja/ko (CJK-script targets): raw CJK-presence isn't a signal — these
  languages legitimately contain Han characters (kanji/hanja) throughout.
  Instead: zh-only grammatical particles / function words with no legitimate
  standalone ja/ko usage (你/我們/因為/所以/一個/掐死/etc — deliberately
  excludes 的/了, false positives from legitimate ja suffix (先天的) and
  compound-word usage (終了)).
- en/es/fr/vi/id/pt/hi (non-CJK-script targets): the bar is much lower — ANY
  run of 4+ consecutive CJK Han characters in body prose (outside a
  parenthetical proper-noun gloss like "(李安)") is almost certainly a leak,
  since these languages have zero legitimate standalone Han vocabulary.

Found 2026-07-24 in the ko P1 batch: knowledge/ko/Art/taiwanese-cinema.md had
掐死/淘汰/烂死/这一次/悄悄 scattered through the body (Chinese-only figurative
verbs the model apparently gave up translating) plus one entire closing
paragraph left 100% in zh. None of that shows up as "field identical to
source" — it's word-level and sentence-level leakage inside otherwise-real
prose.

Usage:
  python3 cjk-leak-check.py knowledge/ko/Art/taiwanese-cinema.md [more files...]
  python3 cjk-leak-check.py --glob 'knowledge/ko/**/*.md'
  python3 cjk-leak-check.py --since-git <ref>  # files changed since a git ref
"""
import argparse
import re
import subprocess
import sys
from pathlib import Path
from typing import Optional

REPO = Path(__file__).resolve().parents[3]

# Only markers that are unambiguous: zh function words / zh-only figurative
# verbs, never legitimate ja/ko vocabulary on their own. Content nouns
# (e.g. 電影, 政治, 歷史) are deliberately excluded — those DO legitimately
# appear in ja/ko (shared kanji/hanja), so they're not leak signals.
#
# 2026-07-24 修正：表曾含 的/了/一個/淘汰，跟本 docstring 直接矛盾——
# 日文 〜的 是最常見形容詞後綴（言語的/構造的）、了 在 完了/終了、
# 一個（いっこ）是量詞、淘汰（自然淘汰）是常用語。抽測 3/3 健康 ja 檔
# 被誤判（的 ×63/×42/×9），ja lane 在 gate 面前 100% 死路，是 2026-07-24
# ja/ko 大量好譯文被 quarantine 降級的主因之一（另一半是全形括號豁免）。
ZH_ONLY_MARKERS = [
    "這個", "这个", "那個", "那个", "你", "我們", "我们",
    "沒有", "没有", "就是", "都是", "還是", "还是", "因為", "因为",
    "所以", "如果", "這樣", "这样", "這裡", "这里", "這次", "这次",
    "而且", "但是", "可是", "掐死", "烂死",
    "爛死", "淹死", "悄悄", "這一次", "这一次", "被宣告",
]


# Non-CJK-script targets (en/es/fr/vi/id/pt/hi): unlike ja/ko, these languages
# have ZERO legitimate standalone Han-character vocabulary, so the bar is much
# lower — any run of 4+ consecutive CJK Han characters in the body (outside a
# parenthetical, where a short proper-noun citation like "(李安)" is normal)
# is almost certainly a leak, not a false positive.
CJK_RUN_RE = re.compile(r"[一-鿿]{4,}")
# de 2026-09-05 birth：漏收會讓 knowledge/de/ 整批落入下面 ja/ko 分支（掃 zh-only
# 虛詞表而非 4+ 連續漢字），4+ 漢字真洩漏會被靜默放行——跟 cjk-residue-check.py／
# script-presence-check.py 已修過的同型「新語言掛在半路沒人發現」缺口。
NON_CJK_SCRIPT_LANGS = {"en", "es", "fr", "vi", "id", "pt", "hi", "ar", "ru", "de"}

# ─────────────── 合法保留原文的區域：一份清單，兩個分支共用 ───────────────
# 2026-07-25 抽出。此前 ja/ko 與非 CJK 兩個分支各自維護一套豁免，一天之內
# 冒出七個假陽性家族，每個都是「另一邊有、這邊漏了」——括號 gloss 只認半形、
# ja/ko marker 表含合法日文詞、書名號沒進豁免、ja/ko 漏括號、非 CJK 漏引述。
# 單看每次都像新的 edge case，看七次才知道病在「清單沒共用」。新增豁免現在
# 只改這一處（LESSONS 2026-07-25 vc=5）。
#
# 共同判準：上限 30 字。命名 gloss、作品名、短引語在界內；整句整段的洩漏
# 不會剛好躲在括號、書名號或引號裡。
LEGIT_ZH_SPANS = [
    re.compile(r"[(（][^()（）]{0,30}[)）]"),        # 命名 gloss：（李安）、(張懸 Deserts Chang)
    re.compile(r"《[^《》]{0,30}》|〈[^〈〉]{0,30}〉"),  # 作品名：《笠》詩刊、〈小情歌〉
    re.compile(r"「[^「」]{0,30}」|『[^『』]{0,30}』"),  # 短引語：古文引句、受訪者原話
]
PAREN_GLOSS_RE = LEGIT_ZH_SPANS[0]      # 舊名保留，避免外部引用斷掉
TITLE_BRACKET_RE = LEGIT_ZH_SPANS[1]


def legit_spans(text: str) -> list:
    """所有「這裡的中文是編輯選擇不是洩漏」的區間。"""
    return [m.span() for rx in LEGIT_ZH_SPANS for m in rx.finditer(text)]


# 連結類：target 必須保留原文才能解析，不是洩漏
#
# ⚠️ 順序有意義：這些 regex 是**依序**把命中處抹掉的，前面的規則會吃掉後面
# 規則賴以定位的錨。腳註定義行的規則因此必須排第一——它以 `^\[\^N\]:` 定錨，
# 而下面第 4 條（行內腳註引用 `[^N]`）會把那個標記抹成空字串，於是「行首是
# 腳註編號」的行一行都不剩。這條豁免從 2026-07-27 加入行內引用規則的那天起
# 就是死的，沒人發現，因為它只在「腳註來源標題是中文」時才會露出來。
#
# 2026-08-09 現形：綠島監獄 vi 版的三條 Threads 貼文標題（`火燒島。- 強迫政治
# 犯參與「刺青運動」`）被判洩漏，而那三行跟中文原稿逐字相同——它們是引用，
# 不是沒翻。同一天在 cjk-adjacency-check 抓到一模一樣的病（MASK 先抹掉
# `[^N]`，害它的 FN_LINK_LABEL 行首錨失效）。兩支獨立的尺，同一個結構性錯誤：
# **遮罩會破壞後續規則的錨點**。新增規則時要問的不只是「判準對不對」，
# 還有「它跑的時候，前面的規則已經把什麼吃掉了」。
LINK_LIKE_RES = [
    re.compile(r"^\[\^[^\]]+\]:.*$", re.M),                           # [^n]: 腳註定義（必須排第一，見上）
    # 攝影者署名（第十三家族 2026-07-29）：Wikimedia attribution 的作者名
    # 是授權鏈的一部分，不能為了「看起來像已翻譯」而音譯或刪掉。只豁免
    # Photo/Foto 標籤後緊接的 1–30 個漢字姓名；逗號後正文與一般中文句子
    # 仍照掃，避免把整條 caption 變成逃生通道。隔離實證：pt 李宗盛／羅大佑
    # 4 個命中全是 `Foto: 化城再来人`，其他 verify gate 均可獨立把關。
    # 2026-08-09 補：標籤本身會跟著語言翻譯，只認 Photo/Foto 等於只豁免了英
    # 葡西三語。全庫實測還有 Ảnh（vi ×9）、사진（ko ×11）、Фото（ru ×8）、
    # 写真（ja ×4）、Image（×14）——同一種署名、同樣不該改寫，卻因為標籤被
    # 翻成當地語言就掉出豁免。vi 公車篇的 `Ảnh: 厦门金龙永远的神, CC BY 4.0`
    # 因此被判洩漏，而那是 Wikimedia 上傳者的帳號名，改掉就斷了授權鏈。
    re.compile(
        r"(?i:\b(?:Photo|Foto|Photographie|Image|Imagen))\s*[:：]\s*[一-鿿]{1,30}"
        r"|(?:Ảnh|사진|写真|Фото|صورة)\s*[:：]\s*[一-鿿]{1,30}"
    ),
    # HTML 標籤（第十一家族 2026-07-27）：標籤內的屬性值是結構不是正文——
    # YouTube 嵌入的 title="大象體操 Elephant Gym -〈水底〉" 是原始影片標題、
    # <a href="/people/草東沒有派對"> 的中文 slug 是站內連結能解析的前提。
    # 兩者都跟 wikilink 同理：保留原文是正確的編輯選擇。救回 en 歷史刪除檔時
    # 現形——10 篇「只有 CJK 洩漏」的譯文全卡在這裡。
    re.compile(r"<[a-zA-Z/][^>]*>"),
    # 行內腳註引用（第十二家族 2026-07-27）：`[^台灣醬油]` 是 markdown 錨點
    # 不是正文——標籤中英文都合法，但必須與定義行一致，譯文保留原標籤才對。
    # 既有規則只剝了腳註「定義行」，行內引用漏網。
    re.compile(r"\[\^[^\]]+\]"),
    re.compile(r"\[\[[^\]]*\]\]"),                                    # [[wikilink]]
    # [text](target)（容一層巢狀）：target 用捕獲群組取出，交給
    # _md_link_sub() 判斷合不合法（任務一，2026-09-05）——見下方說明。
    re.compile(r"\[[^\[\]]*(?:\[[^\]]*\][^\[\]]*)*\]\(([^)]*)\)"),
    re.compile(r"https?://\S+"),                                      # 裸 URL
]

# 2026-09-05 任務一：舊版第 6 條規則不管括號裡裝什麼，逮到 `[text](anything)`
# 就整段抹掉——於是 `[Википедия](维基百科)`、`[Национальный культурный
# фонд памяти](国家文化记忆库)` 這種「連結文字是別的語言，target 卻是壞掉的
# 中文」被連本體一起沖進豁免，真洩漏對 scan_file()／detect_cjk_leak() 兩邊
# 都隱形（實例：knowledge/ru、knowledge/ar 的 encyclopedia-of-taiwan.md）。
#
# ⚠️ 第一版判準（凡 target 含漢字又沒有 http(s)/相對路徑前綴就當洩漏）對真實
# 語料做假陽性掃描後證明太寬：`[text](某中文標題)`——裸標題、不含路徑前綴、
# 不含 `.md` 副檔名——是**全庫既有且大量使用**的站內互連慣例，zh 原文自己
# 就這樣寫（knowledge/Society/臺灣大百科全書.md 第 82/84 行本尊：
# `[維基百科](維基百科)`、`[國家文化記憶庫](國家文化記憶庫)`，對應真實檔案
# knowledge/Technology/維基百科.md／國家文化記憶庫.md），跟 wikilink 同一種
#「保留原文 slug 才能解析」邏輯。改用這版判準重掃全庫，`AAMA台北搖籃計畫.md`
# `台灣民眾黨`〈九合一選舉是什麼〉等 40+ 個合法站內連結全部被誤判成洩漏。
#
# 真正的訊號不是「target 有沒有漢字」，是「target 的漢字是不是簡體」——
# 全庫 slug／檔名一律正體（zh-TW），ru/ar 這兩個案例 target 剛好是「維基百科
# →维基百科」「國家文化記憶庫→国家文化记忆库」被 MT 簡化，正體 slug 對不上
# 任何真實檔案，連結才是真的壞了。借用 OBSERVER-QUEUE #23 已校準的
# SIMPLIFIED_ONLY_CHARS（書目區簡體殘留判準，見下方 detect_simplified_residue
# 段落）：target 含任一簡體專用字才算不合法，其餘一律放行（含 http(s)／
# mailto／#anchor／任何正體中文 slug／純 ASCII）。
_LEGIT_LINK_TARGET_RE = re.compile(r"^(?:https?://|mailto:|#|\.{0,2}/)", re.I)


def _is_legit_link_target(target: str) -> bool:
    target = target.strip()
    if _LEGIT_LINK_TARGET_RE.match(target):
        return True
    # SIMPLIFIED_ONLY_CHARS 定義在本檔後段（書目區簡體殘留判準，約行 331）；
    # Python 對函式內的全域名稱是呼叫時才查找，這裡雖是前向參照但安全——
    # strip_legit_zones() 實際被呼叫時模組早已載入完畢。
    return not any(ch in SIMPLIFIED_ONLY_CHARS for ch in target)


def _md_link_sub(m: "re.Match") -> str:
    """[text](target) 的自訂 sub()：合法 target 才整段抹除；非法 target 只留
    target 裸字串（丟掉中括號連結文字與小括號本身），不能原樣保留整個
    `[text](target)`——下面 LEGIT_ZH_SPANS 迴圈裡的命名 gloss 規則
    `[(（][^()（）]{0,30}[)）]` 認的是「開括號＋≤30 字＋閉括號」，跟
    markdown 連結的 `(target)` 語法長得一模一樣，會把保留下來的
    `[Википедия](维基百科)` 裡的 `(维基百科)` 當成合法命名 gloss 二次抹掉，
    使真洩漏在 strip_legit_zones() 跑完整個函式後又隱形一次（實測：只把
    這裡改成保留整段 m.group(0)，ru/ar encyclopedia-of-taiwan.md 兩篇仍然
    掃不到，靠這個 repro 才抓到兩層規則互撞）。拆掉外層 `[]()` 只留裸
    target 字串後，中文既不再被小括號包住，也不會被中括號結構誤認成
    wikilink／腳註引用，安全交給下游 CJK_RUN_RE／ZH_ONLY_MARKERS 判定。"""
    return "" if _is_legit_link_target(m.group(1)) else m.group(1)


def strip_legit_zones(text: str, drop_frontmatter: bool = False) -> str:
    """把所有「中文出現在這裡是合法的」區域剝掉，回傳只剩正文的字串。

    2026-07-26 抽出成公開 API。此前每個需要判斷「這段中文算不算洩漏」的工具
    各自維護一份剝除邏輯：cjk-leak-check 兩個分支、verify-translation 的
    description 檢查（同日早上我自己複製的第三份）、cross-lang-audit 的中文
    佔比統計（只剝腳註，其餘全漏）。一天內十個假陽性家族全部源於這種分歧，
    修好一處另一處照樣誤判——所以判準只能有一份，其他工具 import 這個函式。
    """
    body = text
    if drop_frontmatter and body.startswith("---"):
        end_fm = body.find("---", 3)
        if end_fm != -1:
            body = body[end_fm + 3:]
    for i, rx in enumerate(LINK_LIKE_RES):
        # index 5 = [text](target)：合法性視 target 而定，見 _md_link_sub()。
        # 其餘規則（腳註定義行／攝影者署名／HTML 標籤／腳註引用／wikilink／
        # 裸 URL）本身就是「命中即結構、一律抹除」，行為不變。
        body = rx.sub(_md_link_sub, body) if i == 5 else rx.sub("", body)
    for rx in LEGIT_ZH_SPANS:
        body = rx.sub("", body)
    return body


def drop_frontmatter(text: str) -> str:
    """剝掉開頭 `---\\n...\\n---` frontmatter block，沒有就原樣回傳。

    從 strip_legit_zones() 內聯邏輯抽出成獨立函式（2026-09-05）：書目區判定
    需要在**還沒**跑 strip_legit_zones 的原文上定位（見 find_bibliography_start
    docstring），但仍要先去掉 frontmatter 干擾，兩處呼叫者（本檔 scan_file、
    translate.py 的 detect_cjk_leak）現在共用同一份，不再各自 inline 三行。
    """
    if text.startswith("---"):
        end_fm = text.find("---", 3)
        if end_fm != -1:
            return text[end_fm + 3:]
    return text


# ═══════════════ 書目區豁免（OBSERVER-QUEUE #23 選 A，2026-09-05）═══════════
#
# 背景：babel-nightly 7/27–28 兩輪停線各擋下 25 篇孤兒，全部敗在同一處——
# 參考資料區沒翻的中文來源標題（`深度訪談`、`天下換日線`）；本輪 620 筆裡
# 251 筆敗在 leak，是失敗第一大宗。哲宇拍板選 A：書目區的中文來源標題保留
# 原文，是讀者找得到出處的前提，予以放行；但簡體字進書目區是另一回事，
# 仍要擋（含「维基百科」「国家文化记忆库」這類已經悄悄漏進 knowledge/ru、
# knowledge/ar 的簡體來源——見 detect_simplified_residue 下方校準紀錄）。
#
# 「書目區」＝下列兩者取最早的位移，之後到檔尾：
#   (a) 第一條腳註定義行 `^\[\^...\]:`（FOOTNOTE_DEF_LINE_RE）
#   (b) 參考資料／延伸閱讀／圖片來源等標題（BIBLIOGRAPHY_HEADINGS；標題文字
#       從 knowledge/<lang> 實際譯文抽樣取得，不是憑記憶列——找不到對應語言
#       標題就退回 _ZH_HEADING_FALLBACK，涵蓋「標題本身也沒被翻」的案例）
#
# 這條豁免只放寬「正文 vs 書目」的**分區線**，字元判準本身不變：書目區內仍
# 掃簡體（detect_simplified_residue），書目區外（正文）維持原本 CJK_RUN_RE／
# ZH_ONLY_MARKERS 判準，一個字元都沒放寬。

FOOTNOTE_DEF_LINE_RE = LINK_LIKE_RES[0]      # `^\[\^...\]:` 整行（含 `.*$`）
PHOTO_ATTRIBUTION_RE = LINK_LIKE_RES[1]      # Photo/Foto/Ảnh/사진/写真/Фото/صورة 署名
HTML_TAG_RE = LINK_LIKE_RES[2]               # <tag attr="...">
FOOTNOTE_REF_RE = LINK_LIKE_RES[3]           # 行內 `[^n]`
WIKILINK_RE = LINK_LIKE_RES[4]               # [[wikilink]]
MD_LINK_RE = LINK_LIKE_RES[5]                # [text](url)（完整，含 text）
BARE_URL_RE = LINK_LIKE_RES[6]               # 裸 URL

# 每個語言「參考資料／延伸閱讀／圖片來源」標題變體：2026-09-05 對
# knowledge/<lang> 每語言抽樣 8 篇實際譯文（含腳註）grep `^## ` 標題取得，
# 不是憑記憶列。同語言常見兩三種寫法都收（如 ja 参考資料／参考文献）。
BIBLIOGRAPHY_HEADINGS: dict = {
    "en": r"References|Further Reading|Image Sources",
    "ja": r"参考資料|参考文献|画像出典|関連リンク",
    "ko": r"참고\s*자료|참고\s*문헌|이미지\s*출처",
    "es": r"Referencias|Lecturas complementarias|Fuentes de im[aá]genes",
    "fr": r"R[ée]f[ée]rences|Sources des images|Lectures compl[ée]mentaires",
    "vi": r"Tài liệu tham khảo|Đọc thêm|Nguồn Hình Ảnh",
    "id": r"Referensi|Bacaan Lanjutan|Sumber Gambar",
    "pt": r"Referências|Fontes das imagens|Leitura adicional",
    "hi": r"संदर्भ(?:\s*सामग्री)?|विस्तारित\s*(?:पठन|अन्वेषण)|(?:छवि|चित्र)\s*स्रोत",
    "ar": r"المراجع|مصادر\s*الصور|قراءة\s*موسعة",
    # 2026-09-15: hi 與 ru 補上圖片出處／參考資料標題（跟 #1731 的 de 同一個家族）。
    # 數字取自 origin/main 實際譯文：hi 有 44 篇 `## छवि स्रोत` + 17 篇 `## चित्र स्रोत`，
    # ru 有 99 篇 `## Источники изображений` + 41 篇 `## Источники`，三種都不在原表裡，
    # 於是這些區塊的 CJK（攝影者署名、原始書名、機構原名）全被當正文 leak。ru 全庫實測
    # 正文 leak 46 → 10，剩下的 10 筆都是真的（引述 PRC 模型的拒絕答覆、校名原文、論語引文）。
    "ru": r"Ссылки|Справочные материалы|Дополнительное чтение|Источники(?:\s+изображений)?",
    "de": r"Referenzen|Quellen|Weiterführende (?:Lektüre|Literatur)|(?:Bild(?:er)?|Foto(?:s)?|Video|Medien)[- ]?(?:quellen?|nachweise?|rechte|credits?)",
    # 2026-09-14: de 加上 Bildnachweise／Bildquellen／Bildnachweis（en 有
    # „Image Sources"，de 缺同等的圖片出處標題變體，照片授權行裡的正體中文
    # 攝影者署名（如 迷惘的人生）被當成正文 CJK leak 誤報——與 image_health.py
    # 已認得的 de 圖片出處標題家族一致。
    # 2026-09-16（#1731 follow-up）：補上連字號複合詞 Bild-Quelle／Bild-Quellen
    # 與 Fotonachweis／Videonachweis／Bilderquelle（image_health.py 的 de 家族
    # 收 bild|bilder|foto|fotos|video|medien 前綴，且用 [- ]? 承接——本表原先
    # 只收無連字號的 Bildquellen/Bildnachweise，`## Bild-Quelle` 標題下的照片
    # 授權行會被誤掃成正文 leak）。
}
# zh 原文標題沒被翻譯時的救援比對（任何目標語言都可能發生，heading 本身留原文）
_ZH_HEADING_FALLBACK = r"參考資料|参考资料|參考文獻|参考文献|延伸閱讀|延伸阅读|圖片來源|图片来源"
_HEADING_LINE_RE = re.compile(r"^#{1,6}\s+(.+?)\s*$", re.M)


def find_bibliography_start(body: str, lang: str) -> int:
    """回傳「書目區」起點位移；找不到就回傳 len(body)（全文當正文，行為不變
    ——沒有腳註也沒有參考資料標題的檔案，判準完全比照舊版）。

    ⚠️ 呼叫者必須傳「已去除 frontmatter、但還沒跑 strip_legit_zones」的原文
    ——strip_legit_zones 會把整條腳註定義行抹成空字串（LINK_LIKE_RES 規則
    0），先跑過的話這裡永遠找不到腳註定義行。用 drop_frontmatter() 處理
    frontmatter，不要用 strip_legit_zones。
    """
    parts = [p for p in (BIBLIOGRAPHY_HEADINGS.get(lang), _ZH_HEADING_FALLBACK) if p]
    pattern = "|".join(parts)
    heading_start = None
    for m in _HEADING_LINE_RE.finditer(body):
        if re.search(pattern, m.group(1), re.IGNORECASE):
            heading_start = m.start()
            break
    fn_match = FOOTNOTE_DEF_LINE_RE.search(body)
    candidates = [p for p in (heading_start, fn_match.start() if fn_match else None)
                  if p is not None]
    return min(candidates) if candidates else len(body)


def _strip_bib_zone_structure(text: str) -> str:
    """書目區噪音剝除，供 detect_simplified_residue 用。跟 strip_legit_zones
    借同一批 LINK_LIKE_RES regex，但**刻意跳過**規則 0（腳註定義整行）與規則
    5（完整 md 連結）——那兩條正是要檢查簡體的內容本身，剝了就等於沒檢查。
    攝影者署名仍要保護（PHOTO_ATTRIBUTION_RE 既有的 Wikimedia 帳號名豁免，
    如「化城再来人」），HTML 屬性值／行內腳註引用／wikilink／裸 URL 都是
    結構不是正文，一併剝除避免誤觸。"""
    for rx in (PHOTO_ATTRIBUTION_RE, HTML_TAG_RE, FOOTNOTE_REF_RE, WIKILINK_RE, BARE_URL_RE):
        text = rx.sub("", text)
    return text


# 簡體專用字集合（2026-09-05）：只收「簡化字形跟正體完全不同、且在正體書面
# 中文裡沒有正當獨立用法」的字，兩個來源：
#   1. 部件簡化家族（言→讠／金→钅／食→饣／糸→纟／馬→马／鳥→鸟／門→门／
#      貝→贝）——這些簡化部首是 1956 年簡化方案發明的新字形，正體中文歷史
#      上不曾用過，是最安全（零歧義）的一批，一次收整組同部首字。
#   2. OBSERVER-QUEUE #23 原始案例（維基百科／國家文化記憶庫）＋同類常見
#      機構／站名用字。
#
# ⚠️ 刻意排除（跟收錄的字一樣重要，都是判準的一部分）：
#   - 台：#23 提案原文的例字清單裡有它，但它是台灣自己也常用的正體慣用字
#     （「台灣」「台北」），跟 scripts/tools/lib/tw-variant-chars.mjs
#     CORE_VARIANTS 對 939 篇 zh-TW 真實語料校準的結論一致（台在該清單裡，
#     是「所有區塊都放行」的雙態字）。收進來會把全庫最常見的地名/專名全部
#     誤判成簡體殘留，這裡依實證跳過，不是漏抄。
#   - 与／无：文言文與道家經典裡有獨立於簡化方案的正當用法（与＝給、无＝
#     古字「無」的異寫，如《道德經》「无為」），書目區常見古籍／人物條目
#     引用，比對信心不足，保守不收。
#   - 来／点：字形上也是常見簡化選項，但 tw-variant-chars.mjs 對同一批
#     939 篇語料校準時沒把它們列為假陽性來源；且既有的攝影者署名豁免
#     （PHOTO_ATTRIBUTION_RE）已經覆蓋唯一已知的邊界案例（Wikimedia 帳號名
#     「化城再来人」），故保留收錄，不因單一個案排除整個字。
SIMPLIFIED_ONLY_CHARS = frozenset(
    # 言→讠
    "认讨让训议讯记讲讳讴讶讹论讼讽设访诀证诂诃评诅识诈诉诊诋词诎译诒诓诔"
    "试诗诘诙诚诛诜话诞诟诠诡询诣诤该详诧诨诩诫诬语误诰诱诲诳说诵诶请诸"
    "诹诺读诼诽课诿谀谁谂调谄谅谆谈谊谋谌谍谎谏谐谑谒谓谔谕谖谗谘谙谚谛"
    "谜谝谟谠谡谢谣谤谥谦谧谨谩谪谬谭谮谯谱谲谴谶"
    # 金→钅
    "钟银铁铜错钱针钢锁键锦镇链锅锋锐铝钙钛铅铸锈钩钓钥铺锤锻铭钦"
    # 食→饣
    "饭饮饱饼饿馆馄饺饲饶饥"
    # 糸→纟
    "纪约纯纸级组细织终练绝继续绍绳维绿缘缩纲纳纵纷纹线绕绘综绩绪缅绸"
    # 車→车／馬→马／鳥→鸟／門→门／貝→贝
    "车轮轻较载辆输辈轨轴轿轰轭"
    "马骂驾驱骑验驶骄骗骚驳驻驼骆驰骤"
    "鸟鸡鸭鸦鹅鸣鸿鹰鹤鸽鹏"
    "门问闻闲间阔闭闹阅闪闯闷闺闽阁阀"
    "贝财货质贫购贮贯责贤败账贩贪贬贴贷贸费贺贼贾贿赂赃资赅赈赊赌赎赏"
    "赐赔赖赘赛赚赠赡买贵"
    # 站名／機構／常見詞（原始案例＋高頻詞）
    "维国记库华发说这为时间开关电东经长书学义龙聋袭冻栋陈张帐涨厂庆厅"
    "觉举兴誉仪蚁严丽灵乡郑邓桦哗风枫疯飘汉叹难艰画尽满图团园圆忆达迁"
    "远还进边违连归业习"
)


# 日文新字體跟簡化字形撞在一起的字（2026-09-10）：「台北市立国楽団」是台北市立
# 國樂團的**正確**日文寫法，不是簡體殘留，但 2026-09-05 的字集把 `国` 收了進去，
# 於是每一篇引用日文樂團／學校／美術館名稱的 ja 譯文都紅燈。
# 全字集跟日文常用新字體的交集只有這四個字——其餘（讠／钅／饣 部件家族、
# 「维」「归」…）日文根本不用，對 ja 仍然照擋，所以 ja 引用真的簡體中文來源
# 還是抓得到。紅得沒道理的閘門會被學會忽略（REFLEXES #74），所以收窄不是放水。
JA_SHINJITAI_OVERLAP = frozenset("国学画誉")


def detect_simplified_residue(text: str, lang: str = "") -> Optional[str]:
    """書目區內任何一個簡體專用字 → 判「書目區簡體殘留」；找不到回 None。
    傳入的 text 應為書目區原文（未經 strip_legit_zones，才留得住待檢查的
    腳註定義行內容），本函式內部只做 _strip_bib_zone_structure 這種選擇性
    剝除。lang="ja" 時排除新字體重疊字。"""
    scan = _strip_bib_zone_structure(text)
    charset = (SIMPLIFIED_ONLY_CHARS - JA_SHINJITAI_OVERLAP
               if lang == "ja" else SIMPLIFIED_ONLY_CHARS)
    for i, ch in enumerate(scan):
        if ch in charset:
            ctx = scan[max(0, i - 15):i + 15].replace("\n", " ")
            return f"{ch!r} (e.g. …{ctx}…)"
    return None


def detect_lang(path: Path) -> str:
    parts = path.parts
    if "knowledge" in parts:
        idx = parts.index("knowledge")
        if idx + 1 < len(parts):
            return parts[idx + 1]
    # Dispatcher 的隔離檔固定命名為 `<lang>--<slug>.md`。v1.15 只修了 repo
    # 外路徑的顯示崩潰，卻仍把這些檔案判成 unknown；unknown 會落入 ja/ko
    # marker 分支，讓 non-CJK 語言的 4+ 漢字真洩漏在覆盤時消失。產線原路徑
    # `knowledge/<lang>/...` 一直判對，這裡補的是隔離診斷的同一把尺。
    if "quarantine" in parts and "--" in path.name:
        candidate = path.name.split("--", 1)[0]
        if candidate in (NON_CJK_SCRIPT_LANGS | {"ja", "ko"}):
            return candidate
    return "unknown"


def scan_file(path: Path, lang: str = None, verbose: bool = False):
    try:
        text = path.read_text(encoding="utf-8")
    except Exception as e:
        return [f"READ_ERROR: {e}"]
    lang = lang or detect_lang(path)
    hits = []

    # 書目區分界（OBSERVER-QUEUE #23 選 A）：必須在**還沒**跑 strip_legit_zones
    # 的原文上找，見 find_bibliography_start docstring。
    body_raw = drop_frontmatter(text)
    bib_start = find_bibliography_start(body_raw, lang)
    main_raw, bib_raw = body_raw[:bib_start], body_raw[bib_start:]

    if lang in NON_CJK_SCRIPT_LANGS:
        # Strip legitimate zh-bearing zones before scanning:
        #   markdown links [text](url) — internal wikilinks use zh slugs, external
        #     citations legitimately keep the source's actual (Chinese) title
        #   footnote definitions `[^n]: ...` — same citation-title reasoning
        # 2026-07-27 收斂：本分支原本各自內聯一套剝除 regex，於是 strip_legit_zones
        # 加的新豁免（HTML 標籤＝第十一家族）在這裡不生效——抽了共用 API 卻沒改
        # 呼叫端，跟今天修的其他分歧同型。改為單一來源。
        # 2026-09-05：只掃 main_raw（書目區之前的正文）——書目區交給下面的簡體檢查。
        main_scan = strip_legit_zones(main_raw)
        for m in CJK_RUN_RE.finditer(main_scan):
            start, end = m.span()
            ctx = main_scan[max(0, start - 20):end + 20].replace("\n", " ")
            hits.append(f"正文 CJK leak {m.group(0)!r} (e.g. …{ctx}…)")
    else:
        # ja/ko marker 掃描前的合法區剝除（2026-07-24）：
        #   「…」『…』引述 span — 引用原文 zh 是編輯選擇（陳建仁原話等），非洩漏
        #   《…》〈…〉作品名 — 專輯／書／單曲／詩名保留原文合法
        #   markdown 連結（容忍一層巢狀中括號）— 引用的 zh 標題合法
        # 2026-07-30 第十四家族：非 CJK 分支早已 drop frontmatter，ja/ko 卻
        # 掃整份檔案，於是 rationale／lifeTree／research path 裡合法保留的中文
        # marker 會把完整好譯文隔離。frontmatter 的 title/description/imageAlt/tags
        # 已由 verify-translation 專責把關；leak gate 只掃正文，兩分支必須同尺。
        # 2026-09-05：marker 掃描範圍維持掃全文不變（markers 是功能詞，本來就
        # 不會出現在書目標題裡，不需要跟著切分）；書目區的簡體殘留另外檢查。
        scan = strip_legit_zones(body_raw)
        scan = re.sub(r"https?://\S+", "", scan)   # 裸 URL 同豁免（第八家族）
        for marker in ZH_ONLY_MARKERS:
            c = scan.count(marker)
            if c:
                # show one example context for the first occurrence
                idx = scan.find(marker)
                ctx = scan[max(0, idx - 20):idx + 20].replace("\n", " ")
                hits.append(f"正文 zh-only marker {marker!r} x{c} (e.g. …{ctx}…)")

    # 書目區簡體殘留（兩分支共用，OBSERVER-QUEUE #23 選 A）：正體來源標題放行，
    # 簡體不放行，命中即整篇判 leak。
    simplified = detect_simplified_residue(bib_raw, lang)
    if simplified:
        hits.append(f"書目區簡體殘留: {simplified}")
    elif verbose and bib_raw:
        allowed = len(CJK_RUN_RE.findall(strip_legit_zones(bib_raw)))
        if allowed:
            print(f"   ℹ️  {path.name}: 書目區繁體來源標題（放行）x{allowed}")

    return hits


def files_from_git_range(rng):
    out = subprocess.run(
        ["git", "diff", "--name-only", rng],
        cwd=REPO, capture_output=True, text=True, check=True,
    ).stdout
    return [REPO / p for p in out.splitlines() if p.startswith("knowledge/") and p.endswith(".md")
            and detect_lang(Path(p)) in (NON_CJK_SCRIPT_LANGS | {"ja", "ko"})]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("files", nargs="*")
    ap.add_argument("--glob")
    ap.add_argument("--since-git")
    ap.add_argument("--verbose", action="store_true",
                     help="印出書目區被放行的正體來源標題計數（OBSERVER-QUEUE #23 選 A）")
    args = ap.parse_args()

    if args.since_git:
        paths = files_from_git_range(args.since_git)
    elif args.glob:
        paths = list(REPO.glob(args.glob))
    elif args.files:
        paths = [(REPO / f) if not Path(f).is_absolute() else Path(f) for f in args.files]
    else:
        print("need files, --glob, or --since-git", file=sys.stderr)
        sys.exit(1)

    flagged = 0
    for p in paths:
        if not p.exists():
            continue
        hits = scan_file(p, verbose=args.verbose)
        if hits:
            flagged += 1
            # 隔離樣本住 /tmp/babel-*/quarantine，不在 repo 裡；CLI 既然接受
            # 任意 positional path，就不能在「真的有 leak、準備印檔名」時才
            # 因 relative_to(REPO) 崩潰。repo 內維持短路徑，外部樣本顯示絕對路徑。
            try:
                display_path = p.relative_to(REPO)
            except ValueError:
                display_path = p
            print(f"\n❌ {display_path}")
            for h in hits:
                print(f"   - {h}")

    print(f"\n{flagged}/{len(paths)} files flagged for zh leakage")
    sys.exit(1 if flagged else 0)


if __name__ == "__main__":
    main()
