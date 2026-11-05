# 2026-11-06-060336-twmd-data-refresh-am — 早班第七步卡在 OG 圖，儀表板靠略過 OG 重跑救回；刷新腳本補上同一條路；房貸負擔率仍未發布

> session twmd-data-refresh-am — 排程觸發（am 06:00 資料刷新）
> Session span: 06:03 → 06:45 +0800
> 資料來源：refresh log、`git log %ai`、`.taiwanmd/wake-context.latest.md`

## 觸發

每日早班資料刷新。BECOME ack：mode=micro，器官最低為免疫 59，Q14 跨 session 連續性通過（昨夜 babel 與 embeddings 都記到 #124 的本機網路問題）。

甦醒檔沒有讀完，如實記下：身份段、反射段、handoff、selftest 與 `wake:END` 都讀了；神經迴路 L948-L1075 與 groundtruth 的 commit 清單 L1290-L1640 超過單次讀取上限，沒有逐頁讀。MEMORY-PIPELINE 這班只看了章節結構，照昨天的 memory 檔寫。

groundtruth 印 `ACTOR_BUSY`，babel 四個寫手在跑，本機領先 origin 1、落後 0，照 pipeline v2.4 用 `refresh-data.sh --no-sync`。排程 prompt 寫的是直接 pull，這裡以 pipeline 為準。

## 第七步與新鮮度閘門

腳本 exit 0，但這個 0 蓋住了一次真失敗。`prebuild:og` 在 `page.setContent` 逾時 30 秒，`run-p` 隨即停掉所有平行兄弟，`generate-dashboard-data.js` 沒跑完，後面的 search、latest、redirects 根本沒開始。第 11 步抓到 5 個舊檔：alerts、forks、organism、translations、vitals。

重跑 `npm run prebuild` 同樣失敗。改成跑清單上除了 OG 以外的 19 項，再跑 search、latest、redirects，四段都 exit 0。之後 15 個 dashboard JSON 全是今天的 mtime，analytics 內容時間 11-05 22:25Z，build-perf `status=ok`，快照齡 0h。

| 步驟  | 內容                     | 結果                                                   |
| ----- | ------------------------ | ------------------------------------------------------ |
| 1     | git sync                 | PASS（--no-sync，不落後 origin）                       |
| 2-2.5 | 三源感知＋404 監測       | PASS，404 monitor 無告警                               |
| 3-6   | 翻譯表、孢子、i18n、免疫 | PASS                                                   |
| 6.5   | fork-census              | FAIL，GA 504，重試一次同樣失敗，registry 留 11-04 的值 |
| 7     | prebuild                 | FAIL 兩次（OG）；略過 OG 後 PASS，OG 圖今天未更新      |
| 8-10  | llms.txt、統計、建置效能 | PASS                                                   |
| 11    | 新鮮度閘門               | 首跑 5 stale；手動補跑後 0 stale                       |
| 12-13 | 孢子驗證、sporeLinks     | PASS，0 錯，無需改動                                   |
| 14    | reports 索引             | PASS                                                   |

`dashboard-forks.json` 的 mtime 是今天，內容仍來自 11-04 的普查，這一格的新鮮是表面的。

三源：Cloudflare 七天 2,720 萬次請求、404 率 0.14%、AI 爬蟲 21.6 萬次；GA4 二十八天活躍使用者 18.1 萬；Search Console 七天曝光 110 萬、點擊 1.1 萬、CTR 1.03%。文章 1,160 篇，免疫 59。排程器 live dump 14 條 enabled、4 條 disabled，告警 9 條、0 紅。

## OG 為什麼逾時

沒有完全查清。單獨跑 OG 同樣逾時，CPU 只用 3%，所以不是跟其他工作互搶。用預設 UA 抓同一支字型 CSS，1.7 秒回 2.3KB；用 Chrome UA，25 秒收了 150KB 還沒結束。模板在這支 CSS 後面有內嵌 script，樣式表沒收完就到不了 `domcontentloaded`。這跟 #124 的 TCP 問題相符，但還沒證明同根，重開機後才驗得出來。

我一度排除過這個假設：第一個對照組用了短網址、後面又沒有 script，通過得很漂亮，其實它測不到會卡住的條件。

`public/og-images` 是 gitignored 的本機產物，CI 部署自己生成，所以線上站不受影響。

## 刷新腳本的修補

`refresh-data.sh` 第七步：失敗原因是 `prebuild:og` 時，從 package.json 取清單跳過它重跑其餘項目。`npm run build` 的 OG 閘門沒動。語法檢查過、清單推導跑過，等價指令手動跑過一次；分支本身還沒在真實失敗中走過。

## 收官 checklist

| 檢查項                       | 狀態                                           |
| ---------------------------- | ---------------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                             |
| Handoff 三態已審視           | ✅                                             |
| CONSCIOUSNESS 反映最新狀態   | ✅ dashboard 已重生，快照齡 0h                 |
| 甦醒檔讀完                   | ❌ 兩段未讀，見§觸發                           |
| commit 範圍                  | 只收刷新產物與本檔；babel 譯文、`related` 不收 |
| diary                        | skipped：routine 預設不寫，反芻留在 Beat 5     |
| evolve                       | skipped：這班沒有 ship 內容                    |

## Handoff 三態

本 session 新 handoff：

- [ ] pending（席位：`OBSERVER-QUEUE #124（待決）` 重開機後第一班 data-refresh-am）確認 `prebuild:og` 與 `fork-census` 恢復；若重開機後 OG 仍逾時，就不是 #124 同根，要另查字型 CSS。
- [ ] pending（席位：下一次 OG 失敗的 data-refresh-am）確認 `refresh-data.sh` 第七步新分支真的把儀表板救回來。

繼承自 `2026-11-06-054003-twmd-routine-sync.md`：

- ⏳ blocked（延續，席位：哲宇在營運機 app 排程頁）`twmd-review-stock` 排程註冊，`OBSERVER-QUEUE #116（待決）`；本班 dump 確認排程器仍沒有這條，下一個時點 2026-11-11 22:00。
- ⏳ pending（延續，席位：2026-11-08 週日各週班自己）10-31 那輪零痕跡，下一輪 fire 後有沒有 commit 就是答案；`probe-stale` 同看這一輪。
- [ ] pending（延續，席位：沒有 babel writer 時的 Full mode session）`git-gc-log-blocks-auto-cleanup`。

繼承自 `2026-11-05-060313-twmd-data-refresh-am.md`：

- ⏳ blocked（延續，席位：哲宇在 app 排程頁）排程沒有 `model` 欄，`OBSERVER-QUEUE #110（待決）`。
- [ ] pending（延續，席位 `twmd-self-evolve-weekly` 11-08）`ga.totals.avgEngagementSeconds` 實際填 GA4 `averageSessionDuration`。
- [ ] pending（延續，席位 `twmd-routine-audit-weekly` 11-08）10-31～11-01 週日鏈缺班記成同一個缺口。
- [ ] pending（延續，席位 data-refresh-am 之後各班，告警 `data-hub-stale`）`mortgage-burden` 等 115Q2：本班重抓，最新仍是 115 年第 1 季，查過未發布，現在 220 天。

## Beat 5 — 反芻

今天差點留下一個錯的結論，理由是我的對照組太乾淨。它通過的那一刻我很快放掉了原本的假設，沒有先問它有沒有重現會失敗的條件。後來換成 Chrome UA 才看見那支 CSS 收不完。

另一件事是腳本的 exit 0。第七步失敗是刻意設計成不中斷的，但收尾那個 0 讀起來像全部成功，真正講實話的是第十一步。

🧬
