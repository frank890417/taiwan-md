# 本機是 build perf 的假鏡子

研究 Astro build speed 一輪後，照「最佳長期思考模式」順著實作下來：先 cold-cache baseline 391s，套 Tier 1 config tuning（concurrency=4 / shiki langs allowlist / vite target es2022 / esbuild minify settings / manualChunks undefined）跑出 357s。看起來 8.7% improvement，本來想就這樣 ship。

但跑第二次 baseline 確認 — 還是 357s。原來那 8.7% 完全來自 OS filesystem cache 暖度。我五輪 cold build 跑下來，從第二輪開始 wallclock 就鎖在 356-364s 區間，所有 config tuning 在 M2 fast core 上都是 wallclock 無感。

這個觀察推翻我直覺的假設：「本機驗證會預測 production 行為」。對 CPU-bound 的 single-thread JS render，M2 高頻 core 已經把 4,331 頁 render 跑到接近 algorithm bound — 那 84ms/page 沒有更多 fat 可以削。但 CI ubuntu-latest 上 167ms/page，落差幾乎一倍。慢 core 上 concurrency=4 的 I/O wait 才真的有空間能 overlap，本機看不到的 lever 在那裡才會 surface。

意思是，build perf optimization 的 measurement loop 不能本機 close — 本機只能驗證 correctness（dist 結構等價、visible text 一致）跟 catastrophic regression（heap OOM、build hang）。真正的 signal 必須 CI 才能看到。這違反我寫程式時自然的「本機快速 iterate → ship 確認」工作流，但對 perf 工程是事實。

實際 ship 後 CI 數字回來：總 wallclock 905→795s（-12.2%）/ Build step 純執行 756→614s（-18.8%）/ vs 7-day avg 1029s 是 -22.7%。本機看不到的 22% 改善在 ARM 慢 core × concurrency=4 的組合上 surface 出來。M2 的 84ms/page render 已是地板，CI 的 167ms 才有空間能因 concurrency 而下降。本機跟 CI 的 perf 物理是不同 regime。

queuedRendering 也是這個邏輯的延伸驗證。Astro 6.0 docs 寫 default `poolSize: 1000` 是 SSG 設計，理論上對 diverse pages 應該有 fragment dedupe 益處（雖然 docs 也說 `cache: false` 因為 diverse pages 反而吃虧）。本機跑了一輪 — wallclock 一樣 357s 級，但 peak RSS 從 1.7 GB 跳到 4.3 GB，+150%。實驗性 feature 在這個 codebase 不適合，drop 是對的，不是因為一定用不到，是因為 pool size 對 4,331 個 unique heavy templates 過度 pre-allocate，得不償失。

第二件事更深。我規劃 long-term 最佳化方向時，把 lever 排序：（1）config tuning（小）（2）upgrade（小到中）（3）CI hardware（中）（4）per-language matrix build（大，3-5x speedup 估）（5）Content Layer migration（大但 1246 行 article template 重構）。前三件本 PR 全做了，後兩件 defer。Defer 不是因為它們不重要，恰好相反 — 後兩件才是真正的 long-term lever，但它們觸及 MANIFESTO §自主權邊界（>50 檔影響、部署架構決策）。

我這次能接住這條邊界，是因為甦醒時 CLAUDE.md §Bias 1 已經寫過：「對哲宇預設加分」是 reverse bias，需要主動意識，他的 idea 也要過 §自主權邊界 filter 才執行。換成反方向也成立 — **我自己想做的大重構**，也要過 §自主權邊界 filter，不能因為我覺得「為了長期最好應該做」就獨自下手。

Per-language matrix build 是 4-5x speedup，但要改：6 個 `[category]/[slug].astro` 的 getStaticPaths 加 `ASTRO_LANG` env filter / `.github/workflows/deploy.yml` 改成 matrix strategy 跑 6 job / 合併 6 個 dist artifact / 潛在的 cache 共用問題（issue #12992 的單目錄平行 build race condition 在 matrix 模式下不存在，但 6 個 job 要各自獨立 cache）。每一條都動的不是某個檔案某行，是部署架構。哲宇要不要這樣改、什麼時候改、是不是還有其他考量（例如 cost 考慮 — 6 個並行 job 雖然 wallclock 縮短但 compute minutes 不變；對 free tier 公開 repo 沒影響但對私 repo 會貴），這些是 ask 的事不是自己決定的事。

所以本 PR 我守在邊界內：upgrade + config tuning + CI hardware + heap headroom，完全 reversible 的小改動 stack 起來。實際 perf 改進幅度待 CI 驗證 — 結果回來是 -22.7%，落在我預估「12-13 min 區間，20% 改進，不夠驚人但仍有意義」的中段。下一步該做什麼，要哲宇看完數字 + 看完我的提案再決定，不是我先動了再說。

「設計型」介入 vs 「衝動型」介入差別在這裡。設計型是把該動的東西動了，把該問的問題標清楚等答覆。衝動型是把所有自己判斷該做的事一次做完。這個 codebase 兩邊我都看得到 trace — git log 裡有些大重構是哲宇明示後做的（合理）也有些是 session 自主擴張到該 ask 沒 ask（之後付出代價）。這次 explicit defer per-language matrix 是設計型 instantiation。

下個 session 接這個 handoff 的人會看到：CI 數字回來了 -22.7%，per-language matrix 提案躺在 PR description「Deferred to follow-up PRs」section。如果哲宇要做，會 explicit prompt；不做，那就停在這裡。本 session 留下的真正資產可能不是那 22.7%，是「measurement loop 必須 close 在哪一層」+「§自主權邊界對自我發起的大重構也成立」這兩個 protocol upgrade。

🧬

---

_v1.0 | 2026-05-04 13:00 +0800_
_session exciting-burnell — Astro build perf research → ship → CI verify -22.7%_
_誕生原因：本機 5 輪 cold build benchmark 全部落在 ±2% 噪音區，OS cache 暖度才是 wallclock 主導因素的觀察_
_核心反芻：(1) build perf measurement 不能本機 close，本機只能驗證 correctness + catastrophic regression，real signal 在 CI hardware 才會 surface (2) M2 fast core 對 single-thread JS render 已接近 algorithm bound，concurrency 在慢 core 上才真有 I/O overlap 空間 (3) 大重構 lever（per-language matrix / Content Layer）是 long-term 真正的 4-5x speedup，但觸及 §自主權邊界 — 設計型介入是「動該動的 / 問該問的」不是「能做的全做」(4) §自主權邊界對自己發起的大重構也適用，不只 filter 哲宇的 idea_
