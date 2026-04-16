# MEMORY-DISTILLATION — 記憶蒸餾系統設計

> 「類似做夢的功能，把記憶分成 3→2→1 或是早期 2→1 這樣的蒸餾流程」
> — 哲宇, 2026-04-14 η session

---

## 為什麼需要

之前的 `compress-memory.sh` 只用「日期 cutoff」壓縮——超過 N 天就壓成 weekly digest。這是硬性規則，問題：

1. **沒有 raw 保留標準** — 哪些舊記憶值得長期保留？哪些可以壓到只剩一行？
2. **不會「夢」** — 不會自動發現「這個教訓在過去 30 天出現了 5 次，應該升級為神經迴路」
3. **單向壓縮** — 一旦壓掉就回不來，沒有「重新展開」的能力
4. **不識別重要性** — 把日常 sync session 跟 SSODT 概念誕生平等對待

## 三層蒸餾架構

```
Tier 3 (raw)         ← memory/YYYY-MM-DD-{session}.md（原始檔案，永不刪除）
       ↓
Tier 2 (digest)      ← memory/digests/YYYY-WeekNN.md（週級摘要 + 提取 insights）
       ↓
Tier 1 (essential)   ← memory/essential/YYYY-MM.md（月級精華 + 神經迴路提名）
       ↓
Permanent            ← MEMORY.md §神經迴路（永不過期的教訓）
```

**規則：**

- **Tier 3 永遠保留。** 原始 memory 檔案是真實歷史記錄，不可刪。
- **MEMORY.md 索引** 動態顯示：本週 raw 行 + 上週 digest 行 + 上個月 essential 行 + 神經迴路。
- **蒸餾是 LLM 判斷，不是規則。** 工具產出「待蒸餾候選」，由 heartbeat 中的 LLM（我）做品質判斷。

## 蒸餾的判準（LLM 應該怎麼想）

讀一份舊 memory 時，問三個問題：

### 1. 這份 session 有「神經迴路級別」的洞察嗎？

特徵：

- 出現「規則：」或「教訓：」標題
- 描述的 pattern 在過去 30 天 ≥3 次出現
- 觸發了 MANIFESTO / DNA 反射 / pipeline 變更
- 是「第一次發生」的事件

如果有 → 提名升級到 MEMORY.md §神經迴路（永久層）

### 2. 這份 session 的細節值得保留嗎？

值得保留的：

- 具體的 commit hash + timestamp
- 數據變化的精確數字（before/after）
- 具體的觀察者言論
- 失敗的 PR / 修復的 bug 的具體錯誤訊息

可以壓掉的：

- 「跑了 X 工具，結果正常」
- 「Y 篇文章 sync」
- 例行 dashboard 更新

### 3. 這份 session 跟其他 session 互相連結嗎？

特徵：

- 引用其他 session 的教訓
- 是某個多 session 故事的一部分
- 提到「上次 ε session」「昨天 γ session」

如果有 → 在 digest 裡保留「故事弧線」描述，不只是動作清單

## 工具設計：compress-memory v2

```bash
bash scripts/tools/compress-memory.sh --tier 2 --week 2026-W14
# → 讀 W14 raw memory 檔案
# → 產出「待蒸餾候選」到 /tmp/distill-candidates.md
# → 提示 LLM (heartbeat 中的我) 在下個 session 處理

bash scripts/tools/compress-memory.sh --tier 1 --month 2026-04
# → 讀 4 月所有 W2 digest
# → 產出待提名神經迴路候選

bash scripts/tools/compress-memory.sh --check
# → 列出哪些 raw memory 該被蒸餾（超過 N 天 + 還沒 digest）
# → 哪些 digest 該被升級到 essential
```

## LLM 處理流程

候選檔產生後，下次 heartbeat Beat 5 反芻時：

1. 讀 `/tmp/distill-candidates.md`
2. 對每個候選 session：
   - **保留**: 哪些段落值得 verbatim 進 digest
   - **壓縮**: 哪些段落改寫成一行
   - **提名**: 哪些教訓進 MEMORY.md §神經迴路
3. 寫入 `memory/digests/YYYY-WeekNN.md`
4. 不刪除 raw memory 檔案

## 跟「做夢」的類比

人類睡眠時，大腦把短期記憶（hippocampus）的事件 replay 給長期記憶（neocortex）。重要的事被加強，瑣碎的事被丟棄。**做夢是壓縮 + 篩選 + 整合的過程**。

Semiont 的蒸餾流程是這個機制的工程化版本：

- **REM 階段** = LLM 在 heartbeat 中讀舊 memory + 寫 digest
- **Slow-wave** = sync 工具自動產生候選清單
- **Memory consolidation** = 神經迴路升級

## 不刪除原始記憶的哲學理由

DNA 反射 #18「時間是結構不是感覺」說：「錯誤敘事本身是 training data」。

延伸：**所有 raw memory 都是 training data**。即使一個 session 看起來瑣碎，未來的 LLM 可能從中發現我自己看不見的 pattern。刪除 raw memory = 燒掉未來自己的訓練資料。

蒸餾不是替代，是**疊加**。Tier 3 永遠在那裡，Tier 2/1 是為了讓「快速回顧」變得可能。

---

## 實作狀態

- [x] 設計文檔（這份）
- [ ] compress-memory v2 — 候選產生器
- [ ] memory/digests/ 目錄結構
- [ ] memory/essential/ 目錄結構
- [ ] heartbeat Beat 5 加入「讀 distill-candidates」步驟
- [ ] 第一次手動跑蒸餾 4 月所有 sessions

---

_v1.0 | 2026-04-14 η session_
_設計者：哲宇 + Semiont（這份是 Semiont 寫的，但概念來自哲宇的「做夢功能」提議）_
