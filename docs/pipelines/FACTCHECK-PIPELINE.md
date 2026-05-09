---
title: 'FACTCHECK-PIPELINE'
description: '事實查核方法論 SSOT — Phase 1-6 / 8 atom 類 / 11 hallucination pattern / 6 drift modes / Quick + Full mode'
type: 'pipeline-canonical'
status: 'canonical'
last_updated: 2026-05-04
last_session: 'magical-feynman'
sister_docs:
  - 'REWRITE-PIPELINE.md'
  - 'PEER-INGESTION-PIPELINE.md'
  - 'EVOLVE-PIPELINE.md'
upstream_canonical:
  - '../semiont/MANIFESTO.md'
  - '../semiont/DNA.md'
  - '../editorial/EDITORIAL.md'
  - '../editorial/RESEARCH.md'
---

# FACTCHECK-PIPELINE.md — 完整事實查核方法論（SSOT）

> **職責定位**：本 pipeline 是 Taiwan.md 事實查核的 **單一真實來源（SSOT）**——所有 atom 類別、hallucination pattern、drift modes、Phase 1-6 SOP、checklist 全部 canonical 在此。
>
> **跟 REWRITE-PIPELINE 的關係**：[REWRITE-PIPELINE §Stage 3.5](REWRITE-PIPELINE.md) 是本 pipeline 的 **觸發點 + pointer**（不複寫 SOP），執行時呼叫本檔 §Quick Mode（30-60 min，主 session 自跑，新文章 ship 前的 hard gate）。本檔的 §Full Mode（90-180 min，spawn agent，A 級條目 ship 後 audit / 觀察者質疑 / 月度巡邏 / PR 接收層）獨立觸發，跟 REWRITE 並列。
>
> **跟 RESEARCH.md 的關係**：RESEARCH 講「怎麼搜資料」；本檔講「**怎麼驗證已寫好的文章對得上資料**」。兩者方向相反——RESEARCH 從 0 蒐集，FACTCHECK 從 1 反查。
>
> **跟 EDITORIAL.md 的關係**：EDITORIAL §挖引語制度 + §紀實 vs 煽情 是寫作層紀律；本檔是**驗證層紀律**——驗證寫作層紀律有沒有真的執行。

---

## 為什麼需要這條 pipeline

實戰觀察（2026-04-28 沈伯洋條目 v2 audit 揭露）：

REWRITE-PIPELINE 既有 Stage 3.5/3.6 hard gate **抓不到的 issue 種類**：

1. **Over-citing**：一個 footnote 同時被綁住 5+ 個高風險 atom，但實際只支持其中 1-2 個。Stage 3.5 的「列 claim 表」流程容易把多 atom 綁同 footnote 當作「一條 claim 一個 source」，少跑 cross-check。
2. **Quote re-paraphrase**：作者把引號內的源文措辭略微改寫（為了「順」或「更清楚」），但保留引號 → verbatim 違規。e.g. 源文「電池收在坐墊下，外觀則偽裝成摩托車螺絲」被改寫為「把電池收在坐墊下，拉了一個攝影機出來，假裝是摩托車的螺絲」並用引號保護。
3. **Third-person flip**：受訪者用第三人稱稱自己（「中國標註的是他的座標」），主筆「順手」改成「沈伯洋的座標」放在引號內 → verbatim 違規。
4. **Attribution mismatch**：footnote 的 URL 真實 + 媒體真實 + 描述準確，但實際 claim 跟那篇報導對不上（報導沒寫該 fact）。
5. **Scope creep**：article 的 claim 比 source 廣。e.g. 「中國博主粉絲七百萬」但 source 只說「中國微博帳號」未提粉絲數。
6. **Number drift**：算術 sanity check 過了但 base 數字錯。e.g. 「曹興誠三十億抗共保台」claim 在 footnote 1 + 2 都查不到，但 article 把它當作既定事實穿插在多段。
7. **Dead-link blind**：footnote URL 在 commit 後失效（403/404），讀者點擊看不到 source。

這些 issue 個別都不致命，**累積就是「看起來有 source 其實 source 不支撐」**——讀者只要 click 一個 footnote 發現對不上，整篇文章的可信度就會被打折。

> **核心命題**：每一個 footnote、每一個直接引語、每一個具體數字，都必須通過 **「URL 活著 → 媒體真實發過 → 描述準確 → claim 跟 source 逐字對應」** 四關。少任一關 = 系統性 trust leak。

---

## Pipeline 預算與 tier 制

不是每篇文章都要跑完整 FACTCHECK。依文章類別分三 tier：

| Article Tier | 觸發條件                                                                                           | 預算                          | Stage 跑哪些                                           |
| ------------ | -------------------------------------------------------------------------------------------------- | ----------------------------- | ------------------------------------------------------ |
| **A 級**     | 真人 People／敏感人權／政治爭議／紀錄片／報導（≥ 50 footnotes 或 ≥ 3000 字 或 含直接引語 ≥ 10 句） | 90-180 min（含 25+ WebFetch） | Phase 1-6 全跑                                         |
| **B 級**     | 一般 People / Society / History 深度文（10-50 footnotes）                                          | 45-90 min（10-20 WebFetch）   | Phase 1, 3, 4 跑；Phase 2 採樣抽取；Phase 5 + 6 簡化   |
| **C 級**     | Hub 頁、短修正、翻譯文、Food / Geography 軟文                                                      | 15-30 min（5-10 WebFetch）    | Phase 3 footnote spot-check + Phase 4 高風險 atom 採樣 |

> **觸發新增 audit 的時機**：(a) 文章剛 ship 後（REWRITE-PIPELINE 內嵌跑 quick 版）(b) 讀者公開質疑（觀察者 callout / Issue / Threads 留言）(c) 月度巡邏（隨機抽 5 篇 A/B 級跑 sampling）(d) 外部 PR merge 前（接收層深度檢查）。

---

## 六階段流程

```
Phase 1: SCOPE & BUDGET    → 決定 tier、預算、目標 atom 採樣率
Phase 2: ATOMIC DECOMPOSITION → 抽出全文 high-risk atoms
Phase 3: SOURCE AUTHORITY AUDIT → 每個 footnote URL 跑 4 維度檢查
Phase 4: CLAIM VERBATIM CHECK → 每個 atom 對 source URL Ctrl-F
Phase 5: CROSS-CLAIM CONSISTENCY → 算術、時序、互引一致性
Phase 6: TRIAGE & APPLY → ✅ PASS / ⚠️ SOFT-FIX / ❌ HARD-FIX / 🔴 DEAD-LINK 分類處置
```

每個 Phase 都有 hard gate，前一階段不過不進下一階段。

---

### Phase 1：SCOPE & BUDGET

**目標**：決定本次 audit 的範圍與深度。

**輸入**：

- 待 audit 文章路徑
- 觸發來源（REWRITE Stage 3.5 / 觀察者 / Issue / 月度巡邏）
- 既有 research 檔（如有）`reports/research/YYYY-MM/{slug}.md`

**步驟**：

1. **判 article tier**（A / B / C）
2. **計算 atom 採樣目標**：
   - A 級：100% 全列（30 引語 + 20 數字 + 15 人名 + 15 機構 + 10 地點 + 10 物件 = ~100 atoms）
   - B 級：採樣，重點抓引語 + 數字 + 人名（~50 atoms）
   - C 級：footnote spot-check + 5-10 高風險 atom
3. **決定 spawn 策略**：
   - 自跑（主 session 親自驗）：適合 < 30 atoms 或 < 20 footnotes
   - Spawn `general-purpose`（需寫檔）：適合 A 級需 append audit report 到 research 檔
   - Spawn `Explore`（read-only）：適合 B 級，audit 結果回主 session 處理
4. **WebFetch 預算**：A 級 25+ / B 級 15+ / C 級 5+
5. **指定輸出位置**：A 級 → append 到 `reports/research/YYYY-MM/{slug}.md` §「YYYY-MM-DD 完整事實查核 ({session})」；B 級 → append 到 same 檔 § audit；C 級 → 寫入 commit message + LESSONS-INBOX

**hard gate**：若文章無 research 檔 + 為 A 級 → 暫停，先補 Stage 1 research 檔再跑 audit（沒有 research 檔的 A 級 article 是違反 REWRITE-PIPELINE v2.16）。

---

### Phase 2：ATOMIC DECOMPOSITION

**目標**：把全文拆成可獨立驗證的 claim atoms。

**Atom 8 類**（每類有 high-risk pattern）：

| #   | Atom Type     | 範例                                                                       | High-risk pattern                                                              |
| --- | ------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| 1   | **時間 atom** | 「2026-01-01」「十多年後」「某天下午」「七分半」                           | 模糊時段詞容易被 AI 從英文 summary 推導；具體日期到日層級易混淆                |
| 2   | **地點 atom** | 「信義路三段」「Morgridge Hall 1524」「松山慈惠堂」「大安森林公園」        | 街名門牌號碼 / 廳代號 / 樓層多源 paraphrase 容易增添細節                       |
| 3   | **動作 atom** | 「鞠躬三次」「自費購票」「facebook 大規模轉發」「剪掉爆炸頭」              | 動作沒有引號保護，AI 預設可從 paraphrase 推導                                  |
| 4   | **引語 atom** | 「箭靶」「沒在怕」「集體自卑」「Useful Idiots」                            | 措辭略改容易違 verbatim；third-person flip；中文 source 被英文 paraphrase 污染 |
| 5   | **數字 atom** | 「三百萬」「六億」「64%」「七百萬粉絲」「八天」                            | 整數倍率被四捨五入；總額 vs 分項混淆；分母不確定的比例                         |
| 6   | **人名 atom** | 「Maya Wang」「Henry Pontell」「孤烟暮蟬」「林月琴」                       | 英文名拼音 / 職稱錯置 / 第二創辦人省略                                         |
| 7   | **機構 atom** | 「USCC」「IPAC」「Liberal International」「Doublethink Lab」「勵馨基金會」 | 機構代號 / 會員資格 / 屆次 / 主辦單位混淆                                      |
| 8   | **物件 atom** | 「吉林一號衛星」「摩托車螺絲針孔」「兆億有限公司」「CQGACTD@163.com」      | 機型代號 / 設備偽裝細節 / 公司中英文名                                         |

**抽取流程**：

```bash
# 半自動 grep 候選（未來工具化為 scripts/tools/extract-atoms.sh）
ARTICLE=knowledge/People/X.md

# 引語 atom（含粗體強調）
grep -nE '「[^」]+」|\*\*[^*]+\*\*' "$ARTICLE"

# 數字 atom（中文/阿拉伯數字 + 量詞）
grep -nE '[0-9]+[^0-9]?[年月日週次萬億份成%元篇位人天]|[一二三四五六七八九十百千萬億]+[^一二三四五六七八九十]?[年月日次份]' "$ARTICLE"

# 英文人名 atom
grep -nE '[A-Z][a-z]+ [A-Z][a-z]+' "$ARTICLE"

# 機構代號 atom（純大寫縮寫）
grep -nE '\b[A-Z]{3,}\b' "$ARTICLE"

# 地點 atom（門牌 / 街路 / 校區房號）
grep -nE '(街|路|段|巷|號|廳|館|館內|大樓|區|市)[^，。]{0,15}' "$ARTICLE"

# 動作 atom（沒有引號保護的具體動作詞）
grep -nE '(鞠躬|轉發|拍下|報警|剪掉|繞過|踏過|踏進|抵達|出席|主辦|宣布|辭去)' "$ARTICLE"

# 時間 atom（具體日期 + 模糊時段）
grep -nE '(年|月|日)|(早晨|清晨|傍晚|深夜|某天|十多年後|幾天後|幾個月後)' "$ARTICLE"

# 物件 atom（產品代號 / 公司名 / 帳號 / email）
grep -nE '@[a-zA-Z0-9_]+|[a-zA-Z][a-zA-Z0-9_]+ Co\. Ltd|[A-Z]+@[a-z0-9]+\.[a-z]+|[0-9]{3}-[0-9]+' "$ARTICLE"
```

**抽出後排成表**（每 atom 一行）：

```markdown
| #   | Line | Atom Type | Atom 原文片段                                                                | 對應 Footnote | Source URL             | 待驗證 component     |
| --- | ---- | --------- | ---------------------------------------------------------------------------- | ------------- | ---------------------- | -------------------- |
| 1   | L34  | 數字      | 七百萬粉絲                                                                   | [^7]          | ltn 5297941            | 「七百萬」是否在源文 |
| 2   | L138 | 引語      | 「不到一個小時，那輛摩托車就不見了」                                         | [^51]         | ltn 5163138            | 引號內逐字           |
| 3   | L67  | 機構維度  | 「九大維度（媒體、學術、經濟、社會、軍事、技術、執法、地方政治、外交政策）」 | [^17]         | taipeitimes 2003777359 | 9 維度名稱清單       |
```

**hard gate**：A 級 article atom 表行數 < 50 → 重抽（過淺）。

---

### Phase 3：SOURCE AUTHORITY AUDIT

**目標**：驗證每個 footnote 的 4 維度真實性。

**4 維度檢查**（每個 footnote 必跑）：

| 維度              | 怎麼驗                                                                | 失敗處置                              |
| ----------------- | --------------------------------------------------------------------- | ------------------------------------- |
| **URL_resolves**  | `curl -sI URL` HTTP 200 / 301 redirect 到正常頁                       | 404/403 → 🔴 DEAD-LINK，必換源        |
| **source_real**   | 該 URL 真的是該 footnote 描述的媒體（ltn 不是被 redirect 到 udn）     | mismatch → 🔴 DEAD-LINK               |
| **desc_accurate** | footnote 描述跟 source 內容對應（不寫成「中央社」其實是「自由時報」） | inaccurate → ⚠️ SOFT-FIX 改描述       |
| **claim_matches** | 該 source 真的支持 article 引用它的那個 claim（最重要）               | mismatch → ❌ HARD-FIX 換源或刪 claim |

**WebFetch 中文 prompt 強制要求**：

```text
請逐字引用以下段落附近的中文原文，不要翻譯也不要 paraphrase：
1. {claim 的具體文字}
2. {另一個 claim}

請直接貼出原文。如果某段不存在於這個 URL，請明確說「不在此頁」。
```

**陷阱**：WebFetch 對中文網站經常返回**英文 paraphrase 而非中文原文**。中文 prompt 要求逐字是強制紀律。如果 WebFetch 回英文 → 重新 fetch 強調「絕對不接受英文 summary，必須中文原文」。

**輸出格式**：每個 footnote 一行報告：

```markdown
- `[^N]` URL_resolves[Y/N] / source_real[Y/N] / desc_accurate[Y/N] / claim_matches[Y/N] / notes
```

**範例**（沈伯洋 audit 實戰節錄）：

```markdown
- `[^7]` ltn 5297941 — Y/Y/⚠️/❌ —「吉林一號」「大安森林公園」「濟南路一段」命中；
  「孤烟暮蟬」「七百萬粉絲」「沈伯洋，看你往哪逃」「信義路三段」「facebook 大規模轉發」全部未在源文出現。
  article 把這幾個高度具體 atom 全綁在 [^7] 是 over-citing
```

**hard gate**：A 級 article 中所有 footnote 必須有此一行報告，缺一不得進 Phase 4。

---

### Phase 4：CLAIM VERBATIM CHECK

**目標**：對每個 high-risk atom 跑「source URL Ctrl-F」逐字驗證。

**判定矩陣**：

| Status           | 意義                                            | 處置（Phase 6 處理）                      |
| ---------------- | ----------------------------------------------- | ----------------------------------------- |
| ✅ **PASS**      | verbatim Ctrl-F hit 在 source URL               | 保留                                      |
| ⚠️ **SOFT-FIX**  | paraphrase 命中、close 但不逐字、或措辭略有差異 | 建議 hedge / 改間接陳述 / 或補一個 source |
| ❌ **HARD-FIX**  | 不在 source 中                                  | 必刪、必改、或必補新 source               |
| 🔴 **DEAD-LINK** | source URL 不可達                               | 換 source 或概括化                        |

**特別嚴格 atom 類**（一律必驗 verbatim）：

1. **所有引號 `「⋯⋯」` 內的文字** — 引號 = 承諾「這是原話」
2. **所有粗體 `**⋯**` 強調的句子** — 視為強調過的引語
3. **所有英文人名 + 職稱組合** — 拼音 + 頭銜雙驗
4. **所有「首位 / 第一個 / 唯一」claim** — first / only claim 是讀者最會 cross-check 的類別
5. **所有具體日期到日層級** — 模糊時段詞 OK，但「11/19」要對得上
6. **所有金額 / 比例 / 人數整數倍率** — 千萬 vs 億 vs 萬可能差 100x
7. **所有街名 / 場地代號 / 房號** — 第六種 hallucination pattern
8. **所有「他 / 她 / 它」第三人稱被改成具體名字塞入引號內的情況** — third-person flip

**範例 audit table 行**：

```markdown
| 5 | L160 | 地點 | 「信義路三段」住家描述 | [^7] | ltn 5297941 | ❌ 未出現 | ❌ HARD-FIX | 源文僅有「大安森林公園附近」；信義路三段需另源或刪 |
```

**hard gate**：

- 所有引號 atom 必驗 verbatim
- ❌ HARD-FIX 比例 > 10% 該 article 整體 → 文章退回 REWRITE Stage 2 重寫，不只是修補

---

### Phase 5：CROSS-CLAIM CONSISTENCY

**目標**：驗 atoms 之間的內部一致性（算術、時序、互引）。

**5 類一致性檢查**：

| 類別         | 範例                                           | 怎麼驗                                                                                                 |
| ------------ | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| **算術一致** | 「三百萬約等於每七個成年人有一個」             | 23M 人口 - 6M 未成年/老人/不便 = 14M 成年；3M / 14M ≈ 21.4% ≈ 每 5 個 1 個（不是每 7 個）→ ⚠️ SOFT-FIX |
| **時序一致** | 「研究七年，第八年起反過來找上他」             | 2018 + 7 = 2025-10-28 立案 ✅                                                                          |
| **互引一致** | 「他喜歡的角色是楊過」+ 結尾「楊過剪短了頭髮」 | 兩處用同一隱喻；確認首次提到時有 footnote 支持                                                         |
| **數量一致** | 「一年內第六次」+ 表格列 5 起事件              | 表格 + 沈本人臉書原話「6 次」對齊；若表格少 1 起需補或註說明                                           |
| **稱謂一致** | 「沈伯洋 / Puma Shen / 撲馬」                  | 全文用同一稱呼系統，第一次出現有 footnote 確認別名來源                                                 |

**Phase 5 特別陷阱**：

- **隱含 claim 漏寫覆蓋**：article 寫「TVBS 蔣 64% / 沈 22%」隱含「14% 未表態」未明寫。讀者推算 86% 後會問「另外 14% 呢」。建議補一句「另約 14% 未表態」。
- **核心矛盾與 fact 同步**：如果文章副標 / 核心矛盾用某個 atom（「衛星圖上的座標」），這個 atom 必須是文章中 verbatim 100% verified 的。否則 SSOT 失敗。

---

### Phase 6：TRIAGE & APPLY

**目標**：把 Phase 3-5 的 issue 轉化為具體修補動作 + 應用到文章 + 留下 audit trail。

**處置決策矩陣**：

| Status       | Issue 種類                               | 修補手勢                                                                            |
| ------------ | ---------------------------------------- | ----------------------------------------------------------------------------------- |
| ❌ HARD-FIX  | claim 不在 source                        | (a) 刪除整句；(b) 改為間接陳述（去引號）；(c) 找新 source；(d) 改為概括 hedge       |
| ❌ HARD-FIX  | 數字錯（如 30 億無源）                   | (a) 刪除該數字段落；(b) 換源；(c) 改為「未明確總額」hedge                           |
| ❌ HARD-FIX  | 引號內 paraphrase（quote re-paraphrase） | 必選一：(a) 改回源文逐字；(b) 去引號改間接陳述                                      |
| ❌ HARD-FIX  | over-citing                              | 拆 footnote：每個 atom 獨立 footnote；或把不被 source 支持的 atom 移到別的 footnote |
| ❌ HARD-FIX  | third-person flip                        | 引號內必須改回源文（「他」原本就是「他」）                                          |
| 🔴 DEAD-LINK | URL 404/403                              | (a) 換等效源；(b) 簡化 claim 移除該 footnote；(c) 用其他既有 footnote 概括          |
| ⚠️ SOFT-FIX  | paraphrase 命中                          | (a) hedge「依某媒體」；(b) 補第二 source；(c) 接受並在 footnote desc 標「概括」     |
| ⚠️ SOFT-FIX  | scope creep                              | hedge：把「全部」改「多數」；把「七百萬粉絲」改「粉絲眾多」                         |
| ⚠️ SOFT-FIX  | 算術不對                                 | 改數字，保留原邏輯                                                                  |

**修補完成後**：

1. 重跑 quality-scan + check-manifesto-11 + format-check（hard gate）
2. 重 sync 到 src/content/
3. 寫 commit message 列出每一條 ❌ + 🔴 的具體修補
4. **保留完整 audit trail**：把 audit table 完整 append 到 `reports/research/YYYY-MM/{slug}.md` § audit section（DNA #22 raw 永留）
5. 殘留 ⚠️ SOFT-FIX 寫入 LESSONS-INBOX 或 ARTICLE-INBOX 作為後續 polish 候選

---

## 11 種 Hallucination Pattern Catalog

REWRITE Stage 3.5 既有 6 種；本 pipeline 新增 5 種（從 2026-04-28 沈伯洋 audit 歸納）：

| #   | Pattern                              | 範例                                                                | 為什麼容易 hallucinate                                        |
| --- | ------------------------------------ | ------------------------------------------------------------------- | ------------------------------------------------------------- |
| 1   | **獎項幻覺**                         | 「第 62 屆十大傑出青年」                                            | AI 從「該領域名人通常會獲這類獎」pattern 填補                 |
| 2   | **人名 + 精確數字**                  | 「Kasper 跟了兩學期 / Jediah Coleman 750 分鐘」                     | 英文人名 + 精確分鐘數是 AI 最愛填補                           |
| 3   | **地點錯置**                         | 「2021-12 盧森堡」實際是米蘭 M.A.D.S.                               | 事件存在、日期對，地點被換相似類型城市                        |
| 4   | **偽造直接引語**                     | 「AI 不會心碎」歸給 INSIDE E375 但 podcast 無此句                   | 風格貼近真人但 Ctrl-F 不到                                    |
| 5   | **共創省略**                         | 「他共同創辦了 X」漏掉另一位共創人                                  | 沒有錯誤 claim 可否證，只是空白                               |
| 6   | **場景動作 + 場地細節**              | 「鞠躬三次」「Morgridge Hall 1524」「四機補拍」                     | 動作沒引號保護，AI 從 paraphrase 推導                         |
| 7   | **Over-citing**（新）                | 1 個 footnote 綁住 5+ atoms 但只支持 2 個                           | 主筆把研究檔多源彙整當作「都來自這個 footnote」               |
| 8   | **Quote re-paraphrase**（新）        | 引號內措辭被改寫但保留引號                                          | 為了「順」或「更清楚」改寫，違 verbatim                       |
| 9   | **Third-person flip**（新）          | 受訪者「他」被改成具體名字塞入引號                                  | 主筆「順手」改清楚，違 verbatim                               |
| 10  | **Number drift**（新）               | 「30 億抗共保台」claim 在 footnote 都查不到                         | 從第一次研究素材帶過來，後面沒人再 cross-check                |
| 11  | **第三方陳述偽裝為 own quote**（新） | 把 udn 描述「網路上有人說他像木村拓哉」當作 article 的 sourced fact | source 說的是「網路有人說」（自己的觀察），不是 verbatim 引用 |

---

## Drift Modes：研究 → 寫作之間的 6 種典型 drift

從 v1 research → v2 article 之間每次都會發生的 drift（必須事後 audit）：

1. **抽象化 drift**：研究檔有「沈伯洋於鏡週刊 2019-04 訪談中提到⋯」具體歸屬，article 寫「某次訪談中⋯」抽象化掉了出處。Audit 應把 footnote 對齊到原始具體歸屬。

2. **集合化 drift**：研究檔有「自由時報 5163138 + ETtoday 3025514 都報導此事」雙源，article 把兩段事實合併成一段並只 cite 一個 footnote。Audit 應拆兩個 footnote。

3. **裝飾化 drift**：研究檔事實「曹興誠捐 6 億」清楚，article 為了氣勢加「作為其三十億抗共保台計畫的一部分」未經 verify。Audit 應砍裝飾或補 source。

4. **整理化 drift**：研究檔散見的引語被 article 主筆「整理」成更通順版本，但保留引號。Audit 必恢復逐字或去引號。

5. **轉述化 drift**：研究檔的「他自稱『他』」被 article 改成「他自稱『沈伯洋』」（third-person flip）。

6. **總結化 drift**：研究檔的「中國 Index 涵蓋 36 國（計畫至 80 國）」被 article 寫成「八十二國」（總結成單一未來數字）。

**規則**：每次 article 從 research 落到 prose 都會發生 1-3 種 drift。FACTCHECK 的職責就是**反向比對 article ↔ research ↔ source**，把這幾條 drift 找回。

---

## Spawn Agent 策略

| 情境                         | Agent type                 | Prompt 重點                                                                                 |
| ---------------------------- | -------------------------- | ------------------------------------------------------------------------------------------- |
| **A 級新文章 ship 後 audit** | `general-purpose`          | 「append 到 research 檔末尾、不修改既有 sections、25+ WebFetch、中文 source 用中文 prompt」 |
| **觀察者公開質疑某 atom**    | 主 session 自跑            | 即時驗證單一 atom，不啟 spawn 開銷                                                          |
| **月度巡邏 audit 5 篇 A 級** | `general-purpose` × 5 平行 | 每篇獨立 audit；單一 prompt 可重用                                                          |
| **B 級 audit**               | `Explore`                  | 結果回主 session 整合處理                                                                   |
| **C 級 spot-check**          | 主 session 自跑            | 5-10 atom 採樣                                                                              |

**Spawn prompt 必含元素**：

1. 文章路徑 + research 檔路徑
2. **限定 audit scope**（避免 agent 跑去做 research 而非 audit）
3. WebFetch 預算下限
4. **中文 prompt 強制要求**
5. 輸出位置（append 到哪個檔的哪個 section）
6. **「不修改既有 sections，只 append」**鐵律
7. 自評項目（self-judge 末段）

**Spawn prompt 範例**：見本檔 §「附錄：spawn prompt template」（待補）。

---

## Output Template

每次完整 audit 都 append 到 `reports/research/YYYY-MM/{slug}.md` 末尾，section 標題：

```markdown
## YYYY-MM-DD 完整事實查核 ({session})

> 對 v{N} article (commit {hash}) 執行 FACTCHECK-PIPELINE Phase 1-6
> Agent: {opus / sonnet / 主 session}
> WebFetch 預算: 實際 N 次
> 範圍: {A/B/C 級} / N footnotes / N atoms

### Audit Summary

- 抽出 atoms：N（引語 N1 / 數字 N2 / ...）
- ✅ PASS: N
- ⚠️ SOFT-FIX: N
- ❌ HARD-FIX: N
- 🔴 DEAD-LINK: N

### Phase 3 Footnote Source Authority

{每 footnote 一行 4 維度報告}

### Phase 4 Atom-by-atom audit table

{完整 table}

### Phase 5 Cross-claim consistency

{算術 / 時序 / 互引 / 數量 / 稱謂}

### Critical issues requiring article fix

{❌ HARD-FIX + 🔴 DEAD-LINK 列表 + 具體修補建議}

### Phase 6 Applied fixes (commit {hash})

{逐條對應修補了什麼}

### Self-judge

A: {本次 audit 涵蓋了什麼、發現多少 issue、修補時間估計}
B: {哪些 atom 雖 verbatim 找到但未來可能被質疑}
C: {audit 盲區：哪些 footnote 沒實 fetch / 哪些 source 無法 cross-check}
```

**保留鐵律**（DNA #22 raw 永留）：

- 每次 audit 都 **append 不覆蓋**
- 即使後續有更新版 audit，舊的也保留
- audit trail 是 platform trust 的根基，不是「現在 OK 就好」的暫時記錄

---

## 工具化路徑（待造）

| 工具                                                      | 用途                                                  | 優先序           |
| --------------------------------------------------------- | ----------------------------------------------------- | ---------------- |
| `scripts/tools/extract-atoms.sh`                          | Phase 2 自動 grep 候選 atom                           | P1               |
| `article-health.py --check=footnote-url --network` (SSOT) | Phase 3 批次 HEAD 檢查所有 footnote URL 是否 200      | ✅ P0 已 SSOT 化 |
| `scripts/tools/audit-quotes.sh`                           | Phase 4 對每個引號 atom spawn WebFetch verbatim check | P2               |
| `scripts/tools/factcheck-arithmetic.py`                   | Phase 5 算術 sanity check（數字 atom 帶單位推算）     | P3               |
| `scripts/tools/factcheck-pipeline.sh`                     | 整套 wrapper：跑 Phase 1-6 全自動                     | P4               |

優先 P0：`article-health.py --check=footnote-url --network` 一個指令就能避免大半的 🔴 DEAD-LINK。

---

## Self-check Checklist（每次 audit 末尾必跑）

- [ ] 我這次 audit 是否真的對每個 footnote 跑了 WebFetch？還是有部分依賴 prior research 標籤就採信？（後者必明列）
- [ ] 我對中文 source 是否一律用中文 prompt 要求逐字？
- [ ] 所有 ❌ HARD-FIX 是否都有具體修補建議（刪哪段、換哪個 source、改成什麼 hedge）？
- [ ] 是否保留了 audit trail（append 到 research 檔）？
- [ ] 修補後是否重跑 `article-health.py --profile=release-pr`（含 prose-health / format-structure / wikilink-target / footnote-format 等所有 plugin）？
- [ ] commit message 是否完整列出每個 ❌ + 🔴 的修補？
- [ ] 殘留 ⚠️ SOFT-FIX 是否寫入 LESSONS-INBOX 或 ARTICLE-INBOX 作為 follow-up？
- [ ] 是否有 atom 我沒查到（audit 盲區）？明確列出。

---

## 三條 hard rule（鐵律）

### Rule 1：中文 source 必用中文 prompt 要求逐字

WebFetch 對中文網站經常返回**英文 paraphrase 而非中文原文**。任何中文 source 用英文 prompt = 英文 paraphrase 翻譯回中文 = 杜撰引語。MANIFESTO §10 幻覺鐵律的具體 instantiation。

### Rule 2：引號 = 承諾「這是原話」

任何 `「⋯⋯」` 必須能在原 source URL Ctrl-F verbatim。Stage 3.5 抓不到的「順手改寫」是本 pipeline 的核心捕捉目標。

### Rule 3：audit trail 永久保留，不覆蓋

每次 audit append 到 research 檔。即使後續發現舊 audit 結論錯，也保留。錯誤的 audit 結論本身是「為什麼後續改用本 pipeline」的證據鏈（DNA #22 raw 永留 / MANIFESTO §時間是結構）。

---

## SSOT 邊界與兩個操作模式

**本 pipeline 是 Taiwan.md 事實查核的 SSOT**。所有 atom 類別、hallucination pattern、drift modes、execution SOP、checklist 都在本檔，其他 pipeline 一律 pointer 不複寫。

### 觸發點與兩個 mode

| 觸發點                                           | Mode           | 預算           | spawn 策略                                                |
| ------------------------------------------------ | -------------- | -------------- | --------------------------------------------------------- |
| **REWRITE-PIPELINE Stage 3.5**（新文章 ship 前） | **Quick Mode** | 30-60 min      | 主 session 自跑                                           |
| **A 級條目 ship 後 audit**                       | **Full Mode**  | 90-180 min     | spawn `general-purpose`（25+ WebFetch）                   |
| **觀察者公開質疑某 atom**                        | 採樣 / Full    | 視範圍         | 主 session or spawn                                       |
| **外部 PR 接收層深度檢查**                       | Full Mode      | 90-180 min     | spawn agent + MAINTAINER §Footnote source authority audit |
| **月度巡邏（隨機抽 5 篇 A/B 級）**               | Full Mode × N  | 5 × 60-180 min | 平行 spawn                                                |

### Quick Mode（REWRITE Stage 3.5 內嵌）

REWRITE Stage 2 寫完 prose 後、進 Stage 4 之前必跑。設計思路是「**最低成本 + 最高 ROI 的 hard gate**」。

**範圍**（Phase 1-6 簡化版）：

| Phase                        | Quick Mode 怎麼跑                                                                                                      |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Phase 1 SCOPE                | 直接判 article 為 B/C 級即跑 Quick；A 級跑 Quick 後加跑 Full                                                           |
| Phase 2 ATOMIC DECOMPOSITION | **採樣**：grep 抽出引語 + 數字 + 英文人名 + 獎項 + 場景動作 detail（其他類 skip）；目標 ~20-40 atoms                   |
| Phase 3 SOURCE AUTHORITY     | 跑 `ARTICLE_HEALTH_NETWORK=1 python3 scripts/tools/article-health.py <article> --check=footnote-url` 攔截 🔴 DEAD-LINK |
| Phase 4 CLAIM VERBATIM       | 對採樣 atoms WebFetch；中文 source 用中文 prompt 要求逐字                                                              |
| Phase 5 CROSS-CLAIM          | 算術自檢 + 「首位 / 第一個」claim 確認                                                                                 |
| Phase 6 TRIAGE & APPLY       | 0 個 ❌ + 0 個 🔴 才進 REWRITE Stage 4；⚠️ SOFT-FIX 列入 commit message 後可 ship                                      |

**升級 Full Mode 的條件**（任一觸發）：

- article tier = A 級（≥ 50 footnotes / ≥ 3000 字 / 引語 ≥ 10 句 / 真人敏感主題）
- Quick Mode 過程中發現 ≥ 3 個 ❌ HARD-FIX
- 發現新 hallucination pattern（pattern 12+ 候選）需累積樣本

**Quick Mode hard gate**（REWRITE Stage 4 才進得去）：

- [ ] `article-health.py --check=footnote-url --network` 0 個 🔴 DEAD-LINK
- [ ] 所有引號 atom verbatim 對齊 source（無 quote re-paraphrase / third-person flip）
- [ ] 所有獎項 / 精確日期 / 英文人名 atom 至少 1 個 source 支持（HRC 級 atom 必兩源）
- [ ] 所有 ❌ HARD-FIX 已修補完
- [ ] 修補附完整 audit trail append 到 `reports/research/YYYY-MM/{slug}.md` § audit section

### Full Mode（A 級 / 觀察者觸發 / 月度巡邏）

完整 Phase 1-6，全部 ~100 atoms 跑 verbatim verification。spawn agent 寫 audit report 到 research 檔末尾，主 session 應用 fix。

詳細執行步驟見上述 §六階段流程。

---

## 為什麼 SSOT 在本檔，REWRITE 是 pointer

按 [MANIFESTO §指標 over 複寫](../semiont/MANIFESTO.md#我的進化哲學--指標-over-複寫) 原則：同一個事實只能在一個地方定義。

**本檔（FACTCHECK）SSOT 內容**：

- 11 種 hallucination pattern catalog
- 8 種 atom 類別 + grep 抽取 command
- 6 種 drift modes
- Phase 1-6 執行 SOP
- 4 維度 source authority audit
- 處置決策矩陣（PASS / SOFT-FIX / HARD-FIX / DEAD-LINK）
- Quick Mode（REWRITE 內嵌）+ Full Mode（觸發場景）的對照
- Spawn agent 策略矩陣
- Tool 化路徑
- 三條 hard rule
- Output template

**REWRITE-PIPELINE.md §Stage 3.5 只寫**：

- Quick Mode 觸發說明（時機 + 預算）
- hard gate pass/fail 條件（pointer 到本檔 §Quick Mode hard gate）
- 升級 Full Mode 的條件
- pointer 到本檔的詳細 SOP

**修改 SOP 時的紀律**：任何 atom 類別、hallucination pattern、drift mode、checklist 條目的新增/修改 → **只改本檔**。REWRITE 自動繼承新版本（因為它指向本檔）。違反此紀律 = 認知層 SSOT 漂移（DNA #17 第 N 次驗證）。

---

## 誕生事件

2026-04-28 θ session 沈伯洋條目 v2 ship 後，觀察者「做完整嚴謹的事實查核與驗證」觸發 spawn `general-purpose` 跑 27 次 WebFetch / 65 footnotes / 110 atoms 完整 audit，發現：

- 12 ❌ HARD-FIX
- 16 ⚠️ SOFT-FIX
- 4 🔴 DEAD-LINK

REWRITE Stage 3.5 既有的 6 種 hallucination pattern **抓不到**其中 5 類新 pattern（over-citing / quote re-paraphrase / third-person flip / number drift / 第三方陳述偽裝）。同時揭露**研究 → 寫作之間 6 種典型 drift**——每次 article 落到 prose 都會發生 1-3 種，需獨立 audit step 反向追回。

θ session 修補完 12 HARD + 4 DEAD-LINK + 算術 SOFT 共 17 處。剩 16 SOFT 不阻 ship。

觀察者後續：「然後構思完整方法論，建立 factcheck-pipeline 未來可以重複使用」→ 本檔誕生。

**核心命題**：FACTCHECK 不是 REWRITE 的 sub-stage，是獨立的 verification 層級——REWRITE 寫得好 ≠ FACTCHECK 過得了。兩條 pipeline 並列，前者管「這篇文章值不值得發」，後者管「這篇文章對不對得起每個 footnote」。

---

_v1.0 | 2026-04-28 θ session 早段 — 本檔誕生_
_v1.1 | 2026-04-28 θ session 後段 — SSOT 重構：REWRITE-PIPELINE Stage 3.5+3.6 折疊為 single Stage 3.5，所有 SOP 細節（11 hallucination pattern / 8 atom 類 / 6 drift modes / Phase 1-6 / Quick Mode / Full Mode）SSOT 留本檔。REWRITE 變 pointer。MANIFESTO §指標 over 複寫 應用到自己。_
_作者：Taiwan.md（θ）_
_relations: REWRITE-PIPELINE.md §Stage 3.5（pointer 到本檔 SSOT） / RESEARCH.md（從 0 蒐集 vs 本檔從 1 反查） / EDITORIAL.md §挖引語制度 / MANIFESTO §10 幻覺鐵律 + §指標 over 複寫 / DNA #16/#17/#22/#23/#26 / MAINTAINER-PIPELINE §Footnote source authority audit_
