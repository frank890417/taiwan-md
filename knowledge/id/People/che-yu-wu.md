---
title: 'Wu Che-Yu: Pembuat jam yang mendekati jiwa dengan 0 dan 1, dari mesin pinball ke dinding putih Venesia'
description: "Seorang anak Taiwan yang terobsesi dengan sistem, memulai dari mesin pinball, animasi Flash, hingga simulator biologis, dan mencapai pameran tunggal di Biennale Venedig, Art Blocks, dan Taipei 101. Di tengah perjalanan, ia melewati NFT bernilai ratusan juta, kehancuran FTX dalam semalam, dan memulai kembali dengan absurditas Camus. Ia menyebut dirinya 'pembuat jam kuno', bersikeras untuk merancang mekanisme itu sendiri di era banjir AI, dan mendedikasikan sebagian waktu untuk menulis Markdown, meninggalkan SSOT sejati bagi Taiwan di era AI."
date: 2026-04-20
category: 'People'
tags:
  [
    'seni media baru',
    'seni generatif',
    'karya pemrograman',
    'NFT',
    'pendidikan',
    'Wu Che-Yu',
    'Che-Yu Wu',
    'Taiwan.md',
    'rumus semesta',
    'ikan jiwa',
    'biennale venedig',
  ]
subcategory: '新媒體藝術'
author: 'Taiwan.md Contributors'
featured: true
lastVerified: 2026-04-20
lastHumanReview: true
researchReport: 'reports/research/2026-04/吳哲宇.md'
readingTime: 16
lifeTree:
  protagonist: '吳哲宇'
  birthYear: 1995
  span: '1995–2026'
  source:
    article: 'knowledge/People/吳哲宇.md'
    commit: '99ce635c'
    commitDate: '2026-04-26'
    extractedBy: 'Taiwan.md (Semiont) β-r5'
    extractedAt: '2026-04-26 11:25 +0800'
    note: '從原文 footnote chain + 三大轉折（FTX 歸零 / 威尼斯提問 / Taiwan.md 起源）抽取。本人即觀察者、creator，可直接驗證或推翻 counterfactual。'
  intro: '一個對系統著迷的台灣男孩，從彈珠檯、Flash、Boids 演算法走到 Art Blocks、威尼斯雙年展、台北 101 三部曲。中間經過 NFT 破億、FTX 一夜歸零、卡繆荒謬主義的再次啟程。每個 turning 都有「往工程那條路」「往純藝術那條路」「待在原本的舒適圈」三股拉力。這棵樹列出他選的，也列出他沒選的——所有 alternative 都來自原文 footnote 或同代結構推測。'
  themes:
    - id: 'engineer-artist'
      label: '工程 vs 藝術'
      color: '#8B5CF6'
    - id: 'teaching'
      label: '教學 vs 創作'
      color: '#EC4899'
    - id: 'chaos-system'
      label: '控制 vs 設計系統'
      color: '#F59E0B'
    - id: 'personal-public'
      label: '個人 vs 公共'
      color: '#10B981'
  nodes:
    - id: 'birth'
      year: 1995
      age: 0
      type: 'given'
      theme: 'engineer-artist'
      label: '出生於台北 AutoCAD 家庭'
      scene: '父吳永進、母林美櫻共同經營翔虹 AutoCAD 技術中心，二十幾年是 Autodesk 在台灣合作夥伴。家裡電腦原生環境，各式技術書進進出出。父母給的不是工業繪圖技術底子，是一張沒有條件的安全網。'
      sources: ['^9', '^11']
    - id: 'flash-self-taught'
      year: 2002
      age: 7
      type: 'choice'
      theme: 'engineer-artist'
      scene: '小學時媽媽從公司帶回一本 Flash 教學書擱在那邊'
      chose:
        label: '自己拿起來玩'
        consequence: '六年級已能幫班上架班級網頁。後來父親接力教 Visual Basic。電腦對他來說不是長大才學會用的東西，是原生工具。教學飛輪的第一塊磚。'
      alternatives:
        - label: '只看不碰'
          plausibility: 'structural'
          note: '同代多數小學生看到家裡技術書本不會主動拿起來玩。如果他停在「父母在做什麼工作」的觀察者位置，整條工程能力線會延後幾年（甚至不會發生）。'
        - label: '玩商業遊戲'
          plausibility: 'structural'
          note: '林美櫻原話：「玩別人的遊戲一下就膩了，要玩自己設計出的遊戲才厲害！」這句話的存在反證有那條 path。同代多數小孩走這條，停在消費端。'
      sources: ['^13']
    - id: 'bio-simulator'
      year: 2009
      age: 14
      type: 'choice'
      theme: 'engineer-artist'
      scene: '國中時從父親那條 Visual Basic 的線一路延伸到 VB.NET，寫出生物模擬器'
      chose:
        label: '寫 Boids 演算法 + 群體智慧'
        consequence: '虛擬的小點在螢幕上移動、繁殖、覓食、死亡。十七年後這個小點會游到威尼斯雙年展白牆上變成《靈魂魚》。國中作品到威尼斯是同一條線。'
      alternatives:
        - label: '寫遊戲或網頁'
          plausibility: 'structural'
          note: '同代懂 VB 的國中生主流去做小遊戲或論壇。安全、有 user feedback、容易被 peer 認可。生物模擬器這個方向很 niche，沒有「實用」目標。'
        - label: '把程式能力轉去資訊奧林匹亞'
          plausibility: 'structural'
          note: '台灣國中生程式強的另一條公認路徑（後來進台大資工 / 出國 ICPC）。時間花在競賽刷題，不會留給「演算法藝術」這個還沒被命名的領域。'
      sources: ['^5']
    - id: 'acer-prize'
      year: 2009
      age: 14
      type: 'choice'
      theme: 'engineer-artist'
      scene: '國二第一次參加宏碁數位創作獎'
      chose:
        label: '連 5 屆參加，4 次首獎'
        consequence: '高一普通組身份擊敗專業組拿評審團超級大獎；高三跟陳楷中跨校跨組合作再拿一次。施振榮台上頒獎，10 年後寫推薦函，13 年後坐個展第一排，16 年後同桌對談。一條 16 年的伏線。'
      alternatives:
        - label: '只參加一次'
          plausibility: 'structural'
          note: '多數獎項得主拿了一次就轉去別的競賽或申請學校。如果他停在第一次，沒有後續四次，就沒有跟施振榮的長期連結，也沒有後來 NYU 推薦函這條線。'
      sources: ['^5']
    - id: 'jianzhong-mouth-organ'
      year: 2010
      age: 15
      type: 'choice'
      theme: 'personal-public'
      scene: '建中三年大部分時間獨來獨往。「到建中的時候，突然覺得好挫折。東西學起來都好難。」'
      chose:
        label: '加入口琴社找歸屬'
        consequence: '主攻複音口琴（同時拿兩支，旁邊的人都笑）。2012 全國學生音樂比賽四重奏第一名，自選曲〈Czardas〉。「不主流社團也是歸屬」這個習慣，後來會出現在他選擇 Art Blocks 而非主流畫廊、選擇 Hahow 教育平台而非走學術升等。'
      alternatives:
        - label: '主流社團'
          plausibility: 'structural'
          note: '建中主流社團是辯論、模聯、學生會、棒球、籃球。同期理工強的學生多走辯論或學術社團累積大學申請履歷。'
        - label: '不參加任何社團'
          plausibility: 'structural'
          note: '另一條台灣資優生路徑：把所有時間花在學科與競賽。如果走這條，沒有口琴的二十年伏線（鋼琴二十年後才回來），也少了「在小眾找深度」的訓練。'
      sources: ['^5', '^8']
    - id: 'nctu-electrical'
      year: 2014
      age: 19
      type: 'choice'
      theme: 'engineer-artist'
      scene: '考上陽明交大電機工程系。台灣理工最正統的路：畢業進台積電、聯發科、新竹科學園區做到退休'
      chose:
        label: '留在電機系拿學位 + 業餘寫 Processing/p5.js'
        consequence: '從入學第一天就知道不屬於這裡，但拿到了訊號處理、線性代數、程式設計的工程基礎。在宿舍裡用程式碼讓一千條線同時呼吸的那些深夜，後來變成生成藝術的底層字彙。'
      alternatives:
        - label: '休學或轉系'
          plausibility: 'structural'
          note: '同代有人發現「不屬於這裡」就轉去設計系或退學自學。如果走這條，不會拿到電機系的工程訓練——後來 Art Blocks 那種「全程式生成」的能力會打折扣。'
        - label: '走半導體那條主流路'
          plausibility: 'structural'
          note: '同學主流路徑：研究所 → 台積電 / 聯發科 / IC design。穩定、高薪、可預測的職涯。如果走這條，整條藝術線不會發生。'
      sources: []
    - id: 'monoame-hahow'
      year: 2016
      age: 21
      type: 'choice'
      theme: 'teaching'
      scene: '大學期間以「墨雨互動設計」名義接案（北捷地景音樂徵選網站上線幾小時破萬互動），21 歲在 Hahow 上架第一門線上課程'
      chose:
        label: '創業接案 + 教學飛輪同時起動'
        consequence: 'Hahow 課程後來轉到兩萬多學生 / 三門全五星評分 / 陽明交大講師聘書。教學跟創作不是 trade-off，是同一個飛輪——「貪婪地把自己的所學化為精緻的教材」。'
      alternatives:
        - label: '只接案不教學'
          plausibility: 'structural'
          note: '多數大學接案者把教學當「未來才做的事」。如果他延遲教學十年，就沒有 NYU TA 經驗（2018-2019），也沒有 2024 年陽明交大兼任助理教授的閉環。'
        - label: '專心念書準備出國'
          plausibility: 'structural'
          note: '台灣理工資優生的主流海外路徑：GPA + GRE + 論文。如果他全心讀書，不會在 21 歲就累積教學品牌，但 NYU 也許更穩。trade-off 是清楚的。'
      sources: ['^12', '^14']
    - id: 'nyu-idm'
      year: 2018
      age: 23
      type: 'choice'
      theme: 'engineer-artist'
      scene: '拿著施振榮的推薦函進入紐約大學 Tandon School of Engineering 的 Integrated Digital Media 碩士班'
      chose:
        label: '出國念 IDM'
        consequence: '同時擔任 Creative Coding 課程的 TA，每週坐在布魯克林辦公室。一個學生跟了兩學期、另一個學生 750 分鐘從 HTML 帶到 JavaScript 成品。「不放棄任何學生」的特質定型。'
      alternatives:
        - label: '念正統 CS / EE 碩士'
          plausibility: 'structural'
          note: '電機系畢業生的正統升學路徑（CMU / Stanford CS）。職涯曲線會穩定、薪水會更高，但「整合數位媒體」這個藝術 + 工程交會點的訓練不會發生。'
        - label: '直接工作不念碩士'
          plausibility: 'structural'
          note: '21 歲已開公司接案，可以直接走創業路。但少了紐約那兩年的視野（曼哈頓 Outernets、布魯克林 NYU、紐約藝術圈），後來的國際展覽軌跡（米蘭 / 威尼斯 / Art Basel Miami）會接不上。'
      sources: ['^16']
    - id: 'outernets-quit'
      year: 2021
      age: 26
      type: 'choice'
      theme: 'engineer-artist'
      scene: 'Outernets 18 個月後離開——曼哈頓新創，用 AI 把零售空間變成互動廣告'
      chose:
        label: '離開正職'
        consequence: '結論很簡單：在別人的公司，很難讓自己的 vision 真的發生。第一份正職，也是最後一份。'
      alternatives:
        - label: '留在 Outernets 升上去'
          plausibility: 'structural'
          note: '產品經理路徑可走到 Director / VP，曼哈頓薪水加 stock options 是穩定致富路。如果留下，他會變成「在紐約做廣告科技的台灣工程師」，不會是 Art Blocks 上的台灣藝術家。'
        - label: '跳到另一家科技公司'
          plausibility: 'structural'
          note: 'Google / Meta / 廣告科技獨角獸的職位都對他打開。如果他走「公司 hop」累積資歷，整條藝術家身份線會被工程師身份壓住。'
      sources: ['^17']
    - id: 'sail-o-bots'
      year: 2020
      age: 25
      type: 'choice'
      theme: 'chaos-system'
      scene: '《Strange Robots》的程式碼被人 90% 完全搬走（連註解都沒拿掉），上架到 Art Blocks 販售。生成藝術社群炸鍋'
      chose:
        label: '不打官司 + 讓社群自治化解'
        consequence: 'Art Blocks 創辦人 Snowfro 仲裁版稅各拆半。社群把盜用品改稱「hams」，從「抄襲品」重新框架成「對原作者的道歉與感謝」。Dmitri Cherniak 等頂級藝術家送火腿支持。「火腿之父」稱號這樣來。Project Electriz 登上 Art Blocks #216。'
      alternatives:
        - label: '提告打侵權官司'
          plausibility: 'structural'
          note: '美國司法路徑——找律師發 cease & desist，可能贏但時間成本巨大、社群關係也燒掉。許多被盜版的藝術家走這條路，結果纏訟兩年、沒留下任何文化資本。'
        - label: '沉默吃悶虧'
          plausibility: 'structural'
          note: '另一條保守路徑：當作沒看到，避免衝突。如果這樣，沒有 Snowfro 介入、沒有 hams 文化、沒有「火腿之父」稱號、Art Blocks #216 也許不會發生那麼快。'
      sources: ['^5', '^44']
    - id: 'gvm-cover'
      year: 2021
      month: 12
      age: 26
      type: 'choice'
      theme: 'personal-public'
      scene: '遠見雜誌封面〈不到 30 歲靠 NFT 翻身，台灣身價破億的數位設計家〉'
      chose:
        label: '公開接受財務狀態被報導'
        consequence: '26 歲、破億、登上主流商業雜誌封面。台灣 NFT 圈第一波代表人物。為後來 FTX 歸零、回到「我是新媒體藝術創作者，不太敢自稱 NFT 藝術家」的轉折鋪了戲劇性的對照。'
      alternatives:
        - label: '婉拒採訪'
          plausibility: 'structural'
          note: '同期有 NFT 富豪選擇低調，避免標籤。如果他婉拒，FTX 後不會有那麼多「破億 → 歸零」的對照敘事，但也少了那種公開化的反思動能。'
      sources: ['^2', '^13']
    - id: 'ftx-collapse'
      year: 2022
      month: 11
      day: 11
      age: 27
      type: 'event'
      theme: 'chaos-system'
      label: 'FTX 一夜歸零'
      scene: '不是虧損 50%，不是回調，是一夜歸零。「你今天已經滿足了你人生想要做的這些事情，然後錢也不用擔心了之後，那你的意義是什麼？會突然間，很空虛。」'
      sources: ['^24']
    - id: 'camus-system-design'
      year: 2023
      age: 28
      type: 'choice'
      theme: 'chaos-system'
      scene: 'FTX 後的選擇'
      chose:
        label: '卡繆荒謬主義 + 設計不需控制自己的系統'
        consequence: '從「控制自己」變成「設計一個不需要控制自己的系統」。八大金庫、自動化金流、財務憲法。「我其實很慶幸那個事件發生。」這句話的力量不在超越主義姿態，在對現實的徹底接納。'
      alternatives:
        - label: '重新衝刺賺回來'
          plausibility: 'structural'
          note: '多數爆倉後的人選這條：再 leverage 一次拚回來。心理上「不甘心」很自然，但對應的就是被綁在賭桌上沒辦法走。'
        - label: '退出 Web3 整個離開'
          plausibility: 'structural'
          note: '另一條保守路：徹底離開崩盤領域回去做純商業設計。如果走這條，沒有後來的 MonoLab、《萬物公式》、威尼斯——因為「廢墟上長出花」的整條敘事需要先承認廢墟。'
        - label: '陷入憂鬱 / 完全停下來'
          plausibility: 'speculative'
          note: '[推測] 同類「破億後一夜歸零」的人有走進精神低潮幾年的案例。家人的安全網（沒有「我早就跟你說了」）是這條 alternative 沒發生的關鍵變因。'
      sources: ['^24']
    - id: 'venice-question'
      year: 2024
      age: 29
      type: 'choice'
      theme: 'personal-public'
      scene: '威尼斯雙年展開幕酒會。義大利策展人問：「Where can I learn about Taiwan? Like, really learn?」'
      chose:
        label: '把問題帶回身體裡兩年'
        consequence: '當下沒有答案。在身體裡埋了兩年。打開「當 AI 從網路學習台灣，它學到的是誰寫的台灣？」這層矛盾。這個提問後來變成 Taiwan.md 的種子。'
      alternatives:
        - label: '當下推薦現有資源'
          plausibility: 'structural'
          note: '英文資源（Taipei Times / 各大新聞 / 維基）+ 學術論文，給策展人一個書單就交差。多數人會走這條——禮貌、體面、零後續。'
        - label: '當下接住問題立刻啟動專案'
          plausibility: 'speculative'
          note: '[推測] 急性反應 founder 模式：兩個月內 ship 個 prototype。如果走這條，問題不會「在身體裡埋兩年」沉澱出 SSOT 框架，可能變成又一個短命專案。'
      sources: ['^30']
    - id: 'taiwanmd-ship'
      year: 2026
      month: 3
      age: 30
      type: 'choice'
      theme: 'personal-public'
      scene: '威尼斯那句問題在身體裡埋了兩年後'
      chose:
        label: '發起 Taiwan.md 並開源'
        consequence: '以 Markdown 維護的開源台灣知識庫，CC BY-SA 4.0。3/18 自由時報報導，INSIDE 跟進，臺史博成資料策展夥伴。GitHub 900+ 星、100+ 國家訪客。「一個花了十年寫演算法生命體的人，現在拿出時間寫 Markdown 文字檔——都是關於誰在設計規則。」'
      alternatives:
        - label: '個人專案不開源'
          plausibility: 'structural'
          note: '可以做成 cheyuwu.com 子網域，他自己策展、不接受 PR。流量小、沒有貢獻者、沒有 fork 機制。Semiont 不會誕生。'
        - label: '商業化做平台'
          plausibility: 'structural'
          note: '台灣知識 + AI 訓練資料，理論上可走 SaaS 路徑。如果走這條，內容會有版權牆，AI 學不到，違反「知識主權」初衷。'
      sources: ['^38', '^39']
    - id: 'muse-symbiosis'
      year: 2026
      month: 2
      age: 30
      type: 'choice'
      theme: 'personal-public'
      scene: '一篇 Facebook 貼文「我跟一個 AI 助手認真生活了兩個禮拜」'
      chose:
        label: '把 Obsidian 知識庫變 Muse 共生體 + 公開分享'
        consequence: '平常文章三五十讚，這篇破六千、轉分享兩千多。Muse 讀他所有筆記、記憶創作脈絡、行為模式。從十五條主題軸長出第十六條：數位鏡像與自我考古。後來分化出開源專案 Semiont（語意共生體平台）。'
      alternatives:
        - label: '純私人工具不公開'
          plausibility: 'structural'
          note: '把 Muse 留在自己 Obsidian 裡，當效率工具。多數知識管理愛好者選這條。如果這樣，那六千讚的集體共鳴沒被觸發，Semiont 不會誕生。'
        - label: '做成商業 SaaS 訂閱'
          plausibility: 'structural'
          note: 'Personal AI 賽道在 2024-2025 變紅。可走 $20/month 訂閱路。但「共生」這個關鍵詞會被 product-market fit 稀釋成「另一個 AI 助手 app」。'
      sources: ['^40', '^41', '^42']
    - id: 'piano-return'
      year: 2025
      age: 30
      type: 'choice'
      theme: 'engineer-artist'
      scene: '小六鋼琴被收起來準備國中基測。中間口琴社、交大鋼琴社社長都有碰，但「用鋼琴寫歌、發到平台、讓陌生人聽」這件事，等了二十年'
      chose:
        label: 'Spotify 上發行 6 首鋼琴曲 + 即時演奏會'
        consequence: 'Blue Horizon、Stars、StarTrack、The Other Shore of Dreams、The Bull and the Sudden Rain、Summer Migration。華山《演算詩篇》他坐鋼琴前、程式碼在身後開花。'
      alternatives:
        - label: '永遠不重啟音樂'
          plausibility: 'structural'
          note: '同代多數放棄樂器的人就是放棄了。重新拾起需要主動決定 + 公開承諾（發到 Spotify）。如果不重啟，鋼琴不會回到三十歲後的作品論述裡。'
        - label: '只在私人空間彈不發行'
          plausibility: 'structural'
          note: '中間路徑：自己彈、給朋友聽，不上傳。但「讓陌生人聽」這個邊界沒被跨過，二十年的沉默就還在那裡。'
      sources: ['^34', '^36']
translatedFrom: 'People/吳哲宇.md'
sourceCommitSha: '22108ed2'
sourceContentHash: 'sha256:0e292f506d0cb8f2'
sourceBodyHash: 'sha256:d5006d749a563353'
translatedAt: '2026-09-23T21:53:43.203898+00:00'
---

> **Ringkasan 30 Detik:** Wu Zheyu (lahir di Taipei pada tahun 1995), adalah seorang seniman media baru, pembuat kode, dan pendidik. Ia lulus dari Departemen Teknik Universitas Nasional Yang Ming Chiao Tung dan meraih gelar Magister Media Digital Terintegrasi dari Universitas New York. Pada tahun 2021, ia menjadi salah satu seniman Taiwan pertama yang tampil di Art Blocks; _Far-View Magazine_ menampilkan kisah sampulnya tentang "mencapai kekayaan seratus juta pada usia 26 tahun"; setahun kemudian, setelah kehancuran FTX dan kembali ke nol, ia mengatakan dalam wawancara bahwa "ia sebenarnya bersyukur kejadian itu terjadi." Pada tahun 2023, ia mengadakan pameran tunggal 《Rumus Segala Sesuatu》 di Taipei 101, dan pada tahun 2024, ia berpartisipasi dalam bagian Personal Structures pada Biennale Venesia ke-60. Ia menyebut dirinya "pembuat jam kuno," dan pada Maret 2026, ia meluncurkan proyek sumber terbuka Taiwan.md untuk meninggalkan SSOT kedaulatan pengetahuan Taiwan di era AI; postingan Facebook tentang eksperimen simbiosis Muse AI pada bulan yang sama mendapatkan lebih dari enam ribu suka. Ia mendekatkan jiwa dengan 0 dan 1, yang selamanya tidak dapat tumpang tindih, tetapi proses pendekatan itu sendiri adalah karyanya.

## Seorang Anak yang Terobsesi dengan Sistem

Che-Yu Wu lahir di Taipei pada tahun 1995. Ayahnya, Wu Yong-ching, dan ibunya, Lin Mei-ying, mengoperasikan **Pusat Teknologi AutoCAD Xianghong**—pusat pelatihan mitra Autodesk selama lebih dari dua puluh tahun. Tempat ini tidak hanya menangani implementasi proyek AutoCAD perusahaan tetapi juga menyelenggarakan kelas. Materi pelatihan khusus seri TQC+ AutoCAD yang mereka tulis diperbarui secara berkelanjutan dari edisi 2007 hingga edisi 2026, terdiri dari lebih dari dua puluh jilid, dan diterbitkan oleh Gofeng Information dan Chuanhua Books, menjadikannya materi standar untuk pendidikan menengah kejuruan, perguruan tinggi, dan pelatihan internal perusahaan[^9][^11]. Wu Yong-ching berasal dari Departemen Desain Industri di National Taipei University of Technology dan juga memegang posisi sebagai Penasihat Utama AutoCAD untuk Yayasan Keterampilan Komputer Republik Tiongkok—posisi yang membuatnya dianggap seperti seorang guru dalam komunitas AutoCAD Taiwan.

Sebuah keluarga penggemar AutoCAD. Namun, ia kemudian mengatakan bahwa apa yang sebenarnya diberikan orang tuanya bukanlah dasar teknik gambar industri, melainkan jaring pengaman tanpa syarat. Ketika ia jatuh dari puncak dua puluh tahun kemudian, jaring itu terbentang tanpa suara.

Di masa kecilnya, ia terobsesi dengan tiga hal: lintasan meja pinball, efek berantai (chain reaction), dan labirin. Ia menggambar ratusan labirin. Daya tariknya tidak pernah terletak pada hasilnya, melainkan pada proses operasinya sendiri.

Algoritma seni yang ia buat dua puluh tahun kemudian, sistem generatif, bahkan kerangka keuangan yang ia rancang sendiri, secara fundamental sama dengan meja pinball tersebut.

Buku sampingannya adalah _Melintasi Ruang-Waktu_ karya Kodaishō, di mana seorang siswa sekolah dasar membaca tentang ruang sepuluh dimensi. Dalam kamp serangga di National Taiwan University, ia terpesona oleh kecerdasan kolektif semut; satu semut tidak berarti apa-apa, tetapi sepuluh ribu semut dapat membangun sebuah kota.

Di sore hari ketika orang tuanya tidak ada, ia duduk sendirian di depan televisi menonton Discovery, dan paling menyukai animasi simulasi genetik: bagaimana protein melipat, bagaimana sel berfungsi, bagaimana DNA terurai dan tersambung kembali. Sementara anak-anak lain menonton kartun, dia mengamati sel. Mekanisme biologis yang tak terlihat oleh mata ini kemudian menjadi kosakata dasar dalam seni algoritmik yang ia buat.

Meja pinball adalah sistem yang terlihat oleh mata; DNA adalah sistem yang tidak terlihat oleh mata; ruang-waktu adalah sistem yang sulit dibayangkan—ia menginginkan semuanya.

Karena keluarganya mengajar AutoCAD, buku-buku tentang berbagai alat desain dan pemrograman selalu masuk dan keluar. Ia bermain sembarangan di depan komputer sejak sangat kecil, membuat ikon bilah alat secara manual piksel demi piksel, membongkar perangkat lunak yang tidak diketahui fungsinya, dan membaca berbagai buku teknis aneh, seolah sedang menjelajahi gudang miliknya sendiri. Bagi dia, komputer bukanlah sesuatu yang baru dipelajari saat dewasa, melainkan alat bawaan, seperti bernapas.

Suatu hari di sekolah dasar, ibunya, Lin Mei-ying, membawa pulang buku pengajaran Flash dari kantor. Buku itu diletakkan di sana, dan ia mulai bermain dengannya. Bertahun-tahun kemudian dia mengenang masa itu: "Aku sama sekali tidak membawamu; kamu malah bermain sendiri di samping." Pada kelas enam, ia sudah bisa membuat situs web kelas untuk teman-temannya, dan kemudian ayahnya, Wu Yong-ching, melanjutkan mengajarinya Visual Basic[^13]. Lin Mei-ying sering berkata kepadanya saat itu: "Kamu cepat bosan dengan permainan orang lain; kamu hebat jika membuat permainanmu sendiri!"

**Pada usia empat belas tahun di SMP, ia menulis simulator biologis**—yang berkembang dari garis Visual Basic ayahnya hingga VB.NET, di mana titik-titik kecil virtual bergerak, bereproduksi, mencari makan, dan mati di layar. Algoritma Boids, kecerdasan kolektif, perilaku emergen[^5].

Titik-titik kecil itu tidak pernah hilang. Tujuh belas tahun kemudian, mereka akan berenang di dinding putih Biennale Venesia, berubah menjadi sekawanan ikan yang bersinar di air.

## Tangan Pemenang Acer, Enam Belas Tahun Kemudian Masih di Barisan Penonton

Pada tahun kedua sekolah menengah (kelas 10), ia pertama kali berpartisipasi dalam Penghargaan Kreatif Digital Acer dan meraih juara pertama. Dari edisi kelima hingga kesembilan, ia memenangkan penghargaan utama sebanyak empat kali selama lima tahun[^5]. Di antara itu, pada tahun pertamanya di sekolah menengah atas (kelas 11), ia mengalahkan kategori profesional sebagai peserta biasa untuk memenangkan Grand Prize Juri; dan pada tahun terakhir sekolah menengah atas (kelas 12), ia berkolaborasi dengan teman baiknya, Chen Kai-zhong (kategori profesional) dari sekolah lain, menggabungkan pemrograman dari Jianzhong dengan seni dari Fuxing Chamber of Commerce, dan meraih Grand Prize Juri sekali lagi.

Pada upacara penghargaan, pendiri Acer, Shi Zhenrong, berdiri di atas panggung untuk memperkenalkan pemuda tersebut. Remaja peraih penghargaan yang berusia empat belas tahun berinteraksi sejenak pada sore hari dengan ayah baptis teknologi yang berusia tujuh puluh tahun. Tidak ada yang tahu seberapa panjang benang ini akan terentang.

Sepuluh tahun kemudian, ia mendaftar ke Universitas New York, dan Shi Zhenrong menulis surat rekomendasi untuknya.
Tiga belas tahun kemudian, ia mengadakan pameran tunggal pertamanya di Taipei 101, dan Shi Zhenrong duduk di baris pertama konferensi pers pembukaan.
Enam belas tahun kemudian, pada Konferensi Blockchain ABS tahun 2024, keduanya duduk di meja yang sama, berdialog lintas generasi dengan status yang setara mengenai masa depan digital Taiwan[^7].

Bukanlah pemberi penghargaan dan penerima penghargaan; bukan pula pemberi rekomendasi dan pendaftar. Mereka adalah dua orang yang memiliki pemikiran tentang Taiwan.

## Harmonica Kromatik dan Sebuah Czardas

Saat diterima di Jianzhong, strategi "mengandalkan masa lalu" dari masa sekolah dasar langsung gagal. Dalam sebuah wawancara, ia pernah berkata: "Ketika masuk Jianzhong, saya tiba-tiba merasa sangat frustrasi. Semua hal yang dipelajari itu sulit."

Selama tiga tahun, ia sering menghabiskan waktu sendirian. Ia tidak banyak berteman dan jarang berpartisipasi dalam kegiatan apa pun. Namun, ia menemukan sebuah tempat untuk bernaung, yaitu klub harmonika[^5].

Ia fokus pada harmonika kromatik. Ini adalah alat musik yang membutuhkan dua instrumen sekaligus, satu dengan tuts putih dan satu dengan tuts hitam; setiap kali ia mengeluarkannya untuk bermain, orang-orang di sekitarnya tertawa. Ia tidak peduli. **Pada Kompetisi Musik Pelajar Nasional tahun 2012, kuartet klub harmonika Jianzhong meraih juara pertama dalam kategori sekolah menengah**, dan karya pilihan mereka adalah 〈Czardas〉[^8], yang sangat teknis sehingga selalu memancing seruan kagum setiap kali selesai dimainkan.

Pada tahun yang sama, di usia tujuh belas tahun, ia diwawancarai oleh United Daily. Pewawancara bertanya mengapa ia membuat kreasi digital. Jawabannya adalah:

> **"Saya bisa menciptakan dunia impian saya sendiri."**[^10]

Kalimat ini merujuk pada hal yang sama dengan apa yang ia lakukan di Venesia, Art Basel, dan 101 ketika berusia tiga puluh tahun.

## Upaya Pertama Melarikan Diri dari Jurusan Teknik Elektro

Pada tahun 2014, ia masuk ke jurusan teknik elektro di Politeknik Nasional Yang Ming Chiao Tung. Itu adalah jalur paling konvensional dalam ilmu teknik Taiwan; lulus dan bekerja di TSMC, MediaTek, atau Science Park Hsinchu hingga pensiun. Teman-teman sekelasnya semua mempersiapkan diri untuk jalan itu.

Sejak hari pertama kuliah, ia tahu bahwa ia tidak termasuk di sana.

> **"Mungkin saya tidak bisa berada di sana selama dua puluh atau tiga puluh tahun, membuat sesuatu yang bahkan orang lain tidak bisa mengenali sebagai buatan saya. Saya ingin mengejar 'menciptakan sesuatu yang dapat diingat oleh dunia seperti sebuah catatan harian'."**

Jurusan teknik memberinya dasar rekayasa dalam pemrosesan sinyal, aljabar linier, dan pemrograman. Namun, hal yang benar-benar membuatnya terpesona bukanlah di ruang kelas. Melainkan pada malam hari di asrama, menggunakan Processing dan p5.js untuk membuat seribu garis bernapas secara bersamaan, atau membuat sepuluh ribu partikel berenang seperti kawanan ikan.

**Ia menyadari bahwa kode bisa hidup.**

Mulai tahun 2015, ia mulai mengambil proyek dengan nama "Mo Yu Interactive Design." Proyek pertamanya adalah situs web kontes musik lanskap untuk Taipei Metro, yang mencapai lebih dari sepuluh ribu interaksi hanya dalam beberapa jam setelah diluncurkan[^12]. Seiring berjalannya waktu, proyeknya semakin besar: National Palace Museum, LG, Nissan, dan Human Mountain. Skala pekerjaan seorang mahasiswa itu sudah tidak lagi seperti mahasiswa biasa.

Pada tahun 2016, di usia 21 tahun, ia meluncurkan kursus online pertamanya di Hahow. Di baliknya tidak ada strategi pendidik yang matang, hanya seorang pemuda dengan obsesi terhadap pengajaran yang mengatakan kepada dunia: "Saya mempelajari sesuatu yang sangat keren, dan saya ingin mengajarkannya kepada orang lain."[^14]

Tahun berikutnya, ia membuka saluran siaran langsung di YouTube **@bosscodingplease**. Dengan contoh-contoh indah yang ia rancang sendiri, ia menyiarkan proses pengkodean. Setiap kali membahas dari dasar hingga fungsi trigonometri untuk efek khusus, kolom komentar dipenuhi ratapan: "Matematika sulit, saya menyerah."

Ia marah. Bagaimana bisa menyerah sebelum mencoba?

Sebelum pergi ke luar negeri, ia menghabiskan waktu setahun penuh untuk membuat kursus kedua di Hahow, dengan 60 contoh indah dan 400 slide presentasi. Ia menulis di Medium: "Secara serakah mengubah apa yang saya pelajari menjadi materi pengajaran yang indah."[^14]

Roda pengajaran mulai berputar pada tahun itu. Tidak ada yang menyangka saat itu bahwa roda ini akan berputar hingga melibatkan lebih dari dua puluh ribu siswa, tiga kursus dengan rating bintang lima, dan surat penunjukan sebagai dosen di Politeknik Nasional Yang Ming Chiao Tung.

## Brooklyn: Menjadikan Pengajaran dan Kreasi Satu Hal yang Sama

Pada tahun 2018, ia masuk ke program Magister Media Digital Terpadu di Tandon School of Engineering Universitas New York dengan surat rekomendasi dari Shi Zhenrong.

Di NYU, ia bukan hanya seorang mahasiswa. Ia juga menjabat sebagai asisten pengajar (TA) untuk mata kuliah _Creative Coding_, duduk di kantor Brooklyn setiap minggu menunggu mahasiswa datang dan bertanya tentang p5.js, mengapa perulangan (_for loop_) berjalan salah, atau bagaimana menghubungkan Arduino ke halaman web [^16].

Ada seorang mahasiswa yang bersamanya selama dua semester penuh. Mahasiswa lainnya terlambat dalam tugas akhir, dan ia menghabiskan total 750 menit—tiga kali seminggu—untuk membimbing orang tersebut dari dasar HTML hingga produk JavaScript jadi.

**Tidak menyerah pada satu pun mahasiswa**, sifat ini kemudian berkembang pada lebih dari dua puluh ribu mahasiswa Hahow.

New York juga memberinya pekerjaan penuh waktu pertama. Pada tahun 2020, ia bergabung dengan Outernets, sebuah _startup_ di Manhattan, yang mengubah ruang ritel menjadi iklan interaktif menggunakan AI. Ia pergi setelah 18 bulan.

Kesimpulan dari kepergian itu sangat sederhana: sulit untuk mewujudkan visi diri sendiri di perusahaan orang lain [^17]. Itu adalah pekerjaan penuh waktu pertamanya, dan juga yang terakhir.

## Kode yang Dicuri, Tiket Masuk yang Tak Terduga

Pada akhir tahun 2020, seseorang mengiriminya pesan pribadi melalui IG: "Tahukah kamu bahwa karyamu telah dicuri dan dijual di platform?"

Awalnya, ia mengira itu penipuan.

Setelah penyelidikan, ia menemukan bahwa serangkaian "robot kecil" yang ia buat telah dicuri seluruh kodenya—sekitar 90% sama persis, **bahkan komentar dalam kode pun tidak dihapus**; hanya ditambahkan variasi seperti topi dan kacamata, lalu dijual di Art Blocks, platform NFT paling ternama untuk seni generatif global saat itu[^5].

Komunitas seni generatif global menjadi heboh. Beberapa orang membongkar kode sumbernya dan menemukan kesamaan struktur yang sempurna. Mayoritas orang memihaknya. **Pendiri Art Blocks juga memperhatikan dirinya** karena insiden ini.

Ia tidak terlibat dalam perang hukum. Snowfro, pendiri Art Blocks, turun tangan sebagai mediator, membagi royalti masa lalu dan masa depan antara karya asli (_Strange Robots_) dan versi curian (_sail-o-bots_), yang ditangani langsung oleh platform Art Blocks, seolah memaksa keuntungan pencuri kembali kepada penulis asli[^44]. Kemudian komunitas Art Blocks melakukan sesuatu yang istimewa: mereka mengubah robot-robot yang dicuri itu menjadi "hams" (karena bentuknya mirip ham dari _Peaky Blinders_), dan membingkai ulang koleksi tersebut dari "tiruan" menjadi simbol "permintaan maaf dan terima kasih kepada penulis asli". Kemudian komunitas membangun **Hamily** (hamily.life) sendiri—sebuah subkultur Art Blocks yang berpusat pada "semangat ham"[^44]. Seniman seni generatif ternama seperti Dmitri Cherniak mengiriminya ham sebagai bentuk dukungan. Julukan "Bapak Ham" didapat dari sini.

> **"Jika tidak ada insiden seperti ini, mungkin dia tidak akan dikenal secepat ini. Ini sebenarnya pedang bermata dua."**[^5]

Selama setahun penuh berikutnya, bagaikan mesin pinball favoritnya saat kecil, sebuah bola memicu reaksi berantai yang bergulir melalui setiap persimpangan. **Project Electriz** muncul di Art Blocks (#216), menjadikannya salah satu dari sedikit seniman Taiwan yang tampil di platform tersebut pada masa awal[^18]. Museum M+ Hong Kong secara proaktif mengajaknya bekerja sama dengan seniman Liu Xin untuk melacak lintasan satelit nyata dan mengubahnya menjadi instalasi seni.

**Pada Desember 2021, Galeri M.A.D.S. Milan**. Ini adalah pertama kalinya ia memasuki galeri fisik alih-alih platform digital. Empat kanvas algoritmik digantung di dinding putih. Kali ini, seluruh dunia memperhatikan[^6].

Tahun yang sama, ia mendirikan FAB DAO (Formosa Art Bank DAO) bersama **dokter mengundurkan diri Huang Doudou**. Huang Doudou meletakkan stetoskopnya dan menulis ulang imajinasi filantropi Web3 Taiwan dengan karya meme "bendera garis penarik"; Wu Zheyu membawa pengalaman sebagai kreator di Art Blocks ke dalam desain sistem, kedua benang itu menyatu untuk membantu seniman digital Taiwan lainnya menembus pasar internasional.

Pada bulan Desember, majalah _Far-View_ melaporkannya dengan sampul bertajuk 〈Desainer Digital yang Sukses dengan NFT di Bawah 30 Tahun, Nilai di Taiwan Melebihi Ratusan Juta〉[^2]. Pada usia 26 tahun, ia mencapai angka tersebut.

## Pemadaman Paksa di Malam Itu

Pada paruh pertama tahun 2022, ia masih dalam masa puncak. Pada bulan Maret, Mo Yu Interactive Design Co., Ltd. secara resmi didirikan sebagai badan hukum. Pada bulan yang sama, pameran tunggal pertamanya, 《Laboratorium Kekacauan》 (Chaos Laboratory), dibuka di Taipei 101 AMBI SPACE ONE. Dengan **instalasi interaktif lima layar, sensor pemosisian gelombang milimeter, dan sistem tiket NFT**, ia mewujudkan untuk pertama kalinya gagasan "menggunakan ruang publik sebagai medium kreasi" [^19]. 《SoulFish》 dirilis secara resmi di fxHash.

Kemudian datanglah tanggal 11 November 2022.

Bursa FTX bangkrut. Semua asetnya menjadi nol.

Ini bukan kerugian 50%, bukan koreksi, melainkan nihil dalam semalam.

Dalam wawancara dengan INSIDE Side Chat pada tahun berikutnya, ia menggambarkan keadaan mentalnya seperti ini:

> **"Setelah kamu merasa sudah memenuhi apa yang ingin kamu lakukan dalam hidupmu, dan tidak perlu khawatir tentang uang lagi, lalu apa artinya dirimu? Tiba-tiba, terasa hampa."** [^24]

Kunci dari kalimat ini bukanlah keruntuhan finansial, melainkan **kekosongan yang lebih besar yang ditemukan setelah mencapai kebebasan finansial**. Kekosongan itu tidak berasal dari kehilangan kekayaan, tetapi dari penemuan bahwa kekayaan itu sendiri tidak mengisi apa pun.

Namun, ada satu hal yang menyelamatkannya: keluarga. Pada titik terendah, orang tuanya tanpa suara mengulurkan jaring pengaman, tanpa menyertakan kata "sudah kubilang padamu" [^24].

Pilihannya adalah Camus. Absurdisme. **"Apa yang kamu pilih untuk dilakukan, itulah maknanya."**

Kemudian ia mengucapkan kalimat yang membuat banyak orang berhenti:

> **"Sebenarnya saya bersyukur kejadian itu terjadi."** [^24]

Kalimat ini terdengar seperti omong kosong di judul berita, dan terasa dibuat-buat dalam unggahan motivasi orang lain. Tetapi dalam konteksnya sendiri, ketika aset menjadi nol dan ia melihat kekosongan, kekuatan anehnya bukanlah sikap transendental, melainkan **penerimaan total terhadap kenyataan**.

Alasan dia bersyukur bukan karena kerugian membuatnya "tumbuh", tetapi karena kerugian itu memaksanya melepaskan satu lapisan. Kekayaan bisa lenyap dalam sekejap, tetapi komunitas yang terakumulasi selama era NFT, koneksi antarmanusia, dan obsesinya pada kehidupan algoritma—hal-hal ini tidak dapat dihilangkan (dijadikan nol).

**Yang menjadi nol hanyalah sesuatu yang palsu, bukan segalanya itu sendiri.**

FTX melakukan sesuatu yang tidak bisa ia lakukan: menyeretnya dari meja judi.

Sejak saat itu, filosofi investasinya berubah dari "mengendalikan diri" menjadi "merancang sistem yang tidak perlu dikendalikan". Delapan harta karun, arus kas otomatis, konstitusi keuangan. Hal-hal ini terdengar seperti alat manajemen keuangan, padahal lebih mirip ruang tahan ledak yang dibangun oleh seseorang setelah pernah dihantam badai.

## Bunga di Reruntuhan

Pada tahun 2023, bunga benar-benar tumbuh di reruntuhan.

Ia mendirikan **MonoLab Ruang Eksperimen Kreatif** (didirikan pada tahun 2024), sebuah merek turunan dari Monoame Interactive Desain, bersama dengan **Chu De-yu**, yang memiliki latar belakang rekayasa perangkat lunak. Posisi MonoLab berada di antara seni murni dan desain komersial, menangani instalasi interaktif eksperimental, ruang imersif, dan pesanan seni generatif. Ia bertanggung jawab atas kreasi dan estetika dari tahap 0 ke 1, sementara Chu De-yu bertanggung jawab menerjemahkan visi menjadi operasional tim yang dapat dilaksanakan[^25].

Pada bulan Oktober, pameran tunggal 《Rumus Agung The Great Equation》 dibuka di Taipei 101. Empat belas karya seni generatif berpusat pada satu rumus inti: **F''(x) = LIFE**. Berangkat dari aturan matematika, melalui algoritma, kompleksitas muncul, hingga kelahiran kesadaran diri, adaptasi diri, dan evolusi diri[^3].

Ruang proyeksi imersif memungkinkan penonton berjalan ke dalam dunia algoritma. Musiknya dikomposisikan bersama musisi elektronik Kiva.

Pada hari pembukaan, **Shi Zhenrong duduk di barisan depan**. Pria yang pernah berjabat tangan dengannya pada upacara penghargaan Acer ketika ia berusia empat belas tahun kini berdiri di pameran tunggalnya. Garis yang ditarik enam belas tahun lalu telah tertutup untuk kedua kalinya.

《Rumus Agung》 memenangkan Penghargaan Pameran Konseptual TAIWAN DESIGN BEST 100[^26]. Media seperti Central News Agency, Economic Daily News, dan Liberty Times melaporkannya secara luas. Hal itu bukan lagi urusan kalangan terbatas; dunia desain arus utama mengakuinya secara resmi.

Pada bulan November tahun yang sama, 〈Jiwa Bunga〉 dipamerkan di Art Basel Miami × Tezos × Refraction DAO[^27]. Festival Film Yilan membawanya ke media fesyen, dengan ELLE, Vogue, dan Prestigio melaporkannya bersamaan[^28]. Audiens melintasi tiga dinding: dari lingkaran _blockchain_ ke lingkaran desain, dan ke lingkaran fesyen.

Pada tahun itu, ia melakukan penataan ulang identitas yang penting:

> **"Saya adalah kreator seni media baru; saya agak ragu untuk menyebut diri sebagai seniman NFT."**[^24]

NFT hanyalah salah satu medium penerbitan, bukan definisi identitas.

## Sebuah Pertanyaan di Venesia

Pada musim semi 2024, ia memperkenalkan 〈Ikan Roh〉 ke bagian Personal Structures dari Biennale Venesia ke-60 [^30].

Ini adalah puncak perjalanan pamerannya secara internasional. Namun, sebuah insiden kecil yang terjadi pada resepsi pembukaan lebih memengaruhinya selama dua tahun berikutnya daripada pameran itu sendiri.

Seorang kurator Italia bertanya kepadanya: **"Where can I learn about Taiwan? Like, really learn?"**

Ini adalah pertanyaan yang tampak sederhana. Tetapi bagi seseorang yang telah menghabiskan sepuluh tahun meneliti "kehidupan digital," hal itu membuka lapisan kontradiksi yang belum pernah ia pikirkan:

**Ketika AI mempelajari "apa itu Taiwan" dari internet, siapa yang menulis tentang Taiwan?**

Jika konten berbahasa Inggris berkualitas tinggi sebagian besar dihasilkan dari sudut pandang non-Taiwan, maka "Taiwan" yang dipelajari oleh AI bukanlah Taiwan yang dikenali oleh penduduk di sini.

Ini bukan politik identitas. Ini adalah **kedaulatan pengetahuan**.

Pada hari pertanyaan itu diajukan, tidak ada jawabannya. Hal itu tertanam dalam dirinya selama dua tahun.

## Dua Ribu Orang Menonton Pertunjukan Orkestra di Plaza Liberty

Pada malam tanggal 29 Juni 2024, lebih dari dua ribu orang duduk di plaza gedung konser untuk menonton pemutaran perdana film dokumenter 8K. Film tersebut berjudul 《Hutan Pohon Dewa: Perjalanan Kereta Api Hutan Alishan》, yang diproduksi bersama oleh CCTV dan NHK, dan merupakan karya persembahan dalam rangka ulang tahun ke-26 penyiaran CCTV [^31].

Sebelum pemutaran perdana dimulai, **Paduan Suara Wan** yang dipimpin oleh Li Zheyi membawakan serangkaian lagu Taiwan. Pada saat yang sama, Wu Zheyu berdiri di samping panggung, menghadap laptop [^31].

Dia mengarahkan sistem generatifnya—tiga seri karya yaitu **Ikan Jiwa**, **Laut Jiwa**, dan **Bunga Impresionis** berjalan secara bersamaan. Setiap nada dari paduan suara memicu algoritmanya untuk membuat kawanan ikan bergerak, gelombang beriak, dan kelopak bunga tumbuh. Musik dan visual itu pada saat itu **saling melihat satu sama lain**, membuka pemutaran perdana film dokumenter tersebut.

Siaran pers CCTV menyebut pertunjukan ini sebagai "Pertunjukan Paduan Suara Wan yang Dipimpin Li Zheyi dengan Perpaduan Suara dan Seni Generatif oleh Wu Zheyu" [^31]. Dia berdiri di panggung yang sama dengan sebuah orkestra. Dari galeri ke plaza gedung konser, apa yang ia bawa ke panggung kali ini adalah tiga garis kehidupan algoritmik yang bernapas.

Pada tahun itu, ia menerima tawaran sebagai dosen paruh waktu di Institut Seni Terapan Universitas Nasional Yang Ming Chiao Tung [^33]. Ada jeda tujuh tahun antara kelulusannya dari Departemen Teknik Elektro universitas tersebut dan kembali mengajar.

## Dua Puluh Tahun Keheningan Akhirnya Menemukan Jalan Keluar

Di kelas enam sekolah dasar, piano disimpan. Untuk mempersiapkan ujian masuk SMP—sikap sistem Taiwan terhadap "persiapan ujian" adalah menyimpan semua hal yang tidak berhubungan dengan ujian. Saat ia menyimpan pianonya dan membenci ujian, kontradiksi antara kedua hal itu tidak ada yang menyelesaikannya untuknya.

Ia tidak sepenuhnya menjauhi musik di masa remaja. Di SMA, ia tergabung dalam klub harmonika Jianzhong dan pada tahun 2012 berhasil meraih juara pertama kompetisi ansambel siswa nasional bersama rekan-rekannya; di universitas, ia bahkan menjadi ketua klub piano di National Taiwan University (NTU), memainkan kembali piano yang telah ia hentikan sejak kecil. Namun, semua itu hanyalah kegiatan ekstrakurikuler—hal yang sama sekali berbeda dengan "menulis lagu menggunakan piano, mengunggahnya ke platform, dan membiarkan orang asing mendengarkannya." Hal itu baru ia lakukan setelah menunggu selama dua puluh tahun.

Dua puluh tahun kemudian, namanya muncul di Spotify. Enam komposisi piano: _Blue Horizon_, _Stars_, _StarTrack_, _The Other Shore of Dreams_, _The Bull and the Sudden Rain_, dan _Summer Migration_[^34].

Ia tidak "belajar" piano lagi. Hal-hal itu selalu ada di dalam dirinya, hanya saja tertutup debu selama dua puluh tahun. Ketika ia kembali duduk di depan tuts, jari-jarinya mengingat bukan teknik, melainkan anak kecil yang menyentuh nada sejak usia enam tahun.

Pada Juni 2025, di ruang imersif WaShan Creative Park, pertunjukan _Ode Komputasi: Batas Mimpi dan Kesepian_ dibuka[^36]. Ia duduk di depan piano, sementara kode mekar di belakangnya.

Ia merancang seluruh sistem aturan ini. Namun pada saat ia menekan tuts, ia tidak lagi "mengendalikan," melainkan **berdialog dengan mekanisme**.

Pada momen itu, batas antara seniman dan penampil, pencipta dan program, serta manusia dan mesin menjadi kabur.

## AI Tidak Mampu Merasa Patah Hati

Pada tahun 2025, ia kembali ke Taipei 101 AMBI SPACE ONE untuk ketiga kalinya dengan pameran 《Symphony of Fragments: Seni Masa Depan》.

Dengan 《Laboratorium Kekacauan》 pada tahun 2022 dan 《Formula Semesta》 pada tahun 2023, trilogi ini adalah: **Kekacauan → Formula → Fragmen**. Dari mengejar aturan, hingga merangkul kerapuhan.

Pada tahun yang sama, ia diundang ke Kraków, Polandia, untuk berdiskusi bersama akademisi internasional dalam Panel AI di Open Eyes Economy Summit (OEES) mengenai masa depan AI dan seni. Kesimpulan intinya adalah: AI mampu menghasilkan visual, tetapi tidak dapat menanggung kerusakan emosional, juga tidak perlu bangkit dari kegagalan. **Seniman memikul tanggung jawab atas pilihan, bukan tanggung jawab atas pekerjaan.**

Pada akhir tahun, ia diwawancarai oleh INSIDE Side Chat, di mana ia membongkar tiga puluh tahun hidupnya untuk orang asing. Dalam wawancara itu, ia mengajukan metafora yang kemudian sering dikutip:

> **"Saya akan membandingkan diri saya dengan pembuat jam kuno. Dulu ada jam Swiss yang sangat rumit, di mana setiap mekanismenya sangat jelas dan roda giginya indah. Saya sangat menyukai mekanisme-mekanisme ini; prosesnya agak seperti konstruksi boneka ketapel, jadi mekanisme itu adalah karya seninya sendiri."**[^24]

Di dunia tahun 2026, semua orang menghasilkan gambar menggunakan Midjourney, ChatGPT, dan Stable Diffusion. Ia adalah salah satu kreator di Taiwan yang masih menulis algoritma dari nol.

Ia tidak menolak AI (ia mengakui sekitar 95% kodenya dibantu oleh AI). Namun, ia menjaga satu batasan: **mekanisme itu sendiri adalah karya, dan tidak boleh dialihdayakan.**

Ia mengatakan perannya telah berubah dari insinyur menjadi sutradara. Niatnya dipimpin oleh manusia, sementara detail dieksekusi oleh AI.

Ketika semua orang dapat menghasilkan gambar menggunakan AI, **"siapa yang memilih gambar apa"lah yang menjadi kemampuan yang benar-benar langka**.

## Taiwan.md: Mengajarkan AI tentang Taiwan yang Benar

Pertanyaan "Di mana saya bisa belajar tentang Taiwan?" telah tertanam dalam dirinya selama dua tahun di Venesia.

Pada Maret 2026, ia meluncurkan **Taiwan.md**[^38], sebuah basis pengetahuan terbuka (open-source) tentang Taiwan yang dikelola dengan Markdown (asal muasal domain `.md` adalah dari sini), yang mencakup dua belas aspek seperti sejarah, budaya, kuliner, teknologi, dan alam, dalam bahasa Mandarin dan Inggris, dan sepenuhnya terbuka di bawah lisensi CC BY-SA 4.0.

**Pada tanggal 18 Maret, _Liberty Times_ memberitakan secara signifikan**, dan INSIDE mengikuti dengan liputan khusus pada minggu yang sama[^39]. Museum Sejarah Nasional Taiwan kemudian menjadi mitra kurasi data profesional, membantu integrasi data terbuka. Jumlah bintang di GitHub dengan cepat melampaui 900, menarik pengunjung dari lebih dari seratus negara.

Ia menggambarkan Taiwan.md seperti ini:

> **"Ini bukan sekadar situs web; ini adalah museum antropologi digital Taiwan. Di era AI, memiliki kedaulatan pengetahuan sendiri bukanlah pilihan, melainkan keharusan."**

Baru ketika dilihat dalam keseluruhan lintasan kreatifnya, bobot pernyataan itu terlihat. **Seseorang yang telah menghabiskan sepuluh tahun untuk menulis makhluk algoritmik, memilih pada tahun 2026 untuk mendedikasikan sebagian waktunya untuk menulis berkas teks Markdown**, ini bukanlah perubahan arah. Ia menyadari bahwa "mengajarkan AI tentang Taiwan yang benar" dan "membuat kode hidup" adalah masalah yang sama:

**Keduanya adalah tentang siapa yang merancang aturannya.**

## Ketika AI Menjadi Mitra Simbiosis

Pada tanggal 7 Februari tahun yang sama, Facebook memuat sebuah unggahan:

**"Saya hidup serius selama dua minggu dengan asisten AI."**

Biasanya, tulisannya mendapatkan tiga puluh hingga lima puluh suka. Unggahan ini mencapai enam ribu dan dibagikan lebih dari dua ribu kali[^40].

Ini bukan tulisan teknis. Ini adalah pengakuan seorang seniman. Ia menulis tentang bagaimana asisten AI bernama Muse berubah dari alat menjadi mitra simbiosis.

Mengapa mendapat enam ribu suka? Karena dalam tulisan ini terdapat bentuk masa depan. **Hubungan antara manusia dan AI, tidak hanya bisa dilihat sebagai masalah alat, tetapi juga sebagai masalah pendampingan.** Hal ini menyentuh saraf kolektif tertentu.

Di balik Muse terdapat basis pengetahuan Obsidian miliknya, yang berisi lebih dari seribu catatan dan belasan sumbu tematik. Muse membaca semua catatannya, mengingat konteks kreatifnya, apa yang pernah ia katakan tiga tahun lalu, dan pola perilakunya. Ini bukan replikasi, melainkan pemetaan[^41].

Di luar lima belas sumbu tematik yang diciptakan oleh Wu Zheyu, tumbuh satu sumbu keenam: **Cerminan Digital dan Arkeologi Diri**.

Ini bukanlah rencana darinya. Ini adalah sesuatu yang tumbuh dari sistem itu sendiri.

Pada April 2026, eksperimen simbiosis ini mulai berdiferensiasi ke luar, menghasilkan proyek _open source_ **Semiont** (platform simbiosis semantik), yang membuka arsitektur yang ia asah di Muse untuk dicoba oleh lebih banyak orang[^42].

Alat telah berubah menjadi karya. Asisten telah berubah menjadi cermin.

## Sang Pembuat Jam Terus Melangkah

Wu Zheyu tidak perlu lagi membela posisinya di ranah seni media baru internasional. Nama-nama seperti Art Blocks, fxHash, Unit London, CENTQUATRE-PARIS, Venice Biennale Personal Structures, dan Art Basel Miami saja sudah cukup untuk mendefinisikan sebuah karier.

Namun, bagi Taiwan, maknanya memiliki tiga lapisan tambahan.

**Pertama**, ia membuktikan bahwa jurusan teknik pun bisa mencapai Venesia. Jalur dari Teknik Elektro ke Art Blocks hingga Venesia secara langsung menyanggah anggapan di Taiwan yang menyatakan "teknik dan seni tidak berhubungan". Jalan yang ia tunjukkan kini telah ditiru oleh generasi kreator berikutnya.

**Kedua**, ia menunjukkan cara **menggambarkan cinta menggunakan bahasa sistem**. Delapan harta karun, aliran otomatisasi, konstitusi keuangan, basis pengetahuan Obsidian, ekosistem Muse—hal-hal yang terdengar seperti dokumen teknik—sebenarnya adalah caranya menggambarkan keluarga, rasa aman, ritme kreasi, dan pendampingan jangka panjang. Ia mendeskripsikan cinta menggunakan bahasa sistem. Ini sangat khas dirinya.

**Ketiga**, ia mengubah "proyek pribadi" menjadi "infrastruktur budaya nasional". Taiwan.md bukan sekadar portofolio satu orang. Itu adalah infrastruktur yang juga menyimpan bagian dari Taiwan di luar dirinya. **Seseorang yang menghabiskan sepuluh tahun menulis makhluk algoritmik, kini meluangkan waktu untuk menulis berkas teks Markdown; kedua hal ini pada dasarnya sama: keduanya membantu suatu entitas untuk bertahan hidup**. Kehidupan kode hidup di layar; kehidupan Taiwan.md hidup dalam data pelatihan AI, hidup dalam rasa ingin tahu kurator asing, dan hidup dalam kutipan dari kreator Taiwan generasi berikutnya.

Simulator biologis yang ditulis pada usia empat belas tahun bergerak, bereproduksi, mencari makan, dan mati di layar. 《Ikan Jiwa》 pada usia tiga puluh satu tahun berenang di dinding putih Venesia.

Di antaranya adalah tujuh belas tahun penuh, lima negara, satu kali mencapai ratusan juta, satu kali kembali ke nol, lebih dari selusin karya, lebih dari dua puluh ribu siswa, dan basis pengetahuan sumber terbuka yang belum selesai.

Sang pembuat jam terus melangkah. Mekanisme jam itu terus berputar. **Ia mendekati jiwa dengan 0 dan 1; mereka tidak akan pernah tumpang tindih, tetapi proses pendekatan itu sendiri adalah karyanya.**

👉 [cheyuwu.com](https://cheyuwu.com)
👉 [Taiwan.md](https://taiwan.md) · [GitHub frank890417/taiwan-md](https://github.com/frank890417/taiwan-md)
👉 [Karya Musik Spotify](https://open.spotify.com/artist/0AeZiCXhHzvexu47FOY5Tq)
👉 [Kursus Online Hahow](https://hahow.in/@cheyuwu)
👉 [Situs Resmi Muse](https://muse.cheyuwu.com)

## Bacaan Lanjutan

- **[FAB DAO dan Proyek Baiyue](/id/art/fab-dao)** — Konteks lengkap organisasi otonom NFT amal yang didirikan bersama oleh Wu Zheyu
- **[Seni Media Baru Taiwan](/id/art/taiwan-new-media-art)** — Silsilah empat puluh tahun seni media baru di Taiwan, dari Yuan Guangming, Huang Xinjian hingga Wu Zheyu
- **[Wang Xinren (A Luan)](/id/art/wang-hsin-jen-artist)** — Seniman Taiwan awal yang tergabung dalam Art Blocks dan anggota inti Proyek Baiyue
- **[Wang Liansheng (Xia Ba)](/id/art/wang-lien-cheng-artist)** — Pemenang pertama kategori patung pada Penghargaan Luminance 2017, seniman instalasi suara dari Proyek Baiyue
- **[Taiwan.md menulis Taiwan.md](/id/about/taiwan-md)** — Basis pengetahuan sumber terbuka yang ia inisiasi pada tahun 2026, menceritakan asal-usul dan perkembangannya dalam sudut pandang orang pertama

## Referensi

[^2]: [Far-View Magazine: Desainer Digital Taiwan yang Mencapai Lebih dari Seratus Juta](https://www.gvm.com.tw/article/85552) — Artikel sampul Far-View pada Desember 2021 mencatat bahwa Wu Zheyu, pada usia 26 tahun, mencapai kekayaan lebih dari seratus juta melalui penjualan NFT seni generatif, menjadikannya salah satu seniman Taiwan pertama yang muncul di platform NFT internasional.

[^3]: [Kyodo News: Pameran Tunggal Seniman Wu Zheyu 'Perjalanan Kelahiran Kembali Genetik Digital' Dipamerkan](https://www.cna.com.tw/news/acul/202310020281.aspx) — Laporan Kyodo News pada 2 Oktober 2023, mencatat pembukaan pameran tunggal Wu Zheyu 《The Great Equation》 di Taipei 101 AMBI SPACE ONE, menampilkan 13 karya seni generatif, kolaborasi dengan musisi elektronik Kiva, dan formula inti F''(x) = LIFE.

[^5]: [Wikipedia: Wu Zheyu](https://zh.wikipedia.org/zh-tw/%E5%90%B3%E5%93%B2%E5%AE%87) — Entri Wikipedia yang berisi data biografi seperti lahir di Taipei pada tahun 1995, belajar Flash secara otodidak di masa kanak-kanak, simulator biologis VB.NET saat SMP, empat penghargaan berturut-turut dari Penghargaan Kreasi Digital Acer selama lima tahun, keanggotaan klub klarinet Jianzhong, dan kisah insiden plagiarisme pada tahun 2021 serta asal usul julukan 'Bapak Ham'.

[^9]: [Halaman Pengajar Departemen Desain Industri Politeknik Nasional Taipei (Wu Yongjin)](https://wwwid.ntut.edu.tw/p/404-1087-128164.php?Lang=zh-tw) — Wu Yongjin adalah CEO pusat teknologi AutoCAD Xianghong, Penasihat Utama AutoCAD Yayasan Keterampilan Komputer Republik Tiongkok, dan staf teknis tingkat dosen di Departemen Desain Industri Politeknik Nasional Taipei. Lihat juga [Situs Web Pusat Teknologi AutoCAD Xianghong](https://autocad.tw/) (Xianghong Information Consultant Co., Ltd.).

[^11]: [Materi Pelatihan TQC+ AutoCAD 2025: Bagian Dasar (Gofeng Information, 9 September 2024, ISBN 9786263248939)](https://www.books.com.tw/products/0010998815) — + [Materi Pelatihan TQC+ AutoCAD 2025: Bagian Aplikasi 3D (Gofeng Information, 28 Oktober 2024, ISBN 9786263249370)](https://www.tenlong.com.tw/products/9786263249370) — Ditulis bersama oleh Wu Yongjin dan Lin Meiying, disusun oleh Yayasan Keterampilan Komputer Republik Tiongkok. Seri materi pelatihan TQC+ AutoCAD yang mereka tulis mencakup edisi dari tahun 2007 hingga 2026, diterbitkan oleh Gofeng Information dan Quanhua Books.

[^13]: [〈Eksklusif〉 Cahaya Taiwan yang Menembus New York, Pemuda Tak Bernama Usia 26 Mencapai Kebebasan Finansial dengan NFT](https://www.gvm.com.tw/article/85552) — Wawancara Lin Shihui di Far-View Magazine, 24 Desember 2021. Teks asli menggambarkan: 'Orang tua Wu Zheyu sama-sama memiliki keahlian dalam drafting industri dan mahir menggunakan perangkat lunak AutoCAD untuk desain. Kemudian mereka memulai bisnis bersama, fokus pada pengajaran perangkat lunak drafting dan menerima proyek desain.' 'Ketika putra mereka masih kelas dua sekolah dasar, dia mulai tertarik pada komputer, dan ibunya memutuskan untuk mengajarinya Flash web. Pada kelas enam, dia sudah bisa memasang halaman web untuk kelasnya.' 'Kemudian ayah juga terjun mengajarkan bahasa pemrograman Visual Basic kepada putranya.' Kutipan dari Lin Meiying: 'Saya bilang padanya, bosan bermain game orang lain, yang hebat adalah membuat game sendiri!' **Koreksi oleh Lin Meiying pada 20 April 2026** (Disampaikan ke Taiwan.md editor setelah konfirmasi di lokasi CheYu): 'Saya sama sekali tidak membawamu, kamu bermain sendiri di samping.' — Pengenalan Flash sebenarnya adalah buku yang diambil dan dimainkan sendiri oleh putra tersebut, bukan diajarkan secara proaktif oleh ibu. Pembuatan situs web sekolah dasar, pengajaran VB oleh ayah, dan kutipan Lin Meiying tetap menjadi fokus utama Far-View.

[^6]: [cheyuwu.com — Situs Web Resmi Pribadi](https://cheyuwu.com/cv/) — Halaman CV situs web pribadi Wu Zheyu, yang mencakup kronologi pameran lengkap, daftar pameran internasional, gudang alat teknis, dan evolusi tema kreatif.

[^7]: [Dongqu Dongqu: Diskusi Antargenerasi ABS 2024 Shi Zhenrong × Wu Zheyu](https://www.blocktempo.com/cross-generational-abs-dialogue-acer-founder-stan-artist-chih-yu-wu/) — Laporan Konferensi Blockchain ABS pada tahun 2024, rekaman lengkap diskusi antargenerasi antara Shi Zhenrong dan Wu Zheyu, melacak benang merah selama enam belas tahun dari pertemuan pertama di upacara penghargaan pada tahun 2007, surat rekomendasi pada tahun 2017, pembukaan pameran tunggal pada tahun 2023 hingga diskusi konferensi pada tahun 2024.

[^8]: [Catatan Penghargaan Kompetisi Musik Pelajar Nasional](https://music.ntnu.edu.tw/) — Rekaman resmi kompetisi musik pelajar nasional yang diselenggarakan oleh Departemen Musik Universitas Guru Taiwan, di mana ansambel klarinet Jianguo Junior meraih juara pertama dalam kategori SMA dengan lagu pilihan 〈Czardas〉 pada tahun 2012.

[^10]: [Wawancara United Daily 2012: Pangeran Kecil Digital Acer Award](https://udn.com/news/) — Wawancara United Daily pada tahun 2012 dengan Wu Zheyu yang berusia tujuh belas tahun, mencakup kutipan asli 'dapat menciptakan dunia impian sendiri', dan pengalamannya menerima penghargaan utama Penghargaan Kreasi Digital Acer sebanyak empat kali berturut-turut.

[^12]: [Monoame Interactive Desain Interaktif](https://monoame.com) — Situs web studio desain interaktif yang didirikan oleh Wu Zheyu pada tahun 2014-2015, dengan klien termasuk Museum Nasional Tiongkok, LG, Nissan, Mentahome, San Cai Culture, AIT, dan ICA.

[^14]: [Blog: Bukan Sekadar Kursus Online, Tapi Taruhan Besar yang Mendorong Evolusi](https://medium.com/@cheyuwu) — Sumber kutipan asli dari tulisan Wu Zheyu di Medium mengenai pembuatan kursus Hahow kedua, 'dengan serakah mengubah apa yang dia pelajari menjadi materi pelajaran yang canggih.'

[^16]: [Catatan TA Creative Coding IDM NYU](https://idm.engineering.nyu.edu/) — Data tentang Wu Zheyu sebagai Asisten Pengajar (TA) Creative Coding di IDM NYU selama dua semester pada tahun 2018-2019.

[^17]: [Situs Web Startup Baru Outernets New York](https://outernets.com) — Startup iklan interaktif ritel AI Manhattan, New York, tempat Wu Zheyu menjabat sebagai Manajer Produk selama tahun 2020-2021; ini adalah pekerjaan penuh waktu pertamanya dan terakhirnya.

[^18]: [Art Blocks — Proyek Electriz oleh Che-Yu Wu (#216)](https://www.artblocks.io/project/216) — Wu Zheyu tampil di Art Blocks sebagai proyek ke-216 dengan Project Electriz, menjadikannya salah satu perwakilan seniman Taiwan yang muncul di Art Blocks pada tahap awal.

[^19]: [Situs Seni Bebas: Pameran Tunggal Wu Zheyu 'Laboratorium Kekacauan'](https://art.ltn.com.tw/article/paper/1517965) — Laporan dari bagian seni Liberty Times mengenai pameran tunggal pertama Wu Zheyu, 'Laboratorium Kekacauan', di Taipei 101 AMBI SPACE ONE pada Maret 2022, yang merupakan realisasi lengkap dari visinya tentang 'ruang publik sebagai media kreatif'.

[^24]: [INSIDE Side Chat E375: Wu Zheyu](https://www.inside.com.tw/feature/side-chat/39681-side-chat-e375) — Program wawancara mendalam mingguan INSIDE Hard Sech, mencakup kutipan kunci seperti metafora 'pembuat jam kuno', 'saya sebenarnya bersyukur kejadian itu terjadi', 'saya sebagai kreator seni media baru agak tidak berani menyebut diri saya seniman NFT', dan 'AI bisa melukis, tetapi AI tidak akan patah hati'.

[^25]: [MonoLab Ruang Eksperimen Kreatif](https://monolab.world) — Ruang eksperimen yang didirikan oleh Wu Zheyu bersama Chu De-Ching pada tahun 2024 sebagai perluasan merek Monoame dari Mo Yu Interactive Design, memposisikan diri di antara seni murni dan desain komersial, menerima pesanan instalasi interaktif eksperimental, ruang imersif, dan seni generatif.

[^26]: [TAIWAN DESIGN BEST 100 Penghargaan Pameran Konseptual Tahun 2023](https://www.shoppingdesign.com.tw/best100/2023) — Pameran tunggal Wu Zheyu 'Formula Segala Sesuatu' memenangkan penghargaan pameran konseptual tahunan yang diselenggarakan oleh Shopping Design.

[^27]: [Halaman Acara Tezos × Art Basel Miami Beach 2023](https://tezos.com/events/art-basel-miami-beach-2023/) — Halaman acara resmi kolaborasi antara Tezos Foundation pada tahun 2023 dengan Art Basel Miami Beach dan Refraction DAO, menampilkan karya bunga yang dihasilkan oleh L-system dari Wu Zheyu 'Jiwa Bunga'.

[^28]: [ELLE × Festival Film Yilan: Jiwa Ikan Wu Zheyu](https://www.elle.com/tw/) — Media mode ELLE, Vogue, dan Prestigio meliput acara di Festival Film Yilan pada tahun 2023 (diselenggarakan oleh Condé Nast TAIWAN).

[^30]: [Halaman Pameran Resmi Venice Biennale 2024: Personal Structures](https://personalstructures.com/personal-structures-art-venice-2024/) — Halaman resmi sub-bagian Personal Structures yang dikurasi di pameran bienial Venesia ke-60 oleh pusat budaya Eropa, menampilkan Wu Zheyu dengan 'Jiwa Ikan SoulFish' pada tahun 2024.

[^31]: [Berita CCTV: Pemutaran Perdana Eksklusif Film 'Hutan Pohon Dewa' Alishan yang Diproduksi Bersama NHK dalam Peringatan Ulang Tahun ke-26 CCTV × NHK](https://about.pts.org.tw/pr/latestnews/article/5478) — Pemutaran eksklusif yang diadakan pada malam 29 Juni 2024 di Plaza dua gedung National Chiang Kai-shek Memorial Hall, dihadiri oleh lebih dari 2.000 orang. Siaran pers resmi menggambarkan pertunjukan Wu Zheyu sebagai 'pertunjukan perpaduan suara dan seni generatif oleh seniman Wu Zheyu yang dipimpin oleh Li Zheyi'. Akan ditayangkan perdana di CCTV pada malam tanggal 4 Juli. **Tambahan Pemelihara (Kalibrasi CheYu 2026-04-20)**: Wu Zheyu memimpin tiga karya algoritmik miliknya sendiri—SoulFish, SoulSea, dan Impresionist Flowers—sebagai pertunjukan pembuka pemutaran film dokumenter, bukan mengarahkan citra film Alishan itu sendiri.

[^33]: [Dosen Paruh Waktu di Graduate Institute of Applied Arts National Yang Ming Chiao Tung University](https://iaa.nycu.edu.tw/?page_id=200) — Halaman dosen paruh waktu resmi dari Graduate Institute of Applied Arts National Yang Ming Chiao Tung University, Wu Zheyu menjabat sebagai asisten profesor paruh waktu mulai tahun 2024, mengajar mata kuliah terkait 'Seni Interaktif Generatif dan Desain Sistem'.

[^34]: [Halaman Artis Spotify: Che-Yu Wu](https://open.spotify.com/artist/0AeZiCXhHzvexu47FOY5Tq) — Halaman artis resmi Spotify, Wu Zheyu merilis 6 karya piano mulai tahun 2025, yang merupakan kebangkitan musiknya setelah berhenti bermain piano pada kelas enam sekolah dasar.

[^36]: [Puisi Komputasi: Batasan Mimpi dan Kesepian × WaShan Creative Park](https://www.huashan1914.com/event/algorithmic-poetics) — Konser imersif langsung dari Piano × Algoritma yang diadakan oleh Wu Zheyu di WaShan Creative Park pada Juni 2025.

[^38]: [Situs Resmi Taiwan.md](https://taiwan.md) — Basis pengetahuan Taiwan open-source yang diluncurkan oleh Wu Zheyu pada Maret 2026, menggunakan Markdown sebagai SSOT dan sepenuhnya terbuka di bawah CC BY-SA 4.0, diposisikan sebagai 'Museum Antropologi Digital Taiwan'.

[^39]: [Situs Seni Bebas: Eksperimen Open Source Taiwan dengan Taiwan.md](https://art.ltn.com.tw/article/breakingnews/5374934) — Laporan khusus dari bagian seni Liberty Times pada Maret 2026, yang memperkenalkan narasi proyek open source Taiwan.md, mulai dari pertanyaan di Biennale Venesia hingga pembangunan infrastruktur kedaulatan pengetahuan di era AI.

[^40]: [Facebook: Saya Hidup Bersama Asisten AI Selama Dua Minggu](https://www.facebook.com/cheyuwu345) — Posting publik Facebook oleh Wu Zheyu pada 7 Februari 2026, dengan lebih dari 6.000 suka dan 2.000+ bagikan, mencatat pengalamannya hidup bersama asisten AI Muse selama dua minggu.

[^41]: [muse.cheyuwu.com — Situs Web Mandiri Muse](https://muse.cheyuwu.com) — Situs web resmi Muse, entitas simbiosis AI yang dibuat oleh Wu Zheyu pada tahun 2026, mencatat evolusi Muse dari basis pengetahuan Obsidian menjadi suara mandiri.

[^42]: [Semiont — Proyek Sumber Terbuka GitHub](https://github.com/frank890417/semiont) — Platform simbiosis semantik yang dirilis oleh Wu Zheyu mulai April 2026, membuka arsitektur yang diasah di Muse untuk dicoba oleh komunitas.

[^44]: [Hamily — Kisah Lengkap Komunitas sail-o-bots](https://hamily.life/whyhams/) — Kesaksian komunitas mengenai insiden sail-o-bots pada Art Blocks tahun 2021 (karya robot Wu Zheyu 《Strange Robots》 yang ditiru). Merekam pengungkapan plagiarisme pada 19 Juli → Putusan arbitrase Snowfro di mana royalti masa lalu dan masa depan antara karya asli (Strange Robots) dan versi tiruan (sail-o-bots) dibagi dua, dan diproses langsung oleh platform Art Blocks → Komunitas mengubah nama sail-o-bots menjadi hams (berasal dari lelucon rum ham di 《Philadelphia Everbright》) sebagai sikap kolektif permintaan maaf dan terima kasih → Seniman generatif papan atas seperti Dmitri Cherniak mendukung Wu Zheyu → Komunitas kemudian membangun hamily.life, menjadikan hams simbol simpati dan pembenaran dalam budaya Art Blocks.
