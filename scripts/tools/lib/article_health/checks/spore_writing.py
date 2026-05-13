r"""spore_writing — SPORE-specific writing rules instrumentation.

Direction D from reports/spore-pipeline-evolution-plan-2026-05-08.md:
    把 SPORE-WRITING.md 的 prose 規則從「提醒 + 信任 AI 自律」升級為
    plugin gate (REFLEXES #15 第 N 次驗證：memory 是自律，pipeline 才是閘門).

Rules implemented (regex-only, Wave 1 + Wave 2):
  Wave 1 (initial ship 2026-05-08):
  - 編年體 lead 病 (Rule #15, 高鐵 s35 教訓)
    第一行 prose 開頭不該是「YYYY 年 M 月 D 日，XXX」這種新聞 lead
    觸發：line 1 of body matches `^\d{4}\s*年` 或 `^\d{4}\.`
  - 引語倒裝 (Rule #9, 李洋 #28 教訓)
    `「XXX」他/她說` 這種沒場景的引語倒裝
    應改為「他在 [場景] 說：『XXX』」

  Wave 2 (evolve 2026-05-08 同 session, 從 spore 成效數據驗證):
  - 朋友 tone prime (Rule #14, 高鐵 s35 教訓 + 5 月份 hook tier 數據)
    第一行 prose 必須有 friend tone prefix（你知道嗎？/欸/直接人說話）
    或滿足 Tier 1b「具體 anchor + 反差 hook」開場
    觸發：第一行不是 prefix + 不是引語 + 不是具體場景 → WARN 提醒加 prefix
    跳過：blueprint table（已 covered）/ harvest log meta（covered）

APPLIES_TO 設計：
  路徑必須在 docs/factory/SPORE-BLUEPRINTS/ 或 docs/factory/SPORE-HARVESTS/
  其他文章的開頭可以是日期（時間軸型 D 模板就是合法的），所以這條規則不普適。

Future extensions (deferred):
  - Rule #16 Scene-List-Scene 結構 (need LLM-as-judge, not pure regex)
  - Rule #8 同名連用 ≥3 (token analysis, 需要中文斷詞)
  - Reach × accuracy retroactive trigger (不在 plugin scope, SPORE-VERIFY 文件層 SOP)

Canonical:
  - docs/factory/SPORE-WRITING.md §進階寫作技術
  - docs/factory/SPORE-VERIFY.md §§11 書寫節制閘
"""

from __future__ import annotations
import re
from typing import Any, Iterator

from ..types import FileTarget, Severity, Violation


CHECK_NAME = "spore-writing"
DIMENSION = "spore-prose"
DEFAULT_SEVERITY = Severity.HARD
EDITORIAL_REF = "SPORE-WRITING.md §進階寫作技術"
APPLIES_TO = ["zh-TW"]  # 孢子主要是中文 prose


# ── Rule #15: 編年體 lead 病 (chronicle lead) ────────────────────────────────
# 第一行不應該是「YYYY 年」「YYYY.MM.DD」這種新聞 lead 開頭
_RE_CHRONICLE_LEAD = re.compile(
    r"^\s*(?:\d{4}\s*年|\d{4}[/.\-]\d{1,2}[/.\-]\d{1,2}|\d{4}-\d{2}-\d{2})",
    re.MULTILINE,
)

# ── Rule #9: 引語倒裝（quote inversion） ────────────────────────────────────
# 「XXX」他說 / 「XXX」她說 / 「XXX」XXX 說
# 改為：他在 [場景] 留了一句話：『XXX』
_RE_QUOTE_INVERSION = re.compile(
    r"「[^」]{5,80}」[^\n。]{0,8}[他她][^\n。]{0,5}說",
)


# ── Rule #14: 朋友 tone prime（friend-tone curiosity prime） ─────────────────
# 孢子第一行必須有「朋友跟你講八卦」的 curiosity prime，不是新聞 lead
# 三種合格 prefix：
#   1. 「你知道嗎？」+ emoji
#   2. 「欸，」+ 具體事件片段
#   3. 直接人說話（引語開場 — hook 力夠強的 case）
#
# 不合格訊號：第一行像新聞 lead（「[人物/機構]+[動詞]」客觀敘事 sentence）
# 自動 skip 條件（避免誤觸發）：
#   - 開場是引語 「...」 → assume hook 強，OK
#   - 開場是 emoji → assume tone OK
#   - 開場是「你知道嗎」/「欸」/「身為台灣人」/「想像」 → 既有 friendly prefix
#   - 第一行 < 8 字 → 短句不適用（可能是 stat block）
_RE_FRIEND_PREFIX = re.compile(
    r"^\s*(?:你知道嗎|欸[，,]|身為台灣人|想像[一下你]|"
    r"如果(?:[你台]|[\d])|當[你你們]|"
    r"[「『\"]|[\U0001F300-\U0001F9FF\U0001F600-\U0001F64F])"
)
# 新聞 lead pattern: 「XX 年/月/日」開頭已被 Rule #15 抓
# 補抓：「機構 + 動詞」客觀敘事 開場 (e.g.「行政院宣布⋯⋯」「台灣高鐵簽下⋯⋯」)
_RE_NEWS_LEAD = re.compile(
    r"^\s*[一-鿿]{2,8}(?:宣布|表示|簽下|公布|成立|頒布|通過|裁決|"
    r"發表|主張|強調|指出|呼籲|批評|證實|否認|聲明|警告)"
)


def _is_spore_path(path: str) -> bool:
    """Check if file is a SPORE blueprint, harvest log, or ad-hoc draft.

    Path conventions:
      - docs/factory/SPORE-BLUEPRINTS/ (production blueprints)
      - docs/factory/SPORE-HARVESTS/ (production harvest logs)
      - /tmp/spore-* (ad-hoc draft testing — any tmp file with `spore-` prefix)
      - /tmp/...spore... (other ad-hoc paths containing "spore")
    """
    p_lower = str(path).lower()
    return (
        "SPORE-BLUEPRINTS" in path
        or "SPORE-HARVESTS" in path
        or "/spore-" in p_lower  # /tmp/spore-anything.md
        or p_lower.startswith("spore-")
        or p_lower.endswith("/spore.md")
    )


def _strip_frontmatter_and_meta(text: str) -> tuple[str, int]:
    """Return (body_text, body_start_line).

    Strips frontmatter (--- ... ---) and leading blank/heading lines so
    Rule #15 checks the first prose line, not the spore body's metadata header.
    """
    lines = text.split("\n")
    i = 0
    # Skip frontmatter
    if i < len(lines) and lines[i].strip() == "---":
        i += 1
        while i < len(lines) and lines[i].strip() != "---":
            i += 1
        if i < len(lines):
            i += 1  # skip closing ---
    # Skip blank lines + headings + blockquotes (>) so 第一行 = first prose line
    while i < len(lines) and (
        not lines[i].strip()
        or lines[i].strip().startswith("#")
        or lines[i].strip().startswith(">")
        or lines[i].strip().startswith("|")  # blueprint table rows
        or lines[i].strip().startswith("- ")  # bullet
        or lines[i].strip().startswith("**")  # bold inline meta like **Angle**: ...
    ):
        i += 1
    return ("\n".join(lines[i:]), i)


def check(target: FileTarget, config: dict[str, Any]) -> Iterator[Violation]:
    """Run SPORE-WRITING-specific regex checks.

    Skipped when file is not in SPORE-BLUEPRINTS / SPORE-HARVESTS path
    (returning early so普通文章不誤觸發 Rule #15 timeline templates).
    """
    if not _is_spore_path(str(target.path)):
        return

    body_text, body_start = _strip_frontmatter_and_meta(target.text)

    # ── Rule #15: 編年體 lead 病 ──
    # Only the very first prose line is checked — body 中段可有日期
    first_line = body_text.split("\n", 1)[0] if body_text else ""
    if first_line and _RE_CHRONICLE_LEAD.match(first_line):
        yield Violation(
            check=CHECK_NAME,
            severity=Severity.HARD,
            message=(
                "編年體 lead 病 (Rule #15): "
                "第一行不該是日期開頭，改用人物動作 / 引語"
            ),
            line=body_start + 1,
            snippet=first_line[:80],
            editorial_ref="SPORE-WRITING.md §避免編年體 lead 病",
            fix_suggestion=(
                "改成「[人物] 在 [場景] 說：『[引語]』」或「[人物] 做了 [動作]」開頭"
            ),
        )

    # ── Rule #9: 引語倒裝 ──
    for m in _RE_QUOTE_INVERSION.finditer(body_text):
        # Compute approximate line number (offset from body_start)
        prefix = body_text[: m.start()]
        line_offset = prefix.count("\n")
        yield Violation(
            check=CHECK_NAME,
            severity=Severity.WARN,
            message=(
                "引語倒裝 (Rule #9): "
                "改為「他在 [場景] 留了一句話：『XXX』」給讀者場景感"
            ),
            line=body_start + line_offset + 1,
            snippet=m.group(0)[:80],
            editorial_ref="SPORE-WRITING.md §禁止清單",
        )

    # ── Rule #14: 朋友 tone prime ──
    # 第一行檢查（length ≥ 8 字 + 不是合格 prefix + 像新聞 lead）
    if first_line and len(first_line) >= 8:
        has_friend_prefix = bool(_RE_FRIEND_PREFIX.match(first_line))
        looks_like_news_lead = bool(_RE_NEWS_LEAD.match(first_line))
        # 只有「不是 friendly + 像 news lead」才 trigger（避免誤觸發具體場景開場）
        if not has_friend_prefix and looks_like_news_lead:
            yield Violation(
                check=CHECK_NAME,
                severity=Severity.WARN,
                message=(
                    "朋友 tone prime 缺失 (Rule #14): "
                    "第一行像新聞 lead，建議加「你知道嗎？」/「欸，」prefix"
                ),
                line=body_start + 1,
                snippet=first_line[:80],
                editorial_ref="SPORE-WRITING.md §朋友 tone prime",
                fix_suggestion=(
                    "前綴選一個：「你知道嗎？{emoji}」/「欸，{事件片段}」"
                ),
            )
