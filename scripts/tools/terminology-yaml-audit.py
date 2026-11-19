#!/usr/bin/env python3
"""
terminology-yaml-audit.py
Taiwan.md 用語詞庫交叉驗證工具 (Issue #288 Step 3)
（2026-05-04 audit O5 從 terminology-audit.py 改名 — 強調 scope 是 YAML 詞庫資料）

處理範圍：只處理 sources 僅有 ThunderKO / 大陸用語檢索手冊 的條目

第 1 層：確定刪除（自動執行）
  L1a. tw == cn（沒有差異）
  L1b. china 或 taiwan 欄位為空/缺失
  L1c. 配對明顯錯誤（長度差 >3x，或語義完全不相關的垃圾配對）
  L1d. 重複條目（同一個 china 值出現在多個 YAML 中，保留第一個，刪其他）

第 2 層：高可信度保留（自動標記，不動）
  L2.  經典公認兩岸差異詞對

第 3 層：可疑需人工審查（輸出到 /tmp/terminology-yaml-audit-review.md）
  L3a. category 與詞語語義明顯不符
  L3b. taiwan 值看起來台灣不常用
  L3c. 差異太微小（只差一個字，或僅簡繁差異）

使用方式：
  python3 scripts/tools/terminology-yaml-audit.py            # 只報告，不刪檔（預設）
  python3 scripts/tools/terminology-yaml-audit.py --apply     # 真的刪掉第 1 層機械 cruft
  --apply   : 執行刪除。沒給這個旗標一律只報告
  --dry-run : 留給舊的呼叫方式，現在已經是預設，給了等於沒給
"""

import os
import sys
import re
import yaml
import unicodedata
from pathlib import Path
from collections import defaultdict

# ──────────────────────────────────────────────
# 設定
# ──────────────────────────────────────────────
# BASE_DIR derives from script location (was hardcoded `/Users/cheyuwu/taiwan-md`,
# 2026-05-04 audit O5 fixed the latent bug for non-cheyuwu / worktree contexts).
BASE_DIR = Path(__file__).resolve().parents[2]
TERMINOLOGY_DIR = BASE_DIR / "data" / "terminology"
REVIEW_OUTPUT = Path("/tmp/terminology-yaml-audit-review.md")
# 預設不刪檔（2026-11-19 twmd-maintainer-daily）：本檔原本預設就刪，名字又叫 audit，
# 於是先後有三個 session 把它當唯讀工具跑下去、刪掉既有詞條——2026-08-30
# spore-harvest-am 刪 10 筆、2026-11-18 α 一批、2026-11-19 maintainer 刪 19 筆，
# 三次都當場用 git checkout 復原、三次都寫進 memory，而這一行一直沒有人改。
# memory 是自律，預設值才是閘門（REFLEXES #15「反覆浮現要儀器化」、
# #96「知識留在註解層沒有下沉到控制流」）。改成跟 terminology-apply.py、
# inbox-audit.py、merge-divergence.py、curation-tag.py 同一個約定：要寫就加 --apply。
APPLY = "--apply" in sys.argv
DRY_RUN = not APPLY

THUNDERKO_MARKERS = ["ThunderKO", "大陸用語檢索手冊"]

# ──────────────────────────────────────────────
# 第 2 層：公認差異詞對白名單（taiwan → china）
# 任一方向包含即視為公認差異
# ──────────────────────────────────────────────
KNOWN_GOOD_PAIRS = [
    # 科技
    ("軟體", "軟件"),
    ("硬體", "硬件"),
    ("影片", "視頻"),
    ("網路", "網絡"),
    ("資訊", "信息"),
    ("信息", "資訊"),
    ("伺服器", "服務器"),
    ("演算法", "算法"),
    ("程式", "程序"),
    ("資料庫", "數據庫"),
    ("檔案", "文件"),
    ("位元", "比特"),
    ("位元組", "字節"),
    ("記憶體", "內存"),
    ("硬碟", "硬盤"),
    ("磁碟", "磁盤"),
    ("光碟", "光盤"),
    ("鍵盤", "键盘"),
    ("滑鼠", "鼠標"),
    ("游標", "光標"),
    ("視窗", "窗口"),
    ("應用程式", "應用程序"),
    ("作業系統", "操作系統"),
    ("列印", "打印"),
    ("下載", "下载"),
    ("上傳", "上传"),
    ("備份", "备份"),
    ("登入", "登錄"),
    ("登出", "退出"),
    ("密碼", "口令"),
    ("網址", "網址"),
    ("寬頻", "寬帶"),
    ("無線網路", "無線網絡"),
    ("藍牙", "蓝牙"),
    ("觸控", "觸摸"),
    ("螢幕", "屏幕"),
    ("顯示器", "顯示器"),
    ("解析度", "分辨率"),
    ("像素", "像素"),
    ("頻寬", "帶寬"),
    ("路由器", "路由器"),
    ("防火牆", "防火墻"),
    ("加密", "加密"),
    ("資安", "信息安全"),
    ("程式設計", "編程"),
    ("程式碼", "代碼"),
    ("原始碼", "源代碼"),
    ("資料", "數據"),
    ("函式", "函數"),
    ("變數", "變量"),
    ("常數", "常量"),
    ("陣列", "數組"),
    ("物件", "對象"),
    ("類別", "類"),
    ("繼承", "繼承"),
    ("介面", "接口"),
    ("套件", "包"),
    ("模組", "模塊"),
    ("框架", "框架"),
    ("伺服端", "服務端"),
    ("前端", "前端"),
    ("後端", "後端"),
    ("部署", "部署"),
    ("版本控制", "版本控制"),
    # 日常生活
    ("捷運", "地鐵"),
    ("計程車", "出租車"),
    ("便當", "盒飯"),
    ("優酪乳", "酸奶"),
    ("機車", "摩托車"),
    ("加油站", "加油站"),
    ("停車場", "停車場"),
    ("夜市", "夜市"),
    ("小吃", "小吃"),
    ("滷肉飯", "滷肉飯"),
    ("珍珠奶茶", "珍珠奶茶"),
    ("健保", "醫保"),
    ("勞保", "社保"),
    ("身分證", "身份證"),
    ("護照", "護照"),
    ("郵遞區號", "郵政編碼"),
    ("里", "村"),
    ("鄉鎮市區", "鄉鎮"),
    ("縣市", "省市"),
    # 媒體/娛樂
    ("電影院", "影院"),
    ("電視台", "電視臺"),
    ("頻道", "頻道"),
    ("節目", "節目"),
    ("主持人", "主持人"),
    ("歌手", "歌手"),
    ("演員", "演員"),
    ("導演", "導演"),
    # 飲食
    ("鳳梨", "菠蘿"),
    ("木瓜", "木瓜"),
    ("釋迦", "番荔枝"),
    ("蓮霧", "蓮霧"),
    ("芭樂", "番石榴"),
    ("地瓜", "紅薯"),
    ("玉米", "玉米"),
    ("花椰菜", "花椰菜"),
    ("青椒", "青椒"),
    ("番茄", "西紅柿"),
    ("馬鈴薯", "土豆"),
    ("茄子", "茄子"),
    ("花生", "花生"),
    ("腰果", "腰果"),
]

# 轉成 set，做 substring 匹配
KNOWN_GOOD_SET = set()
for tw, cn in KNOWN_GOOD_PAIRS:
    KNOWN_GOOD_SET.add((tw.strip(), cn.strip()))
    KNOWN_GOOD_SET.add((cn.strip(), tw.strip()))


def is_known_good(tw: str, cn: str) -> bool:
    """檢查是否為公認差異（包括 substring 匹配）"""
    tw = tw.strip()
    cn = cn.strip()
    # 完全匹配
    if (tw, cn) in KNOWN_GOOD_SET:
        return True
    # Substring 匹配（如「伺服器端」包含「伺服器」）
    for good_tw, good_cn in KNOWN_GOOD_PAIRS:
        if good_tw in tw and good_cn in cn:
            return True
        if good_cn in tw and good_tw in cn:
            return True
    return False


# ──────────────────────────────────────────────
# 輔助函式
# ──────────────────────────────────────────────

def is_thunderko_only(data: dict) -> bool:
    """是否只有 ThunderKO / 大陸用語檢索手冊 來源"""
    sources = data.get("sources", [])
    if not sources:
        return False
    for s in sources:
        s_str = str(s)
        is_thunderko = any(marker in s_str for marker in THUNDERKO_MARKERS)
        if not is_thunderko:
            return False
    return True


def get_display(data: dict) -> tuple[str, str]:
    """取得 taiwan 和 china 顯示值（NFKC 正規化，統一 CJK 相容字形）"""
    display = data.get("display", {})
    tw = unicodedata.normalize("NFKC", str(display.get("taiwan", "") or "")).strip()
    cn = unicodedata.normalize("NFKC", str(display.get("china", "") or "")).strip()
    return tw, cn


def normalize(s: str) -> str:
    """標準化字串：去空白、去標點"""
    return re.sub(r'[\s　，。、；：！？「」『』【】〔〕《》〈〉""''…—～·]+', '', s).strip()


# 已知垃圾 china 值（明顯是資料錯誤）
GARBAGE_CHINA_VALUES = {
    "大陸用語",   # 這是欄位說明，不是實際的中國用語
    "台灣用語",
    "（待確認）",
    "（未知）",
    "（無）",
    "N/A",
    "TBD",
}

# 已知垃圾 taiwan 值
GARBAGE_TAIWAN_VALUES = {
    "台灣用語",
    "（待確認）",
    "（未知）",
    "N/A",
    "TBD",
}


def is_obviously_mismatched(tw: str, cn: str) -> tuple[bool, str]:
    """
    判斷是否明顯配對錯誤（保守策略：只刪長度差極大的案例）
    回傳 (is_mismatch, reason)
    
    注意：「完全無共同字符」不代表錯誤！許多合法的兩岸差異確實沒有共同字：
      CP值/性價比、三溫暖/桑拿浴、工作列/任務欄、通訊端/套接字 等
    所以「無共同字」的案例移到 L3 審查，不自動刪除。
    只有長度差 >3x（且短邊 >2 字）才視為確定錯誤。
    """
    tw_norm = normalize(tw)
    cn_norm = normalize(cn)
    
    if not tw_norm or not cn_norm:
        return False, ""
    
    len_tw = len(tw_norm)
    len_cn = len(cn_norm)
    
    # 長度差 >3x（短的那方非常短時放寬，避免誤殺如「檔案/文件」）
    if len_tw > 0 and len_cn > 0:
        ratio = max(len_tw, len_cn) / min(len_tw, len_cn)
        # 只有當兩邊都不是超短詞（>2字）時才用 3x 規則
        if ratio > 3.0 and min(len_tw, len_cn) > 2:
            return True, f"長度差過大（{len_tw}:{len_cn}，比例 {ratio:.1f}x）"
    
    return False, ""


def is_no_common_chars(tw: str, cn: str) -> tuple[bool, str]:
    """
    檢查台陸詞對是否完全無共同字符（移到 L3 審查，不自動刪）
    排除長詞對短詞的情況（長度差異太大的已在 L1c 處理）
    """
    tw_norm = normalize(tw)
    cn_norm = normalize(cn)
    
    if not tw_norm or not cn_norm:
        return False, ""
    
    len_tw = len(tw_norm)
    len_cn = len(cn_norm)
    
    # 只檢查兩邊都有 3+ 字的情況
    if len_tw >= 3 and len_cn >= 3:
        common_chars = set(tw_norm) & set(cn_norm)
        if len(common_chars) == 0:
            ratio = max(len_tw, len_cn) / min(len_tw, len_cn)
            # 長度相近（ratio < 2.5）且無共同字，可疑
            if ratio < 2.5:
                return True, f"完全無共同字符（台：{tw}，陸：{cn}），建議確認是否為合法差異"
    
    return False, ""


def is_only_trad_simp_diff(tw: str, cn: str) -> tuple[bool, str]:
    """
    判斷是否只是簡繁差異（字不同但字數相同，只有繁/簡對應）
    用保守策略：只標記完全相同（normalize 後）的情況
    實際的簡繁判斷需要 opencc，這裡只做基本檢查
    """
    tw_norm = normalize(tw)
    cn_norm = normalize(cn)
    
    if tw_norm == cn_norm:
        return True, "normalize 後完全相同"
    
    # 差一個字（字數相同，只有一個字不同）
    if len(tw_norm) == len(cn_norm) and len(tw_norm) >= 2:
        diffs = sum(1 for a, b in zip(tw_norm, cn_norm) if a != b)
        if diffs == 1:
            return True, f"只差一個字（{tw} / {cn}）"
    
    return False, ""


# 一些看起來「台灣不常用」的詞對模式
SUSPICIOUS_TAIWAN_PATTERNS = [
    # 政治/行政用語台灣沒有
    (r'省親', '台灣不說「省親」，說「返鄉探親」'),
    (r'工農兵', '中國特有政治詞彙'),
    (r'同志', '台灣「同志」主要指 LGBT，非此語境'),
    (r'革命委員會', '中國政治詞彙'),
    (r'人民公社', '中國政治詞彙'),
    (r'計劃生育', '中國政策，台灣無此制度'),
    (r'戶口', '中國特有制度用語'),
    (r'單位', '中國「工作單位」用法，台灣不常用此意'),
    # 可疑的台灣用法
    (r'^台$', '單字「台」可能是省略，需確認'),
]

# category 與常見詞彙類型明顯不符的規則
CATEGORY_MISMATCH_RULES = [
    # CS 術語不該在 daily
    {
        "category": "daily",
        "patterns": [
            r'[Aa]lgorithm', r'[Ss]erver', r'[Dd]atabase', r'[Aa][Pp][Ii]',
            r'(程式|程序|演算|資料庫|資料結構|物件導向|函式|變數|陣列|介面)',
            r'(HTTP|TCP|IP|DNS|SQL|CPU|GPU|RAM|SSD)',
        ],
        "reason": "CS/技術術語分在 daily 類別"
    },
    # 明顯日常用語不該在 tech
    {
        "category": "tech",
        "patterns": [
            r'^(飯|菜|魚|肉|豬|牛|雞|鴨|湯|粥|麵|飯|餐|廚)',
            r'^(衣|褲|裙|鞋|帽|袋|包)',
            r'^(婚|嫁|娶|離|喪|葬)',
        ],
        "reason": "日常生活詞彙分在 tech 類別"
    },
]


def check_category_mismatch(data: dict, tw: str, cn: str) -> tuple[bool, str]:
    """檢查 category 是否明顯錯誤"""
    category = data.get("category", "")
    for rule in CATEGORY_MISMATCH_RULES:
        if category == rule["category"]:
            for pat in rule["patterns"]:
                if re.search(pat, tw) or re.search(pat, cn):
                    return True, rule["reason"]
    return False, ""


def check_suspicious_taiwan(tw: str, cn: str) -> tuple[bool, str]:
    """檢查 taiwan 值是否看起來不是台灣用法"""
    for pat, reason in SUSPICIOUS_TAIWAN_PATTERNS:
        if re.search(pat, tw):
            return True, reason
    return False, ""


# ──────────────────────────────────────────────
# 主流程
# ──────────────────────────────────────────────

def main():
    yaml_files = sorted([f for f in TERMINOLOGY_DIR.iterdir() if f.suffix == ".yaml"])
    
    stats = {
        "total": len(yaml_files),
        "thunderko_only": 0,
        "skipped_other_source": 0,
        # L1 刪除
        "deleted_l1a_same": 0,
        "deleted_l1b_empty": 0,
        "deleted_l1c_mismatch": 0,
        "deleted_l1d_duplicate": 0,
        "deleted_total": 0,
        # L2 保留
        "kept_l2_known_good": 0,
        # L3 審查
        "review_l3a_category": 0,
        "review_l3b_suspicious_tw": 0,
        "review_l3c_minor_diff": 0,
        "review_total": 0,
        # 剩餘保留
        "kept_clean": 0,
    }
    
    deleted_files = []
    review_items = []
    
    # 第一遍：收集所有 ThunderKO-only 條目，建立重複偵測 map
    thunderko_entries = {}  # filename -> (data, tw, cn)
    for yaml_file in yaml_files:
        try:
            with open(yaml_file) as f:
                data = yaml.safe_load(f)
        except Exception as e:
            print(f"⚠️  無法解析 {yaml_file.name}: {e}")
            continue
        
        if not is_thunderko_only(data):
            stats["skipped_other_source"] += 1
            continue
        
        stats["thunderko_only"] += 1
        tw, cn = get_display(data)
        thunderko_entries[yaml_file] = (data, tw, cn)
    
    # 建立 china 值重複 map
    china_to_files = defaultdict(list)
    for yaml_file, (data, tw, cn) in thunderko_entries.items():
        if cn:
            china_to_files[cn].append(yaml_file)
    
    # 決定重複條目中要刪除哪些
    # 保守策略：只有當 taiwan 值也幾乎相同（normalize 後相同）才自動刪
    # 否則只是「多個台灣詞對應同一個中文詞」，這是合法情況
    duplicate_delete_set = set()
    duplicate_review_set = set()  # 送審（cn 相同但 tw 不同）
    for cn_val, files in china_to_files.items():
        if len(files) > 1:
            files_sorted = sorted(files)
            # 取得每個的 tw
            tw_norms = []
            for f in files_sorted:
                _, tw_f, _ = thunderko_entries[f]
                tw_norms.append(normalize(tw_f))
            # 如果所有 tw 都相同（normalize 後），才刪多餘的
            if len(set(tw_norms)) == 1:
                # 真正的重複：tw 和 cn 都相同
                for f in files_sorted[1:]:
                    duplicate_delete_set.add(f)
            else:
                # tw 不同但 cn 相同 → 可能是多個台灣詞對應同一個中文詞，送審
                for f in files_sorted[1:]:
                    duplicate_review_set.add((f, cn_val, tuple(tw_norms)))
    
    # 第二遍：逐一判斷
    print("=" * 60)
    print("Taiwan.md 用語詞庫交叉驗證報告")
    print("=" * 60)
    print(f"\n📁 總 YAML 數：{stats['total']}")
    print(f"🔍 ThunderKO-only 條目：{stats['thunderko_only']}")
    print(f"✅ 有其他來源（跳過）：{stats['skipped_other_source']}")
    print()
    
    for yaml_file, (data, tw, cn) in sorted(thunderko_entries.items()):
        file_id = data.get("id", yaml_file.stem)
        category = data.get("category", "")
        
        # ── L1d：完全重複（tw 和 cn 都相同的多餘副本） ──
        if yaml_file in duplicate_delete_set:
            reason = f"完全重複條目：taiwan='{tw}', china='{cn}'"
            print(f"🗑️  [L1d-重複] {yaml_file.name}: {reason}")
            deleted_files.append((yaml_file, "L1d", reason, tw, cn))
            stats["deleted_l1d_duplicate"] += 1
            stats["deleted_total"] += 1
            continue

        # ── L1b：空值或垃圾值（最優先，避免垃圾條目污染後續邏輯） ──
        if not tw or not cn:
            reason = f"欄位空缺（taiwan='{tw}', china='{cn}'）"
            print(f"🗑️  [L1b-空值] {yaml_file.name}: {reason}")
            deleted_files.append((yaml_file, "L1b", reason, tw, cn))
            stats["deleted_l1b_empty"] += 1
            stats["deleted_total"] += 1
            continue
        if cn.strip() in GARBAGE_CHINA_VALUES:
            reason = f"china 欄位為垃圾值（'{cn}'，不是有效的中國用語）"
            print(f"🗑️  [L1b-垃圾] {yaml_file.name}: {reason}")
            deleted_files.append((yaml_file, "L1b", reason, tw, cn))
            stats["deleted_l1b_empty"] += 1
            stats["deleted_total"] += 1
            continue
        if tw.strip() in GARBAGE_TAIWAN_VALUES:
            reason = f"taiwan 欄位為垃圾值（'{tw}'，不是有效的台灣用語）"
            print(f"🗑️  [L1b-垃圾] {yaml_file.name}: {reason}")
            deleted_files.append((yaml_file, "L1b", reason, tw, cn))
            stats["deleted_l1b_empty"] += 1
            stats["deleted_total"] += 1
            continue
        
        # ── L1a：tw == cn ──
        if normalize(tw) == normalize(cn):
            reason = f"台陸用法相同（'{tw}' == '{cn}'）"
            print(f"🗑️  [L1a-相同] {yaml_file.name}: {reason}")
            deleted_files.append((yaml_file, "L1a", reason, tw, cn))
            stats["deleted_l1a_same"] += 1
            stats["deleted_total"] += 1
            continue
        
        # ── L1c：明顯配對錯誤 ──
        is_mismatch, mismatch_reason = is_obviously_mismatched(tw, cn)
        if is_mismatch:
            # 但先確認不是公認差異（保守原則）
            if not is_known_good(tw, cn):
                print(f"🗑️  [L1c-錯誤] {yaml_file.name}: {mismatch_reason}")
                deleted_files.append((yaml_file, "L1c", mismatch_reason, tw, cn))
                stats["deleted_l1c_mismatch"] += 1
                stats["deleted_total"] += 1
                continue
        
        # ── L2：公認差異 → 直接保留 ──
        if is_known_good(tw, cn):
            stats["kept_l2_known_good"] += 1
            continue
        
        # ── L3：可疑需審查 ──
        review_reasons = []
        
        # L3a：category 明顯錯誤
        is_cat_wrong, cat_reason = check_category_mismatch(data, tw, cn)
        if is_cat_wrong:
            review_reasons.append(("L3a-category", cat_reason))
            stats["review_l3a_category"] += 1
        
        # L3b：台灣用法可疑
        is_suspicious, sus_reason = check_suspicious_taiwan(tw, cn)
        if is_suspicious:
            review_reasons.append(("L3b-suspicious", sus_reason))
            stats["review_l3b_suspicious_tw"] += 1
        
        # L3c：差異太微小（只差一字或僅簡繁）
        is_minor, minor_reason = is_only_trad_simp_diff(tw, cn)
        if is_minor:
            review_reasons.append(("L3c-minor", minor_reason))
            stats["review_l3c_minor_diff"] += 1
        
        # L3d：完全無共同字符（可能是誤配，也可能是合法差異，需人工確認）
        is_no_common, no_common_reason = is_no_common_chars(tw, cn)
        if is_no_common and not is_minor:
            review_reasons.append(("L3d-no-common", no_common_reason))
            if "review_l3d_no_common" not in stats:
                stats["review_l3d_no_common"] = 0
            stats["review_l3d_no_common"] += 1

        # L3e：多個台灣詞對應同一個中文詞（可能是合法的多對一，也可能有錯誤）
        dup_match = next((x for x in duplicate_review_set if x[0] == yaml_file), None)
        if dup_match:
            _, cn_shared, all_tw = dup_match
            dup_reason = f"多個台灣詞同對 '{cn_shared}'（{', '.join(all_tw)}）"
            review_reasons.append(("L3e-dup-cn", dup_reason))
            if "review_l3e_dup_cn" not in stats:
                stats["review_l3e_dup_cn"] = 0
            stats["review_l3e_dup_cn"] += 1

        if review_reasons:
            review_items.append({
                "file": yaml_file,
                "id": file_id,
                "category": category,
                "taiwan": tw,
                "china": cn,
                "reasons": review_reasons,
                "data": data,
            })
            stats["review_total"] += 1
        else:
            stats["kept_clean"] += 1
    
    # ── 執行刪除 ──
    print()
    print("=" * 60)
    print("執行刪除")
    print("=" * 60)
    
    actually_deleted = 0
    if DRY_RUN:
        print(f"🛡️  預設不刪檔：第 1 層有 {len(deleted_files)} 個候選，這次一個都沒刪。")
        print("    確認過清單真的要刪，才加 --apply 再跑一次。")
    else:
        for yaml_file, layer, reason, tw, cn in deleted_files:
            try:
                yaml_file.unlink()
                actually_deleted += 1
            except Exception as e:
                print(f"❌ 刪除失敗 {yaml_file.name}: {e}")
        print(f"✅ 已刪除 {actually_deleted} 個檔案")
    
    # ── 輸出 L3 審查清單 ──
    write_review_file(review_items)
    
    # ── 統計摘要 ──
    print()
    print("=" * 60)
    print("📊 統計摘要")
    print("=" * 60)
    print(f"\n處理範圍（ThunderKO-only）：{stats['thunderko_only']} 個")
    print()
    print(f"🗑️  第 1 層刪除：{stats['deleted_total']} 個")
    print(f"   └─ L1a 台陸相同：       {stats['deleted_l1a_same']}")
    print(f"   └─ L1b 欄位空缺：       {stats['deleted_l1b_empty']}")
    print(f"   └─ L1c 明顯配對錯誤：   {stats['deleted_l1c_mismatch']}")
    print(f"   └─ L1d 重複條目：       {stats['deleted_l1d_duplicate']}")
    print()
    print(f"✅ 第 2 層自動保留（公認差異）：{stats['kept_l2_known_good']} 個")
    print(f"✅ 清潔保留（無問題）：         {stats['kept_clean']} 個")
    print()
    print(f"⚠️  第 3 層人工審查：{stats['review_total']} 個")
    print(f"   └─ L3a category 錯誤：      {stats['review_l3a_category']}")
    print(f"   └─ L3b 台灣用法可疑：       {stats['review_l3b_suspicious_tw']}")
    print(f"   └─ L3c 差異太微小：         {stats['review_l3c_minor_diff']}")
    print(f"   └─ L3d 無共同字符（可疑）： {stats.get('review_l3d_no_common', 0)}")
    print(f"   └─ L3e 多台灣詞同一中文：   {stats.get('review_l3e_dup_cn', 0)}")
    print()
    total_remaining = stats['thunderko_only'] - stats['deleted_total']
    print(f"剩餘條目：{total_remaining} 個（含待審 {stats['review_total']} 個）")
    print()
    print(f"📄 人工審查清單：{REVIEW_OUTPUT}")
    if DRY_RUN:
        print("🛡️  本次沒有刪除任何檔案（這是預設行為）。要刪請加 --apply")
    else:
        print("⚠️  --apply 已指定：上面那些檔案真的被刪掉了，跑 git status 確認一眼")
    print()


def write_review_file(review_items: list):
    """輸出第 3 層審查清單到 /tmp"""
    lines = [
        "# Taiwan.md 用語詞庫人工審查清單",
        "",
        "> 由 `terminology-yaml-audit.py` 自動生成（Issue #288 Step 3）",
        "> 這些條目都是 ThunderKO-only 來源，且有可疑之處，需要人工確認是否保留。",
        "",
        f"共 {len(review_items)} 個待審條目",
        "",
    ]
    
    # 分層輸出
    l3a = [r for r in review_items if any(x[0] == "L3a-category" for x in r["reasons"])]
    l3b = [r for r in review_items if any(x[0] == "L3b-suspicious" for x in r["reasons"])]
    l3c = [r for r in review_items if any(x[0] == "L3c-minor" for x in r["reasons"])]
    
    if l3a:
        lines += [
            f"## L3a：Category 明顯錯誤（{len(l3a)} 個）",
            "",
            "| 檔案 | 台灣 | 中國 | Category | 問題 |",
            "|------|------|------|----------|------|",
        ]
        for item in l3a:
            for layer, reason in item["reasons"]:
                if layer == "L3a-category":
                    lines.append(
                        f"| `{item['file'].name}` | {item['taiwan']} | {item['china']} | {item['category']} | {reason} |"
                    )
        lines.append("")
    
    if l3b:
        lines += [
            f"## L3b：台灣用法可疑（{len(l3b)} 個）",
            "",
            "| 檔案 | 台灣 | 中國 | Category | 問題 |",
            "|------|------|------|----------|------|",
        ]
        for item in l3b:
            for layer, reason in item["reasons"]:
                if layer == "L3b-suspicious":
                    lines.append(
                        f"| `{item['file'].name}` | {item['taiwan']} | {item['china']} | {item['category']} | {reason} |"
                    )
        lines.append("")
    
    if l3c:
        lines += [
            f"## L3c：差異太微小（{len(l3c)} 個）",
            "",
            "| 檔案 | 台灣 | 中國 | Category | 問題 |",
            "|------|------|------|----------|------|",
        ]
        for item in l3c:
            for layer, reason in item["reasons"]:
                if layer == "L3c-minor":
                    lines.append(
                        f"| `{item['file'].name}` | {item['taiwan']} | {item['china']} | {item['category']} | {reason} |"
                    )
        lines.append("")
    
    l3e = [r for r in review_items if any(x[0] == "L3e-dup-cn" for x in r["reasons"])]
    if l3e:
        lines += [
            f"## L3e：多個台灣詞對應同一個中文詞（{len(l3e)} 個）",
            "",
            "| 檔案 | 台灣 | 中國 | Category | 問題 |",
            "|------|------|------|----------|------|",
        ]
        for item in l3e:
            for layer, reason in item["reasons"]:
                if layer == "L3e-dup-cn":
                    lines.append(
                        f"| `{item['file'].name}` | {item['taiwan']} | {item['china']} | {item['category']} | {reason} |"
                    )
        lines.append("")

    l3d = [r for r in review_items if any(x[0] == "L3d-no-common" for x in r["reasons"])]
    if l3d:
        lines += [
            f"## L3d：完全無共同字符（{len(l3d)} 個，可能合法也可能誤配）",
            "",
            "| 檔案 | 台灣 | 中國 | Category | 問題 |",
            "|------|------|------|----------|------|",
        ]
        for item in l3d:
            for layer, reason in item["reasons"]:
                if layer == "L3d-no-common":
                    lines.append(
                        f"| `{item['file'].name}` | {item['taiwan']} | {item['china']} | {item['category']} | {reason} |"
                    )
        lines.append("")

    lines += [
        "---",
        "",
        "## 審查說明",
        "",
        "- **保留**：確認是真實的兩岸用語差異 → 可加上其他來源佐證",
        "- **刪除**：確認是錯誤/無效條目 → 直接刪除 YAML 檔案",
        "- **修正**：確認 category 錯誤 → 修改 YAML 中的 category 欄位",
        "",
    ]
    
    content = "\n".join(lines)
    REVIEW_OUTPUT.write_text(content, encoding="utf-8")
    print(f"\n📄 審查清單已寫入：{REVIEW_OUTPUT}（{len(review_items)} 個條目）")


if __name__ == "__main__":
    main()
