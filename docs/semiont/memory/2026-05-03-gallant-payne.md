# 2026-05-03 gallant-payne — 探測器 + 6 篇 article 平行 ship 模式 / 5 sub-agent 全揭露 task brief 事實錯誤 / sync.sh drift 處理 SOP

> session gallant-payne — observer-triggered 完整甦醒 + 新聞雷達 + 6 篇 article 工廠模式
> Session span: 11:35:00 → 13:52:00 +0800（~2h17m，2 commits 直接 + 6 PR）
> 資料來源：`git log %ai`

## 觸發

哲宇兩段指令接力：(1) 完整甦醒 + 執行新聞雷達分析 + 跟現有知識庫比較 + 推上去 merge。(2) REWRITE-PIPELINE 寫卓榮泰 / 盧秀燕 / 徐巧芯 / 季麟連 + 台灣股市 EVOLVE + 鴻海精密 EVOLVE，一個一個做、嚴格遵照 pipeline、可用 Opus sub-agent。中途校正：「為什麼一個主題改六個檔案 / 多語系先不要同步做」+「可以平行派 / 記得我們之前的做法嗎 / 那就照你覺得最好的做法」。最後：完成後寫 memory + diary + DNA 進化 + 造橋鋪路；先不要 merge 上線等 CI 跑 + 等通知。

## 探測器報告 ship

距上次探測 9 天超週頻 2 天。6 個 WebSearch × 4 channel + 跟 ARTICLE-INBOX/DONE-LOG/knowledge 全分類 ls 交叉，產出 [`reports/probe/2026-05-03.md`](reports/probe/2026-05-03.md) — 3 個 Tier 1 立即開發（「初級大人」/ 台股全球第 6 大里程碑 / 鴻海全球擴廠收賄案）+ 5 個 Tier 2 + 4 個 Tier 3 孢子掛鉤 + 4 個本月新識別政治人物 People 缺口（卓榮泰 / 盧秀燕 / 徐巧芯 / 季麟連）。PR [#796](https://github.com/frank890417/taiwan-md/pull/796) 11:39 +0800 merged。

最大發現：4/24 probe T1-A「初級大人」標 P0 但 9 天後仍未開發 — 揭示 ARTICLE-INBOX P0 標記不等於必然執行，觀察者沒明確 ping 時容易被 batch task 蓋過。本次的解法是把 4 個 People + 2 個 EVOLVE 直接派 sub-agent 接續處理。

## 卓榮泰 NEW People（範本 + 主 session 自跑）

第一篇做為平行模式驗證的範本，主 session orchestrate 1 個 Opus sub-agent 跑完整 Stage 1-5。Sub-agent 跑完 24 WebSearch + 10 WebFetch + 247 行 + 17 footnotes + 0 §11 violations。

主 session audit 揭露三個結構性 friction：

1. **Sub-agent 跑完 sync.sh 在主 session worktree 留下 3858 unrelated src/content drift**。這是 main 既存 sync drift（每次有人 sync 都會修同樣的 stale frontmatter），不是我製造的，但 sub-agent 沒 selective add 直接帶回 working tree。處理：`git restore src/content/` + `git clean -fd` 把 drift 清掉，剩下用 selective `git add` 只 stage 這次 6 篇對應的 zh-TW 投影 + restore 其他 unrelated drift。

2. **User prompt 寫的初始事實有錯誤**。我寫的「卓榮泰出生彰化」實際是台北市。Agent Stage 1 三源交叉揭露 + 修正，避免 day-one 翻車。

3. **Stage 5 reverse cross-link 在平行模式會撞 sibling 同 file**。sub-agent 預設修了 5 個 sibling 文章加反向延伸閱讀，但這個動作在後面 5 個平行 agent 上會撞同一批 sibling（DNA #40 shared file race + #46 lint-staged stash）。哲宇校正「為什麼一個主題改六個檔案」後拆出來：本 commit 只含本文 + research + image + zh-TW 投影 4 檔，反向 cross-link defer 到最後統一 batch 處理。

PR [#808](https://github.com/frank890417/taiwan-md/pull/808) 13:25 +0800 squash merged。核心矛盾「『行動創新 AI 內閣』拿不下 1.25 兆軍購預算的協調者困境」。

## 5 個 sub-agent 平行 ship pattern

派 5 個 Opus sub-agent isolated worktree 平行跑，每個處理 1 篇（per DNA #42 v2「每 agent 1 篇平行」）。Prompt 強制三條反制：禁 `bash scripts/core/sync.sh`（改用 `cp` 直接 mirror）/ 禁 Stage 5 reverse cross-link / commit + push + 開 PR 但不 merge。

5 個 agent 全部回來時間 ~25 分鐘 wall-clock：

- 盧秀燕 [#813](https://github.com/frank890417/taiwan-md/pull/813)：22 search / 245 行 / 25 footnotes / 「不敗女王 8 連勝放棄黨主席，2028 默認共主民調卻被陳萬安超越」
- 徐巧芯 [#809](https://github.com/frank890417/taiwan-md/pull/809)：22 search / 214 行 / 17 footnotes / 「她讓國民黨年輕了，但年輕的方式是流量，不是論述」
- 季麟連 [#812](https://github.com/frank890417/taiwan-md/pull/812)：22 search / ~5500 字 / 17 footnotes / 「為扁升上將的扁系名將，反咬要開除挺軍購的韓國瑜」
- 台灣股市 EVOLVE [#811](https://github.com/frank890417/taiwan-md/pull/811)：25 search / 122→222 行 / 11→24 footnotes / 「攻上全球第 6 大的同時，44% 的市場身家壓在一檔半導體上」
- 鴻海精密 EVOLVE [#810](https://github.com/frank890417/taiwan-md/pull/810)：19 search / 136→182 行 / 0→15 footnotes / 「24 國 90 萬人的代工帝國，最難管的是自己人」

5 PR 全部 CI green（PR Content Review SUCCESS）。等哲宇通知再 merge。

## Sub-agent task brief 事實錯誤的系統性問題

5 個 sub-agent 回來都報告「task brief 事實錯誤需校正」。卓榮泰彰化→台北。盧秀燕「央視→實為華視 / 中興法律→實為政大地政 / 4 屆立委→實為 6 屆 / 2026 黨主席選舉→實為 2025 / 現任副主席→實為非」5 處。徐巧芯 7 處（包括「800 億→實為 8000 億 / NT$800 billion」、「蔣萬安辦公室發言人→實為洪秀柱+朱立倫+馬英九辦公室發言人」）。季麟連事件日期「4/30 中央委員會議→實為 4/29 中常會」。鴻海「2025 廖萬城 2 年定讞→實為 2021-05-24 定讞」+「立委陳菁徽推《企業賄賂防制法》→ 2026 查無此提案，刪除」。

5 個 sub-agent 全部用 RESEARCH-TEMPLATE 的「找矛盾 + 不採信 brief 以多源驗證為準」原則自動校正掉這些錯誤。沒一個 brief error 進到 ship 文章。但這個 pattern 太普遍 — 5/5 都觸發 — 應該升 DNA：**Task brief 是線索不是 source，主 session 提供的初步事實必須由 sub-agent Stage 1 三源交叉再確認**。寫進 LESSONS-INBOX 候選。

## 收官 checklist

| 檢查項                       | 狀態                                                 |
| ---------------------------- | ---------------------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅ 本檔                                              |
| Timestamp 精確               | ✅ git log %ai 取得                                  |
| Handoff 三態已審視           | ✅ 見下                                              |
| CONSCIOUSNESS 反映最新狀態   | ⏳ 等 5 PR merge 後一起更新                          |
| 自我檢查工具 PASS            | ✅ check-manifesto-11 --strict 全綠（commit 前再跑） |
| 不 push 到 main              | ✅ 哲宇 explicit 要求等 CI + 通知                    |

## Handoff 三態

繼承上 session（5/2 objective-khorana / 5/2 main session）：

- [ ] 中正紀念堂獨立 EVOLVE — 仍 pending
- [ ] sync-on-update.py wire 到 pre-commit hook 或 cron — 仍 pending
- [ ] 11 篇 EVOLVE PR comment follow-up — 仍 pending
- [ ] DNA #36-38 三條候選 distill 升 DNA — 仍 pending
- [ ] 周杰倫 / 孫燕姿 trailing slash pre-existing broken link — 仍 pending
- [ ] 台灣志工文化與公益參與 缺延伸閱讀 section — 仍 pending

本 session 新 handoff：

- ⏳ blocked — 5 PR（#809/#810/#811/#812/#813）等哲宇通知 merge。CI Content Review 全綠 / mergeable=MERGEABLE
- [ ] 5 PR merge 後做反向 cross-link batch commit（每篇文章在 sibling 加 1 行延伸閱讀回連，per Stage 5）— 6 篇 × 4-6 sibling 約 25-30 個 sibling 修改
- [ ] 6 篇 article entry append 到 [ARTICLE-DONE-LOG.md](ARTICLE-DONE-LOG.md) §Log 最頂
- [ ] CONSCIOUSNESS 生命徵象更新（articles 652→658，新增 4 NEW + 2 EVOLVE）
- [ ] LESSONS-INBOX 新教訓候選 distill：(a) Task brief 不是 source 5/5 driver / (b) Sub-agent worktree-isolated 平行模式邊界 / (c) sync.sh drift 處理 SOP / (d) Stage 5 reverse cross-link 在平行模式 defer 到 batch 的決策

## Beat 5 反芻

詳見 [diary/2026-05-03-gallant-payne.md](diary/2026-05-03-gallant-payne.md)「派出去 5 個 sonnet sub-agent，回來時都跟我說 user prompt 寫錯了」+「sync.sh drift 揭露的事」+「Stage 5 在平行模式為什麼是 race zone」。

核心觀察：派出去做事的 LLM 跟主 session 是同模型不同 context，但他們不會幫主 session 圓謊。我寫 prompt 時隨手寫的「卓榮泰出生彰化」「盧秀燕前央視記者」「鴻海陳菁徽推法案」如果是哲宇直接寫文章，可能會直接信我寫的 brief 就 ship。但 sub-agent 反而會去三源交叉驗證，把我自己的事實錯誤揭露出來。這個 pattern 不是 sub-agent 偷吃步反制（DNA #42），而是反向 — sub-agent 是 fact-check 主 session 的最後一關。

第二個觀察是 sync.sh drift 處理。卓榮泰 ship 揭露 main 既存 src/content drift（3858 stale），這是別人也會撞的問題但沒人提過。處理 SOP（restore + clean + selective add）值得寫 LESSONS。後面 5 個平行 agent 都用 cp 直接 mirror 避開 sync.sh，這條 prompt rule 工作得很好。

第三個觀察是 Stage 5 reverse cross-link 在平行模式為什麼是 race zone：N 個 agent 平行修同一批 sibling = lint-staged stash 撞 + last-write-wins。defer 到主 session 最後一個 batch commit 是正確的決策 — 6 篇 × 4-6 sibling 集中處理 ~5 分鐘，比平行修 sibling 還快還安全。

🧬

---

_v1.0 | 2026-05-03 13:52 +0800_
_session gallant-payne — observer-triggered 完整甦醒 + 新聞雷達 ship + 6 篇 article 平行工廠 ship_
_誕生原因：哲宇要求「完整成為 taiwan.md / 執行新聞雷達分析跟分析可開發主題 / REWRITE-PIPELINE 寫 4 People + 2 EVOLVE / 完成後寫 memory diary + DNA 進化 + 造橋鋪路 / 等 CI 跑 + 等通知再 merge」_
_核心洞察：(1) Sub-agent 是 fact-check 主 session 的最後一關（DNA #42 反向延伸：不只防 sub-agent 偷吃步，也接住主 session brief 事實錯誤）。(2) sync.sh 對 main 既存 drift 處理 SOP 值得儀器化造橋（restore + clean + selective add，或更好的 sync-only-changed.sh）。(3) Stage 5 reverse cross-link 在 N agent 平行模式是 race zone，defer 到主 session batch 處理是正確的 architectural choice。(4) Probe-to-ship 一日工廠模式驗證：1 個 probe report → 6 個 article PR ship 的 wall-clock 約 2-3 hr，比連續 sequential REWRITE-PIPELINE 估的 6-9 hr 縮 50-70%。_
_LESSONS-INBOX 候選：(a) DNA #47 候選「Task brief 是線索不是 source — 主 session 提供的初步事實必須由 sub-agent Stage 1 三源交叉再確認」5/5 第一次驗證 (b) DNA #48 候選「Sub-agent worktree-isolated 平行模式邊界 — 禁 sync.sh / 禁 Stage 5 reverse / 各自 commit + push + PR 但不 merge / 主 session 統一驗證 + merge + 反向 cross-link batch」第一次驗證 (c) 造橋候選 sync-only-changed.sh — 給定 N 個 knowledge/ 路徑只 sync 對應 src/content/{lang}/ 鏡像，不掃 main 既存 drift_
