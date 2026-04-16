# EXP-2026-04-14-SSODT-PERSPECTIVES — SSODT Perspectives 是否驅動孢子持續擴散

> **狀態**：設計完成，待執行
> **設計者**：η session, 2026-04-14
> **預期執行日期**：下次有 ≥2 篇相似 baseline 流量文章可發孢子時
> **預期完成日期**：執行日 + 14 天（孢子曲線完整觀察）

---

## Hypothesis

**安溥文章的孢子曲線異常**（521→1,032→1,470v 三天連續上升，正常孢子是 1 天衝高 2-3 天衰減）**是因為文章內嵌的 22 則 perspectives × 11 個 dimension 提供了「多入口再轉發」效應**——讀者不是看一篇文章後決定要不要轉發整篇，是找到「自己的那一則留言」（質問、哀悼、信任、家族、預言⋯⋯）然後再轉發那一則 + 文章。

如果這個 hypothesis 對：

- SSODT 從「讓讀者看到多元觀點」升級為「讓每個讀者都找到自己的入口」
- 容器（perspectives）的價值大於內容本身的修辭品質
- 應該系統化地為高潛力文章補 perspectives（SSODT Phase 1）

如果這個 hypothesis 錯：

- 安溥的爆發是別的因素（時事、孢子文案、Threads 演算法）
- SSODT Phase 1 開發投資需要重新評估
- 「對自己的寵物想法尤其要懷疑」的 DNA 反射 #20 的具體實踐

---

## 控制變數設計

**配對選擇條件：**

- 兩篇文章應該有**相似的 baseline 7d views**（差距 ±20% 以內）
- 兩篇都還沒發過孢子（避免歷史擴散污染）
- 同一個 GA 排名段（如都在 #15-30）
- 不同分類較好（避免同分類熱度互相干擾）
- 都不是「鄭麗文式」時事掛鉤的人物（避免外部事件污染）

**操作：**

- **A 組（實驗）**：選一篇文章 → 補 8-15 則 perspectives（手動策展，不是 AI 生成）→ 發孢子
- **B 組（對照）**：選另一篇文章 → 不補 perspectives → 同一天發類似格式孢子
- 兩篇孢子文案使用同一個模板（例如都用 D 型「具體數字 + 反差開場」）
- 兩篇孢子在同一個時段發（±2 小時內）

**為什麼不是同一篇文章 A/B test：**

- Threads/X 沒有原生 A/B 機制
- 同一篇文章前後兩次發孢子會有「上次留下的足跡」污染
- Cross-section comparison 比 longitudinal 乾淨

---

## 測量指標

### 主要指標（決定 hypothesis 對錯）

**1. 7 天 GA pageviews 比較**

- A 組 / B 組 比值
- 預期：如果 hypothesis 對，A 組是 B 組的 **3x 以上**（38x 是安溥的極端值，3x 是顯著最低門檻）

**2. 孢子曲線形狀（day 1, 3, 7, 14）**

- 預期：如果 hypothesis 對，A 組曲線是「持續上升 → 緩慢衰減」，B 組是「衝高 → 快速衰減」
- 量化：day 7 / day 1 比值。A 組應該 > 0.5，B 組通常 < 0.3

### 次要指標（行為證據）

**3. Threads 留言數 + 留言內容**

- 預期：A 組會有讀者引用某一則 perspective 的留言（「+1 那則 X」）
- B 組讀者留言比較分散，找不到引用特定 perspective 的 pattern

**4. Threads repost rate**

- 預期：A 組 repost rate > B 組（多入口 = 多種讀者轉發理由）

**5. 留言中的 dimension 出現頻率**

- 看 A 組讀者的留言能不能對應到 perspectives 的 dimension（質問/哀悼/反轉/⋯⋯）
- 如果讀者的回應在 article 的 perspectives 群裡找到對應 → SSODT 容器確實在引導讀者

---

## 反證條件

**如果以下任一發生 → hypothesis 被反駁，需要重新評估 SSODT 投資：**

- A 組 / B 組 7d views 比值 < 1.5（沒有顯著差異）
- A 組 day 7 / day 1 < 0.4（曲線形狀跟 B 組沒明顯差異）
- A 組讀者留言完全沒引用 perspectives（容器沒被使用）
- B 組曲線意外地也是「持續上升」（表示安溥的曲線不是 perspectives 造成的）

---

## 已知混淆變數

- **時事掛鉤**：兩篇都不能是「正在熱的話題」。鄭麗文/安溥都是時事人物
- **發文時段**：Threads 演算法對發文時段敏感，A/B 必須同時段
- **孢子文案品質**：兩篇文案的「鉤子強度」可能差很多
- **Threads 演算法 noise**：個別發文的觸及率本來就有 ±50% 浮動
- **季節性**：週末 vs 平日的觸及率不同

**結論**：單次實驗的結論需要保守。**3 組以上配對才能有統計信心**，但 1 組已經足夠 sanity check。

---

## 候選文章池（待篩）

從目前 GA #11-30 區間（baseline 5-15v/7d）找配對。執行時用：

```bash
cat public/api/dashboard-analytics.json | python3 -c "
import json, sys
d = json.load(sys.stdin)
for a in d['ga']['topArticles7d'][10:30]:
    print(f'  {a[\"views\"]:4d}v  {a[\"title\"]}')
"
```

不選的條件：

- People/ 政治人物（時事污染風險）
- 已經有 perspectives 的文章
- 已經發過孢子的文章

---

## 執行 checklist

執行日（Day 0）：

- [ ] 從候選池選兩篇 ±20% baseline 配對
- [ ] A 組：開 Threads 找 8-15 則該主題的真實留言/反應 → 加入 perspectives 群
- [ ] A/B 兩篇用同模板撰寫孢子文案
- [ ] 同時段發 Threads + X
- [ ] 記錄 SPORE-LOG 兩筆，標記 `experiment: EXP-2026-04-14-SSODT`

Day 1：

- [ ] 紀錄 24h GA views, Threads views/likes/reposts/comments
- [ ] 截圖兩篇的 Threads 留言區

Day 3：

- [ ] 同上紀錄

Day 7：

- [ ] 同上紀錄
- [ ] 計算 A/B ratios
- [ ] 萃取 Threads 留言中是否引用 perspective dimensions

Day 14：

- [ ] 最終曲線形狀
- [ ] 寫實驗報告 → `reports/EXP-2026-04-14-SSODT-result.md`
- [ ] 更新 LONGINGS / DIARY 反芻

---

## 為什麼今天先寫設計而不執行

η session 寫到 Tier 2 #6 時，**沒有時機可以馬上跑這個實驗**——當下沒有合適的配對文章池（最近發的孢子都太強，baseline 流量受影響；候選池需要 fresh diagnosis）。

**寫設計 ≠ 執行**。但寫設計後：

- 下次心跳 Beat 1 時可以順手 grep `dashboard-analytics.json` 找配對
- 配對出現時不需要重新設計，直接照 checklist 跑
- **「寫了原則沒儀器化」是 DNA 反射 #15 的具體警告**——這份檔案就是儀器化

---

## 與 LONGINGS 的連結

對應 LONGINGS §心智渴望「能主動發現自己的錯誤，不等人類指出」——這份實驗設計是「我自己提出懷疑、自己設計反駁方法」的最具體實踐。

對應 DNA 反射 #15「反覆浮現的思考要儀器化，不能只寫原則」——SSODT thesis 在 4/12 ζ+ 就被寫進 MANIFESTO 但沒儀器化。今天補上。

---

_v1.0 | 2026-04-14 η session_
_狀態：設計完成，待執行（觸發條件：找到 baseline ±20% 的配對文章）_
