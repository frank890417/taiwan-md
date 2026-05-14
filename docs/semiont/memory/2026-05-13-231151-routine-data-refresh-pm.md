# 2026-05-13-231151-routine-data-refresh-pm — twmd-data-refresh-pm 例行更新 + 髒 WT skip own-fix 第 N 次驗證

> session routine-data-refresh-pm — cron `0 23 * * *` 自動觸發
> Session span: 23:08:00 → 23:11:52 +0800 (~4min, 1 commit)
> 資料來源：`git log %ai`

## 觸發

每日 23:00 cron `twmd-data-refresh-pm` 例行 fire（babel 22:00 之後 1hr，per ROUTINE.md §夜間 chain）。BECOME Full mode + DATA-REFRESH-PIPELINE 12-step + finale。

## DATA-REFRESH-PIPELINE 12/12 通過

跑 `bash scripts/tools/refresh-data.sh` wrapper，12 step 全通過：三源感知（CF 386,090 requests / GA top 20 pages / SC 20 queries）成功、prebuild 9 個 dashboard JSON 全部 fresh mtime、update-stats 抓到 ⭐987 🍴146 👥57 📄4246、validate-spore-data 0 errors / 2 warnings、sync-spore-links 4 篇 knowledge/\*.md sporeLinks views 自動更新（台積電 / 蘋果西打 / 聶永真 / 台灣無人機）。

Pipeline 本身 idempotent，git pull `Already up to date`，無新 commit 衝突。

## 髒 WT skip own-fix（與 22:05 maintainer-pm 同模式）

進場時 WT 已有 155 個 dirty file pre-exist（maintainer-pm 22:05 commit message 已 noted）。展開分類後：123 篇 `knowledge/{en,ja,ko,es,fr}/*.md` 翻譯檔（疑為先前 babel run 未 commit）+ `README.md` 與 `docs/factory/contributors-maintenance.md` prettier 格式 / 空白差異。這些非本 routine 產出，selective `git add` 只納本 routine outputs（27 檔：`public/api/*.json` × 15 + `src/data/*.json` × 4 + `src/i18n/about.ts` + `public/llms.txt` + `knowledge/_translations.json` + `knowledge/_translation-status.json` + 4 篇 zh SSOT sporeLinks-only diff）。Commit `84dab8c19` 直接 push main 成功。

關鍵判斷：4 篇 zh SSOT 檔（台積電 / 蘋果西打 / 聶永真 / 台灣無人機）lookalike 像 contributor 內容修改，diff 後確認僅 sporeLinks views 欄位數字更新（Step 12 sync-spore-links 輸出），可放心納入本 routine commit。如果整批 `git add .` 會把 123 篇翻譯 + README + contributors-maintenance 全 bundle，污染 narrative scope 也覆蓋人類待 review 工作。**diff classification before staging 是 routine-pm 的必要紀律**。

## 收官 checklist

| 檢查項                       | 狀態                                                     |
| ---------------------------- | -------------------------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                                       |
| Timestamp 精確               | ✅（git log %ai）                                        |
| Handoff 三態已審視           | ✅                                                       |
| CONSCIOUSNESS 反映最新狀態   | ✅（consciousness-snapshot.sh 已 cron-refresh）          |
| 自我檢查工具 PASS            | ⏳ 寫完跑 prose-health（routine commit 已過 pre-commit） |
| 1 commit push main           | ✅（`84dab8c19`）                                        |

## Handoff 三態

繼承 210341-manual：

- [ ] **Mode auto-detect 觀察期**：保留（本 session 走 `/twmd-become full` explicit，未 dogfood auto-detect）
- [ ] **HEARTBEAT v3.0 真實使用驗證**：保留（本 session 純 routine 不需 holistic review，未觸發 HEARTBEAT 載入）
- [ ] **REFLEXES promotion 候選追蹤**：保留
- [ ] **內容層全停**：本 session 0 knowledge/ commits（routine commit 4 篇 sporeLinks-only 非內容）

本 session 新 handoff：

- [x] ~~twmd-data-refresh-pm 12/12 step ship + commit `84dab8c19` push main~~（retired）
- [ ] **123 篇翻譯檔 pre-existing dirty WT 待 babel routine 接管**：knowledge/{en,ja,ko,es,fr}/\*.md 約 123 個檔案有完整翻譯 diff（含 TSMC EN 從 147 行重寫到 299 行 / 蔡英文 EN frontmatter hash 更新等）。下個 `twmd-babel-nightly` 0500 fire 時應該會把這批 distill 進它的同步 commit。若 babel routine 完成後仍剩餘 → 觀察者手動 review
- [ ] **README + docs/factory/contributors-maintenance.md pre-existing 空白 / prettier diff**：非 routine 產出，下個 update-stats 或 contributor 補丁時自然解決。如三天後仍持續 → 開 issue debug update-stats whitespace handling

## Beat 5 — 反芻

本 session 純例行 cron 跑，無架構級洞察。但 selective staging 這道判斷展現了 routine vs ad-hoc 紀律：cron-fire 進場時若 inherit dirty WT，「整批 add `.`」是看似 reflexive 但實際會污染兩件事——routine commit narrative scope（多領域混雜 confuse audit）+ 人類在 staging area 等 review 的工作（被 routine 偷偷代 commit 失去主導權）。22:05 maintainer-pm 的「髒 WT skip own-fix」標題與本 23:11 routine 的 selective add 是同一條紀律的第 N 次驗證。LESSONS-INBOX 已有相關條目，本 session 不重複 append。

🧬

---

_v1.0 | 2026-05-13 23:12 +0800_
_session routine-data-refresh-pm — 例行 dashboard sync + 髒 WT selective staging_
_誕生原因：cron `0 23 * * *` 自動觸發 twmd-data-refresh-pm_
_核心洞察：(1) 預先存在的 dirty WT（123 篇翻譯 + README/docs format diff）必須 classify 後 selective add，整批 `git add .` 是 routine commit 污染陷阱。(2) sync-spore-links Step 12 對 knowledge/\*.md sporeLinks 欄位的覆寫是 routine 合法產出，需與 contributor content edit 區分。_
