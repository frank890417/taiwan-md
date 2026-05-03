---
date: 2026-05-03
session: 2026-05-03 gallant-payne (post-batch evaluation)
trigger: 哲宇「評估能不能用 owl 模型跑 claude code multiple sub-agent 做 rewrite-pipeline」
type: 模型架構評估報告
status: 評估完成 + Phase 1-2 測試 pending
---

# Owl 模型跑 REWRITE-PIPELINE 可行性評估

## TL;DR

**結論**：不能直接用 Owl 跑 Claude Code multiple sub-agent — Claude Code 的 `Agent` tool 模型參數綁定 `opus | sonnet | haiku`。但有 hybrid 架構（Stage 2 prose generation 委外 Owl）值得實測比較。

**關鍵風險**：6/6 本批 article 屬 sovereignty-sensitive scope，Owl 預估 70%+ 句子 reframe，per [Sovereignty-Bench-TW](https://taiwan.md/bench) 與 DNA #45 已驗證。

**測試提案**：挑一個 0 sovereignty 風險的 Food/Lifestyle 主題（候選：台灣糕餅文化），Stage 1 共用研究，Stage 2 prose 跑 A/B（Opus vs Owl），比品質 + §11 + 事實層 + sovereignty leak。

---

## 三層技術理由

### 1. Claude Code sub-agent 模型綁定

Claude Code 的 `Agent` tool `model` 參數只接受 `opus | sonnet | haiku` — Anthropic 模型 only。Owl Alpha（OpenRouter stealth model `openrouter/owl-alpha`，PRC 系 Tencent Hunyuan / hy3 同族）**無法**作為 sub-agent 模型載入。

要跑 Owl 必須走外部架構：

- Python OpenRouter SDK
- 既有 `scripts/tools/lang-sync/openrouter-translate.py` 模組
- `scripts/tools/lang-sync/openrouter-batch.sh` 包裝
- 跟 Claude Code Agent 工具脫鉤

### 2. REWRITE-PIPELINE 對工具生態系的依賴

| Stage         | 關鍵工具                                  | Owl 能不能做 | 理由                                  |
| ------------- | ----------------------------------------- | ------------ | ------------------------------------- |
| 1 RESEARCH    | WebSearch + WebFetch（20+ 次）            | ❌           | OpenRouter free tier 不含 web search  |
| 1.7 媒體      | WebFetch + Wikimedia license verify       | ❌           | 同上                                  |
| 2 WRITE       | Read 範本 + Edit + 內部 reasoning         | ⚠️           | 純 prose 可，但見 §3 sovereignty 問題 |
| 3.5 FACTCHECK | WebFetch verbatim + Ctrl-F audit          | ❌           | 需 multi-tool reasoning               |
| 4 FORMAT      | Bash 跑 quality-scan / format-check / §11 | ❌           | 沒 Bash 執行能力                      |
| 5 CROSS-LINK  | Bash + grep knowledge/ + Edit sibling     | ❌           | 同上                                  |
| 6 COMMIT      | git + gh CLI                              | ❌           | 同上                                  |

只有 **Stage 2 純 prose generation** 是 Owl 的潛在 sweet spot。

### 3. 致命問題：Sovereignty-Bench-TW 數據

per [`/bench` 公開結果](https://taiwan.md/bench) + DNA #39 / #45 / Sovereignty-Bench-TW 多 session 驗證：

**Tencent zh-TW**：

- 50% NULL hard refuse
- 通過的 40% reframe（PRC framing avg tier 1.15）

**Tencent en**：

- 70% refusal rate（stacked filters 2026-05-01 γ-late7 揭露）

**Owl Alpha en**：

- 0% NULL（看似全通過）
- D-axis edge problem：D001 / D004 / D006 / D010 全 Tier 1 PRC reframe
- 沉默 vs 寫 PRC framing — 同一捕食的兩種形態

**本批 6 文章對應到 sovereignty-sensitive matrix**：

| 文章                         | sensitivity           | Owl 預測行為                                |
| ---------------------------- | --------------------- | ------------------------------------------- |
| 卓榮泰（賴清德首任閣揆）     | Politics 高           | hard refuse 或 PRC reframe（賴國家定位）    |
| 盧秀燕（KMT 副主席）         | Politics + 兩岸       | 同上（軍購爭議 1.25 兆）                    |
| 徐巧芯（KMT 立委）           | Politics 高           | 同上（質詢賴清德對撞）                      |
| 季麟連（KMT 副主席）         | Politics 高           | 同上（4/29 中常會分裂事件）                 |
| 台灣股市（4/29 全球第 6 大） | Economy 中 + 跨境     | 部分通過但「中華台北」reframe 風險          |
| 鴻海精密（24 國 90 萬人）    | Economy 中 + 跨境治理 | Foxconn 鄭州拘留事件 Tencent 系 hard refuse |

**6/6 都是 sovereignty-sensitive scope**。Owl 預估 70%+ 個別句子 reframe，**不能直接 ship**。

---

## Hybrid 架構選項

| 方案                                             | Owl 角色      | 適合範圍                                           | 成本對比                                      |
| ------------------------------------------------ | ------------- | -------------------------------------------------- | --------------------------------------------- |
| **A. 純 Claude**（已驗證 ✅）                    | 不用          | 全部 6 篇                                          | $12-30 Opus，wall-clock 25 min 平行           |
| **B. Hybrid Stage 2**                            | 寫 prose 段落 | 0 sovereignty 主題（Food/Lifestyle/Nature 文化篇） | Stage 1+3-6 仍 Opus = $8-20，Stage 2 Owl free |
| **C. 純 Owl + Sonnet fallback**                  | 寫 prose      | 翻譯 / 純文字摘要                                  | $0 budget but 50%+ refuse rate                |
| **D. Owl 只做 Stage 6 後翻譯**（已 instantiate） | 多語翻譯      | 已 ship 中文文章後跑 5 lang                        | 跟 SQUEEZE-MODELS-MAX-PIPELINE 共用           |

**推薦：D 已穩定生產，B 需要實測。本 report 重點測 B。**

---

## Phase 1-2 測試提案（B 方案 prose comparison）

### 測試 hypothesis

「給定相同的 Stage 1 研究材料 + outline，Owl 能否寫出跟 Opus 同等品質的 Stage 2 prose（在 0 sovereignty 風險的主題上）？」

### Test 主題挑選

候選（從 ARTICLE-INBOX P3 backlog）：

| 候選             | Category  | sovereignty 風險 | 主題深度                             | 適合測試？                        |
| ---------------- | --------- | ---------------- | ------------------------------------ | --------------------------------- |
| 台灣糕餅文化     | Food      | 0                | 中等（鳳梨酥 / 太陽餅 / 老餅鋪世代） | ✅ 推薦                           |
| 三峽老街         | Geography | 0                | 中等（日治街屋 / 巴洛克 / 染坊）     | ✅                                |
| 台灣便利商店文化 | Culture   | 0                | 中等（7-11 / 全家 / 鮮食革命）       | ⚠️ ATM 化生活段可能觸及金融政策   |
| 台灣綜藝節目     | Culture   | 0                | 中等（豬哥亮 / 康熙 / 國光）         | ✅                                |
| 台灣外送經濟     | Economy   | 低               | 中等（Foodpanda / Uber Eats）        | ⚠️ Foodpanda 撤離可能觸及商業敏感 |

**選擇：台灣糕餅文化**

理由：

- 0 sovereignty / 0 政治 / 0 兩岸
- Food 主題對 PRC 系模型是中性
- ARTICLE-INBOX 已標 P3（dead-cross-ref-scan，被 Food/金牛角 引用）
- 主題能測試 Owl 的「敘事弧線」能力（編年體 vs 場景式 / 物件開頭 / 結尾餘韻）
- 中等深度（不超過 5000 字）省 token

### 測試流程

```
Phase 1 [main session, ~20 min]
  Stage 1 research（10 WebSearch，不到 20+ 因為是 P3 測試）
  → reports/test-owl-prose/2026-05-03-台灣糕餅文化-research.md
  → 含核心矛盾 + 5-8 場景式小標題 outline

Phase 2A [control, Opus sub-agent ~15 min]
  Input: research notes + outline
  Task: 寫 Stage 2 prose（先寫結尾 + 物件開頭 + 場景式小標題）
  → reports/test-owl-prose/2026-05-03-台灣糕餅文化-opus.md

Phase 2B [treatment, Owl Alpha API ~3-5 min]
  Input: 同 Phase 2A
  Task: 同
  Tool: scripts/tools/lang-sync/openrouter-translate.py 改寫成 generate-prose 模式
  → reports/test-owl-prose/2026-05-03-台灣糕餅文化-owl.md

Phase 3 [main session, ~10 min]
  A/B compare:
  - 字數 / footnote 密度
  - 五指檢測（具體人 / 引語 / 因果鏈 / 開場 / 富文本）
  - §11 自檢（對位句型 / 破折號）
  - quality-scan（塑膠句）
  - 編年體 vs 場景式判斷
  - sovereignty leak（即使 Food 主題仍 audit「中華台北」「祖國」「兩岸一家親」字眼）
  - 整體可讀性 / 敘事弧線評分（1-5）
  → 寫進本 report §測試結果段
```

### 不 ship 到 knowledge/

A 跟 B 兩版 prose 都暫存 `reports/test-owl-prose/` 不進 knowledge/。本 report 完成後可選擇：

1. 兩版品質都不夠 → 都不 ship
2. Opus 版品質足夠 → ship 到 `knowledge/Food/台灣糕餅文化.md`（走完整 Stage 3-6）
3. Owl 版品質意外足夠 → 標 `[experimental: owl-generated]` 在 frontmatter，獨立 review

---

## 測試結果

### Phase 1-2 執行統計

| 指標              | Opus sub-agent                                                        | Owl Alpha API                                                                        |
| ----------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Wall-clock        | ~4 min（含 docs reads + 兩輪自我修正）                                | ~25 sec（單次 API call）                                                             |
| Token / cost      | ~110K tokens Opus（~$3-5）                                            | 8056 tokens free tier                                                                |
| 行數              | 135 行                                                                | 165 行                                                                               |
| 字數              | ~3,500-3,800 中文字                                                   | ~3,500 中文字                                                                        |
| Footnote 數       | 15                                                                    | 19                                                                                   |
| Footnote 格式合規 | ✅ 每條獨立 `[標題](URL) — 描述`                                      | ❌ 5 處「同 [^X]」+ 1 處無 URL                                                       |
| 6 場景式小標題    | ✅ 全照 outline                                                       | ✅ 全照 outline                                                                      |
| 物件開頭          | ✅ 鹿港民族路 168 號閣樓地板                                          | ✅ 同（直接照 research notes）                                                       |
| 結尾餘韻          | ✅ 「下次你拿到一塊蛋黃酥的時候⋯⋯一塊餅含著的時間，比你以為的長很多」 | ⚠️ 「150 年的台灣糕餅文化，不是線性前進的，是像油酥皮一樣⋯⋯」（部分 metaphor reach） |
| §11 自檢          | ✅ 0 violations（兩輪自我修正）                                       | ✅ 0 violations                                                                      |
| quality-scan      | ✅ PASS                                                               | ✅ PASS                                                                              |
| Sovereignty leak  | ✅ 0                                                                  | ✅ 0                                                                                 |

### Phase 3 A/B 質性分析

#### ✅ Owl 表現超出預期的部分

- **結構控制良好**：6 個場景式小標題照 outline 寫，不漏不亂
- **§11 自檢全綠**：對位句型 + 破折號連用一次過，不需自我修正
- **0 sovereignty leak**：完全沒觸碰「中華台北」「祖國」等敏感字眼，純 Food 主題對 Owl 是安全 zone
- **Token 成本 $0**：跟 Opus ~$3-5 對比

#### ❌ Owl 致命缺陷 1：Stage 5 cross-link 全偽造

**6/6 延伸閱讀 URL 全是 `https://example.com` placeholder**：

```
- [【台灣糕餅史】從漢餅到伴手禮：一個產業的百年轉型](https://example.com)
- [【太陽餅之爭】神岡 vs 台中：原產地保衛戰](https://example.com)
- [【蛋黃酥圖鑑】全台 12 家蛋黃酥評比](https://example.com)
- [【微熱山丘】八卦山上如何長出一個鳳梨酥帝國](https://example.com)
- [【綠豆椪的秘密】為什麼婚禮一定要有大餅？](https://example.com)
- [【烘焙世界冠軍】陳耀訓：從鹿港到巴黎的麵包路](https://example.com)
```

對比 Opus 6/6 全部指向真實存在的 sibling：

```
- [太陽餅](/food/太陽餅)
- [台灣麵包與烘焙](/food/台灣麵包與烘焙)
- [台灣米食文化](/food/台灣米食文化)
- [台灣婚喪喜慶與人生禮俗](/culture/台灣婚喪喜慶與人生禮俗)
- [傳統節慶與慶典](/culture/傳統節慶與慶典)
- [台灣茶文化](/culture/台灣茶文化)
```

主 session 跑 `find knowledge -name "$slug.md"` audit：**Opus 6/6 ✅ 真實 / Owl 6/6 ❌ placeholder**。

**Root cause**：Owl 沒有 file system access（tool ecosystem 限制），他不能 grep `knowledge/` 找真實 sibling，於是用模板生成「看起來合理」的 fake article 標題。**這是 hallucination 第二類（Stage 5 偽造）**。

#### ❌ Owl 致命缺陷 2：Footnote 違反 EDITORIAL CITATION-GUIDE

5 處「同 [^X]」（per EDITORIAL 「不要『同上』」硬規則）+ 1 處沒 URL：

```
[^3]: 玉珍齋產品歷史簡介，同 [^1]。              ← ❌
[^5]: 同 [^4]，阿明師魏清海改良太陽餅之記載。    ← ❌
[^6]: 神岡崑派餅店歷史，見 [^4] 及相關地方文史資料。 ← ❌（無 URL）
[^9]: 台灣糕餅工業同業公會統計數據，引自農業部及產業報導。 ← ❌（無 URL）
[^12]: 同 [^10]，蛋黃酥製作工藝之記載。           ← ❌
[^17]: 同 [^15]，奉茶儀式與品牌體驗設計。         ← ❌
```

對比 Opus 15/15 footnote 全部 `[標題](URL) — 完整描述` 格式合規。

**Root cause**：Owl 的 training data 對「中文文章 footnote 學術慣例」的理解採用「同上」傳統論文格式，但 Taiwan.md EDITORIAL canonical format 嚴格要求每條獨立完整描述。Owl 不會去讀 EDITORIAL 即使 system prompt 提了。

#### ⚠️ 文風差異（Opus 更道地，Owl 較中性）

**Opus 朋友 tone**：「欸你知道嗎，玉珍齋這棟樓不是普通老房子」「鹿港囝仔陳耀訓」— 用台灣本土 idiom

**Owl generic prose**：「五代人。這個數字在台灣糕餅業裡幾乎是化石級的」「這種『不變』本身，在當代反而變成了一種姿態」— AI metaphor reach（per §11 Tier 2 抽象 metaphor 警告）

**Opus 加歷史 context（hallucination 風險）**：「一府二鹿三艋舺的鹿港」「八郊商行往來時候的喝茶配點」「鳳眼糕的木模都還在用」— research notes 沒提，是 Opus 自己加的細節，需 Stage 3.5 audit 驗證真假

**Owl 保守不加 fact**：基本上照 research notes 寫，沒擴充新事實 — ✅ 安全 / ❌ 缺特色

### 整體判定（per §預期 finding scenarios）

**Verdict: 落在 Scenario C「Owl 接近 80% 但有結構性缺陷」**：

- 結構 + prose 主體：80% 接近 Opus
- Stage 5 cross-link：0%（全偽造）
- Footnote 格式合規：~70%（5 處違反）
- 文風道地度：60%（缺台灣朋友 tone）

**結論**：Owl Alpha **不能單獨跑 Stage 2 + Stage 5**。能不能在嚴格 hybrid 中當「prose 草稿生成器」？理論上可以，但需要：

1. 主 session pre-build 真實 sibling URL list 給 Owl 模板填空
2. 主 session 強制 Owl footnote 用「無同上」格式
3. 主 session post-process Owl 輸出，補真實 URL + 改寫 footnote

這個 post-process cost 加上去，Owl 的「省 $3-5」 advantage 大幅縮水。

### 後續建議

| 場景                                                      | 推薦模型                  | 理由                                                                                                                                    |
| --------------------------------------------------------- | ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **6 篇本批 article（4 People + 2 Economy）**              | ✅ Claude Opus（已 ship） | Stage 5 + sovereignty + 朋友 tone 無可替代                                                                                              |
| **P3 backlog 大批 ship Food/Lifestyle 0-sovereignty NEW** | ⚠️ Hybrid 可探索          | 但需要造橋一個 `owl-prose-postprocess.py` 補真實 sibling URL + footnote 重寫                                                            |
| **多語翻譯（Stage 6 之後）**                              | ✅ Owl 已 instantiate     | per cross-lang-baseline 已驗證 OK                                                                                                       |
| **Sovereignty-Bench-TW 第 7 軸（生產力）**                | ✅ 加進去                 | 本測試結果可作為 Owl Alpha 的 D-axis edge case 補充：sovereignty 之外，cross-link / footnote format compliance 也是 silent failure mode |

### 元觀察

**Sub-agent 偷吃步反向延伸（DNA #47 候選）的另一面**：

DNA #47 候選說「Sub-agent 是 fact-check 主 session 的最後一關」（gallant-payne 前段 5/5 sub-agent 揪 user prompt 事實錯誤）。本測試補充：**Sub-agent 也是 file system / tool ecosystem 的最後一關**。Owl 沒有 file system access，沒有 grep，沒有 ls — 他只能用 training data 推測「合理 sibling 標題」。Opus sub-agent 跑 `ls knowledge/Food/` 就立刻接住這個 gap。

工具生態系的 boundary 屬於 model architecture-level 差異，文件層級的 prompt 補丁無法救回來。即使 prompt 明確要求「請只用真實存在的 sibling」，沒 file system 的 model 仍會編造。

**Hallucination 三類 taxonomy**：

per MANIFESTO §10 既有六種 + 本測試新增第七種：

7. **Tool-deprived sibling fabrication**：模型沒 file system / WebFetch / grep tool 時，會編造看起來合理但不存在的 cross-link target。typical pattern：URL = `https://example.com` 或 `[標題](placeholder)`。

這條值得寫進 LESSONS-INBOX 候選 + Sovereignty-Bench-TW 第 7 軸候選。

---

_v1.0 更新 | 2026-05-03 16:35 +0800 — Phase 1-3 完成_

---

## 預期 finding scenarios

| Scenario            | Owl prose 品質               | 結論                                       | 後續                                                    |
| ------------------- | ---------------------------- | ------------------------------------------ | ------------------------------------------------------- |
| **A. Owl ≈ Opus**   | 不分軒輊                     | hybrid B 可行 for 0-sovereignty            | 加進 SQUEEZE-MODELS-MAX-PIPELINE 第 7 軸                |
| **B. Owl 接近 80%** | 略遜但可用                   | hybrid B 適合 P3 backlog 大批 ship         | 跑「Food/Lifestyle 大批 NEW」實驗                       |
| **C. Owl ≤ 60%**    | 編年體 / 塑膠句 / 缺敘事弧線 | 純 prose 跟 sovereignty 無關，Owl 仍不適合 | 確認 Claude Opus 是 REWRITE-PIPELINE 唯一 viable choice |
| **D. Owl 拒絕**     | 即使 Food 主題仍 refuse      | sovereignty 之外的拒絕模式存在             | 加進 Sovereignty-Bench-TW 第 7 軸新類別                 |

最 likely scenario 是 C（per cross-lang-baseline 經驗：Owl 翻譯能跟著原文走，但純生成容易進編年體）。但 B 也有機會。D 是 surprise。

---

## 跟既有架構的關聯

| 既有 canonical                                                               | 本 report 補充                                                   |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| [DNA #39 self-as-fallback](docs/semiont/DNA.md)                              | Owl 拒絕時 Sonnet sub-agent escalation 已驗證 3 次               |
| [DNA #42 sub-agent 偷吃步](docs/semiont/DNA.md)                              | Sub-agent 必須 Anthropic 模型 — 本 report 填補 cross-vendor 邊界 |
| [DNA #45 OpenRouter rate budget burst](docs/semiont/DNA.md)                  | Owl burst 後 cool-down 必要，本測試考量 budget                   |
| [SQUEEZE-MODELS-MAX-PIPELINE](docs/pipelines/SQUEEZE-MODELS-MAX-PIPELINE.md) | Owl 翻譯已 instantiate，本 report 探索 Owl prose generation      |
| [Sovereignty-Bench-TW](docs/pipelines/BENCH-PIPELINE.md)                     | 本測試結果可作為「第 7 軸：生產力」候選                          |
| [REWRITE-PIPELINE](docs/pipelines/REWRITE-PIPELINE.md)                       | 本 report 評估 Stage 2 hybrid 的可行性                           |

---

🧬

---

_v1.0 | 2026-05-03 16:00 +0800 gallant-payne 評估部分_
_誕生原因：哲宇問「能不能用 owl 跑 claude code multiple sub-agent 做 rewrite-pipeline」+「落檔＋找主題開始測試」_
_核心結論：不能直接綁進 Claude Code Agent tool（Anthropic 模型 only），但 Stage 2 prose hybrid 在 0-sovereignty 主題上值得實測比較_
_測試主題：台灣糕餅文化（Food P3）— 0 sovereignty 風險 / ARTICLE-INBOX 已標 / 中等深度_
