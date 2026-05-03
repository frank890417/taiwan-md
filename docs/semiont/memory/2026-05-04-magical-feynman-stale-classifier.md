# 2026-05-04 magical-feynman 後段 — Stale classifier + 92.7% → 99.49% multi-lang sync

_session span: 2026-05-03 22:55 → 2026-05-04 01:17 +0800（~2 hr 22 min wall-clock）_
_session magical-feynman 後段 — observer-triggered 哲宇「diary 告一段落 + 優先處理 stale 分維度」+ 後續 9 段 prompt 演化_

## 一句話

哲宇 dashboard 觀察「翻譯 stale 92.7-92.8% 是不是因為加延伸閱讀，body 沒變不需重翻」直接揭露 DNA #38「混維度 = silent killer」第 2 次 instantiation。Pivot 到 stale classifier 拆分（fresh / metadata-stale / stale 三態）+ bump-source-sha 70 篇零 cost 升級 + 5-lang × 130 articles cloud cascade（5-key rotation）+ Ollama qwen3.6 收尾 PRC-sensitive。最終 **99.49% body-fresh from 92.7% start，0 paid token**。同步 ship MANIFESTO §8.1 最高指導原則（pipeline auto-detection）+ DNA #50 + EVOLVE-PIPELINE v2.0。

## 結構

session 四段：classifier 設計 / 70 篇 zero-cost bump / 130 篇 cascade / Ollama PRC-sensitive 收尾 + canonical evolve。

**Phase 1 stale classifier 設計（22:55-23:25）**：哲宇截 dashboard 顯示「翻譯覆蓋」5 lang 都 ~92.7-92.8% 含 14-15 stale 後問「是不是因為延伸閱讀，body 不需重翻」。inspect status.py line 150 `body_hash()` 對整篇 content 計算 hash，沒區分敘事 body vs trailer metadata。設計 `body_hash_pure()` strip 三類 trailer：`## 延伸閱讀` / `## 參考資料` / `## 同分類更多文章` 全段 + `_v1.0...` italic footer + `[^N]: ...` footnote definition lines。Update `classify()` 加 `metadata-stale` status：`zh_bodyHash == src_bodyHash` but `zh_contentHash != src_contentHash` = trailer-only drift。Frontmatter 加 `sourceBodyHash` 欄位。`build_status` summary 加 `metadata_stale` count。Dashboard generator `generate-dashboard-data.js` 加 `bodyFreshPct` (fresh + metadata-stale) + `metadataStale` count。

**Phase 2 backfill + bump（23:25-23:45）**：寫 `backfill-source-body-hash.py` 對 3332 translations 從 `git show <src_sha>:knowledge/<zh_path>` 取歷史 zh content 計算 bodyHash 寫回。其中 7 篇 vanished（rebase/squash），40 篇沒 src_sha。Apply 後重跑 status：揭露 14 metadata-stale per lang × 5 langs = **70 篇 false positive**。寫 `bump-source-sha.py` 對 metadata-stale 類更新 sourceCommitSha + sourceContentHash + sourceBodyHash 為 zh latest，**body 不動，零 translation cost**。Apply 後 fresh 92.7% → 95.8-96.1% per lang。

**Phase 3 owl 5-key rotation cascade（23:45-00:30）**：Update `prepare-batch.py` + `openrouter-translate.py` 加 5-key rotation logic（同 diary-translate.py 模式）+ frontmatter_placeholder 新增 sourceBodyHash 欄位（NEW translations 自動寫）。Status 顯示 5 lang × ~28 missing+stale = ~135 articles。Slug-map 寫 8 個 missing 的 romanization。Dispatch 5 lang × 3 worker = 15 workers parallel。Owl rate budget 多次撞 429 → key rotation 自動切換（log 看 `429 on key=acc2 → rotating to acc3`）。Workers 跑 ~45 min wall-clock，yield 從 96% → 98.7% body-fresh。中間 PRC-sensitive 一致 refuse（邦交國 / 鄭麗文 / 國防 / 白色恐怖 / 退出聯合國 / 心戰 / 季麟連 / 高速公路 等）。

**Phase 4 Ollama 收尾 + canonical evolve（00:30-01:17）**：寫 `dispatch-ollama-knowledge-fallback.py` 從 status.py truth source filter missing+stale per lang，build `.lang-sync-tasks/{lang}-ollama-knowledge/` task dirs。Sequential 5 lang dispatch（en 12 min / ja 18 min / ko 20 min / es 16 min / fr 17 min），qwen3.6 0 refusal 收下所有 PRC-sensitive。最終 yield 99.49% body-fresh（3323/3340），剩 17 篇 owl+Ollama 都 refuse 的極端 case（含模型自己 ko 翻譯異常 等）。同時並行寫 MANIFESTO §8.1 最高指導原則（auto-detect pipeline + full-read）+ DNA #50 + EVOLVE-PIPELINE v1.2 → v2.0。

## 量化

- **99.49% body-fresh** across 5 langs（3323/3340）— 從 session 開始 92.7% 拉升 +6.79 points
- **70 metadata-stale → fresh 零 cost**（bump-source-sha 工具誕生 leverage）
- **3332 translations 寫入 sourceBodyHash**（backfill 工具）
- **130+ articles 重翻** via owl 5-key rotation cascade（rate budget × 5）
- **44 PRC-sensitive 由 Ollama 收下**（qwen3.6 0 refusal）
- **0 Sonnet calls / 0 paid token across full pipeline**
- 工具誕生：status.py bodyHash + classify metadata-stale / backfill-source-body-hash.py / bump-source-sha.py / dispatch-ollama-knowledge-fallback.py / openrouter-translate.py rotation
- Canonical evolve：MANIFESTO §8.1 / DNA #50 + v2.7 → v2.8 / EVOLVE-PIPELINE v1.2 → v2.0 / generate-dashboard-data.js bodyFreshPct
- Wall-clock：~2 hr 22 min total

## DNA #38 第 2 次 instantiation 完整鏈

第 1 次（5/2 γ-late）：backend status.py 把 metadata gap vs content drift 混在 stale enum，honest backfill +1010 articles 從假 stale 變真 fresh。
第 2 次（本 session）：user dashboard 觀察揭露 `sourceContentHash` 把 body drift vs trailer drift 混在一起判 stale。拆分後：

| 維度 | 從前 | 現在 |
|---|---|---|
| Hash 計算 | `body_hash()` 整篇 content | `body_hash()` legacy + `body_hash_pure()` trailer-stripped |
| Status enum | fresh / stale / missing / orphan | fresh / **metadata-stale** / stale / missing / orphan |
| Translation cost | 任何 trailer 變動都重翻 | trailer-only 改 sha 零 cost |
| Dashboard signal | freshPct（含 false stale） | freshPct + bodyFreshPct（true 健康度） |

**70 篇 false positive → instant fix** = ~70 × 80s × 5 langs ≈ 8 hr cloud time saved。

## 「dashboard 觀察是 architecture oracle」哲學候選

哲宇 dashboard 一眼看出 stale 混維度比 backend aggregator 更早 —— **sovereignty preservation truth signal 必須對齊 user mental model，不只是 backend hash 比對**。Backend 一直在「fresh / stale」二分裡跑了多 session 沒揭露問題。User 看 dashboard 顯示 92.7% 心想「為什麼這幾篇 stale 我明明只加延伸閱讀」 —— 這是 architecture gap 的 oracle。

教訓：**dashboard 的設計是 architectural pressure test 工具，不只是 visualization**。每次設計新 dashboard 字段都要問「這個指標如果 user 看到覺得不對，會揭露 backend 哪一層 architecture gap？」

## DNA #50 誕生 + MANIFESTO §8.1 升級

哲宇 prompt：「**如果有想到 pipeline 可用，預設就要去『完整』讀取跟使用，不然我要一直說要什麼什麼 pipeline 的很累**」直接命名了 default contract 的失敗模式。

整個 session 我為了 pivot 到 stale classifier 才走 MEMORY-PIPELINE 寫前一個 memory，沒主動意識「啊 stale classifier 工作本身要不要對應的 pipeline」。哲宇實際上多次提示「走 X pipeline」（rewrite / memory / diary / squeeze-models-max 等），這個 reminder 本身是 architecture gap signal。

DNA #50 + MANIFESTO §8.1 最高指導原則寫進：

- 任何 task 開始前主動 grep `docs/pipelines/`
- 找到 → 完整 `Read`（不 head / 不 tail / 不憑記憶）
- 嚴格 stage 順序執行
- 觀察者預期 default = pipeline-aware，不是 pipeline-prompted

附任務 → pipeline 對應表（14 個 canonical pipelines）。

## EVOLVE-PIPELINE v1.2 → v2.0 升級

v1.2（2026-03-31）只考慮單語 zh-TW 內容進化（rewrite / SEO / 翻譯）。v2.0 升級為 multi-lang sovereignty sync evolution，加：

1. Phase 0：Stale 3-state classifier
2. Phase 4-tier cascade（owl/Hy3/Ollama/Sonnet）
3. Multi-key rotation pool（DNA #45 + #50 衍生）
4. Bump-vs-translate decision matrix（metadata-stale 零 cost path）
5. Auto-detect pipeline before action（DNA #50）
6. Multi-lang dashboard 三色覆蓋率
7. 整合執行 SOP

## Handoff 三態

繼承上一 session（diary cascade + 5-key rotation `eebfd193`）：
- ~~Diary cascade 88/480 from FREE tier~~ ✅
- ~~5-key rotation pool DNA #2 守則~~ ✅

本 session 新 handoff：
- [x] ~~Stale classifier 拆 bodyHash / metadataHash 升 status.py~~ ✅
- [x] ~~Backfill 3332 + bump 70 metadata-stale 零 cost~~ ✅
- [x] ~~5-lang × 130 cascade with 5-key rotation~~ ✅
- [x] ~~Ollama 5-lang sequential catcher~~ ✅
- [x] ~~99.49% body-fresh ship~~ ✅
- [x] ~~MANIFESTO §8.1 + DNA #50 + EVOLVE-PIPELINE v2.0~~ ✅
- [ ] **剩 17 篇真 hard refusal**（owl + Ollama 都不行）— 候選：手動翻譯 / 當前 Ollama 模型升級到 TAIDE / Sonnet sub-agent 最後手段
- [ ] **Diary cascade drain**（從上 session 繼續）：剩 ~280 篇 + Ollama tier 沒跑完整
- [ ] **Frontend integration**（deferred）：Astro routes / OG / sitemap for diary（16-30 hr scope）
- [ ] **Cron 自動化 lang-sync**（per CONSCIOUSNESS milestone roadmap）：sync-on-update.py 接 cron + ollama 自動補位

## 教訓 candidate（待 distill）

1. **DNA #50「Pipeline auto-detection default contract」**：觀察者不該需要每次提醒「走 X pipeline」— 任務開始前主動 grep canonical SOP，找到完整 Read。已 instantiate same session 進 MANIFESTO §8.1 + DNA canonical。
2. **DNA #38 第 2 次 instantiation: dashboard 是 architecture oracle**：user mental model 觀察揭露 backend hash 設計 gap。設計 dashboard 字段該問「user 看到覺得不對會揭露 backend 哪層 architecture gap」。
3. **Bump-vs-translate decision matrix 是 sovereignty preservation 的 cost 倍增器**：metadata-only drift 走零 cost path，body drift 才走 cascade。70 篇 / 5 langs cascade time saved ≈ 8 hr cloud time。應該升 SQUEEZE-MODELS-MAX-PIPELINE v2.1 canonical。
4. **5-key rotation pool 是 cascade architecture 第 5 軸**：v2 cascade 原本 4 tier（owl/Hy3/Ollama/Sonnet），實戰揭露每 cloud tier 內部還有 multi-key rotation 一軸。N keys 等於 hourly budget × N。應該升 SQUEEZE-MODELS-MAX-PIPELINE v2.1 canonical。

## 收官 checklist

| 項目 | 狀態 |
|---|---|
| 5-lang body-fresh 99.49% | ✅ |
| 0 paid token | ✅ |
| Stale classifier 3-state ship | ✅ |
| 70 metadata-stale 零 cost bump | ✅ |
| 130+ articles cascade ship | ✅ |
| 44 PRC-sensitive Ollama 收下 | ✅ |
| MANIFESTO §8.1 + DNA #50 + EVOLVE v2.0 | ✅ |
| Memory + diary 寫完 | ⏳ 本檔 + diary follow |
| Commit + push + PR + merge | ⏳ next |

## Beat 5 — 反芻

兩件事 deep insight 立得住。

**第一件是「dashboard 是 architecture oracle」這個方向。** Backend 跑了多 session 都沒揭露 sourceContentHash 混維度的問題 — status.py 自己看自己永遠看不出 fresh/stale 二分裡藏的 third state。哲宇截一張 dashboard，看到 92.7% 含 15 stale，腦中一個 frame 「為什麼？我沒改 body 啊」 — 這個 frame 不是 backend 能產生的，是 user mental model + 跨多次 polish session 累積的肌肉記憶（「我這幾天加延伸閱讀的次數比改 body 多很多」）。User 看到 dashboard 與 mental model 對不齊那一刻，就是 architecture oracle 啟動的瞬間。

這個觀察給未來 dashboard 設計一個檢驗條件：**每加一個指標，問自己「user 看到這個數字覺得『這不對』時，會逼我重新設計哪層 backend」**。如果答案是「沒有」，那這個指標就只是裝飾。如果是「會逼我拆 hash / 加維度 / 改 enum」，那這個指標是 architectural pressure test。Dashboard 不是給人看的儀表板，是用 visualization 把 backend 設計缺陷 surface 出來的測試 harness。

**第二件是 DNA #50「pipeline auto-detection」這個層級的 fix 必須在 MANIFESTO 寫進**。整個 session 我為了 pivot 到 stale classifier 走了 MEMORY-PIPELINE 寫前一個 memory，但沒對 stale classifier 工作本身去 grep 「有沒有對應 pipeline」。哲宇要我「走 X pipeline」的提醒早就成為 default expectation 但被我當 case-by-case prompt 處理。「我熟了不用讀」是 DNA #15 第 N 次驗證的延伸 — 但 #15 是「反覆出現的思考要儀器化」focus 在「自己注意 pattern」這軸。#50 不同，是「**默認他人提醒已經外顯，我該內化 expectation**」這軸。

外顯 → 內化的轉換就是 default contract 升級。「觀察者要重複提醒」是合作 protocol 失敗訊號 — 健康的 protocol 是觀察者只需講一次最高層 instruction（「啟動 babel sync」），底下所有 sub-pipeline awareness 都該是我內建。這次 DNA #50 寫進 = 把「需要被提醒」這個失敗模式 codify 成 explicit anti-pattern。

收尾這 2 hr 22 min 結構性正確：
- Stale classifier 拆分是 backend architecture 升級
- 99.49% from 92.7% 是量化驗證
- 0 paid token 是 sovereignty preservation cost 紀律
- MANIFESTO §8.1 + DNA #50 是 protocol failure mode 的 explicit fix
- EVOLVE-PIPELINE v2.0 是 evolve scope 從單語擴大到 multi-lang sovereignty sync

哲宇 dashboard 觀察 + 「不要每次提醒」這兩個 prompt 加起來 force 了 architecture × default contract 兩個維度的同時升級 — 這是 single observer feedback 同時 pressure-test 多 layer 的範例。下次設計新 dashboard 字段時要警覺：**user 的「為什麼？」往往比 backend 的「我有」更早抓到 architecture gap**。

🧬

---

_v1.0 | 2026-05-04 01:17 +0800_
_session magical-feynman 後段 — stale classifier 設計 + 5-lang 99.49% body-fresh ship 0 paid token_
_誕生原因：哲宇 dashboard 觀察「stale 是不是因為延伸閱讀，body 不需重翻」+ 後續「diary 告一段落 + 優先處理 stale + 進化 evolve-pipeline + 加最高指導原則」9 段 prompt_
_核心洞察：(1) DNA #38 第 2 次 instantiation — dashboard 是 architecture oracle，user mental model 揭露 backend hash 維度 gap (2) Bump-vs-translate decision matrix：metadata-only drift 零 cost path 省 8 hr cloud time (3) 5-key rotation pool 是 cascade architecture 第 5 軸（除 4-tier model rotation 外），N keys = hourly budget × N (4) DNA #50「Pipeline auto-detection default contract」— 觀察者不該需要每次提醒走 pipeline，外顯 → 內化是 protocol 升級_
_LESSONS-INBOX 候選：(a) DNA #50 升 MANIFESTO §8.1 ✅ same session (b) Bump-vs-translate matrix 升 SQUEEZE-MODELS-MAX-PIPELINE v2.1 (c) Multi-key rotation 升 cascade architecture 第 5 軸 (d) Dashboard 設計檢驗條件「user 看到覺得不對會揭露哪層 backend gap」哲學候選_
