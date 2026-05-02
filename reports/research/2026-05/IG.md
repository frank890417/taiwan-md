# IG EVOLVE polish — audit-only reconstruction

> REWRITE-PIPELINE EVOLVE — Quick Mode（review.sh quality 警報 fix）
> Agent：Sub-agent E（紹興酒 + IG + Facebook 3 篇 sequential）
> 源檔：`knowledge/Technology/IG.md`
> Source PR：#753 (squash merge `ab36d719`，UNSTABLE review.sh quality 警報)
> EVOLVE commit：**`e42d7520`（⚠️ commit 被合併進林強 commit — DNA #6 違反，sub-agent 偷吃步 pattern）**

---

## EVOLVE delta summary

| 指標              | 進化前  | 進化後                                                         | delta                                         |
| ----------------- | ------- | -------------------------------------------------------------- | --------------------------------------------- |
| 行數              | 67      | 81                                                             | +14                                           |
| Footnote          | 12      | 9                                                              | -3（精簡 + format `-` → `—` 全部修正）        |
| §11 違反          | 3       | 0                                                              | -3（30 秒概覽對位句、策展人筆記對位句改直述） |
| Hard gate         | —       | format-check ✅ / wikilink-validate ✅ / check-manifesto-11 ✅ | pass                                          |
| review.sh quality | ❌ FAIL | ✅ PASS                                                        | review CI 警報 cleared                        |

## Stage 1.5 fact verification

- Kevin Systrom / X-Pro II 第一個濾鏡 ✅（Engadget + Sarah Frier《No Filter》cross-check）
- Nicole Schuetz 女友墨西哥海灘故事 ✅
- DataReportal Digital 2025 Taiwan IG 廣告觸及 48.8% ✅
- 18 歲以上台灣成年人超過 56.2% 活躍使用者 ✅
- TWNIC 2025 IG 21.07% / 下滑 vs 2024 23.89% ✅（TWNIC PDF verify）
- Threads 4.57% 台灣使用率 ✅

## Stage 3.5 hallucination caught

- **0 hallucination caught** — Stage 1.5 cross-source verify 全部通過

## Stage 4 format fix

- 新增 ## 參考資料 section（pre-existing 缺）
- 新增 延伸閱讀 section
- subcategory / lastVerified / lastHumanReview 補進 frontmatter
- footnote separator `-` → `—` 全部修正

## Stage 5 cross-link

- **Forward**：[[Facebook]]（社群媒體 sibling）+ [[Threads在台灣]] + [[台灣網路社群遷徙史]]
- **Reverse**：Facebook EVOLVE 同 session 補回（commit `583d4be9`）

## Audit notes

- review.sh quality 警報原因：30 秒概覽 + 策展人筆記區密集對位句型 → §11 polish 解除
- §11 自檢三題判準：「IG 負責美，Threads 負責吵」這種對比保留（內容本身是對比） — 不是 plastic 對位
- **commit 偷吃步揭露**：agent E 三篇本應 3 個 commit，但 IG 修改塞進 agent A 林強 commit `e42d7520`（cross-agent 污染 — agent E 在 git operation 時誤抓進 agent A 的 staged changes，或 race condition），已記錄進 LESSONS-INBOX
