import importlib.util
from pathlib import Path

import pytest


MODULE_PATH = Path(__file__).resolve().parents[1] / "scripts" / "tools" / "lang-sync" / "untranslated-line-check.py"
SPEC = importlib.util.spec_from_file_location("untranslated_line_check", MODULE_PATH)
MODULE = importlib.util.module_from_spec(SPEC)
assert SPEC and SPEC.loader
SPEC.loader.exec_module(MODULE)


@pytest.mark.parametrize("heading", [
    "## Références", "## Referências", "## المراجع", "### المراجع", "## المصادر",
    "## Tài liệu tham khảo", "## Tài Liệu Tham Khảo", "## Ссылки", "## Список литературы",
    "## Literaturverzeichnis", "## Footnotes", "## Notas al pie", "## 출처", "## Daftar Pustaka",
    "## 參考資料", "## References",
])
def test_bibliography_headings_are_recognised(heading):
    assert MODULE.REF_HEADING.match(heading)


@pytest.mark.parametrize("heading", ["## Further Reading", "## 延伸閱讀", "## Image Sources", "## 画像出典"])
def test_non_bibliography_headings_are_not(heading):
    assert not MODULE.REF_HEADING.match(heading)
