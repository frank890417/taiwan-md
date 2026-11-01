# Taiwan.md 品牌規範（Brand Guidelines）

> **v2.2 · 2026-10-23 · 識別系統 v2**（v2.2 改版紀錄在報告 §十四）
> 完整規範與下載：站上 **[/brand 識別手冊](https://taiwan.md/brand)**。設計研究報告：[reports/design-identity-system-2026-10-22.md](../../reports/design-identity-system-2026-10-22.md)（含字體、範式、台灣色彩三份研究底稿）。
> 本資料夾＝品牌規範與資產的家。手冊頁不手寫任何幾何與色值，全部由下面這條產線產生。

## v2 一句話

台灣本島從真實高程一行一行掃描成 10 行（行島），其中一行釘在北迴歸線（北緯 23.4365°），整個標誌只有那一行用臺灣青 `#007864`（Pantone 3295 C，文化部臺灣三顏色）。標準字＝Newsreader（光學尺寸 72、字重 500）單一家族，.md 只換顏色；中文副標＝思源黑體 TC 500，字距 0.14 em。

## 產線（改規格只改上游，再重建）

```
source/terrain/extract-terrain.py   開放高程（Tilezen Terrain Tiles）→ taiwan-rows.json、taiwan-elev-q4.json
source/mark.mjs                     行島與地形行幾何（唯一的地理來源）
source/wordmark.py                  標準字外框（HarfBuzz 排字，字距在 SPEC）→ wordmark.json
tokens.json                         色彩 tokens（兩模式；node ~/Projects/muse-bot/tools/brand-color/tokens-audit.mjs 驗證）
source/build-identity.mjs           → src/data/brand/identity.json（/brand 讀）＋ public/brand/*（19 個下載檔）
src/icons/taiwan-icons.mjs          行線圖示 v2.1（98 支；npm run prebuild:icons 產 sprite）
```

```bash
uv run --with numpy --with pillow python3 docs/brand/source/terrain/extract-terrain.py   # 只有換資料來源時
uv run --with fonttools --with uharfbuzz python3 docs/brand/source/wordmark.py        # 改字或字距時
node docs/brand/source/build-identity.mjs                                               # 其他一切
```

## 字體與授權

`fonts/` 放標準字用的 OFL 字檔與授權檔（Newsreader opsz 72／wght 500 靜態子集、Noto Sans TC 500 七字子集）。變體原檔太大不進 repo，第一次跑 wordmark.py 會下載到 `source/.cache/`。標準字只用 OFL：justfont 是站上增色層與贊助商，網頁授權只在 taiwan.md 網域，不轉外框做標誌。

## 第二階段（待哲宇拍板）

頁首 BrandMark／favicon／apple-touch-icon／OG 浮水印／頁尾品牌區換行島；全站色彩 token 遷移（連結色 → 臺灣青、墨 → `#13222a`、深綠頁尾 → 黑潮墨、分類彩虹退場）。在那之前，站上仍用 v1 資產（下方）。

---

# 附：v1.0.1（2026-08-25，站上現行）

> v1.0.1 · 2026-08-25（v1.0 同日：dark 改自帶底＋transparent 明名＋xlink:href 相容——起因＝raw 連結白字透明底被讀成破圖）
> **本資料夾＝品牌相關規範與資產的家。** 規格的程式碼 SSOT 在 `src/components/BrandMark.astro`（網站實際渲染）；本文件把它固定成可交付、可治理的規範。**兩處有衝突時，先修 BrandMark，再重跑生成器同步資產。**

---

## 0. 這個 logo 是怎麼來的（誠實考古）

Taiwan.md 的 logo 不是先有品牌手冊再做網站——它是**從 navbar 長出來的**：
`favicon.png`（256px 地形島嶼）＋「Taiwan」（Noto Serif TC 700）＋「.md」（Noto Sans TC 600 綠色）。
2026-08-25 第一次把它抽出成獨立資產（FUTUREMODE 社群夥伴表單需要 SVG），本規範同日建立。

設計語意：

- **Taiwan 用襯線體**——知識、檔案、被認真書寫的東西。
- **.md 用無襯線體＋綠色**——檔案格式後綴＝這個專案的本體玩笑（台灣的 Markdown 檔），綠色是唯一的品牌色相。
- **icon 用地形島嶼而非國旗**——呈現土地本身；國旗版（`assets/source/taiwanmd-favicon-flag.svg`）保留為歷史資產，**不用於品牌 lockup**。

## 1. 色票

| 色               | 值        | 角色                                                            |
| ---------------- | --------- | --------------------------------------------------------------- |
| Ink              | `#1a1a2e` | 淺底文字（Taiwan 字樣、內文標題）                               |
| White            | `#FFFFFF` | 深底文字                                                        |
| **Green Accent** | `#4fd1b0` | **深底上的 `.md`**（站上深色 navbar 態實際值 `--green-accent`） |
| **Green Mid**    | `#007864` | **淺底上的 `.md`**（站上淺色態實際值 `--green-mid`）            |
| Deep Green BG    | `#0f1a14` | 深色情境底色（darkbg 版示意）                                   |

⚠️ **`#00d4aa` 是 BrandMark 元件的 fallback 值，站上兩個態實際都不用它**（Header.astro 以 CSS vars 覆寫）。歷史上部分素材可能用過此色；**新資產一律用上表兩綠**，遇到 `#00d4aa` 視為待收斂的舊值。

規則：**綠只給 `.md` 和 accent 元素**（分隔點、underline）。綠不當大面積底色、不上 Taiwan 字樣。

## 2. 字體

| 元素   | 字體          | 字重 |
| ------ | ------------- | ---- |
| Taiwan | Noto Serif TC | 700  |
| .md    | Noto Sans TC  | 600  |

兩者皆 OFL 開源（Google Fonts），任何貢獻者可無授權疑慮地重製資產——這是刻意的：**開源專案的品牌也要開源可重建**。SVG 資產內文字已外框化，不依賴收件方裝字體。

## 3. Lockup 規格（生成器已鎖定）

```
[icon] –gap– Taiwan.md
icon 高度 = 1.08 × 字級
gap      = 0.4 × 字級
icon 垂直置中對齊大寫字高（cap height）中心
「.md」與「Taiwan」間距 = 0.04 × 字級
```

與 `BrandMark.astro` 的 CSS 一致（icon `1.08em`、gap `0.4rem`）。

## 4. 資產清單與選用

位置：`docs/brand/assets/`

| 檔案                                                                            | 用途                                                                                      |
| ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| 檔案                                                                            | 用途                                                                                      |
| ---                                                                             | ---                                                                                       |
| `svg/taiwanmd-logo-horizontal-dark.svg`                                         | **深底版（自帶 #0f1a14 底）**——對外交付預設；直開連結不會白字隱形                         |
| `svg/taiwanmd-logo-horizontal-light.svg`                                        | **淺底用**（透明底、#1a1a2e 字、#007864）——白底頁面直開可讀                               |
| `svg/taiwanmd-logo-horizontal-dark-transparent.svg`                             | 深底情境**透明版**（白字）——給設計師疊自己的深底；⚠️ 白底預覽會「看起來壞掉」，檔名已明示 |
| `svg/taiwanmd-wordmark-dark-transparent.svg`、`svg/taiwanmd-wordmark-light.svg` | 純文字版（無 icon；極小尺寸或 icon 會糊的場合）                                           |
| `png/taiwanmd-logo-*@h{64,128,256,512,1024}.png`                                | 各高度點陣版（dark／light／dark-transparent）                                             |
| `png/taiwanmd-icon@{32,64,128,256}.png`                                         | icon 單獨版（**刻意沒有 512：原始只有 256，放大＝假解析度**）                             |
| `source/taiwanmd-icon-original-256.png`                                         | icon 唯一原始資產（= `public/favicon.png`）                                               |
| `source/taiwanmd-favicon-flag.svg`                                              | 歷史國旗 favicon（不用於 lockup）                                                         |
| `source/build_logo.py`                                                          | 生成器（fontTools 外框化；字體不入 repo，腳本頭有下載來源）                               |

**交付規則（2026-08-25 v1.0.1 實戰補）**：對外給人時預設 `dark`（自帶底）＋`light` 兩張；**透明版只給明確會自己疊底的設計師**。白字透明底在任何白底預覽（瀏覽器直開 raw、Finder、聊天軟體）都會隱形，收件人第一眼＝「這張圖是壞的」。SVG 內嵌圖用 `xlink:href`（SVG 1.1，相容 Illustrator 與老渲染器；純 `href` 為 SVG2，部分軟體不認）。

## 5. 留白與最小尺寸

- **Clear space**：lockup 四周至少 0.35 × 字級（已內建於 SVG 畫布）。
- **最小尺寸**：完整 lockup 高度 ≥ 24px；再小換 wordmark 版或 icon 單獨版。
- icon 單獨使用下限 16px（favicon 情境）。

## 6. 不要這樣做

- ❌ 改「.md」的顏色成綠以外的色、或整組單色化時仍保留綠（單色場合全白／全 Ink）
- ❌ 把 icon 放大超過 256px 原始解析度輸出
- ❌ 用國旗 favicon 當 lockup 的 icon
- ❌ 幫 icon 加圓角、陰影、描邊（維持方形原樣）
- ❌ 拉伸、改字距、換字體、Taiwan 與 .md 分行

## 7. 🔴 已知限制與未來要件（下一版要解的）

1. **icon 天花板 = 256px raster**。這是全品牌唯一不可向量放大的資產。印刷、大圖輸出、佈景牆都會撞到。三條路（未拍板）：①以原圖為底重繪向量地形島 ②找回/重製高解析度地形原圖 ③委託設計重畫 icon。**在解掉之前，任何 >256px 的 icon 需求一律用 lockup 整組（文字部分可無限放大稀釋 icon 的模糊）或事先告知對方限制。**
2. **`#00d4aa` fallback 收斂**：BrandMark.astro 的 fallback 與實際渲染值不一致——歷史上導出的素材可能帶錯色。建議下一次動 BrandMark 時把 fallback 改為 `#007864`（淺底是無 CSS var 情境的常態）。
3. **深色底色未定義成品牌色**：站上深色態是 hero 圖片上的透明 navbar，`#0f1a14` 是本規範為情境版選的近似值，未經設計定案。
4. **中文標準字未定義**：「台灣」的中文 lockup（若未來需要）沒有規範。
5. 治理規則：**改 logo ＝ 改 `BrandMark.astro` → 重跑 `source/build_logo.py` → 資產全量重產 → 本文件版本 +1。** 資產是 derived，不手改單張。

---

_v1.0 · 2026-08-25 · 起因：FUTUREMODE 台灣未來祭社群夥伴申請需要 SVG logo，發現全 repo 沒有可交付的品牌資產，遂一次建制。_
