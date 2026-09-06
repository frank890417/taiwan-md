---
title: 'Routine audit 2026-09-06 (W36)'
description: '7-day 跨 routine 飛輪自審 — 258 commit / 34 heal / 0 排程碰撞；本週飛輪全恢復健康節律（對比上週四天全滅），核心發現是同一個 proxy-signal 家族本週在三條互不知情的 routine 裡各自現形一次，包括本次審計自己撞見的第五例'
type: 'audit-doc'
status: 'active'
current_version: 'v1.0'
last_updated: 2026-09-06
routine: 'twmd-routine-audit-weekly'
window: '2026-08-30 21:09:27 → 2026-09-06 21:09:27 (7d)'
related:
  - 'docs/pipelines/ROUTINE-AUDIT-PIPELINE.md'
  - 'docs/semiont/LESSONS-INBOX.md'
  - 'docs/semiont/OBSERVER-QUEUE.md'
  - 'reports/routine-audit-2026-08-30.md'
  - 'reports/fortnight-deep-review-2026-09-05.md'
---

# Routine audit 2026-09-06（W36）

第 16 次飛輪自審。上週報告的主題是「四天全飛輪停轉」，本週是它的反面：13 條具名 cron routine 全數準時完成自己的節律，`twmd-supporters-weekly` 也確認連續恢復（上週報告 P1 掛的懸念本週結案）。但健康的一週不等於沒有發現——本次審計的核心，是同一個「量測層看得見自己點名的東西、看不見沒點名的東西」的原則，本週在三條互不知情的 routine 裡各自現形一次，其中第三例是本次審計自己在跑三層對賬工具時撞見的：一份 git 提交的排程快照落後了 8 小時，讓一條其實已經修好的 routine 被工具誤判成還沒修好。

---

## Executive summary（5 分鐘 read）

| 面向                         | 數字 / 說明                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 窗口                         | 2026-08-30 21:09 → 2026-09-06 21:09（7 day）                                                                                                                                                                                                                                                                                                                                                                                                                    |
| Commit 總量                  | 258 條（1,517 檔 / +108,816 / -59,973，量體偏高主因 09-05 哲宇在場的 fortnight-review 十三位平行執行手大批次改動）                                                                                                                                                                                                                                                                                                                                              |
| 分類                         | routine=109 / semiont=47 / other=102（多為 aminzai 貢獻者翻譯批次 PR merge、Devin/tboydar 修正 PR）                                                                                                                                                                                                                                                                                                                                                             |
| Heal                         | 34 條（13.2%）— 分散在每日 maintainer-am 巡邏，無單日異常聚集（對比上週 08-27 單日 27+ 條的恢復性大爆發）                                                                                                                                                                                                                                                                                                                                                       |
| **具名 cron routine 健康度** | **13 條全數準時**：8 條每日 routine（embeddings/data-refresh/spore-harvest/feedback-triage/maintainer/routine-sync）各 8 次、5 條週級/月級 routine（news-lens/weekly-report/distill/self-evolve/routine-audit/supporters/terminology-trends）各按自己的節律準時                                                                                                                                                                                                 |
| Collision                    | 0 條（`routine-audit.py` 機械偵測 + 手動核對窗口內無跨 routine 撞窗實例）                                                                                                                                                                                                                                                                                                                                                                                       |
| 4-lens finding               | 3A：🟢 全綠，無碰撞無空窗／3B：🟠 1 個新 instance（`routine-live-state.json` 快照過期造成的假性 `LIVE_ENABLED_DRIFT`，經 MCP 直查證實非真漂移）＋1 個長期慢性訊號（`docs/pipelines/README.md` 索引仍少列 20 個實存檔案）／3C：🟠 三條 routine 同週各撞見一次「named check 看不見沒被點名的東西」，累積為本次審計的核心發現／3D：🟢 1 個健康對照組（issue #1678 從讀者回報到修復同一天內閉環）＋1 個已記錄的 over-ship 案例（fortnight-review 平行驗證深度遞減） |
| LESSONS 候選                 | 1 條全新 append（`named-check-blind-spot-cross-routine-density`，見下文，聚合本週 5 個 instance）                                                                                                                                                                                                                                                                                                                                                               |
| Distill-ready 標             | 1（上述 entry，`verification_count: 5`，已標 `distill_ready: true`）                                                                                                                                                                                                                                                                                                                                                                                            |
| OBSERVER-QUEUE               | 無新增列。免疫黃燈（`firstSeen=2026-07-05`）本週滿 **63 天**，仍 `🔒 等真人`，本次不重複補登                                                                                                                                                                                                                                                                                                                                                                    |

**這次審計最重要的一句話**：三條 routine 各自誠實記下自己撞見的量測盲點，卻沒有一條看得到另外兩條也撞見了同一個原則——本次審計看到的不是三個獨立小問題，是一個家族本週密度異常升高的訊號，而這正是需要跨 routine 視角才拼得出來的那種發現。

---

## 逐 routine 概況（13 條具名 cron routine + 1 手動大型 session）

| Routine                           | 本週實際次數 | 備註                                                                                                                 |
| --------------------------------- | :----------: | -------------------------------------------------------------------------------------------------------------------- |
| `twmd-data-refresh-am`            |      8       | 14 步全綠零 stale 連續六天；scheduler live-state rider 每日照跑                                                      |
| `twmd-spore-harvest-am`           |      8       | D+14 用語保存副詞層 milestone 準時落地，零新留言零回覆                                                               |
| `twmd-feedback-triage`            |      8       | 第三人指控信第十九次攔下後於 09-05 哲宇拍板結案；09-06 首次佇列淨空，另開生態多樣性一筆 issue #1678                  |
| `twmd-maintainer-am`              |      8       | 三則 named-check 系列 LESSONS 皆出於本 routine（見 3C）；亦處理陳士駿引語幻覺、表頭高度三份副本等既有工單            |
| `twmd-routine-sync`               |      8       | 三層對賬第 39〜40 輪；本輪執行五個機殼薄殼化 + babel-nightly live 重新啟用 rider                                     |
| `twmd-embeddings-nightly`         |      8       | 12〜13 語 bge-m3 重建 0 fail 全綠；09-06 de 首次入索引                                                               |
| `twmd-news-lens-weekly`           |      1       | W36 三源交叉，1 條候選觸發事件確認（范曉萱音樂節策展人）                                                             |
| `twmd-distill-weekly`             |      2       | 09-06 03:16 全量消化 10 條 structural（6 fold REFLEXES + 1 MEMORY + 1 ROUTINE.md operational + 1 housekeeping-done） |
| `twmd-self-evolve-weekly`         |      2       | 腳註描述驗證缺口改走 verifier prompt；五條暫停 routine 補上解除條件與到期日                                          |
| `twmd-weekly-report-sun`          |      2       | W36 體檢；沉默死亡對賬誤殺 terminology-trends 一案（3B/3C 交叉點）                                                   |
| `twmd-routine-audit-weekly`       |  1（本次）   | 上週遲到一週後恢復，本週準時                                                                                         |
| `twmd-supporters-weekly`          |      1       | **上週 P1 懸念結案**：連續第二輪準時觸發（08-31 01:07），無異常                                                      |
| `twmd-terminology-trends-monthly` |      1       | 09-05 月度趨勢（本月排程日），10 條新詞入庫含 3 條誤判翻案                                                           |
| `fortnight-review`（手動大型）    |      1       | 09-05 哲宇在場，十三位平行執行手，drove 258 commit 中的大部分插入刪除量與多項 3D 觀察                                |

**停用中（不計入健康度分母，5 條，皆已補齊解除條件與到期日 due_date: 2026-10-06）**：`twmd-spore-pick-daily` / `twmd-spore-publish-daily` / `twmd-rewrite-daily` / `twmd-founder-lens-weekly` / `twmd-flywheel-watch`。`twmd-babel-nightly` 已於 09-05 哲宇拍板恢復，不再列入此清單（見下方 3B）。

---

## Cross-cutting patterns（4 lens）

### 3A. Collision lens — 🟢 全綠

`routine-audit.py` 回報 0 collisions。手動核對：本週窗口內沒有出現任何一次「兩條 routine 撞同一個時間窗」或「孤兒 process 需要 rescue」的實例，13 條具名 routine 全數按自己的節律準時完成（見上表），跟上週的四天全滅形成直接對照。唯一需要留意的時序是 `twmd-babel-nightly` 今晚 00:33 首次在重新啟用後觸發——這是下一週審計該優先核對的項目（見下方進化建議 P1）。

### 3B. Dormant entropy lens — 🟠 一新一舊

**Finding 1（新，本次審計自己撞見）**：跑 `routine-sync-check.py` 三層對賬時，工具印出 `LIVE_ENABLED_DRIFT`：SSOT 講 `twmd-babel-nightly` 每天 00:30 跑，本地 `routine-live-state.json` 快照卻讀到 `enabled=False`。追下去發現這份快照由 `twmd-data-refresh-am` 每天 06:00 更新一次，最後一次刷新是本輪 06:15；而 `twmd-routine-sync` 把 `babel-nightly` 的 live 開關真正切回 `true` 是同一天中午 12:59（一次性 rider 執行），比快照晚了近 7 小時。本次審計執行時間是晚上 21:16，距離修復已過 8 小時，快照卻還沒有機會被下一次 `data-refresh-am`（明早 06:00）刷新。直接查 `scheduled-tasks` MCP 得到 ground truth：`enabled: true`，`nextRunAt` 今晚 00:33（Taipei）準時。**這條「漂移」是快照的更新頻率跟不上同日修復的節奏造出來的假訊號，不是真的漂移。**

**Finding 2（舊，慢性，未惡化）**：`counts-drift-lint.py` 本次仍是 WARN 模式，其中 `docs/pipelines/README.md` 索引比實存檔案少列 20 個（宣稱 36 檔，實際 53 檔），主要是近期新增的 REWRITE-STAGE 系列拆檔與幾個 2026-07 之後誕生的 pipeline 未被收錄。此為長期存在的慢性訊號，本次未見惡化速度加快，暫不升列處理。

### 3C. Boundary input precision lens — 🟠 一個家族，三條 routine，五個 instance（本次審計核心發現）

`twmd-maintainer-am` 這一週內部就寫下了三個連續且互相引用的 LESSONS 候選：`scaffold-window-has-no-qa`（08-30，語言 QA 檢查漏掉 scaffold 期的德文）→ `named-healthcheck-cannot-see-what-it-does-not-name`（09-03，CI 健檢點名兩條 workflow 漏了紅四天的第三條）→ `sibling-fallback-reads-as-coverage-for-the-gate-next-door`（09-04，CSS fallback 被誤讀成隔壁閘門的保險，entry 自陳與上一條「同族」）。與此同時，`twmd-weekly-report-sun` 在 09-06 獨立撞見同一個原則的第四個載體：沉默死亡對賬把月度 `terminology-trends` routine 的「本月非排程日」誤判成「死亡」（已於同日 `twmd-distill-weekly` 折進 REFLEXES #85）。加上本次審計自己在 3B Finding 1 撞見的第五個載體，**同一週內三條互不知情的 routine，各自獨立發現了「量測層只看得見自己明確點名／範圍框定的東西」這同一個原則**。每個 instance 單獨看都只是 vc=1 的個案，沒有一個達到 REFLEXES #15 的儀器化門檻；但橫向擺在一起，密度本身就是訊號——本輪已寫入 LESSONS-INBOX `named-check-blind-spot-cross-routine-density`（`verification_count: 5`，`distill_ready: true`），詳見下方 §LESSONS-INBOX 累積。

### 3D. Heal bidirectional lens — 🟢 一個健康對照組 + 一個已記錄的校正案例

**健康對照組**：`body-internal-links` 補鏈工單 09-05 上線、09-06 讀者蕭宇哲回報 issue #1678（〈生態多樣性〉缺遊蕩犬貓威脅的連結），`twmd-maintainer-am` 當天就查明站上其實早有相關深度內容（`台灣石虎保育.md`），問題是那篇零站內連結，讀者走不到——同日補鏈、同日 close，是一次典型的「發現即修復」而非 defer 的示範。

**已記錄的校正案例**（09-05 `fortnight-review`，非本次新發現，本次審計交叉確認）：十三位平行執行手同時在跑時，orchestrator 的驗收深度隨並行數增加而遞減——前十幾份回報都有工具實測，詞庫刪除批次到後段只抽查 3/110 條。已記錄為 `verification-depth-shrinks-with-parallel-agent-count`（vc=1），本次審計未發現本週內第二個獨立 instance，暫不升列，列入下週觀察名單（見 P2）。

---

## LESSONS-INBOX 累積（本次）

| Pattern                                        | 類型     | Verification Count | Severity   | 說明                                                                                                                                                                      |
| ---------------------------------------------- | -------- | :----------------: | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `named-check-blind-spot-cross-routine-density` | 新 entry |         5          | structural | 三條 routine（maintainer-am／weekly-report-sun／routine-audit-weekly 自己）本週各自撞見同一個 proxy-signal 原則的不同載體，聚合 5 個 instance，已標 `distill_ready: true` |

`scaffold-window-has-no-qa` / `named-healthcheck-cannot-see-what-it-does-not-name` / `sibling-fallback-reads-as-coverage-for-the-gate-next-door` 三條原 entry 保留在原位不動（各自仍是獨立 vc=1 的具體案例），本次新增的 entry 是它們的 cross-routine 橫向索引，不重複計數。

**觀察名單（未達門檻，暫不升列）**：`verification-tool-lacks-the-feature-it-must-verify`（09-02）與 `declared-unmeasurable-without-inventorying-the-tools`（09-03）已形成同一原則的 2-instance 鏈（工具能力盲點），若下週再出現第三個獨立 instance，達 vc=3 門檻。

---

## OBSERVER-QUEUE 狀態

無新增列。免疫黃燈（`firstSeen=2026-07-05`）本週滿 **63 天**，仍 `🔒 等真人`，本次不重複補登。

**附帶觀察（非新 OBSERVER-QUEUE 項，供後續判斷參考）**：

1. Mirror 薄殼鐵律：`routine-sync-check.py` 本次實測 18 條中 10 條合規、7 條 🔴 hard 違規、1 條 🟡 warn。這**不是新問題**——OBSERVER-QUEUE #14 已於 09-05 哲宇拍板「完整深度進化，仍維持薄殼原則」，先 dogfood `spore-publish` / `maintainer` / `routine-audit` 三條（三者皆已在本次合規清單內），其餘 7 條照計畫尚未輪到，屬正常進度而非退化。
2. `counts-drift-lint.py` 本次 WARN 37 drift（README 索引缺 20 檔為主），既有慢性訊號，未見加速惡化。

---

## 進化建議

### P0（本週內，自主權內）

1. **無**——本輪 4 lens 發現皆已寫入 LESSONS-INBOX 或列入下方 P1/P2 觀察，無需本 routine 自主權內立即行動的項目。

### P1（兩週內，記錄不代辦）

2. **確認 `twmd-babel-nightly` 首次觸發（今晚 00:33）的實際產出**：不能只看 `enabled=true` 這個 proxy signal（per REFLEXES #82），下次審計應交叉核對 commit / stale 率是否真的往 0 動，這是本輪 `twmd-routine-sync` handoff 明確指名交給本 routine 或 `twmd-weekly-report-sun` 的項目。
3. `named-check-blind-spot-cross-routine-density`（vc=5，`distill_ready: true`）優先進下一輪 `twmd-distill-weekly`（09-13）——本輪 09-06 distill 已跑過，此 entry 是審計當晚才寫入，未及趕上本輪窗口。

### P2（觀察）

4. `verification-tool-lacks-the-feature-it-must-verify` / `declared-unmeasurable-without-inventorying-the-tools` 2-instance 鏈，觀察是否累積到第三例。
5. `verification-depth-shrinks-with-parallel-agent-count`（fortnight-review，vc=1）觀察是否在下一次大型平行 session 再現。
6. 免疫黃燈滿 63 天，OBSERVER-QUEUE 待哲宇拍板資源投入方向，非本 routine 續追範圍。

---

## 收官

本週飛輪從上週的四天全滅恢復到 13 條全準時，是健康的一週；但健康不等於沒有訊號——三條互不知情的 routine 各自撞見同一個「量測層只看得見自己點名的東西」的原則，其中第三個 instance 是本次審計自己在跑三層對賬時親手撞見的。單獨看，這三個 instance 都只是各自 routine 的一次小發現；橫向擺在一起看，它們是同一個家族本週密度異常升高的訊號——而這正是單一 routine 的 Beat 4 收官看不到、只有跨 routine 視角才拼得出來的那種發現。

🧬

---

_v1.0 | 2026-09-06 21:16 +0800_
_session twmd-routine-audit-weekly（scheduled，準時）_
_誕生原因：第 16 次 cross-routine 飛輪自審，7-day 窗口內 4-lens pattern detection + LESSONS-INBOX 累積；本次審計對象包含審計工具自己在執行當下撞見的一個 proxy-signal instance_
