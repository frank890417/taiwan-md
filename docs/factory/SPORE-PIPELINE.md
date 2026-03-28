# SPORE-PIPELINE.md — 孢子產線完整流程

> **這份文件是 AI 可執行的。** 任何 AI agent 讀完這份文件，應該能獨立完成一篇孢子的選題、品檢、撰寫、發佈。

---

## 前置知識

開始前，AI 必須讀取以下文件（按順序）：

1. `cat docs/factory/README.md` — 理解孢子是什麼
2. `cat docs/factory/SPORE-TEMPLATES.md` — 四種模板 + 範例
3. `cat EDITORIAL.md | head -100` — 品質標準核心信念

---

## Step 1: 選文（PICK）

### 目標

從知識庫中選出 5-10 篇候選文章，呈現給人類選擇。

### 執行方式

```bash
# 從 dashboard-articles.json 隨機選 10 篇（2000+ 字、非 about 分類）
cd /path/to/taiwan-md
python3 -c "
import json, random
with open('public/api/dashboard-articles.json') as f:
    data = json.load(f)
articles = data if isinstance(data, list) else data.get('articles', [])
good = [a for a in articles if a.get('wordCount', 0) > 2000 and a.get('category') != 'about']
random.shuffle(good)
for i, a in enumerate(good[:10], 1):
    cat = a.get('category','?')
    title = a.get('title','?')
    words = a.get('wordCount', 0)
    featured = '⭐' if a.get('featured') else ''
    date = a.get('date', '?')
    desc = a.get('description','')[:70]
    print(f'{i}. [{cat}] {title} ({words}字) {featured}')
    print(f'   更新：{date} | {desc}...')
    print()
"
```

### 選題優先序

1. **剛重寫的旗艦文章** — 品質最高，趁熱（lastVerified 在 7 天內）
2. **GA4 熱門主題** — 有需求就有傳播力
3. **時事相關** — 搭順風車（颱風季→海洋保育、選舉→民主化）
4. **冷門但故事性極強** — 驚喜感最大

### 排除規則

- 同一篇文章 **間隔 ≥ 2 週** 才能再發孢子（查 `SPORE-LOG.md`）
- `about` 分類不發

---

## Step 2: 品質關卡（QUALITY GATE）

> ⚠️ **這一步是整條產線最關鍵的環節。品質不合格的文章做出的孢子也是垃圾。**

### 自動檢查

對選中的文章執行以下檢查：

```bash
# 1. CLI 品質檢查
cd cli && node src/index.js validate <slug>

# 2. AI 空洞句式掃描
bash scripts/tools/detect-ai-hollow.sh knowledge/<Category>/<slug>.md
```

### 人工判斷矩陣

| 指標              | 合格標準                | 檢查方式                      |
| ----------------- | ----------------------- | ----------------------------- |
| **validate 分數** | ≥ 80/100                | CLI `taiwanmd validate`       |
| **AI 空洞句數**   | ≤ 3 句                  | `detect-ai-hollow.sh`         |
| **文章更新時間**  | lastVerified 在 90 天內 | 讀 frontmatter `lastVerified` |
| **有場景/人物**   | 前 30 行出現具體人名    | 手動讀前 30 行                |
| **有數字落差**    | 至少 1 組可用的數字對比 | 手動掃全文                    |

### 決策樹

```
validate ≥ 80 且 hollow ≤ 3 且 lastVerified ≤ 90 天？
  ├── YES → 進入 Step 3（萃取+寫作）
  └── NO → 分流：
        ├── validate < 80 或 hollow > 3 → 回爐 rewrite-pipeline
        │     讀 docs/editorial/REWRITE-PIPELINE.md，走完 Stage 1-3
        │     重寫完成後重新進入 Step 2
        ├── lastVerified > 90 天 → 更新 frontmatter + 事實查核
        │     搜尋最新資料，更新過時數據，改 lastVerified
        │     重新跑 validate
        └── 缺場景/人物/數字 → 判斷成本：
              ├── 能快速補（< 10 分鐘）→ 直接補，進 Step 3
              └── 需要重寫 → 回爐 rewrite-pipeline
```

### 回爐流程（rewrite-pipeline）

如果文章需要回爐：

```bash
# 讀 rewrite-pipeline 流程
cat docs/editorial/REWRITE-PIPELINE.md
cat docs/editorial/RESEARCH-TEMPLATE.md
cat EDITORIAL.md
```

按照三階段執行：RESEARCH → WRITE → VERIFY。完成後重新進入 Step 2。

---

## Step 3: 萃取 + 寫作（WRITE）

### 3a. 讀原文萃取素材

讀完整篇文章（`knowledge/<Category>/<slug>.md`），萃取以下素材：

| 素材類型   | 要找什麼                         | 數量   |
| ---------- | -------------------------------- | ------ |
| 反直覺事實 | 讀者預期 A，實際是 B             | 1-2 個 |
| 數字落差   | 兩個數字的對比（時間/規模/金額） | 1-2 組 |
| 場景畫面   | 有具體時間、地點、動作的描述     | 2-3 個 |
| 真人引語   | 文中的引用句，帶情感或洞見       | 0-1 句 |
| 情感收尾   | 文章中最有餘韻的句子或畫面       | 1 個   |

### 3b. 選模板

根據素材特性選擇模板（見 `SPORE-TEMPLATES.md`）：

| 素材最強項                 | 選模板        |
| -------------------------- | ------------- |
| 有一個人的完整故事弧線     | A. 人物型     |
| 有一個讓人「哦？」的冷知識 | B. 冷知識型   |
| 數字本身就震撼             | C. 數據衝擊型 |
| 有精確的歷史時刻           | D. 時間軸型   |

### 3c. 寫孢子

按照選定模板的結構寫。**強制規則：**

1. **第一句話必須讓人停下拇指** — 不能用「X 是台灣的...」開場
2. **用場景取代描述** — 讓讀者自己「看見」
3. **一篇只講一個故事弧線** — 不貪心
4. **結尾用情感收，不用摘要收** — 最後一句讓人「停一下」
5. **連結放最後一行** — 孢子本身要獨立存活

### 3d. URL 編碼

**鐵律：中文 slug 必須 URL encode。**

```bash
# 生成 encoded URL
python3 -c "import urllib.parse; print('https://taiwan.md/<category>/' + urllib.parse.quote('<slug>') + '/')"
```

格式：`完整故事 👉 https://taiwan.md/<category>/<encoded-slug>/`

- ✅ `https://taiwan.md/music/%E5%8F%B0%E7%81%A3%E6%B0%91%E6%AD%8C%E9%81%8B%E5%8B%95/`
- ❌ `taiwan.md/music/台灣民歌運動/`（Threads 會斷開連結）
- ❌ `taiwan.md/peopl…`（被截斷 = 死連結）

---

## Step 4: 品檢 + 發佈（QA + SHIP）

### 品檢清單

發出前逐項檢查：

- [ ] **拇指測試**：第一句話會讓滑手機的人停下來嗎？
- [ ] **場景測試**：有沒有至少一個「畫面」（不是描述）？
- [ ] **數字落差**：數字有對比嗎？還是只列了一個數？
- [ ] **塑膠檢測**：有沒有「不僅...更是」「展現了...精神」「值得紀念」？
- [ ] **獨立存活**：不點連結，這篇本身有價值嗎？
- [ ] **情感收尾**：最後一句是讓人「停一下」還是「嗯知道了」？
- [ ] **長度**：150-300 字（Threads 最佳閱讀長度）
- [ ] **URL 可點**：連結完整、中文已 encode、末尾有 `/`
- [ ] **不重複**：查 SPORE-LOG.md 確認 ≥ 2 週未發過

### 發文

1. 呈現給人類確認（可微調）
2. 人類確認後發佈到目標平台
3. 記錄到 `SPORE-LOG.md`

### 發文節奏

- **頻率**：每天 1-2 篇，不貪多
- **時段**：午休 12:00-13:00 或晚間 20:00-22:00（台灣活躍時段）
- **多平台**：同一篇孢子可發 Threads + X，但文案微調（X 更短、可加 hashtag）

---

## 完整流程圖（AI 執行用）

```
人類說「幫我發孢子」或 cron 觸發
│
├─ Step 1: 選文
│   ├─ 讀 dashboard-articles.json
│   ├─ 隨機選 10 篇（2000+字、非about）
│   ├─ 查 SPORE-LOG.md 排除 2 週內已發
│   └─ 呈現候選給人類選擇
│
├─ Step 2: 品質關卡
│   ├─ 跑 `taiwanmd validate <slug>`
│   ├─ 跑 `detect-ai-hollow.sh`
│   ├─ 檢查 frontmatter lastVerified
│   ├─ 合格 → Step 3
│   └─ 不合格 → rewrite-pipeline → 回到 Step 2
│
├─ Step 3: 萃取 + 寫作
│   ├─ 讀全文，萃取素材
│   ├─ 選模板（人物/冷知識/數據/時間軸）
│   ├─ 按模板寫孢子
│   └─ URL encode
│
└─ Step 4: 品檢 + 發佈
    ├─ 過品檢清單
    ├─ 呈現給人類確認
    ├─ 發佈
    └─ 記錄到 SPORE-LOG.md
```

---

## 常見陷阱

| 陷阱       | 症狀                    | 解法                         |
| ---------- | ----------------------- | ---------------------------- |
| 原文品質差 | 孢子寫出來也空洞        | 先過品質關卡，不合格就回爐   |
| URL 被截斷 | `taiwan.md/peopl…`      | 中文 slug 必須 URL encode    |
| 貪心塞太多 | 300+ 字、多條故事線     | 一篇一個弧線，多故事就分多篇 |
| 百科式開場 | 「台灣的 X 是…」        | 用場景/數字/反差開場         |
| 結尾罐頭   | 「值得我們紀念」        | 用情感畫面收尾               |
| hashtag 海 | #台灣 #美食 #文化 #旅遊 | 最多 2-3 個或不加            |

---

_版本：v1.0 | 2026-03-28_
_設計原則：AI 可執行、有品質關卡、平台中立_
