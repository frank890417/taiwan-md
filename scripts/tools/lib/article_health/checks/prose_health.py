"""prose_health — consolidated prose quality checks.

Migrated from `scripts/tools/quality-scan.sh` (16 dims) +
`scripts/tools/check-manifesto-11.sh` (3 tiers) into a single SSOT plugin.

Canonical:
  - quality-scan: docs/editorial/EDITORIAL.md §quality-scan 偵測指標
  - manifesto-11: docs/semiont/MANIFESTO.md §11 書寫節制

Ports the most actionable dimensions:

quality-scan dims:
  1. bullet density           7. repeated bullet blocks    13. (THIN — deferred)
  2. year count               8. plastic phrases (5 variants + extras)
  3. URL count               8b. em-dash overuse
  4. hollow words             9. textbook opening
  5. (prose lines — deferred) 10. formulaic ending
  6. lastHumanReview          11. template H2
                             12. (LIST-DUMP — deferred)
                             14. (QUALITY-DECAY — deferred)
                             15. (CHINA-TERM — deferred to terminology plugin)
                             16. citation desert

manifesto-11 tiers:
  Tier 1: 11 「不是X是Y」 對位句型 variants + em-dash density
  Tier 2: 30+ AI 抽象 metaphor 詞 (warn ≥ 2 occurrences total)
  Tier 3: 17 AI ritual 語 (warn ≥ 1 occurrence)

Total score budget: ≤ 3 = pass (per QUALITY-CHECKLIST §四 + REWRITE-PIPELINE).
A "score" violation is yielded with the running total — the runner can
gate on this via profile.fail_on = "score-budget".

Deferred to Phase 4b (need more structural parsing):
  - LIST-DUMP: bullet ratio per file half
  - THIN: prose lines per H2 section
  - QUALITY-DECAY: prose ratio front vs back
  - CHINA-TERM: requires data/terminology TSV files (separate plugin)
"""

from __future__ import annotations
import re
from typing import Any, Iterator

from ..types import FileTarget, Severity, Violation


CHECK_NAME = "prose-health"
DIMENSION = "prose-quality"
DEFAULT_SEVERITY = Severity.WARN
EDITORIAL_REF = "EDITORIAL.md §quality-scan + MANIFESTO.md §11"
APPLIES_TO = ["zh-TW"]


# ── Plastic phrases (quality-scan §8) ────────────────────────────────────────
_RE_PLASTIC = re.compile(
    r"不僅.{0,8}更是|不只.{0,8}也是|不是.{0,8}而是|"
    r"展現了.{0,8}的精神|展現.{0,8}的決心|體現了.{0,8}的精神|"
    r"扮演著.{0,10}角色|發揮著.{0,10}作用|見證了.{0,10}的歷程|"
    r"彰顯了|承載著.{0,10}的|不僅僅是.{0,10}更是|"
    r"既是.{0,8}也是.{0,8}更是|成為.{0,8}的重要.{0,6}|"
    r"為.{0,10}注入.{0,8}活力|為.{0,10}奠定.{0,8}基礎|"
    r"在.{0,10}上扮演.{0,8}角色|為.{0,10}提供了.{0,8}動力|"
    r"開啟了.{0,8}的新篇章|翻開.{0,8}的新頁|書寫.{0,8}的篇章|"
    r"譜寫.{0,8}的華章|綻放.{0,8}的光芒|閃耀.{0,8}的光輝"
)

# ── Hollow words (quality-scan §4) ───────────────────────────────────────────
_RE_HOLLOW = re.compile(
    r"重要的|顯著的|豐富的|完整的|多元的|"
    r"積極|蓬勃發展|逐步|逐漸|不斷|持續|"
    r"日益|進一步|全面|深入|大力|有效|顯著|穩步"
)

# ── Em-dash (manifesto-11 [9-10] / quality-scan §8b) ─────────────────────────
_RE_EMDASH = re.compile(r"——")

# ── Manifesto §11 Tier 1: 不是X是Y 對位句型 11 變體 ─────────────────────────
# Tightened versions of patterns from check-manifesto-11.sh
_TIER1_PATTERNS = [
    re.compile(r"不是.{0,30}[，,]\s*而是"),  # cross-comma
    re.compile(r"這不是.{0,15}是"),
    re.compile(r"不只是.{0,15}是"),
    re.compile(r"不再是.{0,15}是"),
    re.compile(r"不僅.{0,15}更是"),
    re.compile(r"不只.{0,15}也是"),
    re.compile(r"不是.{0,8}而是"),
    re.compile(r"不僅僅是.{0,10}更是"),
    re.compile(r"既是.{0,8}也是.{0,8}更是"),
    re.compile(r"從.{2,15}到.{2,15}[，,]\s*從.{2,15}到"),
    re.compile(r"與其說.{0,15}不如說"),
]

# ── Manifesto §11 Tier 2: AI 抽象 metaphor 詞 ────────────────────────────────
_TIER2_WORDS = [
    "重量", "縮影", "軌跡", "弧線", "DNA", "基因",
    "土壤", "養分", "血液", "縫隙", "皺褶", "肌理", "織就",
    "指紋", "神經末梢", "肌肉記憶", "基底", "底色",
    "張力", "光譜", "鏡子", "承載著", "形塑", "鬆動",
    "展演", "召喚", "凝視", "直面", "直擊",
    "鋪陳", "醞釀", "沈澱",
]

# ── Manifesto §11 Tier 3: AI ritual 語 ───────────────────────────────────────
_TIER3_PHRASES = [
    "在這個意義上", "從某種意義上", "就此而言", "換言之",
    "值得我們深思", "值得我們反思", "拭目以待", "不容忽視",
    "不可或缺", "不可磨滅", "影響深遠", "歷久彌新",
    "並非偶然", "耐人尋味", "不言而喻", "不可言說", "無以名狀",
]

# ── Textbook opening (quality-scan §9) ───────────────────────────────────────
_RE_TEXTBOOK_OPENING = re.compile(
    r"^(台灣的.{2,20}是|.{2,10}是台灣.{2,20}|"
    r"作為.{2,15}[，,]\s*台灣|"
    r"在.{2,10}(方面|領域)[，,]\s*台灣|"
    r"台灣.{2,6}(擁有|具有|位於|以其))"
)

# ── Formulaic ending (quality-scan §10) ──────────────────────────────────────
_RE_FORMULAIC_ENDING = re.compile(
    r"總之|綜上所述|展望未來|總結來說|總的來說|未來展望|"
    r"隨著.{2,20}的(發展|推進|深化)|將繼續|值得期待"
)

# ── Template H2 (quality-scan §11) ───────────────────────────────────────────
_RE_TEMPLATE_H2 = re.compile(
    r"^(歷史(背景|沿革|發展)?|發展歷程|歷史脈絡|"
    r"現況(與|及)?|現狀|當前|"
    r"未來(展望|發展|趨勢)|結語|總結|"
    r"挑戰與展望|挑戰與機遇|影響與意義|"
    r"特色(與|及)?|重要性|"
    r"國際(比較|影響|地位))$"
)


def _count_year_mentions(body: str) -> int:
    """4-digit years in 1600-2099 range, excluding `date:` lines."""
    n = 0
    for line in body.splitlines():
        if "date:" in line:
            continue
        n += len(re.findall(r"\b(?:1[6-9]\d{2}|20[0-2]\d)\b", line))
    return n


def _count_urls(body: str) -> int:
    return body.count("http")


def _count_repeated_bullets(body: str) -> int:
    """Max consecutive `- **` bullet block length."""
    max_run = 0
    cur = 0
    for line in body.splitlines():
        if line.startswith("- **"):
            cur += 1
            if cur > max_run:
                max_run = cur
        else:
            cur = 0
    return max_run


def _count_bullet_lines(body: str) -> tuple[int, int]:
    """Returns (bullet_lines, total_lines). Bullet = `- **` style."""
    total = body.count("\n") + 1
    bullets = sum(1 for line in body.splitlines() if line.startswith("- **"))
    return bullets, total


def _detect_textbook_opening(body: str) -> bool:
    """First 2 non-empty non-heading lines after frontmatter."""
    seen_lines = 0
    for line in body.splitlines():
        if not line.strip():
            continue
        if line.startswith("#"):
            continue
        if _RE_TEXTBOOK_OPENING.search(line):
            return True
        seen_lines += 1
        if seen_lines >= 2:
            break
    return False


def _detect_formulaic_ending(body: str) -> bool:
    """Last 5 non-bullet non-heading non-link lines."""
    eligible = [
        line for line in body.splitlines()
        if line.strip()
        and not line.startswith("#")
        and not line.startswith("-")
        and "http" not in line
    ]
    tail = eligible[-5:] if eligible else []
    text = "\n".join(tail)
    return bool(_RE_FORMULAIC_ENDING.search(text))


def _count_template_h2(body: str) -> int:
    n = 0
    for line in body.splitlines():
        if line.startswith("## "):
            heading = line[3:].strip()
            if _RE_TEMPLATE_H2.match(heading):
                n += 1
    return n


def _count_footnote_defs(body: str) -> int:
    return sum(
        1
        for line in body.splitlines()
        if re.match(r"^\[\^[0-9a-zA-Z_-]+\]:", line)
    )


def _is_hub_file(target: FileTarget) -> bool:
    """Hub files (`_X Hub.md`) — relax structural penalties per quality-scan.sh."""
    name = target.path.name
    return name.startswith("_") and "Hub" in name


def _bullet_ratios_split(body: str) -> tuple[int, int, int, int]:
    """Front/back half bullet ratios. Returns (front_bullet, back_bullet,
    front_total, back_total) — total = non-empty lines, bullet =
    `- ` / `* ` / `N.`."""
    lines = body.splitlines()
    n = len(lines)
    if n == 0:
        return 0, 0, 0, 0
    split = (n * 6) // 10  # quality-scan uses 60/40 split
    front_bullet = back_bullet = front_total = back_total = 0
    for i, line in enumerate(lines):
        if not line.strip():
            continue
        is_bullet = bool(re.match(r"^(?:[-*]\s|\d+\.\s)", line))
        if i < split:
            front_total += 1
            if is_bullet:
                front_bullet += 1
        else:
            back_total += 1
            if is_bullet:
                back_bullet += 1
    return front_bullet, back_bullet, front_total, back_total


def _count_thin_blocks(body: str) -> int:
    """H2 blocks with < 3 prose lines. Mirrors quality-scan.sh dim 13."""
    thin = 0
    in_block = False
    prose = 0
    for line in body.splitlines():
        if line.startswith("## "):
            if in_block and prose < 3:
                thin += 1
            in_block = True
            prose = 0
        elif in_block:
            if line.strip() and not re.match(r"^(?:[#\-*|>]|\d+\.)", line):
                prose += 1
    if in_block and prose < 3:
        thin += 1
    return thin


def _prose_ratios_split(body: str) -> tuple[int, int, int, int]:
    """Front/back half prose ratios for QUALITY-DECAY detection."""
    lines = body.splitlines()
    n = len(lines)
    split = (n * 6) // 10
    fp = bp = fa = ba = 0
    for i, line in enumerate(lines):
        if i < split:
            fa += 1
            if line.strip() and not re.match(r"^(?:[#\-*|>]|\d+\.)", line):
                fp += 1
        else:
            ba += 1
            if line.strip() and not re.match(r"^(?:[#\-*|>]|\d+\.)", line):
                bp += 1
    return fp, bp, fa, ba


def _word_count(body: str) -> int:
    """Rough whitespace-tokenized count after frontmatter (CJK 1 char = 1 word).

    Matches `wc -w` semantics of the shell script for parity.
    """
    return len(body.split())


def check(target: FileTarget, config: dict[str, Any]) -> Iterator[Violation]:
    """Yield prose-health violations + a final score-summary violation.

    Skips if file is too short (lines < 20) or has no frontmatter (matches
    quality-scan.sh::scan_file early-exit semantics).
    """
    body = target.body
    line_count = body.count("\n") + 1
    if line_count < 20:
        return
    if not target.frontmatter:
        # Hub / private docs without frontmatter — quality-scan skips these
        return

    score = 0
    reasons: list[str] = []

    # Use body without protected regions for pattern detection so code
    # blocks / link URLs don't trigger false positives.
    text_for_patterns = target.body_without_protected()

    # ── 1. Bullet density ──
    bullets, total = _count_bullet_lines(body)
    if total > 0:
        ratio = bullets * 100 // total
        if ratio > 30:
            score += 3
            reasons.append(f"bullet密度{ratio}%")
        elif ratio > 20:
            score += 1
            reasons.append(f"bullet密度{ratio}%")

    # ── 2. Year count ──
    years = _count_year_mentions(body)
    if years < 2:
        score += 3
        reasons.append(f"年份僅{years}個")
    elif years < 5:
        score += 1
        reasons.append(f"年份{years}個")

    # ── 3. URL count ──
    urls = _count_urls(body)
    if urls == 0:
        score += 3
        reasons.append("無URL來源")
    elif urls < 3:
        score += 1
        reasons.append(f"僅{urls}個URL")

    # ── 4. Hollow words ──
    hollow_n = len(_RE_HOLLOW.findall(text_for_patterns))
    if hollow_n > 15:
        score += 3
        reasons.append(f"空洞詞{hollow_n}個")
    elif hollow_n > 8:
        score += 2
        reasons.append(f"空洞詞{hollow_n}個")
    elif hollow_n > 4:
        score += 1
        reasons.append(f"空洞詞{hollow_n}個")

    # ── 6. lastHumanReview ──
    if target.frontmatter.get("lastHumanReview") is False:
        score += 1
        reasons.append("未人工審核")

    # ── 7. Repeated bullet blocks ──
    max_run = _count_repeated_bullets(body)
    if max_run >= 6:
        score += 2
        reasons.append(f"連續bullet{max_run}行")
    elif max_run >= 4:
        score += 1
        reasons.append(f"連續bullet{max_run}行")

    # ── 8. Plastic phrases ──
    plastic_n = len(_RE_PLASTIC.findall(text_for_patterns))
    if plastic_n > 8:
        score += 4
        reasons.append(f"塑膠句{plastic_n}個")
    elif plastic_n > 4:
        score += 3
        reasons.append(f"塑膠句{plastic_n}個")
    elif plastic_n > 2:
        score += 2
        reasons.append(f"塑膠句{plastic_n}個")
    elif plastic_n >= 1:
        score += 1
        reasons.append(f"塑膠句{plastic_n}個")

    # ── 8b. Em-dash overuse ──
    dash_n = len(_RE_EMDASH.findall(text_for_patterns))
    if dash_n > 15:
        score += 3
        reasons.append(f"破折號{dash_n}個")
    elif dash_n > 8:
        score += 2
        reasons.append(f"破折號{dash_n}個")
    elif dash_n > 4:
        score += 1
        reasons.append(f"破折號{dash_n}個")

    # ── 9. Textbook opening ──
    if _detect_textbook_opening(body):
        score += 2
        reasons.append("教科書開場")

    # ── 10. Formulaic ending ──
    if _detect_formulaic_ending(body):
        score += 2
        reasons.append("套路結尾")

    # ── 11. Template H2 ──
    template_h2 = _count_template_h2(body)
    if template_h2 >= 4:
        score += 3
        reasons.append(f"萬用H2×{template_h2}")
    elif template_h2 >= 3:
        score += 2
        reasons.append(f"萬用H2×{template_h2}")
    elif template_h2 >= 2:
        score += 1
        reasons.append(f"萬用H2×{template_h2}")

    # ── 12. LIST-DUMP (back-half bullet density disproportionate to front) ──
    is_hub = _is_hub_file(target)
    front_b, back_b, front_t, back_t = _bullet_ratios_split(body)
    if front_t > 0 and back_t > 0:
        front_ratio = front_b * 100 // front_t
        back_ratio = back_b * 100 // back_t
        if is_hub:
            # Hub pages naturally back-heavy index lists — relaxed
            if back_ratio > 60 and back_ratio > front_ratio * 3:
                score += 1
                reasons.append(f"後段清單堆砌{back_ratio}%(Hub)")
        else:
            if back_ratio > 40 and back_ratio > front_ratio * 2:
                score += 3
                reasons.append(f"後段清單堆砌{back_ratio}%")
            elif back_ratio > 30:
                score += 2
                reasons.append(f"後段清單堆砌{back_ratio}%")

    # ── 13. THIN (H2 blocks with < 3 prose lines) ──
    thin = _count_thin_blocks(body)
    if is_hub:
        if thin >= 4:
            score += 1
            reasons.append(f"稀薄段落×{thin}(Hub)")
    else:
        if thin >= 2:
            score += 2
            reasons.append(f"稀薄段落×{thin}")
        elif thin >= 1:
            score += 1
            reasons.append(f"稀薄段落×{thin}")

    # ── 14. QUALITY-DECAY (front prose ratio >> back prose ratio) ──
    fp, bp, fa, ba = _prose_ratios_split(body)
    if fa > 0 and ba > 0:
        front_pr = fp * 100 // fa
        back_pr = bp * 100 // ba
        if is_hub:
            if back_pr < front_pr // 4:
                score += 1
                reasons.append(f"品質衰退前{front_pr}%後{back_pr}%(Hub)")
        elif front_pr > 0:
            if back_pr < front_pr // 2:
                score += 3
                reasons.append(f"品質衰退前{front_pr}%後{back_pr}%")
            elif back_pr < (front_pr * 7) // 10:
                score += 1
                reasons.append(f"品質衰退前{front_pr}%後{back_pr}%")

    # ── 16. Citation desert ──
    fn_defs = _count_footnote_defs(body)
    word_count = _word_count(body)
    if fn_defs == 0:
        if word_count > 500:
            if urls == 0:
                score += 4
                reasons.append("引用荒漠(零腳註零URL)")
            else:
                score += 2
                reasons.append("引用荒漠(零腳註)")
        elif word_count > 200:
            score += 1
            reasons.append("無腳註")

    # ── Manifesto §11 Tier 1: 對位句型 ──
    tier1_total = 0
    for pat in _TIER1_PATTERNS:
        matches = list(pat.finditer(text_for_patterns))
        if matches:
            tier1_total += len(matches)
            for m in matches:
                yield Violation(
                    check=CHECK_NAME,
                    severity=Severity.WARN,
                    message=f"對位句型 (§11 Tier 1): {m.group(0)[:30]}…",
                    snippet=m.group(0)[:80],
                    editorial_ref="MANIFESTO.md §11 Tier 1",
                )

    # ── Manifesto §11 Tier 2: AI metaphor ──
    tier2_total = sum(text_for_patterns.count(w) for w in _TIER2_WORDS)
    if tier2_total >= 2:
        yield Violation(
            check=CHECK_NAME,
            severity=Severity.WARN,
            message=f"AI 抽象 metaphor 密度 (§11 Tier 2): 累計 {tier2_total} 處",
            editorial_ref="MANIFESTO.md §11 Tier 2",
        )

    # ── Manifesto §11 Tier 3: ritual 語 ──
    tier3_total = sum(text_for_patterns.count(p) for p in _TIER3_PHRASES)
    if tier3_total >= 1:
        yield Violation(
            check=CHECK_NAME,
            severity=Severity.WARN,
            message=f"AI ritual 句 (§11 Tier 3): 累計 {tier3_total} 處",
            editorial_ref="MANIFESTO.md §11 Tier 3",
        )

    # ── Final score summary as a single violation ──
    # The runner can gate on score via profile.fail_on = "score-budget".
    if score > 0:
        yield Violation(
            check=CHECK_NAME,
            severity=Severity.WARN,
            message=f"prose-health score: {score} (≤ 3 = pass) — {'; '.join(reasons)}",
            editorial_ref=EDITORIAL_REF,
            fix_suggestion=str(score),  # used by score-budget gating
        )
