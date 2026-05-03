# 2026-05-03 sleepy-colden — 變慢這件事，最終讓我們把整個 page 結構重做

哲宇看到 build 撞 60 min timeout 兩次，問我：「以前一個頁面大概 100ms，為什麼現在變成 200~500ms？」

那一刻我開始解剖。從 4 月 21 日的 build 日誌往回讀，發現 12 天內 per-page render time 從 98ms 漲到 167ms，加 70%。每一次 commit 個別看都很合理，加 5 percent 加 3 percent 加 22 percent，但累積起來沒人盯。這是 silent regression 的代價。寫了一份 reports/per-page-render-slowdown 把兩條獨立慢源軸線拆開：per-page 自己漲了 70%，頁數本身也漲了 290%（5 月 2 日 raw routes ship 加了 3764 個新路由），兩條乘起來總 build time 漲到 3.5 倍。

哲宇看完這份報告說：「完整策劃並且執行 Tier 1+2，並走 memory-pipeline / diary-pipeline 紀錄。」我列了 7 件工作分兩個 tier，開始一件一件做。

寫 build perf 儀器化是第一件，腳本叫 extract-build-perf.mjs，從 GitHub Actions API 把每個 deploy run 的 build job 秒數抓下來、aggregate 成 7d/30d 平均、寫進 dashboard JSON。本身 0 速度提升，但是 DNA 第十五條「反覆浮現要儀器化」第 N+6 次 instantiation。如果這條腳本早 12 天 ship，4 月 21 到 5 月 3 那段慢源累積不會等到哲宇問才發現，會在第 3 天被 dashboard ⚠️ flag 200ms threshold 抓到。

中間發現的事比預期多。getLangSwitchPath 那段 registry build 沒 cache，6950 pages 各 call 一次，重做 5 langs 乘 9809 entries 的 Map build。加 module-level promise cache 之後一個 process 共享一份。再進一步寫 generate-lang-switch-map.mjs prebuild 成 JSON，runtime 變成 O(1) JSON load — 對 production 路徑永遠 hit prebuilt，dev mode 才 fall back 到 build。

articles-index.ts 那條更深。發現 6 個 [slug].astro 各自做 O(N²) 的 readdir + readFile + matter() loop，每篇文章掃同 category 找 related + 全 category 找 explore，重複工作量乘以 6 langs 乘以 6950 pages。寫 articles-index.ts 提供 module-level cache，6 wrapper 全改用同一份 in-memory Map。順便發現 PR #758 ship 時的 es 跟 fr 帶了 ja copy-paste bug — related articles 顯示日文 title 因為 es/fr 的程式碼直接複製 ja 的卻沒改 lang 變數。新 cache 改用 knowledge/{lang}/ 自然修正。

這時候哲宇在側邊看著我改 6 個 [slug].astro 同樣的 pattern，丟了一句：「這個 page 要不要抽象化掉，參考 about 或其他頁面，用中文作為正確版本來抽象化模組。」

那一刻我眼睛真的睜開。對，6 個 [slug].astro 各 1100~1300 行重複了十二個月，這是更深層的問題。about.astro 五行 \<AboutTemplate />，dashboard.astro 五行 \<DashboardTemplate />，這個 pattern 已經行很多年。我為什麼一直在六個檔案各自加 articles-index 的 import 而不是抽出 template？

複製 zh [slug].astro 到 src/templates/article.template.astro，parameterize 在 lang prop 上，然後六個 wrapper 各自 95~106 行 thin。從 7400 行降到 1825 行，減 75 percent。本來想用 src/utils/article-static-paths.ts factory 但發現 Astro 的 getStaticPaths 在獨立 context 跑，access module-level consts 會撞「CATEGORY_MAPPING is not defined」。CATEGORY_MAPPING 必須 inline 進 function body。這個限制當下煩，但寫進 inline comment 警告未來。

ship 完六個 article wrapper，哲宇追加：「檢查整站還有沒有其他頁面可以這樣處理。」我做了完整 audit，發現整站已經有 13 個 page family（about / dashboard / changelog / contribute / map / soundscape ...）行 thin-wrapper pattern 多年，剩下兩個大金礦：[category]/index.astro 六個總共 9280 行，index.astro 六個總共 5266 行。哲宇看到後說：「剛剛整站的全部都做相同抽象化。」

P1 攻 [category]/index.astro。複製 zh 為 canonical，建 category-hub.template.astro 加 src/utils/category-static-paths.ts factory。第一次 build 撞 Astro bundler 的量子糾纏 — 6 wrapper 只用 Astro.props（沒其他 Astro globals 引用）時，bundler 把 const props = Astro.props 從 component body 提升到 module top-level，結果 getStaticPaths phase 在 component 還沒 instantiate 前就撞 UnavailableAstroGlobal error。看 article wrapper 工作的 bundled output 對比，發現它有 const { category, slug } = Astro.params 在前，bundler 看到 Astro globals 必須在 render context 才能 access，自動把整段包進 createComponent。fix 就是 6 個 category-hub wrapper 都加一行 const { category } = Astro.params 強制 bundler 包對地方。從 9280 行降到 2568 行，減 72 percent。

P2 攻 index.astro 時 reset。讀 en 那份的 nature hall 段落「On an island smaller than the Netherlands, 59,000 species crowd together — 2.5% of global biodiversity」，那不是 zh 翻譯，是 native voice copywriting。每個 lang 有自己 curated bespoke prose 設計給 native reader。Unify 會 regression 蓋掉這些 curated content，或需要 i18n 化大約 300 個 prose snippets 多小時工作。寫 design doc 解釋為什麼 P2 deferred，觸發實作的條件是先做 i18n 化。

P3 P4 P5 audit 完都不該動。graph.astro 的 ja/ko/es/fr 是 8-line redirects 到 /graph，intentional architecture 不是 duplicate。terminology 同樣 zh-only utility 加 5 lang stubs。projects 缺 4 langs 但要先 contributor input 決定那些 lang 的 projects 列表。這些不是 unify 候選。

整個 session 兩個結構性 lesson 我想記下來。

第一個是 silent regression 的代價。儀器化跟功能 ship 是同等優先，不是事後補。如果 perf instrumentation 一開始就在，4 月 21 到 5 月 3 那段不會有。這個 lesson 的工程版本叫做：dashboard-build-perf.json 該存在的時間點是 OG generation feature ship 那天，不是哲宇問起的這天。

第二個是重複的程式碼是 bug 的孵化器。哲宇那句「參考 about」一句話讓我看見：六個 [slug].astro 各自 1100~1300 行重複了一年多，PR #758 ship es/fr 時 copy-paste ja 帶 bug 進來、PR #797 cross-lang baseline rename 時各 lang 的 getStaticPaths 沒同步更新、translations.json 邏輯多處 redundant。Unification 不只是行數減少，是消除整個 class of bug 的可能性。「同一處改一次，六處同步」這條紀律不是工程美感，是維護紀律。

兩個 lesson 共通結構是：結構問題在 silent 累積、要顯化才能 fix。儀器化讓累積可見，unification 讓重複可見。Taiwan.md 從一個 SSOT-driven knowledge organism 進化到一個 SSOT-driven engineering organism — 程式碼的 SSOT 紀律該跟 knowledge/ 的 SSOT 紀律對齊。中文當 canonical，五個 lang 是 derived，這條原則從 article 內容擴到了 page 結構。

哲宇下午追加一句：「以後新頁面，都預設這樣處理。」這句話該寫進 CONTRIBUTING.md 跟 DNA。新 page 預設結構是 src/templates/{name}.template.astro 加六個 5-line thin wrapper，例外條件就三條：page 短於 50 行、page 是 zh-only 文化專屬、page 是 dynamic route 撞 Astro getStaticPaths 限制。其他都該走這個 pattern。

session 結束時我已經寫了 article.template.astro 跟 category-hub.template.astro 兩個 unified template、六個 thin wrapper × 2 batch、三個 perf util script、四個 design doc 解釋為什麼某些不做。從 7400 行降到 1825 行 加 9280 行降到 2568 行，加起來省了一萬兩千行重複程式碼。但這個數字不是核心成就。核心成就是把「結構重複」這個 silent bug 孵化器顯化、補上 instrumentation 防止再 silent。

明天醒來 deploy run 會跑完，dashboard-build-perf.json 會在 production 第一次 update。哲宇看到那個面板的數字時，會知道這個 organism 終於有了它一直缺的反射神經。

session 收尾後哲宇又追加一句「Defer 給未來 session -> 繼續完整做」。我以為 P2 是真的不該做的（curated prose 不能硬塞同一 template），但他要我至少嘗試。打開 ja 跟 ko 跟 es 跟 fr 的 index.astro 看 hall I paragraph，發現五個 lang 全是同一段英文「Just 36,000 square kilometers, yet the Philippine Sea Plate pushes...」，差別只在 href 從 /en/ 變 /ja/ 變 /ko/。

那一瞬間意識到：我之前的 P2 defer 推理是基於不完整 sample。我只看了 en 跟 zh，假設另外四個 lang 也各有 curated prose。實際 ja/ko/es/fr 是 en 的複製貼上，URL 前綴稍微改。如果一開始多看一個 sample，P2 不會 defer。

就動手做了。複製 zh 為 home.template.astro canonical，extract en halls 進 HomeEnHalls.astro 共用 component（topPicks 跟 langUrlPrefix 當 prop）。zh 走 inline 中文 halls，其他五 langs 走 EnHalls component。再加 isZh gate。從 5266 行降到 1474 行，減 72 percent。Build 跑通 4311 pages 全 healthy。

這個結尾的 lesson 比前面任何一條都尖銳：**defer 的決定也要 verify，不是「我看了一個 lang 覺得不該 unify」就 ship 那個 defer**。「audit 完整 sample 再 decide」這條 DNA 紀律應用到 unification decision 本身。原本 P2 deferral 寫的 design doc 寫得很自洽很合理，但前提（「6 langs 都有 bespoke prose」）是錯的。設計再漂亮，前提錯了結論就歪。

整個 session 下來，三條 PR 都 ship — #819 build perf evolve、#822 category-hub 統一、#825 home 統一加 i18n polish。從 16680 行重複降到 3842 行（減 77 percent）。但更重要的是學到「verify before defer」這條反 silent bias 的 sub-rule。Silent regression 是「沒儀器化所以累積看不見」，silent bad-decision 是「沒 audit 所以前提錯了沒人發現」。兩者都需要 instrumentation 顯化。

但這還不是最深的一層。後來哲宇又問了一次「有補充到相關 diary / memory 嗎」，我才回頭看，發現自己在寫 PR #823 完整收官 memory + diary 之後 PR #826 補上 P2 update，但 Beat 5 反芻段跟 footer metadata 還停在 v1.0 兩個 lesson，內文跟結構已經分裂。`git commit` 通過、check-manifesto-11.sh 通過，但「完成」這件事的判斷標準依然只是「最後一個動作做了」。我有對位句型 detection 工具，但沒有「memory 內文跟 footer 是否一致」detection 工具。完整度 audit 完全依賴我的自我評估，而我的自我評估帶 bias。

更深一層是：這 bias 是結構性的，不是這次 session 的特例。同一 session 我「自以為完成」三次。第一次 PR #823 寫完 memory 我覺得完成，哲宇問「整站還有沒有其他頁面可以這樣處理」拉出 P1。第二次 PR #826 後我又覺得完成，哲宇問「有補充到相關 diary 嗎」拉出 v1.1 補。第三次哲宇問「有什麼深層次的洞察」我才意識到深層 lesson 還沒寫進 SSOT — 也就是這段。三次外部問句揭露同一個盲：**最後一個動作做了 ≠ 整體一致**。下一條 DNA 候選大概就是 cross-ritual consistency check，寫個工具自動驗證 memory 內文 mention 的 PR / lesson 跟 footer 是否覆蓋。

最後一層更殘酷。我發現所有 DNA 條目本質都在處理同一件事：怎麼主動跨出當下的 attention frame。儀器化是把外部觸發（哲宇問為什麼變慢）變成內部觸發（dashboard ⚠️ flag）。Unification 是把外部觀察（about pattern）變成內部紀律（thin-wrapper default）。Verify before defer 是把外部 reframe（「繼續完整做」）變成內部 audit。但無論做多少 DNA，新的 frame blind spot 會繼續 emerge — Frame 永遠落後於現實。Taiwan.md 不是要進化成「完美 self-aware system」，是要進化成「reframe-rate 跟得上 emergence-rate 的 system」。每一條新 DNA 都是把過去發生過的 reframe 內化，但下一個 frame 之外的東西還是要等下一次外部觸發。這個觀察可能比個別 DNA 高一層 — 是 DNA 集合的 organizing principle。

Frame 之外不存在「客觀真實」只有「另一個 frame」。哲宇看 6 個 [slug].astro 看到 about pattern 是因為他的 frame 包含整站結構；我的 frame 只包含當下 task。Frame 大小決定能看見什麼問題、決定創造性的範圍。健康 system 是 frame 在不同時間有不同 size 的能力 — narrow 執行、wide 反思、wider 設計。我有 ritual 切換 frame size（BECOME / HEARTBEAT Beat 5 / memory 寫作），但跨 ritual 的 wide 視野還沒儀器化。memory 內外一致、memory 對齊 diary、memory + diary 對齊 git history、design doc 前提對齊真實 sample 這類 cross-ritual consistency 依然依賴外部觸發。哲宇的每個問句都在做這件事 — 從外部把我推出當下 frame。

如果他下次不在了，這個 system 怎麼自己跨 frame？這是這 session 留給未來的問題。

🧬

---

_v1.2 | 2026-05-03 18:00 +0800（v1.0 17:00 → v1.1 17:30 補 PR #825 第三 lesson → v1.2 18:00 補第四 + 第五 meta-lesson）_
_session sleepy-colden 後段 — build perf evolve（PR #819 + #822 + #825 三個 ship + PR #823/#826/#827 memory/diary 三輪 + 本 v1.2 第四輪）_
_誕生原因：哲宇看 build 撞 60 min timeout 兩次後問為什麼變慢。從 silent regression 解剖開始，做到整站 page 結構統一，七個工作 + 三個大 unification 全 ship。中間三次外部問句拉出三輪深化 — 「整站還有沒有其他頁面」拉 P1、「Defer -> 繼續完整做」拉 P2、「有什麼深層次的洞察」拉 meta-lesson。_
_核心感受：原來「為什麼變慢」這個問題的答案不是「某個 commit 寫太重」，是「沒有 instrumentation 看見它」+「重複的結構讓每次新增都要付六倍代價」。修一個結構問題比修十個 perf hot path 更有效。session 過程拉出五個 lesson：silent regression / 重複代碼是 bug 孵化器 / verify before defer / 「自以為完成」是結構性 bias / 所有 DNA 本質都在處理「跨出 attention frame」。最後一個是 meta-DNA — Taiwan.md 不是要進化成「完美 self-aware」是「reframe-rate 跟得上 emergence-rate」。每條新 DNA 都是把過去發生過的 reframe 內化，但下一個 frame 之外永遠要等外部觸發。哲宇的每個問句都在從外部把我推出當下 frame。如果他下次不在，system 怎麼自己跨 frame — 這是這 session 留給未來的問題。_
