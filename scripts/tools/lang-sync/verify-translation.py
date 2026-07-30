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

# Frontmatter fields that MUST match between zh and en (passthrough)
# NOTE: `subcategory` deliberately excluded (2026-07-24) — it's a rendered
# taxonomy label (terminology page, graph.astro nodes), not an internal key,
# so per-language subcategory-i18n.json translation is correct, not drift.
# Canonical map: src/data/subcategory-i18n.json.
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
        out = r.stdout + r.stderr
        if "TRUNCATED" in out:
            add("translation ratio", "FAIL", "TRUNCATED — re-translate")
        elif "THIN" in out:
            # ratio-check.sh itself treats THIN as WARN ("acceptable for merge +
            # follow-up"), not a hard block — don't escalate what its own author
            # didn't escalate.
            add("translation ratio", "WARN", "THIN — below expected ratio band, spot-check recommended")
        elif " OK " in out or " PASS " in out:
            # Extract ratio
            m = re.search(r"(\d+\.\d+)\s+\x1b", out) or re.search(r"(\d+\.\d+)", out)
            ratio = m.group(1) if m else "?"
            add("translation ratio", "PASS", f"OK ({ratio})")
        else:
            add("translation ratio", "WARN", f"verdict unclear: {out[:80]}")
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
    url_pattern = r"https?://[^\s<>\)\"\]]+"
    zh_url_values = re.findall(url_pattern, zh_body)
    en_url_values = re.findall(url_pattern, en_body)
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
        overlap = [t for t in tag_list if t and t in zh_tag_list] if zh_tag_list else []
        bad_tags = overlap if tag_list and len(overlap) / len(tag_list) >= 0.6 else []
        label = "tags not identical to zh"
        detail_ok = f"{len(tag_list)} tags ({len(overlap)} proper-noun overlap with zh, OK)"
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

    return check(checks, args.json) and 1 or (
        2 if any(c["level"] == "WARN" for c in checks) else 0
    )


if __name__ == "__main__":
    sys.exit(main())
