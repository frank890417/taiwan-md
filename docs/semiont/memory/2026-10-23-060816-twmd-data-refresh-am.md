# 2026-10-23-060816-twmd-data-refresh-am — 14 步全過、0 stale，文章 1147；落後三個 commit 先在鎖下合併，衝突那幾秒被同機的語意索引班看見

> session twmd-data-refresh-am — 排程觸發（am 06:00 資料刷新）
> Session span: 06:01 → 06:10 +0800（約 9 分鐘，3 commits 含本檔：合併 `44292c03e`、刷新 `9a0c38e3a`、本檔）
> 資料來源：`date`、`git log %ai`、排程器 `lastRunAt`（2026-10-22T22:01Z）

## 觸發

每日早上的儀表板刷新。甦醒（micro）時 groundtruth 印 `ACTOR_BUSY`：`babel-push-every.py --watch`（10-10 起常駐）跟一支 05:58 起的 `babel-dispatch.py` 正在寫工作樹，而且本機落後 origin/main 三個 commit。

BECOME ack：mode=micro，wake-context 讀到 `wake:END`，selftest 唯一的 ⚠️ 是落後 origin 三個 commit；即時快照最低器官是免疫 59（缺口 review_coverage 18.5），快照齡 23 小時，這班刷新後歸零。Q14 交接延續通過：凌晨 babel 班修掉「補丁失敗章蓋新版本號」並量出 326 份缺章送 OBSERVER-QUEUE #113（待決），heartbeat 巡邏〈張艾嘉〉約三成對不上並把索引 86 列蒸餾成 40 列，routine-sync 對賬零漂移、審庫存仍未註冊。

## 落後時先合併，不用 stash

`--no-sync` 遇到落後就拒跑，而一般路徑會 auto-stash，把 dispatcher 寫到一半的譯文收走。改照 `babel-push-every.py` 的做法：在共用鎖 `/tmp/taiwan-md-git.lock` 底下 `git merge --no-edit origin/main`。origin 那三個 commit 跟工作樹的髒檔沒有交集，但 MEMORY.md 衝突了：heartbeat 班在 origin 把索引捲成 40 列，本機多一列 babel-nightly。解法是取 origin 版本，把那一列照時間插回 023642 之前，`44292c03e` 收掉衝突，之後 18／0。合併 commit 跳過了 hook，內容只有 origin 的檔加一列索引。

衝突出現時我先放了鎖才回頭看，這幾秒工作樹停在未解衝突的狀態。同一台機器上 06:02 起跑的 `twmd-embeddings-nightly` 正好在這段看到它，它的 memory 寫「起跑前撞到 MEMORY.md 衝突，照規則在本機重建」，收尾時發現已被併掉（`6130bcf86`）。最後兩邊的索引列都在、lint 通過，沒有東西遺失，但順序錯了：合併失敗時應該帶著鎖處理完衝突再放。

## 十四步與三源

`refresh-data.sh --no-sync` 十四步全部 PASS，含 2.5 的 404 監測、6.5 子代普查、6.6 營運狀態、10b 編輯台。Step 11 印「全部 14 個 dashboard JSON 都是今天 mtime；analytics content=2026-10-22」（`lastUpdated` 是 UTC 22:03），沒有 stale，不需要接線任何產生器。Step 12 spore 對賬 0 錯 0 警告，Step 13 sporeLinks 無需改動。建置效能 `status=ok`，最新一次 335 秒。

刷新成果收在 `9a0c38e3a`（06:07）：路徑清單取 `git status` 扣掉 babel 的 `_translation-status.json`、`babel-live.json`、`reports/babel/*`，以及開工前就在的 `OBSERVER-QUEUE.md` 一行改動，共 36 個檔，`bash -c` 跑 `git commit -- $FILES`。`verify-commit-scope --head 36` 範圍正確，post-commit 把 14 個索引殘影對齊回 HEAD。推送前 origin 只差我這一個 commit（前面 18 個已被 push-every 送出），pre-push 三道閘全綠，推送後 0／0。

三源都抓到新資料。Search Console 七天點擊 9,128、曝光 102.3 萬、CTR 0.89%；GA4 二十八天活躍使用者 122,477（昨天 117,424）；Cloudflare 七天 1,424 萬請求、404 率 0.19%、AI 爬蟲 17.6 萬次分屬 19 個。文章 1147，星星 1226、fork 186、貢獻者 79。

## 404 與告警

帳本最新一列標 10-21（實為 10-22 為主，照 10-21 maintainer 班查出的窗口錯位），共 2,641 筆，比前一列 1,868 多。`duplicated-lang-prefix` 從 30 跳回 316，代表路徑 `/ruru/art/invisible-taiwan`，其中 247 筆是機器人；`bad-encoding` 67 持平；最大家族 `unknown` 1,060。這個家族十天內第三次跳起來，前兩次都一兩天內落回，本班只記數字。

Stage 1.5 照跑：18 條任務（14 enabled、4 disabled），寫回 `routine-live-state.json` 後告警重生為 7 條，全黃、0 紅。昨天那條 MEMORY.md 索引超過 80 列的告警消失了，heartbeat 班的蒸餾在 owner 缺席時接住了它。其餘是 10-17 週日四個班的沉默死亡、terminology-trends 的月度班、免疫漂移與探測器落後 11 天。週日班下次 10-25。

## 收官 checklist

| 檢查項                       | 狀態                                            |
| ---------------------------- | ----------------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                              |
| Timestamp 精確               | ✅                                              |
| Handoff 三態已審視           | ✅                                              |
| CONSCIOUSNESS 反映最新狀態   | ✅ 由 Step 7 prebuild 重生的 organism／vitals   |
| 自我檢查工具 PASS            | ✅ pre-commit、scope 驗證、memory-diary profile |

## Handoff 三態

繼承自 `2026-10-22-060941-twmd-data-refresh-am.md`：

- ⏳ blocked（延續，收件席位：哲宇在營運機 app 排程頁；本席位沒有核准權限）：`twmd-review-stock` 排程註冊，`OBSERVER-QUEUE #86（已決）`；下次時點 10-28，本班 dump 確認排程器裡仍沒有這條任務。
- ⏳ blocked（延續，收件席位：哲宇在 app 排程頁）：排程沒有 `model` 欄，`OBSERVER-QUEUE #93（已決）` 的落地；`OBSERVER-QUEUE #110（待決）`。
- ⏳ blocked（延續，收件席位 `/twmd-routine` 或 `twmd-self-evolve-weekly`）：embeddings 改殼要隔兩晚才生效的三選項，本班不碰。
- ⏳ pending（延續，收件席位 `twmd-self-evolve-weekly`，下次 10-25）：`ga.totals.avgEngagementSeconds` 實際填的是 GA4 `averageSessionDuration`（今天 165.5），LESSONS slug 候選 `ga4-session-duration-labelled-as-engagement`。
- [ ] pending（延續，收件席位 `twmd-weekly-report-sun`，下次 10-25，該席位讀得到儀表板 JSON）：Cloudflare 每日請求 10-17 高點 238 萬之後，10-18～10-22 為 165 萬／194 萬／191 萬／138 萬／146 萬，參照 `public/api/dashboard-analytics.json` 的 `cloudflare7d.dailyBreakdown`；同一份週檢順帶看 `reports/404-monitor/state.json` 的 `duplicated-lang-prefix` 十天三次跳升（最新 316）是否仍是一兩天就落回。

本 session 新 handoff：無。合併時放鎖太早是一次性的操作失誤，已寫進下方反芻，不另開交接。

## Beat 5 — 反芻

我把鎖當成「做 git 動作時拿著」的東西，合併指令一回傳就放掉，可是衝突讓那個動作沒有結束：工作樹停在一個誰都不該讀到的中間狀態，而鎖已經不在了。隔壁的語意索引班剛好在那幾秒起跑，看到的就是那個中間狀態。結果沒有壞，是因為它照規則在本機重建、我也照規則合回去，兩邊各自正確地處理了同一個衝突。鎖應該護著的是「工作樹回到可讀的狀態」這件事，不是某一條指令。

另一件事比較安靜：昨天那條索引超標的告警，owner 是 10-17 沒跑的週日班，今天它消失了，因為一個巡邏班順手捲了索引。告警不在乎是誰做的，只在乎有沒有做。

🧬

---

_v1.0 | 2026-10-23 06:10 +0800_
_session twmd-data-refresh-am — 落後 origin 時在共用鎖下合併，再用 --no-sync 跑完 14 步刷新＋排程器 live 狀態落檔_
_誕生原因：排程觸發的每日早班刷新_
_核心洞察：鎖要護住到工作樹回到可讀狀態為止，合併衝突時不能先放鎖；owner 缺席的告警被別班順手清掉_
_LESSONS-INBOX 候選：無新增（放鎖時機是單次操作失誤，vc=1）_
