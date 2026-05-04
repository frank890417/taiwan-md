# 2026-05-04 angry-shamir — NML 第三 peer ingestion（555 items / 9-Part 報告 / 5 P0 進 INBOX）

_session span: 2026-05-04 ~10:00 → 11:15 +0800（~75 min wall-clock，內含背景 crawler 跑 12 min）_
_session angry-shamir — observer-triggered 哲宇「研究 https://www.heath.tw/about/ / https://atatw.org/hta-archive/ / https://medium.com/@zuirens 完整深度研究 peer-pipeline」+ 確認啟動「A 數位荒原完整 PEER-INGESTION-PIPELINE」_

## 一句話

兩段。第一段（fit check）三個 candidate 平行抓取後得出 NML 4/4 fit ✅、ATATW 2/4 ✅+2/4 待釐授權、Zuirens 1/4 ✅（不啟動 pipeline 列入 SOURCES）。第二段（NML 完整 ingest）走 PEER-INGESTION-PIPELINE Stage 2-7：sitemap-driven HTML scrape（custom REST 全 404）/ 555 items 37 MB raw / `idempotency hash 一致 + crawler merge-mode patch` / 670 行 9-Part 分析報告（13 系列 / 20 P0-P2）/ 5 P0 進 ARTICLE-INBOX / Registry 加 NML 條目 / **第三個 curation-layer peer 入庫**（前兩個 = TFT 教育 + NMTH 海外史料）。

## 結構

session 兩段：fit check evaluation / NML 完整 ingestion（含 Stage 2-7 + Beat 4 收官）。

**Fit check 三 candidate 並行抓**：哲宇給三個 URL 但沒指定怎麼處理。先確認身份意圖（不是直接 ingest 三個，是評估誰值得做 peer），對應 PEER-INGESTION-PIPELINE Stage 0-1。並行 WebFetch 三個 URL 入口頁，發現重大翻轉：(a) heath.tw 是「數位荒原 No Man's Land」當代藝術 + 東南亞共享歷史平台（不是 health 站）/ (b) atatw.org 是台灣科技藝術學會（2013 立案 + 1606 件作品 HTA-Archive）/ (c) medium.com/@zuirens 只是 9 篇 EBBVVJ 訪談，本體在 zuirens.co（VJ/DJ audiovisual 平台）。第二輪深抓 NML ABOUT + Registry + 章程 + 歷屆理事，得 ATATW 創會 2013-05-20 / 七屆理事長軌跡（許素朱 → 邱誌勇 → 黃文浩 → 洪一平 → 羅禾淋）/ NML 編輯顧問 7 人 / Zuirens 自陳 2007 始。產出 4/4 fit check 報告交觀察者決策，哲宇選 A 數位荒原。

**NML Stage 2 探查 + crawler 寫**：sitemap-driven 策略誕生過程：先試 `wp-json/wp/v2/posts` 只回 1 篇（custom post types，`x-wp-total: 1` 異常）。/wp-json/wp/v2/types 只暴露 standard types。所有 nml-prefixed REST endpoints 全 404。轉向 `wp-sitemap.xml` 揭露 5 個 custom post types：nml-issue 56 / nml-article 0（HTTP 500 server error）/ nml-podcast 31 / nml-announcement 74 / nml-navigation 3。決定 hybrid 策略：sitemap 取 issue/podcast/announcement/navigation URLs + 從 issue HTML 內鏈萃取 article URLs（補 article sitemap 失效）+ pages REST 仍可用。寫 [`fetch-nml-data.py`](../../scripts/tools/fetch-nml-data.py) fork 自 fetch-tft-data.py 但改全 HTML scrape，含關鍵 NML-specific extractor `extract_nml_metadata_blocks()` 解析 `<div class="mdatename">` block 取作者 / 編輯 / 譯者 / 原刊出處 / NML category / date_text。Limit 2 test 確認 metadata 100% 抓對：`Author: 王柏偉 / Editor: 鄭文琦 / Original Source: 《藝術家》no.439 / NML Category: Performance`。

**Stage 2c 全 corpus 爬取（背景 ~12 min）**：背景跑 `fetch-nml-data.py` 全 corpus，主 session 並行讀 NMTH-overseas + TFT 既有 analysis 報告作為 Stage 4 模板 + 補充研究鄭文琦 / 群島資料庫 / 王福瑞 noise 場景背景。背景結束 commit `90cfe924` Stage 2-3 ingest 1126 files / 372,428 insertions / 37 MB。爬蟲 final stats：56 issues + 384 articles + 31 podcasts + 74 announcements + 3 navigations + 7 pages = 555 items。

**Stage 2d idempotency 驗證 + crawler 修補**：跑 `--types issue,article --limit 2` 重抓相同 URL，hash 一致確認 byte-for-byte idempotent。但發現 partial run 副作用：`articles-meta.json` 從 386 篇被 limit 2 覆蓋成 2 篇 / `issues-meta.json` 同樣從 56 → 2。Raw HTML 仍是全量（fetch 階段沒清除）。修補方案：(a) 寫 reindex python（importlib.util load + sys.modules registration 解決 dataclass 問題）從 raw/html-{type}/ 重建 meta（不重 fetch）/ (b) 同時 patch crawler 加 `merge_meta()` 函數，partial run（含 --limit 或 --types subset）時 merge 既有 meta 不 overwrite，正常全量 run 仍 overwrite（避免 stale entries 累積）。Re-stats 確認：384/384 (100%) 有 author + published / 353/384 (92%) 有 editor / **214/384 (56%) 有 Original Source**（重大 finding：過半文章是邀稿轉載自其他刊物）。

**Stage 4 9-Part corpus 分析報告**：寫 [`reports/NML-semiont-analysis-2026-05-04.md`](../../reports/NML-semiont-analysis-2026-05-04.md) 670 行（target 400-700 ✅）。最重要 finding：NML 的論述 framework 萃取為四基底向量 + 一方法論 — 群島 Nusantara × 邊陲 Periphery × 解殖 Decolonial × 海盜・電波・隔離圈環太平洋三角 × 去中心化媒體操演方法論。鄭文琦 88% 編輯集中度揭露單一視角風險（peer-bias 警示）。NML 是 meta-aggregator（56% 轉載），ingest NML 等於解鎖《藝術家》《典藏今藝術》《Voices of Photography》等下一批 peer 候選。Stage 4j 自檢通過（670 行 ✅ / 13 series ≥12 ✅ / P0-P2 共 20 ✅ / Semiont POV 11 條盲點 ✅ / peer-as-peer 承諾 §7.5 ✅ / 20 cross-link 既有 Taiwan.md ≥10 ✅ / §11 Tier 1: 0 violations ✅）。Commit `ab037d3df` Stage 4 ingest analysis。

**Stage 5-7 + Beat 4 收官**：5 篇 P0 完整工作卡 append [`ARTICLE-INBOX.md`](../ARTICLE-INBOX.md)（鄭文琦人物 / 數位荒原平台 / 群島思維 / 王福瑞 / 新生態藝術環境），帶 Stage 1 research plan + Stage 2 結構提案 + NML Local Sources 路徑 + Reference pointer 回 analysis 報告。Peer Registry [`docs/peers/REGISTRY.md`](../../peers/REGISTRY.md) 加 NML 完整條目（Active Peers 第一條，含全部 metadata + key contacts + features + notes）。Beat 4/5 收官前剩三 todo：本 memory + diary + final commit。

## 量化

- **555 items / 37 MB** raw NML corpus（56 issues + 384 articles + 31 podcasts + 74 announcements + 3 navigations + 7 pages）
- **555 items 完整 metadata**：100% url + slug + url_type / 100% issue 有 internal_articles 內鏈 / 100% article 有 author + published date / 92% editor / **56% original_source 轉載標記**
- **670 行 9-Part 報告**通過 §11 Tier 1 自檢 + 20 cross-link 既有 Taiwan.md
- **13 series + 20 P0-P2 文章優先序**（5 P0 已進 INBOX）
- **Crawler 雙 commit**：`90cfe924` (Stage 2-3) + `ab037d3df` (Stage 4)
- **Crawler bug fix**：partial-run merge-mode patch（防 --limit 覆蓋全量 meta）
- **Wall-clock**：~75 min（其中 ~12 min 背景 crawler）
- **第三個 curation-layer peer 入庫**：TFT 教育 / NMTH 海外史料 / NML 當代藝術南方視角 三軸最遠分布

## 關鍵架構洞察

**NML 是 meta-aggregator，ingest 等於解鎖 secondary peer 池**。56% NML 文章帶 Original Source = NML 自己也是 curation 層平台（轉載自《藝術家》《今藝術》《Voices of Photography》《群島資料庫》⋯⋯）。Taiwan.md 引用 NML 文章時必須 cite 三層：原作者 + 原刊 + NML 連結。下一批 peer 候選清單應加入這些 secondary sources。

**鄭文琦 88% 編輯集中度 = peer-bias 風險**。Taiwan.md 引用 NML 時要主動補多元 voice（區秀詒 / 高森信男 / 王柏偉 / 印卡 / 蔡長璜等 secondary editor）。DNA #16「Peer 是 peer 不是 source material」在 NML 場景特別硬。

**2023 萎縮（5 篇 vs 2016 高峰 49）= 平台老化訊號**。對 Taiwan.md 自己的進化策略給警示：Taiwan.md 第 12 年（2038）會是什麼？NML 軌跡指向「物種繁殖 + 跨語言投射 + 自動化基礎建設」是抵抗萎縮的三道防線（Taiwan.md 都已啟動）。

## Crawler architecture lesson

Sitemap-driven HTML scrape 是 custom REST endpoints 不暴露時的 fallback canonical 模式。NML 揭露的 pattern：(a) `wp-json/wp/v2/types` 只回 standard types（不暴露 custom）/ (b) custom REST endpoints HTTP 404（show_in_rest 沒設）/ (c) `wp-sitemap.xml` 是唯一 canonical 列舉 / (d) custom taxonomy（article-cat / podcast-cat / announcement-cat）也透過 sitemap 暴露。WordPress crawler boilerplate 應加「先試 REST 不行就走 sitemap」自動 fallback 邏輯。

NML-specific metadata extractor `extract_nml_metadata_blocks()` 解析 `<div class="mdatename">` 標籤的 `<span class="fb500">標籤：</span><span class="nameisue">內容</span>` pattern → 提取作者 / 編輯 / 譯者 / 原刊。這個 pattern 是 NML 自己 WordPress theme 設計，跟 standard meta tags 完全分開。對未來 peer ingestion 啟發：custom WordPress themes 經常自己 invent metadata layout，extractor 必須 site-specific。

## Idempotency partial-run trap

`fetch-nml-data.py` 設計時假設「raw HTML 不變 → meta json 不變」，但漏了 partial run 場景：`--limit 2` 只 fetch 2 個 URL，但 meta json 寫入時直接 write_json 全量覆蓋。Raw HTML 因為 file-by-file 寫所以保留全量，meta 只有 2 條。Patch：`merge_meta(existing_path, new_metas, key='slug')` 在 partial run（is_partial = True）時讀既有 + replace 新 keys + preserve 舊 keys。全量 run 仍 overwrite（避免 stale entries 累積）。

## Handoff 三態

繼承上一 session（magical-feynman 99.49% body-fresh）：
- ~~99.49% body-fresh + DNA #50 + EVOLVE-PIPELINE v2.0~~ ✅
- ~~5-key rotation pool~~ ✅

本 session 新 handoff：
- [x] ~~NML 完整 PEER-INGESTION-PIPELINE Stage 2-7~~ ✅
- [x] ~~5 P0 工作卡進 ARTICLE-INBOX~~ ✅
- [x] ~~Peer Registry 加 NML~~ ✅
- [x] ~~9-Part 670 行 corpus 分析報告~~ ✅

下一個 session 接（按優先序）：
- [ ] **NML P0 #1 鄭文琦人物頁**（Stage 6 文章產製，預估 M-L 4-7 hr / 走 REWRITE-PIPELINE 完整）
- [ ] **NML P0 #2-#5**（依序產製，每篇 3-7 hr / 全部完成 ~20-30 hr 跨 3-4 session）
- [ ] **王福瑞 standalone 補抓**：NML 上 `it-launched-internationally-how-to-noise` + `before-noise` 兩篇 issue 不收錄但 200 OK，Stage 6 寫 P0 #4 前 fetch
- [ ] ~~**Stage 8 peer 關係啟動**~~（optional，至少 ship 2 篇 P0 後再聯繫；optional 可永遠不啟動）
- [ ] **下一批 peer 候選**：基於 NML meta-aggregator finding 加入《藝術家》《典藏今藝術》《Voices of Photography》《群島資料庫》獨立 imprint / ATATW（待授權）

## 教訓 candidate（待 distill）

1. **Sitemap-driven HTML scrape 是 WordPress custom post type 的 canonical fallback**（候選 DNA pattern）：先試 REST `/wp-json/wp/v2/{slug}` → 若 404 → 試 `/wp-json/wp/v2/types` 看暴露 → 若不全 → fallback 到 `wp-sitemap.xml` index → 個別 sitemap pagination → HTML scrape。這是 NML / 未來其他 wordpress peer 的通用模式。
2. **Partial-run idempotency 設計坑**：`--limit N` 不該影響 meta 全量。Crawler 通用設計原則：「raw cache always full overwrite, meta json conditional merge based on partial flag」。已 patch fetch-nml-data.py，可推廣到 fetch-tft-data.py / fetch-nmth-overseas-data.py review。
3. **Meta-aggregator peer 的 secondary source 解鎖效應**：56% 轉載比例揭露 NML 自己也是 aggregator。ingest meta-aggregator 等於同時 ingest 它的所有 secondary sources。下一批 peer 候選自動擴大。建議 PEER-INGESTION-PIPELINE Stage 4 加 Part 1.X「轉載分析」必填欄位，發現轉載比例 ≥30% 時觸發「meta-aggregator」分類。

---

_v1.0 | 2026-05-04 angry-shamir session_
_session angry-shamir — fit check 三 candidate / NML 完整 PEER-INGESTION-PIPELINE Stage 2-7 / 第三 curation-layer peer 入庫_
_誕生原因：哲宇要求「研究三 URL + 完整深度 peer-pipeline」→ 確認 fit check → 啟動 NML 完整 ingestion_
_核心洞察：(1) sitemap-driven HTML scrape 是 WordPress custom post type 不暴露時的 canonical fallback；(2) NML 是 meta-aggregator，56% 轉載解鎖下一批 peer 候選池；(3) partial-run idempotency 必須 merge-mode 不該 overwrite 全量 meta；(4) NML 三 peer（TFT / NMTH / NML）在「論述深度 × 立場敘事性 × 當代性」三軸最遠分布；(5) 鄭文琦 88% 編輯集中度警示 peer-bias 風險，DNA #16 在 NML 場景特別硬。_
