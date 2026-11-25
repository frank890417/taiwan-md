# 2026-11-26-011721-twmd-babel-nightly — 續命班：產線健康，修掉兩個讓好譯文白敗的缺口（description 漢字夾註、日記雲端層模型下架）

> session twmd-babel-nightly — cron 夜班（續命）
> Session span: 00:44 → 01:30 +0800（約 45 分鐘，2–3 commits）
> 資料來源：`git log %ai`、`/private/tmp/babel-unified-20261125-010859-80804/report.jsonl`

## 觸發

00:30 排程。BECOME write mode ack：`✅ BECOME ack: mode=write / 8 organ 最低=免疫 59 / Q14 cross-session continuity=PASS`。甦醒檔縮減讀取：manifesto-core、reflexes 兩段、memory-head、neural 前半（到 L1039）、memory-rows、handoff、groundtruth 前段與 selftest 讀了；neural 後段、diary-recur、diary-rows、groundtruth 的 48 小時 commit 清單後半沒讀。selftest 13 項全綠。

## 這班是哪一種：續命

Stage 0 算力判定 **healthy（3/4 層）**：OpenRouter 七把 key 通過但付費餘額全部花完（Tier 6 Haiku 會撞 402，屬經費決定）；本機 ollama gemma4:26b 生成探測 26.9 秒正常；fleet 一台 mac-m4max；**codex 缺席，登入過期**，要哲宇在這台機器重新 `codex login`。入池門檻那行照舊：gemma4:e4b-nvfp4（8.1B）裝著但 fleet 沒核發，產線沒用它。

Stage 0.5 看到 dispatcher PID 80804 從 11-25 01:08 跑到現在，三重巡檢：存活（PID 在、main 分支）、生產（24 小時 report 503 筆成功、76 筆失敗；近 45 分鐘 5 筆全是失敗，因為佇列只剩難篇）、第二訊號源（preflight 的 fleet 可達＋實績檢查 873 筆無弱適配）。三項過，不重啟、不另開一輪。

## 進度 delta

十二語全部 coverage 100%、missing 0。stale 合計從上一夜交接的量收到 en 2 / ja 4 / ko 5 / es 5 / fr 5 / vi 12 / id 5 / pt 3 / hi 10 / ar 5 / ru 2 / de 26（加 metadata-stale 51 筆）。de 仍是最大缺口。24 小時 backend：macm4max（ollama gemma4:26b）322 成功、nemo（OpenRouter nemotron-3-ultra free）181 成功；haiku 一筆，撞 402。

整合性閘門：把過去 24 小時 babel commit 落地的 503 份譯文按語言做成 manifest 跑 `verify-batch.py`，十二語 0 error。第一次跑時十二語各報 10 error，原因是我自己做的 manifest 在 zh_path 前面多加了 `knowledge/`，translatedFrom 比對與站內連結檢查全跟著錯；去掉前綴後歸零。日記 `diary-translation-audit.py` 0 critical。

## description 漢字夾註：從模型失敗改記成閘門可處理的形狀

拆 report 時，失敗理由第三名「description contains CJK」11 次全在 patch 引擎、全是人物篇，正好是昨天 maintainer 合併的那批 description 更新。拿 nemotron 實跑三篇，兩種留字：一種是譯名後面加括號附原文（« Ghost Place » (《鬼地方》)、«Золотой колокол» (走鐘獎)），一種是節目名整個照抄（«Joe是要對決»）。前者機械剝掉不損意思，後者只能重翻。`43247434b3` 加 `strip_cjk_paren_gloss()` 在每次驗證前剝括號夾註，重翻提示改成點名留下的字串並明說書名、節目名、獎名要翻或音譯。四組敗過的篇目實跑：修前四組全擋，修後陳思宏 fr／de、Joeman ru 通過，吳寶春 vi 仍擋。附兩條 pytest。

## 日記投影：雲端層模型下架

Stage D 量到三篇新日記在五個投影語言缺譯（15 份）。`diary-translate.py` 的 owl 層預設是 nemotron super free，現在回 404「unavailable for free」，十五份全敗。改成文章產線當晚實跑成功的 nemotron ultra free，先用環境變數驗一份 en 成功再改預設。ollama 層預設 `qwen3.6:35b-a3b-coding-nvfp4` 不在這台機器（這台只有 gemma4），沒動，記進交接。

## 收官 checklist

| 檢查項                       | 狀態                                      |
| ---------------------------- | ----------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                        |
| Timestamp 精確               | ✅                                        |
| Handoff 三態已審視           | ✅                                        |
| CONSCIOUSNESS 反映最新狀態   | ❌ 夜班不碰，dashboard 由 data-refresh 刷 |
| 自我檢查工具 PASS            | 見 commit 前 prose-health                 |

## Handoff 三態

繼承上一 session（2026-11-25-221405-reach-mining），本班都沒碰，原樣往下：

- [ ] pending（收件席位：twmd-maintainer-daily）tboydar 的 #2070 到 #2075 照例審後合併
- [ ] pending（收件席位：哲宇）PR #2033 再看一次狀態，#2036 要 rebase
- [ ] pending（收件席位：twmd-distill-weekly）MEMORY 索引 inline 超過 80 列，跑 `memory-index-rollup.py --apply`
- [ ] pending（收件席位：哲宇）repo 根目錄補 LICENSE 檔（reach-mining 報告 §二）
- [ ] pending（收件席位：哲宇）`public/llms.txt:114` 那句要不要改寫（reach-mining 報告 §二）
- [ ] pending（收件席位：twmd-rewrite-daily 或手動）〈鄧雨賢〉補四縣腔白話字名，先驗拼法
- [ ] pending（收件席位：哲宇）英文維基〈Taiwan.md〉數字過時，走討論頁（reach-mining 報告 §七）
- [ ] pending（收件席位：手動，`data/terminology/`）詞庫補「牛油果」

本 session 新 handoff：

- [x] ~~description 漢字括號夾註機械剝除＋重翻點名~~（`43247434b3`）
- [x] ~~日記 owl 層預設換成 nemotron ultra free~~（`d881929d98`）
- [ ] pending（收件席位：哲宇）這台機器 `codex login` 過期，委派層缺席（babel-preflight codex 行）
- [ ] pending（收件席位：哲宇）OpenRouter 七把 key 付費餘額全空，Tier 6 Haiku 整夜 402；儲值屬經費決定
- [ ] pending（收件席位：下一班 babel-nightly，`scripts/tools/lang-sync/diary-translate.py` 動得了）ollama 層預設 qwen3.6 不在這台機器，要不要改讀 fleet 核發的模型
- [ ] pending（收件席位：下一班 babel-nightly）〈吳寶春〉vi description 修後仍留漢字，看是不是裸留型；de stale 26＋metadata-stale 20 仍是最大缺口

## Beat 5 — 反芻

今晚最值得記的是自己的尺先錯了一次。verify-batch 十二語整齊地各報 10 個 error，整齊本身就是訊號：十二個語言、兩種模型不會剛好壞成一樣的數字，比較可能是我餵進去的東西有共同的錯。查下去是我做的 manifest 多了一段路徑前綴。另一個小錯也在同一處：我用 `echo "$(basename $m) exit=$?"` 印退出碼，命令替換先跑，`$?` 量到的是 basename，於是第一輪看起來全部 exit=0。兩個錯方向相反，一個讓結果變壞、一個讓結果變好，都出在量測這一層。尺先驗再用（REFLEXES #99）這條在今晚是實際用上的。

🧬

---

_v1.0 | 2026-11-26 01:30 +0800_
_session twmd-babel-nightly — 續命班，dispatcher 第二夜續跑_
_誕生原因：00:30 排程；三重巡檢過，力氣放在拆 report 找確定性缺陷_
_核心洞察：description 留字一半是括號夾註可機械處理，一半只能重翻；整齊的錯誤數先懷疑自己的量法_
