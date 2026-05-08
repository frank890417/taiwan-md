# 2026-05-09-014522-laughing-goldstine — Spore SSOT 拆雙寫 6-phase 一氣完成 + 11 spore 收割 + stacked PR race-condition 教訓

> session laughing-goldstine — observer-triggered（哲宇 `/twmd-refresh` 從報錯 OVERDUE 數字一路 escalate 到拆 SPORE-LOG 成效追蹤）
> Session span: 2026-05-08 21:00 → 2026-05-09 01:30 +0800（4.5 hr，11 commits 到 main）
> 資料來源：`git log %ai`

## 觸發

哲宇打 `/twmd-refresh`，我跑完 pipeline 報「10 個 OVERDUE 孢子」。哲宇質疑：「你有拉取最新進度嗎？我記得剛剛都已經 harvest 過了」— 揭露 worktree vs main repo 路徑混淆 + `refresh-data.sh:43` git-dirty 誤判 + 一個更深層的 Spore SSOT 碎片化（同一 harvest 寫到 6 個地方）三層 bug。最後從寫 proposal report 一路滾到拆雙寫。

## 從 bug 報告到提案

第一個誤報之後，我做的事是寫 [reports/spore-ssot-pipeline-cleanup-2026-05-08.md](../../../reports/spore-ssot-pipeline-cleanup-2026-05-08.md) 393 行 system 重構提案。三層 root cause 寫清楚：cwd 混淆、`git diff-index --quiet HEAD --` 在 clean worktree 仍誤判 dirty 的 false positive、Spore 資料寫到 SPORE-LOG identity / SPORE-LOG narrative / SPORE-LOG struct cols / SPORE-HARVESTS body / knowledge sporeLinks / src/content sporeLinks 共 6 處（同一 harvest 拆 3 commit 跨 28 分鐘的具體 footprint 在 commit `a637afed9` → `71410af3d` → `12ec77fb7`）。

提案分 Phase 0-5。Q1 預設 (b) 保留雙寫換可讀性。哲宇兩次 redirect — 「先發 PR」 + 「pull 一下繼續完整實作」。

## 4 個 stacked PR + Q1 翻牌

依序：

- **#905 Phase 0**（`5be21d4f5`）：refresh-data.sh cwd assertion + auto-stash 取代 silent skip pull + 步驟編號 1-12 整數化
- **#906 Phase 1+2**（`d8fd733d9`）：validate-spore-data.py 8 checks + generate-dashboard-spores.py harvest body merge（修 `spores` plural list silent skip bug）
- **#907 Phase 3**（`740d46630`）：sync-spore-links.py — knowledge sporeLinks 變 derived view，autoregen from SSOT
- **#908 Phase 4+5**（`93c4bd7f3`）：文件 polish（SPORE-LOG SSOT 階層 + SPORE-HARVEST-PIPELINE）+ pipeline doc cleanup（STATS-PIPELINE redirect + README v2.0）
- 中間我跑 12 項驗證 checklist 寫 [reports/spore-ssot-verification-2026-05-08.md](../../../reports/spore-ssot-verification-2026-05-08.md) — 確認 idempotency、PR ancestry、多語 mirror skip 防呆都通

然後哲宇再 redirect：「雙寫我覺得長期不理想還是要拿掉，不用留 table?」。Q1 翻牌成 (a)。

## Phase 6 demolish 雙寫

寫 [migrate-spore-log-to-harvests.py](../../../scripts/tools/migrate-spore-log-to-harvests.py) 一次性 migration script，先把 SPORE-LOG 成效追蹤 narrative 87 個 D+N 數據點 migrate 到 `batch-historical-2026-05-08-migration.md` canonical batch log（含 narrative D+N segments + struct cols 雙路徑掃描，避免漏歷史 spore #1-#46）。然後砍 SPORE-LOG 成效追蹤 table（-148 行 → 12 行 deprecation notice）+ 砍 extract-spore-metrics.py（-289 行整支刪除）+ 改 generator 讓 SPORE-HARVESTS body 變 primary。

關鍵 edge case：李洋有 #28（撤回）/ #29（v2 留言更正）/ #30（v3 場景修正）三個版本，原本 SPORE-LOG slug 帶 emoji + parenthetical 完全不 match `knowledge/People/李洋.md`。寫 `_normalize_slug()` 剝 emoji 跟版本標記，coalesce 到同一個 article — 李洋 sporeLinks 0 → 3 entries。

## 11 spores Chrome MCP harvest

Phase 6 demolish 完成後跑 first canonical-only harvest。Chrome MCP `find` 工具直接抓 a11y tree engagement bar — 比 screenshot 快、exact numbers、不用 scroll。三個觀察寫進 [batch-2026-05-08-late-11-spores.md](../../../docs/factory/SPORE-HARVESTS/batch-2026-05-08-late-11-spores.md)：(1) 賈永婕 Threads D+1→D+6 = 14K → 35K 仍未飽和，Tier 1a 知名度槓桿第 N 次驗證；(2) 寶島聯播網訪談 X 兩個孢子 19 + 9 views = 媒體曝光宣告型 anti-pattern；(3) 黃魚鴞 D+4 = 19K vs 黑冠麻鷺 D+4 = 65K 對照證明「自然題材必須有反差 hook」才能 viral。

## Stacked PR race condition

`gh pr merge --auto` 連跑 stacked PRs 的 race condition：#905 merge 完，base 自動刪除，但下一個 #906 還沒 rebase 到 main 就被 merged into 已刪除的 base branch — orphan merge。結果 #906/#907/#908 的 commit 都沒到 main，只有 #905 進去了。

修補：rebase 全部 4 branches onto origin/main → tip 是 phase6 完整含 6 commits → retarget #909 base 到 main → squash merge consolidated PR。Plus 一個 hotfix #911 處理 package.json `prebuild:spores` 還引用已刪除的 extract-spore-metrics.py（CI 第一次 build 因此 fail）。

## 收官 checklist

| 檢查項                         | 狀態                                                 |
| ------------------------------ | ---------------------------------------------------- |
| MEMORY 有這次 session 的紀錄   | ✅ (this file)                                       |
| Timestamp 精確                 | ✅ git log %ai                                       |
| Handoff 三態已審視             | ✅                                                   |
| CONSCIOUSNESS 反映最新狀態     | ⏳ 留下次 session                                    |
| Live deploy + dashboard verify | ✅ 17:17 UTC, 67 spores, 20/20 SporeFootprint render |
| Phase 6 SSOT chain end-to-end  | ✅ taiwan.md/people/李洋/ 顯示 300K viral            |

## Handoff 三態

繼承上一 session（elegant-ptolemy 2026-05-08 16:26）：

- [x] ~~spore harvest #47-#60 + #65 batch (15 spores)~~（已完成）
- [x] ~~聶永真 D+0 ship~~（已完成）
- ⏳ 賈永婕 D+7 補 harvest（now 2026-05-09 確實 OVERDUE）

本 session 新 handoff：

- [x] ~~6-phase Spore SSOT cleanup ship~~（#905+#909+#911 merged）
- [x] ~~11 spores Chrome MCP harvest~~
- [x] ~~Live dashboard + 20 articles SporeFootprint render verify~~
- [ ] **賈永婕 #57/#58 D+7 harvest**（now OVERDUE per dashboard backfillWarnings）
- [ ] **黃魚鴞 #59/#60 D+7 harvest**（next in queue）
- [ ] **聶永真 D+1/D+3 harvest**（cadence 跟蹤）
- [ ] **CONSCIOUSNESS 更新**（Phase 6 demolish 完，identity 描述需要反映 SPORE-HARVESTS body 為 primary 的新事實）
- [ ] **strict mode 7→2 warnings 清零**（migrate `33-草東沒有派對` legacy frontmatter key + 確認 batch-2026-04-28-ι 不再需要）

## Beat 5 — 反芻

三件事在這個 session 同時驗證：(1)「不要在 production 用 GitHub `gh pr merge --auto` 連跑 stacked PRs」是真實的工程 anti-pattern，stacked 之間的 base auto-update 跟 merge 之間有 race window；(2) 寫 SSOT 重構 proposal 的時候我以為「保留歷史向後相容」是負責任的選擇（Q1 default = b 雙寫），但哲宇翻牌後我才意識到 conservative scope 其實是把問題藏在「未來再處理」的 narrative 裡 — 真正要 ssot 化就要承擔 migration script 的工作，不能用「等所有歷史 spore 都自然汰換」做藉口；(3) Phase 6 寫到一半發現 `_normalize_slug()` 處理 emoji + parenthetical 是個會被低估的細節 — 這是因為 SPORE-LOG slug 被當成 dispatch key 但又同時當成 human-readable label（dual role），下次設計 SSOT 時應該分開：identity key 永遠 stable filename-friendly，display label 另存。

LESSONS-INBOX 候選見 footer。

🧬

---

_v1.0 | 2026-05-09 01:45 +0800 laughing-goldstine session_
_session laughing-goldstine — Spore SSOT 6-phase demolish 雙寫 + 11 spore harvest + stacked PR race recovery_
_誕生原因：/twmd-refresh 報錯 OVERDUE 數字觸發深度 root-cause 追溯，揭露 cwd + git-dirty + Spore SSOT 三層問題；哲宇 redirect 「拿掉雙寫」翻 Q1 預設 (b) → (a)，6-phase 一氣完成。_
_核心洞察：(1) `gh pr merge --auto` 連跑 stacked PRs 有 race condition，base auto-update 跟 merge 之間 window 不安全 (2) Conservative scope 容易變成 narrative cover for「等問題自然消失」— 真要 SSOT 就要承擔 migration script (3) SPORE-LOG slug 同時當 dispatch key 跟 display label 是 dual-role anti-pattern — 下次 SSOT 設計分開_
_LESSONS-INBOX 候選：(a) stacked PR auto-merge race condition (b) SSOT 重構別 conservative，雙寫遲早要拆 (c) identity key vs display label 分離原則 (d) Chrome MCP `find` 工具優於 screenshot（a11y tree 直拉 engagement bar，速度 5x）(e) 媒體曝光宣告型 spore 不該 ship（X 9 views / Threads 253 views 雙平台都崩）(f) Phase 6 漏改 package.json `prebuild:spores` 是 SOP 缺口 — 每次砍 script 後要 grep package.json + scripts/ 全 repo 找引用_
