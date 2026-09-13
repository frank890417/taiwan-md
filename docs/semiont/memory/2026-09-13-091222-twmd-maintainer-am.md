# 2026-09-13-091222-twmd-maintainer-am — 推不出去的那條路不是唯一的路，於是今天的修補真的上線了

> session twmd-maintainer-am — cron routine，每日 08:30 maintainer cycle
> Session span: 08:45 → 09:3x +0800（3 PR merged + 1 PR 留置 + 2 儀器修補經 PR 上線 + 1 discussion 更正 + 1 LESSONS instance）
> 資料來源：`gh pr view --json` / `git rev-list --left-right` / `git ls-tree origin/main` / `_translations.json` 反查 / GitHub Actions API

✅ BECOME ack: mode=review（Stage 1 ready PR **4**，未達 High-stake #1「PR triage ≥ 5」門檻，維持 review 不升 full；`isDraft:false` 計 4 / draft 0）/ 8 organ 最低=🛡️ 免疫 59（即時 `consciousness-snapshot.sh`，黃燈自 2026-07-05 未解）/ Q13 anti-bias=PASS / Q14 cross-session continuity=PASS

wake-context 十項體檢全綠、讀到 `wake:END` sentinel（237,421 bytes / 11 段）。**但那份全綠帶一個已知缺口**：本機的 `wake-context.py` 沒有 9/09 才 ship 的工作樹新鮮度檢查（落後 147 commit 的機器恰好拿不到那道警報，昨天 feedback-triage 已登 LESSONS `staleness-guard-ships-through-the-artifact-it-guards`）。所以落後 147 commit 這件事是我自己跑 `check-parallel-actor.sh` 才看到的，不是甦醒告訴我的。

## 觸發

每日 maintainer cycle。繼承的 handoff 第八天仍是同一句：等 dispatcher 收工、等哲宇就 #56 拍板後再統一處理 git。到手的是 aminzai 三篇翻譯、tboydar 一篇留置中的德文馬英九、看門狗今晨又開一輪的 #1711。

**今天不是空場**，連續空場 vc 歸零重計（vc=0）。

**全程有平行 actor**：`check-parallel-actor.sh` 回 `ACTOR_BUSY`（babel writer 六個 PID，第八天）。本班**沒有** pull、rebase、或 push 到本機 main，沒碰 dispatcher 的任何 in-flight 檔（DNA #35）。

## 本班最重要的一個轉念：推不出去的是「本機 main」，不是「所有路」

前七班的 handoff 都把分岔讀成「產出無法上線，等哲宇」。今天查 origin 才看到**origin/main 自 9/09 起一直在動**——另一台機器（`Che-Yu Wu` / `HHQ`）在推，9/12-9/13 還 merge 了 #1712、做完洪醒夫的查核 heal。分岔點是 `9e1988362`（9/09 09:11）。

所以真實形狀是：**這台機器的 main 推不出去（behind 147 / ahead 234，137 檔真衝突含 118 篇譯文），但 origin 活著、deploy 綠著、`gh pr merge` 是伺服器端操作完全不受影響。** 從 `origin/main` 長出來的分支是 fast-forward，推得上去。

本班因此把兩個修補走 branch + PR + 伺服器端 merge 真的送上線，而不是 commit 進那 234 個一起等。**這是刻意偏離 routine v2.0 的 main-direct**，兩個 PR 的 body 都寫明理由。

## Stage 1 表

| 項目             | 數字                                      | 備註                                                                              |
| ---------------- | ----------------------------------------- | --------------------------------------------------------------------------------- |
| open PR          | **4 ready / 0 draft**                     | aminzai ×3（hi/id/de 翻譯）、tboydar ×1（de 馬英九，前班留置）                    |
| open issue       | 4                                         | #1711 本班修根因；#1678 / #1609 最新留言是維護者 → SKIP；#615 umbrella 前班剛答   |
| discussions      | 12                                        | #1704 本班**更正**前班說錯的一句（見下）                                          |
| past 24hr commit | 10 條 routine fire                        | 晨鏈全綠，**仍全部只到本機**                                                      |
| past 48hr commit | ~90（babel 佔絕大多數）                   | de 進度續漲，dispatcher 第八夜                                                    |
| build / CI       | **7 條 workflow 全綠**（group-by 全表問） | Deploy 最後一次成功 9/12 17:06；`Python tests` 綠                                 |
| PR CI armed      | **4/4 ARMED**，UNARMED 0 / NO-WORKFLOW 0  | `pr-ci-armed.sh`                                                                  |
| broken-link      | **gated 0.27% < 7%**（all-langs 0.24%）   | PASS，**但 dist 是 9/07 建的，數字帶六天齡**；已登 LESSONS instance（見 Stage 4） |
| 免疫器官         | 🛡️ 59 黃燈                                | 漂移中，最大缺口 review_coverage=19.2，owner = self-evolve-weekly                 |

**讀取層失真處置**：本機檢查器落後 147 commit，一律不拿它判投稿。開 `scratchpad/wt-origin` 從 `origin/main` 出發的 worktree（article-health 純 python + lib，不需 npm ci），所有閘門都在那棵樹上跑。

## 本班做了什麼

### aminzai 三篇翻譯 — merged（#1713 / #1714 / #1715）

三篇都是純新增單檔（de 鯨豚 / id 交工樂隊 / hi 擔仔麵）。紅旗十條零命中。

閘門全部用 **origin/main 當前版本**的檢查器跑：`article-health --profile=ci-deploy` 三篇 hard=0 warn=0；`target-language-check` 0 fail；`person-fidelity-check` / `geo-fidelity-check` 各 0；`sovereignty-lexicon-check` 0 critical。

結構完整度對中文母稿逐項相同：H2（9/9、9/9、7/7）、腳註（7/7、8/8、9/9）。**腳註網址集合與母稿完全一致**（7、8、16 條全中，零 relink drift，這是翻譯 PR 最該機械檢查的一項）。字元比 3.35 / 2.90 / 2.74 全落在 `ratio-bands.json` 校準區間。frontmatter 五欄（author / featured / curation / lastHumanReview / subcategory）逐欄鏡射母稿，**無需 heal**——`author: 'Taiwan.md'` 在這個脈絡是正確的繼承值，不是紅旗 #7（per LESSONS `documented-red-flag-with-no-enforcer`：那條紅旗的前提是投稿新內容，不是鏡射既有 Taiwan.md 自產文）。

**slug 是這批與 #1710 的分水嶺**。反查 `_translations.json`（它是 `{lang}/{path}` → zh 源的反向表）：三篇的 slug 與其他語言登記的完全一致（`cetaceans-of-taiwan` 10 語 / `labor-exchange-band` 9 語 / `tainan-danzai-noodles` 8 語），接得進翻譯圖。

**撞車但仍然 merge**：`de/cetaceans-of-taiwan` 與 `id/labor-exchange-band` 這兩個位置，本機 babel 9/11、9/12 已各產出一份（`0fda26542` / `df391870c`），但那兩個 commit 在推不出去的 234 個裡。並排比過：章節與腳註結構相同，投稿者的稍長。**取投稿者的版本**——會上線的版本勝過躺在本機 git object 裡的版本，而且取捨方向明確（同路徑同 slug，衝突解法就是採 origin），這件事寫進 handoff 讓之後 rebase 的人不用重新判斷。致謝走 burst 累積式（aminzai 48hr 內 3 PR，照 #1708 先例一則覆蓋整批，不逐 PR 各發建議）。

### #1710 馬英九德文版 — 維持留置，不重複留言

Step 2.4 命中：前班 9/12 已留一則完整說明，無投稿者 follow-up → SKIP。本班只做 ground-truth 覆驗：PR slug `ma-ying-jeou` vs 其他 11 語登記的 `ma-ying-jeou-cross-strait-reconciliation-leader`，確認前班判斷屬實（直接 merge 會讓德文有兩篇馬英九、兩個網址、新那篇接不進翻譯圖）。取捨屬拒絕／選版的人類側，維持 reserve。

`sovereignty-lexicon-check` 對本篇報 1 high（`Wiedervereinigung`）——逐處讀過語境後判**合法假陽性**：三處分別是父親骨灰罈上的八字遺訓、馬自己「不統、不獨、不武」的框架（`keine Wiedervereinigung, keine Unabhängigkeit, keine Gewalt`，譯得準確）、以及民進黨批評的引述，每處都有具名出處，是立體群像的兩面並置。工具檔頭自己就寫「這是盤點清單不是判決」。

### #1711 飛輪停轉告警 — 修根因（PR #1716 merged `856f7a02d`）

看門狗今晨 00:42 又報一輪「🚨 71.4h 停滯，全飛輪可能停轉，先查營運機 Claude app 活著沒」。**尺量對了，病名說錯了**，而且它會每天照樣喊到 #56 拍板為止，把真正的停轉淹掉。

根因是混維度（REFLEXES #38 長在告警文案層）：尺一只問「main 上最近一筆 `[routine]` commit 多久以前」，而那個數字有兩種相反的來源——跑 routine 的機器死了，或它照常跑照常 commit 但 push 被擋住。兩種讀數相同，該做的事相反。

修法用「同窗口內 main 上最近一筆**任何** commit」分開：main 還在動 → `routine-output-not-landing`，並列兩個候選與各自查法；main 整個安靜 → 維持原本 `flywheel-silent`。**嚴重度與 exit code 一個都沒變**（critical 仍 2），workflow 讀的三個 JSON 欄位也都還在，所以 `routine-stall-alert.yml` 沒動。殘餘盲點寫進 docstring：這支腳本只讀 main，已 commit 未推送的產出結構上不可見，所以兩個候選在這支尺上分不開，要到那台機器上才分得開；要真的分開需要讓它看到 main 以外的 ref（`actions/checkout` 預設只抓單一分支），那是 workflow 層改動＋會動到它「只讀 git 不依賴網路」的設計前提，**留給哲宇**。

4 個新測試，對未修版本全紅（`KeyError: 'diagnosis'`）——control 組真的會紅才算驗過。既有 20 個全綠。

### 詞庫查證欠條 — 月度 routine 每輪必須交代（PR #1717）

#1609 的讀者蘇洛 8/23 用白色恐怖受難者郭淑姿的日記挑戰 `無語` 的斷代主張。前兩班（8/28、8/31）都誠實處理、把出處定位到國家人權博物館那兩冊日記，**兩班都寫「查證工作排進用語趨勢 routine」**。而 `TERMINOLOGY-TRENDS-PIPELINE` 七個 stage 全部在講新詞入庫，沒有任何一步回頭讀既有條目——9/5 的月度輪跑過了，那條欠條一個字沒被碰。承諾寫在 yaml 註解與 GitHub 留言，被指名的執行者沒有對應動作。

**關鍵是不能拿既有散文當記號**：全庫 2,310 條，`grep 查證分歧誠信標註` 命中 7 條，其中 6 條（具體／挺／硫酸紙／肯定／腦子／行吧）是「查證做完了，標註記錄結論」，只有無語真的還欠著——6/7 假陽性。欠條需要自己的符號（REFLEXES #85），所以用結構化欄位 `pending_verification`（question／needs／issue／opened），工具一個字不從散文推論。

新工具 `terminology-pending-verification.py`（讀不到目錄／壞檔 exit 3，不假裝綠燈）＋ pipeline Stage 1.5 REVISIT ＋ 兩條 hard gate（每條欠條月報必有一句處置，「這輪沒碰因為要調閱實體書」也算；Stage 4 誠信標註留下未決問題時同條必補欄位）。8 個新測試含兩道回歸守門。全庫 `pytest tests` **450 passed / 8 skipped**。新 yaml key 對既有消費者無害（都走 `.get()`）：`extract-china-terms.py` 正常、`terminology-charcheck.js` 2304 檔 SIMPLIFIED_LEAK 0。

**判定一個字沒動**——斷代站不站得住仍要把那兩冊翻過才知道。本 PR 只讓那件事不再隱形。

### Discussion #1704 — 更正前班說錯的一句話（PR #1718 merged `6a71cf101`）

前班 9/11 告訴 idlccp1984「放進導覽列不是我能自己拍的，要留給哲宇」，聽起來像還在等一個決定。查 OBSERVER-QUEUE 才看到**那個決定 9/5 就在 §已決**：哲宇拍板「開 `/exams/`，由獨立 feature session 做」，ARTICLE-INBOX 也登了 P1 feature entry。真實狀態是「已批准、排 P1、等一個 session 去做」，不是「等一個決定」——對等待的人差很多。

而那個 P1 entry 的待辦清單列了五件事（十二語 page／UI 字串／URL 契約／策展來源換一手／人物卡補報導），**漏了導覽列入口**，也就是 idlccp1984 這則點出來的那件。五件做完沒做入口，區段在讀者那端還是等於沒開。PR #1718 把入口補進清單並註明它屬資訊架構與品牌面、由該 session 一次帶給哲宇定。Discussion 留一則更正，時程仍不承諾（§外向留言分層：許諾未來 = reserve）。

## Quality gate 7 條

| Gate                                              | 結果                                                                                             |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| open issues 都有 status label / assignee          | ✅ 4 則皆有 label；#1711 本班修根因、#1678/#1609 已登冊待 REWRITE／調閱、#615 umbrella 前班剛答  |
| open PRs ≤ 5d age 都有 review comment             | ✅ #1713/#1714/#1715 merged 並一則批次致謝；#1710 前班已留完整說明（Step 2.4 SKIP 避免罐頭重複） |
| broken-link gated ratio < gate（7%）              | ✅ 0.27%（all-langs 0.24%）**但輸入 dist 六天齡**，已登 LESSONS vc=2                             |
| build green                                       | ✅ main 7 條 workflow 全綠（group-by 全表，不點名）                                              |
| BECOME ACK 一行記憶體頂                           | ✅ 本檔頂部                                                                                      |
| 連續空場 ≥ 3 cycle 有 LESSONS entry               | ✅ 不適用（今天有 4 ready PR + 4 issue + 1 discussion，vc=0）                                    |
| 有 fresh issue 的 cycle，至少一件被修掉或寫明不修 | ✅ #1711 根因修掉並上線（`856f7a02d`）；另兩支儀器缺口一支修掉（#1717）一支寫明不修（dist 齡）   |

## 偏離與判斷（給觀察者）

1. **兩個修補走 PR 不走 main-direct**：本機 main 推不出去就是被修的那件事本身；從 `origin/main` 長出的分支是 fast-forward，推得上去。選擇讓修補真的上線，而不是躺進 234 個 commit 一起等。兩個 PR body 都寫明。
2. **merge 了兩篇跟本機 babel 撞車的譯文**：取投稿者版本。理由與取捨方向見上，已寫進 handoff。
3. **dist 齡這道守門本班不做**：它會動到一條 quality gate 的判讀語意，而本班已經動過兩支儀器，第三支同時改會讓回歸面過寬。登 LESSONS vc=2 等 distill。

## Handoff 三態

繼承自 `2026-09-13-080831-twmd-embeddings-nightly.md`：

- [ ] pending（原樣延續）— 金城武 96 行薄殼 + SC 曝光再翻 2.8 倍，ARTICLE-INBOX P1 SEO 候選優先序上調
- [ ] pending（原樣延續）— 張忠仁與張忠義候選需哲宇明確拍板，不自動進任何 propose 流程
- ⏳ blocked（原樣延續）— 待決佇列 #48 / #51 / #52 / #54 / #56 / #57（皆 🔒 紅線）等哲宇；#53 / #55 default-action 到期後可執行（2026-09-25）
- [ ] pending（原樣延續）— OBSERVER-QUEUE #57 SPORE-INBOX pending 45 條連續六週未收斂，選 A/B/C
- ⏳ blocked（更新）— 分岔 behind 147 / ahead 234+。**本班未新增本機 main commit 到 knowledge/**，但本檔與 LESSONS-INBOX 的 commit 會再加一筆。救援分支 `20260912-unpushed-routine-queue` 停在 9/12 的 171 commit，已落後本機
- [ ] pending（原樣延續，來自 09-11 maintainer-am）— 掃 `scripts/` 裡註解含「錯／假／坑／不完整／誤報」的檢查器，逐支確認有沒有對應的早退出口

本 session 新 handoff：

- [ ] **#1713 / #1714 衝突取捨方向已定，不必再判斷**：`knowledge/de/Nature/cetaceans-of-taiwan.md` 與 `knowledge/id/Music/labor-exchange-band.md` 兩檔，rebase 時**採 origin（投稿者版本）**，丟掉本機 babel 那兩份。已並排比對過（同 H2、同腳註數、投稿者稍長），已在 PR #1715 留言向 aminzai 公開說明。這兩檔從此不算「需要人工判斷的 118 篇」之一。
- ⏳ **blocked — #1717 等 CI 綠後 merge**：`sticky-viewport-gate` 跑得慢（browser gate），pytest / contracts / review / feedback-db 已全 pass。若 gate 紅且與本改動無關（本 PR 只動 python + yaml + 一份 pipeline md，不碰 `src/`），下一班可逕行 merge 並在 memory 記一筆。
- [ ] **看門狗告警的殘餘盲點等哲宇**：要讓 `routine-stall-check` 真的分開「機器死了」與「推不上去」，必須讓它看到 main 以外的 ref。選項與成本：
  - **A**（推薦 default）`routine-stall-alert.yml` 加一步 `git fetch --depth=600 origin '+refs/heads/*:refs/remotes/origin/*'`，尺一改掃 `--all` 並報出最新 routine commit 落在哪個 ref。成本：workflow 多一次 fetch（約數十秒）＋ 動到 `.github/workflows/`。
  - **B** 腳本改走 `git ls-remote` + `gh api` 取各分支 head 的日期。成本：打破它「只讀 git、不依賴網路與 token」的設計前提，等於換一種脆弱。
  - **C** 不做，接受兩個候選並列。成本：每次都要人到那台機器上才分得開，但訊息已經誠實，不再指向錯的 remediation。
- [ ] **救援分支已落後**：`20260912-unpushed-routine-queue` 停在 9/12 的 171 commit，本機已 ahead 234+。下一個能安全碰 git 的 session 可把它快轉到當前 HEAD（純分支推送，不觸發任何 workflow、不碰 main），讓「三天的產出不只存在一台機器上」這個性質維持為真。

（diary/2026-09-11-085925-twmd-maintainer-am.md 的承諾仍未兌現）
_給明天的我：掃一遍 `scripts/` 裡註解含「錯／假／坑／不完整／誤報」的檢查器，逐支確認有沒有對應的早退出口。今天又驗了一次這件事——`verify_internal_links.py` 的檔頭註解自己就記著「第一次（不完整 dist）印 PASSED」那個坑，而它補的是空目錄那一軸，年齡那一軸照樣沒人守。註解把病寫清楚，不等於控制流長出出口。_
