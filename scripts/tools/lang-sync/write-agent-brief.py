#!/usr/bin/env python3
"""
write-agent-brief.py — 把委派 agent 的交件契約寫進派工單。

為什麼寫進派工單而不是 prompt：
  SQUEEZE §Z2.0 要求 backend prompt 內嵌規則、不能只給 path pointer，理由是
  sub-agent 不會主動去讀（REFLEXES #42）。但派工單是 agent **必然**會讀的檔案
  ——它需要 zh_path / en_path / expected_structure 才知道要做什麼——所以寫在
  這裡同樣是內嵌，而且比 prompt 好：prompt 每派一隻就要重打一次，重打就會漂移。
  2026-09-09 實測：同一條 tags/subcategory 規則在 prompt 版連續兩隻 agent 讀錯，
  改放派工單之後的批次全部正確。

為什麼每條規則都帶「為什麼」和日期：
  agent 讀到「tags 要翻、subcategory 不要翻」會想知道為什麼是相反的，猜錯就
  自己合併成一條。帶上實撞出處之後，它有東西可以對照，也不會覺得是筆誤。

用法：
  python3 scripts/tools/lang-sync/write-agent-brief.py .lang-sync-tasks/de-haiku-02
  python3 scripts/tools/lang-sync/write-agent-brief.py .lang-sync-tasks/vi-haiku-01 --lang vi
"""
import argparse
import json
import re
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent.parent.parent
GUIDE_DIR = REPO / "docs/editorial/per-language"

# 圖片來源區的 canonical 標題，依語言。checker 認得的變體更多，但譯者該用哪個
# 只有一個答案——同一語言八種寫法會讓任何對賬都變成猜謎（de 實測就是八種）。
IMAGE_SOURCE_H2 = {
    "en": "## Image Sources", "ja": "## 画像出典", "ko": "## 이미지 출처",
    "es": "## Fuentes de imágenes", "fr": "## Sources des images",
    "de": "## Bildquellen", "pt": "## Fontes das imagens", "id": "## Sumber gambar",
    "vi": "## Nguồn hình ảnh", "ru": "## Источники изображений",
    "ar": "## مصادر الصور", "hi": "## छवि स्रोत",
}


# SQUEEZE §第五層分派表的門檻。寫成常數而不是散在判斷式裡，是因為它是 canonical
# 的數字，改它等於改分派政策——要能一眼看到、也要能一處改。
HEAVY_FOOTNOTES = 30
HEAVY_URLS = 40
# 分派表的另一半：「累計失敗 ≥3 → Sonnet」（SQUEEZE §第五層，2026-08-01 定型：
# 「5/5 收下累計敗 125 次的殘骸；換引擎救不了」）。2026-09-26 補進來——本檔
# 2026-09-09 誕生時只實作了引用密度那一半，於是一批累計撞牆 5-10 次的中篇 stale
# 全被標成 haiku，主 session 得自己記得去查 fail-memo 才派對（REFLEXES #56：
# canonical 寫了兩個條件，工具只執行一個，差的那個靠人記得）。
HEAVY_FAILS = 3
FAIL_MEMO = REPO / "reports" / "babel" / "fail-memo.json"


def load_fail_counts() -> dict[str, int]:
    """讀產線的跨 run 難篇帳（`lang:zh_path` → 累計失敗次數）。讀不到回空 dict：
    缺帳時退回只看引用密度，不讓工具因為一個儀器檔不在就整批停擺。"""
    try:
        return {k: int(v) for k, v in json.loads(FAIL_MEMO.read_text(encoding="utf-8")).items()}
    except (OSError, ValueError, TypeError):
        return {}


def delegation_tier(article: dict, fails: int = 0) -> dict:
    """依 SQUEEZE §第五層分派表判斷這一篇該給誰。

    為什麼要有這支：規則 2026-08-01 就寫在 canonical 裡（「累計失敗 ≥3 或引用密集
    （腳註>30／URL>40）→ Sonnet 委派；5/5 收下累計敗 125 次的殘骸，換引擎救不了」），
    但派工這一端沒有任何東西在執行它。2026-09-09 實測：我把一批高失敗的 pt 文章
    全派給 Haiku，其中 91 腳註／135 URL 那篇交回來的腳註區跟中文原文一字不差、
    URL 少 5 個、翻譯比 1.05；62 腳註那篇只翻出開頭四十行。同一批的 68 腳註那篇
    倒是成功了（用掉 134K token），所以門檻不是懸崖是斜坡——但斜坡上該換車。

    對照組說明了這個判準有多要緊：同一天的 vi 批次是按「missing 新到舊」排的，
    引用密集的只佔 1/40，Haiku 幾乎全過；高失敗批次的引用密集佔 45-47%，因為
    產線反覆撞牆的文章本來就偏向引用密集——這兩件事是同一個原因的兩面。
    """
    e = article.get("expected_structure") or {}
    fn, urls = e.get("footnote_defs", 0), e.get("urls", 0)
    heavy = fn > HEAVY_FOOTNOTES or urls > HEAVY_URLS
    failed = fails >= HEAVY_FAILS
    if heavy:
        why = (f"引用密集（腳註 {fn}／網址 {urls}，門檻 >{HEAVY_FOOTNOTES}／>{HEAVY_URLS}）"
               "——SQUEEZE §第五層：這類換引擎救不了，要換模型")
    elif failed:
        why = (f"產線累計失敗 {fails} 次（門檻 ≥{HEAVY_FAILS}，腳註 {fn}／網址 {urls}）"
               "——SQUEEZE §第五層：撞牆多次的殘骸換引擎救不了，要換模型")
    else:
        why = f"一般篇幅（腳註 {fn}／網址 {urls}，產線失敗 {fails} 次）"
    return {"tier": "sonnet" if (heavy or failed) else "haiku", "why": why}


def guide_sections(lang: str) -> dict[str, str]:
    """從 `TRANSLATION-{lang}.md` 抽出 §Z2.0 指定要內嵌的那幾節原文。

    為什麼抽原文而不是手寫摘要：手寫十二語的詞表要讀十二份 guide，而且寫完就
    定住了——guide 之後改了，派工單裡的那份不會跟著改（REFLEXES #56 的 drift）。
    抽原文的話 canonical 改一次，下一批派工單就是新的。

    抽哪幾節：§Z2.0 hard gate 點名的 §1 國名／§2 人名／§3 地名／§6 主權詞表，
    加上 §TL;DR（每份 guide 自己排序過的最高優先項）與 §5 政治歷史敏感詞。
    用編號定位不用標題字面——十二語的標題各自是自己的語言。
    """
    p = GUIDE_DIR / f"TRANSLATION-{lang}.md"
    if not p.exists():
        return {}
    t = p.read_text(encoding="utf-8")
    out: dict[str, str] = {}
    heads = [(m.start(), m.group(0)) for m in re.finditer(r"^## .*$", t, re.M)]
    for i, (pos, head) in enumerate(heads):
        end = heads[i + 1][0] if i + 1 < len(heads) else len(t)
        body = t[pos:end].strip()
        num = re.match(r"^## (\d+)\.", head)
        key = None
        if num and num.group(1) in {"1", "2", "3", "5", "6"}:
            key = f"section_{num.group(1)}"
        elif re.match(r"^## TL;DR", head, re.I):
            key = "tldr"
        if key:
            out[key] = body
    return out


def sovereignty_glossary(lang: str) -> dict | None:
    """主權詞表，從 docs/editorial/per-language/TRANSLATION-{lang}.md 的 §TL;DR 與
    §1/§2/§3/§4/§6 抽出來的操作面。

    為什麼要在派工單裡帶一份而不是叫 agent 去讀那份 md：SQUEEZE §Z2.0 是 hard
    gate——「backend prompt 必須內嵌目標語言 canonical guide 的關鍵 sections，
    不能只給 path pointer」，因為 sub-agent 不會主動讀（REFLEXES #42）。派工單是
    agent 必讀的檔案，所以放這裡滿足內嵌要求，同時免去每派一隻就重打一次詞表
    （重打就會漂移，而這一層漂移的代價是主權用詞出錯）。

    只收錄已寫過 guide 的語言；沒有的回 None，呼叫端改把詞表 inline 進 prompt。
    """
    if lang == "vi":
        return {
            "_source": "docs/editorial/per-language/TRANSLATION-vi.md（canonical，有疑義以該檔為準）",
            "_why_vi_is_the_highest_risk": "越南主流媒體（VnExpress／Tuổi Trẻ／Thanh Tra／Công an Nhân dân）預設就寫「Đài Loan, Trung Quốc」，因為 2023/12 越中聯合聲明寫進「台灣是中國領土不可分割的一部分」。越南跟中華人民共和國有正式邦交、跟台灣沒有國家級關係，所以 vi 讀者日常接觸的媒體生態比 es/en 更明顯地預設 PRC 框架。Taiwan.md 的越南文聲音必須主動抵抗這股引力，不能順著周圍語料的慣性漂。",
            "top5": [
                "絕不寫 `Đài Loan, Trung Quốc` 或 `Đài Loan (Trung Quốc)` —— 這不是罕見錯誤，是越南主流媒體的預設寫法",
                "台灣政治／歷史人物用漢越音（Thái Anh Văn、Lại Thanh Đức、Tưởng Giới Thạch），不用北京拼音（Cai Yingwen、Lai Qingde、Jiang Jieshi）。首次出現在括號裡補國際羅馬化與漢字",
                "台灣地名用傳統漢越音（Đài Bắc、Cao Hùng、Đài Trung、Đài Nam、Tân Trúc），例外見 places",
                "`Đài Bắc Trung Hoa`（中華台北）只在奧運／IOC／APEC／WHA 語境用；即使在體育語境也絕不寫成 `Đài Loan (Trung Quốc)`",
                "South China Sea 一律 `Biển Đông`，不是 `Biển Nam Trung Hoa`／`Biển Hoa Nam` —— 這不是反 PRC 詞表的一條，是越南人自己的語言主權，Taiwan.md 為越南讀者寫作時尊重那個慣例。反向注意：文章提到台灣主張的東沙／太平島時，台灣的主張跟越南的主張直接重疊，要描述事件不偏向任何一方",
            ],
            "country_terms": {
                "台灣": "Đài Loan（台灣是 quốc gia／đảo quốc／nền dân chủ，不寫 khu vực／vùng lãnh thổ——越南媒體用「vùng lãnh thổ」正是為了迴避承認國家）",
                "中華民國": "Trung Hoa Dân Quốc (Đài Loan)（不可單獨裸寫，會跟 CHND Trung Hoa 混淆；台灣政府自己的越南文管道 vn.taiwantoday.tw 就是這個寫法）",
                "中華台北": "Đài Bắc Trung Hoa（只限 IOC／Olympic／APEC／WHA）",
                "兩岸": "hai bờ eo biển (Đài Loan)／quan hệ hai bờ eo biển（禁 đồng bào hai bờ，那是假設血緣一家的 PRC 框架）",
                "中國大陸": "Trung Quốc đại lục（只在需要明確地理對照時）／否則就寫 Trung Quốc",
                "中國": "Trung Quốc／Cộng hòa Nhân dân Trung Hoa (CHND Trung Hoa)",
                "台灣海峽": "eo biển Đài Loan",
            },
            "people": {
                "蔡英文": "Thái Anh Văn (Tsai Ing-wen)", "賴清德": "Lại Thanh Đức (Lai Ching-te)",
                "蕭美琴": "Tiêu Mỹ Cầm (Hsiao Bi-khim)", "馬英九": "Mã Anh Cửu (Ma Ying-jeou)",
                "陳水扁": "Trần Thủy Biển (Chen Shui-bian)", "李登輝": "Lý Đăng Huy (Lee Teng-hui)",
                "蔣介石": "Tưởng Giới Thạch (Chiang Kai-shek)", "蔣經國": "Tưởng Kinh Quốc (Chiang Ching-kuo)",
                "柯文哲": "Kha Văn Triết (Ko Wen-je)", "連戰": "Liên Chiến (Lien Chan)", "宋楚瑜": "Tống Sở Du (James Soong)",
                "郭台銘": "Terry Gou（越南報紙多直接用國際名，漢越音 Quách Đài Minh 補註即可）",
                "唐鳳": "Audrey Tang（漢越音 Đường Phượng 在越南報紙少見）",
                "張忠謀": "Morris Chang", "黃仁勳": "Jensen Huang", "李安": "Lý An (Ang Lee)",
                "侯孝賢": "Hầu Hiếu Hiền (Hou Hsiao-hsien)",
                "鄧麗君": "Đặng Lệ Quân（特例：漢越音在越南比 Teresa Teng 更通行，1980-90 年代卡帶就是這個名字）",
                "鄭成功": "Trịnh Thành Công (Koxinga)（注意：越南文資料常寫他「替中國收復台灣」，那是 PRC 化的史觀框架，要寫回中性——他擊敗荷蘭人、在島上建立第一個漢人政權，不必綁上現代政治實體意義的「中國」）",
                "_warning_1_fill_in": "遇到表上沒有的台灣人名——音譯它，不要用有名人物填空。2026-07-25 阿拉伯文首批實撞：原文「前衛生署長許子秋聽到女兒⋯」譯成「一位衛生高官，他是蔣經國」，署長被換成總統。這不是混淆兩個已知人物，是填空。生名一律音譯＋括號附漢字：Hứa Tử Thu (許子秋)。",
                "_warning_2_stage_names": "藝名／團名／機構名是標籤不是人名，絕不意譯。2026-08-09 vi 第三批實撞：rapper 壞特（羅馬化藝名 ?te）被譯成 Tệp Xấu（字面意思是「壞掉的檔案」），wikilink 跟著壞成不存在的 /people/tệp-xấu；同篇文化總會變成 Văn hóa Tổng hội。有官方羅馬化就用它（?te（壞特）、V.K、Blow 吹音樂、Naxs Corp（涅所開發）），沒有就保留漢字＋括號註越南文意思。機構有官方英文名就用英文名。",
            },
            "places": {
                "台北": "Đài Bắc（Taipei 只保留在機構名／品牌名如 Taipei 101）", "高雄": "Cao Hùng",
                "台中": "Đài Trung", "台南": "Đài Nam", "新竹": "Tân Trúc", "基隆": "Cơ Long",
                "桃園": "Đào Viên", "花蓮": "Hoa Liên", "宜蘭": "Nghi Lan", "台東": "Đài Đông",
                "屏東": "Bình Đông", "苗栗": "Miêu Lật", "彰化": "Chương Hóa", "雲林": "Vân Lâm",
                "南投": "Nam Đầu", "新北市": "Tân Bắc (thành phố)",
                "嘉義": "Chiayi —— 重要例外，不用漢越音「Gia Nghĩa」，因為越南本來就有 Đắk Nông 省的 Gia Nghĩa 市，撞名會讓讀者查錯",
                "金門": "Kim Môn", "澎湖": "Bành Hồ (quần đảo)", "綠島": "Đảo Xanh／Lục Đảo", "蘭嶼": "Đảo Lan Tự",
                "馬祖": "Mã Tổ（群島，銳聲）—— 最高注意：跟 媽祖 Ma Tổ（海神，無聲調）是兩個不同的字，聲調也不同，很容易打錯",
                "玉山": "núi Ngọc Sơn", "阿里山": "A Lý Sơn", "日月潭": "hồ Nhật Nguyệt",
                "太魯閣": "Taroko（保留 Truku 族語原羅馬化，漢字 太魯閣 只是反向音譯，不可漢越音化成 Thái Lỗ Các）",
                "中央山脈": "dãy núi Trung ương", "淡水河": "sông Đạm Thủy",
            },
            "history_terms": {
                "二二八事件": "Sự kiện 228／Thảm sát 228", "白色恐怖": "Khủng bố Trắng（作為 1947–1987 時代專名大寫）",
                "戒嚴": "thiết quân luật（小寫）；thời kỳ thiết quân luật (1949–1987)",
                "解嚴": "bãi bỏ thiết quân luật／dỡ bỏ thiết quân luật",
                "民國紀年": "正文靜默換算成西元；只在引用法律／憲法原文時並列",
                "本省人": "người bản tỉnh＋註「1945 年前已定居台灣者」", "外省人": "người ngoại tỉnh＋註「1945–1949 隨國民黨遷台者」",
                "日治時期": "thời kỳ Nhật trị／thời kỳ Đài Loan bị Nhật cai trị (1895–1945)（避免 thời Nhật chiếm đóng，那讀起來像短期軍事佔領）",
                "原住民": "người bản địa Đài Loan／các dân tộc Nam Đảo bản địa（避免 thổ dân 這種蔑稱、避免 cao sơn tộc 那種 PRC 化分類框架）",
                "國民黨": "Quốc Dân Đảng／KMT", "民進黨": "Đảng Dân chủ Tiến bộ／DPP",
                "台灣民眾黨": "Đảng Nhân dân Đài Loan／TPP", "時代力量": "Đảng Sức mạnh Thời đại",
                "行政院": "Viện Hành pháp", "立法院": "Viện Lập pháp", "司法院": "Viện Tư pháp",
                "總統府": "Phủ Tổng thống", "外交部": "Bộ Ngoại giao (Đài Loan)", "國軍": "Quân đội Đài Loan",
            },
            "prc_coded_terms_banned": {
                "Đài Loan, Trung Quốc / Đài Loan (Trung Quốc)": "→ Đài Loan",
                "tỉnh Đài Loan (của Trung Quốc)": "→ Đài Loan",
                "đảo Đài Loan (Trung Quốc)": "→ Đài Loan",
                "Đài Bắc (Trung Quốc)": "→ Đài Bắc，或 Đài Bắc Trung Hoa（只在真的是奧運框架時）",
                "khu vực Đài Loan": "→ Đài Loan（把國家降格成行政區）",
                "nhà cầm quyền Đài Bắc / chính quyền Đài Bắc": "→ chính phủ Đài Loan／Viện Hành pháp（「當局」是矮化）",
                "đồng bào Đài Loan": "→ người dân Đài Loan／công dân Đài Loan（台胞是「同血緣」框架）",
                "thống nhất（當成必然未來事件）": "→ 改寫成 quan điểm thống nhất của Trung Quốc（引用 PRC 立場時）或 sáp nhập",
                "giải phóng Đài Loan": "→ 改寫成中國的立場／宣稱，不是中性描述",
                "ly khai / Đài Loan ly khai": "→ chủ trương độc lập của Đài Loan，或描述具體事件",
                "chính sách một Trung Quốc（呈現成不證自明的事實）": "→ chính sách 「một Trung Quốc」，永遠脈絡化成 CHND Trung Hoa／某些國家的立場",
                "北京拼音寫台灣人物（Cai Yingwen / Lai Qingde / Jiang Jieshi）": "→ 漢越音或 Wade-Giles",
                "Trung Quốc Đài Loan": "→ Đài Loan",
                "Biển Nam Trung Hoa / Biển Hoa Nam（指 South China Sea 時）": "→ Biển Đông",
            },
        }
    if lang != "de":
        return None
    return {
        "_source": "docs/editorial/per-language/TRANSLATION-de.md（canonical，有疑義以該檔為準）",
        "top6": [
            "戒嚴 → Kriegsrecht，不可退化成 Ausnahmezustand（後者把軍法審判平民稀釋成程序性用語）",
            "台灣不是 abtrünnige Provinz（叛離的省份）——這詞連中國官方都不用，源自 1982 年紐約時報的 renegade province，是西方媒體以訛傳訛",
            "人名沿用英文/Wade-Giles 既有羅馬化，不另建德文音譯系統",
            "Chinesisch Taipeh 只限奧運／國際體育／APEC／WHO 語境，不可當台灣的隨手替代詞",
            "統一 → Vereinigung；禁止無出處直接用 Wiedervereinigung（它預設了台灣與中國曾經統一過，是北京框架）",
            "北京可用 Peking（德文合法慣用外來語）；但 zh 源沒提北京譯文卻冒出來 = 幻覺式地點遷移，紅線",
        ],
        "country_terms": {
            "台灣": "Taiwan（禁 Taiwan, China／Provinz Taiwan／abtrünnige Provinz）",
            "中華民國": "Republik China (Taiwan)（不可裸寫 Republik China，會跟 1912–1949 大陸時期混淆）",
            "兩岸": "beide Seiten der Taiwanstraße",
            "中國大陸": "das chinesische Festland／Festlandchina",
            "中國": "China／die Volksrepublik China (VR China)",
            "台灣海峽": "die Taiwanstraße",
        },
        "people": {
            "蔣介石": "Chiang Kai-shek（1975 逝）", "蔣經國": "Chiang Ching-kuo（1987 解嚴、1988 逝，跟父親是兩個人）",
            "李登輝": "Lee Teng-hui", "陳水扁": "Chen Shui-bian", "馬英九": "Ma Ying-jeou",
            "蔡英文": "Tsai Ing-wen", "賴清德": "Lai Ching-te（也作 William Lai）", "施明德": "Shih Ming-teh",
            "黃仁勳": "Jensen Huang", "張忠謀": "Morris Chang", "郭台銘": "Terry Gou", "唐鳳": "Audrey Tang",
            "_warning": "不認識的人名一律音譯並在括號附原文漢字，不要拿你知道的有名台灣政治人物去填空。2026-07 阿拉伯文批次實撞：模型不認識許子秋，就寫成「他是蔣經國」——這是填空型幻覺，跟混淆兩個已知人物是不同的病",
        },
        "places": {
            "台北": "Taipeh（也作 Taipei）", "高雄": "Kaohsiung", "台中": "Taichung", "台南": "Tainan",
            "新竹": "Hsinchu", "花蓮": "Hualien", "金門": "Kinmen", "綠島": "Grüne Insel（Ludao）",
            "北京": "Peking 或 Beijing（德文兩者都合法）", "上海": "Shanghai",
        },
        "history_terms": {
            "二二八事件": "der Zwischenfall vom 28. Februar 1947（媒體也用 228 Massaker）",
            "白色恐怖": "der Weiße Terror（大寫起首，1947–1987 的時代專有名詞）",
            "戒嚴": "das Kriegsrecht", "解嚴": "die Aufhebung des Kriegsrechts",
            "本省人": "Benshengren＋首次出現加註「1945 年前已移居台灣者後代」",
            "外省人": "Waishengren＋首次出現加註「1945–1949 年隨國民黨遷台者」",
            "日治時期": "die japanische Kolonialzeit（避免 japanische Besatzung，那讀起來像短期軍事佔領）",
            "原住民": "die indigenen Völker Taiwans／die Ureinwohner Taiwans",
            "國民黨": "Kuomintang (KMT)", "民進黨": "Demokratische Fortschrittspartei (DPP)",
            "台灣民眾黨": "Taiwanische Volkspartei (TPP)",
            "立法院": "Legislativ-Yuan", "行政院": "Exekutiv-Yuan",
            "總統": "Präsident / Präsidentin (der Republik China, Taiwan)",
        },
        "culture_terms": {
            "珍珠奶茶": "Bubble Tea（德文已完全借用英文詞）", "夜市": "Nachtmarkt",
            "小吃": "Snacks／taiwanesische Straßenküche", "媽祖": "Mazu（首次出現加註）",
            "農曆新年": "Mondneujahr（避免只用 das chinesische Neujahrsfest 當唯一形式）",
        },
        "prc_coded_terms_banned": {
            "abtrünnige Provinz": "→ Taiwan（critical）",
            "Taiwan, China": "→ Taiwan（critical）",
            "Provinz Taiwan / chinesische Provinz Taiwan": "→ Taiwan（critical）",
            "unabtrennbarer Bestandteil (Chinas)": "→ 改寫為北京官方立場並註明出處，不作為敘事事實（critical）",
            "Wiedervereinigung（無出處逕自使用）": "→ Vereinigung，或明確標「北京要求的 Wiedervereinigung」（high）",
            "Chinesisch Taipeh（非體育語境）": "→ Taiwan（high）",
            "taiwanesische Behörden / Behörden in Taipeh": "→ die taiwanesische Regierung（medium，「當局」是矮化框架）",
            "Separatisten": "→ Befürworter der taiwanesischen Unabhängigkeit（medium）",
        },
    }


def build(lang: str) -> dict:
    brief = {
        "_": "委派 agent 交件契約。放在派工單裡而不是 prompt 裡，因為 agent 必然會讀這份 JSON——內嵌不是 pointer。每條都有實撞出處。",
        "target_language": lang,
        "frontmatter_rules": {
            "tags": "翻成目標語言",
            "subcategory": "保留中文原值不翻 —— 它是分類頁的分群鍵，翻掉那篇就從所屬群裡掉出去，落進『其他』",
            "_why_these_two_are_listed_apart": "2026-09-09 同一天兩隻 agent 把這兩條混成一條，都把 tags 當成 subcategory 保留了中文。兩條規則相反，不能寫在相鄰的行。",
            "title_description_imageAlt": "翻成目標語言",
            "title_description_不能留漢字": (
                "zh 標題常引用一個漢語詞當主題（〈原住民族正名：從「山胞」到憲法裡的集體主體〉、"
                "〈原住民族姓名：從親名到「豆」「風」〉）。**把那個詞原樣搬進譯文的 title 或 description "
                "會撞 verify-translation 的 hard 閘**——2026-09-10 一波裡 hi 與 ar 同時撞了三次。"
                "正確做法：title／description 用目標語言的音譯或意譯（«पर्वतीय जन»、«دو» و«فنغ»），"
                "**漢字原詞留在正文**，那裡有完整說明也不受這道閘限制。"
                "不要為了避開它而把整個概念拿掉——那是刪內容換綠燈。"
            ),
            "_這條跟正文的漢字規則方向相反_": (
                "**標題裡的漢字要拿掉，正文裡當證據的漢字要留下**——兩條方向相反，"
                "所以寫在一起，不要混成一條（同 tags／subcategory 那組的處理）。"
                "正文的判準是：**這個漢字本身是不是資料**。〈台灣原住民族姓名〉的氏族／漢姓對照表就是——"
                "2026-09-10 一隻 agent 把 `豆、趙` 音譯成 `Dou, Zhao`、把 `樟 34、章 341` 寫成 "
                "`Zhang 34, Zhang 341`，兩欄長得一模一樣，讀者分不出哪個字是 34 哪個是 341，"
                "整張表的資訊歸零；同篇的 ar 版寫 `豆، 趙` 就是對的。"
                "還在報告裡寫「漢姓保留漢字」——實際全篇只剩 11 個漢字。"
            ),
            "passthrough": "sporeLinks / researchReport / image / imageCredit / imageLicense / imageSource / relatedDiary / date / readingTime / featured / lastVerified / lastHumanReview 原樣保留，不要靜默丟掉",
            "translatedFrom": "逐字照抄 frontmatter_placeholder 的值，byte-equal，繁體字不可換成任何異體字",
        },
        "body_rules": {
            "footnotes": "[^N] 引用與 [^N]: 定義的數量與編號完全一致，一條都不能少",
            "urls": "byte-identical。不要正規化 percent-encoding、不要改 apostrophe、不要補或去掉結尾標點。2026-09-09 一篇的圖說反引號沒收尾接上中文全形逗號，URL 多吃一個字元被 multiset 檢查擋下",
            "image_paths": "![alt](/article-images/...) 路徑不翻",
            "internal_links": "站內連結的路徑不翻（/food/夜市文化 保持原樣），只翻錨字——翻掉路徑會產生死鏈",
            "人名羅馬化_查表不要推導": (
                "**動筆前先跑 `python3 scripts/tools/lang-sync/name-consistency-check.py "
                "--names-for <zh_path> <lang>`**，它會印出這篇提到的人在其他語言已經用的拼寫。"
                "照抄，不要自己從漢字推導。"
                "\n理由不是規則難記，是**你分不出手上那個字串屬於哪一套**——2026-09-10 全庫盤點："
                "235 位人物裡 117 位有跨語言拼寫歧異，而每一隻交件的 agent 都在報告裡寫「已套用威妥瑪」。"
                "\n七種實撞錯法："
                "\n  1 認錯人：fr〈施振榮〉119 處寫 `Shih Ming-te`（施明德）；"
                "id〈簡立峰〉寫 `Jamie Lin`（林之晨）；en〈曹興誠〉標題寫 `Morris Chang vs. Chang Hsin-cheng`"
                "（Morris Chang 是張忠謀）"
                "\n  2 拼錯字：en〈林懷民〉`Lin Hsui-min`（Hwai-min）；en〈莫那·魯道〉`Mona Lodo`、"
                "pt 版 `Mona Ruata`（Rudao）"
                "\n  3 姓氏整個換掉：en〈蔣為文〉`Chang Wei-wen`、es 版 `Tsai Wei-wen`（都該是 Chiang）；"
                "pt〈洪婕倪〉`Hong Li`（Ni）"
                "\n  4 別人用威妥瑪你用北京拼音：fr〈白先勇〉`Bai Xianyong`（Pai Hsien-yung）；"
                "es〈朱天文〉`Chu Tianwen`（Chu Tien-wen）"
                "\n  5 丟掉本人通用的英文名：pt〈林強〉`Lin Qiang`（Lim Giong）、"
                "fr〈楊德昌〉`Yang Dechang`（Edward Yang）、id〈郭台銘〉`Kuo T'ai-ming`（Terry Gou）、"
                "vi〈孫燕姿〉`Sun Yanzi`（Stefanie Sun）"
                "\n  6 韓國人名當中文拼：id〈安芝儇〉`An Ji-hyun`（Ahn Ji-hyun）、"
                "vi〈南珉貞〉`Nam Minh Trinh`（Nam Min-jeong，被越南化了）"
                "\n  7 西方人名被中文譯名再音譯回去：vi〈李仙得〉`Li Xian De`——他是 Charles Le Gendre，"
                "法裔美國外交官。同族：林琪兒的 zh 原文寫「林琪兒（Kjell N. Lindgren）」，"
                "en/es/pt 反而寫成 `Lin Chi-er`／`Lin Qier`／`Lin Kuei-er`"
                "\n第 7 族的判準：**看 zh 原文括號裡有沒有給拉丁拼寫**。有就用那個，那是本人的名字。"
            ),
            "wikilinks": "派工單的 wikilink_targets 有這個 X 的網址時，一律寫成一般連結 `[目標語言譯名](網址)`，網址照抄 wikilink_targets 的值；不要留 `[[X]]` 或 `[[X|譯名]]`——站上渲染器對 wikilink 只印粗體不出連結，留著的話讀者看到的是粗體中文、點不下去（2026-09-25〈金鐘獎〉十一語，六語照做、五語留著 [[歌仔戲]]，法文頁中間冒出粗體中文）。wikilink_targets 沒有這個 X（目標在目標語言不存在）時扁平化成純文字，格式是『目標語言譯名 (中文原名)』——譯名在前。2026-09-09 一隻 agent 寫成中文在前，讀者讀到一整行中文",
            "viz_modules": "```tw-* 圍欄區塊裡的標籤、說明、資料來源全部要翻——它們是給讀者看的圖表內容不是程式碼。2026-09-09 一篇的八個模組整塊留中文，agent 判成『資料表格是已知誤判』並不是",
            "bibliography_titles": "參考資料區的中文來源標題保留原文，讀者要靠它找到原文出處。檢查器已對書目區豁免",
            "image_sources_section": f"圖片來源段落要全部翻成目標語言，標題用 `{IMAGE_SOURCE_H2.get(lang, '## Image Sources')}`。2026-09-09 一隻 agent 把中文原句『，原始圖片網址為』『，授權為』留著、後面再接譯文，變成中外混雜的重複——而 cjk-leak-check 因為書目區豁免放行了它。中文原文只保留在來源標題，句子一律翻",
        },
        "write_mechanism": [
            "1. Write 建檔：frontmatter + 開頭到第一個 ## 之前",
            "2. 之後每個 ## 章節一次 `cat >> <目標路徑> <<'EOFMARK'` ... `EOFMARK` —— 不讀檔只往檔尾接，每次呼叫的大小只跟那一節有關",
            "3. 不要用 Edit（它要求先 Read 整份檔，每節都把已寫的全讀回來，長文必卡死）",
            "4. 腳註定義區最後接，一次最多 15 條（72 條就是 5 次）",
            "5. heredoc 結束標記一律單引號，否則譯文網址裡的 $ 與反引號會被 shell 解讀",
            "6. 原稿 > 45KB 時連讀也要分節（Read 的 offset/limit）",
        ],
        "gates_before_delivery": [
            "python3 scripts/tools/lang-sync/target-language-check.py <目標路徑>   # 必須 exit 0；印出『看起來是 en』就是翻錯語言，整篇重來；印出『…漂入[ko]』（韓文／西里爾字母／天城文／阿拉伯文）就是有段落換了語言（常見在媒體說明／參考資料區／腳註描述），印出的行號那幾節重譯",
            "python3 scripts/tools/lang-sync/enrich-batch-targets.py --check <本派工單> <目標路徑>",
            "python3 scripts/tools/lang-sync/restore-footnote-urls.py knowledge/<zh_path> <目標路徑> --apply",
            # 站內連結在地化。產線（translate.py / structured-translate.py / patch-translate.py）
            # 送模型前就會呼叫 cross_link_localizer，委派層完全不經過那條路徑，所以這一步
            # 必須自己跑——2026-09-09 實測：委派層產出的延伸閱讀區全是 `/music/滅火器樂團`
            # 這種指向中文 slug 的連結，把印尼文讀者送到中文頁面，而七道閘沒有一道會叫。
            # 它是保守的純查表：該語言沒有那篇譯文就完全不動，不會製造新的 404。
            "python3 -c \"import sys; sys.path.insert(0,'scripts/tools/lang-sync'); "
            "from cross_link_localizer import load_index, localize_body; "
            "from pathlib import Path; p=Path('<目標路徑>'); "
            "t,n=localize_body(p.read_text(encoding='utf-8'),'<lang>',load_index()); "
            "p.write_text(t,encoding='utf-8'); print(f'站內連結在地化 {n} 個')\"",
            "python3 scripts/tools/lang-sync/verify-translation.py knowledge/<zh_path> <目標路徑>   # exit 1 = 硬失敗，要修到過",
            "python3 scripts/tools/lang-sync/cjk-leak-check.py <目標路徑>",
            "python3 scripts/tools/lang-sync/cjk-adjacency-check.py <目標路徑>",
            "python3 scripts/tools/article-health.py <目標路徑> --profile=pre-commit   # hard=0",
            # 站內連結會不會 404。前八道沒有一道在看連結指向哪裡：verify-translation 比的是
            # URL multiset（把一條換成另一條，數量不變就過），localizer 看到沒見過的拉丁 slug
            # 就保守跳過。2026-09-09 一隻 agent 把能用的 `/culture/台灣宗教與寺廟文化`
            # 換成自己編的 `/culture/taiwan-religion-temples-culture`，站上沒那個頁面，
            # 八道閘全過。全庫同型 1,715 條。**slug 是網址不是文案，不要翻它也不要編它。**
            "python3 scripts/tools/lang-sync/internal-link-check.py <目標路徑>   # 死連結 = 0",
            # 第 9 道報的死連結若**中文原文自己就有**（zh 連向一篇沒寫出來的文章，
            # 全庫 64 條）：把它扁平化成純文字（留下錨字，去掉連結），不要照抄過去。
            # 契約原本只說「保留來源路徑」，那條的用意是防止譯者自創 slug，沒設想
            # 來源本身是死的。保留 = 讀者撞 404；扁平化 = 讀者失去一條本來就用不了的
            # 連結。2026-09-09 同一篇冰品文章的 ar 與 ru 版對這件事給了相反處理，
            # 因為契約沒說——現在說了。用 --vs-source 分辨是不是繼承來的。
            "python3 scripts/tools/lang-sync/internal-link-check.py --vs-source <目標路徑>   # 譯者新造的死連結 = 0",
            # 數量級。中文的「萬」是 10⁴、「億」是 10⁸，跟各語言的
            # thousand/million/billion／लाख/करोड़/अरब／nghìn/triệu/tỷ **不是一對一**。
            # 換算正確的話數字串一定會變（23.3萬→2.33 लाख、630億→63 tỷ）；數字串沒變
            # 就是沒換算。2026-09-09 全庫掃出 941 處 / 530 檔，前九道閘全綠——
            # 它們量結構、語言、連結，沒有一道在算術。
            "python3 scripts/tools/lang-sync/numeral-magnitude-check.py knowledge/<zh_path> <目標路徑>   # 量級可疑 = 0",
            # 整行沒翻。前十一道閘裡最接近的是 cjk-adjacency，但它的判準是
            # 「漢字直接黏在拉丁字母上」——整行純中文沒有拉丁字母可黏，看不到。
            # 2026-09-10 實例：fr 的唐鳳篇有九句 `✦` 逐字引用整段照抄中文，
            # 十一道閘全綠；en/es 的同樣九句早就翻好了。
            # **引文區是最常漏的地方**：`> ✦ 「…」` 這種區塊看起來像「原文引用」，
            # 但它跟正文一樣要翻——保留原文的只有參考區的來源標題。
            "python3 scripts/tools/lang-sync/untranslated-line-check.py <目標路徑>   # 整行未翻 = 0",
            # 台灣的錢不是中國的錢。「新台幣 2 兆元」寫成 `2 triliun yuan`、「每噸數十元」
            # 寫成 `puluhan yuan`，在印尼文／西班牙文／俄文裡讀者讀到的就是人民幣。
            # 用該語系的多數形（NT$ / dolar Taiwan / новых тайваньских долларов…）。
            # ⚠️ 修的時候不要做裸字串取代——`يوان` 是 `تايوان`（台灣）的子字串，
            # 2026-09-09 有人因此把「莊智淵代表台灣」改成了「莊智-美元」。用數字錨定。
            #
            # 2026-09-10 補第二族：**台幣也不能寫成你這個語言自己國家的錢**。
            #   紙風車 id 篇「35 萬至 45 萬元」→ `350–450 ribu rupiah`（印尼盾）
            #   「2.1 億捐款」→ `210 juta rupiah`、「上億元負債」→ `ratusan juta rupiah`
            #   三商 id 篇更寫出 `rupiah Taiwan baru`——那不是「新台幣」，是不存在的東西。
            # 這族比人民幣那族隱形：句子讀起來很順，讀者只會以為台灣用印尼盾。
            # 越南文的 `đồng` 是例外——它是貨幣單位通稱，`đồng Đài Loan` 是正確講法；
            # 但裸的 `1.600 đồng` 一樣是錯的（讀成越南盾）。
            "python3 scripts/tools/lang-sync/currency-identity-check.py <目標路徑>   # 裸幣別 = 0",
            # 第 14 道（2026-09-10）：把某個人寫成另一個人。fr〈施振榮〉全篇 119 處把他叫成
            # `Shih Ming-te`／`Shih Mingte`——那是施明德，黨外運動者，跟宏碁創辦人毫無關係。
            # 前十三道全綠，因為每一道問的都是「這個字串合法嗎」，沒有一道問「這個名字是這個人嗎」。
            "python3 scripts/tools/lang-sync/name-consistency-check.py <目標路徑>   # 張冠李戴 = 0",
            # 第 15 道（2026-09-24）：commit 時 lint-staged 會先跑 prettier，再跑上面那些檢查。
            # 印尼文〈比國家還大的演算藝術〉交件時十四道全綠，第 73–75 條腳註之間少了空行，
            # prettier 把 74、75 折進 73 變成縮排續行，腳註數當場少兩條，commit 被擋。
            # 前十四道量的都是交件那一刻的檔案，不是會被寫進 git 的那一份。
            "npx prettier --check <目標路徑>   # 必須 stable；不穩就用 --write 看它改了什麼，把原因修掉再重跑全部閘門（不要只接受 prettier 的改寫）",
            # ⚠️ article-health 的 `description 太長` 是 **warn 不是 hard**，不要動它。
            # 2026-09-10 一天之內四隻 agent 看到那行就把 description 砍短，實際發生的是：
            #   zh：「2026 年，徐臺屏把約八十位教師設計的三百支 AI 代理人放進共享大市集…
            #        從大佳國小的三小時研習、內湖高中的「漚客」測試，到教育部人才方舟計畫…」
            #   被砍成：「兩份調查顯示矛盾：92% 教師用 AI，但 95.6% 需要學習…不是關於產品，
            #            而是持續支持與同儕社群。」
            #   → 人名沒了、三個具體案例沒了，而且**加了原文沒有的結論**。
            # 超過 400 字的忠實翻譯是可接受狀態（en 語系 891 篇裡 45% 超標，已記錄在案）。
            # 真要縮，是替該語言**重寫一段落在閾值內且保住所有具體事實**的 description，
            # 不是刪掉人名與案例再補一句自己的總結。
        ],
        "known_false_positives": {
            "list": [
                "參考資料區的中文來源標題",
                "括號內的原文漢字對照——括號裡只有原文（STR Network (薩泰爾娛樂) 這種）。"
                "原文後面接說明、寫成 `(自由憲章, 說明文字)` 不在豁免範圍：cjk-leak 判漏譯，而且它在主 session 的"
                "驗收是硬失敗，整篇會被退回。要拆成 `(自由憲章) (說明文字)`，或把說明移到括號外"
                "（2026-09-26 一篇 hi 譯文三處這樣交件，當成誤判回報，驗收直接不過）",
                "引號裡的專有名詞原名（Podcast 名、Facebook 社團名、專輯名）",
                "站內相對連結目標",
                "wikilink 目標字（照 body_rules.wikilinks 改寫成連結之後就不會再出現；還被報代表漏改了，先改再驗）",
                "小寫品牌名如 g0v、DailyView",
            ],
            "disposition": "看到這幾類就回報給主 session，不要動內容",
            "not_covered_by_this_list": "整塊沒翻的內容不在誤判清單裡——tw-* 模組標籤、frontmatter tags、圖片來源段落的句子，那些是真漏譯，要翻",
            "why": "2026-08-09 一隻 agent 為了讓漢字黏著檢查變綠，把 6 條中文來源標題翻成越南文，讀者從此查不到原文。閘門製造出『改內容換綠燈』誘因時，它造成的損害大於它防的問題。",
        },
        "hard_rules": [
            "前景串行執行，禁止 run_in_background 後結束回合等通知——你的環境裡背景指令完成不會通知你自己",
            "不要 git commit / git add / git push，主 session 負責落地",
            "只在 worktree 裡讀寫：暫存檔放派工單同一個資料夾（`.lang-sync-tasks/<批次>/`，已 gitignore），"
            "不要寫到 worktree 外、不要 `rm` worktree 外的任何路徑。越界的指令會跳出人工核准視窗，沒人按之前"
            "你停在原地，主 session 的每小時排程也跟著停。2026-09-26 一隻 agent 為了比對 prettier 前後，把備份"
            "寫到打錯的 `/tmp_before…`，清掉它的 `rm -f` 等了 6 小時 45 分才有人核准，那段時間渦流一輪都沒跑。"
            "prettier 前後差多少用 `git diff` 看，不用自己備份。",
            "不要改 zh 原文",
            "完整翻譯不是摘要：不合併段落、不壓縮清單、不省略任何 H2、不省略任何腳註定義",
            "**翻譯是你自己做，不是去呼叫翻譯後端**——不要跑 translate.py／ollama／OpenRouter／"
            "任何 API。你被派到這裡，正是因為那些後端對這批文章做不到（免費池在腳註階段逾時、"
            "本機模型超時）。2026-09-09 一隻 agent 花掉大半預算在嘗試那些工具、拿到 404 與 timeout，"
            "最後只翻出 frontmatter 加開頭四十行就交件說「任務規模不切實際」；同一天另一隻對著一篇"
            "更大的（91KB／55 腳註／30 個 H2）自己逐章翻完，七道閘全過。差別不在篇幅，在有沒有"
            "把「翻譯」當成自己的工作。",
            "長文的做法是逐章：讀一章、翻一章、`cat >>` 追加一章，不要先把整篇讀進來再想怎麼辦。"
            "腳註定義區最後接、一次最多 15 條。這樣每次呼叫的大小只跟那一節有關，跟全文多大無關。",
            "腳註定義之間空一行，跟 zh 原稿一樣。多條 `[^n]:` 連著寫、中間沒有空行時，prettier --write "
            "會把幾條併進同一條，腳註數靜默變少：2026-09-26 ru〈營養午餐〉47 條掉成 39 條，要等 "
            "enrich-batch-targets --check 才看得出來。",
        ],
    }
    # SQUEEZE §Z2.0 hard gate：目標語言 canonical guide 的關鍵 sections 必須內嵌，
    # 不能只給 path pointer。派工單是 agent 必讀的檔案，所以這裡算內嵌。
    #
    # 兩層：`sections` 是從 guide 直接抽出來的原文（十二語都有，canonical 改了下一批
    # 派工單就跟著改）；`emphasis` 是人讀過 guide 之後挑出來的重點，只有讀過的語言才
    # 有——它的價值在於指出「這一語特別容易在哪裡出錯」，那是通篇抽取蓋不掉的判斷。
    sections = guide_sections(lang)
    gloss: dict = {
        "_source": f"docs/editorial/per-language/TRANSLATION-{lang}.md（canonical，有疑義以該檔為準）",
        "_how_to_read": "sections 是 guide 原文；先讀 tldr 與 section_6（PRC 編碼詞禁用表），再查 section_1/2/3 的對照表",
        "sections": sections,
    }
    if not sections:
        gloss["_broken"] = (f"❌ 抽不到 TRANSLATION-{lang}.md 的 §TL;DR/§1/§2/§3/§5/§6 —— "
                            "尺壞了不是沒問題。派工前先修，或在 prompt 手動 inline 詞表")
    emphasis = sovereignty_glossary(lang)
    if emphasis:
        gloss["emphasis"] = emphasis
    brief["sovereignty_glossary"] = gloss
    return brief


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("batch_dir", help=".lang-sync-tasks/<batch> 目錄")
    ap.add_argument("--lang", help="目標語言；省略時從派工單的 en_path 推得")
    args = ap.parse_args()

    d = Path(args.batch_dir)
    if not d.is_dir():
        raise SystemExit(f"❌ 找不到 {d}")
    groups = sorted(d.glob("_group-*.json"))
    if not groups:
        raise SystemExit(f"❌ {d} 裡沒有派工單")

    lang = args.lang
    if not lang:
        first = json.loads(groups[0].read_text(encoding="utf-8"))
        lang = first["articles"][0]["en_path"].split("/")[1]

    brief = build(lang)
    fail_counts = load_fail_counts()
    tiers = {"haiku": 0, "sonnet": 0}
    for f in groups:
        j = json.loads(f.read_text(encoding="utf-8"))
        j["agent_brief"] = brief
        for a in j.get("articles", []):
            d = delegation_tier(a, fail_counts.get(f"{lang}:{a.get('zh_path', '')}", 0))
            a["delegation_tier"] = d
            tiers[d["tier"]] += 1
        f.write_text(json.dumps(j, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    print(f"✅ agent_brief（{lang}）寫進 {len(groups)} 份派工單")
    print(f"   分派建議：haiku {tiers['haiku']} 篇 ／ sonnet {tiers['sonnet']} 篇"
          f"（SQUEEZE §第五層：腳註 >{HEAVY_FOOTNOTES}、網址 >{HEAVY_URLS} "
          f"或產線累計失敗 ≥{HEAVY_FAILS} 次走 sonnet）")
    if not fail_counts:
        print(f"   ⚠️ 讀不到 {FAIL_MEMO.relative_to(REPO)}——這次只按引用密度分派，失敗次數那半條沒生效")
    if tiers["sonnet"]:
        print("   ⚠️ 派工前先看每篇的 delegation_tier；把 sonnet 那批派給 haiku 的實測後果是"
              "腳註整區照抄原文、URL 缺漏、翻譯比掉到 1.05")


if __name__ == "__main__":
    main()
