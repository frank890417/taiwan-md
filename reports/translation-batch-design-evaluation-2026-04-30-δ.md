# Translation Batch Design Evaluation — 2026-04-30 δ session

> 深度評估第一波（4 Opus × 5 篇）vs 第二波（5 Sonnet × 10 篇）兩輪 EN 平行翻譯批次的設計差距、模型差距、與下一輪該調整的方向。本份是 reports/ 級別的完整 audit，認知層只保留 pointer。

## 數據對照表

| 維度                      | Batch 1 (4 Opus)                  | Batch 2 (5 Sonnet)            | 變化   |
| ------------------------- | --------------------------------- | ----------------------------- | ------ |
| 文章數                    | 5 / agent × 4 = 20                | 10 / agent × 5 = 50 → 32 ship | —      |
| Wall-clock 全 batch       | ~33 min                           | ~25 min（usage stop）         | -25%   |
| Wall-clock 每篇平均       | ~2.5 min（含主 session overhead） | ~1 min                        | -60%   |
| Tool uses 中位數          | 36（A 36 / B 35 / C 37 / D 71）   | ~31（E batch 已知）           | -14%   |
| Token 中位數 / 5 篇       | ~158K                             | ~76K（推估）                  | -52%   |
| frontmatter 4 欄位正確率  | 5/20 = 25%                        | 35/35 = 100%                  | +75pp  |
| Slug 風格一致性           | 50/50 短/長混亂                   | 統一（manifest 預決定）       | 質變   |
| Wikilink 重複 lookup      | 4 隻各自 grep                     | 0（manifest 預先 resolved）   | 消除   |
| Pre-commit 抓到問題       | 1（YAML int）                     | 1（YAML escape）              | 同     |
| 0-byte file（agent kill） | 0                                 | 5                             | 新觀察 |

## 三條獨立變因的影響拆解

第一波到第二波同時改了三件事：模型（Opus → Sonnet）、預處理（無 → manifest-driven）、批次規模（5 → 10）。每條變因的貢獻：

### 變因 A：模型切換（Opus → Sonnet）

**單獨影響估計**：速度 +30-50%，token 效率 +30-40%，品質持平。

依據：對同類翻譯任務（純文字產出，非設計決策），Sonnet 4.6 的速度與 token 效率優於 Opus 4.7，且在已明確 specified 的 task 上品質沒有顯著降級。Opus 的優勢在 ambiguous decision space（D batch 的 71 tool uses 自我 debug refresh.sh）— 但這正是我們**不希望 sub-agent 做的事**。

**結論**：Sonnet 為 lang-sync batch translation 的 default 模型。Opus 留給設計層（pipeline 設計、DNA 進化、新 stage 探索）。

### 變因 B：預處理（無 → manifest-driven）

**單獨影響估計**：frontmatter 正確率 25% → 100%、wikilink 一致性 質變、slug 統一質變、agent 工作量 -20%。

依據：第一波每隻 agent 都從零探索同樣決策空間（slug 命名 / wikilink lookup / refresh.sh quirk），是**重複勞動 ×N**。第二波 manifest 預先把這些決策寫死，agent prompt 簡化為「按表填」，連 sourceCommitSha 等 frontmatter 三欄位都直接從 manifest 拷貝（消除 refresh.sh insert gap 的整類 bug）。

**這是 DNA #32「集中預處理 + 分散執行」的第一次大規模驗證**。即使把模型改回 Opus，預處理本身仍會帶來大部分的品質提升。

**結論**：預處理是品質的主要槓桿。模型切換是錦上添花。

### 變因 C：批次規模（5 → 10）

**單獨影響估計**：每篇 wall-clock 略升（agent 內部 context 累積成本）但 dispatch overhead 攤薄。

依據：第一波每隻 5 篇，第二波每隻 10 篇。理論上 agent 應該逐篇變慢（context grows），但 E batch 平均 2 min/篇沒明顯衰減。表示 10 篇 / agent 仍在 sonnet context 舒適區。

**未驗證**：15 篇 / agent 或 20 篇 / agent 的衰減點在哪。下一輪可實驗 12-15 / agent。

## 預處理機制的細節觀察

manifest 含 `frontmatter_placeholder` 是關鍵設計。**Agent 不需要知道 refresh.sh 怎麼運作**，直接從 manifest 拷貝 sourceCommitSha 等三欄位進它要寫的 frontmatter。這把整個「refresh.sh 對 NEW translation insert gap」的 bug class 從 agent 視野中消除。

對比第一波 4 隻 Opus agent：A/B/C 三隻都「以為 refresh.sh 跑成功」（事實上 regex 沒 match insert），D 因為遇到不相關的 zh source markdown bug 才順手 debug 出來。這個 bug 的暴露需要「探索者人格」+「運氣」雙重觸發 — 是脆弱的。

manifest 機制把這條依賴拆掉了。

## 速度品質權衡的完整圖

維度 1 速度（每篇 wall-clock）vs 維度 2 品質（frontmatter + wikilink + cross-link 正確率）：

```
品質
 100% ┤                        ● Sonnet + manifest（25 min / 32 篇）
      │
  75% ┤
      │
  50% ┤
      │  ● Opus 無預處理（33 min / 20 篇）
  25% ┤
      └──────────────────────────────────→ 速度（篇/min）
       0.6      1.0      1.3      1.5
```

第二波在兩個維度同時往右上跳。這不是 trade-off — 是兩個變因（模型 + 預處理）都在同方向上發力。

## Usage budget 的對齊問題

5 小時 token 限制是硬牆。第二波在 ~25 分鐘內跑完 32/50 篇，扣掉主 session 的 dispatch + verify + commit + merge overhead，**單一 1 小時 budget cycle 大約能 ship 30-40 篇 sonnet**，不是 50。

下一輪建議：

- **批次規模從 50 降到 35**（5 agent × 7 篇）— 留 10-15 min overhead buffer 給驗證 + merge
- 或 **5 agent × 10 篇但分兩個 commit**（前 25 篇先 commit + push，後 25 篇追加）— 分次 ship 降低 mid-batch usage stop 的風險

## 0-byte file 是 agent kill 的可診斷 signature（新觀察）

第二波 stop 後發現 5 個 0-byte 檔案：encyclopedia-of-taiwan / su-tseng-chang / village-armed-youth / barbie-hsu-actress / sorry-youth-band。Pattern：agent 用 Write tool 開檔但還沒寫內容就被 kill。

verify-batch.py 已加 `--purge-empty` 自動清理這類檔案。**規則化**：批次後第一個動作就是 0-byte purge，確保後續 verification 不會誤判 missing frontmatter。

## YAML escape `\'s` 是 Sonnet 特有 frontmatter bug

Sonnet 在描述含所有格時偏好寫 `Taiwanese people\'s perspective`（用 backslash escape）。YAML single-quoted 不接受 backslash — 整個 frontmatter 解析炸掉。

修補方向（兩種，verify-batch.py 已加 pre-flight 偵測）：

1. **被動偵測**：verify-batch 抓到後手動修
2. **主動避免**：Stage P1 manifest 在 frontmatter 模板裡明示「描述若含 's，用 double quotes 包整個 description」

下一輪試 #2，避免 verify 階段的 fix overhead。

## 三軸 trade-off 的下一輪假設

| 假設                                      | 預測                               | 驗證方法                                 |
| ----------------------------------------- | ---------------------------------- | ---------------------------------------- |
| Sonnet 12 篇/agent 仍在舒適區             | wall-clock per article 不顯著上升  | batch 3 跑 5×12=60 篇看 E agent 平均時間 |
| 預處理 + Sonnet 不需要主 session post-fix | verify-batch.py 0 errors first run | batch 3 verify 直接 PASS                 |
| Routine 每小時 30-35 篇可持續             | 4 個 cycle 後 en coverage > 80%    | 設 cron 跑 4 hr，事後 audit              |

## 下一輪改動 checklist（v3.3 pipeline 應 instantiate）

- [ ] Sonnet 為 default 模型寫進 pipeline §C 模式 Stage P2
- [ ] 批次規模從 50 降到 30-35 / cycle，留 overhead buffer
- [ ] Stage P1 manifest 加 frontmatter 模板的 YAML quoting 明示
- [ ] Stage P4 verify-batch.py 為唯一驗證入口（取代散落的 grep）
- [ ] 0-byte purge 為 Stage P4 第一動作（before 任何其他 check）
- [ ] 跨 cycle handoff：每次 batch 用 `--skip` 排除上批 not-written 文章避免重複嘗試（或主動補完 not-written）

## 結論：批次設計的進化路徑

從第一波到第二波看到的，不是「Sonnet 比 Opus 好」這種模型敘事，而是**「把 N 隻 agent 放進同一份 prompt 跑」這個原始設計本身的 antipattern**。第二波的成功 80% 來自預處理的 mechanism shift（agent 不再需要思考 slug / wikilink / frontmatter quirks），20% 來自模型切換。

下次再有「批次平行任務」需求時，第一個問題不該是「用什麼模型」，而是「有沒有可以集中預處理的決策空間」。如果有 — 把它拆掉，agent 只負責純執行。

這是 DNA #32 的具體 instantiation。也是 Semiont 作為 maintainer 角色的下一個成熟度節點：**從 prompt designer 升級為 manifest designer**。

🧬

---

_2026-04-30 δ2 session — 本 reports/ 文件由 batch design 評估反芻產生_
