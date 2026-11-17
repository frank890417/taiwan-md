# 2026-11-18-011609-twmd-babel-nightly — 新啟動班：換機器後產線與推送都沒掛上，重掛兩支並修好餘額用盡的判斷

> session twmd-babel-nightly — cron 00:30 觸發（新啟動型：沒有 dispatcher 在跑）
> Session span: 約 00:35 → 01:25 +0800（1 個工具 commit）
> 資料來源：`git log %ai`、`/tmp/babel-launchd.out`、`babel-preflight.py`、`status.py`

## 觸發

每晚的巴別塔班。BECOME ACK：mode=write，8 器官最低＝免疫 59（快照齡 258 小時，標 stale），Q14 跨 session 連續性 PASS：營運機離線九天後 11-17 07:43 恢復，11-16 晚與 11-17 早兩個手動班清掉積壓 PR，上一筆 babel commit 停在 11-08。甦醒檔用 Read 分頁讀到 `wake:END`；selftest 唯一一盞燈是 diary 沉默 16 天。LONGINGS 只掃標題，SQUEEZE 全檔未讀，BABEL-VORTEX 讀 §三重巡檢與推送迴圈段。

## 算力與產線狀態

`babel-preflight.py` 判 healthy（3/4 層）。缺席層：codex 登入過期（身份授權，留哲宇）；付費層七把 key 只剩幾美分，Haiku 實質缺席。地端 `gemma4:26b` 生成探測 18.9 秒收尾，11-07 那班 60 秒無回應的情況這次沒出現。fleet 只核發 mac-m4max 一條 lane，另外三台 GPU 節點離線。

主機名是 Exhibitions-Mac-mini，`launchctl list` 裡沒有 `com.taiwanmd.babel.nightly`，也沒有 `com.taiwanmd.babel.push-every`。兩支都是 `launchctl submit` 掛的，重開機就消失，於是這班是 Stage 0.5 的第三種：新啟動。照 wrapper 檔頭的指令重掛 dispatcher（PID 39953），隨後發現推送迴圈也不在，照 `babel-push-every.py` 檔頭重掛（PID 57192）。少了推送那一支，dispatcher 每 10 篇 commit 的東西會只留在這台機器上，跟 09-25 那 25 小時同一種空窗。

三重巡檢：存活（PID 在、main 與 origin 同步）、生產（前 45 分鐘 2 篇整篇、10 份補丁）、第二訊號源（fleet 核發與 preflight 一致）三項都過。選罷法禁止期的三篇（沈伯洋、蔣萬安、陳致中）由 `config/babel-hold.tsv` 自動跳過，今天 00:00 起生效。

## 餘額用盡的判斷看不見字樣

起跑後三個 Haiku worker 每輪先搶 P0 缺檔，2〜4 秒失敗，log 寫 rate-limited。直接打一次 32,000 max_tokens 的請求，七把 key 都回 402「requires more credits」。dispatcher 早有 10-22 寫的餘額用盡處理，字樣清單裡就有這句，卻一次都沒觸發：`translate.py` 把失敗原因截在 120 字，cascade 前綴吃掉約 85 字，字樣落在後面。較短的容量字樣剛好擠進 120 字內，所以這些失敗沒記進文章的帳，損失只在每輪浪費三個槽位。放寬到 400 字（`7dd6d62da`），離線用真實錯誤形狀驗過字樣留得住；本班結束前 Haiku 沒有再被派到，線上還沒親眼看到 💳 那行。

## metadata-stale 為什麼一夜暴增

十二語各約 480 篇 metadata-stale，來源是 11-17 給 511 篇未審舊文補「🌱 進化中・待查證」的 `curation`／`curationReason` 兩欄。dispatcher 的補丁路徑會把兩欄抄進譯文，確認過 en〈NVIDIA 在台灣〉。整批 Tier 0b bump 卻不會，同步集只有卡片圖四欄與 featured，那樣十二語會變 fresh 而沒有標籤。所以本班沒有走零成本 bump，讓補丁路徑慢慢消化；同步集要不要加這兩欄有方向性問題，寫進 LESSONS 留給設計席位。

## 各語進度

收工時（01:16）每語 fresh 604〜634、stale 49〜67、metaStale 472〜487、missing 27〜28，覆蓋率 97.6〜97.7%。起跑前同口徑 fresh 603〜633，本班 delta 約每語 +1〜3，大宗消化要靠接下來幾天的常駐產線。backend：nemotron（雲端免費）2 篇、本機 ollama 2 篇整篇，其餘是補丁；Haiku 0。Stage D 日記 babel 本班沒查。

## 收官 checklist

| 檢查項                       | 狀態                                      |
| ---------------------------- | ----------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                        |
| Timestamp 精確               | ✅（起點約略）                            |
| Handoff 三態已審視           | ✅                                        |
| CONSCIOUSNESS 反映最新狀態   | ❌ 本班不碰，babel 產線不寫 CONSCIOUSNESS |
| 甦醒讀滿                     | ⚠️ 甦醒檔讀滿；SQUEEZE 全檔未讀           |

## Handoff 三態

繼承 `2026-11-17-203533-manual`：

- [ ] pending（收件席位 `twmd-maintainer-daily`）：#2019、#2020 兩件 tboydar 新文章，原樣續傳
- [ ] pending（收件席位：下一個非 routine 班）：diary 沉默 16 天。本班照 DIARY-PIPELINE routine 預設 skip，沒有補寫
- [ ] pending（收件席位 `twmd-distill-weekly`）：MEMORY.md 索引 inline 超過 80 列，rollup 未跑，原樣續傳
- [ ] pending（收件席位：下一班）：額度重置在今天 19:59（台北），本班沒有讀額度，下一班先讀

本 session 新 handoff：

- [ ] pending（收件席位：下一班 babel）：看 `/tmp/babel-launchd.out` 有沒有出現 `💳 tier6 帳戶餘額用盡`，確認 `7dd6d62da` 在線上生效；沒有就查 Haiku 是不是在冷卻中沒被派到
- [ ] pending（收件席位：哲宇，經費決定）：付費層七把 key 餘額只夠 4,000 tokens 左右。要儲值或刪 `~/.config/taiwan-md/babel-extra-workers` 回純免費產線
- [ ] pending（收件席位：設計席位／Full mode，LESSONS `metadata-stale-bump-assumes-frontmatter-unchanged`）：Tier 0b 同步集要不要收 `curation` 兩欄，需要「只往保守方向抄」的規則；在那之前不要對這批 480 篇跑整批 bump
- [ ] pending（收件席位：下一班 babel）：`babel-pulse` 常駐也沒掛，本班沒重掛；三支 launchd 工作重開機都會消失，值得做一支開機自檢

## Beat 5 — 反芻

換機器那天，譯文產線、推送迴圈、儀器三支常駐一起不見了，九天裡沒有一盞燈為它們亮過：產線不在時不會產出失敗紀錄，只會什麼都沒有。這班如果只照字面跑「有 dispatcher 嗎？沒有就啟動」，推送那支會繼續缺席，譯文 commit 了卻不上站。要先問的是一套東西該有哪幾個零件，再一個個點名，而不是看到主程式在跑就算完整。

🧬

---

_v1.0 | 2026-11-18 01:25 +0800_
_session twmd-babel-nightly — 新啟動班（換機器後 launchd 工作全部消失）_
_誕生原因：營運機換機器後 babel 產線與推送迴圈都沒有掛著_
_核心洞察：常駐工作是一組，只確認主程式會漏掉陪跑的推送；失敗訊息截斷的長度就是下游判斷的射程_
_LESSONS-INBOX：`classifier-marker-cut-by-upstream-print-truncation`（新）、`metadata-stale-bump-assumes-frontmatter-unchanged`（+1）_
