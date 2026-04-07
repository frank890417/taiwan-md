# SPORE-PIPELINE.md — 孢子產線完整流程

> **這份文件是 AI 可執行的。** 任何 AI agent 讀完這份文件，應該能獨立完成一篇孢子的選題、品檢、撰寫、發佈。

---

## 前置知識

開始前，AI 必須讀取以下文件（按順序）：

1. `cat docs/factory/README.md` — 理解孢子是什麼
2. `cat docs/factory/SPORE-TEMPLATES.md` — 四種模板 + 範例
3. `cat docs/editorial/EDITORIAL.md | head -100` — 品質標準核心信念

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
>
> 品質關卡分三層：**自動掃描 → EDITORIAL 語境審查 → 人工判斷**。三層全過才能進 Step 3。

### 第一層：自動掃描（機器過濾）

對選中的文章執行以下檢查：

```bash
# 1. CLI 品質檢查
cd cli && node src/index.js validate <slug>

# 2. quality-scan 空洞偵測（hollow score > 3 = 直接淘汰）
bash scripts/tools/quality-scan.sh knowledge/<Category>/<slug>.md
```

**自動淘汰規則：**

- `validate` 分數 < 80 → 淘汰（回爐 rewrite-pipeline）
- `quality-scan` hollow score > 3 → **直接淘汰**，不進入後續審查
- `lastVerified` > 90 天 → 淘汰（需先更新事實查核）

通過第一層的文章才進入第二層。

### 第二層：EDITORIAL 語境審查（DNA 級品檢）

> 依據 `docs/editorial/EDITORIAL.md` 核心信念：三條鐵律 + 好文章三層結構。
> 孢子的品質取決於原文品質。原文沒有 DNA 就寫不出好孢子。

逐項檢查（讀原文，逐項判定 ✅/❌）：

| 檢查項                     | 依據                                      | 怎麼查                                                                                      | 淘汰標準                               |
| -------------------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------- | -------------------------------------- |
| **有「所以呢」**           | EDITORIAL §好文章第一層：反直覺核心句     | 讀完文章，能用一句話說出「這篇的 so what 是什麼」嗎？如果只能說「這篇介紹了 X」→ 沒有所以呢 | ❌ 缺少 = 淘汰                         |
| **前 30 行有具體人名**     | EDITORIAL §第四鐵律：每篇文章都有一個人   | 讀前 30 行，找第一個出現的具體人名（不是機構名、不是概念）                                  | ❌ 缺少 = 淘汰                         |
| **有讓人「停下來」的句子** | EDITORIAL §好文章第二層：讓人停下來的句子 | 全文掃一遍，有沒有一句你會放慢速度重讀的句子？它製造的是「理解的瞬間」，不只是傳遞資訊      | ❌ 缺少 = 扣分（非硬淘汰，但影響排名） |

**EDITORIAL 審查決策：**

- 三項全 ✅ → 進入第三層
- 缺「所以呢」或缺人名 → 淘汰（回爐 rewrite-pipeline）
- 只缺「停下來的句子」→ 降低優先序，但不硬淘汰

### 第三層：人工判斷矩陣（萃取潛力評估）

通過前兩層的文章，評估其「孢子潛力」：

| 指標             | 合格標準                                  | 檢查方式                      |
| ---------------- | ----------------------------------------- | ----------------------------- |
| **有場景/人物**  | 前 30 行出現具體人名                      | 手動讀前 30 行                |
| **有數字落差**   | 至少 1 組可用的數字對比                   | 手動掃全文                    |
| **後半段品質**   | 後 40% 不是清單堆砌/虎頭蛇尾              | 手動讀後半段（從 60% 位置起） |
| **孢子素材密度** | ≥ 3 個可萃取素材（反直覺/數字/場景/引語） | 按 Step 3a 素材表預掃         |

### 決策樹（三層整合）

```
候選文章
│
├─ 第一層：自動掃描
│   ├─ validate < 80 → 淘汰（回爐 rewrite-pipeline）
│   ├─ hollow score > 3 → 直接淘汰
│   ├─ lastVerified > 90 天 → 淘汰（先更新事實查核）
│   └─ 全過 → 進入第二層
│
├─ 第二層：EDITORIAL 語境審查
│   ├─ 缺「所以呢」→ 淘汰
│   ├─ 前 30 行無具體人名 → 淘汰
│   ├─ 缺「停下來的句子」→ 標記，降低排名
│   └─ 核心項全過 → 進入第三層
│
└─ 第三層：人工判斷
    ├─ 缺場景/數字/後半段差 → 判斷成本：
    │     ├─ 能快速補（< 10 分鐘）→ 直接補，進 Step 3
    │     └─ 需要重寫 → 回爐 rewrite-pipeline
    └─ 全過 → 進入 Step 3（萃取+寫作）
```

### 回爐流程（rewrite-pipeline）

如果文章需要回爐：

```bash
# 讀 rewrite-pipeline 流程
cat docs/editorial/REWRITE-PIPELINE.md
cat docs/editorial/RESEARCH-TEMPLATE.md
cat docs/editorial/EDITORIAL.md
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
6. **鉤子三要素（至少命中 2/3）**：
   - **認知衝突**：讀者以為 A，其實是 B
   - **個人連結**：讀者感覺「這跟我有關」
   - **資訊缺口**：故事弧線的自然懸念（不是廉價的「未完待續⋯⋯」，是讀者自己想知道後來怎樣）
     → 寫完後自檢：三要素命中幾個？< 2 → 重寫鉤子

### 3d. URL 編碼

> ⚠️ **鐵律：所有孢子中的 URL，中文部分必須 URL encode。沒有例外。**
> Threads/X/Facebook 對中文 URL 的解析極不穩定，未 encode 的中文連結會被截斷或變成死連結。

**每次產出孢子時，必須用以下指令生成 URL（不要手打）：**

```bash
# 生成 encoded URL（複製貼上即可）
python3 -c "import urllib.parse; print('https://taiwan.md/<category>/' + urllib.parse.quote('<slug>') + '/')"

# 範例：
python3 -c "import urllib.parse; print('https://taiwan.md/food/' + urllib.parse.quote('珍珠奶茶') + '/')"
# → https://taiwan.md/food/%E7%8F%8D%E7%8F%A0%E5%A5%B6%E8%8C%B6/
```

格式：`完整故事 👉 https://taiwan.md/<category>/<encoded-slug>/`

- ✅ `https://taiwan.md/music/%E5%8F%B0%E7%81%A3%E6%B0%91%E6%AD%8C%E9%81%8B%E5%8B%95/`
- ✅ `https://taiwan.md/food/%E7%8F%8D%E7%8F%A0%E5%A5%B6%E8%8C%B6/`
- ❌ `taiwan.md/music/台灣民歌運動/`（Threads 會斷開連結）
- ❌ `taiwan.md/food/珍珠奶茶/`（中文未 encode = 死連結）
- ❌ `taiwan.md/peopl…`（被截斷 = 死連結）

**AI 自檢規則：** 孢子寫完後，掃描最後一行 URL，若包含任何中文字元 → 停下來，重新用 python3 encode。

### 3e. 配圖：OG Card 頁面

每篇文章都有獨立的 OG card 頁面，固定 1200×630 尺寸：

```
https://taiwan.md/og/<category>/<slug>/
```

例如：`https://taiwan.md/og/music/台灣民歌運動/`

**配圖產生方式（目前）：**

1. 在瀏覽器開啟 OG card 頁面
2. 截圖（macOS: `Cmd+Shift+4` 框選 / 瀏覽器 DevTools screenshot）
3. 附加到孢子貼文

**設計規格：**

- 尺寸：1200×630px
- 深綠色漸變背景 + Noto Serif TC 明體大標題
- 包含：麵包屑、標題、描述、標籤（前 4 個）、Taiwan.md footer
- `noindex` 不會污染 SEO

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
- [ ] **URL 可點**：連結完整、**中文已 URL encode（不含任何中文字元）**、末尾有 `/`
- [ ] **不重複**：查 SPORE-LOG.md 確認 ≥ 2 週未發過

### 發文

1. 呈現給人類確認（可微調）
2. 人類確認後發佈到目標平台
3. 記錄到 `SPORE-LOG.md` §發文紀錄（**URL 必填，沒有 URL = 沒紀錄**）
4. 如果同時有英文版，一起寫英文孢子（翻譯+孢子打包做，素材還在腦裡）

### 發文節奏

- **頻率**：每天 1-2 篇，不貪多
- **時段**：午休 12:00-13:00 或晚間 20:00-22:00（台灣活躍時段）
- **多平台**：同一篇孢子可發 Threads + X，但文案微調（X 更短、可加 hashtag）

---

## Step 5: 英文版（EN SPORE）

> **中文孢子完成後自動觸發。** 不是可選步驟，是產線的一部分。
> 47% 讀者在 /en/ 路徑（θ session GA4 數據）。英文孢子是觸及國際讀者的最低成本方式。

### 5a. 檢查英文文章狀態

```bash
# 檢查英文版是否存在
ls knowledge/en/{Category}/{english-slug}.md 2>/dev/null

# 如果不確定 slug，查映射表
grep "{中文slug}" knowledge/_translations.json
```

**三種情況：**

| 情況                                         | 處置                                                           |
| -------------------------------------------- | -------------------------------------------------------------- |
| 英文版不存在                                 | **重寫式翻譯**（見 TRANSLATION-PIPELINE），完成後繼續 5b       |
| 英文版存在但過時（中文已重寫但英文還是舊版） | **更新英文版**：讀中文新版 → 重寫英文版對應段落 → 保留所有腳註 |
| 英文版存在且品質 OK                          | 直接進 5b                                                      |

### 5b. 寫英文孢子

**素材不用重新萃取** — 中文孢子剛寫完，核心素材（反直覺事實、數字落差、場景、情感收尾）還在腦裡。

英文孢子的調整：

- 不是逐句翻中文孢子，是**用同一組素材重新寫給英文讀者**
- 台灣特有概念要加一句解釋（如 "Mazu (媽祖), the sea goddess"）
- 長度可比中文稍長（文化解釋需要空間），但不超過 250 words
- 連結用英文版 URL

### 5c. URL encode + 品檢

```bash
# 英文版 URL（slug 通常是英文，不需 encode，但驗證一下）
echo "https://taiwan.md/en/{category}/{english-slug}/"
```

品檢清單同 Step 4，額外加：

- [ ] 台灣專有名詞有中英並列嗎？
- [ ] 英文讀者不需要任何台灣背景知識就能讀懂嗎？
- [ ] 語氣像英文母語者寫的，不像翻譯體？

### 5d. 呈現 + 記錄

呈現中文孢子和英文孢子一起給人類確認。記錄到 SPORE-LOG.md（語言欄位填 `en`）。

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
│   ├─ 跑 `quality-scan.sh`
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
├─ Step 4: 品檢 + 發佈
│   ├─ 過品檢清單
│   ├─ 呈現給人類確認
│   ├─ 發佈
│   └─ 記錄到 SPORE-LOG.md
│
└─ Step 5: 英文版（中文孢子完成後自動觸發）
    ├─ 檢查英文文章是否存在（knowledge/en/{Category}/{slug}.md）
    │   ├─ 不存在 → 重寫式翻譯（見 TRANSLATION-PIPELINE）
    │   └─ 存在但過時 → 跟中文版 diff，更新
    ├─ 用英文文章萃取素材 → 寫英文孢子（素材還在腦裡，不用重新萃取）
    ├─ URL encode 英文版連結
    ├─ 呈現給人類確認
    └─ 記錄到 SPORE-LOG.md（語言欄位填 en）
```

---

## 常見陷阱

| 陷阱       | 症狀                       | 解法                                                   |
| ---------- | -------------------------- | ------------------------------------------------------ |
| 原文品質差 | 孢子寫出來也空洞           | 先過品質關卡，不合格就回爐                             |
| URL 被截斷 | `taiwan.md/peopl…`         | 中文 slug 必須 URL encode（用 python3 指令，不要手打） |
| URL 含中文 | `taiwan.md/food/珍珠奶茶/` | Threads/X 會斷開，必須 encode 成 `%E7%8F%8D...`        |
| 貪心塞太多 | 300+ 字、多條故事線        | 一篇一個弧線，多故事就分多篇                           |
| 百科式開場 | 「台灣的 X 是…」           | 用場景/數字/反差開場                                   |
| 結尾罐頭   | 「值得我們紀念」           | 用情感畫面收尾                                         |
| hashtag 海 | #台灣 #美食 #文化 #旅遊    | 最多 2-3 個或不加                                      |

---

_版本：v1.4 | 2026-04-06_
_v1.3→v1.4：新增 Step 5 英文版流程（檢查英文文章→翻譯/更新→寫英文孢子→品檢），從「可選」升級為「自動觸發」_
_v1.2→v1.3：Step 4 發文新增 URL 必填鐵律 + 英文孢子打包做規則_
_v1.1→v1.2：Step 2 品質關卡升級為三層架構（自動掃描 → EDITORIAL 語境審查 → 人工判斷），新增 hollow score > 3 直接淘汰、EDITORIAL 三項檢查（所以呢/人名/停下來的句子）_
_v1.0→v1.1：Step 3c 新增鉤子三要素強制規則（認知衝突/個人連結/資訊缺口，至少命中 2/3）_
_設計原則：AI 可執行、有品質關卡、平台中立_
