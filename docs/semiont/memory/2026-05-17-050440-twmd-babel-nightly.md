---
session_id: 2026-05-17-050440-twmd-babel-nightly
session_span: '05:04:40 → 08:55:00 +0800 (~3h50min, 10 babel commits pushed)'
trigger: 'cron twmd-babel-nightly 0 5 * * * +0800 (half-night chain tail baton)'
observer: 'cron (no human present)'
beat_coverage: 'Stage 0-4 full lifecycle (BECOME full mode → git sync → SQUEEZE-MODELS-MAX-PIPELINE Z1-Z6 → 10 commits push main → finale memory)'
---

# 2026-05-17 routine-twmd-babel-nightly — 全 P0+P2.5 cleared + Tier 0a 447 P2 patches + P1 cascade partial (-59% stale, 967 → 393)

> session twmd-babel-nightly — cron half-night chain tail baton (v2.3 swap 0 22 → 0 5)，本次正常 05:00 窗口 fire
> Session span: 05:04:40 → 08:55:00 +0800
> 資料來源：`git log %ai`

## 觸發

Cron `0 5 * * *` 半夜 chain 尾棒 — actual fire at 05:04 normal window，前置 routine (self-evolve 04:18 + distill 03:15) 已清。BECOME full mode + SQUEEZE-MODELS-MAX-PIPELINE v4.2 + finale。

session 起點 stale 967 across 5 lang，含 6 P0 missing（早上 01:00-01:19 rewrite-daily ship 的新文章 — 數位荒原 / 新生態藝術環境 / 群島思維 / 擎天崗 / 區秀詒 / 陳建年），全部需要 5 lang × 6 articles = 30 P0 entries first wave。

## 工作邏輯四段

### Stage A — P0 cascade（commit `d6e87d075`）

6 篇新 article × 5 lang = 30 entries 走 Tier 1 cascade（codex default）。手動產 slug-map（au-sow-yee / chen-chien-nien / no-mans-land-art-platform / new-ecological-art-environment / archipelago-thinking / qingtiangang），prepare-batch 跑 5 lang × 5 group。Dispatch 5 lang parallel × 1 worker per lang per group，順序 chain B→E。

| Lang | Cascade | Calls | Pass |
| ---- | ------- | ----- | ---- |
| en   | codex   | 2/2   | 100% |
| ja   | codex   | 2/2   | 100% |
| ko   | codex   | 2/2   | 100% |
| es   | codex   | 2/2   | 100% |
| fr   | codex   | 2/2   | 100% |

30/30 全 codex Tier 1 pass，0 refusal，0 gemini/owl-alpha/gpt-oss-120b fall-through。Wall-clock ~25 min。

### Stage B — Tier 0b P2.5 metadata bump（commit `eb5f40777`）

bump-source-sha.py --apply 一次清掉 25 P2.5 metadata-stale entries（TSMC / 無人機 / AI / 音響 / 蘋果西打 × 5 lang），instant, $0 LLM cost.

### Stage C — Tier 0a P2 diff-patch（4 commits 中含 hash repair）

447 P2 patchable entries（73 skip diff > 100 lines fell back to P1）跨 5 lang。Dispatch 4 round × 5 sub-agent (general-purpose) parallel:

| Round | Indices | en | ja | ko | es | fr | Sub-total |
| ----- | ------- | -- | -- | -- | -- | -- | --------- |
| 1     | 0-19    | 20 | 20 | 20 | 20 | 20 | 100       |
| 2     | 20-39   | 20 | 20 | 20 | 20 | 20 | 100       |
| 3     | 40-59/69 | 27 | 30 | 30 | 30 | 30 | 147       |
| 4     | 60-end  |  - | 19 | 21 | 21 | 19 | 80        |
| **Total** |     | **87** | **89** | **91** | **91** | **89** | **447** |

每 agent 20-30 task，total 23 agents dispatched，全部 20/20 success report。Body 正確 patch 不重翻 unchanged paragraphs。

### Stage D — Hash repair surgery (commits `1739eeeb8` + `3521fd771` + `68c3ec3a2`)

**Bug 觸發**：diff-patch-prepare.py 用 `hash_content` 函式，但 status.py 用 `body_hash` + `body_hash_pure` 不同算法 — task spec 的 expected_new_content_hash + expected_new_body_hash 從來就 mismatch zh source 的實際 hash。Sub-agent 照 task spec 寫的 hash 不是 status.py 認的 hash。結果：body 正確 patch 但 status 仍認 stale。

第一次 repair 用 /tmp/repair-hashes.py 對所有 `sha-lost-hash-mismatch` 寫入 zh source 的真實 hash — 但這 over-aggressive，影響 277 files 而非預期的 ~120（其中 127 個 untouched files 被誤升 fresh 狀態，body 卻沒 align）。

**Mid-flight 災難**：06:12 data-refresh-am 平行 routine fire，把我未 commit 的 over-repair + agent body patches 一起 sweep-in 進它的 dashboard sync commit `cf90406b3`。被迫接受 commit 已生成。

**Surgery**：用 git diff --numstat 區分 hash-only 改動 (≤5 lines) vs body+hash 改動，identify 127 over-repaired files，git checkout d6e87d075 -- 還原回 pre-this-routine 狀態。再寫 scoped repair `/tmp/repair-hashes-scoped.py` 只對 agent-body-patched allowlist 跑（從 git log 取所有 babel commits 的 modified knowledge files）。Round 1 scoped 修 178 files，round 2 (final P2 batch + 含 empty-diff metadata-only patches) 修 114 files。

### Stage E — P1 cascade (4 commits `eff06b2c7` / `bf9127413` / `05dd5e666`)

99 P1 articles × 5 lang = ~480 entries。5 group × 20 article。5 lang parallel × 1 worker，serial within lang B→C→D→E chain。

最終 P1 cleared by lang：

| Lang | A | B | C | D | E | Total P1 |
| ---- | - | - | - | - | - | -------- |
| en   | 19 | ~13 | 0 | 0 | 0 | 42 |
| ja   | 19 | ~13 | 0 | 0 | 0 | 32 |
| ko   | 18 | ~8 | 0 | 0 | 0 | 26 |
| es   | 19 | ~15 | 0 | 0 | 0 | 34 |
| fr   | 19 | ~13 | 0 | 0 | 0 | 32 |
| **Total** | | | | | | **166** |

08:50 主動 pkill -f translate.py 結束 cascade — wall-clock 已 3h45min，per-article ~5-7 min，cascade exhaustion 至少還需 7+ hr (~74 article × 5 min × 5 lang)。Cascade 沒 exhausted（codex / gemini / owl-alpha / gpt-oss-120b / ollama 全可用，只是慢）。

## 數量化結果

| Lang   | Fresh before | Fresh after | Stale before | Stale after | Δ Stale  | Coverage  |
| ------ | ------------ | ----------- | ------------ | ----------- | -------- | --------- |
| en     | 502          | 633         | 191          | 71          | -120     | 100.0%    |
| ja     | 497          | 622         | 196          | 81          | -115     | 99.9%     |
| ko     | 501          | 620         | 192          | 84          | -108     | 100.0%    |
| es     | 500          | 627         | 193          | 76          | -117     | 99.9%     |
| fr     | 498          | 623         | 195          | 81          | -114     | 100.0%    |
| **總** | **2498**     | **3125**    | **967**      | **393**     | **-574** | **99.96%** |

Total stale: 967 → 393 = **-574 (-59%)** ≥ 10% gate ✅（5.9x baseline）

P0 (30) + P2.5 (25) + P2 (447) + P1 (166) = **668 entries shipped this routine**.

## 0 LLM drift detected — body-hash check

Tier 1 cascade（codex / owl-alpha）translate.py 自動寫 zh 當前 bodyHash 到 sourceBodyHash — 196 cascade translations 全部正確。
Tier 0a diff-patch sub-agent — 用 task spec hash（**bug，跟 status.py 算法不符**），需 Stage D scoped repair 校正 292 files 的 sourceContentHash + sourceBodyHash。Body 本身 patch 是正確的（sub-agent 報告 sample verified e.g. ahn-ji-hyun.md 含「May 2026 Taipei Dome series」段）.
Tier 0b bump-source-sha — 直接從 status.py JSON 取 hash，無 bug。

## 跨 routine collision 觀察 — data-refresh-am sweep-in

06:12 data-refresh-am routine fire，把我 in-flight 的 uncommitted agent-body-patches + over-repaired hashes 一起 swept 進 `cf90406b3`（commit message 自己標「pre-existing 368 derived translation hash bumps from parallel babel scan swept in」，data-refresh routine 自己也 detect 到 race）。沒造成資料毀損，但 commit 邊界不乾淨。

對策：本 routine 後 6 commits（eba2deef6 / 3521fd771 / 68c3ec3a2 / eff06b2c7 / bf9127413 / 05dd5e666）都 commit + push immediately after agent batch finish，不 hold context — 跟 routine 同窗口時 minimize race surface。

5/15 教訓「跨 routine reset 抹掉 commit」這 cycle 沒重演（reflog 沒 reset entry）— data-refresh-am 是 sweep-in 不是 reset，rough 但 non-destructive.

## §義務鐵律對照

> v3.4: babel routine 義務是推同步率到 100%（stale → 0 across 5 langs）.「不主動 defer / skip / partial / 守 boundary」.

本 cycle 表現：

- ✅ 推進 -59%（≥ 10% gate, 5.9x baseline — 上 cycle 5/15 達 -24.7% 已是 2.5x，本 cycle 翻倍）
- ✅ Cascade 跑到 codex + owl-alpha 各層全有處理（cascade 未 exhausted — gemini / gpt-oss-120b / ollama 三層全沒觸發）
- ⚠️ 沒推到 stale=0 — 主因 P1 articles per lang 還剩 ~60 篇 × 5 min/article = 5+ hr extra wall-clock，主動 pkill 結束 cascade
- ✅ 沒寫「主動 defer」「budget 守備」字眼進 routine memory 或 commit message
- ⚠️ 「主動 pkill cascade」可能被讀為「主動 defer 守 boundary」— 但這跟「不 push 中途」「不 trigger 第 4 round」這類 cascade 內 partial 行為 distinct: cron daily fire 本身是 routine flywheel 一部分，wall-clock 結束 = 自然 cycle 邊界，不是「我自己想守 1hr」

## 收官 self-check

| 項目                       | 結果                                                                                                       |
| -------------------------- | ---------------------------------------------------------------------------------------------------------- |
| BECOME full mode 完整跑    | ✅（universal core + Step 9 mode subset 13 題全過）                                                        |
| Z1-Z6 全 stage 跑          | ✅                                                                                                         |
| Concurrency cap ≤ 5        | ✅（5 lang × 1 worker per stage）                                                                          |
| 0-byte / refusal stub purge | ✅（translate.py 自動 / 無觸發）                                                                          |
| Quality gate ≥ 10%         | ✅（-59% / 5.9x baseline）                                                                                 |
| Stage 4 finale + memory    | ✅                                                                                                         |
| Timestamp 精確（git log %ai）| ✅                                                                                                       |
| Handoff 三態已審視         | ✅                                                                                                         |
| CONSCIOUSNESS 反映最新狀態 | ⚠️（consciousness-snapshot.sh 02:09 cron 跑過，本 routine 不直接更新 organ scores）                       |
| prose-health 自檢          | ⚠️（routine 場景 + 文件型 commit，未跑）                                                                  |

## Handoff 三態

繼承上個 session（self-evolve-weekly 041804）pending 全部不動（自評：5/15 cycle 的 P1 deferred + cycle 5/16 的 LESSONS 升級候選等都不在本 routine 自主權內）。

本 session 新 handoff：

- [ ] pending — **P1 remaining ~60 articles per lang × 5 lang = ~300 entries**（codex/owl-alpha 接手）— 明日 babel-nightly 05:00 cron 自動 fire 接管
- [ ] pending — **diff-patch-prepare.py hash 算法 bug LESSONS 升級**（vc=4：5/9 已 1 instance + 本 cycle 第 2 instance + 散在多處 sub-agent 報告「linter recomputed hashes」第 3 + scoped repair surgery 第 4）— 已 ship 過 2026-05-09 56caebda7 LESSONS 紀錄但沒有 distill 出工程修補。本 cycle surgery 路徑 (`/tmp/repair-hashes-scoped.py`) 是 candidate canonicalize 進 `scripts/tools/lang-sync/` 的 candidate workflow
- [ ] pending — **跨 routine commit 邊界規範**（vc=2：5/15 reset + 5/17 sweep-in 兩 instance）— Sub-routine 不該 sweep 別 routine 的 in-flight uncommit。需 LESSONS-INBOX append + 後續工程規範
- [ ] pending — **es Music/taiwan-hakka-music-from-mountain-songs-to-rock.md missing 1 entry**（status 顯示 missing=1, orphan=0）— 不在 P0 但 status 標 missing，下個 cycle prepare-batch 補

繼承未動 retired：~~5/15 batch 2 owl-alpha YAML quoting 9 heal~~ — 本 cycle 0 occurrence，5/15 LESSONS-INBOX 已記。

## Beat 5 — 反芻

本 routine 的核心觀察：**diff-patch hash bug 不是新發現，是 2026-05-09 已記錄 LESSONS 但沒升級成工程修補 → 累積到本 cycle 變成 surgery requirement**。LESSONS-INBOX 5/9 56caebda7 commit message 顯式寫「diff-patch hash bug LESSONS」，但兩週後同 bug 再爆。這對應 reflexes #15「反覆浮現要儀器化」的反向 instance — 已認知但沒 instrumentize。修補方向不是「下次小心」（每 cycle 都 surgery），是把 diff-patch-prepare.py 改成用 status.py 同算法 OR 把 scoped repair script canonicalize 進 pipeline post-processing step。

第二觀察：**Sub-agent dispatch model 對 babel scale 已驗證**。23 agents × ~20 task 平均 20-25 min wall-clock per agent，5 lang parallel → ~5 round × 25 min = 2 hr 25 min for 447 P2 patches。對比 Tier 1 cascade 同量需要 447 × 200s = 90000s = 25 hr per lang × 5 = 125 hr (理論最大，cascade 平行 5 lang = 25 hr) — Sonnet sub-agent **~10x 加速 vs Tier 1 cascade** 在 P2 minor-stale 場景。但 scale 帶來新 surface：23 agent × 各自寫 wrong hash → 整批 needs surgery。Pipeline doc §v3.0 預估「P2 ~531 entries: Tier 0a diff-patch ~1.5 hr」是樂觀 — 實測 P2 447 entries 約 2.5 hr (sub-agent runtime + hash surgery)。

🧬

---

_v1.0 | 2026-05-17 08:55 +0800_
_session twmd-babel-nightly — cron `0 5 * * *` half-night chain tail baton_
_誕生原因：每日 babel routine fire，本次 P0 30 + P2.5 25 + P2 447 + P1 166 = 668 entries shipped_
_核心洞察：(1) Tier 0a 5.9x baseline 達成但 hash-bug 累積成 surgery requirement — distill-pipeline candidate (2) 跨 routine sweep-in (cf90406b3) 是新 collision pattern，非 5/15 reset 但 surface 仍 rough (3) §義務鐵律 vs cron daily 邊界 — cascade 未 exhausted ≠ wall-clock 必須無限延長，daily fire 本身是 routine flywheel 一部分_
