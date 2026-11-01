# 2026-10-25-063455-twmd-babel-nightly — 修復後續跑：git 鎖被一個一般檔案佔了十九小時，34 篇翻好的譯文沒人 commit

> session twmd-babel-nightly — 排程觸發，修復後續跑（dispatcher 活著，但從 10-24 06:10 起一篇都 commit 不進去）
> Session span: 00:30 → 06:40 +0800（約 6 小時；本班 4 個 commit，不含產線自己的 23 個批次 commit；後五小時在等產線）
> 資料來源：`git log %ai`、`/tmp/babel-launchd.{out,err}`、`/tmp/babel-unified-20261025-{004419-32237,013750-63402}/{master.log,report.jsonl}`

## 觸發

00:30 排程啟動。BECOME write mode 讀到 `wake:END`，selftest 只亮一項：工作樹落後 origin 一個 commit。`git pull` 被 `data/compute/claude-usage-ledger.jsonl` 擋住，本機多兩列 maintainer 的帳本、origin 多兩列 heartbeat 的帳本，都是 append。把本機兩列存到 scratch，還原檔案、pull、再接回去，兩邊的列都在。

## 算力與產線狀態

Stage 0 判定 healthy，四層都在：OpenRouter 七把 key、本機 ollama gemma4:26b、fleet 一台 mac-m4max、codex。七把 key 的付費餘額仍是零，三個 Haiku worker 今晚 14 次全敗（no output），屬已知的經費缺口。preflight 另報三篇新母稿沒有 slug（熱蘭遮城、西班牙北台灣十六年、台灣技術年會文化），十二語都排不進佇列。

三重巡檢第一眼看起來是活的：launchd `com.taiwanmd.babel.nightly` 已經重生 885 次，push-every PID 13250 從 10-10 跑到現在。但工作樹有 34 份譯文（林俊傑、賴和、林郁婷三篇的十二語重翻）放了 15 小時沒 commit，最後一個產線批次 commit 停在 10-24 03:13。所以這班是修復後續跑。

## 鎖不是鎖

`babel-launchd.err` 從 10-24 08:46 起每 14 分鐘一行「等不到 git 鎖（180 秒）」。`/tmp/taiwan-md-git.lock` 存在，是 10-24 06:10 建的 0 bytes **一般檔案**。dispatcher、push-every、pulse 三支的協定是 mkdir 拿、rmdir 放：mkdir 永遠撞上它，rmdir 對檔案永遠靜默失敗。06:10 是早班 data-refresh 收尾的時間，那班前一天的 memory 寫過「照 push-every 的做法在共用鎖底下合併」，是手動拿鎖時用了建檔案的方式。程式碼裡沒有任何地方會建檔案。

後果分三層：dispatcher 每批等滿 120 秒後印「skipping commit this round」，而 `do_commit` 是先清空待 commit 清單才去等鎖，所以那批譯文從此沒有任何路徑會再 commit 它；status 讀工作樹，照樣算 fresh，缺口讀數完全正常。push-every 合併不了 origin。pulse 把「鎖存在」讀成「有人正在 commit」，跳過了殘留暫存檢查。

處理順序：

1. `rescue-orphans.py` 對 34 份跑全套閘門，34 過 0 擋，收成 `2d4d982a8`，commit 範圍只有這三篇。
2. 三篇新母稿照兄弟條目慣例手訂 slug：`fort-zeelandia`、`spanish-northern-taiwan-1626-1642`、`taiwan-tech-conference-culture`，git ls-files 確認不撞（`fcb2f6bd9`）。
3. 刪掉那個 0 bytes 檔。
4. 工具修補（`a306efe36`）：新 `gitlock.py` 三支共用，拿鎖前先清掉路徑上的一般檔案並印 🔴；pulse 對一般檔案、以及持有超過 20 分鐘的目錄鎖印 🔴；dispatcher 等不到鎖時 `git_lock_commit` 回 `None`（跟 commit 失敗的 `False` 分開），`do_commit` 把那批放回待 commit。四個新測試，連同五個 babel 測試檔 35 過。正控制：手動 `touch` 一個假鎖，pulse 印出紅燈、`clear_impostor()` 清掉。BABEL-VORTEX-LOOP §三重巡檢加第五問「鎖還是不是鎖」。push-every 用 `launchctl kickstart -k` 重生載入新碼，dispatcher 在輪間自比磁碟會自己換。

同一晚 06:0x 的 data-refresh 班已經讀到這件事，在 DATA-REFRESH SOP 寫明手動拿鎖用 mkdir／rmdir（`345820aa5`）。兩邊各補一半：SOP 擋人的手，gitlock 擋下一次 SOP 沒被讀到的時候。

## 各語進度

| 語言           | 起班 stale／meta／missing | 收班 stale／meta／missing | 備註                                             |
| -------------- | ------------------------- | ------------------------- | ------------------------------------------------ |
| de             | 13／5／3                  | 12／5／0                  | 剩下 17 份全是 tboydar／aminzai 人翻，#67 不覆蓋 |
| hi             | 3／1／3                   | 2／1／0                   | 電價、鯨豚、颱風假人翻                           |
| id             | 2／3／3                   | 1／3／0                   | 陳幸妤、台塑、牛肉麵、滷肉飯人翻                 |
| vi             | 3／0／3                   | 2／0／0                   | 電價、鯨豚人翻                                   |
| ja／ko／es／fr | 2／0／3                   | 1／0／0                   | 台北吸菸室人翻                                   |
| en／pt／ar／ru | 0-1／0-1／3               | 0／0-1／0                 | pt 滷肉飯人翻                                    |

起班機器可達的缺口 78（含 34 份孤兒），收班 0；status 上剩 27 份 non-fresh 全是人翻 stale。〈陳映真〉十一語重翻、三篇新文章十二語全部落地。03:00 之後產線每 10 分鐘一輪「💤 零派工」，是真的沒有可派的工作，不是卡住。

backend：gemma4:26b（地端）30 過 4 敗（三次 frontmatter 未翻、一次網址數），nemotron 免費池 18 過 0 敗，Haiku 14 次 402。Stage D 日記：五語 2,080 份，整合性稽核 0 critical。verify-batch：本班兩個 run 共 77 份 manifest 不加 `--quiet` 重掃（`--quiet` 連錯誤都吞，第一輪空輸出不算通過）：29 份 0 錯；48 份各報 3 錯，全是 slug 補上前那幾輪把三篇新文章列進 manifest 又跳過的「not written」，三篇十二語共 36 份之後都已落地 commit，實際 0 critical。cascade exhausted 名單：無新增。

## 收官 checklist

| 檢查項                       | 狀態                           |
| ---------------------------- | ------------------------------ |
| MEMORY 有這次 session 的紀錄 | ✅                             |
| Timestamp 精確               | ✅                             |
| Handoff 三態已審視           | ✅                             |
| CONSCIOUSNESS 反映最新狀態   | ❌ babel 班不碰 CONSCIOUSNESS  |
| 自我檢查工具 PASS            | ✅ article-health memory-diary |

## Handoff 三態

繼承 `2026-10-24-143706-semiont-heartbeat`：

- [x] ~~〈陳映真〉〈林俊傑〉〈蕭敬騰〉十二語帶舊錯誤，加入重翻名單~~ — retired by 本 session（林俊傑十二語是孤兒搶救那批；陳映真十一語今晚重翻；蕭敬騰 10-24 已全 fresh。三篇的 de 只有林俊傑是人翻，見下）
- [ ] pending（席位：下一個 Full mode）— 三月未審初稿楊德昌、鄭南榕、羅大佑等；〈周杰倫〉未查四項，原樣往下傳
- [ ] pending（席位：原〈沈伯洋〉作者）— 主樹未 commit 的研究檔與新圖，原樣往下傳

繼承 `2026-10-24-005903-twmd-babel-nightly`：

- ⏳ blocked（OBSERVER-QUEUE #113 待決，10-30 到期）— 缺章存量與 verify「少一節」升 FAIL
- [ ] pending（席位：哲宇，經費）— OpenRouter 付費餘額歸零，Haiku 今晚 14 次 402
- [ ] pending（席位 `twmd-babel-nightly`，併 OBSERVER-QUEUE #112）— ja〈尼克星〉小標簡體，本班沒碰
- [ ] pending（席位 OBSERVER-QUEUE #101）— 量級檢查對逗號小數點與模組大數字無效
- [ ] pending（席位 `twmd-maintainer-daily`）— `reports/babel/human-translation-stale.tsv` 的 de 人翻藝人條目：本班名單擴大到林俊傑、江蕙、周杰倫、羅大佑、張艾嘉、豬哥亮、蔡依林等，中文已巡邏修掉的錯還在德文裡，請 tboydar 更新
- [ ] pending（席位 `twmd-babel-nightly`）— `openrouter-model-audit.py` 把 nemotron 白名單前綴誤報成下架，本班沒碰

本 session 新 handoff：無。鎖的修補當班落地，SOP 那半由 data-refresh 班補上。

## Beat 5 — 反芻

那個檔案是同一個生命體昨天早上自己留下的，留下它的那班還在 memory 裡寫了「鎖要護到工作樹可讀才放」。它沒有犯錯的感覺，因為它的放鎖指令也照樣回了成功：rmdir 失敗時沒人在聽。

讓它十九小時沒人發現的，是三支工具各自都在正確地等。每一支都把「拿不到」當成「別人正在用」，沒有一支問過擋住它的東西是什麼形狀。dispatcher 那半更安靜：它等不到就把手上那批放掉，而 status 還是把那批算成翻好的，於是所有讀數一起說今晚很順。

🧬

---

_v1.0 | 2026-10-25 06:40 +0800_
_session twmd-babel-nightly — 修復後續跑，鎖修好後兩個 run 把機器可達的缺口清到 0_
_誕生原因：34 份譯文 15 小時沒 commit，追到鎖路徑上是一個一般檔案_
_核心洞察：mkdir 鎖協定把「路徑被佔」一律讀成「有人持有」；等不到鎖時先清空清單再等，等於把驗過的成品丟掉，而工作樹口徑的 status 看不出來。_
_LESSONS-INBOX 候選：lock-path-occupied-by-wrong-shape（已當班修，未另 append）_
