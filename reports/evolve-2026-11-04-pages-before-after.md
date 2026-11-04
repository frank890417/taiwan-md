# 全面進化 2026-11-04：非文章頁標題與描述，改前→改後

分支 `evolve/2026-11-04-pages`（已合併整合分支 `evolve/2026-11-04` 的網站健檢修正，標題站名去重以那邊的 `src/utils/pageTitle.ts` `withBrand` 為準）。依據：[evolve-2026-11-04.md](evolve-2026-11-04.md)「📄 頁面（非文章頁）」與「五、資料異常」第 1、4、5、6 點。

讀法：「改前」是 2026-11-04 curl 線上頁面讀到的 `<title>` 與 meta description；「改後」是本分支 `npm run sync:build`（19,402 頁，3 分 17 秒，exit 0）後從 `dist/` 抽的。改前的 `｜ Taiwan.md` 重複站名由健檢分支修掉，不算在本分支的改動裡。

## 一、用語詞條頁（`src/pages/terminology/[id].astro`＋`src/utils/terminology-wording.ts`）

規則：從詞條既有的 `etymology.origin` 原文切出「這個詞是什麼意思」那一句（`termGloss`，不生成新字）。切得到的條目改成先問字義、再給台灣說法；切不到的（單位、譯名、F 同詞不同語感、零佐證的 import）標題與描述一字不動。

- 建出來 2,239 個詞條頁：306 頁改成字義句型，其餘維持原句型
- 描述最長 160 字（上限，超過時依序丟掉分類說明、結尾那句）；字義句型的標題最長 24 字，再加站名
- 帶注音符號的 origin（目前只有〈咋的〉）標題多問「注音怎麼念」，描述把注音那句接在字義後面

| 詞條（類型） | 改前 title | 改後 title |
|---|---|---|
| /terminology/吃瓜/（E 正在分歧，有字義） | 「吃瓜」台灣怎麼說？台灣用語是「看八卦」 | 「吃瓜」是什麼意思？台灣說「看八卦」 |
| /terminology/ren-she/（人設，E，有字義） | 「人設」台灣怎麼說？台灣用語是「形象」 | 「人設」是什麼意思？台灣說「形象」 |
| /terminology/咋的/（E，字義＋注音） | 「咋的」台灣怎麼說？台灣用語是「怎麼樣」 | 「咋的」是什麼意思、注音怎麼念？台灣說「怎麼樣」 |
| /terminology/內核/（讀者回報過的支語誤判，有字義） | 「內核」台灣怎麼說？台灣用語是「核心」 | 「內核」是什麼意思？台灣說「核心」 |
| /terminology/公分/（單位，零佐證） | 「厘米」台灣怎麼說？台灣用語是「公分」 | 不變 |
| /terminology/也門/（譯名，proper-noun） | 「也門」台灣怎麼說？台灣用語是「葉門」 | 不變 |
| /terminology/level-standard/（水平，F 同詞不同語感） | 「水平」台灣怎麼說？台灣用語是「水準」 | 不變 |
| /terminology/128位元/（tech import，零佐證） | 「128位」台灣怎麼說？台灣用語是「128位元」 | 不變 |

描述（字義句型才有變，前面多了字義句，後面原樣）：

- 吃瓜：改前「中國說「吃瓜」，台灣說「看八卦」。還在分歧中的詞……」→ 改後「「吃瓜」：源自「吃瓜群眾」，比喻旁觀看熱鬧的人（像嗑瓜子看戲）。中國說「吃瓜」，台灣說「看八卦」。還在分歧中的詞，兩邊講法都聽得懂，但各有偏好。查「吃瓜」算不算中國用語、台灣用語怎麼說 — Taiwan.md 用語保存計畫。」
- 人設：改後開頭「「人設」是「人物設定」的縮略，源自ACG（動漫、遊戲、輕小說）圈的二次元用語，指角色的設定（性格、外貌、背景等完整設定）。」
- 咋的：改後開頭「「咋的」是中國方言，用來表示「怎麼樣」「如何」的意思。注音可作「ㄓㄚˋ」或「ㄗㄚˊ」。」
- 內核：改後開頭「「內核」：作業系統最底層、負責調度硬體資源的那一層程式（kernel）。」

已知限制：字義句是 origin 原文，原文品質決定描述品質。caris-events 匯入的條目有幾條原文本身就怪（例如〈支持〉「有能力足以使用某個功能」），照搬不改，要改應該改 YAML。

## 二、其他頁

| 頁面 | 改前 title | 改後 title |
|---|---|---|
| /elections/2026/timeline/ | 2026 九合一選舉完整選務時程：從選舉公告到新任就職 | 2026 九合一選舉日期：11/28 投票，號次抽籤 10/23–10/27 |
| /en/elections/2026/timeline/ | 2026 Taiwan Local Elections: Full Official Timeline | 2026 Taiwan Election Timeline: Vote Nov 28, Ballot Draw Oct 23–27 |
| /companies/ | 台灣前 50 大企業 — AI 時代的洗牌 | 台灣市值前 50 大企業排名（2026/10 快照）：AI 時代的洗牌 |
| /en/companies/ | Taiwan's Top 50 Companies — The AI-Era Reshuffle | Taiwan's Top 50 Companies by Market Cap (Oct 2026): The AI Reshuffle |
| /taiwan-shape/ | 台灣的形狀 — 開源地圖資料集：SVG、GeoJSON、TopoJSON | 台灣地圖免費下載：縣市地圖 SVG、GeoJSON、TopoJSON 開源資料 |
| /map/ | 台灣地圖 Map | 用地圖找文章：點縣市讀台灣各地的美食、歷史與自然 |
| /id/map/ | Peta Taiwan Map | Peta Taiwan |
| /timeline/ | 時間台灣：從史前到現在的歷史時間軸 | 台灣歷史時間軸：史前、荷西、明鄭、清領、日治、戒嚴到民主化 |
| /en/timeline/ | Timeline of Taiwan — from prehistory to today | Taiwan History Timeline: Prehistory, Dutch, Qing, Japanese Rule to Today |
| /people/ | 人物 - Taiwan.md \| Taiwan.md | 人物 - Taiwan.md（站名去重是健檢分支的 withBrand） |
| /food/ | 美食 - Taiwan.md \| Taiwan.md | 美食 - Taiwan.md（同上） |
| /ja/people/ | 人物 - Taiwan.md \| Taiwan.md | 人物 - Taiwan.md（同上） |
| /id/food/ | Kuliner - Taiwan.md \| Taiwan.md | Kuliner - Taiwan.md（同上） |
| /terminology/ | 📖 用語保存計畫 — Taiwan.md \| Taiwan.md | 用語保存計畫：兩岸用語對照與台灣說法 \| Taiwan.md |
| /explore/ | 探索 Taiwan.md — 瀏覽開放的台灣知識庫 | 不變（只改描述） |
| /budget/ | 總預算十年 — 中央政府總預算 2016–2026 的分配、增減與執行 | 2026 中央政府總預算：2016–2026 十年的分配、增減與執行 |
| /elections/2026/ | 2026 九合一選舉：11/28 投票時間 8 點到 4 點、候選人號次、怎麼投票 | 台灣 2026 九合一選舉：11/28 投票時間 8 點到 4 點、候選人號次、怎麼投票 |

描述有改的：

| 頁面 | 改前 description | 改後 description |
|---|---|---|
| /elections/2026/timeline/ | 2026 九合一選舉從中選會決定投票日、選舉公告、候選人登記、號次抽籤、名冊公告閱覽、公報送達、11 月 28 日投票開票，到 12 月 25 日新任就職…… | 2026 九合一選舉 11 月 28 日投票，上午 8 點到下午 4 點。候選人號次抽籤原訂 10 月 23 日，只有金門縣照常抽出；其他 21 個縣市因颱風薔琵停班，延到 10 月 27 日。從選舉公告、候選人登記、名冊公告閱覽到 12 月 25 日新任就職，加上同日公投第 22 案，每一步都附中選會或法規出處。 |
| /map/ | 以地圖視角探索 Taiwan.md 的內容脈絡 | 在地圖上點一個縣市或地點，直接讀那裡的 Taiwan.md 文章。可以依北、中、南、東部與離島篩選區域，或依美食、歷史、自然、文化等分類找文章。 |
| /id/map/ | Jelajahi konteks konten Taiwan.md melalui perspektif peta | Klik kabupaten/kota atau lokasi di peta untuk langsung membaca artikel Taiwan.md tentang tempat itu. Saring menurut wilayah (utara, tengah, selatan, timur, kepulauan terluar) atau topik: kuliner, sejarah, alam, budaya, dan lainnya. |
| /people/ | 影響台灣發展的重要人物與故事 | 收錄 296 篇人物文章，包括〈楊德昌〉〈施振榮〉〈唐鳳〉。影響台灣發展的重要人物與故事。 |
| /food/ | 從夜市小吃到精緻料理的美食文化 | 收錄 89 篇美食文章，包括〈台灣美食總覽〉〈台灣水果王國〉〈刈包〉。從夜市小吃到精緻料理的美食文化。 |
| /ja/people/ | 台湾の発展を形作った重要な人物と物語 | 人物の記事を296本収録。「楊德昌」「施振榮」「オードリー・タン」など。台湾の発展を形作った重要な人物と物語。 |
| /id/food/ | Budaya kuliner dari jajanan pasar malam hingga hidangan adiboga | Kuliner: 89 artikel, termasuk Panduan Lengkap Kuliner Taiwan, Raja Buah Taiwan, dan Guo Bao. Budaya kuliner dari jajanan pasar malam hingga hidangan adiboga. |
| /terminology/ | 讓全世界完整認識台灣（全站預設句） | 收錄 2,304 組兩岸用語對照：中國說法、台灣說法、詞源與分歧原因，引用 395 個來源。查一個詞算不算中國用語、台灣怎麼說，也能用轉換器整段改寫。 |
| /explore/ | 瀏覽 685+ 篇台灣策展文章：…… | 瀏覽 1156+ 篇台灣策展文章：……（13 語同改） |

數字從哪來：選務時程頁的日期讀 `src/data/elections-2026-timeline.json`（voting-day／ballot-draw／inauguration），描述裡的颱風延期那句是 ballot-draw 說明的原文；/companies/ 的年月讀 `src/utils/dataConfig.ts` 新增的 `COMPANIES_SNAPSHOT_DATE`；分類頁的篇數與條目是 build 時該語言該分類的文章數與 topPicks；/terminology/ 的數字跟頁面 hero 的「N 個詞條／N 個來源」同一個變數；/explore/ 的 1156 跟首頁一樣由 `scripts/tools/update-stats.sh` 每天改寫（本分支把 explore.ts 接進那支 patch 與 `counts-drift-lint.py`）。

多語處理：en 每頁同步。其他 11 語只修跟 zh 同一個結構問題的地方：/map/ 標題拿掉重複的英文「Map」後綴（ko、vi、id、pt、hi、ar、ru、de），/explore/ 的過時篇數（13 語）；/ko/map/、/id/map/ 的描述因報告點名同病而改寫。/companies/、/taiwan-shape/、/timeline/ 的其他 11 語沒有搜尋數據、問題不是結構性的，維持原文。

## 三、資料工具（`scripts/tools/`）

| 項目 | 改前 | 改後 |
|---|---|---|
| Search Console 查詢 | 單次 rowLimit 2,000 | startRow 分頁抓到底（`--max-query-rows` 預設 100,000），`fetch_limits` 記實際列數與是否被截 |
| Search Console 頁面 | 單次 rowLimit 1,000，含 #錨點網址 | 分頁（`--max-page-rows` 預設 50,000）；`pages` 不含 #，錨點按原頁面加總在 `pages_anchor_rollup`，佔比在 `pages_anchor_stats` |
| GA4 分語言 | pagePath 報表 limit=500 | offset 翻頁抓全部（`--max-lang-rows` 可設上限） |
| dashboard `searchConsole24h` | label 停在「2026-04-09 (24h)」 | fetcher 多抓最後一天（`last_day`），generator 用它重建；舊快照沒有 `last_day` 時維持原樣並印警告 |

`searchConsole24h` 停住的原因：那段是 4/9 手寫進 `public/api/dashboard-analytics.json` 的，4/11 起 generator 改寫 `searchConsole7d`，並把 24h 列在「不碰」清單，之後沒有任何程式寫它。網頁儀表板優先讀 7d 所以看不出來，但 `cli` 的 `taiwanmd sense --range 24h` 一直印四月的數字。

驗證沒有連線：`tests/test_sense_fetch_limits.py` 11 條，含兩支 fetcher 的 `main()` 對假 API 乾跑（快取寫 tmp_path）：SC 6 萬條查詢翻 3 頁、3,000 條頁面拆出 1,500 條錨點；GA4 670 條路徑裡排在第 500 名之後的 pt／de 長尾都進到 `aggregate_by_lang`。真快取（`~/.config/taiwan-md/cache/`）沒動，下次 data-refresh 跑 fetcher 才會有新數字。

## 四、測試

- `npm run sync:build`：exit 0，19,402 頁
- `uv run --with pytest --with pyyaml python -m pytest tests -q`：914 passed、9 skipped
- `npm test`：13 個測試通過，frontmatter 15,030 檔 OK
- `npm run test:terminology-wording`：12 通過（原 7 條＋新 5 條）
- `node scripts/tools/check-ui-language.mjs`：exit 0，警示跟改前一樣，只差行號

## 五、沒做的

- 線上 Search Console 的實際效果要等部署後 2–4 週看曝光與點擊率，本分支沒辦法驗
- 詞條頁的 FAQ／JSON-LD 還是「台灣怎麼說」「算中國用語嗎」兩題，沒有加「是什麼意思」那題（任務範圍只到 title／description）
- 頁面 H1 沒動：/map/ hero 仍叫「台灣地圖」，/timeline/ hero 仍叫「時間台灣」
- `src/i18n/map.ts`、`taiwanShape.ts`、`timeline.ts`、`explore.ts` 的 de 區塊原本沒過 prettier，lint-staged 在 commit 時整檔重排，diff 裡那些換行不是內容變動
