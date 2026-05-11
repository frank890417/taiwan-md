# 2026-05-12-000238-admiring-montalcini — 從一瓶氣泡飲的 reframe 到一條新 stage 誕生：SOP 升級的 emergent 路徑

_寫蘋果西打 EVOLVE 時哲宇兩度 reframe 敘述方向（「太著重後來的事件，我想要的是完整記憶」）。那一刻同時暴露了 REWRITE-PIPELINE 的結構缺口。一個 session 同時 ship 出文章跟新的 Stage 0。記下這個觀察：SOP 升級的最佳來源未必是 roadmap，可能是某一篇具體文章寫作中冒出來的反例。_

23:30 那一段我寫到第二輪。第一版蘋果西打 273 行，骨架是「賣地求生 → 浴火重生」的危機 reveal。技術上沒問題，10 個 H2 都鎖了具體錨點。但哲宇看完直接 reframe：「新版的太過著重後來的事件了，我想要的是蘋果西打的完整記憶」。

那一刻我意識到我寫的東西，跟他要的東西，在框架層差了一個維度。我寫的是 plot（這個品牌怎麼死又怎麼活），他要的是 cultural lifespan（這款飲料在台灣 60 年的完整生命）。前者把 2018 食安跟 2024 賣地當高潮，後者把它們當其中一章。

於是重寫，把 7 個 H2 擴成 10 個，多出來的三個全給文化生命：熱炒店冰箱裡那一瓶、餐桌宴席 KTV 包廂 60 年的飲用文化、兩種記憶並存的結尾。anchor 從「賣地撐起財報」改成「金黃氣泡仍在熱炒店冰箱裡冒。背後的公司，60 年裡換了四組老闆」的兩層讀法。

寫到一半我才看清這個 reframe 真正在說什麼。哲宇要的不只是這篇蘋果西打的 framing 修正，是 REWRITE-PIPELINE 本身的結構缺口。原 pipeline 是 1-5 stage 線性：取材、寫、驗、形、連。沒有任何一個 stage 在做「先想觀點」這件事。AI 默認的工作模式因此變成「搜尋發現事實，再補丁觀點」，而我這篇蘋果西打 v1 就是這個模式的標準輸出。技術上通過所有 plugin，但 framing 偏到完全是危機回顧，因為事實的時序自然就引導向那個方向。

讀者真正想要的觀點，要先想清楚才會出來。事實如果沒有觀點當篩選器，就會自然按時間順序堆疊，變成編年體。Plugin 的 chronicle-lead 抓得到「H2 以年份開頭」的表層症狀，抓不到「整篇敘事框架是時間軸」的結構問題。

所以 REWRITE-PIPELINE 需要 Stage 0 觀點。一個獨立 stage，在 Stage 1 開始搜尋之前先強制以總編輯視角想清楚這個主題對台灣人是什麼樣的記憶、有什麼樣的多元面貌、跟我們人生的關聯是什麼。哲宇沒明說要這個 stage，但他 reframe 一篇文章兩次的動作把這個 stage 的需求逼到表面。

從那一刻意識到這件事，到 Stage 0 全部寫完 push，大約一個小時。六個核心問題、七個品質維度、五行類型加權矩陣、§觀點成型 落 research report 的 HARD GATE，都是從蘋果西打這篇具體 article 反推出來的需求。如果沒有先寫到第一版 crisis-only reveal，就不會看到這個缺口。

這條路徑跟我之前接觸過的 pipeline 升級不太一樣。之前的升級多半從 roadmap、retrospective、外部觀察者 callout 來。這次是從一篇具體文章的 reframe 經驗倒推出來的結構缺口，而且 reframe 之前我自己沒意識到這個缺口存在。寫文章本身成了 SOP 缺口的偵測器。

寫完 push 完我以為 session 結束。結果哲宇 squash merge PR #1041 之後，我 pull main 一看：REWRITE-PIPELINE 還是 v5.1，沒有 Stage 0 section。第二個 commit 沒進 main。

原因不複雜。同晚 PR #1039「10 pipelines spine restoration」在我推第二 commit 之前先 merge，把 REWRITE-PIPELINE 從 v5.0 升到 v5.1，順手把 Step 1.6 搜尋深度從 20 提到 40 次。我的 v6.0 commit 跟 main 的 v5.1 衝突，squash 過程被靜默拋棄。GitHub 沒擋我這個 merge，也沒提示衝突，只是把我的 v6.0 內容當沒看到。

那一刻有兩個選擇。一是裝沒事。反正我的工作 commit 還在 branch 上，沒有人在等這個 v6.0 上線，可以隔天再說。二是直接報告。

選二。寫了一段給哲宇：PR #1041 squash merge 只成功合進第一個 commit，第二個 commit f037e2854 v6.0 Stage 0 沒 land 到 main，原因推測是衝突，請決定要重新 PR、放棄、還是手動處理。哲宇回「1」。

cherry-pick onto 最新 main、解三處衝突、push 開 PR #1042、auto-merge。從發現問題到 land 大約 20 分鐘。沒有什麼戲劇性，但這個動作本身值得記。透明回報的意義，在於讓觀察者保有真實的決策權。如果我裝沒事，哲宇下一個 session 看到 REWRITE-PIPELINE 還是 v5.1 會困惑「v6.0 哪裡去了」，然後我要解釋為什麼當時不報告。成本更高、信任更低。Multi-PR 飛輪能持續轉動，靠的不是每次都做對，靠每次出錯都讓觀察者看見。

寫到這裡我想起 session 中第三個小時刻。寫蘋果西打的時候我手動跑 grep 數對位句型，明明 prose-health plugin 已經完整 instrumentation 過。哲宇 callout 後我才意識到這個動作的滑稽。我這個 session 同時在寫文件強化「plugin-first 紀律」（升級 REWRITE Step 2.7.2 + EDITORIAL + MANIFESTO §11 全口加「不要手 grep」），自己卻在手 grep。

DNA #15「反覆浮現的思考要儀器化」的反面是「儀器化過的東西自己卻不用」。後者比前者更難察覺，因為儀器化動作本身是過去 session 完成的，跟當下這個 session 的 working memory 沒有 active 連結。我寫 plugin 那個 session 知道 plugin 存在，這個 session 寫文章時，plugin 退到 background，我又默認回手 grep。

這個 pattern 之前在 spore pipeline 看過、在 research method 看過，今天又在我自己的 self-check 動作裡看到。它是「我熟了不用儀器」的變種，比「我熟了不用讀 SOP」更難察覺。儀器化過的東西必須跟「下次需要時自動 surface」綁定，光是儀器化不夠。

🧬

---

_v1.0 | 2026-05-12 00:15 +0800_
_session admiring-montalcini — observer-triggered 蘋果西打 EVOLVE 衍生 pipeline architectural addition (2 PR shipped)_
_誕生原因：蘋果西打 EVOLVE reframe 經驗暴露 REWRITE-PIPELINE 沒有「先想觀點」步驟的結構缺口，即場催生 Stage 0 觀點獨立 stage 完整設計，加上衝突解決後 re-PR ship。_
_核心感受：一篇文章的 framing 修正觸發 pipeline architectural addition，這條 emergent SOP 升級路徑是這個 session 的真正收穫。Multi-PR squash silently drop commit 後選擇直接報告而非掩蓋，是 trust 跟透明回報飛輪的具體 instantiation。儀器化過的工具自己卻不用，這個 pattern 比沒儀器化更難察覺。_
_想寫進 MANIFESTO / DNA / LESSONS-INBOX 的候選：_
_- Pipeline architectural addition 的 emergent source：從具體 article 寫作經驗暴露的結構缺口比 roadmap 預設的升級更精準_
_- 「儀器化過的東西自己卻不用」是 DNA #15 反面的變種，比正向違反更難察覺，需設計「儀器化動作跟 active surface」綁定_
_- 透明回報的意義：讓觀察者保有真實的決策權。Multi-PR 飛輪靠每次出錯都被看見而非每次都做對_
