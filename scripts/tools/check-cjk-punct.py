#!/usr/bin/env python3
"""check-cjk-punct.py — facade over the SSOT cjk-punct plugin.

Original tool was migrated to `lib/article_health/checks/cjk_punct.py`
in 2026-05-04 SSOT Phase 2 migration. This file is preserved as a
backward-compat wrapper because:

  - .husky/pre-commit references this filename
  - reports/ + memory/ + EDITORIAL.md cite this CLI command
  - contributors muscle-memory: `check-cjk-punct.py --fix file.md`

The wrapper delegates to article-health.py with the cjk-punct check.
Behavior is byte-identical for the 4 user-facing flags (--fix / --staged
/ --all / no-flag-single-file).

To be deprecated 30 days after Phase 7 cleanup ships (per design doc).
Canonical entry point: `scripts/tools/article-health.py --check=cjk-punct`.
"""

from __future__ import annotations
import argparse
import os
import sys
from pathlib import Path


def _delegate_to_ssot(target_args: list[str]) -> int:
    """Build equivalent article-health.py invocation and exec it."""
    here = Path(__file__).resolve().parent
    ssot = here / "article-health.py"
    cmd = [sys.executable, str(ssot)] + target_args
    os.execv(sys.executable, [sys.executable, str(ssot)] + target_args)
    return 0  # unreachable


def main() -> int:
    # Replicate the original CLI surface exactly so existing callers (pre-commit,
    # docs, muscle memory) keep working.
    parser = argparse.ArgumentParser(
        description="CJK 半形標點 lint (facade over article-health.py --check=cjk-punct)",
    )
    parser.add_argument("files", nargs="*", help="Files to check")
    parser.add_argument("--fix", action="store_true", help="Auto-fix violations in place")
    parser.add_argument(
        "--staged", action="store_true", help="Check only staged knowledge/*.md"
    )
    parser.add_argument("--all", action="store_true", help="Sweep all zh-TW knowledge")
    parser.add_argument("--quiet", action="store_true", help="Only summary")
    parser.add_argument(
        "--max-show", type=int, default=20, help="(legacy, unused — handled by SSOT)"
    )
    args = parser.parse_args()

    # Translate legacy flags to article-health.py flags.
    ssot_args = ["--check=cjk-punct"]
    if args.staged:
        ssot_args.append("--staged")
    if args.all:
        ssot_args.append("--all")
    if args.quiet:
        ssot_args.append("--quiet")

    # --fix path: do detection + fix per-file, then exit.
    if args.fix:
        # SSOT entry point doesn't have --fix CLI yet (Phase 2 simplification);
        # call the plugin's fix() directly.
        sys.path.insert(0, str(Path(__file__).resolve().parent))
        from lib.article_health import load_target  # noqa: E402
        from lib.article_health.langs import TRANSLATION_LANGS  # noqa: E402
        from lib.article_health.checks import cjk_punct  # noqa: E402

        files: list[Path] = []
        if args.staged:
            import subprocess

            try:
                # core.quotePath=false 必帶，否則 CJK 檔名會被 git 加引號轉義，
                # 下面的 startswith("knowledge/") 全 False → 靜默零掃描（同 article-health）
                out = subprocess.check_output(
                    ["git", "-c", "core.quotePath=false",
                     "diff", "--cached", "--name-only", "--diff-filter=ACM"],
                    text=True,
                )
            except subprocess.CalledProcessError:
                out = ""
            for line in out.splitlines():
                if not line.startswith("knowledge/"):
                    continue
                if any(
                    line.startswith(f"knowledge/{lang}/")
                    for lang in TRANSLATION_LANGS
                ):
                    continue
                if not line.endswith(".md"):
                    continue
                if Path(line).name.startswith("_"):
                    continue
                files.append(Path(line))
        elif args.all:
            root = Path("knowledge")
            for cat in root.iterdir():
                if not cat.is_dir() or cat.name in TRANSLATION_LANGS:
                    continue
                for md in cat.glob("*.md"):
                    if not md.name.startswith("_"):
                        files.append(md)
        else:
            files = [Path(f) for f in args.files]

        fixed = 0
        for fpath in files:
            if not fpath.exists():
                print(f"⚠️  {fpath}: not found", file=sys.stderr)
                continue
            target = load_target(fpath)
            if cjk_punct.fix(target, {}):
                fixed += 1
                if not args.quiet:
                    print(f"✏️  {fpath}: fixed")
            elif not args.quiet:
                print(f"✓ {fpath}: clean")
        if fixed:
            print(f"\n✏️  Fixed {fixed} file(s).")
            return 1  # signal change (matches old script behavior)
        print("✓ No fixes needed.")
        return 0

    # Detection path: delegate to SSOT entry point.
    ssot_args.extend([str(f) for f in args.files])
    _delegate_to_ssot(ssot_args)
    return 0  # unreachable


if __name__ == "__main__":
    raise SystemExit(main())
