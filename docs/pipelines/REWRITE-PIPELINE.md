---
title: 'REWRITE-PIPELINE'
description: '文章改寫主流程 canonical — 6 stage 線性 (Stage 0 觀點 + 1-5 取材/寫/驗/形/連) / 模式判定在 Stage 0 內部分支 / Step N.M 編號 / heading 階層 H1-H4 / 翻譯收斂為 pointer 到巴別塔 (v6.0)'
type: 'pipeline-canonical'
status: 'canonical'
current_version: 'v6.0'
last_updated: 2026-05-11
last_session: 'admiring-montalcini-ec53b4-stage0-viewpoint'
plugin_check: 'python3 scripts/tools/article-health.py {file} --profile=rewrite-stage-4'
sister_docs:
  - 'EVOLVE-PIPELINE.md'
  - 'FACTCHECK-PIPELINE.md'
  - 'TRANSLATION-PIPELINE.md'
  - 'SQUEEZE-MODELS-MAX-PIPELINE.md'
  - 'PEER-INGESTION-PIPELINE.md'
  - 'MEMORY-PIPELINE.md'
  - 'DIARY-PIPELINE.md'
upstream_canonical:
  - '../semiont/MANIFESTO.md'
  - '../semiont/DNA.md'
  - '../editorial/EDITORIAL.md'
---

# REWRITE-PIPELINE.md — 文章改寫主流程 v6.0

> **第一性原理**：所有文章都走同一條 6-stage pipeline，每篇都跑過。模式判定 + 編輯前思考收斂在 **Stage 0 觀點**（Step 0.1-0.6），Stage 1 變純取材，Stage 2-5 完全 mode-agnostic。
>
> **翻譯不在本 pipeline scope** — 本 pipeline 100% 預算給中文版產出。多語版本由獨立的[巴別塔 pipeline](SQUEEZE-MODELS-MAX-PIPELINE.md) 負責。
>
> **v6.0 新增 Stage 0 觀點**（2026-05-11 admiring-montalcini）：在搜尋之前先以總編輯視角想清楚「對台灣人是什麼樣的記憶 / 多元面貌 / 想法感受 / 歷史脈絡 / 社會關聯 / 類型專屬問題」六個核心問題，產出 §觀點成型 落 research report。原 Stage 1 模式判定 + 萃取舊素材 + 載入方法論（Step 1.1-1.5）移到 Stage 0，原 Stage 1 Step 1.6-1.14 重編為 1.1-1.9。**翻轉 AI 寫作標準失敗模式**：從「搜尋發現事實 → 補丁觀點」變「先想觀點 → 帶問題去搜尋」。觸發：哲宇 2026-05-11 callout「重點在溫度 / 人味 / 故事 / 策展 / 觀點 / 體驗 / 與社會歷史環境跟我們人生的關聯」。
>
> v5.0 設計理由：[reports/rewrite-pipeline-v5-stage-spine-design-2026-05-11.md](../../reports/rewrite-pipeline-v5-stage-spine-design-2026-05-11.md)。

---

## 🗺️ ASCII spine

```
╭──────────────────────────────────────────────────────────────────────────╮
│              REWRITE-PIPELINE 6 階段 — 每篇都跑同一條                    │
│                                                                          │
│   Stage 0: 觀點 ─→ 6 steps（編輯前思考 + 模式判定）⭐ v6.0 新增          │
│            ├── Step 0.1 模式識別 [Fresh/Evolution/Merge/Boundary]        │
│            ├── Step 0.2 既有素材萃取（EVOLVE only）                       │
│            ├── Step 0.3 選 canonical（Merge variant only）                │
│            ├── Step 0.4 範圍切片表（Boundary variant only）               │
│            ├── Step 0.5 載入研究方法論 + 模板                             │
│            └── Step 0.6 觀點成型 🎬 (HARD GATE)                          │
│              ↳ Hard gate: §觀點成型落檔 + viewpoint_formed: true         │
│                                                                          │
│   Stage 1: 取材 ─→ 9 steps（純搜尋，帶 Stage 0 問題去驗證）              │
│            ├── Step 1.1 搜尋深度 ≥ 40                                    │
│            ├── Step 1.2 結尾素材鎖定                                      │
│            ├── Step 1.3 重複偵測                                          │
│            ├── Step 1.4 找矛盾鎖定（收斂 Stage 0.6 核心矛盾候選）         │
│            ├── Step 1.5 問觀察者要一手素材                                │
│            ├── Step 1.6 私有 SSOT 觀察者拍板（條件式）                    │
│            ├── Step 1.7 研究報告必存                                      │
│            ├── Step 1.8 Spawn agent 選型                                  │
│            └── Step 1.9 媒體素材研究 🎬 (HARD GATE)                      │
│              ↳ Hard gate: 報告落檔 / 媒體三表                            │
│                                                                          │
│   Stage 2: 寫 ──→ 8 steps                                                │
│            ├── Step 2.1-2.6 結尾先行 → 開場 → 小標題 → 正文 → 延伸      │
│            ├── Step 2.7 7 條自檢（含 Title 三明治 🥪 + 媒體 spine 🎬）  │
│            └── Step 2.8 富文本 + footnote 密度                           │
│              ↳ Hard gate: 10 條                                          │
│                                                                          │
│   Stage 3: 驗 ──→ 5 steps                                                │
│            ├── Step 3.1-3.4 塑膠 / 鐵三角 / FACTCHECK / story atom       │
│            └── Step 3.5 Title+desc spine sync re-check 🥪                │
│              ↳ Hard gate: 0 dead-link / spine 同步                       │
│                                                                          │
│   Stage 4: 形 ──→ 3 steps（含 6 個媒體子點）                             │
│            ├── Step 4.1 article-health 7 維度                            │
│            ├── Step 4.2 多語 visual smoke                                │
│            └── Step 4.3 媒體插入（6 sub-step）                           │
│              ↳ Hard gate: hard=0 / image-health pass                     │
│                                                                          │
│   Stage 5: 連 ──→ 4 steps                                                │
│            ├── Step 5.1-5.3 掃描 / 雙向 / Sibling 預檢                   │
│            └── Step 5.4 (Merge variant only) Astro redirect 5 lang       │
│              ↳ Hard gate: format-structure / build verify                │
│                                                                          │
│   ✅ Article shipped (zh-TW canonical)                                   │
│                                                                          │
│   ──── 翻譯（跨 pipeline boundary，主權的巴別塔）────                    │
│   → SQUEEZE-MODELS-MAX-PIPELINE.md（多語 batch sync 主流程）             │
│   → TRANSLATION-PIPELINE.md（單篇翻譯）                                  │
╰──────────────────────────────────────────────────────────────────────────╯
```

---

## 為什麼 Pipeline 存在

**診斷（實戰觀察）**：

1. **Token 耗盡** → 後半段變草稿
2. **沒有中間 checkpoint** → 品質無聲下滑
3. **結尾最後寫** → 精力不夠，結尾變罐頭（峰終定律）
4. **富文本被遺忘** → EDITORIAL 規範到後面沒人記得
5. **模式混淆** → 不同切入方式應該是同一條 pipeline 的不同 entry point，不該被當成獨立 pipeline
6. **觀點補丁化**（v6.0 新增）→ 搜尋發現事實 → 再臨時想觀點 → 編年體 / 密度失衡 / 結尾罐頭

**解法**：六階段分離 + **Stage 0 編輯前思考** + 結尾先行 + 後半段品質鎖 + Stage 2-5 統一不分模式。翻譯獨立到巴別塔 pipeline。

---

## 🚦 Hard Gate Inventory（一張表 audit 全 pipeline）

| Gate                       | 觸發 stage | 條件                          | 工具                                                                                 | 不過 = ?         |
| -------------------------- | ---------- | ----------------------------- | ------------------------------------------------------------------------------------ | ---------------- |
| **§觀點成型落檔**          | Stage 0 終 | depth article                 | manual: grep `## 觀點成型` in research report + frontmatter `viewpoint_formed: true` | **不進 Stage 1** |
| 核心矛盾鎖                 | Stage 1 終 | 所有 depth                    | research report frontmatter manual                                                   | 不進 Stage 2     |
| 研究報告落檔               | Stage 1 終 | depth ≥ 2000 字               | manual ls + frontmatter `researchReport`                                             | 不進 Stage 2     |
| 媒體授權矩陣三表           | Stage 1 終 | 所有 article（**含 EVOLVE**） | manual append research 檔末尾 + ls public/article-images/{cat}/                      | 不進 Stage 2     |
| 五指 + 結構 + 塑膠 + 算術  | Stage 3    | 所有 article                  | quality-scan + manual                                                                | 不 commit        |
| 事實鐵三角(算術/單位/引語) | Stage 3    | 含金額/數字/引語              | python algebra + Ctrl-F                                                              | 不 commit        |
| FACTCHECK Quick/Full Mode  | Stage 3    | 所有 article / A 級           | FACTCHECK-PIPELINE                                                                   | 不進 Stage 4     |
| **Title+desc spine sync**  | Stage 3    | **所有 article（含 EVOLVE）** | manual: title 冒號三明治 + desc 吃進核心矛盾                                         | 不 commit        |
| Format check 7 維度        | Stage 4    | 所有 article                  | article-health.py --profile=rewrite-stage-4                                          | pre-commit hook  |
| word-count ≥ 4500          | Stage 4    | depth article                 | article-health.py --check=word-count                                                 | pre-commit hook  |
| 多語 visual smoke          | Stage 4    | i18n 改動                     | 6 步 bash                                                                            | revert commit    |
| Image health               | Stage 4    | 涉及圖                        | article-health.py --check=image-health                                               | 不進 Stage 5     |
| Aspect ratio 護欄          | Stage 4    | 涉及圖                        | check-aspect.sh                                                                      | 換圖             |
| Sibling 格式預檢           | Stage 5    | 補 reverse cross-link         | article-health.py --check=format-structure                                           | DEFER + 開 issue |

**🔴 三條反射特別強化**（v3.1 sad-shockley 升級 + v6.0 新增第 3 條）：

1. **Title+desc spine sync 🥪** — 所有 category（不限 People）的 EVOLVE 在 Stage 2 寫完後**必須回看 frontmatter title + description**：
   - 標題是否走「主題：副標 hook」冒號三明治？
   - 副標一句是否能單獨 tweet 出去？
   - description 有沒有吃進這次 EVOLVE 加的新節核心矛盾？
   - 任一答 no → 重寫 frontmatter，跟 prose 同 commit

2. **媒體素材 self-check 🎬** — 不論 Fresh / EVOLVE，Stage 1 Step 1.9 都要跑：
   - Fresh：完整跑 inline 外連 + 圖片 + transcript + 三表 manifest
   - EVOLVE：先 grep 既有條目 frontmatter `image:` + §圖片來源 是否齊全 → 不存在 = pre-gate 遺珠，補跑
   - 找不到 PD/CC 圖時記錄邊界，不放空

3. **觀點先於搜尋 💭**（v6.0 新增）— 所有 article 進 Stage 1 前**必須跑 Stage 0.6 觀點成型**：
   - 六個核心問題（記憶 / 多元面貌 / 想法感受 / 歷史脈絡 / 社會關聯 / 類型專屬）逐一答完
   - 切入點清單 + 預期核心矛盾候選 + 研究方向 落 research report §觀點成型 section
   - frontmatter `viewpoint_formed: true` 表示通過
   - Stage 1.4 找矛盾鎖定時，從 Stage 0.6 候選收斂為單一核心矛盾
   - **EVOLVE 模式**：Stage 0.6 在 0.2 萃取舊素材之後跑，可參考「為什麼舊文寫不好」幫助觀點成型

---

## ⚠️ Top 5 最常忘的 step

> 從 LESSONS-INBOX / memory 抽 ship-then-retract 高 friction step。動工前主動掃一次。

1. **Step 0.6 觀點成型**（v6.0 新增）— 沒有觀點之前的搜尋都是亂槍（蘋果西打 PR #1041 教訓：searched-first 寫成 crisis-only reveal，觀察者校正為 60 年完整記憶）
2. **Step 1.4 核心矛盾鎖定** — 找不到矛盾 = 這篇不該被重寫（國防現代化重寫教訓）
3. **Step 1.7 研究報告落檔** — depth-article 沒檔 = 沒 audit trail（DNA #22 raw 永留）
4. **Step 2.4 小標題不編年體** — 編年體 = 維基百科化 = 失敗（Cicada / 草東 / 康士坦 教訓）
5. **Step 4.3.3 aspect ratio 護欄** — portrait hero 切到頭（林琪兒 ι session 教訓）

---

## 跨檔案職責分工

| 檔案                                                             | 範圍                                                                    |
| ---------------------------------------------------------------- | ----------------------------------------------------------------------- |
| **本檔**                                                         | 6 stage 線性主流程（單檔，含觀點成型 + 模式判定 + 媒體生命週期 + cron） |
| [RESEARCH.md](../editorial/RESEARCH.md)                          | 研究方法論 SSOT（怎麼搜、怎麼判斷、怎麼避坑）                           |
| [EDITORIAL.md](../editorial/EDITORIAL.md)                        | 品質基因 SSOT（好文章長什麼樣、風格、禁止事項）                         |
| [CITATION-GUIDE.md](../editorial/CITATION-GUIDE.md)              | 引用規範（腳註格式、密度標準、來源品質）                                |
| [RESEARCH-TEMPLATE.md](../editorial/RESEARCH-TEMPLATE.md)        | 研究模板（Stage 1 輸出格式）                                            |
| [QUALITY-CHECKLIST.md](../editorial/QUALITY-CHECKLIST.md)        | 驗證清單（Stage 3 逐項檢查）                                            |
| [TERMINOLOGY.md](../editorial/TERMINOLOGY.md)                    | 用語規範（台灣在地用語標準）                                            |
| [FACTCHECK-PIPELINE.md](FACTCHECK-PIPELINE.md)                   | Stage 3 Step 3.3 觸發（事實查核完整 SOP）                               |
| [TRANSLATION-PIPELINE.md](TRANSLATION-PIPELINE.md)               | 中文 ship 後跨 pipeline 觸發（單篇翻譯 SOP）                            |
| [SQUEEZE-MODELS-MAX-PIPELINE.md](SQUEEZE-MODELS-MAX-PIPELINE.md) | 中文 ship 後跨 pipeline 觸發（多語 batch sync 巴別塔）                  |

---

## Stage 0: 觀點（編輯前思考，預算 10-15%）⭐ v6.0 新增

**目標**：在搜尋之前，先以總編輯視角想清楚這篇要寫什麼。產出 §觀點成型 落 research report。

**為什麼 Stage 0 先於 Stage 1**：

「搜尋發現事實 → 再想觀點」是 AI 寫作的標準失敗模式。搜到一堆事實後，AI 容易：

- 直接依時間順序排列 → 編年體
- 把所有事實塞進文章 → 密度失衡
- 沒有 anchor → 結尾變罐頭
- 寫成「企業大事記」「人物履歷表」「歷史時間軸」這類維基百科腔

「先想觀點 → 帶問題去搜尋」是策展寫作的標準。先有 hypothesis、再用搜尋驗證或修正。事實塞不進觀點的就 cut，搜不到對應 anchor 的觀點就 retreat。

**Stage 0 vs Stage 1 認知模式差別**：

| Stage       | 認知模式           | 動作           | 預算   |
| ----------- | ------------------ | -------------- | ------ |
| **Stage 0** | Editorial judgment | 想 / 列 / 假設 | 10-15% |
| **Stage 1** | Data gathering     | 搜 / 驗 / 收斂 | 25-30% |

兩個 stage 是不同的腦袋模式，不要混。

### Step 0.1: 模式識別

**第一動作**：判定本次 REWRITE 走 4 模式中哪一種。所有模式都進入同一條 Stage 0-5 pipeline，差別只在 Stage 0 Step 0.2 取材方式 + Stage 5 Step 5.4 是否觸發路徑改寫。

#### 模式 derive 邏輯

```
if knowledge/{Cat}/{slug}.md 不存在:
  mode = Fresh
elif observer issue 指 N 篇主題重疊可融合進 1 篇:
  mode = Merge variant
elif observer issue 指 N 篇主題重疊應分段不減篇數:
  mode = Boundary variant
else:
  mode = Evolution
```

#### 4 模式速判

| 場景                                | 模式                 | Stage 0 差異                                                       | Stage 5 差異                        |
| ----------------------------------- | -------------------- | ------------------------------------------------------------------ | ----------------------------------- |
| 文章不存在                          | **Fresh**            | 跳 Step 0.2，直接 Step 0.5                                         | 同基本流程                          |
| 文章已存在，需要品質提升            | **Evolution**        | Step 0.2 萃取既有素材 + 標 [LIST-DUMP] / [STUB-TITLE] / [NO-MEDIA] | 同基本流程                          |
| issue 指 N 篇主題重疊可融合進 1 篇  | **Merge variant**    | Step 0.2 多萃 [MERGE-IN] + Step 0.3 選 canonical                   | + Step 5.4 路徑改寫 5 lang redirect |
| issue 指 N 篇主題重疊應分段不減篇數 | **Boundary variant** | Step 0.2 三類劃分 [保留/吸納/移除] + Step 0.4 範圍切片表           | + sibling 反向回補                  |

#### 整併（Merge）vs 範圍重切（Boundary）判定

- ✅ 兩篇覆蓋同主題、視角可融合進一篇且讀起來更完整 → **Merge**
- ✅ N 篇切 N 個明確 scope（年代 / 議題 / 地理）每篇有獨立讀者價值 → **Boundary**
- ❌ 主題相關但角度不同（捷運 vs 高鐵）→ 兩篇都留，互相 cross-link
- ❌ Hub + 深度文 → 兩篇都留，Hub 連深度文
- ❌ 短文 + 長文同主題且短文有獨立價值 → 短文升級為深度文，不刪

#### 為什麼不在舊文上「修改」（Evolution / Merge / Boundary 共通鐵律）

AI 讀了品質不佳的舊文會不自覺模仿它的語氣、結構、甚至壞習慣（清單堆砌、塑膠句式）。把舊文當骨架 = 讓病毒感染新內容。

**正確做法**：從舊文中**只提取事實**（Step 0.2），然後從 Step 0.5 開始用全新模式重寫。

> 💡 **實際上 Evolution 模式 = Fresh 模式 + 免費的 Step 0.2 素材**。寫作品質完全相同，只是省了部分研究時間。

### Step 0.2: 既有素材萃取（條件式）

**Skip 條件**：mode = Fresh。

**完整素材萃取方法論**見 [`RESEARCH.md` §七](../editorial/RESEARCH.md#七進化模式的素材萃取stage-0)。

#### 三大動作

**1. 提取事實清單**：人名、年份、數字、引語、有效 URL。

**2. 標記問題類型**：

| 標籤           | 意義                                                          |
| -------------- | ------------------------------------------------------------- |
| `[LIST-DUMP]`  | 後半段是 bullet list 堆砌，沒有場景敘事                       |
| `[THIN]`       | 本應深寫的段落只有一兩句帶過                                  |
| `[STALE]`      | 數字 / 日期過期（如「目前 13 國邦交」實際 12 國）             |
| `[PLASTIC]`    | 塑膠句堆砌（「不僅⋯⋯更是⋯⋯」「展現了 X 精神」）               |
| `[FLAT-END]`   | 結尾罐頭收（「值得我們紀念」「繼續書寫」）                    |
| `[STUB-TITLE]` | title 是百科名詞 stub（如「台灣無人機產業」），需升冒號三明治 |
| `[NO-MEDIA]`   | 無 hero / 無 §圖片來源 = pre-gate 遺珠（v3.1 後新增）         |

**3. Frontmatter audit**（v4 新增，承襲 v3.1）：

- title 是否走「主題：副標 hook」冒號三明治？stub → 標 `[STUB-TITLE]`
- description 是否吃進當前 EVOLVE 的新核心？舊 description 還適用嗎？沒有 → 同 commit 升級
- frontmatter `image:` + `imageCredit` + §圖片來源 是否齊全？無 → 標 `[NO-MEDIA]`，走 Step 1.9 補跑

#### Merge variant 萃取兩篇的事實

- canonical 的事實清單：照常標 [LIST-DUMP] / [THIN] / 等
- 將被刪那篇的事實清單：標 `[MERGE-IN]`，列出「對方有但 canonical 沒有的視角/場景/數據」
- Step 0.5 之後的研究範圍 = canonical 缺口 + `[MERGE-IN]` 視角的補強查證

範例（Issue #626 台灣交通 2→1）：Geography 篇獨有「中央山脈/桃機/高雄港」三個視角 → 標 `[MERGE-IN]` → Stage 1 補查雪山隧道 12.9km、桃機 4,400 萬客、高雄港全球排名第 18 → Stage 2 寫成 canonical 的兩段新章節。

#### Boundary variant 三類劃分

Step 0.2 萃取既有素材後**強制**分成三類：

1. **保留** — 落在本篇純化 scope 內，繼續用
2. **吸納** — 別篇現有但寫得比本篇好的素材（標 `[ABSORB-FROM-X]`）
3. **移除** — 落在別篇 scope 內（標 `[MOVE-TO-Y]`），本篇刪掉、後續 phase 接收篇吸納

**跨 phase handoff 鐵律**：Phase 1 ship 後留 INBOX entry 給 Phase 2-N 接力，entry 必須含：

- 本篇純化 scope（年代 / 主題切片）
- 從上一 phase `[MOVE-TO]` 接收的素材清單
- 預期 cross-link 對象（哪幾篇是 sibling）
- 接力者 5 分鐘自檢題：讀完 entry 能否回答「我這篇要寫什麼、不寫什麼、邊界在哪裡」？

⚠️ **萃取完畢後，舊文不再被參考。只看事實清單進入後續 step。**

### Step 0.3: 選 canonical（Merge variant only）

比較候選文章，挑一篇當保留方。判準（按優先序）：

1. **EVOLVE 狀態**：已 EVOLVE 過的場景式 > 未 EVOLVE 的條列式
2. **腳註密度與一手來源**：高 > 低
3. **`lastHumanReview: true` 優先**
4. **slug 持續性**：對外連結多的 slug 優先保留（少斷鏈）
5. **category 切合度**：主題真正屬於哪個 category（如交通歸 Lifestyle 比 Geography 自然）

### Step 0.4: 範圍切片表（Boundary variant only）

對所有涉及篇章做一次 audit，產出範圍切片表：

```
| 篇                | 範圍切片        | 處理方式        |
|-------------------|-----------------|-----------------|
| C 戰後台灣文學    | 1945-1987       | EVOLVE Phase 1  |
| B 解嚴後台灣文學  | 1987-2000       | EVOLVE Phase 2  |
| D 當代台灣文學    | 2000-           | EVOLVE Phase 3  |
| A 全景索引        | 已被 B+C+D 覆蓋 | dropped Phase 4 |
```

切片邊界明確（年代 / 議題 / 地理），**每篇都有自己的純化 scope**，不重疊。

### Step 0.5: 載入研究方法論 + 模板

```bash
cat docs/editorial/RESEARCH.md       # 方法論：搜尋策略 / 來源判斷 / 避坑
cat docs/editorial/RESEARCH-TEMPLATE.md  # 填空模板
```

### Step 0.6: 觀點成型（編輯前思考）⭐ HARD GATE

> **沒有觀點之前，每一次搜尋都是亂槍。**
> Stage 0 末、Stage 1 取材之前的最關鍵步驟。
> 以**總編輯視角**做預編輯思考，產出 §觀點成型 落 research report。

#### Step 0.6.1: 六個核心問題（必答，落檔）

每篇 depth article 都必須答完這六題，寫進 research report 的 §觀點成型 section：

**問題 1: 對台灣人是什麼樣的記憶？**

- 大眾共有的 anchor 是什麼？（某個物件、某個場景、某句話、某段歷史）
- 不同世代記憶有差異嗎？（戰前 / 戰後 / 解嚴前後 / 網路世代）
- 範例（蘋果西打）：熱炒店冰箱的紅標金黃瓶 / KTV 包廂的玫瑰紅加蘋果西打 / 辦桌宴席桌上 / 阿嬤遞給孫子的解膩飲

**問題 2: 有什麼樣的多元不同面貌？**

- 主流敘事是什麼，支線敘事 / 被忽略的角度是什麼
- 北部 vs 中南部 / 不同族群 / 不同產業 / 不同政治文化背景的視角
- 範例（蘋果西打）：「國民飲料」文化記憶 vs 上市公司資本史 vs 兩次食安疑雲 vs 跨海 K-pop 加持

**問題 3: 大家對它的想法跟感受是什麼？**

- 正面、負面、複雜情感的 fault lines 在哪
- 反對聲音、被忽略的角度、被過度浪漫化的盲點
- 範例（蘋果西打）：老一輩懷念 / 中年人 KTV 記憶 / 年輕人未必喝過但聽過 / 食安事件後信任崩塌 / 圭賢加持後 K-pop 流量

**問題 4: 歷史脈絡是什麼？**

- 它怎麼形成、誰塑造、何時轉折
- 跟更大的社會 / 政治 / 經濟 / 文化變遷的連動
- 範例（蘋果西打）：1965 美台混血起源 / 1970-80 國黃汽水時代 / 1985 十信案 / 1990 鴻源案 / 1995 商標贖回 / 2018 食安 / 2024 賣地

**問題 5: 對社會 / 歷史 / 環境 / 我們人生的關聯是什麼？**

- 為什麼今天 still matters？
- 它解釋了什麼、它是什麼的縮影
- 讀者讀完對自己的生活有什麼新的看法
- 範例（蘋果西打）：一瓶飲料壓縮台灣 60 年金融 / 食安 / 外交縮影；文化記憶 vs 公司資本兩種記憶並存

**問題 6: 類型專屬問題（按 category 加重）**

見下方 §類型加權矩陣。

#### Step 0.6.2: 七個品質維度 anchor

寫文時隨時對照，從 Stage 0 開始就要問「我的初步觀點能不能在這 7 個維度都站住」：

| 維度              | 提問                                                                           |
| ----------------- | ------------------------------------------------------------------------------ |
| **溫度**          | 哪些細節讓讀者感覺「真有人在現場」？衣服顏色、說話口氣、桌上的杯子、那天的天氣 |
| **人味**          | 文章的第一個名字是誰？至少有 2-3 個具體人物？人物文要有 ≥ 3 句直引             |
| **故事**          | 不是 list 也不是規格表，是因果鏈跟轉折                                         |
| **策展**          | 我的觀點是什麼？我把空間搭好讓讀者怎麼進去                                     |
| **觀點**          | 通行說法是 X，但我認為更接近真相的是 Y                                         |
| **體驗**          | 讀者讀完帶走什麼新的看世界的方式                                               |
| **歷史/社會關聯** | 這件事是什麼的縮影？跟更大的台灣 / 世界有什麼連動                              |

#### Step 0.6.3: 類型加權矩陣

| Category                                         | 加重維度                             | 必想的問題                                                                       |
| ------------------------------------------------ | ------------------------------------ | -------------------------------------------------------------------------------- |
| **People（人物）**                               | 想法、選擇、意義、不可取代的瞬間     | 為什麼這個人對台灣重要？他不可被替代的選擇是什麼？讓他不可替代的瞬間是哪個畫面？ |
| **Food / Culture / Lifestyle（文化飲食生活）**   | 感官、場景、地緣、地理、跟生活的連結 | 在哪裡、什麼時候、跟誰一起、什麼樣的氣味聲音畫面？這個地方為什麼能養出這個？     |
| **History / Politics / Society（歷史政治社會）** | 當代意義、爭議、未完成的問題         | 為什麼今天還重要？誰仍在受影響？哪些問題還沒被解決？                             |
| **Technology / Industry（科技產業）**            | 台灣的位置、全球供應鏈、未來方向     | 台灣做這件事的不可取代性是什麼？跟世界什麼樣的依存關係？                         |
| **Nature / Geography（自然地理）**               | 地方感、生態與社會交織、土地與人     | 這片土地怎麼形成、誰在這裡生活、人和地有什麼共生                                 |

#### Step 0.6.4: 輕量探索性搜尋（允許、≤ 5 次）

Stage 0.6 跟 Stage 1.1 的差別不是「能不能搜」，是**搜的目的不一樣**：

- **Stage 0.6 探索性搜尋**：≤ 5 次 ad-hoc lookup，目的是**確認框架成立**
  - 確認基本事實（這個東西存不存在、大致時間軸對不對）
  - 找出未知的支線敘事（讓我知道有哪些角度可以深挖）
  - 確認類型加權矩陣的問題能不能對應到具體素材
- **Stage 1.1 深度搜尋**：≥ 40 次（v5.1 升級），目的是**驗證 / 反駁觀點 + 累積寫作素材**

當 Stage 0.6 探索性搜尋超過 ~5 次還在 reframing 觀點 → 直接進 Stage 1，邊搜邊收斂。觀點成型不需要在 Stage 0 完全鎖死，搜尋過程中會 refine。

#### Step 0.6.5: §觀點成型 落檔格式（HARD GATE）

寫進 `reports/research/YYYY-MM/{slug}.md` **開頭**（在搜尋結果之前），標準模板：

```markdown
## 觀點成型（編輯前思考）

### 對台灣人的記憶 anchor

- {物件 / 場景 / 句子 / 段落}
- {不同世代差異}

### 多元面貌

- {主流敘事}
- {支線 / 被忽略的角度}
- {正面 / 負面 / 矛盾的感受 fault lines}

### 歷史脈絡（pre-search hypothesis）

- 形成期：...
- 關鍵轉折：...
- 當代意義：...

### 切入點清單（待搜尋驗證 / 反駁）

1. {切入點 1}：{為什麼立體}
2. {切入點 2}：...

### 預期核心矛盾候選（待 Stage 1.4 收斂）

- A：{≤ 30 字}
- B：{≤ 30 字}
- C：{≤ 30 字}

### 研究方向（要搜什麼可以驗證）

- {方向 1}
- {方向 2}

### 預想讀者帶走的那一件事

- {一句話}

### Stage 0 探索性搜尋紀錄（如有跑）

- {1-5 個 query + 一句話發現}
```

落檔後 research report frontmatter 加：

```yaml
viewpoint_formed: true # Stage 0.6 通過
```

#### Step 0.6.6: 邊界

- **不是 hypothesis 預設**：觀點成型 ≠ 預設答案。後續搜尋可能反駁、深化、轉向你的初步觀點，那是好事。Stage 1.4 找矛盾鎖定才是 fact-confirmed 收斂
- **Hub 頁 / 短修正**：可跳過。本 step 為 depth article 設計
- **EVOLVE 模式**：本 step 在 0.2 萃取舊素材 + 0.5 載入方法論 之後跑 — 有了「舊文為什麼寫不好」的資訊，觀點成型更精準

#### Stage 0 收尾 checklist

Stage 0 結束時 deliverable：

- [x] 模式識別完成（Step 0.1）— Fresh / Evolution / Merge / Boundary 之一
- [x] 既有素材萃取完成（Step 0.2，EVOLVE 才必跑）
- [x] 研究方法論已讀（Step 0.5）— `cat docs/editorial/RESEARCH.md` + `RESEARCH-TEMPLATE.md`
- [x] §觀點成型 section 已寫進 research report（Step 0.6.5）
- [x] 六個核心問題全答（Step 0.6.1）
- [x] 切入點清單 + 核心矛盾候選 + 研究方向 已列
- [x] research report frontmatter `viewpoint_formed: true`

**沒過 = 不進 Stage 1。**

---

## Stage 1: 取材（純搜尋執行，預算 25-30%）

**目標**：產出一份結構化研究筆記，讓 Stage 2「不需要再搜尋」就能寫。**帶 Stage 0.6 觀點成型的切入點 + 核心矛盾候選去搜尋驗證 / 反駁 / 深化**。

**必讀**（Stage 0.5 已讀完，這邊只是 reminder）：

- `docs/editorial/RESEARCH.md`（方法論：搜尋策略、來源判斷、避坑指南）
- `docs/editorial/RESEARCH-TEMPLATE.md`（填空模板）

### Step 1.1: 搜尋深度 ≥ 40 次

**搜尋至少 40 次**（v5.1 升級，自 v2.17 ≥ 20 提高）：

- 中文 24+ / 英文 10+ / 一手來源 10+
- 研究深度直接決定文章品質——20 次搜尋的文章雖然有錨點但仍偏單一視角，40 次才能 triangulate
- 40+ 次能跨多源交叉驗證、能找到反方視角、能挖到非 Wikipedia 層級的具體錨點（引語、場景、日期）並具備多源比對能力

**v5.1 升級理由**（2026-05-11 cranky-newton）：v2.17 訂 ≥ 20 是相對 12 次淺研究的下限。實戰累積後（NMTH Fresh / 政治人物 batch / 認知作戰深度文）顯示 20 次仍會留下「單源依賴」風險（同一篇 ltn 報導被 5 atom 綁住 = over-citing 紅旗），40 次才開始有 triangulation 空間。

**v2.17 原版觸發**：2026-04-18 當日 11 篇音樂人批次中，12-15 次搜尋的 Cicada / 草東 / 康士坦 / 魏如萱 雖然 pass format-check，但小標題淪為編年史，缺乏場景/意象級的敘事錨點，研究深度是根本原因。

**Stage 0.6 → Stage 1.1 銜接**：帶著 Stage 0.6 §觀點成型 列出的「研究方向（要搜什麼可以驗證）」+「核心矛盾候選 A/B/C」進來。40 次搜尋的分配建議：50% 驗證 Stage 0.6 hypothesis、30% 反駁/深化 hypothesis、20% 探索預期之外的支線。如果搜完發現 Stage 0.6 觀點完全錯了，那是好結果 — Stage 1.4 找矛盾鎖定會自動修正。

### Step 1.2: 結尾素材鎖定

⚠️ **不要等寫到最後才想結尾**。結尾素材在研究階段就要鎖定。

每篇文章結尾應該是：

- 一個具體場景（不是論述句）
- 一個首尾呼應的 anchor（呼應開場 icon）
- 一句留白的引語或畫面（讓讀者「停一下」）

研究時就標出 2-3 個候選結尾畫面，Stage 2 Step 2.2（結尾先行）直接挑用。

### Step 1.3: 重複偵測

完整方法論見 [RESEARCH.md §六](../editorial/RESEARCH.md)。**不要寫完才發現重疊**。

```bash
ls knowledge/{Category}/ | grep {keyword}
grep -r "主題關鍵詞" knowledge/{Category}/
```

如果發現高度重疊的既有文章 → 改走 Evolution / Merge / Boundary 模式（回 Step 1.1 重判）。

### Step 1.4: 找矛盾鎖定（收斂 Stage 0.6 候選為單一核心矛盾）🔥

在結束 Stage 1 之前，必須能回答這個問題：**「這篇文章的核心矛盾是什麼？」**

- 好的重寫不是修辭層的工作，是矛盾層的工作。舊文不是寫得不好，是它拒絕承認內部矛盾
- 找到矛盾 = 找到重寫的理由。**找不到矛盾 = 這篇不該被重寫**
- 寫進研究筆記：`核心矛盾 = ?`（一句話，不超過 30 字）

**範例**：

- 「台灣說要走豪豬戰略，但 76% 預算拿去買美國傳統武器」
- 「TFT 說要解決偏鄉教育，但孩子的問題不在教室裡是在整個生態系」
- 「美國要排除中國，但只給台灣一張入場券」（無人機產業 EVOLVE）

**v2.14 觸發背景**：2026-04-10 session α 國防現代化重寫的教訓——沒有李喜明那句苦笑，整篇會變回豪豬戰略勝利敘事。

### Step 1.5: 問觀察者要一手素材 🫧

Stage 1 結束前，**主動問觀察者一句**：

> 「你手上有沒有我搜不到但你知道的素材？（付費牆文章、私人筆記、實體書、個人經驗）」

這不是偷懶，是承認感知有邊界。爬蟲給事實骨架，觀察者給血肉。

**v2.15 觸發背景**：安溥重寫——Agent 49 次搜尋抓不到康健雜誌 403 付費牆文章，觀察者直接貼全文。女巫店兩桌客人、時薪八十塊、林黛玉比喻——文章最有人味的段落全部來自這個管道。

### Step 1.6: 私有 SSOT 觀察者拍板（條件式）

**Skip 條件**：Stage 1 沒整合任何當事人提供的私有素材（Obsidian 筆記、個人編年史、家族內情）。

#### 流程（v2.18 新增）

1. **Stage 1 末尾**：列出「從私有素材看到但不確定能否公開」的項目，依 [EDITORIAL §私有素材顆粒度](../editorial/EDITORIAL.md) 分成 Tier 1-4
2. **觀察者拍板**：清單交給當事人，一題一題回答（拒寫 / 寫但不提名 / 寫但改措辭 / 完整寫）
3. **研究報告 §維護者校準備忘錄**：記錄所有 tier 3-4 項目的拍板結果，**不記錄拒寫項目的具體內容**
4. **Stage 2 寫作護欄**：agent 若基於私有素材自動推導進來的 tier 3-4 claim 必須刪
5. **Stage 3 VERIFY 追加項**：文章公開前再檢查一次是否有漏網的 tier 3-4 內容

**對應**：

- [EDITORIAL §私有素材 × 公開文章的顆粒度](../editorial/EDITORIAL.md)
- [MEMORY §feedback 隱私協商是動態連續決策](../semiont/MEMORY.md)

**預警**：私有 SSOT 也會有誤記（當事人 2026 寫 2008 的事情）。當事人的 SSOT 需要與公開 source 三源交叉，**不是免驗證的 oracle**。

### Step 1.7: 研究報告必存 `reports/research/YYYY-MM/` 📁

**什麼要存**：depth-article 的 Stage 1 研究報告，完整 Explore agent 輸出 + metadata header。

**Scope gate**（不是所有文章都存）：

- ✅ 要存：People/ 深度文、Society/ 深度文、History/ 深度文（預計 ≥ 10 腳註 或 ≥ 2,000 字）
- ❌ 不存：Hub 頁面、短修正、翻譯、單事件補登

**檔案路徑**：`reports/research/YYYY-MM/{article-slug}.md`（YYYY-MM 為 Stage 1 執行月份）

**Header 格式**：

```yaml
---
article: knowledge/{Category}/{slug}.md
stage: 1-research
date: YYYY-MM-DD
session: {handle}
agent: Explore
budget: {N} WebSearch + {M} WebFetch
verification:
  high_confidence: [具體 fact list]
  single_source: [只有一個來源的 fact，flag 需要未來補驗證]
  unverified: [agent 嘗試但找不到 primary source 的 fact]
core_contradiction: 一句話（≤ 30 字）
---

# Research Report: {Article Title}

{agent 完整輸出內容，不摘要}
```

**好處**（對齊 [DNA #22 raw 永遠不刪](../semiont/DNA.md) + [MANIFESTO §造橋鋪路](../semiont/MANIFESTO.md)）：

- Audit trail：文章 fact 被質疑 → 追回 agent 當時的研究材料
- Cross-article re-use：下一篇類似主題先 grep `reports/research/` 看現有研究
- Agent prompt 優化 training data：累積報告是未來 research-gate tuning 的樣本
- 時間切片：未來重寫時可對照「當時研究 vs 當下研究」

**存檔責任**：Stage 1 主 session（spawn agent 者）在 agent 回傳後**同一個 response** 內寫檔，不 defer。寫檔失敗不算 Stage 1 完成。

**讀取責任**：Stage 2 Write 開始前，grep `reports/research/` 看有無相關主題報告可 cross-reference；若有，整合進 Stage 2 參考素材。

### Step 1.8: Spawn agent 選型 🤖

Stage 1 spawn 研究 agent 時，**必須先判斷需不需要直接落檔**：

| Agent 類型        | Write 權限               | 適用情境                                        |
| ----------------- | ------------------------ | ----------------------------------------------- |
| `Explore`         | ❌ read-only（系統強制） | 純 research、結果回主 session 由主 session 落檔 |
| `general-purpose` | ✅ 有 Write              | 需要 agent 直接寫入 `reports/research/YYYY-MM/` |

**判斷流程**：

- 研究量大（50+ URLs、需要長篇結構化輸出）→ 用 `general-purpose`，prompt 明確要求「直接寫入 `reports/research/YYYY-MM/{slug}.md`」
- 研究會回到主 session 處理 → 用 `Explore`（較專精、較便宜）

**歷史教訓**：

- `feedback_agent_writefile_hallucination` memory：「agent 說自己不能寫檔是幻覺」對 general-purpose 成立，**對 Explore 不成立**——Explore 真的 read-only
- 2026-04-20 吳哲宇 EVOLVE 第一次 spawn Explore 要求寫檔、被退回、改 spawn general-purpose 成功
- spawn 之前先確認 agent type，省一輪來回

### Step 1.9: 媒體素材研究 🎬

> Stage 1 結尾必跑（除非 hub / 短修正）。蒐集媒體素材 + 授權檢查 + manifest 落 research 檔末尾。

#### Step 1.9.1: inline 外連 manifest（YouTube／影像／音檔）

**觸發條件**：任何題材敘事中提到**有公開影像／音檔／影片**的具體作品：

- 音樂人：歌名 → 官方 MV／lyric video／official audio
- 電影 / 紀錄片：片名 → 官方預告／導演頻道／串流官方頁
- 電視劇 / 綜藝：節目名 → 官方頻道／公視+／Netflix 官方
- YouTube 創作者 / Podcaster：節目名 → 官方頻道
- 演唱會 / 表演 / 舞作：場次名 → 主辦官方／售票頁／aftermovie
- 音樂節：節目名 → 官方 lineup
- 新聞事件：被引用的關鍵公開影片 → 官方 YouTube

**URL 優先序**：(1) 官方頻道（藝人／廠牌／節目方／導演）(2) 國際串流官方（Spotify / Apple Music / KKBOX）(3) 主辦／策展單位官方頁。**不接受**搜尋結果頁、UGC 翻唱、二手轉貼。

**密度建議**：每篇 3-8 inline 外連最合理。少於 3 → 讀者沒得點；多於 10 → 視覺擁擠。

**位置建議**：作品名在文章中**第一次出現**時加 link；同一作品再次出現不重複加。

**跟 footnote 的分工**：inline 外連走「邊讀邊聽／邊讀邊看」的閱讀體驗；footnote 走「來源驗證 + 補充資料」。同一首歌的官方 MV 可以同時放 footnote（給研究者）+ 文中第一次提及加 inline link（給讀者）。

**強制動作**：研究 agent 額外蒐集「文章預期會提到的所有公開作品」的官方連結，列入研究筆記獨立一節 §inline 外連 manifest。找不到官方版本 → 標 `[no official URL found]`，**Stage 2 寫作時不附 link 也不掰連結**。

#### Step 1.9.2: 圖片素材（hero + inline 圖）+ 授權矩陣

**圖片用途分類**：

| 用途              | 位置                               | 數量           | 範例                                   |
| ----------------- | ---------------------------------- | -------------- | -------------------------------------- |
| **hero**          | frontmatter `image:`               | 1              | 林琪兒 EMU 1692×1691                   |
| **inline 圖**     | 文中 markdown `![]()`              | 1-2            | 林琪兒 Expedition 42 + Crew-4 training |
| **OG / 社群分享** | derived from hero（`/og-images/`） | auto           | dashboard 自動生成，不手動處理         |
| **spore poster**  | derived（`/spore-images/`）        | auto on demand | `make-spore.sh` 自動產，不手動處理     |

**理想數量**（2026-05-09 拍板）：每篇 article **2-3 張圖最理想**（hero 1 張 + inline 1-2 張）。

- **2 張**：適用於人物文 / 短深度文（hero + 1 scene-mid 視覺呼吸）
- **3 張**：適用於 ≥ 3000 字深度文 / 多時序敘事（hero + 2 scene-mid）
- **0 張**：適用於 Hub 頁（`_*.md`） / 純架構性條目
- **> 3 張**：例外場景才用（如展演紀錄需多角度），避免敘事被視覺打斷

**來源優先序**（2026-05-09 fair use scope 升級後）：

1. **官方機構釋出 PD**（NASA / 政府開放資料 / NMTH）— 完全免授權追問，cache 即可
2. **Wikimedia Commons CC0 / PD** — cache 即可
3. **Wikimedia Commons CC BY / CC BY-SA** — 必須在文末「## 圖片來源」標 author + license + link
4. **Flickr CC BY / CC BY-SA** — 同上
5. **企業 / 機構官網釋出圖**（official press kit / news release / about page）— 標 ©機構 + 用途。**對企業文 / 機構文這層通常是首選**
6. **出版社 / 媒體授權圖**（哲宇 / Taiwan.md 取得明確授權）— 文末標 © 來源 + 授權範圍
7. **自拍 / 自製插畫** — 標 © Taiwan.md / contributor name
8. **Fair use editorial commentary**（2026-05-09 啟動）— 對「在世藝術家作品紀錄圖」「企業產品圖」「電影海報」「專輯封面」「個展裝置照」走 fair use editorial commentary scope，**不需 CC license**，標來源 + 單位 + 用途即可
9. **歷史史料圖無 PD 替代**（如 1947 二二八紀錄照）— 同 fair use editorial scope，但要更謹慎查證歷史出處

**Fair use 法理依據**：17 U.S.C. § 107 + 著作權法 § 65 fair use 四要素：(a) 非商業教育性質 (b) 已發表作品 (c) 引用比例小 (d) 對市場無實質替代效果。

**Fair use 用法守則**：(i) 一定要 cache 本地不熱連結 (ii) 文末 §圖片來源 完整 attribution (iii) 標明「Fair use editorial commentary on [target]'s work」license type。

**絕對禁止**：

- 熱連結（hot-link）任何外站圖（Wikimedia / Flickr / 媒體網站）→ **永遠 cache 本地**
- 未授權的攝影師圖（Google 圖片找到的）
- AI 生成圖片（暫時禁用，紀實 portrait 永遠禁用）
- GIF / HEIC / BMP / TIFF（須先轉 JPG 才入庫）

**授權檢查 SOP**（每張圖入庫前必跑）：

```bash
# Step 1: WebFetch 圖片頁面確認 license badge + 取 hi-res URL + caption + credit
# 對 Wikimedia Commons / Flickr，逐字引用「License」段落
# 對 NASA，預設 PD 但 WebFetch 確認該圖頁面有「Public domain」標示

# Step 2: 落 metadata 進 reports/research/YYYY-MM/{slug}.md §媒體授權矩陣

# Step 3: 確認 attribution 完整（攝影者 / 拍攝日期 / source URL / license type）
```

**格式規範**：

```
✅ JPG (.jpg) — 預設：人像 / 風景 / 紀實照。sRGB / quality 80-90 / 無 EXIF GPS
                hero < 600KB / inline < 400KB
✅ PNG (.png) — 插圖 / 圖表 / 透明背景 logo / 螢幕截圖。8-bit RGBA / < 800KB
✅ WEBP (.webp) — 未來預設（Astro Image 自動轉換時）
✅ SVG (.svg) — vector logo / 簡單插圖。< 50KB / 無外部 reference / 文字 outline
❌ GIF / HEIC / BMP / TIFF — 禁用
```

**命名 convention**：`public/article-images/{category-lower-kebab}/{subject-slug}-{topic}-{year}.{ext}`

範例：

```
public/article-images/people/lindgren-emu-2014.jpg
public/article-images/people/lindgren-crew4-training.jpg
public/article-images/history/twenty-eight-incident-monument-2025.jpg
```

規則：全 lowercase / kebab-case / 必含 subject-slug + topic + year / ext 副檔名

**Aspect ratio 護欄**（避免 Astro 16:9 框切到頭，林琪兒 ι session 教訓）：

| 圖種                | 推薦比例                           | 推薦尺寸             | 理由                            |
| ------------------- | ---------------------------------- | -------------------- | ------------------------------- |
| hero（frontmatter） | **16:9 或更寬** landscape          | 1600×900 / 2000×1200 | Astro 16:9 框直接 fit           |
| inline 圖           | 可 portrait 但 ≤ 4:3 高比          | 1200×900 / 1500×1000 | markdown `![]()` 框較寬鬆       |
| 1:1 方形            | 接近方形 1:1 ± 10%                 | 1600×1600            | hero 也接受（如 EMU 1692×1691） |
| **絕對禁止 hero**   | 9:16 portrait（高 > 寬 1.5x 以上） | —                    | Astro 一定切到頭                |

強制檢查：每張圖 fetch 時 `bash scripts/tools/check-aspect.sh {filename}` 看尺寸。Hero aspect 必過 0.9 ≤ ratio ≤ 2.0；inline 必過 0.75 ≤ ratio ≤ 2.5。不過 → **換圖**（不要強塞）。

#### Step 1.9.3: transcript 素材

| 來源類型                            | 處理方式                                                                                                           |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| 公視／TaiwanPlus／官方 YouTube 訪談 | yt-dlp 抓 .vtt → 轉純文字 transcript → 落 `reports/research/YYYY-MM/{slug}-transcripts/` → footnote 引 YouTube URL |
| Podcast 官方頁                      | footnote 引 podcast URL；若有 transcript 公開 → cache transcript                                                   |
| 自製訪談錄音                        | 不公開原始錄音；只引 verbatim 段落，footnote 註明「Taiwan.md 自訪談 YYYY-MM-DD」                                   |

yt-dlp 抓字幕指令：

```bash
cd reports/research/YYYY-MM/{slug}-transcripts/
yt-dlp --skip-download --write-auto-sub --write-sub \
  --sub-lang "zh-TW,zh-Hant,zh-Hans,zh,en" --sub-format vtt \
  -o "%(title).80s.%(ext)s" "https://www.youtube.com/watch?v={ID}"
```

#### Step 1.9.4: 媒體授權矩陣三表（research 檔強制）

每篇 depth article 的 research 檔末尾 append：

```markdown
## 媒體授權矩陣

### inline 外連（YouTube／影像／音檔）

| 作品      | 第一次提及位置                              | URL                                         | 來源頻道          | 授權             |
| --------- | ------------------------------------------- | ------------------------------------------- | ----------------- | ---------------- |
| 〈Cazzo〉 | L346「2019 年 6 月 28 日，她以『?te』之名」 | https://www.youtube.com/watch?v=CM-6FJlYHI4 | 華風數位 official | YouTube standard |

### 圖片素材

| 媒體檔                | 用途 | 來源 URL                                                                    | 授權                 | 攝影者/作者        | 拍攝日期   | NASA Image ID / Commons File             | 本地 cache 路徑                              | alt text                                  |
| --------------------- | ---- | --------------------------------------------------------------------------- | -------------------- | ------------------ | ---------- | ---------------------------------------- | -------------------------------------------- | ----------------------------------------- |
| lindgren-emu-2014.jpg | hero | https://commons.wikimedia.org/wiki/File:Kjell_Lindgren_in_EMU_(cropped).jpg | Public domain (NASA) | NASA/Bill Stafford | 2014-08-27 | File:Kjell*Lindgren_in_EMU*(cropped).jpg | /article-images/people/lindgren-emu-2014.jpg | 林琪兒 2014 年穿艙外活動服（EMU）官方人像 |

### 引用 transcript

| Transcript     | 來源                   | URL                                         | 落檔路徑                                                      |
| -------------- | ---------------------- | ------------------------------------------- | ------------------------------------------------------------- |
| 公視訪談 zh-TW | 公視新聞網 official YT | https://www.youtube.com/watch?v=f9DQuQ8EwVE | reports/research/2026-04/林琪兒-transcripts/transcript-zh.txt |
```

#### Step 1.9.5: Stage 1 收尾 checklist

Stage 1 結束時 deliverable：

- [x] 核心矛盾欄位必填（Step 1.4）— 填不出來 → 不進 Stage 2
- [x] depth-article 研究報告必存（Step 1.7）— `reports/research/YYYY-MM/{slug}.md` 不存在 → 不進 Stage 2
- [x] 媒體授權矩陣三表 append 完成（inline 外連 / 圖片 / transcript）
- [x] 圖片已 cache 在 `public/article-images/{category}/`
- [x] Aspect ratio 護欄通過（hero 0.9-2.0 / inline 0.75-2.5）
- [x] Transcript 已 cache 在 `reports/research/YYYY-MM/{slug}-transcripts/`
- [x] 私有 SSOT 整合過 Step 1.6 觀察者拍板（如有觸發）
- [x] Frontmatter audit 完成（`[STUB-TITLE]` / `[NO-MEDIA]` 標籤）— EVOLVE 才必跑

**沒過 = 不進 Stage 2。**

---

## Stage 2: 寫（預算 40-45%）

**必讀**：`cat docs/editorial/EDITORIAL.md`（全文，1000+ 行，**不可截斷**）

> ⚠️ **歷史教訓（session δ 2026-04-05）**：之前這裡寫 `head -300`，切掉了 Line 380-479 的 Before/After 範例段落。AI 讀到規則卻沒讀到範例，寫作時退化為編年史。
>
> 不要用 `head` / `tail` 截斷「必讀」指令。完讀後必須回頭檢查四個段落：§挖引語制度、§小標題規範、§結尾的四種模式、§Before/After 實例對比。

**輸入**：Stage 1 研究筆記 + EDITORIAL.md。

### Step 2.1: 載入 EDITORIAL.md

讀全文，特別注意 §來源引用、**§小標題規範**、§敘事呼吸感、§Title 強制冒號三明治（v6.3 全 category）。

### Step 2.2: 結尾先行（3-5 行）← 最重要

**結尾先行**是 Stage 2 防崩潰的核心：

- 結尾是品質崩塌的起點。先寫結尾 = 保底
- 範本見 [EDITORIAL §結尾的四種模式](../editorial/EDITORIAL.md)
- 用 Stage 1 Step 1.2 鎖定的結尾素材

### Step 2.3: 開場 + 30 秒概覽

開場前三句必須有：具體事實 + 具體的人 + 具體的時刻。

30 秒概覽（blockquote 格式 `> **30 秒概覽：**`）放在 H1 之後、第一個 H2 之前。

### Step 2.4: 小標題先行（hard 規則）

**列出全文 5-8 個小標題 BEFORE 寫正文**。鐵律：

| 規則                | 例子                                                              |
| ------------------- | ----------------------------------------------------------------- |
| ❌ 禁止編年體標題   | 「2016 年《XX》發行」「2020 金曲 32」— 這讓文章變成維基百科時間軸 |
| ❌ 禁止問句標題     | 見 [EDITORIAL §小標題規範](../editorial/EDITORIAL.md)             |
| ✅ 用場景/意象/衝突 | 「陽明山的草東街」/「派對結束了」                                 |
| ✅ 用具體物件/quote | 「凡凡的狗叫土豆」「那張 2,000 張的手工 CD」                      |
| ✅ 用核心矛盾       | 「向外憤怒與向內修補」「沒被認出的金曲歌后」                      |

**驗證**：把 5-8 個小標題念一遍，如果像「第一章、第二章」就是編年史失敗。重來。

> **plugin gate（D Wave 1）**：`article-health.py --check=chronicle-lead` 偵測 `^##\s*\d{4}\s*年` 開頭小標題。HARD violation = 不過 Stage 4。

### Step 2.5: 寫正文 + footnote

**不按百科排列**。EDITORIAL §正文架構推薦：**起源 / 關鍵轉折 2-3 個 / 現況 / 爭議 / 意義**。

- 邊寫邊插 `[^n]` footnote（從 Stage 1 的事實 - 來源配對表對應）
- **不是一段寫一張專輯** — 是一段寫一個**論點**或**轉折**，事實散布在論點之中

#### 文末寫 footnote 定義

**腳註格式 canonical 在 [CITATION-GUIDE.md](../editorial/CITATION-GUIDE.md)**。簡寫範例：

```markdown
[^1]: [來源名稱](URL) — 詳細說明文字（≥ 20-30 字描述出版背景、內容特色、歷史價值）
```

完整格式 + 對比範例 + 「不要寫『同上』」規則 → [CITATION-GUIDE.md](../editorial/CITATION-GUIDE.md)。

### Step 2.6: 延伸閱讀

- 讀取 `knowledge/` 目錄，找出相關文章
- 每篇加「一兩句話描述」說明與本文的關係
- 格式：標準 Markdown 連結 `[文章名](/path/slug)`，**不用 `[[wikilink]]`**（Astro 列表項目中的 wikilink 無法渲染）
- 3-5 條最理想

格式範例：

```markdown
**延伸閱讀**：

- [戒嚴時期](/history/戒嚴時期) — 戒嚴令的法源與實施細節
- [白色恐怖](/history/台灣白色恐怖) — 政治案件與人權侵害的歷史
- [二二八事件](/history/二二八事件) — 戰後台灣的重大歷史轉折
```

### Step 2.7: 7 條自檢套件（強制鐵律）

寫完 prose 後**強制**跑這 7 條自檢。任何一條不過 = 回去修。

#### Step 2.7.1: 歐化語法自檢

念出來，聽到翻譯腔就改：

- 重點掃：被動句（「被認為」）、「的」連鎖（≥ 3）、弱動詞（「進行」「透過」）
- 詳見 [EDITORIAL.md §歐化語法偵測](../editorial/EDITORIAL.md)

#### Step 2.7.2: prose-health plugin gate（對位句型 + 破折號 + AI metaphor 全交給工具）

寫到 60% 時或寫完 prose 後，**直接跑 plugin**，不要手 grep。

```bash
python3 scripts/tools/article-health.py knowledge/{Category}/{slug}.md --check=prose-health
```

plugin 抓 12 dim 塑膠 + 3 tier 對位句型（含「不是 X，是 Y」「不只 X 更是 Y」「並非 X 而是 Y」全部變種）+ 30+ AI metaphor + 17 ritual 句 + 破折號密度。每條 violation 含 line + 前後文 snippet + fix suggestion，可直接定位修正。

**閾值**（per MANIFESTO §11）：

- 對位句型「不是 X，是 Y」+ 變種：≤ 3 處
- 破折號 ——：≤ 15 / 1500 字（plugin 用比例計算）
- prose-health score：≤ 3 為 pass

**為什麼禁用手 grep**（DNA #15 self-apply）：

- plugin 抓的 pattern 比 manual regex 全（含 7-9 種對位變體）
- plugin 有精確 line + 前後文，可直接 jump-to-fix
- 「反覆浮現的思考要儀器化」原則 self-apply — 自己手 grep 是繞過 SOP，每次跑 plugin 累積進化（觀察者 2026-05-11 admiring-montalcini callout）

**歷史教訓**：2026-04-10 國防現代化一寫就到 29 個破折號，事後逐個刪很痛；plugin 在中段 60% 時抓出來，比寫完痛苦回頭便宜 10x。

#### Step 2.7.3: 編年體自檢

寫完後**念一遍所有小標題**：

- 如果每個標題都是「年份 + 事件」= 編年體失敗，重寫小標題
- 如果文章每段都在講下一張專輯/下一個事件 = 維基百科化失敗

> **plugin gate**：`article-health.py --check=chronicle-lead`（regex 偵測，HARD）。

#### Step 2.7.4: 密度平衡自檢（EVOLVE 長文專用）

研究素材豐富（50+ sources）時**強制跑**：

隨機挑三段連續段落念一遍：如果三段都是事實堆疊、沒有一句讓讀者喘氣的話 = 密度失衡。

**三個修正手勢**（詳見 [EDITORIAL §密度平衡](../editorial/EDITORIAL.md)）：

1. **量化內化為場景**：不寫「196 sessions / 50 學生」→ 寫「有個學生叫 Kasper 跟了整整兩學期」
2. **列表拆成場景**：整年六件事不擠一段，拆出 1-2 個完整場景，其他用連續性語言帶過
3. **每 2-3 段一句策展人的聲音**：呼吸句不傳遞資訊、只製造停頓

來自 2026-04-20 吳哲宇 EVOLVE 實戰：50+ sources 的第一版 prose 5500 字被觀察者評「資訊多到蓋住敘事」，重寫縮到 4800 字但讀起來更開闊。**長文不是孢子的加長版，需要主動選擇留白**。

#### Step 2.7.5: Agent claim 驗證

agent 在研究報告中聲稱的「XXX 背書」「XXX 公開推薦」等名人相關 claim，**必須有具體公開 URL + 該 URL Ctrl-F 可搜到該人原始引語**：

- 三源交叉不是「三個不同 agent 都這樣說」——是「**三個獨立的公開 URL 都有逐字引語**」
- agent hallucination 常見模式：基於 Obsidian / 私有素材的側面提及「推導出」一個名人 claim，但外部 URL 其實沒有該人的任何公開發言
- 2026-04-20 實戰：agent 聲稱「張隆志館長背書」「唐鳳為 Taiwan.md 引薦」，主 session 回頭驗證——兩者均無外部公開引語

**自檢問句**：「這個 claim 如果我是陌生記者，能不能只靠公開資料寫進我的報導？」能 → 可寫；不能 → 降級或刪。

#### Step 2.7.6: Title + description spine sync 🥪 🔴

> **特別強化**：所有 article（**含 EVOLVE focused section addition**）寫完 prose 後**必須回看 frontmatter title + description**，三題自檢：

1. **冒號三明治測試** — title 是否走「主題：副標 hook」格式？單純名詞 stub（`台灣無人機產業` / `颱風` / `周杰倫`）= 百科風格，需升。對照 [EDITORIAL §Title 強制冒號三明治（所有 category）](../editorial/EDITORIAL.md#title-強制冒號三明治所有-categoryv63) v6.3 — 不限 People，全 category 強制
2. **副標獨立成立測試** — 冒號後一句能不能單獨 tweet 出去？讀者只看到副標也能停下來嗎？
3. **EVOLVE spine sync 測試** — 這次 EVOLVE 加的新節核心矛盾，是否已寫進 description？舊 description 還適用嗎？description 沒吃進新核心 = SC 顯示舊 hook 但讀者點進來看到新內容 = 落差

**任一答 no → 重寫 frontmatter title + description，跟 prose 同 commit**。

**對照組**：

```
❌ 台灣無人機產業（百科 stub）
✅ 台灣無人機產業：從台中玩具飛機到藍色清單，一張入場券給了雷虎

❌ 颱風（百科 stub）
✅ 能預測風雨，預測不了命運：台灣與颱風的四百年

❌ 颱風假
✅ 颱風假：誰的假，誰的班
```

**例外**（保留 stub 名）：

- Hub 頁（`_*.md`）— 是 nav
- 系列共名（如 `台灣企業：台積電`）— 副標 hook 進 description

#### Step 2.7.7: 媒體素材 spine check 🎬 🔴

> **特別強化**：所有 article（含 EVOLVE）寫完 prose 後 grep 既有 frontmatter：

```bash
grep -E "^image:|^imageCredit|^imageLicense|^imageSource" knowledge/{Category}/{slug}.md
ls public/article-images/{category-lower}/ | grep {slug-keyword}
grep -E "^## 圖片來源|^## 媒體授權|^## 圖片授權" knowledge/{Category}/{slug}.md
```

**三條判斷**：

| 結果                                    | 處置                                                                                             |
| --------------------------------------- | ------------------------------------------------------------------------------------------------ |
| 三項全有                                | 已合規，跳過                                                                                     |
| 三項全無（pre-gate 遺珠）               | 補跑 Stage 1 Step 1.9 至少 hero 1 張，append §圖片來源 section                                   |
| Hero 有但 EVOLVE 加的新節主題缺對應視覺 | 評估是否需補 inline 圖（per Stage 4 Step 4.3.1 三段敘事節奏），找不到 PD/CC 圖記錄邊界（不放空） |

**為什麼必須**：

- Stage 1 Step 1.9 的 hard gate 是 2026-04-28 才升（v6.0 重編號前為 Step 1.14），更早 ship 的 article 多為 pre-gate 遺珠
- focused EVOLVE 加新節時容易忽略「既有 article 的媒體狀態」— 假設「上次 ship 已合規」，但 pre-gate 條目實際無 hero
- 找不到合適 PD/CC 圖時不可放空 → 走 fair use editorial commentary scope（per Step 1.9.2 第 8 點）或記錄 search 邊界

### Step 2.8: 富文本 + footnote 密度

每 300 字 ≥ 1 個 footnote（per [CITATION-GUIDE](../editorial/CITATION-GUIDE.md)）。

富文本元素（per EDITORIAL）：

- 📝 策展人筆記
- 💡 你知道嗎
- ⚠️ 爭議觀點
- ✦ 結尾警句

每 800-1200 字 ≥ 1 個富文本元素，幫助節奏 + 視覺呼吸。

### Stage 2 Hard gates（10 條）

寫完 prose 不直接進 Stage 3，先驗：

- [x] 結尾不是罐頭（per EDITORIAL §結尾的四種模式）
- [x] 第一個名字是具體的人（前 30 行至少一個 named individual）
- [x] ≥ 2 句真人引語（人物題材）
- [x] 因果鏈完整（不是 list dump）
- [x] 開場具體事實（年/月/日 + 人 + 動作）
- [x] 富文本達標（每 800-1200 字 ≥ 1）
- [x] 挑戰編織在故事裡（不是脫離敘事的論述句）
- [x] 純中文（無漏英文 paraphrase / 翻譯體）
- [x] 7 自檢全跑（Step 2.7.1-2.7.7 全過）
- [x] 小標題不像「第一章第二章」
- [x] word-count ≥ 4500 CJK chars（depth article）

---

## Stage 3: 驗（預算 15-20%）

**必讀**：`cat docs/editorial/QUALITY-CHECKLIST.md`

**流程**：嚴格按照 [QUALITY-CHECKLIST.md](../editorial/QUALITY-CHECKLIST.md) 逐項執行。包含 5 大步驟。

### Step 3.1: 五指 + 結構 + 塑膠 + 算術

1. **五指檢測**（手動 60 秒）
2. **結構驗證**（逐項打勾）
3. **塑膠掃描**（手動 90 秒，重點掃後半段）
4. **自動驗證**（quality-scan ≤ 3 + build）

**⚠️ 不合格 = 不 commit。修正後從 QUALITY-CHECKLIST.md 重新驗證。**

### Step 3.2: 事實鐵三角（強制鐵律）

> 來源：李洋文章 + 孢子 #28 同時犯三層事實錯誤（金額兩千萬→一千萬、單位三十六萬→三千六百萬、杜撰引語從英文回譯）被觀察者撤回的教訓。

#### Step 3.2.1: 算術自檢

寫完含金額/百分比/比例的段落，**必須做算術自檢**：

```
寫的句子：「兩千萬剛好是他存款的三成」
算術驗證：2000 / 3401 = 58.8% ❌（不可能是「三成」）
紅旗：金額一定有錯
```

**規則**：每一個「X 是 Y 的 Z 成」「比 X 多 Y」「等於 X 倍」這類數字關係**必須在心裡或用 python3 算一次**。算不通 = 至少有一個數字錯。

#### Step 3.2.2: 金額單位念出來

寫完含金額的句子，**必須念出來檢查單位**：

```
寫的句子：「一筆三十六萬負債的房貸」
念出來：「三十六萬」聽起來像月薪等級 ❌
真實數字：3,638 萬
紅旗：萬位漏字
```

**規則**：所有金額念出來，跟「日常生活感」對照。

- 萬：月薪、單月開銷
- 百萬：年收、小套房頭期款
- 千萬：豪宅、企業主資產
- 億：上市公司、政府預算

如果念出來的數字跟主題的「合理量級」對不上 = 紅旗。

#### Step 3.2.3: 引語逐字核對

每一個 `「XXX」` 直接引語格式**必須跟原始中文來源逐字核對**：

```
寫的引語：「我最早到學校，但跟不上齊麟。」
原始來源：《少年報導者》中文網頁
Ctrl-F 搜「我最早到學校」→ 搜不到 ❌
紅旗：杜撰引語
```

**陷阱來源**：WebFetch 對中文網站經常返回**英文 paraphrase 而非中文原文**。把英文 summary 翻譯回中文當「直接引語」使用 = 杜撰。

**規則**：

1. 引語格式 `「XXX」` 是承諾「這是原話」
2. 任何引語在 commit 前必須能在原始中文頁面 Ctrl-F 搜到
3. 搜不到 = 改成轉述句式（不加引號），不准用直接引語格式
4. 詳細紅線見 [EDITORIAL §挖引語制度](../editorial/EDITORIAL.md#挖引語制度)

#### Step 3.2.4: 三角自檢 checklist（強制）

- [x] **算術**：每個「X 是 Y 的 Z」「X 比 Y 多」都用 python3 算過？
- [x] **單位**：每個金額念出來跟「合理量級」對得上？
- [x] **引語**：每個 `「XXX」` 都能在原始中文頁面 Ctrl-F 搜到？

**任何一項打不勾 = 不 commit，回去修。**

### Step 3.3: FACTCHECK Quick Mode（A 級 / 政治敏感 → Full Mode）

> **本 step 是 [FACTCHECK-PIPELINE](FACTCHECK-PIPELINE.md) 的 trigger context**。完整 SOP、atom 類型、11 種 hallucination pattern、6 種 drift modes、Phase 1-6 執行細節、checklist 全部 SSOT 在 FACTCHECK-PIPELINE，本 step 不複寫（[MANIFESTO §指標 over 複寫](../semiont/MANIFESTO.md#我的進化哲學--指標-over-複寫) 原則）。
>
> **對應 [MANIFESTO §10 幻覺鐵律](../semiont/MANIFESTO.md#10-幻覺鐵律--寧可多檢查一次不要放出連自己都不知道是錯的資訊)。**

#### Quick Mode 觸發

REWRITE Stage 2 寫完 prose 後、進 Stage 4 之前，**必須跑 FACTCHECK-PIPELINE §Quick Mode**：

- **預算**：30-60 min（主 session 自跑，不 spawn agent）
- **範圍**：
  - 全文 high-risk atom 抽取（引語 + 數字 + 人名 + 獎項 + 地點門牌號碼 + 場景動作 detail）
  - 每個 atom 對 source URL 至少做一次驗證（中文 source 用中文 prompt 要求逐字）
  - footnote URL 健康檢查跑 `ARTICLE_HEALTH_NETWORK=1 python3 scripts/tools/article-health.py <article> --check=footnote-url`

#### 觸發 spawn agent 升級為 Full Mode 的條件

- article tier = A 級（≥ 50 footnotes 或 ≥ 3000 字 或 含直接引語 ≥ 10 句）
- article 對象為真人且可能引發人權／政治／法律敏感
- Quick Mode 過程中發現 ≥ 3 個 ❌ HARD-FIX → Quick 不夠，升級 Full Mode 重跑

#### Stage 3 Hard gates（FACTCHECK-PIPELINE Phase 6 Triage 結果必須）

- 0 個 🔴 DEAD-LINK（任何 footnote URL 4xx/5xx 都先換源）
- 0 個 ❌ HARD-FIX（claim 不在 source、引號內 paraphrase、third-person flip 等全部處置完）
- ⚠️ SOFT-FIX 數量無上限，但每條都要在 commit message 列出，可 ship 後 polish
- 每個 ❌ 與 🔴 的修補都 append 到 `reports/research/YYYY-MM/{slug}.md` § audit section（DNA #22 raw 永留）

#### 為什麼這條 step 是 hard gate 而非 soft

錯誤與幻覺以指數速率摧毀平台可信度。讀者會記得錯誤、截圖到 Threads、引用為「Taiwan.md 是 AI 廢文」的證據；不會記得其他幾百篇正確的文章。**寧可多檢查一次，也不要放出連自己都不知道是錯的資訊**（[MANIFESTO §10](../semiont/MANIFESTO.md)）。

### Step 3.4: Story atom audit（場景級事實對 source Ctrl-F）

對 prose 中每個「場景描述」（具體動作、房號、樓層、影廳代號、設備代號、職稱、場地細節），對 source URL **逐原子 Ctrl-F**：

- 例：造山者 EVOLVE 寫「張忠謀電影散場向觀眾鞠躬三次」→ UDN 原報導 Ctrl-F「鞠躬」→ 0 hits → ❌ HARD-FIX
- 例：「Morgridge Hall 1524 房號」→ 星島原文 Ctrl-F「1524」→ 0 hits → ❌
- 例：「李國鼎獎頒獎場合用四機補拍」→ gvm 原文 Ctrl-F「四機」→ 0 hits → ❌

這類「沒有引號保護的具體動作 / 場地細節」是 AI hallucination 最隱蔽的 pattern（讀起來像「氛圍描寫」不像「引用」），audit 容易跳過。

**唯一可靠的審計**：全文逐原子對 source URL Ctrl-F 中文原文。發現 → 刪除或降級為「該領域受肯定」這類概括語言，**不保留可能錯也可能對的條目**。

### Step 3.5: Title + description spine sync re-check 🥪

承襲 Stage 2 Step 2.7.6（已在 Stage 2 跑過寫作 self-check）。Stage 3 再 grep 一次做 verify 階段最終 gate：

```bash
grep -E "^title:|^description:" knowledge/{Category}/{slug}.md
```

人工 review：

- title 冒號三明治？
- description 吃進核心矛盾？

不過 → 回 Stage 2 重寫 frontmatter。

**為什麼 Step 2.7.6 + Step 3.5 兩次跑同條 check（deliberate redundancy）**：

- Step 2.7.6 = 寫完 prose 立刻自檢（catch early，趁記憶新鮮）
- Step 3.5 = ship 前最後 gate（catch leak through，防 Step 2.7.6 被跳過）

兩次 check 是雙重保險，不是重複。Title 三明治是 SC 入口品質 + reader entry framing 的 spine，不能漏。

---

## Stage 4: 形（Format + Media，預算 5-10%）

**Stage 3 commit 前最後關。**

這一步跟 Stage 3 不同——Stage 3 檢查「寫得好不好 + 事實對不對」，Stage 4 檢查「結構對不對 + 媒體插得對不對」。

### Step 4.1: article-health.py --profile=rewrite-stage-4

#### 強制執行（不是建議，是反射）

```bash
python3 scripts/tools/article-health.py knowledge/{Category}/{文章}.md --profile=rewrite-stage-4
```

`rewrite-stage-4` profile 含 7 個 plugin（HARD all）：

| Plugin               | 檢查內容                                                                             |
| -------------------- | ------------------------------------------------------------------------------------ |
| `frontmatter-format` | 必要欄位 + 順序                                                                      |
| `format-structure`   | 30 秒概覽 / 延伸閱讀 / 參考資料 section 存在                                         |
| `wikilink-target`    | wikilink 對應檔案存在                                                                |
| `link-target`        | markdown link path casing + existence                                                |
| `cjk-punct`          | 中文 prose 全形標點                                                                  |
| `chronicle-lead`     | H2 不是 `## YYYY 年 X 月` 編年體                                                     |
| `word-count`         | depth article ≥ 4500 CJK chars（v3.1 sad-shockley 新增，HARD via severity_override） |

**Pre-commit hook 已自動執行**這幾項檢查（SSOT pre-commit profile 自 2026-05-04 Phase 10 接管）。如果被擋：按提示修正，**不要用 `--no-verify` 繞過**。

> **為什麼要強制？** 2026-04-04 我在台灣國樂的延伸閱讀寫了 7 個 `[[wikilink]]`，忘記 Astro 不渲染。規則在本文件 v2.10 已經寫過、工具 wikilink validation 存在——然後還是寫錯了。教訓：**擁有工具 ≠ 使用工具**。所以現在寫進 pre-commit 強制執行。

#### 格式範本檢查清單（手動 audit）

```
□ Frontmatter 完整（title/description/date/category/tags/subcategory/author/featured/lastVerified/lastHumanReview）
□ 30 秒概覽存在（blockquote 格式，開頭 > **30 秒概覽：**）
□ 正文小標題不是問句（除非問句本身是核心矛盾）
□ 延伸閱讀區塊存在且格式正確：
    - 標題是 **延伸閱讀**：
    - 每條用標準 Markdown 連結（不是 [[wikilink]]）
    - 每條有一兩句話描述
    - 3-5 條
□ ## 參考資料 標題存在，且在腳註定義之前
□ 腳註格式正確：[^n]: [來源名稱](URL) — 完整描述文字
□ 沒有殘留的舊格式（## 參考資料 下面不該有 bullet list 式的來源）
□ word-count ≥ 4500 CJK chars（v4 新 hard gate）
```

**⚠️ 格式不合格 = 修正後重新檢查。不進 Step 4.3。**

### Step 4.2: 多語 visual smoke test（i18n 改動時）

> **觸發條件**：commit 涉及任何 i18n 系統 / 多語系路由 / homepage components / `src/pages/{lang}/` / `src/i18n/`、或加新語言、或大型 sed 批次替換。
> 對應 [DNA #19 大型 refactor 後 visual smoke test](../semiont/DNA.md#四工程衛生)。

**強制 SOP**（6 步）：

```bash
# 1. Build verify
npm run build  # 必須 ✅ all categories healthy

# 2. Cascade prevention test（驗 Phase 1 fix 仍 work）
F="dist/fr/people/index.html"
grep -oE '"/[a-z][a-z-]*/people"' "$F" | sort -u
# 預期：/en/people、/ja/people、/ko/people、/fr/people（+ /es/people if dropdown 完整）
# 不應出現：/ja/fr/people、/ko/fr/people 等 cascade URL

# 3. 5 langs 結構對齊檢查
for L in '' en ja ko fr es; do
  if [ -z "$L" ]; then f="dist/index.html"; lang="zh-TW"; else f="dist/$L/index.html"; lang="$L"; fi
  echo "$lang: halls=$(grep -c 'exhibition-hall' $f) RD=$(grep -c 'Random' $f)"
done
# 預期：5 langs 都有 exhibition halls + RandomDiscovery

# 4. Wrong-language prose 檢查（fr/es 不該含日文/中文 hardcoded）
for L in fr es; do
  hits=$(grep -c -P "[\x{3040}-\x{309F}\x{30A0}-\x{30FF}]" "dist/$L/index.html")
  echo "$L: $hits 平假名/片假名 occurrences"
done
# 預期：0 / 0

# 5. LANGUAGES_REGISTRY SSOT 對齊
bash scripts/tools/check-hardcoded-langs.sh

# 6. i18n coverage audit
bash scripts/tools/i18n-coverage-audit.sh
```

**任何一項失敗 = revert 該 commit，不 ship**。歷史教訓：Tailwind Phase 6 反向 sed 讓 ja/ko 壞 2 天 / fr 上線 cp + sed 漏抓日文 prose 持續 1 天 / fr/es 路由疊加 cascade 4 天才被發現——三次都因為缺這層 smoke test。

### Step 4.3: 媒體插入

**觸發時機**：Step 4.1 format-check 通過後、Stage 5 cross-link 之前。

**為什麼這時插入**：寫完 prose 才知道「實際敘事節奏在哪、哪段需要 visual 呼吸」。寫之前布陣會綁死寫作節奏；寫完一次插入更自然。

**依賴**：Stage 1 Step 1.9 必須完成（媒體授權矩陣三表 append research 檔 + 圖片已 cache）。沒做 → 退回 Stage 1 Step 1.9。

#### Step 4.3.1: 三段敘事節奏判斷

媒體插入位置影響敘事節奏，不是隨便塞。三段標準：

| 位置          | 用途                          | 圖型                  | 數量 | 範例                            |
| ------------- | ----------------------------- | --------------------- | ---- | ------------------------------- |
| **hero**      | 30 秒概覽前，建立人物視覺認知 | 16:9 landscape 或 1:1 | 1    | 林琪兒 EMU 2014                 |
| **scene-mid** | 中段重要轉折前                | landscape 為主        | 0-2  | Expedition 42 / Crew-4 training |
| **closure**   | 結尾段視覺收尾（首尾呼應）    | landscape             | 0-1  | 訪台首日場景照（如有）          |

**判準**：

- depth-article（≥ 3000 字）：hero + 1-2 scene-mid，總共 2-3 張
- 短文 / Hub：hero only（1 張）
- 翻譯文：跟原文同步圖片（不另增）

**Scene-mid 位置規則**：圖放在「該段 narrative 開始前」而不是「該段中間」：

```markdown
## 紅色 LED 下的第一口萵苣 ← 小標題

[圖：Expedition 42 三人合影] ← 圖放這裡
_caption_

prose 開始... ← 文字接續
```

**呼吸原則**（呼應 EDITORIAL §密度平衡）：連續 3 段以上密集事實段（≥ 200 字 / 段）→ 中間插入一張 scene 圖作為視覺呼吸。

#### Step 4.3.2: 圖檔 fetch + cache + naming

依 Stage 1 Step 1.9.2 的 manifest 已 cache 完成。Step 4.3.2 僅做最後 verify：

```bash
# 確認所有 manifest 列出的圖檔都存在於 public/article-images/
ls public/article-images/{category}/

# 必要時補抓（若 Stage 1 未完成全部圖）
mkdir -p public/article-images/{category}/
curl -sL -A "Mozilla/5.0 Taiwan.md/1.0" "{hi-res-url}" \
  -o public/article-images/{category}/{slug}-{topic}-{year}.{ext}

# 確認 file format + 大小 + EXIF GPS 已清
file public/article-images/{category}/{filename}
sips -g pixelWidth -g pixelHeight public/article-images/{category}/{filename} | tail -3

# 必要時 resize / re-encode（hero < 600KB / inline < 400KB）
sips -Z 2000 --setProperty formatOptions 85 public/article-images/{category}/{filename}

# 清 EXIF GPS / 個人資訊（保留 description / copyright）
exiftool -gps:all= -location:all= -DeviceMfgr= -DeviceModel= public/article-images/{category}/{filename}
```

#### Step 4.3.3: Aspect ratio 護欄

```bash
bash scripts/tools/check-aspect.sh public/article-images/{category}/{filename}
```

| 圖種          | 必過範圍            | 歷史教訓                                                             |
| ------------- | ------------------- | -------------------------------------------------------------------- |
| **hero**      | 0.9 ≤ aspect ≤ 2.0  | lindgren-crew4-portrait.jpg 1041×1561 (0.67) 切到頭 → 換 1041×694 ✅ |
| **inline 圖** | 0.75 ≤ aspect ≤ 2.5 | Expedition 42 4896×3264 (1.5) ✅ / EMU 1692×1691 (1.0) ✅            |

不過 → **換圖**（不要強塞）。

#### Step 4.3.4: Markdown 插入 + caption + alt text

**標準格式**：

```markdown
![alt text 描述](/article-images/{category}/{filename}.jpg)
_caption 說明文字。Photo: {credit}. [License via {source}]({source-url})._
```

**Alt text 規則**（accessibility 必需）：

- 描述「畫面內容」不是「圖名」
- 涵蓋：誰 + 在哪 + 做什麼 + 拍攝氛圍
- 30-80 字
- 不重複 caption 文字

**範例對比**：

```markdown
❌ 壞 alt text（只有圖名）：
![林琪兒 2014](/article-images/people/lindgren-emu-2014.jpg)

✅ 好 alt text（描述畫面）：
![林琪兒 2014 年穿艙外活動服（EMU）官方人像，全套白色 NASA 太空服，仰角拍攝顯示頭盔反光](/article-images/people/lindgren-emu-2014.jpg)
```

**Caption 規則**：

- 用 markdown italic `_..._`（不用 HTML `<figcaption>`）
- 結構：`{時間 + 地點 + 事件}。Photo: {攝影者 / 機構}. [License via {source}]({URL})。`
- 中文 prose 風格，跟 article 一致
- 關鍵 metadata（NASA Image ID / Commons file name）放括號註

#### Step 4.3.5: 授權清單同步

每張 inline 圖插入後，**強制同步**：

**1. frontmatter**（hero only）：

```yaml
image: '/article-images/{category}/{filename}.jpg'
imageCredit: '攝影者 / 機構'
imageLicense: 'Public domain (NASA)' / 'CC BY-SA 4.0' / etc
imageSource: '{source-URL}'
```

**2. 文末「## 圖片來源」section**（所有圖）：

```markdown
## 圖片來源

本文使用 N 張公有領域 / CC 授權圖片，全部 cache 於 `public/article-images/{category}/` 避免熱連結來源伺服器：

- [圖檔 1 標題](source-URL) — Photo: 攝影者, YYYY-MM-DD, License, NASA Image ID 或 Commons file
- [圖檔 2 標題](source-URL) — ...
```

#### Step 4.3.6: 圖片健康檢查（plugin gate）

```bash
python3 scripts/tools/article-health.py knowledge/{Category}/{slug}.md --check=image-health
```

預期檢查：

- ✅ 文中所有 `![]()` 連結對應檔案存在
- ✅ Frontmatter `image:` 存在 + credit + license + source
- ✅ 文中無外部熱連結（http/https URL 不在 `/article-images/`）
- ✅ `## 圖片來源` section 存在
- ✅ 所有圖全部有完整 metadata（攝影者 / license / source URL）

**不通過 → 不進 Stage 5。**

### Stage 4 Step 4.3 邊界與例外

- **Hub 頁**（`_*.md`）：不放圖，跳過 Step 4.3
- **短修正 / heal commit**：不重新走 pipeline，圖用既有的不動
- **翻譯文**：跟原文圖同步（cache 共用），caption 翻譯成對應語言
- **沒有合適媒體素材**：明確標 `no-media` 進 research 檔，跳過 Step 4.3
- **觀察者直接丟連結**（如林琪兒 ι session）：走 Step 4.3.2-4.3.6 補圖 SOP，不走 Stage 1 Step 1.9
- **Article ship 後才發現缺圖**：spawn `heal:` commit + 走 Step 4.3

### 跟 spore 配圖區分

| 圖種                  | 路徑                           | 用途                    | 生成方式                                 |
| --------------------- | ------------------------------ | ----------------------- | ---------------------------------------- |
| article hero / inline | `public/article-images/{cat}/` | 文章內容                | Stage 1 Step 1.9 + Stage 4 Step 4.3 手動 |
| OG 社群分享           | `public/og-images/{cat}/`      | facebook / twitter card | dashboard 自動 derive                    |
| spore poster          | `public/spore-images/`         | Threads / X 配圖        | `make-spore.sh` 自動                     |

不要嘗試共用 — spore 是 social 媒介，需要不同 aspect 跟 brand overlay。article 圖 cache 完整／spore 圖 ephemeral，分開管理。

---

## Stage 5: 連（Cross-link，預算 5%）

### Step 5.1: 掃描 knowledge/ 找相關文章

```bash
ls knowledge/{Category}/ | grep {keyword}
grep -r "主題關鍵詞" knowledge/{Category}/
```

**判斷標準**：

- ✅ 讀者讀完那篇後會自然想知道本文主題
- ✅ 兩篇文章有實質的知識關聯（不只是同 category）
- ❌ 不要為了連結而連結（「台灣」不需要連到每篇文章）

### Step 5.2: 雙向延伸閱讀（forward + reverse）

#### Forward：本文 → sibling

延伸閱讀格式（與 Stage 2 Step 2.6 一致）：

```markdown
**延伸閱讀**：

- [台灣氣候危機與淨零轉型](/nature/台灣氣候危機與淨零轉型) — 氣候變遷如何驅動台灣的能源轉型與產業結構重組
```

#### Reverse：sibling → 本文

到 sibling 文章加指向本文的延伸閱讀條目。

**Commit 格式**：`cross-link: 為「{文章名}」建立雙向延伸閱讀`

⚠️ **只改延伸閱讀區塊。不要順便「改善」其他文章的內容。**

### Step 5.3: Sibling 格式預檢

補 reverse cross-link 進 sibling 文章前，**強制跑 sibling 格式預檢**：

```bash
python3 scripts/tools/article-health.py knowledge/{Category}/{sibling}.md --check=format-structure
```

三種狀態對應動作：

| sibling 格式狀態                             | 動作                                                                                                   |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| ✅ PASS                                      | 直接補 reverse cross-link，commit                                                                      |
| ⚠️ WARNING（pre-existing 警告 / 不影響功能） | 仍可 commit（hook 接受 warning），commit message 說明「sibling 有 pre-existing X warning」             |
| ❌ FAIL（pre-existing 不合格）               | **DEFER reverse cross-link** + 開 follow-up issue 標 sibling 需獨立 EVOLVE，不繞過 hook 也不擴大 scope |

**為什麼這條是硬規則**：補 reverse cross-link 是 Stage 5 的 1 行修改，不該把 sibling 的 pre-existing tech debt 帶進來變成大改。如果 sibling 真的不合格（例：書目格式 footnote 沒 URL），應該開獨立 EVOLVE issue 處理那篇，不該因為一個 cross-link 強行碰整個 sibling。

**觸發**：2026-05-02 EVOLVE-batch — 兩廳院 EVOLVE 嘗試補 reverse cross-link 進中正紀念堂，pre-commit hook 失敗（中正紀念堂有 12 條書目格式 footnote pre-existing 不合 Taiwan.md `[^n]: [Name](URL) — desc` standard）。Defer 到獨立 EVOLVE issue 是正確處理。

### Step 5.4: Astro redirect 5 lang + 刪舊檔（Merge variant only）

整併獨有的收尾，**四件事缺一不可**：

#### Step 5.4.1: Astro redirect（5 lang 全寫）

`astro.config.mjs` `redirects:` 區塊：

```javascript
'/{old-category}/{zh-slug}': '/{new-category}/{zh-slug}/',
'/en/{old-category}/{en-slug}': '/en/{new-category}/{new-en-slug}/',
'/ja/{old-category}/{ja-slug}': '/ja/{new-category}/{new-ja-slug}/',
'/ko/{old-category}/{ko-slug}': '/ko/{new-category}/{new-ko-slug}/',
'/fr/{old-category}/{fr-slug}': '/fr/{new-category}/{new-fr-slug}/',
```

**不可省任一語系**——舊 URL 在 SC / 外站可能任何語系都有 backlink。漏一個語系就漏一條 SEO 流量。

#### Step 5.4.2: 刪除被併方原檔（5 lang + sync 鏡像）

- `knowledge/{old-category}/{原檔}.md`（zh-TW）
- `knowledge/{en,ja,ko,fr}/{old-category}/{translation-slug}.md`
- 跑 `bash scripts/sync.sh`，`src/content/` 鏡像會跟著刪
- 確認 `git status` 顯示 zh-TW + 4 lang knowledge + 對應 src/content 全部 deleted

#### Step 5.4.3: Cross-link audit

- `grep -rn "被刪 slug" knowledge/ src/` — 找所有引用
- 出現的 wikilink / markdown link 改指 canonical（或刪除）
- Hub 頁面（`_*.md`）裡的舊條目改指 canonical

#### Step 5.4.4: Build verify

- `npm run build` 必須過（會驗 redirect 語法）
- 隨機開一個被刪的舊 URL 試 redirect 是否真的轉到 canonical
- sitemap 應減少對應數量的 entry

#### Merge variant commit message

- commit prefix 用 `🧬 [evolve+merge]`（不是純 `[evolve]`）
- commit body 列：保留誰、為何、EVOLVE 進去什麼、刪了哪幾個檔、設了哪幾條 redirect
- reply issue 必附 commit hash，並說明「未來類似問題會走整併變體 SOP」

### Boundary variant cross-link

每篇單獨走完整 Stage 1-5 流程。Step 5.2 雙向延伸閱讀時要互相反向回補（C 寫完 → 加進 B/D 延伸閱讀；B 寫完 → 加進 C/D；以此類推），形成完整 sibling 網路。

#### Boundary variant commit message

- 多篇分多 commit / 多 phase（不要硬塞同 commit）
- 每個 phase commit prefix 仍用 `🧬 [semiont] rewrite:` + 描述含 `Phase N/M`
- Issue 留 open，每個 phase 完成 update comment，全部 phase ship 後才 close

---

## ✅ Article shipped (zh-TW canonical)

中文 ship 後，**翻譯走獨立 pipeline，不在本 pipeline scope**。

## 翻譯：跨 pipeline boundary 指標

> **本 Pipeline 只產中文版。100% 的 token 預算都給中文版**。翻譯**不**在本 pipeline scope，是另一條獨立 pipeline 的職責。

Stage 5 完成（中文版 ship）後，視觸發條件決定走哪條翻譯 pipeline：

| 觸發條件                               | 走哪條 pipeline                                                            |
| -------------------------------------- | -------------------------------------------------------------------------- |
| 觀察者拍板「現在翻單篇 X 語言」        | [TRANSLATION-PIPELINE.md](TRANSLATION-PIPELINE.md)                         |
| Routine 觸發多語 batch sync（5 langs） | [SQUEEZE-MODELS-MAX-PIPELINE.md](SQUEEZE-MODELS-MAX-PIPELINE.md)（巴別塔） |
| 不翻 / 之後再說                        | 結束。中文版本身就是完整 ship 結果                                         |

**為什麼從本 pipeline 抽掉**（v4.1 起，v5.0 保留）：

- Stage 6 在 v4.0 是 pointer-only section（只是「詢問觀察者要不要翻 + 跳到另一檔」），不算真正的 stage
- 抽掉後，主 pipeline 變 5 stage 線性（Stage 1-5），更乾淨
- 翻譯有自己的觸發、預算、品質 gate（巴別塔的 priority schema P0/P1/P2/P2.5/P3 + 4-tier cascade），不該被當成 REWRITE 的尾巴
- 對應觀察者 callout（2026-05-11 sad-shockley）：「翻譯環節可以整個抽掉，直接變指標到巴別塔 pipeline」

**REWRITE 跟翻譯 pipeline 的分工**：

- REWRITE-PIPELINE：產 high-quality **中文版**（zh-TW canonical），到 ship 上 main 為止
- TRANSLATION-PIPELINE：單篇 X 語言翻譯（觀察者主動觸發）
- SQUEEZE-MODELS-MAX-PIPELINE：多語 batch sync（routine 自動跑，主權的巴別塔）

---

## Cron 模式 + Routine 飛輪

> Cron 在單一 session 執行，無法真正分三個 session，但在 prompt 中強制分階段思考。

### Token 預算分配

| 階段      | 佔比   | 常見錯誤                          |
| --------- | ------ | --------------------------------- |
| Stage 1   | 35-40% | 搜太多、每個結果都 web_fetch 全文 |
| Stage 2   | 40-45% | 前半段太細、後半段沒力            |
| Stage 3-5 | 15-20% | 跳過驗證直接 commit               |

### Cron 鐵律（與手動執行不同的地方）

- **每批最多 1 篇**：v1 時期每批 3 篇，品質明顯不穩。改成每批 1 篇後品質大幅提升
- **不要 `git add -A`**：只 add 改動的文章和同步後的 `src/content/` 對應目錄
- **不要跑 `npm run build`**：Build 由 CI/CD 處理。sub-agent 跑 build 容易 timeout 且浪費資源
- **至少 7 分鐘**：Stage 1 3min + Stage 2 2min + Stage 3-4 2min = 最低要求

### 選文指令

```bash
cd ~/taiwan-md && git pull
# 佇列頂端，跳過已重寫的
head -30 scripts/tools/rewrite-queue.txt
git log --oneline --since='2026-03-20' | grep -i 'rewrite:' | head -30
```

### Commit 指令

```bash
bash scripts/core/sync.sh
python3 scripts/tools/article-health.py knowledge/[Category]/[文章名].md --profile=rewrite-stage-4
git add knowledge/[Category]/[文章名].md src/content/
git commit -m "rewrite: [文章名] — EDITORIAL v6.3 + Pipeline v5.0"
git push
```

### Cron 狀態

| Cron                              | 狀態        | 說明                                                        |
| --------------------------------- | ----------- | ----------------------------------------------------------- |
| Taiwan.md Article Quality Rewrite | ❌ disabled | 每小時 1 篇，Opus model（舊）                               |
| taiwan-md-rewrite (v1)            | ❌ disabled | 舊版每小時 3 篇，已淘汰                                     |
| taiwan-md-content-sprint          | ❌ disabled | 內容衝刺（新文章），已淘汰                                  |
| **twmd-rewrite-daily**            | ✅ active   | 16:16 daily Opus（per [ROUTINE.md](../semiont/ROUTINE.md)） |

### Routine 飛輪整合

REWRITE 是 routine 飛輪 10 條核心 routine 之一（`twmd-rewrite-daily`）。每天 16:16 自動跑：

- **觸發**：`/twmd-rewrite` skill
- **Model**：Opus
- **Cadence**：每天 16:16
- **Skill SOP**：[`.claude/scheduled-tasks/twmd-rewrite-daily/SKILL.md`](../../.claude/scheduled-tasks/twmd-rewrite-daily/SKILL.md)
- **Quality gate**：article-health.py rewrite-stage-4 hard=0 + 三源研究落檔 + 腳註合規 + frontmatter complete + word-count ≥ 4500
- **Boundary**：本 routine 上限 ~60 min wall-clock；超過 → partial PR + LESSONS entry

完整 routine 規格 → [ROUTINE.md §TWMD rewrite (daily)](../semiont/ROUTINE.md)。

---

## 品質分級

| 等級       | 條件                                                     | 動作                    |
| ---------- | -------------------------------------------------------- | ----------------------- |
| ✅ PASS    | hollow ≤ 3 + 五指全過 + 結尾不是罐頭 + word-count ≥ 4500 | commit + push           |
| ⚠️ PARTIAL | hollow ≤ 3 但結尾/富文本不足 / word-count 4000-4499      | 標記待改善，下輪優先    |
| ❌ FAIL    | hollow > 3 或有事實錯誤 / word-count < 4000              | 不 commit，回到 Stage 1 |

---

## 實戰教訓索引

1. **一次一篇**：多個 sub-agent 同時跑 = 搶檔案 + timeout + 殭屍 session
2. **至少 7 分鐘**：Stage 1 3min + Stage 2 2min + Stage 3-4 2min = 最低要求
3. **prompt 裡寫「立刻執行，不要重述任務」**：否則 AI 花 30% 時間重述指令
4. **量化指標是 pre-filter 不是品質保證**：塑膠句數=0 ≠ 好文章，必須逐篇讀
5. **塑膠會變種**：AI 把被禁句式微調成看似不同的版本（"展現了"→"印證了"→"彰顯了"）
6. **Build 驗證不能省**：YAML frontmatter 偶爾壞掉，一篇壞 = 整個 category 炸
7. **結尾最後寫 = 品質最差**：v2 改成結尾先行（Stage 2 Step 2.2）
8. **觀察者反覆 callout 同問題 → DNA #15 反覆浮現要儀器化** → 升 plugin gate（chronicle-lead / word-count / Title+desc spine sync）
9. **EVOLVE 容易漏 Stage 1 Step 1.9 媒體素材**（v5 之前為 Step 1.14）：pre-2026-04-28 條目多無 hero / 無 §圖片來源 = pre-gate 遺珠，補 EVOLVE 時必查
10. **EVOLVE 容易漏 frontmatter spine sync**：title 是百科 stub / description 沒吃進新核心 = SC 顯示舊 hook 但讀者點進來看到新內容 = 落差

---

## Quick Commands（手動執行用）

```bash
# 寫完文章後一次跑完 Stage 4 驗證
bash scripts/core/sync.sh
python3 scripts/tools/article-health.py knowledge/{Cat}/{文章}.md --profile=rewrite-stage-4
python3 scripts/tools/article-health.py knowledge/{Cat}/{文章}.md --check=image-health

# 全部通過才 commit
git add knowledge/{Cat}/{文章}.md src/content/
git commit -m "🧬 [semiont] rewrite: {文章名} — EDITORIAL v6.3 + Pipeline v5.0"
git push
```

---

_v6.0 | 2026-05-11 admiring-montalcini-ec53b4 — Stage 0 觀點獨立 stage：新增 Stage 0「觀點」（6 step：模式識別 / 既有素材萃取 / 選 canonical / 範圍切片 / 載入方法論 / 觀點成型）作為 editorial vision 階段，與 Stage 1 取材的 data gathering 階段認知模式分離。觀點成型 6 核心問題（記憶 / 多元面貌 / 想法感受 / 歷史脈絡 / 社會關聯 / 類型專屬）+ 7 品質維度（溫度 / 人味 / 故事 / 策展 / 觀點 / 體驗 / 歷史社會關聯）+ 5 row 類型加權矩陣（People / Food-Culture / History-Politics / Tech-Industry / Nature-Geography）。允許輕量探索性搜尋 ≤ 5 次。§觀點成型 落 research report + frontmatter `viewpoint_formed: true` 為 HARD GATE，不過不進 Stage 1。原 Stage 1 Step 1.6-1.14 重編為 1.1-1.9，原 Step 1.1-1.5 移至 Stage 0。觸發：哲宇 2026-05-11 callout「重點在溫度 / 人味 / 故事 / 策展 / 觀點 / 體驗 / 與社會歷史環境跟我們人生的關聯」+「希望加一個觀點成型的步驟，總編輯視角看這個主題怎麼寫才會立體」+「想要獨立一個 stage」。Dogfood: [蘋果西打 PR #1041](https://github.com/frank890417/taiwan-md/pull/1041) research report 補 retroactive §觀點成型 section 作為首個案例。_

_v5.0 | 2026-05-11 admiring-cohen-8b68fc — Stage spine restoration：heading 階層 H1-H4 統一深度（文件 H1 / Stage H2 / Step H3 / sub-step H4）+ Step 編號正規化 N.M（解 v4.1 `## Step A-X` 5 套並排 grep collision）+ ASCII spine 顯化在頂部 + Stage 6 翻譯維持 v4.1 抽掉狀態指向巴別塔。觸發：哲宇 callout「用 v4 的精神進化 v3 — 所有步驟都是相同的，每篇都要跑過，只有第一個步驟有判定模式」。設計理由：[reports/rewrite-pipeline-v5-stage-spine-design-2026-05-11.md](../../reports/rewrite-pipeline-v5-stage-spine-design-2026-05-11.md)。_

_最近 milestone（完整 changelog → `git log docs/pipelines/REWRITE-PIPELINE.md`）_：

- **v6.0**（2026-05-11 admiring-montalcini-ec53b4）— Stage 0 觀點獨立 stage：editorial vision 階段先於 data gathering；6 核心問題 + 7 品質維度 + 5 類型矩陣；§觀點成型 HARD GATE
- **v5.0**（2026-05-11 admiring-cohen-8b68fc）— Stage spine restoration：H1-H4 階層一致 + Step N.M 編號 + ASCII spine 在頂部；v3.0 spine 骨架 × v4 單檔載體 × v4 evolved 內容（影音必找 + 標題三明治不丟）
- **v4.1**（2026-05-11 sad-shockley）— Stage 6 抽掉 → 巴別塔 pipeline 指標；REWRITE 變 5 stage 線性
- **v4.0**（2026-05-10 sad-shockley）— 單檔收斂 + 模式收進 Stage 1 + 編號正規化 + ASCII diagram 在最前
- **v3.1**（2026-05-10 sad-shockley）— Hard Gate Inventory 加 Title+desc spine sync + 媒體素材 v3.1 雙條反射；EDITORIAL §Title 從 People-only 擴為全 category
- **v3.0**（2026-05-09 brave-kirch）— 1290 → 280 行（-78%）+ 拆 6 sub-canonical（**v4 已收斂回**）
- **v2.20**（2026-04-28）— 新增 Stage 1.7 媒體素材研究 + Stage 4.5 媒體插入（v4 收進 Stage 1 Step L + Stage 4 Step C，v5 改為 Step 1.14 + Step 4.3）
- **v2.18**（2026-04-21）— Stage 1 agent 選型 + 私有 SSOT 整合 + Stage 2 密度平衡 + Agent claim 驗證

🧬
