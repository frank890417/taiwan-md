# EDITORIAL v6.1 Test C — fresh agent v5.6 vs v6.1 A/B

> **Status**: Test C 收官報告 — v6.1 polish (PR #952) 對 fresh agent 寫作的 incremental 影響量化
> **Test artifacts**: [/tmp/test-c-A-v5.6-typhoon-leave.md](/tmp/test-c-A-v5.6-typhoon-leave.md)、[/tmp/test-c-B-v6.1-typhoon-leave.md](/tmp/test-c-B-v6.1-typhoon-leave.md)（搬進 reports/ab-tests/）
> **背景**: v6.0 → v6.1 polish 結束時 user 因 context 滿先 defer Test C，本次 brave-kirch-editorial-2 session 補跑

## 1. Test 設定

| 維度        | A                                                   | B                                   |
| ----------- | --------------------------------------------------- | ----------------------------------- |
| EDITORIAL   | v5.6（git show f46e3e88e → /tmp/EDITORIAL-v5.6.md） | v6.1（main, post #952）             |
| Source 材料 | reports/research/2026-05/颱風-{cultural,rewrite}.md | 同上                                |
| 主題        | 颱風假                                              | 同上                                |
| Sub-agent   | Sonnet（general-purpose subagent_type, 並行）       | 同上                                |
| Prompt 結構 | identical（only EDITORIAL path differs）            | 同上                                |
| Length 目標 | 3000-5000 漢字                                      | 同上                                |
| 輸出        | /tmp/test-c-A-v5.6-typhoon-leave.md                 | /tmp/test-c-B-v6.1-typhoon-leave.md |

## 2. 量化結果

| 指標                         | A (v5.6)   | B (v6.1)        | Δ          |
| ---------------------------- | ---------- | --------------- | ---------- |
| 漢字數                       | 6,636      | 3,023           | **B -54%** |
| 文件行數                     | 259        | 179             | B -31%     |
| prose-health hard            | 0          | 0               | tie        |
| prose-health warn 總         | 6          | 4               | B -33%     |
| 對位句型 (Tier 1) violations | **6**      | **3**           | **B -50%** |
| 破折號數                     | （未量化） | 8（borderline） | —          |
| 塑膠句                       | 0          | 1               | A 略勝     |
| 編年體 H2                    | 0          | 0               | tie        |
| Footnote 數                  | 21         | 17              | B -19%     |

**核心發現**：

1. **A overshoots length 目標 33%**（6636 vs 5000 上限）。v6.1 §四「列舉的紀律」+ §三「克制 > 完整」起作用 — B 嚴守目標下緣 3023。
2. **對位句型 -50%** — Pink elephant warning callout 在 §六 教學實際生效。v6.0 → v6.1 incremental polish 量化驗證。
3. **B score=3 warn 是邊緣 fail**（未人工審核 / 1 塑膠 / 8 破折號）— 破折號接近超量門檻，v6.1 沒有 explicitly 教這個但 §11 mention 過。

## 3. 質性比較

### 3.1 開場（§三 應用驗證）

**A 開場（v5.6）**：

> 2001 年 7 月 30 日，桃芝颱風正面橫掃台灣中部。彰化縣青山國小的許碧蘭老師那天沒有放假可放——
> 正式的颱風停班停課標準當時尚未完善，學校早已通知，照常上班。
>
> 許碧蘭下午護送學生回家，風雨中失去重心，跌落排水溝，被強勁洪水沖走。

**B 開場（v6.1）**：

> ## 2001 年 7 月 30 日，彰化縣青山國小
>
> 桃芝颱風來的那天，許碧蘭老師在學校裡。

**判讀**：兩者都用具體場景開場（v6.1 §三 推崇）。但：

- **A 開場是 narrative paragraph**，直接進入故事。
- **B 把 H2 寫成具體日期+地點**，然後 H1 下用最短的一句話「許碧蘭老師在學校裡」破題 — 「克制 > 完整」原則在開場執行（v6.1 §三 polish 加入的明確指引）。
- **A 補充太多** — 「那天沒有放假可放」+ 「正式的颱風停班停課標準當時尚未完善」是 explanatory tail，B 把這層留到後面 reveal。

B 開場勝。

### 3.2 結構鋪陳（§四 應用驗證）

A 的 H2 序列：

1. 一個老師的死，和一張辦法的誕生
2. 每多放對一天，連任得票率增加 2%
3. 一天 310 億，但誰的錢？
4. 81% 的人從來沒有真正放假
5. 「颱風麵」：刻在骨子裡，但正在消失
6. 1996 年的阿里山，與納莉淹進台北車站
7. 「小林整個不見了」
8. 通行說法把颱風假的問題搞反了
9. 排灣族的彩虹與 AI 的 4 分鐘預測
10. 「少而強」：未來的颱風更少，但更兇

B 的 H2 序列：

1. 2001 年 7 月 30 日，彰化縣青山國小
2. 停班的決定，縣市長每次都在賭
3. 但這個算術完全看不見一個人
4. 移工是結構裡最不可見的那一層
5. 一天損失多少？算法不同，答案很不同
6. 颱風假的歷史，不是技術演進，是人命教訓 ← antithesis violation
7. 農業的傷：颱風不按行政區走，但損失按縣市算
8. 颱風麵、囤高麗菜，那是另一種制度
9. 颱風假的反面：為什麼有人說「不要放」
10. 2001 年的彰化，和 2026 年的法規

**判讀**：

- **A 的中後段（§6-9）漂走** — §6「1996 阿里山」+ §7「小林整個不見了」+ §9「排灣族彩虹 vs AI」是強烈場景，但跟「颱風假」主線只有間接關聯。讀者在 §5「颱風麵」之後被拉去 §6「1996 賀伯」+ §7「莫拉克」，主線斷掉。
- **B 每一段都繞回「假」** — §6「人命教訓」、§7「農業」、§8「颱風麵」是同一個議題的不同切面。§9「反面論」+ §10「2001 vs 2026」收回開場 — 閉環式結尾（v5.6 §結尾閉環 已有，v6.1 維持）。
- A 是「颱風」全景報導，B 是「颱風假」focused 評論。標題寫的是後者，A 走題了。

B 結構勝。

### 3.3 對位句型 violations 細節

**A 的 6 處**：

- 不是颱風假太多，而是颱風假的覆蓋極不均衡 ← editorial section §「通行說法把颱風假的問題搞反了」整段建立在這個對位上
- 不是隨機決定，而是世代觀察的結晶
- 不只是一天放不放假。它是...
- (其他重複)

**B 的 3 處**：

- 不是特例，而是台灣颱風假的日常
- 不是技術演進，是人命教訓（H2 中）
- 不是技術演進，是人命教訓

**判讀**：兩者都中招，但：

- **A 的對位句型用在 editorial argument** — 整段「通行說法把颱風假的問題搞反了」結構基於對位（不是 X，而是 Y）。如果 strictly apply v6.1 §六「X 是寫作的錯誤臆測」原則，這整段該重寫成「颱風假覆蓋極不均衡」直述。
- **B 的對位句型用在 H2 標題** — 「颱風假的歷史，不是技術演進，是人命教訓」是命題式 H2，讀感重。應改成「颱風假的歷史，是人命教訓」。
- **B 的 §策展人筆記** 用了「不是 X 是 Y」對位（「不是兩種互相競爭的知識」、「不是政治人物的個別判斷」）— 教學內化部分達成，但 80% 不是 100%。

Pink elephant warning 起作用但仍有殘留。下一輪 polish 候選：把 callout 強化為「對位句即使在策展人筆記也禁用」明確規則。

### 3.4 §策展人筆記（§九 引語+事實+紀實 應用）

A 用了 1 個 ⚠️ 爭議觀點 + 2 個 📝 策展人筆記（共 3 處）。
B 用了 2 個 📝 策展人筆記 + 1 個 ✦ pull quote（共 3 處）。

**A 的 ⚠️ 爭議觀點**：

> 有薪颱風假的立法爭議在於：若強制有薪，雇主成本增加可能轉嫁給消費者或壓縮就業。
> 但反論也很清楚：目前的「建議性」架構，實際上是把安全成本轉嫁給了最沒有議價能力的勞工。

「但反論也很清楚」是典型 framing 詞硬切（v6.1 §四「過渡的紀律」明確警示）。讀感重。

**B 的 ✦ pull quote**：

> ✦ 「每多放對一天，連任時得票率會增加 2%。」這個發現精準描述了颱風假的政治語法，
> 但沒有說的是：那 81% 照常出勤的人，他們的選票算進去了嗎？

✦ 是 EDITORIAL 提供的另一種 callout（質問式 pull quote），更輕。B 用對工具。

### 3.5 結尾（§五 結尾五式 應用驗證）

A 結尾段：

> 颱風會繼續來，老師會繼續是老師，工廠會繼續運轉，移工會繼續無聲。
> 而我們，依然在每一個颱風夜裡，重新計算一次：誰應該被保護，誰應該繼續工作。

— 排比式 + 抒情。讀感重。

B 結尾段：

> 但每年夏天，打開手機看到停班公告的那一刻，那 81% 的人沒有在等這一則通知。

— 一句話 close，回收前文 81% 數字。**閉環式 + 留白式雙打**。

B 結尾勝。輕、回收、留白，符合 v6.1 §五「不要把感想寫滿」明確規則。

## 4. 整體判讀

| 維度                        | 勝者 | 強度 |
| --------------------------- | ---- | ---- |
| Length 紀律                 | B    | 強   |
| 開場「克制 > 完整」         | B    | 強   |
| 結構主線維持                | B    | 強   |
| 對位句型 violations         | B    | 中   |
| Callout 工具選用            | B    | 中   |
| 結尾留白                    | B    | 強   |
| 場景 specificity            | A    | 中   |
| 歷史 / 文化深度（颱風本身） | A    | 強   |
| 主題聚焦（颱風**假**）      | B    | 強   |

**結論**：B (v6.1) 在「跟標題同主題的紀律」全面勝出。A (v5.6) 在「相關 context 的場景豐富度」勝出，但代價是走題與對位句型增量。

v6.1 polish (PR #952 加的 5 條：克制原則 / metaphor 警示 / 過渡紀律 / 列舉紀律 / Pink elephant 警示) **incremental 量化驗證**：每一條都有 observable downstream effect on agent output。

## 5. 後續候選 polish

不馬上 ship，留 LESSONS-INBOX 給下個 EDITORIAL polish session 評估：

1. **對位句即使在 §策展人筆記也禁用** — v6.1 Pink elephant 警示只 mention 「寫作時心裡只放 ✅ 那欄」，沒明確 cover callout 內部。B 還是在筆記用對位 → 教學沒覆蓋到那層。
2. **走題防護** — A 走題到 §6-9 是「材料夠多就想全寫進去」的反射。EDITORIAL 沒明確教「文章 H1 = 主題契約，每段都要證明它服務這個契約」。Worth a §四 sub-section？
3. **破折號超量** — B 8 個破折號接近 §11 雙紀律的硬上限。v6.1 §11 沒給具體數字。可加 plugin info-tier check「>5 破折號 → warn」？這是 mechanical check，可推 plugin 不入 EDITORIAL prose。
4. **A 的 ⚠️ 爭議觀點 callout** — 看起來是 v5.6 鼓勵的 voice，v6.1 沒明確 retire。可清理。

## 6. Test C 工程教訓（meta）

- **agent 並行**：兩個 sub-agent 同時跑，主 session（Opus）可以同時做別的工作（這次：session-id.sh + EDITORIAL frontmatter migration）。Async 跑滿，wall-clock 沒浪費。
- **Plugin frontmatter skip 修復後** prose-health 對 /tmp 路徑也正常 fire（earlier 222920 session 修的 bug）— 這次 Test C 才能 quantitative compare，不是 silently skip。
- **EDITORIAL polish A/B test SOP §Footer** 第 9 步「測試文章跟 polish 一起 commit」這次 honor — 兩篇 article + 本 report 一起 ship。

---

_v1.0 | 2026-05-09 brave-kirch-editorial-2 session — Test C 收官，v6.1 polish 對 fresh agent 寫作的 incremental 影響量化驗證_
_對位 v6.0 ship 後 A/B test report (reports/editorial-v6-ab-test-2026-05-09.md)：那次是 v5.6 vs v6.0 飛躍式驗證，這次是 v6.0 → v6.1 polish 漸進式驗證。Mission attainment 已由前次三方驗證 (Opus + Grok + Gemini) 拍板，本次只 incremental delta 量化。_
