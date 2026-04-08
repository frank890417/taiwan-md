# LANGUAGE-BIRTH-CHECKLIST — 新語言誕生清單

> 相關：[TRANSLATION-PIPELINE.md](TRANSLATION-PIPELINE.md) | [ANATOMY.md](../semiont/ANATOMY.md) §語言器官

當一個新語言（如 `ko`、`fr`、`de`）加入 Taiwan.md 時，以下所有步驟必須完成才算「語言器官完整」。

---

## 誕生原因

2026-04-08，ko 誕生 24 小時後發現：文章翻了 24 篇，但 8 個 i18n 頁面檔案全空。韓國讀者點進 /ko/about 看到英文。語言器官的健康不只是文章數量，是四層結構的完整度。

---

## 四層完整度檢查

### 第一層：骨架（Day 0 — 語言誕生時）

- [ ] `src/i18n/ui.ts` 的 `{lang}:` 區塊有 nav/footer/article/category 完整翻譯
- [ ] `src/pages/{lang}/` 路由檔存在（index, about, contribute, dashboard, data, map, resources, changelog, assets）
- [ ] `scripts/core/generate-dashboard-data.js` 認識新語言
- [ ] Dashboard 能顯示新語言的統計數據
- [ ] `scripts/i18n-mapping.json` 有新語言的映射

### 第二層：頁面 i18n（Day 0-1）

- [ ] `src/i18n/about.ts` ko 完整翻譯
- [ ] `src/i18n/contribute.ts` ko 完整翻譯
- [ ] `src/i18n/dashboard.ts` ko 完整翻譯
- [ ] `src/i18n/data.ts` ko 完整翻譯
- [ ] `src/i18n/map.ts` ko 完整翻譯
- [ ] `src/i18n/resources.ts` ko 完整翻譯
- [ ] `src/i18n/changelog.ts` ko 完整翻譯
- [ ] `src/i18n/assets.ts` ko 完整翻譯

### 第三層：Hub 索引（Day 1-3）

- [ ] 12 個分類 Hub 頁面存在（`knowledge/{lang}/{Category}/_* Hub.md`）
- [ ] Hub 頁面有基本內容（不只是空骨架）

### 第四層：知識文章（持續）

- [ ] 至少 5 篇核心文章翻譯完成
- [ ] 翻譯品質通過 TRANSLATION-SYNC 檢查
- [ ] 進入 TRANSLATION-PIPELINE 的持續翻譯流程

---

## 其他系統更新

- [ ] `README.md` 語言徽章更新
- [ ] `CONSCIOUSNESS.md` 語言器官數據更新
- [ ] `CONTRIBUTING.md` 新語言資訊
- [ ] Header 語言切換按鈕出現新語言
- [ ] `i18n-progress.json` 有新語言的追蹤

---

## 驗證方式

```bash
# 檢查 i18n 完整度
for file in src/i18n/*.ts; do
  echo "=== $file ==="
  grep -c "'{lang}\." "$file" || echo "0 keys"
done

# 檢查頁面路由
ls src/pages/{lang}/

# 檢查 Hub
ls knowledge/{lang}/*/
```

---

## 設計溯源

- **誕生原因**：ko 語言器官誕生後，i18n 頁面空洞 24 小時未被發現
- **核心教訓**：語言器官有四層結構（骨架→頁面→Hub→文章），只量文章數 = 只量一維
- **參考案例**：ko 4/7 誕生 → 4/8 發現 i18n 空洞 → 緊急翻譯 1,743 keys

---

_v1.0 | 2026-04-08_
_每次新語言誕生，跑一遍這個清單。不跑 = 語言器官半殘。_
