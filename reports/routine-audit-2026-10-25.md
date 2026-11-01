---
title: 'Routine audit 2026-10-25 (W43)'
description: '7-day 跨 routine 飛輪自審：601 commit，每日七條 routine 各跑滿 7 次，週日鏈四棒 10-25 全部落地，週額度沒有再黑。本週最大的碰撞發生在同一台機器的兩條 routine 之間：早班在共用 git 鎖路徑留下一般檔案，babel 三支工具等滿逾時十九小時，修好它的那一班反被告警記成沉默死亡。另有「一道紅燈讓下游檢查變 skipped」三週三次，升 distill_ready；營運機登入預估 10-26 過期'
type: 'audit-doc'
status: 'active'
current_version: 'v1.0'
last_updated: 2026-10-25
routine: 'twmd-routine-audit-weekly'
window: '2026-10-18 21:07 → 2026-10-25 21:07 (7d)'
related:
  - 'docs/pipelines/ROUTINE-AUDIT-PIPELINE.md'
  - 'docs/semiont/LESSONS-INBOX.md'
  - 'docs/semiont/OBSERVER-QUEUE.md'
  - 'docs/semiont/ROUTINE.md'
  - 'reports/routine-audit-2026-10-18.md'
---

# Routine audit 2026-10-25（W43）

第 22 次飛輪自審。本班在營運機（Exhibitions-Mac-mini）準時觸發，工作樹與 origin 同步，babel 寫入程序兩支在跑（ACTOR_BUSY），本班只動自己的四個檔。

上週報告收在「10-21 重置後看第一週的消耗速度」。答案是這週沒有黑：七條每日 routine 各跑滿七次，週日鏈四棒在 10-25 凌晨全部落地，W43 週報還順手補了 W42。額度這條線本週安靜，碰撞換到了別的地方。

---

## Executive summary（5 分鐘 read）

| 面向                         | 數字 / 說明                                                                                                                                                                                                                            |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 窗口                         | 2026-10-18 21:07 → 2026-10-25 21:07（7 day）                                                                                                                                                                                           |
| Commit 總量                  | 601 條（4,601 檔 / +629,904 / −315,621）。逐日：10-19 31、10-20 73、10-21 114、10-22 99、10-23 131、10-24 76、10-25 67                                                                                                                 |
| 分類                         | babel 統一調度器 290 條（48%）／routine 殼 37／manual 與 semiont 180／未分類 93                                                                                                                                                        |
| Heal                         | 67 條（11%）。上週 2.3%，這週哲宇 10-20〜10-23 在場（選舉專頁、識別系統、資料台灣 v2、CI 提速、〈一同走過從前〉），加上十二拍藝人條目巡邏                                                                                              |
| **具名 cron routine 健康度** | 每日七條（babel-nightly / embeddings / routine-sync / data-refresh-am / spore-harvest-am / feedback-triage / maintainer-daily）**各 7 次**。週日鏈 news-lens → weekly-report → distill → self-evolve 10-25 全到。supporters 1          |
| 全黑                         | 無。週額度 10-21 20:00 重置，本週沒有一次觸發撞額度                                                                                                                                                                                    |
| Collision                    | 偵測器讀 6 筆：5 筆是非 PR merge 群聚（哲宇在場日），1 筆 rescue-pattern 是相鄰誤配。真正的碰撞偵測器沒抓到，見 3A                                                                                                                     |
| 4-lens finding               | 3A：🔴 早班的假鎖讓 babel 卡十九小時，告警把受害者記成沉默死亡／3B：🟠 審庫存排程第一個時點已錯過、#110 模型欄仍未設、殼層路徑第 25 次繞開／3C：🟠 沉默死亡黃燈對一個做完事的班是錯的／3D：🟢 自己弄紅 deploy 當班退回，該留的燈都留著 |
| LESSONS                      | `downstream-steps-skipped-behind-a-red-read-as-one-unrelated-red` vc 1→3 **distill_ready**；`no-routine-can-register-a-routine` 補 instances vc=2；新增 `trace-window-shorter-than-the-run-it-watches` vc=1                            |
| OBSERVER-QUEUE               | 新增 #118：用語趨勢月班十月沒跑，黃燈掛 18 天過門檻，推薦併進 11-05                                                                                                                                                                    |
| 下週最大風險                 | **營運機登入預估 10-26 過期**（issue #1892）。上一次 08-23 過期，十三條 routine 照時間 fire、四天零 git 痕跡                                                                                                                           |

**這次審計最重要的一句話**：額度不再是瓶頸的第一週，飛輪最貴的一次停擺來自它自己的兩條 routine 共用一個鎖，而量停擺的那把尺記錯了是誰停的。

---

## 逐 routine 概況

| Routine                                                     | 本週實際次數 | 備註                                                                                                                                                                |
| ----------------------------------------------------------- | :----------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| babel 統一調度器（launchd 常駐，地端模型）                  |  290 commit  | 10-24 白天到 10-25 00:46 之間停擺（見 3A），恢復後當晚照常推送                                                                                                      |
| `twmd-babel-nightly`（cron 殼）                             |      7       | 四班是「續命／修復後續跑」：缺 slug 兩次（10-20 八篇、10-21 四篇）、OpenRouter 七個帳號儲值用完（10-22）、326 份少一整章送 #113（10-23）、假鎖搶救 34 篇（10-25）   |
| `semiont-heartbeat`（哲宇本機）                             |      14      | 12 拍在額度 lean 下各巡邏一篇藝人條目（李國修、林青霞、桂綸鎂、豬哥亮、張艾嘉、江蕙、周杰倫、蔡依林、蕭敬騰、林俊傑、陳映真等），錯誤率多落在三成                   |
| `twmd-maintainer-daily`                                     |      7       | 10-19 11 PR 升 Full；10-22 腳註 renderer 修 2,099 處；10-23 型別紅二十小時；10-24 audit 紅遮十一步、自己把 deploy 弄紅當班退回；10-25 收 #1898 東寧並改正多算的一年 |
| `twmd-data-refresh-am`                                      |      7       | 14 步每天全過、0 stale；10-24 那班在共用 git 鎖路徑留下一般檔案（3A），10-25 自己補 SOP（`345820aa5`）                                                              |
| `twmd-embeddings-nightly`                                   |      7       | 每夜 0 fail，向量 14,612 → 14,846，新文章隔一晚進索引                                                                                                               |
| `twmd-spore-harvest-am`                                     |      7       | 收割窗口空到第 63 天，10-21 #29 跨 1.7 萬照條件重抓；全週合法空班                                                                                                   |
| `twmd-feedback-triage`                                      |      7       | 10-22 沈伯洋民調（#1893）、10-24 用語庫〈仿冒品〉（#1902），其餘空佇列                                                                                              |
| `twmd-routine-sync`                                         |      7       | 每天十九份 prompt 全一致、十八條零漂移；審庫存 10-21 時點錯過，10-24 實測建立工具被核准閘擋下                                                                       |
| 週日鏈（news-lens → weekly-report → distill → self-evolve） |      4       | 全到。週報修掉「28 天 GA 總量寫成這週」；distill 消化十三條、新增 #103；self-evolve 接四件做三件，slug 缺口在 PR 上印黃字                                           |
| `twmd-supporters-weekly`                                    |      1       | 十月兩筆定額續扣入帳，#75 問題縮成 08／09 月                                                                                                                        |
| manual（哲宇本機）                                          |      8       | 選舉專頁上線、加開維護班、CI build 37→8.5 分、識別系統 v2、〈一同走過從前〉、資料台灣 v2/v2.1、22 縣市老化段                                                        |
| `twmd-routine-audit-weekly`                                 |  1（本次）   | —                                                                                                                                                                   |

---

## Cross-cutting patterns（4 lens）

### 3A. Collision lens：🔴 同一台機器的兩條 routine 共用一個鎖

**時間軸**（memory 與 commit 逐條對過）：

| 時刻（台北）       | 事件                                                                                                                                                           |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 10-24 06:10        | data-refresh-am 收官時手動拿共用鎖，在 `/tmp/taiwan-md-git.lock` 留下 0 bytes 一般檔案；babel 三支工具的協定是 mkdir 拿、rmdir 放，對檔案兩個都無效            |
| 10-24 08:46 起     | babel 每 14 分鐘印一行「等不到 git 鎖（180 秒）」；dispatcher 先清空待 commit 清單才去等鎖，那批譯文從此沒有路徑會再 commit。status 讀工作樹，缺口讀數照樣正常 |
| 10-25 00:42        | babel-nightly 殼觸發，查到鎖路徑的形狀不對                                                                                                                     |
| 10-25 00:46〜00:52 | 搶救 34 篇孤兒譯文（`2d4d982a8`）、補三篇 slug（`fcb2f6bd9`）、修 gitlock（`a306efe36`）                                                                       |
| 10-25 06:09        | data-refresh-am 自己的席位補 SOP：拿鎖用 `mkdir`、放鎖用 `rmdir`（`345820aa5`）                                                                                |
| 10-25 06:47        | babel-nightly 收官 memory（`f44b7dd63`），距觸發 6 小時 5 分                                                                                                   |

兩班各自的 memory 都寫得很準。data-refresh 那班的教訓是「自己留在共用空間的東西，交接表沒有一欄會問」，babel 那班是「等不到鎖先清空清單，等於把驗過的成品丟掉」。兩邊都當班修好了，所以本班不重開議題。

本班要補的是兩班各自看不到的那一層：**從頭到尾沒有任何一把尺把這件事記成碰撞**。`routine-audit.py` 的偵測器只看 60 分鐘內跨 routine 的 commit 對，這次的兩端隔了十八小時，中間那段是「沒有 commit」，偵測器量不到缺席。它這週唯一一筆 rescue-pattern 把 babel 搶救跟探測器配成一對，兩者毫無關係。

**下週的碰撞風險**：營運機登入預估 10-26 過期（issue #1892，看門狗 10-25 更新）。這一格只有哲宇做得到。08-23 那次的形狀是排程照時間 fire、`lastRunAt` 照樣更新、四天零 git 痕跡（`reports/mouhouse-blackout-root-cause-2026-09-05.md`）。如果它在 10-26 發生，下一次週日鏈（11-01）與本 routine 都會在同一個黑洞裡。

### 3B. Dormant entropy lens：🟠 寫進 SSOT 的機制，跟 runner 實際做得到的事

本週有三格是同一個形狀：文件描述了一個會發生的動作，而執行端從來沒有能力發生它。

1. **審庫存排程**。OBSERVER-QUEUE #86 拍板那列寫「營運機排程由 routine-sync 05:39 自動補建」，而建立排程的工具是人工核准閘，排程 session 一律被擋。10-21 第一個時點已錯過，10-28 是第二個。本班重跑 `routine-sync-check.py` 報 LIVE_ABSENT、`routine-stall-check.py` 報「排程器從沒聽過這條」，兩把尺都已經把收件人寫成哲宇，交接面這週是誠實的。缺的只剩那一下按鈕（#116）。
2. **排程模型欄**（#110，上週開）。本週沒有任何一班回報改動，仍是 18 條裡 3 條寫舊 Opus、15 條跑預設。
3. **殼層寫死 `/Users/cheyuwu/`**。maintainer handoff 記到第 25 次繞開。本 routine 的任務殼也寫這個路徑，而這台機器的家目錄是 `/Users/musebase`；能跑是靠一條沒有記載的符號連結（LESSONS `flywheel-path-layer-rests-on-one-undocumented-root-owned-symlink`）。

**舊帳持續**：counts-drift 44 drift／50 宣稱點（上週 33／48，漲了 11）；thick(hard) 殼 7 條；pipelines/README 少列 9 檔；ROUTINE-AUDIT-PIPELINE 仍寫 Sunday 12:00，實際排在 21:00。第六週，仍留 dna-checkup 一次清。counts-drift 的漲幅值得下一次 dna-checkup 先看，一週漲 11 條比過去五週的總和還多。

**缺 slug 這條線本週收斂了**：10-20、10-21、10-24、10-25 四次手補之後，10-25 self-evolve 把偵測搬到 PR 上（`4ab498cc0`）。下一次手補若仍發生，量的就是那行黃字有沒有人讀。

### 3C. Boundary input precision lens：🟠 沉默死亡那盞燈記錯了一班

dashboard 現在掛著「twmd-babel-nightly 沉默死亡：2026-10-24T16:42 fire 後 5.4h 零 git 痕跡」。本班對 git 逐條核：

- 觸發後 4 分鐘起就有三個 commit（搶救、補 slug、修鎖），但標題是 `[semiont] babel:`／`heal:`／`fix:`，`routine-liveness-check.py` 的 `TAG_PATTERNS` 只認 `twmd-babel`
- 帶標籤的 memory 檔在 06:47:58 落地，距觸發 6 小時 5 分；檢查器的追蹤窗口是固定 6 小時
- 告警在 06:05 產生，那時班還在跑。之後窗口關上，沒有任何路徑會把它翻回 traced；本班 13:09 重跑仍印 🔴

所以這一班被量成「死了」的理由，正好是它跑得夠久、把一件別人留下的事修完。告警的收件人寫的是 babel-nightly，而留下鎖的是另一席。新增 LESSONS `trace-window-shorter-than-the-run-it-watches`，候選修法（窗口外再找一次帶標籤的 memory 檔，改判 traced-late）指名 self-evolve。

**同 lens 其他讀數**：

- 週報 10-25 修掉「28 天 GA 總量寫成這週的流量」，寄出去好幾週了（`2de1b2b1f`）。標籤跟內容指的不是同一段時間，跟 distill 本週 fold 進 #38 的「滾動窗口用起點日期當列名」是同一族
- maintainer 10-25 收 #1898 東寧王國，投稿者標題「二十三年」比館方的二十一年多算一年；交接的結論是「交接傳得動判斷，傳不動測量」
- data-refresh 10-24 房貸負擔率只查到二手報導 41.46%，燈留著不關。這是本週最乾淨的一次邊界判斷
- 心跳十二拍巡邏的藝人條目，錯誤率反覆落在三成上下，錯的位置也穩定：獎項年份、出道經過、引語、補版面的軼事段。神經迴路 09-20 那條寫「還缺的那半：給巡邏一條 routine」，本週的十二筆是它的第二批數據

### 3D. Heal bidirectional lens：🟢 過度動手當班收回，該留的燈都留著

**過度動手，當班收回**：maintainer 10-24 照 SOP 用 `npm audit fix --package-lock-only` 收六條公告，lockfile 連帶把 astro 升到 7.4.2，main 的 deploy 紅三次、約 50 分鐘沒有部署成功。同班退回 astro、把 node 版本收成單一來源 `.nvmrc`，升級本身帶條件送 #115。它也留下了一條很準的 LESSONS：保護本機 node_modules 的旗標，同時讓本機驗不到 lockfile 的後果。

**保護動作的副作用**：data-refresh 的拿鎖本來是為了不跟 babel 撞，結果它留下的形狀把 babel 擋了十九小時。這一格兩邊都修了。

**正確的不動手**：房貸負擔率的燈留著；spore-harvest 10-24 對 #29 帶政治比較的引用記下不回；心跳在額度 lean 下每拍只巡一篇；10-21 重置前三小時那拍「沒有新目標就不為了用額度而扇出」。

**延遲**：審庫存排程。這不是任何一班拖的，收件人只有一個人，而那個人這週在場四天，忙的是別的事。10-28 是第二個時點。

**交接兌現**：上週本審計的 P0 兩條，#110 未動（只有哲宇按得到）；P1「週班落空的補跑」這週沒需要，因為沒有落空。self-evolve 10-25 接四件做三件，第四件送 #117，雙峰裡「做得掉的當天做掉」那一峰本週很完整。

---

## LESSONS-INBOX 候選

| Pattern                                                           | 動作                   | vc 後 | 嚴重度     | 說明                                                                                                                   |
| ----------------------------------------------------------------- | ---------------------- | :---: | ---------- | ---------------------------------------------------------------------------------------------------------------------- |
| `downstream-steps-skipped-behind-a-red-read-as-one-unrelated-red` | vc +2，補三個 instance |   3   | structural | 10-10 投稿 PR、10-23 型別紅蓋四道 audit、10-24 audit 紅蓋十一步。**distill_ready**；10-23、10-24 兩條獨立 entry 一起收 |
| `no-routine-can-register-a-routine`                               | 補 instances           |   2   | structural | routine-sync 10-24、weekly-report 10-25 兩次獨立探測；本班兩把尺的讀數是旁證不計                                       |
| `trace-window-shorter-than-the-run-it-watches`                    | 新 entry               |   1   | high       | 沉默死亡告警對一個跑了 6 小時 5 分的修復班判錯                                                                         |
| `usage-reading-from-a-host-that-is-not-the-one-that-stalls`       | 不動                   |   1   | high       | 本週沒有額度事件，沒有新 instance                                                                                      |

---

## 進化建議

### P0（本週內）

1. **營運機重新登入**（issue #1892，只有哲宇做得到，預估 10-26 過期）。登入後在 `~/.taiwanmd-auth-expiry` 寫新的登入日，看門狗才會重新倒數。
2. **審庫存排程在 app 建起來**（#116），10-28 22:00 是第二個時點。建好時順手在 app 設模型（#110），兩件在同一個頁面。

### P1（兩週內）

3. **liveness-check 的 traced-late 判態**：窗口外再找一次帶標籤的 memory 檔。零判斷、一個函式，收件 self-evolve-weekly。
4. **`ci-main-health.sh` 印 skipped 步數**：distill 收 `downstream-steps-skipped…` 時一起落地，三條 entry 的候選機械化寫的是同一件事。

### P2（觀察）

5. counts-drift 一週漲 11 條，下次 dna-checkup 先看是哪一批宣稱點。
6. 心跳巡邏的藝人條目錯誤率三成，加上 09-20 那批的 36–47%，夠支撐「給巡邏一條 routine」那個決定了。這是排程設計，屬 Full mode 與哲宇的範圍，本班只記數字。

### P3（純記錄）

7. 殼層路徑、pipeline 排程時刻、README 索引，第六週，留 dna-checkup。

---

## 收官

本班沒有改任何 pipeline、工具或排程。動到的檔：本報告、LESSONS-INBOX（一條 vc 升 3、一條補 instances、一條新 entry）、OBSERVER-QUEUE #118、memory 與索引。

🧬
