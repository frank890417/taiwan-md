#!/usr/bin/env python3
"""footnote-format-fix.py — 把多種 footnote 源格式統一轉成 Taiwan.md canonical 格式

Canonical 格式：`[^N]: [Title](URL) — desc（描述至少 10 字）`

支援的源格式（4 種）：
  1. Markdown 缺 desc：`[^N]: [Title](URL)` → 補 em-dash + domain-aware desc
  2. APA 學術格式：`[^N]: Author. (date). *Title*. URL.` → 重組成 canonical
  3. 中文標點：`[^N]: Author，〈Title〉，URL` → 重組成 canonical（保留作者）
  4. Angle-bracket URL：`[^N]: [Title](<URL>) — desc` → 移除尖括號

domain → desc mapping（60+ 來源）：覆蓋台灣主流媒體、政府網站、學術機構、文化記憶庫、
  維基百科、PRC 官方（標 PRC 觀點）、Facebook / YouTube 等。未匹配 domain 退化為
  「詳見原始連結內文」（10 字 fallback）。

誕生背景：
  2026-05-03 magical-feynman session — idlccp1984 9 PR batch heal commit 揭露 4 種源
  格式並存（每位 contributor / 每隻 AI 寫作工具偏好不同格式），手動 polish 不可
  scale。把 60+ domain mapping table + 三種源格式 parser 從 /tmp/heal-batch-v2.py
  搬進 canonical，下次任何 batch heal 直接 reuse。

對應 REFLEXES #5「pre-commit dogfood 是朋友」+ REFLEXES #15「反覆浮現的思考要儀器化」+
本 session 候選 REFLEXES #48「Footnote source format diversity 是 contributor batch
隱性 heal cost」。

使用範例：
  # 全 knowledge/ 跑一遍（dry-run，預設）
  python3 scripts/tools/footnote-format-fix.py --all

  # apply 模式（實際寫入）
  python3 scripts/tools/footnote-format-fix.py --all --apply

  # 指定檔案
  python3 scripts/tools/footnote-format-fix.py --apply knowledge/Lifestyle/遊覽車.md

  # 從 stdin 讀檔案清單（per-line）
  gh pr diff 789 --name-only | python3 scripts/tools/footnote-format-fix.py --apply --stdin

退出碼：
  0 = 全部通過 / 有修改成功
  1 = 解析失敗 / 寫入失敗
"""
import argparse
import importlib.util
import re
import sys
from pathlib import Path
from typing import Optional
from urllib.parse import urlparse


# --- domain → desc mapping（per-source 描述模板）-----------------------
DOMAIN_DESC: dict[str, str] = {
    # 台灣主流媒體
    "cna.com.tw": "中央社報導",
    "udn.com": "聯合新聞網報導",
    "ltn.com.tw": "自由時報報導",
    "pts.org.tw": "公視新聞網",
    "ettoday.net": "ETtoday 新聞雲",
    "ftvnews.com.tw": "民視新聞報導",
    "merit-times.com": "人間福報專欄",
    "merit-times.com.tw": "人間福報專欄",
    "ctee.com.tw": "工商時報報導",
    "wantrich.chinatimes.com": "中時新聞網報導",
    "yahoo.com": "Yahoo 新聞報導",
    "tw.news.yahoo.com": "Yahoo 新聞報導",
    "shoppingdesign": "Shopping Design 報導",
    "cnews.com.tw": "匯流新聞網報導",
    "money.udn.com": "經濟日報報導",
    "time.udn.com": "聯合新聞網報時光專欄",
    "bbc.com": "BBC News 中文報導",
    "epochtimes.com": "大紀元時報報導",
    "storm.mg": "風傳媒專文",
    "thinkingtaiwan.net": "想想論壇專文",
    "businessweekly.com.tw": "商業周刊報導",
    "health.businessweekly.com.tw": "良醫健康網／商業周刊",
    "nownews.com": "NOWnews 今日新聞",
    "applealmond.com": "果仁專文",
    "bnext.com.tw": "數位時代分析",
    "ai.bnext.com.tw": "數位時代專文",
    # 雜誌 / 評論
    "taiwan-panorama.com": "台灣光華雜誌專文",
    "pansci.asia": "PanSci 泛科學專文",
    "opinion.cw.com.tw": "獨立評論@天下專欄",
    "theintellectual.net": "思想坦克專文",
    "weeklyhistory.net": "週報時光機專文",
    "civilmedia.tw": "公民行動影音紀錄資料庫",
    "eventsinfocus.org": "焦點事件報導",
    "ourisland.pts.org.tw": "公視我們的島專題",
    "agriharvest.tw": "農傳媒專文",
    # 政府
    "freeway.gov.tw": "交通部高速公路局",
    "cy.gov.tw": "監察院糾正報告",
    "tycg.gov.tw": "桃園市政府文件",
    "land.tycg.gov.tw": "桃園市政府土地計畫",
    "archives.gov.tw": "國家發展委員會檔案管理局",
    "moea.gov.tw": "經濟部新聞稿",
    "moa.gov.tw": "農業部知識入口網",
    "kmweb.moa.gov.tw": "農業部知識入口網",
    "iot.gov.tw": "交通部運輸研究所報告",
    "dgbas.gov.tw": "行政院主計總處",
    "scitechvista.nat.gov.tw": "國科會科技大觀園",
    "nstc.gov.tw": "國家科學及技術委員會",
    "tcrf.org.tw": "中華民國道路協會",
    "nantun.taichung.gov.tw": "南屯區公所介紹",
    "culture.taichung.gov.tw": "臺中市政府文化局",
    "foodedu.tc.edu.tw": "臺中市政府教育局食農專欄",
    "travel.taichung.gov.tw": "臺中觀光旅遊網",
    "ws.th.gov.tw": "國史館臺灣文獻館論文",
    # 學術
    "sinica.edu.tw": "中央研究院",
    "research.sinica.edu.tw": "中央研究院",
    "ntl.edu.tw": "國立中央圖書館台灣分館",
    "ntu.edu.tw": "國立臺灣大學論文",
    "ws.dgbas.gov.tw": "行政院主計總處公報",
    # 文化 / 記憶庫
    "tcmb.culture.tw": "國家文化記憶庫",
    "wanhegong.org.tw": "萬和宮全球資訊網",
    "matsu.idv.tw": "馬祖資訊網檔案",
    # 維基
    "wikipedia.org": "維基百科條目",
    "zh.wikipedia.org": "維基百科條目",
    # 平台 / 商業
    "facebook.com": "Facebook 公開貼文",
    "youtube.com": "YouTube 影片紀錄",
    "m.youtube.com": "YouTube 影片紀錄",
    "applesidra.com.tw": "蘋果西打官方網站",
    "taisugar.com.tw": "台糖官網資料",
    "onelittleday.com.tw": "小日子專欄",
    "gbimonthly.com": "生技月刊報導",
    "tiwa.org.tw": "台灣國際勞工協會檔案",
    "newton.com.tw": "中文百科全書條目",
    "holoteam.com": "凌雲科技技術解析",
    "t-security.com": "T-security 擎雷防偽資料",
    "npf.org.tw": "國家政策研究基金會評論",
    "ryoritaiwan.fcdc.org.tw": "中華飲食文化基金會專欄",
    "easytravel.com.tw": "易遊網景點資料",
    "guide.easytravel.com.tw": "易遊網景點資料",
    "medicaltravel.org.tw": "臺灣國際醫療全球資訊網",
    "cloudtcm.com": "雲端中醫本草藥典",
    "food.ltn.com.tw": "自由時報飲食專欄",
    "health.udn.com": "元氣網／聯合報健康版",
    "talk.ltn.com.tw": "自由時報自由廣場",
    "plainlaw.me": "法律白話文運動",
    # 中國官方（標 PRC 觀點）
    "gwytb.gov.cn": "中國國台辦官方資料（PRC 觀點）",
    # 預設 fallback — 必 ≥ 10 chars 以滿足 canonical regex
    "default": "詳見原始連結內文資料補充",
}


# --- 譯文用的通用描述（2026-09-26）----------------------------------------
# 上面的 DOMAIN_DESC 全是中文，只適用 zh-TW 原文。但這支 fixer 從 2026-07-28 起
# 接在 babel-dispatch 的熱路徑（article-health --check=footnote-format --fix），
# 2026-09-21 又接進 patch-translate，每篇譯文送 verify 前都跑一次；譯文腳註缺描述
# 時它照樣補中文。巴別塔渦流 2026-09-26 全庫盤點：十二語譯文裡有 270 處
# 「詳見原始連結內文資料補充」、40 處「維基百科條目」、27 處「公視新聞網」⋯⋯，
# 分布在 184 篇。cjk-leak-check 刻意豁免腳註行（書目標題依政策保留原文），所以
# 沒有任何一道閘看得見。譯文改補目標語言的通用句。
# 新語言出生時這張表要跟著補：tests/test_footnote_format_lang.py 會對
# languages.mjs 逐一檢查，缺一個就紅，不讓 fixer 默默退回中文。
FALLBACK_DESC_BY_LANG: dict[str, str] = {
    "en": "See the linked original source for details",
    "ja": "詳細はリンク先の原文を参照",
    "ko": "자세한 내용은 링크된 원문 참조",
    "es": "Véase la fuente original enlazada",
    "fr": "Voir la source originale en lien",
    "vi": "Xem chi tiết tại nguồn gốc được liên kết",
    "id": "Lihat sumber asli pada tautan",
    "pt": "Ver a fonte original no link",
    "hi": "विवरण के लिए मूल स्रोत का लिंक देखें",
    "ar": "انظر المصدر الأصلي في الرابط",
    "ru": "Подробности см. в первоисточнике по ссылке",
    "de": "Details in der verlinkten Originalquelle",
}
# 多連結腳註摺進描述時的連接詞與標點：中文、日文用全形，其他語言用半形。
SEE_ALSO_BY_LANG: dict[str, str] = {
    "zh-TW": "並見", "ja": "併せて参照：", "ko": "함께 보기: ", "en": "see also ",
    "es": "véase también ", "fr": "voir aussi ", "vi": "xem thêm ", "id": "lihat juga ",
    "pt": "ver também ", "hi": "यह भी देखें: ", "ar": "انظر أيضًا ", "ru": "см. также ",
    "de": "siehe auch ",
}


def punct_for(lang: str) -> tuple[str, str, str, str]:
    """(左括號, 右括號, 冒號, 分號)——全形只給中文與日文。"""
    if lang in ("zh-TW", "ja"):
        return "（", "）", "：", "；"
    return " (", ")", ": ", "; "


def lang_of_path(path: Path) -> str:
    """knowledge/<lang>/... → <lang>；原文（分類資料夾開頭大寫）→ zh-TW。"""
    parts = Path(path).parts
    if "knowledge" in parts:
        i = parts.index("knowledge")
        if i + 1 < len(parts) and parts[i + 1] in translation_langs():
            return parts[i + 1]
    return "zh-TW"


_TRANSLATION_LANGS: Optional[frozenset] = None


def translation_langs() -> frozenset:
    """語言清單 SSOT（src/config/languages.mjs，經 article_health/langs.py）。
    用檔案路徑載入而不是 import article_health 套件：article-health 的
    footnote_format plugin 會反過來載入本檔，走套件 import 會循環。"""
    global _TRANSLATION_LANGS
    if _TRANSLATION_LANGS is None:
        spec = importlib.util.spec_from_file_location(
            "_twmd_langs", Path(__file__).resolve().parent / "lib" / "article_health" / "langs.py")
        mod = importlib.util.module_from_spec(spec)
        assert spec and spec.loader
        spec.loader.exec_module(mod)
        _TRANSLATION_LANGS = mod.TRANSLATION_LANGS
    return _TRANSLATION_LANGS


def desc_for_url(url: str, lang: str = "zh-TW") -> str:
    """Resolve domain → canonical desc。Longest-match wins。

    譯文（lang 不是 zh-TW）一律回目標語言的通用句；表裡沒有這個語言就
    KeyError——寧可 fixer 失敗、讓 hard gate 擋下重翻，也不補中文。"""
    if lang != "zh-TW":
        return FALLBACK_DESC_BY_LANG[lang]
    matches = [(d, t) for d, t in DOMAIN_DESC.items() if d != "default" and d in url]
    if not matches:
        return DOMAIN_DESC["default"]
    # longest match
    matches.sort(key=lambda x: -len(x[0]))
    return matches[0][1]


# --- footnote line normalizer -----------------------------------------
FN_PREFIX = re.compile(r"^(\[\^\d+\]:)\s*(.*)$")


def normalize_footnote(line: str, lang: str = "zh-TW") -> Optional[str]:
    """Convert any footnote format to `[^N]: [Title](URL) — desc`.

    Returns None if line is not a footnote definition or already canonical.
    Returns new_line if conversion happened.
    """
    m = FN_PREFIX.match(line)
    if not m:
        return None
    prefix, rest = m.groups()
    rest = rest.rstrip()
    # 連結內 URL 的前後空白統一在入口清掉，不在各分支各清一次。
    # `[Title](https://… )` 的尾隨空格會讓 article-health 判為格式不合規，
    # 而下面每個分支各自解析 url——只修其中一個分支，別的格式照樣漏
    # （PR #1248 十處腳註走的是中文標點分支，2026-07-25）。
    rest_before = rest
    rest = re.sub(r"\]\(\s*([^)\s]+)\s*\)", r"](\1)", rest)
    url_spacing_fixed = rest != rest_before

    # 1. Already canonical: `[Title](URL) — desc` with desc ≥ 10 chars
    canon = re.match(r"^\[([^\]]+)\]\(([^)]+)\)(?:\s+—\s+(.+))?$", rest)
    if canon:
        title, url, desc = canon.groups()
        if desc and len(desc) >= 10:
            # 入口清過 URL 空白的話，這行實際上有變更，不能回報「不需改」
            return f"{prefix} [{title}]({url}) — {desc}" if url_spacing_fixed else None
        # need to add or extend desc
        new_desc = desc_for_url(url, lang)
        if desc and len(desc) < 10:
            new_desc = desc + punct_for(lang)[2] + new_desc
        return f"{prefix} [{title}]({url}) — {new_desc}"

    # 2. Angle-bracket URL: `[Title](<URL>) — desc?`
    angle = re.match(r"^\[([^\]]+)\]\(<([^>]+)>\)(?:\s+—\s+(.+))?$", rest)
    if angle:
        title, url, desc = angle.groups()
        new_desc = desc if desc and len(desc) >= 10 else desc_for_url(url, lang)
        return f"{prefix} [{title}]({url}) — {new_desc}"

    # 3. CN-bracket: `Author，〈Title〉，URL[，desc]`
    cn = re.match(r"^([^，]+?)，〈([^〉]+)〉，(https?://[^，\s]+)(?:，(.*))?$", rest)
    if cn:
        author, title, url, _ = cn.groups()
        new_desc = desc_for_url(url, lang)
        return f"{prefix} [{title}]({url}) — {new_desc}（{author}）"

    # 4. APA-style: `Author. (date). *Title*. [Display](URL).`
    md_link = re.search(r"\[([^\]]+)\]\(([^)]+)\)", rest)
    if md_link:
        title_inside = md_link.group(1)
        url = md_link.group(2)
        before = rest[: md_link.start()].strip().strip(".").strip()
        title = title_inside if title_inside.startswith("http") else (before if len(before) > 3 else title_inside)
        title = re.sub(r"[\*_]+", "", title).strip(". ").strip()
        if len(title) > 100:
            title = title[:100] + "…"
        new_desc = desc_for_url(url, lang)
        return f"{prefix} [{title}]({url}) — {new_desc}"

    # 5. Plain URL at end: `... URL`
    plain = re.search(r"(https?://\S+?)(?:\s|$|\.$)", rest)
    if plain:
        url = plain.group(1).rstrip(".,，。、")
        title_part = rest[: plain.start()].rstrip(" ,，.").strip(". ").strip()
        title_part = re.sub(r"[\*_]+", "", title_part)
        if len(title_part) > 100:
            title_part = title_part[:100] + "…"
        new_desc = desc_for_url(url, lang)
        return f"{prefix} [{title_part}]({url}) — {new_desc}"

    # No URL found — leave as-is (probably malformed, skip)
    return None


# GitHub-flavored footnote ref: [display](#user-content-fn-REALID)
# IMPORTANT: display number ≠ real id. Example from NET PR:
#   [1](#user-content-fn-19) → [^19]  (NOT [^1])
#   [18](#user-content-fn-2) → [^2]
_RE_GH_FN_REF = re.compile(
    r"\[(\d+)\]\(#user-content-fn-(\d+)(?:-\d+)?\)"
)
# Numbered list footnote line variants (GitHub / APA / mixed):
#   1. [Title](URL) — desc [↩](...)
#   1. Author. (date). *Title*. https://... [↩]
#   1. [Title](URL) — desc
#
# IMPORTANT: GitHub's rendered export often numbers EVERY list item as `1.`
# The real footnote id lives in the backref: [↩](#user-content-fnref-N)
# or [↩2](#user-content-fnref-N-2). Prefer that over the list marker.
_RE_NUM_FN = re.compile(r"^(\d+)\.\s+(.+)$")
_RE_FNREF_ID = re.compile(
    r"\[↩[^\]]*\]\(#user-content-fnref-(\d+)(?:-\d+)?\)"
)
_RE_MD_LINK = re.compile(r"\[([^\]]+)\]\((https?://[^)]+)\)")
_RE_URL = re.compile(r"(https?://\S+?)(?:\s|$|\.$|（|）|\))")
# YAML fence frontmatter (GitHub web editor common mistake)
_RE_YAML_FENCE = re.compile(
    r"^```(?:ya?ml)?\s*\n(.*?)\n```\s*\n",
    re.DOTALL | re.IGNORECASE,
)


def _strip_yaml_fence(text: str) -> tuple[str, int]:
    """Convert ```yaml ... ``` leading fence to --- ... ---. Returns (text, changes)."""
    m = _RE_YAML_FENCE.match(text)
    if not m:
        # Also handle: file starts with ```yaml without requiring trailing blank
        m2 = re.match(r"^```(?:ya?ml)?\s*\n(.*?)```\s*\n?", text, re.DOTALL | re.I)
        if not m2:
            return text, 0
        body = m2.group(1).strip("\n")
        rest = text[m2.end() :]
        return f"---\n{body}\n---\n{rest}", 1
    body = m.group(1).strip("\n")
    rest = text[m.end() :]
    return f"---\n{body}\n---\n{rest}", 1


def _convert_gh_refs(text: str) -> tuple[str, int]:
    """[display](#user-content-fn-REALID) → [^REALID]

    Always use the id embedded in the anchor (group 2), never the visible
    list number (group 1). GitHub reorders display numbers independently
    of definition ids.
    """
    changes = 0

    def repl(m: re.Match) -> str:
        nonlocal changes
        changes += 1
        return f"[^{m.group(2)}]"

    return _RE_GH_FN_REF.sub(repl, text), changes


def _resolve_fn_id(list_num: str, rest: str, seq_counter: list[int]) -> str:
    """Pick footnote id: prefer GitHub fnref-N, else list marker, else sequence."""
    ids = _RE_FNREF_ID.findall(rest)
    if ids:
        # First backref is the primary definition id
        return ids[0]
    if list_num and list_num != "1":
        return list_num
    # All-1s GitHub list with no fnref: fall back to sequential counter
    seq_counter[0] += 1
    return str(seq_counter[0])


def _numbered_line_to_canonical(
    list_num: str, rest: str, seq_counter: list[int], lang: str = "zh-TW"
) -> Optional[str]:
    """Convert one numbered footnote body to `[^N]: [Title](URL) — desc`."""
    rest_raw = rest.strip()
    num = _resolve_fn_id(list_num, rest_raw, seq_counter)
    # Drop trailing github backref residue (may appear multiple times)
    rest = re.sub(r"\s*\[↩[^\]]*\]\([^)]*\)", "", rest_raw).strip()
    rest = re.sub(r"\s*↩\d*\s*$", "", rest).strip()

    # Already almost canonical with md link
    md = _RE_MD_LINK.search(rest)
    if md:
        title = md.group(1).strip()
        url = md.group(2).strip()
        after = rest[md.end() :].strip().lstrip("—-–：:，, ").strip()
        before = rest[: md.start()].strip().strip(".—- ")
        if not title or title.startswith("http"):
            title = before if len(before) > 2 else title
        title = re.sub(r"[\*_]+", "", title).strip()
        if len(title) > 100:
            title = title[:100] + "…"
        desc = after if after and len(after) >= 6 else desc_for_url(url, lang)
        desc = re.sub(r"\s*↩\d*\s*$", "", desc).strip()
        if len(desc) < 6:
            desc = desc_for_url(url, lang)
        return f"[^{num}]: [{title}]({url}) — {desc}"

    # APA / plain URL
    um = _RE_URL.search(rest)
    if um:
        url = um.group(1).rstrip(".,，。、")
        title_part = rest[: um.start()].rstrip(" ,，.").strip(". ").strip()
        title_part = re.sub(r"[\*_]+", "", title_part)
        title_part = re.sub(r"\s+", " ", title_part).strip()
        if len(title_part) > 100:
            title_part = title_part[:100] + "…"
        if len(title_part) < 2:
            title_part = "參考來源" if lang == "zh-TW" else (urlparse(url).netloc or url)
        return f"[^{num}]: [{title_part}]({url}) — {desc_for_url(url, lang)}"

    return None


def _convert_numbered_footnote_section(text: str, lang: str = "zh-TW") -> tuple[str, int]:
    """Convert GitHub/APA numbered footnote lists under 參考資料 / Footnotes.

    Heuristic: once we see a heading containing 參考資料/Footnotes/注釋/註腳,
    subsequent `N. ...url...` lines become `[^N]: ...` until blank-heavy end
    or a new ## heading that is not footnote-related.
    """
    lines = text.split("\n")
    changes = 0
    in_fn_zone = False
    seq_counter = [0]  # mutable sequential fallback for all-1s lists
    seen_ids: set[str] = set()
    fn_zone_headers = re.compile(
        r"^(?:#{1,3}\s*)?(?:\*\*)?(?:參考資料|注釋|註腳|Footnotes?|Sources?|References?)(?:\*\*)?",
        re.I,
    )
    out: list[str] = []
    for line in lines:
        if fn_zone_headers.match(line.strip()):
            in_fn_zone = True
            # Normalize noisy headers（只改原文：譯文的 Footnotes 標題換成
            # 「參考資料」就是把中文標題寫進英文譯文）
            if lang == "zh-TW" and (re.match(r"^##\s*Footnotes", line, re.I) or line.strip() == "## Footnotes"):
                out.append("## 參考資料" if "參考" not in line else line)
                changes += 1 if "Footnotes" in line else 0
                continue
            out.append(line)
            continue
        if in_fn_zone:
            # Leave the zone on a real new H2 that's not refs
            if re.match(r"^##\s+", line) and not fn_zone_headers.match(line.strip()):
                in_fn_zone = False
                out.append(line)
                continue
            nm = _RE_NUM_FN.match(line.strip())
            if nm and ("http://" in line or "https://" in line or "](" in line):
                converted = _numbered_line_to_canonical(
                    nm.group(1), nm.group(2), seq_counter, lang
                )
                if converted:
                    # Dedup identical ids (GitHub sometimes repeats backrefs)
                    id_m = re.match(r"^\[\^([^\]]+)\]:", converted)
                    if id_m and id_m.group(1) in seen_ids:
                        # Second definition with same id → keep but renumber seq
                        seq_counter[0] += 1
                        new_id = str(seq_counter[0])
                        while new_id in seen_ids:
                            seq_counter[0] += 1
                            new_id = str(seq_counter[0])
                        converted = re.sub(
                            r"^\[\^[^\]]+\]:", f"[^{new_id}]:", converted, count=1
                        )
                        id_m = re.match(r"^\[\^([^\]]+)\]:", converted)
                    if id_m:
                        seen_ids.add(id_m.group(1))
                    out.append(converted)
                    changes += 1
                    continue
            # Already canonical [^N]: in zone — keep
            if line.startswith("[^"):
                id_m = re.match(r"^\[\^([^\]]+)\]:", line)
                if id_m:
                    seen_ids.add(id_m.group(1))
                out.append(line)
                continue
        out.append(line)
    return "\n".join(out), changes


def heal_file(path: Path, apply: bool) -> tuple[int, int]:
    """Returns (changes_count, total_footnotes_count).

    Transforms (2026-07-23 expansion):
      0. ```yaml fence frontmatter → ---
      1. GitHub [n](#user-content-fn-n) → [^n]
      2. Numbered list footnotes under 參考資料 → [^n]: canonical
      3. Existing [^n]: lines via normalize_footnote (APA/angle/missing-desc)
    """
    text = path.read_text(encoding="utf-8")
    changes = 0
    lang = lang_of_path(path)

    text, c = _strip_yaml_fence(text)
    changes += c

    text, c = _convert_gh_refs(text)
    changes += c

    text, c = _convert_numbered_footnote_section(text, lang)
    changes += c

    lines = text.split("\n")
    total = 0
    for i, line in enumerate(lines):
        if line.startswith("[^") and line.split(":", 1)[0].endswith("]"):
            # definition line only
            if re.match(r"^\[\^[0-9a-zA-Z_-]+\]:", line):
                total += 1
                new_line = normalize_footnote(line, lang)
                if new_line is not None and new_line != line:
                    lines[i] = new_line
                    changes += 1
    text = "\n".join(lines)

    if changes and apply:
        path.write_text(text, encoding="utf-8")
    return changes, total


def collect_files(args) -> list[Path]:
    if args.all:
        knowledge = Path("knowledge")
        if not knowledge.is_dir():
            print(f"❌ knowledge/ not found in cwd ({Path.cwd()})", file=sys.stderr)
            sys.exit(1)
        # 跳過翻譯目錄（only zh-TW SSOT）。語言清單讀 SSOT：這裡原本寫死五語，
        # 2026-07-18 出生的 vi/id/pt/hi/ar/ru/de 七語一直被 --all 當成原文掃。
        langs = translation_langs()
        return [p for p in knowledge.rglob("*.md") if p.parts[1] not in langs]
    files: list[Path] = []
    if args.stdin:
        for line in sys.stdin:
            line = line.strip()
            if line.endswith(".md"):
                p = Path(line)
                if p.is_file():
                    files.append(p)
    files.extend(Path(f) for f in args.files if Path(f).is_file())
    return files


def main():
    parser = argparse.ArgumentParser(
        description="Convert footnote sources to canonical `[^N]: [Title](URL) — desc` format"
    )
    parser.add_argument("files", nargs="*", help="Files to process")
    parser.add_argument("--all", action="store_true", help="Process all knowledge/ zh-TW articles")
    parser.add_argument("--stdin", action="store_true", help="Read file paths from stdin (per-line)")
    parser.add_argument("--apply", action="store_true", help="Actually write changes (default: dry-run)")
    parser.add_argument("--quiet", "-q", action="store_true", help="Only print files with changes")
    args = parser.parse_args()

    if not (args.all or args.stdin or args.files):
        parser.print_help()
        sys.exit(0)

    files = collect_files(args)
    if not files:
        print("⚠️  No .md files matched", file=sys.stderr)
        sys.exit(0)

    mode = "APPLY" if args.apply else "DRY-RUN"
    print(f"📋 footnote-format-fix [{mode}] — scanning {len(files)} files")

    total_changes = 0
    files_changed = 0
    for f in files:
        try:
            changes, total = heal_file(f, args.apply)
        except Exception as e:
            print(f"❌ {f}: {e}", file=sys.stderr)
            continue
        if changes:
            files_changed += 1
            total_changes += changes
            print(f"  {'✓' if args.apply else '~'} {f}: {changes}/{total} footnote(s) {'fixed' if args.apply else 'would-fix'}")
        elif not args.quiet and total:
            pass  # silent for clean files

    if total_changes:
        verb = "fixed" if args.apply else "would-fix (rerun with --apply)"
        print(f"\n📊 Summary: {total_changes} footnote(s) {verb} across {files_changed} file(s)")
    else:
        print("✅ All footnotes canonical")


if __name__ == "__main__":
    main()
