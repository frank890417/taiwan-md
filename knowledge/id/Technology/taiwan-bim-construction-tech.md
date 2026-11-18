---
title: 'BIM dan Teknologi Konstruksi Taiwan: Pendekatan Kasus per Kasus Pemerintah Selama Dua Belas Tahun Ditulis Ulang oleh Sebuah Protokol Berusia Delapan Belas Bulan'
description: 'Pada 23 Mei 2014, Komisi Pekerjaan Umum Yuan Eksekutif meresmikan “Platform Promosi Penggunaan BIM dalam Pekerjaan Umum” dengan pedoman delapan aksara yang berarti “disesuaikan dengan setiap kasus dan diterapkan secara bertahap”. Sebelas tahun tujuh bulan kemudian, seorang pengembang Taiwan yang bekerja di Tokyo mengunggah repositori bernama REVIT_MCP_study ke GitHub dan memperoleh lebih dari tujuh puluh bintang serta lebih dari delapan puluh fork. Dalam dua belas tahun di antaranya, industri arsitektur Taiwan menempuh perjalanan panjang dari gambar tangan dan cetak biru menuju model 3D, dari percobaan individual menuju standar nasional, serta dari peningkatan alat menuju pendefinisian ulang profesi.'
date: 2026-05-22
category: 'Technology'
tags:
  [
    'Teknologi',
    'BIM',
    'Pemodelan Informasi Bangunan',
    'Teknologi Konstruksi',
    'Arsitektur',
    'Transformasi Digital',
    'Revit',
    'MCP',
    'Kecerdasan Buatan',
    'CTCI',
    'CECI Engineering Consultants Taiwan',
    'Shuotao',
  ]
subcategory: '建築科技'
author: 'Taiwan.md'
featured: true
lastVerified: 2026-05-22
lastHumanReview: false
readingTime: 22
researchReport: 'reports/research/2026-05/台灣BIM與營建科技.md'
image: '/article-images/technology/freecad-bim-example-2024.webp'
imageCredit: 'Maxwxyz via Wikimedia Commons'
imageLicense: 'CC BY 4.0'
imageSource: 'https://commons.wikimedia.org/wiki/File:FreeCAD_1.0_Dark_BIM_Example.png'
curation: 'incubating'
curationReason: 'unverified'
translatedFrom: 'Technology/台灣BIM與營建科技.md'
sourceCommitSha: 'b1a5fea00'
sourceContentHash: 'sha256:85f9d09627902abf'
sourceBodyHash: 'sha256:c4a7f62bbc68876d'
translatedAt: '2026-11-18T12:24:31.258304+00:00'
---

# BIM dan Teknologi Konstruksi Taiwan: Pendekatan Kasus per Kasus Pemerintah Selama Dua Belas Tahun Ditulis Ulang oleh Sebuah Protokol Berusia Delapan Belas Bulan

![Tangkapan layar platform kerja BIM sumber terbuka FreeCAD 1.0 dengan tema gelap. Bagian tengah menampilkan model 3D sebuah bangunan percontohan, panel kiri mencantumkan lapisan tiap disiplin—struktur, mekanikal-elektrikal, dan selubung—sedangkan bilah alat bawah memuat rangkaian perintah khusus BIM workbench. Tampilan ini mencerminkan hakikat transformasi digital rekayasa BIM yang menyistematisasi informasi bangunan.](/article-images/technology/freecad-bim-example-2024.webp)
_Berkas demonstrasi BIM workbench FreeCAD 1.0 Dark Theme. Foto: Maxwxyz, 2024-10-07. [Lisensi melalui Wikimedia Commons](https://commons.wikimedia.org/wiki/File:FreeCAD_1.0_Dark_BIM_Example.png)._

> **Ikhtisar 30 detik:** Pada 23 Mei 2014, Komisi Pekerjaan Umum Yuan Eksekutif meresmikan “Platform Promosi Penggunaan Pemodelan Informasi Bangunan (BIM) dalam Pekerjaan Umum”[^1]. Penerapannya dibagi menjadi tiga tahap berdasarkan prinsip “disesuaikan dengan setiap kasus dan diterapkan secara bertahap”, dan hingga kini belum diwajibkan[^2]. Dalam kurun yang sama, Pusat Riset BIM Universitas Nasional Taiwan membuka kelas pertamanya, Taiwan Building Information Modeling Association resmi berdiri[^3], Pemerintah Kota Taipei Baru menerbitkan izin bangunan pertama berbasis BIM, Departemen Pengembangan Perkotaan Taipei mengumumkan pedoman operasional model as-built[^4], dan BSI menandatangani nota kesepahaman Taiwan BIM Task Group[^5]. Sebelas tahun tujuh bulan kemudian, pada 10 Desember 2025, seorang pengembang bernama CHIANG SHUOTAO mengunggah repositori `REVIT_MCP_study` ke GitHub dan memperoleh 73 bintang serta 85 fork[^6]. Empat bulan setelahnya, pada April 2026, Autodesk mengumumkan bahwa Revit 2027 dilengkapi server Model Context Protocol bawaan[^7]. Di antara dua belas tahun ketika pemerintah kesulitan mendorong BIM dan sebuah protokol Anthropic yang baru berusia delapan belas bulan, industri konstruksi Taiwan perlahan mengalami pendefinisian ulang profesi—dari menggambar menuju integrasi sistem.

---

## Pendekatan “Disesuaikan dengan Setiap Kasus” dari Komisi Pekerjaan Umum

Pada 23 Mei 2014, Komisi Pekerjaan Umum Yuan Eksekutif membentuk sesuatu yang disebut “Platform Promosi Penggunaan Pemodelan Informasi Bangunan (BIM) dalam Pekerjaan Umum”[^1]. Pedoman delapan aksara yang dicanangkan pada hari peresmiannya berarti “**disesuaikan dengan setiap kasus dan diterapkan secara bertahap**”.

Delapan aksara itu terus dikutip selama bertahun-tahun.

Komisi membagi strategi promosinya menjadi tiga tahap. Tahap pertama (tahun 103 kalender Republik Tiongkok, atau 2014), “mendorong dan memilih proyek percontohan”, mengajak instansi penyelenggara proyek nonbangunan untuk menjalankan proyek uji coba, dengan prioritas pada tender desain-bangun yang menggunakan metode penawaran paling menguntungkan. Tahap kedua (2015–2016) adalah “pelaksanaan dan evaluasi proyek percontohan”. Tahap ketiga menetapkan bahwa “**mulai 2017, teknologi BIM akan dipromosikan untuk pekerjaan umum di atas nilai tertentu**”[^1].

Namun, hingga 2026, ambang “di atas nilai tertentu” itu belum berubah menjadi kewajiban menyeluruh. Komisi berulang kali menegaskan bahwa “**instansi penyelenggara proyek harus menilai sendiri apakah teknologi BIM akan digunakan pada proyek yang lebih kompleks atau berskala lebih besar, sesuai kebutuhan tiap kasus dan kemampuan instansi dalam mengelola pelaksanaan kontrak; ketentuan ini bukan aturan yang menyeluruh dan wajib**”[^2].

Sebagai pembanding, Hong Kong telah lama mewajibkan BIM untuk proyek bernilai perkiraan lebih dari HK$30 juta melalui Biro Pembangunannya[^8]. Di Taiwan, tiga verba—“mendorong”, “menguji coba”, dan “menilai sendiri”—bergantian muncul dalam setiap buku putih.

Data publik yang tersedia hingga tanggal penelusuran menunjukkan bahwa platform BIM Komisi telah mencatat “lebih dari 60 instansi pengadaan pekerjaan yang menggunakan teknologi BIM, dengan lebih dari 120 tender penerapan”[^2]. Dibandingkan dengan lebih dari sepuluh ribu proyek pekerjaan umum di Taiwan setiap tahun, angka ini bahkan tidak cukup untuk mengisi celah gigi.

> **📝 Catatan kurator**
> Penjelasan yang lazim adalah “pemerintah gagal mendorong BIM karena industri tidak mampu mengikutinya”. Penjelasan itu nyaman secara naratif, tetapi membalikkan sebab dan akibat. **Urutan yang sebenarnya lebih mendekati ini: sejak 2014, pemerintah memutuskan untuk tidak mewajibkan BIM karena kewajiban tersebut sama saja dengan menghancurkan mata pencaharian separuh kantor arsitek.** Pendekatan kasus per kasus merupakan sebuah kalkulasi politik: hak memilih diserahkan kepada segelintir instansi yang “memiliki kemampuan mengelola pelaksanaan kontrak”, sementara yang lain terus memakai AutoCAD dan tidak saling mengusik.

---

## Kementerian Dalam Negeri, Taipei, dan Taipei Baru: Tiga Poros yang Tidak Sinkron

Ketika Komisi Pekerjaan Umum menjalankan agendanya, Institut Riset Arsitektur dan Bangunan Kementerian Dalam Negeri menjalankan agendanya sendiri.

ABRI (Institut Riset Arsitektur dan Bangunan Kementerian Dalam Negeri) memulai program jangka menengah empat tahun “**Riset, Pengembangan, Promosi, Berbagi, dan Penerapan Integrasi Informasi Bangunan**” pada 2015, lalu menyambungnya dengan program empat tahun tahap kedua pada 2019[^9]. Dua sasaran besar tahap kedua dirumuskan secara ambisius: “**peningkatan digital teknologi bangunan**” dan “**lingkungan hunian digital**”. Sasaran kedua hendak mengintegrasikan BIM dengan GIS dan IoT untuk membangun kota digital[^10].

Namun, ABRI bukan instansi pelaksana pengendalian bangunan. Kewenangan itu berada di tangan pemerintah kabupaten dan kota.

Pada 2014, **Pemerintah Kota Taipei Baru menerbitkan izin bangunan pertama yang lolos pemeriksaan berdasarkan model BIM**[^11]. Pada tahun yang sama, Taipei Baru mengumumkan “**Pedoman Penyerahan Informasi Model As-Built BIM untuk Bangunan Publik Kota Taipei Baru**”. Hingga 2026, “Sistem Pemeriksaan Berbantuan Komputer untuk Izin Bangunan” milik Pemerintah Kota Taipei Baru (bim.ntpc.gov.tw) telah mengumpulkan lebih dari 20 model BIM yang selesai[^11].

Empat tahun kemudian, pada 6 November 2018, **Departemen Pengembangan Perkotaan Pemerintah Kota Taipei mengumumkan “Pedoman Operasional Data Atribut Model As-Built Pemodelan Informasi Bangunan (BIM) untuk Pekerjaan Bangunan yang Diselenggarakan Departemen Pengembangan Perkotaan Pemerintah Kota Taipei”**[^4]. Pedoman Taipei mengacu pada format internasional COBie (Construction Operations Building Information Exchange), serta memasukkan pedoman terkait yang diterbitkan ABRI dan Britania Raya pada 2015[^4]. Pedoman itu mengharuskan proyek yang menggunakan perangkat lunak pemodelan BIM berbeda mengekspor dan menyerahkan data standar **IFC** (Industry Foundation Classes, kelas fondasi industri—standar internasional terbuka yang disusun buildingSMART International, ISO 16739-1:2024) dan COBie[^4][^12].

> **💡 Tahukah Anda**
> IFC merupakan standar internasional terbuka yang disusun oleh organisasi nirlaba bernama buildingSMART International[^12] dan tidak terikat pada Autodesk ataupun vendor tunggal lainnya. Logika keberadaannya serupa dengan PDF: memungkinkan model yang dibuat menggunakan perangkat lunak berbeda—Revit, ArchiCAD, Tekla, dan Navisworks—dipertukarkan tanpa hambatan. **Sejak 2010, pemerintah Denmark mewajibkan penggunaan format IFC dalam proyek pembangunan publik; Norwegia, Finlandia, dan Singapura kemudian mengikuti**[^12]. Taiwan baru memasukkan IFC ke dalam pedoman pada 2018, itu pun di tingkat lokal melalui Pemerintah Kota Taipei. Standar internasional telah melaju sepuluh tahun lebih dahulu; Taiwan perlahan menyusul.

Ketiga poros—pemerintah pusat, Taipei, dan Taipei Baru—bergerak pada jadwal yang sama sekali tidak sinkron. Sebuah stasiun MRT yang sama mungkin memakai ketentuan BIM Departemen Sistem Angkutan Cepat Taipei pada tahap desain, yang diikatkan ke dalam kontrak desain-bangun; memakai pedoman model as-built Departemen Pengembangan Perkotaan Taipei pada tahap perizinan bangunan, dalam format COBie; lalu pada tahap operasi dan pemeliharaan masuk ke perangkat facility management lain lagi.

“**Saat ini, sebagian besar penerapan BIM di sektor publik terbatas pada tahap desain dan konstruksi. Pola penerapannya pun berbeda antara proyek konvensional dan desain-bangun, sedangkan pengelolaan operasi berikutnya masih menggunakan cara tradisional**”[^13]—demikian tertulis dalam laporan hasil ABRI sendiri.

---

## Wanda Line, Stasiun Miaoli, Bandara Taoyuan T3: Kemunculan BIM dalam Pekerjaan Umum

2011, **MRT Wanda Line Taipei pertama kali memasukkan BIM ke dalam kontrak desain teknik**[^14].

Ini adalah peristiwa "first" yang sering dikutip dalam penggerakan BIM Taiwan. Setiap segmen Wanda Line sesuai persyaratan kontrak mengadopsi mode BIM untuk desain badan stasiun MRT, sambil memperkenalkan keahlian arsitektur, struktur, dan MEP, integrasi lintas disiplin, **mengurangi konflik antarmuka desain**[^14].

Mengikuti langkah Wanda Line, pekerjaan umum datang satu demi satu. Stasiun tinggi Y19 MRT Lingkaran Taipei, beberapa pusat olahraga di New Taipei, [Taiwan High Speed Rail](/id/lifestyle/taiwan-high-speed-rail/) stasiun baru Miaoli, [Bandara Taoyuan](/id/lifestyle/taoyuan-airport/) Terminal Ketiga, LRT Lingkaran Kaohsiung: setiap kasus memiliki satu case study tertulis di ABRI, NTUBIM UI, atau majalah internal Dinas MRT.

Kemenangan digital yang paling sering dikutip adalah Stasiun Miaoli Taiwan High Speed Rail: tiga bulan sebelum pembukaan proyek memasukkan BIM, tim pengawasan menemukan banyak titik konflik dari model 3D, **menghemat 20% biaya perubahan desain lanjutan, peletakan di lokasi proyek dimulai dua bulan lebih awal dari jadwal**[^15].

Bandara Taoyuan Terminal Ketiga adalah kasus lain dengan skala berbeda. Maret 2021, **tim yang dibentuk oleh Samsung C&T dan RSEA Engineering memenangkan tender konstruksi sipil badan utama terminal T3 sebesar NT$44,5 miliar**[^16]. Seluruh T3 dipimpin desain oleh Taiwan CECI Engineering Consultants (bersama Rogers Stirk Harbour + Partners dan Ove Arup and Partners Hong Kong), kolaborasi lintas negara harus mengandalkan model BIM yang mengalir antar firma: ini adalah kasus andalan yang berulang digunakan dalam materi pelatihan internal Taiwan CECI[^17].

> **✦** Saat Wanda Line 2011 pertama kali memasukkan BIM ke dalam kontrak, adalah titik balik diam dalam sejarah pekerjaan umum Taiwan. Sejak hari itu, MRT, bandara, HSR, LRT Taiwan, tidak ada lagi satu pun proyek pekerjaan umum besar yang tidak bertanya "BIM bagaimana caranya".

Tetapi ini semua adalah "kasus panutan". Semua kasus panutan di Taiwan hanya memiliki satu kelemahan bersama: **mereka adalah minoritas**.

## Lima Konsultan Rekayasa Besar dan Dua Organisasi Utama: Orang-Orang di Baliknya

Orang-orang yang membawa BIM ke dalam pekerjaan umum memiliki nama dan wajah.

**CECI Engineering Consultants Taiwan, Inc.**: didirikan pada 2007 sebagai perusahaan investasi dari China Engineering Consultants, Inc. (CECI, didirikan pada 1969)[^18]. Perusahaan ini **menjadi pelopor dengan membentuk Pusat Integrasi BIM pada 2010**[^19], salah satu pusat integrasi paling awal dalam industri Taiwan. Dari hampir 2.000 pegawainya, 90% memiliki latar belakang terkait jalan raya, perkeretaapian, pelabuhan, bandara, jembatan, struktur, terowongan, MRT, arsitektur, mekanikal, elektrikal dan kendali sistem, BIM, ITS, PPP, serta bidang lainnya[^19].

**Sinotech Engineering Consultants**: didirikan pada 1970. Setelah bertransformasi menjadi organisasi nirlaba pada 1994, lembaga ini berinvestasi untuk mendirikan Sinotech Engineering Consultants, Ltd.[^20]. Sinotech kemudian mengembangkan BIM menjadi sesuatu yang disebut “**Sistem Informasi Manajemen Proyek (PMIS)**”: berlandaskan semangat lingkungan data bersama (CDE) ISO 19650, sistem itu memiliki tujuh modul utama untuk membantu integrasi informasi lintas disiplin dan lintas proyek[^21].

**Evergreen Consulting Engineering, Inc. (EGC)**: didirikan pada 1974. Perusahaan ini mengerjakan desain struktur Taipei 101 dan T&C Tower 85 lantai di Kaohsiung[^22]. **CTBUH (Council on Tall Buildings and Urban Habitat) mencantumkan EGC sebagai salah satu dari sepuluh konsultan struktur bangunan tinggi terkemuka di dunia**[^22].

Di lingkungan akademik terdapat dua simpul utama:

**Pusat Riset Simulasi dan Manajemen Informasi Teknik Sipil Universitas Nasional Taiwan (NTUBIM)**: didirikan pada 2011 dan dipimpin oleh Profesor **Hsieh Shang-hsien** dari Departemen Teknik Sipil. Salah satu akademisi pendirinya, Profesor Madya **Kuo Jung-chin**, menulis artikel “**Perkembangan BIM Mengguncang Sistem Arsitektur yang Berlaku**” pada Desember 2011[^23]. Hingga kini, tulisan tersebut tetap menjadi salah satu karya awal yang penting dalam diskursus akademik BIM Taiwan. NTUBIM kemudian mengerjakan proyek-proyek pesanan ABRI dan Komisi Pekerjaan Umum selama bertahun-tahun serta memimpin penyusunan panduan kerja kolaboratif BIM Taiwan dan penerjemahan ISO 19650 ke dalam bahasa Mandarin Tradisional.

**Taiwan Building Information Modeling Association (TBIMA)**: berawal dari pertemuan penggemar teknologi BIM Taiwan pada 2009, mulai dipersiapkan pada 2011, dan **resmi didirikan pada 10 Maret 2012** sebagai organisasi masyarakat yang terdaftar di Kementerian Dalam Negeri[^3]. Anggota utamanya berasal dari kalangan instruktur pelatihan resmi Autodesk Taiwan pada 2008. Dengan demikian, garis keturunan organisasi BIM sipil Taiwan tumbuh langsung dari komunitas instruktur bersertifikat Autodesk.

> **📝 Catatan kurator**
> Dalam upacara penandatanganan nota kesepahaman Taiwan BIM Task Group pada 3 Oktober 2018[^5], terdapat lima pihak di meja: BSI (British Standards Institution) Taiwan, NTUBIM Universitas Nasional Taiwan, Taiwan Construction Research Institute, Taiwan Architecture & Building Center, dan TBIMA. **ABRI Kementerian Dalam Negeri berstatus sebagai “lembaga pembimbing”, bukan “pihak penandatangan”**—susunan tingkat kewenangan yang menarik untuk dicermati. Hal itu menunjukkan bahwa pemerintah mengakui urusan standar BIM internasional sebaiknya dipimpin oleh akademisi dan organisasi sipil, sedangkan pemerintah mengambil posisi pendukung. “**ISO 19650 Edisi Bahasa Mandarin Tradisional**” yang diterbitkan BSI setahun kemudian[^24] merupakan pernyataan kecil tentang kedaulatan lunak: Taiwan akhirnya memiliki terjemahan resmi versinya sendiri atas standar BIM internasional.

---

## Revit, ArchiCAD, dan Tekla: Arus Bawah Hegemoni Perangkat Lunak

![Tangkapan layar Autodesk Revit 2024 yang menampilkan dinding partisi sederhana beserta pintu dan jendela sebagai objek dalam ruang tiga dimensi. Panel kiri memuat properti komponen, sedangkan bagian kanan bawah memperlihatkan pratinjau tersinkronisasi secara langsung untuk denah, tampak, dan potongan. Tampilan ini mencerminkan hakikat pemodelan berorientasi objek dalam perangkat lunak BIM.](/article-images/technology/autodesk-revit-2024-bim-objects.webp)
_Demonstrasi komponen BIM Autodesk Revit 2024. Foto: DanielDefault, 2024. [Lisensi melalui Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Revit_2024.png)._

Masuklah ke kantor mana pun di Taiwan yang telah menerapkan BIM: 90% layar pembukanya adalah Revit.

“**Di Taiwan, 90% arsitek yang memiliki kemampuan desain BIM menggunakan Revit Architecture**”—angka ini ditulis oleh distributor ArchiCAD di situsnya sendiri[^25]. Meski hanya berasal dari satu sumber, angka tersebut sejalan dengan pemahaman industri: Revit nyaris memonopoli bidang desain arsitektur Taiwan.

ArchiCAD dikembangkan oleh perusahaan Hungaria, Graphisoft, dan berjalan di Mac maupun Windows. Desainnya intuitif dan kurva belajarnya lebih ramah dibandingkan Revit, tetapi jumlah penggunanya di Taiwan jelas lebih sedikit[^26]. Distributor Lung Ting Information Technology telah mengadakan banyak demonstrasi di kawasan timur Taipei. Setiap kali, selalu terdengar desainer berkata, “Saya bisa memakai Revit; kantor hanya memiliki lisensi Revit.” Inilah penguncian akibat efek skala.

Bidang struktur baja bergerak pada poros lain. **Tekla Structures—produk Trimble yang sebelumnya bernama XSteel—saat ini menjadi perangkat lunak utama untuk desain struktur baja di Taiwan**[^27]. Kemampuan Tekla dalam menangani struktur baja diakui luas oleh industri bangunan tinggi, jembatan, stadion, dan pabrik Taiwan.

Infrastruktur—perkeretaapian, jalan raya, dan terowongan—lebih condong ke sistem MicroStation milik Bentley Systems[^28]. CTCI, Sinotech, dan CECI Engineering Consultants Taiwan memakai MicroStation bersama OpenRoads atau OpenBridge dari Bentley untuk proyek desain-bangun EPC berskala besar dan proyek perkeretaapian lintas negara.

Di atas perangkat lunak utama tersebut berjalan Dynamo milik Autodesk—pemrograman visual—serta pyRevit, kerangka ekstensi Python sumber terbuka. **Pada awal 2016, Autodesk Taiwan secara khusus mendatangkan instruktur tim pengembang Dynamo dari Singapura untuk mengajar di Taiwan**[^29]. Sejak itu, Dynamo menarik perhatian komunitas insinyur BIM Taiwan. Dalam salah satu skenario umum, insinyur mekanikal-elektrikal menulis skrip Dynamo untuk mengurutkan koordinat seluruh saluran udara secara otomatis, memeriksa ruang bebas vertikal, dan menghasilkan gambar potongan. Pekerjaan yang dahulu memakan waktu sehari penuh dengan CAD kini selesai dalam beberapa menit[^30].

Panggung deteksi benturan (clash detection) dikuasai Autodesk Navisworks. Navisworks Manage menggabungkan navigasi 3D, deteksi benturan, ekspor laporan, simulasi jadwal 4D, dan estimasi biaya 5D[^31]. Dalam pekerjaan mekanikal-elektrikal MRT Taiwan terdapat istilah khusus **CSD/SEM**. CSD (Combined Service Drawing) adalah gambar gabungan utilitas mekanikal-elektrikal, sedangkan SEM (Structure/Electric/Mechanic) adalah gambar integrasi struktur, elektrikal, dan mekanikal. Cara tradisional menggunakan CAD untuk menumpangtindihkan gambar dan memeriksanya pada kertas; pada era BIM, Navisworks menjalankan pemeriksaan benturan dan menemukan titik konflik dari sudut pandang 3D[^32].

Frasa “**integrasi gambar CSD/SEM**” kini menjadi layanan wajib yang tercantum di situs perusahaan konsultan BIM Taiwan.

---

## CTCI, Futsu, Dacin, dan Obayashi: Siapa yang Membangun Taiwan

![Pemandangan jalan di lokasi pembangunan Taipei Dome pada pagi 21 Juni 2020. Selubung baja dan lembaran logam stadion masih dibangun di kejauhan, sementara sebuah truk Hino 300 melintasi penyeberangan di Jalan Zhongxiao Timur dekat Pintu Keluar 5 Stasiun MRT Sun Yat-sen Memorial Hall. Pemandangan ini mencerminkan kenyataan pembangunan stadion terbesar Taipei yang berlangsung lebih dari satu dasawarsa, serta peran Obayashi dalam mengelola konstruksi kubah berbobot 65.000 ton yang tersusun dari pipa baja bundar.](/article-images/technology/taipei-dome-construction-cheng-2020.webp)
_Lokasi pembangunan Taipei Dome, 2020-08-16, Pintu Keluar 5 Stasiun Sun Yat-sen Memorial Hall di Jalan Zhongxiao Timur. Foto: Cheng-en Cheng, 2020-08-16. [Lisensi melalui Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Taipei_Dome_and_Hino_300_BEM-5593_%2850281669428%29.jpg).\_

Penggerak utama pasar konstruksi berskala besar Taiwan adalah sekelompok kontraktor desain-bangun. Mereka mengenal BIM lebih awal daripada kantor arsitek dan lebih cepat memperlakukannya sebagai alat produksi.

Di urutan terdepan terdapat **CTCI Corporation (kode saham 9933)**. CTCI didirikan pada 1979 melalui investasi bersama CTCI Foundation, China Development Industrial Bank, dan Central Investment Company[^33]. Latar belakang pendiriannya cukup khusus. CTCI Foundation—dahulu China Technical Consultants, Inc.—didirikan pada 1959 sebagai lembaga transfer teknologi yang melayani perkembangan industri Taiwan. Ketika industri petrokimia berkembang pesat pada 1970-an, lembaga ini mengambil banyak pekerjaan konsultasi teknis dari badan usaha milik negara seperti CPC Corporation, Taiwan. Pada 1979, bisnis konsultasi rekayasanya dipisahkan dan menjadi CTCI.

Bidang usaha CTCI adalah **EPC** (Engineering, Procurement, Construction—layanan terpadu rekayasa, pengadaan, dan konstruksi): kilang minyak, petrokimia, kimia, ketenagalistrikan, baja, penyimpanan dan transportasi, perhubungan, insinerator, infrastruktur publik, serta rekayasa lingkungan[^33]. Hingga 2021, perusahaan ini memiliki 7.500 pegawai dan telah mendirikan cabang atau kantor di 15 negara[^33][^34]. Proyek Amine di Arab Saudi, proyek EPC tungku pemecah etilena Saudi Kayan, dan proyek EPC SAMAC MMA and PMMA—rangkaian nama ini membentuk jejak perusahaan EPC Taiwan di Timur Tengah selama dua puluh tahun terakhir[^33].

Pada 2011 terjadi peristiwa yang mengubah struktur pemegang saham CTCI: **Chiyoda Corporation dari Jepang memperoleh saham CTCI dan menjadi pemegang saham terbesarnya**[^33]. Artinya, pemegang saham terbesar perusahaan EPC lokal terbesar Taiwan kini adalah grup konstruksi kimia Jepang. Fakta yang jarang diketahui kebanyakan orang.

> **⚠️ Pandangan kontroversial**
> Proyek luar negeri perusahaan EPC besar seperti CTCI bukan tanpa kontroversi. Pada 2017, proyek EPC pabrik pengolahan gas CTCI di India mengalami keterlambatan besar dan piutang tak tertagih. Grup tersebut mengakui adanya “**kesenjangan fatal dalam manajemen risiko internasional**”[^35]. Pada tahun yang sama, proyek petrokimia Kuokuang telah dibatalkan, sementara kontroversi kesehatan warga di sekitar Kompleks Petrokimia Formosa Mailiao terus berkembang. Sejumlah proyek petrokimia yang melibatkan CTCI juga disebut dalam narasi lingkungan. BIM membantu meningkatkan presisi rekayasa proyek-proyek besar itu, tetapi presisi tidak menyelesaikan persoalan politik terkait tanah, tenaga kerja, dan lingkungan.

Di pasar pengembang swasta terdapat kelompok nama lain. **Futsu Construction** menyatakan telah “menyelesaikan akumulasi luas lantai bruto pabrik teknologi tinggi terbanyak, dengan pengalaman pembangunan pabrik terbesar di dalam negeri”[^36]. **Dacin Construction (2535)** dipandang sebagai “**kontraktor langganan TSMC**” dan memperoleh pesanan pekerjaan struktur atas pabrik FAB TSMC Southern Taiwan Science Park 18P3[^37]. Departemen BIM Dacin menulis dalam presentasi internalnya: “**Menggunakan BIM sebagai platform alat dasar untuk melakukan integrasi dan koordinasi pengembangan, perencanaan, desain, serta konstruksi proyek bangunan**”[^37]. Namun, penerapan itu hanya mencakup sebagian kecil proyek yang ditangani Dacin.

Dua perusahaan asing memiliki keberadaan struktural di Taiwan. **Obayashi Taiwan Corporation** merupakan cabang yang didirikan perusahaan Jepang Obayashi Corporation—pembangun Tokyo Skytree—di Taiwan pada 1989. Perusahaan ini mengerjakan keseluruhan Taipei 101, Jalur Xinyi MRT Taipei, Terminal 3 Bandara Taoyuan, dan **Taipei Dome**, antara lain[^38]. **Halaman “Profil Perusahaan” situs Obayashi Taiwan secara eksplisit mencantumkan “pengelolaan gambar kerja dan penerapan BIM” sebagai kegiatan utama manajemen konstruksi**[^38].

> **💡 Tahukah Anda**
> Keseluruhan struktur baja Taipei Dome berbobot 65.000 ton dan merupakan satu-satunya stadion berkubah di dunia yang seluruh kubahnya dibangun menggunakan pipa baja bundar[^39]. Sebagian besar desain struktur baja dibuat di Tekla Structures, lalu modelnya diimpor ke Navisworks untuk mendeteksi benturan dengan disiplin lain seperti mekanikal-elektrikal dan proteksi kebakaran. **Tanpa BIM, proyek struktur baja sebesar Taipei Dome hampir mustahil diselesaikan tanpa kesalahan besar.** Itulah sebabnya Obayashi memasukkan BIM ke dalam daftar “kegiatan utama manajemen konstruksi” pada profil perusahaannya.

---

## Kekurangan Tenaga Kerja, Penuaan, dan Pekerja Migran: Mengapa Transformasi Digital Tidak Dapat Dihindari

Bayangkan suasana pagi di lokasi konstruksi biasa. Pukul setengah tujuh, para pekerja berdatangan. Lebih dari separuhnya adalah pekerja senior berusia di atas 40 tahun, yang dijuluki “setingkat kakek”.

**Statistik kematian akibat kecelakaan kerja Pemerintah Kota Taipei Baru menunjukkan bahwa dari lebih dari 100 kasus kematian, lebih dari 77% korbannya berusia di atas 40 tahun**[^40]. Angka ini telah lama menjadi pengetahuan umum di kalangan insinyur sipil profesional. Penuaan tenaga kerja industri konstruksi Taiwan sudah menjadi kenyataan, bukan sekadar tren yang sedang berlangsung.

Rendahnya angka kelahiran membuat kaum muda enggan memasuki industri konstruksi. Kondisi lokasi kerja yang berat, upah yang tidak kompetitif, dan tingkat kecelakaan tinggi—ketiganya bertumpuk dan terus meningkatkan tekanan perekrutan dalam industri konstruksi[^40]. Pada 2024, Kementerian Tenaga Kerja menyetujui kuota 15.000 pekerja migran untuk industri konstruksi. Pada awal 2026, kuota itu “**hampir seluruhnya dialokasikan**”[^41].

Inilah sebabnya transformasi digital menjadi sesuatu yang wajib dilakukan industri konstruksi.

**Permintaan untuk jabatan insinyur BIM tinggi. Gaji awal pekerja baru berkisar NT$35.000–45.000, dan di 1111 Job Bank terdapat 104 lowongan dengan gaji bulanan NT$50.000 atau lebih**[^42]. Namun, “banyak permintaan” tidak sama dengan “mampu bekerja”. “**Mempelajari BIM tidak selalu menghasilkan peningkatan gaji yang berarti sehingga kebanyakan orang memilih jalur belajar yang lebih ekonomis**”[^43]. Industri belum memiliki konsensus mengenai batas tertinggi karier insinyur BIM.

Masalah struktural yang lebih dalam adalah bahwa BIM menarik arsitek dari kategori profesi “**menggambar**” menuju kategori baru sebagai “**integrator sistem**”. Peningkatan alat hanyalah gejala permukaan.

Arsitek yang memakai AutoCAD menggambar sekumpulan garis dua dimensi. Denah, tampak, dan potongan berdiri sendiri-sendiri; mengubah denah tetapi lupa mengubah tampak merupakan kejadian sehari-hari. Insinyur yang memakai Revit/BIM membangun model informasi: di balik setiap garis terikat data material, spesifikasi, vendor, harga, urutan konstruksi, dan siklus pemeliharaan[^44]. Ketika denah diubah, tampak dan potongan tersinkronisasi secara otomatis.

Ketika arsitek senior memandang insinyur BIM muda lalu berkata, “Ini urusan generasi baru,” alasan sebenarnya sederhana: **profesi itu telah menjadi bidang pekerjaan yang berbeda dari profesi “arsitek” ketika mereka pertama kali memasuki industri**.

> **✦** “Model BIM sering berubah menjadi pekerjaan alih daya dan terputus dari proyek nyata; banyak pusat atau tim BIM pun dibubarkan”[^45]—itulah pengamatan Pusat Riset BIM Universitas Nasional Taiwan sendiri terhadap kondisi promosi BIM di Taiwan.

---

## Protokol Seperti USB-C: Kunci Anthropic untuk Menghubungkan AI dengan Revit

Pada 25 November 2024, Anthropic membuka sumber sebuah teknologi bernama **Model Context Protocol (MCP)**[^46].

Teks pengumumannya terdengar ilmiah: “**MCP adalah standar terbuka dan kerangka kerja sumber terbuka yang diperkenalkan Anthropic untuk menstandardisasi cara sistem kecerdasan buatan (AI), seperti model bahasa besar (LLM), berintegrasi dan berbagi data dengan alat, sistem, serta sumber data eksternal**”[^47]. Penjelasan Anthropic lebih sederhana: “**Bayangkan MCP seperti port USB-C untuk aplikasi AI**”[^46]. Sebagaimana USB-C menyeragamkan koneksi perangkat, MCP berupaya menyeragamkan protokol penghubung antara AI dan sumber data serta alat.

Bersamaan dengan pengumuman MCP, dirilis pula SDK Python, TypeScript, C#, dan Java, serta server MCP siap pakai yang terhubung dengan Google Drive, Slack, GitHub, Git, Postgres, dan Puppeteer[^46].

Apa yang terjadi setelahnya berlangsung dengan kecepatan yang tidak diperkirakan siapa pun.

Pada 10 Desember 2025, seorang pengembang bernama **CHIANG SHUOTAO** mengunggah repositori `REVIT_MCP_study` ke GitHub[^48]. Deskripsi repositorinya hanya terdiri atas delapan kata bahasa Inggris: “LEARN HOW TO BUILD UP YOUR REVIT MCP”. Distribusi bahasanya adalah **C# 54,2%, JavaScript 18,7%, PowerShell 14,3%, TypeScript 7,0%, HTML 3,3%, dan Shell 1,2%**[^48]. Hingga Mei 2026, repositori pribadi tersebut telah mengumpulkan **73 bintang dan 85 fork**[^6].

Lokasi pada profil GitHub Shuotao tertulis “Tokyo”, tetapi README dan seluruh materi pembelajarannya menggunakan aksara Mandarin Tradisional serta banyak merujuk alur kerja industri arsitektur Taiwan. Repositori lain miliknya—`CAD_MCP_study`, `NAVISWORK_MCP`, dan `IFCSH`—membentuk rangkaian eksperimen sumber terbuka pribadi BIM × MCP × AI[^49].

Bagaimana kasus ini harus dibaca?

Bukan sebagai “Taiwan memiliki BIM_MCP sendiri”. Repositori Shuotao merupakan bagian dari ekosistem yang sama dengan `mcp-servers-for-revit/revit-mcp` internasional dan server MCP bawaan Revit 2027 milik Autodesk[^7][^50]. Maknanya adalah bahwa **dalam waktu kurang dari 13 bulan setelah Anthropic mengumumkan MCP, seorang pengembang Taiwan menciptakan proyek pembelajaran sumber terbuka dengan lebih dari tujuh puluh bintang yang menghubungkan praktik rekayasa Revit MCP internasional kembali ke komunitas berbahasa Mandarin Tradisional**.

Empat bulan kemudian, **pada April 2026, Autodesk mengumumkan bahwa Revit 2027 dilengkapi server MCP dan Autodesk Assistant bawaan**[^7]. Autodesk Assistant yang baru dapat menjalankan perintah seperti: “**Temukan semua ruangan yang belum memiliki label mekanikal-elektrikal**”, “**Tetapkan tingkat ketahanan api semua pintu di Phase 2 menjadi 90 menit**”, dan “**Buat seluruh tampilan sistem perpipaan air bersih dan limbah untuk lantai ini**”[^7]—semuanya dengan bahasa alami untuk mengoperasikan Revit.

Hal-hal yang dahulu memerlukan satu atau dua tahun untuk dikuasai di Revit kini dapat dilakukan hanya dengan mengucapkan satu kalimat dalam bahasa Mandarin atau Inggris.

> **📝 Catatan kurator**
> Selaraskan garis waktunya: dari peresmian platform BIM Komisi Pekerjaan Umum pada 23 Mei 2014 hingga Anthropic membuka sumber MCP pada 25 November 2024, **terdapat selang 10 tahun 6 bulan**. Dalam sepuluh tahun Taiwan mendorong BIM, kebijakannya bergerak dari “mendorong uji coba” menuju “disesuaikan dengan setiap kasus”, tetapi tidak pernah sampai pada kewajiban. Dari pembukaan sumber MCP oleh Anthropic hingga pengumuman server MCP bawaan Autodesk Revit 2027, **hanya berlalu 17 bulan**. Kecepatan platform teknologi dalam menulis ulang proses masuk industri jauh melampaui kecepatan kebijakan. **Kesenjangan yang sebenarnya terletak pada struktur kedua model promosi tersebut.** Penerapan wajib memerlukan koordinasi ratusan pemangku kepentingan, penyeimbangan puluhan lobi industri, dan penyesuaian sejumlah undang-undang; promosi melalui platform hanya perlu membuka sumber SDK dan menulis dokumentasi dengan baik. Memahami struktur ini lebih penting daripada mengeluhkan pemerintah ataupun memuja AI.

---

## Dari Menggambar Menuju Integrasi Sistem: Pendefinisian Ulang Profesi yang Belum Selesai

Mari arahkan kembali kamera ke kantor arsitek pada 1990-an.

Saat itu, kantor dipenuhi meja gambar, penggaris T, pena teknis, dan mesin cetak biru. Arsitek menggambar denah di atas kertas A1 besar menggunakan pena teknis. Setelah selesai, gambar dibawa ke mesin untuk dibuatkan salinan cetak biru. Mesin berdengung, lalu kertas bergaris putih dengan latar biru perlahan keluar dari ujung lainnya. Satu perubahan mengharuskan seluruh gambar dibuat ulang.

AutoCAD merilis versi Classic Mac OS pada 1992 dan versi Microsoft Windows pada 1993[^51]. Sejak pertengahan 1990-an, kantor arsitek Taiwan mulai beralih ke CAD secara besar-besaran. Masa sulit transisi berlangsung sekitar sepuluh tahun: arsitek senior menolak, desainer muda menyambutnya, dan kantor terbelah antara kubu yang “menggambar dengan CAD” dan kubu yang “menggambar di atas meja”.

Peralihan dari AutoCAD ke Revit merupakan transformasi kedua. **Baru pada 2002 Autodesk memperkenalkan Revit bersama istilah “Building Information Modeling”**[^52]. Artinya, terdapat selang sekitar dua puluh tahun antara peralihan dari gambar tangan ke CAD dan peralihan dari CAD ke BIM. Namun, masa sulit transformasi BIM lebih dalam karena kali ini tuntutannya meningkat dari penggantian alat menjadi **restrukturisasi pola pikir**.

CAD mendigitalkan garis-garis Anda. BIM mengharuskan Anda menyistematisasi seluruh informasi bangunan. Sebuah dinding berubah menjadi objek data seperti “dinding partisi ruang kantor Zona A lantai dua; material: papan gipsum dua sisi 12 mm dengan rangka baja ringan 75 mm; ketahanan api satu jam; vendor XX; biaya YY; urutan konstruksi setelah pemasangan perpipaan mekanikal-elektrikal”. Dinding itu bukan lagi sekadar dua garis sejajar.

Integrasi lintas disiplin ikut berubah. Dalam alur tradisional, arsitek, insinyur struktur, dan insinyur mekanikal-elektrikal membuat gambar masing-masing. Ketiga set gambar baru ditumpangtindihkan di lokasi konstruksi, lalu konflik ditemukan: saluran udara menembus balok atau posisi pipa drainase bertabrakan dengan kolom struktur. Dalam alur BIM, gambar seluruh disiplin ditumpangtindihkan sejak tahap desain di dalam model tiga dimensi yang sama; pemeriksaan benturan dan peninjauan konflik diselesaikan di komputer[^32].

Frasa “**mengurangi konflik antarmuka desain**” muncul dalam laporan hasil setiap studi kasus BIM Taiwan[^14][^15]. Namun, perubahan profesi di balik frasa tersebut adalah penataan ulang struktur kekuasaan antara arsitek, insinyur struktur, insinyur mekanikal-elektrikal, dan kontraktor. **Dahulu arsitek merupakan pengarang tunggal pada tahap desain; pada era BIM, desain adalah integrasi sistem hasil kolaborasi banyak pihak.**

Pendefinisian ulang profesi ini belum selesai.

> **✦** “**Pemilik proyek kurang memahami penerapan BIM dan sering tetap bekerja dengan alur proyek tradisional sehingga membatasi efektivitas teknologi BIM**”[^53]—itulah pengamatan paling lugas BSI terhadap pihak pemilik proyek di Taiwan. Hambatan penerapan BIM berada di pihak pemilik; mampu atau tidaknya insinyur justru merupakan persoalan sekunder.

---

## Apa yang Terjadi Berikutnya

Pada Mei 2026, keadaan BIM di Taiwan adalah sebagai berikut:

- Pemerintah pusat telah mendorongnya selama 12 tahun, tetapi masih menerapkan pendekatan “disesuaikan dengan setiap kasus” tanpa kewajiban menyeluruh[^2]
- Taipei dan Taipei Baru telah mensyaratkan model BIM pada tingkat izin bangunan sejak 2018 dan 2014, tetapi aturan setiap kota berbeda[^4][^11]
- Konsultan rekayasa besar—CECI Engineering Consultants Taiwan, Sinotech, dan EGC—serta kontraktor besar—CTCI, Futsu, Dacin, dan Obayashi—semuanya menggunakan BIM, sementara permintaan jabatan insinyur BIM tinggi[^17][^19][^33][^42]
- Sebagian besar kantor arsitek kecil dan menengah masih mengandalkan AutoCAD; tingkat adopsi BIM diperkirakan hanya satu digit dalam persentase[^43][^45]
- Tujuh belas bulan setelah MCP Anthropic dibuka sumbernya pada November 2024, Autodesk mengumumkan server MCP bawaan Revit 2027[^7][^46]
- Seorang pengembang Taiwan menulis repositori pembelajaran Revit MCP dengan 73 bintang yang menghubungkan ekosistem internasional kembali ke komunitas berbahasa Mandarin Tradisional[^6][^48]

Jika keenam butir ini dirangkai, **BIM Taiwan adalah kisah tentang sebuah profesi yang sedang didefinisikan ulang dari luar oleh platform teknologi**, tetapi masih jauh dari bentuk industri yang matang. Kecepatan pemerintah tidak mampu mengejar iterasi teknologi; kecepatan adopsi sipil tidak mampu mengejar penuaan penduduk. Industri konstruksi Taiwan ditarik secara bersamaan oleh tiga kekuatan: praktisi tradisional yang menua, lokasi konstruksi yang kekurangan tenaga kerja, dan perangkat generasi baru AI × BIM.

Dalam sepuluh tahun ke depan, profesi “arsitek” di Taiwan mungkin tidak lagi menyerupai bentuknya sekarang. Bagian menggambar akan diserahkan kepada AI—cukup dengan satu kalimat, “**Tetapkan tingkat ketahanan api semua pintu di Phase 2 menjadi 90 menit**”[^7], seluruh pintu dalam proyek dapat diperbarui. Pekerjaan arsitek akan lebih menyerupai “**integrator sistem**”, “**penerjemah antara pemilik proyek dan teknologi**”, serta “**kurator kolaborasi banyak pihak**”.

Saat platform BIM Komisi Pekerjaan Umum mengadakan rapat pertamanya pada 23 Mei 2014, Stasiun Miaoli Kereta Cepat Taiwan belum dibangun. Pada hari Autodesk mengumumkan server MCP bawaan Revit 2027 pada April 2026, pabrik fab TSMC berikutnya di Kaohsiung telah dipersiapkan menggunakan gambar BIM sepenuhnya. Pendekatan “disesuaikan dengan setiap kasus” selama dua belas tahun telah tiba di tempat yang tidak pernah diperkirakannya sendiri: sebuah protokol yang dibuka sumbernya dari kantor Anthropic di California, Amerika Serikat, menulis ulang kurva masuk industri dari sisi platform dan memintas jalur utama kewajiban pemerintah.

Pada hari Shuotao mengunggah `REVIT_MCP_study` ke GitHub pada Desember 2025[^48], tepat 11 tahun 7 bulan telah berlalu sejak platform BIM Komisi Pekerjaan Umum diresmikan. Dalam dua belas tahun di antaranya, industri arsitektur Taiwan menempuh perjalanan panjang dari gambar tangan dan cetak biru menuju model 3D, dari percobaan individual menuju standar nasional, serta dari peningkatan alat menuju pendefinisian ulang profesi. **Perjalanan itu belum selesai—tetapi arah tahap berikutnya tidak lagi sepenuhnya berada di tangan pemerintah Taiwan.**

---

**Bacaan lanjutan**:

- [Arsitektur Taiwan](/id/art/taiwanese-architecture) — narasi budaya arsitektur dari rumah batu tulis hingga pencakar langit; artikel ini merupakan tulisan pendampingnya pada lapisan digitalisasi rekayasa
- [Perumahan Sosial dan Keadilan Hunian](/id/society/social-housing-and-housing-justice) — penerapan BIM dalam pengoperasian dan pemeliharaan perumahan sosial merupakan salah satu program utama ABRI dalam beberapa tahun terakhir
- [Perusahaan Taiwan: TSMC](/id/economy/tsmc) — penerapan BIM di fasilitas TSMC merupakan medan praktik utama bagi kontraktor seperti Dacin dan Futsu
- [Perkembangan AI Taiwan](/id/technology/ai-development-in-taiwan) — MCP Anthropic dan MCP bawaan Revit 2027 merupakan kasus nyata AI × industri
- [Industri Semikonduktor](/id/technology/taiwan-semiconductor-industry) — solusi terpadu rekayasa pabrik fab dan pembangunan pabrik cerdas berbasis BIM merupakan fondasi rekayasa bagi perluasan klaster semikonduktor

## Sumber Gambar

Artikel ini menggunakan tiga gambar berlisensi CC dari Wikimedia Commons. Seluruhnya disimpan dalam cache di `public/article-images/technology/` untuk menghindari hotlink ke server sumber:

- [FreeCAD 1.0 Dark BIM Example](https://commons.wikimedia.org/wiki/File:FreeCAD_1.0_Dark_BIM_Example.png) — Foto: Maxwxyz, 2024-10-07, CC BY 4.0 (gambar utama: representasi model 3D pada perangkat BIM sumber terbuka)
- [Demonstrasi objek Autodesk Revit 2024](https://commons.wikimedia.org/wiki/File:Revit_2024.png) — Foto: DanielDefault, 2024, CC BY-SA 4.0 (gambar dalam artikel: tampilan pemodelan berbasis objek Revit)
- [Taipei Dome and Hino 300 BEM-5593](https://commons.wikimedia.org/wiki/File:Taipei_Dome_and_Hino_300_BEM-5593_%2850281669428%29.jpg) — Foto: Cheng-en Cheng, 2020-08-16, CC BY-SA 2.0 (gambar dalam artikel: pembangunan struktur baja Taipei Dome seberat 65.000 ton)

Matriks lengkap lisensi media dicatat dalam tiga tabel pada § Matriks Lisensi Media di [`reports/research/2026-05/台灣BIM與營建科技.md`](../../reports/research/2026-05/台灣BIM與營建科技.md).

## Referensi

[^1]: [Komisi Pekerjaan Umum Yuan Eksekutif Republik Tiongkok (Taiwan): Bagian Penggunaan Pemodelan Informasi Bangunan (BIM) dalam Pekerjaan Umum](https://www.pcc.gov.tw/content/index?eid=1345&type=C) — Halaman resmi platform promosi BIM Komisi Pekerjaan Umum yang mencatat pendiriannya pada 23 Mei 2014 dan dokumen kebijakan resmi strategi tiga tahap: “mendorong proyek percontohan/pelaksanaan uji coba/mulai 2017 mempromosikan BIM untuk pekerjaan umum di atas nilai tertentu”.

[^2]: [Platform Partisipasi Daring Kebijakan Publik National Audit Office: Pengumpulan Pendapat tentang Strategi Promosi BIM Komisi Pekerjaan Umum](https://cy.join.gov.tw/policies/detail/8e95c8d6-ce87-4e05-afce-c46a33eb6f89) — Halaman diskusi terbuka National Audit Office yang mencatat prinsip “disesuaikan dengan setiap kasus dan diterapkan secara bertahap”, bukan kewajiban menyeluruh, serta statistik resmi lebih dari 60 instansi pengadaan dan lebih dari 120 tender yang menggunakan BIM.

[^3]: [Situs resmi Taiwan Building Information Modeling Association (TBIMA)](https://sites.google.com/view/tbima) — Situs organisasi yang terdaftar di Kementerian Dalam Negeri, mencatat asal-usul pertemuan pada 2009, persiapan sejak 2011, pendirian resmi pada 10 Maret 2012, serta latar belakang anggota utama dari komunitas instruktur pelatihan resmi Autodesk Taiwan pada 2008.

[^4]: [Departemen Pengembangan Perkotaan Pemerintah Kota Taipei: Pedoman Operasional Data Atribut Model As-Built BIM untuk Pekerjaan Bangunan v2.0](https://udd.gov.taipei/assets/50-10660/Documents/竣工模型屬性資料作業規範v2.0_20181109_new.pdf) — Pedoman resmi yang diumumkan Departemen Pengembangan Perkotaan Taipei pada 9 November 2018, mengacu pada format internasional COBie dan secara khusus mewajibkan ekspor data standar IFC.

[^5]: [BSI dan Pihak Pemerintah, Industri, Akademik, serta Riset Menandatangani Nota Kesepahaman “Taiwan BIM Task Group”](https://www.bsigroup.com/zh-TW/about-bsi/media-centre/press-release/2018-/october/bsitaiwan-bim-task-group/) — Siaran pers BSI Taiwan tentang penandatanganan nota kesepahaman pada 3 Oktober 2018, mencatat lima pihak penandatangan—BSI, NTUBIM Universitas Nasional Taiwan, Taiwan Construction Research Institute, Taiwan Architecture & Building Center, dan TBIMA—serta peran pembimbing ABRI.

[^6]: [Repositori GitHub shuotao/REVIT_MCP_study](https://github.com/shuotao/REVIT_MCP_study) — Proyek pembelajaran Revit MCP sumber terbuka pribadi oleh CHIANG SHUOTAO, didirikan pada Desember 2025 dan memperoleh 73 bintang serta 85 fork hingga Mei 2026, dengan distribusi bahasa C# 54,2%, JavaScript 18,7%, PowerShell 14,3%, dan lainnya.

[^7]: [Autodesk Developer Blog: Revit API Agents, MCP, Copilot and Codex](https://blog.autodesk.io/revit-api-agents-mcp-copilot-and-codex/) — Pengumuman resmi pengembang Autodesk pada April 2026 bahwa Revit 2027 dilengkapi server MCP dan Autodesk Assistant bawaan untuk mengoperasikan model Revit melalui bahasa alami.

[^8]: [ONC Lawyers: Adopsi BIM dalam Industri Konstruksi dan Implikasi Hukumnya](https://www.onc.hk/zh_HK/publication/adoption-of-bim-and-its-legal-complications-for-the-construction-industry) — Artikel firma hukum Hong Kong yang mencatat kebijakan Biro Pembangunan Hong Kong yang mewajibkan BIM untuk proyek dengan perkiraan biaya lebih dari HK$30 juta.

[^9]: [Institut Riset Arsitektur dan Bangunan Kementerian Dalam Negeri Republik Tiongkok (Taiwan): Program Promosi Penerapan BIM](https://www.abri.gov.tw/News_Content_Table.aspx?n=807&s=315634) — Halaman program resmi ABRI yang mencatat program jangka menengah empat tahun pada 2015 dan sasaran serta cakupan program tahap kedua pada 2019.

[^10]: [ABRI: Survei Hasil Pengembangan dan Penerapan BIM Taiwan serta Kajian Program Promosi](https://www.abri.gov.tw/News_Content_Table.aspx?n=807&s=39612) — Laporan riset pesanan ABRI yang mencatat dua sasaran tahap kedua—“peningkatan digital teknologi bangunan” dan “lingkungan hunian digital”—serta arah integrasi kota digital BIM × GIS × IoT.

[^11]: [Biro Pekerjaan Umum Pemerintah Kota Taipei Baru: Sistem Pemeriksaan Berbantuan Komputer untuk Izin Bangunan](https://www.bim.ntpc.gov.tw/) — Situs sistem pemeriksaan izin bangunan BIM Pemerintah Kota Taipei Baru yang mencatat izin bangunan berbasis model BIM pertama pada 2014, akumulasi lebih dari 20 model BIM selesai, dan “Pedoman Penyerahan Informasi Model As-Built BIM untuk Bangunan Publik Kota Taipei Baru”.

[^12]: [buildingSMART International: Industry Foundation Classes (IFC)](https://www.buildingsmart.org/standards/bsi-standards/industry-foundation-classes/) — Halaman standar IFC di situs buildingSMART International yang mencatat ISO 16739-1:2024 dan penerapan internasional, termasuk kewajiban IFC untuk pembangunan publik Denmark sejak 2010.

[^13]: [ABRI: Laporan Hasil Program Promosi Penerapan BIM 2023](https://ws.moi.gov.tw/001/Upload/404/relfile/9489/315634/0cccc6e2-2dc6-496f-a45f-69b60e2811b1.pdf) — Laporan hasil ABRI 2023 yang secara resmi mengakui bahwa sebagian besar penggunaan BIM sektor publik terbatas pada tahap desain dan konstruksi, sedangkan pengelolaan operasi masih memakai cara tradisional.

[^14]: [Departemen Sistem Angkutan Cepat Pemerintah Kota Taipei Baru: Penerapan BIM pada Jalur Wanda MRT](https://www.dorts.ntpc.gov.tw/documentary/articleInfo/P9z2zp0nZrDp?page=216) — Dokumentasi resmi yang menyatakan Jalur Wanda MRT Taipei sebagai “pekerjaan umum pertama yang memasukkan BIM ke dalam kontrak” dan mencatat pengurangan konflik antarmuka desain.

[^15]: [Flow BIM Service: Studi Kasus Kantor Cerdas](https://bim.flow.tw/smartoffice-globalshowcase/) — Studi kasus konsultan BIM yang mengutip data penerapan BIM di Stasiun Miaoli Kereta Cepat Taiwan: “menghemat 20% biaya perubahan desain dan memulai pekerjaan dua bulan lebih awal”.

[^16]: [Liberty Times Finance: Kontrak Terminal 3 Bandara Taoyuan Diberikan kepada Tim Samsung C&T dan RSEA Engineering Senilai NT$44,5 Miliar](https://ec.ltn.com.tw/article/breakingnews/3414669) — Laporan Maret 2021 yang mencatat pemberian kontrak pekerjaan sipil gedung utama T3 dan rincian tim Samsung C&T serta RSEA Engineering.

[^17]: [iThome: Industri Konstruksi Mewujudkan Kembaran Digital Bangunan dengan BIM—Kasus CECI Engineering Consultants Taiwan](https://www.ithome.com.tw/people/137308) — Laporan mendalam iThome pada 2021 yang mewawancarai chief engineer Lin Yao-tsang dan mencatat kasus BIM sepanjang siklus hidup, seperti Stasiun Fengshan dan Terowongan Baguashan, serta alur kolaborasi BIM lintas negara Terminal 3 Bandara Taoyuan.

[^18]: [China Engineering Consultants, Inc. (CECI): Kronologi 50 Peristiwa Klasik](https://www.ceci.org.tw/modules/article-content.aspx?s=13&i=226) — Kronologi ulang tahun ke-50 CECI yang mencatat pendiriannya pada 1969 dan investasi untuk mendirikan CECI Engineering Consultants Taiwan pada 2007.

[^19]: [CECI Engineering Consultants Taiwan, Inc.: Profil Perusahaan](https://www.104.com.tw/company/d1w3jw0) — Halaman rekrutmen perusahaan yang mencatat hampir 2.000 pegawai, 90% dengan latar belakang jalan raya, perkeretaapian, bandara, jembatan, BIM, ITS, PPP, dan bidang terkait, serta pembentukan Pusat Integrasi BIM pada 2010.

[^20]: [Sinotech Engineering Consultants Foundation: Menuju Ulang Tahun Ke-50 Sinotech](https://50th-anniversary.sinotech.org.tw/about_ltd.html) — Situs ulang tahun ke-50 Sinotech yang mencatat pendiriannya pada 1970, transformasi menjadi organisasi nirlaba pada 1994, dan investasi untuk mendirikan Sinotech Engineering Consultants, Ltd.

[^21]: [Autodesk University: Desain dan Penerapan Platform Kolaborasi BIM Sinotech](https://www.autodesk.com/autodesk-university/class/zhongxinggongchengBIMxietongzuoyepingtaizhishejiyuyingyong-2020) — Presentasi teknis 2020 yang mencatat arsitektur modul pelacakan isu BIM dan tujuh modul utama PMIS Sinotech berdasarkan lingkungan CDE ISO 19650.

[^22]: [Situs Evergreen Consulting Engineering, Inc. (EGC)](https://www.egc.com.tw/) — Situs resmi EGC yang mencatat pendiriannya pada 1974, lebih dari 80 tenaga profesional, desain struktur Taipei 101 dan T&C Tower 85 lantai di Kaohsiung, serta status sebagai salah satu dari sepuluh konsultan struktur bangunan tinggi terkemuka versi CTBUH.

[^23]: [Pusat Riset BIM Universitas Nasional Taiwan: Perkembangan BIM Mengguncang Sistem Arsitektur yang Berlaku (Kuo Jung-chin, Desember 2011)](https://www.ntubim.net/bim2356027396/bim-201112) — Salah satu karya awal penting dalam diskursus akademik BIM Taiwan yang diterbitkan Profesor Madya Kuo Jung-chin pada 2011.

[^24]: [BSI: Taiwan BIM Task Group Menerbitkan “ISO 19650 Edisi Bahasa Mandarin Tradisional” untuk Mendukung Digitalisasi Industri Konstruksi](https://www.bsigroup.com/zh-TW/about-bsi/media-centre/press-release/2019/20197/iso-19650-tw-standard-launch/) — Siaran pers BSI 2019 yang mencatat penerbitan ISO 19650 edisi bahasa Mandarin Tradisional, supervisi Direktur ABRI Wang Jung-chin, dan bantuan penerjemahan NTUBIM Universitas Nasional Taiwan.

[^25]: [BIM-API: PyRevit + Dynamo Scripts](https://www.bim-api.com/en/blog/pyrevit-dynamo-scripts/) — Artikel blog yang mencatat pengamatan industri bahwa “di Taiwan, 90% arsitek yang memiliki kemampuan desain BIM menggunakan Revit Architecture”.

[^26]: [Situs Distributor Graphisoft Archicad Lung Ting Information Technology](https://www.academicd.com/) — Situs distributor Graphisoft Taiwan yang mencatat dukungan penjualan dan pelatihan ArchiCAD di Taiwan serta posisinya sebagai “perangkat lunak BIM yang lebih ramah daripada Revit”.

[^27]: [BIM Explorer: Berbagi Pengalaman Menggunakan Tekla Structures](https://tpuaup.blogspot.com/2013/05/tekla-structures.html) — Artikel blog BIM yang mencatat Tekla Structures sebagai perangkat lunak utama desain struktur baja Taiwan dan penggunaannya untuk struktur kompleks seperti stadion, jembatan, dan pabrik.

[^28]: [Otsuka Information Technology: Desain Infrastruktur MicroStation](https://www.oitc.com.tw/products-detail/MicroStation/79) — Situs distributor Bentley MicroStation di Taiwan yang mencatat penerapannya pada pekerjaan perkeretaapian, jalan raya, terowongan, dan jembatan.

[^29]: [BIM+ Studio Taiwan Architecture & Building Center: Kursus Dasar Arsitektur Dynamo](https://bimstudio.tabc.org.tw/blogs/bim%E7%9F%A5%E8%AD%98%E5%BA%AB/49627) — Pengantar kursus yang mencatat saat Autodesk Taiwan mendatangkan instruktur tim pengembang Dynamo dari Singapura untuk mengajar di Taiwan pada awal 2016.

[^30]: [WeBIM Services: Bagaimana Dynamo Mengubah Dunia Revit](https://webim.com.tw/en/tech-en/dynamo-application-webim-3/) — Artikel teknis yang mencatat penerapan konkret Dynamo di komunitas insinyur BIM Taiwan, termasuk pengurutan koordinat saluran udara, pemeriksaan ruang bebas vertikal, dan pembuatan gambar potongan otomatis.

[^31]: [Ikhtisar Produk Autodesk Navisworks](https://www.quickly.com.tw/autodesk/navisworks.php) — Situs distributor Autodesk Taiwan yang mencatat fungsi lengkap Navisworks Manage: navigasi 3D, deteksi benturan, ekspor laporan, simulasi jadwal 4D, dan estimasi biaya 5D.

[^32]: [airitiLibrary: Pengembangan dan Penerapan Otomasi Desain CSD/SEM MRT Berbantuan BIM](https://www.airitilibrary.com/Article/Detail/0257554X-202107-202107290004-202107290004-77-85) — Artikel jurnal akademik yang mencatat metodologi integrasi BIM untuk CSD (Combined Service Drawing) dan SEM (Structure/Electric/Mechanic) dalam pekerjaan mekanikal-elektrikal MRT Taiwan.

[^33]: [CTCI Group—Wikipedia](https://zh.wikipedia.org/zh-tw/%E4%B8%AD%E9%BC%8E%E9%9B%86%E5%9C%98) — Artikel Wikipedia yang mencatat pendirian CTCI pada 1979 melalui investasi bersama CTCI Foundation, China Development Industrial Bank, dan Central Investment Company; Chiyoda menjadi pemegang saham terbesar pada 2011; jumlah 7.500 pegawai pada 2021; serta proyek EPC besar Amine, Saudi Kayan, dan SAMAC MMA di Arab Saudi.

[^34]: [Situs Resmi CTCI Group](https://www.ctci.com/www/ctci2022/page.aspx?L=CH) — Situs resmi CTCI yang mencatat bisnis EPC dan cakupan cabang atau kantor di 15 negara.

[^35]: [Crossing: Krisis Piutang Tak Tertagih CTCI di Luar Negeri dan “Kesenjangan Fatal” Manajemen Risiko Internasional Kontraktor EPC Taiwan](https://crossing.cw.com.tw/article/19832) — Laporan mendalam yang mencatat keterlambatan besar dan piutang tak tertagih pada proyek EPC pabrik pengolahan gas CTCI di India pada 2017.

[^36]: [Futsu Construction Co., Ltd.: Rekam Jejak Pabrik Teknologi Tinggi](https://www.futsu.com.tw/p_hitech.html) — Halaman resmi Futsu yang mencatat pernyataan “akumulasi luas lantai bruto pabrik teknologi tinggi terbanyak dan pengalaman pembangunan pabrik terbesar di dalam negeri”.

[^37]: [Dacin Construction: Pengalaman BIM](https://www.dacin.com.tw/bim/) — Halaman BIM resmi Dacin yang mencatat pernyataan “menggunakan BIM sebagai platform alat dasar untuk melakukan integrasi dan koordinasi pengembangan, perencanaan, desain, serta konstruksi proyek bangunan”.

[^38]: [Obayashi Taiwan: Profil Perusahaan](https://www.obayashi.com.tw/topic/about/preview/3250113421819124234) — Situs resmi Obayashi Taiwan Corporation yang mencatat pendiriannya pada 1989, perusahaan induk Obayashi Corporation—pembangun Tokyo Skytree—serta “pengelolaan gambar kerja dan penerapan BIM” sebagai kegiatan utama manajemen konstruksi.

[^39]: [Taipei Dome—Wikipedia](https://zh.wikipedia.org/zh-tw/%E8%87%BA%E5%8C%97%E5%A4%A7%E5%B7%A8%E8%9B%8B) — Artikel Wikipedia yang mencatat luas lantai bruto 120.000 meter persegi, berat struktur baja 65.000 ton, dan statusnya sebagai satu-satunya stadion berkubah di dunia yang seluruh kubahnya dibangun dengan pipa baja bundar.

[^40]: [United Daily News: Pekerja Setingkat Kakek Menopang Lapangan, Keahlian Industri Konstruksi Menghadapi Kesenjangan Generasi](https://udn.com/news/story/124689/9220106) — Laporan investigatif yang mencatat bahwa 77% dari lebih dari 100 korban meninggal akibat kecelakaan kerja di Taipei Baru berusia di atas 40 tahun.

[^41]: [Liberty Times: Taiwan Kekurangan Tenaga Kerja—Kuota 15.000 Pekerja Migran Konstruksi Hampir Habis](https://estate.ltn.com.tw/article/21452) — Laporan ekonomi yang mencatat kuota 15.000 pekerja migran untuk industri konstruksi yang dibuka Kementerian Tenaga Kerja pada 2024–2026 dan hampir seluruhnya telah dialokasikan.

[^42]: [1111 Job Bank: Hasil Pencarian Lowongan Insinyur BIM dengan Gaji Bulanan NT$50.000 atau Lebih](https://www.1111.com.tw/search/job?page=1&col=ab&sort=desc&ks=bim,%E7%B9%AA%E5%9C%96&st=1&sa0=50000*) — Halaman pencarian lowongan yang mencatat 104 jabatan bergaji bulanan NT$50.000 atau lebih serta gaji awal insinyur BIM baru sebesar NT$35.000–45.000.

[^43]: [Mengapa BIM Sulit Diterapkan di Taiwan? Empat Tahap yang Mengungkap Kenyataan dan Peluang](https://engineeringlifetw.com/whynotbim/) — Analisis mendalam yang mencatat hambatan budaya promosi BIM di Taiwan: pengendalian bangunan pemerintah dan alur industri yang dibangun berdasarkan CAD, model BIM yang berubah menjadi pekerjaan alih daya, serta pembubaran banyak pusat atau tim BIM.

[^44]: [Verakey: Apa Itu BIM? Analisis Lengkap Lima Keunggulan BIM](https://veracityconsultant.com.tw/what-is-bim/) — Situs konsultan BIM yang menjelaskan hakikat transformasi digital rekayasa BIM dalam menyistematisasi informasi bangunan—material, spesifikasi, vendor, harga, urutan konstruksi, dan siklus pemeliharaan.

[^45]: [Institut Riset Arsitektur dan Bangunan Kementerian Dalam Negeri Republik Tiongkok (Taiwan): Program Promosi Penerapan BIM](https://www.abri.gov.tw/News_Content_Table.aspx?n=807&s=39506) — Halaman program ABRI yang mencatat diagnosis mandiri kondisi BIM Taiwan: model BIM menjadi pekerjaan alih daya, terputus dari pekerjaan nyata, dan banyak pusat atau tim BIM dibubarkan.

[^46]: [Anthropic: Introducing the Model Context Protocol](https://www.anthropic.com/news/model-context-protocol) — Pengumuman resmi Anthropic pada 25 November 2024 tentang pembukaan sumber Model Context Protocol (MCP), termasuk penjelasan “Think of MCP like a USB-C port for AI applications” dan peluncuran SDK Python, TypeScript, C#, serta Java.

[^47]: [Wikipedia: Model Context Protocol](https://en.wikipedia.org/wiki/Model_Context_Protocol) — Artikel Wikipedia berbahasa Inggris yang mencatat pembukaan sumber MCP oleh Anthropic pada 25 November 2024 dan penyerahannya kepada Agentic AI Foundation di bawah Linux Foundation pada Desember 2025.

[^48]: [Profil GitHub shuotao](https://github.com/shuotao) — Profil GitHub CHIANG SHUOTAO yang mencatat lokasi “Tokyo” dan rangkaian repositori eksperimen sumber terbuka BIM × MCP × AI, termasuk CAD_MCP_study, NAVISWORK_MCP, dan IFCSH.

[^49]: [Repositori GitHub shuotao/CAD_MCP_study](https://github.com/shuotao/CAD_MCP_study) — Proyek pembelajaran sumber terbuka CAD × MCP milik Shuotao, bagian dari rangkaian eksperimen pribadi BIM × MCP × AI bersama REVIT_MCP_study dan NAVISWORK_MCP.

[^50]: [Architosh: Autodesk Revit 2027—Big New AI and Graphics Changes](https://architosh.com/2026/04/autodesk-revit-2027-big-new-ai-and-graphics-changes/) — Laporan media profesional perangkat lunak arsitektur pada April 2026 yang merinci fungsi serta arsitektur server MCP dan Autodesk Assistant bawaan Revit 2027.

[^51]: [AutoCAD—Wikipedia](https://en.wikipedia.org/wiki/AutoCAD) — Artikel Wikipedia berbahasa Inggris yang mencatat peluncuran awal AutoCAD pada Desember 1982 untuk platform CP/M dan IBM PC, versi Classic Mac OS pada 1992, serta versi Microsoft Windows pada 1993.

[^52]: [Pemodelan Informasi Bangunan—Wikipedia](https://zh.wikipedia.org/zh-tw/%E5%BB%BA%E7%AF%89%E4%BF%A1%E6%81%AF%E6%A8%A1%E5%9E%8B) — Artikel BIM berbahasa Mandarin Tradisional yang mencatat pengajuan konsep BIM pertama pada 1975, riset akademisi Finlandia dan Amerika Serikat pada 1980-an, serta pengenalan istilah “Building Information Modeling” oleh Autodesk pada 2002.

[^53]: [BSI Taiwan: Nilai Bisnis Pemodelan Informasi Bangunan (BIM)](https://www.bsigroup.com/zh-TW/insights-and-media/insights/blogs/business-value-of-building-information-modelling-bim/) — Blog resmi BSI Taiwan yang mencatat pengamatan struktural terhadap pihak pemilik proyek: “pemilik kurang memahami penerapan BIM dan sering memakai alur proyek tradisional sehingga efektivitas teknologi BIM dibatasi”.
