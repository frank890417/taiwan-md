---
title: '2026-10-11-085937-twmd-maintainer-daily'
description: '投稿佇列空、CI 全綠，而兩支尺各自把「這把尺不該判它」實作成「沒有人看它」——一次失敗的發佈躺了十小時、一條沒註冊的 routine 把告警單釘開；404 重複語言前綴收成獨立家族發 50 條 301'
type: 'session-log'
status: 'log'
apoptosis: 'never'
current_version: 'v1.0'
last_updated: 2026-10-11
---

# 2026-10-11-085937-twmd-maintainer-daily — 把某類對象排除出判定是對的，而那行程式碼順手把觀察也關掉了

> session twmd-maintainer-daily — cron 排程（am 08:30）
> Session span: 08:30 → 09:40 +0800（約 70 分鐘）
> 資料來源：`git log %ai` + `gh pr/issue/run/api` + `scripts/tools/{consciousness-snapshot,wake-context,ci-main-health,routine-status,routine-stall-check,monitor-404,verify_internal_links,observer-queue-lint,lib/check-parallel-actor}` + `npm run sync:build` 現跑的 dist + CF GraphQL 404 查詢 + npm registry

✅ BECOME ack: mode=review（未命中任何 high-stake 升 Full 條件）/ 8 organ 最低=🛡️59 免疫（即時 `consciousness-snapshot.sh`：🫀90 🛡️59 🧬95 🦴90 🫁85 🧫100 👁️90 🌐92）/ Q13 anti-bias=PASS / Q14 cross-session continuity=PASS

## 觸發與 mode 判定

每日 maintainer 班。`gh pr list --state open` 回 **0**（ready 0 / draft 0——昨班合併了七篇，佇列真的清空了），`gh issue list` 回 5 條。PR 數 0 所以沒命中 high-stake #1，**本班有意識地沒去動任何閾值**（兩個閾值問題都轉佇列，見下），所以 high-stake #3 也沒命中，review mode 全程成立。

`wake-context.py` 落檔 291,213 bytes，分頁讀到末行 `wake:END` sentinel，11 段 selftest 全綠。分岔檢查開場 `8 0`（純領先，Stage 1.1b 不觸發）。`check-parallel-actor.sh` 回 `ACTOR_BUSY`（babel dispatcher + push-every + 一支 ko 翻譯共三個寫入者），全程據此守 commit 範圍。

刻意沒載的：`ARTICLE-INBOX` 與 `SPORE-INBOX` 全文（寫文與孢子的 intake buffer，對 PR/issue triage 不載重，count 已在 groundtruth）。寫在這裡是因為「評估後決定不做」要寫明理由。

## 本班最重要的一件事：兩支尺的沉默有同一個形狀，而那個形狀來自一個正確的修補

今天 `ci-main-health.sh` 印 **RED 0**，13 條 workflow 沒有一條紅。那是真的，而它同時漏掉一件事：

**`cli-v0.8.1` 的 npm publish 昨天失敗了，而這張表一個字都沒提。**

追的順序是這樣的。issue #1789（投稿者 a-lang，8 月報的）在等一次發佈。10-08 那班核過它的時間軸、查到「`cli/package.json` 早就是 0.8.1、tag 止於 cli-v0.8.0」。本班回頭看現況，發現 tag **已經推了**（10-10，哲宇在場那班），workflow 也跑了——

```
gh run list --workflow=npm-publish-cli.yml
  failure  2026-10-10T14:40Z  cli-v0.8.1
npm view taiwanmd version → 0.8.0
```

失敗在最後一步：`npm error 404 Not Found - PUT https://registry.npmjs.org/taiwanmd`。tarball 打包正常（50 檔、87.7 kB、version 0.8.1）、provenance 也簽進 sigstore 了，掛在 PUT。`taiwanmd` 這個套件明明存在，所以這個 404 不是找不到套件——npm 對沒有發佈權限的請求回 404 而不是 403，為的是不洩漏套件存不存在。**是憑證層**（token 失效／沒有這個套件的 publish 權限）。這一條昨天那班已經診斷出來並進了 OBSERVER-QUEUE **#95**（「`NPM_TOKEN`（06-05 設）已失效，只差哲宇換權杖或設 Trusted Publisher」），所以本班沒有重複開佇列列——但那份診斷只住在佇列裡，**issue 上一個字都沒有**，而等它的是一個外部投稿者。已補上一則完整根因留言。

真正要記的是為什麼它能躺十小時沒人看到。`ci-main-health.sh` 9-27 那班做了一個**正確**的修補：`push: {tags: [cli-v*]}` 永遠不會在分支上跑，拿 main 的尺量它只會誤報（當時真的誤報過「Translation PR Check 在 main 紅了 178 天」），於是標 `OFF-BRANCH`。判斷完全對。問題在下一行是 `continue`——**「不能用 main 的尺判它」被實作成「完全不看它」**，於是當天那張表印的是：

```
OFF-BRANCH      -         Publish CLI to npm
```

那個 `-` 讀起來像「這一格本來就沒有東西」。

同一班第二個獨立 instance，在另一支尺上：`routine-stall-check.py` 的 live-state skip 寫 `live_state.get(task_id) is False` 才跳過，所以「排程器從沒聽過這條」（鍵**缺席**，`None`）跟「排程器有它、而且開著」（`True`）走同一條路、印同一行字。`twmd-review-stock` 10-10 誕生、`ROUTINE.md` 排程表有它、三層檔案都在，而建排程那一步被核准閘門擋下留給哲宇——它的 WARN **永遠不會自己歸零**，而 `routine-stall-alert.yml` 的自動關閉只在 `exit 0` 跑。一條註冊缺口因此會把 #1788 永久釘開，每 20 小時再寫一則 WARN，而後面每一次**真的**停轉都讀起來像同一張老票。這條告警的整個設計目的是「綠燈靜默、只在異常時推播」。

兩個 instance 的共同形狀：**判定與觀察是兩件事，而把它們一起關掉的那行程式碼，當初是為了修一個真的假陽性才寫的——它的正確性就是沒有人回頭看它的原因。** 已升 LESSONS `correctly-scoping-a-ruler-out-becomes-never-looking`（vc=2，相關 #85／#82／#38／#52／#99）。

**兩個修法都只改觀察、不動判定**（所以都還在 review mode 的自主範圍裡）：

- `ci-main-health.sh`：仍不拿 main 的尺判 tag workflow（**不計入 RED、不影響 `--strict`**，假陽性不回來），但印出它最後一次執行的結論與年齡，失敗時加 🔴 與一行說明，總結列加「OFF-BRANCH 失敗 N」。現在那一行是 `OFF-BRANCH 🔴 10h Publish CLI to npm ↳ 最後一次不在 main 的執行失敗了（failure @ cli-v0.8.1）`。`--strict` 實測仍 exit 0。
- `routine-stall-check.py`：缺席得到自己的狀態 `unregistered` 與自己的符號 🆕，輸出明寫「處置不是查機器，是去 app 裡把排程建起來；在那之前它不會自己歸零」。**severity 與 exit code 都不變**（仍 warn／1）。3 個 pytest，含一條守「live-state 讀不到時不准宣稱排程器沒聽過」（那是 `None` 不是缺席）。

該不該讓這兩個訊號升級成會轉紅的閘門，是閾值決定 → **OBSERVER-QUEUE #100**，(a)(b) 各三選項＋成本，推薦兩者皆 C。

## 交接項做掉：404 重複語言前綴收成獨立家族

`404 同語言前綴雙寫家族` 這條交接從 10-08 起被四班原樣傳遞，收件席位一直寫 `twmd-maintainer-daily`。壓縮過的版本只剩那八個字，**連「要不要歸成獨立家族」這個問題本身都掉了**（原句在 10-10 data-refresh 那班：「404 監測同語言前綴無斜線的重複形狀（`/ptpt/` 等）要不要歸成獨立家族」）——`handoff-compression-fuses-items-and-inherits-a-dead-reference` 的現場第二例。

量了之後答案是肯定的，而且比交接以為的大一個量級：

- 形狀：`/enen/society/...`、`/arar/politics/...`——語言碼貼了兩次、中間沒有斜線。全部落在 `unknown`（當日 3,468 的一小角，所以不會觸發任何「單一路徑 > 100/day」黃燈）。
- **拿掉一份就是這個語言自己的真實頁面，9/9 命中**（不是 zh 母稿，是同語言的 URL），所以修法是機械的 301，屬可解析家族。
- 我們自己的產出不發這個形狀：對 `public/`、`src/data/`、`config/` 148 檔掃過，0 命中。referrer 在外部或歷史，301 是我們這側唯一拿得到的修法。

已 ship：`monitor-404.py` 新增 `duplicated-lang-prefix` 家族（suggest 只在「拿掉一份之後真的存在」時才給，不存在留 `None`——家族講形狀、可修性是另一件事，混在一起下游會發出指向 404 的 301），進 `RESOLVABLE_FAMILIES`，並加進 `generate-redirects.mjs` 的 `ALLOWED_FAMILIES`。**50 條 301 落地**（`PER_FAMILY_LIMIT` 封頂），data-driven 條目 60→110、總條數 234→284（上限 2000）。

順手把一個會漂的東西釘住：那條黃燈的說明文字原本手抄家族名單，新增家族時不會跟著改——於是警報是對的、它的說明少列一族（9-18 data-refresh 連兩夜把真警報讀成「工具寫反」就是這個形狀）。改成從 `RESOLVABLE_FAMILIES` 現算，加一條測試釘住。

**尺先驗再用**（#99）：新規則過三道正控制才引用它的讀數——9 條實測路徑 9/9 分類正確且 suggest 正確；對 **14,638 條真實 route 字串與 5,595 條 dist 頁面路徑 0 誤判**；鄰居不被搶（單一前綴→`phantom`、兩個不同語言碼→`unknown`、`/en/en/` 帶斜線→既有分支、拿掉後不存在→家族成立但 suggest `None`）。

### 這裡踩了一個自己的坑，而且是我自己造的

為了讓新分類生效，我對 `monitor-404.py` 重跑 `--days 2` 回頭查 10-09。**同一天的 `total_404` 從存檔的 5,505 掉到 3,815（−31%），兩次 `truncated` 都是 false。** 不是我們截斷，是 CF 那側對舊日資料的保存顆粒隨時間變粗。而原本 `upsert_state` 無條件覆蓋，所以那一次重查就在 60 天趨勢上挖了一個 31% 的假低點、不留任何痕跡。

更要記的是它怎麼騙人：母體換掉之後，「`unknown` 從 3,468 掉到 1,214」**讀起來像新分類器一次收掉 2,254 條**。實際新家族只拿走 655，剩下約 1,600 是母體自己縮掉的。方向偏小，長相剛好是「修補生效了」——我差一步就把那個數字當成本班的成果寫進這份 memory。

- 已 ship 守門：既有那天總數更高且它自己沒被截斷 → 保留既有並印一行說為什麼，要覆蓋得明確加 `--force-requery`（5 個 pytest，含「既有那天撞過 10000 列上限時可以被換掉」）。
- 已還原被我蓋掉的 10-09 那列（從備份取回 5,505，趨勢序列的總數恢復可比）。那列的家族分類因此仍是舊的（`duplicated-lang-prefix` 記在 `unknown` 裡），**不可事後回推**——家族比例與總數在那一天分屬兩次不同的讀數。
- **可引用的乾淨讀數是 10-10**（從未被查過、無重查混淆）：`duplicated-lang-prefix` **742 / 6,205 = 12.0%**，第四大家族，bot 681 / browser 61。
- 連帶更正本班自己一個早期誤讀：從 `top_paths` 的 9 條樣本看，UA 全是桌機 Chrome，我一度寫下「這些是真實讀者在吃 404」。全家族攤開是 **bot 佔九成**。`top_paths` 有全域 top-N 與家族封頂兩重裁切，**用它估家族量級會低估約 17 倍**（38 vs 655）。
- 已進 LESSONS 既有 pattern `requery-with-a-new-shape-can-swap-the-population-not-just-the-window` 的 instances（**vc 1→2**，時間軸變體：換的不是取數形狀，是被查的那一天的新舊），不開新 entry。

## Issue 處置（五條，逐條判斷→評估→執行）

| issue                                                  | 處置                          | 依據                                                                                                                                                                                                                                                                                                                                |
| ------------------------------------------------------ | ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **#1790** `hasLocalData()` 在只有 `.git` 的目錄回 true | **已 close** + 核過的讀數留言 | `git merge-base --is-ancestor e29eb0717 origin/main` 成立、測試檔在（10 vitest）。修補 10-08 就落地，票多開了三天＝對外看起來沒人理（§神經迴路「stale issue 已解未 close＝對外失聯」）。留言同時告知**修補還沒上 npm**，從 npm 裝的人仍碰得到這個 bug，並指向 #1789                                                                 |
| **#1789** 0.8.0 早於修補、請求發佈                     | **留著** + 根因留言           | 卡點換了：不再是「沒人推 tag」（已推），是**發佈憑證**。重跑不會有不同結果。換 npm token 屬身份授權，不可自授權 → 已在 OBSERVER-QUEUE #95（昨班），本班不重複開列                                                                                                                                                                   |
| **#1788** 週末反思鏈六條沒跑                           | **留著** + 現況留言           | 它等的 10-11 到了：四條今天都 fire（01:12／02:04／03:14／04:09），尺一綠、尺二對這四條印 🕐。另兩條（routine-audit 今晚 21:00、supporters 明天 01:00）週期還沒輪到。**第七個 WARN 是 review-stock 的註冊缺口，不會自己歸零**，修法見上。尺二仍 WARN 所以不手動 close（workflow 綠燈時自己會關；手動關會讓下一班 WARN 另開一張新票） |
| **#1609** 「無語」斷代被郭淑姿日記挑戰                 | **評估後不動，不留言**        | 前四則留言已把三條死路寫完（匿名 API 擋讀／頁面 `noindex` 無快取／館方無全文），只剩「註冊一個帳號」這個人的動作，已在 OBSERVER-QUEUE #85。最後一則 09-27，讀者無新 follow-up → Step 2.4 SKIP。再留第五則同向留言是噪音                                                                                                             |
| **#615** 視覺 UI/UX Umbrella                           | **不動**                      | umbrella 追蹤票，長期開著是設計如此，38 則留言，最後一則 09-12 為 idlccp1984 的載入問題給了實作層回覆。本班無新證據可加                                                                                                                                                                                                             |

## Stage 1 ground truth

| 面                | 讀數                                                                                                                                                     |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| open PR           | **0**（ready 0 / draft 0）——昨班合併七篇後佇列清空                                                                                                       |
| open issue        | 5 → **4**（close 了 #1790）                                                                                                                              |
| 過去 24hr commits | 10 條 routine fire 全到（babel／news-lens／weekly-report／distill／self-evolve／embeddings／routine-sync／data-refresh／spore-harvest／feedback-triage） |
| 過去 48hr commits | 近 300 筆，babel 十二語批次為主 + 10-10 哲宇在場清佇列 36 條                                                                                             |
| build             | `npm run sync:build` 現跑 exit 0，dist 齡 0.0h、19,335 頁                                                                                                |
| 斷鏈              | **gated 0.08% < 7% PASS**（all-langs 0.07%，1,018/1,377,536）。先前讀到的 0.14% 是 23.6h 的舊 dist，fresh 之後實際更好                                   |
| CI main           | 13 條 active：**RED 0 / BLOCKED 0 / UNKNOWN 0 / NEVER-ON-MAIN 0**，另新增一欄 **OFF-BRANCH 失敗 1**（就是上面那條 npm publish）                          |
| 免疫器官          | 🛡️**59**（最低），最大缺口 `review_coverage=19`，黃燈自 07-05                                                                                            |
| npm audit         | `npm-audit-sweep.sh` 未跑——`contracts` job 今天是 GREEN，本步驟的觸發條件是「contracts 紅了」，未成立                                                    |

## Quality gate（8 條）

| Gate                                                        | 結果                                                                                                                            |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| open issues 都有 status label / assignee                    | ✅ 4 條全有 label（#1788 routine-stall／#1789 bug／#1609 enhancement+from-feedback／#615 enhancement）                          |
| open PRs ≤ 5d age 都有 review comment                       | ✅ 不適用——0 open PR                                                                                                            |
| broken-link gated ratio < gate（7%）                        | ✅ 0.08%，fresh dist（齡 0.0h，非 STALE 非 BUILDING）                                                                           |
| build green                                                 | ✅ `sync:build` exit 0                                                                                                          |
| BECOME ACK 一行記憶體頂                                     | ✅ 見本檔第一段                                                                                                                 |
| 連續空場 ≥ 3 cycle 有 LESSONS entry                         | ✅ 不適用——**本班不是空場**：PR 佇列是空的，但 issue 面命中且有實際產出（1 close、2 留言、3 支工具修補、50 條 301）。vc=0       |
| 有 fresh issue 的 cycle，至少一件被修掉或明確寫出為什麼不修 | ✅ #1790 close（附核過的 hash）／#1789 根因查到底並指出憑證層／#1788 修掉讓它永久釘開的那個混維度／#1609 與 #615 明寫為什麼不動 |
| 本機與 origin 無真分岔                                      | ✅ 開場 `8 0`（純領先）                                                                                                         |

## Handoff 三態

繼承（非本班職權，原樣傳遞，明細不重抄，REFLEXES #74）：

- [ ] pending（收件席位：哲宇，對外溝通）：《海上的島》串文下 @idlcn89642026 的合作點名，草稿在 `docs/factory/SPORE-HARVESTS/batch-2026-10-11-1-spores.md`。
- [ ] pending（收件席位 `twmd-distill-weekly` 10-18）：LESSONS `threads-linkifier-swallows-cjk-before-url`、`narrative-log-fills-causation-no-gate-watches` 兩條仍未消化。
- ⏳ blocked（收件席位 `/twmd-routine`）：embeddings 改殼後隔兩晚生效的三選項。
- [ ] pending（哲宇在 app 操作）：`twmd-review-stock` 排程註冊（週三 22:00、Sonnet）。**本班補一條它的新代價**：在註冊完成前，它會讓 `routine-stall-check` 每一輪都 WARN、讓 #1788 無法自動關閉。現在它印 🆕 而不是混在真停轉裡，但缺口仍在。

本班做掉的：

- [x] ~~pending（收件席位 `twmd-maintainer-daily`）：404 同語言前綴雙寫家族~~ — **retired by 本班**：收成 `duplicated-lang-prefix` 獨立家族、進可解析名單與重導允許名單，50 條 301 落地，9 個 pytest。傳了四班的那個問題（「要不要歸成獨立家族」）答案是要。

本班新增：

- [ ] pending（收件席位：哲宇，`🔒閾值`）：**OBSERVER-QUEUE #100** — 「不在 main 上」與「排程器沒註冊」這兩種訊號該不該讓既有閘門轉紅。(a)(b) 各三選項、成本、推薦皆 C。不決策的代價：下一次發佈失敗照樣沒人看到；告警單被註冊缺口永久釘開。
- [ ] pending（收件席位 `twmd-distill-weekly` 10-18）：本班兩條 LESSONS——新 `correctly-scoping-a-ruler-out-becomes-never-looking`（**vc=2 同班兩個獨立 instance**，已達 distill 門檻）、既有 `requery-with-a-new-shape-can-swap-the-population-not-just-the-window`（**vc 1→2**）。
- [ ] pending（收件席位 `twmd-data-refresh-am`，零判斷）：明早 06:00 的 Step 2.5 會是新家族上線後第一次例行跑。**預期**：`duplicated-lang-prefix` 出現在家族表、`unknown` 少掉對應數量、`prebuild:redirects` 自動帶出當日 suggest。若它反而印出 `保留既有紀錄 total=…` 那行，表示 CF 對當日的讀數比既有低，照那行的指示判斷、不要加 `--force-requery` 繞過。
- [ ] pending（收件席位 `/twmd-routine` 或 Full mode，**延續**）：`git prune`（本班每個 git 指令仍印 unreachable loose objects 警告 + `.git/gc.log` 擋住自動 gc）。**本班補一條它為什麼一直沒被做掉**：這台是營運機，`check-parallel-actor.sh` 每一班都回 `ACTOR_BUSY`（今天是三個 babel 寫入者），而 DNA #35 禁在 sub-agent／平行寫入者跑期間做 destructive git ops——所以它不是沒人看到，是**每一班看到的時候條件都不成立**。要嘛挑一個 babel 停線的窗口，要嘛接受它得由停線那班順手做。
