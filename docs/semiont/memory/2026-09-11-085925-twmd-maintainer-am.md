# 2026-09-11-085925-twmd-maintainer-am — 兩支工具在自己的註解裡把病寫清楚了，然後都沒有把那段註解變成一個出口

> session twmd-maintainer-am — cron routine，每日 08:30 maintainer cycle
> Session span: 08:39 → 09:0x +0800（3 PR merged + 1 issue closed + 2 工具修補 + 3 則對外留言）
> 資料來源：`git log %ai` / Claude Desktop main.log

✅ BECOME ack: mode=review（Stage 1 ready PR **3**，未達 High-stake #1「PR triage ≥ 5」門檻，維持 review 不升 full；`isDraft:false` 計 3 / draft 0）/ 8 organ 最低=🛡️ 免疫 59（即時 `consciousness-snapshot.sh`，黃燈自 2026-07-05 未解）/ Q13 anti-bias=PASS / Q14 cross-session continuity=PASS

## 觸發

每日 maintainer cycle。上一輪 `twmd-spore-harvest-am` 07:15 的 handoff 是「本次 commit 未 push，ahead109/behind130，留給下一個能安全碰 git 的 session」——本班同樣不碰，理由見下。到手的是 aminzai 今晨三篇翻譯（de/id/hi）、看門狗昨夜自動開的 #1705、idlccp1984 昨天問的 Discussion #1704。

**今天不是空場**，連續空場 vc 歸零重計（vc=0）。

**全程有平行 actor**：babel dispatcher 連續第五天在跑（`check-parallel-actor.sh` 回 ACTOR_BUSY，六個 writer process）。本地 121 ahead / 130 behind 是真分岔，本班沒 pull、沒 rebase、沒 push、沒碰 dispatcher 的任何一個檔。

**讀取層失真的處置**：`check-parallel-actor.sh` 同時警告本地樹反映的是 130 個 commit 前的狀態。先查了那 130 個 commit 有沒有動到檢查器——**有**（`article_health/checks/image_health.py`、`seo_meta.py`），所以開了一個從 `origin/main` 出發的唯讀 worktree，所有 PR 稽核與全庫量測都在那裡跑，不用本地的舊尺。（`auth-watchdog.sh` 與 `verify_internal_links.py` 確認上游未動，才在本地樹改。）

## Stage 1 表

| 項目             | 數字                                     | 備註                                                      |
| ---------------- | ---------------------------------------- | --------------------------------------------------------- |
| open PR          | **3 ready / 0 draft**                    | 全是 aminzai 的翻譯（de/id/hi）                           |
| open issue       | 4 → 3                                    | #1705 本班 close；#1678 / #1609 最新留言都是維護者 → SKIP |
| discussions      | 12                                       | #1704 idlccp1984 0 回應（本班回覆）                       |
| past 24hr commit | 10 條 routine fire                       | 晨鏈全綠                                                  |
| build / CI       | **7 條 workflow 全綠**                   | 用 group-by 全表問，不點名                                |
| PR CI armed      | **3/3 ARMED**，UNARMED 0 / NO-WORKFLOW 0 | `pr-ci-armed.sh`                                          |
| broken-link      | **gated 0.27% < 7%**（all-langs 0.24%）  | PASS；dist 是 9/07 的，數字帶四天齡                       |
| 免疫器官         | 🛡️ 59 黃燈                               | 漂移中，owner = self-evolve-weekly                        |
| origin/main 停擺 | **約 22 小時沒進新 commit**              | 本地 121 個 commit 未 push，見 §Handoff                   |

## Stage 2-3：三篇翻譯，閘門全用 main 的尺跑

`article-health --profile=ci-deploy` 三篇 hard=0；`target-language-check` 0 fail；`untranslated-line-check` 0 處；`subcategory-translation-parity` 全過（三篇的 `subcategory` 都正確保留中文正典值，沒踩 9/08 那批十三語 1,646 篇的坑）。`author` 欄三篇都忠實沿用中文母稿（紅旗 #7 不成立，那條防的是投稿者把自己的稿偽裝成 Semiont 寫的，不是譯者照抄署名）。

兩件判給母稿、不算譯者的問題：#1706 德文零腳註，因為 `Nature/蘭嶼生態系.md` 中文版本來就零腳註；#1707 的 `Tiongkok daratan` 見下一節。

主權詞庫在 #1708 印地文報一處 medium `228 की साहित्यिक वापसी`——對過中文標題是「二二八的文學復現」，वापसी 是復現的合理譯法，**誤報**。三篇 `--merge` 合併，照既有慣例整批一則中文致謝留在最後一篇（[#1708 留言](https://github.com/frank890417/taiwan-md/pull/1708#issuecomment-5627634956)）。

## 追上游一：主權的尺全架在譯文那側，這次的源頭在中文母稿

`Tiongkok daratan` 是照 `Culture/台灣製香文化與香腳原鄉.md` 第 56／93 行的「大陸低價香品」「來自中國大陸的低價香品」翻的，**譯者翻得對**。往外量：中文庫 **126 檔 / 233 處**「中國大陸」；同樣說法在譯文側已有 **1,052 檔 / 2,032 處**（fr 148、ru 141、es 129、pt 121、ko 99、ja 88、vi 87、en 84、ar 80、id 61、de 12、hi 2）。

三層防線（十二份 `TRANSLATION-{lang}.md` §6 對照表、翻譯 prompt 的輸入端閘門、`sovereignty-lexicon-check.py` 的輸出端盤點）全部預設洩漏發生在翻譯那一步。中文母稿那側 `grep` 過 `docs/editorial/`、`MANIFESTO.md`、`docs/taxonomy/`、`TERMINOLOGY.md`：**零命中，沒有立場也沒有尺**。MANIFESTO §自稱處理的是「怎麼稱呼自己」，這是同一個主權面沒寫過的另一半。

**沒有一次 sed**：抽樣讀過那 233 處，相當比例是對的——護照條目的「前往中國大陸的入出境與停居留」是兩岸人民關係條例的法律語、「1948 年在中國大陸選出的代表」是歷史地理、鄧麗君與 bilibili 那幾處在描述 PRC 市場。要換的是編輯敘事聲音那類。立場本身命中政治立場、存量命中 >50 檔，**雙重 reserve** → [OBSERVER-QUEUE #54](../OBSERVER-QUEUE.md) 附三選項與成本。

## 追上游二：#1705 是誤報，而誤報的看門狗比沒有看門狗更糟

看門狗昨夜 01:48 看到一筆 `Refresh token expired` 就開 critical issue，說「在有人重新登入之前飛輪等於停轉」，要哲宇跑去實體機。對 `main.log` 的實際狀況：該字樣**只有那一筆**，`session_stale_relogin` 與 `Cannot start session` **各 0 筆**；之後六條排程全部 `Spawning` 並拿到 `Confirmed task run`（embeddings 05:06 / routine-sync 05:36 / data-refresh 06:09 / spore-harvest 06:34 / feedback-triage 07:05 / 本 session 08:39），八月空窗的招牌 `Cleared stale pending dispatch` **0 筆**，commit 也一一對得上。登入日 2026-08-28，今天第 14 天。**飛輪一秒沒停。**

病在告警條件把三個字樣當等價：前兩個是「這個 session 被擋回去了」，`Refresh token expired` 只是「這一次 refresh 失敗」。更要緊的是它沒對自己套用催生它的那條教訓——檔頭引的 `reports/mouhouse-blackout-root-cause-2026-09-05.md` 結論就是「有效的尺只有 fire 之後有沒有 commit」，而它量的是 token 事件這個替身。

**已修**：命中後查最後一筆之後有沒有 `Confirmed task run`、有沒有 `Cleared stale pending dispatch`。判準刻意保守，**只有拿到活著的正面證據才降級，絕不因為沒看到證據而降級**（窗口內沒排程 fire 時 `confirmed_after` 本來就是 0，那時維持 critical 是對的，per REFLEXES #85）。四情境實測：真斷線 critical ✅／本次 transient ok ✅／混合訊號 critical ✅／零證據 critical ✅。repo 與 `~/.local/bin/taiwanmd-auth-watchdog.sh` 安裝副本同步（造它的跟裝它的是兩個代謝，只改 repo 那份等於沒改）。#1705 附證據鏈 close。

## 追上游三：連結檢查器對空的 dist 印 PASSED

在 `origin/main` 的乾淨 worktree 上跑 `verify_internal_links.py`，得到 `Gated ratio 0.00% [0/0]` 與 `PASSED`、exit 0。**0/0 不是通過，是沒量到**——worktree 沒 build 過就沒有 `dist/`。而這支檔案第 36 行的 THRESHOLD 註記自己記著這個坑：「第一次（不完整 dist 抽樣 0.00%）→ 設 2.0 — 錯，量測基底是平行 build 寫到一半的 dist」，當年那個假讀數還被寫進閾值。

**已修**：0 頁或 0 連結判 `NOT-MEASURED`、exit 2（跟 FAIL 的 1 分開，呼叫端要能區分「壞了」與「沒量到」），並印出該去跑 build。空 dist 與真 dist 都測過，真 dist 讀數不變（0.27% PASS / exit 0），本表的 broken-link 那列用的就是這次真量的數字。

這兩支同一天現形，共同形狀是**知識留在註解層，沒有下沉到控制流**，已進 LESSONS `self-documented-trap-with-no-exit`（vc=2）。

## Discussion #1704：頁面其實活著，只是站內沒有路通到它

idlccp1984 問「為什麼沒有請求且頁面沒有發佈」。查證：[PR #1453](https://github.com/frank890417/taiwan-md/pull/1453) 已於 2026-09-10 00:50 UTC merged，`/exams/` **HTTP 200**，實際載入確認倒數計時、六科自由選考、規模數據、九張人物卡都正常渲染，sitemap 也有。缺的是入口：`Header.astro` 八個導覽項目沒有它，全 repo 指向 `/exams` 的連結只有它自己的模板。

順帶重查 9/5 fortnight-review 拍板 B「先不開站」的理由（七張人物卡只有維基與百度百科撐著）：**現在模板裡百度 0 處、維基 0 處**，引的是大考中心（6）、招聯會、甄選會、教育部 nsdua、collego、台灣事實查核中心、聯合報。**那個 blocker 是投稿者自己那支 PR 解掉的，紀錄還停在舊狀態。** 導覽列放哪、叫什麼、十三語 UI 字串怎麼補是資訊架構與品牌面的決定 → [OBSERVER-QUEUE #55](../OBSERVER-QUEUE.md)，非 🔒，14 天 default。已據實回覆投稿者並明說這是等一個決定、不是沒有人記得，不承諾時程。

## Stage 4：Quality gate

| Gate                                        | 結果                                                                  |
| ------------------------------------------- | --------------------------------------------------------------------- |
| open issues 都有 status label / assignee    | ✅ 3 則均有                                                           |
| open PRs ≤ 5d age 都有 review comment       | ✅ 0 open（3 篇全 merged + 整批一則致謝）                             |
| broken-link gated ratio < 7%                | ✅ 0.27%（真 dist 實測；worktree 那次的 0/0 已改判 NOT-MEASURED）     |
| build green                                 | ✅ 7 條 workflow 全綠                                                 |
| BECOME ACK 一行記憶體頂                     | ✅                                                                    |
| 連續空場 ≥ 3 cycle 有 LESSONS entry         | ⏭️ 不適用（本輪非空場，vc=0）                                         |
| **有 fresh issue 的 cycle，至少一件被修掉** | ✅ #1705 追到根因、修了看門狗、close；另修 `verify_internal_links.py` |

## Handoff 三態

- [ ] **未推送佇列擴大到 121 個本地 commit**（ahead121/behind130，真分岔）：babel dispatcher 第五夜仍在跑（六個 writer process）。本班新增 1 個 commit 同樣不 push，比照 9/09 起各班慣例，留給 dispatcher 收工、PID 消失後第一個能安全碰 git 的 session 用 `git pull --rebase origin main` 統一處理。**這輪要注意的是規模在長**：昨天 ahead101 → 今晨 ahead109 → 現在 121，而 origin/main 已約 22 小時沒收到新 commit，站上內容跟本機差一天。這件事的結構面已經是 [OBSERVER-QUEUE #53](../OBSERVER-QUEUE.md)（babel-nightly cron 語意三選一），本條只記規模。
- [ ] **LESSONS `self-documented-trap-with-no-exit` 的機械化起點還沒做**：候選是 grep `scripts/` 裡註解含「錯 / 假 / 坑 / 不完整 / 誤報」的檢查器，逐支確認有沒有對應 early-exit。今天只修了撞到的兩支，沒有掃過其他的。
- ⏳ **blocked — [OBSERVER-QUEUE #54](../OBSERVER-QUEUE.md)（中文母稿「中國大陸」立場）**：🔒紅線，等哲宇。在那之前不動任何一篇，也不要有 session 覺得「順手改幾個字」——那 233 處有相當比例改了會錯。
- ⏳ **blocked — [OBSERVER-QUEUE #55](../OBSERVER-QUEUE.md)（`/exams/` 導覽入口）**：非 🔒，14 天 default（2026-09-25）採 B（掛 explore 子項）。投稿者已知情。
- ⏳ blocked — #1678 等〈生態多樣性〉重寫完才 close（上一班寫明的條件，未變）；#1609 等《郭淑姿日記》一二冊調閱，館藏核對是館外做不到的事。
- [x] ~~retired — #1705 mouhouse 登入過期~~ by 本 session：誤報，看門狗已修並驗證，close。**下一次真的要登入是 2026-09-27 前後**（登入日 08-28 + 30 天），看門狗會在第 25 天（約 09-22）自己發 warn，不需要有人記得。

## 給下一個 session

如果你是 dispatcher 收工後第一個進來的：先 `git pull --rebase origin main`，MEMORY.md 與 LESSONS-INBOX.md 的 anchor 會衝突，**兩邊的 entry 都保留**，不要選邊。
