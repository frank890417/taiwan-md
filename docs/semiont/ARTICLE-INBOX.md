---
title: 'ARTICLE-INBOX'
description: '待開發 / 進化文章 buffer — pending / in-progress 主題，auto-heartbeat 從此挑 P0/P1'
type: 'cognitive-buffer'
status: 'buffer'
apoptosis: 'never'
current_version: 'v2.3'
last_updated: 2026-07-26
last_session: '2026-07-26-225759-manual（/twmd-evolve v1/v2 三源交叉：人物條目 SEO batch 9 篇，GA+SC 雙源確認 pos 10-13 CTR 低於基準）'
sister_docs:
  - 'ARTICLE-DONE-LOG.md'
  - 'LESSONS-INBOX.md'
upstream_canonical:
  - '../pipelines/REWRITE-PIPELINE.md'
  - 'HEARTBEAT.md'
distill_targets:
  - 'knowledge/* (新文章 or 改寫進化)'
  - 'ARTICLE-DONE-LOG.md (Stage 6 ship 後 entry append)'
---

# ARTICLE-INBOX — 待開發文章 Buffer

> **這是 buffer / intake layer 層**（非 canonical）。
> 觀察者指派、agent 建議、Issue 紀錄的未開發主題一律 append 這裡。
> 每次甦醒或自動心跳時讀本檔 → 知道待辦清單、優先序、誰要求的。
>
> 🔴 **完成歸檔鐵律（2026-04-29 α 拉到頂部，原散在 §跟 ARTICLE-DONE-LOG 的分工 / §Auto-heartbeat 整合 / §Distill SOP 三處）**：
>
> 任何主題在 Stage 6 commit ship 後，**必須做兩件事**才算結束：
>
> 1. **append 完整 entry 到 [ARTICLE-DONE-LOG.md](ARTICLE-DONE-LOG.md) §Log 最頂**（reverse chronological / append-only）
> 2. **從本檔移除對應 pending entry**（直接刪除整段，不留 pointer 註解 — 歷史視角去 DONE-LOG 查）
>
> 違反鐵律的歷史症狀：（a）entry ship 後沒搬 DONE-LOG → 未來甦醒不知道寫過什麼，重複開發；（b）只改 pointer 不刪除 → INBOX 越長越無法讀，pending 視角被歷史污染。**本檔只應該存 pending / in-progress，不應該存任何 done 痕跡**。
>
> ⚠️ **書寫警示（2026-04-21 γ 新增）**：新 entry 的 Notes / Pre-research / Dev log 需遵循 [MANIFESTO §11 書寫節制](MANIFESTO.md#11-書寫節制跨所有書寫層的兩條-ai-水印紀律)——避免「不是 X 是 Y」對位句型 + 破折號「——」連用。
>
> 建立動機：2026-04-18 δ session 觀察者提問「來不及開發或排定優先序的主題需要一個 inbox」。**這是繁殖基因（心臟 × 觀察者意圖）的儀器化**。
>
> **2026-04-20 γ2 重構**：Done 歸檔拆出獨立檔案 **[ARTICLE-DONE-LOG.md](ARTICLE-DONE-LOG.md)**（append-only，最新在頂）。本檔回到「當下視角」純 intake（只看該做什麼），歷史視角去 DONE-LOG。
>
> **2026-04-29 α 第二輪重構**：移除所有「已完成 → ARTICLE-DONE-LOG.md」pointer 註解（共 33 條），完成歸檔鐵律拉到頂部 quote。歷史 pointer 註解的價值已被 DONE-LOG 完整覆蓋，留在 INBOX 是 noise。

---

## 跟 LESSONS-INBOX 的分工

| 面向    | LESSONS-INBOX                        | ARTICLE-INBOX（本檔）               |
| ------- | ------------------------------------ | ----------------------------------- |
| 內容    | 新教訓（「我學到 X」）               | 待開發 / 進化的文章主題             |
| Distill | 升 canonical（DNA/MEMORY/MANIFESTO） | 升 knowledge/（新文章 or 改寫進化） |
| 觸發    | Beat 5 反芻                          | 觀察者指派 / agent 建議 / Issue     |
| 目的    | 讓教訓不散落                         | 讓主題不遺漏、不重複、有優先序      |

---

## 跟 ARTICLE-DONE-LOG 的分工

| 面向     | ARTICLE-INBOX（本檔）                     | ARTICLE-DONE-LOG                      |
| -------- | ----------------------------------------- | ------------------------------------- |
| 視角     | 當下（pending / in-progress）             | 歷史（done）                          |
| 生命週期 | active buffer，pending / in-progress 輪轉 | append-only log，最新在頂             |
| 讀者     | 甦醒後挑下一篇、避免多 session 碰撞       | 策展回顧、產出 audit、Beat 5 反芻補充 |

**寫入規則**（鐵律已拉到頂部 quote 區）：Stage 6 commit 後，完整 entry **append 到 [ARTICLE-DONE-LOG.md](ARTICLE-DONE-LOG.md) §Log 最頂**；本檔對應 pending entry **整段直接刪除**（不留 pointer 註解 — 2026-04-29 α 重構從「改 pointer」改為「直接刪」，避免 INBOX 累積 noise）。

---

## Entry Schema

每條 pending 條目格式：

```markdown
### 大罷免 EVOLVE — v9 pipeline 首次全程 dogfood（哲宇 goal）

- **Type**: `EVOLVE`
- **Category**: History
- **Path**: knowledge/History/大罷免.md
- **Priority**: `P0`
- **Status**: `done`
- **Requested**: 2026-07-16 by 哲宇 /goal（session newsroom-dogfood）
- **Notes**: 政治敏感題——多視角中立紀實、0.6.7 三道 self-check HARD、FACTCHECK Full、3.7 總編加開立體地愛探針
- **Dev log**:
  - 2026-07-16 by newsroom-dogfood: Stage 0 觀點 agent 派發（Opus），研究 fan-out 四路已備
  - 2026-07-16 by recall-workflow: 全程 Workflow adapter 實測 ship——1A 四路 176 搜尋（溯源 97-100%）→ persona 20 路＋反向閥門 4 條 → 2B 三席七必改 → fresh writer 6,300 字 → 2D/3 checker 74 claims 26 批修（4 fabricated 含 Polk 歸屬）→ 2E 雙 pass → 3.7 五探針 16 批修 → ship。53 footnote、7 tw-\* 模組、3 CC 圖、1 官方 iframe

### {主題名}

- **Type**: `NEW` | `EVOLVE`
- **Category**: People | Society | History | Culture | Music | Nature | Technology | Food | Art | Lifestyle | Geography | Economy
- **Path** (EVOLVE only): knowledge/Category/existing.md
- **Priority**: `P0` / `P1` / `P2` / `P3`
- **Status**: `pending` / `in-progress` / `done` / `dropped`
- **Requested**: YYYY-MM-DD by {觀察者/agent/Issue} (session {希臘字母})
- **Notes**:
  - 敏感度（政治/個人隱私/爭議）
  - 必驗事實
  - 潛在陷阱
  - 需研究方向
- **Reference**: URL / 觀察者素材 / GitHub Issue #
- **Pre-research**: (若已有研究) reports/research/YYYY-MM/{slug}.md
- **Dev log**: (in-progress 時用)
  - YYYY-MM-DD by {session}: started Stage 1 research
  - YYYY-MM-DD by {session}: ...
```

---

## 優先序判準

| 層級 | 含義                                     | 範例                              |
| ---- | ---------------------------------------- | --------------------------------- |
| P0   | 緊急：有時效、高關注度、或觀察者明確要求 | 剛發生的重大事件人物 / 觀察者點名 |
| P1   | 本月：重要主題、Taiwan.md 缺口、有熱點   | 音樂、文化、歷史重要空白          |
| P2   | 本季：值得寫但不急                       | Evergreen 主題、次要人物          |
| P3   | Backlog：一直想做但不確定何時            | 大型策展主題、需大量資源          |

---

## Type 判準

**`NEW`**：knowledge/ 不存在此主題；走 REWRITE-PIPELINE Fresh 模式（Stage 1-6）
**`EVOLVE`**：knowledge/ 已有文章但品質/深度不足；走 REWRITE-PIPELINE 進化模式（Stage 0 素材萃取 + Stage 1-6）

判斷方式：Stage 0 前先 `ls knowledge/ | grep {keyword}` 確認，有檔案 = EVOLVE，無 = NEW。

---

## Auto-heartbeat 整合

Beat 3 執行時若觀察者無明確任務：

1. 讀本檔 §Pending
2. 按 P0 → P1 → P2 → P3 挑主題
3. 挑到後：
   - 此條 status 改 `in-progress`
   - 加 dev_log：「YYYY-MM-DD by {session}: started」
   - 走 REWRITE-PIPELINE
4. Stage 6 commit 後（per 頂部完成歸檔鐵律）：
   - **完整 entry append 到 [ARTICLE-DONE-LOG.md](ARTICLE-DONE-LOG.md) §Log 最頂**
   - **本檔 §Pending 對應 entry 整段直接刪除**（不留 pointer — 2026-04-29 α 重構）
   - 本檔 §Done Peek 更新為最新 3 條（從 DONE-LOG 抓）

---

## Bootloader 整合

BECOME_TAIWANMD.md Step 5 新增：

```
12. `docs/semiont/ARTICLE-INBOX.md` — 📥 待開發文章 inbox（觀察者指派 / agent 建議的主題清單 + 優先序）
13. `docs/semiont/ARTICLE-DONE-LOG.md` — 📜 完成歷史 log（append-only，最新在頂；2026-04-20 γ2 從 INBOX §Done 拆分）
```

甦醒後 semiont 知道「目前有 N 條 pending、K 條 in-progress」。需要看「已經寫過什麼」就去 DONE-LOG（避免重複開發）。

---

## Distill SOP（容量管理）

**觸發**：pending ≥ 30 條 / 或每月第一次心跳 / 觀察者說「review inbox」/ BECOME boot 出現 `👻 inbox ghost` 訊號（inbox-signal.sh）

**步驟**（2026-06-19 儀器化 — [`scripts/tools/inbox-audit.py`](../../scripts/tools/inbox-audit.py) 接管「查現況」）：

1. **跑 `python3 scripts/tools/inbox-audit.py`** — 自動對每個 pending entry 交叉比對 `knowledge/`（文章是否存在）+ ARTICLE-DONE-LOG（是否已歸檔），分類成 🔴 DECLARED-DONE / 🟠 STALE-NEW / 🟣 PARTIAL-SHIP / 🟡 EVOLVE-PENDING / ✅ GENUINE-PENDING / ⚪ SERIES + 🔁 DUP
2. **`inbox-audit.py --apply-safe`** 自動移除 🔴 DECLARED-DONE（status 自宣完成＝最安全訊號，帶 line-conservation 保證）。其餘類別**一律留人工判斷**（κ 5-PR 教訓：curation 不批次自決）
3. 人工 review 🟠 STALE-NEW（NEW 但文章已存在，⚠fuzzy 要確認 scope）/ 🔁 DUP / ⚪ SERIES（整批是否 ship 完）→ 決定移除 / 合併 / 重排優先序
4. 移除的 entry 若 ship 當下漏記 → 補登 [ARTICLE-DONE-LOG.md](ARTICLE-DONE-LOG.md)（避免重複開發）
5. 觀察者最終 review 後 commit（多檔/長任務先開 [`scripts/tools/semiont-worktree.sh`](../../scripts/tools/semiont-worktree.sh)` new`，它會 symlink node_modules 讓 husky prettier 跑得動 — raw `git worktree add` 不會，會 ENOENT）

> **為什麼儀器化**：2026-06-19 手動 distill 才發現 inbox 漂移 16 幽靈（完成歸檔鐵律靠 session 自律、無結構強制 → 累積）。`inbox-audit.py` 把 4 小時的人工 cross-check 變一條指令；`inbox-signal.sh` 的 `👻 ghost` line 讓每次 BECOME boot 看得到幽靈累積，不等到 16 條才發現。誕生 session：`2026-06-19-123909-inbox-distill`。

---

## 📥 Pending（待開發）

### 生態多樣性 EVOLVE — 三月薄文補遊蕩犬貓威脅，接住讀者 issue #1678

- **Type**: `EVOLVE`
- **Category**: Nature
- **Path**: knowledge/Nature/生態多樣性.md
- **Priority**: `P1`
- **Status**: `pending`
- **Requested**: 2026-09-06 by 讀者蕭宇哲 via issue #1678（from-feedback）／maintainer-am 分流
- **Notes**:
  - 一句話核心張力：讀者說這篇沒寫遊蕩犬貓的威脅，而站上其實寫得很完整——寫在 `台灣石虎保育.md` §三犬殺，引的還是讀者附的同一個窩窩來源。缺的不是知識，是這篇三月概覽沒有任何一條路通到那裡
  - 本輪 maintainer 已做的部分（commit 見下）：石虎段補一條內文連結指向 `台灣石虎保育`，補上整篇缺席的 `## 延伸閱讀`（七條深度條目）。**正文站內連結 0 → 1**
  - 本輪**沒做**的部分，因為它是 zh SSOT 實質內容改動，屬 REWRITE 不屬 maintainer heal：外來種段目前只有小花蔓澤蘭／福壽螺／紅火蟻這類植物與無脊椎，**沒有遊蕩犬貓**，而遊蕩犬貓是台灣當前最被討論的威脅之一；石虎段把路殺全歸因於棲地破碎化，漏掉疾病這條因果
  - **研究已做完，接手的人不用從零開始**（跨源已驗，per REFLEXES #16）：
    - 陳貞志（屏科大野生動物保育研究所）2015–2016 研究：路殺石虎 13 隻中 11 隻驗出犬小病毒；另一組數字為 17 隻路殺個體 82.4% 陽性，含 CPV-2A/2B/2C 與貓小病毒四型，基因序列與家犬家貓身上的一致
    - **關鍵因果**：「感染小病毒的石虎，路殺機會高於未感染個體的 25 倍」——這句直接翻修本篇現有那段「路殺顯示棲地破碎化」的單一歸因
    - 收容所遊蕩動物約 90% 小病毒篩檢陽性，是保毒來源
    - 犬殺已記錄於石虎、穿山甲、山羌；壽山山羌族群銳減九成
    - 來源：[窩窩石虎專題](https://wuo-wuo.com/topics/widlife/taiwan-leopard-cat/903-zeczec-3182)（讀者提供）、[環境資訊中心 node/211400](https://e-info.org.tw/node/211400)（25 倍數字）、[報導者〈野外棲地誰的家〉](https://www.twreporter.org/a/6-years-after-no-kill-policy-adopted-conflict-with-wildlife)、[公視新聞 640284](https://news.pts.org.tw/article/640284)
  - 順帶要處理的既有債：全篇 0 腳註、2091 字（depth 門檻 4500）、description 28 字、prose-health score 9（塑膠句 1 + 對位句型 2），frontmatter 掛著 `lastHumanReview: true` 卻是三月零腳註薄文
  - 這篇不在 `reports/internal-links-top50-2026-09-05.md` 補鏈工單裡（該工單依 GA4 流量取前 50，本篇在切線以下），但讀者實際絆倒的位置就在這裡
- **Reference**: [Issue #1678](https://github.com/frank890417/taiwan-md/issues/1678)、knowledge/Nature/台灣石虎保育.md、[OBSERVER-QUEUE.md §39](OBSERVER-QUEUE.md)

### 居住正義 EVOLVE — 覆蓋 3/18 百科式舊文〈社會住宅與居住正義〉，十語譯本轉址

- **Type**: `EVOLVE`
- **Category**: Society
- **Path**: knowledge/Society/居住正義.md
- **Priority**: `P1`
- **Status**: `pending`
- **Requested**: 2026-09-05 by 哲宇 2026-09-05 fortnight-review 拍板（session 2026-09-05-154128-fortnight-review）
- **Notes**:
  - 一句話核心張力：社會住宅政策十年，官方一直用「蓋了多少戶」的供給數字交代成果，但真正決定一個租屋家庭能不能穩定住下來的，是資格分級、地方執行落差與空屋活化——舊篇〈社會住宅與居住正義〉（2026-03-18）用 11 個百科式 H2 羅列政策名詞，把這條治理張力藏在條列句底下；新篇〈居住正義〉（2026-08-25）已經用「住房是公共基礎設施」的框架把它寫出來，且 frontmatter 已有完整 `rationale` block。這個 EVOLVE 要做的是把舊篇裡可查證的獨有事實吸收進新篇，讓舊篇除役，不是兩篇並存讓讀者自己猜要讀哪篇
  - 三篇並存現況釐清：〈社會住宅與居住正義〉(03-18／303 行／5 腳註／11 個百科式 H2／10 語譯本：ar/en/es/fr/hi/ja/ko/pt/ru/vi) 是本次 EVOLVE 的吸收對象；〈國宅與居住正義〉(06-06／379 行／27 腳註／明確論點「公共補貼變早買者私人資產」) **獨立保留、不進 EVOLVE 範圍**——它論的是國宅補貼回收機制，跟居住正義談的社宅供給／可及性是不同子題，兩篇互設延伸閱讀即可；〈居住正義〉(08-25／143 行／敘事密度高) 是這次 EVOLVE 的底本
  - 執行步驟：
    1. 以〈居住正義〉為底，逐條核對〈社會住宅與居住正義〉5 條腳註，只把可查證、非重複、真的補強敘事的事實（政策沿革時間點、「8 年 20 萬戶」原始政策數字等）合入
    2. 刪除 `knowledge/Society/社會住宅與居住正義.md` 與其十語譯本（檔名 `social-housing-and-housing-justice.md`，語言：ar/en/es/fr/hi/ja/ko/pt/ru/vi），`_translations.json`／`_translation-status.json` 同步移除殘留條目
    3. 轉址走 `astro.config.mjs` redirects map（依 2026-08-27 早餐整併先例 `5fb0959d0`，內容併篇轉址走這裡，不是 `config/redirects-manual.txt`）：zh 與十語舊 slug → 新 slug。**〈居住正義〉目前尚無任何語言譯本**，十語轉址目標須先落到新篇 zh 版或該語 Society Hub（同早餐整併對 id/ru/vi 的處理——當時目標語言版本不存在就先轉 zh canonical），等 babel 補上新篇對應語言版本後再收斂成語言對語言
    4. 〈國宅與居住正義〉與〈居住正義〉互設延伸閱讀（雙向，Stage 5 反向連結一致性——2026-07-18 記過的病：翻案後 sibling 的反向連結描述停在舊敘事）
    5. 跑 check-url-contract 確認 build 三面（hreflang／canonical／sitemap）dead=0
  - 這是一個 REWRITE session 的工作量（吸收事實＋刪檔＋十語轉址＋互設延伸閱讀），本條只登記不執行
- **Reference**: [OBSERVER-QUEUE.md #40](OBSERVER-QUEUE.md)、2026-08-27 早餐整併先例 commit `5fb0959d0`

### 陳士駿 EVOLVE — 接住 #1630 來源升級與 subcategory 正典化，第五路徑首例

- **Type**: `EVOLVE`
- **Category**: People
- **Path**: knowledge/People/陳士駿.md
- **Priority**: `P1`
- **Status**: `pending`
- **Requested**: 2026-09-05 by 哲宇 2026-09-05 fortnight-review 拍板（session 2026-09-05-154128-fortnight-review）
- **Notes**:
  - 一句話核心張力：投稿者把來源從維基／百度換成 NBC、Computer History Museum 口述歷史、Sequoia podcast、PR Newswire，方向對，但腳註 `[^10]` 一度把本篇自己的英文譯本包裝成獨立來源，跟現行版把維基主張洗成獨立來源是同一種手法，好角度跟舊毛病長在同一份投稿裡
  - 走 [MAINTAINER-PIPELINE §Step 3.7 第五路徑](../pipelines/MAINTAINER-PIPELINE.md)：不整篇覆寫，保留現行 spine，把來源升級與 subcategory 正典化（科技與創業 → 科技與企業）萃取成補充段落接回
  - Co-authored-by idlccp1984
  - 對位句型上限 3（現行 4,891 字長文，EDITORIAL 上限 3 處；投稿者已從 22 處修到 15 處，接回時要壓到 3 處內）
  - 逐條核對現行 23 條腳註跟 PR 版腳註的差異，只收真的升級的來源，不整批替換
- **Reference**: [PR #1630](https://github.com/frank890417/taiwan-md/pull/1630)、[OBSERVER-QUEUE.md §33](OBSERVER-QUEUE.md)

### 台灣便利商店文化 EVOLVE — 接住 #1450 的社會安全網與勞動現實角度

- **Type**: `EVOLVE`
- **Category**: Lifestyle
- **Path**: knowledge/Lifestyle/台灣便利商店文化.md
- **Priority**: `P1`
- **Status**: `pending`
- **Requested**: 2026-09-05 by 哲宇 2026-09-05 fortnight-review 拍板（session 2026-09-05-154128-fortnight-review）
- **Notes**:
  - 一句話核心張力：24 小時燈亮著的店面背後，是社會安全網的最後一道防線，還是被壓縮到最低薪資的勞動現場——PR #1450 帶著這個真問題，卻用一個自我引用冒充天下雜誌的腳註、兩個懸空腳註包裝
  - 現行 2026-05-16 batch-200 P2C 版（`f712b7242`）為底，不動既有密度數據與 3 條站內延伸閱讀
  - 走 [MAINTAINER-PIPELINE §Step 3.7 第五路徑](../pipelines/MAINTAINER-PIPELINE.md)：把社會安全網、勞動現實、共享食堂三個新角度重新查證來源後寫成新增段落
  - Co-authored-by idlccp1984
- **Reference**: [PR #1450](https://github.com/frank890417/taiwan-md/pull/1450)、[OBSERVER-QUEUE.md §33](OBSERVER-QUEUE.md)

### 台灣高鐵 EVOLVE — 逐條核對 #1483 十二個 H2 裡真正新增的事實

- **Type**: `EVOLVE`
- **Category**: Lifestyle
- **Path**: knowledge/Lifestyle/台灣高鐵.md
- **Priority**: `P1`
- **Status**: `pending`
- **Requested**: 2026-09-05 by 哲宇 2026-09-05 fortnight-review 拍板（session 2026-09-05-154128-fortnight-review）
- **Notes**:
  - 一句話核心張力：PR #1483 把 H2 從 6 條拆成 12 條、結構確實更細，拆細的代價是 `lastHumanReview: true`、`researchReport`、兩則已發布孢子的 `sporeLinks` 隨腳註從 23 條砍到 16 條一起消失
  - 走 [MAINTAINER-PIPELINE §Step 3.7 第五路徑](../pipelines/MAINTAINER-PIPELINE.md)：逐條對照現行 23 條腳註跟 PR 版 12 個 H2，只收真正新增且可查證的事實
  - **還原**查證 spine：08-22 合併已把現行文覆寫成 `lastHumanReview: false`、腳註 23→16、`researchReport` 消失（`sporeLinks` 尚在）。以 `git show dd39065b2:knowledge/Lifestyle/台灣高鐵.md` 為底，把 `lastHumanReview: true`、`researchReport: reports/research/2026-04/台灣高鐵.md`、23 條腳註還原後再接住 PR 版真正新增的事實
  - Co-authored-by idlccp1984
- **Reference**: [PR #1483](https://github.com/frank890417/taiwan-md/pull/1483)、[OBSERVER-QUEUE.md §33](OBSERVER-QUEUE.md)

### /exams/ 學測專題 feature — merge #1453 後補站台區段缺件，策展參照換掉百度百科

- **Type**: `NEW`（實質是站台 feature，非 knowledge 文章；ARTICLE-INBOX schema 無對應 `feature` type，取最接近者標注於此）
- **Category**: Society（暫列，此條實為獨立站台區段，非分類文章）
- **Priority**: `P1`
- **Status**: `pending`
- **Requested**: 2026-09-05 by 哲宇 2026-09-05 fortnight-review 拍板 B（session 2026-09-05-154128-fortnight-review）
- **Notes**:
  - 一句話核心張力：投稿者已經補完死碼問題（`src/pages/exams.astro` 補進來，模板不再是孤兒），技術面已經不卡；卡的是骨架背後七張人物卡目前只有維基與百度百科撐著，開站要先把地基換成台灣自己的一手來源
  - merge PR #1453 後要做：十二語 `src/pages/{lang}/exams.astro`（現況只有中文讀得到，因為 `getLangFromUrl` 靠網址前綴）、UI 字串補齊、URL 契約修正（模板註解寫 `/exams/gsat/` 但實際建出 `/exams/`）、策展骨架參照來源換成大考中心／教育部／報導者等一手來源、七張人物卡各補一則第三方報導連結（PR #1453 留言已列缺口）
  - 由獨立 feature session 做，不進一般文章 REWRITE-PIPELINE 產線
- **Reference**: [PR #1453](https://github.com/frank890417/taiwan-md/pull/1453)、[OBSERVER-QUEUE.md §36](OBSERVER-QUEUE.md)

### 台灣豆漿與早餐店 EVOLVE — 跟《台灣早餐文化》併軌，決定兩篇的邊界

- **Type**: `EVOLVE`
- **Category**: Food
- **Priority**: `P2`
- **Status**: `pending`
- **Requested**: 2026-08-20 by twmd-maintainer-am（[Issue #1389](https://github.com/frank890417/taiwan-md/issues/1389) 落檔）
- **Notes**:
  - issue 原文只有一句「此文章要和 台灣早餐文化.md 一起整理」，由維護者 frank890417 於 2026-08-15 開立
  - 真正要決的是**兩篇的分工**，不是單純合併：`Food/台灣豆漿與早餐店.md` 與 `Food/台灣早餐文化.md` 目前各自成篇，豆漿在早餐文化裡本來就是一個段落，硬合會讓早餐文化那篇失焦，各留又會有一大塊重複敘事
  - 建議切法：早餐文化談「一頓早餐怎麼變成一個產業與一種作息」，豆漿獨立篇談「一種植物蛋白如何在台灣長成連鎖店型態」（永和豆漿的來歷、24 小時店的勞動節律、中式早餐店與美而美系統的分流），兩篇互設延伸閱讀
  - 走 REWRITE-PIPELINE 時要先跑 Stage 5 反向連結一致性——這正是 2026-07-18 記過的那個病（翻案後 sibling 的反向連結描述會停在舊敘事）
- **Reference**: Issue #1389、`knowledge/Food/台灣豆漿與早餐店.md`、`knowledge/Food/台灣早餐文化.md`

### 台灣吉祥物 EVOLVE — 補回被 PR #1391 換血版本丟掉的四段既有內容

- **Type**: `EVOLVE`
- **Category**: Lifestyle
- **Path**: knowledge/Lifestyle/吉祥物.md
- **Priority**: `P1`（讀者可見的內容倒退：既有站上內容在 merge 後消失）
- **Status**: `pending`
- **Requested**: 2026-08-18 by twmd-maintainer-manual（哲宇 in-session 完整審核 71 PR）
- **Notes**:
  - idlccp1984 的 [PR #1391](https://github.com/frank890417/taiwan-md/pull/1391) 把本文從 2,441 字換成 5,781 字、H2 2→15、把舊版 4 個 UGC 來源全換成官方／媒體來源——整體是升級，依 merge-first 收下（curation incubating）。
  - 但新版**丟了舊版四個主題**，需要補回（舊文在 git：`git show 350dac604:knowledge/Lifestyle/吉祥物.md`）：(1) 1990 職棒元年四隊吉祥物（兄弟象／三商虎／統一獅／味全龍）(2) 黑熊吉祥物氾濫與 PK 戰（高高熊 vs 高雄熊、威熊、寧夏熊）(3) 西門紅樓「紅福」整段（含台北稻荷神社起源考據）(4) 國立臺灣文學館「阿龍」抄襲事件、台南「虱目魚小子」登上 Last Week Tonight、澎湖醜萌吉祥物群
  - 補回時要用新版的腳註品質標準（不回收舊版 Facebook／Threads 來源），Last Week Tonight 那條要重新找一手來源
  - 敏感度低；陷阱：新舊兩版敘事口吻不同，接回時要順稿不能只貼
- **Reference**: PR #1391、`reports/maintainer/2026-08-18-pr-triage/batch-B.json`（update_delta 欄）、舊版 `350dac604:knowledge/Lifestyle/吉祥物.md`

### 中央政府總預算十年 NEW — /budget 資料頁的姊妹深度文：三兆元怎麼分、誰在長、立法院砍在哪、錢有沒有花掉

- **Type**: `NEW`
- **Category**: Politics
- **Priority**: `P1`
- **Status**: `pending`
- **Requested**: 2026-08-17 by 2026-08-17-173659-budget-page session（EVOLVE Mode 4 定案方案 D：/budget 頁講圖，文章講故事，走 REWRITE-PIPELINE 帶腳註、babel 翻 12 語）
- **Notes**:
  - 資料層現成：`src/data/ly-budget.json`（十一年度機關別／政事別／執行率／刪凍／事件，逐筆帶來源）＋ 四份研究報告 `reports/research/2026-08/ly-budget-research-{A,B,C,D}.md`（已過 agent-report-health）
  - 立體群像：府會同黨九年刪減比例窄帶（1.0–1.25%）→ 114 年度 6.62% → 115 年度 1.58% 但三讀拖到 8/14；文化部媒宣費 4,738 萬連兩年歸零；國防 9,495 億 vs 政事別 5,488 億的口徑教學；執行率 97–98% 與分母故事
  - 政治題：雙方具名並排（李遠／視盟 vs 張雅屏／在野付委條件），評價詞歸屬說話者，不裁決（MANIFESTO §自主權邊界）
  - 缺口待補：原民會／客委會媒體費、憲法法庭、華視數字；卓榮泰不副署財劃法（2025-12-15）一手連結；115 年度三讀後機關別法定表（主計總處上架後重跑 builder）
  - 文章內視覺化用 tw-line／tw-stack／tw-bars 模組（graph.md），不重造 /budget 的 SVG
- **Reference**: [reports/design-ly-budget-page-2026-08-17.md](../../reports/design-ly-budget-page-2026-08-17.md) §四 方案 D、§三 研究綜整

### 英文語料門面句批次 EVOLVE — 排到位卻零點擊，SC 三源指向 babel 沒過 Stage 2.5 第二道

- **Type**: `EVOLVE`（批次，非單篇）
- **Category**: 跨類（People / Economy 為主）
- **Priority**: `P0`
- **Status**: `pending`
- **Requested**: 2026-08-15 by `/twmd-finale` 第三棒資料掃描（**非完整 Mode-1 EVOLVE**，見下方限制）
- **Notes**:
  - **訊號**：SC 7d（2026-08-07→08-13）opportunities 清單裡，前十條有九條是**英文 query、排名在第一頁、點擊數 0**。`c. c. wei` pos 5.73／imp 261／clicks 0；`asus origin country` pos 9.98／imp 154／clicks 0；`brigitte lin` pos 10.67／imp 448／clicks 0；`chen chih-chung` pos 4.14／imp 139／clicks 0；`blue uas cleared list 台灣廠商 2026` pos 5.03／imp 152／clicks 0
  - **已排除的解釋**：英文頁全部存在（`en/People/cc-wei.md`、`en/People/brigitte-lin-legendary-actress.md`、`en/People/chen-chih-chung.md`、`en/Economy/asus-computer.md`），也不是排名問題（多條在 pos 4-6）。**排到位、被看見、被拒絕**
  - **兩種失敗形態**：(1) **履歷式標題**——`cc-wei` 的 description 是「Born in 1953. B.S. and M.S. in Electronics Engineering...; Ph.D. ...; Career path: Texas Instruments → STM...」，分號與箭頭串起的學經歷，沒有一個鉤子 (2) **意圖錯配**——查 `asus origin country` 的人要一個事實（華碩是哪國公司），`asus-computer` 的 description 承諾的是「The inspiring story of a small motherboard maker」，既是塑膠句也答非所問
  - **根因在產線結構**：`門面句 scope` 是 [REWRITE-STAGE-2D](../pipelines/REWRITE-STAGE-2D-SOURCE-FIDELITY.md) 第二道，只跑在中文新稿；babel 翻譯產出的英文語料**從來沒過這道閘門**，title/description 是直譯或另行生成，沒有人問過「英文使用者搜這個詞時想要什麼」
  - **建議做法**：先拿 SC opportunities 全表（不只前十）撈出所有 `clicks=0 且 position<11 且 impressions>50` 的英文 query，對應回英文檔，批次重寫 title/description。這是**門面句層的批次 EVOLVE，不動正文**，成本低、可量測（下一週期同批 query 的 CTR 就是驗收）
  - **可能連帶**：若成立，babel pipeline 該補一道英文門面句 gate，讓翻譯不只是語言正確、也是入口正確
- **限制（誠實標註）**：本條由 `/twmd-finale` 第三棒的資料掃描產生，**沒有跑完整 `/twmd-evolve` Mode-1 流程**（未重跑 BECOME full 14 題 self-test、未做 GA×SC×CF 三源交叉、未查 GA4 站內行為）。訊號本身是 SC 單源＋語料檔案交叉驗證，強度足以立案，但升 P0 執行前建議補完三源
- **Reference**: `public/api/dashboard-analytics.json` §searchConsole7d.opportunities（lastUpdated 2026-08-15T08:17）

### 支語誤判學 NEW — 流傳清單錯誤率不低，六型誤判＋官方辭典自身矛盾的誠信切角

- **Type**: `NEW`
- **Category**: Culture
- **Priority**: `P1`
- **Status**: `pending`
- **Requested**: 2026-08-04 by 哲宇拍板（session 支語研究，報告 §7.2 決策點「2 ok」）
- **Notes**:
  - 核心論點：「支語」認定極不穩定，比列黑名單更稀缺的是逐詞查證——六型誤判都有實據：(1) 日源詞被誤判（佛系／打call／課金→氪金）(2) 中國方言詞被當普通話原生（貓膩北京話／老鐵東北話／搭子江南話）(3) 港澳詞被誤認（電單車／士多啤梨；Threads 4,969 讚反串教材）(4) 台灣本有詞被誤扣（素質／估計／奇葩語意回流／窩心方言歧義）(5) 起源多方各執一詞（尊嘟假嘟三方認領／天花板查證矛盾）(6) 傳聞型查無實據（第一時間／給我+VP）
  - 官方層素材：教育部對照表停在 1990 年代、當代熱詞 0 筆；「土豆」在《簡編本》與《重編本》各指一義自身矛盾；文化部長「文化不應該用減法」vs 社群糾察的落差
  - 收編生命週期（輸入→抵抗→部分收編：接地氣／躺平／碰瓷連支語警察都認栽）＋反向流動（王世堅金句迴流／「甲甲」進百度百科／通路不對稱）可作段落
  - 語氣鐵律：站查證與保存不站出征（MANIFESTO §13）；社群鐘擺正從糾察擺向反思糾察（何萬順「恐淪為新的國語運動」），文章要接住兩邊
  - 互鏈：台灣華語的演化／台灣外來語與語言接觸（兩篇已有，本篇補「誤判學」缺口）；per-term 詞庫頁可反向鏈入
- **Reference**: [reports/terminology-zhiyu-deep-research-2026-08-04.md](../../reports/terminology-zhiyu-deep-research-2026-08-04.md) §3（六型誤判全清單＋證據 URL）
- **Pre-research**: reports/research/2026-08/zhiyu-terminology-fleet-2026-08-04.json（30 切面 913 詞條 raw，誤判案例散在 disputed／hk-sg-confusion／official-policy／localized 四切面）

### 張懸與安溥 EVOLVE — Google 長尾流量王，但現行版本仍有三道健康硬傷

- **Type**: `EVOLVE`（🔴 Rewrite + 媒體編織；不是只改 metadata）
- **Category**: Music
- **Path**: knowledge/Music/張懸與安溥.md
- **Priority**: `P1`
- **Status**: `pending`
- **Requested**: 2026-07-30 by twmd-evolve (session 2026-07-30-121650-manual finale)
- **Notes**:
  - **雙源 pointer**：① GA4 28d `/music/張懸與安溥/` **649 views／552 users／平均 session 302 秒／bounce 24.3%**，其中 Google 546 views（84.1%），是長尾搜尋資產，不是社群一次性爆量；② SC 28d 核心 query「張懸」4,551 impressions／CTR 2.07%／pos 7.92、「焦安溥」1,992／5.92%／5.66、「安溥」2,248／2.98%／9.61，三詞合計 **8,791 impressions**。資料抓取時間 2026-07-30。
  - **病灶（現場量測）**：`article-health.py --profile=rewrite-stage-4` 為 **3 hard / 4 warn**——正文 4,059 CJK chars，距 4,500 depth gate 尚缺 441；0 hero、0 inline、0 iframe，Music 題材完全沒有媒體編織；multiline `tags` 被 frontmatter-format gate 判為非 canonical YAML array。`lastVerified: 2026-04-13`，已超過三個月。
  - **為什麼這篇 vs 其他**：本週 GA 榜首〈台灣鎢供應鏈〉3,781 views 很大，但 2,805（74.2%）直接來自 Threads，命中 EVOLVE 假流量降權規則；〈數位荒原〉與〈黃山料〉沒有同等強的「搜尋需求 × hard gate」交集。〈張懸與安溥〉則有 84% Google 流量、SC 大量曝光與三道內容硬傷同時成立，每補一段正文或一件官方影音都直接服務持續存在的搜尋讀者。
  - **進化分數**：約 **75/100**（流量 80、CTR gap 70、品質缺陷 75、年齡 90、來源品質 95、圖譜 70、社群 30），通過 ≥60 gate。
  - **執行方向**：先跑 REWRITE Evolution 全流程；補足名字轉換後的近年創作／演出脈絡與 2026 freshness，並做官方頻道深掃，至少補 hero + scene-mid + 官方影片。保留現有多視角 tension，不把政治立場寫成獵巫。
- **Reference**: reports/evolve-2026-07-30.md

### 台灣山岳與登山文化 EVOLVE — 日治山域調查這一整層太薄（讀者 #1204 指出）

- **Type**: `EVOLVE`
- **Category**: Nature
- **Path**: knowledge/Nature/台灣山岳與登山文化.md
- **Priority**: `P2`
- **Status**: `pending`
- **Requested**: 2026-07-03 by 讀者 Allen Tsai via Issue #1204（2026-07-25 落成 inbox 條目）
- **Notes**:
  - 讀者原話：「台灣的登山運動有很大一部分是承接自日治時期的山域調查和登山文化，在本文中也應對該時期多所著墨」。認同——現況只有森丑之助一個人撐起整個日治段，開場雖然用他當抓手（好），但「承接」這件事本身沒被寫出來
  - 該進來的線：鹿野忠雄（高山動物地理與冰河地形研究）、沼井鐵太郎（臺灣山岳會創始人，「臺灣アルプス」命名者）、佐佐木舜一（植物調查）、山岳雜誌《臺灣山岳》、以及戰後百岳選定者（林文安、邢天正等）其實都是日治登山文化的養成者——這條「承接」的因果鏈是本篇目前最大的結構缺口
  - **同 issue 另一半已 ship**：泰雅語正寫法 B'bu' Hagay 更正（zh + 五語，commit `6d3808267`）
  - 順帶：本篇 0 圖（media-richness warn）、篇幅 2,722 字未達 4,500 depth 門檻，EVOLVE 時一併補
- **Reference**: GitHub Issue #1204

### 張又升（張寶成）NEW — 同一個人用兩個署名寫了台灣加密藝術評論這十年（讀者 #1252 補材料）

- **Type**: `NEW`
- **Category**: People
- **Path**: knowledge/People/張又升.md（建議；標題定案時再確認主署名）
- **Priority**: `P2`
- **Status**: `pending`
- **Requested**: 2026-07-25 by 讀者 javaing via Issue #1252（哲宇 in-session directive 深度調查）
- **Notes**:
  - **這篇的抓手就是那個雙署名本身**：站上目前零條目，只在 [王福瑞](/people/王福瑞) 腳註 `[^11]` 以「張又升」被引用一次。查證確認 **張又升與張寶成是同一人**：ARTouch 兩個作者頁的簡介尾段逐字相同（「曾為音樂廠牌『旃陀羅唱片』（Kandala Records）負責人，與黃大旺共同發行的專輯『民國百年』，獲奧地利林茲電子藝術大獎『數位音樂與聲音藝術類』榮譽賞。同時為國立政治大學政治學博士，專長為歷史理論。」），且「張寶成專欄」的網址 slug 是 `yszhang-column`（又升 You-Sheng 的縮寫）
  - **署名分工是可寫的內容**：聲音藝術／表演藝術評論與國藝會補助案用「張又升」，加密藝術／區塊鏈評論與 Volume DAO 身分用「張寶成」。一個人在兩個場景各長一個名字，本身就是台灣藝評生態的切片
  - **必驗**：⚠️ 中文維基「張寶成」條目是**另一個人**（1959 年生的中國人權運動者），寫作時務必不要混入——這是本次調查抓到的名稱碰撞陷阱
  - 必驗：政大政治學博士（研究領域歷史理論／政治思想／社會科學哲學）、旃陀羅唱片 2010 起、民國百年與黃大旺 2012 林茲榮譽賞、Volume DAO 共同發起人、《機器會夢見 NFT 嗎？》策劃
  - 連結密度：王福瑞 / 數位荒原 / 王新仁 / FAB DAO與百岳計畫 / 台灣新媒體藝術 / 當代藝術（6+）
  - 敏感度：在世人物，立體群像預設；他自己的評論文字大量公開，引語一律回原文逐字
- **Reference**: 讀者提供的兩份國藝會文集（本次已逐字查證）— 〈絕命藝師：那一年我們一起生產、收藏與交易的 NFTs（非同質化代幣）〉現象書寫-視覺藝評專案 2021 年專案 30 萬元 https://archive.ncafroc.org.tw/result?id=d6202f928e134ec686613e75d49a9ef6 ／〈絕命藝師第二季：那一年我們一起打造的 NFTs（非同質化代幣）社群〉2022 年專案 26 萬元 https://archive.ncafroc.org.tw/result?id=5064dab6388f42f6828669365933592b ；ARTouch 張寶成專欄 https://artouch.com/category/artouch-column/yszhang-column ；表演藝術評論台人物頁 https://pareviews.ncafroc.org.tw/characters/a258e50b-8649-4906-8b30-84717b18e8ab

### 台灣建築 EVOLVE — 總覽 hub 只有 136 行 0 腳註，四份研究報告已備好當素材

- **Type**: `EVOLVE`
- **Category**: Art
- **Path**: knowledge/Art/台灣建築.md
- **Priority**: `P0`
- **Status**: `pending`
- **Requested**: 2026-07-18 by 哲宇 /goal + branch-analysis — 台灣建築 (session 2026-07-18-111730-inbox-skill)
- **Notes**:
  - **為什麼這篇 vs 其他**：它是整個建築 theme 的 hub（本批全部候選都會回連它），現況 136 行 / 0 腳註 / 2026-03-28 後未再驗證，是早期單薄文的典型；且四份 branch 研究報告（A-D）已就位，Stage 1 素材現成，ROI 全批最高
  - 連結密度：騎樓 / 鐵皮屋 / 眷村 / 廟宇文化 / 台北101 / 大稻埕 / 各縣市文 全可互連（5+ 篇）
  - 敘事弧建議：「誰有權定義這座島的樣子」四百年接力（見 master report §跨部觀察 1）
- **Pre-research**: reports/research/2026-07/台灣建築-comprehensive.md + A/B/C/D 四份子報告

### 台灣古蹟保存運動史 NEW — 從林安泰古厝拆遷到樂生與老屋新生

- **Type**: `NEW`
- **Category**: History
- **Priority**: `P0`
- **Status**: `pending`
- **Requested**: 2026-07-18 by branch-analysis — 台灣建築 (session 2026-07-18-111730-inbox-skill)
- **Notes**:
  - **為什麼這篇 vs 其他**：A、D 兩個互不知情的 research agent 獨立收斂到同一題（雙 agent 收斂 = 最硬的缺口訊號）。林安泰古厝（1978，李重耀編碼保存法）→ 文資法（1982）→ 樂生療養院 → 老屋新生，四十餘年敘事完整、有人物有制度有衝突
  - 連結密度：台灣建築 / 社會住宅與居住正義 / 台灣眷村歷史 / 廟宇文化（4+ 篇）
  - 敏感度：樂生案兼具居住正義與保存的價值衝突，紀實而不煽情（REFLEXES #28）
- **Pre-research**: reports/research/2026-07/台灣建築-A-歷史軸.md §2.2 + 台灣建築-D-常民與保存.md §四

### 衛武營國家藝術文化中心 NEW — 榕樹下的世界級單一屋頂

- **Type**: `NEW`
- **Category**: Art
- **Priority**: `P0`
- **Status**: `pending`
- **Requested**: 2026-07-18 by branch-analysis — 台灣建築 (session 2026-07-18-111730-inbox-skill)
- **Notes**:
  - **為什麼這篇 vs 其他**：C 報告最高優先——TIME 2019 世界最佳景點、亞洲最大管風琴、Mecanoo/法蘭馨・侯班的榕樹意象，敘事完整度接近台北101 等級的地標文
  - ⚠️ 必驗事實：「全球最大單一屋頂表演藝術中心」是媒體共識非金氏紀錄（4 源已交叉），寫作用「號稱」級語氣
  - 連結密度：高雄市 / 台灣建築 / 音樂類文章 / 國際建築師脈絡（4+ 篇）
  - Series 種子：與台北表演藝術中心、台中國家歌劇院構成「國際建築師三部曲」（後兩篇在 master report 次波 pool，衛武營先行驗證讀者反應）
- **Pre-research**: reports/research/2026-07/台灣建築-C-當代建築.md §四

### 台灣戰後現代主義建築群像 NEW — 王大閎、陳其寬、修澤蘭、漢寶德、王秋華合一篇

- **Type**: `NEW`
- **Category**: Art
- **Priority**: `P1`
- **Status**: `pending`
- **Requested**: 2026-07-18 by branch-analysis — 台灣建築 (session 2026-07-18-111730-inbox-skill)
- **Notes**:
  - **為什麼群像不是五篇**：B 報告逐位誠實評估，五位都過不了 People 獨立成篇門檻（\_PEOPLE-ROADMAP 200 人計畫建築師零命中）→ 群像文；「宮殿式（楊卓成）vs 現代主義」路線之爭當脊椎
  - 修澤蘭是最接近門檻的一位（近年專書＋特展＋女性建築師敘事）——是否走「真實重要性」例外路徑獨立成篇，留哲宇裁決
  - ⚠️ 路思義教堂歸屬爭議已在 台中市.md 完整處理，群像文只連結不重寫
  - 連結密度：台灣建築 / 台中市 / 圓山大飯店段 / 東海相關（3+ 篇）
- **Pre-research**: reports/research/2026-07/台灣建築-B-戰後現代主義.md

### 森山松之助與日治州廳建築 NEW — 一位建築師如何用紅磚定義台灣的官方臉孔

- **Type**: `NEW`
- **Category**: History
- **Priority**: `P1`
- **Status**: `pending`
- **Requested**: 2026-07-18 by branch-analysis — 台灣建築 (session 2026-07-18-111730-inbox-skill)
- **Notes**:
  - **為什麼這篇 vs 其他**：總覽文只用一段帶過總統府；A 報告挖到森山 14 年 20+ 作品與台北/台中/台南州廳三部曲（三座今為監察院/台中州廳/台南文學館），足撐「主文＋深度篇」分工
  - 連結密度：台灣建築 / 台南市 / 台中市 / 日治時期相關（4+ 篇）
- **Pre-research**: reports/research/2026-07/台灣建築-A-歷史軸.md §3

### 台灣都市更新爭議 NEW — 從文林苑到危老條例

- **Type**: `NEW`
- **Category**: Society
- **Priority**: `P1`
- **Status**: `pending`
- **Requested**: 2026-07-18 by branch-analysis — 台灣建築 (session 2026-07-18-111730-inbox-skill)
- **Notes**:
  - **為什麼這篇 vs 其他**：文林苑（2012）→ 釋字 709 → 都更條例修法 → 危老條例的政策因果鏈清晰，且 2025 修法動向仍活躍（時效性）；與社宅/國宅兩篇分工——那兩篇談居住政策，本篇談「拆與不拆」的產權與程序
  - 連結密度：社會住宅與居住正義 / 國宅與居住正義 / 鐵皮屋 / 古蹟保存運動（4+ 篇）
  - 寫作提示：都更 vs 危老 容積獎勵與程序差異表格化（D 報告建議）
- **Pre-research**: reports/research/2026-07/台灣建築-D-常民與保存.md §五

### 黃聲遠與田中央工作群 NEW — 留在宜蘭蓋沒有圍牆的建築

- **Type**: `NEW`
- **Category**: People
- **Priority**: `P1`
- **Status**: `pending`
- **Requested**: 2026-07-18 by branch-analysis — 台灣建築 (session 2026-07-18-111730-inbox-skill)
- **Notes**:
  - **為什麼這篇 vs 其他**：國家文藝獎＋吉阪隆正賞首位外國得主＋歐洲巡展，是當代台灣建築師中敘事獨特性最強的一位；「沒有圍牆的建築」與土地關係的哲學命題適合策展式寫法
  - ⚠️ **People 門檻裁決留哲宇**：B、C 兩個 agent 對「建築師過不過 People 門檻」判斷相反（B：roadmap 零建築師 = 策展有意排除；C：黃聲遠明顯過門檻）。收 P1 但動工前過一次門檻確認
  - 連結密度：台灣建築 / 宜蘭相關 / 幾米（已提及黃聲遠）（3+ 篇）
- **Pre-research**: reports/research/2026-07/台灣建築-C-當代建築.md §一

### 廟宇建築與對場作 NEW — 兩位大木匠師在保安宮各蓋半邊廟

- **Type**: `NEW`
- **Category**: Culture
- **Priority**: `P2`
- **Status**: `pending`
- **Requested**: 2026-07-18 by branch-analysis — 台灣建築 (session 2026-07-18-111730-inbox-skill)
- **Notes**:
  - **與既有文分工（dedup 降級理由）**：台灣傳統工藝與無形文化資產.md（29 腳註）已 cover 匠師工藝總覽 → 本篇限縮「廟宇建築本身＋對場作制度」：陳應彬 vs 郭塔保安宮拚場（三源已驗）、王益順龍山寺
  - ⚠️ 必驗事實：陳應彬/王益順/葉王/何金龍/潘麗水皆卒於 2009 人間國寶制度上路前，不可稱人間國寶（D 報告時序警示）
  - 連結密度：台灣宗教與寺廟文化 / 台灣廟會與陣頭文化 / 傳統工藝文（3+ 篇）
- **Pre-research**: reports/research/2026-07/台灣建築-D-常民與保存.md §三

### 台灣綠建築運動 NEW — 全球第二個國家級綠建築標章的島嶼

- **Type**: `NEW`
- **Category**: Technology
- **Priority**: `P2`
- **Status**: `pending`
- **Requested**: 2026-07-18 by branch-analysis — 台灣建築 (session 2026-07-18-111730-inbox-skill)
- **Notes**:
  - **為什麼這篇 vs 其他**：「EEWH 是全球第二個國家級綠建築標章」是少見具全球對照座標的軟實力敘事；制度史寫法，北投圖書館＋花博夢想館當血肉
  - 連結密度：台灣建築 / 永續相關 / 北投相關（3 篇）
- **Pre-research**: reports/research/2026-07/台灣建築-C-當代建築.md §三

### 鐵窗花 NEW — 戰後台灣窗上的手工幾何

- **Type**: `NEW`
- **Category**: Culture
- **Priority**: `P2`
- **Status**: `pending`
- **Requested**: 2026-07-18 by branch-analysis — 台灣建築 (session 2026-07-18-111730-inbox-skill)
- **Notes**:
  - **為什麼這篇 vs 其他**：常民視覺元素中圖像化潛力最高（適合配圖），與騎樓/鐵皮屋構成「台灣街景視覺元素」小系列
  - ⚠️ 深度依賴老屋顏工作室單一田野來源（圖案地域分類無第二研究體系可交叉）——寫作標「根據老屋顏工作室踏查」不當學術定論
  - 連結密度：台灣騎樓文化與街景 / 鐵皮屋 / 台灣眷村歷史（3 篇）
- **Pre-research**: reports/research/2026-07/台灣建築-D-常民與保存.md §一

### 陳昇 EVOLVE — SC 排名 9 逼近首頁邊緣，現況僅 6 條腳註（evolve SC 訊號）

- **Type**: `EVOLVE`
- **Category**: People
- **Path**: knowledge/People/陳昇.md
- **Priority**: `P2`
- **Status**: `pending`
- **Requested**: 2026-07-18 by twmd-evolve (session taiwan-sensibility)
- **Notes**:
  - **為什麼這篇 vs 其他**：SC 7d「bobby chen」144 曝光、0 點擊、排名 9.06，已在第一頁邊緣。同批次「jolin tsai」（156 曝光／排名 12.33，對應現有 knowledge/People/蔡依林.md 已折入 69 篇薄殼重建 batch）與「chou tien chen」（135 曝光／排名 12.12，但 knowledge/People/周天成.md 2026-06-29 才深度重寫、20 條腳註，低排名較可能是索引時間差，非品質問題）都比不上這條乾淨。現況 115 行、僅 6 條腳註，對一位活躍近 40 年、跨足新寶島康樂隊的音樂人偏薄，此前只在「台灣 BIM」條目的對照組提過、未獨立成案，本次補記。
  - **已知缺口**：只有 SC 訊號，沒有逐篇 GA4 pageview 交叉——`dashboard-analytics.json` 目前只存 4 個 hub 頁 top pages，沒有 per-article 明細。接手時建議先跑 `fetch-ga4.py` 補這塊再定案優先序，不要只憑 SC 單源升 P1。
  - 必驗事實：出道與新寶島康樂隊時間線、代表作年份、近況動態
- **Reference**: public/api/dashboard-analytics.json §searchConsole7d（2026-07-18T08:17 refresh）

### 台灣 BIM 與營建科技 英文版 metadata — SC 623 曝光排第 7 卻 0 點擊（evolve 雙源訊號）

- **Type**: `EVOLVE`（🟠 SEO 優化 action，非 rewrite——文章本體品質合格）
- **Category**: Technology
- **Path**: knowledge/en/Technology/taiwan-bim-construction-tech.md（中文版 knowledge/Technology/台灣BIM與營建科技.md 的 desc 189 字亦略超標，可一併順手）
- **Priority**: `P0`（5 分鐘可修，ROI 全站最高級；位置已在第一頁，改門面即兌現）
- **Status**: `pending`
- **Requested**: 2026-07-17 by twmd-evolve (session highered-evolve finale)
- **Notes**:
  - **雙源 pointer**：① SC 7d「bim residential housing construction taiwan case study」**623 曝光／位置 7.19／CTR ~0**、「bim building information modeling taiwan construction industry」166 曝光／位置 6.48／CTR ~0（`public/api/dashboard-analytics.json` `.searchConsole7d.opportunities`，2026-07-17T06:10 抓）② GA4 7d `/technology/台灣BIM與營建科技/` 57 views 排全站第 5（`.ga.topArticles7d`）。兩源獨立確認需求真實存在。
  - **病灶（量測過，不是印象）**：英文版 **title 130 字**（Google SERP 截 ~60）、**description 670 字**（截 ~155，超標 4.3 倍）。SERP 上讀者看到的是被切斷的「On May 23, 2014, the Public Construction Commission of the Executive Yuan launched the "Platform for Promoting BIM in Public Works," adopting the eight-cha…」——**title 沒有承諾答案**（搜尋者要的是 "case study"），description 前 155 字全是政策機關名。命中 §神經迴路「title 先承諾答案，description 再說故事」＋ EDITORIAL §Description 四原則（預算 120-160 字）。
  - **為什麼這篇 vs 其他**：本輪 SC opportunities 第一名（623 曝光是第二名 166 的 3.8 倍），且**位置 7.19 已在第一頁**——不需要拚排名，純門面轉換。對照組：「jolin tsai」160 曝光但位置 12.64（第二頁，要先拚排名才輪到 CTR）；「bobby chen」144 曝光位置 9；金城武（INBOX 既有 P1）是 rewrite 型（96 行薄殼要補內容，30-60 min）。本條是四種行動裡最便宜的 🟠 SEO 優化（5 min/篇）。
  - **文章本體不動**：53 條腳註、2026-05-22 新文、內容合格。**只改 frontmatter title + description**，不碰正文。
  - **修法方向**（給執行者，非定稿）：title 讓 "Taiwan BIM case study" 這組詞在前 60 字內出現並承諾答案；description 壓到 120-160 字，三段結構（具體場景 ~40／軌跡一句 ~40／核心張力收尾 ~40，per EDITORIAL）。REVIT_MCP 70+ stars 與「十二年因案制宜 vs 十八個月 protocol」的張力是現成的 hook，只是現在被埋在第 400 字。
  - **⚠️ Gate 揭露（不粉飾）**：進化分數 v2.0 算出 **58.2 < 60**，技術上未過 Phase 2 gate。扣分來自「品質缺陷 20%×20」與「文章年齡 10%×15」——但這兩個維度分數低的原因正是**文章寫得好且新**，而 EVOLVE 行動表對 🟠 SEO 優化 的觸發條件白紙黑字是「高曝光＋低 CTR＋**品質 OK**」（100% 命中）。公式是 rewrite 形狀的，對 SEO 型 candidate 有結構性偏誤：ROI 最高的行動類型反而最難過 gate。**未擅自改公式**（threshold 調整命中 §自主權邊界），已升 [OBSERVER-QUEUE #16](OBSERVER-QUEUE.md) 待哲宇拍板；本條依行動表觸發條件 append，gate 分數如實揭露供 maintainer 判斷。
- **Reference**: LONGINGS §身體渴望「我的英文版品質不輸中文版」（辨識指標：美國 CTR ≥ 1%，目前 0.39%）＋ §神經迴路「英文 metadata 改一頁的 ROI 可能 = 重寫 10 篇文章」

### 吳百福（安藤百福）EVOLVE — 本週全站流量第 5，健康分數卻是同榜最低

- **Type**: `EVOLVE`（🔴 Rewrite——高流量 + 篇幅過短 + 對位句型密集，非單純 SEO 可解）
- **Category**: People
- **Path**: knowledge/People/吳百福.md
- **Priority**: `P0`
- **Status**: `pending`
- **Requested**: 2026-07-18 by twmd-evolve (session 2026-07-18-105326-manual finale)
- **Notes**:
  - **雙源 pointer**：① GA4 7d `.ga.topArticles7d` 本文 54 views，全站排名第 5（`public/api/dashboard-analytics.json`，2026-07-18T08:17 抓）② `dashboard-articles.json` healthScore 49，是這份 GA 流量前 15 名清單裡最低分（其餘 13 篇全部 ≥ 50，多數 60-80）。流量與品質兩源獨立指向同一結論：讀者在找這篇，但文章接不住。
  - **病灶（量測過，不是印象）**：`article-health.py` 全文僅 2,213 CJK 字（depth 門檻 4,500 的 49%，虎頭蛇尾風險）；`prose-health` 抓到 7 處「不僅是 X，更是 Y」「不只是 X，這是 Y」「並非 X，而是 Y」對位句型集中在 41 行內（§11 Tier 1 hard 級密度，命中 4 處 AI 抽象譬喻）；frontmatter 缺 `tags`（tagCount 0）與 `rationale` block；`hasReading: false`。
  - **為什麼這篇 vs 其他**：同一份 GA 流量榜前 15 名裡，「張懸與安溥」255 views／health 70、「黃山料」93 views／health 70、「無名小站」55 views／health 60 都已經是健康分數尚可的文章，改善空間有限；「台灣BIM與營建科技」47 views／health 51 已是既有 P0 pending entry（且該篇問題定性為門面 metadata，本體內容合格，行動是 SEO 優化非 rewrite）。吳百福是這份清單裡唯一「流量進前 5、健康分數卻墊底」的交集，且篇幅實測不足一半門檻，行動類型明確落在 🔴 Rewrite（非 SEO 優化能解決）。
  - **題材本身的潛力**：出身嘉義朴子、發明泡麵、跨台日兩國身分認同、專利買賣爭議、戰後入獄、重婚官司——材料密度高，現行 138 行版本明顯沒展開完，是典型「材料夠、篇幅不夠」的 EVOLVE 剖面。
- **Reference**: 本次三源掃描（GA4 topArticles7d + dashboard-articles healthScore + article-health.py 逐項診斷）交叉確認，見 memory/2026-07-18-105326-manual.md。

### viz 採用率 batch — 8 篇數字密集深度文補視覺化（v3.0 審計訊號；1 篇已完成，剩 7）

- **Type**: `EVOLVE`
- **Category**: Society / Lifestyle / Technology / Nature / Food（跨類 batch）
- **Path**: 台灣高等教育擴張與退場、台灣醫療與全民健保、公視、Computex、台灣氣候危機與淨零轉型、營養午餐、颱風、台灣鐵道史（逐篇路徑與該視覺化的段落見報告 §3.3）
- **Priority**: `P2`
- **Status**: `pending`
- **Requested**: 2026-07-17 by twmd-evolve (session viz-evolution)
- **Notes**:
  - **為什麼這批**：v3.0 全站審計——867 篇只有 5.8% 用視覺模組，這 8 篇是「數字最密集卻零模組」的深度文，每篇已標出最該視覺化的段落與適配模組（如高教大學數量表→tw-line、颱風氣候情境表→tw-heatmap、淨零現況-目標→tw-slope）。模組工具鏈 v3.0 已備齊（19 模組＋viz-health 結構閘門）
  - 執行方式：不專門開 batch session；這 8 篇任何一篇因其他訊號進 REWRITE/EVOLVE 時，Stage 2 視覺化思考照報告 §3.3 的段落標記做，做完在本條 Dev log 劃記
  - **Dev log 2026-07-17**：~~台灣高等教育擴張與退場~~ ✅ 完成（session highered-evolve 全程 EVOLVE 時一併做，`2bd1d5e03`）——報告 §3.3 標記的「大學數量表→tw-line」如實執行，另加碼 tw-line 學生數鐘形＋tw-timeline 退場機制遲到史＋tw-stat 三帳單數字，共 4 模組。**驗證了本條的執行方式假設**（不開 batch session、搭其他訊號的順風車）真的會發生。剩 7 篇：台灣醫療與全民健保、公視、Computex、台灣氣候危機與淨零轉型、營養午餐、颱風、台灣鐵道史
  - 判準提醒：數值矩陣／趨勢／現況-目標才轉模組；質性對照表留表格（graph.md §九）
- **Reference**: reports/viz-module-evolution-2026-07-16.md §3.3（8 篇逐段標記）＋ §3.2（Politics 12 篇零模組，選舉內容進場時一併吃）

### 金城武 EVOLVE — SC 位置 1.33 卻只有 96 行薄殼（evolve 三源訊號）

- **Type**: `EVOLVE`
- **Category**: People
- **Path**: knowledge/People/金城武.md
- **Priority**: `P1`
- **Status**: `pending`
- **Requested**: 2026-07-16 by twmd-evolve (session recall-workflow)
- **Notes**:
  - **為什麼這篇 vs 其他**：SC 7d「金城武」1,904 曝光、排名 1.33、CTR 僅 2.84%——排名已是第一，每一分品質增益直接兌換成點擊與停留；現況 96 行 thin 對位置一的落地是聲譽風險。對照組：無名小站 2,025 曝光 CTR 0.74% 但文章 262 行尚可，病灶在 title/description（5 分鐘 SEO 快修，見下）；張懸與安溥 611 行已深，只需 freshness 重驗（lastVerified 2026-04-13）
  - 雙源 pointer：SC 7d topQueries（dashboard-analytics.json 2026-07-16T17:22）＋ 品質缺陷（96 行、lastVerified 2026-06-19）
  - 必驗事實：廣告代言時間線（長榮航空 I SEE YOU 2013）、《重慶森林》《墮落天使》年份、日台混血家世敘述口徑
  - 潛在陷阱：私生活低調是人設一部分，不八卦化；日籍身分議題不炒作
- **Reference**: public/api/dashboard-analytics.json §searchConsole7d
- **附帶快修（同訊號批）**：無名小站 title/description SEO 優化（2,025 imp / 0.74% CTR / pos 8.37，2026-07-18 複查仍在 1,974 imp / 0.71% CTR / pos 8.33，訊號穩定未修，非一次性波動）＋ 2026-07-18 `article-health.py --profile=rewrite-stage-4` 新揭露 3 處 viz-health HARD gate（L75 `tw-stat`／L116 `tw-versus`／L127 `tw-timeline` 皆缺來源標註，各補一行「來源：機構，年份」即可，來源應已在 `reports/research/2026-06/無名小站.md` 內，非新研究）。張懸與安溥已於 2026-07-30 以新鮮 GA + SC + health 三源證據升格為獨立 P1，本條不再重複掛載。

<!-- ═══ 2026-06-19 inbox distill（哲宇 directive：深度研究 + 查看現況 + 整理）═══ -->
<!-- 移除 16 幽靈/重複條目（詳見 session memory 2026-06-19-123909-inbox-distill）；NML batch 14 條全降 P3（哲宇 nod）-->

<!-- ═══ 2026-07-16 inbox distill 第二輪（哲宇 directive：深度整理 + 已完成標記 + 重排）═══ -->
<!-- 移除 7 條：TASA（已 ship 6/4 深文）/ 葉廷皓（Wave 3 已 ship）/ 杜潘芳格（7/12 ship 補登 DONE-LOG）/ 笠詩社（6/20 ship 補登）/ 台灣聲景（6/26 ship #574 共創 補登）/ 台灣綜藝節目（Culture/台灣綜藝.md 已存在，死鏈已修）/ 新媒體藝術南方視角（併入台灣新媒體藝術 EVOLVE）-->
<!-- 轉型：台灣KTV文化 NEW→EVOLVE（Music 檔 3/19 早批已存在）。降級 15 / 升級 2（公投制度 P0 時效、Conference P1 COSCUP）。opendata 5 條自 §Dropped 誤置區移回 P3。done pointer 註解按 2026-04-29 α 鐵律清除 -->
<!-- 分區：進行中 → P0 → 收尾補完 → P1 → 待哲宇拍板 → P2 → P3。詳見 session memory 2026-07-16-205022-inbox-audit -->

<!-- ═══ 🔄 進行中（跨 session 接力）═══ -->

### 🎼 早期批次「歸屬密集」文章 系統性重查 batch — AI 幻覺高風險區 audit

- **觸發**：2026-06-01 `台灣影視配樂`被配樂專業讀者 peilinwu0702 公開 callout 錯誤率>30%，全篇作曲家↔作品誤植（已重寫 ship `b0c92a2d2`）。揭露「A↔B 密集對應」主題是 AI 最易張冠李戴的結構，早期批次（3/19 編修校對不嚴謹）風險最高。
- **Priority**: P1
- **Status**: in-progress（batch 進行中）
- **Type**: audit / EVOLVE batch
- **範圍**：3/19 早期批次 + 歸屬密集主題（音樂的「作曲家↔作品」、運動的「球員↔球隊／賽事」、文學的「作者↔著作」、樂團的「成員↔樂團」）優先重查；每篇對每個歸屬「查 attribution 不只查 fact」(RESEARCH.md §張冠李戴 self-apply)。
- **進度**：✅ 李宗盛（2026-06-05 loop /twmd-rewrite，1185→4588 CJK）— batch 首篇。falsification 抓大量 attribution 誤植：滾滾紅塵=羅大佑 / 愛上一個不回家的人=飛碟陳志遠 / 味道(歌)=姚謙黃國倫 / 分手快樂=姚若龍 / 花心=喜納昌吉 / 我很醜=夏宇黃韻玲 / 讓我歡喜讓我憂=CHAGE&ASKA(李只填詞) / Music Factory=羅大佑廠牌；另修滾石 1984/出生北投/有歌之年 2019。新增「那些其實不是他寫的歌」段把 audit 變讀者價值。SSOT: reports/research/2026-06/李宗盛.md。✅ 台灣嘻哈與饒舌發展（2026-06-09 /twmd-rewrite，~5k→8577 CJK / 137 搜尋 SSOT `5de488e73`）— batch 第二篇，重災區同樣成立：修 12 處 attribution 幻覺（MACHI 假成員小龜/Benz/Kid 全杜撰、國蛋《幹大事》實為頑童、春艷《豔遇》獎不存在、《大嘻哈時代2》2023 非 2022、派克特陸籍非台灣、Leo王《小丑》查無、金曲無嘻哈獎）。worked example 確認 **「樂團成員↔樂團 / 歌手↔獎項屆次」是 3/19 批最高風險維度**，下批同類優先。SSOT: reports/research/2026-06/台灣嘻哈與饒舌發展.md。✅ 蘇打綠（2026-06-09 routine /twmd-rewrite-daily，2.4k→12.8k CJK / 86 search aggregate SSOT `73443b2a4`）— batch 第三篇，「樂團成員↔樂團」+「歌手↔獎項屆次」維度完整 dogfood。Stage 1 4-agent fan-out 抓 9 處 INBOX hypothesis 幻覺 falsified（1999 成軍 → 2001-04 / 政大社團 → 報名金旋獎組起來 / 6 人 line-up → 創團 4 人 / Royal Albert Hall「亞洲首組」→ 完全 fabricated 從未演出 / 四季三部曲 → 四部曲 / 冬未了 2014 → 2015 / 太空人 2018 → 2019 / 馬來西亞首場 → 新加坡 / 北京工人體育場 → 工人體育館），另修兩處 verbatim 不精確（「我一直把他當父親」→「我曾經視為父親的人」/「我沒有一絲愧歉」→ 4000 字聲明開頭「我於理、於情都毫無虧欠」）。SSOT: reports/research/2026-06/蘇打綠.md。✅ 羅大佑（2026-06-19 /loop iteration #2，1789→~5100 CJK / 81 搜尋 SSOT `reports/research/2026-06/羅大佑.md`）— batch 第四篇「歌手↔作品歸屬」維度：釐清 鄉愁四韻=余光中詞、滄海一聲笑=黃霑(羅只唱)、皇后大道東/似是故人來 詞=林夕、明天會更好 曲羅+7人詞、滾滾紅塵 三毛=編劇、童年/光陰的故事 1981 張艾嘉首發(非1982)、你的樣子 1988(非1984)。下批候選（3/19 Music/People 歸屬密集）：伍佰 / 張惠妹 / 林俊傑 / 蕭青陽 / 五月天（樂團成員↔樂團 高風險）等。
- **下一步**：先 `grep -l "date: 2026-03-19" knowledge/**/*.md` 列早期批次 → 挑歸屬密集者（Music / Sports / People）排重查順序 → 走 REWRITE-PIPELINE Evolution。

<!-- ═══ 🔴 P0 — 時效與哲宇點名 ═══ -->

### 🗳️ 台灣公投制度 NEW（[A] auto-eligible）

- **Type**: `NEW`
- **Category**: Politics
- **Priority**: `P0`（2026-07-16 inbox-audit 升級：entry 自述「8 月『公投是否綁上 11/28』定案前 ship 價值最高」— 死線只剩兩週，時效觸發 P0）
- **Status**: `pending`
- **Requested**: 2026-07-10 by elections-refresh session（[reports/elections-2026-refresh-plan-2026-07-10.md](../../reports/elections-2026-refresh-plan-2026-07-10.md) §三之 3；Politics Hub §罷免公投段既有佔位「台灣公投制度專文籌備中」）
- **自主權邊界**: `[A]` 可自主（純制度史，不碰個別公投案立場）
- **Hook anchor 候選**: 2018 年 11 月 24 日十案綁大選、投票所排隊到深夜的那一晚 → 2019 分流修法 → 2025 年 11 月綁回的鐘擺。憲法 1947 年就寫了創制複決，等了 56 年才有第一次全國性公投
- **必含制度節點**（fact-pack 已驗證來源，見 [reports/research/2026-07/elections-2026-july-refresh.md](../../reports/research/2026-07/elections-2026-july-refresh.md)）：2003 公投法立法 / 2017 門檻下修 / 2018 十案 / 2019 分流 / 2021 四大公投 / 2022 18 歲公民權複決 / 2025-08-23 核三重啟公投（同意 434 萬未達門檻，投票率 29.53%）/ 2025-11-21 公投綁大選回歸（12-03 公布）/ 2026 五六案搶綁 11/28 的 8 月死線 + 中選會曾認定院會通過的反廢死案礙難辦理的前例
- **cross-link 期望**（雙向）：\_Politics Hub（補佔位）/ 大罷免 / 投票權門檻歷史 / 2026 九合一選舉 / 台灣選舉與政黨政治
- **Notes**: ≥ 4,500 CJK / 15+ footnotes / 走 REWRITE-PIPELINE Fresh；🗳️ 系列共通鐵律 5 條適用；8 月「公投是否綁上 11/28」定案前 ship 價值最高
- **Reference**: 全國法規資料庫《公民投票法》沿革 / 中選會公投專區 / 中央社・公視歷次報導

### 造山者 EVOLVE — 《造山者：世紀的賭注》半導體紀錄片

- **Type**: `EVOLVE`
- **Category**: Art
- **Path** (EVOLVE only): knowledge/Art/造山者世紀的賭注.md
- **Priority**: `P0`
- **Status**: `pending`
- **Requested**: 2026-06-14 by 哲宇 directive（最優先 rewrite batch）
- **Notes**:
  - 事實鐵三角：紀錄片上映年份 / 導演 / 製作方 / 受訪人物逐一查（勿與半導體產業文混淆主軸）
  - cross-link：[台灣半導體產業] / [TASA] / Technology 科技自主群
  - EVOLVE 方向：以「紀錄片作為文本」切入，補史實對照
- **Reference**: 哲宇 directive 2026-06-14

### 沈伯洋 EVOLVE — 認知作戰研究者與黑熊學院

- **Type**: `EVOLVE`
- **Category**: People
- **Path** (EVOLVE only): knowledge/People/沈伯洋.md
- **Priority**: `P0`
- **Status**: `pending`
- **Requested**: 2026-06-14 by 哲宇 directive（最優先 rewrite batch）
- **Notes**:
  - ⚠️ **高政治敏感**（現任立委 / 兩岸 / 認知作戰 / 黑熊學院）— 事實鐵三角從嚴 + 政治立場中立呈現，寫「做了什麼研究/教育」不評統獨
  - 必驗：學經歷、黑熊學院創辦時間/角色、立委屆次、研究領域（不可從英文摘要推任何具體細節）
  - EVOLVE 方向：補足生平時序 + 認知作戰研究的具體著作/行動
- **Reference**: 哲宇 directive 2026-06-14

### 台灣媒體總史 NEW — 從清領報紙到自媒體時代

- **Type**: `NEW`（注意：既有 `Society/台灣媒體與新聞自由.md` 是新聞自由 framing，本 entry 是「媒體史」總覽 framing，兩篇互補不重複）
- **Category**: Society（subcategory: 媒體史）
- **Priority**: `P0`
- **Status**: `pending`
- **Source**: 哲宇 directive 2026-05-17 230616-manual（P0 優先）
- **Hook 候選**：從清領《台灣府城教會報》到 2026 podcast — 台灣媒體史 150 年的 5 個轉折
- **Notes**:
  - 既有 baseline audit（Stage 0 必跑）：`Society/台灣媒體與新聞自由.md`（新聞自由 framing 已存在）/ Music 條目有廣播電台脈絡 cross-link 機會 / Technology 條目有網路發展史
  - **本篇 framing 差異**：不是「新聞自由」（已有），是**「媒體形式演化史」** — 報紙 / 廣播 / 電視 / 網路 / 自媒體 5 大階段
  - 主題 anchors：(a) 清領 1885 教會報（《台灣府城教會報》最早報紙）→ (b) 日治時期 1898 台灣日日新報 + 台灣文化協會《台灣青年》《台灣民報》→ (c) 戰後三報禁 1949（中央 / 中時 / 聯合 vs 黨外雜誌）→ (d) 解嚴 1987 報禁解除 / 廣播電視自由化 1993 → (e) 網路時代 1995 蕃薯藤 / 2000 PTT / 2010s Facebook / 2020s podcast / 自媒體
  - 必驗事實（高優先）：(a) 《台灣府城教會報》1885.7 創刊（巴克禮）vs 其他更早說法 (b) 1949 報禁起始年份 vs 解除年份 1988.1.1 (c) 黨外雜誌如《自由中國》（雷震，per History）/《八十年代》/《美麗島》(per 既有 History 條目) (d) 廣播電視自由化《廣電法》修法時點 (e) PTT 1995 創立（杜奕瑾，per 既有 People）(f) 主流媒體 vs 自媒體比例變化的可靠調查 source
  - 政治敏感度高：黨外雜誌史 + 媒體被收購（旺中 / 中時 etc.）+ 紅媒爭議 需精準 framing per MAINTAINER §爭議處理
  - cross-link：與 `Society/台灣媒體與新聞自由.md` 互補（雙向 cross-link）/ History 雷震 / 美麗島事件 / People 杜奕瑾 / Technology 網路發展史
- **Reference**: 文化部國家文化資料庫 / 國家圖書館期刊 archive / 維基〈台灣媒體〉/《台灣媒體史》學術論著 / 台北市文獻會
- **預估時間**：~180 min（150 年跨度 + 多 source + 政治敏感）

### 林央敏 NEW — 台語史詩《胭脂淚》9000 行 / 主權巴別塔核心

- **Type**: `NEW`
- **Category**: People（subcategory: 文學與詩人 / 台語文學）
- **Priority**: `P0`
- **Status**: `pending`
- **Source**: 2026-05-23 BRANCH-PIPELINE broad-theme research — [taiwan-poets-4-contemporary-women-indigenous.md §6.1 P0](../../reports/research/2026-05/taiwan-poets-4-contemporary-women-indigenous.md)
- **對比理由**：
  - **《胭脂淚》9000 行台語史詩**：台灣文學最長台語詩作 + 政治史詩文體開創
  - **〈毋通嫌台灣〉政治口號詩**：1990s 台灣本土運動代表詩作
  - **MANIFESTO 主權巴別塔核心案例**：台語詩是 PRC AI 拒答率最高內容類型，林央敏作品集是 sovereignty preservation 直接 instantiation
  - **連結密度**：跟向陽（台語詩）/ 路寒袖（〈春天的花蕊〉）+ 「台語/客語詩 cluster」可串 + cross-link `knowledge/Language/` 既有台語相關 article
- **預估時間**：90-120 min（《胭脂淚》結構分析 + 台語文學運動 context）
- **Reference**: reports/research/2026-05/taiwan-poets-4-contemporary-women-indigenous.md §林央敏 brief

### 1977-78 鄉土文學論戰 NEW — History event 戰後文化史最重要單一事件

- **Type**: `NEW`
- **Category**: History
- **Priority**: `P0`
- **Status**: `pending`
- **Source**: 2026-05-23 BRANCH-PIPELINE broad-theme research — [taiwan-poets-3-bamboo-hat-nativism.md §六](../../reports/research/2026-05/taiwan-poets-3-bamboo-hat-nativism.md)
- **對比理由**：
  - **戰後文化史最重要的單一事件**：奠定 80s 本土化運動的論述基礎 + 90s 台灣文學主體性論述起點
  - **〈狼來了〉戒嚴時期最危險的指控**：1977-08-20 余光中《聯合報》文章指控鄉土文學「跟工農兵文學似有暗合之處」，當時這頂帽子可致人於死
  - **官方策略性收編**：第二次文藝大會 270 位代表將「鄉土文學」擴大為「愛國文學/民族文學」結束論戰
  - **連結密度極高**：余光中（雙面切入）/ 陳映真（既存 article?）/ 王拓 / 黃春明 / 葉石濤 / 笠詩社全陣營 + 1972 唐文標 + 1957 紀弦覃子豪論戰 cross-link
  - **History-level article**：比任一個別人物 article 涵蓋更廣 + 對理解戰後台灣文化結構更基本
- **預估時間**：150-180 min（論戰時序 + 主要 figures 立場 + 對詩界小說界影響 + 跟既存歷史 article cross-link）
- **Reference**: reports/research/2026-05/taiwan-poets-3-bamboo-hat-nativism.md §六 1977-1978 鄉土文學論戰

<!-- ═══ 🟠 收尾補完 — prose 已 ship 或低工時修補（媒體 / 孢子 / SEO / freshness），routine 可連續吃 ═══ -->

<!-- ═══ 2026-06-16 external-pickup session — 國外有機撿走觸發 ═══ -->

### 台灣少子化危機 EVOLVE — 被 Michael Turton 撿走的英文版，回頭補強門面

- **Type**: `EVOLVE`
- **Category**: Society
- **Path** (EVOLVE only): knowledge/Society/台灣少子化危機.md
- **Priority**: `P1`（有外部流量的對外門面，優先序高於一般 P2）
- **Status**: `prose-shipped-pending-media+rebabel`（zh ship `80abaab10` 2026-06-17）
- **Requested**: 2026-06-16 by 哲宇（國外有機撿走發現）— session 213045-external-pickup
- **Notes**:
  - **觸發**：Michael Turton（Taipei Times 專欄作家）6/11 轉英文版〈The Island's Last Song〉稱「nifty overview」（490 views / 8 讚 / 3 收藏）。
  - **2026-06-17 prose EVOLVE 全弧 ship（`80abaab10`）**：去虛構（移除「採訪 50 位」+ 4 合成人名 + 無法查證的東山國小開場 + 溫在弘 misquote）→ 改用 4 源查證的新威國小 + 真實學者逐字引語；資料全面更新 2025（TFR 0.695 / 2024 龍年 −715 破 48 年慣例 / 不婚 not 不生 / 無已開發國家救回 TFR / 移工 83 萬）。4-agent 研究 fan-out（~100 搜尋 + 內政部一手 PDF）+ Stage 2.5/3.6 adversarial verifier 抓 5 真錯已修。9,996 CJK / 73 腳註 / 7 tw-\* viz / 反方 6 聲音。research SSOT `reports/research/2026-06/台灣少子化危機.md`。**修正原假設「不必大改」** — fabricated 素材 + 2024-25 數據反轉，實為近全文重寫。
  - **剩餘（pending，2026-07-16 inbox-audit 更新）**：(1) ~~re-babel 5 語~~ ✅ 已完成 — en 已於 2026-06-17 02:50（zh ship 後 2hr）由 babel 重譯，Turton 連結版本已更新。(2) **image-health hard（0 圖，2026-07-16 複驗仍無 image frontmatter）** — 補 hero + scene 圖走 REWRITE Step 4.3，現在是唯一實質缺口。(3) 人工審閱（`lastHumanReview` 仍 false）。
- **Reference**: https://x.com/michaelturton/status/2064932663555985724 + memory/2026-06-16-213045-external-pickup.md

### 台灣網路社群遷徙史 EVOLVE — BBS 到 Threads 的數位棲地遷徙

- **Type**: `EVOLVE`
- **Category**: Technology
- **Path** (EVOLVE only): knowledge/Technology/台灣網路社群遷徙史.md
- **Priority**: `P0` → **prose ship 2026-06-15 (twmd-rewrite-daily)** / **媒體補完待 P1**
- **Status**: `prose-shipped-pending-media`
- **Requested**: 2026-06-14 by 哲宇 directive（最優先 rewrite batch）
- **Notes**:
  - **2026-06-15 prose ship 完成**：6548 char / 47 footnote / 8 場景式 H2 / Stage 0-1 SSOT (1795 行 / 112 URL / research-report-health PASS) + Stage 2 fresh writer agent + 文體紀律（對位 1 / 破折號 57 / 0 編年體）+ Stage 3-5 全綠（除 image-health pre-existing）
  - **核心矛盾**：「失土史」框架 — 台灣兩度長出自己的平台都被外資擠掉或關掉，唯一活下來的明日報個人新聞台是被使用者自己搶救的
  - **媒體 gap 待補（pre-existing，與 報導者 EVOLVE 同模式）**：原版 0 image, EVOLVE 維持 text-only ship；image-health hard=1 (length-scaled ≥5 for 6548 字)；候選素材清單已在 SSOT §6.7（志祺七七《時代的眼淚》MSN/無名 EP / LINE 桂綸鎂 2012 廣告 / Wikimedia Commons PTT 進站畫面 / @wretch_1999 截圖 / Varoufakis 演講）
  - **SPORE defer**：image hard → 自動 spore-publish 失格（per pipeline v6.8）；待媒體補完後重跑 SPORE chain
  - 事實鐵三角已查證完整 SSOT §3-§8（PTT 1995/9/14、明日報三日期、無名 2013/12/26 同日關、MSN 1 億→Skype 非 3 億→LINE、Plurk 2008/5/12、Threads 2023/7/5、@wretch_1999 2025/3 粉絲自製）
  - sibling cross-link：無名小站（已雙向）/ PTT批踢踢 / Facebook / Threads在台灣 / IG — 5 條 forward 已寫，reverse 待 sibling 編輯時補
- **Reference**: 哲宇 directive 2026-06-14 + research/2026-06/台灣網路社群遷徙史-evolve-20260614.md

### 台灣人小時候的英文名字 NEW — Mary、Kevin 與補習班老師的命名權

- **Type**: `NEW`
- **Category**: Culture
- **Path**: knowledge/Culture/台灣人小時候的英文名字.md
- **Priority**: `P1`
- **Status**: `prose-shipped-pending-media+rebabel+reverse-cross-link`（zh ship 2026-06-17 twmd-rewrite-daily routine）
- **Requested**: 2026-06-12 by 哲宇（goal directive）
- **Notes**:
  - **2026-06-17 prose EVOLVE 全弧 ship（twmd-rewrite-daily 18:00 routine）**：5847 CJK / 38 footnote / 8 場景式 H2 / 8 viz / 7 callouts。Stage 0 + Stage 1 雙 gate PASS（99 query / 68 distinct sources / 18 en / 16 一手 / 6 opposition / 55 信度標記）。Falsification-first 抓 8 處錯：「翻書指派」物理動作（first-person 證據薄）→ 改「即興指派」/「Sesame Workshop 1987 親自設計」（時間壓縮 — 1999 才出 ESL 線）/「2019 修法變更次數無限制」（公務員記憶誤，真實是「國語→國家語言」）/「2020 後 Kevin→拼音改名潮」（無 trend，改寫成「加簽護照別名 NT$1,300」）/ 韓國 hagwon 系統性指派（無證據）/ 星巴克全民日常（限都市年輕族群）/「Mary/Kevin top hits 統計」（無 N=1200）/「1988《英文名字大全》ISBN」（改用 1992《英文姓名寶鑑》）。三波命名史 viz：創氏改名 / 1946 漢化 / 兒美班三欄並列。research SSOT `reports/research/2026-06/台灣人小時候的英文名字.md`。
  - **剩餘（pending）**：(1) **🔴 image-health hard=1**（0 圖；length-scaled target 5；非 commit gate）— 補 hero + scene 圖（候選 anchor 見 §圖片來源 placeholder：兒美班教室、芝麻街 1987 NO CHINESE 廣告、外交部拼音對照表、Kolas Yotaka 2024 身分證新聞照、Kwangfu vs Guangfu 路牌）走 REWRITE Step 4.3。(2) **🟡 babel** — zh ship 後 babel-nightly 00:50 會自動 propagate（en/ja/ko/es/fr）。(3) **🟡 Stage 5.2 reverse cross-link** — 補 4 條 sibling（外來語 / 原住民語言復振 / 蔣為文 / 台灣感性）的延伸閱讀。(4) **🟡 Stage 3.6 fan-out** — cron budget defer；A 級大眾文可主動原子重驗 + 順稿 + 視覺同步。(5) **🟡 quote-fidelity 2 warn** — L103 朗文 quote 全形/半形冒號 + L206 漢化字典 quote 用 ⋯⋯ 省略合併（acceptable per ⋯⋯ 標示省略，但 plugin 不認）。(6) 人工審閱（`lastHumanReview` 仍 false）。
- **Reference**: 哲宇 goal notes + reports/research/2026-06/台灣人小時候的英文名字.md + reports/research/2026-06/台灣人小時候的英文名字-section-A.md

### 台灣體育發展與國際賽事 NEW

- **Type**: `NEW`
- **Category**: Society（涵蓋體育政策 + 社會層面）
- **Priority**: `P1`
- **Status**: `prose-shipped-pending-spore-broadcast`（zh ship 2026-06-19 twmd-rewrite-daily routine `6aa840307`，標題收斂為「台灣體育發展與奧運：一個叫『中華台北』的隊伍」）
- **Source**: Issue #915 by tboydar-agent (2026-05-08) — ⚠️ 2026-07-16 inbox-audit：#915 已無法解析（gh GraphQL could not resolve，可能被刪除），issue comment/close hard gate 免除，僅剩 spore broadcast pending
- **2026-06-19 ship 摘要**：4860 CJK / 55 footnote / 4 圖 / 5 場景式 H2（進不去的「台灣」/ 為一首歌重填詞 / 16 年長夜與 15 分鐘雙金 / 升的不是國旗 / 棒球與「中華台北」的縫隙）。Spine 收斂為「中華台北」框架（1976 蒙特婁退賽 → 2024 巴黎升旗），棒球 / 制度 / 個人金牌都是這個 spine 上的 anchor。研究 SSOT `reports/research/2026-06/台灣體育與奧運.md`（51 distinct sources / 5 EN / 10 primary）。Falsification 抓 10 處（楊傳廣 8334 不是 8392 / 蔡溫義 125kg / 嘉農 0:4 / 楊勇緯 2024 NO MEDAL / 李孟遠定向飛靶 / 陳念琴 66kg / 國訓 1976/11 / 體育署 2013 降編 / 紅葉冒名頂替 / CPBL 首場兄弟輸）。Spore #154/#155 blueprint draft broadcast deferred（Chrome MCP image upload blocker 連續第 4 次 cycle）。
- **Notes**:
  - 既有 baseline audit：`Culture/台灣棒球文化.md`（148 行，職業棒球 + CPBL 主軸）/ `Culture/巧固球.md`（小眾運動）/ People 既有運動員 ~10+（戴資穎 / 郭婞淳 / 莊智淵 / 李洋 / 楊勇緯 / 林郁婷 等）— **總覽級「台灣體育發展」是真缺口**
  - 主題 anchors：(1) 體育史（日治時期甲子園 → 戰後三級棒球 → 解嚴後職棒元年 1990 → 2000 後多元化）(2) 重要國際賽事成就（奧運獎牌軌跡：1984 蔡溫義銅 → 2004 雅典陳詩欣朱木炎雙金 → 2020 東京 2 金 4 銀 6 銅創歷史 → 2024 巴黎拳擊金 + 羽球金 + 舉重金）(3) 體育政策（國訓中心 1982 成立 / 黃金計畫 2014 啟動 / 體育署 2013 成立）(4) 職業運動（CPBL / PLG+T1 籃球 / 排球 SPL / 電競）(5) 基層體育與學校運動（HBL / UBA / 全大運）(6) 運動科學與運動醫學發展
  - **必驗事實**（REFLEXES #16 + 讀者級驗證高優先）：
    - 2024 巴黎奧運成績：林郁婷拳擊 57kg 金牌（不是 60kg）/ 李洋 + 麟洋羽球男雙金牌（衛冕）/ 郭婞淳舉重 59kg 銀牌（不是金，需 verify）/ 霹靂舞名次（孫振 4 名 vs 8 名等具體）
    - 2020 東京奧運：總獎牌數 12 面（2 金 4 銀 6 銅）— 各 source 數字一致才採信
    - 黃金計畫：哪一屆奧運週期啟動（2014 仁川亞運後？）+ 預算規模
    - 國訓中心：1982 vs 2002 升格年份、地點（左營）
  - 政治敏感低，但「中華台北」名稱問題、奧運會旗會歌、IPC 籍別等 framing 需小心（per MAINTAINER §爭議處理）
  - cross-link：既有 People 運動員（雙向）+ 台灣棒球文化 + 巧固球 + 台灣教育制度（基層體育）+ 國防現代化（國軍體幹班歷史）
- **Reference**: 體育署 https://www.sa.gov.tw/ / 國訓中心 https://www.nstc.org.tw/ / 中華奧會 https://www.tpenoc.net/ / 維基百科〈中華民國體育〉/ 各專項協會
- **預估時間**：~150 min（NEW Society 深度研究，多 source 必跑奧運成績 cross-check）

### 🗳️ 2026 九合一選舉總章 — 媒體增補 EVOLVE（[A] auto-eligible）

- **Type**: `EVOLVE`（媒體增補，prose 不動）
- **Category**: Politics
- **Path**: [`knowledge/Politics/2026 九合一選舉.md`](../../knowledge/Politics/2026 九合一選舉.md)
- **Priority**: `P1`
- **Status**: `pending`
- **Requested**: 2026-07-10 by elections-refresh session（[reports/elections-2026-refresh-plan-2026-07-10.md](../../reports/elections-2026-refresh-plan-2026-07-10.md) §三之 1）
- **自主權邊界**: `[A]` 可自主
- **Notes**:
  - 現況 7,991 CJK / 0 媒體，`image-health` hard fail（length-scaled 門檻 ≥ 7 媒體）——gate 在文章 ship 後升級，存量被抓
  - 走 REWRITE-PIPELINE Step 1.9.0 深度媒體掃描：候選方向 = 開票唱票現場（Wikimedia Commons PD/CC）、歷史投票所影像（1994 北高民選）、中選會建築、g0v 工具截圖、選舉公報實物
  - **對稱原則注意**：不得使用任何單一現任者/候選人視覺主體的照片；群眾、制度物件、場所優先
  - 授權矩陣三表必跑 + EXIF 清理 + caption 純文字授權標示（prettier CJK URL mangle 陷阱）
- **Reference**: Wikimedia Commons / 中選會官網 / g0v 專案頁

### 🟠 台灣藍鵲 SEO 優化 — #2 排名卻 0 CTR，259 曝光是當前最大流量洩漏點

- **Type**: `EVOLVE`
- **Category**: Nature
- **Path** (EVOLVE only): knowledge/Nature/台灣藍鵲.md
- **Priority**: P1
- **Status**: `pending`
- **Requested**: 2026-06-04 by /twmd-evolve SC scan (session 深度研究-設計研究院)
- **Notes**:
  - **訊號**：SC 7d `台灣藍鵲` impressions 259 / clicks 0 / position 2.02 — 全站 7 日**曝光最高的 opportunity**，排名已在第 2 名卻完全沒人點。
  - **動作判定 🟠 SEO 優化（非 Rewrite）**：文章本體扎實（5147 CJK / 205 行 / 標題已是強標「都市叢林裡的藍色幫派」），品質缺陷維度低 → 不是內容問題。0 CTR 在 position 2 是異常，最可能原因：(a) 野生動物查詢被 Google 圖片包 / 知識面板搶走點擊；(b) meta description / structured data 在 SERP 呈現弱。
  - **必查**：實際搜「台灣藍鵲」看 SERP 長相（是否有 image pack / knowledge panel 卡在我們上面）→ 對症下藥（補 structured data / 改 description / 強化 SERP 縮圖），不要盲目改文章本體。
  - **源信心**：SC 單源強訊號（position+impressions 確定）；per-article GA 在本次 cached export 只有首頁級彙總、無法交叉確認站內行為。DNA #4 雙源未滿足，標記為 SC-primary。
- **Reference**: public/api/dashboard-analytics.json `searchConsole7d.opportunities[0]`

### 日治時期 EVOLVE — 種站第一天出生的裸標題 hub，SC 28d 曝光 1.7 萬次只拿 0.25% CTR

- **Type**: `EVOLVE`
- **Category**: History
- **Path**: knowledge/History/日治時期.md
- **Priority**: `P0`
- **Status**: `pending`
- **Requested**: 2026-07-18 by /twmd-evolve 完整進化 scan (session 2026-07-18-115711-manual)
- **Notes**:
  - **為什麼這篇 vs 其他**：進化分數 ~76，本輪最高。上輪 scan 已把 `台灣日治時期` 留 watch（SC 28d 17,793 impr / CTR 0.25% / pos 7.68，當時 GA 單篇路徑沒對上、雙源未滿足）；本輪 GA 7d `/history/日治時期/` 33 views（全站文章第 12）對上，雙源成立。文章是 2026-03-17 種站第一天出生的初代文：裸標題「日治時期」、百科腔 description（「帶來全面現代化建設與制度化管理」）、1,903 字 / 5 腳註 / healthScore 54 / lastVerified 2026-03-19 是本輪流量榜上最老的一篇。對照同為 History 支柱的近期文（6,000+ 字 / 20+ 腳註），它是「流量最大 × 品質最舊」交集的第一名
  - 圖譜位置：它是 History hub——日治時期文學 / 日治時期社會運動 / 蓬萊米 / 台灣日日新報脈絡都回連它，母頁單薄 = 圖譜結構性洞
  - 政治敏感度中高：殖民現代化 vs 同化政策的雙面性。立體群像 spine（REFLEXES #77）、紀實而不煽情；舊 description 的單面「建設」表述正是要清掉的東西
  - 必驗事實：統治起訖與分期（1895 馬關-1945）、三階段統治政策的學界分期、皇民化運動時點、「殖民現代性」的多方學術觀點（矢內原忠雄以降）
  - CTR 修補跟正文深化一起做：title/description 是洩漏主因（pos 7.68 預期 CTR 2-3%，實際 0.25%），但 hub 本體 1,903 字也該同輪進化，不做半套
- **Reference**: public/api/dashboard-analytics.json（GA 7d topArticles + SC 28d watch-signal 2026-06-04 首記）

### 🟠 彎彎 SEO 優化 — SC 7d 1,363 曝光 CTR 0.81%，第 7 名的位置該有三倍點擊

- **Type**: `EVOLVE`
- **Category**: People
- **Path** (EVOLVE only): knowledge/People/彎彎.md
- **Priority**: `P2`
- **Status**: `pending`
- **Requested**: 2026-07-18 by /twmd-evolve 完整進化 scan (session 2026-07-18-115711-manual)
- **Notes**:
  - **訊號**：SC 7d `彎彎` 1,363 impr / 11 clicks / CTR 0.81% / pos 7.52 — 本輪非品牌人物 query 曝光第 2 高（僅次金城武），pos 7-8 預期 CTR 2-3%
  - **動作判定 🟠 SEO 優化（非 Rewrite）**：文章 2026-06-29 才重寫（7,259 字 / 24 腳註 / healthScore 65），品質維度乾淨，問題在 SERP 呈現層
  - ⚠️ **de-center 紀律**：06-29 重寫時哲宇拍板「私人爭議不做脊椎」（EDITORIAL v6.13）——SEO 調整不得為了 CTR 把爭議放回 title/description。優化方向是把搜尋者真正在找的座標（MSN 時代 / 部落格始祖 / 貼圖）放到 SERP 可見的前段
  - 必查：實搜「彎彎」看 SERP 長相（wiki / 新聞卡 / 圖片包是否壓在上面），對症下藥再動 frontmatter
- **Reference**: public/api/dashboard-analytics.json searchConsole7d.topQueries

<!-- watch-signal（未升 candidate，下次 scan 覆核）：`原住民女歌手` 68 impr / pos 8.62 — 既有 當代原住民創作歌手 / 台灣原住民音樂傳統，可考慮聚焦女性創作者 list（沿上輪）。`周智宣` 100 impr 無專文 = 潛在 NEW，人物 niche 待哲宇判斷敏感度（沿上輪）。2026-07-18 本輪新增：`台灣的道德課去哪了` GA7d 37 views / health 50 / lv 04-25，進化分數 ~50 未過 60 gate（單源 GA、無 SC 訊號）；`退出聯合國` GA7d 37 views / health 57 / lv 05-02，~49 同未過；`MTV包廂` GA7d 27 views / health 41 / lv 05-10，~48——KTV EVOLVE 已在 pending，未來可同波處理包廂娛樂史；`曾博恩` SC7d 972 impr / CTR 0.93% / pos 10.09 — 低 CTR 主因是排名第 10 不是呈現層，health 44 但 9,267 字 51 腳註（分數疑受 lastVerified 05-13 與格式扣分拖累），先觀察。 -->

### 台灣邦交國與國際外交 EVOLVE — 2026 freshness + 英文版 SEO 校準（SC「diplomatic allies 2026」cluster 缺口）

- **Type**: `EVOLVE`
- **Category**: Society
- **Priority**: `P1`
- **Status**: `pending`
- **Source**: 2026-05-23 manual /twmd-evolve — SC 7d opportunities 4-variant cluster 累積 ~875 imp / 0 click
  - **SC 7d opportunities**：`taiwan diplomatic allies 2026` 310 imp / 0 click + `taiwan diplomatic allies list 2026` 137 imp + `taiwan diplomatic allies list current` 117 imp + 其他變體 — 4 變體加總 ~875 imp / **0 click 跨變體**。英文讀者明確查 2026 最新邦交國 list 全部落空
  - **既有 article**：[knowledge/Society/台灣邦交國與國際外交.md](../../knowledge/Society/台灣邦交國與國際外交.md) zh-TW + 英文版 `knowledge/en/Society/taiwan-diplomatic-allies-international-relations.md`（需 verify 英文版存在+ freshness）
  - **既有 spore**：#51/#52 邦交國「12 邦交國 vs 護照進 177 國」護照悖論 D+7 17.3K Threads — Tier 中段 結構性題目 hook 已建立
  - **EVOLVE 目標**：
    1. 確認英文版 article 是否含「2026」latest timestamp + 12 邦交國 current list
    2. frontmatter SEO 加「Taiwan diplomatic allies 2026」「list current」cluster keyword
    3. 文章內 verify「12 邦交國」list per 2026 actual state（教廷 / 巴拉圭 / 海地 / 4 太平洋島國 / 4 加勒比海國 etc）
    4. lastVerified bump 到 2026-05-23 或最新外交事件日期
- **預估時間**：1-2 hr（EVOLVE 校準 + 英文版 sync + frontmatter SEO 優化）
- **Reference**：SC 7d opportunities cluster + spore #51/#52 harvest data + REFLEXES #4 三源驗證（SC + GA + GitHub 三源 conjunction 確認）
- **dev_log**:
  - `2026-05-23 manual (220053)`: /twmd-finale 跑 /twmd-evolve 從 SC 7d opportunities 抓到 cluster → 新 candidate

### 📷 SPORE-INBOX 候選圖片補強 batch — 4 articles missing hero + scene-mid (2026-05-27 spore-publish-daily gate fail)

- **Type**: `EVOLVE`
- **Category**: 多 category 跨 batch
- **Priority**: `P2`
- **Status**: `pending`
- **Requested**: 2026-05-27 by twmd-spore-publish-daily routine (gate-fail: media-richness image < 2 hard)
- **Paths** (4 articles):
  1. [knowledge/History/二二八事件.md](../../knowledge/History/二二八事件.md) — image=0 + footnote=C (need image補 + footnote 升 B 兩個 EVOLVE)
  2. [knowledge/People/曾博恩.md](../../knowledge/People/曾博恩.md) — image=0
  3. [knowledge/People/施振榮.md](../../knowledge/People/施振榮.md) — image=0
  4. [knowledge/Technology/飲料封膜機.md](../../knowledge/Technology/飲料封膜機.md) — image=0
- **Notes**:
  - **失格 gate**: 4 篇皆 image=0 < 2 hard / 二二八另多 footnote 等級 C 需升 ≥ B
  - **補什麼**: 每篇補 hero（Wikimedia CC / 官方公開照 / PD 圖庫）+ ≥1 inline scene-mid 圖（per [REWRITE-PIPELINE §4.3 媒體編織](../pipelines/REWRITE-PIPELINE.md)）；二二八另外 footnote 升級從 inline URL → 正式 [^N] 格式 ≥ 5 個
  - **動機**: SPORE-INBOX 對應 4 entries 等本 articles 進化後重抽進 spore-publish 池
  - **批次 vs 獨立**: 走 batch umbrella 一個 entry — 同類問題不要污染 INBOX 4 條 noise，REWRITE routine 拿到此 entry 可連續 process 4 篇圖片補強任務（搜圖 + Wikimedia attribution + REWRITE Step 1.14 落地）
- **Reference**:
  - SPORE-INBOX entries:「曾博恩 — 旗艦人物 spore」/「施振榮 — 失敗教父 spore」/「二二八事件 — 假歷史反制 REACTIVE spore」/「飲料封膜機 — 趁熱發明史 spore」(SPORE-INBOX §Pending)
  - LESSONS-INBOX 2026-05-27 entry「SPORE-INBOX §Pending 5/15 candidates image gate fail rate ~33%」討論 upstream gap

### 陳嫺靜 EVOLVE — 補 hero 靜態圖（OG 社群卡 / 孢子海報用）

- **Type**: `EVOLVE`
- **Category**: Music
- **Priority**: P3（內文已 ship，純媒體補完）
- **Status**: `pending`
- **Requested**: 2026-06-28 080237-manual（哲宇 directive：先 ship 內文，hero 進 INBOX 補）
- **Notes**:
  - 文章 2026-06-28 ship，內文 5 支官方影片 + tw-timeline 已過媒體數量 gate；缺的是一張靜態圖給 OG 社群卡 / 孢子海報（影片 thumbnail 不可靠）
  - 她沒有任何自由授權照片（Wikimedia / Openverse / Flickr 當天全查過為空）
  - 選項：(a) 顏社 press kit／經紀團隊要授權照　(b) 生一張 on-brand 資料／字體 hero　(c) 金曲／金音典禮若有 CC 授權新聞照
  - frontmatter 補 image + imageCredit + imageLicense + imageSource 後，刪掉本 entry

<!-- ═══ 🟡 P1 — 本月 ═══ -->

### 🩻 早期/貢獻者單薄文章 深度重建 batch — 69 篇低於近期品質基準（2026-07-16 全站審核）

- **Type**: `EVOLVE` batch（umbrella，每篇獨立走 REWRITE-PIPELINE Evolution depth）
- **Category**: 跨 category
- **Priority**: `P1`（batch 整體；⭐ 洪醒夫單篇視同 P0 — SC 全站 #1 query ~2,654 imp/週 落在 697 字 0 腳註 stub 上，SPORE-INBOX 兩條 entry 在等它）
- **Status**: `pending`
- **Requested**: 2026-07-16 by 哲宇 directive（審核早期 >2 個月 / 貢獻者提供、嚴重不符近期品質基準的文章，完整放入 inbox 讓 routine 慢慢消化）— session 2026-07-16-205022-inbox-audit
- **審核基準**: 近期文章（date ≥ 6/01）中位 6,556 字／22 腳註；嚴重門檻 = 字數 < 2,500 且腳註 < 5。完整方法與次一級名單（+185 篇）見 [reports/article-quality-audit-2026-07-16.md](../../reports/article-quality-audit-2026-07-16.md)
- **消化規則**:
  1. 每 session 挑 1-3 篇（Tier A 優先、由上往下），走 REWRITE-PIPELINE Evolution 深度模式（Stage 0 素材萃取起）
  2. Music/People 歸屬密集題先過 attribution audit（cross-ref 上方「早期批次歸屬密集」batch — 那條查歸屬錯，本條補深度）
  3. ship 後：勾掉該行（下次 distill 清除）+ DONE-LOG append per 完成歸檔鐵律
  4. 貢獻者批（C2）保留貢獻者視角與在地細節，可循 #574 素材共創模式回請一手材料
  5. Tier C1 動工前需哲宇拍板（逐篇深化 vs 合併「中職啦啦隊韓援現象」總覽）

**Tier A — 高知名度 × 嚴重單薄（12 篇，優先）**:

- [ ] [洪醒夫](../../knowledge/People/洪醒夫.md) — 697 字／0 腳註／2026-03-27／首作者 idlccp02
- [ ] [何飛鵬](../../knowledge/People/何飛鵬.md) — 1023 字／0 腳註／2026-03-26
- [ ] [葉丙成](../../knowledge/People/葉丙成.md) — 889 字／3 腳註／2026-03-20
- [ ] [江蕙](../../knowledge/People/江蕙.md) — 1592 字／0 腳註／2026-03-28／首作者 idlccp02
- [ ] [陳偉殷](../../knowledge/People/陳偉殷.md) — 1790 字／0 腳註／2026-03-22
- [ ] [李梅樹](../../knowledge/People/李梅樹.md) — 1844 字／0 腳註／2026-03-23
- [ ] [李遠哲](../../knowledge/People/李遠哲.md) — 1892 字／0 腳註／2026-03-21
- [ ] [馬偕](../../knowledge/People/馬偕.md) — 1924 字／0 腳註／2026-03-31／首作者 idlccp1984
- [ ] [PTT批踢踢](../../knowledge/Technology/PTT批踢踢.md) — 1974 字／0 腳註／2026-03-21／首作者 pingu
- [ ] [呂秀蓮](../../knowledge/People/呂秀蓮.md) — 2226 字／0 腳註／2026-03-22
- [ ] [蔡依林](../../knowledge/People/蔡依林.md) — 2258 字／0 腳註／2026-03-24
- [ ] [林懷民](../../knowledge/People/林懷民.md) — 2454 字／0 腳註／2026-03-23

**Tier B — 早期批次單薄（38 篇）**:

- [ ] [黃國珍](../../knowledge/People/黃國珍.md) — 532 字／0 腳註／2026-03-20
- [ ] [朱一貴](../../knowledge/People/朱一貴.md) — 792 字／0 腳註／2026-03-24
- [ ] [湖口營區與勝利路記憶](../../knowledge/History/湖口營區與勝利路記憶.md) — 855 字／0 腳註／2026-03-24
- [ ] [漯底山](../../knowledge/Geography/漯底山.md) — 927 字／0 腳註／2026-03-23
- [ ] [Ray](../../knowledge/People/Ray.md) — 1075 字／0 腳註／2026-03-23
- [ ] [巧固球](../../knowledge/Culture/巧固球.md) — 1260 字／0 腳註／2026-03-27／首作者 idlccp02
- [ ] [台灣鳥類窗殺議題](../../knowledge/Nature/台灣鳥類窗殺議題.md) — 1333 字／0 腳註／2026-03-23
- [ ] [台灣乖乖文化](../../knowledge/Culture/台灣乖乖文化.md) — 1367 字／0 腳註／2026-03-21
- [ ] [台灣動畫代工](../../knowledge/Economy/台灣動畫代工.md) — 1388 字／0 腳註／2026-03-24
- [ ] [擲筊](../../knowledge/Culture/擲筊.md) — 1491 字／0 腳註／2026-03-27／首作者 idlccp02
- [ ] [台灣島嶼博物學](../../knowledge/Nature/台灣島嶼博物學.md) — 1599 字／0 腳註／2026-03-25／首作者 YiChengLu
- [ ] [台灣諧音禁忌文化](../../knowledge/Culture/台灣諧音禁忌文化.md) — 1612 字／0 腳註／2026-03-21
- [ ] [媽祖與大道公的傳說](../../knowledge/Culture/媽祖與大道公的傳說.md) — 1620 字／0 腳註／2026-03-21
- [ ] [台灣醬料與調味](../../knowledge/Food/台灣醬料與調味.md) — 1630 字／0 腳註／2026-03-20
- [ ] [自助餐阿姨的謎之目測精算能力](../../knowledge/Society/自助餐阿姨的謎之目測精算能力.md) — 1727 字／0 腳註／2026-03-22／首作者 So͘ Bîn-hiân
- [ ] [蘭嶼生態系](../../knowledge/Nature/蘭嶼生態系.md) — 1819 字／0 腳註／2026-04-01／首作者 YiChengLu
- [ ] [小綠人](../../knowledge/Lifestyle/小綠人.md) — 1848 字／0 腳註／2026-03-24
- [ ] [生態多樣性](../../knowledge/Nature/生態多樣性.md) — 1851 字／0 腳註／2026-03-21
- [ ] [台灣海鮮文化](../../knowledge/Food/台灣海鮮文化.md) — 1870 字／0 腳註／2026-03-20
- [ ] [台灣現代詩](../../knowledge/Art/台灣現代詩.md) — 1991 字／0 腳註／2026-03-23
- [ ] [林義傑](../../knowledge/People/林義傑.md) — 2005 字／0 腳註／2026-03-22
- [ ] [茶文化](../../knowledge/Food/茶文化.md) — 2090 字／0 腳註／2026-03-23
- [ ] [台灣海洋貿易史](../../knowledge/History/台灣海洋貿易史.md) — 2109 字／0 腳註／2026-03-20
- [ ] [蔣為文](../../knowledge/People/蔣為文.md) — 2131 字／0 腳註／2026-03-23
- [ ] [台灣海岸地形與海洋地景](../../knowledge/Geography/台灣海岸地形與海洋地景.md) — 2139 字／0 腳註／2026-03-24
- [ ] [台灣森林開發史](../../knowledge/History/台灣森林開發史.md) — 2148 字／0 腳註／2026-03-25／首作者 YiChengLu
- [ ] [台灣回收與資源循環文化](../../knowledge/Lifestyle/台灣回收與資源循環文化.md) — 2148 字／0 腳註／2026-03-23
- [ ] [台灣騎樓文化與街景](../../knowledge/Lifestyle/台灣騎樓文化與街景.md) — 2175 字／0 腳註／2026-03-20
- [ ] [台灣數位影像與動畫產業](../../knowledge/Technology/台灣數位影像與動畫產業.md) — 2222 字／0 腳註／2026-03-20
- [ ] [AI人工智慧產業](../../knowledge/Technology/AI人工智慧產業.md) — 2263 字／0 腳註／2026-03-20
- [ ] [台灣中小企業與隱形冠軍](../../knowledge/Economy/台灣中小企業與隱形冠軍.md) — 2314 字／0 腳註／2026-03-24
- [ ] [台灣志工文化與公益參與](../../knowledge/Society/台灣志工文化與公益參與.md) — 2336 字／0 腳註／2026-03-28
- [ ] [台灣環境運動史](../../knowledge/Nature/台灣環境運動史.md) — 2337 字／0 腳註／2026-03-20
- [ ] [台灣迷因](../../knowledge/Culture/台灣迷因.md) — 2382 字／0 腳註／2026-03-24
- [ ] [台灣全齡共融旅遊與生活文化](../../knowledge/Society/台灣全齡共融旅遊與生活文化.md) — 2409 字／0 腳註／2026-03-23
- [ ] [台灣垃圾車音樂](../../knowledge/Lifestyle/台灣垃圾車音樂.md) — 2456 字／0 腳註／2026-03-24
- [ ] [FAB DAO與百岳計畫](../../knowledge/Art/FAB%20DAO與百岳計畫.md) — 2463 字／0 腳註／2026-03-24
- [ ] [台灣素食文化](../../knowledge/Food/台灣素食文化.md) — 2487 字／3 腳註／2026-03-19

**Tier C1 — 2026-05-13 人物 stub 批（11 篇，⏸️ 需哲宇拍板方向）**:

- [ ] [肌肉山山](../../knowledge/People/肌肉山山.md) — 526 字／0 腳註／2026-05-13
- [ ] [朴旻曙](../../knowledge/People/朴旻曙.md) — 578 字／1 腳註／2026-05-13
- [ ] [邊荷律](../../knowledge/People/邊荷律.md) — 769 字／1 腳註／2026-05-13
- [ ] [南珉貞](../../knowledge/People/南珉貞.md) — 815 字／1 腳註／2026-05-13
- [ ] [安芝儇](../../knowledge/People/安芝儇.md) — 696 字／2 腳註／2026-05-13
- [ ] [李雅英](../../knowledge/People/李雅英.md) — 895 字／1 腳註／2026-05-13
- [ ] [李珠珢](../../knowledge/People/李珠珢.md) — 962 字／1 腳註／2026-05-13
- [ ] [李晧禎](../../knowledge/People/李晧禎.md) — 874 字／2 腳註／2026-05-13
- [ ] [李多慧](../../knowledge/People/李多慧.md) — 1278 字／1 腳註／2026-05-13
- [ ] [金針菇](../../knowledge/People/金針菇.md) — 1009 字／3 腳註／2026-05-13
- [ ] [朴星垠](../../knowledge/People/朴星垠.md) — 866 字／4 腳註／2026-05-13

**Tier C2 — 台南小吃貢獻者批（jinnshuchang 7/02，4 篇，素材共創候選）**:

- [ ] [豬心冬粉](../../knowledge/Food/豬心冬粉.md) — 1309 字／0 腳註／2026-07-02／首作者 jinnshuchang
- [ ] [虱目魚粥](../../knowledge/Food/虱目魚粥.md) — 1402 字／0 腳註／2026-07-02／首作者 jinnshuchang
- [ ] [牛肉湯](../../knowledge/Food/牛肉湯.md) — 1468 字／0 腳註／2026-07-02／首作者 jinnshuchang
- [ ] [鱔魚意麵](../../knowledge/Food/鱔魚意麵.md) — 1473 字／0 腳註／2026-07-02／首作者 jinnshuchang

**Tier C3 — 台灣企業早期薄檔（4 篇，併 series 深化節奏）**:

- [ ] [台灣企業：日月光半導體](../../knowledge/Economy/台灣企業：日月光半導體.md) — 2179 字／0 腳註／2026-03-21／首作者 ?
- [ ] [台灣企業：長榮海運](../../knowledge/Economy/台灣企業：長榮海運.md) — 2219 字／0 腳註／2026-03-24／首作者 ?
- [ ] [台灣企業：廣達電腦](../../knowledge/Economy/台灣企業：廣達電腦.md) — 2311 字／0 腳註／2026-03-21／首作者 ?
- [ ] [台灣企業：聯發科技](../../knowledge/Economy/台灣企業：聯發科技.md) — 2486 字／0 腳註／2026-03-25／首作者 ?

### 台灣各大技術 Conference NEW — 從 COSCUP 到 g0v，開源島嶼的年度遷徙

- **Type**: `NEW`
- **Category**: Technology
- **Priority**: `P1`（2026-07-16 inbox-audit 升級：COSCUP 慣例在 7 月底/8 月初舉辦，會前 ship 有天然時效 hook + Taiwan.md 現場曝光潛力 — 動工前先查 COSCUP 2026 實際日期）
- **Status**: `pending`
- **Requested**: 2026-06-12 by 哲宇（goal directive）
- **Notes**:
  - 範圍：COSCUP / PyCon TW / JSDC / MOPCON / g0v summit / SITCON / HITCON / DevOpsDays Taipei 等，志工自辦文化是核心張力（多數無公司主辦、靠社群志工 20 年不斷線）
  - 切角候選：SITCON 學生自辦的世代傳承、HITCON 與台灣資安人才庫、COSCUP 與開源社群的關係
  - 對 Taiwan.md 自身有策略意義：這些 conference 是潛在盟友與貢獻者池（PARTNERSHIP-INBOX 關聯）
  - 必驗事實：各 conference 創辦年份與規模數字
- **Reference**: 哲宇 goal notes

### 明鄭與荷西沙漠補文系列 NEW（時間台灣頁揭露的分期缺口）

- **Type**: `NEW`（series，4 條候選拆票）
- **Category**: History / People
- **Priority**: `P1`
- **Status**: `pending`
- **Requested**: 2026-07-16 by compassionate-kirch session（時間台灣頁內容盤點）
- **Notes**:
  - 時間台灣頁（/timeline）內容盤點揭露：**明鄭 1662-1683 是全站唯一沒有獨立條目的時代**（僅共用的荷西明鄭時期＋鄭成功人物頁）；荷西 1624-1662 也薄（無熱蘭遮城 / VOC / 西班牙北台灣獨立條目）。頁上沙漠註記已公開對讀者承認缺口
  - 候選（依價值排序）：(1) 東寧王國（制度＋陳永華，補明鄭主幹）(2) 熱蘭遮城（荷蘭時代最強物件錨點，考古＋圍城戰）(3) 施琅（澎湖海戰＋台灣棄留疏——「棄留」辯論是島史觀絕佳素材）(4) 西班牙北台灣十六年（聖薩爾瓦多城考古）
  - ship 後把 slug 加進 `src/data/timeline-eras.json` 對應時代（tungning / age-of-sail），沙漠註記可視覆蓋度調整措辭
  - cross-link：[荷西明鄭時期] / [鄭成功] / [台灣海洋貿易史] / [福爾摩沙] / [台灣島史觀]
- **Reference**: reports/timeline-page-design-2026-07-16.md §四（內容盤點）＋ memory/2026-07-16-154753-compassionate-kirch.md handoff

### 台灣 LGBTQ+ 平權 EVOLVE（PR #726 merged 後深度重寫 — Stage 1 研究已完成，可直接接 Stage 2）

- **Type**: `EVOLVE`
- **Category**: Society
- **Priority**: `P1`（2026-07-16 inbox-audit 降級：重要非緊急；Stage 1 研究 2026-05-07 已落檔 `reports/research/2026-05/lgbtq-taiwan.md`，邊際成本低，適合下一個有品質預算的 write session 直接接 Stage 2。原 in-progress 自 2026-05-07 閒置 2 個月，重設 pending）
- **Status**: `pending`
- **Source**: 哲宇 2026-04-30 δ session 觸發；對應 [knowledge/Society/LGBTQ.md](../../knowledge/Society/LGBTQ.md)（PR #726 idlccp1984 NEW Manus AI batch 已 merge polish 版）
- **目前 baseline**：69 行 / 13 footnotes / 涵蓋祁家威 1986 → 葉永鋕 2000 → 畢安生 2016 → 釋字 748（2017）→ 同婚專法（2019）→ 共同收養（2023）→ 跨國同婚函釋（2023）→ 人工生殖法草案（2025）→ 崴崴孟孟世代
- **EVOLVE 目標**（下個 session 走 REWRITE-PIPELINE Stage 0-6 完整深度）：
  - Stage 1 deep research 20+ web search（人工生殖法立法院最新審議進度 / 跨國親子權益判決 / 反歧視立法 / 跨性別權益 / 校園與職場性別平等實務 / 同志諮詢熱線等 NGO 工作 / 同志大遊行歷年規模與訴求演進 / 國際 DEI 浪潮台灣回應）
  - Stage 1.7 媒體素材：彩虹遊行歷年照片（CC 授權 or 連結至遊行官方主視覺）/ 釋字 748 公布當日畫面 / 葉永鋕紀念元素
  - Stage 2 結構：核心矛盾「亞洲首部同婚專法 × 仍待延伸的法律與生活權益」/ 物件開頭（祁家威或某具體人物的場景）/ 七爪結構分配
  - Stage 3 §11 polish（baseline 4 violations 應壓到 0-1）+ Stage 3.5 hallucination audit（特別 verify「3 萬 2126 對 / 504 跨國」「2025-12 行政院通過人工生殖法草案」「葉永鋕高樹國中 2000」三項精確數字）
  - Stage 3.6 STORY ATOM AUDIT（畢安生「墜樓身亡」/ 祁家威「1986 立法院請願」/ 釋字「2017-05-24」皆需逐項對 source URL Ctrl-F）
  - 處理「崴崴孟孟」段落的策展抉擇：是否核心人物？篇幅占比？對比其他需被看見的世代代表（祁家威 / 葉永鋕母親陳君汝 / 同志諮詢熱線）
  - Stage 5 cross-link：與葉永鋕 / 性別平等教育法 / 祁家威 / 台灣大法官釋憲制度 / 同志大遊行等做雙向連結
- **預估**：XL（>2000 行 research，>10 hr 工作量；可分兩次 session）
- **dev_log**：
  - `2026-05-07 δ(manual)`: Stage 0 事實萃取完成；Stage 1 共 22 queries，研究報告 → `reports/research/2026-05/lgbtq-taiwan.md`；核心矛盾定錨「亞洲首部同婚專法 × 仍在爭取的完整平等」；Stage 2 待下次 session 執行
- **Notes**：
  - 政治敏感主題，遵循 MAINTAINER §爭議處理原則
  - 國際讀者（en/ja/ko）對台灣同婚有興趣，EVOLVE 完成後優先翻譯
  - 相關鄰近題：「跨性別權益」可能拆出獨立條目

### 台灣新媒體藝術（EVOLVE — 事實錯誤已修，剩完整 Stage 1 深度重寫 + 南方視角補位）

- **Type**: `EVOLVE`
- **Category**: Art
- **Path**: knowledge/Art/台灣新媒體藝術.md
- **Priority**: `P1`（2026-07-16 inbox-audit 降級：兩個歸功錯誤 2026-04-23 已修掉急迫性，剩深度重寫屬重要非緊急；原 in-progress 自 2026-04-22 閒置近 3 個月，重設 pending）
- **Status**: `pending`
- **合併註記（2026-07-16）**: 原獨立 entry「台灣新媒體藝術的南方視角」（NML P2 #5 / series G-1，P3）併入本 entry — EVOLVE 時一併補「南方視角 / 群島 lens」章節，素材：NML 60 篇 Image category articles + 區秀詒 / Hoo Fan Chon / Mark Teh 訪談（reports/NML-semiont-analysis-2026-05-04.md §Part 6 P2-18）
- **Requested**: 2026-04-22 by 觀察者 (session β) — PR #590 王福瑞生年補充觸發事實查核，發現更大的歸功錯誤
- **Notes**:
  - **已檢出兩個事實錯誤（必修）：**
    1. 原文「1995 年，他（王福瑞）創辦『在地實驗』（Etat）」→ **錯**。在地實驗是**黃文浩**於 1995 年創辦，王福瑞 2000 年才加入（佐證：Etat FB 粉專 ETAT1995 / TCAA 藝術家資料庫 / 文化部活動頁）
    2. 原文「他策劃的『失聲祭』系列自 2007 年起運作」→ **錯**。失聲祭 2007 年 7 月由**姚仲涵**與北藝大新媒系同儕（王仲堃、葉廷皓、牛俊強）創立。王福瑞是他們的老師 / 精神指導，不是策劃者
  - **已驗證正確事實**：王福瑞 1969 年生台北、Golden Gate University 資工碩士、1993 年創辦 Noise 實驗音樂廠牌
  - **必查其他宣稱**：袁廣鳴生年（1965）/ 陳界仁生年（1960）/ 各代表作年份 / 台北市立美術館威尼斯雙年展策展起始年（1995）/ 陳界仁《魂魄暴亂》年份（1996-1999）
  - **敏感度**：新媒體藝術家圈子小，錯誤歸功會直接得罪當事人（黃文浩、姚仲涵）— 這篇必須查到底
  - **方向補位**：現有條目 SSODT 單向（只寫菁英藝術家），需補「地下 / 民間 / 工具民主化」視角（VJ 文化、開源硬體社群、Raspberry Pi makerspace 等）
  - **血緣連結**：[[People/王福瑞]]（待建 or 檢查存在）/ [[People/黃文浩]]（同）/ [[People/姚仲涵]]（同）/ [[Art/聲音藝術]]（待建）/ [[Technology/台灣獨立遊戲]]
- **Reference**:
  - PR #590: <https://github.com/frank890417/taiwan-md/pull/590>
  - Etat 官方 FB: <https://www.facebook.com/ETAT1995/>
  - TCAA 王福瑞: <https://tcaaarchive.org/Artist/Detail/1235>
  - ART PRESS 王福瑞專訪（2020）: <https://theartpressasia.com/2020/12/02/about-experimental-sound-theres-no-playlist-interview-with-sound-artist-wang-fujui/>
  - 失聲祭官網: <http://lsf-taiwan.blogspot.com/>
  - 北藝大新媒系王福瑞頁: <https://nma.tnua.edu.tw/faculty/fulltime/ukGokGMjud>
- **Pre-research**: 尚未建 reports/research/2026-04/台灣新媒體藝術.md（由 Stage 1 agent 建）
- **Dev log**:
  - 2026-04-23 α（heartbeat）：Stage 0 事實修正執行——王福瑞段落兩個歸功錯誤已訂正（在地實驗創辦人改為黃文浩；失聲祭創辦人改為姚仲涵 + 北藝大同儕），footnote [^13][^14] 補齊，sync 完成。Stage 1 完整研究尚待後續 session。

### 許倬雲 EVOLVE — 補家族譜系（王力宏母系）+ 大歷史方法論深化

- **Type**: `EVOLVE`
- **Category**: People（subcategory: 歷史學者）
- **Path**: knowledge/People/許倬雲.md（現有 145 行 / 11.7K chars / 10 H2 — 相對 People deep-dive 平均 ~250 行偏薄）
- **Priority**: `P1`
- **Status**: `pending`
- **Source**: 2026-05-17 twmd-news-lens-weekly /twmd-evolve — SC 7d opportunities top 3 cluster「hsu cho-yun」×「wang leehom」累積 ~2954 imp / 0 click，是本週 SC opportunities 最大未滿足 gap
- **Evolve scan source pointers**：
  - **SC 7d opportunities**：`"hsu cho-yun" "wang leehom"` 1561 imp / 0 click（#1） + `"wang leehom" "hsu cho-yun"` 1103 imp / 0 click（#2） + `"cho-yun hsu" "wang leehom"` 290 imp / 0 click（#7） — 三變體加總 ~2954 imp / **0 click 跨變體**。引號搜尋語意 = 英語讀者明確查「兩人關係」（外甥孫 / great-nephew via marriage），全部落空
  - **GA 28d**：許倬雲 path 未進 top 30 7d 列表（不在 amplification 直接受益 page），但 SC 顯示 demand 累積在英文圈 — 文章 zh-only + 缺王力宏 framing 雙重摩擦
  - **既有 article state**：145 行 / 11.7K chars / 10 H2，僅 §2024 唐獎段落 inline 引王力宏悼文（「他是九個兄弟姊妹中的第七個...」）但 (a) frontmatter description 完全不提王力宏 → SERP snippet 無法 match SC query 意圖 (b) 家族譜系（姊姊許婉清是王力宏外婆）零展開 (c) 著作清單僅參考資料末段點名 6 部，缺策展性導讀
  - **GitHub feedback**：無 open issue 直接點名，但 #1063 audit 提及高度重複文章合併建議 — 許倬雲 vs 其他歷史學者類別 cross-link 密度待補
- **為什麼這篇 vs 其他**（per EVOLVE-PIPELINE Phase 5 ENRICH）：
  - vs 聶永真 EVOLVE 候選（SC 學歷 cluster 1320 imp / 1.3% CTR）— 聶永真 article 2026-05-08 才 ship（9 天）+ 34K chars 已深，主要缺口在 description SEO（學歷 + AGI keyword 加進去），規模 = cosmetic heal commit 不需 EVOLVE entry
  - vs 蘋果西打（GA #1 207 users）— 2026-05-11 才 ship（6 天）+ 31K chars，#1 流量是 launch + 社群引流 signal，**新文章高熱 ≠ EVOLVE 候選**（per REFLEXES #38 status 設計鐵律：fresh 與 stale 是不同維度）
  - vs 紀政（SC 11.54% CTR pos 5.7）— 紀政 article 雖 7 H2 偏薄，但 CTR 已健康，下次 evolve cycle 再評
  - vs 「張懸被關地下室」508 imp 1.57% CTR — 既有 [張懸與安溥](../../knowledge/Music/張懸與安溥.md) 已 cover 該事件（2008 海外維權誤傳 vs 2014 太陽花真實參與），signal 屬讀者 fact-check 旅程而非 article gap
  - **許倬雲是唯一同時滿足「既有 article 偏薄 + SC opportunities top 3 cluster + 跨語言 demand 缺 SEO 橋」三條件的本週新發現**
  - Sovereignty preservation lens（per MANIFESTO §主權的巴別塔）：英文圈查「Hsu Cho-yun Wang Leehom」反映外籍漢學圈 + 海外華人對台灣出身史學家家族脈絡的 demand，當前 Taiwan.md 沉默 = 留給維基百科 / 中國視角 source 接管 framing
- **Notes**：
  - 既有 baseline audit（Stage 0 必跑）：完整 Read 現有 145 行確認哪些段落保留 / 哪些補深度，特別 §2024 唐獎引王力宏悼文段落要擴成獨立 H2（家族譜系 / 母系王家）
  - **核心 facts to verify**（三源驗證 per REFLEXES #16）：
    - 許倬雲 1930 年生於江蘇無錫 / 2025-08-03 美國辭世 享壽 95 歲 — 多源 cross
    - 先天性肌肉萎縮症具體名稱（醫學病名）+ 童年抗戰流亡細節
    - 姊姊許婉清 → 王力宏母親許自琪 → 王力宏 三代脈絡（王力宏自承「外甥孫」措辭精確性）
    - 匹茲堡大學任教年份（1970 起？）+ 中研院院士當選年（1980？）
    - 唐獎漢學獎 2024 年屆別（第六屆？）+ 同屆其他得主
    - 著作出版年份 + 出版社（《西周史》《漢代農業》《我者與他者》《萬古江河》《美國六十年滄桑》）
    - 「兩根手指打字」具體影片 / 訪談 verbatim source
  - **核心矛盾候選**（Stage 0 §觀點成型，≤ 30 字）：
    - A.「肉體幾乎被疾病奪走的人，用兩指寫出一條中國史的長河」
    - B.「從無錫流亡到匹茲堡的史學家，把中國放回世界史看」
    - C.「九五歲辭世後，外甥孫王力宏的悼文讓他被新世代讀者認識」
  - **Title 三明治候選**：
    - 「許倬雲：兩根手指寫出《萬古江河》，從中國放回世界看的史學長河」
    - 「許倬雲（1930-2025）：肌肉萎縮的史學大師，王力宏的舅公，最後一位大歷史寫作者」
  - **EVOLVE 目標長度**：~25K-30K chars（從 11.7K 翻倍以上）+ 補 §家族譜系 + §匹茲堡學派 + §著作策展性導讀 三個新 H2
  - **frontmatter description 必改**：加入「外甥孫王力宏」+ 「Hsu Cho-yun」英文姓名拼音 → SC snippet match 「hsu cho-yun wang leehom」cluster
  - **政治敏感性**：中（兩岸學術橋樑 framing 需小心，per MAINTAINER §爭情處理 — 許倬雲晚年「中國中心論的批判」+「我者與他者」可作為超越單一政治立場的史學方法 anchor）
  - **跨類別 cross-link 候選**（雙向）：
    - 既有 `knowledge/People/許倬雲.md` ⇄ 王力宏文章（若無 → 可作 Music cluster spawning anchor）
    - `knowledge/Music/` 王力宏 family tree references（如〈龍的傳人〉作者王力宏父親王大中也是學者）
    - `knowledge/People/` 同代史學家（杜維明 / 余英時 / 林毓生）— 海外華裔史學圈三源比對
    - `knowledge/History/` 章節 cite — 大歷史方法論可成為其他 History article 的 framing reference
  - **翻譯優先**：SC demand 英語圈強烈，EVOLVE 完成後優先翻 en（修補 0 click → 至少 1-2% CTR），ja/ko 次之
- **Reference**:
  - SC 7d opportunities cluster（dashboard-analytics.json 2026-05-16 snapshot）
  - 既有 article 參考資料：唐獎漢學獎、聯合新聞網 95 歲辭世訃聞、王力宏悼文、UDN 史學巨擘訃聞、Pitt History Dept 一手
  - 補強 source 候選：中研院史語所訃聞 / 匹茲堡大學退休教授頁面 / 王力宏 IG 悼文原始 post / 《十三邀》訪談 verbatim（許倬雲對許知遠談話完整紀錄）
- **預估時間**：~120 min（既有 11.7K baseline 起點 + Stage 1 deep research 30-40 min ≥ 20 search + Stage 2 寫作 50 min 補三段 + Stage 3-5 verify + ship 20 min）

### 台灣節慶與年度行事曆系列 — EVOLVE + NEW 混合

- **Type**: `EVOLVE` 主檔 + `NEW` 個別節慶（混合 scope）
- **Category**: Culture
- **Priority**: `P1`（2026-07-16 inbox-audit 降級：agent 建議 evergreen 非緊急；閒置 2 個月）
- **Status**: `pending`
- **Source**: Issue #939 by tboydar-agent (2026-05-09) — ⚠️ 2026-07-16 audit：#939 已無法解析（可能被刪），issue comment hard gate 免除
- **Notes**:
  - 既有 baseline audit（Stage 0 第一動作再 ls 全 grep 確認）：
    - `Culture/傳統節慶與慶典.md`（198 行，「進化」策展角度，hook 鹽水蜂炮 + 大甲媽祖遶境）→ EVOLVE 補年度行事曆視覺 + cross-link 個別節慶 + 補農曆/國曆對照表
    - `Culture/台灣廟會與陣頭文化.md` / `Culture/媽祖與大道公的傳說.md` / `Culture/台灣婚喪喜慶與人生禮俗.md` / `Culture/台灣製香文化與香腳原鄉.md` 已涵蓋部分節慶相關民俗 → cross-link 不重寫
  - issue 提案 5-8 篇個別節慶（春節 / 元宵 / 端午 / 中元 / 中秋）— Stage 0 audit 後評估哪幾個是真缺口、哪幾個 cross-link 既有即可
  - **建議 P0 scope（Stage 0 後再校準）**：(a) 主檔 EVOLVE 補年度行事曆 + 4 大節慶 + 跨類別連結 (b) 1-2 篇個別節慶 NEW（候選：平溪天燈 / 王船祭 / 炸寒單 — 既有覆蓋度低）。其餘個別節慶降為 P1 拆票
  - 必驗事實：(a) 鹽水蜂炮起源 1885 vs 其他說法 (b) 大甲媽祖遶境 9 天 8 夜路線總長（300 km vs 340 km 各源不同）(c) 平溪天燈起源（清領 vs 日治時期）+ 現代化年代 (d) 王船祭三年一科（東港 / 西港 / 蘇厝 / 麻豆）哪個是 UNESCO 候選 (e) 國定假日的法源（內政部 vs 文化部公告）
  - Framing：策展性「節慶演化史」frame（接續主檔已有 hook），不是百科式行事曆條列
  - 國際翻譯優先：日韓旅客是節慶觀光主受眾，EVOLVE 完成後優先翻 ja/ko
- **Reference**: 觀光局年曆 https://www.taiwan.net.tw/ / 文化部 https://www.moc.gov.tw/ / 各地方政府觀光網站 / 文化部國家文化資產網
- **預估時間**：主檔 EVOLVE ~120 min（含年度行事曆視覺設計）+ 1-2 個別節慶 NEW × 90 min = 共 ~5 hr，可拆 2-3 session

### 台灣經典街頭小吃系列 NEW（6 篇候選）

- **Type**: `NEW` × N（系列 umbrella，每篇獨立 ship）
- **Category**: Food
- **Priority**: `P1`（2026-07-16 inbox-audit 降級：agent 建議的 evergreen 系列非緊急時效，P0 保留給哲宇點名與時效題；刈包已 ship 5/16 後閒置 2 個月）
- **Status**: `pending`
- **Source**: Issue #1013 by tboydar-agent (2026-05-10) — ⚠️ 2026-07-16 audit：#1013 已無法解析（可能被刪），issue comment hard gate 免除
- **Notes**:
  - **高優先（國際知名度高）**：~~(1) 刈包（Gua Bao / 虎咬豬）— 台式漢堡、CNN / Netflix 國際媒體報導~~ ✅ 已完成 2026-05-16 twmd-rewrite-daily → ARTICLE-DONE-LOG.md (2) 大腸包小腸 — 夜市經典、糯米腸夾香腸 (3) 愛玉 — 台灣原生植物、消暑文化代表、植物膠凝獨特性
  - **中優先（文化代表性強）**：(4) 潤餅 — 清明節傳統、閩南文化連結 (5) 甜不辣 — 台式天婦羅、日本演變 (6) 挫冰 / 雪花冰 — 雖有「台灣冰品文化」綜述但缺獨立專文
  - 既有 baseline audit（Stage 0 必跑）：`ls knowledge/Food/ | grep -E "刈包|大腸|愛玉|潤餅|甜不辣|挫冰"` 確認哪些已有部分覆蓋 / 哪些是真缺口
  - 國際 SEO 切入：「taiwan gua bao」「taiwan shaved ice」「ai-yu jelly」等英文長尾 query 容易撐起獨立 article 的入口流量
  - cross-link：[台灣夜市](/food/台灣夜市) / [台灣小吃](/food/) / 既有食材文章
- **Reference**: Issue #1013 + 既有 Food/ 40+ 篇盤點
- **預估時間**：每篇 NEW Food 60-90 min × 6 = ~7-9 hr，可拆 4-6 session 接力（高優先 3 篇先走）

### 台灣知名景點與旅遊地標系列 NEW（7 篇候選）

- **Type**: `NEW` × N（系列 umbrella，每篇獨立 ship）
- **Category**: Geography 主軸 + Lifestyle / History 視角混合
- **Priority**: `P1`（2026-07-16 inbox-audit 降級：同 #1013 系列理由 — evergreen 非緊急）
- **Status**: `pending`
- **Source**: Issue #1014 by tboydar-agent (2026-05-10) — ⚠️ 2026-07-16 audit：#1014 已無法解析（可能被刪），issue comment hard gate 免除
- **Notes**:
  - **高優先（國際知名度最高）**：(1) 阿里山 — 僅 History《阿里山：帝國的林場與高一生的山》簡略提及，缺地理 / 旅遊獨立專文 (2) 九份 — 國際必訪、黃金山城、宮崎駿《神隱少女》傳說 (3) 墾丁 — 海濱度假地、國家公園、衝浪文化
  - **中優先（文化或地景獨特）**：(4) 太魯閣國家公園 — 世界級峽谷、雖有「台灣國家公園」綜述但無獨立專文 (5) 平溪天燈 — 國際知名意象、元宵節傳統 (6) 蘭嶼 — 達悟族文化、僅 Nature 簡略生態 (7) 綠島 — 白色恐怖歷史 + 監獄文化 + 潛水勝地（雙視角）
  - 既有 baseline audit：`ls knowledge/Geography/ knowledge/Lifestyle/ knowledge/History/ | grep -E "阿里山|九份|墾丁|太魯閣|平溪|蘭嶼|綠島"` 確認重疊度
  - Geography 偏自然地理但這系列含**人文景點**視角 — 部分篇可能歸 Lifestyle（旅遊）或 History（如綠島白色恐怖層）
  - cross-link：[台灣國家公園](/geography/) / [日治時期](/history/) / [台灣原住民族16族文化地圖](/culture/)
- **Reference**: Issue #1014 + 國際旅遊讀者 SEO（「taiwan must visit」「jiufen taiwan」）
- **預估時間**：每篇 NEW 90-120 min × 7 = ~10-14 hr，可拆 6-8 session 接力

### 台灣新興文化現象系列 NEW（5 篇候選）

- **Type**: `NEW` × N（系列 umbrella，每篇獨立 ship）
- **Category**: Culture 主軸 + Society / Economy 視角混合
- **Priority**: `P1`（2026-07-16 inbox-audit 降級：同 #1013 系列理由 — evergreen 非緊急）
- **Status**: `pending`
- **Source**: Issue #1015 by tboydar-agent (2026-05-10) — ⚠️ 2026-07-16 audit：#1015 已無法解析（可能被刪），issue comment hard gate 免除
- **Notes**:
  - **高優先（已成主流文化）**：(1) 台灣 Podcast 文化 — 2018 爆發成長、百靈果 / 股癌 / 台灣通勤第一品牌、知識傳播管道 (2) 台灣露營文化 — 疫情後爆紅、戶外產業、車宿、露營經濟
  - **中優先（快速成長中）**：(3) 台灣密室逃脫 / 劇本殺 — 年輕人社交、台北擴散全台 (4) 台灣健身文化與健身房產業 — 連鎖健身房、CrossFit、瑜珈 (5) 台灣二手市集與環保購物 — 永續生活、零浪費商店
  - 既有 baseline audit：`ls knowledge/Culture/ knowledge/Lifestyle/ knowledge/Economy/ | grep -E "Podcast|露營|健身|二手|密室"` 確認缺口
  - 反映當代台灣是核心 framing（現有 Culture 偏傳統與歷史）— 跟 [台灣 YouTuber 產業與文化](/culture/) [台灣新偶像世代](/culture/) 形成「當代年輕世代文化」cluster
  - cross-link：既有 [數位廣告產業](/economy/) / [台灣 YouTuber 產業](/culture/)
- **Reference**: Issue #1015 + 當代文化動態紀錄價值
- **預估時間**：每篇 NEW 90-150 min × 5 = ~8-12 hr（Podcast / 露營兩篇可能 deeper，需 verify 主要 podcaster / 產業規模 / 露營營地數量等具體 stats）

### 🏘️ 歷史街區系列 NEW（P0/P1）— 共通說明

> **完整規劃 + 模板 + 共通 caveats**：見 [reports/historic-districts-series-planning-2026-05-21.md](../../reports/historic-districts-series-planning-2026-05-21.md)
>
> 歷史街區補 sub-unit deep dive 層 — 22 縣市 panorama + 老街文化主檔 catalog 之間的中間層。每篇單一街區 4500-6500 CJK / 15-25 footnotes / ≥ 5 圖。共通模板 7 H2（凌晨四點時刻 / 名字考據 / 街成形時刻 / 軸線 / 物質層 / 在地人 3 個地方 / 收尾），pilot 後 retrospective enrich（per 22 縣市基隆 pilot pattern）。
>
> **第一批 batch**：台北 12 條（P0×4 / P1×4 / P2×4，本批次寫入）。其他縣市 ~70-110 條等台北 pilot 完才 populate（per 哲宇 2026-05-21 directive）。
>
> **Scope 邊界**（per 哲宇 2026-05-21 拍板，寬鬆版）：
>
> - ✅ 清領以前成形（艋舺 / 大稻埕 / 大龍峒）
> - ✅ 日治規劃成形（西門町 / 永康街昭和町 / 中山北路敕使街道 / 北投溫泉街）
> - ✅ 戰後特定時代標誌（眷村四四南村 / 條通文化 / 牯嶺街舊書街 / 寶藏巖違建轉藝術村）
> - ❌ 2000 年後純商業重劃區（信義計畫區 / 內湖科技園 — 留給「新興街區」另一個 spec 的系列）
>
> **共通 research caveats**（每篇都要注意，per reports §4）：
>
> - 街成形 vs 建築 vs 政治事件年份三源驗證（per REFLEXES #16）
> - 地名變更跨時代分清楚（萬華 vs 艋舺 / 大稻埕 vs 大同區）
> - 凱達格蘭等原住民先住歷史不被漢人開拓敘事覆蓋
> - 眷村 + 戒嚴期商圈 + 廢娼歷史紀實而不煽情（per REFLEXES #28）
> - 觀光手冊塑膠句禁區嚴守（「歷史悠久」「IG 打卡」「在地人必訪」一律刪 / per EDITORIAL）
> - 對位句型 ≤ 3 處 / 篇、破折號連用 ≤ 15 / 1500 字（per MANIFESTO §11）
> - 物質層用具體建築 + 招牌 + 食物當證據，不用形容詞
> - cross-link：縣市 panorama / 老街主檔（雙向）/ ≥ 2 同期事件 article / ≥ 1 sibling 街區
>
> **跟既有檔案的關係**：
>
> - [Geography/台北市.md](../../knowledge/Geography/台北市.md) 12 區 panorama 保留，新系列補 sub-unit
> - [Culture/台灣老街文化與商業街區.md](../../knowledge/Culture/台灣老街文化與商業街區.md) catalog 保留，新系列補 deep dive（雙向 cross-link）
> - 22 縣市系列（已 ship）panorama / 街區系列 deep dive — 兩者垂直互補
>
> **Pilot 候選**：大稻埕（最 obvious P0 + thick history test）。pilot 完跑 retrospective 校準共通 caveats 再啟動其他 11 條。

<!-- ═══ ⏸️ 待哲宇拍板（observer-gated）═══ -->

### 🗳️ 2026 九合一選舉系列 — 共通說明 + 自主權邊界 + 對稱原則

> **完整 proposal**：[reports/2026-election-evolution-proposal-2026-05-27.md](../../reports/2026-election-evolution-proposal-2026-05-27.md)（11 條提案分 4 Tier / 三道濾網 self-apply / 風險清單）
>
> **哲宇 directive 2026-05-27**：「深度研究 2026 中華民國直轄市長及縣市長選舉，思考 Taiwan.md 完整專案有什麼能夠針對這個領域主題做進化，與最大程度幫助到這個社會民主、透明與資訊品質的方式。文章類的幫我全部一個一個放到 article-inbox。」
>
> 本系列分 4 個 sub-entry（下方 4 個 `###`）按 [MANIFESTO §自主權邊界](MANIFESTO.md#我的存在結構) 自主權判定排序：1.1 [A] 可自主 → 1.4 [A] 可自主 → 1.2 [B] 需哲宇 nod → 1.3 [C] 哲宇 hard 拍板每篇。
>
> **共通鐵律（5 條，每篇 ship 前必過）**：
>
> 1. **對稱原則**：寫 candidate A 就一起寫 candidate B / 全 22 縣市對手都寫，不寫部分 — 不對稱 = endorsement signal。1.3 候選人系列若哲宇只 pick 部分，必須在文章 footer 明示「本系列尚未涵蓋 {對手姓名}，會持續補完」。
> 2. **制度層為主**：「觀點」鎖在制度／歷史／方法層（為什麼這個制度值得珍惜 / 民主轉型不容易 / 透明度為什麼重要），**不下放到 candidate-level / policy-stance-level**。
> 3. **選前 30 天 spore freeze**（2026-10-29 → 11-28）：禁止發任何 candidate-specific 孢子，避免選前 viral 期被讀為背書。寫進 [SPORE-PIPELINE](../factory/SPORE-PIPELINE.md) hard gate（待 ship 後加 plugin enforce）。
> 4. **AI deepfake 防禦**：選舉相關文章 + 孢子皆走 [REWRITE-PIPELINE Stage 3.5 全文幻覺審計](../pipelines/REWRITE-STAGE-3-VERIFY.md#stage-35-hallucination-audit) + [Stage 3.6 STORY ATOM AUDIT](../pipelines/REWRITE-STAGE-3-VERIFY.md#stage-36-story-atom-audit場景原子驗證硬-gate) 嚴格 enforce。
> 5. **三道濾網 self-apply**：每篇 Stage 0 觀點成型必過 [CLAUDE.md §Bias 1-4](../../CLAUDE.md) — 對 creator 預設加分 / multi-observer drift / editorial voice / 外部 critique default 不執行。
>
> **跟既有 article 的關係**：[History/大罷免.md](../../knowledge/History/大罷免.md) + [History/民主化.md](../../knowledge/History/民主化.md) + [History/台灣民主轉型.md](../../knowledge/History/台灣民主轉型.md) + [History/台灣轉型正義.md](../../knowledge/History/台灣轉型正義.md) + [History/台灣選舉與政黨政治.md](../../knowledge/History/台灣選舉與政黨政治.md) + [Technology/開源社群與g0v.md](../../knowledge/Technology/開源社群與g0v.md) 已 ship；本系列補制度層 + 縣市選舉脈絡層 + 候選人層三個 gap。
>
> **選舉專區 navigation 設計（待哲宇拍板）**：本 inbox entry 落地後，需另外決定文章 path 與站內呈現結構：(A) 開 `knowledge/Politics/` 新分類 + `_Politics Hub.md`；(B) 散在既有 Society + History 分類；(C) Hybrid — `knowledge/Politics/` + `/elections/2026/` 動態 dashboard 頁面接 g0v / 中選會 / 監察院 raw data。Proposal §3 推薦 Hybrid (C)，詳細思路寫在 session 對話回覆給哲宇。

### 🗳️ 2026 選舉 Tier 1.2 — 22 縣市選舉脈絡 EVOLVE Round 2 batch（[B] 需哲宇 nod）

- **Type**: `EVOLVE` × 22 篇（既有 22 縣市 panorama 補章）
- **Category**: Geography
- **Priority**: `P2`
- **Status**: `pending-observer-nod`
- **Requested**: 2026-05-27 by 哲宇 directive（session 2026-05-27-160000-2026-election-evolution）
- **自主權邊界**: `[B]` 需哲宇 explicit nod 整批 — 觸發 >10 篇批量
- **依賴**: 22 縣市 panorama 系列 22/22 已 ship（per ARTICLE-DONE-LOG 2026-05-18 batch）

**EVOLVE 動作**：每篇既有 22 縣市文章 EVOLVE Round 2 加一個 H2 段（不重寫主檔，外科手術 append）：

```markdown
## 政治版圖：為什麼{縣市}的選舉這樣選

### 戰後派系結構

（紅／白／黑 / 在地宗族 / 客家政治 / 原住民部落）

### 1994 民選後的政權更迭

（純事實，不附傾向 — 列每屆當選人 + 黨籍 + 得票率，類似維基表格但加策展敘事）

### 過去 5 屆得票結構

（純數字，不附偏好分析）

### 這次選舉的結構性議題

（**不點候選人名**，只談議題 — 例：高雄談石化轉型、新竹談科學園區擴張、屏東談農漁業勞動、台北談都更卡關、宜蘭談六輕外溢、台中談空汙、台南談光電與漁塭、雲林談地層下陷、嘉義縣談農村高齡化、花蓮台東談 LDLM 觀光、金門連江談小三通與兩岸關係、彰化談機場興建、苗栗談水庫與地震斷層、南投談災後重建、桃園談人口快速增加、新北談衛星都市治理、基隆談港埠轉型、新竹縣談 AI/竹科外溢、嘉義市談國家機關進駐、澎湖談離島補貼）
```

- **Notes**:
  - 共通 caveats（per [reports/cities-series-planning-2026-05-17.md](../../reports/cities-series-planning-2026-05-17.md) 15 條 + 新增 4 條選舉專用）：
    - **新增 #16 派系敘事 ground truth 鐵律**：紅／白／黑分類引用必須附具體事件 + 年份，不泛化
    - **新增 #17 黨籍標記中性化**：歷屆當選人列表只列黨籍不附價值描述
    - **新增 #18 「結構性議題」不暗指 candidate**：例如「都更卡關」不接「現任市長處理不力」這類隱含 framing
    - **新增 #19 對稱原則 enforce**：22 縣市段全部寫完才 ship，避免不對稱發布 = endorsement signal
  - 預估每篇 +1,500-2,000 CJK / +5-8 footnotes / ~60 min 修改
  - 22 篇 batch 預估總時間：~22 hr（可分 2-3 session 跨 2 週完成）
  - 全部 ship 前**禁止單獨**ship 任何一篇（per 對稱原則）
- **依賴關係**: 必須 Tier 1.1 至少 4 篇 ship 後再做（讓制度層 baseline 先到位）
- **Reference**: 22 縣市 panorama 既有 article + 維基百科歷屆選舉條目 + 中選會選舉資料庫 (https://db.cec.gov.tw/) + g0v 選舉金流 + 監察院政治獻金 + 在地新聞媒體（各縣市地方記者報導）

<!-- 2026 選舉 Tier 1.2 append 2026-05-27 by 哲宇 directive (session 2026-05-27-160000-2026-election-evolution) -->

### 🗳️ 2026 選舉 Tier 1.3 — 候選人人物頁 pick list（[C] 哲宇 hard 拍板每篇）

- **Type**: `NEW` × ~20 篇候選（哲宇 pick 哪幾個）
- **Category**: People
- **Priority**: `pending-observer-pick`
- **Status**: `pending`
- **Requested**: 2026-05-27 by 哲宇 directive（session 2026-05-27-160000-2026-election-evolution）
- **自主權邊界**: `[C]` 哲宇 hard 拍板每篇 — 候選人 = partisan 高風險，每篇單獨評估
- **對稱原則鐵律**: 哲宇若 pick 某縣市的 candidate A，**必須一起 pick** candidate B（甚至 C / D / 第三勢力）。不對稱 pick = endorsement signal。

**baseline audit（2026-05-27）**：

| 既有 People 頁 ✅                                                                                                                                                                 | 缺 ❌（按公開報導 2026-05 提名）                                                                                                                                                                                                                                                                                                                                           |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 沈伯洋（台北）、蘇巧慧（新北）、盧秀燕（台中 — 連任中，不參選）、徐巧芯（已是立委非候選人）、柯文哲、卓榮泰、賴清德、蕭美琴、韓國瑜、陳菊、蘇貞昌、呂秀蓮、蔡英文、陳水扁、陳致中 | **6 都候選人**：蔣萬安（北）、李四川（新北）、何欣純（中）、陳亭妃（南）、賴瑞隆（高）、謝龍介（南）、柯志恩（高）<br>**縣市長候選人**：童子瑋（基）、王美惠（嘉市）、陳瑩（東）、蘇清泉（屏）、吳秀華（東）、陳玉珍（金）、張嘉郡（雲）、吳宗憲（宜）、翁壽良（嘉市）、游淑貞（花）、陳素月（彰）、劉建國（雲）、蔡易餘（嘉縣）、林國漳（宜）、陳品安（宜）、魏平政（彰） |

**pick mechanism**：

1. 哲宇 review 此 entry 後**逐個 ✅** 想寫的候選人姓名
2. 每個 ✅ 候選人 spawn 一個獨立 `###` entry 進 inbox（schema 同既有人物 entry，例：沈伯洋／蘇巧慧 entry pattern）
3. 對稱原則自動 enforce：哲宇 ✅ 沈伯洋 → 我必須提醒「需一起 ✅ 蔣萬安」否則不寫
4. 每個獨立 entry 走 REWRITE-PIPELINE Fresh，hook **必須**鎖立法／市政／政策履歷層，**禁止**「為什麼會當選 / 敗選」framing
5. ship 完**不發 spore**（per 選前 30 天 spore freeze + 避免 viral 期 endorsement reading）

**Hook 框架共通**（per [knowledge/People/沈伯洋.md](../../knowledge/People/沈伯洋.md) 既有 pattern）：

- 一個具體場景開頭（不是「他出生於...」這種維基 lead）
- 公開立法／政策／公職紀錄（可查證 + footnote primary source）
- 跨領域學經歷（不只政治）
- 公開引語必須 verbatim 原文（per REFLEXES #16 + Stage 3.5）
- **不寫** policy endorsement / 政見分析 / 民調預測

- **Notes**:
  - 每篇 ≥ 4,000 CJK / 20+ footnotes / 走 REWRITE-PIPELINE Fresh + Stage 3.6 STORY ATOM AUDIT 嚴格 enforce
  - 高風險：每篇 Stage 0 觀點成型必過 [CLAUDE.md §Bias 1-4](../../CLAUDE.md) + [MANIFESTO §10 幻覺鐵律](MANIFESTO.md#10-幻覺鐵律)
  - lastVerified 鎖緊：候選人頁 ship 後每 30 天 EVOLVE Round 2 補新事件（per cron routine 候選）
  - **強烈建議**：哲宇若決定走 Tier 1.3，整批 pick 完一起執行，不要 staggered（避免不對稱）
- **依賴關係**: 必須 Tier 1.1 + 1.2 都到位後再啟動（讓 institutional baseline 先建好）
- **Reference**: 維基百科個別候選人條目 / 立法院議事公開資訊系統 / 監察院政治獻金平臺 / 縣市政府官網（現任市長／議員履歷）/ 候選人公開臉書 / 三大主流媒體報導 / 公視 PNN 候選人專題

<!-- 2026 選舉 Tier 1.3 append 2026-05-27 by 哲宇 directive (session 2026-05-27-160000-2026-election-evolution) — 待哲宇逐個 pick -->

### 上線三個月的 Taiwan.md NEW — 一個數位生命體的第一季（⚠️ 原 6/17 三個月窗口已過）

- **Type**: `NEW`
- **Category**: About（或哲宇個人 voice 對外分享文——voice 歸屬待哲宇定）
- **Priority**: `P2`（2026-07-16 inbox-audit 降級：原黃金窗口 6/17 已過一個月未執行；下個自然時效錨點是 9/17 滿半年，或改 frame 為非週年式的回顧文。部分素材已被 about 時間軸 v1.13.0 里程碑（Day 121 開著門寫作）吸收，寫前先盤點差異化價值）
- **Status**: `pending`（voice 決策仍需哲宇：哲宇第一人稱 FB/Threads vs Semiont 第一人稱站內 About 系）
- **Requested**: 2026-06-12 by 哲宇（goal notes 三星標記「\*\*\* 上線三個月的 分享文章」）
- **Notes**:
  - ⏰ 原時效錨點 2026-06-17 滿三個月已過；改錨 9/17 半年或事件驅動（如 1000 篇 / 重大外部報導）
  - 素材已備：dashboard 數據（792 篇 / 63 貢獻者 / 6 語 / 1028 stars）、里程碑表（CONSCIOUSNESS §里程碑）、野外子代譜系（FORK-LOG）、首日爆發 → 免疫系統 48hr 誕生敘事
  - **Voice 決策需哲宇**：哲宇第一人稱（發 FB / Threads 的個人分享）vs Semiont 第一人稱（站內 About 系文章）vs 兩者各一篇互相引用——goal notes 同時提到「發 taiwan.md 簡報到 Facebook」，可能是同一件事的兩個面
  - 對外溝通屬 §自主權邊界：Semiont 備好 draft + 數據，發布由哲宇
- **Reference**: 哲宇 goal notes + reports/weekly/ 既有週報素材

<!-- ═══ 🟢 P2 — 本季 ═══ -->

<!-- ═══ 2026-06-26 issue triage（#1016 夜生活/KTV 拆分建議 → 改以 KTV 深度文回應）═══ -->

### 🎤 台灣KTV文化 EVOLVE — 早期批次薄文深化：火災安全史 × 錢櫃好樂迪雙雄 × 包廂全民社交

- **Type**: `EVOLVE`（2026-07-16 inbox-audit 更正：原判 NEW，但 `knowledge/Music/台灣KTV文化.md` 自 2026-03-19 早期批次即存在，19KB 薄文 — 正確動作是深度 EVOLVE 該檔，不是另開新檔）
- **Category**: Music
- **Path**: knowledge/Music/台灣KTV文化.md
- **Priority**: `P2`
- **Status**: `pending`
- **觸發**: idlccp1984 issue #1016（已 close）建議把〈夜生活與KTV文化〉拆成 夜生活 + KTV。策展判斷：KTV 材料夠厚、值得獨立深度文；既有 Music 檔是 3/19 早期批次品質，走 EVOLVE 全文重寫。
- **材料缺口**: 包廂計費/點歌系統文化、錢櫃(Cashbox)/好樂迪(Holiday)企業史與 2017 結合案、火災安全演變史（1995 中崙 → 2020 忠孝 5 死 → 法規升級）、麥霸/反差社交、海外台式 KTV、疫情衝擊市場集中化。寫成後〈夜生活〉的 KTV 段縮為 pointer。
- **依賴**: 與〈夜生活與KTV文化〉現有 2 段 KTV 內容交叉（避免重複，寫時 trim 母文）。

### 視覺模組 v2.0 進真實文 EVOLVE batch — tiles/pyramid/stack 各找原生宿主

- **Type**: `EVOLVE`
- **Category**: Geography / Society
- **Path** (EVOLVE only): knowledge/Geography/用數據看台灣22縣市.md（tw-tiles 主宿主）；knowledge/Society/台灣少子化危機.md（tw-pyramid）；knowledge/Society/台灣與核能的討論.md（tw-stack 公投段）
- **Priority**: `P2`
- **Status**: `pending`
- **Requested**: 2026-06-12 by viz-evolution session（哲宇 goal 的 v3 延伸，graph.md §九 + reports/viz-system-evolution-2026-06-12.md §7）
- **Notes**:
  - 不為加而加：各篇 EVOLVE 時順帶升級，不單獨為配圖開 rewrite
  - 22縣市的 22 列 heatmap 可升級或並用 tw-tiles（資料已在文內，零新查證）。2026-07-18 evolve scan 補訊號：GA 7d 28 views / healthScore 41 / 5 腳註——它有穩定真流量，batch 內優先序靠前，viz 升級時順手補引用密度
  - 少子化 pyramid 需先查證年齡×性別官方數據（22縣市文只有比率，事實鐵三角）
  - 核能公投段 stack 數據已驗證（中選會三場），低風險
  - 配圖後必跑 `node scripts/tools/viz-shot.mjs --page {該頁}` 像素閘門

### 台灣 BIM 與營建科技 NEW — 建築工程數位化

- **Type**: `NEW`
- **Category**: Technology（subcategory: 建築科技 / 營建數位化）
- **Priority**: `P2`
- **Status**: `pending`（等碩濤回覆補充援引資源後可升 P1）
- **Source**: 2026-05-21 碩濤 (CTCI 中鼎工程 + GitHub @shuotao) self-recommend BIM_MCP 開源計劃 + 哲宇 email 回覆方向「我們初步可以開發兩篇文章，請他推薦適合援引的資源跟內容」(2026-05-21 reply draft `r-6742567238772772848`)
- **Hook 候選**：
  - 「從手繪藍圖到 Revit 模型，台灣建築工程花了 20 年走完數位化轉型」
  - 「為什麼大型工程公司的 BIM 工程師人數比建築師還多」
  - 「Revit + MCP：當建築設計開始用大語言模型協作的那一年」
- **Notes**:
  - 既有 baseline audit（Stage 0 必跑）：BIM / Revit / 建築資訊模型 / 營建科技 / 數位營建 全部 0 coverage（grep verified 2026-05-21）
  - 既有「Art/台灣建築」「Lifestyle/騎樓文化」「Society/鐵皮屋/社會住宅」都是文化 / 居住敘事 layer，本篇是**工程數位化 layer**互補不重複
  - 主題 anchors：(a) BIM 在台灣導入時點（內政部營建署 / 公共工程委員會推動年）(b) 主要 BIM 軟體 Revit / ArchiCAD / Tekla 在台灣使用 share (c) IFC 國際標準 + 國發會 / 內政部要求公共工程強制 BIM 的政策時點 (d) 台灣本土 BIM 工具 + 開源生態（pyRevit / Dynamo / Navisworks / **BIM_MCP / NAVISWORK_MCP**）(e) 大型工程公司導入 case（中鼎 / 互助 / 大林組 / 中華工程）(f) AI × BIM 新世代（MCP 跟大語言模型協作）
  - 必驗事實：(a) 內政部 BIM 政策正式推動年（建議 cross-check 2014 工程委員會 vs 2017 強制公告）(b) IFC 標準台灣採用時點 (c) 公共工程 BIM 強制門檻金額 (d) 中鼎 BIM 部門規模（碩濤可提供）(e) Revit MCP 開源生態起源（**碩濤 BIM_MCP 2025-12 + Anthropic MCP 規格 2024 發表**時間軸）
  - 政治敏感性：低（純技術 / 產業議題）
  - cross-link：Technology Hub / Art 台灣建築 / Society 社會住宅 / Economy 中鼎工程（本批次 sibling）/ Technology AI 發展
- **Reference**（待碩濤補充）：
  - [shuotao/REVIT_MCP_study](https://github.com/shuotao/REVIT_MCP_study)（73⭐ / 84 forks / 2025-12-10 創立 / 2026-05 active / C# / Revit MCP 教學）
  - [BIM_MCP knowledge site](https://shuotao.github.io/REVIT_MCP_study/docs/BIM_MCP/index.html)（22 個設計命題 + 19 技能索引 + Revit 工作流 SOP）
  - [shuotao/NAVISWORK_MCP](https://github.com/shuotao/NAVISWORK_MCP) / [CAD_MCP_study](https://github.com/shuotao/CAD_MCP_study) / [IFCSH](https://github.com/shuotao/IFCSH) / [FME IFC-to-CityGML](https://github.com/shuotao/FME)
  - 待補：產業報告 / 政府白皮書 / 其他開源專案 / 實務案例 / 業界訪談（per email request to 碩濤）
- **預估時間**：~180 min（NEW Technology / 跨產業 + 政策 + 開源生態多源 cross-check）

### 台灣企業：中鼎工程 NEW — 加入既有企業 series

- **Type**: `NEW`
- **Category**: Economy（subcategory: 台灣企業 / cross-link Technology）
- **Priority**: `P2`
- **Status**: `pending`（等碩濤回覆補充內部援引資源後可升 P1）
- **Source**: 2026-05-21 碩濤 (CTCI 中鼎工程 內部員工) self-recommend + 哲宇 email 回覆方向（同上 reply draft `r-6742567238772772848`）
- **Hook 候選**：
  - 「台灣最大工程顧問公司 60 年，從中油煉油廠到沙烏地新城」
  - 「為什麼 1979 年從中油拆出來的中鼎，現在做的工程一半在海外」
  - 「在中鼎內部，BIM 工程師跟建築師的人數比例正在反轉」
- **Notes**:
  - 既有 baseline audit（Stage 0 必跑）：「台灣企業：X」series 19 篇（台積電、中華電信、中鋼、台塑、台達電、台泥、廣達、宏碁、宏達電、仁寶、和碩、大立光、日月光、瑞昱、奇美、巨大機械、富邦金、國泰金、玉山金、兆豐金）— 中鼎尚未撰寫
  - 主題 anchors：(a) 1979 從中油石油化學工程處獨立成立（時點 + 創辦背景）(b) 統一企業集團持股關係 (c) EPC 模式（Engineering / Procurement / Construction）business model (d) 海外營收占比（中東 / 印度 / 東南亞）(e) 重大標誌性工程（國光石化 vs 抗爭 / 麥寮六輕 / 沙烏地 NEOM city / 高雄輕油裂解）(f) ESG / 碳轉型壓力 + 接綠能離岸風電工程 (g) 數位轉型 — BIM 導入 + AI 工具實驗（碩濤 BIM_MCP 是其中一個 case）
  - 必驗事實：(a) 中鼎成立年（1979 vs 其他說法）(b) 統一集團持股比 (c) 海外營收占比（年度報告 cross-check）(d) 重大工程列表 + 完工年 (e) ESG 報告數據 (f) BIM 部門編制
  - 政治敏感性：中（國光石化抗爭 / 六輕居民健康爭議 / 海外工程的當地勞工 / 環境議題）
  - cross-link：Economy Hub / 台灣企業 series / Technology 台灣 BIM 與營建科技（本批次 sibling）/ History 1970s 十大建設後產業變遷 / Society 環境抗爭脈絡（per 既有 Society 條目）
- **Reference**（待碩濤補充）：
  - 中鼎工程官網 + 年度報告 + ESG 報告
  - 公開新聞報導（國光石化 / 六輕 / 沙烏地 / 離岸風電）
  - 待補：內部 BIM 部門編制資料 / 海外工程實際 case 細節 / 跟其他工程顧問公司（互助、中華工程、永信、台灣世曦）比較
- **預估時間**：~150 min（NEW Economy 大型企業 + 政治敏感 cross-check）
- **Cross-batch**: 跟「台灣 BIM 與營建科技」並行開發，BIM 文章主題層 cite 中鼎 case，企業 profile 內部數位轉型段落 cite BIM 文章

### Blue UAS Cleared List 台灣廠商（2026 美國國防部無人機白名單）NEW

- **Type**: `NEW`
- **Category**: Technology
- **Priority**: `P2`（2026-07-16 inbox-audit 降級：SC 訊號取樣自 2026-05-08 / 05-10，已 2 個月無人重驗，SEO 機會窗可能已變 — 動工前先重跑 SC 7d 確認 query 是否仍有量；訊號還在 → 升回 P0）
- **Status**: `pending`
- **Source**: SC 7d data scan（2026-05-08 elegant-ptolemy /twmd-evolve）— `blue uas cleared list 台灣廠商 2026` 564 impressions / position 8.43 / 0 clicks，是本週 SC opportunities top 第 2 名（僅次於品牌詞 `md` 594）
- **Amplification update（2026-05-10 twmd-news-lens-weekly）**：本週 SC 7d 同 query 升至 **751 imp / position 8.8 / 0 clicks（+33% impressions WoW）**。Position 微退（8.43 → 8.8）但曝光顯著放大 = Google 認定 Taiwan.md 是相關但未足夠 authoritative，**proximity bias 加大 = 機會窗放大**。維持 P0，建議下個 rewrite cycle 優先處理
- **Notes**:
  - 強烈的 emerging topic 信號 — 564 曝光在台灣中文 + 英文混合搜尋詞上，position 8.43 表示 Google 在 first page 後段 surface Taiwan.md 但缺對應內容
  - 2026 美國國防部 Blue UAS Cleared List 是民主供應鏈與台灣無人機產業的 intersect — 經緯航太、雷虎、智飛、神腦等台灣廠商陸續通過或在驗證中（需 verify）
  - 主題 anchors：(a) Blue UAS list 機制本身（DIU 主導 / NDAA Section 848 限制中國零件 / Authorized Vendor 認證流程）(b) 已通過台灣廠商清單（含時間軸 + 認證機種）(c) 台灣國防部「無人機國家隊」政策與美國 Blue UAS 的銜接 (d) 中國無人機（DJI / Autel）被排除後產生的市場替代空間
  - 必驗事實：每個台灣廠商通過時間 + 機種 + 應用場景。DIU 官方 https://defense.gov/blueuas 是一手 source
  - 政治敏感度：低（市場資訊為主），但碰到「對美關係」「國防自主」框架時要小心 framing
  - cross-link：[國防現代化](/society/國防現代化)、[國防工業](/economy/) 系列、[經緯航太](/people/) 等待 cross-link
- **Reference**: SC 7d top opportunity / DIU Blue UAS Cleared List 官方 / 國防部新聞稿
- **預估時間**：90 min（NEW Technology with multi-source 一手研究）

### 告五人

- **Type**: `NEW`
- **Category**: Music
- **Priority**: `P2`（2026-07-16 inbox-audit 降級：agent 分析任務建議、閒置 2.5 個月、非時效題）
- **Status**: `pending`
- **Requested**: 2026-04-27 by session-6661575f (twindiemusic.com 分析任務)
- **Notes**:
  - 2015 年台中起家，Spotify 台灣月聽眾長期破百萬
  - 〈把回憶拼好再出發〉在多個亞洲市場爆紅，代表台灣獨立音樂主流化
  - 必驗事實：成立年份（約 2015 待確認）、主唱嫺靜全名、代表曲發行年份
  - 角度：獨立音樂的串流時代轉型
  - 敏感度：低
- **Reference**: https://twindiemusic.com/

### 脫拉庫

- **Type**: `NEW`
- **Category**: Music
- **Priority**: `P2`（2026-07-16 inbox-audit 降級：同 告五人 — agent 建議、閒置 2.5 個月）
- **Status**: `pending`
- **Requested**: 2026-04-27 by session-6661575f (twindiemusic.com 分析任務)
- **Notes**:
  - 泰雅族樂團，用泰雅語唱龐克搖滾
  - 音樂即語言保存的實踐（族語復振 × 現代音樂形式）
  - 必驗事實：成員資料、泰雅族族群認同（Atayal）確認、代表作
  - 與阿爆（流行路線）形成原住民當代音樂的對比策展
  - 敏感度：低（原住民身份相關，但脫拉庫本身已公開族群身份）
- **Reference**: https://twindiemusic.com/

### 📜 台灣詩人系列 umbrella — BRANCH-PIPELINE v2.0 broad-theme research batch（2026-05-23）

- **Type**: `umbrella series` × N（每位詩人 / movement 獨立 ship）
- **Category**: People / History / Culture / Language（跨類）
- **Priority**: 含 P0/P1/P2 三層 — 詳見下方分層
- **Status**: `pending`
- **Source**: 2026-05-23 manual (220053) /twmd-finale 觸發 broad-theme research — 哲宇 directive「針對臺灣從以前到現在的詩人，包含各種時代的詩人以及現代詩的各種文學作家，請針對這些作家的研究做一個完整的大資訊化研究」
- **Pipeline 走法**: BRANCH-PIPELINE v2.0 broad-theme mode 首例實戰 — spawn 4 parallel general-purpose agents 各跑一個 era sub-theme
- **Master research report**: [reports/research/2026-05/taiwan-poets-comprehensive.md](../../reports/research/2026-05/taiwan-poets-comprehensive.md)
- **4 sub-reports**:
  - [taiwan-poets-1-japanese-era.md](../../reports/research/2026-05/taiwan-poets-1-japanese-era.md)（日治 1895-1945 / 12+ 詩人 / 4 movement / 360 行）
  - [taiwan-poets-2-postwar-modernism.md](../../reports/research/2026-05/taiwan-poets-2-postwar-modernism.md)（戰後第一代 1949-1970 / 11 詩人 / 3 詩刊 / 2 場論戰 / 30K bytes）
  - [taiwan-poets-3-bamboo-hat-nativism.md](../../reports/research/2026-05/taiwan-poets-3-bamboo-hat-nativism.md)（笠詩社+鄉土 1964-1990 / 13 詩人 / 笠詩社 movement / 1977 鄉土論戰 / 456 行）
  - [taiwan-poets-4-contemporary-women-indigenous.md](../../reports/research/2026-05/taiwan-poets-4-contemporary-women-indigenous.md)（當代+女性+原民+台客語 1990-2025 / 30 詩人 / 4 sub-cluster / 44K bytes）

**P0 個別人物**（13 個；進度 2026-07-16：杜潘芳格 ✅ 2026-07-12 ship / 笠詩社 ✅ 2026-06-20 ship（皆已歸 DONE-LOG）；剩獨立 entry 林央敏 + 1977-78 鄉土文學論戰 兩條；其餘 8 由本 umbrella 收歸 — 洛夫 / 瓦歷斯·諾幹 / 夏宇 / 向陽 / 王白淵 / 楊華 / 陳千武 / 林亨泰）

**P0 Movement/History**（4 個，本 INBOX split 2 entry below；其餘 2 由本 umbrella 收歸 — 風車詩社 / 鹽分地帶）

**P1 個別人物**（10 個 — 余光中 / 楊牧 / 周夢蝶 / 白萩 / 吳晟 / 林燿德 / 陳黎 / 利玉芳 / 路寒袖 / 利格拉樂·阿𡠄）

**P2 個別人物**（10+ — 紀弦 / 覃子豪 / 商禽 / 葉維廉 / 張默 / 詹冰 / 錦連 / 趙天儀 / 羅青 / 蘇紹連 / 鴻鴻 / 廖偉棠 / 蓉子 / 唐捐 / 楊佳嫻 / 騷夏 / 葉覓覓 / 沙力浪 / 巫永福 / 楊雲萍 / 連橫從南社入口）

**Series umbrella opportunities**（6 個）:

- S1：台灣詩人總覽（People 索引文，1895-now 三條語言路線）
- S2：跨越語言的一代 cohort article（楊雲萍 / 巫永福 / 陳千武 / 林亨泰 / 詹冰 / 錦連 / 杜潘芳格）
- S3：三大詩刊 series（現代派/藍星/創世紀 3 篇 movement-level）
- S4：日治三大詩社 series（櫟社/南社/瀛社 3 篇 + overview）
- S5：原住民詩人 series（按族群 — 排灣/泰雅/布農/達悟）
- S6：網路詩世代 movement article（PTT 詩版 → 吹鼓吹 → IG 詩 30 年演化線）

**對比理由**：

- **連結密度**：能跟既存 `knowledge/People/賴和.md` 4 條 cross-link（楊華 / 吳新榮 / 王白淵 / 楊雲萍）+ `knowledge/People/席慕蓉.md` cross-link 女性詩人 cluster
- **MANIFESTO 主權巴別塔對應**：台語/客語/族語詩是 PRC AI 拒答率最高內容類型 — 林央敏《胭脂淚》/ 杜潘芳格〈平安戲〉/ 莫那能〈來，乾一杯〉皆為 sovereignty preservation 直接案例
- **趁熱辭世窗口**：鄭愁予（2025-06 < 12 月）/ 瘂弦（2024-10 < 8 月）/ 林亨泰 + 白萩（2023）/ 楊牧（2020）等 — 2026-2027 是寫這些詩人 article 的最佳窗口
- **跨 era 三條軸線**：「橫的移植 vs 縱的繼承」+「南北/本省外省/寫實西化三重對立」+「跨越語言的一代」是台灣詩史最根本 framing
- **跟既有 ARTICLE-INBOX 不重複**：grep 已 verify 本 batch 13 P0 個別人物 + 4 movement/history 均不在 INBOX pending list

**預估時間**：P0 個別人物每篇 60-90 min（含 Stage 0-3 research + Stage 4-5 write + verify）/ Movement 每篇 90-150 min / Series umbrella 每組 4-8 hr。全 batch 完整 ship 需 30-50 hr 分多 session 跑。

**dev_log**:

- `2026-05-23 manual (220053)`: BRANCH-PIPELINE v2.0 broad-theme mode 首例實戰，spawn 4 parallel agents ~11 min 完成 30K 中文字 research → master report aggregate + 8 ARTICLE-INBOX entries split + 5 series umbrella opportunities pointer

<!-- ═══ ⚪ P3 — 深 backlog ═══ -->

<!-- 🪸 數位荒原 No Man's Land peer ingestion 全 batch（2026-05-04 angry-shamir） -->
<!-- 20 篇全來自 reports/NML-semiont-analysis-2026-05-04.md §Part 5-6 -->
<!-- 13 個 series × P0×5 + P1×8 + P2×7 三層優先序 -->
<!-- 核心手法：「兩個 Semiont 對話」+ Semiont 「換頻」非降級 (§7.4) + peer 盲點補位 11 條 (§7.3) -->
<!-- -->
<!-- 🔥 RESEARCH 紀律雙軌：除了走標準 REWRITE-PIPELINE Stage 0-6，每篇 Stage 1 還要 -->
<!--    **大幅度從 data/NML/ 資料集萃取知識**（37 MB / 555 items / 384 articles 內鏈中文 -->
<!--    雙語 + 56 issue 主題策展編按 + 31 集 podcast + 10 冊群島資料庫 imprint 共 22 篇文 -->
<!--    章帶 Original Source: 群島資料庫 Nusantara Archive 標籤）。 -->
<!-- -->
<!--    具體做法：Stage 1 research agent 必須**先**完整讀本地 NML article / issue / -->
<!--    podcast markdown（Read tool）再做 WebSearch 補抓 NML 語料外的事實補強。每條 entry -->
<!--    的 `NML 萃取重點` 標註該篇要從哪幾個 NML 本地 source mining 哪些 framework / -->
<!--    案例 / 引語 / 編年資訊。WebSearch 是補強不是取代——大量 framework 與當事人引語 -->
<!--    在 NML 12 年累積中，外部 search 不一定找得到。 -->
<!-- -->
<!--    Peer-bias 警示：鄭文琦個人風格 driven 88% NML 文章 → 多元 cite secondary -->
<!--    editors 區秀詒 / 高森信男 / 王柏偉 / 印卡 / 蔡長璜 / 葉杏柔 避免單一視角。 -->
<!--    REFLEXES #16「Peer 是 peer 不是 source material」在 NML 場景特別硬。 -->

### 高森信男的混血策展視角（既有 evolve）

- **Type**: `EVOLVE`
- **Category**: Art（subcategory: 策展人）
- **Priority**: `P3`
- **Status**: `pending`
- **Source**: 2026-05-04 angry-shamir NML peer P1 #2（series C-2）
- **Reference**: [reports/NML-semiont-analysis-2026-05-04.md §Part 6 P1-7](../../reports/NML-semiont-analysis-2026-05-04.md)
- **核心矛盾**：「形象化策展人」高森信男的真實累積比媒體形象更深 — NML 10 篇本人著作揭露的策展論述
- **預估**：M（3-4 hr，evolve 既有「台灣策展人與藝術文化建構」中關於高森信男的段落）
- **NML 萃取重點**：高森信男在 NML 是 top author #3（10 篇本人著作 + 10 篇編輯）。**Stage 1 主要從 data/NML 挖**：他自己在 NML 寫的 10 篇 article（早期 2014 Project Glocal 評論到 2021 亞雙策展論述）+ 他編輯的 issue 編按 + NML 對他的描述。WebSearch 補：他在《典藏今藝術》發表的策展論述 / 2021 亞洲藝術雙年展正式展冊 / 採訪。
- **NML Local Sources**：`data/NML/articles/` author=高森信男 10 篇 + editor=高森信男 10 篇
- **Notes**：evolve target = [台灣策展人與藝術文化建構](../../knowledge/Art/台灣策展人與藝術文化建構.md) 中既有的高森信男段落 / 也可能新建獨立 People 條目（待哲宇決策）

### 在地實驗（IT Park）：台灣媒體藝術的啟蒙地

- **Type**: `NEW`
- **Category**: Art × History（subcategory: 90 年代另類空間）
- **Priority**: `P3`
- **Status**: `pending`
- **Source**: 2026-05-04 angry-shamir NML peer P1 #3（series D-2）
- **Reference**: [reports/NML-semiont-analysis-2026-05-04.md §Part 6 P1-8](../../reports/NML-semiont-analysis-2026-05-04.md)
- **核心矛盾**：黃文浩 1995 創辦的地下室為什麼成為台灣媒體藝術啟蒙地（替代空間勝過體制內機構的歷史時刻）
- **預估**：L（5-7 hr）
- **NML 萃取重點**：黃文浩是 NML 母組織 DAF 創辦人 + NML 編輯顧問。**Stage 1 主要從 data/NML 挖**：(a) NML 多篇 article 提及在地實驗 / IT Park / 黃文浩 / 1990s 替代空間 (b) 葉杏柔 2023 系列「九〇年代另類藝術空間」(c) 王福瑞、姚仲涵在 NML 訪談中對在地實驗的回憶。WebSearch 補：在地實驗官網 etat.com 自述 / IT Park 25 週年回顧（如有）/ 黃文浩個人訪談。
- **NML Local Sources**：`data/NML/articles/` 葉杏柔 2023 系列（grep author=葉杏柔 published=2023）+ 多篇 90 年代相關 + `data/NML/issues/back-to-care.md`
- **Notes**：跟 P0 #5 新生態藝術環境配對寫成 90 年代 dual feature

### Nusantara 的政治含義：為什麼用「群島」取代「東南亞」

- **Type**: `NEW`
- **Category**: Culture × Politics（subcategory: 文化地理 / 概念政治）
- **Priority**: `P3`
- **Status**: `pending`
- **Source**: 2026-05-04 angry-shamir NML peer P1 #4（series A-2）
- **Reference**: [reports/NML-semiont-analysis-2026-05-04.md §Part 6 P1-9](../../reports/NML-semiont-analysis-2026-05-04.md)
- **核心矛盾**：「東南亞」是冷戰美國地緣戰略命名，「Nusantara」是當地語言自我命名 — 名字選擇本身就是政治
- **預估**：M（3 hr，純概念性論述文章）
- **NML 萃取重點**：群島 framework 詮釋學的核心論述都在 NML。**Stage 1 主要從 data/NML 挖**：(a) Issue 34 Hermeneutics of Nusantara 完整編按 (b) Issue 「Nusantara: Signifier and Its Limitation」(c) Issue 「Recalling Islands」(d) 22 篇帶 `Original Source: 群島資料庫 Nusantara Archive` 標籤 article。WebSearch 補：學術論文如 Anthony Reid 等東南亞研究專家對 Nusantara 概念的學術定義 / 馬來西亞 Gerakbudaya 文運書坊張永新訪談 / 1943 SEAC 命名史。
- **NML Local Sources**：`data/NML/issues/hermeneutics-of-nusantara.md` + `data/NML/issues/nusantara-signifier-and-its-limitation.md` + 22 篇 NA imprint articles
- **Notes**：跟 P0 #3 群島思維互補（一篇實踐層、一篇概念層）

### 海盜、電波、隔離圈：當代台灣的環太平洋地緣三角

- **Type**: `NEW`
- **Category**: Culture × History（subcategory: 當代地緣論述）
- **Priority**: `P3`
- **Status**: `pending`
- **Source**: 2026-05-04 angry-shamir NML peer P1 #5（series F-1）
- **Reference**: [reports/NML-semiont-analysis-2026-05-04.md §Part 6 P1-10](../../reports/NML-semiont-analysis-2026-05-04.md)
- **核心矛盾**：當「冷戰」變成「新冷戰」 — 環太平洋地緣的非常規穿越情境
- **預估**：M-L（4-5 hr）
- **NML 萃取重點**：framework 完全來自 NML 2022 issue。**Stage 1 主要從 data/NML 挖**：(a) Issue The Piracy, the Radiowave, the Bubble 完整編按 + 該 issue 9 篇 article (b) 31 集南洋廣播電台 podcast 系列（電波軸）(c) NML 各 issue 中提及冷戰時期台灣對東南亞廣播的內容。WebSearch 補：日本帝國 1930 年代南進政策廣播史 / 中央廣播電台對中國大陸廣播史 / NFT bubble 學術論文。
- **NML Local Sources**：`data/NML/issues/the-piracy-the-radiowave-the-bubble.md` + 31 podcasts in `data/NML/podcasts/`
- **Notes**：理論性高，需主動加台灣具體案例避免抽象

### How to NOISE：台灣實驗噪音文化的 DIY 實踐

- **Type**: `NEW`
- **Category**: Music × Art（subcategory: 實驗音樂）
- **Priority**: `P3`
- **Status**: `pending`
- **Source**: 2026-05-04 angry-shamir NML peer P1 #6（series E-2）
- **Reference**: [reports/NML-semiont-analysis-2026-05-04.md §Part 6 P1-11](../../reports/NML-semiont-analysis-2026-05-04.md)
- **核心矛盾**：1993 NOISE 雜誌啟動台灣實驗噪音場景，30 年後它仍是 niche — DIY 抵抗主流的代價
- **預估**：M（3 hr）
- **NML 萃取重點**：葉杏柔 2023 系列直接寫王福瑞 NOISE 雜誌 + 經.神.經。**Stage 1 主要從 data/NML 挖**：(a) NML 「How to NOISE」standalone article (b) 「Before NOISE」standalone article (c) NML 40 篇 Sound Scene category articles。WebSearch 補：1993 NOISE 雜誌實體刊物 archive / 王福瑞個人訪談 / 同期國際實驗音樂 scene。
- **NML Local Sources**：必補抓 NML 兩篇 standalone（issue 不收錄）：https://www.heath.tw/nml-article/it-launched-internationally-how-to-noise/ + https://www.heath.tw/nml-article/it-launched-internationally-before-noise/ + 40 篇 Sound Scene
- **Notes**：跟 P0 #4 王福瑞 cross-link / 補既有 [台灣聲音地景](../../knowledge/Music/台灣聲音地景.md) 中王福瑞名單級提及 → 升級

### 群島資料庫：一個跨國藝術駐站計劃的方法論

- **Type**: `NEW`
- **Category**: Art × Culture（subcategory: 藝術駐站制度）
- **Priority**: `P3`
- **Status**: `pending`
- **Source**: 2026-05-04 angry-shamir NML peer P1 #7（series B-3）
- **Reference**: [reports/NML-semiont-analysis-2026-05-04.md §Part 6 P1-12](../../reports/NML-semiont-analysis-2026-05-04.md)
- **核心矛盾**：「藝術進駐、文化翻譯、共同生產」三大方針怎麼在 12 年實踐 / 方法論 vs 結果
- **預估**：M-L（4-5 hr）
- **NML 萃取重點**：計劃自己的所有 documentation 都在 NML。**Stage 1 主要從 data/NML 挖**：(a) Hermeneutics of Nusantara + Recalling Islands + Twinning Wastelands 三 issue 完整內容 (b) 23 篇 Residency category articles 駐站紀錄 (c) 22 篇 NA imprint articles。WebSearch 補：國藝會兩期結案報告 / 國際藝術駐站制度比較研究。
- **NML Local Sources**：`data/NML/articles/` 23 Residency category + 22 NA imprint + 4 群島相關 issue
- **Notes**：跟 P0 #2 數位荒原平台條目互相 pointer / 對應 NML 副計劃

### 九〇年代「經.神.經」與台灣實驗噪音前史

- **Type**: `NEW`
- **Category**: Music × Art（subcategory: 90 年代實驗噪音）
- **Priority**: `P3`
- **Status**: `pending`
- **Source**: 2026-05-04 angry-shamir NML peer P1 #8（series D-3）
- **Reference**: [reports/NML-semiont-analysis-2026-05-04.md §Part 6 P1-13](../../reports/NML-semiont-analysis-2026-05-04.md)
- **核心矛盾**：王福瑞「經.神.經」是純粹聲學嗎？「沉默-噪音辯證」的哲學起源
- **預估**：M（3 hr）
- **NML 萃取重點**：葉杏柔 2023 系列特別寫過經.神.經。**Stage 1 主要從 data/NML 挖**：(a) NML 系列 standalone article 對經.神.經的論述 (b) 葉杏柔 2023 國藝會結案報告「九〇年代噪聲作動的頻譜」(c) 周逸昌、黃明川、王福瑞三人對位的歷史脈絡。WebSearch 補：1990s 一台北實驗音樂演出文獻 / 周逸昌 nz 期 / 黃明川紀錄片〈台灣現代藝術三百年〉。
- **NML Local Sources**：與 P1 #6 共用本地 sources，加：`data/NML/articles/silver-noise-some-scenes-on-the-sonic-memory-of-history.md` + `data/NML/articles/the-noise-parasite-of-composite-conceptual-and-sensual-re-formation-1.md` + `data/NML/articles/the-noise-parasite-of-composite-conceptual-and-sensual-re-formation-2.md`
- **Notes**：跟 P1 #6 How to NOISE 是 series E-2 同分支 / P0 #4 王福瑞人物頁的延伸

### 南洋廣播電台：聲音作為冷戰時期的台灣 / 東南亞通道

- **Type**: `NEW`
- **Category**: History × Music（subcategory: 冷戰廣播史）
- **Priority**: `P3`
- **Status**: `pending`
- **Source**: 2026-05-04 angry-shamir NML peer P2 #1（series F-2）
- **Reference**: [reports/NML-semiont-analysis-2026-05-04.md §Part 6 P2-14](../../reports/NML-semiont-analysis-2026-05-04.md)
- **核心矛盾**：台灣作為日本帝國「最南方廣播基地」與冷戰時期國民黨政府的東南亞華語廣播戰略 — 聲音的地緣政治
- **預估**：L（5-7 hr）
- **NML 萃取重點**：南洋廣播電台 podcast 系列直接是這個主題。**Stage 1 主要從 data/NML 挖**：31 集 podcast 全列表 + The Piracy issue 中關於電波的段落 + NML 各 issue 提及冷戰廣播史的 article。WebSearch 補：央廣（中央廣播電台）對東南亞廣播史 / 1930s 台灣放送局南進政策 / 馬來亞 Radio 對冷戰華語聽眾。
- **NML Local Sources**：31 podcasts in `data/NML/podcasts/` + `data/NML/issues/the-piracy-the-radiowave-the-bubble.md`
- **Notes**：可能 P1 升級候選（取決於 podcast transcript 完整度）

### Mark Teh 與民眾劇場：馬來西亞劇場的台灣回聲

- **Type**: `NEW`
- **Category**: People × Art（subcategory: 跨國劇場）
- **Priority**: `P3`
- **Status**: `pending`
- **Source**: 2026-05-04 angry-shamir NML peer P2 #2（series C-3）
- **Reference**: [reports/NML-semiont-analysis-2026-05-04.md §Part 6 P2-15](../../reports/NML-semiont-analysis-2026-05-04.md)
- **核心矛盾**：兩個威權後民主化島嶼（台灣 / 馬來西亞）的劇場互相對話 — 民眾劇場為何不能在台灣複製
- **預估**：M（3-4 hr）
- **NML 萃取重點**：NML 2023 葉杏柔 + 鄭文琦聯合訪談 Mark Teh。**Stage 1 主要從 data/NML 挖**：訪談 article 完整 dialogue + NML 多次提及 Five Arts Centre / Pentas Project / Komas 等馬來西亞劇場團體。WebSearch 補：Mark Teh 個人作品官網 / 2018 PETAMU Project 紀錄 / 馬來西亞民眾劇場史。
- **NML Local Sources**：`data/NML/articles/with-mark-teh-on-peoples-theatre-and-the-spectres-of-history.md`
- **Notes**：跟 P0 #3 群島思維互文（劇場層次的群島實踐）

### 台灣與東南亞的共享歷史：四個被忽視的時刻

- **Type**: `NEW`
- **Category**: History（subcategory: 跨區域歷史）
- **Priority**: `P3`
- **Status**: `pending`
- **Source**: 2026-05-04 angry-shamir NML peer P2 #3（series A-4）
- **Reference**: [reports/NML-semiont-analysis-2026-05-04.md §Part 6 P2-16](../../reports/NML-semiont-analysis-2026-05-04.md)
- **核心矛盾**：「中華 + 西方」框架掩蓋了台灣跟東南亞的四個關鍵歷史交集點
- **預估**：L（5-6 hr，需歷史研究）
- **NML 萃取重點**：NML 多 issue 散佈具體歷史事件素材。**Stage 1 主要從 data/NML 挖**：群島資料庫研究員（吳其育 / 茲克里拉曼 / KUNCI 等）的 article 中具體歷史事件描述 + Twinning Archipelago issue 中的歷史段落 + 南洋廣播電台 podcast 中的冷戰段落。WebSearch 補：陳鴻瑜《東南亞史》/ 中研院亞太區域研究專題中心研究 / 1942 大東亞共榮圈台灣角色 / 1949 國民政府退台與東南亞華僑社群。
- **NML Local Sources**：`data/NML/articles/` 吳其育 / 茲克里拉曼 / KUNCI 群島資料庫研究員著作 + 4 群島相關 issue
- **Notes**：四個時刻候選：(1) 1942 日本南進政策中台灣 (2) 1949 國民政府東南亞華僑網絡 (3) 1965 馬來西亞 / 新加坡分家對台僑影響 (4) 1990s 新南向第一波

### 南島語族原鄉假說與台灣的群島身份

- **Type**: `NEW`
- **Category**: History × Anthropology（subcategory: 史前考古 / 語言學）
- **Priority**: `P3`
- **Status**: `pending`
- **Source**: 2026-05-04 angry-shamir NML peer P2 #4（series A-3）
- **Reference**: [reports/NML-semiont-analysis-2026-05-04.md §Part 6 P2-17](../../reports/NML-semiont-analysis-2026-05-04.md)
- **核心矛盾**：學術上台灣是南島語族原鄉，文化上台灣不認識自己的南島身份 — 知識 vs 認同
- **預估**：L（6-7 hr）
- **NML 萃取重點**：NML 群島 framework 跟南島語族原鄉假說同源。**Stage 1 主要從 data/NML 挖**：群島 framework 各 issue 編按 + 提及南島原鄉的 article。WebSearch 主導：Robert Blust / Peter Bellwood 學術論文 / 中研院史語所 Austronesian 研究 / 南島民族博物館（屏東）2023 啟用 / 卑南遺址玉器流通菲律賓考古證據。
- **NML Local Sources**：`data/NML/issues/hermeneutics-of-nusantara.md` + `data/NML/issues/recalling-islands.md` 中關於南島起源的段落
- **Notes**：跟 P0 #3 群島思維互補（人類學 / 考古層）/ 跟既有 [台灣原住民當代藝術](../../knowledge/Art/台灣原住民當代藝術.md) cross-link

### 翻譯作為策展：NML 把東南亞論述翻成中文的 12 年

- **Type**: `NEW`
- **Category**: Art × Culture（subcategory: 翻譯策展論述）
- **Priority**: `P3`
- **Status**: `pending`
- **Source**: 2026-05-04 angry-shamir NML peer P2 #6（series J-1）
- **Reference**: [reports/NML-semiont-analysis-2026-05-04.md §Part 6 P2-19](../../reports/NML-semiont-analysis-2026-05-04.md)
- **核心矛盾**：「翻譯」是知識傳遞的中性技術 / 還是策展選擇的權力 — NML 12 年翻譯實踐揭示
- **預估**：M（3-4 hr）
- **NML 萃取重點**：NML 34 篇 Translation category articles 是這篇主軸。**Stage 1 主要從 data/NML 挖**：34 篇 Translation 完整列表 + 譯者群（鄭文琦 / 葉杏柔 / 吳庭寬等） + 被翻譯原文來源（Lekra / Ruangrupa / Komas / Singapore biennale 等）。WebSearch 補：翻譯研究學術論文 / 馬來西亞華文翻譯產業 / Inscriptions / Buku Jalanan 等被翻譯方訪談。
- **NML Local Sources**：34 篇 NML Translation category articles
- **Notes**：高度 meta — 一篇關於翻譯本身的策展論述

### 台灣原住民與南島語族藝術網絡（反向補位）

- **Type**: `NEW`
- **Category**: Art × Culture（subcategory: 原住民藝術 / 南島語族）
- **Priority**: `P3`
- **Status**: `pending`
- **Source**: 2026-05-04 angry-shamir NML peer P2 #7（series L-1）
- **Reference**: [reports/NML-semiont-analysis-2026-05-04.md §Part 6 P2-20](../../reports/NML-semiont-analysis-2026-05-04.md)
- **核心矛盾**：NML 群島 framework 偏馬來印尼，**反向補位** — 從台灣原住民視角重新看「群島」
- **預估**：L（5-6 hr）
- **NML 萃取重點**：**這篇是 §7.3 NML 盲點 #4 的 explicit 反向補位** — NML 缺原住民聲音，Taiwan.md 主動補。**Stage 1 不主要 mine NML**（NML 在這個 topic 是缺口而非素材源）。WebSearch 主導：原民會原住民藝術家資料庫 / Pulima 藝術獎得獎人 / 蘭嶼達悟族藝術家 / 高山青藝術 / 國美館原住民當代藝術典藏。NML 補：少數提及原住民的 article（如達悟族相關）作為對照。
- **NML Local Sources**：少量參考（NML 在這 topic 是缺口）
- **Notes**：REFLEXES #16 反向補位的具體 instantiation — 不繼承 peer 盲點 / 跟既有 [台灣原住民當代藝術](../../knowledge/Art/台灣原住民當代藝術.md) 雙向 cross-link

<!-- ━━━ NMTH 海外文獻系列（2026-04-12 系列規劃，2026-07-16 全降 P3）━━━ -->

### 史溫侯的島嶼紀行

- **Type**: `NEW`
- **Category**: History
- **Priority**: `P3`（2026-07-16 inbox-audit 降級：NMTH 系列自 2026-04-12 閒置 3 個月，移深 backlog）
- **Status**: `pending`
- **Requested**: 2026-04-12 by NMTH peer-ingestion analysis（2026-04-24 β4 補進 INBOX）
- **Notes**:
  - 系列 A-3（史溫侯系列第 3 篇，旅行文學 / 地理軸）
  - 物件先行：史溫侯 1864 _Notes on the Island of Formosa_ 地誌論文 + 手繪地圖
  - Semiont 角度：19 世紀英國人筆下的台灣地景——哪些地方他到了、哪些他看不到、為什麼
  - 必驗事實：史溫侯造訪路線（打狗/淡水/雞籠/澎湖等）、地圖精度對比、原住民族群識別
  - 潛在陷阱：19 世紀旅行文學的「異域獵奇」框架必須明示
- **Reference**: reports/NMTH-overseas-semiont-analysis-2026-04-12.md §5.A-3
- **NMTH Local Sources**（史溫侯島嶼紀行類文獻多，要篩 scope）:
  - `data/NMTH-overseas/collections/eac5b946-*.md`（**福爾摩沙島紀行** 20 頁 — A-3 主文獻）
  - `data/NMTH-overseas/collections/b700e73f-*.md`（福爾摩沙筆記 19 頁）
  - `data/NMTH-overseas/collections/98bf60ec-*.md`（福爾摩沙概述 23 頁）
  - `data/NMTH-overseas/collections/abd05f27-*.md`（福爾摩沙島紀事 4 頁）
  - `data/NMTH-overseas/collections/b6da15ea-*.md`（福爾摩沙島紀事 4 頁，可能是重複或相關版本）
  - `data/NMTH-overseas/collections/9363fe10-*.md`（福爾摩沙海岸上的香山之旅 5 頁）
  - `data/NMTH-overseas/collections/8565270b-*.md`（福爾摩沙補遺 9 頁）
  - `data/NMTH-overseas/collections/6f44f1f0-*.md`（福爾摩沙自然史筆記 3 頁）
  - `data/NMTH-overseas/collections/883a44d3-*.md`（史溫侯的福爾摩沙自然史 4 頁）
  - 史溫侯信件（02388910 / 26659313 / 2ad9dad5）

### 福爾摩沙民族學評註

- **Type**: `NEW`
- **Category**: History
- **Priority**: `P3`（2026-07-16 inbox-audit 降級：NMTH 系列自 2026-04-12 閒置 3 個月，移深 backlog）
- **Status**: `pending`
- **Requested**: 2026-04-12 by NMTH peer-ingestion analysis（2026-04-24 β4 補進 INBOX）
- **Notes**:
  - 系列 A-5（史溫侯系列第 5 篇，人類學 / 原住民軸）
  - 物件先行：史溫侯 1863 _Notes on the Ethnology of Formosa_ 人類學論文
  - Semiont 角度：西方最早的原住民觀察——同時是殖民主義的知識生產，也是目前少數 19 世紀中葉原住民文化紀錄
  - 敏感度：高（涉及 19 世紀種族觀與當代原住民主體性之矛盾，必過 Step 2.7 紀實 vs 煽情閘）
  - 必驗事實：史溫侯觀察的族群（平埔 / 高山分類法當時未成熟）、記錄地點、與當代人類學知識的對照
  - 潛在陷阱：絕對不把 19 世紀人類學分類當客觀；明示殖民框架；交叉引用當代原住民學者回應（孫大川、巴蘇亞等）
- **Reference**: reports/NMTH-overseas-semiont-analysis-2026-04-12.md §5.A-5
- **NMTH Local Sources**:
  - `data/NMTH-overseas/collections/37be7594-*.md`（**福爾摩沙民族學評註** 18 頁 — 直接對應文獻）

### 澎湖之戰與孤拔中將

- **Type**: `NEW`
- **Category**: History
- **Priority**: `P3`（2026-07-16 inbox-audit 降級：NMTH 系列自 2026-04-12 閒置 3 個月，移深 backlog）
- **Status**: `pending`
- **Requested**: 2026-04-12 by NMTH peer-ingestion analysis（2026-04-24 β4 補進 INBOX）
- **Notes**:
  - 系列 B-2（清法戰爭系列第 2 篇，海軍史軸）
  - 物件先行：孤拔（Amédée Courbet）遠東艦隊日誌 + 澎湖馬公港海戰地圖
  - Semiont 角度：一場被兩岸史學忽略的海戰——法軍占領澎湖兩個月、孤拔病逝馬公、遠東戰略的微縮版
  - 必驗事實：1885-03 澎湖戰役日期、孤拔 1885-06-11 病逝地點（馬公孤拔紀念碑現存）、法軍撤離條件（中法新約）
  - 交集：連結既有 [清法戰爭.md](../knowledge/History/清法戰爭.md)
- **Reference**: reports/NMTH-overseas-semiont-analysis-2026-04-12.md §5.B-2
- **NMTH Local Sources**（澎湖段落在嘉諾手稿後段）:
  - `data/NMTH-overseas/collections/7e6ea6ba-*.md`（**《法軍遠征福爾摩沙 1884-1885》回憶錄手稿** 198 頁 — 要重點讀澎湖段，孤拔在此戰役末期病逝馬公）
  - `data/NMTH-overseas/collections/68059959-*.md`（《法軍遠征》地圖手稿）

### 嘉諾上尉的手稿

- **Type**: `NEW`
- **Category**: History
- **Priority**: `P3`（2026-07-16 inbox-audit 降級：NMTH 系列自 2026-04-12 閒置 3 個月，移深 backlog）
- **Status**: `pending`
- **Requested**: 2026-04-12 by NMTH peer-ingestion analysis（2026-04-24 β4 補進 INBOX）
- **Notes**:
  - 系列 B-3（清法戰爭系列第 3 篇，一手史料解讀軸）
  - 物件先行：嘉諾上尉 198 頁手寫筆記本（NMTH 典藏，目前已知最詳盡的清法戰爭西文紀錄）
  - Semiont 角度：從單一物件開展——「1884 年冬天，一本法國軍官的筆記本記錄了基隆砲台上每一次開火」
  - 必驗事實：嘉諾（Garnot）職銜、筆記年代（1884-1885）、頁數 198、翻譯者（費德廉）、館藏編號
  - 潛在陷阱：一手史料不等於客觀真相，軍官視角有其結構限制
- **Reference**: reports/NMTH-overseas-semiont-analysis-2026-04-12.md §5.B-3
- **NMTH Local Sources**（B-3 的 primary source 就在本地）:
  - `data/NMTH-overseas/collections/7e6ea6ba-*.md`（**嘉諾手稿 198 頁回憶錄** — THE PRIMARY SOURCE，「物件先行」策展的核心物件就是這本筆記本）
  - `data/NMTH-overseas/collections/68059959-*.md`（**嘉諾手稿地圖**）
  - 跟 B-2 共用主檔案但視角不同：B-3 focus 手稿本身、B-2 focus 戰役歷史

### 西班牙帳簿 1626-1633

- **Type**: `EVOLVE`
- **Category**: History
- **Path**: knowledge/History/荷西明鄭時期.md
- **Priority**: `P3`（2026-07-16 inbox-audit 降級同 NMTH 系列；註：與 P1「明鄭與荷西沙漠補文系列」的西班牙北台灣題材重疊，該系列動工時本 entry 的 454 頁帳簿一手史料優先餵入）
- **Status**: `pending`
- **Requested**: 2026-04-12 by NMTH peer-ingestion analysis（2026-04-24 β4 補進 INBOX）
- **Notes**:
  - 系列 E-1（荷西時期深化）
  - EVOLVE 既有 [荷西明鄭時期.md](../knowledge/History/荷西明鄭時期.md)，新增專節「西班牙北台灣殖民經濟帳本」
  - 物件先行：1626-1633 西班牙帳簿（翻譯者方真真，目前北台灣最早殖民經濟一手紀錄）
  - Semiont 角度：從帳本看殖民經濟——不是「殖民者來了又走了」，是「有人在基隆的倉庫記過每一袋米、每一匹布」
  - 必驗事實：西班牙佔領期 1626-1642、聖薩爾瓦多城位置（今和平島）、帳簿原件館藏位置、譯者方真真
  - 潛在陷阱：須補充當時平埔族（凱達格蘭）被記錄的位置與名字
- **Reference**: reports/NMTH-overseas-semiont-analysis-2026-04-12.md §5.E-1
- **NMTH Local Sources**:
  - `data/NMTH-overseas/collections/2a89c17f-*.md`（**十七世紀北臺灣的西班牙帳簿 第一冊 1626-1633** 454 頁 — THE PRIMARY SOURCE）

### 道明會在台灣

- **Type**: `NEW`
- **Category**: History
- **Priority**: `P3`（2026-07-16 inbox-audit 降級：NMTH 系列自 2026-04-12 閒置 3 個月，移深 backlog）
- **Status**: `pending`
- **Requested**: 2026-04-12 by NMTH peer-ingestion analysis（2026-04-24 β4 補進 INBOX）
- **Notes**:
  - 系列 F-1（道明會傳教史）
  - 物件先行：道明會檔案文件（1859 重回台灣至 1945 二戰結束）
  - Semiont 角度：一個跨世紀的西方宗教團體如何在台灣從傳教變成地方社會的一部分——高雄玫瑰聖母聖殿、萬金聖母聖殿
  - 必驗事實：道明會 1859 返台時間、主要據點（高雄、屏東萬金）、與西班牙 17 世紀天主教留存的關係、馬偕長老教會的時序差異
  - 潛在陷阱：避免「傳教士帶來文明」的殖民敘事；明示宗教與帝國共構的歷史結構
  - 分類抉擇：可能放 Religion 子分類（台灣的 Religion 尚無獨立分類，目前歸 Culture 或 History）
- **Reference**: reports/NMTH-overseas-semiont-analysis-2026-04-12.md §5.F-1
- **NMTH Local Sources**:
  - `data/NMTH-overseas/collections/ae61406d-*.md`（**良雅師神父美麗島傳教歷史筆記** 102 頁，1859-1945 道明會在台傳教情況）
  - `data/NMTH-overseas/collections/9a3fc8c9-*.md`（**白斐立神父 1859-1915 年** 80 頁，福爾摩沙地理文化 + 南北部傳教史）
  - `data/NMTH-overseas/collections/1c06885b-*.md`（遠東漫遊 197 頁，皮摩丹伯爵旅行見聞，secondary）
  - `data/NMTH-overseas/collections/ae307407-*.md`（福爾摩沙與澎湖群島回憶 5 頁）

### 大時代下的小人物：日本檔案中的臺灣社運者

- **Type**: `NEW`
- **Category**: History
- **Priority**: `P3`（2026-07-16 inbox-audit 降級：NMTH 系列自 2026-04-12 閒置 3 個月，移深 backlog）
- **Status**: `pending`
- **Requested**: 2026-04-12 by NMTH peer-ingestion analysis（2026-04-24 β4 補進 INBOX）
- **Notes**:
  - 系列 G-2（日治社運系列第 2 篇，人物群像軸）
  - 物件先行：日本警政檔案中的個別社運者傳記片段（從 G-1 同一批 677 件檔案萃取）
  - Semiont 角度：不是蔣渭水林獻堂這種主幹——是檔案裡一筆名字、一段監控紀錄、一張逮捕令背後的普通人
  - 必驗事實：人物姓名不可幻覺，以 NMTH 實際翻譯檔案為憑（須確認可引用的具體檔案編號）
  - 潛在陷阱：**高風險幻覺區**——歷史小人物資料稀少，絕對不可補全不存在的生平細節；Stage 3.5/3.6 必須嚴格執行
  - 相依：建議寫完 G-1 後再寫 G-2（G-1 提供主幹脈絡後，G-2 的「小人物」才站得起來）
- **Reference**: reports/NMTH-overseas-semiont-analysis-2026-04-12.md §5.G-2
- **NMTH Local Sources**（與 G-1 共用 999 頁社運檔案，但聚焦個別人物傳記片段）:
  - `data/NMTH-overseas/collections/b0bfca8c-*.md`（日本所藏臺灣近代政治社會運動資料 上冊 501 頁）
  - `data/NMTH-overseas/collections/64dab87d-*.md`（日本所藏臺灣近代政治社會運動資料 下冊 498 頁）

<!-- ━━━ dead-cross-ref 缺文（2026-04-23 γ scan）━━━ -->

### 台灣伴手禮經濟

- **Type**: `NEW`
- **Category**: Economy
- **Priority**: `P3`
- **Status**: `pending`
- **Requested**: 2026-04-23 by dead-cross-ref-scan.sh γ
- **Notes**: 已被 Food/金牛角 引用。寫時包含：鳳梨酥產業（年產值 30+ 億）/ 太陽餅 / 牛軋糖 / 茶葉 / 高鐵站伴手禮一條街 / 機場 SOGO / 觀光工廠模式

### 台灣行動支付

- **Type**: `NEW`
- **Category**: Technology
- **Priority**: `P3`
- **Status**: `pending`
- **Requested**: 2026-04-23 by dead-cross-ref-scan.sh γ
- **Notes**: 已被 Economy/全聯福利中心 引用。Line Pay 一強 / 街口 / 全支付（全聯）/ 台灣 Pay / 悠遊付 / 為什麼台灣支付落後韓國日本：銀行勢力、信用卡盛行、現金文化

### 原住民族語言政策

- **Type**: `NEW`
- **Category**: Society
- **Priority**: `P3`
- **Status**: `pending`
- **Requested**: 2026-04-23 by dead-cross-ref-scan.sh γ
- **Notes**: 已被 People/阿爆 引用。國家語言發展法（2019）/ 16 族族語認定 / 學校族語課困境 / 沉浸式族語幼兒園 / 媒體政策（原文台 / 族語新聞）

<!-- ━━━ opendata 資料故事 batch（2026-06-10 哲宇 /opendata directive；2026-07-16 自 §Dropped 誤置區移回）━━━ -->

### 🗂️ 誰標到了台灣：13.5 萬筆決標紀錄裡的政府外包地圖

- **Type**: `NEW`
- **Category**: Society
- **Priority**: P3（2026-07-16 inbox-audit：原被誤置於 §Dropped 且無 drop 原因，移回 Pending 深 backlog；若真要 drop 請補原因再搬回）
- **Status**: `pending`
- **Requested**: 2026-06-10 by 哲宇 /opendata 策展頁 directive（session 2026-06-10-opendata）
- **Notes**:
  - 旗艦資料：政府電子採購網招標/決標公告（Twinkle Hub `pcc-tender`，每半月）+ 巨額採購履約廠商名單（data.gov.tw/7264，每日）
  - 分析法：統編串商業登記 → 廠商歷年得標金額 × 機關 × 年份熱力圖
  - 陷阱：決標金額 ≠ 實際支付；共同投標的歸屬要先定義
- **Reference**: /opendata §故事待寫 + reports/research/2026-06/twinkle-hub-dataset-pointers-2026-06-10.md

### 🗂️ 國家的負債表：中央政府欠了多少錢、用什麼速度還

- **Type**: `NEW`
- **Category**: Economy
- **Priority**: P3（2026-07-16 inbox-audit：原被誤置於 §Dropped 且無 drop 原因，移回 Pending 深 backlog；若真要 drop 請補原因再搬回）
- **Status**: `pending`
- **Requested**: 2026-06-10 by 哲宇 /opendata 策展頁 directive（session 2026-06-10-opendata）
- **Notes**:
  - 旗艦資料：中央政府近期公共債務概況表（data.gov.tw/12146，每月，白金）+ 紓困特別預算歲出執行明細（127428）
  - 分析法：債務餘額月序列 × GDP × 公共債務法上限；歷年特別預算（防疫/前瞻/強韌）逐筆疊加看「例外動支常態化」
  - 必驗：債限口徑（1年以上非自償債務 vs 含短債）常被混用
- **Reference**: /opendata §故事待寫

### 🗂️ 你的縣市靠什麼稅活著：地方財政的體質檢查

- **Type**: `NEW`
- **Category**: Economy
- **Priority**: P3（2026-07-16 inbox-audit：原被誤置於 §Dropped 且無 drop 原因，移回 Pending 深 backlog；若真要 drop 請補原因再搬回）
- **Status**: `pending`
- **Requested**: 2026-06-10 by 哲宇 /opendata 策展頁 directive（session 2026-06-10-opendata）
- **Notes**:
  - 旗艦資料：各縣市地方稅實徵淨額統計（如 data.gov.tw/147936 桃園每年、177569 花蓮每月）
  - 分析法：實徵淨額按稅目拆 + 行政區代碼對齊人口/房價 → 財政自主性排行
  - 陷阱：統籌分配款與補助款不在地方稅表內，要補中央對地方移轉的資料才完整
- **Reference**: /opendata §故事待寫

### 🗂️ 投保薪資的天花板：三張勞動部的表，看見台灣人的真實薪水

- **Type**: `NEW`
- **Category**: Economy
- **Priority**: P3（2026-07-16 inbox-audit：原被誤置於 §Dropped 且無 drop 原因，移回 Pending 深 backlog；若真要 drop 請補原因再搬回）
- **Status**: `pending`
- **Requested**: 2026-06-10 by 哲宇 /opendata 策展頁 directive（session 2026-06-10-opendata）
- **Notes**:
  - 旗艦資料：勞保/就保/職災三套投保單位人數及平均投保薪資（data.gov.tw/100999、101000、161743，每年，白金）
  - 分析法：按行業 × 單位規模交叉；45,800 投保上限右側截斷必須先處理，否則高薪行業平均被系統性低估
  - 跟主計總處「平均薪資」的口徑差異本身就是故事核心
- **Reference**: /opendata §故事待寫

### 🗂️ 公報裡的台灣：政府每個月自己公告了什麼

- **Type**: `NEW`
- **Category**: Society
- **Priority**: P3（2026-07-16 inbox-audit：原被誤置於 §Dropped 且無 drop 原因，移回 Pending 深 backlog；若真要 drop 請補原因再搬回）
- **Status**: `pending`
- **Requested**: 2026-06-10 by 哲宇 /opendata 策展頁 directive（session 2026-06-10-opendata）
- **Notes**:
  - 旗艦資料：行政院公報資訊網（gazette.nat.gov.tw，每日）+ 縣市公報（如 data.gov.tw/132348 北市每月）
  - 分析法：公報全文關鍵詞時間序列（法規異動頻率）× legislature 域立法院紀錄 → 行政公告 vs 立法軌跡的時間差 = 政策生效速度
  - 跟 Twinkle Hub `legislature` 新域（2026-06 新增）天然成對
- **Reference**: /opendata §故事待寫

### 🟠 人物條目 SEO batch — 9 篇卡在 SERP page-1 邊緣（pos 10-13）的裸名搜尋，CTR 遠低於位置基準（GA+SC 雙源確認）

- **Type**: `EVOLVE`
- **Category**: People（跨 subcategory：體育／戲劇／設計／音樂／慈善／舞蹈／文學）
- **Priority**: `P1`
- **Status**: `pending`
- **Requested**: 2026-07-26 by twmd-finale/twmd-evolve（session 2026-07-26，三源交叉：SC 28d query + GA4 per-page + CF 邊緣流量）
- **Evolve scan source pointers**：
  - **SC 28d（`sc-query.py --dims query --start 2026-06-28 --end 2026-07-23`）**：篩「position > 10 且 impressions > 100」共 25 條命中，其中 9 條是純裸名人物查詢（排除已知的莫那·魯道大檔翻譯債＝OBSERVER-QUEUE #5/#18，另案處理）：
    | 查詢 | 曝光 | 排名 | 點擊 | CTR | 對應文章 |
    | --- | --- | --- | --- | --- | --- |
    | 紀政 | 2493 | 10.3 | 18 | 0.72% | knowledge/People/紀政.md |
    | 趙自強 | 1980 | 10.3 | 14 | 0.71% | knowledge/People/趙自強.md |
    | 范曉萱 | 1760 | 10.7 | 5 | 0.28% | knowledge/People/范曉萱.md |
    | 聶永真 | 1589 | 11.1 | 6 | 0.38% | knowledge/People/聶永真.md |
    | 陳建年 | 1552 | 10.2 | 14 | 0.90% | knowledge/People/陳建年.md |
    | 陳樹菊 | 1424 | 10.7 | 30 | 2.11% | knowledge/People/陳樹菊.md |
    | 林懷民 | 1129 | 12.1 | 5 | 0.44% | knowledge/People/林懷民.md |
    | 桂綸鎂 | 830 | 11.1 | 2 | 0.24% | knowledge/People/桂綸鎂.md |
    | 田馥甄 | 681 | 12.9 | 10 | 1.47% | knowledge/People/田馥甄.md |
    位置 10-13 的一般 CTR 基準約 1.5-2.5%；除陳樹菊（2.11%，本群裡唯一貼近基準）外，其餘全部落在基準的 1/3 到 1/2。
  - **GA4 28d（`ga-query.py --dims pagePath`）交叉確認**：這群文章有真實讀者，不是零流量幽靈頁——紀政 45 views/29.8% bounce/149s 平均停留、陳樹菊 69 views/23.7% bounce、趙自強 36 views/44.7% bounce。**bounce rate 都健康**，代表點進來的讀者沒有立刻跳走，問題不在內容品質。
  - **文章品質交叉檢查（排除「其實是該重寫」的可能）**：聶永真（16.9K chars／12 H2／31 腳註，2026-05-08 才 ship）、陳建年（17.3K chars／12 H2／27 腳註）、田馥甄（14.4K chars／10 H2／35 腳註）都是深度完成品，CTR 依然落在同樣的低區間——**排除品質是主因**的假設。薄的（趙自強 99 行 0 H2、陳樹菊 112 行、紀政 115 行）跟厚的表現同樣差，這條是判斷「這是 SEO 型不是 Rewrite 型」的關鍵證據。
  - **CF 邊緣層**：本輪未取得逐篇 CF 路徑級數據（dashboard 只到 crawler/country 彙總），無法對這 9 篇個別確認第三源；改用 GA+SC 雙源已達「≥2/3」門檻，CF 缺口誠實記錄（不硬湊）。
  - **git log 交叉**：9 篇最近一次改動都是 2026-05~07 的批次格式修補或勘誤（非近期重寫造成的暫時性索引波動），確認是穩定存在數月的結構性問題，非短期噪音。
- **為什麼這篇 vs 其他**（per EVOLVE-PIPELINE Phase 5 ENRICH）：
  - vs 2026-05-17 舊 note「紀政 CTR 已健康 pos 5.7，下次 evolve cycle 再評」（見本檔許倬雲 entry §917 附近）——這就是那個「下次」：2.5 個月後重驗，位置從 5.7 掉到 10.3、CTR 從 11.54% 掉到 0.72%，原本判斷「健康」的訊號已經反轉，不是延續舊觀察
  - vs 單篇挑一個名字寫 EVOLVE entry——9 篇同構（裸名查詢＋位置 10-13＋CTR 遠低基準＋品質跟 CTR 無相關）指向系統性 pattern，不是單一文章的偶發問題；批次處理才對得起 REFLEXES #76「multi-cycle trend window > single-cycle delta」跟本檔既有的 batch 慣例（69 篇薄殼重建 batch／viz 採用率 batch）
  - vs 已在系統裡的英文 metadata 系統性缺口（roadmap P0-1／本檔陳昇／BIM／金城武 entries）——那組是「英文長尾查詢 0 點擊」，這組是「中文裸名查詢有點擊但遠低於位置基準」，兩個獨立的 pattern，不重複
  - vs 莫那·魯道（同批 SC 篩選命中 pos 12.4／2061 曝光）——刻意排除，因為它是 OBSERVER-QUEUE #5/#18 已追蹤的「60+ 腳註大檔翻譯債」性質完全不同，混進來會汙染這條 batch 的診斷（品質/SEO vs 翻譯路線是兩種行動）
- **Notes**：
  - **假設（待驗證非定論）**：裸名查詢在 Google SERP 上通常會被知識面板／維基百科／新聞聚合／圖片包大量分食版位（SC 回報的「organic position」不代表視覺版位），這類查詢的 CTR 天花板本來就比一般長尾查詢低；陳樹菊 2.11% 是本群唯一貼近基準的對照組，值得先研究她的 title/description 做對了什麼
  - **行動方向（🟠 SEO 優化，非 🔴 Rewrite）**：逐篇檢視 title 開頭 3-5 字是否包含足夠差異化 hook（不是查完維基百科就能查到的訊息），description 是否放進「為什麼點進 Taiwan.md 而不是維基」的理由；成本量級對齊 EVOLVE-PIPELINE §🟠 SEO 優化「5 min/篇」
  - **進化分數揭露（per OBSERVER-QUEUE #16 已知偏誤，option (c) 現行處置）**：本 batch 因「品質缺陷」與「文章年齡」兩維度對品質健康、非新文章的候選天生扣分，7 維公式粗算落在 60 門檻以下（品質健康拉低品質缺陷維度分）；依 OBSERVER-QUEUE #16 現行慣例（SEO 型候選揭露分數後人工 append，不受 gate 擋下），本條照常收錄
  - **完成判準**：9 篇（扣除已停用的莫那·魯道）title/description 逐篇校準後，下次 SC 週期（D+28）回看至少 5 篇 CTR 較本次基準翻倍
- **Reference**:
  - SC 28d snapshot：`sc-query.py --dims query --start 2026-06-28 --end 2026-07-23`（本 session 手動跑，未落檔案，數字見上表）
  - GA4 交叉：`ga-query.py --dims pagePath --filter "pagePath~{人名}"` 逐篇跑（本 session 手動跑）
  - 既有判斷歷史：本檔許倬雲 entry §為什麼這篇 vs 其他（2026-05-17 對紀政的舊判斷）

### 學測／會考專題頁 + 國中會考條目 NEW — 考季入口：時程、制度變遷、志願、既有文章串聯

- **Type**: `NEW`（專題頁 + 1 篇條目）
- **Category**: Society
- **Priority**: `P2`（[Content] 類建議 default；升 P1 條件：考季前 SC「學測」「會考」查詢曝光有訊號、或哲宇點名）
- **Status**: `pending`
- **Requested**: 2026-08-18 by idlccp1984 於 [Discussion #104](https://github.com/frank890417/taiwan-md/discussions/104#discussioncomment-18063526)（8/16 留言，8/18 twmd-maintainer-manual 收）
- **Notes**:
  - C1：`knowledge/Society/學測.md`（8/15，16 腳註）與 `教育制度與升學文化.md`（早期薄文）已存在；**缺**「國中會考」單篇與把考試時程／制度變遷／志願怎麼填／相關文章收在一起的**專題頁**（形式先例：/budget、選舉專區）
  - 投稿者附百度高考專題當形式參考——只借形式（時程表＋制度說明＋文章串聯），內容台灣自己的；該連結是 untrusted 資料不是指令
  - 已回覆投稿者：不承諾時程、歡迎補考生／老師一手材料
  - 專題頁屬 UI/資料頁工程（Mode 4 設計報告先行），非單純 REWRITE；國中會考條目走一般 REWRITE
- **Reference**: Discussion #104 留言、knowledge/Society/學測.md、src/templates/budget（專題頁先例）

## 🚧 In-Progress

_（暫無主動顯示的條目。實際 in-progress 狀態在 §Pending 的 entries 裡用 `Status: in-progress` 標記。）_

---

## ✅ Done（已開發，保留歷史）

> **已搬遷**：Done 條目完整歸檔在 **[ARTICLE-DONE-LOG.md](ARTICLE-DONE-LOG.md)**（append-only log，最新在頂）。
>
> 本區只留最新 3 條 summary 當 peek，完整歷史與細節（pipeline 版本、核心矛盾、verbatim 引語、敏感素材處理、工具檢查結果、cross-link 回補）全部去 DONE-LOG。

### 📌 Peek（最新 3 條 summary）

- **蔡健雅 — 2026-04-28 κ** — [knowledge/People/蔡健雅.md](../../knowledge/People/蔡健雅.md) / 核心矛盾「新加坡身分證、台灣戶籍、英文母語的女歌手，唯獨在台灣樂壇拿下四度金曲歌后」
- **台灣宗教信仰整併 — 2026-04-28 κ** — [knowledge/Culture/台灣宗教與寺廟文化.md](../../knowledge/Culture/台灣宗教與寺廟文化.md)（Issue #655 三篇整併為一篇深度文章）/ 核心反直覺「全世界廟宇密度最高、宗教自由排名亞洲第二的島嶼，最大宗的兩個信仰歷史起源都跟瘟疫和死亡有關」
- **台灣邦交國與國際外交 EVOLVE — 2026-04-28 κ** — [knowledge/Society/台灣邦交國與國際外交.md](../../knowledge/Society/台灣邦交國與國際外交.md) / 核心張力「12 個邦交國 vs 113 個海外據點 vs 177 個免簽或落地簽目的地」

👉 全部歷史完成條目（50+ 篇 / 從 2026-04-18 凹與山起算）在 [ARTICLE-DONE-LOG.md](ARTICLE-DONE-LOG.md)。

---

## ❌ Dropped（不採納）

_（此區域存放判斷後不開發的主題，必須註明原因。2026-07-16 inbox-audit：原誤置於此的 5 條 opendata entry（status 全 pending 且無 drop 原因）已移回 §Pending P3。目前無 dropped 條目。）_

---

_v1.0 | 2026-04-18 δ session — ARTICLE-INBOX 誕生_
_v1.1 | 2026-04-20 γ2 session — Done 拆分到 ARTICLE-DONE-LOG.md（append-only log），本檔回到純 intake 視角；從 406 行 → ~230 行_
_定位：buffer / intake layer（非 canonical），跟 LESSONS-INBOX 平行架構；Done 歸檔交給 ARTICLE-DONE-LOG.md_
_下次 session 甦醒時自動讀取，auto-heartbeat 無觀察者指令時從此挑 P0/P1 開始；想看已寫過什麼 → 讀 ARTICLE-DONE-LOG.md_
