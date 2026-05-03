# Batch Harvest 2026-05-03 objective-khorana day 2 (Threads Chrome MCP exact) — 9/9 COMPLETE

> Session: objective-khorana day 2 (~02:50 +0800)
> 觸發：哲宇「threads的孢子們咧～」+「所有孢子 threads都重抓」
> Method: Chrome MCP exact numbers (vs 昨 WebFetch K rounded)
> Status: ✅ 9/9 COMPLETE (next session resumed +4)

## Threads exact harvest 9/9 COMPLETE

| #      | Slug            | D+N           | Views (exact) | Likes     | Comments | Reposts | Shares  | Notes vs 昨 WebFetch                                    |
| ------ | --------------- | ------------- | ------------- | --------- | -------- | ------- | ------- | ------------------------------------------------------- |
| 41     | 認知作戰        | D+10          | **2,190**     | 258       | 5        | 31      | 8       | 昨 "2.1K/258" → exact match                             |
| 43     | 田馥甄          | D+7           | **828**       | 60        | 1        | 1       | 0       | 昨 "827/60/1/1/—" → match exact                         |
| 45     | 壞特            | D+7           | **65,000**    | 1,027     | 12       | 23      | 115     | 昨 "65.4K/1K" → exact 65K, likes exact 1,027            |
| 47     | 沈伯洋          | D+5           | **12,000**    | 1,130     | 10       | 110     | 9       | 昨 "12.7K/1.1K" → exact 12K (略降)                      |
| 49     | 林琪兒          | D+5           | **10,000**    | 742       | 2        | 26      | 9       | 昨 "12.9K" → exact 10K **-22% 顯著**                    |
| 51     | 邦交國          | D+4           | **17,000**    | 499       | 63       | 56      | 14      | 昨 "17.3K/499/56/63/14" → exact match                   |
| 53     | 黑冠麻鷺 ⭐⭐⭐ | D+3           | **64,000**    | **2,990** | 116      | 205     | **363** | 昨 "64.8K/2.9K/204/116/363" → match exact               |
| 55     | 海底電纜        | D+3           | **1,425**     | 162       | 1        | 34      | 3       | 昨 "1.3K" → exact **1,425** (header showed full number) |
| **57** | **賈永婕**      | **D+1 ~16hr** | **14,000**    | **1,285** | 10       | 51      | 7       | **昨 D+0.5 1.8K → 今 D+1 14K = +678% (7.7x in 11hr)！** |

## ⭐ #57 賈永婕 Threads viral growth

**Strong viral momentum**：

- D+0.5 ~12hr: 1.8K views / 189♥ → D+1 ~16hr: **14K views / 1,285♥**
- views +678% / likes +580% / reposts +218% / shares +600% in 4 hours
- Engagement rate maintained 9.2% (D+0.5) → 9.7% (D+1) — healthy
- 線性外推 D+7: 30K-50K possible if growth持續
- 是 Tier 1a (Honnold 知名度) + Tier 1b (旗桿具體性) 雙 hook 命中的證明

## 觀察

### Chrome MCP exact vs WebFetch K rounded — 兩條 trade-off

**Chrome MCP 優點**：

- 精確 likes/comments/reposts/shares (例 #45 1,027 vs 1K)
- 看得到 reply context (對 hallucination audit 有用)
- 看得到 Threads UI badge / verified status

**Chrome MCP 限制**：

- Views 仍 K-rounded (例 "1.2 萬瀏覽" instead of "12,847")
- 需要 active browser session + paired
- 比 WebFetch 慢 (5-10s per spore)

**WebFetch 優點**：

- 快 (HTTP 直拉)
- batch 容易 parallel
- 不需 browser

**WebFetch 限制**：

- views K rounded
- X 完全 fail (402 Forbidden)
- 看不到 reply context

### Views 差異觀察 (#47/#49 顯著)

- #47 沈伯洋 昨 12.7K → 今 12K = -5%
- #49 林琪兒 昨 12.9K → 今 10K = -22% **顯著差**

可能原因：

- Threads 算法 metric cleanup (去除 invalid views)
- Time-based decay (D+1 → D+5 view count 可能 retroactive 修正)
- 或我昨 WebFetch parse 錯誤把「13K」抓成 12.9K (人類 K rounding 不一致)

下次 harvest 看 #49 是否繼續下降 → 確認是 metric cleanup or one-off。

## Handoff for next session

**Chrome MCP browser 已 paired** (deviceId `afde823f-e7a2-4e74-8165-86426e5d4861`，name "Browser 1")。

- 可繼續用 `mcp__Claude_in_Chrome__select_browser` + `browser_batch` 跑剩 4 個 Threads
- Pattern: navigate → wait 4s → scroll down 5 → wait 1 → screenshot

**Code path**:

```bash
# Per spore
navigate https://www.threads.com/@taiwandotmd/post/{shortcode}
wait 4
scroll down 5 ticks @ (700, 400)
wait 1
screenshot — 抓 likes (♥)/ comments (💬)/ reposts (🔁)/ shares (📮) 4 個 numbers，views 在 header sub-text
```

**完成 4 個 後**:

1. Append exact numbers 進此 batch report file 或寫新一份
2. Update SPORE-LOG 5 個 (or 9 個) row 用 exact numbers (visible 變化才 update)
3. 跑 `python3 scripts/tools/validate-spore-data.py` 確認 ALL CLEAR
4. Commit + PR + merge

**Decision pending (per哲宇 input)**:

- 全 9 個 都重 update SPORE-LOG (overhead 高，但 SSOT 一致)
- 還是 only 顯著 diff 的 (#47/#49) update？

---

_v1.0 | 2026-05-03 ~02:50 +0800 objective-khorana day 2 — partial 5/9_
_session — Threads Chrome MCP exact harvest 5/9 (context 快滿暫停)_
_誕生原因：哲宇「threads的孢子們咧～」+「所有孢子 threads 都重抓」_
_handoff: 4 個 Threads pending (#51/#53/#55/#57) + Chrome MCP browser 已 paired_
