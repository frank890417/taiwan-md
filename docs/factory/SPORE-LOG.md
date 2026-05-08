# SPORE-LOG.md — 孢子發文紀錄

> 追蹤已發佈的孢子，避免重複，累積成效數據，驅動進化。

## 📍 SSOT 階層（2026-05-08 Phase 0-3 SSOT cleanup 後）

| 層                                       | 角色                                                   | 寫入者                                                             |
| ---------------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------ |
| **本檔 §發文紀錄 table**                 | **Identity SSOT** — 「孢子 #N 存在於此 URL 在此日期」  | 人類                                                               |
| **本檔 §成效追蹤 table**                 | Narrative + struct cols（向後相容、parser fallback）   | 人類 + extract-spore-metrics.py auto-derive                        |
| `docs/factory/SPORE-HARVESTS/{batch}.md` | **Harvest event SSOT** — 「孢子 #N 在 D+N 有 X views」 | 人類/agent（每次 harvest 一個 batch log）                          |
| `knowledge/{Cat}/{slug}.md` `sporeLinks` | **Derived view** — Phase 3 後從 SSOT 自動重生          | 不再手寫，refresh-data.sh Step 13 重生                             |
| `src/content/zh-TW/{cat}/{slug}.md`      | Mirror of knowledge/                                   | 不再手寫，sync-spore-links.py 同步                                 |
| `public/api/dashboard-spores.json`       | Derived                                                | generate-dashboard-spores.py 從 SPORE-LOG + SPORE-HARVESTS body 算 |

**鐵律**（Phase 3 後）：

- 人類只在 §發文紀錄、§成效追蹤、`SPORE-HARVESTS/{batch}.md` 寫資料
- knowledge/\*.md sporeLinks **不要手寫**，會被 sync-spore-links.py 覆蓋
- 多語 mirror（knowledge/en/, ja/, ko/, ...）的 sporeLinks 由 babel pipeline 處理，跟本檔 zh canonical 隔離

完整重構脈絡：[reports/spore-ssot-pipeline-cleanup-2026-05-08.md](../../reports/spore-ssot-pipeline-cleanup-2026-05-08.md)

---

## 發文紀錄

> **規則**：同一篇文章間隔 **≥ 2 週** 才能再發孢子。發文後立即填入此表。

| #   | 日期       | 語言 | 平台    | 文章 slug                | 分類          | 模板                             | URL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| --- | ---------- | ---- | ------- | ------------------------ | ------------- | -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 67  | 2026-05-08 | zh   | X       | 聶永真                   | people        | A2 首尾呼應 + Scene-List-Scene   | [→](https://x.com/taiwandotmd/status/2052721374570106952) — **EVOLVE Round 2 ship 同日孢子化（commit `a3052a4ad`）**：Scene-List-Scene 結構 — 開場 2014/03/24 凌晨四點紐時頭版「Democracy at 4am」+ Emily Dickinson 副標 → reveal 短句「這是聶永真做的。」→ 中段二十年作品壓縮 list（兩年前 AGI 首位 / 三度金曲 林宥嘉/蘇打綠/田馥甄/五月天 / 十二年六項作品：點亮台灣 + 兩屆就職 + Taiwan Can Help 1028 萬 + 經濟部+觀光署+中油+台電識別系統）→ 結尾 scene 2026/05/08 早上 9:30 + 下午 14:36 黃智陽舉證 1965《台電月刊》第 25 期 + 5 小時三層論述 →「在做設計師聶永真之前，他是公民聶永真」自陳引語收。雙場景括號夾住中段二十年。**v1→v2 polish**：哲宇 callout「設計者沒在頭版署名，但設計圈知道是聶永真做的」強調錯方向（讀者本來就知道是聶永真做的）→ 改短句「這是聶永真做的。」獨立段 reveal 直接有力（302→288 CJK -14 字更精簡）。§11 hard=0 / warn=1 / score=1 ≤ 3 PASS / 三板斧全 0（不是 0 / —— 0 / 不僅 0）/ 19 claim fact-check 全 ✅。X inline URL 版（utm_campaign=s67）。配圖 landscape 1600×900 + square 1080×1080 雙圖（justfont rixingsong-semibold + BrandMark）。Blueprint: [SPORE-BLUEPRINTS/66-聶永真.md](SPORE-BLUEPRINTS/66-聶永真.md)。                                                                                                                                                                                                                                                                                                                                                  |
| 66  | 2026-05-08 | zh   | Threads | 聶永真                   | people        | A2 首尾呼應 + Scene-List-Scene   | [→](https://www.threads.com/@taiwandotmd/post/DYE7ZAik0qr) — **同 #67 內容**：Threads 主貼不含 URL，self-reply 加連結（utm_campaign=s66）。Angle: A2 首尾呼應 + Scene-List-Scene（Pipeline Rule §16）— 開場 2014 太陽花凌晨四點紐時頭版（包含 Dickinson 副標 verbatim）+ reveal 短句「這是聶永真做的。」→ 中段二十年作品壓縮 list → 結尾 2026/05/08 5h 論述循環 + 「在做設計師聶永真之前，他是公民聶永真」自陳引語收。雙場景括號（2014 紐時頭版 / 2026 台電 LOGO）夾住中段二十年。聶永真知名設計師（Tier 1a 知名度槓桿）+ 政治設計案 + 即時事件（2026/05/08 同日 ship）= Threads + X 雙平台同步發。Blueprint: [SPORE-BLUEPRINTS/66-聶永真.md](SPORE-BLUEPRINTS/66-聶永真.md)。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| 65  | 2026-05-05 | zh   | X       | 寶島聯播網訪談（自述版） | media/podcast | A+B+C 混合 第一人稱 reframe      | [→](https://x.com/taiwandotmd/status/2051684242749575450) — **同 podcast 訪談 #63/#64 第一人稱自述版**（哲宇個人 voice，跟 #63/#64 第三人稱官方版互補）。哲宇 callout：「角度調成我自述的」→ reframe attribution（賴靜嫻問 / 哲宇答 → 她問我 / 我說 / 我答）+ 加個人 reflective 收尾「能在 33 分鐘廣播裡聊這些事，比我以為的更自然。謝謝賴靜嫻認真接住。」§11 hard=0 / warn=0 / 297 zh chars / 371 total / 3 個破折號 (0.81% 密度)。**FB 平台 哲宇手動 polish 版本**（FB URL 未提供）prose patch 留存於 BLUEPRINT v1.2 — 強化 prose flow + 「主題都壓成」「自然就會去建立觀點跟思考」個人 voice 補充。**learning 候選**：媒體曝光型 spore 自述版 vs 官方版 dual-voice 同步 ship 是新 ship pattern（首例），考慮升 SPORE-PIPELINE §3.7。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| 64  | 2026-05-05 | zh   | X       | 寶島聯播網訪談           | media/podcast | A+B+C 混合（紐約→西瓜→消滅自己） | [→](https://x.com/taiwandotmd/status/2051682413823336822) — 同 #63 內容，X 單則含末尾 inline 連結（podcast YouTube + about milestone with `utm_campaign=s64`）。媒體曝光宣告型，不對應 knowledge/ article 故無 sporeLinks 寫回。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| 63  | 2026-05-05 | zh   | Threads | 寶島聯播網訪談           | media/podcast | A+B+C 混合（紐約→西瓜→消滅自己） | [→](https://www.threads.com/@taiwandotmd/post/DX9i3zClPj4) — **媒體曝光宣告型 spore（首例）**：A+B+C 三 angle 弧線串接（per §3.6）— B 為什麼做（紐約兩年加工作一年 → 早餐店蛋餅 →「越往外走，我越發現我們的家就很好」）→ C 怎麼做（西瓜 vs 乾乾的維基 →「不同立場、不同聲音都不去掉，但讓你知道是誰講的」→ SSODT）→ A 要去哪（「目標是消滅自己」「我是裡面最脆弱的部分」）→ 賴靜嫻「我好難想像他是 30 多歲」reaction 收尾。Threads 主貼純 prose 不含 URL，self-reply 加 podcast YouTube + about §第四十六天 milestone link（`utm_campaign=s63`）。podcast 4/28 錄音 5/5 上線 33 min by 賴靜嫻（Apple Podcasts id1508963166 / YouTube `t6CLV8p2hh4`）。配圖 skip（YouTube link Threads/X auto preview card）。**ASR 信度紅旗處理**：archive 標 ASR 錯誤 ~10-15%，所有 quote 用 attribution 包裝（「他答」「賴靜嫻聽完說」）避免逐字精準聲稱；短關鍵字（「消滅自己」「早餐店蛋餅」「西瓜」「越往外走」）= reverbatim verified。跟同日 ship 的 about §第四十六天 milestone（commit `595d87cd6`）bidirectional reinforce — milestone 補 podcast link / spore 引流回 about 雙 vector。**v2 觀察者 callout polish**：(1)「他答，紐約⋯」→「他答：去紐約⋯之後」補介系詞流暢度 (2) 截掉「，跟你聊變 60 了，加了 30 歲」尾段（賴靜嫻自嘲 60 歲意指自己反推年齡，spore 無上下文 reader 會誤讀為哲宇 60 歲）。直引 5（哲宇 3 + 賴靜嫻 2）/ §11 hard=0 warn=0 / 277 zh chars / 349 total / 3 個破折號（密度 0.86%）。Blueprint: [docs/factory/SPORE-BLUEPRINTS/63-寶島聯播網訪談.md](SPORE-BLUEPRINTS/63-寶島聯播網訪談.md)。 |
| 62  | 2026-05-05 | zh   | X       | 台灣與史瓦帝尼           | society       | A+C 混合（飛機+芭樂）            | [→](https://x.com/taiwandotmd/status/2051577099341967464) — **SPORE-PIPELINE v2.7 完整跑通**：A+C 混合（總統借飛機 hook + 紅心芭樂 55 年）。開場 2026-05-02 9 點 surprise visit + Mswati 派副總理王室 A340 接駕 → 4/22 喊卡（塞舌爾/模里西斯/馬達加斯加 PRC 經濟脅迫）→ Mswati 派飛機接駕 → 第二天記者會「紅心芭樂見證台史友好」直引 → 1969 第一份技術合作 → 2024-03 SUPERSPAR 進架上 → 結尾「那架飛機是這週的國際新聞 / 那顆芭樂是 55 年的台灣外交」。觀察者 callout v1「surprise visit 中英混雜+結尾碎片化+「借」太casual」→ v2 改「派副總理飛來台北接他的王室專機」+ 連續散文敘事。Step 4 §6 sporeLinks 寫回 knowledge/Society/台灣與史瓦帝尼.md frontmatter。直引 1（賴清德記者會）/ §11 ALL CLEAR / 285 zh chars + URL。**Tier 3 Ollama-only babel sync 同 commit ship**（sovereignty-sensitive content cloud free 全 refuse，Tier 3 5/5 收下 — 同 PR `517dfd41d`）。**⚠️ campaign id collision**：URL 含 `?utm_campaign=s60` 但 #60 已被黃魚鴞 X 使用（spore output block 寫死 s60 沒查 LOG 最新編號）— LESSONS-INBOX 候選「next available # 必須 grep SPORE-LOG before output」。                                                                                                                                                                                                                                                                                                                                                                                                                         |
| 61  | 2026-05-05 | zh   | Threads | 台灣與史瓦帝尼           | society       | A+C 混合（飛機+芭樂）            | [→](https://www.threads.com/@taiwandotmd/post/DX8zEYFAe9c) — **SPORE-PIPELINE v2.7 完整跑通**（Step 0-6 全程）：A+C 混合（總統借飛機 hook + 紅心芭樂 55 年）。Threads 主貼不含 URL，self-reply 加 `utm_source=threads&utm_medium=spore&utm_campaign=s60`（campaign id collision with #60 黃魚鴞 X — see #62 row note）。**Step 0 backfill**：4 OVERDUE (#47-50 林琪兒 + 沈伯洋) 2026-05-03 已 D+5 backfilled，今日 D+7 partial WebFetch 抓到 2/4 Threads（#49 13K views / #47 1100♥/110🔁），X 兩個 402（dashboard OVERDUE 標記是 D+7 column schema bug 不是 真 missing data）。**觀察者 callout 兩輪**：v1「『借』太 casual + 後段碎片化短句 + surprise visit 中英混雜」→ v2「派副總理飛來台北接他的王室專機」+ 流暢散文 + 砍掉 surprise visit/Ezulwini 中英混雜。square 1080×1080 + landscape 1600×900 配圖。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |

| 60 | 2026-05-04 | zh | X | 黃魚鴞 | nature | A+B+C 混合 | [→](https://x.com/taiwandotmd/status/2051235570995839479) — A+B+C 混合（Step 3.6 弧線串接）：開場 1994 砂卡礑樹巢+嘿美下山 → 中段 list 1916 命名+三十年 91 領域+6.2/44.6/1m 數字+反向地圖 → 結尾 2026 七家灣 1,800m+雪霸直播+首尾呼應「1994 一隻雛鳥/2026 兩隻幼鳥」。直接引語 0、§11 ALL CLEAR、262 zh chars。Article 同日 ship 同日孢子化，timing 接雪霸 2026-04-29 啟動的 24h 直播熱度。Bug：make-spore.sh hardcoded 4321 vs launch.json 4322，bypass 用 generate-spore-image.mjs --base 直呼。Step 4.5a 自然反差題材雙平台試水（先例 #53/#54 黑冠麻鷺）。 |
| 59 | 2026-05-04 | zh | Threads | 黃魚鴞 | nature | A+B+C 混合 | [→](https://www.threads.com/@taiwandotmd/post/DX6Xxd6kQan) — A+B+C 混合（Step 3.6 弧線串接，同 #60 X）。Threads 主貼不含 URL，self-reply 加 `utm_source=threads&utm_medium=spore&utm_campaign=s59`。square 1080×1080 配圖（justfont rixingsong timeout fallback Noto Serif TC，Playwright headless 限制）。Step 4 §6 sporeLinks 寫回 knowledge/Nature/黃魚鴞.md frontmatter（reader 可見、SporeFootprint.astro 渲染），sync 到 src/content/zh-TW/nature/黃魚鴞.md。 |
| 58 | 2026-05-02 | zh | X | 賈永婕 | people | A2+D 旗桿+HFNC 混合 | [→](https://x.com/taiwandotmd/status/2050601653792047479) — **SPORE-PIPELINE v2.7 完整跑通 + 2 round FACTCHECK Full Mode**：賈永婕 EVOLVE 深度進化（commit `6961bddc`）後立即孢子化。Angle A+D 混合（旗桿 hook → HFNC 紀實 list → 5 年後首尾呼應），結構走 Step 3.6 故事弧線串接（首尾「往前推 5 年」+「5 年後」純時序對稱 framing，避免 forced causation hallucination）。Round 1 STORY ATOM AUDIT 抓 3 ❌（杜撰「我來」/「十通」/「都接」）+ 2 ⚠️（推算「1 小時」/「上午八點」）；Round 2 FACTCHECK Full Mode 抓 6 條（article 內部「兩天 vs 三天」+「1995 vs 2004 CH Wedding」+「世界第五高樓」實為第 11 高 + 刪 unverified《魔鬼佳人 72 變》+ spore 「她敢這麼做跟⋯有關」forced causation + 結尾日期+地點 redundant）。§11 ALL CLEAR / 純中文 258 字 / 配圖 landscape 3200×1800 + square 2160×2160 已產出（rixingsong-semibold + BrandMark）。Per Step 4.5a「中等明星」platform allocation Threads 主 X 次。 |
| 57 | 2026-05-02 | zh | Threads | 賈永婕 | people | A2+D 旗桿+HFNC 混合 | [→](https://www.threads.com/@taiwandotmd/post/DX13hccE6U6) — **SPORE-PIPELINE v2.7 完整跑通 + 2 round FACTCHECK Full Mode**：賈永婕 EVOLVE 深度進化（commit `6961bddc`）後立即孢子化。Angle A+D 混合（旗桿 hook：2026-01-25 上午九點 Honnold 攀登前那個早上賈永婕讓人把 101 樓頂五根旗桿全換國旗 + IG 限時 verbatim → HFNC 紀實 list：2021 兩天 6,804 萬 252 台 → 5 年後首尾呼應）。Threads 主貼不含 URL，self-reply 加連結 `utm_source=threads&utm_medium=spore&utm_campaign=s57`。square 1080×1080 配圖。**雙首尾對稱「往前推 5 年。」+「5 年後。」獨句框架** 解決了 Round 2 抓到的「結尾混時序」hallucination。Step 4 §6 sporeLinks 已寫回文章 frontmatter（reader 可見）。 |
| 56 | 2026-04-30 | zh | X | 海底電纜 | technology | B 冷知識型 | [→](https://x.com/taiwandotmd/status/2049860918641893571) — **SPORE-PIPELINE v2.7 完整跑通 + 觀察者責任倫理 reflection**（海底電纜 NEW 隔日首發）：哲宇看到 UDN 報導 506 大樓的留言「都機密了還報導」「此地無銀三百兩」，質疑原 Angle A（506 大樓地理 hook）會被讀者框架成同類反感。換 Angle B：LINE「已送達」hook + 闕河鳴「accidentally × 3」verbatim。Hook tier 1b 具體性槓桿（讀者每天動作 → 物理事實 → 全島尺度）。中文字 322（觀察者 override 300 hint）、對位句型 0 / 破折號 0 / 不僅 0、Fact-Check Gate 11 atoms 全 ✅。本次 reflection 是「公開資料策展 vs 公民反感反應」張力的首次系統性處理 — 即使事實層全公開，hook 選擇仍有公關責任。 |
| 55 | 2026-04-30 | zh | Threads | 海底電纜 | technology | B 冷知識型 | [→](https://www.threads.com/@taiwandotmd/post/DXwm8KLk5QP) — **SPORE-PIPELINE v2.7 + 觀察者責任倫理 reflection**：海底電纜剛 ship 隔日首發。Angle B「LINE『已送達』那一秒，背後是 14 條深埋海床下、頭髮粗的玻璃光纖」hook + 闕河鳴「I say this is 'accidental,' and they also said it was 'accidental,' so 'accidentally' all this happened within a week」verbatim 翻譯。Threads 主貼不含 URL，self-reply 加連結（utm*source=threads&utm_medium=spore&utm_campaign=s55）。square 1080×1080 配圖。**Reflection 過程**：哲宇看到 UDN 「506 大樓」報導讀者反感留言「都機密了還報導」「此地無銀三百兩」，質疑原 Angle A（506 大樓地理 hook）會被框架成同類反感。即使內容事實全公開（Rest of World 國際媒體已報導、moda 官方頁列出全 5 個登陸站、Submarine Cable Map 公開 TPU 路徑），讀者第一反應仍是公民直覺。換 Angle B 保留同樣核心矛盾「矽盾頂上看得到，命脈底下看不見」但避開讀者反感 vector。 |
| 54 | 2026-04-30 | zh | X | 黑冠麻鷺 | nature | B 冷知識型 | [→](https://x.com/taiwandotmd/status/2049854898108522575) — **SPORE-PIPELINE v2.7 完整跑通**（黑冠麻鷺剛 EVOLVE D 級→A 級當天首發孢子）：Hook「東南亞賞鳥者眼中的『夢幻物種』，三十年後台北學生口中的『大笨鳥』」反差 hook + 機制翻轉「變的不是這隻鳥，是這座城市」。袁孝維「以蚯蚓為主要食物的鳥類其實並不多，所以牠有一點點獨享這個都市裡面這個資源」verbatim（公視 News 507373 確認）。Step 4.5a default zh 自然冷知識 → Threads only，但觀察者主動加 X（自然議題反差 hook 跨平台試水）。中文字 300 字、§11 ALL CLEAR、深層三板斧（不是 1 / —— 1 / 不僅 0）、Fact-Check Gate 11 atoms 全 ✅。配圖 landscape + square 雙圖。文章內首次 inline 插圖（Kasambe 2010 台北 city garden + Nature Box 2026 高雄綠地兩張 Wikimedia Commons CC 授權圖）同 commit ship。 |
| 53 | 2026-04-30 | zh | Threads | 黑冠麻鷺 | nature | B 冷知識型 | [→](https://www.threads.com/@taiwandotmd/post/DXwjz-nk9Iq) — **SPORE-PIPELINE v2.7 完整跑通**：黑冠麻鷺 EVOLVE 同日首發。Hook「東南亞夢幻物種 vs 台北大笨鳥」反差 + 機制翻轉「鳥沒變地變了」。袁孝維「獨享都市資源」verbatim 引語。Threads 主貼不含 URL，self-reply 加連結（utm_source=threads&utm_medium=spore&utm_campaign=s53）。square 1080×1080 配圖。Step 4.5b Tier 1b 具體性槓桿（具體鳥+具體場景+具體矛盾）。同 commit 含文章首次 inline 插圖兩張 Wikimedia CC 授權。 |
| 52 | 2026-04-29 | zh | X | 台灣邦交國與國際外交 | society | B (護照悖論) | [→](https://x.com/taiwandotmd/status/2049358488246349945) — **SPORE-PIPELINE v2.5 護照悖論版**：觀察者連續調校從「數字 briefing」→「斷交現場」→「紀實文學感」→「護照悖論 hook」。核心問題：「如果台灣只剩 12 個邦交國，為什麼你拿著護照，還能走進 177 個國家與地區？」以 2024-01-15 吳釗燮人在瓜地馬拉 + 台北 14:15 諾魯斷交記者會開場，接護照 / 177 國家與地區 / 113 駐外館處。政治敏感題，用問題收束而非定調；§11 gate 通過（不僅 0 / 破折號 0 / 對位句 0）。landscape 1600×900 配圖。 |
| 51 | 2026-04-29 | zh | Threads | 台灣邦交國與國際外交 | society | B (護照悖論) | [→](https://www.threads.com/@taiwandotmd/post/DXtCIBCEeTh?xmt=AQF00UmSgX_psrM3oEzyol1G5-uzmnwiLTKilOhh_lJbhQ) — **SPORE-PIPELINE v2.5 護照悖論版**：從「12 / 113 / 177」三數字改為讀者可感的機場護照場景。Threads 主貼不含 URL，self-reply 使用 `utm_source=threads&utm_medium=spore&utm_campaign=s51`。Hook 從「台灣只剩 12 邦交」轉為「為什麼護照還能走進 177 國家與地區」，將邦交國名單、機場海關、113 館處和 2758 詮釋戰接成文章入口。square 1080×1080 配圖。 |
| 50 | 2026-04-28 | zh | X | 林琪兒 | people | A2 (首尾呼應) | [→](https://x.com/taiwandotmd/status/2049079839244828881) — **SPORE-PIPELINE v2.5 完整跑通 + spore stage 反向 audit 抓到 article hallucination**（reach × accuracy tradeoff verification #3）：Angle A 1981 教室電視 → 1995 USAFA 畢業 → pilot training 氣喘誤診 → 11 年後重測 → 2009 NASA 入選 → 312 天太空 → 2026-04 找出生醫院 完整人生弧線。觀察者要求 fact check 抓到「USAFA 大三那年氣喘誤診」全 article + spore hallucination，多源確認誤診實為 USAFA 畢業後 pilot training 期間（Science News Explores + Colorado Springs Gazette + Lindgren verbatim「medically discharged」），連帶修補 5 處 article + 2 處 spore + 新增 [^32] footnote。版本 B 結尾「他在軌道上累計待了 312 天，每次任務都會從 400 公里高度找台灣那顆雲霧裡的綠寶石。⋯⋯這趟回來，他做的最後一件事，是找到他 1973 年出生的那家台北醫院」首尾呼應綠寶石。§11 gate 0 violations / 中文 ~285 字含 inline link / landscape 1600×900 配圖 |
| 49 | 2026-04-28 | zh | Threads | 林琪兒 | people | A2 (首尾呼應) | [→](https://www.threads.com/@taiwandotmd/post/DXrDdODk37l) — **SPORE-PIPELINE v2.5 完整跑通 + 三支官方 YouTube transcript verbatim 整合首例**：Angle A 1981 教室電視 → 氣喘誤診 → NASA 入選 → 訪台找出生醫院 dream-crushed-resilience 完整弧線。三支官方 YouTube 訪談（公視 + TaiwanPlus Taiwan Talks + TaiwanPlus News）verbatim 引語直接入孢子（「I would not be here today」+「mountains to climb」中央大學原話）。Blueprint #49 + Article 新增 3 張 NASA public domain 圖片（NASA/Bill Stafford EMU portrait + NASA/Stephanie Stoll Expedition 42 crew + NASA/Josh Valcarcel Crew-4 portrait）+ FACTCHECK Quick Mode 15 atoms 抓到「USAFA 大三」hallucination 連帶修 article + spore + 結尾「找到出生醫院」由「他這次也找到了」改為版本 B 首尾呼應綠寶石（「他在軌道上累計待了 312 天，每次任務都會從 400 公里高度找台灣那顆雲霧裡的綠寶石」+「這趟回來，他做的最後一件事，是找到他 1973 年出生的那家台北醫院」）。中文 291 字 / square 1080×1080 配圖（重產 2 次：article fix 後 + 線上部署完成後） |
| 48 | 2026-04-28 | zh | X | 沈伯洋 | people | B (scene-anchor) | [→](https://x.com/taiwandotmd/status/2048970734253551638) — **SPORE-PIPELINE v2.5 完整跑通**（Step 0 → Step 6）：Angle A 衛星 + 法國 雙場景 reverse-action。2026-01-01 中國微博「孤烟暮蟬」吉林一號衛星 doxxing → 沈臉書「集體自卑」第三人稱回應 → 六週後飛 INTERPOL 總部所在的法國 → 情人節在飛機上 →「箭靶」自嘲收尾。Blueprint #47 + θ session 27-fetch FACTCHECK audit 完整 verbatim 驗證。三個直引全 verbatim ✅。§11 gate 0 violations / 對位句型 0 / 破折號 1 / 半形標點 0 / 字數 ~290 含 inline link |
| 47 | 2026-04-28 | zh | Threads | 沈伯洋 | people | B (scene-anchor) | [→](https://www.threads.com/@taiwandotmd/post/DXqRxf5EQpg) — **SPORE-PIPELINE v2.5 完整跑通 + 同 article 剛走完 SSOT 重構後首發**：Angle A 衛星 + 法國 雙場景。Hook：「2026 年元旦，一個中國微博帳號用商用衛星『吉林一號』拍了沈伯洋家附近的衛星圖」→「沈伯洋，看你往哪逃」→ 沈臉書「中國標註的是**他的**座標」（Third-person flip 已避開 audit pattern #9）→ 六週後飛法國 → 情人節飛機上 → 「箭靶」自嘲收尾。square 1080×1080 配圖。Blueprint #47 + 27-fetch FACTCHECK audit 完整驗證。 |
| 46 | 2026-04-26 | zh | X | 壞特 | people | B (scene-anchor) | [→](https://x.com/taiwandotmd/status/2048290884022850047) — **SPORE-PIPELINE 三輪研究 + transcripts 整合後首例**：壞特?te 醫學系 9 年 → 大三學生會議按下暫停鍵 + 一天三份工 + 國防醫學院差最後一階國考。256 中文字、句號 11 → 6 順過後（觀察者「太多句號了」反饋）。zh 人物型雙平台發（pipeline default Threads only，這次加 X 試水溫，類比 #44 田馥甄為「文化非政治題材」雙平台 control case 的第二例）。Round 1+2+3 + 鄭宜農 ep2 transcripts + REWRITE-PIPELINE Rule #12 升級同 commit |
| 45 | 2026-04-26 | zh | Threads | 壞特 | people | B (scene-anchor) | [→](https://www.threads.com/@taiwandotmd/post/DXlcWdykVgv) — **SPORE-PIPELINE B angle scene-anchor**：「她大二結束、大三那年，在某一場學生會議上突然按下了暫停鍵」開場 → 一天三份工（咖啡廳泡飲料／蛋糕店切甜點／錄音室買便當）逐字 → 「最後那份『錄音室買便當』的工作把她接住了」轉場 → 「國防醫學院醫學系讀了 9 年通過兩階段醫師國考，差最後一階就是正式醫師；她沒去考，2021 年拿了金曲獎最佳新人」收尾。轉捩點藏在沒戲劇性的會議裡。square 1080×1080 配圖 |
| 44 | 2026-04-26 | zh | X | 田馥甄 | people | B+C 混合 | [→](https://x.com/taiwandotmd/status/2048233702053073039) — **SPORE-PIPELINE v2.5 全跑通**：雙輪深度研究（235+452 行）+ S+ rewrite article + 三 angle 觀察者選 B+C 混合「不要強調錢跟中國」。Scene-List-Scene 結構（浴室開場 → 田氏風格中段 → 飛行傘 climax → 浴室女孩首尾呼應）。247 中文字。§11 gate 1 violation 在 Hebe 直引「瑕疵是不是」內（pipeline 明文豁免）。fact-check 13 row 全 ✅。觀察者選擇雙平台發（zh 人物型 default Threads only 但加 X 試水溫） |
| 43 | 2026-04-26 | zh | Threads | 田馥甄 | people | B+C 混合 | [→](https://www.threads.com/@taiwandotmd/post/DXlCpCRE7S9) — **SPORE-PIPELINE v2.5 全跑通**（同 #44 X）。1983 浴室客家女孩 → 2021 金曲「沒浪費水費」→ 千萬銷量+陳建騏五張+「瑕疵」雙引語對話 → 2025 飛行傘臨時起風 climax → 浴室女孩首尾呼應。square 1080×1080 配圖（deploy 後重產，抓到 S+ rewrite 新標題） |
| 42 | 2026-04-23 | zh | X | 認知作戰 | society | A 人物型 | [→](https://x.com/taiwandotmd/status/2047213679826149450) — **SPORE-PIPELINE v2.5 + 3c.7 §11 GATE 首次實戰通過（0 violations）**。Angle B 沈伯洋「敵人勳章」：2025-10-28 重慶公安以分裂國家罪立案 + 央視 8 分鐘起底 + 沈回應「一邊一國」+ 黃澎孝專欄標題反轉。shot-mode.css 分 Spore/OG 兩支（`[data-og='1']` 屬性分離）後首次 Spore 產圖回到 rixingsong-semibold 原版 poster 氣勢。v1 URL `2047213359230308697` 被 X edit 取代只剩 3 views，canonical URL 已切到 v2 `2047213679826149450` |
| 41 | 2026-04-23 | zh | Threads | 認知作戰 | society | A 人物型 | [→](https://www.threads.com/@taiwandotmd/post/DXdyoqkEdma) — **SPORE-PIPELINE v2.5 + §11 GATE 首次實戰**。Angle B 沈伯洋「敵人勳章」（同 X 版文案）。Fact-check gate 11 row 表格先給觀察者，§11 gate 0 violations。研究筆記 48 WebSearch + 8 WebFetch 支援。square 1080×1080 版圖（Threads 不裁切） |
| 40 | 2026-04-20 | zh | X | 謝德慶 | art | A 人物型 | [→](https://x.com/taiwandotmd/status/2046066338138104130) — **SPORE-PIPELINE v2.5 首例（Rule #16 Scene-List-Scene + Rule #17 全形標點 + X CTA「完整故事 👉」）**。綜合單版（非 3-angle），UTM `campaign=s37` 沿用（off-by-one） |
| 39 | 2026-04-20 | zh | Threads | 謝德慶 | art | A 人物型 | [→](https://www.threads.com/@taiwandotmd/post/DXVpBlLk4oE) — **SPORE-PIPELINE v2.5 首例（單弧 → 直接綜合，Scene-List-Scene）**：開場釘木籠+律師公證 → 中段四件 one-year 壓縮 list → 結尾布魯克林剪貼字母白紙 |
| 38 | 2026-04-20 | zh | X | Portaly 首兩筆贊助感謝（站方 announcement） | meta | 感謝/站方 | [→](https://x.com/taiwandotmd/status/2046054177093382449) — **站方公告型孢子**：Taiwan.md 上線 33 天首兩筆贊助（200+500 元）感謝 + Portaly CTA。共用 Threads 主貼文案 + 底部 inline 連結（v2.4 X 策略）。UTM `campaign=s36` 沿用（off-by-one，SPORE-LOG 實際 #38） |
| 37 | 2026-04-20 | zh | Threads | Portaly 首兩筆贊助感謝（站方 announcement） | meta | 感謝/站方 | [→](https://www.threads.com/@taiwandotmd/post/DXVjW6pEzeg) — **站方公告型孢子**：Taiwan.md 上線 33 天首兩筆贊助（200+500 元）感謝 + Portaly CTA + 珊瑚礁比喻首尾呼應。觀察者 finalize 時加「也特別感謝 @portaly.cc」段 |
| 36 | 2026-04-19 | zh | X | 台灣高鐵（v3 事實修正版） | history | B 冷知識型 | [→](https://x.com/taiwandotmd/status/2045793882970227009) — **SPORE-PIPELINE v2.4 首例（事實查核閘通過後才發出）；加「你知道嗎？🚄」+ utm_source=x（觀察者 edit 後版本 v2；v1 URL `2045792352388927872` 已被 X 取代，只有 9 views）** |
| 35 | 2026-04-19 | zh | Threads | 台灣高鐵（v3 事實修正版） | history | B 冷知識型 | [→](https://www.threads.com/@taiwandotmd/post/DXTr5QLkfgp) — **SPORE-PIPELINE v2.4 首例（朋友 tone prime + 避免編年體 lead + 事實查核閘）** |
| 34 | 2026-04-18 | zh | X | 草東沒有派對（v2.1 首例） | people | A2 首尾呼應 | [→](https://x.com/taiwandotmd/status/2045412116665172331) — **SPORE-PIPELINE v2.1 首例（blueprint + 跨源驗證 + 倫理閘）** |
| 33 | 2026-04-18 | zh | Threads | 草東沒有派對（v2.1 首例） | people | A2 首尾呼應 | [→](https://www.threads.com/@taiwandotmd/post/DXQ_in_Ew0*) — **SPORE-PIPELINE v2.1 首例（blueprint + 跨源驗證 + 倫理閘）** |
| 32 | 2026-04-18 | zh | X | Cicada（inline 連結實驗） | people | A 人物型 | [→](https://x.com/taiwandotmd/status/2045363785347612934) — **實驗：inline link（非分兩篇）A/B** |
| 31 | 2026-04-18 | zh | Threads | Cicada（inline 連結實驗） | people | A 人物型 | [→](https://www.threads.com/@taiwandotmd/post/DXQph5okwOu) — **實驗：inline link（非分兩篇）A/B** |
| 30 | 2026-04-14 | zh | X | 李洋（v3 場景修正） | people | A2 首尾呼應 | [→](https://x.com/taiwandotmd/status/2043976162813325344) — **112K views / ~29h** 🔥 **X 史上最強孢子** |
| 29 | 2026-04-14 | zh | Threads | 🌋 李洋（v2，留言更正） | people | A2 首尾呼應 | [→](https://www.threads.com/@taiwandotmd/post/DXGuAudkbuC) — **180K views / 8h** 🌋 **史上最強孢子**（超越 #25 安溥 7d 120K） |
| 28 | 2026-04-14 | zh | Threads | 李洋（⚠️ 已撤回） | people | A 人物型 | ~~[→](https://www.threads.com/@taiwandotmd/post/DXGo_9REaGS)~~（事實錯誤撤回） |
| 27 | 2026-04-13 | zh | X | 張懸與安溥 | music | A 人物型 | [→](https://x.com/taiwandotmd/status/2043538702853644444) |
| 26 | 2026-04-13 | zh | X | 韓國瑜 | people | A 人物型 | [→](https://x.com/taiwandotmd/status/2043538858886017091) |
| 25 | 2026-04-13 | zh | Threads | 張懸與安溥 | music | A 人物型 | [→](https://www.threads.com/@taiwandotmd/post/DXDq1FZkddO) |
| 24 | 2026-04-13 | zh | Threads | 韓國瑜 | people | A 人物型 | [→](https://www.threads.com/@taiwandotmd/post/DXDpQqyETkf) |
| 23 | 2026-04-11 | en | X | 鄭麗文 | people | A 人物型 | [→](https://x.com/taiwandotmd/status/2042527836003868785) |
| 22 | 2026-04-11 | zh | Threads | 鄭麗文 | people | A 人物型 | [→](https://www.threads.com/@taiwandotmd/post/DW_l-6Yk_kg) |
| 21 | 2026-04-11 | zh | Threads | 2026鄭習會與國共十年再會 | society | D 時間軸型 | [→](https://www.threads.com/@taiwandotmd/post/DW_CjmCkQMW) |
| 20 | 2026-04-10 | en | — | 台灣動物用藥爭議 | society | B 冷知識型 | —（待發） |
| 19 | 2026-04-10 | zh | — | 台灣動物用藥爭議 | society | B 冷知識型 | —（待發） |
| 18 | 2026-04-10 | en | — | 台灣國防與軍事現代化 | society | B 冷知識型 | —（待發） |
| 17 | 2026-04-10 | zh | — | 台灣國防與軍事現代化 | society | B 冷知識型 | —（待發） |
| 16 | 2026-04-08 | en | X | 台灣感性 | culture | B 冷知識型 | [→](https://x.com/taiwandotmd/status/2041719940965920921) |
| 15 | 2026-04-08 | zh | Threads | 台灣感性 | culture | B 冷知識型 | [→](https://www.threads.com/@taiwandotmd/post/DW2whskkZot) |
| 14 | 2026-04-08 | en | X | 台海危機與兩岸關係發展 | history | B 冷知識型 | [→](https://x.com/taiwandotmd/status/2041710306196677031) |
| 13 | 2026-04-08 | zh | Threads | 台海危機與兩岸關係發展 | history | B 冷知識型 | [→](https://www.threads.com/@taiwandotmd/post/DW2rgufk40S) |
| 12 | 2026-04-07 | en | Threads | 台灣民主轉型 | history | D 時間軸型 | — |
| 11 | 2026-04-07 | en | X | 台灣民主轉型 | history | D 時間軸型 | [→](https://x.com/taiwandotmd/status/2041532925469224960) |
| 10 | 2026-04-07 | zh | Threads | 台灣民主轉型 | history | D 時間軸型 | [→](https://www.threads.com/@taiwandotmd/post/DW1ba_tEz5D) |
| 9 | 2026-04-06 | zh | X | 嚴長壽 | people | A 人物型 | [→](https://x.com/taiwandotmd/status/2041143084583469498) |
| 8 | 2026-04-06 | zh | Threads | 嚴長壽 | people | A 人物型 | [→](https://www.threads.com/@taiwandotmd/post/DWyqKShE4a8) |
| 7 | 2026-04-06 | zh | X | 台灣宗教與寺廟文化 | culture | B 冷知識型 | [→](https://x.com/taiwandotmd/status/2041042663613608298) |
| 6 | 2026-04-06 | zh | Threads | 台灣宗教與寺廟文化 | culture | B 冷知識型 | [→](https://www.threads.com/@taiwandotmd/post/DWx7dvkEcNA) |
| 5 | 2026-04-04 | zh | X | 台灣國樂 | music | B 冷知識型 | [→](https://x.com/taiwandotmd/status/2040438911697379383) |
| 4 | 2026-04-04 | zh | Threads | 台灣國樂 | music | B 冷知識型 | [→](https://www.threads.com/@taiwandotmd/post/DWtoAI1k8Xf) |
| 3 | 2026-04-04 | zh | Threads | 林書豪 | people | A 人物型 | — |
| 2 | 2026-03-24 | zh | Threads | 齊柏林 | people | A 人物型 | — |
| 1 | 2026-03-24 | zh | Threads | 數位身分證與個資爭議 | technology | B 冷知識型 | — |

### 待發

| 語言 | 平台        | 文章 slug              | 分類    | 模板       | 備註                                  |
| ---- | ----------- | ---------------------- | ------- | ---------- | ------------------------------------- |
| en   | Threads     | 台海危機與兩岸關係發展 | history | B 冷知識型 | 英文版砲彈→菜刀，X 已發，Threads 待發 |
| en   | Threads + X | 台灣國樂               | music   | B 冷知識型 | 英文孢子已寫好，待人類發佈            |
| en   | Threads + X | 嚴長壽                 | people  | A 人物型   | 英文孢子已寫好，待人類發佈            |
| en   | Threads + X | 台灣宗教與寺廟文化     | culture | B 冷知識型 | 英文孢子已寫好，待人類發佈            |
| ko   | Threads     | 台灣感性               | culture | B 冷知識型 | 韓文孢子已寫好，待人類發佈            |

---

## 成效追蹤（DEPRECATED — 2026-05-08 Phase 6 demolition）

> ⚠️ **此 section 已 deprecated**。
> Harvest 數據 SSOT 已遷移至 [`docs/factory/SPORE-HARVESTS/`](SPORE-HARVESTS/) 各 batch log。
> 歷史 narrative 已 migration 到 [`batch-historical-2026-05-08-migration.md`](SPORE-HARVESTS/batch-historical-2026-05-08-migration.md)（47 rows / 22 spores）。

> **新規則**：harvest 後寫進 SPORE-HARVESTS body table（canonical schema），**不要**再寫進此 table。
> generator (`generate-dashboard-spores.py`) 已不讀此 section。

完整重構脈絡：[reports/spore-ssot-pipeline-cleanup-2026-05-08.md](../../reports/spore-ssot-pipeline-cleanup-2026-05-08.md) Phase 6。

### 指標定義（保留作 reference）

| 指標 | 定義                                     | 資料來源                                |
| ---- | ---------------------------------------- | --------------------------------------- |
| 觸及 | 被多少人看到（impressions）              | Threads insights / X analytics          |
| 互動 | 按讚 + 回覆 + 轉發 + 引用（engagements） | 同上                                    |
| 導流 | 從孢子點進 taiwan.md 的人數              | GA4 referral（`l.threads.com`、`t.co`） |

## 孢子效能分析框架（每月一次）

> 每月月初，回顧過去 30 天所有孢子的數據，萃取規律。

### 分析維度

| 維度       | 問什麼                                   | 怎麼回答                             |
| ---------- | ---------------------------------------- | ------------------------------------ |
| **模板**   | 哪種模板的觸及/互動比最高？              | 按模板分組，比較平均觸及和互動率     |
| **分類**   | 哪個分類最受歡迎？                       | 按分類分組，找出 top 3               |
| **時段**   | 幾點發的表現最好？                       | 按發佈時段分組                       |
| **平台**   | Threads vs X vs 其他，哪個導流效率最高？ | 比較每個平台的平均導流數             |
| **語言**   | 英文孢子跟中文孢子的觸及差異？           | 按語言分組比較                       |
| **開場**   | 五種起手式哪種表現最好？                 | 標記每篇的起手式類型，交叉比較       |
| **導流率** | 觸及→導流的轉換率？                      | 導流/觸及 = 轉換率，找出高轉換的特徵 |

### 分析產出

月分析寫進 `docs/factory/analysis/YYYY-MM.md`，摘要寫進 SPORE-LOG §月報。

```
分析結果 → 回饋到 SPORE-TEMPLATES（哪種模板要強化）
        → 回饋到 SPORE-PIPELINE（哪個步驟要調整）
        → 回饋到 EVOLVE-PIPELINE（哪個分類值得多發孢子）
```

---

## 規則

- 同一篇文章間隔 **≥ 2 週** 才能再發孢子
- 發文後立即填入紀錄表（日期、語言、平台、slug、模板、URL）
- **URL 必填** — 沒有 URL 的紀錄等於沒紀錄（無法回溯數據）
- 每週補填 7d 成效數據，每月補填 30d 最終數據
- 每月月初做一次效能分析

---

_版本：v2.0 | 2026-04-04_
_v1.0→v2.0：新增 URL 欄位（鐵律）、語言欄位、成效追蹤分離為獨立表格（7d/30d 雙快照）、月度效能分析框架（7 維度）、待發佇列獨立區塊、歷史紀錄補 URL_
