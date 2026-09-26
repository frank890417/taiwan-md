#!/usr/bin/env python3
"""
verify-translation.py — Hard-gate check for a single translation (any target lang).

Agent runs this AFTER assembling the translation, BEFORE commit.
Exit code != 0 = something is wrong → fix or escalate.

Generalized 2026-07-24 (fleet dispatch quality gate) from an en-only tool.
Target lang is inferred from the translation path (knowledge/{lang}/...).
For non-CJK-script targets (en/es/fr/vi/id/pt/hi/...) the CJK-leftover checks
work as before. For CJK-script targets (ja/ko — kanji/hanja legitimately
overlap the Han unicode range so "has CJK" is not a signal) the same checks
switch to "field byte-identical to zh source" instead, which is what actually
flags an untranslated leftover (2026-07-24: ja P1 batch shipped `tags` copied
verbatim in Traditional Chinese for one article — has_cjk() can't see that on
a ja target, byte-identity can).

Checks (each 1-line PASS/FAIL):
  1. translation file exists at expected path
  2. zh source still exists
  3. frontmatter has translatedFrom pointing to zh
  4. frontmatter has sourceCommitSha (≥ 7 hex / or "pre-toolkit")
  5. frontmatter has sourceContentHash (sha256: prefix + 16 hex)
  6. frontmatter has translatedAt (ISO 8601)
  7. zh + translation frontmatter passthrough fields match (author, date, featured,
     readingTime, lastVerified, lastHumanReview, category, subcategory,
     image, imageCredit) — only deviations: title / description / imageAlt
  8. translation-ratio-check passes (OK, not TRUNCATED / THIN)
  9. footnote count matches between zh and translation
  10. ## section count matches between zh and translation (±1 tolerance)
  11. URL multiset matches exactly (zh vs translation) — no loss, invention, or rewriting
  12. No `---\n_References:_\n` duplication (would have been adjacent)
  13. title/description/imageAlt not left untranslated (CJK-leftover check for
      non-CJK targets; byte-identical-to-zh check for ja/ko targets)
  14. tags not left untranslated (same dual strategy as #13)
  15. translatedFromInferred is bool
  16. WARN: accidentally-quoted scalar types (readingTime as '11' instead of
      11; lastHumanReview/featured/date as 'false'/'2026-01-01' instead of
      bare). Style/consistency only — verified 2026-07-24 that Astro's content
      loader coerces these before Zod sees them, so it does NOT break the
      build; 200+ pre-existing files already have this pattern and build fine

Usage:
  verify-translation.py <zh_path> <translation_path>
  verify-translation.py Food/牛肉麵.md knowledge/en/Food/beef-noodle-soup.md
  verify-translation.py Art/台灣電影.md knowledge/ja/Art/taiwanese-cinema.md
  verify-translation.py --json <zh> <translation>   # JSON output

Exit codes:
  0 = all PASS
  1 = at least one HARD-FAIL (must fix)
  2 = WARN only (suggested but not blocker)
"""
import argparse
import json
import re
import subprocess
import sys
from collections import Counter
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent.parent.parent
KN = REPO / "knowledge"


def _repo_rel(p: Path) -> str:
    """Best-effort REPO-relative display/arg string. Falls back to the absolute
    path when p lives outside REPO — `.relative_to(REPO)` raises ValueError
    there, which used to crash this whole script uncaught (no JSON output at
    all) the moment a caller passed a real out-of-repo path (2026-07-27:
    patch-translate.py --out to an ad-hoc test/staging directory, e.g. for a
    dry-run that must never touch knowledge/). structured-translate.py's pilot
    mode hit the same ValueError and worked around it entirely on the caller
    side with a symlink; here we fix it at the source so verify-translation.py
    itself never depends on being handed a fake in-repo-looking path."""
    try:
        return str(p.relative_to(REPO))
    except ValueError:
        return str(p)


_ANSI_RE = re.compile(r"\x1b\[[0-9;]*m")


def _strip_ansi(s: str) -> str:
    """Drop SGR colour codes before matching on another tool's stdout.

    Sub-tools colour their verdicts for humans; matching raw stdout means the
    escape sequence sits between the whitespace and the word you are looking
    for, so a padded-substring test like `" OK " in out` silently never fires.
    Strip first, then match — otherwise the check degrades into a check-shaped
    thing that always takes the else-branch."""
    return _ANSI_RE.sub("", s)


# Frontmatter fields that MUST match between zh and en (passthrough)
# NOTE: `subcategory` 不在 PASSTHROUGH——但不是因為它該被翻（07-24 那條「它是
# rendered label，翻了不算 drift」的前提已被分類頁的 buildSubcategoryGroups()
# 證偽：分群拿 frontmatter 值完全比對，顯示才查 subcategory-i18n.json）。正確值
# 是 zh 原值；把它放進 PASSTHROUGH 會讓既有 1,795 篇翻過的譯文在 patch 重驗時
# 全部 hard fail、被 HEAD-restore 卡在 stale，那是 OBSERVER-QUEUE #51 的閾值決策。
# 這裡先維持 WARN 級由 article-health `subcategory-translation-parity` 守；
# 產線端 structured-translate.py 自 2026-09-20 起原樣複製 zh，存量不再增加。
PASSTHROUGH = [
    "author", "date", "featured", "readingTime",
    "lastVerified", "lastHumanReview", "category",
    "image", "imageCredit", "difficulty",
]
# Fields that DIFFER (translated)
TRANSLATED = ["title", "description", "imageAlt", "tags", "subcategory"]
# Fields that ARE en-specific (added by toolkit)
EN_ONLY = [
    "translatedFrom", "sourceCommitSha", "sourceContentHash",
    "translatedAt", "translatedFromInferred",
]


def parse_fm(content: str) -> tuple[dict, str]:
    """Returns (parsed_fields, body)."""
    if not content.startswith("---"):
        return ({}, content)
    end = content.find("---", 3)
    if end == -1:
        return ({}, content)
    fm_text = content[3:end]
    body = content[end + 3:]
    out = {}
    in_list = None
    for line in fm_text.splitlines():
        stripped = line.strip()
        # Bracket-array continuation: `tags:\n  [\n    'a',\n    'b',\n  ]`
        # (this project's dominant tags style — bare `[`/`]` lines + quoted items)
        if in_list and stripped in ("[", "]"):
            continue
        # 整個 inline array 落在續行（prettier 會把過長的 `tags: [...]` 折成
        # `tags:\n  ['a', 'b']`）。舊 parser 只認「裸 [ / ] 行」與「單項引號行」
        # 兩種形狀，這種一行到底的續行陣列會整個讀不到，key 於是憑空消失。
        # 2026-08-01 §14b 欄位遺漏檢查上線後首篇誤報就是它：譯文明明有 tags，
        # 卻被判成「zh 有但譯文缺」——擋下的是好譯文（第 N 次「尺歪了」）。
        if in_list and stripped.startswith("[") and stripped.endswith("]"):
            out.setdefault(in_list, []).extend(
                x.strip().strip("'\"") for x in stripped[1:-1].split(",") if x.strip()
            )
            in_list = None
            continue
        if in_list and re.match(r"^['\"].*['\"],?$", stripped):
            out.setdefault(in_list, []).append(stripped.strip(",").strip("'\""))
            continue
        # Single-line scalar
        m = re.match(r"^(\w+):\s*(.+)$", line)
        if m:
            key, val = m.group(1), m.group(2).strip()
            # Strip quotes.
            # 單引號分支必須還原 YAML 的 `''` 轉義（規範：單引號字串裡的字面撇號
            # 寫成兩個單引號）。不還原的話 zh 的 `'No Man''s Land'` 會跟譯文的
            # `"No Man's Land"` 比出假 drift——兩邊語意其實完全相同，只是引號
            # 風格不同。2026-07-27 追查 passthrough 誤判時抓到；跟當日 heal-
            # passthrough-fields 的病同構（比字串而非比語意），那次只修了 heal，
            # 這條解析路徑沒一起收斂。
            if val.startswith("'") and val.endswith("'") and len(val) >= 2:
                val = val[1:-1].replace("''", "'")
            elif val.startswith('"') and val.endswith('"') and len(val) >= 2:
                val = val[1:-1]
            out[key] = val
            in_list = None
        # Indented list item under a key
        elif line.startswith("  - ") and in_list:
            out.setdefault(in_list, []).append(line[4:].strip().strip("'\""))
        # New list-style key (`tags:` followed by indent)
        m2 = re.match(r"^(\w+):\s*$", line)
        if m2:
            in_list = m2.group(1)
    return (out, body)


# Targets whose own script legitimately overlaps CJK Han (kanji / hanja) —
# "contains CJK" is not a leftover-untranslated signal for these; byte-identity
# to the zh source is.
CJK_SCRIPT_LANGS = {"ja", "ko"}


def has_cjk(s: str) -> bool:
    return any("一" <= ch <= "鿿" for ch in str(s))


def detect_lang(trans_path: str) -> str:
    """Infer target language from repo, absolute, or run-quarantine paths.

    Callers normally pass ``knowledge/{lang}/...``, but vortex review also
    verifies absolute paths and ``quarantine/{lang}--{slug}.md`` artifacts.
    Treating those as legacy English makes genuinely translated CJK/Arabic
    metadata fail the wrong leftover rule.
    """
    normalized = str(trans_path).replace("\\", "/")
    m = re.search(r"(?:^|/)knowledge/([a-z]{2})(?:/|$)", normalized)
    if m:
        return m.group(1)
    m = re.search(r"(?:^|/)([a-z]{2})--[^/]+\.md$", normalized)
    if m:
        return m.group(1)
    m = re.match(r"^([a-z]{2})/", normalized)
    return m.group(1) if m else "en"


URL_PATTERN = (
    r"https?://[^\s<>\)\"\]`"
    r"，。；：！？、（）〔〕【】《》「」『』…"      # 中日韓全形
    r"،؛؟«»"                                    # 阿拉伯／波斯
    r"।॥"                                       # 天城體 danda
    r"]+"
)


def extract_urls(body: str) -> list[str]:
    """抽網址並剝掉尾端的句讀（第 11 檢查「URL count」的尺；2026-09-22 從函式內
    hoist 到模組層，讓 patch-translate.py 的「既有譯文自己就帶 URL 債」預檢 import
    同一把尺，不另抄一份 regex）。

    中文原文常把網址直接黏在標點後面（沒有空格），譯文則用該語言自己的
    半形標點——同一個網址於是被抽成 `…AE` vs `…AE,` 兩個不同 token，
    multiset 比對永遠不合。**兩邊套同一套剝除規則**才是對稱的比較：
    剝的是句讀（. , ; : ! ?），不是網址結構字元（/ ? # & = 等），所以
    真正的網址竄改（改路徑、換域名、加減參數）仍然抓得到。

    2026-09-24：再加一條兩側對稱的正規化——**markdown 反斜線跳脫還原**
    （`\\_`→`_`、`\\(`→`(`、`\\*`→`*`）。CommonMark 在連結目的地與內文都會
    先處理反斜線跳脫，所以 `Ruisui,\\_Hualien` 跟 `Ruisui,_Hualien` 渲染出的
    href 一模一樣；差別只在 prettier 有沒有經手。dispatcher 在驗證前對譯文跑
    prettier、zh 母稿卻是 commit 當時的樣子，於是四篇 prettier 不穩定的母稿
    （蓬萊米／台灣客家音樂／高雄加工出口區／新竹米粉）的每一份譯文都被判網址
    改寫，十二語永遠過不了（run 98122 修後窗至少 10 次）。真正的網址不含反斜線，
    還原後才比，擋下的仍只有真的改了網址的譯文。尾端剝除一併加上跳脫殘留的
    `\\` 與強調符號 `*`（網址不會以星號結尾，那是外層斜體的收尾）。

    2026-09-25：尾端剝除再加 `_`。prettier 把斜體統一寫成 `_…_`，所以同一行
    `*圖片頁：https://…/Port_of_Kaohsiung_map.svg。*` 在母稿是星號收尾、在
    dispatcher 驗證的譯文是 `…svg._`——`*` 已經剝、`_` 沒剝，高雄加工出口區三
    語、三種模型全部卡在這一條。GFM 的自動連結本來就不把結尾的 `_` 算進網址，
    渲染出的 href 相同；兩側一起剝，真的改掉路徑中段的譯文照樣擋。
    """
    urls = []
    for u in re.findall(URL_PATTERN, body):
        u = _MD_ESCAPE_RE.sub(r"\1", u)
        urls.append(u.rstrip(".,;:!?*_\\"))
    return urls


_MD_ESCAPE_RE = re.compile(r"\\([!-/:-@\[-`{-~])")


def count_pattern(text: str, pat: str, flags=0) -> int:
    return len(re.findall(pat, text, flags))


def check(checks: list[dict], json_out: bool):
    hard_fail = sum(1 for c in checks if c["level"] == "FAIL")
    warns = sum(1 for c in checks if c["level"] == "WARN")
    passed = sum(1 for c in checks if c["level"] == "PASS")

    if json_out:
        print(json.dumps({
            "passed": passed,
            "warns": warns,
            "fails": hard_fail,
            "checks": checks,
        }, ensure_ascii=False, indent=2))
    else:
        for c in checks:
            icon = {"PASS": "[OK]", "WARN": "[WARN]", "FAIL": "[FAIL]"}[c["level"]]
            print(f"  {icon} {c['name']}: {c['detail']}")
        print(f"\n{'='*60}")
        if hard_fail:
            print(f"FAIL: {hard_fail} hard / {warns} warn / {passed} pass")
        elif warns:
            print(f"WARN: {warns} warn / {passed} pass (no hard fail)")
        else:
            print(f"ALL PASS: {passed}/{len(checks)}")
    return hard_fail


def main():
    p = argparse.ArgumentParser()
    p.add_argument("zh_path")
    p.add_argument("en_path")
    p.add_argument("--json", action="store_true")
    args = p.parse_args()

    zh_path = args.zh_path.lstrip("knowledge/").lstrip("/")
    en_path = args.en_path
    if en_path.startswith("knowledge/"):
        en_path = en_path
    elif not en_path.startswith("/"):
        en_path = f"knowledge/{en_path}"

    zh_full = KN / zh_path
    en_full = REPO / en_path
    lang = detect_lang(en_path)
    cjk_script_target = lang in CJK_SCRIPT_LANGS
    checks = []

    def add(name, level, detail):
        checks.append({"name": name, "level": level, "detail": detail})

    # 1. en exists
    if not en_full.exists():
        add("en file exists", "FAIL", f"{en_full} missing")
        return check(checks, args.json) and 1
    add("en file exists", "PASS", _repo_rel(en_full))

    # 2. zh exists
    if not zh_full.exists():
        add("zh source exists", "FAIL", f"{zh_full} missing — orphan?")
    else:
        add("zh source exists", "PASS", str(zh_full.relative_to(REPO)))

    zh_content = zh_full.read_text(encoding="utf-8") if zh_full.exists() else ""
    en_content = en_full.read_text(encoding="utf-8")
    zh_fm, zh_body = parse_fm(zh_content) if zh_content else ({}, "")
    en_fm, en_body = parse_fm(en_content)

    # 3. translatedFrom
    tf = en_fm.get("translatedFrom", "").replace("knowledge/", "")
    if not tf:
        add("translatedFrom", "FAIL", "missing")
    elif tf != zh_path:
        add("translatedFrom", "FAIL", f"points to '{tf}' but zh is '{zh_path}'")
    else:
        add("translatedFrom", "PASS", tf)

    # 4. sourceCommitSha
    sha = en_fm.get("sourceCommitSha", "")
    if not sha:
        add("sourceCommitSha", "FAIL", "missing — run `lang-sync refresh ... --apply --sha-only`")
    elif sha == "pre-toolkit":
        add("sourceCommitSha", "WARN", "pre-toolkit fallback (acceptable for legacy)")
    elif not re.match(r"^[a-f0-9]{7,12}$", sha):
        add("sourceCommitSha", "FAIL", f"invalid format: '{sha}'")
    else:
        add("sourceCommitSha", "PASS", sha)

    # 5. sourceContentHash
    h = en_fm.get("sourceContentHash", "")
    if not h:
        add("sourceContentHash", "FAIL", "missing")
    elif not re.match(r"^sha256:[a-f0-9]{16,}$", h):
        add("sourceContentHash", "FAIL", f"invalid format: '{h[:30]}'")
    else:
        add("sourceContentHash", "PASS", h[:25] + "...")

    # 6. translatedAt
    at = en_fm.get("translatedAt", "")
    if not at:
        add("translatedAt", "FAIL", "missing")
    elif not re.match(r"^\d{4}-\d{2}-\d{2}T", at):
        add("translatedAt", "FAIL", f"invalid ISO 8601: '{at}'")
    else:
        add("translatedAt", "PASS", at)

    # 7. Passthrough fields match
    mismatches = []
    if zh_fm:
        for f in PASSTHROUGH:
            zh_v = zh_fm.get(f)
            en_v = en_fm.get(f)
            if zh_v is not None and zh_v != en_v:
                mismatches.append(f"{f}: zh='{zh_v}' en='{en_v}'")
    if mismatches:
        add("passthrough fields", "FAIL",
            f"{len(mismatches)} drift: {'; '.join(mismatches[:3])}")
    else:
        add("passthrough fields", "PASS", f"{len(PASSTHROUGH)} fields match zh")

    # 7b. Inline body image-path integrity (2026-06-13: the gap that let the
    # translator mangle filename digits through — ja -19.png / fr -2024.jpg.
    # Frontmatter `image` is frozen via PASSTHROUGH, but inline ![](…) paths were
    # never checked. Image paths are language-agnostic: every inline ref must point
    # to a real file AND appear in the zh source. Paths must be copied verbatim,
    # never re-generated by the translation LLM.)
    img_re = re.compile(r"/article-images/[^\"')\s\]>]+?\.(?:webp|jpe?g|png|svg)")
    en_imgs = sorted(set(img_re.findall(en_body)))
    zh_imgs = set(img_re.findall(zh_body)) if zh_body else set()
    broken = [p for p in en_imgs if not (REPO / "public" / p.lstrip("/")).exists()]
    foreign = [p for p in en_imgs
               if zh_imgs and p not in zh_imgs and (REPO / "public" / p.lstrip("/")).exists()]
    if broken:
        add("inline image paths", "FAIL",
            f"{len(broken)} broken (file missing — translator mangled?): {'; '.join(broken[:3])}")
    elif foreign:
        add("inline image paths", "WARN",
            f"{len(foreign)} not in zh source (stale or altered): {'; '.join(foreign[:2])}")
    elif en_imgs:
        add("inline image paths", "PASS", f"{len(en_imgs)} inline refs exist + match zh")
    else:
        add("inline image paths", "PASS", "no inline images")

    # 8. ratio (use existing translation-ratio-check.sh)
    ratio_tool = REPO / "scripts/tools/translation-ratio-check.sh"
    if ratio_tool.exists():
        r = subprocess.run(
            ["bash", str(ratio_tool), _repo_rel(en_full)],
            capture_output=True, text=True,
        )
        # Parse the verdict out of THIS file's own table row, not out of the
        # whole stdout blob. Two reasons, both found live on 2026-08-09 when
        # 34/34 healthy files reported "verdict unclear":
        #   1. ratio-check prints the verdict wrapped in ANSI colour, so it
        #      emits "\x1b[0;32mOK" — there is no space before "OK" and the
        #      old `" OK " in out` test could never match. The PASS branch was
        #      unreachable, so every healthy translation silently degraded to a
        #      WARN. A gate that can only ever warn is decorative.
        #   2. ratio-check's failure footer contains the literal sentence
        #      "(TRUNCATED translations require rework)". Substring-matching the
        #      whole output therefore reports TRUNCATED for a file whose real
        #      verdict was URL_LOSS or MISSING_SECTIONS — right severity, wrong
        #      cause, and the wrong remedy in the message.
        # Row format is `{basename:<60} {ratio:>5.2f}  {colour}{verdict:<20}...`
        # (see scripts/tools/translation-ratio-check.sh table printer).
        out = _strip_ansi(r.stdout + r.stderr)
        verdict, ratio = None, "?"
        row_re = re.compile(
            r"^" + re.escape(Path(en_full).name[:58]) + r"\s+(\S+)\s+(\S+)"
        )
        for line in out.splitlines():
            m = row_re.match(line)
            if m:
                ratio, verdict = m.group(1), m.group(2)
                break
        if verdict is None:
            add("translation ratio", "WARN", f"no row for this file: {out[:80]}")
        elif verdict == "TRUNCATED":
            add("translation ratio", "FAIL", f"TRUNCATED (ratio {ratio}) — re-translate")
        elif verdict == "OK":
            add("translation ratio", "PASS", f"OK ({ratio})")
        else:
            # THIN / LONG / URL_LOSS / NO_URLS / MISSING_SECTIONS(n) / MISSING.
            # ratio-check itself colours these yellow rather than red, so don't
            # escalate past what its own author escalated.
            add("translation ratio", "WARN", f"{verdict} (ratio {ratio}) — spot-check recommended")
    else:
        add("translation ratio", "WARN", "ratio tool not found")

    # 9. footnote count
    zh_fns = count_pattern(zh_body, r"^\[\^[\w-]+\]:", re.M)
    en_fns = count_pattern(en_body, r"^\[\^[\w-]+\]:", re.M)
    if zh_fns != en_fns:
        add("footnote count", "FAIL",
            f"zh={zh_fns} vs en={en_fns} — definitions lost or added")
    else:
        add("footnote count", "PASS", f"both have {zh_fns}")

    # 10. ## section count
    zh_secs = count_pattern(zh_body, r"^##\s+", re.M)
    en_secs = count_pattern(en_body, r"^##\s+", re.M)
    diff = abs(zh_secs - en_secs)
    if diff > 1:
        add("section count", "FAIL", f"zh={zh_secs} vs en={en_secs}")
    elif diff == 1:
        add("section count", "WARN", f"zh={zh_secs} vs en={en_secs} (1 diff)")
    else:
        add("section count", "PASS", f"both have {zh_secs}")

    # 11. URL preservation. Count-only let a model alter a percent-encoded byte
    # while keeping the same number of links; the gate reported PASS although the
    # URL no longer matched the source. Translation must preserve the exact URL
    # multiset. Image credits are passthrough fields, and adding a new Wikipedia
    # link is editorial work—not a translation exception—so the old ±2 tolerance
    # silently admitted both loss and invention.
    # `>` terminates autolinks (`<https://…>`); without it the extractor
    # accidentally swallowed the source-language prose after the URL.
    # 全形標點也是網址的終止符（2026-08-01）。中文原文常把網址直接黏在全形
    # 標點後面而沒有空格（`https://…org/；開幕日期為2011年…`、
    # `…%E4%BA%AE，出生地：高雄市左營區`），舊 regex 只認空白與半形括號，
    # 於是把後面整段中文吞進「網址」token。譯文正確地只留網址，multiset
    # 比對就永遠對不上——**擋下的是好譯文，不是壞譯文**。
    # 實證：對已上線的 knowledge/en/People/zhuge-liang-showman.md 跑同一支
    # 檢查器會得到位元組相同的 FAIL，證明是既有的檢查器缺陷而非新譯文問題。
    # 2026-09-10：終止符原本只列中文全形標點，於是阿拉伯文的 `، ` 被當成網址的
    # 一部分吞進 token。zh 側是 `…jpg`，授權為`（全形逗號有排除），ar 側是
    # `…jpg`、 مرخصة`——同一個網址抽成兩個 token，multiset 永遠不合。跟上面
    # 2026-08-01 那次同一種病：**擋下的是好譯文**。
    # 反引號一起加進來：URL 裡不可能有反引號，而 `\`URL\`` 這種行內碼寫法會讓
    # 兩側都多吞一個字元（湊巧對稱才沒爆），拿掉比留著乾淨。
    _urls = extract_urls  # 模組層單一來源（2026-09-22 hoist，patch-translate 預檢同一把尺）

    zh_url_values = _urls(zh_body)
    en_url_values = _urls(en_body)
    zh_urls = len(zh_url_values)
    en_urls = len(en_url_values)
    missing_urls = list((Counter(zh_url_values) - Counter(en_url_values)).elements())
    extra_urls = list((Counter(en_url_values) - Counter(zh_url_values)).elements())
    if zh_urls != en_urls:
        add("URL count", "FAIL", f"zh={zh_urls} vs en={en_urls}")
    elif missing_urls or extra_urls:
        detail = []
        if missing_urls:
            detail.append(f"missing/altered={missing_urls[0][:90]}")
        if extra_urls:
            detail.append(f"extra/altered={extra_urls[0][:90]}")
        add("URL count", "FAIL", "; ".join(detail))
    else:
        add("URL count", "PASS", f"exact multiset preserved ({zh_urls})")

    # 12. duplicate _References_
    if re.search(r"_References:_[\s\S]{0,40}_References:_", en_body):
        add("no duplicate refs", "FAIL", "duplicate `_References:_` block found")
    else:
        add("no duplicate refs", "PASS", "single block")

    # 13. title/description/imageAlt not left untranslated.
    #     Non-CJK-script target (en/es/fr/vi/id/pt/hi/...): flag any zh CJK char.
    #     CJK-script target (ja/ko): kanji/hanja is legitimate, so instead flag
    #     the field being byte-identical to the zh source (real untranslated leftover).
    # 2026-07-26 第九假陽性家族：description 內的「音譯＋括號漢字」gloss
    #（吳宗憲、鈊象電子）是 per-language guide 明文要求的編輯選擇，body 掃描
    # 早有括號/書名號/引號豁免（cjk-leak-check LEGIT_ZH_SPANS），frontmatter
    # 檢查漏了同一套——模型照 guide 做事反而被判未翻譯。同一把尺原則：
    # 檢查前先剝除同款合法區間（≤30 字上限同源）。
    # 2026-07-26 收斂：本函式早上曾自己複製一份豁免 regex（第三份），
    # 元掃描時抓到——正是同日修了十次的那個病。改 import 單一來源。
    import importlib.util as _ilu
    _spec = _ilu.spec_from_file_location(
        "_cjkleak", str(Path(__file__).parent / "cjk-leak-check.py"))
    _cjk = _ilu.module_from_spec(_spec)
    _spec.loader.exec_module(_cjk)
    _strip_legit = _cjk.strip_legit_zones
    bad_fields = []
    for f in ("title", "description", "imageAlt"):
        v = en_fm.get(f, "")
        if not v:
            continue
        if cjk_script_target:
            if zh_fm and v == zh_fm.get(f, object()):
                bad_fields.append(f"{f}: identical to zh '{v[:30]}'")
        elif has_cjk(_strip_legit(str(v))):
            bad_fields.append(f"{f}: '{v[:30]}'")
    if bad_fields:
        add("frontmatter not untranslated", "FAIL",
            f"{len(bad_fields)} fields left untranslated: {'; '.join(bad_fields)}")
    else:
        add("frontmatter not untranslated", "PASS", "title/desc/alt genuinely translated")

    # 14. tags not left untranslated (same dual strategy as #13).
    def parse_tag_list(raw):
        if isinstance(raw, str):
            if raw.startswith("["):
                return re.findall(r"['\"]?([^,'\"\[\]]+?)['\"]?(?=,|\])", raw)
            return [raw] if raw else []
        return raw or []

    tags = en_fm.get("tags", "")
    tag_list = parse_tag_list(tags)
    if cjk_script_target:
        # Proper nouns (person/place/brand names) are often legitimately identical
        # zh vs ja/ko (same kanji/hanja). A single overlapping name isn't a signal —
        # the WHOLE array copied verbatim (the real bug: 2026-07-24 ja P1 batch) is.
        # Flag only when the majority of tags are untranslated.
        zh_tag_list = parse_tag_list(zh_fm.get("tags", "")) if zh_fm else []
        # 2026-09-24：只拿帶漢字的標籤算比例。拉丁字母標籤（Portaly／PLG／AI／
        # SaaS 這類品牌與縮寫）在 ja/ko 本來就原樣保留，算進分子會讓一篇四個
        # 英文標籤、兩個已譯日文標籤的譯文被判「4/6 未翻」（run 98122 近 24 小時
        # 章節 patch 被拒 20 次裡 10 次是這道閘，這是其中一種形狀）。這道閘要抓的
        # 是整組中文標籤原樣照抄，那個訊號只存在於帶漢字的標籤裡。
        cjk_tags = [t for t in tag_list if t and has_cjk(t)]
        overlap = [t for t in cjk_tags if t in zh_tag_list] if zh_tag_list else []
        # 2026-09-26：日文只在「整組漢字標籤原樣照抄」時才擋。60% 門檻對日文量錯了
        # 東西——森林、瀑布、漁業、地質這類一般名詞跟地名人名一樣，日文本來就同字。
        # 產線隔離樣本 13 篇裡 12 篇是模型把該譯的譯了（連体嬰児、核廃棄物、
        # 台湾食文化），剩下的剛好也是日文同字，照樣被判未翻；ja 缺稿裡一整群小篇
        # （新竹米粉、蘇澳冷泉、太平輪）因此各敗六、七次。模型只要動過任何一個
        # 漢字標籤，就不是 2026-07-24 那種整組沒碰的照抄。韓文標籤該是諺文，漢字
        # 同形本身就可疑，維持 60%。
        if lang == "ja":
            bad_tags = overlap if cjk_tags and len(overlap) == len(cjk_tags) else []
        else:
            bad_tags = overlap if cjk_tags and len(overlap) / len(cjk_tags) >= 0.6 else []
        label = "tags not identical to zh"
        detail_ok = f"{len(tag_list)} tags ({len(overlap)} proper-noun overlap with zh, OK)"
        # Baseline exemption (2026-07-30): tags that are predominantly proper nouns
        # (zoo/mountain/brand names) are LEGITIMATELY identical kanji in ja — e.g.
        # 台灣有哪些動物園 has 9/9 name tags, and the previously-accepted ja HEAD
        # carries the same 9. The 60% rule alone perma-kills every retranslation of
        # such articles (50 ja fails in 48h were this false-positive family). If the
        # accepted HEAD baseline ALREADY overlapped zh ≥60%, identical tags are the
        # established norm for this article, not a regression. New translations
        # (no HEAD baseline) keep the strict rule — the 2026-07-24 verbatim-copy bug
        # (files whose baseline tags DIFFERED from zh) is still caught.
        if bad_tags and en_path.startswith("knowledge/"):
            try:
                head_txt = subprocess.run(
                    ["git", "-C", str(REPO), "show", f"HEAD:{en_path}"],
                    capture_output=True, text=True, timeout=10).stdout
                head_fm, _ = parse_fm(head_txt) if head_txt else ({}, "")
                head_tags = parse_tag_list(head_fm.get("tags", ""))
                head_overlap = [t for t in head_tags if t and t in zh_tag_list]
                if head_tags and len(head_overlap) / len(head_tags) >= 0.6:
                    bad_tags = []
                    detail_ok = (f"{len(tag_list)} tags ≥60% identical to zh, but accepted "
                                 f"HEAD baseline already was too (proper-noun norm)")
            except Exception:
                pass  # baseline unavailable → keep strict rule
    else:
        bad_tags = [t for t in tag_list if has_cjk(t)]
        label = "tags ASCII"
        detail_ok = f"{len(tag_list)} tags all ASCII"
    if bad_tags:
        add(label, "FAIL",
            f"{len(bad_tags)}/{len(tag_list)} tags untranslated (≥60% identical to zh source): {bad_tags[:5]}")
    elif not tag_list:
        add(label, "WARN", "no tags found (might be OK)")
    else:
        add(label, "PASS", detail_ok)

    # 14b. zh 有、譯文沒有的 frontmatter 欄位（2026-08-01）。
    #
    # 病史：本檢查器只認 PASSTHROUGH／TRANSLATED 兩張明列清單，清單外的欄位
    # 掉了完全沒人知道。2026-07-31 一晚三次撞到同一個盲區——Haiku 把
    # [[wikilink]] 拆成純文字、Sonnet 兩篇各掉 zh 的 sporeLinks 區塊，
    # 三個閘門全綠，全靠人工逐檔比對才接住。清單是白名單，白名單防不住
    # 「新欄位誕生後沒人記得加進來」這件事（sporeLinks 2026-06-10 誕生，
    # imageSource／imageLicense 亦同）。
    #
    # 判準取最保守：只報「zh 有值、譯文整個欄位不存在」。譯文多出欄位不報
    # （EN_ONLY 那組本來就該多），值不同也不報（翻譯本來就會不同）。
    KNOWN_TRANSLATION_ONLY = set(EN_ONLY) | {"translatedAt", "sourceBodyHash"}
    dropped = [
        k for k in zh_fm
        if k not in en_fm
        and k not in KNOWN_TRANSLATION_ONLY
        and str(zh_fm.get(k, "")).strip()
    ]
    # 既有債不擋（2026-08-01 01:25 巡檢實撞）：本檢查上線後，`es/鄭愁予` 走
    # semantic-noop-bump（只更新版本標記、不呼叫模型的最便宜路徑）被擋下，
    # 理由是欄位遺漏——但那是全站 1,802 檔的既有債，不是這次操作弄掉的。
    # 後果是「零成本的 bump」被打回「整篇重翻」，反而燒算力。
    #
    # 判準跟死鏈那條同源：**只擋這次新弄掉的，不擋繼承來的**。拿譯文自己的
    # git HEAD 版本當基線——HEAD 就沒有的欄位屬存量債（該由
    # heal-missing-frontmatter.py 批次處理，>50 檔待哲宇拍板），不是本次退化。
    if dropped and en_path.startswith("knowledge/"):
        try:
            head_txt = subprocess.run(
                ["git", "-C", str(REPO), "show", f"HEAD:{en_path}"],
                capture_output=True, text=True, timeout=10).stdout
            if head_txt:
                head_fm, _ = parse_fm(head_txt)
                preexisting = [k for k in dropped if k not in head_fm]
                if preexisting:
                    inherited = sorted(preexisting)
                    dropped = [k for k in dropped if k not in preexisting]
                    if not dropped:
                        add("frontmatter 欄位未遺漏", "WARN",
                            f"缺 {len(inherited)} 個欄位但 HEAD 版本也缺（存量債，非本次退化）: {inherited[:4]}")
        except Exception:
            pass  # 拿不到基線 → 維持嚴格

    if dropped:
        add("frontmatter 欄位未遺漏", "FAIL",
            f"zh 有但譯文缺 {len(dropped)} 個欄位: {sorted(dropped)[:6]}")
    elif any(c["name"] == "frontmatter 欄位未遺漏" for c in checks):
        pass  # 上面已加 WARN
    else:
        add("frontmatter 欄位未遺漏", "PASS", f"zh {len(zh_fm)} 個欄位都在譯文裡")

    # 15. inferred bool
    inf = en_fm.get("translatedFromInferred", "")
    if inf and inf not in ("true", "false", "True", "False"):
        add("inferred bool", "FAIL", f"invalid: '{inf}'")
    else:
        add("inferred bool", "PASS", inf or "(absent — also OK)")

    # 16. accidentally-quoted scalar types (readingTime as '11' instead of 11,
    # lastHumanReview/featured/date as 'false'/'2026-03-23' instead of bare).
    # WARN not FAIL: 2026-07-24 empirically verified this does NOT break the
    # build — Astro's content-collection frontmatter loader coerces quoted
    # number/boolean/date strings before Zod validation runs (confirmed via a
    # passing GH Actions build on an existing quoted-date file; raw
    # `zod.parse()` alone does reject these, but that's not what Astro calls).
    # 200+ pre-existing ja/ko files site-wide already have this pattern and
    # build fine — it's a style/consistency drift from the unquoted convention
    # used elsewhere, not a functional defect worth blocking a commit over.
    # Raw-line check since parse_fm() already strips quotes, losing the
    # distinction.
    quoted_type_bugs = []
    fm_raw_block = en_content[3:en_content.find("---", 3)] if en_content.startswith("---") else ""
    for field, kind in (("readingTime", "number"), ("lastHumanReview", "boolean"),
                        ("featured", "boolean"), ("date", "date")):
        m = re.search(rf"^{field}:\s*(.+)$", fm_raw_block, re.MULTILINE)
        if m and re.match(r"^['\"]", m.group(1).strip()):
            quoted_type_bugs.append(f"{field} ({kind}) quoted as string: {m.group(1).strip()}")
    if quoted_type_bugs:
        add("no quoted scalar types", "WARN", "; ".join(quoted_type_bugs))
    else:
        add("no quoted scalar types", "PASS", "readingTime/lastHumanReview/featured/date unquoted")

    # 裝甲殘留（2026-09-23）：三條引擎都用 @@LINKn@@ 把網址擋在 prompt 外，翻完
    # 再換回來。換不回來的時候（模型把 token 改寫成認不出來的形狀）沒有任何一道
    # 閘門在看，於是佔位符直接印在讀者眼前——實測全庫三篇帶著它上線最久的已經
    # 兩週（ko/連江縣 三個、ru/新北市、vi/莫那魯道）。這是「工具持有結構」這條
    # 原則的收尾：持有就要驗自己有沒有還回去，不能只驗模型有沒有亂改。
    # 兩種形狀都要認：整篇引擎的 ⟦U12⟧ 與分段／patch 引擎的 @@LINK3@@。
    # 只認一種等於只擋住一條引擎（實測 ⟦Un⟧ 殘留 10 份、@@LINKn@@ 3 份）。
    armor_residue = re.findall(r"⟦[^\n]{0,14}|@@\s*LINK[^@\s]{0,8}@@", en_content)
    if armor_residue:
        add("no armor placeholder residue", "FAIL",
            f"{len(armor_residue)} 個未還原的佔位符：{', '.join(sorted(set(armor_residue))[:5])}")
    else:
        add("no armor placeholder residue", "PASS", "@@LINKn@@ 全部還原成網址")

    return check(checks, args.json) and 1 or (
        2 if any(c["level"] == "WARN" for c in checks) else 0
    )


if __name__ == "__main__":
    sys.exit(main())
