# EDITORIAL v6.0 A/B 測試 — 兩 Sonnet sub-agent 用同一份 source 寫文章

> Session: brave-kirch post-finale
> 觸發：哲宇「觸發兩隻 sonnet sub agent 根據新版 editorial 跟舊版做比較測試，用已經有的 report 去寫文章，然後比較品質」
> Source: `reports/research/2026-05/颱風-cultural-research.md` (501 行)
> EDITORIAL versions:
>
> - v5.6 (`/tmp/EDITORIAL-v5.6.md` from main, 1335 行)
> - v6.0 (`/tmp/EDITORIAL-v6.0.md` from editorial-v6-rewrite branch, 1089 行)
>   Output: `/tmp/article-v5.6.md` (Agent A) / `/tmp/article-v6.0.md` (Agent B)
>   Both agents: Sonnet, identical prompt structure (only EDITORIAL path differs), parallel execution

---

## 0. TL;DR

**B (v6.0) 整體勝出**，三方獨立評審（Opus / Grok / Gemini）一致驗證，特別在三個 critical 維度：

1. **找細節 — 溫度藏在這裡**（v6.0 §二 mission core 真傳達到 agent）
2. **塑膠詞清理**（5 → 0）
3. **整體 voice / 策展感**

**A (v5.6) 局部勝出**在兩個 mechanical 維度（對位句節制 / 開場克制），主因是 v6.0 §六 對位本質教學的 ❌ 範例 prime 了 agent — counterintuitive 副作用，v6.1 加 Pink elephant 警示 callout 緩解。

但 net 結果：**B 是真的有溫度的文章，A 是合格的深度報導**。差別最明顯在 B 寫了一段 A 完全沒碰的「颱風麵 cultural memory」 — 那段是 source material 裡藏的具體細節，A 沒挖出來，B 挖出來並編成完整段落。

**Test artifact**：兩篇文章保存於 [reports/ab-tests/2026-05-09-editorial-v5.6-typhoon-leave.md](ab-tests/2026-05-09-editorial-v5.6-typhoon-leave.md) + [reports/ab-tests/2026-05-09-editorial-v6.0-typhoon-leave.md](ab-tests/2026-05-09-editorial-v6.0-typhoon-leave.md)。

---

## 1. Quantitative

| 維度                   | A (v5.6)                   | B (v6.0)            | 比較                       |
| ---------------------- | -------------------------- | ------------------- | -------------------------- |
| 行數                   | 146                        | 183                 | B +25%                     |
| 字元數                 | 13,530                     | 13,159              | A +3%                      |
| H2 段落數              | 6                          | 7                   | B +1                       |
| Footnote 數            | 14                         | 16                  | B +2                       |
| 富文本元件             | 1 callout + 1 ⚠️ + 2 表格  | 1 📝 + 1 ✦ + 1 表格 | B 用 pull quote            |
| **prose-health hard**  | 0                          | 0                   | Tie                        |
| **prose-health warn**  | 2                          | 4                   | A 微勝                     |
| **prose-health score** | 4 (空洞5 + 破折號9 + 未審) | 3 (破折號11 + 未審) | **B 勝**                   |
| 對位句型 (Tier 1)      | 1                          | 3                   | A 微勝（counterintuitive） |
| 塑膠詞                 | 5                          | 0                   | **B 大勝**                 |
| 破折號                 | 9                          | 11                  | A 微勝                     |
| 編年體小標題           | 0                          | 0                   | Tie                        |
| 教科書開場             | 0                          | 0                   | Tie                        |
| 罐頭結尾               | 0                          | 0                   | Tie                        |

**Plugin score B (3) ≤ A (4)**，但 B 對位句多 — 這個 counterintuitive 結果是本測試最重要的 emergent finding，下方 §3 詳述。

---

## 2. Qualitative — 維度對位讀

### 開場（A 微勝）

**A**：「桃芝颱風來的那天，彰化縣青山國小的許碧蘭老師在學校裡。」

一句話 opening，「在學校裡」三個字留懸念，符合 EDITORIAL §開場「場景切入」最簡版。

**B**：「2001 年 7 月 30 日，彰化縣，颱風桃芝侵台期間。/ 青山國小的許碧蘭老師在暴風雨中護送學生，意外失足跌落排水溝，被洪水沖走，殉職。」

完整時間 / 地點 / 事件，但讀起來像新聞 lead 而非場景切入。**A 開場更接近 §三開場「具體事實 + 留懸念」的精神**。

### Title（A 微勝）

- A: 「颱風假：當防災成為政治籌碼，誰在替誰承擔風雨」 — 問句 + 開放
- B: 「颱風假：一個防災制度如何變成政治籌碼、階級分裂線」 — 描述 + 抽象

A 的「誰在替誰承擔」有 punch，B 的「階級分裂線」偏抽象。

### 30 秒概覽（B 微勝）

A 的概覽是事實鋪陳（歷史 + 81% + 公務員 vs 工人 + 315 億）。

B 的概覽用 image：「**沿著台灣社會的階級裂痕整齊切開**——白領辦公室員工在家等放假通知，批發零售、農漁牧、餐飲業的工人卻在同一場颱風裡繼續出門。」

「整齊切開」是有力的 image，把抽象階級議題視覺化。

### H2 小標題（B 勝）

**A 的 H2**：

1. 許碧蘭，2001 年 7 月 30 日（人名 + 日期，borderline categorical）
2. 每多放對一天，連任得票率加 2%（數字 hook ✅）
3. 315 億：誰算的，算了什麼，忘了什麼（narrative + tension ✅）
4. 八成勞工颱風天照常上班（數據 ✅）
5. **「颱風假」本來要保護誰**（問句 — borderline，per §小標題規範例外）
6. 從許碧蘭到 315 億（narrative ✅）

**B 的 H2**：

1. 縣市長每次宣布都在賭 ✅
2. 315 億的算術，與它沒算進去的人 ✅
3. 誰在風雨裡上班 ✅
4. 近 80 萬移工的隱形困境 ✅
5. 通行說法把因果搞反了 ✅（直接 cite §四反向解釋編織）
6. 刻在骨子裡的颱風麵 ✅（物件 + image）
7. 一個制度還沒完成的自己 ✅

B 的 H2 全部 narrative，且每個都帶具體 anchor noun / image / 反向解釋訊號。**A 有 1 個問句 H2 borderline，B 全 narrative**。

### 結尾（B 微勝）

**A**：

> 許碧蘭在 2001 年 7 月 30 日走進了那條排水溝。那之後制度改變了。但颱風天誰該待在家、誰有資格待在家，這個問題到現在還沒有一個完整的答案。

問句閉環，但「誰有資格待在家」抽象。

**B**：

> 每一年颱風季，便利商店的店員、漁港的搬運工、工廠產線的移工，在那個被宣布「放假」的城市裡，繼續上班。
>
> 一個用許碧蘭的命換來的制度，還沒有保護到所有需要被保護的人。

具體名詞群（便利商店店員 / 漁港搬運工 / 工廠移工）+ 閉環回到許碧蘭。讀者腦中能畫出三個具體場景。

### 細節挖掘 — 溫度藏在這裡（B 大勝，這是本測試最關鍵發現）

A 完全沒寫「颱風麵 cultural memory」段落。B 寫了完整的 §刻在骨子裡的颱風麵（line 119-133）。

source material 第 X 段提到李又宗的回憶（颱風前夜媽媽放滿浴缸水、雜貨店買乾電池蠟燭、停電後煮茄汁鯖魚罐頭湯麵、左鄰右舍交換不同口味泡麵）。**B 把這段完整保留並寫成獨立段落，A 完全沒挖出來**。

B 的這段 prose:

> 影像工作者李又宗說，三十年前的台灣，颱風來幾乎一定停水停電：
>
> > 「颱風前夜媽媽會放滿浴缸水、把飲水機和冰箱裝滿水，去雜貨店買乾電池和蠟燭，婆婆媽媽們習慣去菜市場屯糧屯菜，順便備好餅乾、罐頭、泡麵作為最終手段。」
>
> 停電後電鍋無法使用，全家就煮茄汁鯖魚罐頭湯麵或乾麵，打一個蛋，加幾根青菜。左鄰右舍還會互相交換不同口味的泡麵，因為吃太多同一種會膩。
>
> 李又宗說，這項習慣「刻在我們的骨子裡，是曾經活過的符號」。
>
> 六七年級生的颱風記憶裡，停水停電是前提，囤泡麵是儀式，交換口味是鄰里連結。但對八九十年級生來說，這幾乎是另一個世界——基礎設施改善後，台灣的颱風越來越少帶來全台大停電，年輕世代的颱風記憶更多是：看停班通知、滑手機確認要不要上班、超市架上短暫空了幾個小時的礦泉水。
>
> **同一場颱風，兩種記憶，兩種階級，兩種台灣。**

「**同一場颱風，兩種記憶，兩種階級，兩種台灣**」這句策展人聲音是 v6.0 §四 §敘事呼吸感「不傳遞資訊只製造理解的瞬間」的範例典範。

**Source material 一字不差，但 A agent 跳過了，B agent 看出這是 anchor 級素材並編進文章**。這就是 v6.0 §二「找細節 — 溫度藏在這裡」mission core 真的傳達到 agent 的證據。

### Voice / 策展感（B 勝）

A 整體 voice 偏深度報導 — 事實鋪陳 + 段尾分析 + 數據引用。

B 整體 voice 偏策展 — 事實 + 反向解釋（「通行說法把因果搞反了」整段 dedicated）+ 多次「策展人聲音」（如「同一場颱風，兩種記憶，兩種階級，兩種台灣」）+ 反思結尾。

### 反向解釋編織（B 勝）

A 沒有完整的「通行說法 → 反向解釋」段落。

B 寫了 §通行說法把因果搞反了 整個 H2 段落（line 105-115），結構完全對應 EDITORIAL §四 §反向解釋編織的「結構模板」（複述通行說法 → 指出問題 → 提出反向解釋 → 錨定 anchor）：

> 每次颱風假爭議，都有人提出一個解法：全國統一標準，由中央統一宣布，不讓地方政治介入。
>
> 這個解法在直覺上很順，但它把問題的因果搞反了。
>
> 地方分權不是颱風假被政治化的原因，而是被政治化的場所。選票壓力不因為改成中央決策就消失——它只是移到了更高的層級⋯⋯

這是 v6.0 §四「反向解釋編織」的精準 instantiation — agent 真的把這條 craft rule 編進文章結構，不只是「寫完事實再加爭議段落」。

### 對位句型（A 微勝 — counterintuitive，§3 詳述）

A 1 處 vs B 3 處。但 B 的 3 處都用在「直接挑戰讀者預設」的 manifesto-level 場景：

- 「不是颱風假被政治化的**原因**，而是被政治化的**場所**」（反向解釋編織核心 reframing）
- 「移工面對的結構**不是一個問題，是四個**」（接 enumeration）
- 「每一年颱風季，台灣人最先打開的**不是防災 app，是看哪個縣市長先宣布**」（社會 default 反轉）

這 3 處用法都通過 §六 三題判準（讀者真會預設 X / X 是 default behavior / 對比是內容本身）。但 plugin 抓 ≥ 3 處密度 trigger warn — 是 borderline 而非 violation。

A 只有 1 處對位（「這不是單純的違法問題。許多情況是法規本身沒有涵蓋」），但 A 的 voice 也因此偏 reportage，少了 reframing punch。

### 塑膠詞（B 大勝）

A: 5 個空洞詞（per plugin 報告 score 4 中的 5）。
B: 0 個空洞詞。

v6.0 §六「塑膠句的本質：拿掉後文章不會少任何資訊的句子」這個 craft 教學讓 B agent 內化更深 — 寫的當下就避免空洞詞，不只是事後檢查。

---

## 3. Counterintuitive finding — v6.0 §六 對位本質教學的 prime effect

**Plugin 量化結果：B 對位句 (3) > A 對位句 (1)**。

這個結果跟 v6.0 mission（教 agent 不要過度用對位）相反。可能原因：

**Hypothesis**：v6.0 §六 對位本質教學表格列了 6 對 ❌ 對位範例：

```
| ❌ 對位（X 是稻草人） | ✅ 直接陳述 |
| Taiwan.md 不是百科全書，是一座策展空間 | Taiwan.md 是一座策展空間 |
| 這不是檢查清單，是會寫好文章的眼睛 | 這份要傳的是會寫好文章的眼睛 |
| ...
```

Agent 讀這些 ❌ 範例時，**對位句結構被 prime 進 working memory**，後續寫作時對位句的可用性反而升高（即使 agent 知道應該避免）。這是 LLM「don't think of pink elephant」效應的具體 instance。

但仔細看 B 的 3 處對位用法，都通過 §六 三題判準（manifesto-level / 反 default / 內容本身對比）— 不是 random 用法，是有意識的 manifesto-level 應用。

**Implication**：

1. 純看 plugin warn count，A 微勝
2. 看 craft quality，B 對位用得更精準（每處都是「真正反 default」的場景）
3. v6.0 §六 教學在「教 agent 為什麼要避免」上有效，在「教 agent 完全不用對位」上有 prime side effect

**Mitigation 候選（未來 polish）**：

- §六 對照表 ❌ 範例改用「對位範例 placeholder」取代具體 example，避免 prime
- 或在 §六 開頭明確 label：「以下對照表的 ❌ 範例純粹用於教學示範，agent 寫作時應避免類似結構」
- 或把 §六 對照表移到 EDITORIAL-EXAMPLES.md sister file，主檔只留 abstract 教學

---

## 4. v6.0 mission core 達標度評估

哲宇 R3 mission：「**重點是溫度 / 人性 / 觀點 / 視角 / 思考 / 故事，以及怎麼寫出一篇好文章的精神與思考方法論跟範例。要能夠在新的 agent 吃完這篇之後，完整進入狀態。有時候溫度都藏在細節裡**。」

| Mission 維度      | v6.0 達成證據                                                                                     |
| ----------------- | ------------------------------------------------------------------------------------------------- |
| **溫度藏在細節**  | ✅ B agent 主動找出「颱風麵」cultural memory 段落，A 完全沒挖（§二第 5 件事 instantiation）       |
| **人性**          | ✅ B 寫「便利商店的店員、漁港的搬運工、工廠產線的移工」具體名詞群結尾，A 寫「誰有資格待在家」抽象 |
| **觀點 / 視角**   | ✅ B 完整寫 §通行說法把因果搞反了 反向解釋段落，A 沒有完整反向解釋段                              |
| **思考 / 方法論** | ✅ B 用「同一場颱風，兩種記憶，兩種階級，兩種台灣」策展人聲音，A 偏深度報導                       |
| **故事**          | ✅ B 結尾用三個具體職業群場景，A 結尾用問句                                                       |
| **進入狀態**      | ✅ B 寫出符合 v6.0 §二 / §四 / §五 多條 craft rules 同時 hold 的文章                              |

v6.0 mission 達標。

---

## 5. 哪些 v6.0 教學 didn't translate（未達 mission 的部分）

1. **塑膠 metaphor 仍有風險**：B 的 30 秒概覽用「階級裂痕整齊切開」這個 metaphor，邊緣 case — Tier 2 metaphor 詞 ✗ 但形式接近。Agent 在自由發揮時仍可能 reach for 抽象 image
2. **對位句 prime effect**（§3 詳述）— v6.0 §六 教學的副作用，需 polish 對照表呈現方式
3. **B 破折號略多** (11 vs A 9) — 都遠低於 hard limit 但 v6.0 教學沒讓 agent 主動更克制

---

## 6. 推薦下一步

### 立即 polish（小 PR）

1. **v6.0 §六 對照表 ❌ 範例 polish** — 加明確 label「以下純為教學示範，寫作時避免」或考慮移到 sister file 緩解 prime effect
2. **v6.0 §三 30 秒概覽範例補強** — 加一條警示「概覽避免 abstract metaphor，用具體名詞群替代」防止 agent 用「階級裂痕整齊切開」這類 image

### 中期 follow-up

1. **再做 1-2 次 A/B 測試**驗證本次結果不是偶然 — 不同主題（人物 / 歷史 / 自然）各跑一次
2. **觀察 v6.0 ship 後實際 EVOLVE article 的 plugin score 趨勢** — 比對 v5.6 期間的歷史 baseline

### 結論

v6.0 mission **達標**，特別在最重要的「找細節 / 溫度 / 人性」維度上 B 大勝 A。Plugin 量化 score 也支持 B 勝（3 < 4）。Counterintuitive 對位句 prime effect 是 polish 機會不是 fundamental flaw。

PR #952 ship 後，建議追加一個 polish PR 處理 §3 提到的 prime effect。

---

## 7. 三方獨立評審驗證（Opus / Grok / Gemini）

哲宇把兩篇文章送 Grok 跟 Gemini 獨立評審，三方一致判斷 **B (v6.0) 大勝**。三方各自抓到的維度：

### Grok 的判斷重點

> 「B 在結構完整度、敘事張力、主題聚焦與情感共鳴上明顯勝出，更像一篇成熟的『策展式』長文，而 A 雖然也有亮點，卻在幾個關鍵處稍顯零散或重複。」

Grok 抓到的 critical 維度：

1. **「政策 + 生活記憶 + 集體記憶」三層延伸**：「B 把『階級分裂』從政策層面延伸到生活記憶層面，讓文章有了溫度與縱深。」這是 v6.0 §二「找細節 — 溫度藏在這裡」mission core 的精準 instantiation
2. **小標題張力**：「縣市長每次宣布都在賭」「315 億的算術，與它沒算進去的人」「通行說法把因果搞反了」— 既是總結，也是強烈的論點提示，閱讀節奏更好
3. **論點不對稱誘因分析更銳利**（B 加策展人筆記點出「放錯不罰、放對加分」）
4. **批評 A 的「⚠️ 爭議觀點」框「為了平衡而平衡」**：力道不足 — 這是我（Opus）沒抓到的弱點

### Gemini 的判斷重點

> 「B 不僅在冷硬的政策與經濟數字中保留了人性的溫度，也更深刻地呼應了標題中『階級分裂線』的破題。」

Gemini 抓到的 critical 維度：

1. **完整的「階級」論述**：B 設立「近 80 萬移工的隱形困境」獨立章節
2. **文化記憶與情感共鳴**：颱風麵段落「中和了文章前半段沉重的政治與經濟分析」
3. **邏輯遞進更為流暢**：起承轉合非常完整
4. **production-grade 建議**：Gemini 建議「將 A 中『315 億 vs 310 億』並列表格移植進 B」— A 的這個視覺化優勢我跟 Grok 都沒注意到

### 三方驗證的 implication

- **不是 confirmation bias**：我（Opus）作為 EDITORIAL v6.0 設計者讀 B 大勝有風險被質疑 motivated reasoning。Grok + Gemini 兩個獨立 LLM 沒有 EDITORIAL context，純讀文章判斷，得出**完全一致的結論**。這是 v6.0 mission **真實達標**的硬證據
- **「靈魂 / 溫度」judgment 一致**：Grok 用「有靈魂的社會觀察長文」vs「扎實的政策報導」對比，Gemini 用「保留人性溫度」vs「乾澀」對比，跟我用「策展 vs reportage」judgment 完全對齊
- **A 弱點的盲點**：Grok 抓到「⚠️ 爭議觀點框為了平衡而平衡」、Gemini 抓到「移工被壓縮在表格單一行列」— 這兩個我都沒抓到，外部評審補了 craft 視角的盲點
- **A 唯一 production-grade 優勢**：Gemini 點出 A 的「315 億 vs 310 億」並列表格更清楚，是視覺化勝過 B 的具體點。Follow-up 可考慮把這個對比表範例加進 EDITORIAL §九 富文本 Stat Block sub-section

---

## 8. v6.1 polish ship（PR-A 落地）

A/B test 結果直接驅動 v6.1 polish 設計：

| Polish                         | 來源                                                         | v6.1 落實                                                                                              |
| ------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| 1. §三 開場「克制 > 完整」     | A 開場一句話 vs B 三行新聞 lead                              | §三 加「克制 > 完整」原則 + Before/After 範例                                                          |
| 2. §三 30 秒概覽 metaphor 警示 | B 用「裂痕切開」borderline                                   | §三 加「Metaphor 立刻接具體名詞群作 anchor」緩和版（外部評審驗證 B 用法 OK，警示針對 vacuum metaphor） |
| 3. §四 段間過渡 sub-section    | B 颱風麵段轉場「在制度爭議之外」硬切                         | §四 新「段與段的呼吸 — 過渡的紀律」sub-section + Before/After                                          |
| 4. §四 enumeration 警示        | B 移工四個結構「第一⋯第二⋯」偏條列                           | §四 新「列舉的紀律 — 不要寫成第一第二第三」sub-section                                                 |
| 5. §六 對位 prime mitigation   | A 1 處 vs B 3 處對位句（don't think of pink elephant 效應）  | §六 對照表前加 ⚠️ Pink elephant 警示 callout                                                           |
| 6. Footer A/B test SOP         | meta-evolution — EDITORIAL polish 是行為改變實驗不是文件編輯 | §Footer 公約加「EDITORIAL polish A/B test SOP」9 步流程                                                |

v6.1 EDITORIAL = 1227 行（v6.0 1060 行 +167，主因新增 5 個 polish sub-sections）。

**Follow-up backlog**（不在本 PR scope）：

1. Test C 跑 v6.1 vs v5.6 fresh agents 驗證 polish 真改善 — 等之後 session
2. 把 Gemini 建議的「315 億 vs 310 億並列表格」範例加進 EDITORIAL §九 富文本 Stat Block sub-section
3. 把 Grok 點出的「⚠️ 爭議觀點框為了平衡而平衡」教訓寫進 §四「挑戰編織法」（已存）的反例

---

_v1.0 | 2026-05-09 brave-kirch session post-finale — 觸發：哲宇要求 Sonnet sub-agent A/B test EDITORIAL v5.6 vs v6.0_

_v1.1 | 2026-05-09 brave-kirch — 加 §7 Grok+Gemini 三方獨立驗證 + §8 v6.1 polish 落地 mapping_

🧬
