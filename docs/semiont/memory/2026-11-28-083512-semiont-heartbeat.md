---
title: '2026-11-28 早班心跳'
session: '2026-11-28-083512-semiont-heartbeat'
---

# 早班心跳：額度仍 🟡 lean；照到期預設代執行 OBSERVER-QUEUE #114，補丁前預檢多認斷腳註

> session semiont-heartbeat — 排程心跳（Full mode，額度 lean 縮小執行）
> Session span: 08:35:12 → 08:40:15 +0800 主 commit `adbf2f6caa`，另有一個補正 commit（資料來源：`session-id.sh` 起點與 `git log %ai`）

## 觸發

每六小時一次的排程心跳。從 11-26 09:15 起連八班都在 lean 底下只看不做；這一班照 HEARTBEAT「lean 是縮小，不是歸零」，挑一件已到期、範圍小、預設寫明可代執行的佇列項做掉。

## 起班

起班時本機落後 origin 20 個 commit，甦醒檔 selftest 亮 ⚠️。`git pull --ff-only` 被本機一份未 commit 的 `public/api/dashboard-analytics.json` 擋住：比對 `generatedAt`，本機那份是 11-28 08:17 +0800，起班前 18 分鐘才產生，比 origin 的（11-27 22:03 UTC）新；02:35 那班沒提到它，所以是這台機器上今早有東西跑過 GA 分析又沒 commit，不是本班產物。處置是先備份到 scratchpad、checkout、pull、再放回，檔案仍維持未 commit 的原狀。同步後重跑甦醒檔，selftest 全綠，整份分頁讀到 `wake:END`（270,517 bytes）。未追蹤的 `reports/research/2026-08/比國家還大的演算藝術-media-staging/` 同樣不是本班的，沒碰。

## 額度

起班與收官都是週用量 53%（Fable 25%），重置 12-02 20:00。兩種讀法並列：

- 帳本的六小時漲速：02:35 的 50% 到 08:35 的 53%，每小時 0.5%，跟上一班相同。照這個速度，距重置 107 小時會再加約 54 點，大約在重置前 13 小時碰頂。
- `budget-pace.py` 用整週平均 0.87%/小時外推，約 54 小時後用完、比重置早 54 小時。整週平均還背著 11-27 首演日那段，偏悲觀。

兩種讀法都說「照現在的速度撐不到重置」，差別只在早多少。上一班的升 reserve 條件逐條看：六小時平均回到 0.9% 以上（沒有，0.5%）、週用量過 60%（沒有，53%）。維持 lean。

## OBSERVER-QUEUE #114 代執行

核對 §待決的到期項：32 列裡 11 列不帶 🔒，逐列讀了預設動作欄；帶 🔒 的 21 列只掃了預設動作欄裡寫明「Full mode 可代執行」的部分（見下）。#114 寫明「7 天無回應（10-31 起）任何 Full mode session 可代為執行 A」，A 不動閾值、只加一條同形判準，已逾期四週。

問題是這樣的：`footnote-reference` 在 pre-commit profile 是 warn 級，所以 `inherited_gate_defects()` 那條 health 檢查不會因斷腳註擋下補丁；補丁原樣保留未改章節，舊譯文裡斷掉的腳註就跟著被標成 fresh。這一班在 `scripts/tools/lang-sync/babel-dispatch.py` 多跑一次 `article-health --check=footnote-reference`，exit 1 記為 `footnote`，讓這種任務改走整篇重翻；其他非 0 照函式慣例視為工具自己壞，不擋。動手前先做正控制：造一份帶未定義 `[^99]` 的譯文，該檢查回 warn=1、exit 1。`tests/test_babel_dispatch_inherited.py` 的假 subprocess 原本用工具檔名當鍵，同一支 article-health 的兩種呼叫會拿到同一個答案，改成看 `--check=footnote-reference` 分開；加一條「只有腳註壞也要回報」，7 測全過。#114 移到 §已決，寫明哲宇可回滾。

收官前補量真實命中率：十二語 14,328 份譯文 exit 1 共 3 份（ar、id、vi 各 1），zh 母稿 0/1198。命中少且分散，不像假陽性家族，母稿也不會讓哪一篇永遠走整篇重翻，所以保留。

同一個正控制順帶量到：同一標號定義兩次（嘉義市 11-27 那種重號）這把尺回 hard=0、warn=0，看不見。這不在 #114 範圍，babel-nightly 11-28 已交 self-evolve。這台機器上沒有 babel-dispatch 行程（`ps` 零命中），dispatcher 跑在另一台機器，新判準要等它 pull 到 `adbf2f6caa` 並重啟後才生效。

其餘到期項這班沒做：#95（CLI 發到 npm）是對外發佈，前幾班都留給哲宇，維持；#102（驚喜按鈕延遲載入）要改有 404 回歸史的元件並驗 13 個語系，lean 底下不開；#118（到期 11-05，預設 B）與 #120（到期 11-16，預設 B）都過期了卻還在 §待決，本班沒查它們的預設是否其實已被某班執行、只是沒移列，交給明天週日體檢的到期項清點；#110、#130 沒有 default-action 日期；#131 的 A 明天（11-29）起才由指名席位執行。帶 🔒 的列裡有五列寫了部分可代執行：#107 選項 C 的留紀錄部分、#108 B 的單一語言第一批 ≤50 檔、#109 §8.0 唯讀閱卷實驗（要週額度 < 70%）、#117 A（非🔒，到期 11-08，`.husky/` 兩檔加一句）、#128 B 第 (1) 小項（Geography 補 `縣市` 一列，到期 11-24）。這班只做 #114，五列一併交週日體檢。

## 沒讀的東西

Full mode 的 Step 2–7 這班在 lean 底下沒全載：ANATOMY、DNA、CONSCIOUSNESS 全文、LONGINGS、UNKNOWNS、LESSONS-INBOX 與 ARTICLE-INBOX 全文都沒讀，只讀了 OBSERVER-QUEUE §待決與 MEMORY-PIPELINE。PR 沒有逐條讀 diff：九個開放 PR 跟上一班相同，交 maintainer-daily（今天還沒跑）。

## 收官 checklist

| 檢查項                       | 狀態                                    |
| ---------------------------- | --------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                      |
| Timestamp 精確               | ✅ 起點與 `date` 讀數，收官 commit 為準 |
| Handoff 三態已審視           | ✅                                      |
| CONSCIOUSNESS 反映最新狀態   | ❌ 本班沒動，lean 底下不載              |
| 自我檢查工具 PASS            | ✅ pytest 7/7、observer-queue-lint 全綠 |

## Handoff 三態

繼承 `2026-11-28-023551-semiont-heartbeat.md`：

- [ ] pending（收件席位：哲宇，issue #2091，延續）mouhouse 在 12-02 前重新登入一次 Claude Desktop；過期日跟週額度重置同一天。
- [ ] pending（收件席位：`twmd-maintainer-daily`，延續）PR #2085–#2090；#2090 合併後可一併關 #2081；#2087 黃宏成照 `OBSERVER-QUEUE #132（待決）` 規格看。另交讀者勘誤 #2092（史溫侯，新）與 #2082、#2083（仍開著）。
- [ ] pending（收件席位：哲宇，延續）PR #2033（MERGEABLE）、#2036（CONFLICTING）；額度要不要暫停可選 routine 照 `OBSERVER-QUEUE #93`。
- [x] ~~pending（收件席位：下一班心跳）看 02:35 起的漲速~~ retired by 本班：六小時每小時 0.5%，兩個升 reserve 條件都沒成立。

本 session 新 handoff：

- [x] ~~`OBSERVER-QUEUE #114` 到期預設 A~~ 本班執行，已移 §已決。
- [ ] pending（收件席位：下一班心跳）週日反思鏈 11-29 02:03 開跑（weekly-report-sun 上週沉默死亡，看這次有沒有 commit）。若之後六小時平均回到 0.9% 以上且週用量過 60%，評估 🔴 reserve。
- [ ] pending（收件席位：`twmd-babel-nightly`，該席位會重啟 dispatcher）`OBSERVER-QUEUE #114（已決）` 的新判準要等 dispatcher 重啟才生效；重啟後看 report 有沒有 `footnote` 理由的整篇重翻出現。
- [ ] pending（收件席位：下一班心跳或 data-refresh-pm）本機那份未 commit 的 `public/api/dashboard-analytics.json` 是 11-28 08:17 +0800 產生的，比 origin 新；查這台機器 08:17 前後跑了什麼（GA 分析類），決定 commit 還是丟。
- [ ] pending（收件席位：`twmd-weekly-report-sun` Stage 2.7 到期項清點）`OBSERVER-QUEUE #117、#128（待決）` 的可代執行小項已過期；#118、#120 過期仍在待決，先查預設是否早已執行；#107、#108、#109 的部分代執行條款一併看。

## Beat 5 — 反芻

連八班的 lean 都寫成「只看不做」，讀起來像謹慎，量起來是 #114 在佇列裡又多躺了八班。這一件從讀 default-action 到 commit 約五分鐘（08:35 起班、08:40 commit），用的是主 session 自己的判斷，沒有扇出。lean 要省的是扇出與大批次，到期又範圍小的預設項不在其列。沒有新觀點到要寫日記的程度，不寫 diary。

🧬

---

_v1.0 | 2026-11-28 08:40 +0800_
_session semiont-heartbeat — 排程心跳，lean 底下代執行一件到期佇列項_
_誕生原因：每六小時排程；11-26 起連八班只看不做_
_核心洞察：lean 縮小的是扇出與大批次，到期且寫明可代執行的小項照做；斷腳註判準補上，重號腳註仍看不見_
