# SPORE-PIPELINE.md — 孢子產線完整流程

> **這份文件是 AI 可執行的。** 任何 AI agent 讀完這份文件，應該能獨立完成一篇孢子的選題、品檢、撰寫、發佈。

---

## 前置知識

開始前，AI 必須讀取以下文件（按順序）：

1. `cat docs/factory/README.md` — 理解孢子是什麼
2. `cat docs/factory/SPORE-TEMPLATES.md` — 四種模板 + 範例
3. `cat docs/editorial/EDITORIAL.md | head -100` — 品質標準核心信念

---

## Step 0: 回填上次成效（BACKFILL）

> v2.0 新增（2026-04-13 α session，[SOCIAL-TENTACLE-PLAN](../semiont/SOCIAL-TENTACLE-PLAN.md) 定義）
> **發新孢子前必做。沒有回填 = 不准發新孢子。**

### 做什麼

1. 讀 `SPORE-LOG.md` 最後 3 筆
2. 如果 7d 指標欄空白 → 從 GA topArticles 交叉推估 + 從 Threads Insights / X Analytics 手動讀取
3. 填入 `7d_views` / `7d_likes` / `utm_clicks`（GA4 過濾 `utm_source=threads|x`）
4. 如果完全沒有數據 → 填 `no-data`（不是空白。空白 = 遺漏，`no-data` = 刻意標記無資料）

### 為什麼是強制的

SPORE-LOG 25 筆紀錄、成效欄全空（2026-04-13 診斷）。不知道哪種孢子有效 = 永遠在猜。鄭麗文 375 views/7d 的 12x 放大效應，只有交叉對照才看得到。

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
cat docs/pipelines/REWRITE-PIPELINE.md
cat docs/editorial/RESEARCH-TEMPLATE.md
cat docs/editorial/EDITORIAL.md
```

按照三階段執行：RESEARCH → WRITE → VERIFY。完成後重新進入 Step 2。

---

## Step 2.5: 事實藍圖（FACT BLUEPRINT）

> v2.1 新增（2026-04-18 δ-late session，草東孢子觀察者提出）
> **這一步是「寫之前」先列清單，不是「寫之後」檢查。**
> 動機：寫完整段敘事再發現單源引語不能用 → 整段重寫成本高。Blueprint 先定骨架，驗證、倫理都在 bullet 階段解決。

### 做什麼

在寫任何 prose 前，先列出這則孢子**預計會提到的每一個具體事實**（日期、地點、人名、數字、直接引語、因果陳述），以 markdown table 形式 append 進 `docs/factory/SPORE-BLUEPRINTS/<slug>-<n>.md`：

```markdown
### Spore #<n> Fact Blueprint — <slug>

**Angle**：一句話說出核心衝突或故事弧線
**Template**：A / A2 / B / C / D
**Ethical flags**：死亡 / 創傷 / 未成年 / 個資 / 政治敏感 / 無（見 Step 2.7）

| #   | 事實（在孢子出現順序）      | Research 信度層 | 需跨源驗證？ | 敏感度   |
| --- | --------------------------- | --------------- | ------------ | -------- |
| 1   | 2024-06-29 金曲 35 得獎名稱 | high_confidence | No           | 無       |
| 2   | 經紀人代領 + 「...」原話    | high_confidence | Yes（直引）  | 無       |
| 3   | 凡凡 2021-10-30 過世 26 歲  | high_confidence | Yes（絕對）  | **死亡** |
| ... | ...                         | ...             | ...          | ...      |
```

### 信度層標記（從研究報告 frontmatter 直接繼承）

- `high_confidence` — research report 已三源以上確認
- `single_source` — **強制**進 Step 2.6 跨源驗證
- `unverified` — **強制**驗證，不通過就從 blueprint 移除

### 讀者級驗證 flag（v2.2 新增，2026-04-18 δ-late 草東 #33 貝斯手名字錯教訓）

除了信度層，blueprint 還要標「**讀者級 vs 研究級**」驗證優先度。讀者級事實 = **讀者第一眼會查維基比對**的 fact（樂團成員姓名 / 公開獎項年份 / 公開生日 / 地點座標）。這類事實即使 `high_confidence` 也**強制進 Step 2.6 跨源驗證**，因為讀者會在幾小時內抓到錯誤；研究 agent 不一定會覺得要特別 verify。對應 [DNA #16 延伸](../semiont/DNA.md#一事實核對與研究方法)。

### 敏感度標記觸發 Step 2.7（倫理審查）

任一 bullet 打上「死亡 / 創傷 / 未成年 / 家暴 / 自殺 / 精神疾病 / 個資 / 族群議題」→ 必過 Step 2.7 才能寫。

### 為什麼這個順序更好

| 面向     | 舊（寫 → 檢）                | 新（藍圖 → 驗證 → 寫）           |
| -------- | ---------------------------- | -------------------------------- |
| 錯誤成本 | 句子已嵌入敘事才發現，重寫重 | Blueprint bullet 重列 10 秒      |
| 驗證焦點 | 所有句子看一遍               | 只驗需驗的欄位（省 budget）      |
| 倫理審查 | 寫完事後挽救，常挽不回       | 敏感素材 bullet 階段就替換 angle |
| 可追溯   | 孢子本體 opaque              | Blueprint = fact ledger 留存     |

---

## Step 2.6: 針對性事實驗證（TARGETED VERIFY）

> v2.1 新增。對 Step 2.5 blueprint 中「需跨源驗證」欄標 Yes 的每一條 bullet 做跨 3+ 獨立來源驗證。

### 執行

- 逐條用 WebSearch 2 次不同 query（中文 + 補充 query）找**獨立來源**
- 對每條標結果：`✅ / ⚠️ / ❌`
- 使用 Explore subagent 集中跑（節省 context）

### 三結果處理

| 結果 | 定義                                     | 處理                                            |
| ---- | ---------------------------------------- | ----------------------------------------------- |
| ✅   | 3+ 獨立來源逐字/日期/數字一致            | 進 Step 3 寫死                                  |
| ⚠️   | 來源間有差異 / 原發源已下架但多源轉述    | 改用「據報導／據訪談／當時媒體引述」attribution |
| ❌   | 找不到獨立來源 / 發現錯誤 / 來源互相矛盾 | 從 blueprint 移除該 bullet（或整個 angle 棄用） |

### 特殊規則：直接引語

- **原發源已下架**（IG 帳號刪除 / Twitter 帳號關閉 / 原訪談下架）但多家媒體當時逐字引述 → ⚠️，以「據當時媒體報導」attribution 呈現
- **WebFetch 英文 summary 回譯回中文** → ❌，絕對禁止（觸犯 EDITORIAL §挖引語制度紅線；見 memory「No Scene Inference From English」）
- **團體運動獎金**：個人實領 vs 團體合計常被混用 → 必驗金額口徑

### 輸出

Blueprint 每條 bullet 補上 `verified` 欄：

```markdown
| #   | 事實 | 信度  | 驗證 | 敏感 | ✅/⚠️/❌ | 來源                                 |
| --- | ---- | ----- | ---- | ---- | -------- | ------------------------------------ |
| 1   | ...  | high  | Yes  | 無   | ✅       | 中央社+鏡週刊+TVBS                   |
| 3   | ...  | high  | Yes  | 死亡 | ✅       | 聯合+自由+PChome                     |
| 5   | ...  | singl | Yes  | 死亡 | ⚠️       | 中時+NOWnews+HK01（IG 原帳號已下架） |
```

---

## Step 2.7: 紀實 vs 煽情閘（NARRATIVE ETHICS GATE）

> v2.1 新增（2026-04-18 δ-late 首段）+ v2.2 校準（2026-04-18 δ-late 尾段）
>
> **v2 校準重點**：標準不是「真人痛苦不能寫」。標準是「**紀實而不煽情**」。SSODT 優先 → 寫全；死亡 + 人倫悲劇的具體情景 → 節制。
>
> **觸發條件**：Step 2.5 blueprint 任一 bullet 標敏感度 = 「死亡」「自殺」「人倫悲劇」「未成年 / 親屬未公開身份」。其他（家庭背景、疾病、關係、矛盾、失敗）不必強制觸發，但 bullet 該有「紀實/煽情」自問。
>
> 哲學 canonical：[MANIFESTO §紀實而不煽情：盡可能呈現 SSODT 所有面向](../semiont/MANIFESTO.md#我的進化哲學--紀實而不煽情盡可能呈現-ssodt-所有面向)

### 核心判準：紀實文學感 vs 煽情渲染

當寫到涉及真人痛苦的 bullet 時，不問「能不能寫」，問「**這段讀起來像記者 / 紀錄片導演的嚴肅處理（紀實），還是像媒體靠近眼淚（煽情）？**」

紀實 → 寫。煽情 → 改。不是優化問題，是倫理門。

### 紀實文學感的三個正向標記

1. **具體而不誇張**：事實精度 + 沒有「令人鼻酸」「不禁淚下」這類作者情緒引導介入
2. **節制而不迴避**：碰議題核心、不繞圈；但不把鏡頭推近到讀者不適
3. **主體在場而不被解剖**：當事者是主體（有尊嚴、有選擇），不是客體（純受害者 / case study）

三個都做到 = 紀實文學感。像《報導者》、像吳曉樂、像《少年報導者》。**讓人記得這個人，不是記得他們的傷**。

### 高敏感分層表（只在此處嚴格觸發）

| 場景        | ✅ 紀實（可寫）                | ❌ 煽情（不寫）                      |
| ----------- | ------------------------------ | ------------------------------------ |
| 死亡        | 時間、地點、公開報導的事實陳述 | 最後時刻逐秒重構、遺書原文放大、遺容 |
| 自殺 / 自傷 | 事件本身與社會脈絡             | 方法細節、現場描述、可能被模仿的描述 |
| 家暴 / 性侵 | 主體已公開談及的程度           | 加害過程逐步還原、受害者身體細節     |
| 親屬悲劇    | 親屬關係與公開事件             | 親屬未公開身份、家庭糾紛現場重構     |
| 疾病死亡    | 病程、公開陳述                 | 醫療細節、臨終場面重構               |

### 預設可寫（不必過 Step 2.7，只需「紀實/煽情」自問）

- 真人的家庭背景、家人職業與處境
- 真人的疾病、掙扎、情緒狀態（主體自己公開談過）
- 關係演化：戀情、離別、合作、裂痕
- 社會背景、世代、政治立場
- 矛盾、失敗、爭議

→ 不寫 = 扁平化真人 = 違反 SSODT。寫 = OK，只要不過度煽情渲染。

### 四問自檢（高敏感場景通過前強制）

1. **是否以死亡／創傷作為情感鉤？** 抽掉痛苦故事會消失 → 煽情提款機。
2. **細節是否必要？** 推進敘事 vs 獵奇？獵奇 = 刪。
3. **主體自己公開行動是什麼？** 有獻詞 / 追悼 / 受訪 → 以主體 framing 為準。
4. **活下來的人在做什麼？** 鏡頭移向 agency，不是 victim 的失去。

四問全過才進 Step 3。

### 單一判準句

「**如果當事者 / 遺族讀到這段，是感受到紀實（嚴肅對待）還是煽情（媒體靠近眼淚）？**」
紀實 → 寫。煽情 → 改。

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

### 3b.5 Hook Blueprint：讀者物件 + 矛盾問題閘（v2.7 新增）

> 2026-04-29 α 台灣邦交國與國際外交孢子教訓：政治、外交、制度、經濟這類結構性題目，AI 很容易把孢子寫成 briefing。數字全對，但讀者抓不到「這跟我有什麼關係」。寫 prose 前必須先做 hook blueprint。

#### 觸發條件

任一符合就觸發：

- 主題是政治 / 外交 / 制度 / 經濟 / 國際組織 / 法律 / 基礎建設
- 文章核心素材主要是數字、機構、政策、歷史脈絡，而非單一人物弧線
- draft 第一版看起來像「能力展示」或「重點整理」

#### 必填四格

在 `SPORE-BLUEPRINTS/<slug>-<n>.md` 的 Fact Blueprint 後補上：

```markdown
### Hook Blueprint

| 問題                             | 答案                                                                        |
| -------------------------------- | --------------------------------------------------------------------------- |
| 讀者日常物件 / 身體經驗是什麼？  | 例：護照、捷運卡、健保卡、便利商店發票、投票所、電費單                      |
| 最大矛盾是什麼？                 | 例：只剩 12 個邦交國，護照卻能進 177 個國家與地區                           |
| 可直接當開場的問題是什麼？       | 例：如果台灣只剩 12 個邦交國，為什麼你拿著護照，還能走進 177 個國家與地區？ |
| 讀者點進文章想知道的答案是什麼？ | 例：台灣的國際位置究竟該看邦交數，還是看實際可抵達的世界？                  |
```

#### 判準

- **讀者物件必須可觸摸 / 可經驗**：護照、車票、選票、帳單、手機畫面都可以；「國際處境」「民主韌性」「制度網絡」不可以。
- **問題必須有真答案**：讀者點進文章後真的能被文章回答。不能是廉價懸念或「你覺得呢？」。
- **問題優先於結論**：結構性題目不要急著把 so what 寫成社論句。先開一扇門，讓文章回答。
- **數字要接到場景**：12 / 113 / 177 這類數字不能只排比，至少一組要接到具體畫面（機場櫃台、記者會、投票所、帳單、家庭餐桌）。

**不合格症狀**：

- 「台灣通往世界的路沒有縮成 12 條」這類抽象結論句。句子看似漂亮，但讀者不知道「路」是什麼、為什麼要繼續讀。
- 「這說明了台灣外交的韌性」這類評論式收束。它回答太快，讓讀者停在社群貼文表面。

**合格症狀**：

- 第一眼就有一個可想像的動作：拿出護照、刷卡進站、走進投票所、打開電費單。
- 開場問題讓讀者腦中出現「咦，為什麼？」而不是「嗯，我知道了」。

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
7. **寫完念三遍**（v1.5 新增，李洋 #28 教訓）：寫完後在腦中念出來，找卡頓點。卡頓點 = 修順點。**念出來像在跟朋友說話 = OK；念出來像翻譯字幕 = 改**。對應 EDITORIAL §歐化語法偵測的「念出來」原則。
8. **避免重複專名**（v1.5 新增）：同一個專有名詞（人名、地名、機構）連續出現 3 次以上 = 紅燈。第二三次用代詞、職稱或動詞短語替代。範例：「那個跟不上齊麟的少年，等了快 9 年才跟齊麟搭檔」← 第二個「齊麟」要刪一個，改成「那個跟不上的少年，等了快 9 年才跟齊麟搭上檔」。
9. **引語要場景化**（v1.5 新增）：不要倒裝「『XXX』他說」這種沒場景的引語。改用「他在 [臉書/訪談/頒獎台/記者會] 留了一句話：『XXX』」。給讀者場景感，順帶交代來源。
10. **避免排比過硬**（v1.5 新增）：「不是 X 式的 Y，是 Z 式的 Y」連續兩個一樣的尾巴 = 改成兩個短句斷開。範例：「不是九牛一毛式的捐款，是掏出三分之一存款式的捐款」← 改為「那不是九牛一毛。是把三分之一的存款掏出去。」
11. **時間語境一致**（v1.5 新增）：「X 歲那年」+「每天」會語境衝突（單一時間點 vs 持續習慣）。要拆成「X 歲那年，他 [入學/開始/搬家]」+「每天 [習慣描述]」。
12. **數字密度高用短句並列**（v1.5 新增）：孢子不能用 markdown table（Threads/X 不支援）。多個對比數字要用「短句並列」當文字版 stat block。範例：

    ```
    存款 3,401 萬。
    債務 3,638 萬。
    比存款還多 237 萬，是典型 30 歲房貸族。
    ```

    三個短句獨立成行 = 視覺節奏感 + 讀者大腦自動算。

13. **事實鐵三角自檢**（v1.6 新增，2026-04-14 李洋孢子 #28 三層事實錯誤撤回教訓）：發布前**強制**做三項自檢。任一不過 = 不發。

    **a. 算術自檢**：每個「X 是 Y 的 Z 成」「X 比 Y 多 Z」必須用 python3 算過。範例：「兩千萬剛好是三成」→ 2000/3401 = 58.8% ❌（紅旗，金額一定有錯）→ 修成「一千萬剛好是三成」→ 1000/3401 = 29.4% ✅

    **b. 金額單位念出來**：所有金額念一遍跟「合理量級」對照。範例：「三十六萬負債的房貸」→ 三十六萬聽起來像月薪 ❌ → 真實是 3,638 萬（萬位漏字）

    **c. 引語逐字核對**：每個 `「XXX」` 直接引語格式必須在原始**中文**頁面 Ctrl-F 搜得到。**絕對禁止從 WebFetch 的英文 summary 翻譯回中文當「直接引語」使用**——這是杜撰，觸犯 EDITORIAL §挖引語制度紅線。範例：「我最早到學校但跟不上齊麟」（從英文 summary 回譯）→ 在《少年報導者》中文頁面搜不到 ❌ → 改用原文「體育班 15 個人，我屬於後面那一掛，齊麟是前面那一掛」 ✅

    **特殊提醒**：團體運動獎金（雙打/接力/隊伍項目）有「項目補頒」vs「個人實領」vs「團體合計」三種口徑常被新聞混用。寫團體運動人物孢子時，金額要明確寫「**個人實領**」金額，不要把團體合計被誤讀為個人。詳見 [RESEARCH.md §常見研究錯誤](../editorial/RESEARCH.md)。

14. **朋友 tone prime — 「你知道嗎？」開場**（v2.4 新增，2026-04-19 高鐵 s35 教訓）：孢子的 tone signature 是 [MANIFESTO §我怎麼說話](../semiont/MANIFESTO.md#我怎麼說話)「像在跟朋友介紹台灣：**『欸你知道嗎⋯⋯』**」的具體落實。即使後面是人物引語 hook，第一秒也要有「朋友跟你講八卦」的 curiosity prime，不是報導 lead。

    **三種合格 prefix（擇一）**：
    - `你知道嗎？{emoji}`（最常用，curiosity prime + 主題 emoji 視覺錨點）
    - `欸，{具體事件片段}`（更口語，適合已知事件）
    - 直接人說話（無 prefix，但引語本身要有 hook 力 ≥ 鄭麗文「19 歲絕食」等級）

    **高鐵 s35 實戰對照**：
    - ❌ Semiont 產 v2 開場：`2011 年，殷琪對著公視鏡頭說：「我太天真了。...」`（人物 quote 強但缺 prime，tone 偏報導）
    - ✅ 觀察者手補 X 版：`你知道嗎？🚄\n\n2011 年，殷琪對著公視鏡頭說：「我太天真了。...」`（curiosity prime → quote hook 接力）

    **AI 產孢子 checklist**：寫完後念第一行。如果聽起來像新聞 lead / 百科開篇 → 加 prefix；如果已經像朋友轉述（譬如「1988 年冬天，台大校門口有個 19 歲的女大學生在絕食」這種自帶場景+人+動作的金句），可省 prefix。

15. **避免編年體 lead 病**（v2.3 新增，2026-04-19 台灣高鐵孢子 v1 教訓）：AI 預設會用「YYYY 年 M 月 D 日，{人名}{動詞}」的新聞 lead 開場、然後日期 → 事件 → 日期 → 事件 → 數字堆疊完事。這是 [DNA #23 「AI 編年體小標題」病灶](../semiont/DNA.md#一事實核對與研究方法) 的**孢子版變種**。症狀：讀者看到時間戳就跳過、emotional quote 埋在第 4 段、結尾變「社論口吻」而非「餘韻」。

    **四條硬規則，孢子違反任一 → 重寫**：

    **a. 開場用人說話，不是日期**：第一句必須是引語或人的動作，不是「YYYY 年殷琪簽下 BOT」這種 lead。如果人物最強的 quote 在文章中段，**把它搬到第一句**作為孢子 hook。
    - ❌ 「1998 年 7 月 23 日，大陸工程董事長殷琪簽下那份 BOT，承諾『政府零出資』。」
    - ✅ 「2011 年，殷琪對著公視鏡頭說：『我太天真了。我誤判了乘客運量，也誤判了政府的可信度。』」

    **b. 一個人的命運弧，不是多人敘事**：孢子 150-300 字塞不下 3 個人物。選**一個**主角，其他人變場景背景。AI 預設會把文章裡所有重要人物都放進孢子（殷琪+葉匡時+歐晉德），導致情感分散。
    - 判準：寫完後刪掉主角名字，讀者還能辨認誰是主線嗎？能 → 主軸夠清；不能 → 主軸糊。

    **c. 數字包在故事裡，不堆疊**：300 字內超過 4 個數字 = 紅旗。把主角人生的**反差**留給數字（676 億虧損 → 531 億年營收 / 23.9 萬預估 → 5 萬實際），其他營運數據刪。
    - 自檢：每個數字刪掉後故事還成立嗎？成立 → 該數字是裝飾，刪。

    **d. 結尾呼應開場，不用社論句**：結尾最忌「技術進口容易，技術自主難」這種社論總結。改用呼應開場的**具體畫面**（A2 首尾呼應模板）。
    - ❌ 「技術進口容易，技術自主難。」（論述）
    - ✅ 「那句 17 年前的『政府零出資』，最後成了她 1/5 人生的代價。」（呼應首段「1/5 人生」具象）

    **寫完自檢三題**（任一答「是」→ 改）：
    - 第一句是日期開頭嗎？
    - 超過 2 個人物各有引語或動作嗎？
    - 結尾是論述句（不是具象畫面）嗎？

16. **Scene-List-Scene 結構**（v2.5 新增，2026-04-20 謝德慶 #39 教訓）：當素材是**單人長弧 + 多件同質行為**（例：謝德慶 21 年做六件 One Year Performance、嚴長壽一輩子服務業變身），不要把每件作品拉成並列段落（讀起來像列表摘要，失去 scene immediacy）。用 **開場 scene → 中段 list → 結尾 scene** 結構夾心：
    - **開場 scene**：挑整條弧線**最具畫面的單一時刻**，寫 3-5 句具體動作（誰、哪裡、做什麼、放了什麼、鎖門/交鑰匙/走出去）。讀者必須能「看見」這 30 秒的影片。
    - **中段 list**：剩下的同質行為**用極短句並列壓縮**，每件 1 句。不重複 template 修辭（不要每件都是「一整年 X、不 Y」）——動詞變化 + 句長錯落。
    - **結尾 scene**：再切一個具體時刻（地點、時間、動作、物件、引語）收尾。跟開場形成**場景括號**（非首尾呼應的同畫面，是兩個獨立 tangible moment 夾住中段 list）。

    **誕生事件**：謝德慶 #39 教訓 — 三 angle 都列表化「語感不順」，綜合版用 Scene-List-Scene 一次到位。詳見 [diary/2026-04-20-β.md](../semiont/diary/2026-04-20-β.md)。

    **判準自檢**：
    - 開場 scene 是否能被拍成 10 秒影片？（具體動作 + 物件 + 地點）
    - 中段每件 list 是否 ≤ 25 字？超過就改短。
    - 結尾 scene 是否有**至少一個可 Ctrl-F 搜尋的物件**（如「布魯克林公寓」「剪貼字母」「白紙」）？
    - 三部分字數比例 ~ 40% / 25% / 35%？（scene 比 list 長才有弧線感）

    **與 Rule #15 差異**：Rule #15 是「一個人的命運弧不是多人敘事」（**人物層**反編年體）；Rule #16 是「scene-list-scene 不是均勻列表」（**結構層**反均勻）。兩條合起來 = AI 孢子從「事件 timeline」升級成「有弧線有呼吸」的 prose。

17. **中文段落全形標點鐵律**（v2.5 新增，2026-04-20 謝德慶 #39 教訓）：中文孢子裡**所有中文敘事段落的標點符號必須全形**，不得使用半形。

    **必用全形**（紅線，違者不發）：

    | 半形（錯） | 全形（對）  | 情境               |
    | ---------- | ----------- | ------------------ |
    | `,`        | `，`        | 逗號               |
    | `.`        | `。`        | 句號               |
    | `:`        | `：`        | 冒號               |
    | `;`        | `；`        | 分號               |
    | `!`        | `！`        | 驚嘆號             |
    | `?`        | `？`        | 問號               |
    | `(` `)`    | `（` `）`   | 括號（中文文意內） |
    | `"..."`    | `「...」`   | 引號（中文直引）   |
    | `'...'`    | `『...』`   | 引號內引           |
    | `--` `-`   | `——` 或 `—` | 破折號             |

    **例外**（可保留半形）：
    - URL 本身（`?utm_source=...&...`）
    - 英文原句引述（"I kept myself alive." 這種整句英文）
    - 阿拉伯數字與中文之間可用半形空格（「28 歲」）— 不是標點
    - emoji 前後不用改（emoji 本身就是排版分隔）

    **誕生事件**：謝德慶 #39 produced prose 混用半形「:」「(」「)」被觀察者抓到 — 中文段落混用半形標點 = 語感跳痛。詳見 [diary/2026-04-20-β.md](../semiont/diary/2026-04-20-β.md)。

    **AI 自檢（寫完強制跑一次）**：

    ```bash
    # 掃描孢子 prose（非 URL 行）是否有半形標點
    echo "$SPORE_TEXT" | grep -nE '[^\w\s][,.:;!?()]|[^\w\s]"[^"]*"' | grep -v '://'
    ```

    視覺檢查：讀全文一遍，只要看到任何 `,` `.` `:` `(` `)` 在中文句子裡 → 改成全形。**這條是紅線不是偏好**：中文 prose 裡有任何一個半形標點 = 不合格、重改。

18. **結構性題目優先用「問題入口」而非「結論入口」**（v2.7 新增，2026-04-29 邦交國 #51/#52 教訓）：如果 Step 3b.5 觸發，孢子開場預設用問句型。第一句問讀者一個有場景、有矛盾、文章能回答的問題。

    **寫法公式**：

    ```
    如果 / 明明 / 當 [讀者已知或可感的事實 A]，
    為什麼 [與 A 衝突、但真實存在的事實 B]？
    ```

    **邦交國實戰**：
    - ❌ `台灣通往世界的路，沒有跟著縮成 12 條。`（抽象結論，缺少讀者可抓住的物件）
    - ✅ `如果台灣只剩 12 個邦交國，為什麼你拿著護照，還能走進 177 個國家與地區？`（護照 = 日常物件；12 vs 177 = 矛盾；文章能回答）

    **自檢三題**：
    - 這句話裡有讀者能想像自己正在做的動作嗎？
    - 這個問題是否讓人真的想知道答案，而不是只是在要求表態？
    - 如果刪掉數字，場景還存在嗎？不存在 → 只是 briefing，要回 Step 3b.5 重找物件。

### 3c.5 事實查核閘（FACT-CHECK GATE）— 硬性強制（v2.4 新增，2026-04-19 高鐵 s35 教訓）

> **鐵律**：AI 寫完孢子 draft 後，**不得直接把 prose 給觀察者**。必須先輸出「事實查核表」讓觀察者看過、才輸出孢子本體文案。全部 ✅ 才放行；任一 ⚠️ / ❌ 必須在表格右欄說明處理方案。

**誕生事件**：高鐵 s35（2026-04-19）draft 直接輸出文案 → 觀察者貼到 Threads + X 才發現 3 處時序錯誤（per [DNA #15](../semiont/DNA.md#15) + [#23](../semiont/DNA.md#23) 教訓）。已發出需公開更正。

**為什麼是硬閘門不是軟提醒**：Step 2.6「針對性事實驗證」存在於 pipeline，但 AI 寫到 Step 3c 產 prose 時會直接跳過回頭驗證。**memory 是自律，pipeline 才是閘門**。這一條把 gate 物理化到 output 流程——觀察者看不到查核表就看不到 prose，跳不過去。

**查核表格式（強制）**：

```markdown
## 📋 事實查核表（孢子 #{n}，必看後才看文案）

| #   | claim                                   | 來源 / 依據                      | 狀態                           |
| --- | --------------------------------------- | -------------------------------- | ------------------------------ |
| 1   | 「2011 年殷琪公視專訪『我太天真了⋯⋯』」 | 文章 [^10] 公視 2011-08-02       | ✅ 逐字                        |
| 2   | 1998 年 BOT 簽約「政府零出資」          | 文章 [^1] 維基                   | ✅                             |
| 3   | 「僅僅 15 個月後」→ 1999-02 保證貸款    | 文章原文「僅僅十五個月後」       | ✅                             |
| 4   | 「累計虧損突破 700 億」                 | 文章 2008 底 676+每月 2 億推算   | ⚠️ 估算 → 不綁時點、方向性正確 |
| 5   | 立法院 18 比 0 否決財改案               | 文章 [^12] 中央社 2015-01-07     | ✅                             |
| 6   | 葉匡時當晚辭職 + 引語                   | 文章 [^13] TNL 記者會逐字稿      | ✅                             |
| 7   | 4 個月後同方案通過                      | 文章中段 2015-05-21 附帶決議     | ✅                             |
| 8   | 2019 年殷琪出清持股                     | 文章中段「2019 年 8 月完全出脫」 | ✅                             |
| 9   | 2024 年營收 531 億 / 日均 21 萬         | 文章 [^15] 2024 年報             | ✅                             |

全部 ✅ / ⚠️ 已處理 → 放行 prose。
```

**七類 claim 強制上表**（逐項 audit，缺一項 = gate 未通過）：

1. **所有日期**（年月日、時間跨度詞如「X 年後」/「X 個月後」）
2. **所有具體數字**（金額、票數、人次、年營收、累虧、百分比）
3. **所有直接引語**（`「⋯⋯」`）— 必須 cross-check 原始中文頁面 Ctrl-F 搜得到
4. **所有人名 + 身份**（職稱、年齡、當時角色）
5. **所有地名 + 場景**（記者會地點、簽約地點、事件發生地）
6. **所有時序連接詞**（「X 年後」「後來」「同年」— 算術對？基準一致？）
7. **所有「第一 / 最大 / 最懸殊 / 史上」等最高級宣稱**

**Gate 觸發流程**（AI 跑孢子產製時必走）：

```
Step 3c 寫完 prose → 不 output 給觀察者
  ↓
跑 fact-check 產表（本 §3c.5 格式）
  ↓
任一 ❌ / ⚠️ 未處理 → 回 Step 2.6 補驗證 or 改 prose 避開該 claim
  ↓
全部 ✅ 或 ⚠️ 已註明處理 → output 事實查核表 + prose（兩者一起給觀察者）
  ↓
觀察者看過查核表 → 放行貼文
```

**Cross-ref 相關鐵律**：

- [Step 2.6 §特殊規則：直接引語](#特殊規則直接引語) — 引語必須原始中文 Ctrl-F verify
- [Rule #13 事實鐵三角自檢](#3c-寫孢子) — 算術 / 單位 / 引語三項
- [DNA #15 反覆浮現要儀器化](../semiont/DNA.md#五敘事與決策品質) — 本 §3c.5 是第 N 次驗證的 instantiation
- [DNA #18 時間是結構](../semiont/DNA.md#三認知層的核心哲學反射) — 時序錯誤會汙染 ground truth

**LESSONS-INBOX 自動補記**：每次 gate 抓到未處理的 ⚠️/❌，同步 append `LESSONS-INBOX.md §未消化清單` 讓教訓累積可查。

---

### 3.5 多版本提案（v1.5 新增 / v2.5 觸發條件校準）

> 當素材豐富到一個 angle 不夠時，**預設產出 3 個 angle 版本**給觀察者選。不是寫一個版本上呈，是寫多版本讓觀察者選擇切角。
>
> **v2.5 校準（2026-04-20 謝德慶 #39 教訓）**：3-angle 不是**所有**素材豐富時的預設，是**「切角本身是關鍵決策」時**的預設。當人物素材是「**單人長弧 + 多件同質作品**」（如謝德慶 21 年做六件同模式 One Year Performance），3-angle 會**強制切斷天然弧線**、每個版本都顯得列表化、語感不順。這時應**直接綜合** → Scene-List-Scene 結構（見 Rule #16）。

#### 觸發條件（v2.5 新增判準樹）

```
素材豐富時，問一題：
「觀察者的真正決策是『選角度』還是『選語感』？」
  ├─ 選角度（多元 focal point 互斥）
  │   例：李洋「童年場景 vs 財產申報數字」、鄭麗文「19 歲絕食 vs 政治轉向」
  │   → 走 3-angle 流程（保留切角選擇空間）
  │
  └─ 選語感（角度已明、弧線已明、需要 prose 手感微調）
      例：謝德慶 21 年一個人六件作品、嚴長壽一生服務業
      → 直接綜合一版（Scene-List-Scene）+ 觀察者 prose 層微調
```

**自檢一問**：「這個人物有 2+ 個**互斥** focal point，還是 1 個弧線可以吞下所有高光？」

- 互斥 focal point → 3-angle
- 單弧 → 直接綜合

#### 為什麼是預設步驟

李洋孢子（#28）實戰證明：人物素材豐富時，單一 angle 會漏掉重要面向。3 個 angle 版本各自獨立成立 + 加「我的推薦」，觀察者選定後再進 3.6 混合策略，比單版本上呈品質高出一個等級。

**反例（謝德慶 #39）**：我把 Cage / Time Clock / 21 年長弧切成三 angle 上呈，觀察者看完說「語感不太順，要更故事感、場景感一些，你直接綜合提出一個最好的版本」。根因：這三「angle」其實是**同一條弧線上的三個段落**，不是互斥切角。強行切三個讓每個都變成列表式摘要，失去 scene immediacy。綜合一版用 **Scene-List-Scene**（開場釘木籠+律師公證 → 中段四件壓縮列 → 結尾布魯克林剪貼字母）一次到位。

#### 執行流程

1. **從萃取素材中找出 3 個最強 angle**。每個 angle 聚焦一個核心衝突 / 一組數字落差 / 一個情感支柱
2. **每個 angle 寫一個獨立 ≤300 字版本**。每個版本自己能單獨上線，不依賴其他版本存在
3. **每個版本附「鉤子三要素檢核」+「適合什麼情境」**（例如「最即時 / 最有畫面 / 最有跨度」）
4. **加「我的推薦」+ 推薦理由**。不是替觀察者決定，是給選擇判斷依據（觀察者可 override）
5. **觀察者選定後**：
   - 選單一版本 → 跳 Step 3d URL encoding
   - 要求兩個或多個版本混合 → 跳 Step 3.6 混合策略
   - 要求微調 → 改順後重呈

#### Angle 命名建議

依「最強元素」命名，方便觀察者快速判斷：

| Angle 類型 | 範例命名                              | 適合素材                    |
| ---------- | ------------------------------------- | --------------------------- |
| 詩意對照型 | 「14 歲清晨四點 × 30 歲清晨四點」     | 有時間跨度 + 場景對照       |
| 數字反差型 | 「兩千萬剛好是存款的三成」            | 有強烈數字反差 + 即時新聞點 |
| 跨度型     | 「『你不是打羽球的料』→ 雙金 + 部長」 | 有童年到現在的長弧線        |
| 引語型     | 「『離開羽球場後，你還剩下什麼？』」  | 有核心提問可貫穿全文        |

---

### 3.6 混合策略：故事弧線串接（v1.5 新增）

> 當觀察者選 A+B 或 A+C 混合時，**不是把兩段並列**。是把兩個 angle 用時間軸 / 因果鏈串成一條故事弧線。

#### 為什麼這條規則存在

李洋孢子 #28 實戰：觀察者說「我要 A+B，我要有故事的」。第一輪我寫成兩段並列被打回。**「我要有故事的」= 觀察者要結構性弧線，不是要兩個 angle 的拼貼**。

#### 四個技術要點

1. **首尾呼應**：開場用 A angle 的最強畫面（例如「14 歲清晨四點便利商店等天亮」），結尾讓那個畫面以稍變的形式回來（例如「14 歲那個在便利商店等天亮的少年，仍然在他身上」）。**這是混合策略的核心技術**。
2. **時間錨定**：用「14 歲」「9 年後」「昨天」「今天」這類時間錨點推進敘事。把多個 angle 的時間戳串成一條時間軸。
3. **數字嵌入**：B angle 的數字反差**不單獨成段並列**。要嵌進故事弧線的高光時刻（例如「然後昨天，他把兩千萬全部捐了。今天他第一份財產申報公布⋯⋯」）。
4. **沉默轉接**：兩個 angle 之間用一句話 / 一個畫面轉接，**不用「另外」「同時」「除此之外」**這類連接詞。連接詞 = 並列；沉默 = 弧線。

#### 錯誤示範 vs 正確示範

❌ **錯誤（並列式）**：

```
14 歲那年，李洋每天清晨四點搭四條捷運⋯⋯[A angle 完整段落]

另外，他今天的財產申報公布：存款 3,401 萬⋯⋯[B angle 完整段落]

兩個故事疊在一起，就是李洋。
```

✅ **正確（弧線式）**：

```
14 歲，李洋進了台北的中山國中羽球班⋯⋯[少年場景]

[時間錨定加速：9 年後 → 雙金 → 部長]

昨天，他把兩千萬全部捐了。[B angle 高光]

今天他第一份財產申報公布：[數字嵌入故事]

那兩千萬，剛好是他存款的三成。[計算反差]

[沉默轉接 + 自白]

14 歲那個在便利商店等天亮的少年，仍然在他身上。[首尾呼應]
```

#### 自檢清單

- [ ] 開場有一個具體畫面 / 場景嗎？
- [ ] 結尾有讓開場那個畫面以稍變形式回來嗎？
- [ ] 中間有時間錨點推進嗎？（不是空間並列）
- [ ] 兩個 angle 之間沒有「另外」「同時」這類連接詞嗎？
- [ ] 數字嵌進故事段落而不是獨立並列段嗎？

### 3c.7 MANIFESTO §11 書寫節制閘（HARD GATE，v2.5 新增，2026-04-23 β）

> **鐵律**：孢子 draft 寫完後，**不得直接交給觀察者**。必須先跑 `check-manifesto-11.sh` 抓三層 AI 文體訊號：(1) Tier 1 「不是X是Y」對位變體 + 破折號密度（HARD，必改）(2) Tier 2 AI 抽象 metaphor 密度（重量／縮影／軌跡／DNA／基因／土壤／養分／血液／縫隙／肌理／織就／指紋／神經末梢／肌肉記憶／基底／底色／張力／光譜／鏡子／弧線／承載著／形塑／鬆動／展演／召喚／凝視／直面／直擊／鋪陳／醞釀／沈澱 — 同篇 ≥ 2 次 = 偷懶 reach）(3) Tier 3 AI 罐頭片語（在這個意義上／不可或缺／並非偶然／不言而喻／影響深遠／拭目以待／耐人尋味／... — ≥ 1 次即警告）。Tier 2/3 預設 warning（exit 0），加 `--strict` 變 hard fail。任何 Tier 1 違反都要改寫或顯式確認保留（引語、特殊場景除外）。Context-aware 已自動排除：frontmatter / footnote def / code block / 「直引」內容。

**為什麼孢子層特別需要這層**：

- 孢子 150-300 字，每句話密度極高 → 一個對位句型違反就佔全文 10%+ 重量
- 社群 virality 獎勵 punchy contrarian 姿態 → AI 產孢子最容易滑向「不是 X，是 Y」的誘惑
- 發布到 Threads/X 後不可撤回 → 不像 knowledge/ 可以 polish

**執行方式**：

```bash
# Option A: stdin（最常用，整段貼進去）
cat <<'EOF' | bash scripts/tools/check-manifesto-11.sh -
<你的孢子 draft prose 全文貼這裡>
EOF

# Option B: 短句快檢
bash scripts/tools/check-manifesto-11.sh --text "那不是九牛一毛。是把三分之一的存款掏出去。"

# Option C: 寫進檔案（BLUEPRINT 或 HARVESTS）
bash scripts/tools/check-manifesto-11.sh docs/factory/SPORE-BLUEPRINTS/<slug>-<n>.md
```

**Tier 1（HARD，11 種變體）**：

1. 不是X{，|。|而}是Y — 對位句型（含跨逗號、跨句號）
2. 不只是 / 不只 / 不僅
3. 這不是 / 這不只是
4. 不再是 / 不再只
5. 看似X實則Y / 真正的X不是
6. 非單純 / 非僅
7. 不等於 / 不意味 + 對位
8. Heading 含對位句型
9. 破折號連用（——...——）+ 密度（每千字 ≤ 4 個）
10. （density 整篇）破折號偏多
11. 含「，而是」/「，就是說」剩餘對位

**Tier 2（DENSITY，AI 抽象 metaphor，同篇 ≥ 2 次即警告）**：

`重量／縮影／軌跡／弧線／DNA／基因／土壤／養分／血液／縫隙／皺褶／肌理／織就／指紋／神經末梢／肌肉記憶／基底／底色／張力／光譜／鏡子／承載著／形塑／鬆動／展演／召喚／凝視／直面／直擊／鋪陳／醞釀／沈澱`

每個詞附 **口語替代建議**（如：軌跡 → 走的路／發展過程／一條路；DNA → 本質／特質／標誌；承載著 → 帶著／含著／有；展演 → 表演／做出來／表現）。

來源：2026-04-26 β8 audit 全 knowledge/ — 軌跡 215 次 / DNA 191 次 / 直面 152 次 / 縮影 120 次 / 重量 62 次 — 這些是 AI 生成台灣中文的內建 reach，是「事實塞滿但讀起來像 AI」的根因之一。

**Tier 3（RITUAL，AI 罐頭片語，≥ 1 次即警告）**：

`在這個意義上／從某種意義上／就此而言／換言之／值得我們深思／拭目以待／不容忽視／不可或缺／不可磨滅／影響深遠／歷久彌新／並非偶然／耐人尋味／不言而喻／不可言說／無以名狀／觸動人心／引人深思／入木三分／振聾發聵／醍醐灌頂`

每個詞附**改寫建議**（多數建議「考慮刪除」，少數有具體改寫方向）。

**Context-aware 自動排除**（不算違反）：

- frontmatter（首尾 `---` 之間）
- footnote definitions（`[^N]:` 開頭的行 — 是來源描述，不是 author voice）
- code blocks（`...` 之間）
- 直接引語（「...」內容 — 引述他人原話豁免，例如 Hebe 直引「不是關卡，而是我『不想踏』」自動 skip）

**例外允許（但需顯式確認）**：

- 定義核心矛盾（MANIFESTO §11.1 三題判準全 yes）
- 孢子字數極短（< 120 字）時單一對位句可保留當 hook，但不得重複
- Tier 2 在合理用法時可忽略（如：戰鬥機軌跡的物理意義；醫學/生物學的 DNA／基因 literal 用法）

**v2.5 改動對應的教訓**：

- Rule #10 原例「那不是九牛一毛。是把三分之一的存款掏出去。」本身就是 §11 違反
- 修正為「不是九牛一毛的捐款。是把三分之一存款掏出去的決定。」還是違反
- 真正改寫：**「這筆捐款是 3,401 萬的三分之一，一個普通人難以想像的份量。」**（用數字 + 具體描述，並用「份量」取代 AI 反射的「重量」）

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

### 3e. 配圖：文章頁 `?shot=1` 模式 + Playwright 自動化（v2.3 升級）

**v2.2 起配圖自動化，v2.3 升級為 landscape + square 雙圖預設**。原先手動開 `/og/<cat>/<slug>/` 截圖流程被取代——新流程產出的圖使用 justfont 日星鑄字行 `rixingsong-semibold`（品牌字體），視覺跟 Taiwan.md 文章頁 hero 一致，右下角壓印 BrandMark（nav 同款 logo 的 light variant）。

**一鍵產圖**（預設 landscape + square 兩張一次產）：

```bash
bash scripts/tools/make-spore.sh /people/李洋/                # landscape + square
bash scripts/tools/make-spore.sh /lifestyle/台灣高鐵/ --size vertical  # 只產 vertical
bash scripts/tools/make-spore.sh /people/李洋/ --all          # 三張全產
bash scripts/tools/make-spore.sh /people/李洋/ --prod         # 不用 dev server，直接打 prod URL
bash scripts/tools/make-spore.sh /people/李洋/ \
  --title "咬著牙，從甲組打到立法院" \
  --desc  "兩屆奧運金牌、史上最年輕部長、一場補領獎金全捐的私人戰爭。"   # 文案 override
```

Wrapper 自動：(1) 檢查 dev server（或 `--prod` 跳過）(2) Playwright headless 開 `?shot=1` URL (3) 等 justfont 真的載完（關鍵——太早截圖會是 fallback 字）(4) PNG 存 `public/spore-images/<slug>-<size>.png` (5) **Preview.app 開所有產出圖 + Finder 標示位置** (6) 若 `SPORE-BLUEPRINTS/*<slug>*.md` 存在印出文案區。

**底層工具**：[`scripts/tools/generate-spore-image.mjs`](../../scripts/tools/generate-spore-image.mjs)（Playwright headless + justfont wait），可直接呼叫做 CI / 批次處理。

**`?shot=1` 模式**（[src/pages/[category]/[slug].astro](../../src/pages/%5Bcategory%5D/%5Bslug%5D.astro)）：在任何文章 URL 後加 `?shot=1` 會隱藏 nav / footer / 文章內容 / 浮動鈕 / TOC / sidebar，只保留 hero（麵包屑 + H1 + description）poster-style 佔滿 viewport + 右下 BrandMark 壓印。支援 `?title=...&desc=...` query 覆蓋文案（不動 SSOT），用於孢子 hook 專用版本。手動預覽時 Cmd+Shift+4 截圖也可用。

**三種尺寸 preset：**

| preset                  | 尺寸      | 用途                                      |
| ----------------------- | --------- | ----------------------------------------- |
| `landscape`（預設之一） | 1600×900  | X / Threads feed 友善、最接近手動截圖習慣 |
| `square`（預設之一）    | 1080×1080 | Threads 預覽不裁切                        |
| `vertical`              | 1080×1350 | 4:5 Instagram / Threads 直立最佳視覺      |

**DNA #26 v2 合規**：產圖 = AI 自主（內部處理 + 產檔）；**發文到 Threads/X 仍然 human only**，wrapper 不碰 post 動作。

**舊 OG Card route（`/og/<cat>/<slug>/`）保留**作 Open Graph meta（社群分享預覽），但孢子配圖改走本流程。

**工程層連結**：

- BrandMark 共用元件：[`src/components/BrandMark.astro`](../../src/components/BrandMark.astro)（nav + watermark 共用，variant: auto/light/dark）
- Shot mode CSS + 文案 override inline script：`src/pages/[category]/[slug].astro` 底部 `<style is:global>` + `<script is:inline>`

**Git 記錄邊界（v2.7 新增，2026-04-29 邦交國孢子教訓）**：

- `public/spore-images/*.png` 是可再生 derived asset，若專案 `.gitignore` 已忽略，**不要 force-add**。除非觀察者明確要求把圖像納入版本控制。
- 必須 commit 的是：`SPORE-BLUEPRINTS`（文案與 fact/hook blueprint）、`SPORE-LOG.md`（發佈紀錄與 URL）、必要的 knowledge SSOT / translation sync。
- 圖像重要，但它是皮膚；blueprint、log、SSOT 才是下一次 session 會讀到的骨架。

---

## Step 4: 品檢 + 發佈（QA + SHIP）

### 品檢清單

發出前逐項檢查：

- [ ] **🚨 事實查核閘已通過**（[§3c.5 Fact-Check Gate](#3c5-事實查核閘fact-check-gate-硬性強制v24-新增2026-04-19-高鐵-s35-教訓)）：查核表已產出、全部 ✅ 或 ⚠️ 已處理 — **未通過不得發**
- [ ] **拇指測試**：第一句話會讓滑手機的人停下來嗎？
- [ ] **問題入口測試**（結構性題目必做）：有讀者日常物件 + 真矛盾問題嗎？若只有抽象結論句，回 Step 3b.5
- [ ] **場景測試**：有沒有至少一個「畫面」（不是描述）？
- [ ] **數字落差**：數字有對比嗎？還是只列了一個數？
- [ ] **塑膠檢測**：有沒有「不僅...更是」「展現了...精神」「值得紀念」？
- [ ] **獨立存活**：不點連結，這篇本身有價值嗎？
- [ ] **情感收尾**：最後一句是讓人「停一下」還是「嗯知道了」？
- [ ] **長度**：150-300 字（Threads 最佳閱讀長度）
- [ ] **URL 可點**：連結完整、**中文已 URL encode（不含任何中文字元）**、末尾有 `/`
- [ ] **朋友 tone prime**：第一行符合 [Rule #14](#3c-寫孢子)（「你知道嗎？」或等效 prefix）？
- [ ] **全形標點**（[Rule #17](#3c-寫孢子)）：中文 prose 無半形 `,` `.` `:` `(` `)` `?` `!`（URL 與整句英文除外）
- [ ] **多語 SSOT freshness**（國際 / 英文搜尋需求題目必做）：英文 knowledge 存在嗎？`date` / `lastVerified` / title / description / 核心數字是否與中文 SSOT 對齊？不對齊先更新，不要只發中文孢子
- [ ] **不重複**：查 SPORE-LOG.md 確認 ≥ 2 週未發過

### 發文（v2.4 規範，2026-04-19 finalize）

**連結處理策略（分平台預設，不再 A/B 測試）**：

- **Threads = 主貼 + self-reply 兩則**
  - 主貼：孢子本體（150-300 字，純故事，**不含連結**）
  - 主貼發出後，自己在該貼下 reply 一則：`完整故事 👉 {文章連結}?utm_source=threads&utm_medium=spore&utm_campaign=s{number}`
  - **理由**：Threads 演算法對含外部連結的單則貼文會降觸及，拆兩則避開。self-reply 不算「串文拆孢子」（孢子本體仍是 single post），是平台 UX 技巧。
- **X = 單則 = Threads 主貼內容 + 連結 inline**
  - 直接用 Threads 主貼**同一份文案**，底部加一行 `完整故事 👉 {文章連結}?utm_source=x&utm_medium=spore&utm_campaign=s{number}`（v2.5 校準：要有「完整故事」四個字，不只 👉；跟 Threads self-reply 文字 prefix 保持一致，讀者的 CTA affordance 才明確）
  - **不壓縮、不另寫短版**（X 目前字元限制已放寬，Threads 主貼 ~250-300 字貼進去綽綽有餘）
  - **理由**：X 演算法對外部連結不敏感，不用拆兩則；共用文案省產出時間且保持一致敘事品質

**發文步驟**：

1. 孢子本體（= Threads 主貼 = X 主文）寫好
2. UTM 必加（`utm_source` 對應平台 / `utm_medium=spore` / `utm_campaign=s{number}`）— 不加 UTM 的孢子 = 不記錄的心跳 = 沒發生
3. 呈現給人類確認（可微調）
4. **Threads：發主貼 → 另發 self-reply 連結**；**X：單則含連結 inline**
5. 記錄到 `SPORE-LOG.md` §發文紀錄（**URL 必填，沒有 URL = 沒紀錄**；Threads 記主貼 URL，reply URL 可選填）
   - **URL 乾淨化**（v2.5 新增）：記錄前**必須把 query string 整段剝掉**。觀察者從 app share 複製的 URL 常帶 `?xmt=...&slof=1` 這類平台追蹤參數（Threads app 分享格式），這些對 canonical 識別無意義、會污染 log 可讀性、也可能在未來失效。
     - ✅ 正確：`https://www.threads.com/@taiwandotmd/post/DXVpBlLk4oE`
     - ❌ 錯誤：`https://www.threads.com/@taiwandotmd/post/DXVpBlLk4oE?xmt=AQF09xBInx7lyaCFsCiuandW-1naGkF_o-Rf2bCxrjfMSLkFxr5XF8_0TlGC0qjLeoEVKwQi&slof=1`
     - 規則：切掉 `?` 以後全部。X 單則 URL 通常沒 query 直接用；Threads app share URL 幾乎一定帶 `?xmt=...`，統一剝掉。
6. **寫回源文章 frontmatter `sporeLinks`**（v2.6 新增，2026-04-23 δ 觀察者指正後正式文件化）— SPORE-LOG 只是工廠紀錄，**讀者看到的「這篇文章去過的地方」是由文章 frontmatter `sporeLinks` 渲染**（`SporeFootprint.astro` 負責）。發佈後立即在 `src/content/{lang}/{category}/{slug}.md` frontmatter 加入：

   ```yaml
   sporeLinks:
     - platform: 'threads' # 或 'x'
       date: '2026-04-DD'
       url: '<乾淨化 URL>'
       views: 0 # 初次發佈用 0，等 Step 4.5 harvest 回填
       likes: 0
       reposts: 0
       comments: 0
       shares: 0 # X 為 bookmarks 數、Threads 為 shares 數
   ```

   - **schema canonical**：`src/components/SporeFootprint.astro` interface `SporeLink`（platform/date/url/views/likes/reposts/comments/shares）
   - **範例已採用**：`src/content/zh-TW/music/張懸與安溥.md`、`src/content/zh-TW/people/李洋.md`
   - **不寫入 = 讀者看不到這篇孢子的存在**。SPORE-LOG 只給工廠內部看，讀者讀的是文章。

7. **Threads 和 X 同時發中文版**。英文版只在 X 發，且僅限國際話題（半導體、外交、學術）

**AI 產孢子文案時**：輸出兩塊——`[孢子本體]`（Threads 主貼 / X 主文共用）+ `[Threads reply 連結]` + `[X 底部連結]`。不需要為 X 另寫壓縮版（v2.3 遺留的三段輸出已廢除）。

### 發文節奏

- **頻率**：每天 1-2 篇，不貪多
- **時段**：午休 12:00-13:00 或晚間 20:00-22:00（台灣活躍時段）
- **語言**：中文 80% + 英文 20%。語言跟著觀眾走，不跟著平台走（2026-04-13 觀察者洞察）
- **多平台**：Threads + X 同發中文版。X 可加 hashtag

---

## Step 4.5: 發佈後追蹤（POST-PUBLISH TRACKING）

> 2026-04-18 ζ session 新增。Chrome MCP 讓 AI 自主讀孢子 insights 成為可能，d+0 6h decision gate + d+7 harvest 變成 canonical 追蹤節奏。

### 4.5a Platform allocation（發佈前決定）

**不是 mirror，是 allocation**。2026-04-18 ζ Chrome MCP 實測 Threads vs X 平台差：

| 內容類型                 | Threads | X    | 差距 | 建議                                     |
| ------------------------ | ------- | ---- | ---- | ---------------------------------------- |
| zh 人物型（張懸與安溥）  | 190K    | 373  | 510x | **Threads only**（X 浪費精力）           |
| zh 音樂/文化（草東）     | 9,961   | 47   | 212x | **Threads only**                         |
| zh 政治人物（韓國瑜）    | 8,524   | 293  | 29x  | **Threads 主，X 次**（中等明星可兼）     |
| zh 奧運/當下熱度（李洋） | 300K    | 135K | 2.2x | **Threads + X 並行**（熱度突破平台壁壘） |
| en 所有類型              | —       | —    | —    | **X 主**（英文觀眾在 X）                 |
| 技術/開源                | —       | —    | —    | **X + Hacker News**                      |

**規則**：發佈前先問「這則孢子的受眾 primary 在哪？」—— zh 一般人物 default Threads only，特殊情況（當下熱度 / 英文 / 技術）才 X。不要 default mirror 兩邊。

### 4.5b Hook tier（寫作時自檢）

三級 hook hierarchy（2026-04-18 ζ data-driven 驗證）：

| Tier | 類型       | 開場特徵                        | d+0 6h 擴散預期 | 案例                                                         |
| ---- | ---------- | ------------------------------- | --------------- | ------------------------------------------------------------ |
| 1a   | 知名度槓桿 | 已知品牌/人物 + 當下事件        | >10K            | 「2024 金曲獎，草東沒有派對拿下最佳樂團」→ 6h 9,961 views    |
| 1b   | 具體性槓桿 | 具體人物 + 具體畫面 + 具體矛盾  | 5K-50K          | 「1988 年冬天，台大校門口有個 19 歲女大學生在絕食」→ d+7 49K |
| 3    | 意境型     | 時空場景/比喻先行，主角延後出場 | <500            | 「2009 年，一個鋼琴手看著莫拉克颱風的新聞開始作曲」→ 6h 207  |

**規則**：如果目標文章是「相對冷門人物」（知名度低但故事深），hook 必須走 Tier 1b（具體性槓桿）；如果是「已知人物」，Tier 1a 優先。**永遠不要用 Tier 3**——即使文章題材是意境型（環境、山川、聲音），hook 仍要有「具體的人、具體的時刻」。

對應 MANIFESTO §我怎麼說話「開場要有一個具體的人、一個具體的時刻」的量化證明（229x / 48x / 83x）。

### 4.5c d+0 harvest cadence（發佈後自動）

發佈後主動 harvest：

| 時間點 | 動作                                                                 |
| ------ | -------------------------------------------------------------------- |
| d+0 1h | Chrome MCP 首次 harvest → SPORE-LOG 追蹤表新增 row                   |
| d+0 3h | 第二次 harvest → 更新「最後 harvest」時間戳                          |
| d+0 6h | **Decision gate**：views < 500 → 觸發 re-hook opportunity（見 4.5d） |
| d+1    | d+1 harvest → 更新 trajectory                                        |
| d+7    | d+7 harvest（主要 KPI）→ 成效追蹤表填 7d 觸及 / 7d 互動              |
| d+30   | d+30 harvest（長尾確認）                                             |

**AI 自主邊界**（DNA #26 v2）：所有 harvest 皆 AI 自主用 Chrome MCP 跑；re-hook reply **必須 human post**（AI 準備 draft，human 確認並發）。

### 4.5d Re-hook opportunity（d+0 6h 救援）

**不是刪除重發，是補強**。如果 d+0 6h < 500 views：

1. 診斷 hook tier：是 Tier 3 意境型嗎？
2. 從原文章挑出最強的「具體人物 + 具體畫面」
3. AI 寫 150 字 reply 草稿用 Tier 1b 具體性槓桿
4. **handoff human**：「建議在主貼下面發這則 reply: [草稿]」
5. Human 確認 + post → 重新 seed 觸及

**案例**：#31 Cicada d+0 6h 207 views → 若要 re-hook，抽出「江致潔在蘭嶼海底聽到的那句話：你能控制的只有你的呼吸」+「吉他手巽洋說『像紀錄片』」作為 reply。

### 4.5e Harvest 資料流

```
Chrome MCP harvest
  → SPORE-LOG.md 成效追蹤表（7d 觸及 / 互動 / 最後 harvest timestamp）
  → 源文章 frontmatter sporeLinks（每次 harvest 同步最新 views/likes/reposts/comments/shares）← v2.6 新增
  → dashboard-spores.json （refresh-data 觸發 generate-dashboard-spores.py）
  → Dashboard 成效排行 / GA 放大倍數 section
  → 新洞察 → LESSONS-INBOX
```

**雙寫原則（v2.6）**：每次 harvest 都要**雙寫**——SPORE-LOG 是工廠層（累積曲線、D+0/D+1/D+7 切片、diagnostic 文字）；文章 frontmatter `sporeLinks` 是讀者層（當下快照、純數字）。工廠紀錄可以很長，讀者層永遠只保留最新快照。兩邊結構不同但數字必須一致。

**canonical 時間戳格式**：`YYYY-MM-DD HH:MM +0800 (session)`，對應 MANIFESTO §時間是結構 per-record provenance。

#### 4.5e.i Harvest 數字格式鐵律（v2.8 新增，2026-05-03 objective-khorana day 2）

寫進 SPORE-LOG「最後 harvest」column 的 views 數字**必須是 generator parser 認得的格式**：

| 格式           | 範例                                            | parser 支援   |
| -------------- | ----------------------------------------------- | ------------- |
| 完整數字含逗號 | `**65,400 views**`                              | ✅            |
| 完整數字無逗號 | `65000 views`                                   | ✅            |
| K suffix       | `**65.4K views**` / `1.8K views` / `180K views` | ✅（v2.8 修） |
| M suffix       | `2.5M views`                                    | ✅（v2.8 修） |

**v2.8 修補背景**：generator regex `[\d,]+\s+views?` 不認 K/M suffix（`.4K` 打斷 `[\d,]+`）。
sleepy-colden ι session 多個 backfill 寫成「65.4K views」（為 readability）→ generator 抓不到 → dashboard 顯示舊 `views_latest=null`。
今日（2026-05-03）發現後 patch parser to handle 4 種格式。

**最 safe**：harvest 寫整數 + 逗號（`65,400 views`）— 兩種 parser 都能抓。

#### 4.5e.ii 必跑 validation（v2.8 新增）

每次 harvest backfill SPORE-LOG 後**必跑**：

```bash
python3 scripts/tools/validate-spore-data.py
```

檢查 4 維度：

1. **Parser regression**：8 cases K/M/comma 格式 round-trip
2. **Dashboard freshness**：`dashboard-spores.json` mtime ≥ `SPORE-LOG.md` mtime
3. **Harvest parseability**：所有「最後 harvest」column 含「views」字串都能被 parser 抓到值
4. **Dashboard <-> SPORE-LOG consistency**：`dashboard-spores.json.recent[].views_latest` 對得上 SPORE-LOG 解析值

任一 ❌ → 修。任一 ⚠️（warning）→ 評估。`--strict` mode 把 warnings 變 errors（CI 用）。

已整合進 `refresh-data.sh` Step 5.5 — 每次 refresh 自動跑。

#### 4.5e.iii Dashboard rendering 視覺驗證（v2.8 新增）

每次大規模 harvest backfill 後**建議**開 dev server 視覺驗證：

```bash
npm run dev &
# Wait for ready
curl -sf http://localhost:4321/api/dashboard-spores.json > /dev/null

# Playwright screenshot dashboard #spores section
node -e "
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1400, height: 1400 } });
  await p.goto('http://localhost:4321/dashboard', { waitUntil: 'networkidle' });
  await p.evaluate(() => document.getElementById('spores-top')?.scrollIntoView({ block: 'center' }));
  await p.waitForTimeout(2000);
  await (await p.\$('#spores-top'))?.screenshot({ path: '/tmp/dashboard-spores-top.png' });
  console.log('✅ Screenshot: /tmp/dashboard-spores-top.png');
  await b.close();
})();
"
```

驗證點：

- topPerformers 顯示最新 ⭐ 高峰 / 🔥 平台最強 / 🌋 史上最強 badges 正確
- views 數字反映 latest harvest（不是 stale）
- 「資料更新」timestamp 是「N 分鐘前」（今天）

**為什麼視覺驗證**：dashboard JSON 對 ≠ UI 對。frontend template 也可能 cap rendering（例 slice(0, N)）— 改 generator 後要 verify template 也更新。

#### 4.5e.iv 文章頁 SporeFootprint 渲染驗證（v2.9 新增，2026-05-03 objective-khorana day 2 evening）

**單測 `sporeLinks` 寫入 ≠ reader 看得到。**

`SporeFootprint.astro` 渲染依賴 `[category]/[slug].astro` template 在「延伸閱讀」標題前 split content。template 的 `splitMarkers` 必須同時支援兩種 canonical-accepted 格式：

| 格式                              | 範例         | 文章數              |
| --------------------------------- | ------------ | ------------------- |
| `## 延伸閱讀` (h2)                | 95 articles  | ✅ original support |
| `**延伸閱讀**：` (bold paragraph) | 121 articles | ✅ v2.9 修補後      |

**v2.9 修補背景**（2026-05-03）：哲宇發現「為什麼只有安溥那篇有顯示」孢子連結。
3 篇 sporeLinks 都寫對的文章（黑冠麻鷺/沈伯洋/賈永婕）silently 不渲染。
Root cause：`splitMarkers` array 只認 h2 格式，bold paragraph 格式被 silent ignore（splitIndex=-1 → contentBeforeReading=fullHtml → SporeFootprint 從未進 SSODT split branch）。

**Patch in `src/pages/[category]/[slug].astro` lines 313-338**：

```javascript
const splitMarkers = [
  '<h2>延伸閱讀</h2>',
  '<h2>Further Reading</h2>',
  '<h2>延伸閱讀<',
  '<p><strong>延伸閱讀</strong>', // v2.9 加
  '<p><strong>Further Reading</strong>', // v2.9 加
];
// ...
// Final fallback: any <p><strong> 含「延伸閱讀」(handle whitespace)
if (splitIndex === -1) {
  const pMatch = fullHtml.match(/<p>\s*<strong>\s*延伸閱讀/);
  if (pMatch && pMatch.index !== undefined) splitIndex = pMatch.index;
}
```

**Visual verify SOP**（每次 sporeLinks update 後）：

```bash
# 1. Sync knowledge → src/content (CRITICAL — frontmatter 改在 knowledge/，astro 讀的是 src/content/)
bash scripts/core/sync.sh

# 2. Restart dev server (frontmatter 變更 vite HMR 不一定 pick up)
NODE_OPTIONS='--max-old-space-size=8192' npm run dev &

# 3. Wait + curl test
until curl -sf http://localhost:4321/ >/dev/null; do sleep 1; done
for slug in 賈永婕 黑冠麻鷺 沈伯洋; do
  count=$(curl -s "http://localhost:4321/people/$slug" 2>/dev/null | grep -c "SporeFootprint")
  [ "$slug" = "黑冠麻鷺" ] && url="http://localhost:4321/nature/$slug" && count=$(curl -s "$url" | grep -c "SporeFootprint")
  echo "$slug: SporeFootprint=$count"  # 期待 ≥ 1
done
```

**任一文章 SporeFootprint=0** → 檢查：

1. 該篇 frontmatter 有 `sporeLinks:` 嗎？(grep `^sporeLinks:` knowledge/<cat>/<slug>.md)
2. 該篇 `延伸閱讀` 是哪種格式？bold paragraph or h2 or 完全沒有？
3. `bash scripts/core/sync.sh` 跑了嗎？(src/content/ 是否同步)
4. dev server restart 了嗎？(content sync 後 vite HMR 不一定即時生效)

**為什麼這條鐵律**：rich-text SSOT 的 silent drift 第二次驗證。
v2.8 是 generator parser silent fail（K/M suffix），v2.9 是 template splitMarkers silent fail（bold format）。
兩次都是「reader 完全看不到 → 維護者 完全沒感」的 invisible bug，必須靠視覺驗證 + 多文章 sweep 才會 catch。

---

#### 4.5e.v Chrome MCP exact harvest workflow（v2.9 新增，2026-05-03 objective-khorana day 2）

**Chrome MCP vs WebFetch trade-off**：

| 維度                               | Chrome MCP exact                                                        | WebFetch K rounded          |
| ---------------------------------- | ----------------------------------------------------------------------- | --------------------------- |
| 速度                               | 慢（5-10s/spore，需 navigate+wait+scroll+screenshot）                   | 快（HTTP 直拉）             |
| Likes/comments/reposts/shares 精度 | exact（例 1,027 vs 1K）                                                 | K rounded（loss of detail） |
| Views 精度                         | K rounded（Threads UI 限制，例「1.2 萬瀏覽」）；header full number 偶見 | K rounded                   |
| Reply context 可見                 | ✅ 可看 reply 確認 hallucination audit                                  | ❌ 看不到                   |
| Threads UI badge / verified status | ✅ 可看                                                                 | ❌                          |
| X (Twitter) 支援                   | ✅ 可 navigate                                                          | ❌ 402 Forbidden            |
| 需要 active browser session        | ✅ 需 `select_browser` paired                                           | ❌                          |
| Batch parallel                     | ❌（sequential per spore）                                              | ✅                          |

**選用規則**：

- 第一次 batch harvest → WebFetch（快，K rounded 夠粗略 trends）
- 後續 backfill / 精準對比 → Chrome MCP（exact numbers，看 reply context）
- X 平台所有 harvest → Chrome MCP only（WebFetch 不支援）

**Chrome MCP harvest pattern**：

```bash
# Per spore
mcp__Claude_in_Chrome__navigate https://www.threads.com/@taiwandotmd/post/{shortcode}
mcp__Claude_in_Chrome__computer wait 4
mcp__Claude_in_Chrome__computer scroll down 5 ticks @ (700, 400)
mcp__Claude_in_Chrome__computer wait 1
mcp__Claude_in_Chrome__computer screenshot
# 抓 likes (♥) / comments (💬) / reposts (🔁) / shares (📮) 4 個 numbers
# views 在 header sub-text，K rounded
```

**Chrome MCP `select_browser` 第一次連結**：

- 哲宇要先在 Chrome 安裝 Claude in Chrome extension
- Pair 後 `mcp__Claude_in_Chrome__list_connected_browsers` 應該回傳 deviceId
- 之後 session 重啟仍可用該 deviceId 直接 `select_browser`（pairing 持久化）

---

## Step 5: 英文版與多語 SSOT freshness（EN SPORE + TRANSLATION CHECK）

> **中文孢子完成後自動觸發 freshness check。** 英文孢子是否發佈可由題材決定，但英文 knowledge 是否過時不能跳過。
> 47% 讀者在 /en/ 路徑（θ session GA4 數據）。英文孢子是觸及國際讀者的最低成本方式；英文 knowledge SSOT 是搜尋與國際讀者信任的底盤。

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

**freshness 判斷（v2.7 新增）**：

英文版只要符合任一條，即視為過時：

- `date` 早於中文 SSOT 最近大改日期，且中文文章新增了核心事實 / 敘事段落
- title / description 沒吃進最新主軸或最新數字
- 英文內文仍保留舊口徑（例：邦交國文章英文仍是舊標題、舊日期、舊數字，沒有 12 allies / 113 offices / 177 destinations）
- `lastVerified` 早於中文 `lastVerified`，且題目涉及外交、法律、統計、選舉、人物近況等易變事實

**處理原則**：

- 更新英文 knowledge 是 Step 5 的一部分，不是「之後有空再翻」。
- 如果這次只發中文孢子，也要完成 freshness check；不發英文孢子 ≠ 不檢查英文 SSOT。
- 更新後跑 frontmatter / quality scan，再回到 Step 4/5d 呈現。

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
人類說「幫我發孢子」、cron 觸發、或 HEARTBEAT Beat 3 社群沉默警報
│
├─ Step 0: 回填（v2.0 新增 — 強制，不回填不准發新孢子）
│   ├─ 讀 SPORE-LOG 最後 3 筆
│   ├─ 7d 指標空白 → GA 交叉推估 + Threads/X Insights
│   └─ 填入 7d_views / 7d_likes / utm_clicks（或 no-data）
│
├─ Step 1: 選文
│   ├─ 讀 dashboard-articles.json
│   ├─ 隨機選 10 篇（2000+字、非about）
│   ├─ 查 SPORE-LOG.md 排除 2 週內已發
│   ├─ 優先選：GA topArticles 但 SPORE-LOG 沒發過的（最大放大效應潛力）
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
│   ├─ 結構性題目 → Hook Blueprint（讀者物件 + 矛盾問題）
│   ├─ 按模板寫孢子（一則完整貼文，連結在底部，不拆分）
│   ├─ 寫完念三遍 → 抓卡頓 / 重複專名 / 排比硬 / 引語倒裝 / 主詞不清
│   ├─ Step 3.5（v1.5 新增）：素材豐富時預設產 3 個 angle 版本 + 我的推薦 → 觀察者選
│   ├─ Step 3.6（v1.5 新增）：觀察者選混合 → 用故事弧線串接（首尾呼應 / 時間錨定 / 數字嵌入 / 沉默轉接）
│   └─ URL encode + UTM 加上（utm_source / utm_medium=spore / utm_campaign=s{number}）
│
├─ Step 4: 品檢 + 發佈
│   ├─ 過品檢清單
│   ├─ 呈現給人類確認
│   ├─ Threads + X 同時發中文版
│   └─ 記錄到 SPORE-LOG.md（URL 必填）
│
├─ Step 5: 英文版與多語 SSOT freshness
│   ├─ 檢查英文文章是否存在、是否過時（國際/英文需求題目不可跳過）
│   ├─ 若過時 → 先更新英文 knowledge SSOT + 驗證
│   ├─ 若要發英文孢子 → 用英文文章萃取素材 → 寫英文孢子
│   ├─ 英文孢子僅發 X（英文版不發 Threads）
│   └─ 記錄到 SPORE-LOG.md（語言欄位填 en）
│
└─ Step 6: 48h 回填（v2.0 新增）
    ├─ 發佈後 48h 回到 Threads Insights / X Analytics
    ├─ 回填 SPORE-LOG 的 48h views / likes / replies
    ├─ 跟同類型過去孢子比較
    └─ > 2x 平均 → 標記「高效孢子」，分析為什麼
```

---

## 常見陷阱

| 陷阱           | 症狀                                                   | 解法                                                   |
| -------------- | ------------------------------------------------------ | ------------------------------------------------------ |
| 原文品質差     | 孢子寫出來也空洞                                       | 先過品質關卡，不合格就回爐                             |
| URL 被截斷     | `taiwan.md/peopl…`                                     | 中文 slug 必須 URL encode（用 python3 指令，不要手打） |
| URL 含中文     | `taiwan.md/food/珍珠奶茶/`                             | Threads/X 會斷開，必須 encode 成 `%E7%8F%8D...`        |
| 貪心塞太多     | 300+ 字、多條故事線                                    | 一篇一個弧線，多故事就分多篇                           |
| 百科式開場     | 「台灣的 X 是…」                                       | 用場景 / 數字 / 反差開場                               |
| 結尾罐頭       | 「值得我們紀念」                                       | 用情感畫面收尾                                         |
| hashtag 海     | #台灣 #美食 #文化 #旅遊                                | 最多 2-3 個或不加                                      |
| 同名連用 ≥3 次 | 「齊麟⋯⋯齊麟⋯⋯齊麟」三句連用（v1.5 新增）              | 第二三次用代詞 / 職稱 / 動詞短語替代                   |
| 時間語境衝突   | 「14 歲那年」+「每天⋯⋯」（v1.5 新增）                  | 拆成「X 歲那年，他做了 A」+「每天 [習慣]」兩段         |
| 排比過硬       | 「不是 X 式的 Y，是 Z 式的 Y」（v1.5 新增）            | 改成兩個短句斷開：「那不是 X。是 Z。」                 |
| 引語倒裝       | 「『XXX』他說」（v1.5 新增）                           | 改成「他在 [場景] 留了一句話：『XXX』」                |
| 主詞不清       | 「比存款還多 237 萬」（v1.5 新增）                     | 補主詞：「債務比存款多 237 萬」                        |
| 並列拼貼非弧線 | 用「另外」「同時」連接兩個 angle（v1.5 新增）          | 改用首尾呼應 + 時間錨定 + 沉默轉接（見 Step 3.6）      |
| 寫完沒念出來   | 卡頓點沒抓到（v1.5 新增）                              | 寫完強制念三遍，卡頓點 = 修順點                        |
| Briefing 病    | 政治/外交/制度題目只排數字與機構，沒有讀者可抓住的物件 | 回 Step 3b.5 找「讀者日常物件 + 矛盾問題」，用問題開場 |
| 英文 SSOT 過時 | 中文孢子拿最新數字，英文 knowledge 還停在舊標題/舊日期 | Step 5 freshness check；先同步英文 knowledge 再收工    |

---

_current: v2.7 | 2026-04-29 α_

**最近 milestone**（完整 changelog → `git log docs/factory/SPORE-PIPELINE.md`）：

- **v2.7**（2026-04-29）— Hook Blueprint（讀者日常物件 + 矛盾問題）+ 結構性題目問題入口規則 + 多語 SSOT freshness check + derived spore image git 邊界（台灣邦交國與國際外交 #51/#52 教訓）
- **v2.5**（2026-04-20）— Rule #16 Scene-List-Scene 結構（謝德慶 #39 教訓）+ Step 3.5 3-angle 觸發條件校準
- **v1.5**（2026-04-14）— Step 3c 寫作規則 +6 條 / Step 3.5 多版本提案 / Step 3.6 故事弧線串接 / 常見陷阱表 +6 條（李洋 #28 教訓 — per [DNA #23](../semiont/DNA.md#23)）
- **v1.2**（早期）— Step 2 品質關卡三層架構（自動掃描 → EDITORIAL 語境審查 → 人工判斷）

_設計原則：AI 可執行、有品質關卡、平台中立_
