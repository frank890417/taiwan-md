---
name: twmd-routine-sync
description: （每天 05:30 Asia/Taipei = 21:30 UTC）。讓這台機器上的 routine prompt 與排程設定，跟 git 裡的 routine SSOT 對齊；對不上就修，修不了就報。
---

🧬 Taiwan.md routine: twmd-routine-sync（每天 05:30 Asia/Taipei = 21:30 UTC）。這條 routine 的工作是**讓這台機器跟 git 說的話一致**——排在晨鏈（06:00 data-refresh → 06:30 harvest → 07:00 feedback → 08:30 maintainer）之前，所以早上那串醒來時讀到的一定是對齊過的 prompt。

🚨 STRICT BECOME GATE — 第一動作不可省略：跑 /twmd-become micro 完整走 BECOME_TAIWANMD.md Step 0-9，Micro mode self-test 全過才動。ACK 一行寫 memory 頂部：`✅ BECOME ack: mode=micro / Q14=PASS`。

為什麼需要這條：routine 飛輪有四層，其中一層不在 git 裡——`~/.claude/scheduled-tasks/*/SKILL.md` 是排程器真正讀的那份，住在家目錄。所以在別台機器改了 SSOT，這台永遠不會知道。2026-07-25 立這條時實測：19 份 prompt 有 4 份已經分岔而 git 毫無紀錄。canonical 說明在 docs/semiont/ROUTINE.md 註 ¹⁸。

執行：

1. `cd` 到 repo → `git checkout main && git pull origin main`（先拿到最新 SSOT，這步不做後面全白做）。
2. 對賬：`python3 scripts/tools/routine-sync.py`。exit 0 = 三層一致，**直接跳到第 6 步安靜收工**（沒漂移是正常結果，不是沒事做）。
3. 有 prompt 漂移 → 判方向再動手，**不要反射性 --apply**：
   - git 版是新的（有人在別台 ship 了 routine 改動，git log 看得到）→ `python3 scripts/tools/routine-sync.py --apply --stamp $(date +%F)`。機器版會先存進 `reports/routine-prompt-drift/` 留證才被覆蓋。
   - 機器版是新的（在這台改過但 git 沒收）→ `python3 scripts/tools/routine-sync.py --harvest`，然後 commit 讓 git 學會。
   - **判不出來 → 停手，兩份都留著，寫進 memory §Handoff 交給觀察者**。猜錯方向等於刪掉別人的工作。
4. 有 cron / enabled 漂移（工具會印 `⏰` / `🔌` 那兩行）→ 用 scheduled-tasks MCP 把 live 改成 SSOT 的值（`mcp__scheduled-tasks__update_scheduled_task`）。**例外**：SSOT 說 enabled 但 live 是 disabled，而 ROUTINE.md 的 §⏸️ PAUSED 表或註腳寫了「哲宇 directive 停用」→ **live 才是對的，不要擅自打開**，改成把 SSOT 對齊 live 並在 memory 記一筆（誤開一條被刻意關掉的 routine 比漏開嚴重）。
5. SSOT 列了但這台沒有的 task（`prompt-missing-on-machine`）→ `--apply` 會把 prompt 寫出來，但**排程本身要另外建**：用 `mcp__scheduled-tasks__create_scheduled_task`，taskId／cron／model 全照 ROUTINE.md 排程表那一列，prompt 用剛寫出來的那份檔案內容。建完再跑一次第 2 步驗。
6. 收官：如果第 3-5 步真的動了東西 → `git add` 只加自己碰的（`docs/semiont/routine-prompts/`、`reports/routine-prompt-drift/`、`docs/semiont/ROUTINE.md`），**禁 `git add .`**（REFLEXES #6），commit 標 `🧬 [routine] twmd-routine-sync: ...` → `git push origin main`。什麼都沒動就不 commit。
7. memory 一行寫進 docs/semiont/MEMORY.md 索引（走 /twmd-finale）：對賬結果（幾項一致／幾項修了／往哪個方向修）+ 沒解決的漂移 + Handoff。**零漂移也要記一行**，不然「這條有沒有在跑」下次沒人看得出來。

🔴 HARD gate：

- 判不出漂移方向一律停手，不猜。
- 不碰 `~/.claude/scheduled-tasks/` 底下非 `twmd-*` / `taiwanmd-*` 的 dir（Muse 的 8 條與 fin-archive 不是我的東西）。
- 不因為「看起來沒用」就刪任何 task，退場走 ROUTINE.md §暫停 SOP。
- 這條 routine 自己也在對賬範圍內——別把自己改成不會醒。
