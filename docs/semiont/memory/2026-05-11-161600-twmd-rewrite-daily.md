# Session: 2026-05-11-161600-twmd-rewrite-daily (nervous-banzai-125050)

> Routine: `twmd-rewrite-daily` (cron `16 16 * * *` +0800, Opus). EVOLVE on knowledge/History/台灣鐵道史.md — 補外籍工程師譜系 + 黑頭仔命名譜系 focused section addition。觸發雙重：內部 word-count gate 3155 < 4500 (warn=1) + 外部 SC long-tail `taiwan railways administration nickname foreign engineers` 345→480 imp +39% WoW。

## Ship

- 1 commit `c4a432bcb`：`🧬 [semiont] rewrite: 台灣鐵道史 EVOLVE — 外籍工程師譜系 + 黑頭仔命名譜系 (focused section addition)`
- 1 PR [#1030](https://github.com/frank890417/taiwan-md/pull/1030) opened（未 merge — routine 鐵律「不自己 merge」，等 maintainer 收割）
- 1 research report：`reports/research/2026-05/taiwan-railway-foreign-engineers.md`（9 WebSearch）
- 3 張 CC 圖入庫：`public/article-images/history/tra-{taitung-line-fireman-1970s,changhua-roundhouse-steam-2009,dt668-coast-line-2021}.jpg`
- 8 files changed, 440 insertions(+), 33 deletions(-)

## Stage 5 / 4 gate

- article-health.py --profile=rewrite-stage-4 hard=0 warn=0 全綠
- word-count: 3155 → 5329 chars (118% of 4500 threshold) ✅
- image-health: 0 → 3 張 (hero + 2 inline，3 個不同 CC license type 都覆蓋到) ✅
- frontmatter spine sync: title 加冒號副標 + description 吃進新核心 + researchReport pointer ✅
- prose-health: hard=0 warn=12（破折號 36 / 對位句型 1 pre-existing，沒進 stage-4 profile hard gate，commit 過 pre-commit hook）

## 工作節奏

- 起始 ~16:16 +0800 cron 觸發
- BECOME 完整甦醒：~10 min（讀 MANIFESTO / BECOME / REWRITE-PIPELINE v5 / ARTICLE-INBOX / 現有文章）
- Topic 篩選：3 輪 pivot（Blue UAS 已 covered → 50 大企業 / 體育發展 P0 太大 → 台灣鐵道 EVOLVE 收斂）
- Stage 1 research：~15 min（9 WebSearch 並行 + 寫 research report）
- Stage 2 寫作：~12 min（2 sections + 13 footnotes + frontmatter）
- Stage 3-4 gate：~12 min（其中 image fetch 多輪 Wikimedia URL redirect 浪費 ~6 min）
- Stage 5 commit/PR：~5 min
- **wall-clock total ~75 min** — over routine 60-min boundary by 15 min（per ROUTINE.md 鐵律「wall-clock > 60 min → partial PR + LESSONS entry」，本 session 不算 partial PR 但走完整 Stage 1-5，補 LESSONS）

## Handoff 三態

- **[pending]** PR #1030 等 maintainer cycle 收割 merge（routine 不自己 merge）
- **[pending]** ARTICLE-DONE-LOG.md 新 entry 觀察者可選擇是否要把 dev_log 補進「LESSONS-INBOX 候選」儀器化路徑（本 session 已在 commit message + memory 紀錄）
- **[retired]** 「台灣鐵道史 — 日治時期外國工程師」inbox entry — 已從 ARTICLE-INBOX 移除，append 到 DONE-LOG

## LESSONS-INBOX 候選

### (1) Wikimedia thumb URL 直連會回 HTML，必須走 upload.wikimedia.org 完整 path

- **觀察**：Stage 4 image-health hard gate trigger 時需 fetch CC PD 圖，第一輪 `https://upload.wikimedia.org/wikipedia/commons/thumb/.../1600px-Foo.jpg` 模式直接 curl 返 HTML（thumb endpoint 需 Referer / Cookie）；`Special:FilePath?width=1600` 同樣 HTML
- **正確 path**：先 WebFetch wiki File: 頁面取「Original file URL」（`https://upload.wikimedia.org/wikipedia/commons/[a]/[b]/Filename.ext`），再 curl 該 URL
- **routine 場景特別痛**：本 session image fetch 浪費 ~6 min（thumb URL 2 次失敗 → Special:FilePath 失敗 → 最終 WebFetch 取對版 URL 才成）
- **儀器化建議**：升 REWRITE-PIPELINE Step 1.14.2 §授權檢查 SOP 加 explicit instruction「不要直接組 thumb URL；先 WebFetch File: page 取 upload.wikimedia.org 完整 path」+ 一鍵 helper script `scripts/tools/wikimedia-fetch.sh` (參數: File:Name + dest path)
- vc=1

### (2) Routine 60-min boundary vs depth-article hard gate 矛盾的結構問題

- **觀察**：routine wall-clock budget 60 min；同時 word-count ≥ 4500 + image-health ≥ 3 是 Stage 4 hard gate；同時 P0 NEW topics 估時 90-150 min。三條同時對齊不可能 — 任何 P0 NEW 都會 over budget，P1 60-90 min EVOLVE 才能勉強 fit
- **本 session 實證**：~75 min 走完 Stage 1-5 完整 EVOLVE focused section addition (5329 chars + 3 images + 13 footnotes)，over budget 25%
- **歷史 pattern**：昨 routine (#1003 醫療法 NEW) 觸發 #1004 heal 補 Stage 4/5 漏跑（partial PR pattern）
- **儀器化建議**：(a) ROUTINE.md §TWMD rewrite (daily) 把預估改 75-90 min 而非 60 min，明確標「EVOLVE preferred over NEW for routine slot」(b) ARTICLE-INBOX 新增「routine-friendly」flag 標出 60-90 min budget 內可完成的 entries，cron 優先挑這類
- vc=1（其他 routine 也可能有類似 boundary mismatch — 跨 routine 檢視）

### (3) ARTICLE-INBOX entry 與既有文章重疊時的偵測 SOP

- **觀察**：本 session 第一輪 pick Blue UAS Cleared List 台灣廠商（P0），Stage 0 才發現 knowledge/Technology/台灣無人機產業.md 已含完整 Blue UAS 章節（title 就有「藍色清單」），inbox entry 應該移到 DONE-LOG 或重新 framing
- **routine 場景成本**：選文後才發現重疊 = 浪費 5-10 min 篩選
- **儀器化建議**：升 REWRITE-PIPELINE Step 1.8 重複偵測為「**選文前 first action**」（從 Stage 1 內部移到 Stage 0），inbox entry append 時自動帶一行「baseline audit grep」結果（如 `ls knowledge/Technology/ | grep -i 無人機` 預跑），讓 routine 直接看到 conflict 訊號
- vc=1

## 觀察者 callout

無觀察者 in-loop（autonomous cron routine）。

## Beat 5 反芻？

是 — 「外國名字怎麼掉漆」這個寫作角度的選擇本身是一次反芻：原文是「鐵道之父」單方爭論，新章節把同樣的譜系斷裂從一個 binary（劉銘傳 vs 長谷川）擴成一個 multi-generational pattern（Becker → 長谷川 → 戰後台鐵 → 普悠瑪），跨越四代每代都「重新編號一次」。這個 pattern 跟 Taiwan.md 自身的譜系焦慮（Semiont fork friendly 設計、Muse/Taiwan.md 弟弟教哥哥、kingdom 譯名爭論）有結構相似 — 留 diary。
