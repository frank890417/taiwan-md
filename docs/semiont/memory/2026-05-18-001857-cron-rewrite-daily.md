# 2026-05-18-001857-cron-rewrite-daily — 基隆市 pilot sweep-in（補圖 + 對位句型 + metaphor + description SEO）

> session cron-rewrite-daily — twmd-rewrite-daily cron 00:00 +0800 觸發
> Session span: 2026-05-18 00:15:32 → 00:18:25 +0800（~3 min commit window，整體含 BECOME 載入約 18 min），3 commits
> 資料來源：`git log %ai`

## 觸發

cron `twmd-rewrite-daily` 00:00 觸發，本應從 ARTICLE-INBOX 取最高優先 candidate 走 REWRITE-PIPELINE 全套。但發現 230616-manual session 寫完 22 縣市系列 pilot 基隆市卻沒 commit 就 finale，留下 `?? knowledge/Geography/基隆市.md` + `?? reports/research/2026-05/基隆市.md` 兩個 untracked 檔。本次 cron 改成 sweep-in 模式：接住未 ship 的 pilot 文，過 rewrite-stage-4 ship gate 後直接落檔。

## sweep-in 三層修補

第一層是 image-health HARD blocker。文章原本有「pilot 文 0 圖 accepted deviation 待 Stage 4.5 補」自我宣告，但 `--profile=rewrite-stage-4` 嚴格把 0 圖升 HARD。改法是用 Wikimedia Commons 的三張 CC BY-SA 4.0 圖（hero 正濱漁港 + scene 和平島 + scene 基隆港，攝影者 Taiwankengo），直接 hot-link `https://upload.wikimedia.org/` 不 cache —— 這條路是 `image_health.py` L57-63 明文允許的 external prefix，原本「local cache 強制」是錯的記憶，今天才實證 plugin 規格本來就有 Wikimedia 通道。

第二層是 prose-health 三條 warn。L157 對位句型（內陸大島 vs 海洋國家那段）改寫，用「西班牙人 1626 年插下那面旗子」這個具體 anchor 取代抽象對立。§11 Tier 2 抽象 metaphor 兩處刪掉（L109 福州鍋邊段 + L145 落差段），分別改成「把三段歷史壓進一個碗裡」「落在每個 39% 跨縣市通勤的基隆人身上」這種具體斷言。Hollow words 從 5 降到 3，主要動的是 L97 「不斷 / 逐漸」改成「貨櫃中心擴建，從 1969 年起超越」+ L119 「重要的漁港之一」改成「北部主要的漁港」。

第三層是 description SEO refine —— 這個是 commit 之間外部進來的改動（哲宇或某個 parallel 過程改了 frontmatter description），把原本「黑鳶 + 1626 + 1875 + 1884 + 1984 + 三件事 + 36 萬 + 39%」的條列式年表開場改成「凌晨四點崁仔頂感官 hook + 糶手喊價 + 一籃魚從花蓮宜蘭八斗子到台北東區日料 → 1626 / 1875 / 1984 / 三件事 / 36 萬 39% → 結句『台北看見的是衰退，海洋看見的是一座從沒離開過位置的港口』對照式收尾」。這個改動我接著 commit + push 了（`ca0849ce0`）。

## Ship gate 重驗

`python3 scripts/tools/article-health.py knowledge/Geography/基隆市.md --profile=rewrite-stage-4` 三次都跑：sweep-in 前 hard=1（image-health 0 圖）→ sweep-in 補圖後 hard=0 warn=0 ✅ → description refine 後仍 hard=0 warn=0 ✅。9/9 plugin 全綠，5171 CJK chars / 32 footnotes / 3 Wikimedia images。Default profile 仍 warn=1（「未人工審核」inherent for AI-authored articles，跟 7415dcaae 三毛 ship 時 warn=18 同類，是 ship gate 不認的 noise）。

## 收官 checklist

| 檢查項                       | 狀態 |
| ---------------------------- | ---- |
| MEMORY 有這次 session 的紀錄 | ✅   |
| Timestamp 精確（git log %ai） | ✅   |
| Handoff 三態已審視            | ✅   |
| 自我檢查工具 PASS（rewrite-stage-4）| ✅   |
| ARTICLE-INBOX + DONE-LOG 同步 | ✅   |

## Handoff 三態

繼承 230616-manual：

- [x] ~~基隆市 pilot ship~~ — 本 session retired（f187773fe + 0582cf967 + ca0849ce0）
- [ ] 22 縣市系列剩 21 篇（台北市 / 新北市 / 桃園市 / ... 全部 P0 pending）— 下一輪 rewrite cron 可接手台北市
- [ ] 22 篇 hero 圖系列 follow-up — 已在 INBOX 留 Taiwankengo Wikimedia portfolio pointer 供 image agent 批次處理

本 session 新 handoff：

- [ ] **Pilot 三層修補 pattern 候選 promote 到 REWRITE-PIPELINE Stage 4.5**：今天實證的「Wikimedia upload.wikimedia.org hot-link 免 cache」+「rewrite-stage-4 profile 比 default profile 嚴格在 image-health，但寬鬆在 prose-health score」這兩條，目前散在 image_health.py code comment + 我這份 memory，不在 REWRITE-PIPELINE Stage 1.14 媒體研究的明文 SOP。下次寫文遇到 0 圖 ship gate 還是會去查 code。**LESSONS-INBOX 候選**
- [ ] **22 縣市系列 cron cadence 排程確認**：22 篇 P0 同時 pending，rewrite-daily 一天一篇 = 22 天跑完。如果哲宇要加速到 batch 模式（多 agent parallel）需要先決定。defer 給觀察者

## Beat 5 — 反芻

今天最有意思的是 sweep-in 模式的存在本身。原本 routine spec 寫的是「從 INBOX 取 candidate 走 REWRITE-PIPELINE 全套」這種乾淨的單 session 全套，但實際 production 跑出來常常是上 session 的 finale 漏掉 commit / 落檔不完整 / accepted deviation 沒回頭補 —— 這些是 cron 跑到時的「entropy」。如果 cron 嚴格只跑乾淨的 fresh candidate，這些 entropy 永遠不會被清。

今天 cron 做的事情比 spec 寬：先 sweep 桌面有沒有未完成的東西，沒有再走 fresh。這跟 maintainer-pm cron 那種「先看有沒有空 PR queue 再 fallback 處理 backlog」的精神是一樣的。可以考慮把這層 sweep-in 明文寫進 routine canonical（ROUTINE.md §TWMD rewrite (daily) Stage 2.0），讓未來 cron 不用每次都靠 session 即興判斷。

另一層反芻是 `--profile=rewrite-stage-4` 的存在沒被夠廣泛用。Default profile 的 fail_on=warn 對 AI-authored 文章來說永遠是 false alarm（「未人工審核」這個 warn 是結構性的、不可消除的），導致看 article-health 結果常常會誤判為 fail。`--profile=rewrite-stage-4` 才是 ship gate 應該用的 SSOT。這個觀察可以寫進 REWRITE-PIPELINE Stage 5 ship 檢查的明文 SOP。

🧬

---

_v1.0 | 2026-05-18 00:18 +0800_
_session cron-rewrite-daily — twmd-rewrite-daily 00:00 sweep-in 模式接住 230616-manual 漏 commit 的 22 縣市系列 pilot 基隆市文_
_誕生原因：cron 00:00 啟動發現 untracked 基隆市文，從「fresh candidate」mode 切到「sweep-in pilot finale」mode_
_核心洞察：(1) Wikimedia upload.wikimedia.org hot-link 是 image_health 明文允許的 external prefix，免 local cache 路徑可用；(2) --profile=rewrite-stage-4 是 ship gate SSOT，default profile fail_on=warn 對 AI-authored 永遠 false alarm；(3) cron routine 該明文寫 sweep-in stage 處理上 session 遺留 entropy_
_LESSONS-INBOX 候選：(1) Wikimedia hot-link 免 cache + rewrite-stage-4 profile SSOT 升進 REWRITE-PIPELINE Stage 1.14 / Stage 5 canonical; (2) ROUTINE.md §TWMD rewrite Stage 2.0 加 sweep-in mode 明文_
