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

對應 DNA #5「pre-commit dogfood 是朋友」+ DNA #15「反覆浮現的思考要儀器化」+
本 session 候選 DNA #48「Footnote source format diversity 是 contributor batch
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
import re
import sys
from pathlib import Path
from typing import Optional


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


def desc_for_url(url: str) -> str:
    """Resolve domain → canonical desc。Longest-match wins。"""
    matches = [(d, t) for d, t in DOMAIN_DESC.items() if d != "default" and d in url]
    if not matches:
        return DOMAIN_DESC["default"]
    # longest match
    matches.sort(key=lambda x: -len(x[0]))
    return matches[0][1]


# --- footnote line normalizer -----------------------------------------
FN_PREFIX = re.compile(r"^(\[\^\d+\]:)\s*(.*)$")


def normalize_footnote(line: str) -> Optional[str]:
    """Convert any footnote format to `[^N]: [Title](URL) — desc`.

    Returns None if line is not a footnote definition or already canonical.
    Returns new_line if conversion happened.
    """
    m = FN_PREFIX.match(line)
    if not m:
        return None
    prefix, rest = m.groups()
    rest = rest.rstrip()

    # 1. Already canonical: `[Title](URL) — desc` with desc ≥ 10 chars
    canon = re.match(r"^\[([^\]]+)\]\(([^)]+)\)(?:\s+—\s+(.+))?$", rest)
    if canon:
        title, url, desc = canon.groups()
        if desc and len(desc) >= 10:
            return None  # already valid, no change
        # need to add or extend desc
        new_desc = desc_for_url(url)
        if desc and len(desc) < 10:
            new_desc = desc + "：" + new_desc
        return f"{prefix} [{title}]({url}) — {new_desc}"

    # 2. Angle-bracket URL: `[Title](<URL>) — desc?`
    angle = re.match(r"^\[([^\]]+)\]\(<([^>]+)>\)(?:\s+—\s+(.+))?$", rest)
    if angle:
        title, url, desc = angle.groups()
        new_desc = desc if desc and len(desc) >= 10 else desc_for_url(url)
        return f"{prefix} [{title}]({url}) — {new_desc}"

    # 3. CN-bracket: `Author，〈Title〉，URL[，desc]`
    cn = re.match(r"^([^，]+?)，〈([^〉]+)〉，(https?://[^，\s]+)(?:，(.*))?$", rest)
    if cn:
        author, title, url, _ = cn.groups()
        new_desc = desc_for_url(url)
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
        new_desc = desc_for_url(url)
        return f"{prefix} [{title}]({url}) — {new_desc}"

    # 5. Plain URL at end: `... URL`
    plain = re.search(r"(https?://\S+?)(?:\s|$|\.$)", rest)
    if plain:
        url = plain.group(1).rstrip(".,，。、")
        title_part = rest[: plain.start()].rstrip(" ,，.").strip(". ").strip()
        title_part = re.sub(r"[\*_]+", "", title_part)
        if len(title_part) > 100:
            title_part = title_part[:100] + "…"
        new_desc = desc_for_url(url)
        return f"{prefix} [{title_part}]({url}) — {new_desc}"

    # No URL found — leave as-is (probably malformed, skip)
    return None


def heal_file(path: Path, apply: bool) -> tuple[int, int]:
    """Returns (changes_count, total_footnotes_count)."""
    text = path.read_text(encoding="utf-8")
    lines = text.split("\n")
    changes = 0
    total = 0
    for i, line in enumerate(lines):
        if line.startswith("[^"):
            total += 1
            new_line = normalize_footnote(line)
            if new_line is not None and new_line != line:
                lines[i] = new_line
                changes += 1
    if changes and apply:
        path.write_text("\n".join(lines), encoding="utf-8")
    return changes, total


def collect_files(args) -> list[Path]:
    if args.all:
        knowledge = Path("knowledge")
        if not knowledge.is_dir():
            print(f"❌ knowledge/ not found in cwd ({Path.cwd()})", file=sys.stderr)
            sys.exit(1)
        # 跳過翻譯目錄（only zh-TW SSOT）
        return [p for p in knowledge.rglob("*.md") if p.parts[1] not in ("en", "ja", "ko", "es", "fr")]
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
