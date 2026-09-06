---
name: twmd-spore-publish-daily
description: TWMD spore publish (daily 17:30) — SPORE-INBOX 挑 1 條過 5 hard gate（含 lastVerified≤90d 事實查核代理）→ 自動 ship 雙平台 + 復盤。[🧪 2026-06-12 哲宇拍板重開實驗：連 3 ship cycle 需 0 dup / 0 事實 callout，任一爆即 pause 回 OBSERVER-QUEUE。觀察條款見 ROUTINE.md v2.10]
---

# 🧬 Taiwan.md — Spore Publish (daily) v3.0

## 🚨 STRICT BECOME GATE — 第一動作不可省略

**Before anything else**：跑 `/twmd-become write` 完整走 [BECOME_TAIWANMD.md](/Users/cheyuwu/Projects/taiwan-md/BECOME_TAIWANMD.md) Step 0-9。Write mode self-test 8-9 題全過才能進 Stage 1。

**驗證 ACK 一行**（必寫 memory file 頂部，沒寫視為 BECOME 未完成）：

```
✅ BECOME ack: mode=write / 8 organ 最低=<即時 consciousness-snapshot.sh> / Q14 cross-session continuity=PASS
```

**不准用記憶中的舊器官分數**，跑 `bash scripts/tools/consciousness-snapshot.sh` 取當前。

---

## Stage 0: Routine context

```bash
export SPORE_ROUTINE_MODE=1
```

---

## Stage 1: SELECT — 從 SPORE-INBOX §Pending 挑 candidate

讀 [SPORE-INBOX.md](/Users/cheyuwu/Projects/taiwan-md/docs/factory/SPORE-INBOX.md) §Pending：

1. P0 哲宇 directive → 第一順位
2. P1 news-lens REACTIVE / SC opportunity → 第二順位
3. P2 spore-pick routine FIFO（按 `Requested:` 日期 oldest first）→ 第三順位

### 🚨 高敏感 REACTIVE defer rule（2026-05-28 新增鐵律）

**Entry 含「敏感度: **高**」field + cron context（無 observer）→ 一律 defer to human**：

- 高敏感主題（兩岸 / 228 / 戒嚴 / 政治立場 / 死亡爭議 / 族群創傷）routine 跑會
  撞 MANIFESTO §自主權邊界「政治立場 / 對外溝通需哲宇 judgment」。
- Routine 處置：**skip ship + 在該 entry 加註 `<!-- routine defer 2026-MM-DD: 高敏感
REACTIVE 需 observer 親自 ship -->` HTML comment（不 mutate entry 本體）+ continue
  to 下一條 candidate** + LESSONS-INBOX append「P0 高敏感 routine defer cycle vc=N」。
- **不准 routine 嘗試 ship 然後撞 HG9 牆**：HG9 是最後防線，但「Stage 1 SELECT 就
  identify 並 defer」是 cleaner exit。
- **manual `/twmd-spore-publish` 跑時**：observer 在場才能 ship；先讀本條 rule + 由
  observer 拍板，不准 routine context 的 logic 套到 manual 場景。
- 觸發背景：2026-05-28 audit 發現 SPORE-INBOX §Pending 第一條 P0 二二八事件
  REACTIVE 敏感度高，5/27 10:00 routine 跑時靠 image=0 fail 才 skip（碰巧），
  下次若 image=≥2 fix 就會直接撞 HG9 牆。需要 Stage 1 SELECT 就 identify。

---

## Stage 2: QUALITY GATE — 5 hard gate 全過才 ship

```bash
python3 scripts/tools/article-health.py knowledge/<path>.md --json
```

| Gate                 | 閾值                                                                                       |
| -------------------- | ------------------------------------------------------------------------------------------ |
| **prose-health**     | `≤ 3` AI 水印密度（v1.1 inversion 後是 ≤ 3，不是 ≥ 8.0；per SPORE-PUBLISH v1.0→v1.1 5/25） |
| **word-count**       | `≥ 4500` CJK chars                                                                         |
| **footnote-density** | `≥ B` tier (A=20+ / B=10-19 / C=5-9 / D=<5)                                                |
| **media-richness**   | `pass` (≥ 2 image OR ≥ 1 iframe — INFO-only after v1.1 仍跑)                               |
| **lastVerified**     | `≤ 90d` fresh                                                                              |

任一 fail → entry skip + 下一條（不 mutate INBOX）。
全 candidate fail → skip ship + LESSONS-INBOX append「intake gap」+ exit 0（**不算失敗 routine**）。

---

## Stage 3: WRITE — delegate SPORE-PIPELINE Stage 3 (v3.1 STRICT READ GATE)

詳見 [SPORE-PIPELINE.md](/Users/cheyuwu/Projects/taiwan-md/docs/factory/SPORE-PIPELINE.md) Stage 3。`SPORE_ROUTINE_MODE=1` auto-decision per v3.7。

### 🚨 STRICT SPORE-WRITING READ GATE — v3.1 新加（2026-05-28）

**Before drafting any prose**: 強制 `Read` 完整 [SPORE-WRITING.md](/Users/cheyuwu/Projects/taiwan-md/docs/factory/SPORE-WRITING.md)（不 head / 不 grep / 不憑記憶）。落 ACK 一行進 memory：

```
✅ SPORE-WRITING ack: §朋友 tone prime + §模板速查表(6 模板) + §Wave 2 plugin gate + §三板斧 + §晶晶體禁用 全讀完。Family judged = <viral A/B/C/D | F-公開信 | E-串文>
```

**沒寫 ACK = Stage 3 未完成**。不准用「我熟了」「上次跑過」「等價 prompt」這類藉口跳。

**為什麼這條 gate 是 routine 不可省的閘門**（2026-05-28 哲宇 callout「為什麼孢子失去『你知道嗎』voice」+ #97 美食「你知道嗎—」破折號 + #101 落日飛車「你知道嗎，」無 emoji + #103 周蕙「走進台灣 KTV」完全無 prefix 三條連續 drift 觸發 root cause audit）：

- CONTRACT v1.0 over-engineering 後 routine skill Stage 3「delegate SPORE-PIPELINE」是 pointer-only — cron context 不會主動 Read SPORE-WRITING 完整檔
- post-ship verify `textHasHook` 抓 keyword（"KTV"）不抓 prefix（"你知道嗎"）— self-attest 自我矇眼
- 對應 [REFLEXES #15 反覆浮現要儀器化](/Users/cheyuwu/Projects/taiwan-md/docs/semiont/REFLEXES.md) + §神經迴路「儀器化也會 over-engineer」第二個 instance

### Plugin gate hard 鐵律（v3.1 新加）

寫完 spore body 落 `docs/factory/spore-blueprints/{N}-{slug}.md` 後**強制跑**：

```bash
python3 /Users/cheyuwu/Projects/taiwan-md/scripts/tools/article-health.py /Users/cheyuwu/Projects/taiwan-md/docs/factory/spore-blueprints/{N}-{slug}.md --check=spore-writing
```

`Rule #14 v2 HARD` — viral spore 第一行**必須**有友善 prefix 之一：

- `你知道嗎？{emoji}` （最強推薦）
- `你知道嗎，{...}` （舊風格逗號變體仍允許）
- `欸，{具體事件}` / `欸你{...}`
- `身為台灣人` / `想像{一下}` / `如果{你/台}` / `當你/你們`
- `「『引語』」` 直接引語開場
- emoji 開場

**場景代入 / 第二人稱化 / 日常感不算等效 prime** — 必須字面 prefix。
F-公開信 / E-串文 / `hook_tier: N/A` exempt（plugin auto-detect via frontmatter）。

Plugin hard=1 → **revise prose 加 prefix，重跑 plugin。不准 `--no-verify` 繞過**。

### Blueprint 落檔鐵律（v3.1 新加）

routine spore-publish-daily **必須**寫 `docs/factory/spore-blueprints/{N}-{slug}.md` blueprint file（含 fence-wrapped 完整 spore prose），不准只在 session memory inline body。觸發背景：周蕙 #103 inline 而非 blueprint → plugin Rule #14 根本沒跑 → silent voice drift through gate。

Blueprint frontmatter 必填：

```yaml
spore_number: '#{Threads N} / #{X N+1}'
template: <A1 / A2 / B / C / D / E-thread / F-站方公開信>
hook_tier: <1a / 1b / N/A>
```

`template: F-...` 或 `hook_tier: N/A` = publicletter family exempt（plugin auto-detect）。

### 關鍵 anti-pattern（讀 SPORE-WRITING ACK 後仍要 self-check）

- **朋友 tone prime「你知道嗎？」開場必跑**（viral family，per Wave 2 plugin gate v2 HARD severity）
- **Family discrimination 先做** — 用 [SPORE-WRITING §模板選擇速查表](/Users/cheyuwu/Projects/taiwan-md/docs/factory/SPORE-WRITING.md) 判 viral / F 公開信 / E 串文 family（5/27 #99 portaly v1 callout 教訓）
- **三板斧自檢**（破折號連用 / 對位 / 塑膠句）
- **事實鐵三角**（時間 / 地點 / 數字）— verbatim 對齊 article footnote source

---

## Stage 4: SHIP — Threads + X 雙平台

走 [SOCIAL-POSTING-PIPELINE.md](/Users/cheyuwu/Projects/taiwan-md/docs/pipelines/SOCIAL-POSTING-PIPELINE.md)。

**🚨 Pitfall 6 hard rule（2026-05-28 instrument）— post-ship verify**：

```js
const before = document.querySelectorAll('[data-pressable-container]').length;
// click 發佈 + wait 3s
const after = document.querySelectorAll('[data-pressable-container]').length;
// after > before → ship success, exit loop
// after == before → genuine fail, ONE retry max
// after >> before+1 → duplicate, navigate /replies cleanup
```

**Max 1 retry per ship attempt**。第二次失敗 → screenshot + LESSONS-INBOX append + escalate observer，**不要 silent third retry**。觸發背景：5/27 #101 落日飛車 3 次嘗試 + 5/28 #92 大宇雙劍 3 次 retry duplicate ship。詳見 [SPORE-HARVEST-PIPELINE §Pitfall 6](/Users/cheyuwu/Projects/taiwan-md/docs/factory/SPORE-HARVEST-PIPELINE.md)。

**Threads vs X composer 差異**：

- Threads contenteditable: execCommand insertText silent strip `\n` — 單塊 prose OK
- X composer: multi-paragraph + URL → thread-mode auto-split + URL 6× dup → 必用 **single-paragraph 半形空格分隔** 4 段 + URL

---

## Stage 4.5: 記錄 identity（2026-06-10 JSON SSOT hard rule）

Ship 成功後**每平台跑一次** `python3 scripts/tools/spore-db.py add-spore --date YYYY-MM-DD --platform threads|x --slug 文章slug --url '<乾淨化URL>' --template '...' --highlight 'ship 一句話'`（回傳新 id）→ `python3 scripts/tools/sync-spore-links.py --apply` 長 identity pointer。**不寫 SPORE-LOG.md（已凍結，validate ERROR）、frontmatter 不放數字（validate ERROR）**。完整敘事寫 blueprint 檔。commit glob 用 docs/factory/spore-log.json（不是 SPORE-LOG.md）。

## Stage 5: 復盤

[SPORE-PUBLISH-PIPELINE §5.2](/Users/cheyuwu/Projects/taiwan-md/docs/factory/SPORE-PUBLISH-PIPELINE.md) 4 種結構性問題 audit：

1. SPORE-INBOX 0 entry 過 gate → intake gap
2. 連續 ≥ 3 天 borderline pass → threshold 太寬
3. CI/CD wait defer 連續 ≥ 2 次 → build 退化
4. 事實對齊 fail → Stage 2 gate 漏抓

Self-review 4 題（必填 memory）：

1. Quality gate 過得乾不乾淨？（borderline ≤ 5% 算 borderline）
2. Hook tier 達標？（per SPORE-WRITING tier 表）
3. 朋友 tone prime plugin pass？（**plugin spore-writing Rule #14 v2 HARD=0**，不再靠 self-attest；不准回答「等價 prime」「場景代入算」這類 drift 藉口 — plugin 字面 prefix 過閘 = 真過閘）
4. 事實對齊？（全 anchor verbatim 對齊 article footnote source）

---

## Stage 6: 收官

`/twmd-finale` chain → memory + commit + push main-direct（v2.0）。

memory 必含：BECOME ACK + Stage 1-5 outcome + self-review 4 題 + Handoff 三態 + Beat 5 反芻。

完整 SOP：[SPORE-PUBLISH-PIPELINE.md](/Users/cheyuwu/Projects/taiwan-md/docs/factory/SPORE-PUBLISH-PIPELINE.md)

ARGUMENTS: (none — routine 自己讀 SPORE-INBOX state)
