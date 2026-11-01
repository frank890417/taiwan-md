---
title: 識別系統字體研究：justfont 現況、授權風險、開源繁中與拉丁字候選
date: 2026-10-22
status: research-raw（給識別系統報告取材，未進編輯流程）
scope: Taiwan.md 識別系統重新設計 / 字體
method: WebFetch 中文 prompt 逐字擷取 + google/fonts METADATA.pb + GitHub API + 本機 fontTools 實測
---

# 識別系統字體研究

> 讀法：每個事實後面附來源連結。標「查不到」的是官方頁面沒寫、搜尋也沒找到的項目，沒有猜。標「本研究實測」的是我下載字型檔用 fontTools 量的，不是別人的說法。標「推論」的是從證據推出來、來源沒有直接寫的結論。

## 0. 站上現況（本 repo 實際載入方式）

- justfont 網頁字型 SDK 專案編號 65854，在 [`src/layouts/Layout.astro`](../../../src/layouts/Layout.astro) 第 329–390 行以 `_jf.push` 設定。
- 字型對應：
  - `jf-jinxuanlatte-regular`（400）→ `main p, main li, main td`
  - `jf-jinxuanlatte-semibold`（600）→ `.prose h1–h6`
  - `jf-lanyanghei-extrabold`（800）→ `h2–h6, nav, button`
  - `jf-lanyanghei-extraheavy`（920）→ `h1`
  - `jf-lanyangming-book`（300）→ `main blockquote`
  - `jf-kamabit`（700）→ `.jf-food h1`
  - `rixingsong-semibold`（600）→ `.jf-history h1, .hero-title`
- Logo 在 [`src/components/Header.astro`](../../../src/components/Header.astro) 第 1043–1068 行：`.logo` 用 Noto Serif TC 700，`.logo-dot` 用 Noto Sans TC 600；兩者由 Layout 的 Google Fonts 連結載入（Layout.astro 第 219、228 行）。
- 站上已有的 justfont 事故紀錄：短時間大量請求會被 rate limit（[reports/og-pipeline-patch-plan-2026-04-22.md](../../og-pipeline-patch-plan-2026-04-22.md)），日星宋的子集化對含「鴞」的標題會壞（Layout.astro 第 395–420 行註解）。

---

## 1. 五支 justfont 字體：名稱、出品、故事

### 對照表

| 站上代號              | 正式名稱                                  | 設計者／出品                  | 狀態                 |
| --------------------- | ----------------------------------------- | ----------------------------- | -------------------- |
| `jf-jinxuanlatte`     | 金萱那提（jf Jin Xuan Latte）             | justfont；林霞領軍（見下）    | 2020 全系列完成      |
| `jf-lanyanghei`       | 蘭陽黑體 New                              | 林霞（字體總監）              | 全系列 5 字重 W7–W11 |
| `jf-lanyangming`      | 蘭陽明體                                  | 林霞領銜                      | 2021 募資、2022 出貨 |
| `jf-kamabit`          | 柑仔蜜（jf Kamabit）                      | 采柔（英文名 Nana Shen）      | 2025 年初開放下載    |
| `rixingsong-semibold` | 日星宋體貳號（Rixing Song No. 2）的數位版 | 日星鑄字行 × justfont；張介冠 | 2025 年募資推出      |

「kamabit 與 rixingsong 是哪一支」的答案：**kamabit = 柑仔蜜；rixingsong = 日星宋體貳號**。證據：

- justfont 官方字體清單的連結代號就是 `kamabit`，中文名「柑仔蜜」：[justfont.com/fonts](https://justfont.com/fonts)（導覽也列在 [justfont.com](https://justfont.com)）。
- justfont 網頁字型服務的字型清單中，名稱含「日星」的只有一項「日星宋體貳號」（標示 VIP）：[webfont.justfont.com](https://webfont.justfont.com)。`rixingsong` 這個英文代號沒有被官方頁面直接對照，「日星宋體貳號 = rixingsong」是由清單中日星只有一項推得（推論）。
- SDK 代號尾巴的 `-semibold`、`-extrabold`、`-extraheavy` 對應到官方哪一個字重名稱：蘭陽黑體官方只標 W7–W11（[justfont.com/lanyanghei](https://justfont.com/lanyanghei/)），日星宋體貳號清單未標字重（[webfont.justfont.com](https://webfont.justfont.com)）。**對照表查不到**，要確認得查 webfont 後台。

### 1.1 金萱那提（jf-jinxuanlatte）

- 官方描述：「香又甜，萌又圓。筆畫圓潤，金萌、金 Q，胖嘟嘟。回甘茶湯加牛奶，混出醇厚香甜滋味。」見 [justfont 部落格](https://blog.justfont.com/?p=9212)；官方頁用語為「明體穩重優美，配上圓體活潑好動」「像牛奶遇見茶葉」：[justfont.com/jinxuan-latte](https://justfont.com/jinxuan-latte)。
- 九個字重，以「分糖」命名：一分糖 UltraLight、二分糖 Light、三分糖 Book、四分糖 Regular、半糖 Medium、六分糖 SemiBold、七分糖 Bold、八分糖 ExtraBold、九分糖 Heavy：[justfont.com/jinxuan-latte](https://justfont.com/jinxuan-latte)。因此站上 `regular` = 四分糖、`semibold` = 六分糖（由表對應，推論）。
- 時間：金萱那提全系列 2020 年完成發佈，見 [justfont 里程記事](https://justfont.com/about)。
- 設計者：金萱那提個別頁面未寫設計者；搜尋摘要指出林霞帶領 justfont 團隊製作金萱與金萱那提（二手整理，來源 [justfont 部落格](https://blog.justfont.com/?p=9212) 與 [Inside 蘭陽明體報導](https://www.inside.com.tw/article/24837-justfont-lanyangming) 的敘述）。個別署名**查不到**。
- 它的母體金萱：
  - 2015 年 9 月 8 日在群眾募資網站 flyingV 上線，募得新臺幣 2593 萬元：[維基百科 justfont](https://zh.wikipedia.org/wiki/Justfont)。
  - 同日 Bnext 報導當天累積破千萬，贊助者稱讚「金萱」是「切中台灣庶民文化的命名巧思」：[Bnext](https://www.bnext.com.tw/article/37322/BN-2015-09-08-233106-77)。
  - Inside 報導：「僅 11 小時就集資破千萬，累積金額超過 2,600 萬元、超過 7 千人贊助」，2021 年成為金曲獎典禮指定字型：[Inside](https://www.inside.com.tw/article/24837-justfont-lanyangming)。
  - 官方宣稱「世上第一個由群眾募資成真的中文字型」，設計理念「用明體的情感，接枝黑體的簡潔」，字數由募資時的三百字符累積到十三萬字：[justfont.com/jinxuan](https://justfont.com/jinxuan/)。
  - 金萱各階段：2016 半糖、2017 微糖、2018 全系列、2020 那提，見 [里程記事](https://justfont.com/about)。
- 注意：Inside 與維基的金額（2,600 萬 vs 2,593 萬）是同一件事的四捨五入，寫報告以維基的 2,593 萬為準。

### 1.2 蘭陽黑體 New（jf-lanyanghei）

- 設計者：「字體總監 林霞」，頁面自稱她是「蘭陽黑之母、justfont 共同創辦人暨字體總監」：[justfont.com/lanyanghei](https://justfont.com/lanyanghei/)。
- 理念（官方原文）：「多數黑體追求無色、無味、中性，蘭陽黑體想要的則不同」；「黑體不該只求清晰易讀，也能寫出詩意與懷想」；「蘭陽明體的初衷，也是蘭陽黑體的追求」：同上。
- 全系列 5 字重（W7–W11）：同上。
- 命名由來：黑體頁面**沒寫**。「蘭陽」取自宜蘭的古稱，這點由明體的報導確認（見下），黑體沿用（推論）。
- 發表日期：頁面未列，里程記事也未列蘭陽黑體 New 的年份。**查不到**。

### 1.3 蘭陽明體（jf-lanyangming）

- 命名：Inside 報導引原文：「以家鄉命名的『蘭陽明體』，取法雕版印刷氣質」；「身為宜蘭人，林霞從宜蘭的水看見字的可能性」；「水的流動與變化，使我了解事物不必然會依照我們既定的印象」：[Inside](https://www.inside.com.tw/article/24837-justfont-lanyangming)。
- 設計者：設計總監林霞領銜，為金萱後最重大的製作：同上；[T 客邦](https://www.techbang.com/posts/89947-justfont-officially-released-lanyangming-font)。
- 時間：報導發表於 2021 年 9 月 21 日，預告同年十月底在蘭陽明體官網與挖貝 Wabay 募資（T 客邦，同上）；募資突破兩千萬，2022 年準時出貨：[里程記事](https://justfont.com/about)。
- 字重：webfont 清單列蘭陽明體 W2–W6、W7 共 6 個字重（W2–W7）：[webfont.justfont.com](https://webfont.justfont.com)。

### 1.4 柑仔蜜（jf-kamabit）

- 設計者：「設計師采柔為了探究『什麼是生根於台灣土壤的字體？』，到處採集有『人味』的字」：[justfont.com/kamabit](https://justfont.com/kamabit)。字型商店英文頁署名 Nana Shen、「A type designer at justfont」：[store.justfont.com/en/font/jf-kamabit](https://store.justfont.com/en/font/jf-kamabit)。
- 故事（官方原文）：「靈感源於早年的手繪招牌美術字，中宮開闊、粗筆畫，吸引目光的同時清楚好辨識」；「采柔便循古法，像招牌師傅一樣提起筆畫字」；「柑仔蜜就是番茄，也是一種家的味道」；預計製作超過 8000 字：[justfont.com/kamabit](https://justfont.com/kamabit)。
- 發表：官方頁寫「將於 2025 年 1 月中旬開放下載」（同上）；商店頁只有版權年 2026，**正式上市日查不到**。
- 命名由來：官方頁沒有明說「柑仔蜜」的由來，只用「番茄」「家的味道」這類閩南語脈絡的描述（同上）。**由來查不到**。
- 字重：商店頁寫「1 weights」（單一字重）：[store 頁](https://store.justfont.com/en/font/jf-kamabit)。站上設 `weight 700` 只是告訴瀏覽器當作粗體使用。

### 1.5 日星宋體貳號（rixingsong-semibold）

- 日星鑄字行：
  - 創立年：Taipei Times 寫 1969 年由張介冠的父母創立：[Taipei Times 2009](https://www.taipeitimes.com/News/feat/archives/2009/08/27/2003452093)；中央社 2017 年 4 月 30 日稱 5 月 1 日「成立屆滿 48 週年」，約同年：[中央社](https://www.cna.com.tw/news/firstnews/201704300069.aspx)；justfont 部落格寫 1968 年由第一代老闆張錫齡創立：[justfont 部落格](https://blog.justfont.com/?p=5893)。**年份有 1968／1969 兩說，寫報告時標「1968 或 1969」或避開**。
  - 館藏：「世界上最完整的正楷、宋體、黑體鉛字銅製母模與數台鑄字機器」（中央社）；Taipei Times 稱約 20 萬個銅模，是全世界最後一套完整的傳統中文鉛字銅模。
  - 店名取「日日新、日日生產、日日生財」的吉祥意涵（justfont 部落格）。
- 數位化路徑：
  - 銅模修復計畫 2008 年首度發起、2016 年以募資推行：[justfont 部落格 2025/06](https://blog.justfont.com/2025/06/rixing-song2-revivals/) 標題所述。
  - 2009 年日星在網路號召志工做復刻，鉛字打樣掃描後以向量軟體數位化，部分損壞字須重繪：[justfont 部落格](https://blog.justfont.com/?p=5893)。
  - 原有鉛字磨損嚴重，翻模電鍍已不可行，改為掃描印刷樣張後以向量軟體描邊修整，再以 CNC 機台刻銅模；數位字型保留墨漬痕跡；另新製作拉丁字母、西式標點與數字，拉丁字母以 Goudy Old Style 為原型但最後已大不相同，由設計師林芳平設計：[justfont 2025/06 文](https://blog.justfont.com/2025/06/rixing-song2-revivals/)、[搜尋整理](https://blog.justfont.com/?p=21794)。
  - 年逾七旬的張老闆從頭學 Glyphs 軟體，用滑鼠雕琢貝茲曲線；「數位版日星宋體貳號」幾乎沒有尖角與直線；上架挖貝（WaBay）兩週近 2000 人贊助、突破 500 萬：[Marie Claire](https://www.marieclaire.com.tw/lifestyle/art/87276)。
- 2025 年日星鑄字行與 justfont 共同推出「日星宋貳」募資；製作公司標示中子藝映工作室：[justfont 2025/06 文](https://blog.justfont.com/2025/06/rixing-song2-revivals/)。**具體字重、授權條款、募資總額在官方文中查不到**。
- 字形脈絡：justfont 2013 年文章推測日星宋體屬日系明朝體的一支（「相貌標緻、結構穩重」），並指出日星刻意保留細節差異：以「櫟」字為例，「樂」左右兩個「ㄠ」一個沒出頭一個出頭；張老闆認為「在相同的形態中表現單字本身的獨特性，是漢字生命力的來源」：[justfont 2013](https://blog.justfont.com/2013/09/rixing-song-why-special-a/)。2025 文也說「宋體貳號」的漢字多半源自日本岩田母型製造所：[搜尋摘要所引部落格](https://blog.justfont.com/?p=21794)。
- 「貳號」是鉛字號數，約 21 pt（[2025/06 文](https://blog.justfont.com/2025/06/rixing-song2-revivals/)），不是字重。

---

## 2. justfont 授權：能不能轉外框、網頁訂閱 vs 桌機、fork 風險

### 2.1 官方條款說了什麼

| 問題                                       | 官方答案                                                                                                               | 來源                                                                                               |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| 做標準字／招牌字可以嗎                     | 可以，「可以自由改造字型用於招牌字與標準字」                                                                           | [常見問題](https://justfont.com/faq)                                                               |
| 轉外框                                     | 常見問題沒有「轉外框」專條；通用授權頁摘要也「未提及文字轉外框的規定」。允許改造做標準字等於允許把字形變成圖形（推論） | [常見問題](https://justfont.com/faq)、[jf 通用授權](https://store.justfont.com/universal-contract) |
| 註冊商標                                   | 「使用、調整 jf 字型完成 Logo 設計後，若要向智慧財產局申請商標，需另購商標授權」                                       | [jf 通用授權](https://store.justfont.com/universal-contract)                                       |
| 桌機授權裝置數                             | 一套授權最多同時安裝於授權人的兩台裝置                                                                                 | [商店頁](https://store.justfont.com/en/font/jf-jinxuanlatte)                                       |
| 分享字型檔                                 | 禁止分享給第三者安裝使用；禁止上傳至雲端共編、設計或 AI 服務；「不能以任何形式公開散佈字型檔案」                       | [商店頁](https://store.justfont.com/en/font/jf-kamabit)、[常見問題](https://justfont.com/faq)      |
| 放到網頁                                   | 必須使用 justfont Web Font 服務；「禁止把字型檔上傳至伺服器」；要掛載伺服器請洽 ASP 授權                               | [通用授權](https://store.justfont.com/universal-contract)、[常見問題](https://justfont.com/faq)    |
| 嵌入 App／遊戲                             | 需另購嵌入式授權；做成圖片則不需額外授權                                                                               | [通用授權](https://store.justfont.com/universal-contract)                                          |
| 提供給多人使用的平台（線上編輯器、產生器） | 屬 ASP 授權，另洽談                                                                                                    | 同上                                                                                               |

通用授權條款正文在網頁上是折疊的，抓取工具只拿到標題與摘要，**逐條原文需要人在瀏覽器展開 [store.justfont.com/universal-contract](https://store.justfont.com/universal-contract) 讀**，這是本研究的缺口。

### 2.2 網頁訂閱（Web Font 方案）

來源：[webfont.justfont.com/membership](https://webfont.justfont.com/membership)

- 免費會員：10,000 PV、35 套免費網頁字型、1 個月內用完、單一網址、有廣告、僅能於網頁中使用。
- 付費會員：50,000 PV／年、100 套網頁字型、12 個月、無限網址、無廣告、14 天全額退款、「授權個人/企業網站使用」、「僅能於網頁中使用」。每頁不論用幾套字體皆算 1 PV。
- 實際價格頁面沒列，**價格查不到**。
- PV 達 80% 會寄信請續購：[webfont.justfont.com/support](https://webfont.justfont.com/support/)。
- 專案要設定支援網域，預設只支援 localhost 與 127.0.0.1（同上）。
- 站上用到的蘭陽、金萱那提、柑仔蜜、日星宋體貳號在清單中都標 VIP（付費）：[webfont.justfont.com](https://webfont.justfont.com)。有趣的是清單中標 Free 的包含 jf open 粉圓與思源黑體、思源宋體（同上）。

### 2.3 網頁訂閱 vs 桌機授權的差別

- **網頁訂閱**：按 PV 計價，字型留在 justfont 伺服器，網頁透過 SDK 取用，條款寫「僅能於網頁中使用」。這個方案沒有給你字型檔，所以沒有東西可以拿去 Illustrator 轉外框（推論）。
- **桌機授權**（字型商店買斷）：「一次買斷、永久授權、不限地區」，可裝兩台裝置，可做標準字，但商標註冊要另購，且不得分享檔案：[商店頁](https://store.justfont.com/en/font/jf-kamabit)。
- 結論：要拿 justfont 字體做 logo，必須**另外在商店買桌機授權**，網頁訂閱不包含（推論，依「僅能於網頁中使用」）。商店頁價格欄只看到「TWD 7,200」配「40px」選項，無法確認是柑仔蜜整套價格，**價格查不到**。

### 2.4 對 CC BY-SA 開源、可任意 fork 的專案，用 justfont 做 logo 的風險

以下為推論，依據是上述條款：

1. **logo 檔本身要不要公開**：Taiwan.md 的 logo SVG 放在 repo 就是公開散佈。轉外框的向量圖形不是「字型檔」，條款禁的是字型檔；風險落在灰色地帶：如果 SVG 完整保留一整套字母外框，被人抽出重組成新文字，可能被主張等同提供字型。justfont 沒有明文回答這件事，要用就先寄信問。
2. **CC BY-SA 的 ShareAlike**：BY-SA 要求衍生物以相同條款再散布，下游有權修改 logo、重新排字。但 fork 的人沒有該字型授權，無法用同一字型打新字，logo 的「可 fork 性」被打折。OFL 就沒這個問題：[OFL FAQ Q1.1](https://openfontlicense.org/ofl-faq/) 說做標誌與圖形「Yes. You are very welcome to do so.」「No additional license or permission is required」，且 Q1.1.1 說產出的圖形不需要受 OFL 約束。
3. **商標**：Taiwan.md 若要註冊商標，justfont 另收商標授權費（見 2.1）；OFL 字體做的標準字沒有這一道關卡（OFL FAQ 同上，唯一限制是不得用保留字型名稱來標示字型本身，Q5.1／Q5.3）。
4. **網頁字型的 fork 風險**：站上現行的 SDK 綁專案編號 65854 與註冊網域；fork 站放到別的網域時，justfont 會因網域不在白名單拒絕供字，或要 fork 的人自己申請。這是「支援網域」設定的直接結果（[support 頁](https://webfont.justfont.com/support/)；推論）。換言之 justfont 字型成為 fork 的隱形依賴，而 `font-family` 的後備鏈是 Noto。
5. **可用性風險**：repo 內已有 justfont 被 rate limit 的紀錄（[og-pipeline-patch-plan](../../og-pipeline-patch-plan-2026-04-22.md)）與日星宋子集壞字紀錄（Layout.astro 註解）。
6. **建議**：logo 與標準字只用 OFL 字體或自繪；justfont 字體留在「站內內文與標題的增色」層，並確保全站沒有 justfont 也長得合理（目前 CSS 的後備鏈已經如此）。

---

## 3. 可轉外框的開源繁體中文字體候選（OFL 等）

### 判讀台灣字形標準的前置知識

- **教育部《國字標準字體》**：自 1973 年起整理國字，1982 年頒布《常用國字標準字體表》4808 字與《次常用國字標準字體表》6341 字；1994 年頒佈宋體（明體）、楷書、隸書、方體等標準母稿給字型廠商參考：[維基百科 國字標準字體](https://zh.wikipedia.org/wiki/國字標準字體)。特色是以正體字的書寫體為基礎，卻套用在宋體、方體等印刷體上，因此遭印刷界批評（同上）。
- **思源系列的台灣版**：Adobe／Google 在 2014 年的決定是「follow the Taiwan MOE glyph standard for Big Five」（Ken Lunde 原話）：[source-han-sans issue #48](https://github.com/adobe-fonts/source-han-sans/issues/48)。中文維基補充：2.000 版之前台灣繁體版只依據國字標準字體，2018 年 2.000 版加入香港字形並把台港分開，台灣版仍有使用者認為滿足不了「傳承字形」需求：[維基百科 思源黑體](https://zh.wikipedia.org/wiki/思源黑體)。
- **Noto 與思源是同一套字形**：「兩者的字形本身（包括西文和數字）完全相同，差別只在字型和字重的稱呼」（同上維基）。
- **字形標準不等於字體風格**：許多開源字體（如源樣明體 TW）自稱的「台灣版」是「台灣近年多數字型習慣的通俗寫法」，不等於教育部標準；兩者在「者」「骨」等字不同。下表分開標。

### 3.1 明體／宋體

#### A. Noto Serif TC

- 授權：OFL（[google/fonts METADATA](https://github.com/google/fonts/blob/main/ofl/notoseriftc/METADATA.pb)）。
- 作者／血統：Google；與思源宋體同一套設計，設計者西塚涼子；來源 [notofonts/noto-cjk](https://github.com/notofonts/noto-cjk)。
- 字重：Google Fonts 提供可變字重軸 200–900（METADATA）。
- 台灣字形：依教育部標準（Ken Lunde 說明，見上，適用 Noto 因為字形相同）。
- 適合：內文與標題都行；做標準字很穩但識別度低（太通用）。站上 logo 目前就是它。
- 下載：[fonts.google.com/noto/specimen/Noto+Serif+TC](https://fonts.google.com/noto/specimen/Noto+Serif+TC)、[GitHub notofonts/noto-cjk](https://github.com/notofonts/noto-cjk)。

#### B. 思源宋體 TC（Source Han Serif TC）

- 授權：OFL 1.1：[LICENSE.txt](https://github.com/adobe-fonts/source-han-serif/raw/release/LICENSE.txt)。
- 作者：Adobe 與 Google 合作，西塚涼子設計；七字重 ExtraLight、Light、Regular、Medium、SemiBold、Bold、Heavy；最新版 2.003，2024 年 7 月 30 日：[官方 ReadMe PDF](https://github.com/adobe-fonts/source-han-serif/raw/release/SourceHanSerifReadMe.pdf)。
- 台灣字形：教育部標準（見上）。
- 拉丁字：衍生自 Source Serif 但不完全相同（ReadMe 第 530–540 行附近的「Source Han Serif Versus Source Serif」一節）。
- 適合：標準字、內文皆可；與 Source Serif 4 拉丁搭配幾乎同源。
- 下載：[GitHub releases](https://github.com/adobe-fonts/source-han-serif/releases)（另有每字重獨立 OTF 與子集版）。

#### C. 源樣明體 GenYoMin2（TW／TC）

- 授權：OFL 1.1：[genyo-font README](https://github.com/ButTaiwan/genyo-font)。
- 作者／血統：GitHub 帳號 ButTaiwan（柯志杰，Google Fonts 登錄名 But Ko），基於思源宋體，用自動化程式調整，使其更接近傳統印刷體審美；另有「源起明體」系列（斷筆處理）。README 稱這個系列是後續「源流」「源雲」的開發基礎。
- 版本：TW（月版）「採用台灣近年多數字型習慣的通俗寫法（例如『者』無點）」；TC（丹版）「傳承傳統鉛字印刷體風格」。**這個 TW 不是教育部標準**，README 沒有提教育部。
- 字重：TW 版 7 字重（EL、L、R、M、SB、B、H），來源為 [GitHub 檔案列表](https://github.com/ButTaiwan/genyo-font/tree/main/otf/TW)。
- 版本資訊：v2.100，2024-08-22；單一語言 OTF 壓縮檔約 82 MB（GitHub API 資料，見 [releases](https://github.com/ButTaiwan/genyo-font/releases)），網頁使用須先子集化。
- 適合：想要比思源更有印刷質感的標題或標準字；內文因檔案大需子集化。
- 下載：[releases](https://github.com/ButTaiwan/genyo-font/releases) 的 `GenYoMin2TW-otf.zip`。

#### D. 源雲明體 GenWanMin2（TW／TC）

- 授權：OFL 1.1：[genwan-font README](https://github.com/ButTaiwan/genwan-font)。
- 血統：基於「源流明體」改造，2.000 以思源 V2.0 為底本重製。
- 字重：TW 版 5 字重（EL、L、R、M、SB），[檔案列表](https://github.com/ButTaiwan/genwan-font/tree/main/otf/TW)。
- 字形：TW 用「台灣近年多數字型習慣的通俗寫法」，非教育部標準。
- 版本：v2.100，2024-08-22，約 88 MB。
- 適合：想要不同於思源的明體個性時的備選。**README 沒有說明與源樣的風格差異，個性需實際試排**。

#### E. 全字庫正宋體（數位發展部 CNS11643）

- 授權：資料集頁標示可擇一採「政府資料開放授權條款第 1 版」或「OFL-1.1」，兩者不可同時適用；散布須附著作權聲明與 OFL 全文，須註明來源「數位發展部，CNS11643 中文標準交換碼全字庫網站」：[全字庫授權頁](https://www.cns11643.gov.tw/pageView.jsp?ID=59)、[data.gov.tw 資料集](https://data.gov.tw/dataset/5961)。
- 檔案：`Fonts_Sung.zip`（正宋體）；更新說明 2026 年 8 月 5 日。
- 台灣字形：官方頁沒有明說依教育部標準字體；CNS 11643 與教育部標準字形修訂有關（見 [Unicode IRG n2628](https://www.unicode.org/irg/docs/n2628-TCAActivityReport.pdf) 的標題為 TCA 活動報告，PDF 內文我無法擷取，**未驗證**）。使用前須肉眼比對。
- 適合：字集極完整（含罕用字、人名字）的補字用途，不是美感首選。

#### F. 仙人掌明體 Cactus Classical Serif（附帶）

- 授權：OFL（[METADATA](https://github.com/google/fonts/blob/main/ofl/cactusclassicalserif/METADATA.pb)）；設計者 Henry Chan、田海東、宇文滿月；2024 年 4 月 23 日 1.000 版：[README](https://github.com/MoonlitOwen/CactusSerif)。
- 只有 Regular 一個字重（Google Fonts 僅列一個樣式）。
- 字形：以香港俗字字圖為底，局部參考傳承字形，**README 沒有提台灣標準**。對 Taiwan.md 的「台灣字形」要求而言不適合當預設。

### 3.2 黑體

#### G. Noto Sans TC

- 授權：OFL，可變字重 200 到 900（[METADATA](https://github.com/google/fonts/blob/main/ofl/notosanstc/METADATA.pb)）；字形同思源黑體，教育部標準。
- 適合：內文與介面。站上 `--font-interface` 現在就是它。
- 下載：[fonts.google.com/noto/specimen/Noto+Sans+TC](https://fonts.google.com/noto/specimen/Noto+Sans+TC)。

#### H. 思源黑體 TC（Source Han Sans TC）

- 授權：OFL 1.1（1.001 版以前為 Apache 2.0，自 1.002 起改 OFL）：[Typekit 官方文](https://blog.typekit.com/2014/07/15/introducing-source-han-sans/)。
- 2014 年 7 月 15 日發表，Adobe 與 Google 合作，台灣與簡體中文由常州華文（Changzhou Sinotype）負責（Typekit 文；維基）；七字重（ExtraLight、Light、Normal、Regular、Medium、Bold、Heavy）；最新 2.005，2025-06-18：[ReadMe PDF](https://github.com/adobe-fonts/source-han-sans/raw/release/SourceHanSansReadMe.pdf)。
- 下載：[GitHub releases](https://github.com/adobe-fonts/source-han-sans/releases)。

#### I. 台北黑體 Taipei Sans TC Beta

- 授權：OFL 1.1，個人與商業皆可，可再編輯與再散布；翰字鑄造（JT Foundry）：[官方下載頁](https://sites.google.com/view/jtfoundry/en/downloads)。
- 血統：重新設計自思源黑體，**官方寫的是以思源黑體 KR 版為底**，保留所有漢字與假名，KR 版沒有的字才保留 CN、JP 或 TW 特徵（同官方頁）。**所以它的台灣字形不是教育部標準，官方也沒聲稱是**。
- 動機：翰字鑄造認為台港教育標準以手寫為基礎、不適合印刷，故重設計：[官方頁](https://sites.google.com/view/jtfoundry/en)、[Bnext](https://www.bnext.com.tw/article/53883/jt-foundry-taipei-sans-tc)。
- 字重：第一波 Light、Regular、Bold，原計畫 2020 年底補 ExtraLight、Normal、Medium、Heavy（Bnext，2019 年報導）；**目前實際字重查不到**。仍標 Beta；2019-06-30 開放下載。
- 適合：看重印刷版面的標題；不適合要求教育部字形的場合。
- 下載：JT Foundry 下載頁，為 Google Drive 連結。FreshPorts 也收錄為 OFL：[freshports.org/chinese/taipeisanstc](https://freshports.org/chinese/taipeisanstc)。

#### J. 源石黑體 GenSekiGothic2（TW／TC）

- 授權：OFL 1.1（[README](https://github.com/ButTaiwan/genseki-font)）；基於「源起黑體」改造。
- 字形：TW 同樣是「台灣近年多數字型習慣的通俗寫法（例如『者』無點）」，非教育部標準。
- 字重：TW 版 5 字重（L、R、M、B、H），[檔案列表](https://github.com/ButTaiwan/genseki-font/tree/main/otf/TW)；v2.100，2024-08-22。
- 備註：和思源黑體的差別 README 沒詳述，**查不到**。

### 3.3 楷體、手寫

#### K. 芫荽 Iansui

- 授權：OFL 1.1；作者 But Ko（柯志杰）；基於 Fontworks 的 Klee One 衍生：[README](https://github.com/ButTaiwan/iansui)；Google Fonts 已收錄、分類為手寫（[METADATA](https://github.com/google/fonts/blob/main/ofl/iansui/METADATA.pb)，2024-11-25 加入）。
- 台灣字形：README 寫「嘗試盡可能調整字形貼近教育部標準字體」，並說明以「較寬鬆的方式解釋教育部標準字體的規定」，開發時參考《國字標準字體研訂原則》。**這是本表中少數明文以教育部標準字形為目標的 OFL 字體**。
- 字重：只有一個，因 Klee 原 Regular 偏細，改以原 SemiBold 為底（README）。
- 版本：v1.020，2025-05-30；壓縮檔 4.8 MB（GitHub API），網頁用得動。
- 適合：有人味的標題、引言、副標；做標準字有溫度，但字重單一、不適合長文。
- 下載：[releases 的 iansui.zip](https://github.com/ButTaiwan/iansui/releases)、[Google Fonts](https://fonts.google.com/specimen/Iansui)。

#### L. 霞鶩文楷 TC（LXGW WenKai TC）

- 授權：OFL 1.1；基於 Fontworks Klee One 衍生：[README](https://github.com/lxgw/LxgwWenKaiTC)。
- 台灣字形：README 明言字形調整只是參考一點字坊《傳承字形標準化文件》，並不追求完全遵循，若要臺灣教育標準字形（臺標字形）請改用芫荽。**不是教育部標準**。
- 字重：Light、Regular、Medium 三個（Google Fonts 登錄三樣式，[METADATA](https://github.com/google/fonts/blob/main/ofl/lxgwwenkaitc/METADATA.pb)）；最新 v1.530，2026-10-17，每個 TTF 約 15 MB（GitHub releases API）。
- 適合：引文、文化類文章的氣氛字體；中文網頁普及度高。
- 下載：[GitHub releases](https://github.com/lxgw/LxgwWenKaiTC/releases)、[Google Fonts](https://fonts.google.com/specimen/LXGW+WenKai+TC)。

#### M. 全字庫正楷體

- 授權同 E（政府資料開放授權或 OFL 擇一）：[資料集](https://data.gov.tw/dataset/5961)，檔案 `Fonts_Kai.zip`。
- 字形標準同 E 的備註。

#### N.（不建議當標準字）教育部標準楷書／宋體

- 教育部語文成果網提供楷書、宋體、隸書，授權為創用 CC「姓名標示-禁止改作 3.0 臺灣版」：[MrMad 整理](https://mrmad.com.tw/ministry-of-education-free-font-download)（二手來源，下載點為 [language.moe.gov.tw](https://language.moe.gov.tw/index.aspx)）。
- 「禁止改作」對於調字距、轉外框、客製字形是否算改作有疑義，**不屬於 OFL，列為不建議**。官方條款原文我沒有取到，**需人工到 language.moe.gov.tw 確認**。

### 3.4 圓體

#### O. jf open 粉圓（Huninn）

- 授權：OFL 1.1；justfont 出品；基於日本開源字體小杉圓體（Kosugi Maru），拉丁字母取自 Varela Round：[README](https://github.com/justfont/open-huninn-font)。
- 字重：單一字重（Google Fonts 登錄一個樣式：[METADATA](https://github.com/google/fonts/blob/main/ofl/huninn/METADATA.pb)，2025-03-18 加入）。
- 字形：README 沒有宣稱教育部標準；寫的是「針對臺灣日常應用加以調整」與滿足 jf 7000 字集。**教育部標準符合度查不到**。
- 版本：2.1（2024-09-19），4.9 MB。
- 適合：輕鬆的小標、按鈕、圖說；做標準字會偏萌。
- 下載：[GitHub releases](https://github.com/justfont/open-huninn-font/releases)、[justfont.com/huninn](https://justfont.com/huninn/)、[Google Fonts Huninn](https://fonts.google.com/specimen/Huninn)。

#### P. 源泉圓體 GenSenRounded2（TW／TC）

- 授權：OFL 1.1，把「源起黑體」程式化圓角處理而成（[README](https://github.com/ButTaiwan/gensen-font)）；TW 版字形同源石的通俗寫法，非教育部標準。
- 字重：TW 版 6 字重（EL、L、R、M、B、H），[檔案列表](https://github.com/ButTaiwan/gensen-font/tree/main/otf/TW)；v2.100，約 60 MB。
- 適合：需要多字重圓體時。

#### Q. 昭源圓體 TC（Chiron GoRound TC）

- 授權：OFL 1.1；設計者 Tamcy（個人專案）；以昭源黑體為基礎，後者由思源黑體香港版修改而成；拉丁字為 Nunito：[README](https://github.com/chiron-fonts/chiron-go-round-tc)、[METADATA](https://github.com/google/fonts/blob/main/ofl/chirongoroundtc/METADATA.pb)（2025-06-21 加入）。
- 字重：10 種字重（ExtraLight 到 Heavy）加可變版本，軸 200–900。
- 字形：README 只說「平衡地區標準字形和印刷體慣用字形」，沒寫教育部標準；母體為港版，**台灣符合度需要試排確認**。
- 下載：[GitHub](https://github.com/chiron-fonts/chiron-go-round-tc)（Releases 頁，v1.011，2026-05-13，API 回報的 assets 為空，下載方式以 README 為準）、Google Fonts。

### 3.5 其他備註

- Klee One（Fontworks，OFL，分類手寫）是日本字形，台灣字形需求下不直接使用，但它是芫荽與霞鶩文楷的上游：[METADATA](https://github.com/google/fonts/blob/main/ofl/kleeone/METADATA.pb)。
- 昭源黑體／宋體系列的港版（Chiron Hei HK、Chiron Sung HK）為香港字形，不適合台灣預設：[Chiron Hei HK](https://github.com/google/fonts/blob/main/ofl/chironheihk/METADATA.pb)。
- 未查到的項目：辰宇落雁體、清松手寫體、俐方體等其他常被提到的 OFL 繁中字，本次沒有抓到可引用的一手頁面，沒有收進來。

### 3.6 候選總表

| 字體          | 類別     | 授權               | 字重         | 台灣字形               | 網頁可行性             |
| ------------- | -------- | ------------------ | ------------ | ---------------------- | ---------------------- |
| Noto Serif TC | 明體     | OFL                | 可變 200–900 | 教育部標準             | Google Fonts 直接載    |
| 思源宋體 TC   | 明體     | OFL                | 7            | 教育部標準             | 需自行子集化           |
| 源樣明體 TW   | 明體     | OFL                | 7            | 通俗寫法（非教育部）   | 82 MB 壓縮檔，須子集化 |
| 源雲明體 TW   | 明體     | OFL                | 5            | 通俗寫法（非教育部）   | 88 MB，須子集化        |
| 全字庫正宋體  | 明體     | OFL 或政府開放授權 | 單一         | 官方頁未明說           | 字集大，補字用         |
| 仙人掌明體    | 明體     | OFL                | 1            | 港式俗字為底（非台灣） | 不適合預設             |
| Noto Sans TC  | 黑體     | OFL                | 可變 100–900 | 教育部標準             | Google Fonts 直接載    |
| 思源黑體 TC   | 黑體     | OFL                | 7            | 教育部標準             | 須子集化               |
| 台北黑體 Beta | 黑體     | OFL                | 3 起（Beta） | 非教育部（KR 為底）    | Beta，穩定性未知       |
| 源石黑體 TW   | 黑體     | OFL                | 5            | 通俗寫法               | 須子集化               |
| 芫荽 Iansui   | 楷／手寫 | OFL                | 1            | 貼近教育部（寬鬆）     | 4.8 MB，可用           |
| 霞鶩文楷 TC   | 楷／手寫 | OFL                | 3            | 傳承字形（非教育部）   | 每檔約 15 MB，須子集化 |
| 全字庫正楷體  | 楷體     | OFL 或政府開放授權 | 單一         | 官方頁未明說           | 補字用                 |
| jf open 粉圓  | 圓體     | OFL                | 1            | 未宣稱                 | 4.9 MB，可用           |
| 源泉圓體 TW   | 圓體     | OFL                | 6            | 通俗寫法               | 須子集化               |
| 昭源圓體 TC   | 圓體     | OFL                | 可變 200–900 | 區域標準與印刷體折衷   | Google Fonts 已收錄    |

---

## 4. 拉丁字候選（皆 OFL）

### 實測方法

- 自 [google/fonts](https://github.com/google/fonts/tree/main/ofl) 下載字型檔，用 fontTools 讀 `x`、`H` 字形外框頂端高度除以 unitsPerEm，得 x-height 與 cap-height（單位為 em）。**這是本研究實測，不是設計者官方數字**。
- 可變字型：預設實例量一次；有光學尺寸軸者另標光學尺寸。
- 「tnum」欄為 GSUB 是否含 `tnum` 特性；「zero」欄為是否含 `zero`（斜線或點零）特性。
- 授權欄來源皆為各字型的 [google/fonts METADATA.pb](https://github.com/google/fonts/tree/main/ofl)（網址格式：`.../ofl/<id>/METADATA.pb`）。

### 總表

| 字體                       | 類別             | 設計者                                           | x-height                           | cap          | x/cap      | tnum       | zero | 軸／字重                              |
| -------------------------- | ---------------- | ------------------------------------------------ | ---------------------------------- | ------------ | ---------- | ---------- | ---- | ------------------------------------- |
| Source Serif 4             | 襯線             | Frank Grießhammer                                | 0.475（opsz 20）／0.452（opsz 60） | 0.670        | 0.71       | 有         | 有   | opsz 8–60；wght 200–900               |
| Fraunces                   | 襯線（軟襯線）   | Undercase Type：Phaedra Charles、Flavia Zimbardi | 0.471（opsz 9）／0.434（opsz 144） | 0.700        | 0.62–0.67  | 無         | 無   | opsz 9–144、wght 100–900、SOFT、WONK  |
| Newsreader                 | 襯線             | Production Type                                  | 0.426（opsz 18）／0.512（opsz 72） | 0.670／0.715 | 0.64／0.72 | 有         | 無   | opsz 6–72；wght 200–800               |
| Literata                   | 襯線             | TypeTogether                                     | 0.507（opsz 12）／0.513（opsz 72） | 0.700／0.730 | 0.72／0.70 | 有         | 有   | opsz 7–72；wght 200–900               |
| Instrument Serif           | 襯線（顯示、窄） | Rodrigo Fuenzalida、Jordan Egstad                | 0.510                              | 0.720        | 0.71       | 無         | 無   | 僅 Regular＋Italic                    |
| Instrument Sans            | 無襯線           | 同上                                             | 0.510                              | 0.720        | 0.71       | 有         | 無   | wdth 75–100；wght 400–700             |
| IBM Plex Sans              | 無襯線           | Mike Abbink、Bold Monday                         | 0.516                              | 0.698        | 0.74       | 無         | 有   | wdth 75–100；wght 100–700             |
| IBM Plex Serif             | 襯線             | 同上                                             | 0.516                              | 0.698        | 0.74       | 無         | 有   | 14 個靜態樣式                         |
| IBM Plex Mono              | 等寬             | 同上                                             | 0.516                              | 0.698        | 0.74       | 等寬       | 有   | 14 個靜態樣式；字寬 0.6 em            |
| Inter Tight                | 無襯線           | Rasmus Andersson                                 | 0.546                              | 0.728        | 0.75       | 有         | 有   | wght 100–900                          |
| Public Sans                | 無襯線           | USWDS、Dan Williams 等                           | 0.517                              | 0.723        | 0.72       | 有         | 無   | wght 100–900                          |
| Atkinson Hyperlegible Next | 無襯線           | Braille Institute、Applied Design Works 等       | 0.496                              | 0.668        | 0.74       | 有         | 無   | wght 200–800                          |
| JetBrains Mono             | 等寬             | JetBrains、Philipp Nurullin、Konstantin Bulenkov | 0.550                              | 0.730        | 0.75       | 等寬       | 有   | wght 100–800；字寬 0.6 em             |
| Commit Mono                | 等寬             | Eigil Nikolajsen                                 | 本研究未下載量測                   |              |            |            |      | 400／700 預設；自訂下載 42 種字型樣式 |
| Geist／Geist Mono          | 無襯線／等寬     | Vercel：Andrés Briganti、Mateo Zaragoza 等       | 0.530                              | 0.710        | 0.75       | 有（Sans） | 無   | wght 100–900                          |
| DM Mono                    | 等寬             | Colophon Foundry                                 | 0.496                              | 0.700        | 0.71       | 等寬       | 無   | Light／Regular／Medium（含斜體）      |
| Source Sans 3              | 無襯線           | Paul D. Hunt                                     | 0.486（wght 400）                  | 0.656        | 0.74       | 無         | 有   | wght 200–900                          |
| Source Code Pro            | 等寬             | Paul D. Hunt                                     | 0.478                              | 0.660        | 0.72       | 等寬       | 有   | wght 200–900；字寬 0.6 em             |

註：Fraunces 預設實例是 wght 900，上表以 wght 400 實測；Public Sans、Source Sans 3 預設為細字重，x-height 已改用 wght 400 實例。「無」欄表示該特性不在 GSUB，不代表視覺上不是等寬或不能用（IBM Plex Sans 的數字預設即等寬寬度，本研究實測 10 個數字字寬皆同）。Commit Mono 非 Google Fonts 收錄，另有官網。

### 逐支說明

#### 中文明體搭配組

**Source Serif 4**

- 血統：Frank Grießhammer 設計，過渡式襯線，「loosely based on the work of Pierre Simon Fournier」；與 Source Sans 3 搭配設計，Robert Slimbach 顧問：[DESCRIPTION](https://github.com/google/fonts/blob/main/ofl/sourceserif4/DESCRIPTION.en_us.html)。
- 為什麼優先：思源宋體的拉丁字就是衍生自 Source Serif（見 3.1 B），中文與拉丁同源，色調最容易一致。
- 適合：「Taiwan」英文標準字、英文內文、與中文明體並排的標題。有光學尺寸軸，大字時 x-height 縮小為 0.452，顯得更優雅。
- 筆畫個性：理性、略帶 Fournier 的細節（如 b 下方襯線、w 中間襯線），不張揚。

**Fraunces**

- 血統：Undercase Type，「display, "Old Style" soft-serif」，靈感來自 Windsor、Souvenir、Cooper 系列；四軸 wght、opsz、SOFT、WONK：[DESCRIPTION](https://github.com/google/fonts/blob/main/ofl/fraunces/DESCRIPTION.en_us.html)。
- 適合：要有個性的英文標準字。SOFT 軸調濕潤度、WONK 軸切換歪斜字形（h、n、m 傾斜）。
- 個性：最強。x-height 在 opsz 9 為 0.471，到 opsz 144 縮為 0.434，大字顯得瘦長優雅。
- 風險：個性強可能蓋過中文；與思源宋體搭需試排。

**Newsreader**

- 血統：Production Type，「primarily intended for continuous on-screen reading in content-rich environments」：[DESCRIPTION](https://github.com/google/fonts/blob/main/ofl/newsreader/DESCRIPTION.en_us.html)。
- 特色：x-height 在小字級偏低（0.426），大字級升高（0.512），隨光學尺寸變化很大。
- 適合：英文長文閱讀；做標準字太內斂。

**Literata**

- 血統：TypeTogether（Veronika Burian、José Scaglione），最初是 Google Play Books 的品牌字，第三版重製為可變字型：[DESCRIPTION](https://github.com/google/fonts/blob/main/ofl/literata/DESCRIPTION.en_us.html)。
- 特色：x-height 0.507，偏高，在 CJK 旁不會顯得過小；有 zero 特性。
- 適合：英文內文與數字（有 tnum）。

**Instrument Serif**

- 血統：為 Instrument 品牌設計的「condensed display font」，建議用於大字級：[DESCRIPTION](https://github.com/google/fonts/blob/main/ofl/instrumentserif/DESCRIPTION.en_us.html)。
- 限制：只有 Regular＋Italic。偏窄，與中文並排時寬度不協調。
- 適合：大尺寸英文標題的風格點綴；做 Taiwan.md 標準字則字重不足。

#### 搭黑體組

**Instrument Sans**

- 血統：同 Instrument 品牌，「balances an abundance of precision with subtle notes of playfulness」，靈感來自新怪誕體（neo-grotesques），12 組 stylistic sets：[DESCRIPTION](https://github.com/google/fonts/blob/main/ofl/instrumentsans/DESCRIPTION.en_us.html)。
- 適合：英文標準字（小寫）、導覽。有 wdth 軸可做窄體。字重只到 700。

**IBM Plex Sans／Serif／Mono**

- 血統：IBM 企業字，Mike Abbink 與 Bold Monday，風格「neutral yet friendly Grotesque」；三者搭配使用，「Sans 當現代夥伴、Serif 做編輯敘事、Mono 顯示程式碼」：[DESCRIPTION](https://github.com/google/fonts/blob/main/ofl/ibmplexsans/DESCRIPTION.en_us.html)。
- 好處：一個家族涵蓋三種角色，x-height 全部 0.516，視覺統一；zero 特性（斜線零／點零）。
- Plex Mono 字寬 0.6 em，適合數據讀數。缺點：Sans 與 Serif 在 Google Fonts 版本結構不同（Sans 為可變、Serif／Mono 為 14 個靜態檔），載入體積較重。

**Inter Tight**

- 血統：Inter 的緊湊字距顯示版（「specialized version of Inter with tighter spacing, for display usage」），Rasmus Andersson：[DESCRIPTION](https://github.com/google/fonts/blob/main/ofl/intertight/DESCRIPTION.en_us.html)。
- x-height 0.546，是候選中偏高的一群，與中文並排時視覺上較大。
- 適合：緊湊的大標題與數字表。

**Public Sans**

- 血統：基於 Libre Franklin，美國政府網站設計系統（USWDS）開發，「strong, neutral typeface for interfaces, text, and headings」：[DESCRIPTION](https://github.com/google/fonts/blob/main/ofl/publicsans/DESCRIPTION.en_us.html)。
- 適合：公共資訊、中性信任感。與「公共知識庫」的語意相合（推論）。

**Atkinson Hyperlegible Next**

- 血統：Braille Institute 與 Applied Design Works，目標是低視力者的可讀性；設計原則包含無歧義字形、開放字腔、尖角與長尾以增加辨識差異：[Braille Institute](https://www.brailleinstitute.org/freefont/)。Google Fonts 登錄為 OFL（[METADATA](https://github.com/google/fonts/blob/main/ofl/atkinsonhyperlegiblenext/METADATA.pb)）。
- 注意：Braille Institute 頁面本身沒有寫 OFL，只寫「Free for personal use and all commercial applications」並連結 EULA；**OFL 的依據是 Google Fonts 的登錄**。
- 適合：無障礙訴求的內文、數字表（數字辨識度高）。

**Source Sans 3**

- 與思源黑體的拉丁字同源（Source Han Sans 的拉丁來自 Source Sans，推論，由 Source Han Serif ReadMe 的類似說法延伸，**Sans 側的原文未擷取確認**）。
- x-height 0.486，cap 0.656，x/cap 0.74。

#### 等寬組

**JetBrains Mono**

- 血統：JetBrains 為開發者設計，Philipp Nurullin 與 Konstantin Bulenkov；官方設計原則：字寬維持標準但「the height of the lowercase is maximized」，零有點、字母 O 無點：[JetBrains Mono 官網](https://www.jetbrains.com/lp/mono/)。
- 可變字重 100–800，單檔。x-height 0.550 為等寬候選中最高，與中文並排最清楚，但也顯得最大。
- 適合：儀表板讀數、程式碼。

**IBM Plex Mono** 見上。x-height 0.516，zero 特性，風格溫和；最適合與 Source Serif／思源系並排的等寬。

**Commit Mono**

- 作者 Eigil Nikolajsen，OFL 1.1，可商用，「an anonymous and neutral coding font」，理念引 Jasper Morrison《Super Normal Manifesto》：「Special is generally less useful than normal」；預設含 400／700 與斜體，自訂下載最多 42 種樣式，官網建議深色模式用 400、淺色模式用 450：[commitmono.com](https://commitmono.com)。
- 限制：不在 Google Fonts，需自行託管；官網說 zip 在 Safari 曾有問題。Cyrillic 官網寫「coming soon」。

**Geist Mono**

- 血統：Vercel，OFL，「inspiration from the renowned Swiss design movement」，Mono 版「prioritized readability」：[vercel.com/font](https://vercel.com/font)。
- 可變字重 100–900；x-height 0.530。

**DM Mono**

- 血統：Colophon Foundry 為 DeepMind 設計，「loosely based off of DM Sans, with a reduction in contrast and less geometric proportions」：[DESCRIPTION](https://github.com/google/fonts/blob/main/ofl/dmmono/DESCRIPTION.en_us.html)。只有 3 個字重。

**Source Code Pro**

- 血統：Paul D. Hunt，Source Sans 的等寬版，「preserves the design features and vertical proportions of Source Sans」：[DESCRIPTION](https://github.com/google/fonts/blob/main/ofl/sourcecodepro/DESCRIPTION.en_us.html)。x-height 0.478，偏低、偏穩。

---

## 5. 台灣本土字體文化脈絡（給報告用）

**一、國字標準字體：教育部的官方字形**
台灣自 1973 年起由教育部整理國字，1982 年頒布《常用國字標準字體表》（4808 字）與《次常用國字標準字體表》（6341 字），1994 年再頒佈宋體、楷書、隸書、方體等標準母稿供廠商參考。這套標準以楷書書寫為基礎，並一律套用到宋體與方體等印刷體上；文鼎等字型廠商批評這使印刷體變成「失去平衡的手寫筆法字體」，學者李郁周也批評它破壞傳統造形。來源：[維基百科〈國字標準字體〉](https://zh.wikipedia.org/wiki/國字標準字體)。今天多數免費繁體字型（含思源系列的台灣版）都以它為字形基準，這也是 Taiwan.md 選字時最需要確認的一條線。

**二、日星鑄字行：活字時代的最後現場**
日星鑄字行位於台北太原路一帶，由張錫齡創立（年份有 1968、1969 兩說），第二代張介冠接手。它握有據稱是世上最完整的一套正楷、宋體、黑體鉛字銅模。90 年代後台灣活版印刷幾乎全面絕跡，被桌上型出版系統取代，大型鑄字行紛紛結束，模具下落不明。來源：[justfont 部落格](https://blog.justfont.com/?p=5893)、[中央社 2017](https://www.cna.com.tw/news/firstnews/201704300069.aspx)、[Taipei Times 2009](https://www.taipeitimes.com/News/feat/archives/2009/08/27/2003452093)。

**三、日星宋體的數位化：從掃描樣張到 2025 年的日星宋貳**
日星鑄字行從 2008 年起發起銅模修復計畫，2016 年以募資推行；2025 年與 justfont 共同推出日星宋貳，把銅模修復的副產品整理成可排版的數位字型，並加入新設計的拉丁字母，Marie Claire 報導上架兩週募得 500 萬元。字型刻意保留墨暈與每字微小的不一致，張老闆的說法是「在相同的形態中表現單字本身的獨特性，是漢字生命力的來源」。來源：[justfont 2025/06](https://blog.justfont.com/2025/06/rixing-song2-revivals/)、[justfont 2013 日星宋體專文](https://blog.justfont.com/2013/09/rixing-song-why-special-a/)、[Marie Claire](https://www.marieclaire.com.tw/lifestyle/art/87276)。

**四、justfont：把字體變成公共議題**
justfont 創辦人葉俊麟 2010 年開發「中文雲端字型服務」，2012 年正式推出；官網自述 2010 年成立。2015 年金萱在 flyingV 募得 2593 萬元，被稱為世上第一個由群眾募資完成的中文字型；2021 年蘭陽明體募資破兩千萬，2022 年出貨。這串募資紀錄說明台灣讀者願意為本土設計的字體買單，也讓字體從廠商的產品變成公開討論的文化議題。來源：[維基百科 justfont](https://zh.wikipedia.org/wiki/Justfont)、[justfont 關於我們](https://justfont.com/about)、[Inside](https://www.inside.com.tw/article/24837-justfont-lanyangming)。justfont 也同時釋出開源的 jf open 粉圓，說明本土字體社群的兩種路徑並存：商業訂閱與開源釋出（[README](https://github.com/justfont/open-huninn-font)）。

**五、思源字體：跨國協作如何決定台灣字形**
2014 年 7 月 15 日 Adobe 與 Google 發表思源黑體，台灣與簡體中文由常州華文負責。Adobe 的 Ken Lunde 說明當時決定採用台灣教育部字形標準，他自己也承認這個選擇「is receiving some criticism, which may be deserved」。2018 年的 2.000 版才把台港字形分開。來源：[Typekit 官方文](https://blog.typekit.com/2014/07/15/introducing-source-han-sans/)（含 Ken Lunde 回覆）、[source-han-sans issue #48](https://github.com/adobe-fonts/source-han-sans/issues/48)、[維基百科 思源黑體](https://zh.wikipedia.org/wiki/思源黑體)。這意味台灣讀者日常看到的免費字，字形權威其實是教育部標準加國際大廠的工程決定。

**六、台灣開源字體生態：個人與社群補上缺口**
思源之後，台灣出現一批在其上改作的開源字體：2019 年翰字鑄造的台北黑體（認為教育部標準以手寫為基礎、不適合印刷），ButTaiwan 的源樣、源雲、源石、源泉系列與以教育部標準字形為目標的芫荽，justfont 的粉圓。政府端則由數位發展部開放全字庫正宋體與正楷體，授權可擇 OFL-1.1 或政府資料開放授權。這些字體的「台灣版」並不等於教育部標準，各家定義不同，所以選字時要逐支看 README，不能只看名字有 TW 或 TC。來源：[Bnext 台北黑體](https://www.bnext.com.tw/article/53883/jt-foundry-taipei-sans-tc)、[芫荽 README](https://github.com/ButTaiwan/iansui)、[源樣明體 README](https://github.com/ButTaiwan/genyo-font)、[全字庫授權頁](https://www.cns11643.gov.tw/pageView.jsp?ID=59)。

---

## 6. 本研究的缺口與待人工確認

1. justfont 通用授權的逐條原文（折疊內容未抓到），尤其是「轉外框後以向量圖公開散布」的明確規定。建議直接寫信 just@justfont.com 問（信箱見商店頁 [store.justfont.com](https://store.justfont.com/en/font/jf-kamabit)）。
2. 站上 SDK 字重代號（`extrabold`、`extraheavy`、`semibold`）與官方字重名稱（W7–W11、分糖）的對照，要查 justfont 網頁字型後台。
3. 日星宋貳的字重、授權條款、募資總額（官方文章沒寫）。
4. 教育部標準楷書／宋體的官方授權條款原文（目前只有二手整理的「姓名標示-禁止改作 3.0 臺灣版」）。
5. 全字庫正宋體／正楷體是否依教育部標準字形（官方頁未明說）。
6. 台北黑體目前實際釋出的字重與版本。
7. 昭源圓體 TC 與芫荽在台灣教育部字形上的逐字差異，需要拿一組檢核字（者、骨、曰、黃、又等）實際排版比對。這類 TW 字形差異我沒有渲染驗證，只依 README 與文獻判斷。

---

## 7. 首選推薦（給主 session）

- **中文標準字**：思源宋體 TC（Source Han Serif TC）SemiBold／Bold，因為 OFL 可轉外框、教育部字形、七字重完整，且與站上現有 Noto Serif TC 同字形，換成自行轉外框的版本不會讓識別斷裂。想要更有印刷質感再試源樣明體 TW（但它不是教育部標準）。
- **中文內文**：Noto Sans TC（可變 100–900），因為 Google Fonts 直接載入、教育部字形、fork 的人零設定也能用，justfont 字體保留為增色層而不是必要依賴。
- **拉丁標準字**：Source Serif 4（大字級用 opsz 高值），因為思源宋體的拉丁字本來就衍生自它，中英文色調最容易統一；想要個性再試 Fraunces（SOFT 低、WONK 關）。
- **等寬讀數**：IBM Plex Mono，因為 x-height 0.516 與 Source 系列拉丁字接近、帶斜線零、字寬 0.6 em 好排版；想要更高的 x-height 與單檔可變字重改用 JetBrains Mono。
