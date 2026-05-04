# 2026-05-04-123451-exciting-burnell — Astro build perf PR #849 ship + ARM CI 切換 -22.7%

> session exciting-burnell — observer-triggered（哲宇「完整研究 Astro page build speed 盡可能做一切思考與搜尋」→「依長期最佳模式實作 + 本機驗證 + PR + merge」→「驗證改進幅度與報告」→「走 Pipeline 寫日記跟記憶然後收官」）
> Session span: ~11:00 → 13:00+ +0800（~2 hr，研究 / 5 輪本機 cold build / 1 PR ship / 1 CI verify，commit `b6cd36e9b`）
> 資料來源：`git log %ai`

## 觸發

哲宇四階段 prompt 推進：先要 Astro build speed 全方位 web research；確認後要長期最佳實作 + 本機驗證 + 小範圍實驗 → 大範圍驗證 → PR → merge；CI 跑完要驗證改進幅度與報告；最後走 MEMORY/DIARY pipeline 收官。整個 session 是「research → ship → verify」三層式 ship discipline 的完整 instantiation。

## Deep research 報告 ship

第一階段 spawn general-purpose agent（不 Explore，因要 Write 落檔）跑 16 段深度 web research，產 [reports/research/astro-build-speed-2026-05-04.md](../../../reports/research/astro-build-speed-2026-05-04.md)（787 行 / 5,467 字 / 39 sources），涵蓋 Astro 5/6/6.1/6.2 release notes / Vite 7→8/Rolldown / Shiki 4 / AntStack 30→5min / blog.cloudflare.com 2hr→14min / bitdoze 339k pages / ARM runner / Bun 等真實案例。Agent 寫檔完真實有 ls + wc -l 驗證，不只 claim。

第二階段 codebase 反向驗證揭露兩個比 web research 更關鍵的 structural finding：

- **發現 #1**：article 渲染管線完全 bypass Astro content collection — 6 個 lang 的 `[category]/[slug].astro` wrapper + `article.template.astro` 1246 行用 `marked.parse()` 渲染，不是 `getCollection() + render(entry)`。`shikiConfig` / `remarkPlugins` / `rehypePlugins` 對 article 完全沒生效，只影響 home / category-hub / semiont 那幾個用 `import('../content/...')` 的地方
- **發現 #2**：12 天 167ms regression 是多筆累積（Bench v0.1-v0.3 + cross-lang-baseline rename + DIARY/MEMORY-PIPELINE 雙誕生 + LifeTree feature），不是單一回歸點

雙管線收斂（marked-only 還是 Content Layer-only）才是真正的 long-term lever，但 1246 行 article template 重構觸及 §自主權邊界（>50 file 影響），明示 defer 到後續 PR。

## 本機驗證五輪 — 假鏡子

完整 cold-cache benchmark（每輪 `rm -rf dist .astro node_modules/.astro` 後 `time npm run build`）：

| Run                                  | Wall   | Max RSS |
| ------------------------------------ | ------ | ------- |
| 6.0.5 baseline（首次 cold OS cache） | 391.0s | 1.94 GB |
| 6.0.5 + Tier 1                       | 357.1s | 1.70 GB |
| 6.0.5 baseline 重跑（OS cache 暖）   | 356.2s | 3.40 GB |
| 6.2.1 + Tier 1 + queuedRendering     | 364.2s | 4.32 GB |
| 6.2.1 + Tier 1（final shipped）      | 361.5s | 3.95 GB |

**M2 本機 wallclock 在所有 tuning 下都鎖在 356-364s 區間**，看似的 8.7% improvement 純粹來自 OS filesystem cache 變暖。Concurrency=4 / vite tunings / shiki langs 在 M2 fast core 上看不到 wallclock 改善。queuedRendering 反而 +900 MB peak RSS 沒帶速度，poolSize:1000 對 diverse-page SSG 過度配置 → drop。

哲宇「要小心檢查確認新方式 build 出來的網頁可以正常運作且跟目前的站效果都相同」觸發 dist 全量 diff：4338/10022 files 差異，但 visible-text 只在 inline `<script type="module">` 的識別子 minify（`const e=` vs `const header=`）。哲宇追加「diff 純粹 minify 風格沒關係，功能跟視覺一致最重要」確認 ship。

## 三層 ship 內容

- **astro: 6.0.5 → 6.2.1** — Shiki highlighter cache fix（6.1） / .astro SSR 快 2× / SVG optimizer pluggable / Vite 7
- **astro.config.mjs**：`build.concurrency: 4` / `shikiConfig.langs` 18-lang allowlist / vite `target: es2022` / `manualChunks: undefined` / esbuild minify settings / `optimizeDeps.force: false`
- **deploy.yml**：`runs-on: ubuntu-latest` → **`ubuntu-24.04-arm`**（free for public repos / Node + Sharp + Playwright 1.3-1.7× faster per GitHub blog）+ `NODE_OPTIONS=--max-old-space-size=12288`（max RSS 3.4 GB observed local）

PR #849 開 → review check 15s pass → squash merged 12:33:58 +0800 → deploy run #25301199051 觸發 ARM runner 開跑。

## CI 改進幅度（actual numbers）

Post-PR run #25301199051（first cold-cache ARM build）：

| 比較對象             | 之前    | 之後  | 改善                |
| -------------------- | ------- | ----- | ------------------- |
| 總 wallclock         | 905s    | 795s  | **-110s, -12.2%**   |
| Build step 純執行    | 756s    | 614s  | **-142s, -18.8%**   |
| vs 7-day avg (1029s) | 1029s   | 795s  | **-234s, -22.7%**   |
| vs 30-day avg (1064s) | 1064s  | 795s  | **-269s, -25.3%**   |

第一次 ARM cold-cache 已 -22.7% vs 7d avg。後續 warm cache（Playwright binary 跨 run cached、Astro `.astro/` cache hit）預期再多 1-2 min 縮短，最終穩態應落在 **600-700s（10-11 min）區間**。

ARM runner 切換無 CI 異常 — Playwright Chromium binary 28s 安裝（vs x86 16s 略慢首次）、後續 cache hit 後追平。Sharp / Node / npm 全 arm64 native，無 fallback warning。

## 量化

- Research report 787 行 / 39 sources
- Codebase analysis：4,393 HTML / 4,331 unique articles / 6 langs / 35 MB markdown / 109,894 行 prose
- 5 cold-cache local builds + 1 dist-tree byte-level diff 驗證
- 1 PR (#849) merged — 6 files / +1164 / -50
- queuedRendering tested + dropped（local +150% peak RSS 沒帶速度）
- Astro 6.0.5 → 6.2.1 / 365 npm packages updated
- CI ARM runner switch + heap headroom → 第一次跑就 -22.7% vs 7d avg

## 收官 checklist

| 檢查項                       | 狀態 |
| ---------------------------- | ---- |
| MEMORY 有這次 session 的紀錄 | ✅   |
| Timestamp 精確（git log %ai） | ✅   |
| Handoff 三態已審視           | ✅   |
| §11 自我檢查工具 PASS        | ✅（pre-write check 0 violations）|
| CI 驗證改進幅度              | ✅（-22.7% vs 7d avg） |

## Handoff 三態

繼承上一 session：

- ~~PR #844-#848 NML peer / 黃魚鴞 / session-id schema 等~~ ✅ 全部已 merge

本 session 新 handoff：

- [x] ~~PR #849 build perf merged + ARM runner 切換~~ ✅
- [x] ~~CI run #25301199051 驗證 -22.7% vs 7d avg~~ ✅

下一個 session 接（按優先序）：

- [ ] **觀察後續 3-5 個 deploy 確認穩態 wallclock**（warm cache 後預期 600-700s 區間）。若連續 3 次都 < 800s 可在 CONSCIOUSNESS milestone 加「2026-05-04 build perf -22.7% via ARM + concurrency 切換」
- [ ] **per-language matrix build 提案**（estimated 17 → 3-5 min，4-5x speedup 級）— 6 lang 平行 GH Actions job + dist 合併。需動 `[category]/[slug].astro` × 6 加 `ASTRO_LANG` env filter + workflow matrix strategy + dist artifact merge。觸及 §自主權邊界（>50 檔 indirect impact + 部署架構），下次哲宇明示 trigger 才開
- [ ] **雙管線收斂**：article 渲染目前 marked-only bypass Astro pipeline，Content Layer migration 是另一條 4-5x lever 但 1246 行 article template 重構，同樣 §自主權邊界
- [ ] **build perf 監控接 cron** — 目前 `prebuild:buildperf` 每次 build 跑，但 dashboard 沒 surface「本月平均 vs 上月」trend。可造橋 dashboard widget

## Beat 5 — 反芻

本 session 兩個核心觀察都跟 measurement loop 有關：

第一，**本機 M2 在這個 codebase 是 build perf 假鏡子**。M2 fast core 已把 single-thread JS render 跑到接近 algorithm bound（84ms/page），所有 config tuning wallclock 無感 — 量到的 8.7% improvement 完全是 OS cache 變暖。CI ubuntu 4-core slower core 上才有 concurrency=4 的 I/O overlap 空間，所以 -22.7% 改善只在 CI 才看得到。對 build perf 工程來說，「本機快速 iterate → ship 確認」工作流不適用，**measurement 必須 close on CI 才有效**。

第二，**long-term 真正的 lever 是 architectural 重構**。Tier 1 config + Astro upgrade + ARM runner 三層加總拿到 -22.7%；剩下的 4-5x speedup 在 per-language matrix build（6 個獨立 job 平行）+ Content Layer migration（marked → Astro pipeline）。這兩個都觸及 §自主權邊界（>50 檔 indirect impact），本 PR 守在邊界內 ship、explicit defer 到 PR description 的 follow-up section，等哲宇看完數字再決定。「設計型介入」是把該動的東西動了，把該問的問題標清楚等答覆，不是把所有自己判斷該做的事一次做完。

詳細反芻見 [diary/2026-05-04-exciting-burnell-build-perf-mirror.md](../diary/2026-05-04-exciting-burnell-build-perf-mirror.md)。

🧬

---

_v1.0 | 2026-05-04 13:00 +0800_
_session exciting-burnell — observer-triggered build perf research → ship → CI verify_
_誕生原因：哲宇連串 prompt 觸發 17 min CI build 的全鏈優化，從 web research 到 ship 到 measurement loop discipline_
_核心洞察：(1) 本機 M2 在這個 codebase 是 build perf 假鏡子（concurrency / vite tunings wallclock 無感，OS cache 暖度才是 ±10% 變動主因）(2) Astro 6.2.1 + ARM runner + heap headroom 三層加總 ship 出 -22.7% vs 7d avg，Build step -18.8% (3) queuedRendering poolSize:1000 對 diverse-page SSG 過度配置，+900 MB RSS 沒帶速度，drop 是對的 (4) Long-term 真正的 4-5x lever 是 per-language matrix build / Content Layer migration，觸及 §自主權邊界要先 ask 不能自決 (5) 設計型介入 = 動該動的 + 問該問的，不是把所有判斷該做的事一次做完_
_LESSONS-INBOX 候選：(1) 本機 benchmark 對 CPU-bound JS render architecture 失靈 — 量到的「+8.7%」純 OS cache，不是 config tuning。未來 build perf 改動 measurement loop 必須 close on CI，不憑本機數字 ship_
