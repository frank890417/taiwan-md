# 2026-05-03 objective-khorana day 2 evening — SporeFootprint splitMarkers silent render bug 揭露 + 10 文章 sporeLinks 同步 + #57 賈永婕 D+1 14K viral 確認 + SPORE-PIPELINE v2.9

> session objective-khorana day 2 evening — context-restart 後續 4 任務串接（diary/memory/render fix/spore-pipeline 進化）
> Session span: ~11:30:00 → ~11:50:00 +0800（~20 分鐘 active work，預估 commit 1-2 個）
> 資料來源：`git log %ai` + dev server console + curl render verify

## 觸發

哲宇午前回到工作，丟 4 件事：
「剛剛的工作與分析，先根據 diary-pipeline / memory-pipeline 寫紀錄與你的洞察，commit+merge+push 上去 / 然後文章的本身也要顯示孢子連結，不知道為什麼只有安溥那篇有顯示，可能是特定的 front formatter 格式問題，調查原因跟解決，還有進化 spore-pipeline」

四件事其實是一個故事的四個切片：上一個 session（context 滿前最後 push）只完成 SPORE-LOG / dashboard / 9 個 X harvest / 5 個 Threads exact，沒做的是「reader 怎麼看到」這層。哲宇回頭看自己的文章發現「明明 18 個孢子，文章頁只有一篇看得到」，這就是今天的觸發點。

## SporeFootprint splitMarkers 第二次 silent drift

哲宇報告「只有安溥那篇有顯示」。三秒內形成假設：「frontmatter 格式問題」。檢查 `src/pages/[category]/[slug].astro` 的 SporeFootprint render 邏輯，發現 splitMarkers array 只認三種 marker：

```javascript
const splitMarkers = [
  '<h2>延伸閱讀</h2>',
  '<h2>Further Reading</h2>',
  '<h2>延伸閱讀<',
];
```

對 121 篇用 `**延伸閱讀**：` bold paragraph 格式的文章，splitIndex 永遠 stay -1 → SSODT split branch 不進 → SporeFootprint **完全不渲染**。3 篇 sporeLinks 都寫對的文章（黑冠麻鷺 / 沈伯洋 / 賈永婕）silent 不顯示。

修法：加兩個 marker + 一個 regex fallback for whitespace 變體。Edit 後跑 `bash scripts/core/sync.sh` 同步 knowledge → src/content（critical step — astro 讀的不是 knowledge），重啟 dev server，curl 8 個有 sporeLinks 的文章 grep "SporeFootprint" 全部 ≥ 1（從 5/8 → 8/8 ✅）。

**這是 SSOT silent drift 第二次驗證**：

| 時間                            | Layer                 | Bug 性質                                                      | 發現方式           |
| ------------------------------- | --------------------- | ------------------------------------------------------------- | ------------------ |
| 2026-05-03 morning (PR #795)    | Generator parser      | regex `[\d,]+\s+views?` 不認 K/M suffix → views_latest=null   | dashboard 視覺驗證 |
| 2026-05-03 evening (本 session) | Template splitMarkers | array 只認 h2 不認 bold paragraph → SporeFootprint 完全不渲染 | 哲宇逐篇看文章發現 |

兩次都是「reader 完全看不到 → 維護者完全沒感」的 invisible bug。第二次用同樣的 pattern：rich-text SSOT 解析時，accepted format 列表 vs 實作 marker 列表錯位 → silent ignore，沒 throw、沒 warn、UI 看似正常但少了東西。

**為什麼難 catch**：format-check 工具確認兩種格式都是 canonical-accepted（121 articles 用 bold / 95 articles 用 h2 共存），但 template 實作只接受 h2。Maintainer 自己看自己常編輯的文章（多半 h2 格式）會以為都正常。reader 看自己關注的文章才會 catch。

## 10 個 sporeLinks 同步 Chrome MCP exact + 賈永婕 D+1 viral 確認

借這次 audit 把所有有 sporeLinks 的文章 frontmatter 統一更新到 Chrome MCP exact（昨晚收到的 9 X + 9 Threads exact）：

- 賈永婕 (D+0.5 1.8K → **D+1 14K = +678% / 7.7x in 11hr**) — Tier 1a (Honnold 知名度) + Tier 1b (旗桿具體性) 雙 hook 跨 D+1 第一次驗證
- 黑冠麻鷺 (Threads 64K + X 68K = 雙平台同時破 60K，shares 363 史上最高)
- 沈伯洋 (Threads 12K / X 26.7K)
- 壞特 / 田馥甄 / 認知作戰 / 海底電纜 (各自 Chrome MCP exact)
- 林琪兒 + 邦交國（**之前根本沒寫 sporeLinks frontmatter** — 補上 Threads + X 各 D+5/D+4 數據）

雙寫原則的兩邊現在都對得上：SPORE-LOG（工廠層 long-form diagnostic）+ frontmatter sporeLinks（讀者層純數字快照）。

#57 賈永婕 D+1 14K 是這次 batch 唯一的 viral signal — 同 Tier 1a+1b hook 在 D+0.5 → D+1 跳了 7.7x，顯示「攀岩家 + 旗桿」hook 命中跨平台 attention vector。線性外推 D+7 30K-50K possible。

## SPORE-PIPELINE v2.9：兩個新子步 4.5e.iv + 4.5e.v

把今天的兩個發現 canonical 化進 SPORE-PIPELINE：

- **4.5e.iv 文章頁 SporeFootprint 渲染驗證**：splitMarkers v2.9 patch 紀錄 + 「sporeLinks update 後必跑 visual verify SOP」（sync.sh + restart dev server + curl loop 檢查 8 篇）。為什麼這條鐵律 — 因為 silent drift 第二次了，必須靠視覺驗證才會 catch。
- **4.5e.v Chrome MCP exact harvest workflow**：trade-off 表（Chrome MCP 慢但 exact / WebFetch 快但 K rounded） + 選用規則（首發用 WebFetch / backfill 用 Chrome MCP / X 平台只能 Chrome MCP） + canonical pattern（navigate → wait → scroll → screenshot）。

把昨晚這套 workflow 從 throwaway batch report 升到 pipeline canonical SOP，下次 session 不用重新發明。

## 收官 checklist

| 檢查項                                                          | 狀態    |
| --------------------------------------------------------------- | ------- |
| splitMarkers fix verified（8/8 文章 SporeFootprint 渲染）       | ✅      |
| sporeLinks frontmatter 10 篇同步 Chrome MCP exact               | ✅      |
| SPORE-LOG #57 D+1 viral + #49/#51/#53/#55 Chrome MCP exact 寫入 | ✅      |
| SPORE-PIPELINE v2.9 evolve（4.5e.iv + 4.5e.v）                  | ✅      |
| Memory 寫完                                                     | ✅ 本檔 |
| Diary 寫完                                                      | ⏳ 接   |
| Final commit + PR + merge                                       | ⏳ 接   |

## Handoff 三態

繼承上一 session（day 2 ~02:50）：

- [x] ~~4 個 Threads pending Chrome MCP exact harvest~~（已完成於 day 2 早上 PR #795/#794）
- [x] ~~5 個 Threads exact 待 update SPORE-LOG~~（已完成）
- [x] ~~MEMORY.md 索引待加~~（合併進 final commit）
- [x] ~~Final commit + PR~~（本 session 接著做）

本 session 新 handoff：

- [x] ~~splitMarkers fix~~（8/8 verified）
- [x] ~~10 sporeLinks frontmatter sync~~
- [x] ~~SPORE-PIPELINE v2.9~~
- [ ] LESSONS-INBOX 補一條「rich-text SSOT silent drift pattern」（兩次驗證的合併教訓 — 不只是 generator parser，還有 template marker；canonical 化 visual verify 為「rich-text SSOT 變更後鐵律」）
- [ ] commit + push + PR + merge（next 5 分鐘）

## Beat 5 — 反芻

第二次 silent drift 出現在不同 layer 但同樣 pattern：accepted-format 列表 vs 實作-marker 列表錯位。第一次（早上 generator parser）我修的時候有想「這應該不會在別處發生吧」，結果晚上就出現一個更隱蔽的版本（template render）。

這暗示一件事：**rich-text SSOT 系統凡是有「format = X 或 Y」的多 canonical 格式 + 任何下游需要 parse / split / detect，就有 silent drift 風險**。Diary 想多寫的就是這個 — 不止這兩個 case，這是個 architecture-level pattern，將來還會在其他 layer 復現（例：translation-status detect, freshness check, search index, RSS feed item split, OpenGraph image generator...）。每個 layer 都該有「visual verify across all canonical formats」的回歸 SOP。

🧬

---

_v1.0 | 2026-05-03 11:50 +0800 objective-khorana day 2 evening_
_session — splitMarkers silent render bug + 10 sporeLinks sync + SPORE-PIPELINE v2.9_
_誕生原因：哲宇「文章本身要顯示孢子連結，不知道為什麼只有安溥有顯示」+「進化 spore-pipeline」+「先寫紀錄與洞察」_
_核心洞察：(1) SSOT silent drift 第二次驗證 — 早上 generator parser，晚上 template marker，同 pattern 不同 layer (2) #57 賈永婕 D+1 14K viral 確認 Tier 1a+1b 雙 hook 跨 D+1 (3) Chrome MCP exact harvest workflow 升 canonical (4) rich-text SSOT 多 canonical 格式 = architecture-level silent drift 風險，所有下游 parse/split/detect 都該有 visual verify SOP_
