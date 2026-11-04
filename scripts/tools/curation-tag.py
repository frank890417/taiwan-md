#!/usr/bin/env python3
"""curation-tag.py — 查證狀態欄位批次/單檔設定工具。

設計 canonical：reports/design-curation-tier-2026-08-04.md
用法：
  python3 scripts/tools/curation-tag.py --set incubating --files list.txt          # dry-run
  python3 scripts/tools/curation-tag.py --set incubating --files list.txt --apply
  python3 scripts/tools/curation-tag.py --set verified knowledge/People/某人.md --apply
  python3 scripts/tools/curation-tag.py --set incubating --reason thin --files list.txt --apply

行為：
  - frontmatter 無 curation 欄位 → 在 closing --- 前插入
  - 已有 curation → 更新值
  - --set incubating 時，featured: true 一併改 false（incubating 不進精選，互斥由
    article-health curation-consistency check 看守）
  - --reason unverified|thin（只配 --set incubating）：寫 `curationReason`，文章頁與卡片依它
    選說明條文案（待查證／待擴寫，2026-11-04 全站普查 §五.5）。插在 curation 那行正下方；
    已有就更新。沒給 --reason 時不動既有的 curationReason（舊 342 篇缺欄位，顯示預設「待查證」）
  - --set verified 會一併拿掉 curationReason（轉正後說明條不再顯示，留著就是過期欄位，
    curation-consistency 會 WARN）
  - 文字級編輯，不重排 YAML；檔案不存在或無 frontmatter 一律 fail-loud 列出
"""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

VALID = {'verified', 'incubating'}
REASONS = {'unverified', 'thin'}


def process(path: Path, value: str, apply: bool, reason: str | None = None) -> str:
    text = path.read_text(encoding='utf-8')
    if not text.startswith('---'):
        return 'NO_FRONTMATTER'
    end = text.find('\n---', 3)
    if end == -1:
        return 'BROKEN_FRONTMATTER'
    fm = text[: end + 1]  # 含 opening --- 到 closing 前一行
    body = text[end + 1 :]  # 從 closing --- 行開始

    actions = []
    if re.search(r'^curation:', fm, flags=re.M):
        new_fm, n = re.subn(r"^curation:.*$", f"curation: {value}", fm, flags=re.M)
        if new_fm != fm:
            actions.append(f'update curation → {value}')
        fm = new_fm
    else:
        fm = fm.rstrip('\n') + f'\ncuration: {value}\n'
        actions.append(f'insert curation: {value}')

    if value == 'incubating' and reason:
        if re.search(r'^curationReason:', fm, flags=re.M):
            new_fm = re.sub(r"^curationReason:.*$", f"curationReason: {reason}", fm, flags=re.M)
            if new_fm != fm:
                actions.append(f'update curationReason → {reason}')
            fm = new_fm
        else:
            fm = re.sub(r"^(curation:.*)$", rf"\1\ncurationReason: {reason}", fm, count=1, flags=re.M)
            actions.append(f'insert curationReason: {reason}')
    elif value == 'verified' and re.search(r'^curationReason:', fm, flags=re.M):
        fm = re.sub(r"^curationReason:.*\n", '', fm, flags=re.M)
        actions.append('remove curationReason')

    if value == 'incubating' and re.search(r"^featured:\s*true\s*$", fm, flags=re.M):
        fm = re.sub(r"^featured:\s*true\s*$", 'featured: false', fm, flags=re.M)
        actions.append('featured true → false')

    if not actions:
        return 'NOOP'
    if apply:
        path.write_text(fm + body, encoding='utf-8')
    return ' / '.join(actions)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--set', dest='value', required=True, choices=sorted(VALID))
    ap.add_argument('--reason', choices=sorted(REASONS),
                    help='說明條種類（只配 --set incubating）：unverified＝待查證、thin＝待擴寫')
    ap.add_argument('--files', help='名單檔（每行一個 repo-relative 路徑）')
    ap.add_argument('paths', nargs='*', help='直接給檔案路徑')
    ap.add_argument('--apply', action='store_true', help='實際寫入（缺省 dry-run）')
    ap.add_argument('--limit', type=int, help='只處理前 N 檔（dry-run 抽檢用）')
    args = ap.parse_args()
    if args.reason and args.value != 'incubating':
        ap.error('--reason 只能配 --set incubating')

    targets = list(args.paths)
    if args.files:
        targets += [
            ln.strip()
            for ln in Path(args.files).read_text(encoding='utf-8').splitlines()
            if ln.strip() and not ln.strip().startswith('#')
        ]
    if args.limit:
        targets = targets[: args.limit]
    if not targets:
        sys.exit('no targets')

    mode = 'APPLY' if args.apply else 'DRY-RUN'
    ok = missing = 0
    for t in targets:
        p = Path(t)
        if not p.is_file():
            print(f'❌ MISSING  {t}')
            missing += 1
            continue
        result = process(p, args.value, args.apply, args.reason)
        if result in ('NO_FRONTMATTER', 'BROKEN_FRONTMATTER'):
            print(f'❌ {result}  {t}')
            missing += 1
            continue
        ok += 1
        print(f'✅ {result}  {t}')
    print(f'\n[{mode}] ok={ok} problems={missing} total={len(targets)}')
    sys.exit(1 if missing else 0)


if __name__ == '__main__':
    main()
