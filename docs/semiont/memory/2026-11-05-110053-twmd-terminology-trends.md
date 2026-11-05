# 2026-11-05-110053-twmd-terminology-trends — 十月缺的那輪併進來：七詞入庫，假貨的台語本有查實

✅ BECOME ack: mode=write / 8 organ 最低=免疫 59 / Q14=PASS

> session twmd-terminology-trends — cron routine（每月 5 日 10:30）
> Session span: 約 10:35 → 11:00 +0800，內容 commit `8faed6e50`（10:58）
> 資料來源：`session-id.sh`、`git log %ai`、`terminology-demand-rank.py`

## 觸發

每月用語趨勢班。十月那班撞上週額度全黑沒跑（OBSERVER-QUEUE #118），這輪的 SC 窗口 10-06→11-03 把十月需求一起收。

**讀取範圍如實記下**：wake-context 讀了 manifesto-core、reflexes-index、reflexes-top5、memory-head、neural 前 60 行（L890–949）、memory-rows、handoff、selftest 與 wake:END。neural 其餘、diary-recur、diary-rows、groundtruth 未逐頁讀，原因是 context 額度放不下。BECOME 的完整讀取鐵律這班沒有做到。Q14 依據是 memory-rows 與 handoff，沒有對過 48 小時 commit 清單。selftest 唯一的 ⚠️ 是落後 origin 4 個 commit，動手前已 pull。

## 做了什麼

七個切面共 115 次搜索：Threads 15、PTT 15、中國榜單 15、誤判鑑定 15、SC 需求兩批 19 與 21、欠條與追蹤詞 15。切面由七個子代平行跑，原始紀錄落在 `reports/research/2026-11/terminology-sweep/`。主 session 抽驗了萌典四條、自由時報、TVBS、PTT 貓版的原頁，引用都對得上。

入庫 7 條：乘務員、蹦迪、貓條、智能體、上新、沒事、忽悠。貓條、上新、忽悠各掛一張欠條。補強 4 條：破圈從出圈的台灣欄移到中國欄，坦克補誤判標註，仿冒品與無語更新查證進度。查重攔下 5 個：破圈併入出圈，心理素質、身體素質、鬆弛感、創可貼已有條目。另有一處是自己抓到的：沒事的台灣欄原本寫不客氣，跟不客氣.yaml 的 china 值對撞，改成只留爭議原話裡的沒關係。

QA 四件套：全庫 yaml parse 0 失敗，charcheck 台灣欄簡體 0，新詞值掃描無意外重複，extract-china-terms 重生完成。commit 範圍驗過 21 檔。

## 欠條

假貨（#1902）進展最大：《臺日大辭典》收 ke2-he3，《臺灣教會公報》1894–1965 有用例，《重編》收錄無地區標注。台語本有成立，借用方向未證。要不要移出 china 欄屬判定，送 OBSERVER-QUEUE #123，yaml 只寫 notes 與縮小後的欠條。無語（#1609）的知識庫回 403，卡在登入頁之前，沒有註冊也沒有繞過。

## 過程裡的小狀況

`git pull --rebase --autostash` 是在 babel writer 運行中跑的，這種做法對平行工作有風險。這次乾淨套回，之後工作都在 worktree 裡做。Threads 切面 9 到 11 月零命中，是登入牆造成的，報告明寫不能讀成降溫。

## Beat 5 反芻

這輪最重的發現是假貨，它指向 1,045 條唯一來源是 1997 手冊的 china 欄，以及同型疑點不客氣.yaml。詞庫最傷的錯是把台灣自己的詞標成對面的，而那批舊條目的來源厚度撐不起這種斷定。日記閘放行，但 routine 預設不寫，這段留在這裡。

## Handoff 三態

- [ ] pending（哲宇）：OBSERVER-QUEUE #123 假貨判定與 #1902 回覆；#118 可結案
- [ ] pending（下輪用語班）：`reports/research/2026-11/terminology-gap.md`，優先米、吐槽、不客氣.yaml
- [ ] pending（下輪用語班）：貓條、上新、忽悠、無語、仿冒品五張欠條
- ⏳ blocked：無語要等知識庫可達，或調閱實體書
- 其餘沿用 `2026-11-05-083625-α`

## 收官 checklist

| 檢查項            | 狀態                         |
| ----------------- | ---------------------------- |
| MEMORY 有本班紀錄 | ✅                           |
| Timestamp         | ⚠️ 起點約略，commit 時間精確 |
| Handoff 三態      | ✅                           |
| diary             | skipped：routine 預設不寫    |
| evolve            | skipped：本班沒有動文章      |

🧬

_v1.0 | 2026-11-05 twmd-terminology-trends_
_主軸：七詞入庫／假貨台語本有查實／十月缺格併跑_
_誕生原因：每月 5 日排程_
_核心洞察：(1) 1997 手冊的 china 欄有第二個文獻反例 (2) Threads 零命中是儀器盲區 (3) 貓條留下五年滲透切片_
