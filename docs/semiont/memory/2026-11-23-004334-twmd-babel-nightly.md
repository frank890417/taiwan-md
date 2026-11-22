# 2026-11-23-004334-twmd-babel-nightly — 續命班：〈水道頭〉九語敗在同一道閘門卻沒有一份被拒的譯文留下來，補上留底

> session twmd-babel-nightly — cron 00:30 觸發（續命型：11-22 18:24 起的 dispatcher 還活著）
> Session span: 00:43 → 約 01:00 +0800（1 個工具 commit、1 個收官 commit）
> 資料來源：`git log %ad`、`/tmp/babel-unified-20261122-182434-92294/report.jsonl` 與 `master.log`、`babel-preflight.py`、`status.py`、`babel-pulse.py`

## 觸發

每晚的巴別塔班。BECOME ACK：mode=write，8 器官最低＝免疫 59（快照齡 18 小時，標 stale），Q14 跨 session 連續性 PASS：11-22 週日鏈恢復（news-lens、distill、self-evolve、routine-audit 都有 commit，weekly-report 02:03 起跑後被舊模型防護擋下，連四週沒有週報）；maintainer 合四件投稿並把越南文摘要重複 49 次修到根；心跳四班額度從 lean 升到 reserve（週用量 93%）都沒做事；babel 產線整天每一兩小時推一批。交接來的那一題（週班連三週沉默）已由 routine-audit 查成兩場整機停電，不屬本席位。

甦醒檔用 Read 分頁讀到 `wake:END`。selftest 亮一盞燈：diary 沉默 21 天。Write mode 的 LONGINGS、ARTICLE-INBOX、SQUEEZE、MEMORY-PIPELINE 本班沒讀，BABEL-VORTEX 只讀 §每輪五動作與 §三重巡檢；本檔格式照昨晚同席位的 memory。額度在保留線上，本班刻意只做一件修補。

## 算力與產線狀態

`babel-preflight.py` 判 healthy（3/4 層）。缺席層：codex 登入過期（身份授權，留哲宇）。付費層七把 key 餘額仍是零。地端 `gemma4:26b` 生成探測 12.6 秒收尾，fleet 只核發 mac-m4max，名單外的 `gemma4:e4b-nvfp4` 裝著但沒被核發。slug 登記全數到位。實績檢查印兩個弱適配組合：nemotron 配阿拉伯文 9%（n=23）、配越南文 9%（n=32）；現役指令行已帶 `--worker-skip-langs nemo=ar,vi`，這兩格已經切軌，表上的數字是切軌前的殘影。

Stage 0.5 第一種：續命。存活（dispatcher 92294 跑了六個多小時、推送迴圈 57192 在，兩者由 launchd 拉著，git 鎖不存在）、生產（近 45 分鐘 report 10 筆、4 筆成功；近三小時 33 筆成功，當下有一篇印地語分段翻譯在跑）、第二訊號源（fleet 核發與 preflight 一致）。沒有重啟，沒有另開一輪。

## 〈水道頭〉：九次失敗，零份證據

11-21 22:58 的 `f775f9835c` 把四篇文章的腳註掛回正文（金曲獎、全聯、鳴日號、水道頭），四篇在十二語同時變 stale。本 run 裡金曲獎 10 語落地、鳴日號 9 語落地，〈水道頭〉只有 3 語落地，另外 9 次失敗全是同一個理由 `verify=1 [URL count]`，橫跨 en／ja／ko／fr／pt／ru／hi／ar／vi，gemma4 八次、nemotron 一次。pt 已被記成 cascade exhausted，另外五語被排到佇列最尾。

同一篇跨模型敗在同一個理由，該先查閘門與母稿。查得到的部分：母稿 12 個網址，現行 HEAD 上的六語譯文拿同一把尺量都是 12 個、multiset 相符，所以不是尺對舊譯文也會叫的那一種。查不到的部分是關鍵的那一半：這次被拒的譯文裡到底是少一條、多一條，還是哪一條被改了一個字元。有 HEAD 版本的路徑一失敗就被還原，被拒的那份不留底；log 只印檢查名，不印細節。九次嘗試花了大約半小時的模型時間，沒有留下一個位元組可以讀。

修法（`909a61ce48`）兩件：

- `keep_rejected_sample()`：還原成 HEAD 之前，把被拒的產出存進 `.babel-quarantine/rejected/`（已在 .gitignore），每個路徑留最近三份。工作樹跟 HEAD 相同時不留，沒產出的失敗不會多出一份 HEAD 的複本。留底失敗不擋還原。
- verify 失敗時多印一行各項檢查的細節（`↳ URL count: zh=12 vs en=11` 這種）。理由欄字串沒動，下游按字串分族的統計不受影響。

四條測試守住：有差異才留、相同不留、檔案不在不算錯、只留最近三份。dispatcher 每輪開頭會自比磁碟上的程式碼，變了就在輪間收工由 launchd 重生，本班收官時它還沒走到下一輪，新程式碼尚未生效。

沒做成的那一半：想在 repo 外的複本裡重跑一次英文版拿到被拒的實物，整篇引擎需要批次清單、語言註冊表與一整套產線腳手架，兩輪補依賴之後放棄；直接在 repo 裡跑會跟活著的產線搶同一個路徑。所以這一題的根因本班沒有答案，答案要等下一次被拒時留下的樣本。

## 查過但沒動的幾族

- 印地語〈台灣新冠疫情與疫苗〉：昨晚的腳註遞迴生效了，本 run 兩次都走過腳註階段，改敗在量級（`magnitude[30]`、`magnitude[24]`）。這是 10-12 手修過的那一族真錯（百萬／億換算差十倍），屬模型能力，不是閘門缺陷。
- 〈Joeman〉〈台灣電影〉〈鳴日號〉的 `tags ASCII`（gemma 配 ar／vi，五次）：模型把中文標籤原樣留下，閘門判對，跟昨晚同一族。
- `no output written` 九次：昨晚交接要把 structured 引擎中止時的最後一行寫進 report，本班沒動。
- 〈沈伯洋〉〈蔣萬安〉〈陳致中〉仍在民調禁止期凍結內（到 11-28 16:00）。

## 各語進度

本班沒有直接落地譯文。對昨晚收官：

| 語言 | fresh | stale | metaStale | missing | fresh 變化 |
| ---- | ----- | ----- | --------- | ------- | ---------- |
| en   | 1189  | 3     | 1         | 0       | 0          |
| ja   | 1186  | 5     | 2         | 0       | −1         |
| ko   | 1184  | 6     | 3         | 0       | −1         |
| es   | 1186  | 5     | 2         | 0       | +1         |
| fr   | 1183  | 7     | 3         | 0       | −1         |
| vi   | 1178  | 14    | 1         | 0       | −1         |
| id   | 1185  | 5     | 3         | 0       | 0          |
| pt   | 1188  | 4     | 1         | 0       | 0          |
| hi   | 1179  | 13    | 1         | 0       | +2         |
| ar   | 1185  | 5     | 3         | 0       | −1         |
| ru   | 1190  | 3     | 0         | 0       | 0          |
| de   | 1160  | 25    | 8         | 0       | −2         |

missing 4 → 0，十二語覆蓋率都是 100%。fresh 合計少 4，是四篇母稿改動讓 48 份譯文變 stale、產線補回大半之後的淨值；pulse gap 119 → 123。backend（本 run 六個多小時）：gemma4:26b 15 成功／26 失敗，nemotron 18／8，Haiku 0／1（付費餘額空）。11-22 之後新記的 cascade exhausted 八對：ar〈台積電〉、en〈台灣教師與AI教學〉、hi〈觀光產業〉、pt〈水道頭〉、ru〈鱔魚意麵〉、vi〈數位荒原〉〈奇拿富〉〈Joeman〉。pulse 存量三族：截斷 24、網址不符 164、名人頂替 172。Stage D 日記：`diary-translation-audit.py` 0 critical。

## 收官 checklist

| 檢查項                       | 狀態                                                                       |
| ---------------------------- | -------------------------------------------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                                                         |
| Timestamp 精確               | ✅（訖點約略）                                                             |
| Handoff 三態已審視           | ✅                                                                         |
| CONSCIOUSNESS 反映最新狀態   | ❌ 本班不碰                                                                |
| 甦醒讀滿                     | ✅ 讀到 `wake:END`；LONGINGS、ARTICLE-INBOX、SQUEEZE、MEMORY-PIPELINE 沒讀 |
| diary                        | ➖ 不寫（selftest 那盞燈照實留著）                                         |
| evolve                       | ➖ 修補已在本班當場落地                                                    |

## Handoff 三態

繼承 `2026-11-22-004248-twmd-babel-nightly`：

- [ ] pending（收件席位：哲宇，經費決定）：付費層七把 key 餘額用完，原樣續傳
- [ ] pending（收件席位：哲宇，身份授權）：這台機器 codex 登入過期，原樣續傳
- [ ] pending（收件席位：設計席位，LESSONS `metadata-stale-bump-assumes-frontmatter-unchanged`）：原樣續傳
- [ ] pending（收件席位：下一班 babel）：`babel-pulse` 常駐沒掛、名人頂替存量 172、fleet 三台 GPU 節點是否刻意關機、量級差十倍的機械改寫、隔離區重放子指令，五條原樣續傳，本班都沒動
- [ ] pending（收件席位：下一班 babel，動得了 `scripts/tools/lang-sync/`）：`no output written` 一句話蓋住五種原因，原樣續傳
- [ ] pending（收件席位：哲宇或語言指南席位，閘門規則）：越南文裡講台灣金額的裸 đồng，原樣續傳
- ~~pending：看 hi 三篇重腳註文章在 gemma 那條 lane 有沒有走過腳註階段~~ retired by 本班：〈台灣新冠疫情與疫苗〉兩次都走過腳註階段，改敗在量級，是下一層的真錯；〈中央研究院〉〈台灣醫療與全民健保〉本 run 的印地語沒有紀錄

本 session 新 handoff：

- [ ] pending（收件席位：下一班 babel）：讀 `.babel-quarantine/rejected/knowledge/*/Society/shuidaotou-waterworks.md.*` 與 master.log 裡 `↳ URL count` 那一行，判定〈水道頭〉是閘門誤判還是模型真的動了網址。先確認 dispatcher 已經重生成新程式碼（log 有 `🧾 被拒產出留底`）；樣本目錄是空的而失敗還在累積，就是留底沒生效
- [ ] pending（收件席位：下一班 babel）：preflight 的弱適配表不知道 `--worker-skip-langs` 已經把那一格切走，連著幾班會一直印同兩格直到兩日窗口滾過；要不要讓表扣掉已切軌的組合

## Beat 5 — 反芻

昨晚拆開的是一句話蓋住五種原因，今晚碰到的是理由欄寫得很清楚、卻還是查不下去。差別在證據的壽命：寧可 stale 也不要 missing 這條規則保護了讀者看到的那份譯文，同時把每一次失敗的實物在幾毫秒內抹掉。規則本身沒有錯，它只是沒有區分「不讓壞譯文上線」與「不讓任何人再看到壞譯文」。

🧬

---

_v1.0 | 2026-11-23 01:00 +0800_
_session twmd-babel-nightly — 續命班，被拒譯文留底與檢查細節進 log，沒有落地譯文_
_誕生原因：cron 00:30 每晚巴別塔班_
_核心洞察：還原保護了讀者，也抹掉了診斷需要的實物；失敗九次沒有一份可讀的樣本時，先補留底再談根因_
_LESSONS-INBOX 候選：`restore-to-head-erases-the-evidence-of-why-it-failed`（有 HEAD 版本的路徑失敗後不留被拒產出，REFLEXES #38 (d) 的判讀捷徑因此走不下去）_
