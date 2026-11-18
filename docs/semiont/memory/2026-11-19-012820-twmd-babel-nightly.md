# 2026-11-19-012820-twmd-babel-nightly — 續命班：四千多份只差查證標記的譯文直接對齊，缺口從 5,635 降到 1,102

> session twmd-babel-nightly — cron 00:30 觸發（續命型：11-18 01:16 起的 dispatcher 還活著）
> Session span: 約 00:45 → 01:35 +0800（1 個工具 commit、12 個譯文 commit、1 個收官 commit）
> 資料來源：`git log %ad`、`/tmp/babel-unified-20261118-004614-39953/report.jsonl`、`babel-preflight.py`、`status.py`、`babel-pulse.py`

## 觸發

每晚的巴別塔班。BECOME ACK：mode=write，8 器官最低＝免疫 59（快照齡 18 小時，標 stale），Q14 跨 session 連續性 PASS：11-18 整天 babel 產線每幾分鐘一筆 commit，maintainer 合併六件投稿，晚間 α 班修用語庫「梵穀」；五條週班 11-14/15 沉默死亡，對上營運機離線，下次排程 11-22。甦醒檔用 Read 分頁讀到 `wake:END`；selftest 唯一的燈是 diary 沉默 17 天。LONGINGS 本班沒讀，SQUEEZE 只讀 §Tier 0b，BABEL-VORTEX 讀 §三重巡檢。

## 算力與產線狀態

`babel-preflight.py` 判 healthy（3/4 層）。缺席層：codex 登入過期（身份授權，留哲宇）。付費層七把 key 餘額都花完，Haiku 從起跑第一個鐘頭就收到 402，dispatcher 記了一筆 `tier6_credit_out` 後沒再派它。地端 `gemma4:26b` 生成探測 57.5 秒收尾；fleet 只核發 mac-m4max 一條 lane。

這班是 Stage 0.5 的第一種：續命。三重巡檢都過：存活（dispatcher 39953 已跑 24 小時、推送迴圈 57192 在、兩支都由 launchd 拉著）、生產（近 45 分鐘 91 筆全部保留，地端 77、nemotron 14）、第二訊號源（fleet 核發與 preflight 一致）。沒有重啟，也沒有另開一輪。

## 失敗紀錄裡找不到閘門缺陷

整輪 1,283 筆，保留 1,205。跨三種以上模型、同一篇同一理由敗的情況沒有出現。最常見的幾篇都是單一模型的毛病：〈鱔魚意麵〉gemma 在 ru／pt 兩次都弄丟同兩張站內圖的佔位符，nemotron 那次是書目區冒出簡體字，es 與 de 換手後都過了；〈偏遠地區學校教育發展條例〉三語敗在 URL 數量，三次都是 gemma。最大的一團「no output」是起跑時 Haiku 撞餘額，不是閘門。

## 只差兩行的四千多份譯文

`status.py` 每語 metadata-stale 約 410 份，十二語合計 4,922。逐份把中文母稿從譯文的 sourceCommitSha 取出來比 frontmatter：4,524 份只差 `curation`／`curationReason` 兩欄，正文逐字相同；其餘 398 份有 description、title 或正文尾段的變動。前者全是 11-17 補「🌱 進化中・待查證」造成的，產線照 10-16 的設計把它們送進補丁引擎一份一份重翻 frontmatter，以目前每小時約 100 份的產能要兩天。

`bump-source-sha.py` 加 `--curation-only`（`493fe5454`）：只收「母稿從譯文來源 sha 到現在只變這兩欄、其後全文逐字相同」的那些，照抄兩欄並對齊 sha，工作樹上產線正在改的跳過；另加 `--limit` 與 `--list-out`。先抽 10 份看 diff、確認 status 轉 fresh、verify-batch 0 錯，再全量套用 4,468 份，每語跑 verify-batch，十二語全部 0 錯才在共用 git 鎖底下精確路徑 commit（`59bf6b684`、`07de0011f`〜`ba7c8ab41`）。剩下沒進這批的幾十份是產線同時已經在處理的。

## 沒讀到的那條交接

收官讀 11-18 babel 班的 memory 才看到：那班量到同一批 metadata-stale，判斷整批 bump 有方向性問題，寫了「在那之前不要對這批 480 篇跑整批 bump」，交給設計席位。甦醒的 handoff 段只撈最新一檔（11-18 α），α 寫「其餘原樣續傳」，於是這條沒有送到這班手上。

事後核對寫入值：4,468 份全是 `incubating`（unverified 4,415、thin 53），正是那條顧慮說安全的方向；同班在工具裡補上方向閘門，母稿值不是 `incubating` 就不收（升成 verified 或拿掉標記的，照舊交給補丁引擎與人）。一般同步集 `SYNC_SCALAR_FIELDS` 沒動，那仍是設計席位的決定。LESSONS `metadata-stale-bump-assumes-frontmatter-unchanged` 記了這次的後續。

## 各語進度

| 語言 | fresh 起 → 收 | metaStale 起 → 收 | stale | missing |
| ---- | ------------- | ----------------- | ----- | ------- |
| en   | 721 → 1103    | 416 → 34          | 48    | 6       |
| ja   | 721 → 1105    | 418 → 34          | 45    | 7       |
| ko   | 727 → 1110    | 411 → 28          | 46    | 7       |
| es   | 728 → 1105    | 410 → 33          | 47    | 6       |
| fr   | 728 → 1111    | 412 → 29          | 43    | 8       |
| vi   | 715 → 1086    | 408 → 37          | 57    | 11      |
| id   | 715 → 1096    | 414 → 33          | 54    | 8       |
| pt   | 727 → 1105    | 408 → 30          | 50    | 6       |
| hi   | 707 → 1081    | 407 → 33          | 63    | 14      |
| ar   | 717 → 1095    | 414 → 36          | 50    | 10      |
| ru   | 734 → 1113    | 408 → 30          | 42    | 6       |
| de   | 703 → 1080    | 417 → 40          | 63    | 8       |

`babel-pulse` gap 5,635 → 1,102，孤兒 0、殘留暫存 0。pulse 另外印著截斷 26、網址不符 258、名人頂替 179，本班沒動，是既有存量。backend：本班 bump 零模型呼叫；產線同時段地端 gemma4 與 nemotron 照常產出。Stage D 日記 babel 本班沒查。

## 收官 checklist

| 檢查項                       | 狀態                                      |
| ---------------------------- | ----------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                        |
| Timestamp 精確               | ✅（起點約略）                            |
| Handoff 三態已審視           | ✅                                        |
| CONSCIOUSNESS 反映最新狀態   | ❌ 本班不碰，babel 產線不寫 CONSCIOUSNESS |
| 甦醒讀滿                     | ⚠️ 甦醒檔讀滿；SQUEEZE 只讀 §Tier 0b      |

## Handoff 三態

繼承 `2026-11-18-011609-twmd-babel-nightly`：

- ~~pending：看 `💳 tier6 帳戶餘額用盡` 有沒有出現~~ retired by 本班：report 01:23 有 `tier6_credit_out` 事件，之後 Haiku 沒再被派
- [ ] pending（收件席位：哲宇，經費決定）：付費層七把 key 餘額用完，要儲值或刪 `~/.config/taiwan-md/babel-extra-workers` 回純免費產線，原樣續傳
- [ ] pending（收件席位：設計席位，LESSONS `metadata-stale-bump-assumes-frontmatter-unchanged`）：一般同步集要不要收查證標記兩欄。本班只做了只往 `incubating` 抄的窄路，這題仍開著
- [ ] pending（收件席位：下一班 babel）：`babel-pulse` 常駐仍沒掛，三支 launchd 工作重開機會消失，原樣續傳

繼承 `2026-11-18-203540-α`：用語庫字形掃描、週班 11-22 是否恢復，原樣續傳。

本 session 新 handoff：

- [ ] pending（收件席位：哲宇，身份授權）：這台機器的 codex 登入過期，要重新 `codex login`
- [ ] pending（收件席位：下一班 babel）：剩約 400 份 metadata-stale（description／title 有改）、約 600 份 stale、約 100 份 missing，交給產線照常消化

## Beat 5 — 反芻

一個缺口用模型一份一份補，跟它到底需不需要模型，是兩個問題。前一晚的我量到了同一批四千多份，判斷得也對，只是那份判斷落在一個這班甦醒時不會讀到的檔案裡：交接段只往回撈一檔，上一檔寫「其餘原樣續傳」，到這班手上的只有那一句話。這次結果落在安全的那一邊，靠的是補標本身只往保守方向寫，那條提醒我是收官才讀到的。

🧬

---

_v1.0 | 2026-11-19 01:35 +0800_
_session twmd-babel-nightly — 續命班（dispatcher 跨夜存活）_
_誕生原因：metadata-stale 九成是查證標記補標，產線在用模型重翻兩行 enum_
_核心洞察：先問缺口需不需要模型；交接寫「其餘原樣續傳」時，被續傳的內容不會跟著到下一班_
_LESSONS-INBOX：`metadata-stale-bump-assumes-frontmatter-unchanged`（+1 後續）_
