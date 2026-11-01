---
title: 'twmd-maintainer-daily — 2026-10-21'
description: '三個 ready PR 全收，CI 紅燈當班修綠；補回 13 個標題缺的空白；查交接時撞到 404 帳本的日期欄名錯一天'
type: 'session-memory'
status: 'log'
current_version: 'v1.0'
last_updated: 2026-10-21
last_session: '2026-10-21-090944-twmd-maintainer-daily'
session_id: '2026-10-21-090944-twmd-maintainer-daily'
session_span: '2026-10-21 08:30–09:10 (台北)'
trigger: 'cron routine twmd-maintainer-daily'
observer: '無（cron，哲宇最後在場 2026-10-20）'
beat_coverage: 'Stage 1-4（MAINTAINER-PIPELINE）'
---

✅ BECOME ack: mode=review / 8 organ 最低=🛡️免疫 59（即時 consciousness-snapshot.sh）/ Q13 anti-bias=PASS / Q14 cross-session continuity=PASS

Review mode self-test 12 題（表宣稱 11，實際打勾 12，見下方殼核漂移）全過才進 Stage 1。wake-context 11 段 251,458 bytes 讀到 `wake:END` sentinel，selftest 11 項全綠。

## Stage 1 — SCAN

| 項目              | 讀數                                                                                                         |
| ----------------- | ------------------------------------------------------------------------------------------------------------ |
| 本機 vs origin    | `0 0` 無分岔（工作樹 7 檔全是 babel 在寫，`ACTOR_BUSY` pid 13250/74210）                                     |
| open PR           | 5（**ready 3**：#1885 #1883 #1881；draft 2：#1884 #1880）                                                    |
| open issue        | 7（fresh 1：#1882）                                                                                          |
| 過去 24hr cron    | 10 條 fire，晨鏈全到（babel／routine-sync／embeddings／refresh／harvest／feedback-triage）                   |
| 過去 48hr commits | 約 90 條                                                                                                     |
| CI main           | 13 條 active workflow，**RED 1**（Engineering contracts）＋ OFF-BRANCH 失敗 1（npm-publish-cli，#1789 在等） |
| 免疫器官          | 59（最大缺口 review_coverage 18.5）                                                                          |

ready 3 < 5，未觸發 High-stake 升 Full。

## Stage 2-3 — ACT

**CI 紅燈當班修綠**（`0bfa5b352`）：`npm-audit-sweep.sh` 五道一次報完，紅在第一道（repo 根 vite high）所以後面四道沒跑。兩個路徑各升 vite 8.2.2 → 8.3.4（同大版本內，`fix=minor` 照 §1.5c 本班做掉），只動 lockfile 不碰 node_modules（babel worker 正在用那棵樹）。修完五道全綠。

**#1885 tool bugfix — merge + 接著修**（tboydar）
兩個 bug 都自己重現過，都是真的：擋掉 `import yaml` 後 `tags` 確實變空字串（跨行形狀全庫 11,682 檔）；`/usr/bin/python3` 是 3.9，`article-health` 掛 `tomllib`、`check-canonical-frontmatter` 掛 PEP 604，而 hook 把 exit≠0 一律讀成內容違規。`PY_BIN` 預設保留裸 `python3`、只在 resolver 成功時覆寫 → resolver 失敗時閘門照跑不會靜默變 no-op，設計正確。隔離 worktree 驗四種組合：主幹 loader 無 PyYAML 紅、PR loader 無 PyYAML exit 0、PR loader 有 PyYAML exit 0 無回歸，全套 799 passed 0 failed。

**PR 的三個數字跟我量到的不一樣，已在留言更正**：(一)「CI 一直跑 fallback」**不成立**——#1883 自己動的 `mini-taiwan-pulse.md`／`徐巧芯.md` 正是跨行形狀而它的 frontmatter-gate 是 pass，所以 ubuntu 的 python3 有 PyYAML；真正曝光面是本機 macOS hook，Bug 2 比它寫的更重要、Bug 1 在 CI 的急迫性比它寫的低。(二)「1,148 檔」實測 388。(三)「11,085 個 zh-TW 檔」那個形狀是 11,682 檔但絕大多數在譯文，zh-TW 全部才 1,146 篇。

**接著修掉它留下的引號不一致**（`c267c9664`）：全庫 15,044 份 frontmatter 對照 PyYAML，`tags` 54 檔／`title` 37 檔兩種讀法不同，三個成因——單引號 `''` 沒還原、切逗號正則看不見引號、plain scalar 詞中間撇號被當字串開頭。收斂成 `_unquote_scalar` ／ `_split_flow_items` 兩支 helper，八處剝引號全改走它們，補完 `tags`／`title` 不一致都是 0，加五個回歸測試。順手撈到真內容錯誤：〈拉阿魯哇族〉四個標籤被收在同一組引號裡（ja／en 都是五個），印地語版繼承同一形狀，一起修（`0692df4d6`）。`rationale` 還有 70 檔不同，是投稿者刻意加的頂格 nested mapping，驗過 PyYAML 讀 None 時那道 check 不會紅，兩種讀法都不翻轉判定，留著。

**#1883 SEO description ×5 — merge**（tboydar）：五篇的每個事實都回去對自己的正文，全部對得上（600 萬資本金、員工超過 6 萬、湯英伸、89,727 票、375 顆星…）。五篇 `--profile=ci-deploy` 全 hard=0。**自己的尺錯了一次並已更正**：先用原始字元數看到 206–280 以為超出 canonical 上限，跑 `--check=seo-meta` 才發現工具算 CJK 字數、印出來正好是它表裡的 147–165——差點把一個假 finding 寫進公開留言（REFLEXES #99 尺先驗再用）。

**#1881 白海豚 — merge + heal**（bugnimusic）：無 `lastHumanReview: true`／`researchReport`／`sporeLinks`，不是第五路徑。25 條腳註抽 6 條回原文對，逐字全中，含最容易寫歪的那條（70 隻是 99 年度起累積、60 隻才是剔除連續 5 年未見後的族群量，它寫進正文而不是直接寫「剩 60 隻」）。merge 後補它沒動到的：正文 3,900 → 5,584 字而 description 還是八月那句 47 字（低於下限 100），補成 136 字（`5728f17ca`）。剩一條 warn 留著：4 圖配 5,584 字 = 0.72/1k 低於帶下限 1.2/1k，補圖要查授權。

**#1884 掛 `reserved-for-observer`**：標題寫「待哲宇審」而沒有 label，照 §Step 3.0 v2.16 補上（散文會被下一班漏讀，label 每次 `gh pr list` 都看得到）。**#1880 不碰**：body 填滿 1,718 字、建立後有 push，三訊號第一條就不成立 = 真的還在寫，不是分割鈕記憶的意外。

**#1882 標題缺空白 — 修一半、量完另一半**（`a3138766b`）：投稿者報 77 檔／80 行，自己重掃一致。修掉 10 檔／13 行純缺空白的（en 1／hi 4／id 6／vi 1／ko 1），逐檔確認只動標題行、0 行正文被碰，`marked.lexer` 驗過修後回 heading。造 `heading-space-check.py`（唯讀、永遠 exit 0、plain 與 zh-residue 分開數）——新增硬閘門屬 BECOME 鐵律 10，升閘門留佇列。**正控制抓到尺自己的 bug**：`--root` 指 repo 外時 `relative_to` 直接炸，而 fixture 正好都在 repo 外，等於沒有正控制。剩 67 行全是 `##延伸阅读`，刻意不只補空白（補了等於把簡體中文升格成 H2，更顯眼不是更正確），併進 OBSERVER-QUEUE #112 當第四個獨立證據點（`254670060`），不開 #113。

**#1789 不重複回覆**（Step 2.4）：最新留言是維護者 10-11、無新 follow-up、距今 10 天未滿 30 天，根因（npm 權杖＝身份授權）已在佇列 #95 且精確。

## 交接查核 — 撞到帳本自己的時間戳在說謊

收 feedback-triage 的交接查「404 兩族 10-19 同日跳升、PR #1876 是否相關」，重查 10-16〜10-20 回收率出現 34%／**305%**／87%／35%。305% 不可能是降解。錯開一天對照四天全對上 → **`monitor-404.py` 的 `fetch_days()` 窗口是「現在往回數 24 小時」而列名取窗口起點那天**，收集器 22:03 跑，所以標 10-19 那列兩小時屬 10-19、二十二小時屬 10-20。已進 LESSONS `rolling-window-labelled-with-the-day-it-opened`（structural）。

**交接的答案**：

- `bad-encoding`：跳升落在 10-10／13／16／19 整齊三天間隔，**第四個 instance**，與昨天 `scraper-shaped-ua-lands-in-the-bucket-labelled-reader` 的掃描器結論一致（vc=4）。
- `duplicated-lang-prefix` **不是 PR #1876**：但**不是因為時序**——位移修正後那一跳落在合併當天，時序論證失效。站得住的是兩條跟日期無關的證據：hub 模板用 `${langUrlPrefix}/${category}/${slug}` 逐段組網址、產不出 `/koko/` 形狀；`dist/`（build 於合併後的 10-20 08:59）全站 `href` 零筆。
- **UA 組成已經答不出來**：帳本每族只存 `{count, bot, browser, empty}` 不存 UA 字串，而 `httpRequestsAdaptiveGroups` 重查是另一個抽樣（重算 10-19 `bad-encoding` 只剩 19 次 vs 帳本 2,475），算出的百分比一個都不能引用。昨天提的三類拆分方向對，但**必須在收集那刻做**，事後補不回來。

## Quality gate 7 條

| Gate                                   | 結果                                                      |
| -------------------------------------- | --------------------------------------------------------- |
| open issues 都有 status label/assignee | ⚠️ #1882 已認領；#1609／#615 長期 enhancement 無 assignee |
| open PR ≤5d 都有 review comment        | ✅ 三個 ready 全 merge＋留言；兩個 draft 各有處置         |
| broken-link gated ratio < 7%           | ⏭️ **本班未跑**（下方交接）                               |
| build green                            | ✅ main 的 Engineering contracts 本班修綠，其餘 GREEN     |
| BECOME ACK 一行在記憶體頂              | ✅                                                        |
| 連續空場 ≥3 cycle 有 LESSONS entry     | ✅ 不適用——**vc=0**，本班有 3 ready PR＋1 fresh issue     |
| 有 fresh issue 的 cycle 至少修一件     | ✅ #1882 修 13 行＋造尺（`a3138766b`）                    |
| 本機與 origin 無真分岔                 | ✅ `0 0`                                                  |

## Handoff 三態

- [x] ~~retired — CI main Engineering contracts 紅燈（`0bfa5b352` 五道全綠）~~
- [x] ~~retired — 交接「404 兩族 10-19 跳升、#1876 是否相關」已查完，答案在上方 §交接查核~~
- [ ] pending（收件席位 `twmd-maintainer-daily` 下一班）：**broken-link audit 本班未跑**。照 §Step 4.1 要走 `npm run sync:build`（不是 `npm run build`，競用來自 `prebuild:status`）再 `verify_internal_links.py`，而本班 babel 全程在寫（`ACTOR_BUSY` 四個 pid）。這是本班唯一漏掉的 gate，不是 skip 掉的理由寫錯——是真的沒跑。
- [ ] pending（收件席位 `twmd-self-evolve-weekly`，下次 10-25）：LESSONS `rolling-window-labelled-with-the-day-it-opened` 三個候選機械化（date_str 改窗口結束日／每族存 top_ua／帳本加 window_start-end 欄）。(a) 動既有時序欄位語意會回溯改變讀數，是決定不是 heal。
- [ ] pending（收件席位 `twmd-self-evolve-weekly`）：**BECOME §Step 9 殼核漂移**——Review mode 那一欄實際打勾 12 題（Q1-4／6-11／13-14），表尾「過題數」寫 **11**。本班按 12 題全答。同 dna-audit §S5 殼核不對稱家族，數字寫死會漂。
- [ ] pending（收件席位：哲宇）：OBSERVER-QUEUE **#112** 已補第四個證據點，67 行 `##延伸阅读` 的修法跟 ko／ja 簡體存量綁在一起等拍板（A／B／C）。
- ⏳ blocked（收件席位：哲宇，身份授權）：**#95** npm 權杖——`cli-v0.8.1` 發佈失敗已 10.4 天，#1789 的投稿者 a-lang 在等。換權杖後 `gh run rerun` 即可，不需 bump 版號。本班未重複回覆 #1789（Step 2.4）。
- ⏳ blocked（收件席位：哲宇在 app 排程頁，原樣傳遞）：`twmd-review-stock` 排程註冊（#86 已決）**今晚 22:00 是第一個時點**，錯過等 10-28；排程 `model` 欄（#93／#110）。
- [ ] pending（收件席位 `twmd-weekly-report-sun`）：Cloudflare 每日請求 10-17 高點是否延續——注意讀這份帳本的日期欄要照上方位移修正。
- [ ] pending（席位 `/twmd-routine`，vc=21）：殼的 `/Users/cheyuwu/` 改相對路徑、收官 `git add -u` 改 pathspec。本班第二十一次繞開：`ACTOR_BUSY`，只 stage 自己的檔。

## 本班沒做完的

`/twmd-finale` chain 只跑到 memory 這一步，**diary 與 evolve 未跑**（usage limit）。
