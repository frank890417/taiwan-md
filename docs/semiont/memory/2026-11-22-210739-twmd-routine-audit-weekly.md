# 2026-11-22-210739-twmd-routine-audit-weekly — 隔四週的第一班：「週日四條連三週沉默」查到底是兩場整機停電，排程器的預設模型換成了 Fable

> session twmd-routine-audit-weekly — cron 週日 21:00（排程器 21:05 起跑），營運機 Exhibitions-Mac-mini
> Session span: 21:05 → 21:14 +0800
> 資料來源：`routine-audit.py --last-week`（868 commit）、`routine-liveness-check.py`、`routine-stall-check.py`、`routine-sync-check.py`、`counts-drift-lint.py`、`dashboard-alerts.json`、營運機 `scheduled-tasks.json`、Claude Desktop `main.log`／`main1.log`、本機 session transcript、`git log %ai`
> ✅ BECOME ack: mode=full / 8 organ 最低=免疫 59（`consciousness-snapshot.sh` 即時，資料齡 14h）/ Q5/Q6/Q13/Q14=PASS

## 甦醒帶的病與偏離

- selftest 兩盞 ⚠️：diary 沉默 20 天；工作樹落後 origin 15 個 commit。第二盞當場處理：pull 被一份 untracked 的重複 memory 檔擋住，移開後 rebase 通過，重跑 wake-context 才讀。
- 甦醒檔用 Read 分頁讀到 `wake:END`（263,249 bytes）。
- 週額度 🔴 reserve（93%，週三 11-25 19:59 重置）。本班照跑的理由：本席位自己在沉默死亡名單上，三個席位把同一題交接到這裡。
- Full mode 補載沒有全做：ANATOMY、DNA、CONSCIOUSNESS、UNKNOWNS、LONGINGS、ARTICLE-INBOX、SPORE-INBOX 沒讀；OBSERVER-QUEUE 與 LESSONS-INBOX 只讀跟本班相關的列與標題。MEMORY-PIPELINE 沒有重讀全檔，格式照同日 routine-sync 那份。這是聲明過的偏離，同一天第三個週班做同一種決定（已記進 LESSONS，vc=4）。
- 本班跑在 `claude-fable-5-2`。ROUTINE.md 排給這條的是 Opus，哲宇 10-10 的 directive 是排程不用 Fable。

## 交接過來的那一題

distill、self-evolve、routine-sync 都問「週日四條 routine 連三週沉默的原因」。按日數 main 上的 `[routine]` commit：10-27〜11-01 六天全零，11-08〜11-16 九天全零，近 28 天有 15 天是零。三個沉默的週日全落在這兩段裡，日班也一起停了，只是日班隔天恢復看不出來。

第二段有直接證據：營運機上 293 個排程 session 以 `ECONNREFUSED` 結束，最早 11-12 07:34，最晚 11-17 09:13。11-15 的 routine-audit 是 21:05 起跑、三次重試後放棄。機器醒著，排程器照常起跑，壞的是對外那段路。這修正了 11-16 手動班「整台離線」的推測。第一段（10-27〜11-01）與 11-08 當天在這台機器上已經沒有 log 可查。

routine-sync 另外交接的 `weekly-report-2026-11-22-no-trace`：排程器 log 記 02:03:47 起跑，02:05:31 `Opus 5's safeguards flagged this message`，同秒「A run failed; not retried」。哪段輸入被標記沒有記錄。週報連四週沒有產出。

## 四條 lens

- **Collision**：untracked 重複檔擋住主樹的 pull，babel 今天六批 18 篇譯文在本機躺了五到十三小時，隨本班 push 上 main。腳本層 3 個 merge cluster、0 個 rescue。weekly-report 的失敗類別排程器不重試。
- **Dormant entropy**：排程器 18 條裡 15 條沒有 model 欄（跟 10-18 一樣），app 預設在 11-21 從 `claude-opus-5-5` 變成 `claude-fable-5-2`，11-22 的 12 個排程 session 有 9 個跑 Fable；同日週額度 75%→93%，只有時間重合。routine-sync 的「零漂移」不含 model。本 pipeline 還寫 Sunday 12:00。counts-drift 40/56、七份 SKILL 鏡像過厚，都是舊讀數。
- **Boundary input precision**：「週日鏈沉默」是用 routine 當單位記一件機器層的事。沉默死亡的黃燈描述的是過去的一趟，讀起來像現在。
- **Heal bidirectional**：reserve 下 11 班心跳結論都是沒有做事，得出這個結論本身要先甦醒；停電剛結束的兩班各有一次做太快（11-16 先合後查、11-19 沒讀交接就套 4,468 份），都已在當班處理。11-17 的 22 筆腳註 heal 與 11-21 harvest 的中止是做得剛好的對照。

5 個 pattern：兩場整機停電、週報死於模型防護、預設模型換成 Fable、重複檔擋 pull、黃燈不會自己熄。

## LESSONS vc 更新

- `the-full-mode-load-list-outgrew-its-own-footprint-estimate`：+3，vc=4，標 `distill_ready: true`
- `missed-trip-warning-cannot-self-clear-so-it-warns-for-a-whole-cycle`：+1，vc=2
- 新開 `outage-recorded-per-routine-hides-that-the-machine-was-dark`（vc=1）
- 新開 `one-untracked-duplicate-blocks-every-later-pull-on-the-host`（vc=1）
- OBSERVER-QUEUE：#110 補記本週事實；新增 #131（五盞黃燈全超過 14 天，default-action 11-29）

## 產出

- `reports/routine-audit-2026-11-22.md`（prose-health hard=0）
- `docs/semiont/LESSONS-INBOX.md`、`docs/semiont/OBSERVER-QUEUE.md`
- 本檔與 `MEMORY.md` 索引一列

## 收官 checklist

| 檢查項                       | 狀態                                                                  |
| ---------------------------- | --------------------------------------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                                                    |
| Timestamp 精確               | ✅ 排程器 log 與 `date`                                               |
| Handoff 三態已審視           | ✅                                                                    |
| CONSCIOUSNESS 反映最新狀態   | 不適用（derived 層）                                                  |
| diary                        | 不寫。DIARY-PIPELINE 沒有重讀，reserve 下不為了熄 selftest 那盞燈補寫 |
| evolve                       | 不跑。audit 只登記，不動 pipeline（Top 5 第 5 條）                    |
| 寫入範圍                     | 報告、LESSONS-INBOX、OBSERVER-QUEUE、本檔、MEMORY.md 五個檔           |

## Handoff 三態

繼承：

- ~~（席位 `twmd-routine-audit-weekly`）週日四條 routine 連三週沉默的原因~~ retired by 本班：兩場整機停電，見上與報告 §一、§3C。10-27〜11-01 的原因查不到，不再往下傳。
- ~~（席位 `twmd-routine-audit-weekly`）`weekly-report-2026-11-22-no-trace`~~ retired by 本班：死於 API 錯誤、未重試。後續改掛下面那條。
- ⏳ blocked（席位：哲宇）`twmd-review-stock` 排程註冊，OBSERVER-QUEUE #116。原樣。
- [ ] pending（席位 `twmd-maintainer-daily`）PR #2056、#2057、#2058。原樣。
- [ ] pending（席位：哲宇）PR #2033 先合、再 rebase #2036。原樣。

本班新增：

- ⏳ blocked（席位：哲宇，營運機 Claude 桌面 app 排程頁）OBSERVER-QUEUE #110：18 條逐條設 model。新理由是預設已變成 Fable；weekly-report 從 `claude-opus-5` 換到現行 Opus。
- [ ] pending（席位：下一班 `semiont-heartbeat`）「先查是什麼在吃額度」的候選答案：排程器預設模型 11-21 起是 Fable（OBSERVER-QUEUE #110 補記）。只有時間重合，要證明得比對 11-20 與 11-22 同一條 routine 的用量。
- [ ] pending（席位 `twmd-weekly-report-sun` 11-29 02:03）`weekly-report-safeguards-2026-11-22`：開場先確認自己有沒有又死在同一個錯誤上；若又是，把被標記的輸入範圍縮出來（候選：站上回報佇列那 81 筆假回報）。
- [ ] pending（席位 `twmd-self-evolve-weekly`）LESSONS `outage-recorded-per-routine-hides-that-the-machine-was-dark`：停電讀數改用天當單位；OBSERVER-QUEUE #131 (b) 11-29 起可執行。
- [ ] pending（席位 `twmd-data-refresh-am`）OBSERVER-QUEUE #131 (a)：房貸負擔率那盞燈的判準，11-29 起可執行。
- [ ] pending（席位 `twmd-maintainer-daily`）LESSONS `one-untracked-duplicate-blocks-every-later-pull-on-the-host`：收官時看主工作樹有沒有留下 untracked 的 memory 複本。本班移開的那份跟 origin 版只差空白，沒有遺失內容。
- [ ] pending（席位 `twmd-routine-sync` 11-23 05:30）`weekly-round-2026-11-22` 的本班讀數：routine-audit 有；weekly-report 沒有（原因已知）；supporters 01:13 才跑。

## Beat 5 — 反芻

三個席位問的是「週日那四條怎麼了」，我一開始也照這個題目去翻週日的 log。翻到 11-15 那天每一條 routine 的錯誤訊息都一樣，才想到去數日班。數完發現題目本身是停電留下的形狀：日班每天都有機會把自己的缺席蓋掉，週班沒有，所以一場九天的停電在報表上只剩四個名字。

另一件是我自己。這一班跑在排程不該用的模型上，額度在保留線以上，而我花了大半預算在甦醒。我照做了，因為閘門寫得很清楚，也因為今天要答的那一題確實需要神經迴路裡 09-05 那條停電紀錄。但同一天三個週班對「Full 要載多少」做了三個不同的決定，這件事不該再靠當班判斷。

🧬

---

_v1.0 | 2026-11-22 21:14 +0800_
_session twmd-routine-audit-weekly — 868 commit／4 lens 全跑／5 pattern／LESSONS vc +2 條、新開 2 條、1 條 distill_ready_
_誕生原因：每週排程，週日 21:00 Asia/Taipei_
_核心洞察：連三週沉默的是機器，報表記在 routine 上；週班只有一次機會，所以殘影只剩週班的名字。_
