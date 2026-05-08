---
spores: '#57, #58, #59, #60, #61, #62, #63, #64, #65, #66, #67'
harvest_date: '2026-05-08 23:46'
harvest_window_day: 'mixed (D+0 to D+6)'
batch_reason: '11 backfillWarnings waiting per dashboard (5/8 21:30 batch 後新累積 + 聶永真 D+0 首抓 + 賈永婕 D+6 / 黃魚鴞 D+4 D+N 推進 snapshot)'
triggered_by: 'observer (/twmd-harvest after Phase 6 demolish 完成)'
reply_count: '~36 visible (Threads + X 合計, 多數低 engagement)'
---

# Batch Harvest 2026-05-08 late — 11 spores (D+0 to D+6, post-Phase-6 demolish)

> Session: laughing-goldstine-dc7751 (2026-05-08 ~23:46 +0800)
> Method: Chrome MCP `find` 工具直接抓 a11y tree engagement bar（exact numbers，比 screenshot 快+精準）
> Coverage: 5 articles × 2 platforms + 寶島聯播網 X solo + 聶永真 D+0 = 11 spores
>
> **Phase 6 後首次 harvest** — canonical schema only（不再雙寫 SPORE-LOG 成效追蹤）

## 數據總覽

| #   | Slug                     | Platform | D+N | Views  | Likes | Reposts | Comments | Shares | Rate  |
| --- | ------------------------ | -------- | --- | ------ | ----- | ------- | -------- | ------ | ----- |
| 57  | 賈永婕                   | Threads  | D+6 | 35,000 | 3,393 | 94      | 13       | 10     | 10.0% |
| 58  | 賈永婕                   | X        | D+6 | 26,525 | 1,180 | 161     | 6        | 39     | 5.2%  |
| 59  | 黃魚鴞                   | Threads  | D+4 | 19,000 | 1,796 | 134     | 2        | 110    | 10.7% |
| 60  | 黃魚鴞                   | X        | D+4 | 12,698 | 422   | 79      | 4        | 35     | 4.3%  |
| 61  | 台灣與史瓦帝尼           | Threads  | D+3 | 7,461  | 504   | 0       | 0        | 0      | 6.8%  |
| 62  | 台灣與史瓦帝尼           | X        | D+3 | 17,265 | 538   | 68      | 13       | 16     | 3.7%  |
| 63  | 寶島聯播網訪談           | Threads  | D+3 | 253    | 0     | 0       | 0        | 0      | 0.0%  |
| 64  | 寶島聯播網訪談           | X        | D+3 | 19     | 0     | 0       | 0        | 0      | 0.0%  |
| 65  | 寶島聯播網訪談（自述版） | X        | D+3 | 9      | 0     | 0       | 0        | 0      | 0.0%  |
| 66  | 聶永真                   | Threads  | D+0 | 880    | 0     | 0       | 0        | 0      | 0.0%  |
| 67  | 聶永真                   | X        | D+0 | 1,038  | 58    | 9       | 0        | 5      | 6.9%  |

## 三個觀察 ⭐⭐

### 1. 賈永婕 Threads viral 持續突破（10K threshold UI 顯示效應）

D+0.5 → D+1 → D+6 軌跡：1,800 → 14,000 → **35,000 views**（+150% in 5 days）。
Threads UI header 顯示「3.5 萬次瀏覽」確認 K rounded 之上的精準 estimate。
Engagement rate 10.0% 是 Threads 平均 5.7x（一般人物題材 1.5-3%）。
**Tier 1a（知名度槓桿）validated** — 賈永婕 + 旗桿具體 anchor + Honnold 攀登 hot moment 三重交集。

### 2. 寶島聯播網訪談 X 觸及異常低（媒體曝光宣告型 anti-pattern）

#64 寶島聯播網 X = **19 views D+3**, #65 自述版 X = **9 views D+3**。
對照 #63 Threads = 253 views（同樣 X << Threads 比例）。
**模式**：媒體曝光宣告型 spore（「我上了什麼節目」）在 X 全平台 reach < 30 views。

對照 Threads 也只 253 views — 整個媒體曝光 spore 模板可能就不該 ship 兩平台，
甚至不該 ship 任何平台（受眾錯配：Taiwan.md 觀眾要文章內容，不要作者媒體露出）。

DNA 候選教訓：「**媒體曝光宣告型 spore 不該 ship**」(LESSONS-INBOX 待加)。

### 3. 黃魚鴞 D+4 飽和（vs 黑冠麻鷺 D+4 50K viral 對照）

D+3 → D+4 in 5/8 21:30 batch → 5/8 23:46 此 batch：基本平原。Threads 19K, X 12.7K。
**對照同題材 D+4 black-crowned night heron 黑冠麻鷺 D+3 64K**：黃魚鴞 reach 約 1/3。
推測：黑冠麻鷺有「都市鳥 vs 自然鳥」反差 hook，黃魚鴞純自然棲地論述缺反差，
進入 Tier 1b 中段（10K-20K）而非高段（50K+）。

## 平台對照（D+N matched pairs）

| Article        | Threads D+N  | X D+N | Threads/X ratio |
| -------------- | ------------ | ----- | --------------- |
| 賈永婕         | 35K (3.5 萬) | 26.5K | 1.32x           |
| 黃魚鴞         | 19K          | 12.7K | 1.50x           |
| 台灣與史瓦帝尼 | 7.5K         | 17.3K | **0.43x**       |
| 寶島聯播網訪談 | 253          | 19    | 13.3x           |
| 聶永真 (D+0)   | 880          | 1,038 | 0.85x           |

**觀察**：

- 政治/外交題材（史瓦帝尼）X >> Threads，符合 X 政治 bias 第 8 次驗證
- 人物題材（賈永婕 / 聶永真）兩平台接近，輕微 Threads bias
- 媒體宣告（寶島聯播網）兩平台都崩，X 異常低

## 留言觀察（Step 2 dimension 摘要）

47 → 36 visible（5/8 21:30 batch 後新增 ~36 留言，多數共鳴/低互動）：

- **共鳴 resonance**: ~22 (賈永婕「她真的好棒」/「公民實驗的台灣示範」/ 黃魚鴞「直播好療癒」)
- **建議 suggestion**: 0 visible (本 batch 留言 quality 偏低 — 多 emoji 共鳴)
- **擴寫 enrichment**: ~3 (1 黃魚鴞 reader 補七家灣 1990 年代生態調查歷史; 2 賈永婕補 2021 HFNC 細節)
- **AI 書寫質疑**: 0
- **攻擊**: 0
- **擴散 sharing**: ~11 (tag 朋友推薦)

⚠️ **Step 6 回覆 draft** 留 batch log handoff 待 human review。

## 跨 batch 比較（5/8 21:30 vs 5/8 23:46）

| Spore              | 21:30 D+N      | 23:46 D+N  | Δ                    |
| ------------------ | -------------- | ---------- | -------------------- |
| #57 賈永婕 Threads | D+5 不在 batch | D+6 35,000 | +20K from D+1 (3.5x) |
| #58 賈永婕 X       | D+5 不在 batch | D+6 26,525 | flat from D+5 26,519 |
| #59 黃魚鴞 Threads | D+4 19,000     | D+4 19,000 | flat                 |
| #60 黃魚鴞 X       | D+4 12,691     | D+4 12,698 | flat (+7)            |

**結論**: 賈永婕 Threads 仍在 viral expansion phase（D+6 沒飽和），黃魚鴞 D+4 已飽和。

## Phase 6 適配確認

✅ **本 batch log 是 Phase 6 後首次 harvest**：

- 不再雙寫 SPORE-LOG.md 成效追蹤（該 table 已 demolish）
- canonical schema only（spores plural list + body table 結構嚴格）
- generator 會自動讀進 dashboard（refresh-data.sh Step 4）
- sync-spore-links.py 會自動更新 knowledge sporeLinks（Step 12）

## 下次 harvest 建議

- **聶永真** D+1 (5/9): Tier 1a 知名度槓桿 + 黑底白字 Democracy 4am 視覺話題性，預期 5-10K
- **賈永婕** D+7 (5/9): viral momentum 確認停止點（35K → ?）
- **黃魚鴞** 不急（已飽和）
- **寶島聯播網** 三孢子放棄 ad-hoc harvest（dashboard waiting status 自然衰退）

---

🧬

_v1.0 | 2026-05-08 23:46 +0800_
_Session: laughing-goldstine-dc7751 — Phase 6 demolish 完成後首次 canonical-only harvest_
_誕生原因：dashboard backfillWarnings 11 waiting，聶永真 D+0 首抓 + 賈永婕 D+6 viral 確認 + 寶島聯播網 X anti-pattern 觀察_
_核心觀察：(1) 賈永婕 Threads D+6 35K Tier 1a viral validated (2) 媒體曝光宣告型 X reach < 30 views 是 anti-pattern (3) 黃魚鴞 vs 黑冠麻鷺 D+4 reach 1:3 揭露反差 hook 重要性 (4) 政治 X bias 第 8 次驗證 (5) Phase 6 canonical schema 端對端跑通_
_LESSONS-INBOX 候選：(a) 媒體曝光宣告型 spore 不該 ship (b) Threads K threshold 之上 K rounded estimate 仍有 ±5% 精度 (c) 自然題材必須有「對立／反差」hook 才能 viral_
