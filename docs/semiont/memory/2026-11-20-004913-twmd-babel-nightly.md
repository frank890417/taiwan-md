# 2026-11-20-004913-twmd-babel-nightly — 續命班：〈擎天崗〉十二語卡在一行空行，對齊工具改成跟 status.py 同一把尺

> session twmd-babel-nightly — cron 00:30 觸發（續命型：11-18 00:46 起的 dispatcher 還活著）
> Session span: 約 00:31 → 00:55 +0800（1 個工具＋譯文 commit、1 個收官 commit）
> 資料來源：`git log %ad`、`/tmp/babel-unified-20261118-004614-39953/report.jsonl`、`babel-preflight.py`、`status.py`、`babel-pulse.py`

## 觸發

每晚的巴別塔班。BECOME ACK：mode=write，8 器官最低＝免疫 59（快照齡 18 小時，標 stale），Q14 跨 session 連續性 PASS：11-19 整天 babel 產線約每 20 分鐘一批十二語 commit，下午到晚上哲宇在場合了首頁與關於頁的進化 PR（#2031〜#2040），maintainer 合四件投稿；五條週班 11-14/15 沉默死亡，下次排程 11-22。甦醒檔用 Read 分頁讀；groundtruth 段的 48 小時 commit 清單裡「babel: xx 批次」那幾百行是篩掉後讀的，其餘讀到 `wake:END`。selftest 唯一的燈是 diary 沉默 18 天。LONGINGS、ARTICLE-INBOX 本班沒讀，SQUEEZE 沒讀，BABEL-VORTEX 讀 §三重巡檢。

## 算力與產線狀態

`babel-preflight.py` 判 healthy（3/4 層）。缺席層：codex 登入過期（身份授權，留哲宇）。付費層七把 key 餘額仍是零，Haiku 三條 lane 累計 0 成功 13 失敗。地端 `gemma4:26b` 生成探測 14.4 秒收尾；fleet 只核發 mac-m4max，pulse 的 endpoint 探活三台筆電／桌機（4090／5090／3090）都是紅的。

Stage 0.5 第一種：續命。三重巡檢加第四問都過：存活（dispatcher 39953 跑了兩天、推送迴圈 57192 在，兩支都由 launchd `com.taiwanmd.babel.*` 拉著）、生產（pulse rate 31.8〜32.5 篇／小時，近 45 分鐘 report 只有 5 筆，是在跑長篇與 62 條腳註的〈笠詩社〉；最近一批 commit 00:33）、第二訊號源（fleet 核發與 preflight 一致）。沒有重啟，沒有另開一輪。

## 一篇母稿十二語都敗，敗在一行空行

拆 report 找「同一篇跨多模型同理由」：〈擎天崗〉在十二語、兩個模型（gemma 4 語、nemotron 8 語）全敗在 `verify=1 [URL count]`。母稿 78 個網址，既有十二份譯文的網址組合跟母稿逐一相同，問題不在譯文。

status 判這十二份是 metadata-stale（trailer-only-drift）。11-17 補查證標記的 commit（`be13f0452`）在這篇 frontmatter 後多插了一行空行；status.py 的 bodyHash 不計頭尾空白，判它只差 metadata，昨晚的 `bump-source-sha.py --curation-only` 卻逐字比正文，判不收。兩把尺不同調，它就掉進整篇重翻，重翻的長文兩個模型都會漏網址，於是每輪敗一次、永遠排不出去。全庫同形狀 18 份（〈擎天崗〉12、〈電競〉2、〈林爽文事件〉2、〈台灣人工生殖〉1、〈金城武〉1）。

修法（`1e4650b9d`）：curation-only 比正文前先 `strip()`，只剝頭尾，正文中間差一個字照樣不收。dry-run 列出剛好這 18 份，apply 後逐份跑 `verify-translation.py` 全部 0 fails，pre-commit 的 article-health 18/18 hard=0，在共用 git 鎖底下精確路徑 commit，`verify-commit-scope.sh --head 19` OK。

其餘多模型失敗都只有兩個模型、語言分散（〈鱔魚意麵〉〈鄉土文學論戰〉〈半導體產業〉多為 no output，是長篇），不構成閘門缺陷，照常交產線與委派層。

## pulse 三族存量

截斷 26、網址不符 205、名人頂替 176。查 10-09 的 babel-live 快照是 0／563／180，昨晚 26／258／179：網址不符一路往下、名人頂替緩降，沒有產線繞過閘門的跡象。本班沒動存量。名人頂替 vi 佔 59（`dalongdong` 河內 66 處），值得一班專門處理。

## 各語進度

| 語言 | fresh 起 → 收 | metaStale 起 → 收 | stale | missing |
| ---- | ------------- | ----------------- | ----- | ------- |
| en   | 1165 → 1167   | 7 → 5             | 14    | 5       |
| ja   | 1172 → 1174   | 4 → 2             | 9     | 6       |
| ko   | 1173 → 1174   | 5 → 4             | 7     | 6       |
| es   | 1166 → 1167   | 6 → 5             | 14    | 5       |
| fr   | 1173 → 1174   | 4 → 3             | 8     | 6       |
| vi   | 1142 → 1146   | 10 → 6            | 29    | 10      |
| id   | 1157 → 1158   | 7 → 6             | 21    | 6       |
| pt   | 1170 → 1171   | 6 → 5             | 10    | 5       |
| hi   | 1136 → 1137   | 9 → 8             | 33    | 13      |
| ar   | 1155 → 1157   | 9 → 8             | 17    | 9       |
| ru   | 1180 → 1181   | 1 → 0             | 4     | 6       |
| de   | 1141 → 1144   | 13 → 10           | 30    | 7       |

pulse gap 362 → 342（上一筆快照 11-19 01:26 是 1,102，這一天產線降了 740）。backend：本班 bump 零模型呼叫；dispatcher 累計 gemma4 1,322 成功／80 失敗、nemotron 721／102、Haiku 0／13。Stage D 日記 babel 本班沒查。

## 收官 checklist

| 檢查項                       | 狀態                                                       |
| ---------------------------- | ---------------------------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                                         |
| Timestamp 精確               | ✅（起點約略）                                             |
| Handoff 三態已審視           | ✅                                                         |
| CONSCIOUSNESS 反映最新狀態   | ❌ 本班不碰                                                |
| 甦醒讀滿                     | ⚠️ groundtruth 的 babel 批次 commit 行篩掉讀；SQUEEZE 沒讀 |
| diary                        | ➖ 本班沒有超出行動的反芻，不寫（selftest 燈照實留著）     |

## Handoff 三態

繼承 `2026-11-19-012820-twmd-babel-nightly`：

- [ ] pending（收件席位：哲宇，經費決定）：付費層七把 key 餘額用完，儲值或刪 `~/.config/taiwan-md/babel-extra-workers`，原樣續傳
- [ ] pending（收件席位：哲宇，身份授權）：這台機器 codex 登入過期，要重新 `codex login`，原樣續傳
- [ ] pending（收件席位：設計席位，LESSONS `metadata-stale-bump-assumes-frontmatter-unchanged`）：一般同步集要不要收查證標記兩欄，原樣續傳
- [ ] pending（收件席位：下一班 babel）：`babel-pulse` 常駐沒掛，原樣續傳
- ~~pending：剩約 400 份 metadata-stale、600 份 stale、100 份 missing 交產線~~ retired by 本班：產線一天消化到 metaStale 62、stale 196、missing 84

繼承 `2026-11-19-203829-manual`：#2030 交 maintainer、#2033／#2036／#2038 等哲宇、週班 11-22 起看是否恢復，原樣續傳（不在本班範圍）。

本 session 新 handoff：

- [ ] pending（收件席位：下一班 babel）：名人頂替存量 176，vi 59 篇最多（`vi/Geography/dalongdong.md` 河內 66 處），挑一班整語清
- [ ] pending（收件席位：下一班 babel）：fleet 三台 GPU 節點（4090／5090／3090）探活全紅，只剩 mac-m4max 一條地端 lane；要不要喚醒是機器層的事，先確認是不是哲宇刻意關的
- [ ] pending（收件席位：下一班 babel）：push-every 有門檻才推，收官時 ahead 6，下一班先看有沒有推出去

## Beat 5 — 反芻

昨晚造的那把尺跟 status.py 量同一件事，只差在要不要先剝空白。差一行空行就讓一篇長文在十二語每輪重翻、每輪失敗，log 上看起來是兩個模型的網址能力不夠。真正的問題是新尺上線時沒有拿現成的那把對一次讀數。
