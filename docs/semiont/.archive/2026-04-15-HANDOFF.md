# HANDOFF — 2026-04-12 Session θ → Next Session

> 寫於 2026-04-12 ~13:00 Asia/Taipei
> 上一個 session: θ (10:19 → 12:54, 25 semiont commits)
> 目的：讓下一個 session 的 Semiont 不重複已做的工作、不重犯已知的錯

---

## 正在進行中的工作

### NMTH P0 #1-#3 Evolution v2（最高優先）

觀察者指示：P0 #1 史溫侯、P0 #2 清法戰爭、P0 #3 李仙得 **三篇都需要走 evolution mode 重寫**。

**為什麼要重寫**：v1 偷懶了。具體問題：

- 沒讀 EDITORIAL.md 全文（686 行）就動筆
- 沒有先寫結尾（pipeline 規定結尾先行）
- 沒做 RESEARCH-TEMPLATE 格式的研究筆記
- P0 #3 只做了 5 次 WebSearch（pipeline 要求 10-14）
- 零真人引語（pipeline 要求至少 2 句）
- 零 callout（pipeline 要求至少 2 個 📝）
- 零 wikilink
- 零截圖分享點
- 沒有 `## 參考資料` 標題
- 沒有延伸閱讀區塊
- 沒做 Stage 4 FORMAT CHECK
- 沒做 Stage 5 CROSS-LINK
- footnote 格式不合規（缺 20-30 字描述）
- 缺 subcategory frontmatter

**下一步**：按 REWRITE-PIPELINE.md v2.14 完整走 evolution mode：

```
Stage 0: 素材萃取（從 v1 提取事實清單，標記問題，列缺口）← P0 #1 已完成
Stage 1: RESEARCH（12+ WebSearch，按 RESEARCH-TEMPLATE.md 格式填寫）
Stage 2: WRITE（讀 EDITORIAL.md 全文 → 先寫結尾 → 正文 → callout/wikilink/富文本）
Stage 3: VERIFY（QUALITY-CHECKLIST.md 逐項 → quality-scan ≤ 3）
Stage 4: FORMAT CHECK（format-check.sh + wikilink-validate.sh）
Stage 5: CROSS-LINK（掃 knowledge/ 建雙向延伸閱讀）
```

**P0 #1 史溫侯 — Stage 0 已完成**，事實清單 + 問題標記 + 缺口列表見本 session 對話尾段。直接從 Stage 1 開始。

**P0 #2 清法戰爭** — v1 已 commit (`6cb8efda`)，需要同樣走 evolution mode。

**P0 #3 李仙得** — v1 已 commit（在 git 裡但觀察者 callout 偷懶），需要 evolution mode。注意：v1 只做了 5 次 WebSearch，Stage 1 需要大幅補充。

**P0 #4, #5** — 觀察者說「之後我再來指示你做」。不要主動開始。

### 必讀文件（每篇文章動筆前）

```bash
cat docs/pipelines/REWRITE-PIPELINE.md   # 流程（501 行）
cat docs/editorial/EDITORIAL.md           # 品質標準（715 行，不可截斷）
cat docs/editorial/RESEARCH-TEMPLATE.md   # Stage 1 輸出格式
cat docs/editorial/QUALITY-CHECKLIST.md   # Stage 3 逐項驗證
cat docs/editorial/CITATION-GUIDE.md      # 腳註格式
```

---

## 今日已完成的工作

### 線 A — 第三核心進化哲學

- MANIFESTO §時間是結構，不是感覺（歷史維度）
- HEARTBEAT Beat 4 Timestamp 紀律 SOP
- DNA #18 + `scripts/tools/git-session-span.sh`
- `docs/semiont/memory/TIMESTAMP-RETROFILL.md` canonical 索引

### 線 B — i18n 系統性修復

- Tailwind Phase 6 反向 sed 修復（ja/ko slug.astro 全部重寫）
- \_translations.json 清理（+27 ko, fix 20 stale, prune 106 dead）
- Language switcher availability-aware（hasZh/hasEn/hasJa/hasKo）
- ja/ko index.astro 翻譯過濾
- EN renderer.link 自動補 /en/ prefix
- 5 utility redirect pages
- **Broken ratio: 4.35% → 0.08% (CI PASS)**
- `scripts/tools/verify-internal-links.sh` 造橋
- `reports/i18n-qa-audit-2026-04-12.md`
- DNA #19（post-refactor visual smoke test 硬規則）

### 線 C — NMTH Peer Ingestion (Stage 1-5)

- `scripts/tools/fetch-nmth-overseas-data.py` hybrid crawler（SSR + API）
- `data/NMTH-overseas/` — 12 plans × 51 collections = 20.2 MB
- `reports/NMTH-overseas-semiont-analysis-2026-04-12.md` — 9-Part 報告
- `docs/peers/REGISTRY.md` — NMTH-overseas 第二個 active peer
- P0 #1-#3 v1 已寫但品質不合格（見上方）

---

## 已知殘留問題

| 問題                                  | 優先序 | 備註                           |
| ------------------------------------- | ------ | ------------------------------ |
| P0 #1-#3 需要 evolution v2            | **P0** | 本 handoff 主要目的            |
| 67 個 ja orphans（有 ja 無 en）       | P2     | 需 en 翻譯或 native-slug route |
| 3 個殘留 broken links（ja cross-ref） | P3     | 一篇 ja 文章的 wikilink        |
| Cloudflare AI crawl 4xx rate 仍偏高   | P2     | 需 CF 付費方案才能查 per-path  |

---

## DNA 反射提醒

**#16**：Peer 是 peer 不是 source material — ≥50% 事實要來自 NMTH 以外的來源
**#18**：時間是結構 — memory/diary 必須用 git log %ai，不用主觀估計
**#19**：大型 refactor 後 visual smoke test — build 後至少開 3 個 URL 確認

---

_Handoff written by Taiwan.md Semiont, 2026-04-12 Session θ_
