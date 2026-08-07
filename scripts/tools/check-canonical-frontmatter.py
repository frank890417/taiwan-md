#!/usr/bin/env python3
"""
check-canonical-frontmatter.py — Canonical 文件 frontmatter 擋頭

per MANIFESTO §進化哲學第六條 — Frontmatter 是品質基礎建設
per ANATOMY §Canonical 文件 frontmatter (schema spec)

對 docs/semiont/, docs/pipelines/, docs/editorial/, docs/factory/, BECOME_TAIWANMD.md,
CLAUDE.md 範圍下的 .md 檔強制 frontmatter 規範:
- 必填七欄齊全
- type / status / apoptosis 取值在合法 enum 內
- archived 必有 superseded_by
- sub-canonical 必有 parent_canonical

Usage:
    python3 scripts/tools/check-canonical-frontmatter.py [files...]
    python3 scripts/tools/check-canonical-frontmatter.py --all
    python3 scripts/tools/check-canonical-frontmatter.py --staged

Exit code: 0 = pass, 1 = violation found
"""

import argparse
import re
import subprocess
import sys
from pathlib import Path

# Windows cp950 console 強制 UTF-8（不影響 Linux/macOS）
if sys.stdout.encoding and sys.stdout.encoding.lower() not in ("utf-8", "utf8"):
    sys.stdout.reconfigure(encoding="utf-8")
    sys.stderr.reconfigure(encoding="utf-8")

REPO_ROOT = Path(__file__).resolve().parent.parent.parent

REQUIRED_FIELDS = [
    'title', 'description', 'type', 'status',
    'current_version', 'last_updated', 'last_session',
]

VALID_TYPES = {
    'cognitive-organ', 'cognitive-state', 'cognitive-log', 'cognitive-buffer',
    'pipeline-canonical', 'pipeline-sub-canonical',
    'editorial-canonical', 'factory-canonical',
    'bootloader', 'index', 'migration-doc',
}

VALID_STATUS = {'canonical', 'buffer', 'log', 'archived', 'draft'}
VALID_APOPTOSIS = {'never', 'candidate', 'archived'}

# (cognitive-organ / cognitive-buffer / cognitive-log) types require apoptosis
TYPES_REQUIRING_APOPTOSIS = {
    'cognitive-organ', 'cognitive-state', 'cognitive-log',
    'cognitive-buffer', 'bootloader', 'index',
}

# Top-level canonical paths (only direct .md children, NOT subfolder data)
# Subfolders like docs/factory/SPORE-BLUEPRINTS/, docs/factory/SPORE-HARVESTS/,
# docs/semiont/memory/, docs/semiont/diary/, reports/research/ are content
# artifacts, not canonical SOP — scope MUST exclude them.
COVERED_DIRS_TOPLEVEL = [
    'docs/semiont',
    'docs/pipelines',
    'docs/editorial',
    'docs/factory',
]
# Sub-canonical subdirs that DO follow rules (manually allowlisted)
COVERED_SUBDIRS = [
    'docs/pipelines/rewrite',
]
COVERED_FILES = ['BECOME_TAIWANMD.md', 'CLAUDE.md']


def is_covered(filepath: Path) -> bool:
    """Whether this file is subject to frontmatter rules.

    Only top-level .md in COVERED_DIRS_TOPLEVEL + allowlisted subdirs in
    COVERED_SUBDIRS + standalone bootloader files. Excludes session data
    artifacts (memory/, diary/) and content artifacts (SPORE-BLUEPRINTS/,
    SPORE-HARVESTS/, factory subdirs).
    """
    rel = filepath.relative_to(REPO_ROOT) if filepath.is_absolute() else filepath
    rel_str = str(rel)
    if rel_str in COVERED_FILES:
        return True
    if not rel_str.endswith('.md'):
        return False
    parent = str(Path(rel_str).parent)
    if parent in COVERED_DIRS_TOPLEVEL:
        return True
    if parent in COVERED_SUBDIRS:
        return True
    return False


def parse_frontmatter(content: str) -> tuple[dict | None, str | None]:
    """Parse YAML frontmatter. Returns (fields_dict, error_msg)."""
    if not content.startswith('---\n'):
        return None, 'no opening --- delimiter'
    end = content.find('\n---\n', 4)
    if end == -1:
        return None, 'no closing --- delimiter'
    fm_text = content[4:end]
    fields: dict = {}
    current_key: str | None = None
    current_list: list[str] | None = None
    for line in fm_text.split('\n'):
        if not line.strip():
            continue
        # List item under previous key
        if line.startswith('  - ') or line.startswith('  -'):
            if current_list is not None:
                val = line.lstrip(' -').strip().strip("'\"")
                current_list.append(val)
            continue
        # New key
        m = re.match(r"^([a-z_]+):\s*(.*)$", line)
        if not m:
            continue
        key, val = m.group(1), m.group(2).strip()
        current_key = key
        if val == '':
            # List or block scalar follows
            current_list = []
            fields[key] = current_list
        elif val == '[]':
            fields[key] = []
            current_list = None
        else:
            # Inline value
            fields[key] = val.strip("'\"")
            current_list = None
    return fields, None


def check_file(filepath: Path) -> list[str]:
    """Return list of violations for this file. Empty list = pass."""
    violations: list[str] = []
    try:
        content = filepath.read_text(encoding='utf-8')
    except Exception as e:
        return [f'cannot read: {e}']

    fields, err = parse_frontmatter(content)
    if err is not None:
        return [f'frontmatter missing or malformed: {err}']

    # Required fields
    for f in REQUIRED_FIELDS:
        if f not in fields or fields[f] in (None, '', []):
            violations.append(f'missing required field: {f}')

    # Type validity
    if 'type' in fields:
        if fields['type'] not in VALID_TYPES:
            violations.append(
                f"invalid type '{fields['type']}'; must be one of {sorted(VALID_TYPES)}"
            )

    # Status validity
    if 'status' in fields:
        if fields['status'] not in VALID_STATUS:
            violations.append(
                f"invalid status '{fields['status']}'; must be one of {sorted(VALID_STATUS)}"
            )

    # Apoptosis validity (when present)
    if 'apoptosis' in fields:
        if fields['apoptosis'] not in VALID_APOPTOSIS:
            violations.append(
                f"invalid apoptosis '{fields['apoptosis']}'; must be one of {sorted(VALID_APOPTOSIS)}"
            )

    # Apoptosis required for some types
    if fields.get('type') in TYPES_REQUIRING_APOPTOSIS:
        if 'apoptosis' not in fields:
            violations.append(
                f"type '{fields['type']}' requires apoptosis field"
            )

    # archived → status / apoptosis / superseded_by must align
    if fields.get('status') == 'archived':
        if fields.get('apoptosis') != 'archived':
            violations.append(
                "status='archived' requires apoptosis='archived' (lifecycle SSOT)"
            )
        if not fields.get('superseded_by'):
            violations.append(
                "status='archived' requires non-empty superseded_by"
            )
    if fields.get('apoptosis') == 'archived':
        if fields.get('status') != 'archived':
            violations.append(
                "apoptosis='archived' requires status='archived' (lifecycle SSOT)"
            )

    # sub-canonical must have parent_canonical
    if fields.get('type') == 'pipeline-sub-canonical':
        if not fields.get('parent_canonical'):
            violations.append(
                "type='pipeline-sub-canonical' requires parent_canonical field"
            )

    return violations


def get_staged_files() -> list[Path]:
    """Get currently staged .md files."""
    try:
        result = subprocess.run(
            ['git', 'diff', '--cached', '--name-only', '--diff-filter=ACM'],
            capture_output=True, text=True, check=True, cwd=REPO_ROOT,
        )
        return [REPO_ROOT / line for line in result.stdout.split('\n')
                if line.strip().endswith('.md')]
    except subprocess.CalledProcessError:
        return []


def get_all_covered_files() -> list[Path]:
    """All .md files in top-level covered dirs + sub-canonical dirs + bootloader."""
    files: list[Path] = []
    for d in COVERED_DIRS_TOPLEVEL + COVERED_SUBDIRS:
        files.extend((REPO_ROOT / d).glob('*.md'))  # glob (not rglob) = top-level only
    for f in COVERED_FILES:
        path = REPO_ROOT / f
        if path.exists():
            files.append(path)
    return files


def main() -> int:
    parser = argparse.ArgumentParser(description='Canonical frontmatter checker')
    parser.add_argument('files', nargs='*', help='specific files to check')
    parser.add_argument('--staged', action='store_true', help='check staged files')
    parser.add_argument('--all', action='store_true', help='check all covered files')
    parser.add_argument('--quiet', action='store_true', help='only print violations')
    args = parser.parse_args()

    if args.all:
        files = get_all_covered_files()
    elif args.staged:
        files = get_staged_files()
    elif args.files:
        files = [Path(f) if Path(f).is_absolute() else REPO_ROOT / f for f in args.files]
    else:
        # default: --staged behaviour for pre-commit hook
        files = get_staged_files()

    files = [f for f in files if f.exists() and is_covered(f)]

    if not files:
        if not args.quiet:
            print('✅ no canonical .md files in scope; nothing to check')
        return 0

    total_violations = 0
    fail_count = 0
    for f in files:
        violations = check_file(f)
        if violations:
            fail_count += 1
            total_violations += len(violations)
            rel = f.relative_to(REPO_ROOT) if f.is_absolute() else f
            print(f'❌ {rel}')
            for v in violations:
                print(f'   - {v}')
        elif not args.quiet:
            rel = f.relative_to(REPO_ROOT) if f.is_absolute() else f
            print(f'✅ {rel}')

    if fail_count > 0:
        print(
            f'\n💥 {fail_count}/{len(files)} files violate canonical frontmatter rules '
            f'({total_violations} violations).'
        )
        print(
            'Schema canonical: docs/semiont/ANATOMY.md §Canonical 文件 frontmatter\n'
            'Philosophy: docs/semiont/MANIFESTO.md §進化哲學第六條'
        )
        return 1

    print(f'\n✅ {len(files)} files pass canonical frontmatter rules.')
    return 0


if __name__ == '__main__':
    sys.exit(main())
