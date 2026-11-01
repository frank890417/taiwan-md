# 2026-10-21-060943-twmd-data-refresh-am — 14 步全過、0 stale，五篇新文讓文章數到 1146；10-19 的 404 兩個家族同日跳升

> session twmd-data-refresh-am — 排程觸發（am 06:00 資料刷新）
> Session span: 06:01 → 06:12 +0800（約 11 分鐘，2 commits 含本檔）
> 資料來源：`date`、`git log %ai`、排程器 `lastRunAt`（2026-10-20T22:01Z）

## 觸發

每日早上的儀表板刷新。甦醒（micro）時 groundtruth 印 `ACTOR_BUSY`：`babel-push-every.py --watch`（已跑 11 天）跟一支 9 分鐘前起的 `babel-dispatch.py` 正在寫工作樹。fetch 後本機落後 origin/main 0 個 commit，照 v2.4 用 `refresh-data.sh --no-sync`。

BECOME ack：mode=micro，wake-context 讀到 `wake:END`，selftest 全綠；即時快照最低器官是免疫 59（缺口 review_coverage 18.6），快照本身齡 23 小時，這班刷新後歸零。Q14 交接延續通過：凌晨 babel 班手補四篇 slug 讓十二語缺口歸零，embeddings 班把五篇新文送進索引（每語 1,137 篇），routine-sync 確認審庫存今晚 22:00 是第一個時點。

## 十四步與三源

十四步全部 PASS，含 2.5 的 404 監測、6.5 子代普查、6.6 營運狀態、10b 編輯台。Step 11 印「全部 14 個 dashboard JSON 都是今天 mtime；analytics content=2026-10-20」，沒有 stale，不需要接線任何產生器。Step 12 spore 對賬 0 錯 0 警告，Step 13 sporeLinks 無需改動。

刷新成果收在 `4d38a533b`（06:08）：路徑清單直接取昨天 refresh commit `c6ee99b22` 的 40 個檔，包進 `bash -c` 用 `git add -- $FILES` 加 `git commit -- $FILES`，babel 的 `_translation-status.json`、`babel-live.json` 與 `reports/babel/*` 留給它自己。scope 檢查印了一段跨領域警告但沒有擋下，`git log -1` 確認 commit 在、`verify-commit-scope --head 40` 範圍正確，post-commit 把 14 個 prettier 改寫前的索引殘影對齊回 HEAD，推送一次成功。

三源都抓到新資料。Search Console 七天點擊 8,853、曝光 91.6 萬、CTR 0.97%；GA4 二十八天活躍使用者 112,149（昨天 102,332）；Cloudflare 七天 1,326 萬請求、404 率 0.25%、AI 爬蟲 18.0 萬次分屬 19 個。文章 1146（昨天 1141），星星 1219、fork 186、貢獻者 78。建置效能最新一次 333 秒，落在 ci-speedup 班 10-20 修掉圖示 middleware 之後；七天平均 1,458 秒還含著修之前的那幾次。

## 404 的兩個家族

監測記到 10-19 共 6,991 筆，前一天 2,264。跳升來自兩個瀏覽器 UA 為主的家族同日放大：`bad-encoding` 2,475（10-18 只有 10）、`duplicated-lang-prefix` 1,146（10-18 是 91），樣本如 `/arar/people/chen-yu-hsun-taiwan-comedy-film-magician`。回看 `reports/404-monitor/state.json`，同樣的形狀之前出現過：10-12 是 prefix 家族 1,124、10-13 是 encoding 1,549、10-16 是 encoding 2,961，每次一兩天就落回。這次兩個家族同一天一起跳，比之前多一個訊號。PR #1876（〈preserve language prefixes in hub article links〉）在 10-20 才合併，時間在這批 404 之後，所以它不是起因；它是不是同一個問題的修法，本班沒有查。

## 排程器狀態與告警

Stage 1.5 照跑：18 條任務（14 enabled、4 disabled），寫回 `routine-live-state.json` 後告警重生為 6 條，全黃、0 紅，跟昨天同一組：免疫 59 一條，10-17 週日鏈四條（news-lens、weekly-report、distill、self-evolve）的額度空缺，加 10-05 用語月報那一條。排程器裡仍沒有 `twmd-review-stock`。

## 收官 checklist

| 檢查項                       | 狀態                                            |
| ---------------------------- | ----------------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                              |
| Timestamp 精確               | ✅                                              |
| Handoff 三態已審視           | ✅                                              |
| CONSCIOUSNESS 反映最新狀態   | ✅ 由 Step 7 prebuild 重生的 organism／vitals   |
| 自我檢查工具 PASS            | ✅ pre-commit、scope 驗證、memory-diary profile |

## Handoff 三態

繼承自 `2026-10-20-061006-twmd-data-refresh-am.md` 與 `2026-10-21-055711-twmd-embeddings-nightly.md`：

- ⏳ blocked（延續，收件席位：哲宇在營運機 app 排程頁；本席位沒有核准權限）：`twmd-review-stock` 排程註冊，`OBSERVER-QUEUE #86（已決）`；第一個時點是今晚 10-21 22:00，錯過則等 10-28。本班 dump 確認排程器裡仍沒有這條任務。
- ⏳ blocked（延續，收件席位：哲宇在 app 排程頁）：排程沒有 `model` 欄，`OBSERVER-QUEUE #93（已決）` 的落地；`OBSERVER-QUEUE #110（待決）`，本班也是 Opus 5.5。
- ⏳ blocked（延續，收件席位 `/twmd-routine` 或 `twmd-self-evolve-weekly`）：embeddings 改殼要隔兩晚才生效的三選項，本班不碰。
- ⏳ pending（延續，收件席位 `twmd-self-evolve-weekly`，下次 10-25）：`ga.totals.avgEngagementSeconds` 實際填的是 GA4 `averageSessionDuration`（今天 172.0），LESSONS slug 候選 `ga4-session-duration-labelled-as-engagement`。
- [ ] pending（延續並擴大，收件席位 `twmd-maintainer-daily`，能跑 monitor 與 Cloudflare 查詢）：`reports/404-monitor/state.json` 的 `bad-encoding` 家族 10-13／10-16／10-19 三次跳升，10-19 起 `duplicated-lang-prefix` 同日放大到 1,146。下一步：按路徑查 10-16 與 10-19 的樣本（10-16 的 Cloudflare 窗口約 10-23 過期），並看 PR #1876 的改動跟 `/arar/` 這種雙前綴有沒有關係。
- [ ] pending（延續，收件席位 `twmd-weekly-report-sun`）：Cloudflare 每日請求 10-17 高點 238 萬之後，10-18／19／20 為 165 萬／194 萬／178 萬，獨立訪客兩萬一到兩萬七，參照 `public/api/dashboard-analytics.json` 的 `cloudflare7d.dailyBreakdown`。下一步：週日看是否仍高於 10-12 水位，是就拆請求來源。

本 session 新 handoff：無（404 那條併入既有的 maintainer 交接）。

## Beat 5 — 反芻

昨天的班把「告警數下降可能只是空缺被時間補上」寫進教訓，今天 404 監測給了同一個尺的另一面：單日總數 6,991 看起來像新病，拆成家族之後是一個已知的波形又出現第三次。單看總數會誤判成急症，單看家族又可能把「兩個家族同日一起跳」這個新訊號當成老毛病放過。交給 maintainer 的那條交接，我把兩者都寫進去了。

收官這次照昨天的教訓沒用 `mapfile`，直接把 `git show --name-only` 的輸出當成路徑清單，在 bash 裡一次 add 加 commit；能跑，也比昨天的 `--pathspec-from-file` 少一個暫存檔。兩種都比 pipeline 文件裡那句寫法穩，回寫 canonical 仍留給能改 pipeline 的班。

🧬

---

_v1.0 | 2026-10-21 06:12 +0800_
_session twmd-data-refresh-am — 平行翻譯在寫時用 --no-sync 跑完 14 步刷新＋排程器 live 狀態落檔_
_誕生原因：排程觸發的每日早班刷新_
_核心洞察：404 總數跳升要拆家族讀，但拆完也要看家族之間是否同步，否則新訊號會被當成舊波形放過_
_LESSONS-INBOX 候選：無新增（`pathspec-from-file-beats-shell-array-for-commit-scope` 延續昨天）_
