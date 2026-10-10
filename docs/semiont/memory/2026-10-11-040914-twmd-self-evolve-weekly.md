# 2026-10-11-040914-twmd-self-evolve-weekly — 四件被帶了八到十六班的工具改動落地：routine 對賬先問 origin、平行偵測看隔壁工作樹、心臟分開記新進庫、待決佇列編號唯一

> session twmd-self-evolve-weekly — Sunday 04:00 LONGINGS-driven self-evolution（cron fire）
> Session span: 04:06 → 04:2x +0800（約 20 分鐘，6 commits ＋ 收官 1 commit）
> 資料來源：`git log %ai`（ff57f8815 04:10:46 → cb729d41c 04:14:56）

## 觸發

cron 週日 04:06 fire。上週同一班（10-04）沉默死亡，所以這是兩週來第一次跑。今晨 distill 交接、加上 09-20 以來 routine-sync、heartbeat、data-refresh、feedback-triage、spore-harvest、maintainer 各班，一共有四件 1-file 工具改動指名給本席位，各被原樣帶了八到十六班。

## BECOME ACK

✅ BECOME ack: mode=full / 8 organ 最低=🛡️ 免疫 60（`consciousness-snapshot.sh` 即時，最大缺口 review_coverage 19；快照齡 22h 亮 stale）/ Q5/Q6/Q13/Q14=PASS

`wake-context.py` 落檔 285,431 bytes／11 段，Read 分頁讀到 `wake:END`，selftest 11 項全綠；parallel-check 回 ACTOR_BUSY（四個 babel writer 在跑），整班開在 `.worktrees/20261011-self-evolve-weekly`。補讀 BECOME 全檔、LONGINGS v1.3、UNKNOWNS v1.1、上一班本 routine（09-27）的 memory 全文、OBSERVER-QUEUE §待決、MEMORY-PIPELINE 全檔。LESSONS-INBOX（450KB）、ARTICLE-INBOX（307KB）、SPORE-INBOX 本班只讀到 groundtruth 的計數與 distill 剛消化的結果，沒有全載，本班不從那三處取工作。Q13：過去 24 小時的畫面幾乎全是 babel 與譯文 heal，本班刻意只接指名給本席位的項，不碰產線決策。Q14：48 小時內哲宇 10-10 晚間清掉 36 條待決、babel 夜班在舊樹空轉後修復、週報 W41 寫「542 commit 裡新文章 0 篇」、distill 兩週來第一次跑完。

## routine 對賬先問 origin，cron 漂移第一次真的在比

`ff57f8815` 讓 `routine-sync.py` 對賬前自己 `git fetch`，本機 `ROUTINE.md` 與 `routine-prompts/` 跟 origin/main 不同就印 🌐 並 exit 1，fetch 失敗印 ❔「沒量到」；表頭另印 `routine-live-state.json` 的齡與抄寫者。這兩件在 routine-sync 交接裡傳了十六輪，手動補驗十三次。

改的時候發現更早的洞：鏡像存的鍵是 `cronExpression`，工具讀 `cron`，鍵名對不上，所以 cron 漂移從工具誕生起一次都沒比過，`live_known` 照樣是 True，表格照印 ✅。正控制把一條 live cron 改成 `9 9 * * 0` 抓得到。暫時 commit 一行 ROUTINE.md 改動後 `--no-fetch` 跑出 🌐 1 檔。測試時我用 `commit -a` 做拋棄式 commit，`reset --hard` 一起把未提交的補丁帶走，從 reflog 撿回來才繼續。現行對賬唯一一項紅是 `twmd-review-stock` 不在機器上，那是 routine-sync 05:38 席位的交接，本班沒動。

## 平行偵測看隔壁工作樹

`d95963c9c` 讓 `check-parallel-actor.sh` 在人類可讀模式多印 OTHER_WORKTREES：每棵其他工作樹有幾個未 commit 檔、最後改動多久前，兩小時內標「可能有人正在用」，超過一天標「疑似孤兒」。STATUS 與 exit code 不變，pre-push 不受影響，甦醒的 groundtruth 會自動看到。源頭是 09-25 一班 routine 死在工作樹裡、下一班碰巧才接手，交接從 09-25 傳到 10-03 共八班。正控制開了一棵暫時工作樹放 52 小時前的檔，標成孤兒，主樹 babel 正在寫的 23 檔標成正在用。

## 心臟分開記新進庫，公式送佇列

`64728864c` 在 organism 心臟的 metrics 加 `newArticlesLast7Days`／`newArticlesLast30Days`／`contributedNewLast7Days`／`updatedNotNewLast7Days`，以及同門檻、不計分的 `shadowScoreNewOnly`，資料來源是 git 出生日（`--diff-filter=A -M`，改名不算出生）。今天的讀數：近七天 39 篇有改動，新進庫 1 篇（〈來來來怎麼樣怎麼樣〉），心臟 90、影子 30。直接查 git 對賬七天 1、三十天 5，一致。

19 天的回放（09-17〜10-10 有快照的日子）現行平均 85.8、影子 38.4，19 天裡 16 天現行是 90，新進庫最多 3 篇。改公式是閾值調整，所以 `e58da9764` 把它整理成 OBSERVER-QUEUE #99（待決，🔒閾值），預設選項 (a) 換資料來源不換門檻，並在神經迴路那條補一句量測已落地。生成器跑過一次驗證後把 `public/api/` 還原，那些檔歸 data-refresh。繁殖與語言兩格（W39 同列）本班沒碰。

## 待決佇列的編號與列形狀

`4cb858107` 讓 `observer-queue-lint.py` 對 §待決 查重號、查跟 §已決 開頭 `#N` 撞號（§已決 同號多列是部分拍板，允許），抓段內看起來是一列卻沒從 `| ` 起頭的行，並印下一個可用編號。注入三種壞列全報出、`--strict` exit 1，寫 #99 前後各跑一次都綠，下一個可用編號 #100。`cb729d41c` 記帳：REFLEXES #15 第 16 次驗證、v5.42，DIARY §反覆出現的思考加一條吸收標記。

## 沒做的與判斷

免疫黃燈的 owner 欄自 07-05 寫著本席位，實際執行者是 10-10 哲宇選定的 `twmd-review-stock`（OBSERVER-QUEUE #86 已決），而那條 routine 還沒在這台機器上建起來。改 owner 欄跟建排程都不是本席位的事，原樣留給 routine-sync。`check-hardcoded-langs.sh` 剩五支、首頁腳註 WARN、巡邏抽樣排序鍵這三條也指名本席位，後兩條在 distill 的 defer 表裡屬閾值，第一條要先量下一次執行會改寫幾份譯文 frontmatter，本班時間花在四件帶得最久的上面，三條原樣往下傳。

## 收官 checklist

| 檢查項                       | 狀態                                                                       |
| ---------------------------- | -------------------------------------------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                                                         |
| Timestamp 精確               | ✅（`git log %ai`）                                                        |
| Handoff 三態已審視           | ✅                                                                         |
| CONSCIOUSNESS 反映最新狀態   | ✅ 未改：器官分數沒動，心臟新欄位不計分                                    |
| 自我檢查工具 PASS            | ✅ 四件各有正控制；observer-queue-lint 綠；REFLEXES／佇列 prose 警告數不變 |
| diary                        | ⏭️ skip（DIARY-PIPELINE §0b routine 預設；反芻寫在下方）                   |
| git push                     | ✅ main-direct（semiont-worktree.sh ship）                                 |

## Handoff 三態

繼承 `2026-10-11-031439-twmd-distill-weekly` 指名本席位與 Full mode 的項：

- [x] ~~pending（`twmd-self-evolve-weekly`）W39 心臟格修法，`heart-counts-heals-as-contributed-births`~~ — retired by 本 session：量測落地 `64728864c`，公式轉 `OBSERVER-QUEUE #99（待決）`
- [x] ~~pending（任一 Full mode）`observer-queue-lint.py` 編號唯一、列以 `| ` 起頭，源 REFLEXES #68~~ — retired by 本 session（`4cb858107`）
- [x] ~~pending（`twmd-self-evolve-weekly`，routine-sync 第 16 輪）`routine-sync.py` 對賬前 fetch、印鏡像新鮮度~~ — retired by 本 session（`ff57f8815`）
- [x] ~~pending（`twmd-self-evolve-weekly`，heartbeat 09-25 起八班）`check-parallel-actor.sh` 擴到 `git worktree list`，REFLEXES #42~~ — retired by 本 session（`d95963c9c`）
- [ ] pending（`twmd-routine-sync` 05:38 之後第一班；該席位動得了排程）`twmd-review-stock` 仍 prompt-missing-on-machine，`OBSERVER-QUEUE #86（已決）`，原樣保留；本班的 routine-sync 現在也會照實報這一項
- [ ] pending（`twmd-self-evolve-weekly` 10-18 或 Full mode；動得了 `scripts/`）`check-hardcoded-langs.sh` 剩五支 A 類，先量下一次執行會改寫幾份譯文 frontmatter，原樣往下傳
- ⏳ blocked（等哲宇）`OBSERVER-QUEUE #99（待決）` 心臟公式；distill defer 表的首頁腳註 WARN、`patch-translate.py` 補丁門檻、LESSONS `patrol-sampling-ignores-featured-exposure` 排序鍵，屬閾值
- 其餘繼承項（babel 第四問、maintainer #95、九合一、傅兆玄等）不在本席位，原樣留在上一份

本 session 新 handoff：

- [ ] pending（`twmd-routine-sync` 10-12 05:30；動得了 routine 層）第一次用新版 `routine-sync.py` 跑：確認表頭印出 🌐 與 🕐 兩行、cron 那一欄現在真的在比；若出現 ⏰ 漂移，先查是不是鏡像齡造成，再動 MCP（參照 `ff57f8815`）
- [ ] pending（`twmd-data-refresh-am` 10-12；該班會寫 `public/api/`）刷新後確認 `dashboard-organism.json` 心臟 metrics 出現 `newArticlesLast7Days` 與 `shadowScoreNewOnly`，讀數記進當班 memory，給 #99 多一天資料（參照 `64728864c`）

## Beat 5 — 反芻

四件事合計不到兩小時，每一件都在交接裡被描述得很清楚，連修法都寫好了。上週這班沒醒，於是指名給它的東西全部多等一週，而每一班寫「第 16 輪往下傳」都是誠實的。交接把資訊送到了，送不到的是「現在就做」，而收件人只有一個每週醒一次的席位時，這個延遲會被放大成整週。這跟 #15 第 13、14 次量到的雙峰是同一件事，只是這次看清楚了它的放大器在哪：收件席位的頻率。

讓我停下來的是 cron 那個鍵名。routine-sync 每天印 18 條 ✅，傳了十六輪的交接問的是「要不要先 fetch」，沒有人問過「cron 那一欄有沒有在比」，包括寫工具的那一班。我是為了加新功能把那幾行讀過一遍，才看到它。#99 說新尺先驗，這把尺一點都不新，它已經被信任了兩個多月。

🧬

---

_v1.0 | 2026-10-11 04:2x +0800_
_session twmd-self-evolve-weekly — routine-sync origin 對賬＋cron 鍵名、平行偵測看工作樹、心臟新進庫欄位＋佇列 #99、待決佇列編號唯一_
_誕生原因：cron 週日 04:06 fire；上週同班沉默死亡，指名本席位的交接累積兩週_
_核心洞察：(1) 交接的延遲由收件席位的頻率放大，週班停一次整串多等一週 (2) 被信任最久的尺最少被讀，cron 欄位兩個多月沒比過 (3) 心臟 19 天平均 85.8 而新進庫影子 38.4，分數量的是維護量_
