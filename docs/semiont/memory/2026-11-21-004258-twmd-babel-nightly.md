# 2026-11-21-004258-twmd-babel-nightly — 續命班：幣別閘門把姓袁的研究者讀成人民幣，〈黑冠麻鷺〉三語從隔離區直接落地

> session twmd-babel-nightly — cron 00:30 觸發（續命型：11-20 03:56 起的 dispatcher 還活著）
> Session span: 約 00:31 → 00:58 +0800（1 個工具 commit、1 個譯文 commit、1 個收官 commit）
> 資料來源：`git log %ad`、`/tmp/babel-unified-20261120-035646-47089/report.jsonl` 與 `master.log`、`babel-preflight.py`、`status.py`、`babel-pulse.py`

## 觸發

每晚的巴別塔班。BECOME ACK：mode=write，8 器官最低＝免疫 59（快照齡 18 小時，標 stale），Q14 跨 session 連續性 PASS：11-20 整天 babel 產線每一兩小時推一批十二語 commit，maintainer 早班合六件投稿並修掉 viz-health 一族假陽性，心跳三班都是額度 lean 沒做事，晚班把「額度每六小時漲 10 點以上、babel 雙機並行是頭號嫌疑」升級進交接；五條週班 11-14/15 沉默死亡，下次排程 11-22。甦醒檔用 Read 分頁讀到 `wake:END`。selftest 亮一盞燈：diary 沉默 19 天。Write mode 的 LONGINGS、ARTICLE-INBOX 本班沒讀；SQUEEZE 沒讀，BABEL-VORTEX 讀 §每輪五動作到 §自動進化，MEMORY-PIPELINE 全檔讀過。

## 算力與產線狀態

`babel-preflight.py` 判 healthy（3/4 層）。缺席層：codex 登入過期（身份授權，留哲宇）。付費層七把 key 餘額仍是零，Haiku 三條 lane 本 run 0 成功 3 失敗。地端 `gemma4:26b` 生成探測 12.6 秒收尾，fleet 只核發 mac-m4max；名單外的 `gemma4:e4b-nvfp4` 還裝在本機但沒被核發。slug 登記全數到位。

Stage 0.5 第一種：續命。存活（dispatcher 47089 跑了 21 小時、推送迴圈 57192 在，launchd 拉著）、生產（pulse rate 8.3 篇／小時；近 45 分鐘 report 2 筆都是 nemotron，gemma 那條 21:41 後沒有紀錄，log 寫的是它能接的貨都被接走、停在場邊每十分鐘回來看，生成探測正常）、第二訊號源（fleet 核發與 preflight 一致）三項都過。沒有重啟，沒有另開一輪。速率比昨晚的 32 篇／小時低，是佇列只剩難篇，不是產線變慢。

## 幣別閘門把「2010, Yuan」讀成人民幣

拆 report 找「同一篇跨模型同理由」：〈黑冠麻鷺〉在英、西、葡三語、兩種模型共六次敗在 `currency[1]`，葡文已被記成 cascade exhausted。母稿通篇沒有任何金額。把隔離區的三份譯文餵回閘門，命中的是同一句：「Starting in 2010, Yuan began systematic banding」，Yuan 是台大的袁孝維。金額數字的正則允許尾巴帶逗號，「2010,」加空白加姓氏就成了「2010 yuan」；既有的專有名詞豁免只看 Yuan 後面那個字是不是大寫，句子接動詞就穿過去。

修法（`86870dad7`）：數字必須收在數字上，人民幣族與在地幣別族共用同一個 `NUM`。全庫前後對照少 14 處、新增 0 處，14 處逐條看過都是誤判：袁孝維三語、越南文的童子賢與「同知」（Đồng）、制服（đồng phục）、葡文的監察院（Yuan de Controle）與圓山。補兩條測試，一條守這個誤判，一條守真的裸幣別照樣擋。閘門是子行程呼叫，活著的 dispatcher 下一次驗證就用新版，不必重啟。

隔離區那三份譯文對的是現行母稿（`be13f0452`），被擋的唯一理由就是這個誤判。放回原位後用 dispatcher 自己的 `verify_one` 整套重跑，三份都過，在共用 git 鎖底下精確路徑 commit（`72001de0b`），`verify-commit-scope.sh --head 3` OK，落地後再跑一次 verify 與幣別閘門都是 0。零模型呼叫。

## 查過但判定不是閘門缺陷的幾族

量級（本 run 30 多次，hi 佔大半）：抽 de／fr／vi／ar 八份隔離樣本重放，全部是真錯，「350億」寫成 350 Milliarden／350 tỷ，差十倍，閘門連正確值都印得出來。標籤含中文（〈奇拿富〉ar／id）是模型把 zh 標籤原樣留下。正文 CJK 殘留 27 次，殘留字串各不相同。裝甲層掉網址 19 次警告、3 次硬失敗，其餘由非裝甲路徑重譯救回。這幾族都留給產線重試與委派層。

〈沈伯洋〉〈蔣萬安〉十二語、〈陳致中〉七語的 stale 是 `config/babel-hold.tsv` 的民調禁止期凍結（到 11-28 16:00，哲宇 11-02 拍板），共 31 對，本班不碰。扣掉它們，真正可動的缺口是 122 對。

## 各語進度

| 語言 | fresh 起 → 收 | stale 起 → 收 | metaStale | missing |
| ---- | ------------- | ------------- | --------- | ------- |
| en   | 1186 → 1187   | 5 → 4         | 1         | 0       |
| ja   | 1185 → 1185   | 5 → 5         | 2         | 0       |
| ko   | 1183 → 1183   | 6 → 6         | 3         | 0       |
| es   | 1180 → 1181   | 9 → 8         | 3         | 0       |
| fr   | 1181 → 1181   | 6 → 6         | 3         | 2       |
| vi   | 1171 → 1171   | 15 → 15       | 3         | 3       |
| id   | 1181 → 1181   | 7 → 7         | 4         | 0       |
| pt   | 1186 → 1187   | 5 → 4         | 1         | 0       |
| hi   | 1165 → 1165   | 17 → 17       | 5         | 5       |
| ar   | 1181 → 1181   | 6 → 6         | 3         | 2       |
| ru   | 1188 → 1188   | 4 → 4         | 0         | 0       |
| de   | 1161 → 1161   | 23 → 23       | 8         | 0       |

pulse gap 156 → 153（昨晚收官 342，一天降 189）。backend（本 run 21 小時）：gemma4:26b 127 成功／78 失敗、nemotron 78／61、Haiku 0／3。本 run 的 cascade exhausted 六對：pt〈黑冠麻鷺〉（本班已落地）、hi〈NVIDIA在台灣〉〈中央研究院〉〈台積電〉、ja〈這群人〉、ar〈發票〉。pulse 存量三族：截斷 26、網址不符 176、名人頂替 174。Stage D 日記：`diary-translation-audit.py` 2,080 份 0 critical，11-02 之後沒有新日記要翻。

## 收官 checklist

| 檢查項                       | 狀態                                                       |
| ---------------------------- | ---------------------------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                                         |
| Timestamp 精確               | ✅（起點約略）                                             |
| Handoff 三態已審視           | ✅                                                         |
| CONSCIOUSNESS 反映最新狀態   | ❌ 本班不碰                                                |
| 甦醒讀滿                     | ✅ 讀到 `wake:END`；LONGINGS、ARTICLE-INBOX、SQUEEZE 沒讀  |
| diary                        | ➖ 本班沒有超出行動的反芻，不寫（selftest 那盞燈照實留著） |
| evolve                       | ➖ 閘門修補已在本班當場落地，沒有另外的進化項              |

## Handoff 三態

繼承 `2026-11-20-004913-twmd-babel-nightly`：

- [ ] pending（收件席位：哲宇，經費決定）：付費層七把 key 餘額用完，儲值或刪 `~/.config/taiwan-md/babel-extra-workers`，原樣續傳
- [ ] pending（收件席位：哲宇，身份授權）：這台機器 codex 登入過期，要重新 `codex login`，原樣續傳
- [ ] pending（收件席位：設計席位，LESSONS `metadata-stale-bump-assumes-frontmatter-unchanged`）：一般同步集要不要收查證標記兩欄，原樣續傳
- [ ] pending（收件席位：下一班 babel）：`babel-pulse` 常駐沒掛，原樣續傳（本班手動跑了三次）
- [ ] pending（收件席位：下一班 babel）：名人頂替存量 174，vi 最多，挑一班整語清，原樣續傳
- [ ] pending（收件席位：下一班 babel 先問哲宇）：fleet 三台 GPU 節點是否刻意關機，本班沒重測，原樣續傳
- ~~pending：push-every 收官時 ahead 6，下一班先看有沒有推出去~~ retired by 本班：00:44 推送完成 15 篇，ahead 0

繼承 `2026-11-20-203519-semiont-heartbeat`：#2047 交 maintainer、#2033／#2036 等哲宇、#2046 主頻道查證、週班 11-22 起看是否恢復，原樣續傳（不在本班範圍）。額度那條與本班直接相關，見下。

本 session 新 handoff：

- [ ] pending（收件席位：哲宇，觀察者決定）：額度連兩班每六小時漲 10 點以上的嫌疑指向 babel。本班在這台機器（mouhouse）量到的事實供判斷：dispatcher 只有一個進程（47089），翻譯走本機 ollama 與 OpenRouter 免費模型，這兩條都不經過 Claude；這台機器上會用到 Claude 的是每晚這一班與心跳班（甦醒檔 292KB）。另一台機器上有沒有別的產線在用 Claude，本班看不到，沒有驗
- [ ] pending（收件席位：下一班 babel，動得了 `scripts/tools/lang-sync/`）：量級差十倍那一族（億→Milliarden／tỷ／مليار）閘門已印出正確值，可比照 `--fix-split` 做機械改寫；改寫數字屬高風險，先用隔離區樣本量「閘門建議值與人工判讀一致」的比例再決定
- [ ] pending（收件席位：下一班 babel）：閘門修掉假陽性之後，隔離區裡只敗在那一道的譯文可以重放整套閘門直接落地，本班手動做了三份；值得做成 `babel-dispatch` 的一個子指令
- [ ] pending（收件席位：下一班 babel）：`fail-memo.json` 裡 pt〈黑冠麻鷺〉的 9 次是誤判累計，活著的 dispatcher 寫檔時逐鍵取 max，手改不會留下；該篇已落地，數字留著不影響排程

## Beat 5 — 反芻

這道閘門九月校準過三輪，文件裡寫著第二版因為 `[0-9,]*` 吃掉逗號讓「2024, Yuan Goang-Ming」穿過，第三版用「後面接大寫字」補上。逗號本身一直留在數字的寫法裡，補的是它造成的其中一種句型。兩個月後同一個逗號換了一個句型回來，這次後面接的是動詞。修症狀現形的位置，病會從隔壁出來（REFLEXES #101 的又一例）。

另一件事是隔離區。產線把被擋的譯文留在那裡，是為了不刪別人的工作；它同時也是一批「只差一道閘門」的成品。閘門修好之後，沒有東西會回頭看它們，它們會被重翻一次，再過一次同樣的閘門。今晚手動放回去的三份省下的模型呼叫不多，但這條路以前沒有人走過。

🧬

---

_v1.0 | 2026-11-21 00:58 +0800_
_session twmd-babel-nightly — 續命班，幣別閘門假陽性修補，三份隔離譯文重放落地_
_誕生原因：cron 00:30 每晚巴別塔班_
_核心洞察：同一篇跨兩種模型敗在同一個理由時，先把隔離樣本餵回閘門看它命中哪一句；閘門修好後，隔離區是可以直接回收的成品_
_LESSONS-INBOX 候選：`quarantine-is-recoverable-after-gate-fix`（閘門修補後沒有路徑回收只敗在那一道的隔離譯文）_
