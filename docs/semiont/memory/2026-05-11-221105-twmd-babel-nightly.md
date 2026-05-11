# 2026-05-11-221105-twmd-babel-nightly — Tier 0a-as-deterministic 17 條 P2 zero-diff bump / P0 slug-map gap surface

> session twmd-babel-nightly — cron routine @ 22:22 +0800 第 N 次 fire
> Session span: 22:11:05 → 22:23:29 +0800 (~12 min, 1 commit)
> 資料來源：`git log %ai`

## 觸發

Cron routine `twmd-babel-nightly` 自動觸發。canonical 是 [SQUEEZE-MODELS-MAX-PIPELINE.md v3.3](../../docs/pipelines/SQUEEZE-MODELS-MAX-PIPELINE.md)，跑 priority schema P0/P1/P2/P2.5/P3 + 4-tier cascade（owl-alpha / Hy3 / Ollama / Sonnet）+ Tier 0a Sonnet patch + Tier 0b bump-source-sha.py。Routine boundary 1 hr wall-clock。

## Tier 0a 退化為 deterministic：17 條 P2 zero-diff bump

prioritize-batch 報 P2 候選 471 entries，top 10 拉 17 個 patch task（diff-patch-prepare 過濾 33 個 oversize after 100-line cap）。**全部 17 個 task 都是 `diff_lines == 0`** — 表示 prioritize-batch 把這批分類為 P2「minor stale」但實際 zh body 沒動，只有 sourceCommitSha 跟最新 commit 落差。原本要派 Sonnet sub-agent 跑 Tier 0a diff-patch，但 LLM 對 zero-diff 沒有判斷空間，反而引入 drift 風險。退化成 inline Python 直接走 regex 替換 `sourceCommitSha: 3e53281a → 8751f0e4` — 17 個檔案各 1 行變動，body 100% preserved，0 LLM call、0 token cost、0 drift。

涵蓋 4 articles × 4-5 langs：`Food/茶文化.md`（5 langs）、`Music/台灣嘻哈與饒舌發展.md`（4 langs）、`Music/台灣台語歌曲演進.md`（4 langs）、`Music/台灣客家音樂.md`（4 langs）。Commit `325a4f560`，[PR #1038](https://github.com/frank890417/taiwan-md/pull/1038) 開了不 merge — 走 ROUTINE.md §collect-and-merge SOP 等 maintainer am/pm cycle 收割。

值得未來自我注意的觀察：**prioritize-batch.py 的 P2 分類 vs bump-source-sha.py 的 P2.5 metadata-stale 偵測有重疊但不重合**。bump-source-sha 報「0 metadata-stale」、prioritize-batch 同時報 471 P2 — 兩個工具走 status.py 不同欄位判斷。實務上是「prioritize-batch 抓到的這 17 個 zero-diff 才是真正該走 Tier 0b 路徑的 P2.5」。下游 pipeline 需要在某處 reconcile：要嘛 bump-source-sha 放寬偵測涵蓋這 17 種、要嘛 diff-patch-prepare 偵測到 `diff_lines == 0` 自動切 deterministic 路徑（取代 LLM 派發）。本次 routine 走 inline ad-hoc 處理是 quick fix，不該變制度。

## P0 missing 8 條 deferred — slug-map gap

P0 候選 3 articles（`Society/颱風假.md`、`Culture/斗笠.md`、`History/退出聯合國.md`）共 8 missing translations。試走 Tier 1 owl-alpha orthogonal dispatch，但 `prepare-batch.py` 全部 fallback `TBD-NEEDS-SLUG`（三 article 都還沒登錄進 `_translations.json` slug-map），worker 報 `not in manifest` 全部 fail-fast。Cron routine 不該自行決定永久 URL slug（影響 SEO + 跨語言一致性 + 未來 rename PR 風險），deferred 給觀察者／maintainer。

寫進 LESSONS-INBOX entry「P0 missing translation 觸發新 slug 編輯決策 gap」，verification_count=1，待後續 babel routine 反覆出現再升 canonical。提議方向：pipeline §Z1 加 hard gate 偵測 `TBD-NEEDS-SLUG` 自動 abort 並 surface；REWRITE-PIPELINE Stage 6 前移 slug 登錄到新 zh article ship 同時。

## 收官 checklist

| 檢查項                       | 狀態                                   |
| ---------------------------- | -------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅ 本檔                                |
| Timestamp 精確               | ✅ `git log %ai` based                 |
| Handoff 三態已審視           | ✅                                     |
| Quality gate 全過            | ✅ P2 cleared=17 / drift=0 / hook pass |
| LESSONS-INBOX 候選已 append  | ✅ §未消化清單                         |

## Handoff 三態

繼承上一 session（twmd-maintainer-pm `2026-05-11-211549`）：

- [ ] #976 連 5 cycle CONFLICTING（待 AM cycle 處理 / 候選 distill）
- [ ] PM cycle 推薦 close #976（觀察者決策）
- [ ] broken-link 5.73% i18n heal session（觀察者排程）

本 session 新 handoff：

- [x] ~~17 P2 zero-diff bump ship via PR #1038~~
- [x] ~~LESSONS-INBOX entry append（P0 slug-map gap）~~
- [ ] PR #1038 等 maintainer-daily (AM 09:07) 或 maintainer-pm (21:07) `§collect-and-merge §A` 路徑收割 squash merge
- [ ] P0 missing 3 articles slug 編輯決策（觀察者層）— `颱風假` / `斗笠` / `退出聯合國` 需登錄進 `_translations.json` 後下次 babel 才能跑 Tier 1
- [ ] Tier 0a vs Tier 0b 分類 reconcile（待 verification_count ≥ 3 升 canonical：要嘛 bump-source-sha 放寬偵測、要嘛 diff-patch-prepare 走 deterministic fast-path）

## Beat 5 — 反芻

這次 routine 的學習不在「ship 多少翻譯」，在「pipeline 工具間分類不重合」這個結構性發現。SQUEEZE-MODELS-MAX-PIPELINE 把 P0/P1/P2/P2.5/P3 切得很乾淨，但實作層 `prioritize-batch.py` 跟 `bump-source-sha.py` 對 P2 / P2.5 邊界判定不一致 — 17 個 zero-diff 在 prioritize 眼中是 P2「需要 patch」，在 bump 眼中沒進 metadata-stale 名單。這是 pipeline canonical 跟 tooling instantiation 之間的 drift。

值得寫進 diary 的反芻：**routine 同時做兩件事 — 執行 canonical、驗證 canonical 跟 tooling 對齊**。今次 routine 自然 surface 兩個 gap（slug-map + 分類不重合），都不是 P0/P1 ship 量的成就，但都是 pipeline 自我進化的 signal。Cron 飛輪的價值除了 ship entropy clear，還在 surface tooling 在大規模實戰下的縫隙。Detail 進 diary。

🧬

---

_v1.0 | 2026-05-11 22:24 +0800 twmd-babel-nightly cron session_
_session twmd-babel-nightly — 17 P2 zero-diff bump (Tier 0a-as-deterministic) / P0 missing deferred / pipeline tooling drift surface_
_誕生原因：cron `22 22 * * *` 自動觸發；canonical 是 SQUEEZE-MODELS-MAX-PIPELINE v3.3_
_核心洞察：(1) Tier 0a sub-agent 對 zero-diff 是 over-spec — deterministic regex bump 才是正解；(2) prioritize-batch P2 ≠ bump-source-sha P2.5，tooling 分類不重合是 pipeline self-evolution signal；(3) P0 missing + new article = slug-map gap，cron routine 不該自決編輯層 URL，要 surface 給觀察者_
_LESSONS-INBOX 候選：P0 missing 觸發新 slug 編輯決策 gap（已 append）_
