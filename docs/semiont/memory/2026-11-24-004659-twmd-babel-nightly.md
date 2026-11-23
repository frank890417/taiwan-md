# 2026-11-24-004659-twmd-babel-nightly — 續命班：〈水道頭〉的十五份留底全少同一個右括號，是網址尺的問題

> session twmd-babel-nightly — cron 00:30 觸發（續命型：22:34 起的 dispatcher 還活著）
> Session span: 00:46 → 約 01:30 +0800（1 個工具 commit、1 個收官 commit）
> 資料來源：`git log %ad`、`/tmp/babel-unified-20261123-223414-43048/` 與前三個 run 的 `report.jsonl`／`master.log`、`.babel-quarantine/rejected/`、`babel-preflight.py`、`status.py`

## 觸發

每晚的巴別塔班。BECOME ACK：mode=write，8 器官最低＝免疫 59（快照齡 18 小時，標 stale），Q14 跨 session 連續性 PASS：11-23 產線整天每一兩小時推一批（十二語都有落地）；maintainer 合三件投稿、第六次手補 slug；心跳五班的額度讀數從 100% 跳到 9% 再到 17%，晚班推論是兩台機器各自的讀數；昨晚本席位補上被拒譯文留底，交接要下一班讀〈水道頭〉的樣本。

甦醒檔用 Read 分頁讀到 `wake:END`（11 段全讀，身份段也讀了）。selftest 亮一盞燈：diary 沉默 22 天，本班照 DIARY-PIPELINE Stage 0c routine 預設不寫，反芻放本檔 Beat 5。Write mode 的 LONGINGS 與 ARTICLE-INBOX 本班沒讀；BABEL-VORTEX 讀 §三重巡檢，SQUEEZE 沒重讀。

## 算力與產線狀態

`babel-preflight.py` 判 healthy（3/4 層）。缺席層：codex 登入過期（身份授權，留哲宇）。付費層七把 key 餘額仍是零，Tier 6 Haiku 每次都撞 402。地端 `gemma4:26b` 生成探測 3.5 秒收尾，fleet 只核發 mac-m4max，名單外的 `gemma4:e4b-nvfp4` 仍裝著沒被核發。slug 登記全數到位。弱適配三格：gemma4×ar 12%、nemotron×hi 13%、nemotron×vi 0%；ar 與 vi 兩格已由 `--worker-skip-langs` 切軌，表上是切軌前的殘影（昨晚交接的那條），nemotron×hi 是新出現的一格，還沒切。

Stage 0.5 第一種：續命。存活（dispatcher 43048 由 launchd 在 22:34 用新程式碼重生，跑了兩小時；推送迴圈 57192 在；git 鎖不存在）、生產（近 45 分鐘 report 1 筆；這個 run 兩小時 14 筆，全部失敗）、第二訊號源（fleet 核發與 preflight 一致）。生產那項沒有掛零，佇列只剩硬尾巴：本輪只排得出 11 篇，其餘 stale 被三道既有政策擋住（124 個檔被三件開著的 PR 碰到、二十份人寫的譯文不覆蓋、民調禁止期凍結三對），不是產線卡住。沒有重啟，沒有另開一輪。

## 〈水道頭〉：十五份樣本，同一個缺口

昨晚補的留底生效了。`.babel-quarantine/rejected/` 裡〈水道頭〉有 15 份被拒譯文，橫跨 en／fr／ja／ko／vi／hi／ar 七語、gemma4 與 nemotron 兩種模型，圖說裡那條網址全部長成 `…Beigang_Water_Tower_(Taiwan.jpg`，少的都是同一個右括號。七語兩模型逐字相同，不可能是模型各自犯錯。

母稿圖說是裸網址 `https://commons.wikimedia.org/wiki/File:Beigang_Water_Tower_(Taiwan).jpg`。閘門第 11 檢查的 `URL_PATTERN` 把 `)` 一律當成網址結尾，抽出來是 `…(Taiwan`；URL 裝甲（`translate.py` 的 `tokenize_urls()`）借同一把尺，所以只把 `…(Taiwan` 藏進 `⟦U5⟧`，模型看見的是 `⟦U5⟧).jpg。`，一個落單的右括號，它把括號丟了，還原後就是 `(Taiwan.jpg`，閘門再拿殘缺的母稿網址去比，判網址改寫。兩邊用同一把尺本來是 09-25 那次修補的重點，這次是那把尺本身少認一種形狀。

修法（`7ad3916627`）：

- `verify-translation.py` 把終止字元抽成 `URL_STOP_CHARS` 常數，`URL_PATTERN` 改成交替式，先試一對半形括號、再退回單一字元。網址內成對的 `(…)` 算進網址，沒收尾的 `(` 照舊算網址的一部分，括號外的 `)` 照舊收尾。
- `restore-footnote-urls.py` 原本用切字串的方式從 `URL_PATTERN` 取終止字元，改成直接 import 常數，不然新樣式會讓它切錯。
- 全庫新舊兩把尺比對：2,237 個檔、4,598 個網址多拿回結尾的 `)`，抽出數量沒有一篇改變，沒有其他形狀的差異。zh 母稿裡帶這種裸網址的有 33 篇（Wikimedia 檔名 `_(cropped)`、`_(Taiwan)`，維基條目 `_(啦啦隊)`），〈水道頭〉只是全敗的那一篇，其他篇過關是靠模型剛好保留了那個括號。
- 測試：`tests/test_translate_url_armor.py` 加兩條（〈水道頭〉圖說整條藏進一個 token、括號外的 `)` 仍收尾），既有 22 條全過。

`translate.py` 與 `verify-translation.py` 都由 dispatcher 以子程序呼叫，下一次排到〈水道頭〉就會用新尺，不必重啟。它在七語的佇列裡被排到最尾（累計失敗 ≥8），pt 已記成 cascade exhausted，這兩個狀態不會自己回來，要等下一次排到或手動清帳。

## 查過但沒動的幾族

本 run 其餘 13 次失敗：

- 〈Joeman〉〈愛玉〉vi `tags ASCII`：只有 gemma4 一種模型，閘門判對，同昨晚那一族。
- `currency`：fr〈嘉義農林〉、vi〈新台幣〉（23 處）；`magnitude`：vi／hi〈台灣新冠疫情與疫苗〉。都是模型能力那一族，付費層沒餘額，數字錨定手修本班沒做。
- hi〈Threads在台灣〉`leak`：nemotron 一次，樣本已留底，沒讀。
- `no output written` 五次：一句話蓋住多種原因，昨晚起的交接，本班沒動。

## 各語進度

本班沒有直接落地譯文。對昨晚收官：

| 語言 | fresh | stale | metaStale | missing | fresh 變化 |
| ---- | ----- | ----- | --------- | ------- | ---------- |
| en   | 1191  | 2     | 1         | 0       | +2         |
| ja   | 1188  | 4     | 2         | 0       | +2         |
| ko   | 1186  | 5     | 3         | 0       | +2         |
| es   | 1187  | 5     | 2         | 0       | +1         |
| fr   | 1185  | 6     | 3         | 0       | +2         |
| vi   | 1180  | 12    | 1         | 1       | +2         |
| id   | 1186  | 5     | 3         | 0       | +1         |
| pt   | 1190  | 3     | 1         | 0       | +2         |
| hi   | 1183  | 10    | 1         | 0       | +4         |
| ar   | 1189  | 4     | 1         | 0       | +4         |
| ru   | 1192  | 2     | 0         | 0       | +2         |
| de   | 1161  | 25    | 8         | 0       | +1         |

zh 母稿現在 1194 篇。vi 的 missing 1 是 11-23 合併的〈愛玉〉，其餘十一語都已有譯文；vi 這篇本 run 兩次失敗（Haiku 402、gemma4 `tags ASCII`）。backend（11-23 00:43 起四個 run 合計）：gemma4:26b 50 成功／71 失敗，nemotron 46／41，Haiku 0／6（402）。Stage D 日記：`diary-translation-audit.py` 0 critical。

## Handoff 三態

繼承 `2026-11-23-004334-twmd-babel-nightly`：

- [ ] pending（收件席位：哲宇，經費決定）：付費層七把 key 餘額用完，原樣續傳
- [ ] pending（收件席位：哲宇，身份授權）：這台機器 codex 登入過期，原樣續傳
- [ ] pending（收件席位：設計席位，LESSONS `metadata-stale-bump-assumes-frontmatter-unchanged`）：原樣續傳
- [ ] pending（收件席位：下一班 babel）：`babel-pulse` 常駐沒掛、名人頂替存量、fleet GPU 節點是否刻意關機、量級差十倍的機械改寫、隔離區重放子指令，原樣續傳
- [ ] pending（收件席位：下一班 babel，動得了 `scripts/tools/lang-sync/`）：`no output written` 一句話蓋住多種原因，原樣續傳
- [ ] pending（收件席位：哲宇或語言指南席位，閘門規則）：越南文裡講台灣金額的裸 đồng，原樣續傳
- ~~pending：讀〈水道頭〉留底判定閘門誤判還是模型改網址~~ retired by 本班：兩者都不是，是網址尺不認括號，`7ad3916627`
- [ ] pending（收件席位：下一班 babel）：preflight 弱適配表不扣已切軌的組合，原樣續傳；本班多一格 nemotron×hi 13%（n=38）是真的弱，要不要切軌待下一班看兩日窗口
- ~~pending：推送迴圈被未追蹤檔擋住~~ 本班沒再發生，收官時 ahead 0、behind 0；觀察中，不算 retired

本 session 新 handoff：

- [ ] pending（收件席位：下一班 babel）：確認〈水道頭〉下一次被派到時過了 URL count（report.jsonl 看它的 ok）；過了之後 pt 那筆 cascade exhausted 與七語的「累計失敗 ≥8 排最尾」要清帳，否則它會一直排在佇列尾巴
- [ ] pending（收件席位：下一班 babel）：markdown 連結目標那一支（`_URL_TOKEN_RE` 的 `[^)\s]+`）對 `[x](https://…_(Y))` 同樣會在第一個 `)` 截斷，本班只修了裸網址；母稿裡有沒有這種連結還沒量

## Beat 5 — 反芻

昨晚寫的是「失敗九次沒有一份樣本」，今晚樣本有十五份，答案在第一眼就出來了：每一份都缺同一個字元。讓它看起來像模型問題的，是兩邊用同一把尺這件事本身。九月那次把裝甲跟閘門對齊，是為了讓「藏起來的」跟「要數的」是同一段字，這次它們確實一致，一致地少了一個括號。對齊兩把尺能消掉兩把尺之間的落差，消不掉兩把尺共同的盲點；後者只有拿實物去看才會現形，而實物昨晚之前一直被還原掉。

🧬

---

_v1.0 | 2026-11-24 01:30 +0800_
_session twmd-babel-nightly — 續命班，網址尺認得成對括號，沒有落地譯文_
_誕生原因：cron 00:30 每晚巴別塔班_
_核心洞察：裝甲與閘門共用一把尺，兩者之間不會有落差，但尺本身的缺口會同時出現在兩邊，看起來就像每個模型都犯同一個錯_
_LESSONS-INBOX 候選：`shared-ruler-hides-its-own-gap`（REFLEXES #38 (d) 判讀捷徑的第二層：跨模型同理由失敗，查完閘門還要查閘門與上游共用的那把尺）_
