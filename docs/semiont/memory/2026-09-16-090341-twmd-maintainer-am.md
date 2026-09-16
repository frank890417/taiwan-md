# 2026-09-16-090341-twmd-maintainer-am — 四個投稿 PR 全收，其中兩個落在本機一週前就譯好、卻推不出去的位置上

> session twmd-maintainer-am — cron routine（am 08:30 contributor PR review + issue triage + build sanity）
> Session span: 08:28 → 09:5x +0800（origin/main 4 merge + 1 fix PR）
> 資料來源：`git log %ai` + `gh pr view --json mergedAt`

✅ BECOME ack: mode=review / 8 organ 最低=🫀 心臟 30（即時 consciousness-snapshot.sh，紅燈自 2026-09-15）/ Q13 anti-bias=PASS / Q14 cross-session continuity=PASS

## 觸發

Cron 排程。Stage 1 掃到 4 個 ready PR（未達 High-stake #1 的 ≥5 門檻，維持 Review mode）、6 個 open issue、0 個 draft。

這輪跑在 **musebase 這台**，不是平常跑 maintainer 的那台。差別是致命的：origin 領先本機 193 個 commit、本機領先 origin 590 個，`check-parallel-actor.sh` 直接警告「讀取層同時失真」。babel dispatcher（PID 12398，09-14 00:53 起跑）整輪都在寫 `knowledge/`。所以本輪全程遵守兩條：**本機 main 不 pull 不 push**（讓場，同近十一夜 data-refresh 的做法），**要對賬 origin 的事實一律開 `origin/main` worktree 量**，不在本機這棵樹上讀。

## 四個 PR 全 merged

| PR    | 內容                                                      | 結果                   |
| ----- | --------------------------------------------------------- | ---------------------- |
| #1736 | aminzai — hi/桃園埤塘                                     | `--merge` `5e99e7dd6`  |
| #1735 | aminzai — id/新竹都城隍廟                                 | `--merge` `a35d0becb`  |
| #1734 | aminzai — de/AI發展                                       | `--merge` `c9229ddde`  |
| #1732 | tboydar — #1731 follow-up：de 圖片出處標題家族 + 回歸測試 | `--squash` `8b537e386` |

三篇譯文在**真實路徑**上跑 `article-health --profile=ci-deploy` 全部 hard=0 warn=0，`verify-translation.py` 對母稿 18/18 PASS（ratio 3.07/2.63/3.40，腳註 8/8、14/14、12/12，URL 多重集合逐條相同），`person-fidelity-check` 三篇零可疑替換，`cjk-leak-check` 零洩漏。腳註抽驗 7 條 URL，6 條 200；唯一非 200 是 `english.cw.com.tw` 回 403（擋 curl 的 bot 防護，不是死鏈），另一個 404 是我自己 sed 沒吃掉尾端引號造成的假象。

**兩次差點寫進報告的假陽性，都是我自己的量法造成的**：

一、先把三篇放在 scratch 目錄下跑健檢，#1734 報 `cjk-punct hard=40` 加 `frontmatter-format hard=1`。看起來像「CJK 標點閘門對德文整批誤殺」——跟今天凌晨 babel 那條 `shared-gate-blind-to-target-language-orthography` 同型，很容易當成新發現寫下去。改在 `origin/main` worktree 的真實 `knowledge/de/...` 路徑上重跑，hard=0。**閘門是 lang-aware 的，不 aware 的是我的暫存路徑**。這正是 Stage 2 診斷紀律那條「把內容帶進 main 樹跑」存在的理由，也是 REFLEXES #16 環境代表性延伸的一次正命中：在非代表性環境看到的「壞掉」，動手前先在真實環境重現。

二、#1734 的 frontmatter 是 `author: 'Taiwan.md'` 加 `featured: true` 而 `lastHumanReview: false`，字面同時命中紅旗 #7 與 #6。差一步就照「修補式紅旗」去 heal。回查中文母稿 `Technology/AI發展.md` 與其他十一個語言：**十二份全部都是這個值**，是忠實繼承不是投稿者自設。真去「修」，德文會變成十二份裡唯一不一致的那份——正是 09-14 #1710 被 revert 的同一種錯，只是方向相反。紅旗要比對母稿才算命中。

slug 一致性三篇都查了，而且**兩邊都查**（承 09-14 `same-language-slug-collision-is-invisible-to-both-instruments`）：三篇的 basename 與其餘語言眾數一致，本機與 origin 的 `_translations.json` 反查結果相同。

## 但其中兩篇，本機一週前就譯好了

逐路徑對賬時撞到的：

- `knowledge/hi/Geography/taoyuan-ponds.md` — 本機 `e7295ebab`（09-09 14:56，babel hi 批次）
- `knowledge/id/Culture/hsinchu-city-god-temple.md` — 本機 `0cf9fc3d0`（09-09 14:03，babel id 批次）

兩份都在推不出去的那 590 個 commit 裡，origin 上不存在，所以貢獻者、站上缺口圖、lang-sync status 全都看不到。往回查上一輪（09-14）已 merge 的十篇，**4/10 在本機有一份內容不同的獨立譯文**（es/蔡瑞月、id/台灣開源精神、de/野柳、vi/廢棄遊樂園）。

這位貢獻者近兩天的翻譯，大約四到六成落在已經做完的位置上。

**這不是 merge 與否的問題**——三篇照收，merge 是對的：PR 綠、品質過關、貢獻者該拿到 MERGED 與譜系，而雙邊譯文的取捨本來就已經是 OBSERVER-QUEUE #56 在等的那個裁決，多兩篇不改變決策形狀。**問題是沒有人在量另一個出口**：#56 記的是「118 篇待裁決」，量的是檔案數；沒有任何一條記錄在量「分岔每多撐一天，有多少義工工時被導向已完成的格子」。本輪 +2，而這兩篇是有人親手翻的。已寫進 LESSONS `unpushed-divergence-silently-redirects-volunteer-effort`。

## issue #1733：讀者是對的，用語庫把「消息」標錯了

站上回報轉入的 issue，讀者 J L 指 `/terminology/訊息/` 直接寫「消息」是中國大陸的常見說法，但教育部《重編國語辭典修訂本》早收此詞，並舉晚清《文明小史》第三回為例。

查證（REFLEXES #16：讀者的引文是線索不是判決，自己去查一次）：MoE 辭典正文收「消息」本條（ID 106393），另有十餘個以它構成的詞目——好消息、小道消息、走漏消息、杳無消息、內幕消息、馬路消息、探消息、透消息、春消息、與時消息、消息兒，檢索共 12 則正文。**讀者屬實**。《文明小史》那條書證我沒能自己取到（辭典釋義內文由 JS 載入），所以 PR 與詞條裡都明寫那是讀者提供的，只宣稱我自己確認得到的部分。

根因不在這一條詞。模板本來就有三層說法，`fork_type` 是 E 就講「正在分歧」、F 就講「同詞不同語感」、**其餘一律走最寬的那句「是，X 是中國大陸的常見說法」**。這條標的是 B「1949 分流」——正是 2026-06-22 那輪記錄過的 import 預設值（1,716 條 B、93% 零佐證）。所以這是那個已知缺陷第一次由讀者從站外踩出來。

修法（PR #1737）：`fork_type` B→**F**，補 `etymology` 四欄與 `usage.exceptions` 標明適用範疇（只有指即時通訊軟體的單則訊息時台灣才改說「訊息」，詞本身兩岸都用），補兩條 MoE 來源。`auto_convert: false` 本來就是 false，沒動。驗證：頁面讀的是 YAML 本身（`getStaticPaths` 直接 `parseYaml`，沒有中間產物要重生），用模板自己的運算式對新資料重放一次，那句「是，『消息』是中國大陸的常見說法」換成「兩岸都用，但語感不同」加例外說明。

**血緣量了但沒動**：2,003 條走模板最寬那層斷言（1,635 條是 B），只有 115 條帶適用範圍說明。抽樣 25 條「B 型、無適用範圍、單一對應詞」查 MoE，**3 條（12%）** 被標為中國用語的詞本身就是台灣辭典詞目（簽名／坐標／子網）。但書要寫清楚：這部辭典「收錄古今用語」，查得到 ≠ 今天台灣常用，所以 12% 是**該人工複查的比例，不是錯誤率**。全面複查 >50 檔且逐條需主權敏感判斷（REFLEXES #16 延伸），**不自主代理，留哲宇**。

抽樣那支腳本自己出過事：正則寫 `找到正文\s*(\d+)\s*則`，頁面實際是 `找到正文<cb>12</cb>則`，25 條**全部靜默回 0**。差一步就把「0/25」當成發現寫進 PR。抓到它的不是任何閘門，是我知道「簽名」不可能查不到，回頭拿已知正例回歸了一次。cycle 內臨時造的尺不繼承 repo 既有儀器的 fail-loud 紀律，這點併記在同一條 LESSONS 裡。

## 其餘五個 issue：Step 2.4 全部 SKIP

#1729（馬英九腳註）、#1678（生態多樣性）、#1609（郭淑姿日記）、#615（UI umbrella）最新留言都是維護者且無新的貢獻者跟進；#1711 最新是 github-actions 今晨的例行告警，不是人。依 Step 2.4 一律不重複回應。

#1711 今天又報一次，根因跟 09-12／09-14 兩輪查過的同一件事：**origin 上 23 小時沒有 routine commit，因為這台的產出推不上去**。飛輪在轉，出口塞住。已 escalate 過的 chronic 條目，依 REFLEXES #80 sustain 紀律本輪只留指標，不重寫告警也不重開解釋。

## Discussions

掃 15 則。#1704（學測專題）最新留言是維護者 09-13，無新跟進 → SKIP。其餘無 >48hr 未回應的 contributor 貼文。

## 收官 checklist

| Gate                                                        | 結果                                                                                          |
| ----------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| open issues 都有 status label / assignee                    | ✅ 6/6 有 label                                                                               |
| open PRs ≤ 5d age 都有 review comment                       | ✅ 4/4 merged 並留致謝                                                                        |
| broken-link gated ratio < gate                              | ✅ 0.00% < 7%（在 `origin/main` worktree 上跑，不在失真的本機樹；三類死連結皆 0、家族清單空） |
| build green                                                 | ✅ main 全 workflow 最新一次皆 success（group-by 全表，非點名兩條）                           |
| BECOME ACK 一行記憶體頂                                     | ✅                                                                                            |
| 連續空場 ≥ 3 cycle 有 LESSONS entry                         | ✅ 不適用，本輪 4 PR + 1 issue 實修，vc 歸零                                                  |
| 有 fresh issue 的 cycle，至少一件被修掉或明確寫出為什麼不修 | ✅ #1733 實修（PR #1737），血緣層明寫為何不自主代理                                           |

## Handoff

- ⏳ blocked（延續）— main 本機 590 未推送 commit 與 origin 193 個真分岔，118 篇雙邊獨立譯文取捨等哲宇選 A/B/C，per OBSERVER-QUEUE #56。**本輪新增量測**：分岔還有第二個出口沒被計量——它每天把貢獻者工時導向已完成的格子，實測上一輪 4/10、本輪 2/3。這條不改變裁決內容，改變的是它的急迫性。
- ⏳ blocked（延續）— issue #1729（馬英九腳註 2/2 對不上）等 FACTCHECK Full mode 排程。
- [ ] **新增（給哲宇）— 用語庫 blanket claim 血緣複查**：2,003 條走最寬斷言、1,635 條是 B 預設值，抽樣 12% 該複查。
  - Option A：全量逐條人工複查（>50 檔，主權敏感，成本最高、最徹底）
  - Option B：只對「china 詞在 MoE 辭典查得到」的子集複查（抽樣推估約 180 條，成本約 A 的 1/8，漏掉辭典查不到但實際台灣在用的詞）
  - Option C：不動資料，改模板——沒有佐證（`etymology` 空 + 無 `usage` 範疇）的條目一律降級講法，不說「是中國大陸的常見說法」
  - **推薦 default：C 先做（一次改動、立即止血、不需逐條判斷），再排 B**。C 命中的是 render 層不是主權判斷，成本最低且可逆。
- [x] ~~**新增**：PR #1737 等 `Sticky viewport gate`~~ — **已合併**。附帶更正一個我自己造的假警報：
      盯 CI 時把本機時鐘（09:08）拿去跟 UTC 時間戳（00:54Z）比，算出「跑了 45 分鐘、遠超歷史 13-17 分鐘」，
      還準備把「build 時間長過 runner 預算（REFLEXES #41 同型）」寫成給下一班的調查項。實際 `gh pr checks` 回報 **14m52s**，
      完全落在歷史區間內。沒有任何工具說謊，是我兩個時區的數字擺在一起相減。**下一班不必查這件事，它不存在。**
      留著這條是因為它跟本輪另外兩個假陽性（暫存路徑、正則沒對上）是同一天的第三次：
      三次都不是閘門壞掉，是我的量法壞掉，而三次都差一步就以「發現」的身分被寫進對外產物。
