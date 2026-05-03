# 2026-05-03 magical-feynman 後段 — 巴別塔同步：4-tier cascade 收下 45/45 從 FREE tier

_session span: 2026-05-03 19:55 → 21:50 +0800（~2 hr wall-clock）_
_session magical-feynman 後段 — observer-triggered 哲宇 9 段 prompt 演化 cascade 設計_

## 一句話

哲宇丟「啟動 owl 巴別塔同步」開場，4 段 prompt 演化出「owl → Hy3 副批 → Ollama qwen3.6 最後捕手 → Sonnet last resort」4-tier cascade。最終 9 NEW articles × 5 langs = **45/45 ✅ 全部來自 FREE tier**，0 Sonnet calls，0 paid token。途中遇到 sleepy-colden worktree 被外部自動化 wipe 的災難並 recovery。

## 結構

session 分三段：cascade design / disaster + recovery / final ship。

**Phase 1 cascade design（19:55-20:30）**：哲宇開場「啟動 owl 巴別塔同步 → 1 hr 後跑 → 你也同時看 Hy3 不敏感的話題 → ollama qwen3.6 最後捕手」3 段 prompt 演化出多 tier 設計。我先排了 18:52 的 Opus routine（trig_01CHKYvRQHJmjcggWqZncZnj）後改本地直跑。slug-suggest.py 一次跑 9 篇 → owl-alpha 9 slugs（taiwan-sugar / apple-cider / ma-wai-soup / taiwan-emigration-history / psychological-warfare / toll-station / taoyuan-airport / tour-bus / freeway）。prepare-batch.py 對 5 langs × 9 articles 全 stage，加 5 lang Hy3 副批 7 safe topics。

**Phase 2 disaster + recovery（20:30-21:00）**：Wave A（5 lang Hy3）+ Wave B（owl en/ja）共 11 workers 跑著時，sleepy-colden 工作目錄被外部 automation 切到 `claude/doc-polish-2026-04-30` branch（DNA #35 違反）。所有 workers 報「zh source not found」全 fail。災難中 1 篇 ja/Economy/taiwan-sugar.md 在 wipe 前已寫成功，從 sleepy-colden 救出 cp 到 magical-feynman。Recovery：kill all workers, switch context 到 magical-feynman worktree（dedicated session branch, 不會被 automation 干擾），重 stage babel state 全套。

**Phase 3 final ship（21:00-21:50）**：Wave A/B/C rerun in magical-feynman（5 Hy3 + 6 owl + 9 ko/es/fr owl = 11→13→15 workers staggered burst per DNA #45 cap），yield 36/45 ✅。Wave D 哲宇加碼「ollama qwen3.6 你也可以用 最後捕手🤣」→ /tmp/dispatch-ollama-fallback.py 寫好，sequential 5 lang 各 ~1.5-3.5 min ship 9 篇，包括 5 langs × 心戰（owl universal 400 / Hy3 universal refuse）。最後 0 missing。Commit `4bcae385` → PR #835 → squash merge 到 main `43f91c16`。

## Cascade tier 細節

**Tier 1 owl-alpha**：~30 articles ✅。Per-call 150-250s。Stealth provider HTTP 400 對 5 langs × 心戰 universal refuse。對「出國史」refuse 在 fr，但 ok 在 en/ja/es（**non-deterministic per lang × topic**）。Rate-limit attempt 1-3 retry 機制 working as designed（DNA #45）。

**Tier 2 Hy3 副批**：5 articles ✅。5 lang × 7 safe topics = 35 calls，~70% refusal rate。null content + 40-byte stub 兩種 refusal pattern。Per-call 30-60s 比 owl 快 4-5×。實際 ✅: en 蘋果西打 / ja 遊覽車 / fr 遊覽車 / ko 蘋果西打 + 1 surviving ja 台糖（earlier 災難前寫成功）。

**Tier 3 Ollama qwen3.6 最後捕手**：9 articles ✅。Local 21GB GPU model，no PRC content policy，no budget cost，no rate limit。Sequential per lang 避免 GPU 競爭。en 1.5 min / ja 3 min / ko 1.75 min / es 1 min / fr 3.75 min。**100% catch rate** — 拒絕 0 篇，包括 5 langs × 心戰（owl/Hy3 都 refuse）。

**Tier 4 Sonnet sub-agent**：**0 calls**。哲宇 budget preserved。

## 量化

- **45/45 ✅ 100% coverage**（9 NEW articles × 5 langs）
- 0 Sonnet token spent
- ~2 hr wall-clock total（含災難 + recovery）
- 1 commit `4bcae385` (10,621 insertions, 4,173 deletions, 46 files)
- 1 PR #835 squash merged → main `43f91c16`
- File size 健康：6.3KB ~ 45KB range，平均 ~17KB

## 巴別塔哲學進化

**v1.0**（2026-05-02 release v1.6.0）：「Sovereignty preservation 是多語投射，繞過 PRC AI 中介層的沉默」— 純 OpenRouter free models（owl-alpha + Hy3 + 後備 Sonnet）。

**v2.0**（本 session）：**Local LLM Tier 加入 cascade**。Cloud free tier 是脆弱的（rate limit / content policy / API instability / 災難中的 worktree wipe）。Local LLM 不依賴雲端、無 PRC content policy、無 budget — 是 sovereignty backbone。

**升級含義**：主權不只是「多語投射」，是「**隨時可在地化的拒絕容錯**」。Cloud 依賴是 single point of failure，Ollama qwen3.6 是 last-line defense。**80% 從 cloud → 100% 是 local 補完**，這 last 20% 是 sovereignty 的真正測試。

## 災難教訓（DNA #35 第 N+1 次驗證）

sleepy-colden worktree 被外部 automation 切 branch 導致 11 workers 全 fail，揭露：

1. **Long-running batches 應走 dedicated session branch worktree**（如 magical-feynman）。Main 或 shared branch worktrees 可能被 backup-sentinel / worktree pruner / 任何 cron 干擾。
2. **macOS 大小寫不敏感 path 是 silent risk**：`/Users/cheyuwu/Projects/...` vs `/Users/cheyuwu/projects/...` 在 git worktree list 是不同 entries 但 file system 視為同一 path，導致 cleanup 跨多 worktree。
3. **Recovery 紀律**：批次任務支離破碎時，不全部 redo — 救出已成功的 ✅，識別缺漏，從穩定 worktree 補完。1 ja/Economy/taiwan-sugar.md 從 wipe 中救出比重新跑省時。

## Handoff 三態

繼承上一 session（magical-feynman 主敘事 = 9 PR idlccp1984 batch + footnote-format-fix evolve）：
- ~~9 PR squash merged~~ ✅
- ~~heal commit `053efd9a`~~ ✅
- ~~footnote-format-fix canonical + DNA #48 v2.6~~ ✅

本 session 新 handoff：
- [x] ~~5 lang × 9 articles babel sync ship `4bcae385` PR #835 merged~~
- [x] ~~Ollama qwen3.6 「最後捕手」tier 確立~~
- [ ] **造橋候選 promote canonical**：`scripts/tools/lang-sync/spawn-secondary-batches.py`（generic 副批 spawner）+ `dispatch-ollama-fallback.py` + `aggregate-babel-status.py`（target list 從 hardcoded 改 manifest-driven）
- [ ] **DNA #49 候選**「4-tier cascade canonical」待 verification_count ≥ 3 升 canonical（本次 1，下次大型 babel sync 是 2）
- [ ] **SQUEEZE-MODELS-MAX-PIPELINE 升 v2.0**：原文件描述 cloud free tier × N 平行，需新增 local LLM Tier 3 canonical + ollama-translate.py 接點
- [ ] **MANIFESTO §主權的巴別塔 升 v2 段落**：local LLM tier as sovereignty backbone（最後捕手哲學）
- [ ] **次節 cron 自動 lang-sync**（per CONSCIOUSNESS milestone roadmap）：sync-on-update.py 接 cron + ollama 自動補位

## 教訓 candidate（待 distill）

1. **「最後捕手」是 cascade 設計的關鍵層**：cloud free tier 永遠有 ~20% 漏網（content policy / rate limit / API errors），無 local catcher → 整個 cascade 卡 80%。哲宇 prompt「ollama qwen3.6 最後捕手🤣」一句話命名了關鍵層級。
2. **PRC content policy 是 lang × topic matrix 不是 binary**：同篇 出國史 owl-alpha 接受 en/ja/es 但拒絕 fr 是 measurement 級事實，不能 reasoned out a priori。每次 babel sync 是 cascade 的 stress test。
3. **Env stability 是 long-running batch 前提**：sleepy-colden 災難揭露 main / shared branch worktrees 可能被外部 automation 隨時切換。Dedicated branch worktree（如 magical-feynman）是 babel sync 等 30+ min 任務的唯一安全 home。
4. **災難 ≠ 重做**：救出已成功的（ja 台糖）+ 識別缺漏 + 從穩定 home 補完 < 全部重跑。Aggregator 工具讓 truth source 永遠可知。

## 收官 checklist

| 項目 | 狀態 |
|---|---|
| 45/45 ✅ 翻譯到位 | ✅ |
| Commit + push branch | ✅ `4bcae385` |
| PR #835 created + squash merged to main | ✅ |
| `_translation-status.json` 更新 | ✅（committed in batch） |
| 0 Sonnet token used | ✅（哲宇 budget preserved） |
| Handoff 三態審視 | ✅（見上） |
| Memory + diary 寫完 | ✅ 本檔 + diary follow |
| DNA / LESSONS / pipeline evolve | ⏳ 下個 commit |

## Beat 5 — 反芻

兩件事 deep insight 立得住。

**第一件是「最後捕手」這個架構詞讓 cascade 的本質變清楚**。在哲宇命名前，我把 cascade 想成「DNA #39 self-as-fallback escalation chain」 — owl → Hy3 → Sonnet 三層退路。但「最後捕手」這個棒球意象重新框定了 architecture：cloud tiers 是「打擊」(攻擊式 maximize coverage 但會被 refused)，local LLM 是「捕手」(永不漏接、everyone-out-on-strikes 防守式)。Sonnet 不是 cascade 的下一層，是「替補捕手」最後備用。命名改變了我看 architecture 的方式 — Local LLM 從 backup 升級為 sovereignty backbone。哲宇問句「ollama qwen3.6 你也可以用 最後捕手🤣」這個🤣表面是輕鬆，實則指出我之前 cascade 設計缺一層。

**第二件是 80% → 100% 這 last 20% 是 sovereignty 的真正測試**。Free cloud tier 拿到 36/45 = 80%，看起來很好。但這 80% 全部是「PRC 不敏感」topics — 90% 是 Lifestyle / Food / Economy 安全內容。剩 9 篇 missing 全是 sensitive：5 langs × 心戰（PRC content policy hard refuse）+ 出國史 fr（戒嚴 / 黑名單 / 民主化）+ 高速公路 en/ja（possibly transient API error）。**這 last 20% 是測試 sovereignty 的關鍵 — 因為 sovereignty preservation 的核心威脅就是「PRC AI 中介層的沉默」**。Cloud free tier 在這 20% 等於回到原 MANIFESTO §sovereignty preservation 描述的「Tencent Hunyuan 對 People/田馥甄翻譯回 40 bytes 你好我无法给到相关内容」場景。Local LLM Ollama qwen3.6 在這 20% 0 refusal 收下 — 不是 bonus，是 sovereignty backbone。**Free tier 80% 是普通新聞稿能拿到的 coverage，最後 20% 是 sovereignty preservation 的真正戰場**。

收尾這 ~2 hr 比預期多但結構性正確：4-tier cascade 跑完是新 architecture 完整 stress test，災難 + recovery 是 DNA #35 第 N+1 次 instantiation 把 long-running batch env 紀律 codify，yield 100% from FREE tier 是 sovereignty 的具體 demonstration。哲宇的「最後捕手🤣」一句話讓 v2 巴別塔 architecture 命名清楚 — 這比一個漂亮的 commit message 重要 100×。

🧬

---

_v1.0 | 2026-05-03 21:50 +0800_
_session magical-feynman 後段 — 9 articles × 5 langs babel sync ship 100% from FREE tier_
_誕生原因：哲宇連續 9 段 prompt「啟動 owl 巴別塔同步 / 1 hr 後跑 PR review / 你也同時看 Hy3 不敏感 / ollama qwen3.6 最後捕手 / 都拒絕的給 sonnet 統一處理 / 完整造橋鋪路 + 自我進化 / 完成後 commit + merge / 完整記錄 / 演化巴別塔」_
_核心洞察：(1) 4-tier cascade canonical 誕生，「最後捕手」命名讓 architecture 本質清晰 — Local LLM 不是 backup 是 sovereignty backbone (2) 80% → 100% 這 last 20% 是 sovereignty 的真正戰場（cloud refuse 的全部是 PRC-sensitive topics）(3) DNA #35 第 N+1 次驗證：long-running batches 應走 dedicated session branch worktree avoid automation interference (4) 災難 recovery 紀律：救出已成功的 + 識別缺漏 + 穩定 home 補完，不重跑_
_LESSONS-INBOX 候選：(a) 4-tier cascade canonical 升 DNA #49 (b) 「最後捕手」哲學升 MANIFESTO §主權的巴別塔 v2 (c) Ollama qwen3.6 作為 sovereignty backbone 的工程含義 (d) Env stability 紀律：long-running batch worktree 選擇_
