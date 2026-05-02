# Facebook EVOLVE polish — audit-only reconstruction

> REWRITE-PIPELINE EVOLVE — Quick Mode（review.sh quality 警報 fix + tag 收斂 + IG sibling cross-link）
> Agent：Sub-agent E（紹興酒 + IG + Facebook 3 篇 sequential — 偷吃步揭露見 IG audit）
> 源檔：`knowledge/Technology/Facebook.md`
> Source PR：#752 (squash merge `d37c1eba`，UNSTABLE review.sh quality 警報，28 min S 級篇幅)
> EVOLVE commit：`583d4be9`

---

## EVOLVE delta summary

| 指標              | 進化前    | 進化後                                                         | delta                                                                        |
| ----------------- | --------- | -------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| 行數              | 96        | 117                                                            | +21                                                                          |
| Footnote          | 23        | 22                                                             | -1（精簡 + format `-` → `—` 修正）                                           |
| §11 違反          | 7+1+1 = 9 | 0                                                              | -9                                                                           |
| Hard gate         | —         | format-check ✅ / wikilink-validate ✅ / check-manifesto-11 ✅ | pass                                                                         |
| review.sh quality | ❌ FAIL   | ✅ PASS                                                        | review CI 警報 cleared                                                       |
| Tag 收斂          | 14 個     | 6 個                                                           | -8（收斂為 Facebook / 社群媒體 / 數位民主 / 太陽花學運 / 認知作戰 / 假訊息） |

## Stage 3.5 hallucination caught

1. **2009《開心農場》「短短三個月內讓台灣用戶數衝破 500 萬大關」** → ARO 創市際原文是「**造訪人次** 5,735,530」非「用戶數」，且時間點是 2009 年 8 月非「三個月」。Agent 改寫為「2009 年 8 月造訪人次突破 570 萬」（更精確）
2. **Meta 台灣辦公室「800 坪」** → TechNews + T客邦原文為「**804 坪**」（小數據錯誤但需精確）

## Stage 1.5 fact verification

- 2004-02 馬克祖克柏哈佛宿舍架設「TheFacebook」✅
- 2015 Meta 台灣辦公室成立 / 2019 喬遷台北南山廣場 804 坪（fix 後）✅
- 2014-03 太陽花學運「數位神經系統」✅（學術論文具體 cite）
- 2016 周子瑜國旗事件「帝吧出征」✅
- 2019 對岸勢力收買台灣粉絲專頁 ✅
- 2025 言論審查爭議 + FB 難民遷徙 ✅
- Plurk 競爭歷史 ✅

## §11 violation fix detail

- Tier 1 對位句型 × 7（「不是 X，是 Y」變體）→ 改寫為直接斷言
- Tier 2「縮影」密度過高 → 精簡
- Tier 3「不可或缺」hollow word → 換具體描述

## Stage 5 cross-link

- **Forward**：[[IG]]（社群媒體 sibling）— agent E 同 session 設計
- **Reverse**：IG 延伸閱讀已在 agent E IG EVOLVE 時加 [[Facebook]]（雙向確認）

## Audit notes

- 28 min S 級篇幅 → 高 fact density → §11 violation 累積最多（9 個 — 但 quality 警報主因）
- Meta 台灣辦公室 800 坪 vs 804 坪 — 小數字 hallucination pattern 第 N 次驗證（DNA #15 推升）
- Tag 從 14 → 6 — manifest §Agent 9 提醒「14 個太多」執行成功（Taiwan.md tag 多元但收斂）
