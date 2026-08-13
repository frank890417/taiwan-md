#!/usr/bin/env python3
"""
terminology-prose-fix.py
Taiwan.md 用語全站修正：A 類中國用語 → 台灣用語
（2026-05-04 audit O5 從 terminology-fix.py 改名 — scope 是文章 prose，不是 YAML 詞庫資料）
"""

import os
import re
import sys
from pathlib import Path
from collections import defaultdict

# ──────────────────────────────────────────────
# 設定
# ──────────────────────────────────────────────

# BASE_DIR derives from script location (was hardcoded, fixed 2026-05-04 audit O5).
BASE_DIR = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(BASE_DIR / "scripts" / "tools"))
from lib.article_health.langs import TRANSLATION_LANGS  # noqa: E402

SCAN_DIRS = [
    BASE_DIR / "knowledge",
    BASE_DIR / "src" / "content" / "zh-TW",
]

# 排除文件（完整路徑的 suffix，用 endswith 比對）
EXCLUDE_PATHS = {
    "knowledge/Culture/台灣華語的演化.md",
    "knowledge/Culture/台灣外來語與語言接觸.md",
    "src/content/zh-TW/culture/台灣華語的演化.md",
    "src/content/zh-TW/culture/台灣外來語與語言接觸.md",
}

# 排除翻譯目錄（在 knowledge/ 底下）
EXCLUDE_SUBDIRS = set(TRANSLATION_LANGS)

# ──────────────────────────────────────────────
# A 類替換：直接替換，無語境判斷
# ──────────────────────────────────────────────

A_REPLACEMENTS = [
    ('視頻',    '影片'),
    ('軟件',    '軟體'),
    ('硬件',    '硬體'),
    ('博主',    '部落客'),
    ('點贊',    '按讚'),
    ('互聯網',  '網際網路'),
    ('內存',    '記憶體'),
    ('人工智能','人工智慧'),
    ('操作系統','作業系統'),
    ('信息',    '資訊'),
    ('服務器',  '伺服器'),
    ('屏幕',    '螢幕'),
    ('打印',    '列印'),
    ('盒飯',    '便當'),
    ('出租車',  '計程車'),
    ('移動設備','行動裝置'),
    ('移動支付','行動支付'),
    ('移動端',  '行動端'),
    ('用戶',    '使用者'),
    ('賬號',    '帳號'),
    ('賬戶',    '帳戶'),
    ('代碼',    '程式碼'),
    ('大數據',  '大資料'),
    ('雲計算',  '雲端運算'),
    ('下載量',  '下載次數'),
    ('手機APP', '手機 App'),
]

# 數據庫 先處理（優先於 數據 → 資料）
# 算法 → 演算法
# 網絡 → 網路

# 「程序」前面的詞如果出現在這個集合，就不替換
PROCEDURE_PREFIXES = re.compile(
    r'(行政|法律|申請|通關|審查|投資審查|標準作業|司法|必經|正當|訴訟|醫療|選舉|立法|修法|入境|核准|核定|行政救濟|正式|法定|認證|許可|繳費|報名|公文|招標)'
)

# 物理語境關鍵字：有這些就不替換「質量」
PHYSICS_KEYWORDS = re.compile(r'(物理|公斤|kg|KG|重力|質能|守恆|力學|慣性|密度|牛頓)')


def is_excluded(path: Path) -> bool:
    """判斷是否在排除清單中"""
    rel = str(path.relative_to(BASE_DIR))
    # 正規化路徑分隔符
    rel = rel.replace("\\", "/")
    return rel in EXCLUDE_PATHS


def is_in_translation_subdir(path: Path) -> bool:
    """檢查是否在已註冊的翻譯子目錄。"""
    parts = path.parts
    for excl in EXCLUDE_SUBDIRS:
        if excl in parts:
            return True
    return False


def apply_a_class(text: str) -> tuple[str, int]:
    """A 類直接替換，回傳 (新文字, 替換次數)"""
    count = 0
    for src, dst in A_REPLACEMENTS:
        n = text.count(src)
        if n:
            text = text.replace(src, dst)
            count += n
    return text, count


def replace_shuzi(text: str) -> tuple[str, int]:
    """數據 → 資料（保留「數據機」）"""
    # 先保護「數據機」
    placeholder = "\x00MODEM\x00"
    text = text.replace("數據機", placeholder)
    # 數據庫 → 資料庫
    count = 0
    n = text.count("數據庫")
    if n:
        text = text.replace("數據庫", "資料庫")
        count += n
    n = text.count("數據")
    if n:
        text = text.replace("數據", "資料")
        count += n
    # 還原
    text = text.replace(placeholder, "數據機")
    return text, count


def replace_wangluo(text: str) -> tuple[str, int]:
    """網絡 → 網路"""
    n = text.count("網絡")
    if n:
        text = text.replace("網絡", "網路")
    return text, n


def replace_suanfa(text: str) -> tuple[str, int]:
    """算法 → 演算法（避免重複：已是「演算法」的不重複替換）"""
    # 先保護「演算法」
    placeholder = "\x00ALGO\x00"
    text = text.replace("演算法", placeholder)
    n = text.count("算法")
    if n:
        text = text.replace("算法", "演算法")
    text = text.replace(placeholder, "演算法")
    return text, n


def replace_chengxu_line(line: str) -> tuple[str, int]:
    """
    程序 → 程式（按行處理，需語境判斷）
    只替換「程序化」「程序導向」「程序式」，
    且行中「程序」前無行政/法律等前綴。
    """
    count = 0

    # 先處理明確的程式語法用語
    for pattern, replacement in [
        ("程序化", "程式化"),
        ("程序導向", "程式導向"),
        ("程序式", "程式式"),
    ]:
        n = line.count(pattern)
        if n:
            line = line.replace(pattern, replacement)
            count += n

    # 剩下的「程序」：若前有行政程序類詞則不動
    # 用 re.sub 逐個判斷
    def maybe_replace(m):
        nonlocal count
        start = m.start()
        # 取前 10 個字元做語境
        prefix = line[max(0, start - 10):start]
        if PROCEDURE_PREFIXES.search(prefix):
            return "程序"  # 保留
        count += 1
        return "程式"

    line = re.sub("程序", maybe_replace, line)
    return line, count


def replace_zhiliang_line(line: str) -> tuple[str, int]:
    """
    質量 → 品質（按行處理，物理語境不換）
    """
    if "質量" not in line:
        return line, 0
    # 若行中有物理關鍵字，整行不換
    if PHYSICS_KEYWORDS.search(line):
        return line, 0
    n = line.count("質量")
    line = line.replace("質量", "品質")
    return line, n


def replace_boke_line(line: str) -> tuple[str, int]:
    """
    博客 → 部落客（保留「博客來」）
    """
    if "博客" not in line:
        return line, 0
    placeholder = "\x00BOOKS\x00"
    line = line.replace("博客來", placeholder)
    n = line.count("博客")
    if n:
        line = line.replace("博客", "部落客")
    line = line.replace(placeholder, "博客來")
    return line, n


def process_file(path: Path) -> dict:
    """處理單一文件，回傳統計資料"""
    try:
        original = path.read_text(encoding="utf-8")
    except Exception as e:
        return {"error": str(e)}

    lines = original.splitlines(keepends=True)
    new_lines = []
    stats = defaultdict(int)

    for line in lines:
        # A 類替換（整行）
        line, n = apply_a_class(line)
        stats["A類"] += n

        # 數據
        line, n = replace_shuzi(line)
        stats["數據→資料"] += n

        # 網絡
        line, n = replace_wangluo(line)
        stats["網絡→網路"] += n

        # 算法
        line, n = replace_suanfa(line)
        stats["算法→演算法"] += n

        # 程序（逐行語境判斷）
        line, n = replace_chengxu_line(line)
        stats["程序→程式"] += n

        # 質量（逐行物理語境判斷）
        line, n = replace_zhiliang_line(line)
        stats["質量→品質"] += n

        # 博客（保留博客來）
        line, n = replace_boke_line(line)
        stats["博客→部落客"] += n

        new_lines.append(line)

    new_content = "".join(new_lines)

    total = sum(stats.values())
    if total > 0:
        path.write_text(new_content, encoding="utf-8")

    return {"total": total, "details": dict(stats)}


def collect_files() -> list[Path]:
    """收集所有需要處理的 .md 文件"""
    files = []
    for scan_dir in SCAN_DIRS:
        if not scan_dir.exists():
            continue
        for md in scan_dir.rglob("*.md"):
            if is_excluded(md):
                continue
            if is_in_translation_subdir(md):
                # 只在 knowledge/ 下排除翻譯子目錄
                if scan_dir == BASE_DIR / "knowledge":
                    continue
            files.append(md)
    return sorted(files)


def main():
    files = collect_files()
    print(f"📂 掃描文件數：{len(files)}")
    print()

    total_files_changed = 0
    total_replacements = 0
    category_totals = defaultdict(int)
    changed_files = []

    for path in files:
        result = process_file(path)
        if "error" in result:
            print(f"  ❌ 錯誤：{path.relative_to(BASE_DIR)} — {result['error']}")
            continue
        n = result["total"]
        if n > 0:
            total_files_changed += 1
            total_replacements += n
            rel = str(path.relative_to(BASE_DIR))
            changed_files.append((rel, n, result["details"]))
            for k, v in result["details"].items():
                category_totals[k] += v

    # 輸出報告
    print("=" * 60)
    print("📊 修正報告")
    print("=" * 60)
    print(f"✅ 修改文件數：{total_files_changed} / {len(files)}")
    print(f"✅ 總替換次數：{total_replacements}")
    print()
    print("📈 各類別替換統計：")
    for cat, n in sorted(category_totals.items(), key=lambda x: -x[1]):
        print(f"  {cat:15s}: {n:5d} 處")
    print()
    print("📝 修改文件清單（含替換數）：")
    for rel, n, details in sorted(changed_files, key=lambda x: -x[1]):
        detail_str = ", ".join(f"{k}:{v}" for k, v in details.items() if v > 0)
        print(f"  [{n:4d}] {rel}")
        if detail_str:
            print(f"         └─ {detail_str}")
    print()
    print("✅ 完成！（未 commit、未 push）")


if __name__ == "__main__":
    main()
