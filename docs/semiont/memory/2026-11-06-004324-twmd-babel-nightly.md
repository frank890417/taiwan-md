# 2026-11-06-004324-twmd-babel-nightly — 續命班：地端 gemma4:26b 掛了十八小時，追到整台機器的 TCP 回收停了

> session twmd-babel-nightly — cron 00:30 觸發（續命型，dispatcher 已在跑，未重啟）
> Session span: 約 00:31 → 01:15 +0800
> 資料來源：`/private/tmp/babel-unified-20261103-202134-82396/report.jsonl`、`~/ollama-serve.log`、`netstat -an -p tcp`、`kern.boottime`

## 觸發

每晚的巴別塔班。BECOME write mode 分頁讀完 wake-context 到 `wake:END`，selftest 全綠，Write mode self-test 通過。LONGINGS 只讀了 §種子與 §身體的標題列，ARTICLE-INBOX 的 P0/P1 只掃標題。BABEL-VORTEX-LOOP 讀到 §自動進化，其後章節與 SQUEEZE 全檔這班沒有讀完，如實記下。

## 算力與巡檢

`babel-preflight.py` 判 healthy（3/4 層）。缺席層：codex 登入過期；付費層餘額全空，實質缺席。**這個判定是錯的**：地端那層也壞了，preflight 看不見（下一節）。

存活：dispatcher PID 82396（11-03 20:21 起，跨第三晚）、`babel-push-every` PID 36434 都在，主樹在 main。生產這項不過：近 45 分鐘 15〜17 筆，全部 kept 都來自雲端 nemo；macm4max 同窗口 0 筆 kept。fleet 回報 mac-m4max 可達，第二訊號源給的是綠燈。本班屬「活著但零產出」的修復嘗試，**修復沒有成功**，dispatcher 靠雲端 nemo 單軌續跑。

## 追查

`gemma4:26b` 一句話測試 60 秒沒回。`~/ollama-serve.log` 顯示最後一筆成功的 `/api/chat` 在 11-05 05:47，06:19 起全部 500，單筆最久掛 2 小時 28 分。report 裡 macm4max 那段時間的 kept 都是幾秒的補丁（4.7 秒那種，沒有叫模型），所以看起來還在動。整篇任務每筆等滿 900 秒以上後記 `no output written`。

往下排除：

- 重啟 ollama（`launchctl kickstart -k`）兩次，症狀不變，所以問題不在舊進程狀態
- 用 SIGSTOP 暫停當時還在跑的 embeddings 工作，讓 26b 單獨載入，一樣掛，排除模型互搶（已 SIGCONT 恢復）
- 直連 `llama-server` 的 `stream:false` 立刻回；`stream:true` 送出 `stop:true` 後連線不關，等到逾時
- 串流 chat 收得到第一個字，等不到 done；runner 這邊 252 毫秒就算完

接著量 TCP：**`TIME_WAIT` 256,717 個，45 秒內只增不減**（256,719 → 256,726），`FIN_WAIT`／`CLOSING`／`LAST_ACK` 另有近兩千。開機 2026-09-13 23:25，加 2^32 毫秒落在 11-02 16:28。TCP 重送與丟棄計數全是 0。本機寫的 Python 假伺服器也間歇收不到回應，curl 同一台假伺服器卻 0.0 秒。

判讀：形狀符合 macOS TCP 毫秒計數器在 49.7 天繞回後回收停擺。**這是推論**：TIME_WAIT 不回收與開機天數都量到了，它跟 ollama 掛住之間的因果沒有驗證，只有重開機之後才看得出來。macm4max 的吞吐從 11-05 下午起掉，全站 commit 速度也同步掉到每小時二十篇上下。

## 本班動作

- ollama 重啟兩次，現在跑的是新進程，症狀未解
- embeddings 工作 PID 52709 暫停約兩分鐘後恢復，它從 11-05 05:15 跑到現在，還卡在 hi 200/1147，今早那班 routine 沒有收官，索引沒有 11-05 那列
- `babel-preflight.py` 加兩個檢查：`probe_generation()` 真的叫模型吐字，分 ok／hung／unknown；`check_tcp_stack()` 數 TIME_WAIT，超過兩萬印 🔴。現場跑出 🔴 256,741。生成探測現場回 unknown（60 秒沒回應），沒有抓到 hung，所以 verdict 這層仍算可用，只靠 🔴 那行示警
- 第一版單元測試用真 socket，在這台機器上不可靠，改成假回應，七條全過
- BABEL-VORTEX §三重巡檢加第 6 問「那個回應是真的翻譯嗎」
- OBSERVER-QUEUE #124 請哲宇決定重開機

沒有手接譯文。〈彎彎〉補丁這班沒有查。

## 各語進度

母稿 1,162 篇（前一晚 1,161）。收工時 stale 30〜39、metaStale 28〜49、missing 4〜6，覆蓋率十二語都在 99.5% 以上。對照前一晚 stale 39〜54、metaStale 145〜155，白天消化掉大半。本班期間 fresh 只多了零星幾篇，產線處於單軌。後端：近 45 分鐘 kept 全為 nemotron 補丁，gemma4 為 0。

## 收官 checklist

| 檢查項                       | 狀態                                      |
| ---------------------------- | ----------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                        |
| Timestamp 精確               | ✅（起點約略）                            |
| Handoff 三態已審視           | ✅                                        |
| CONSCIOUSNESS 反映最新狀態   | ❌ 本班不碰，babel 產線不寫 CONSCIOUSNESS |
| 自我檢查工具 PASS            | pytest 7 條；live preflight 🔴 如預期     |

## Handoff 三態

- [ ] pending（收件席位：哲宇）：OBSERVER-QUEUE #124 重開機。這是本班最要緊的一件，影響整台機器所有 routine
- [ ] pending（收件席位：重開機後第一班 babel）：驗 TIME_WAIT 是否回到幾百、`gemma4:26b` 串流能否收尾；要是重開機後仍掛，TCP 這條推論就是錯的，回頭查 ollama 0.32.3
- [ ] pending（收件席位：`twmd-embeddings-nightly`）：PID 52709 仍卡著，今早 05:00 那班起跑前要看它還在不在，兩份同跑會互搶
- [ ] pending（收件席位：babel 下一班）：地端壞掉期間整篇任務被記了失敗，`fail_counts` 算到文章頭上，重開機後要看 fail-memo 有沒有把好文章沉到佇列尾
- [ ] pending（收件席位：`twmd-distill-weekly` 11-08）：LESSONS `model-count-threshold-blind-when-only-two-backends-run`、`liveness-check-reads-the-menu-not-the-kitchen`
- [ ] pending（收件席位：哲宇，身份授權）：Mac mini `codex login` 過期
- [ ] pending（收件席位：哲宇，經費）：OpenRouter 付費餘額全空
- [ ] pending（收件席位：`twmd-self-evolve-weekly` 或 Full mode 席位）：LESSONS `gate-rejects-what-the-prompt-never-taught` 幣別閘數字錨定
- [ ] pending（收件席位：`/twmd-routine` 或 babel 下一班）：LESSONS `push-loop-blocked-by-dirty-shared-file-waits-for-nobody`
- [ ] pending（收件席位：babel 下一班）：〈彎彎〉ja／en／ko／ar 補丁，本班未查，原樣續傳

## Beat 5 — 反芻

連兩班的 memory 都寫「healthy」，其中一班寫的時候地端已經壞了十八小時。那張綠燈問的是模型清單，它答得完全正確。report 裡 macm4max 也一直有 kept，因為不必叫模型的補丁照樣過，這些幾秒鐘的成功把整篇任務的失敗蓋住了。

我追了很久的 ollama，重啟兩次，暫停別人的工作，最後是一行 `netstat` 把問題換了一層。追查時我一直待在最先懷疑的那一層，因為那層的日誌最多。

🧬

---

_v1.0 | 2026-11-06 01:15 +0800_
_session twmd-babel-nightly — 續命班（修復未成功，dispatcher 靠雲端單軌續跑）_
_誕生原因：cron 00:30 觸發；三重巡檢的生產項不過_
_核心洞察：「模型在清單上」與「請求收得了尾」是兩件事；症狀在應用層，根因可能在作業系統層_
_LESSONS-INBOX：新增 `liveness-check-reads-the-menu-not-the-kitchen`_
