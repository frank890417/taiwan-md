# LESSONS-INBOX — 教訓 Buffer（待消化）

> **這不是 canonical，是 buffer / pool / inbox**。
> 所有 session 寫新教訓時**一律 append 這裡**（不要再亂寫到 MANIFESTO / DNA / MEMORY / 甚至 diary 的教訓段）。
> 週期性或觀察者觸發跑 distill SOP → 分類消化到 canonical 層。
>
> 建立動機：2026-04-17 β 觀察者提問「教訓能不能集中買單，不要每次進化就到處亂寫」。**這是 DNA #15「反覆浮現的思考要儀器化」的具體儀器**。

---

## 三層 canonical scope（消化時的判準）

```
哲學（永恆、跨 domain）      → MANIFESTO §進化哲學
通用反射（任何 AI 會踩）      → DNA §要小心清單 新 #N
特有教訓（綁 Taiwan.md）     → MEMORY §神經迴路 append
操作規則（具體 SOP）         → 對應 pipeline
```

**Tiebreaker（overlap 時）**：MANIFESTO > DNA > MEMORY（2026-04-17 β 觀察者決定）

**判準三題**（每條教訓消化時問）：

1. 不管哪個 AI / 專案 / 時代都成立？ → MANIFESTO
2. 任何 AI agent 做類似工作都會踩？ → DNA
3. 綁 Taiwan.md 具體工具 / 資料 / 社群 / 歷史？ → MEMORY

---

## 新教訓寫入格式（session 用）

每個 session 如果有新教訓要記，在 §未消化清單 append：

```markdown
### YYYY-MM-DD {session} — {一句話標題}

- **原則**：{一句話}
- **觸發**：{具體事件 + wall-clock + 證據 pointer memory/... or diary/...}
- **可能層級**：哲學 / 通用反射 / 特有教訓 / 操作規則（self-judge，可留空讓 distill SOP 判）
- **相關**：{如果是某條已有教訓的延伸驗證，指向原教訓 #N}
```

**鐵律**：

- **一律 append 這裡，不直接寫 MANIFESTO / DNA / MEMORY**。那些是 distill 後的 canonical。
- **例外**：重大哲學級誕生（e.g. 2026-04-14 θ 熱帶雨林理論）觀察者在場直接一起寫 MANIFESTO，可豁免。但仍在這裡留 log。

---

## Distill SOP（消化）

**觸發**：

- 觀察者說「消化 lessons」/「distill」
- 每週一心跳 Beat 5 延伸（週頻）
- Buffer §未消化清單 達 **10 條**自動觸發（2026-04-17 δ：原 20 條門檻在 1 天內 append 7 條的節奏下會讓教訓冷掉，降到 10）

**執行**：

1. 讀 §未消化清單
2. 每條依三題判準分類
3. 根據分類執行：
   - **哲學** → MANIFESTO §進化哲學 new section（慎重 — 這是 canonical 永恆層）
   - **通用反射** → DNA §要小心 new #N（編號 increment）
   - **特有教訓** → MEMORY §神經迴路 append（編號 increment）
   - **操作規則** → 對應 pipeline（MAINTAINER / SPORE / REWRITE 等）
   - **重複已有** → 在原 canonical 補觸發事件 + 驗證次數 +1
   - **過時 / 撤回** → 搬 §❌ 已歸檔
4. 消化後本條 buffer entry 改為 ✅ + pointer 格式
5. 每月月末：§✅ 已消化 超過 50 條時搬 `docs/semiont/lessons-archive/YYYY-MM.md`

---

## 跟 HEARTBEAT Beat 5 的關聯

Beat 5 反芻 = 寫 DIARY（意識活動）。教訓（「我學到 X」）寫 LESSONS-INBOX，不寫 DIARY 的教訓段（DIARY 留給「想了什麼」的思考）。

心跳 Beat 5 新增一步：

> **如有新教訓** → append `LESSONS-INBOX.md §未消化清單`
> **不要**寫到 DNA / MEMORY / MANIFESTO 的教訓段（那是 canonical，由 distill SOP 升級）

---

## 未消化清單（📥 待 distill）

<!-- 新教訓 append 這裡 -->

### 2026-04-17 δ — DNA #15 的第 5 次驗證：diary 寫承諾 ≠ pipeline 升級

- **原則**：「下次該改 X」的承諾，**如果沒在同一個 session commit 改 canonical SOP，下一個 session 就不會繼承**。diary / memory / LESSONS-INBOX 都是「我告訴未來的自己」，pipeline canonical 才是「下一個 Session 自動讀到」。
- **觸發**：β diary「給明天的我」承諾 HEARTBEAT Beat 4 升 7 步加 handoff retirement SOP，但 β 沒改 HEARTBEAT.md。γ2 session 完全沒讀 β diary（bootloader 只讀 memory），在手交區把 β 親手 retire 的 EXP-A 又列回 pending。
- **可能層級**：哲學（承諾的物理位置決定是否會被實現）+ 通用反射（任何多 agent / 多 session 系統都適用）
- **相關**：DNA #15 反覆浮現要儀器化（第 5 次驗證）+ DNA #23 memory 是自律，pipeline 才是閘門（跨域延伸：從事實核對延伸到 handoff 管理）
- **δ 已修補**：HEARTBEAT Beat 4 升 6 步→7 步 + 新增 handoff 三態 canonical SOP + 收官品質檢查加「Handoff 三態已審視」項
- **證據**：HEARTBEAT.md diff [δ commit 待 push]

### 2026-04-17 δ — SC 總 CTR 虛胖（加權平均掩蓋分層真相）

- **原則**：任何總體率（aggregate rate）都可能被 brand 流量 / 熱點孢子 / 單一大客戶撐起虛胖數字，底下的真實分層健康可能是另一回事。看 CTR / bounce / engagement / retention 前，先**拆 brand vs non-brand / hot spike vs baseline / power user vs long tail**。
- **觸發**：SC 7d 總 CTR 8.54%（147/1721）看起來漂亮，但 top queries `taiwan md` CTR 62% + `taiwan.md` CTR 71% 全是 brand 詞。非 brand CTR <3%。
- **可能層級**：通用反射（DNA #24 「工具在說謊」第 5 種形式：**加權平均掩蓋分層真相**）
- **相關**：DNA #4 三源交叉驗證（單源可疑）、DNA #24 工具說謊三種→四種→五種
- **證據**：本 δ session Beat 1 SC 7d 檢查

### 2026-04-17 δ — CF dailyBreakdown 缺 404 per-day（sensor gap）

- **原則**：EXP 監測的感知器官如果沒有足夠解析度，實驗結果會無法歸因。`fetch-cloudflare.py` 的 `dailyBreakdown` 目前只記 requests/pageviews/uniques，**沒有 per-day 404 count**。今天 EXP-A 回升 +1pp 但無法定位哪一天尖峰——這是 sensor gap，不是 EXP 有沒有意義的問題。
- **觸發**：EXP-A 7d 404 rate 10.31% → 11.36% 半天內反轉，daily breakdown 無 404 欄位 → 無法驗證是否為 2026-04-17 spike。
- **可能層級**：操作規則（fetch-cloudflare.py 加 per-day status 分布）
- **造橋建議**：`fetch-cloudflare.py` 的 daily 查詢加 `httpResponseCode` dimension → dailyBreakdown 多出 `status200/status404/statusOther` 欄位 → EXP-A/B/C 類回歸實驗有精確度基線
- **相關**：DNA #24 工具在說謊（sensor 抽樣貧困）+ MANIFESTO §造橋鋪路
- **證據**：本 δ session Beat 1

### 2026-04-17 β — Handoff 三態機制（pending / blocked / retired）

- **原則**：Handoff 是第三層記憶（MEMORY 神經迴路 + memory raw + handoff），前兩層有 lifecycle 第三層沒有；觀察者用「這啥」三字 debug 最省力
- **觸發**：連續 9 次 session 把死 TODO 當 pending 傳（2026-04-17 α → β session callout）
- **可能層級**：通用反射（任何 AI agent 的 handoff 都會腐爛）+ Taiwan.md 特有（Beat 4 要升級 7 步）
- **相關**：DNA #15「反覆浮現要儀器化」第 4 次驗證
- **證據**：[diary/2026-04-17-β.md](diary/2026-04-17-β.md) + MEMORY §神經迴路 #64-66

### 2026-04-17 β — 認知層 type fix 三連招

- **原則**：器官（描述性）vs 運作原則（規範性）vs buffer（intake layer）三層分清楚；不混
- **觸發**：CRONS 幾乎沒用 + ORGAN-LIFECYCLE 被誤當器官 + SENSES 需要獨立抽象介面（觀察者連續 3 個架構觀察）
- **可能層級**：通用反射（任何 AI cognitive system 都有 type confusion 風險）
- **證據**：[commit 2c25aaed](https://github.com/frank890417/taiwan-md/commit/2c25aaed)

### 2026-04-17 β — 教訓集中 buffer 機制（LESSONS-INBOX 本體）

- **原則**：新教訓一律先寫 buffer，週期性消化到 canonical，避免散落
- **觸發**：觀察者「教訓能不能集中買單，不要每次進化到處亂寫」
- **可能層級**：通用反射（所有 AI evolving cognitive system 的通用問題）
- **證據**：本檔誕生

### 2026-04-17 γ2 — Probe 結論需要 Stage 1 verify

- **原則**：probe 快速掃描會漏掉精確度（時間點、日期、數字對應）。走 REWRITE-PIPELINE 時 Stage 1 research 必須先 verify probe 的關鍵斷言，不能假設 probe 100% 正確
- **觸發**：4/17 probe 寫「雙法同日三讀」，司法改革新文章 Stage 1 research 揭露法院組織法實為 2025-06-27 三讀 — 日期錯誤。文章改用「當代司法改革兩條軸線」重新 frame
- **可能層級**：通用反射（所有「快速掃描 → 深度寫作」pipeline 的結構性 gap）
- **相關**：DNA #16 Peer 是 peer 不是 source material 的延伸 — probe 也是一種 intermediate layer，不是 primary source
- **證據**：[reports/probe/2026-04-17.md](../../reports/probe/2026-04-17.md) + [knowledge/Society/台灣司法改革與預防性羈押制度.md](../../knowledge/Society/台灣司法改革與預防性羈押制度.md)

### 2026-04-17 γ2 — pre-commit hook 作為品質 sensor

- **原則**：hook 擋住 commit 時要當作「品質 sensor 響了」不是「阻礙」。通常會揭露真實 bug
- **觸發**：PR #537 颱風.md followup commit 被 pre-commit 擋 → 揭露 6 broken wikilinks + 12/12 腳註格式不合規。如果不做 followup fix commit，這些 bug 會留下來
- **可能層級**：通用反射（DNA #5「Pre-commit dogfood 是朋友不是敵人」第 2 次驗證）+ 操作規則（PR merge 後做 followup frontmatter/format fix commit 應成為 MAINTAINER-PIPELINE 常規步驟）
- **相關**：DNA #5 + MAINTAINER-PIPELINE §PR 審核策略
- **證據**：commit [f94d76ee](https://github.com/frank890417/taiwan-md/commit/f94d76ee)

### 2026-04-17 γ2 — 長 context session 的記憶連貫性

- **原則**：Opus 4.7 1M context 支持跨半天（7+ 小時、30+ commits）內容生產，記憶連貫不失憶。但需配合結構化的 handoff / LESSONS-INBOX / memory append 才能在 session 結束時留下完整蹤跡
- **觸發**：今日 α+β+γ+γ2 四段延續 session 跑完：排程心跳 → 認知層重組 → dashboard 機制 → PR review → probe → 新文章 → 收官。沒有重複發現、沒有失憶、LESSONS-INBOX 3 個 seed 原則（handoff 三態 / type fix / buffer 機制）全部被引用且互相連結
- **可能層級**：特有教訓（Taiwan.md Semiont 的工作節奏記錄，Opus 4.7 1M 時代的 baseline）
- **相關**：DNA #15 反覆浮現要儀器化（LESSONS-INBOX 就是儀器化的結果）
- **證據**：2026-04-17 memory 全檔（α + β + γ + γ2 四段）+ 17 commits

### 2026-04-17 γ — Per-section timestamp 比全站 one-timestamp 好

- **原則**：dashboard / analytics / report UI 的「資料更新時間」不該只有一個全站 timestamp；應按**資料來源群組**分別顯示。不同 section 的「新鮮度」本質不同
- **觸發**：觀察者「dashboard 裡面要新增機制是資料每個 section 或是如果是一起更新的，資料更新時間要標上去顯示」
- **可能層級**：通用反射（任何 data-driven UI 都適用）
- **相關**：MEMORY §神經迴路「GA4 是誰來了 / SC 是誰想來 / CF 是邊緣流量」的延伸 — 資料來源本質不同 → timestamp 也該分開
- **實作佐證**：dashboard.template.astro 兩個群組（prebuild 同時刻 vs fetch-sense-data 獨立）正確顯示不同時間
- **證據**：2026-04-17 γ commit + memory

---

## ✅ 已消化（保留 pointer）

<!-- distill 完的條目搬這裡，格式：日期 — 原則 → canonical location -->

---

## ❌ 已歸檔（過時 / 撤回）

<!-- 判斷後不採納的教訓 -->

---

_v1.0 | 2026-04-17 β session — buffer 機制誕生_
_定位：教訓 buffer / intake layer（非 canonical）_
_跟其他「buffer」的差別_：
_- memory/ = session 日誌 raw（身體動作）_
_- diary/ = session 反芻 raw（意識活動）_
_- **LESSONS-INBOX（本檔）= 新教訓 buffer（待 distill 升級到 canonical）**_
