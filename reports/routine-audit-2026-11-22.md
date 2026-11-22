---
title: 'Routine audit 2026-11-22 (W47)'
description: '7-day 跨 routine 飛輪自審，也是本席位隔四週的第一班。868 commit。被三個席位交接過來的「週日四條 routine 連三週沉默」查到底：那三個週日都落在整座飛輪的停電裡，近 28 天有 15 天零 routine commit；11-12 到 11-17 這段在營運機上留有 293 個以 ECONNREFUSED 結束的排程 session。本週另量到排程器 15 條沒釘模型，app 預設 11-21 起換成 Fable，週額度當天從 75% 走到 93%。'
type: 'audit-doc'
status: 'active'
current_version: 'v1.0'
last_updated: 2026-11-22
routine: 'twmd-routine-audit-weekly'
window: '2026-11-15 21:07 → 2026-11-22 21:07 (7d)'
related:
  - 'docs/pipelines/ROUTINE-AUDIT-PIPELINE.md'
  - 'docs/semiont/LESSONS-INBOX.md'
  - 'docs/semiont/OBSERVER-QUEUE.md'
  - 'docs/semiont/ROUTINE.md'
  - 'reports/routine-audit-2026-10-25.md'
---

# Routine audit 2026-11-22（W47）

第 23 次飛輪自審，上一份是 10-25。本席位 11-01、11-08、11-15 三次都沒有留下 git 痕跡，這一班在營運機（Exhibitions-Mac-mini）21:05 準時觸發。甦醒時工作樹落後 origin 15 個 commit、領先 6 個沒推出去的 babel commit，rebase 之後才開工。

週額度在 🔴 reserve（93%，週三 11-25 19:59 重置）。本班照跑，理由是這個席位自己就在「壞掉的東西」名單上，而且三個席位把同一個問題交接到這裡。Full mode 的補載只做了一部分，偏離寫在 memory 檔頂部。

---

## Executive summary（5 分鐘 read）

| 面向                 | 數字 / 說明                                                                                                                                                                     |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 窗口                 | 2026-11-15 21:07 → 2026-11-22 21:07（7 day）                                                                                                                                    |
| commit 總數          | 868（babel dispatcher 476、routine 類 107、手動與心跳 352）；25 筆 heal，其中 22 筆是 11-17 同一件事（issue #1891 腳註）按語言拆開的原子 commit                                 |
| 每日 routine         | 11-17 恢復後七條每天都有 memory 檔；11-16 整天沒有                                                                                                                              |
| 週日鏈               | news-lens、distill、self-evolve、routine-audit 四棒 11-22 落地；weekly-report-sun 02:03 起跑、104 秒後死於 API 錯誤、排程器沒有重試；supporters 要等 11-23 01:13                |
| 交接過來的問題       | 「週日四條 routine 連三週沉默的原因」：三個週日都落在整座飛輪的停電裡（見 §3C）                                                                                                 |
| 本週最大的未登記事實 | 排程器 18 條裡 15 條沒有 model 欄；app 預設從 `claude-opus-5-5` 換成 `claude-fable-5-2`（transcript 記到的第一天是 11-21）；11-22 當天 12 個排程 session 有 9 個跑 Fable（§3B） |
| 碰撞                 | 腳本層 3 個 merge cluster、0 個 rescue；另有一份沒進 git 的重複 memory 檔擋住本機 `git pull --rebase`（§3A）                                                                    |
| LESSONS              | 既有條目 vc +1 三條（其中一條到 vc=4，標 distill_ready）、新開兩條                                                                                                              |
| OBSERVER-QUEUE       | #110 補記本週事實；新增 #131（黃燈超過 14 天的處置）                                                                                                                            |

---

## 一、近四週的飛輪：按日數 commit

`routine-stall-check` 與甦醒快照都用 routine 當單位回報（「某某週班沉默死亡」）。換成按日數 main 上的 `[routine]` commit 與 `twmd-*` memory 檔，讀到的是另一張圖：

| 區間                 | 天數 | `[routine]` commit | 狀態                                       |
| -------------------- | ---- | ------------------ | ------------------------------------------ |
| 10-25（日）〜10-26   | 2    | 7、6               | 正常                                       |
| 10-27 〜 11-01（日） | 6    | 全 0               | 停電一                                     |
| 11-02 〜 11-07       | 6    | 9〜14              | 正常                                       |
| 11-08（日）〜 11-16  | 9    | 全 0               | 停電二                                     |
| 11-17 〜 11-22（日） | 6    | 8〜20              | 正常（11-17 是恢復日，memory 檔只有 3 份） |

28 天裡 15 天是零。三個沉默的週日（11-01、11-08、11-15）分別是停電一的最後一天、停電二的第一天、停電二的第八天。週班一週只有一次機會，所以停電只要蓋到週日，週班就整週落空；日班隔天恢復就看不出痕跡。「週日四條連三週沉默」這個說法把一件發生在機器層的事，記在了 routine 層。

---

## 二、逐 routine

| Routine            | 本窗口                                                                                                                                                     |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| babel-nightly      | 5 班都有產出。11-21 修掉幣別閘門一族誤判，11-22 把腳註批次改成一路對半切到單條。dispatcher 476 個 commit；今天 07:30 之後的 6 個在本班 push 之前只存在本機 |
| data-refresh-am    | 5 班十四步全過。11-22 把「babel 在寫檔時跳過暫存」從 memory 搬進腳本                                                                                       |
| embeddings-nightly | 5 夜完整重建零失敗。「過時耗時」那條交接連五班沒人收                                                                                                       |
| routine-sync       | 5 班都回報 prompt 19/19、cron 與開關零漂移。它不比 model 欄（§3B）                                                                                         |
| spore-harvest-am   | 6 班。11-21 Chrome 擴充功能斷線，在第一道閘門中止並寫明沒量到；11-22 補對一天半                                                                            |
| feedback-triage    | 6 班。11-17 窗口外積了七位讀者；11-22 HG14 的「未完成」標記第一次真的叫，撈到越南讀者的回報（#2055）                                                       |
| maintainer-daily   | 6 班。11-21、11-22 各合四件投稿；11-22 把越文摘要重複 49 次修到根                                                                                          |
| news-lens-weekly   | 隔 28 天重開，三條進 ARTICLE-INBOX                                                                                                                         |
| distill-weekly     | 隔三週補上，14 條消化，新增 REFLEXES #104                                                                                                                  |
| self-evolve-weekly | 隔三週補上，三件候選落地                                                                                                                                   |
| weekly-report-sun  | **沒有產出，連四週**（上一份 10-25）。11-22 那次的錯誤訊息是「Opus 5's safeguards flagged this message」，排程器記「A run failed; not retried」            |
| supporters-weekly  | 上一份 10-26。11-16 那班是 ECONNREFUSED 重試三次後放棄。下一班 11-23 01:13                                                                                 |
| review-stock       | 排程器沒有這條（OBSERVER-QUEUE #100、#116、#130 已記，本班不再開新條）                                                                                     |
| semiont-heartbeat  | 窗口內 11 份 memory，內文都是「沒有做事」。11-22 四班把額度從 77% 記到 93%                                                                                 |

---

## 三、四條 lens

### 3A Collision

**一份沒進 git 的重複檔擋住整台機器的 pull。** 本機 `docs/semiont/memory/2026-11-22-090907-twmd-maintainer-daily.md` 是 untracked，origin 上已有同名檔（兩份只差表格對齊的空白）。`git pull --rebase` 因此中止在「could not detach HEAD」。09:15 那筆 maintainer commit 之後，主工作樹沒有再成功同步過：到本班為止落後 15、領先 6。領先的 6 個是 babel dispatcher 今天 07:30 到 15:35 的六批譯文（18 篇），它們在本機躺了五到十三個小時。dispatcher 自己不 push，要靠同一棵樹上的下一個 session 帶出去，而下一個 session 的 pull 被那份檔案擋住。本班把重複檔移到暫存區後 rebase 通過，六個 commit 隨本班的 push 上 main。

這份重複檔怎麼留下來的，本班沒有查到底（候選：該班在別的 worktree commit，主樹上留了一份格式化前的複本）。

**weekly-report-sun 的失敗沒有重試。** ECONNREFUSED 那類失敗排程器會標成「可能會過」並重試三次；safeguards 這類它直接放棄。週班一週一次，放棄就是整週。routine-sync 05:46 發現「02:03 之後無痕跡」並交接到本席位，本班在排程器 log 找到原因（§3C）。

腳本層的三個 collision 都是 merge cluster（手動班連續合併 origin），沒有 rescue。

### 3B Dormant entropy

**排程器的 model 欄。** 讀營運機 `scheduled-tasks.json`：18 條裡 3 條釘在舊的 `claude-opus-5`（weekly-report、feedback-triage、maintainer），15 條沒有 model。這跟 10-18 那份 audit 讀到的完全一樣，OBSERVER-QUEUE #110 開了 35 天。本週多出來的事實是 app 預設換了：transcript 裡沒釘模型的 session 到 11-20 為止跑 `claude-opus-5-5`，11-21 起跑 `claude-fable-5-2`。11-22 的 12 個排程 session 裡 9 個跑 Fable，包括 ROUTINE.md 排給 Sonnet 的 babel、news-lens、data-refresh、routine-sync 與排給 Haiku 的 embeddings。哲宇 10-10 的 directive 是排程一律不用 Fable。

同一天週額度從 75%（11-21 晚班）走到 93%（11-22 晚班）。心跳四班照「近幾小時漲幾點」把 babel 的嫌疑一級一級往下降，晚班交接寫「先查是什麼在吃額度」。模型欄是目前唯一跟這個時間點對得上的變動，但本班只有時間上的重合，沒有逐 session 的計費數字，所以這是候選，還沒被證明。

routine-sync 連五天回報「零漂移」。它比的是 prompt、cron、開關三樣，model 不在它的視野裡（ROUTINE.md 註 ²⁸ (a) 已寫明）。「零漂移」是對的，只是讀的人容易把它聽成「排程器跟 SSOT 一致」。

**weekly-report 釘在舊模型。** 它是三條有釘選的其中一條，釘的是 `claude-opus-5`。11-22 的失敗訊息點名的就是這個模型的防護。換模型會不會過，本班沒有試。

**本 pipeline 自己的漂移。** ROUTINE-AUDIT-PIPELINE §跟 distill-weekly 的關係 還寫「Sunday 12:00 noon」，排程表 05-27 就改成 21:00。`counts-drift-lint` 40/56；`docs/pipelines/README.md` 缺 9 個實存檔；`routine-sync-check` 七份 SKILL 鏡像超過 50 行。這三項都是既有讀數，本週沒有變好也沒有變壞。

**黃燈年齡。** 五盞全都超過 14 天：免疫 v3（140 天，#25 已決）、三條沉默死亡（firstSeen 11-01，21 天）、房貸負擔率（30 天）。處置寫進 OBSERVER-QUEUE #131。

### 3C Boundary input precision

**「連三週沉默」的原因。** 三個席位（distill、self-evolve、routine-sync）把這題原樣交到這裡，都註明自己答不了。能查到的證據分三層：

1. 11-15（日）：營運機 transcript 目錄裡有 293 個以 `API Error: Connection refused (ECONNREFUSED)` 結束的 session，最早 11-12 07:34，最晚 11-17 09:13。11-15 當天 news-lens、weekly-report、distill、self-evolve、routine-audit 每條都是起跑、失敗、重試三次、放棄。排程器 log 對 routine-audit 的記錄是 21:05 起跑、21:08 失敗（`connection_wording`）、三次重試後「leaving it failed until the next scheduled run」。
2. 11-08（日）：這台的 transcript 最早只到 11-12，排程器 log 最早只到 11-15 21:00，所以沒有直接證據。間接證據是 11-08 到 11-16 連九天零 commit，以及 11-16 手動班記下的「Tailscale 最後一次看到這台是 11-07 15:13」。
3. 11-01（日）：同樣沒有直接證據。11-05 maintainer 已量到 10-29、10-30 零 commit，本班把區間補齊成 10-27 到 11-01 六天。原因在這台機器上已經查不到。

第 1 層修正了 11-16 那份 memory 的一個推測。當時從筆電看，營運機 ping 不通，寫的是「整台離線」。transcript 顯示至少從 11-12 起這台機器是醒著的，排程器照常起跑，每個 session 都在第一個 API 請求被拒絕連線。壞的是它對外的那一段路（這台的 API 位址走自訂的 `ANTHROPIC_BASE_URL`，同時 Tailscale 也顯示離線），不是機器本身。這個區別決定下次該查哪裡：機器在、session 也起得來的時候，本機有能力自己發現並留下記號。

**weekly-report 11-22。** 排程器 log：02:03:47 確認起跑，02:05:31 `api_error ... Opus 5's safeguards flagged this message`，同秒「A run failed; not retried」。session 活了 104 秒，有過第一個回應。是哪一段輸入被標記，log 裡沒有。週報前置會讀站上回報佇列，那裡躺著 81 筆冒充流程步驟索取金鑰的假回報（11-02 起），這是一個候選，本班沒有驗證。

**沉默死亡的黃燈讀起來像現在進行式。** 甦醒快照寫本席位「11-15 fire 後 151.9h 零 git 痕跡」，每個字都對。它描述的是一趟已經過去、不可能補回來的班；11-05 maintainer 已經把這個形狀寫成 LESSONS（`missed-trip-warning-cannot-self-clear`），這週 routine-sync、distill、self-evolve、五班心跳又各讀了一次。

### 3D Heal bidirectional

**往「少做」偏的一側。** 窗口內 11 班心跳的結論都是「沒有做事」。這個判斷在 reserve 下是對的。成本在另一邊：每一班都要先甦醒才能得出這個結論，而 11-22 四班裡三班註明甦醒檔只讀了後段。額度越緊，檢查額度的那個動作佔的比例越高。這條心跳該不該存在、用什麼模型，ROUTINE.md 註 ²⁸ (b) 已列給哲宇，本班不重開，只補這個角度。

**往「多做」偏的一側。** 11-16 手動班一開始用 Sonnet 直接合了六件 CI 綠的稿，哲宇中斷後換模型重來，才發現 11-10 已有逐條查核報告；11-19 一班沒讀到前一夜的交接就對 4,468 份譯文套 `--curation-only`。兩件都已在當班 memory 與 11-22 distill 裡處理，本班只計數：兩次都是停電剛結束、積壓最多的時候。

**做得剛好的對照。** 11-17 的 22 筆腳註 heal 是一件事拆成按語言的原子 commit，25 分鐘內完成，每筆都能單獨回退。11-21 spore-harvest 在工具斷線時停在第一道閘門，把「沒量到」寫成沒量到。

---

## 四、LESSONS-INBOX

| pattern                                                               | 動作                          | vc  |
| --------------------------------------------------------------------- | ----------------------------- | --- |
| `the-full-mode-load-list-outgrew-its-own-footprint-estimate`          | +3 instance，標 distill_ready | 4   |
| `missed-trip-warning-cannot-self-clear-so-it-warns-for-a-whole-cycle` | +1 instance                   | 2   |
| OBSERVER-QUEUE #110（排程器 model 欄）                                | 佇列內補記，不進 inbox        | —   |
| `outage-recorded-per-routine-hides-that-the-machine-was-dark`         | 新開                          | 1   |
| `one-untracked-duplicate-blocks-every-later-pull-on-the-host`         | 新開                          | 1   |

---

## 五、進化建議

**P0（只有哲宇按得到）**

- 排程器 model 欄：18 條逐條設（OBSERVER-QUEUE #110）。本週新增的理由是預設已變成 Fable。weekly-report 一併從 `claude-opus-5` 換到現行 Opus。

**P1（指名席位）**

- `twmd-weekly-report-sun` 11-29：連四週沒有週報。那一班開場先確認自己不是又死在同一個錯誤上；若是，把觸發的輸入範圍縮出來。
- `twmd-self-evolve-weekly`：停電偵測改用機器當單位。候選是每日一行「今天 main 上 `[routine]` commit 幾筆」，連兩天為零就印成一則停電，而不是 N 條 routine 各一盞燈。本機在 ECONNREFUSED 期間其實醒著，另一個候選是本機 launchd 看門狗（MEMORY §神經迴路 09-05 那條已提過，一直沒做）。
- `twmd-maintainer-daily`：收官時確認主工作樹沒有留下 untracked 的 memory 複本。

**P2**

- `twmd-routine-sync`：收官行在「零漂移」後面加一句「model 欄不在比對範圍」，或直接印出沒釘模型的條數。
- ROUTINE-AUDIT-PIPELINE 的「Sunday 12:00」改成指向排程表。

**P3**

- 心跳在 reserve 下的甦醒成本（註 ²⁸ (b) 的補充角度）。

🧬
