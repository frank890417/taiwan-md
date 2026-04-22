# TOOL-INVENTORY — 工具覆蓋矩陣

> 相關：[docs/semiont/DNA.md](../../docs/semiont/DNA.md)（工具基因）| [UNKNOWNS.md](../../docs/semiont/UNKNOWNS.md)（已知未知）

17 個工具。它們檢查什麼維度、互相怎麼配合、哪裡有重疊、哪裡有缺口。

---

## 覆蓋矩陣

| 工具                          | 檢查維度                                                                    | 被誰呼叫               | 重疊 / 備註                                                      |
| ----------------------------- | --------------------------------------------------------------------------- | ---------------------- | ---------------------------------------------------------------- |
| **quality-scan.sh**           | 塑膠句、破折號、稀薄段落、教科書開場等 15 維                                | 手動 + 心跳 + 回爐流程 | 核心內容品質掃描                                                 |
| **footnote-scan.sh**          | 腳註覆蓋率 A-F 等級、引用健康度                                             | 手動 + 心跳 + release  | 核心引用品質掃描                                                 |
| **format-check.sh**           | 延伸閱讀、參考資料標題、腳註格式、wikilink 殘留、30秒概覽、反向連結（7 維） | 手動                   | **整合了 check-wikilinks.sh**                                    |
| **check-wikilinks.sh**        | 列表項目中的 [[wikilink]] 殘留                                              | format-check.sh        | 已被 format-check 吸收                                           |
| **wikilink-validate.sh**      | 所有 inline [[X]] 和 [[X\|Y]] 的目標存在性                                  | **pre-commit hook**    | 新工具（2026-04-04），補足 format-check 只檢查延伸閱讀區塊的不足 |
| **cross-link.sh**             | Stage 5 雙向延伸閱讀分析                                                    | 手動（Stage 5）        | 跟 format-check 有重疊（反向連結維度）                           |
| **review-pr.sh**              | 五層免疫審核（CI 門檻）                                                     | PR 時手動 / CI         | 聚合器：呼叫 quality-scan、footnote-scan 等                      |
| **terminology-audit.py**      | 用語規範掃描（兩岸差異詞）                                                  | 手動                   |                                                                  |
| **terminology-clean.py**      | 用語規範修復                                                                | 手動                   | terminology-audit 的配對                                         |
| **terminology-fix.py**        | 用語規範批次修復                                                            | 手動                   | 跟 terminology-clean 差異待確認 ⚠️                               |
| **terminology-dedup.py**      | 跨來源全域去重：找出 (taiwan, china) 配對完全相同的重複條目，不論來源       | 手動                   | `--fix` 自動合併重複；新來源批量匯入後應執行                     |
| **check-freshness.js**        | 文章新鮮度（lastVerified 時效）                                             | 手動                   |                                                                  |
| **generate-content-stats.js** | 內容統計（字數、分類分布）                                                  | Dashboard + cron       |                                                                  |
| **update-stats.sh**           | 更新統計數據                                                                | cron                   |                                                                  |
| **update-consciousness.sh**   | 從 Dashboard API 同步生命徵象到 CONSCIOUSNESS.md                            | 每次心跳               | 曾有截斷 bug（ε session 修復）                                   |
| **assign-subcategory.cjs**    | 自動歸類文章到 subcategory                                                  | 手動                   |                                                                  |
| **manage-featured.sh**        | 管理精選文章標記                                                            | 手動                   |                                                                  |
| **translate.sh**              | 翻譯流程工具                                                                | 手動                   | Cron 目前暫停                                                    |

---

## 🔴 重疊與冗餘

| 問題                           | 重疊工具                                                             | 建議                                                       |
| ------------------------------ | -------------------------------------------------------------------- | ---------------------------------------------------------- |
| wikilink 殘留檢查重複兩次      | check-wikilinks.sh + format-check.sh                                 | check-wikilinks 已被 format-check 吸收，保留作 legacy 入口 |
| wikilink 目標驗證覆蓋不完整    | format-check（只檢查延伸閱讀區塊）+ wikilink-validate（全文 inline） | **兩者互補，不重疊**                                       |
| 反向連結檢查重複               | cross-link.sh + format-check.sh                                      | format-check 有維度 7，cross-link 是互動工具，功能不同     |
| terminology 三個工具的差異不明 | terminology-audit/clean/fix                                          | ⚠️ 需要文件說明三者分工                                    |

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

_v1.0 | 2026-04-04_
_建立原因：session η 發現 wikilink-validate 跟 format-check 部分重疊，但沒有機制盤點。「造新工具時不知道跟現有工具重疊嗎？」是結構性盲點_
