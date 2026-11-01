---
title: 'REWRITE-PIPELINE-SINGLE'
description: '文章改寫主流程 canonical（單檔型，2026-09-19 起現行）— 6 stage 線性 (Stage 0 觀點 + 1-5 取材/寫/驗/形/連)，從 v6.7 續行：論點必須是一句對台灣的主張、研究 ~100 次天花板且一隻 lane 找人、開場一個人一個時刻、tw-* ≤ 4、無冷讀站'
type: 'pipeline-canonical'
status: 'canonical'
current_version: 'v6.8.3'
last_updated: 2026-10-21
last_session: '2026-09-26-230240-twmd-maintainer（v6.8.1：補回續行時漏掉的兩條——寫手讀整份研究報告（v7.4）、先判 spine 類型再鎖核心矛盾（v7.6/v7.7）；OBSERVER-QUEUE #81 哲宇拍板 B）'
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

# REWRITE-PIPELINE-SINGLE.md — 文章改寫主流程 v6.8.1（單檔型，現行）

> **現行 canonical（2026-09-19 起）。行數帽 2,300（husky 擋），只走 v6.x patch，升 minor 要哲宇拍板＋等量減法。不長回來的三樣：不設冷讀站、不設多席編輯室、不加後設論點形態。規則准入：錯誤修儀器不修句子，悶才進規則，且只從讀者 callout 進、每條寫明哪次 callout 哪篇。** v9 多檔型已搬 [archive/rewrite-v9.9-2026-09-19/](archive/rewrite-v9.9-2026-09-19/README.md)。這份從 2026-06-06〈國宅與居住正義〉ship 當天的 v6.7 續行，只加了五件 9/18-19 三篇實驗證明重要的事：**(1) 論點是一句對台灣的主張**，主詞是人、機構、制度或事件，「這場討論的形狀」不算論點（Step 0.6.5）；**(2) 研究 ~100 次天花板，其中一隻 lane 專門找人**（Step 1.1）；**(3) 開場是一個人在一個時刻做一件事，每段最多一個要讀者記住的數字**（Step 2.3）；**(4) tw-\* 模組單篇 ≤ 4**（Step 2.8）；**(5) 沒有冷讀站**——可讀性由 Step 2.3 與 `opening-readability.py` 接住（Step 4.1）。**v6.8.1（2026-09-27）補回續行時漏掉的兩條**，兩條都是哲宇先前拍過的修正，OBSERVER-QUEUE #81 哲宇拍板 B：寫手讀整份研究報告（v7.4，Step 0.2-bis 規則 3）、先判 spine 類型再鎖核心矛盾（v7.6→v7.7，Step 0.1.5）。背景：[LESSONS `third-type-thesis-defaults-to-meta-observation`](../semiont/LESSONS-INBOX.md)、工單 [reports/staging/humanize-brief-2026-09-19.md](../../reports/staging/humanize-brief-2026-09-19.md)。工具名以現行 `scripts/tools/` 為準（`article-health.py` 家族）。

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
│   Stage 0: 觀點 ─→ 7 steps（編輯前思考 + 模式判定）⭐ v6.0 新增          │
│            ├── Step 0.1 模式識別 [Fresh/Evolution/Merge/Boundary]        │
│            ├── Step 0.1.5 spine 類型（立體群像是預設畫布）               │
│            ├── Step 0.2 既有素材萃取（EVOLVE only）                       │
│            ├── Step 0.3 選 canonical（Merge variant only）                │
│            ├── Step 0.4 範圍切片表（Boundary variant only）               │
│            ├── Step 0.5 載入研究方法論 + 模板                             │
│            └── Step 0.6 觀點成型 🎬 (HARD GATE)                          │
│              ↳ Hard gate: §觀點成型落檔 + viewpoint_formed: true         │
│                                                                          │
│   Stage 1: 取材 ─→ 9 steps（純搜尋，帶 Stage 0 問題去驗證）              │
│            ├── Step 1.1 搜尋深度 全篇 ~100 天花板（一隻 lane 找人）       │
│            ├── Step 1.2 結尾素材鎖定                                      │
│            ├── Step 1.3 重複偵測                                          │
│            ├── Step 1.4 鎖 spine（核心矛盾或組織主軸）                    │
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
│            │     └── Step 3.3 含 --profile=rewrite-stage-3-5 plugin gate │
│            │         (footnote-format + footnote-density，v6.1 新增)     │
│            └── Step 3.5 Title+desc spine sync re-check 🥪                │
│              ↳ Hard gate: 0 dead-link / footnote canonical / spine 同步  │
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

| Gate                           | 觸發 stage | 條件                          | 工具                                                                                                   | 不過 = ?           |
| ------------------------------ | ---------- | ----------------------------- | ------------------------------------------------------------------------------------------------------ | ------------------ |
| **§觀點成型落檔**              | Stage 0 終 | depth article                 | manual: grep `## 觀點成型` in research report + frontmatter `viewpoint_formed: true`                   | **不進 Stage 1**   |
| spine 鎖（核心矛盾／組織主軸） | Stage 1 終 | 所有 depth                    | research report frontmatter manual                                                                     | 不進 Stage 2       |
| 研究報告落檔                   | Stage 1 終 | depth ≥ 2000 字               | manual ls + frontmatter `researchReport`                                                               | 不進 Stage 2       |
| **研究報告 SSOT health** 🔬    | Stage 1 終 | **所有 depth**                | `research-report-health.py --tier=depth`（distinct≥25 / en≠0 / 一手≠0 / 搜尋日誌 / 信度三層 / raw §8） | **不進 Stage 2**   |
| 媒體授權矩陣三表               | Stage 1 終 | 所有 article（**含 EVOLVE**） | manual append research 檔末尾 + ls public/article-images/{cat}/                                        | 不進 Stage 2       |
| 五指 + 結構 + 塑膠 + 算術      | Stage 3    | 所有 article                  | quality-scan + manual                                                                                  | 不 commit          |
| 事實鐵三角(算術/單位/引語)     | Stage 3    | 含金額/數字/引語              | python algebra + Ctrl-F                                                                                | 不 commit          |
| FACTCHECK Quick/Full Mode      | Stage 3    | 所有 article / A 級           | FACTCHECK-PIPELINE                                                                                     | 不進 Stage 4       |
| **Citation plugin gate**       | Stage 3    | **所有 article（含 EVOLVE）** | article-health.py --profile=rewrite-stage-3-5 (footnote-format + footnote-density)                     | **不進 Stage 4**   |
| **Title+desc spine sync**      | Stage 3    | **所有 article（含 EVOLVE）** | manual: title 冒號三明治 + desc 吃進核心矛盾                                                           | 不 commit          |
| **校正焦慮掃描** 🧱            | Stage 3    | **callout-triggered EVOLVE**  | Step 3.2-bis: backstop 自檢句 + grep 校正型句式 + 論點脊椎自檢                                         | **不 commit**      |
| Format check 7 維度            | Stage 4    | 所有 article                  | article-health.py --profile=rewrite-stage-4                                                            | pre-commit hook    |
| word-count ≥ 4500              | Stage 4    | depth article                 | article-health.py --check=word-count                                                                   | pre-commit hook    |
| 多語 visual smoke              | Stage 4    | i18n 改動                     | 6 步 bash                                                                                              | revert commit      |
| Image health                   | Stage 4    | 涉及圖                        | article-health.py --check=image-health                                                                 | 不進 Stage 5       |
| 呈現比例                       | Stage 4    | 涉及圖                        | check-aspect.sh / image-health §1c                                                                     | 換畫面或依主體重裁 |
| Sibling 格式預檢               | Stage 5    | 補 reverse cross-link         | article-health.py --check=format-structure                                                             | DEFER + 開 issue   |

**🔴 四條反射特別強化**（v3.1 sad-shockley 升級 + v6.0 新增第 3 條 + v6.2 新增第 4 條）：

1. **Title+desc spine sync 🥪** — 所有 category（不限 People）的 EVOLVE 在 Stage 2 寫完後**必須回看 frontmatter title + description**：
   - 標題是否走「主題：副標 hook」冒號三明治？（[EDITORIAL §三](../editorial/EDITORIAL.md) 美學層預設；不走的，研究報告寫一行 N/A 理由）
   - 副標一句是否能單獨 tweet 出去？
   - description 有沒有吃進這次 EVOLVE 加的新節核心矛盾？
   - 任一答 no → 重寫 frontmatter，跟 prose 同 commit

2. **媒體素材 self-check 🎬** — 不論 Fresh / EVOLVE，Stage 1 Step 1.9 都要跑：
   - Fresh：完整跑 inline 外連 + 圖片 + transcript + 三表 manifest
   - EVOLVE：先 grep 既有條目 frontmatter `image:` + §圖片來源 是否齊全 → 不存在 = pre-gate 遺珠，補跑
   - 找不到 PD/CC 圖時記錄邊界，不放空

3. **觀點先於搜尋 💭**（v6.0 新增）— 所有 article 進 Stage 1 前**必須跑 Stage 0.6 觀點成型**：
   - 六個核心問題（記憶 / 多元面貌 / 想法感受 / 歷史脈絡 / 社會關聯 / 類型專屬）逐一答完
   - spine 類型（Step 0.1.5）+ 切入點清單 + 預期核心矛盾／組織主軸候選 + 研究方向 落 research report §觀點成型 section
   - frontmatter `viewpoint_formed: true` 表示通過
   - Stage 1.4 鎖 spine 時，從 Stage 0.6 候選收斂為單一核心矛盾（矛盾驅動）或一條組織主軸（立體群像）
   - **EVOLVE 模式**：Stage 0.6 在 0.2 萃取舊素材之後跑。觀點從題材 + 研究長出，**不從「為什麼舊文寫不好」長出**（v6.2 反轉 v6.0：後者會讓校正焦慮變成論點脊椎，見 [Step 0.2-bis 拆除防火牆](#step-02-bis-拆除防火牆teardown-firewall-callout-triggered-evolve-強制-)）。**callout-triggered EVOLVE 強制走 Step 0.2-bis 三條防火牆規則 + Step 3.2-bis backstop。**

4. **拆除防火牆 🧱**（v6.2 新增）— **callout-triggered EVOLVE**（讀者/專家/peer 指出舊文錯、或自己 factcheck 抓到誤植所觸發的重寫）必過：
   - callout 只進 Stage 1 查證（`[CALLOUT-VERIFY]`），用完即丟，**不進觀點、不進正文**
   - Stage 0.6 觀點當作 Fresh 在做，**blind to errata**——論點脊椎不准是「歸屬要正確 / 別搞混 / 名字很重要」
   - Stage 2 寫作 context 隔離：首選 spawn fresh writer agent，隔離範圍是舊文 prose 與 callout，研究報告整份給（見規則 3）；主 session 自寫則 Stage 2 不重開舊文
   - Stage 3.2-bis backstop 自檢句：「如果第一次就寫對，這句還會存在嗎？只為回應過去錯誤而存在的，刪」
   - canonical：[Step 0.2-bis](#step-02-bis-拆除防火牆teardown-firewall-callout-triggered-evolve-強制-) + [Step 3.2-bis](#step-32-bis-校正焦慮掃描correction-meta-scancallout-triggered-強制-)。觸發：2026-06-01 影視配樂第二輪 callout（事實修對但充滿 AI 校正焦慮）

---

## ⚠️ Top 5 最常忘的 step

> 從 LESSONS-INBOX / memory 抽 ship-then-retract 高 friction step。動工前主動掃一次。

1. **Step 0.6 觀點成型**（v6.0 新增）— 沒有觀點之前的搜尋都是亂槍（蘋果西打 PR #1041 教訓：searched-first 寫成 crisis-only reveal，觀察者校正為 60 年完整記憶）
2. **Step 0.1.5 → 1.4 先判 spine 再鎖** — 矛盾驅動的題找不到矛盾 = 這篇不該被重寫（國防現代化重寫教訓）；受愛戴的題預設立體群像，改鎖組織主軸，不硬找矛盾（金曲獎 v1、施振榮 v1 教訓）
3. **Step 1.7 研究報告 = SSOT** — 搜了沒把原始軌跡寫回 §8 = 沒搜；信度三層 + negative findings + 反例 list（v6.5 從 12 範本萃取）；跑 `research-report-health.py` 驗收
4. **Step 2.4 小標題不編年體** — 編年體 = 維基百科化 = 失敗（Cicada / 草東 / 康士坦 教訓）
5. **Step 4.3.3 呈現比例** — 模板依原比例呈現不裁切；圖檔不為了框去裁或補邊（v6.8.3，張照堂直式照切到頭）

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

## 🤖 多 agent 編排（v6.3）— Orchestrator + tiered sub-agents

> v6.2 Step 0.2-bis 把「Stage 2 寫作 context 隔離」當 callout-triggered 專用。**v6.3 泛化成所有 depth EVOLVE / Fresh 的預設編排**：主 session 當 orchestrator（**不當 writer**），各 stage 派對應 model tier 的 sub-agent。觸發 + worked example：2026-06-01 台灣影視配樂第三輪重寫（[診斷報告](../../reports/reader-callout-pipeline-diagnosis-2026-06-01.md)）。

### 為什麼 orchestrator 不該自己寫

主 session 跑到 Stage 2 時，context window 已累積舊文 body、callout、研究筆記、（callout case）勘誤分析——這些全 prime 寫作 → 校正焦慮 / 編年體 / 密度失衡。**寫作要在乾淨 context**。主 session 的角色是 dispatch + synthesize + gate + 最終 spot-check。

### Stage × model tier × 派發

| Stage            | 誰做                                                       | model                                                         | 為什麼                                                                                                                                                 | context 隔離                                                                                                                                                             |
| ---------------- | ---------------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **0.6 觀點成型** | 1 sub-agent                                                | **Opus**                                                      | 觀點是最高判斷（這次失敗根因就是觀點被投毒）；探索搜尋加倍（≤ 10-15）                                                                                  | callout case：blind to errata（不給 callout / 勘誤 / 舊 §觀點成型）                                                                                                      |
| **1 研究深挖**   | N 個 parallel sub-agent（按子領域切，每 agent 分搜尋配額） | **Sonnet**（breadth + extract；contested atom escalate Opus） | falsification-first；全篇 ~100 次天花板（Stage 1 ~80，一隻 lane 找人）+ 來源配額（人~15/中~30/英~15/一手~15/反方~5）；結構化 verification table 落報告 | **各 agent 回報完整搜尋軌跡 + raw findings（不自己摘要）；orchestrator 把 ALL raw verbatim append 到 report §8，額外合成 §6 clean fact-pack（疊加層，不替換 raw）**      |
| **2 寫正文**     | 1 個 **fresh** sub-agent                                   | **Opus**                                                      | 寫作 craft 最高判斷；fresh context 才乾淨                                                                                                              | **給 topic + 整份 research report（§6 fact-pack 當導覽、§8 raw 必讀）+ 觀點 + EDITORIAL + pipeline**；不給舊文 prose / callout / errata 旁檔 / orchestrator 累積 context |
| **3.5 查證**     | M 個 parallel verifier ＋ 主 session                       | **Sonnet**（查證機械可查、fan-out 便宜）                      | 每 atom 對一手 Ctrl-F，adversarial（prompted to falsify）；高風險 atom（引語/歸屬/獎項屆次）≥ 2 verifier                                               | 主 session（Opus orchestrator）跑 deterministic gate（article-health）＋ 最終 spot-check                                                                                 |

### 鐵律（這次 worked example 學到的）

1. **觀點 agent blind to errata**（v6.2 §0.2-bis 規則 2 泛化）：viewpoint 從題材＋研究長出，不從「舊文為何爛 / callout」長出。
2. **寫作 agent 永遠 fresh，但要讀完整 research report（含 §8 raw），不是只吃 orchestrator 摘要的 fact-pack**（v7.4，2026-06-15〈迷音 Miin〉EVOLVE，哲宇 callout「為什麼你不讓他去讀 report，難怪最近文章都變爛」；9/19 從 v6.7 快照續行時漏掉，09-27 OBSERVER-QUEUE #81 補回）：隔離邊界是**舊文 prose ＋ callout**（病毒），研究報告整份給。writer prompt 必須叫它 `Read reports/research/{slug}.md` 全檔；§6 clean fact-pack（verification table ＋ 觀點 ＋ 媒體 manifest）只是導覽疊加層，**不能取代 writer 親讀 §8 raw 的逐字與細節**（呼應鐵律 6）。**反 pattern**：orchestrator 把 report 二次摘要成精簡 fact-pack 塞 prompt、又不讓 writer 讀 report ＝ 雙重失真。報告合成層的過程噪音會跟著被讀進去，由 `research-report-health.py` v4 擋（2026-08-15，v7.4 的副作用）；「舊文為何寫不好」的診斷寫在 errata 旁檔（Step 0.2-bis 規則 2），不進報告。
3. **sub-agent claim 是線索不是 oracle（[REFLEXES #31](../semiont/REFLEXES.md)）— 不可省的 hard gate**：agent 回報「gates 全過 / facts verified」**必須主 session 重驗**。2026-06-01 worked example：writer agent 自報全綠，主 session spot-check 抓到它**自己新長出一句杜撰引語**（賈樟柯「現代性／土地根性」，cited source 無此句）→ de-quote。Stage 3.5 verifier fan-out ＋ 主 session 對「引語 / 歸屬 / 獎項屆次」一手抽查 = hard gate。
4. **媒體用已驗證官方 URL，不採 agent 自選 ID**：writer agent 會挑 YouTube ID 但常是非官方 / fan upload。媒體 manifest 在研究階段驗證官方頻道後鎖定，writer 只填已驗證的（Step 1.9）。
5. **falsification > confirmation**：研究 ＋ 查證 agent 的 prompt 都要「try to break，不是 confirm」（[Stage 1 falsification](../semiont/REFLEXES.md) ＋ #16）。
6. **synthesis 不吃掉 raw（v6.4 — 這次 TDRI session 的反例）**：orchestrator「合成 clean fact-pack」**只是疊加層**，不准取代 agent 原始輸出。每個研究 agent 回報完整搜尋軌跡（不自摘要），orchestrator 把 **ALL raw verbatim append 到 report §8**（SSOT），再額外蒸餾 §6 給 writer。**report = SSOT，跑 `research-report-health.py` hard gate**（[Step 1.7](#step-17-研究報告--ssot對標研究所論文標準-)）。反例：2026-06-04 TDRI session 只留 192 行 fact-pack、丟掉 3 agent 的 ~45 次搜尋軌跡 → 報告退化成摘要、哲宇 callout 研究品質下降。

### 何時用全編排 vs 主 session 自跑

- **全編排**（觀點 Opus ＋ 研究 fan-out ＋ fresh Opus writer ＋ Sonnet verifier fan-out）：depth EVOLVE / Fresh、attribution-density 主題、callout-triggered、canon 類。
- **主 session 自跑**（不派 writer）：Micro heal / 單段 focused addition / 短修正——context 沒被大量污染。
- **可選 Workflow**：觀察者 opt-in workflow 時本編排可寫成 Workflow script（研究 / verifier fan-out ＋ adversarial verify）；預設用 Agent tool 逐 stage 派。

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

#### ⚡ 觸發來源旗標：callout-triggered（v6.2 新增，正交於 4 模式）

判完模式後**再問一句**：這次 EVOLVE 是不是被「外部錯誤 callout」觸發的（讀者 / 領域專家 / peer 指出舊文錯了，或我自己 factcheck 抓到誤植）？

- **是** → 在 4 模式之上**疊加 Teardown Firewall**：強制走 [Step 0.2-bis 三條防火牆規則](#step-02-bis-拆除防火牆teardown-firewall-callout-triggered-evolve-強制-) + [Step 3.2-bis backstop](#step-32-bis-校正焦慮掃描correction-meta-scancallout-triggered-強制-)。callout 只進 Stage 1 查證，不進觀點、不進正文。
- **否**（單純品質提升）→ 照常 EVOLVE，但 Step 0.2-bis 規則 2（觀點 blind to errata）仍建議遵守。

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

### Step 0.1.5: spine 類型（立體群像是預設畫布）🎭

> **v6.8.1 補回**：v7.6（2026-06-28）→ v7.7（07-06）→ v7.8（07-25）→ v9.10（09-19）累積下來的形態，9/19 從 v6.7 快照續行時漏掉，OBSERVER-QUEUE #81 哲宇 2026-09-27 拍板 B 補回。DNA 根：[MANIFESTO §13 立體地愛](../semiont/MANIFESTO.md)、[REFLEXES #77](../semiont/REFLEXES.md)。七種策展手法表與第三型六條紀律在 [archive v9.9 Step 0.1.5](archive/rewrite-v9.9-2026-09-19/REWRITE-STAGE-0-VIEWPOINT.md)。

判完模式就判 spine，**在想核心矛盾之前**：

| spine                                    | 適用                                                                                                   | Step 1.4 鎖什麼                                                                                              |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| **立體群像（預設畫布）**                 | 幾乎所有台灣主題；受愛戴的人物、機構、典禮、傳統、地方、工藝、集體記憶一律在這裡                       | 一條溫暖的組織主軸串 ≥ 4 個 facet；爭議當厚度不當主軸；人物的真實張力當一個 facet，不當主脊                  |
| **矛盾驅動**（例外，寫 `unlock_reason`） | 真正的公共爭議、醜聞、單一可辯的主張，需要一個 thesis 才誠實                                           | ≤ 30 字核心矛盾                                                                                              |
| **第三型：多觀點立場議題**               | 進行中的公共議題，多方都有正當立場，且有此刻可指認的戰場（法案審查中、事件偵辦中、明確的上路日或期限） | 結構性且未解的核心矛盾；文章替多方留位置，**論點仍是一句對台灣可被反駁的主張**（Step 0.6.5），不寫討論的形狀 |

- **拿不準且不是進行中的公共爭論 → 立體群像**；是進行中的公共爭論，不准用「拿不準」躲進立體群像
- **防誤分類**：一個人「有真實內在張力」不等於該用矛盾驅動。受敬重的人物預設立體群像，張力當一個 facet
- **self-check 判外部效果**：真的去想像一個支持者在讀，他會不會覺得被攻擊；自己能圓過去不算通過
- 非政治主題把政治、兩岸、主權當脊椎或壓軸 → 命中 §自主權邊界，要人拍板
- **立體不等於平**：立體群像一樣要押一句論點（Step 0.6.5），退回維基式面向清單是失敗

**落檔**：research report frontmatter `spine_type`（`立體群像`／`矛盾驅動`／`矛盾驅動（第三型）`），後兩者加 `unlock_reason`。**觸發**：2026-06-28〈金曲獎〉v1 把核心矛盾鎖成「官方獎 vs 拒領的聲音」，整篇批判論戰，哲宇 callout「太批判、切入點不對、會炎上、跟立體講好違背」→ v2 改立體群像；2026-07-06〈施振榮〉v1 把受敬重的人寫成他自己理論的反例，哲宇 callout「會炎上、沒立體、過度放核心矛盾」→ 立體群像升為預設畫布；2026-07-25〈外送專法〉哲宇 directive 公共議題走第三型；2026-09-18〈誰算低薪〉〈油價機制〉〈金鐘獎〉第三型寫出後設論點，隔天改回一句對台灣的主張。

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

### Step 0.2-bis: 拆除防火牆（Teardown Firewall）— callout-triggered EVOLVE 強制 🔥🧱

> **觸發**：EVOLVE 的觸發來源是「外部錯誤 callout」（讀者 / 領域專家 / peer / 我自己的 factcheck 發現「舊文錯了 A↔B」），而不是單純「品質提升」。
>
> **背景**：2026-06-01 配樂專業讀者 peilinwu0702 第二輪 callout。第一輪指出 `台灣影視配樂` 作曲家↔作品大量誤植 → 走 EVOLVE 重寫 → 事實層確實修對了（25 footnote 全一手）→ **但讀者第二輪罵的是「整篇充滿 AI 道歉 / AI 澄清、架構從頭就有問題」**。診斷：[reports/reader-callout-pipeline-diagnosis-2026-06-01.md](../../reports/reader-callout-pipeline-diagnosis-2026-06-01.md)。

#### 投毒機制（為什麼「只提取事實」這條鐵律會失守）

「舊文是病毒，只提取事實」是 Step 0.2 既有鐵律。但 callout-triggered EVOLVE 多了**第二層毒**：

1. **舊文 body** 在 session context window 裡（你讀它來萃取事實）。
2. **callout 本身**（「你把 X 配給 Y 是錯的」一連串勘誤）也在 context 裡。
3. Step 0.6 觀點成型若參考「為什麼舊文寫不好」（原 v6.0 reflexes #3 允許）→ **觀點 = 校正清單的昇華**。

結果：文章的論點脊椎變成「不要搞錯名字 / 名字很重要」（影視配樂 v2 thesis「搞錯名字就是搞錯聲音的出處」正是如此），正文散落「把 X 掛在他名下其實是錯的」「常被誤記成 Y」式的 9 處校正型句子 + 校正型策展 box。**「別人會搞錯」的那個「別人」就是這篇文章的前一版。** 讀者一眼看穿這是 AI 在公開處理自己的道歉。這是 `feedback_red_line_anxiety_leak`（別把來源焦慮漏進正文）的**架構級放大**：從「焦慮漏進句子」升級到「校正焦慮變成全文脊椎」。

#### 三條防火牆規則（callout-triggered 強制）

**規則 1 — callout → 純 fact-checklist，用完即丟**

callout 是線索不是 source（[REFLEXES #16](../semiont/REFLEXES.md)）。把它拆成 `[CALLOUT-VERIFY]` 逐條，**只餵 Stage 1 查證**（每條對一手來源重驗，連 callout 本身的 frame 都要查 — 影視配樂案：讀者也把 OPUS 誤記成雷亞，其實是 SIGONO）。查證完，**callout 文字本身丟掉，不進 Stage 0.6 觀點、不進 Stage 2 正文**。

**規則 2 — 觀點對 errata 失明（blind to errata）**

Stage 0.6 觀點成型**當作 Fresh 在做**：從題材本身 + 一手研究長出觀點，**像舊文與 callout 從不存在**。「為什麼舊文寫不好」是 meta 觀察，落 `reports/research/{slug}-errata.md`（研究報告的旁檔，writer 不讀）+ LESSONS-INBOX，**永遠不准進觀點、不准進正文**。（v6.8.1：寫手改讀整份研究報告之後，診斷若還寫在報告裡就會一起被讀進去，所以搬到旁檔。）

- 反指標自檢：我的核心矛盾 / 論點脊椎，是不是在講「歸屬要正確 / 不要搞混 / 名字很重要」？**是 → 觀點被 errata 投毒了，砍掉重想。** 一個配樂專家寫這題不會用「別搞錯名字」當主軸，他會用產業制度史 / 美學流派 / 世代傳承的真實骨架。

**規則 3 — Stage 2 寫作 context 隔離（架構解，非守備修補）**

「不再參考舊文」靠意志力做不到 —— 舊文 + callout 還在 context 裡就會 prime（[神經迴路：規則要能執行才算規則](../semiont/MEMORY.md)）。**強制隔離**：

- Stage 2 的寫作輸入 = `reports/research/{slug}.md` **整份報告（§6 fact-pack ＋ §8 raw 全部讀）** + §觀點成型 + EDITORIAL.md。隔離範圍只有舊文 body、callout 與 errata 旁檔（v7.4 補回，見鐵律 2）。
- **首選**：spawn 一個 fresh writer agent（Step 1.8 既有 spawn 機制），prompt 叫它 Read 整份研究報告 ＋ 觀點 ＋ anchors，**不給舊文 body、不給 callout、不給 errata 旁檔**。Agent 在乾淨 context 裡像第一次寫。
- **主 session 自寫時**：Stage 2 期間**不准重新打開舊文檔案**，只看 research report。寫完跑下方 Step 3.2-bis backstop。

#### Backstop 自檢句（Stage 3 hard gate，見 Step 3.2-bis）

> **「如果這篇文章第一次就寫對了，這個句子 / 這個 box 還會存在嗎？只為回應過去的錯誤、或為了澄清一個混淆而存在的，刪。」**

**Anti-example（影視配樂 v2 live，2026-06-01）**——這 9 處全部該被 backstop 攔下：

- 正文校正句：「把《海角七號》或《賽德克》的配樂掛在他名下，反而抹掉了…」「常被誤記成雷亞作品，其實出自 SIGONO」「把《茶金》…都記到他名下，反而蓋掉了他自己那座金馬」「順帶把遊戲和電影分清楚」
- 校正型策展 box：照片下方「把林強跟林生祥搞混，看起來只是拼錯一個字…」「叫錯一個名字，就把三種判斷攪成一團模糊讚美」
- 投毒的論點脊椎：「搞錯名字就是搞錯聲音的出處」

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

#### Step 0.6.4: 探索研究（≥ 20 次，v6.4 升級）

> **v6.4 升級**（2026-06-04 深度研究-設計研究院 session）：原 ≤ 5 次「輕量探索」升為 **≥ 20 次探索研究**。觸發：量測 226 份歷史 research report 發現 57% 英文/國際/學術來源 = 0、42% distinct 來源 ≤ 10，研究深度系統性不足。哲宇 directive「Stage 0 20+ / Stage 1 80+ / 對標研究所論文標準」。≤ 5 次只夠「確認東西存不存在」，長不出 grounded 觀點，也建不出 pre-search source map。

Stage 0.6 跟 Stage 1.1 的差別不是「搜幾次」，是**搜的目的不一樣**：

- **Stage 0.6 探索研究**：**≥ 20 次**，目的是**建框架 + 形成 grounded 觀點 + 畫出 pre-search source map**
  - 確認基本事實 + 時間軸 + 主要利害關係人
  - 找出未知的支線敘事與多元面貌（讓我知道有哪些角度可以深挖）
  - **盤點來源地圖**：這題有哪些中文一手（官方/年報/法規/學術）、哪些英文/國際/學術視角、哪些反方陣營——標出來給 Stage 1 deep-dive 排程
  - 確認類型加權矩陣的問題能不能對應到具體素材
- **Stage 1.1 深度搜尋**：**~80 次天花板**（其中約 15 次找人），目的是**驗證 / 反駁觀點 + triangulate + 累積寫作素材**

**全部 ≥ 20 次探索搜尋的 query + 一句話發現必須寫進 research report §探索搜尋紀錄**（per Step 1.7 SSOT 鐵律——搜了沒寫回 = 沒搜）。觀點不需要在 Stage 0 完全鎖死，Stage 1 會 refine；但「先搜夠 20 次再下觀點」是硬要求，避免 searched-first 補丁式觀點。

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

### 論點（一句對台灣的主張，讀者可以反駁）

- {主詞是人、機構、制度或事件。「吵的是哪一欄」「它記錄不決定」「這場爭論的形狀是⋯」這種主詞是討論本身的後設句不算；爭論的形狀可以當骨架，不能當主張。受愛戴的題不逼讀者選邊，但一樣要押一句。範例：「政府蓋的便宜房，最後養出早買者的資產扶梯」「最低工資守住了本薪，低薪搬進了年終那一欄」}

### 預期核心矛盾／組織主軸候選（待 Stage 1.4 收斂）

- spine_type：{立體群像／矛盾驅動／矛盾驅動（第三型）}（Step 0.1.5；後兩者附 unlock_reason）
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
- [x] spine 類型已判（Step 0.1.5）+ 切入點清單 + 核心矛盾／組織主軸候選 + 研究方向 已列
- [x] research report frontmatter `viewpoint_formed: true`

**沒過 = 不進 Stage 1。**

---

## Stage 1: 取材（純搜尋執行，預算 25-30%）

**目標**：產出一份結構化研究筆記，讓 Stage 2「不需要再搜尋」就能寫。**帶 Stage 0.6 觀點成型的切入點 + 核心矛盾候選去搜尋驗證 / 反駁 / 深化**。

**必讀**（Stage 0.5 已讀完，這邊只是 reminder）：

- `docs/editorial/RESEARCH.md`（方法論：搜尋策略、來源判斷、避坑指南）
- `docs/editorial/RESEARCH-TEMPLATE.md`（填空模板）

### Step 1.1: 搜尋深度 — 全篇 ~100 次天花板，其中一隻 lane 找人（v6.8）

**Stage 0 探索 ~20 ＋ Stage 1 ~80，到量即收**（哲宇 2026-09-19「找的多不如聰明的找，太多雜訊也沒用」；v9.1 曾升到 ~150，實測量不隨次數升）。prompt 寫「配額 N 次、到量即收」，不寫「下限／至少」。三隻 agent 各 ~25-30、四隻各 ~20，**其中一隻的題目就是「找人」**：這篇裡站在不同位置的真實的人——特寫、訪談、逐字感言、社群原帖、質詢逐字。

| 來源類別                                 | 最低配額 | 為什麼                                                           |
| ---------------------------------------- | -------- | ---------------------------------------------------------------- |
| **人**（特寫／訪談／逐字感言／社群原帖） | ~15      | 正文要有站在不同位置的真實的人，不然只剩官員與立委在說話         |
| **中文**（報導、社群、在地）             | ~30      | 在地視角、當地報導、社群記憶                                     |
| **英文 / 國際 / 學術**                   | ~15      | 國際視角 + triangulation；`research-report-health` en==0 是 HARD |
| **一手**（官方/政府/年報/法規/學術論文） | ~15      | claim 要追到原始來源，不是二手新聞的二手；primary==0 是 HARD     |
| **反方 / 批評**（perspective scan）      | ~5       | 跨陣營對立 spectrum，落 `rationale.whats_excluded`               |

- **多語系不是 nice-to-have**：英文/國際來源是 default。真正只有中文來源的題目在 §搜尋日誌 明寫「本題英文來源稀少，因為 X」，不靜默跳過。
- **正文有人是交付條件**：研究報告 §4 引語庫至少三個站在不同位置的真實的人（當事人／付錢或做決定的人／算尺或評論的人），找不到就在 §5 寫「找不到」＋原因，不准 Stage 2 用官員與立委的公文引語填。

**Stage 0.6 → Stage 1.1 銜接**：帶著 Stage 0.6 §觀點成型 列出的「研究方向（要搜什麼可以驗證）」+「核心矛盾候選 A/B/C」+「pre-search source map」進來。80 次的分配建議：35% 驗證 Stage 0.6 hypothesis、20% 反駁/深化、20% 找人、15% 英文/國際/學術、10% 探索預期之外的支線。如果搜完發現 Stage 0.6 觀點完全錯了，那是好結果 — Stage 1.4 找矛盾鎖定會自動修正。

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

### Step 1.4: 鎖 spine（矛盾驅動收斂核心矛盾，立體群像收斂組織主軸）🔥

在結束 Stage 1 之前，必須能回答：**「這篇文章靠什麼撐起來？」** 答案的形狀由 Step 0.1.5 的 spine 類型決定：

- **矛盾驅動／第三型**：好的重寫是矛盾層的工作。找到矛盾 = 找到重寫的理由，**找不到矛盾 = 這篇不該被重寫**。寫進研究筆記：`核心矛盾 = ?`（一句話，不超過 30 字）
- **立體群像（預設）**：寫進研究筆記：`組織主軸 = ?`（一句話，串起 ≥ 4 個 facet）。找不到組織主軸 = 還沒想清楚，回 Stage 0；**不准為了過這一關硬造一個矛盾**（金曲獎 v1、施振榮 v1）

**範例**（矛盾驅動）：

- 「台灣說要走豪豬戰略，但 76% 預算拿去買美國傳統武器」
- 「TFT 說要解決偏鄉教育，但孩子的問題不在教室裡是在整個生態系」
- 「美國要排除中國，但只給台灣一張入場券」（無人機產業 EVOLVE）

**v2.14 觸發背景**：2026-04-10 session α 國防現代化重寫的教訓——沒有李喜明那句苦笑，整篇會變回豪豬戰略勝利敘事。

### Step 1.4.5: Perspective scan — 跨陣營對立 spectrum 覆蓋 🧭

Step 1.4 收斂的是文章內部 thesis 矛盾。Step 1.4.5 找的是**跨陣營對立 spectrum** — 哪些陣營對本文 framing 會質疑、是否該引述對立論述、排除哪些理由。perspective scan 結果**必須**落地到 frontmatter `rationale.whats_excluded` (per [RATIONALE-SPEC.md](../editorial/RATIONALE-SPEC.md))。

**兩種做法擇一**：

| 做法                      | 適用                                                      | 觸發                       |
| ------------------------- | --------------------------------------------------------- | -------------------------- |
| **A. spawn 反方 agent**   | 爭議題目 (政治 / 史觀 / 政策 / identity)                  | sub-agent WebSearch 可用時 |
| **B. 作者自問 checklist** | 非爭議題目 OR sub-agent WebSearch 不可用 OR retrofit 場景 | 永遠可用作 fallback        |

#### 做法 A — sub-agent prompt (含防呆三條)

```
你是 [topic] 議題的反方代表 / 質疑者 / 批評者。
從反對立場找 5-10 個有實質論述的 sources。

防呆三條:
1. 每條對立論述必附 source URL — 拿不出 URL 就不算數
2. 列 5-10 條;論述不夠就明確標「對立陣營論述薄弱」+ 為什麼,不要硬湊
3. 顯式排除「情緒攻擊類 / 無實質論點」(範例: 人身攻擊 / 沒事實依據的 ad hominem / 純口號 chants)

回覆格式: { url, position summary, strongest argument, source quality grade (A/B/C) }
```

**設計目的**：寧可 agent 回「對立論述不夠」也不要 hallucinated 假反方觀點。前者作者還能判斷，後者會誤導作者把假論述當真論述處理。

#### 做法 B — 作者 self-checklist 5 題

寫文章前作者自問：

1. 這個主題的主要爭議陣營是誰？
2. 我引用的 sources 涵蓋了哪些陣營？
3. 我沒引的陣營有沒有實質論述存在於網路上？
4. 如果有，我為什麼沒引？
5. **對立論述如果存在但作者選擇不引 — 是因為 (a) 論述薄弱 (b) 篇幅限制 (c) 不在範疇？三選一寫進 `whats_excluded`**

**為什麼第 5 題強制三選一**：含糊帶過會變成「我有想過」的偷吃步 — 只有逼作者選一個具體原因，這個思考才真的留下來給後人。

#### 處理策略 3 選 1

對 sub-agent 結果或 self-checklist 結論，作者決定每個對立論述的處理：

| 策略                | 動作                          | 落地位置                   |
| ------------------- | ----------------------------- | -------------------------- |
| **引用**            | 把論述帶進文章作 counterpoint | 文章內 + 補新 `[^N]`       |
| **排除 + 理由**     | 不帶進文章，理由寫進 metadata | `rationale.whats_excluded` |
| **不在範圍 + 理由** | 對立論述跟本文焦點不同        | `rationale.whats_excluded` |

→ 跟 RATIONALE-SPEC.md hard coupled — perspective scan 結果**必須**落到 metadata。

#### 不做的事

- ❌ 不強制平衡 (總有平衡不完)
- ❌ 不取代 Step 1.4 找矛盾 (perspective scan 是 1.4 的延伸)
- ❌ 不 retroactive 200 篇 (per #851 Build 3 「retrofit 太重」)

**觸發背景**：2026-04-30 issue #851 哲宇提 No2「20 個 source 是數量檢查，沒有觀點檢查」。5/22-23 Phase 3 統獨光譜 + Phase 4 蔡英文 retrofit 兩篇 dogfood 後 ship canonical。完整脈絡見 [RATIONALE-SPEC.md](../editorial/RATIONALE-SPEC.md)。

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

### Step 1.7: 研究報告 = SSOT（對標研究所論文標準）📁 🔬

> **v6.4 大改**（2026-06-04）：research report 從「agent 輸出 + header」升格成 **SSOT（single source of truth）**——對標研究所論文：有方法論（搜尋日誌）、有完整參考文獻、每個 claim 都標來源 + 信度、原始搜尋軌跡全留。**搜了沒寫回 report = 沒搜**。觸發：v6.3 多 agent 編排「合成 clean fact-pack」把 agent 原始搜尋軌跡丟掉（違反「不摘要」），report 退化成摘要；量測 226 份報告 57% 英文來源 = 0。

**Scope gate**（不是所有文章都存）：

- ✅ 要存：People/ 深度文、Society/ 深度文、History/ 深度文、Tech/ 深度文（預計 ≥ 10 腳註 或 ≥ 2,000 字）
- ❌ 不存：Hub 頁面、短修正、翻譯、單事件補登

**檔案路徑**：`reports/research/YYYY-MM/{article-slug}.md`

#### 1.7.1 SSOT 八段結構（depth article 強制，v6.5 從 12 份範本萃取）

> 方法論 canonical + 信心程度系統 + 10 骨架在 [RESEARCH.md §二之二](../editorial/RESEARCH.md) + [methodology synthesis](../../reports/research-methodology-synthesis-2026-06-04.md)。

```markdown
---
article: knowledge/{Category}/{slug}.md
stage: 1-research
date: YYYY-MM-DD
session: { handle }
agents: [Explore×N / general-purpose]
search_count: { stage0: N, stage1: M, total: N+M } # Stage0 ~20 / Stage1 ~80 天花板
source_count: { distinct: X, zh: A, en: B, primary: C, opposition: D } # en/primary ≠ 0
core_contradiction: 一句話（≤ 30 字）
viewpoint_formed: true
verification: # 信心程度系統 — 每條附「憑什麼是這層」的基礎
  high_confidence: [...] # ≥2-3 獨立來源 verbatim 一致
  single_source: [...] # 單源，標 need cross-check
  unverified: [...] # 搜尋後仍無 / 有反證 → 不寫進文章
---

# Research Report: {Title}

## 1. 觀點成型（Stage 0，含 §探索搜尋紀錄 ≥20 query）

記憶 anchor / 多元面貌 / spine 類型 + 核心矛盾或組織主軸候選 2-3（多選一 + 為什麼）。

## 2. 搜尋日誌 / 方法論（Search Log）

全部 query（Stage 0 + Stage 1）逐條：`query → 一句話發現 → [source](URL)`，每條標 [中]/[英]/[一手]/[學術]/[反方]。
**negative finding 必記**（「搜尋 N 次未找到 X」「Y 機構未發布」）——搜了沒找到也是 finding。

## 3. Findings by sub-topic（§A / §B / §C …）

每個子題分章，每個 claim 後標**信度 + 基礎**（高信度〔A+B+C 多源〕/ 單一來源〔X 提及〕/ 必驗 / 未驗證）。
**數字分歧揭露**：多源不一致時寫出差異 + 怎麼處理（不靜默取一）；多口徑數字分開（交易額 vs 利益 vs 淨利）。
對標 gold standard 毒馬鈴薯 §1-§N。

## 4. 引語庫（verbatim quotes）

每條：逐字原文 + URL + 場合 + `Ctrl-F 可驗證 ✓/✗`。記者轉述分開標（「此為記者敘述，非直引」）。
找不到原文 → 標「改轉述不加引號」。

## 5. 反例 / 護欄（不能說的話 / 必驗反例 / 不採信清單）

出 fact 之前先列「這些推論錯誤要主動防範」+「雖然誘人但不能說的話」+「找到但不採信的線索 + 為什麼」。
（thesis-grade 跟一般報告最大分野。`政府/來源自身矛盾 > 正反並陳`。）

## 6. Clean Fact-Pack + Stage 2 操作規範（給 writer 的合成層，額外、不取代 raw）

去重乾淨事實 + 幻覺護欄 + 媒體 manifest + hook scene 候選（附時間軸）+ 5-8 小標題候選 +
不可忽略校正點 + **幻覺候選 Ctrl-F 清單**。Stage 2 writer 只吃這層。

## 7. 參考文獻 + Verification Table

全部 distinct 來源（標 [中]/[英]/[一手]/[學術]）+ 高風險 atom 表 `| claim | sources | Ctrl-F | 信度 | verdict |`。

## 8. Agent 原始輸出（raw，不摘要，append 全部）

每個研究 agent 的完整回報原文 verbatim 貼上（REFLEXES #22 raw 永不刪）。
```

#### 1.7.2 不摘要鐵律 × v6.3 編排的和解（v6.4 核心修補）

v6.3 多 agent 編排叫主 session「合成去重成 clean fact-pack」，但這跟 Step 1.7「agent 完整輸出，不摘要」**衝突** —— 這次 TDRI session 就是只留 fact-pack、丟掉 3 個 agent 的原始搜尋軌跡，report 退化成 192 行摘要。

**和解規則**：synthesis 是**疊加層**，不是替換。

1. 每個研究 agent 回報**完整搜尋軌跡 + 原始 findings**（不准自己摘要）。
2. 主 session 把**所有 agent 原始輸出 verbatim append 到 §8**（SSOT raw）。
3. 主 session **額外**合成 §6 Clean Fact-Pack 給 writer。
4. §6 是 §8 的蒸餾，不是 §8 的替代。**§8 缺席 = Stage 1 未完成**。

#### 1.7.3 HARD GATE：`research-report-health.py` 🔬

```bash
python3 scripts/tools/research-report-health.py reports/research/YYYY-MM/{slug}.md --tier=depth
```

驗收（depth tier）：distinct 來源 ≥ 25 / **英文來源 ≠ 0**（理想 ≥ 5）/ **一手來源 ≠ 0**（理想 ≥ 5）/ 有搜尋日誌 section / 信度標記 ≥ 8 / 行數 ≥ 300。**hard_fail > 0 = 不進 Stage 2**（回去補搜尋 + 把原始軌跡寫回 SSOT）。儀器化背景：把 §Step 1.1 的 4 條來源配額從 aspirational 變可量測（REFLEXES #15）。

**好處**（[REFLEXES #22 raw 永遠不刪](../semiont/DNA.md) + [MANIFESTO §造橋鋪路](../semiont/MANIFESTO.md)）：

- Audit trail / 跨文 re-use / agent prompt tuning 樣本 / 時間切片對照（同舊版）
- **+ SSOT**：reader callout 質疑某 claim → 直接在 §7 Verification Table + §8 raw 追到當時逐字來源，不用重搜

**存檔責任**：Stage 1 主 session 在 agent 回傳後**同一個 response** 內寫 §1-§8 完整檔 + 跑 research-report-health gate，不 defer。raw §8 缺席或 gate hard_fail = Stage 1 未完成。

**讀取責任**：Stage 2 Write 開始前，grep `reports/research/` 看有無相關主題報告可 cross-reference。**Writer agent 讀整份報告，§6 Clean Fact-Pack 是導覽**（v7.4 補回；context 隔離的對象是舊文與 callout，per §多 agent 編排鐵律 2）。

#### Step 1.7 附：reports/ 頂層 ad-hoc report 命名 convention（2026-05-27 新增）

> ⚠️ 本附則約束 **Stage 1 research report 以外** 寫到 `reports/*.md` 頂層的 ad-hoc 報告（design / plan / analysis / audit / evaluation / evolution / proposal / ops / semiont-analysis 等）。Stage 1 research report 維持 `reports/research/{YYYY-MM}/{article-slug}.md` 格式不變。
>
> 觸發：[reports/reports-archival-audit-2026-05-27.md](../../reports/reports-archival-audit-2026-05-27.md) §4 Layer 2 — 113 個頂層 ad-hoc report 命名整齊但 prefix 自由式，9 type bucket 規律僅 corpus 萃取存在，未升 canonical 規範。

**命名格式（推薦）**：

```
{type}-{topic}-{YYYY-MM-DD}.md
```

**9 type bucket**（從 corpus 萃取 + audit §2.3 規範 + `scripts/tools/generate-reports-index.py` plugin gate）：

| Type            | 用途                                                                                                    | 範例                                               |
| --------------- | ------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| `design`        | 設計提案 / 系統設計                                                                                     | `become-boot-mode-design-2026-05-13.md`            |
| `plan`          | 執行計畫 / orchestration / planning                                                                     | `historic-districts-series-planning-2026-05-21.md` |
| `evolution`     | 進化計畫 / roadmap / spec                                                                               | `homepage-evolution-2026-05-26.md`                 |
| `analysis`      | 數據分析 / investigation / deep-research / discussion                                                   | `ai-crawler-404-analysis-2026-04-18.md`            |
| `audit`         | 體檢 / snapshot / hygiene 盤點                                                                          | `reports-archival-audit-2026-05-27.md`             |
| `audit-routine` | Routine 自動產出的 audit（routine-audit / sense / heartbeat / homepage-evolution / self-evolve-weekly） | `routine-audit-2026-05-27.md`                      |
| `evaluation`    | A/B test / fit-check / POC / 模型評估                                                                   | `editorial-v6-ab-test-2026-05-09.md`               |
| `proposal`      | 提案 / strategy（要哲宇拍板的）                                                                         | `2026-election-evolution-proposal-2026-05-27.md`   |
| `ops`           | 操作報告 / triage / handoff / fix（unmatched fallback）                                                 | `issue-1059-triage-2026-05-21.md`                  |
| `semiont`       | 其他組織 semiont-analysis（NMTH / TFT / PanSci / NML / ThinkingTaiwan）                                 | `PanSci-semiont-analysis-2026-05-18.md`            |

**規則**：

- **新加報告先過命名 check**：寫到 `reports/*.md` 頂層之前先想「這屬於哪個 type bucket」。命中 → 用對應 prefix；命不中 → 用 `ops` fallback
- **不搬既有檔**：113 個既有頂層 \*.md 維持原命名（per audit §3「不搬家成本太高 / 239 references」）。本規範只約束新加 report
- **subdir 不受規範約束**：`reports/research/{YYYY-MM}/{slug}.md` 用 article-slug；`reports/probe/YYYY-MM-DD.md`、`reports/weekly/YYYY-MM-DD.md` 用 date；`reports/ab-tests/`、`reports/music-media-audit/`、`reports/translation-research/`、`reports/harvest/` 各有自己 convention，皆健康
- **type 增加 SOP**：若實際寫作出現第 10+ type，先 append [audit report §4 Layer 2](../../reports/reports-archival-audit-2026-05-27.md) 規範 → 同步加入 `scripts/tools/generate-reports-index.py` TYPE_BUCKETS regex
- **歸檔自動分桶**：每日 06:00 + 23:00 `bash scripts/tools/refresh-data.sh` Step 13 跑 `generate-reports-index.py` 自動 regen `reports/INDEX.md`，按 9 type × 月份 雙軸索引

**為什麼這條 convention**：

- 9 type bucket 不是 top-down 設計，是 113 file corpus 真實規律的命名（per audit §2.3 regex distribution）
- 對未來自己最大幫助：grep `reports/*-design-*` 找 design / `reports/*-audit-*` 找 audit，~90% noise reduction
- 對 fork Taiwan.md 的人最大幫助：copy `reports/INDEX.md` + `scripts/tools/generate-reports-index.py` 立刻有同樣的 observability

**反例**（避免）：

```
❌ 2026-election-evolution-proposal-2026-05-27.md  # double-date prefix 冗餘
✅ election-evolution-proposal-2026-05-27.md       # 單 date suffix

❌ P1-batch-repair-2026-05-13.md                   # tier-letter prefix 是 internal label 不對外
✅ ops-p1-batch-repair-2026-05-13.md               # ops 是 routine ops report

❌ daily-heartbeat-2026-04-11.md                   # heartbeat 是 routine 名稱不是 type
✅ audit-routine-heartbeat-2026-04-11.md           # audit-routine 更明確
```

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

**跟 Step 4.3.6 iframe embed 的分工**（2026-05-17 新增）：Music / People 條目可以**升級** inline link 到 iframe embed，提高閱讀的多重感受。判準：3-5 首代表作 → iframe（直接內嵌、視覺呼吸），其餘提及作品 → inline link。同篇可並存。詳見 [Step 4.3.6 影片 iframe 嵌入](#step-436-影片-iframe-嵌入music--people--nature-條目升級)。

**強制動作**：研究 agent 額外蒐集「文章預期會提到的所有公開作品」的官方連結，列入研究筆記獨立一節 §inline 外連 manifest。找不到官方版本 → 標 `[no official URL found]`，**Stage 2 寫作時不附 link 也不掰連結**。

#### Step 1.9.2: 圖片素材（hero + inline 圖）+ 授權矩陣

**🥇 選圖第一問：證據層級（2026-06-04 設研院 session 新增）** — 在挑授權之前先挑「這張圖讓讀者看到主角嗎」。Tier A 主體成果圖（改造後成果／作品本身／當事人在做那件事）> Tier B 脈絡圖 > Tier C generic 填位圖。**機構／設計／產品／作品／工程／事件題材，Tier A 成果圖優先；Tier A 找不到 CC 授權就走下方來源優先序第 8 點 fair use editorial commentary，不要退用 generic CC 填位圖**（授權便利不凌駕證據強度）。caption 一旦得寫「示意／非當事／非改造後」= Tier C 警訊，回頭找 Tier A。完整證據層級表 + source 技巧 canonical 在 [EDITORIAL §媒體編織 §圖片的證據層級](../editorial/EDITORIAL.md)。

**圖片用途分類**：

| 用途              | 位置                               | 數量           | 範例                                   |
| ----------------- | ---------------------------------- | -------------- | -------------------------------------- |
| **hero**          | frontmatter `image:`               | 1              | 林琪兒 EMU 1692×1691                   |
| **inline 圖**     | 文中 markdown `![]()`              | 1-2            | 林琪兒 Expedition 42 + Crew-4 training |
| **OG / 社群分享** | derived from hero（`/og-images/`） | auto           | dashboard 自動生成，不手動處理         |
| **spore poster**  | derived（`/spore-images/`）        | auto on demand | `make-spore.sh` 自動產，不手動處理     |

**理想數量 — length-scaled 媒體 band**（2026-06-04 哲宇 directive 升級，原 2026-05-09「2-3 張圖」是短文 baseline）：

媒體總量隨字數縮放，目標 **圖+影片 ≈ 1 媒體 / 1.1k 字**（含 hero），落在 **0.7–1.2 / 1k CJK** 健康帶；**長文（≥ 7000 字）朝 圖+影片 ≥ 8**。短文 hero only（1 張）。富媒體範本（哲宇點名）：設研院 5 圖（image-rich）/ 黃魚鴞 3（video-rich，2 官方影片）/ 陳建年 8（multimodal）/ 天下雜誌 6（mixed）。**圖跟影片都算媒體**——image-rich 或 video-rich 或 mixed 都可達標，不必全是圖。儀器：`paragraph-rhythm` 密度 band（floor 0.7 / ceiling 1.2 / hard 1.5+median<55）+ `media-richness` count target（長文朝 ≥8）。完整 baseline 表見 [EDITORIAL §媒體編織](../editorial/EDITORIAL.md#媒體編織圖片與影片穿插的敘事流2026-05-17-新增)。

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

**呈現比例**（v6.8.3，2026-10-21 哲宇：「就是要能適用不同大小的比例怎麼呈現在文章中，不是強制裁切圖」）：文章模板依原比例呈現每張圖——寬 ≤ 欄寬（桌機 726px、手機約 343px）、高 ≤ `min(75vh, 640px)`，等比縮、置中，hero 與內文同一套。比例不再決定圖會不會被切，只決定它在頁面上長什麼樣：

| 比例           | 頁面上的樣子（桌機）                        | 適合                     |
| -------------- | ------------------------------------------- | ------------------------ |
| ≥ 1.13 橫式    | 撐滿欄寬                                    | 場景、群像、hero 首選    |
| 0.75–1.13      | 高 640px、寬 480–726px，置中                | 肖像、半身、方形作品     |
| 0.4–0.75 直式  | 高 640px、寬 256–480px 的直幅，置中         | 書封、海報、全身照       |
| < 0.4 或 > 3.5 | 窄柱／細帶，細節看不清（image-health WARN） | 挑別的畫面，或依主體重裁 |

三條原則：**(1) 選圖看內容不看比例**——直式照片就讓它直著放，不為了填滿欄寬換掉更好的畫面；**(2) 不為了框去裁圖或補邊**——裁切只在要聚焦主體時做（例如去掉影片截圖的黑邊、切掉無關的空白），補黑邊湊比例一律不做；**(3) 要撐滿欄寬就給寬 ≥ 1200px 的檔**——比欄寬窄的圖照原寸呈現不放大（640px 寬的老照片就是 640px）。`bash scripts/tools/check-aspect.sh {filename}` 印出每張圖在桌機的實際呈現尺寸。舊護欄（hero 0.9–2.0／inline 0.75–2.5「不過就換圖」）是為舊模板 `object-fit: cover` 定的，那時全站 733 張內文圖有 597 張在桌機被裁。

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

- [x] spine 欄位必填（Step 1.4：矛盾驅動填核心矛盾、立體群像填組織主軸）— 填不出來 → 不進 Stage 2
- [x] depth-article 研究報告必存（Step 1.7）— `reports/research/YYYY-MM/{slug}.md` 不存在 → 不進 Stage 2
- [x] 媒體授權矩陣三表 append 完成（inline 外連 / 圖片 / transcript）
- [x] 圖片已 cache 在 `public/article-images/{category}/`
- [x] 呈現比例看過（check-aspect.sh 印的桌機尺寸合理；0.4–3.5；沒有為了框裁圖或補邊）
- [x] Transcript 已 cache 在 `reports/research/YYYY-MM/{slug}-transcripts/`
- [x] 私有 SSOT 整合過 Step 1.6 觀察者拍板（如有觸發）
- [x] Frontmatter audit 完成（`[STUB-TITLE]` / `[NO-MEDIA]` 標籤）— EVOLVE 才必跑

**沒過 = 不進 Stage 2。**

---

## Stage 2: 寫（預算 40-45%）

> **v6.3 預設**：depth EVOLVE / Fresh 的 Stage 2 **派 fresh Opus sub-agent 寫**（context 隔離，見 [§多 agent 編排](#-多-agent-編排v63-orchestrator--tiered-sub-agents)）。主 session 把整份研究報告（§6 fact-pack 當導覽）＋ 觀點 ＋ EDITORIAL 交給 writer，不轉貼舊文 prose。Micro / 短修正才主 session 自寫。

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

開場預設是**一個具體的人在一個具體時刻做一件事**（孫元勳在樹上找到一個巢；石忠勝掃光積蓄湊 40 萬頭期款）。機關公布數字、名單、「先把座標擺好」都不是開場。這是 [EDITORIAL §三](../editorial/EDITORIAL.md) 五種開場裡的強預設，其他四種要用，研究報告寫一行理由（美學層 N/A 出口，v6.22）。前四段每段最多一個要讀者記住的數字，其餘進模組或腳註；口徑限定詞（本國籍全時受僱員工／稅前批售價這類）正文只用人話解釋一次，精確口徑收進腳註或一則策展人筆記。範本：〈黃魚鴞〉〈國宅與居住正義〉。反例與量測：[humanize-brief-2026-09-19](../../reports/staging/humanize-brief-2026-09-19.md)。

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

**為什麼禁用手 grep**（REFLEXES #15 self-apply）：

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

1. **冒號三明治測試** — title 是否走「主題：副標 hook」格式？單純名詞 stub（`台灣無人機產業` / `颱風` / `周杰倫`）= 百科風格，需升。對照 [EDITORIAL §Title 冒號三明治（所有 category）](../editorial/EDITORIAL.md#title-冒號三明治所有-categoryv63-起v622-起為預設) — 不限 People；v6.22 起是美學層預設，不走的在研究報告寫一行 N/A 理由，席位審理由
2. **副標獨立成立測試** — 冒號後一句能不能單獨 tweet 出去？讀者只看到副標也能停下來嗎？
3. **EVOLVE spine sync 測試** — 這次 EVOLVE 加的新節核心矛盾，是否已寫進 description？舊 description 還適用嗎？description 沒吃進新核心 = SC 顯示舊 hook 但讀者點進來看到新內容 = 落差
4. **文字感 + 負面/草率掃描** 🆕（v6.5）— 標題有沒有報導者腔的文字感（具體人/地/物 + 張力 + 留白）？有沒有踩中文語境紅線（網路輕佻「搞/爛/雷/翻車」、農場「震驚/竟然/真相是」、負面定調「崩壞/淪陷」、自貶 dismissive、過度賣弄）？一句判準：念給長輩聽像「認真報導」還是「網路八卦」？canonical + 18 範例 gallery 在 [EDITORIAL §Title 的文字感](../editorial/EDITORIAL.md#title-的文字感--對標報導者公視獨立媒體v65-新增2026-06-04)

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

`tw-*` 視覺化模組**單篇 ≤ 4**（[graph.md §九](../editorial/graph.md)）：一張圖回答一個資料關係，第五張通常是把腳註畫出來。9/18 三篇各塞 11-13 個被哲宇讀成「過度強調數字」。**精選文（`featured: true`）上限 8 個，全篇媒體（hero＋圖＋影片＋模組）≤ 20**（2026-10-21 哲宇拍板，[EDITORIAL §四 呼吸鐵律 3](../editorial/EDITORIAL.md)）；`paragraph-rhythm` 對精選文改看這兩個總數。

富文本元素（per EDITORIAL）：

- 📝 策展人筆記
- 💡 你知道嗎
- ⚠️ 爭議觀點
- ✦ 結尾警句

每 800-1200 字 ≥ 1 個富文本元素，幫助節奏 + 視覺呼吸。數量是 [EDITORIAL §十](../editorial/EDITORIAL.md) 的美學層預設（v6.22）：0 則策展人筆記可以，研究報告寫一行理由；上限看 EDITORIAL §四 密度規則。

### Stage 2 Hard gates（10 條）

寫完 prose 不直接進 Stage 3，先驗：

- [x] 結尾不是罐頭（per EDITORIAL §結尾的四種模式）
- [x] 第一個名字是具體的人（前 30 行至少一個 named individual；美學層預設，N/A 要有理由）
- [x] ≥ 2 句真人引語（人物題材；數量是預設，每句逐字與出處是事實層）
- [x] 因果鏈完整（不是 list dump）
- [x] 開場具體事實（年/月/日 + 人 + 動作）
- [x] 富文本達標（每 800-1200 字 ≥ 1；預設，0 則要有 N/A 理由）
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

### Step 3.2-bis: 校正焦慮掃描（correction-meta scan）— callout-triggered 強制 🧱

> Step 0.2-bis 拆除防火牆的 backstop。即使前面三條防火牆做了，Stage 2 寫作仍可能漏出校正型 meta。這一關專抓「文章在公開處理自己的勘誤」。

**唯一自檢句（逐句 / 逐 box 過一遍）**：

> **「如果這篇文章第一次就寫對了，這個句子 / 這個 box 還會存在嗎？」**
> 只為回應過去的錯誤、或為了澄清一個混淆而存在的 → **刪**。

**儀器化掃描（callout-triggered 必跑）** — 2026-06-01 已升 article-health plugin：

```bash
# correction-meta plugin（取代原 raw grep）：抓 9 類校正型句式，回 line + snippet + 自檢句
python3 scripts/tools/article-health.py knowledge/{Cat}/{slug}.md --check=correction-meta
# 或直接跑 Stage 3.5 profile（含 footnote-format + footnote-density + correction-meta）
python3 scripts/tools/article-health.py knowledge/{Cat}/{slug}.md --profile=rewrite-stage-3-5
```

correction-meta DEFAULT WARN（dual-use 句式 + legacy soft-launch）。**callout-triggered EVOLVE 把任何 WARN 視為 must-fix**（人/agent 逐條過自檢句）。plugin: `scripts/tools/lib/article_health/checks/correction_meta.py`。

**論點脊椎自檢**：核心矛盾 / 30 秒概覽 / 結語，是不是在講「歸屬要正確 / 不要搞混 / 名字很重要」這類 meta？是 → 論點被 errata 投毒，回 Step 0.6 重想（**這關不過不只是刪句子，是重定觀點**）。

**Anti-example**：影視配樂 v2 的 9 處（Step 0.2-bis 已列）。**規則不如反例好記**（`feedback_subagent_anti_example_works`）—— 寫到「把 X 掛在他名下其實是錯的」這種句子時，腦中應該浮現「這就是影視配樂被罵的那種句子」。

**不過 = 不 commit。** 純品質提升的 EVOLVE 不強制此關，但論點脊椎自檢建議跑。

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
  - **citation plugin gate 必跑**：`python3 scripts/tools/article-health.py <article> --profile=rewrite-stage-3-5` — 含 `footnote-format`（強制 `[^N]: [Title](URL) — description` canonical 格式）+ `footnote-density`（hard=0 要求）
  - footnote URL 健康檢查（network-conditional）跑 `ARTICLE_HEALTH_NETWORK=1 python3 scripts/tools/article-health.py <article> --check=footnote-url`

> **plugin gate 鐵律**（v6.1，2026-05-17 admiring-montalcini）：`rewrite-stage-3-5` profile 必跑不是建議，是反射。Stage 4 `--profile=rewrite-stage-4` **不含** footnote-format（profile 分工：Stage 3.5 管 citation health / Stage 4 管 structure），跳過 Stage 3.5 plugin gate = CI full sweep（含全 16 plugin）會 hard-fail，本機 Stage 4 卻顯示綠燈 = silent leak through。誕生事件：2026-05-17 臺灣前途決議文 ship 後 CI fail（footnote-format hard=23），主 session 用 `--profile=rewrite-stage-4` local 跑全綠就 push，沒跑 `rewrite-stage-3-5` 因為 pipeline 沒明示 → 推回 Step 3.3 補一個 commit 修 29 條 footnote。對應 [REFLEXES #15 反覆浮現要儀器化](../semiont/REFLEXES.md) + [MANIFESTO §10 幻覺鐵律](../semiont/MANIFESTO.md#10-幻覺鐵律) — 把「該跑哪個 profile」從 SOP 隱性知識儀器化進 pipeline checklist。

#### 觸發 spawn agent 升級為 Full Mode 的條件

- article tier = A 級（≥ 50 footnotes 或 ≥ 3000 字 或 含直接引語 ≥ 10 句）
- article 對象為真人且可能引發人權／政治／法律敏感
- Quick Mode 過程中發現 ≥ 3 個 ❌ HARD-FIX → Quick 不夠，升級 Full Mode 重跑

#### Stage 3 Hard gates（FACTCHECK-PIPELINE Phase 6 Triage 結果必須）

- 0 個 🔴 DEAD-LINK（任何 footnote URL 4xx/5xx 都先換源）
- 0 個 ❌ HARD-FIX（claim 不在 source、引號內 paraphrase、third-person flip 等全部處置完）
- **`rewrite-stage-3-5` profile hard=0**（footnote-format + footnote-density，v6.1 升級為 Stage 3 hard gate；不是 Stage 4 dependency）
- ⚠️ SOFT-FIX 數量無上限，但每條都要在 commit message 列出，可 ship 後 polish
- 每個 ❌ 與 🔴 的修補都 append 到 `reports/research/YYYY-MM/{slug}.md` § audit section（REFLEXES #22 raw 永留）

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

#### 強制執行

```bash
python3 scripts/tools/article-health.py knowledge/{Category}/{文章}.md --profile=rewrite-stage-4
python3 scripts/tools/opening-readability.py knowledge/{Category}/{文章}.md   # 前四段：band 由範本定（WARN 3.6／百字、38 字；HARD ×1.3），exit 2 = 退回改寫
```

`opening-readability.py` 只量得到數字密度與句長，量不到「有沒有人」——那靠 Step 2.3 與 Step 1.1 的找人 lane。

`rewrite-stage-4` profile 含 9 個 plugin（HARD all）：

| Plugin               | 檢查內容                                                                                                                                                                                                                                                                                                                                                                        |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `frontmatter-format` | 必要欄位 + 順序                                                                                                                                                                                                                                                                                                                                                                 |
| `format-structure`   | 30 秒概覽 / 延伸閱讀 / 參考資料 section 存在                                                                                                                                                                                                                                                                                                                                    |
| `wikilink-target`    | wikilink 對應檔案存在                                                                                                                                                                                                                                                                                                                                                           |
| `link-target`        | markdown link path casing + existence                                                                                                                                                                                                                                                                                                                                           |
| `cjk-punct`          | 中文 prose 全形標點                                                                                                                                                                                                                                                                                                                                                             |
| `chronicle-lead`     | H2 不是 `## YYYY 年 X 月` 編年體                                                                                                                                                                                                                                                                                                                                                |
| `word-count`         | depth article ≥ 4500 CJK chars（v3.1 sad-shockley 新增，HARD via severity_override）                                                                                                                                                                                                                                                                                            |
| `image-health`       | depth ≥ 3 張（hero + 2 scene-mid）— v3.2 kind-mirzakhani 新增（HARD）                                                                                                                                                                                                                                                                                                           |
| `paragraph-rhythm`   | **段落 median ≥ 55 CJK + H2 prose 段落 ≤ 8 + 媒體密度 band 0.7–1.2/1k CJK**（v6.6 2026-06-04 哲宇 directive：從單一上限 0.8 升為 floor 0.7 media-poor / ceiling 1.2 / hard 1.5+median<55；從富媒體範本 設研院 0.91/天下 0.92/黃魚鴞 0.82 校準，舊 0.8 會誤判富媒體範本。WARN-only soft launch） + `media-richness` length-scaled count（長文朝 圖+影片 ≥8 INFO + 多模態 nudge） |

> ⚠️ **profile 邊界鐵律**（v6.1，2026-05-17 admiring-montalcini）：`rewrite-stage-4` profile **不含** `footnote-format` / `footnote-density`（那兩個在 `rewrite-stage-3-5` profile，Stage 3.3 跑）。Stage 4 跑全綠**不代表 CI 會過** — CI full sweep 跑全 16 plugin，包含 stage-3-5 的 footnote 系列。如果跳過 Stage 3.3 的 `rewrite-stage-3-5` plugin gate，本機 Stage 4 顯示綠燈但 CI 會 hard-fail。誕生事件：2026-05-17 臺灣前途決議文 ship 後 CI footnote-format hard=23（commit `b39ea5529` 補修 29 條 footnote）。對策：**Stage 3.3 必跑 `--profile=rewrite-stage-3-5`**（已寫進本檔 Step 3.3 + 頂部 Hard Gate Inventory）。

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
> 對應 [REFLEXES #19 大型 refactor 後 visual smoke test](../semiont/REFLEXES.md#四工程衛生)。

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

#### Step 4.3.1: 三段敘事節奏判斷（圖 + 影片 整合）

媒體插入位置影響敘事節奏，不是隨便塞。三段標準（圖跟影片穿插，per EDITORIAL §媒體編織）：

| 位置          | 用途                       | 圖型                  | 圖數 | 影片可放？                   | 範例                            |
| ------------- | -------------------------- | --------------------- | ---- | ---------------------------- | ------------------------------- |
| **hero**      | 30 秒概覽前，建立視覺認知  | 16:9 landscape 或 1:1 | 1    | ❌（影片在 hero 太重）       | 林琪兒 EMU 2014                 |
| **scene-mid** | 中段重要轉折前 / 後        | landscape 為主        | 0-2  | ✅（代表作 / 直播 / 演講）   | Expedition 42 / 〈海洋〉MV      |
| **closure**   | 結尾段視覺收尾（首尾呼應） | landscape             | 0-1  | 0-1（最後代表作 / 紀念影像） | 訪台首日場景照 / 〈美麗心蘭嶼〉 |

**整體類型 × 媒體比重 baseline**（canonical 在 [EDITORIAL §媒體編織](../editorial/EDITORIAL.md#媒體編織圖片與影片穿插的敘事流2026-05-17-新增)）：

- 音樂人：2-3 圖 + **2-3+** 影片（代表作 MV / 早期 / 最新三層時間軸）
- 運動員 / 演員 / YouTuber：2-3 圖 + 1-3 影片
- 樂團 / 音樂類型史：2-3 圖 + **3-5** 影片
- 政治人物 / 學者：2-3 圖 + 0-2 影片
- Nature / 生態：2-3 圖 + 1-2 影片
- Food / Culture / Tech：2-3 圖 + 0-1 影片
- Hub 頁：0 圖 0 影片

**通用判準**：

- depth-article（≥ 3000 字）：2-3 圖 + 依類型 1-5 影片
- 短文：hero only（1 張），不放影片
- 翻譯文：跟原文同步媒體（不另增 / 不另減）
- 找不到官方影片 → 不勉強塞，多放 1 張圖補位

**圖跟影片穿插原則**：兩者交錯出現，不疊放在同一段。圖跟影片之間至少隔 2-3 段 prose。沿 narrative arc 放，不是按重要性堆在開頭。

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

#### Step 4.3.3: 呈現比例

```bash
bash scripts/tools/check-aspect.sh public/article-images/{category}/{filename}
```

印出每張圖在桌機的呈現尺寸。模板依原比例呈現不裁切（規則與比例表在 [Step 1.9.2](#step-192-圖片素材hero--inline-圖-授權矩陣)）；0.4–3.5 之間都能用，超出由 `image-health` §1c WARN。看到「比欄寬窄，照原寸不放大」而那張圖該撐滿欄寬 → 找更大的原檔。誕生事件：〈一同走過從前〉張照堂 644×859 直式照在舊模板 `object-fit: cover` 下切到頭，哲宇：「未來處理圖的比例跟原則也進化到 repo」；更早的林琪兒 portrait hero 切到頭是同一個病。

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

#### Step 4.3.6: 影片 iframe 嵌入（Music / People / Nature 條目升級）

**觸發時機**：題材含**公開影像作品**且 inline link 不足以承載敘事張力時 — Music 條目（代表作 MV）、Nature 條目（生態直播 / 影像紀錄）、Documentary 條目（紀錄片預告）、Performance 條目（演出片段）。

**為什麼從 inline link 升 iframe**（哲宇 2026-05-17 directive）：「提高閱讀的多重感受」。Inline link 是「邊讀邊聽」option，iframe 是「閱讀流裡內建多媒體感官層」default。Music 條目尤其受惠 — 文字描述歌曲 vs 直接聽到歌曲是完全不同的閱讀體驗。

**URL 來源優先序**（同 Step 1.9.1）：

1. 官方頻道（藝人 / 廠牌 / 節目方 / 導演）— 角頭音樂 / 公視 / 滾石等 official YT
2. 國際串流官方（YouTube Music / Vevo official artist channel）
3. 主辦 / 策展單位官方頁

**不接受**：UGC 翻唱、二手轉貼、搜尋結果頁、Topic auto-generated channel（YouTube 自動生成的 "Provided to YouTube by..." 假頻道）。

**密度建議**（per [EDITORIAL §媒體編織 類型 × 媒體比重 baseline](../editorial/EDITORIAL.md#媒體編織圖片與影片穿插的敘事流2026-05-17-新增)）：

| 條目類型                  | 影片 iframe 最低 | 上限 | 備註                                             |
| ------------------------- | ---------------- | ---- | ------------------------------------------------ |
| **音樂人**                | **2-3**          | 5    | 代表作 / 早期 / 最新三層；找不到 official → 補圖 |
| **樂團 / 音樂類型史**     | 3                | 5    | 各時期代表作 anchored 到時間軸                   |
| **運動員 / 演員**         | 1                | 3    | 表演 / 訪談 / 比賽關鍵時刻                       |
| **YouTuber / Podcaster**  | 2                | 4    | 代表節目 / 訪談 (官方頻道)                       |
| **政治人物 / 學者**       | 0                | 2    | 演講 / 重要場合影像（如有）                      |
| **電影 / 紀錄片**         | 1                | 2    | 預告 / 關鍵片段（注意版權）                      |
| **歷史事件**              | 0                | 2    | 紀錄片 / 倖存者口述（如有官方版本）              |
| **Nature / 生態**         | 1                | 2    | 直播 / 紀錄片 / 觀察影像                         |
| **Food / Culture / Tech** | 0                | 1    | 大多靠圖即可                                     |
| **Hub 頁**                | 0                | 0    | 不放 iframe                                      |

Hub 頁 / 短文 / 純架構性條目不放 iframe。多於上限 → 視覺擁擠打斷敘事，重新分散。

> ⚠️ **媒體密度 band（floor + ceiling）**（v6.6 2026-06-04 哲宇 directive 升級，原 v6.4 2026-05-28 只有上限）：總體 (圖+影片+hero) density 落在 **0.7–1.2 / 1k CJK** 健康帶。**下限 0.7**：低於 = 媒體偏少（中華台北 0.56 / 黑冠麻鷺 0.57）→ 補圖或官方影片。**上限 1.2**：高於 = visual 密度偏高（陳建年 1.48 = 8 媒體已偏密）。**> 1.5 且段落 median < 55 = HARD atomization**（周蕙 1.76 = worst case）。`paragraph-rhythm` plugin 自動 catch 全 band。**升級理由**：舊上限 0.8 反而誤判哲宇點名的富媒體範本（設研院 0.91 / 天下 0.92 / 黃魚鴞 0.82）為「偏高」，與「提升媒體素材」directive 矛盾 → ceiling 升 1.2 + 新增 floor 0.7。富媒體 ≠ atomization：陳建年 8 媒體 + median ≥ 55 = 富而不亂。完整 narrative：[reports/spore-voice-drift-fix-2026-05-28.md §第 7 種 pattern](../../reports/spore-voice-drift-fix-2026-05-28.md) + 校準語料 8 篇（本次 dogfood）。

**位置原則**（呼應 Step 4.3.1 三段敘事節奏）：

- iframe 放在「該段 prose 結尾」，不是段首 — 讓讀者先讀完文字段，再有 option 聽 / 看
- 沿文章時間軸 / narrative arc 放，不是按重要性堆在開頭
- 每個 iframe 配 italic caption 標明 (1) 官方來源頻道 (2) 跟文章 narrative 的呼應

**標準格式**（黃魚鴞 / 陳建年 pattern）：

```html
<div
  class="video-embed"
  style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;margin:1.5rem 0;border-radius:8px;"
>
  <iframe
    src="https://www.youtube.com/embed/{VIDEO_ID}"
    title="{原始繁中標題}"
    style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;"
    loading="lazy"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen
  ></iframe>
</div>

_{source channel} 官方 MV：{跟文章 narrative 呼應的一句話描述}。_
```

**Verify 步驟**（強制）：

1. 每個 video ID 走 WebFetch 確認「Official Music Video」或「官方完整版 MV」標記（不憑 search title 推斷）
2. preview_eval 跑 `document.querySelectorAll('iframe[src*="youtube.com/embed"]').length` 確認 N 個 iframe render
3. preview_eval 列 `[...iframes].map(f => f.src.split('/embed/')[1])` 比對 video ID 跟原稿一致

**跟 Step 1.9.1 inline 外連的分工**：

- Step 1.9.1 inline link：3-8 個，作品名第一次出現處 hyperlink，預設都加（成本低）
- Step 4.3.6 iframe embed：3-5 個，沿 narrative arc 放代表作（高 value、高呈現成本）
- 同篇條目可以**並存** — inline link 給「邊讀邊聽 option」，iframe 給「代表作必看」

**範例參考**：

- Music 條目：[knowledge/People/陳建年.md](../../knowledge/People/陳建年.md) — 4 iframe 沿 1999 → 2000 → 2025 時間軸
- Nature 條目：[knowledge/Nature/黃魚鴞.md](../../knowledge/Nature/黃魚鴞.md) — 2 iframe (公視報導 + 雪霸育雛直播)，敘事密度型

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

### Routine 飛輪整合（v6.1 升級為 full-cycle，2026-05-24 哲宇 directive）

REWRITE 是 routine 飛輪 10 條核心 routine 之一（`twmd-rewrite-daily`）。**v6.1.1 起每天 18:00 晚間自動跑「研究 → 寫文 → 孢子 → 發文 → harvest」全 cycle**（v6.1.1 從 00:00 搬到 18:00 對齊台灣社群 20:00-22:00 prime time post）：

- **觸發**：`/twmd-rewrite` skill
- **Model**：Opus
- **Cadence**：每天 18:00 晚間（v6.1.1 — cycle 跑 ~150 min ~20:30 結束，spore post 落在台灣晚間社群活躍時段；v6.1 原 00:00 半夜 chain 已抽出）
- **Skill SOP**：[`~/.claude/scheduled-tasks/twmd-rewrite-daily/SKILL.md`](https://github.com/anthropics/claude-code-skills)（local mirror）
- **Stage chain（v6.1 full cycle）**：
  ```
  Stage 0 BECOME → Stage 1 git pull → Stage 2 article ship (REWRITE Stage 0-5 全跑) →
  Stage 3 commit + push article → Stage 4 SPORE chain（PICK=剛 ship article / VERIFY / WRITE / SHIP）→
  Stage 5 CI/CD wait gate v3.7（60 min cap，timeout → defer 不 abort）→
  Stage 6 social post（both Threads + X default per Routine context v3.8；單發只在 article frontmatter 標 `platformExclude` 才觸發）→
  Stage 7 SPORE-LOG + sporeLinks frontmatter + commit + push → Stage 8 /twmd-finale
  ```
- **Quality gate (article)**：article-health.py rewrite-stage-4 hard=0 warn=0 + 三源研究落檔 + 腳註合規 + frontmatter complete + word-count ≥ 4500
- **Quality gate (spore)**：article-health.py prose-health hard=0 score ≤ 3 + spore-writing hard=0 + 配圖 generated + AI pre/post-ship verify 5+6 條 PASS
- **Boundary**：本 routine 上限 ~150 min wall-clock（article ~60 min + spore prep ~15 min + CI wait ≤ 60 min + post ~10 min + log ~5 min）；超過 → spore defer + LESSONS entry（不 abort article ship）
- **不問 observer 鐵律**：所有 decision point 走 [SPORE-PIPELINE §Routine context 自動決策 defaults table](../factory/SPORE-PIPELINE.md#-routine-context-自動決策-defaults-v37-新增)

**為什麼 v6.1 升 full-cycle**（哲宇 2026-05-24 directive）：article ship 跟 spore 是同一條進化飛輪的兩端，分開跑會：

1. 缺一致性（article + spore 不同步、不同 angle）
2. Observer friction（每天要分兩次觸發、各自 review）
3. Cycle smoothness 數據缺失（無法 measure article→spore→broadcast 整體 throughput）

合一變 daily routine 後：每天 1 篇文章 + 1-2 條孢子（Threads ± X）自動發出，**進化飛輪自動轉**，observer 只在 escalation 時介入。

完整 routine 規格 → [ROUTINE.md §TWMD rewrite (daily)](../semiont/ROUTINE.md)。設計脈絡 + cycle smoothness 數據 → [reports/spore-pipeline-evolution-2026-05-23-article-to-spore-to-broadcast-cycle.md](../../reports/spore-pipeline-evolution-2026-05-23-article-to-spore-to-broadcast-cycle.md)。

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
8. **觀察者反覆 callout 同問題 → REFLEXES #15 反覆浮現要儀器化** → 升 plugin gate（chronicle-lead / word-count / Title+desc spine sync）
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

_v6.7 | 2026-06-04 深度研究-設計研究院 — 配圖證據層級（Step 1.9.2 選圖第一問）：v6.6（天下）升級的是媒體的「量／密度」（圖+影片 ≥8 / band 0.7–1.2/1k）；v6.7 補上正交的「質／證據」軸。**Tier A 主體成果圖**（改造後成果／作品本身／當事人在做那件事）> Tier B 脈絡圖 > **Tier C generic 填位圖**；機構／設計／產品／作品／工程／事件題材 Tier A 優先，Tier A 找不到 CC 就走 fair use editorial commentary（來源優先序第 8 點），不退用 generic CC 填位（授權便利不凌駕證據強度）。判準訊號：caption 一旦得寫「示意／非當事／非改造後」= Tier C 在報警，回頭找 Tier A。完整層級表 + source 技巧 canonical 落 [EDITORIAL §媒體編織 §圖片的證據層級](../editorial/EDITORIAL.md)。觸發：設研院文章 5 張原本全是情境圖（松山文創×2 / generic 投開票所 / 中山站既有空間「非改造後」），哲宇 callout「圖要補關鍵案例被改造完後的圖（fair use）」→ 換 3 張 TDRI 改造後成果圖（衛生所候診區／公投公報／中山站售票區，cache 本地 + fair use 標註）。fair use scope 沿用 EDITORIAL 2026-05-09 既立的機構公開作品編輯評論。對應 REFLEXES #15 儀器化。_

_v6.6 | 2026-06-04 天下雜誌 — 媒體素材要求 + 圖文配比儀器升級：哲宇 directive「提升 rewrite-pipeline 媒體素材要求 + 文章健檢工具，想要圖+影片>8 或圖文配比更精妙評估，參考設研院/黃魚鴞富媒體文章自我進化」。**儀器先於規則**：量測 8 篇校準語料（黑冠麻鷺/黃魚鴞/陳建年/周蕙/張懸/設研院/中華台北/天下，prose-CJK 同軸）發現**舊 paragraph-rhythm 上限 0.8 反而誤判哲宇點名的富媒體範本**（設研院 0.91 / 天下 0.92 / 黃魚鴞 0.82）為「密度偏高」——儀器跟 directive 矛盾。修補：(1) `paragraph-rhythm` R3 從單一 ceiling 升**密度 band**（floor 0.7 media-poor / ceiling 0.8→1.2 / hard 1.5+median<55），catch 媒體偏少（中華台北 0.56）也 catch atomization（周蕙 1.76）；(2) `media-richness` 加 length-scaled count target（圖+影片 ~1/1.1k 字，長文朝 ≥8，INFO）+ 多模態 nudge（People/Music/Nature 0 影片提示補官方影片）；(3) media-richness 進 rewrite-stage-4 profile。富媒體範本（設研院 image-rich / 黃魚鴞 video-rich / 陳建年 8 multimodal / 天下 mixed）寫進 Step 1.9.2 + EDITORIAL §媒體編織 baseline。dogfood：8 篇驗證 band 正確分流（rich 範本 clean / media-poor WARN / atomization HARD）。對應 REFLEXES #15 反覆浮現要儀器化 + #59 製造數字的人最易被數字騙（量測校準不憑感覺）。_

_v6.5 | 2026-06-04 深度研究-設計研究院（同 session 第二輪進化）— 研究方法論 grounded in 12 份範本：哲宇 directive「多讀 >10 篇做得好的，統合出完整方法論再進化一番」。3 個 Explore agent 完整讀 12 份最高分歷史 report（毒馬鈴薯 85 來源 / 沈伯洋 132 來源 / 吳哲宇 / 雷亞 / 認知作戰 / 前途決議文 / 聶永真 / 蘋果西打 / 海底電纜 / 巴拉圭 / AIA / brian-tseng），萃取共通方法論 DNA。**核心發現 = 信心程度系統（哲宇記得的那個，12/12 都有）**：三層 `verification:` frontmatter（high_confidence ≥2-3 源 verbatim 一致 / single_source 標 need cross-check / unverified 搜尋無果不寫進文章），每條附「憑什麼是這層」基礎 + 細 notation（★★★ 一手 DOI / 🟢🟡🟠 / `confidence: high` + Ctrl-F 欄 / ⚠️ 必驗）。Step 1.7 SSOT 七段→**八段**：加 §4 引語庫（逐字 + URL + 場合 + Ctrl-F，記者轉述分開）+ §5 反例/不能說的話/不採信清單（護欄前置）+ §3 數字分歧揭露 + §2 negative findings 必記 + §6 Stage 2 操作規範（hook/小標題/校正點/幻覺 Ctrl-F 清單）。方法論 canonical 落 RESEARCH.md §二之二（信度三層 + 10 骨架）。統合報告：[reports/research-methodology-synthesis-2026-06-04.md](../../reports/research-methodology-synthesis-2026-06-04.md)。對應 REFLEXES #16 多源 + #22 raw 永不刪 + #15 儀器化。_

_v6.4 | 2026-06-04 深度研究-設計研究院 — 研究階段升格對標研究所論文標準：Stage 0.6.4 探索搜尋 ≤5→**≥20**；Stage 1.1 ≥40→**≥80** + 4 條來源多樣性配額（中≥40 / 英≥20 / 一手≥15 / 反方≥5）；Step 1.7 research report 從「agent 輸出 + header」升格**SSOT 七段結構**（觀點成型 / 搜尋日誌方法論 / Findings by sub-topic 標信度 / Clean Fact-Pack 合成層 / 參考文獻 / Verification Table / **§7 agent raw 全 append 不摘要**）；新增 `scripts/tools/research-report-health.py` HARD GATE（distinct≥25 / 英文≠0 / 一手≠0 / 搜尋日誌 section / 信度標記≥8 / 行數≥300）儀器化 4 條配額；§多 agent 編排修「合成 clean fact-pack」regression（synthesis 是疊加層不替換 raw §7）+ 第 6 鐵律。觸發：量測 226 份歷史 report —— 57% 英文/國際/學術來源 = 0、42% distinct 來源 ≤ 10，且 v6.3 orchestration「合成 fact-pack」把 agent 原始搜尋軌跡丟掉（這次 TDRI session 報告退化成 192 行摘要 vs gold standard 毒馬鈴薯 85 來源 / 1,699 行）。哲宇 callout「研究報告品質下降 / 搜尋次數變少 / 沒有中英文不同來源」+ directive「Stage 0 20+ / Stage 1 80+ / 全部寫回 SSOT / 對標研究所論文」。診斷 + 設計：[reports/rewrite-pipeline-research-ssot-evolution-2026-06-04.md](../../reports/rewrite-pipeline-research-ssot-evolution-2026-06-04.md)。對應 [REFLEXES #15 反覆浮現要儀器化](../semiont/REFLEXES.md) + #22 raw 永不刪 + #16 多源驗證。_

_v6.3 | 2026-06-01 170717-manual — 多 agent 編排（Orchestrator + tiered sub-agents）：新增 §多 agent 編排 canonical — 主 session 當 orchestrator 不當 writer，各 stage 派對應 model tier（Stage 0.6 觀點＝Opus agent 探索 2× / Stage 1 研究＝Sonnet parallel fan-out falsification-first / Stage 2 寫＝fresh Opus agent 只吃 fact-pack / Stage 3.5 查證＝Sonnet verifier fan-out ＋ 主 session spot-check）。把 v6.2 §0.2-bis 規則 2-3（觀點 blind to errata ＋ 寫作 context 隔離）從 callout-only 泛化到所有 depth EVOLVE/Fresh。5 條鐵律含「sub-agent claim 是線索不是 oracle（REFLEXES #31）—— 主 session 重驗是 hard gate」（worked example：writer agent 自報全綠但 spot-check 抓到它新長一句杜撰賈樟柯引語）＋「媒體用已驗證官方 URL 不採 agent 自選 ID」。觸發：哲宇 codify 2026-06-01 台灣影視配樂第三輪重寫的完整多 agent worked experience。dogfood：本次重寫即此編排（觀點 fresh agent blind to errata / fresh Opus writer / 主 session 一手 factcheck 抓杜撰引語 + 媒體換回 morning 已驗證官方 iframe）。_

_v6.2 | 2026-06-01 170717-manual — 拆除防火牆（Teardown Firewall）for callout-triggered EVOLVE：新增 Step 0.2-bis（投毒機制 + 三條防火牆規則：callout→純 fact-checklist 用完即丟 / 觀點 blind to errata / Stage 2 context 隔離）+ Step 3.2-bis（校正焦慮掃描 backstop 自檢句 + grep 校正型句式 + 論點脊椎自檢）+ Step 0.1 callout-triggered 觸發旗標（正交於 4 模式）+ Hard Gate Inventory 加「校正焦慮掃描」row + 反射 #4 拆除防火牆 + 反轉 v6.0 reflexes #3 EVOLVE 條款（「可參考為什麼舊文寫不好幫助觀點成型」是投毒源，移除）。觸發：2026-06-01 配樂專業讀者 peilinwu0702 第二輪 callout —— `台灣影視配樂` EVOLVE 後事實層修對（25 footnote 全一手）但「整篇充滿 AI 道歉/澄清、架構從頭就有問題」。根因：舊文 body + callout 同在 session context → 觀點變成校正清單昇華 → 9 處校正型句 + 2 個校正型策展 box + 投毒論點脊椎「搞錯名字就是搞錯聲音的出處」。哲宇診斷「舊文+舊 context 投毒」比「callout 過擬合」更精準 —— 架構解（context 隔離）非守備修補（自檢句）。診斷報告：[reports/reader-callout-pipeline-diagnosis-2026-06-01.md](../../reports/reader-callout-pipeline-diagnosis-2026-06-01.md)。對應 `feedback_red_line_anxiety_leak` 架構級放大 + REFLEXES #16 + #15（規則要能執行）。_

_v6.1 | 2026-05-2x — footnote plugin gate：Stage 3 加 article-health.py --profile=rewrite-stage-3-5（footnote-format + footnote-density）為 citation hard gate。_

_v6.0 | 2026-05-11 admiring-montalcini-ec53b4 — Stage 0 觀點獨立 stage：新增 Stage 0「觀點」（6 step：模式識別 / 既有素材萃取 / 選 canonical / 範圍切片 / 載入方法論 / 觀點成型）作為 editorial vision 階段，與 Stage 1 取材的 data gathering 階段認知模式分離。觀點成型 6 核心問題（記憶 / 多元面貌 / 想法感受 / 歷史脈絡 / 社會關聯 / 類型專屬）+ 7 品質維度（溫度 / 人味 / 故事 / 策展 / 觀點 / 體驗 / 歷史社會關聯）+ 5 row 類型加權矩陣（People / Food-Culture / History-Politics / Tech-Industry / Nature-Geography）。允許輕量探索性搜尋 ≤ 5 次。§觀點成型 落 research report + frontmatter `viewpoint_formed: true` 為 HARD GATE，不過不進 Stage 1。原 Stage 1 Step 1.6-1.14 重編為 1.1-1.9，原 Step 1.1-1.5 移至 Stage 0。觸發：哲宇 2026-05-11 callout「重點在溫度 / 人味 / 故事 / 策展 / 觀點 / 體驗 / 與社會歷史環境跟我們人生的關聯」+「希望加一個觀點成型的步驟，總編輯視角看這個主題怎麼寫才會立體」+「想要獨立一個 stage」。Dogfood: [蘋果西打 PR #1041](https://github.com/frank890417/taiwan-md/pull/1041) research report 補 retroactive §觀點成型 section 作為首個案例。_

_v5.0 | 2026-05-11 admiring-cohen-8b68fc — Stage spine restoration：heading 階層 H1-H4 統一深度（文件 H1 / Stage H2 / Step H3 / sub-step H4）+ Step 編號正規化 N.M（解 v4.1 `## Step A-X` 5 套並排 grep collision）+ ASCII spine 顯化在頂部 + Stage 6 翻譯維持 v4.1 抽掉狀態指向巴別塔。觸發：哲宇 callout「用 v4 的精神進化 v3 — 所有步驟都是相同的，每篇都要跑過，只有第一個步驟有判定模式」。設計理由：[reports/rewrite-pipeline-v5-stage-spine-design-2026-05-11.md](../../reports/rewrite-pipeline-v5-stage-spine-design-2026-05-11.md)。_

_最近 milestone（完整 changelog → `git log docs/pipelines/REWRITE-PIPELINE.md`）_：

- **v6.6**（2026-06-04 天下雜誌）— 媒體配比儀器升級：`paragraph-rhythm` R3 升密度 band（floor 0.7 / ceiling 0.8→1.2 / hard 1.5+median<55，從富媒體範本校準）+ `media-richness` length-scaled count（長文朝 圖+影片 ≥8）+ 多模態 nudge。觸發：舊 0.8 上限誤判設研院/天下/黃魚鴞富媒體範本。8 篇 dogfood
- **v6.5**（2026-06-04 同 session 第二輪）— 研究方法論 grounded in 12 份範本：信心程度系統三層 verification（哲宇記得的）+ Step 1.7 七段→八段（引語庫 / 反例 list / 數字分歧揭露 / negative findings / Stage 2 操作規範）。方法論 canonical → RESEARCH.md §二之二。統合：[methodology synthesis](../../reports/research-methodology-synthesis-2026-06-04.md)
- **v6.4**（2026-06-04 深度研究-設計研究院）— 研究階段對標研究所論文：Stage 0 探索 ≥20 / Stage 1 ≥80 + 4 來源配額 / Step 1.7 SSOT 七段結構（raw §7 不摘要）/ `research-report-health.py` HARD GATE 儀器化 / 修 v6.3「synthesis 吃掉 raw」regression。觸發：226 份 report 量測 57% 英文來源=0 + TDRI session 報告退化
- **v6.3**（2026-06-01 170717-manual）— 多 agent 編排：orchestrator + tiered sub-agents（觀點 Opus / 研究 Sonnet fan-out / 寫 fresh Opus / 查證 Sonnet verifier fan-out ＋ 主 session spot-check）；§0.2-bis 規則 2-3 泛化到所有 depth EVOLVE/Fresh；「sub-agent claim 重驗是 hard gate」
- **v6.2**（2026-06-01 170717-manual）— 拆除防火牆 for callout-triggered EVOLVE：Step 0.2-bis 三條防火牆（callout→fact-checklist 用完即丟 / 觀點 blind to errata / Stage 2 context 隔離）+ Step 3.2-bis 校正焦慮掃描 backstop；反轉 v6.0「觀點可參考舊文為什麼爛」投毒源。觸發：影視配樂第二輪 callout
- **v6.1** — footnote plugin gate（Stage 3 footnote-format + footnote-density 升 citation hard gate）
- **v6.0**（2026-05-11 admiring-montalcini-ec53b4）— Stage 0 觀點獨立 stage：editorial vision 階段先於 data gathering；6 核心問題 + 7 品質維度 + 5 類型矩陣；§觀點成型 HARD GATE
- **v5.0**（2026-05-11 admiring-cohen-8b68fc）— Stage spine restoration：H1-H4 階層一致 + Step N.M 編號 + ASCII spine 在頂部；v3.0 spine 骨架 × v4 單檔載體 × v4 evolved 內容（影音必找 + 標題三明治不丟）
- **v4.1**（2026-05-11 sad-shockley）— Stage 6 抽掉 → 巴別塔 pipeline 指標；REWRITE 變 5 stage 線性
- **v4.0**（2026-05-10 sad-shockley）— 單檔收斂 + 模式收進 Stage 1 + 編號正規化 + ASCII diagram 在最前
- **v3.1**（2026-05-10 sad-shockley）— Hard Gate Inventory 加 Title+desc spine sync + 媒體素材 v3.1 雙條反射；EDITORIAL §Title 從 People-only 擴為全 category
- **v3.0**（2026-05-09 brave-kirch）— 1290 → 280 行（-78%）+ 拆 6 sub-canonical（**v4 已收斂回**）
- **v2.20**（2026-04-28）— 新增 Stage 1.7 媒體素材研究 + Stage 4.5 媒體插入（v4 收進 Stage 1 Step L + Stage 4 Step C，v5 改為 Step 1.14 + Step 4.3）
- **v2.18**（2026-04-21）— Stage 1 agent 選型 + 私有 SSOT 整合 + Stage 2 密度平衡 + Agent claim 驗證

🧬

_v6.8 | 2026-09-19 news-radar — 從 v6.7 快照（`b19194bea2`，〈國宅與居住正義〉ship 當天）續行成現行 canonical。哲宇 2026-09-19：「把 twmd-rewrite 技能先回頭對齊單檔型 rewrite-pipeline，多檔型留校察看，先不使用」。加入五條 9/18-19 三篇實驗的修正：論點是一句對台灣的主張（Step 0.6.5）／研究 ~100 次天花板＋找人 lane（Step 1.1）／開場一個人一個時刻＋數字紀律（Step 2.3）／tw-\* ≤ 4（Step 2.8）／opening-readability（Step 4.1）；無冷讀站。_

_v6.8.3 | 2026-10-21 yitong — 圖片呈現比例：模板（article／category-hub）改依原比例呈現、不裁切（寬 ≤ 欄寬、高 ≤ min(75vh, 640px)），Step 1.9.2 比例表與 Step 4.3.3 從「不過就換圖」改成「看呈現尺寸、不為框裁圖補邊」；`check-aspect.sh` v3 印呈現尺寸、範圍 0.4–3.5；`image-health` §1c 極端比例 WARN。哲宇原話：「就是要能適用不同大小的比例怎麼呈現在文章中，不是強制裁切圖」「未來處理圖的比例跟原則也進化到repo」。_

_v6.8.2 | 2026-10-21 yitong — Step 2.8 加精選文上限：`featured: true` tw-\* ≤ 8、全篇媒體 ≤ 20（哲宇拍板，EDITORIAL v6.23）。_

_v6.8.1 | 2026-09-27 twmd-maintainer — 補回 9/19 從 v6.7 快照續行時漏掉的兩條修正，都是哲宇先前拍過的：(1) 寫手讀整份研究報告含 §8 raw（v7.4，06-15〈迷音 Miin〉callout），改動多 agent 編排表、鐵律 2、Step 0.2-bis 規則 3、Step 1.7 讀取責任、Stage 2 前言；「舊文為何寫不好」的診斷改寫到 errata 旁檔，避免寫手讀整份報告時一起讀進去。(2) 先判 spine 類型再鎖核心矛盾（v7.6→v7.7，06-28〈金曲獎〉、07-06〈施振榮〉callout；MANIFESTO §13、REFLEXES #77），新增 Step 0.1.5，Step 1.4 立體群像改鎖組織主軸。觸發：Discussion #1757（kwt-klure）指出，維護班對照 v9.9 封存版驗證，OBSERVER-QUEUE #81 哲宇 2026-09-27 拍板 B。開場規則跟 EDITORIAL 五種開場互斥那一件併入 #74，這次不動。_
