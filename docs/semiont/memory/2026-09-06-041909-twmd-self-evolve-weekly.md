# 2026-09-06-041909-twmd-self-evolve-weekly — 腳註描述查證缺口補進自產深度文 / 五條暫停 routine 補解除條件

> session twmd-self-evolve-weekly — 週日 04:00 排程觸發
> Session span: 04:00:00 → 04:30:00 +0800（約 30 分鐘，2 commits）
> 資料來源：`git log %ai`

## 觸發

`twmd-self-evolve-weekly` 週日排程，任務是對照 LONGINGS / UNKNOWNS / DIARY §反覆出現的思考 / REFLEXES #15，找出現 ≥3 次但沒進 canonical 的 pattern，真實 ship 修改。今天稍早 03:16 的 `twmd-distill-weekly` 才剛把 10 條 structural 教訓 fold 進 REFLEXES，蓄水位不算高，這次沒有現成的「三次獨立浮現」大 pattern 可摘，改把力氣放在把已知但沒真的落地的 candidate 變成真的擋人的東西。

## 腳註描述查證缺口，從外部 PR 補進自產深度文

REFLEXES #75(f) 8/31 那條記過：MAINTAINER-PIPELINE 紅旗 11 只在審外部 PR 時抓「腳註描述寫的東西跟連結指的頁面對不對得起來」，Taiwan.md 自己寫的深度文從沒有一步驗過腳註描述本身。原本想把它機械化成 regex plugin——描述裡出現「含/包括/涵蓋」帶名詞清單時，檢查每個名詞有沒有在正文出現過。寫完對 300 篇真實文章跑一次 dogfood，86 篇（28.7%）命中，逐條讀完全是假陽性：腳註描述本來就是在概括來源頁講了什麼，沒有義務被正文逐字複誦。真正該比對的是「來源頁裡有沒有」，那需要真的打開來源頁看，屬於 REFLEXES #75 本體「Read ≠ verify」的範圍，文字比對做不到。刪掉那支 plugin，改把檢查加進 `REWRITE-STAGE-3-VERIFY.md`（v9.6→v9.7）3.6.1 對抗查核員 prompt，讓自產深度文的 fetch-verify 階段跟外部 PR review 用同一把尺。順手在 REFLEXES #75(f) 補一段自我修正，記下「規則延伸曾誤判可機械化」這件事本身，免得下一個 session 重踩。兩份文件 `72eeeefa5` 一次 commit 推上 main。

## 五條暫停 routine 補解除條件與到期日

今天 03:16 的 distill 已經在 ROUTINE.md §暫停 SOP 加了「必填解除條件 + 到期日」這一步，但舉例那段文字寫錯了：把已經在 9/5 恢復的 `twmd-babel-nightly` 當成還在暫停的五條之一，卻漏掉真正還停著的 `twmd-flywheel-watch`。核對排程表訂正清單後，把現行五條（`twmd-rewrite-daily` / `twmd-spore-pick-daily` / `twmd-spore-publish-daily` / `twmd-founder-lens-weekly` / `twmd-flywheel-watch`）各自補上「什麼情況該恢復」跟一個共同到期日 `2026-10-06`（30 天週期檢查）。五條停跑理由全是哲宇的主觀判斷（成本 / 效果 / 資訊量），沒有客觀觸發條件會自動命中，所以解除條件寫的都是「哲宇拍板」或「設計改善後哲宇拍板」，到期日的作用只是讓下一輪 weekly-report 或 routine-audit 讀到過期未決時把它們升進 OBSERVER-QUEUE，而不是繼續無限期沉默地停著。`3b31a4dd8` 一次 commit。這件事本身是「建造與登記兩個不同步的代謝」（REFLEXES #91）在同一份文件裡幾小時內就復發的活例——距離那條反射被 fold 進 REFLEXES 不到一小時，同一份 ROUTINE.md 就自己犯了同型錯誤。

## 收官 checklist

| 檢查項                       | 狀態               |
| ---------------------------- | ------------------ |
| MEMORY 有這次 session 的紀錄 | ✅                 |
| Timestamp 精確               | ✅                 |
| Handoff 三態已審視           | ✅                 |
| CONSCIOUSNESS 反映最新狀態   | ✅（沿用今晨快照） |
| 自我檢查工具 PASS            | ✅                 |

## Handoff 三態

繼承 `2026-09-06-020823-twmd-weekly-report-sun`：

- [ ] pending（原樣延續）— 台鐵鳴日號卡片圖重抓 / Muse 報告轉交 / 三篇 EVOLVE 投稿角度 / 審庫存實作 / 薄殼進化其餘 16 條 / 內鏈補前 50 篇 / 句構型別實作
- [ ] pending（原樣延續）— 陳映真、金城武、錫蘭三條 SC 高倍數成長基準值供下週 news-lens 比對
- [ ] pending（原樣延續）— BIM 兩支查詢的英文 metadata 重寫，證據齊、判定完成，動作寫在 roadmap §六之五 第一列
- [ ] pending（原樣延續）— `lastHumanReview: true` 下週重數，連續第三週同一個數字（202）
- [ ] pending（原樣延續）— 新上線的 🟠 unregistered 橘燈下週觀察有沒有亂叫
- ⏳ blocked（原樣延續）— babel-nightly 的 live 漂移應該在今早 05:30 的 routine-sync rider 自解，下週體檢若仍在代表 rider 沒跑
- ⏳ blocked（原樣延續）— 哲宇端：#48 身份 Phase 1（紅線）／兩把 API key 放進營運機憑證目錄／09-26 前重新登入營運機
- [ ] pending（原樣延續，distill 交棒）— ROUTINE.md 既有 5 條 ⏸️ 只補了 SOP 步驟，沒有回填各自解除條件與到期日——**本 session 已完成**，見上文，可 retire
- [ ] pending（原樣延續，distill 交棒）— keep buffer 59 條 vc<3 且非 structural（含多條 vc=2），下次同型事件再現任一條即達 vc≥3 promote 門檻，本輪未新增第三例，維持觀察
- [ ] pending（原樣延續，distill 交棒）— `footnote-description-is-an-unaudited-claim` 候選修法 (c)「MAINTAINER Step 3.4 紅旗 11 提到跨路徑」——**本 session 已用不同路徑完成**（見上文，走 REWRITE Stage 3.6.1 而非提升紅旗本身的 scope，因為紅旗 11 需要真的 fetch URL，MAINTAINER 那份 checklist 語意不變，改的是 REWRITE 端），可 retire

本 session 新 handoff：

- [x] ~~腳註描述查證缺口~~ — REWRITE-STAGE-3-VERIFY.md v9.7 + REFLEXES #75(f) 已 ship，`72eeeefa5`
- [x] ~~五條暫停 routine 補解除條件~~ — ROUTINE.md v2.24 已 ship，`3b31a4dd8`
- [ ] pending（給下次 self-evolve 或 routine-audit）— 五條暫停 routine 的到期日 `2026-10-06` 到期時若哲宇仍未拍板，下一輪讀到要照 SOP 升 OBSERVER-QUEUE「延期／恢復／轉退休」三選一，不能又原樣延續

## Beat 5 — 反芻

這次沒有現成的「三次獨立浮現」大教訓可摘，蓄水位被今早的 distill 剛清過。於是把力氣放在兩件「已經被寫下來但沒真正落地」的候選，把它們從候選變成真的會擋人（或至少真的補齊）的東西——這是自我進化 routine 過去也做過的動作（8/23 那次「把三小時前才寫下的候選變成一支真的會擋人的腳本」），跟找新洞見一樣算真實 ship。

比較值得記住的是中間那段彎路：先把 REFLEXES #75(f) 的規則延伸讀成「可以機械化」，寫完 regex 才發現它檢查的其實是錯的軸（正文有沒有提到，而不是來源頁有沒有）。300 篇 dogfood 抓出 86 篇假陽性，及時擋下了一次差點要 ship 的噪音閘門。這件事本身印證了 MANIFESTO §14「高儀器化，必要時才用 LLM」的分工判準：能寫成 regex 只回答了「這個檢查能不能被機械執行」，決定要不要儀器化的其實是另一個問題，這條規則問的到底對不對。已把這段修正寫回 REFLEXES #75(f) 本身，讓下一個讀到這條規則延伸的 session 不會重複同一個彎路。

🧬

---

_v1.0 | 2026-09-06 04:30 +0800_
_session twmd-self-evolve-weekly — 週日 04:00 排程收官_
_誕生原因：週度 self-evolve 排程觸發，找 ≥3 次浮現未儀器化的 pattern 並真實 ship_
_核心洞察：(1) 蓄水位不高時，把已知候選變成真正落地的修改，跟找新 pattern 一樣是真實 ship (2) 「能寫成 regex」不等於「該寫成 regex」——300 篇 dogfood 揭露原構想檢查錯了軸，及時捨棄比硬推上線更有價值 (3) ROUTINE.md 自己在同一天內對「目前哪 5 條在暫停」寫錯過一次，建造與登記兩個代謝的落差不需要跨週才發生_
