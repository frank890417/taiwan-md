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

1. **Supply chain**：npm 依賴可能被植入惡意程式碼 → 定期 `npm audit`，Dependabot 啟用
2. **GitHub Actions**：CI/CD 流程可能被利用 → 限制 workflow 權限，只允許 maintainer merge
3. **內容注入**：PR 中可能包含 XSS payload → build 時 Astro 自動 escape，review 時人工檢查

### 第三方依賴

我們使用 GitHub Dependabot 自動監控依賴漏洞。所有高風險（High/Critical）漏洞會在 7 天內處理。

## 致謝

感謝所有負責任地回報安全問題的研究者。

---

*最後更新：2026-03-19*
