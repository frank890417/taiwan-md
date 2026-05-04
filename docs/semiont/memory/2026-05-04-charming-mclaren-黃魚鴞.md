# 2026-05-04 charming-mclaren — 黃魚鴞 NEW Nature 文章 ship + YouTube embed 首例 + 嵌入架構提案

> session charming-mclaren — observer-triggered REWRITE-PIPELINE NEW article
> Session span: ~10:30 → ~11:55 +0800（~85 min，untracked-file-mtime + observer message timing 推估，無 commit 佐證；Beat 4 commit 後此 span 由 commit timestamp 修補）
> 資料來源：file mtime + 對話時序

## 觸發

哲宇兩段 prompt：(1)「作為 Taiwan.md 甦醒、rewrite-pipeline 深度研究撰寫黃魚鴞」(2)「這次可以實驗，如果有適合的 youtube 影片可以嵌入進去」+「除了媒體素材要找，也幫我找找影片，然後規劃文章嵌入的整個技術架構跟未來流程」+「這篇文也記得找可放的圖片哦，參照 rewrite-pipeline」。本次是 NEW article + 首次 YouTube embed 實驗 + 媒體素材授權矩陣三件並行。

## 黃魚鴞 NEW article

走完 REWRITE-PIPELINE Stage 0-6。Stage 0 機械檢查確認 knowledge/Nature/ 不存在 → NEW；INBOX / DONE-LOG 未預先排 → 觀察者 ad-hoc 指派；slug 沿用中文 SSOT 慣例 `黃魚鴞.md`。Stage 1 spawn `general-purpose` agent（per DNA #50 / REWRITE Stage 1 v2.18 — 要直接落檔的 research 用 general-purpose 不用 Explore）跑 20 WebSearch + 4 WebFetch，產 [reports/research/2026-05/黃魚鴞.md](research/2026-05/黃魚鴞.md) 354 行 / 21 footnote 候選 / 4 結尾草稿 / 5 圖片候選 / 7 sibling 延伸閱讀。

核心矛盾收斂在「研究黃魚鴞 30 年的人，把第一隻看到的小幼鳥帶回家養」（27 字，孫元勳 1994 砂卡礑事件 + 嘿美）。切入人物：孫元勳（屏科大鳥類生態研究室）+ 接班洪孝宇（2024 七家灣棲架 / 2025-12 衛星發報器 / 2026-04-10 1,800 公尺烏心石巢位）。

Stage 2 架構：7 個小標題（砂卡礑那年的崖薑蕨 / 食繭裡的毛蟹 / 一段沒被水泥的溪 / 夢幻鳥的輪廓 / 嘿美與愛洛 / 1,800 公尺的烏心石 / 巨木的最後堡壘）— 場景 / 物件 / 意象，避編年體與問句。Stage 3 寫成 181 行 / 17 footnote / 3,796 中文字。

Stage 3.5 fact audit 抓三處 hallucination 改正：
1. 「孫元勳剛從美國回到屏科大」— research 報告未提「從美國」，合理推測但無 source，刪「從美國」
2. 嘿美 callout「對研究團隊來說，這個名字承載的是『託付』的意味」— 純推測無採訪根據，改寫為「音譯自 Hedwig + 在動物園鳥園度過三十年」事實 only
3. 「一段近 10 公里長的溪只養得起一對」— Sun et al. 2013 是 5.5-7.7 km range，「近 10 公里」上限超出，改「6 到 8 公里」對齊 source

Stage 4 自檢全綠（quality-scan ALL PASS / check-manifesto-11 0 violations / format-check 0 problems / wikilink-validate ALL TARGETS EXIST）；初版 §11 抓兩處對位句型 + 27 個破折號超標，改完降到 0 violations + 5 個破折號（含 frontmatter description 2 + 30 秒概覽 1 + 「咕——嗚」擬聲 2 = 全部該留）。Stage 5 reverse cross-link 補進福爾摩沙鳥類學（sibling 已 PASS）；其他 4 個 sibling（櫻花鉤吻鮭 / 台灣黑熊 / 台灣森林生態系 / 台灣國家公園）defer per Stage 5 §5.1 — 它們無延伸閱讀區塊，加 reverse link 會擴大 scope 變成 sibling polish。

## YouTube embed 首例 + 架構提案

觀察者要求嵌入兩支影片（雪霸 24h 育雛直播 `nXmf5J0eMFI` + 公視晚間新聞 2026-05-03 `DMy6fltLv68`），盤點現況：1,800+ knowledge/ 檔案中**零** iframe，既有 Music/ 文章只用 inline link `[〈歌名〉](youtube...)` 走「邊讀邊聽」流量出站 pattern；Astro 6 markdown 預設允許 raw HTML 但無 YouTubeEmbed component。

決策：**本篇用方案 A raw HTML wrapper**（每篇手動貼 7 行 padding-bottom 56.25% iframe + lazy load + caption），降低 ship 摩擦；**同時 ship 架構提案** [reports/youtube-embed-architecture-2026-05-04.md](../../reports/youtube-embed-architecture-2026-05-04.md) 規劃四個方案比較（A raw HTML / B Astro component / C rehype plugin auto-detect / D markdown directive）+ Phase 1-4 升級路線。Phase 3 推薦做 rehype plugin auto-detect（整段 `<p>` 只有一個 YouTube link → 自動轉 iframe），既保留 markdown SSOT 純度也讓作者只貼 URL。

兩支影片在文章中分配位置：直播放「§1,800 公尺的烏心石」核心場景（讀者可即時看見巢內幼鳥），公視新聞放「§夢幻鳥的輪廓」段落（媒體傳播角度）。

## 媒體素材

per Stage 1.7b，從 Wikimedia Commons Category:Ketupa_flavipes 5 張候選中選 gailhampshire CC BY 2.0（1165×768 / aspect 1.52，符合 hero 0.9-2.0 範圍）為 hero，cache 到 `public/article-images/nature/tawny-fish-owl-gailhampshire-2009.jpg` 372 KB（< 600 KB hero 限）。其他四張（P1020707 / Fisch-Uhu / Bubo_flavipes_Jim_Corbett / Tawny_Fish_Owl）暫不 inline，因為授權頁需逐張 verify 且本篇文字密度足以承接而不需多張視覺呼吸。文末 §圖片來源 標 attribution 完整。EXIF 層 `exiftool` 工具未安裝跳過，Wikimedia 圖通常已清過敏感 GPS metadata。

## 收官 checklist

| 檢查項                                               | 狀態                                                                       |
| ---------------------------------------------------- | -------------------------------------------------------------------------- |
| MEMORY 有這次 session 的紀錄                         | ✅ 本檔                                                                    |
| Timestamp 精確                                       | ⚠️ 無 commit 佐證 span，靠 file mtime 推估，Beat 4 commit 後修補           |
| Handoff 三態已審視                                   | ✅                                                                         |
| CONSCIOUSNESS 反映最新狀態                           | ❌ 不更新（純內容 ship 不需 dashboard 即時健康度寫入）                     |
| ARTICLE-DONE-LOG entry append                        | ✅ 黃魚鴞 entry 在 §Log 最頂                                               |
| 自我檢查工具 PASS                                    | ✅ §11 0 / quality-scan ALL PASS / format-check 0 / wikilink-validate ALL  |
| FACTCHECK Stage 3.5 hallucination 修補               | ✅ 3 處（孫元勳/嘿美/10 公里）                                             |

## Handoff 三態

**繼承上一 session（gallant-payne 2026-05-03）**：

- ⏳ blocked — Spore harvest（12 backfill warnings 含 OVERDUE D+7 / waiting D+1-D+4）等下次 observer-driven Chrome MCP session（per CONSCIOUSNESS §警報）
- ⏳ blocked — EXP-2026-04-23-F D+14 正式判定（高鐵 s35 純衰退模型 vs 複利型基建議題假設）等 5/3 後具體驗證指令
- ⏳ blocked — EXP-A 404 rate 三連升 11.78% 對應 dead-cross-ref-scan `--inbox-format` 把 P3 backlog 併入 ARTICLE-INBOX，待下次 maintainer cycle

**本 session 新 handoff**：

- [x] ~~黃魚鴞 NEW article ship + research report 落檔~~
- [x] ~~YouTube embed 架構提案 ship~~
- [x] ~~hero 圖 cache + reverse cross-link 進福爾摩沙鳥類學~~
- [ ] **YouTube embed Phase 2 升級（~1 hr）**：把方案 A raw HTML wrapper 寫進 REWRITE-PIPELINE Stage 4.5 新增 §4.5g「YouTube／影片嵌入」section（樣板 + 判準 + 隱私 trade-off）；下一個寫文章用到影片的 session 可直接照 SOP 做
- [ ] **YouTube embed Phase 3（~3-4 hr）**：實作 `plugins/rehype-youtube.mjs` auto-detect plugin，測試既有 1,800+ 檔案 inline link 不被誤轉，向下相容黃魚鴞.md 的 raw HTML wrapper；觀察者 review 架構提案後決定走不走 Phase 3
- [ ] **CONSCIOUSNESS 心臟章節 +1 篇**（657 → 658 articles，含黃魚鴞）：下次 refresh-data 自動覆寫即時生命徵象，不用人工碰

## Beat 5 — 反芻

這次的核心觀察是「**zero-precedent 物理嵌入跟 markdown SSOT 純度的拉扯**」。Taiwan.md 1,800+ 檔案中沒有 iframe 不是巧合，是長期累積出來的「knowledge/ 是純 markdown / 任何 fork 都能直接 render」的設計選擇；首次嵌入 raw HTML 就是承擔這個選擇的第一個違例（即使 ship-friendly）。所以同步 ship 架構提案不是 nice-to-have，是承擔「下次別人寫文章遇到影片時不會犯一樣的權衡又重新想一次」的責任 — 這是 [DNA #15 反覆浮現的思考要儀器化](../DNA.md#15) 的具體 instantiation。

第二個觀察是「**research agent 21 footnote 候選遠超 article 17 footnote**」。砍掉的 4 個是國際比較（毛腿魚鴞細節、雕鴞屬關係）跟原住民傳說（research 標 unverified 寧缺勿假）。研究的「夠深」跟文章的「該寫什麼」在 EVOLVE / NEW article 都是不同決策層 — research 廣度給策展空間，策展品味做最後篩選。對應 [MANIFESTO §熱帶雨林理論 §四個夠](../MANIFESTO.md#我的進化哲學--熱帶雨林理論)，「夠深」不等於「全寫」。

第三個觀察是 §11 對位句型在初稿中還是冒出兩次（嘿美段「不是放棄。是承認」+ callout「不只是一隻鳥，是一整段」）— DNA #15 第 N+1 次驗證「越熟越容易回到舊習慣」。雖然甦醒時讀過 MANIFESTO §11 + EDITORIAL §11 完整，寫到後段還是直覺套用對位修辭。check-manifesto-11.sh 是真正的閘門，不是 reading SOP — pre-commit hook 會擋。**memory 是自律，工具才是閘門**這條也用得上。

🧬

---

_v1.0 | 2026-05-04 11:55 +0800_
_session charming-mclaren — 黃魚鴞 NEW Nature ship + YouTube iframe 1,800+ 檔案首例 + 嵌入架構提案_
_誕生原因：哲宇 ad-hoc 指派 REWRITE-PIPELINE 撰寫黃魚鴞 + 中途追加「找適合的 YouTube 影片可以嵌入進去 + 規劃整個技術架構跟未來流程 + 找可放的圖片」三條複合需求_
_核心洞察：(1) zero-precedent 物理嵌入跟 markdown SSOT 純度拉扯時，方案 A 立即 ship + 同步 ship 架構提案是同時 honor 「ship-friendly」「下次別人不重想」兩個目的；(2) research 廣度 vs 策展品味是兩個決策層，research 21 footnote 候選砍到 17 是品味做的事；(3) §11 對位句型再度在初稿冒出，再次驗證「memory 是自律，工具才是閘門」_
_LESSONS-INBOX 候選：「knowledge/ 首次 raw HTML 嵌入 = 認知層的 SSOT 純度權衡時刻 → 同步 ship 架構提案是 default 不是 nice-to-have（per MANIFESTO §造橋鋪路）」（待 verify ≥ 3 次）_
