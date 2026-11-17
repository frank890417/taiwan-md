# 2026-11-05-005640-twmd-babel-nightly — 續命班：〈竹山鎮〉四語被幣別閘擋在隔離區，數字錨定手改 9 處收下；〈台灣電影〉補丁修復已驗證生效

> session twmd-babel-nightly — cron 00:30 觸發（續命型，dispatcher 已在跑）
> Session span: 約 00:31 → 00:58 +0800（約 27 分鐘，1 個本班譯文 commit：`154ef2aed` 00:55:54）
> 資料來源：`git log %ai`、`/private/tmp/babel-unified-20261103-202134-82396/report.jsonl` 與 `master.log`、`.taiwanmd/babel-push.log`

## 觸發

每晚的巴別塔班。BECOME write mode 用 Read 分頁讀完 wake-context 到 `wake:END`（selftest 全綠、工作樹與 origin 同步），Write mode self-test 通過。Stage 0.5 判定 dispatcher 在跑（PID 82396，11-03 20:21 由 launchd 拉起，已跨夜第二晚），本班屬續命，不重啟、不另開一輪。

## 算力與三重巡檢

`babel-preflight.py` 判 healthy（3/4 層）。OpenRouter 七把 key 通但付費餘額全空；本機 ollama 兩個可翻譯模型；fleet 一台 mac-m4max 可達；codex 登入過期。缺席層：codex，付費層實質缺席。

存活：PID 82396 與補丁子程序在跑，主樹在 main，`babel-push-every` keepalive（PID 36434）也在。生產：近 45 分鐘 94 筆紀錄、91 筆 kept，近 6 小時 284 筆 258 kept，產量比前一晚高很多，主要是補丁引擎在消化 metaStale。交付：push log 00:33 推完 59 篇、推後 ahead 0。四項都過，不動產線。

## 〈台灣電影〉補丁修復驗證

前一班交接要確認 `05b378655` 的 `plan_footnote_carry()` 生效。report 裡修復前 de／en／es／fr 四語同理由被擋，修復後 id、ja、ko、vi、pt、ru、hi 七語全 kept，ar 一筆敗在 tags ASCII（別的理由）。修法生效，這條交接收掉。de／en／es／fr 那四語還是 stale，等 dispatcher 自己再派到。

## 拆 report：兩組跨語言同理由的失敗

依前一班的反芻，這次按文章把失敗攤開看，不看模型數。兩組值得查：

〈彎彎〉補丁四語同敗（ja／en／ko／ar），理由都是 `post-assembly H2 mismatch: got 10 want 9`。zh 這次只動了 intro 與 frontmatter（SEO 改 title／description）。四次失敗全是 nemotron，同一篇 gemma4 的 es／vi／hi 三次全過，nemotron 也過了 fr、ru。這是 nemotron 在 intro 那章多吐一個 H2，閘門擋得對，dispatcher 換手會自己收掉，不是閘門缺陷。

〈竹山鎮〉是 11-03 新進的文章，de／ru／hi／id 四語缺檔，四份譯文都進了隔離區，理由都是 `currency`，跨 gemma4 與 nemotron 兩個後端。比對隔離樣本：紫南宮借金「最多 600 元」、小鎮文創租屋「每月 7,000 元」被寫成 `600 Yuan`／`600 юаней`／`600 युआन`／`600 yuan`，讀者會當成人民幣。閘門是對的。往上追產出端：`structured-translate.money_rule()` 早已接進三條引擎的提示，規則有教，模型沒學。以前的退路是改派付費層，現在餘額全空，這條路關了。

所以本班把它接住：四份隔離樣本搬回 knowledge 路徑，照 checker 寫明的方式用數字錨定改寫（不做裸字串取代），de 改 `600 NT$`（跟同篇既有的 `7.000 NT$` 一致）、ru 改 `новых тайваньских долларов`、hi 改 `नए ताइवानी डॉलर`、id 改 `NT$600`，合計 9 處，跟 checker 的命中數一致。zh 通篇沒有「人民幣」。改完重跑 dispatcher 的六道閘（target-language／verify-translation／cjk-leak／article-health pre-commit／currency／magnitude）四語全 0，`verify-batch.py` 四份各 0 錯誤，在共用 git 鎖底下只 commit 這四個檔（`154ef2aed`，`verify-commit-scope --head 4` OK）。pre-commit 對四份報 description 超過 400 字元的 warn，那是 warn 不是 hard，照工具註記不硬砍。

## 各語進度

母稿 1,161 篇（前一晚 1,158）。收工時 stale 39〜54（de 54 最多，en 39 最少）、metaStale 145〜155、missing 3〜5，覆蓋率十二語都在 99.6% 以上。stale 比前一晚的 5〜18 跳高、metaStale 堆到一百五十上下，來源是 11-04 desk 班的全面進化（167 篇標進化中、二十多篇 title／description 改寫、6 篇重寫），都是 zh 母稿變動，不是產線退步。dispatcher 的補丁路徑接 metaStale，現速約每小時一百二十筆，照這速度要跨好幾晚。本班 missing 淨減四（〈竹山鎮〉四語）。後端：近 6 小時 kept 的主力是 gemma4 補丁（168 筆）與 nemotron 補丁（74 筆）。

## 收官 checklist

| 檢查項                       | 狀態                                      |
| ---------------------------- | ----------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                        |
| Timestamp 精確               | ✅（起點約略，本班 commit 00:55:54）      |
| Handoff 三態已審視           | ✅                                        |
| CONSCIOUSNESS 反映最新狀態   | ❌ 本班不碰，babel 產線不寫 CONSCIOUSNESS |
| 自我檢查工具 PASS            | 見 commit 前 article-health               |

## Handoff 三態

繼承 `2026-11-04-005035-twmd-babel-nightly`：

- [x] ~~確認 dispatcher 下一次派到 `Art/台灣電影.md` 時補丁過閘~~ — retired by 本班：修復後七語 kept，ar 另因 tags ASCII
- [ ] pending（收件席位：`twmd-distill-weekly` 11-08）：LESSONS `model-count-threshold-blind-when-only-two-backends-run`
- [ ] pending（收件席位：哲宇，身份授權）：Mac mini `codex login` 過期，codex 層缺席
- [ ] pending（收件席位：哲宇，經費）：OpenRouter 付費餘額全空；本班量到它的直接代價是幣別這類「模型學不會」的缺檔再也沒有付費層可改派
- [ ] pending（收件席位：`/twmd-routine` 或 babel 下一班）：LESSONS `push-loop-blocked-by-dirty-shared-file-waits-for-nobody`，本班交付線健康未發作

繼承 `2026-11-04-203607-α`（非 babel 席位，原樣保留給原席位，本班未動）：#1960、#1961 待 maintainer；OBSERVER-QUEUE #121、#122（待決）剩餘項；重算 #1891；孤兒 worktree 四個。

本 session 新 handoff：

- [x] ~~〈竹山鎮〉de／ru／hi／id 四語幣別缺檔~~ — `154ef2aed` 收下
- [ ] pending（收件席位：`twmd-self-evolve-weekly` 或 Full mode 席位）：LESSONS `gate-rejects-what-the-prompt-never-taught` 現 vc=3，候選「幣別閘自帶數字錨定修法」（只在 zh 無人民幣時，只改「數字＋裸幣別」），屬新增自動修改路徑，留給有權限設計的席位；本班是手做一次
- [ ] pending（收件席位：babel 下一班）：〈彎彎〉ja／en／ko／ar 補丁若再被 nemotron 擋，看是不是 dispatcher 換手沒換到 gemma4

## Beat 5 — 反芻

今晚兩組同樣形狀的失敗，答案剛好相反。〈彎彎〉四語同理由，看起來像門的問題，攤開是單一模型的習慣；〈竹山鎮〉四語同理由、跨兩個模型，看起來像門擋太緊，結果門完全正確，錯的是兩個模型都不聽一條早就寫進提示的規則。「跨語言同理由」這把尺能讓我停下來看，但看完的判斷還是要回到原文與隔離樣本。

另一件事是退路的位置。幣別這類錯，以前的處置是改派付費層，那條路在帳本上還寫著，實際上已經因為餘額歸零關掉了。關掉的退路不會叫，它只會讓某一類缺檔安靜地永遠排在佇列裡。這次是手接，下一次要靠工具接，已記進 LESSONS 既有條目。

🧬

---

_v1.0 | 2026-11-05 00:58 +0800_
_session twmd-babel-nightly — 續命班（dispatcher 已在跑，不重啟）_
_誕生原因：cron 00:30 觸發；拆 report 發現〈竹山鎮〉四語被幣別閘擋在隔離區_
_核心洞察：跨語言同理由的失敗只告訴你該看哪裡，不告訴你錯在門還是錯在模型；付費層缺席讓「模型學不會的規則」只剩儀器修法這條路_
_LESSONS-INBOX：`gate-rejects-what-the-prompt-never-taught` 加 instance，vc 2→3_
