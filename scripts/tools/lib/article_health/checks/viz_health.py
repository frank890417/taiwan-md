"""viz-health — 文章內視覺化模組的可信度 + AI 可讀性 + 結構完整性閘門（REWRITE Stage 4）。

儀器化 docs/editorial/graph.md §七 視覺化檢查清單 + §四 模組語法的可機檢項目
（其餘靠人工 preview）：

  A. 資料視覺化模組必標來源
     tw-bars / tw-waffle / tw-line / tw-heatmap / tw-stat 等這些「呈現資料關係」
     的模組，每個都該有來源（在 fenced block 內加一列 `來源：機構，年份` 會自動
     變成模組下方的來源 caption）。沒有 = 可信度破口 + AI 引用時無從追溯。對應
     graph.md §三.8 + The Pudding「transparency as trust」原則。

  B. 禁「如上圖／如下圖」AI-blind 指示語
     GPTBot / PerplexityBot / ClaudeBot 不跑 JS、看不到圖。「如上圖所示」這種句子
     對 AI 爬蟲毫無意義，且關鍵數值若只在圖裡，LLM 提取不到 → 違反 Taiwan.md 的
     AI-SEO / 主權使命（「讓 LLM 讀得懂的視覺化 = 主權的視覺化」）。關鍵數值要也
     寫進 prose，指示語改成具體結論或「見下表」。

  C. 結構完整性（2026-07-16 viz-evolution 新增，graph.md §四 模組語法的儀器化）
     每種圖表模組在 graph.md §四 都寫死了幾何限制（斜率圖恰兩點、折線圖 ≤3
     序列、堆疊條 ≤5 類別、方格圖加總 ≈100 ……）。這些不是美感建議，違反時
     renderer 要嘛畫出誤導的圖、要嘛直接畫壞。全部 WARN 級（soft-launch，跟
     A/B 一致）。含通用的「資料模組沒有可解析資料列」malformed 檢查——這種
     block 會被 renderer 靜默略過或退化成 code block，presence（fenced block
     存在）≠ appearance（渲染正確），對應 LESSONS 2026-06-12 viz-evolution。

設計脈絡：reports/article-visualization-design-2026-06-06.md §9.1。
DEFAULT WARN（soft-launch；legacy 文章可能含 violation，且 B 句式偶有 dual-use）。
待 vc≥3 production case 後評估是否對 rewrite-stage-4 升 HARD（per chronicle-lead pattern）。

2026-07-16 gate 集合審計（全站 226 個 block 自動統計）：被 `_DATA_MODULES` gate
的 10 個圖表模組來源缺失率 0%，沒被 gate 的 tw-timeline / tw-versus / tw-stat
缺失率 41–46%（53 個 block）——gate 集合的形狀直接決定行為，這三個高頻編輯模組
實質沒被儀器化過。追加進 `_DATA_MODULES`，會讓 ~53 個 legacy block 開始出 WARN
（default WARN 不擋 commit，只有 rewrite-stage-4 profile 對新文是 HARD）——這是
預期行為，不是誤報，legacy 債務要浮出來才看得見。tw-figure 維持排除：來源走
自身 line3 positional slot，本檢查判斷不到。
"""

from __future__ import annotations
import re
from functools import lru_cache
from pathlib import Path
from typing import Any, Iterator

from ..types import FileTarget, Severity, Violation


CHECK_NAME = "viz-health"
DIMENSION = "visualization"
DEFAULT_SEVERITY = Severity.WARN
EDITORIAL_REF = "graph.md §七 視覺化檢查清單 + §六 AI 可讀性"
EDITORIAL_REF_SHAPE = "graph.md §四 模組語法 + §二 型錄"
EDITORIAL_REF_NAME = "graph.md §四 模組語法（模組名是語法不是文字欄）"

# 2026-08-02 viz-adoption：本 plugin 從 zh-TW-only 改成全語系。
# A（缺來源）/ B（AI-blind 指示語）/ C（幾何結構）維持只跑中文 SSOT——翻譯沿用
# 幾何、文字由 babel 處理，對 12 語重複報同一件事只會製造 12 倍雜訊。
# D（未知模組名）必須跑全語系：模組名屬於語法不屬於文字欄，而它被翻壞的地方
# 恰恰只在譯本。zh-only 的 APPLIES_TO 讓 hi/en 的五處壞掉的 fence 名活了下來，
# 其中兩處就在對外解釋視覺化系統的 About 頁上（設計報告 §2.3b）。
APPLIES_TO = ["*"]
_SSOT_LANG = "zh-TW"

# 呈現「資料關係」的模組 → 強制標來源（用 `來源：…` 列）。
# tw-figure 是關鍵數字 callout，來源走自身 line3 positional slot，不在此強制集。
# 2026-06-12 viz-evolution：+slope/dot/stack/pyramid/tiles/iso（graph.md v2.0 新六圖表模組）。
# 2026-07-16 viz-evolution：+timeline/versus/stat（審計：gate 內 0% 缺失 vs gate 外
# 41–46% 缺失，53 個 block——gate 集合本身決定了儀器有沒有在檢查）。
# 2026-07-16 viz-evolution：+arc/multiples（新模組，也需要來源列）。
_DATA_MODULES = {
    "tw-bars",
    "tw-waffle",
    "tw-line",
    "tw-heatmap",
    "tw-slope",
    "tw-dot",
    "tw-stack",
    "tw-pyramid",
    "tw-tiles",
    "tw-iso",
    "tw-timeline",
    "tw-versus",
    "tw-stat",
    "tw-arc",
    "tw-multiples",
}

# fenced tw-* block：```tw-xxx\n …內容… \n```
# `[a-z-]` 而非 `[a-z]`：翻壞的名字可能帶額外連字號，要抓得到才報得出來。
_FENCE_RE = re.compile(r"```(tw-[a-z-]+)[^\n]*\n(.*?)```", re.DOTALL)

# ── 合法模組白名單：從 renderer registry 解析，不在本檔另立第三份清單 ──────
# 真正決定「這個名字會不會渲染成圖」的是 article-render.ts 的那串 `lang === '…'`，
# 所以白名單的單一真相源就是它。graph.md §四 是給人讀的數量 SSOT，兩者由
# selftest 對賬（數量異常 → fail loud，不靜默放行）。
_RENDERER_PATH = (
    Path(__file__).resolve().parents[5] / "src" / "utils" / "article-render.ts"
)
_RENDERER_MODULE_RE = re.compile(r"lang === '(tw-[a-z-]+)'")
_MIN_EXPECTED_MODULES = 15  # 低於此數＝解析壞了，不是模組真的變少


@lru_cache(maxsize=1)
def _known_modules() -> frozenset[str]:
    """從 renderer registry 解析合法模組名。解析不出來回傳空集合（呼叫端 fail loud）。"""
    try:
        src = _RENDERER_PATH.read_text(encoding="utf-8")
    except OSError:
        return frozenset()
    found = frozenset(_RENDERER_MODULE_RE.findall(src))
    return found if len(found) >= _MIN_EXPECTED_MODULES else frozenset()

# tw-article（2026-08-19）：每列 `分類/slug[ | 摘要]`，目標檔必須存在
# knowledge/<Cat>/<slug>.md。分類對照與 src/utils/articles-index.ts CATEGORY_MAPPING
# 一致（URL 段小寫 → 資料夾名）；不 import TS，這裡是 python 側的鏡像。
_KNOWLEDGE_ROOT = Path(__file__).resolve().parents[5] / "knowledge"
_TW_ARTICLE_CATS = {
    "about": "About", "history": "History", "geography": "Geography",
    "culture": "Culture", "food": "Food", "art": "Art", "music": "Music",
    "technology": "Technology", "nature": "Nature", "people": "People",
    "society": "Society", "economy": "Economy", "lifestyle": "Lifestyle",
    "politics": "Politics",
}

# 來源列：標籤清單從 renderer 的 VIZ_STRINGS.srcPrefix + _SRC_EXTRA_LABELS 推導，
# 不在本檔維護第二份語言清單（跟 _known_modules() 同一個 SSOT 原則）。
# 2026-10-16：原本這裡寫死 `資料來源|來源|source` 三個中英標籤——正是
# article-render.ts §_buildSrcLineRe 的註解明文拒絕維護的那份「第二份清單」，
# 在檢查器這一側又長了一次。A/B/C 三項只跑 zh-TW SSOT 所以它一直沒出事；新增的
# D2（全語系跑）第一次掃全庫就被它絆到：488 個檔案的 `Fonte:`／`Quelle:`／
# `Fuente:` 來源列被當成不合法的冒號鍵列。尺先驗再用（REFLEXES #99）。
_SRC_EXTRA_LABELS_RE = re.compile(r"^\s*'([^']+)',?\s*$", re.MULTILINE)
_SRC_PREFIX_RE = re.compile(r"srcPrefix:\s*'([^']+)'")
_MIN_EXPECTED_SRC_LABELS = 12  # 低於此數＝解析壞了，不是語言真的變少


@lru_cache(maxsize=1)
def _src_labels() -> tuple[str, ...]:
    """從 renderer 解析來源列標籤（srcPrefix 各語 + 複數形 extra labels）。

    解析不出來回傳 ()，呼叫端退回最小中英集合並 fail loud（不靜默放行）。
    """
    try:
        src = _RENDERER_PATH.read_text(encoding="utf-8")
    except OSError:
        return ()
    labels = {
        re.sub(r"[:：]\s*$", "", m).strip().lower()
        for m in _SRC_PREFIX_RE.findall(src)
    }
    block = re.search(r"_SRC_EXTRA_LABELS\s*=\s*\[(.*?)\]", src, re.DOTALL)
    if block:
        labels |= {
            m.strip().lower() for m in _SRC_EXTRA_LABELS_RE.findall(block.group(1))
        }
    labels.discard("")
    if len(labels) < _MIN_EXPECTED_SRC_LABELS:
        return ()
    # 長的先試，免得 `nguồn` 先吃掉 `nguồn dữ liệu`
    return tuple(sorted(labels, key=len, reverse=True))


@lru_cache(maxsize=1)
def _src_re() -> re.Pattern[str]:
    labels = _src_labels() or ("資料來源", "來源", "source")
    alt = "|".join(re.escape(l) for l in labels)
    # re.MULTILINE 不可省：呼叫端是 `_SRC_RE.search(block_content)`，來源列永遠
    # 不是 block 的第一列（第一列是標題），少了 MULTILINE 的 `^` 只錨到整段開頭，
    # 規則 A 就變成「每個資料模組都缺來源」的全假陽性。2026-10-16 從寫死標籤改成
    # 從 renderer 解析時同一個 commit 加了 `^` 卻沒加這個 flag，而 A 是 WARN 級、
    # 當時也沒有任何測試覆蓋 viz_health，於是 110 篇 332 個區塊全部被誤報成缺來源
    # （2026-10-22 ground-truth 比對：332/332 其實都有來源列）。
    return re.compile(rf"^(?:{alt})\s*[:：]\s*\S", re.IGNORECASE | re.MULTILINE)


class _SrcReProxy:
    """讓既有的 `_SRC_RE.search(...)` 呼叫點不用全部改寫。"""

    def search(self, s: str):
        return _src_re().search(s)

    def match(self, s: str):
        return _src_re().match(s)


_SRC_RE = _SrcReProxy()

# AI-blind 指示語：如上圖 / 見下圖 / 如圖所示 / 上圖所示 / 下圖顯示 …
_AIBLIND_RE = re.compile(
    r"(?:如|見|參見)(?:上|下|左|右)?圖(?:所示)?"
    r"|(?:上|下)圖(?:所示|顯示|可見|中)"
)

# config 列：單位：… / 過半：… / 欄：… / 基準：… / 基準線：…（v2.0 共通約定）
_CONFIG_RE = re.compile(r"^(?:單位|過半|欄|基準線?)\s*[:：]")

# 冒號鍵列：graph.md §四 沒有定義 `title:` / `axis:` 這種 YAML 風格的鍵。作者
# （或模型）以為圖表模組吃鍵值對，而 renderer 把第一列當標題、其餘不含 `|` 的列
# 當資料列 → 標題印出字面的 `title:`，`axis:` 變成一條長度 0 的幽靈條。
# 刻意寫成白名單而非「任何 latin 冒號開頭」：後者在全庫實測有 ~40% 假陽性，命中的
# 是合法的帶冒號標題句（`Taiwan: Seventy-five years without a break…`）。
# 假陽性家族寧缺勿濫（MANIFESTO §14）。
_BOGUS_KEY_RE = re.compile(
    r"^(title|axis|label|legend|caption|subtitle|xlabel|ylabel|x|y|data|type|values?"
    r"|unit_label|axis_label)\s*[:：]\s*\S",
    re.IGNORECASE,
)

# config 鍵被翻譯掉：`單位：` / `過半：` / `欄：` / `基準：` 是語法不是文字欄
# （跟模組名同一類），renderer 只認中文那四個。翻成 `Unit:` / `Einheit:` 之後
# renderer 認不得 → 該模組掉了它的 config，那一列還變成幽靈資料列。
# 2026-10-16 全庫實測：只有 2 篇中文母稿用 config 鍵，其中〈視覺化模組型錄〉的
# 12 個譯本全部把鍵翻掉了——對外解釋視覺化系統的那一頁，自己的視覺化是壞的。
_TRANSLATED_CONFIG_RE = re.compile(
    r"^(Unit|Unidad|Unidade|Unité|Einheit|Satuan|Единица|Đơn vị|単位|단위|इकाई"
    r"|(?:ال)?وحدة"
    r"|Majority|Mayoría|Maioria|Majorité|Mehrheit|Mayoritas|Большинство|Đa số|과반"
    r"|Quá nửa|過半数|बहुमत|(?:ال)?أغلبية"
    r"|Column|Columna|Coluna|Colonne|Spalte|Kolom|Столбец|Cột|列|열|स्तंभ|عمود"
    r"|Baseline|Línea base|Linha de base|Ligne de base|Basislinie|Garis dasar"
    r"|Базовая линия|Đường cơ sở|基準線|기준선|आधार रेखा|خط الأساس)\s*[:：]\s*\S",
    re.IGNORECASE,
)

# tw-multiples 群組分隔列
_MULTIPLES_SEP_RE = re.compile(r"^---\s*", re.MULTILINE)

# 數字欄位（含千分位逗號 / 百分號 / 負號 / 強調 `*` 前綴）
_NUMERIC_RE = re.compile(r"^-?[\d,]+(?:\.\d+)?%?$")


def _parse_block(content: str) -> dict[str, Any]:
    """拆解一個 fenced tw-* block 內容成標題／config／來源／資料四類列。

    每類回傳 (相對列號, 內容) tuples；相對列號 = `content.split("\\n")` 的
    0-based index，呼叫端可换算成檔案絕對行號（見 check() 內 content_start_line）。

    分類優先序（跟 v2.0 共通約定一致）：來源列 > config 列 >
    標題列（僅第一個非空列，且無 `|`）> 資料列（其餘含 `|` 的列）。
    沒有 `|` 又不是第一列、也不是 config/來源的行（例如 tw-multiples 的
    `---` 分隔列）不落入任何一類，由呼叫端各自用專屬 regex 處理。
    """
    title: tuple[int, str] | None = None
    config: list[tuple[int, str]] = []
    source: list[tuple[int, str]] = []
    data: list[tuple[int, str]] = []
    seen_content = False
    for idx, raw in enumerate(content.split("\n")):
        line = raw.strip()
        if not line:
            continue
        if _SRC_RE.search(line):
            source.append((idx, line))
            seen_content = True
            continue
        if _CONFIG_RE.match(line):
            config.append((idx, line))
            seen_content = True
            continue
        if "|" not in line:
            if not seen_content:
                title = (idx, line)
            seen_content = True
            continue
        data.append((idx, line))
        seen_content = True
    return {"title": title, "config": config, "source": source, "data": data}


def _cols(line: str) -> int:
    """`|` 分欄後的欄數。"""
    return len(line.split("|"))


def _is_numeric(field: str) -> bool:
    """欄位是否為純數字（容許千分位逗號 / 百分號 / 強調 `*` 前綴）。"""
    f = field.strip()
    if f.startswith("*"):
        f = f[1:].strip()
    return bool(_NUMERIC_RE.match(f))


def _to_float(field: str) -> float | None:
    """欄位轉 float；不是數字回傳 None（呼叫端自行決定要不要略過）。"""
    f = field.strip().rstrip("%").replace(",", "")
    try:
        return float(f)
    except ValueError:
        return None


def check(target: FileTarget, config: dict[str, Any]) -> Iterator[Violation]:
    body = target.body
    if not body.strip():
        return

    # ── D. 未知模組名（全語系跑，2026-08-02 viz-adoption 新增）───────────────
    # renderer 遇到不認識的 tw-* 會回傳空字串，然後落回一般 code block——讀者看到
    # 的是一坨帶直線分隔的原始資料，而不是圖。這個降級是完全靜默的：markup 在、
    # 頁面不壞、build 全綠，只有真的去看那一頁才會發現。babel 把 fence 的語言
    # 標識當成可翻譯文字翻掉時（tw-bars → tw-vars），整條路上沒有任何一道閘門會叫。
    known = _known_modules()
    for m in _FENCE_RE.finditer(body):
        lang = m.group(1)
        line_no = body[: m.start()].count("\n") + 1
        if not known:
            yield Violation(
                check=CHECK_NAME,
                severity=DEFAULT_SEVERITY,
                message=(
                    "無法從 renderer 解析模組白名單 "
                    f"（{_RENDERER_PATH.name}）— 未知模組名這一項這次沒有被檢查，"
                    "不要當作通過。"
                ),
                line=line_no,
                snippet=f"```{lang} …",
                editorial_ref=EDITORIAL_REF_NAME,
                fix_suggestion=(
                    "確認 src/utils/article-render.ts 存在且仍用 "
                    "`lang === 'tw-xxx'` 的寫法註冊模組；改過寫法就要同步改本檢查的 regex。"
                ),
            )
            break  # 白名單壞掉是檔案層級的事實，報一次就夠
        if lang not in known:
            yield Violation(
                check=CHECK_NAME,
                severity=DEFAULT_SEVERITY,
                message=(
                    f"`{lang}` 不是合法模組名 — renderer 認不得，會靜默退化成純 "
                    f"code block，讀者看到原始資料而不是圖。"
                ),
                line=line_no,
                snippet=f"```{lang} …",
                editorial_ref=EDITORIAL_REF_NAME,
                fix_suggestion=(
                    "對照 graph.md §四 改回正確模組名。若出現在譯本，多半是翻譯把 "
                    "fence 的語言標識當文字翻掉了（例：tw-bars → tw-vars）——"
                    "模組名屬於語法，任何語言都保持原樣。"
                ),
            )

    # A/B/C 是中文 SSOT 的檢查（來源、指示語、幾何），翻譯沿用同一份幾何，
    # 在 12 個語系重複報同一件事只會稀釋訊號。
    if target.lang != _SSOT_LANG:
        return

    # ── E. tw-article 目標檔存在（2026-08-19）─────────────────────────────
    # 路徑打錯不會 build 壞：resolveArticleEmbeds 查無時留一條純連結，讀者點下去
    # 404。這裡在 commit 前就把它抓出來。只驗 zh SSOT（譯文沿用同一份路徑）。
    for m in _FENCE_RE.finditer(body):
        if m.group(1) != "tw-article":
            continue
        content = m.group(2)
        block_line = body[: m.start()].count("\n") + 1
        for i, raw in enumerate(content.split("\n")):
            line = raw.strip()
            if not line:
                continue
            path = line.split("|", 1)[0].strip().strip("/")
            seg = path.split("/")
            if len(seg) != 2 or not seg[0] or not seg[1]:
                yield Violation(
                    check=CHECK_NAME,
                    severity=DEFAULT_SEVERITY,
                    message=(
                        f"`tw-article` 這一列不是 `分類/slug` 形狀：`{line}` — "
                        "renderer 會直接丟掉這列，卡片不會出現。"
                    ),
                    line=block_line + 1 + i,
                    snippet=line,
                    editorial_ref=EDITORIAL_REF_SHAPE,
                    fix_suggestion="寫成 `technology/台灣鎢供應鏈`（選配 `| 自訂摘要`）。",
                )
                continue
            folder = _TW_ARTICLE_CATS.get(seg[0].lower())
            target_md = _KNOWLEDGE_ROOT / (folder or "") / f"{seg[1]}.md"
            if not folder or not target_md.exists():
                # HARD：這不是「圖不好看」，是上線後一條 404 連結（同 link-target 的
                # 斷鏈等級）。目標檔存不存在是 0/1 事實，沒有誤報空間。
                yield Violation(
                    check=CHECK_NAME,
                    severity=Severity.HARD,
                    message=(
                        f"`tw-article` 指到的文章不存在：`{path}` — 上線後這一格會退化成"
                        f"一條純連結，讀者點下去 404。"
                    ),
                    line=block_line + 1 + i,
                    snippet=line,
                    editorial_ref=EDITORIAL_REF_SHAPE,
                    fix_suggestion=(
                        "分類用 URL 段小寫（technology／nature／people…），slug 用 "
                        "knowledge/<Cat>/ 下的檔名（不含 .md）。"
                    ),
                )

    # ── A. 資料視覺化模組缺來源 ──────────────────────────────────────────
    for m in _FENCE_RE.finditer(body):
        lang = m.group(1)
        content = m.group(2)
        if lang in _DATA_MODULES and not _SRC_RE.search(content):
            line_no = body[: m.start()].count("\n") + 1
            yield Violation(
                check=CHECK_NAME,
                severity=DEFAULT_SEVERITY,
                message=(
                    f"資料視覺化模組 `{lang}` 缺來源標註 — 在 fenced block 內加一列 "
                    f"`來源：機構，年份`（可信度 + 讓 AI 引用時可追溯來源）。"
                ),
                line=line_no,
                snippet=f"```{lang} …",
                editorial_ref=EDITORIAL_REF,
                fix_suggestion=(
                    "在該 ```"
                    f"{lang}"
                    "``` 區塊內加一列 `來源：…`，會自動渲染成模組下方的來源 caption。"
                ),
            )

    # ── D2. 冒號鍵列（全語系跑，2026-10-16 twmd-maintainer-daily 新增）────────
    # graph.md §四 的標題是「第一列不含 `|`」，config 列只有中文那幾個鍵
    # （單位／基準／過半／欄）。寫成 `title:` / `axis:` 的 YAML 風格鍵沒有任何
    # 一道閘門在看，而 renderer 對它們的處置是：第一列照樣當標題（於是讀者看到
    # 字面的 `title:`），第二列落進資料列（`axis: 折扣率 (%)` 沒有 `|`，數值
    # 解析成 0 → 一條長度 0 的幽靈條，標籤就是那串鍵）。
    # 誕生：〈台中國家歌劇院〉的 tw-bars 從中文母稿帶著 `title:` + `axis:` 兩列
    # 出生，被忠實翻進 12 個語言，13 個檔案全部 viz-health warn=0 通過；抓到它
    # 的是投稿者 dreamline2 讀韓文版時發現折扣數字也錯了（PR #1857）。
    for m in _FENCE_RE.finditer(body):
        lang = m.group(1)
        if lang not in _DATA_MODULES:
            continue
        content_start_line = body[: m.start(2)].count("\n") + 1
        for idx, raw in enumerate(m.group(2).split("\n")):
            line = raw.strip()
            if not line or "|" in line:
                continue
            if _SRC_RE.search(line) or _CONFIG_RE.match(line):
                continue
            km = _BOGUS_KEY_RE.match(line)
            if km:
                yield Violation(
                    check=CHECK_NAME,
                    severity=DEFAULT_SEVERITY,
                    message=(
                        f"`{km.group(1)}:` 不是 graph.md §四 定義的鍵 — 模組標題是"
                        f"「第一列不含 `|`」，所以這一列會被字面渲染（當標題就印出 "
                        f"`{km.group(1)}:`，當資料列就變成一條長度 0 的幽靈條）。"
                    ),
                    line=content_start_line + idx,
                    snippet=line[:90],
                    editorial_ref=EDITORIAL_REF_NAME,
                    fix_suggestion=(
                        "標題直接寫成一句斷言（不含 `|`、放在第一列，不要加 "
                        "`title:`）；軸的單位寫進標題句，或改用 graph.md §四 的 "
                        "config 列（`單位：`／`基準：`／`過半：`／`欄：`）。"
                    ),
                )
                continue
            cm = _TRANSLATED_CONFIG_RE.match(line)
            if cm:
                yield Violation(
                    check=CHECK_NAME,
                    severity=DEFAULT_SEVERITY,
                    message=(
                        f"config 鍵 `{cm.group(1)}:` 被翻譯了 — `單位：`／`過半：`／"
                        f"`欄：`／`基準：` 屬於語法不是文字欄，renderer 只認中文那四個。"
                        f"翻掉之後這個模組掉了它的 config，這一列還會變成幽靈資料列。"
                    ),
                    line=content_start_line + idx,
                    snippet=line[:90],
                    editorial_ref=EDITORIAL_REF_NAME,
                    fix_suggestion=(
                        "鍵保留中文原樣（`單位：`／`過半：`／`欄：`／`基準：`），只翻"
                        "冒號後面的值 — 鍵本身不會被渲染出來，讀者看到的是值。"
                    ),
                )

    # ── B. 「如上圖／如下圖」AI-blind 指示語 ─────────────────────────────
    masked = target.body_without_protected()
    for line_no, line in enumerate(masked.split("\n"), start=1):
        if not line.strip():
            continue
        m = _AIBLIND_RE.search(line)
        if not m:
            continue
        yield Violation(
            check=CHECK_NAME,
            severity=DEFAULT_SEVERITY,
            message=(
                f"AI 爬蟲讀不到圖：「{m.group(0)}」這種指示語對 GPTBot/PerplexityBot "
                f"/ClaudeBot 無意義（它們看不到圖）。關鍵數值要也寫進 prose。"
            ),
            line=line_no,
            snippet=line.strip()[:90],
            editorial_ref=EDITORIAL_REF,
            fix_suggestion=(
                "把「如上圖」改成具體數值或結論；要指向資料就用「見下表」並把數字"
                "寫進文字，讓 LLM 也提取得到。"
            ),
        )

    # ── C. 結構完整性（graph.md §四 模組語法的幾何限制） ────────────────────
    for m in _FENCE_RE.finditer(body):
        lang = m.group(1)
        content = m.group(2)
        if lang not in _DATA_MODULES:
            continue

        fence_line = body[: m.start()].count("\n") + 1
        content_start_line = body[: m.start(2)].count("\n") + 1
        parsed = _parse_block(content)

        if not parsed["data"]:
            yield Violation(
                check=CHECK_NAME,
                severity=DEFAULT_SEVERITY,
                message=(
                    f"`{lang}` 模組內沒有可解析的資料列 — renderer 會靜默略過或退化"
                    f"成純 code block，讀者只看到空白或原始文字，發布前必修。"
                ),
                line=fence_line,
                snippet=f"```{lang} …",
                editorial_ref=EDITORIAL_REF_SHAPE,
                fix_suggestion=(
                    "檢查每列資料是否都含 `|` 分欄；扣掉標題／config／來源列後，"
                    "至少要留一列真正的資料列。"
                ),
            )
            continue  # 沒資料列，下面的欄數/加總檢查沒意義

        if lang == "tw-slope":
            idx, header = parsed["data"][0]
            cols = _cols(header)
            if cols != 2:
                yield Violation(
                    check=CHECK_NAME,
                    severity=DEFAULT_SEVERITY,
                    message=(
                        f"`tw-slope` 頭列（第一條資料列）{cols} 欄 — 斜率圖需恰兩個"
                        f"時點（graph.md §四）；多於兩點改用 tw-line 呈現完整趨勢。"
                    ),
                    line=content_start_line + idx,
                    snippet=header[:80],
                    editorial_ref=EDITORIAL_REF_SHAPE,
                    fix_suggestion=(
                        "header 列改成 `左時點 | 右時點` 恰兩欄；有 3 個以上時間點"
                        "就改用 tw-line。"
                    ),
                )

        elif lang == "tw-line":
            idx, header = parsed["data"][0]
            series = _cols(header) - 1
            if series > 3:
                yield Violation(
                    check=CHECK_NAME,
                    severity=DEFAULT_SEVERITY,
                    message=(
                        f"`tw-line` {series} 條序列 — 折線圖 >3 序列會互相纏繞、"
                        f"難以辨識（graph.md §四）；拆圖或改用 tw-multiples。"
                    ),
                    line=content_start_line + idx,
                    snippet=header[:80],
                    editorial_ref=EDITORIAL_REF_SHAPE,
                    fix_suggestion=(
                        "序列數精簡到 ≤3；真的要多序列比較就拆成多張圖，或改用 "
                        "tw-multiples 小倍數網格。"
                    ),
                )

        elif lang == "tw-stack":
            idx, header = parsed["data"][0]
            categories = _cols(header) - 1
            if categories > 5:
                yield Violation(
                    check=CHECK_NAME,
                    severity=DEFAULT_SEVERITY,
                    message=(
                        f"`tw-stack` {categories} 個類別 — 堆疊條類別建議 ≤5"
                        f"（graph.md §四），太多段肉眼分不出寬度差。"
                    ),
                    line=content_start_line + idx,
                    snippet=header[:80],
                    editorial_ref=EDITORIAL_REF_SHAPE,
                    fix_suggestion=(
                        "把小類別合併成「其他」；仍 >5 類就改用表格呈現。"
                    ),
                )

        elif lang == "tw-waffle":
            total = 0.0
            any_parsed = False
            for _, row in parsed["data"]:
                fields = row.split("|")
                val = _to_float(fields[-1]) if fields else None
                if val is not None:
                    total += val
                    any_parsed = True
            if any_parsed and not (90 <= total <= 110):
                yield Violation(
                    check=CHECK_NAME,
                    severity=DEFAULT_SEVERITY,
                    message=(
                        f"`tw-waffle` 資料列加總約 {total:.1f} — 方格圖是部分對"
                        f"全體，加總應 ≈100（graph.md §四）；不是組成比例改用 "
                        f"tw-bars。"
                    ),
                    line=fence_line,
                    snippet=f"```{lang} …",
                    editorial_ref=EDITORIAL_REF_SHAPE,
                    fix_suggestion=(
                        "檢查百分比欄加總是否正確（四捨五入誤差在 90–110 內算"
                        "合理）；資料本質不是「組成」就改用 tw-bars。"
                    ),
                )

        elif lang == "tw-pyramid":
            idx, header = parsed["data"][0]
            cols = _cols(header)
            if cols != 3:
                yield Violation(
                    check=CHECK_NAME,
                    severity=DEFAULT_SEVERITY,
                    message=(
                        f"`tw-pyramid` 頭列 {cols} 欄 — 金字塔需『組欄名 | 左名 | "
                        f"右名』恰三欄（graph.md §四）。"
                    ),
                    line=content_start_line + idx,
                    snippet=header[:80],
                    editorial_ref=EDITORIAL_REF_SHAPE,
                    fix_suggestion=(
                        "header 列改成三欄：組欄名｜左側標籤｜右側標籤，左右數值"
                        "才能共用同一把尺對照。"
                    ),
                )

        elif lang == "tw-arc":
            for idx, row in parsed["data"]:
                fields = row.split("|")
                if len(fields) >= 2 and not _is_numeric(fields[1]):
                    yield Violation(
                        check=CHECK_NAME,
                        severity=DEFAULT_SEVERITY,
                        message=(
                            f"`tw-arc` 資料列「{row[:40]}」第二欄非數字 — 席次欄"
                            f"需為數字（graph.md §四 新模組規範）。"
                        ),
                        line=content_start_line + idx,
                        snippet=row[:80],
                        editorial_ref=EDITORIAL_REF_SHAPE,
                        fix_suggestion=(
                            "第二欄改成純數字席次（如 51）；文字註記放第三欄。"
                        ),
                    )

        elif lang == "tw-multiples":
            sep_count = len(_MULTIPLES_SEP_RE.findall(content))
            if sep_count < 3:
                yield Violation(
                    check=CHECK_NAME,
                    severity=DEFAULT_SEVERITY,
                    message=(
                        f"`tw-multiples` 只偵測到 {sep_count} 個群組分隔（`---`）"
                        f"— 小倍數甜蜜點是 3-20 組（graph.md §四）；"
                        f"少於 3 組改 tw-line 多序列或 tw-versus。"
                    ),
                    line=fence_line,
                    snippet=f"```{lang} …",
                    editorial_ref=EDITORIAL_REF_SHAPE,
                    fix_suggestion=(
                        "用 `---` 另起一列分隔至少三組小圖；1-2 組資料改用 "
                        "tw-line 多序列或 tw-versus。"
                    ),
                )
            elif sep_count > 20:
                yield Violation(
                    check=CHECK_NAME,
                    severity=DEFAULT_SEVERITY,
                    message=(
                        f"`tw-multiples` {sep_count} 個群組 — 小倍數 >20 格難以"
                        f"逐格掃視（graph.md §四），先聚合分組再畫。"
                    ),
                    line=fence_line,
                    snippet=f"```{lang} …",
                    editorial_ref=EDITORIAL_REF_SHAPE,
                    fix_suggestion=(
                        "把群組數壓到 ≤20；相近類別先合併，或拆成多張 tw-multiples。"
                    ),
                )
