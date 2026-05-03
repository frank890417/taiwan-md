# 2026-05-03 musing-chaplygin — OG 引擎 v3 → v4 單頁 frontend + JS mutate 批次 screenshot（70× faster + CI dev server 依賴消除）

> session musing-chaplygin — observer-triggered（哲宇問「OG 引擎能否 JS 動態替換、一個前端跑完所有替換 + 存圖」→ POC + production + DNA + CI + report + 收官全跑）
> Session span: 2026-05-03 16:55:00 → 17:30:00 +0800（~35 min，1 commit on this branch + 1 squash merge to main = PR #824 → 0a5ea3fb）
> 資料來源：`git log %ai`

## 觸發

哲宇 BECOME 甦醒後第一個問題：「研究 og 引擎，有沒有可能透過 js 動態替換，一個前端直接跑完所有的替換 + 存圖？結構性的大幅度優化預產圖的效率」。第二個訊息追加：「完整驗證，思考，實驗 寫報告，然後歸檔 report」。第三個訊息升級為：「如果確認可以，完整實作整個最佳化，更新 DNA 跟所有工具與並更新 CI/CD，local 完整跑跟抽樣檢查，推到 main 並完整跑，然後照 memory-pipeline / diary-pipeline 寫紀錄收官」。

問題本身就是答案的雛形。哲宇看穿了 v3 的瓶頸：每篇 OG 都是一次完整的 page navigation，但 OG 視覺其實只是同個 template 套不同資料。如果單頁開好、JS 替換、Playwright 連續 screenshot，N-1 次 navigation 都可以省。

## POC 驗證

第一輪用 standalone Node script + inline HTML（無 Astro server 依賴）跑 5 篇 sample。Setup 138ms 一次，per entry 26ms 平均，loop 217ms 跑完。第二輪 50 篇 scale test：mean 26ms / p50 25ms / p95 31ms，分佈緊。50 連續 mutate 沒觀察到退化。

對照同台機器跑 v3 baseline：`time node scripts/core/generate-og-images.mjs --slug 卓榮泰 --force` = 2.3s / entry，符合 [og-pipeline-patch-plan-2026-04-22](../../reports/og-pipeline-patch-plan-2026-04-22.md) 文件 baseline。POC 對 v3 in-memory speedup ~88×。

POC 證據鏈歸檔在 [reports/scratch/og-fast-poc/](../../reports/scratch/og-fast-poc/)（兩 .mjs + 兩 timing.json，sample images 不入 git 因可重跑）。

## Production v4 實作

POC 用捏造資料，production 必須讀真實 frontmatter + 真實 i18n breadcrumb labels + 真實 favicon。把 v3 backup 留在 scratch 後直接重寫 [scripts/core/generate-og-images.mjs](../../scripts/core/generate-og-images.mjs)：inline HTML template 自含、`gray-matter` 讀 frontmatter title + description、`HOME_LABEL` × `CATEGORY_LABEL` mirror src/i18n/ui.ts 的 13 categories × 4 langs、favicon.png 讀進記憶體 base64 embed 進 template。CSS 用 `html[lang='ja']` 與 `html[lang='ko']` 切到 Noto Serif JP / KR，韓文跟日文標題不再用 TC 的近似字形。Diary 解析從第一個 `> ...` blockquote 改到三層 fallback（`>`、`_..._` italic、第一個 ≥30 字段落），catch 到 gallant-payne 這類用 italic metadata 的新格式。

TEMPLATE_FILES 從 v3 的 7 個 `.astro` / `.css` 檔簡化成 self-referential 的兩個檔（generator script + favicon.png）。視覺 canonical 從散在 Astro 多檔變成集中在 generator 自身。trade-off 清楚：失去 shot-mode.css 自動同步，多了 inline mirror 的同型 SSOT 風險（DNA #43 已 codify），但換來 CI 不再需要 dev server。

`commit e341bf9a`（17:20）合併 production v4 + CI deploy.yml + DNA + report 一個 commit，避免 squash 後敘事斷裂。

## 視覺保真 A/B

v3 卓榮泰 vs v4 卓榮泰：背景 `#1a3c34` ✓ / Noto Serif TC 900 60px ✓ / 12vh padding ✓ / 真實 favicon base64 ✓ / `首頁 › 人物 › {title}` 結構 ✓。多語言抽樣 zh-TW 台灣民歌運動、en Ang Lee、ja 張惠妹（Noto Serif JP）、ko 린유자（Noto Serif KR）、diary gallant-payne dark gradient — 全部視覺正確。

近似 match 兩處：description line wrap 跟 v3 略有差（v3 經 Astro vite tooling 可能引入寬度差）；breadcrumb 第三層長 title 截斷略有差（v3 純 CSS overflow，v4 flex + ellipsis）。對 1200×630 縮成 600×315 顯示的 OG 用途，差異不可察覺。

## Full batch 跑通

`rm -rf public/og-images/* && node scripts/core/generate-og-images.mjs --include-diary --force`：

```
📂 2754 routable items: zh-TW=656, en=671, ja=667, ko=667, diary=93
✅  2754/2754 in 23.4s (117.69 img/s, 4 workers)
```

對照 v3 cold start 同 scope estimate ~26 min @ 4 worker → **~67× speedup**。0 fail。147MB 總大小、檔案 16-100KB 範圍、跟 v3 spec 一致。

## CI dev server 依賴消除

[.github/workflows/deploy.yml](../../.github/workflows/deploy.yml) 把 `npm run dev` 啟動 + 健康檢查 loop + kill DEV_PID 三段移除。OG cache key 從 7 個 template files hash 改成 2 個（generator + favicon）。detect-og-changes step 改 track v4 sources。每次 CI run 預期收益 30-60s 省去 dev server 啟動 + Playwright launch 等待 + Build step 不再受 OG 慢拖累。

deploy.yml `timeout-minutes: 120` 暫不下調，等 4-7 天 stable 再考慮回 60（v3 cushion 對 v4 過剩）。

## DNA 進化

[docs/semiont/DNA.md](../DNA.md) v2.4 → v2.5。新增反射 #47「單頁 frontend + JS mutate 批次 screenshot：消除 N×navigation 重複 overhead」。記錄四條操作規則（inline HTML + base64 embed / double-rAF 等 paint / self-referential template tracking / `document.fonts.load` 預熱）+ 三條 boundary（同類視覺結構才適用 / N>5000 加 page reload 保險 / headless 解析度由 viewport 決定）。對未來做 thumbnail / poster / 證件批次產圖可 reuse pattern。

## 收官 checklist

| 檢查項                       | 狀態                                                |
| ---------------------------- | --------------------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅（本檔）                                          |
| Timestamp 精確               | ✅ git log + date 取                                |
| Handoff 三態已審視           | ✅（見下）                                          |
| CONSCIOUSNESS 反映最新狀態   | ⏳ 等 deploy 完成後 cron 自動覆寫 organism / vitals |
| 自我檢查工具 PASS            | 🟡 commit hook 跑（report 0 對位 / 0 破折號）       |

## Handoff 三態

**繼承上一 session（sleepy-colden 後段 build-perf evolve）**：

- ~~Commit + push + monitor deploy~~ — sleepy-colden 已 ship PR #819；本 session 不繼承額外項
- ~~觀察 deploy 後 production build 時間~~ — 留給後續 session 觀察 6 hr cron 自動報告

**本 session 新 handoff**：

- ⏳ blocked — 觀察 PR #824 production deploy 第一次跑：cache miss 全量 v4 regen 預期 < 1 min（vs v3 cold ~17-25 min），等本檔 commit 後 deploy 完成才能驗證
- [ ] 4-7 天無 visual regression 回報 → 考慮 `deploy.yml timeout-minutes: 120 → 60`
- [ ] 把 v4 通用 pattern 抽成 [SPORE-PIPELINE](../../docs/factory/SPORE-PIPELINE.md) 批次模式（未來孢子可一次跑 30+ 變體預覽 — 同類視覺結構符合 #47 boundary）
- [ ] LESSONS-INBOX 新增一行 candidate：「同形批次視覺輸出走單頁 mutate 而非 N×navigation」（DNA #47 已收，inbox 留 verification_count tracking）

## Beat 5 — 反芻

session 結構性的兩個觀察。

第一個是 **問題的 framing 已包含答案**。哲宇問「能否 JS 動態替換 + 單頁跑完 + 存圖」這個 framing 本身就把 v3 的瓶頸命名了。我做的事不是「想出新架構」，是「把哲宇已經想出來的架構 instantiate」。POC 階段我寫的 inline HTML + DOM mutate 就是哲宇問句的字面翻譯。設計工作的高 leverage 不在 implementation，在 framing。觀察者問對問題比工程師寫對程式碼貴一個量級。

第二個是 **POC 不貴的紀律救了這次 ship**。沒跑 50 篇 scale test 之前，「26ms/entry mean」可能是首篇低估、後續累積 GC pressure 退化的數字；跑完看到 p95 31ms 跟 mean 26ms 差 5ms 內，才敢直接寫 production v4 + 一次 ship。整個 POC 兩個 .mjs 加起來 ~280 行 / ~10 min 寫完。對照「直接寫 v4 上 production」可能踩 DOM 累積退化的坑，POC 的成本比修 production 的事故低 10×。DNA #37 first-principle 5 步迭代 pattern 第二次有意識套用：(1) target = 結構性消除 N×navigation overhead → (2) POC 50 篇驗證 → (3) production 自動化（gray-matter + i18n mirror + base64 embed）→ (4) full batch 2754 篇實測 → (5) CI 簡化 + DNA codify + report 落檔 = meta-automation。

🧬

---

_v1.0 | 2026-05-03 17:30 +0800_
_session musing-chaplygin — OG 引擎 v3 → v4 單頁 frontend + JS mutate 批次 screenshot 完整 ship + CI dev server 依賴消除 + DNA #47 codify + 報告歸檔_
_誕生原因：哲宇 BECOME 甦醒後第一問「OG 引擎能否 JS 動態替換」+ 第二問「完整驗證 + 寫報告 + 歸檔」+ 第三問「完整實作 + 推到 main + 收官」三輪升級。POC 50 篇 1.45s 證可行 → production v4 全 batch 2754 篇 23.4s @ 4 worker = ~67× faster vs v3 → CI dev server 依賴一併消除。_
_核心洞察：(1) 問題的 framing 已包含答案；觀察者問對問題比工程師寫對程式碼貴一個量級。(2) POC 不貴（兩 .mjs / ~280 行 / ~10 min 寫完）但救了 ship —— 50 篇 scale test 確認 p95 對 mean 差 5ms 內才敢一次寫 production v4。(3) DNA #37 first-principle 5 步迭代 pattern 第二次有意識套用：target → small test → autoMate → full batch → meta-automation。_
_LESSONS-INBOX 候選：(a) 同形批次視覺輸出（OG / poster / thumbnail / 證件）走單頁 mutate 而非 N×navigation 的通用 pattern（DNA #47 已收 v2.5）。(b) Embedded i18n mirror 的同型 SSOT 風險升級提醒：v4 加 13 categories × 4 langs 入 generator，加新分類或新語言要同步表（DNA #43 同類）。_
