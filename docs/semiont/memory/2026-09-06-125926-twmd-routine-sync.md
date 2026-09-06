# 2026-09-06-125926-twmd-routine-sync — 三層對賬第 40 輪：五個機殼補上薄殼化，babel-nightly 依拍板開機

> session twmd-routine-sync — cron 排程觸發（每天 05:30 Asia/Taipei；本次實際 dispatch 延到 12:5x，晨鏈已跑完，未受影響）
> 落地 commit：`f7bdaefe1` @ 2026-09-06 12:58:31 +0800
> 資料來源：`git log %ai`

## 觸發

每天 05:30 的例行三層對賬：讓這台機器的 routine prompt／排程設定跟 git 的 SSOT 對齊，卡在 embeddings-nightly 之後、晨鏈之前。

## 三層對賬

先 `git checkout main && git pull`，工作樹乾淨（開場曾看到 `M src/data/related/zh-TW.json`，pull 後自然消失，非本輪動作）。跑 `routine-sync.py` 抓到 6 項漂移：5 個 prompt-drift（`twmd-feedback-triage` / `twmd-maintainer-daily` / `twmd-routine-audit-weekly` / `twmd-routine-sync` 自己 / `twmd-spore-publish-daily`）+ 1 個 enabled 漂移（`twmd-babel-nightly` SSOT=true / live=false）。

逐一 diff 五份 prompt 確認方向：全部是機器版停在 9/5 薄殼化之前的 v3.0 inline 版，git 已經是薄殼化後的 v4.0/v5.0——五個獨立 diff 一致指向同一次 ship（`219f94975` 薄殼深度進化），判定為 git 新，`--apply --stamp` 覆蓋，機器舊版依工具設計先存進 `reports/routine-prompt-drift/` 留證。

babel-nightly 的 enabled 漂移不是新發現：上次 session（self-evolve-weekly 04:19）已經在 handoff 寫明「這條漂移應該在今早 05:30 的 routine-sync rider 自解」。git 版的 `twmd-routine-sync.md` 檔尾確實藏了兩段一次性 rider（9/5 哲宇拍板寫入，這台機器因為還沒同步到新版 prompt 而從未見過）：一段是把 babel-nightly 開回 enabled，另一段是把這台的 routine commit author 身份從哲宇切成 `Taiwan.md Semiont <309092923+taiwanmd-semiont[bot]@users.noreply.github.com>`（OBSERVER-QUEUE #10 Phase 0）。`--apply` 把這兩段 rider 一併帶進機器版之後，照著執行：`mcp__scheduled-tasks__update_scheduled_task` 把 babel-nightly enabled 從 false 翻 true（list 驗證前後值），`git config user.name/user.email` 切身份（前值 `Che-Yu Wu <frank890417@gmail.com>`，後值新身份，本輪自己的 commit 就是新身份下第一個活驗證，author 欄位確認顯示正確）。兩段跑完照 rider 指示從檔案刪除，並把刪除同步進機器鏡像，避免下一輪又被判成漂移。

## 收官 checklist

| 檢查項                       | 狀態                                                                |
| ---------------------------- | ------------------------------------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                                                  |
| Timestamp 精確               | ✅（`git log %ai`）                                                 |
| Handoff 三態已審視           | ✅                                                                  |
| 三層對賬複驗                 | ✅ prompt 5/5 轉 in-sync。babel enabled 欄位仍讀到 live=false，見下 |
| git push                     | ✅ `f3e9654e6..f7bdaefe1`                                           |

複驗時 `routine-sync.py` 對 babel-nightly 仍印 `live=false`，原因是它讀的 `routine-live-state.json` 是今早 06:15 data-refresh-am 拋的舊快照，比剛才用 MCP 做的即時變更早了 6 小時多。直接 `list_scheduled_tasks` 已確認 enabled=true 生效，快照會在下一次 data-refresh-am（06:00）自然刷新，這輪不用強行去改一個不屬於本 routine 職責的資料源。

## Handoff 三態

繼承 `2026-09-06-041909-twmd-self-evolve-weekly`：

- [x] ~~babel-nightly 的 live 漂移~~ — 本 session 用一次性 rider 解掉，enabled 已翻 true，見上文
- [ ] pending（原樣延續）— 其餘 handoff（台鐵鳴日號卡片圖 / Muse 報告轉交 / EVOLVE 投稿角度 / 審庫存實作 / 薄殼進化其餘 16 條 / 內鏈補前 50 篇 / 句構型別實作 / SC 高倍數成長基準值 / BIM 英文 metadata / `lastHumanReview` 週度重數 / 🟠 unregistered 橘燈觀察）不屬本 routine 範疇，原樣延續給對應 routine
- [ ] pending（原樣延續）— 哲宇端：#48 身份 Phase 1（紅線）／兩把 API key 放進營運機憑證目錄／09-26 前重新登入營運機

本 session 新 handoff：

- [ ] pending（給下一輪 twmd-routine-sync 或任何在這台跑 routine 的 session）— 本輪起這台的 routine commit author 已切成 `Taiwan.md Semiont`。如果下一個 commit 的 author 欄位不是這個新身份，代表 git config 被覆蓋或有其他 session 改了，要當異常處理
- [ ] pending（給 twmd-weekly-report-sun 或 routine-audit-weekly）— babel-nightly 09-06 00:30 起應該會開始每天跑，下週體檢確認它真的有 fire 且產出。不能只看 enabled=true 這個 proxy signal（per REFLEXES #82），要看 commit / stale 率有沒有真的往 0 動

## Beat 5 — 反芻

這輪把「上次 handoff 寫好的下一步」跟「這次真的執行」中間的落差縮到最短：self-evolve-weekly 04:19 才寫下 handoff，08 小時後 routine-sync 這輪就直接接住，沒有像 REFLEXES #15 #13 那種「傳遞資訊但傳不到急迫」的滯留。也順手驗證了 rider 機制本身：一次性任務寫進 git 版 prompt、machine 版落後時完全看不到，等三層對賬把新版拉進來才會被讀到、執行、刪除——這是「建造與登記兩個不同步的代謝」（REFLEXES #91）的一個健康反例：登記（git 裡的 rider）跟表達（機器上實際執行）中間有明確的同步點（本 routine），不會無限期分岔。

🧬

---

_v1.0 | 2026-09-06 12:59 +0800_
_session twmd-routine-sync — 每日三層對賬 cron_
_誕生原因：例行 05:30 routine-sync fire（本次 dispatch 延遲到中午），加上上一輪 self-evolve-weekly 留的 babel-nightly rider handoff_
_核心洞察：rider 機制驗證成功——git 版 prompt 裡的一次性任務在機器版落後時完全不可見，直到對賬把新版同步進來才會被執行與清除；這輪也是身份分離（OBSERVER-QUEUE #10 Phase 0）在這台機器的第一個活驗證。_
