#!/usr/bin/env python3
"""
translate.py — Translation cascade orchestrator (backend-agnostic).

Single entry point for SQUEEZE-MODELS-MAX-PIPELINE v4 (post-2026-05-12 backend
abstraction). Replaces the model-specific scripts (openrouter-translate.py /
codex-translate.py / ollama-translate.py) for new work.

The cascade tries backends in priority order, skipping any that report
`is_available()=False` or `in_cooldown()`, and falling through to the next on
`BackendError` (rate limit / refusal / timeout / bad output). First success wins.

Existing scripts kept for back-compat — this is the **new canonical entry point**.

Usage:
    # Translate entire group via default cascade
    python3 translate.py --group .lang-sync-tasks/ja/_group-A.json

    # Override cascade: codex first, then OpenRouter owl-alpha, then Ollama
    python3 translate.py --group ... --cascade codex,openrouter:owl-alpha,ollama

    # Single article test
    python3 translate.py --zh-path Society/颱風假.md --lang ja --cascade codex

Cascade syntax:
    backend_name[:option]
    - `codex`
    - `openrouter:MODEL` (e.g. `openrouter:openrouter/owl-alpha`)
    - `gemini[:MODEL]` (subscription CLI — permanently dead 2026-07-18, explicit override only)
    - `anthropic[:MODEL]` (Tier 6, paid API key — see backends/anthropic.py; restricted eligibility
      enforced by babel-dispatch.py, not by this cascade)
    - `gemini-paid[:MODEL]` (Tier 7, paid API key — see backends/gemini.py GeminiPaidBackend)
    - `ollama[:MODEL]`

Designed per哲宇 2026-05-12 callout 「儘可能模組化 抽象化 可抽換化」.
"""
from __future__ import annotations

import argparse
import json
import os
import re
import subprocess
import sys
import time
from dataclasses import replace as _dc_replace
from pathlib import Path
from typing import Optional

import yaml

from backends import (
    AnthropicBackend,
    BackendError,
    BackendRateLimited,
    BackendRefusal,
    BackendTimeout,
    BackendUnavailable,
    CodexBackend,
    GeminiBackend,
    GeminiPaidBackend,
    OllamaBackend,
    OpenRouterBackend,
    TranslationBackend,
)

sys.path.insert(0, str(Path(__file__).resolve().parent))
from importlib import import_module as _import_module  # noqa: E402
check_script_presence = _import_module("script-presence-check").check_text

# ── armor 專用同源匯入（哲宇 2026-07-26 directive）：不重寫，直接借既有 SSOT ──
_verify_mod = _import_module("verify-translation")
PASSTHROUGH_FIELDS = _verify_mod.PASSTHROUGH  # frontmatter 卸甲的 passthrough 清單同源
_cjkleak_mod = _import_module("cjk-leak-check")
LEGIT_ZH_SPANS = _cjkleak_mod.LEGIT_ZH_SPANS  # 保留區預標註同源（「」『』《》〈〉判準）
_structured_mod = _import_module("structured-translate")
parse_zh_frontmatter = _structured_mod.parse_zh_frontmatter  # zh frontmatter → (dict, body)
yaml_single_quote = _structured_mod.yaml_single_quote        # 單引號＋撇號雙寫跳脫（129 檔教訓）
render_scalar = _structured_mod.render_scalar                # bool/int/float/date 型別保真複製
_or_mod = _import_module("openrouter-translate")
LANG_NAMES = _or_mod.LANG_NAMES

import cross_link_localizer as _xlink  # noqa: E402 — 站內連結在地化（防新增，見 tokenize_urls）

REPO = Path(__file__).resolve().parent.parent.parent.parent
KNOWLEDGE = REPO / "knowledge"


# ────────────────── Cascade defaults ──────────────────

DEFAULT_CASCADE_ID = "codex,openrouter:nvidia/nemotron-3-super-120b-a12b:free,ollama,fleet"
"""Default cascade priority (v4.13 2026-09-09 gpt-oss-120b:free 下架；v4.12 2026-09-05
OBSERVER-QUEUE #18；v4.3 2026-06-10 audit D-2；v4.2 2026-05-16 哲宇 callout「codex + gemini 為優先」):

1. **codex (gpt-5.5)** — subscription, top quality, ~100% Taiwan pass (production verified)
2. **openrouter nemotron-3-super-120b-a12b:free** — verified free，262K ctx（大文章會
   truncate，ratio gate 接手）
3. **ollama (qwen3.6)** — sovereignty backbone, never refuses（需 `ollama serve` 啟動）
4. **fleet** — Tier 5（v4.4 2026-07-10 P0-2）：主權 GPU 軍團 raw HTTP。cron 環境層
   可以一夜滅掉所有 CLI backend（7/8 catastrophic exhaustion vc=2：codex nvm 斷 /
   gemini TERM=dumb / free tier 全域 429 / 本機 ollama 吐空），但 HTTP 直打不經
   CLI 層（同夜 embeddings 毫髮無傷的對照組證據）。7/9 手動繞道 ship 4 篇驗證路通，
   本版收編進 default cascade。endpoint 由 fleet 自己選節點（fleet-endpoint.sh）。

v4.12 變更（OBSERVER-QUEUE #18 (a)，哲宇 2026-09-05 拍板原話「tier 6 用 haiku,
7 用 gemini」）：**gemini（訂閱版 CLI）摘出 default cascade** — 2026-07-18 健檢已知
`IneligibleTierError: UNSUPPORTED_CLIENT`（Google 收掉 Gemini Code Assist for
individuals，需遷移 Antigravity，帳號決策屬哲宇），2026-09-05 複測仍是同一個
永久性錯誤，不是暫時性 429。留在 default cascade 裡等於每篇都白撞一次死 backend。
程式碼路徑保留（`backends/gemini.py` GeminiBackend 未刪），要用走顯式
`--cascade gemini,...` override；帳號遷移後若要復活，改回本行即可，不用重寫。

v4.13 變更：**tier 2 從 `openai/gpt-oss-120b:free` 換成
`nvidia/nemotron-3-super-120b-a12b:free`**。前者已被 OpenRouter 下架（2026-09-09 現查
`/api/v1/models` 確認不在架，付費版 `openai/gpt-oss-120b` 仍在），適用 v4.12 對 gemini
寫下的同一條理由：留在 default cascade 裡等於每篇都白撞一次死 backend。

這條的教訓不在模型換誰：**「gpt-oss-120b:free 被下架」這個事實 2026-07-24 就被寫進
`research-fleet.py` 的註解裡了**（那支工具自己撞到、自己記下、自己換掉 DEFAULT_MODEL），
六週來沒有傳到真正拿它當預設的這一行。免費 model slug 會漂移，而知道它漂移了的地方
跟受它影響的地方不是同一個檔案。用 `openrouter-model-audit.py` 定期對賬，別靠註解傳話。
新增 Tier 6（`anthropic:{model}`，見 `backends/anthropic.py`）與 Tier 7
（`gemini-paid:{model}`，見 `backends/gemini.py` GeminiPaidBackend）**不放進
default cascade**——兩者都是付費、且依 OBSERVER-QUEUE #18 資格限制（只服務 P0
missing 與 CRITICAL(<0.5) 截斷檔）+ 每夜配額，這些限制在 `babel-dispatch.py`
的 restricted worker 機制強制，不該讓一般 stale 任務也打進去（07-25 哲宇因算力
爆炸關過 rewrite 的前車之鑑）。要用走 `--worker-tier6 haiku=anthropic:{model}` /
`--worker-tier7 gemini7=gemini-paid:{model}`，見 SQUEEZE-MODELS-MAX-PIPELINE.md
§Tier 6/7。

v4.3 變更：owl-alpha 移出 default — 2026-06-10 babel-nightly 證實 silent 轉 paid
（HTTP 404，兩週內第 5 個 cloud free tier 死亡：Hy3 → deepseek → qwen3 → owl-alpha）。
「free tier alive 是 daily-deprecating 假設不是常數」(memory 2026-06-09-003433)。
要重試 owl-alpha 走 `--cascade openrouter:openrouter/owl-alpha,...` 顯式 override。

驗證佇列 model (Llama-3.3-70b / Hermes-3-405b / Gemma-4-31b 等) 不在 default cascade —
要驗證走 `--cascade openrouter:{MODEL}` override + SQUEEZE-MODELS-MAX-PIPELINE §驗證 SOP。

搭配 preflight health-check（v4.3 新增，audit D-2）：batch 模式 default 先 probe 每個
backend，死模型整 run 冷凍一次，不再讓 168 篇各自撞 timeout 燒掉幾小時。

Pipeline canonical: docs/pipelines/SQUEEZE-MODELS-MAX-PIPELINE.md
"""


class FleetBackend(OllamaBackend):
    """Tier 5：主權 fleet GPU 節點，ollama 相容 API over raw HTTP。

    跟本機 OllamaBackend 同協定、不同地板：不依賴 cron 環境的 CLI 層
    （nvm PATH / TERM / free-tier 配額都碰不到它）。fleet 自己負責節點
    選擇與 sovereignty-safe 過濾（~/Projects/muse-bot/fleet）。
    """

    CAPABILITIES = _dc_replace(
        OllamaBackend.CAPABILITIES,
        name="fleet",
        model="qwen3.5:35b",
        typical_latency_s=120,
        notes="Tier 5 sovereignty fleet over HTTP（2026-07-10 P0-2 收編）— "
              "cron-env CLI 層全滅時的結構性捕手；7/9 手動繞道 4 ship 驗證。",
    )


def _fleet_endpoint() -> tuple[str, str]:
    """問 fleet adapter 要 (host, model)。拿不到回 ('', '')（fleet 不在 = 正常降級）。"""
    env_host = os.environ.get("FLEET_ENDPOINT", "")
    if env_host:
        return env_host, os.environ.get("FLEET_MODEL", "")
    script = REPO / "scripts" / "tools" / "lang-sync" / "fleet-endpoint.sh"
    try:
        out = subprocess.run(["bash", str(script), "--export"],
                             capture_output=True, text=True, timeout=60)
        if out.returncode != 0:
            return "", ""
        host = model = ""
        for tok in out.stdout.replace("export ", "").split():
            k, _, v = tok.partition("=")
            if k == "OLLAMA_HOST":
                host = v
            elif k == "OLLAMA_MODEL":
                model = v
        return host, model
    except Exception:
        return "", ""


def build_cascade(cascade_id: str = DEFAULT_CASCADE_ID) -> "TranslationCascade":
    """Build a cascade from a comma-separated backend spec."""
    backends = []
    for spec in cascade_id.split(","):
        spec = spec.strip()
        if not spec:
            continue
        name, _, opt = spec.partition(":")
        name = name.strip()
        opt = opt.strip()

        if name == "codex":
            backends.append(CodexBackend())
        elif name == "openrouter":
            # 不寫死 slug：沒指定就讓 backend 用它自己的 DEFAULT_FREE_MODEL
            # （單一來源，2026-09-09 owl-alpha 下架後建立）
            backends.append(OpenRouterBackend(model=opt) if opt else OpenRouterBackend())
        elif name == "gemini":
            backends.append(GeminiBackend(model=opt) if opt else GeminiBackend())
        elif name == "anthropic":
            # Tier 6（OBSERVER-QUEUE #18，2026-09-05 拍板）— 見 backends/anthropic.py
            backends.append(AnthropicBackend(model=opt) if opt else AnthropicBackend())
        elif name == "gemini-paid":
            # Tier 7（OBSERVER-QUEUE #18，2026-09-05 拍板）— 見 backends/gemini.py GeminiPaidBackend
            backends.append(GeminiPaidBackend(model=opt) if opt else GeminiPaidBackend())
        elif name == "ollama":
            model = opt or os.environ.get("OLLAMA_MODEL") or "qwen3.6:35b-a3b-coding-nvfp4"
            backends.append(OllamaBackend(model=model))
        elif name == "fleet":
            host, fleet_model = _fleet_endpoint()
            if host:
                model = opt or os.environ.get("FLEET_MODEL") or fleet_model or "qwen3.5:35b"
                backends.append(FleetBackend(model=model, host=host))
            else:
                print("⚠️  fleet backend: 無 sovereignty-safe 節點可用 — skipped（正常降級）",
                      file=sys.stderr)
        else:
            print(f"⚠️  Unknown backend in cascade: {spec!r}", file=sys.stderr)

    return TranslationCascade(backends)


# ────────────────── Cascade orchestrator ──────────────────

class CascadeExhausted(Exception):
    """All backends in cascade failed."""


class TranslationCascade:
    """Cascade across multiple backends; first success wins."""

    def __init__(self, backends: list[TranslationBackend]):
        self.backends = backends

    def translate(self, system: str, user: str, **kw) -> tuple[str, str]:
        """Try each backend in order. Return (output, backend_name).

        Skips backends that are:
        - Not available (is_available() = False)
        - In cool-down (in_cooldown() = True)
        - Raised non-recoverable error (refusal / bad output) — but tries next anyway

        Raises CascadeExhausted if all backends failed.
        """
        errors = []
        for backend in self.backends:
            if not backend.is_available():
                errors.append(f"{backend.name}: not available (skipped)")
                continue
            if backend.in_cooldown():
                errors.append(f"{backend.name}: in cool-down (skipped)")
                continue

            try:
                output = backend.translate(system, user, **kw)
                return output, backend.name
            except BackendRateLimited as e:
                errors.append(f"{backend.name}: rate-limited → {e}")
                # cool_down already marked inside backend
                continue
            except BackendRefusal as e:
                errors.append(f"{backend.name}: refused → {e}")
                continue
            except BackendTimeout as e:
                errors.append(f"{backend.name}: timeout → {e}")
                continue
            except BackendUnavailable as e:
                errors.append(f"{backend.name}: became unavailable → {e}")
                continue
            except BackendError as e:
                errors.append(f"{backend.name}: error → {e}")
                continue

        raise CascadeExhausted(
            "All backends in cascade failed:\n" + "\n".join(f"  - {e}" for e in errors)
        )

    def stats_report(self) -> str:
        """One-line per-backend stats summary."""
        lines = []
        for b in self.backends:
            s = b.stats
            lines.append(
                f"  {b.name:35s}  calls={s.calls:3d}  ok={s.successes:3d}  "
                f"429={s.rate_limited:2d}  refuse={s.refusals:2d}  timeout={s.timeouts:2d}"
            )
        return "\n".join(lines)

    def preflight(self, probe_timeout: int = 180, cool_down_seconds: int = 6 * 3600) -> dict:
        """Probe each backend once with a tiny translation before a batch run
        (audit 2026-06-10 D-2).

        為什麼：2026-06-09/10 babel-nightly 兩晚，owl-alpha silent 轉 paid（404）
        + 其他 cloud 連環死，cascade 沒有 preflight，每篇文章都對死模型重撞一次
        timeout，5hr cascade 大半燒在已死的層。preflight 把「模型死了」的發現
        成本從 per-article 降到 per-run。

        Dead/異常 backend → mark_cool_down(6h)，整個 batch run 自動跳過。
        Returns {backend_name: "alive" | "dead: <reason>"}.
        """
        results = {}
        probe_system = "You are a translator. Translate the user text to English. Reply with the translation only."
        # Probe 必須長到能過各 backend 的 anti-truncation 最小輸出守衛
        # （首版用「你好，台灣。」→ 14 char 輸出被全部 backend 的 tiny-output
        # guard 誤殺 — REFLEXES #66 probe 也要用真實 validator 校準）。
        # 內容刻意中性（夜市），不撞 PRC content policy — probe 量的是
        # 「模型活著嗎」不是「sovereignty refusal」（那是 cascade 本體的事）。
        probe_user = (
            "台灣的夜市文化是日常生活的一部分。傍晚過後，攤位陸續點燈，"
            "從蚵仔煎、鹽酥雞到珍珠奶茶，每個攤子都有自己的常客。"
            "對許多人來說，夜市不只是吃東西的地方，也是朋友見面、"
            "家人散步、觀光客認識在地生活的入口。"
        )
        for backend in self.backends:
            if not backend.is_available():
                results[backend.name] = "dead: not available (config/binary missing)"
                continue
            try:
                out = backend.translate(probe_system, probe_user,
                                        max_tokens=64, timeout=probe_timeout)
                if out and out.strip():
                    results[backend.name] = "alive"
                else:
                    backend.mark_cool_down(cool_down_seconds)
                    results[backend.name] = "dead: empty probe output"
            except Exception as e:  # any backend error → freeze for this run
                backend.mark_cool_down(cool_down_seconds)
                results[backend.name] = f"dead: {type(e).__name__}: {str(e)[:120]}"
        return results


# ────────────────── Armored input (哲宇 2026-07-26 directive) ──────────────────
#
# 前處理預防 drift，預防勝於治療：模型看不到的東西就不可能弄壞。單次模型呼叫的
# 整篇式架構不變（兩引擎裁決結果：整篇式贏過 structured-translate.py 的分段多次
# call 架構，見 2026-07-25 pilot），只把「模型會弄壞的東西」先卸下。
#
# 2026-07-26 兩級化（見 reports/armored-input-ab-2026-07-26.md §五結論，12 篇
# zh→vi/ar 真實模型呼叫 A/B 實測）：四個變換依實測結果拆成兩級——
#
#   常駐（無旗標，`armor_pre()`/`armor_post()` 對所有呼叫都跑，見 translate_one）：
#   1. Frontmatter 卸甲 — 只把 title/description/tags 以純文字行送 prompt；
#      passthrough 欄位（同源 verify-translation.py PASSTHROUGH）與
#      translatedFrom/sourceCommitSha/... 全部工具端機械組裝，不進 prompt。
#      實測：passthrough fail 5→0、型別跳脫 WARN 7→0，24 次呼叫零副作用。
#   2. URL token 化 — body（含腳註定義行）內所有 URL 換成 ⟦Un⟧，post 端還原並
#      驗證每個 token 恰好出現一次——缺失或重複＝該篇 fail，報 token 編號
#      （建構性保證：URL 不可能被改壞，只可能整個 token 掉，掉了立刻可測）。
#      實測：200/200 token 零失手、prompt 縮 46.8%。
#
#   仍在 `--armor` 旗標下（洩漏回歸未解，不預設開，見報告 §4.4）：
#   3. 保留區預標註 — 「」『』《》〈〉span（同源 cjk-leak-check.py
#      LEGIT_ZH_SPANS）列進指示區聲明「保留原文，其餘一律翻譯」，不改 body 本身。
#   4. Prompt 減負 — 動態抽 TRANSLATION-<lang>.md 的 TL;DR + ⚠️ 警告子區塊
#      （人名填空型警告等高風險提醒常年掛在這類標題下），取代未帶 --armor 時
#      預設的完整版 canonical guide（load_lang_guide_sections，§1/2/3/6 全段）。

_URL_TOKEN_RE = re.compile(
    # Angle-wrapped target 必須先匹配整段：`(<https://..._(Japan)>)` 是
    # CommonMark 保護含括號 URL 的 canonical 寫法。舊的 `[^)]+` 在第一個
    # `)` 截斷，token 還原後會造出 `[[Title](<](<URL>))`。
    r"(!?\[[^\]]*\]\()(<[^>\s]+>|[^)\s]+)(\))"            # markdown 連結／圖片的 target
    rf"|({_verify_mod.URL_PATTERN})"                       # 裸 URL
    # 裸 URL 的邊界直接借 verify-translation 的 URL_PATTERN（第 11 檢查「URL
    # count」那把尺），裝甲藏起來的跟閘門要數的是同一段字。2026-09-25 前這裡
    # 自己一份 regex、把漢字排除在外（怕 URL 緊貼中文時把後面的散文吞進
    # token），閘門那把尺卻把漢字算進網址：`https://kamatiam.org/棒球如何成為
    # 國球從紅葉的故事說起/` 裝甲只藏到 `kamatiam.org/`，模型看見中文路徑就翻，
    # 閘門判網址改寫——台灣棒球文化十二語、四種模型全部卡在同一條腳註。全庫
    # 13 篇母稿有這種裸網址（維基條目、新聞標題路徑），沒有一處緊貼散文；真的
    # 緊貼時兩把尺一致的結果是 cjk-leak 擋下，跟舊行為（網址閘擋下）同樣是擋，
    # 不會放行壞譯文。全形標點仍在排除清單裡，`陳映真（出生地…）` 照舊切在括號前。
)

_ARTICLE_IMAGE_TARGET_RE = re.compile(
    r"(!\[[^\]]*\]\()(/article-images/[^)\s]+)(\))"
)

_WIKILINK_RE = re.compile(r"\[\[([^\[\]|]+)(?:\|([^\[\]]+))?\]\]")


def materialize_resolved_wikilinks(
    text: str, targets: dict[str, str]
) -> tuple[str, int]:
    """把 prepare-batch 已解析的 wikilink 機械化成 markdown link。

    模型適合翻譯錨字，不適合持有路由。只處理 manifest 明確解析成 `/...` 的
    target；zh-only／缺映射保持原樣，繼續走既有 prompt 與 hard gate。轉成
    markdown 後 target 會立刻由 tokenize_urls() 收進 URL 裝甲，因此模型只看見
    `[來源錨字](⟦Un⟧)`，不可能再把 `[[台灣企業：台積電]]` 幻覺成不存在的
    `[[Taiwanese Enterprise: TSMC]]`。
    """
    if not targets:
        return text, 0
    count = 0

    def repl(m: re.Match) -> str:
        nonlocal count
        target = m.group(1).strip()
        label = (m.group(2) or target).strip()
        url = targets.get(target)
        if not isinstance(url, str) or not url.startswith("/"):
            return m.group(0)
        count += 1
        return f"[{label}]({url})"

    return _WIKILINK_RE.sub(repl, text), count


def tokenize_urls(text: str, lang: str | None = None) -> tuple[str, list[str]]:
    """Transform 2（常駐，2026-07-26 A/B 實測 200/200 token 零失手，見
    reports/armored-input-ab-2026-07-26.md §4.1）：把 text 內所有 URL 換成
    ⟦U1⟧…⟦Un⟧，回傳 (換好的文字, [原始URL, ...])（index i 對應 token
    ⟦U{i+1}⟧，1-indexed 方便直接報號）。對所有呼叫常駐生效，不分 armor 旗標。

    2026-07-27 補站內連結在地化（reports/cross-link-localization-2026-07-27.md
    第二段，防新增）：markdown 連結 target 在進 token 之前，先用
    `cross_link_localizer` 查一次——是站內連結且該語言有譯文，換成譯文網址再
    token 化；查無對應或本來就不是站內連結，原樣 token 化（跟舊行為一致）。
    模型從頭到尾看不到 URL（token 化擋住了），還原回來的已經是對的網址，不必
    再靠 prompt 指示「URL 原樣保留」去猜站內／站外——那句指示對外部引用本來就
    是對的，內部連結現在也對了。`lang=None`（呼叫端沒傳，或 lang 不在翻譯語言
    清單）→ 跳過在地化，等同舊行為，不影響既有呼叫點。"""
    urls: list[str] = []
    index = _xlink.load_index() if lang else None

    def repl(m: re.Match) -> str:
        idx = len(urls) + 1
        token = f"⟦U{idx}⟧"
        if m.group(2) is not None:  # markdown 連結／圖片 target
            url = m.group(2)
            if index is not None:
                new_url, status = _xlink.localize_url(url, lang, index)
                if status == "rewritten" and new_url:
                    url = new_url
            urls.append(url)
            return f"{m.group(1)}{token}{m.group(3)}"
        urls.append(m.group(4))     # 裸 URL
        return token

    tokenized = _URL_TOKEN_RE.sub(repl, text)
    return tokenized, urls


def tokenize_article_images(text: str) -> tuple[str, list[str]]:
    """Fallback 仍機械保護站內快取圖片，但不重新啟用整套 URL 裝甲。

    URL token 遺失後的第二次翻譯必須換路，外部 URL 因此維持原樣；然而
    `/article-images/...` 是已下載、由 image-health 驗證的站內資產，不是可讓
    模型改寫的翻譯內容。2026-07-29 五篇隔離樣本一致在 fallback 把這些 target
    幻覺成外站或壞網址。這裡只 token 化狹義的 markdown image target，沿用
    `restore_urls()` 的恰好一次 hard gate；其餘連結與裸 URL 完全不碰。
    """
    urls: list[str] = []

    def repl(m: re.Match) -> str:
        urls.append(m.group(2))
        return f"{m.group(1)}⟦U{len(urls)}⟧{m.group(3)}"

    return _ARTICLE_IMAGE_TARGET_RE.sub(repl, text), urls


def restore_urls(text: str, urls: list[str]) -> tuple[str, list[int]]:
    """還原 URL token，回傳 (還原後文字, 有問題的 token 編號列表)。

    每個 token 在還原前必須「恰好出現一次」——0 次（模型漏抄）或 ≥2 次
    （模型複製貼上）都記錄編號，呼叫端據此判該篇 fail。對所有呼叫常駐生效。"""
    bad: list[int] = []
    for i, url in enumerate(urls, start=1):
        token = f"⟦U{i}⟧"
        count = text.count(token)
        if count != 1:
            bad.append(i)
            continue
        text = text.replace(token, url, 1)
    return text, bad


# 模型照指示把標籤寫成一行「逗號分隔」，但阿拉伯文用阿拉伯逗號「،」、日文用頓號「、」。
# 只切 ASCII 逗號的話整串變成一個標籤：2026-09-27 盤點 ar 438 篇、ja 14 篇的 tags 是
# 一個字串包著整張清單（其餘十語 0），站上的標籤頁因此多出一堆「甲، 乙، 丙」。
TAG_SEPARATORS = re.compile(r"\s*[,，、،;；]\s*")


def zh_tag_count(zh_fm: dict) -> int:
    tags = zh_fm.get("tags") or []
    if isinstance(tags, str):
        return len([t for t in tags.split(",") if t.strip()])
    return len(tags)


def split_tags(tags_raw: str, n_zh: int) -> list[str]:
    """切模型回的標籤行，數量要跟 zh 一樣：依序試 ASCII 逗號、寬分隔符、整行不切，
    第一個數量對得上的就用（zh 只有一個標籤時，標籤裡帶的逗號是內容，不拆）；
    都對不上才取數量最接近的切法，同樣接近時留 ASCII 版（舊行為）。"""
    ascii_split = [t.strip() for t in tags_raw.split(",") if t.strip()]
    wide = [t.strip() for t in TAG_SEPARATORS.split(tags_raw) if t.strip()]
    for cand in (ascii_split, wide, [tags_raw.strip()]):
        if len(cand) == n_zh:
            return cand
    return min((ascii_split, wide), key=lambda s: abs(len(s) - n_zh))


def disarm_frontmatter(zh_fm: dict) -> str:
    """Transform 1（常駐，2026-07-26 A/B 實測 passthrough fail 5→0、型別跳脫
    WARN 7→0，見 reports/armored-input-ab-2026-07-26.md §4.2）：只把
    title/description/tags 轉成純文字行（`TITLE:`/`DESC:`/`TAGS:`）回傳，供
    prompt 使用。passthrough 欄位（同源 verify-translation.py PASSTHROUGH）與
    sync placeholder（translatedFrom/sourceCommitSha/...）完全不進這個區塊——
    留給 armor_post() 用工具機械組裝（含撇號雙寫跳脫），模型看不到就不可能
    憑空改寫或型別漂移。對所有呼叫常駐生效，不分 armor 旗標。"""
    title = zh_fm.get("title")
    desc = zh_fm.get("description")
    tags = zh_fm.get("tags") or []
    if isinstance(tags, str):
        tags = [t.strip() for t in tags.split(",") if t.strip()]

    lines: list[str] = []
    if title is not None:
        lines.append(f"TITLE: {title}")
    if desc is not None:
        lines.append(f"DESC: {desc}")
    if tags:
        lines.append(f"TAGS: {', '.join(str(t) for t in tags)}")
    # 2026-09-22：imageAlt 是讀者面對的替代文字，verify 第 13 檢查把它跟 title/description
    # 同列不得留原文；此前裝甲路徑把它當 passthrough 機械複製 zh，zh 有 imageAlt 的 48 篇在
    # 整篇引擎永遠過不了閘（run 98122 一夜 51 次）。structured／patch 09-21 已修，這是第三條。
    alt = zh_fm.get("imageAlt")
    if alt:
        lines.append(f"ALT: {alt}")
    return "\n".join(lines)


def _reserved_spans(body: str, max_examples: int = 30) -> list[str]:
    """掃「」『』《》〈〉span（同源 cjk-leak-check.py LEGIT_ZH_SPANS），去重取樣，
    供 prompt 指示區列舉「保留原文」清單。不改 body 本身。"""
    seen: list[str] = []
    for rx in LEGIT_ZH_SPANS:
        for m in rx.finditer(body):
            span = m.group(0)
            if span not in seen:
                seen.append(span)
            if len(seen) >= max_examples:
                return seen
    return seen


def load_lang_guide_tldr(lang: str, max_chars: int = 4000) -> str:
    """armor 專用輕量指示區——只抽 `## TL;DR` 區塊 + 全文任何 `### ⚠️` 警告子
    區塊（人名填空型警告等高風險提醒常掛在這類標題下，見 2026-07-25
    TRANSLATION-vi.md/TRANSLATION-ar.md §2 案例）。

    比既有 openrouter-translate.py 的 load_lang_guide_sections()（TL;DR+§1/2/3/6，
    上限 11000 字）更薄——armor 的 body 已靠 URL token 化大幅縮短，指示區沒必要
    吃滿；prompt 減負是 armor 四個變換的最後一個。

    切割用 `#{2,3}` 邊界（不只 `###`）——「### 警告」子區塊若不在下一個 `##`
    章節前停下，會把後面整章節都吞進去（曾經的 bug，切割邊界必須含 ## 才會停）。
    """
    guide = REPO / "docs/editorial/per-language" / f"TRANSLATION-{lang}.md"
    if not guide.exists():
        return ""
    text = guide.read_text(encoding="utf-8")
    keep = []
    for block in re.split(r"\n(?=#{2,3}\s)", text):
        head = block.lstrip()
        if head.startswith("## TL;DR") or head.startswith("### ⚠️"):
            keep.append(head.strip())
    if not keep:
        return ""
    out = "\n\n".join(keep)
    if len(out) > max_chars:
        out = out[:max_chars] + f"\n…(節錄；完整 canonical 在 docs/editorial/per-language/TRANSLATION-{lang}.md)"
    return out


def armor_pre(article: dict, zh_content: str, lang: str, armor: bool = False,
              tokenize: bool = True) -> tuple[str, str, dict]:
    """輸入前處理：組出 system/user prompt + 還原用的 ctx。

    2026-07-26 兩級化（reports/armored-input-ab-2026-07-26.md §五結論）：
    Transform 1（frontmatter 卸甲）+ Transform 2（URL token 化）對「所有」呼叫
    常駐生效，不看 `armor` 參數——這是 default 路徑跟 `--armor` 路徑共用同一套
    實作的地方。`armor=True` 只再疊加 Transform 3（保留區預標註）+ Transform 4
    （prompt 減負 TL;DR，取代預設的完整版 canonical guide）——這兩層洩漏回歸
    未解，維持在 --armor 旗標下。

    丟出 ValueError 代表 zh frontmatter 解析失敗——呼叫端視為翻譯失敗（跟其餘
    hard gate 同待遇，不落盤，不是 armor 專屬的例外路徑）。
    """
    zh_fm, body = parse_zh_frontmatter(zh_content)

    # ---- Transform 1（常駐）: frontmatter 卸甲 ----
    fm_prompt_block = disarm_frontmatter(zh_fm)

    # prepare-batch 已解析成功的 wikilink 先機械化成 markdown link。模型只翻
    # 錨字，路由隨即交給 URL token 持有；未解析的 zh-only wikilink 保守不動。
    wikilink_targets = article.get("wikilink_targets") or {}
    body, wikilinks_materialized = materialize_resolved_wikilinks(
        body, wikilink_targets
    )
    # 2026-09-22：manifest 沒解析到的（zh-only／缺映射）不再「保守不動」交給 prompt——
    # 模型會把括號裡翻掉、括號留著，撞 wikilink-target 硬閘。改用三引擎共用的
    # resolve_wikilinks：有譯文就連結化，沒有就降純文字。
    body, _wl_linked, _wl_plain = _xlink.resolve_wikilinks(body, lang)

    # ---- Transform 2（常駐）: URL token 化（body 含腳註定義行）+ 站內連結在地化 ----
    # tokenize=False 是 armor 還原失敗後的 fallback 路徑（2026-07-27）：一般 URL
    # 原樣送進模型，不換成 ⟦U1⟧。實測「重試同一條裝甲路徑」是負面結果（遺失量
    # 2→56），因為佔位標記本身就是模型想處理掉的異物，講得越明白越去動它。
    # 換路才有意義；一般 URL 正確性改由既有 verify 的 URL 數量檢查把關。
    # 唯一例外是 `/article-images/...`：它是站內受管資產，五篇實績證明裸送會被
    # 幻覺成外站 URL，所以第二條路仍以狹義 token 保護，hard gate 不放寬。
    if tokenize:
        tokenized_body, url_list = tokenize_urls(body, lang)
    else:
        tokenized_body, url_list = tokenize_article_images(body)

    lang_name = LANG_NAMES.get(lang, lang)

    # Wikilink 對照表——不算四個變換之一，是修補：frontmatter 卸甲砍掉整段
    # 「manifest entry JSON」時，連同 wikilink_targets 一起砍掉了，body 裡的
    # [[X]] 因此沒有目標可查（2026-07-26 A/B 實測發現：ar/rural-education-in-taiwan
    # 兩篇帶 [[X]] 的文章，卸甲版 [[X]] 原封不動留在正文，舊版正確解析成
    # 「翻譯錨字 + 中文括號」或真連結）。frontmatter 卸甲現在常駐兩條路徑都會
    # 砍掉那段 JSON，所以這個補丁也常駐兩條路徑都補回，維持跟舊版同等資訊量。
    wikilink_note = ""
    if wikilink_targets:
        wl_lines = [f"{k} → {v}" for k, v in wikilink_targets.items()]
        wikilink_note = (
            "\n\nWIKILINK TARGETS — resolve every `[[X]]` in the body using this "
            "mapping: if the target starts with `/`, turn `[[X]]` into a translated "
            "markdown link `[translated X](target)`; if the target says "
            "\"(zh only …)\", turn `[[X]]` into plain translated text followed by "
            "the original zh-TW in parentheses, e.g. `translated gloss (X)`. Never "
            "leave a raw `[[X]]` in the output.\n" + "\n".join(wl_lines) + "\n"
        )

    reserved_count = 0
    if armor:
        # ---- Transform 3（--armor 旗標）: 保留區預標註 ----
        reserved = _reserved_spans(body)
        reserved_count = len(reserved)
        reserved_note = ""
        if reserved:
            sample = "、".join(reserved)
            reserved_note = (
                "\n\nRESERVED SPANS — these must stay EXACTLY as the original zh-TW "
                "text (do not translate them), translate everything else in the body:\n"
                f"{sample}\n"
            )
        # ---- Transform 4（--armor 旗標）: prompt 減負（guide TL;DR + ⚠️ 子區塊）----
        guide_block = load_lang_guide_tldr(lang)
        guide_heading = (
            f"\n\n═══ {lang_name} CANONICAL GUIDE — TL;DR (sovereignty-critical, "
            "overrides your defaults) ═══\n"
        )
    else:
        # 未帶 --armor：guide 維持既有完整版（§1/2/3/6 + TL;DR，上限 11000 字，
        # 同源 openrouter-translate.py load_lang_guide_sections）——「prompt 減負」
        # 是仍在旗標後的 transform 4，不預設縮減。
        reserved_note = ""
        guide_block = _or_mod.load_lang_guide_sections(lang)
        guide_heading = (
            f"\n\n═══ MANDATORY {lang_name} CANONICAL GUIDE — sovereignty "
            "(overrides your defaults) ═══\n"
        )

    system = f"""You are a translator for Taiwan.md, an open-source curated knowledge base about Taiwan.

Translate zh-TW content to {lang_name}. This input has been pre-processed so you
never see the parts of the source most likely to get corrupted in translation:
- Frontmatter: you receive ONLY the translatable plain-text lines (TITLE/DESC/TAGS
  below). Do NOT invent, add, or guess any other frontmatter field — a tool
  assembles the rest mechanically after your reply.
- URLs (in markdown links, footnote sources, and bare in prose) have been replaced
  with short tokens shaped like ⟦U3⟧. Copy every such token BYTE-FOR-BYTE, exactly
  once, in the same relative position. NEVER translate, alter, remove, duplicate,
  or re-order a ⟦Un⟧ token — treat it as an opaque, untouchable id.
{reserved_note}{wikilink_note}
Rules:
1. 精準/專業/快速：factual fidelity, academic register, no machine-translation tells
2. 不預設篇幅：length follows source (no summarization, no over-expansion)
3. Preserve verbatim: core tension, anchors (people/dates/places/numbers), `> blockquote` quotes
4. Reframe cultural common-knowledge for {lang_name} readers
5. Footnotes `[^N]`: keep numbering unchanged, translate the source title/description
   text, NEVER touch the ⟦Un⟧ URL tokens inside them
6. Unfamiliar proper names: transliterate, do NOT substitute a more famous name you
   already know — append the original zh-TW characters in parentheses on first use
7. Fenced block language ids are SYNTAX, not prose. A fence opening like ```tw-bars
   or ```tw-versus must be copied byte-for-byte in every language — the `tw-xxx`
   part is a renderer keyword, never a word to translate or "correct". Translate
   only the lines INSIDE the block. (Observed corruption: tw-bars → tw-vars,
   tw-pyramid → tw-pylamid, tw-multiples → tw-multiable; the renderer does not
   recognise those and silently degrades the chart into a raw code block.)
   Inside a ```tw-article block each line is `category/slug` (a site path,
   optionally followed by ` | one-line summary`): copy the path part BEFORE the
   `|` byte-for-byte (it is a zh-TW file path — do NOT translate or transliterate
   it); translate only the summary text after the `|` if present.
8. {_structured_mod.money_rule(lang_name)}

Output format — EXACTLY these marked sections, in this order (===ALT=== only when
an ALT line is given in the frontmatter fields; otherwise omit that section):
===TITLE===
<translated title, one line>
===DESC===
<translated description, one line>
===TAGS===
<translated tags, comma-separated, one line>
===ALT===
<translated image alt text, one line — only if ALT was given>
===BODY===
<translated body markdown — heading/list/footnote structure preserved, ⟦Un⟧ tokens
preserved verbatim, reserved spans kept in original zh-TW>

Output ONLY those marked sections, nothing else. No commentary, no code fence,
no reasoning/chain-of-thought, no text before ===TITLE=== or after the body."""

    if guide_block:
        system += guide_heading + guide_block

    user = f"""Translate this zh-TW article to {lang_name}.

**Frontmatter fields to translate**:
```
{fm_prompt_block}
```

**Body (URLs tokenized — translate the prose, keep every ⟦Un⟧ token untouched)**:
```markdown
{tokenized_body}
```

Output the ===TITLE===/===DESC===/===TAGS===/(===ALT===)/===BODY=== sections as instructed."""

    ctx = {"zh_fm": zh_fm, "url_list": url_list, "reserved_count": reserved_count,
           "wikilinks_materialized": wikilinks_materialized,
           "prompt_chars": len(system) + len(user)}
    return system, user, ctx


_ARMOR_SECTION_RE = re.compile(
    r"=+\s*TITLE\s*=+\s*(?P<title>.*?)\s*"
    r"=+\s*DESC\s*=+\s*(?P<desc>.*?)\s*"
    r"=+\s*TAGS\s*=+\s*(?P<tags>.*?)\s*"
    r"(?:=+\s*ALT\s*=+\s*(?P<alt>.*?)\s*)?"
    r"=+\s*BODY\s*=+\s*(?P<body>.*)",
    re.DOTALL | re.IGNORECASE,
)


def armor_post(raw_output: str, ctx: dict, article: dict) -> tuple[Optional[str], Optional[str]]:
    """輸出後處理：把模型的四段回覆機械組回完整 `---frontmatter---\\n\\nbody`
    檔案內容——`armor_pre()` 常駐兩層卸甲（frontmatter/URL）用的輸出格式對
    default 路徑與 --armor 路徑相同，這裡也是共用同一套實作，好讓既有 hard
    gate 原樣適用。

    Returns (assembled_text, error)。error 非 None 時 assembled_text 是 None，
    呼叫端視為該次翻譯失敗，不落盤（跟既有 hard gate 同一套失敗語意）。
    """
    text = raw_output.strip()
    if text.startswith("```"):
        text = re.sub(r"^```[a-zA-Z]*\n?", "", text, count=1)
        if text.endswith("```"):
            text = text[:-3]
        text = text.strip()

    m = _ARMOR_SECTION_RE.search(text)
    if not m:
        # 診斷儀器（2026-07-31）：光說「缺 marker」看不出模型實際回了什麼——
        # 拒答句、道歉、摘要、還是 marker 拼錯了一個等號，處置完全不同。
        # 把回覆頭尾放進錯誤訊息，失敗自己說明自己（同 backends/ollama.py
        # empty/tiny 診斷的姊妹刀）。
        head = text[:200].replace("\n", "⏎")
        tail = text[-100:].replace("\n", "⏎") if len(text) > 300 else ""
        return None, (f"armor: model output missing ===TITLE===/===DESC===/===TAGS===/===BODY=== "
                      f"markers (len={len(text)} | head: {head!r}"
                      + (f" | tail: {tail!r}" if tail else "") + ")")

    title = m.group("title").strip()
    desc = m.group("desc").strip()
    tags_raw = m.group("tags").strip()
    alt_out = (m.group("alt") or "").strip()
    body_out = m.group("body")
    if ctx["zh_fm"].get("imageAlt") and not alt_out:
        # zh 有 imageAlt 而模型沒交 ===ALT===：照抄 zh 一定被 verify 第 13 檢查擋下（同一篇
        # 白燒一次），直接在這裡判失敗讓 cascade 換模型重試。
        return None, "armor: zh has imageAlt but model output has no ===ALT=== section"

    # ---- URL token 還原 + 完整性驗證 ----
    body_restored, bad_tokens = restore_urls(body_out, ctx["url_list"])
    if bad_tokens:
        bad_ids = ", ".join(f"U{i}" for i in bad_tokens[:10])
        return None, f"armor: {len(bad_tokens)} URL token(s) missing/duplicated after restore: {bad_ids}"

    # ---- Frontmatter 組裝（passthrough 機械複製，單引號＋撇號雙寫跳脫）----
    zh_fm = ctx["zh_fm"]
    tags_out = split_tags(tags_raw, zh_tag_count(zh_fm)) if tags_raw else []

    lines: list[str] = []
    for key in zh_fm.keys():
        if key == "title":
            lines.append(f"title: {yaml_single_quote(title)}")
        elif key == "description":
            lines.append(f"description: {yaml_single_quote(desc)}")
        elif key == "tags":
            if tags_out:
                lines.append("tags:")
                lines.append("  [")
                for t in tags_out:
                    lines.append(f"    {yaml_single_quote(t)},")
                lines.append("  ]")
            else:
                lines.append("tags: []")
        elif key == "imageAlt" and alt_out:
            lines.append(f"imageAlt: {yaml_single_quote(alt_out)}")
        else:
            # PASSTHROUGH_FIELDS（同源 verify-translation.py）+ subcategory +
            # 任何未明確歸類欄位——一律機械複製 zh 值，寧可過度保留也不靜默丟欄位。
            lines.append(_structured_mod.render_field(key, zh_fm[key]))

    placeholder = article.get("frontmatter_placeholder", {}) or {}
    for key, value in placeholder.items():
        lines.append(f"{key}: {yaml_single_quote(value)}")

    fm_block = "\n".join(lines)
    body_clean = body_restored.strip("\n")
    assembled = f"---\n{fm_block}\n---\n\n{body_clean}\n"
    return assembled, None


# ────────────────── Partial-translation hard gate ──────────────────
#
# reports/armored-input-ab-2026-07-26.md §五「比 armor on/off 這個問題本身更急
# 的發現」：reasoning 模型翻長文常「翻到一半放棄、剩餘 zh 原文照抄」，24 次真實
# 呼叫裡多篇這樣的輸出全部回報成功——現有 hard gate（frontmatter fence／
# footnote 數／output-language）只查結構，不查「body 是不是真的翻完了」。
# cjk-leak-check.py 是唯一抓到它的工具，但那是下游 batch/dispatcher 才跑的獨立
# 巡邏，半成品先落盤浪費一整輪呼叫才被抓到。本閘把攔截點前移到落盤前。

_MD_LINK_RE = re.compile(r"\[[^\]]*\]\([^)]*\)")   # markdown 連結/圖片 target
_BARE_URL_RE = re.compile(r"https?://\S+")          # 裸 URL
_CJK_CHAR_RE = re.compile(r"[一-鿿]")                # 單字元 CJK Han range
_CJK_SCRIPT_LANGS = {"ja", "ko"}                     # 合法大量漢字，此訊號不適用


def _strip_legit_zh(text: str) -> str:
    """跟 cjk-leak-check.py `scan_file()` 的 NON_CJK_SCRIPT_LANGS 分支同一把尺
    （LEGIT_ZH_SPANS 命名 gloss/作品名/短引語 + markdown 連結 target + 裸
    URL）——同源不重寫，這裡只是把三段 sub() 抽成獨立函式方便重複呼叫。剝掉這些
    合法保留區後才計 CJK 佔比，避免引用標題／wikilink 誤觸發。"""
    stripped = text
    for rx in LEGIT_ZH_SPANS:
        stripped = rx.sub("", stripped)
    stripped = _MD_LINK_RE.sub("", stripped)
    stripped = _BARE_URL_RE.sub("", stripped)
    return stripped


def detect_partial_translation(body: str, lang: str) -> Optional[tuple[int, str, float]]:
    """段落級「翻一半、剩下原文照抄」偵測。按空行切段，每段剝除合法保留區
    （見 `_strip_legit_zh`）後計 CJK 字元佔比；任一段 CJK 佔比 >50% 且剝除後
    長度 >80 字元 → 判定該段未翻譯。ja/ko 目標語言合法大量漢字（kanji/hanja），
    跟 cjk-leak-check.py 同一分流判斷，豁免此訊號。

    Returns (1-indexed 段落編號, 段落開頭 30 字, CJK 佔比) 或 None（乾淨）。
    """
    if lang in _CJK_SCRIPT_LANGS:
        return None
    for idx, para in enumerate(re.split(r"\n\s*\n", body), 1):
        stripped = _strip_legit_zh(para)
        length = len(stripped)
        if length <= 80:
            continue
        ratio = len(_CJK_CHAR_RE.findall(stripped)) / length
        if ratio > 0.5:
            return idx, para.strip()[:30], ratio
    return None


def detect_cjk_leak(text: str, lang: str) -> Optional[str]:
    """Run the canonical downstream leak rule before writing the candidate.

    The older paragraph-ratio guard only catches a mostly-Chinese paragraph.
    Nemotron commonly leaves short Chinese clauses embedded in otherwise
    translated prose; those pass the ratio guard, get written, and are then
    quarantined by the dispatcher.  Reuse cjk-leak-check's exact zones and
    markers here so one bounded retry can happen inside the same model call
    workflow, without weakening the downstream gate.

    書目區豁免（OBSERVER-QUEUE #23 選 A，2026-09-05）：babel 620 筆裡 251 筆
    敗在同一處——參考資料區沒翻的中文來源標題（`深度訪談`、`天下換日線`），
    是失敗第一大宗。哲宇拍板：書目區（腳註定義行＋參考資料／延伸閱讀／圖片
    來源等標題到檔尾，見 cjk-leak-check.find_bibliography_start）的**正體**
    來源標題放行——讀者要靠它找到原文出處；**簡體**仍擋，含「维基百科」
    「国家文化记忆库」這類已經悄悄漏進 knowledge/ru、knowledge/ar 的簡體來源
    （見 cjk-leak-check.SIMPLIFIED_ONLY_CHARS 校準紀錄）。三種判定訊息各自
    有獨立的字樣，不共用同一種長相（REFLEXES #38／#85）：
      - 「正文 CJK leak」／「正文 zh-only marker」→ 原本就會擋，行為不變
      - 「書目區簡體殘留」→ 新增，book區內命中簡體字集就擋
      - 書目區內的正體來源標題 → 不會出現在回傳訊息裡（就是放行本身）
    """
    raw = _cjkleak_mod.drop_frontmatter(text)
    bib_start = _cjkleak_mod.find_bibliography_start(raw, lang)
    main_raw, bib_raw = raw[:bib_start], raw[bib_start:]

    if lang in _cjkleak_mod.NON_CJK_SCRIPT_LANGS:
        main_scan = _cjkleak_mod.strip_legit_zones(main_raw)
        match = _cjkleak_mod.CJK_RUN_RE.search(main_scan)
        if match:
            return f"正文 CJK leak {match.group(0)!r}"
    else:
        scan = _cjkleak_mod.strip_legit_zones(raw)
        for marker in _cjkleak_mod.ZH_ONLY_MARKERS:
            if marker in scan:
                return f"正文 zh-only marker {marker!r}"

    simplified = _cjkleak_mod.detect_simplified_residue(bib_raw, lang)
    if simplified:
        return f"書目區簡體殘留: {simplified}"
    return None


# ────────────────── Per-article driver ──────────────────

def translate_one(article: dict, lang: str, cascade: TranslationCascade,
                  dry_run: bool = False, armor: bool = False,
                  ) -> tuple[bool, Optional[str], Optional[str]]:
    """Translate one article via the cascade.

    2026-07-26 兩級化（reports/armored-input-ab-2026-07-26.md）：`armor_pre()` /
    `armor_post()` 現在對所有呼叫都跑（frontmatter 卸甲 + URL token 化常駐生效，
    A/B 實測完勝、零副作用），default 路徑與 `--armor` 路徑共用同一套實作，不再
    分岔成兩套 prompt-building 邏輯。`armor=True` 只控制 armor_pre() 內部是否
    再疊加保留區預標註 + prompt 減負 TL;DR 這兩個仍在驗證中的變換（洩漏回歸
    未解，不預設開）。

    Returns (success, error_msg, backend_used).
    """
    zh_path = article["zh_path"]
    out_path = REPO / article["en_path"]

    zh_full = KNOWLEDGE / zh_path
    if not zh_full.exists():
        return False, f"zh source not found: {zh_path}", None

    zh_content = zh_full.read_text(encoding="utf-8")

    try:
        system, user_msg, armor_ctx = armor_pre(article, zh_content, lang, armor=armor)
    except ValueError as e:
        return False, f"prompt pre-process failed: {e}", None

    if dry_run:
        print(f"DRY RUN: would translate {zh_path} → {out_path}" + (" [armor]" if armor else ""))
        return True, None, "dry-run"

    # Partial-translation gate 專屬重試（見 detect_partial_translation()）：其餘
    # hard gate 失敗維持原行為，立即 return（下游 batch/dispatcher 下一輪再重試，
    # 不在這裡加重試邏輯）。max_attempts=2 = 1 原譯 + 1 次帶警告重試，跟其餘
    # cascade/backend 層的重試機制（見 openrouter-translate.py call_openrouter）
    # 同一種「有限次數、失敗即報」風格，不無限重試燒 API。
    max_attempts = 2
    last_partial_err = None
    backend_used = None
    for attempt in range(1, max_attempts + 1):
        try:
            output, backend_used = cascade.translate(system, user_msg)
        except CascadeExhausted as e:
            return False, str(e), None

        output, post_err = armor_post(output, armor_ctx, article)
        if post_err:
            # URL token 遺失／重複是「模型沒照做」而非「譯文有問題」，跟
            # partial-translation 同一種可重試失敗——2026-07-27 產線實測它是
            # exit=1 的唯一成因（9/9，跨八語、本地雲端都中，單篇最多丟 84 個），
            # 佔全部失敗 34%，把通過率從 58% 壓到 16%。判準（restore_urls 要求
            # 恰好一次）維持嚴格，改的只是終局處置：先給一次帶警告的重試，
            # 用完額度才報失敗。防護的成功率不該直接變成產線的通過率。
            if "URL token" in post_err and attempt < max_attempts:
                # 換路，不是重走。2026-07-27 實測：帶警告重試同一條裝甲路徑
                # 讓遺失量不減反增（2→56、28→22、2→3）——佔位標記本身就是模型
                # 想「處理掉」的異物，把它講得越明白反而越去動它。所以 fallback
                # 是把一般 URL 原樣送進去（tokenize=False），URL 正確性改由既有
                # verify 的 URL 數量檢查把關，不再靠模型保住標記。站內受管圖片
                # `/article-images/...` 仍以狹義 token 保護，避免模型改寫資產。
                print(f"   ⚠️  {post_err} — fallback 非裝甲路徑重譯 "
                      f"(attempt {attempt + 1}/{max_attempts})")
                system, user_msg, armor_ctx = armor_pre(
                    article, zh_content, lang, armor=armor, tokenize=False)
                continue
            return False, f"{post_err} via {backend_used} — not saved", backend_used

        # Frontmatter integrity hard gate (2026-07-10 P0-3): 任一 backend（含 fleet raw
        # 輸出）frontmatter 破損就不落盤——缺開頭 fence / 找不到收尾 fence / YAML 不
        # parse（引號未跳脫家族 bug）。7/10 SLP ko 三洞案例：fleet 產出缺 fence +
        # description 內雙引號未跳脫，靠 pre-commit 才攔住；本閘把攔截點前移到寫檔前，
        # 半成品不再落 working tree。
        if not output.startswith("---"):
            return False, f"frontmatter missing opening fence via {backend_used} — not saved", backend_used
        fm_end = output.find("\n---", 3)
        if fm_end == -1:
            return False, f"frontmatter missing closing fence via {backend_used} — not saved", backend_used
        try:
            fm = yaml.safe_load(output[3:fm_end])
            if not isinstance(fm, dict) or "title" not in fm:
                raise ValueError("frontmatter not a mapping with title")
        except Exception as e:
            return False, f"frontmatter YAML broken via {backend_used}: {str(e)[:80]} — not saved", backend_used

        # Footnote completeness hard gate (2026-06-06): reject truncated/incomplete output.
        # The cascade model can hit its token limit and cut off the article tail (image
        # credits + footnote definitions), silently de-citationing the translation. If the
        # output has fewer [^n]: definitions than the source, don't save it — return failure
        # so the article stays stale and is retried (possibly by a different backend) next run.
        fn_def_re = re.compile(r"(?m)^\[\^[^\]]+\]:")
        src_fns = len(fn_def_re.findall(zh_content))
        out_fns = len(fn_def_re.findall(output))
        if src_fns > 0 and out_fns < src_fns:
            return False, f"footnote loss ({src_fns}→{out_fns} defs) via {backend_used} — incomplete, not saved", backend_used

        # Output-language hard gate (2026-07-19 讀者揭露 68 檔「宣稱已譯實為英文」後補上）：
        # 前面所有 gate 只查結構（frontmatter/footnote/size），從不查輸出真的是目標語言。
        # 一篇語意流暢、footnote 完整、frontmatter 合法的英文假翻譯會直接通過存活到 commit
        # ——ja/ko/fr/es 累計 68 檔就是這樣漏網的。用 script-presence-check 同一套判準即時擋。
        body_only = output[fm_end + 4:] if fm_end != -1 else output
        lang_result = check_script_presence(body_only, lang)
        if lang_result:
            verdict, detail = lang_result
            return False, f"output-language gate [{verdict}] via {backend_used}: {detail} — not saved", backend_used

        # Exact cjk-leak gate before落盤.  The dispatcher has always enforced
        # this after translate.py returns, but at that point the candidate can
        # only be quarantined.  Keeping the same SSOT here turns short embedded
        # leak spans into one bounded, explicitly warned retry.
        cjk_leak = detect_cjk_leak(output, lang)
        if cjk_leak:
            if attempt < max_attempts:
                user_msg = user_msg + (
                    "\n\n⚠️ RETRY WARNING: your previous output still contained "
                    f"untranslated Chinese text ({cjk_leak}). Translate every "
                    "remaining Chinese phrase into the target language. Do not "
                    "copy Chinese prose into the translation."
                )
                continue
            return False, f"cjk-leak ({cjk_leak}) via {backend_used} — not saved", backend_used

        # Partial-translation hard gate (2026-07-26 armored-input-ab §五「更急的發
        # 現」)：前面所有 gate 只查結構，從不查 body 是不是真的翻完了——reasoning
        # 模型翻長文常「翻到一半放棄、剩餘 zh 原文照抄」，這種輸出結構全合法（frontmatter
        # 合法／footnote 數對／目標語 script 判定過關，因為開頭那段真的有翻），24 次
        # A/B 呼叫裡有多篇這樣直接回報成功，靠下游 cjk-leak-check 巡邏才抓到。
        partial = detect_partial_translation(body_only, lang)
        if partial:
            para_idx, preview, ratio = partial
            last_partial_err = f"partial-translation: para {para_idx}, {ratio * 100:.0f}% CJK"
            if attempt < max_attempts:
                user_msg = user_msg + (
                    f"\n\n⚠️ RETRY WARNING: your previous output left paragraph "
                    f"{para_idx} untranslated (original zh-TW copied verbatim instead "
                    "of being translated). You MUST translate the ENTIRE article body "
                    "this time — do not stop partway through and do not skip any "
                    f"paragraph. That paragraph started with: \"{preview}…\""
                )
                continue
            return False, f"{last_partial_err} via {backend_used} — not saved", backend_used

        out_path.parent.mkdir(parents=True, exist_ok=True)
        out_path.write_text(output + "\n", encoding="utf-8")

        size = out_path.stat().st_size
        if size < 1000:
            try:
                out_path.unlink()
            except Exception:  # noqa: BLE001
                pass
            return False, f"output too small ({size} bytes) — file removed", backend_used

        return True, None, backend_used

    return False, f"{last_partial_err} — exhausted retries via {backend_used}", backend_used


# ────────────────── CLI ──────────────────

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--group", help="group manifest JSON (created by prepare-batch.py)")
    ap.add_argument("--zh-path", help="single zh path to translate (use with --lang)")
    ap.add_argument("--lang", help="target lang (required for --zh-path mode)")
    ap.add_argument("--cascade", default=DEFAULT_CASCADE_ID,
                    help=f"comma-separated backend spec (default: {DEFAULT_CASCADE_ID})")
    ap.add_argument("--max-articles", type=int, help="cap on articles processed")
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--health-check", action="store_true",
                    help="probe each backend with a tiny translation, print table, exit "
                         "(audit 2026-06-10 D-2)")
    ap.add_argument("--no-preflight", action="store_true",
                    help="skip the automatic batch-mode preflight probe")
    ap.add_argument("--armor", action="store_true", default=False,
                    help="裝甲輸入前處理進階層（哲宇 2026-07-26 directive，2026-07-26 兩級化）："
                         "frontmatter 卸甲 + URL token 化已常駐生效於所有呼叫，不受此旗標控制；"
                         "本旗標只再疊加保留區預標註 + prompt 減負 TL;DR（洩漏回歸未解）。單次呼叫"
                         "架構不變。預設關。")
    args = ap.parse_args()

    cascade = build_cascade(args.cascade)

    print(f"📋 Cascade: {' → '.join(b.name for b in cascade.backends)}")
    print(f"   Available: {[b.name for b in cascade.backends if b.is_available()]}")

    if args.health_check:
        print("🩺 Preflight health-check (tiny probe per backend)...")
        results = cascade.preflight()
        dead = 0
        for name, verdict in results.items():
            icon = "✅" if verdict == "alive" else "💀"
            if verdict != "alive":
                dead += 1
            print(f"   {icon} {name:35s} {verdict}")
        print(f"🩺 {len(results) - dead}/{len(results)} alive")
        sys.exit(0 if dead < len(results) else 1)

    # Batch (--group) 模式 default 跑 preflight：死模型整 run 冷凍一次，
    # 不讓每篇文章各撞一次 timeout（2026-06-09/10 babel 5hr 教訓）。
    if args.group and not args.no_preflight and not args.dry_run:
        print("🩺 Batch preflight...")
        for name, verdict in cascade.preflight().items():
            icon = "✅" if verdict == "alive" else "💀 frozen 6h:"
            print(f"   {icon} {name:35s} {verdict if verdict != 'alive' else ''}")

    if args.group:
        group_path = Path(args.group).resolve()
        group = json.loads(group_path.read_text(encoding="utf-8"))
        articles = group.get("articles", group) if isinstance(group, dict) else group
        if args.max_articles:
            articles = articles[: args.max_articles]
        lang = args.lang or group_path.parent.name

    elif args.zh_path:
        if not args.lang:
            print("❌ --lang required for --zh-path mode", file=sys.stderr)
            sys.exit(2)
        # Build a minimal article record from manifest
        manifest_path = REPO / ".lang-sync-tasks" / args.lang / "_batch-manifest.json"
        if not manifest_path.exists():
            print(f"❌ no manifest at {manifest_path}", file=sys.stderr)
            sys.exit(2)
        manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
        articles = [a for a in manifest.get("articles", []) if a["zh_path"] == args.zh_path]
        if not articles:
            print(f"❌ {args.zh_path} not in {args.lang} manifest", file=sys.stderr)
            sys.exit(2)
        lang = args.lang
    else:
        ap.error("either --group or (--zh-path + --lang) required")

    print(f"   Translating {len(articles)} article(s) to {lang}" + (" [armor]" if args.armor else ""))
    print()

    ok = 0
    fail = 0
    start = time.time()
    for idx, article in enumerate(articles, 1):
        t0 = time.time()
        zh = article["zh_path"]
        print(f"[{idx}/{len(articles)}] {zh}", end=" ", flush=True)
        success, err, backend_used = translate_one(article, lang, cascade, dry_run=args.dry_run,
                                                    armor=args.armor)
        dt = int(time.time() - t0)
        if success:
            ok += 1
            print(f"→ ok via {backend_used} ({dt}s)")
        else:
            fail += 1
            # 2026-11-18：曾截 120 字。cascade 前綴就吃掉約 85 字，OpenRouter 402 的
            # 「requires more credits」落在截斷點之後，babel-dispatch 的 CREDIT_OUT_MARKERS
            # 從此看不到餘額用盡，三個 Haiku worker 每輪照搶 P0 缺檔、各撞一次 402。
            # dispatcher 只靠這行 stdout 判斷失敗類別，所以留足 400 字。
            print(f"❌ {err[:400] if err else 'unknown'} ({dt}s)")

    elapsed = int(time.time() - start)
    print()
    print(f"✅ done: {ok}/{len(articles)} ok, {fail} fail in {elapsed}s ({elapsed // 60}m{elapsed % 60}s)")
    print()
    print("Backend stats:")
    print(cascade.stats_report())

    sys.exit(0 if fail == 0 else 1)


if __name__ == "__main__":
    main()
