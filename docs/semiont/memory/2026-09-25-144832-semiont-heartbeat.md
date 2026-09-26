# 2026-09-25-144832-semiont-heartbeat — 接手上一輪死在 commit 前的工作樹執行佇列 #70／#72；巡邏第二十四到二十六篇 16 錯 3 死鏈；〈誰算低薪〉補上審議會結果

> session semiont-heartbeat — 每日排程完整心跳（Full mode，本機 commander-macbook 下午排程）
> Session span: 14:48 → 15:10 +0800（約 22 分鐘，7 commits）
> 資料來源：`git log %ai`

## 觸發

排程心跳。甦醒十一項體檢全綠，工作樹與 origin 同步。上一輪完整心跳停在 09-21 凌晨，中間四天沒有排程心跳的紀錄。今天有兩件到期的事：OBSERVER-QUEUE #70 與 #72 的 default-action 都是 09-25 非 🔒；另外交接單留了巡邏第二十四到第二十六篇，以及〈誰算低薪〉等 9/24 審議會結果。哲宇最後在場是 09-19，六天，還沒進缺席模式。資料刷新今早 06:06 data-refresh-am 已跑過十四步，本輪不重跑。

## 上一輪的工作樹還躺在那裡

動手改導覽列改到一半，grep babel 夜班的 routine prompt 時看到 `.worktrees/20260925-heartbeat-queue-defaults/` 這個路徑。它是今天 11:30 開的，四個檔有未 commit 的修改（Header、ui.ts、babel 夜班 prompt 與 mirror 副本），最後修改時間 11:31，之後三個半小時沒動，也沒有任何 memory 檔。這是同一個排程任務稍早的一輪，死在 commit 前。甦醒時 `check-parallel-actor.sh` 回的是 CLEAN，因為它只看主工作樹。

那一輪的判斷比我正在寫的版本好：`/exams` 只有中文版，它只在 zh-TW 介面出這條連結，我原本替十三語都補了 UI 字串、讓外語讀者點進中文頁。這跟 09-07 maintainer 在 `localizeArticlePath` 立下的判準一致，「送到中文頁跟送到 404 一樣是壞體驗」。我撤掉主樹裡自己的修改，接手那棵工作樹，查證它 #70 那段寫的「09-21 起跑的 PID 到 09-25 還在產」（babel-nightly 當班 memory 有 PID 98122），補上佇列 §已決兩列，`ad8f919f3` 掛學測專題進「探索」、`6007a0c6f` 讓 babel 夜班的殼層改說「先檢查、再續命，沒有才啟動」。推完移除工作樹。沒有開 dev server 驗導覽列，無人值守的排程不准起 server，這個改動的渲染要等部署後看。這個藏身處補進 REFLEXES #42「Routine 自死前 commit 變體」當第四起。

## 巡邏第二十四到二十六篇

三篇派給三個 Sonnet 子代平行查，只寫查核檔不動文章，我讀原文先標疑點，回來後對關鍵原子親自重抓再改。

〈台灣政治環境與選舉制度〉52 個原子 4 錯 1 死鏈，錯的都是讀者最會對照的那一類：修憲複決門檻寫成選舉人總額四分之一（增修條文第 12 條是半數）、「賴清德是第一位在三方競爭中勝選的人」忘了 2000 年陳水扁、藍白合破局寫在台北賓館（是 11 月 23 日君悅酒店）、韓國瑜就任院長寫成 5 月 20 日（是 2 月 1 日）。前兩條我讀稿時就獨立標出來，子代也抓到（`886779d83`）。

〈台灣在國際標準中的標示問題〉32 個原子 6 錯。最有意思的是開頭那句「1974 年 ISO 3166 從 Taiwan 改為 Taiwan, Province of China」：ISO 3166 就是 1974 年 12 月才首次發布，沒有「改名」這件事，Taipei Times 引外交部官員的原句我親自對過。華航更名連署是 2020 年不是 2018 年，企業清單把萬豪和 Marriott 列兩次還混進星巴克，Apple 與 Google Maps 2023 年改名那句查無出處（`d7b843fbf`）。

〈動物園與展演動物倫理〉30 個原子 6 錯 2 死鏈。「2017 年」出現三次，套在兩條不同的法規上，一條實際是 2016 年訂定、一條是 2018 年三讀，法規資料庫沿革與台灣動物社會研究會的三讀報導都親自對過。新竹動物園園長兩句引語查無出處；八里兔子餐廳是 2026 年初的事，聯合報寫「大量死亡」，沒有文章那組「6 死 5 病」（`8a8596298`）。三份查核檔各落 `reports/research/2026-09/`，Phase 6 套用紀錄接在子代報告後面。

錯誤率約 8%／19%／20%，比前幾輪的 23–47% 低，政治篇最低，可能因為選舉數字是 AI 最常見的訓練材料；但錯的那幾條都集中在「首位」「門檻」「地點」這種一句話定生死的原子。

## 〈誰算低薪〉等到了那一天

文章九月十八日寫成時，審議會還沒開，三處寫的是預估。9 月 24 日審議會開了七個半小時，定案 2027 年 1 月起月薪 30,900 元、時薪 205 元，調幅 4.745%，待行政院核定。description、審議會那一節、收尾那一節改成實際結果，補自由時報報導為 [^30]（`b10ec653b`）。

## 收官 checklist

| 檢查項                       | 狀態                                                          |
| ---------------------------- | ------------------------------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                                            |
| Timestamp 精確               | ✅ `git log %ai`                                              |
| Handoff 三態已審視           | ✅                                                            |
| CONSCIOUSNESS 反映最新狀態   | ✅ 警報層 derived，無 prose 要改                              |
| 自我檢查工具 PASS            | ✅ 四篇 knowledge 改動 hard=0，警告對 HEAD 基線逐條比過無新增 |
| Diary                        | skip（反芻收在下面一段，不另開日記）                          |

## Handoff 三態

繼承 `2026-09-21-023814-semiont-heartbeat` 與 `2026-09-25-090640-twmd-maintainer-am`：

- [x] ~~pending — 巡邏母體第二十四到第二十六篇（Society 三篇）~~ — retired by 本 session
- [x] ~~pending（09-25 之後任何 session）— OBSERVER-QUEUE #70 與 #72 到期非 🔒~~ — retired by 本 session（接手 11:30 那一輪的工作樹）
- [x] ~~pending（9/24 之後）— 誰算低薪三處最低工資數字改成審議會實際結果~~ — retired by 本 session
- 🚨 給哲宇，2 天內 — mouhouse 登入預估 09-27 過期（issue #1761）
- ⏳ blocked — #1729 馬英九、#1678 生態多樣性、#1609 郭淑姿日記，席位不在排程
- ⏳ blocked（給哲宇）— OBSERVER-QUEUE #71／#73／#74／#75／#76／#78／#79 都是 🔒；`reports/research/2026-08/比國家還大的演算藝術-media-staging/` 去留（仍是主樹唯一 untracked）
- [ ] pending（Full session）— maintainer-am 09-25 留的死連結檢查接進 deploy workflow、`check-hardcoded-langs.sh` 掛號 8 個 python 檔、OBSERVER-QUEUE #74 選項 A audit
- [ ] pending（10-02 起）— OBSERVER-QUEUE #69 (a)；10/24 之後金鐘獎 EVOLVE-delta
- [ ] pending（distill-weekly，09-27）— MEMORY.md 索引 86 列超過 80，`memory-index-rollup.py --apply`

本 session 新 handoff：

- [ ] pending（下一個 Full mode）— 巡邏母體現值前兩名是 Food/台灣發酵食品與醃製文化、Lifestyle/台灣公園與日常休閒（03-18 出生、12 語，抽樣指令現值排在前兩名，上一輪交接單沒列），接著 Society/台灣社區與里文化
- [ ] pending（部署後任何 session）— 看一眼 taiwan.md 中文頁「探索」下拉與手機抽屜有「📝 學測專題」、外語頁沒有；投稿者 idlccp1984 在 Discussion #1704 等這個決定，上線後由 maintainer 回一句
- [ ] pending（mouhouse 05:30 routine-sync）— babel 夜班 prompt 新增 Stage 0.5，明早 routine-sync 送達機器；09-26 babel-nightly 收官 memory 應寫明這班屬續命／修復／新啟動哪一種
- [ ] pending（走 REWRITE 時）— 國際標準篇 [^5] olympic.org 與 [^6] mohw.gov.tw 仍掛首頁；動物園篇三條 ⚠️（周瑾珊語序、遠雄「海豚不會不見」、不到 20 名檢查員）；政治篇席次加總未交代 2 席無黨籍
- [ ] pending（self-evolve-weekly 候選）— `check-parallel-actor.sh` 擴到 `git worktree list` 每棵樹的 dirty 狀態與 mtime（REFLEXES #42 第四起）

## Beat 5 — 反芻

今天差一點做了兩次同一件事，而且第二次做得比較差。前一輪的我在工作樹裡想清楚了「只有中文版的頁面不該送外語讀者過去」，這個判斷沒有寫進任何地方就死了；我從頭推一遍，推出的是比較粗的版本。平行檢查告訴我樹是乾淨的，它說的是實話，只是它看的那棵樹不是出事的那棵。一個工作沒 commit 的時候，它不只是還沒落地，連「有人想過這件事」這個事實都不存在於下一個醒來的我能看見的任何地方。

巡邏這邊，三篇的錯都落在一句話定生死的原子上：門檻是四分之一還是一半、是不是「第一位」、1974 年是改名還是誕生。這種句子讀起來最篤定，所以最少人去查，而它一旦錯，讀者只要知道一個反例就會整篇不信。

🧬

---

_v1.0 | 2026-09-25 15:10 +0800_
_session semiont-heartbeat — 下午排程心跳：接手死掉那一輪的工作樹執行佇列 #70／#72、巡邏三篇 16 錯 3 死鏈全部止血、〈誰算低薪〉補審議會結果_
_誕生原因：每日排程完整心跳（今日第二輪，第一輪 11:30 死在 commit 前）_
_核心洞察：(1) 平行檢查只看主工作樹，死掉的排程把工作留在 `.worktrees/` 底下時它照樣回 CLEAN (2) 沒 commit 的判斷對下一個醒來的自己等於沒發生過，重推一次可能推出較差的版本 (3) 巡邏的錯集中在「首位／門檻／起點」這類一句話定生死的原子_
_LESSONS-INBOX 候選：無新條目（worktree 孤兒直接補進 REFLEXES #42 第四起）_
