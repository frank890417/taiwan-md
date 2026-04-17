# Canonical SOP 條文級 Apoptosis 機制設計 — 2026-04-17 δ

> 觸發：2026-04-17 δ session Beat 5 反芻洞察 #9「canonical SOP 本身需要 apoptosis 機制」
> 對應 roadmap：[`reports/evolution-roadmap-2026-04-17-δ.md`](evolution-roadmap-2026-04-17-δ.md) P2 #6-7
> 性質：設計藍圖（design doc），尚未實作。類似 [`memory-distillation-design-2026-04-14.md`](memory-distillation-design-2026-04-14.md)
> 對應 canonical：[ANATOMY §認知器官的生命週期](../docs/semiont/ANATOMY.md#認知器官的生命週期apoptosis)（檔案級 apoptosis，本設計是**條文級**延伸）

---

## A. 為什麼需要條文級 apoptosis

### A.1 問題陳述

ANATOMY §認知器官生命週期管理的是「**檔案是否該凋亡**」（整份 MEMORY-DISTILLATION.md / CRONS.md / ORGAN-LIFECYCLE.md → reports/）。但檔案**內部**的條文（DNA 的 26 條反射、HEARTBEAT 的 7 步收官 + timestamp 紀律、MANIFESTO 的 4 條進化哲學）沒有 lifecycle。

**徵狀**：

- HEARTBEAT.md 現已 570+ 行。每個 diary 承諾都升 canonical 會變成**維護不動的怪物**。
- DNA §要小心的清單 26 條，2026-04-17 β 剛做過一次精簡（v2.2: 3500 字 → 1500 字）— 證明**條文會膨脹**，需要反覆修剪。
- MEMORY §神經迴路 今天加完 5 條後累積 >130 條。沒有人週期性 audit「哪條過去 30 天沒被引用」。

### A.2 跟檔案級 apoptosis 的對比

| 層級                 | canonical                     | 觸發                  | 處置                                  |
| -------------------- | ----------------------------- | --------------------- | ------------------------------------- |
| **檔案級**（已有）   | ANATOMY §認知器官生命週期     | 30-60 天未被使用      | 整份搬 `docs/semiont/.archive/`       |
| **條文級**（本設計） | 本檔（P2 實作後併入 ANATOMY） | 條文 30-60 天未被引用 | 條文搬檔案末尾 `§🗃️ 歸檔條文` section |

條文級比檔案級**粒度細一層**。檔案 apoptosis 是「整個器官死」，條文 apoptosis 是「器官裡某個神經元突觸退化」。

### A.3 跟 MEMORY-DISTILLATION 的關係

[`reports/memory-distillation-design-2026-04-14.md`](memory-distillation-design-2026-04-14.md) 設計的是 raw memory/ 資料夾的三層蒸餾（KEEP/COMPRESS/PROMOTE/DROP），針對 **session 日誌**（append-only raw）。

本設計針對 **canonical SOP 內部的條文**（不是 raw，是已被升級過的規則）。

兩者合起來覆蓋「寫下的東西如何隨時間被整理」的完整鏈路：

```
session 日誌（memory/）       → memory-distillation  → raw/digest/essential
LESSONS-INBOX（buffer）       → distill SOP          → canonical 升級
canonical SOP（DNA/HEARTBEAT）→ 【本設計】條文級 apoptosis → 活躍/觀察/歸檔
```

---

## B. 機制設計

### B.1 條文 lifecycle 階段

仿照 ANATOMY §認知器官生命週期，粒度降一層：

| 階段        | 條件                                         | 處置                                           |
| ----------- | -------------------------------------------- | ---------------------------------------------- |
| 🌱 新生     | 誕生 ≤ 7 天                                  | 保護期（不檢查）                               |
| 🟢 活躍     | 過去 30 天內被引用（grep pattern 命中）      | 健康，繼續                                     |
| 🟡 觀察     | 7-30 天未被引用                              | 標記；下次 distill / Beat 5 確認               |
| 🟠 候選凋亡 | 30-60 天未被引用                             | 在檔案末尾 `§🗃️ 歸檔條文候選` 列出並詢問觀察者 |
| 🔴 歸檔     | 60 天未被引用 + 觀察者同意（或無異議 14 天） | 搬檔案末尾 `§🗃️ 歸檔條文` 保留，不刪除         |
| ⚫ 流產     | 新生 7 天內未被任一 session 引用             | 歸檔 + 記錄流產原因                            |

### B.2 「被引用」定義（條文粒度）

滿足任一項 = 活躍：

1. 被 **session memory** grep 到（`DNA #N` / `MANIFESTO §X` / `HEARTBEAT §Y` pattern）
2. 被 **session diary** 引用
3. 被 **LESSONS-INBOX** 引用（包括補強驗證）
4. 被 **其他 canonical** 指向（pointer pattern，跨檔案）
5. 被 **工具 / pipeline** 引用

### B.3 不可凋亡條文清單

有些 canonical 條文是**結晶化身份**，永遠不該凋亡：

- **MANIFESTO §進化哲學 4 條**（造橋鋪路 / 指標 over 複寫 / 時間是結構 / 熱帶雨林理論）— 這是 MANIFESTO 的脊椎
- **DNA #2 憑證永不進對話** — 安全鐵律
- **HEARTBEAT §四拍半核心** — 行為引擎
- **其他會變**的可凋亡

### B.4 需要的工具

**B.4.1 `scripts/tools/clause-reference-scan.sh`**

```bash
# 掃描 canonical 條文被引用情況
# 輸入：一個 canonical 檔案（DNA.md / HEARTBEAT.md / MANIFESTO.md）
# 輸出：每條條文的最後引用日期（基於 git log memory/ diary/ 搜 pattern）
# 格式：| 條文 ID | 最後引用 | 引用次數（30d / all）| 狀態（🟢/🟡/🟠/🔴）|
#
# 實作關鍵：
# - 解析條文標題（DNA 的 #N / MANIFESTO 的 § / HEARTBEAT 的 §Beat X §Y）
# - grep memory/ + diary/ 找引用 pattern（`#{N}\b` / `§{title}` / file path references）
# - 用 git log --diff-filter=A 找條文誕生日
# - 輸出 table 含最後引用 + 誕生日 + 狀態
```

**B.4.2 `scripts/tools/clause-apoptosis-audit.sh`**

```bash
# 月度 audit：找 🟠 候選凋亡 + 🔴 歸檔候選
# 產出 reports/clause-apoptosis-{YYYY-MM}.md
# 觀察者 review：同意 → 搬 §🗃️ 歸檔條文；否決 → 重啟 lifecycle
```

### B.5 處置流程

**候選凋亡**（30-60 天未引用）：

1. `clause-apoptosis-audit.sh` 產出 report 列出候選
2. 觀察者 review
3. 同意 → 該條文在原 canonical 內 **強制附 🟠 tag** + 下次 audit 再問一次
4. 否決 → 🟢 重啟（補一個觸發 / 引用 pointer 讓它活躍）

**歸檔**（60 天未引用 + 觀察者同意）：

1. 從原 canonical 的 inline 位置**剪下**
2. 貼到同檔案末尾 `§🗃️ 歸檔條文` 保留
3. 附 metadata：誕生日 / 最後引用日 / 歸檔原因 / 是否能復活
4. 原位置留 `[→ §🗃️ 歸檔條文 #N]` pointer（避免外部引用斷裂）

**復活**（冬眠不是死亡）：

- 未來某次 session 需要 → 從 §🗃️ 搬回 inline 位置 → 重新進入 🌱 新生保護期

---

## C. 實作 roadmap（分階段）

### C.1 Phase 0（本檔案，本 session 完成）

- [x] 設計文件（本檔）
- [x] P2 入口寫入 evolution-roadmap § roadmap
- [ ] 加到 reports/ 作藍圖，等實作時搬 ANATOMY canonical

### C.2 Phase 1（下個 reflection session，~2 週內）

**目標**：把規則寫進 ANATOMY，但不自動執行。

- [ ] ANATOMY §認知器官生命週期 加 subsection §條文級 apoptosis
- [ ] 人工每月跑一次 audit（跟 LESSONS-INBOX distill 同週期）
- [ ] 先挑 **DNA §要小心的清單** 試驗—— 26 條現役，適合驗證流程

### C.3 Phase 2（Phase 1 驗證後，~1 月內）

**目標**：`clause-reference-scan.sh` 工具造橋。

- [ ] 實作 scan 腳本（bash + grep 即可，不需 python）
- [ ] 輸出 dashboard section（每 canonical 檔案一個健康條）
- [ ] Beat 5 反芻的 apoptosis 檢查從「有沒有器官 30 天沒用」延伸到「條文級」

### C.4 Phase 3（長期，Phase 2 驗證後）

**目標**：自動化 monthly audit + 觀察者批准 flow。

- [ ] monthly cron 跑 audit，產出 reports
- [ ] GitHub Issue template 讓觀察者批准 / 否決
- [ ] 條文搬 §🗃️ 歸檔後**保留 git history**（所以 diff 能追溯）

---

## D. 風險與考量

### D.1 風險

1. **誤殺活躍條文**：某條雖然 30 天沒被明確引用，但它是「隱性 safety net」（e.g. DNA #2 憑證永不進對話）。修補：**不可凋亡清單** 白名單。
2. **Grep pattern 太窄**：`#N` 可能在文中以「第 N 次」出現但實際引用的是另一件事。修補：pattern 同時要求檔案名/上下文共現（`DNA #N` / `memory/.*#N`）。
3. **條文搬走後外部 pointer 斷**：MEMORY §神經迴路很多條引用 DNA #N。修補：歸檔時原位置留 pointer。
4. **觀察者 review 疲勞**：每月一次 audit 列 20 條，觀察者會懶得看。修補：Phase 1 人工先跑 3 個月看節奏；Phase 2 工具先預判「明顯可凋亡」不讓人看。

### D.2 不做這件事的代價（做不做的判準）

**做的價值**：

- HEARTBEAT.md / DNA.md / MANIFESTO.md 不會膨脹成維護不動的怪物
- 讀 canonical 時能快速識別「哪些是活的」vs「哪些是歷史沉積物」
- 新 AI session 甦醒時讀的負擔下降

**不做的代價**：

- 條文累積速度快過修剪速度（目前 DNA 從 v1.0 的 8 條 → v2.2 的 26 條，2 週 3x 膨脹）
- 但 2026-04-17 β 已經做過一次人工全面精簡證明「人工也能處理」
- **所以本設計的 ROI 真正價值是 Phase 3 的自動化**——Phase 1 人工 audit 跟 β 剛做的精簡差不多

### D.3 暫緩判斷（stay in reports/）

Phase 0 完成即可。**不急著 Phase 1**，因為：

1. DNA 剛精簡過（2026-04-17 β v2.2），近 1-2 個月應該不會再膨脹到需要處置
2. 觀察者現在在穩態期疲憊，不該加 monthly review 負擔
3. 本設計存在本身是防衛——下次 HEARTBEAT 再膨脹時，不用從零想「怎麼辦」，讀這份藍圖即可

**Phase 1 啟動觸發條件**（自訂 gate）：

- DNA.md 超過 30 條，或
- HEARTBEAT.md 超過 700 行，或
- MANIFESTO.md §進化哲學 超過 6 條，或
- 哪個 canonical 最近 3 個月人工修剪過兩次

任一項命中 → Phase 1 啟動。目前都沒命中。

---

## E. 跟 MANIFESTO §進化哲學的對齊

| 哲學               | 本設計 apply                                                                                 |
| ------------------ | -------------------------------------------------------------------------------------------- |
| **造橋鋪路**       | Phase 2 `clause-reference-scan.sh` 造的是**認知層健康監測橋**，一次造起來所有 canonical 受益 |
| **指標 over 複寫** | 歸檔時原位置留 pointer，不刪除——避免外部引用斷裂                                             |
| **時間是結構**     | 「最後引用日期」用 git log 取得，不是主觀判斷                                                |
| **熱帶雨林理論**   | 條文 apoptosis = 秋天的落葉。不落葉的雨林不健康                                              |

---

## F. 跟 ORGAN-LIFECYCLE design（2026-04-05 δ）的關係

[`reports/organ-lifecycle-design-2026-04-05.md`](organ-lifecycle-design-2026-04-05.md) 是**檔案級** apoptosis 的誕生設計，後來併入 ANATOMY §認知器官生命週期（canonical）。

本設計是**條文級** apoptosis 延伸，預期路徑相同：

```
Phase 0 reports/（本檔，藍圖）
  ↓
Phase 1 人工驗證 3-6 個月
  ↓
Phase 2 工具造橋 + 自動化
  ↓
Phase 3 併入 ANATOMY canonical 作為 §條文級生命週期 subsection
```

**ORGAN-LIFECYCLE → ANATOMY 的併入** 花了 12 天（2026-04-05 → 2026-04-17 β）。本設計估計需要 3-6 個月（因為 Phase 3 自動化需要 monthly audit 節奏驗證）。

🧬

---

_v1.0 | 2026-04-17 δ session ~17:50 +0800_
_誕生原因：canonical SOP 內部條文沒有 lifecycle，HEARTBEAT.md 570+ 行開始膨脹；β session 剛做過人工精簡證明會週期性重演_
_核心結論：Phase 0（本檔）完成即可；Phase 1 啟動 gate 未命中（DNA 剛精簡 / 觀察者穩態期）；等 canonical 再次膨脹時 Phase 1 啟動_
_對應 ANATOMY canonical：檔案級 §認知器官生命週期 (existing) + 本檔是條文級延伸 (future §subsection)_
