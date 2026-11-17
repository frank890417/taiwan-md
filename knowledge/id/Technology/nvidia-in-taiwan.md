---
title: 'NVIDIA di Taiwan: Perusahaan Termahal di Dunia, Tanpa Satu Chip Pun yang Dibuat Sendiri'
description: "Pada Computex Mei 2025, Jensen Huang mengenakan jaket kulit dan menyalakan logo 55 perusahaan Taiwan sekaligus di punggungnya—satu perusahaan Amerika secara terbuka menyebut seluruh industri pulau itu sebagai bagian dari dirinya. Dari surat pada tahun 1996 kepada Morris Chang, hingga valuasi melebihi lima triliun dolar dan pemerintah kota Taipei yang mengeluarkan 4,434 miliar untuk membersihkan lahan baginya, NVIDIA telah menempatkan seluruh 'tubuhnya' di Taiwan. Akibatnya, Taiwan memegang saklar global yang tidak dapat dimatikan, dengan margin hanya 5%, listrik dan air dikuras habis, serta risiko perang bertumpu pada pulau itu: Tidak bisa lepas darinya, tidak berarti Taiwan berkuasa."
date: 2026-06-22
category: 'Technology'
tags:
  [
    'NVIDIA',
    'Nvidia',
    'Jensen Huang',
    'AI',
    'Semikonduktor',
    'TSMC',
    'Rantai Pasokan',
    'Silicon Shield',
    'Kecerdasan Buatan',
    'Computex',
  ]
subcategory: '半導體與硬體'
author: 'Taiwan.md'
featured: true
lastVerified: 2026-06-22
lastHumanReview: false
researchReport: 'reports/research/2026-06/NVIDIA在台灣.md'
relatedDiary: ['2026-06-22-143854-nvidia-taiwan']
image: '/article-images/technology/computex-jensen-huang-2016.webp'
translatedFrom: 'Technology/NVIDIA在台灣.md'
sourceCommitSha: '1ec0df23'
sourceContentHash: 'sha256:533b8db87f48f6de'
sourceBodyHash: 'sha256:8a6bcaa4a83cff70'
translatedAt: '2026-09-18T03:12:45.855619+00:00'
---

# NVIDIA di Taiwan: Perusahaan Termahal di Dunia, Tanpa Satu Pun Chip yang Dibuat Sendiri

> **Ringkasan 30 Detik:** NVIDIA adalah perusahaan paling berharga di bumi. Pada 29 Oktober 2025, kapitalisasinya melampaui lima triliun dolar[^1], tetapi mereka tidak memiliki pabrik wafer sendiri. Setiap chip AI diproduksi oleh TSMC, dan setiap server AI dirakit oleh Foxconn, Quanta, Wistron; Taiwan memproduksi sembilan puluh persen dari pasokan server AI global[^2]. Ketergantungan ini sangat dalam sehingga NVIDIA adalah pelanggan terbesar TSMC (menyumbang 19% pendapatan)[^3], sedemikian rupa sehingga arsitektur chip mereka ditentukan oleh tingkat hasil pengemasan di Taiwan[^4]. Masalahnya, mengendalikan urat nadi orang lain dan mendapatkan bagian dari keuntungan itu bukanlah hal yang sama: margin kotor NVIDIA adalah 75%, sementara ODM lokal Taiwan hanya mencapai 5% hingga 8%[^5]. Tulisan ini membahas hubungan yang tidak setara ini dan bagaimana ia berkembang hingga hari ini.

![Jensen Huang berdiri di panggung Computex Taipei, mengenakan pakaian gelap khasnya, dengan layar proyeksi besar di belakangnya, dan audiens duduk di bawah](/article-images/technology/computex-jensen-huang-2016.webp)
_Jensen Huang berpidato pada Computex Taipei tahun 2016. Sejak 2023, ia hampir setiap tahun kembali ke pameran ini untuk mengumumkan chip AI terbaru NVIDIA, dengan seluruh rantai pasokan Taiwan yang membuatnya duduk di bawah. Foto: NVIDIA Taiwan, 2016._

Pada tanggal 19 Mei 2025, di Taipei Nangang Exhibition Center. Jensen Huang naik ke panggung utama Computex mengenakan jaket kulit khasnya, dan latar belakang besar menampilkan dinding logo: Wistron, Advantech, Delta, Gigabyte, Quanta, Wistron, Wistron, Foxconn, MediaTek, TSMC, Inventec... satu demi satu, hingga terpampang 55 merek perusahaan Taiwan[^6]. Bersama dengan video ucapan terima kasih di lokasi acara, total ada 122 perusahaan Taiwan yang disebutkan[^6].

Itu adalah pertama kalinya orang Taiwan "melihat" seluruh industri mereka dalam satu kali penyebutan oleh sebuah perusahaan Amerika.

Kebanggaan itu nyata. Tetapi dinding itu memiliki pertanyaan yang tidak terucapkan: setiap logo di dinding tersebut bekerja untuk perusahaan Amerika ini, dan kekuatan sejati berada di tangan orang-orang yang membuat dinding itu, bukan pada dinding itu sendiri.

<div
  class="video-embed"
  style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;margin:1.5rem 0;border-radius:8px;"
>
  <iframe
    src="https://www.youtube.com/embed/TLzna9__DnI"
    title="NVIDIA CEO Jensen Huang Keynote at COMPUTEX 2025 (Video Lengkap Resmi)"
    style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;"
    loading="lazy"
    allowfullscreen
  ></iframe>
</div>

_Pidato utama Jensen Huang di COMPUTEX pada 19 Mei 2025 (Saluran Resmi NVIDIA). Pidato inilah yang menampilkan dinding logo 55 perusahaan Taiwan dan mengumumkan bahwa NVIDIA akan mendirikan kantor pusat di Taipei._

## Perusahaan yang Tidak Membuat Apa Pun, Menjadi yang Termahal di Dunia

NVIDIA adalah contoh ekstrem dari model "fabless" (tanpa pabrik). Mereka merancang chip, tetapi tidak membangun pabrik, tidak membeli mesin litografi, dan tidak memproduksi wafer sama sekali. Kekaisaran senilai lima triliun dolar ini tidak memiliki satu pun pabrik wafer miliknya sendiri.

Mereka mengalihdayakan proses manufaktur seluruhnya ke sebuah pulau di seberang Pasifik.

![Foto mikroskopis die chip GPU NVIDIA Ampere GA102, menampilkan struktur sirkuit yang padat](/article-images/technology/nvidia-ampere-ga102-die.webp)
_Mikrograf die chip NVIDIA Ampere GA102, diproduksi menggunakan proses 8 nanometer oleh TSMC. NVIDIA merancangnya, tetapi setiap jalur padat di sini dicetak di pabrik Taiwan. Foto: Fritzchens Fritz, CC0._

Chip yang paling menguntungkan (H200, Blackwell, dan Rubin yang akan datang) semuanya bergantung pada proses 3nm dan 4nm milik TSMC[^7]. Dalam laporan tahunan mereka kepada Komisi Sekuritas dan Bursa AS (SEC), NVIDIA mengakui secara gamblang konsentrasi ini: rantai pasokan perusahaan sebagian besar terkonsentrasi di kawasan Asia-Pasifik, menggunakan pabrik semikonduktor _foundry_ seperti TSMC untuk memproduksi wafer semikonduktor[^8]. Kalimat ini tertulis dalam dokumen hukum yang diajukan NVIDIA kepada SEC. Dengan kata lain, NVIDIA sendiri mencantumkan Taiwan sebagai sumber risiko geopolitik terbesarnya.

Penyelesaian chip saja tidak cukup. Agar sebuah GPU menjadi sesuatu yang dapat dihitung, ia harus melalui proses pengemasan canggih sebelum dimasukkan ke dalam server. Pengemasan CoWoS milik TSMC adalah hambatan global saat ini; NVIDIA sendiri menyerap sekitar enam puluh persen kapasitas produksi CoWoS (perkiraan media Taiwan lebih tinggi, hingga tujuh puluh persen)[^9]. Chip yang telah dikemas kemudian diserahkan kepada pabrik di Taiwan untuk perakitan: Ingrasys dari Foxconn membuat sistem rak GB200 NVL72, dan YuShan Securities memperkirakan pangsa pasar mereka dalam perakitan _rack_ AI melebihi empat puluh persen[^10]; Quanta membuat server cloud, dengan lebih dari setengah pangsa pasar di 50 pusat data terbesar[^11]; Wistron di Zhubei memiliki pabrik AI baru yang seluruhnya dikuasai oleh pesanan NVIDIA[^12].

```tw-stat
75.0% | Margin Kotor Tahunan NVIDIA FY2025 | Laporan SEC
19% | Pangsa Pasar NVIDIA dari Pendapatan TSMC 2025 | Telah Melampaui Apple Menjadi Klien Terbesar
~90% | Taiwan dalam Perakitan Server AI Global | Mencapai 100% jika termasuk pemasok merek Barat
~60% | Pangsa Pasar NVIDIA dari Kapasitas Pengemasan CoWoS TSMC | Media Taiwan memperkirakan hingga 70%
Sumber: Laporan SEC NVIDIA, TrendForce, MIC YuShan, Kementerian Ekonomi
```

Taiwan menyumbang sembilan puluh persen dari perakitan server AI global; jika termasuk pemasok merek Barat, angkanya mencapai seratus persen[^2]. Ini berarti bahwa hampir setiap mesin fisik yang melakukan komputasi AI di dunia telah melalui tangan orang Taiwan.

Ketika angka-angka ini ditumpuk, kontradiksi intinya muncul: **perusahaan paling berharga tidak memproduksi apa pun karena seluruh "tubuh" mereka berada di Taiwan**. Taiwan adalah sakelar yang tidak dapat dimatikan olehnya.

Namun, mengendalikan nyawa seseorang dan mendapatkan uang dari orang itu adalah dua hal yang berbeda. Tembok berikutnya tersembunyi di balik 55 logo tersebut.

## Di Balik Logo, Terletak Dasar Kurva Senyum

Industri manufaktur memiliki "Kurva Senyum" yang sudah usang: tinggi di kedua ujung dan rendah di tengah. Keuntungan melimpah pada dua ujung—merek, desain, dan teknologi—sementara bagian tengah yang bertanggung jawab atas "perakitan manufaktur" memiliki keuntungan paling tipis. Posisi Taiwan berada tepat di bagian tengah tersebut.

Margin kotor NVIDIA untuk seluruh tahun fiskal 2025 adalah 75,0%, angka ini mereka laporkan sendiri kepada SEC[^5]. Pada periode yang sama, margin kotor pabrikan Taiwan yang merakit server untuknya adalah sebagai berikut: Foxconn 6,18%, Quanta 4,78% (terendah dalam hampir 15 kuartal), Wistron 5,21%, Wistronix 7,2%[^13]. Keuntungan kotor NVIDIA kira-kira dua belas kali lipat dari Foxconn dan enam belas kali lipat dari Quanta.

```tw-bars
Siapa yang Mengambil Keuntungan: Margin Kotor Rantai Pasokan AI (%)
*NVIDIA | 75.0 | Desain, Merek, Ekosistem CUDA
Delta | 37.0 | Catu Daya, Pendingin (Ujung Teknologi)
Unimicron | 21.3 | Substrat ABF (Ujung Teknologi)
Wistronix | 7.2 | Perakitan Server
Foxconn | 6.18 | Perakitan Sistem Rak
Wistron | 5.21 | Perakitan Server
Quanta | 4.78 | Perakitan Server Cloud
Sumber: NVIDIA SEC 10-K, Rapat Analis Perusahaan (Q3 FY2025–FY2026)
```

Ada sesuatu yang kontra-intuitif dalam grafik ini. Di antara pabrikan Taiwan, semakin dekat ke "perakitan" murni, semakin tipis marginnya; sebaliknya, semakin dekat ke "teknologi", marginnya justru lebih tinggi. Delta, yang membuat catu daya dan pendingin, memiliki 37%, sementara Unimicron, yang membuat substrat ABF, diperkirakan sebesar 21,3%[^14]. Perbedaannya bukan pada "apakah perusahaan itu Taiwan," melainkan pada "di bagian mana Anda berdiri di kurva." Bagian perakitan, siapa pun yang melakukannya, sama-sama tipis.

> 📝 **Catatan Kurator**: Morgan Stanley menghitung angka yang lebih tajam pada Mei 2026—margin kotor nilai tambah perakitan tingkat sistem untuk produsen ODM turun dari 2,7% untuk rak GB300 generasi sebelumnya menjadi 1,9% untuk VR200 generasi berikutnya[^15]. Artinya, setiap kali NVIDIA meluncurkan chip baru yang lebih kuat, biaya yang harus ditanggung oleh pabrikan Taiwan semakin besar, tetapi tingkat keuntungannya semakin rendah. Semakin jauh rantai pasokan bergerak maju, semakin datar bagian dasar kurva itu ditekan. Logo terlihat megah di dinding, sementara margin kotornya tipis di dasar kurva; kedua hal ini bisa benar pada saat yang sama.

Kebanggaan dan harga saling tarik-menarik dalam satu rantai. Karena ledakan AI, pertumbuhan ekonomi Taiwan pada tahun 2025 sekitar 7,37%, menjadikannya yang tercepat dalam lima belas tahun terakhir dan masuk ke jajaran teratas global[^16]. Namun, akademisi yang meneliti ekonomi Taiwan, Jiang Minhua, menunjukkan angka dingin: sebagian besar orang Taiwan tidak merasakan manfaat dari kemakmuran ini[^16]. 10% dengan pendapatan tertinggi mengambil 48% pendapatan nasional, sementara 50% terbawah hanya mendapatkan 12%[^16]. Dikonversi, pendapatan per kapita 10% teratas adalah dua puluh kali lipat dari 50% terbawah.

Sebuah esai yang ditulis oleh seorang jurnalis pada Juni 2026 menggambarkan polarisasi K ini dengan lebih konkret: "jumlah penduduk yang bekerja secara langsung dalam rantai pertumbuhan utama seperti AI, semikonduktor, dan pasokan elektronik kurang dari 10% dari total angkatan kerja"[^17]. Seseorang yang bekerja di industri makanan mendapatkan gaji bulanan 38.484 Dolar Taiwan, hanya mewakili 34,6% dari manufaktur komponen elektronik[^17]. Keuntungan AI itu nyata, tetapi terkonsentrasi pada modal dan segelintir insinyur; mayoritas orang berada di luar gelombang tersebut sambil menonton.

Inilah makna pertama dari "tidak terlepas berarti tidak menentukan": Taiwan memegang sakelar, tetapi hanya mendapatkan 5% darinya.

# Taiwan Pernah Menerimanya, dan Hampir Menghancurkannya

Untuk memahami bagaimana hubungan yang tidak setara ini dimulai, kita harus kembali ke akhir tahun 1990-an, ketika NVIDIA hampir bangkrut.

NVIDIA didirikan pada tahun 1993, dan beberapa tahun sebelumnya perusahaan itu berulang kali berada di ambang kebangkrutan. Pada Agustus 1997, ketika mereka meluncurkan chip tampilan RIVA 128, "hanya tersisa satu bulan gaji" di pembukuan perusahaan [^18]. Selama masa itu, Jensen Huang selalu mengucapkan pepatah bahasa Inggris yang sama di awal rapat bulanan: "Kami hanya punya tiga puluh hari sebelum bangkrut" [^18]. Ungkapan ini kemudian menjadi keyakinan internal NVIDIA, tetapi itu tidak pernah dalam bahasa Mandarin.

Penyelamat sejati bagi NVIDIA dari krisis tersebut adalah investasi sebesar 5 juta dolar dari SEGA, bukan Taiwan [^19]. Ini harus dijelaskan terlebih dahulu, karena narasi "Taiwan menyelamatkan NVIDIA" sering kali terlalu romantis.

Peran Taiwan adalah hal lain: urat nadi manufaktur. Sekitar tahun 1996, Jensen Huang mengirim surat kepada pendiri TSMC, Morris Chang, menanyakan apakah TSMC dapat memproduksi chip untuk NVIDIA [^20]. Mi Yu-chieh dari TSMC kemudian mengenang pada tahun 2025 bahwa "kerjasama mendalam ini dimulai pada saat kritis, yaitu tahun 1997," ketika "Morris Chang secara pribadi menghubungi pendiri NVIDIA, Jensen Huang, untuk menanggapi permintaan layanan manufaktur NVIDIA" [^21]. Pada tahun 1998, kedua belah pihak menandatangani kontrak resmi, dan TSMC menjadi pabrik semikonduktor utama bagi NVIDIA [^20]. Pembagian kerja "desain di Silicon Valley, manufaktur mengandalkan TSMC" sejak saat itu menghubungkan tubuh fisik NVIDIA ke pulau ini.

> 💡 **Tahukah Anda**: Versi yang beredar mengatakan bahwa ketika Jensen Huang menerima telepon dari Morris Chang, dia berteriak kepada orang di sebelahnya untuk diam karena gembira [^22]. Gambaran ini adalah kesaksian sekunder dan nadanya mungkin tidak akurat, tetapi itu menangkap fakta: perusahaan kecil yang hampir bangkrut pada saat itu menganggap panggilan dari TSMC sebagai tali penyelamat.

Namun, tali tersebut juga nyaris menjadi jerat. Pada tahun 1998, proses kimia di TSMC mengalami kesalahan, menyebabkan pembuangan massal chip NVIDIA, dan hampir menjatuhkan perusahaan ini lagi [^23]. Jadi, cara yang lebih jujur adalah: Taiwan bukanlah "pahlawan penyelamat kebangkrutan" bagi NVIDIA; Taiwan adalah "urat nadi manufaktur"-nya—urat nadi yang terikat dua arah; Taiwan pernah menerimanya, dan juga nyaris menghancurkannya. Saling ketergantungan tidak pernah bersifat satu arah.

Kisah selanjutnya lebih dikenal. Pada tahun 2006, NVIDIA meluncurkan CUDA, dan hampir semua orang menganggapnya sebagai keputusan gila. Pada tahun 2012, mahasiswa pascasarjana Alex Krizhevsky melatih AlexNet di kamar tidur orang tuanya menggunakan dua kartu grafis NVIDIA GTX 580, mengurangi tingkat kesalahan pengenalan gambar ImageNet dari 26% menjadi 15,3% [^24]. Momen ini membuktikan bahwa GPU adalah mesin untuk pembelajaran mendalam. Pada tahun 2022, ChatGPT memicu kelaparan global akan daya komputasi, dan valuasi NVIDIA melesat seperti roket.

```tw-timeline
1993 | NVIDIA didirikan di Silicon Valley | Tiga orang termasuk Jensen Huang membuat chip tampilan
1996 | Jensen Huang mengirim surat kepada Morris Chang | Meminta manufaktur dari TSMC; kontrak resmi ditandatangani pada tahun 1998, tubuh fisik terhubung ke Taiwan
2006 | Peluncuran CUDA | Mengubah GPU menjadi platform komputasi umum, dianggap keputusan gila saat itu
2012 | AlexNet dilatih menggunakan dua GTX 580 | Membuktikan bahwa GPU = mesin pembelajaran mendalam
2022 | Kelahiran ChatGPT | Permintaan daya komputasi global meledak, valuasi NVIDIA melonjak
2025 | Valuasi melebihi lima triliun dolar | Yang pertama dalam sejarah; mengumumkan kantor pusat di luar negeri di Taiwan pada tahun yang sama
Sumber: 《The Nvidia Way》, podcast Acquired, Wikipedia, CNBC
```

Dari perusahaan kecil yang hanya punya tiga puluh hari sebelum bangkrut, menjadi perusahaan senilai lima triliun dolar pertama—setiap chip di antaranya dibuat di Taiwan.

![Jensen Huang berbicara dalam konferensi pers CES 2025 sambil memegang GPU RTX Blackwell](/article-images/technology/jensen-huang-ces-2025-blackwell.webp)
_Jensen Huang mengangkat GPU Blackwell generasi baru pada CES tahun 2025. Dari pendiri yang harus mengatakan "Kami hanya punya tiga puluh hari sebelum bangkrut" di setiap rapat bulanan, hingga chip yang dicari dunia ini—dan itu tetap harus dibuat di Taiwan. Foto: Pronoia, CC0._

## Apakah Keunikan Ini Memiliki Batas Waktu?

Ini membawa kita pada satu pertanyaan yang harus dihadapi dengan jujur: apakah "keunikan" Taiwan ini bersifat permanen, ataukah memiliki batas waktu?

Dalam jangka pendek, batasannya sangat kaku dan hampir tidak memiliki celah. Selama tahun 2025 hingga 2027, GPU AI tercanggih dari NVIDIA, mulai dari manufaktur hingga pengemasan akhir, 100% bergantung pada lini produksi CoWoS-L di Taiwan[^25]. TSMC menguasai sekitar 90% hingga 92% proses canggih di bawah 5 nanometer secara global, dengan kapasitas pengemasan canggih melebihi total semua pesaing[^26]. Penelitian dari Profesor Zhou Yun-tsai dari National Taiwan University (NTU) menjelaskan dengan gamblang: dalam jangka pendek tidak mungkin untuk mendiversifikasi manufaktur TSMC; membangun pabrik wafer mutakhir yang baru membutuhkan waktu tiga hingga empat tahun dan lebih dari $10 miliar[^27].

Bukti rekayasa terkuat tidak ditemukan dalam laporan, melainkan dalam desain produk NVIDIA sendiri. Generasi Rubin Ultra berikutnya awalnya direncanakan menggunakan pengemasan "quad-chiplet," tetapi TrendForce pada April 2026 menunjukkan bahwa quad-chiplet akan menyebabkan area pengemasan membengkak hingga 7 hingga 8 kali lipat dari batas fotomask, yang "sangat menghambat _yield_ dan biaya," sehingga desain tersebut "beralih ke arsitektur dual-chiplet"[^4]. Kalimat ini harus dibaca perlahan: batasan fisik pada _yield_ pengemasan Taiwan justru menentukan seperti apa chip NVIDIA itu. Bahkan perusahaan desain semikonduktor terkuat di dunia harus mengubah desainnya mengelilingi _yield_ Taiwan; ini sudah menjadi hambatan tingkat fisik yang sangat kaku dan tidak menyisakan ruang untuk negosiasi.

Namun, "batas keras jangka pendek" tidak sama dengan "keabadian." Taiwan pernah memiliki pelajaran pahit dari masa lalu.

Pada tahun 2002, Taiwan meluncurkan kebijakan industri "Dua Triliun Bintang Ganda," di mana panel dan DRAM (memori) juga dianggap sebagai urat nadi pertahanan yang tak tergantikan. Apa hasilnya? Karena kurangnya teknologi inti, investasi penelitian hanya sebesar 6%, jauh di bawah 10% hingga 21% dari Korea, Jepang, Amerika, dan Eropa; kedua industri ini telah dikuras oleh Korea dan Tiongkok. Ulasan _United Daily News_ kemudian sangat menyedihkan: "Pabrik panel dan pabrik memori semikonduktor yang pernah gemilang, beberapa tahun kemudian mengalami kerugian besar karena kelebihan pasokan di pasar internasional, sehingga diejek oleh netizen sebagai 'Taois Mao' (Mao 3 atau 4), yaitu margin kotor produk hanya tiga hingga empat persen; 'Industri Dua Triliun Bintang Ganda' berubah menjadi 'Industri Penderitaan Dua Triliun'."[^28]

> ⚠️ **Apa Bedanya Kali Ini dengan Panel dan DRAM**: Panel dan DRAM dikuras pada saat itu karena Taiwan tidak menguasai teknologi inti, yang mana siapa pun bisa menyusul. Parit pertahanan AI kali ini terlihat jauh lebih dalam—TSMC memang menguasai IP proses manufaktur, _yield_ pengemasan CoWoS, dan kohesi seluruh ekosistem, sesuatu yang tidak dapat direplikasi hanya dengan uang selama tiga hingga lima tahun. Tetapi ini bukanlah alasan bagi Taiwan untuk berpuas diri. SMIC telah mengklaim produksi massal 5 nanometer, meskipun _yield_-nya hanya sepertiga dari TSMC dan biayanya masih 50% lebih mahal, tertinggal sekitar lima tahun[^29]. Namun, lima tahun bukanlah selamanya dalam industri teknologi. Menganggap "sangat bergantung" sebagai "selalu aman," adalah kesalahan yang dilakukan oleh orang-orang pada tahun 2002.

Setelah tahun 2028, celah mulai muncul. Pada Desember 2025, NVIDIA menginvestasikan sekitar $5 miliar ke Intel dengan tujuan sebenarnya untuk "memastikan akses prioritas terhadap kapasitas pengemasan canggih Intel di Amerika," yang diperkirakan akan digunakan untuk arsitektur Feynman pada tahun 2028[^30]. Pabrik pengemasan AP1 TSMC di Arizona dijadwalkan berproduksi massal pada tahun 2028[^31]. Powertech Taiwan mengembangkan pengemasan PiFO sebagai tandingan CoWoS-L, dengan biaya produksi yang sekitar 30% lebih rendah, dan sudah "diburu oleh beberapa perusahaan chip AI Amerika"[^32]. Semua ini adalah kelonggaran nyata, tetapi belum masuk ke rantai pasokan utama GPU tercanggih NVIDIA.

Salah satu angka yang paling baik menjelaskan nuansa situasi saat ini: TrendForce memperkirakan bahwa kesenjangan pasokan dan permintaan CoWoS akan menyusut dari sekitar 20% saat ini menjadi sekitar 10% pada akhir tahun 2026[^33]. Namun, cara penyempitan kesenjangan itu adalah melalui ekspansi TSMC sendiri, bukan oleh pemasok alternatif yang mengisi kekosongan[^33]. Artinya, sampai hari ini, hambatan ini hanya bisa dipecahkan oleh Taiwan sendiri.

Keunikan adalah fakta rekayasa, tetapi ia memiliki batas keras yang tertulis sekitar tahun 2028. Kartu truf Taiwan memiliki tanggal kedaluwarsa.

## 44,34 miliar: Sebuah kota membersihkan lahan untuk perusahaan bernilai triliunan

Jika margin kotor adalah timbangan kekuasaan yang abstrak, maka apa yang terjadi di Taman Teknologi Beitou, Taipei pada paruh kedua tahun 2025 adalah irisan paling tajam dari timbangan tersebut.

Kisah ini dimulai pada tahun 2021. Pemerintah Kota Taipei menjual hak guna atas dua lahan (T17 dan T18) di Beitou Sci-Park seluas total 3,89 hektar dengan hak pakai selama 50 tahun, dan Shin Kong Life menjadi satu-satunya penawar yang berhasil dengan harga 4,4 miliar [^34]. Selama tiga tahun berikutnya, lahan itu terbengkalai dan ditumbuhi gulma.

Pada Mei 2025, Jensen Huang mengumumkan di Computex bahwa kantor pusat luar negeri NVIDIA, "Constellation Headquarters," berencana untuk berlokasi di Beitou Sci-Park [^35]. Namun masalah muncul: hak guna atas lahan tersebut masih dimiliki oleh Shin Kong Life, dan hak guna yang diperoleh melalui tender publik tidak dapat dialihkan secara langsung. NVIDIA, Shin Kong Life, dan Pemerintah Kota Taipei terjebak dalam kebuntuan selama lima bulan untuk mendapatkan lahan tersebut [^36].

Solusi akhirnya adalah Pemerintah Kota Taipei membayar agar Shin Kong mundur. Pada tanggal 12 November 2025, Dewan Kota Taipei menyetujui tanpa keberatan biaya pemutusan kontrak sebesar 4,434 miliar, yang dibayarkan oleh pemerintah kota kepada Shin Kong untuk mengambil kembali lahan tersebut [^37]. Angka ini adalah: NT$ 4,434,064,085 [^37].

```tw-figure
NT$4,434,064,085
Biaya pemutusan kontrak yang dibayar Pemerintah Kota Taipei kepada Shin Kong Life untuk mengambil kembali lahan di Beitou Sci-Park dan memberikannya kepada NVIDIA (disetujui Dewan pada 12/11/2025)
Dewan Kota Taipei, Central News Agency, iPat News
```

Tagihan pembatalan yang dikirim oleh Shin-So telah memicu parlemen. Anggota Partai Kuomintang, You Shu-hui, menulis ketika dia menerima tagihan itu: "Melihat dalam tagihan 8 halaman dari Shin-So bahwa bahkan biaya penyiangan gulma, pemeliharaan lingkungan, penyesuaian logo, dan biaya jasa penulis harus dibayar oleh pemerintah kota Taipei, saya hanya bisa tersenyum pahit. Bukankah pemeliharaan lingkungan seharusnya menjadi tugas penyewa? Bahkan biaya penyesuaian logo yang menggabungkan Tainan dan Shin-So harus dibayar oleh pemerintah kota? Sungguh membuat pusing... Ah, sungguh tak berdaya."[^38] Namun, dia akhirnya memberikan suara setuju dan menambahkan kalimat yang sangat mewakili suasana di ruangan itu: "Tagihan untuk Shin-So ini tidak masuk akal, tetapi kepentingan umum adalah yang utama."[^38].

Pada hari itu, ada pemandangan langka di parlemen: tiga partai—biru, hijau, dan putih—bersikap harmonis, bahkan fraksi DPP berteriak, "Dukung Nvidia, segera tandatangani."[^39] Sebidang tanah dan satu perusahaan asing membuat partai-partai yang biasanya saling menyerang bersatu padu.

> 📝 **Catatan Kurator**: Ini adalah struktur kekuasaan yang patut diperhatikan. Agar sebuah perusahaan bernilai miliaran dolar dapat beroperasi, pemerintah kota dan parlemen suatu kota menggunakan dana publik, melintasi batas-batas partai, dan mengatasi segala rintangan untuk membersihkan sebidang tanah yang sebelumnya ditempati oleh penyewa lain. Nvidia tidak membayar 4,434 miliar ini; uang itu awalnya ditanggung oleh pembayar pajak di Taipei (di mana biaya internal Shin-So ditambah pajak yang telah dibayar sendiri sebesar 1,44 miliar, baru kemudian ditanggung secara keseluruhan oleh Nvidia)[^40]. "Tidak bisa dilepaskan" memiliki bentuk yang paling konkret di sini: ketika Anda sangat membutuhkan seseorang untuk tinggal, Anda akan membayar tagihan yang seharusnya tidak perlu Anda bayar.

## Kantor Pusat: Merek Dagang, atau Akar yang Tertanam?

Apa yang telah NVIDIA berikan kepada Taiwan? Ini harus dilihat dari dua sisi agar tidak salah menilai.

Satu adalah "merek dagang": Kantor pusat Constellation meniru desain "kapal bintang" kantor pusat di Amerika Serikat, menampung sekitar 4.000 orang, dan dijadwalkan mulai konstruksi pada tahun 2026 dengan operasional pada tahun 2030—hingga hari ini, itu belum dimulai[^41]. Hanya dari hal ini, keraguan bahwa "kantor pusat hanyalah operasi PR" bukanlah tanpa dasar.

Yang lainnya adalah "akar yang sudah tertanam sejak lama". NVIDIA tidak baru datang ke Taiwan pada tahun 2025. Mereka telah memiliki kantor di Neihu, Taipei, dengan sekitar 1.800 karyawan saat ini (ini adalah perkiraan media, bukan angka resmi)[^42]. Pada tahun 2021, mereka memperoleh "Proyek Pusat R&D Inovasi AI" dari Kementerian Ekonomi, dengan total investasi sebesar 24,3 miliar dan subsidi pemerintah sebesar 6,7 miliar, yang akan merekrut tim R&D sebanyak 1.000 orang dari 2022 hingga 2027[^43]. Pada November 2025, mereka mendirikan "Taiwan NVIDIA Classic Co., Ltd.", dengan modal yang meningkat dari 1 miliar menjadi 3,3 miliar—ini adalah badan hukum independen yang dapat membayar pajak dan memiliki aset secara mandiri[^44].

Jadi, kebenaran di balik "pembangunan kantor pusat" berada di tengah: akar R&D yang substansial memang ada, dan anak perusahaan yang membayar pajak juga telah didirikan; tetapi kantor pusat Constellation yang paling menarik perhatian masih berupa cetak biru. Kedua hal ini tidak boleh dibicarakan setengah-setengah.

## Pulau yang Terkuras oleh Rantai Pasokan Ini

Di luar citra dan tagihan, ada satu tagihan lagi yang harus dibayar oleh setiap orang yang tinggal di pulau ini: air, listrik, udara, dan rumah yang tidak terjangkau.

![Tampilan pabrik TSMC di Taichung, bangunan abu-abu dengan logo TSMC](/article-images/technology/tsmc-taichung-factory.webp)
_Pabrik TSMC di Taichung. Fisik dari setiap generasi GPU NVIDIA dibentuk di pabrik semacam ini, dan air serta listrik yang ditarik oleh pabrik-pabrik ini adalah tagihan lain yang sedang dibayar oleh pulau ini. Foto: Briáxis F. Mendes (Mengbisi), CC BY-SA 4.0._

Mari kita mulai dari listrik. Pada tahun 2023, TSMC menggunakan 24.775 miliar kilowatt-jam listrik, yang mencakup 8,96% konsumsi listrik di seluruh Taiwan[^45]. Standard & Poor's memprediksi bahwa pada tahun 2030, konsumsi listrik TSMC dapat mencapai 23,7% dari total kebutuhan listrik di Taiwan[^45]. Artinya, pada saat itu, hampir satu kilowatt dari setiap empat kilowatt yang digunakan di seluruh Taiwan mungkin telah dikonsumsi oleh perusahaan ini.

```tw-line
Proporsi Konsumsi Listrik TSMC terhadap Total Taiwan: Satu Perusahaan Mengambil Hampir 1/4 Listrik Pulau (dalam %)
Tahun | Persentase
2023 | 8,96
2030 | 23,7
Sumber: Standard & Poor's, Laporan CSR TSMC
```

Emisi karbon ikut meningkat. Laporan Greenpeace pada April 2025 yang berjudul 《Bayangan di Balik Kemegahan Chip》 (Shadow Behind the Glory of Chips) menghitung bahwa konsumsi listrik untuk manufaktur chip AI secara global melonjak dari 218 GWh menjadi 984 GWh, dengan peningkatan tahunan lebih dari 3,5 kali lipat; dan hanya Taiwan saja, konsumsinya meningkat tajam hingga 375,8 GWh, "mencapai 38% dari total global" [^46]. Karena TSMC sangat bergantung pada bahan bakar fosil, emisi karbon manufaktur chip AI-nya mencapai 185.700 ton ekuivalen karbon dioksida, dan Greenpeace secara langsung menunjuknya sebagai "juara emisi dalam pembuatan chip AI"[^46].

Bagaimana dengan NVIDIA sendiri? Peringkat yang diberikan oleh Greenpeace adalah F. Laporan tersebut menyatakan bahwa NVIDIA "hampir menggandakan emisi rantai pasokan selama tiga tahun terakhir, dari 3,51 juta ton pada tahun 2022 menjadi 6,91 juta ton pada tahun 2024," dan mereka "hanya mengalihkan emisi karbon dan polusi rantai pasokan ke wilayah lain di dunia"[^46]. Dengan kata lain, nilai yang melekat pada NVIDIA dibebani oleh emisi karbon dan polusi yang tetap berada di langit Taiwan.

Air juga demikian. TSMC menggunakan lebih dari 200 ribu ton air per hari; 81 ribu ton air yang dipasok oleh pabrik air daur ulang Tainan secara "hampir seluruhnya untuk TSMC"[^47]. Biayanya ditanggung oleh lahan pertanian: di Jianan, ladang mengalami kekeringan pada tahun 2021 dan 2023, menyerahkan air kepada industri semikonduktor[^48]. Pembuatan satu wafer 12 inci membutuhkan 8.327 liter air[^49], dan di pulau ini, lahan yang dulunya adalah pertanian telah dibiarkan tidak ditanami demi kebutuhan air untuk chip.

Kemudian ada rumah. Setelah NVIDIA mengumumkan akan mendirikan kantor pusat di Neihu Science Park, harga properti di area tersebut mulai bergerak. Biro Pembangunan Industri Kota Taipei memperkirakan bahwa populasi pekerja tetap di Neihu Science Park dapat mencapai 60.000 orang, tetapi hanya sekitar 1.476 unit perumahan yang tersedia untuk dijual (lahan hunian hanya mencakup 13,8% dari seluruh area)[^50]. Dengan 60.000 orang berebut 1.476 unit, arah harga dapat ditebak: telah ada laporan bahwa penjualan properti baru di lokasi inti Neihu Science Park mencapai lebih dari 1,5 juta per _ping_ (satuan ukur lokal)[^51].

Di sini kita harus memisahkan dua hal agar kecemasan tidak salah hitung. Dalam catatan transaksi riil, penjualan tertinggi untuk bangunan residensial di distrik Shilin pada tahun 2025 adalah 570.400 Dolar Taiwan per meter persegi, setara dengan sekitar 1,88 juta per _ping_ (alamat No. 39 Jihe Road, total harga 447 juta),[^52]. Tetapi beberapa properti mahal ini berada di rumah mewah di area Tianmu dan Shilin City, yang berbeda dari Neihu Science Park itu sendiri; angka lebih dari 1,5 juta per _ping_ untuk proyek baru di Neihu adalah kumpulan data lain dalam laporan media. Kedua angka tersebut seharusnya tidak dicampuradukkan. Namun, apa pun itu, semuanya mengarah pada perasaan yang sama: pertumbuhan terjadi di jalan saya ini, tetapi saya tidak mampu membelinya.

> ⚠️ **"Bagaimana bisa naik sebelum perusahaan mulai membangun?"**: Reaksi penduduk setempat sangat nyata. Seorang pelaku bisnis secara pribadi mengatakan bahwa karena fungsi kehidupan kawasan tersebut kurang baik, "banyak karyawan yang enggan pindah... bahkan setelah pindah, sepertiga karyawan mengundurkan diri karena transportasi yang tidak nyaman"[^53]. Opini anonim di PTT lebih blak-blakan: mereka sudah bosan dengan topik TSMC sebelumnya, dan sekarang hanya mengganti topik menjadi NVIDIA[^54]. Sebuah kantor pusat yang belum dibangun telah menaikkan harga properti penduduk setempat—ini adalah versi K-shaped polarization yang paling dekat dengan meja makan. Harapan harus jujur: AI memang membuat Taiwan dilihat dunia, tetapi air dan listrik yang terkuras serta rumah yang tidak terjangkau juga nyata, dan keduanya harus ditulis.

## Bukan Hanya Taiwan yang Terikat Padanya

Jika kita memperluas pandangan, kita akan melihat sesuatu yang lebih besar: dalam hubungan antara NVIDIA dan Taiwan, keterikatan itu bersifat dua arah, bahkan multi-arah. Bahkan pihak di seberang selat pun terperangkap dalam struktur ini.

![Pameran Computex Nangang Taipei, stan produsen informasi berjejer di kedua sisi lorong yang luas, kerumunan berkumpul](/article-images/technology/computex-nangang-floor-2015.webp)
_Pameran Computex di Pusat Pameran Nangang Taipei. Setiap bulan Juni, pembeli dari seluruh dunia membanjiri pusat ini untuk produk-produk yang dibuat oleh rantai pasokan Taiwan—mereka tidak hanya terikat pada Taiwan._ Foto: NVIDIA Taiwan, CC BY 2.0.

Inilah konsep "Perisai Silikon" (Silicon Shield): Taiwan menguasai semikonduktor yang dibutuhkan dunia, sehingga keunikan ini menjadi lapisan perlindungan. Namun, Perisai Silikon selalu memiliki dua sisi. Ia adalah jimat pelindung sekaligus gudang mesiu yang terikat di pulau tersebut. Dunia akademik menyebut kedua sisi ini sebagai "Perisai Silikon" (Silicon Shield) dan "Jebakan Silikon" (Silicon Trap): tingkat konsentrasi yang sama dapat mencegah agresi, tetapi juga bisa menjadi pemicu atau titik kegagalan tunggal bagi agresi[^55].

Debat yang lebih tajam muncul pada tahun 2021 dari sebuah artikel di War College Angkatan Darat AS, yang mengadvokasi strategi ekstrem "bumi hangus/sarang hancur": jika Tiongkok menyerang Taiwan, ia rela menghancurkan industri semikonduktornya sendiri agar pihak lawan tidak mendapatkan keuntungan. Namun, suara penentangan sama kuat: bahkan jika agresi Tiongkok berhasil dicegah dalam jangka pendek, kerusakan ekonomi diri ini mungkin hanya akan menunda invasi hingga hari ketika Tiongkok dapat memproduksi semikonduktor sendiri; dan warga Taiwan sendiri kemungkinan besar tidak akan menganggap penghancuran industri seperti itu sesuai dengan kepentingan mereka[^56]. Ini bukanlah soal penilaian yang harus dibuat oleh Taiwan, tetapi hal ini benar-benar menggantung di latar belakang setiap diskusi tentang "apakah Taiwan memiliki daya tawar".

Perisai Silikon bahkan sedang diencerkan oleh TSMC sendiri. Untuk mendiversifikasi risiko geopolitik, TSMC menginvestasikan $165 miliar untuk ekspansi pabrik di Amerika Serikat[^57]. Judul _MIT Technology Review_ pada Agustus 2025 adalah "Perisai Silikon Taiwan Mungkin Melemah" (Taiwan's Silicon Shield May Be Weakening)[^58]. Kekhawatiran muncul: pemindahan kapasitas akan mengencerkan daya tawar Taiwan di dalam negeri, membuat negara-negara seperti Amerika Serikat merasa bahwa Taiwan tidak lagi terlalu layak untuk dibela[^58]. Namun, Bonnie Glaser dari Marshall Foundation Jerman mengingatkan bahwa ekosistem ini tidak mudah dipindahkan: ekosistem yang diciptakan oleh Taiwan adalah unik karena hasil kolaborasi antara basis talenta, budaya, dan hukum Taiwan, sehingga tidak dapat direplikasi dengan mudah di tempat lain[^59]. Paul Triolo, peneliti teknologi Tiongkok, berbicara lebih lugas—ia mengatakan bahwa dalam hal manufaktur paling mutakhir, Arizona masih jauh dari itu, dan tidak akan pernah mencapainya[^60].

Dan yang paling menunjukkan ketidakseimbangan ketergantungan ini adalah sebuah momen politik.

Pada tanggal 29 Mei 2024, Jensen Huang mengatakan di Taiwan: "Taiwan is one of the most important countries in the world."[^61] Beberapa hari kemudian, pada tanggal 2 Juni, ia berpidato di National Taiwan University (NTU), menggambarkan "Taiwan sebagai pahlawan tanpa nama, tetapi pilar dunia."[^62]

```tw-quote
Taiwan adalah pahlawan tanpa nama, tetapi pilar dunia
Jensen Huang | CEO NVIDIA, Pidato Computex NTU, 2024
```

Dua belas hari kemudian, juru bicara Kantor Urusan Pusat Tiongkok (yang berhubungan dengan Taiwan), Chen Binhua, menanggapi: "Rakyat daratan dan netizen telah menyatakan ketidakpuasan yang kuat terhadap pernyataan yang sangat salah ini. Taiwan tidak pernah menjadi negara... kami harap dia belajar lebih giat."[^63]

Namun, hal lain yang menarik adalah. CNA pada saat itu mencatat bahwa media keuangan Tiongkok membuat banyak laporan tentang kunjungan Jensen Huang ke Taiwan, tetapi "tidak menyebutkan pernyataan Jensen Huang bahwa 'Taiwan adalah negara penting', seolah-olah mengabaikan isu sensitif yang biasanya dianggap sebagai 'hal yang sangat penting'"[^64]. Artinya, meskipun secara resmi mereka memprotes dengan keras, media keuangan memilih untuk membungkamnya.

> 📝 **Catatan Kurator**: Pembungkaman ini mengungkapkan posisi kekuasaan yang sebenarnya. Tiongkok membutuhkan chip NVIDIA, sehingga bahkan ketika Jensen Huang mengucapkan kata-kata yang paling tidak dapat diterima oleh Beijing, media daratan memilih untuk tidak melaporkannya atau memperbesarnya karena takut merusak hubungan dengan "guru AI" ini. Ada pepatah yang tersebar luas—Tiongkok membutuhkan Nvidia, tetapi Nvidia tidak membutuhkan Tiongkok[^65]. Dalam hubungan ini, bahkan pasar besar di seberang selat terancam oleh rantai pasokan sebuah perusahaan Amerika dalam tingkat tertentu. Inilah posisi unik pulau Taiwan: seluruh dunia, termasuk pihak yang paling ingin mengubah statusnya, bergantung pada chip yang dibuat di sini. Namun, "seluruh dunia bergantung padamu" dan "kamu karenanya aman dan berhak berbicara" masih merupakan dua hal yang berbeda. Penulis tidak menarik kesimpulan politik untuk Taiwan, tetapi ketegangan itu sendiri layak untuk direnungkan oleh setiap pembaca.

## Tak Terpisahkan, Tidak Sama dengan Mengendalikan

Kembali ke dinding logo yang menampilkan 55 perusahaan.

Setiap nama di dinding itu nyata. Mereka adalah tubuh dari revolusi AI bumi; tanpa mereka, NVIDIA senilai lima triliun dolar bahkan tidak bisa menghasilkan satu chip pun. Kebergantungan ini adalah fakta rekayasa, bukan retorika. Taiwan seharusnya bangga akan hal ini.

Namun, sepanjang perjalanan ini, sorotan, valuasi, dan hak pengambilan keputusan berada di tangan orang-orang yang membuat dinding ini; sementara margin 5%, utilitas yang terkuras habis, harga properti yang melambung hingga tidak terjangkau, dan risiko perang yang tertahan di pulau itu, semuanya ditanggung oleh nama-nama di dinding. Taiwan memegang sakelar global yang tak bisa dimatikan, tetapi hal itu belum memberikan mereka kendali penuh. Dan koin ini masih memiliki masa kedaluwarsa sekitar tahun 2028.

Taiwan tidak diam saja. Lai Ching-te pada tahun 2025 mengusulkan agar Taiwan menjadi "pusat komputasi global papan atas lima besar," mengembangkan "AI berdaulat" [^66]; Foxconn sedang membangun superkomputer nasional di Kaohsiung menggunakan sepuluh ribu chip Blackwell [^67]; dan "Sepuluh Konstruksi Baru AI" dari pemerintahan eksekutif akan menginvestasikan lebih dari 100 miliar, dengan target nilai produksi 15 triliun [^68]. Ini adalah upaya untuk beralih dari sekadar "membuat kontrak bagi orang lain" menjadi "berkomputasi untuk diri sendiri": naik satu tingkat dari dasar kurva senyum.

Namun, jalan ini masih sangat jauh. Model bahasa Taiwan sendiri, TAIDE, digambarkan seperti milik "siswa SMA," sementara perusahaan internasional sudah berada di tingkat "pascasarjana" [^69]. Pemerintah Korea Selatan secara sekaligus memesan 260 ribu GPU, sementara pihak Taiwan masih berjuang untuk sebidang tanah dan sejumlah uang pesangon [^70]. Dari menerima telepon dari Morris Chang hingga mengelola daya komputasi seluruh dunia, Taiwan membutuhkan hampir tiga puluh tahun untuk sampai di dinding ini. Tetapi berdiri di dinding dan mengambil pena adalah dua hal yang berbeda.

Dinding itu akan terus bersinar. Pada Computex berikutnya, akan ada lebih banyak logo di punggung Jensen Huang. Pada tahun 2026, ia mengungkapkan bahwa NVIDIA telah membelanjakan sekitar 150 miliar dolar di Taiwan setiap tahun, padahal lima tahun lalu angkanya baru 10 hingga 15 miliar [^71]. Pertanyaan "apakah Taiwan penting atau tidak" sudah memiliki jawabannya. Yang harus dijawab oleh Taiwan adalah pertanyaan yang lebih sulit: ketika seluruh dunia bergantung pada apa yang Anda buat, bagaimana cara mengubah ketergantungan itu menjadi kendali?

Nama-nama di dinding semakin bertambah banyak. Apakah orang-orang yang memegang pena akan berubah menjadi diri mereka sendiri—pena ini baru saja mulai digenggam oleh Taiwan.

---

**Bacaan Lanjutan**:

- [Jensen Huang: Dari remaja pembersih toilet menjadi kultus kulit dari kekaisaran lima triliun](/id/people/jensen-huang) — Kisah hidup pribadi pendiri NVIDIA, artikel ini hanya menyentuh sedikit, kisah keluarga dan pertumbuhan di Tainan ada di sini
- [Industri semikonduktor](/id/technology/taiwan-semiconductor-industry) — Mengapa Taiwan bisa menjadi pusat manufaktur chip global, rantai pasokan yang dibahas dalam artikel ini lebih lengkap di sini
- [Perusahaan Taiwan: TSMC](/id/economy/tsmc) — "Gunung pelindung" yang membuat setiap chip untuk NVIDIA, dan sisi lain dari pengurasannya
- [Morris Chang: Penerima surat itu, dan kekaisaran fabrikasi wafer yang ia bangun](/id/people/tsmc-morris-chang) — Pendiri TSMC, orang yang menerima surat Jensen Huang pada tahun 1996
- [Computex: Pameran komputer Taipei, bagaimana ia menjadi pembukaan AI global](/id/technology/computex) — Panggung di mana dinding logo bersinar, panggung utama tahunan industri teknologi Taiwan
- [Industri kecerdasan buatan (AI)](/id/technology/artificial-intelligence-industry) — Dari memproduksi chip NVIDIA hingga membangun ekosistem AI, posisi Taiwan dalam gelombang AI
- [Pengembangan dan strategi AI Taiwan](/id/technology/artificial-intelligence-development-strategy) — AI berdaulat, TAIDE, dan upaya nasional Taiwan untuk naik dari manufaktur
- [Cerita Teknologi Taiwan: Chip 100 Poin, Mikrofon 60 Poin](/id/technology/taiwan-tech-storytelling) — Dua cara berbicara tentang satu chip: premi keuntungan yang diambil NVIDIA, bagaimana teknologi Taiwan harus belajar
- [Perusahaan Taiwan: Foxconn Precision Industry](/id/economy/foxconn-precision-industry) — Raksasa manufaktur yang merakit 40% perangkat AI global, tangan terbesar di dasar kurva senyum

## Sumber Gambar

- [Jensen Huang di Computex Taipei](https://commons.wikimedia.org/wiki/File:Jensen_Huang_at_Computex_Taipei_20160531c.jpg) — Foto: NVIDIA Taiwan, 2016, CC BY 2.0 (hero, Jensen Huang berpidato di panggung Computex)
- [Die GPU NVIDIA Ampere GA102](<https://commons.wikimedia.org/wiki/File:Nvidia@8nm@Ampere@GA102@GeForce_RTX_3090@S_TW_2032A1_SNNB9W.000_GA102-300-A1_DSC06025-DSC06107_(50740715646).jpg>) — Foto: Fritzchens Fritz, CC0 (mikrograf die chip)
- [Jensen Huang memegang RTX Blackwell di CES 2025](<https://commons.wikimedia.org/wiki/File:Jensen_Huang_-_RTX_Blackwell_-_Nvidia_Keynote_-_CES_2025_Las_Vegas_(3).jpg>) — Foto: Pronoia, CC0
- [Pabrik TSMC di Taichung](https://commons.wikimedia.org/wiki/File:TSMC_logo_on_Taichung_factory_building.jpg) — Foto: Briáxis F. Mendes (Mengbisi), CC BY-SA 4.0
- [Computex Taipei di Pusat Pameran Nangang Taipei](https://commons.wikimedia.org/wiki/File:Computex_Taipei_at_Taipei_Nangang_Exhibition_Center_20150602.jpg) — Foto: NVIDIA Taiwan, 2015, CC BY 2.0
- Video: [Jensen Huang CEO NVIDIA Keynote di COMPUTEX 2025](https://www.youtube.com/watch?v=TLzna9__DnI) — Saluran YouTube resmi NVIDIA

## Referensi

[^1]: [NVIDIA menjadi perusahaan pertama yang mencapai kapitalisasi pasar $5 triliun](https://www.cnbc.com/2025/10/29/nvidia-5-trillion-market-cap.html) — Dilaporkan CNBC pada 29 Oktober 2025, NVIDIA adalah perusahaan pertama di dunia yang memiliki kapitalisasi pasar melebihi lima triliun dolar, didorong oleh permintaan daya komputasi AI.

[^2]: [Taiwan menguasai 90% pasar server AI global](https://technews.tw/) — Data dari Kementerian Ekonomi dan MIC menunjukkan bahwa industri server Taiwan secara historis menyumbang lebih dari delapan puluh persen ekspor global, dan manufaktur perakitan server AI telah mencapai sembilan puluh persen secara global, termasuk pemasok merek Barat hingga total 100%; pendorongnya adalah permintaan klien Barat untuk produksi non-Tiongkok.

[^3]: [TrendForce: NVIDIA menjadi pelanggan terbesar TSMC](https://www.trendforce.com/) — Data TrendForce per 1 Juni 2026 menunjukkan bahwa kontribusi 'Pelanggan A' (NVIDIA) terhadap pendapatan TSMC meningkat dari 12% pada tahun 2024 menjadi 19% pada tahun 2025, melampaui Apple (22% $ o$ 17%) untuk menjadi pelanggan terbesar. Sumber utama: Laporan Tahunan TSMC 2025 (investor.tsmc.com).

[^4]: [TrendForce: Rubin Ultra mengadopsi arsitektur dual-wafer](https://www.trendforce.com/news/) — Analisis TrendForce per 1 April 2026 menyatakan bahwa pengemasan empat wafer akan menyebabkan ekspansi area hingga batas fotomask, yaitu 7,5–8 kali lipat, yang 'sangat menghambat rendemen dan biaya', sehingga desain beralih ke dual-wafer; AI akan menyumbang 36% kapasitas 3nm pada tahun 2026, sementara hanya 5% pada tahun 2025. Batasan fisik rendemen pengemasan secara langsung menentukan arsitektur chip.

[^5]: [NVIDIA FY2025 10-K (SEC)](https://www.sec.gov/Archives/edgar/data/0001045810/000104581025000023/nvda-20250126.htm) — Laporan Tahunan FY2025 yang diajukan NVIDIA kepada Komisi Sekuritas dan Bursa AS, dengan margin kotor GAAP tahunan sebesar 75,0% (72,7% pada FY2024).

[^6]: [Ringkasan Pidato Jensen Huang di Computex 2025: Dinding logo dari 55 perusahaan Taiwan](https://money.udn.com/money/story/5612/8750451) — Paket ringkasan Economic Daily yang mencantumkan secara verbatim 55 perusahaan Taiwan yang disebutkan pada latar belakang panggung Computex 2025 (Yanyang, ChipBond, Delta Electronics... TSMC, United Microelectronics Corp., Hsinchu, Wistron, Wistron Nano, Chongtai), dan melaporkan bahwa total di latar belakang panggung dan video ucapan terima kasih mencapai 122 perusahaan.

[^7]: [Ketergantungan NVIDIA pada proses 3/4nm TSMC](https://www.ainvest.com/news/) — Analisis industri menunjukkan bahwa chip paling menguntungkan milik NVIDIA, yaitu H200, Blackwell, dan Rubin, semuanya bergantung pada proses 3nm dan 4nm TSMC, yang merupakan hambatan ganda dalam manufaktur dan pengemasan.

[^8]: [Pengungkapan Konsentrasi Rantai Pasokan NVIDIA FY2025 (SEC)](https://www.sec.gov/Archives/edgar/data/0001045810/000104581025000023/nvda-20250126.htm) — Teks Laporan Tahunan NVIDIA: 'Rantai pasokan kami sebagian besar terkonsentrasi di kawasan Asia-Pasifik. Kami menggunakan pabrikan semikonduktor, seperti Taiwan Semiconductor Manufacturing Company Limited, atau TSMC... untuk memproduksi wafer semikonduktor kami.' Faktor Risiko mencantumkan konsentrasi geografis pemasok, manufaktur wafer, dan pengemasan sebagai risiko geopolitik.

[^9]: [Kapasitas CoWoS TSMC dan Pangsa NVIDIA](https://www.financialcontent.com/article/tokenring-2025-12-26-tsmc-boosts-cowos-capacity) — Data dari FinancialContent dan SiliconAnalysts menunjukkan bahwa NVIDIA sekitar menyumbang enam puluh persen kapasitas CoWoS TSMC (SiliconAnalysts menyebutkan sekitar 595.000 wafer), sementara media Taiwan mengatakan mencapai tujuh puluh persen pada tahun 2025; tiga pelanggan terbesar (NVIDIA, Broadcom, AMD) secara total melebihi 85%.

[^10]: [Ingrasys menguasai lebih dari empat puluh persen perakitan rak AI](https://vocus.cc/) — Estimasi dari YuShan Securities menunjukkan bahwa Ingrasys bertanggung jawab atas modul GPU GB200 NVL72, papan sakelar (Switch board), papan komputasi (Compute board) dan sistem kabinet, dengan pangsa pasar melebihi 40%, dan pabrik di Nanqing adalah pabrik mercusuar server AI global yang disertifikasi oleh World Economic Forum (Desember 2023).

[^11]: [Quanta menguasai lebih dari separuh dari 50 pusat data terbesar](https://www.artificialintelligence-news.com/news/ai-servers-transform-taiwan-manufacturing-giants/) — Dilaporkan oleh AI News, Quanta (QCT) bertanggung jawab atas integrasi L10 dan L11, dengan pangsa pasar melebihi 50% di antara 50 pusat data cloud terbesar, menjadikannya produsen perakitan server terbesar kedua di dunia.

[^12]: [Pabrik AI baru Wistron di Zhubei 'dikuasai' pesanan NVIDIA](https://vocus.cc/) — Laporan industri menyatakan bahwa Wistron yang bertanggung jawab atas HGX/DGX, pabrik barunya di kawasan AI Zhubei 'sepenuhnya dipesan oleh pesanan kuat dari NVIDIA'.

[^13]: [Data konferensi pers margin kotor server AI perusahaan Taiwan](https://www.cnyes.com/) — Konferensi pers triwulanan FY2025–FY2026: Margin kotor Ingrasys Q1 FY2026 sebesar 6,18% (server AI menyumbang lebih dari lima puluh persen pendapatan jaringan cloud), Quanta 4,78% (turun 1,54 poin persentase triwulanan, terendah dalam 15 kuartal), Wistron 5,21%, dan Wistron Nano 7,2% (9,4% pada periode yang sama tahun lalu).

[^14]: [Margin kotor perusahaan Taiwan di rantai pasokan sekunder (YuShan Securities)](https://vocus.cc/) — Perusahaan Taiwan dengan fokus teknologi justru memiliki margin yang lebih tinggi: Delta Electronics (daya/pendinginan) menguasai lebih dari 60% pasar daya server AI, dengan margin kotor 37% pada Q1 FY2026; Hsinchu (substrat ABF) menguasai lebih dari 70% substrat ASIC AI, dan merupakan satu-satunya pemasok bahan papan untuk CoWoP NVIDIA, dengan estimasi margin 21,3%.

[^15]: [Morgan Stanley: Margin kotor nilai tambah perakitan ODM menurun](https://newtalk.tw/) — Menurut laporan Morgan Stanley tanggal 22 Mei 2026 yang dikutip Newtalk, margin kotor nilai tambah sistem perakitan ODM turun dari 2,7% untuk GB300 menjadi sekitar 1,9% untuk VR200; sementara nilai tambah per kabinet ODM meningkat dari sekitar $108.000 untuk GB300 menjadi $149.600 untuk VR200. Catatan: Ini adalah margin kotor nilai tambah sistem perakitan lengkap, berbeda dengan margin kotor perusahaan secara keseluruhan (5–7%).

[^16]: [Wawasan Taiwan: Ekonomi Taiwan yang Makmur, Banyak Orang Tidak Merasakan Manfaatnya](https://taiwaninsight.org/) — Penulis Min-Hua Chiang dari University of Nottingham menulis pada 12 Januari 2026: 'Sebagian besar orang di Taiwan tidak merasakan manfaat dari ekonomi yang berkembang.' 'Pemilik pendapatan 10% teratas di Taiwan menerima 48% total pendapatan, sementara 50% terbawah hanya menerima 12%.' Pertumbuhan ekonomi tahun 2025 diperkirakan sebesar 7,37%, menempatkan negara ini di jajaran atas global.

[^17]: [Reporter: Polarisasi Tipe K di Bawah Prospek AI](https://www.twreporter.org/) — Tulisan oleh Wang Yingda pada 11 Juni 2026: 'Jumlah pekerja langsung di rantai pertumbuhan utama seperti AI, semikonduktor, dan pasokan elektronik kurang dari 10% dari total angkatan kerja.' 'Gaji bulanan rata-rata per orang di industri restoran adalah NT$38.484, hanya 34,6% dibandingkan dengan manufaktur komponen elektronik.' Proporsi pendapatan sektor terkait elektronik meningkat dari 58,0% menjadi 64,7% dalam manufaktur.

[^18]: [《The Nvidia Way》: Tiga Puluh Hari Sebelum Bangkrut](https://www.acquired.fm/episodes/nvidia-the-gpu-company-1993-2006) — Karya Tae Kim dan podcast Acquired/Sequoia, pepatah internal NVIDIA 'Perusahaan kami akan bangkrut dalam tiga puluh hari.' (dibuka di rapat bulanan), pada Agustus 1997 saat RIVA 128 dikirim, perusahaan hanya memiliki gaji sekitar satu bulan. Ini adalah pepatah bahasa Inggris tanpa terjemahan kata per kata dalam bahasa Mandarin.

[^19]: [Sega Menyelamatkan NVIDIA dengan $5 Juta](https://www.acquired.fm/episodes/nvidia-the-gpu-company-1993-2006) — Podcast Acquired dan materi sejarah awal NVIDIA, yang benar-benar menyelamatkan NVIDIA dari krisis keuangan pada akhir 1990-an adalah Sega (SEGA) dengan $5 juta, bukan Taiwan; mengklarifikasi narasi romantis 'Taiwan menyelamatkan NVIDIA.'

[^20]: [Jensen Huang Mengirim Surat kepada Morris Chang Meminta Fabrikasi Kontrak Manufaktur](https://www.ettoday.net/) — ETtoday mengutip bahwa sekitar tahun 1996, Jensen Huang mengirim surat kepada pendiri TSMC, Morris Chang, menanyakan 'Bisakah TSMC memproduksi chip pertama untuk NVIDIA?' Pada tahun 1998, kedua belah pihak secara resmi menandatangani kontrak kerja sama, dan TSMC menjadi pabrik semikonduktor utama.

[^21]: [Mi Yu-jie dari TSMC: Kerjasama Mendalam Dimulai pada Tahun 1997](https://technews.tw/) — Laporan TechNews pada 19 Mei 2025, Mi Yu-jie dari TSMC mengulas: 'Kerja sama mendalam dimulai pada momen penting, yaitu tahun 1997. Pendiri TSMC, Morris Chang, secara pribadi menghubungi pendiri NVIDIA, Jensen Huang, untuk memenuhi permintaan layanan fabrikasi NVIDIA.'

[^22]: [Adegan Jensen Huang Menerima Panggilan dari Morris Chang (Transmisi Sekunder)](https://www.businessweekly.com.tw/) — Komik versi majalah Bisnis yang menggambarkan Jensen Huang berteriak kepada orang di sekitarnya ketika menerima telepon dari Morris Chang: 'Hei! Pelan-pelan! Ini Morris Chang!' Ini adalah transmisi sekunder, dan nadanya mungkin tidak akurat.

[^23]: [Kesalahan Proses TSMC pada Tahun 1998 Hampir Menghancurkan NVIDIA](https://www.acquired.fm/episodes/nvidia-the-gpu-company-1993-2006) — Podcast Acquired dan materi sejarah awal NVIDIA, kesalahan proses kimia di TSMC pada tahun 1998 menyebabkan pembuangan massal chip NVIDIA, hampir menjatuhkan perusahaan lagi—memverifikasi kerangka simbiosis timbal balik 'Taiwan adalah urat nadi manufaktur, bukan penyelamat dari kebangkrutan.'

[^24]: [AlexNet Dilatih dengan Dua GTX 580](https://en.wikipedia.org/wiki/AlexNet) — Wikipedia dan Tom's Hardware, pada tahun 2012 Alex Krizhevsky melatih AlexNet di kamar orang tuanya menggunakan dua kartu grafis NVIDIA GTX 580, menurunkan tingkat kesalahan pengenalan gambar ImageNet dari 26% menjadi 15,3%, unggul 10,8 poin persentase dari peringkat kedua, membuktikan GPU sebagai mesin pembelajaran mendalam. CUDA diluncurkan pada tahun 2006.

[^25]: [Blackwell/Rubin Sepenuhnya Bergantung pada CoWoS-L di Taiwan](https://finance.biggo.com/news/) — Analisis industri (mengutip Times), dari 2025–2027, GPU AI tercanggih NVIDIA sepenuhnya berada di lini produksi TSMC CoWoS-L di Taiwan, mulai dari manufaktur hingga pengemasan akhir.

[^26]: [TSMC Menguasai Sekitar 90–92% Proses Lanjutan Global](https://www.csis.org/analysis/countering-chinas-challenge-american-ai-leadership) — Analisis CSIS, TSMC memproduksi sekitar 92% semikonduktor tercanggih (di bawah 5 nanometer) secara global, dengan kapasitas pengemasan canggih melebihi total pesaing; klien yang hampir semuanya bergantung pada Taiwan termasuk Apple, Amazon, Google, NVIDIA, dan Qualcomm.

[^27]: [Zhou Yun-tsai dari NTU: Tidak Mungkin Mendiversifikasi Fabrikasi TSMC dalam Jangka Pendek](https://www.sciencedirect.com/) — ScienceDirect, penelitian oleh Yuntsai Chou (NTU) pada tahun 2025: 'Rantai pasokan Taiwan akan sangat rentan terhadap karantina yang dimulai sebelum 2027.' 'Diversifikasi pabrik semikonduktor TSMC tidak layak dalam jangka pendek. Membangun pabrik mutakhir baru membutuhkan waktu 3–4 tahun dan biaya $10 miliar lebih.' Target produksi 2 nanometer di Arizona oleh TSMC adalah pada tahun 2030.

[^28]: [United Daily News: Dua Bintang Triliunan Menjadi Industri Tragis dengan Kerugian Triliunan](https://udn.com/) — Tinjauan United Daily News terhadap kebijakan 'Dua Bintang Triliunan': 'Produsen panel dan pabrik memori industri semikonduktor yang sempat bersinar, mengalami kerugian besar beberapa tahun kemudian karena kelebihan pasokan pasar internasional, sehingga diejek oleh netizen sebagai 'Taois Mao' (Mao San Dao Si), yaitu margin kotor produk hanya tiga hingga empat persen, dan 'industri Dua Bintang Triliunan' berubah menjadi 'industri tragis dengan kerugian triliunan.' Panel dan DRAM dikuras karena investasi R&D yang hanya 6% (jauh di bawah 10–21% Korea, Jepang, AS, Eropa).

[^29]: [Yield TSMC 5nm Hanya Sepertiga dari TSMC](https://technews.tw/2025/03/28/) — Laporan TechNews pada 28 Maret 2025: 'Wafer 5 nanometer dari SMIC dengan proses manufaktur yang sama lebih mahal 50% daripada TSMC, dan yield-nya hanya 33% dari TSMC karena hanya menggunakan peralatan DUV.' Diklaim untuk produksi massal pada Desember 2025, tertinggal sekitar lima tahun.

[^30]: [NVIDIA Berinvestasi $5 Miliar di Intel untuk Mengamankan Kapasitas Pengemasan](https://www.intel.com/) — Pada Desember 2025, NVIDIA memperoleh sekitar 5% saham di Intel, dengan tujuan sebenarnya adalah 'memastikan akses prioritas ke kapasitas pengemasan canggih Intel di AS,' dievaluasi untuk arsitektur Feynman pada tahun 2028, sebagai respons terhadap hambatan CoWoS TSMC. Ini adalah lindung nilai jangka panjang, bukan pengganti jangka pendek.

[^31]: [TSMC Pabrik Pengemasan Arizona AP1 Produksi Massal 2028](https://www.tomshardware.com/) — Laporan industri, pabrik pengemasan TSMC di Arizona (AP1/AP2) akan mulai konstruksi awal pada awal 2026, dan AP1 diperkirakan untuk produksi massal pada tahun 2028; saat ini 100% wafer (termasuk yang diproduksi di Phoenix, Arizona) masih harus dikirim kembali ke Taiwan untuk pengemasan. Pabrik Amkor di Arizona akan mulai berproduksi awal pada tahun 2028.

[^32]: [PiFO dari Largan Menargetkan CoWoS-L](https://www.trendforce.com/news/) — TrendForce, 10 November 2025: 'Teknologi pengemasan PiFO—diukur terhadap CoWoS-L TSMC—telah muncul sebagai alternatif teratas di industri', pendingin substrat kaca lebih baik dan biaya produksi sekitar 30% lebih rendah, banyak perusahaan chip AI AS berebut bantuan, pesanan sudah terjadwal hingga tahun 2027. Namun penerimanya adalah 'perusahaan chip AI AS lainnya', bukan GPU utama NVIDIA yang jelas.

[^33]: [TrendForce: Kesenjangan CoWoS Menyempit Berkat Ekspansi TSMC Sendiri](https://www.trendforce.com/news/) — TrendForce, 15 Juni 2026: 'kesenjangan pasokan-permintaan CoWoS diperkirakan menyempit secara signifikan dari sekitar 20% saat ini menjadi sekitar 10% pada akhir tahun 2026', kapasitas bulanan dapat mencapai rekor tertinggi 120.000 hingga 140.000 unit pada tahun 2026; cara penyempitan kesenjangan adalah ekspansi TSMC sendiri, bukan pengisi dari pemasok alternatif.

[^34]: [Life Insurance New Guang Mengajukan Hak Atas Tanah di Beoshi Ke T17/T18 Pada Tahun 2021](https://www.cna.com.tw/news/afe/202510035002.aspx) — CNA, pada tahun 2021, pemerintah kota Taipei melelang hak guna tanah (50 tahun) untuk Beoshi Ke T17 dan T18 (total 3.89 hektar) (membatalkan persyaratan rencana investasi), New Life memenangkan lelang tunggal dengan T17 seharga 2,8 miliar dan T18 seharga 1,6 miliar (total 4,4 miliar), dibiarkan kosong selama tiga tahun.

[^35]: [Jensen Huang Mengumumkan Markas Besar Constellation di Beoshi Ke Pada Computex 2025](https://focustaiwan.tw/business/202505190009) — Focus Taiwan, Jensen Huang mengumumkan pada Computex Mei 2025 bahwa kantor pusat luar negeri NVIDIA 'Constellation Headquarters' berlokasi di Taman Teknologi Sulin, Beitou, dengan investasi lebih dari NT$40 miliar, konstruksi dimulai pada tahun 2026, dan akan beroperasi pada tahun 2030, menyediakan lebih dari sepuluh ribu lapangan kerja.

[^36]: [NVIDIA, New Life, dan Pemerintah Kota Taipei Terjebak Selama Lima Bulan](https://news.pts.org.tw/article/777650) — CTV, karena hak guna tanah Beoshi Ke T17/T18 berada di tangan New Life, dan hak guna tanah publik tidak dapat ditransfer secara langsung, pihak-pihak tersebut terjebak dalam masalah akuisisi lahan selama sekitar lima bulan.

[^37]: [Dewan Kota Taipei Menyetujui Biaya Pembatalan Sebesar 4,43 Miliar](https://www.cna.com.tw/news/afe/202510035002.aspx) — CNA, pada 12 November 2025, Dewan Kota Taipei menyetujui tanpa keberatan biaya pembatalan sebesar NT$4.434.064.085 yang akan dibayar oleh pemerintah kota kepada New Life untuk mengambil kembali tanah tersebut, dan hak guna tanah akan dihapus pada tanggal 28 Desember.

[^38]: [You Shuhui Mengkritik Tagihan Pembatalan dari New Life](https://www.nextapple.com/) — iFine News (diverifikasi melalui WebFetch), anggota parlemen KMT You Shuhui berkata kata demi kata: 'Ketika saya melihat tagihan 8 halaman dari New Life, di mana bahkan biaya pemotongan rumput, pemeliharaan lingkungan, penyesuaian logo, dan biaya jasa penulis harus dibayar oleh pemerintah kota, saya hanya bisa tersenyum pahit... Biaya penyesuaian logo yang ditanggung bersama oleh Taishin dan New Life juga harus dibayar oleh pemerintah kota? Benar-benar menggelikan... Ah, tiga kali tanpa daya.' Selanjutnya: 'Tagihan untuk New Life tidak masuk akal, tetapi kepentingan umum adalah yang utama'.

[^39]: [Bahasa Sederhana Hukum: Kesepakatan Pembatalan Disetujui Secara Harmonis oleh Partai-partai di Dewan](https://plainlaw.me/) — 法律白話文運動，「11 月 12 日，台北市議會審議通過 44.34 億元解約金案，過程中各黨派和諧融融，民進黨團甚至高呼『支持輝達、儘速簽約』」；議長戴錫欽「沒有意見予以備查」，現場響起掌聲。

[^40]: [Analisis Komposisi Biaya Pembatalan 4,43 Miliar](https://www.nextapple.com/) — iFine News dan akuntan eksternal pemerintah kota Taipei menghitung bahwa New Life awalnya membayar sekitar 3 miliar (tidak beroperasi selama 3 tahun), mengajukan tagihan pembatalan sebesar 4,47 miliar (termasuk biaya pemotongan rumput, penyesuaian logo, biaya pagar), yang dipotong oleh akuntan menjadi 4,43 miliar, di mana total biaya internal dan pajak yang dibayar New Life sebesar 1,441 miliar ditanggung secara keseluruhan oleh NVIDIA.

[^41]: [Komite Kota Menyetujui Desain Kantor Pusat Berbentuk Kapal Bintang Constellation](https://www.cna.com.tw/news/) — 中央社 2026 年 1 月 26 日，T17（2.29 公頃）加 T18（1.6 公頃）合併，建蔽率 50%→70%、容積率 300%、高度 119.5 公尺，仿美國總部「星艦」造型，綠覆率 80%，容約 4,000 人，2026 年底動工、2030 年啟用。

[^42]: [NVIDIA Memiliki Sekitar 1.800 Karyawan di Taiwan Saat Ini](https://www.digitimes.com/news/a20250519PD231/) — Media seperti Digitimes memperkirakan bahwa NVIDIA memiliki sekitar 1.800 karyawan di kantor mereka di Neihu, Taipei (No. 8 Jihu Rd), dan memiliki tiga cabang; ini adalah perkiraan media, bukan angka resmi.

[^43]: [Rencana Pusat Penelitian Inovasi AI NVIDIA](https://focustaiwan.tw/business/202505190009) — Focus Taiwan 與經濟部，NVIDIA 2021 年獲核定「AI 創新研發中心計畫」，總投資 243 億、政府補助 67 億，2022–2027 年新聘 1,000 人研發團隊。

[^44]: [Didirikan Taiwan Nvidia Classic Co., Ltd.](https://www.cna.com.tw/news/afe/202510035002.aspx) — CNA, pada November 2025, NVIDIA mendirikan 'Taiwan Nvidia Classic Co., Ltd.', modalnya meningkat dari 1 miliar menjadi 3,3 miliar, sebagai badan hukum independen yang dapat membayar pajak dan memiliki aset secara mandiri.

[^45]: [S&P: Konsumsi Listrik TSMC Hingga 23,7% Seluruh Taiwan pada Tahun 2030](https://theinitium.com/20250912-international-tsmc-energy-explainer/) — 端傳媒與標準普爾，台積電 2023 年用電 247.75 億度占全台 8.96%（工業部門 16.2%），2024 年用電 274.56 億度、再生能源僅 14.1%；標普預測 2030 年用電可達全台 23.7%。

[^46]: [Greenpeace 'Shadows After the Chip Boom'](https://www.greenpeace.org/taiwan/press/44037/) — Laporan Greenpeace tanggal 10 April 2025 (dapat diverifikasi kata per kata): Konsumsi listrik untuk manufaktur semikonduktor AI global meningkat dari 218 GWh menjadi 984 GWh (peningkatan lebih dari 3,5 kali setahun), dan Taiwan melonjak hingga 375.8 GWh 'mencapai 38% dari total global'; jejak karbon chip AI TSMC adalah 185.700 ton, menjadikannya 'juara emisi karbon'; NVIDIA dinilai F, dengan emisi rantai pasokan meningkat dari 3,51 juta ton menjadi 6,91 juta ton selama tiga tahun, 'hanya mengalihkan emisi dan polusi rantai pasokan ke wilayah lain di dunia'.

[^47]: [Hampir Semua Air Daur Ulang Tainan untuk TSMC](https://theinitium.com/20250912-international-tsmc-energy-explainer/) — Duan Media: Konsumsi air harian TSMC melebihi 200.000 ton (Zhukuo 5,6, Zhongke 5,3, Nanke 9,9 ribu ton); pabrik air daur ulang Siqua Tainan menyediakan 81.000 ton 'hampir seluruhnya untuk TSMC'.

[^48]: [Lahan Pertanian Jia-Nan Mengalami Kekeringan Dua Kali pada Tahun 2021 dan 2023 untuk Menyediakan Air bagi Semikonduktor](https://theinitium.com/) — Dilaporkan oleh Duan Media, lahan pertanian di wilayah Jia-Nan mengalami kekeringan dua kali pada tahun 2021 dan 2023, di mana air irigasi dialihkan untuk digunakan oleh industri semikonduktor.

[^49]: [Satu Wafer 12 Inci Membutuhkan 8.327 Liter Air](https://www.greenpeace.org/taiwan/) — Greenpeace dan data industri menunjukkan bahwa pembuatan satu wafer 12 inci membutuhkan sekitar 8.327 liter air.

[^50]: [60 Ribu Penduduk di Bei-Shi Ke Merebut 1.476 Rumah Tinggal](https://house.udn.com/house/story/123590/8769929) — Properti Economic Daily melaporkan bahwa populasi pekerja tetap di Bei-Shi Ke diperkirakan mencapai 60.000 orang, sementara hanya sekitar 1.476 unit rumah yang tersedia dari 591 statistik, dengan lahan perumahan hanya mencakup 13,8% dari seluruh area.

[^51]: [Proyek Baru di Lokasi Inti Bei-Shi Ke Mencapai Lebih dari 1,5 Juta per Ping](https://www.ctee.com.tw/news/20260603701575-430601) — Industri Times pada Juni 2026 melaporkan bahwa proyek baru di lokasi inti Bei-Shi Ke terjual melebihi 1,5 juta per ping, dengan '60.000 orang merebut 1.500 rumah', dan penduduk lokal mengkhawatirkan kemacetan seperti Neihu dan mempertanyakan 'bagaimana bisa naik harga padahal perusahaan belum mulai konstruksi'.

[^52]: [Pencatatan Harga Riil: Rumah di Distrik Shilin Mencapai Harga Tertinggi 1,88 Juta per Ping](https://lvr.land.moi.gov.tw/) — Situs web layanan pencarian transaksi properti pemerintah Kementerian Dalam Negeri menunjukkan bahwa apartemen tertinggi di distrik Shilin pada tahun 2025 terjual hingga 570.400 Dolar Taiwan per meter persegi (sekitar 1,88 juta per ping, No. 39 Jihe Road, harga total 447 juta), dengan beberapa transaksi melebihi 1,5 juta/ping. Catatan: Ini adalah rumah mewah di area Tianmu dan Shilin, bukan Bei-Shi Ke itu sendiri.

[^53]: [Pihak Industri: Fungsi Kehidupan Area Taman Buruk, Sepertiga Karyawan Mengundurkan Diri](https://house.udn.com/house/story/123590/8769929) — Real Estate United Daily mengutip pihak industri (anonim): 'Karena fungsi kehidupan yang buruk, banyak karyawan tidak mau pindah ke area taman... bahkan setelah pindah, sepertiga karyawan mengundurkan diri karena transportasi yang tidak nyaman'; Kepala Dinas Transportasi Xie Minghong menyatakan bahwa Bei-Shi Ke sedang mengevaluasi penambahan 3 rute operasional.

[^54]: [Opini Anonim PTT: Mengganti Topik Nvidia](https://www.ptt.cc/) — Diskusi anonim di PTT (tidak dapat ditelusuri secara pribadi, sebagai opini anonim): 'Topik TSMC sudah membosankan, sekarang hanya mengganti ke topik Nvidia', 'Banyak insinyur di Neihu tinggal di kabupaten lain, apakah semua orang akan pindah ke Bei-Shi Ke karena Nvidia? Logika yang tidak masuk akal?'

[^55]: [Debat Perisai Silikon dan Jebakan Silikon](https://www.researchgate.net/) — Penelitian ResearchGate pada tahun 2025 'Silicon Shield or Silicon Trap?', mengeksplorasi sifat ganda konsentrasi semikonduktor Taiwan yang merupakan perlindungan pencegah (Perisai Silikon) sekaligus pemicu agresi/kegagalan titik tunggal (Jebakan Silikon).

[^56]: [Bantahan Terhadap Strategi 'Sarang Rusak'/'Perang Bumi Hangus'](https://thenewslens.com/) — The News Lens dan Parameters dari Sekolah Perang Angkatan Darat AS (McKinney & Harris, 2021) mengenai argumen dan bantahan 'Broken Nest': 'Kerusakan ekonomi, bahkan jika berhasil mencegah Tiongkok dalam jangka pendek, mungkin hanya menunda agresi Tiongkok sampai Tiongkok dapat memenuhi tujuan produksi semikonduktor domestik', 'tidak mungkin masyarakat Taiwan memandang sabotase tersebut sebagai kepentingan negara itu sendiri'.

[^57]: [Ekspansi TSMC di AS Senilai 165 Miliar Dolar](https://www.foreignaffairs.com/) — TSMC mengumumkan investasi total sebesar 165 miliar dolar (65 miliar + 100 miliar) untuk ekspansi di Arizona, AS, guna mendiversifikasi risiko geopolitik.

[^58]: [MIT Technology Review: Perisai Silikon Taiwan Mungkin Melemah](https://www.technologyreview.com/) — Technology Review MIT pada 15 Agustus 2025 'Taiwan's silicon shield could be weakening': 'Sekarang beberapa spesialis Taiwan dan warga pulau khawatir bahwa 'perisai silikon' ini, jika pernah ada, sedang retak.' Kekhawatiran bahwa relokasi kapasitas mengencerkan modal lokal Taiwan.

[^59]: [Bonnie Glaser: Ekosistem Taiwan Sulit Direplikasi](https://www.technologyreview.com/) — Technology Review MIT mengutip Bonnie Glaser dari Marshall Institute Jerman: 'Ekosistem yang mereka ciptakan benar-benar unik. Ini adalah fungsi dari jalur talenta, budaya, dan hukum di Taiwan; Anda tidak bisa mereplikasinya dengan mudah di tempat lain.'

[^60]: [Paul Triolo: Arizona Tidak Akan Pernah Mencapai Tingkat Itu](https://www.technologyreview.com/) — Technology Review MIT mengutip pakar kebijakan teknologi Paul Triolo mengenai pabrik TSMC di Arizona: 'Arizona belum sampai ke sana, dan tidak akan pernah sampai'.

[^61]: [Jensen Huang: Taiwan adalah salah satu negara terpenting di dunia](https://www.cna.com.tw/) — Laporan dari Central News Agency, Jensen Huang secara terbuka menyatakan pada 29 Mei 2024 bahwa: "Taiwan is one of the most important countries in the world." (dalam bahasa Inggris).

[^62]: [Pidato Universitas Nasional Taiwan di Computex 2024: Taiwan adalah pilar dunia yang tak ternama](https://www.tbotaiwan.com/) — Transkrip lengkap pidato Jensen Huang di Computex Universitas Nasional Taiwan pada tahun 2024, video penutupnya berbunyi: "Taiwan adalah pahlawan tanpa nama, namun merupakan pilar dunia." "Terima kasih, Taiwan!" "Taiwan adalah pusat mitra kami yang sangat berharga, dan segalanya bagi NVIDIA dimulai dari sini."

[^63]: [Chen Binhua dari Kantor Urusan Negara Tiongkok menanggapi pernyataan Jensen Huang](https://zh.wikinews.org/) — Wiki News, juru bicara Kantor Urusan Negara Tiongkok, Chen Binhua (18 hari setelah kejadian): "Masyarakat dan netizen di daratan telah menyatakan ketidakpuasan yang kuat terhadap ucapan yang sangat salah ini. Taiwan tidak pernah menjadi negara... kami harap dia belajar dengan baik."

[^64]: [Central News Agency: Media Tiongkok membungkam pernyataan Jensen Huang bahwa 'Taiwan adalah negara penting'](https://www.cna.com.tw/) — Central News Agency pada 3 Juni 2024: "Media keuangan di sini telah melakukan banyak liputan terkait, tetapi tidak menyebutkan pernyataan Jensen Huang bahwa 'Taiwan adalah negara penting', seolah-olah mengabaikan isu sensitif yang biasanya dianggap sebagai 'hal terpenting'."

[^65]: [Pakar: Tiongkok membutuhkan Nvidia, tetapi Nvidia tidak membutuhkan Tiongkok](https://www.voacantonese.com/a/china-s-media-turned-a-blind-eye-to-jensen-huang-s-statement-20240607/7646642.html) — VOA berbahasa Kanton menyajikan komentar pakar, menganalisis bahwa pembungkaman media keuangan Tiongkok terhadap pernyataan Jensen Huang 'Taiwan adalah negara penting' mencerminkan hubungan asimetris 'Tiongkok membutuhkan Nvidia, tetapi Nvidia tidak membutuhkan Tiongkok.'

[^66]: [Lai Ching-te: Lima pusat komputasi teratas global dan AI kedaulatan](https://www.bnext.com.tw/article/79391/sovereign-ai) — Digital Age, Lai Ching-te pada Oktober 2025 mengemukakan target menjadikan Taiwan sebagai 'lima pusat komputasi teratas global' dan mengembangkan 'AI kedaulatan.'

[^67]: [Foxconn membangun superkomputer nasional Blackwell sebanyak sepuluh ribu unit](https://blogs.nvidia.com.tw/blog/foxconn-ai-factory-tsmc-taiwan-nvidia/) — Blog NVIDIA Taiwan, Foxconn (Big Innovation Company) di Kaohsiung membangun superkomputer nasional yang menggunakan 10.000 chip Blackwell dengan lebih dari 90 exaflops, bekerja sama dengan TSMC dan KIST untuk menciptakan pabrik AI pertama di Taiwan.

[^68]: [Sepuluh Proyek Baru AI Kementerian Administrasi Negara](https://iknow.stpi.niar.org.tw/post/Read.aspx?PostID=21832) — STPI iKnow, rencana 'Sepuluh Proyek Baru AI' dari Kementerian Administrasi Negara berencana menginvestasikan lebih dari 100 miliar TWD sebelum tahun 2040, dengan target nilai output 15 triliun.

[^69]: [TAIDE seperti siswa SMA, perusahaan internasional sudah setara mahasiswa pascasarjana](https://www.cw.com.tw/article/5137534) — Sin Chew Daily, model bahasa lokal Taiwan TAIDE digambarkan 'seperti siswa SMA, sementara perusahaan internasional sudah berada di tingkat pascasarjana', anggaran tahunan TAIDE bahkan tidak mencukupi biaya pelatihan satu kali dari model internasional; TAIDE dimulai dengan 9 unit (72 chip) H100.

[^70]: [Pemerintah Korea Selatan membeli 260.000 GPU](https://www.cw.com.tw/) — Sin Chew Daily dan laporan industri, pemerintah Korea Selatan secara langsung membeli 260.000 GPU, yang kontras dengan keraguan relatif dalam pengambilan keputusan kebijakan Taiwan.

[^71]: [Jensen Huang di Computex 2026: Pengeluaran tahunan sekitar 150 miliar dolar AS di Taiwan](https://cryptobriefing.com/nvidia-150b-taiwan-silicon-shield-ai/) — Cryptobriefing dan Reuters, Jensen Huang mengungkapkan pada Computex 2026 bahwa NVIDIA menghabiskan sekitar 150 miliar dolar AS per tahun di Taiwan (hanya 10-15 miliar lima tahun lalu), mitra rantai pasokan Vera Rubin berlipat ganda, termasuk 150 perusahaan Taiwan; TSMC memproduksi sekitar 90% proses paling canggih secara global.
