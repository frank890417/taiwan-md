# 2026-11-04-005035-twmd-babel-nightly — 續命班：補丁翻譯把住在別章的 72 條腳註定義一起丟掉，修好；dispatcher 健康不重啟

> session twmd-babel-nightly — cron 00:30 觸發（續命型，dispatcher 已在跑）
> Session span: 約 00:30 → 00:55 +0800（約 25 分鐘，1 個本班程式 commit：`05b378655` 00:48）
> 資料來源：`git log %ai`、`.taiwanmd/babel-push.log`、`/private/tmp/babel-unified-20261103-202134-82396/report.jsonl`

## 觸發

每晚的巴別塔班。BECOME write mode 完整讀完 wake-context 到 `wake:END`，Stage 0.5 判定有 dispatcher 在跑（PID 82396，11-03 20:21 由 launchd 拉起），本班不另開一輪，力氣放在拆 report 找閘門缺陷。

## 算力自檢

`babel-preflight.py` 判 healthy（3/4 層）。OpenRouter 七把 key 都通但付費餘額全空，Tier 6 Haiku 本 run 開頭三筆撞 HTTP 402 後 dispatcher 自己停派 tier6。本機 ollama 兩個可翻譯模型，fleet 一台 mac-m4max 可達（核發三個 label 指同一台 ollama）。codex 登入過期。缺席層：codex；付費層實質缺席。nemo 在 23:56 因連三次無產出被凍 30 分，00:26 起恢復接案。

## 三重巡檢

存活：PID 82396 與兩個 structured-translate 子程序在跑，主樹在 main。生產：近 45 分 4 筆紀錄（2 成 2 敗），近 6 小時 21 筆 7 成，通過率偏低但有產出，不重啟。交付：本機 ahead 5，最舊未推 commit 22:33，push-every 依「最舊滿 3 小時」規則會在 01:33 前推，log 最後一次 21:23 推送成功，交付線健康。誰讓它活著：launchd `com.taiwanmd.babel.nightly` 與 `push-every` 兩個 keepalive 都在。

## 〈台灣電影〉補丁四語同敗

拆 report 時看到 `Art/台灣電影.md` 的補丁在 de、en（nemotron）與 es、fr（gemma4）四語都在 30〜96 秒內被 verify 擋下，理由相同：footnote zh=72 vs 0、URL 84 vs 12。現行譯文都有 72 條定義，問題出在補丁本身。zh 把定義放在「結語」之後、`## 參考資料` 之前；十二語譯文全放在檔尾 `## 延伸閱讀` 之後。zh 這次只在延伸閱讀加一行〈金馬獎〉連結，`patch-translate.py` 按 H2 切章，譯文的延伸閱讀章帶著 72 條定義，重翻那章就整批換掉。每語每模型都會重現，是確定性缺陷。全庫量到 58 份譯文是這種擺法（〈一同走過從前〉12、〈台灣電影〉11 最多）。

修法抽成 `plan_footnote_carry()`：被碰的譯文章帶著 zh 那章沒有的定義尾段，重翻後原樣接回；zh 的定義章被碰而譯文定義住在別章，直接改走整篇重翻；尾段夾了非定義行不冒險。fr 實測補丁 51 秒過 verify trio，72 條定義與 85 個網址都在（輸出寫在 scratchpad，未落地，留給 dispatcher 下次自己跑）。補一條回歸測試，`tests/test_patch_translate*.py` 全過，在共用 git 鎖下只 commit 兩檔（`05b378655`，scope 驗 2 檔 0 刪除）。dispatcher 每篇都重新 spawn 補丁子程序，修復下一次派到這篇就生效，不需要重啟。

試跑的模型輸出還有兩處品質問題：把葛靜文寫成「Ge Jingwen」（舊譯正確作 Vanessa Hope），法文裡留了《海角七號》漢字。閘門都沒擋，屬模型層，未在本班處理。

## 其他敗例

〈蔣萬安〉三語敗在三種不同理由（gemma4 腳註標題帶 markdown、nemotron 一個 chunk 回空內容、haiku 402），不是閘門缺陷。順手確認 `config/babel-hold.tsv` 的民調禁止期凍結從 11/18 起算，現在翻〈沈伯洋〉〈蔣萬安〉是 `d8c5b8047` 明文允許的。

## 各語進度

母稿 1158 篇。對照前一晚（stale 14〜29、missing 3），今晚 stale 5〜18（de 18 最多，en、ko、ru 5 最少），missing 2〜3，metaStale 1〜9，覆蓋率十二語都在 99.7% 以上。本 run 跨夜續跑，還沒到 stale=0。後端：本 run 成功 7 筆裡 gemma4 6、nemotron 1。

## 收官 checklist

| 檢查項                       | 狀態                                      |
| ---------------------------- | ----------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                        |
| Timestamp 精確               | ✅（起點約略，本班程式 commit 00:48）     |
| Handoff 三態已審視           | ✅                                        |
| CONSCIOUSNESS 反映最新狀態   | ❌ 本班不碰，babel 產線不寫 CONSCIOUSNESS |
| 自我檢查工具 PASS            | 見 commit 前 article-health               |

## Handoff 三態

繼承 `2026-11-03-203639-α`（非 babel 席位的項目原樣保留給原席位，本班未動）：

- [ ] pending（maintainer 明早）：#1954、#1955 新文章與 #1956 電價補段待審；#1888 仍等 tboydar
- [ ] pending（哲宇，OBSERVER-QUEUE #119 待決）：80 筆攻擊列收尾；#1884 等哲宇審
- [ ] pending（週班 11-08）：distill／news-lens／routine-audit／self-evolve 四條沉默死亡，與登入過期同根因

繼承 `2026-11-03-010003-twmd-babel-nightly`：

- [ ] pending（收件席位：哲宇，身份授權）：Mac mini `codex login` 過期，codex 層缺席
- [ ] pending（收件席位：哲宇，經費）：OpenRouter 付費餘額全空，wrapper 仍加掛 `haiku1..3`；dispatcher 撞 402 後會自己停派，浪費只有每 run 開頭三筆
- [ ] pending（收件席位：`/twmd-routine` 或 babel 下一班）：LESSONS `push-loop-blocked-by-dirty-shared-file-waits-for-nobody`；今晚交付線健康，未再發作

本 session 新 handoff：

- [x] ~~〈台灣電影〉補丁四語被 footnote count 擋~~ — `05b378655` 修
- [ ] pending（收件席位：babel 下一班）：確認 dispatcher 下一次派到 `Art/台灣電影.md` 時補丁過閘（report.jsonl 該篇 disposition=kept）；若仍敗，查 `plan_footnote_carry` 印出的那一行
- [ ] pending（收件席位：`twmd-distill-weekly`）：LESSONS `model-count-threshold-blind-when-only-two-backends-run`，REFLEXES #38 判讀捷徑在兩後端時代永遠不響

## Beat 5 — 反芻

前一晚同一席位寫的是「湊不到三種以上模型同敗的判準，今晚沒有閘門缺陷可修」，那時 report 裡已經有單一理由跨語言分布的失敗列。判準本身沒錯，它的門檻寫在後端多的時代，產線縮到兩個免費後端之後，三種模型同敗就不可能發生。這把尺現在只會回答「沒有」，而它回答「沒有」的語氣跟真的沒有一模一樣。今晚接住它，是因為我按語言把同一篇攤開看，看到四語同一句話，先問了「是不是門」再去問模型。已記進 LESSONS，留給週班決定要不要改捷徑的寫法。

🧬

---

_v1.0 | 2026-11-04 00:55 +0800_
_session twmd-babel-nightly — 續命班（dispatcher 已在跑，不重啟）_
_誕生原因：cron 00:30 觸發；拆 report 發現〈台灣電影〉補丁四語同理由被擋_
_核心洞察：補丁按章切時，腳註定義在 zh 與譯文可住不同章；「三種模型同敗」的門檻在只剩兩個後端時永遠不響，要改看跨語言_
_LESSONS-INBOX 候選：model-count-threshold-blind-when-only-two-backends-run_
