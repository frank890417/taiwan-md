"""付費層帳戶餘額用盡（HTTP 402）：該 tier 本 run 不再接缺檔，缺檔交回 normal worker。

2026-10-21 夜：七把 OpenRouter key 的儲值全數花完，三個 Haiku worker 每輪先搶走
〈一同走過從前〉ar/ru 兩篇 P0 缺檔、各撞一次 402；那兩篇留在 round_seen，地端與
免費 worker 的補貨永遠拿不到，兩輪零產出。
"""
import importlib.util
import sys
from pathlib import Path


MODULE_PATH = (
    Path(__file__).resolve().parents[1] / "scripts" / "tools" / "lang-sync" / "babel-dispatch.py"
)
SPEC = importlib.util.spec_from_file_location("babel_dispatch", MODULE_PATH)
MODULE = importlib.util.module_from_spec(SPEC)
assert SPEC and SPEC.loader
sys.modules["babel_dispatch"] = MODULE
SPEC.loader.exec_module(MODULE)


class _Sink:
    def __init__(self):
        self.rows = []

    def write(self, obj):
        self.rows.append(obj)


def _state(tmp_path, monkeypatch):
    monkeypatch.setattr(MODULE, "RESTRICTED_FAILS_FILE", tmp_path / "restricted.json")
    st = MODULE.RunState()
    st.restricted_eligible = {("ar", "Culture/一同走過從前.md")}
    st.restricted_tiers = frozenset({"tier6"})
    return st


def test_credit_out_tier_stops_claiming(tmp_path, monkeypatch):
    st = _state(tmp_path, monkeypatch)
    w = MODULE.Worker(label="haiku1", cascade_spec="openrouter:anthropic/claude-haiku-4.5", tier="tier6")
    eligible = MODULE.make_restricted_task_filter(w, st, _Sink(), lambda m: None)
    assert eligible("ar", "Culture/一同走過從前.md") is True
    st.tier_credit_out.add("tier6")
    assert eligible("ar", "Culture/一同走過從前.md") is False


def test_credit_out_releases_lifted_lang_to_normal(tmp_path, monkeypatch):
    st = _state(tmp_path, monkeypatch)
    normal = MODULE.Worker(label="nemo", cascade_spec="openrouter:x", lifted_langs=frozenset({"ar"}))
    ok = MODULE.make_task_filter(normal, st, _Sink(), lambda m: None)
    # 付費層還有額度時，弱適配語言的 P0 缺檔先讓給它
    assert ok("ar", "Culture/一同走過從前.md") is False
    st.tier_credit_out.add("tier6")
    assert ok("ar", "Culture/一同走過從前.md") is True


def test_markers_match_openrouter_402_body():
    body = ('HTTP 402 on key=default: {"error":{"message":"This request would exceed your '
            'available credits given your current in-flight requests.","code":402,'
            '"metadata":{"reason":"in_flight_budget_exhausted"}}}')
    assert any(m in body for m in MODULE.CREDIT_OUT_MARKERS)
    other = ('HTTP 402 on key=default: {"error":{"message":"This request requires more credits, '
             'or fewer max_tokens. You requested up to 8000 tokens, but can only afford 7701."}}')
    assert any(m in other for m in MODULE.CREDIT_OUT_MARKERS)
    # 429 限流不是餘額用盡，不能讓付費層被誤停
    assert not any(m in "HTTP 429 on key=acc2: rate limited" for m in MODULE.CREDIT_OUT_MARKERS)
