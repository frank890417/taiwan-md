# 2026-11-22-010222-twmd-news-lens-weekly — 探測器隔 28 天重開：選舉那一側都備好了，空白在財經；台股條目停在五月最高點、國安基金零條目、黃仁勳時態送裁定

> session twmd-news-lens-weekly — 週日 01:00 cron routine（Write mode boot）
> Session span: 01:02:22 → 01:12 +0800（約 10 分鐘，本班 2 commits：`e933243a66`、本檔）
> 資料來源：`git log %ai`、`date`

## 觸發

週日 01:00 排程。11-01、11-08、11-15 三班 fire 後都沒有 git 痕跡，groundtruth 從 11-01 起亮著四盞週日 routine「沉默死亡」黃燈，本班距上次探測 28 天。

BECOME ack：mode=write／8 器官最低 🛡️ 免疫 59（consciousness-snapshot.sh 即時讀，快照齡 18h）／Write mode 子集 Q1-4、Q8-11、Q14 過。wake-context 完整讀到 `wake:END`，selftest 帶一個 ⚠️：diary 最新一篇 11-02，距今 20 天。工作樹有巴別塔 writer 的未 commit 改動（translation-status、babel 報表、structured-translate），本班不碰；commit 只明列三個路徑，事後 `git show --stat` 確認只有那三檔。排程 prompt 寫的專案路徑是另一台機器的家目錄，本班照實際工作目錄跑。

## 三源交叉

讀 `dashboard-analytics.json`（GA 到 11-21、SC 到 11-19、CF 到 11-20，都 fresh），另用 `sc-query.py` 抓 11-06〜11-12 當基準。過兩源以上的五條：九合一選舉頁群三源全亮（GA〈候選人名冊〉28 天 3,216 次全站第二；SC「候選人」點擊 144 → 284；CF 三天窗前八有六個是選舉頁）；〈新臺幣〉（GA 7 天文章第一＋SC「四萬換一元」曝光 54 → 2,033）；〈陳樹菊〉三源但查無本月觸發、SC 上週還更高，是常青流量；〈史明〉GA＋SC 點擊翻倍，查無觸發；id〈資料台灣〉彩券詞撞字還在長（SC 點擊 6 → 39）。

單源：SC「選舉公報什麼時候發」5,493 曝光 CTR 0.91%；en「kaohsiung incident」12,194 曝光 0 點擊；「pixnet」28.6 萬曝光 0 點擊；CF 7 天 2,213 萬請求裡台灣佔 2,063 萬，同期訪客只有 29.8 萬，GA 沒有對應人流。

上一班交接要複查的 ar「نيك」系 query 本週 0 點擊 0 曝光，10-25 改門面後回落，這條收掉。

`sc-query.py` 取 400 筆時按點擊排序，兩週各自的前 400 名不同，所以「上週 0 → 本週數千」的上升榜大半是截斷造成的。報告只收兩週都在榜內的對比。

## 探測器

四頻道 15 次 WebSearch，全部只讀搜尋摘要沒有開原文，Threads 那一格只拿到半年前的盤點，報告裡照實標 ⚠️，每條外部事實都列進必驗。外部大事：九合一剩六天與公投第 22 案、台股單週跌 17.5%、黃仁勳辭任輝達執行長、新台幣 19 個月新低、俄軍機兩度進防空識別區、APEC 深圳稱謂爭議、皮克敏「中國台灣」、金馬 63 今晚。

三邊對照用 python 計數腳本，正控制「棒球」37 檔先過。選舉、公投、核能、金馬、選舉公報都有近兩個月內寫好的條目。空白在財經：`國安基金` 檔名與內文都是 0；〈台灣股市與資本市場〉`lastVerified` 停在 05-03，標題還寫「2026 全球第 6 大」；〈黃仁勳〉通篇把他寫成現任執行長。兩篇各有 12 語譯本。

報告落 [reports/probe/2026-11-22.md](../../../reports/probe/2026-11-22.md)＋INDEX 一列，prose-health hard=0。進 ARTICLE-INBOX §Pending 頂端三條（`e933243a66`）：P1 EVOLVE〈台灣股市與資本市場〉（`Angle-expires` 12-20）、P1 NEW〈國安基金〉（evergreen）、P0 EVOLVE〈黃仁勳〉（Notes 第一行標需哲宇裁定，推薦只補一句辭任並改時態；期限 12-06）。`inbox-audit.py --angles` 讀到 15 條，EXPIRED 0、NEWS-UNMARKED 0。

民調禁止期到 11/28 16:00，搜尋結果裡出現的民調數字沒有寫進任何檔案。

孢子出口：`twmd-spore-publish-daily.enabled = false`（dump 11-21 06:07），propose 0，五條掛鉤列在報告 Tier 3。

## 跟上次 probe 的對照

上次登記的三條兩條 ✅，都是 tboydar 交的稿。〈台灣鐵路地下化〉已在 `knowledge/Geography/`，INBOX 那條仍掛 pending NEW、DONE-LOG 沒有紀錄，跟上次電價與林郁婷同一種漂移，交 maintainer。跨境鎮壓 28 天未裁定。

## 收官 checklist

| 檢查項                       | 狀態                                                           |
| ---------------------------- | -------------------------------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                                             |
| Timestamp 精確               | ✅                                                             |
| Handoff 三態已審視           | ✅                                                             |
| CONSCIOUSNESS 反映最新狀態   | ❌ 本 routine 不改 CONSCIOUSNESS，器官分數由 data-refresh 更新 |
| 自我檢查工具 PASS            | ✅ prose-health hard=0／inbox-audit --angles                   |

Diary：`diary-gate.py` 放行，但這班的想法屬「做了探測順帶注意到」，照 §Stage 0b 留在下面的反芻段，不另寫。`/twmd-evolve`：本班本身就是 EVOLVE，不重跑。

## Handoff 三態

繼承上一 session（`2026-11-21-203616-semiont-heartbeat`）：

- [ ] pending（收件席位：哲宇）PR #2033 先合、再 rebase PR #2036
- [ ] pending（觀察者決定）babel 並行度，原樣續傳
- [x] ~~pending（收件席位：11-22 週班）四條週班是否恢復~~ retired by 本班：news-lens 這一條 11-22 01:07 有 commit；distill 03:12、self-evolve 04:06、routine-audit 21:04 三條由各自那班回答

繼承本席位上一班（`2026-10-25-011538-twmd-news-lens-weekly`）：

- [x] ~~複查 SC「نيك مباشر」「بث نيك」點擊~~ retired by 本班：0 點擊 0 曝光，已回落（OBSERVER-QUEUE #98 已決，不需新條）
- [ ] pending（席位 `twmd-babel-nightly`，動得了譯文）id〈資料台灣〉`/id/data/` 彩券詞撞字，SC 點擊 6 → 39，第二班原樣傳
- [ ] pending（席位 `twmd-routine-audit-weekly`）週日四條 routine 11-01／11-08／11-15 連三週沉默的原因；該席位自己也在沉默名單裡，今晚 21:04 若仍無痕跡，改由下一個 Full mode 或哲宇查排程器 log

本 session 新 handoff：

- [ ] pending（收件席位：哲宇）〈黃仁勳〉EVOLVE 選 A／B／C，見 reports/probe/2026-11-22.md §T1-C；裁定前任何班別不動 zh
- [ ] pending（席位：下一個 Full mode 或貢獻者）〈台灣股市與資本市場〉EVOLVE 與〈國安基金〉NEW，INBOX 已登記，12-20 前有效
- [ ] pending（席位 `twmd-maintainer-daily`，動得了 INBOX 與 DONE-LOG）〈台灣鐵路地下化〉INBOX 歸檔＋DONE-LOG 補一筆
- [ ] pending（席位：11/28 晚上當班者）選舉結果、公投第 22 案結果、民調禁止期條目歸檔；〈金馬獎〉11/22 揭曉後補結果
- [ ] pending（席位 `twmd-data-refresh-am`）CF 台灣請求量 2,063 萬對訪客 29.8 萬，看來源是否單一自動化流量

## Beat 5 — 反芻

選舉那一側，站上在事件前一到三個月就把制度條目寫完了，這週三個來源的流量全部接得住。財經那一側沒有一篇是為下跌準備的，〈台灣股市與資本市場〉寫在最高點隔天，把當時的排名放進了標題。有日期的事可以照日曆排；沒有日期的事，條目能做的是別把「此刻」寫進門面。

另一件是停擺的成本這次有具體形狀。前三週這條 routine 不在，黃仁勳辭任後十天，站上那篇現在式的條目沒有任何一班登記。每天的心跳班都寫了「四條週班待看恢復」，沒有一班的席位包含往外看。

這班自己的弱點也要記：十五次搜尋零次開原文。額度吃緊是原因，報告裡因此每條都掛必驗，寫稿的人得從頭查。

🧬

---

_v1.0 | 2026-11-22 01:12 +0800_
_session twmd-news-lens-weekly — 週日探測器 W47，補 11-01 起沉默的三班_
_誕生原因：週日 01:00 cron；前三班 fire 後零產出，距上次探測 28 天_
_核心洞察：(1) 可預期事件靠日曆排得到，不可預期事件靠條目不把當下排名寫進標題 (2) 探測器停擺的成本是事實過期沒人登記，心跳班的席位不含往外看 (3) `sc-query.py` 限 400 筆的兩週對比，榜外等於未知不等於零_
_LESSONS-INBOX 候選：週對週 query 比較要用同一組 query 名單回查，不能拿兩份各自截斷的前 N 名相減_
