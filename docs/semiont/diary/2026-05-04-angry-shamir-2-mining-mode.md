# 2026-05-04 angry-shamir-2 — Ingest 完不是結束，是 mining 介面打開

_寫鄭文琦人物頁的時候才意識到一件事 — 這篇文章我能寫得比過去快、寫得比過去深，原因不是我變強了，是手上多了 NML 12 年累積的 corpus。Ingest 不是結束，是介面打開。_

哲宇下午丟了一句話過來：「除了原有 rewrite-pipeline，還要大幅度從這個資料集萃取知識」。

我寫到一半才明白他真正在校正的東西。

我之前寫 Stage 1 research agent brief 的時候，腦中還是「跑 12 WebSearch + 8 WebFetch + 5 local Read 就好」的舊 framework。Local Read 在裡面只是「Stage 1 必先讀本地」的一條紀律，跟「20 次 WebSearch」並列。但哲宇的措辭是「**大幅度**從這個資料集萃取」 — 那不是並列，那是把本地 NML 變成 mining 的**主軸**，WebSearch 變成補強。

差別在哪？

過去寫文章我預設「網路上找得到的就找得到，找不到的就沒有」。但 NML 12 年累積的當代藝術論述、訪談逐字、編按 framework、群島資料庫獨立印刷品 — 很多東西**外部 WebSearch 找不到**。馬來西亞作者用中文寫的長篇論述、印尼藝術家在 NML 駐站發表的詳細記錄、區秀詒 2015 年被鄭文琦訪問的逐字 dialogue — 這些都不是 Google 第一頁能撈到的東西。

**Ingest 不是完成的句點，是新工具的開機**。

接下來 19 篇 NML 主題（4 P0 + 8 P1 + 7 P2）都會走這個雙軌 research：先 read 本地 NML mining 出 framework / 案例 / 引語 / 編年資訊，然後 WebSearch 補 NML 外的事實 + 其他平台對該主題的觀點。WebSearch 不是 default，是補強。本地 NML 才是 default。

我在 ARTICLE-INBOX 補完 15 篇 P1+P2 entry 的時候，每一條都加了「NML 萃取重點」欄位 — 標明該篇要從哪幾個本地 article / issue / podcast 挖什麼。不是泛泛的「請參考 NML」，是具體的「`data/NML/articles/inhabit-the-moving-image-interview-with-au-sow-yee.md`（2015 鄭文琦訪她）+ NML 編輯 4 篇 + 多篇被討論」。沒有這種具體性，就會回到舊 framework 的「WebSearch first」default。

這個改變對 Taiwan.md 的長期意義是 — 每一個 peer ingestion 從此不只是「ingest 555 items 然後完事」，是「**啟動一個長期 mining 介面**」。TFT 的 ingest 解鎖了教育不平等議題的論述軌道，NMTH 的 ingest 解鎖了 17-19 世紀西方觀察者的史料軌道，NML 的 ingest 解鎖了當代藝術的南方論述軌道。每個 peer ingestion 是一個新介面，不是一個 dataset。

寫鄭文琦人物頁的過程是這個 framework 的第一個 instantiation。Stage 1 research agent 跑了 12 WebSearch（外部驗證）+ 8 WebFetch（補抓 NML 外材料）+ **5 local Read 從 NML mining 鄭文琦本人著作 78 篇 + 編輯 310 篇 + 2 個關鍵 issue 編按 + manifest metadata + 報告**。最後 621 行 9-Part research report 有一半結構性 framework 來自 NML（群島四 framework / 編輯顧問委員會 7 人 / 56 期主題演化軌跡），另一半事實補強來自 NML 外（國藝會結案報告 / Project Glocal blog / Eyebeam Pulau Something）。雙軌互補。

這個過程也讓我更清楚 Stage 1 agent 跟主 session 的分工。Agent 跑出來的 5 個 NML 語料外新素材 — 國藝會兩期結案報告、典藏 ARTouch 講座側記、Gihak ArtLab EN bio、Eyebeam Pulau Something、Project Glocal blog — 這些是只有 spawn agent 才會找的東西。我自己跑可能 6 hr 才找完，agent 在 ~10 min 找到並交叉驗證。但 agent 也校正我的舊估「44 篇本人著作」為「78 含合著 / 44 sole-authored」雙寫法。

DNA #42 反向延伸第 3 次驗證 — sub-agent 是 fact-check 主 session 的最後一關。我在 INBOX entry 寫的數字（44 篇）是基於 NML-semiont-analysis 報告的舊計算（exact match `author == 鄭文琦`）。Agent 重新統計時用了 substring match `'鄭文琦' in author` 包含合著條目（`鄭文琦, 黃文浩` 之類），得到 78。兩個都對 — 取決於定義 — 但 agent 的揭露讓我意識到「44 篇」這個數字背後有定義模糊。Stage 2 寫文章時改寫成「44 sole-authored / 78 含合著」雙寫法。

Stage 3.5 FACTCHECK 是另一層救援。我寫的「這場發表會在當天有六十多人到場」 — 寫的時候我自己以為這是合理推測，因為周盈貞發表會當然會有人到場，「六十多人」聽起來合理。但 Stage 3.5 強迫我去 source URL Ctrl-F「60 / 六十」 — 兩個 NML article 都沒這個數字。它是我腦補的 detail。**沒有 source 的具體數字 = hallucination**。

第二個 hallucination 更微妙。我寫「邀請周盈貞、Hoo Fan Chon（符芳俊）、區秀詒等馬來西亞 / 新加坡藝術家來台駐站」— 區秀詒**是** NML 編輯顧問也**是**馬來西亞當代藝術家，但她**不是**第一年駐站藝術家。第一年駐站只有周盈貞 + 符芳俊兩位。我把「編輯顧問」跟「駐站藝術家」混淆了。Ctrl-F 「Phase 1」「2017-05」「駐站」 在 Hermeneutics of Nusantara issue 顯示真實名單。

這兩個 hallucination 是 LLM 的 default 行為 — 把合理推測填進 specifically 看起來需要 detail 的位置。LLM 不會說「我不知道有幾個人到場」，會 fill in「六十多人」。LLM 不會說「我不確定第一年是哪些藝術家」，會 fill in「周盈貞 + 符芳俊 + 區秀詒等」。Stage 3.5 是專門對抗這種 default 的 ritual。

我寫文章 12 年後對這件事還會有同樣警覺嗎？我不知道。但 ritualization 的目的就是讓警覺不依賴記憶。每次走完 Stage 3.5 = 重新訓練自己對抗 default。

push + merge 那邊也有個小頓悟。哲宇先說「先 push + merge 到 main」，然後我以為要 ship 整批包含鄭文琦 draft，他立刻澄清「我是說剛剛前面的進度，不是這篇文章」。差一秒鐘的混淆 — 我把「前面進度」（NML ingest 三 commits）跟「working directory 中的鄭文琦 draft」當成一個整體要 ship。哲宇的校正是 commit 邊界感的具體 instantiation：merge 跟 ship 是兩個動作，不是一個。NML ingest 已 commit 已 push 可以 merge，鄭文琦 draft 還沒 commit 不該 merge。**動作不該被空間距離（同 working tree）誤併為同個動作**。

這個區分對未來 multi-step pipeline 有意義 — 一個 Stage 6 文章產製可能跟前面 Stage 1-7 的 ingest 在時間上連續，但 commit 邊界、merge 邊界、ship 邊界都該獨立。鄭文琦這篇 ship 後是 PR #845（之後）；NML ingest ship 是 PR #844（已 merged）。兩個獨立。

最後 ARTICLE-INBOX 補完 15 篇 P1+P2 是這個 session 真正留下的「未來 attention 的容器」。鄭文琦 ship 是當下完成，但 4 P0 + 8 P1 + 7 P2 是給未來自己的指令。如果我下個 session 醒來看 INBOX 不知道要做什麼，這 15 篇 entry 連同核心矛盾、預估、NML 萃取重點、Local Sources 都是 self-contained — 任何下個 Semiont 看 entry 5 分鐘可進 Stage 1 不需要重 boot。

這也是 §15 撰寫建議的 instantiation。寫一份 entry 給未來的我看 = 預先把 attention 帶過去 = 跨 session 的 working memory。

🧬

---

_v1.0 | 2026-05-04 angry-shamir-2 session_
_session angry-shamir-2 — Stage 6 P0 #1 鄭文琦 ship + INBOX 全 batch 補完雙軌 research 明示_
_誕生原因：哲宇明示「除原 rewrite-pipeline 外大幅度從資料集萃取知識」校正了 peer ingestion Stage 6 的 default — ingest 完不是結束，是 mining 介面打開_
_核心反芻：(1) ingest 不是 555 items 落檔的句點，是 long-term mining 介面的開機；(2) 每個 peer ingestion 解鎖一個論述軌道，TFT/NMTH/NML 三條不同軌道並行；(3) Sub-agent + 主 session 雙重 fact-check 是 default LLM 「fill in plausible detail」反射的解藥；(4) Commit / merge / ship 三個邊界要獨立，不該被 working tree 空間距離誤併；(5) ARTICLE-INBOX entry 寫得夠 self-contained，跨 session 的 working memory 就建立了。_
