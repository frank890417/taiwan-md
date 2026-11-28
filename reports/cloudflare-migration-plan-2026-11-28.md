---
title: '把部署從 GitHub Pages 搬到 Cloudflare 的規劃'
date: 2026-11-28
session: '2026-11-28-191052-cicd-speed-eval'
type: 'migration-plan'
status: '第 0、1 階段完成，第 2 階段等 API 權杖；正式網域還沒有動'
related:
  - 'reports/cicd-speed-evaluation-2026-11-28.md（§十一：為什麼要搬）'
  - 'reports/site-health-2026-11-04.md'
---

# 把部署從 GitHub Pages 搬到 Cloudflare 的規劃

哲宇 2026-11-28 深夜拍板：搬過去，先寫完整規劃再執行；帳號相關的私密資料與設定不進 repo，留在本機。

為什麼搬、優缺點與費用在 `reports/cicd-speed-evaluation-2026-11-28.md` §十一。這份只講怎麼搬。

## 一、搬完之後長什麼樣

```text
push main
   │
   ▼
GitHub Actions：prebuild → 分片建置 → URL 契約對賬          （不變）
   │
   ├──▶ Cloudflare Workers 靜態資產：只上傳變了的檔 → 上線     （新的正式站）
   │
   └──▶ GitHub Pages：整包上傳                               （改成每天一次的冷備份）
```

- 讀者看到的網址、憑證、CDN 都不變。DNS 本來就在 Cloudflare，換的只是「檔案放在哪」。
- 目標是純靜態的 Worker：只有檔案，沒有程式介入請求，所以請求不計費。

## 二、什麼放哪裡（哲宇的要求：私密與設定不進 repo）

| 東西                                            | 放哪裡                                                                                               | 進 repo？                                         |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| Cloudflare 帳號 ID、Worker 名稱、網域路由       | 本機 `~/.config/taiwan-md/cloudflare/settings.env`（權限 600）；CI 用 GitHub Actions 的 secrets      | 否                                                |
| Cloudflare API 權杖（CI 部署用）                | 只在 GitHub Actions 的 secrets；本機用 `wrangler login` 的登入，不另存權杖                           | 否                                                |
| wrangler 設定檔                                 | 部署時由腳本依環境變數產生到暫存目錄，用完即丟；本機測試用的那份在 `~/.config/taiwan-md/cloudflare/` | 否                                                |
| 部署腳本（讀環境變數、產生設定、呼叫 wrangler） | `scripts/ci/deploy-cloudflare.mjs`                                                                   | 是。裡面沒有任何帳號資訊，fork 的人填自己的就能用 |
| `public/_headers`（回應標頭規則）               | repo                                                                                                 | 是。內容本來就是公開送出去的標頭                  |
| 這份規劃                                        | repo                                                                                                 | 是。不含帳號 ID、權杖、測試網址                   |
| 測試網址、帳號細節、操作紀錄                    | 本機 `~/.config/taiwan-md/cloudflare/NOTES.md`                                                       | 否                                                |

GitHub Actions 的 secrets 是加密存在 GitHub 的設定裡，不在 repo 的檔案或歷史中，fork 也拿不到。CI 要能自動部署，權杖就得放在那裡；如果連這個都不要，就只能從本機手動部署，那會失去「push 就上線」。這一點列在第七節等哲宇確認。

## 三、分階段

每一階段都有「過了才往下」的條件，前三個階段完全不碰正式網域。

### 第 0 階段：準備與第一次試傳（今晚，本機）

- [x] 本機設定目錄建好，wrangler 已登入、有部署權限。
- [x] `sitemap-0.xml` 25MB 超過單檔 25MiB 上限。在 sitemap 設定加 `entryLimit: 10000`，拆成兩份（15.8MB 與 10.5MB）。URL 契約對賬 0 dead。這個改動對 GitHub Pages 也安全。
- [x] 從本機把產物部署到 `workers.dev` 的預覽網址（帶 `X-Robots-Tag: noindex`）。第一次整份上傳 32,181 個檔，744 秒。
- [x] 量「只傳差異」：什麼都沒改再部署 27 秒；改 350 個檔 36 秒。現在 GitHub Pages 那一段約 232 秒。
- [x] 帳號方案：3.2 萬個檔上傳沒有被拒，哲宇確認已訂付費方案。

過關條件：預覽網址打得開；第二次部署的時間明顯短於現在的 230 秒。

### 第 1 階段：行為對齊（本機＋預覽網址）

GitHub Pages 預設幫忙做、Cloudflare 要自己確認的事，逐項拿預覽網址跟正式站比：

| 項目                                     | 正式站現在的行為                    | 在 Cloudflare 上怎麼做                                  |
| ---------------------------------------- | ----------------------------------- | ------------------------------------------------------- |
| `/api/*.json` 跨網域讀取                 | 帶 `access-control-allow-origin: *` | `public/_headers` 加規則                                |
| `raw/*.md`                               | `text/markdown; charset=utf-8`      | 實測；不對就在 `_headers` 指定                          |
| `.well-known/apple-app-site-association` | 回 200                              | 確認隱藏目錄有被上傳、型別正確                          |
| 不帶斜線的網址                           | 301 到帶斜線                        | `html_handling: auto-trailing-slash`，中文路徑實測      |
| 找不到的頁                               | 回自家的 404 頁、狀態碼 404         | `not_found_handling: 404-page`                          |
| 轉址                                     | 幾百個轉址小頁面                    | `_redirects` 生效後變成真的 301；確認兩者不打架         |
| `feed.xml`、`rss.xml`、sitemap           | 型別與內容                          | 實測                                                    |
| HTML 快取                                | `max-age=600`                       | 預設每次確認是否最新；`/_astro/` 這類帶雜湊的檔設長快取 |
| 安全標頭                                 | 全缺（11-04 健檢）                  | 先不加，搬完再另案處理，避免一次改兩件事                |

工具：`scripts/tools/compare-build-styles.mjs`（樣式）、URL 契約對賬、一支新的小腳本抽幾百個網址比狀態碼與關鍵標頭。

另外處理超過單檔上限的那份簡報 PDF（37.7MB，`src/i18n/about.ts` 有連結到它）：壓到 25MiB 以下，或改放別處並更新連結。試傳階段先用 `.assetsignore` 略過。

過關條件：抽樣網址的狀態碼全部一致；有差異的標頭都是預期中的（快取、伺服器名稱）。

### 第 2 階段：接上 CI，兩邊並行

- 哲宇建一把只能部署 Workers 的 API 權杖，連同帳號 ID、Worker 名稱放進 GitHub Actions 的 secrets。
- `deploy.yml` 加一個 job：建置完成後，跟 GitHub Pages 的部署同時把同一份產物部署到 Cloudflare 的預覽 Worker。secrets 沒設時這個 job 自動跳過（fork 不受影響）。
- 這樣跑幾天：每次 push 兩邊都有；正式站仍是 GitHub Pages。蒐集真實的 CI 部署時間，並每天用比對工具對一次。

過關條件：連續幾天、幾十次部署沒有失敗；CI 上的部署時間符合預期。

### 第 3 階段：切換正式網域

挑沒有活動的時段（不是開票夜這種晚上）。

1. 把同一份產物部署到正式的 Worker。
2. 把 `taiwan.md` 的路由掛到這個 Worker，移除原本指向 GitHub Pages 的 DNS 紀錄。
3. 立刻驗證：首頁、文章、阿拉伯文頁、`/api/`、404、一條轉址；跑字型閘門與 URL 契約抽樣。
4. 盯一小時的錯誤率（Cloudflare 後台）。

退回方式：把 DNS 紀錄指回 GitHub Pages（GitHub Pages 那邊一直有最新的一份）。Cloudflare 自己也能退回前 100 個版本。

### 第 4 階段：收尾

- GitHub Pages 的部署從「每次 push」改成「每天一次」當冷備份。這一步之後每次部署才真的省下那 195 秒。
- 字型閘門、`dashboard-build-perf` 這類讀部署步驟時間的儀器改讀新的 job。
- `docs/fork/` 補一段：fork 預設仍用 GitHub Pages，想用 Cloudflare 要設哪幾個 secrets。
- 把「部署後清快取」「縮短 HTML 快取」這兩個待決項關掉（搬完就不存在了）。
- 評估報告裡的佇列建議（部署包超過 1GB）一併結案。

## 四、預期的數字（都還是估計，第 0 階段會換成實測）

|                      | 現在        | 第 2 階段（並行）                 | 第 4 階段之後 |
| -------------------- | ----------- | --------------------------------- | ------------- |
| push 到正式站上線    | 495 秒      | 495 秒（正式站還是 GitHub Pages） | 約 300 秒     |
| 部署後讀者要等的快取 | 最多 600 秒 | 最多 600 秒                       | 幾乎沒有      |

## 五、風險

| 風險                               | 怎麼控制                                                                            |
| ---------------------------------- | ----------------------------------------------------------------------------------- |
| 行為跟 GitHub Pages 不一樣而沒發現 | 第 1 階段逐項比；第 2 階段並行幾天                                                  |
| 切換後出事                         | DNS 指回 GitHub Pages；Cloudflare 版本退回                                          |
| Cloudflare 一家出事整站不見        | GitHub Pages 冷備份                                                                 |
| 檔數長到 10 萬上限（現在 3.2 萬）  | 列入儀表板警示；真的接近時把 OG 圖與 raw 檔搬到 R2                                  |
| 權杖外洩                           | 權杖只給「部署這個帳號的 Workers」的權限，不給 DNS、不給帳單；只放在 GitHub secrets |
| 預覽網址被搜尋引擎當成重複內容     | 預覽部署一律帶 `noindex` 標頭；切換完成後刪掉預覽 Worker                            |
| fork 的人部署不起來                | Cloudflare 那個 job 在 secrets 沒設時跳過；GitHub Pages 路徑保留                    |

## 六、不在這次範圍

- 只重建受影響的頁（另一條線在做準備，見 `reports/incremental-build-prep-2026-11-28.md`，如果已經產出）。
- 站體瘦身（內嵌腳本外移、changelog 分頁）。搬完之後做效果更好，但不綁在一起。
- 安全標頭。

## 七、要哲宇決定或動手的

1. **CI 的權杖放 GitHub Actions secrets，可以嗎？** 它不在 repo 裡，但也不在「本機」。不放的話就沒有自動部署。
2. **訂 Workers Paid（每月 US$5）**，如果第 0 階段確認帳號還是免費方案。
3. **第 2 階段要的 API 權杖**由哲宇在 Cloudflare 後台建。
4. **第 3 階段切換的時間點**由哲宇決定。
5. 那份 37.7MB 的簡報 PDF：壓小留在站上，還是搬到別處。

## 八、進度紀錄

進度寫在這一節，帳號相關的細節寫在本機的 `NOTES.md`。

- 2026-11-28 23:40　第 0 階段開始。sitemap 拆檔完成並驗證。
- 2026-11-28 23:53　第一次整份試傳完成（744 秒）。
- 2026-11-29 00:00　第 0 階段過關：重複部署 27 秒、改 350 個檔 36 秒。
- 2026-11-29 00:10　第 1 階段：拿 26 種網址比正式站與預覽，補上 `public/_headers`（跨網域、UTF-8、長快取、iOS 通用連結）。剩下的已知差異是不帶斜線的網址回 307 而不是 301。簡報 PDF 壓到 8MB。
- 2026-11-29 00:20　第 2 階段的程式開成 PR #2097；repo secrets 已設帳號 ID、預覽 Worker 名稱、noindex 旗標。**等哲宇建 API 權杖**，CI 上才會真的跑。
- 2026-11-29 00:08　哲宇建好 API 權杖並放進 repo secrets（權杖範圍：這個帳號的 Workers 相關編輯權，網域只給 `taiwan.md`）。PR #2097 合併。
- 2026-11-29 00:22　CI 上第一次並行部署（run 46163561283）成功。Cloudflare 那一步補傳了 24,694 個檔、408 秒：本機先前上傳的那份跟 CI 建的不是同一個 commit、也不是同一台機器建的，所以大部分 HTML 的雜湊不同。這一次因此把 GitHub Pages 拖慢約五分鐘（push 到上線 807 秒）。預覽站與正式站的 `stats.json`、sitemap 清單相同。
- 還沒做：看第二次以後的部署，確認 Cloudflare 那一步回到幾十秒；第 1 階段的大量抽樣比對與對預覽網址跑樣式比對工具。
