"""生成探測與 TCP 堆疊檢查。用假回應不用真 socket，宿主機網路壞掉時測試才量得到邏輯本身。"""
import importlib.util
import json
from pathlib import Path
from types import SimpleNamespace

MODULE_PATH = Path(__file__).resolve().parents[1] / "scripts/tools/lang-sync/babel-preflight.py"
SPEC = importlib.util.spec_from_file_location("babel_preflight", MODULE_PATH)
MODULE = importlib.util.module_from_spec(SPEC)
assert SPEC and SPEC.loader
SPEC.loader.exec_module(MODULE)


class FakeResponse:
    def __init__(self, steps):
        self.steps = list(steps)

    def __enter__(self):
        return self

    def __exit__(self, *a):
        return False

    def readline(self):
        step = self.steps.pop(0) if self.steps else b""
        if isinstance(step, Exception):
            raise step
        return step


def line(**kw):
    return json.dumps(kw).encode() + b"\n"


def probe(monkeypatch, steps=None, raises=None):
    def fake_urlopen(req, timeout=None):
        if raises:
            raise raises
        return FakeResponse(steps)

    monkeypatch.setattr(MODULE.urllib.request, "urlopen", fake_urlopen)
    return MODULE.probe_generation("http://x", "m", read_s=1)


def test_done_received_is_ok(monkeypatch):
    assert probe(monkeypatch, [line(done=False), line(done=True)])["state"] == "ok"


def test_tokens_then_timeout_is_hung(monkeypatch):
    # 2026-11-05 的症狀：字吐完了，done 永遠不來
    assert probe(monkeypatch, [line(done=False), TimeoutError()])["state"] == "hung"


def test_tokens_then_eof_without_done_is_hung(monkeypatch):
    assert probe(monkeypatch, [line(done=False), b""])["state"] == "hung"


def test_silence_is_unknown_not_hung(monkeypatch):
    # NUM_PARALLEL=1 時排隊跟壞掉長得一樣，不能把排隊判成故障
    assert probe(monkeypatch, raises=TimeoutError())["state"] == "unknown"


def test_probe_prefers_issued_model():
    assert MODULE.pick_probe_model(["a:1", "gemma4:26b"], {"gemma4:26b"}) == "gemma4:26b"
    assert MODULE.pick_probe_model(["a:1"], None) == "a:1"
    assert MODULE.pick_probe_model([], None) is None


def fake_netstat(monkeypatch, n):
    text = "tcp4 0 0 127.0.0.1.1 127.0.0.1.2 TIME_WAIT\n" * n + "tcp4 0 0 a b ESTABLISHED\n"
    boot = "{ sec = 1789313143, usec = 0 } Sun Sep 13"
    monkeypatch.setattr(MODULE.subprocess, "run",
                        lambda cmd, **kw: SimpleNamespace(stdout=boot if cmd[0] == "sysctl" else text))


def test_time_wait_over_limit_is_flagged(monkeypatch):
    fake_netstat(monkeypatch, 30)
    r = MODULE.check_tcp_stack(limit=20)
    assert r["time_wait"] == 30 and r["exhausted"] is True


def test_time_wait_under_limit_is_quiet(monkeypatch):
    fake_netstat(monkeypatch, 5)
    assert MODULE.check_tcp_stack(limit=20)["exhausted"] is False
