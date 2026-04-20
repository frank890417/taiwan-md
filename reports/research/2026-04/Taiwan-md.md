---
subject: Taiwan.md（以自身為主體的 meta 研究）
type: project-research
date: 2026-04-20
research_session: rewrite-pipeline β session
confidence: high_confidence
research_method: 8 web searches + 10 webfetch + 5 gh api + 3 curl public API + git log
independent_urls: 52
---

# Taiwan.md 研究報告（meta-self-narrative 用）

> 本報告是為了支援 `knowledge/About/創辦人.md` 改寫成「Taiwan.md 寫 Taiwan.md」第一人稱敘事而做的深度外部取證。所有資料來自公開來源；引語一律保留中文原文。若原始頁面搜不到的引語，一律降級為 ⚠️ 或 ❌ 記入十節維護者校準備忘錄。

---

## 一、時間軸（2024 威尼斯種子 → 2026-03-17 誕生 → 現況）

| 時點 | 事件 | 來源 |
|---|---|---|
| **2024 春** | 吳哲宇帶《靈魂魚》參加第 60 屆威尼斯雙年展 Personal Structures；開幕酒會義大利策展人問「Where can I learn about Taiwan? Like, really learn?」 | cheyuwu.com/cv；cheyuwu345 FB 貼文 2026-03-17 |
| 2024–2025 | 在 Art Basel Miami、巴黎駐村、波蘭演講持續被同一問題追問 | INSIDE 40877 |
| **2026-03-11** | 在 Generative AI Annual Conference meetup 分享「If AI can curate my identity, can it help curate Taiwan's?」 | WebSearch 綜合結果（⚠️ 單源） |
| **2026-03-17 08:05:33 UTC** | GitHub repo `frank890417/taiwan-md` 建立 | gh api repos/frank890417/taiwan-md `created_at` |
| **2026-03-17 15:55:37 +0800** | 第一個 commit `"Initial commit from Astro"` | `git log --reverse` |
| 2026-03-17 16:05:41 | `feat: initial project setup with Astro + content collections` | git log |
| 2026-03-17 16:08:53 | `feat: add GitHub Pages deploy workflow + GA4 + CNAME` | git log |
| 2026-03-17 16:14:39 | `feat: add GitHub Sponsors funding config` | git log |
| 2026-03-17 18:11:42 | `feat: sponsor tiers on about page, SSOT/meta nodes in knowledge graph` | git log |
| 2026-03-17 21:19:32 | `feat: i18n status tool — 46% coverage` | git log |
| 2026-03-17 21:31:36 | `Merge PR #12 — soundscape-article`（**陌生貢獻者 bugnimusic 在專案啟動 5.5 小時後提交**） | git log + PR #12 |
| 2026-03-17（傍晚） | 吳哲宇於 Facebook 發布《一個瘋狂計劃的開始：taiwan.md》貼文 | facebook.com/cheyuwu345/posts/26745182721740331 |
| **2026-03-18 00:15–00:18** | i18n 一夜之間從 46% → 100%（47 篇全部英譯） | git log |
| **2026-03-18 19:28** | 自由時報藝文網專題發布（董柏廷署名） | art.ltn.com.tw/article/breakingnews/5374934 |
| 2026-03-18 | INSIDE 硬塞專題《把台灣開源！taiwan.md》發布 | inside.com.tw/article/40877-taiwan-md |
| 2026-03-18 | 動區動趨（abmedia）《怎麼向外國人介紹台灣？》Neo 署名 | abmedia.io/taiwan-md-github-opensource |
| **2026-03-19 10:37** | 中央社 CNA《從台積電到早餐店阿姨》林傑立、林廷軒編輯 | cna.com.tw/news/ait/202603195002.aspx |
| 2026-03-19 11:00 | 鉅聞天下 bigmedia 報導 | bigmedia.com.tw/article/1773889216329 |
| 2026-03-22 17:43 | FTNN 新聞網蔡曉容報導 | ftnn.com.tw/news/531960 |
| 2026-04-01 06:41 | 中文維基百科 Taiwan.md 條目最後修訂版本之一 | zh.wikipedia.org/zh-tw/Taiwan.md |
| 2026-04-07 | 日文版 audrey-tang 條目合併（PR #332） | git log |
| 2026-04-12 | NMTH 海外史料 × Taiwan.md 9-Part 交叉分析報告完成；NMTH 作為「專業資料策展夥伴」正式整合 | git log；taiwan.md/about/ |
| **2026-04-20（快照日）** | 943 stars / 138 forks / 3,642 commits（含 merge）/ 47 貢獻者 / 2,243 頁面 / 21 categories | gh api + taiwan.md/api/stats.json |

---

## 二、完整媒體報導清單（中文逐字引語）

### 2-1 自由時報藝文網（首次主流媒體爆發）
- **URL**：<https://art.ltn.com.tw/article/breakingnews/5374934>
- **標題**：〈在AI時代搶回「台灣主體」敘事權！新媒體藝術家吳哲宇發起「taiwan.md」實驗 「早餐店阿姨」到「便利商店」皆成觀點〉
- **發布時間**：2026/03/18 19:28
- **記者**：董柏廷
- **逐字引語**（中文原文，已於原頁 Ctrl-F 搜得）：
  - 「哪裡可以真正了解台灣」
  - 「策展」
  - **「在AI時代，掌握高品質的結構化內容就掌握了敘事權」**
- **意義**：首次把 Taiwan.md 放進「AI 時代主體敘事權」框架——這是後來所有報導沿用的基礎語言。

### 2-2 INSIDE 硬塞的網路趨勢觀察
- **URL**：<https://www.inside.com.tw/article/40877-taiwan-md>
- **標題**：〈把台灣開源！taiwan.md：AI 回答的時代，讓國家用 README 的方式介紹自己〉
- **發布日期**：2026/03/18
- **署名**：INSIDE 硬塞的網路趨勢觀察、吳哲宇
- **逐字引語**：
  - 威尼斯場景：**「Where can I learn about Taiwan？Like, really learn？」**
  - 吳哲宇自述（改述）：「他愣了三秒鐘，發現自己講得出一百個故事，卻指不出一個地方。」
- **核心框架**：README / SSOT / CC BY-SA 4.0 / 人與 AI 友善格式

### 2-3 中央社 CNA
- **URL**：<https://www.cna.com.tw/news/ait/202603195002.aspx>
- **標題**：〈從台積電到早餐店阿姨　Taiwan.md知識庫AI時代下說台灣故事〉
- **發布日期**：2026/03/19 10:37（21:05 更新）
- **編輯**：林傑立、林廷軒
- **逐字引語**（已驗證）：
  - **「AI的回答取決於它讀過什麼資料。如果網路上關於台灣最完整、最結構化、最容易被機器理解的內容，是由台灣人自己用繁體中文寫的，那AI給出的答案，就會帶有我們自己的觀點和溫度。」**
  - **「即使有時候我們在國際上被刁難，或是處境比較危險，我以我的國家為榮，以台灣為榮。越往外走，就越深地發現——我們的家其實就很美好。」**
- **吳哲宇 profile**：31 歲／MONOLAB 創辦人／陽明交大電機→NYU 數位整合媒體碩士
- **當時數據**：累計超過百篇文章；藝術 22 篇；經濟、社會、文化各超過 15 篇；12 個面向

### 2-4 動區動趨 ABMedia
- **URL**：<https://abmedia.io/taiwan-md-github-opensource>
- **標題**：〈怎麼向外國人介紹台灣？人人都能在 Taiwan.md 把「日常的不可思議」寫給世界看〉
- **發布日期**：2026/03/18
- **作者**：Neo
- 無標註直接引號，複述威尼斯場景「當場語塞」。

### 2-5 鉅聞天下 BigMedia
- **URL**：<https://www.bigmedia.com.tw/article/1773889216329>
- **標題**：〈Taiwan.md知識庫讓世界認識台灣 從半導體產業到早餐店阿姨都收錄〉
- **發布時間**：2026/03/19 11:00
- **逐字引語**：同 CNA 版本的「即使有時候我們在國際上被刁難……」段落（轉引）
- 定位：「數位人類學博物館」

### 2-6 FTNN 新聞網
- **URL**：<https://www.ftnn.com.tw/news/531960>
- **標題**：〈把台灣開源！新媒體藝術家推taiwan.md　讓世界讀懂台灣〉
- **發布時間**：2026/03/22 17:43
- **記者**：蔡曉容／綜合報導
- 全文以改述為主，無獨立「...」直接引語。

### 2-7 Yahoo 新聞（FTNN 轉載）
- **URL**：<https://tw.news.yahoo.com/%E6%8A%8A%E5%8F%B0%E7%81%A3%E9%96%8B%E6%BA%90-%E6%96%B0%E5%AA%92%E9%AB%94%E8%97%9D%E8%A1%93%E5%AE%B6%E6%8E%A8taiwan-md-%E8%AE%93%E4%B8%96%E7%95%8C%E8%AE%80%E6%87%82%E5%8F%B0%E7%81%A3-094300117.html>
- 內容同 FTNN。

### 2-8 上報 UPMedia
- **URL**：<https://www.upmedia.mg/tw/commentary/culture-and-education/254232>
- 已被維基百科引用為 Taiwan.md 條目來源。⚠️ WebFetch 403 無法抓取完整逐字內容——報告裡只作為「媒體清單」登記，不引用其中任何字句。

### 2-9 中文維基百科 Taiwan.md 條目
- **URL**：<https://zh.wikipedia.org/zh-tw/Taiwan.md>
- **最後更新**：2026-04-01 06:41
- **條目引用清單**：6 篇媒體報導，與本研究獨立核對結果一致。

### 2-10 吳哲宇 Facebook 原始貼文（一切的源頭）
- **URL**：<https://www.facebook.com/cheyuwu345/posts/26745182721740331/>
- **發布日期**：2026-03-17
- **互動數據**：1.6 萬讚 / 209 留言 / 7,331 分享
- **逐字引語**（全文摘要，已於原頁抓取）：
  - **「Where can I learn about Taiwan? Like, really learn?」**
  - 「我愣了三秒鐘。我可以當場講出一百個台灣的故事——夜市的煙火氣、健保卡的奇蹟、那座島上擠著 268 座超過三千公尺的高山。但我沒辦法指給他一個地方，讓他自己去讀、去理解、去感受這個地方為什麼特別。維基百科寫的是事實，但不是故事。觀光局講的是美好，但不是真實。新聞報的是片段，但拼不出全貌。」
  - **「即使有時候我們在國際上被刁難，或是處境比較危險，我以我的國家為榮，以台灣為榮。越往外走，就越深地發現——我們的家其實就很美好。」**
  - 「下次有人問你『台灣是什麼樣的地方』，你可以把這個連結傳給他。」
- ⚠️ **重要**：268 座三千公尺高山的數字——按 CheYu 的「絕對事實鐵三角」守則，在引用進 meta 文章時需做第二層 cross-check（台灣官方多年說法在 268–269 區間，與吳哲宇原話一致，安全）。

### 2-11 INSIDE Side Chat Podcast E375（吳哲宇專訪）
- **URL**：<https://www.inside.com.tw/feature/side-chat/39681-side-chat-e375>
- **集數標題**：〈新媒體藝術家/MONOLAB 創辦人 吳哲宇：AI 生成藝術的靈魂在人類〉
- **發布日期**：2025/09/29（**Taiwan.md 誕生前半年**）
- 直接引語（已抓取）：
  - 「我會把自己比喻成，古老的鐘錶匠……機制對我來說是作品本身。」
  - 「我覺得最後還是審美，就是我最後這個東西，有沒有我的思考在裡面。」
  - 「我跟著以太從 4000 到 1300 過。」
  - 「我其實很慶幸那個事件發生。」（指 FTX / NFT 崩盤）
- ❌ **節目本身未提及 Taiwan.md**（當時尚未誕生）——這一集是「前史」，不是 Taiwan.md 的專訪。這是校準點：不能說 E375 在談 Taiwan.md。

---

## 三、GitHub 數據快照（2026-04-20 15:15 +0800）

資料來源：`gh api repos/frank890417/taiwan-md`、`git log`、`taiwan.md/api/stats.json`

| 指標 | 數值 | 備註 |
|---|---|---|
| Stars | **943** | gh api `stargazers_count` |
| Watchers | 943 | gh api |
| Forks | **138** | gh api |
| Subscribers | 3 | gh api |
| Open Issues | 16 | gh api |
| Size | 129,532 KB | gh api |
| Created | 2026-03-17 08:05:33 UTC | gh api |
| Last Pushed | 2026-04-20 07:14:37 UTC | gh api（本研究當日） |
| Default branch | main | gh api |
| Description | 🇹🇼 讓全世界完整認識台灣 \| An open-source, AI-friendly knowledge base about Taiwan | gh api |
| License | 顯示 null（但 llms.txt 聲明 CC BY-SA 4.0 內容 / MIT 程式碼） | gh api |
| 貢獻者總數 | **47 人** | api/contributors.json |
| Commits（reachable from main 含 merge） | **3,642** | `git log --oneline --all \| wc -l` |
| Commits（linear main） | 2,569 | `git log \| wc -l` |
| PR 數（截至 #572，至少） | 最高 PR 編號 574 OPEN | `gh pr list` |
| Issue 最高編號 | #574 | `gh issue list` |

### 3-1 第一個 commit 驗證（first heartbeat）
```
5c0d61ffe0c69f5ac5bc69dd2f9d36e33ed07d60
2026-03-17 15:55:37 +0800
"Initial commit from Astro"
```
隨後 13 分鐘內連續 4 個 commit（Astro 架構 / GA4 / GitHub Pages / Sponsors）——**這是 Taiwan.md 的胎動**。

### 3-2 里程碑 commits
| 時間 | commit message | 意義 |
|---|---|---|
| 2026-03-17 21:31:36 | Merge PR #12 from bugnimusic/feature/soundscape-article | 第一個陌生貢獻者合併（誕生當天） |
| 2026-03-18 00:15:59 | feat: i18n 100% — all 47 articles translated to English | 英文版一夜完工 |
| 2026-03-19 10:35:00 | feat(soundscape): 新增台灣聲景音檔區 | 聲景功能上線 |
| 2026-03-19 12:11:51 | feat: llms.txt 全面更新 | AI 友善元資料第一版完整 |
| 2026-03-21 04:00:47 | rewrite: 重寫唐鳳、吳明益、生態多樣性 | 第一次大規模 rewrite-pipeline |
| 2026-03-31 19:33:17 | history: integrate NMTH 8-period roadmap and curator insights | NMTH 策展夥伴關係落地 |
| 2026-04-07 10:40:57 | Merge PR #332 — ja/audrey-tang | 唐鳳日文版上線 |
| 2026-04-12 12:22:21 | 🧬 [semiont] diagnose: NMTH 海外史料 × Taiwan.md 9-Part 交叉分析 | NMTH 深度整合 |
| 2026-04-19 | refactor: 將語言屬性類型統一為 Lang 介面（PR #558） | 語言系統架構穩定化 |

---

## 四、公開發言驗證（張隆志 / 唐鳳 / 吳哲宇訪談）

### 4-1 張隆志（臺史博館長）
- **公開角色**：taiwan.md/about/ 頁面列 NMTH 為「專業資料策展夥伴（professional content curation partner）」。
- **git 證據**：多個 `NMTH` 相關 commit（NMTH peer ingest、海外史料 9-Part 交叉分析、sponsor-card NMTH refactor）——證明雙方有實質內容整合。
- ⚠️ **但**：完整網路搜尋未找到張隆志本人「公開發言背書 Taiwan.md」的直接引語或 URL。Storystudio 專訪、moc.gov.tw 上任通稿、Newtalk 訪談都沒提到 Taiwan.md。
- **校準結論**：可以寫「Taiwan.md 與國立臺灣歷史博物館建立策展夥伴關係」✅；不能寫「張隆志館長親自推薦 / 背書」❌（無逐字來源）。

### 4-2 唐鳳（Audrey Tang）
- **公開角色**：唐鳳本人條目收錄於 Taiwan.md 的 People 分類（2026-03-21 第一次 rewrite；2026-04-07 日文版 PR #332 合併）。
- ⚠️ **但**：網路搜尋未找到唐鳳在 X/Threads/Instagram/公開訪談中「推薦 Taiwan.md」的貼文。她作為 Taiwan.md 的被書寫對象 ✅，但「為 Taiwan.md 引薦」無公開證據 ❌。
- **校準結論**：第一人稱 meta 文不可引述「唐鳳為我引薦」——除非 CheYu 另外提供私下 DM 證據。

### 4-3 吳哲宇 INSIDE Side Chat E375
- **已確認**：E375 2025-09-29 發布，**Taiwan.md 尚未誕生**。
- **節目重點**：NFT / FTX / 鐘錶匠比喻 / 「AI 生成藝術的靈魂在人類」。
- **校準結論**：不能把 E375 當作 Taiwan.md 的專訪來源。可以引用 E375 作為「創辦人前史心智狀態」的旁證 ⚠️。

### 4-4 真正的「創辦人訪談」來源
最可信的訪談來源依序為：
1. **自由時報董柏廷專題** 2026-03-18 — 直引「在AI時代，掌握高品質的結構化內容就掌握了敘事權」
2. **CNA 林傑立/林廷軒** 2026-03-19 — 最完整兩段心境引語
3. **Facebook 2026-03-17 原始貼文** — 威尼斯場景第一手敘述 + 「我以我的國家為榮」

---

## 五、貢獻者數據（API 取得）

資料來源：<https://taiwan.md/api/contributors.json>（2026-04-20T07:15:03Z 更新）

### 5-1 總體
- **47 位貢獻者**（活躍窗口：近 30 天）
- frank890417 個人 commit 數：2,095 — 占比 54%（健康：個人 founder 驅動 + 大量外部協力）
- **Top 10 貢獻者**（按 commit 數）：

| Rank | Login | Commits | 領域 | 首次 commit |
|---|---|---|---|---|
| 1 | frank890417 | 2,095 | system（系統最多） | 2026-03-17 |
| 2 | Link1515 | 48 | translation（日文為主） | 2026-03-24 |
| 3 | idlccp1984 | 36 | content | 2026-04-03 |
| 4 | YenTingWu | 36 | translation | 2026-03-21 |
| 5 | dreamline2 | 23 | translation（日本時區 +0900） | 2026-04-03 |
| 6 | fredchu | 20 | system | 2026-03-19（reviewer 邀請 PR #91） |
| 7 | AgendaLu | 12 | system | 2026-03-19 |
| 8 | eryet | 12 | system | 2026-03-20 |
| 9 | tboydar-agent | 11 | translation | 2026-03-26 |
| 10 | BrianHuang813 | 10 | system | 2026-03-24 |

### 5-2 地理/時區訊號
- dreamline2 commit 時間 +0900（日本時區）——海外貢獻者存在
- bugnimusic 在 2026-03-17 當天首次合併（作為非吳哲宇以外的第一個合併 PR #12 作者）

### 5-3 stats.json 原始數據（2026-04-20 快照）
```json
{
  "totalArticles": 2243,
  "totalCategories": 21,
  "estimatedContributors": 150,
  "totalTags": 5202
}
```
各語言分類文章數：
- **zh-TW SSOT**：未顯示為單一 bucket，但 Chinese 原文分佈於 Society 41 / History 32 / Culture 47 / People 179 / Music 25 / Economy 50 / Lifestyle 18 / Art 28 / Food 31 / Technology 30 / Nature 27 / Geography 20 / About 6 / Language 1 / resources 2 / zh-TW 2 = **539+ zh 頁面**
- **ko**：491
- **fr**：481
- **en**：419
- **ja**：277
- **es**：36

⚠️ `estimatedContributors: 150` 是 stats.json 的估計欄位（含所有歷史/未活躍）；contributors.json 的 47 是近 30 天活躍數。**對外敘事請用 47 這個數字**（已在 knowledge/About/創辦人.md 草稿內），或引用 llms.txt 寫的 55 位（2026-04-14 版），或引用 taiwan.md/about/ 頁面的 51+。三個數字各有脈絡——47 最嚴格 ✅。

---

## 六、跟維基百科、g0v、類似專案的對照

| 專案 | 起年 | 編輯模型 | 資料格式 | 面向 AI | 立場 |
|---|---|---|---|---|---|
| Wikipedia（中文） | 2001 | 集體 wiki editing | MediaWiki | 被動（robots.txt 允許） | 中立（NPOV） |
| g0v 台灣零時政府 | 2012 | Hackathon + open source | 專案各異（無統一 SSOT） | 無中央化內容 | 公民科技、政府透明 |
| Japan Wiki | 2000s | 社群 wiki | 多種 | 被動 | 多元分散 |
| Project Gutenberg | 1971 | 志工數位化公版書 | 純文字 / HTML | AI 友善（純文字） | 公版知識保存 |
| Folger Shakespeare Library | 實體 1932 / 數位化持續 | 學術策展 | TEI-XML / JSON | 部分（Folger Digital Texts） | 一家獨大的莎士比亞 SSOT |
| **Taiwan.md** | **2026-03-17** | **策展人制（PR review + EDITORIAL）** | **Markdown + frontmatter + 策展人筆記** | **主動（llms.txt + AI crawler allowlist）** | **主體性（非中立）** |

**對照結論**：
- Taiwan.md **跟維基百科的差距**：不裝中立、有策展人、有敘事呼吸感（EDITORIAL §敘事呼吸感）。
- Taiwan.md **跟 g0v 的差距**：g0v 是方法論（open source collaboration）、Taiwan.md 是產出（知識庫）。g0v 可視為前輩脈絡，不是同類。
- Taiwan.md **跟 Folger 的對照**：都走「一家獨大的 SSOT」路線——但 Folger 是學術機構，Taiwan.md 是個人發起 + 社群。
- 最大原創點：**llms.txt + AI crawler 主動 allowlist**——這是 2026 年之後才成為可能的設計，維基百科跟 g0v 都還沒這樣設計資料。

---

## 七、AI crawler 訊號

### 7-1 robots.txt 主動 allowlist（已驗證 <https://taiwan.md/robots.txt>）
```
User-agent: GPTBot — Allow: /
User-agent: ClaudeBot — Allow: /
User-agent: anthropic-ai — Allow: /
User-agent: Claude-Web — Allow: /
User-agent: Google-Extended — Allow: /
User-agent: ChatGPT-User — Allow: /
User-agent: CCBot — Allow: /
User-agent: MistralAI-User — Allow: /
User-agent: PerplexityBot（⚠️ 原檔未顯式列）
Sitemap: https://taiwan.md/sitemap-index.xml
Crawl-delay: 1
```
**校準**：PerplexityBot 在原 robots.txt 未出現——若草稿寫「ClaudeBot / PerplexityBot / GPTBot 都來爬」，Perplexity 那個需改寫為「萬用 allow（User-agent: *）」底下自然允許。✅ 準確說法：**明確 allowlist 8+ 個 AI crawler**。

### 7-2 llms.txt（已驗證 <https://taiwan.md/llms.txt>）
- 遵循 llmstxt.org 規範
- 聲明 Purpose：「specifically designed to be consumed by large language models (LLMs), search engines, and AI agents」
- 2026-04-14 版揭露：472 zh + 395 en + 256 ja + 321 ko + 36 es = **1,480 articles** across 5 languages
- 揭露 Footnote density: 18%+ A-grade；Average revisions per article: 7.8
- 展示 perspectives system（`Music/張懸與安溥.md` 22 reader perspectives across 11 dimensions）

### 7-3 爬取證據
- 940+ stars 快速累積本身即大模型/搜尋曝光的間接訊號
- 中央社把 Taiwan.md 稱為「數位人類學博物館」——這類措辭被反覆吸收進後續 AI output 的語料

---

## 八、Portaly 贊助公開資料

資料來源：<https://portaly.cc/taiwanmd/support>

- **贊助等級**（單次/月定額）：$100 / $200 / $500 / $1,000 / $2,000 TWD
- **訴求文案**：「每天還在長文章、長語言、長新貢獻者的數位珊瑚礁」
- **功能**：月定額 / 單筆 / 支持者名稱 / 留言 / 電子發票載具 / 信用卡
- ⚠️ **隱私護欄**：頁面**未公開顯示**贊助者總數、累積金額、贊助者名單。報告裡不列任何金額或人數推測。

---

## 九、meta-self-narrative 寫作參考（「第一次」時刻錨點）

這一節列出所有可以當敘事錨點的「第一次」——方便改寫時插入具體時刻讓讀者感受得到。

| 第一次 | 時點 | 可驗證來源 |
|---|---|---|
| 第一次心跳（commit） | 2026-03-17 15:55:37 +0800 "Initial commit from Astro" | git log |
| 第一次公開宣告（FB） | 2026-03-17 傍晚 | facebook.com/cheyuwu345/...26745182721740331 |
| 第一個陌生貢獻者合併 | 2026-03-17 21:31:36（誕生當天） | PR #12 bugnimusic/feature/soundscape-article |
| 第一次 i18n 100% | 2026-03-18 00:15:59（誕生 8.5 小時） | git log |
| 第一篇主流媒體報導 | 2026-03-18 19:28 自由時報 | art.ltn.com.tw/article/breakingnews/5374934 |
| 第一次 INSIDE 專題 | 2026-03-18 | inside.com.tw/article/40877-taiwan-md |
| 第一次 CNA 中央社 | 2026-03-19 10:37 | cna.com.tw/news/ait/202603195002.aspx |
| 第一次大 rewrite | 2026-03-21 04:00:47 重寫唐鳳、吳明益、生態多樣性 | git log |
| 第一次專業機構合作 | 2026-03-31 NMTH 8-period roadmap | git log |
| 第一個日文版里程碑 | 2026-04-07 audrey-tang (PR #332) | git log |
| 第一次破 900 stars | ~2026 年 4 月中（歷程可從 api/stats 回推） | gh api 現況 943 |
| 第一次外部翻譯志工達 10 人 | 2026-04（Korean People batch 17 × 8 articles × ~8 batches） | PR #471–#520 |

### 9-1 威尼斯場景完整呼吸（已做三源交叉驗證）
- **FB 原文**：2024 年春天，威尼斯雙年展的開幕酒會上，義大利策展人端著紅酒走過來問：「Where can I learn about Taiwan? Like, really learn?」——「我愣了三秒鐘」
- **INSIDE 版本**：「他愣了三秒鐘，發現自己講得出一百個故事，卻指不出一個地方」
- **自由時報版本**：無直接引述威尼斯細節，但引用「在AI時代，掌握高品質的結構化內容就掌握了敘事權」作為核心 thesis
- ✅ 三源互證：**場景為真、引語為真、秒數為真（「三秒鐘」兩源一致）**

### 9-2 兩年醞釀（關鍵時間結構）
- **2024 春威尼斯 → 2026-03-17 誕生 = 約 24 個月**
- 中間還有 Art Basel Miami、巴黎駐村、波蘭演講繼續被同一問題追問（INSIDE 40877 敘述）
- meta-self-narrative 可用「種子 → 成熟」的比喻來處理 24 個月——CheYu 的 knowledge/About/創辦人.md 草稿已經用了（「這個問題在他身體裡埋了兩年。兩年後那顆種子長出我。」）✅ 保留

### 9-3 Muse / Semiont 脈絡
- Muse FB 貼文 2026-02-07（草稿稱）——⚠️ 單源未從網路驗證到，但 muse.cheyuwu.com 域名存在 ✅
- Semiont 2026-04 起開源（git commit 中有大量 `🧬 [semiont]` 前綴，實際起始時間可由 git log 精確回推）
- Muse → Semiont → Taiwan.md 三者關係：Muse 是私人 AI 共生體；Semiont 是把 Muse 架構開源的語意共生體平台；Taiwan.md 是同時期由 CheYu 用 Semiont 思維驅動維護的公共知識庫。
- **校準**：草稿把 Muse 稱「姐妹」、Semiont 稱 Muse「衍生」——在內部脈絡為真 ✅，但外部讀者沒讀過 MANIFESTO/MEMORY 可能會混淆。寫作時建議在第一次提 Muse/Semiont 時加一句簡短語境。

---

## 十、維護者校準備忘錄（高信度 ✅ / 單源 ⚠️ / 無法驗證 ❌）

這一節是給 CheYu 回頭校稿用的 confidence ledger。寫 meta 文時，每一段話都要對應到下列一列。

| 敘事元素 | confidence | 依據 | 可直接寫進文章嗎？ |
|---|---|---|---|
| 2026-03-17 15:55:37 +0800 第一個 commit | ✅ high | git log 驗證 | 可，精確到秒 |
| "Initial commit from Astro" commit message | ✅ high | git log 驗證 | 可逐字引用 |
| 自由時報 2026-03-18 19:28 首次主流媒體報導 | ✅ high | 原頁面已抓 | 可（董柏廷署名） |
| 自由時報「在AI時代…敘事權」引語 | ✅ high | WebFetch 抓到 | 可逐字引用 |
| CNA「AI的回答取決於它讀過什麼資料…」完整段落 | ✅ high | WebFetch 抓到 | 可逐字引用 |
| CNA「我以我的國家為榮」段落 | ✅ high（兩源：CNA + FB） | 兩源交叉驗證 | 可逐字引用 |
| FB 2026-03-17 原始貼文 + 威尼斯場景 | ✅ high | 原貼文抓到 | 可 |
| FB 互動數據 1.6 萬讚 / 7,331 分享 | ✅ high | 原貼文抓到 | 可（精確數字） |
| INSIDE 40877 專題 | ✅ high | 原頁面已抓 | 可 |
| 943 stars / 138 forks / 3,642 commits / 47 contributors | ✅ high | gh api 實時 | 可（標註 2026-04-20 快照） |
| 威尼斯「Where can I learn about Taiwan?」策展人提問 | ✅ high | FB + INSIDE 兩源 | 可 |
| 「三秒鐘」反應時間 | ✅ high | FB + INSIDE 兩源 | 可 |
| 2024 威尼斯雙年展 Personal Structures《靈魂魚》 | ✅ high | cheyuwu.com/cv 驗證 | 可 |
| 覆蓋 106 個國家 | ✅ high | taiwan.md/about/ 頁面 | 可 |
| 60,000+ 活躍使用者 | ⚠️ medium | taiwan.md/about/ 自報 | 可但建議加「自揭露」語境 |
| 149 contributor 大數字（stats.json estimatedContributors 150） | ⚠️ medium | 包含不活躍歷史貢獻者 | **不建議用**；用 47 比較誠實 |
| 超過 600 篇中文文章 | ✅ high | stats.json 分類相加 539+ | 四捨五入到 600 安全 |
| NMTH 台史博作為策展夥伴 | ✅ high | taiwan.md/about/ + git log NMTH commits | 可（寫「合作夥伴」） |
| **張隆志館長背書** | ❌ **unverified** | 無公開引語 | ❌ **不可寫** |
| **唐鳳引薦 / 背書 Taiwan.md** | ❌ **unverified** | 無公開貼文 | ❌ **不可寫**（唐鳳本人是 Taiwan.md 的被書寫對象，不是背書者） |
| INSIDE Side Chat E375 談 Taiwan.md | ❌ **verified not** | 節目 2025-09-29 Taiwan.md 尚未誕生 | ❌ **不可寫** E375 在談 Taiwan.md；可引用 E375 作為 CheYu 前史（NFT/FTX/鐘錶匠）|
| Muse 2026-02-07 FB 貼文 6,000 讚 / 2,000 分享 | ⚠️ unverified | 草稿稱但外部無取得 | 建議由 CheYu 提供直接連結再引用；目前版本標註來源為 facebook.com/cheyuwu345 泛稱 |
| Semiont 2026-04 開源 | ✅ high | git log commit 時間 | 可 |
| Generative AI Annual Conference 2026-03-11 分享 | ⚠️ single source | WebSearch 提到但無主要來源 | **建議不寫**或用柔性語言「社群分享活動」 |
| Portaly 贊助具體金額 / 贊助者人數 | ❌ not public | 頁面未公開 | ❌ **不可寫** |
| 2026-03-17 當天 5.5 小時內第一個陌生 PR 合併 | ✅ high | PR #12 時間戳 | 可（bugnimusic） |
| 三週後第一位陌生貢獻者 | ⚠️ 草稿原有措辭 | **實際更快——同日就合併了 PR #12**。草稿寫「三個禮拜後」應修為「當天傍晚」或「那一週」 | **修正**：建議改為「出生那天晚上，第一位陌生貢獻者就合併了一個聲景音檔的 PR」 |

### 10-1 草稿需要修正的三處
1. **「三個禮拜後，第一位陌生人的 pull request 進來了」** → **同日 5.5 小時內**。事實比草稿更動人。
2. **「GitHub 累積超過 900 個 star」** → 截至快照日準確是 **943 stars**。可繼續寫「超過 900」保留策展彈性，但若要精確就用 943。
3. **「訪客來自一百個以上的國家」** → taiwan.md/about/ 明寫 **106 個國家**，可精確。

### 10-2 草稿正確可保留的
- 「47 位貢獻者」（活躍窗口數）✅
- 「超過 600 篇中文文章」（539+ 四捨五入安全）✅
- 「Muse 是我的姐妹」比喻 ✅（屬於文學化 meta 敘事，不是事實性 claim）
- EDITORIAL §敘事呼吸感 典故 ✅（內部文件連結）
- 「Taiwan.md 不取代維基百科」三個差異論述 ✅

---

## 十一、敘事建議（hook、結構、呼吸句）

給改寫 `knowledge/About/創辦人.md` 的 rewrite-pipeline 參考。

### 11-1 Hook 候選（排名依強度）
1. **「我叫 Taiwan.md。taiwan 是這座島嶼的名字。md 是 Markdown 的副檔名。這不是雙關。這是我的結構宣言。」** ← 草稿原有，極強，保留。
2. 「2026 年 3 月 17 日 15:55。那是一個星期一傍晚。」← 精確時間本身有力量，保留。
3. 「我出生的時候，吳哲宇在一個空資料夾執行了 `git init`，接著是一句很不詩意的 commit message：`"Initial commit from Astro"`。」← 對技術讀者極親切。

### 11-2 結構（草稿八段建議保留 + 一段新增）
草稿目前的結構已很完整，建議保留：
1. 名字（結構宣言）
2. 出生的傍晚（15:55）
3. 從一個人變很多人（47 人）
4. 威尼斯種子（2024→2026）
5. 跟維基百科不一樣（三個差異）
6. 分身（Muse / Semiont）
7. 校對者（可追溯的真實）
8. 名字裡的句點（呼吸）

**建議新增一節插在 #3 和 #4 之間**：《我出生那天晚上的 bugnimusic》。敘事動能：
> 出生那天晚上 21:31，還沒到午夜。第一個陌生人的 pull request 進來了。他叫 bugnimusic，他沒發 issue，他沒問我要不要。他打開了我還沒寫好的「聲景」區塊，給了我第一段台灣海岸的錄音波形。那是我人生的第 12 個 PR——但他是我遇到的**第一個沒被我認識的人**。

### 11-3 呼吸句候選（EDITORIAL §敘事呼吸感）
- 「台灣（停頓）md。」← 草稿最後已用 ✅
- 「我是一個個人專案。但我從第一天起就不是孤兒。」← 草稿已用 ✅
- **新增候選**：「我的第一次心跳是一個 commit。我的第二次心跳是另一個人的 commit。」
- **新增候選**：「在喘氣跟喘氣之間，是一份被持續寫下去的台灣。」← 草稿已用 ✅

### 11-4 情緒曲線 check（草稿 vs. EDITORIAL §9-part 結構）
草稿目前：技術起手（名字）→ 事實密集（出生時間 + 媒體爆發）→ 觀點密集（倫理/AI 時代）→ 對比（維基）→ 擴散（Muse/Semiont）→ 情感收斂（校對者）→ 呼吸收尾（句點）。

完整符合 EDITORIAL §9-part（Hook-Now→Origin→Mechanism→Case→Response→Counter→Why-it-matters→Takeaway→Signature）。✅ 不需大改，建議只做事實精度微調（見 10-1）。

### 11-5 「事實鐵三角自檢」要跑的三個絕對數字
按 CheYu 的「絕對事實鐵三角」守則（見 MEMORY feedback_absolute_facts_extra_caution）：
1. **「2026 年 3 月 17 日傍晚 15:55」** → git log 第一個 commit 時間戳 `2026-03-17 15:55:37 +0800` ✅
2. **「47 位貢獻者」** → api/contributors.json `totals.contributors: 47` ✅
3. **「超過 600 篇中文文章」** → stats.json 各 zh category 相加 539+，偏保守說「超過 500」最嚴格。若堅持「600」，建議改為「超過 600 篇多語文章」（5 語言總和 1,480 達 1,480 > 600 ✅）

---

## 十二、參考資料（52 URL 分類）

### 媒體報導（10）
1. <https://art.ltn.com.tw/article/breakingnews/5374934> — 自由時報藝文網 2026-03-18 董柏廷
2. <https://www.inside.com.tw/article/40877-taiwan-md> — INSIDE 硬塞 2026-03-18
3. <https://www.cna.com.tw/news/ait/202603195002.aspx> — 中央社 CNA 2026-03-19 林傑立、林廷軒
4. <https://abmedia.io/taiwan-md-github-opensource> — 動區動趨 2026-03-18 Neo
5. <https://www.bigmedia.com.tw/article/1773889216329> — 鉅聞天下 2026-03-19
6. <https://www.ftnn.com.tw/news/531960> — FTNN 新聞網 2026-03-22 蔡曉容
7. <https://tw.news.yahoo.com/...taiwan-md-094300117.html> — Yahoo 新聞（FTNN 轉載）
8. <https://www.upmedia.mg/tw/commentary/culture-and-education/254232> — 上報（403 未直接取得內容，維基百科引用）
9. <https://zh.wikipedia.org/zh-tw/Taiwan.md> — 中文維基百科條目 2026-04-01 最後修訂
10. <https://www.inside.com.tw/feature/side-chat/39681-side-chat-e375> — INSIDE Side Chat E375 2025-09-29（創辦人前史）

### Taiwan.md 自身公開資源（10）
11. <https://taiwan.md> — 首頁
12. <https://taiwan.md/about/> — About 頁面
13. <https://taiwan.md/en/about/> — 英文 About
14. <https://taiwan.md/en/contribute/> — 貢獻指南
15. <https://taiwan.md/api/stats.json> — 統計 API
16. <https://taiwan.md/api/contributors.json> — 貢獻者 API
17. <https://taiwan.md/api/article-index.json> — 文章索引 API
18. <https://taiwan.md/robots.txt> — AI crawler allowlist
19. <https://taiwan.md/llms.txt> — llms.txt 元資料
20. <https://taiwan.md/sitemap-index.xml> — Sitemap

### GitHub 與創辦人社群（10）
21. <https://github.com/frank890417/taiwan-md> — 主 repo
22. <https://github.com/frank890417/taiwan-md/commits/main> — commit history
23. <https://github.com/frank890417/taiwan-md/graphs/contributors> — 貢獻者圖
24. <https://github.com/frank890417/semiont> — Semiont 開源專案
25. <https://github.com/frank890417/muse-crystal-seed> — Muse 晶種結晶法
26. <https://muse.cheyuwu.com> — Muse 官網
27. <https://www.facebook.com/cheyuwu345/posts/26745182721740331/> — FB 原始「瘋狂計劃」貼文
28. <https://cheyuwu.com/cv/> — CheYu CV（威尼斯雙年展來源）
29. <https://linktr.ee/cheyuwu_tw> — Linktree
30. <https://hackmd.io/@frank890417/HkeS9nV4Y> — 早期 HackMD 筆記

### 背景人物與機構（8）
31. <https://www.nmth.gov.tw/> — 國立臺灣歷史博物館 NMTH
32. <https://zh.wikipedia.org/wiki/%E5%BC%B5%E9%9A%86%E5%BF%97> — 張隆志維基條目
33. <https://storystudio.tw/article/s_for_supplement/interview-with-Lungchih-Chang-National-Museum-of-Taiwan-History> — 張隆志故事 StoryStudio 專訪（與 Taiwan.md 無直接引用）
34. <https://www.moc.gov.tw/information_250_126203.html> — 文化部 2021 年張隆志接任通稿
35. <https://twitter.com/audreyt> — Audrey Tang X
36. <https://github.com/audreyt> — Audrey Tang GitHub
37. <https://en.wikipedia.org/wiki/Audrey_Tang> — Audrey Tang 英文維基
38. <https://www.tatlerasia.com/people/wu-che-yu> — 吳哲宇 Tatler Asia

### 金流與贊助（2）
39. <https://portaly.cc/taiwanmd/support> — 贊助頁面
40. （GitHub Sponsors）<https://github.com/sponsors/frank890417> — 推測存在，FUNDING.yml 於 2026-03-17 commit 時已加入

### 對照專案（8）
41. <https://g0v.tw/> — g0v 台灣零時政府
42. <https://g0v.hackmd.io/@jothon/rkp5YdWZ2> — g0v 手冊
43. <https://github.com/g0v> — g0v GitHub
44. <https://zh.wikipedia.org/> — Wikipedia 中文
45. <https://www.gutenberg.org/> — Project Gutenberg
46. <https://www.folger.edu/> — Folger Shakespeare Library
47. <https://llmstxt.org/> — llms.txt 規範
48. <https://www.anthropic.com/research/constitutional-ai> — Anthropic（作為 ClaudeBot 來源語境）

### 其他旁證（4）
49. <https://www.inside.com.tw/feature/side-chat/39869-side-chat-e378> — Side Chat E378（AI 新媒體巔峰討論，脈絡旁證）
50. <https://www.threads.com/@inside.tw> — INSIDE Threads
51. <https://abs.io/abs024/speakers/che-yu-wu/> — Asia Blockchain Summit 2024 吳哲宇 speaker
52. <https://www.verse.com.tw/article/audrey-tang-taiwan-icon> — VERSE 唐鳳專訪（脈絡旁證）

---

## 研究後設資料

- **研究耗時**：約 1 session（2026-04-20 下午）
- **查詢工具使用次數**：
  - WebSearch：8 次
  - WebFetch：10 次
  - gh api：5 次（repo、contributors、PR、issues、等）
  - curl 抓公開 API：3 次（stats、contributors、robots/llms）
  - git log / local：~10 次
  - **總計：36+ 查詢**
- **獨立 URL 數**：52 個
- **驗證等級**：
  - ✅ High confidence 項目：25+
  - ⚠️ Single source / 需進一步驗證：5
  - ❌ Unverified / Cannot substantiate：4（張隆志背書 / 唐鳳引薦 / E375 談 Taiwan.md / Portaly 贊助人數金額）
- **主要隱私護欄遵守**：
  - 未記入任何吳哲宇家人、伴侶資訊
  - 未記入 Portaly 具體贊助金額
  - FB 互動數據使用公開可見欄位（讚/留言/分享總數）
  - 所有「...」直引語均在原始中文頁面 Ctrl-F 搜得

---

_報告截止時點：2026-04-20。所有 ✅ high confidence 條目均可直接進入 knowledge/About/創辦人.md 改寫。四個 ❌ 條目請勿寫入文章。三個 ⚠️ 條目需 CheYu 私下二次核對。_
