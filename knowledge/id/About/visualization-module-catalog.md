---
title: 'Katalog Modul Visualisasi: Sembilan Belas Cara Melihat Data Taiwan'
description: 'Contoh hidup modul visualisasi artikel Taiwan.md — dengan data nyata perumahan, kependudukan, kesehatan, dan parlemen Taiwan, setiap modul visual tw-* dirender satu kali, lengkap dengan sintaksis dan prinsip desain dari graph.md.'
date: 2026-06-06
category: 'About'
tags:
  [
    'visualisasi data',
    'keadilan perumahan',
    'kebijakan perumahan',
    'data terbuka',
  ]
author: 'Taiwan.md'
readingTime: 11
featured: false
lastVerified: 2026-06-12
lastHumanReview: false
image: '/article-images/society/taipei-skyline-housing-2026.webp'
imageCredit: 'Heeheemalu'
imageLicense: 'CC BY-SA 4.0'
imageSource: 'https://commons.wikimedia.org/wiki/File:20260204_Taipei,_Taiwan_Skyline.jpg'
relatedDiary: ['2026-07-16-222859-viz-evolution']
translatedFrom: 'About/視覺化模組型錄.md'
sourceCommitSha: '756ab2957'
sourceContentHash: 'sha256:e634c73174fd4145'
sourceBodyHash: 'sha256:5fe923f8d157fe62'
translatedAt: '2026-10-24T01:19:36+08:00'
---

# Katalog Modul Visualisasi: Sembilan Belas Cara Melihat Data Taiwan

> **Ringkasan 30 detik:** Halaman ini adalah «contoh hidup» sistem visualisasi Taiwan.md — kesembilan belas modul visual dalam artikel dirender masing-masing satu kali, semuanya memakai data Taiwan yang nyata (rasio harga rumah terhadap pendapatan, perumahan nasional, penuaan penduduk, referendum, rasio perawat-pasien, kursi legislatif). Halaman ini adalah pasangan panduan editorial [graph.md](https://github.com/frank890417/taiwan-md/blob/main/docs/editorial/graph.md): **graph.md menjelaskan «kapan memakai yang mana, bagaimana membuatnya dengan baik, dan bagaimana sintaksnya», sedangkan halaman ini membiarkan Anda langsung melihat «seperti apa tampilannya».** Setiap modul dirender murni dengan HTML/SVG, sehingga manusia, pembaca layar, Google, dan perayap AI membaca satu data yang sama — inilah alasan kami memilih visualisasi statis, bukan grafik interaktif.

Saat menulis artikel tentang angka, yang paling ditakuti adalah data berubah menjadi tumpukan angka dari paragraf ke paragraf, hingga pembaca melamun di persentase ketiga. Tugas visualisasi adalah membalik «prosa angka yang padat» menjadi «struktur yang terbaca sekilas».

Namun visualisasi Taiwan.md punya satu disiplin yang tidak dimiliki yang lain: **kami hanya membuat visualisasi yang «bisa dibaca LLM juga»**. Grafik interaktif dari D3 atau Canvas memang memukau, tetapi perayap AI seperti GPTBot, PerplexityBot, dan ClaudeBot tidak menjalankan JavaScript; bagi mereka grafik itu hanya ruang kosong. Sebaliknya, grafik kami yang dibuat dengan semantic HTML dan inline SVG menyimpan datanya di kode sumber, sehingga AI di enam bahasa dapat membaca dan mengutip data Taiwan dari sudut pandang orang pertama. **Visualisasi yang bisa dibaca LLM adalah visualisasi kedaulatan.**

Sembilan belas modul di bawah ini ditampilkan berurutan, dari yang paling sederhana, «satu angka besar», hingga «peta ubin kabupaten/kota» dan «busur kursi». Versi lengkap sintaksis dan prinsip desainnya ada di graph.md; di sini hanya satu kalimat tentang «ini apa dan kapan dipakai».

## Angka Besar tw-figure

Jenis yang paling sederhana sekaligus paling kuat: menaruh satu angka dramatis sebesar-besarnya, lalu perbandingan sebelum dan sesudahnya menceritakan satu transformasi. Cocok sebagai «statistik palu godam» yang langsung ke pokok persoalan di pembuka.

```tw-figure
67 ribu → 870 ribu / ping
Harga jual Perumahan Nasional Chenggong di Taipei yang tak laku pada 1985, hingga harga rata-rata agen properti pada 2026 — alamat yang sama, sekitar 13 kali lipat
Platform agen properti harga transaksi riil (Perumahan Nasional Chenggong)
```

## Kelompok Angka tw-stat

Ketika satu paragraf memuat tiga-empat angka kunci yang berjajar, daripada ditulis sebagai satu kalimat panjang, lebih baik disusun menjadi satu baris kartu agar pembaca bisa memindai semuanya sekilas.

```tw-stat
174.891 rumah tangga | Perumahan nasional yang dibangun langsung oleh pemerintah | 1976–1999
390.000+ rumah tangga | Total perumahan nasional dalam arti luas | Hingga dicabut 2015
84,4% | Tingkat kepemilikan rumah seluruh Taiwan | 2024
Sumber: Siaran pers Dewan Eksekutif (Yuan Eksekutif) tentang pencabutan Undang-Undang Perumahan Nasional, Platform Informasi Properti Kementerian Dalam Negeri
```

Modul editorial yang memuat data (kelompok angka, kartu perbandingan, sumbu kebijakan) harus diberi label `Sumber:` seperti modul grafik. Audit seluruh situs pada Juli 2026 menemukan bahwa modul yang diawasi gerbang otomatis memiliki tingkat pencantuman sumber 100%, sedangkan yang tidak diawasi justru tiga modul berfrekuensi tinggi ini, dengan empat puluh persen contoh tanpa sumber sama sekali. Kini ketiganya juga masuk ke gerbang viz-health.

## Kartu Perbandingan tw-versus

Perbandingan poin demi poin antara dua sistem, dua posisi, atau dua keadaan sebelum dan sesudah. Warna hangat di kiri, warna dingin di kanan, dengan satu «vs» di tengah, sehingga perbedaannya dapat dibaca baris demi baris.

```tw-versus
Perumahan nasional Taiwan | Home Ownership Scheme Hong Kong
Subsidi pemerintah, dijual murah kepada penghuni | Subsidi pemerintah, dijual murah kepada penghuni
Setelah tinggal satu tahun boleh dijual kembali dengan harga pasar penuh | Penjualan kembali di pasar terbuka harus lebih dulu «membayar premi tanah»
Kenaikan nilai hampir seluruhnya menjadi milik pribadi | Kenaikan nilai dikembalikan ke kas publik sesuai proporsi diskon semula
Stok publik hilang sekaligus | Keuntungan publik bisa ditarik kembali
Sumber: Berita Resmi Yuan Legislatif, Otoritas Perumahan Hong Kong
```

## Batang Proporsi tw-bars

Untuk perbandingan nilai atau peringkat dari sedikit kategori, panjang batang horizontal otomatis diskalakan sesuai nilai, dengan nilai terbesar memenuhi lebar. Ingat menambahkan satu baris `Sumber:` di akhir modul data; baris itu otomatis menjadi keterangan sumber di bawahnya.

```tw-bars
Nasional 2014 | 8,41 kali
Nasional 2024 | 10,76 kali
Taipei 2024 | 16,60 kali | Puncak sejarah
Sumber: Platform Informasi Properti Kementerian Dalam Negeri, Pusat Penelitian Properti Universitas Chengchi
```

## Diagram Waffle tw-waffle

Komposisi proporsi bagian terhadap keseluruhan: seratus kotak mewakili seratus persen, lebih intuitif daripada diagram lingkaran — Anda benar-benar bisa menghitung kotaknya. Cocok untuk data «berapa persen tiap kategori» yang jumlahnya sekitar 100.

```tw-waffle
Komposisi hunian di Wina (2023)
Perumahan sosial milik kota | 21,9
Perumahan sosial dengan laba terbatas | 21,4
Rumah milik sendiri | 20,4
Sewa swasta | 36,3
Sumber: Statistik perumahan Pemerintah Kota Wina (Stadt Wien)
```

## Sumbu Kebijakan tw-timeline

Alur titik-titik kunci suatu sistem atau kebijakan, dirangkai dengan lini masa bernode. Perhatikan bahwa ini «alat bantu visual», dua hal yang berbeda dari aturan bahwa subjudul badan teks tidak boleh berbentuk kronologis («Tahun 1975…» sebagai judul).

```tw-timeline
1975 | Undang-Undang Perumahan Nasional berlaku | Pemerintah membangun lalu menjual, menetapkan lingkaran tertutup «syarat pembeli» agar subsidi tidak bocor
2002 | Tembok itu dirobohkan | Revisi undang-undang menghapus batasan syarat pembeli; perumahan nasional yang sudah dihuni setahun boleh dijual kepada siapa saja
2015 | Undang-Undang Perumahan Nasional dicabut | Alasan resmi: tingkat kepemilikan rumah sudah 85%, beralih ke perumahan sosial yang hanya disewakan, tidak dijual
2026 | Taoyuan memasang kembali gerbangnya | Hunian terjangkau: harga jual kembali tidak boleh melebihi harga beli semula
Sumber: Berita Resmi Yuan Legislatif, Siaran pers Yuan Eksekutif tentang pencabutan Undang-Undang Perumahan Nasional
```

## Kartu Kutipan tw-quote

Ketika satu kalimat saja mampu mewakili ketegangan inti seluruh artikel, perbesarlah menjadi kartu kutipan. Kutipan tidak perlu diberi tanda kutip sendiri, karena modul akan menambahkannya. Kutipan harus kata per kata dan dapat diverifikasi.

```tw-quote
Rumah seharga pasar 30 juta dolar Taiwan Baru, berubah menjadi rumah 60 hingga 70 juta dolar Taiwan Baru…… merampok si miskin untuk memperkaya si kaya, negara mengeluarkan uang untuk membantu orang kaya merenovasi rumah
Lin Chih-chun | Pengacara, mengkritik usulan «negara mengeluarkan uang untuk peremajaan Perumahan Nasional Chenggong» pada 2025
```

## Chip Sumber tw-source

Mengumpulkan sumber data sebuah analisis menjadi satu chip yang kalem, diletakkan di samping paragraf. Kredibilitas adalah bagian dari kurasi — media digital Taiwan sering lupa mencantumkan sumber, dan di sinilah kita bisa tampil berbeda.

```tw-source
Platform Informasi Properti Kementerian Dalam Negeri, Pendaftaran Harga Transaksi Riil, Pusat Penelitian Properti Universitas Chengchi, Berita Resmi Yuan Legislatif, Otoritas Perumahan Hong Kong
```

## Kotak Penjelasan tw-note

Separuh kredibilitas artikel data terletak pada «bagaimana Anda menghitungnya». Dalam jurnalisme data, The Reporter memakai blok [Penjelasan] untuk menjelaskan cara perhitungan dan tanda (Catatan) untuk koreksi; konvensi itu kami jadikan modul. Baris pertama diisi salah satu dari `Penjelasan`/`Metode`/`Catatan`/`Koreksi`/`Pembaruan`, dan setiap baris sisanya menjadi satu paragraf tersendiri.

```tw-note
Penjelasan
Di halaman ini, «indeks penuaan» = populasi usia 65 tahun ke atas ÷ populasi usia 0–14 tahun × 100. Nilai 100 berarti jumlah lansia dan anak-anak sama banyak; semakin tinggi angkanya, semakin «berat di atas» daerah itu.
Tingkat penuaan dan indeks penuaan diambil dari statistik akhir 2025 Direktorat Jenderal Administrasi Kependudukan Kementerian Dalam Negeri; analisis lengkap 22 kabupaten/kota ada di 〈Melihat 22 Kabupaten/Kota Taiwan dengan Data〉.
```

## Grafik Garis tw-line

Tren untuk empat titik waktu atau lebih, digambar sebagai garis dengan inline SVG, dan batas atas-bawah sumbu y ditandai agar pembaca melihat rentangnya. Yang paling penting — modul ini **otomatis menghasilkan tabel data tersembunyi** sehingga pembaca layar dan perayap AI dapat membaca data mentahnya. Grafik untuk dilihat manusia, tabel untuk dibaca mesin, keduanya bersumber sama.

```tw-line
Kenaikan rasio harga rumah terhadap pendapatan nasional selama sepuluh tahun (kali)
Tahun | Nasional
2014 | 8.41
2016 | 9.32
2018 | 8.57
2020 | 9.20
2022 | 9.61
2024 | 10.76
Baseline: Titik awal 2014 | 8.41
Sumber: Pusat Penelitian Properti Universitas Chengchi, Platform Informasi Properti Kementerian Dalam Negeri
```

Grafik garis juga mendukung **garis baseline**: tambahkan satu baris `Baseline: label | nilai`, dan ia digambar sebagai garis putus-putus tanpa titik ujung, hanya dengan satu label, sehingga secara visual terpisah dari deret hasil pengukuran. Pembaca tidak akan keliru menganggap ambang tetap sebagai data hasil pengukuran.

## Grafik Kemiringan tw-slope

Bila Anda hanya punya «dua titik waktu», grafik garis menyia-nyiakan ruang kosong di tengahnya. Grafik kemiringan langsung membiarkan kemiringan garis penghubung kedua ujung yang berbicara: siapa naik paling tajam dan siapa menyalip siapa terbaca sekilas. Menambahkan `*` di awal label akan menonjolkan satu baris, sementara baris lain otomatis memudar menjadi abu-abu sebagai konteks.

```tw-slope
Rasio harga rumah terhadap pendapatan: siapa yang naik paling tajam dalam sepuluh tahun (kali)
2014 | 2024
Nasional | 8.41 | 10.76
*Taipei | 12.0 | 16.60
Sumber: Platform Informasi Properti Kementerian Dalam Negeri, Pusat Penelitian Properti Universitas Chengchi
```

## Peta Panas tw-heatmap

Perbandingan matriks wilayah × indikator, atau tahun × kategori. Setiap kolom dinormalisasi sendiri-sendiri menjadi kepekatan warna; semakin besar angkanya, semakin hangat warnanya. Peta panas ini sendiri adalah tabel HTML, sehingga sejak awal sudah dapat dibaca AI — itulah alasan peta panas di sistem kami lebih baik daripada «sebuah gambar berwarna».

```tw-heatmap
Kabupaten/Kota | Rasio harga rumah terhadap pendapatan (kali) | Rasio beban KPR (%)
Taipei | 16.60 | 63.9
Taipei Baru | 13.03 | 56.9
Taichung | 11.11 | 48.0
Taoyuan | 9.0 | 40.0
Sumber: Platform Informasi Properti Kementerian Dalam Negeri
```

## Diagram Titik tw-dot

Diagram batang membandingkan «besaran», diagram titik melihat «sebaran»: semua titik jatuh pada satu penggaris yang sama, sehingga terlihat siapa yang bergerombol dan siapa yang pencilan. Satu nilai per baris menghasilkan dot strip; dua nilai digambar sebagai rentang «dari sini ke sana»; tiga nilai (`estimasi titik | batas bawah | batas atas`) digambar seperti jajak pendapat, yaitu «estimasi titik + pita ketidakpastian». Galat pengambilan sampel ±3% tidak boleh ditelan; inilah penyajian jujur yang paling sering gagal dijaga di tahun pemilu. `*` tetap bisa dipakai untuk penekanan.

```tw-dot
Dua kutub tingkat penuaan: dari kabupaten/kota termuda hingga tertua (persentase usia 65 tahun ke atas, %)
Kabupaten Hsinchu | 15.08 | Termuda di seluruh Taiwan
Taoyuan | 16.72
Taichung | 17.40
Taipei Baru | 19.95
Tainan | 20.48
Kaohsiung | 20.79
*Kabupaten Chiayi | 24.11 | Indeks penuaan tertinggi di seluruh Taiwan
*Taipei | 24.18 | Tertinggi di seluruh Taiwan
Sumber: Direktorat Jenderal Administrasi Kependudukan Kementerian Dalam Negeri, akhir 2025
```

## Batang Bertumpuk tw-stack

Diagram waffle cocok untuk komposisi «satu keseluruhan»; batang bertumpuk cocok untuk **membandingkan komposisi di beberapa baris** — setiap baris otomatis dinormalisasi menjadi 100%, dan bila segmennya cukup lebar, nilainya langsung dicantumkan di dalam blok warna.

```tw-stack
Tiga referendum nuklir: setuju vs tidak setuju (persentase suara sah %)
Referendum | Setuju | Tidak setuju
2018 Nuklir untuk Hijau | 59 | 41
2021 Menghidupkan kembali PLTN Keempat | 47 | 53
2025 Perpanjangan operasi PLTN Ketiga | 74 | 26
Sumber: Hasil penetapan resmi tiga referendum oleh Komisi Pemilihan Umum Pusat
```

## Piramida tw-pyramid

Batang saling membelakangi, satu kubu di kiri dan satu di kanan, dengan label bersama di tengah, adalah bentuk klasik demografi. Di sini dipakai untuk melihat «berat di atas» enam kabupaten/kota: di kiri anak-anak, di kanan lansia, dan setelah keduanya dibandingkan, penuaan bukan lagi persentase yang abstrak.

```tw-pyramid
Berat di atas: persentase penduduk usia anak vs lansia di enam kabupaten/kota (%)
Kabupaten/Kota | 0–14 tahun | 65 tahun ke atas
Kabupaten Hsinchu | 14.80 | 15.08
Taoyuan | 13.13 | 16.72
Taichung | 12.75 | 17.40
Taipei | 11.97 | 24.18
Keelung | 9.28 | 22.28
Kabupaten Chiayi | 8.27 | 24.11
Sumber: Direktorat Jenderal Administrasi Kependudukan Kementerian Dalam Negeri, akhir 2025; persentase usia anak dihitung dari tingkat penuaan ÷ indeks penuaan × 100
```

## Peta Ubin Kabupaten/Kota tw-tiles

Peta choropleth Taiwan punya dua masalah lama: Hualien dan Taitung begitu luas sehingga merebut bobot visual, dan bentuk Taiwan gambaran tangan AI sering menjadi «sesuatu di antara buah zaitun dan kentang». Peta ubin menyusun 22 kabupaten/kota menjadi ubin berukuran sama (tata letaknya ditanam permanen di sistem, mengikuti posisi relatif yang sebenarnya); setiap ubin berbobot sama, dan angkanya ditulis langsung di atas ubin. Bentuknya selalu benar, karena sejak awal tidak ada bentuk yang digambar.

```tw-tiles
Tingkat penuaan 22 kabupaten/kota se-Taiwan (persentase penduduk usia 65 tahun ke atas, %)
Kota Taipei | 24.18
Kota Taipei Baru | 19.95
Kota Taoyuan | 16.72
Kota Taichung | 17.40
Kota Tainan | 20.48
Kota Kaohsiung | 20.79
Kota Keelung | 22.28
Kota Hsinchu | 16.16
Kota Chiayi | 19.90
Kabupaten Hsinchu | 15.08
Kabupaten Miaoli | 20.23
Kabupaten Changhua | 20.37
Kabupaten Nantou | 22.66
Kabupaten Yunlin | 21.76
Kabupaten Chiayi | 24.11
Kabupaten Pingtung | 21.84
Kabupaten Yilan | 20.77
Kabupaten Hualien | 21.52
Kabupaten Taitung | 20.93
Kabupaten Penghu | 21.03
Kabupaten Kinmen | 19.69
Kabupaten Lienchiang | 17.14
Sumber: Direktorat Jenderal Administrasi Kependudukan Kementerian Dalam Negeri, akhir 2025
```

## Diagram Isotipe tw-iso

«174.891 rumah tangga» adalah angka yang dibaca lalu dilupakan; sembilan titik yang bisa dihitung dengan jari tidak demikian. Diagram isotipe mengganti angka besar menjadi satuan yang dapat dihitung, «satu simbol = berapa banyak». Inilah cara berpikir The Reporter saat menggarap liputan khusus perikanan samudra: mengganti angka raksasa yang tak terasa menjadi satuan yang terasa bagi masyarakat. Simbol hanya memakai bilangan bulat (tidak dipotong setengah), dan nilai pastinya ditulis di sampingnya.

```tw-iso
Berapa banyak perumahan nasional yang dibangun pemerintah dalam 24 tahun ini
單位：● = 20.000 rumah tangga
Dibangun langsung oleh pemerintah | 174.891 rumah tangga | 1976–1999
Total perumahan nasional dalam arti luas | 390.000 lebih rumah tangga | Hingga dicabut 2015
Sumber: Siaran pers Yuan Eksekutif tentang pencabutan Undang-Undang Perumahan Nasional
```

## Busur Kursi tw-arc

Komposisi kursi parlemen punya diagram khususnya sendiri: titik-titik setengah lingkaran, satu kursi satu titik, dengan partai disusun menurut urutan daftar menjadi kipas yang bersambung. Diagram lingkaran membandingkan sudut (hal yang sangat tidak dikuasai mata manusia), sedangkan busur kursi membiarkan Anda langsung menghitung titik, dan garis mayoritas digambar tepat di tempatnya. Di sini dipakai hasil pemilu legislatif 2024: 113 kursi, tiga partai tidak mencapai mayoritas, dan garis putus-putus itulah titik awal tarik-menarik seluruh gerakan pemecatan massal sesudahnya. Perhatikan bahwa ini diagram untuk parlemen: pemilu «satu daerah satu pemenang» seperti pemilihan kepala 22 kabupaten/kota sebaiknya memakai peta ubin kabupaten/kota di atas.

```tw-arc
Kursi Yuan Legislatif 2024: tiga partai tidak mencapai mayoritas (113 kursi)
過半：57
Kuomintang | 52
Partai Progresif Demokratik | 51
Partai Rakyat Taiwan | 8
Independen | 2 | condong pan-Biru
Sumber: Komisi Pemilihan Umum Pusat
```

## Grid Kelipatan Kecil tw-multiples

Menjejalkan lima garis dalam satu grafik membuat garis-garis itu kusut seperti spageti; small multiples membagi setiap garis ke selnya sendiri, **semua sel memakai penggaris yang sama**, sehingga bentuk-bentuknya bisa saling dibandingkan. Di sini dipakai rasio perawat-pasien tiga shift: peta panas (di atas) memberi matriks yang presisi, sedangkan small multiples memberi bentuk «setiap tingkat naik menuju larut malam, dan tingkat paling dasar naik paling curam». Data yang sama, pertanyaan yang berbeda, maka pilihlah grafik yang berbeda.

```tw-multiples
Semakin larut malam dan semakin dasar tingkat rumah sakitnya, semakin banyak tempat tidur yang dijaga satu perawat (orang)
Kolom: Shift | Rasio perawat-pasien
--- Pusat Medis
Shift pagi | 6
Shift sore | 9
Shift malam | 11
--- Rumah Sakit Regional
Shift pagi | 7
Shift sore | 11
Shift malam | 13
--- *Rumah Sakit Daerah
Shift pagi | 10
Shift sore | 13
Shift malam | 15
Sumber: Pengumuman standar rasio perawat-pasien tiga shift Kementerian Kesehatan dan Kesejahteraan, 2024
```

## Cara Memakai Modul-modul Ini

Setiap modul ditulis sebagai satu blok ` ```tw-* ` di dalam Markdown artikel, dengan `|` sebagai pemisah kolom, dan saat proses build otomatis diubah menjadi tampilan yang Anda lihat di atas — penulis tidak perlu menulis HTML atau JavaScript sama sekali. Sintaksis lengkap, kapan harus memakai yang mana, cara mengatur warna dan sumbu agar tidak menyesatkan, serta daftar periksa visualisasi sebelum terbit, semuanya ada di [graph.md](https://github.com/frank890417/taiwan-md/blob/main/docs/editorial/graph.md).

Sistem ini merujuk pada falsafah editorial media penuturan visual [The Pudding](https://pudding.cool/) — pertanyaan mendahului data, kesimpulan harus tegas, anotasi adalah tokoh utamanya — tetapi tumbuh menjadi organ yang cocok bagi Taiwan.md sendiri: statis, multibahasa, dan dapat dibaca AI. Konteks desain selengkapnya ditulis dalam [Laporan Desain Sistem Visualisasi](https://github.com/frank890417/taiwan-md/blob/main/reports/article-visualization-design-2026-06-06.md).

Untuk melihat bagaimana modul-modul ini diselipkan ke dalam narasi sebuah artikel mendalam yang sungguhan, bacalah [Perumahan Nasional dan Keadilan Tempat Tinggal](/id/society/public-housing-justice) — sebagian besar data di halaman ini berasal dari riset artikel itu.

## Sistem Ini Juga Terus Berevolusi

Halaman yang sedang Anda baca ini sendiri adalah hasil tiga putaran evolusi. Karena ini halaman yang membahas lini masa, kami memakai modul sumbu kebijakan untuk menceritakan sejarahnya sendiri:

```tw-timeline
2026-06-06 | Sepuluh modul lahir | Setelah mempelajari taksonomi grafik The Pudding dan FT, tumbuh gelombang pertama: angka besar, kartu perbandingan, batang proporsi, grafik garis
2026-06-12 | Seminggu kemudian tumbuh menjadi tujuh belas | Ditambah grafik kemiringan, diagram titik, batang bertumpuk, piramida, peta ubin kabupaten/kota, dan diagram isotipe; alat verifikasi piksel viz-shot lahir pada hari yang sama, karena «markup ada» dan «tampilannya benar» adalah dua hal yang berbeda
2026-07-16 | Sembilan belas, dan belajar berbicara enam bahasa | Busur kursi dan grid kelipatan kecil bergabung; string sistem seperti «sumber data» kini dirender dalam enam bahasa, dan peta ubin kabupaten/kota di versi Inggris dan Jepang tidak lagi merosot menjadi batang
Sumber: Laporan desain dan evolusi sistem visualisasi Taiwan.md (Juni hingga Juli 2026, terbuka di GitHub)
```

Inti putaran ketiga sebenarnya bukan jenis grafik baru, melainkan pemeriksaan diri yang jujur. Audit seluruh situs menemukan bahwa modul yang diawasi gerbang otomatis memiliki tingkat pencantuman sumber 100%, sedangkan tiga modul berfrekuensi tinggi yang tidak diawasi, empat puluh persennya telanjang tanpa sumber. Aturan sudah tertulis di panduan editorial selama dua bulan, tetapi perilaku sepenuhnya mengikuti bentuk instrumen, maka kali ini instrumen dilebarkan hingga sama luasnya dengan aturan. Putaran yang sama juga menangkap string sistem di halaman berbahasa Inggris, Jepang, dan Korea yang semuanya dirender dalam bahasa Mandarin, bahkan satu aksara Mandarin sederhana terselip di label aksesibilitas tanpa ada yang menyadari. Bagi sistem yang mengaku «membuat LLM memahami data Taiwan dalam enam bahasa», sudut-sudut ini lebih penting daripada fitur baru.

Riset beberapa tahun terakhir juga mendukung jalur ini: akurasi AI multimodal dalam merekonstruksi nilai grafik dari gambar tidak dapat diandalkan, dan simpul teks-lah yang benar-benar terbaca stabil oleh mesin. Inilah alasan peta ubin menulis angka langsung di atas ubin dan setiap grafik dilengkapi tabel data tersembunyi. Proses riset dan keputusan desain selengkapnya ditulis dalam [Laporan Riset Mendalam dan Implementasi Sistem Visualisasi v3.0](https://github.com/frank890417/taiwan-md/blob/main/reports/viz-module-evolution-2026-07-16.md).

**Bacaan Lanjutan**:

- [Perumahan Nasional dan Keadilan Tempat Tinggal](/id/society/public-housing-justice) — Kisah lengkap di balik data perumahan ini: bagaimana perumahan nasional berubah dari rumah murah menjadi tangga aset, sumber data sebagian besar modul di halaman ini
- [Melihat 22 Kabupaten/Kota Taiwan dengan Data](/id/geography/data-taiwan-22-cities) — Data penuaan untuk diagram titik, piramida, dan peta ubin kabupaten/kota di halaman ini seluruhnya berasal dari analisis lengkap 22 kabupaten/kota dalam artikel itu
- [Diskusi Taiwan dan Energi Nuklir](/id/society/taiwan-nuclear-debate) — Kisah lengkap tiga referendum pada batang bertumpuk itu: menang dalam debat, kalah dalam sistem
- [Undang-Undang Medis](/id/society/medical-care-act) — Kisah lengkap angka rasio perawat-pasien tiga shift pada grid kelipatan kecil itu: undang-undang bisa menulis berapa tempat tidur yang dijaga, tetapi tidak bisa menulis apakah tangan itu ada
- [Pemecatan Massal](/id/history/great-recall-movement-2024) — Kelanjutan garis mayoritas putus-putus pada busur kursi itu: bagaimana Yuan Legislatif dengan tiga partai tanpa mayoritas sampai pada 31 kasus pemecatan
- [Krisis Angka Kelahiran Rendah Taiwan](/id/society/taiwan-low-birth-rate-crisis) — Tidak mampu membeli rumah dan tidak mampu melahirkan anak, sisi lain dari keadilan antargenerasi

## Sumber Gambar

Artikel ini memakai 1 gambar berlisensi Creative Commons, disimpan di cache `public/article-images/society/`:

- [Cakrawala hunian Kota Taipei (sudut pandang Xiangshan)](https://commons.wikimedia.org/wiki/File:20260204_Taipei,_Taiwan_Skyline.jpg) — Foto: Heeheemalu, 2026, CC BY-SA 4.0 (hero)

## Referensi

[^1]: [Platform Informasi Properti Kementerian Dalam Negeri](https://pip.moi.gov.tw/Publicize/Info/E1050) — Statistik perumahan resmi seperti rasio harga rumah terhadap pendapatan, rasio beban KPR, dan tingkat kepemilikan rumah.

[^2]: [Pusat Penelitian Properti Universitas Chengchi](https://rer.nccu.edu.tw/article/detail/2210058908437) — Indikator kemampuan membeli rumah dari tahun ke tahun, sumber deret rasio harga rumah terhadap pendapatan nasional pada grafik garis dan batang proporsi di halaman ini.

[^3]: [Siaran pers Yuan Eksekutif tentang pencabutan Undang-Undang Perumahan Nasional](https://www.ey.gov.tw/Page/9277F759E41CCD91/d4afaf10-ece5-4b4f-9482-35ce16bdc657) — Data resmi seperti jumlah kumulatif perumahan nasional (sekitar 390.000 lebih rumah tangga).

[^4]: [Data statistik kependudukan Direktorat Jenderal Administrasi Kependudukan Kementerian Dalam Negeri](https://www.ris.gov.tw/app/portal/346) — Persentase penduduk usia 65 tahun ke atas dan indeks penuaan tiap kabupaten/kota pada akhir 2025, sumber data diagram titik, piramida, peta ubin kabupaten/kota, dan kotak penjelasan di halaman ini; rantai verifikasi lengkap lihat 〈[Melihat 22 Kabupaten/Kota Taiwan dengan Data](/id/geography/data-taiwan-22-cities)〉.

[^5]: [Hasil referendum Kasus ke-16 tahun 2018 Komisi Pemilihan Umum Pusat (PDF)](https://web.cec.gov.tw/api/file/0132581c-18b5-4951-bc24-3cc083924666.pdf) — Persentase persetujuan tiga referendum nuklir (59%／47%／74%) adalah hasil penetapan resmi Komisi Pemilihan Umum Pusat; rantai verifikasi per kasus lihat 〈[Diskusi Taiwan dan Energi Nuklir](/id/society/taiwan-nuclear-debate)〉.

[^6]: [CNA: Pemilu legislatif 2024, tiga partai tidak mencapai mayoritas](https://www.cna.com.tw/news/aipl/202401130361.aspx) — Pembagian 113 kursi pada busur kursi (Kuomintang 52, Partai Progresif Demokratik 51, Partai Rakyat Taiwan 8, independen 2) adalah hasil penetapan Komisi Pemilihan Umum Pusat; rantai verifikasi lihat 〈[Pemecatan Massal](/id/history/great-recall-movement-2024)〉.

[^7]: [Pengumuman standar rasio perawat-pasien tiga shift Kementerian Kesehatan dan Kesejahteraan (2024)](https://www.mohw.gov.tw/) — Nilai standar rasio perawat-pasien tiga tingkat × tiga shift pada grid kelipatan kecil; rantai verifikasi lihat 〈[Undang-Undang Medis](/id/society/medical-care-act)〉.
