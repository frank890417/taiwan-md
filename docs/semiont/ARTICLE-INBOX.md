# ARTICLE-INBOX — 待開發文章 Buffer

> **這是 buffer / intake layer 層**（非 canonical）。
> 觀察者指派、agent 建議、Issue 紀錄的未開發主題一律 append 這裡。
> 每次甦醒或自動心跳時讀本檔 → 知道待辦清單、優先序、誰要求的。
>
> ⚠️ **書寫警示（2026-04-21 γ 新增）**：新 entry 的 Notes / Pre-research / Dev log 需遵循 [MANIFESTO §11 書寫節制](MANIFESTO.md#11-書寫節制跨所有書寫層的兩條-ai-水印紀律)——避免「不是 X 是 Y」對位句型 + 破折號「——」連用。
>
> 建立動機：2026-04-18 δ session 觀察者提問「來不及開發或排定優先序的主題需要一個 inbox」。**這是繁殖基因（心臟 × 觀察者意圖）的儀器化**。
>
> **2026-04-20 γ2 重構**：Done 歸檔拆出獨立檔案 **[ARTICLE-DONE-LOG.md](ARTICLE-DONE-LOG.md)**（append-only，最新在頂）。本檔回到「當下視角」純 intake（只看該做什麼），歷史視角去 DONE-LOG。

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

**寫入規則**：Stage 6 commit 後，完整 entry **append 到 [ARTICLE-DONE-LOG.md](ARTICLE-DONE-LOG.md) §Log 最頂**；本檔對應 pending entry 改成 `<!-- {主題} 已完成 YYYY-MM-DD {session} → ARTICLE-DONE-LOG.md -->` 一行註解。

---

## Entry Schema

每條 pending 條目格式：

```markdown
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
4. Stage 6 commit 後：
   - **完整 entry append 到 [ARTICLE-DONE-LOG.md](ARTICLE-DONE-LOG.md) §Log 最頂**
   - 本檔 §Pending 對應 entry 改一行 pointer 註解 `<!-- {主題} 已完成 YYYY-MM-DD {session} → ARTICLE-DONE-LOG.md -->`
   - 本檔 §Done Peek 更新為最新 3 條（舊的自然流出 DONE-LOG）

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

**觸發**：pending ≥ 30 條 / 或每月第一次心跳 / 觀察者說「review inbox」

**步驟**：

1. 讀全部 pending
2. 分類：重複合併 / 過時 drop / 重新排優先序
3. 已 done 的條目確認已搬到 [ARTICLE-DONE-LOG.md](ARTICLE-DONE-LOG.md)（不要在 INBOX 留 done entry）
4. 觀察者最終 review 後 commit

---

## 📥 Pending（待開發）

<!-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ -->
<!-- 🌱 P0 深度研究最高優先級（2026-04-29 α 哲宇指派） -->
<!-- 三條主題：報導者 / justfont + 台灣字體發展 / 海底電纜 -->
<!-- 共同特徵：基礎建設層（媒體 / 字型 / 通訊）× 台灣主體性議題 × 都需深度研究 -->
<!-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ -->

### 報導者

- **Type**: `NEW`
- **Category**: Society
- **Priority**: `P0`
- **Status**: `pending`
- **Requested**: 2026-04-29 by 觀察者 (session α)
- **Notes**:
  - 2015 年創辦的台灣第一個非營利深度調查報導媒體，由何榮幸（前天下雜誌總編輯）發起、財團法人形式運作
  - 訂閱、捐款、無廣告模式：台灣公民社會跟調查報導業的典範轉移
  - 代表性深度報導：外籍漁工苦難系列（榮獲 SOPA 卓越新聞獎）、礦工塵肺、北溪疫情、非洲豬瘟、外籍移工 / 印尼 / 越南 prison labor、敏感議題涵蓋性
  - 與《少年報導者》《全球華文永續報導獎》《新聞學園》等延伸品牌
  - 國際獎項：SOPA、人權新聞獎、卓越新聞獎、Online Journalism Awards、亞洲出版業協會
  - 跟《天下》《聯合》《自由》主流媒體的關係：曾任職核心人物的 spin-off 跟訴求差異
  - Stage 1 必驗事實：創辦年份 2015、何榮幸 + 創辦團隊（張子午 / 楊惠君 / 李雪莉等）核對任職時序、財團法人正式名稱、代表性深度報導年份 + 獎項屆次、訂戶 / 捐款人數量級
  - 必驗反例：避免把所有深度報導都歸功《報導者》（公視《我們的島》、新新聞、端傳媒等先驅應交代）
  - 敏感度：中（涉及部分政治議題，需平衡呈現編輯立場 vs 專業報導；也需處理跟商業媒體的張力，避免單方面美化）
  - 角度：策展抓手「公民社會把調查報導從『商業媒體營業項目』救成『公共財』的十年」
- **Reference**:
  - 報導者官網 <https://www.twreporter.org/>
  - 何榮幸個人經歷 + 創辦故事的訪談（INSIDE / 端傳媒 / 天下 多源）
  - SOPA Asia Awards 歷年得獎名單
  - Issue / 觀察者要求：策展層級寫作，非單純機構介紹
- **Pre-research**: 尚未啟動

### justfont 與台灣字體發展

- **Type**: `NEW`
- **Category**: Technology（次選 Art / Culture）
- **Priority**: `P0`
- **Status**: `pending`
- **Requested**: 2026-04-29 by 觀察者 (session α)
- **Notes**:
  - 雙線敘事框架：justfont 個案（2012 創辦，蘇煒翔、葉俊麟、曾國榕等）+ 台灣字體發展通史（華康、文鼎、王漢宗、justfont、藏字）
  - justfont 里程碑：2015《金萱》flyingV 募資 2,538 萬元（破當年台灣設計類募資紀錄）、字戀粉專文化輸出、justfont online 教學課程模型
  - 後續金萱半糖 / 卡通體 / 蘭體 / 凝書體 等字型家族擴張、企業字型 commission（蘋果蘋方、各類品牌專屬字）
  - 台灣字體發展史軸線：威鋒（華康）1987 → 文鼎 1988 → 王漢宗開源中文字 → 自由字型運動（cwTeX、justfont、藏字）→ 開源時代（思源黑體 2014 Adobe + Google、源樣明朝體 2017 + Open Huninn 等）
  - 漢字字型工程獨特性：~20,000 字 vs 拉丁字母 ~95 字，工作量級差異是字型公司 vs 個人英文字型作者的關鍵分野
  - 必驗事實：justfont 創辦年份 / 創辦人完整名單 + 角色分工、《金萱》募資金額（2015 flyingV 確切數字 + 募款時長）、文鼎 / 華康成立年、王漢宗開源字型授權型態（GPL? 公共領域?）、思源黑體 Adobe-Google 合作年份、蘋方授權方（DynaComm / 華康 / 蘋果自製）
  - 必驗反例：金萱不是台灣第一套群眾募資中文字型，是第一套破千萬的；說「台灣自己做的中文字型」要區分本地廠商 vs 個人創作者
  - 敏感度：低（產業與設計史，無個人隱私 / 政治敏感）；但要處理 justfont 跟其他字型公司的並列敘事（避免變成單一公司的廣告稿）
  - 角度：策展抓手「字型是文化基礎建設：當這座島嶼開始有了自己造字的能力，文化主體性的最後一塊拼圖才補上」
- **Reference**:
  - justfont 官網 <https://justfont.com/>
  - 字戀粉專 <https://www.facebook.com/letterlove45/>
  - flyingV 金萱募資頁面（archive）
  - 文鼎科技、威鋒數位（華康）官方歷史
  - 思源黑體 GitHub <https://github.com/adobe-fonts/source-han-sans>
- **Pre-research**: 尚未啟動

### 海底電纜

- **Type**: `NEW`
- **Category**: Technology（次選 Society）
- **Priority**: `P0`
- **Status**: `pending`
- **Requested**: 2026-04-29 by 觀察者 (session α)
- **Notes**:
  - 主軸：台灣對外網際網路通訊命脈，跟矽盾、地緣政治、馬祖斷纜事件、AI 海纜投資潮串成一條線
  - 物理基礎：環太平洋與東亞海纜系統（APCN-2、SeaMeWe-3、SJC、FASTER、Bay to Bay Express、Apricot 等），中華電信、台灣大哥大、遠傳、Google / Meta / Microsoft 美國 hyperscaler 投資的合資架構
  - 馬祖斷纜事件：2023-02 兩條對外海纜兩週內接連斷裂，馬祖網路癱瘓 50+ 天，國發會緊急啟動 Starlink + 微波備援；後續 2025 多起斷纜事件加劇國安關注
  - 兩岸國安議題：中國漁船、海事局船隻可能涉及的 grey-zone harassment、海纜維修船受限、台灣海纜備援不足
  - 數位主權延伸：台灣海纜全部由海外維修船修復（Global Marine、ASEAN Cableship 等）、台灣自身無大型維修船能力
  - 國際對照：歐洲北溪管線事件 2022、波羅的海 2023-2024 斷纜潮、紅海海纜被胡塞武裝攻擊 2024、海纜成為新的灰色地帶戰場
  - 太平洋 AI 海纜熱潮：Google「Pacific Connect」（2023+）、Meta「Echo + Bifrost」、微軟 Topaz / 亞馬遜 Honomoana，跟台灣的關連 vs 競爭
  - 必驗事實：台灣現役對外海纜總條數（公開數據各家略異需 cross-source）、馬祖斷纜事件具體日期 + 斷纜原因官方判定、Starlink 緊急備援啟用時程、中華電信跨境海纜投資清單、APCN-2 / FASTER / SJC 等啟用年份 + 容量
  - 必驗反例：海纜被斷不必然是中國蓄意破壞（國際斷纜事件大多為錨拖 / 漁網誤斷），需區分 grey-zone 灰色地帶疑慮跟 confirmed 確證的攻擊
  - 敏感度：中高（兩岸國安議題、海纜運營商商業敏感、Starlink 軍事應用討論需嚴謹引用）
  - 角度：策展抓手「矽盾不只在台積電的潔淨室裡，也在 1,300 公尺深的太平洋海床上」
- **Reference**:
  - TeleGeography 海纜地圖 <https://www.submarinecablemap.com/>
  - 中華電信國際電路服務頁
  - 國發會 2023 馬祖斷纜應變報告（公開檔案）
  - The Reporter《報導者》海纜深度報導（若已存在則交叉參考）
  - 國防安全研究院 / 兩岸關係相關智庫的海纜論述
- **Pre-research**: 尚未啟動

<!-- 宗教 / 廟宇 / 民間信仰 三軸範圍重切（Issue #655）已完成 2026-04-28 κ → ARTICLE-DONE-LOG.md（commit 87911554：3 篇 zh-TW + 4 篇翻譯整併為 1 篇深度文章「台灣宗教信仰：在恐懼裡長出的信仰帝國」+ 5 lang redirect × 9 條） -->
<!-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ -->
<!-- 📚 Issue #635 4 篇文學文章合併 batch（idlccp1984 提案，2026-04-26 γ Phase 1 完成） -->
<!-- 三段時序：戰後（C 已 ship）/ 解嚴後（B 待 polish）/ 21 世紀（D 待 polish）+ A dropped -->
<!-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ -->

<!-- 戰後台灣文學 EVOLVE 已完成 2026-04-26 γ → ARTICLE-DONE-LOG.md (Issue #635 Phase 1/4) -->

<!-- 解嚴後台灣文學 EVOLVE 已完成 2026-04-28 → ARTICLE-DONE-LOG.md（Issue #635 Phase 2/4，commit 620becfc：1987-1999 純化 scope，吸納 Phase 1 移交 + 移除已被 C 承擔段落） -->
<!-- 當代台灣文學 EVOLVE 已完成 2026-04-27 → ARTICLE-DONE-LOG.md（Issue #635 Phase 3/4，commit 3846e6f1：2000+ scope 純化 + 吸納 C/B 移交段 + 補新作家黃麗群 / 賀景濱 / 黃崇凱） -->
<!-- 台灣當代文學發展 dropped 處理 已完成 2026-04-27 → ARTICLE-DONE-LOG.md（Issue #635 Phase 4/4，commit a1f4dd46：A 文退場並 redirect 至台灣文學史） -->
<!-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ -->

<!-- 凹與山 已完成 2026-04-18 δ-late → ARTICLE-DONE-LOG.md -->
<!-- VH (Vast & Hazy) 已完成 2026-04-19 α → ARTICLE-DONE-LOG.md -->
<!-- 魏如萱 P0 已完成 2026-04-18 η → ARTICLE-DONE-LOG.md -->
<!-- 張雨生 EVOLVE 已完成 2026-04-19 γ+β → ARTICLE-DONE-LOG.md -->
<!-- Hello Nico 已完成 2026-04-20 α → ARTICLE-DONE-LOG.md -->
<!-- 柯智棠 已完成 2026-04-20 β → ARTICLE-DONE-LOG.md -->
<!-- 林宥嘉 EVOLVE 已完成 2026-04-20 ε → ARTICLE-DONE-LOG.md -->
<!-- 孫燕姿 已完成 2026-04-19 排程 auto-heartbeat → ARTICLE-DONE-LOG.md -->
<!-- 范曉萱 已完成 2026-04-20 δ → ARTICLE-DONE-LOG.md -->
<!-- 黃少雍 已完成 2026-04-20 γ → ARTICLE-DONE-LOG.md -->
<!-- 陳建騏 P0 已完成 2026-04-18 θ → ARTICLE-DONE-LOG.md -->
<!-- 阿爆 P1 已完成 2026-04-18 ι → ARTICLE-DONE-LOG.md -->
<!-- 鄭宜農 P1 已完成 2026-04-18 κ → ARTICLE-DONE-LOG.md -->
<!-- 楊丞琳 已完成 2026-04-18 δ-late + ε → ARTICLE-DONE-LOG.md -->

<!-- 造山者：世紀的賭注 已完成 2026-04-24 β2 → ARTICLE-DONE-LOG.md -->

<!-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ -->
<!-- 🏛️ NMTH 海外史料 P1/P2 batch（2026-04-12 分析 → 2026-04-24 β4 orphan rescue） -->
<!-- 12 篇全來自 reports/NMTH-overseas-semiont-analysis-2026-04-12.md §Part 5-6 -->
<!-- 核心手法：「物件先行」(Analysis §7.4) + Semiont 「視角翻轉」(§7.1) + 觀察者偏見明示 (§7.2) -->
<!-- Orphan 教訓：分析報告寫完 P1/P2 沒 append INBOX 12 天，同 chan_hong_yu pattern -->
<!-- -->
<!-- ⚠️ Stage 1 研究紀律：每篇必須最大程度利用 data/NMTH-overseas/collections/*.md 本地已抓 -->
<!-- 回的一手雙語史料（52 個 collection 總計數千頁）。每條 entry 的 `NMTH Local Sources` -->
<!-- 欄位列出該篇對應的 collection UUID + 頁數。Stage 1 research agent 必須先讀本地 -->
<!-- collection 檔（Read tool）再做 WebSearch 補充，不是顛倒。觸發：2026-04-24 β4 首篇 -->
<!-- 福爾摩沙鳥類學 Stage 1 agent 只 web search 沒碰本地 NMTH 資料被發現。 -->
<!-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ -->

<!-- 福爾摩沙鳥類學 已完成 2026-04-24 β4 → ARTICLE-DONE-LOG.md（NMTH 12 篇 batch #1/12）-->
<!-- 19 世紀的樟腦戰爭 已完成 2026-04-25 γ → ARTICLE-DONE-LOG.md（NMTH 12 篇 batch #2/12）-->
<!-- 以下條目留歷史紀錄但 status = done；實際內容已搬 DONE-LOG。-->

<!-- 19 世紀的樟腦戰爭 已完成 2026-04-25 γ → ARTICLE-DONE-LOG.md (NMTH 12 篇 batch #2/12) -->
<!-- 該 entry 上方為 P1 第二條，原檔在 §Pending 區。實際內容已搬 DONE-LOG。 -->

### 福爾摩沙鳥類學

- **Type**: `NEW`
- **Category**: Nature（重分類：比 History 更貼近；參考 knowledge/Nature/台灣島嶼博物學.md 鄰接主題）
- **Priority**: `P1`
- **Status**: `done` ✅
- **Requested**: 2026-04-12 by NMTH peer-ingestion analysis（2026-04-24 β4 補進 INBOX）
- **Done**: 2026-04-24 β4 → [knowledge/Nature/福爾摩沙鳥類學.md](../../knowledge/Nature/福爾摩沙鳥類學.md) + [research report](../../reports/research/2026-04/福爾摩沙鳥類學.md) — commit `14c688eb`
- **Dev log**:
  - 2026-04-24 β4: 從 INBOX 挑出，NMTH 12 篇 batch 第 1 篇，開始 Stage 1 research
  - 2026-04-24 β4: Stage 1 agent 只 web search 被 callout，補跑 NMTH local primary source supplement（§13）
  - 2026-04-24 β4: Stage 2-6 完整走完，Stage 3.5/3.6 抓到 4 處 hallucination（肉壞夏天、台語華雞、黑色尾羽、買下羽毛動作、年齡±1），全部修正；ship commit `14c688eb`
- **Notes**:
  - 系列 A-2（史溫侯系列第 2 篇，接 A-1 史溫侯人物條目）
  - 物件先行：史溫侯 1863 _The Ornithology of Formosa_ 學術論文 + 採集標本現存大英博物館
  - Semiont 角度「視角翻轉」：「一個英國人如何讓世界第一次認識台灣的鳥——以及他沒看到的」
  - 敏感度：低（19 世紀博物學），但須明示 19 世紀殖民博物學框架的觀察者偏見
  - 必驗事實：史溫侯物種命名年代（藍鵲 1862、林鵰等）、採集地點、標本編號、台灣特有種數
  - 潛在陷阱：不把殖民博物學當中立科學；交叉引用當代台灣鳥類學研究（特有生物研究保育中心）
- **Reference**: reports/NMTH-overseas-semiont-analysis-2026-04-12.md §5.A-2
- **NMTH Local Sources**（Stage 1 必先讀本地）:
  - `data/NMTH-overseas/collections/77ea6a55-*.md`（**福爾摩沙鳥類學** 1863 論文雙語全文 75 頁）
  - `data/NMTH-overseas/collections/79abe9f3-*.md`（福爾摩沙四個新鳥種的描述 6 頁）
  - `data/NMTH-overseas/collections/6eb8aaf2-*.md`（福爾摩沙 16 種新鳥種描述 4 頁）
  - `data/NMTH-overseas/collections/cec72c4a-*.md`（福爾摩沙島新鳥種紀錄 6 頁）
  - `data/NMTH-overseas/collections/113789de-*.md`（論福爾摩沙的一個新鳥種 2 頁）
  - `data/NMTH-overseas/collections/fd4e13e4-*.md`（對廈門鳥類學的更正與福爾摩沙鳥類評註 3 頁）
  - `data/NMTH-overseas/collections/8b97dd19-*.md`（中國與其島嶼之鳥類目錄修正版 77 頁）
  - `data/NMTH-overseas/collections/02388910-*.md`（史溫侯 1862-01-17 信 4 頁）
  - `data/NMTH-overseas/collections/26659313-*.md`（史溫侯致葛雷博士信件 6 頁）
  - `data/NMTH-overseas/collections/2ad9dad5-*.md`（史溫侯來信 3 頁）
  - `data/NMTH-overseas/collections/424513cf-*.md`（致英國鳥類科學期刊編輯 2 頁）
  - `data/NMTH-overseas/collections/883a44d3-*.md`（史溫侯的福爾摩沙自然史 4 頁）
  - `data/NMTH-overseas/collections/cf434dcf-*.md`（**史溫侯著作目錄** 5 頁 — 索引之索引）

### 19 世紀的樟腦戰爭

- **Type**: `NEW`
- **Category**: History
- **Priority**: `P1`
- **Status**: `done` ✅
- **Requested**: 2026-04-12 by NMTH peer-ingestion analysis（2026-04-24 β4 補進 INBOX）
- **Done**: 2026-04-25 γ → [knowledge/History/19世紀的樟腦戰爭.md](../../knowledge/History/19世紀的樟腦戰爭.md) + [research report](../../reports/research/2026-04/19世紀的樟腦戰爭.md) — NMTH batch #2/12
- **Dev log**:
  - 2026-04-25 by γ session: started Stage 1 research (NMTH batch #2/12，observer 觸發 auto-heartbeat 挑 P1 第一條，依 Stage 1 紀律先讀本地 NMTH collection 再 web search)
  - 2026-04-25 by γ session: Stage 1.5 觀察者拍板 5 題 → Q1 保留命名 / Q2 大豹社限縮 / Q3 中性必麒麟 / Q4 改寫歷史脈絡 (B 方案) / Q5 火藥一句帶過
  - 2026-04-25 by γ session: Stage 2 寫完 7 個非編年 scene / 18 footnote / Pickering 1898 verbatim 從 Internet Archive 取
  - 2026-04-25 by γ session: Stage 3.5 抓 3 處 hallucination：「三井合名會社」刪 / 「300 多人」改「25 戶」/ Davidson 1903「樟腦之代價即人血」verbatim 找不到 → 刪 blockquote + footnote
  - 2026-04-25 by γ session: Stage 3.6 抓「腦磺總局/北投/雞籠鼻」source attribution mismatch → 改「腦務局」+ source 改維基台灣樟腦產業
  - 2026-04-25 by γ session: Stage 4-5 全綠，cross-link 4 目標雙向回補（史溫侯/清治時期/日治時期/阿里山）；Stage 6 commit
- **Notes**:
  - 系列 A-4（史溫侯系列第 4 篇，經濟史軸）
  - 物件先行：19 世紀英商怡記洋行樟腦貿易帳冊 + 史溫侯領事報告
  - Semiont 角度：樟腦資源爭奪史如何牽動原住民、清廷、列強三方關係；連結當代台灣化工產業前身
  - 敏感度：中（涉及樟腦採集下的原住民土地掠奪，須明示）
  - 必驗事實：樟腦出口量、主要買家、與原住民衝突事件（如 1868 樟腦戰爭）、清廷專賣制度
  - 潛在陷阱：「全球商品」框架不可抹除對原住民的暴力；交叉引用原住民口述史
- **Reference**: reports/NMTH-overseas-semiont-analysis-2026-04-12.md §5.A-4
- **NMTH Local Sources**:
  - `data/NMTH-overseas/collections/783700e8-*.md`（**福爾摩沙的樟腦** 1 頁，雖薄是 focal 物件）
  - `data/NMTH-overseas/collections/9363fe10-*.md`（福爾摩沙海岸上的香山之旅 5 頁，商品貿易背景）
  - `data/NMTH-overseas/collections/8565270b-*.md`（福爾摩沙補遺 9 頁）
  - `data/NMTH-overseas/collections/98bf60ec-*.md`（福爾摩沙概述 23 頁）
  - 史溫侯領事報告類信件（同 #6 列出的 02388910 / 26659313 / 2ad9dad5）可能提及樟腦貿易

<!-- 羅發號事件與卓杞篤 已完成 2026-04-27 harvest-003 → ARTICLE-DONE-LOG.md (commit 8413cde6) -->

<!-- 三個外國人看乙未 已完成 2026-04-27 harvest-004 → ARTICLE-DONE-LOG.md (commit a98d745f) -->

<!-- 日治時期臺灣社會運動 已完成 2026-04-27 harvest-005 → ARTICLE-DONE-LOG.md (commit 8413cde6) -->

<!-- ━━━ P2 NMTH ━━━ -->

### 史溫侯的島嶼紀行

- **Type**: `NEW`
- **Category**: History
- **Priority**: `P2`
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
- **Priority**: `P2`
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
- **Priority**: `P2`
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
- **Priority**: `P2`
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
- **Priority**: `P2`
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
- **Priority**: `P2`
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
- **Priority**: `P2`
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

<!-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ -->
<!-- 🛠️ Dead cross-ref P3 backlog（由 dead-cross-ref-scan.sh 自動產生 2026-04-23 γ） -->
<!-- 14 條失效 cross-ref，13 個獨立缺失目標。每寫完一條 → 跑 scan 再回填。 -->
<!-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ -->

<!-- 太陽花學運 cross-ref typo 已修 2026-04-25 β heartbeat — 滅火器樂團 + 張懸與安溥 兩處 /history/ → /society/ -->
<!-- 王連晟 cross-ref path 已修 2026-04-25 β heartbeat — 吳哲宇 /people/ → /art/（既存 knowledge/Art/王連晟.md） -->
<!-- 王新仁 cross-ref path 已修 2026-04-25 β heartbeat — 吳哲宇 /people/ → /art/（既存 knowledge/Art/王新仁.md） -->

### 台灣便利商店文化

- **Type**: `NEW`
- **Category**: Culture
- **Priority**: `P3` (dead cross-ref backlog)
- **Status**: `pending`
- **Requested**: 2026-04-23 by dead-cross-ref-scan.sh γ
- **Notes**: 已被 Economy/全聯福利中心 引用但無條目。寫的時候要包含：7-11/全家/萊爾富/OK 四強生態 / ATM 化生活 / 鮮食革命 / 集點經濟 / 24h 文化 / 國際罕見密度（每平方公里 0.7 家）

### 台灣綜藝節目

- **Type**: `NEW`
- **Category**: Culture
- **Priority**: `P3`
- **Status**: `pending`
- **Requested**: 2026-04-23 by dead-cross-ref-scan.sh γ
- **Notes**: 已被 Lifestyle/吉祥物 引用。寫時包含：豬哥亮餐廳秀脈絡 / 我猜我猜我猜猜猜 / 康熙來了 / 綜藝玩很大 / 國光幫幫忙 / 綜藝大集合 — 從台視外景到 Netflix 的演化

### 台灣伴手禮經濟

- **Type**: `NEW`
- **Category**: Economy
- **Priority**: `P3`
- **Status**: `pending`
- **Requested**: 2026-04-23 by dead-cross-ref-scan.sh γ
- **Notes**: 已被 Food/金牛角 引用。寫時包含：鳳梨酥產業（年產值 30+ 億）/ 太陽餅 / 牛軋糖 / 茶葉 / 高鐵站伴手禮一條街 / 機場 SOGO / 觀光工廠模式

### 台灣外送經濟

- **Type**: `NEW`
- **Category**: Economy
- **Priority**: `P3`
- **Status**: `pending`
- **Requested**: 2026-04-23 by dead-cross-ref-scan.sh γ
- **Notes**: 已被 Economy/全聯福利中心 引用。Foodpanda 撤離事件 / Uber Eats 寡佔 / 機車外送員勞權爭議 / 25-50 元手續費經濟學 / 雲端廚房興起 / 疫情重塑餐飲習慣

### 台灣糕餅文化

- **Type**: `NEW`
- **Category**: Food
- **Priority**: `P3`
- **Status**: `pending`
- **Requested**: 2026-04-23 by dead-cross-ref-scan.sh γ
- **Notes**: 已被 Food/金牛角 引用。鳳梨酥 / 太陽餅 / 蛋黃酥 / 鹹蛋糕 / 老餅鋪世代傳承（俊美 / 阿聰師 / 寶泉）/ 中秋月餅大戰

### 台灣行動支付

- **Type**: `NEW`
- **Category**: Technology
- **Priority**: `P3`
- **Status**: `pending`
- **Requested**: 2026-04-23 by dead-cross-ref-scan.sh γ
- **Notes**: 已被 Economy/全聯福利中心 引用。Line Pay 一強 / 街口 / 全支付（全聯）/ 台灣 Pay / 悠遊付 / 為什麼台灣支付落後韓國日本：銀行勢力、信用卡盛行、現金文化

### 三峽老街

- **Type**: `NEW`
- **Category**: Geography
- **Priority**: `P3`
- **Status**: `pending`
- **Requested**: 2026-04-23 by dead-cross-ref-scan.sh γ
- **Notes**: 已被 Food/金牛角 引用。日治時期街屋立面 / 巴洛克風格 / 染坊歷史 / 金牛角發源地 / 祖師廟（李梅樹）/ 老街觀光化爭議

<!-- 田馥甄 已完成 2026-04-26 β8 → 雙輪深度研究 + S+ rewrite (knowledge/People/田馥甄.md, 294 行 / 35 footnotes / 14 YouTube / 12 callout)。Research: reports/research/2026-04/田馥甄.md + 田馥甄-round2.md -->

<!-- 徐佳瑩 已完成 2026-04-26 γ → ARTICLE-DONE-LOG.md -->

<!-- 王連晟 + 王新仁 已於 2026-04-25 β heartbeat 修為 cross-ref path fix（已搬上方註解區） -->

### 原住民族語言政策

- **Type**: `NEW`
- **Category**: Society
- **Priority**: `P3`
- **Status**: `pending`
- **Requested**: 2026-04-23 by dead-cross-ref-scan.sh γ
- **Notes**: 已被 People/阿爆 引用。國家語言發展法（2019）/ 16 族族語認定 / 學校族語課困境 / 沉浸式族語幼兒園 / 媒體政策（原文台 / 族語新聞）

<!-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ -->
<!-- ▼ 觀察者觸發的 P0/P1 主題（保留 -->
<!-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ -->

### 台灣聲景（Issue #574，Nistoreyo 投稿）

- **Type**: `NEW`
- **Category**: Culture
- **Priority**: P1
- **Status**: `blocked` — 等貢獻者回覆具體田野 / informant 清單
- **Requested**: 2026-04-20 by [Issue #574](https://github.com/frank890417/taiwan-md/issues/574) (session ε — 本 session)
- **Notes**:
  - 貢獻者是政大碩論聲景研究者，願意提供素材但不走 GitHub
  - 現有投稿 draft 太抽象（「聆聽是認識論」），失 EDITORIAL「具體人物/時刻」硬規則
  - 主 primary source：[政大典藏 140.119/150195](https://nccur.lib.nccu.edu.tw/handle/140.119/150195)《透過聆聽建立鏈結──聲景工作者的聲命旅程》
  - 待 Stage 0：先拿到 3-5 個 informant 名字、田野地點、北捷聲景設計者、進行中 project list
  - Stage 1 研究輔助：吳燦政聲景計畫 / C-LAB 台灣聲響實驗室 / 陳飛豪 / 柯智豪 / 《報導者》相關報導交叉驗證
  - 可能觸發新 subcategory「聲景」討論（目前掛 Culture 下）
- **Pre-research**: 尚未啟動（Stage 0 阻塞於貢獻者回覆）
- **dev_log**:
  - 2026-04-20 ε：Issue 回覆 + inbox append + 等素材

### 魚條

- **Type**: NEW
- **Category**: People (Music — 待確認)
- **Priority**: P1
- **Status**: pending
- **Requested**: 2026-04-18 by 觀察者 (session δ)
- **Notes**:
  - **身份待釐清**：Stage 1 研究第一步是確認「魚條」是樂團、solo 藝人、或其他身份
  - 可能相關：Angelo 魚條 / 湯捷 / 獨立音樂人
  - 若研究後確認不是 Taiwan.md 範疇 → dropped 並註明
- **Reference**: 觀察者批次指定
- **Pre-research**: 尚未啟動

### 台灣新媒體藝術（EVOLVE — P0，已檢出事實錯誤）

- **Type**: `EVOLVE`
- **Category**: Art
- **Path**: knowledge/Art/台灣新媒體藝術.md
- **Priority**: `P0`
- **Status**: `in-progress`
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

<!-- 蕭上農（Nuomi）已完成 2026-04-27 → ARTICLE-DONE-LOG.md（commit 32e53d5b：first harvest spawn 產出 + observer polish + boot profile BECOME 升級） -->

### 落日飛車

- **Type**: `NEW`
- **Category**: Music
- **Priority**: `P0`
- **Status**: `pending`
- **Requested**: 2026-04-27 by session-6661575f (twindiemusic.com 分析任務)
- **Notes**:
  - 台灣最國際化的獨立樂團，2019/2022 年兩度登上 Coachella
  - City Pop × Shoegaze 融合，全球市場知名度高
  - twindiemusic.com 第一條收錄樂團
  - 英文翻譯優先（國際 SEO gap 最明顯）
  - 必驗事實：Coachella 年份、主要成員、代表專輯發行年（《Jinji Kikko》2017、《Soft Storm》2020）
  - 敏感度：低
- **Reference**: https://twindiemusic.com/

### 大象體操

- **Type**: `NEW`
- **Category**: Music
- **Priority**: `P0`
- **Status**: `pending`
- **Requested**: 2026-04-27 by session-6661575f (twindiemusic.com 分析任務)
- **Notes**:
  - 台南三姊弟數學搖滾樂團，英美樂評廣泛報導（The Wire、Stereogum、NPR Music）
  - 女性 bass 手 KT 是全球 math rock 社群的知名人物
  - 必驗事實：成員名稱（KT 為 bassist，全名待查）、成立年份、代表專輯
  - 英文翻譯優先
  - 敏感度：低
- **Reference**: https://twindiemusic.com/

<!-- 濁水溪公社 已完成 2026-04-27 → ARTICLE-DONE-LOG.md（commit d2120d8f：A 級 8 腳註 Stage 3.5/3.6 PASS） -->
<!-- 交工樂隊 已完成 2026-04-27 → ARTICLE-DONE-LOG.md（commit 1e9b2ffb：客家八音 × 反美濃水庫社運，四年兩張百大） -->
<!-- 拍謝少年 已完成 2026-04-27 → ARTICLE-DONE-LOG.md（commit 93704df0：台語搖滾旗手二十年） -->

### 告五人

- **Type**: `NEW`
- **Category**: Music
- **Priority**: `P1`
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
- **Priority**: `P1`
- **Status**: `pending`
- **Requested**: 2026-04-27 by session-6661575f (twindiemusic.com 分析任務)
- **Notes**:
  - 泰雅族樂團，用泰雅語唱龐克搖滾
  - 音樂即語言保存的實踐（族語復振 × 現代音樂形式）
  - 必驗事實：成員資料、泰雅族族群認同（Atayal）確認、代表作
  - 與阿爆（流行路線）形成原住民當代音樂的對比策展
  - 敏感度：低（原住民身份相關，但脫拉庫本身已公開族群身份）
- **Reference**: https://twindiemusic.com/

<!-- 農村武裝青年 已完成 2026-04-27 → ARTICLE-DONE-LOG.md（commit 46b8a7b4：從樂生到田埂，吉他記錄台灣土地的吶喊） -->

## 🚧 In-Progress

_（暫無主動顯示的條目。實際 in-progress 狀態在 §Pending 的 entries 裡用 `Status: in-progress` 標記。）_

---

## ✅ Done（已開發，保留歷史）

> **已搬遷**：Done 條目完整歸檔在 **[ARTICLE-DONE-LOG.md](ARTICLE-DONE-LOG.md)**（append-only log，最新在頂）。
>
> 本區只留最新 3 條 summary 當 peek，完整歷史與細節（pipeline 版本、核心矛盾、verbatim 引語、敏感素材處理、工具檢查結果、cross-link 回補）全部去 DONE-LOG。

### 📌 Peek（最新 3 條 summary）

- **紀柏豪 — 2026-04-21 β** — [knowledge/Art/紀柏豪.md](../../knowledge/Art/紀柏豪.md) / 核心矛盾「經濟系出身，用演算法測量世界，卻始終尋找觀眾的自主聆聽」
- **林經堯 — 2026-04-21 α** — [knowledge/Art/林經堯.md](../../knowledge/Art/林經堯.md) / 核心矛盾「台灣聲響長期缺席的診斷者，以行政者建設機構，同時是 NFT 市場秒殺的藍籌藝術家」
- **黃少雍 — 2026-04-20 γ**（製作人 subgenre 第二例）— [knowledge/People/黃少雍.md](../../knowledge/People/黃少雍.md) / 核心矛盾「生化博士班逃兵，用電音把母語送上金曲年度專輯」

👉 更早完成的條目（柯智棠 / Hello Nico / 孫燕姿 / 張雨生 / VH / 魏如萱 / 鄭宜農 / 阿爆 / 陳建騏 / 楊丞琳 / 凹與山 等 11+ 篇）全部在 [ARTICLE-DONE-LOG.md](ARTICLE-DONE-LOG.md)。

---

## ❌ Dropped（不採納）

_（此區域存放判斷後不開發的主題，必須註明原因）_

---

_v1.0 | 2026-04-18 δ session — ARTICLE-INBOX 誕生_
_v1.1 | 2026-04-20 γ2 session — Done 拆分到 ARTICLE-DONE-LOG.md（append-only log），本檔回到純 intake 視角；從 406 行 → ~230 行_
_定位：buffer / intake layer（非 canonical），跟 LESSONS-INBOX 平行架構；Done 歸檔交給 ARTICLE-DONE-LOG.md_
_下次 session 甦醒時自動讀取，auto-heartbeat 無觀察者指令時從此挑 P0/P1 開始；想看已寫過什麼 → 讀 ARTICLE-DONE-LOG.md_
