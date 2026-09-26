# 2026-09-27-010249-twmd-babel-nightly — 產線已在跑，夜班改做驗收：23 份壞網址還原、九篇整篇主詞譯錯、兩把尺補盲區

> session twmd-babel-nightly — cron 00:30 多語批次同步
> Session span: 00:42:52 → 01:03:02 +0800（約 20 分，7 commits：`841d4f0f8` → `8cf6ba5f3`）
> 資料來源：`git log %ai`、`/private/tmp/babel-unified-*/report.jsonl`

## 觸發

每夜 00:30 的巴別塔同步。BECOME write 模式甦醒，wake-context 讀到 `wake:END`，selftest 全綠；ground truth 亮兩個黃燈（儀表板快照齡 42 小時、過去 24 小時沒有 cron 痕跡，後者是 09-25 23:17 登入過期的餘波，哲宇 09-26 10:02 已重登），外加 ACTOR_BUSY。

BECOME ack：mode=write／器官最低 🛡️59（免疫，review_coverage 缺口）／Q14 cross-session continuity=PASS（09-26 babel-vortex 手動 session 在場，九波 Sonnet 委派＋付費 Haiku 產線）。

## 算力自檢與為什麼沒有再開一個調度器

Stage 0 判定 healthy，四層都在：OpenRouter 7/7 把 key、本機 ollama、fleet 一台（mac-m4max）、codex。入池門檻亮紅燈，地端只有 8.1B 的 `gemma4:e4b-nvfp4`（OBSERVER-QUEUE #78）。

起跑時 `status.py` 顯示十二語覆蓋率全在 99.8% 以上，缺口是 stale 60、missing 6。同一時間 vortex session 的 `babel-dispatch.py`（PID 43230，19:13 起、十二語、rounds 200）已經跑了 5.5 小時，近 45 分鐘落地 12 份，推送常駐也在。調度器的 claim 只在行程內互斥，第二個 dispatcher 會跟它搶同一批 (lang, zh) 互寫，所以夜班沒有再開一個。義務（推到 100%）由那條在跑的產線承擔，夜班做它沒在做的事：驗收、修工具、記帳。起跑時 cascade_exhausted 的 10 對，收官時已全數被 vortex 的 Sonnet 波次收成 fresh。

## 驗收：過去 24 小時落地的 596 份譯文

對 596 份逐篇跑 `verify-translation.py`：512 全綠、72 只有 warn、12 份 hard fail。追下去不是今晚產線漏網，是兩個月前舊引擎落地的網址竄改，被今晚幾個只改一個字的 heal commit 碰到才進了 24 小時名單。heal 不重跑網址閘，這類存量就一直躺著。

竄改有兩型。一型是模型改了網址裡的位元組：〈廖鴻基〉的「浩瀚」變「海瀚」、〈認知作戰〉的「滲透」變「滷透」、〈台灣火鍋〉六語要嘛改一碼、要嘛把查詢字串整段丟掉。現成的 `restore-footnote-urls.py` 修不到，原因是它用集合比網址：`[網址](網址)` 只壞一邊時，好的那份讓集合以為「有」。改成按次數比、替換限定整條網址（截短的網址是正確網址的前綴，`str.replace` 會連正確那條一起換掉），再加上「查詢字串被丟掉」這第四種形狀（`841d4f0f8`）。

改完先對 584 份通過閘門的檔案空跑，第一次竟然會動 17 份，第二次動 16 份，兩次都是這個工具自己的假陽性，原本的集合版也有：它自帶的網址 regex 會把「…jpg`，授權為」整段中文吞進去，再被「前 60 字相同」誤配；改用閘門的 `URL_PATTERN`之後，又因為掃進 frontmatter 而想把`imageSource: '…jpg'` 的收尾引號當竄改修掉。最後只比正文，零改動才上線。

另一型是 09-23 那條「斜體圖說裡放帶底線的網址，prettier 每經手一次就把底線改成星號」在譯文層的樣子。那班的交接寫著譯文層沒量，今晚量完全庫就是〈台灣蘭花〉〈阿里山林業鐵路〉〈嘉農〉en/es/fr/ko 十二份，加上 ja〈台灣蘭花〉圖說只剩殘片。照母稿的修法把圖片出處那行移出斜體，prettier 連跑三次不再變。兩型合計 23 份在 `e64212f17` 落地，全數過 verify 與 article-health pre-commit。

Z6 抽樣審核：`audit-quality.py` 對 596 份判 589 健康，七份被標「單引號裡有沒跳脫的撇號」，yaml.safe_load 七份全讀得進去，是把 YAML 自己的 `''` 跳脫當錯（`f9f8aa408` 修，正反例三種都驗過），修後 596/596。人眼抽 30 篇（seed 20260927），30 篇語言正確、結尾完整。

## 抽樣抽出來的：整篇把同一個主詞譯錯

抽樣裡 ko〈台灣棒球文化〉讀到「대만 총구가 메이저리그」。全文 70 處把棒球寫成「총구」（槍口），標題「대만 총구문화」，每道閘門都綠。前一版（09-26 以前）是對的：야구 114 處，照主權詞表寫 타이완。出處是 `poolside/laguna-s-2.1:free`，這個模型不在入池白名單上，而 preflight 的入池門檻只量地端 ollama，雲端 worker 從沒被問過。

用「重翻前後標題整組換掉」這把粗尺掃 920 份白名單外模型的落地譯文，再逐篇對讀，確認九篇同型：ko〈客家飲食〉客家 76 處寫成「카즈」、ja〈台灣麵包與烘焙〉烘焙 27 處寫成「ベーグル」、ja〈蓬萊米〉寫成「ポンガイメ」、vi〈呂秀蓮〉〈朴星垠〉整篇換了人名、es〈統一企業〉標題寫成日本公司 Unicharm、ru〈陳致中〉連陳水扁都寫壞。修法分兩種：前一版對且原稿只動一點的，退回前一版再手補原稿差異（棒球 `94a613b5f`；客家、烘焙在 `8b6f2c746`，原稿只換了主圖）；只錯一個名字的，照同語言語料既有寫法改（vi 其他文章寫 Lữ Tú Liên、ja 寫蓬莱米）。七篇收成 fresh，es／ru 兩篇原稿大改過、需要整篇重譯，留交接。

這份量測寫進 OBSERVER-QUEUE #78 的證據欄（`274539165`），決定仍是哲宇的。preflight 同時補上雲端那一半（`8cf6ba5f3`）：讀近兩日 report.jsonl 裡真的產出過的 backend 對雲端白名單，付費 Tier 6 另計；順手改正同段輸出一個接錯的 `else`，它會在地端模型全合格時對健康的 ollama 印 ❌。現在 Stage 0 印得出「laguna-s-2.1 近兩日落地 101／嘗試 240」。

## 各語進度與 Stage D

| 語言 | 起跑 stale／missing | 收官 stale／missing |
| ---- | ------------------- | ------------------- |
| en   | 1／0                | 1／0                |
| ja   | 9／0                | 9／0                |
| ko   | 2／0                | 2／0                |
| es   | 1／0                | 1／0                |
| fr   | 2／0                | 2／0                |
| vi   | 8／0                | 8／0                |
| id   | 3／1                | 3／1                |
| pt   | 6／2                | 4／2                |
| hi   | 10／0               | 10／0               |
| ar   | 10／1               | 10／1               |
| ru   | 5／1                | 5／1                |
| de   | 3／1                | 3／1                |

表上的變化來自 vortex 產線，夜班修的 29 份原本就記成 fresh（修完仍 fresh）。backend 分布照本輪 run（43230）：落地出自 gemma4:e4b、laguna-s、nemotron 與 Tier 6 Haiku；laguna-s 自 09-21 起三個 run 共落地 465 份。仍 missing 的六對裡，〈阿里山林業鐵路〉ar/de/ru、〈台灣蘭花〉〈嘉農〉pt 剛好是今晚斜體圖說那三篇，我猜是 prettier 改壞網址讓 URL 閘擋下，查 `fail-reasons.json` 是 section count／no output／tags ASCII 各種原因，猜錯了，不相干。

Stage D 日記：`diary-translation-audit.py` 五語各 415/415，0 critical，已收斂。

## 收官 checklist

| 檢查項                       | 狀態                                           |
| ---------------------------- | ---------------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                             |
| Timestamp 精確               | ✅                                             |
| Handoff 三態已審視           | ✅                                             |
| CONSCIOUSNESS 反映最新狀態   | ❌ 快照齡 42h，等 06:00 data-refresh，本班不碰 |
| 自我檢查工具 PASS            | ✅ 見 Stage 4                                  |

## Handoff 三態

繼承（09-26 babel-vortex）：

- [ ] pending（OBSERVER-QUEUE #78）：本班補上量測與九篇案例，決定仍待哲宇；preflight 現在兩半都會亮燈
- [ ] pending（委派層第九波）：vortex 的 accept.sh 01:00 前仍在收件，本班沒碰
- ⏳ blocked（延續）：#1729、#1678、#1609 原樣傳遞；#53 整篇語言錯存量、#80 腳註中文兩族、OpenRouter 加值，都等哲宇
- [ ] pending（延續）：babel-pulse 常駐消失、名字表覆蓋、漏譯掃描豁免連結文字、zh heal 候選清單、派工單措辭，本班未碰，原樣傳遞

本 session 新 handoff：

- [ ] pending（#78 重譯清單）：es〈統一企業〉與 ru〈陳致中〉主詞整篇錯，原稿大改過，交委派層整篇重譯（Sonnet／Haiku 皆可，別再派給 laguna-s）
- [ ] pending（#78 量尺）：「標題整組換掉」只掃到 920 份裡標題差最大的一段；主詞整篇錯需要一把正規的尺，候選是對每篇抓原稿高頻名詞，比對同語言兄弟譯文的既有譯法，差異大的列出來人審（LESSONS `whole-article-term-substitution-passes-every-gate`）
- [ ] pending（`italic-span-defeats-url-escaping`）：譯文層存量已清，增量還沒有閘；09-23 提的 article-health plugin（跑一次 prettier 比網址次數）仍是候選

## Beat 5 — 反芻

今晚兩次修工具，兩次都是先修出一把比原本更會亂動的尺，才靠「對已知乾淨的樣本空跑」抓回來。第一次空跑要動 17 份好檔、第二次 16 份，任一次直接 `--apply` 下去，就是把原稿的中文或 YAML 的收尾引號寫進十幾份譯文，而且閘門不會叫，因為 frontmatter 不在它量的範圍。對乾淨樣本空跑、要求零改動，是這兩次唯一的保險，下次改任何會寫檔的修復器都該先做。

另一件是這一班幾乎全部的收穫，都出自 Z6 那三十篇人眼抽樣裡的一行。產線閘門、委派閘、健檢儀器全綠，「槍口」一詞只有讀過去的眼睛看得見。九篇裡七篇的前一版都是對的，壞的是重翻：過期重翻用了比原本差的模型，把好譯文換成壞譯文，而 status 還把它記成 fresh。這件事跟 #78 是同一個決定的兩面，已寫進佇列。

🧬

---

_v1.0 | 2026-09-27 01:03 +0800_
_session twmd-babel-nightly — 產線已由 vortex 常駐承擔，夜班轉做驗收與工具修補_
_誕生原因：cron 00:30 巴別塔夜班；起跑時 43230 號調度器已跑 5.5 小時_
_核心洞察：過期重翻可能用較差的模型把好譯文換成壞譯文，status 卻記成 fresh；修復器改完先對乾淨樣本空跑、要求零改動_
_LESSONS-INBOX 候選：whole-article-term-substitution-passes-every-gate；dry-run-fixers-on-known-clean-corpus-first_
