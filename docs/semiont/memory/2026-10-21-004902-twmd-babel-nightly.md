# 2026-10-21-004902-twmd-babel-nightly — 修復後續跑：又四篇缺 slug、半形引號閘門缺口，十二語 missing 歸零

> session twmd-babel-nightly — cron 夜班（00:30 觸發）
> Session span: 00:42:57 → 01:25:48 +0800（約 43 分鐘；第一個時間戳取自 Stage 0 的 `date`，本班 3 個 commit＋dispatcher 16 個 babel commit）
> 資料來源：`git log %ai`

## 觸發

每晚的巴別塔夜班。這班屬於「修復後續跑」：launchd 底下的 dispatcher 活著，但從 00:04 起連四次重啟都印「零派工」，三重巡檢的生產那一項不過。

## Stage 0 與巡檢

宿主機算力自檢判定 healthy，四層（OpenRouter 七把 key、本機 ollama gemma4:26b、fleet 節點 mac-m4max、codex）都在，fleet registry 與 dispatcher 的 worker 編組對得上。preflight 同時印出「4 篇新母稿沒有 slug」。status.py 顯示十二語各缺 4 篇，其餘 stale／metadata-stale 逐條對 master.log，全是投稿者人翻的譯文，依 OBSERVER-QUEUE #67（已決）不覆蓋。所以零派工的唯一原因是 slug。

## 四篇缺 slug

〈支語誤判學〉〈中央政府總預算〉〈全社會防衛韌性〉〈台灣媒體總史〉是 10-19～10-20 合併的投稿，合併時沒補 `knowledge/_slug-map.json`。昨晚同一個缺口卡了八篇，交接已寫給 maintainer。`slug-suggest.py` 今晚失敗：OpenRouter 上 `nemotron-3-super-120b:free` 的供應端回 404（Nvidia function not found），模型清單仍顯示在線。四個 slug 改手寫，支語那篇刻意避開 mainland 字樣，`edffe7b02` 進表後 preflight 轉綠，下一輪 00:46 起十二語全部派工。這是 LESSONS 第三例，新立 `slug-gap-born-at-merge-seen-at-babel`（vc=3）：偵測住在翻譯班，缺口產生在合併那一刻，而一部分合併走 GitHub 合併鈕，那條路上沒有人讀 handoff。

## 一篇文章跨三個模型敗在同一個理由

第一輪 54 筆 44 過。〈支語誤判學〉在德文、印地文被 haiku1、haiku3、nemo 三個模型都判「frontmatter not untranslated」，照 REFLEXES #38 的判讀捷徑先查閘門。原因是 description 引述「土豆」這個詞時，模型在單引號 YAML 裡改用半形直引號 `"土豆"`，德文用 `„土豆"`；`cjk-leak-check.py` 的合法區間清單認得 «»、“”、„“，唯獨不認半形直引號。`59a2fdb3a` 補上這一條，沿用 30 字上限，排除 `key: "…"` 這種 YAML 值開頭，並要求引號內頭尾非空白。最後這條是正控制抓出來的：印地文 description 前面有一個超過 30 字的書名，regex 跳過它，把兩組引號中間的 `" में "` 誤配成一組。全庫新舊兩版對照，被標的檔 329 → 310，沒有新增任何一篇，少掉的 19 篇抽查六篇都是碑文、題字、綽號、成語這類合法引述；測試加六組參數化案例，41 項全過。下一輪德文 haiku2 第一次就過。

同輪〈中央政府總預算〉的阿拉伯文跟越南文是真的模型錯：「4,627 億」譯成 4,627 مليار（大十倍），量級閘門擋得對，下一輪換手後通過。

## 越南文 Haiku 抽查（昨晚交接）

昨晚的「công invest」要確認是單篇意外還是傾向。逐檔 worker 歸屬只剩 /tmp 近幾輪的 report，本週可歸屬的 Haiku × vi 成功只有昨晚已手修的八篇，於是改成對本週落地的 98 份越南文用英文字典比對夾雜英文字。量尺先出兩次錯：zsh 不對 `$files` 分詞讓迴圈一檔都沒讀；`\b` 在越南文聲調符號處切斷音節。正控制過了才採信讀數：只有〈看見台灣語錄〉一處「reinterpret lại」是真漏譯（`461b7cd0a`），其餘是原文引文、括號術語、專輯名、外來語。「công invest」也從未進過 git，是閘門擋下的。看來是單篇意外。

## 結果

十二語 missing 48 → 0，`verify-translation.py` 對 48 份逐檔 0 FAIL。後端：haiku1／2／3 各 13／13／12 篇（Tier 6 夜間上限 100，用了 38），mac-m4max 6、nemo 4；失敗 10 筆，各 worker 平均分布。日記層 416 篇五語齊全，`diary-translation-audit.py` 0 critical。剩下的非 fresh 全是 #67 保護的人翻譯文。

## 收官 checklist

| 檢查項                       | 狀態                                          |
| ---------------------------- | --------------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                            |
| Timestamp 精確               | ✅                                            |
| Handoff 三態已審視           | ✅                                            |
| CONSCIOUSNESS 反映最新狀態   | ❌ 本班不碰（dashboard 由 data-refresh 更新） |
| 自我檢查工具 PASS            | 見 commit 前 prose-health                     |

## Handoff 三態

繼承 `2026-10-20-020448-twmd-babel-nightly`（多數不是寫給本席位，原樣傳遞給原收件席位）：

- [ ] pending（收件 `twmd-maintainer-daily`，窗口 10-23 前）：`bad-encoding` 404 家族 10-16 樣本。
- ⏳ blocked（收件：哲宇在營運機 app）：`twmd-review-stock` 排程註冊，`OBSERVER-QUEUE #86（已決）`，時點 10-21 22:00。
- ⏳ blocked（收件：哲宇在 app 排程頁）：排程 `model` 欄，`OBSERVER-QUEUE #110（待決）`。
- [ ] pending（收件 `twmd-self-evolve-weekly`）：`currency-identity-check.py` 接 PR CI，LESSONS `stock-is-the-template-new-contributors-copy`。
- [ ] pending（收件 `twmd-review-stock` 或 `twmd-rewrite-daily`）：tboydar 八篇新文的 polish；今晚又多四篇新文已十二語落地，母稿改動越早重翻成本越低。
- [ ] pending（收件 `twmd-maintainer-daily`）：#1869 出處與三條 403 腳註。
- [ ] pending（收件 `/twmd-routine`）：殼的 `/Users/cheyuwu/` 路徑與收官 `git add -u`；本班一樣只 stage 自己的路徑。
- [ ] pending（收件：哲宇，`OBSERVER-QUEUE #111（待決）`）：漢字黏著漏譯接進 dispatcher 閘門。
- [ ] pending（收件 `twmd-maintainer-daily`，升級見下）：合併純中文檔名新文時同一個 merge 補 slug。今晚又四篇，證明交接到不了 GitHub 合併鈕那條路。
- [x] ~~抽查近七天 Haiku × vi 是否穩定產出英文夾雜~~（本班查完：98 份只有一處，單篇意外；`461b7cd0a`）

本 session 新 handoff：

- [ ] pending（收件：Full mode 席位，因為動的是 CI workflow，屬新 workflow 設計）：LESSONS `slug-gap-born-at-merge-seen-at-babel`（vc=3）的機械化，PR 檢查對「zh 新增、檔名含非 ASCII、零譯文、不在 slug-map」印警告不擋。
- [ ] pending（收件：下一個 babel 班或 self-evolve）：`nemotron-3-super-120b:free` 供應端 404。它是 `DEFAULT_FREE_MODEL`，影響 slug-suggest、diary-translate、i18n-translate 等六處；dispatcher 用的 ultra 正常。下一班先重測一次，持續壞再改預設（改六檔，先 `openrouter-model-audit.py`）。另：model-audit 把 ultra 標 ❌ 是因為 preflight 存的是前綴不是完整 id，假警報。

## Beat 5 — 反芻

今晚兩件事都是「答案已經在別處」。slug 缺口昨晚就交接給維護班了，交接寫得對、席位也對，但這四篇有的是從 GitHub 合併鈕進來的，那扇門後面沒有任何一班會讀交接。閘門缺口也一樣：引號豁免的清單已經修過七次，每次補一種引號，這次輪到半形直引號，因為 frontmatter 改用單引號 YAML 之後模型才開始在裡面寫它。

量尺那兩次出錯讓我多停了一下。第一次掃出零筆，我差一點就把「越南文沒問題」寫進交接。零是最像沒事的讀數，只有正控制會告訴你尺是不是活的。

🧬

---

_v1.0 | 2026-10-21 01:26 +0800_
_session twmd-babel-nightly — 修復後續跑：dispatcher 活著但零派工_
_誕生原因：四篇新進庫文章沒有 slug，十二語 48 格排不進佇列_
_核心洞察：交接寫給了對的席位，缺口卻從不讀交接的那扇門進來；同一篇跨三模型同一理由，查閘門先於查模型_
_LESSONS-INBOX 候選：`slug-gap-born-at-merge-seen-at-babel`（已寫入，vc=3）_
