# Language Status — taiwan.md 多語言支援狀態

> **For contributors who want to translate articles or add a new language.**
> SSOT for this list: [`src/config/languages.ts`](../../src/config/languages.ts)

---

## TL;DR

| 語言        | Code    | 狀態              | 路由         | 翻譯者                         | 文章數 |
| ----------- | ------- | ----------------- | ------------ | ------------------------------ | ------ |
| 🇹🇼 繁體中文 | `zh-TW` | ✅ Default (SSOT) | /            | — (canonical)                  | 472    |
| 🇺🇸 English  | `en`    | ✅ Active         | /en/         | community                      | 395    |
| 🇯🇵 日本語   | `ja`    | ✅ Active         | /ja/         | Link1515 + community           | 256    |
| 🇰🇷 한국어   | `ko`    | ✅ Active         | /ko/         | ceruleanstring + community     | 321    |
| 🇪🇸 Español  | `es`    | ⏸️ **Preview**    | ❌ no routes | —                              | 36     |
| 🇫🇷 Français | `fr`    | ⏸️ **Preview**    | ❌ no routes | ceruleanstring (pending merge) | 0      |

---

## ✅ Active languages

These languages are fully wired into:

- Astro routing (`/{code}/...` URLs)
- Sitemap (`hreflang` tags)
- Language switcher
- Search index
- Dashboard translation coverage
- llms.txt for AI crawlers

**To translate an article into an active language**: see [`docs/editorial/TRANSLATION-SYNC.md`](../editorial/TRANSLATION-SYNC.md). Required frontmatter:

```yaml
---
title: '한국어 제목'
description: '...'
date: 2026-04-14
tags: [...]
category: 'Music'
translatedFrom: 'Music/原中文檔名.md' # ← 必填，防止孤兒
---
```

The `translatedFrom` field is the **most important** addition — it lets the system detect orphan translations even if `_translations.json` is incomplete.

---

## ⏸️ Preview languages

Files in these directories are accepted in PRs **but the language has no routes yet** — articles exist as data only.

### 為什麼是 preview 而非 active

加一個語言到 active 需要：

1. ✅ Article 翻譯（contributor 可以做）
2. ⏳ UI 字串翻譯（≥150 條 i18n keys，maintainer 工作）
3. ⏳ 在 [`src/config/languages.ts`](../../src/config/languages.ts) 把 `enabled: false` 改成 `true`
4. ⏳ Build verification（hreflang/sitemap/語言切換器測試）

Steps 2-4 是 maintainer 的責任。Contributor 可以先送 step 1 的翻譯 PR，會被 merged 但暫時不上線。當 UI 翻譯完成後，**所有累積的 preview 翻譯一夜之間上線**。

### 目前狀態

**🇫🇷 Français**

- 18 個 PR by ceruleanstring（待合併為 preview，覆蓋 Food/History/Society/Technology/Culture）
- UI 字串：未開始
- 預計啟用：當有人提供法文 UI 字串翻譯時

**🇪🇸 Español**

- 36 篇歷史文章（早期半孤兒）
- UI 字串：未開始
- 預計啟用：跟法文同進度

---

## 🌱 我想加一個全新語言（vi / id / de / pt ...）

**簡單步驟（從加 fr 學到的）：**

1. 在 [`src/config/languages.ts`](../../src/config/languages.ts) 加一個 entry：

   ```typescript
   {
     code: 'vi',
     displayName: 'Tiếng Việt',
     hreflang: 'vi',
     enabled: false, // start as preview
     notes: 'New language pending UI translation',
   }
   ```

2. 同步編輯 [`src/config/languages.mjs`](../../src/config/languages.mjs)（兩份檔案 sync check 會檢查）

3. 開始送 article 翻譯 PR — 都會進 `knowledge/vi/` 但沒有路由

4. 當有人翻完 UI 字串（複製 `src/i18n/*.ts` 各檔案的 ko block 改成 vi）：
   - 把 `enabled: false` 改成 `true`
   - 跑 `npx astro build` 確認 1900+ 頁面通過
   - 推送 → /vi/ 路由自動產生

**過去這需要修 15 個檔案**。LANGUAGES_REGISTRY 重構（2026-04-14）後縮減為 2 處。

---

## 🛡️ Orphan prevention

每個翻譯文件**必須**在 frontmatter 標 `translatedFrom`：

```yaml
translatedFrom: 'Music/五月天.md'
```

這個欄位是 SSOT。`knowledge/_translations.json` 是從 frontmatter 自動產生的快取，不是手動維護的真實來源。

**為什麼這比 `_translations.json` 集中映射更可靠：**

- 檔案層級的 self-documentation（不需要查中央表）
- 即使 `_translations.json` 漏了一條，文件本身仍然知道來源
- Pre-commit hook 可以 enforce
- 重命名/刪除原文時，可以立刻 detect 哪些翻譯變成孤兒

**Pre-commit hook**（2026-04-14 η 上線）會 reject 任何缺 `translatedFrom` 的新翻譯 PR。

---

_v1.0 | 2026-04-14 η session_
_Maintained alongside src/config/languages.ts — when adding a language, update both._
