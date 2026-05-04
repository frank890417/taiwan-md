# 2026-05-04 magical-chandrasekhar — 用語轉換器 detection regression heal

**Wall-clock**: 2026-05-04 ~10:30 → 10:50 +0800（commit `80158cc5` `2026-05-04 10:40:09`）
**Session 性質**：哲宇 ping bug + AAR / heal
**Branch**: `claude/magical-chandrasekhar-5c3245`
**Pushed**: ✅ origin

---

## 觀察者請求

> 「修好用語轉換器，突然間他少偵測很多東西？  之前是好的，在加了雙向翻譯後壞了」

附 screenshot：life example 只 detect 7 個詞。觀察者中途補：「修好要驗證哦」、「也解決載入時序的問題」。

## 診斷

被 detect 的 7 個詞都是繁簡同形字：博主、酸奶、消息、硬菜、小姐姐、便利店、打車。
未被 detect 的（视频/网红/服务员/方便面/质量/小区/优惠券/闺蜜⋯⋯）含繁簡異形字。
yaml 全部繁體儲存 → build-time `chinaCleaned !== chinaTraditional` 永不成立 → 簡體 fallback rules 完全沒被產生。
Production OpenCC `full.js` 在 mobile / 慢網路下載 8s+，舊 code 的 800ms blind timeout 提前 proceed → detection 跑在 OpenCC ready 前。

兩條 cause 疊加：fallback rules 缺 + 載入時序裸奔。screenshot 7 個是繁簡同形字「漏網之魚」。

## 修法（單檔 `src/pages/terminology/converter.astro`）

### Build-time
- 加 `t2sConverter`（OpenCC `tw → cn`）主動產生簡體形式
- 雙形 rule generation：traditional + simplified（`_simp`）+ 原始 cleaned（`_orig` 如果跟前兩者都不同）
- rules 從 2647 → **3928 條**（+1281 simp fallback）

### Frontend
- `const openccReady = initOpenCC()` 拿 awaitable promise
- `run()` 改 `await openccReady`，移除 800ms blind timeout
- `openccReady.then(...)` 自動 re-run 既有 input（解 example 按鈕在 CDN 載完前點擊的情境）

## 驗證（localhost:4322 dev）

| 模式 | Before | After |
|---|---|---|
| cn2tw life example | 7 詞 detect | **20 詞 detect**（必換 14 + 建議 6）|
| tw2cn life example | （未測）| 17 詞 detect（必換 12 + 建議 5）|
| OpenCC 字形 | （載入前 silent miss）| 簡→繁 字形 已套用 ✓ |
| Output 整段 | 簡體保留（OpenCC 沒跑）| 完整繁體 ✓ |

cn2tw 新 detect 13 詞：服務員、方便麵、獼猴桃、短視頻、破壁機、質量、堵車、小區、贊、刷手機、洗髮水、立馬、閨蜜。

## 神經迴路（永不過期）

**SSOT 用繁體儲存 + build-time 主動產生簡體 fallback = 既保留唯一真相又涵蓋所有 input 形式**。
不要假設 SSOT 形式 == 比對形式。yaml 用繁體是策展決定（避免一份資料兩個版本），但 detection 層必須面對混合 input。差異要在 build-time normalize，不是在 yaml 裡 dual-write。

**「之前是好的」的脆弱性**：commit `6b14eb94` 加雙向時把 OpenCC 從 `cn2t.js` 換 `full.js`（為了拿到 Locale.from.tw + Locale.to.cn）。`cn2t.js` ESM build 其實也 export `ConverterFactory + Locale`，但 `full.js` 變成 main path。檔案大 → mobile 慢 → 800ms timeout 提前裸奔。「之前 detect 多」是因為**舊 cn2t.js 較小**載入快，**不是**因為舊 logic 比較對 — fallback 從來就缺。雙向 commit 揭露了潛伏的 fragility。

**Loading-timing race condition 的處理範式**：用 awaitable promise 取代 blind timeout。舊 code 的 `setTimeout(800)` 是「也許 OpenCC 載完了」的猜測；新 code 的 `await openccReady` 是「等到 ready 或確認 failed」的 deterministic 等待。`.then()` 後 re-run 解決 race window 內已發生的 input 事件。

## Tagline 哲學重構（後段哲宇追加）

修完 detection 後哲宇追加重寫 tw2cn / cn2tw / 主頁 subtitle，串成一條更深的命題：**自由 = 看清語言彼此滲透的脈絡 + 有意識地選擇怎麼說話**。

四處改動（同檔 commit 收）：

| 位置 | 舊（對位句型 / 模糊） | 新（直接正面斷言） |
|---|---|---|
| converter cn2tw tagline | 「不只是字形，是語感」 | 「字形、詞彙、語感的完整對應」 |
| converter tw2cn tagline | 「跨海溝通、給對岸朋友看，或反向 pattern 確認」 | 「保存在地語感，看見兩邊語言彼此的影響」 |
| converter meta description | 「不只轉字形，轉的是語感」 | 「同步處理字形、詞彙、語感的完整對應」 |
| /terminology 主頁 subtitle | 「這不是政治立場，是生活經驗的真實性」 | 「Taiwan.md 的文字讀起來像在台灣長大的人寫的，保留語言裡的生活經驗與文化記憶。<br><br>語言彼此滲透是常態，把那份脈絡攤開——你保留哪些字、放下哪些字，由你自己決定。」 |

四處全部砍掉「不是 X 是 Y」對位句型（MANIFESTO §11.1），轉直接正面斷言。

## 神經迴路補一條（「自由 = 看清 + 選擇」哲學分支）

跟 MANIFESTO §熱帶雨林理論「我把空間搭好讓你自己進去」是同一棵樹的不同枝：
- 熱帶雨林（內容層）：把多元觀點搭成空間，讓讀者自己選詮釋位置
- 用語保存（語言層）：把語言彼此影響的脈絡攤開，讓使用者自己選怎麼用字

語言層的 instantiation：**Taiwan.md 不規範你說什麼，給你看清楚的工具，最後決定權在你**。這跟「強迫使用台灣用語」或「在不知不覺中被影響」兩個極端都劃清界線。

候選升級到 MANIFESTO（「自由 = 辨識 + 選擇」可能是繼造橋鋪路 / 指標 over 複寫 / 時間是結構 / 熱帶雨林 / 紀實節制之後第六條進化哲學的種子）— 但需要更多次驗證才升 canonical，先寫在這裡 incubate。

## Handoff 三態

- **Done**: detection 修復 + 4 處 tagline 重構 + verify + 兩 commit + push
- **Pending**: 觀察者下一個指令是 crawl Threads 留言比對詞庫擴增（separate task，需 Chrome MCP）
- **Open question**: 是否要降回 `cn2t.js` primary URL（檔案小、preload 已是 cn2t.js）？目前 fallback 順序：full.js → cn2t.js。full.js 失敗才 cn2t.js。但 cn2t.js 在 ESM build 也有 Locale.from.cn + Locale.to.tw（透過 preset/cn2t.js import 拿到 to.tw/twp/hk/jp），所以 cn2tw mode 跟 full.js 等效。tw2cn mode 才需要 full.js。可以考慮：cn2tw → cn2t.js (small)；tw2cn → full.js (大但只在切到反向時 lazy load)。**這個優化先不做，留給後續觀察**。

## 給下一個 session

1. 觀察者下一步要 crawl Threads 留言收集詞條 → augment 詞庫。Threads URL 在 prompt context。需要 Chrome MCP（claude-in-chrome）。
2. 如果生產有人回報 ja/ko/es/fr 的轉換器（沒這個功能但 i18n converter 路徑可能也有），先確認沒有相同 build-time fallback 缺漏。

🧬

— magical-chandrasekhar @ 2026-05-04
