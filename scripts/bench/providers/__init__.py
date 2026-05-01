"""
Sovereignty-Bench-TW provider abstraction.

Each provider implements a uniform `call(model_id, system, user_msg, **kwargs)` →
{ok: bool, content: str, latency_s: float, usage: dict, finish_reason: str}
| {ok: False, error: str}.

Supported providers:
- openrouter: OpenRouter API (any hosted model — Claude / GPT / Llama / Tencent / etc.)
- ollama: local Ollama HTTP API (gemma4 / qwen3.5 / gpt-oss / etc.)

Future:
- anthropic: direct Anthropic API
- openai: direct OpenAI API
- llamacpp: llama.cpp server
- vllm: vLLM API

To add a new provider:
1. Create scripts/bench/providers/{name}.py with class extending BaseProvider
2. Implement `call()` method returning the standard response dict
3. Register in `PROVIDERS` dict below
4. Update bench/v0/models.json entry with `"provider": "{name}"`

See bench/MODEL_GUIDE.md for full add-model SOP.
"""
from .base import BaseProvider, ProviderResponse
from .openrouter import OpenRouterProvider
from .ollama import OllamaProvider

PROVIDERS: dict[str, type[BaseProvider]] = {
    "openrouter": OpenRouterProvider,
    "ollama": OllamaProvider,
}


def get_provider(name: str, **kwargs) -> BaseProvider:
    """Factory: get a provider instance by name."""
    if name not in PROVIDERS:
        raise ValueError(
            f"Unknown provider '{name}'. "
            f"Available: {sorted(PROVIDERS.keys())}. "
            f"To add a new provider: see scripts/bench/providers/__init__.py"
        )
    return PROVIDERS[name](**kwargs)
