"""article_health.loader — file → FileTarget conversion.

Single canonical place for:
  - YAML frontmatter parsing
  - body extraction
  - protected-region detection (code / URL / HTML attr)
  - lang / category / slug derivation from path

Plugins should never re-parse the file — they consume FileTarget.
"""

from __future__ import annotations
import re
from pathlib import Path
from typing import Any

from .langs import TRANSLATION_LANGS
from .types import FileTarget


# Path patterns: knowledge/{Category}/{slug}.md (zh-TW) or
#               knowledge/{lang}/{Category}/{slug}.md (translations)
# 語言清單從註冊表 SSOT derive，不寫死（2026-07-18：pt 出生時此處寫死漏掉，
# knowledge/pt/ 被當成 zh-TW → cjk-punct 對葡文半形冒號報 31 hard，pre-commit 卡死；
# 「新語言出生感知系統不會自動更新」在 article-health loader 的復發）。
#
# 2026-07-24：原本 loader 自己有一份 `_load_lang_dirs()`，但 `parents[3]` 指到
# `scripts/src/config/languages.mjs`（少算一層，該路徑不存在），`except` 又把
# FileNotFoundError 吞掉 → registry 從來沒被讀到，一路靠寫死的保底清單在跑。
# 保底清單剛好是出生戰役當下的九語，所以看起來會動；第十個語言出生時一樣瞎。
# 現在改吃 langs.py 這個 SSOT bridge（路徑修正 + fail-loud selftest）。
_LANG_DIRS = TRANSLATION_LANGS

# Protected region patterns
_RE_FENCED_CODE = re.compile(r"```[\s\S]*?```", re.MULTILINE)
_RE_INLINE_CODE = re.compile(r"`[^`\n]+`")
# Link URL: `](...)` — exclude `)` AND newlines so a malformed link with
# fullwidth `）` instead of `)` doesn't eat across lines into the next link.
# 2026-05-04 黃魚鴞 incident showed `[^)]+` was running until the FAR-AWAY
# next halfwidth `)`, swallowing 5 lines and corrupting protected_regions.
_RE_MD_LINK_URL = re.compile(r"\]\([^)\n]+\)")
_RE_HTML_TAG = re.compile(r"<[^>\n]+>")
# Frontmatter delimiter
_RE_FRONTMATTER = re.compile(
    r"^---\s*\n(?P<yaml>.*?)\n---\s*\n(?P<body>.*)\Z",
    re.DOTALL,
)


def _strip_inline_comment(value: str) -> str:
    """去掉 YAML 行尾註解（` # ...`），但保留引號內的 `#`。

    YAML 裡 `#` 只有在「前面是空白或開頭」時才算註解起始；
    `a#b` 是字面值的一部分，`'a # b'` 引號裡的 `#` 也是字面值。

    沒有這一支的話，`terminology_exempt: true # article subject IS …`
    會被整段當成字串 `"true # article subject IS …"`，於是
    terminology 這道 check 以為沒設定豁免、照樣報「中國用語『視頻』」——
    **假陽性**：那篇文章的題材本來就是兩岸接觸詞，豁免是作者刻意寫的。
    """
    out: list[str] = []
    quote: str | None = None
    for ch in value:
        if quote:
            out.append(ch)
            if ch == quote:
                quote = None
            continue
        if ch in ("'", '"'):
            quote = ch
            out.append(ch)
            continue
        if ch == "#" and (not out or out[-1] in " \t"):
            break
        out.append(ch)
    return "".join(out).strip()


def _unquote_scalar(value: str) -> str:
    """脫掉成對的引號，並還原 YAML 單引號裡的 `''` 轉義。

    YAML 的單引號字串用 `''` 表示一個 `'`，所以 `'Hla''alua'` 的值是
    `Hla'alua`。先前這裡只做 `[1:-1]` 或 `.strip("'\\"")`，於是
    `title: 'Hla''alua: From "Southern Tsou"…'` 在沒有 PyYAML 的機器上
    會留下 `Hla''alua`——同一個檔，裝了 PyYAML 讀到一種標題、沒裝讀到另一種。

    `.strip("'\\"")` 另有一個問題：它剝除**兩端所有**引號字元，
    值本身以引號開頭或結尾時會被吃掉一層。改成只脫一對成對的引號。
    """
    v = value.strip()
    if len(v) >= 2 and v[0] == v[-1] and v[0] in ("'", '"'):
        body = v[1:-1]
        if v[0] == "'":
            body = body.replace("''", "'")
        return body
    return v


def _split_flow_items(inner: str) -> list[str]:
    """切 YAML flow sequence 的頂層逗號，不切在引號或巢狀括號裡面。

    舊寫法是 `re.split(r",(?![^\\[\\]]*\\])", inner)` 再逐項 strip 引號，
    它看不見引號，所以 `tags: ['拉阿魯哇族', 'Hla''alua, 聖貝祭, 原住民族, 族語復振']`
    被切成五項，而 PyYAML 讀到的是兩項（第二項是一個含逗號的字串）。
    這個分歧不會讓任何閘門變紅，但它讓「這台機器有沒有 PyYAML」
    變成 tags 內容的隱性變數——而這支 fallback 存在的理由，
    正是要讓兩條路徑讀出同一件事（REFLEXES #83 兩把尺）。
    """
    items: list[str] = []
    buf: list[str] = []
    quote: str | None = None
    depth = 0
    k = 0
    while k < len(inner):
        ch = inner[k]
        if quote:
            # 單引號裡的 `''` 是轉義的 `'`，不是字串結束。
            # 原樣留著，交給 _unquote_scalar 還原。
            if ch == quote == "'" and inner[k + 1 : k + 2] == "'":
                buf.append("''")
                k += 2
                continue
            buf.append(ch)
            if ch == quote:
                quote = None
            k += 1
            continue
        # 引號只有出現在「項目開頭」時才開啟 quoted scalar。
        # YAML 的 plain scalar 裡，詞中間的 `'` 是字面值：
        # `[jeux d'enfance, wang-a-piau]` 是兩項，不是一項未閉合的字串。
        # （跟 _strip_inline_comment 判 `#` 是同一條規則：看前面是不是空白。）
        if ch in ("'", '"') and not "".join(buf).strip():
            quote = ch
            buf.append(ch)
        elif ch in "[{":
            depth += 1
            buf.append(ch)
        elif ch in "]}":
            depth -= 1
            buf.append(ch)
        elif ch == "," and depth <= 0:
            items.append("".join(buf))
            buf = []
        else:
            buf.append(ch)
        k += 1
    items.append("".join(buf))
    return [s for s in (_unquote_scalar(x) for x in items) if s]


def _parse_frontmatter_minimal(yaml_text: str) -> dict[str, Any]:
    """Lightweight YAML frontmatter parser — handles the subset Taiwan.md uses.

    Not a full YAML parser. Falls back to PyYAML if installed, else uses
    a simple key: value parser for top-level scalar / list-on-one-line cases.
    Caller can pass already-parsed dict via FileTarget directly if richer
    parsing is needed.

    Supported:
      key: 'string'          → str
      key: "string"          → str
      key: bare-string       → str
      key: 2026-05-04        → str (date)
      key: true/false        → bool
      key: 12                → int
      key: ['a', 'b']        → list[str] (only single-line lists)
      key: [a, b, c]         → list[str]
      key:                  → list[str]  (multi-line flow array, see below)
        [
          'a',
          'b',
        ]

    Caller-side note: for our use cases (title/category/lang/slug/tags),
    this minimal parser is sufficient. Tests guard the surface area.
    """
    try:
        import yaml  # type: ignore[import-untyped]

        return yaml.safe_load(yaml_text) or {}
    except ImportError:
        pass

    out: dict[str, Any] = {}
    lines = yaml_text.splitlines()
    i = 0
    while i < len(lines):
        raw_line = lines[i]
        line = raw_line.rstrip()
        i += 1
        if not line or line.startswith("#"):
            continue
        m = re.match(r"^([A-Za-z][\w-]*):\s*(.*)$", line)
        if not m:
            continue
        key, val = m.group(1), m.group(2).strip()
        # 行尾註解先去掉（`key: value # comment`）。
        # 不先去的話，`terminology_exempt: true # ...` 會被當成字串，
        # 連帶讓 terminology check 誤報中國用語。
        val = _strip_inline_comment(val)

        # ── flow array：`[` 開頭（同行或下一行），掃到配對的 `]` ──
        # 必須在 `if not val:` **之前**判斷，因為有兩種形狀：
        #   tags: ['a', 'b']        → val 整段在同一行
        #   tags: [                 → val = '['，元素在後續幾行
        #     'a',
        #   ]
        if val.startswith("["):
            start_line = i - 1
            first = val
            buf: list[str] = [first]
            depth = 0
            closed = False
            j = start_line
            while j < len(lines):
                chunk = lines[j].strip()
                if chunk:
                    depth += chunk.count("[") - chunk.count("]")
                    if j > start_line:
                        buf.append(chunk)
                if depth <= 0 and "]" in chunk:
                    closed = True
                    break
                j += 1
            if closed:
                joined = " ".join(buf)
                inner = joined[joined.index("[") + 1 : joined.rindex("]")]
                out[key] = _split_flow_items(inner)
                i = j + 1
                continue

        if not val:
            # 空值 → 後面可能是四種形狀之一：
            #   (a) 跨行的 flow array      `tags:` → `  ['a', 'b']` 或 `  [` … `]`
            #   (b) 同行的 flow array 開頭  `tags: [` → 下一行起是元素
            #   (c) block sequence         `relatedDiary:` → `  - 2026-06-19-...`
            #   (d) 一級 nested mapping     `rationale:` → `  whats_excluded:` …
            #
            # 這四支都是必要的：全庫有 11,085 個 zh-TW 檔的 `tags` 寫成
            # prettier 折行後的樣子，另有數百個檔用 block sequence 與 nested mapping。
            # 沒有這些支的話，fallback parser 會把 `tags` 判成空字串 ""，
            # 於是 frontmatter-format 這道 check 報
            # 「frontmatter `tags` 必須是 YAML array，不可為字串」——**硬失敗**，
            # 而且是 11,085 個檔案一起紅。這是**假陽性**：文章本身完全正確，
            # 紅的是「這台機器沒有 PyYAML」。
            #
            # 這件事在 CI 也會發生：pr-frontmatter-gate.yml 註解寫
            # 「article-health.py 是純 stdlib，不需 pip install」——而 ubuntu 的
            # python3 確實沒有 PyYAML。也就是說 CI 一直跑的就是這條 fallback 路徑。
            #
            # 讀法 (a)/(b)：從 `[` 開始一路掃到配對的 `]`，期間的元素以逗號分隔。
            # 讀法 (c)：收 `- ` 開頭的縮排行。
            # 讀法 (d)：收縮排的 `key: value`（含更深一層的 `- ` 項）。
            # 找不到配對的 `]`（malformed）→ 退回舊行為（視為空值），
            # 讓這條 fallback 之外還有一道 safety net。

            # ── (a)/(b) flow array 已在上面統一處理（val 以 '[' 開頭）──
            # 這裡處理的是 `key:` 換行後才出現 `[` 的形狀：
            #     tags:
            #       [
            #         'a',
            #       ]
            if i < len(lines) and lines[i].strip().startswith("["):
                j = i
                buf2: list[str] = []
                depth = 0
                closed = False
                while j < len(lines):
                    chunk = lines[j].strip()
                    if chunk:
                        depth += chunk.count("[") - chunk.count("]")
                    buf2.append(chunk)
                    if depth <= 0 and "]" in chunk:
                        closed = True
                        break
                    j += 1
                if closed:
                    joined = " ".join(buf2)
                    inner = joined[joined.index("[") + 1 : joined.rindex("]")]
                    out[key] = _split_flow_items(inner)
                    i = j + 1
                    continue

            # ── (c) block sequence（含 dict 項）──
            if i < len(lines) and re.match(r"^\s+-\s", lines[i]):
                seq: list[Any] = []
                j = i
                while j < len(lines):
                    item_line = lines[j].rstrip()
                    if not item_line.strip():
                        j += 1
                        continue
                    item_m = re.match(r"^\s+-\s+(.*)$", item_line)
                    if not item_m:
                        break
                    seq.append(_unquote_scalar(item_m.group(1).strip()))
                    j += 1
                out[key] = seq
                i = j
                continue

            # ── (d) nested mapping（含更深一層的 sequence）──
            #
            # 子鍵的縮排**不固定**：有的是 2 空格（prettier 折行過的
            # `rationale:` → `  whats_excluded:`），有的是**完全頂格**：
            #
            #     rationale:
            #     why_this_hook: '以 2026 年 5 月新莊宏匯廣場清晨排隊的真實畫面開場…'
            #     whats_excluded: '不寫各世代動畫劇情細節…'
            #
            # 頂格那種是合法的 YAML（mapping 的子鍵可以跟父鍵同縮排），
            # 但如果只在這裡認「有縮排的子鍵」，頂格那種會被解析成空字串 "",
            # 於是 rationale-presence 這道 check 報
            # 「frontmatter `rationale` 必須是 YAML mapping (nested keys)」——硬失敗。
            #
            # 認列的判準：**看這個 key 是不是父 key 認得的子鍵集合**。
            # rationale 的四個子鍵是 well-known 的（why_this_hook /
            # whats_excluded / where_it_hedges / whos_pushing_back），
            # 用它們當白名單就不會誤把後續的**同層** key 吃進來。
            _RATIONALE_CHILDREN = {
                "why_this_hook",
                "whats_excluded",
                "where_it_hedges",
                "whos_pushing_back",
            }
            nested: dict[str, Any] = {}
            while i < len(lines):
                peek = lines[i]
                peek_stripped = peek.rstrip()
                if not peek_stripped:
                    i += 1
                    continue
                child_m = re.match(
                    r"^\s*([A-Za-z_][\w-]*):\s*(.*)$", peek_stripped
                )
                if not child_m:
                    break
                ckey = child_m.group(1)
                cval = _strip_inline_comment(child_m.group(2).strip())
                # 頂格的 key 只有在它是父 key 的 known child 時才算子鍵；
                # 否則它是**同層的下一個 key**，這個 nested mapping 到此結束。
                if not peek.startswith((" ", "\t")) and (
                    key != "rationale" or ckey not in _RATIONALE_CHILDREN
                ):
                    break
                nested[ckey] = _unquote_scalar(cval)
                i += 1
                # nested key 的值可能是 block sequence：
                #     rationale:
                #       whats_excluded:
                #         - '韓國 hagwon 系統性指派英文名'
                #         - '星巴克英文名點餐「全民日常」'
                # 收掉這些 `- ` 行，存成 list。
                while i < len(lines):
                    seq_line = lines[i]
                    if not seq_line.strip():
                        i += 1
                        continue
                    seq_m = re.match(r"^\s+-\s+(.*)$", seq_line.rstrip())
                    if not seq_m:
                        break
                    sval = _unquote_scalar(seq_m.group(1).strip())
                    if not isinstance(nested[ckey], list):
                        nested[ckey] = []
                    nested[ckey].append(sval)
                    i += 1
            out[key] = nested if nested else ""
            continue
        # List: [a, b, c] or ['a', 'b']（單行、完整閉合；跨行版本在上面處理）
        if val.startswith("[") and val.endswith("]"):
            out[key] = _split_flow_items(val[1:-1].strip())
            continue
        # Quoted string
        if (val.startswith("'") and val.endswith("'")) or (
            val.startswith('"') and val.endswith('"')
        ):
            out[key] = _unquote_scalar(val)
            continue
        # Bool
        if val == "true":
            out[key] = True
            continue
        if val == "false":
            out[key] = False
            continue
        # Int
        if val.isdigit():
            out[key] = int(val)
            continue
        # Bare string (date, plain text)
        out[key] = val
    return out


def _detect_protected_regions(body: str) -> list[tuple[int, int, str]]:
    """Find regions where punctuation/text rules should NOT apply.

    Order matters — fenced code first (greedy multi-line), then inline patterns.
    Returns sorted, non-overlapping list of (start, end, kind).
    """
    regions: list[tuple[int, int, str]] = []
    masked = list(body)
    placeholder = "\x00"  # avoid re-matching inside

    def _add_and_mask(pattern: re.Pattern, kind: str) -> None:
        for m in pattern.finditer("".join(masked)):
            regions.append((m.start(), m.end(), kind))
            for i in range(m.start(), m.end()):
                if i < len(masked):
                    masked[i] = placeholder

    # Fenced code blocks: greedy ```...```
    _add_and_mask(_RE_FENCED_CODE, "fenced-code")
    # Inline code spans: `...` (single line)
    _add_and_mask(_RE_INLINE_CODE, "inline-code")
    # Markdown link URLs: ](url) — protects URL only, not anchor text
    _add_and_mask(_RE_MD_LINK_URL, "link-url")
    # HTML tags: <...> (single line)
    _add_and_mask(_RE_HTML_TAG, "html-tag")

    return sorted(regions, key=lambda r: r[0])


def _detect_sections(body: str) -> dict[str, tuple[int, int]]:
    """Detect canonical section boundaries: 延伸閱讀 / 參考資料 / 圖片來源.

    Returns name → (start, end) byte offsets in body coords. Used by plugins
    that need to treat these regions specially (per 2026-05-04 黃魚鴞 lesson:
    these sections contain markdown link URLs that must stay half-width
    even in zh-TW context).

    Section boundaries:
      - Start: first occurrence of `**延伸閱讀**` or `## 延伸閱讀` etc.
      - End: next h2/h3 header OR end-of-file.
    """
    section_starts = [
        ("further-reading", re.compile(r"^(?:##\s*延伸閱讀|\*\*延伸閱讀\*\*[：:])", re.MULTILINE)),
        ("references", re.compile(r"^##\s*參考資料", re.MULTILINE)),
        ("image-sources", re.compile(r"^##\s*圖片來源", re.MULTILINE)),
    ]
    # Find all candidate section start positions
    starts: list[tuple[int, str]] = []
    for name, pattern in section_starts:
        m = pattern.search(body)
        if m:
            starts.append((m.start(), name))
    # Also find ALL h2 positions to use as section boundaries
    h2_positions = [m.start() for m in re.finditer(r"^##\s", body, re.MULTILINE)]
    sections: dict[str, tuple[int, int]] = {}
    for start, name in starts:
        # Find next boundary: next h2 after this start, or end of body
        next_h2 = next((p for p in h2_positions if p > start), len(body))
        sections[name] = (start, next_h2)
    return sections


def _derive_meta_from_path(path: Path) -> tuple[str, str, str]:
    """Returns (lang, category, slug) from knowledge/... path."""
    parts = path.parts
    try:
        idx = parts.index("knowledge")
    except ValueError:
        # dispatcher 隔離區的檔名是 `{lang}--{slug}.md`（verify-translation 的
        # detect_lang 早就認得）。2026-09-25 前這裡一律回 zh-TW，對隔離樣本跑
        # 健檢會讓中文標點規則打在印尼文、葡文上，診斷的人拿到一整排假的
        # cjk-punct，真正的失敗原因（幻覺 wikilink、腳註格式）被埋在後面。
        m = re.fullmatch(r"([a-z]{2})--(.+)", path.stem)
        if m and m.group(1) in _LANG_DIRS:
            return (m.group(1), "", m.group(2))
        return ("zh-TW", "", path.stem)
    rest = parts[idx + 1 :]
    if not rest:
        return ("zh-TW", "", path.stem)
    if rest[0] in _LANG_DIRS:
        lang = rest[0]
        category = rest[1] if len(rest) >= 2 else ""
    else:
        lang = "zh-TW"
        category = rest[0]
    slug = path.stem
    return (lang, category, slug)


def load_target(path: Path | str) -> FileTarget:
    """Read file, parse frontmatter, prep protected regions, return FileTarget.

    `body` is padded with leading blank lines equal to the frontmatter line
    count, so any line number computed from `body` matches the original file's
    line number. This keeps every plugin's reported line numbers correct
    without each plugin needing to track a frontmatter offset.
    """
    p = Path(path)
    text = p.read_text(encoding="utf-8")
    fm: dict[str, Any] = {}
    fm_raw = ""
    body = text
    body_text_offset = 0
    pad_lines = 0
    m = _RE_FRONTMATTER.match(text)
    if m:
        fm_raw = m.group("yaml")
        fm = _parse_frontmatter_minimal(fm_raw)
        body_text_offset = m.start("body")
        # Count newlines in the frontmatter section (including the two ---
        # delimiter lines) so body's first content line aligns with the
        # original file line number.
        frontmatter_span = text[:body_text_offset]
        pad_lines = frontmatter_span.count("\n")
        body = ("\n" * pad_lines) + m.group("body")
    lang, category, slug = _derive_meta_from_path(p)
    regions = _detect_protected_regions(body)
    sections = _detect_sections(body)
    return FileTarget(
        path=p,
        text=text,
        frontmatter=fm,
        frontmatter_raw=fm_raw,
        body=body,
        body_text_offset=body_text_offset,
        body_pad_lines=pad_lines,
        lang=lang,
        category=category,
        slug=slug,
        protected_regions=regions,
        sections=sections,
    )
