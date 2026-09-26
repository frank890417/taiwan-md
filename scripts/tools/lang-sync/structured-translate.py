#!/usr/bin/env python3
"""
structured-translate.py — Structured segmented translation engine (pilot, 2026-07-25).

哲宇 2026-07-25 directive: 前期預防取代事後修補。今天的三大 fail 家族——passthrough
欄位漏抄（category 被模型憑空改寫）、腳註編號飄移、引號跳出炸 YAML——全部源自「整篇
丟給模型，模型順便重排/漏抄結構」。

核心原則：**模型只翻文字，結構由工具持有。**

    - Frontmatter：passthrough 欄位（author/date/category/... 見 PASSTHROUGH，讀
      verify-translation.py 同源）工具機械複製，根本不進 prompt；只有 title/
      description/tags 送模型（subcategory 是分群鍵，09-20 起原樣複製 zh）。YAML 由工具組裝
      （單引號 + 撇號雙寫跳脫），模型只回一段 JSON。
    - Footnotes：URL 與編號永遠不進 prompt，工具原樣保留；模型只收 {n, title, desc}
      JSON 陣列，只回 title/desc 譯文。條數 / URL byte-equal / 編號集合在構造上保證
      相等，不是驗證出來的。
    - Body：去除 frontmatter 與腳註定義行後，按 H2 切塊（無 H2 或塊 >6000 字元則
      退化為段落切塊，見 chunk_body()）。每塊獨立翻譯、獨立驗證（腳註引用集合 /
      cjk-leak-check / 字元 ratio 0.8-4.0），fail 只重翻該塊（最多 2 次重試），不是
      整篇重來——這是省算力的關鍵，也是跟舊 translate.py 整篇式最大的差異。
    - Assembly：工具拼三段 + prettier normalize + 跑現有三個驗證工具（verify-
      translation.py / cjk-leak-check.py / article-health.py --profile=pre-commit）
      當最後一道防線，不是主力——結構類錯誤在構造上已不可能發生。

Usage:
    python3 structured-translate.py Food/台灣咖啡文化.md --lang vi \\
        --backend openrouter:nvidia/nemotron-3-ultra-550b-a55b:free

    python3 structured-translate.py Food/台灣咖啡文化.md --lang vi \\
        --backend ollama:qwen3.6:35b-a3b-coding-nvfp4 --out /tmp/test.md

Backends reuse scripts/tools/lang-sync/backends/（OpenRouterBackend 有 5-key
rotation on 429；ollama 走本機 sovereignty backbone）。Prompt 素材（LANG_NAMES /
load_lang_guide_sections 動態抽 TRANSLATION-<lang>.md TL;DR）reuse自
openrouter-translate.py，避免另開一份會漂移的副本。

Pilot 產物 canonical 記錄：reports/structured-translation-pilot-2026-07-25.md
"""
from __future__ import annotations

import argparse
import datetime as _dt
import hashlib
import json
import re
import subprocess
import sys
import tempfile
import time
from datetime import datetime, timezone
from pathlib import Path
from typing import Optional

import yaml

SCRIPT_DIR = Path(__file__).resolve().parent           # scripts/tools/lang-sync
REPO = SCRIPT_DIR.parent.parent.parent
KNOWLEDGE = REPO / "knowledge"

sys.path.insert(0, str(SCRIPT_DIR))
from backends import (  # noqa: E402
    AnthropicBackend,
    CodexBackend,
    GeminiBackend,
    GeminiPaidBackend,
    OllamaBackend,
    OpenRouterBackend,
)
from importlib import import_module as _import_module  # noqa: E402

_or = _import_module("openrouter-translate")
load_lang_guide_sections = _or.load_lang_guide_sections
LANG_NAMES = _or.LANG_NAMES

_verify = _import_module("verify-translation")
PASSTHROUGH = _verify.PASSTHROUGH  # 同源 SSOT — author/date/featured/readingTime/
# lastVerified/lastHumanReview/category/image/imageCredit/difficulty

cjkleak = _import_module("cjk-leak-check")

import cross_link_localizer as _xlink  # noqa: E402 — 站內連結在地化（防新增，見 main() Phase B 前置處理）


# ────────────────── shared regex / constants ──────────────────

FN_DEF_RE = re.compile(r"(?m)^\[\^([^\]]+)\]:\s*(.*)$")
MD_TARGET_PATTERN = r"<[^>\s]+>|[^)\s]+"
# Angle-wrapped target（`<https://..._(Japan)>`）是 CommonMark 保護含括號 URL
# 的 canonical 寫法，必須在一般 `[^)]+` 之前整段匹配。舊 regex 在 URL 內第一個
# `)` 截斷，Phase N 就退到 fallback parser，最後組成 `[[Title](<](<URL%3E>))`。
FN_CANON_RE = re.compile(
    rf"^\[([^\]]+)\]\(({MD_TARGET_PATTERN})\)(?:\s*—\s*(.*))?$"
)
# 原文歷史腳註偶有 `[Title. 取自 [](URL)) — desc`：它不是合法 CommonMark，
# 但 URL 與可翻譯 title 都可無損辨識。若讓一般 embedded-link regex 先吃，
# title 會變成 `Title. 取自 [`，Phase N 組裝後再製造一層巢狀壞連結。
FN_NESTED_EMPTY_LINK_RE = re.compile(
    rf"^\[([^\]]+?)\s*\[\]\(({MD_TARGET_PATTERN})\)\)"
    r"(?:\s*—\s*(.*))?$"
)
INLINE_FN_REF_RE = re.compile(r"\[\^([^\]]+)\]")
MD_LINK_URL_RE = re.compile(rf"\]\(({MD_TARGET_PATTERN})\)")
EMBEDDED_LINK_RE = re.compile(rf"\[([^\]]*)\]\(({MD_TARGET_PATTERN})\)")

# imageAlt 2026-09-21 補進：verify-translation.py 第 13 檢查把它跟 title/description
# 同列「不得留原文」，但本引擎跟 patch-translate 都把它當 passthrough 機械複製 zh
# ——凡 zh 有 imageAlt 的稿（48 篇、223 個譯本缺這欄）兩條引擎永遠過不了閘，一夜
# 36 次嘗試全敗在這一格（#83 兩把尺：跟 09-20 subcategory 那條同型、方向相反）。
TRANSLATABLE_FM_FIELDS = ["title", "description", "tags", "imageAlt"]

PILOT_ROOT = Path("/tmp/structured-pilot")

# chunk 級字元比上限 2026-09-22 改為按語言從 ratio-bands.json 推：舊碼對十二語一律寫死
# [0.8, 4.0]，這把尺是 2026-07-25 vi pilot 時憑印象放的，之後沒人對其他語言重驗過。
# 拿 120 篇×12 語已上站的合格譯文按 H2 切塊實測（同一種切法），chunk 級比值的 p95：
# fr 4.60 / es 4.61 / de 4.37 / id 4.06 / pt 4.12，p99.5 最高 fr 5.19——也就是說
# 羅曼語與德文每篇約十塊裡有一塊會合法地越過 4.0，整篇 structured 因此中止，
# run 98122 一夜 39 次 chunk 比值拒收裡 35 次落在 4.01～4.89 這一格（fr 15 / es 7 /
# id 6 / de 6），structured 引擎在這些語言的通過率被壓到 12%。
# 修法：上限 = max(4.0, healthy_max × CHUNK_RATIO_SLACK)。chunk 比 whole 噪音大（短塊、
# 標題行、連結文字佈局），所以給整篇 band 的 1.3 倍鬆度；每個語言的 p99.5 都在新上限
# 之下、en 那顆 20.46 的胡言亂語仍擋得住；ja/ko 上限維持 4.0 不收緊（本次只修假陽性
# 家族，不新開拒收面）。下限 0.8 不動——掉段的守門是腳註集合、URL multiset、H2 數。
CHUNK_RATIO_FLOOR = 0.8
CHUNK_RATIO_LEGACY_CEILING = 4.0
CHUNK_RATIO_SLACK = 1.3
RATIO_BANDS_PATH = SCRIPT_DIR / "ratio-bands.json"


def chunk_ratio_band(lang: str) -> tuple[float, float]:
    """回傳 (下限, 上限)。上限依 ratio-bands.json 該語言 healthy_max 放大，讀不到
    或該語言未校準時退回舊寫死值，行為與 2026-09-22 前完全相同。"""
    ceiling = CHUNK_RATIO_LEGACY_CEILING
    try:
        bands = json.loads(RATIO_BANDS_PATH.read_text(encoding="utf-8")).get("bands", {})
        hmax = float(bands.get(lang, {}).get("healthy_max", 0) or 0)
        if hmax > 0:
            ceiling = max(CHUNK_RATIO_LEGACY_CEILING, round(hmax * CHUNK_RATIO_SLACK, 2))
    except (OSError, ValueError, TypeError):
        pass
    return CHUNK_RATIO_FLOOR, ceiling


# ────────────────── backend selection ──────────────────

def build_backend(spec: str):
    """`<name>[:option]` → concrete backend instance (single backend, not a cascade —
    pilot wants isolated per-phase timing for ONE model, not cascade fallback noise)."""
    name, _, opt = spec.partition(":")
    name = name.strip()
    opt = opt.strip()
    if name == "openrouter":
        return OpenRouterBackend(model=opt) if opt else OpenRouterBackend()
    if name == "ollama":
        return OllamaBackend(model=opt or None)
    if name == "codex":
        return CodexBackend()
    if name == "gemini":
        return GeminiBackend(model=opt) if opt else GeminiBackend()
    if name == "anthropic":
        # Tier 6（OBSERVER-QUEUE #18，2026-09-05 拍板）— eligibility/cap 由 babel-dispatch.py 強制
        return AnthropicBackend(model=opt) if opt else AnthropicBackend()
    if name == "gemini-paid":
        # Tier 7（OBSERVER-QUEUE #18，2026-09-05 拍板）
        return GeminiPaidBackend(model=opt) if opt else GeminiPaidBackend()
    raise ValueError(f"unknown backend spec: {spec!r} (want openrouter:<model> | ollama:<model> | codex | "
                      f"gemini | anthropic:<model> | gemini-paid:<model>)")


# ────────────────── generic JSON-call helper (Phase F / N) ──────────────────

def _strip_fence(text: str) -> str:
    t = text.strip()
    if t.startswith("```"):
        t = re.sub(r"^```[a-zA-Z]*\n?", "", t, count=1)
        if t.endswith("```"):
            t = t[:-3]
    return t.strip()


# 2026-07-25 pilot 發現：nvidia/nemotron-3-ultra 系列是 reasoning 模型，不明確禁止
# 的話會把整段思考過程當 content 吐出來（15 條腳註的 batch 實測吐了 9000+ 字元的
# 「"著" -> "hệ thống" 好的...」式逐詞碎念，budget 燒光在思考、最終 JSON 被截斷），
# 而非單純「AI 加了 markdown fence」那種好處理的雜訊。系統層沒有 reasoning-exclude
# 開關（OpenRouterBackend 目前不透傳 reasoning 參數），所以在 prompt 層雙重防禦：
# (1) 明講「不要展示推理過程」；(2) parse 失敗時退化用括號配對法在雜訊中撈出最後一段
# 合法 JSON，而不是直接判失敗——這比單純 strip code fence 更能扛住 reasoning 模型。
_NO_REASONING_SUFFIX = (
    " Do not show your reasoning, chain-of-thought, or any explanation of your "
    "translation choices — output ONLY the final JSON, nothing else before or after it."
)


def _extract_json_loose(text: str):
    """json.loads 直接失敗時的退路：從文字裡找「最後一段」括號配對完整的 [...] 或
    {...} 子字串（reasoning 模型常把真正答案放在碎念之後）。找不到就讓例外往上拋，
    交給呼叫端的重試機制處理。

    2026-09-24：舊版先整輪找 `[` 再找 `{`，於是一個合法的 frontmatter 物件後面多
    一句說明，就會撈到物件**裡面**的 tags 陣列回傳（`JSON shape fail: list len=8
    first=str`，run 98122 修後窗 3 次，整篇 exit=1）。改成兩種括號的候選一起收，
    只留不被其他候選包住的最外層，再取最後一個。
    """
    candidates: list[tuple[int, int, object]] = []
    for open_ch, close_ch in (("[", "]"), ("{", "}")):
        start = text.rfind(open_ch)
        while start != -1:
            depth = 0
            for i in range(start, len(text)):
                if text[i] == open_ch:
                    depth += 1
                elif text[i] == close_ch:
                    depth -= 1
                    if depth == 0:
                        try:
                            candidates.append((start, i + 1, json.loads(text[start:i + 1])))
                        except json.JSONDecodeError:
                            pass
                        break
            start = text.rfind(open_ch, 0, start)
    if not candidates:
        raise json.JSONDecodeError("no balanced JSON substring found", text, 0)
    outermost = [
        c for c in candidates
        if not any(o is not c and o[0] <= c[0] and c[1] <= o[1] for o in candidates)
    ]
    return max(outermost, key=lambda c: c[0])[2]


# JSON 裡一個字串值結束後，下一個非空白字元只可能是這幾個。
_JSON_AFTER_STRING = set(",:}]")


def _repair_unescaped_quotes(text: str) -> str:
    """把「字串值內部」沒跳脫的 ASCII 雙引號修好，其餘一字不動。

    2026-09-26 付費 Haiku lane 首輪追出來的：譯文裡的引號會直接打斷 JSON。德文模型
    開引號寫對了 `„`、收引號卻寫成 ASCII `"`（「„More than NT$1.12 billion"」），英／
    西／阿等語把中文「」譯成 ASCII `"…"` 也是同一件事。那個 `"` 提早結束了字串，
    整個陣列解析失敗，_extract_json_loose 只撈得到最後一個完整物件，呼叫端看到
    `JSON shape fail: dict keys=['n', 'title', 'desc']`——09-20 起的 log 裡這個形狀
    有 68 次、十二語都有、每個模型都有，每次燒掉一到六分鐘 worker 時間後整篇不寫檔。

    判準（逐字元掃，只在字串內動手）：
      - 前面有未收的 `„`（U+201E，德文與俄文的下引號）→ 這個 `"` 就是它的收引號，
        換成正確的 `“`（U+201C），順便把排版修對；
      - 否則看它後面第一個非空白字元：是 `, : } ]` 或檔尾 → 真的字串結尾，照舊；
      - 都不是 → 字串內部的引號，補一個反斜線跳脫。
    判不準的形狀（例如內部引號後面剛好接逗號）修完仍然解析不了，呼叫端會退回原本
    的 _extract_json_loose 路徑——這支只會讓能救的變多，不會把原本能解析的弄壞
    （呼叫端只在 json.loads 失敗後才用它）。"""
    out: list[str] = []
    in_str = esc = open_low9 = False
    n = len(text)
    i = 0
    while i < n:
        ch = text[i]
        if not in_str:
            out.append(ch)
            if ch == '"':
                in_str, open_low9 = True, False
        elif esc:
            out.append(ch)
            esc = False
        elif ch == "\\":
            out.append(ch)
            esc = True
        elif ch == "„":
            out.append(ch)
            open_low9 = True
        elif ch in "“”":
            # 下引號已用正確的排版引號收掉——之後遇到的 ASCII `"` 回到一般判準。
            # （測試抓到的：少了這條，合法的 `„ok“ — fine"` 會把字串真正的結尾誤認成收引號。）
            out.append(ch)
            open_low9 = False
        elif ch == '"':
            if open_low9:
                out.append("“")
                open_low9 = False
            else:
                j = i + 1
                while j < n and text[j] in " \t\r\n":
                    j += 1
                if j >= n or text[j] in _JSON_AFTER_STRING:
                    out.append(ch)
                    in_str = False
                else:
                    out.append('\\"')
        else:
            out.append(ch)
        i += 1
    return "".join(out)


def call_json(backend, system: str, user: str, *, max_tokens: int, timeout: int,
              max_attempts: int, metrics: dict, label: str, accept_data=None):
    """Call backend, strip fence, parse JSON. Retries on parse failure (spec:
    「parse 失敗重試一次」→ max_attempts=2 covers 1 original + 1 retry)."""
    base_system = system + _NO_REASONING_SUFFIX
    last_err = None
    for attempt in range(1, max_attempts + 1):
        # 2026-09-23：重試時把上一輪的毛病講給模型聽，不要原樣重播同一個 prompt。
        # 新加的原文摘錄證實了「no balanced JSON」不是空回應——模型拿整批腳註
        # 當文件寫了一篇 1,750 字的中文 markdown 回來（馬祖國際藝術島 hi）。
        # 同一個 prompt 再送一次，模型沒有任何理由改變行為；Phase B 的 chunk
        # 重試從一開始就會帶上「你上次哪裡錯了」，這裡補上同一個迴路。
        system = base_system
        if attempt > 1 and last_err:
            system = base_system + (
                f"\n\nYour previous answer was rejected: {last_err[:200]}. "
                "Return ONLY the JSON value described above — no markdown, no prose, "
                "no document, no explanation. Start your answer with the opening "
                "brace or bracket."
            )
        t0 = time.time()
        call_record = {"label": label, "attempt": attempt}
        try:
            raw = backend.translate(system, user, max_tokens=max_tokens, timeout=timeout)
        except Exception as e:  # noqa: BLE001 — any BackendError family
            last_err = f"backend error: {e}"
            call_record.update(ok=False, error=last_err, elapsed_s=round(time.time() - t0, 1))
            metrics.setdefault("calls", []).append(call_record)
            continue
        elapsed = round(time.time() - t0, 1)
        cleaned = _strip_fence(raw)
        try:
            data = json.loads(cleaned)
        except json.JSONDecodeError:
            # 譯文裡沒跳脫的引號是最常見的解析失敗（見 _repair_unescaped_quotes）；
            # 先修引號再解析，救不回來才退到撈最後一段的 loose 路徑——後者對陣列
            # 只撈得到最後一個物件，正是 `dict keys=['n','title','desc']` 的來源。
            repaired = _repair_unescaped_quotes(cleaned)
            try:
                data = json.loads(repaired)
                call_record["quote_repair"] = True
            except json.JSONDecodeError:
                try:
                    data = _extract_json_loose(cleaned)
                except json.JSONDecodeError as e:
                    # 2026-09-23：只印例外訊息等於印一句「解析不了」——`_extract_json_loose`
                    # 自己組的 JSONDecodeError 一律報 pos=0，所以「line 1 column 1 (char 0)」
                    # 既可能是空輸出、也可能是三千字的碎念，兩者處置完全不同（一個是算力
                    # 沒回來，一個是模型話太多）。run 98122 一夜 29 次落在這一格而查不下去。
                    # 把長度與開頭原樣帶進訊息，dispatcher 收 stdout 尾 3000 字剛好讀得到。
                    last_err = (f"JSON parse fail: {e} | raw_len={len(cleaned)} "
                                f"head={cleaned[:180]!r}")
                    call_record.update(ok=False, error=last_err, elapsed_s=elapsed)
                    metrics.setdefault("calls", []).append(call_record)
                    continue
        if accept_data is not None and not accept_data(data):
            last_err = f"JSON shape fail: {type(data).__name__}"
            if isinstance(data, dict):
                last_err += f" keys={list(data)[:8]!r}"
            elif isinstance(data, list):
                last_err += f" len={len(data)} first={type(data[0]).__name__ if data else 'empty'}"
            call_record.update(ok=False, error=last_err, elapsed_s=elapsed)
            metrics.setdefault("calls", []).append(call_record)
            continue
        call_record.update(ok=True, elapsed_s=elapsed)
        metrics.setdefault("calls", []).append(call_record)
        return data
    raise RuntimeError(f"{label}: failed after {max_attempts} attempt(s) — {last_err}")


# ════════════════════════ Phase F — frontmatter ════════════════════════

def parse_zh_frontmatter(zh_content: str) -> tuple[dict, str]:
    """Returns (parsed_fm_dict_in_source_order, body_after_fm)."""
    if not zh_content.startswith("---"):
        raise ValueError("zh source missing opening frontmatter fence")
    end = zh_content.find("\n---", 3)
    if end == -1:
        raise ValueError("zh source missing closing frontmatter fence")
    fm_text = zh_content[3:end].strip("\n")
    body = zh_content[end + 4:]
    fm = yaml.safe_load(fm_text)
    if not isinstance(fm, dict):
        raise ValueError("zh frontmatter did not parse to a mapping")
    return fm, body


def yaml_single_quote(value) -> str:
    """單引號風格 + 撇號雙寫跳脫（129 檔 silent-OG-break 的教訓 — 這條規則本身就是
    今天要防的三大 fail 家族之一，本工具把它變成工具持有的機械操作，不靠模型遵守）。"""
    s = str(value)
    escaped = s.replace("'", "''")
    return f"'{escaped}'"


def render_scalar(value, indent: int = 0) -> str:
    """Passthrough 欄位機械複製：bool/int/float/date 保持裸值型別，字串走單引號跳脫。
    刻意不用 yaml.dump()（它的引號/換行風格跟本專案慣例不一致），手動組裝才能保證
    輸出跟 zh 來源同型別、同語意。`indent` 是這個值所屬 key 的縮排（多行字串與巢狀
    mapping 需要知道自己在第幾層才能對齊）。"""
    if isinstance(value, str) and "\n" in value:
        # 2026-09-22：含換行的字串（zh 用 `|` block scalar 寫的 whats_excluded 清單）走單引號
        # 會被 YAML 摺掉換行，parse 回來跟 zh 不等。改渲染成 block scalar，行首縮排 indent+2。
        pad = " " * (indent + 2)
        body = value[:-1] if value.endswith("\n") else value
        head = "|" if value.endswith("\n") else "|-"
        return head + "\n" + "\n".join(pad + l if l else "" for l in body.split("\n"))
    if isinstance(value, bool):
        return "true" if value else "false"
    if isinstance(value, (int, float)):
        return str(value)
    if isinstance(value, _dt.date):
        return value.isoformat()
    if isinstance(value, list):
        # list 欄位（relatedDiary 等）逐元素跳脫成 inline flow list——
        # 2026-07-26 前這裡 fallthrough 到 yaml_single_quote(str(list))，
        # 產出 '[''a'', ''b'']' 這種「長得像 list 的單一字串」。不炸 YAML、
        # 不觸發 verify 的 PASSTHROUGH 檢查（未涵蓋 relatedDiary），是會
        # 靜默存活的型別走樣；裝甲常駐化後每次翻譯都會經過，重啟產線前必修。
        # 2026-09-22：元素含 dict／list／多行字串（sporeLinks 是 list of mapping）時
        # 不能塞 flow list——dict 那條改渲染 block mapping 的同一夜，台海危機七語全撞
        # 「while parsing a flow sequence」，就是 block mapping 被塞進 [ ] 裡（本班自己
        # 造成的回歸，一小時內抓到）。這種 list 改渲染 block sequence。
        if any(isinstance(v, (dict, list)) or (isinstance(v, str) and "\n" in v) for v in value):
            return render_block_sequence(value, indent=indent + 2)
        return "[" + ", ".join(render_scalar(v) for v in value) + "]"
    if value is None:
        # 2026-09-22：None 曾 fallthrough 成字串 'None'（beyblade 三語 rationale: 'None'）
        return "null"
    if isinstance(value, dict):
        # 2026-09-22：巢狀 mapping（rationale 的 why_this_hook／whats_excluded 四鍵）曾
        # fallthrough 到 yaml_single_quote(str(dict))，上站 1,140 份譯文的 rationale 變成
        # 一整串 Python dict repr——跟上面 list 那條是同一個型別走樣家族的第三個成員
        # （list 07-26、None／dict 09-22）。改渲染成縮排 block mapping，跟 zh 同形。
        return render_block_mapping(value, indent=indent + 2)
    return yaml_single_quote(value)


def render_field(key: str, value, indent: int = 0) -> str:
    """`key: value` 一整行（block mapping／sequence 時 `key:` 後不留尾空白，直接接換行）。
    三條引擎與 heal 工具的 passthrough 欄位都該走這裡，不要各自拼 f-string。"""
    rendered = render_scalar(value, indent=indent)
    sep = "" if rendered.startswith("\n") else " "
    return f"{' ' * indent}{key}:{sep}{rendered}"


def render_block_sequence(items: list, indent: int) -> str:
    """把 list 渲染成 `- item` 的縮排 block sequence（回傳值以換行開頭，接在 `field:` 後）。
    dict 元素第一個鍵跟在 `- ` 後、其餘鍵對齊縮排 indent+2；其他型別走 render_scalar。"""
    pad = " " * indent
    lines = []
    for v in items:
        if isinstance(v, dict) and v:
            keys = list(v.keys())
            first = keys[0]
            fv = v[first]
            head = f"{pad}- {first}:" + (render_block_mapping(fv, indent + 4) if isinstance(fv, dict)
                                          else " " + render_scalar(fv, indent=indent + 2))
            lines.append(head)
            rest = {k: v[k] for k in keys[1:]}
            if rest:
                lines.append(render_block_mapping(rest, indent + 2).lstrip("\n"))
        elif isinstance(v, list):
            lines.append(f"{pad}-" + render_block_sequence(v, indent + 2))
        else:
            lines.append(f"{pad}- {render_scalar(v, indent=indent)}")
    return "\n" + "\n".join(lines)


def render_block_mapping(mapping: dict, indent: int) -> str:
    """把 dict 渲染成 `key: value` 的縮排 block mapping，第一行留空讓呼叫端接在
    `field:` 之後（回傳值以換行開頭）。巢狀 dict 遞迴縮排，其他型別走 render_scalar。"""
    pad = " " * indent
    lines = []
    for k, v in mapping.items():
        if isinstance(v, dict):
            lines.append(f"{pad}{k}:" + render_block_mapping(v, indent + 2))
        else:
            rendered = render_scalar(v, indent=indent)
            sep = "" if rendered.startswith("\n") else " "   # block sequence 接在 `key:` 後不留尾空白
            lines.append(f"{pad}{k}:{sep}{rendered}")
    return "\n" + "\n".join(lines)


def load_subcategory_i18n() -> dict:
    p = REPO / "src/data/subcategory-i18n.json"
    if not p.exists():
        return {}
    try:
        return json.loads(p.read_text(encoding="utf-8")).get("map", {})
    except Exception:  # noqa: BLE001
        return {}


def git_short_sha(zh_rel_path: str) -> str:
    try:
        r = subprocess.run(
            ["git", "log", "-1", "--format=%h", "--", f"knowledge/{zh_rel_path}"],
            cwd=REPO, capture_output=True, text=True, timeout=15,
        )
        sha = r.stdout.strip()
        return sha if sha else "pre-toolkit"
    except Exception:  # noqa: BLE001
        return "pre-toolkit"


def _unwrap_singleton_payload(data):
    """`[{...}]` → `{...}`。Phase N 早就接受「物件內恰好一個 list」這個包裝形狀
    （normalize_footnote_batch），Phase F 的鏡像形狀卻從沒接：模型把單一物件包成
    一元陣列回來，舊碼一律判 shape fail，重試兩次後整篇中止（run 98220 近 20 小時
    8 次，全 run 21 次）。只認「長度恰好 1 且元素是 dict」這個高信心形狀，其餘
    原樣往下丟；猜錯也穿不過後面的「payload 每個 key 都要在」與 tags 長度驗證。"""
    if isinstance(data, list) and len(data) == 1 and isinstance(data[0], dict):
        return data[0]
    return data


def _accept_frontmatter_payload(result) -> bool:
    return isinstance(result, dict) or (
        isinstance(result, list) and len(result) == 1 and isinstance(result[0], dict)
    )


def translate_frontmatter(zh_fm: dict, zh_content: str, zh_path: str, lang: str,
                           backend, metrics: dict) -> str:
    """Phase F. 只把 title/description/tags 送模型；其餘欄位工具機械複製，永遠
    不進 prompt。回傳組好的 YAML frontmatter 區塊文字（不含前後 --- fence，
    main() 負責包）。

    subcategory 從 2026-09-20 起**原樣複製 zh 值**，不查 i18n 表也不送模型。
    07-25 版把它當顯示標籤翻（查 `subcategory-i18n.json`，缺對照就送模型），
    前提是 verify-translation.py 07-24 那條「subcategory 是 rendered label」的
    註解；但分類頁 `buildSubcategoryGroups()` 是拿 frontmatter 值**完全比對**分群，
    顯示文字才查 i18n 表（category-hub.template.astro）——翻過的值讓那篇自成一群、
    再被併進「其他」。09-08 `subcategory-translation-parity` 上線時全庫 1,634 篇
    已經這樣掉隊，09-20 量到 1,795 篇：存量在漲，漲的來源就是這個分支（統一調度器
    的閘門只看 hard，這條是 WARN）。存量清理 >50 檔屬 OBSERVER-QUEUE #51 等哲宇；
    本函式只堵新增。"""

    payload = {}
    for k in TRANSLATABLE_FM_FIELDS:
        if zh_fm.get(k) is not None:
            payload[k] = zh_fm[k]

    # subcategory：分群鍵，原樣複製 zh 值（見 docstring）。不進 payload、不查表。
    subcat_final = zh_fm.get("subcategory")

    lang_name = LANG_NAMES.get(lang, lang)
    system = (
        f"You are translating ONLY the VALUES of specific frontmatter fields from "
        f"zh-TW to {lang_name} for Taiwan.md, an open-source curated knowledge base "
        "about Taiwan.\n\n"
        "Input is a JSON object. Return a JSON object with EXACTLY the same keys, "
        "same types (string stays string, array stays array with identical length "
        "and order), values translated to the target language. No commentary, no "
        "markdown code fence — JSON only, nothing else.\n"
        "- 'title'/'description': natural accurate translation, no machine-translate "
        "tells, no added or invented facts.\n"
        "- 'tags': translate each tag value; the array length MUST stay identical.\n"
        "- 'imageAlt' (if present): translate the image alt text as a plain "
        "sentence — no markdown, no quotes added.\n"
    )
    user = json.dumps(payload, ensure_ascii=False)

    # 2026-07-25 pilot 發現（賴和.md → vi 重跑）：description 出現「đối抗」這種單字
    # 級 CJK 殘留（「抗」黏在越南文字尾），validate_frontmatter_block() 抓得到，但
    # 舊版只在 call_json 內對「JSON parse 失敗」重試，語意層的殘留字完全沒有回饋
    # 迴路。這裡補上跟 Phase B 一樣的「驗證 → 帶著問題重翻」迴圈，而不是驗完就算了。
    content_retry_system = system
    for content_attempt in range(1, 3):
        data = call_json(backend, content_retry_system, user, max_tokens=4000, timeout=180,
                          max_attempts=2, metrics=metrics,
                          label=f"phase-F-content{content_attempt}",
                          accept_data=_accept_frontmatter_payload)
        data = _unwrap_singleton_payload(data)

        for k in payload:
            if k not in data:
                raise RuntimeError(f"phase-F: model response missing key {k!r}")
        if "tags" in payload:
            if not isinstance(data["tags"], list) or len(data["tags"]) != len(payload["tags"]):
                raise RuntimeError(
                    f"phase-F: tags length mismatch (zh={len(payload['tags'])}, "
                    f"out={len(data.get('tags', [])) if isinstance(data.get('tags'), list) else 'non-list'})"
                )

        leaks = []
        if lang not in ("ja", "ko"):
            for fk in ("title", "description", "imageAlt"):
                if fk in data and _verify.has_cjk(str(data[fk])):
                    leaks.append(fk)
            if "tags" in data and any(_verify.has_cjk(str(t)) for t in data.get("tags", [])):
                leaks.append("tags")
        if not leaks or content_attempt == 2:
            break
        content_retry_system = system + (
            f"\n\nYour previous answer left untranslated zh-TW characters inside: "
            f"{', '.join(leaks)}. Re-translate ALL fields fully into {lang_name} — "
            "no Chinese characters should remain anywhere in the output."
        )

    lines: list[str] = []
    for key in zh_fm.keys():
        if key == "title":
            lines.append(f"title: {yaml_single_quote(str(data['title']))}")
        elif key == "description":
            lines.append(f"description: {yaml_single_quote(str(data['description']))}")
        elif key == "tags":
            lines.append("tags:")
            lines.append("  [")
            for t in data.get("tags", []):
                lines.append(f"    {yaml_single_quote(str(t))},")
            lines.append("  ]")
        elif key == "subcategory":
            lines.append(f"subcategory: {yaml_single_quote(str(subcat_final))}")
        elif key == "imageAlt":
            lines.append(f"imageAlt: {yaml_single_quote(str(data.get('imageAlt', zh_fm[key])))}")
        elif key in PASSTHROUGH:
            lines.append(render_field(key, zh_fm[key]))
        else:
            # 沒被明確歸類的欄位（既有 schema 之外）— 安全網機械複製，
            # 寧可過度保留也不要靜默丟欄位。
            lines.append(render_field(key, zh_fm[key]))

    lines.append(f"translatedFrom: {yaml_single_quote(zh_path)}")
    lines.append(f"sourceCommitSha: {yaml_single_quote(git_short_sha(zh_path))}")
    content_hash = hashlib.sha256(zh_content.encode("utf-8")).hexdigest()[:16]
    lines.append(f"sourceContentHash: 'sha256:{content_hash}'")
    lines.append(f"translatedAt: {yaml_single_quote(datetime.now(timezone.utc).isoformat())}")

    return "\n".join(lines)


def validate_frontmatter_block(fm_block_text: str, lang: str) -> list[str]:
    """yaml.safe_load 可解析 + title/description 非空 + 非 ja/ko 時不含 CJK。"""
    problems = []
    try:
        parsed = yaml.safe_load(fm_block_text)
    except Exception as e:  # noqa: BLE001
        return [f"YAML parse fail: {e}"]
    if not isinstance(parsed, dict):
        return ["YAML did not parse to a mapping"]
    title = str(parsed.get("title", ""))
    desc = str(parsed.get("description", ""))
    if not title.strip():
        problems.append("title empty")
    if not desc.strip():
        problems.append("description empty")
    if lang not in ("ja", "ko"):
        if _verify.has_cjk(title):
            problems.append("title contains CJK")
        if _verify.has_cjk(desc):
            problems.append("description contains CJK")
    return problems


# ════════════════════════ Phase N — footnotes ════════════════════════

def _protect_embedded_links(text: str) -> tuple[str, list[tuple[str, str]]]:
    """desc 內偶有第二個 markdown 連結（例如賴和.md [^3] 同時引 臺灣記憶 + Open
    Museum 兩個來源）——FN_CANON_RE 只保護「第一個」[title](url)，第二個連結的 URL
    會被當成普通文字送進 desc payload。這裡把 desc 內所有殘留連結的 URL 也用
    token 保護起來，翻完再原樣還原，不靠模型遵守指令。"""
    items: list[tuple[str, str]] = []

    def repl(m: re.Match) -> str:
        idx = len(items)
        token = f"@@LINK{idx}@@"
        items.append((token, m.group(2)))
        return f"[{m.group(1)}]({token})"

    protected = EMBEDDED_LINK_RE.sub(repl, text)

    # 2026-09-26：CommonMark autolink `<https://…>` 也上裝甲。散文型腳註裡這是
    # 最常見的網址寫法（〈台灣新冠疫情與疫苗〉[^85]），而上面只認 [文字](網址)。
    # 角括號是明確的邊界，所以只收這一種；句中裸網址的邊界（括號、標點）有歧義，
    # 猜錯會把半截網址鎖進 token，交給下游 URL multiset 閘門比較安全。
    def repl_auto(m: re.Match) -> str:
        idx = len(items)
        token = f"@@LINK{idx}@@"
        items.append((token, m.group(1)))
        return f"<{token}>"

    protected = AUTOLINK_RE.sub(repl_auto, protected)
    return protected, items


AUTOLINK_RE = re.compile(r"<(https?://[^<>\s]+)>")
# 網址本體的字元：可見 ASCII，扣掉 autolink 的角括號。中文與全形標點一律視為網址結束。
_URL_BODY_RE = re.compile(r"https?://[!-;=?-~]+")
# 網址後面可以只剩這些收尾符號而仍算「標題 網址」型引註。
_URL_TAIL_PUNCT = " \t>)）」』】。．.，,、；;：:!?！？"


def _url_sits_inside_prose(rest: str, url_start: int) -> bool:
    """網址之後還有實質文字＝它是散文的一部分，不是「標題 網址」引註。

    只看網址之後：網址前面有長文是這兩種腳註共同的長相（標題本來就在前面），
    分不出來；分得出來的是後面——引註的網址是最後一樣東西，散文的網址後面還有句子。"""
    m = _URL_BODY_RE.match(rest, url_start)
    end = m.end() if m else url_start
    return bool(rest[end:].strip(_URL_TAIL_PUNCT))


def _restore_embedded_links(text: str, items: list[tuple[str, str]]) -> str:
    for token, url in items:
        text = text.replace(token, url)
    return text


# 2026-09-23：Phase B 也走 @@LINKn@@ 裝甲（此前只有 Phase N 有）。裝甲的還原要
# 容忍一件事——模型翻到 ar/hi 時會把 token 裡的 ASCII 數字換成該語言的數字
# （٠١٢ / ०१२），那時 str.replace 找不到 token，URL 就整個消失。數字系統換寫是
# 可逆的機械對應（不是猜），所以這裡正規化回 ASCII 再對；形狀認不出來的一律
# 原樣留著，讓下游 URL multiset 閘門照常擋——不猜、不按位置硬塞（猜錯是把讀者
# 送到別人的頁面，比壞連結更糟，同 restore-footnote-urls.py 的保守判準）。
_NUMERAL_TO_ASCII = {
    **{chr(0x0660 + d): str(d) for d in range(10)},   # ٠-٩ Arabic-Indic
    **{chr(0x06F0 + d): str(d) for d in range(10)},   # ۰-۹ Extended Arabic-Indic
    **{chr(0x0966 + d): str(d) for d in range(10)},   # ०-९ Devanagari
}
_LINK_TOKEN_SCAN_RE = re.compile(r"@@\s*LINK\s*([^@\s]{1,8})\s*@@", re.I)


def _restore_protected_links(text: str, items: list[tuple[str, str]]) -> str:
    """裝甲還原：先照 token 精確還原，再掃一遍被改寫過數字的 token。"""
    if not items:
        return text
    text = _restore_embedded_links(text, items)

    def repl(m: "re.Match") -> str:
        digits = "".join(_NUMERAL_TO_ASCII.get(ch, ch) for ch in m.group(1))
        if not digits.isdigit():
            return m.group(0)
        idx = int(digits)
        return items[idx][1] if 0 <= idx < len(items) else m.group(0)

    return _LINK_TOKEN_SCAN_RE.sub(repl, text)


def extract_footnote_defs(body: str) -> list[dict]:
    """Regex 抽出所有 [^N]: ... 定義行，解析成 {n, title, url, desc}（canonical 格式
    參考 footnote-format-fix.py）。保留原始文件出現順序（賴和.md 的定義行不是照
    數字序排的，重組時要照抄這個順序，不是照 n 排序）。"""
    defs = []
    for m in FN_DEF_RE.finditer(body):
        n = m.group(1)
        rest = m.group(2).strip()
        canon = FN_CANON_RE.match(rest)
        if canon:
            title, url, desc = canon.group(1), canon.group(2), (canon.group(3) or "")
        else:
            nested = FN_NESTED_EMPTY_LINK_RE.match(rest)
            leading_link = EMBEDDED_LINK_RE.match(rest)
            if nested:
                title, url, desc = nested.group(1), nested.group(2), (nested.group(3) or "")
            elif leading_link:
                # 多來源腳註常是 `[來源一](URL1) + [來源二](URL2) — desc`。
                # 第一個連結作 canonical 主來源，其餘完整留在 desc，後續既有
                # embedded-link armor 會保護 URL2；不再把 `](` 殘片塞進 title。
                title, url = leading_link.group(1), leading_link.group(2)
                desc = rest[leading_link.end():].strip()
                desc = re.sub(r"^(?:\+|—)\s*", "", desc)
            elif EMBEDDED_LINK_RE.search(rest) or "[" in rest or "]" in rest:
                # 散文型腳註：`報時光：[標題](URL) — desc`（連結前有出處前綴）、
                # 「…同場另見[活動官方頁](URL)，講題為…」（連結在句中）、或
                # 「演講逐字稿 [1:00:07]（未公開素材）」（方括號時間碼）。
                # 2026-09-21 前這些全掉進下面的裸 URL 分支：title 切成
                # `報時光：[標題](`、URL 之後的整段 desc 直接丟掉，組回來是
                # `[[標題](](URL)` 這種巢狀壞連結，validate_footnotes 的方括號
                # 檢查再把整篇擋下——一夜 36 次 Phase N 全在這裡陣亡，每次燒
                # 130–750 秒，而 20 篇 ≥30 腳註的 zh 稿在 structured 引擎裡永遠
                # 過不去。改成整條當 desc 送翻（title/url 空），內嵌連結的 URL
                # 全走 @@LINKn@@ 保護，組回時照原樣 `[^n]: desc`，跟 whole 引擎
                # 對這種腳註的處理一致。
                title, url, desc = "", "", rest
            else:
                url_m = re.search(r"https?://\S+", rest)
                if url_m and _url_sits_inside_prose(rest, url_m.start()):
                    # 2026-09-26：散文註裡夾一個網址（〈台灣新冠疫情與疫苗〉[^85]：
                    # 「…中研院人工智慧行動網觀察筆記（<https://…/>）交叉確認上線
                    # 日期…」）。下面的裸 URL 分支假設「標題 網址」，於是整段前文變
                    # title、`\S+` 一路吃進後面的中文當 URL、網址之後的整段說明直接
                    # 丟掉；模型把長 title 挪進 desc，驗證器報 title empty，整篇
                    # 不寫檔——同一篇十一語、每個模型都卡在同一條，付費 lane 首兩次
                    # 呼叫就是這樣各燒掉四、五分鐘。網址後面還有句子＝它是散文的
                    # 一部分，整條走散文路徑（URL 由 _protect_embedded_links 的
                    # autolink 裝甲保護）。
                    title, url, desc = "", "", rest
                elif url_m:
                    url = url_m.group(0).rstrip(".,，。、")
                    title, desc = rest[: url_m.start()].strip(" —-"), ""
                else:
                    # 純文字引註（「吳哲宇口述值，2026-08-16 Openbook 對談…」）：沒有連結
                    # 也沒有方括號。09-21 00:43 前它是「整條當 title、desc 空」，第一個
                    # 上線的 run 就撞到模型把長 title 搬進 desc、title 交空（新 prompt
                    # 的散文規則讓它這樣做），驗證器報 15 條 title empty。乾脆也當
                    # 散文：整條在 desc，組回 `[^n]: desc`，跟舊輸出一字不差。
                    title, url, desc = "", "", rest
        desc_protected, link_restore = _protect_embedded_links(desc)
        defs.append({
            "n": n,
            "title": title.strip(),
            "url": url.strip(),
            "desc": desc_protected.strip(),
            "_link_restore": link_restore,
            # prose = 整條腳註都在 desc（title/url 皆空），翻完不接受模型補的 title
            "prose": not title and not url and bool(desc),
        })
    return defs


def normalize_footnote_batch(data, batch: list[dict]):
    """只解包可無損證明順序的 Phase N 回傳形狀。

    模型除了 canonical array，還會回 ``{"footnotes": [...]}``，或直接用腳註
    ID 當 key：``{"1": {"title": ..., "desc": ...}}``；後者有時又包在單鍵
    ``{"footnotes": {...}}`` 裡。ID mapping 只有在 key 集合精確等於本批預期
    ID、每個 value 都是 object、value 內若有 ``n`` 也與 key 一致時才可安全
    重排；任何缺項、多項、ID 衝突或多層 wrapper 仍原樣交給 hard gate 拒收。
    """
    if not isinstance(data, dict):
        return data

    if _is_single_footnote_record(data, batch):
        return [{**data, "n": str(batch[0]["n"])}]

    list_values = [value for value in data.values() if isinstance(value, list)]
    if len(list_values) == 1:
        return list_values[0]

    expected_ids = [str(item["n"]) for item in batch]
    candidate = data
    if set(candidate) != set(expected_ids):
        if len(data) != 1:
            return data
        wrapped = next(iter(data.values()))
        if not isinstance(wrapped, dict) or set(wrapped) != set(expected_ids):
            return data
        candidate = wrapped

    normalized = []
    for footnote_id in expected_ids:
        item = candidate[footnote_id]
        if not isinstance(item, dict):
            return data
        item_id = str(item.get("n", footnote_id))
        if item_id != footnote_id:
            return data
        normalized.append({**item, "n": footnote_id})
    return normalized


def _is_single_footnote_record(data, batch: list[dict] | None) -> bool:
    """本批只有一條、而模型回的單筆 object 的 n 正好是那一條：這是完整答案。

    2026-09-24：二分法把 2-3 條的批次切成 1 條的半批之後，模型對單元素陣列常
    直接回裸 object。舊判準一律當成「截斷尾端撈出的單筆」拒收，兩次重試都回
    同一個形狀，整篇 exit=1（run 98122 修後窗 6 次，`JSON shape fail: dict
    keys=['n', 'title', 'desc']`，其中 3 次發生在 split 之後）。只有批次長度
    恰好 1 且 ID 對得上才放行；多條批次的單筆 object 仍是截斷訊號。
    """
    if not batch or len(batch) != 1 or not isinstance(data, dict):
        return False
    if "n" not in data or not set(data).issubset({"n", "title", "desc"}):
        return False
    return str(data.get("n")) == str(batch[0]["n"])


def is_footnote_batch_response(data, batch: list[dict] | None = None) -> bool:
    """拒絕寬鬆 parser 從截斷 array 尾端撈出的單筆腳註 object。

    Phase N 的合法根節點是 array、ID mapping 或包住兩者的 object；單筆
    ``{"n", "title", "desc"}`` 只代表批次輸出不完整，必須讓 call_json 使用
    尚未耗掉的 retry，而不是提早回傳後才在 length gate 終止。例外：本批只有
    一條且 ID 相符（見 ``_is_single_footnote_record``）。
    """
    if isinstance(data, list):
        return True
    if not isinstance(data, dict):
        return False
    if _is_single_footnote_record(data, batch):
        return True
    return not ("n" in data and set(data).issubset({"n", "title", "desc"}))


def translate_footnotes(defs: list[dict], lang: str, backend, metrics: dict) -> dict:
    """模型只收 JSON 陣列的 {n, title, desc}；URL 與編號工具原樣保留，永遠不進
    prompt。一批最多 15 條，超過分批（spec 硬性要求）。"""
    if not defs:
        return {}
    lang_name = LANG_NAMES.get(lang, lang)
    out: dict[str, dict] = {}
    batch_size = 15
    # 2026-09-21：批次除了條數上限，再加字元預算。散文型腳註整條進 desc 後，
    # 一批 15 條可以到 3,500 個中文字（外送專法 62 條 14,268 字），本機 gemma
    # 在 Phase N 兩次都撞 240 秒逾時；同樣 15 條的短引註只有幾百字。字元預算
    # 讓長引註的文章多拆幾批、每批仍在單次呼叫吃得下的範圍，短引註的批次不變。
    batch_char_budget = 2000
    batches: list[list[dict]] = []
    cur: list[dict] = []
    cur_chars = 0
    for d in defs:
        d_chars = len(d["title"]) + len(d["desc"])
        if cur and (len(cur) >= batch_size or cur_chars + d_chars > batch_char_budget):
            batches.append(cur)
            cur, cur_chars = [], 0
        cur.append(d)
        cur_chars += d_chars
    if cur:
        batches.append(cur)
    for bi, batch in enumerate(batches):
        payload = [{"n": d["n"], "title": d["title"], "desc": d["desc"]} for d in batch]
        system = (
            f"Translate ONLY the 'title' and 'desc' fields of each footnote source "
            f"entry from zh-TW to {lang_name}, for Taiwan.md (open-source Taiwan "
            "knowledge base). Keep 'n' UNCHANGED — it is an id, not content, copy it "
            "verbatim. Any token shaped like @@LINKn@@ inside 'desc' is a protected "
            "URL placeholder — keep it byte-for-byte unchanged, do not translate or "
            "remove it.\n"
            "Return a JSON array, same length and same order as the input array, each "
            "object with EXACTLY the keys 'n', 'title', 'desc'. No commentary, no "
            "markdown code fence — JSON only.\n"
            "- 'title': the source's title, translated (keep proper nouns / "
            "publication names recognizable).\n"
            "- 'desc': a short one-line description of what the source documents.\n"
            "- If 'title' is an empty string, the entry is a prose footnote: 'desc' IS "
            "the whole footnote — translate it in full, sentence by sentence (do not "
            "summarize, do not drop anything), and return 'title' as an empty string."
        )
        user = json.dumps(payload, ensure_ascii=False)
        try:
            data = call_json(
                backend,
                system,
                user,
                max_tokens=8000,
                timeout=240,
                max_attempts=2,
                metrics=metrics,
                label=f"phase-N-batch{bi}",
                accept_data=lambda d, b=batch: is_footnote_batch_response(d, b),
            )
        except RuntimeError as error:
            # v1.45 實績：15 筆 batch 的兩次同尺寸重播都可能只留下尾端單筆
            # object。只有明確 shape failure 才換一次較小路徑；backend error、
            # timeout 與內容 gate 不在此擴張，避免把容量故障放大。
            if "JSON shape fail" not in str(error) or len(batch) < 2:
                raise
            midpoint = len(batch) // 2
            split_data = []
            for split_index, split_batch in enumerate(
                (batch[:midpoint], batch[midpoint:])
            ):
                split_payload = [
                    {"n": item["n"], "title": item["title"], "desc": item["desc"]}
                    for item in split_batch
                ]
                part = call_json(
                    backend,
                    system,
                    json.dumps(split_payload, ensure_ascii=False),
                    max_tokens=8000,
                    timeout=240,
                    max_attempts=2,
                    metrics=metrics,
                    label=f"phase-N-batch{bi}-split{split_index}",
                    accept_data=lambda d, b=split_batch: is_footnote_batch_response(d, b),
                )
                part = normalize_footnote_batch(part, split_batch)
                if not isinstance(part, list) or len(part) != len(split_batch):
                    raise RuntimeError(
                        f"phase-N batch {bi} split {split_index}: length mismatch "
                        f"(want {len(split_batch)}, got "
                        f"{len(part) if isinstance(part, list) else type(part).__name__})"
                    )
                split_data.extend(part)
            data = split_data
        # 模型常把正確陣列包成 `{"footnotes": [...]}` / `{"translations": [...]}`。
        # v1.6 fallback 實績 4 篇在這裡被判成「got dict」，但內容沒有機會進入
        # 後面的長度與 ID 驗證。只接受「物件內恰好一個 list」這個高信心形狀；
        # 多個 list、任意 mapping 仍拒收，避免猜錯欄位後靜默對位。
        data = normalize_footnote_batch(data, batch)
        if not isinstance(data, list) or len(data) != len(batch):
            shape = type(data).__name__
            if isinstance(data, dict):
                shape += f" keys={list(data)[:8]!r}"
            raise RuntimeError(
                f"phase-N batch {bi}: length mismatch (want {len(batch)}, "
                f"got {len(data) if isinstance(data, list) else shape})"
            )
        by_n = {str(item.get("n")): item for item in data if isinstance(item, dict)}
        for idx, d in enumerate(batch):
            item = by_n.get(str(d["n"]))
            if item is None:
                item = data[idx] if idx < len(data) and isinstance(data[idx], dict) else {}
            title = str(item.get("title", d["title"]))
            desc = str(item.get("desc", d["desc"]))
            desc = _restore_embedded_links(desc, d["_link_restore"])
            if d.get("prose"):
                # 散文型腳註沒有 title 槽位；模型若自作主張填一個，組回去會多出
                # 一段原文沒有的字。只收 desc。
                title = ""
            else:
                title = _normalize_footnote_title(title)
            out[d["n"]] = {"title": title, "desc": desc}
    return out


def _normalize_footnote_title(title: str) -> str:
    """譯出的腳註標題裡的方括號換成圓括號、換行換成空白。

    2026-09-26：Phase N 驗證失敗有 131／154 次是「title contains markdown/newline」，
    09-20 起每個模型、每個語言都有，整篇因此不寫檔。追一例：〈台灣人小時候的英文名字〉
    [^3] 原文標題「Chris Wang：【隨筆】英文名字」，模型把全形的【隨筆】譯成 `[Essay]`
    ——譯法沒錯，只是 ASCII 方括號放進 `[標題](網址)` 的連結文字會跟連結語法打架，
    所以驗證器擋下。這是標點層的機械轉換，不需要模型重來一次：`[Essay]` → `(Essay)`
    意思不變、連結文字安全。
    標題裡出現 `](` 或網址時不動它：那是模型把整條連結塞進標題（網址從沒進過 prompt，
    它只可能是編的），讓驗證器照舊擋下。"""
    if "](" in title or "http" in title:
        return title
    t = re.sub(r"\s*\n\s*", " ", title).strip()
    return t.replace("[", "(").replace("]", ")")


def validate_footnotes(defs: list[dict], translated: dict) -> list[str]:
    """條數相等 / URL byte-equal（保證成立，因為 url 從沒進 prompt）/ 編號集合相等
    ——構造上保證，這裡是雙重確認不是主要防線。"""
    problems = []
    if len(translated) != len(defs):
        problems.append(f"count mismatch: zh={len(defs)} translated={len(translated)}")
    orig_ids = {d["n"] for d in defs}
    trans_ids = set(translated.keys())
    if orig_ids != trans_ids:
        problems.append(f"id set mismatch: missing={orig_ids - trans_ids} extra={trans_ids - orig_ids}")
    prose_ids = {d["n"] for d in defs if d.get("prose")}
    for n, item in translated.items():
        title = str(item.get("title", ""))
        if n in prose_ids:
            # 散文型腳註：整條在 desc，title 本來就空；desc 空才是問題。
            if not str(item.get("desc", "")).strip():
                problems.append(f"footnote {n}: prose footnote translated to empty")
            continue
        if not title.strip():
            problems.append(f"footnote {n}: title empty")
        if "\n" in title or "[" in title or "]" in title:
            problems.append(f"footnote {n}: title contains markdown/newline")
    return problems


def assemble_footnote_defs(defs: list[dict], translated: dict) -> str:
    lines = []
    for d in defs:
        t = translated.get(d["n"], {"title": d["title"], "desc": d["desc"]})
        title, desc = t["title"], t["desc"]
        if d.get("prose"):
            lines.append(f"[^{d['n']}]: {desc}")
        elif not d["url"]:
            # 2026-07-25 pilot 發現（台灣咖啡文化.md [^3]/[^7]/[^9] 等）：來源本來
            # 就是純文字引註，沒有 URL（「散見於台灣飲食文化研究及地方誌」這種泛引）
            # ——硬包成 [title]() 會產生殘破的空連結。原樣保留純文字格式，不強加
            # markdown link 容器。
            lines.append(f"[^{d['n']}]: {title}" + (f" — {desc}" if desc else ""))
        elif desc:
            lines.append(f"[^{d['n']}]: [{title}]({d['url']}) — {desc}")
        else:
            lines.append(f"[^{d['n']}]: [{title}]({d['url']})")
    return "\n\n".join(lines)


# ════════════════════════ Phase B — body ════════════════════════

def strip_footnote_defs(body: str) -> str:
    return FN_DEF_RE.sub("", body)


def _split_paragraphs(text: str, max_chars: int) -> list[str]:
    """段落切塊 + bin-packing：累積段落直到接近 max_chars 才切下一塊，避免小文章
    被拆成一堆浪費呼叫次數的微型 chunk。"""
    paras = re.split(r"\n{2,}", text)
    chunks: list[str] = []
    buf: list[str] = []
    buf_len = 0
    for p in paras:
        if not p.strip():
            continue
        p_len = len(p) + 2
        if buf and buf_len + p_len > max_chars:
            chunks.append("\n\n".join(buf))
            buf, buf_len = [], 0
        buf.append(p)
        buf_len += p_len
    if buf:
        chunks.append("\n\n".join(buf))
    return [c for c in chunks if c.strip()]


def _bisect_at_paragraph_boundary(text: str) -> list[str]:
    """把失敗 chunk 沿最接近中點的段落邊界切成恰好兩半。

    不在句中硬切，因為那會讓兩次獨立翻譯失去語境並破壞 markdown 結構。
    只有至少兩個非空段落時才回傳兩半；否則保守放棄 split fallback。
    """
    paras = [p for p in re.split(r"\n{2,}", text) if p.strip()]
    if len(paras) < 2:
        return []
    total = sum(len(p) + 2 for p in paras)
    running = 0
    best_idx = 1
    best_distance = total
    for idx in range(1, len(paras)):
        running += len(paras[idx - 1]) + 2
        distance = abs(total / 2 - running)
        if distance < best_distance:
            best_idx = idx
            best_distance = distance
    return [
        "\n\n".join(paras[:best_idx]),
        "\n\n".join(paras[best_idx:]),
    ]


def chunk_body(body: str, max_chars: int = 6000) -> list[str]:
    """按 H2（## ）切塊；無 H2 或塊 >6000 字元則退化為段落切塊。"""
    h2_positions = [m.start() for m in re.finditer(r"(?m)^## ", body)]
    if not h2_positions:
        return _split_paragraphs(body, max_chars)

    blocks = []
    if h2_positions[0] > 0:
        head = body[: h2_positions[0]]
        if head.strip():
            blocks.append(head)
    bounds = h2_positions + [len(body)]
    for i in range(len(h2_positions)):
        blocks.append(body[bounds[i]: bounds[i + 1]])

    final: list[str] = []
    for b in blocks:
        if len(b) > max_chars:
            final.extend(_split_paragraphs(b, max_chars))
        else:
            final.append(b)
    final = [b for b in final if b.strip()]

    # 2026-07-25 pilot 發現（台灣咖啡文化.md → vi）：文末「## 參考資料」單獨成一個
    # H2 chunk 時 zh 只有 ~40 字元，翻譯輸出自然也很短——OpenRouterBackend 對
    # <100 字元輸出有一個「疑似 refusal」的保守判定（設計是給整篇翻譯用的，沒預期
    # chunk 級別呼叫），把合法的短輸出誤判成拒答，整個 heading 因此從輸出消失。
    # 把過小的 chunk（<300 字元，通常就是孤立的標題行）併回前一塊，結構性地
    # 避免孤立小塊觸發這個誤判，而不是每次都要靠重試僥倖過關。
    MIN_CHUNK_CHARS = 300
    merged: list[str] = []
    for b in final:
        if merged and len(b) < MIN_CHUNK_CHARS:
            merged[-1] = merged[-1].rstrip("\n") + "\n\n" + b.lstrip("\n")
        else:
            merged.append(b)
    return merged


def _cjk_leak_hits(text: str, lang: str, tmp_dir: Path) -> list[str]:
    """Reuse cjk-leak-check.py 的 scan_file（不重寫偵測邏輯）。寫到一個固定暫存檔
    （每次覆寫），path 含 knowledge/<lang>/ 讓它自己的 detect_lang 也答對，但這裡
    直接傳 lang= 顯式覆寫，不依賴路徑猜測。"""
    tmp_file = tmp_dir / "knowledge" / lang / "_chunk" / "chunk.md"
    tmp_file.parent.mkdir(parents=True, exist_ok=True)
    tmp_file.write_text(text, encoding="utf-8")
    return cjkleak.scan_file(tmp_file, lang=lang)


def _validate_chunk(zh_chunk: str, out: str, zh_refs: set, lang: str, tmp_dir: Path) -> list[str]:
    issues = []
    if not out.strip():
        return ["empty output"]
    out_refs = set(INLINE_FN_REF_RE.findall(out))
    if out_refs != zh_refs:
        issues.append(f"footnote ref set mismatch: zh={sorted(zh_refs)} out={sorted(out_refs)}")
    # 2026-07-25 pilot 發現（地震.md → vi）：body chunk 送進模型前已經把所有
    # [^N]: 定義行剝掉（Phase N 專屬），但某次輸出裡模型自己「腦補」出兩行假的
    # `[^9]: 腳註內容將在最終輸出中保留原位` 之類的偽定義——不是抄漏，是純幻覺，
    # 組裝後跟 Phase N 真定義重複，footnote count 從 20 變 22。zh_chunk 依構造
    # 保證不含任何 [^N]: 定義行，output 若出現就是模型無中生有，這裡直接攔。
    if FN_DEF_RE.search(out):
        issues.append("hallucinated footnote definition line(s) in body output (should only contain reference markers)")
    ratio = len(out) / max(len(zh_chunk), 1)
    lo, hi = chunk_ratio_band(lang)
    if not (lo <= ratio <= hi):
        issues.append(f"ratio out of band [{lo},{hi}]: {ratio:.2f}")
    hits = _cjk_leak_hits(out, lang, tmp_dir)
    if hits:
        issues.append(f"cjk leak: {hits[0]}")
    # 2026-07-25 production 首小時發現（張雨生 → hi 等 4 例 verify=1）：模型會
    # 掉「行內 markdown 連結」——zh 15 個 URL 譯文只剩 9 個。腳註引用有集合
    # 驗證、URL 沒有，正是設計還沒收編的最後一類結構物。用 multiset 比對
    # （同一 URL 可合法出現多次），少一個都擋下重試。
    from collections import Counter
    zh_urls = Counter(MD_LINK_URL_RE.findall(zh_chunk))
    out_urls = Counter(MD_LINK_URL_RE.findall(out))
    if zh_urls != out_urls:
        missing = list((zh_urls - out_urls).keys())[:3]
        extra = list((out_urls - zh_urls).keys())[:3]
        issues.append(f"inline link URL mismatch: missing={missing} extra={extra}")
    return issues


def translate_body_chunks(chunks: list[str], lang: str, backend, fn_glossary: dict,
                           metrics: dict) -> tuple[list[str], list[dict]]:
    guide = load_lang_guide_sections(lang, max_chars=6000)
    glossary_text = ""
    if fn_glossary:
        titles = [v["title"] for v in fn_glossary.values() if v.get("title")]
        if titles:
            glossary_text = (
                "已翻譯的腳註來源標題（術語一致性參考，不必逐字套用）：\n"
                + "\n".join(f"- {t}" for t in titles[:40])
            )

    lang_name = LANG_NAMES.get(lang, lang)
    base_system = (
        f"You are translating an article body from zh-TW to {lang_name} for "
        "Taiwan.md, an open-source curated knowledge base about Taiwan.\n\n"
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
        "line at the very start of this chunk. A heading left in Chinese is a "
        "failure, not a preserved title.\n"
        "5. Output ONLY the translated markdown. No commentary, no code fence, no "
        "explanation, no reasoning/chain-of-thought before or after the translation "
        "— just the translated markdown body, nothing else.\n\n"
        f"Target-language rules (extracted from docs/editorial/per-language/"
        f"TRANSLATION-{lang}.md):\n{guide}\n\n{glossary_text}"
    )

    tmp_dir = Path(tempfile.mkdtemp(prefix="structured-translate-chunk-"))
    translated_chunks: list[str] = []
    chunk_reports: list[dict] = []
    max_attempts = 3  # 1 原譯 + 最多 2 次重試（spec 硬性上限，省算力）

    for idx, zh_chunk in enumerate(chunks):
        zh_refs = set(INLINE_FN_REF_RE.findall(zh_chunk))
        # URL 裝甲（2026-09-23）：此前 Phase B 把整個 [text](URL) 原樣送模型，靠
        # HARD RULE 2 要它逐字複製，而「inline link URL mismatch」是 run 98122 近
        # 20 小時失敗的第一大宗（31 次，佔 17%）——模型會改一個 percent-encoding
        # 位元組（%E7%B8%BD→%E7%B8%BA）、把 `/contribute` 的斜線吃掉、或整條掉光。
        # Phase N 的腳註 URL 從一開始就走 @@LINKn@@ 裝甲，從沒出過這類事；同一條
        # 原則（工具持有結構，模型只翻文字，MANIFESTO §14）補進 Phase B。
        # 驗證面不變：還原後仍跟原始 zh_chunk 比 URL multiset，token 掉了照樣擋。
        zh_send, link_items = _protect_embedded_links(zh_chunk)
        system = base_system
        last_output, last_issues = "", ["not attempted"]
        attempts_used = 0
        for attempt in range(1, max_attempts + 1):
            attempts_used = attempt
            t0 = time.time()
            try:
                raw = backend.translate(system, zh_send, max_tokens=6000, timeout=240)
            except Exception as e:  # noqa: BLE001
                elapsed = round(time.time() - t0, 1)
                last_issues = [f"backend error: {e}"]
                metrics.setdefault("calls", []).append({
                    "label": f"phase-B-chunk{idx}", "attempt": attempt, "ok": False,
                    "error": str(e), "elapsed_s": elapsed,
                })
                last_output = ""
                continue
            elapsed = round(time.time() - t0, 1)
            out = _restore_protected_links(_strip_fence(raw), link_items)
            issues = _validate_chunk(zh_chunk, out, zh_refs, lang, tmp_dir)
            metrics.setdefault("calls", []).append({
                "label": f"phase-B-chunk{idx}", "attempt": attempt, "ok": not issues,
                "elapsed_s": elapsed, "issues": issues,
            })
            last_output, last_issues = out, issues
            if not issues:
                break
            system = base_system + (
                "\n\nYour previous attempt had these problems — fix them and "
                f"re-translate the SAME source text: {'; '.join(issues)}"
            )

        split_fallback = False
        # 近一小時 structured fallback 有 4 篇完成 Phase F/N，最後卻都因單一
        # body chunk 三次失敗而整篇歸零。原 chunk 重試耗盡後，沿段落邊界二分，
        # 兩半各只再試一次：換的是問題尺寸，不是無限重播同一 prompt。兩半仍各自
        # 驗腳註、URL、CJK leak，合併後再用原 chunk 跑一次完整驗證。
        if last_issues:
            split_parts = _bisect_at_paragraph_boundary(zh_chunk)
            split_outputs: list[str] = []
            split_ok = len(split_parts) == 2
            for part_idx, part in enumerate(split_parts):
                part_refs = set(INLINE_FN_REF_RE.findall(part))
                part_send, part_links = _protect_embedded_links(part)
                t0 = time.time()
                try:
                    raw = backend.translate(base_system, part_send, max_tokens=6000, timeout=240)
                    elapsed = round(time.time() - t0, 1)
                    out = _restore_protected_links(_strip_fence(raw), part_links)
                    issues = _validate_chunk(part, out, part_refs, lang, tmp_dir)
                    metrics.setdefault("calls", []).append({
                        "label": f"phase-B-chunk{idx}-split{part_idx}",
                        "attempt": 1,
                        "ok": not issues,
                        "elapsed_s": elapsed,
                        "issues": issues,
                    })
                except Exception as e:  # noqa: BLE001
                    elapsed = round(time.time() - t0, 1)
                    out, issues = "", [f"backend error: {e}"]
                    metrics.setdefault("calls", []).append({
                        "label": f"phase-B-chunk{idx}-split{part_idx}",
                        "attempt": 1,
                        "ok": False,
                        "error": str(e),
                        "elapsed_s": elapsed,
                    })
                split_outputs.append(out)
                if issues:
                    split_ok = False
            if split_ok:
                joined = "\n\n".join(split_outputs)
                joined_issues = _validate_chunk(
                    zh_chunk, joined, zh_refs, lang, tmp_dir)
                if not joined_issues:
                    last_output, last_issues = joined, []
                    split_fallback = True
                else:
                    last_output, last_issues = joined, joined_issues

        chunk_reports.append({
            "index": idx,
            "zh_chars": len(zh_chunk),
            "out_chars": len(last_output),
            "attempts": attempts_used,
            "retries": attempts_used - 1,
            "status": "OK" if not last_issues else "FAILED_VALIDATION",
            "issues": last_issues,
            "split_fallback": split_fallback,
        })
        translated_chunks.append(last_output)

    return translated_chunks, chunk_reports


# ════════════════════════ Phase A — assembly ════════════════════════

def assemble_article(fm_block: str, translated_chunks: list[str], fn_defs_text: str) -> str:
    body = "\n\n".join(c.strip("\n") for c in translated_chunks if c.strip())
    parts = [f"---\n{fm_block}\n---", body.strip()]
    if fn_defs_text.strip():
        parts.append(fn_defs_text.strip())
    return "\n\n".join(p for p in parts if p.strip()) + "\n"


def run_prettier(path: Path) -> tuple[bool, str]:
    try:
        r = subprocess.run(["npx", "prettier", "--write", str(path)], cwd=REPO,
                            capture_output=True, text=True, timeout=60)
        return r.returncode == 0, (r.stdout + r.stderr)[-500:]
    except Exception as e:  # noqa: BLE001
        return False, str(e)


def _ensure_repo_symlink_for_pilot() -> Path:
    """verify-translation.py 的 ratio-check 子檢查用 en_full.relative_to(REPO)——絕對
    路徑在 /tmp 下會直接 ValueError 炸掉整支 script（連後面 9-16 項檢查都拿不到）。
    在 repo 內已 gitignore 的 tmp/ 底下放一個指回 /tmp/structured-pilot 的 symlink，
    讓傳給 verify-translation.py 的路徑「lexically」落在 REPO 底下，同時實際位元組
    仍然只放在系統 /tmp（不寫 knowledge/，符合 pilot 要求）。cjk-leak-check.py /
    article-health.py 用的是 Path.parts 找「knowledge」子字串，不受影響，兩種路徑
    都能正常運作，不需要這個 symlink。"""
    link_parent = REPO / "tmp"
    link_parent.mkdir(exist_ok=True)
    link = link_parent / "structured-pilot"
    if link.is_symlink() or link.exists():
        if not (link.is_symlink() and link.resolve() == PILOT_ROOT.resolve()):
            link.unlink()
            link.symlink_to(PILOT_ROOT)
    else:
        link.symlink_to(PILOT_ROOT)
    return link


def _verify_arg_path(out_path: Path) -> Path:
    try:
        rel = out_path.relative_to(PILOT_ROOT)
    except ValueError:
        return out_path
    link = _ensure_repo_symlink_for_pilot()
    return link / rel


def run_verify_translation(zh_path: str, out_path: Path) -> dict:
    script = SCRIPT_DIR / "verify-translation.py"
    arg_path = _verify_arg_path(out_path)
    r = subprocess.run(
        [sys.executable, str(script), zh_path, str(arg_path), "--json"],
        cwd=REPO, capture_output=True, text=True, timeout=60,
    )
    try:
        data = json.loads(r.stdout)
    except Exception:  # noqa: BLE001
        data = {"error": "non-JSON output", "stdout": r.stdout[-1200:], "stderr": r.stderr[-1200:]}
    data["exit_code"] = r.returncode
    return data


def run_cjk_leak_check(out_path: Path, lang: str) -> dict:
    hits = cjkleak.scan_file(out_path, lang=lang)
    return {"flagged": bool(hits), "hits": hits}


def run_article_health(out_path: Path) -> dict:
    script = REPO / "scripts/tools/article-health.py"
    r = subprocess.run(
        [sys.executable, str(script), str(out_path), "--profile=pre-commit", "--output=json"],
        cwd=REPO, capture_output=True, text=True, timeout=120,
    )
    try:
        data = json.loads(r.stdout)
    except Exception:  # noqa: BLE001
        data = {"error": "non-JSON output", "stdout": r.stdout[-1500:], "stderr": r.stderr[-1500:]}
    data["exit_code"] = r.returncode
    return data


# ════════════════════════ slug / output path resolution ════════════════════════

def resolve_slug(zh_path: str, lang: str) -> str:
    trans_path = KNOWLEDGE / "_translations.json"
    trans = json.loads(trans_path.read_text(encoding="utf-8")) if trans_path.exists() else {}
    # 先看目標語言自己是否已有這篇的 slug
    for k, v in trans.items():
        if v == zh_path and k.startswith(f"{lang}/"):
            return Path(k).stem
    # 沿用 prepare-batch.py 的邏輯：任何語言已存在的翻譯，slug 視為 canonical，
    # 沿用它而不是讓每個語言各自發明一個新 slug（避免同一篇文章多語言 slug 分裂）。
    for k, v in trans.items():
        if v == zh_path:
            return Path(k).stem
    # Fallback：兩篇 pilot 素材都已有既有翻譯可沿用，不會走到這裡；留一個保守
    # fallback 避免工具在其他輸入上直接炸掉。
    stem = Path(zh_path).stem
    ascii_stem = re.sub(r"[^a-zA-Z0-9-]+", "-", stem).strip("-").lower()
    return ascii_stem or "untitled"


def resolve_out_path(zh_path: str, lang: str, out_arg: Optional[str]) -> Path:
    if out_arg:
        return Path(out_arg)
    category = zh_path.split("/")[0]
    slug = resolve_slug(zh_path, lang)
    return KNOWLEDGE / lang / category / f"{slug}.md"


# ════════════════════════ CLI ════════════════════════

def main():
    ap = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    ap.add_argument("zh_path", help="zh-TW source path relative to knowledge/, e.g. Food/台灣咖啡文化.md")
    ap.add_argument("--lang", required=True, help="target language code (vi/ar/en/...)")
    ap.add_argument("--backend", required=True, help="openrouter:<model> | ollama:<model> | codex | gemini")
    ap.add_argument("--out", help="override output path (default: knowledge/<lang>/<category>/<slug>.md)")
    ap.add_argument("--metrics-out", help="also write phase-timing metrics JSON to this path")
    ap.add_argument("--skip-validators", action="store_true",
                    help="skip verify-translation.py / cjk-leak-check.py / article-health.py (faster iteration)")
    args = ap.parse_args()

    zh_full = KNOWLEDGE / args.zh_path
    if not zh_full.exists():
        print(f"❌ zh source not found: {zh_full}", file=sys.stderr)
        sys.exit(2)
    zh_content = zh_full.read_text(encoding="utf-8")

    backend = build_backend(args.backend)
    print(f"📋 {args.zh_path} → {args.lang} via {backend.name}")

    metrics: dict = {
        "zh_path": args.zh_path, "lang": args.lang, "backend": args.backend,
        "backend_name": backend.name, "phases": {},
    }
    t_total0 = time.time()

    # ── Phase F ──
    t0 = time.time()
    zh_fm, body = parse_zh_frontmatter(zh_content)

    # 站內連結在地化（防新增，reports/cross-link-localization-2026-07-27.md 第二段）：
    # 在 body 進 Phase N/B 之前，把 `[文字](/分類/中文slug)` 這類站內連結改成
    # `args.lang` 的譯文網址（查無對應保守不動）。這樣 base_system 裡「URL 原樣
    # 保留 VERBATIM」的指示對站內連結也是對的——模型看到的已經是目標網址，
    # 不必再靠 prompt 猜它是站內還是站外連結。在 Phase N（footnote 抽取）之前做，
    # 兩邊都吃得到改好的版本；純字串替換不加減行數，不影響任何行號依賴的邏輯。
    body, _xlink_count = _xlink.localize_body(body, args.lang)
    metrics["cross_links_localized"] = _xlink_count
    # wikilink 路由收回工具端（2026-09-22）：本引擎此前完全沒處理 `[[X]]`，模型把括號裡的
    # 字翻掉、括號留著，wikilink-target 硬閘擋整篇（run 98122 一夜 18 次：文化內容策進院
    # 5 次、學習貧窮 de、河川 hi⋯⋯）。有譯文 → markdown 連結（URL 隨即進裝甲）；沒有 →
    # 純文字。三引擎共用 cross_link_localizer.resolve_wikilinks，不再各抄一份。
    body, _wl_linked, _wl_plain = _xlink.resolve_wikilinks(body, args.lang)
    metrics["wikilinks_linked"] = _wl_linked
    metrics["wikilinks_plain"] = _wl_plain

    f_metrics: dict = {}
    fm_block = translate_frontmatter(zh_fm, zh_content, args.zh_path, args.lang, backend, f_metrics)
    fm_problems = validate_frontmatter_block(fm_block, args.lang)
    f_calls = f_metrics.get("calls", [])
    metrics["phases"]["F"] = {
        "elapsed_s": round(time.time() - t0, 1),
        "retries": sum(1 for c in f_calls if not c.get("ok")),
        "calls": f_calls,
        "validation_problems": fm_problems,
    }
    print(f"  Phase F (frontmatter): {metrics['phases']['F']['elapsed_s']}s, "
          f"{len(fm_problems)} problem(s)")

    # ── Phase N ──
    t0 = time.time()
    defs = extract_footnote_defs(body)
    n_metrics: dict = {}
    translated_fn = translate_footnotes(defs, args.lang, backend, n_metrics)
    fn_problems = validate_footnotes(defs, translated_fn)
    fn_defs_text = assemble_footnote_defs(defs, translated_fn)
    n_calls = n_metrics.get("calls", [])
    metrics["phases"]["N"] = {
        "elapsed_s": round(time.time() - t0, 1),
        "footnote_count": len(defs),
        "retries": sum(1 for c in n_calls if not c.get("ok")),
        "calls": n_calls,
        "validation_problems": fn_problems,
    }
    print(f"  Phase N (footnotes): {metrics['phases']['N']['elapsed_s']}s, "
          f"{len(defs)} defs, {len(fn_problems)} problem(s)")

    # Phase N 的 title 會被工具包進 `[title](url)`；若 title 本身含 `[]`，
    # 繼續跑 Phase B 只會白花模型時間，最後在 article-health 才死。
    # 和 failed body chunk 一樣 fail-closed：保留舊譯文、不落半成品。
    if fn_problems:
        print(f"❌ Phase N validation failed — aborting, no output written: {fn_problems}")
        if args.metrics_out:
            Path(args.metrics_out).write_text(json.dumps(metrics, ensure_ascii=False, indent=2), encoding="utf-8")
        return 1

    # ── Phase B ──
    t0 = time.time()
    body_no_fn = strip_footnote_defs(body)
    chunks = chunk_body(body_no_fn)
    b_metrics: dict = {}
    translated_chunks, chunk_reports = translate_body_chunks(
        chunks, args.lang, backend, translated_fn, b_metrics)
    b_calls = b_metrics.get("calls", [])
    failed_chunks = [c for c in chunk_reports if c["status"] != "OK"]
    metrics["phases"]["B"] = {
        "elapsed_s": round(time.time() - t0, 1),
        "chunk_count": len(chunks),
        "chunks": chunk_reports,
        "retries": sum(c["retries"] for c in chunk_reports),
        "failed_chunk_count": len(failed_chunks),
        "calls": b_calls,
    }
    print(f"  Phase B (body): {metrics['phases']['B']['elapsed_s']}s, "
          f"{len(chunks)} chunk(s), {len(failed_chunks)} still failing after retries")

    # 2026-07-25 production 首小時裁決：重試耗盡仍 fail 的 chunk 原本「照樣
    # 組裝、讓下游 gate 攔」——結果 dispatcher 白跑 verify trio、寫 quarantine
    # corpse、HEAD-restore 一整套（leak×5 + health×10 大多源於此）。知道自己
    # 有病還把成品送檢，是把診斷成本外包給下游。改硬中止：不寫輸出，exit 1，
    # dispatcher 端走「no output」路徑（保留舊版、退避重排），省整輪 gate。
    if failed_chunks:
        print(f"❌ {len(failed_chunks)} chunk(s) failed after retries — aborting, no output written")
        # 2026-09-21：dispatcher 不帶 --metrics-out，exit 1 時 metrics 也不落檔，
        # 一夜 66 次「chunk 失敗」在 master.log 只剩上面那一行——燒掉約 40 小時
        # worker 時間卻查不出敗在腳註標記、URL、CJK 殘留還是 backend 逾時
        # （REFLEXES #85：「不知道」不能借「沒事」的符號）。把每個失敗 chunk 的
        # 最後一輪問題印出來，dispatcher 收 stdout 尾 3000 字，這裡剛好進得去。
        for c in failed_chunks:
            issues = "; ".join(str(i) for i in c.get("issues", []))[:300]
            print(f"   chunk {c['index']} ({c['zh_chars']} zh chars, "
                  f"{c['attempts']} attempt(s)): {issues}")
        if args.metrics_out:
            Path(args.metrics_out).write_text(json.dumps(metrics, ensure_ascii=False, indent=2), encoding="utf-8")
        return 1

    # ── Phase A ──
    t0 = time.time()
    assembled = assemble_article(fm_block, translated_chunks, fn_defs_text)
    out_path = resolve_out_path(args.zh_path, args.lang, args.out)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(assembled, encoding="utf-8")

    prettier_ok, prettier_msg = run_prettier(out_path)

    if args.skip_validators:
        verify_result = {"skipped": True}
        cjk_result = {"skipped": True}
        health_result = {"skipped": True}
    else:
        verify_result = run_verify_translation(args.zh_path, out_path)
        cjk_result = run_cjk_leak_check(out_path, args.lang)
        health_result = run_article_health(out_path)

    metrics["phases"]["A"] = {
        "elapsed_s": round(time.time() - t0, 1),
        "prettier_ok": prettier_ok,
        "prettier_msg": prettier_msg,
        "verify_translation": verify_result,
        "cjk_leak_check": cjk_result,
        "article_health": health_result,
    }
    metrics["total_elapsed_s"] = round(time.time() - t_total0, 1)
    metrics["out_path"] = str(out_path)

    print(f"  Phase A (assembly): {metrics['phases']['A']['elapsed_s']}s, "
          f"prettier={'ok' if prettier_ok else 'FAIL'}, "
          f"verify_fails={verify_result.get('fails', '?')}, "
          f"cjk_flagged={cjk_result.get('flagged', '?')}")
    print(f"✅ done in {metrics['total_elapsed_s']}s → {out_path}")

    metrics_out = Path(args.metrics_out) if args.metrics_out else out_path.with_suffix(".metrics.json")
    metrics_out.write_text(json.dumps(metrics, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"📊 metrics → {metrics_out}")


if __name__ == "__main__":
    # sys.exit 包住——沒有它 return 1 不會變成 exit code，dispatcher 端
    # 看到 exit 0 + 無輸出會誤判（今天第 N 次：訊號斷在最後一哩）。
    sys.exit(main())
