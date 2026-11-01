"""image_health — article image references + frontmatter coherence + count gate.

Migrated from `scripts/tools/article-image-health.sh` (REWRITE-PIPELINE
Stage 4.5f hard gate per REFLEXES #30).

Dimensions:
  1. inline `![alt](path)` references — `path` must exist on disk;
     external hot-link detection here still allows
     `https://upload.wikimedia.org/...` / `https://commons.wikimedia.org/...`
     (canonical CC sources) for inline scene-mid images
  2. frontmatter `image:` — file must exist; **no Wikimedia allowlist**
     (2026-09-05 OBSERVER-QUEUE #42 哲宇拍板) — 卡片圖同時是分享用素材，
     曝光度最高，一律要求本地 `/article-images/...`（image-ingest.mjs
     收進庫：授權核對 + 清 EXIF + 轉 WebP），不再允許 Wikimedia 熱連結，
     即使是 CC 授權。全站 66 篇盤點：51 篇收進庫、15 篇授權不明/主題不符/
     來源已下架而暫留 `imageNote:` 待補圖。inline（dimension 1）不在本次
     範圍內，熱連結白名單維持不變。
  4. ## 圖片來源 section presence (when CC images used) — 各語言說法皆可，
     見 `_RE_IMAGE_SOURCES_H2`
  5. **image count gate (added 2026-05-11 kind-mirzakhani per 哲宇 callout)** —
     depth article 理想 hero + 1-2 scene-mid = 2-3 張，min_images=3 預設
     soft-launch WARN（legacy heal），rewrite-stage-4 profile severity_override
     升 HARD。觸發：NMTH 文章 ship 後哲宇 callout「為什麼圖片用那麼少」揭露
     Step 4.3.1 三段敘事節奏沒儀器化進 article-health（REFLEXES #15 反覆浮現要儀器化
     第 N 次驗證）。

Severity: HARD for missing files / hot-links, WARN for missing 圖片來源 section,
configurable WARN/HARD for min-count gate via options.
"""

from __future__ import annotations
import os
import re
from pathlib import Path
from typing import Any, Iterator

from ..langs import TRANSLATION_LANGS
from ..types import FileTarget, Severity, Violation


CHECK_NAME = "image-health"
DIMENSION = "media"
DEFAULT_SEVERITY = Severity.HARD
EDITORIAL_REF = "REWRITE-PIPELINE Stage 1 Step 1.14 + Stage 4 Step 4.3 / REFLEXES #30"
APPLIES_TO = ["*"]

# Defaults — overridable via profile options
DEFAULT_MIN_IMAGES = 3
# Soft-launch WARN for both 0-image and 1-2-image cases (mirrors word-count
# pattern: legacy 文章下不到門檻不 hard-block pre-commit，避免改 typo 也被擋；
# rewrite-stage-4 profile severity_override 升 HARD 對 new article 強制達標)。
DEFAULT_MIN_IMAGES_SEVERITY = "warn"  # rewrite-stage-4 promotes to "hard"
DEFAULT_ZERO_IMAGES_SEVERITY = "warn"  # rewrite-stage-4 promotes to "hard"

# 2026-06-07 哲宇 directive「媒體完整度低標提升 + length-scaled」(REWRITE v6.8)：
# depth article 媒體下限隨字數縮放。effective_min = max(min_images, round(CJK / cjk_per_media))。
# 校準語料 (複雜生活節 13 媒體/10.4k=1.25 + 設研院 5/5.3k + 天下 6/6.4k + 黃魚鴞 3/3.6k)：
# cjk_per_media=1200 → 4500→4 / 7000→6 / 9000→8 / 10440→9；named 富媒體範本全過、
# text-only (雜學校 0) 失格。length_scaled 預設 off，rewrite-stage-4 profile override on。
DEFAULT_LENGTH_SCALED = False
DEFAULT_CJK_PER_MEDIA = 1200
# 呈現比例（2026-10-21）：文章模板改成依原比例呈現、不裁切（寬 ≤ 欄寬、高 ≤
# min(75vh, 640px)），比例不再是「會不會被切」的閘門，只剩極端值會呈現成看不清的
# 細條。校準全站 1,000+ 張 inline＋hero：比例最窄 0.43（書封）、最寬 2.84（夜景
# 全景），0.4–3.5 外 0 張 → WARN 只在真的離譜時響。
ASPECT_MIN = 0.4
ASPECT_MAX = 3.5

# Markdown image syntax: ![alt](src)
#
# 2026-09-09：`[^)\n]+` 在第一個 `)` 截斷，於是含括號的 Commons 網址被切一半——
# CommonMark 規定這種網址要用 `<...>` 包起來（`<https://…/Foo_(12345)>`），而
# prettier 會自動補上那層包裝。結果是：截斷後的字串不以 `/` 或 `http` 開頭，
# 被當成本地路徑，報「圖片檔不存在」。譯者把 angle bracket 拿掉，下一次
# commit 時 prettier 又加回去，來回無解。
#
# 同型病在 translate.py 的 URL tokenizer 修過兩次（BABEL-VORTEX-LOOP v1.19／
# v1.20），這裡是第三個工具——angle-wrapped target 要整段吃下，不能靠右括號斷句。
_RE_INLINE_IMAGE = re.compile(r"!\[([^\]]*)\]\((<[^>\n]+>|[^)\n]+)\)")


def _img_src(m: "re.Match") -> str:
    """取圖片 target，剝掉 CommonMark 的 angle bracket 包裝。"""
    return m.group(2).strip().lstrip("<").rstrip(">").strip()
# 2026-06-04: count 影片 iframe toward the media threshold (哲宇「圖+影片」directive).
_RE_IFRAME = re.compile(r"<iframe[\s>]", re.IGNORECASE)
# 2026-07-16: count tw-* 視覺化模組 toward the media threshold — EDITORIAL v6.5 band 定義
# 「圖+影片+視覺模組 ≈ 1 媒體 / 500–800 字（含 hero 與 tw-* 模組）」；paragraph_rhythm 的
# density 已這樣數，本 gate 漏了 → 大罷免 dogfood F7 儀器漂移 (REFLEXES #56)。
_RE_VIZ_MODULE = re.compile(r"^```tw-[a-z]+", re.MULTILINE)
# §3 的圖片出處小標 —— 各語言各自的說法，不是只有中文。
#
# 2026-07-24：原本寫死 `^##\s*圖片來源`，於是每一篇 frontmatter 有 imageCredit 的
# 非中文譯文都必噴 warn —— 全 corpus 1,022 筆裡有 759 筆是這樣來的假陽性
# （en/ja/ko/es/fr 各約 150 筆），真正缺出處區塊的只有 263 篇。假陽性佔 74%，
# 等於這條 warn 對譯文完全失去訊號。
#
# 樣式（不是逐字清單）比對，因為既有語料本身就有變體：en 有 Image Sources ×119 /
# Image Credits ×23、es 有 Fuentes de imágenes ×73 / Fuentes de las imágenes ×39 /
# Créditos de imágenes ×18、fr 有 Sources des images ×130 / Crédits photographiques ×10。
# 逐字表會漏長尾（Fuentes imágenes、Crédits images、画像と動画の出典…）。
#
# 聯集比對、不看檔案本身的 lang：中文標題殘留在譯文裡（ja ×8、en ×4）確實是
# 沒翻到底，但它「是」出處區塊，這條 check 要問的是有沒有 cite，不是翻得夠不夠徹底。
# vi/id/pt/hi 目前沒有任何一篇有 imageCredit，那四行樣式是照該語言常用詞先擺著、
# 尚無語料佐證，標記為 provisional；猜錯的代價是一筆 warn，不擋 CI。
_RE_IMAGE_SOURCES_H2 = re.compile(
    r"^##[ \t]*(?:"
    # zh-TW（SSOT）── 圖片／影片／照片 … 來源／出處
    r"[^\n]*(?:圖片|图片|影片|照片)[^\n]*(?:來源|来源|出處|出处)"
    # ja ── 画像／写真／動画／映像 … 出典／クレジット
    r"|[^\n]*(?:画像|写真|動画|映像)[^\n]*(?:出典|出處|來源|来源|クレジット)"
    # ko ── 이미지／사진／영상 … 출처／크레딧
    r"|[^\n]*(?:이미지|사진|영상)[^\n]*(?:출처|크레딧)"
    # en ── Image／Photo／Video／Media … Source(s)／Credit(s)
    r"|(?i:[^\n]*\b(?:image|photo|video|media)\w*\b[^\n]*\b(?:sources?|credits?)\b)"
    # es ── Fuentes／Créditos … imagen(es)／foto(s)／vídeo(s)
    r"|(?i:[^\n]*\b(?:fuentes?|cr[ée]ditos?)\b[^\n]*\b(?:im[áa]genes?|imagen|fotos?|v[ií]deos?)\b)"
    # fr ── Sources／Crédits … images／photographiques／vidéos
    r"|(?i:[^\n]*\b(?:sources?|cr[ée]dits?)\b[^\n]*\b(?:images?|photographiques?|photos?|vid[ée]os?)\b)"
    # pt（provisional，尚無語料）── Fontes／Créditos … imagem(ns)／foto(s)
    r"|(?i:[^\n]*\b(?:fontes?|cr[ée]ditos?)\b[^\n]*\b(?:imagens?|imagem|fotos?|v[ií]deos?)\b)"
    # id（provisional，尚無語料）── Sumber … gambar／foto
    r"|(?i:[^\n]*\bsumber\b[^\n]*\b(?:gambar|foto|video)\w*\b)"
    # vi（provisional，尚無語料）── Nguồn … ảnh／hình
    r"|(?i:[^\n]*\bngu[ồo]n\b[^\n]*(?:ảnh|hình|video))"
    # hi（provisional，尚無語料）── छवि／चित्र／तस्वीर … स्रोत／साभार
    r"|[^\n]*(?:छवि|चित्र|तस्वीर)[^\n]*(?:स्रोत|साभार)"
    # ru ── Источники／Кредиты … изображений／фотографий
    r"|(?i:[^\n]*(?:источники?|кредиты?)[^\n]*(?:изображени[йя]|фотографи[йя]|фото|видео))"
    # ar ── مصادر／حقوق … الصور／الصور الفوتوغرافية
    r"|[^\n]*(?:مصادر|حقوق)[^\n]*(?:الصور|صورة|الفيديو)"
    # de ── Bildquellen／Bildnachweis／Fotonachweis／Medienquellen（複合詞，
    # 不像羅曼語系拆成兩個字，所以不能套上面 sources+images 的兩段式樣式）
    #
    # 2026-09-09：原樣式要求兩個詞素直接相連，於是漏掉德文正字法完全合法的兩種
    # 構詞——連字號複合詞（Bild-Quelle、Bild- und Videoquelle）與帶 Fugenelement
    # 的（Bilderquellen）。既有 36 篇 de 譯文實際用了八種寫法，`Bildquellen` 26 篇
    # 是主流，其餘七種各 1-4 篇。委派層一篇寫 `Bild-Quelle` 因此吃到假陽性 warn。
    # `[-\s]?` 只放行 0 或 1 個連接符，`Bilder geben ihnen Namen` 這類正文標題
    # 仍不匹配（bilder 之後接的不是 quellen/nachweise 家族）。
    r"|(?i:[^\n]*\b(?:bild|bilder|foto|fotos|video|medien)[-\s]?(?:quellen?|nachweise?|rechte|credits?)\b)"
    r")[ \t]*$",
    re.MULTILINE,
)
_RE_CJK = re.compile(r"[一-鿿㐀-䶿]")
# length-scaling 用 prose-CJK (strip 參考資料 footnote 段) — footnotes 可 inflate CJK ~25%
# → 過度要求媒體。對齊 paragraph_rhythm density 的 prose 基準 (校準保留 設研院/天下/黃魚鴞)。
# 2026-07-16 F7b：文章可能沒有「## 參考資料」標題、直接以裸 [^n]: 定義區收尾（大罷免案例，
# footnote 灌 CJK 讓下限 5→7），補「第一個 footnote 定義行」與「## 圖片來源」當截斷錨。
_RE_REF_SECTION = re.compile(r"^##\s*參考資料|^##\s*圖片來源|^\[\^\d+\]:", re.MULTILINE)
# caption 渲染檢查：HTML block (</div> / </iframe>) 緊接 markdown italic caption (_..._) 無空行
# → remark/markdown 不會 render italic (底線變字面字元)。2026-06-07 哲宇 directive (live review
# 複雜生活節 3 支影片 caption 都缺空行)。working pattern (陳建年)：</div> 跟 _caption_ 之間有空行。
_RE_CAPTION_NO_BLANK = re.compile(r"</(?:div|iframe)>[ \t]*\n_")


def _is_local_path(src: str) -> bool:
    """Local image: starts with / or article-images/ or no scheme."""
    return not src.startswith(("http://", "https://"))


def _is_allowed_external(src: str) -> bool:
    """Allow Wikimedia / commons (canonical CC sources)."""
    allowed_prefixes = (
        "https://upload.wikimedia.org/",
        "https://commons.wikimedia.org/",
    )
    return src.startswith(allowed_prefixes)


def _is_excluded_from_count_gate(path_str: str) -> bool:
    """Skip min-count gate for hub / translations / spores / meta files.

    Mirrors word_count._is_excluded_path. Path patterns use substring match
    so both absolute and repo-relative paths are handled.
    """
    p = path_str.replace("\\", "/")
    if not p.endswith(".md"):
        return True
    # Translation files (knowledge/{lang}/...) — 語言清單吃 langs.py SSOT。
    # 2026-07-24：原本寫死 ("en","ja","ko","es","fr") 停在出生戰役前的五語世界，
    # vi/id/pt/hi 因此漏出這道排除，被套上只對 zh-TW SSOT 有意義的媒體數量門檻 ——
    # 四語各 35 篇（共 140 筆）誤報，其中 136 筆是「0 媒體」。譯文不自備圖，
    # 媒體是 zh 原文的責任，本來就該整條 skip。
    for lang in TRANSLATION_LANGS:
        if f"knowledge/{lang}/" in p:
            return True
    # Hub pages — knowledge/{Category}/_X.md
    if os.path.basename(p).startswith("_"):
        return True
    # Spore artifacts
    if "SPORE-BLUEPRINTS/" in p or "SPORE-HARVESTS/" in p:
        return True
    # Memory / diary / reports / research
    if "memory/" in p or "diary/" in p:
        return True
    if "reports/" in p:
        return True
    # Only apply to zh-TW knowledge articles
    if "knowledge/" not in p:
        return True
    return False


def _parse_severity(value: Any, fallback: Severity) -> Severity:
    if isinstance(value, Severity):
        return value
    if not value:
        return fallback
    try:
        return Severity(str(value).lower())
    except ValueError:
        return fallback


def check(target: FileTarget, config: dict[str, Any]) -> Iterator[Violation]:
    body = target.body
    repo_root = Path.cwd()
    public_root = repo_root / "public"
    options = config or {}

    # ── Pre-compute counts (used for stats INFO + min gate) ──────────────────
    inline_matches = list(_RE_INLINE_IMAGE.finditer(body))
    inline_count = len(inline_matches)
    fm_image = target.frontmatter.get("image")
    has_fm_image = isinstance(fm_image, str) and fm_image.strip() != ""
    total_images = inline_count + (1 if has_fm_image else 0)

    # ── 0. Stats INFO (always emit so users see count) ────────────────────────
    yield Violation(
        check=CHECK_NAME,
        severity=Severity.INFO,
        message=(
            f"圖片統計：{inline_count} inline + "
            f"{1 if has_fm_image else 0} hero (frontmatter) = "
            f"{total_images} 張"
        ),
        editorial_ref=EDITORIAL_REF,
    )

    # ── 1. inline image references — broken-path / hot-link HARD gate ────────
    for m in inline_matches:
        alt, src = m.group(1), _img_src(m)
        line_no = body.count("\n", 0, m.start()) + 1
        if not _is_local_path(src):
            if not _is_allowed_external(src):
                yield Violation(
                    check=CHECK_NAME,
                    severity=Severity.HARD,
                    message=(
                        "外部圖片熱連結 — 圖片應 cache 到 public/article-images/"
                        " 並改 src=`/article-images/...`"
                    ),
                    line=line_no,
                    snippet=src[:80],
                    editorial_ref=EDITORIAL_REF,
                )
            continue
        # Local: validate file exists (relative to public/ for absolute paths)
        if src.startswith("/"):
            local = public_root / src.lstrip("/")
        else:
            local = target.path.parent / src
        if not local.exists():
            yield Violation(
                check=CHECK_NAME,
                severity=Severity.HARD,
                message=f"圖片檔不存在: {src}",
                line=line_no,
                snippet=src[:80],
                editorial_ref=EDITORIAL_REF,
            )

    # ── 1b. 同一張圖在同一篇重複出現 HARD gate（2026-08-27）────────────────
    # 媒體下限（圖＋影片＋viz ≥ 3）是個計數器，而計數器會製造湊數的誘因：把同一張
    # 圖貼三次，數字就到了。維護 cycle 實測全站五篇這樣做，其中林佳辰那篇把一張
    # 國家音樂廳管弦樂照片同時當卡片圖與兩處內文圖，三段圖說都自己寫著「此圖不是
    # 林佳辰演出現場」。讀者看到的是一篇有三張圖的文章，實際上只有一張，而且跟主角
    # 無關。LESSONS `gate-triggers-content-degradation-incentive` 的第 N 次：
    # 閘門量什麼，投稿端就長出什麼形狀去滿足它。
    # 只數 inline 之間的重複，**不把 frontmatter hero 算進去**。第一版把 hero 也
    # 計入，dogfood 全站 125 篇命中，拆開一看 108 篇是「卡片圖同時當開頭圖」——
    # 那是站上既有慣例，不是湊數。把慣例跟湊數混進同一個計數器，就是 REFLEXES #38
    # 「混維度 = silent killer」在閘門層的樣子；照那版上線會一次誤殺 108 篇好文章
    # （REFLEXES #66：閾值要用真實產出 dogfood 校準，不是憑想像設）。
    # 拆開後真訊號 11 篇。判準硬（同一個 src 字串在內文出現 ≥2 次），不需要判斷力。
    _seen_src: dict[str, int] = {}
    for m in inline_matches:
        _seen_src[_img_src(m)] = _seen_src.get(_img_src(m), 0) + 1
    for src, n in _seen_src.items():
        if n >= 2:
            yield Violation(
                check=CHECK_NAME,
                severity=Severity.HARD,
                message=(
                    f"同一張圖在本篇重複 {n} 次 — 媒體下限要的是不同的畫面，"
                    f"不是同一張貼幾遍。刪掉重複的，或換一張真的跟該段落有關的圖"
                ),
                snippet=src[:80],
                editorial_ref=EDITORIAL_REF,
            )

    # ── 1c. 呈現比例 WARN（2026-10-21）────────────────────────────────────────
    # 模板依原比例呈現圖，不再裁切（〈一同走過從前〉張照堂直式照被 cover 切到頭，
    # 哲宇：「就是要能適用不同大小的比例怎麼呈現在文章中，不是強制裁切圖」）。
    # 這裡只抓極端比例：< 0.4 在桌機變成一條 ≤ 256px 寬的窄柱，> 3.5 變成一條
    # ≤ 210px 高的細帶。修法是挑對的畫面或依主體重裁，不是補邊湊比例。
    try:
        from PIL import Image as _PILImage  # optional; CI 沒裝就跳過
    except Exception:  # pragma: no cover
        _PILImage = None
    if _PILImage is not None:
        _aspect_srcs = [_img_src(m) for m in inline_matches]
        if has_fm_image:
            _aspect_srcs.append(fm_image.strip())
        for src in dict.fromkeys(_aspect_srcs):
            if not src.startswith("/"):
                continue
            local = public_root / src.lstrip("/")
            if not local.exists():
                continue
            try:
                with _PILImage.open(local) as im:
                    w, h = im.size
            except Exception:
                continue
            if not h:
                continue
            ratio = w / h
            if ratio < ASPECT_MIN or ratio > ASPECT_MAX:
                yield Violation(
                    check=CHECK_NAME,
                    severity=Severity.WARN,
                    message=(
                        f"圖片比例 {ratio:.2f}（{w}×{h}）超出 {ASPECT_MIN}–{ASPECT_MAX}："
                        + ("極長直圖在桌機會變成一條窄柱" if ratio < ASPECT_MIN
                           else "極寬橫幅在桌機會變成一條細帶")
                        + "。模板依原比例呈現不裁切，請挑對的畫面或依主體重裁，不要補邊湊比例"
                    ),
                    snippet=src[:80],
                    editorial_ref="REWRITE-PIPELINE-SINGLE Step 4.3.3 呈現比例",
                )

    # ── 2. frontmatter image — hot-link + file existence HARD gate ───────────
    # hero 圖跟 inline 圖走同一條規則。2026-08-23 之前這裡只驗本地路徑存不存在，
    # 外部熱連結整條分支不進去 —— 於是全站曝光度最高的那張圖（卡片圖、OG 分享圖）
    # 是唯一沒有熱連結閘門的圖。REFLEXES #83 兩把尺 / #87 保護密度跟曝光量成反比。
    #
    # 2026-09-05（OBSERVER-QUEUE #42 哲宇拍板）：卡片圖的 Wikimedia 白名單移除。
    # 不再呼叫 `_is_allowed_external` —— 任何非本地路徑（含 upload.wikimedia.org /
    # commons.wikimedia.org）一律 HARD。理由：卡片圖同時是分享素材、曝光度最高，
    # CC 授權只保證「能用」，不保證「穩」（Wikimedia 429 / 縮圖服務不穩 / 原檔可能
    # 被上游刪除或改名——這次全站盤點就抓到 11 篇卡片圖來源已經 404）。全部收進庫用
    # image-ingest.mjs（授權核對 + 清 EXIF + 轉 WebP + 落 public/article-images/），
    # 收不進去的（授權不明 / 主題不符 / 來源已下架 / 解析度太低）清空 image: 並補
    # `imageNote:` 待觀察者決定，不留熱連結。inline 圖（dimension 1，上面 `_is_local_path`
    # 分支之前那段）不在本次範圍，仍走 `_is_allowed_external` 白名單。
    if has_fm_image:
        src = fm_image.strip()
        if not _is_local_path(src):
            yield Violation(
                check=CHECK_NAME,
                severity=Severity.HARD,
                message=(
                    "frontmatter image 外部熱連結 — 卡片圖不再允許 Wikimedia 例外，"
                    "圖片應 cache 到 public/article-images/ 並改 "
                    "image: `/article-images/...`"
                ),
                snippet=src[:80],
                editorial_ref=EDITORIAL_REF,
            )
        else:
            local = public_root / src.lstrip("/")
            if not local.exists():
                yield Violation(
                    check=CHECK_NAME,
                    severity=Severity.HARD,
                    message=f"frontmatter image 檔不存在: {src}",
                    snippet=src[:80],
                    editorial_ref=EDITORIAL_REF,
                )

    # ── 3. ## 圖片來源 section when CC attribution exists ────────────────────
    has_attribution = (
        target.frontmatter.get("imageCredit")
        or target.frontmatter.get("imageLicense")
        or target.frontmatter.get("imageSource")
    )
    if has_attribution and not _RE_IMAGE_SOURCES_H2.search(body):
        yield Violation(
            check=CHECK_NAME,
            severity=Severity.WARN,
            message=(
                "frontmatter 有 imageCredit/imageLicense/imageSource 但缺 "
                "`## 圖片來源` section (CC 圖片需 cite 來源)；譯文用該語言的說法即可"
                "（Image Sources／画像出典／이미지 출처／Fuentes de imágenes／"
                "Sources des images…）"
            ),
            editorial_ref=EDITORIAL_REF,
        )

    # ── 3.5 caption render：HTML block 緊接 _caption_ 無空行 (italic 不 render) ──
    for m in _RE_CAPTION_NO_BLANK.finditer(body):
        line_no = body.count("\n", 0, m.start()) + 1
        yield Violation(
            check=CHECK_NAME,
            severity=Severity.WARN,
            message=(
                "影片/HTML caption 缺空行：`</div>`／`</iframe>` 緊接 `_caption_` "
                "無空行 → markdown 不 render italic (底線變字面字元)。"
            ),
            line=line_no,
            snippet="</div>↵_caption_  (應 </div>↵↵_caption_)",
            editorial_ref="REWRITE-PIPELINE Step 4.3.6 iframe caption 格式",
            fix_suggestion="在 </div> 跟 _caption_ 之間補一個空行 (對齊 陳建年 working pattern)。",
        )

    # ── 4. Min image count gate (depth article media rhythm) ──────────────────
    # Per REWRITE-PIPELINE Step 4.3.1 — depth article 理想 hero + 1-2 scene-mid
    # = 2-3 張。default min_images=3, soft-launch WARN, rewrite-stage-4 升 HARD.
    if not _is_excluded_from_count_gate(str(target.path)):
        min_images = int(options.get("min_images", DEFAULT_MIN_IMAGES))
        # length-scaled 媒體下限 (v6.8)：長文需要更多媒體立體呈現。effective_min =
        # max(base, round(CJK/cjk_per_media))。校準 cjk_per_media=1200 → 4500→4 / 7000→6 /
        # 9000→8。base min_images 是短 depth 的 floor，length-scale 把長文往上拉。
        if options.get("length_scaled", DEFAULT_LENGTH_SCALED):
            ref_m = _RE_REF_SECTION.search(body)
            prose_body = body[: ref_m.start()] if ref_m else body
            cjk = len(_RE_CJK.findall(prose_body))
            per = int(options.get("cjk_per_media", DEFAULT_CJK_PER_MEDIA)) or DEFAULT_CJK_PER_MEDIA
            min_images = max(min_images, round(cjk / per))
        # 2026-06-04 哲宇 directive「圖+影片 valued together」：門檻算「媒體」(圖+影片)，
        # 不再只算圖。但保留 ≥1 靜態圖 floor (OG card / spore poster 需要靜態圖，影片無法 derive)。
        # 修補：video-rich 範本 黃魚鴞 (1 圖+2 官方影片=3 媒體) 原本被 image-only 門檻 hard-fail。
        iframe_count = len(_RE_IFRAME.findall(body))
        # 2026-07-16 F7a：tw-* 視覺化模組計入媒體總量（per EDITORIAL v6.5 band「含 tw-* 模組」；
        # 與 paragraph_rhythm density 同一把尺）。靜態圖 ≥1 floor 不變。
        viz_count = len(_RE_VIZ_MODULE.findall(body))
        media_total = total_images + iframe_count + viz_count
        if media_total >= min_images and total_images == 0:
            # 媒體夠但 0 靜態圖 — OG card / poster 缺素材 (影片 thumbnail 不可靠)
            yield Violation(
                check=CHECK_NAME,
                severity=_parse_severity(
                    options.get("min_images_severity"),
                    Severity(DEFAULT_MIN_IMAGES_SEVERITY),
                ),
                message=(
                    f"缺靜態圖：{iframe_count} 影片但 0 圖 — 至少補 1 張 hero "
                    "(OG 社群卡 / spore poster 需靜態圖，影片 thumbnail 不可靠)"
                ),
                fix_suggestion="補 1 張 hero 圖 (frontmatter image:) 即可解，影片仍計入媒體總量。",
                editorial_ref=EDITORIAL_REF,
            )
        elif media_total < min_images:
            if media_total == 0:
                # 0 media = broken article (always HARD by default)
                sev = _parse_severity(
                    options.get("zero_images_severity"),
                    Severity(DEFAULT_ZERO_IMAGES_SEVERITY),
                )
                msg_detail = (
                    f"0 媒體 — depth article 應至少 hero + scene-mid / 影片共 "
                    f"{min_images} (per REWRITE-PIPELINE Step 4.3.1 三段敘事節奏)"
                )
            else:
                # 1-2 media = below ideal (configurable WARN/HARD)
                sev = _parse_severity(
                    options.get("min_images_severity"),
                    Severity(DEFAULT_MIN_IMAGES_SEVERITY),
                )
                msg_detail = (
                    f"媒體不足：圖 {total_images} + 影片 {iframe_count} + viz {viz_count} "
                    f"= {media_total} < {min_images} 下限 (depth article 理想 hero + "
                    f"scene-mid / 官方影片 / tw-* 模組，per EDITORIAL v6.5 band)"
                )
            yield Violation(
                check=CHECK_NAME,
                severity=sev,
                message=msg_detail,
                fix_suggestion=(
                    "走 REWRITE-PIPELINE Stage 1 Step 1.14 媒體素材研究："
                    "(1) PD/CC 圖庫 cache 進 public/article-images/{category}/ "
                    "(2) check-aspect.sh 看呈現尺寸（模板依原比例不裁切；0.4–3.5 內都能用）"
                    "(3) Stage 4 Step 4.3 插入文章 (hero + scene-mid 三段節奏) "
                    "(4) §圖片來源 section 標 CC license + 攝影者。"
                    "找不到 PD/CC → fair use editorial commentary scope "
                    "(per Step 1.14.2 第 8 點)"
                ),
                editorial_ref=EDITORIAL_REF,
            )
