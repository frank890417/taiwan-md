import importlib.util
from pathlib import Path


MODULE_PATH = Path(__file__).resolve().parents[1] / "scripts" / "tools" / "lang-sync" / "quarantine-rescue.py"
SPEC = importlib.util.spec_from_file_location("quarantine_rescue", MODULE_PATH)
MODULE = importlib.util.module_from_spec(SPEC)
assert SPEC and SPEC.loader
SPEC.loader.exec_module(MODULE)


def test_sample_translated_from_current_source_matches():
    assert MODULE.sha_matches("---\nsourceCommitSha: '1200bee75'\n---\n", "1200bee")


def test_sample_translated_from_old_source_is_rejected():
    assert not MODULE.sha_matches("---\nsourceCommitSha: '81f10131f'\n---\n", "6b09bda")


def test_sample_without_sha_is_rejected():
    assert not MODULE.sha_matches("---\ntitle: x\n---\n", "6b09bda")
