"""
OpenRouter provider — any model accessible via openrouter.ai.

Used for: Claude / GPT / Gemini / Llama / Tencent / DeepSeek / etc.
Auth: ~/.config/taiwan-md/credentials/openrouter.key OR OPENROUTER_API_KEY env.
"""
from __future__ import annotations
import json
import os
import sys
import time
import urllib.request
import urllib.error
from pathlib import Path

from .base import BaseProvider, ProviderResponse

API_URL = "https://openrouter.ai/api/v1/chat/completions"
CREDS_DIR = Path.home() / ".config/taiwan-md/credentials"
KEY_FILE = CREDS_DIR / "openrouter.key"
ENV_FILE = CREDS_DIR / ".env"


class OpenRouterProvider(BaseProvider):
    name = "openrouter"

    def __init__(self, api_key: str | None = None, **kwargs) -> None:
        super().__init__(**kwargs)
        self.api_key = api_key or self._resolve_key()

    @staticmethod
    def _resolve_key() -> str:
        if os.environ.get("OPENROUTER_API_KEY"):
            return os.environ["OPENROUTER_API_KEY"].strip()
        if ENV_FILE.exists():
            for line in ENV_FILE.read_text().splitlines():
                line = line.strip()
                if line.startswith("OPENROUTER_API_KEY="):
                    return line.split("=", 1)[1].strip().strip('"').strip("'")
        if KEY_FILE.exists():
            return KEY_FILE.read_text().strip()
        print(
            f"❌ No OpenRouter API key. Set OPENROUTER_API_KEY env, write to {ENV_FILE} or {KEY_FILE}",
            file=sys.stderr,
        )
        sys.exit(1)

    def is_local(self) -> bool:
        return False

    def call(
        self,
        model_id: str,
        system: str,
        user_msg: str,
        *,
        temperature: float = 0.3,
        max_tokens: int = 2000,
        timeout: int = 300,
        max_retries: int = 3,
    ) -> ProviderResponse:
        payload = json.dumps(
            {
                "model": model_id,
                "messages": [
                    {"role": "system", "content": system},
                    {"role": "user", "content": user_msg},
                ],
                "temperature": temperature,
                "max_tokens": max_tokens,
            }
        ).encode("utf-8")

        req = urllib.request.Request(
            API_URL,
            data=payload,
            headers={
                "Authorization": f"Bearer {self.api_key}",
                "Content-Type": "application/json",
                "HTTP-Referer": "https://taiwan.md",
                "X-Title": "Taiwan.md sovereignty-bench",
            },
            method="POST",
        )

        last_error = None
        for attempt in range(max_retries):
            try:
                t0 = time.time()
                with urllib.request.urlopen(req, timeout=timeout) as resp:
                    data = json.loads(resp.read())
                    latency = time.time() - t0
                    if "choices" not in data or not data["choices"]:
                        return {"ok": False, "error": "no_choices", "latency_s": latency}
                    return {
                        "ok": True,
                        "content": data["choices"][0]["message"].get("content"),
                        "latency_s": latency,
                        "usage": data.get("usage", {}),
                        "finish_reason": data["choices"][0].get("finish_reason"),
                    }
            except urllib.error.HTTPError as e:
                body = e.read().decode("utf-8", errors="replace")[:1000]
                last_error = f"HTTP {e.code}: {body}"
                if e.code == 429 and attempt < max_retries - 1:
                    wait = 2**attempt * 5
                    print(f"  ⚠️ Rate limit, waiting {wait}s...", file=sys.stderr)
                    time.sleep(wait)
                    continue
                if e.code in (502, 503, 504) and attempt < max_retries - 1:
                    time.sleep(3)
                    continue
                return {"ok": False, "error": last_error, "http_code": e.code}
            except (urllib.error.URLError, TimeoutError) as e:
                last_error = f"network: {e}"
                if attempt < max_retries - 1:
                    time.sleep(3)
                    continue
                return {"ok": False, "error": last_error}

        return {"ok": False, "error": last_error or "unknown"}
