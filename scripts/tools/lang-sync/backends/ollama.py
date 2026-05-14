"""
backends/ollama.py — Local Ollama HTTP API backend.

Per REFLEXES #49 "v2.0 4-tier cascade" — Ollama is the sovereignty backbone, not a backup.
Cloud free-tier consistently refuses last-20% sovereignty-sensitive content (心戰 /
戒嚴 / 兩岸 / 黑名單 / 政治歷史敘事). Local LLM永遠收下, 0 refusal rate observed.

Default model: qwen3.6:35b-a3b-coding-nvfp4 (21GB GPU, Western open weights).
Alternatives: taide-gemma3-12b:2602-q4km, gemma4:e4b-nvfp4 (lighter).

Trade-off vs cloud:
- 永遠 available (no rate limit, no auth churn, no provider drift)
- Slower (sequential, GPU contention if multi-process)
- Quality slightly below owl-alpha but well above the 「永遠收下」threshold

Per MANIFESTO §sovereignty preservation: Local LLM is structural insurance against
PRC content policy infection of multi-lang projection.
"""
from __future__ import annotations

import json
import urllib.error
import urllib.request

from ._base import (
    BackendBadOutput,
    BackendCapabilities,
    BackendTimeout,
    BackendUnavailable,
    TranslationBackend,
)


class OllamaBackend(TranslationBackend):
    CAPABILITIES = BackendCapabilities(
        name="ollama",
        provider_kind="ollama",
        model="qwen3.6:35b-a3b-coding-nvfp4",
        cost_kind="local-compute",
        typical_latency_s=180,     # GPU dependent; 21GB model on Apple Silicon
        max_context_chars=130_000,
        prc_refusal_risk_low=True, # local + Western training data
        multilingual_strength=0.78,
        notes="Sovereignty backbone (REFLEXES #49). 0 refusal observed on Taiwan content. "
              "Slower than cloud but永遠 available. GPU contention → single-process serial.",
    )

    DEFAULT_TIMEOUT = 900  # local model + large article can be slow
    API_URL = "http://localhost:11434/api/chat"

    def __init__(self, model: str = None, host: str = "http://localhost:11434", **config):
        super().__init__(**config)
        self.host = host
        if model:
            # update CAPABILITIES with custom model
            self.CAPABILITIES = BackendCapabilities(
                **{**self.CAPABILITIES.__dict__, "model": model}
            )

    def is_available(self) -> bool:
        try:
            req = urllib.request.Request(f"{self.host}/api/tags", method="GET")
            with urllib.request.urlopen(req, timeout=5) as resp:
                data = json.loads(resp.read())
                models = [m["name"] for m in data.get("models", [])]
                return self.CAPABILITIES.model in models or any(
                    m.startswith(self.CAPABILITIES.model.split(":")[0]) for m in models
                )
        except Exception:  # noqa: BLE001
            return False

    def translate(self, system: str, user: str, *, max_tokens: int = 16000, timeout: int = None) -> str:
        timeout = timeout or self.DEFAULT_TIMEOUT

        payload = json.dumps({
            "model": self.CAPABILITIES.model,
            "messages": [
                {"role": "system", "content": system},
                {"role": "user", "content": user},
            ],
            "stream": False,
            "options": {
                "temperature": 0.3,
                "num_predict": max_tokens,
            },
        }).encode("utf-8")

        url = f"{self.host}/api/chat"
        req = urllib.request.Request(
            url,
            data=payload,
            headers={"Content-Type": "application/json"},
            method="POST",
        )

        try:
            with urllib.request.urlopen(req, timeout=timeout) as resp:
                data = json.loads(resp.read())
        except urllib.error.HTTPError as e:
            err = e.read().decode("utf-8", errors="replace")[:500]
            self._record_failure("bad_output", f"HTTP {e.code}: {err}")
            raise BackendBadOutput(f"Ollama HTTP {e.code}: {err}")
        except urllib.error.URLError:
            self._record_failure("unavailable", "Ollama server not reachable")
            raise BackendUnavailable("Ollama server not reachable at " + self.host)
        except TimeoutError:
            self._record_failure("timeout", f"Ollama timed out after {timeout}s")
            raise BackendTimeout(f"Ollama timed out after {timeout}s")
        except Exception as e:  # noqa: BLE001
            self._record_failure("bad_output", str(e))
            raise BackendBadOutput(f"Ollama unexpected: {e}")

        try:
            content = data["message"]["content"]
        except (KeyError, TypeError):
            self._record_failure("bad_output", f"malformed Ollama response: {str(data)[:200]}")
            raise BackendBadOutput("malformed Ollama response (no message.content)")

        if not content or len(content.strip()) < 100:
            self._record_failure("bad_output", f"empty/tiny: {len(content) if content else 0} chars")
            raise BackendBadOutput(f"Ollama empty/tiny output")

        self._record_success()
        return content.strip()
