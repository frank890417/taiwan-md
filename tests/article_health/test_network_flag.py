"""`--network` 旗標：FACTCHECK-PIPELINE 文件寫的指令要照打就能跑。

2026-10-09 之前 CLI 不認 `--network`（argparse 直接報 usage 錯誤），網路檢查只認
環境變數 ARTICLE_HEALTH_NETWORK=1；文件三處、查核檔與 memory 都寫著旗標版本。
"""

from __future__ import annotations

import os
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
CLI = ROOT / "scripts" / "tools" / "article-health.py"


def _run(args, env_extra=None):
    env = {k: v for k, v in os.environ.items() if k != "ARTICLE_HEALTH_NETWORK"}
    env.update(env_extra or {})
    return subprocess.run(
        [sys.executable, str(CLI), *args],
        capture_output=True, text=True, encoding="utf-8", cwd=ROOT, env=env, timeout=120,
    )


def test_network_flag_is_accepted():
    r = _run(["--list-checks", "--network"])
    assert r.returncode == 0, r.stderr
    assert "unrecognized arguments" not in r.stderr


def test_without_flag_footnote_url_stays_offline(tmp_path):
    # 沒有旗標也沒有環境變數：footnote-url 不碰網路，回報 skipped 而不是去打網址
    art = tmp_path / "knowledge" / "Society" / "x.md"
    art.parent.mkdir(parents=True)
    art.write_text(
        "---\ntitle: 'x'\ndescription: 'x'\ndate: 2026-01-01\ncategory: 'Society'\n---\n\n"
        "正文[^1]。\n\n[^1]: [x](https://invalid.invalid/x) — x\n",
        encoding="utf-8",
    )
    r = _run([str(art), "--check=footnote-url"])
    assert "invalid.invalid" not in r.stdout


def test_flag_sets_env_for_plugins(tmp_path):
    # 有旗標：footnote-url 真的去量，無法解析的網域會被列出來
    art = tmp_path / "knowledge" / "Society" / "x.md"
    art.parent.mkdir(parents=True)
    art.write_text(
        "---\ntitle: 'x'\ndescription: 'x'\ndate: 2026-01-01\ncategory: 'Society'\n---\n\n"
        "正文[^1]。\n\n[^1]: [x](https://invalid.invalid/x) — x\n",
        encoding="utf-8",
    )
    r = _run([str(art), "--check=footnote-url", "--network"])
    assert "invalid.invalid" in r.stdout, r.stdout + r.stderr


def test_offline_single_check_says_it_measured_nothing(tmp_path):
    art = tmp_path / "knowledge" / "Society" / "x.md"
    art.parent.mkdir(parents=True)
    art.write_text(
        "---\ntitle: 'x'\ndescription: 'x'\ndate: 2026-01-01\ncategory: 'Society'\n---\n\n"
        "正文[^1]。\n\n[^1]: [x](https://invalid.invalid/x) — x\n",
        encoding="utf-8",
    )
    r = _run([str(art), "--check=footnote-url"])
    assert "一個網址都沒量" in r.stderr
    r2 = _run([str(art), "--check=footnote-url", "--network"])
    assert "一個網址都沒量" not in r2.stderr
