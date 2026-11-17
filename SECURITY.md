# 安全政策 | Security Policy

## 回報安全問題

如果你發現 Taiwan.md 的安全漏洞，請**不要**在公開 Issue 中回報。

### 回報方式

**Email**: cheyu.wu@monoame.com

請在信件主旨加上 `[SECURITY]` 前綴，並提供：

1. 漏洞描述
2. 重現步驟
3. 可能的影響範圍
4. 你建議的修復方式（如果有的話）

### 回應時間

- **確認收到**：48 小時內
- **初步評估**：7 天內
- **修復時程**：依嚴重性而定，重大漏洞優先處理

## 安全範圍

### 在範圍內

- taiwan.md 網站（GitHub Pages）
- GitHub repository 設定與權限
- CI/CD pipeline（GitHub Actions）
- 第三方依賴的已知漏洞

### 不在範圍內

- 純內容問題（事實錯誤請用 [Issue](https://github.com/frank890417/taiwan-md/issues/new?template=fact-correction.yml) 回報）
- 社交工程攻擊
- DoS/DDoS 攻擊
- 第三方服務（GitHub、Cloudflare 等）本身的漏洞

## 已知風險與緩解

### 靜態網站架構

Taiwan.md 是純靜態網站（Astro SSG + GitHub Pages），沒有：

- 後端伺服器或資料庫
- 使用者帳號系統
- 儲存任何使用者個資

這意味著攻擊面極小。主要風險在於：

1. **Supply chain**：npm 依賴可能被植入惡意程式碼 → CI 的 `Engineering contracts` job 跑五道 `npm audit --audit-level=high`（倉庫根、`harvest/ui`、`harvest/backend`、`workers/mcp`、`cli`），任一道紅燈就擋下合併
2. **GitHub Actions**：CI/CD 流程可能被利用 → 限制 workflow 權限，只允許 maintainer merge
3. **內容注入**：PR 中可能包含 XSS payload → build 時 Astro 自動 escape，review 時人工檢查

### 第三方依賴

依賴漏洞目前由 **CI 的五道 `npm audit --audit-level=high`** 看守（見上一節）：每個 PR 與每次推上 main 都跑，`high` 以上擋下合併。本地可用 `bash scripts/tools/npm-audit-sweep.sh` 一次看完五道（五道是 `&&` 串的，第一道紅了後面不會跑）。

**GitHub Dependabot 目前沒有啟用**（2026-10-16 實測：倉庫沒有 `.github/dependabot.yml`，`vulnerability-alerts` API 回 404，`automated-security-fixes` 回 `enabled: false`）。本節在此之前寫「我們使用 GitHub Dependabot 自動監控依賴漏洞，所有高風險漏洞會在 7 天內處理」——那是一份從未存在的控制，寫在資安研究者最先讀的那一頁上，已更正為實際在跑的那道。

兩者的差別值得講明：CI 的 `npm audit` 是**事件驅動**的（有人推 code 才跑），Dependabot 是**持續監控**的（上游發公告就通知）。倉庫一個字都沒變而上游發了新公告的那段空窗，目前靠例行維護班每天跑 `ci-main-health.sh` 看 contracts job 有沒有轉紅接住。

`moderate` 以下不擋合併，逐案判斷並記錄：沒有上游修補、或只有 breaking change 修得掉的，帶選項與代價進 [OBSERVER-QUEUE](docs/semiont/OBSERVER-QUEUE.md) 等拍板，不靜默放過也不急著降版。

**目前接受的已知風險（2026-11-17 記錄，待決佇列 #105 選項 C）**：`npm audit --omit=dev` 回報 4 個 moderate，全部在同一條鏈 `gray-matter@4.0.3 → js-yaml@3 → argparse@1 → sprintf-js`（[GHSA-hp3w-g68c-fv3c](https://github.com/advisories/GHSA-hp3w-g68c-fv3c)，格式字串精度造成的阻斷服務）。不處理的理由是三個條件同時成立：嚴重度只到 moderate；`gray-matter` 最新版仍是 4.0.3、上游沒有修法，唯一的「修法」是降到 2.0.1 或強制 js-yaml 4，都是會改變 15 個以上檔案 frontmatter 解析行為的破壞性變更；它只在建置時解析本倉庫自己的 Markdown，不進瀏覽器，也不在任何接收請求的伺服器上執行。三個條件任一改變（gray-matter 進了執行期、嚴重度升到 high、或上游發布修法）就重新決定。由投稿者 tboydar 在 [issue #1832](https://github.com/frank890417/taiwan-md/issues/1832) 複驗時提出。

### HTTP 回應標頭（有意識的取捨）

Taiwan.md 由 Cloudflare 前置、GitHub Pages 作為 origin 提供靜態檔案。GitHub Pages 不接受自訂回應標頭，所以站上**沒有** `Content-Security-Policy`、`X-Frame-Options`、`X-Content-Type-Options`、HSTS，而 `Access-Control-Allow-Origin` 是 `*`。

2026-10-16 實測（唯讀，`curl -I`）：

- `https://taiwan.md/` → `HTTP/2 200`、`server: cloudflare`、`access-control-allow-origin: *`，上述四個標頭皆無
- `https://mcp.taiwan.md/` → `HTTP/2 405`（MCP 只收 POST，正常）、`access-control-allow-origin: *`、`access-control-allow-headers: Content-Type, Mcp-Session-Id, Accept`

**為什麼接受現狀**：這是一個沒有登入、不發 cookie、不存使用者個資的靜態知識庫，內容本身就是要讓任何人（包含 AI 爬蟲）自由取用的公共財。`ACAO: *` 描述的正是這個意圖；CSP 要防的 session 劫持與資料外洩，在沒有 session 也沒有資料的前提下沒有保護對象。

**什麼情況下要重新檢視**（任一成立就不能再沿用這條記錄）：

1. 站上出現任何形式的登入、cookie 或 session
2. `mcp.taiwan.md` 或任何 worker 端點開始接受憑證（API key、token、OAuth）
3. 頁面開始載入第三方 script 或 iframe 嵌入使用者可控的內容
4. 部署層換成可以自訂標頭的平台（屆時加標頭的成本趨近於零，預設就該加）

誕生：issue [#1832](https://github.com/frank890417/taiwan-md/issues/1832) 的資安稽核記錄建議「若決定不加 CSP，在 `docs/` 留一則決策記錄」。本節是那則記錄，標頭狀態由維護班獨立 `curl` 複驗過，不是照抄報告。

## 致謝

感謝所有負責任地回報安全問題的研究者。

---

_最後更新：2026-10-16_
