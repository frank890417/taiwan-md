# 2026-11-25-004731-twmd-babel-nightly — 續命班：PTT 那篇的標題被閘門推成「PTT PTT」

> session twmd-babel-nightly — cron 00:30 觸發（續命型：11-24 00:57 起的 dispatcher 還活著）
> Session span: 00:43 → 約 01:05 +0800（1 個譯文 commit、1 個收官 commit）
> 資料來源：`git log`、`/tmp/babel-unified-20261124-005724-52905/` 的 `report.jsonl`／`master.log`／`quarantine/`、`babel-preflight.py`、`status.py`

## 觸發

每晚的巴別塔班。BECOME ACK：mode=write，8 器官最低＝免疫 59（快照齡 18 小時，標 stale），Q14 跨 session 連續性 PASS：11-24 產線從中午起十二語各推兩批（12 篇、8 篇），之後每一兩小時零星幾篇；maintainer 合四件投稿並修兩條原本就在的壞引用；心跳四班都沒做事，額度週用量 27%→38%；昨晚本席位修了網址尺不認成對括號，交接要下一班確認〈水道頭〉過關。

甦醒檔用 Read 分頁讀到 `wake:END`（11 段全讀）。selftest 亮一盞燈：diary 沉默 23 天；本班照 DIARY-PIPELINE routine 預設不寫，反芻放本檔 Beat 5。Write mode 的 LONGINGS 與 ARTICLE-INBOX 本班沒讀；BABEL-VORTEX 讀 §三重巡檢，SQUEEZE 沒重讀。

## 算力與產線狀態

`babel-preflight.py` 判 healthy（3/4 層）。缺席層：codex 登入過期（身份授權，留哲宇）。付費層七把 key 餘額仍是零，Haiku 撞 402。地端 `gemma4:26b` 生成探測 3.5 秒；fleet 只核發 mac-m4max，名單外的 `gemma4:e4b-nvfp4` 仍未核發。slug 登記全數到位。弱適配一格：gemma4×ar 14%（n=14）；昨晚的 nemotron×hi 13% 這次不在表上。

Stage 0.5 第一種：續命。存活（dispatcher 52905 由 launchd 在 11-24 00:57 重生，推送迴圈 57192 在，git 鎖不存在）、生產（近 45 分鐘 report 2 筆，都是失敗；這個 run 24 小時 293 筆、187 筆成功）、第二訊號源（fleet 核發與 preflight 一致）。沒有重啟，沒有另開一輪。

## PTT：閘門把標題推成同一個字寫兩次

拆本 run 的失敗，〈PTT批踢踢〉在 de／es／fr／pt／ar 五語、gemma4 與 nemotron 兩種模型都敗在 `frontmatter not untranslated`，fr 累積八次被記成 cascade exhausted。

母稿標題是「PTT 批踢踢：台灣最頑固的公共廣場」，批踢踢就是 PTT 的音譯。翻成拉丁字母後兩個字是同一個字。閘門第 13 檢查不收非 CJK 語言標題裡裸露的漢字，判斷本身沒錯；模型要過閘只剩兩條路，丟掉批踢踢，或把它也寫成 PTT。已上線的譯文走了第二條：es、id、ru、fr 的 HEAD 標題都是「PTT PTT:」，hi 寫成編出來的音譯「PTT बैचिकिक」。在閘門之前，這是讀者看得到的錯；在閘門之後，它是閘門的誘因產物，跟 09-27 ja 人名標題那一次（模型為了過閘替名字加拼音）是同一種形狀。

全庫掃「標題開頭同一個拉丁字重複」32 筆，其餘都是本來就疊字的名字（旺旺、丹丹、彎彎），真的病只有 PTT 這一家。

處置（`81f4b262cb`）：

- es／id／ru 已 fresh 的譯文，標題改成跟 en／de／ar／pt 一樣的「PTT:」。
- fr 用今晚 23:43 被拒的那份譯文（只敗在標題這一項，sourceContentHash 是現行母稿）補上，標題同樣去掉批踢踢。
- 四個檔都跑 dispatcher 自己的 `verify_one()`（七道閘門）與 `verify-batch.py`，全過；commit 前 prettier 與 pre-commit health 全綠，`verify-commit-scope.sh --head 4` OK。fr fresh 1185→1186。
- pt、hi 仍 stale，另有 URL count、tags ASCII 兩族失敗，留給產線；hi 那個編出來的音譯會跟著重翻消失，如果它又長回來要手改。

沒動閘門。問題的源頭在母稿標題本身帶一個翻譯後必然重複的字，要不要改中文標題是編輯決定，不歸這個席位。

## 查過但沒動的幾族

- 〈鱔魚意麵〉vi `no output written` 三種模型（含 Haiku 402），收官時 structured-translate 正在跑它（PID 74126，23:50 起）。
- `currency`：vi〈新台幣〉、fr〈嘉義農林〉；`magnitude`：vi／hi〈台灣新冠疫情與疫苗〉、ar〈台灣電影〉、hi〈開源社群與g0v〉〈巨大機械〉。模型能力那一族，付費層沒餘額，數字錨定手修本班沒做。
- `tags ASCII`：fr／hi／pt〈PTT〉、vi〈愛玉〉，只有 gemma4，閘門判對。

## 各語進度

對昨晚收官：

| 語言 | fresh | stale | metaStale | missing | fresh 變化 |
| ---- | ----- | ----- | --------- | ------- | ---------- |
| en   | 1191  | 2     | 1         | 0       | 0          |
| ja   | 1188  | 4     | 2         | 0       | 0          |
| ko   | 1186  | 5     | 3         | 0       | 0          |
| es   | 1187  | 5     | 2         | 0       | 0          |
| fr   | 1186  | 5     | 3         | 0       | +1         |
| vi   | 1184  | 10    | 0         | 0       | +4         |
| id   | 1186  | 5     | 3         | 0       | 0          |
| pt   | 1189  | 4     | 1         | 0       | −1         |
| hi   | 1179  | 13    | 2         | 0       | −4         |
| ar   | 1190  | 4     | 0         | 0       | +1         |
| ru   | 1192  | 2     | 0         | 0       | 0          |
| de   | 1157  | 24    | 13        | 0       | −4         |

zh 母稿 1194 篇，十二語 missing 全為 0（vi〈愛玉〉已補上）。負的變化是母稿有更新（11-23 晚 tboydar 兩批人物 description、30 條裸網址轉腳註）讓譯文轉 stale，不是退步。backend（本 run）：gemma4:26b 101 成功／50 失敗，nemotron 86／52，Haiku 0／2（402）。Stage D 日記：`diary-translation-audit.py` 0 critical。

## Handoff 三態

繼承 `2026-11-24-004659-twmd-babel-nightly`：

- [ ] pending（收件席位：哲宇，經費決定）：付費層七把 key 餘額用完，原樣續傳
- [ ] pending（收件席位：哲宇，身份授權）：這台機器 codex 登入過期，原樣續傳
- [ ] pending（收件席位：設計席位，LESSONS `metadata-stale-bump-assumes-frontmatter-unchanged`）：原樣續傳
- [ ] pending（收件席位：下一班 babel）：`babel-pulse` 常駐沒掛、名人頂替存量、fleet GPU 節點是否刻意關機、量級差十倍的機械改寫、隔離區重放子指令，原樣續傳
- [ ] pending（收件席位：下一班 babel，動得了 `scripts/tools/lang-sync/`）：`no output written` 一句話蓋住多種原因，原樣續傳
- [ ] pending（收件席位：哲宇或語言指南席位，閘門規則）：越南文裡講台灣金額的裸 đồng，原樣續傳
- [ ] pending（收件席位：下一班 babel）：preflight 弱適配表不扣已切軌的組合，原樣續傳；nemotron×hi 本班不在表上，不必切軌
- ~~pending：確認〈水道頭〉下一次被派到時過了 URL count~~ retired by 本班：十二語 sourceContentHash 全等於現行母稿
- [ ] pending（收件席位：下一班 babel）：markdown 連結目標 `_URL_TOKEN_RE` 對 `[x](…_(Y))` 的截斷，母稿裡有沒有這種連結還沒量，原樣續傳
- ~~pending：推送迴圈被未追蹤檔擋住~~ 連兩班沒再發生，觀察中

本 session 新 handoff：

- [ ] pending（收件席位：rewrite／編輯席位）：〈PTT批踢踢〉中文標題「PTT 批踢踢」翻成拉丁字母必然重複，要不要改母稿標題是編輯決定；不改的話每次母稿更新，十二語都會再被閘門推一次
- [ ] pending（收件席位：下一班 babel）：pt、hi〈PTT〉仍 stale；hi 重翻後若標題又出現編造的音譯，照本班作法手改

## Beat 5 — 反芻

閘門擋下的東西是對的，模型繞過它的方式也是對的，兩件對的事疊起來，讀者看到同一個字寫兩次。這類錯不會出現在失敗統計裡，因為它出現在通過的那一邊：es、id、ru 三份「PTT PTT」都是綠燈上線的。我能看見它，是因為先去拆了 fr 失敗八次的原因，再回頭看那些沒失敗的語言怎麼過的。失敗的樣本說明閘門在擋什麼，通過的樣本才說明大家是怎麼繞過去的。

🧬

---

_v1.0 | 2026-11-25 01:05 +0800_
_session twmd-babel-nightly — 續命班，PTT 標題四語修正，fr 補上一篇_
_誕生原因：cron 00:30 每晚巴別塔班_
_核心洞察：閘門誘發的改寫只出現在通過的那一邊，拆失敗原因之後要回頭看通過的樣本_
_LESSONS-INBOX 候選：`gate-induced-rewrite-hides-in-the-passing-set`（REFLEXES #69 (g) 形式閘門全過但意義錯的 babel 版；09-27 ja 人名標題是第一例，本次第二例）_
