---
title: 'Sistem Bus di Taiwan: Setelah Hsinchu Bus Berhenti Beroperasi, Siapa yang Akan Melayani Mereka yang Tidak Memiliki Kendaraan'
description: 'Pada pagi hari 15 September 2024 di Stasiun Kereta Api Tongluo, lebih dari 30 orang—mulai dari anak-anak taman kanak-kanak hingga lansia berusia 90 tahun—menunggu bus terakhir Hsinchu Bus rute 5658. Dari rute kemitraan pertama di Taipei pada tahun 1977, hingga kondisi di daerah terpencil yang hanya tersisa dua jadwal sehari dengan rata-rata usia pengemudi 51 tahun, serta lonjakan penggunaan TPASS hampir 70% di Hualien; bus selalu mengangkut mereka yang tidak memiliki pilihan: pelajar, lansia yang tidak menyetir, dan keluarga tanpa kendaraan, namun layanan ini perlahan-lahan mulai ditarik dari bawah kaki mereka.'
date: 2026-06-25
category: 'Lifestyle'
tags:
  [
    'bus',
    'layanan bus',
    'transportasi umum',
    'TPASS',
    'daerah terpencil',
    'kesetaraan transportasi',
    'bus listrik',
    'data terbuka',
    'kelangkaan pengemudi',
  ]
subcategory: '交通與移動'
author: 'Taiwan.md Contributors'
readingTime: 24
featured: false
lastVerified: 2026-06-25
lastHumanReview: false
researchReport: 'reports/research/2026-06/台灣的公車系統.md'
image: '/article-images/lifestyle/scooters-and-bus-taipei-1996.webp'
imageCredit: 'Holly Cheng'
imageLicense: 'CC BY-SA 3.0'
imageSource: 'https://commons.wikimedia.org/wiki/File:Taipei_street_scene.jpg'
datasets:
  - name: '台灣好行各路線搭乘人次'
    url: 'https://data.gov.tw/dataset/140008'
  - name: '機動車輛登記數'
    url: 'https://data.gov.tw/dataset/14208'
relatedDiary: ['2026-06-25-204254-公車系統']
curation: 'incubating'
curationReason: 'unverified'
translatedFrom: 'Lifestyle/台灣的公車系統.md'
sourceCommitSha: 'be13f045'
sourceContentHash: 'sha256:7d3802fe03c60e03'
sourceBodyHash: 'sha256:24a950fc8509e96a'
translatedAt: '2026-10-13T22:42:03.674182+00:00'
---

Pada pagi hari tanggal 15 September 2024, di depan Stasiun Kereta Api Tonglu, Miaoli. Lebih dari 30 orang berdiri di bawah papan pemberhentian bus; yang termuda masih duduk di taman kanak-kanak, dan yang tertua berusia 90 tahun. Mereka tidak sedang menunggu bus untuk berangkat kerja, bukan pula bus untuk pergi sekolah. Mereka sedang menunggu perjalanan terakhir bus Hsinchu Bus rute 5658.

Mulai hari itu, operator lama yang telah beroperasi selama satu abad ini menarik diri sepenuhnya dari wilayah Tao-Yuan-Chu-Liao (Taoyuan, Hsinchu, dan Miaoli). Sebanyak 12 rute di Miaoli diserahkan kepada layanan taksi sistem reservasi seperti "Happiness Bus"[^1]. Saat bus besar milik Hsinchu Bus perlahan memasuki stasiun kereta api, tepuk tangan bergema di lokasi tersebut. Perwakilan warga Tonglu, Hsu Yu-feng, mengajak semua orang untuk naik perjalanan terakhir ini sebagai kenang-kenangan; ia mengatakan: 「Naik bus Hsinchu Bus adalah kenangan bagi banyak orang, yang telah menemani masa muda banyak orang.」[^1]

Tepuk tangan itu ditujukan untuk sebuah bus, namun di balik tepuk tangan tersebut tersembunyi kenyataan yang lebih kejam. Mereka yang berdiri di bawah papan pemberhentian sambil bertepuk tangan adalah siswa sekolah dasar yang belum bisa mengendarai kendaraan, kakek-nenek yang tidak lagi mampu mengemudi, dan orang-orang yang tidak memiliki mobil kedua di rumahnya—mereka adalah kelompok yang paling tidak punya pilihan untuk pergi begitu saja. Bus ada untuk mereka. Namun, keruntuhan transportasi bus di Taiwan justru dimulai dari bawah kaki merekalah.

> **Ringkasan 30 Detik:** Bus di Taiwan mengangkut "orang-orang tanpa setir": remaja yang pergi sekolah, lansia yang tidak menyetir, dan keluarga tanpa kendaraan pribadi. Sebanyak 53,3% keluarga tanpa mobil bergantung pada transportasi umum untuk bepergian, sementara keluarga dengan mobil hanya 53,3% yang menggunakannya, yakni sebesar 13,7%[^2]. Namun, sistem ini justru berhenti beroperasi di tempat yang paling membutuhkannya: jumlah pengemudi bus jalan raya turun dari 5.646 orang menjadi 3.551 orang dalam enam tahun, berkurang lebih dari sepertiga[^3]; di daerah terpencil, hanya tersisa dua jadwal bus per hari dan bus terakhir berhenti beroperasi sangat awal. Tindakan yang sama disebut "menunggu bus"; di Taipei, itu berarti mengeluh karena terlalu lama, namun di pedesaan Changhua, itu berarti "apakah saya masih bisa keluar rumah sendiri". Di balik sistem ini terdapat kumpulan data terbuka yang bahkan digunakan oleh Google, namun di sisi layanan, sering kali terjadi situasi tidak ada bus yang datang atau dua bus datang secara bersamaan. Baik atau buruknya sistem ini mengukur sejauh mana sebuah masyarakat bersedia mengangkut mereka yang tidak bisa pergi ke mana-mana sendirian.

## Orang yang Mengangkat Tangan di Bawah Papan Nama Halte

Pertama-tama, mari kita perjelas satu hal: sebenarnya siapa yang naik bus?

Survei sarana transportasi dari Kementerian Perhubungan memberikan jawaban yang berlawanan dengan intuisi. Jika keluarga dipisahkan berdasarkan "memiliki kendaraan atau tidak", 53,3% keluarga tanpa kendaraan mengandalkan transportasi umum untuk bepergian, sementara keluarga dengan kendaraan hanya sebesar 13,7%[^2]. Perbedaannya hampir empat kali lipat. Dengan kata lain, kekuatan utama yang diangkut oleh bus (termasuk MRT dan kereta api Taiwan Railways) adalah mereka yang tidak memiliki mobil di rumah atau mereka yang tidak mengemudi. Perbedaan ini semakin nyata berdasarkan kelompok usia: pelajar adalah kelompok dengan tingkat penggunaan tertinggi di antara berbagai tujuan perjalanan, dengan proporsi perjalanan sekolah yang menggunakan sarana transportasi umum melebihi 40%[^2].

```tw-bars
Siapa yang naik transportasi umum: Orang dengan kendaraan jarang naik, orang tanpa kendaraan mengandalkannya (pangsa pasar perjalanan %)
Keluarga tanpa kendaraan | 53.3 | Mengandalkannya untuk bepergian
Keluarga dengan kendaraan | 13.7
Sumber: Survei Kondisi Sarana Transportasi, Departemen Statistik Kementerian Perhubungan
```

Kelompok ini memiliki satu kesamaan: mereka tidak memegang setir di tangan mereka. Remaja berusia belasan tahun belum bisa mengendarai kendaraan, lansia berusia tujuh puluh atau delapan puluh tahun tidak lagi mampu berkendara, dan keluarga yang tidak mampu atau tidak ingin membeli mobil tidak punya pilihan lain. Bagi seorang kakek berusia 78 tahun di Changhua, bus tidak pernah berkaitan dengan "nyaman atau tidak nyaman", melainkan menjawab pertanyaan "apakah saya bisa pergi ke dokter sendiri hari ini, apakah saya bisa pulang ke rumah sendiri". Ini berkaitan dengan martabat.

Di sini, kita perlu menepis satu argumen lawan yang populer. Setiap beberapa waktu, ada orang yang mengatakan bahwa subjek nyata di Taiwan adalah sepeda motor, bukan bus, dan menulis tentang bus adalah sebuah "framing elit perkotaan". Fakta bahwa Taiwan adalah "pulau sepeda motor" memang benar: terdapat 599 sepeda motor per seribu orang di Taiwan, 83,7% rumah tangga memiliki sepeda motor, dan hanya sekitar 12,5% orang yang mengandalkan transportasi umum sebagai moda utama[^4]. Namun, argumen ini salah mengarahkan sasaran. Bus justru merupakan urat nadi bagi mereka yang non-elit: bus mengangkut keluarga tanpa kendaraan, pelajar, dan lansia di daerah terpencil yang tidak bisa berkendara. Orang yang bisa mengendarai sepeda motor memang pada dasarnya tidak terlalu membutuhkannya. Mereka yang benar-benar bergantung pada bus adalah mereka yang bahkan tidak bisa mengendarai sepeda motor.

> 📝 **Catatan Kurator**: Pandangan umum langsung membaca "banyaknya sepeda motor" sebagai "bus tidak penting". Ada satu tahapan yang terlewati di sini: sepeda motor menyelesaikan mobilitas bagi "orang yang bisa pergi sendiri", sedangkan bus menyelesaikan mobilitas bagi "orang yang tidak bisa pergi sendiri". Keduanya melayani kelompok orang yang mendasarinya secara berbeda. Ketika sebuah rute di daerah terpencil dihentikan, yang tidak terdampak adalah pemuda usia produktif yang mengendarai sepeda motor, namun yang pertama kali kehilangan kendaraan adalah nenek yang biasanya naik bus untuk kontrol kesehatan. Menganggap bus sebagai pemeran pembantu sama saja dengan menganggap kelompok orang ini sebagai pemeran pembantu juga.

Sekaligus meluruskan satu kesalahpahaman umum: banyak orang mengira pekerja migran adalah penumpang utama bus. Sebenarnya tidak. Karena kebijakan yang membatasi pembelian kendaraan dalam jangka panjang, pekerja migran di Taiwan sebagian besar menggunakan sepeda motor untuk komuter sehari-hari, dan hanya menggunakan bus antarkota untuk perjalanan jarak jauh pada hari libur[^5]. Menganggap pekerja migran sebagai penumpang utama bus adalah asumsi keliru yang menyamakan "kelompok rentan" secara langsung dengan "pengguna bus".

## Tiket Satu Segmen, Dua Segmen, dan Bunyi "Pip" Saat Harus Tap Lagi Saat Turun

![Bus lantai rendah Xingnan Bus di Kota Tainan melintasi rute utama merah, dengan tanda aksesibilitas di dekat pintu dan desain sasis rendah](/article-images/lifestyle/low-floor-bus-tainan-2016.webp)
_Bus lantai rendah milik Xingnan Bus di Kota Tainan, tahun 2016. Sasis rendah memudahkan penggunaan kereta bayi dan kursi roda, yang merupakan indikator utama "aksesibilitas" bus perkotaan. Photo: Nutnse0008, CC BY-SA 4.0 (sumber lihat daftar foto di akhir artikel)._

Ada serangkaian gerakan yang sudah dilakukan orang Taiwan sejak kecil, namun sering kali membuat orang asing bingung: Anda harus mengangkat tangan di bawah papan pemberhentian bus; jika tidak, sopir akan melewati halte tanpa berhenti. Saat naik, terdengar bunyi "pip", dan terkadang saat turun pun Anda harus melakukan "pip" sekali lagi. Di balik rangkaian gerakan ini, terdapat sistem pembayaran yang jauh lebih rumit daripada yang dibayangkan.

Titik awal dari rangkaian gerakan ini bermula dari tahun 1977. Sebelum itu, setiap operator bus di Taipei memiliki aturan masing-masing; nomor rute, tarif, dan jenis tiket tidak seragam. Pada tahun 1976, Kota Taipei membentuk "Komite Persiapan Konsorsium Bus Publik-Swasta" untuk menyatukan hal-hal tersebut. Pada 1 Januari 1977, rute konsorsium 202 dan 202 mulai beroperasi sebagai pelopor. Pada 30 April tahun yang sama, tahap pertama yang terdiri dari 33 rute bus konsorsium resmi beroperasi[^6]. Makna dari "konsorsium" ini adalah: tidak peduli operator mana yang mengoperasikan bus tersebut, penumpang menggunakan nomor rute yang sama, tarif yang sama, dan jenis tiket yang sama. Inilah titik awal sistem bus perkotaan di Taiwan.

Sistem pembayaran per segmen juga tumbuh dari sini. Setelah area perkotaan meluas hingga ke New Taipei City, satu perjalanan bus mungkin melewati beberapa zona tarif: area kota lama dihitung sebagai satu segmen, sedangkan perluasan ke pinggiran kota dihitung sebagai dua atau tiga segmen. Titik pembagian segmen biasanya ditetapkan di dekat pusat transportasi atau perbatasan kota/kabupaten seperti Jembatan Taipei atau Shilin; naik dan turun dalam rentang dua halte sebelum dan sesudah titik tersebut masih dihitung sebagai satu segmen (ini disebut "zona penyangga"). Itulah sebabnya saat menaiki rute lintas segmen, Anda harus melakukan _tap_ saat naik dan juga saat turun: sistem perlu mengetahui berapa banyak segmen yang Anda lalui untuk memotong biaya yang sesuai. Jawaban atas kebingungan teman-teman asing mengenai "mengapa terkadang naik lewat pintu depan, dan terkadang lewat pintu belakang" juga tersembunyi di sini: di mana Anda naik atau turun, serta apakah harus melakukan _tap_ satu kali atau dua kali, semuanya bergantung pada bagaimana rute tersebut dibagi segmennya.

Kartu pembayaran itu sendiri juga mengalami evolusi. EasyCard diluncurkan secara menyeluruh pada bus pada akhir September 2002[^7], sementara iPASS di Kaohsiung diluncurkan bersamaan dengan MRT Kaohsiung pada tahun 2014[^7]. Sistem _tap_ dua arah (saat naik dan saat turun) mulai diterapkan dalam tahap pertama pada 1 Juli 2019, dan diterapkan secara penuh pada tahap kedua pada Februari 2020. Tujuannya adalah untuk menghitung biaya per segmen secara akurat, memberikan diskon transit, serta mengumpulkan data naik-turun penumpang[^8]. Perlu dikoreksi sebuah kesalahan umum yang sering terjadi: sistem _tap_ dua arah dimulai pada tahun 2019, bukan 2012. iPASS juga diluncurkan pada 2014, bukan 2012.

Namun, sistem ini juga memiliki keterbatasannya. Volume penumpang bus perkotaan di Taiwan sangat terkonsentrasi di wilayah Taipei dan New Taipei: pada tahun 2020, kedua wilayah ini menyumbang 73,7% dari total volume penumpang bus perkotaan di seluruh Taiwan[^9]. Sebuah bus rute utama di Taipei dapat datang setiap 4 hingga 6 menit pada jam sibuk, dan orang Taipei merasa menunggu selama 5 menit saja sudah terlalu lama. Di waktu yang sama, sebuah halte di wilayah tengah, selatan, atau timur mungkin hanya memiliki satu bus per jam, dengan bus terakhir berhenti beroperasi pada pukul lima atau enam sore. Sistemnya sama, namun ketika diterapkan di tempat yang berbeda, memberikan pengalaman hidup yang sangat berbeda.

## Google Tahu Berapa Menit Lagi Bus Anda Akan Tiba karena Taiwan Membuka Datanya secara Terbuka

Saat Anda membuka ponsel, Anda melihat hitung mundur "tiba dalam 3 menit". Hal ini tampak seperti sesuatu yang lumrah, namun sebenarnya merupakan sebuah pencapaian di Taiwan yang jarang diketahui orang.

Taiwan mulai mendata informasi transportasi umum nasional dan menetapkan standar seragam sejak tahun 2015, membangun platform PTX pada tahun 2016, dan mengintegrasikannya serta meningkatkannya menjadi TDX (Transport Data Exchange) yang sekarang pada Desember 2022[^10]. Skalanya: ribuan kumpulan data, lebih dari 4,9 juta panggilan API setiap hari, akumulasi sirkulasi lebih dari 540 juta entri data, dan digunakan oleh lebih dari 3.000 penyedia layanan nilai tambah[^11]. Yang lebih krusial adalah informasi kedatangan bus di Google Maps untuk Taiwan memang diperoleh melalui mitra lokal yang mengakses data TDX/PTX[^11]. Hal ini menjadikan Taiwan salah satu dari sedikit tempat di dunia yang memiliki "prediksi kedatangan bus dengan granularitas tinggi di Google Maps".

Namun, kita harus jujur dan tidak melebih-lebihkannya. Data terbuka Taiwan adalah "pemimpin regional", bukan "kelas dunia" yang didukung oleh penilaian internasional. Taiwan menggunakan format OData kustom "bintang empat", bukan standar GTFS/GTFS-RT yang berlaku secara internasional, sehingga lebih sulit untuk diintegrasikan secara langsung ke dalam ekosistem global. Tidak ada pula organisasi internasional yang mencantumkan Taiwan sebagai tolok ukur data terbuka[^12]. Kekuatannya terletak pada skala dan penyebarannya, namun kelemahannya adalah keterhubungan standar dengan dunia internasional.

Selain itu, secerdas apa pun sistem di balik layar (backend), hal itu tidak dapat menyelamatkan pengalaman pengguna di sisi depan (frontend). Semua aplikasi bus tersebut (seperti bus Taipei dan lainnya, berbagai BusTracker, Cloud Bus) sebenarnya terhubung ke TDX yang sama di bagian backend; hanya antarmukanya saja yang berbeda[^13]. Jadi, waktu kedatangan yang Anda lihat di aplikasi A akan persis sama dengan aplikasi B, karena mereka menggunakan sumber data yang sama. Masalah sebenarnya terletak pada sumber datanya: sinyal GPS akan bergeser (drift) di area perkotaan yang dipenuhi gedung-gedung tinggi, sehingga prediksi kedatangan bus pun ikut bergeser.

Gambaran yang paling nyata adalah keluhan netizen Taichung di PTT. Seorang pengguna bernama LeiHide menulis: "Terakhir kali saya melihat aplikasi untuk menunggu bus, aplikasi menunjukkan ada 2 bus yang akan masuk ke halte, tapi kenyataannya tidak ada satu pun yang datang" "Benar-benar jadwal hantu". Pengguna lain, teddykitty, mengatakan: "Padahal seharusnya ada jadwal jam 6:50, tapi hasilnya saya dan dua orang kakak perempuan lainnya yang tidak saling kenal hanya bisa menunggu dengan bodohnya"[^14]. Backend-nya adalah data terbuka yang seragam di seluruh Taiwan, namun frontend-nya adalah tiga orang asing yang berdiri di bawah papan halte bersama-sama menunggu bus yang tidak pernah datang. Inilah wajah paling kontradiktif dari bus di Taiwan.

(Sebagai tambahan untuk poin yang sering disalahpahami: ada orang di internet yang mengatakan bahwa "1968" adalah aplikasi bus Kota Taipei. Sebenarnya bukan. 1968 adalah sistem penomoran rute jalan nasional, dan juga merupakan aplikasi informasi real-time jalan tol milik otoritas jalan raya, tidak ada hubungannya dengan bus di area perkotaan[^13].)

## Dua Bus Datang Bersamaan, Lalu Menunggu dalam Waktu yang Lama

![Halte bus di sisi Jalan Zhengzhou dekat Stasiun Taipei, papan pengumuman dan warga yang sedang menunggu](/article-images/lifestyle/taipei-bus-shelter-2020.webp)
_Halte bus di sisi Jalan Zhengzhou dekat Stasiun Taipei, 2020. Bagi mereka yang tidak memegang kemudi, papan pengumuman adalah titik awal setiap kali keluar rumah, sekaligus tempat penantian yang panjang. Photo: T Gordon Cheng, CC BY-SA 4.0 (sumber lihat daftar foto di akhir artikel)._

Setiap orang yang pernah naik bus pasti memahami keabsurdan ini: menunggu selama 20 menit tanpa ada satu bus pun yang lewat, lalu tiba-tiba dua bus dengan nomor yang sama datang beriringan masuk ke halte.

Fenomena ini disebut "bunching" (bus berkelompok), sebuah karakteristik fisik dari sistem bus yang tidak ada hubungannya dengan apakah pengemudinya malas atau tidak. Jika bus pertama sedikit terlambat, jumlah penumpang yang menumpuk di sepanjang rute akan bertambah, waktu untuk naik dan turun pun menjadi lebih lama, sehingga bus tersebut melaju semakin lambat. Sebaliknya, bus di belakangnya justru melaju lebih lancar karena penumpang telah diangkut oleh bus di depannya, sehingga ia mengejar dan semakin mendekat, hingga akhirnya kedua bus tersebut menempel bersama. Semakin panjang interval antar-bus pada suatu rute, semakin parah efek bola salju ini terjadi.

Bagi warga Taipei, _bunching_ adalah hal yang menjengkelkan. Bagi penduduk di daerah terpencil, _bunching_ adalah sebuah kemewahan—mereka bahkan tidak akan pernah mengalami situasi "dua bus datang bersamaan" karena dalam sehari hanya ada beberapa jadwal saja. Hal ini membawa kita kembali pada celah perkotaan dan pedesaan yang tak kasat mata: warga Taipei mengeluh menunggu 5 menit terlalu lama karena mereka memiliki pilihan untuk mengeluh. Sementara itu, orang di pedesaan Changhua yang harus menunggu 40 menit dalam sehari, atau bahkan hanya tersisa dua jadwal bus dalam sehari, tidak punya pilihan untuk mengeluh. Kata yang sama digunakan untuk mengukur dua situasi yang sepenuhnya berbeda. Semakin sedikit pilihan yang dimiliki seseorang, semakin sulit bagi mereka untuk mendapatkan bus—kalimat ini akan terus muncul berulang kali dalam artikel ini.

## Bagaimana Bus Ilegal Menjadi United Bus

![Bus jarak jauh jalan tol Kuo-Kuang Motor Transport, nomor plat KKA-1897](/article-images/lifestyle/kuokuang-intercity-coach-2026.webp)
_Bus jarak jauh jalan tol milik Kuo-Kuang Motor Transport, tahun 2026. Pendahulunya adalah Taiwan Bus yang merupakan monopoli Biro Jalan Raya; pada tahun 2001, perusahaan ini diambil alih melalui pengumpulan dana oleh ribuan karyawannya. Photo: Wei Ting Hsu, CC BY-SA 4.0 (lihat sumber foto di akhir artikel)._

Untuk memahami mengapa bus saat ini memiliki bentuk seperti sekarang, kita harus melihat kembali bagaimana industri ini berkembang dari monopoli tunggal menjadi sangat kompetitif di jalanan.

Titik awal transportasi bus jalan raya di Taiwan adalah Biro Jalan Raya Provinsi Taiwan yang didirikan pada tahun 1946. Pada tahun 1977, unit bisnis transportasi bus dari Biro Jalan Raya dipisahkan untuk membentuk Taiwan Bus (singkatan: Tai-Qi), yang pada masa kejayaannya memiliki lebih dari 500 rute, 3.600 kendaraan, dan puluhan ribu karyawan[^15]. Itu adalah era di mana Biro Jalan Raya memonopoli transportasi bus jarak jauh, sebuah masa yang masih diingat oleh generasi tua.

Titik balik terjadi di sekitar masa pencabutan darurat militer (dekriminalisasi). Pada akhir 1980-an, mulai bermunculan banyak "bus ilegal" (sering disebut _yeji che_) yang tidak memiliki plat nomor dan mengangkut penumpang secara pribadi. Alih-alih terus melakukan penertiban yang tak kunjung usai, Kementerian Perhubungan memilih untuk membimbing mereka agar menjadi legal. Pada 6 September 1989, United Bus (Tonglian) resmi didirikan dengan nama yang diambil dari makna "memimpin segala penjuru dan beroperasi secara terpadu" oleh Zhang Jia-zhu, yang saat itu menjabat sebagai Direktur Institut Penelitian Transportasi Kementerian Perhubungan. Ini menjadi perusahaan bus jalan tol swasta pertama yang legal di Taiwan[^16]. Begitu pasar terbuka, perusahaan seperti Hezxin, Kamalan, Aloha, dan Capital Bus menyusul bergabung, mengubah transportasi jarak jauh dari monopoli tunggal menjadi persaingan antara banyak pemain.

```tw-timeline
1946 | Pendirian Biro Jalan Raya Provinsi Taiwan | Dioperasikan langsung oleh pemerintah, memonopoli bus jalan raya di Taiwan
1977 | Pendirian mandiri Taiwan Bus | Pemisahan unit bisnis transportasi dari Biro Jalan Raya, mencapai puluhan ribu karyawan pada masa kejayaan
1989 | Pendirian United Bus | Bus ilegal dilegalkan, perusahaan bus jalan tol swasta pertama
2001 | Kuo-Kuang Motor Transport mengambil alih | Taiwan Bus rugi NT$5 miliar per tahun, ribuan karyawan mengumpulkan dana untuk mendirikan Kuo-Kuang
Sumber: Sejarah perkembangan Biro Jalan Raya, Taiwan Bus, dan Kuo-Kuang (Taiwan Bus dengan 500+ rute, 3.600 kendaraan, 1.090 karyawan yang mengumpulkan dana pada tahun 2001) serta laporan pendirian United Bus tahun 1989[^15][^16]
```

Sektor milik pemerintah tidak berjalan semulus itu. Taiwan Bus mengalami kerugian selama bertahun-tahun, dengan kerugian sekitar NT$5 miliar per tahun yang ditutupi oleh kas negara; setelah kompetisi dibuka, jumlah rute dan tenaga kerja menyusut drastis[^15]. Pada Juni 2001, sebanyak 1.090 karyawan Taiwan Bus masing-masing menyetorkan dana sebesar NT$300.000 untuk mendirikan Kuo-Kuang Motor Transport, yang pada bulan Juli mengambil alih 96 rute milik Taiwan Bus sebelumnya[^15]. Banyak karyawan paruh baya berusia empat puluh hingga lima puluh tahun yang belum memenuhi syarat pensiun melakukan protes terkait hal ini. Nama "Kuo-Kuang" sebenarnya berasal dari model bus emas Taiwan Bus tahun 1967; sebuah era berakhir, meninggalkan merek dagangnya untuk mereka yang mengambil alih.

(Sejarah institusional ini hanyalah latar belakang. Detail mengenai nostalgia wisata dari lini bus Jinma hingga Kuo-Kuang, serta maraknya bus ilegal pada masa itu, merupakan bagian dari artikel lain tentang bus pariwisata; di sini hanya berfungsi sebagai referensi singkat.)

## Mulai Beroperasi Jam 5.30 Pagi, Selesai Jam 8 Malam, Libur Empat Hari Sebulan

Tidak ada orang jahat yang menarik bus satu per satu dari jalanan. Alasan paling langsung sangat sederhana: tidak ada orang yang mau mengemudi.

Angkanya terlihat dingin saat dipaparkan. Jumlah pengemudi bus kota turun dari 11.811 orang pada tahun 2015 menjadi 10.588 orang pada tahun 2023, sementara usia rata-rata menua dari 45,2 tahun menjadi 51,2 tahun dalam periode yang sama—menua 6 tahun dalam satu dekade[^17]. Kondisi transportasi bus antar kota jauh lebih buruk; jumlah pengemudi turun dari 5.646 orang pada tahun 2019 menjadi 3.551 orang pada tahun 2024, berkurang lebih dari sepertiga dalam enam tahun[^3]. Kekurangan di seluruh Taiwan mencakup 1.443 orang untuk bus kota dan 772 orang untuk bus antar kota; jika digabungkan dengan bus pariwisata, total kekurangan pengemudi kendaraan penumpang besar melebihi 5.000 orang[^17][^3]. Pengemudi muda di bawah usia 35 tahun merosot tajam dari 14% sepuluh tahun lalu menjadi hanya 5,6%[^17]. Industri ini sedang menua dengan cepat, dan tidak ada penerusnya.

```tw-line
Jumlah pengemudi bus semakin sedikit dan semakin tua (Pengemudi Bus Kota)
Tahun | Jumlah Pengemudi | Usia Rata-rata
2015 | 11811 | 45.2
2023 | 10588 | 51.2
Sumber: Kementerian Perhubungan, United Daily News Sunshine Action
```

Mengapa anak muda tidak mau bergabung dan pengemudi senior tidak bisa dipertahankan? Jawabannya ada pada struktur gaji. Investigasi _The Reporter_ terhadap lingkungan kerja Taoyuan Bus menemukan bahwa gaji bulanan pengemudi terdiri dari hingga 14 komponen; gaji pokoknya hanya NT$26.400, sisanya harus mengandalkan uang lembur (mencakup 35% hingga 40%) serta "bonus kilometer" dan "bonus penumpang"[^18]. Masalahnya adalah dua jenis bonus tersebut tidak dihitung ke dalam gaji bulanan tetap, sehingga saat menghitung upah per jam rata-rata untuk uang lembur, wartawan menemukan hasilnya hanya tersisa NT$88[^18]. Jam kerja pun sangat menyiksa: maksimal mengemudi 10 jam sehari, tetapi waktu tunggu saat "menunggu jadwal" tidak dihitung sebagai jam kerja. Satu sif tipikal dimulai dengan keberangkatan jam 5.30 pagi dan selesai jam 8 malam, tertahan di terminal selama 16 jam, dengan hanya libur 4 hingga 5 hari sebulan[^18]. Mengenai asrama pengemudi Taoyuan Bus, wartawan menulis: dalam ruang kurang dari 15 meter persegi (5 pyeong), terdapat 8 tempat tidur tingkat, dan 16 pengemudi harus berbagi satu kamar mandi kecil yang sama[^18].

Struktur ini memaksa individu untuk membuat pilihan-pilihan konkret. Chen Wei-chen, seorang pengemudi aktif di Taoyuan Bus, berkata dengan jujur: "Yang kami butuhkan adalah uang; semua orang bersedia bekerja keras seperti ini demi uang. Hasilnya sekarang perusahaan terus memotong jam kerja Anda, dan pemotongannya semakin tidak masuk akal." Ia menghitung kerugiannya: "Gaji sudah tidak cukup lagi. Awalnya sebulan NT$60.000, sekarang hanya NT$45.000 hingga NT$48.000. Meskipun saya masih punya 6 tahun sebelum pensiun, saya sudah tidak ingin bekerja lagi."[^18]

Ke mana perginya orang-orang yang pergi? Sebagian besar mengalir ke sektor logistik, pengiriman makanan, atau Uber. Xu Yong-fa, mantan pengemudi Taoyuan Bus, beralih menjadi pengemudi logistik setelah berhenti; gaji bulanannya berkurang lebih dari NT$10.000, namun ia mengatakan satu kalimat yang menggambarkan kondisi industri ini: "Mengangkut orang berbeda dengan mengangkut barang; tekanannya tidak besar, tidak perlu merasa was-was, dan perusahaan akan memberikan gaji yang seharusnya." Setelah berhenti, ia "akhirnya tahu apa itu libur akhir pekan (Sabtu-Minggu)"[^18]. Zhang Xian-de, manajer departemen operasional Sanchong Bus, melengkapi logika ini dengan perbandingan yang lebih langsung: "Sama-sama mengemudi... dalam logistik, jika ada masalah, yang jatuh adalah barang dan perusahaan hanya rugi uang; tetapi dalam bus penumpang, jika ada masalah, yang jatuh adalah penumpang, dan Anda bisa kehilangan gigi depan Anda."[^19]

Namun, ini bukan cerita satu sisi tentang "pengemudi yang malang dan penumpang yang jahat". Di sisi penumpang pun terdapat sumber tekanan: satu keluhan pelanggan dapat memotong gaji pengemudi hingga ribuan dolar, sehingga banyak pengemudi mengembangkan sikap defensif—sebisa mungkin menghindari interaksi[^18]. Stereotip di masyarakat bahwa "pengemudi bus mengemudi terlalu cepat dan bersikap buruk" sebenarnya berakar pada struktur nyata berupa jam kerja yang panjang ditambah pemotongan gaji yang sering terjadi. Sementara itu, tekanan dari penumpang yang berperan sebagai "ahli pelapor" adalah sisi lainnya. Kedua belah pihak terjepit oleh sistem yang tidak masuk akal yang sama.

Kalimat yang paling menyesakkan datang dari Fan Guang-ming, seorang pengemudi Taoyuan Bus yang juga aktif dalam gerakan serikat pekerja. Saat berbicara tentang kerja lembur, emosinya meluap: "11 jam atau 8 jam itu omong kosong! Di Taoyuan Bus, tidak ada pengemudi yang tidur lebih dari 8 jam!"[^18]. Namun, ketika ia berbicara tentang dirinya yang karena mengejar jadwal sehingga tidak sempat mendampingi ayahnya di saat-saat terakhir, kemarahannya berubah menjadi penyesalan: "Saat saya sampai di rumah sakit, kain putih sudah menutupi jenazah; saya bahkan tidak sempat memanggilnya 'Ayah'. Pada hari pemakaman, saya bersujud 12 kali kepada ayah saya. Saya adalah anak yang tidak berbakti."[^18]

> 📝 **Catatan Kurator**: Saat kita berdiri di bawah papan pemberhentian bus dan mengeluh "mengapa bus belum datang juga" atau "mengapa mengemudinya begitu cepat", di balik keluhan tersebut berdiri seseorang yang bergantian sif di asrama sempit berukuran 15 meter persegi, yang bekerja keras demi upah rata-rata NT$88 hingga tidak sempat melihat ayahnya untuk terakhir kali. Akar dari krisis pengemudi jauh lebih kompleks daripada sekadar "anak muda tidak mau bersusah payah": sebuah struktur yang menggunakan gaji tetap terendah dan waktu tunggu terlama untuk menopang pekerjaan dengan risiko kegagalan tertinggi (yang jatuh adalah penumpang), akhirnya tidak lagi mampu bertahan. Bus tidak bisa beroperasi karena semakin sedikit orang yang bersedia terjepit dalam sistem seperti ini.

## Setelah Hsinchu Bus Berhenti Beroperasi

![Bus kecil Happiness Bus di daerah pedesaan Kabupaten Hsinchu berhenti di titik awal, badan bus bertuliskan "Happiness Bus"](/article-images/lifestyle/happy-bus-hsinchu-rural-2025.webp)
_Happiness Bus di daerah pedesaan Hukou dan Baoshan, Kabupaten Hsinchu, tahun 2025. Setelah Hsinchu Bus menarik diri dari wilayah Tao, Zhu, dan Miao, minibus berbasis reservasi ini mengambil alih sebagian rute yang dihentikan. Photo: T Gordon Cheng, CC BY-SA 4.0 (sumber lihat daftar foto di akhir artikel)._

Di mana krisis kekurangan pengemudi ini meledak pertama kali? Di tempat dengan pilihan paling sedikit.

Kembali ke adegan di awal. Penarikan diri Hsinchu Bus dari wilayah Tao, Zhu, dan Miao hanyalah satu bagian dari gelombang penarikan diri operator transportasi secara massal. Aloha Bus berhenti beroperasi pada tahun 2022. Hualien Bus mengakhiri sebagian operasinya pada akhir 2023; empat perusahaan di Taichung yaitu Renyou, Fengrong, Sifang, dan Jieshun telah keluar; sementara Kuo-Kuang Bus yang menghubungkan Taiwan dengan Tiongkok daratan memiliki akumulasi utang lebih dari NT$2 miliar, mengalami dua kali keterlambatan pembayaran gaji dalam paruh pertama tahun 2025, bahkan sempat berencana menghentikan 14 rute[^20]. Chang Sheng-hsiung, profesor Departemen Manajemen Transportasi di Universitas Tamkang, menunjuk akar masalahnya dengan satu kalimat: "Meskipun harga tarif yang ditekan dalam jangka panjang meringankan beban masyarakat, hal ini juga membatasi kualitas bus dan layanan transportasi umum."[^21] Karena tarif ditekan rendah, operator tidak bisa menghasilkan keuntungan dan hanya bisa bertahan hidup dengan mengandalkan subsidi; ketika subsidi tidak lagi mencukupi, rute-rute pun mulai dihentikan satu per satu.

Inilah yang digambarkan oleh para akademisi sebagai lingkaran setan: pengurangan jadwal, hilangnya penumpang, lalu pengurangan jadwal kembali. Begitu frekuensi perjalanan menjadi jarang, penumpang akan hilang; begitu penumpang hilang, kerugian membengkak; begitu kerugian membengkak, operator akan memangkas jadwal lagi. Saat Li Chien-wen, General Manager dari Capital Group, berbicara mengenai rute yang semakin beroperasi justru semakin merugi, ia mengatakan kata "tidak ada solusi" sebanyak dua kali: "Tidak ada solusi, benar-benar tidak ada solusi," karena bagi rute yang merugi, "semakin banyak penumpang yang diangkut, semakin besar kerugiannya"[^22]. Subsidi untuk daerah pedesaan di Taiwan dihitung berdasarkan selisih antara "biaya per kilometer kendaraan dikurangi pendapatan"; rute dengan rata-rata kurang dari 2 penumpang per kilometer dapat mengajukan subsidi[^23]. Namun, dana subsidi terbatas, dan orang yang bersedia mengemudi jauh lebih terbatas lagi.

Lantas, apakah lansia di daerah pedesaan yang paling bergantung pada bus akan ditinggalkan begitu saja? Ada sebuah titik balik yang mudah tertutup oleh narasi pesimis. Sejak tahun 2016, Taiwan mulai menguji coba _Demand Responsive Transport_ (DRTS), yang pada tahun 2019 dinamakan "Happiness Bus" atau "Happiness Taxi". Sistem ini tidak menjalankan jadwal tetap, melainkan menggunakan minibus atau taksi berbasis reservasi; mereka akan pergi ke mana pun ada orang yang memesan. Biaya per kilometer kendaraannya berkisar antara NT$30 hingga NT$40, lebih rendah daripada biaya bus konvensional yang sebesar NT$45,85[^24]. Berkat mekanisme pengganti ini, cakupan transportasi umum di daerah pedesaan meningkat dari 70% pada tahun 2016, naik menjadi 91,96% pada tahun 2023, hingga mencapai 94,37% pada Maret 2025, dengan target mencapai 100% pada tahun 2028[^25]. Ke-12 rute di Miaoli yang ditinggalkan oleh Hsinchu Bus justru diserahkan kepada Happiness Taxi untuk diambil alih[^1]. Di balik bus besar yang telah pergi itu, satu per satu taksi berbasis reservasi datang mengisi kekosongan.

```tw-line
Cakupan Transportasi Umum Pedesaan: Bus Besar Keluar, Minibus/Taksi Mengisi (%)
Tahun | Cakupan
2016 | 70
2023 | 91.96
2025 | 94.37
Sumber: Eksekutif Yuan, Biro Jalan Raya Kementerian Perhubungan, CNA
```

Memang benar bahwa cakupan telah kembali ke angka di atas 90%, tetapi jangan mengartikannya sebagai "masalah telah selesai". Jumlah orang yang mampu menggunakan minibus reservasi jauh lebih sedikit daripada kapasitas satu bus besar; sistem reservasi terlebih dahulu juga menyaring sebagian lansia yang ingin bepergian mendadak atau mereka yang tidak mahir menggunakan ponsel. Ini adalah solusi sementara yang jujur, bukan sebuah kemenangan mutlak.

## Penumpang Bus Jarak Jauh yang Tergerus oleh HSR

Yang mendorong bus ke jurang bukan hanya kelangkaan pengemudi, tetapi juga kehadiran kereta cepat (HSR) yang melaju di atasnya.

Setelah HSR mulai beroperasi pada tahun 2007, terjadi perpindahan besar-besaran penumpang jarak jauh di koridor barat. Frekuensi bus antar kota melalui jalan tol berkurang drastis: berdasarkan data dari Biro Jalan Raya yang dihimpun oleh Radio Central dan United Daily News, frekuensi bus jalan tol turun sekitar 40% dari tahun 2016 hingga 2024, dengan jumlah penumpang menurun sebesar 32,8%[^26]. Indikator lainnya adalah jumlah rute; jumlah rute bus umum di jalan raya menurun sebesar 43,7% dari tahun 2012 hingga 2022[^27]. (Kedua angka ini berbeda karena yang satu menghitung frekuensi perjalanan dan yang lainnya menghitung jumlah rute, serta memiliki tahun dasar yang berbeda, jadi jangan dianggap sebagai hal yang sama.) Untuk rute jarak jauh di wilayah barat seperti Taipei ke Kaohsiung, hingga kini hanya pulih sekitar 60% lebih dibandingkan sebelum pandemi; sementara untuk rute utara Hualien di bagian timur, rutenya telah digabungkan hingga hanya menyisakan satu perusahaan, yaitu Kavalan, yang beroperasi pada hari libur[^26]. Rata-rata jarak tempuh penumpang juga memendek dari 93 km menjadi 67 km; penumpang jarak jauh telah diambil oleh HSR, meninggalkan penumpang jarak menengah dan pendek[^26].

Konsekuensi yang paling nyata adalah stasiun transfer yang berubah menjadi kota mati. Para penyewa di lantai dua Taipei Bus Station telah mengembalikan sewa mereka, membuat seluruh lantai tersebut menjadi ruang kosong yang menunggu penyewa baru[^28]; beberapa pusat transfer yang dibangun di Taichung juga dikhawatirkan akan menjadi gedung yang sepi pengunjung. Menghadapi fenomena "longsor" ini, Biro Jalan Raya meluncurkan rencana penyesuaian jaringan jalan pada tahun 2025 yang disebut sebagai "yang terbesar dalam 30 tahun terakhir"[^20]. Ini merupakan pengakuan bahwa jaringan jalan lama sudah tidak mampu lagi menopang kebutuhan, sekaligus sebuah upaya untuk melakukan penataan ulang secara menyeluruh.

## Kemajuan Kota, dan Batasannya

Jika kita mengalihkan lensa kembali ke area perkotaan, kita akan melihat wajah yang sepenuhnya berbeda. Dengan sistem yang sama, sisi perkotaan sedang melangkah maju dengan cepat, namun setiap langkahnya menapak pada batas kemampuannya sendiri.

Kemajuan pertama adalah bus jalur utama (_trunk bus_). Kota Taipei melakukan klasifikasi ulang jaringan rute bus antara tahun 2017 hingga 2018; pada jam sibuk, frekuensi rute jalur utama sangat padat, yakni setiap 4 hingga 6 menit sekali, sehingga mudah dipahami dan ditunggu layaknya MRT[^29]. Kemajuan kedua adalah tiket bulanan komuter TPASS. Program ini berasal dari janji kampanye pemilu tahun 2022 dan mulai beroperasi pada Juli 2023. Untuk tiga tahun pertama, telah dialokasikan anggaran khusus sebesar NT$20 miliar: tiket bulanan NT$1.200 untuk wilayah Keelung-Taipei-New Taipei-Taoyuan; NT$699 atau NT$999 untuk wilayah Miaoli-Zhongli-Changhua-Taung</sub>; dan NT$999 untuk wilayah Kaohsiung-Tainan-Pingtung, yang memungkinkan pengguna naik bus dan MRT sepuasnya[^30].

Laporan kinerja TPASS harus dibaca dari dua sisi. Sisi positifnya adalah program ini memang berhasil menarik orang untuk naik kendaraan umum: volume penumpang bus meningkat 19,6% dan MRT meningkat 36,9%[^31]. Namun, jika dikatakan bahwa program ini mengubah pengendara mobil atau motor menjadi pengguna transportasi umum, hasilnya sangat terbatas: survei tatap muka di Kota Taipei menunjukkan bahwa proporsi peralihan nyata dari kendaraan pribadi ke transportasi umum hanya sebesar 7,33%[^32]. Dengan kata lain, sebagian besar penumpang tambahan adalah mereka yang "memang sudah naik transportasi umum dan sekarang naik lebih sering", bukan "yang tadinya menyetir sendiri lalu sekarang beralih menggunakan transportasi umum".

Hal yang lebih realistis adalah masalah keuangan: anggaran khusus TPASS sebesar NT$20 miliar akan berakhir pada akhir tahun 2025. Rencana baru berikutnya memiliki skala NT$36,38 miliar, namun menghadapi risiko penghentian pendanaan karena total anggaran tertahan di Legislatif. Sebanyak 20 kabupaten dan kota di seluruh Taiwan terdampak, dan banyak penyedia layanan lokal harus bertahan dengan menggunakan dana talangan terlebih dahulu[^32][^33]. Sebuah kebijakan bagus yang berhasil menarik orang untuk naik kendaraan umum kini sedang terjebak dalam kebuntuan politik.

![Bus listrik BYD K9 milik Taipei Bus melintas di depan Kebun Binatang Kota Taipei](/article-images/lifestyle/electric-bus-byd-taipei-2026.webp)
_Bus listrik BYD K9 milik Taipei Bus melintasi Kebun Binatang Kota Taipei, tahun 2026. Pada tahun 2030, bus kota ditargetkan untuk sepenuhnya beralih ke tenaga listrik, namun pada tahun 2024 baru sekitar 18% yang beroperasi. Photo: 厦门金龙永远的神, CC BY 4.0 (Sumber lihat daftar foto di akhir artikel)._

Elektrifikasi adalah kemajuan ketiga bagi kota, sekaligus yang memiliki kesenjangan paling mencolok. Pemerintah menyatakan bahwa pada tahun 2030 bus kota akan sepenuhnya beralih ke tenaga listrik, dengan target mengganti hampir sepuluh ribu bus berbahan bakar fosil (stok saat ini sekitar 9.400 unit) dan target pengadaan subsidi sebanyak 11.700 unit. Seluruh rencana ini telah disetujui pada Juni 2023 dengan anggaran sebesar NT$64,3 miliar[^34]. Idealismenya tinggi, namun realitasnya lambat: hingga tahun 2024, bus listrik yang benar-benar beroperasi hanya sekitar 1.926 unit atau sebesar 18%, dan ada 7 kabupaten/kota yang jumlahnya masih nol[^35].

```tw-bars
Jarak menuju Elektrifikasi Penuh 2030 (Progres Elektrifikasi Bus Kota)
Bus listrik yang sudah beroperasi 2024 | 1926 | Proporsi 18%
Target pengadaan subsidi 2030 | 11700 | Tujuh kabupaten/kota saat ini masih nol
Sumber: Eksekutif Yuan, Kementerian Perhubungan, akhir tahun 2024
```

Di mana hambatannya? Dari penyaluran subsidi ke persetujuan tingkat daerah, hingga penandatanganan kontrak aktual, terjadi kebocoran di setiap lapisan (kuota turun dari 20,8 miliar menjadi 14,04 miliar, lalu turun lagi menjadi 7,44 miliar); selain itu, peralatan pengisian daya sangat mahal, satu stasiun pengisian membutuhkan biaya lebih dari NT$60 juta[^35]. Jika harga satu unit bus dinyatakan sebesar NT$11 juta dan subsidi yang diberikan adalah NT$6,8 juta, operator masih harus menyediakan dana mandiri sebesar NT$4,2 juta. Bagi industri yang sudah kesulitan bertahan dengan mengandalkan subsidi dan bahkan sulit mencari sopir, ini adalah keputusan finansial yang sangat berat.

> 📝 **Catatan Kurator**: Tiga hal di kota ini (bus jalur utama, tiket bulanan, dan elektrifikasi) jika dilihat secara terpisah tampak seperti daftar kemajuan. Namun, ketiganya memiliki satu prasyarat tersembunyi yang sama: harus ada orang yang mengemudikan kendaraan tersebut. Ketika usia rata-rata pengemudi mencapai 51 tahun dan kekurangan tenaga kerja melebihi 5.000 orang, secerdas apa pun tiket bulanan atau sehijau apa pun bus listrik, semuanya hanyalah cangkang besi yang terparkir di terminal. Kemajuan di sisi perkotaan itu nyata, namun ia sedang melaju kencang di atas fondasi tenaga kerja yang menua dengan cepat.

## Taiwan Bukanlah Kasus Tunggal

Jika melihat ke luar negeri, akan ditemukan bahwa kesulitan yang dihadapi Taiwan tidaklah sendirian.

Transportasi umum Jepang yang selama ini dikagumi, di area pedesaannya sudah mengalami keruntuhan: 85% operator bus pedesaan mengalami kerugian, usia rata-rata pengemudi taksi di Hiroshima adalah 63 tahun, dan lebih dari 20% populasi tinggal di tempat yang terlalu jauh dari stasiun atau halte bus[^36]. Di Seoul, Korea Selatan, sedang ada diskusi serius mengenai perekrutan pengemudi asing karena hampir setengah dari pengemudi aktif berusia di atas 60 tahun[^37]. Di Eropa, terdapat 129 juta orang yang tinggal di wilayah dengan transportasi umum yang tidak memadai, dan pendapatan tiket bus pedesaan di Inggris bahkan tidak mencapai 25% dari biaya operasionalnya[^38]. "Hilangnya populasi pedesaan, penuaan pengemudi, dan penyusutan rute" adalah masalah struktural bersama di Asia Timur hingga ke seluruh dunia; perbedaannya di Taiwan hanyalah ketergantungan pada sepeda motor yang lebih dalam, yang membuat bus sejak awal hidup di bawah bayang-bayang sepeda motor.

Hal yang menarik adalah, ada satu hal di Taiwan yang justru dijadikan tolok ukur internasional secara terbalik. Organisasi advokasi transportasi di California, Amerika Serikat, yaitu Seamless Bay Area, menjadikan TPASS sebagai contoh yang dapat dipelajari oleh California, dan merangkum tiga elemen keberhasilannya: subsidi yang memadai, kemauan politik dari pemerintah pusat, serta fleksibilitas pelaksanaan di tingkat lokal[^39]. Dan pihak yang paling diuntungkan oleh TPASS justru bukanlah elit perkotaan, melainkan daerah terpencil. Setelah TPASS diluncurkan, penggunaan bus di Hualien tumbuh sebesar 69,8%, yang merupakan contoh dengan efek pedesaan paling signifikan dalam analisis ini[^39].

```tw-figure
+69,8%
Pertumbuhan penggunaan bus di Hualien setelah peluncuran TPASS—sebuah tiket bulanan murah memberikan dampak terbesar di tempat dengan pilihan paling terbatas
Analisis Seamless Bay Area
```

Angka ini secara langsung mematahkan anggapan bahwa "bus adalah mainan elit perkotaan". Sebuah tiket bulanan yang murah, di Taipei mungkin hanya menjadi tambahan kenyamanan, namun di Hualien, hal tersebut benar-benar menurunkan biaya untuk bepergian. Semakin sedikit pilihan yang tersedia di suatu tempat, semakin besar dampak dari sedikit perbaikan yang diberikan.

## Bus Terakhir, Menuju Mereka yang Paling Membutuhkannya

Kembali ke pagi itu di Stasiun Kereta Api Tonglu.

Lebih dari 30 orang tersebut, mulai dari anak-anak taman kanak-kanak hingga lansia berusia 90 tahun, bertepuk tangan untuk melepas keberangkatan bus terakhir Hsinchu Bus rute 5658. Dari bus konsorsium pertama di Taipei pada tahun 1977, hingga transformasi kendaraan ilegal menjadi United Bus pada tahun 1989, lalu peran data terbuka yang mendukung hitung mundur Google, hingga kini menghadapi realitas sopir dengan usia rata-rata 51 tahun dan rute-rute pedesaan yang satu per satu dihentikan; sistem ini telah bertahan hingga hari ini untuk mengangkut kelompok orang yang sama: mereka yang tidak memegang kemudi dan tidak bisa melakukan perjalanan sendiri. Bagian paling kejam dari sistem ini adalah ia justru berhenti tepat di bawah kaki mereka yang paling membutuhkannya.

Namun cerita tidak berakhir pada bus besar yang telah pergi itu. Setelah tepuk tangan mereda, 12 rute di Miaoli tersebut digantikan oleh armada Happiness Bus (bus kuning kecil). Penumpang cukup menelepon, dan kendaraan akan datang ke depan pintu rumah. Ini bukanlah sebuah kemenangan mutlak: minibus berbasis reservasi ini mengangkut lebih sedikit orang, memerlukan pemesanan terlebih dahulu, dan tidak semua orang bisa mendapatkannya. Namun, ini adalah sebuah sinyal: ketika bus besar tidak lagi mampu bertahan, sistem ini sedang mencoba menggunakan bentuk lain untuk kembali merangkul mereka yang seharusnya dilayani. Cakupan layanan di daerah pedesaan kembali ke angka 94%, bukan karena jumlah bus bertambah, melainkan karena masyarakat belum berniat meninggalkan kelompok orang ini begitu saja.

Lain kali saat Anda berdiri di bawah papan pemberhentian bus, entah itu di Taipei sambil mengeluh karena menunggu terlalu lama, atau di pedesaan Changhua menunggu salah satu dari dua jadwal harian, ingatlah bahwa yang Anda tunggu bukan sekadar sebuah kendaraan. Anda sedang menunggu sebuah sistem yang tengah berjuang keras demi "mereka yang tidak memiliki kemudi", dan sistem yang paling pertama merasa sesak napas di tempat-tempat yang paling membutuhkannya. Apakah bus tersebut dapat datang atau tidak, tolok ukurnya bukanlah efisiensi transportasi. Tolok ukurnya adalah pilihan sebuah masyarakat: apakah mereka bersedia mengangkut mereka yang tidak bisa melakukan perjalanan sendiri.

Bus 5658 terakhir itu telah pergi. Namun selama masih ada orang yang mengangkat tangan di bawah papan pemberhentian, maka akan selalu ada satu kendaraan yang berhutang untuk datang menjemput mereka.

**Bacaan Lanjutan**: [Sistem Transportasi Taiwan](/id/lifestyle/transportation-system), [Budaya Sepeda Motor Taiwan](/id/lifestyle/taiwan-scooter-culture), [Sejarah Perkembangan MRT Taiwan](/id/lifestyle/history-of-taiwan-mrt-development), [Bus Pariwisata](/id/lifestyle/tour-bus)

## Sumber Gambar

Artikel ini menggunakan 6 gambar berlisensi Creative Commons, yang semuanya telah di-cache ke dalam `public/article-images/lifestyle/` untuk menghindari hotlinking ke server sumber:

- [Holly Cheng](https://commons.wikimedia.org/wiki/File:Taipei_street_scene.jpg) — Sepeda motor dan bus di persimpangan jalan Taipei (hero), 1996, CC BY-SA 3.0
- [Nutnse0008](https://commons.wikimedia.org/wiki/File:Shing_Nan_Bus_421-U9_20160423.jpg) — Bus lantai rendah Xingnan Bus di Tainan, 2016, CC BY-SA 4.0
- [T Gordon Cheng](<https://commons.wikimedia.org/wiki/File:Taipei_Main_Station_(Zhengzhou)_bus_shelter_20201024.jpg>) — Halte bus Stasiun Taipei, 2020, CC BY-SA 4.0
- [Wei Ting Hsu](<https://commons.wikimedia.org/wiki/File:%E5%9C%8B%E5%85%89%E5%AE%A2%E9%81%8B_KKA-1897_(2026.3.11).jpg>) — Bus jalan tol Kuo-Kuang Bus, 2026, CC BY-SA 4.0
- [T Gordon Cheng](https://commons.wikimedia.org/wiki/File:%E6%B9%96%E5%8F%A3%E9%84%89%E5%B9%B8%E7%A6%8F%E5%B7%B4%E5%A3%AB_1%E8%99%9F%E7%B7%9A_and_%E5%AF%B6%E5%B1%B1%E9%84%89%E5%B9%B8%E7%A6%8F%E5%B7%B4%E5%A3%AB_%E4%B8%89%E5%B3%B0%E7%B7%9A_2025-09-30.jpg) — Happiness Bus di daerah terpencil Kabupaten Hsinchu, 2025, CC BY-SA 4.0
- [厦门金龙永远的神](https://commons.wikimedia.org/wiki/File:Taipei_bus_BYD_K9.jpg) — Bus listrik BYD K9 Taipei Bus, 2026, CC BY 4.0

## Referensi

[^1]: [CNA: Warga Tonglu Berfoto Kenang-kenangan di Bus Terakhir Hsinchu Bus](https://www.cna.com.tw/news/ahel/202409150184.aspx) — Laporan tanggal 15 September 2024, mencatat momen perpisahan bus terakhir rute 5658 Tonglu saat Hsinchu Bus menarik diri dari wilayah Tao, Chu, dan Miao, termasuk transkrip pembicaraan perwakilan warga Xu Yufeng; waktu, lokasi, dan jadwal dapat diverifikasi.

[^2]: [Departemen Statistik Kementerian Perhubungan: Survei Kondisi Penggunaan Alat Transportasi Harian Masyarakat](https://www.motc.gov.tw/ch/app/data/doc?id=55&module=topics&detailNo=1&serno=202201270001&type=s) — Survei resmi alat transportasi dari Kementerian Perhubungan, menyediakan data primer seperti pangsa pasar transportasi umum sebesar 53,3% untuk rumah tangga tanpa kendaraan vs 13,7% untuk rumah tangga dengan kendaraan, serta tingkat penggunaan perjalanan sekolah berdasarkan kelompok usia.

[^3]: [Tai Bao: Longsoran Bus, Pengemudi Bus Jalan Raya Berkurang Sepertiga dalam Enam Tahun](https://www.taisounds.com/news/content/125/204965) — Laporan mengenai penurunan jumlah pengemudi bus jalan raya dari 5.646 orang pada tahun 2019 menjadi 3.551 orang pada tahun 2024, serta defisit utang Kuo-Kuang Bus yang melebihi NT$2 miliar, mengutip statistik Biro Jalan Raya.

[^4]: [ScienceDirect: Studi Perjalanan dan Pengembangan Perkotaan di Kota Sepeda Motor Taiwan](https://www.sciencedirect.com/science/article/abs/pii/S0967070X25002446) — Makalah akademik yang menguantifikasi ketergantungan sepeda motor di Taiwan: 599 unit per seribu orang, 83,7% rumah tangga memiliki sepeda motor, dan hanya 12,5% yang mengandalkan transportasi umum sebagai moda utama.

[^5]: [Vocus: Alat Transportasi dan Kehidupan Pekerja Migran di Taiwan](https://vocus.cc/article/63dcb90efd89780001509011) — Menjelaskan bahwa karena pembatasan pembelian kendaraan dalam jangka panjang akibat kebijakan, pekerja migran di Taiwan menggunakan sepeda motor sebagai alat transportasi utama sehari-hari dan hanya menggunakan bus untuk perjalanan jauh pada hari libur, mengoreksi kesalahpahaman umum bahwa "pekerja migran bergantung pada bus".

[^6]: [Wikipedia: Bus Kota Taipei](https://zh.wikipedia.org/zh-tw/臺北市市區公車) — Mencatat sejarah sistem bus konsorsium Taipei: pembentukan komite persiapan konsorsium pada tahun 1976, dimulainya rute 202/202 pada 1 Januari 1977, dan pengoperasian tahap pertama 33 rute pada 30 April.

[^7]: [Wikipedia: EasyCard](https://zh.wikipedia.org/zh-hk/悠遊卡) — Mencatat lini masa digitalisasi kartu pembayaran, seperti peluncuran penuh EasyCard di bus pada akhir September 2002, dan peluncuran iPASS bersamaan dengan MRT Kaohsiung pada tahun 2014.

[^8]: [Departemen Transportasi Publik Kota Taipei: Siaran Pers Sistem Pembayaran Sensor Dua Arah Saat Naik dan Turun Bus](https://pto.gov.taipei/News_Content.aspx?n=6B4D38874E971F4B&sms=87415A8B9CE81B16&s=954214BF3AA2EA89) — Data primer dari Departemen Transportasi Publik Kota Taipei, menjelaskan implementasi tahap pertama sistem tap kartu dua arah pada 1 Juli 2019, tahap kedua pada Februari 2020, serta tujuan perhitungan tarif per segmen dan diskon transit.

[^9]: [Kementerian Perhubungan: Statistik Volume Penumpang Bus Kota](https://www.motc.gov.tw/ch/app/data/doc?id=55&module=topics&detailNo=1&serno=202112090001&type=s) — Statistik resmi Kementerian Perhubungan, menunjukkan data keras bahwa pada tahun 2020, wilayah New Taipei-Taipei menyumbang 73,7% dari total volume penumpang bus kota di seluruh Taiwan, mencerminkan konsentrasi volume transportasi perkotaan dan pedesaan.

[^10]: [Situs Resmi Layanan Distribusi Data Transportasi TDX](https://tdx.transportdata.tw/) — Platform resmi Kementerian Perhubungan, mencatat sejarah tata kelola data terbuka mulai dari pembangunan PTX pada tahun 2016 hingga integrasi dan peningkatan menjadi TDX pada Desember 2022.

[^11]: [iThome: Skala Data Terbuka TDX dan Penggunaan oleh Google Maps](https://www.ithome.com.tw/news/142077) — Laporan mengenai pemanggilan API TDX yang melebihi 4,9 juta kali setiap hari, sirkulasi 540 juta data, melibatkan lebih dari 3.000 vendor nilai tambah, serta mengonfirmasi bahwa informasi kedatangan bus Taiwan di Google Maps menggunakan data TDX.

[^12]: [Medium: Tutorial API TDX dan Analisis Standar Data](https://medium.com/@ycpin/data-mining-transport-data-exchange-tdx-api-tutorial-and-demonstration-14bba4a58e9b) — Analisis teknis yang menjelaskan bahwa TDX menggunakan format kustom OData "bintang empat", memiliki GTFS Beta tetapi bukan standar internasional umum, dan tidak ditemukan organisasi internasional yang mencantumkan Taiwan sebagai tolok ukur.

[^13]: [Papan Bus PTT: Diskusi Mengenai Backend Aplikasi Bus yang Sama-sama Menggunakan TDX](https://www.ptt.cc/bbs/Bus/M.1613871840.A.47D.html) — Diskusi netizen mengungkapkan bahwa berbagai aplikasi bus terhubung ke backend TDX yang sama, masalah GPS yang tidak stabil di antara gedung tinggi, serta mengklarifikasi bahwa "1968" adalah nomor rute jalan nasional dan aplikasi informasi real-time jalan nasional, bukan aplikasi bus kota.

[^14]: [Papan Taichung PTT: Utas Keluhan Mengenai Jadwal Bus Hantu di Taichung](https://www.ptt.cc/bbs/TaichungBun/M.1691104386.A.D22.html) — Utas diskusi publik tahun 2023, di mana pengguna LeiHide dan teddykitty mendeskripsikan secara verbatim pengalaman "jadwal bus hantu" di aplikasi bus Taichung yang menunjukkan bus tersedia namun tidak kunjung datang; dapat diverifikasi dengan Ctrl-F.

[^15]: [Majalah Taiwan Guanghua: Dari Taiwan Bus ke Kuo-Kuang Bus](https://www.taiwan-panorama.com/Articles/Details?Guid=593707a8-2be1-462d-aed7-73883b3e20f0) — Menjelaskan secara rinci proses privatisasi mulai dari pendirian Biro Jalan Raya pada 1946, pendirian Taiwan Bus pada 1977 yang mengalami kerugian tahunan NT$5 miliar, hingga pada tahun 2001 sebanyak 1.090 karyawan masing-masing menyetor NT$300.000 untuk mendirikan Kuo-Kuang Bus guna mengambil alih 96 rute.

[^16]: [Wikipedia: Tonglian Bus](https://zh.wikipedia.org/zh-tw/統聯客運) — Catatan verbatim mengenai pendirian Tonglian pada 6 September 1989, yang dinamai oleh Direktur Institut Riset Transportasi, Chang Chia-chu, dengan makna 'memimpin empat penjuru dan mengoperasikan secara bersatu', serta merupakan perusahaan bus tol swasta pertama yang legal di Taiwan.

[^17]: [United Daily News Sunshine Action: Investigasi Kelangkaan Pengemudi Bus](https://udn.com/news/story/10098/8766101) — Mengutip data Kementerian Perhubungan, jumlah pengemudi bus kota turun dari 11.811 orang pada November 2015 menjadi 10.588 orang pada tahun 2023, usia rata-rata meningkat dari 45,2 ke 51,2 tahun, dengan kekurangan 1.443 orang di area kota dan 772 orang di jalan raya.

[^18]: [The Reporter: Upah per Jam Hanya NT$88, Realitas Kelelahan Kerja Sopir Bus Taoyuan](https://www.twreporter.org/a/tybus-driver-overwork) — Investigasi mendalam terhadap struktur kerja sopir bus Taoyuan: 14 item gaji, gaji pokok NT$26.400, rata-rata upah per jam hanya tersisa NT$88, dan 16 orang berbagi asrama seluas 5 pyeong; mencakup pernyataan verbatim dari Fan Guang-ming, Chen Wei-chen, dan Xu Yong-fa.

[^19]: [The Reporter: Gelombang Kekurangan Tenaga Kerja di Industri Bus (Bagian 2)](https://www.twreporter.org/a/current-challenges-of-bus-industry-2) — Wawancara verbatim dengan Manajer Departemen Bisnis Sanchong Bus, Chang Hsien-te, dan Kepala Stasiun Nangan, Wang Shuo-chien, mengenai sulitnya mencari sopir bus serta perbedaan tanggung jawab antara mengangkut orang dan barang.

[^20]: [United Daily News: Biro Jalan Raya Memulai Penyesuaian Jaringan Jalan Terbesar dalam 30 Tahun](https://udn.com/news/story/7266/9256802) — Laporan mengenai pengurangan jadwal dan rute bus tol, utang Kuo-kuang Motor Bus yang melebihi NT$2 miliar serta penundaan kenaikan gaji, tren pengunduran diri pelaku usaha, dan rencana penyesuaian jaringan jalan Biro Jalan Raya tahun 2025.

[^21]: [The Reporter: Krisis Kendaraan Kosong Satu Arah Rute 9005 dan Dilema Industri Bus](https://www.twreporter.org/a/current-challenges-of-bus-industry-1) — Mengutip pernyataan verbatim Profesor Chang Sheng-hsiung dari Departemen Manajemen Transportasi Universitas Tamkang mengenai bagaimana penekanan harga tarif dalam jangka panjang membatasi kualitas layanan bus.

[^22]: [The Reporter: Krisis Kendaraan Kosong Satu Arah Rute 9005 dan Dilema Industri Bus](https://www.twreporter.org/a/current-challenges-of-bus-industry-1) — Wawancara verbatim dengan General Manager Grup Capital, Li Chien-wen, yang menyatakan 'tidak ada solusi, benar-benar tidak ada solusi' dan 'semakin banyak penumpang yang diangkut, semakin besar kerugiannya', menganalisis dilema struktural rute yang merugi akibat kendaraan kosong satu arah.

[^23]: [Peraturan Subsidi Rute Bus Layanan Daerah Terpencil Kota Taipei](https://laws.gov.taipei/law/LawSearch/LawArticleContent/FL026380) — Dokumen regulasi yang menetapkan formula subsidi daerah terpencil sebagai (biaya per kilometer per kendaraan yang wajar dikurangi pendapatan) dikalikan jumlah jadwal dikalikan jarak tempuh; dapat diajukan jika penumpang per kilometer per kendaraan kurang dari 2 orang.

[^24]: [Situs Resmi Happiness Bus: Apa itu Happiness Bus](https://www.happybus.com.tw/Whatisbus) — Informasi resmi Biro Jalan Raya yang menjelaskan uji coba Transportasi Responsif Permintaan (DRTS) pada tahun 2016, penamaan 'Happiness Bus' dan 'Happiness Taxi' pada tahun 2019, dengan biaya per kilometer kendaraan antara NT$30 hingga NT$40.

[^25]: [Eksekutif Yuan: Cakupan Transportasi Umum Daerah Terpencil dan Kesetaraan Transportasi](https://www.ey.gov.tw/Page/5A8A0CB5B41DA11E/25b3096e-90ec-42cf-bd2b-5a0b65d409eb) — Data resmi mengenai cakupan transportasi umum di daerah terpencil: 70% pada basis tahun 2016, 91,96% pada tahun 2023, 94,37% pada Maret 2025, dengan target mencapai 100% pada tahun 2028.

[^26]: [Radio Central: Bus Tol di Bawah Dampak Kereta Cepat (HSR)](https://www.rti.org.tw/news?pid=186039&uid=3) — Laporan mengenai penurunan jadwal bus tol sekitar 40% dari tahun 2016 ke 2024 setelah pengoperasian kereta cepat, penurunan jumlah penumpang sebesar 32,8%, rata-rata perjalanan penumpang menyusut dari 93 km menjadi 67 km, dan di wilayah timur hanya beroperasi pada hari libur di area Yilan.

[^27]: [The News Lens: Pengurangan Rute Bus Jalan Raya Umum Selama Puluhan Tahun](https://www.thenewslens.com/article/193854) — Mengutip data Biro Jalan Raya bahwa jumlah rute bus jalan raya umum berkurang 43,7% dari tahun 2012 ke 2022, menunjukkan indikator penurunan dengan metrik yang berbeda dari penurunan jumlah jadwal.

[^28]: [ETtoday: Lantai Dua Stasiun Transit Taipei Menjadi Kota Mati Setelah Pengembalian Sewa](https://www.ettoday.net/news/20241020/2838555.htm) — Laporan mengenai pengosongan penyewa di lantai dua Stasiun Transit Taipei setelah adanya pembagian arus penumpang oleh kereta cepat, yang mencerminkan dampak berantai dari penurunan bus tol terhadap fasilitas transit.

[^29]: [Wikipedia: Bus Jalur Utama Kota Taipei](https://zh.wikipedia.org/wiki/臺北市幹線公車) — Mencatat desain sistem jaringan bus Kota Taipei tahun 2017 dan 2018 dengan empat tingkat klasifikasi, serta frekuensi bus jalur utama setiap 4 hingga 6 menit pada jam sibuk.

[^30]: [The Reporter: Satu Tahun Berjalannya Tiket Komuter Bulanan TPASS](https://www.twreporter.org/a/data-reporter-a-year-after-tpass-was-launched) — Laporan mendalam mengenai asal-usul kebijakan TPASS, tiket bulanan NT$1.200 untuk wilayah Keelung-Taipei-New Taipei-Taoyuan, anggaran khusus sebesar NT$20 miliar selama 3 tahun, dan analisis multifaset mengenai efektivitasnya dalam satu tahun.

[^31]: [Taipei Times: TPASS meningkatkan volume penumpang bus dan MRT](https://www.taipeitimes.com/News/front/archives/2024/07/11/2003820639) — Laporan bahasa Inggris, setelah peluncuran TPASS, volume penumpang bus meningkat 19,6%, MRT meningkat 36,9%, dengan lebih dari 700.000 pengguna.

[^32]: [風傳媒: Tingkat peralihan TPASS hanya 7,33% dan krisis penghentian pendanaan tahun 2026](https://www.storm.mg/lifestyle/11093047) — Laporan mengenai tingkat peralihan kendaraan pribadi yang hanya 7,33%, rencana baru senilai NT$36,38 miliar menghadapi risiko penghentian karena hambatan anggaran umum, yang berdampak pada 20 kabupaten/kota.

[^33]: [PTS News: Rencana lanjutan setelah berakhirnya anggaran khusus TPASS terhambat](https://news.pts.org.tw/article/801336) — Laporan mengenai anggaran khusus TPASS sebesar NT$20 miliar yang akan berakhir pada akhir tahun 2025, rencana baru senilai NT$36,38 miliar terpengaruh oleh peninjauan anggaran umum, dan pemerintah daerah berjuang keras dengan pendanaan mandiri.

[^34]: [Eksekutif Yuan: Kebijakan elektrifikasi bus menyeluruh pada tahun 2030](https://www.ey.gov.tw/Page/5A8A0CB5B41DA11E/fbaa04ca-a430-48e7-8ba1-0b35d1dc4879) — Kebijakan resmi, elektrifikasi bus kota secara menyeluruh pada tahun 2030, hampir sepuluh ribu bus berbahan bakar fosil perlu diganti, target subsidi pembelian adalah 11.700 unit, rencana disetujui pada Juni 2023 dengan anggaran NT$64,3 miliar.

[^35]: [The Epoch Times: Bus listrik yang terdaftar hingga akhir tahun 2024 berjumlah 1.926 unit](https://www.epochtimes.com/b5/25/1/8/n14409087.htm) — Mengutip data Kementerian Perhubungan, bus listrik yang benar-benar beroperasi pada akhir tahun 2024 sekitar 1.926 unit atau 18%, dengan 7 kabupaten/kota mencatat angka nol, serta menjelaskan kesenjangan bertahap dari pemberian subsidi hingga penandatanganan kontrak dan biaya peralatan pengisian daya.

[^36]: [World Economic Forum: Dilema transportasi umum di pedesaan Jepang](https://www.weforum.org/stories/2020/01/japans-much-admired-public-transit-system-is-leaving-its-rural-areas-behind/) — Laporan bahasa Inggris, 85% operator bus pedesaan di Jepang mengalami kerugian, rata-rata usia sopir taksi di Hiroshima adalah 63 tahun, dan lebih dari 20% populasi tinggal terlalu jauh dari stasiun.

[^37]: [Korea Herald: Penuaan sopir bus Seoul dan diskusi mengenai sopir asing](https://www.koreaherald.com/article/10011103) — Laporan bahasa Inggris, hampir setengah dari sopir bus di Seoul berusia di atas 60 tahun dengan kekurangan sekitar 600 orang, otoritas sedang mendiskusikan perekrutan sopir asing, menunjukkan krisis pengemudi yang dialami bersama di Asia Timur.

[^38]: [Interreg Europe: Tantangan transportasi pedesaan di Eropa](https://www.interregeurope.eu/rural-mobility) — Platform kerja sama regional Uni Eropa, menunjukkan bahwa 129 juta orang di Eropa tinggal di area dengan transportasi umum yang tidak memadai, dan pendapatan tiket bus pedesaan di Inggris hanya mencapai 25% dari biaya operasional, membuktikan bahwa transportasi penumpang di daerah terpencil adalah masalah struktural global.

[^39]: [Seamless Bay Area: Inspirasi bagi California dari integrasi tiket transportasi Taiwan](https://www.seamlessbayarea.org/blog/2025/1/5/notes-from-taiwan-regional-transit-fare-integration-programs-fuel-taiwans-ridership-growth) — Analisis organisasi advokasi transportasi California, AS, yang menganggap TPASS sebagai tolok ukur yang dapat dipelajari oleh California, serta merangkum tiga elemen penting: subsidi yang memadai, kemauan politik pusat, dan fleksibilitas pelaksanaan di tingkat lokal.
