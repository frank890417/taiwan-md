#!/usr/bin/env python3
"""
verify-batch.py — Stage P4 統一驗證（per TRANSLATION-PIPELINE v3.3 §平行 sub-agent 批次翻譯 SOP）

機械化驗證所有 batch translation outputs，**不 trust agent self-report**（REFLEXES #31）：
1. 0-byte file purge (agent kill signature — 2026-04-30 δ2 教訓)
2. 存在 + frontmatter 完整度（4 欄位 grep）
3. YAML pre-flight (catch \\'s escape bug + unquoted year tags)
4. Translation ratio (translation-ratio-check.sh)
5. Wikilink residue (should be 0)
6. Cross-article link integrity ((/lang/Category/slug/) targets exist)
7. Sync derived caches (sync-translations-json.py)
8. status.py 確認 stale/missing → fresh

Usage:
    python3 scripts/tools/lang-sync/verify-batch.py [manifest-path]
    # default: .lang-sync-tasks/en/_batch-manifest.json

Exit code:
    0 — all clean (or only soft warnings)
    1 — hard errors (broken frontmatter, missing files, YAML parse, etc.)
    2 — files purged (0-byte cleanup happened) — call again to re-verify
"""
import argparse, json, re, subprocess, sys
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent.parent.parent


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("manifest", nargs="?", default=None)
    ap.add_argument("--purge-empty", action="store_true", default=True)
    ap.add_argument("--quiet", action="store_true")
    args = ap.parse_args()

    manifest_path = Path(args.manifest) if args.manifest else REPO / ".lang-sync-tasks/en/_batch-manifest.json"
    manifest = json.load(open(manifest_path, encoding="utf-8"))
    articles = manifest["articles"]
    lang = manifest["lang"]
    en_paths = [a["en_path"] for a in articles]

    log = print if not args.quiet else (lambda *a, **k: None)
    log(f"\n=== verify-batch ({lang}) — {len(articles)} articles ===\n")

    errors = []
    warnings = []

    # ----- 0. 0-byte purge (agent kill signature) -----
    log("[0/8] 0-byte purge (agent kill signature)...")
    purged = []
    for a in articles:
        p = REPO / a["en_path"]
        if p.exists() and p.stat().st_size == 0:
            if args.purge_empty:
                p.unlink()
                purged.append(a["en_path"])
            else:
                errors.append(f"FAIL: 0-byte file (use --purge-empty to delete): {a['en_path']}")
    if purged:
        log(f"   Purged {len(purged)} 0-byte file(s):")
        for p in purged:
            log(f"      {p}")

    # ----- 1. 存在 + frontmatter completeness (REFLEXES #31) -----
    log("[1/8] 存在 + frontmatter 4 欄位完整度 + translatedFrom 值等於 zh_path...")
    missing_files = []
    bad_frontmatter = []
    translated_from_mismatch = []  # 2026-05-20: LLM agent 偶爾把 translatedFrom 改字（頼→賴 等）regression
    for a in articles:
        p = REPO / a["en_path"]
        if not p.exists():
            missing_files.append(a["zh_path"])
            continue
        text = p.read_text(encoding="utf-8")
        for key in ["translatedFrom", "sourceCommitSha", "sourceContentHash", "translatedAt"]:
            if not re.search(rf"^{key}:\s*['\"]?[^'\"\s]", text, re.M):
                if not re.search(rf"^{key}:", text, re.M):
                    bad_frontmatter.append(f"{a['en_path']}: missing key '{key}'")
                else:
                    bad_frontmatter.append(f"{a['en_path']}: empty value for '{key}'")
        # translatedFrom value MUST equal zh_path (per prepare-batch.py placeholder)
        # — 防 LLM agent 把人名字符自動「正規化」（旧字体 / 新字体 / 簡繁互換）regress 成 orphan
        m = re.search(r"^translatedFrom:\s*['\"]?([^'\"\n]+?)['\"]?\s*$", text, re.M)
        if m:
            actual_tf = m.group(1).strip()
            expected_tf = a["zh_path"]
            if actual_tf != expected_tf:
                translated_from_mismatch.append(
                    f"{a['en_path']}: translatedFrom='{actual_tf}' ≠ zh_path='{expected_tf}'"
                )
    if missing_files:
        log(f"   FAIL: {len(missing_files)} file(s) not written:")
        for f in missing_files:
            log(f"      {f}")
            errors.append(f"missing: {f}")
    if bad_frontmatter:
        log(f"   FAIL: {len(bad_frontmatter)} frontmatter issue(s):")
        for b in bad_frontmatter[:10]:
            log(f"      {b}")
            errors.append(b)
    if translated_from_mismatch:
        log(f"   FAIL: {len(translated_from_mismatch)} translatedFrom value mismatch (LLM regression risk):")
        for m in translated_from_mismatch[:10]:
            log(f"      {m}")
            errors.append(m)
    ok_count = len(articles) - len(missing_files) - len(bad_frontmatter) - len(translated_from_mismatch)
    log(f"   {ok_count} OK")

    # ----- 2. YAML pre-flight (escape bugs) -----
    log("[2/8] YAML pre-flight check...")
    yaml_bugs = []
    for p in en_paths:
        full = REPO / p
        if not full.exists():
            continue
        text = full.read_text(encoding="utf-8")
        if not text.startswith("---"):
            continue
        end = text.find("---", 3)
        fm = text[3:end] if end != -1 else ""
        # Check for sonnet-special: \'s escape inside single-quoted YAML strings
        for line in fm.splitlines():
            if "\\'" in line and "'" in line.split("\\'")[0]:
                yaml_bugs.append(f"{p}: backslash-apostrophe in YAML single-quote (sonnet bug)")
                errors.append(yaml_bugs[-1])
                break
        # 2026-05-20: agent absorb YAML comments into previous key's value
        # readingTime: "# design_rationale:\n#   why_this_hook: ..."  ← 全篇 build break
        if re.search(r'^readingTime:\s*[\'"]#\s*design_rationale', fm, re.M | re.DOTALL):
            yaml_bugs.append(f"{p}: readingTime absorbed YAML comments (# design_rationale block)")
            errors.append(yaml_bugs[-1])
        # tags as quoted string instead of array → blocks build (tags.map is not a function)
        if re.search(r'^tags:\s*[\'"]\[', fm, re.M):
            yaml_bugs.append(f"{p}: tags as quoted string instead of array (tags.map breaks)")
            errors.append(yaml_bugs[-1])
        # Check for unquoted year as tag value (limit to actual tags block content)
        # Extract just the tags block to avoid false positives from date: 2026-04-30 etc
        tags_block_match = re.search(
            r"^tags:\s*(?:\n((?:\s+-.*\n)+)|\[(.*?)\])",
            fm, re.M | re.S
        )
        if tags_block_match:
            tags_content = tags_block_match.group(1) or tags_block_match.group(2) or ""
            # Find bare 4-digit years inside tags block (not inside quotes)
            for y_match in re.finditer(r"(?:^|[\[,\s-])(\d{4})(?:[,\]\s]|$)", tags_content):
                y = y_match.group(1)
                # Check if this specific occurrence is quoted
                if not re.search(rf"['\"]\s*{y}\s*['\"]", tags_content):
                    yaml_bugs.append(f"{p}: unquoted year {y} in tags (will parse as int)")
                    warnings.append(yaml_bugs[-1])
                    break
    if yaml_bugs:
        log(f"   {len(yaml_bugs)} YAML issue(s) — see errors above")
    else:
        log(f"   {len([p for p in en_paths if (REPO/p).exists()])} files OK")

    # ----- 3. Translation ratio -----
    log("[3/8] Translation ratio...")
    existing = [p for p in en_paths if (REPO / p).exists()]
    if existing:
        result = subprocess.run(
            ["bash", "scripts/tools/translation-ratio-check.sh"] + existing,
            cwd=REPO, capture_output=True, text=True, timeout=60
        )
        ok_count = result.stdout.count("OK")
        log(f"   {ok_count}/{len(existing)} OK")
        if result.returncode != 0:
            warnings.append(f"ratio check returncode {result.returncode}")

    # ----- 3b. Footnote completeness HARD GATE (2026-06-06) -----
    # Root cause of 263 silently de-citationed translations: long articles got
    # truncated mid-output by the translate model (max_tokens), dropping the trailing
    # footnote-definition block. The ratio check above only WARNS; footnote loss must
    # be a hard ERROR. Count [^n]: defs in zh source vs translation — translation must
    # have >= source. This is the universal gate: every translate path's output flows
    # through verify-batch, so footnote loss can never ship regardless of which model
    # or sub-agent produced it.
    log("[3b] Footnote completeness (translation defs >= source defs)...")
    fn_def_re = re.compile(r"(?m)^\[\^[^\]]+\]:")
    fn_losses = []
    for a in articles:
        en_full = REPO / a["en_path"]
        zh_full = REPO / "knowledge" / a["zh_path"]
        if not en_full.exists() or not zh_full.exists():
            continue
        src_fns = len(fn_def_re.findall(zh_full.read_text(encoding="utf-8")))
        out_fns = len(fn_def_re.findall(en_full.read_text(encoding="utf-8")))
        if src_fns > 0 and out_fns < src_fns:
            fn_losses.append((a["en_path"], src_fns, out_fns))
    if fn_losses:
        log(f"   FAIL: {len(fn_losses)} translation(s) with footnote loss (likely truncated):")
        for p, s, o in fn_losses[:10]:
            log(f"      {p}: {s}→{o} footnote defs")
            errors.append(f"footnote loss: {p} ({s}→{o} defs)")
    else:
        log(f"   {len([a for a in articles if (REPO/a['en_path']).exists()])} OK")

    # ----- 4. Wikilink residue -----
    log("[4/8] Wikilink residue (target 0)...")
    residue = 0
    for p in en_paths:
        full = REPO / p
        if not full.exists():
            continue
        text = full.read_text(encoding="utf-8")
        wls = re.findall(r"\[\[([^\]]+)\]\]", text)
        if wls:
            residue += len(wls)
            warnings.append(f"{p}: {len(wls)} wikilink residue: {wls[:2]}")
    log(f"   {residue} residue(s)")

    # ----- 5. Cross-article link integrity -----
    log("[5/8] Cross-article link integrity...")
    ok, broken = 0, []
    for p in en_paths:
        full = REPO / p
        if not full.exists():
            continue
        text = full.read_text(encoding="utf-8")
        # 2026-07-27 盲區修復：原 regex 是 `\]\((/{lang}/...)\)`，**只檢查已經帶
        # 語言前綴的連結**。而譯文最常見的壞連結恰恰是沒有前綴的
        # `[大罷免](/history/大罷免)`（模型照著 zh 源原樣保留），它完全不在
        # 掃描範圍內——工具名寫著 cross-article link integrity，實際只看了
        # 一小部分，13,155 筆壞連結因此靜默出貨（見
        # reports/cross-link-localization-2026-07-27.md）。改成掃所有站內
        # 連結，再按有無語言前綴分流判定。
        for match in re.findall(r"\]\((/[^)\s]+?)\)", text):
            path = match.rstrip("/").split("#")[0].split("?")[0]
            if path.startswith(f"/{lang}/"):
                target = REPO / f"knowledge{path}.md"
                if target.exists():
                    ok += 1
                else:
                    broken.append((p, match))
            else:
                # 無語言前綴 = 指向 zh 正本的網址。譯文裡出現它就是壞連結
                # （線上 404 實測），除非該篇在本語言確實還沒有譯文——那種
                # 情況留著中文 slug 是刻意的保守處置，不算 broken。
                zh_target = REPO / f"knowledge{path}.md"
                zh_rel = path.lstrip("/") + ".md"
                # 分類大小寫兩種都試（URL 慣例小寫、檔案路徑首字大寫）
                cands = [zh_rel]
                parts = zh_rel.split("/", 1)
                if len(parts) == 2:
                    cands.append(parts[0].capitalize() + "/" + parts[1])
                has_zh = any((REPO / "knowledge" / c).exists() for c in cands)
                has_lang_version = any(
                    (REPO / "knowledge" / lang / c).exists() for c in cands)
                if has_zh and has_lang_version:
                    broken.append((p, match + "  ← 該語言有譯文卻指向 zh 網址"))
                elif has_zh:
                    ok += 1        # 該語言還沒翻，保留 zh slug 是正確處置
                else:
                    broken.append((p, match + "  ← 目標不存在"))
    if broken:
        for src, link in broken[:5]:
            log(f"   FAIL: {src}: → {link}")
            warnings.append(f"broken cross-link: {src} → {link}")
    log(f"   {ok} OK, {len(broken)} broken")

    # ----- 6. Sync derived caches -----
    log("[6/8] sync-translations-json...")
    result = subprocess.run(
        ["python3", "scripts/tools/sync-translations-json.py"],
        cwd=REPO, capture_output=True, text=True, timeout=60
    )
    last = result.stdout.strip().splitlines()[-1] if result.stdout.strip() else ""
    log(f"   {last}")

    # ----- 7. status.py confirm fresh -----
    log("[7/8] lang-sync status confirm fresh...")
    result = subprocess.run(
        ["python3", "scripts/tools/lang-sync/status.py", "--lang", lang, "--no-write"],
        cwd=REPO, capture_output=True, text=True, timeout=120
    )
    for line in result.stdout.splitlines():
        if line.strip().startswith(lang):
            log(f"   {line.strip()}")
            break

    # ----- Summary -----
    log(f"\n=== Summary ===")
    log(f"   Errors:   {len(errors)}")
    log(f"   Warnings: {len(warnings)}")
    log(f"   Purged:   {len(purged)} 0-byte files")

    if purged and not errors:
        sys.exit(2)
    sys.exit(0 if not errors else 1)


if __name__ == "__main__":
    main()
