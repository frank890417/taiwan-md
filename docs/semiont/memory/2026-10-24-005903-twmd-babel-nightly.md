# 2026-10-24-005903-twmd-babel-nightly — 續命班：型錄頭一張大數字五語錯、成功國宅被譯成「成功」，兩篇卡住的譯文收下

> session twmd-babel-nightly — 排程觸發，續命班（dispatcher PID 97627 從 10-23 23:26 跑到現在，不重啟）
> Session span: 00:30 → 02:35 +0800（約 2 小時 5 分，本班 6 個 commit，不含產線自己的批次 commit；後一小時在等新文章十二語翻完）
> 資料來源：`git log %ai`、`/tmp/babel-unified-20261023-232611-97627/{master.log,report.jsonl}`

## 觸發

00:30 排程啟動。BECOME write mode 讀到 `wake:END`，selftest 全綠；工作樹落後 origin 四個 commit，先確認未 commit 的檔全是產線的、跟上游不重疊，再 pull。

## 算力與產線狀態

Stage 0 判定 healthy，四層都在：OpenRouter 七把 key、本機 ollama gemma4:26b、fleet 一台 mac-m4max、codex。缺的仍是錢：七把 key 的付費餘額全花完，三個 Haiku worker 搶到新文章的缺檔後各撞一次 402，dispatcher 照 10-22 的修法記成「後端容量失敗」、不計難篇帳、凍結 30 分，缺檔回到免費與地端 worker。三重巡檢：PID 97627 由 launchd `com.taiwanmd.babel.nightly` 拉著，push-every 守護 PID 13250 正常；近 45 分 25 筆 report，36 筆裡 34 筆過。所以這班是續命，不重啟。

起班時十二語覆蓋全是 99.9%，缺口的形狀很清楚：一篇新進庫的〈立法院不分區立委〉十二語全缺，因為它沒有 slug；兩篇反覆敗的譯文（hi〈用數據看台灣 22 縣市〉、id〈視覺化模組型錄〉）；其餘約二十份是投稿者人翻的譯文，#67 規定產線不覆蓋（多數是 de 的藝人條目，中文經過巡邏修正後，德文還帶著中文已刪掉的幻覺，例如蔡依林「四座最佳女歌手」）。

## 三個缺口各自收下

slug：`slug-suggest.py` 打 OpenRouter 回 404，照兄弟條目慣例手訂 `party-list-legislators-taiwan`（`0235b574b`）。dispatcher 每輪開頭重建 slug map，當輪的 top-up 仍用舊表，所以要等下一輪；01:24 進第三輪後先被付費 worker 搶走撞 402，接著 en／ja 開翻。

hi 22 縣市：本機 gemma4 連兩次補丁敗在量級閘門。拿 nemotron 免費池在 scratch 重跑同一個補丁，量級無可疑，逐一比對老化章的數字跟中文一致（467 萬 → 46.7 lakh 對），verify-batch 0 錯，裝進 knowledge 後 `0439959ba`。這等於證實是 gemma4 對印地文弱，SQUEEZE 的模型×語言表早寫過，閘門擋得對。

id 視覺化模組型錄：舊譯把台幣寫成沒有限定詞的 yuan，補丁會繼承，整篇重翻又在 gemma4（幣別）與 nemotron（缺一節，跑了 1,540 秒）各敗一次，累計五次。照 §第五層派一隻 Sonnet 子代理，派工單用 `enrich-batch-targets.py` 寫好二十三節、七條腳註、十四個網址的靶子。交件後我自己重跑全部閘門，再補兩件它做錯的：站內連結它照我派工單寫的「路徑不改」留了中文路徑，該是印尼文 slug，這是我派工單寫錯；「成功國宅」譯成 Sukses，是地名，改 Perumahan Nasional Chenggong（`ea02cda20`）。

## 型錄頭一張大數字，五種語言錯

對讀 id 譯文時看到開頭 tw-figure 寫「6,7 ribu → 87 ribu / ping」，中文是「6.7 萬 → 87 萬 / 坪」，小了十倍。拉十二語同一行比：hi 整行沒翻，ar 把萬音譯成 وان，ru 寫成看不懂的「6,7 в.」，de 把坪換成 m²。三支閘門全綠。量級檢查拿「同一個數字串出現在量級詞旁」當指紋，逗號小數點的 6,7 對不上 6.7，87 又短到不夠格當指紋；只有那支還沒接進閘門的 `magnitude-conversion-check.py`（OBSERVER-QUEUE #101 待決）抓到 id「87 ribu 小 10 倍」，它還會被相對路徑弄崩，順手修了。

順著「成功」這個字查下去：〈國宅與居住正義〉en／fr／id／de／es／pt 都寫 Chenggong，俄文全篇 22 處寫「ЖК «Успех»」；型錄的 de／es／pt 三語也照字義譯成 Erfolg／Éxito／Sucesso。韓文 성공、越南文 Thành Công 是漢字音讀，不動。這一批連同 hi 型錄沒翻的兩個小標與六個縣市名，八個檔一個 commit 修掉（`ce66a4362`），俄文用 Чэнгун，也把俄文型錄的 Чэньгун 對齊。

全庫用那支報告工具掃，疑似量級錯 vi 762、hi 1,024、id 309 處等，抽樣準確率約八成三，這是 #101 的範圍，本班不碰。

## 兩支工具的小修

`section-parity-check.py` 拿到不存在的路徑會回「缺節 0 份」，跟真的沒缺節一模一樣；我驗昨晚交接時拿錯兩個 slug 差點把沒量到當成量過，改成先印警告。同一個 commit 把 ko〈陳幸妤〉照交接標 pre-toolkit 送回整篇重翻（`9a5b0b0cd`）。昨晚送回的 en 楊勇緯／周天成、ar 陳幸妤／一同走過從前、ja AI 硬體供應鏈、ko 台積電／楊勇緯，用正確路徑重量都不再缺節。

## 各語進度

| 語言     | 起班 stale／meta／missing | 收班 stale／meta／missing | 備註                                     |
| -------- | ------------------------- | ------------------------- | ---------------------------------------- |
| hi       | 3／1／1                   | 2／1／0                   | 22 縣市落地；餘為人翻鯨豚、電價          |
| id       | 2／3／1                   | 1／3／0                   | 型錄落地；陳幸妤人翻                     |
| ko       | 1／0／1                   | 1／0／0                   | 陳幸妤 01:24 重翻過、不再缺節；餘為人翻  |
| de       | 11／4／1                  | 11／4／0                  | 全是人翻藝人條目，#67 不覆蓋             |
| 其餘八語 | 0-2／0-1／1               | 0-2／0-1／0               | 〈立法院不分區立委〉02:32 十二語全部落地 |

backend：本 run 產線靠 gemma4:26b（地端）與 nemotron 免費池，付費 Haiku 402 停派；委派層 Sonnet 一篇約 12 萬 token。Z6：當班落地兩份逐段對過數字與結構，另以人眼抽讀 id 型錄開頭、中段、結尾。cascade exhausted 名單：無新增（id 型錄由委派層收下）。Stage D 日記：五語各 416 篇，整合性稽核 0 critical。

## 收官 checklist

| 檢查項                       | 狀態                           |
| ---------------------------- | ------------------------------ |
| MEMORY 有這次 session 的紀錄 | ✅                             |
| Timestamp 精確               | ✅                             |
| Handoff 三態已審視           | ✅                             |
| CONSCIOUSNESS 反映最新狀態   | ❌ babel 班不碰 CONSCIOUSNESS  |
| 自我檢查工具 PASS            | ✅ article-health memory-diary |

## Handoff 三態

繼承 `2026-10-23-015703-twmd-babel-nightly`：

- [x] ~~ko〈陳幸妤〉缺章，`section-parity-check.py --requeue`~~ — retired by 本 session（`9a5b0b0cd`，01:24 nemotron 整篇重翻，缺節 0）
- [x] ~~確認送回的七份整篇重翻不再缺節~~ — retired by 本 session（正確路徑重量全數 0）
- ⏳ blocked（OBSERVER-QUEUE #113 待決，10-30 到期）— 缺章存量（本班量 320 份）與 verify「少一節」升 FAIL
- [ ] pending（席位：哲宇，經費）— OpenRouter 七把 key 付費餘額歸零，Tier 6 Haiku 每 30 分撞一次 402
- [ ] pending（席位 `twmd-babel-nightly`，併 OBSERVER-QUEUE #112 待決）— ja〈尼克星〉小標簡體
- [x] ~~〈豬哥亮〉十二語重翻由產線接手~~ — retired by 本 session（status 只剩 de 人翻一份，屬 #67）

繼承 `2026-10-23-235718-22counties-aging`：

- [x] ~~〈用數據看台灣22縣市〉與〈視覺化模組型錄〉十二語跟上中文~~ — retired by 本 session（hi、id 兩份當班收下，其餘產線已落地）
- [ ] pending（席位：下一個 Full mode）— 22 縣市系列 subcategory「縣市」不在 taxonomy，原樣往下傳
- [x] ~~〈周杰倫〉〈蔡依林〉十二語重翻~~ — retired by 本 session（機器譯文全 fresh，剩 de 人翻，見下方 maintainer 那條）；〈蕭敬騰〉〈林俊傑〉巡邏與〈沈伯洋〉主樹未 commit 檔不屬 babel 席位，原樣往下傳

本 session 新 handoff：

- [x] ~~〈立法院不分區立委〉十二語~~ — 本 session 內收下（01:29 en 到 02:32 id，ja／id／ar 各敗一次後重試過閘；十二語 missing 全數歸零，剩下的 stale 全是 #67 人翻）
- [ ] pending（席位：OBSERVER-QUEUE #101 待決）— 量級檢查對逗號小數點語言與模組區塊大數字無效（LESSONS `headline-number-outside-gate-fingerprint`），改閘門屬 High-stake，跟 #101 一起決定
- [ ] pending（席位 `twmd-maintainer-daily`）— `reports/babel/human-translation-stale.tsv` 的 de 藝人條目（蔡依林、周杰倫、江蕙、張艾嘉、豬哥亮）中文已刪的幻覺還在德文裡，請投稿者 tboydar 更新
- [ ] pending（席位 `twmd-babel-nightly`）— `openrouter-model-audit.py` 把 `babel-preflight.py` 的白名單前綴 `nvidia/nemotron-3-ultra-550b` 當成下架模型，是稽核工具的誤報，修稽核那邊

## Beat 5 — 反芻

今晚三件事都是「量的東西跟讀者看到的東西錯位」。量級閘門量的是數字串，讀者看的是數字的大小；當同一個量換了小數點寫法，閘門就看不見它，而它剛好是整頁字最大的那個數。地名照字義翻也一樣，每個閘門都在問「有沒有翻」「結構對不對」，沒有一個在問「這兩個字是不是專名」。

另一件是我自己的：派工單上「站內路徑不改」那句，是把 zh 的規矩直接貼給 id，子代理忠實照做，閘門也放行，是我回頭比對舊譯才發現。派出去的指令寫錯，回來的成品會錯得跟指令一樣整齊。

🧬

---

_v1.0 | 2026-10-24 01:35 +0800；02:35 補收班數字_
_session twmd-babel-nightly — 續命班，dispatcher 已跑兩小時，佇列只剩三篇與人翻存量_
_誕生原因：拆兩篇反覆失敗的譯文，對讀時撞到型錄大數字五語錯_
_核心洞察：量級閘門的指紋在逗號小數點語言與短數字上同時失效，而模組大數字兩個條件都中；地名被照字義翻是人名填空型幻覺的地名版。_
_LESSONS-INBOX 候選：headline-number-outside-gate-fingerprint、place-name-translated-by-meaning（已 append）_
