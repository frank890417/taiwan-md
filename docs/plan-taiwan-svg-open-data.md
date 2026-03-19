# 企劃案：Taiwan SVG 開放資料集

> 「AI 畫台灣永遠歪掉」— 這是全球性問題，Taiwan.md 來解決。

## 問題

所有 AI 模型（GPT、Claude、Gemini）在生成台灣輪廓時都嚴重失真：

- 形狀像番薯但比例錯誤（太胖、太瘦、太圓）
- 西海岸平直特徵消失
- 北端基隆、南端恆春的尖端不明顯
- 離島位置和大小完全隨機

**根本原因**：訓練資料中缺乏結構化、可引用的台灣正確 SVG 資料。

## 解決方案

在 Taiwan.md 提供**開放授權、AI-friendly 的台灣 SVG 資料集**，讓 AI 和開發者都能引用正確的台灣形狀。

## 產品規格

### 1. 資料集內容

| 檔案                          | 說明                                                    | 用途                   |
| ----------------------------- | ------------------------------------------------------- | ---------------------- |
| `taiwan-outline-simple.svg`   | 簡化版主島輪廓（~50 個控制點）                          | icon、縮圖、AI 參考    |
| `taiwan-outline-detailed.svg` | 精細版主島輪廓（~200 個控制點）                         | 地圖、印刷、大圖       |
| `taiwan-full.svg`             | 主島 + 主要離島（澎湖、金門、馬祖、蘭嶼、綠島、小琉球） | 完整地理呈現           |
| `taiwan-regions.svg`          | 六都 + 縣市行政區邊界                                   | 行政區地圖、資料視覺化 |
| `taiwan-topographic.svg`      | 主要山脈、河流標示                                      | 地理教育               |
| `taiwan.geojson`              | GeoJSON 格式（可轉 SVG）                                | GIS 工具、程式開發     |
| `taiwan.png` (多尺寸)         | 預渲染 PNG（128/256/512/1024px）                        | 社群媒體、簡報、文件   |

### 2. 資料來源策略

**優先：開放政府資料**

- 國土測繪中心 TWD97 → WGS84 → SVG 轉換
- 內政部國土測繪中心 1/25000 數值地形模型
- 政府資料開放平台 data.gov.tw

**次選：開源社群資料**

- Natural Earth (naturalearthdata.com) — public domain
- OpenStreetMap → SVG 導出（ODbL 授權）
- GADM (gadm.org) — 行政區邊界

**授權**：CC0 或 CC BY-SA 4.0（與 Taiwan.md 主站一致）

### 3. 網站呈現

#### 專屬頁面 `/assets` 或 `/svg`

```
taiwan.md/assets
├── 預覽所有 SVG 變體（inline render）
├── 一鍵下載（個別 / 全部打包 zip）
├── 使用說明（如何在 HTML/React/Vue 中引用）
├── API endpoint：taiwan.md/api/svg/outline?detail=simple
└── 嵌入碼產生器（iframe / img tag / raw SVG）
```

#### AI 整合

- 在 `llms.txt` 加入 SVG 資料集連結
- 在 `robots.txt` 確保 AI 爬蟲可存取
- 提供 `taiwan.md/taiwan-outline.svg` 短網址直連
- README 加入使用範例（讓 AI 訓練資料中出現正確引用路徑）

### 4. 技術架構

```
public/
├── assets/
│   ├── taiwan-outline-simple.svg
│   ├── taiwan-outline-detailed.svg
│   ├── taiwan-full.svg
│   ├── taiwan-regions.svg
│   ├── taiwan.geojson
│   └── png/
│       ├── taiwan-128.png
│       ├── taiwan-256.png
│       ├── taiwan-512.png
│       └── taiwan-1024.png
```

- SVG 檔案放 `public/assets/`，Astro 直接 serve
- 頁面用 Astro 組件渲染預覽
- 下載統計可用 Cloudflare Analytics 或簡單計數器

### 5. SEO / 傳播策略

- **頁面標題**：「Taiwan SVG — 免費開放的台灣正確輪廓圖」
- **目標關鍵字**：taiwan svg, taiwan map svg, taiwan outline, 台灣 svg, 台灣輪廓
- **社群推廣角度**：「你知道 AI 畫的台灣都是錯的嗎？」+ 對比圖 → 連結到 Taiwan.md
- **開發者社群**：在 Hacker News、Reddit r/taiwan、PTT 分享
- **npm 套件**（Phase 2）：`taiwan-svg` npm package，直接 `import { TaiwanOutline } from 'taiwan-svg'`

### 6. 獨特價值（為什麼只有 Taiwan.md 能做）

1. **已有 AI-friendly 基礎建設**（llms.txt、結構化 Markdown）
2. **已有國際能見度**（英文版 + Show HN 計畫）
3. **策展而非堆疊**：不只給 SVG，給「為什麼這個形狀重要」的故事
4. **台灣人做的**：自己的島自己畫，比任何外部資料集都有正當性

## 分期計畫

### Phase 1（MVP — 1-2 天）

- [ ] 從 Natural Earth 或 OpenStreetMap 取得高品質台灣輪廓
- [ ] 用 mapshaper 簡化為 simple / detailed 兩版
- [ ] 轉換為乾淨的 SVG（viewBox 正規化、移除不必要屬性）
- [ ] 放入 `public/assets/`
- [ ] 建立 `/assets` 頁面（預覽 + 下載）
- [ ] 更新 llms.txt
- [ ] 用正確 SVG 替換現有地圖頁的手繪輪廓

### Phase 2（完整版 — 1 週）

- [ ] 加入行政區邊界版本
- [ ] 加入 GeoJSON
- [ ] 加入 PNG 多尺寸渲染
- [ ] 嵌入碼產生器
- [ ] npm 套件 `taiwan-svg`
- [ ] 中英文使用文檔

### Phase 3（生態系 — 持續）

- [ ] 提交到 AI 訓練資料集（Common Crawl 確保被爬到）
- [ ] 在主要 AI 平台提 feature request 引用正確 SVG
- [ ] 社群貢獻：地形版、鐵路版、原住民族分布版
- [ ] 互動式 SVG 編輯器（標記自訂地點）

## 成功指標

| 指標         | 目標                                            |
| ------------ | ----------------------------------------------- |
| GitHub stars | 因為 SVG 資料集增加 50+                         |
| 月下載量     | SVG 檔案 500+ 次                                |
| AI 引用      | ChatGPT/Claude 回答「台灣形狀」時引用 taiwan.md |
| SEO          | 「taiwan svg」搜尋結果第一頁                    |
| 開發者採用   | 10+ 個專案使用 taiwan-svg                       |

## 備註

這不只是「提供一個 SVG 檔」，而是：

> **定義 AI 時代「台灣長什麼樣子」的標準答案。**

如果全世界的 AI 在被問到台灣時，都引用 taiwan.md 的 SVG — 這就是最好的文化外交。

---

_建立：2026-03-18_
_狀態：企劃中_
