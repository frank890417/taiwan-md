# 2026-09-12-085019-twmd-maintainer-am — 飛輪沒停，是它的產出走不到世界那一端，而每一道閘門都在對著過期的世界蓋章

> session twmd-maintainer-am — cron routine，每日 08:30 maintainer cycle
> Session span: 08:30 → 09:0x +0800（1 PR merged + 1 PR 說明留置 + 1 issue 診斷 + 1 discussion 回覆 + 171 commit 救援上架）
> 資料來源：`git log %ai` / `git rev-list --left-right` / `git merge-tree` / GitHub Actions API

✅ BECOME ack: mode=review（Stage 1 ready PR **2**，未達 High-stake #1「PR triage ≥ 5」門檻，維持 review 不升 full；`isDraft:false` 計 2 / draft 0）/ 8 organ 最低=🛡️ 免疫 59（即時 `consciousness-snapshot.sh`，黃燈自 2026-07-05 未解）/ Q13 anti-bias=PASS / Q14 cross-session continuity=PASS

## 觸發

每日 maintainer cycle。繼承的 handoff 第七天都寫同一句：「等 PID 52743 消失後，第一個能安全碰 git 的 session 用 `git pull --rebase` 統一處理」。到手的是看門狗昨夜自動開的 #1711、tboydar 兩篇德文投稿、idlccp1984 昨天在 #615 留的新建議。

**今天不是空場**，連續空場 vc 歸零重計（vc=0）。

**全程有平行 actor**：babel dispatcher（PID 52743）連續第七天在跑。本地 171 ahead / 138 behind 是真分岔。本班**沒有** pull、rebase、或 push 到 main，沒碰 dispatcher 的任何 in-flight 檔。

**讀取層失真的揭露**：本地檢查器落後 origin 138 個 commit。#1709 的合併判斷因此**不靠本地尺**——靠 origin 側三條 CI（`check-translation` / `frontmatter-gate` / `review`，全 pass，跑的是 origin 的工具）加上與工具版本無關的手工 grep（紅旗十條）與 `curl` 實測腳註。唯一用到本地全套檢查器的是 pre-push 的全站 `article-health`，而那一次的用途是「本地這棵樹健不健康」，正好是本地尺該回答的問題。

## Stage 1 表

| 項目             | 數字                                     | 備註                                                                        |
| ---------------- | ---------------------------------------- | --------------------------------------------------------------------------- |
| open PR          | **2 ready / 0 draft**                    | 都是 tboydar 德文人物條目                                                   |
| open issue       | 4                                        | #1711 本班診斷；#1678 / #1609 最新留言是維護者 → SKIP；#615 有新留言 → 回覆 |
| discussions      | 12                                       | #1704 維護者 9/11 已答、無新 follow-up → SKIP                               |
| past 24hr commit | 10 條 routine fire                       | 晨鏈全綠，**但全部只到本機**                                                |
| build / CI       | **7 條 workflow 全綠**（Deploy 執行中）  | 用 group-by 全表問，不點名；`Python tests` 已恢復綠                         |
| PR CI armed      | **2/2 ARMED**，UNARMED 0 / NO-WORKFLOW 0 | `pr-ci-armed.sh`                                                            |
| broken-link      | **gated 0.27% < 7%**（all-langs 0.24%）  | PASS；dist 是 9/07 的，數字帶五天齡                                         |
| 免疫器官         | 🛡️ 59 黃燈                               | 漂移中，owner = self-evolve-weekly                                          |

## 本班做了什麼

### #1709 陳致中德文版 — merged

真缺口：`People/陳致中.md` 原有 11 個語言版本，就差德文；PR 的 slug `chen-chih-chung.md` 與其他 11 語完全對齊，`translatedFrom` 指對，`_translations.json` 是 derived cache（SSOT 是 file-level `translatedFrom`）所以會自己接上。

閘門：三條 CI 全綠、紅旗十條零命中、62 條腳註抽驗四條（司法院憲法法庭 200 / 高雄市議會公報 PDF / Wikimedia Commons 200 / braintrust 200；Wiley DOI 回 403 是出版社擋爬蟲，非死鏈）。`gh pr merge --merge` 保留譜系，`gh pr comment` 致謝。

### #1710 馬英九德文版 — 留置，決定升觀察者

**這是一次真的撞車，而投稿者看不到對撞的另一邊。**

其他 12 個語言的馬英九都用 slug `ma-ying-jeou-cross-strait-reconciliation-leader.md`，`_translations.json` 也這樣登記。PR 用的是 `ma-ying-jeou.md`。而 babel 產線**今天 04:54 已經產出** `de/People/ma-ying-jeou-cross-strait-reconciliation-leader.md`（63KB 完整德譯，commit `ef7278710`）——就卡在未推送的那批裡。

投稿者 9/11 19:33 開 PR 時它還不存在；到現在他也還是看不到。GitHub 上那個位置是空的，於是三條 CI 全綠放行。

處置：**不 close**。拒絕投稿的決策與其對外理由屬 §外向留言分層 的 reserve（human only），本班只發技術說明留言（已發生之事實＋機制），PR 保持 open，取捨升給哲宇。

### #1711 看門狗警報 — 診斷完成，正名

昨天 #1705 是誤報，今天這條**不是**。origin 最後一筆 `[routine]` commit 停在 `2026-09-10 09:19:28 +0800`，距今 **47.5 小時**，門檻 30h。同一段時間 10 條 routine 正常 fire 並 commit——兩件事同時為真，因為量的不是同一個東西。

根因不是排程停擺，是**推送路徑塞住**。每條 routine 都 commit 成功、push 撞 non-fast-forward、把「等 dispatcher 收工」寫進 handoff 傳給下一班。七天、每一班都讀到了、也都照做了，所以它從未被解決，只是被準確地傳遞。

`git merge-tree` 唯讀模擬出 **137 個真衝突**：翻譯條目 118 / 認知層索引 5 / 衍生檔 13 / 產線狀態 1。118 篇翻譯的取捨超出自主權邊界（>50 檔且每篇都是內容品質判斷），本班沒動。

### 已執行：把卡住的工作變成看得見的

171 個未推送 commit 推到分支 **`20260912-unpushed-routine-queue`**。

- 全部 workflow 掛在 `push: branches:[main]`、`pull_request` 或 tag → 推分支**觸發零 CI**，不碰 main
- pre-push 全站 `article-health`（ci-deploy 同款）**全綠**，UI 與模板語言閘門全綠 → 卡住的是合併衝突，不是內容
- 三天產出不再只存在於一台機器上

沒解決合併，但把「看不見又只有一份」降級成「看得見、可比對、可從任一端接手」。

### #615 載入畫面建議 — 查完現況後回覆

idlccp1984 建議「增加載入畫面讓載入順暢」。查到站上**已經有一個載入閘門**：`Layout.astro` 的 `html { visibility: hidden }` / `.fonts-loaded { visibility: visible }`，三個出口（`document.fonts.ready` / 800ms 逾時 / noscript）。實際觀感就是最多 800ms 純白頁後整頁一次出現——他說的不順，形狀應該就是這個。

回覆不建議加載入畫面（spinner 放閘門內會被一起蓋掉；800ms 以內的等待放進度指示反而更像延遲），並指出更該問的是那道閘門還需不需要——字型是 `display=swap` 載的，後備字本來就立刻可讀，程式碼註解自己也這麼寫。全站視覺取捨屬哲宇判斷，未自行改動。

## Stage 4 Quality gate（7 條）

| Gate                                                        | 結果                                                                        |
| ----------------------------------------------------------- | --------------------------------------------------------------------------- |
| 完整走完 MAINTAINER-PIPELINE Stage 1-4                      | ✅                                                                          |
| PR 分流按 §collect-and-merge（B 路徑）                      | ✅ 2/2 走完整 hard gate                                                     |
| routine PR backlog ≤ 3                                      | ✅ 0（v2.1 main-direct 無 routine PR）                                      |
| broken-link gated ratio < 7%                                | ✅ 0.27%（dist 帶五天齡）                                                   |
| build green                                                 | ✅ 7 條 workflow 全綠，Deploy 執行中（#1709 觸發）                          |
| 本 cycle merge 的 PR 都過 hard gate                         | ✅ #1709 紅旗 + CI + 腳註抽驗 + close-hard-gate 全過                        |
| **有 fresh issue 的 cycle，至少一件被修掉或寫明為什麼不修** | ✅ #1711 從誤判邊緣救回並正名 + 171 commit 上架；#1710 寫明為何不由本班決定 |

連續空場 vc=**0**（本班有真 backlog）。

## Handoff 三態

- [ ] **118 篇翻譯的合併取捨等哲宇拍板** — 選項與成本已寫進 [#1711 留言](https://github.com/frank890417/taiwan-md/issues/1711#issuecomment-5642289506)：A 產線版優先（風險：蓋掉 9/10 手動 session 的人工修正）／**B origin 版優先、產線版重跑（推薦，算力是這專案最不缺的）**／C 逐篇人工（118 篇，綁住一個真人一整天）。認知層索引 5 檔照慣例兩邊都留，衍生檔 13 個重跑產生器，這兩類不需判斷。
- [ ] **`20260912-unpushed-routine-queue` 分支要跟著本地走** — 本班之後每個 routine 若仍不能 push main，應把新 commit 一併推到這個分支（`git push origin HEAD:20260912-unpushed-routine-queue`，零 CI），否則救援分支自己會過期。
- [ ] **#1710 保持 open** 等上述取捨落地後再決定收哪一版；不要當一般 duplicate close 掉。
- [ ] **看門狗文案**：`routine-stall-check.py` 把「無法區分」講成了最糟的那個成因。建議改成陳述量到什麼 + 列候選成因（REFLEXES #38 混維度 + #85）。屬閘門文案調整，非本班範疇。
- [ ] build perf 訊號矛盾（`ms/page: 133 ⚠️ > 200ms threshold`）仍未確認，留給下一個讀 `extract-build-perf.mjs` 的 session。
- [ ] LESSONS `self-documented-trap-with-no-exit` 機械化起點仍未做。
- [ ] feedback-triage 寫入端探針仍未做。
- [ ] MEMORY.md 索引 171 份無對應列的歷史清理，屬閘門設計，留 distill／self-evolve。
- ⏳ blocked — OBSERVER-QUEUE #28 (a)、#54（🔒 紅線）、#55（`/exams/` 導覽入口，14 天 default 2026-09-25）等哲宇。
- ⏳ blocked — #1678 等〈生態多樣性〉重寫；#1609 等館藏調閱。

---

_給明天的我：救援分支不是解法，是止血。如果明天你讀到這則 handoff、也照樣把新 commit 推上去、然後把合併再傳一天——那正是本班花了整個 cycle 在描述的那個病，只是換你當第八棒。_
