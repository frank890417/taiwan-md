"""
Base provider interface for Sovereignty-Bench-TW.

Standard response shape (success):
    {
        "ok": True,
        "content": "<model output>",
        "latency_s": 12.3,
        "usage": {"prompt_tokens": N, "completion_tokens": N, "total_tokens": N},
        "finish_reason": "stop|length|content_filter|...",
    }

Standard response shape (failure):
    {
        "ok": False,
        "error": "<error description>",
        "http_code": 429,  # optional
    }

Implementations should:
- Retry with exponential backoff on transient errors (429 / 5xx / network)
- Return ok=False with descriptive error string on permanent failure
- Track latency_s precisely (used as 'filter hesitation' signal)
- Preserve original `content` exactly (do not strip / normalize)
"""
from __future__ import annotations
from abc import ABC, abstractmethod
from typing import Optional, TypedDict


class ProviderResponse(TypedDict, total=False):
    ok: bool
    content: Optional[str]
    latency_s: float
    usage: dict
    finish_reason: Optional[str]
    error: Optional[str]
    http_code: Optional[int]


class BaseProvider(ABC):
    """Each provider knows how to call ONE model family. Provider name is the registry key."""

    name: str = "base"

    def __init__(self, **kwargs) -> None:
        """Subclasses receive any kwargs needed (api_key path, host URL, etc.)."""
        self.kwargs = kwargs

    @abstractmethod
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
        """Call the model. Returns standard response shape."""
        raise NotImplementedError

    def is_local(self) -> bool:
        """Whether this provider runs locally (no API spend, no network costs)."""
        return False

    def __repr__(self) -> str:
        return f"<{self.__class__.__name__} name={self.name!r}>"
