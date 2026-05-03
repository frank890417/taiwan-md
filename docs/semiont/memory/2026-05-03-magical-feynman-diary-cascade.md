# 2026-05-03 magical-feynman 後段 — Diary cascade + 5-key rotation + stale classifier 命題誕生

_session span: 2026-05-03 22:00 → 22:55 +0800（~55 min wall-clock）_
_session magical-feynman 後段 — observer-triggered 哲宇「啟動 owl 巴別塔同步把 semiont diary 也用相同方式處理」_

## 一句話

把 babel cascade v2（DNA #49）套用到 docs/semiont/diary/ 96 篇 × 5 langs = 480 translations。Build infrastructure + 5-key rotation pool（哲宇提供 4 把新 + default）+ 跑 owl tier top 30 cascade，yield 88/480 ✅（18% ship）後 pause。哲宇 dashboard 觀察 stale 顯示誤判 metadata drift（延伸閱讀 patch）為 content drift，pivot 到 stale classifier 設計命題（DNA #38 第 2 次 instantiation）。

## 結構

session 三段：infrastructure / cascade rotation evolution / pivot trigger。

**Phase 1 infrastructure（22:00-22:15）**：建 `scripts/tools/lang-sync/diary-translate.py` + `diary-translate-cascade.sh`。tier-aware（owl/hy3/ollama），輸入 `docs/semiont/diary/*.md`、輸出 `docs/semiont/diary/{lang}/{filename}.md` 保留檔名為 slug。Skip mode 已翻譯（size ≥ 1KB）跳過，status mode aggregator 跑 96 × 5 expected pairs 真實 truth source。Smoke test 1 篇 owl 70s ✅。Commit infrastructure `a1398990`。

**Phase 2 cascade rotation evolution（22:15-22:50）**：Wave 1（top 10 × 5 langs parallel within owl tier）撞 owl-alpha hourly budget cap（DNA #45）— 5 lang 累積後 ja/fr/es/ko 連環 429 cool-down，yield 13/50 後嚴重 stall。哲宇 offer key rotation 多 OpenRouter 帳戶。重要：DNA #2 鐵律「key 不入對話」我提供 CLI procedure（`read -s` + 寫入 `~/.config/taiwan-md/credentials/openrouter-keys/{name}.key` + chmod 600）。哲宇加 acc2/3/4，pool size 4 → smoke test 4-key round-robin ✓。Wave 2 重 dispatch top 30 × 5 langs，rotation logic 自動 mark 429 keys 進 cool-down JSON `/tmp/openrouter-key-cooldown.json`，5 min 後自動 revive。fr 撞「all keys rate-limited」哲宇加 acc5 → pool 5 → 5× budget multiplier，cascade 立即接著跑。Wave 2 yield 88/480（top 30 batch 內 75 new + 13 already-translated from Wave 1）。

**Phase 3 pivot trigger（22:50-22:55）**：哲宇 dashboard 觀察「翻譯覆蓋」5 lang 都 ~92.7-92.8%，每 lang 有 14-15 stale，揭露問題：「**stale 是不是因為加延伸閱讀類的 hook，本體其實不用重翻？**」DNA #38「混維度 = silent killer」第 2 次 instantiation — 目前 sourceContentHash 把 content drift 跟 metadata drift 混在一起判定 stale。延伸閱讀 / wikilink / footnote polish / cross-link 加進 zh 後，body 仍 valid 的 translation 被誤判要重翻。哲宇 pivot：「diary 告一段落 + 記錄 + 優先處理 stale classifier」。

## 量化

- Infrastructure ship：1 commit `a1398990`（diary-translate.py + cascade.sh，3 tier API + skip mode + status aggregator）
- 5-key rotation pool：1 commit follow-up（rotation logic + cool-down 5 min）
- Diary translations ship：88/480（18% from owl tier within top 30 scope）
- Per-lang yield：en 21 / ja 16 / ko 12 / es 21 / fr 18
- Wall-clock：~55 min（含 infrastructure + 2 waves + key rotation 演化）
- Sonnet calls used: **0**（純 owl-alpha 5-key rotation drove this batch，Ollama tier 沒跑就被 pause）

## 5-key rotation 設計

```python
def pick_openrouter_key() -> tuple[str, str]:
    """Round-robin within fresh keys（cool-down ≤ KEY_COOLDOWN_SEC=300）.

    All cooled → fall back to oldest cooled.
    """
```

State files：
- `/tmp/openrouter-key-cooldown.json`：per-key 429 timestamp
- `/tmp/openrouter-key-rr.txt`：round-robin counter

Key sources（priority order）：
1. `OPENROUTER_API_KEY` env var
2. `~/.config/taiwan-md/credentials/openrouter-keys/*.key`（rotation pool）
3. `~/.config/taiwan-md/credentials/openrouter.key`（legacy default）
4. `~/.config/taiwan-md/credentials/.env` line `OPENROUTER_API_KEY=`

DNA #2 守則：keys 從未進 chat，全程 哲宇 CLI execution（`read -s` + write file + chmod 600）。

## Stale classifier 命題（pivot 觸發 — next 工作主題）

**問題 framing**：MANIFESTO §sovereignty preservation v2 + DNA #38「混維度 = silent killer」交集 — 目前 lang-sync `_translation-status.json` 用 `sourceContentHash` 對照判定 stale，但這個 hash 把：

- **Content drift**（敘事 / 段落 / 事實有變）→ 需重翻 body
- **Metadata drift**（延伸閱讀 / wikilink / cross-link / footnote URL polish / category 改名 / heading 順序調）→ body 仍 valid，僅 patch 變動 section

**混在同一 hash 判定**。Dashboard 翻譯覆蓋顯示 e.g. en 92.7% 含 15 stale —— 其中可能 8-10 篇只是延伸閱讀變動，body 還是 valid 翻譯。

**設計命題**：
1. **拆 hash**：`bodyHash`（drop 延伸閱讀 / footnote / wikilink）+ `metadataHash`（覆蓋整篇）
2. **Stale reason**：`bodyDrift` / `metadataOnly` / `bothDrift`
3. **Patch path**：`metadataOnly` 走「補丁翻譯」— 只翻變動 section（延伸閱讀條目 / footnote desc 變動），不重翻全文
4. **儀器化**：dashboard 翻譯覆蓋分 fresh / metadata-stale / body-stale 三色，不只 fresh / stale binary

## 其他 quick handoff

- `scripts/tools/lang-sync/diary-translate.py` 已 ship infrastructure，5-key rotation 已驗證
- 88/480 diary translations 落 `docs/semiont/diary/{lang}/{filename}.md`，slug = zh filename
- 待 next session drain：96 - top 30 = 66 篇還沒進 cascade + Ollama tier 沒跑 → 估 ~250-280 篇待補完整
- Frontend integration（Astro routes / OG / sitemap / hreflang）依然是 Path A 16-30 hr scope，本 session 沒動

## Handoff 三態

繼承上一 session（巴別塔 v2 + memory/diary pipeline `a3d4e1d2`）：
- ~~9 articles × 5 langs babel sync 100% from FREE tier~~ ✅
- ~~DNA #49 + MANIFESTO v2 + SQUEEZE v2~~ ✅

本 session 新 handoff：
- [x] ~~Diary infrastructure ship `a1398990`~~ ✅
- [x] ~~5-key rotation pool 哲宇加滿~~ ✅
- [x] ~~Owl tier top 30 cascade 88 ✅ ship~~（部分）
- [ ] **Pivot 到 stale classifier**（哲宇 explicit prio，next 工作）：bodyHash vs metadataHash 拆分 + dashboard 三色覆蓋率
- [ ] **Diary cascade drain**（後台候選）：剩 ~280 篇待 cascade 補（ollama tier 主力 + owl 補位）
- [ ] **Diary frontend integration**（defer）：Astro routes / lib / i18n / OG generator extension（16-30 hr scope）

## 教訓 candidate（待 distill）

1. **Key rotation pool 是 cascade architecture 的 missing tier**：v2 cascade 設計只考慮 model rotation（owl→Hy3→Ollama），沒考慮 single-model multi-key budget multiplication。本 session 哲宇加 5 keys 等於把 owl tier hourly budget × 5。「key rotation」是 cascade orthogonal axis，**值得升 SQUEEZE-MODELS-MAX-PIPELINE v2.1 canonical**：每個 cloud tier 都該有 multi-key rotation as first-class layer，而非緊急 fallback。
2. **DNA #2 安全紀律 + DNA #45 budget 在實戰交集**：key rotation 解 budget 但 keys 必須走 CLI procedure 永不入 chat。本 session 5 把 keys 全部哲宇 terminal 用 `read -s` 寫入 — 這是 DNA #2 + #45 一起 instantiation 的範本，**值得升 SECURITY 紀律 canonical SOP**（`docs/pipelines/MULTI-KEY-ROTATION-SOP.md` 候選）。
3. **DNA #38 第 2 次 instantiation 預告**：sovereignty bench 翻譯覆蓋 dashboard 揭露 stale 混維度。下次 session 拆 bodyHash / metadataHash 是 DNA #38「status 設計鐵律」直接應用 — fresh / metadata-stale / body-stale 三態取代 fresh / stale 二態。

## 收官 checklist

| 項目 | 狀態 |
|---|---|
| Diary infrastructure ship | ✅ `a1398990` |
| 5-key rotation pool | ✅ acc2/3/4/5 + default |
| Owl tier yield | 88/480 (18% within top 30 scope) |
| Workers paused | ✅ pkill clean |
| Memory + handoff 寫完 | ✅ 本檔 |
| Stale classifier pivot 命題 | ✅ documented above |

## Beat 5 — 反芻

兩件事 deep insight 立得住。

第一件是 **key rotation 是 cascade 架構漏掉的一層**。SQUEEZE-MODELS-MAX-PIPELINE v2 只想到 model rotation（owl→Hy3→Ollama→Sonnet），沒想到 single model 內的 key rotation 同樣是 budget × N 的乘數。哲宇加 5 把 keys 等於把 owl tier 的 hourly budget × 5，「沒撞牆」這件事不是因為 owl 模型本身變強，是因為 OpenRouter 把 budget 跟 account 綁定。我的設計被 cloud provider 的 billing 結構 framed 住，沒認知到「不同帳戶 = 不同 budget bucket」是 cascade architecture 的另一個 axis。哲宇直接給 5 把 keys 不是「workaround」，是揭露我的 architecture 缺一條維度。

第二件是 **DNA #38「混維度 = silent killer」在 user feedback 層級反覆 instantiation**。第 1 次（5/2 γ-late）是 backend status.py 把 metadata gap 跟 content drift 混在 stale enum 裡，honest backfill 一千多篇從假 stale 變真 fresh。第 2 次（這次）是 user 層觀察 — dashboard 顯示 stale 但實際 body 沒變，只加延伸閱讀。哲宇問 「**這件事情未來怎麼處理**」這個問題本身指出 architecture gap：sourceContentHash 是粗糙的 truth signal，把任何 source byte 變動都當 content drift 處理。下個 session 拆 bodyHash / metadataHash 不只是修一個 bug，是把 DNA #38 從 backend status 設計擴大到 multi-lang sync 的 stale 判定 — 整個 sovereignty preservation architecture 的精準度提升一個層級。Cloud free tier translation budget 不該浪費在 metadata-only drift 重翻 → 等於 architectural inefficiency 直接消耗 sovereignty backbone。

收尾這 ~55 min 結構性正確：infrastructure ship + rotation evolution 揭露 architecture gap + pivot 到 dashboard-driven 的 stale 精準度設計。哲宇 dashboard 一眼看出 stale 混維度比我的 aggregator script 更早 — sovereignty preservation 的 truth signal 必須對齊 user mental model，不只是 backend hash 比對。

🧬

---

_v1.0 | 2026-05-03 22:55 +0800_
_session magical-feynman 後段 — diary cascade infrastructure + 5-key rotation + stale classifier 命題誕生_
_誕生原因：哲宇 9 段 prompt 演化「啟動 owl 巴別塔 / semiont diary 用相同方式處理 / 不要消耗腦袋額度榨 owl/hy3 / ollama qwen3.6 最後捕手 / 我有第五個 key / diary 告一段落優先處理 stale 分維度」_
_核心洞察：(1) Key rotation 是 cascade architecture 漏掉的一層 — single-model multi-key budget × N，正交 model rotation 軸 (2) DNA #38「混維度 = silent killer」第 2 次 instantiation — sourceContentHash 把 body drift 跟 metadata drift 混在一起，dashboard stale 誤判延伸閱讀變動為 content drift (3) DNA #2 + DNA #45 實戰交集：key rotation 解 budget 但 keys 必須 CLI procedure 永不入 chat，全程哲宇 terminal `read -s` (4) Sovereignty preservation truth signal 必須對齊 user mental model — 哲宇 dashboard 一眼看出 stale 混維度比 backend aggregator 更早_
_LESSONS-INBOX 候選：(a) Key rotation 升 SQUEEZE-MODELS-MAX-PIPELINE v2.1 canonical (b) Multi-key SOP 升 SECURITY canonical (c) Stale classifier bodyHash vs metadataHash 拆分 — 下個 session 主題 (d) 哲宇 dashboard 觀察是 cascade architecture 缺陷的 oracle_
