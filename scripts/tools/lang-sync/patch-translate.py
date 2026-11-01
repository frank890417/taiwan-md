#!/usr/bin/env python3
"""patch-translate.py — chapter-level diff-patch engine for stale translations.

為什麼存在（2026-07-27 哲宇 directive）：全站 651 篇 stale，抽樣 14 對的改動比例
中位 2.8%（7 行/204 行），78% 改動 <10%。babel-dispatch 對 stale 是整篇重翻——
為 3% 的改動燒掉 100% 的算力。本工具只重翻「被 zh 改動碰過」的章節，未碰的章節
原樣保留譯文，大幅省算力。

## 為什麼是 H2 章節而不是行級 patch

既有 `diff-patch-prepare.py` 是行級 diff 設計（本檔可讀它的 sha 解析邏輯，但**不
沿用其執行路徑**——它把整篇 diff 丟給 Sonnet sub-agent 判斷怎麼 patch，燒 Claude
token，違反本專案「不用 Claude token 翻譯」原則）。行級 patch 還有一個更根本的
問題：**行對行映射跨語言不可靠**——中文一行可能對應譯文兩行或半行，reflow 後行
號完全對不上。H2 章節邊界清楚、譯文與 zh 章節一一對應（既有 verify-translation.py
本來就在驗 section count 這件事），是天然可跨語言對齊的最小翻譯單位。

## Algorithm

  1. 讀譯文 frontmatter 的 sourceCommitSha → 找不到 / 不可解析 → exit 2（fallback）
  2. `git diff --unified=0 <sha>..HEAD -- knowledge/<zh_path>`，解析 hunk 的
     新檔行號範圍
  3. 用**目前** zh 的 H2 邊界切章節（intro + 每個 `## ` 各一章），對照 hunk 行號
     判定哪些章節被碰過；frontmatter 是否碰過另外用「翻譯欄位語意是否改變」
     （不是行號重疊）判斷，避免只是 date/image 這類 passthrough 欄位變動也
     觸發一次不必要的 title/description LLM 呼叫
  4. **硬性章節對齊驗證**：zh 與譯文的 H2 章節數不相等 → exit 2（fallback 全翻）
  5. **改動過大就不 patch**：被碰章節字元數 / 全文字元數 > 0.5 → exit 2
  6. 只把被碰章節的 zh 全文送模型翻譯（帶語言 guide TL;DR + 前後章節譯文各
     200 字當語境），未碰章節原封不動保留舊譯文的位元組
  7. 組回全文 → 跑 prettier 正規化 → 跑既有三重驗證（verify-translation.py /
     cjk-leak-check.py / article-health.py --profile=pre-commit）→ 任一 fail
     不寫檔、exit 1；全過才寫檔、exit 0

## Usage

    python3 patch-translate.py People/瘂弦.md --lang ja \\
        --backend openrouter:nvidia/nemotron-3-ultra-550b-a55b:free

    python3 patch-translate.py People/瘂弦.md --lang ja --dry-run
        # 不需要 --backend；只印章節判定結果，不呼叫模型

    python3 patch-translate.py People/瘂弦.md --lang ja \\
        --backend ollama:qwen3.6:35b-a3b-coding-nvfp4 --out /tmp/patch-test/瘂弦.md

Exit codes：
  0 — 已寫出 patch 後的譯文（或 --dry-run 判定完成，未實際寫檔）
  1 — 嘗試 patch 但驗證未過（不寫檔，呼叫端走既有 gate-fail 處理）
  2 — 不適合 patch（章節數不等 / 改動過大 / sha 不可解析 / 無既有譯文等），
      呼叫端應 fallback 到全文重翻

Backend 呼叫層（build_backend / LANG_NAMES / load_lang_guide_sections）與 Phase B
的驗證邏輯（_validate_chunk）直接 import 自 structured-translate.py，不重寫、不
複製一份會漂移的副本。sha 解析慣例參考 diff-patch-prepare.py（git_show /
git_file_last_commit 概念，本檔用 structured-translate.py 的 git_short_sha 同源
實作）。sourceContentHash/sourceBodyHash 的 canonical 算法來自 status.py（body_hash
/ body_hash_pure）——diff-patch-prepare.py 的教訓：跟 status.py 用不同雜湊語意會
造成「patch 完仍判 stale」的無限迴圈，見該檔開頭註解。
"""
from __future__ import annotations

import argparse
import json
import re
import shutil
import subprocess
import sys
import tempfile
import time
from collections import Counter
from datetime import datetime, timezone
from importlib import import_module
from pathlib import Path

import yaml

SCRIPT_DIR = Path(__file__).resolve().parent           # scripts/tools/lang-sync
REPO = SCRIPT_DIR.parent.parent.parent
KNOWLEDGE = REPO / "knowledge"

sys.path.insert(0, str(SCRIPT_DIR))
from contributor_guard import ContributorGuard         # noqa: E402 — OBSERVER-QUEUE #67 人翻譯文不原地 patch
st = import_module("structured-translate")             # backend / Phase F / Phase B / Phase N helpers
status_mod = import_module("status")                    # body_hash / body_hash_pure canonical (見上方 docstring)
cjkleak = import_module("cjk-leak-check")

import cross_link_localizer as _xlink  # noqa: E402 — 站內連結在地化（防新增，見 zh_chunk 抽取點）

_whole = import_module("translate")  # materialize_resolved_wikilinks（見 _resolve_wikilinks）
_verify = import_module("verify-translation")  # extract_urls：跟 verify 第 11 檢查同一把尺（既有債預檢）

LANG_NAMES = st.LANG_NAMES
load_lang_guide_sections = st.load_lang_guide_sections
INLINE_FN_REF_RE = st.INLINE_FN_REF_RE
MD_LINK_URL_RE = st.MD_LINK_URL_RE
FN_DEF_RE = st.FN_DEF_RE

CHAPTER_SIZE_RATIO_LIMIT = 0.5
# title/description/tags/subcategory 是唯一送模型的 frontmatter 欄位（同
# structured-translate.py TRANSLATABLE_FM_FIELDS + subcategory 特例）；只有這些
# 欄位「語意上」在 old_sha→HEAD 之間真的變了，才值得為 frontmatter 燒一次 LLM
# 呼叫——否則只是 date/image 這類 passthrough 欄位變動，機械複製就夠。
FM_COMPARE_FIELDS = ["title", "description", "tags", "subcategory", "imageAlt"]
# 譯文既有 tags 有幾成跟 zh 逐字相同就算「沒翻」——同 verify-translation.py 第 14
# 檢查的 60% 門檻（那把尺會把整篇擋下，這裡只是提前用同一把尺決定要不要燒一次
# frontmatter 呼叫把債順手還掉）。
TAGS_UNTRANSLATED_RATIO = 0.6


# ════════════════════════ git helpers ════════════════════════

def git_show(sha: str, rel_path: str) -> str:
    r = subprocess.run(["git", "show", f"{sha}:{rel_path}"], cwd=REPO,
                        capture_output=True, text=True)
    if r.returncode != 0:
        raise FileNotFoundError(f"git show {sha}:{rel_path} failed: {r.stderr.strip()}")
    return r.stdout


def git_sha_resolvable(sha: str, rel_path: str) -> bool:
    r = subprocess.run(["git", "cat-file", "-e", f"{sha}:{rel_path}"],
                        cwd=REPO, capture_output=True)
    return r.returncode == 0


def git_diff_u0(old_sha: str, rel_path: str) -> str:
    """--unified=0：只要精確改動行，不要 context 行——context 行會讓 hunk 範圍
    洩到相鄰未改動章節，害它被誤判成「被碰過」。"""
    r = subprocess.run(["git", "diff", "--unified=0", f"{old_sha}..HEAD", "--", rel_path],
                        cwd=REPO, capture_output=True, text=True)
    return r.stdout


HUNK_RE = re.compile(r"^@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@")


def parse_hunks(diff_text: str) -> list[tuple[int, int]]:
    """回傳 [(new_file_start_line, new_file_line_count), ...]，1-indexed，
    完全對齊 git 本身對新檔行號的計數方式。"""
    hunks = []
    for line in diff_text.splitlines():
        m = HUNK_RE.match(line)
        if m:
            new_start = int(m.group(3))
            new_count = int(m.group(4)) if m.group(4) is not None else 1
            hunks.append((new_start, new_count))
    return hunks


# ════════════════════════ translation lookup ════════════════════════

def resolve_translation_path(zh_path: str, lang: str) -> Path | None:
    trans_map = json.loads((KNOWLEDGE / "_translations.json").read_text(encoding="utf-8"))
    for k, v in trans_map.items():
        if v == zh_path and k.startswith(f"{lang}/"):
            return KNOWLEDGE / k
    return None


# ════════════════════════ frontmatter + body-line split ════════════════════════

def parse_frontmatter_and_body(content: str) -> tuple[dict, int, list[str]]:
    """回傳 (fm_dict, fm_line_count, body_lines)。

    fm_line_count = 關閉 `---` 那一行的 1-indexed 行號（等於 frontmatter 佔用的
    行數）。body_lines[j]（0-indexed）對應「全檔」1-indexed 行號
    fm_line_count + j + 1 —— 用整檔先 splitlines() 再切片，避免對 raw string 做
    `content[end+4:]` 式切片時，字串開頭殘留的換行符號在 splitlines() 後產生一
    個不對應任何真實行的 phantom 空行，把後續所有行號算法差一行。
    """
    lines = content.splitlines()
    if not lines or lines[0].strip() != "---":
        raise ValueError("missing opening frontmatter fence")
    for i in range(1, len(lines)):
        if lines[i].strip() == "---":
            fm_text = "\n".join(lines[1:i])
            fm = yaml.safe_load(fm_text)
            if not isinstance(fm, dict):
                raise ValueError("frontmatter did not parse to a mapping")
            return fm, i + 1, lines[i + 1:]
    raise ValueError("missing closing frontmatter fence")


# ════════════════════════ chapter splitting ════════════════════════

def split_chapters(body_lines: list[str]) -> list[dict]:
    """intro（第一個 `## ` 之前，可能不存在）+ 每個 H2 各一章。[start,end) 是
    body_lines 的 0-indexed 切片邊界。"""
    h2_idxs = [i for i, l in enumerate(body_lines) if l.startswith("## ")]
    if not h2_idxs:
        return [{"heading": None, "start": 0, "end": len(body_lines)}]
    chapters = []
    if h2_idxs[0] > 0:
        chapters.append({"heading": None, "start": 0, "end": h2_idxs[0]})
    bounds = h2_idxs + [len(body_lines)]
    for i in range(len(h2_idxs)):
        chapters.append({"heading": body_lines[h2_idxs[i]], "start": bounds[i], "end": bounds[i + 1]})
    return chapters


def chapter_text(lines: list[str], ch: dict) -> str:
    return "\n".join(lines[ch["start"]:ch["end"]])


def detect_touched(zh_chapters: list[dict], hunks: list[tuple[int, int]],
                    fm_line_count: int) -> tuple[set, bool]:
    touched = set()
    fm_touched = False
    for new_start, new_count in hunks:
        lo = new_start
        hi = new_start + max(new_count - 1, 0)
        if lo <= fm_line_count:
            fm_touched = True
        for idx, ch in enumerate(zh_chapters):
            ch_lo = fm_line_count + ch["start"] + 1
            ch_hi = fm_line_count + ch["end"]
            if lo <= ch_hi and hi >= ch_lo:
                touched.add(idx)
    return touched, fm_touched


# ════════════════════════ chapter translation: regular (no footnote defs) ════════════════════════

def translate_regular_chapter(zh_chapter_text: str, lang: str, backend, glossary_titles: list[str],
                               prev_ctx: str | None, next_ctx: str | None, metrics: dict,
                               tmp_dir: Path) -> tuple[str, list[str]]:
    """翻一個章節（含它自己的 `## ` 標題行，若有）。跟 structured-translate.py
    Phase B 的 per-chunk retry 邏輯同構（重用它的驗證函式 _validate_chunk），
    多一塊 structured-translate 用不到的「前後章節譯文語境」——它翻整篇時每塊
    都是新的，沒有「鄰居」；patch 只翻一塊，鄰居是已經定案、不能被牽動語氣的
    舊譯文，需要明確餵給模型當銜接參考。"""
    guide = load_lang_guide_sections(lang, max_chars=6000)
    glossary_text = ""
    if glossary_titles:
        glossary_text = ("已翻譯的腳註來源標題（術語一致性參考，不必逐字套用）：\n"
                          + "\n".join(f"- {t}" for t in glossary_titles[:40]))
    context_text = ""
    if prev_ctx or next_ctx:
        parts = []
        if prev_ctx:
            parts.append(f"[end of PRECEDING section, already translated — for tone/terminology "
                         f"continuity ONLY, do not repeat it]\n{prev_ctx}")
        if next_ctx:
            parts.append(f"[start of FOLLOWING section, already translated — for tone/terminology "
                         f"continuity ONLY, do not repeat it]\n{next_ctx}")
        context_text = "\n\n".join(parts)

    lang_name = LANG_NAMES.get(lang, lang)
    base_system = (
        f"You are translating ONE SECTION of an article body from zh-TW to {lang_name} "
        "for Taiwan.md, an open-source curated knowledge base about Taiwan. This section "
        "is being patched into an EXISTING translation — the surrounding sections are "
        "unchanged, so match their tone and terminology.\n\n"
        "HARD RULES (structural — follow exactly, these are checked mechanically):\n"
        "1. Footnote reference markers like [^3] or [^12] must be preserved VERBATIM "
        "— same marker text, same position relative to the sentence they cite. Never "
        "add, remove, or renumber them.\n"
        "2. In markdown links [text](@@LINKn@@), the target is already replaced by a "
        "protected placeholder token such as @@LINK0@@. Copy each token byte-for-byte "
        "(same ASCII digits, no spaces inserted, do not localize the digits); only "
        "the link text may be translated. Never add, drop or reorder tokens.\n"
        "3. Content inside 《...》 or 「...」 (work titles / direct quotes) may stay "
        "in the original zh-TW if there's no natural equivalent — don't force a bad "
        "translation of a proper noun or a quoted utterance.\n"
        "4. Don't add or remove headings, table rows, or list items. Keep the "
        "markdown markers themselves (#, ##, |, -, >) unchanged, but the TEXT after "
        "a marker is content and MUST be translated — including the `## heading` "
        "line at the top of this section. A heading left in Chinese is a failure, "
        "not a preserved title.\n"
        "5. Output ONLY the translated markdown for THIS section. No commentary, no "
        "code fence, no explanation, no reasoning/chain-of-thought, and do NOT repeat "
        "the neighboring-section context shown below — just this section's translated "
        "markdown, nothing else.\n"
        f"6. {st.money_rule(lang_name)}\n\n"
        f"Target-language rules (extracted from docs/editorial/per-language/"
        f"TRANSLATION-{lang}.md):\n{guide}\n\n{glossary_text}"
        + (f"\n\nSurrounding context (already-translated, DO NOT translate or repeat "
           f"this — reference only):\n{context_text}" if context_text else "")
    )

    zh_refs = set(INLINE_FN_REF_RE.findall(zh_chapter_text))
    # URL 裝甲（2026-09-23）：跟分段式引擎 Phase B 同一天補上——兩條引擎共用
    # st._validate_chunk()，也就共用「正文連結網址對不上」這個失敗家族，只是
    # patch 的量小所以不顯眼。成因結構一樣就一起修，不等它在這邊也長出統計。
    zh_send, link_items = st._protect_embedded_links(zh_chapter_text)
    system = base_system
    last_output, last_issues = "", ["not attempted"]
    max_attempts = 3
    for attempt in range(1, max_attempts + 1):
        t0 = time.time()
        try:
            raw = backend.translate(system, zh_send, max_tokens=6000, timeout=240)
        except Exception as e:  # noqa: BLE001
            elapsed = round(time.time() - t0, 1)
            last_issues = [f"backend error: {e}"]
            metrics.setdefault("calls", []).append({
                "label": "chapter", "attempt": attempt, "ok": False,
                "error": str(e), "elapsed_s": elapsed,
            })
            last_output = ""
            continue
        elapsed = round(time.time() - t0, 1)
        out = st._restore_protected_links(st._strip_fence(raw), link_items)
        issues = st._validate_chunk(zh_chapter_text, out, zh_refs, lang, tmp_dir)
        metrics.setdefault("calls", []).append({
            "label": "chapter", "attempt": attempt, "ok": not issues,
            "elapsed_s": elapsed, "issues": issues,
        })
        last_output, last_issues = out, issues
        if not issues:
            break
        system = base_system + ("\n\nYour previous attempt had these problems — fix them and "
                                 f"re-translate the SAME source text: {'; '.join(issues)}")
    return last_output, last_issues


# ════════════════════════ chapter translation: footnote-definition chapters ════════════════════════

def translate_footnote_chapter(zh_chapter_text: str, lang: str, backend, metrics: dict,
                                tmp_dir: Path) -> tuple[str, list[str]]:
    """章節含 `[^n]: ...` 定義行（典型是「## 參考資料」章）。刻意把「標題 +
    prose + 所有 footnote 條目」包進**同一次** JSON 呼叫，而不是拆成標題單獨一
    次呼叫——OpenRouterBackend 對 <100 字元輸出有「疑似 refusal」保守判定（見
    structured-translate.py 同型註解），單獨翻一個 10 幾字的標題極容易誤觸。
    合併呼叫的輸出天生比較長，穩定閃過這個誤判。"""
    lines = zh_chapter_text.split("\n")
    heading = None
    rest = zh_chapter_text
    if lines and lines[0].startswith("## "):
        heading = lines[0][3:].strip()
        rest = "\n".join(lines[1:])
    defs = st.extract_footnote_defs(rest)
    remainder = st.strip_footnote_defs(rest).strip()

    lang_name = LANG_NAMES.get(lang, lang)
    payload = {
        "heading": heading,
        "prose": remainder or None,
        "footnotes": [{"n": d["n"], "title": d["title"], "desc": d["desc"]} for d in defs],
    }
    base_system = (
        f"Translate this article SECTION from zh-TW to {lang_name} for Taiwan.md "
        "(open-source Taiwan knowledge base). Input is JSON with 'heading' (a short "
        "section title, or null), 'prose' (free text, or null), and 'footnotes' (array "
        "of {n, title, desc} source-citation entries, may be empty).\n"
        "Return a JSON object with the SAME shape: 'heading' translated (or null), "
        "'prose' translated (or null), 'footnotes' array SAME LENGTH AND ORDER, each "
        "with 'n' UNCHANGED (copy verbatim — it's an id not content), 'title' and "
        "'desc' translated. Any token shaped like @@LINKn@@ inside 'desc' is a "
        "protected URL placeholder — keep it byte-for-byte unchanged, do not translate "
        "or remove it.\n"
        # 2026-10-14：腳註章是預算數字最密的地方（〈台灣少子化危機〉id 13 處裸 yuan
        # 全在腳註），一般章節提示有 money_rule，這條路之前沒有
        f"{st.money_rule(lang_name)}\n"
        "No commentary, no markdown code fence — JSON only, nothing else."
    )
    user = json.dumps(payload, ensure_ascii=False)

    system = base_system
    last_issues = ["not attempted"]
    assembled = ""
    for attempt in range(1, 3):
        try:
            data = st.call_json(backend, system, user, max_tokens=6000, timeout=240,
                                 max_attempts=2, metrics=metrics, label=f"chapter-footnotes{attempt}")
        except RuntimeError as e:
            last_issues = [f"backend/JSON error: {e}"]
            continue

        issues = []
        out_fns = data.get("footnotes")
        translated_map: dict[str, dict] = {}
        if defs and (not isinstance(out_fns, list) or len(out_fns) != len(defs)):
            issues.append(f"footnote count mismatch: zh={len(defs)} out="
                          f"{len(out_fns) if isinstance(out_fns, list) else type(out_fns).__name__}")
        else:
            by_n = {str(item.get("n")): item for item in (out_fns or []) if isinstance(item, dict)}
            for d in defs:
                item = by_n.get(str(d["n"]), {})
                desc = st._restore_embedded_links(str(item.get("desc", d["desc"])), d["_link_restore"])
                translated_map[d["n"]] = {"title": str(item.get("title", d["title"])), "desc": desc}
            if defs and set(translated_map.keys()) != {d["n"] for d in defs}:
                issues.append("footnote id set mismatch")

        fn_text = st.assemble_footnote_defs(defs, translated_map) if defs else ""
        out_heading = f"## {data.get('heading') or heading}" if heading else None
        out_prose = str(data.get("prose") or "").strip()

        parts = [p for p in (out_heading, out_prose, fn_text) if p and p.strip()]
        assembled = "\n\n".join(parts)

        if assembled.strip():
            hits = st._cjk_leak_hits(assembled, lang, tmp_dir, source_text=zh_chapter_text)
            if hits:
                issues.append(f"cjk leak: {hits[0]}")
        zh_urls = Counter(MD_LINK_URL_RE.findall(zh_chapter_text))
        out_urls = Counter(MD_LINK_URL_RE.findall(assembled))
        if zh_urls != out_urls:
            issues.append(f"inline link URL mismatch: zh={sum(zh_urls.values())} out={sum(out_urls.values())}")

        last_issues = issues
        if not issues:
            return assembled, issues
        system = base_system + (f"\n\nYour previous answer had these problems — fix them and "
                                f"re-translate the SAME input: {'; '.join(issues)}")
    return assembled, last_issues


# ════════════════════════ frontmatter rebuild ════════════════════════

def provenance_lines(zh_path: str, zh_content: str) -> list[str]:
    """5 行 provenance block，canonical hash 來自 status.py（body_hash /
    body_hash_pure）——不是 structured-translate.py 自己那份（見檔頭 docstring
    的教訓引用）。structured-translate.translate_frontmatter() 只寫 4 行（漏了
    sourceBodyHash），這裡補齊，兩條路徑都吃到同一份 provenance。"""
    sha = st.git_short_sha(zh_path)
    content_hash = status_mod.body_hash(zh_content)
    body_hash = status_mod.body_hash_pure(zh_content)
    now = datetime.now(timezone.utc).isoformat()
    return [
        f"translatedFrom: {st.yaml_single_quote(zh_path)}",
        f"sourceCommitSha: {st.yaml_single_quote(sha)}",
        f"sourceContentHash: {st.yaml_single_quote(content_hash)}",
        f"sourceBodyHash: {st.yaml_single_quote(body_hash)}",
        f"translatedAt: {st.yaml_single_quote(now)}",
    ]


PROVENANCE_KEYS = ("translatedFrom:", "sourceCommitSha:", "sourceContentHash:",
                   "sourceBodyHash:", "translatedAt:")


def replace_provenance(fm_block: str, zh_path: str, zh_content: str) -> str:
    """把 translate_frontmatter() 產出的 provenance 行按鍵名剝掉，換成 provenance_lines()。

    舊版寫死 `[:-4]`，假設對方固定在尾端 append 4 行。2026-09-26 structured-translate
    補寫 sourceBodyHash 變成 5 行之後，切片只剝掉後 4 行、留下 translatedFrom，再 append
    一份 → YAML 重複鍵。dispatcher 一整批 63 篇因此被 pre-commit 擋在暫存區五小時。
    按鍵名剝，對方行數再變也不會壞。"""
    kept = [l for l in fm_block.split("\n") if not l.startswith(PROVENANCE_KEYS)]
    return "\n".join(kept + provenance_lines(zh_path, zh_content))


def frontmatter_debt(zh_fm: dict, tr_fm: dict, lang: str | None = None) -> list[str]:
    """既有譯文 frontmatter 自帶的債：有就改走 LLM 重翻 frontmatter，不沿用舊值（見 main 註解）。"""
    debt = []
    # 2026-10-14 babel-nightly：〈幾米〉pt／ar 的 patch 兩種模型各被擋兩次，理由都是
    # 「description contains CJK」——舊譯文的 description 帶著「(廖福彬)」這類漢字
    # 夾註，沿用舊值組回去，validate_frontmatter_block() 必然擋下，每次都記成模型
    # 失敗。存量量到十語共 459 篇 title／description 含漢字。這裡用的是同一把尺
    # （非 ja/ko 才查），驗證會擋的東西在派 LLM 之前就判成債。
    if lang and lang not in ("ja", "ko"):
        for field in ("title", "description"):
            if _verify.has_cjk(str(tr_fm.get(field) or "")):
                debt.append(f"{field} 含漢字（validate_frontmatter_block 會擋）")
    zh_alt = zh_fm.get("imageAlt")
    if zh_alt and tr_fm.get("imageAlt") in (None, "", zh_alt):
        debt.append("imageAlt 譯文缺欄或未翻")
    zh_tags = zh_fm.get("tags")
    tr_tags = tr_fm.get("tags")
    if isinstance(zh_tags, list) and zh_tags and isinstance(tr_tags, list) and tr_tags:
        same = sum(1 for t in tr_tags if t in zh_tags)
        if same / len(tr_tags) >= TAGS_UNTRANSLATED_RATIO:
            debt.append(f"tags {same}/{len(tr_tags)} 仍是 zh 原字")
        elif len(tr_tags) == 1 and len(zh_tags) >= 2:
            # 2026-09-27：整篇引擎只切 ASCII 逗號，阿拉伯逗號「،」／日文頓號「、」連成的
            # 整張清單變成一個標籤（ar 438 篇、ja 14 篇）。碰到就順手重翻，存量隨 stale 慢慢還。
            debt.append(f"tags 擠成 1 個字串（zh 有 {len(zh_tags)} 個）")
    return debt


def rebuild_frontmatter_preserve_translation(zh_fm: dict, tr_fm: dict, zh_path: str,
                                              zh_content: str) -> str:
    """title/description/tags/subcategory 在 old_sha→HEAD 之間語意未變 → 不燒
    LLM 呼叫，沿用譯文既有值；passthrough 欄位機械同步成目前 zh 值（heal 同款
    邏輯）；provenance 一律刷新成目前 zh 狀態。"""
    lines: list[str] = []
    for key in zh_fm.keys():
        if key == "title":
            lines.append(f"title: {st.yaml_single_quote(str(tr_fm.get('title', zh_fm['title'])))}")
        elif key == "description":
            lines.append(f"description: {st.yaml_single_quote(str(tr_fm.get('description', zh_fm['description'])))}")
        elif key == "tags":
            existing = tr_fm.get("tags")
            tags = existing if isinstance(existing, list) and existing else zh_fm["tags"]
            lines.append("tags:")
            lines.append("  [")
            for t in tags:
                lines.append(f"    {st.yaml_single_quote(str(t))},")
            lines.append("  ]")
        elif key == "subcategory":
            lines.append(f"subcategory: {st.yaml_single_quote(str(tr_fm.get('subcategory', zh_fm[key])))}")
        elif key == "imageAlt":
            # 只有在 main() 判定「譯文已有翻好的 imageAlt」時才會走到這裡沿用舊值；
            # 缺欄或原字的情況 main() 已改走 LLM 路徑（見 fm_debt）。
            lines.append(f"imageAlt: {st.yaml_single_quote(str(tr_fm.get('imageAlt', zh_fm[key])))}")
        else:
            # passthrough + 任何其他未明確歸類的欄位：機械複製 zh 目前值
            lines.append(st.render_field(key, zh_fm[key]))
    lines.extend(provenance_lines(zh_path, zh_content))
    return "\n".join(lines)


# ════════════════════════ validation trio ════════════════════════

def _article_health_arg_path(out_path: Path, lang: str) -> tuple[Path, Path | None]:
    """回傳 (health_arg, cleanup_dir)。**只給 article-health.py 用**（見
    run_verify_trio）——verify-translation.py 跟 cjk-leak-check.py 一律直接吃
    真實的 out_path，不經過這裡。

    2026-07-27 bug 覆盤（production 成功率 0% 的真因）：舊版 `_verify_arg_path`
    把這三個驗證器全部導去同一條 symlink，且用 `REPO in out_path.parents` 判
    斷「out_path 是否已經是可以直接驗證的真實路徑」——但呼叫端
    （babel-dispatch.py）傳進來的 `--out` 是**相對路徑**（如
    `knowledge/en/Technology/xxx.md`，subprocess cwd=REPO），相對路徑的
    `.parents` 序列只會有其他相對路徑，永遠不含絕對的 REPO，這個判斷式永遠
    是 False——於是**每一次 production 呼叫**都被誤導進 symlink 分支，即使
    out_path 根本就已經是合法的 knowledge/<lang>/ 真實路徑，完全不需要 symlink。
    更糟的是 symlink 分支本身也有 bug：舊版拿 `out_path.parent`（同樣是相對
    路徑）直接當 `symlink_to()` 的 target，而 symlink target 若是相對路徑，
    是「相對於 symlink 自己所在的目錄」解析、不是相對於 cwd/REPO——實際落點
    變成 kdir 底下多一層不存在的 `knowledge/knowledge/...`，於是
    verify-translation.py 跟 article-health.py 拿到的路徑背後其實是個斷掉的
    symlink，檔案「不存在」，三重驗證的第一項（en file exists）當場 FAIL，
    100% 命中，這就是 production 成功率 0% 的真因。

    修法分兩層：(1) 這裡的判斷式改成純字串比對『knowledge/<lang>/ 是否已經
    出現在路徑裡』（跟 article-health.py 自己 lib/article_health/langs.py
    is_translation_path() 判斷語言用的是同一把尺，不要求真的在 REPO 底下）
    ——production 的 out_path 本來就長這樣，直接回傳它本人，完全不用
    symlink。(2) 手動測試用 `--out /tmp/somewhere/x.md` 這種扁平路徑時，才
    需要墊一層 symlink 讓 article-health 猜對語言，用**系統 temp 目錄**
    （不是 REPO/tmp——那個位置放著上次的殘骸曾被別的 session 當垃圾誤刪
    過），target 一律用絕對路徑（不重蹈相對路徑解析錯位的覆轍），呼叫端用
    完立刻 rmtree，repo 裡不留任何痕跡。

    verify-translation.py 為什麼不能也套這條 symlink：實測（2026-07-27
    手動 --out /tmp/... 驗證）它的 en-file-exists PASS 分支跟 ratio-check 都
    對路徑做 `.relative_to(REPO)`——REPO 底下的路徑沒事，但系統 temp 底下的
    symlink 一樣會 ValueError 炸掉整支 script（跟 structured-translate.py
    pilot mode 踩過的同一個坑）。與其把 symlink 挪回 REPO/tmp（等於走回頭
    路、又要面對「repo 內留 tmp/」的老問題），改在 verify-translation.py 那
    端把 `.relative_to(REPO)` 包一層 fallback（見該檔 `_repo_rel()`），讓它
    對 REPO 外的路徑也能正常跑完，而不是丟給呼叫端假路徑去騙它。"""
    if f"knowledge/{lang}/" in str(out_path):
        return out_path, None
    tmp_root = Path(tempfile.mkdtemp(prefix="patch-translate-langlink-"))
    kdir = tmp_root / "knowledge"
    kdir.mkdir(parents=True, exist_ok=True)
    link = kdir / lang
    link.symlink_to(out_path.parent)  # 絕對路徑 target——不會有相對路徑解析錯位問題
    return link / out_path.name, tmp_root


_WIKILINK_SCAN = re.compile(r"\[\[([^\]|]+)(?:\|([^\]]+))?\]\]")


def _resolve_wikilinks(chunk: str, lang: str) -> tuple[str, int]:
    """把章節裡已有譯文的 `[[X]]` 先機械化成該語言的 markdown 連結。

    v1.22 已經把「wikilink 路由從模型手上收回工具端」做進整篇路徑
    （translate.py 用 manifest 的 wikilink_targets），但章節級 patch 路徑沒有
    manifest，於是漏掉這道，模型收到生的 `[[台灣醫療與全民健保]]` 就把它當文字
    翻——2026-08-09 實撞 ko 譯出 `[[대만 의료와 전국민건강보험]]`，指向一個不存在
    的頁面，`wikilink-target` 硬閘擋下整篇、worker 連三次硬失敗被凍 30 分。
    一個沒被預轉的連結，代價是一整條軌停半小時。

    這裡自己從 `_translations.json` 反查該語言的譯文路徑（patch 路徑沒有
    manifest 可用），解析不出來的保持原樣交給既有 prompt 與 hard gate，跟整篇
    路徑同樣保守。
    """
    # 2026-09-22：改走 cross_link_localizer.resolve_wikilinks（三引擎單一來源）。舊實作把
    # 解析不出來的 `[[X]]` 留給模型，模型就把括號裡翻掉、括號留著；新版沒譯文一律降
    # 純文字，wikilink-target 硬閘從此沒有東西可擋。
    new_chunk, linked, _plain = _xlink.resolve_wikilinks(chunk, lang)
    return new_chunk, linked


def run_verify_trio(zh_path: str, out_path: Path, lang: str) -> tuple[bool, dict]:
    out_path = out_path.resolve()

    # verify-translation.py 一律吃真實路徑（見 _article_health_arg_path 的
    # docstring：它自己已經對 REPO 外的路徑加了 fallback，不需要靠假路徑騙過）。
    r1 = subprocess.run(
        [sys.executable, str(SCRIPT_DIR / "verify-translation.py"), zh_path, str(out_path), "--json"],
        cwd=REPO, capture_output=True, text=True, timeout=60,
    )
    try:
        v = json.loads(r1.stdout)
    except Exception:  # noqa: BLE001
        v = {"fails": -1, "raw": (r1.stdout + r1.stderr)[-800:]}

    # cjk-leak-check 也直接讀真實 out_path（lang 顯式傳入，不靠路徑猜語言）。
    hits = cjkleak.scan_file(out_path, lang=lang)
    leak = {"flagged": bool(hits), "hits": hits}

    health_arg, cleanup_dir = _article_health_arg_path(out_path, lang)
    try:
        r3 = subprocess.run(
            [sys.executable, str(REPO / "scripts/tools/article-health.py"), str(health_arg),
             "--profile=pre-commit", "--output=json"],
            cwd=REPO, capture_output=True, text=True, timeout=120,
        )
        try:
            h = json.loads(r3.stdout)
            health_passed = bool(h["reports"][0]["effective_passed"])
        except Exception:  # noqa: BLE001
            h = {"raw": (r3.stdout + r3.stderr)[-800:]}
            health_passed = False
    finally:
        if cleanup_dir is not None:
            shutil.rmtree(cleanup_dir, ignore_errors=True)

    ok = v.get("fails", 1) == 0 and not leak["flagged"] and health_passed
    return ok, {"verify_translation": v, "cjk_leak_check": leak, "article_health": h}


# ════════════════════════ CLI ════════════════════════

def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    ap.add_argument("zh_path", help="zh-TW source path relative to knowledge/")
    ap.add_argument("--lang", required=True)
    ap.add_argument("--backend", help="openrouter:<model> | ollama:<model> | codex | gemini "
                                       "(not required for --dry-run)")
    ap.add_argument("--out", help="override output path (default: patch existing translation in place)")
    ap.add_argument("--dry-run", action="store_true", help="only print chapter-touch analysis, no LLM calls")
    args = ap.parse_args()

    zh_full = KNOWLEDGE / args.zh_path
    if not zh_full.exists():
        print(f"❌ zh source not found: {zh_full}", file=sys.stderr)
        return 2
    zh_content = zh_full.read_text(encoding="utf-8")
    zh_rel = f"knowledge/{args.zh_path}"

    trans_path = resolve_translation_path(args.zh_path, args.lang)
    if trans_path is None or not trans_path.exists():
        print(f"⏩ no existing {args.lang} translation for {args.zh_path} — not patchable")
        return 2
    # OBSERVER-QUEUE #67（2026-10-10 哲宇拍板 B）：現行譯文是人翻的、或被開著的投稿 PR
    # 碰到，局部 patch 也不准在原地改——這條路徑正是 steve-chen 那次把 1,65 Milliarden
    # 改成 165 Millionen 的入口。dispatcher 排佇列時已擋過；這裡是手動跑時的門。
    # exit=3 刻意不是 2：2 是「不適用、整篇重翻接手」，3 是「不准動」。
    guard = ContributorGuard(log=lambda m: print(m, file=sys.stderr))
    if not args.out or Path(args.out).resolve() == trans_path.resolve():
        zh_sha_now = subprocess.run(["git", "log", "-1", "--format=%h", "--", zh_rel],
                                    cwd=REPO, capture_output=True, text=True).stdout.strip()
        d = guard.check(args.lang, args.zh_path, "stale", str(trans_path.relative_to(REPO)), zh_sha=zh_sha_now)
        if not d.ok:
            print(f"🙅 refusing to patch {trans_path.relative_to(REPO)} in place ({d.reason}: {d.detail}) — OBSERVER-QUEUE #67")
            return 3
    trans_content = trans_path.read_text(encoding="utf-8")

    # 2026-09-21：既有譯文根本不是目標語言時（OBSERVER-QUEUE #53 那 65 篇英文
    # 佔著 ja/ko 位子的存量），局部 patch 只是在英文上補幾段韓文，verify trio
    # 一定拒收；dispatcher 要撞滿 5 次拒收才升級整篇重翻，每次 2-3 分鐘白燒。
    # 跟 verify_one() 第一關同一把尺（target-language-check.py），fail 就直接
    # 回 exit=2「不適用」，讓 dispatcher 立刻走整篇路徑。
    tl = subprocess.run(
        ["python3", "scripts/tools/lang-sync/target-language-check.py", str(trans_path)],
        cwd=REPO, capture_output=True, text=True,
    )
    if tl.returncode == 1:
        reason = " ".join(l.strip() for l in tl.stdout.splitlines()[:2])
        print(f"⏩ existing translation is not {args.lang} ({reason}) — not patchable, fallback to full retranslate")
        return 2

    try:
        tr_fm, _tr_fm_lines, tr_body_lines = parse_frontmatter_and_body(trans_content)
    except ValueError as e:
        print(f"⏩ translation frontmatter unparsable ({e}) — fallback")
        return 2

    old_sha = tr_fm.get("sourceCommitSha")
    if not old_sha or old_sha == "pre-toolkit" or not re.match(r"^[a-f0-9]{7,40}$", str(old_sha)):
        print(f"⏩ no usable sourceCommitSha ({old_sha!r}) — fallback")
        return 2
    if not git_sha_resolvable(old_sha, zh_rel):
        print(f"⏩ old_sha {old_sha} not resolvable for {zh_rel} — fallback")
        return 2

    # 2026-09-22：既有譯文對「它自己翻的那版 zh」就已經帶 URL／腳註定義債時，局部 patch
    # 只換掉幾章、其他章的債原封不動，verify trio 第 9／11 檢查對整份檔案量，一定拒收；
    # dispatcher 要撞滿 5 次才升級整篇，run 98122 一夜 60 次 patch 拒收裡能讀出原因的
    # 全是這型（zh=47 vs en=44、zh=51 vs en=16⋯⋯）。跟 target-language-check 那條預檢同一個
    # 道理：不適用就 exit=2，讓整篇路徑立刻接手，不在注定失敗的路上燒五次。
    # 用 verify-translation 的 extract_urls／FN_DEF_RE 同一把尺量，不另抄 regex（#83）。
    old_zh_content = subprocess.run(
        ["git", "show", f"{old_sha}:{zh_rel}"], cwd=REPO, capture_output=True, text=True,
    ).stdout
    if old_zh_content:
        try:
            _, _, old_zh_body_lines = parse_frontmatter_and_body(old_zh_content)
            old_zh_body = "\n".join(old_zh_body_lines)
            tr_body = "\n".join(tr_body_lines)
            from collections import Counter as _Counter
            url_debt = _Counter(_verify.extract_urls(old_zh_body)) != _Counter(_verify.extract_urls(tr_body))
            fn_debt = len(FN_DEF_RE.findall(old_zh_body)) != len(FN_DEF_RE.findall(tr_body))
            if url_debt or fn_debt:
                kind = "+".join(k for k, v in (("URL multiset", url_debt), ("footnote defs", fn_debt)) if v)
                print(f"⏩ existing translation already carries {kind} debt against its own source "
                      f"({old_sha}) — patch cannot pass verify, fallback to full retranslate")
                return 2
        except ValueError:
            pass  # 舊版 zh frontmatter 解析不了就不做這道預檢，照常往下

    diff_text = git_diff_u0(old_sha, zh_rel)
    if not diff_text.strip():
        print("⏩ no diff between old_sha and HEAD — nothing to patch")
        return 2
    hunks = parse_hunks(diff_text)
    if not hunks:
        print("⏩ diff present but no parseable hunks — fallback")
        return 2

    try:
        zh_fm, fm_line_count, zh_body_lines = parse_frontmatter_and_body(zh_content)
    except ValueError as e:
        print(f"⏩ zh frontmatter unparsable ({e}) — fallback")
        return 2

    zh_chapters = split_chapters(zh_body_lines)
    tr_chapters = split_chapters(tr_body_lines)
    zh_h2 = sum(1 for l in zh_body_lines if l.startswith("## "))
    tr_h2 = sum(1 for l in tr_body_lines if l.startswith("## "))

    if len(zh_chapters) != len(tr_chapters) or zh_h2 != tr_h2:
        print(f"⏩ chapter/H2 count mismatch: zh={len(zh_chapters)} chapters ({zh_h2} H2) vs "
              f"translation={len(tr_chapters)} chapters ({tr_h2} H2) — fallback to full retranslate")
        return 2

    touched_idx, fm_line_touched = detect_touched(zh_chapters, hunks, fm_line_count)
    if not touched_idx and not fm_line_touched:
        print("⏩ diff hunks didn't map to any chapter or frontmatter — fallback (safety net)")
        return 2

    total_chars = sum(len(chapter_text(zh_body_lines, c)) for c in zh_chapters) or 1
    touched_chars = sum(len(chapter_text(zh_body_lines, zh_chapters[i])) for i in touched_idx)
    ratio = touched_chars / total_chars

    print(f"📋 {args.zh_path} → {args.lang}: {len(touched_idx)}/{len(zh_chapters)} chapters touched "
          f"({touched_chars}/{total_chars} chars = {ratio:.1%}), frontmatter_line_touched={fm_line_touched}")
    for i in sorted(touched_idx):
        ch = zh_chapters[i]
        heading = (ch["heading"] or "(intro)").strip()
        n_chars = len(chapter_text(zh_body_lines, ch))
        print(f"   • [{i}] {heading}  {n_chars} chars ({n_chars / total_chars:.1%} of body)")

    if ratio > CHAPTER_SIZE_RATIO_LIMIT:
        print(f"⏩ touched-chapter ratio {ratio:.1%} > {CHAPTER_SIZE_RATIO_LIMIT:.0%} — not worth "
              f"patching, fallback to full retranslate")
        return 2

    try:
        old_zh_content = git_show(old_sha, zh_rel)
        old_zh_fm, _, _ = parse_frontmatter_and_body(old_zh_content)
    except (FileNotFoundError, ValueError):
        old_zh_fm = {}
    fm_fields_changed = any(old_zh_fm.get(f) != zh_fm.get(f) for f in FM_COMPARE_FIELDS)
    # 2026-09-21：既有譯文自己帶著 frontmatter 債時，「語意沒變就沿用舊值」會把債
    # 原封不動組回去，verify trio 當場擋下（一夜 patch 55 次拒收裡 14 次是這兩型：
    # zh 後來才加的 imageAlt 譯文根本沒有這欄、或譯文的 tags 還是 zh 原字），
    # 五次拒收後才升級整篇重翻——每次拒收都燒掉一次完整 patch。撞到 patch 範圍的
    # pre-existing 問題一律順手接住（REFLEXES #42 v4），這裡多燒一次 frontmatter
    # 呼叫換整篇過閘。
    fm_debt = frontmatter_debt(zh_fm, tr_fm, args.lang)
    if fm_debt and not fm_fields_changed:
        fm_fields_changed = True
        print(f"   frontmatter 既有債 → 改走 LLM 重翻 frontmatter：{'; '.join(fm_debt)}")
    print(f"   frontmatter translatable fields changed: {fm_fields_changed}")

    if args.dry_run:
        print("✅ dry-run — chapter plan above, no translation performed")
        return 0

    if not args.backend:
        print("❌ --backend required (unless --dry-run)", file=sys.stderr)
        return 2
    backend = st.build_backend(args.backend)
    print(f"   backend: {backend.name}")

    metrics: dict = {
        "zh_path": args.zh_path, "lang": args.lang, "backend": args.backend,
        "touched_chapters": sorted(touched_idx), "ratio": round(ratio, 4),
        "fm_fields_changed": fm_fields_changed, "chapters": [], "phases": {},
    }
    t_total0 = time.time()
    tmp_dir = Path(tempfile.mkdtemp(prefix="patch-translate-chunk-"))

    # 術語一致性語境：既有譯文全篇既有的腳註來源標題（不限被碰章節），跟
    # structured-translate.py Phase B 給每個 chunk 的 glossary 同款用途。
    existing_defs = st.extract_footnote_defs("\n".join(tr_body_lines))
    glossary_titles = [d["title"] for d in existing_defs if d.get("title")]

    new_tr_chapter_lines: list[list[str] | None] = [None] * len(tr_chapters)
    failed: list[int] = []
    # 失敗且「不能只保留舊譯」的章節（腳註定義區——見下方耦合說明）
    fatal_failed: list[int] = []
    t0 = time.time()
    for i in range(len(tr_chapters)):
        if i not in touched_idx:
            new_tr_chapter_lines[i] = tr_body_lines[tr_chapters[i]["start"]:tr_chapters[i]["end"]]
            continue
        zh_chunk = chapter_text(zh_body_lines, zh_chapters[i])
        # 站內連結在地化（防新增，reports/cross-link-localization-2026-07-27.md
        # 第二段）：只碰「要送模型」的這份章節文字副本，不動 zh_body_lines / zh_content
        # ——hunk 行號對齊、sourceContentHash 全都繼續吃未改動的原始 zh，這裡改完的
        # zh_chunk 同時是 prompt 內容也是 _validate_chunk() 的 URL 比對基準，兩邊一致
        # 不會因為改了 URL 就誤判「模型漏抄連結」。
        zh_chunk, _ = _xlink.localize_body(zh_chunk, args.lang)
        zh_chunk, _ = _resolve_wikilinks(zh_chunk, args.lang)
        c_metrics: dict = {}
        if FN_DEF_RE.search(zh_chunk):
            out, issues = translate_footnote_chapter(zh_chunk, args.lang, backend, c_metrics, tmp_dir)
        else:
            prev_ctx = next_ctx = None
            if i - 1 >= 0:
                prev_src = (new_tr_chapter_lines[i - 1] if new_tr_chapter_lines[i - 1] is not None
                           else tr_body_lines[tr_chapters[i - 1]["start"]:tr_chapters[i - 1]["end"]])
                prev_ctx = "\n".join(prev_src)[-200:]
            if i + 1 < len(tr_chapters):
                next_src = tr_body_lines[tr_chapters[i + 1]["start"]:tr_chapters[i + 1]["end"]]
                next_ctx = "\n".join(next_src)[:200]
            out, issues = translate_regular_chapter(zh_chunk, args.lang, backend, glossary_titles,
                                                     prev_ctx, next_ctx, c_metrics, tmp_dir)
        metrics["chapters"].append({
            "index": i, "heading": zh_chapters[i]["heading"], "issues": issues,
            "calls": c_metrics.get("calls", []),
        })
        if issues:
            failed.append(i)
            # 2026-07-27：失敗章節保留舊譯片段（跟「未改動章節」同一種切片），
            # 不再讓一章否決整篇。實測 exit=1 佔失敗 34%，且集中在「## 參考資料」
            # ——腳註定義密集、中文書目最多、模型最容易翻壞的那一章，卻讓它一票
            # 否決其餘七章已翻好的內容。局部失敗導致全域丟棄是同日第四次現形
            # （armor token / patch abort / …），處置一律改成「保住能保的」。
            # 該章維持舊內容 = 局部 stale，仍遠好於整篇不寫；最終品質由
            # dispatcher 的 verify trio 把關，不過就 HEAD-restore。
            old_slice = tr_body_lines[tr_chapters[i]["start"]:tr_chapters[i]["end"]]
            new_tr_chapter_lines[i] = old_slice
            # ……但章節之間不是獨立的：腳註是跨章節耦合（定義集中在參考資料章，
            # 引用散在全篇）。保留舊的定義區、其餘章節更新了引用，兩邊就對不上,
            # 必被 verify 的 footnote count 擋掉——2026-07-27 首次觸發即實證
            # （en/Nature/taiwan-mountains-and-hiking-culture.md）。這種章節失敗
            # 沒有「局部保留」這個選項，只能整篇重翻。
            if any(FN_DEF_RE.match(l) for l in old_slice):
                fatal_failed.append(i)
        else:
            is_last = (i == len(tr_chapters) - 1)
            out_lines = out.strip("\n").split("\n")
            new_tr_chapter_lines[i] = out_lines if is_last else out_lines + [""]

    metrics["phases"]["chapters"] = {"elapsed_s": round(time.time() - t0, 1), "failed": failed}
    print(f"  chapters: {metrics['phases']['chapters']['elapsed_s']}s, {len(failed)} failed")

    # 腳註定義章失敗 → 整篇重翻（引用與定義跨章耦合）。其他章節失敗見下方
    # `if failed:`，2026-10-23 起同樣整篇重翻，不再局部保留。
    if fatal_failed:
        print(f"❌ 失敗章節含腳註定義（{len(fatal_failed)} 章）— 局部保留會讓引用對不上定義，"
              f"整篇 fallback 全文重翻")
        for c in metrics["chapters"]:
            if c["index"] in fatal_failed:
                print(f"   ✗ [{c['index']}] {(c['heading'] or '(intro)').strip()}: {c['issues']}")
        return 2   # 2 = 不適合 patch，呼叫端 fallback 全文重翻（見檔頭 Exit codes）

    if failed and len(failed) == len(tr_chapters):
        print(f"❌ 全部 {len(failed)} 個章節都失敗 — aborting, no write")
        for c in metrics["chapters"]:
            if c["index"] in failed:
                print(f"   ✗ [{c['index']}] {(c['heading'] or '(intro)').strip()}: {c['issues']}")
        return 1

    if failed:
        print(f"❌ {len(failed)}/{len(tr_chapters)} 章失敗 — 整篇 fallback 全文重翻")
        # 2026-07-27：production log 只印「N chapter(s) failed」，看不出是哪一項
        # 判準擋的（footnote ref set / cjk-leak / ratio band / URL mismatch），
        # 每次要診斷都得另外寫腳本重跑一次——補印最後一次 attempt 的 issues，
        # 讓 dispatcher log 本身就夠診斷，不用重跑。
        for c in metrics["chapters"]:
            if c["index"] in failed:
                heading = (c["heading"] or "(intro)").strip()
                print(f"   ✗ [{c['index']}] {heading}: {c['issues']}")
        # 2026-10-23 babel-nightly：07-27 的「失敗章保留舊譯、其餘照常更新」會讓
        # 那一章的舊內容帶著新的 sourceCommitSha 寫出去，status.py 從此判它 fresh，
        # 再也沒有路徑會回頭看。巡邏修補時被碰到的章節正是事實被改正的那幾章：
        # fr〈林青霞〉保留了已從中文刪掉的《101次求婚》虛構客串，en 保留了舊的
        # 出身段，hi〈台灣感性〉同型。局部 stale 被蓋成 fresh＝看不見的 stale，
        # 比整篇留在 stale 佇列更糟（REFLEXES #85）。改成整篇重翻；全文重翻有
        # 自己的 verify trio，不過就 HEAD-restore、保留 stale 讓下一輪再排。
        return 2   # 2 = 不適合 patch，呼叫端 fallback 全文重翻（見檔頭 Exit codes）

    new_body_lines = [l for chunk in new_tr_chapter_lines for l in chunk]  # type: ignore[union-attr]

    t0 = time.time()
    if fm_fields_changed:
        f_metrics: dict = {}
        fm_block = st.translate_frontmatter(zh_fm, zh_content, args.zh_path, args.lang, backend, f_metrics)
        # translate_frontmatter() 固定在尾端 append 4 行 provenance
        # （translatedFrom/sourceCommitSha/sourceContentHash/translatedAt，見它的
        # 原始碼）——換成我們自己這份 5 行（多一個 sourceBodyHash，見
        # provenance_lines() docstring），兩條路徑最終 provenance 格式統一。
        fm_block = replace_provenance(fm_block, args.zh_path, zh_content)
    else:
        fm_block = rebuild_frontmatter_preserve_translation(zh_fm, tr_fm, args.zh_path, zh_content)
    fm_problems = st.validate_frontmatter_block(fm_block, args.lang)
    metrics["phases"]["frontmatter"] = {
        "elapsed_s": round(time.time() - t0, 1), "problems": fm_problems, "llm_used": fm_fields_changed,
    }
    if fm_problems:
        print(f"❌ frontmatter validation problems: {fm_problems} — aborting, no write")
        return 1

    assembled = "---\n" + fm_block + "\n---\n" + "\n".join(new_body_lines) + "\n"

    out_path = (Path(args.out) if args.out else trans_path).resolve()
    out_path.parent.mkdir(parents=True, exist_ok=True)
    # 2026-07-27 緊急修：預設模式是「就地改寫」既有譯文，而下面兩處失敗路徑
    # 原本 unlink()——**把一篇有效的 stale 譯文直接刪成 missing**，比什麼都不做
    # 還糟，直接違反「寧可 stale 也不要 missing」（babel-dispatch 的 HEAD-restore
    # 就是為此存在）。四條產線都走這條路徑，等於每次 patch 失敗都在扣覆蓋率。
    # 存原文，失敗時完整還原；原本就不存在的（--out 到新路徑）才 unlink。
    pre_existing = out_path.read_text(encoding="utf-8") if out_path.exists() else None

    def _restore_or_unlink(reason: str) -> None:
        if pre_existing is not None:
            out_path.write_text(pre_existing, encoding="utf-8")
            print(f"   ↩️  已還原 patch 前的譯文（{reason}）——寧可 stale 也不要 missing")
        else:
            out_path.unlink(missing_ok=True)

    out_path.write_text(assembled, encoding="utf-8")

    prettier_ok, prettier_msg = st.run_prettier(out_path)

    post_h2 = sum(1 for l in out_path.read_text(encoding="utf-8").splitlines() if l.startswith("## "))
    if post_h2 != zh_h2:
        print(f"❌ post-assembly H2 mismatch: got {post_h2} want {zh_h2} — aborting")
        _restore_or_unlink("H2 數不符")
        return 1

    # 2026-09-21：三支安全 fixer 接進 patch 路徑。dispatcher 在整篇／structured
    # 路徑會先跑 link-target／link-url-mangle／footnote-format 的 --fix 再送
    # verify_one，但 patch 引擎的三重驗證在這裡自己跑、自己拒收，dispatcher 的
    # heal 永遠輪不到它——run 98122 第一輪 外送專法 五語 patch 全被同一個
    # `/pt/Economy/` 大寫 category 擋下，每次十分鐘。fixer 只修 casing／decode／
    # 純缺 description 這類確定性格式，不放寬閘門。
    for check in ("link-target", "link-url-mangle", "footnote-format"):
        hr = subprocess.run(
            ["python3", "scripts/tools/article-health.py", str(out_path),
             "--profile=pre-commit", f"--check={check}", "--fix", "--quiet"],
            cwd=REPO, capture_output=True, text=True,
        )
        if hr.returncode != 0:
            print(f"   🔴 {check} heal 失敗 rc={hr.returncode}: {(hr.stdout + hr.stderr).strip()[-200:]}")
        elif hr.stdout.strip():
            print(f"   🔧 {check} heal: {hr.stdout.strip()[-160:]}")

    ok, details = run_verify_trio(args.zh_path, out_path, args.lang)
    metrics["phases"]["validation"] = {"prettier_ok": prettier_ok, "prettier_msg": prettier_msg, **details}
    if not ok:
        print(f"❌ verify trio FAILED: {json.dumps(details, ensure_ascii=False)[:1200]}")
        # 2026-07-27：舊版只印前 1200 字元就把失敗檔 unlink 掉，往往連是哪一項
        # FAIL 都被截斷看不到（三重驗證的 detail 字串常常比 1200 字元長）——
        # 診斷時得整個重跑一次才看得到全貌。寫一份完整 debug json 留底，不受
        # stdout 截斷限制——寫到系統 temp（不是 out_path 旁邊：production 的
        # out_path 就在 knowledge/<lang>/ 底下，debug 產物絕不該混進這個受
        # git 追蹤的目錄）。
        try:
            tag = f"{out_path.stem}-{int(time.time())}"
            debug_json = Path(tempfile.gettempdir()) / f"patch-translate-fail-{tag}.json"
            debug_json.write_text(json.dumps(details, ensure_ascii=False, indent=2), encoding="utf-8")
            # 連實際（post-prettier）失敗檔內容一起留底——只看 verify-trio 的
            # verdict 常常猜不出模型實際輸出了什麼（2026-07-27 覆盤親身驗證：
            # 同一章節不同次 retry 產出完全不同的失敗樣態）。
            debug_md = Path(tempfile.gettempdir()) / f"patch-translate-fail-{tag}.md"
            debug_md.write_text(out_path.read_text(encoding="utf-8"), encoding="utf-8")
            print(f"   🔍 full verify-trio detail: {debug_json} (failing content: {debug_md})")
        except Exception:  # noqa: BLE001
            pass
        _restore_or_unlink("verify trio 未過")
        return 1

    # passthrough heal：belt-and-suspenders，跟 babel-dispatch 自己的後處理同款
    # （便宜、幂等，補漏我們自己 frontmatter 組裝可能漏掉的任何欄位）
    hr = subprocess.run(
        [sys.executable, str(SCRIPT_DIR / "heal-passthrough-fields.py"), args.zh_path, str(out_path)],
        cwd=REPO, capture_output=True, text=True,
    )
    if hr.stdout.strip():
        print(f"   🔧 passthrough heal: {hr.stdout.strip()[:150]}")

    metrics["total_elapsed_s"] = round(time.time() - t_total0, 1)
    metrics["out_path"] = str(out_path)
    print(f"✅ patched {len(touched_idx)} chapter(s) in {metrics['total_elapsed_s']}s → {out_path}")
    metrics_out = out_path.with_suffix(".patch-metrics.json")
    try:
        metrics_out.write_text(json.dumps(metrics, ensure_ascii=False, indent=2), encoding="utf-8")
    except Exception:  # noqa: BLE001
        pass
    return 0


if __name__ == "__main__":
    sys.exit(main())
