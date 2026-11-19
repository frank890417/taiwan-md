#!/usr/bin/env python3
"""
bump-source-sha.py — 把 metadata-stale／語意無關 stale 翻譯 frontmatter 升級到 zh latest commit。

Body 已 valid，不重翻只 bump metadata：
  sourceCommitSha → zh latest commit
  sourceContentHash → zh latest contentHash
  sourceBodyHash → zh latest bodyHash（同一個值）

兩種來源：
  1. metadata-stale（REFLEXES #38 第 2 次 instantiation：bodyHash 沒變——trailer /
     footnote URL 之類的變動，body 完全沒動）。預設行為，一直都有。
  2. `--include-punct-only`（2026-07-27，見 reports/semantic-noop-stale-2026-07-27.md）：
     status 判定為 `stale`（bodyHash 真的變了）但 zh diff 本身只是標點/空白正規化——
     半形逗號改全形、句中分號改句號之類——對譯文完全沒有語意影響。判定丟給
     semantic-noop-check.py（單一職責、保守：寧可漏判不可誤判，任何不確定都不算
     no-op）。**這條路徑風險比 metadata-stale 高**（body hash 真的變了，只是變動內容
     被正規化判定為噪音），所以每筆命中的候選在寫入後都會補跑一次
     verify-translation.py 硬 gate；沒過的立刻還原成原內容，不留在「假 fresh」狀態
     （實測：pt/Art/li-poetry-society.md 一例就是靠這道 gate 攔下——它的 zh diff 確實
     只是標點，但譯文本身有跟這次改動無關的既有 passthrough drift，不該被判定為安全
     bump）。預設關閉，需要顯式加旗標。

對 metadata-stale（+ 選配 punct-only-stale）翻譯批次 bump。**不動 body content**。
省下不需要的 cascade translation cost。

Usage:
  python3 bump-source-sha.py                                        # dry-run（無 --apply 就是 dry-run），metadata-stale only
  python3 bump-source-sha.py --apply                                # write
  python3 bump-source-sha.py --apply --lang en                      # 限定 single lang
  python3 bump-source-sha.py --include-punct-only                   # dry-run + 語意無關 stale 判定
  python3 bump-source-sha.py --apply --include-punct-only           # + 寫入（含 post-bump verify gate）
"""
import argparse
import hashlib
import json
import re
import subprocess
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent.parent.parent
KNOWLEDGE = REPO / "knowledge"
NOOP_CHECKER = REPO / "scripts" / "tools" / "lang-sync" / "semantic-noop-check.py"
VERIFY_TRANSLATION = REPO / "scripts" / "tools" / "lang-sync" / "verify-translation.py"
from langs import ALL_TRANSLATION_LANGS
LANGS = ALL_TRANSLATION_LANGS  # SSOT via langs.py (2026-07-18)

# 2026-09-22：bump 同時同步 zh 的卡片圖四欄＋featured（heal-frontmatter-types.SYNC_SCALAR_FIELDS）。
# 病根：zh 只改 frontmatter（把 Wikimedia 熱連結 cache 成 /article-images/）時 bodyHash 不變 →
# metadata-stale → 這裡只 bump 三個 sha 就標 fresh，image 留在舊的熱連結；量到 261 份譯文
# image 跟 zh 不同、179 份仍熱連結（pre-commit image-health hard）。「body 沒變」不等於
# 「frontmatter passthrough 沒變」（#38 混維度）。
from importlib import import_module as _import_module
sys.path.insert(0, str(Path(__file__).resolve().parent))
_heal = _import_module("heal-frontmatter-types")
_st = _import_module("structured-translate")


def run_status_json() -> dict:
    out = subprocess.check_output(
        ["python3", str(REPO / "scripts/tools/lang-sync/status.py"), "--json", "--no-write"],
        cwd=REPO,
    )
    return json.loads(out.decode())


def find_metadata_stale(status: dict, lang_filter: str | None = None) -> list[dict]:
    """Return list of {lang, zh_path, target_path, new_src_sha, new_content_hash, new_body_hash}."""
    out = []
    by_article = status["byArticle"]
    for zh_path, entry in by_article.items():
        zh_data = entry["zh"]
        for lang, t in entry["translations"].items():
            if lang_filter and lang != lang_filter:
                continue
            if t.get("status") != "metadata-stale":
                continue
            out.append({
                "lang": lang,
                "zh_path": zh_path,
                "target_path": t.get("path", ""),
                "new_src_sha": zh_data["lastCommit"],
                "new_content_hash": zh_data["contentHash"],
                "new_body_hash": zh_data["bodyHash"],
            })
    return out


def find_punct_only_stale(status: dict, lang_filter: str | None = None) -> list[dict]:
    """Like find_metadata_stale, but scans `stale` (real bodyHash drift) entries and
    keeps only the ones semantic-noop-check.py judges as punctuation/whitespace-only
    zh diffs. See module docstring §2 for the risk profile — callers MUST run the
    post-bump verify gate (verify_bump_or_revert) on anything this returns."""
    out = []
    by_article = status["byArticle"]
    for zh_path, entry in by_article.items():
        zh_data = entry["zh"]
        for lang, t in entry["translations"].items():
            if lang_filter and lang != lang_filter:
                continue
            if t.get("status") != "stale":
                continue
            target_path = t.get("path", "")
            if not target_path:
                continue
            r = subprocess.run(
                ["python3", str(NOOP_CHECKER), zh_path, target_path, "--json"],
                cwd=REPO, capture_output=True, text=True,
            )
            try:
                verdict = json.loads(r.stdout) if r.stdout.strip() else {}
            except json.JSONDecodeError:
                verdict = {}
            if not verdict.get("noop"):
                continue
            out.append({
                "lang": lang,
                "zh_path": zh_path,
                "target_path": target_path,
                "new_src_sha": zh_data["lastCommit"],
                "new_content_hash": zh_data["contentHash"],
                "new_body_hash": zh_data["bodyHash"],
                "via": "punct-only-stale",
                "noop_reason": verdict.get("reason"),
            })
    return out


# 查證標記兩欄（2026-11-19 twmd-babel-nightly）：11-17 兩個 commit 替 511 篇未審舊文補上
# `curation: incubating`＋`curationReason: unverified`，十二語因此累積 4,524 份 metadata-stale，
# 它們跟 zh 的差別只有這兩行、正文逐字相同。產線照 10-16 的設計把 metadata-stale 送進 patch
# 引擎用模型重翻 frontmatter，一份約 60–150 秒，地端一台機器要排兩天多；而這兩欄是 enum
# （schema 只收 verified／incubating、unverified／thin），譯文本來就是機械照抄 zh。
# 所以這條路只在「zh 自譯文 sourceCommitSha 以來，frontmatter 只變了這兩欄、正文逐字沒變」
# 時成立，其餘 metadata-stale（description／title 有改）照舊交給 patch 引擎。
CURATION_KEYS = ["curation", "curationReason"]


def _zh_split_at(rev: str, zh_path: str, _cache: dict = {}):
    """(frontmatter dict, frontmatter 之後的全文) at git rev；取不到回 None。"""
    key = (rev, zh_path)
    if key not in _cache:
        r = subprocess.run(["git", "show", f"{rev}:knowledge/{zh_path}"],
                           cwd=REPO, capture_output=True, text=True)
        if r.returncode != 0:
            _cache[key] = None
        else:
            try:
                fm, rest = _st.parse_zh_frontmatter(r.stdout)
                _cache[key] = (fm, rest)
            except Exception:  # noqa: BLE001 — 解析不了就不走這條路
                _cache[key] = None
    return _cache[key]


def find_curation_only(status: dict, lang_filter: str | None = None) -> list[dict]:
    """metadata-stale 裡，zh 從譯文的 sourceCommitSha 到 HEAD 只動了 CURATION_KEYS、
    frontmatter 之後逐字相同的那些。任何一項判不出來（sha 取不到、解析失敗）就不收。"""
    out = []
    dirty = _heal.dirty_paths()
    for item in find_metadata_stale(status, lang_filter):
        if f"knowledge/{item['target_path']}" in dirty:
            continue  # 工作樹上有人（產線）正在改，不碰
        t = status["byArticle"][item["zh_path"]]["translations"][item["lang"]]
        old_sha = t.get("sourceCommitSha")
        if not old_sha:
            continue
        old = _zh_split_at(old_sha, item["zh_path"])
        cur = _zh_split_at("HEAD", item["zh_path"])
        if not old or not cur or old[1] != cur[1]:
            continue
        changed = {k for k in set(old[0]) | set(cur[0]) if old[0].get(k) != cur[0].get(k)}
        if not changed or not changed <= set(CURATION_KEYS):
            continue
        # 只往保守方向抄（LESSONS `metadata-stale-bump-assumes-frontmatter-unchanged`）：
        # 抄「incubating」只是替譯文加上「待查證」的提醒；zh 升成 verified 或拿掉標記時，
        # 抄過去等於替沒人看過的譯文蓋查證章，那種留給補丁引擎與人。
        if cur[0].get("curation") != "incubating":
            continue
        item["via"] = "curation-only"
        out.append(item)
    return out


def verify_bump_or_revert(target_md: Path, zh_path: str, target_path: str, original_bytes: bytes) -> tuple[bool, str | None]:
    """Post-bump hard gate for the riskier --include-punct-only path (see module
    docstring). Runs verify-translation.py against the just-written file; on any
    HARD fail, restores original_bytes so the article stays exactly as it was
    (still 'stale', will fall through to the normal translate pipeline next run)
    instead of being silently left in a false-fresh state. Returns (kept, reason)."""
    r = subprocess.run(
        ["python3", str(VERIFY_TRANSLATION), zh_path, target_path, "--json"],
        cwd=REPO, capture_output=True, text=True,
    )
    try:
        out = json.loads(r.stdout) if r.stdout.strip() else {"fails": -1}
    except json.JSONDecodeError:
        out = {"fails": -1}
    fails = out.get("fails", -1)
    if fails == 0:
        return True, None
    target_md.write_bytes(original_bytes)
    return False, f"verify-translation fails={fails}"


def bump_one(target_md: Path, new_sha: str, new_content_hash: str, new_body_hash: str, apply: bool,
             extra_sync: tuple[str, ...] = ()) -> bool:
    """Update frontmatter sourceCommitSha + sourceContentHash + sourceBodyHash. Returns True if changed."""
    content = target_md.read_text(encoding="utf-8")
    if not content.startswith("---"):
        return False
    end = content.find("---", 3)
    if end == -1:
        return False
    fm_text = content[3:end]
    body = content[end + 3:]

    # Replace or insert each key
    def upsert(text: str, key: str, val: str) -> str:
        if re.search(rf"^{re.escape(key)}:\s.*$", text, flags=re.MULTILINE):
            return re.sub(rf"^{re.escape(key)}:\s.*$", f"{key}: '{val}'", text, count=1, flags=re.MULTILINE)
        # Append at end of frontmatter
        return text.rstrip() + f"\n{key}: '{val}'\n"

    new_fm = fm_text
    new_fm = upsert(new_fm, "sourceCommitSha", new_sha)
    new_fm = upsert(new_fm, "sourceContentHash", new_content_hash)
    new_fm = upsert(new_fm, "sourceBodyHash", new_body_hash)

    # passthrough 標量同步（卡片圖四欄＋featured）——zh 找得到才做，找不到就只 bump sha
    m_from = re.search(r"^translatedFrom:\s*['\"]?(.+?)['\"]?\s*$", new_fm, flags=re.MULTILINE)
    zh_md = KNOWLEDGE / m_from.group(1) if m_from else None
    if zh_md and zh_md.exists():
        try:
            zh_fm, _ = _st.parse_zh_frontmatter(zh_md.read_text(encoding="utf-8"))
            lines = new_fm.strip("\n").split("\n")
            lines, _changed = _heal.sync_passthrough_fields(
                lines, zh_fm, fields=list(_heal.SYNC_SCALAR_FIELDS) + list(extra_sync))
            new_fm = "\n" + "\n".join(lines) + "\n"
        except Exception as e:  # noqa: BLE001 — 同步失敗不擋 bump，印出來就好
            print(f"  ⚠️ passthrough sync skipped for {target_md.name}: {e}", file=sys.stderr)

    new_content = "---" + new_fm + "---" + body
    if new_content == content:
        return False
    if apply:
        target_md.write_text(new_content, encoding="utf-8")
    return True


def load_zh_list(path: str) -> set[str]:
    """--zh-list 的檔案：一行一個 zh 路徑，或 cover-ingest 那種 JSON 清單（每筆有 article）。
    回傳去掉 `knowledge/` 前綴的路徑集合，跟 status.json 的 byArticle key 同一種寫法。"""
    text = Path(path).read_text(encoding="utf-8")
    if text.lstrip().startswith("["):
        items = [e["article"] for e in json.loads(text)]
    else:
        items = [l.strip() for l in text.splitlines() if l.strip() and not l.startswith("#")]
    return {i.removeprefix("knowledge/") for i in items}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--apply", action="store_true")
    ap.add_argument("--lang", default=None)
    ap.add_argument("--quiet", action="store_true")
    ap.add_argument("--include-punct-only", action="store_true",
                     help="also bump `stale` (real bodyHash drift) entries whose zh diff is "
                          "punctuation/whitespace-only per semantic-noop-check.py (2026-07-27, "
                          "default off — see reports/semantic-noop-stale-2026-07-27.md)")
    ap.add_argument("--curation-only", action="store_true",
                     help="only bump metadata-stale whose zh change since sourceCommitSha is the "
                          "curation/curationReason pair (body byte-identical), and copy those two "
                          "fields over (2026-11-19; skips paths dirty in the work tree)")
    ap.add_argument("--limit", type=int, default=0,
                     help="process at most N targets (dry-run sampling before a full apply)")
    ap.add_argument("--zh-list", default=None,
                     help="only bump translations of the zh articles listed in this file (one path per "
                          "line, `knowledge/Food/擂茶.md` or `Food/擂茶.md`; a JSON manifest with "
                          "`article` keys also works). For a PR that changed only some zh frontmatter "
                          "(2026-11-19 cover batches): bump those, leave the rest of the backlog alone")
    ap.add_argument("--list-out", default=None,
                     help="write bumped target paths (one per line) to this file")
    args = ap.parse_args()

    print("📊 Fetching status.json...")
    status = run_status_json()
    if args.curation_only:
        targets = find_curation_only(status, args.lang)
        print(f"📋 {len(targets)} curation-only metadata-stale translation(s) to bump")
    else:
        targets = find_metadata_stale(status, args.lang)
        for t in targets:
            t["via"] = "metadata-stale"
        print(f"📋 {len(targets)} metadata-stale translation(s) to bump")
    zh_only = load_zh_list(args.zh_list) if args.zh_list else None
    if zh_only is not None:
        targets = [t for t in targets if t["zh_path"].removeprefix("knowledge/") in zh_only]
        print(f"📋 --zh-list：{len(zh_only)} zh article(s) listed → {len(targets)} translation(s) in scope")
    if args.limit > 0:
        targets = targets[: args.limit]
    bumped_paths: list[str] = []

    if args.include_punct_only:
        print("🔍 checking `stale` entries for punctuation-only zh diffs (semantic-noop-check.py)...")
        punct_targets = find_punct_only_stale(status, args.lang)
        if zh_only is not None:
            punct_targets = [t for t in punct_targets if t["zh_path"].removeprefix("knowledge/") in zh_only]
        print(f"📋 {len(punct_targets)} punct-only-stale translation(s) additionally eligible")
        targets += punct_targets

    if not targets:
        print("✅ Nothing to bump")
        return

    counts = {"bumped": 0, "skipped": 0, "reverted": 0}
    by_via = {"metadata-stale": 0, "punct-only-stale": 0, "curation-only": 0}
    for t in targets:
        target_md = KNOWLEDGE / t["target_path"]
        if not target_md.exists():
            counts["skipped"] += 1
            continue
        original_bytes = target_md.read_bytes() if (args.apply and t["via"] == "punct-only-stale") else None
        extra = tuple(CURATION_KEYS) if t["via"] == "curation-only" else ()
        changed = bump_one(target_md, t["new_src_sha"], t["new_content_hash"], t["new_body_hash"],
                           args.apply, extra_sync=extra)
        if not changed:
            counts["skipped"] += 1
            continue

        if args.apply and t["via"] == "punct-only-stale":
            kept, reason = verify_bump_or_revert(target_md, t["zh_path"], t["target_path"], original_bytes)
            if not kept:
                counts["reverted"] += 1
                if not args.quiet:
                    print(f"  ↩ reverted {t['lang']}/{t['target_path'].replace(t['lang']+'/', '')} — {reason}")
                continue

        counts["bumped"] += 1
        by_via[t["via"]] += 1
        bumped_paths.append(f"knowledge/{t['target_path']}")
        if not args.quiet:
            action = "✓ bumped" if args.apply else "~ would-bump"
            tag = " [punct-only]" if t["via"] == "punct-only-stale" else ""
            print(f"  {action} {t['lang']}/{t['target_path'].replace(t['lang']+'/', '')} → {t['new_src_sha'][:8]}{tag}")

    print()
    mode = "APPLY" if args.apply else "DRY-RUN"
    print(f"📊 bump-source-sha [{mode}]")
    print(f"  {'bumped' if args.apply else 'would-bump'}: {counts['bumped']} "
          f"(metadata-stale={by_via['metadata-stale']}, punct-only-stale={by_via['punct-only-stale']}, "
          f"curation-only={by_via['curation-only']})")
    if args.list_out:
        Path(args.list_out).write_text("\n".join(bumped_paths) + ("\n" if bumped_paths else ""),
                                       encoding="utf-8")
    print(f"  skipped: {counts['skipped']}")
    if args.include_punct_only:
        print(f"  reverted (post-bump verify fail): {counts['reverted']}")


if __name__ == "__main__":
    main()
