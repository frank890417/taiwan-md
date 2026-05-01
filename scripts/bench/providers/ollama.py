"""
Ollama provider — local Ollama HTTP API.

Default endpoint: http://localhost:11434/api/chat
Override via OLLAMA_HOST env or `host` kwarg.

No API key required (local). No spend. Larger context windows possible.
Cold-start latency for big models can hit 30-90s on first call.

Verify Ollama running before bench:
    curl -s http://localhost:11434/api/tags
"""
from __future__ import annotations
import json
import os
import time
import urllib.request
import urllib.error

from .base import BaseProvider, ProviderResponse

DEFAULT_HOST = os.environ.get("OLLAMA_HOST", "http://localhost:11434")


class OllamaProvider(BaseProvider):
    name = "ollama"

    def __init__(self, host: str | None = None, **kwargs) -> None:
        super().__init__(**kwargs)
        self.host = (host or DEFAULT_HOST).rstrip("/")

    def is_local(self) -> bool:
        return True

    def call(
        self,
        model_id: str,
        system: str,
        user_msg: str,
        *,
        temperature: float = 0.3,
        max_tokens: int = 2000,
        timeout: int = 600,  # local models can be slower than API
        max_retries: int = 2,  # local rarely needs many retries
    ) -> ProviderResponse:
        url = f"{self.host}/api/chat"
        payload = json.dumps(
            {
                "model": model_id,
                "messages": [
                    {"role": "system", "content": system},
                    {"role": "user", "content": user_msg},
                ],
                "stream": False,
                "options": {
                    "temperature": temperature,
                    "num_predict": max_tokens,
                },
            }
        ).encode("utf-8")

        req = urllib.request.Request(
            url,
            data=payload,
            headers={"Content-Type": "application/json"},
            method="POST",
        )

        last_error = None
        for attempt in range(max_retries):
            try:
                t0 = time.time()
                with urllib.request.urlopen(req, timeout=timeout) as resp:
                    data = json.loads(resp.read())
                    latency = time.time() - t0
                    msg = data.get("message", {})
                    content = msg.get("content", "")
                    return {
                        "ok": True,
                        "content": content,
                        "latency_s": latency,
                        "usage": {
                            "prompt_tokens": data.get("prompt_eval_count", 0),
                            "completion_tokens": data.get("eval_count", 0),
                            "total_tokens": data.get("prompt_eval_count", 0)
                            + data.get("eval_count", 0),
                        },
                        "finish_reason": "stop" if data.get("done") else "length",
                        "ollama_meta": {
                            "model": data.get("model"),
                            "total_duration_ns": data.get("total_duration"),
                            "eval_duration_ns": data.get("eval_duration"),
                        },
                    }
            except urllib.error.HTTPError as e:
                body = e.read().decode("utf-8", errors="replace")[:1000]
                last_error = f"HTTP {e.code}: {body}"
                if e.code == 404:
                    return {
                        "ok": False,
                        "error": f"Model '{model_id}' not found in Ollama. "
                        f"Run: ollama pull {model_id}",
                        "http_code": 404,
                    }
                if attempt < max_retries - 1:
                    time.sleep(3)
                    continue
                return {"ok": False, "error": last_error, "http_code": e.code}
            except (urllib.error.URLError, TimeoutError, ConnectionRefusedError) as e:
                last_error = f"ollama unreachable at {self.host}: {e}"
                if attempt < max_retries - 1:
                    time.sleep(3)
                    continue
                return {"ok": False, "error": last_error}

        return {"ok": False, "error": last_error or "unknown"}
