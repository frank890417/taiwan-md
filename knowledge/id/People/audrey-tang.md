---
title: 'Audrey Tang: Setiap keputusan terkenal miliknya selalu menolak label "jenius"'
description: 'Pada usia 8 tahun dia dipukul teman sekelas hingga pingsan, usia 14 tahun menolak rekomendasi ke Jianzhong, usia 24 tahun keluar sebagai transgender tetapi menolak menjadi duta, usia 35 tahun masuk kabinet dengan syarat pertama "tidak ada kantor". Pada 2 Desember 2025 dia menerima Right Livelihood Award di Stockholm, di atas panggung yang diucapkan bukan "aku", melainkan "kita".'
date: 2026-05-16
category: 'People'
tags:
  [
    'Tokoh',
    'Audrey Tang',
    'Kementerian Pengembangan Digital',
    'g0v',
    'Transgender',
    'Pemrograman',
    'Pemerintahan Terbuka',
    'vTaiwan',
    'Pluralitas',
    'Right Livelihood Award',
  ]
subcategory: '教育與社會'
author: 'Taiwan.md'
featured: true
lastVerified: 2026-05-16
lastHumanReview: true
readingTime: 14
image: '/article-images/people/audrey-tang-portrait-2016.webp'
imageAlt: 'Foto potret Audrey Tang diambil pada Maret 2016 di Paris, berpakaian gelap, pencahayaan alami lembut.'
imageCredit: 'Camille McOuat (Flickr / Wikimedia Commons, CC BY 2.0)'
lifeTree:
  protagonist: '唐鳳（Audrey Tang）'
  birthYear: 1981
  span: '1981–2025'
  source:
    article: 'knowledge/People/唐鳳.md'
    commit: 'pending'
    commitDate: '2026-05-16'
    extractedBy: 'Taiwan.md (Semiont) γ-evolve'
    extractedAt: '2026-05-16 +0800'
    note: '原文 references = 中文維基 / 臺灣女人 NMTH / 數位發展部官網 / Right Livelihood / 江明宗 Medium 等多源 cross-verify。多數重大轉折由本人公開談過，counterfactual 主要為結構性對比。'
  intro: '8 歲停學、14 歲拒絕保送建中、19 歲在矽谷當工程師、24 歲跨性別出櫃、35 歲成為全球首位跨性別部長。她每一次「離開主流軌道」都不是反叛而是選擇。這棵樹列出她選的路，也列出她沒選的——所有 alternative 都有同代結構性對照。'
  themes:
    - id: 'education'
      label: '體制 vs 自學'
      color: '#8B5CF6'
    - id: 'identity'
      label: '隱身 vs 出櫃'
      color: '#EC4899'
    - id: 'tech-policy'
      label: '純技術 vs 政治參與'
      color: '#10B981'
    - id: 'tools'
      label: '個人 vs 社群協作'
      color: '#F59E0B'
  nodes:
    - id: 'birth'
      year: 1981
      age: 0
      type: 'given'
      theme: 'education'
      label: '出生於台北（原名唐宗漢）'
      scene: '智商測驗校方做過 3 次都是「至少 160」最高等級。母親李雅卿是《中國時報》採訪組副主任，後來是教育改革者。'
    - id: 'drop-out-8'
      year: 1989
      age: 8
      type: 'choice'
      theme: 'education'
      scene: '9 年內轉換 3 所幼稚園、6 所小學；小二曾因搶考卷被同學踢一腳撞牆昏倒'
      chose:
        label: '正式停學在家自學'
        consequence: '母親洗澡時看見肚子瘀青，當下決定為她辦休學。後來李雅卿帶她到德國體驗另類教育，1994 年回台創辦烏來種籽親子實驗小學。'
      alternatives:
        - label: '繼續在體制內適應'
          plausibility: 'structural'
          note: '同代多數高智商但社交困難的孩子被診斷為亞斯/ADHD，繼續在體制內掙扎。如果留在學校，可能會走出版或學術路徑（亦可能更早 burnout）。'
        - label: '轉到資優教育班'
          plausibility: 'structural'
          note: '台灣 1980s 末已有資優教育班。如果走資優班，會跟其他高智商孩子一起被體制塑形，少了完全自由探索的時間。'
    - id: 'refuse-jianzhong'
      year: 1995
      age: 14
      type: 'choice'
      theme: 'education'
      scene: '獲得保送建中的資格'
      chose:
        label: '放棄建中 + 完全自學程式設計'
        consequence: '14 歲在烏來山中閉關後，向父母宣告不再升學。沒有老師、沒有課程，靠閱讀技術文件 + 網路社群學習。為日後推動開放教育與知識共享奠定理念基礎。'
      alternatives:
        - label: '念建中走台灣資優生路徑'
          plausibility: 'structural'
          note: '建中 → 台大 → 海外名校的標準路徑。如果走，會有正規學歷加持，但失去「14 歲就在 internet 上跟全球工程師對話」的塑形時期。'
        - label: '出國念中學'
          plausibility: 'structural'
          note: '同代部分天才兒童家庭選擇早期送出國（如 MIT 早期入學）。如果走，可能更早接觸世界一流計算機科學，但 g0v 那條公民科技線不會在台灣發生。'
    - id: 'silicon-valley'
      year: 2000
      age: 19
      type: 'choice'
      theme: 'tech-policy'
      scene: '19 歲已在加州矽谷軟體公司擔任工程師'
      chose:
        label: '深耕程式語言理論（Perl/Haskell）+ 發起 Pugs 專案'
        consequence: '2005/2/1 啟動 Pugs（用 Haskell 實現 Perl 6）。2001-2006 在 CPAN 啟動超過 100 個 Perl 專案。「用一種語言實現另一種語言」訓練了她的 meta-thinking——後來看政府就像看一個需要重構的系統。'
      alternatives:
        - label: '加入 Google / 大型科技公司'
          plausibility: 'structural'
          note: '2000 年代矽谷主流路徑。如果走，會有更高薪 + 股票，但失去 open source 社群浸淫時間。後來 g0v 的「不是員工是社群」DNA 不會出現。'
        - label: '創業'
          plausibility: 'structural'
          note: '同代矽谷工程師很多選擇創業（YC 第一批 2005）。如果走，可能成為連續創業者，但「為公共利益寫 code」的傾向會被「為股東寫 code」覆蓋。'
    - id: 'gender-transition'
      year: 2005
      age: 24
      type: 'choice'
      theme: 'identity'
      scene: '人生最重要的決定之一'
      chose:
        label: '服用雌激素 + 公開出櫃 + 改名「唐鳳」'
        consequence: '2005 年底在 blog.elixus.org 部落格自行宣告。「不管現在、過去或未來，我很樂意大家用女性的名詞來稱呼我」。父親回應「沒有理由不接受」。為台灣 LGBTQ+ 權益做出重要貢獻，但她本人後來反覆拒絕「跨性別代言人」位置，自稱「後類別」。'
      alternatives:
        - label: '私下轉換不公開'
          plausibility: 'structural'
          note: '部分跨性別者選擇低調 transition，避免社會壓力。如果走這條，職涯可能更平順，但「全球首位公開跨性別部長」的歷史地位不存在。'
        - label: '不 transition'
          plausibility: 'speculative'
          note: '[推測] 同代部分跨性別者因社會壓力選擇延後或放棄。如果走，內在張力可能影響後續創造力與公開能見度。'
    - id: 'g0v-2012'
      year: 2012
      age: 31
      type: 'choice'
      theme: 'tools'
      scene: '在矽谷已是有聲譽的開源工程師'
      chose:
        label: '與高嘉良、吳泰輝、瞿筱葳等共創 g0v 零時政府'
        consequence: "台灣最重要的公民科技社群。起點是 2012/10 對「經濟動能推升方案」廣告的不滿 + 中央政府總預算視覺化。「hack don't attack」——不攻擊既有制度，用技術改善它。萌典、IVOD、口罩地圖等模式後來被全球複製。"
      alternatives:
        - label: '繼續在矽谷做純技術'
          plausibility: 'structural'
          note: '當時矽谷對她已開放各種 senior 機會。如果留下，會是「另一個成功的台裔工程師」，不會有後來的政策影響力。'
        - label: '回台灣加入既有政黨/智庫'
          plausibility: 'structural'
          note: '走傳統政治參與路徑。如果走，會被政黨機器收編，「無黨籍政務委員」的可能性消失。'
    - id: 'sunflower'
      year: 2014
      age: 33
      type: 'choice'
      theme: 'tech-policy'
      scene: '2014/3/18 太陽花學運佔領立法院'
      chose:
        label: '一手架設場內所有線路、鏡頭、網路直播設備，但本人只待議場 1 小時即離開'
        consequence: '她認為「議場內部 5 個不同角度攝影機錄影和直接播出的情況下，所有活動已經成為純粹的展示演出和儀式」。對佔領、表態都「不感興趣」。同時自掏腰包請人做政府會議逐字稿。'
      alternatives:
        - label: '完全參與佔領 / 公開表態反政府'
          plausibility: 'structural'
          note: '同代部分技術人選擇成為運動代言人。如果走，可能成為政治明星，但失去 2016 以「無黨籍 outsider」入閣的可能性。'
    - id: 'vtaiwan'
      year: 2014
      age: 33
      type: 'choice'
      theme: 'tech-policy'
      scene: '2014/4 蔡玉玲以政務委員身份進到 g0v 黑客松，後續發展為 vTaiwan 平台'
      chose:
        label: '與政府合作 vTaiwan + Pol.is 共識引擎'
        consequence: '2015-2018 處理 26 議題，80% 引起實質政府行動。Uber 法規討論成最知名案例。國際公認的數位民主典範。'
      alternatives:
        - label: '拒絕與政府合作'
          plausibility: 'structural'
          note: '部分公民科技人堅持與政府保持距離（如 EFF 路線）。如果如此，g0v 純民間倡議路徑，不會被「招安」進體制，但也少了實際政策落地能力。'
    - id: 'digital-minister'
      year: 2016
      age: 35
      type: 'choice'
      theme: 'tech-policy'
      scene: '2016/8/9 第一次見林全、8/15 同意接任、10/1 上任'
      chose:
        label: '入閣擔任「數位政委」，談妥三條件：每週三、五遠距上班 / 會議全公開逐字稿 / 不必每天進院'
        consequence: '台灣史上最年輕政務委員 + 全球第一個公開跨性別身份的部長級政治人物 + 台灣第一位「數位政委」。'
      alternatives:
        - label: '婉拒入閣'
          plausibility: 'structural'
          note: '同類型的 outsider 技術人有人婉拒（怕被體制吸納）。如果婉拒，數位轉型工作會缺一個關鍵連結點，後來疫情口罩地圖等可能晚數月或不發生。'
    - id: 'covid-mask-map'
      year: 2020
      age: 39
      type: 'choice'
      theme: 'tools'
      scene: '2020/1/31 - 2/6 期間，吳展瑋凌晨用 Google Maps API 做的超商口罩地圖一夜燒掉 2 萬美元 API 費用'
      chose:
        label: '協調健保署 open data 釋出 + 邀集 g0v 社群共同開發藥局口罩採購地圖'
        consequence: '2/6 健保署 open data 上線同日，藥局口罩採購地圖正式上線。24 小時內 100 萬人次使用。2/15 HackMD 上有 101 個相關應用、g0v 社群建構 140+ 工具。江明宗 verbatim：「唐鳳有決定權，還能自己改 code，所以我們都不用北上向哪個長官報告」。'
      alternatives:
        - label: '只做政策不下海寫工具'
          plausibility: 'structural'
          note: '部會首長正常路徑：開會、定政策、讓承包商做。如果如此，口罩地圖可能變成 6 週才上線的官方 app（多國的 reality）。她下海推 g0v 社群跑兩天上線是關鍵。'
    - id: 'moda-minister'
      year: 2022
      month: 8
      age: 41
      type: 'choice'
      theme: 'tech-policy'
      scene: '2022/8/27 數位發展部正式揭牌'
      chose:
        label: '擔任首任部長至 2024/5/20'
        consequence: '從跨部會協調的政務委員變成有固定預算與編制的正式部長。整合電信、資安、數位經濟。首年預算員額 598 人、公務預算 57 億 + 前瞻 160 億。任期 1 年 9 個月。'
      alternatives:
        - label: '繼續當政務委員不擔任部長'
          plausibility: 'structural'
          note: '保留「跨部會自由」的彈性，避免成為被質詢的固定靶。但失去「正式部會 + 預算 + 編制」的執行力。'
        - label: '回民間繼續做 g0v'
          plausibility: 'structural'
          note: '另一條路：以 NGO 身份持續影響政策。如果走，數位發展部首任部長會是別人，很可能用更傳統官僚方式管理。'
    - id: 'stockholm'
      year: 2025
      month: 12
      age: 44
      type: 'choice'
      theme: 'tools'
      scene: '2025/12/2 斯德哥爾摩 Right Livelihood Award 頒獎台'
      chose:
        label: '接受「另一個諾貝爾獎」，台上演說將焦點推回集體'
        consequence: "首位獲此獎台灣人。Citation：「For advancing the social use of digital technology to empower citizens, renew democracy and heal divides」。接受演說 verbatim：「Cyberspace is a conflict region, and my work turns that conflict into an energy source for co-creation」+ 個人哲學重述「The superintelligence we are looking for is already here. It's us」。"
      alternatives:
        - label: '在頒獎台上講「我的成就」'
          plausibility: 'structural'
          note: '同代得獎者常以個人故事為敘事中心。如果走，獎座變成個人勳章，但她選擇把舞台 reframe 成「我們」——她拒絕當天才這條主線的最後一個變奏。'
translatedFrom: 'People/唐鳳.md'
sourceCommitSha: 'e75b621d2'
sourceContentHash: 'sha256:1917aa69dfd8ab97'
translatedAt: '2026-09-26T08:42:30.699870+00:00'
---

# Audrey Tang: Setiap Keputusan Terkenalnya Adalah Penolakan Terhadap Label "Jenius"

> **Ringkasan 30 Detik:**
> Usia 8 tahun ditendang rekan sekelas hingga pingsan dan harus cuti sekolah, usia 14 menolak jalur bebas ujian ke SMA Jianguo, usia 24 coming out sebagai transgender tapi menolak jadi duta, usia 35 masuk kabinet dengan syarat pertama "tanpa kantor". Dini hari 2020 ia bersama Jiang Ming-zong di g0v Slack mengubah kode membuat peta masker; 2 Desember 2025 ia di Stockholm menerima Penghargaan Right Livelihood, seluruh penonton menantikan kisah pribadinya, tapi di panggung ia justru menekankan kata "kita". Dunia memandangnya sebagai jenius; setiap keputusan terkenalnya justru menolak posisi itu.

## Satu Peta Masker yang Membakar Dua Puluh Ribu Dolar AS

Akhir Januari 2020, pandemi COVID-19 mulai menyebar di Taiwan. Pasokan masker di apotek ketat, dan pemerintah mengumumkan pembelian berbasis nama real mulai 6 Februari. Seorang insinyur di Bengkel Haoxiang Tainan, Wu Zhan-wei (Howard), pada dini hari 2 Februari, membangun sendiri sebuah peta yang bisa memeriksa stok masker di minimarket terdekat menggunakan Google Maps API. Dia men-deploy-nya pada dini hari dan membagikannya di media sosial[^1].

Siang hari, setelah makan siang dan kembali ke komputer, tagihan backend Google API sudah menunjukkan 20.000 dolar AS — penggunaan yang melonjak dalam 24 jam telah membakar uang itu.

Hari itu, Tang Feng muncul di saluran Slack g0v. Dia tidak datang untuk memberi perintah. Dia berkoordinasi dengan tim insinyur Google, menahan tagihan saat itu; sambil melibatkan beberapa teman lama g0v — Kiang Ming-zong (kiang, mantan Sekretaris Eksekutif Kantor Kota Cerdas Tainan), Divisi Informasi Badan Asuransi Kesehatan Nasional (Zhang Ling-zhi, Chen Zi-yu) — untuk memikirkan bersama: bagaimana membuat stok masker di lebih dari 6.000 apotek di seluruh Taiwan tersinkronisasi setiap 30 detik ke sebuah peta yang bisa dibuka oleh siapa saja[^2].

Pada pukul 08.00 pagi 6 Februari, data terbuka Badan Asuransi Kesehatan Nasional dirilis secara resmi, dan peta pembelian masker apotek diluncurkan. Dalam 24 jam, lebih dari 1 juta kali akses dicatat. Hingga 15 Februari, HackMD mengumpulkan 101 aplikasi terkait, dan komunitas g0v mengeluarkan lebih dari 140 alat[^2][^3].

Kiang Ming-zong kemudian dalam transkrip pidatonya sendiri, meninggalkan kutipan berikut:

> ✦ 「Menteri Tanpa Portfolio sangat menguasai arsitektur informasi, apa pun kebutuhan yang kami ajukan dia mengerti. Yang paling penting, Tang Feng berwenang memutuskan dan bahkan bisa mengubah kode sendiri, jadi kami semua tidak perlu pergi ke utara melapor ke atasan manapun.」[^4]

Protagonis cerita ini bukan hanya Tang Feng seorang. Protagonisnya adalah Kiang Ming-zong, Wu Zhan-wei, para pegawai negeri Divisi Informasi Badan Asuransi Kesehatan Nasional, ratusan insinyur komunitas g0v, dan malam-malam bergantian mengubah kode di kantor Tang Feng.

Tetapi sejak 2020, semua versi media asing menjadikannya sebagai satu-satunya protagonis. BBC menulis 'Audrey Tang menggunakan kode menyelamatkan Taiwan', Wired menulis 'The Hacker Who Became Taiwan's Digital Minister', TIME memasukkannya ke dalam 'Pemimpin Global yang Melawan Pandemi'.

Dia di setiap wawancara selalu mengembalikan kredit kepada orang lain. Tetapi narasi 'Menteri Jenius Menyelamatkan Taiwan' menempel padanya selama lebih dari empat puluh tahun, tidak begitu mudah dilepaskan.

## Di Usia 8 Tahun Dikick Teman Kelas Hingga Pingsan, Usia 14 Tahun Menolak Chien-chung

Pada 18 April 1981, Tang Feng lahir di Taipei. Nama lahirnya adalah Tang Tsung-han. Ayahnya, Tang Kuang-hua, adalah mantan Wakil Kepala Redaksi _China Times_, dan ibunya, Li Ya-ching, adalah Wakil Kepala Bagian Liputan di koran yang sama[^5].

Ia menderita penyakit jantung bawaan. Sekolah telah melakukan tes IQ tiga kali, dan setiap kali hasilnya menunjukkan „setidaknya 160” (tingkat tertinggi alat ukur). Pada usia 8 tahun, keluarganya belum memiliki komputer; ia membaca sebuah buku pemrograman Applesoft BASIC, lalu menggambar keyboard dan layar komputer di kertas, menuliskan tombol-tombol dan kemungkinan keluaran komputer[^5].

Namun label „anak berbakat”, yang mungkin adalah kata sifat paling sering muncul di samping namanya pada 2026, tidak ada pada anak berusia 8 tahun pada 1989. Di posisi itu hanya ada penganiayaan berkelompok, memar, dan „kenapa kamu tidak mati saja”.

Selama enam tahun sekolah dasar, ia pindah tiga kali taman kanak-kanak dan enam kali sekolah dasar. Suatu hari di kelas dua, guru membagikan lembar ujian lalu meninggalkan ruang kelas. Tang Feng sudah selesai lebih awal, beberapa teman sekelas yang tidak bisa mengerjakan mencoba merampas lembar ujinya. Ia berlari membawa lembar ujian, terjatuh, dan salah satu teman sekelas menendangnya sekuat tenaga ke dinding, membuatnya pingsan[^6]. Kemudian teman sekelas itu mengucapkan sebuah kalimat, yang dicatat _verbatim_ oleh BizWeekly:

> ✦ 「Kenapa kamu tidak mati saja? Jika kamu mati, aku akan menjadi yang terbaik.」[^6]

Ia tidak memberitahu orang tua setelah pulang. Suatu hari ibunya melihat memar di perutnya saat mandi, dan langsung memutuskan mengajukan cuti sekolah baginya[^6].

Ibu Li Ya-ching kemudian pergi ke Jerman mempelajari pendidikan alternatif, dan pada 1994 mendirikan Sekolah Dasar Eksperimental Orang Tua-Anak Benih di Wulai, menjabat sebagai kepala sekolah pertama[^7].

Pada 1995, Tang Feng berusia 14 tahun, setelah bermeditasi di gunung Wulai, mengumumkan kepada orang tuanya: tidak melanjutkan sekolah, melepaskan jaminan masuk ke Chien-chung[^8].

Itu bukan pilihan „aku terlalu berbakat jadi tidak butuh sekolah”. Itu adalah keputusan seorang anak yang sejak usia 8 tahun belajar menyembunyikan dirinya, yang pada usia 14 tahun memutuskan: didefinisikan oleh posisi „siswa berbakat”, adalah versi dirinya yang tidak diinginkannya.

Ia kemudian berkata berkali-kali: „Saya tidak merasa dunia modern masih memiliki konsep berbakat. Di era internet, sebenarnya setiap orang memiliki IQ 180.”[^9]

## Pada usia 24 tahun ia mengubah namanya, namun menolak menjadi pembicara transgender

Pada usia 12 tahun ia mulai belajar Perl[^10]. Pada usia 19 tahun (2000) ia sudah bekerja sebagai insinyur di perusahaan perangkat lunak di Silicon Valley, California[^11].

Pada 1 Februari 2005, ia yang berusia 24 tahun meluncurkan proyek Pugs—kompilator dan interpreter Perl 6 yang diimplementasikan dalam Haskell[^12]. Pugs dalam komunitas Perl adalah proyek bootstrap: sebuah bahasa yang mengimplementasikan dirinya sendiri menggunakan bahasa lain. Antara 2001 hingga 2006, ia memulai lebih dari 100 proyek Perl di CPAN[^13]. Komunitas open source internasional memanggilnya Audrey atau au.

Akhir 2005, ia mengumumkan dirinya sebagai orang transgender di blognya blog.elixus.org[^14]. Ia mengonsumsi estrogen tetapi tidak menjalani operasi. Ia mengubah nama Tionghoanya menjadi "Tang Feng", dan nama Inggrisnya dari Autrijus menjadi Audrey.

Dalam artikel blog itu ia menulis:

> ✦ 「Baik sekarang, masa lalu, maupun masa depan, saya dengan senang hati menerima jika semua memanggil saya dengan kata-kata perempuan.」[^14]

Respons ayahnya, Tang Kuang-hua, saat diwawancarai, kemudian dicatat verbatim oleh banyak media:

> ✦ 「Jika ia merasa perubahan gender dapat membuatnya lebih bahagia, lebih mampu mengeluarkan kreativitas, dan tidak melukai siapapun, tidak ada alasan untuk tidak menerimanya.」[^15]

Ia menolak posisi "pembicara transgender". Pada 2020, di kolom gender formulir personel kabinet, ia mengisi "tidak ada". Saat itu ia menjelaskan kepada wartawan[^16]:

> ✦ 「Saya adalah 'pasca-kategori'. Dalam perdebatan gender, saya tidak memihak. Bukan berarti saya menganggap isu ini tidak penting, melainkan saya percaya perdebatan tidak dapat memecahkan masalah apa pun.」[^16]

Dalam wawancara dengan Marie Claire, ia meninggalkan kalimat lain yang sering dikutip:

> ✦ 「Jika kamu bisa bergaul dengan kebingungan, perlahan kamu akan melihat, bahwa itu bukan masalahmu, bukan pula masalah masyarakat, melainkan celah di antara keduanya. Segala sesuatu memiliki celah, dan celah itulah pintu masuk cahaya.」[^17]

Dari 2010 hingga 2016 ia menjabat sebagai konsultan Apple, berpartisipasi dalam pengembangan Siri, dengan gaji per jam yang dikonversikan setara dengan 1 Bitcoin[^18]. Pada usia 33 tahun (2014) ia menyerahkan pekerjaannya di Socialtext dan Apple, mengumumkan "pensiun"[^11].

## g0v dan Ruang Sidang Bunga Matahari: Membagi Kredit kepada Orang-orang Tak Terlihat

Pada Oktober 2012, ia bersama Kao Chia-liang (clkao), Wu Tai-hui (Kirby), dan Qu Xiao-wei (ipa) mendirikan g0v Pemerintah Nol. Pemicunya adalah ketidakpuasan terhadap iklan "Paket Peningkatan Dinamika Ekonomi" Kementerian Eksekutif — sebuah iklan propaganda pemerintah dengan anggaran 33 juta, yang setelah ditonton tidak jelas apa yang ingin dilakukan pemerintah[^19].

Proyek pertama g0v adalah visualisasi anggaran total pemerintah pusat: mengubah buku anggaran tebal menjadi lembar-lembar grafik yang dapat diklik[^19]. Kemudian hadir MoeDict、IVOD (Bioskop Yuan Legislatif)、dan siaran langsung ruang sidang Gerakan Mahasiswa Bunga Matahari.

Malam 18 Maret 2014, mahasiswa menduduki ruang sidang Yuan Legislatif. Semua kabel, kamera, dan perangkat siaran langsung internet di dalam ruangan dipasang secara sendirian oleh Tang Feng[^20].

Namun ia hanya tinggal di ruang sidang selama satu jam lalu pergi. Kemudian PNN TV Publik mewawancarainya, dan ia berkata:

> ✦ "Di bawah situasi di mana 5 kamera dari sudut berbeda di dalam ruang sidang merekam dan menyiarkan langsung, semua kegiatan telah menjadi pertunjukan dan upacara murni."[^20]

Ia "tidak tertarik" baik pada pendudukan maupun pada pengambilan sikap. Yang ia pedulikan adalah teknologi alat. Di saat yang sama, ia mengeluarkan uang sendiri untuk membayar orang membuat transkrip kata demi kata rapat pemerintah — agar orang yang tidak hadir di tempat juga bisa membaca percakapan penuh[^20].

Setelah Bunga Matahari berakhir, April 2014, menteri tanpa portofolio saat itu Tsai Yu-ling masuk ke hackathon g0v. Mulai saat itulah, "pemerintah" dan "g0v" — dua kata yang tadinya berlawanan — mulai menumbuhkan sebuah zona tengah[^21].

Nama zona tengah itu adalah vTaiwan. Tahun 2015 hingga 2018, platform memproses 26 isu, di mana 80% di antaranya memicu tindakan nyata pemerintah[^22]. Contoh paling terkenal adalah diskusi regulasi Uber: pengusaha taksi dan pendukung Uber bertenar selama enam tahun, dan akhirnya di bawah tujuh ketentuan Uber dilegalisasi[^22].

Inti platform adalah mesin konsensus Pol.is — ribuan pendapat diolah mesin menjadi beberapa klaster, sehingga setiap peserta dapat melihat "siapa yang berpikir sangat mirip denganku, siapa yang berpikir sangat berbeda, dan klaim apa yang disepakati semua orang". Ia tidak melakukan voting, tidak menimbulkan konfrontasi, hanya menggambarkan bentuk ketidaksepakatan.

## Tanpa Kantor, Transkrip Verbatim Terbuka, Tiga Hari Kerja Jarak Jauh per Minggu

Pada 9 Agustus 2016, Audrey Tang berusia 35 tahun pertama kali bertemu dengan Perdana Menteri Lin Chuan. Pada 15 Agustus, ia setuju menjabat Menteri Koordinator Bidang Politik. Akhir September ia kembali ke Taiwan dari Silicon Valley. Pada 1 Oktober ia memasuki Sekretariat Kabinet[^23].

Tiga syarat yang disepakatinya sebelumnya kemudian menjadi pelanggaran pertama dalam sistem kepegawaian negeri Taiwan: bekerja jarak jauh setiap hari Rabu dan Jumat; semua rapat dipublikasikan dalam transkrip verbatim; tidak harus datang ke Kantor Pusat setiap hari[^23].

Lin Chuan saat itu menjelaskan kepada wartawan:

> ✦ 「Sekretariat Kabinet saat ini tidak memiliki peraturan kerja jarak jauh, namun pola kerja jangka panjangnya selalu jarak jauh, saya berpendapat asalkan pekerjaan tidak terganggu, menyampaikan gagasan atau instruksi kebijakan melalui komputer dari jarak jauh, menurut saya ini layak dilakukan.」[^24]

Ia menjadi tiga hal: Menteri Koordinator Bidang Politik termuda dalam sejarah Taiwan, tokoh politik tingkat menteri pertama di dunia yang terbuka soal identitas transgendernya, dan pertama kali Taiwan memiliki "Menteri Digital"[^25].

Ia tidak memiliki kantor tetap di Sekretariat Kabinet. Ia berkata seluruh kompleks gedung adalah ruang kerjanya. Setelah rapat berakhir, transkrip verbatim diunggah ke sayit.pdis.nat.gov.tw, siapa pun dapat mencarinya[^26].

Ia membentuk tim 20 orang bernama PDIS (Public Digital Innovation Space, Ruang Inovasi Digital Publik). Setengahnya profesional sipil, setengahnya relawan dari berbagai kementerian. Musim panas ditambah 30 orang magang[^26]. Ini bukan organisasi birokrasi — ini adalah sebuah ruang kerja.

2019 ia terpilih dalam daftar 100 Pemikir Global Teratas majalah Foreign Policy (kategori pemilihan pembaca)[^27]. Media menuliskannya sebagai "menteri terbuka transgender satu-satunya di dunia" dan "bintang pemrograman". Di setiap wawancara ia selalu mengembalikan kredit — namun kisah "Menteri Jenius" lebih mudah disebarkan daripada kata-katanya sendiri.

![Audrey Tang di konferensi re:publica Masyarakat Digital Berlin Mei 2019](/article-images/people/audrey-tang-re-publica-2019.webp)
_8 Mei 2019 konferensi re:publica Masyarakat Digital Berlin sesi "Digital Social Innovation", Audrey Tang berbagi panggung dengan Julia Kloiber. Foto: Jan Michalko. [CC BY-SA 2.0 via Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Re_publica_19_-_Day_3_(32860400897).jpg).\_

## Anarkisme Konservatif: Menolak Memerintah, Juga Menolak Diperintah

Audrey Tang menyebut dirinya 「anarkis konservatif」。Di permukaan, ini adalah sebuah oksimoron.

「Konservatif」 (conservative) berarti mempertahankan sistem yang sudah ada dan berfungsi dengan baik; 「anarkisme」 (anarchist) berarti menolak konsentrasi kekuasaan, menolak paksaan dari atas ke bawah. Orang yang menggabungkan kedua kata ini biasanya bermaksud: saya percaya ada hal-hal bernilai dalam sistem yang ada, tapi saya tidak percaya siapapun berhak menggunakan otoritas untuk memaksa orang lain menerima.

Dalam wawancaranya dengan Rest of World, ia meninggalkan kalimat yang hampir seperti manifesto:

> ✦ 「Any top-down, coercion, whether it's from the capitalists or from the state, is equally bad.」（Setiap paksaan dari atas ke bawah, apakah berasal dari kapitalis maupun negara, sama-sama buruk.）[^28]

Dalam wawancaranya dengan ekonom Tyler Cowen, saat ditanya 「Apa peranmu?」, ia menjawab:

> ✦ 「I'm working _with_ the government; I'm not working _for_ the government.」（Saya bekerja _dengan_ pemerintah; saya tidak bekerja _untuk_ pemerintah.）[^29]

Dalam sesi tanya jawab Konferensi Ilmu Komputer Internasional (ICFP) 2020, ia juga melemparkan kalimat seperti ini:

> ✦ 「In Taiwan we have this strange idea that broadband internet access is a human right. Everyone has broadband. And if you don't, it's my fault, personally.」（Di Taiwan kita punya ide aneh: akses internet broadband adalah hak asasi manusia. Setiap orang harus punya broadband. Jika Anda tidak punya, itu kesalahan saya, pribadi.）[^30]

Istilah 「hak asasi manusia」 ia gunakan dengan berat, tapi 「tanggung jawab pribadi」 ia gunakan dengan ringan. Sikap jabatan pemerintahan yang ia inginkan disebut: 「Jika di mana-mana ada kekurangan, saya akan pergi mengisinya.」

Dalam falsafah kerjanya ada prinsip yang disebut humor over rumor. Setelah sistem CoFacts mendeteksi disinformasi viral, timnya dalam dua jam merilis video dua menit atau dua gambar (maksimal 200 kata), menggunakan humor untuk menanggapi berita palsu. Disebut prinsip 2-2-2[^31].

Kasus 「Kecemasan Tisu Toilet」 bulan Februari 2020 adalah kasus paling banyak dikutip media internasional pada masa itu: rumor beredar bahwa masker dan tisu toilet menggunakan pasta kertas yang sama, masyarakat panik menimbun; Kantor Eksekutif dalam beberapa jam merilis satu infografis (foto menepuk bahu Premier saat itu Su Tseng-chang dengan teks 「Kami Hanya Punya Satu Kepala」), dilengkapi penjelasan rantai pasokan bahwa bahan baku berbeda, rumor mereda pada hari itu[^31]. Dalam TED dan berbagai wawancara internasional, ia menjadikan ini studi kasus humor over rumor: rumor tidak ditekan dengan hukum, melainkan ditutupi oleh sebuah gambar yang lebih lucu, yang sekaligus menyisipkan fakta di dalamnya.

Pada 27 Agustus 2022, Kementerian Pengembangan Digital resmi diresmikan, dan ia menjabat sebagai menteri pertama[^32]. Anggaran personel tahun pertama 598 orang, anggaran administrasi 5,7 miliar dolar Taiwan baru ditambah 160 miliar dari program Maju, total 217 miliar[^33].

Selama jabatannya ia mendorong ketahanan digital (meyakinkan OneWeb Inggris dan SES Luksemburg satelit orbit rendah-sedang menempatkan peralatan terminal di Taiwan), merevisi 《Undang-Undang Tanda Tangan Elektronik》 yang 20 tahun tidak disentuh, meluncurkan platform SMS kode pendek 111 khusus pemerintah untuk mencegah penipuan, mewajibkan 47 lembaga tingkat A memasukkan standar transmisi terpadu T-Road dalam dua tahun[^34][^35].

Namun ia juga menerima banyak kritik terbuka. Ko Wen-je dari Partai Rakyat mempertanyakan 「Rata-rata 30 juta per orang, ini pekerjaan apa?」; anggota legislatif DPP Liu Shih-fang berkata 「Kementerian Digital belum menemukan arahnya sendiri」; anggota legislatif KMT Wu Yi-ding berkata 「Penipuan daring yang paling dikhawatirkan masyarakat, sama sekali tidak ada tindakan nyata」[^36][^37].

Bahkan pegawai negeri sipil PO (Public Participation Officer / Petugas Partisipasi Publik) yang ditunjuk PDIS ke berbagai kementerian sendiri bingung. Pewawancara mendapatkan verbatim dari seorang PO:

> ✦ 「Menjadi PO sudah 2 bulan, saya merasa ini jadi pekerjaan tambahan, sampai sekarang masih tidak jelas kita bisa campur tangan sampai mana, bisa dapat otoritas sampai mana... Saya tidak tahu masa depan platform-platform ini, peran kita nanti apa?」[^38]

Ia tidak bisa menjawab pertanyaan ini. Atau katakanlah, jawabannya adalah: Anda tentukan sendiri.

Harga 「mencontohkan bukan memerintah」 adalah lambat, KPI tidak menarik, dua tahun berlalu belum ada yang bisa jelas mengatakan 「apa yang sebenarnya dilakukan Kementerian Digital」。Taruhannya adalah transformasi budaya, dan transformasi budaya itu ya berhasil atau tidak.

Namun sistem transkrip verbatim publik SayIt PDIS, hingga hari ia mundur, telah mengumpulkan catatan penuh lebih dari 7.000 rapat[^26]. Siapa pun memasukkan kata kunci 「Uber」「masker」「LINE Pay」, bisa membaca setiap kata yang ia ucapkan saat itu kepada pelaku usaha, pegawai negeri, dan anggota legislatif. Sistem ini tidak ada sebelum ia masuk pemerintah, dan setelah ia pergi tidak ada yang menghapusnya. Ia tidak bisa merangkumnya dalam satu kalimat prestasi, tapi ia memang meninggalkan catatan percakapan pemerintah yang bisa dicari selama tujuh tahun — ini pertama kalinya dalam sejarah politik

## Di panggung penghargaan Stockholm, ia berkata "Kita"

Pada malam 20 Mei 2024, tepat setelah upacara pelantikan Presiden Lai Ching-te berakhir, Tang Feng langsung menuju Bandara Taoyuan. Selama tiga bulan berikutnya, ia menginjakkan kaki di 20 negara[^39].

Pada April tahun yang sama, ia bersama ekonom Glen Weyl serta Komunitas Plurality yang tersebar di seluruh dunia, bersama-sama menerbitkan buku 《Plurality: The Future of Collaborative Technology and Democracy》。 Buku ini dirilis di bawah lisensi CC0——artinya, siapa pun boleh menggunakan seluruh isi buku untuk keperluan apa pun, tanpa perlu mencantumkan nama, tanpa biaya, dan tanpa perlu meminta izin[^40].

Judul buku "Plurality" diwakili oleh satu simbol karakter Han: ⿻ (ditulis "衆" dalam bahasa Tionghoa, pengucapan mirip zhòng). Karakter ini di Unicode termasuk salah satu "ideographic description character", yang digunakan untuk menggambarkan struktur "dua hal yang saling terjalin". Ia menjelaskan kepada media internasional bahwa ⿻ menekankan "interweaving" (saling terjalin)——perbedaan antara banyak individu tidak dihapuskan, namun membentuk tekstur utuh yang satu. Konsep ini berlawanan tepat dengan "jenius": jenius adalah satu titik terang yang ditegakkan oleh keabuan di sekelilingnya; ⿻ adalah setiap benang yang dililit benang lain, tidak bisa dilepaskan satu pun.

Kasus regulasi Uber yang ditangani vTaiwan sering dijadikan contoh untuk menjelaskan ⿻: pengusaha taksi dan pendukung Uber bertahun-tahun dalam kebuntuan selama enam tahun, hingga akhirnya Uber dilegalisasi di bawah tujuh ketentuan tambahan[^22]. Konsensus ini tidak membuat pihak manapun sepenuhnya "menang", namun juga tidak ada yang sepenuhnya "kalah". Ia berkata itulah bentuk sebenarnya dari demokrasi——pekerjaan menenun tekstur semua orang ke dalam satu kain yang sama.

Pada 7 Oktober, Kementerian Luar Negeri menunjuknya sebagai Duta Besar Tanpa Portofolio Republik Tiongkok (Taiwan) (Cyber Ambassador-at-Large)[^41]. Di laman pribadinya audreyt.org dan cyberambassador.tw, kalimat pembuka yang tak pernah berubah adalah:

> ✦ "I want to be a good enough ancestor for future generations." (Saya ingin menjadi leluhur yang layak bagi generasi mendatang.)[^42]

Pada 2 Desember 2025, Stockholm, aula penghargaan Yayasan Right Livelihood. Penghargaan Right Livelihood dikenal sebagai "Alternatif Nobel Prize" (Alternative Nobel Prize), didirikan 1980 oleh filantropis keturunan Swedia-Jerman Jakob von Uexküll, untuk melengkapi bidang yang tidak tercakup oleh Penghargaan Nobel.

Tang Feng adalah orang Taiwan pertama yang menerima penghargaan ini[^43]. Sitasi penghargaannya berbunyi:

> ✦ "For advancing the social use of digital technology to empower citizens, renew democracy and heal divides." (Atas kontribusinya dalam memajukan penggunaan teknologi digital untuk memberdayakan warga, memperbarui demokrasi, dan mengobati kesenjangan.)[^43]

Dalam pidato penerimaannya, kalimat pertamanya bukan tentang apa yang ia lakukan. Ia berbicari tentang apa itu cyberspace (ruang siber):

> ✦ "Cyberspace is a conflict region, and my work turns that conflict into an energy source for co-creation. It is time we work on peace in this zone." (Ruang siber adalah wilayah konflik, dan pekerjaan saya mengubah konflik itu menjadi sumber energi untuk penciptaan bersama. Sudah waktunya kita melakukan pekerjaan perdamaian di zona ini.)[^43]

Kemudian ia mengulang kalimat di sampul buku Plurality:

> ✦ "The superintelligence we are looking for is already here. It's us." (Superintelijen yang kita cari sudah di sini. Itu adalah kita.)[^44]

Ia menerima trofi yang disebut "Alternatif Nobel Prize", lalu di atas panggung penghargaan mengarahkan sorotan ke "kita"——ia yang dianggap dunia sebagai jenius Taiwan, sekali lagi menolak posisi "jenius" itu.

Dari anak berusia 8 tahun yang ditendang di ruang kelas unggulan pada 1989, hingga pria berusia 44 tahun di atas panggung penghargaan Stockholm pada 2025, di antaranya terhampar jalan panjang yang dibangun dari satu demi satu penolakan. Setiap penolakan tampak seperti pemberontakan, namun jika dilihat bersama-sama, ternyata merupakan variasi dari gerakan yang sama: menolak didefinisikan oleh posisi "individu unggul", menempatkan diri kembali sebagai simpul, jembatan, pembangun ruang.

Ia menolak menjadi jenius. Dunia bersikeras memandangnya sebagai jenius. Tapi ia tak pernah biarkan dunia menang dalam perdebatan ini——hanya saja dunia butuh waktu lama sebelum benar-benar mengerti apa yang sebenarnya ia katakan.

![唐鳳 2021 年公開的個人簽名 SVG](/article-images/people/audrey-tang-signature.svg)
_Tanda tangan pribadi Tang Feng yang dipublikasikan Agustus 2021, asalnya untuk majalah Jepang 《文藝春秋》。 Penulis: Tang Feng sendiri, [CC0 Domain Publik](https://commons.wikimedia.org/wiki/File:Audrey_Tang_signature_(51385705516).svg).\_

## Bacaan Lanjutan

- [Sodagreen: Dari Panggung Kecil Gongliao ke Perjuangan "Oaeen", Sebuah Pertarungan Kedaulatan Musik yang Berlangsung Dua Puluh Tahun](/id/music/sodagreen) — Sama-sama muncul di era 2000-an sebagai "anomali" Taiwan, sama-sama "menolak dibingkai oleh identitas yang ditetapkan" dalam perjuangan jangka panjang, hanya beda arenanya di industri musik bukan di pemerintahan
- [Hsiao Shang-nung](/id/people/tony-hsiao-inside-founder) — Pendiri bersama INSIDE dan iCooking, sama-sama mendefinisikan perannya di lingkaran teknologi Taiwan dengan "melintasi banyak bidang"
- [Wu Ta-you](/id/people/tai-yu-wu) — Dari sains ke teknologi, warisan elit intelektual Taiwan, Wu Ta-you dalam kapasitasnya sebagai Presiden Akademia Sinica meletakkan fondasi sistem penelitian Taiwan
- [Yayasan Budaya Terbuka](/technology/開放文化基金會) — Dari backend pelaporan g0v tumbuh menjadi jembatan hak digital Taiwan, badan hukum yang berkali-kali "bertemu" dengan Kementerian Pengembangan Digital di bawah kepemimpinan Audrey Tang, baik bekerja sama maupun mengawasi
- [Pandemi COVID-19 dan Vaksin Taiwan](/society/台灣新冠疫情與疫苗) — Di pandemi seperti apa rantai koordinasi peta masker itu berjalan, serta delapan belas bulan yang diraih Taiwan berkat pengamanan batas dan kebijakan masker

## Sumber Gambar

Artikel ini menggunakan 3 gambar, semuanya di-cache di `public/article-images/people/` untuk menghindari hotlink ke server sumber. Ketiganya berlisensi Wikimedia Commons CC / CC0：

- **hero**：[Portrait Audrey Tang (cropped)](<https://commons.wikimedia.org/wiki/File:Portrait_Audrey_Tang_(25915794061,_cropped).jpg>) — Photo: Camille McOuat, 2016-03-09 Paris, CC BY 2.0
- **scene-mid**：[Re:publica 19 - Day 3](<https://commons.wikimedia.org/wiki/File:Re_publica_19_-_Day_3_(32860400897).jpg>) — Photo: Jan Michalko, 2019-05-08 Berlin re:publica Konferensi Masyarakat Digital, CC BY-SA 2.0
- **signature**：[Audrey Tang signature](<https://commons.wikimedia.org/wiki/File:Audrey_Tang_signature_(51385705516).svg>) — Penulis: Audrey Tang sendiri, 2021-08-18, CC0 Domain Publik

## Referensi

[^1]: [TechNews: Membangun Peta Masker Sendirian, Mengungkap Tim di Balik 'Menyelamatkan Negara Lewat Keyboard' (2020-02-23)](https://technews.tw/2020/02/23/expose-the-team-behind-mask-map/) — Menceritakan detail Howard Wu Chih-wei deploy di tengah malam lalu tagihan API 20.000 dolar AS, serta linimasa koordinasi Audrey Tang dengan Google dan g0v

[^2]: [Jiang Ming-zong di Medium: Peluncuran Peta Pembelian Masker di Apotek (2020-02)](https://medium.com/%E6%B1%9F%E6%98%8E%E5%AE%97-kiang/%E8%97%A5%E5%B1%80%E5%8F%A3%E7%BD%A9%E6%8E%A1%E8%B3%BC%E5%9C%B0%E5%9C%96%E4%B8%8A%E7%B7%9A-54e11bd63e84) — Catatan langsung dari insinyur tersebut, verbatim: 'Data resmi diperkirakan baru akan online pada 6 Februari pukul 08.00' + Audrey Tang mengoordinasikan partisipasi komunitas dalam pengembangan

[^3]: [Situs Keputusan Kunci Pencegahan COVID-19 Kementerian Kesehatan dan Kesejahteraan](https://covid19.mohw.gov.tw/ch/cp-4822-53563-205.html) — Catatan resmi pemerintah verbatim: 'Menteri Tanpa Portefeuille Audrey Tang dari Yuan Administratif mengundang komunitas sipil memanfaatkan data terbuka Badan Asuransi Kesehatan untuk membangun platform aplikasi 'Kueri Masker Pencegahan'

[^4]: [TechNews: Membangun Peta Masker Sendirian (sama [^1])](https://technews.tw/2020/02/23/expose-the-team-behind-mask-map/) — Lihat tautan asli untuk data pelengkap di dalamnya

[^5]: [Entri 'Audrey Tang' di Wikipedia Bahasa Cina](https://zh.wikipedia.org/zh-tw/%E5%94%90%E9%B3%B3) — Kelahiran / latar belakang keluarga / masa kecil belajar mandiri BASIC dengan keyboard kertas dan data biografi dasar lainnya

[^6]: [Majalah Minggu Ini: Dikipas Teman Kelas yang Iri... Masa Kecil Audrey Tang yang Berbakat Beberapa Kali Ingin Bunuh Diri (2020-11)](https://www.businesstoday.com.tw/article/category/183035/post/202011090020/) — Adegan penganiayaan di ruang kelas SD kelas 2 + kutipan teman kelas verbatim 'Mengapa kamu tidak mati saja' + ibu menemukan memar saat mandi, keputusan berhenti sekolah

[^7]: [China Times News: Audrey Tang Politisi Termuda, Li Ya-qing Mewujudkan Teladan Reforma Pendidikan Belajar Mandiri (2016-08-25)](https://www.chinatimes.com/realtimenews/20160825005980-260405) — Li Ya-qing kembali ke Taiwan 1992, 1994 mendirikan Sekolah Dasar Eksperimental Orang Tua-Anak Wulai Zhongzi dan menjabat kepala sekolah pertama

[^8]: [Tai Bao: Melarikan Diri dari 'Bullying Sekolah' Menuju Belajar Mandiri! 'Penemuan Besar' Audrey Tang Usia 14 Tahun](https://www.taisounds.com/specialtopic/content/46/23226) — Usia 14 tahun, setelah isolasi di Wulai, menolak rekomendasi masuk ke Jianzhong (SMA Negeri Jian Guo)

[^9]: Dikutip banyak media, sang pria sendiri mengulang di wawancara berbeda: 'Saya tidak merasa dunia modern masih memiliki konsep jenius' 'Di era internet, sebenarnya setiap orang memiliki IQ 180'

[^10]: [Wikipedia: Audrey Tang](https://en.wikipedia.org/wiki/Audrey_Tang) — "Tang mulai pemrograman usia delapan tahun dan mulai belajar Perl usia 12 tahun"

[^11]: Entri 'Audrey Tang' di Wikipedia Bahasa Cina (sama [^5]) — Tahun 2000 usia 19 tahun sudah bekerja sebagai insinyur di Silicon Valley, 2014 usia 33 tahun menyerahkan pekerjaan di Socialtext + Apple dan mengumumkan pensiun

[^12]: [Wikipedia: Pugs (kompilator)](https://en.wikipedia.org/wiki/Pugs_(compiler) — Entri Wikipedia

[^13]: [Wikipedia: Audrey Tang (Bahasa Inggris)](https://en.wikipedia.org/wiki/Audrey_Tang) — "Tang memulai lebih dari 100 proyek Perl antara Juni 2001 dan Juli 2006, termasuk arsip PAR yang populer"

[^14]: Entri 'Audrey Tang' di Wikipedia Bahasa Cina (sama [^5]) + banyak media verbatim mengutip konsisten: 'Apakah sekarang, masa lalu, atau masa depan, saya dengan senang hati semua memanggil saya dengan kata benda perempuan'. Sumber asli adalah blog 2005 blog.elixus.org

[^15]: [Majalah Minggu Ini: Wawancara Eksklusif Ayah Audrey Tang (2016-09)](https://www.businesstoday.com.tw/article/category/80407/post/201609010032/) — Ayah Tang Guang-hua verbatim: 'Tidak ada alasan untuk tidak menerima'

[^16]: [Perempuan Taiwan NMTH: Anggota kabinet transgender pertama Taiwan, menteri digital pertama — Audrey Tang](https://women.nmth.gov.tw/?p=20105) — Audrey Tang verbatim 'Saya adalah 'pasca-kategori'' + kolom jenis kelamin formulir data personel kabinet 2020 diisi 'tidak ada' latar belakang

[^17]: [Marie Claire Taiwan: Melewati kekerasan di masa kecil, Audrey Tang berkata: 'Bergaul dengan baik dengan kebingungan'](https://www.marieclaire.com.tw/entertainment/story/52923/audrey-tang) — verbatim 'Segala sesuatu memiliki celah, celah itulah pintu masuk cahaya'

[^18]: [Entri Wikipedia bahasa China <Audrey Tang> (sama seperti [^5])+](https://www.britannica.com/biography/Audrey-Tang) — lihat tautan asli untuk data tambahan

[^19]: [Majalah Taiwan Panorama: Kekuatan hacker sipil g0v pemerintah nol-waktu](https://www.taiwan-panorama.com/Articles/Details?Guid=61281c3d-f79c-4db7-93d9-d18b29f90ba0) — Titik awal 2012/10 + visualisasi anggaran total pemerintah pusat + daftar pendiri bersama

[^20]: [Berita PTS PNN: Liputan Gerakan Mahasiswa Bunga Matahari (2014)](https://news.pts.org.tw/article/327548) — verbatim 'Semua kabel, kamera, semua perangkat siaran langsung internet di ruang rapat disiapkan oleh dia sendiri, hacker sipil 'Audrey Tang'' + komentar Audrey Tang tentang ruang sidang 'pertunjukan dan ritual' + mengeluarkan uang sendiri untuk membuat transkrip verbatim

[^21]: [The Reporter: Menciptakan ruang dialog — Perjalanan fantastis Audrey Tang](https://www.twreporter.org/a/g0v-audrey-tang) — verbatim April 2014 Tsai Yu-ling memasuki hackathon g0v + asal-usul vTaiwan

[^22]: [Democracy Technologies: Membangun Konsensus di Taiwan](https://democracy-technologies.org/participation/consensus-building-in-taiwan/) — vTaiwan 2015-2018 menangani 26 isu / 80% memicu tindakan nyata pemerintah / Uber dilegalisasi dengan 7 syarat

[^23]: [Liberty Times: Melanggar tradisi, Audrey Tang kerja jarak jauh hari Rabu dan Jumat (2016)](https://news.ltn.com.tw/news/politics/breakingnews/1859132) — 8/9 pertama kali bertemu Lin Chuan / 8/15 setuju / 10/1 mulai jabatan / tiga syarat masuk kabinet

[^24]: [Liberty Times: Audrey Tang kerja jarak jauh, Lin Chuan: Ini layak dilakukan (2016)](https://news.ltn.com.tw/news/politics/breakingnews/1859246) — Lin Chuan verbatim 'Yuan Eksekutif saat ini tidak memiliki regulasi kerja jarak jauh... ini layak dilakukan'

[^25]: Entri Wikipedia bahasa China <Audrey Tang> (sama seperti [^5]) — berusia 35 tahun, menteri tanpa portofolio termuda dalam sejarah Taiwan + tokoh politik tingkat menteri transgender terbuka pertama di dunia

[^26]: [pdis.nat.gov.tw catatan kerja dan sistem transkrip verbatim publik SayIt](https://sayit.pdis.nat.gov.tw/) — Tim PDIS struktur 20 orang + setengah masyarakat sipil + setengah relawan kementerian + 30 magang

[^27]: [Taipei Times: Audrey Tang terpilih dalam '100 Pemikir Global Teratas' (2019-01-25)](https://www.taipeitimes.com/News/front/archives/2019/01/25/2003708586) — Foreign Policy 100 Pemikir Global Teratas terpilih (kategori pilihan pembaca)

[^28]: [Rest of World: Audrey Tang tentang visi 'konservatif-anarkis' nya untuk masa depan Taiwan (2020)](https://restofworld.org/2020/audrey-tang-the-conservative-anarchist/) — verbatim 'Setiap kebijakan atas-bawah, paksaan, apakah dari kapitalis atau dari negara, sama-sama buruk'

[^29]: [Conversations with Tyler Ep.106: Audrey Tang](https://conversationswithtyler.com/episodes/audrey-tang/) — verbatim 'Saya bekerja dengan pemerintah; saya tidak bekerja untuk pemerintah'

[^30]: [Lindsey di X: Kutipan real-time ICFP 2020 Q&A](https://x.com/lindsey/status/1297886318114963456) — verbatim 'Di Taiwan kita memiliki ide aneh bahwa akses internet broadband adalah hak asasi manusia'

[^31]: [SwissInfo: Kebebasan ekspresi: humor di atas rumor](https://www.swissinfo.ch/eng/politics/freedom-of-expression-humour-over-rumour-lessons-from-taiwan-in-digital-democracy/46592080) — Lihat tautan asli untuk detail isi dan data tambahan

[^32]: [Situs Resmi Kementerian Pengembangan Digital: Menteri-Menteri Sebelumnya](https://moda.gov.tw/aboutus/ministers-since-2022/1527) — verbatim「27 Agustus 2022 - 20 Mei 2024」masa jabatan Audrey Tang

[^33]: [Liberty Times: Audrey Tang Akan Memimpin Kementerian Digital, Anggaran dan Kecukupan Personel 598 Orang](https://news.ltn.com.tw/news/politics/breakingnews/4021987) — Laporan Liberty Times

[^34]: [Liberty Times Net: Dari Menteri IT Jenius ke Dosen Lepas, Meninjau 3 Prestasi Utama dan Kontroversi Masa Jabatan Audrey Tang](https://ec.ltn.com.tw/article/breakingnews/4677986) — Ketahanan Digital / OneWeb / Satelit SES / Revisi Undang-Undang Tanda Tangan Elektronik / Platform SMS Kode Pendek 111

[^35]: [INSIDE: Kementerian Pengembangan Digital Berusia Satu Tahun! Mencatat Dua Prestasi Utama dan Tiga Kontroversi Audrey Tang](https://www.inside.com.tw/article/32615-Taiwan-moda-anniversary) — 47 lembaga tingkat A standar transmisi terpadu T-Road + rekan kerja verbatim「Berbanding unit-unit sebelumnya, Audrey Tang lebih bersedia mendelegasikan kekuasaan」

[^36]: [Majalah Global Views: Audrey Tang Memimpin 'Kementerian Pengembangan Digital' Hampir 1 Tahun, Dikritik Tidak Memiliki Prestasi](https://www.gvm.com.tw/article/105627) — Liu Shih-fang / Wu Yi-ting verbatim kritik

[^37]: [ETtoday: Anggaran Kementerian Pengembangan Digital 211 Miliar, Ko Wen-je Terkejut: Rata-rata 1 Orang Habis 30 Juta 'Ini Pekerjaan Apa?' (2022-08-30)](https://www.ettoday.net/news/20220830/2327863.htm) — Ko Wen-je verbatim mengajukan pertanyaan

[^38]: [The Reporter: Pemerintahan Terbuka, Bagaimana Audrey Tang Melewati Tantangan Pegawai Negeri?](https://www.twreporter.org/a/open-government-audrey-political-commissar-challenges) — PO verbatim「Menjadi PO sudah 2 bulan... tidak jelas seberapa jauh kita bisa campur tangan」

[^39]: [Liberty Times Net: Dari Menteri IT Jenius ke Dosen Lepas (sama dengan [^34])](https://ec.ltn.com.tw/article/breakingnews/4677986) — Laporan Liberty Times

[^40]: [Institut Pluralitas: Peluncuran Buku Plurality](https://www.plurality.institute/blog-posts/book-launch-plurality-the-future-of-collaborative-technology-and-democracy-by-e-glen-weyl-audrey-tang-and-the-plurality-community) — Ditulis bersama Glen Weyl + Komunitas Plurality / Terbit 16 April 2024 / Dirilis di bawah CC0

[^41]: [Entri Wikipedia Bahasa China <Audrey Tang> (sama dengan [^5])+](https://cyberambassador.tw/) — Lihat tautan asli untuk detail isi dan data tambahan

[^42]: [audreyt.org](https://audreyt.org/) — Lihat tautan asli untuk detail isi dan data tambahan

[^43]: [Right Livelihood: Audrey Tang dari Taiwan Dianugerahi Penghargaan Right Livelihood (2025)](https://rightlivelihood.org/news/taiwans-audrey-tang-honoured-with-right-livelihood-award-for-advancing-digital-democracy-and-social-trust/) — Kutipan verbatim + Tang pidato penerimaan verbatim bagian「Cyberspace is a conflict region」+ [Laporan Focus Taiwan versi bahasa Inggris CNA](https://focustaiwan.tw/society/202512030022)

[^44]: cyberambassador.tw verbatim + Ulasan filsafat sampul buku Plurality — "The superintelligence we are looking for is already here. It's us"
