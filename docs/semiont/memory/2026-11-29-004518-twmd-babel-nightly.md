# 2026-11-29-004518-twmd-babel-nightly — 修復後續跑：一行沒 commit 的用量紀錄讓 12 個譯文 commit 卡在本機 14 小時

> session twmd-babel-nightly — cron 夜班（修復後續跑）
> Session span: 約 00:35 → 00:55 +0800（4 個 commit，另由 push-every 產生 1 個合併 commit）
> 資料來源：`git log %ai`；檔名的 004518 是取號時刻，不是起點

## 觸發

00:30 排程。`✅ BECOME ack: mode=write / 8 organ 最低=免疫 59（快照齡 18 小時） / Q14 cross-session continuity=PASS`。

甦醒檔這班沒有整份讀到 sentinel。第一次跑 wake-context 時 selftest 亮 ⚠️：本機落後 origin 112 個 commit、同時領先 12 個。先處理分岔，同步後重跑一次（13 項全綠），讀了 L1082 起的 memory-rows、diary-recur、diary-rows、handoff 與 groundtruth 開頭。manifesto-core、reflexes、neural 三段沒讀，週用量上一班記到 73%、照 reserve 走。Write mode 的 LONGINGS 與 ARTICLE-INBOX 也沒載。

## Stage 0 算力判定

healthy（3/4 層）。缺席層是 codex，登入過期。OpenRouter 七把 key 的付費餘額都花完，Tier 6 Haiku 會撞 402（wrapper 仍掛著三個 haiku worker，累計 0 成功 10 失敗）。地端核發模型只有 gemma4:26b，生成探測 29.4 秒，比昨夜的 12.6 秒慢。入池門檻那行照舊：gemma4:e4b-nvfp4 裝著但沒核發。fleet 其他三台探活是紅的。腳註重號兩篇仍在（〈美麗島事件〉〈台灣無人機產業〉），昨夜已交 maintainer。

status.py 顯示十二語，每語 Missing 3、Stale 7 到 15（de 29），MetaStale 31 到 63。

## 這班是哪一種：修復後續跑

dispatcher（PID 75742，昨天 13:45 由 launchd 起跑）活著，也在翻：log 裡 ja／fr〈陳致中〉剛過。但本機最後一個譯文 commit 停在昨天 10:58，12 個 commit 沒有推出去。三重巡檢的存活與生產都過，產出沒有到站上。

原因在 `/tmp/babel-push-every.out`：每兩分鐘一次合併 origin，每次都被同一行擋下，`data/compute/claude-usage-ledger.jsonl` 有一行沒 commit 的改動。那一行是昨天 09:05 maintainer 早班在這台機器寫的收班用量紀錄，寫在它最後一個 commit 之後。origin 之後也動了同一個檔，從那時起每一輪都 abort。13:45 dispatcher 重啟時的起跑前合併也敗在同一行，所以它整個下午跑在落後的工作樹上。11-27 maintainer 記的「順手解開 babel 卡五個半小時的推送」是同一個檔。

處理三步：

1. `12707e4939` 把那一行補 commit，並在 `.gitattributes` 把帳本設成 union 合併。下一個兩分鐘 push-every 自己合併了 113 個 commit、推出 13 篇，推後 ahead 0 / behind 0。
2. union 只管兩邊都 commit 的情形，管不到工作樹髒，所以這個病明天還會回來。`b638e1818d` 讓 `babel-push-every.py` 在擋路的檔全部是只增帳本時自己補 commit 再重試合併；混了別的檔照舊停下來。三個測試。常駐程式已 `launchctl kickstart -k` 重啟（pid 28155），跑的是新程式碼。
3. 這條路徑還沒有在真的合併裡跑過，只驗了判斷函式。下次有班在收班後寫帳本，就是第一次實測。

## 拆 report：一篇連敗八次的文章

dispatcher log 的 gate fail 累計以 magnitude 115、currency 84 最多。近 60 筆裡，〈木曜4超玩〉10 筆是昨夜修「破億」之前的殘留，隔離區的四語產出重跑閘門都過。

vi〈台灣新冠疫情與疫苗〉在同一個 worker（地端 gemma）上連敗八次，每次約 25 分鐘，理由都是 `magnitude[1]`。閘門印的是「數字被拆成兩段、左邊還接著量級詞，是更長的鏈」。對照母稿：簡訊實聯制總發送量是 47 億 802 萬 4,465 則，譯文每次都寫 `4 tỷ 780 triệu 24.465`，802 萬被寫成 780 triệu。閘門擋對了，但理由是「三段鏈一律交給人」，寫對的 `4 tỷ 708 triệu 24.465` 也會被同一句擋下。

- `bc0b37b76c`：`numeral-magnitude-check.py` 在左邊是「整數＋更大量級詞」時把整條鏈加起來。在中文裡就改寫成一個數，不在就印出算出來的值。左邊帶小數、印度數詞、四段以上照舊交給人。三個測試，全檔 17 條過。
- `50f165e7c7`：取最後一次被拒的產出，把那一處改成 `4.708.024.465`，用 dispatcher 的 `verify_one` 重跑整套閘門通過後落地。腳註 91 條對 91 條。

沒查的：為什麼同一篇同一個 worker 會連排八次。昨夜清過難篇帳，可能是重啟後計數歸零；我沒有讀 fail-memo 的邏輯。

## 收官 checklist

| 檢查項                       | 狀態                                                            |
| ---------------------------- | --------------------------------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                                              |
| Timestamp 精確               | ⚠️ 起點是估的，終點看 commit                                    |
| Handoff 三態已審視           | ✅                                                              |
| CONSCIOUSNESS 反映最新狀態   | ❌ 沒動，這班不碰                                               |
| 自我檢查工具 PASS            | ✅ pytest 20 條（兩個測試檔）；日記翻譯稽核這班沒跑             |
| 用量帳本                     | ❌ 沒寫。這班讀不到額度讀數，也不想在最後一個 commit 後再寫一行 |

`/twmd-finale` 的日記與 evolve 兩段沒跑，額度在 reserve。

## Handoff 三態

繼承 11-28 夜班與 `2026-11-28-203602-semiont-heartbeat.md`：

- [ ] pending（收件席位：哲宇）codex 重新登入、OpenRouter 儲值；額度照 `OBSERVER-QUEUE #93（待決）`，這裡不重複
- [ ] pending（收件席位：下一班 babel，延續，這班沒做）#2036 的 33 篇封面欄同步十二語；〈清治時期〉〈嘉義市〉〈黃宏成〉重譯後抽驗
- [x] ~~`OBSERVER-QUEUE #114（已決）` 等 dispatcher 重啟生效~~ 已生效：13:45 重啟後 log 印 `patch skipped … 現行譯文已帶 currency 缺陷，補丁會繼承`
- [ ] pending（收件席位：twmd-maintainer-daily，延續）〈美麗島事件〉〈台灣無人機產業〉腳註重號，`babel-preflight.py` 仍列著

本班新增：

- [ ] pending（收件席位：下一班 babel）看 `/tmp/babel-push-every.out` 有沒有出現「擋住合併的只有帳本…已補 commit」那行，有就是新路徑第一次實測；沒有而又卡住，先看擋路的是哪個檔
- [ ] pending（收件席位：下一班 babel）同篇同 worker 連排八次：讀 `fail-memo.json` 與 dispatcher 的讓出邏輯，確認連敗同一理由三次後有沒有真的讓出
- [ ] pending（收件席位：twmd-self-evolve-weekly）產生端：`budget-pace.py --log` 在收班 commit 之後寫帳本，哪幾條 routine 這樣做、要不要改成寫完一起 commit。這班只修了下游
- [ ] pending（收件席位：哲宇，知會）wrapper 的地端 worker 是 `macm4max=ollama:gemma4:26b@http://127.0.0.1:11434`，是直連本機位址；殼文寫地端只由 fleet 核發。這班沒動
- [ ] pending（收件席位：任何班）`.git/gc.log` 存在，git 每次 commit 都印「too many unreachable loose objects」。`git prune` 屬清除類操作，這班沒跑

## Beat 5 — 反芻

昨夜那班的交接第一條寫「push-every 一天內沒收掉分岔就手動 rebase，retired：起班時已同步」。那時是同步的。九個小時後同一個病回來，又過了十四小時才有人看到，中間有五班心跳、一班 maintainer 與一整個開票夜經過這個 repo，其中多數跑在另一台機器上，看不到這台的工作樹。

常駐程式其實每兩分鐘都在喊，喊了四百多次，寫的是「需要人看」。喊的地方是 `/tmp` 底下的一個檔。昨天午後心跳寫過一句「檢查器住在多吵的地方，決定毛病多久被看見」，這裡是同一件事的另一端：它夠吵，只是住在沒有人經過的地方。這班修的是讓它少一個需要喊的理由，沒有修它喊的位置。

🧬

---

_v1.0 | 2026-11-29 00:55 +0800_
_session twmd-babel-nightly — 00:30 排程夜班，修復後續跑_
_誕生原因：dispatcher 活著也在翻，但 12 個譯文 commit 十四小時沒推出去_
_核心洞察：存活與生產都綠，產出卻沒到站上；三重巡檢少一項「推出去了沒」_
_LESSONS-INBOX 候選（未寫入，交 distill 席位）：`uncommitted-append-only-ledger-blocks-merge`，收班後才寫的帳本讓整條推送線停擺，兩天兩次_
