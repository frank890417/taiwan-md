---
title: 'REWRITE-MEDIA'
description: '媒體素材完整生命週期 canonical — 授權矩陣 / aspect ratio 護欄 / fair use editorial scope'
type: 'pipeline-sub-canonical'
status: 'canonical'
last_updated: 2026-05-09
last_session: 'brave-kirch-202256'
parent_canonical: '../REWRITE-PIPELINE.md'
sister_docs:
  - 'REWRITE-RESEARCH.md'
  - 'REWRITE-WRITE.md'
  - 'REWRITE-VERIFY.md'
upstream_canonical:
  - '../../semiont/DNA.md'
  - '../../editorial/EDITORIAL.md'
---

# REWRITE-MEDIA — 媒體素材完整生命週期 canonical

> 相關：[REWRITE-PIPELINE.md](../REWRITE-PIPELINE.md)（主流程）| [REWRITE-RESEARCH.md](REWRITE-RESEARCH.md)（Stage 1）| [REWRITE-WRITE.md](REWRITE-WRITE.md)（Stage 2 inline 外連 call site）| [REWRITE-VERIFY.md](REWRITE-VERIFY.md)（image-health gate）
>
> **這份檔案是媒體素材（圖片 / inline 外連 / transcript）完整生命週期的 canonical**。從 Stage 1.7 research 階段蒐集素材 + 授權矩陣，到 Stage 4.5 insertion 階段插入 + caption + 授權清單同步，**單一檔案管整段流程**，避免 attribution 規則漂移。

---

## 兩階段生命週期

```
Stage 1.7（research 階段）：蒐集 + 授權檢查 + manifest append
   ↓ deliverable
Stage 4.5（insertion 階段）：fetch verify + aspect ratio + 插入 + caption + 授權清單同步
   ↓ hard gate
image-health plugin gate（Stage 5 前）
```

**Stage 1.7 沒做 = 不能進 Stage 4.5**。Stage 4.5 直接讀 Stage 1.7 manifest，沒 manifest = 退回 Stage 1.7。

完整設計理由 + 14 個邊界考量見 [reports/rewrite-pipeline-media-stage-design-2026-04-28-ι.md](../../../reports/rewrite-pipeline-media-stage-design-2026-04-28-ι.md)。

---

## Stage 1.7: MEDIA RESEARCH（v2.20 新增）

Stage 1 結尾必跑媒體素材蒐集 + 授權檢查。三類 manifest 落 research 檔末尾。

### §1.7a inline 外連 manifest（YouTube／影像／音檔）

**本段為 v2.17.1 / v2.27 SSOT canonical**（原散落 Stage 2 step 12，v2.20 搬到 Stage 1.7a，Stage 2 改 pointer）。

**觸發條件**：任何題材敘事中提到**有公開影像／音檔／影片**的具體作品：

- 音樂人：歌名 → 官方 MV／lyric video／official audio
- 電影 / 紀錄片：片名 → 官方預告／導演頻道／串流官方頁
- 電視劇 / 綜藝：節目名 → 官方頻道／公視+／Netflix 官方
- YouTube 創作者 / Podcaster：節目名 → 官方頻道
- 演唱會 / 表演 / 舞作：場次名 → 主辦官方／售票頁／aftermovie
- 音樂節：節目名 → 官方 lineup
- 新聞事件：被引用的關鍵公開影片 → 官方 YouTube

**URL 優先序**：(1) 官方頻道（藝人／廠牌／節目方／導演）(2) 國際串流官方（Spotify / Apple Music / KKBOX）(3) 主辦／策展單位官方頁。**不接受**搜尋結果頁、UGC 翻唱、二手轉貼。

**密度建議**：每篇 3-8 inline 外連最合理。少於 3 → 讀者沒得點；多於 10 → 視覺擁擠。

**位置建議**：作品名在文章中**第一次出現**時加 link；同一作品再次出現不重複加。

**跟 footnote 的分工**：inline 外連走「邊讀邊聽／邊讀邊看」的閱讀體驗；footnote 走「來源驗證 + 補充資料」。同一首歌的官方 MV 可以同時放 footnote（給研究者）+ 文中第一次提及加 inline link（給讀者）。

**Stage 1.7a 強制動作**：研究 agent 額外蒐集「文章預期會提到的所有公開作品」的官方連結，列入研究筆記獨立一節 §inline 外連 manifest（範例：壞特 Round 1 §10 蒐集 13 條 / 田馥甄 Round 2 §A 14 條 / 林琪兒 ι session 中央大學演講 transcript [^30]）。找不到官方版本 → 標 `[no official URL found]`，**Stage 2 寫作時不附 link 也不掰連結**。

### §1.7b 圖片素材（hero + inline 圖）+ 授權矩陣

**圖片用途分類**：

| 用途              | 位置                               | 數量           | 範例                                   |
| ----------------- | ---------------------------------- | -------------- | -------------------------------------- |
| **hero**          | frontmatter `image:`               | 1              | 林琪兒 EMU 1692×1691                   |
| **inline 圖**     | 文中 markdown `![]()`              | 1-2            | 林琪兒 Expedition 42 + Crew-4 training |
| **OG / 社群分享** | derived from hero（`/og-images/`） | auto           | dashboard 自動生成，不手動處理         |
| **spore poster**  | derived（`/spore-images/`）        | auto on demand | `make-spore.sh` 自動產，不手動處理     |

**理想數量**（2026-05-09 哲宇拍板更新）：每篇 article **2-3 張圖最理想**（hero 1 張 + inline 1-2 張）。

- **2 張**：適用於人物文 / 短深度文（hero + 1 scene-mid 視覺呼吸）
- **3 張**：適用於 ≥ 3000 字深度文 / 多時序敘事（hero + 2 scene-mid，呼應 §4.5a 三段敘事節奏）
- **0 張**：適用於 Hub 頁（`_*.md`） / 純架構性條目
- **> 3 張**：例外場景才用（如展演紀錄需多角度），避免敘事被視覺打斷

**來源優先序**（2026-05-09 fair use scope 升級後）：

1. **官方機構釋出 PD**（NASA / 政府開放資料 / NMTH） — 完全免授權追問，cache 即可
2. **Wikimedia Commons CC0 / PD** — cache 即可
3. **Wikimedia Commons CC BY / CC BY-SA** — 必須在文末「## 圖片來源」標 author + license + link
4. **Flickr CC BY / CC BY-SA** — 同上
5. **企業 / 機構官網釋出圖**（official press kit / news release / about page） — 標 ©機構 + 用途。**對企業文 / 機構文這層通常是首選** (如台積電 ESG 報告、機構 press release 圖)
6. **出版社 / 媒體授權圖**（哲宇 / Taiwan.md 取得明確授權） — 文末標 © 來源 + 授權範圍
7. **自拍 / 自製插畫** — 標 © Taiwan.md / contributor name
8. **Fair use editorial commentary**（2026-05-09 哲宇 fair use scope 啟動）— 對「在世藝術家作品紀錄圖」「企業產品圖」「電影海報」「專輯封面」「個展裝置照」走 fair use editorial commentary scope，**不需 CC license**，標來源 + 單位 + 用途即可。法理依據：17 U.S.C. § 107 + 著作權法 § 65 fair use 四要素：(a) 非商業教育性質 (b) 已發表作品 (c) 引用比例小 (d) 對市場無實質替代效果。**用法守則**：(i) 一定要 cache 本地不熱連結 (ii) 文末 §圖片來源 完整 attribution (iii) 標明「Fair use editorial commentary on [target]'s work」license type
9. **歷史史料圖無 PD 替代**（如 1947 二二八紀錄照） — 同 fair use editorial scope，但要更謹慎查證歷史出處

**絕對禁止**：

- 熱連結（hot-link）任何外站圖（Wikimedia / Flickr / 媒體網站） → **永遠 cache 本地**
- 未授權的攝影師圖（Google 圖片找到的）
- AI 生成圖片（暫時禁用，紀實 portrait 永遠禁用）
- GIF / HEIC / BMP / TIFF（須先轉 JPG 才入庫）

**授權檢查 SOP**（每張圖入庫前必跑）：

```bash
# Step 1: WebFetch 圖片頁面確認 license badge + 取 hi-res URL + caption + credit
# 對 Wikimedia Commons / Flickr，逐字引用「License」段落
# 對 NASA，預設 PD 但 WebFetch 確認該圖頁面有「Public domain」標示

# Step 2: 落 metadata 進 reports/research/YYYY-MM/{slug}.md §媒體授權矩陣

# Step 3: 確認 attribution 完整（攝影者 / 拍攝日期 / source URL / license type）
```

**格式規範**：

```
✅ JPG (.jpg) — 預設：人像 / 風景 / 紀實照。sRGB / quality 80-90 / 無 EXIF GPS（隱私）/ < 600KB hero / < 400KB inline
✅ PNG (.png) — 插圖 / 圖表 / 透明背景 logo / 螢幕截圖。8-bit RGBA / < 800KB
✅ WEBP (.webp) — 未來預設（Astro Image 自動轉換時）
✅ SVG (.svg) — vector logo / 簡單插圖。< 50KB / 無外部 reference / 文字 outline
❌ GIF / HEIC / BMP / TIFF — 禁用
```

**命名 convention**：`public/article-images/{category-lower-kebab}/{subject-slug}-{topic}-{year}.{ext}`

範例：

```
public/article-images/people/lindgren-emu-2014.jpg
public/article-images/people/lindgren-crew4-training.jpg
public/article-images/people/lindgren-expedition42-crew.jpg
public/article-images/history/twenty-eight-incident-monument-2025.jpg
```

規則：全 lowercase / kebab-case / 必含 subject-slug + topic + year / ext 副檔名

**Aspect ratio 護欄**（避免 Astro 16:9 框切到頭，林琪兒 ι session 教訓）：

| 圖種                | 推薦比例                           | 推薦尺寸             | 理由                            |
| ------------------- | ---------------------------------- | -------------------- | ------------------------------- |
| hero（frontmatter） | **16:9 或更寬** landscape          | 1600×900 / 2000×1200 | Astro 16:9 框直接 fit           |
| inline 圖           | 可 portrait 但 ≤ 4:3 高比          | 1200×900 / 1500×1000 | markdown `![]()` 框較寬鬆       |
| 1:1 方形            | 接近方形 1:1 ± 10%                 | 1600×1600            | hero 也接受（如 EMU 1692×1691） |
| **絕對禁止 hero**   | 9:16 portrait（高 > 寬 1.5x 以上） | —                    | Astro 一定切到頭                |

Stage 1.7b 強制檢查：每張圖 fetch 時 `bash scripts/tools/check-aspect.sh {filename}` 看尺寸。Hero aspect 必過 0.9 ≤ ratio ≤ 2.0；inline 必過 0.75 ≤ ratio ≤ 2.5。不過 → 換圖（不要強塞）。

### §1.7c transcript 素材

| 來源類型                            | 處理方式                                                                                                           |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| 公視／TaiwanPlus／官方 YouTube 訪談 | yt-dlp 抓 .vtt → 轉純文字 transcript → 落 `reports/research/YYYY-MM/{slug}-transcripts/` → footnote 引 YouTube URL |
| Podcast 官方頁                      | footnote 引 podcast URL；若有 transcript 公開 → cache transcript                                                   |
| 自製訪談錄音                        | 不公開原始錄音；只引 verbatim 段落，footnote 註明「Taiwan.md 自訪談 YYYY-MM-DD」                                   |

yt-dlp 抓字幕指令：

```bash
cd reports/research/YYYY-MM/{slug}-transcripts/
yt-dlp --skip-download --write-auto-sub --write-sub \
  --sub-lang "zh-TW,zh-Hant,zh-Hans,zh,en" --sub-format vtt \
  -o "%(title).80s.%(ext)s" "https://www.youtube.com/watch?v={ID}"
```

### §1.7d 媒體授權矩陣（research 檔強制）

每篇 depth article 的 research 檔末尾 append：

```markdown
## 媒體授權矩陣

### inline 外連（YouTube／影像／音檔）

| 作品      | 第一次提及位置                              | URL                                         | 來源頻道          | 授權             |
| --------- | ------------------------------------------- | ------------------------------------------- | ----------------- | ---------------- |
| 〈Cazzo〉 | L346「2019 年 6 月 28 日，她以『?te』之名」 | https://www.youtube.com/watch?v=CM-6FJlYHI4 | 華風數位 official | YouTube standard |

### 圖片素材

| 媒體檔                | 用途 | 來源 URL                                                                    | 授權                 | 攝影者/作者        | 拍攝日期   | NASA Image ID / Commons File             | 本地 cache 路徑                              | alt text                                  |
| --------------------- | ---- | --------------------------------------------------------------------------- | -------------------- | ------------------ | ---------- | ---------------------------------------- | -------------------------------------------- | ----------------------------------------- |
| lindgren-emu-2014.jpg | hero | https://commons.wikimedia.org/wiki/File:Kjell_Lindgren_in_EMU_(cropped).jpg | Public domain (NASA) | NASA/Bill Stafford | 2014-08-27 | File:Kjell*Lindgren_in_EMU*(cropped).jpg | /article-images/people/lindgren-emu-2014.jpg | 林琪兒 2014 年穿艙外活動服（EMU）官方人像 |

### 引用 transcript

| Transcript     | 來源                   | URL                                         | 落檔路徑                                                      |
| -------------- | ---------------------- | ------------------------------------------- | ------------------------------------------------------------- |
| 公視訪談 zh-TW | 公視新聞網 official YT | https://www.youtube.com/watch?v=f9DQuQ8EwVE | reports/research/2026-04/林琪兒-transcripts/transcript-zh.txt |
```

### §1.7e Stage 1.7 deliverable

Stage 1.7 結束時 deliverable：

1. research 檔末尾有「§媒體授權矩陣」三表（inline 外連 / 圖片 / transcript）
2. 每張圖已 cache 在 `public/article-images/{category}/`
3. 每張圖通過 aspect ratio 護欄
4. 每張 transcript 已 cache 在 `reports/research/YYYY-MM/{slug}-transcripts/`

**沒過 = 不進 Stage 2。**

---

## Stage 4.5: MEDIA INSERTION（v2.20 新增）

> **觸發時機**：Stage 4 format-check 通過後、Stage 5 cross-link 之前。
>
> **為什麼這時插入**：寫完 prose 才知道「實際敘事節奏在哪、哪段需要 visual 呼吸」。寫之前布陣會綁死寫作節奏；寫完一次插入更自然。
>
> **依賴**：Stage 1.7 必須完成（媒體授權矩陣三表 append research 檔 + 圖片已 cache）。沒做 → 退回 Stage 1.7。

### §4.5a 三段敘事節奏判斷

媒體插入位置影響敘事節奏，不是隨便塞。三段標準：

| 位置          | 用途                          | 圖型                  | 數量 | 範例                            |
| ------------- | ----------------------------- | --------------------- | ---- | ------------------------------- |
| **hero**      | 30 秒概覽前，建立人物視覺認知 | 16:9 landscape 或 1:1 | 1    | 林琪兒 EMU 2014                 |
| **scene-mid** | 中段重要轉折前                | landscape 為主        | 0-2  | Expedition 42 / Crew-4 training |
| **closure**   | 結尾段視覺收尾（首尾呼應）    | landscape             | 0-1  | 訪台首日場景照（如有）          |

**判準**：

- depth-article（≥ 3000 字）：hero + 1-2 scene-mid，總共 2-3 張
- 短文 / Hub：hero only（1 張）
- 翻譯文：跟原文同步圖片（不另增）

**Scene-mid 位置規則**：圖放在「該段 narrative 開始前」而不是「該段中間」：

```markdown
## 紅色 LED 下的第一口萵苣 ← 小標題

[圖：Expedition 42 三人合影] ← 圖放這裡
_caption_

prose 開始... ← 文字接續
```

**錯誤示範**（切斷敘事節奏）：

```markdown
## 紅色 LED 下的第一口萵苣

prose 第一段...
prose 第二段...

[圖：Expedition 42 三人合影] ← 切斷敘事
_caption_

prose 第三段...
```

**呼吸原則**（呼應 EDITORIAL §密度平衡）：連續 3 段以上密集事實段（≥ 200 字 / 段）→ 中間插入一張 scene 圖作為視覺呼吸。

### §4.5b 圖檔 fetch + cache + naming

依 Stage 1.7b 的 manifest 已 cache 完成。Stage 4.5 僅做最後 verify：

```bash
# 確認所有 manifest 列出的圖檔都存在於 public/article-images/
ls public/article-images/{category}/

# 必要時補抓（若 Stage 1.7b 未完成全部圖）
mkdir -p public/article-images/{category}/
curl -sL -A "Mozilla/5.0 Taiwan.md/1.0" "{hi-res-url}" \
  -o public/article-images/{category}/{slug}-{topic}-{year}.{ext}

# 確認 file format + 大小 + EXIF GPS 已清
file public/article-images/{category}/{filename}
sips -g pixelWidth -g pixelHeight public/article-images/{category}/{filename} | tail -3

# 必要時 resize / re-encode（hero < 600KB / inline < 400KB）
sips -Z 2000 --setProperty formatOptions 85 public/article-images/{category}/{filename}

# 清 EXIF GPS / 個人資訊（保留 description / copyright）
exiftool -gps:all= -location:all= -DeviceMfgr= -DeviceModel= public/article-images/{category}/{filename}
```

### §4.5c Aspect ratio 護欄（避免被切）

```bash
bash scripts/tools/check-aspect.sh public/article-images/{category}/{filename}
```

| 圖種          | 必過範圍            | 林琪兒 ι 教訓                                                              |
| ------------- | ------------------- | -------------------------------------------------------------------------- |
| **hero**      | 0.9 ≤ aspect ≤ 2.0  | lindgren-crew4-portrait.jpg 1041×1561 (0.67) 切到頭 → 換 1041×694 (1.5) ✅ |
| **inline 圖** | 0.75 ≤ aspect ≤ 2.5 | Expedition 42 4896×3264 (1.5) ✅ / EMU 1692×1691 (1.0) ✅                  |

不過 → **換圖**（不要強塞）。

### §4.5d Markdown 插入 + caption + alt text 全規範

**標準格式**：

```markdown
![alt text 描述](/article-images/{category}/{filename}.jpg)
_caption 說明文字。Photo: {credit}. [License via {source}]({source-url})._
```

**Alt text 規則**（accessibility 必需）：

- 描述「畫面內容」不是「圖名」
- 涵蓋：誰 + 在哪 + 做什麼 + 拍攝氛圍
- 30-80 字
- 不重複 caption 文字

**範例對比**：

```markdown
❌ 壞 alt text（只有圖名）：
![林琪兒 2014](/article-images/people/lindgren-emu-2014.jpg)

✅ 好 alt text（描述畫面）：
![林琪兒 2014 年穿艙外活動服（EMU）官方人像，全套白色 NASA 太空服，仰角拍攝顯示頭盔反光](/article-images/people/lindgren-emu-2014.jpg)
```

**Caption 規則**：

- 用 markdown italic `_..._`（不用 HTML `<figcaption>`）
- 結構：`{時間 + 地點 + 事件}。Photo: {攝影者 / 機構}. [License via {source}]({URL})。`
- 中文 prose 風格，跟 article 一致
- 關鍵 metadata（NASA Image ID / Commons file name）放括號註

**範例**：

```markdown
_2014 年 8 月 27 日，林琪兒穿艙外活動服（Extravehicular Mobility Unit）在 NASA 詹森太空中心拍攝的官方人像。Photo: NASA/Bill Stafford. [Public domain via Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Kjell_Lindgren_in_EMU_(cropped).jpg).\_
```

### §4.5e 授權清單同步

每張 inline 圖插入後，**強制同步**：

1. **frontmatter**（hero only）：

   ```yaml
   image: '/article-images/{category}/{filename}.jpg'
   imageCredit: '攝影者 / 機構'
   imageLicense: 'Public domain (NASA)' / 'CC BY-SA 4.0' / etc
   imageSource: '{source-URL}'
   ```

2. **文末「## 圖片來源」section**（所有圖）：

   ```markdown
   ## 圖片來源

   本文使用 N 張公有領域 / CC 授權圖片，全部 cache 於 `public/article-images/{category}/` 避免熱連結來源伺服器：

   - [圖檔 1 標題](source-URL) — Photo: 攝影者, YYYY-MM-DD, License, NASA Image ID 或 Commons file
   - [圖檔 2 標題](source-URL) — ...
   ```

### §4.5f 圖片健康檢查（P0 工具強制）

```bash
python3 scripts/tools/article-health.py knowledge/{Category}/{slug}.md --check=image-health
```

預期檢查：

- ✅ 文中所有 `![]()` 連結對應檔案存在
- ✅ Frontmatter `image:` 存在 + credit + license + source
- ✅ 文中無外部熱連結（http/https URL 不在 `/article-images/`）
- ✅ `## 圖片來源` section 存在
- ✅ 所有圖全部有完整 metadata（攝影者 / license / source URL）

**不通過 → 不進 Stage 5。**

### Stage 4.5 邊界與例外

- **Hub 頁**（`_*.md`）：不放圖，跳過 Stage 4.5
- **短修正 / heal commit**：不重新走 pipeline，圖用既有的不動
- **翻譯文**：跟原文圖同步（cache 共用），caption 翻譯成對應語言
- **沒有合適媒體素材**：明確標 `no-media` 進 research 檔，跳過 Stage 4.5
- **觀察者直接丟連結**（如林琪兒 ι session）：走 Stage 4.5 補圖 SOP（§4.5b/c/d/e/f），不走 Stage 1.7
- **Article ship 後才發現缺圖**：spawn `heal:` commit + 走 Stage 4.5

### 跟 spore 配圖區分

| 圖種                  | 路徑                           | 用途                    | 生成方式              |
| --------------------- | ------------------------------ | ----------------------- | --------------------- |
| article hero / inline | `public/article-images/{cat}/` | 文章內容                | Stage 1.7 + 4.5 手動  |
| OG 社群分享           | `public/og-images/{cat}/`      | facebook / twitter card | dashboard 自動 derive |
| spore poster          | `public/spore-images/`         | Threads / X 配圖        | `make-spore.sh` 自動  |

不要嘗試共用 — spore 是 social 媒介，需要不同 aspect 跟 brand overlay。article 圖 cache 完整／spore 圖 ephemeral，分開管理。

---

_canonical: REWRITE-MEDIA.md_
_合併 REWRITE-PIPELINE.md v2.20 §Stage 1.7（line 337-493）+ §Stage 4.5（line 883-1069）_
_拆出原因：Stage 1.7 跟 4.5 描述同一個媒體生命週期但分散在兩個 stage，§1.7b 授權矩陣 / §4.5d 插入格式 / §4.5e 授權清單同步 三處 attribution 規則漂移風險（per [evolution plan §3 問題 1 + Q3 校準](../../../reports/rewrite-pipeline-evolution-plan-2026-05-09.md)）_
_Refactor: 2026-05-09 brave-kirch_

🧬
