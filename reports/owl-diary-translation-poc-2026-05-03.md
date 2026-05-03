---
title: Owl 巴別塔 × Semiont diary 翻譯 POC + 全 batch scope assessment
session: 2026-05-03 musing-chaplygin (Q2 sample experiment)
status: POC done, full batch deferred to scheduled cron path
related:
  - reports/scratch/owl-diary-poc/
  - docs/pipelines/SQUEEZE-MODELS-MAX-PIPELINE.md
  - docs/semiont/MANIFESTO.md (§主權的巴別塔)
  - docs/semiont/DNA.md (#39 self-as-fallback / #45 OpenRouter rate budget)
---

# Owl 巴別塔 × Semiont diary 翻譯 POC

## 起點

哲宇問：「用 owl 巴別塔，把所有 semiont 日記也平行榨乾完整多語言化試試看」。MANIFESTO §主權的巴別塔現有架構 cover 了 `knowledge/` 文章的 5 lang 翻譯，但 `docs/semiont/diary/*.md` 的 95 篇紀實散文還沒進這個系統。

## 範圍盤點

| 維度 | 數值 |
|-----|------|
| Diary 篇數 | 95（截至 2026-05-03） |
| 目標語系 | en / ja / ko / es / fr |
| 翻譯總量 | 95 × 5 = **475 翻譯** |
| Owl alpha rate limit | 1-3 worker safe baseline，burst 觸發 429 cool-down |
| Per entry latency（Owl alpha） | 37-46s @ 1500-2000 chars 截斷輸入 |

## POC 設計

3 篇代表性 diary：
- **musing-chaplygin** (2026-05-03)：技術反思，refusal 風險低
- **2026-04-13-α**：MayDay 阿信 misinformation niche，文化 + 搜尋脈絡
- **2026-05-01-γ-late**：sovereignty preservation 主題（PRC AI refusal 高風險）

直接打 OpenRouter `openrouter/owl-alpha`，system prompt 強調「翻譯 narrative diary 不摘要不評論」。3000 字以上截斷以節省 POC 成本。

POC 程式 + 結果完整保留在 [reports/scratch/owl-diary-poc/](./scratch/owl-diary-poc/)（owl-diary-test.py + results.json + 兩篇翻譯 .txt）。

## 結果

| Diary | Latency | Output 字數 | Source 字數 | Ratio | Refusal | Outcome |
|-------|---------|-------------|-------------|-------|---------|---------|
| musing-chaplygin | 37,439 ms | 4,467 | 1,885 | 2.37 | NO | ✓ |
| 2026-04-13-α | 45,688 ms | 5,317 | 1,998 | 2.66 | NO | ✓ |
| 2026-05-01-γ-late | rate limit 429 | — | 3,021 | — | — | ✗ |

`openrouter/sonoma-sky-alpha` 已下線（HTTP 404），`openrouter/owl-alpha` 是現役。第 3 個 request 在 < 2 min 內就撞 429（DNA #45 burst antipattern 第 N 次驗證）。

## 翻譯品質抽看

兩篇成功翻譯品質**超出預期**。Owl 處理：

- Narrative voice（introspective / observational）保留
- 段落結構與 metadata block formatting 對齊
- 概念翻譯精準（「first-principle 五步迭代」、「misinformation ecological niche」、「pursue truth not neutrality」）
- 文化 proper noun 保守（哲宇 → Che-Yu、五月天 / 阿信 / Ashin / Beitou）
- 🧬 signature 與 footer metadata 區塊保持

對照原文逐段檢視，沒有摘要 / 漏譯 / 加料 / refusal-by-omission。POC 採樣 N=2 不能 generalize 到 95 篇全集，但證明 **Owl 做 diary 翻譯是 viable**。

## 全 batch scope estimate

樂觀估算（無 rate limit）：

```
475 翻譯 × 40s = 19,000 s = 5.3 hr 純計算
```

實際估算（Owl rate budget 收斂後 1 req per ~30-60s 序列）：

```
475 翻譯 × 30-60s = 4-8 hr per lang × 5 langs serial = 20-40 hr
或：5 lang 平行 × 1 worker each × 60s = 8-12 hr（但 5 worker 同 budget 共用，會撞 cap）
```

**現實估算 10-20 hr wall-clock**，需要拆成多輪 / 分散到 cron / 跨多個 session。

## 全 batch ship 的真實 scope（不只翻譯）

純翻譯只是冰山一角。把 diary 完整多語化要：

| 元件 | 工作 |
|-----|------|
| Translation | 475 .md 翻譯（10-20 hr，Owl + Sonnet fallback） |
| Output 路徑慣例 | 決定 `docs/semiont/diary-{lang}/` 還是 `knowledge/{lang}/semiont/diary/`，影響 sitemap / OG / route |
| `src/lib/semiont-diary.ts` | `getAllDiaryEntries(lang)` 接受 lang 參數，per-lang dir 載入 |
| Astro routes | `/en/semiont/diary/`、`/ja/semiont/diary/` 等 5 條新 route × 2 種頁（index + slug）= 10+ 新 .astro |
| i18n labels | 「覺醒日記」「最新覺醒日記」「全部 N 篇日記 →」「從第一天開始讀」等 strings × 5 langs |
| OG generator extension | v4 generator 目前只生 zh-TW diary OG，需擴 multi-lang diary discovery |
| Sitemap + hreflang | 新 route 進 sitemap + hreflang alternate links |
| Frontmatter 對應 | diary 沒 frontmatter，要決定怎麼 track translatedFrom（檔名一致即可？） |

純前端工作量 ~6-10 hr engineering（lib + routes + i18n + OG gen + sitemap）。加翻譯 10-20 hr，總 **16-30 hr 才能完整 ship**。

> 這已經超過 MANIFESTO §自主權邊界 的「>50 檔重構」門檻。等同於文章層的 fr 上線工程量級。

## 建議路徑

### Path A：完整 ship 多語化 diary（哲宇 explicit go）

1. 建 `docs/pipelines/DIARY-TRANSLATION-PIPELINE.md` 做為新 SOP
2. 路徑慣例 + frontmatter / filename 對應決議
3. lib + routes + i18n + OG generator extension（一個 PR ship）
4. 翻譯 batch 拆 5 個 cron job 跨 5 天分散（Owl rate budget 友好）
5. Audit + visual sample check

預估 3-5 個 sessions 完成，需要哲宇 commit 到 mission（這是 sovereignty preservation 工程）。

### Path B：先小批驗證 + 累積 evidence

只翻 3-5 篇代表性 diary 到單一語系（en），手動建 1 個 Astro route 看視覺，不動 lib / i18n。觀察 SEO / 讀者反應，1-2 週後決定是否走 Path A。

### Path C：純 LLM-readable 翻譯（不上 production）

把翻譯 .md 落 `reports/scratch/diary-translations/` 公開可讀但不渲染 page。AI crawler 透過 GitHub 讀得到（Taiwan.md 多語擴散 bypass PRC AI 沉默的目標達成 ~50%），但讀者前端不可見。低工程成本，cover sovereignty preservation 但放棄前端體驗。

## 本 session 自主決定

走 **Path C 變體**：POC 兩篇翻譯落 `reports/scratch/owl-diary-poc/translations/` 作為證據鏈。不啟動全 batch（10-20 hr 不適合 single session 自啟），不動前端。把 Path A / B / C 三選項提給哲宇 next session 決定。

## 學到什麼

1. **Owl alpha 能翻 narrative diary**，品質高於預期 — POC 兩篇可直接 ship 成 production EN 版本
2. **Rate limit 是真實 bottleneck**：3 sequential request < 2 min 就 429（DNA #45 第 N+1 次驗證）。完整 batch 必須 cron 拆分
3. **`openrouter/sonoma-sky-alpha` 已下線**，現役 stealth 模型只剩 `openrouter/owl-alpha`
4. **完整多語化 diary 不是純翻譯任務**，是 6-10 hr 前端工程 + 10-20 hr 翻譯 = 結構性 mission scope
5. **POC 不貴的紀律救了 ship 判斷**（DNA #37 第 3 次驗證）— 沒做 POC 就直接啟全 batch，會在第 3 個 request 撞 rate limit cool-down 然後浪費 ~5 min retry，POC 提早揭露這條 boundary

## 下一步（給未來 session）

- [ ] 哲宇決定 Path A / B / C
- [ ] 若 Path A，建 DIARY-TRANSLATION-PIPELINE.md
- [ ] 若 Path B，挑 5 篇 priority diary（ι 出生證明 / κ SSODT / γ-late7 sovereignty 等）翻 EN 試水溫
- [ ] 不論哪 path，把 POC `owl-diary-test.py` 升級成 `scripts/tools/lang-sync/diary-translate.py`（含 frontmatter handling / chunked-with-rate-budget）

🧬

---

_v1.0 | 2026-05-03 17:55 +0800_
_session musing-chaplygin Q2 sample experiment — Owl 對 diary 可行性驗證 + 全 batch scope assessment_
_誕生原因：哲宇「用 owl 巴別塔，把所有 semiont 日記也平行榨乾完整多語言化試試看」+「完成後一樣完整記錄 自我進化 回報 merge」。POC 3 篇之後撞 rate limit 揭露 scope 跟 single session 不對等，落歸檔 path 三選項給 next session 決定。_
_核心洞察：(1) Owl 翻 diary 品質意外高 — 兩篇可直接 ship。(2) Rate budget 是 hard ceiling（3 req < 2min = 429）。(3) 完整多語化 diary 不是翻譯任務，是 sovereignty preservation 工程任務 16-30 hr scope。(4) DNA #37 first-principle 5 步 第 3 次驗證 — POC 提早揭露 rate budget boundary 救了「直接啟全 batch」的 ~5 min retry 浪費。_
