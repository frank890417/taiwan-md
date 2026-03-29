# 用語保存計畫 — 詞條資料庫

> Taiwan.md 的文字應該讀起來像在台灣長大的人寫的。
> 這不是政治立場，是生活經驗的真實性。

## 結構

每個詞條一個 YAML 檔案，格式見 `_template.yaml`。

## 分歧類型

| 代碼 | 類型 | 說明 | 例子 |
|------|------|------|------|
| A | 日語遺產 | 台灣沿用日語漢字，中國另造新詞 | 便當/盒飯 |
| B | 1949 分流 | 兩岸分治後各自演化 | 計程車/出租車 |
| C | 網路時代新生 | 中國網路用語隨平台滲透 | 視頻、博主 |
| D | 台客語底層 | 台語/客語影響台灣華語 | 呷飯、阿莎力 |
| E | 正在分歧中 | 年輕世代開始使用，尚未穩定 | 人設、躺平 |
| F | 同詞不同語感 | 同詞但使用頻率/語境不同 | 領導、水平 |

## 分類

- `daily/` — 日常生活
- `education/` — 教育社會
- `tech/` — 電腦網路科技
- `media/` — 大眾傳播
- `business/` — 經濟商業
- `transport/` — 交通旅遊
- `culture/` — 文史藝術
- `names/` — 國名/人名翻譯
- `internet/` — 網路時代新詞（2000s+）

## 來源資料庫

### 已萃取（`_sources/` 目錄）

| 來源 | 詞對數 | 強項 | URL |
|------|--------|------|-----|
| 藍光濾波研究所 | ~1,089 | IT/電腦（含維基百科 CGroup/IT） | https://corettainformation.blogspot.com/p/blog-page_15.html |
| ThunderKO C2T | ~500 | IT + 商務 + 學術論文 | https://thunderko.com/c2t/ |
| 《大陸用語檢索手冊》1997 | ~250 | 日常/教育/經濟/國名（歷史快照） | http://www.hintoninfo.com.tw/Upload/mag/words.pdf |

### 開源工具（可整合詞庫）

| 名稱 | 說明 | URL |
|------|------|-----|
| **OpenCC** | 中文簡繁轉換開源標準，支援台灣正體 + 地區詞彙轉換（`s2twp.json`），8.5k⭐ | https://github.com/BYVoid/OpenCC |
| wasm-opencc | OpenCC 的 WebAssembly 版本，可在瀏覽器/Node 直接執行 | https://github.com/oyyd/wasm-opencc |
| cn2tw4programmer | Chrome 擴充：簡中 CS 詞彙→繁中詞彙（數組→陣列等） | https://github.com/pjchender/cn2tw4programmer |
| 繁化姬 zhconvert | 繁簡轉換 + 台灣化，支援詞語模組、差異比較 | https://zhconvert.org/ |

### 官方/學術資源

| 名稱 | 說明 | URL |
|------|------|-----|
| **國家教育研究院雙語詞彙** | 學術名詞對照下載（教育/科技/社會科學） | https://terms.naer.edu.tw/download/ |
| 中華語文知識庫 | 教育部兩岸詞典（需 JS 瀏覽器批次萃取） | https://chinese-linguipedia.org/ |
| 維基百科 NoteTA/CGroup | IT 轉換表（已整合至藍光濾波資料集） | Wikipedia CGroup |

### 社群討論

| 名稱 | 說明 | URL |
|------|------|-----|
| Yukaii open-source-ideas #14 | 中→台用語轉換 Chrome 擴充企劃（含完整詞庫連結列表） | https://github.com/Yukaii/open-source-ideas/issues/14 |
| Dcard「想避免中國用語的人請進」 | 200+ 民間用語整理 | Dcard |
| Taiwan.md 社群觀察 | 本專案自建 | — |
