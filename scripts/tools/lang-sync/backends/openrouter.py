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
import urllib.error
import urllib.request
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


# Pre-baked model capability tables — pick the right CAPABILITIES for the model.
MODEL_CAPABILITIES = {
    "openrouter/owl-alpha": {
        "typical_latency_s": 200,
        "max_context_chars": 1_000_000,
        "prc_refusal_risk_low": True,
        "multilingual_strength": 0.92,
        "notes": "Stealth provider, top free-tier quality, rate-limit-prone (Z2.1)",
    },
    "openai/gpt-oss-120b:free": {
        "typical_latency_s": 100,
        "max_context_chars": 130_000,
        "prc_refusal_risk_low": True,
        "multilingual_strength": 0.85,
        "notes": "OpenAI open weights, clean direct translation, no preamble",
    },
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
}


class OpenRouterBackend(TranslationBackend):
    """OpenRouter backend — multi-model HTTP API with key rotation."""

    def __init__(self, model: str = "openrouter/owl-alpha", **config):
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

    def translate(self, system: str, user: str, *, max_tokens: int = 16000, timeout: int = 600) -> str:
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
            except urllib.error.URLError as e:
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
    """Yield (key_id, key_value) tuples from credentials dir."""
    if KEY_ROTATION_DIR.exists() and KEY_ROTATION_DIR.is_dir():
        for f in sorted(KEY_ROTATION_DIR.iterdir()):
            if f.is_file() and not f.name.startswith("."):
                key = f.read_text().strip()
                if key:
                    yield (f.name, key)
    if KEY_FILE.exists():
        key = KEY_FILE.read_text().strip()
        if key:
            yield ("default", key)
