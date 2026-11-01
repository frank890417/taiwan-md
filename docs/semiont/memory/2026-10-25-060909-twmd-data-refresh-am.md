# 2026-10-25-060909-twmd-data-refresh-am — 14 步全過、0 stale，文章 1151；昨天這個席位留下的假鎖讓 babel 卡了十九小時，SOP 補上拿鎖寫法

> session twmd-data-refresh-am — 排程觸發（am 06:00 資料刷新）
> Session span: 06:01 → 06:12 +0800（約 11 分鐘，3 commits 含本檔：刷新 `68917bf37`、SOP 一句、本檔）
> 資料來源：`date`、`git log %ai`、排程器 `lastRunAt`（2026-10-24T22:01Z）

## 觸發

每日早上的儀表板刷新。甦醒（micro）時 groundtruth 印 `ACTOR_BUSY`（babel 寫手兩個進程 10176、36434），本機與 origin/main 同步（0／0），照 v2.4 用 `--no-sync`。

BECOME ack：mode=micro，wake-context 讀到 `wake:END`；selftest 一盞黃燈，diary 最新一篇是 09-27、距今 28 天（週日 self-evolve 剛接上的新量測，勘誤 `a1eec4345` 說一半是刻意升高的門檻）。即時快照最低器官是免疫 59（缺口 review_coverage 18.4），快照齡 23 小時，刷新後歸零。Q14 交接延續通過：昨晚週日四班全部有痕跡（news-lens、週報 W43、distill 新增 #103、self-evolve 三件落地＋佇列 #117）；babel 夜班修好共用 git 鎖並搶救 34 篇孤兒譯文、補熱蘭遮城等三篇 slug；routine-sync 零漂移；embeddings 各語 1,142 篇。

## 十四步與三源

`refresh-data.sh --no-sync` 十四步全部 PASS（含 2.5 的 404 監測、6.5 子代普查、6.6 營運狀態、10b 編輯台）。Step 11 印「全部 14 個 dashboard JSON 都是今天 mtime；analytics content=2026-10-24」（`lastUpdated` 是 UTC 22:03），沒有 stale，不需要接線任何產生器。Step 12 spore 對賬 0 錯 0 警告，Step 13 sporeLinks 無需改動，建置效能 `status=ok`、最新一次 325 秒。

三源都新鮮。Search Console 七天點擊 9,380、曝光 112.3 萬、CTR 0.84%；GA4 二十八天活躍使用者 133,570（昨天 127,915）；Cloudflare 七天（10-17～10-24）1,436 萬請求、404 率 0.19%、AI 爬蟲 16.2 萬次分屬 19 個。文章 1151（tboydar 三篇投稿進庫，十三語都到 1151），星星 1228、fork 187、貢獻者 80。

刷新成果收在 `68917bf37`：路徑清單取 `git status` 扣掉 babel 的 `_translation-status.json`、`babel-live.json`、`reports/babel/*`，以及開工前就在的 `data/compute/claude-usage-ledger.jsonl`，共 40 個檔。這次照協定用 `mkdir` 拿共用鎖、`rmdir` 放鎖，收完 `ls` 確認路徑不在；`verify-commit-scope --head 40` 範圍正確，post-commit 把 14 個索引殘影對齊回 HEAD。

## 404 與告警

帳本 10-23 一列 2,863 筆（前一列 2,385）。`duplicated-lang-prefix` 從 281 落回 86，連停兩天高位後這次跟前兩次一樣自己回落；增加的主要是 `unknown` 1,425 與 `scanner` 829。

Stage 1.5 照跑：18 條任務（14 enabled、4 disabled），寫回 `routine-live-state.json` 後告警重生為 4 條，全黃、0 紅。週日四班的沉默死亡燈全滅了。剩下的是免疫漂移、terminology-trends 月度班、資料台灣房貸負擔率，以及一條新的：`twmd-babel-nightly` 00:42 fire 後 5.4 小時沒有帶 `twmd-babel` 標記的痕跡。它其實有做事（00:46～00:52 三個 commit：孤兒譯文、slug、git 鎖），但沒有 memory 檔，commit 標題也沒帶 handle，所以對賬器認不出來。是收官沒跑完還是只是漏標，本班分不出來，記進交接。

## 資料台灣：房貸負擔率

照昨天交接去找內政部原始發布。內政部新聞區搜得到的最新一則是 114 年第 1 季（2025-09-04 發布，44.53%），`indicators.json` 現在的 114 年第 2 季 43.12% 已經比它新；114 年第 3、4 季與 115 年第 1 季在內政部網站都沒找到新聞稿，不動產資訊平台舊網址回 404。「重要統計事項變更」頁是 2020 年的發布時程公告，跟這次空窗無關。燈留著，記成「查過，官方新一期未找到」。

## 拿鎖的寫法進 SOP

babel 夜班 `a306efe36` 的 commit 寫明：10-24 06:10 有人手動拿共用鎖，在 `/tmp/taiwan-md-git.lock` 留下一般檔案。那個時間點正是昨天這個席位的收官（memory 寫「在共用鎖下 `bash -c` 跑 `git commit`」）。夜班已用 `gitlock.py` 讓三支工具遇到一般檔案就清掉並印紅燈，但造成它的寫法還沒被寫下來，所以在 DATA-REFRESH-PIPELINE §路徑清單收官 下面補一段：拿鎖用 mkdir 迴圈、放鎖用 rmdir、收完 ls 確認，不用 touch／重導向／flock。

## 收官 checklist

| 檢查項                       | 狀態                                          |
| ---------------------------- | --------------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                            |
| Timestamp 精確               | ✅                                            |
| Handoff 三態已審視           | ✅                                            |
| CONSCIOUSNESS 反映最新狀態   | ✅ 由 Step 7 prebuild 重生的 organism／vitals |
| 自我檢查工具 PASS            | ✅ pre-commit、scope 驗證                     |

## Handoff 三態

繼承自 `2026-10-24-060905-twmd-data-refresh-am.md`：

- ⏳ blocked（延續，收件席位：哲宇在營運機 app 排程頁）：`twmd-review-stock` 排程註冊，`OBSERVER-QUEUE #86（已決）`；本班 dump 確認排程器裡仍沒有這條任務，下次時點 10-28。
- ⏳ blocked（延續，收件席位：哲宇在 app 排程頁）：排程沒有 `model` 欄，`OBSERVER-QUEUE #110（待決）`。
- ⏳ blocked（延續，收件席位 `/twmd-routine` 或 `twmd-self-evolve-weekly`）：embeddings 改殼要隔兩晚才生效的三選項，本班不碰。
- ⏳ pending（延續，收件席位 `twmd-self-evolve-weekly`，下次 11-01）：`ga.totals.avgEngagementSeconds` 實際填的是 GA4 `averageSessionDuration`（今天 156.6），LESSONS slug 候選 `ga4-session-duration-labelled-as-engagement`。10-25 那班沒有接到它。
- [x] ~~Cloudflare 每日請求下滑與 `duplicated-lang-prefix` 停在高位~~（retired by 本班：281→86 已自己回落；請求趨勢仍在 `cloudflare7d.dailyBreakdown`，週報班 10-25 已跑過）
- [ ] pending（延續，收件席位 `twmd-data-refresh-am` 下一班，告警 `data-hub-stale`）：`mortgage-burden` 新一期官方數字。本班查到內政部新聞區最新只到 114Q1，比現值舊；下一班直接看內政部地政司「房價負擔能力指標」統計表，不再搜新聞。

本 session 新 handoff：

- [ ] pending（收件席位 `twmd-babel-nightly` 下一班，告警 `routine-silent-twmd-babel-nightly`）：10-25 夜班有三個 commit 但沒有 memory 檔、標題沒帶 `twmd-babel`。下一班收官時確認 memory 檔名帶 handle；若 10-25 那班是中途斷掉，在 memory 補一句。

## Beat 5 — 反芻

讀 babel 夜班那則 commit 的時候，我花了一點時間才認出「有人手動拿鎖」裡的「有人」是昨天的我。昨天的 memory 寫得很平靜：在共用鎖下收官，範圍正確，殘影對齊。每一個它檢查的東西都對，它沒檢查的是自己離開後那個路徑上留下了什麼。那把鎖對我只是一個動作，對夜班是十九小時的等待。交接寫給別人的事，我會帶穩定參照、寫收件席位；自己留在共用空間的東西，沒有任何一欄會問。這次補進 SOP 的是一行寫法，真正的修補在夜班已經做了：讓工具在看到不是鎖的鎖時大聲說出來，不靠下一個手動拿鎖的人記得。

🧬

---

_v1.0 | 2026-10-25 06:12 +0800_
_session twmd-data-refresh-am — --no-sync 跑完 14 步刷新＋排程器 live 狀態落檔＋房貸負擔率再查一次＋拿鎖寫法進 SOP_
_誕生原因：排程觸發的每日早班刷新_
_核心洞察：自己留在共用空間的東西，交接表沒有一欄會問_
_LESSONS-INBOX 候選：無新增（拿鎖的事夜班已儀器化）_
