---
title: '全站文章健檢普查：該標進化中的、可以轉正的、沒封面的、太單薄的'
description: '2026-11-04 全站 1,156 篇中文 SSOT 普查：A 應標 🌱 179 篇、B 可人審轉正 2 篇、C 缺封面 904 篇、D 內文簡陋 226 篇。附可機械判定的分級規則與分位數校準、五篇抽查、新文章判級與每週重算的制度設計，以及已實作的 article-census.py 與 curation-gap check。'
date: 2026-11-04
type: 'audit-report'
session: '2026-11-04-health-census'
related:
  - 'design-curation-tier-2026-08-04.md'
  - 'article-quality-audit-2026-07-16.md'
  - '../docs/pipelines/MAINTAINER-PIPELINE.md'
---

# 全站文章健檢普查（2026-11-04）

## 〇、一句話結論

1,156 篇中文裡，該補標 🌱 進化中的有 179 篇，可以人審轉正的只有 2 篇，沒有封面圖的 904 篇（78%，扛下 71% 的文章流量），內文簡陋該重寫的 226 篇。比名單長度更要緊的是出口：七月排進重寫隊列的 69 篇，三個半月後只有 4 篇再走過流程、49 篇仍然零腳註。而進化中說明條寫死了「由社群貢獻」，A 名單裡約 47 篇是 Taiwan.md 自己早期寫的，**直接套用會在站上說錯話**，要先改文案再標。

---

## 一、普查數字與分布

**範圍**：`knowledge/{Category}/*.md` 中文 SSOT 1,156 篇（14 個分類，不含 `knowledge/{lang}/` 譯文、`_` 開頭的 hub、`knowledge/resources/`）。About 9 篇是站務頁，分布與分級都排除。

**方法**：`scripts/tools/article-census.py` 一次跑完（全站 17 秒）。git 史只開一次 bulk `git log -M --name-status`，跟著改名往回接。article-health 在同一個行程內用 `ci-deploy` profile 跑（同 CI 部署閘門那把尺）。

**流量窗口**：GA 用本機快取 `~/.config/taiwan-md/cache/ga4-latest.json` 的 `by_lang_pages`（2026-10-07～11-04，28 天，約 500 條路徑。repo 內的 `dashboard-analytics.json` 只有前 20 名，不夠排序）。Search Console 用同目錄 `search-console-latest.json` 的 `pages`（10-27～11-02，7 天曝光）。工具會把用了哪個來源、窗口幾天寫進 JSON 的 `traffic_sources`。

### 1.1 現況

| 項目                                 | 數字                                            |
| ------------------------------------ | ----------------------------------------------- |
| `curation: incubating`               | 342 篇（29.6%）                                 |
| `curation: verified`                 | 2 篇                                            |
| 沒有 curation 欄位                   | 812 篇                                          |
| `lastHumanReview: true`              | 197 篇（17.0%）                                 |
| 找得到任一查證流程證據（定義見 §三） | 559 篇（48.4%）                                 |
| 有封面圖（frontmatter `image`）      | 252 篇，沒有 904 篇，外站熱連結 0，本地檔遺失 0 |
| article-health ci-deploy             | 0 篇 hard，warn 分布見 1.3                      |

### 1.2 分布（中位數與分位數，排除 About）

| 母體                                |  篇數 | 字數 p10／p25／p50／p75    | 腳註 p10／p25／p50 | 媒體 p50／p75 |
| ----------------------------------- | ----: | -------------------------- | ------------------ | ------------- |
| 全站                                | 1,147 | 1,538／2,043／3,165／4,626 | 0／7／12           | 0／3          |
| 走過 REWRITE（4/24 後或有研究報告） |   395 | 2,018／3,097／4,663／6,200 | 7／11／22          | 2／6          |
| 零查證證據                          |   596 | 1,393／1,800／2,715／3,786 | 0／6／10           | 0／1          |
| 已標 🌱                             |   342 | 1,433／1,920／3,108／4,470 | 0／7／10           | 0／3          |
| 近 45 天新文                        |    34 | 1,499／1,626／1,907／2,319 | 2／3／4            | 0／0          |

字數用 `word-count` plugin 的同一支計數（排除 frontmatter、程式碼、圖片語法、腳註定義與引用、HTML）。媒體＝正文圖＋iframe＋tw-\* 模組。完整分位數在 JSON 的 `distribution`。

三個讀數值得記下：

- **全站一半以上的文章正文零媒體**（媒體 p50 = 0）。走過 REWRITE 的中位是 2。
- **近 45 天新進的 34 篇比七月基準薄很多**：中位 1,907 字、4 條腳註（七月審核時近期中位是 6,556 字／22 腳註，那次用的是 dashboard 的字數尺，見下段）。34 篇裡 31 篇已標 🌱，21 篇落在 D 級。標記有做，只是進來的就是骨架。
- **兩把字數尺**：`dashboard-articles.json` 的 `wordCount`（`generate-dashboard-data.js` 的 `countWords`）把腳註文字、英文單字與數字都算進去，比 `word-count` plugin 中位多 663 字、p90 多 2,789 字。七月審核與 `article-depth-audit.py` 用的是前者，本次普查用後者（REWRITE Stage 4 的 depth 閘門也是後者）。兩份報告的字數不能直接比。

### 1.3 article-health 警示的分布（ci-deploy profile）

warn 檔數前幾名：prose-health 1,121 篇、media-richness 898、image-health 847、word-count 812（＜4,500 字）、seo-meta 681、paragraph-rhythm 547、format-structure 478、rationale-presence 432。跟可查證性直接相關的 footnote-density 只有 145 篇（127 篇 C 級：沒有正式腳註但有網址），attribution-vague 7 篇。

本次新增的 `curation-gap` check 全站跑出 179 條 warn，跟普查 A 級逐篇一致（同一套規則，見 §六）。

---

## 二、四級名單摘要

完整名單：`reports/article-census/2026-11-04-tier-{A,B,C,D}.txt`（每行一個 repo 路徑，`#` 開頭是註解，`curation-tag.py --files` 會跳過）。每篇的全部欄位在 `reports/article-census/2026-11-04.json` 的 `articles`（一篇一行）。一篇可以同時在好幾級。

### A 級：應標 🌱 進化中（目前沒標）— 179 篇

- 名單檔 167 篇。另外 12 篇是 featured，套用時 `curation-tag.py` 會把精選改掉＝動首頁，所以沒放進預設名單，列在檔頭註解等決定。凍結中的文章（`config/babel-hold.tsv`，沈伯洋／蔣萬安／陳致中）會被自動排除，這次三篇都有查證證據，本來就不在 A。
- 理由：A1（零證據＋單薄）153 篇，其中 120 篇因字數、33 篇因腳註。A2（heal 漏標）27 篇，其中 1 篇兩者都中。名單檔裡 A2 27 篇、只中 A1 的 140 篇。
- 組成：People 57、Culture 22、Food 20、History 16、Society 16、Economy 11。首次進站在 3–4 月的 122 篇、8 月的 28 篇。43 篇 `lastHumanReview: true`（早期人工看過）。171 篇同時沒有封面，47 篇同時是 D 級。
- 套用後的比例：已標 🌱 會從 342 篇變成 509 篇（44%）。設計報告當初擔心「77.6% 被標未查證」的自貶，44% 還在那條線以下，但已經是「將近一半」，這是要哲宇看的數字（§八 #5）。

流量前 15：

|   # | 文章                                                                       | GA 28 天 | SC 曝光 7 天 | 字數／腳註 | 理由                        |
| --: | -------------------------------------------------------------------------- | -------: | -----------: | ---------- | --------------------------- |
|   1 | [魏哲家](../knowledge/People/魏哲家.md)                                    |      116 |        2,492 | 1,322／5   | A1（lastHumanReview: true） |
|   2 | [菜市場名](../knowledge/Culture/菜市場名.md)                               |      106 |          423 | 1,168／8   | A1（lastHumanReview: true） |
|   3 | [萊爾富](../knowledge/Economy/萊爾富.md)                                   |      104 |        1,884 | 1,878／15  | A1                          |
|   4 | [台灣都市發展與城鄉差距](../knowledge/Geography/台灣都市發展與城鄉差距.md) |      103 |          328 | 3,306／0   | A1（lastHumanReview: true） |
|   5 | [十大建設](../knowledge/History/十大建設.md)                               |       93 |          623 | 1,800／26  | A1                          |
|   6 | [關聖帝君信仰](../knowledge/Culture/關聖帝君信仰.md)                       |       90 |          467 | 2,632／0   | A1                          |
|   7 | [外省人](../knowledge/Society/外省人.md)                                   |       88 |          905 | 1,363／21  | A1                          |
|   8 | [阿翰](../knowledge/People/阿翰.md)                                        |       85 |        1,575 | 1,798／14  | A1                          |
|   9 | [鳳梨酥](../knowledge/Food/鳳梨酥.md)                                      |       82 |            0 | 1,365／10  | A1                          |
|  10 | [台灣滷肉飯](../knowledge/Food/台灣滷肉飯.md)（精選，不在預設名單）        |       81 |          737 | 1,832／5   | A1（lastHumanReview: true） |
|  11 | [蚵仔煎](../knowledge/Food/蚵仔煎.md)                                      |       79 |          373 | 1,820／14  | A1                          |
|  12 | [史前時代與原住民](../knowledge/History/史前時代與原住民.md)（精選）       |       77 |            0 | 1,484／5   | A1（lastHumanReview: true） |
|  13 | [林爽文事件](../knowledge/History/林爽文事件.md)                           |       71 |          878 | 2,913／12  | A2                          |
|  14 | [台灣企業：瑞昱半導體](../knowledge/Economy/台灣企業：瑞昱半導體.md)       |       71 |          386 | 1,940／5   | A1（lastHumanReview: true） |
|  15 | [婦女運動](../knowledge/History/婦女運動.md)                               |       69 |           93 | 4,839／23  | A2                          |

**A2 的 27 篇是一個獨立事件**：8/13～8/20 進站的投稿（idlccp1984 8/15、8/20 共 26 篇＋stantheman0128 一篇），MAINTAINER-PIPELINE §1b 規定 merge 後的 heal 要設 `curation: incubating`，這批一篇都沒設。內容不見得差（婦女運動 4,839 字／23 腳註／6 張圖），但進站後沒走過任何查證，規則就是先標再審。名單：歌仔戲、台灣口語特色、四秀仔、布農族小米歲時祭儀、鄒族戰祭、台灣造船業、新台幣、生活市集、蘿蔔糕、中華民國美學、自來水、阿里山林業鐵路、823砲戰、台灣廣播史、嘉義農林、國家鐵道博物館、婦女運動、林爽文事件、臺灣議會設置請願運動、六指淵、尼克星、廖添丁、張忠仁與張忠義、理科太太、台灣人工生殖、社區大學黃武雄、功字裡的那根反斜線。

### B 級：已標 🌱 但可能已經夠好（人審轉正候選，本次不動）— 2 篇

| 文章                                                 | 標記日     | 標記後走過                                                    | 腳註／字數 |
| ---------------------------------------------------- | ---------- | ------------------------------------------------------------- | ---------- |
| [馬祖國際藝術島](../knowledge/Art/馬祖國際藝術島.md) | 2026-08-05 | REWRITE（8/06 Stage 3 大驗證輪 11 席、v4 全篇重寫、r2）       | 48／7,798  |
| [台灣黑熊](../knowledge/Nature/台灣黑熊.md)          | 2026-08-23 | FACTCHECK 月度巡邏 9/21：32 個原子 0 ❌（巡邏以來第一篇零錯） | 11／5,413  |

馬祖那篇是 Semiont 自己的 NEW，Stage 2 落地時先標了 🌱，Stage 3 跑完忘了拿掉。台灣黑熊是投稿者 8/22 重寫、巡邏抽查全對。342 篇已標裡，標記之後又走過流程的只有 7 篇，另外 5 篇不是太薄（八點檔 1,290 字、江蕙、蔡依林）就是 ARTICLE-INBOX 還掛著未完成條目（吉祥物、台灣全齡共融旅遊）。**B 級這麼少本身就是讀數**：進化中的文章幾乎沒有在進化。

### C 級：沒有可用封面圖 — 904 篇（78%）

| 型  | 篇數 | 意思                                           | 補法                             |
| --- | ---: | ---------------------------------------------- | -------------------------------- |
| C1  |   22 | 沒封面，但正文已經有本地圖                     | 把那張升格成 `image`＋補授權三欄 |
| C2  |  133 | 沒封面，正文只有外站圖（Wikimedia 內文熱連結） | `image-ingest.mjs` 收進庫再升格  |
| C3  |  749 | 沒封面，正文也沒有任何圖                       | 要從頭找圖                       |

另有 15 篇帶 `imageNote`（9/05 收熱連結時來源下架或授權不明，已記待補）。沒封面的 904 篇扛了 GA 文章流量的 71%（19,247／27,158）。179 篇精選裡 117 篇沒封面。分類看，Politics 20／21、History 82／92、Nature 36／41、People 249／296 沒封面，比例最高。

C1 名單（成本最低，建議第一批）：鐵牛杰哥、彎彎、李宗盛、高雄加工出口區、叭噗冰、台灣黑熊、排隊、呱吉、彰化縣、西螺鎮、1935新竹臺中地震、杉林溪、Joeman、周天成、百靈果 News、蔣經國、諸葛四郎、陳文郁、館長陳之漢、歡樂無法黨、冷氣與能源貧窮議題、電網韌性。

**沒有封面時站上顯示什麼**（讀 `src/` 確認）：

- **文章頁頂**：`ArticleHero` 改用分類預設封面當背景（`src/utils/categoryConfig.ts` 的 `cover`）。有封面時頂部改成實色，封面放進正文第一張 figure 並附 `imageCredit／imageLicense／imageSource` 圖說。正文已經放了同一張圖時讓位（`heroImageInBody`）。
- **卡片**（首頁、分類 hub、最新、探索、時間軸、相關文章 rail）：`ArticleCard` 退成分類色漸層＋分類 emoji。
- **OG 社群圖**：跟 `image` 無關。`SEO.astro` 一律用 `scripts/core/generate-og-images.mjs` 在 build 時產的文字卡（`/og-images/{cat}/{slug}.jpg`），檔案不存在才退到 `/images/taiwan-social.jpg`。所以缺封面不會讓分享卡破圖，影響的是卡片牆與文章頂。
- **附帶發現**：14 個分類的預設封面全部是 `upload.wikimedia.org` 的縮圖熱連結。904 篇沒封面的文章頂部，背景其實都在熱連結 Wikimedia。卡片圖的熱連結 9/05 已經收掉（OBSERVER-QUEUE #42），這 14 張是漏網的。

### D 級：內文簡陋（該進 REWRITE），依流量排序 — 226 篇

五條軸（字數、腳註、正文章節、媒體、段落）弱 3 條以上才算。185 篇弱 3 軸、39 篇弱 4 軸、2 篇 5 軸全弱。弱的是哪幾軸：零媒體 225、字數 196、腳註 194、段落 96、章節 10。也就是說，**單薄文章幾乎都是「字少＋來源少＋零媒體」三件一起來**。

D 級裡 84 篇已經標 🌱、80 篇在 ARTICLE-INBOX 已有未完成條目（大多是七月那批 69 篇）、95 篇其實走過查證流程但仍然單薄（四、五月 REWRITE 早期的產物，例：蕭上農）。新的、還沒排隊的有 146 篇。

|   # | 文章                                                                       | GA 28 天 | SC 曝光 | 弱軸                                    | 現況                 |
| --: | -------------------------------------------------------------------------- | -------: | ------: | --------------------------------------- | -------------------- |
|   1 | [蕭上農](../knowledge/People/蕭上農.md)                                    |      430 |     639 | 字數 1,788、零媒體、段落中位 33 字      | 走過流程             |
|   2 | [陳樹菊](../knowledge/People/陳樹菊.md)                                    |      327 |   1,658 | 字數 1,504、零媒體、段落中位 45 字      | 走過流程、INBOX 已登 |
|   3 | [特有種](../knowledge/Nature/特有種.md)                                    |      158 |     679 | 字數 2,240、腳註 5、零媒體              | 走過流程             |
|   4 | [魏哲家](../knowledge/People/魏哲家.md)                                    |      116 |   2,492 | 字數 1,322、腳註 5、零媒體              | A                    |
|   5 | [鱔魚意麵](../knowledge/Food/鱔魚意麵.md)                                  |      107 |   1,690 | 字數 1,460、腳註 0、零媒體              | 🌱、INBOX 已登       |
|   6 | [菜市場名](../knowledge/Culture/菜市場名.md)                               |      106 |     423 | 字數 1,168、零媒體、段落中位 52 字      | A                    |
|   7 | [台灣都市發展與城鄉差距](../knowledge/Geography/台灣都市發展與城鄉差距.md) |      103 |     328 | 腳註 0、零媒體、段落中位 31 字          | A                    |
|   8 | [Hello-Nico](../knowledge/People/Hello-Nico.md)                            |       93 |     593 | 字數 1,028、零媒體、段落中位 22 字      | 走過流程             |
|   9 | [外省人](../knowledge/Society/外省人.md)                                   |       88 |     905 | 字數 1,363、零媒體、段落 11 段          | A                    |
|  10 | [日治時期](../knowledge/History/日治時期.md)                               |       86 |   2,124 | 字數 1,697、腳註 5、零媒體              | 走過流程、INBOX 已登 |
|  11 | [台灣企業：和碩聯合](../knowledge/Economy/台灣企業：和碩聯合.md)           |       81 |     679 | 腳註 5、零媒體、段落中位 42 字          | —                    |
|  12 | [濁水溪公社](../knowledge/Music/濁水溪公社.md)                             |       79 |     183 | 字數 1,832、零媒體、段落中位 44 字      | 走過流程             |
|  13 | [林青霞](../knowledge/People/林青霞.md)                                    |       77 |   2,885 | 字數 2,399、腳註 5、零媒體、段落        | 走過流程             |
|  14 | [史前時代與原住民](../knowledge/History/史前時代與原住民.md)               |       77 |       0 | 字數 1,484、腳註 5、零媒體              | A（精選）            |
|  15 | [牛肉湯](../knowledge/Food/牛肉湯.md)                                      |       75 |     637 | 字數 1,457、腳註 0、零媒體              | 🌱、INBOX 已登       |
|  16 | [國民政府遷台與戰後重建](../knowledge/History/國民政府遷台與戰後重建.md)   |       74 |   1,017 | 字數 2,423、零媒體、段落中位 52 字      | 走過流程             |
|  17 | [魚條](../knowledge/People/魚條.md)                                        |       74 |     290 | 字數 1,253、章節 1、零媒體、段落中位 25 | 走過流程             |
|  18 | [蔣為文](../knowledge/People/蔣為文.md)                                    |       72 |     332 | 字數 2,091、腳註 0、零媒體              | 🌱、INBOX 已登       |
|  19 | [台灣企業：瑞昱半導體](../knowledge/Economy/台灣企業：瑞昱半導體.md)       |       71 |     386 | 字數 1,940、腳註 5、零媒體              | A                    |
|  20 | [台灣騎樓文化與街景](../knowledge/Lifestyle/台灣騎樓文化與街景.md)         |       70 |     200 | 字數 2,165、腳註 0、零媒體              | 🌱、INBOX 已登       |

SC 曝光高但 GA 不在前段的幾篇也值得看：豬哥亮（曝光 7,448，1,828 字／1 腳註）、林青霞（2,885）、桂綸鎂（2,448，935 字）、魏哲家（2,492）。

### 七月那 69 篇現在怎樣

[2026-07-16 審核](article-quality-audit-2026-07-16.md)排進 ARTICLE-INBOX 的 69 篇，110 天後：只有 4 篇有新的流程證據（洪醒夫深度重寫，江蕙、蔡依林、台灣全齡共融旅遊是巡邏止血），49 篇仍然零腳註，62 篇仍在嚴重門檻下，62 篇全標著 🌱，60 篇落在本次 D 級。消化它的 `twmd-rewrite-daily` 從 7/25 起兩台都停、改手動觸發（算力考量，ROUTINE.md 註 ²¹），這個隊列實際上沒有固定的消費者。

---

## 三、判準與校準依據

### 3.1 「查證流程證據」怎麼算

設計報告的原則是「判定看這篇走過哪些查證流程，不看誰寫的」。以下任何一項成立就算有證據：

1. **REWRITE commit**：主旨帶 `] rewrite:`、`] new:`、`twmd-rewrite`、`REWRITE`、`重寫`，且主旨點名這篇或這個 commit 只動 ≤2 篇中文文章。`evolve:` 同時用在文章 EVOLVE 與系統自我進化，只有點名這篇才算。
2. **FACTCHECK commit**：主旨帶 `巡邏`、`FACTCHECK`、`事實查核`、`查核`、`review-stock`，且點名這篇或只動這一篇。research 檔是 FACTCHECK audit trail（`status: 'audit'`）也算。
3. **流程簽名**：上面兩種 commit 必須是 Taiwan.md 自己的流程跑的（主旨有 🧬，或作者是維護者身分）。投稿 commit 自述「事實查核通過」是投稿者自評，不算。這條認的是流程簽名，文章作者是誰不影響判定。
4. **research 報告**：frontmatter `researchReport` 或 `reports/research/**/{檔名}.md` 存在。
5. **ARTICLE-DONE-LOG** 收錄、**preReview** 查證單存在、或 `curation: verified`。

批次 commit（例：一次動 575 篇的 frontmatter 正規化）不會把證據灑到每一篇。「現代流程」以 2026-04-24（Stage 3.6 STORY ATOM AUDIT 誕生）為界，之前的 rewrite 照算證據，但不當 B 級轉正依據。

### 3.2 四級規則（全部寫在 `lib/article_health/census.py`）

**A 應標 🌱**（排除已有任何 curation 值與 About）：

- **A1**：零查證證據 ∧（腳註 < 5 ∨ 字數 < 2,000 ∨ 腳註定義了但正文零引用）
- **A2**：首次提交者不是維護者身分 ∧ 首次進站 ≥ 2026-08-04（§1b 規則生效日）∧ 進站後零查證證據

**B 可人審轉正**：已標 🌱 ∧ 標記日**之後**（嚴格晚於）走過現代 REWRITE 或 FACTCHECK ∧ 腳註 ≥ 11 ∧ 字數 ≥ 3,000 ∧ 八成以上腳註有被正文引用 ∧ ARTICLE-INBOX 沒有這篇的未完成條目。標記日從 `git log -G -p` 算「`+curation: incubating` 多於 `-`」的最近一次，搬行（一加一減）不算重新標記。

**C 缺封面**：frontmatter `image` 空、指到不存在的本地檔、或外站網址。再依正文有沒有本地圖、外站圖分 C1–C5。

**D 內文簡陋**：五軸弱 ≥ 3：字數 < 2,500／腳註 < 8／正文章節 < 3（零 H2 時改看 H3，不把「該用 H2」的格式問題算成內容單薄）／零媒體且無封面／段落中位 < 55 字或散文段 < 8。

### 3.3 門檻怎麼來的

| 門檻         | 值        | 依據                                                     |
| ------------ | --------- | -------------------------------------------------------- |
| A 腳註地板   | 5         | 走過 REWRITE 的 395 篇，腳註 p5 = 5（95% 都有 5 條以上） |
| A 字數地板   | 2,000     | 走過 REWRITE 字數 p10 = 2,018，全站 p25 = 2,043          |
| D 字數       | 2,500     | 全站 p33 = 2,434，同七月嚴重門檻                         |
| D 腳註       | 8         | 全站 p25 = 7、p33 = 9，同七月次一級門檻                  |
| D 段落中位   | 55 字     | EDITORIAL §段落呼吸鐵律 1，全站 p5–p10                   |
| B 腳註／字數 | 11／3,000 | 走過 REWRITE 的 p25（11／3,097）                         |

A 級的意思因此是：「沒走過任何查證流程，而且至少有一個維度低於走過流程的文章底部一成」。七月審核用 AND（2,500 且 5），那次不看流程證據。這次另外要求零證據，所以地板可以改 OR，高度收到走過流程的底部。

**敏感度**（沒標、零證據的母體 312 篇，數字是 A1 篇數，不含 A2 獨中者）：

| 腳註 ＼ 字數 | < 1,500 | < 2,000 | < 2,500 | < 3,000 |
| ------------ | ------: | ------: | ------: | ------: |
| < 3          |      75 |     152 |     203 |     244 |
| **< 5**      |      76 | **153** |     204 |     244 |
| < 7          |     132 |     192 |     231 |     256 |
| < 8          |     149 |     203 |     236 |     258 |

採 5／2,000（153）。改成 5／2,500 會多 51 篇，套用後已標比例到 48%。

### 3.4 刻意不放進規則的東西

- **作者**：作者欄與首次提交者只記錄。A2 用到首次提交者，是因為 §1b 這條既有規則本身就是「走 PR 進站 → 先標」。它判的是「進站後沒走過查證」這個流程事實。
- **lastHumanReview: true 不豁免**：設計報告後記已經記過（洪醒夫 true 但 697 字 0 腳註），早期人工看過的標準跟現在不同。
- **article-health 的文筆類 warn**（prose-health、seo-meta 等）不進分級：那些量的是寫作品質，跟可查證性是兩個維度（REFLEXES #38 混維度）。可查證性只看腳註有沒有、有沒有被引用。footnote-density 的 C／D／F 級本來就等價於這兩件事，所以規則只吃檔案本身，plugin 跑單檔時才不會跟普查給出不同答案。

### 3.5 已知的限制

- **commit 主旨只算線索**：有些查證藏在 heal commit 裡沒用關鍵字（例：台灣滷肉飯 4/27 的「fake source authority audit」），會被當成零證據。偏向多標，錯了的代價是一條說明條。
- **首次提交者會失真**：維護者手動整合投稿 PR 時，git 作者變成維護者（萊爾富是 7/23 整合 idlccp1984 九個 PR 那次進站的）。A2 只抓得到原作者保留在 git 裡的情況。
- **偽陰性區**：零證據但在地板以上的 133 篇（下稱 A-watch），規則不標，但其中有一批跟設計報告擔心的同型（數字齊全、引語沒人核過）。見抽查第五篇。

---

## 四、抽查五篇

1. **[萊爾富](../knowledge/Economy/萊爾富.md)｜A1，判對。** 1,878 字、15 條腳註、零圖、用 H3 當章節。沒有任何查證 commit。正文有一句「『數位化不是為了科技而科技…』——這曾是萊爾富內部推動轉型時的核心信念」，引語找不到說話的人，是設計報告點名的 AI 生成典型。git 首次提交者是維護者（7/23 整合 PR），A2 抓不到它，A1 接住了。
2. **[婦女運動](../knowledge/History/婦女運動.md)｜A2，判對，但要講清楚它判的是什麼。** 4,839 字、23 腳註、6 張圖、封面在庫，看起來是用心的投稿。8/20 idlccp1984 以投稿 commit 進站，之後只有 9/05 一次收熱連結的 media heal。§1b 規則是「merge 後先標再審」，它漏了。這一級標下去的意思是「還沒被查過」，跟寫得好不好無關，所以說明條文案要分開（§五.5）。
3. **[台灣黑熊](../knowledge/Nature/台灣黑熊.md)｜B，判對。** 8/22 投稿者重寫、8/23 標 🌱、9/21 月度巡邏抽 32 個原子 0 ❌（research 檔 `status: 'audit'`），11 腳註／5,413 字／6 張圖／2 支影片。巡邏是 Quick Mode 抽樣，轉正前建議補一次冷讀席或 FACTCHECK Full，所以列 B 不直接轉。
4. **[蕭上農](../knowledge/People/蕭上農.md)｜D，判對，不是 A 也判對。** 全站 D 級流量第一（GA 430）。4/27 走過 REWRITE NEW，有 research 報告、DONE-LOG 有收、lastHumanReview: true，所以不該標 🌱。但它 1,788 字、零媒體、28 段散文中位只有 33 字（大量一兩句一段），是 REWRITE 早期產物的典型：查過，但寫得很碎。這篇該進 EVOLVE，不該掛進化中說明條，兩級分開才看得出這個差別。
5. **[台灣獼猴](../knowledge/Nature/台灣獼猴.md)｜不是 A，規則照設計放過，但它是偽陰性區的樣本。** 4/25 idlccp1984 投稿，2,008 字／12 腳註，剛好在地板上。之後只有 PR polish（§11 標點、腳註格式）、別篇 EVOLVE 順手加的連結與全站 frontmatter 正規化，沒有查證。正文引了史溫侯「牠們的肉又甜又嫩」，引語有腳註但沒人核過原文。規則讓它留在「無標示」，符合「多數早期文章大體正確」的設計。這 133 篇 A-watch 交給 review-stock 依流量挑著查比較合適，全標會把大體正確的文章一起貼上說明條。

另看了 A 級被排除的精選 [台灣滷肉飯](../knowledge/Food/台灣滷肉飯.md)：1,832 字／5 腳註，有幾次 PR 修補與「fake source authority audit」heal，但沒有 REWRITE 或巡邏。判 A 本身沒錯。它是首頁精選，所以留給哲宇決定（§八 #3）。

---

## 五、制度與自動化設計

先查了既有的：`curation-tag.py`（設欄位）、`curation-consistency`（取值與互斥）、`review-stock-pick.py`（每週三預審選篇，T1 分類、依流量）、`article-depth-audit.py`（七月方法論的儀器化，只做字數＋腳註、吃 dashboard 字數尺）、`inbox-audit.py`（INBOX 幽靈）、`image-ingest.mjs`／`land-media-batch.mjs`（圖片落地）、`prebuild:dashboard`（每次 build 已經跑一次全站 article-health 寫 `.health-sweep.json`）。普查盡量接這些，只補沒有的那層：把「流程證據」「封面狀態」「多軸單薄」放進同一列，並給 A 級一個 plugin。

### 5.1 新文章進站時怎麼自動判級

- **已上線（本次）**：`curation-gap` 是 article-health 的 WARN check，pre-commit（`--staged`）與 CI ci-deploy 都會跑到，訊息附可直接貼的 `curation-tag.py` 指令。淺 clone 或沒有 git 時降成 INFO 並講明證據不全，不冒充 WARN。
- **建議下一步**：`contributor-pr-heal.py --from-pr` 在 heal 步驟直接呼叫 `curation-tag.py --set incubating`。§1b 寫的是「heal 清單必含」，但 8/13–8/20 漏了 27 篇，代表靠人記不住。把它從清單項目變成工具動作。
- **建議第二步**：第一波 A 名單套用、文案改好之後，把 A2 在 pre-commit profile 升 HARD（`severity_overrides`）。A2 判的是規則有沒有照做，沒有策展判斷的成分。A1 維持 WARN。

### 5.2 既有文章怎麼持續重算

- **每次 build**：`prebuild:dashboard` 已經產 `scripts/tools/.health-sweep.json`。在它後面加一行 `article-census.py --health-in scripts/tools/.health-sweep.json --no-local-traffic --out public/api/dashboard-census.json`（吃同一份 sweep，不重跑 article-health，約 5 秒），dashboard 就能顯示四級篇數與「進化中 → 已查證」的轉正速度（設計報告實作清單 #8 一直缺這個資料源）。公開版不用本機流量快取，只用 repo 內已公開的 GA 前 20 名。
- **每週**：週日 `twmd-weekly-report-sun` 的 prep 工具讀這週與上週的 census，報 delta：A 少了幾篇（被標或被查）、B 多了幾篇、C 補了幾張、D 消化幾篇。週報要看的是速度。
- **快照**：`reports/article-census/` 不需要每週留一份 1.6 MB 的 JSON。建議週跑覆寫 `latest.json`（articles 一篇一行，git diff 只動有變的那幾行），日期檔只留名單 txt 與摘要。
- 這兩處要改 DATA-REFRESH-PIPELINE／WEEKLY-REPORT-PIPELINE 的 canonical，本次沒動，只寫設計。

### 5.3 封面圖缺口怎麼補

依成本分三條線，全部走既有工具，不熱連結：

1. **C1 升格（22 篇）**：正文第一張本地圖改當 `image`，從該篇 `## 圖片來源` 段抄 credit／license／source。純文字編輯，可以寫成 `curation-tag.py` 同型的小工具批次 dry-run。模板的 `heroImageInBody` 會自動讓位，不會重複出圖。
2. **C2 落地（133 篇）**：正文是 Wikimedia 內文熱連結（image-health 的內文白名單目前還放行）。逐張跑 `image-ingest.mjs ingest --src <Commons 頁> --role hero`（核授權、清 EXIF、轉 WebP、存 `public/article-images/{cat}/`），再升格。授權白名單照 9/05 的判例：CC BY／BY-SA／CC0／公有領域收，GFDL-only 不收，OGDL-Taiwan 等 OBSERVER-QUEUE #50。Wikimedia 連續請求會 429，要排隊慢跑，每批十幾張。
3. **C3 找圖（749 篇）**：沒有捷徑，接 REWRITE Step 1.9 媒體深掃。排序用「流量 × 精選」：先做 117 篇沒封面的精選與 C 級流量前 50。D 級 225 篇零媒體跟這條線重疊，重寫時一起補。
4. **分類預設封面（14 張）**：把 `categoryConfig.ts` 的 14 張 Wikimedia 縮圖收進 `public/`。這是一次性的小工，但它是全站 904 篇的頂部背景。
5. **封面圖的閘門**：要不要讓「新文章沒封面」在 rewrite-stage-4 變 HARD，是哲宇的決定（§八 #9）。image-health 已經在 stage-4 要求 ≥3 媒體，但沒要求其中一張是 frontmatter `image`。

### 5.4 簡陋文章怎麼進 ARTICLE-INBOX

- **不要開 226 條 entry**。沿用 INBOX 既有的 umbrella batch 寫法：開一條「census D 級」umbrella，指向週更的 `tier-D.txt`，條目裡只列流量前 20 且尚未排隊的。七月那 69 篇有 60 篇就在 D 裡，兩條 batch 合併成一條，以 census 為準，不再手動維護 checklist。
- **分工**：D 級＝寫得不夠（走 REWRITE EVOLVE 深度模式）。A 級／A-watch＝沒人查過（走 review-stock 或 FACTCHECK）。蕭上農這種「查過但很碎」只進 D。萊爾富這種「沒查過又薄」A 和 D 都有，先 EVOLVE（重寫時就會查）。EVOLVE-PIPELINE 負責看數據挑篇（流量 × 單薄 × 譯本數放大係數），REWRITE 負責寫。
- **review-stock 的選篇**：`review-stock-pick.py` 的母體目前是 T1 分類 ∧ 沒人審 ∧ 非 verified。建議加讀 census，A-watch（零證據但不薄的 133 篇）排在前面，因為那是規則看不見、只能靠人眼的區域。
- **消費者**：這條隊列真正的瓶頸是沒有人在消化。`twmd-rewrite-daily` 停了，69 篇 110 天只動 4 篇。要不要重開、每天幾篇，是 §八 #8。

### 5.5 讀者端：進化中說明條要不要分兩種

現在的文案（`article.template.astro`）寫死「進化中 · 社群貢獻／這篇文章由社群貢獻，正在 Taiwan.md 的深度查證流程排隊」，卡片上也是「🌱 進化中 · 社群貢獻」。

問題：A 名單 179 篇裡 68 篇的首次提交者是維護者。扣掉維護者手動整合投稿 PR 的約 21 篇，約 47 篇是 Taiwan.md 自己早期批次產的（「新增 44 位台灣人物傳記」「Phase 1 100 位人物」等）。這些標上 🌱 會在站上說「由社群貢獻」，那是錯的，也違反「判定看流程不看人」：說明條在對讀者講作者是誰，而它應該講的是這篇走到哪一步。

建議拆兩種，依理由選（對外文字由哲宇定，以下只是草案）：

- **待查證**（A2、A1 中腳註或引用失守的）：「🌱 進化中 · 待查證　這篇還沒走完 Taiwan.md 的逐條事實查證。內容大致可讀，但引語、年份、數字可能還沒逐一核對。讀到可疑的地方，告訴我們。」
- **內容單薄**（A1 中只有字數失守的，以及已標 🌱 且落在 D 級的）：「🌱 進化中 · 待擴寫　這篇目前只寫到骨架，還在排隊等深度改寫。你知道更多、手上有資料或照片，告訴我們。」

兩種都拿掉「由社群貢獻」。實作上建議 `curation-tag.py` 加 `--reason unverified|thin` 寫入一個新欄位（例 `curationReason`），模板依欄位挑文案。不建議讓模板自己算字數決定文案，那會長出第二把尺。

---

## 六、本次已實作的東西與怎麼用

全部在 worktree commit，沒有 push。沒有改任何 `knowledge/` 文章，沒有跑 `curation-tag.py --apply`（只跑了 dry-run 驗證名單檔可直接吃：ok=167 problems=0）。

| 檔案                                                                      | 內容                                                                                   |
| ------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `scripts/tools/lib/article_health/census.py`                              | 規則與門檻 SSOT：量尺、repo 證據索引、bulk git 解析、標記日解析、四級規則、`build_row` |
| `scripts/tools/article-census.py`                                         | 普查 CLI（唯讀）                                                                       |
| `scripts/tools/lib/article_health/checks/curation_gap.py`                 | article-health plugin `curation-gap`（WARN，無完整 git 史時 INFO）                     |
| `tests/article_health/test_census.py`、`tests/test_article_census_cli.py` | 24 個測試，全用合成資料（CI 的 pytest 是淺 clone）                                     |
| `scripts/tools/TOOL-INVENTORY.md`                                         | Class A 加一列                                                                         |
| `reports/article-census/2026-11-04.json`                                  | 每篇一列（articles 一篇一行）＋門檻＋分布＋流量來源＋摘要                              |
| `reports/article-census/2026-11-04-tier-{A,B,C,D}.txt`                    | 四級名單檔                                                                             |

```bash
# 全站普查（約 17 秒）→ reports/article-census/{今天}.json＋摘要
python3 scripts/tools/article-census.py
# 另寫名單檔
python3 scripts/tools/article-census.py --tier A --tier D
# 吃 prebuild 的 sweep，不重跑 article-health（約 5 秒）
python3 scripts/tools/article-census.py --health-in scripts/tools/.health-sweep.json
# 看單篇怎麼被判
python3 scripts/tools/article-census.py --files knowledge/People/洪醒夫.md --print-rows --no-json --quiet
# 只看校準用分位數
python3 scripts/tools/article-census.py --distribution
# 套用 A 級（先 dry-run，套用要人決定）
python3 scripts/tools/curation-tag.py --set incubating --files reports/article-census/2026-11-04-tier-A.txt
# 單篇／staged 的 A 級檢查
python3 scripts/tools/article-health.py knowledge/People/魏哲家.md --check=curation-gap
```

驗證：`uv run --with pytest --with pyyaml python -m pytest tests -q` 927 passed、9 skipped（新增 24）。`article-health.py --all --profile=ci-deploy` exit 0、0 hard，耗時 14→15 秒。`--check=curation-gap` 全站 179 條 warn，與普查 A 級逐篇相同。

---

## 七、還沒做、刻意沒做的

- 沒動 MAINTAINER／DATA-REFRESH／WEEKLY-REPORT／REWRITE 任何 pipeline canonical（§五 的接法都是設計）。
- 沒改說明條文案與 `curation-tag.py`（對外文字與欄位設計等決定）。
- `2026-11-04.json` 的 `traffic` 欄位來自本機 GA／SC 快取（每篇 28 天瀏覽數與 7 天曝光，552 篇有值）。沒有任何個人資料，粒度跟已公開的 `dashboard-analytics.json` 同類，但覆蓋範圍比它大；push 前若不想公開，重跑時加 `--no-local-traffic` 即可（D 級排序會退回只看前 20 名）。
- `article-depth-audit.py` 沒退休：census 的 D 級涵蓋它的用途，但它還被七月報告引用。建議等 §八 拍板後改成 census 的 facade 或標記退役。

---

## 八、要哲宇決定的事（每條附預設）

| #   | 決定                                                        | 預設                                                                                     |
| --- | ----------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| 1   | A 級名單要不要套用、怎麼分批                                | 套用，但**先做 #2 再套**。第一批 A2 27 篇（規則漏標，沒有爭議），第二批只中 A1 的 140 篇 |
| 2   | 說明條拆「待查證／待擴寫」兩種、拿掉「由社群貢獻」          | 拆，文案用 §五.5 草案再潤，`curation-tag.py` 加 `--reason`                               |
| 3   | A 級裡 12 篇精選（台灣滷肉飯、珍珠奶茶、注音符號等）        | 先不標、保留精選，排進 review-stock 最前面，查完再決定                                   |
| 4   | A 級裡 43 篇 `lastHumanReview: true`                        | 照標（洪醒夫前例：早期人工看過不等於查過）                                               |
| 5   | A 級門檻 5 腳註／2,000 字（179 篇，套用後 🌱 佔 44%）       | 維持，放寬到 2,500 字會到 48%，接近「將近一半都在進化中」的自貶區                        |
| 6   | B 級 2 篇（馬祖國際藝術島、台灣黑熊）轉正                   | 馬祖直接轉（標記後跑完 Stage 3 大驗證輪），台灣黑熊先過 review-stock 冷讀席再轉          |
| 7   | `curation-gap` 的 A2 在 pre-commit 升 HARD                  | 第一波套用後升，A1 維持 WARN                                                             |
| 8   | 重開 `twmd-rewrite-daily` 消化 D 級                         | 重開，每天一篇，從 D 級流量榜未排隊的開始，七月 69 篇 batch 併入 census D 級 umbrella    |
| 9   | 新文章沒封面在 rewrite-stage-4 要不要 HARD                  | 要（`image-health` 加一條 frontmatter `image` 必填），投稿路徑維持 WARN                  |
| 10  | 14 張分類預設封面收進庫                                     | 收（一次性，`image-ingest.mjs`）                                                         |
| 11  | census 進 prebuild 產 `dashboard-census.json`、週報讀 delta | 進，dated JSON 改週覆寫 `latest.json`                                                    |
| 12  | A-watch 133 篇（零證據但不薄）                              | 不標，`review-stock-pick.py` 改成優先挑這區                                              |

🧬
