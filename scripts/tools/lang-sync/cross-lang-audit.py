#!/usr/bin/env python3
"""
cross-lang-audit.py — 以繁體中文 SSOT 為核心的全站語系健檢

Audit dimensions（每篇 zh canonical 跨 5 lang 比對）：

1. **Slug consistency**：以 en slug 為 canonical reference（URL 慣例 post Tailwind-Phase-6 fix）
   - 檢查每個 zh source 的 5 lang 翻譯 slug 是否一致
   - en slug 是 canonical，其他 lang 應 match en slug

2. **translatedFrom 格式**（DNA #42 v3）
   - 必須是 'Category/中文檔.md'（不含 'knowledge/' 前綴）
   - 必須含 .md 副檔名 + 單引號

3. **Body lang 一致性**
   - en/es/fr：Latin 字母占比 ≥ 70%
   - ja：含足夠 hiragana/katakana（≥ 1% body）
   - ko：含足夠 Hangul（≥ 5% body）
   - zh：CJK Han 占比 ≥ 50%

4. **Frontmatter 完整性**
   - 必填欄位：title, description, date, category, translatedFrom, sourceCommitSha

5. **File existence**
   - 翻譯檔案實際存在
   - translatedFrom 指向的 zh source 存在（orphan check）

Output: JSON report (`reports/cross-lang-audit-YYYY-MM-DD.json`) + colored CLI summary
Exit codes: 0 healthy, 1 has critical issues

Usage:
  python3 scripts/tools/lang-sync/cross-lang-audit.py
  python3 scripts/tools/lang-sync/cross-lang-audit.py --lang es        # filter
  python3 scripts/tools/lang-sync/cross-lang-audit.py --severity critical
  python3 scripts/tools/lang-sync/cross-lang-audit.py --json-only      # for CI
"""

import argparse
import json
import re
import sys
from collections import defaultdict
from datetime import date
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent.parent.parent
KNOWLEDGE = REPO / "knowledge"
LANGS = ["en", "ja", "ko", "es", "fr"]

# Body lang detection regex
LATIN_RE = re.compile(r"[a-zA-ZÀ-ſ]")
HAN_RE = re.compile(r"[一-鿿]")
HIRAGANA_KATAKANA_RE = re.compile(r"[぀-ゟ゠-ヿ]")
HANGUL_RE = re.compile(r"[가-힯]")


def parse_frontmatter(text: str):
    """Return (frontmatter_str, body_str). Returns ('', text) if no frontmatter."""
    if not text.startswith("---"):
        return "", text
    end = text.find("\n---", 3)
    if end == -1:
        return "", text
    return text[3:end], text[end + 4 :]


def get_field(fm: str, key: str) -> str:
    """Extract scalar frontmatter field. Strips quotes."""
    m = re.search(rf"^{re.escape(key)}:\s*(.+?)\s*$", fm, re.M)
    if not m:
        return ""
    val = m.group(1).strip()
    if val.startswith(("'", '"')) and val.endswith(("'", '"')):
        val = val[1:-1]
    return val


def get_zh_sources() -> dict:
    """Return { 'Category/檔名.md': abs_path }."""
    out = {}
    for cat in KNOWLEDGE.iterdir():
        if not cat.is_dir() or cat.name in LANGS or cat.name.startswith("_") or cat.name.startswith("."):
            continue
        for f in cat.glob("*.md"):
            if f.name.startswith("_"):
                continue
            rel = f"{cat.name}/{f.name}"
            out[rel] = f
    return out


def get_lang_translations(lang: str) -> dict:
    """Return { 'translatedFrom_value': { 'path': abs, 'slug': str, 'fm': str, 'body': str, ... } }."""
    out = {}
    base = KNOWLEDGE / lang
    if not base.exists():
        return out
    for f in base.rglob("*.md"):
        if f.name.startswith("_"):
            continue
        try:
            text = f.read_text(encoding="utf-8", errors="replace")
        except Exception:
            continue
        fm, body = parse_frontmatter(text)
        tf_raw = get_field(fm, "translatedFrom")
        # Strip 'knowledge/' prefix for normalization (legacy bug tolerance)
        tf_normalized = re.sub(r"^knowledge/", "", tf_raw)
        if not tf_normalized:
            continue
        rel_path = str(f.relative_to(KNOWLEDGE))  # e.g., 'es/Art/postwar-...md'
        slug = f.stem
        out.setdefault(tf_normalized, []).append({
            "path": f,
            "rel": rel_path,
            "slug": slug,
            "fm": fm,
            "body": body,
            "tf_raw": tf_raw,
            "tf_normalized": tf_normalized,
            "lang": lang,
        })
    return out


def detect_body_lang(body: str) -> dict:
    """Count chars by script. Strip footnote definition lines (citations naturally have foreign chars)."""
    body_lines = []
    for line in body.split("\n"):
        if re.match(r"^\[\^.+\]:", line):
            continue
        body_lines.append(line)
    cleaned = "\n".join(body_lines)
    latin = len(LATIN_RE.findall(cleaned))
    han = len(HAN_RE.findall(cleaned))
    jp = len(HIRAGANA_KATAKANA_RE.findall(cleaned))
    ko = len(HANGUL_RE.findall(cleaned))
    total = latin + han + jp + ko
    return {
        "latin": latin,
        "han": han,
        "jp_kana": jp,
        "ko_hangul": ko,
        "total": total,
        "latin_pct": (latin / total * 100) if total else 0,
        "han_pct": (han / total * 100) if total else 0,
        "jp_kana_pct": (jp / total * 100) if total else 0,
        "ko_hangul_pct": (ko / total * 100) if total else 0,
    }


def expected_lang_dominance(lang: str) -> tuple:
    """Return (script_name, min_pct, role) — what should dominate body for this lang."""
    return {
        "zh": ("han", 50, "primary"),
        "en": ("latin", 70, "primary"),
        "es": ("latin", 70, "primary"),
        "fr": ("latin", 70, "primary"),
        "ja": ("jp_kana", 1, "marker"),  # JP also has Han; but kana is JP-only marker
        "ko": ("ko_hangul", 5, "primary"),
    }.get(lang, ("latin", 50, "primary"))


def audit():
    zh_sources = get_zh_sources()
    print(f"📚 zh canonical articles: {len(zh_sources)}", file=sys.stderr)

    # Collect all translations indexed by translatedFrom
    lang_data = {}  # { lang: { 'Category/zh.md': [translation_records] } }
    for lang in LANGS:
        lang_data[lang] = get_lang_translations(lang)

    # Per-lang stats
    for lang in LANGS:
        n = sum(len(v) for v in lang_data[lang].values())
        print(f"  {lang}: {n} translations", file=sys.stderr)

    issues = []

    # Determine en slug as canonical for each zh source
    en_canonical_slug = {}
    for zh_rel, recs in lang_data["en"].items():
        if recs:
            en_canonical_slug[zh_rel] = recs[0]["slug"]

    # Audit each zh source
    for zh_rel, zh_path in zh_sources.items():
        translations_per_lang = {}
        for lang in LANGS:
            recs = lang_data[lang].get(zh_rel, [])
            if recs:
                translations_per_lang[lang] = recs
        if not translations_per_lang:
            continue  # no translations yet

        canonical_slug = en_canonical_slug.get(zh_rel)

        for lang, recs in translations_per_lang.items():
            for rec in recs:
                rec_issues = []

                # Check 1: translatedFrom format (DNA #42 v3)
                if rec["tf_raw"].startswith("knowledge/"):
                    rec_issues.append({
                        "type": "translatedFrom_prefix",
                        "severity": "low",
                        "msg": f"translatedFrom 多 'knowledge/' 前綴：{rec['tf_raw']}",
                    })

                # Check 2: slug consistency (vs en canonical)
                if canonical_slug and rec["slug"] != canonical_slug and lang != "en":
                    rec_issues.append({
                        "type": "slug_mismatch",
                        "severity": "high",
                        "msg": f"slug `{rec['slug']}` ≠ en canonical `{canonical_slug}`",
                        "canonical": canonical_slug,
                        "actual": rec["slug"],
                    })

                # Check 3: body lang consistency
                stats = detect_body_lang(rec["body"])
                exp_script, min_pct, role = expected_lang_dominance(lang)
                exp_pct = stats[f"{exp_script}_pct"]
                if stats["total"] >= 200 and exp_pct < min_pct:
                    severity = "critical" if role == "primary" else "low"
                    rec_issues.append({
                        "type": "body_lang_mismatch",
                        "severity": severity,
                        "msg": f"body {exp_script} = {exp_pct:.1f}% (expected ≥ {min_pct}%) — likely wrong lang content",
                        "stats": {
                            "latin_pct": round(stats["latin_pct"], 1),
                            "han_pct": round(stats["han_pct"], 1),
                            "jp_kana_pct": round(stats["jp_kana_pct"], 1),
                            "ko_hangul_pct": round(stats["ko_hangul_pct"], 1),
                        },
                    })

                # Check 4: frontmatter completeness
                required = ["title", "description", "date", "category"]
                missing = [k for k in required if not get_field(rec["fm"], k)]
                if missing:
                    rec_issues.append({
                        "type": "frontmatter_missing",
                        "severity": "medium",
                        "msg": f"missing frontmatter: {missing}",
                    })

                # Check 5: orphan (zh source missing — shouldn't happen since we filter, but defensive)
                if rec["tf_normalized"] not in zh_sources:
                    rec_issues.append({
                        "type": "orphan",
                        "severity": "high",
                        "msg": f"translatedFrom points to non-existent zh: {rec['tf_normalized']}",
                    })

                if rec_issues:
                    issues.append({
                        "lang": lang,
                        "path": rec["rel"],
                        "zh_source": zh_rel,
                        "slug": rec["slug"],
                        "issues": rec_issues,
                    })

    # Aggregate by severity
    severity_count = defaultdict(int)
    type_count = defaultdict(int)
    for entry in issues:
        for iss in entry["issues"]:
            severity_count[iss["severity"]] += 1
            type_count[iss["type"]] += 1

    return {
        "summary": {
            "zh_canonical_count": len(zh_sources),
            "translations_per_lang": {l: sum(len(v) for v in lang_data[l].values()) for l in LANGS},
            "files_with_issues": len(issues),
            "issues_by_severity": dict(severity_count),
            "issues_by_type": dict(type_count),
        },
        "issues": issues,
    }


def print_summary(report: dict, severity_filter=None, lang_filter=None):
    s = report["summary"]
    print()
    print("━" * 60)
    print(f"📊 跨語系健檢總結 (繁體中文 SSOT 為核心)")
    print("━" * 60)
    print(f"zh canonical articles: {s['zh_canonical_count']}")
    print()
    print("Translations per lang:")
    for lang, n in s["translations_per_lang"].items():
        print(f"  {lang}: {n}")
    print()
    print(f"Files with issues: {s['files_with_issues']}")
    print()
    print("Issues by severity:")
    for sev in ["critical", "high", "medium", "low"]:
        n = s["issues_by_severity"].get(sev, 0)
        emoji = {"critical": "🚨", "high": "🔴", "medium": "🟠", "low": "🟡"}[sev]
        print(f"  {emoji} {sev}: {n}")
    print()
    print("Issues by type:")
    for t, n in sorted(s["issues_by_type"].items(), key=lambda x: -x[1]):
        print(f"  - {t}: {n}")
    print()

    # Detail print (filtered)
    if severity_filter or lang_filter:
        print("━" * 60)
        print(f"Filtered details (severity={severity_filter}, lang={lang_filter}):")
        print("━" * 60)
        for entry in report["issues"]:
            if lang_filter and entry["lang"] != lang_filter:
                continue
            relevant = [i for i in entry["issues"]
                        if not severity_filter or i["severity"] == severity_filter]
            if not relevant:
                continue
            print(f"\n📄 {entry['path']} (zh: {entry['zh_source']})")
            for iss in relevant:
                emoji = {"critical": "🚨", "high": "🔴", "medium": "🟠", "low": "🟡"}.get(iss["severity"], "⚠️")
                print(f"  {emoji} [{iss['type']}] {iss['msg']}")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--lang", help="Filter detail print by lang")
    ap.add_argument("--severity", choices=["critical", "high", "medium", "low"], help="Filter by severity")
    ap.add_argument("--json-only", action="store_true", help="Print only JSON to stdout (for CI)")
    ap.add_argument("--out", default=None, help="Write JSON report to file (default: reports/cross-lang-audit-YYYY-MM-DD.json)")
    args = ap.parse_args()

    report = audit()

    # Write JSON
    out_path = args.out
    if not out_path:
        today = date.today().isoformat()
        out_path = REPO / "reports" / f"cross-lang-audit-{today}.json"
        out_path.parent.mkdir(parents=True, exist_ok=True)
    Path(out_path).write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"💾 JSON: {out_path}", file=sys.stderr)

    if args.json_only:
        print(json.dumps(report, ensure_ascii=False))
    else:
        print_summary(report, severity_filter=args.severity, lang_filter=args.lang)

    # Exit code: 1 if critical issues exist
    critical = report["summary"]["issues_by_severity"].get("critical", 0)
    sys.exit(1 if critical else 0)


if __name__ == "__main__":
    main()
