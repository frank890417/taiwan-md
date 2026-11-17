# Taiwan.md 隱私權政策（草稿，待哲宇確認後上線為 https://taiwan.md/privacy/）

> 草稿依據：網站 `src/layouts/Layout.astro`（GA4 G-JGC5W00N7T）、`src/scripts/feedback/backend.ts`（讀者回饋走 Supabase）、Cloudflare 在網站前面當 CDN；App 端見 `apps/ios/App/Resources/PrivacyInfo.xcprivacy` 與 `PackUpdater.swift`。

---

## 繁體中文

最後更新：2026 年 11 月

Taiwan.md 是一個開源、非營利的台灣知識庫，包含網站 taiwan.md 與 iOS App「Taiwan.md」。這份說明交代我們會接觸到哪些資料、用來做什麼。

### iOS App

**App 不收集任何資料。** 沒有帳號，沒有廣告，沒有分析或追蹤工具。

- 收藏、閱讀進度、最近讀過與設定，只存在你的裝置上，不會上傳。
- App 只連到兩個地方：GitHub（下載內容更新）與 taiwan.md（顯示文章圖片）。這些請求不帶任何識別碼。GitHub 與我們的網站主機會像處理任何網頁請求一樣看到連線的 IP 位址，我們不保存也不使用這些紀錄來辨識個人。
- 文章裡的外部連結會用 Safari 開啟，之後適用該網站自己的隱私權政策。
- 刪除 App 就會刪除所有存在裝置上的資料。

### 網站 taiwan.md

- **流量統計**：網站使用 Google Analytics 4，了解有多少人來訪、讀了哪些文章、從哪裡來。Google 會依其政策處理這些資料。你可以用瀏覽器的追蹤保護或外掛關閉它。
- **主機與傳遞**：網站放在 GitHub Pages，前面經過 Cloudflare。兩者為了傳遞網頁與防範濫用，會處理連線的 IP 位址等技術資料；我們只看彙總統計。
- **讀者回饋**：你選擇在文章頁送出勘誤或建議時，回饋內容、你選用的登入方式（例如 email）與暱稱會存在 Supabase，用來回覆與修正文章。你可以來信要求刪除。
- 網站不販售、不出租任何資料，也不放廣告。

### 聯絡我們

taiwanmd@monoame.com，或在 https://github.com/frank890417/taiwan-md/issues 開 issue。

---

## English

Last updated: November 2026

Taiwan.md is an open-source, non-profit knowledge base about Taiwan, consisting of the website taiwan.md and the iOS app "Taiwan.md". This page explains what data we come into contact with and why.

### iOS app

**The app collects no data.** There are no accounts, no ads, and no analytics or tracking tools.

- Bookmarks, reading progress, history and settings are stored only on your device and are never uploaded.
- The app connects to only two places: GitHub (to download content updates) and taiwan.md (to show article images). These requests carry no identifiers. Like any web request, GitHub and our website host see the connecting IP address; we do not keep or use those logs to identify anyone.
- External links in articles open in Safari, where that site's own privacy policy applies.
- Deleting the app deletes all data stored on your device.

### Website taiwan.md

- **Analytics**: the website uses Google Analytics 4 to understand how many people visit, which articles they read and where they come from. Google processes this data under its own policies. You can block it with your browser's tracking protection or an extension.
- **Hosting and delivery**: the site is hosted on GitHub Pages behind Cloudflare. Both process technical data such as IP addresses to deliver pages and prevent abuse; we only look at aggregate statistics.
- **Reader feedback**: if you choose to submit a correction or suggestion on an article, your feedback, the sign-in method you chose (such as email) and your nickname are stored in Supabase so we can reply and fix the article. You can ask us to delete them.
- We never sell or rent any data, and the site shows no ads.

### Contact

taiwanmd@monoame.com, or open an issue at https://github.com/frank890417/taiwan-md/issues.
