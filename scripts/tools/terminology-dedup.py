#!/usr/bin/env python3
"""
terminology-dedup.py — 全域跨來源術語去重檢查

掃描 data/terminology/ 中所有 YAML，找出 (display.taiwan, display.china)
配對完全相同的重複條目，不論來源為何。

用法：
  python3 scripts/tools/terminology-dedup.py           # 報告 + exit 1 若有重複
  python3 scripts/tools/terminology-dedup.py --fix     # 自動合併：刪重複、補 sources

Exit code：
  0 — 無重複
  1 — 發現重複（CI 會失敗）
"""

import os
import re
import sys
import unicodedata
from collections import defaultdict
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8", errors="replace")
sys.stderr.reconfigure(encoding="utf-8", errors="replace")

try:
    import yaml
except ImportError:
    print("need pyyaml: pip install pyyaml", file=sys.stderr)
    sys.exit(2)

TERMINOLOGY_DIR = Path(__file__).resolve().parents[2] / "data" / "terminology"
FIX_MODE = "--fix" in sys.argv


def norm(s: str) -> str:
    s = unicodedata.normalize("NFKC", str(s or "")).strip()
    return re.sub(r"[\s　]+", "", s)


def load_all() -> list[tuple[Path, dict]]:
    entries = []
    seen_norm_names: set[str] = set()
    for fpath in sorted(TERMINOLOGY_DIR.glob("*.yaml")):
        # Deduplicate files whose names differ only in NFC/NFD normalization
        # (can happen on Windows/macOS with Unicode filenames)
        key = unicodedata.normalize("NFC", fpath.name)
        if key in seen_norm_names:
            continue
        seen_norm_names.add(key)
        try:
            with open(fpath, encoding="utf-8") as f:
                data = yaml.safe_load(f)
            if isinstance(data, dict):
                entries.append((fpath, data))
        except Exception as e:
            print(f"warning: cannot parse {fpath.name}: {e}", file=sys.stderr)
    return entries


def find_duplicates(entries: list[tuple[Path, dict]]) -> dict[tuple, list[Path]]:
    pair_to_files: dict[tuple, list[Path]] = defaultdict(list)
    for fpath, data in entries:
        display = data.get("display") or {}
        tw = norm(display.get("taiwan", ""))
        cn = norm(display.get("china", ""))
        if tw and cn:
            pair_to_files[(tw, cn)].append(fpath)
    return {k: v for k, v in pair_to_files.items() if len(v) > 1}


def pick_keeper(files: list[Path], entries_map: dict[Path, dict]) -> tuple[Path, list[Path]]:
    """
    決定保留哪個檔案：優先選手動策展條目（sources 不只有自動匯入來源）。
    若無法區分則保留 sources 最多的那個。
    """
    AUTO_SOURCES = {"fanhuaji-config", "google-sheets-crowdsource",
                    "thunderko c2t", "ThunderKO"}

    def score(fpath: Path) -> tuple[int, int]:
        data = entries_map[fpath]
        sources = [str(s) for s in (data.get("sources") or [])]
        is_manual = any(
            not any(auto.lower() in s.lower() for auto in AUTO_SOURCES)
            for s in sources
        )
        return (int(is_manual), len(sources))

    files_sorted = sorted(files, key=score, reverse=True)
    return files_sorted[0], files_sorted[1:]


def merge_sources(keeper_data: dict, dup_data: dict) -> list:
    existing = [str(s) for s in (keeper_data.get("sources") or [])]
    additions = [str(s) for s in (dup_data.get("sources") or [])]
    merged = list(existing)
    for s in additions:
        if s not in merged:
            merged.append(s)
    return merged


def patch_sources_in_file(fpath: Path, new_sources: list[str]) -> None:
    """Surgically replace only the sources block, leaving the rest of the file unchanged."""
    text = fpath.read_text(encoding="utf-8")
    block = "sources:\n" + "".join(f"  - {s}\n" for s in new_sources)
    patched = re.sub(r"^sources:\n(?:  - .+\n?)*", block, text, flags=re.MULTILINE)
    fpath.write_text(patched, encoding="utf-8")


def do_fix(dupes: dict[tuple, list[Path]], entries_map: dict[Path, dict]):
    fixed = 0
    for (tw, cn), files in dupes.items():
        keeper, to_delete = pick_keeper(files, entries_map)
        keeper_data = entries_map[keeper]

        # Merge all sources into keeper
        for dup in to_delete:
            keeper_data["sources"] = merge_sources(keeper_data, entries_map[dup])

        # Patch only the sources block — avoids yaml.dump reformatting the whole file
        patch_sources_in_file(keeper, keeper_data["sources"])

        for dup in to_delete:
            dup.unlink()
            print(f"🗑️  刪除 {dup.name}  (合併至 {keeper.name})")

        print(f"✅ 保留 {keeper.name}  sources 已更新")
        fixed += 1

    print(f"\n共修復 {fixed} 組重複。")


def main():
    entries = load_all()
    entries_map = {fpath: data for fpath, data in entries}
    dupes = find_duplicates(entries)

    if not dupes:
        print("✅ 無重複術語對。")
        sys.exit(0)

    print(f"❌ 發現 {len(dupes)} 組跨來源重複術語：\n")
    for (tw, cn), files in sorted(dupes.items()):
        print(f"  台灣：{tw}  /  中國：{cn}")
        for f in files:
            data = entries_map[f]
            sources = data.get("sources") or []
            print(f"    - {f.name}  (sources: {sources})")
        print()

    if FIX_MODE:
        print("── --fix 模式：自動合併 ──\n")
        do_fix(dupes, entries_map)
        sys.exit(0)
    else:
        print("執行 --fix 可自動合併重複條目。")
        sys.exit(1)


if __name__ == "__main__":
    main()
