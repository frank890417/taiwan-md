import importlib.util
from pathlib import Path

MODULE_PATH = Path(__file__).resolve().parents[1] / "scripts" / "tools" / "lang-sync" / "babel-push-every.py"
SPEC = importlib.util.spec_from_file_location("babel_push_every", MODULE_PATH)
MODULE = importlib.util.module_from_spec(SPEC)
assert SPEC and SPEC.loader
SPEC.loader.exec_module(MODULE)

HEAD = "error: Your local changes to the following files would be overwritten by merge:\n"
TAIL = "Please commit your changes or stash them before you merge.\nAborting\n"
LEDGER = "data/compute/claude-usage-ledger.jsonl"


def test_ledger_alone_is_recognised_as_safe_to_commit():
    assert MODULE.ledger_only_blockers(HEAD + f"\t{LEDGER}\n" + TAIL) == [LEDGER]


def test_ledger_mixed_with_anything_else_is_left_to_a_human():
    out = HEAD + f"\t{LEDGER}\n\tknowledge/People/someone.md\n" + TAIL
    assert MODULE.ledger_only_blockers(out) == []


def test_other_blockers_and_plain_conflicts_are_not_touched():
    assert MODULE.ledger_only_blockers(HEAD + "\tdocs/semiont/MEMORY.md\n" + TAIL) == []
    assert MODULE.ledger_only_blockers("CONFLICT (content): Merge conflict in x\n") == []
