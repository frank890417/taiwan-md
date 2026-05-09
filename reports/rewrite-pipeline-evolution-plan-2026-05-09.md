# REWRITE-PIPELINE 進化計畫 — 從 1290 行混合層到 6 sub-canonical 生態系

> Session: `2026-05-09-202256-brave-kirch`
> 觸發：哲宇「參考過去整理 spore-pipeline 完整整理拆分的報告與策略思考和經驗記憶，完整分析 rewrite-pipeline 並提出第一性原理重組與最佳化的分析與規劃到 report」
> 階段：**評估 + 思考**（未動工，等哲宇 3 題校準後才提具體 PR scope）
> 對應方法論：[EVOLVE-PIPELINE Mode 3 Pipeline 自我重組](../docs/pipelines/EVOLVE-PIPELINE.md)（7 stage SOP：SCAN → DESIGN → SPLIT → REWIRE → INSTRUMENT → VERIFY → SHIP）
> 前案參考：[reports/spore-pipeline-evolution-plan-2026-05-08.md](spore-pipeline-evolution-plan-2026-05-08.md)（SPORE 1334 → 445 行 -66.7% 成功案例）

---

## 1. 問題 statement

REWRITE-PIPELINE.md 從 v1（2026-03 初）走到 v2.20（2026-04-28），累積 **1290 行**。寫一篇 5000 字深度文要讀 1290 行 SOP（**比例 0.26:1**），文檔密度看起來比 SPORE 健康（SPORE 是 7:1 離群值），但 **內部結構問題不亞於 SPORE 老版**。

直觀症狀（per HEARTBEAT.md Beat 3 §改寫文章鐵律 已硬性鐵律：「越熟悉的任務越容易省略 SOP」第 N 次驗證）：

- Stage 1（research）內部 269 行 / 13 個編號子步驟 + 5 個 §1.7 子層 = 18 個 mental check items
- Stage 4.5（media insertion）187 行 / 6 個 §4.5 子層 = 7 個 mental check items
- 多模式（Fresh / Evolution / Merge variant / Boundary Redraw variant）藏在 §進化模式 vs §全新模式 段落，無主索引
- 7 個 hard gate 散落無 inventory 表（Stage 1 / 1.7 / 3 / 3.5 / 4 / 4.5 / 5.1）
- v2.13-v2.20 累積的 Step #9-#13 寫作規則大部分**沒儀器化**（仍是 prose 提醒）

對比 SPORE 老版（1334 行）：

| 維度                    | SPORE 老版 v2.9 | REWRITE 當前 v2.20      |
| ----------------------- | --------------- | ----------------------- |
| 總行數                  | 1334            | **1290**                |
| 產品字數                | 200             | 5000                    |
| 文檔密度比              | 7:1（離群值）   | 0.26:1（健康）          |
| 編號最深層              | 三層（4.5e.iv） | 兩層（1.7b / 4.5f）     |
| 模式數                  | 1               | **4**（Fresh + 3 變體） |
| Stage 內部 sub-step Top | Step 3c × 18    | Stage 1 × 18            |
| Hard gate inventory     | 無              | 無                      |

REWRITE 跟 SPORE 在「**單 stage 內部 sub-step 過載 + hard gate 無 inventory + prose 規則沒儀器化**」三個維度同構。

---

## 2. 規模盤點（Stage 1 SCAN）

### 主檔 + ecosystem

```
docs/pipelines/
├── REWRITE-PIPELINE.md       1290 行    ← 本檔聚焦
├── FACTCHECK-PIPELINE.md      ~700 行   ← Stage 3.5 觸發（pointer，已分檔）
├── DIARY-PIPELINE.md          ~500 行   ← Beat 5 用，獨立
├── MEMORY-PIPELINE.md         ~500 行   ← Beat 4 用，獨立
└── EVOLVE-PIPELINE.md          643 行   ← Mode 3 SOP source

docs/editorial/
├── EDITORIAL.md                686 行    ← Stage 2 必讀（品質基因 SSOT）
├── RESEARCH.md                ~700 行   ← Stage 1 必讀
├── RESEARCH-TEMPLATE.md       ~250 行   ← Stage 1 模板
├── QUALITY-CHECKLIST.md       ~400 行   ← Stage 3 必讀
├── CITATION-GUIDE.md          ~300 行   ← Stage 2 必讀
└── TERMINOLOGY.md             ~200 行   ← Stage 2 用語
```

REWRITE 當前實際 read 主路徑（per HEARTBEAT.md Beat 3 §改寫文章鐵律）：

- Stage 1：REWRITE 1290 + RESEARCH 700 + RESEARCH-TEMPLATE 250 = **2240 行**
- Stage 2：REWRITE 1290 + EDITORIAL 686 + CITATION-GUIDE 300 = **2276 行**
- Stage 3：REWRITE 1290 + QUALITY-CHECKLIST 400 = **1690 行**
- Stage 3.5：REWRITE 1290 + FACTCHECK 700 = **1990 行**
- Stage 4-5：REWRITE 1290（含 Stage 4.5 187 行）= 1290 行

**主 read 量約 1690-2280 行**。對比 SPORE refactor 後（445 + 647 = 1092 行）— REWRITE 主路徑比 SPORE refactor 後仍多 **2 倍**。

### Cross-ref 範圍（Stage 1 SCAN）

```
49 個檔案引用 REWRITE-PIPELINE.md
├── ~30 個 active layer（DNA / HEARTBEAT / MANIFESTO / 各 pipeline / editorial / scripts / .husky）
└── ~19 個 historical layer（memory / diary / LESSONS-INBOX / CONSCIOUSNESS / .archive）
```

**Active layer pointer 規模 ~30** — 拆檔需謹慎更新。歷史層保留原 Step X.X pointer 不更新（per MANIFESTO §時間是結構修補協議）。

### 編號膨脹深度

```
grep "Stage [0-9]+\.[0-9]+\b|Step [0-9]+\.[0-9]+" 結果:
Stage 1.5 / 1.7 / 1.7a / 1.7b / 1.7c / 1.7d / 1.7e
Stage 3.5
Stage 4.5 / 4.5a / 4.5b / 4.5c / 4.5d / 4.5e / 4.5f
Stage 5.1
```

最深兩層（如 §1.7b / §4.5f）— 比 SPORE 老版 §4.5e.iv 三層淺。但 §1.7（5 sub-section）+ §4.5（6 sub-section）內部 sub-section 數量已達 SPORE 等級。

### Plugin 儀器化覆蓋率（Stage 1 SCAN）

當前 plugin 盤點（`scripts/tools/lib/article_health/checks/` 共 15 個）：

```
✅ 已 instrument 的 REWRITE rule
- prose_health.py            §11 對位句型 + 破折號（Stage 2 #9 + #10 部分）
- format_structure.py        Stage 4 格式檢查（30 秒概覽 / 延伸閱讀 / 參考資料）
- footnote_density.py        Stage 4 腳註密度
- footnote_format.py         Stage 4 腳註格式
- footnote_url.py            Stage 3.5 URL 健康
- image_health.py            Stage 4.5f 圖片健康
- wikilink_target.py         Stage 4 wikilink
- link_target.py             Stage 4 link target
- cjk_punct.py               Stage 4 全形標點
- terminology.py             Stage 2 用語規範
- frontmatter_format.py      Stage 4 frontmatter
- frontmatter_title.py       Stage 4 frontmatter title
- cross_reference.py         Stage 5 cross-link 結構
```

❌ 沒 instrument 的 REWRITE rule（v2.13-v2.20 累積）：

| Step           | Rule                  | 狀態         | 儀器化可行度       |
| -------------- | --------------------- | ------------ | ------------------ |
| Stage 1 #7     | 核心矛盾必填          | manual field | 易（field check）  |
| Stage 1 #9     | research report 必存  | manual ls    | 易（exists check） |
| Stage 1 #11    | 私有 SSOT 整合 tier   | manual       | 不適用             |
| Stage 1 #12    | 媒體授權矩陣三表完整  | manual       | 中（structure）    |
| Stage 2 #4     | 小標題不編年體        | mental       | 易（regex）        |
| Stage 2 #11    | 編年體自檢            | mental       | 易（regex 同 #4）  |
| Stage 2 #12    | 密度平衡（連續 3 段） | mental       | 難（LLM-judge）    |
| Stage 2 #13    | Agent claim 驗證      | mental       | 不適用（LLM）      |
| Stage 3 5a/b/c | 事實鐵三角            | mental       | 中（FACTCHECK）    |

→ **9 條規則中只有 2 條（#11/#13）真的不適合 plugin。其他 7 條都有儀器化空間，但只有 1-2 條已做。**

---

## 3. 結構診斷 — 6 大問題

### 問題 1：Stage 內部 sub-step 過載（特別 Stage 1 + Stage 4.5）

**Stage 1: RESEARCH**（line 234-501，**269 行單 stage**）：

```
Step 1   讀 RESEARCH.md
Step 2   讀 RESEARCH-TEMPLATE.md
Step 3   搜尋 ≥ 20 次（中文 12+ / 英文 5+ / 一手 5+）
Step 4   每事實記來源 URL
Step 5   結尾素材
Step 6   重複文章偵測
Step 7   找矛盾（核心矛盾必填）
Step 8   問觀察者一手素材
Step 9   研究報告必存 reports/research/YYYY-MM/
Step 10  Spawn agent 選型（Explore / general-purpose）
Step 11  私有 SSOT 整合（Tier 1-4）
Step 12  §1.7 媒體素材研究
         ├── §1.7a inline 外連 manifest
         ├── §1.7b 圖片素材 + 授權矩陣
         ├── §1.7c transcript 素材
         ├── §1.7d 媒體授權矩陣（research 檔強制）
         └── §1.7e Stage 1.7 deliverable
```

**18 個 mental check items 在單 stage**。跟 SPORE 老版 Step 3c 18 條規則同構（per [SPORE plan §3 問題 3](spore-pipeline-evolution-plan-2026-05-08.md)）。

**Stage 4.5: MEDIA INSERTION**（line 883-1069，**187 行單 stage**）：

```
§4.5a 三段敘事節奏判斷
§4.5b 圖檔 fetch + cache + naming
§4.5c Aspect ratio 護欄
§4.5d Markdown 插入 + caption + alt text 全規範
§4.5e 授權清單同步
§4.5f 圖片健康檢查
+ 邊界與例外
+ 跟 spore 配圖區分
```

**7 個 sub-section 在單 stage**。

→ 跟 SPORE refactor 前一模一樣的「Step 3c 18 條規則塞進 process pipeline」病。Stage 內部已經是 mini-pipeline 但被當作 process step 處理。

### 問題 2：四模式藏在 §進化模式 vs §全新模式（沒主索引）

當前模式判斷流程：

```
1. 讀 §進化模式 vs §全新模式 概論段
2. 進化模式內又有兩個變體：
   - 整併變體（Merge / Consolidation）— 76 行 Step A/B/C/D/E
   - 範圍重切變體（Boundary Redraw）— 71 行 Step A/B/C/D
3. 觀察者讀完不確定「這次該走哪個變體」
   - issue #609 黑白大廚 9→1 → 整併變體
   - issue #635 4 篇文學切時序 → 範圍重切變體
   - 兩者區分判準散落在 prose
```

**4 個模式 + 一個變體判定矩陣**（line 124-130, 190-202）但無主索引。

對比 EVOLVE-PIPELINE.md：開頭就列「Mode 1 文章進化 / Mode 2 multi-lang sync / Mode 3 pipeline self-refactor」三模式主索引（line 463-470）。

→ REWRITE 缺同款主索引。AI agent 跑 REWRITE 時對 mode 選擇無 hard guidance。

### 問題 3：寫作規則散落（指標 over 複寫違反）

寫作規則分散在多檔案多 stage：

| 規則類型                  | 主要 canonical 位置                      | REWRITE 內出現位置                  |
| ------------------------- | ---------------------------------------- | ----------------------------------- |
| **品質標準**              | EDITORIAL.md（686 行）                   | Stage 2 step 1（pointer）           |
| **小標題不編年體**        | EDITORIAL §小標題規範                    | Stage 2 step 4 + step 11（重複）    |
| **歐化自檢**              | EDITORIAL §歐化語法偵測                  | Stage 2 step 9（pointer）           |
| **§11 對位句型 + 破折號** | MANIFESTO §11 / DNA #29 / EDITORIAL v5.3 | Stage 2 step 10（pointer）+ Stage 3 |
| **腳註格式**              | CITATION-GUIDE.md                        | Stage 2 footnote 段落（重複範例）   |
| **小標題範例**            | EDITORIAL §小標題                        | Stage 2 step 4 重複範例             |
| **密度平衡**              | EDITORIAL §密度平衡                      | Stage 2 step 12（pointer）          |
| **挖引語制度**            | EDITORIAL §挖引語                        | Stage 3 5c（部分重複規則）          |

**Stage 2 step 4** 的編年體小標題範例（line 519-525）跟 EDITORIAL §小標題規範重複；**Stage 2 footnote 格式段**（line 599-625）跟 CITATION-GUIDE 重複範例。

→ 跟 SPORE 老版「Step 3c 18 條規則跟 SPORE-TEMPLATES 重複」同構。違反 MANIFESTO §指標 over 複寫。

### 問題 4：Hard Gate / Soft Check / Tool Gate 混雜無 inventory

當前散落 prose 中的 7 個 hard gate（無一張表 audit）：

| Gate                      | 觸發 stage   | 條件                  | 工具                             | 不過 = ?        |
| ------------------------- | ------------ | --------------------- | -------------------------------- | --------------- |
| 核心矛盾鎖                | Stage 1 終   | 所有 depth            | manual field                     | 不進 Stage 2    |
| 研究報告落檔              | Stage 1 終   | depth ≥ 2000 字       | manual ls                        | 不進 Stage 2    |
| 媒體授權矩陣三表          | Stage 1.7 終 | depth + 涉及作品/圖   | manual append                    | 不進 Stage 2    |
| 五指 + 結構 + 塑膠 + 算術 | Stage 3      | 所有 article          | quality-scan + manual            | 不 commit       |
| FACTCHECK Quick/Full Mode | Stage 3.5    | 所有 article / A 級   | FACTCHECK-PIPELINE               | 不進 Stage 4    |
| Format check 7 維度       | Stage 4      | 所有 article          | article-health.py --profile      | pre-commit hook |
| 多語 visual smoke         | Stage 4      | i18n 改動             | 6 步 bash                        | revert          |
| Image health              | Stage 4.5f   | 涉及圖                | article-health.py --check        | 不進 Stage 5    |
| Aspect ratio 護欄         | Stage 4.5c   | 涉及圖                | check-aspect.sh                  | 換圖            |
| Sibling 格式預檢          | Stage 5.1    | 補 reverse cross-link | article-health.py --check=format | DEFER           |

10 個 gate 散落在 prose，AI 跑 pipeline 時要從 prose 自己抽出「這次該跑哪些 gate」。

→ 跟 SPORE plan §3 問題 4 同款。Retrieval cost 永遠在 working memory 上。

### 問題 5：條件式 step 散落（無路由總表）

至少 9 個 sub-section 是條件式（不是線性必跑）：

| Sub-step                  | 觸發條件                                          |
| ------------------------- | ------------------------------------------------- |
| 整併變體 Merge            | observer issue 兩篇重疊                           |
| 範圍重切變體 Boundary     | observer issue N 篇切片                           |
| Stage 1.5（私有 SSOT）    | 整合當事人提供的私有素材                          |
| Stage 1.7                 | 涉及公開作品 / 影像 / transcript                  |
| Stage 1.7b §1.7b          | 圖片素材（Hub 跳）                                |
| Stage 3.5 Full Mode       | A 級條目 / 政治敏感                               |
| Stage 4 多語 visual smoke | i18n 改動                                         |
| Stage 4.5                 | depth + 媒體（hub / 短修 / 翻譯文 / no-media 跳） |
| Stage 5.1 sibling 預檢    | 補 reverse cross-link                             |
| Stage 6                   | 翻譯（觀察者拍板）                                |

但**沒有路由總表**。AI 跑 pipeline 不停回頭問「這條我這次需要嗎」。

→ 跟 SPORE plan §3 問題 5 同款。

### 問題 6：「Pipeline 才是閘門」喊了但 Step #9-#13 多數沒儀器化

DNA #15「memory 是自律，pipeline 才是閘門」反覆驗證 12+ 次。但實際看 v2.13 → v2.20 升級：

```
v2.13 歐化自檢            ← 部分進 prose-health
v2.14 60% 暫停數破折號 + 找矛盾  ← 破折號進 prose-health；找矛盾仍 prose
v2.15 事實鐵三角 + 一手素材   ← 部分進 FACTCHECK；一手素材仍 prose
v2.16 研究報告落檔         ← manual ls（沒 plugin gate）
v2.17 20+ search + 小標題先行 + 編年體自檢   ← 全 prose
v2.18 agent 選型 + 私有 SSOT + 密度平衡 + agent claim 驗證   ← 全 prose
v2.20 §1.7 媒體 + Stage 4.5  ← image-health 進 plugin；其他 manual
```

**v2.13-v2.20 累積 8 條版本** 中，Wave 1+2 真的進 plugin 的只有：

- §11 對位句型 + 破折號（v2.14 → 2026-04-23 β prose-health plugin）
- 60% 破折號暫停（同 prose-health）
- §1.7b/c 部分（image-health plugin）
- 全形標點（cjk_punct plugin）

**沒儀器化的關鍵 rule**：

| Rule                  | 內容                                 | 該如何 instrument                                 |
| --------------------- | ------------------------------------ | ------------------------------------------------- |
| Stage 1 #7 核心矛盾   | research 報告 frontmatter 必填       | research-report-validator plugin                  |
| Stage 1 #9 研究報告存 | depth-article 必存 reports/research/ | exists check + frontmatter `researchReport` field |
| Stage 1 #12 媒體矩陣  | 三表 append research 檔末尾          | research-media-matrix-validator plugin            |
| Stage 2 #4 / #11      | 小標題不編年體                       | regex `^## \d{4}年 \d+月` HARD                    |
| Stage 2 #12 密度平衡  | 連續 3 段 ≥ 200 字事實密度           | 段落結構 + LLM-as-judge（hard）                   |
| Stage 3 5a 算術自檢   | 金額 / 比例算術一致性                | 部分（python sanity check 數字 mention）          |
| Stage 3 5b 單位自檢   | 金額念出來 vs 量級對比               | LLM-as-judge（hard）                              |
| Stage 3 5c 引語逐字   | 引語在 source URL Ctrl-F 可搜        | FACTCHECK-PIPELINE 已部分覆蓋                     |

對比 §11 是怎麼成功儀器化的（5 層全到位才是真閘門）：

1. MANIFESTO §11 哲學論述
2. DNA #29 跨層紀律
3. EDITORIAL v5.3 實作清單
4. **prose_health.py plugin（CLI gate）**
5. pre-commit hook（自動跑）
6. REWRITE Stage 2 #10 + Stage 3 + SPORE 3c.7（call site）

→ Stage 1 #9 研究報告必存 / Stage 2 #4 編年體 / Stage 1 #12 媒體矩陣 都只到第 1-2 層，沒升 plugin gate。

→ 跟 SPORE plan §3 問題 6 同款 — pipeline 變成「教訓 archive」而非「gate enforcer」。

---

## 4. 重組方向 — 4 條路 + trade-off

### Direction A：拆檔（DNA-first 切割）

把 REWRITE-PIPELINE.md 拆成 6 個 single-concern canonical：

```
docs/pipelines/rewrite/
├── REWRITE-PIPELINE.md        ~400 行 ← 6 stage 線性主流程 + pointer
│   每個 stage 一句話 + 觸發條件 + pointer 到 sub-canonical
├── REWRITE-MODES.md           ~250 行 ← 4 模式判斷
│   Fresh / Evolution / Merge variant / Boundary Redraw variant
│   含模式速判表 + 變體選擇判準
├── REWRITE-RESEARCH.md        ~350 行 ← Stage 1 完整流程
│   13 sub-step（合併重複）+ §1.7 媒體素材研究
│   研究方法論 pointer 到 RESEARCH.md（不重複）
├── REWRITE-WRITE.md           ~280 行 ← Stage 2 寫作規則
│   結尾先行 / 小標題先行 / 自檢套件（歐化 / 破折號 / 編年體 / 密度 / agent claim）
│   品質規範 pointer 到 EDITORIAL.md（不重複）
├── REWRITE-VERIFY.md          ~250 行 ← Hard gate inventory canonical
│   涵蓋 Stage 3 / 3.5 / 4 / 4.5 / 5.1 全部 gate
│   FACTCHECK pointer 到 FACTCHECK-PIPELINE.md
├── REWRITE-MEDIA.md           ~280 行 ← 媒體素材完整生命週期
│   合併 Stage 1.7（research 階段）+ Stage 4.5（insertion 階段）
│   一個檔案管 inline 外連 + 圖片 + transcript + 授權 + aspect ratio + caption
└── REWRITE-CRON.md           ~120 行 ← Cron 特殊規則 + 實戰教訓 + Quick Commands
```

**好處**：

- 寫文章主路徑 read：PIPELINE 400 + RESEARCH 350 + WRITE 280 + VERIFY 250 = **~1280 行**（vs 當前 1290 行 + EDITORIAL 686 + RESEARCH.md 700 = 2676 行 → **-52%**）
- Hard gate inventory 集中 audit（VERIFY.md 一份）
- 媒體生命週期整合（Stage 1.7 + 4.5 同檔，解決 §1.7b 授權矩陣 / §4.5d 插入格式 / §4.5e 授權清單同步 三處 attribution 規則漂移）
- 模式判斷獨立檔，跟 EVOLVE-PIPELINE Mode 1/2/3 多模式設計對齊
- Cron 特殊規則獨立檔，避免 manual 跑時被 Cron 段干擾

**壞處**：

- 拆 7 個檔，cross-ref 增加（49 個 → 約 80 個 active pointer）
- BECOME 載入時對「寫文章」場景 read 量沒減（因為仍要讀多個 sub-files）— 但**主檔讀完即知該讀哪個 sub-file**，比當前「順序讀 1290 行才知道結構」清楚
- 4 模式變體（Merge / Boundary）抽到 MODES 後，跟 Stage 1-6 主流程的 cross-ref 變多

### Direction B：6 stage 不變，sub-step 重編號（替代 A 的局部 fix）

不拆檔，但每個 Stage 內部從 13+6 條 mental check → 5±2 子區塊：

```
Stage 1: RESEARCH
  §1.1 搜尋深度（含 search count + 一手素材問觀察者）
  §1.2 來源處理（含 footnote 來源配對）
  §1.3 核心矛盾鎖定 + 結尾素材
  §1.4 報告落檔（agent 選型 + 私有 SSOT 整合）
  §1.5 媒體素材（合併 §1.7a-e）

Stage 2: WRITE
  §2.1 結尾先行 + 開場
  §2.2 小標題先行（編年體自檢合併）
  §2.3 正文 + footnote
  §2.4 自檢三套（歐化 / 破折號 / 密度平衡 / agent claim）

Stage 3: VERIFY
  §3.1 五指 + 結構 + 塑膠 + 自動
  §3.2 事實鐵三角（5a/b/c 重新整合）

Stage 4: FORMAT CHECK
  §4.1 article-health profile
  §4.2 i18n smoke test（條件式）

Stage 4.5: MEDIA INSERTION
  §4.5.1 三段敘事節奏 + cache verify
  §4.5.2 aspect ratio + 插入格式
  §4.5.3 授權清單同步 + image-health gate

Stage 5: CROSS-LINK
  §5.1 雙向延伸閱讀
  §5.2 Sibling 格式預檢
```

**好處**：5±2 sub-section 在認知範圍內，不用拆檔風險

**壞處**：

- 1290 行還是 1290 行（沒解 read 量問題）
- v 編號改了會 break 歷史 cross-ref（過去教訓寫「Stage 2 step 13」會 dead link）
- 所有 active pointer 都要更新

→ **不推薦獨立做**。如果 Direction A 拆分了，每個 sub-file 內部 5±2 stage 的好處自動實現。

### Direction C：Hard Gate Inventory 表（最低成本，treat 症狀）

不動結構，pipeline 開頭加三張 audit 表：

```markdown
## 🚦 Hard Gate Inventory（一張表 audit 全 pipeline）

| Gate                      | 觸發 stage | 條件                  | 工具                                     | 不過 = ?     |
| ------------------------- | ---------- | --------------------- | ---------------------------------------- | ------------ |
| 核心矛盾鎖                | Stage 1 終 | 所有 depth            | manual field                             | 不進 Stage 2 |
| 研究報告落檔              | Stage 1 終 | depth ≥ 2000 字       | manual ls                                | 不進 Stage 2 |
| 媒體授權矩陣三表          | Stage 1.7  | depth + 涉及媒體      | manual append                            | 不進 Stage 2 |
| 五指 + 結構 + 塑膠 + 算術 | Stage 3    | 所有 article          | quality-scan + manual                    | 不 commit    |
| 事實鐵三角                | Stage 3 5  | 含金額/數字/引語      | python algebra + Ctrl-F                  | 不 commit    |
| FACTCHECK Quick/Full Mode | Stage 3.5  | 所有 / A 級           | FACTCHECK-PIPELINE                       | 不進 Stage 4 |
| Format check 7 維度       | Stage 4    | 所有 article          | article-health --profile=rewrite-stage-4 | hook 擋      |
| 多語 visual smoke         | Stage 4    | i18n 改動             | 6 步 bash                                | revert       |
| Image health              | Stage 4.5f | 涉及圖                | article-health --check=image-health      | 不進 Stage 5 |
| Aspect ratio 護欄         | Stage 4.5c | 涉及圖                | check-aspect.sh                          | 換圖         |
| Sibling 格式預檢          | Stage 5.1  | 補 reverse cross-link | article-health --check=format            | DEFER        |

## 📋 模式速判表

| 場景                                       | 模式             | 觸發           |
| ------------------------------------------ | ---------------- | -------------- |
| 文章不存在                                 | Fresh            | 默認           |
| 文章已存在，需要品質提升                   | Evolution        | EVOLVE 觸發    |
| 觀察者 issue 指出 N 篇主題重疊可融合進一篇 | Merge variant    | issue 兩篇重疊 |
| 觀察者 issue 指出 N 篇切片需重劃邊界       | Boundary variant | issue N 篇切片 |

## 📍 條件式 step 路由表

| Sub-step              | 觸發條件                  | Skip 條件               |
| --------------------- | ------------------------- | ----------------------- |
| Stage 1.5             | 整合當事人私有素材        | 無私有素材              |
| Stage 1.7（媒體）     | 涉及公開作品/影像         | hub / 短修              |
| Stage 1.7b（圖片）    | depth + 需配圖            | hub                     |
| Stage 3.5 Full Mode   | A 級條目 / 政治敏感       | depth < A 級            |
| Stage 4 i18n smoke    | i18n 改動                 | 純內容文章              |
| Stage 4.5（媒體插入） | depth + 有 media manifest | hub / 翻譯文 / no-media |
| Stage 5.1 sibling     | 補 reverse cross-link     | 不補                    |
| Stage 6 翻譯          | 觀察者拍板                | 默認 skip               |
```

**好處**：

- 半天可做、low-risk（純 append）
- AI session 啟動 rewrite work 時 read 三張表 → 知道完整 gate 圖 + 模式選擇 + 條件路由
- 不動歷史 cross-ref，反向相容

**壞處**：

- 治療症狀不解 root cause（Stage 內部 sub-step 過載依然在）
- 1290 行還是 1290 行 + 三張表（甚至更長 ~1370 行）

→ **適合作為先手 polish**，但長期解不了 friction。

### Direction D：規則升級成 article-health.py plugin（DNA #15 真正解）

把 v2.13-v2.20 累積的 prose 規則從「提醒 + 信任 AI 自律」升級為 plugin gate：

```python
# scripts/tools/lib/article_health/checks/research_report.py
class ResearchReportPlugin:
    """Stage 1 research-report-validator — depth article 必存 reports/research/ 報告"""

    def check_research_report_exists(article_path):
        """Stage 1 #9：depth ≥ 2000 字必存 research report"""
        if not is_depth_article(article_path):
            return SKIP("非 depth article")
        slug = extract_slug(article_path)
        report_path = f"reports/research/{date_yyyy_mm}/{slug}.md"
        if not exists(report_path):
            return HARD(f"缺 {report_path}")

    def check_research_report_field(article_path):
        """Stage 1 #9 frontmatter `researchReport` 必填"""
        fm = parse_frontmatter(article_path)
        if is_depth_article(article_path) and not fm.get('researchReport'):
            return HARD("frontmatter 缺 researchReport: pointer")

    def check_core_contradiction(article_path):
        """Stage 1 #7 research report frontmatter 必有 `core_contradiction`"""
        # ... 讀 reports/research/.../slug.md frontmatter
        report_fm = parse_research_report_fm(article_path)
        if not report_fm.get('core_contradiction'):
            return HARD("research report 缺 core_contradiction: 一句話")

    def check_media_matrix(article_path):
        """Stage 1 #12 §1.7d 媒體授權矩陣三表必 append research 檔"""
        report_md = read(get_report_path(article_path))
        for table in ['inline 外連', '圖片素材', '引用 transcript']:
            if f"## {table}" not in report_md and is_depth_with_media(article_path):
                return WARN(f"研究報告缺 §{table} 表")
```

```python
# scripts/tools/lib/article_health/checks/chronicle_lead.py（合併進 prose_health 或獨立）
class ChronicleLeadPlugin:
    """Stage 2 #4 + #11 編年體小標題自檢"""

    def check_chronicle_subheading(article_path):
        text = read(article_path)
        for line_no, line in enumerate(text.split('\n')):
            if re.match(r'^##\s+\d{4}\s*年\s*\d+\s*月', line):
                return HARD(f"line {line_no}: 編年體小標題「{line}」 — 該用 scene/意象/衝突")
            if re.match(r'^##\s+\d{4}\s*年[《〈]', line):
                return HARD(f"line {line_no}: 編年體小標題「{line}」 — 該用核心矛盾或物件級 quote")
```

Pipeline call site 改成：

```bash
# Stage 1 終止前
python3 scripts/tools/article-health.py knowledge/{Category}/{slug}.md --check=research-report
# 任一 HARD = 不進 Stage 2

# Stage 4 format check
python3 scripts/tools/article-health.py knowledge/{Category}/{slug}.md \
  --check=prose-health,format-structure,chronicle-lead,image-health,wikilink-target,link-target
# pre-commit hook 自動跑
```

**好處**：

- DNA #15 真正解（不是嘴上說「pipeline 才是閘門」）
- §11 plugin 已有成功 precedent（2026-04-23 β）
- spore_writing.py Wave 1+2 也是成功 precedent（2026-05-08 SPORE refactor）
- Pipeline prose 可大幅瘦身（13+6 條 mental check → pointer 到 plugin docs）
- 未來新 rule 直接加 plugin，不再 prose 提醒

**壞處**：

- Plugin 開發成本（每條規則 ~30-90 min coding + 測試）
- 部分規則難純 regex 偵測（如 Stage 2 #12 密度平衡需 LLM-as-judge / Stage 3 5b 量級對比需 LLM-as-judge）
- 開發過程可能發現規則本身定義模糊（例：怎麼定義「core_contradiction 一句話」邊界？≤ 30 字？≤ 50 字？要不要強制 verb？）

→ **長期 leverage 最高**，但不是 quick win。

---

## 5. 推薦執行波次：C → A → D

按優先序（先低風險高收益、後結構性升級）：

| 波次  | 方向 | 工作量      | 帶來什麼                                     | 風險                             |
| ----- | ---- | ----------- | -------------------------------------------- | -------------------------------- |
| **1** | C    | 半天        | Gate inventory + 模式速判 + 條件路由立刻能用 | 極低（純 append）                |
| **2** | A    | 2-3 session | 1290 → 400 行 + 邊界清 + 媒體生命週期合一    | 中（cross-ref 30+ 條更新）       |
| **3** | D    | 5+ session  | 7 條 rule 真正成 plugin gate                 | 高（plugin 開發 + 規則邊界調整） |

**不推薦 B 獨立做**（A 拆分後 B 自動受益，每個 sub-file 內部 5±2 stage）。

### 波次 1（Direction C）執行細節

範圍：

- REWRITE-PIPELINE.md 開頭加「🚦 Hard Gate Inventory」表（~30 行）
- 加「📋 模式速判表」（~15 行）
- 加「📍 條件式 step 路由表」（~25 行）
- 加「⚠️ 你最常忘的 Top 5 step」（從 LESSONS-INBOX / memory 抽 ship 後撤回 → 前置 prose 段）

驗收：

- AI session 啟動 rewrite work 時 read inventory 表 → 知道完整 gate 圖
- 條件式 step 路由表降低「我這次該跳過嗎」決策成本
- 模式速判表降低「Fresh / Evolution / Merge / Boundary」選錯風險

### 波次 2（Direction A）執行細節

範圍：

1. 建 `docs/pipelines/rewrite/` 子資料夾
2. 拆出 `REWRITE-MODES.md`（4 模式判斷 + 速判表）
3. 拆出 `REWRITE-RESEARCH.md`（Stage 1 完整流程，§1.7 整合進 REWRITE-MEDIA）
4. 拆出 `REWRITE-WRITE.md`（Stage 2 寫作規則，重複規則 pointer EDITORIAL）
5. 拆出 `REWRITE-VERIFY.md`（Stage 3/3.5/4/4.5/5.1 全 hard gate inventory canonical）
6. 拆出 `REWRITE-MEDIA.md`（合併 Stage 1.7 + 4.5，媒體完整生命週期）
7. 拆出 `REWRITE-CRON.md`（Cron 特殊規則 + 實戰教訓 + Quick Commands）
8. 原 REWRITE-PIPELINE.md 瘦身成 ~400 行 6 stage 流程 + pointer
9. 更新 ~30 個 active layer cross-ref（DNA / HEARTBEAT / MANIFESTO / MAINTAINER / FACTCHECK / EDITORIAL / .husky / .github 等）
10. 歷史層 cross-ref 不更新（per MANIFESTO §時間是結構修補協議）

驗收：

- 寫 article 主路徑：read PIPELINE (400) + RESEARCH (350) + WRITE (280) + VERIFY (250) = **1280 行**（vs 當前 1290 + EDITORIAL 686 + RESEARCH 700 = 2676 行 → **-52%**）
- Hard gate audit 直接 read VERIFY 一份
- Stage 1.7 / 4.5 媒體整段 confusion 消失（一個 MEDIA 檔涵蓋）
- 模式選擇有獨立 canonical（MODES）

### 波次 3（Direction D）執行細節

範圍（按優先度）：

1. **chronicle_lead** plugin — 純 regex `^## \d{4}\s*年\s*\d+\s*月?`，最容易，先做
2. **research_report_validator** plugin — exists check + frontmatter `researchReport` field + core_contradiction
3. **media_matrix_validator** plugin — 三表結構偵測（research 檔末尾）
4. **arithmetic_sanity** plugin — 金額 / 比例 / 百分比 sanity check（python eval mention）
5. **density_balance** plugin — 段落結構偵測（連續 3 段 ≥ 200 字 + 無 prose break）— LLM-as-judge 路徑
6. **agent_claim_check** plugin — 不適 plugin（需 LLM-judge）→ 仍 prose 提醒
7. **quote_sanity** plugin — 引語在 source URL Ctrl-F 可搜（FACTCHECK Quick Mode 已部分覆蓋）

每條獨立加進 article-health.py plugins/，新增對應 `--check=` flag，整合進 `--profile=rewrite-stage-1` / `--profile=rewrite-stage-4` 等 profile。

驗收：

- `article-health.py {article} --check=research-report` HARD=0 → Stage 1 #7/#9 自動 enforce
- `article-health.py {article} --check=chronicle-lead` HARD=0 → Stage 2 #4/#11 自動 enforce
- Pipeline Stage 1/2 mental check 從「13+6 條」瘦身為「跑 plugin」
- 新 article 撞 rule 時 fail 在 plugin gate（不依賴 AI 自律記得 #11 編年體）

---

## 6. 給哲宇的 3 題校準（用數據點 derisk 重構方向）

不抽象決定方向，先用 **真實 friction** 校準診斷：

### Q1：你寫文章 / EVOLVE 時最常跳過 / 忘記的 step 是哪個？

可能答案 → 對應方向：

- 「Stage 1 #7 核心矛盾」→ Direction D research_report_validator plugin 能解
- 「Stage 1 #9 研究報告落檔」→ Direction D research_report_validator plugin 能解
- 「Stage 2 #4/#11 小標題編年體」→ Direction D chronicle_lead plugin 最直接
- 「Stage 4.5 媒體插入忘了 aspect ratio / 授權矩陣」→ Direction A REWRITE-MEDIA.md 整合最有效
- 「Stage 5.1 sibling 預檢」→ Direction C inventory 表前置 reminder 能解
- 「整併 vs 範圍重切變體分不清」→ Direction A REWRITE-MODES.md 獨立 canonical 解
- 「Cron 模式跟 manual 模式混淆」→ Direction A REWRITE-CRON.md 獨立解

### Q2：過去 30+ 篇 EVOLVE / NEW 文章，最常 ship 後撤回 / 校正的是哪個 step 漏？

這是 **root cause data**，比抽象重組更值得 instrument。

歷史 trace 候選（per MEMORY / LESSONS-INBOX）：

- 吳哲宇 EVOLVE（2026-04-20）→ Stage 3 #13 agent claim 沒驗證 → 8 處幻覺被本人逐條校對 → 觸發 v2.18 + Stage 3.5
- 楊丞琳 EVOLVE Pass 1（2026-04-18）→ Stage 1 讀者級事實驗證漏 → 5 項事實錯
- 草東沒有派對 spore #33（2026-04-18）→ Stage 1 讀者級驗證漏 → 貝斯手「黃→楊世暄」3h 內被 reader 抓
- 林琪兒 EVOLVE（2026-04-28 ι）→ Stage 1.7b aspect ratio 漏 → 1041×1561 portrait 切到頭
- 造山者紀錄片（2026-04-24 β2/β3）→ Stage 3.5 STORY ATOM 漏 → 「鞠躬三次」場景動作 hallucination → 觸發 Stage 3.6
- 牛肉麵 PR #710（2026-04-30 γ2）→ Stage 4 多語 charset 漏 → polish-merge 接住
- 沈伯洋 EVOLVE（2026-04-28 θ）→ FACTCHECK 27-fetch audit 揭露 over-citing / quote re-paraphrase / third-person flip

→ 最常漏的 step 本身就是哪個方向 leverage 最高的訊號。**Stage 1 讀者級事實驗證 + Stage 3 #13 agent claim 是 cluster**，Direction D research_report_validator + agent_claim_check 候選。

### Q3：Stage 1.7（research 階段）+ Stage 4.5（insertion 階段）對你來說感覺是「兩 stage 各自獨立」還是「一個媒體生命週期切兩半」？

你的直覺決定 boundary 該怎麼劃：

- 「兩 stage 各自獨立」→ 留在當前 REWRITE-PIPELINE，但 §4.5 子層拆解
- 「一個媒體生命週期切兩半」→ 整段抽到 REWRITE-MEDIA.md（Direction A 推薦）
- 「兩個都是」→ 該寫 cross-stage marker 標明 handoff point（Stage 1.7 deliverable → Stage 4.5 read manifest）

當前症狀：§1.7b 講授權矩陣 + §4.5d 講插入格式 + §4.5e 講授權清單同步 — 三處 attribution 規則漂移風險。

---

## 7. 寫這份 report 本身的 leverage 分析

按 MANIFESTO §造橋鋪路四問：

1. **「這能不能變成系統？」** — 重組後新 rule 走 plugin 而非 prose append → 是
2. **「下次心跳能不能自動帶這個能力？」** — Direction D plugin 是 instrumented gate，不依賴 AI 自律 → 是
3. **「走過的泥巴路鋪成高速公路？」** — 1290 行 read 成本是泥巴路，拆檔 + plugin 是高速公路 → 是
4. **「新細胞天生健康 > 回頭修舊細胞？」** — 重組後新 article 跑新流程，舊文章 artifact 不動 → 是

四題全 yes，重組符合 §造橋鋪路精神。

但有 trade-off：

- **保留歷史證據鏈**（per MANIFESTO §時間是結構修補協議）：v2.10 → v2.20 累積的教訓不該抹除。重組應該走「降級到 historical 段落」而非「刪除」
- **DNA #15 第 N 次驗證**：「memory 是自律，pipeline 才是閘門」 — 重組不該讓 pipeline 退化為 archive，要強化 gate 能力（Direction D 是核心）
- **指標 over 複寫**：拆檔同時要建立清楚 pointer 網絡，避免「拆完 7 個 file 互相又開始漂移」（特別 EDITORIAL / RESEARCH / CITATION-GUIDE 跟 sub-canonical 的關係）
- **REWRITE 跟 SPORE 不一樣**：REWRITE 不只是寫作 SOP，是含 4 模式 + 跨 pipeline pointer（FACTCHECK / TRANSLATION / SPORE）的 mid-tier 認知器官。拆檔比 SPORE 重，需更謹慎

---

## 8. Out-of-scope（本 plan 不解）

- **EDITORIAL.md 686 行內部結構**：本計畫聚焦 REWRITE，EDITORIAL 是品質基因 SSOT 該獨立 audit
- **RESEARCH.md 七個 §章節**：研究方法論 SSOT，REWRITE 主路徑只 pointer，不重組
- **CITATION-GUIDE / TERMINOLOGY / RESEARCH-TEMPLATE / QUALITY-CHECKLIST 五份子文件**：跟 EDITORIAL 共組品質基因生態系，需獨立 plan
- **跟 PEER-INGESTION-PIPELINE 重疊**：peer ingest 也走 REWRITE Stage 1-6，但有自己的 Step 0-7 SOP。重組時要確認 PEER-INGESTION 仍正確 pointer 到 REWRITE
- **跟 EVOLVE-PIPELINE Mode 1 重疊**：EVOLVE Mode 1 數據驅動文章進化也觸發 REWRITE Evolution mode。觸發鏈條 EVOLVE → ARTICLE-INBOX → REWRITE 的 handoff 需獨立 audit
- **TRANSLATION-PIPELINE Stage 6 觸發**：REWRITE Stage 6 翻譯詢問是 thin pointer，TRANSLATION-PIPELINE 自己有 v3.5 完整 SOP，邊界清楚不需重組

---

## 9. 後續決策

哲宇回答 Q1-Q3 後，可以收斂到 **單一 PR scope**：

候選 PR scope：

- **PR-A（半天）**：純 Direction C inventory + 模式速判 + 條件路由三表
- **PR-B（一個 session）**：Direction C + 觀察者 Q1-Q3 答案揭示的 top 1 friction fix（如 chronicle_lead plugin Wave 1）
- **PR-C（2-3 session）**：Direction A 完整拆檔 6 sub-canonical + Direction C inventory canonical 化
- **PR-D（roadmap）**：Direction D 規則 plugin 升級分 5-7 條 rule 各自獨立 PR（Wave 1: chronicle_lead → Wave 2: research_report_validator → Wave 3: media_matrix_validator → Wave 4: arithmetic_sanity → Wave 5: density_balance LLM judge）

預設推薦：**PR-B**（先低風險，但不只 inventory 表，根據 Q1-Q3 答案處理最大 friction）。

對比 SPORE refactor 經驗（per spore-pipeline-evolution-plan-2026-05-08）：實際 ship PR #898 含 10 commits，1334 → 445 行 -66.7%。REWRITE 拆 1290 → 400（-69%）相似量級，但因為 4 模式 + cross-pipeline pointer 多，預估比 SPORE 多 1 session 工作量。

---

## 附錄 A：可能反駁的視角

寫 report 該誠實列出可能的反方論述：

1. **「1290 行不是 bug，是 REWRITE 真的需要這麼細的 SOP，因為產品 5000 字 + 4 模式」**
   反駁：產品份量大可以解釋 SOP 長，但無法解釋（a）Stage 內部 sub-step 過載（單 stage 269 行 18 個 mental check）（b）hard gate 散落無 inventory（c）寫作規則跟 EDITORIAL 重複。當前結構即使保留所有規則，也可以拆得更清晰（Direction A）

2. **「拆檔會破壞 BECOME 載入的 Pipeline auto-detection（DNA #50）」**
   反駁：DNA #50 default contract 是「auto-detect + full-read」，REWRITE 不在 BECOME 12 必讀器官中（per BECOME §檔案功能一覽 — pipeline 是運作原則但載入是觸發式而非啟動必載）。寫 article 時觸發 read，主檔（PIPELINE 400 行）讀完即知該讀哪個 sub-canonical → 比當前「順序讀 1290 行才知道結構」反而更清楚

3. **「Plugin 開發成本太高，不如保留 prose 提醒就好」**
   反駁：DNA #15 反覆驗證 12+ 次「pipeline 才是閘門」 — 不儀器化的後果是教訓不停重複。REWRITE v2.13 → v2.20 的 v 升級 pattern「append 條規則 + 講教訓」就是 prose-only 退化路徑。短期成本 vs 長期 leverage 對比清楚（per SPORE 已 ship case）

4. **「REWRITE 跟 SPORE 不一樣，SPORE 是 200 字短文，REWRITE 是 5000 字深度文，case 不能類推」**
   反駁：產品差異是事實，但**結構問題同構**：（a）Stage 內部 sub-step 過載（b）hard gate 無 inventory（c）prose 規則沒儀器化 — 三個都是跨 pipeline 通病，per Mode 3 觸發訊號表至少兩條命中。SPORE 是先驗的 worst case（密度比 7:1），解了之後 pattern 可移植

5. **「Direction A 拆 7 個 file 會讓 cross-ref 維護成本爆增」**
   反駁：當前 49 個 cross-ref 只有 ~30 active 需更新（歷史層 ~19 不動 per §時間是結構）。拆檔後 active pointer 會增加到 ~60-80，但每個 pointer **更精準**（指向 sub-canonical 而非「REWRITE Stage X.Y」）。SPORE refactor 也有同樣顧慮，實際 ship 後 cross-ref 比舊版更穩（因為主路徑變短，少了 Step X.X.X 三層深 pointer）

---

## 附錄 B：跟其他 canonical 的對齊檢查

本計畫如何符合既有認知層原則：

| 原則                                  | 本計畫如何遵守                                                                     |
| ------------------------------------- | ---------------------------------------------------------------------------------- |
| MANIFESTO §造橋鋪路                   | Direction D plugin = 系統升級 > 手動苦工                                           |
| MANIFESTO §指標 over 複寫             | Direction A 拆檔解決 Stage 1.7 / 4.5 媒體 attribution 三處重複                     |
| MANIFESTO §時間是結構（修補協議）     | 歷史 v1.0-v2.20 教訓搬 sub-canonical 不刪除；歷史層 cross-ref 不更新               |
| DNA #15 反覆浮現要儀器化              | Direction D 是這條的具體實踐（7 條 rule 從 prose 升 plugin）                       |
| DNA #50 pipeline auto-detection       | 本 plan 不破壞 task → pipeline 對應表，反而簡化（拆檔後主檔更輕）                  |
| EVOLVE-PIPELINE Mode 3 SOP            | 本 plan 嚴格按 SCAN → DESIGN → SPLIT → REWIRE → INSTRUMENT → VERIFY → SHIP 7 stage |
| HEARTBEAT Beat 3 §改寫文章鐵律        | 拆檔讓「完整讀取」主檔變 ~400 行，遵守鐵律的成本下降                               |
| MEMORY §神經迴路（pipeline 才是閘門） | Direction D 直接強化此原則 — 7 條 rule 從自律升 gate enforcer                      |

---

## 附錄 C：跟 SPORE refactor 的對比表

| 維度                | SPORE refactor v2.9 → v3.0                     | REWRITE 預估 v2.20 → v3.0                                                                |
| ------------------- | ---------------------------------------------- | ---------------------------------------------------------------------------------------- |
| 主檔行數            | 1334 → 445（-66.7%）                           | 1290 → ~400（-69%，相似）                                                                |
| 寫作主路徑 read     | 1772 → 1092 行（-38%）                         | 2676 → 1280 行（-52%，更顯著）                                                           |
| Plugin 儀器化規則   | 1（§11） → 4（+#15 + #9 + #14）                | 4（§11 + format + image + cjk） → 7（+chronicle + research + media-matrix + arithmetic） |
| 拆檔數              | 1 → 4（PIPELINE / WRITING / VERIFY / HARVEST） | 1 → 7（PIPELINE / MODES / RESEARCH / WRITE / VERIFY / MEDIA / CRON）                     |
| 模式數              | 1                                              | 4（Fresh / Evolution / Merge / Boundary）                                                |
| 跨 pipeline pointer | 少（SPORE 較自包含）                           | 多（FACTCHECK / TRANSLATION / EDITORIAL / RESEARCH / CITATION / 4 sub-editorial）        |
| 預估 PR commits     | 10                                             | ~12-15                                                                                   |
| 預估 session 數     | 1                                              | 2-3                                                                                      |
| Cross-ref 影響      | ~20 active                                     | ~30 active                                                                               |
| 風險                | 中                                             | 中-高                                                                                    |

REWRITE refactor 比 SPORE 重一個量級的主要原因：

1. 4 模式 vs 1 模式
2. 跨 pipeline pointer 更密集（FACTCHECK / TRANSLATION / EDITORIAL 子家族 5 個檔案）
3. Cron 跟 manual 雙模式並存（CRON 段獨立性高）
4. 拆 7 個 sub-canonical vs SPORE 4 個

但收益也更顯著：寫文章主 read 量 -52% vs SPORE -38%。

---

_v1.0 | 2026-05-09 20:22 +0800 brave-kirch session — 觸發：哲宇「參考過去整理 spore-pipeline 完整整理拆分的報告與策略思考和經驗記憶，完整分析 rewrite-pipeline 並提出第一性原理重組與最佳化的分析與規劃到 report」_

_作者：Taiwan.md（Semiont 自我評估認知層 SOP 的元思考，第二輪 — Mode 3 應用範例）_

_狀態：**未實作 plan**。等哲宇 Q1-Q3 答案後收斂單一 PR scope_

_前案：[reports/spore-pipeline-evolution-plan-2026-05-08.md](spore-pipeline-evolution-plan-2026-05-08.md)（SPORE 1334 → 445 行 -66.7% 已 ship case）_

🧬
