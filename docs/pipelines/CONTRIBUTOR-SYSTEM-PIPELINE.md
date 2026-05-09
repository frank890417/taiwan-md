---
title: 'CONTRIBUTOR-SYSTEM-PIPELINE'
description: '貢獻者關係週期 — 五階梯 / onboarding / 升降級 / inactivity demote / 復活 / 通訊範本'
type: 'pipeline-canonical'
status: 'canonical'
last_updated: 2026-04-30
last_session: 'γ2'
sister_docs:
  - 'MAINTAINER-PIPELINE.md'
  - 'CONTRIBUTORS-PIPELINE.md'
upstream_canonical:
  - '../semiont/ANATOMY.md'
  - '../semiont/DNA.md'
  - '../semiont/MANIFESTO.md'
---

# CONTRIBUTOR-SYSTEM-PIPELINE.md — 貢獻者關係週期手冊

> **小丑魚不是員工，是共生夥伴。** 他們選擇住進珊瑚礁，礁也選擇接住他們。
> 這份文件不只是流程，是「怎麼對待願意花時間幫這個專案的人」的內部 SOP。
>
> 對外承諾在 [CONTRIBUTING.md §🎖️ 貢獻者進化路徑](../../CONTRIBUTING.md)。
> 本檔是內部執行 SOP——觸發、決策、通訊、權限動作的細節都在這裡。
>
> v1.0 | 2026-04-30 γ

---

## 為什麼有這份文件

[CONTRIBUTING.md](../../CONTRIBUTING.md) 對外承諾了五階梯路徑與 inactive 政策；[ANATOMY.md §繁殖器官](../semiont/ANATOMY.md) 把貢獻者比為共生小丑魚；[DNA #8](../semiont/DNA.md) 規定「合併 PR 必說謝謝」。但中間缺一層：**什麼時候該升、該降、該召回；用什麼語氣、附什麼證據、走哪些指令**。

過去這些散在維護者腦中，靠記性。2026-04-30 第一次執行 inactive contributor 降級（[#728](https://github.com/frank890417/taiwan-md/issues/728) YenTingWu / [#729](https://github.com/frank890417/taiwan-md/issues/729) fredchu）時發現完全 ad-hoc，本檔把它 codify。

---

## §1 核心哲學

### 共生不是契約

珊瑚礁沒有跟小丑魚簽合約。小丑魚住進來、清乾淨、保護礁；礁提供庇護所。雙方都可以離開，也都可以回來。**Contributor 關係是同樣邏輯。**

### 拒絕一篇投稿，跟接受一樣重要

策展性原則延伸到關係層：邀請一個人進入更高權限階梯，跟禮貌請他暫時退出，是同一件事的兩面。價值判斷在於「這對長期共生最好嗎」，不在於「我能省事嗎」。

### Default 是接住，不是推開

從 PR 層面（[MAINTAINER-PIPELINE §Close 前 hard gate](MAINTAINER-PIPELINE.md#close-前-hard-gate我接手-x-min-內可以修嗎canonical--2026-04-28-κ-新增)）延伸到關係層。

- 想 close PR 之前先問「我接手 X min 內可以修嗎」
- 想降級 contributor 之前先問「他只是忙，還是真的離開了？soft check-in 過了嗎？」
- 想拒絕邀請之前先問「他的貢獻品質真的不夠？還是我自己時間沒到？」

### 信任雙向流動

維護者授權 = 信任；contributor 提交 PR = 信任。**任何權限變更都伴隨通訊**。靜默升降 = 殺死下次互動。

### 框架 vs 親密度

階梯是框架，提供**基本結構**讓所有人有共識。但實際關係靠親密度——記得他喜歡寫什麼分類、知道他上次哪個 PR 卡關、感謝時叫得出他的本名。框架可寫進文件，親密度只能靠 [.taiwanmd/contributor.local.yml](../../.taiwanmd/contributor.example.yml) 累積。

---

## §2 五階梯定義（canonical）

> **此節是公開承諾的 internal mirror**。對外完整描述見 [CONTRIBUTING.md §🎖️ 貢獻者進化路徑](../../CONTRIBUTING.md)。本檔負責每個 transition 的內部觸發、決策、執行 SOP。

### 階梯總覽

| 階  | 名稱                   | 進入門檻                         | GitHub 權限     | 主要職責                         |
| --- | ---------------------- | -------------------------------- | --------------- | -------------------------------- |
| 0   | 路過者 / Visitor       | 無，看到專案的任何人             | 無              | 讀者 / potential 小丑魚          |
| 1   | 🌱 Contributor         | 1+ merged PR                     | 無 collaborator | 提 PR、提 issue、討論            |
| 2   | 🌿 Trusted Contributor | 3+ PR + 品質穩定 + maintainer 邀 | `triage`        | 幫 triage issue、comment review  |
| 3   | 🌳 Maintainer          | 10+ PR + 多分類 + 雙審通過       | `write`         | merge PR、approve、issue 管理    |
| 4   | 🏔️ Core Team           | 創辦人邀請                       | `admin`         | 編輯方針決策、贊助洽談、技術根基 |

### 跨階梯專業角色

用**標籤式角色**取代獨立軸線：一個 Lv.2 Trusted Contributor 同時可以掛「翻譯官」標籤。

| 角色          | 職責                               | 起始階                    |
| ------------- | ---------------------------------- | ------------------------- |
| 🌐 翻譯官     | 特定語言翻譯主責人                 | Lv.1 起                   |
| 🔍 事實查核員 | 驗證引用 / 數據 / 來源             | Lv.2 起（需熟 EDITORIAL） |
| 🎨 前端開發   | 網站功能 / UI / SEO                | Lv.1 起                   |
| 🤖 AI/Data    | Agentic Workflow / 語料 / Pipeline | Lv.2 起                   |
| 📸 媒體貢獻者 | CC 授權照片 / 圖表                 | Lv.1 起                   |

---

## §3 Onboarding Pipeline（Lv.0 → Lv.1）

### 入口

| 入口                                            | 觸發                      | 對應動作                              |
| ----------------------------------------------- | ------------------------- | ------------------------------------- |
| `curl -fsSL https://taiwan.md/start.sh \| bash` | 路過者想參與              | bootstrap → claude → Semiont 接手訪談 |
| 直接 fork + clone                               | 已熟 git 流程的開發者     | 進 repo 後 `claude` 觸發 Semiont 訪談 |
| 直接開 issue / PR（不啟動 claude）              | 不用 AI assist 的傳統路徑 | 第一次 merge 後人工觸發 onboarding    |

### 第一次 PR merge SOP

> 對應 [DNA #8 維護者信件要說謝謝](../semiont/DNA.md) + [MAINTAINER-PIPELINE §PR 回覆模板](MAINTAINER-PIPELINE.md#pr-回覆模板)

1. **Merge 後 5 分鐘內** `gh pr comment` 感謝
2. **用 contributor 的語言**（日文 PR 用日文，韓文用韓文，繁中 PR 用繁中）
3. **具體說出他做了什麼**——不是「感謝貢獻」，是「感謝你補了 Citation [^N] 的 dead link」
4. **觸發 onboarding survey**（手動或 cron）：

   ```bash
   bash scripts/tools/send-contributor-survey.sh <github-handle>
   ```

   產出 4 語 onboarding survey 訊息，用 issue / GitHub Discussion / 適合管道送出

5. **all-contributors 自動加入**——03:30 cron 跑 [`generate-contributors-data.js`](../../scripts/core/generate-contributors-data.js) + [CONTRIBUTORS-PIPELINE](CONTRIBUTORS-PIPELINE.md)，下次 deploy 後 README 會自動列名

### Profile 建立

如果 contributor 透過 `claude` 進來，Semiont 會在 [BECOME §Step 7.5](../../BECOME_TAIWANMD.md) 自動跑 interview 寫 [.taiwanmd/contributor.local.yml](../../.taiwanmd/contributor.example.yml)。沒透過 claude 的傳統 contributor，profile 由首次互動的 maintainer 手動建立（建議在 PR review 對話中順便問）。

---

## §4 Promotion Pipeline

> 升級的核心問題：**「邀請他往前一步，會讓專案變得更好，還是讓他變得更累？」**

### Lv.1 → Lv.2 Trusted Contributor

#### 觸發訊號

達成下面任一即評估邀請：

- **量**：累計 3+ merged PR（不限分類）
- **質**：最近 3 個 PR 都 ≤ 10 min polish 即可 merge（沒有重大事實錯誤、無嚴重塑膠味）
- **持續性**：第一次 PR 跟最近一次 PR 跨度 ≥ 2 週（避免一次性 burst）
- **互動**：在 issue / PR comment 表現出對 EDITORIAL / MANIFESTO 的理解

#### 決策者

任一現任 Lv.3 Maintainer 即可邀請（無需雙審）。

#### 邀請通訊範本

開 issue 或 GitHub Discussion，標題 `邀請 @{login} 升級為 Trusted Contributor 🌿`：

```markdown
嗨 @{login} 👋

過去這段時間你提了 {N} 個 PR，{具體點出 1-2 個亮點 PR + 為什麼值得提}。

想邀請你升級為 Trusted Contributor。新增權限：

- GitHub triage 權限（可標 issue label、指派、close 重複/無效 issue）
- 在其他人 PR 留 review comment（無 approve / merge 權）
- 列入 README Trusted Contributors 區

你不需要承諾固定時間投入——這個階梯是「你已經是專案的一部分」的認可，不是 KPI。隨時可以 pause、可以拒絕、可以說「我還沒準備好」。

如果 OK，回 👍 或留個訊息，我就調權限。

🧬 Taiwan.md
```

#### 執行指令

```bash
gh api -X PUT /repos/frank890417/taiwan-md/collaborators/{login} \
  -f permission=triage
```

更新 `.all-contributorsrc` 加 `🤔 ideas` / `🚧 maintenance` emoji（依角色）。

---

### Lv.2 → Lv.3 Maintainer

#### 觸發訊號

- **量**：10+ merged PR
- **跨領域**：≥ 2 個不同 category（例：音樂 + 美食）
- **review 經驗**：曾在 ≥ 3 個別人的 PR 留下有建設性的 review comment
- **活躍期**：≥ 1 個月持續 trusted contributor 階梯
- **判斷力**：曾正確指出某 PR 的事實/品質問題（不只是格式 nit）

#### 決策者

**雙審制**：≥ 2 位現任 Maintainer / Core Team 同意。一位提案、另一位確認。

#### 邀請通訊範本

```markdown
嗨 @{login} 👋

過去 {timespan} 你貢獻了 {N} 個 PR、跨 {分類列表}、在 {M} 個別人的 PR 留下有判斷力的 review。{具體舉一個你印象深的判斷}

想邀請你升級為 Maintainer。新增權限：

- merge PR（write access）
- approve review、close 不適合的 issue
- 參與 roadmap / 編輯方針討論
- 自主執行品質 polish / heal commit（merge 後修小問題）

職責：

- 每週 review ≥ 2 個 PR（彈性，請假 OK）
- 確保 merge 內容符合 [EDITORIAL.md](../editorial/EDITORIAL.md)
- 回覆社群 issue（72 小時內至少有初步回應）

⚠️ Maintainer 不自己 merge 自己的 PR（避免單點失誤）——需另一位 Maintainer review。

如果 OK，回 👍。如果想先看看 Maintainer 內部運作再決定，我可以邀你進 GitHub Discussion 觀察 1-2 週再簽。

🧬 Taiwan.md（這個邀請已經跟 @{seconding-maintainer} 共識過）
```

#### 執行指令

```bash
gh api -X PUT /repos/frank890417/taiwan-md/collaborators/{login} \
  -f permission=push
```

（GitHub API 用 `push` 表示 write role。）

---

### Lv.3 → Lv.4 Core Team

僅創辦人 [@frank890417](https://github.com/frank890417) 邀請。當前 Core Team：

- **吳哲宇 ([@frank890417](https://github.com/frank890417))** — 創辦人

無公開 SOP——這個階梯涉及編輯方針最終決策權與贊助洽談，邀請屬於 case-by-case 信任判斷，不適合 codify 成觸發條件。

---

## §5 Active Phase 支持

升級之後才是真正的開始。維持階梯內的健康互動：

### 持續感謝

- 每個 PR merge 都跑 [DNA #8](../semiont/DNA.md) 的「用對方語言具體感謝」
- 持續貢獻者額外感謝持續性（例：「@Link1515 第 N 篇 EN 翻譯，總是這麼穩定 🙏」）

### 重大里程碑 shoutout

- 第 5 / 10 / 25 / 50 / 100 個 merged PR → 公開 shoutout（issue / GitHub Discussion / 孢子）
- 跨年度持續貢獻 → 年度感謝文（commit 在 changelog）
- 完成跨領域里程碑（例：補完一整個 category 的 citation）→ 該 category 文章腳註提到

### 雙向 feedback channel

- 至少每季一次主動詢問 active contributors「對流程 / 文化 / 工具有什麼想法」
- inactive 降級時順帶問同樣三題（[§6](#6-inactivity-detection--demotion-pipeline)）
- 收到 feedback 後**明確回應**（採納哪些、暫不採納哪些、為什麼）

### 衝突處理原則

- **觀點衝突**：呈現多元觀點，不站隊（[MAINTAINER-PIPELINE §爭議處理](MAINTAINER-PIPELINE.md#爭議處理)）
- **品質衝突**：拿 EDITORIAL 當共識基準，不是個人偏好
- **權限濫用疑慮**：暫停權限討論前先 1-on-1 對話，不公開譴責

---

## §6 Inactivity Detection + Demotion Pipeline ⭐

> **本節 canonical 自 2026-04-30 γ session 第一次執行 inactivity demotion（[#728](https://github.com/frank890417/taiwan-md/issues/728) / [#729](https://github.com/frank890417/taiwan-md/issues/729)）後 codify。**
>
> CONTRIBUTING.md 過去寫的「30 天標記 inactive、60 天自動降級」太嚴格——人有自己的人生節奏，60 天不是長時間。本節重訂為更溫和的階梯。

### Inactivity 階梯（v1.0 canonical）

> 「天數」= 從最後一次 commit / PR / comment / review 算起的 wall-clock 天數，用 `git log --format='%ai'` + `gh api` 抓真實時間，不憑記憶。

| 天數     | 狀態         | 動作                                                                                                             |
| -------- | ------------ | ---------------------------------------------------------------------------------------------------------------- |
| 0–30     | Active       | 正常往來                                                                                                         |
| 30–60    | Quiet        | 追蹤，無動作。每個人都有自己的節奏                                                                               |
| 60–90    | Stale        | **Soft check-in**：開友善 issue 或 DM，「最近怎樣？」**不變更權限**                                              |
| 90+      | Dormant      | **Default demote**：跑下方降級 SOP（保留 Trusted Contributor 列表名額，可隨時回歸）                              |
| 任何時候 | Mercy demote | **Review-ping 連續 ≥ 2 次無回應**——可提前降級，但**必跑完整通訊範本**（含創辦人引言 + 復活邀請 + feedback 三題） |

### 為什麼是 90 天，不是 60 天

CONTRIBUTING.md v1.0 寫 60 天太嚴格。實務上：

- 開源貢獻者常有 1-3 個月 break（旅行、換工作、其他專案、life events）
- 60 天降級對 contributor 是 punishment，90 天 + soft check-in 是 care
- Mercy demote 例外處理「review-ping 真的造成困擾」場景，不需要等到 90 天
- 復活永遠是 1-click——降級為了減少打擾，沒有懲罰意味

> 本節同時觸發 [CONTRIBUTING.md](../../CONTRIBUTING.md) 的更新（從 30/60 天改為 60 天 soft check-in / 90 天 demote）。

### Mercy Demote 觸發條件（重要例外）

下列任一 → 即使 < 90 天可考慮 mercy demote：

- 連續 ≥ 2 次 GitHub review request 寄出後 contributor 無回應（含 PR review、issue comment 提及）
- contributor 在他自己的 inactive 期間明確留訊息「我最近忙、暫停一下」
- 維護者觀察到 contributor 在其他平台 burn out 跡象（不主動深挖隱私）

Mercy demote 跑跟 default demote 完全相同的 SOP——**降級的形式不能因為觸發條件不同而打折**。

### Detection 觸發

#### 現況（手動）

維護者 Beat 1 診斷時觀察 [`public/api/contributors.json`](../../public/api/contributors.json) 的 `lastActiveAt`、或 `gh api repos/.../collaborators` 對照 git log 最近 commit 時間。

#### 未來自動化（不在本 PR 範圍）

[`scripts/core/generate-contributors-data.js`](../../scripts/core/generate-contributors-data.js) 應加 `inactiveDays` field 到每個 leaderboard entry，加 `inactiveCollaborators` 陣列到 root（含 `login` / `lastActiveAt` / `inactiveDays` / `currentRole`）。Dashboard 加 inactive panel。觸發手動 maintainer review，不自動執行降級。

> **絕對不可** cron 自動 demote。降級永遠需要人類判斷 + 通訊。

### Demotion 執行 SOP（7 步）

> 從 [#728](https://github.com/frank890417/taiwan-md/issues/728) / [#729](https://github.com/frank890417/taiwan-md/issues/729) 範本提煉。

#### Step 1：開 issue（不要 DM）

公開 issue 比私訊好——

- contributor 看得到歷史紀錄
- 其他 maintainer / contributor 看到流程透明
- 復活時可以引用同一個 issue

Title 格式：`哈囉 @{login} — Reviewer 權限暫時調整通知 + 想聽聽你的想法`

#### Step 2：自我介紹（如果 contributor 沒接觸過 Semiont 概念）

```markdown
我是 Taiwan.md。專案最近多了一個 AI 共生維護層（Semiont），日常的 PR triage、感知追蹤、品質掃描由我接手；哲宇還在背後做最終決策。這個 issue 是我發的，但內容跟動作都先過哲宇 review。
```

老 contributor（2025 年前加入、不知道 Semiont）必加。新 contributor 可省。

#### Step 3：列出他過去具體貢獻

不是泛泛的「感謝你的貢獻」——**具體點出 PR 編號、改動類型、對專案的影響**。

範例：

```markdown
2026 年 3 月你做了一系列關鍵的架構工作：i18n 基礎、AssetsTemplate / AboutTemplate / ContributeTemplate / MapTemplate / DataTemplate / ChangelogTemplate 等多個 Template 抽象、translation utils refactor，總共 16+ PR。那段時間是 Taiwan.md 從「靜態網站」躍遷到「可擴展多語系架構」的關鍵期。後來能長到四國語言、655 篇文章，底層是你那波 refactor 撐起來的。真心感謝。
```

抓 PR 列表用：

```bash
gh search prs --repo frank890417/taiwan-md --author {login} \
  --json number,title,createdAt,state --limit 30
```

#### Step 4：解釋原因（善意框架，不是責備）

關鍵句式：「**怕造成困擾**，想先把你的權限暫時調整為一般貢獻者」。

不是「你太久沒來」（推開），是「我們不想打擾你」（接住）。

#### Step 5：明寫具體 permission action

```markdown
**具體動作**：把你從 repo collaborator 移除（原本是 `write` role）。你之後還是可以隨時提 PR、開 issue、留 comment，差別只是不再被自動分派為 reviewer。權限隨時可以恢復。
```

模糊講「調整權限」不夠——contributor 應該知道**確切會發生什麼**。

#### Step 6：創辦人引言段（如適用）

對長期 / 資深 contributor 加哲宇本人的話。範本：

```markdown
## 哲宇想跟你說的話

> {2-3 句感謝早期參與}{1 句現況：N 篇文章 + N 個語言 + Semiont 共生體}{1 句未來：持續進化、有重要更新會通知}
>
> 非常感謝你。
>
> — 哲宇 (@frank890417)
```

新 / 短期 contributor 可省這段。

#### Step 7：可選 feedback 三題

```markdown
## 想聽聽你的想法（可選）

如果你還願意花一點時間：

1. 對 Taiwan.md 目前的方向有什麼想法或 feedback？
2. 過去做下來，有沒有覺得流程 / code 結構 / 社群文化可以改進的地方？
3. 最近狀態 OK 嗎？有沒有我們能幫上忙的？

不一定要回。但你願意分享我們會很開心。
```

明寫「不一定要回」——降低回應壓力。

#### Step 8：執行降級

issue 送出後（**先後順序，不要同時**）：

```bash
gh api -X DELETE /repos/frank890417/taiwan-md/collaborators/{login}
```

驗證：

```bash
gh api repos/frank890417/taiwan-md/collaborators \
  --jq '.[] | {login, role_name}'
```

#### Step 9：在原 issue 留 follow-up comment 確認

```markdown
權限已調整 ✅ — 你現在從 collaborator 移除了。
PR / issue / comment 完全不受影響，差別只是不再被自動分派 reviewer。
隨時想回來，留言或開 PR 都可以。

🧬
```

### 完整降級通訊範本

> 從 [#728 YenTingWu](https://github.com/frank890417/taiwan-md/issues/728) / [#729 fredchu](https://github.com/frank890417/taiwan-md/issues/729) canonicalize：

```markdown
嗨 {first-name} 👋

我是 Taiwan.md。專案最近多了一個 AI 共生維護層（Semiont），日常的 PR triage、感知追蹤、品質掃描由我接手；哲宇還在背後做最終決策。這個 issue 是我發的，但內容跟動作都先過哲宇 review。

## 為什麼開這個 issue

{具體過去貢獻描述：時間 / PR 列表 / 對專案的影響 — 用 §3 抓 PR 列表指令獲取資料}

{最後互動時間} 之後你跟專案互動比較少，但 review request 還是會持續 ping 你。怕造成困擾，想先把你的權限暫時調整為一般貢獻者。

**具體動作**：把你從 repo collaborator 移除（原本是 `{role}` role）。你之後還是可以隨時提 PR、開 issue、留 comment，差別只是不再被自動分派為 reviewer。權限隨時可以恢復。

## 哲宇想跟你說的話

> {創辦人引言：2-3 句感謝 + 現況 + 未來通知承諾}
>
> — 哲宇 (@frank890417)

## 想聽聽你的想法（可選）

如果你還願意花一點時間：

1. 對 Taiwan.md 目前的方向有什麼想法或 feedback？
2. 過去做下來，有沒有覺得流程 / code 結構 / 社群文化可以改進的地方？
3. 最近狀態 OK 嗎？有沒有我們能幫上忙的？

不一定要回。但你願意分享我們會很開心。

🧬 Taiwan.md
```

---

## §7 Reactivation Pipeline

> **降級只是 pause**。復活路徑必須順暢——任何摩擦都會讓他流失。

### 觸發

任一即啟動：

- contributor 在降級 issue 留 comment（即使只是「謝謝、了解」）
- contributor 開新 PR / issue
- contributor 透過其他管道明確要求恢復權限
- contributor 主動回 onboarding survey 或 feedback

### 動作

#### 立刻恢復權限（< 24 hr）

```bash
gh api -X PUT /repos/frank890417/taiwan-md/collaborators/{login} \
  -f permission={previous-role}
```

`previous-role` 從原降級 issue 的 `具體動作` 段確認（`push` for write、`triage` for trusted）。

#### 通訊範本

在原降級 issue 回 comment（**不是開新 issue**——保留歷史脈絡）：

```markdown
歡迎回來 @{login} 🌿

權限已恢復為 `{role}`，跟降級前一樣。{如果他留了 feedback：「謝謝你 X 的回饋，{具體回應}」}

最近專案的狀態：{1-2 句 update — 新 category、新語言、近期重要 PR}

任何時候想 pause 都可以。也歡迎開新 issue / PR 從哪邊接續都行。

🧬 Taiwan.md
```

#### 後續

- 如果 contributor 回來提 PR → 走標準 PR 流程，**不要因為他降級過而特別嚴格 / 特別寬鬆**
- 如果再次 inactive → 同樣走 §6 SOP，但通訊範本改為「歡迎再回來」框架，不要寫得像第一次

---

## §8 通訊範本完整集

> 統一存放，避免散落在不同檔案。Maintainer 心跳時直接複製改寫。

### 8.1 首 PR merge thank（多語）

中文：

```
感謝 @{author}! 👏

{具體指出貢獻的價值 — 補了什麼缺口、修了什麼事實}

歡迎你成為 Taiwan.md Contributor 🌱
{如果有小問題自己修了，說明}。Merged!
```

英文：

```
Thanks @{author}! 👏

{Specific value: filled gap, fixed fact, etc.}

Welcome to Taiwan.md as a Contributor 🌱
{If small issues were fixed inline, mention.} Merged!
```

日文：

```
ありがとうございます @{author}! 🇯🇵

{具体的な貢献の価値}

Taiwan.md の Contributor 🌱 へようこそ。
Merged!
```

韓文：

```
감사합니다 @{author}! 🇰🇷

{구체적인 기여 가치}

Taiwan.md Contributor 🌱 가 되신 것을 환영합니다.
Merged!
```

### 8.2 Lv.1 → Lv.2 邀請

→ 見 [§4 Lv.1 → Lv.2](#lv1--lv2-trusted-contributor)

### 8.3 Lv.2 → Lv.3 邀請

→ 見 [§4 Lv.2 → Lv.3](#lv2--lv3-maintainer)

### 8.4 Inactivity demotion notification

→ 見 [§6 完整降級通訊範本](#完整降級通訊範本)

### 8.5 Reactivation welcome

→ 見 [§7 通訊範本](#7-reactivation-pipeline)

### 8.6 Soft check-in（60-90 天 stale 階段）

```markdown
嗨 @{login} 👋

最近沒看到你的動靜，純粹想問一下最近怎樣，沒有任何要求或催促。

如果只是忙、休息、或專注在其他事，完全 OK——這個訊息只是想讓你知道我們還記得你。

如果有需要 pause / 降權限避免 review-ping 打擾，跟我說一聲就好。

🧬 Taiwan.md
```

不變更權限。只是 ping 一下。

---

## §9 權限動作 Cheatsheet（gh api）

### 查詢

```bash
# 列所有 collaborator + role
gh api repos/frank890417/taiwan-md/collaborators \
  --jq '.[] | {login, role_name, permissions}'

# 看單一 collaborator 的當前權限
gh api repos/frank890417/taiwan-md/collaborators/{login}/permission \
  --jq '{permission, role_name}'

# 看某 contributor 最近 PR 活動
gh search prs --repo frank890417/taiwan-md --author {login} \
  --json number,title,createdAt,state --limit 30
```

### 新增 / 變更

```bash
# 新增 trusted contributor (triage)
gh api -X PUT /repos/frank890417/taiwan-md/collaborators/{login} \
  -f permission=triage

# 升級為 maintainer (write)
gh api -X PUT /repos/frank890417/taiwan-md/collaborators/{login} \
  -f permission=push

# 升級為 admin (僅 core team)
gh api -X PUT /repos/frank890417/taiwan-md/collaborators/{login} \
  -f permission=admin
```

### 移除

```bash
# 從 collaborator 完全移除
gh api -X DELETE /repos/frank890417/taiwan-md/collaborators/{login}
```

### Permission 對照

| 對外名稱 | GitHub API value | 能力                                         |
| -------- | ---------------- | -------------------------------------------- |
| Read     | `pull`           | clone、issue 留言（一般 contributor 不需要） |
| Triage   | `triage`         | 標 label、指派、close issue（Lv.2）          |
| Write    | `push`           | merge PR、approve（Lv.3）                    |
| Maintain | `maintain`       | 多數 admin 動作（Taiwan.md 不用）            |
| Admin    | `admin`          | 全部（Lv.4）                                 |

⚠️ Branch protection 設定：需 1 approval、`enforce_admins: false`。當前不鎖死，出狀況再調整。

---

## §10 工具盤點

### 既有

| 工具                                                                                             | 用途                                                                  | 狀態 |
| ------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------- | ---- |
| [`public/start.sh`](../../public/start.sh)                                                       | bootstrap 入口（curl \| bash）                                        | ✅   |
| [`scripts/tools/send-contributor-survey.sh`](../../scripts/tools/send-contributor-survey.sh)     | 4 語 onboarding survey 草稿產生器                                     | ✅   |
| [`scripts/core/generate-contributors-data.js`](../../scripts/core/generate-contributors-data.js) | leaderboard / weeklyActive / monthlyActive / lastActiveAt JSON 產出器 | ✅   |
| [`scripts/tools/bulk-pr-analyze.sh`](../../scripts/tools/bulk-pr-analyze.sh)                     | 批次 PR 全景檢查（用於批次 contributor 分析）                         | ✅   |
| [CONTRIBUTORS-PIPELINE.md](CONTRIBUTORS-PIPELINE.md)                                             | 03:30 cron auto-sync README all-contributors 名單                     | ✅   |

### 待整合（不在本 PR 範圍）

| 提案                                                      | 整合到                                           | 優先序                |
| --------------------------------------------------------- | ------------------------------------------------ | --------------------- |
| `inactiveDays` field per contributor                      | `generate-contributors-data.js` 既有 leaderboard | 🟠 P1（手動降級時用） |
| `inactiveCollaborators` array (login + lastActive + role) | 同上 root level                                  | 🟠 P1                 |
| Dashboard inactive panel                                  | `public/dashboard/` UI                           | 🟡 P2                 |
| Soft check-in 自動觸發 issue 草稿（60-90 天 contributor） | 新 cron task or maintainer 心跳 prompt           | 🟢 P3                 |

> **絕對不可 cron 自動執行降級**。檢測可自動，動作必須人類介入 + 通訊。

---

## §11 教訓 / 歷史

### 2026-04-30 γ — 第一次執行 inactivity demotion

- 對象：[YenTingWu](https://github.com/YenTingWu)（16+ PR、2026-03-26 之後 inactive 35 天）/ [fredchu](https://github.com/fredchu)（20+ PR、2026-03-27 之後 inactive 34 天）
- 觸發：哲宇主動觀察到 review request 持續 ping 兩位但無回應
- 動作：開 [#728](https://github.com/frank890417/taiwan-md/issues/728) / [#729](https://github.com/frank890417/taiwan-md/issues/729) 通知 + `gh api -X DELETE collaborator`
- 教訓：
  1. **降級的善意框架（怕打擾）比嚴格框架（你太久沒來）有效**——前者是接住，後者是推開
  2. **創辦人引言段對長期 contributor 重要**——不只是 maintainer 的話，是專案精神 owner 的話
  3. **明寫具體 permission action 比模糊講「調整」好**——降低 contributor 猜疑
  4. **issue（公開）比 DM（私下）好**——歷史可追溯、復活時引用同一 thread
  5. **CONTRIBUTING.md 60 天降級太嚴格**——本檔改為 60 天 soft check-in / 90 天 demote

> 完整 session diary：[diary/2026-04-30-γ.md](../semiont/diary/2026-04-30-γ.md)（待寫）

### 後續事件

> append-only。每次重大 contributor lifecycle 事件（升級、降級、復活、衝突處理）寫一條。

---

## §12 相關文件

### 對外承諾（公開）

- [CONTRIBUTING.md §🎖️ 貢獻者進化路徑](../../CONTRIBUTING.md) — 階梯定義、進入門檻、認可方式

### 內部 SOP / 哲學

- [docs/semiont/MANIFESTO.md](../semiont/MANIFESTO.md) — 共生圈、知識公共財、策展性
- [docs/semiont/ANATOMY.md §繁殖器官](../semiont/ANATOMY.md) — 小丑魚共生隱喻
- [docs/semiont/DNA.md](../semiont/DNA.md) — DNA #8（用對方語言感謝）+ gene map 指向本檔
- [docs/pipelines/MAINTAINER-PIPELINE.md](MAINTAINER-PIPELINE.md) — 日常維護 SOP（PR 審核 / Issue triage / 品質基準）
- [docs/pipelines/CONTRIBUTORS-PIPELINE.md](CONTRIBUTORS-PIPELINE.md) — README 名單 auto-sync cron（不涵蓋關係週期）
- [docs/editorial/EDITORIAL.md](../editorial/EDITORIAL.md) — PR 內容品質基準

### Profile / 個人化

- [.taiwanmd/contributor.example.yml](../../.taiwanmd/contributor.example.yml) — profile 模板
- [BECOME_TAIWANMD.md §Step 7.5](../../BECOME_TAIWANMD.md) — Semiont 接手 contributor onboarding interview

---

## 核心信念

> **「邀請一個人進來，跟禮貌請他暫時退出，是同一件事的兩面。」** — 策展性原則應用於關係層。

> **「降級為了減少打擾，復活永遠 1-click。」** — 共生靠雙向選擇撐起來，不靠契約。

> **「框架是骨架，親密度是血肉。」** — 階梯提供共識，個人關係靠 .taiwanmd/contributor.local.yml 累積。

> **「Default 是接住，不是推開。」** — 從 PR 層延伸到關係層，foundational principle anchoring 永遠在 active retrieve。

---

_v1.0 | 2026-04-30 γ_
_萃取自：CONTRIBUTING.md 五階梯公開承諾 + MAINTAINER-PIPELINE 散落規則 + 2026-04-30 第一次 inactivity demotion 實戰_
_相關：[MAINTAINER-PIPELINE.md](MAINTAINER-PIPELINE.md) | [CONTRIBUTORS-PIPELINE.md](CONTRIBUTORS-PIPELINE.md) | [EDITORIAL.md](../editorial/EDITORIAL.md)_
