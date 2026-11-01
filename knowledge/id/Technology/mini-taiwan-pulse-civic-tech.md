---
title: 'Mini Taiwan Pulse: Menggunakan Mata Kurator untuk Melukis Taiwan Menjadi Peta yang Bernapas'
description: 'Pada tahun 2026, analis data Migu menyeret sebuah file CSV ke dalam Kepler.gl, dan peta Taiwan pertama muncul di layarnya. Dua tahun kemudian, proyek mini-taiwan-pulse yang paling populer telah mengumpulkan 375 bintang di GitHub, menggabungkan lima jenis data real-time—langit, laut, daratan, jalanan, dan pengelolaan limbah—menjadi sebuah peta bergerak. Dengan data terbuka sebanyak 50.000 entri dari pemerintah pusat dan lebih dari dua puluh platform kota/kabupaten, otak manusia tidak akan sanggup memproses semuanya; solusinya bukanlah menambah orang, melainkan menyerahkannya kepada sistem yang diatur oleh AI Agent yang dapat berkembang sendiri, di mana manusia hanya bertanggung jawab untuk mengajukan pertanyaan dan melakukan verifikasi. Dari mata kurator yang dilatih melalui perencanaan kota, hingga pipeline kebakaran yang berjalan otomatis di dalam tmux, bagaimana GitHub satu orang bisa tumbuh menjadi sebuah galaksi bintang.'
date: 2026-04-19
category: 'Technology'
tags:
  [
    'Teknologi',
    'Teknologi Kewarganegaraan',
    'Data Terbuka',
    'Visualisasi Data',
    'Proyek Sumber Terbuka',
    'TDX',
    'Three.js',
    'Kecerdasan Buatan',
    'AI Agent',
    'GIS',
  ]
subcategory: '公民科技'
author: 'Taiwan.md'
featured: false
lastVerified: 2026-06-25
lastHumanReview: true
readingTime: 20
image: '/article-images/technology/mini-taiwan-pulse-map-2026.webp'
imageCredit: 'Migu / sciwork 2026'
imageLicense: 'Fair use editorial commentary'
imageSource: 'https://github.com/ianlkl11234s/0613-sci-work-share'
relatedDiary: ['2026-06-25-203919-manual-mirror']
sporeLinks:
  - id: 150
    platform: 'threads'
    date: '2026-06-25'
    url: 'https://www.threads.com/@taiwandotmd/post/DaA6aTRk7e6'
  - id: 151
    platform: 'x'
    date: '2026-06-25'
    url: 'https://x.com/taiwandotmd/status/2070173370118000879'
translatedFrom: 'Technology/mini-taiwan-pulse.md'
sourceCommitSha: 'f4ae4fb8f'
sourceContentHash: 'sha256:0128d89b548611d1'
sourceBodyHash: 'sha256:ce5c6e11aac7eea6'
translatedAt: '2026-10-21T00:59:50.409094+00:00'
---

# Mini Taiwan Pulse: Menggambar Taiwan sebagai Peta yang Bernapas dengan Mata Seorang Kurator

Pada suatu hari di awal 2026, seorang analis data bernama Migu mengubah sebuah berkas CSV menjadi GeoJSON, lalu menyeretnya ke alat bernama Kepler.gl di peramban. Tanpa menulis satu baris kode pun, peta Taiwan pertamanya langsung muncul di layar.

Ia mempelajari perencanaan kota di universitas dan sempat bersentuhan dengan GIS—sistem informasi geografis, sederhananya alat yang membuat data tampil di atas peta. Setelah memasuki dunia kerja, ia menekuni analisis data dan sudah lama tidak lagi berurusan dengan peta. Ketika ia menyeret CSV itu ke Kepler.gl dan menyaksikan Taiwan terbentuk di layar, sebuah keheranan sederhana terlintas dalam benaknya:

> “Ternyata Taiwan punya begitu banyak data. Ternyata mengubahnya menjadi peta tidaklah sulit.”[^1]

Kalimat itu mungkin terdengar biasa saja. Namun, kelak ia menjadi benih bagi sebuah sistem utuh.

> **Ikhtisar 30 detik:** Sejak akhir 2025, Migu (GitHub `ianlkl11234s`) telah membuat lebih dari sepuluh proyek visualisasi menggunakan data terbuka Taiwan. Proyeknya yang paling populer, mini-taiwan-pulse, mengumpulkan 375 bintang di GitHub dan menumpuk lima jenis data waktu nyata—langit, laut, daratan, jalan, dan pengangkutan sampah—menjadi sebuah peta bergerak[^2]. Namun, dalam ceramah untuk komunitas sciwork pada Juni 2026, ia menyatakan persoalannya secara gamblang: pemerintah pusat Taiwan saja memiliki sekitar 50.000 set data terbuka yang tersebar di platform lebih dari dua puluh kabupaten dan kota; “otak manusia tidak mungkin memindai semuanya.” Jawabannya bukan meminta lebih banyak orang membantu memindainya, melainkan menyerahkan seluruh data kepada sistem yang diorkestrasi oleh AI Agent dan mampu tumbuh sendiri, sementara manusia hanya bertugas menetapkan persoalan dan memeriksa hasilnya[^3].

Artikel ini mengisahkan bagaimana seseorang beranjak dari kepolosan menyeret sebuah CSV menuju kesediaan membiarkan sistem tumbuh untuknya.

## Satu Akun GitHub, Bagaimana Bisa Tumbuh Menjadi Sebuah Galaksi

Jika hanya melihat proyek `mini-taiwan-pulse` ini saja, orang akan mudah menganggap Migu sebagai insinyur amatir yang sekadar iseng: tiba-tiba bersemangat di akhir pekan, membuat sebuah demo, dan kebetulan menjadi viral.

Asumsi ini salah dalam dua hal.

Pertama, apa yang dia buat jauh lebih banyak dari satu proyek. Jika Anda membuka GitHub miliknya, setelah Desember 2025, repositorinya dipenuhi dengan visualisasi data terbuka Taiwan: awalnya adalah PoC cakupan bus untuk uji coba, kemudian pada akhir Desember sebuah proyek pembelajaran bernama `mini-taiwan-learning-project` menjadi viral lebih dulu, dan kini telah mencapai 189 bintang. Pada bulan Februari, dia membuat titik lokasi real-time AIS kapal, serta `flight-arc-graph` (56 bintang) yang menggambar setiap segmen lepas landas dan pendaratan penerbangan sebagai busur. Baru pada akhir Februari proyek `mini-taiwan-pulse` muncul, diikuti oleh atlas TRA (Taiwan Railways Administration), orbit satelit, CCTV gambar real-time, hingga dasbor situasi `mini-taiwan-info` yang merangkum seluruh data⋯⋯ terus berlanjut hingga bulan Juni[^2]. Belasan repositori saling terhubung membentuk satu kesatuan, yang dia beri nama galaksi "Mini Taiwan".

![Dasbor situasi Mini Taiwan Info, yang merangkum berbagai tema data terbuka seperti populasi, transportasi rel, pelayaran, sumber daya air, pemadam kebakaran, medis, dan lainnya menjadi panel pemantauan satu halaman per tema](/article-images/technology/mini-taiwan-info-dashboard-2026.webp)

_Anggota lain dalam galaksi ini, Mini Taiwan Info: Dia merangkum data terbuka yang tersebar menjadi sebuah dasbor pemantauan situasi; populasi, transportasi rel, pelayaran, sumber daya air, pemadam kebakaran, medis, satu halaman untuk satu tema. Foto: Migu / sciwork 2026 (penggunaan wajar untuk tujuan editorial dan ulasan)._

Jika kita mengurutkan jumlah bintang dari proyek-proyek ini, jelas bahwa yang populer bukan hanya satu.

```tw-bars
GitHub Migu: Lebih dari satu repo yang populer (Bintang GitHub)
*mini-taiwan-pulse | 375 | Flagship
mini-taiwan-learning-project | 189 | Viral lebih awal dari pulse
flight-arc-graph | 56 | Jejak penerbangan
tw-ship-viz | 11 | Kapal laut
mini-tw-cctv | 6 | Gambar real-time
satellite-arc | 6 | Satelit
Sumber: GitHub API, 2026-06-25
```

Hal kedua yang salah tersembunyi di dalam kata "satu orang", yang akan kita bedah nanti. Mari kita lihat terlebih dahulu bagaimana galaksi ini tumbuh.

```tw-timeline
2025-12 | Uji coba pertama | PoC cakupan bus, upaya awal visualisasi data terbuka Taiwan
2025-12 | learning-project viral lebih dulu | Visualisasi transportasi rel Taipei, viral lebih awal dari flagship (189★)
2026-02 | Kelahiran flagship | mini-taiwan-pulse diluncurkan, berevolusi dari JSON statis menjadi basis data ruang-waktu
2026-06 | Memaparkan seluruh sistem | Ceramah sciwork 2026: Sistem yang menyerahkan data terbuka kepada Agent untuk dikembangkan
Sumber: Catatan proyek GitHub Migu (kronologi proyek dan jumlah bintang) serta konten ceramah sciwork 2026[^2][^3]
```

## Metode yang sama, dari MRT hingga Tata Surya

Proyek unggulannya sendiri juga terus tumbuh. Mini-taiwan-pulse yang paling awal memiliki tiga lapisan: langit, laut, dan daratan. Pada versi yang ditampilkan dalam ceramahnya, proyek itu sudah menjadi “lima denyut yang bergerak bersama”: pesawat di langit, kapal di laut, kereta api di daratan, bus di jalan, serta truk sampah untuk pengangkutan sampah. Lima jenis data waktu nyata dengan frekuensi berbeda ditumpuk di atas satu peta yang bernapas. Dalam presentasinya, ia mengatakan bahwa untuk pertama kalinya proyek tersebut “berevolusi dari JSON statis menjadi basis data ruang-waktu”[^3]. Pada lapisan jalan saja, menurutnya, proyek itu terhubung ke lebih dari 5.700 bus di TDX dan memperbarui posisi setiap 30 detik.

![Peta pertama pada DAY 0: sebuah CSV diubah menjadi GeoJSON lalu diseret ke Kepler.gl; tanpa menulis kode, peta Taiwan pertama langsung muncul](/article-images/technology/mini-taiwan-kepler-day0-2026.webp)

_“DAY 0” dalam ceramahnya: sebuah CSV diubah menjadi GeoJSON dan diseret ke Kepler.gl. Tanpa satu baris kode pun, peta Taiwan pertama tercipta—titik awal seluruh galaksi tersebut. Gambar: Migu / sciwork 2026 (penggunaan wajar untuk komentar editorial)._

Percikan pertama galaksi ini adalah visualisasi transportasi rel Taipei yang ia sebut “Mini Taipei”. Ia menumpuk tiga sistem rel—MRT, Taiwan Railways, dan kereta cepat—menjadi satu peta bergerak, dengan kereta melaju mengikuti jadwal. Ia mengatakan bahwa pada saat itulah ia pertama kali “merasakan daya tarik dinamika”; lebih dari tiga ratus perjalanan kereta bergerak secara bersamaan di layar[^3]. Sebuah jadwal statis pun berubah menjadi napas sebuah kota.

![Mini Taipei menumpuk MRT, Taiwan Railways, dan kereta cepat menjadi satu peta bergerak; lebih dari tiga ratus perjalanan kereta melaju mengikuti jadwal](/article-images/technology/mini-taiwan-taipei-rail-2026.webp)

_Mini Taipei: MRT, Taiwan Railways, dan kereta cepat tampil dalam satu bingkai, dengan lebih dari tiga ratus perjalanan kereta melaju mengikuti jadwal. Ia mengatakan bahwa inilah pertama kalinya ia “merasakan daya tarik dinamika”. Gambar: Migu / sciwork 2026 (penggunaan wajar untuk komentar editorial)._

Sejak itu, seolah kecanduan, ia menerapkan metode “mengubah data menjadi sesuatu yang dinamis” pada skala yang semakin besar. Di laut, ia menghubungkan titik waktu nyata AIS dari Administrasi Maritim dan Pelabuhan, lalu menggunakan bola cahaya biru kehijauan dengan jejak gradasi selama tiga puluh menit untuk menggambarkan arah kapal-kapal di perairan sekitar Taiwan.

![Kapal-kapal di perairan sekitar Taiwan yang digambar menggunakan titik waktu nyata AIS dari Administrasi Maritim dan Pelabuhan, dengan bola cahaya biru kehijauan dan jejak gradasi selama tiga puluh menit](/article-images/technology/mini-taiwan-ships-ais-2026.webp)

_Denyut laut: titik waktu nyata AIS dari Administrasi Maritim dan Pelabuhan, dengan bola cahaya biru kehijauan dan jejak gradasi selama tiga puluh menit, menggambarkan kapal-kapal di perairan sekitar Taiwan. Gambar: Migu / sciwork 2026 (penggunaan wajar untuk komentar editorial)._

Kemudian ia mendorong metode yang sama melampaui Bumi. Dengan memakai parameter orbit TLE terbuka untuk menghitung posisi satelit, ia menggambar lintasan satelit yang melewati Taiwan, lalu memperluasnya hingga mencakup seluruh Tata Surya. Dalam presentasinya ia berkata terus terang, “Dengan metode yang sama, selama datanya tersedia, pengembangannya tidak terbatas.”[^3] Pada saat itu, kita menyadari bahwa yang sebenarnya memikatnya adalah tindakan “mengubah data menjadi sesuatu yang dapat dilihat”; peta hanyalah bentuk pertamanya.

![Visualisasi orbit satelit yang dihitung menggunakan TLE terbuka; metode yang sama diperluas dari permukaan Taiwan hingga ruang angkasa](/article-images/technology/mini-taiwan-satellite-2026.webp)

_Metode yang sama didorong melampaui Bumi: orbit satelit dihitung menggunakan TLE terbuka, lalu diperluas hingga mencakup seluruh Tata Surya. Gambar: Migu / sciwork 2026 (penggunaan wajar untuk komentar editorial)._

## Menumpuk pulau-pulau data: kesenjangan muncul dengan sendirinya

Perlahan-lahan, hal yang patut diamati tidak lagi sekadar “titik waktu nyata yang bergerak”, tetapi “menumpuk data yang semula tidak berkaitan sehingga kesenjangannya muncul dengan sendirinya”. Beberapa proyek dalam galaksi ini khusus melakukan hal tersebut. Salah satunya ia sebut “Pertanian × Air”, yang menumpuk pulau-pulau data milik tiga kementerian—pertanian, pengairan, dan mitigasi bencana—menjadi satu peta: lahan pertanian, sungai, saluran air, tanggul, dan potensi banjir tampil dalam satu bingkai. Agar peta gabungan tersebut dapat berjalan di peramban, ia menggunakan format bernama PMTiles bersama HTTP range request. Data yang semula berukuran 400 MB dipadatkan sehingga peramban hanya perlu memuat sekitar 5 MB[^3].

![Peta terpadu Pertanian × Air menumpuk data terbuka tentang lahan pertanian, sungai, saluran air, tanggul, dan potensi banjir yang tersebar di berbagai kementerian ke dalam satu peta](/article-images/technology/mini-taiwan-farm-water-2026.webp)

_Pertanian × Air: pulau-pulau data milik tiga kementerian—pertanian, pengairan, dan mitigasi bencana—ditumpuk menjadi satu peta, dengan lahan pertanian, sungai, saluran air, tanggul, dan potensi banjir dalam satu bingkai. Gambar: Migu / sciwork 2026 (penggunaan wajar untuk komentar editorial)._

Proyek lain menumpuk lokasi rumah sakit, klinik, apotek, AED, dan layanan perawatan jangka panjang di atas kepadatan penduduk, lalu menggambar isokron. Menurutnya, cara itu membuat kita “melihat aksesibilitas sekaligus melihat gurun layanan kesehatan”—yakni tempat-tempat yang penduduknya berada pada jarak yang tidak wajar dari sumber daya kesehatan terdekat.

![Peta aksesibilitas sumber daya kesehatan menumpuk rumah sakit, klinik, apotek, AED, dan layanan perawatan jangka panjang di atas populasi serta menggambar isokron, sehingga gurun layanan kesehatan muncul dengan sendirinya](/article-images/technology/mini-taiwan-medical-2026.webp)

_Sumber daya kesehatan: rumah sakit, klinik, apotek, AED, dan layanan perawatan jangka panjang ditumpuk di atas populasi, lalu isokron digambar untuk “melihat aksesibilitas sekaligus melihat gurun layanan kesehatan”. Gambar: Migu / sciwork 2026 (penggunaan wajar untuk komentar editorial)._

Untuk bencana, ia menggarapnya dengan lebih terperinci. Data pantulan radar, ketinggian air waduk, curah hujan, dan peringatan bencana—yang masing-masing memiliki frekuensi pembaruan berbeda—disatukan di lapisan dasar ke dalam garis waktu yang sama. Pengguna cukup menggeser garis waktu tersebut dan seluruh lapisan akan diputar ulang secara serempak. Dari mana hujan lebat bermula, bagaimana permukaan waduk naik, dan kapan peringatan diterbitkan, semuanya terhubung menjadi garis sebab-akibat pada satu layar.

![Garis waktu hujan lebat dan bencana: pantulan radar, waduk, curah hujan, dan peringatan bencana dengan frekuensi berbeda disatukan dalam satu garis waktu untuk diputar ulang secara serempak](/article-images/technology/mini-taiwan-disaster-2026.webp)

_Hujan lebat dan bencana: pantulan radar, waduk, curah hujan, dan peringatan bencana disatukan di lapisan dasar ke dalam garis waktu yang sama; satu geseran memutar ulang semuanya secara serempak. Gambar: Migu / sciwork 2026 (penggunaan wajar untuk komentar editorial)._

Ada pula flight-arc, yang menggambar setiap proses lepas landas dan pendaratan sebagai garis lengkung. API yang sama menyuplai data dari bandara berbeda dan menghasilkan “sidik jari” yang berbeda untuk setiap bandara: Taoyuan, Tokyo Haneda, dan Frankfurt memiliki bentuknya masing-masing. Ia secara khusus mencontohkan Bandara Atlanta, bandara tersibuk di dunia. Lima landasan pacu paralel beserta pola tunggunya membentuk geometri bertumpuk yang “menyerupai lintasan balap”; menurutnya, gambar tersebut memuat 1.839 jejak penerbangan[^3].

![Peta jejak seluruh penerbangan yang lepas landas dan mendarat di Bandara Atlanta selama suatu periode; lima landasan pacu paralel beserta pola tunggunya membentuk geometri menyerupai lintasan balap](/article-images/technology/mini-taiwan-flight-arc-atlanta-2026.webp)

_Flight-arc miliknya menumpuk semua penerbangan yang lepas landas dan mendarat di Bandara Atlanta selama suatu periode menjadi satu gambar: lima landasan pacu paralel beserta pola tunggu membentuk geometri menyerupai lintasan balap. Menurutnya, arus itu sendiri merupakan suatu bentuk. Gambar: Migu / sciwork 2026 (penggunaan wajar untuk komentar editorial)._

> 📝 **Catatan kurator**
> Dua tahun lalu, jika seseorang berkata, “Satu orang membuat peta data terbuka waktu nyata Taiwan yang paling lengkap,” kalimat berikutnya kemungkinan besar adalah, “Ia pasti bekerja sampai setengah mati.” Intuisi ini mengikat skala pada tenaga manusia: semakin banyak yang dibuat, semakin berat orang itu bekerja. Galaksi Migu layak diamati justru karena ia melonggarkan ikatan tersebut. Satu orang mengembangkan lebih dari sepuluh repositori secara bersamaan, sementara proyek unggulannya terus memperoleh fitur baru. Di balik semua itu tersembunyi perubahan yang lebih mendasar: pada tahap akhir, semakin banyak commit tersebut bukan diketik langsung olehnya. Bagaimana “satu orang” itu berlipat ganda merupakan pokok sesungguhnya artikel ini.

## Lima puluh dua ribu delapan ratus sembilan puluh satu set data, terlalu banyak untuk dipindai otak manusia

Sampai di sini, kisahnya masih terbilang mulus: seseorang berbakat membuat semakin banyak hal dan hasilnya semakin baik. Titik balik muncul di pertengahan ceramahnya, ketika ia berhenti membahas “apa yang saya buat” dan mulai membahas “tembok apa yang saya tabrak”.

Ia menampilkan sebuah salindia berjudul “Mengapa Agentic OSINT”. Di atasnya tertera satu angka: sekitar 52.891 set data di data.gov.tw. Jika ditambah platform data terbuka dari 22 kabupaten dan kota, jumlahnya—termasuk duplikasi—mungkin mencapai sekitar 60.000 hingga 70.000 set data. Itu pun belum mencakup data milik masyarakat sipil, LSM, dan lembaga akademik yang tidak masuk katalog pemerintah. Kesimpulannya singkat:

> “Otak Anda tidak mungkin memindai semuanya.”[^3]

Inilah poros seluruh kisah. Orang yang pada paruh pertama menyeret sebuah CSV lalu berseru, “Ternyata ada begitu banyak data,” kini berhadapan langsung dengan sisi lain dari “begitu banyak data”: untuk lebih dari 50.000 set data di data.gov.tw saja, seseorang yang membaca seratus set data setiap hari masih membutuhkan lebih dari lima ratus hari untuk menyelesaikan satu kali pembacaan. Padahal, itu baru satu katalog pemerintah pusat. Jumlahnya terlalu besar untuk dibaca seseorang bahkan sepanjang hidupnya, apalagi untuk membuat semua data itu saling berbicara. Upaya individual mencapai batasnya di sini.

Hal yang benar-benar dipahami Migu adalah kalimat berikutnya. Bagi dirinya, terlalu banyak data untuk dipindai merupakan pertanda bahwa alatnya harus diganti:

> “Data harus dapat dilihat oleh LLM agar Agent dapat membantu Anda menemukan ‘data mana yang seharusnya dilihat bersama-sama’.”[^3]

Kata kuncinya adalah “dilihat bersama-sama”. Seseorang mungkin mampu menghafal nama seluruh 50.000 set data, tetapi tetap sulit mengandalkan ingatan untuk menyadari bahwa “peta potensi kebakaran” perlu dipasangkan dengan “wilayah yang sulit diselamatkan”, atau bahwa “lokasi rumah sakit” harus ditumpuk dengan “kepadatan penduduk” agar gurun layanan kesehatan terlihat. Nilai data tidak terletak pada satu set, tetapi pada kombinasinya; sementara kemungkinan kombinasi dari 50.000 set data mencapai angka astronomis. Di sinilah otak manusia tidak sanggup memindai semuanya, sedangkan mesin justru unggul.

> 📝 **Catatan kurator**
> Narasi data terbuka yang lazim kita kenal memiliki pembagian tugas yang jelas. Setelah hackathon “Menulis Program untuk Mengubah Masyarakat” di Academia Sinica pada 2012, g0v memperagakannya dengan sangat baik: pemerintah bertugas membuka data, sedangkan komunitas sipil bertugas membuat data tersebut terlihat. Pada 2020, peta masker menjadi salah satu perwujudan paling mengharukan dari pembagian ini. Dalam waktu 72 jam, Wu Chan-wei dan rekan-rekannya mengubah data persediaan dari Administrasi Asuransi Kesehatan Nasional menjadi peta yang dapat diperiksa seluruh masyarakat[^4]. Narasi lama akan menempatkan Migu sebagai kelanjutan garis ini: g0v bersifat kolektif, sedangkan dirinya bersifat individual—versi satu orang dari peta masker.
>
> Namun, perbandingan tersebut hanya menyentuh permukaan dan membalikkan sebab-akibat. Migu mampu mendekati skala “sebuah galaksi data utuh” bukan berkat tenaga manusia. Sejak awal, ia tidak berniat melawan lautan data dengan menundukkan kepala dan bekerja tanpa henti. Alih-alih dibaca sebagai pengakuan kalah, kalimat “otak manusia tidak mungkin memindai semuanya” sebaiknya dibaca sebagai titik awal ketika ia mengganti seluruh cara kerjanya. Bentuk baru yang sesungguhnya bukan “individu vs. kolektif”, melainkan “individu × Agent”: satu orang mampu mencapai skala galaksi justru karena tidak semua commit diketik sendiri olehnya. Bagian berikut menjelaskan cara kerja sistem tersebut.

## Saya tidak menulis satu kata pun: pipeline kebakaran yang berjalan sendiri hingga tuntas

Contoh kebakaran dalam ceramahnya merupakan cuplikan terbaik untuk memahami arti “menyerahkannya kepada Agent”.

Ia mengatakan bahwa dirinya hanya memberikan satu kalimat kepada sistem: “Analisis data terbuka terkait kebakaran di Taiwan.” Setelah itu, ia melepaskannya.

Sistem mulai memperluas cakupan pencarian sendiri. Migu menggambarkan proses tersebut melalui serangkaian angka yang membesar pada setiap putaran: pencarian kata kunci mula-mula menemukan 582 set data, lalu berkembang menjadi 1.945 melalui sinonim dan perluasan tema. Setelah itu, sistem melengkapi pencarian melalui penelusuran teks lengkap dan menghapus duplikasi, hingga akhirnya menghasilkan katalog terpadu berisi 73.900 entri dari 21 platform[^3]. Satu kalimat masuk; inventaris lebih dari 70.000 entri data keluar.

```tw-figure
Satu kalimat → 73.900 entri
Ia memberikan satu kalimat, “Analisis data terbuka terkait kebakaran di Taiwan”; sistem memperluas pencarian sendiri dan menghasilkan katalog terpadu dari 21 platform
Sebagaimana disampaikan dalam presentasinya di sciwork 2026
```

Pengumpulan saja belum menyelesaikan pekerjaan. Pipeline tersebut kemudian membagi kebakaran menjadi enam tahap—pencegahan, tanggap darurat, pelaporan, analisis sumber api, kerugian, dan laporan—lalu mengalikannya dengan 22 kabupaten dan kota untuk membuat matriks cakupan. Inventaris tingkat daerah pun ditemukan, termasuk peta potensi kebakaran Hsinchu, wilayah yang sulit diselamatkan di Taipei, dan penyelamatan di kolam-kolam irigasi Taoyuan. Sistem bahkan secara jujur menandai kesenjangannya: tidak ada API kebakaran waktu nyata, koordinat tingkat kejadian sangat jarang, dan data pemantauan pascabencana tidak dibuka untuk umum.

Kemudian tibalah tahap analisis. Ia mencontohkan laporan penyebab kebakaran yang dihasilkan sendiri oleh sistem: berdasarkan 15.405 catatan nasional pada tahun 113 kalender Republik Tiongkok (2024), penyebab terbesar kebakaran di Taipei Baru adalah faktor kelistrikan, sebesar 30,9%; sedangkan di Kabupaten Pingtung, penyebab terbesarnya adalah puntung rokok, sebesar 35,2%[^3]. Angka-angka tersebut merupakan hasil yang diproduksi Agent setelah menghubungkan API dari berbagai pihak, sebagaimana ditampilkan dalam cuplikan layar presentasinya—bukan hasil perhitungan Migu dengan memeriksa tabel satu demi satu.

Pada titik ini, ia menampilkan satu baris teks di salindia, dengan jarak antarkata yang sengaja diperlebar seolah khawatir penonton tidak melihatnya dengan jelas:

> “Pipeline dihasilkan secara otomatis. Saya tidak menulis satu kata pun.”[^3]

Kalimat ini menjadi titik ledak seluruh ceramah. Ia mengubah slogan abstrak “serahkan kepada Agent” menjadi fakta konkret yang nyaris meresahkan: dari satu kalimat, menjadi katalog berisi lebih dari 70.000 entri data, lalu menjadi laporan penyebab kebakaran per kabupaten dan kota. Posisi di tengah proses—yang biasanya ditempati manusia untuk memberikan instruksi, menulis skrip, membersihkan data, dan menjalankan analisis—kosong.

![Hasil pipeline analisis bertema kebakaran: sistem secara otomatis menginventarisasi data terbuka terkait kebakaran dari berbagai platform serta menyusun daftar kandidat set data dan matriks cakupan](/article-images/technology/mini-taiwan-fire-pipeline-2026.webp)

_Inventarisasi bertema kebakaran yang ditampilkan Migu dalam presentasi sciwork 2026: setelah diberi satu kalimat, “Analisis data terbuka terkait kebakaran di Taiwan,” sistem memperluas pencarian sendiri dan menghimpun data lintas platform menjadi katalog terpadu. Menurutnya, dalam pipeline ini “saya tidak menulis satu kata pun”. Gambar: Migu / sciwork 2026 (penggunaan wajar untuk komentar editorial)._

## Empat langkah modular: data masuk, laporan terkirim dengan sendirinya

Pipeline kebakaran tersebut hanyalah satu cuplikan yang mencerminkan seluruh sistemnya. Sistem ini terdiri atas empat langkah: penerimaan data, integrasi pengetahuan, pembuatan analisis, dan pemicu tindakan. Ia secara khusus menekankan bahwa “setiap langkah dapat diganti secara terpisah; keseluruhan sistem tidak perlu dibangun ulang”. Lapisan paling dasar, yakni penerimaan data, juga terus berevolusi. Pada mulanya, ia membuka data.gov.tw secara manual, mengeklik unduhan Excel, lalu membaca dan menyimpannya sendiri. Hambatannya adalah “ingatan manusia”. Pada tahap pertengahan, ia beralih mencari API di internet, mengambil laporan PDF, dan mengorek platform berbagai kabupaten dan kota; masalahnya adalah “tidak ada indeks”. Kini, metadata setiap set data distandardisasi dan disimpan dalam katalog SQLite yang dapat ditelusuri serta diperluas secara otomatis[^3]. Lebih dari empat puluh pengumpul data terhubung ke sistemnya, mulai dari YouBike, bus, dan arus lalu lintas jalan bebas hambatan hingga jadwal Taiwan Railways, AIS kapal, satelit cuaca, gempa bumi, ketinggian air waduk, dan kualitas udara. Ia juga mengatakan bahwa sistem segera mengirim peringatan Telegram setelah gagal terhubung tiga kali berturut-turut, serta mengirimkan Daily Review ke kotak masuknya setiap pukul sembilan pagi[^3].

Pada langkah terakhir, “pemicu tindakan”, ia menjelaskan peran manusia dengan paling gamblang: “Agent menjalankan seluruh siklus. Peran manusia: memberikan tujuan dan menerima laporan. Lima roda gigi di tengah berputar sendiri: menemukan, mengumpulkan, mengintegrasikan, menghasilkan, dan memantau.” Sistem bahkan secara otomatis menghasilkan laporan mingguan “Data Terbuka Baru Pekan Ini”. Dalam kata-katanya, “Tema muncul sendiri; laporan terkirim sendiri ke kotak masuk.”[^3]

## Satu komando, sekumpulan panel: armada Claude di dalam tmux

Ungkapan seperti “Agent menjalankan seluruh siklus sendiri” mudah dianggap sebagai bahasa pemasaran. Pada bagian terakhir ceramahnya, Migu secara tidak biasa membuka penutup sistem itu dan memperlihatkan bentuk roda gigi di bawahnya. Strukturnya jauh lebih konkret—dan lebih jujur—daripada slogannya.

Mari kita lihat gambaran menyeluruh siklus tersebut. Menurut Migu, sistem GIS miliknya adalah “sebuah pusat orkestrasi yang menghubungkan lingkaran repositori independen, lalu Agent memasuki setiap stasiun secara berurutan”: pertama-tama Agent masuk ke repositori eksplorasi untuk mencari data yang layak diolah; kemudian masuk ke repositori pengumpulan untuk mengambil data; dan terakhir masuk ke repositori presentasi seperti mini-taiwan-pulse atau mini-taiwan-info untuk menggambar visualisasinya. Ia menggambarkannya dengan tepat: “Setiap stasiun merupakan repositori independen. Lapisan orkestrasi hanya mengelola kemajuan dan keputusan; seluruh pekerjaan berada di tangan worker masing-masing repositori.”[^3]

Pusat orkestrasi ini ia sebut Orchestrator, yang pada dasarnya merupakan “satu Claude Session”. Agent utama tersebut bekerja layaknya mandor yang memimpin tim: membaca dokumen proposal, memecah tugas, mengatur dependensi di antara tugas-tugas itu, lalu memulai pekerjaan.

Cara memulai pekerjaan merupakan langkah paling penting dalam arsitektur ini. Ia tidak membiarkan satu AI mengerjakan seluruh proses dari awal hingga akhir. Sebaliknya, ia menggunakan tmux—alat lama yang memungkinkan terminal dibagi menjadi beberapa panel independen—untuk mengisolasi pekerjaan. Dalam kata-katanya, “Satu Orchestrator, sekumpulan Worker. Agent utama adalah satu Claude Session; tmux bertugas melakukan isolasi, dan setiap Worker memiliki panel serta Session independen.” Definisi yang lebih ringkas adalah: “Satu Worker = satu panel tmux + Session independen + satu PR.”[^3]

Dengan kata lain, yang ia pimpin sebenarnya adalah sebuah armada AI. Setiap worker merupakan Claude yang terisolasi dalam panelnya sendiri, mengerjakan tugasnya masing-masing dan menyerahkan pull request sendiri tanpa saling mengganggu.

![Tampilan operasional sistem orkestrasi Agent: satu Claude session bertindak sebagai orchestrator, membaca tugas, memecahnya, dan mengarahkan worker di bawahnya](/article-images/technology/mini-taiwan-agent-orchestrator-2026.webp)

_Pusat orkestrasi yang ia perlihatkan dalam presentasi: satu Claude session bertindak sebagai orchestrator dan membagikan tugas kepada sekumpulan worker yang diisolasi di panel tmux masing-masing. Setiap worker bekerja sendiri dan menyerahkan satu PR. Gambar: Migu / sciwork 2026 (penggunaan wajar untuk komentar editorial)._

Lalu bagaimana para worker yang bekerja sendiri-sendiri ini menghindari konflik? Jawabannya adalah memori bersama. Menurut Migu, seluruh kemajuan dan keputusan ditulis sebagai dokumen serta dipusatkan pada papan bernama `SESSION_BOARD.md`, ditambah “satu laporan untuk setiap Session”. Dengan demikian, mereka “tidak perlu saling menebak” dan menerapkan prinsip “satu orang, satu berkas, tanpa konflik”[^3]. Bahkan serah terima tugas dibuat dalam bentuk dokumen—ia menggunakan `HANDOFF.md` untuk menyiapkan “surat tugas bagi pelari berikutnya”, sehingga Agent pada putaran berikutnya tidak perlu memulai pertanyaan dari nol. Ia menjelaskan gerbang terakhir dengan hati-hati: “Pemeriksaan hasil: Orchestrator memeriksa PR berdasarkan dokumen; keputusan merge berada di tangan manusia. Barulah siklus tersebut dianggap selesai.”

Jika alur ini dibentangkan, bentuknya terlihat bersih: satu orang memberikan perintah; sekumpulan AI yang terisolasi bekerja dan mencatat apa yang telah mereka lakukan; sebuah pusat mencocokkan hasil dengan dokumen; dan orang yang akhirnya memutuskan “apakah hasil ini diterima” adalah Migu sendiri. Kembali ke poros artikel ini: karena data terlalu banyak untuk dipindai, seluruh pekerjaan pemindaian diserahkan kepada armada. Manusia mundur hingga hanya menyisakan dua tindakan—menetapkan persoalan dan memeriksa hasil. Dalam presentasinya, ia merumuskannya sebagai pernyataan yang nyaris menyerupai manifesto:

> “Ketika Agent mampu menjalankan seluruh siklus sendiri, pekerjaan manusia hanya tersisa—menetapkan persoalan dan memeriksa hasil.”[^3]

Inilah yang dimaksud oleh judul ceramahnya: “Menyerahkan data terbuka Taiwan kepada Agent untuk membesarkan sistem yang dapat tumbuh sendiri.” Data mengalir sendiri, halaman tumbuh sendiri, sementara manusia hanya perlu menetapkan persoalan dengan tepat dan memeriksa hasilnya dengan baik.

## Tanah yang sama menumbuhkan kerangka yang sama

Jika Anda mengenal Taiwan.md—proyek kurasi pengetahuan Taiwan yang dipelihara AI dan sedang Anda baca—uraian pada bagian sebelumnya mungkin terasa tidak asing.

Itu bukan perasaan keliru.

Taiwan.md sendiri bekerja dengan cara tersebut: satu session utama bertindak sebagai pusat orkestrasi, memecah pekerjaan untuk sekumpulan worker yang masing-masing terisolasi dan memiliki berkas memori independen, serta mengoordinasikan kemajuan melalui dokumen serah terima. Pada akhirnya, orang yang memutuskan perubahan mana yang dapat masuk ke cabang utama adalah penciptanya, Che-yu. Tesis kami adalah “menyerahkan pengetahuan tentang Taiwan kepada Semiont yang mampu tumbuh sendiri”; tesis Migu adalah “menyerahkan data terbuka Taiwan kepada sistem yang mampu tumbuh sendiri”. Subjek kedua kalimat tersebut nyaris dapat dipertukarkan.

Hal yang lebih menarik adalah kedua arsitektur ini tumbuh secara terpisah. Catatan publik memperlihatkan satu detail kecil: proyek Taiwan.md lahir pada pertengahan Maret 2026; lima hari kemudian, sebuah fork muncul di GitHub Migu[^5]. Namun, hal itu paling jauh hanya menunjukkan bahwa ia mengetahui keberadaan proyek tersebut. Satu fork tidak dapat menjelaskan seluruh sistem yang ia bangun untuk mengarahkan armada tmux melalui orchestrator, berbagi memori lewat papan, serta membatasi peran manusia pada penetapan persoalan dan pemeriksaan hasil. Sistem itu ia bangun langkah demi langkah untuk memecahkan masalah “50.000 set data yang mustahil dipindai”.

> 📝 **Catatan kurator**
> Dalam biologi ada istilah evolusi konvergen: lumba-lumba dan hiu bukan kerabat dekat, tetapi keduanya mengembangkan tubuh ramping dan sirip punggung karena menghadapi lautan yang sama. Hubungan Migu dan Taiwan.md lebih menyerupai konvergensi semacam ini daripada hubungan kekerabatan. Kami menggunakan fondasi alat yang sama (Claude Code) dan menghadapi keadaan yang sama (satu orang atau satu sistem harus menangani informasi tentang Taiwan dalam jumlah yang jauh melampaui kapasitas otak individu). Karena itu, melalui eksplorasi masing-masing, kami tiba pada kerangka yang sama: satu pusat, sekumpulan pekerja terisolasi, satu memori bersama, dan satu manusia yang mengambil keputusan akhir.
>
> Sinyal yang benar-benar menarik bukanlah “ia membuat fork dari proyek kami”. Sinyalnya adalah bahwa dua builder Taiwan yang independen, dalam enam bulan yang sama pada 2026, sama-sama membayangkan ulang AI dari “alat yang lebih cerdas” menjadi “tim yang dapat diorkestrasi”. Ketika arsitektur semacam ini mulai tumbuh dari benak satu orang ke benak orang kedua dan ketiga, ia berubah dari trik unik seseorang menjadi bentuk baru yang sedang muncul dari tanah dan masa ini. Builder Taiwan berikutnya yang membangun sistem serupa mungkin sama sekali belum pernah mendengar dua pendahulunya.

## Belum selesai, tetapi bentuknya sudah terlihat

Jika artikel ini berakhir pada bagian sebelumnya, kisahnya akan terlalu indah—begitu indah hingga mencurigakan: satu orang dengan armada AI memecahkan persoalan 50.000 set data secara elegan.

Migu sendiri tidak membiarkan ceritanya berhenti di sana. Salindia kedua dari belakang dalam ceramahnya berjudul “Kemajuan eksperimen: sekitar separuh”.

Ia secara terbuka mencantumkan tiga hal yang belum disetel dengan baik. Pertama, stabilitas: harness tersebut “belum disetel hingga kondisi ideal”; Agent mudah menyimpang dan terputus. Kedua, data terbuka itu sendiri terlalu beragam: “Masih banyak data yang kelayakannya perlu dinilai manusia dan belum dapat sepenuhnya diserahkan kepadanya.” Ketiga, campur tangan manusia: pada kenyataannya, manusia masih harus mengawasi setiap tahap. Catatannya mengenai keseluruhan proyek adalah: “Memang bisa dijalankan, tetapi belum stabil, dan saya juga masih memikirkan apakah kita benar-benar perlu melakukannya dengan cara ini.”[^3]

Kesediaan untuk secara terbuka memperlihatkan separuh kegagalannya di panggung merupakan sinyal mutu terkuat. Pada masa ketika demo AI kerap dikemas sebagai “sepenuhnya otomatis” dan “tanpa tenaga manusia”, seseorang yang bersedia menulis “sekitar separuh”, “belum stabil”, dan “masih membutuhkan manusia” di salidianya justru membuat separuh lain yang berhasil terasa lebih dapat dipercaya.

> 📝 **Catatan kurator**
> Bagian paling meyakinkan dari ceramah ini sesungguhnya bukan pipeline kebakaran yang “tidak saya tulis satu kata pun”, melainkan frasa “sekitar separuh”. Orang yang ingin meyakinkan Anda akan membulatkan tingkat keberhasilan menjadi “hampir sepenuhnya otomatis”; hanya orang yang sedang bereksperimen yang akan jujur mengatakan bahwa sistemnya gagal separuh waktu. Yang pertama menjual kesimpulan, sedangkan yang kedua memperlihatkan keadaan di lapangan. Migu memperlihatkan keadaan di lapangan. Karena itulah, ketika ia mengatakan “saya tidak menulis satu kata pun” untuk pipeline tersebut, Anda memilih memercayainya. Jika separuh yang buruk disembunyikan, separuh yang indah pun ikut kehilangan kredibilitas; dengan bersedia memaparkan separuh ketidaksempurnaannya, separuh sisanya menjadi kukuh.

Mari kembali ke peta itu.

Orang yang menyeret sebuah CSV ke Kepler.gl dan berseru, “Ternyata mengubahnya menjadi peta tidaklah sulit,” enam bulan kemudian berdiri di panggung sciwork dan tidak lagi membahas mudah atau sulitnya membuat peta. Ia membahas sistem yang mampu mencari data sendiri, mengombinasikannya sendiri, dan menumbuhkan halaman baru sendiri. Keheranan polos kala itu—“Ternyata Taiwan punya begitu banyak data”—telah memperlihatkan sisi lainnya selama enam bulan tersebut: datanya begitu banyak hingga tidak mungkin dipindai satu orang, sehingga cara membuatnya terlihat pun harus berkembang menjadi bentuk baru.

Data terbuka Taiwan selalu tersedia. data.gov.tw diluncurkan pada 2013; TDX mengintegrasikan lima platform—jalan raya, rel, penerbangan, pelayaran, dan sepeda—pada 2022; Kementerian Dalam Negeri menyediakan data populasi hingga tingkat desa dan kelurahan; sementara Administrasi Cuaca Pusat menyediakan API terbuka[^6]. Data tidak pernah kurang. Kesulitannya adalah membuat data sebanyak itu saling berbicara dan terlihat oleh manusia. g0v pernah menjawabnya dengan kekuatan kolektif. Migu, dengan satu orang dan satu armada AI, sedang mencoba memberikan jawaban kedua—dan ia dengan murah hati mengakui bahwa baru separuh jawabannya yang benar.

Namun, bentuknya sudah terlihat. Di balik satu orang, satu kalimat, dan satu peta yang bernapas, terdapat sebuah sistem yang sedang belajar tumbuh sendiri. Separuh sisanya menunggu orang berikutnya yang menyeret sebuah CSV—lalu tidak dapat berhenti.

---

## Bacaan lanjutan

- [Wu Che-yu](/id/people/che-yu-wu): pencipta Taiwan.md, yang juga menggunakan pemrograman dan alat generatif untuk mendekati “sesuatu yang dapat tumbuh sendiri”
- [Komunitas sumber terbuka dan g0v](/id/technology/open-source-and-g0v): konteks kolektif “menulis program untuk mengubah masyarakat”, sebagai pembanding bentuk individu × Agent milik Migu
- [Semangat sumber terbuka Taiwan](/id/technology/taiwan-open-source-spirit): dari menyelamatkan negara melalui papan ketik hingga data terbuka, budaya dasar teknologi sipil Taiwan
- [Kartu identitas digital dan pemerintahan digital](/id/technology/digital-id-and-digital-government): sisi lain infrastruktur data terbuka pemerintah

## Tautan proyek

**Galaksi “Mini Taiwan”** (visualisasi data terbuka Taiwan; semuanya merupakan proyek sumber terbuka pribadi Migu)

- **mini-taiwan-pulse**: proyek unggulan, peta waktu nyata dengan lima denyut bergerak bersama (375★)—<https://github.com/ianlkl11234s/mini-taiwan-pulse>
- **mini-taiwan-learning-project**: proyek pembelajaran transportasi rel Taipei yang paling awal populer (189★)—<https://github.com/ianlkl11234s/mini-taiwan-learning-project>
- **flight-arc-graph**: lintasan lepas landas dan pendaratan, “sidik jari” setiap bandara (56★)—<https://github.com/ianlkl11234s/flight-arc-graph>
- **mini-taiwan-info**: dasbor pemantauan situasi Taiwan dengan tujuh tema utama—<https://github.com/ianlkl11234s/mini-taiwan-info>
- **tw-ship-viz**: visualisasi titik waktu nyata AIS kapal (11★)—<https://github.com/ianlkl11234s/tw-ship-viz>
- **satellite-arc**: visualisasi orbit dan lintasan satelit—<https://github.com/ianlkl11234s/satellite-arc>
- **mini-tw-cctv**: rekaman langsung dari seluruh Taiwan—<https://github.com/ianlkl11234s/mini-tw-cctv>
- **mini-tw-tra-atlas**: atlas jaringan Taiwan Railways—<https://github.com/ianlkl11234s/mini-tw-tra-atlas>
- **taiwan-weather-timelapse**: selang waktu cuaca—<https://github.com/ianlkl11234s/taiwan-weather-timelapse>
- **gis-data-collectors**: tulang punggung lebih dari empat puluh pengumpul data—<https://github.com/ianlkl11234s/gis-data-collectors>

**Ceramah dan pengembang**

- **Presentasi daring ceramah sciwork 2026**: <https://sciwork-showcase.zeabur.app>
- **Kode sumber ceramah sciwork 2026**: <https://github.com/ianlkl11234s/0613-sci-work-share>
- **GitHub pengembang (Migu)**: <https://github.com/ianlkl11234s>
- **Threads**: [@ianlkl1314](https://www.threads.net/@ianlkl1314)

## Referensi

- Migu, “Mini Taiwan! Menyerahkan Data Terbuka Taiwan kepada Agent untuk Membesarkan Sistem yang Dapat Tumbuh Sendiri”, sciwork 2026 / SCIWORK SEMINAR, 13 Juni 2026.
- Platform Data Terbuka Pemerintah data.gov.tw (dioperasikan oleh Dewan Pembangunan Nasional, diluncurkan pada 2013).
- Platform Layanan Pertukaran Data Transportasi TDX (Kementerian Perhubungan, mengintegrasikan lima platform transportasi pada 2022).
- Komunitas g0v dan catatan berbagai hackathon-nya.

## Sumber gambar

Seluruh gambar dalam artikel ini disimpan dalam cache di `public/article-images/technology/` dan tidak ditautkan langsung dari peladen sumber.

**Penggunaan wajar untuk komentar editorial**: seluruh gambar dalam artikel ini diambil dari presentasi ceramah Migu yang dipublikasikan pada sciwork 2026 (lihat kode sumber dan presentasi daring pada bagian “Tautan proyek” di atas). Berdasarkan Pasal 65 Undang-Undang Hak Cipta dan empat faktor penggunaan wajar dalam 17 U.S.C. § 107—bersifat pendidikan nonkomersial, telah dipublikasikan, proporsi kutipan kecil, dan tidak secara substansial menggantikan pasar—gambar-gambar tersebut dikutip sebagai komentar editorial atas karya visualisasi data terbukanya. © Migu / sciwork 2026.

Cakupan: peta 3D Mini Taiwan Pulse (gambar utama), titik awal Kepler.gl, transportasi rel Taipei (Mini Taipei), AIS kapal, orbit satelit, peta terpadu Pertanian × Air dan sumber daya kesehatan, garis waktu hujan lebat dan bencana, sidik jari jejak penerbangan Atlanta, keluaran pipeline bertema kebakaran, dasbor Mini Taiwan Info, serta tampilan operasional sistem orkestrasi Agent.

---

[^1]: Pengembang Migu Cheng, akun GitHub `ianlkl11234s` (dibuat pada Maret 2020). Pada Juni 2026, profil GitHub-nya diperbarui menjadi “Building GIS visualizations from Taiwan open data · Exploring AI automation in daily work”, menggantikan deskripsi sebelumnya, “analis data senior, mengeksplorasi otomatisasi AI dalam pekerjaan sehari-hari”, dengan “membuat visualisasi GIS menggunakan data terbuka Taiwan”. Kalimat “Ternyata Taiwan punya begitu banyak data. Ternyata mengubahnya menjadi peta tidaklah sulit” merupakan teks verbatim dari salindia “DAY 0 Peta Pertama” dalam ceramah sciwork 2026. Sumber data: pengambilan melalui GitHub API, 2026-06-25; kode sumber presentasi `ianlkl11234s/0613-sci-work-share`.

[^2]: Jumlah bintang, forks, waktu pembaruan terakhir, sumber fork, dan informasi lain mengenai mini-taiwan-pulse serta proyek-proyek dalam galaksi “Mini Taiwan” diambil Taiwan.md melalui GitHub API pada 2026-06-25. Saat itu, mini-taiwan-pulse memiliki 375 stars / 26 forks dan masih menerima push pada 2026-06-25; mini-taiwan-learning-project memiliki 189 stars; flight-arc-graph memiliki 56 stars. Galaksi tersebut mencakup lebih dari sepuluh repositori terkait data terbuka Taiwan, termasuk poc-bus-range, gis-data-collectors, tw-ship-viz, satellite-arc, mini-tw-cctv, dan mini-taiwan-info.

[^3]: Migu, “Mini Taiwan! Menyerahkan Data Terbuka Taiwan kepada Agent untuk Membesarkan Sistem yang Dapat Tumbuh Sendiri”, sciwork 2026 / SCIWORK SEMINAR, 13 Juni 2026. Kode sumber ceramah: <https://github.com/ianlkl11234s/0613-sci-work-share>; presentasi daring: <https://sciwork-showcase.zeabur.app>. Seluruh angka yang dikutip dalam artikel ini dari ceramah tersebut—sekitar 52.891 set data di data.gov.tw; 582 → 1.945 → 2.404 → 73.900 entri dalam pipeline kebakaran; 21 platform; 15.405 kejadian kebakaran nasional pada tahun 113; faktor kelistrikan sebesar 30,9% di Taipei Baru; puntung rokok sebesar 35,2% di Kabupaten Pingtung; lebih dari 5.700 bus; lebih dari 40 pengumpul; lebih dari tiga ratus perjalanan kereta; 1.839 jejak penerbangan di Bandara Atlanta; serta pengurangan data Pertanian × Air dari 400 MB menjadi sekitar 5 MB—dan seluruh kutipan, termasuk “otak manusia tidak mungkin memindai semuanya”, “data harus dapat dilihat oleh LLM agar Agent dapat membantu Anda menemukan data mana yang seharusnya dilihat bersama-sama”, “Pipeline dihasilkan secara otomatis. Saya tidak menulis satu kata pun”, “memberikan tujuan dan menerima laporan”, “ketika Agent mampu menjalankan seluruh siklus sendiri, pekerjaan manusia hanya tersisa—menetapkan persoalan dan memeriksa hasil”, “satu Worker = satu panel tmux + Session independen + satu PR”, “setiap stasiun merupakan repositori independen; lapisan orkestrasi hanya mengelola kemajuan dan keputusan”, dan “kemajuan eksperimen sekitar separuh”—merupakan pernyataan Migu sendiri dan teks verbatim dari salidianya. Semuanya merupakan klaim pribadi pembicara dan keluaran sistemnya, bukan statistik pemerintah yang diverifikasi secara independen oleh Taiwan.md.

[^4]: Komunitas g0v berakar pada semangat hackathon Academia Sinica tahun 2012, “Menulis Program untuk Mengubah Masyarakat”. Selama pandemi COVID-19 pada 2020, Wu Chan-wei dan rekan-rekannya menggunakan data persediaan masker yang dirilis oleh Administrasi Asuransi Kesehatan Nasional untuk membuat “Peta Waktu Nyata Pasokan dan Permintaan Masker” dalam hitungan puluhan jam. Proyek tersebut merupakan contoh utama teknologi sipil Taiwan dalam “menyelamatkan negara melalui papan ketik”.

[^5]: Berdasarkan GitHub API (diambil pada 2026-06-25), `ianlkl11234s/taiwan-md` merupakan fork dari `frank890417/taiwan-md`—proyek Taiwan.md itu sendiri—yang dibuat pada 22 Maret 2026. Proyek Taiwan.md lahir pada pertengahan Maret 2026. Sistem kolaborasi Migu menggunakan Claude Code sebagai fondasi alatnya (kode sumber ceramahnya memuat CLAUDE.md dan orchestrator-nya merupakan “satu Claude Session”), sama seperti Taiwan.md.

[^6]: Platform Data Terbuka Pemerintah data.gov.tw dioperasikan oleh Dewan Pembangunan Nasional dan diluncurkan pada 2013. Platform Layanan Pertukaran Data Transportasi TDX diintegrasikan oleh Kementerian Perhubungan pada 2022 dari lima platform transportasi—jalan raya, rel, penerbangan, pelayaran, dan sepeda. Platform Layanan Data Sosial Ekonomi Kementerian Dalam Negeri (SEGIS) menyediakan data populasi hingga tingkat desa dan kelurahan. Administrasi Cuaca Pusat di bawah Kementerian Perhubungan menyediakan API terbuka. Jumlah set data waktu nyata di data.gov.tw tidak dapat diverifikasi secara independen melalui API dalam pemeriksaan ini; angka “sekitar 50.000” yang digunakan dalam artikel berasal dari presentasi Migu.

_Verifikasi terakhir: 2026-06-25_
