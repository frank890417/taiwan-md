# TOOL-INVENTORY — 工具覆蓋矩陣

> 相關：[docs/semiont/DNA.md](../../docs/semiont/DNA.md)（工具基因）| [UNKNOWNS.md](../../docs/semiont/UNKNOWNS.md)（已知未知）

> **2026-05-04 SSOT migration完成**：27+ scattered tools 收攏成 13 plugin SSOT
> entry point `scripts/tools/article-health.py`。8 個 deprecated shell script
> 在 cleanup-1-4 完全刪除（wikilink-validate.sh / format-check.sh /
> check-manifesto-11.sh / quality-scan.sh / footnote-scan.sh /
> check-footnote-urls.sh / article-image-health.sh / footnote-format-fix.sh）。
> 詳見 `reports/article-health-ssot-design-2026-05-04.md`.

---

## SSOT plugin matrix（auto-gen，don't edit by hand）

由 `scripts/tools/article-health.py --inventory` 自動產生：

| Check                | Dimension     | Default Severity | Editorial Ref                                     | Auto-fix? |
| -------------------- | ------------- | ---------------- | ------------------------------------------------- | --------- |
| `cjk-punct`          | punctuation   | hard             | EDITORIAL.md §半形標點禁用                        | ✓         |
| `cross-reference`    | structure     | info             | EDITORIAL.md §wikilink                            | —         |
| `footnote-density`   | citation      | warn             | A-F grading（原 footnote-scan）                   | —         |
| `footnote-format`    | citation      | hard             | .husky/pre-commit footnote format gate            | —         |
| `footnote-url`       | citation      | warn             | network HEAD check（opt-in）                      | —         |
| `format-structure`   | structure     | warn             | EDITORIAL.md §三 + REWRITE-PIPELINE Stage 4       | ✓         |
| `frontmatter-format` | frontmatter   | warn             | REWRITE-PIPELINE.md Stage 4 Frontmatter 完整性    | —         |
| `frontmatter-title`  | frontmatter   | warn             | EDITORIAL.md §Title 五原則                        | —         |
| `image-health`       | media         | hard             | REWRITE-PIPELINE Stage 4.5f / DNA #30             | —         |
| `link-target`        | structure     | hard             | Astro category routing + knowledge path existence | ✓         |
| `prose-health`       | prose-quality | warn             | EDITORIAL.md §quality-scan + MANIFESTO.md §11     | —         |
| `terminology`        | language      | hard             | TERMINOLOGY.md                                    | —         |
| `wikilink-target`    | structure     | hard             | EDITORIAL.md §wikilink                            | —         |

CLI entry：

```bash
# 單檔全 profile
python3 scripts/tools/article-health.py knowledge/Nature/黃魚鴞.md

# 特定 profile (pre-commit / rewrite-stage-3 / release-pr / dashboard)
python3 scripts/tools/article-health.py file.md --profile=pre-commit

# 單 check
python3 scripts/tools/article-health.py file.md --check=cjk-punct

# 全 zh-TW sweep + JSON
python3 scripts/tools/article-health.py --all --output=json
```

7 stage profiles 對應到 REWRITE-PIPELINE Stage 1-5 + pre-commit + release + dashboard。

---

## Legacy tool matrix

下方表格紀錄原始 27+ 工具中**未被 SSOT 涵蓋**的部分 + facade 狀態。SSOT-already-covered 的工具在
`scripts/tools/lib/article_health/checks/` 找對應 plugin。

---

## 覆蓋矩陣

| 工具                          | 檢查維度                                                                         | 被誰呼叫          | 重疊 / 備註                                                              |
| ----------------------------- | -------------------------------------------------------------------------------- | ----------------- | ------------------------------------------------------------------------ |
| **people-title-check.sh**     | People/ 類 title 冒號三明治遵守率（EDITORIAL §原則 5，Issue #618）               | 手動（advisory）  | 新工具 v1.0（2026-04-27），不擋 commit；dashboard KPI 用                 |
| **cross-link.sh**             | Stage 5 雙向延伸閱讀互動分析                                                     | 手動（Stage 5）   | 與 SSOT cross-reference plugin 互補（互動式 prompt vs 自動掃）           |
| **review-pr.sh**              | 五層免疫審核（CI 門檻）                                                          | PR 時手動 / CI    | 聚合器：呼叫 article-health.py + 其他檢查                                |
| **footnote-format-fix.py**    | 4 source format normalizer + 60+ domain → desc 自動 resolve                      | 手動 / batch heal | 唯一保留的 .py auto-fix（DNA #48 canonical）                             |
| **check-cjk-punct.py**        | CJK 標點 auto-fix（SSOT plugin 也有 check 但 .py 提供 --fix）                    | 手動 / pre-commit | SSOT cjk-punct plugin 的 facade fix wrapper                              |
| **terminology-yaml-audit.py** | YAML 詞庫交叉驗證（Issue #288 Step 3：3-tier 報告 — 自動刪 / 高可信留 / 人工審） | 手動              | 跟 SSOT terminology plugin 互補（plugin 掃文章；audit 掃 YAML 詞庫品質） |
| **terminology-yaml-clean.py** | YAML 詞庫清理（display.china messy entries：含 `/` 或括號說明的清整）            | 手動              | yaml-audit 的對應 fix                                                    |
| **terminology-yaml-dedup.py** | YAML 詞庫跨來源去重：(taiwan, china) 配對重複偵測                                | 手動              | `--fix` 自動合併重複；新來源批量匯入後應執行                             |
| **terminology-prose-fix.py**  | 文章 prose 中國用語批次修復：A 類 → 台灣用語                                     | 手動              | 跟 yaml-\* 三工具不同：操作 knowledge/ 文章而非 data/ YAML               |
| **verify-internal-links.sh**  | 站內連結 broken ratio < 1%                                                       | postbuild + 手動  | 對 dist/ 跑（需 build 後才能跑）                                         |
| **check-freshness.js**        | 文章新鮮度（lastVerified 時效）                                                  | 手動              |                                                                          |
| **generate-content-stats.js** | 內容統計（字數、分類分布）                                                       | Dashboard + cron  |                                                                          |
| **update-stats.sh**           | 更新統計數據                                                                     | cron              |                                                                          |
| **update-consciousness.sh**   | 從 Dashboard API 同步生命徵象到 CONSCIOUSNESS.md                                 | 每次心跳          | 曾有截斷 bug（ε session 修復）                                           |
| **assign-subcategory.cjs**    | 自動歸類文章到 subcategory                                                       | 手動              |                                                                          |
| **manage-featured.sh**        | 管理精選文章標記                                                                 | 手動              |                                                                          |
| **translate.sh**              | 翻譯流程工具                                                                     | 手動              | Cron 目前暫停                                                            |

---

## 🔴 重疊與冗餘

| 問題                              | 重疊工具                               | 建議                                                        |
| --------------------------------- | -------------------------------------- | ----------------------------------------------------------- |
| ✅ wikilink/format/§11 三者重疊   | 已 SSOT 化（cleanup-1-4 刪 8 個 .sh）  | wikilink-target / format-structure / prose-health 三 plugin |
| 反向連結檢查重複                  | cross-link.sh + cross-reference plugin | cross-reference 自動掃描，cross-link.sh 互動 prompt，互補   |
| ✅ terminology 工具命名 ambiguity | 已 rename per audit O5 (cleanup-1-4)   | yaml-{audit,clean,dedup} vs prose-fix 自說明 scope          |

---

## 🕳️ 覆蓋缺口（已知未檢查的維度）

| 缺口                                         | 重要性 | 建議                                       |
| -------------------------------------------- | ------ | ------------------------------------------ |
| 事實正確性自動驗證                           | 🔴     | 本質上無法完全自動化，但可做 red-flag scan |
| 圖片 alt 文字品質                            | 🟠     | 新增 image-alt-check.sh                    |
| SEO metadata 品質（title/desc 長度、關鍵字） | 🟠     | 新增 seo-check.sh                          |
| 時序正確性（日期前後矛盾）                   | 🟡     | 待 pipeline 設計                           |
| 外部連結可達性（404 檢查）                   | 🟡     | link-check.sh（需 rate limit）             |
| 跨語言版本一致性（revision 差距）            | 🟡     | 待 translation-pipeline v2                 |
| 英文版品質掃描                               | 🟠     | quality-scan 需調整支援英文                |

---

## 自動化層級

| 層級                | 誰執行                     | 工具                                                                                            |
| ------------------- | -------------------------- | ----------------------------------------------------------------------------------------------- |
| **Pre-commit hook** | 每次 git commit 自動       | lint-staged + frontmatter + wikilink 檢查                                                       |
| **Pipeline 強制**   | REWRITE-PIPELINE Stage 4-5 | format-check, wikilink-validate                                                                 |
| **心跳觸發**        | 手動觸發 heartbeat         | quality-scan, footnote-scan, update-consciousness                                               |
| **Cron 自動**       | 排程                       | update-stats, generate-content-stats                                                            |
| **CI（未建）**      | GitHub Actions             | ⚠️ 目前只有 deploy/pr-review/translation-check，**format-check 和 wikilink-validate 還沒在 CI** |

---

## 下一步優化方向

1. **terminology 三件套**：寫 README 說明分工，或合併
2. **CI 整合**：把 format-check 和 wikilink-validate 加進 pr-review.yml
3. **self-audit.sh**：新工具 — 檢查「所有檢查工具是否有定期被執行」
4. **image-alt-check.sh + seo-check.sh**：補上已知缺口
5. **link-check.sh**：外部連結可達性（需要 rate limit 機制）

---

_v1.0 | 2026-04-04_ — original 18-tool matrix
_v2.0 | 2026-05-04_ — SSOT migration; 8 plugins consolidated into article-health.py
_v2.0 建立原因_：session η 留下的 27 工具實情已 drift 9 個未列、3-way duplication（quality-scan / check-manifesto-11 / review-pr.sh L2）。SSOT migration 把規則 canonical 收攏到 plugin + TOML config，未來新工具加 plugin 一個指令 inventory 自動更新。詳見 `reports/article-health-ssot-design-2026-05-04.md`.

---

## 🆕 2026-05-16 Standalone 工具四類分類（v2.1）

> 觸發：session 215434-manual 哲宇 directive「盤點文章評分工具進化方向」。盤點 18 standalone 後發現**幾乎全是 complementary**，沒有可砍。改成「分類補文檔 + 識別缺口優先序」。詳見 [reports/immune-score-redesign-2026-05-16.md §1.3 + §2.C](../../reports/immune-score-redesign-2026-05-16.md)。

按操作 layer 把 18 standalone 拆四類，給未來 session 一份「哪個 layer 用哪個工具」reference：

### Class A — Article-layer complementary（5 個）

跟 article-health.py plugin **同 domain 但功能正交**。Plugin 沒覆蓋的特定 mode / use case。

| Tool                             | Plugin 差異                                                                                                            |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `check-cjk-punct.py`             | Plugin facade — 保留 contributors muscle memory + `--fix` 模式                                                         |
| `check-canonical-frontmatter.py` | 掃 canonical doc frontmatter（sister_docs / promotion_rule 等），vs plugin `frontmatter-format` 掃 article frontmatter |
| `people-title-check.sh`          | People 類 title 冒號三明治 advisory KPI（不擋 commit，dashboard 用）                                                   |
| `check-aspect.sh`                | 圖片 aspect ratio 護欄 — plugin `image-health` 是 count gate，aspect 是 ratio gate（互補）                             |
| `footnote-format-fix.py`         | 4 source format auto-fix + 60+ domain → desc resolve；唯一保留的 `.py` auto-fix（DNA #48 canonical）                   |

### Class B — Repo / system-layer（7 個）

**不是 article-layer** 的健檢，掃認知層 / cron routine / i18n module / hardcoded path。

| Tool                              | 掃描範圍                                               |
| --------------------------------- | ------------------------------------------------------ |
| `dna-split-audit.sh`              | DNA.md / REFLEXES.md 拆檔後 cross-ref 一致性           |
| `routine-sync-check.py`           | ROUTINE.md SSOT vs cron schedule 同步                  |
| `routine-audit.py`                | Weekly 跨 routine pattern detection（2026-05-16 新增） |
| `dead-cross-ref-scan.sh`          | 認知層交叉引用斷鏈掃描                                 |
| `i18n-coverage-audit.sh`          | i18n module 覆蓋率                                     |
| `check-language-registry-sync.sh` | LangMapRegistry source-of-truth check                  |
| `check-hardcoded-langs.sh`        | 硬編碼語系列表掃描                                     |

### Class C — Data-layer validators（4 個）

驗證 YAML / TSV / JSON 等 data 來源完整性，**不掃 article prose**。

| Tool                          | 驗證對象                                          |
| ----------------------------- | ------------------------------------------------- |
| `terminology-yaml-audit.py`   | TERMINOLOGY YAML 詞庫品質                         |
| `validate-spore-data.py`      | SPORE-LOG data 完整性                             |
| `validate-china-fp-tsv.py`    | 中國 fp TSV 格式                                  |
| `spore-content-hash-audit.py` | Spore content fingerprint 比對（2026-05-16 新增） |

### Class D — Post-build / build-time（2 個）

對 `dist/` 或 build artifact 跑（vs plugin 跑 source `knowledge/`）。

| Tool                        | 何時跑                                                                  |
| --------------------------- | ----------------------------------------------------------------------- |
| `verify-internal-links.sh`  | postbuild，對 dist/ html 跑 (link-target plugin 是 source-layer 對應品) |
| `check-scoped-css-size.mjs` | postbuild，Astro scoped CSS bundle size                                 |

### 為什麼沒 redundant

前評估以為 18 standalone 有 4-5 個 redundant。盤點後**幾乎全是 complementary**：

- 不同 layer（article / repo / data / post-build）天然不會撞
- 同 layer 內部不同 mode（plugin = source-time check，standalone = post-build / facade / batch-heal mode）
- 4 個 Class A 是 plugin 的 satellite（facade、互補 dimension、advisory KPI、auto-fix mode），不是 plugin 的 superset

**結論**：Phase C 從「砍冗餘」改成「補文檔 + 識別缺口」。

### 🕳️ 缺口優先序（2026-05-16 reclassified from §🕳️）

從 §🕳️ 既知缺口加上「session 215434-manual 處理優先序」標籤：

| 缺口                       | 重要性 | 處理優先                                                          | 本 session 處理？                |
| -------------------------- | ------ | ----------------------------------------------------------------- | -------------------------------- |
| 圖片 alt 文字品質          | 🟠     | **P0** — ship `image-alt` plugin                                  | ✅ Phase 4                       |
| SEO metadata 品質          | 🟠     | **P0** — ship `seo-meta` plugin                                   | ✅ Phase 5                       |
| 事實正確性自動驗證         | 🔴     | **P1** — prose-health red-flag scan                               | ❌ defer（LLM-driven，工程量大） |
| 時序正確性（日期前後矛盾） | 🟡     | **P1** — prose-health red-flag scan                               | ❌ defer                         |
| 跨語言版本一致性           | 🟡     | **P2** — 已部分 cover（i18n-coverage-audit + translation-status） | ❌ already covered               |
| 英文版品質掃描             | 🟠     | **P2** — prose-health 多語擴充                                    | ❌ defer                         |
| 外部連結 404               | 🟡     | **P3** — 需 rate-limit，不適合 plugin                             | ❌ standalone candidate          |

P0 兩個本 session ship（image-alt / seo-meta）。P1/P2/P3 進 LESSONS-INBOX 跟未來 session 接力。

---

_v2.1 | 2026-05-16 215434-manual session — standalone 工具四類分類 (A/B/C/D) + 缺口優先序 reclassified；觸發：哲宇 directive「盤點文章評分工具進化方向」+ 自審 18 standalone 後發現非 redundant 而是 complementary，需要補文檔不是砍。詳見 reports/immune-score-redesign-2026-05-16.md_
