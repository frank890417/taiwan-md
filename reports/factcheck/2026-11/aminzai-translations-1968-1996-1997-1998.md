# aminzai 翻譯 PR 查核：#1968（id）／#1996（es）／#1997（vi）〈金馬獎〉與 #1998（vi）〈中華職棒〉

查核日：2026-11-16。唯讀；未 checkout、未 commit、未在 GitHub 留言。
母稿：`knowledge/Art/金馬獎.md`（main 上 11-02 後未再動）、`knowledge/Culture/中華職棒.md`。
各 PR head sha：#1968 `5f42d4416d87`、#1996 `25ac8b7bac43`、#1997 `8b071630f905`、#1998 `221948001659`。譯文抓到暫存資料夾比對，工作檔在 `/private/tmp/claude-501/-Users-cheyuwu-Projects-taiwan-md/f40573d2-9967-4d47-94cc-0e08106302e1/scratchpad/aud/`。

## 方法與證據來源

- 英文片名的主證據：金馬獎官網「入圍得獎名單」中英兩版（`goldenhorse.org.tw/awards/nw/?search_regist_year=YYYY` 與 `?r=en&search_regist_year=YYYY`），兩版行序逐行對齊，因此中文片名與官方英文名可直接對應；另抓了作者自己在腳註引用的影片資料頁（`/film/about/archive/detail/3337`、`/1276`、`/4241`、`/762`、`/1398` 的 `?r=en` 版）。
- 官網沒有收錄、或對不上的，用英文維基與 WebSearch 補，並在列內標明；仍查不到的標 NOT_FOUND，建議改回中文原名。
- 機械檢查 `verify-translation.py`：四份都是 18 項通過、1 項 WARN（translation ratio 無對照列，與品質無關）。腳註數 92／32 與母稿相同、章節數 10／9 相同、URL 多重集合完全保留（115／32）、author 非 AI、featured 為 false。**機械檢查看不到片名錯，下面的錯全部是它放行的。**
- 我另外用腳註編號出現次數比對母稿與三份〈金馬獎〉譯文，`[^n]` 的分布完全一致，沒有指錯槽位。

---

## #1968 金馬獎（印尼文 id）

### 一、維護者 11-07 列的六處，現況

| 項目                | 現況（head 5f42d44）                                                                         | 判定         |
| ------------------- | -------------------------------------------------------------------------------------------- | ------------ |
| 鍾雪瑩              | 本文與 [^74] 都是 `Chung Suet-ying (鍾雪瑩)`                                                 | 已修對       |
| 看我今天怎麼說      | [^74] `*The Way We Talk*`；官網 2024 頁對得上                                                | 已修對       |
| 時代革命            | 本文、[^72]、[^76] 都是 `Revolution of Our Times`                                            | 已修對       |
| 周冠威              | `Kiwi Chow (周冠威)`                                                                         | 已修對       |
| 眾生相              | 本文與 [^75] 都是 `Queerpanorama (眾生相)`；官網 2025 頁 `Queerpanorama`                     | 已修對       |
| [^33] 1988 最佳導演 | [^33] 已是 `Alex Law (羅啟銳)`；官網 1988 頁 Best Director 得獎者 `Alex LAW / Painted Faces` | [^33] 已修對 |

**但同一個錯在正文還留著一份**：第 88 行列 1981–1995 香港最佳導演，第五位仍寫 `Peter Chan`，母稿與官網都是羅啟銳 Alex Law。作者只修了 [^33]，漏了這句。

### 二、其餘仍錯的片名與人名（全部是 MISMATCH，逐條可照改）

證據欄的「官網」指金馬官網中英對照頁。

| #   | 位置                    | 現況                                        | 應為                                            | 證據                                                                                                                                         |
| --- | ----------------------- | ------------------------------------------- | ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | 第 88 行                | `Chang Kuo-ming`                            | `Cheung Kwok-ming`                              | 官網 1982 最佳導演 `CHEUNG Kwok-ming`（章國明）                                                                                              |
| 2   | 第 88 行                | `Michael Mak`                               | `Johnny Mak`                                    | 官網 1984 最佳導演 `Johnny MAK`（麥當雄）                                                                                                    |
| 3   | 第 88 行                | `Peter Chan`                                | `Alex Law`                                      | 官網 1988 `Alex LAW`；母稿「羅啟銳」                                                                                                         |
| 4   | 第 130 行、[^49]        | `Dede`（一家子兒咕咕叫）                    | `Coo-Coo 043`                                   | 官網 2022 頁中英對照 `Coo-Coo 043`；作者自己在 [^49] 引的 `/film/about/archive/detail/3337` 頁名就是 `Coo-Coo 043`（Country/Region: Taiwan） |
| 5   | 第 156 行               | `Guikuang 2`（掃毒2）                       | `The White Storm 2: Drug Lords`，或中文 `掃毒2` | 英文維基 _The White Storm 2: Drug Lords_（掃毒2：天地對決）。es 版已寫對                                                                     |
| 6   | 第 174 行、[^50]、[^79] | `Dark Nights of Heaven`（大濛）             | `A Foggy Tale`                                  | 官網 2025 頁 `CHEN Yu-hsun / A Foggy Tale`；`/detail/4241` 頁名 `A Foggy Tale`；zh 維基連結 en 為 A Foggy Tale                               |
| 7   | 第 191 行               | `Sunshine Sisters`（陽光女子合唱團）        | `Sunshine Women's Choir`，或保留中文            | 官網 2026 入圍頁中英對照 `Sunshine Women's Choir`                                                                                            |
| 8   | 第 193 行               | `The Most Terrible Time in My Life`（最愛） | `Passion`                                       | 官網 1986 最佳女主角 `Sylvia CHANG / Passion`。「The Most Terrible Time in My Life」是另一部（我生命中最悲慘的時刻）的名字                   |
| 9   | 第 193 行               | `Lonely Seventeen`（燈火闌珊）              | `A Light Never Goes Out`                        | 官網 2022 頁中英對照 `A Light Never Goes Out`                                                                                                |
| 10  | [^50]                   | `Design of Death`（神探亨特張）             | `Beijing Blues`                                 | 官網 2012 頁、`/detail/762` 頁名 `Beijing Blues`                                                                                             |
| 11  | [^50]                   | `Soul Mate`（八月）                         | `The Summer Is Gone`                            | 官網 2016 頁、`/detail/1398` 頁名 `The Summer Is Gone`。Soul Mate 是《七月與安生》                                                           |
| 12  | [^69]                   | `Pierce`（小曉）                            | `Trouble Girl`，或只留 `小曉`                   | 官網 2023 頁中英對照 `Trouble Girl`                                                                                                          |
| 13  | [^73]                   | `Mama's Affair`（白日青春）                 | `The Sunny Side of the Street`                  | 官網 2022 頁中英對照 `The Sunny Side of the Street`（es 版已寫對）                                                                           |
| 14  | [^84]                   | `The Autumn`（秋決）                        | `Execution in Autumn`                           | 英文維基 _Execution in Autumn_（1972，李行），第 10 屆最佳劇情片                                                                             |

### 三、NOT_FOUND（我找不到官方英文名，建議改回中文原名）

| 位置      | 現況                                                                                    | 搜過                                                                                 | 建議                                                                                                 |
| --------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------- |
| 第 63 行  | `The Bones of Wanhua`（萬華白骨事件）、`Three Beauties Vying for a Husband`（三美爭郎） | 金馬官網（1957 非金馬官方年度）、zh 維基（無 en 連結）、WebSearch                    | 改回 `《萬華白骨事件》`、`《三美爭郎》`（es 版就是這樣處理）。這兩個像是譯者自己譯的，母稿是中文片名 |
| 第 102 行 | `Red Earth, Blue Sky`（衣錦還鄉，1989）                                                 | 官網 1989 頁（被取消資格的片不在名單）、zh 維基 `衣錦還鄉 (電影)` missing、WebSearch | 改回 `《衣錦還鄉》`                                                                                  |

### 四、較小的處理建議（不影響事實，可由維護者斟酌）

- 第 197 行〈搭錯車〉那句變成 `lewat *搭錯車*, sesungguhnya *搭錯車* (搭錯車)`，同一個中文片名重複三次，是翻譯殘跡。母稿該句是「他 1983 年的《搭錯車》讓孫越拿下影帝」，應刪成一次。官方英文名是 `Papa, Can You Hear Me Sing?`。
- 多處形如 `*真假千金* (真假千金)`、`*女孩* (女孩)`、`*地母* (地母)`、`*夜來香* (夜來香)`、`*星星月亮太陽* (星星月亮太陽)`、`*狂忘警探* (狂忘警探)`，括號內外是同一個中文，可去掉括號。
- 官方英文名可選擇補上（作者目前留中文，不算錯）：地母 `Mother Bhumi`、狂忘警探 `Arrested Memory`、女孩 `Girl`、三個女人的故事 `Full Moon in New York`、搭錯車 `Papa, Can You Hear Me Sing?`。
- [^87] 孽子 `Outcasts`：不是錯（IMDb 等有用），官網英文名為 `The Outsiders`。
- 人名羅馬拼音抽查（Tsui Hark、Patrick Tam、Yim Ho、Ann Hui、John Woo、Wong Kar-wai、Maggie Cheung、Chow Yun-fat、Anthony Chen、Yeo Yann Yann、Chong Keat Aun、Wu Kang-ren、Jun Li、Lou Ye、Chen Yu-hsun、Johnnie To、Lloyd Lee CHOI、Fan Bingbing、Chang Chen、Sylvia Chang）與官網一致。Ling Po、Yu Chi-chung、Kang Ming、Ko Yu-hsia 官網無對照，沒驗，不判錯。

### 整體判斷：**request-changes**（或維護者代修）

六處已修對；但仍有 14 處 MISMATCH（其中第 4、6、8、9 是錯到換成另一部片或另一個名字）加 2 處無法佐證的自譯片名，且錯的集中在作者自承「沒逐一對官方來源」的保留英文片名。建議維護者代修後合併，一次替換清單即上表第二、三節。若維護者希望省事，最安全的整批處理是：凡表中查不到官方名的一律改回《中文原名》。

---

## #1996 金馬獎（西班牙文 es）

### 一、六處

| 項目           | 現況                                         | 判定         |
| -------------- | -------------------------------------------- | ------------ |
| 鍾雪瑩         | `Chung Suet-ying (鍾雪瑩)`                   | 對           |
| 看我今天怎麼說 | [^74] `*看我今天怎麼說*`（中文）             | 對（未亂譯） |
| 時代革命       | `Revolution of Our Times`                    | 對           |
| 周冠威         | `Kiwi Chow (周冠威)`                         | 對           |
| 眾生相         | `*眾生相*`（中文，本文與 [^75]）             | 對（未亂譯） |
| 1988 最佳導演  | 本文列 `Alex Law`、[^33] `Alex Law (羅啟銳)` | 對           |

es 版**沒有**維護者在 id 版找到的那五個錯。好於 id 版。

### 二、仍錯或可疑的片名（全在腳註）

| #   | 位置  | 現況                                                                                                   | 應為                                        | 證據                                                                                                                                  |
| --- | ----- | ------------------------------------------------------------------------------------------------------ | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | [^38] | `Darkness and Light`（美麗時光）                                                                       | `The Best of Times`，或 `《美麗時光》`      | 官網 2002 最佳劇情片 `The Best of Times`。Darkness and Light 是張作驥另一部片（黑暗之光）                                             |
| 2   | [^61] | `Mrs. K`（繼園台七號）                                                                                 | `No. 7 Cherry Lane`，或 `《繼園台七號》`    | 繼園台七號英文片名 `No. 7 Cherry Lane`（id 版寫對）。Mrs. K 不是這部                                                                  |
| 3   | [^28] | `Waiting for Dawn`（等待黎明）                                                                         | `Hong Kong 1941`，或 `《等待黎明》`         | 官網 1985 最佳男主角 `CHOW Yun-fat / Hong Kong 1941`。「Waiting for Dawn」是字面直譯，不是片名                                        |
| 4   | [^3]  | `Star, Moon, Sun`（星星月亮太陽）                                                                      | `Sun, Moon and Star`，或 `《星星月亮太陽》` | 英文維基 _1st Golden Horse Awards_ 與 _Sun, Moon and Star_（1961）。台灣今日等處另有 Stars, Moon and Sun 的拼法，所以保守作法是留中文 |
| 5   | [^84] | `Autumn Execution`（秋決）                                                                             | `Execution in Autumn`                       | 英文維基 _Execution in Autumn_，第 10 屆最佳劇情片                                                                                    |
| 6   | [^27] | `Night Caprice`（夜來香）                                                                              | 建議改回 `《夜來香》`                       | NOT_FOUND：官網 1981 頁該片只有中文名，zh／en 維基也沒找到 `Night Caprice`                                                            |
| 7   | [^87] | `Crystal Boys`（孽子）                                                                                 | `The Outsiders`（官網），或留 `《孽子》`    | Crystal Boys 是白先勇小說的英譯名，不是電影官方名；輕微                                                                               |
| 8   | [^61] | 把掃毒2、使徒2、追龍2 譯成西班牙文片名（`Diputado del Narco 2`、`Apóstol 2`、`Perseguir al Dragón 2`） | 改回中文 `《掃毒2》《使徒2》《追龍2》`      | 自譯片名，母稿用的是中文；本文第 156 行寫的 `The White Storm 2: Drug Lords` 是對的                                                    |

### 三、人名

- 1981 `Tam Kar-ming`：官網作 `Patrick TAM`，本文其他處也沒統一，建議改 `Patrick Tam`。
- `Sze Qin Gao Wa`（斯琴高娃）：慣用 `Siqin Gaowa`。
- `Lee Chun-shek (李駿碩)`：他的通行英文名是 `Jun Li`（官網 2025 頁）。
- `Yang De-chang`（楊德昌）：慣用 `Edward Yang`，站內 slug 是 `yang-dechang` 所以不算錯，只是與 id 版不一致。
- 以上都是輕微，其餘 `Cheung Kwok-ming`、`Johnny Mak`、`Alex Law`、`Kiwi Chow`、`Chung Suet-ying` 與官網一致。

### 整體判斷：**fix-on-merge**

6 處維護者清單全對；剩下是腳註裡 5 個確定錯（第 1、2、3、5 項加第 4 項有官方依據的版本）與 3 個可疑／自譯名。正文片名我沒有發現錯。逐條替換：

- `*Darkness and Light*` → `*The Best of Times*`
- `*Mrs. K*` → `*No. 7 Cherry Lane*`；同句的 `"Diputado del Narco 2", "Apóstol 2", "Perseguir al Dragón 2"` → `《掃毒2》《使徒2》《追龍2》`
- `*Waiting for Dawn* (等待黎明)` → `*Hong Kong 1941* (等待黎明)`
- `*Star, Moon, Sun* (星星月亮太陽)` → `*Sun, Moon and Star* (星星月亮太陽)`
- `*Autumn Execution* (秋決)` → `*Execution in Autumn* (秋決)`
- `*Night Caprice* de Tsui Hark` → `*夜來香* de Tsui Hark`
- `*Crystal Boys* (孽子)` → `*The Outsiders* (孽子)`（可選）

---

## #1997 金馬獎（越南文 vi）

### 一、六處

| 項目                | 現況                                       | 判定           |
| ------------------- | ------------------------------------------ | -------------- |
| 鍾雪瑩              | `Chung Tuyết Oánh`（漢越音），[^74] 也一致 | 對             |
| 看我今天怎麼說      | `《看我今天怎麼說》`（中文，[^74]）        | 對             |
| 時代革命            | `Revolution of Our Times (《時代革命》)`   | 對             |
| 周冠威              | `Châu Quán Uy`                             | 對             |
| 眾生相              | `《眾生相》`（中文）                       | 對             |
| [^33] 1988 最佳導演 | `Lạc Khải Nhuệ`（羅啟銳），正文列表同      | 人對；音讀見下 |

### 二、英文片名逐一判斷

vi 版保留的斜體英文片名全部對得上官網：`The Terrorizers`、`A Brighter Summer Day`、`The Wedding Banquet`、`Vive L'Amour`、`Painted Faces`、`Red Dust`、`Crouching Tiger, Hidden Dragon`、`Lust, Caution`、`In the Heat of the Sun`、`Comrades: Almost a Love Story`、`Infernal Affairs`、`Kung Fu Hustle`、`The Warlords`、`Cape No. 7`、`The Assassin`、`A Sun`、`My Missing Valentine`、`The Falls`、`Shadow`、`Dying to Survive`、`An Elephant Sitting Still`、`Our Youth in Taiwan`、`Ilo Ilo`、`Wet Season`、`Abang Adik`、`Stonewalling`、`An Unfinished Film`、`Revolution of Our Times`、`Lucky Lu`、`Growing Up`、`Center Stage`、`The Reporter`、`Variety`。**MISMATCH 0。**

### 三、其他

- 越南文版對部分中文片名自行譯成越南語並用斜體：`Con rối của con trai tôi`（兒子的大玩偶）、`Câu chuyện của Tiểu Tất`、`Tôi đã sống qua đời mình như thế`、`Người bù nhìn rơm`、`Ngọn núi câm lặng`、`Ba câu chuyện về những người phụ nữ`、`Về làng trong vinh quang`（衣錦還鄉）、`Thời khắc đẹp`、`Không thể thiếu em`、`Trăng sao mặt trời`、`Giả như tôi là thật`、`Đợi đến rạng đông`（等待黎明）等。這些不是官方越南片名，是譯者自譯。不算事實錯，但同篇一部分片名用英文、一部分用自譯越南文、一部分留《中文》，體例不一。官方英文名可對照的有 `The Sandwich Man`、`Kuei-Mei, a Woman`、`Full Moon in New York`、`Hong Kong 1941`。請維護者決定是否統一成「英文官方名＋《中文》」。
- 衣錦還鄉的自譯 `Về làng trong vinh quang` 同 id 版 `Red Earth, Blue Sky`，查不到來源，建議改 `《衣錦還鄉》`。
- 漢越音：羅啟銳應讀 `La Khải Nhuệ`（羅 = La），`Lạc` 對應的是駱／洛字；`Lạc Khải Nhuệ` 疑為誤讀。信心中等，維基越文可再確認。
- 站內連結：`/vi/people/yang-dechang`、`/vi/people/ang-lee`、`/vi/people/sylvia-chang`、`/vi/art/taiwanese-cinema`、`/vi/culture/golden-bell-awards` 為作者所列，我只確認母稿同名檔存在，沒逐一確認 vi 檔存在。
- 第 63 屆入圍段（狂忘警探、陽光女子合唱團、女孩）全以中文《》保留，不會錯。

### 整體判斷：**pass**（建議維護者順手改 `Lạc Khải Nhuệ` → `La Khải Nhuệ` 並決定片名體例）

---

## #1998 中華職棒（越南文 vi）

### 結構

- 章節：母稿 9 個 H2，譯文 9 個 H2，無 H3；腳註 32／32；腳註引用次數 98／98；URL 多重集合 32 全保留（verify-translation 已確認）。
- 長度：母稿正文約 9,000 字，譯文約 24,000 字元（越南文本來就比中文長，單位不同）；母稿 183 行、譯文 179 行，兩邊段落一一對得上，**沒有被摘要壓縮**。tw-timeline（6 列）、tw-bars（3 列）、延伸閱讀 3 條、「站在這條線上的人」4 段全在。
- frontmatter：author `Taiwan.md Contributors`（與母稿相同，非 AI）、featured false、rationale 四欄與母稿逐字相同（保留中文，屬可接受）。

### 數字、年份、人名、球隊名逐項比對（母稿 → 譯文）

全部數字（越南文千分位點、小數逗號已正規化後）人工逐段比對無差：
1989-10-23、1990-03-17、4:3、3:0、1987-12-31、1988-01-18、1997 累計千萬與七隊、十一隊、1996 黑鷹、1998-09 時報鷹解散、2000 場均 1,676、2001 世界盃 15 位球員／3:0 日本／第三度第三名、2002-10-25 與 2003-01-13 合併、2003-03-01 天母、2005-07 十人、2007-08 黑鯨、2008-10 黑米、2008-11-11 中信鯨解散、2013 二審兩年、2009-10-26 黑象、24 人起訴、2010 近三成、2012-12-17 1.3 億、2016 富邦 3 億、2017-09-12 加盟 5.8＝3.6＋1.2＋1、2019／2021／2022／2024 年份、28,618、34,506、40,000、2,766,386、7,684、20,689、132,625、4:1 第十冠、80,000、10,373、3,734,429、31 億、1 億美元、230,615、2027 年 3 月、第 6 戰 6:0、4 勝 2 敗、第 6 冠、梅賽鍶 100 球 8 局 2 安打 6 三振、連續 10 個出局數、第 6 局首安、5 分、勝騎士 7 局 3 失分／4.1 局／休 4 天／5 局、38,178。**無遺漏、無改動。**

球隊名與人名：Wei Chuan／Uni-President／Sanshang／Brother／Times Eagles／Chun-Kuo／Sinon／Hoshin／Sheng Bao／Era TV／Taiwan Major League／Chintai Suns／First Financial Diamonds／La New Bears／Chientai Cobras／CTBC Whales／E-DA Rhinos／Fubon Guardians／TSG Hawks 與母稿對應；人名 Hung Teng-sheng（洪騰勝）、Tang Pan-pan（唐盼盼）、Sadaharu Oh、Yu Hung-kai（余宏開）、Wang Chun-liang（汪俊良）、Chang Chih-chia、Chen Chin-feng、Lin Te-fu、Chen Shui-bian、Chou Ssu-chi、Tsai Chi-chang、Mercedes、Chang Cheng-yu、Chiang Shao-hung、Lin Kai-wei、Chen Chun-hsiu、Kao Yu-chieh、Mario Sanchez 均對。

### 唯一的事實性問題

| 位置                 | 現況                                          | 應為                        | 證據                                                                                                                                                                                                                                                                                                                                                           |
| -------------------- | --------------------------------------------- | --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 「第二次瀕死」黑米段 | `Media Rhinos — trước đây là Chientai Cobras` | `Media T-Rex`（米迪亞暴龍） | 米迪亞暴龍英文名為 Media T-Rex；Rhinos 是義大犀牛（E-DA Rhinos），文中同篇另一處也用到，會混淆。這個錯同樣出現在站上既有的 en 版 `knowledge/en/Culture/chinese-professional-baseball-league.md`（「Media Rhinos—formerly the Chinatrust Cobras」，另外 Cobras 是誠泰不是中信），應視為從 en 版帶過來的錯，建議兩邊一起修。信心中等，未能在本次抓到一手英文來源 |

### 小處

- 兩處標題前缺空行（tw-timeline 結尾的 ```後直接接`## Ngày 17…`、`## Thời đại…`、`## Tài liệu tham khảo`），多數 Markdown 解析器仍會正確渲染，建議補空行。
- `Mercedes ... loại liên tiếp 10 lượt đánh đầu tiên`：母稿是「連續抓下 10 個出局數」，同義。
- 站內連結 `/vi/culture/taiwan-baseball-culture`、`/vi/society/taiwan-sports-olympics`、`/vi/people/lee-ju-eun` 三個檔都存在於 knowledge/vi/。

### 整體判斷：**pass**（可選：把 `Media Rhinos` 改成 `Media T-Rex`，或由維護者與 en 版一併修）

---

## 整體判斷

| PR    | 語言／篇    | 判斷                                                                           |
| ----- | ----------- | ------------------------------------------------------------------------------ |
| #1968 | id 金馬獎   | **request-changes**，或維護者代修後合併（見 #1968 第二、三節共 16 條逐條替換） |
| #1996 | es 金馬獎   | **fix-on-merge**，維護者代修 5 確定＋3 可疑（見 #1996 末尾清單）               |
| #1997 | vi 金馬獎   | **pass**（建議順改 `La Khải Nhuệ`，片名體例請維護者定）                        |
| #1998 | vi 中華職棒 | **pass**（可選修 `Media Rhinos`）                                              |

規律：作者對維護者點到的六處改得乾淨（id 版 [^33] 以外還漏了第 88 行正文 `Peter Chan`），但**沒有人逐一對過保留的英文片名**，id 版錯最多、es 版錯在腳註、vi 版因為多用中文與自譯所以最少。#1996 與 #1997 很可能是用同樣方式產生，但同一批錯並沒有一路複製到三個語言（es 沒有 id 的 Dede／Dark Nights／Pierce／Mama's Affair 等），不能互相代入，每個語言都要自己驗。

## 我沒有驗到的東西

- 母稿本身的事實（腳註來源是否支持母稿說法）不在本次範圍，沒驗。
- 官網 1981–1989 年的中英名單有幾列行序未對齊，這些年份的人名是用名單中同列的人名比對，不是逐一核對；1957、1962、1963 年無官方英文名單。
- `The Love Eterne`（梁山伯與祝英台）、`The Reporter`、`Center Stage`、`Variety`、`Global Views Monthly`、`Business Today`、`Commercial Times` 等沿用通行英文名，未逐一對官方網站。
- 越南文漢越音（人名）只抽查了幾個，不是系統性比對。
- `Night Caprice`、`Red Earth, Blue Sky`、`The Bones of Wanhua`、`Three Beauties Vying for a Husband` 是 NOT_FOUND，不等於一定錯；我建議改回中文是因為站上其他語言版（ja／fr／es）的既有做法。
- 譯文語意（非片名人名的句子）只做了抽查，沒有逐句對照；#1998 的數字比對是完整的。
- 越南文版站內連結只確認了 #1998 的三個，#1997 的連結沒逐一查檔。
- Wikipedia API 在中途被 429 限流，`衣錦還鄉`、`最愛 (1986)` 等維基連結查詢因此未成功，改用官網與 WebSearch。WebSearch 結果是摘要，僅作輔證：`The White Storm 2: Drug Lords`、`Execution in Autumn`、`Sun, Moon and Star`、`The Outsiders`/`Outcasts` 這四條以它為主要證據。
