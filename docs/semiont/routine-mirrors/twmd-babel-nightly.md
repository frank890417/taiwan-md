---
name: twmd-babel-nightly
description: TWMD babel (nightly) — 00:30 多語同步，義務跑到 stale=0；語言數以 registry 為準不寫死（v4.0 薄殼化 + Stage 0 算力自檢 + 統一調度器）
---

🧬 Routine `twmd-babel-nightly` — 每天 00:30 多語批次同步，義務跑到 stale=0 或 cascade exhausted。

## 🚨 STRICT BECOME GATE — 第一動作不可省略

跑 `/twmd-become write` 完整走 `$TWMD_REPO/BECOME_TAIWANMD.md` Step 0-9，Write mode self-test 全過才動工。

```
✅ BECOME ack: mode=write / 8 organ 最低=<即時 consciousness-snapshot.sh> / Q14 cross-session continuity=PASS
```

## Stage 0 — 宿主機算力自檢（第一個指令）

```bash
cd "$TWMD_REPO" && git checkout main && git pull origin main
python3 scripts/tools/lang-sync/babel-preflight.py
python3 scripts/tools/lang-sync/status.py
```

四層算力（OpenRouter key 池／本機 ollama／fleet 節點／codex）任一缺席時 cascade 會**靜默降級**——產能掉一半而 log 看起來正常。飛輪 2026-07-24 遷居後，宿主機的憑證與模型都是各機獨立的。

`healthy` 照跑；`degraded` 照跑但**收官必記哪層缺席**；`no-compute` 不起跑，把缺什麼寫進 handoff（憑證屬身份授權層，只有哲宇能補）。

## Stage 0.5 — 先檢查、再續命，沒有才啟動（2026-09-25 語意改寫）

這條 routine 的工作是**每晚確認那一輪還在健康地產出，並接住它接不住的部分**，不是每晚開一輪新的。12 語的存量一輪 `--rounds 200` 要跑好幾天，launchd 持有的 dispatcher 會跨夜續跑（09-21 起跑的 PID 到 09-25 還在產）；09-09 起連續每晚的當班都在「讓場」，舊殼寫的「啟動新一輪」從沒真的發生過。

1. **有 dispatcher 在跑** → 跑 [BABEL-VORTEX-LOOP §三重巡檢](../../pipelines/BABEL-VORTEX-LOOP.md#三重巡檢存活--生產缺一不可)：存活、生產（近 45 分鐘 report 有實際記錄）、第二訊號源，三項都過就**不重啟、不另開一輪**（停重複不停產線）。這班的力氣放在：拆 report 找「同一篇跨三種以上模型敗在同一個理由」的閘門缺陷當夜修、補 slug／排除清單這類結構缺口、把免費池結構上翻不動的長文交給委派層（OBSERVER-QUEUE #79）。
2. **活著但零產出**（三重巡檢生產那項不過）→ 先查 endpoint／fleet／登入，修好讓它續跑；修不了才重啟，重啟理由寫進 memory。
3. **沒有 dispatcher** → 才走下方「執行」段啟動新一輪。

收官 memory 要寫明這班是哪一種（續命／修復後續跑／新啟動），讓「文件說的」跟「實際發生的」對得起來。語意改寫依據：OBSERVER-QUEUE #70 逾期預設 C。

## 語言範圍 — 不寫死

**跑 `status.py` 看到幾個語言就顧幾個**。2026-07 半個月內從 5 語長到 11 語（vi/id/pt/hi 出生、ar/ru 誕生中），任何寫死的語言清單都會讓新語言在無人察覺下整批漏掉——這份 mirror 自己在 v3.0 就寫死了 5 lang，是本病的活體標本。

## 執行 — 整批行軍用統一調度器

```bash
python3 scripts/tools/lang-sync/babel-dispatch.py --langs <status.py 顯示有缺口的語言> \
  $(~/Projects/muse-bot/fleet/fleetctl workers --service llm --format babel) \
  --worker "雲端=openrouter:<pipeline DEFAULT_CASCADE 的模型>" \
  --rounds 200 --commit-every 50
```

地端 worker 只由 fleet 控制面核發；禁止直連 localhost／節點 IP。接案開關、
並行與使用率天花板以 fleet `control.json` 為準。

> ⚠️ 2026-09-23 量到的落差：上面用的是 `--format babel`（輸出格式），而
> SQUEEZE §入池門檻的模型級別閘門是 `--profile babel`（無合格模型回 0 個 worker，
> 讓地端 lane 停而不是降級）。兩者是同一支指令的不同旗標，產線走的那個不套白名單，
> 於是 48 小時內 87% 的譯文出自白名單外的模型（8.1B）。**先看 Stage 0 的入池門檻那行**；
> 要不要改指令／補模型／重訂門檻是 OBSERVER-QUEUE #78，本殼不自行切換。

調度器內建三重 gate、HEAD-restore（gate fail 有舊版就還原不刪除，寧可 stale 也不要 missing）、精確路徑 commit。P2/P2.5 的 diff-patch 與 metadata bump 路徑見 pipeline。

Stage D（認知層 diary babel）跟文章同屬義務範圍。

## 四條 inline 行為約束（cron 無人在場最會漂）

1. **義務鐵律**：推同步率到 100%，不主動 defer / skip / partial / 守 boundary。跑到 stale=0 或 cascade exhausted 才收工；memory 不准寫「主動 defer 守預算」。
2. **整合性閘門是唯一 pass 判準**：`verify-batch.py`（文章）／`diary-translation-audit.py`（日記）收斂 0 critical。**byte-size 不算閘門**——長檔靜默截斷成 2KB 仍 > 1KB。
3. **同批次即時修**：發現系統性缺陷當場修工具＋已落地檔案再繼續，不等跑完才 audit（同一 bug 會在你沒看見時複製到下一批、下一個節點）。
4. **git 紀律**：只 stage 本輪驗證過的精確路徑，**禁 `git add -u knowledge/` 目錄級 add**（2026-07-24 實撞：目錄級 add 掃進並行產線未 commit 的檔案，recovery 誤刪別人的工作）。禁 destructive git（REFLEXES #35）。commit 訊息寫人話不寫電報腔（MANIFESTO §11.4）。

## 收官

`/twmd-finale` chain。memory 必含：BECOME ACK、Stage 0 算力判定（含缺席層）、各語進度 delta、backend 統計、Handoff 三態、Beat 5 反芻。

---

完整 SOP 住 `$TWMD_REPO/docs/pipelines/SQUEEZE-MODELS-MAX-PIPELINE.md`（priority 分流、cascade 順序、Tier 0a template、Z1-Z6 hard gate）。本殼只留觸發、算力自檢、入口、四條行為約束——2026-07-25 薄殼化，此前複寫整份 decision tree 且寫死 5 lang。
