"""
backends/openrouter.py — OpenRouter HTTP API backend (multi-model).

Wraps the existing openrouter-translate.py logic but exposes it through the
abstract `TranslationBackend` interface so the orchestrator can swap models
or skip entirely when rate-limited.

Supports any OpenRouter model id (free-tier or paid). Common picks:

  Free-tier (subject to upstream rate limit per Z2.1):
    - openrouter/owl-alpha       (Stealth, 1M ctx, top quality but rate-limit-prone)
    - openai/gpt-oss-120b:free   (OpenAI open weights, 131K ctx, reliable)
    - google/gemma-4-31b-it:free (Google, 262K ctx, multilingual)
    - nvidia/nemotron-3-super-120b-a12b:free (verbose but capable)

  Avoid for sovereignty-sensitive content (PRC content policy risk):
    - tencent/hy3-preview  (was free, now paid as of 2026-05)
    - qwen/qwen3-*         (Alibaba)
    - baidu/cobuddy        (Baidu)

Per REFLEXES #45: same provider keys share budget. 哲宇 has 5 keys in
~/.config/taiwan-md/credentials/openrouter-keys/ — backend rotates on 429.
"""
from __future__ import annotations

import json
import signal
import sys
import threading
import time
import urllib.error
import urllib.request
from contextlib import contextmanager
from pathlib import Path

from ._base import (
    BackendBadOutput,
    BackendCapabilities,
    BackendRateLimited,
    BackendRefusal,
    BackendTimeout,
    BackendUnavailable,
    TranslationBackend,
)


CREDS_DIR = Path.home() / ".config" / "taiwan-md" / "credentials"
KEY_FILE = CREDS_DIR / "openrouter.key"
KEY_ROTATION_DIR = CREDS_DIR / "openrouter-keys"
API_URL = "https://openrouter.ai/api/v1/chat/completions"


@contextmanager
def _wall_clock_deadline(seconds: float):
    """Enforce one deadline over connect + every streamed read.

    urllib's ``timeout=`` is a per-socket-operation timeout.  A provider that
    dribbles bytes can therefore keep a request alive indefinitely even though
    every individual read finishes inside the limit.  On Unix, SIGALRM gives
    the batch worker the wall-clock semantics the backend API promises.  Keep
    the socket timeout as the portable fallback outside the main thread.
    """
    if (
        seconds <= 0
        or threading.current_thread() is not threading.main_thread()
        or not hasattr(signal, "setitimer")
    ):
        yield
        return

    previous_handler = signal.getsignal(signal.SIGALRM)
    previous_timer = signal.getitimer(signal.ITIMER_REAL)
    started = time.monotonic()

    def _raise_timeout(_signum, _frame):
        raise TimeoutError(f"wall-clock deadline exceeded after {seconds}s")

    signal.signal(signal.SIGALRM, _raise_timeout)
    signal.setitimer(signal.ITIMER_REAL, seconds)
    try:
        yield
    finally:
        signal.setitimer(signal.ITIMER_REAL, 0)
        signal.signal(signal.SIGALRM, previous_handler)
        if previous_timer[0] > 0:
            remaining = max(0.000001, previous_timer[0] - (time.monotonic() - started))
            signal.setitimer(signal.ITIMER_REAL, remaining, previous_timer[1])


# 免費層 slug 會漂移，而它以前散在七個檔案裡各自寫死一次——所以一次下架要改七個
# 地方，於是永遠有幾個沒改到。2026-09-09 現查加實呼確認 `openrouter/owl-alpha` 與
# `openai/gpt-oss-120b:free` 都回 404，而後者「已下架」這個事實 7/24 就寫進
# research-fleet.py 的註解、六週沒傳到任何使用端。改成單一來源，換模型只改這一行。
# 對賬指令：python3 scripts/tools/lang-sync/openrouter-model-audit.py
DEFAULT_FREE_MODEL = "nvidia/nemotron-3-super-120b-a12b:free"

# Pre-baked model capability tables — pick the right CAPABILITIES for the model.
MODEL_CAPABILITIES = {
    "google/gemma-4-31b-it:free": {
        "typical_latency_s": 120,
        "max_context_chars": 260_000,
        "prc_refusal_risk_low": True,
        "multilingual_strength": 0.88,
        "notes": "Google instruction-tuned, strong multilingual",
    },
    "nvidia/nemotron-3-super-120b-a12b:free": {
        "typical_latency_s": 150,
        "max_context_chars": 260_000,
        "prc_refusal_risk_low": True,
        "multilingual_strength": 0.80,
        "notes": "Verbose output (may need post-processing)",
    },
    # ── 墓碑：2026-09-09 現查 + 實呼皆 404。條目留著是因為顯式 `--worker
    #    openrouter:<slug>` 仍可能帶進舊 slug，留著讓 CAPABILITIES 查得到、
    #    錯誤訊息看得懂；不要放回 DEFAULT_FREE_MODEL 或 default chain。
    "openrouter/owl-alpha": {  # audit-ok: 墓碑條目
        "typical_latency_s": 200,
        "max_context_chars": 1_000_000,
        "prc_refusal_risk_low": True,
        "multilingual_strength": 0.92,
        "notes": "RETIRED 2026-09-09（No endpoints found）— 曾是 stealth provider 最佳免費層",
    },
    "openai/gpt-oss-120b:free": {  # audit-ok: 墓碑條目
        "typical_latency_s": 100,
        "max_context_chars": 130_000,
        "prc_refusal_risk_low": True,
        "multilingual_strength": 0.85,
        "notes": "RETIRED — 免費層下架，付費 slug `openai/gpt-oss-120b` 仍在架",
    },
}


class OpenRouterBackend(TranslationBackend):
    """OpenRouter backend — multi-model HTTP API with key rotation."""

    def __init__(self, model: str = DEFAULT_FREE_MODEL, **config):
        super().__init__(**config)
        self.model = model
        caps_dict = MODEL_CAPABILITIES.get(model, {})
        self.CAPABILITIES = BackendCapabilities(
            name=f"openrouter:{model.split('/')[-1].rstrip(':free')}",
            provider_kind="openrouter",
            model=model,
            cost_kind="free-tier",
            typical_latency_s=caps_dict.get("typical_latency_s", 180),
            max_context_chars=caps_dict.get("max_context_chars", 130_000),
            prc_refusal_risk_low=caps_dict.get("prc_refusal_risk_low", True),
            multilingual_strength=caps_dict.get("multilingual_strength", 0.80),
            notes=caps_dict.get("notes", ""),
        )

    def is_available(self) -> bool:
        return KEY_FILE.exists() or (KEY_ROTATION_DIR.exists() and any(KEY_ROTATION_DIR.iterdir()))

    def translate(self, system: str, user: str, *, max_tokens: int = 32000, timeout: int = 600) -> str:
        keys = list(_load_all_keys())
        if not keys:
            self._record_failure("unavailable", "no OpenRouter API keys")
            raise BackendUnavailable("no OpenRouter API keys in credentials dir")

        payload = json.dumps({
            "model": self.model,
            "messages": [
                {"role": "system", "content": system},
                {"role": "user", "content": user},
            ],
            "temperature": 0.3,
            "max_tokens": max_tokens,
        }).encode("utf-8")

        last_err = None
        for key_id, key in keys:
            req = urllib.request.Request(
                API_URL,
                data=payload,
                headers={
                    "Authorization": f"Bearer {key}",
                    "Content-Type": "application/json",
                    "HTTP-Referer": "https://taiwan.md",
                    "X-Title": "Taiwan.md Babel",
                },
                method="POST",
            )
            try:
                with _wall_clock_deadline(timeout):
                    with urllib.request.urlopen(req, timeout=timeout) as resp:
                        data = json.loads(resp.read())
            except urllib.error.HTTPError as e:
                code = e.code
                body = e.read().decode("utf-8", errors="replace")[:300]
                last_err = f"HTTP {code} on key={key_id}: {body}"
                if code == 429:
                    continue  # rotate to next key
                if code == 404 and "no longer available as a free model" in body:
                    self._record_failure("unavailable", body)
                    raise BackendUnavailable(f"model retired: {body[:120]}")
                if code in (400, 422) and "refused" in body.lower():
                    self._record_failure("refusal", body)
                    raise BackendRefusal(body[:200])
                # other errors — try next key
                continue
            except TimeoutError as e:
                # A request timeout belongs to the provider/model workload, not
                # to the credential. Rotating seven funded keys used to replay
                # the same 600s request up to seven times, so one Laguna article
                # could occupy a worker for 70 minutes without emitting a
                # report. Only 429 is key-specific; fail this backend call now
                # and let the dispatcher move on to another article/round.
                self._record_failure("timeout", f"timed out after {timeout}s")
                raise BackendTimeout(f"OpenRouter timed out after {timeout}s") from e
            except urllib.error.URLError as e:
                if isinstance(e.reason, TimeoutError):
                    self._record_failure("timeout", f"timed out after {timeout}s")
                    raise BackendTimeout(f"OpenRouter timed out after {timeout}s") from e
                last_err = f"network error: {e}"
                continue
            except Exception as e:  # noqa: BLE001
                last_err = f"unexpected: {e}"
                continue

            # got 200 — extract content
            try:
                content = data["choices"][0]["message"]["content"]
            except (KeyError, IndexError, TypeError):
                last_err = f"malformed response from key={key_id}: {str(data)[:200]}"
                continue

            if content is None or (isinstance(content, str) and len(content.strip()) < 100):
                # PRC null-content refusal pattern
                self._record_failure("refusal", "null/tiny content (likely content-policy refusal)")
                raise BackendRefusal("null/tiny content from API (PRC content policy likely)")

            if not isinstance(content, str):
                self._record_failure("bad_output", f"non-string content: type={type(content).__name__}")
                raise BackendBadOutput(f"non-string content from API")

            self._record_success()
            return content

        # All keys exhausted
        self.mark_cool_down(300)
        self._record_failure("rate_limited", last_err or "all keys rate-limited")
        raise BackendRateLimited(f"all OpenRouter keys rate-limited or failed: {last_err}",
                                 cool_down_until=self.cool_down_until())


# ────────────────── helpers ──────────────────

def _load_all_keys():
    """Yield (key_id, key_value) tuples from credentials dir.

    2026-07-24 硬化：只認 *.key 檔且值必須是 sk-or-v1- 開頭的 ASCII token。
    輪動目錄裡出現過 KEYS.md（帳號對照筆記，含中文）——舊版把每個檔都當
    key，輪到它時中文進 auth header 直接 UnicodeEncodeError 炸整個 backend。
    """
    def _valid(key: str) -> bool:
        return key.startswith("sk-or-v1-") and key.isascii() and "\n" not in key

    if KEY_ROTATION_DIR.exists() and KEY_ROTATION_DIR.is_dir():
        for f in sorted(KEY_ROTATION_DIR.iterdir()):
            if f.is_file() and f.suffix == ".key" and not f.name.startswith("."):
                key = f.read_text(encoding="utf-8").strip()
                if key and _valid(key):
                    yield (f.name, key)
                elif key:
                    print(f"⚠️  openrouter key file {f.name} 內容不是合法 key token，略過", file=sys.stderr)
    if KEY_FILE.exists():
        key = KEY_FILE.read_text(encoding="utf-8").strip()
        if key and _valid(key):
            yield ("default", key)
