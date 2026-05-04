# 數位荒原 No Man's Land 資料集

- Generated: 2026-05-04T02:48:13.170063+00:00
- Source: https://www.heath.tw
- CMS: WordPress (custom post types: nml-issue / nml-article / nml-podcast / nml-announcement / nml-navigation)
- Crawler: `scripts/tools/fetch-nml-data.py`
- Method: sitemap-driven HTML scrape (custom REST endpoints return 404)

- Issues: 56 期 ISSUE
- Articles: 384 篇 ARTICLE（從 issue 內鏈萃取）
- Podcasts: 31 集 PODCAST
- Announcements: 74 篇 ANNOUNCEMENT
- Navigations: 3 篇 NAVIGATOR
- Pages: 7 個 landing pages
- **Total: 555 items**

## Structure

```
data/NML/
├── README.md             # 本檔
├── issues/               # 56 期 ISSUE 主題介紹（含每期收錄的 article URL）
│   ├── INDEX.md
│   └── {slug}.md
├── articles/             # 384 篇 ARTICLE 個別文章主體
│   ├── INDEX.md
│   └── {slug}.md
├── podcasts/             # 31 集 PODCAST（南洋廣播電台 / Radio Wave 系列）
│   ├── INDEX.md
│   └── {slug}.md
├── announcements/        # 74 篇 ANNOUNCEMENT（駐站、座談、出版預告）
├── navigations/          # 3 篇 NAVIGATOR（特殊策展導引）
├── pages/                # 7 個 landing pages (ABOUT / CONTRIBUTOR / etc.)
└── raw/                  # 原始 HTML + manifest + meta JSON 備份
    ├── manifest.json
    ├── sitemap-index.xml
    ├── issues-meta.json
    ├── articles-meta.json
    ├── podcasts-meta.json
    ├── announcements-meta.json
    ├── navigations-meta.json
    ├── pages-meta.json
    ├── html-issue/        # 56 個原始 HTML
    ├── html-article/      # 384 個原始 HTML
    ├── html-podcast/      # 31 個
    ├── html-announcement/ # 74 個
    ├── html-navigation/   # 3 個
    └── pages/             # 7 個 JSON (REST API works for pages)
```

## Markdown frontmatter 包含欄位

每篇文章 markdown 都帶以下 metadata：
- `Source` — 原始 URL（heath.tw 連結）
- `Slug` — URL slug
- `Type` — `nml-article` / `nml-issue` / `nml-podcast` / `nml-announcement` / `nml-navigation`
- `Published` — ISO 日期（從 `<div class="mdatename">` 解析）
- `Author` — 作者中文名
- `Editor` — 編輯（多數是鄭文琦或文章專屬編輯）
- `Translator` — 譯者（如有翻譯）
- `Original Source` — **原刊出處**（《藝術家》《今藝術》《Voices of Photography》等，56% 文章是轉載）
- `NML Category` — NML 分類（Performance / Sound Scene / Image / Interview / Translation / Opinion / Residency / Art Production / Meeting NML / Literature）
- `Date Text` — 原始日期文字（如 "December 8th, 2011"）

## 重要統計

| 指標 | 數值 |
|---|---|
| 總文章數 | 384 |
| 文章作者覆蓋率 | 100% |
| 編輯欄位覆蓋率 | 92% (353/384) |
| **原刊轉載比例** | **56% (214/384)** — 過半文章是邀稿轉載自其他刊物 |
| NML 分類覆蓋率 | 99% (379/384) |

## 授權

「數位荒原」網站上文章之著作權由原發表人或媒體所有，原發表人（媒體）同意授權本站可自由重製及公開散佈該文章。使用者得按此原則自由分享本站收錄之文章，且**註明作者姓名、轉載出處「數位荒原」與網頁的直接連結**。

→ Taiwan.md 引用本資料集時必須符合三條件：
1. 標註原作者姓名（不只「數位荒原」轉述）
2. 標註轉載出處「數位荒原 No Man's Land」
3. 提供原文網頁直接連結（heath.tw URL）

## 爬取器

```bash
# 完整重跑
python3 scripts/tools/fetch-nml-data.py

# 部分重跑（merge mode，不會 overwrite 完整 meta）
python3 scripts/tools/fetch-nml-data.py --types issue --limit 5
```

上次爬取：2026-05-04T02:48:13.170063+00:00
下次建議：6 個月後（NML 內容更新頻率約 2-4 篇/月）
重新爬取觸發條件：
- NML 公告新一期 ISSUE
- 群島資料庫第三期啟動（Twinning Archipelago 後續）
- Taiwan.md 完成 P0×5 文章後評估再爬

## 來源

PEER-INGESTION-PIPELINE Stage 2 + 3 implementation for No Man's Land (heath.tw).
2026-05-04 ingest by Taiwan.md Semiont (Opus 4.7 1M context).
