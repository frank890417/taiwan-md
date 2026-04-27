#!/usr/bin/env python3
"""
extract-china-terms.py — 從 data/terminology/*.yaml 抽取 detection 區塊產生 quality-scan 詞表

從 YAML 詞庫的 `detection` 區塊收集中國用語偵測資料，輸出兩份 generated TSV：
  - data/terminology/.china-terms.detection.tsv      —— 偵測詞表（cterm, severity, taiwan, fork_type）
  - data/terminology/.china-terms.false-positives.tsv —— 偽陽性表（cterm, pattern, note）

設計原則（#616 修正版 RFC）：
  - YAML 是 SSOT。「無 detection 區塊 = 不偵測」（保守 opt-in）
  - severity A = 紅燈（明確中國用語，計入 quality-scan 分數）
  - severity B = 黃燈（可能歧義，列出但不計分，給作者自行判斷）
  - false_positives 跟詞條同檔（譬如「博客→博客來」放在 部落格.yaml 裡）

用法：
    python3 scripts/core/extract-china-terms.py
    python3 scripts/core/extract-china-terms.py --terminology-dir data/terminology

跑時機：
    - prebuild 階段（透過 npm run prebuild 自動觸發）
    - 維護者修 YAML detection 區塊後手動跑一次

Generated files 加前綴 dot 標明「自動生成、不要手動編輯」。
"""

import sys
import argparse
import re
from pathlib import Path

# Windows cp950 console 強制 UTF-8（不影響 Linux/macOS）
if sys.stdout.encoding and sys.stdout.encoding.lower() not in ("utf-8", "utf8"):
    sys.stdout.reconfigure(encoding="utf-8")
    sys.stderr.reconfigure(encoding="utf-8")

DEFAULT_TERMINOLOGY_DIR = Path("data/terminology")
OUT_DETECTION = ".china-terms.detection.tsv"
OUT_FALSE_POSITIVES = ".china-terms.false-positives.tsv"

# 簡易 YAML parser（避免引入 PyYAML 依賴；只 parse 我們需要的欄位）
# 格式假設：縮排兩空格、key: value、list 用 - 開頭
# 不處理：anchor、merge key、複雜引號逃逸


def parse_yaml_minimal(content: str) -> dict:
    """最小 YAML parser，只 cover 我們的詞條結構。

    支援：
      - 頂層 key: value
      - 巢狀 dict（如 display:, detection:）
      - 列表（如 false_positives 內的 - pattern: x）
      - 引號值（單引號、雙引號、無引號）
      - # 註解（行首或行內）
    """
    result: dict = {}
    lines = content.split("\n")
    i = 0
    while i < len(lines):
        line = lines[i]
        stripped = line.rstrip()
        # 跳過空行和純註解
        if not stripped or stripped.lstrip().startswith("#"):
            i += 1
            continue

        indent = len(line) - len(line.lstrip())
        if indent == 0:
            # 頂層 key
            m = re.match(r"^([A-Za-z_][\w-]*):\s*(.*)$", stripped)
            if not m:
                i += 1
                continue
            key, val = m.group(1), m.group(2).strip()
            # 移除行內註解
            val = re.sub(r"\s+#.*$", "", val).strip()
            if val == "":
                # 巢狀區塊，往下讀
                nested, consumed = _parse_nested(lines, i + 1, parent_indent=0)
                result[key] = nested
                i += 1 + consumed
            else:
                result[key] = _strip_quotes(val)
                i += 1
        else:
            i += 1
    return result


def _parse_nested(lines: list[str], start: int, parent_indent: int) -> tuple:
    """遞迴 parse 巢狀區塊；return (parsed_value, lines_consumed)"""
    result: dict | list = {}
    is_list = False
    i = start
    consumed = 0

    while i < len(lines):
        line = lines[i]
        stripped = line.rstrip()
        if not stripped or stripped.lstrip().startswith("#"):
            i += 1
            consumed += 1
            continue

        indent = len(line) - len(line.lstrip())
        if indent <= parent_indent:
            # 跳出此巢狀層級
            break

        content = stripped.lstrip()

        # 列表項
        if content.startswith("- "):
            is_list = True
            if not isinstance(result, list):
                result = []
            item_content = content[2:].strip()
            # `- key: value` 形式 → 該 item 是 dict
            m = re.match(r"^([A-Za-z_][\w-]*):\s*(.*)$", item_content)
            if m:
                item_key, item_val = m.group(1), m.group(2).strip()
                item_val = re.sub(r"\s+#.*$", "", item_val).strip()
                item_dict = {item_key: _strip_quotes(item_val) if item_val else ""}
                # 接下來同樣縮排的 key 都是這個 item 的
                i += 1
                consumed += 1
                while i < len(lines):
                    sub_line = lines[i]
                    sub_stripped = sub_line.rstrip()
                    if not sub_stripped or sub_stripped.lstrip().startswith("#"):
                        i += 1
                        consumed += 1
                        continue
                    sub_indent = len(sub_line) - len(sub_line.lstrip())
                    # 子 key 應該比 `-` 更深一點（同層的 -, 上一層）
                    if sub_indent <= indent:
                        break
                    sub_content = sub_stripped.lstrip()
                    if sub_content.startswith("-"):
                        break
                    sub_m = re.match(r"^([A-Za-z_][\w-]*):\s*(.*)$", sub_content)
                    if sub_m:
                        sk, sv = sub_m.group(1), sub_m.group(2).strip()
                        sv = re.sub(r"\s+#.*$", "", sv).strip()
                        item_dict[sk] = _strip_quotes(sv) if sv else ""
                    i += 1
                    consumed += 1
                result.append(item_dict)
                continue
            else:
                # 純 scalar list item
                result.append(_strip_quotes(item_content))
                i += 1
                consumed += 1
                continue

        # 一般 key: value
        m = re.match(r"^([A-Za-z_][\w-]*):\s*(.*)$", content)
        if not m:
            i += 1
            consumed += 1
            continue

        key, val = m.group(1), m.group(2).strip()
        val = re.sub(r"\s+#.*$", "", val).strip()

        if isinstance(result, list):
            # 預期是 dict 但收到 key — 跳出
            break

        if val == "":
            # 巢狀
            nested, sub_consumed = _parse_nested(lines, i + 1, parent_indent=indent)
            result[key] = nested
            i += 1 + sub_consumed
            consumed += 1 + sub_consumed
        else:
            result[key] = _strip_quotes(val)
            i += 1
            consumed += 1

    return result, consumed


def _strip_quotes(s: str) -> str:
    """脫除 YAML 字串的單/雙引號"""
    s = s.strip()
    if len(s) >= 2 and s[0] == s[-1] and s[0] in ("'", '"'):
        return s[1:-1]
    return s


def extract_from_yaml(yaml_path: Path) -> dict | None:
    """讀單一 YAML 檔，回傳 detection 相關資訊。
    若無 detection 區塊或缺欄位，回傳 None。
    """
    try:
        content = yaml_path.read_text(encoding="utf-8")
    except Exception as e:
        print(f"  ⚠️  無法讀取 {yaml_path.name}：{e}", file=sys.stderr)
        return None

    parsed = parse_yaml_minimal(content)

    detection = parsed.get("detection")
    if not isinstance(detection, dict):
        return None

    severity = detection.get("severity", "").strip().upper()
    if severity not in ("A", "B"):
        print(
            f"  ⚠️  {yaml_path.name}：detection.severity={severity!r}（應為 A 或 B），跳過",
            file=sys.stderr,
        )
        return None

    display = parsed.get("display", {})
    if not isinstance(display, dict):
        return None
    cterm = (display.get("china") or "").strip()
    taiwan = (display.get("taiwan") or "").strip()
    if not cterm:
        print(f"  ⚠️  {yaml_path.name}：display.china 為空，跳過", file=sys.stderr)
        return None

    fork_type = (parsed.get("fork_type") or "").strip()

    fps = []
    fp_list = detection.get("false_positives", [])
    if isinstance(fp_list, list):
        for fp in fp_list:
            if not isinstance(fp, dict):
                continue
            pattern = (fp.get("pattern") or "").strip()
            note = (fp.get("note") or "").strip()
            if pattern:
                fps.append((pattern, note))

    return {
        "cterm": cterm,
        "severity": severity,
        "taiwan": taiwan,
        "fork_type": fork_type,
        "false_positives": fps,
        "yaml_file": yaml_path.name,
    }


def main():
    parser = argparse.ArgumentParser(
        description="從 YAML 詞庫抽取 detection 規則產生 generated TSV"
    )
    parser.add_argument(
        "--terminology-dir",
        type=Path,
        default=DEFAULT_TERMINOLOGY_DIR,
        help="terminology YAML 目錄（預設 data/terminology）",
    )
    parser.add_argument(
        "--quiet",
        action="store_true",
        help="只輸出統計，不顯示每個詞條",
    )
    args = parser.parse_args()

    if not args.terminology_dir.is_dir():
        print(f"✗ 找不到 terminology 目錄：{args.terminology_dir}", file=sys.stderr)
        sys.exit(1)

    yaml_files = sorted(args.terminology_dir.glob("*.yaml"))
    if not yaml_files:
        print(f"✗ {args.terminology_dir} 中沒有 *.yaml 檔案", file=sys.stderr)
        sys.exit(1)

    terms = []
    for yaml_path in yaml_files:
        # 跳過 _template.yaml
        if yaml_path.name.startswith("_"):
            continue
        result = extract_from_yaml(yaml_path)
        if result:
            terms.append(result)

    # 排序：紅燈在前、黃燈在後，同色內按 cterm 排
    terms.sort(key=lambda t: (t["severity"], t["cterm"]))

    out_detection = args.terminology_dir / OUT_DETECTION
    out_fp = args.terminology_dir / OUT_FALSE_POSITIVES

    # 寫詞表
    with open(out_detection, "w", encoding="utf-8", newline="\n") as f:
        f.write("# Generated by scripts/core/extract-china-terms.py — DO NOT EDIT MANUALLY\n")
        f.write("# Source: data/terminology/*.yaml (detection blocks)\n")
        f.write("# Format: cterm\\tseverity\\ttaiwan\\tfork_type\n")
        f.write("# severity: A=紅燈（必換，計入分數）/ B=黃燈（提示但不計分）\n")
        f.write("#\n")
        for t in terms:
            f.write(f"{t['cterm']}\t{t['severity']}\t{t['taiwan']}\t{t['fork_type']}\n")

    # 寫 false_positives
    with open(out_fp, "w", encoding="utf-8", newline="\n") as f:
        f.write(
            "# Generated by scripts/core/extract-china-terms.py — DO NOT EDIT MANUALLY\n"
        )
        f.write("# Source: data/terminology/*.yaml (detection.false_positives)\n")
        f.write("# Format: cterm\\tpattern\\tnote\n")
        f.write("# 任何在文章中出現「pattern」的計數，會扣除「cterm」的命中數。\n")
        f.write("#\n")
        for t in terms:
            for pattern, note in t["false_positives"]:
                f.write(f"{t['cterm']}\t{pattern}\t{note}\n")

    # 統計
    n_red = sum(1 for t in terms if t["severity"] == "A")
    n_yellow = sum(1 for t in terms if t["severity"] == "B")
    n_fps = sum(len(t["false_positives"]) for t in terms)

    if not args.quiet:
        print(f"從 {len(yaml_files)} 個 YAML 抽出 detection 規則")
        print(f"   - 紅燈（severity A）：{n_red}")
        print(f"   - 黃燈（severity B）：{n_yellow}")
        print(f"   - false_positives：{n_fps}")
        print(f"寫入：")
        print(f"   - {out_detection}")
        print(f"   - {out_fp}")
    else:
        print(f"china-terms: {n_red}A + {n_yellow}B, {n_fps} fps -> 2 TSV files")

    sys.exit(0)


if __name__ == "__main__":
    main()
