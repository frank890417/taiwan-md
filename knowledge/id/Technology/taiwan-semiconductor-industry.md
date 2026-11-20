---
title: 'Industri Semikonduktor: Dari Transfer Teknologi RCA ke Nitida Gallium dan Pengemasan Kuantum dalam Revolusi Material 50 Tahun'
description: 'Gunung suci pelindung negara Taiwan mendominasi proses mutakhir global berkat jasa foundry-nya, namun nitida gallium di dalam charger cepat, CoWoS di bawah chip AI, dan pendingin pengencer di atas qubit — medan perang ilmu material untuk 50 tahun ke depan baru saja dibuka.'
date: 2026-03-17
category: 'Technology'
tags:
  [
    'semikonduktor',
    'TSMC',
    'TSMC',
    'nitida gallium',
    'pengemasan 3D',
    'CoWoS',
    'komputer kuantum',
    'proses mutakhir',
    'perisai silikon',
    'ilmu material',
  ]
subcategory: '半導體與硬體'
author: 'Taiwan.md'
featured: true
lastVerified: 2026-05-19
lastHumanReview: true
difficulty: 'intermediate'
readingTime: 22
image: '/article-images/technology/silicon-vs-gan-charger-2025.webp'
imageCredit: '4300streetcar'
imageLicense: 'CC BY 4.0'
imageSource: 'https://commons.wikimedia.org/wiki/File:Silicon_vs_GaN_30W_USB-C_chargers.jpg'
sporeLinks:
  - id: 87
    platform: 'threads'
    date: '2026-05-25'
    url: 'https://www.threads.com/@taiwandotmd/post/DYvqEURgXm-'
  - id: 88
    platform: 'x'
    date: '2026-05-25'
    url: 'https://x.com/taiwandotmd/status/2058735515021783190'
translatedFrom: 'Technology/半導體產業.md'
sourceCommitSha: 'f024e87e7a'
sourceContentHash: 'sha256:a50aa44ff04babb9'
sourceBodyHash: 'sha256:729d7ab175048563'
translatedAt: '2026-11-20T09:53:27.181078+00:00'
---

# Industri Semikonduktor: Dari Transfer Teknologi RCA ke Nitrogen Galium dan Kemasan Kuantum dalam 50 Tahun Revolusi Material

![Dua kepala pengisi cepat USB-C 30W daya sama berdampingan, kiri produk bahan silikon ukurannya jelas lebih besar, kanan produk nitrogen galium mengecil hampir setengah, mencerminkan bagaimana ilmu material memadatkan kepadatan energi ke dalam genggaman tangan](/article-images/technology/silicon-vs-gan-charger-2025.webp)
_Perbandingan volume kepala pengisi USB-C daya sama Si vs GaN. Foto: 4300streetcar, 2025-12-25. [Lisensi via Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Silicon_vs_GaN_30W_USB-C_chargers.jpg)._

> **Ringkasan 30 Detik:** TSMC kuartal keempat 2025 di Kaohsiung Fab 22 memulai produksi massal 2 nanometer, mengungguli dunia 2-3 generasi[^2]. Tapi ceritanya tidak hanya terjadi di transistor yang semakin kecil: kepala pengisi cepat di tasmu berisi nitrogen galium (GaN), GlobalWafers di Zhongli memproduksi wafer karbida silikon (SiC) 8 inci, GPU Blackwell NVIDIA sepenuhnya bergantung pada kemasan CoWoS TSMC untuk dikirim ke pusat data. Dari 1973 ITRI mengeluarkan 4,5 juta dolar AS untuk membeli teknologi dari RCA[^5], hingga 2026 Akademi Sinica chip kuantum superkonduktor 20 qubit tersambung ke internet[^6], Taiwan telah melewati sungai panjang ilmu material dari fisika bandgap ke deposisi lapisan atom ke qubit topologis. Gunung Penjaga Negara bergantung pada pengalaman industri era 1950-an, tapi posisi foundry era kuantum, Taiwan belum meraihnya.

Suatu sore tahun 1985, Menteri Tanpa Portfolio Li Guoding di Yuan Administratif menemui Chang Chung-mou yang baru kembali ke Taiwan menjabat Direktur ITRI. Li Guoding langsung ke pokok: «Kami ingin mendirikan perusahaan manufaktur sirkuit terintegrasi skala sangat besar, kau pimpin.»

Chang Chung-mou tersentak: dia kira hanya datang jadi direktur, hasilnya dua minggu kemudian diseret mendirikan perusahaan dengan model bisnis yang belum pernah dicoba orang.

Percakapan itu mengubah dunia, tapi 40 tahun kemudian menengok kembali, «dunia» jauh lebih tebal dari yang dibayangkan sore itu. Ia mencakup kepala pengisi cepat 65 watt berukuran dua ruas jari di samping HP-mu, mencakup setiap GPU Blackwell yang dimakan NVIDIA di pusat data, juga mencakup qubit di laboratorium Akademi Sinica yang harus didinginkan mendekati nol absolut baru bangun.

## Taruhan Jasa Fabrikasi 1987 Itu

![Tampilan eksterior pabrik TSMC Fab 5 di Taman Sains Hsinchu, bangunan industri berlapis yang terhubung dengan Jalan Guangfu, salah satu pabrik representatif dari masa ekspansi TSMC pada 1990-an](/article-images/technology/tsmc-fab5-hsinchu-2010.webp)
_Pabrik TSMC Fab 5 di Taman Sains Hsinchu, 2010. Foto: Peellden. [Lisensi via Wikimedia Commons](https://commons.wikimedia.org/wiki/File:TSMC_Fab5.JPG)._

Cerita harus dimulai dari lebih awal: pada 1973, ITRI menghabiskan 4,5 juta dolar AS untuk membeli teknologi sirkuit terpadu dari perusahaan RCA Amerika Serikat, dan mengirim 19 insinyur ke AS untuk pelatihan[^5]. Saat itu tidak ada yang menyangka, biaya "sekolah" ini akan menjadi batu angkur pertama kerajaan semikonduktor Taiwan. Pada 1980, ITRI mentransfer teknologi untuk mendirikan United Microelectronics Corporation (UMC), dan Taiwan memiliki perusahaan semikonduktor pertamanya. Namun Li Guoding tidak puas: skala UMC terlalu kecil, teknologinya tidak bisa mengejar standar internasional, Taiwan butuh terobosan lebih besar.

Pada 21 Februari 1987, Morris Chang mendirikan Taiwan Semiconductor Manufacturing Company (TSMC) di Taman Sains Hsinchu, menciptakan model bisnis yang belum pernah ada sebelumnya: **pure-play foundry** (jasa fabrikasi murni).

Ide ini pada saat itu terdengar gila: semua perusahaan semikonduktor di dunia terintegrasi vertikal, dari desain hingga manufaktur dalam satu rangkaian, bagaimana mungkin hanya bergerak di manufaktur tanpa desain? Pelanggan akan menyerahkan desain paling rahasia mereka kepadamu?

Logika Morris Chang sederhana: industri semikonduktor semakin kompleks, desain dan manufaktur adalah dua keahlian yang sama sekali berbeda. Daripada melakukan segalanya tapi tidak ada yang mahir, lebih baik fokus mengerjakan satu hal dengan baik, membuat manufaktur chip menjadi yang terbaik di dunia.

Struktur kepemilikan saham awal TSMC cukup cerdik: pemerintah berinvestasi 48,3%, swasta 24,2%, dan Philips Belanda memegang 27,6%[^1]. Partisipasi Philips adalah kunci. Saat itu industri semikonduktor dikuasai oleh AS dan Jepang, Eropa sangat membutuhkan pemasok alternatif. Philips tidak hanya berinvestasi, tetapi juga menyerahkan pesanan chip mereka kepada TSMC, menjadi pelanggan penting pertama.

Model foundry memicu pembagian kerja besar dalam industri semikonduktor: perusahaan desain IC fokus mendesain chip (Qualcomm, NVIDIA, MediaTek), foundry fokus manufaktur (TSMC, UMC, GlobalFoundries), pabrik kemasan dan pengujian menangani proses akhir (ASE, SPIL). Dulu hanya raksasa seperti Intel, IBM yang mampu membiayai investasi astronomis pabrik wafer, kini setiap startup dengan ide bagus bisa mendesain chip, lalu menyerahkannya ke TSMC untuk diproduksi.

Ini model foundry adalah kepercayaan: pelanggan harus percaya TSMC tidak akan mencuri desain mereka, tidak akan membocorkan rahasia bisnis, dan tidak akan bersaing dengan mereka. TSMC menetapkan seperangkat "aturan kepercayaan" empat prinsip: netralitas teknis (tidak pernah mendesain chip sendiri), kesetaraan pelanggan (semua pelanggan menikmati teknologi dan layanan yang sama), perjanjian kerahasiaan tingkat tertinggi, alokasi kapasitas yang adil. Aturan ini diterapkan hampir 40 tahun, tidak pernah ada pengecualian.

> 📝 **Catatan Kurator**: Pada 1987, di Taiwan, 19 insinyur yang dikirim ITRI ke RCA baru berusia awal 40-an. Mereka belajar proses silikon Amerika 1960-an, saat itu tak ada yang menduga mereka akan menjadi klien utama (pihak pemesan) teknologi kemasan terdepan dunia 30 tahun kemudian. Sementara ketentuan TSMC yang memutuskan untuk tidak mendesain chip sendiri — "pembiusan diri" sukarela ini — justru menjadi ikatan yang membuat Jensen Huang, Tim Cook, dan Lisa Su tak bisa lepas. Keagungan model foundry tidak terletak pada apa yang ia lakukan, melainkan pada apa yang ia **pilih untuk tidak dilakukan**. Menelusuri ke asalnya lebih jauh: 1947 Bell Labs menemukan transistor, 1958 Texas Instruments dan Fairchild masing-masing menciptakan sirkuit terpadu, 1949 pemerintah nasionalis pindah ke Taiwan membawa sekelompok teknokrat berlatarkan sains dan teknik (nanti menjadi tulang punggung ITRI) — uang 4,5 juta dolar RCA itu adalah tongkat estafet, bukan titik start.

## Burn J. Lin dan ASML: Taruhan Dua Pemain Kecil dalam Litografi Tenggelam

Foundry bukan urusan TSMC saja, pembaca [@malathrone_21k_running](https://www.threads.com/@malathrone_21k_running) menambahkan garis sejarah kunci ini di kolom komentar: perusahaan yang memiliki akar Philips yang sama dengan TSMC adalah ASML——perusahaan mesin litografi yang terpisah dari Philips Belanda pada 1984, hari ini menjadi satu-satunya penyedia mesin EUV (extreme ultraviolet) di dunia. Tiga puluh tahun lalu, kedua perusahaan ini sama-sama adalah pemain kecil yang tidak dihiraukan oleh raksasa industri[^asml-philips].

Kunci cerita ini adalah seorang insinyur Taiwan bernama Burn J. Lin. Ia mulai bekerja di IBM Watson Research Center pada 1992 di bidang teknologi litografi, dan pada 2000 kembali ke Taiwan bergabung dengan TSMC sebagai direktur R&D[^lin-bio]. Pada era itu, perdebatan rute teknologi generasi berikutnya untuk mesin litografi adalah DUV (deep ultraviolet) 157 nanometer, Nikon dan Intel memasang taruhan pada jalur ini, tetapi 157nm mengalami masalah beruntun: lensa kalsium fluorida memiliki masalah bias ganda, lapisan tipis menyerap panjang gelombang ini terlalu kuat, dan integrasi proses sulit[^157nm-fail].

Burn J. Lin pada 2002 mengajukan ide gila di konferensi optik SPIE: "Pertahankan sumber cahaya 193 nanometer, tetapi isi air antara lensa dan wafer." Indeks bias air adalah 1,44, cahaya 193 nanometer dalam air setara dengan resolusi sekitar 134 nanometer—lebih halus dari 157nm, dan tidak perlu mengganti sumber cahaya maupun lensa[^immersion-litho].

Nikon tidak percaya, terus memasang taruhan pada 157nm. ASML bersedia bertaruh—ia sendiri juga adalah pemain kecil, seperti TSMC mencari tumpuan fisika untuk membalikkan keadaan. Pada 2003 ASML mulai mengembangkan mesin litografi tenggelam 193nm (193i), pada 2007 memulai produksi massal terlebih dahulu, mendukung dari proses 65 nanometer hingga **enam generasi** hingga pewaris EUV hari ini[^immersion-litho][^cw-lin-interview].

"Nikon karena takut panas tidak berani membuat immersion, jadi ASML dan kami terpaksa mengembangkannya sendiri", jalur teknologi ini mendorong Nikon dari takhta mesin litografi[^cw-lin-interview]. Tiga puluh tahun lalu, dua pemain kecil masing-masing memasang satu taruhan, hari ini satu adalah satu-satunya pabrik mesin EUV di dunia, yang lain adalah satu-satunya foundry 2 nanometer di dunia. Dua benih yang ditaburkan Philips Belanda berdiri berdampingan di abad ke-21.

## 50 Tahun Genealogi Material: Dari Silikon ke Nitida Galium ke Superkonduktor Topologis

Memahami medan perang semikonduktor 2025, harus memahami terlebih dahulu satu garis fisika yang belum pernah dijelaskan dengan jelas.

Silikon (Si) adalah titik awal garis ini: "celah energinya" (bandgap) adalah 1,1 elektronvolt (eV), ini adalah tiket masuk energi minimum bagi elektron untuk melompat dari pita konduksi ke pita valensi. Celah energi kecil, chip mudah dibuat, tapi ada dua batas atas: tegangan tinggi akan menyebabkan breakdown, frekuensi tinggi akan menghasilkan panas. PanSci menjelaskan batas ini dengan sangat jelas: "Batas frekuensi kerja semikonduktor berbasis silikon hanya di bawah 100k, jika melebihi 100k, efisiensi konversi akan turun drastis, bahkan ada masalah pemborosan energi yang serius."[^7]

Nitida galium (GaN) memiliki celah energi 3,4 eV, 3 kali lipat silikon. Batas tegangan breakdown-nya 10 kali lipat silikon. Frekuensi kerja bisa ditarik sampai 1000K, lebih tinggi satu tingkat orde magnitude penuh dibanding silikon[^7]. Angka fisik ini diterjemahkan ke kehidupan nyata: dengan daya yang sama, kumparan induktor transformator nitida galium bisa jauh lebih kecil, kebutuhan pendinginannya juga jauh lebih rendah, sehingga lahirnya charger cepat berukuran telapak tangan.

Karbida silikon (SiC) mengambil jalur lain: ia juga wide-bandgap (celah energi 3,26 eV), tapi lebih tahan suhu tinggi dan tegangan tinggi. PanSci langsung menunjuk medan pertarungannya: "Karbida silikon memiliki stabilitas yang baik di suhu tinggi dan tegangan tinggi, apalagi dengan meningkatnya kebutuhan fast-charging kendaraan listrik di masa depan, kebutuhan pengisian daya di atas 1000 volt akan membuat semikonduktor silikon yang hanya tahan 600 volt tidak mampu menanggungnya, diprediksi akan mengambil alih komponen kunci dalam kendaraan listrik."[^7]

> 💡 **Tahukah Anda**: "Celah energi" semikonduktor menentukan seberapa tinggi tegangan yang bisa ditanggung, seberapa cepat frekuensi yang bisa dijalankan, dan seberapa banyak panas yang dihasilkan. Silikon 1,1 eV adalah dasar elektronik konsumen 50 tahun terakhir; nitida galium 3,4 eV menopang fast-charging ponsel 240 watt; karbida silikon 3,26 eV masuk ke inverter kendaraan listrik 800 volt; stasiun berikutnya mungkin semikonduktor berlian 5,5 eV. Seluruh genealogi material hanyalah tangga "memanjat kepadatan energi", Taiwan setiap naik satu tangga harus bernegosiasi harga dengan batas fisika ilmu material.

Stasiun berikutnya belum bernama: bisa jadi berlian (C, celah energi 5,5 eV), oksida galium (Ga₂O₃, 4,8 eV), atau memasuki mekanisme fisika yang sama sekali berbeda, misalnya superkonduktor topologis (topological superconductor), ini adalah jalur yang ditempuh prosesor kuantum Majorana 1 Microsoft yang diumumkan Februari 2025[^15]. Fisika berubah, seluruh rantai industri akan ikut ditulis ulang.

## Nitida Galium di Dalam Pengisi Cepatmu

Tarik lensa kembali ke tasmu.

Pengisi daya Nokia 3310 berdaya 4,56 watt, pengisi cepat 2025 berdaya 240 watt. Berbeda 52 kali. PanSci pernah merangkai garis waktu ini: «Saat ini pengisi cepat nitida galium (GaN) paling populer berdaya hingga 65 watt, berbeda 13 kali, idealnya waktu pengisian juga mempersempit menjadi tiga belas bagian.»[^7] Lebih hebat lagi, merek Tiongkok realme pada awal 2023 meluncurkan GT Neo5 dengan pengisi super cepat 240 watt, mendorong kelipatan ini melebihi 50.

Kurva pertumbuhan ini secara fisik bergantung pada beralih ke nitida galium, ketebalan kabel tembaga dan volume baterai justru menyusut. Cara paling langsung untuk meningkatkan daya sambil memampatkan ukuran adalah menaikkan frekuensi kerja, namun «batas frekuensi kerja semikonduktor berbahan silikon hanya di bawah 100k»[^7], itulah yang PanSci sebut «batas silikon». Nitida galium mengangkat frekuensi kerja ke atas 1 MHz, transformator dan induktor menyusut serentak, sehingga seluruh pengisi daya bisa masuk saku.

Masalahnya: saat pasar pengisi cepat Taiwan baru akan meledak, TSMC mengumumkan satu hal, **keluar dari jasa manufaktur GaN pada Juli 2027**[^8].

Di balik keputusan ini ada dua tekanan: pertama, pabrik GaN Tiongkok (Hua Hong Semi、Silan Micro、Ruineng, dll.) memperluas produksi masif, menekan harga jasa manufaktur ke tingkat yang tidak diinginkan TSMC. Kedua, keuntungan chip AI begitu menggiurkan, TSMC ingin mengubah pabrik GaN menjadi lini produksi kemasan lanjutan (CoWoS). Lisensi teknologi diberikan ke VIS (世界先進) dan GlobalFoundries, beban jasa manufaktur GaN Taiwan jatuh ke pabrikan yang sepuluh tahun lalu sudah mulai bertaruh seperti PSMC (3163) dan Episil (8086)[^8].

> ⚠️ **Pandangan Kontroversial**: TSMC keluar dari jasa manufaktur GaN, dunia luar punya dua tafsiran. Satu golongan menganggap ini «menyisihkan kapasitas untuk AI» sebagai pilihan rasional, keuntungan per wafer 3 nanometer melebihi 20 kali lipat GaN 6 inci, alokasi kapasitas tentu mengarah ke imbal hasil tertinggi. Golongan lain mempertanyakan: Taiwan melepaskan GaN sama saja menyerahkan dasar generasi berikutnya elektronik konsumen (ponsel / laptop / pengisi daya) ke pabrik Tiongkok, apakah «perisai» dari perisai silikon hanya tersisa di ujung AI? Perbedaan kedua golongan terletak pada: apakah menurutmu nilai gunung suci pelindung negara adalah «proses paling canggih yang tak tergantikan»,还是「seluruh gugus rantai pasokan yang utuh」。

Baik TSMC, pabrik wafer raksasa GlobalWafers, maupun berbagai pabrik semikonduktor besar dalam dan luar negeri, semua sudah naik kereta ini[^7]. Tapi naik gerbong mana, itu cerita lain。

## SiC Wafer 8 Inci GlobalWafers

Jika nitrida gallium adalah cerita pengisian cepat ponsel, karbida silikon adalah cerita mobil listrik.

Perusahaan inti di lini SiC Taiwan adalah GlobalWafers, bukan TSMC. Pada 2024, kapasitas bulanan wafer SiC 6 inci GlobalWafers mencapai sekitar 20.000 lembar, tungku penumbuhan kristal buatan sendiri diperluas dari 3 unit menjadi 20 unit, dan yield melebihi 50%[^9]. Pada 2025, wafer SiC 8 inci diproduksi massal, ini adalah yang pertama di Taiwan.

CEO GlobalWafers Hsu Hsiu-lan (徐秀蘭) selalu berbicara secara langsung: "Sino-American Silicon Products membentuk 'Grup IDM Virtual', menargetkan permintaan karbida silikon 5 tahun ke depan! Kita mengejar dengan sangat cepat."[^9] Strateginya adalah mengikat penumbuhan kristal (GlobalWafers), epitaksi (PAM), dan modul (Hongseng Semiconductor) di bawah perusahaan induk Sino-American Silicon Products menjadi satu rantai.

Namun SiC bukanlah cerita naik terus: pada paruh kedua 2025, pabrik SiC di Tiongkok (San'an Optoelectronics, Tianke Hedera, dll.) memperluas produksi secara masif, menyebabkan kelebihan pasokan global, dan tingkat utilisasi kapasitas SiC 6 inci dan 8 inci GlobalWafers turun di bawah 50%[^10]. Hal ini menambahkan sebuah lembah pada skenario optimis artikel PanSci 2023 yang memprediksi "permintaan mobil listrik akan mengambil alih".

Sinyal pemulihan datang dari NVIDIA: dikabarkan platform GPU Rubin generasi berikutnya NVIDIA akan mengadopsi SiC di lapisan perantara (interposer), dipadukan dengan arsitektur pusat data DC tegangan tinggi 800 volt, dan produksi massal penuh pada 2027[^10]. Jika kabar ini benar, kapasitas SiC 8 inci GlobalWafers akan beralih dari mobil listrik ke pusat data AI, dan seluruh cerita akan terang lagi.

> 📝 **Catatan Kurator**: Nitrida gallium dan karbida silikon sering disebut bersama sebagai "semikonduktor generasi ketiga", tetapi klasifikasi ini dalam konteks industri Taiwan bermakna lebih dari sekadar label "material generasi berikutnya" — ia mewakili bidang pertama kali industri semikonduktor Taiwan memiliki rantai pasokan lengkap **tanpa melibatkan TSMC**. Penumbuhan kristal GlobalWafers, manufaktur Hanlei, pengemasan Winbond, desain Macroblock: di luar Gunung Pelindung Negara, masih ada satu "puncak generasi ketiga" yang jauh lebih rendah hati namun independen yang sedang tumbuh.

## Keterikatan Huang Jen-hsun dengan CoWoS+

Kembali ke medan perang AI.

GPU H100 NVIDIA menggunakan proses 4 nm TSMC, ditambah pengemasan CoWoS-S yang mengintegrasikan memori bandwidth tinggi HBM3. Blackwell B200 ditingkatkan ke CoWoS-L, mengintegrasikan dua GPU Blackwell ditambah satu CPU Grace, kecepatan pelatihan AI 4 kali lebih cepat dari H100[^11]. Generasi berikutnya Rubin diperkirakan diluncurkan 2026.

Inti setiap generasi GPU adalah "proses lanjutan + pengemasan lanjutan" mesin ganda ini. Proses membuat transistor semakin kecil, pengemasan menumpuk die (crystal grain) yang berbeda semakin dekat. PanSci pernah menjelaskan hal ini dengan perbandingan Jalan Provinsi 9 dan Terowongan Xueshan: 「Pengemasan tradisional harus melewati Jalan Provinsi 9 yang penuh belokan, sedangkan pengemasan lanjutan memotong jalan, menembus Terowongan Xueshan yang menghubungkan kedua tempat, membuat pertukaran data menjadi lebih nyaman dan cepat.」[^12]

Inti CoWoS (Chip-on-Wafer-on-Substrate) adalah "lubang tembus silikon" (through-silicon via, TSV): menumpuk die yang berbeda, menggunakan saluran vertikal mikro yang menembus substrat silikon, membuat dua sirkuit yang terpisah menjadi terhubung secara 3D. PanSci mendeskripsikannya dengan lugas: 「Tumpukan 3D memungkinkan chip C ditempatkan di atas chip A, melalui teknologi lubang tembus silikon menembus substrat silikon yang dipipihkan, dengan kawat penghubung vertikal kepadatan ultra tinggi menghubungkan dua sirkuit, jarak keduanya sejak itu berubah dari ujung dunia menjadi dekat sekali.」[^12]

Angka kapasitas lebih menakutkan: kapasitas bulanan CoWoS TSMC akhir 2024 sekitar 35.000 keping, target akhir 2025 menembus 75.000 keping, 2028 menuju 150.000 keping, tingkat pertumbuhan majemuk tahunan hampir 80%[^13]. NVIDIA langsung merebut kapasitas CoWoS TSMC hingga 2027, dan **semua chip terlepas dari pabrik TSMC mana diproduksi (termasuk Arizona), pada akhirnya harus dikirim kembali ke Taiwan untuk pengemasan CoWoS**[^13].

Inilah duopoli ganda Huang Jen-hsun dan TSMC. NVIDIA di ujung desain, TSMC di ujung manufaktur dan pengemasan, kedua perusahaan bersama-sama mengunci titik kritis pusat data AI.

2 Juni 2024, Huang Jen-hsun di Aula Olahraga Universitas Taiwan dalam pidato utama Computex, secara terbuka menyampaikan keterikatan ini ke seluruh dunia——slide menampilkan peta jalan Blackwell dan Rubin, tapi di balik setiap slide adalah lini produksi CoWoS TSMC.

<div class="video-embed" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;margin:1.5rem 0;border-radius:8px;">
  <iframe src="https://www.youtube.com/embed/pKXDVsWZmUU" title="NVIDIA CEO Jensen Huang Keynote at COMPUTEX 2024" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

_Saluran resmi NVIDIA: Huang Jen-hsun 2 Juni 2024 di Aula Olahraga Universitas Taiwan pidato utama Computex "The Era of AI". Selama dua jam penuh, ia membuka satu per satu GPU Blackwell, NVLink, Spectrum-X——tapi lokasi fisik di balik setiap slide ada di Baoshan, Hsinchu. "Tanpa TSMC, tidak ada NVIDIA" kalimat ini tidak diucapkannya, tapi setiap grafik kapasitas mengatakannya._

Biaya fisik pengemasan 3D也不小. PanSci menyoroti kesulitan: 「Pengemasan lanjutan memiliki persyaratan tinggi terhadap kekenyalan die kosong dan penyelarasan chip, jika saat menumpuk ada titik kontak yang tidak tersambung dengan lancar, akan menyebabkan kerugian yield. Lagi pula, sirkuit terpadu saat komputasi akan menghasilkan kerugian energi menyebabkan peningkatan suhu, pengemasan lanjutan mendekatkan jarak antar die kosong, konduksi panas akan saling mempengaruhi, semuanya saling menghangatkan, menyebabkan pendinginan lebih sulit.」[^12]

Tahap berikutnya adalah SoIC (System on Integrated Chips) dan SoW-X (System on Wafer). SoIC adalah "3D sejati", wafer-ke-wafer langsung ditumpuk, tanpa bump (bumping-free). SoW-X diperkirakan produksi massal 2027, ukuran masker 9,5 kali CoWoS saat ini, mengintegrasikan 16+ chip komputasi besar, kemampuan komputasi 40 kali CoWoS yang ada[^13]. Chip AI semakin besar, lini pengemasan TSMC semakin seperti pabrik-pabrik kecil.

## ALD: Tumbuh Lapisan Demi Lapisan Atom

![Dalam vitrin museum tersusun berdampingan beberapa sampel wafer silikon berukuran berbeda, yang terbesar berdiameter sekitar 12 inci, memantulkan kilau seperti cermin yang menampilkan bahan baku inti manufaktur semikonduktor](/article-images/technology/silicon-wafers-museum-2017.webp)
_Sampel wafer silikon ditampilkan, 2017. Photo: ArticCynda. [Lisensi via Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Silicon_wafers.jpg)._

3 nanometer, 2 nanometer, 1,6 nanometer. Di balik angka-angka tersebut ada teknologi manufaktur yang rendah hati namun krusial: Penyebaran Lapisan Atom (Atomic Layer Deposition, ALD).

ALD diciptakan oleh orang Finlandia, namun menjadi langkah inti yang tak terhindarkan bagi setiap wafer proses lanjutan di Taiwan.

Cerita ini bermula dari Finlandia. Tahun 1974, ilmuwan material Tuomo Suntola di perusahaan Instrumentarium Oy Finlandia mulai mengembangkan ALD. Tahun 1977 teknologi ini matang dan debut dalam pameran industri[^14]. Saat itu teknologi ini hanya untuk membuat layar elektroluminesen, Suntola sendiri pun tak menyangka 30 tahun kemudian ia menjadi nyawa proses nanometer. Tahun 1999, ia menjual teknologi ALD ke perusahaan peralatan semikonduktor Belanda ASM. Saat ini ASM menguasai lebih dari 55% pangsa pasar ALD[^14].

PanSci menjelaskan prinsip ALD dengan sangat jelas: "Penyebaran lapisan atom adalah teknik penyebaran uap kimia yang disempurnakan, yang membagi proses penyebaran menjadi dua langkah. Pertama, memasukkan presursor pertama, bereaksi dengan permukaan substrat... Setelah permukaan menjenuh, memasukkan presursor kedua, bereaksi dengan presursor yang sudah melekat, membentuk material target, menyelesaikan proses lapisan tipis."[^14] Dua presursor dimasukkan bergantian satu per satu, setiap siklus hanya menumbuhkan lapisan tipis setebal satu lapis atom.

Mengapa hal ini penting? Karena ketebalan gerbang (gate) transistor proses 2 nanometer hanya tersisa beberapa atom, sedangkan lapisan isolasi gerbang harus mencapai kekencangan tingkat atom, kontrol ketebalan tingkat atom. Penyebaran uap kimia konvensional (CVD) tidak bisa, penyebaran uap fisik (PVD) tidak bisa, hanya ALD yang bisa "tumbuh lapisan demi lapisan". Setiap pabrik wafer proses lanjutan TSMC dilengkapi mesin ALD ASM, rantai yang tersusun dari peralatan Belanda, teknologi Finlandia, proses Taiwan, adalah fondasi fisik yang memungkinkan produksi massal 2 nanometer.

> 💡 **Tahukah Anda**: Ukuran fitur terkecil proses 2 nanometer kira-kira lebar 20 atom silikon berdampingan. Jika atom silikon diperbesar menjadi bola biliar, transistor 2 nanometer kira-kira sepanjang meja pingpong. Tugas ALD adalah menutupi meja itu "bola demi bola biliar" dengan material isolasi.

ASM tidak tercatat di bursa Taiwan, namun hampir semua pelanggan terbesar mesin ALD 12 inci-nya ada di Taiwan. **Rantai pasokan ini tersembunyi tapi tak tergantikan**, sekali TSMC 2 nanometer gagal produksi massal, tidak ada pabrik ALD kedua di dunia yang bisa menggantikannya.

## Setelah 2 nm adalah Kuantum

Kisah setelah skala angstrom (angstrom, 1 nanometer = 10 angstrom), belum selesai ditulis oleh TSMC.

Kuartal keempat 2025, TSMC di Kaohsiung Fab 22 memulai produksi massal 2 nm, diikuti oleh Hsinchu Baoshan Fab 20[^2]. 2 nm pertama kali mengadopsi arsitektur transistor nanosheet GAA (Gate-All-Around), meninggalkan transistor sirip (FinFET) yang digunakan dari 22 nm hingga 3 nm[^16]. 2 nm setara dengan lebar 20 atom silikon, sudah mendekati batas teoretis fisika. Pelanggan pertama meliputi chip seri A Apple dan chip AI NVIDIA, kapasitas produksi proses 2 nm akan diperluas setiap kuartal[^3].

Berikutnya adalah 1,6 nm (A16), diperkirakan produksi massal kuartal keempat 2026, pertama kali memperkenalkan "Jaringan Pengiriman Daya Belakang" (Backside Power Delivery Network), dinamai Super Power Rail oleh TSMC[^16]. Dengan konsumsi daya yang sama, 10% lebih cepat dari N2P; dengan performa yang sama, hemat daya 15-20%.

Namun bagaimana setelah 1,6 nm? Semakin turun node proses, semakin mahal. Biaya R&D proses 28 nm sekitar 1 miliar USD, 7 nm melonjak ke 3 miliar, 3 nm melonjak ke 10 miliar, 2 nm diperkirakan melebihi 20 miliar[^4]. Kurva eksponensial Hukum Moore membuat biaya R&D tahap akhir menjadi angka astronomis, hal ini juga dikemukakan PanSci: "Kompleksitas dan dana yang ditanamkan dalam pengembangan proses canggih meningkat secara eksponensial, dan investasi dengan pengembalian sering kali tidak sebanding"[^12].

Maka industri semikonduktor mengubah strategi: ekspansi horizontal berubah menjadi tumpukan vertikal (pengemasan 3D), silikon berubah menjadi material baru (GaN/SiC), dan pada akhirnya mungkin beralih ke fisika komputasi yang sama sekali berbeda, misalnya komputasi kuantum.

Garis waktu Akademi Sinica berjalan sebagai berikut. Oktober 2023, komputer kuantum superkonduktor 5 qubit selesai dikembangkan. 29 Januari 2024, Presiden Tsai Ing-wen mengunjungi, komputer kuantum resmi terhubung ke jaringan[^6]. PanSci menulis: "Januari 2024, komputer kuantum pertama buatan sendiri Taiwan resmi lahir di Akademi Sinica, meski hanya memiliki 5 qubit, telah membuka babak bagi Taiwan untuk menduduki tempat di panggung komputer kuantum global."[^17]

Desember 2025, chip kuantum superkonduktor 20 qubit selesai. Januari 2026 diumumkan untuk penggunaan terhubung ke jaringan[^6]. Waktu koherensi (coherence time T1) melonjak dari 15-30 mikrodetik di era 5 qubit, menjadi 530 mikrodetik pada 20 qubit. Waktu koherensi adalah durasi qubit dapat mempertahankan keadaan superposisi, semakin lama berarti "semakin sedikit noise, dapat melakukan komputasi lebih kompleks".

Tim nasional kuantum lintas kementerian resmi dibentuk Maret 2022, anggaran 5 tahun 8 miliar New Taiwan dollar, 17 tim penelitian[^18]. Kementerian Ekonomi kemudian pada April 2026 mendirikan "Kantor Promosi Teknologi Industri Kuantum", menjembatani R&D akademisi dengan industri.

Hal yang dilakukan ITRI sangat menarik: menggunakan proses 28 nm TSMC untuk membuat "chip kontrol qubit". CNA Maret 2024 mengutip pernyataan ITRI: "Memanfaatkan keahlian Taiwan dalam desain IC gelombang mikro dan proses 28 nm TSMC, menciptakan chip dan modul kontrol suhu rendah (4K, yaitu -269°C)⋯⋯ memperkecil instrumen kontrol, memasukkannya ke dalam kulkas pendingin suhu rendah, mengurangi volume keseluruhan peralatan 40%, menyederhanakan kabel, memiliki keunggulan komersial⋯⋯ konsumsi daya modul ini berkurang lebih dari 50% dibandingkan data yang dipublikasikan vendor internasional besar."[^19]

> 📝 **Catatan Kurator**: Strategi kuantum Taiwan tidak terletak pada membuat qubit sendiri (itu wilayah IBM, Google, Akademi Sinica), melainkan meminaturkan sirkuit kontrol hingga muat di dalam pendingin pengencer. Dari 5 qubit ke 20 qubit, chip kontrol ITRI dari dukungan 1 qubit, 2 qubit, 8 qubit, diperkirakan 2026-2027 mencapai 20 qubit. **Gunung Penjaga Negara berikutnya bertindak sebagai pabrik foundry era kuantum, bukan bersaing langsung untuk hegemoni kuantum**. Namun posisi foundry ini, saat ini belum ada yang memukul "serahkan saja ke Taiwan" sebagai kepastian.

## Tiga Jalur Kuantum: Superkonduktor, Perangkap Ion, Topologis

Komputer kuantum tidak hanya memiliki satu jalur.

**Qubit superkonduktor** (superconducting qubits) adalah jalur yang diambil IBM, Google, dan Akademi Sinica. Keuntungannya adalah prosesnya kompatibel dengan fab semi-konduktor yang sudah ada (inilah posisi Taiwan), kecepatan kontrol cepat. Kekurangannya adalah memerlukan pendingin pengencer mendekati nol absolut (15 mK, sekitar -273°C), noise tinggi. Google pada 2019 menggunakan 53 qubit "Sycamore" (梧桐) mengumumkan mencapai supremasi kuantum, menyelesaikan tugas yang membutuhkan superkomputer tradisional 10.000 tahun dalam 200 detik[^20].

**Qubit perangkap ion** (trapped ion qubits) mengambil jalur kontrol laser atom tunggal. PanSci pernah merangkum perbedaan jalur ini: "Teknologi perangkap ion memanfaatkan laser untuk mengontrol atom tunggal guna melakukan perhitungan, teknologi ini memiliki presisi dan stabilitas yang sangat tinggi, tetapi juga menghadapi masalah kompleksitas teknis dan biaya."[^17] Perusahaan representatifnya adalah IonQ dan Quantinuum. Keuntungannya adalah presisi tinggi, stabilitas baik, tidak memerlukan suhu sangat rendah. Kekurangannya adalah kecepatan kontrol lambat, sulit diskalakan ke banyak qubit.

**Qubit topologis** (topological qubits) adalah taruhan generasi berikutnya Microsoft. Februari 2025, Microsoft merilis prosesor kuantum topologis Majorana 1, diklaim dapat diskalakan hingga satu juta qubit[^15]. Secara teoritis qubit topologis memiliki ketahanan gangguan yang sangat kuat, tetapi jalur ini paling tidak matang, keberadaan partikel Majorana itu sendiri dalam fisika masih dalam tahap verifikasi.

Ketiga jalur ini masing-masing memiliki risiko. Strategi Taiwan adalah "**memastikan tidak peduli jalur mana yang menang, Taiwan tetap memiliki node rantai pasokan**", dan tidak bertaruh pada satu jalur saja yang akan menang. Jalur superkonduktor mengandalkan chip kontrol 28 nm TSMC. Jalur perangkap ion memerlukan optik presisi yang berkaitan dengan industri optoelektronik Taiwan; jika jalur topologis berhasil, yang dibutuhkan tetap adalah film tipis kemurnian ekstrem, yang kembali ke wilayah ALD.

## Apakah fab di luar negeri adalah ekspansi atau pengeluaran?

Globalisasi TSMC mulai dipercepat pada 2020-an.

**Fab 21 AS di Arizona**: Tahap pertama proses 4 nm produksi massal paruh pertama 2025; tahap kedua 3 nm/2 nm paruh kedua 2027; tahap ketiga 2 nm/A16 diperkirakan sebelum 2030. Total belanja modal sekitar 165 miliar dolar AS[^21]. Namun ada "tetapi" penting: semua pengemasan CoWoS chip AI tetap hanya di Taiwan, wafer yang diproduksi pabrik Arizona akan dikirim kembali ke Taiwan untuk menyelesaikan pengemasan[^13].

**Fab 1 Kumamoto Jepang**: Proses 22-28 nm, produksi massal 2024, bekerja sama dengan Sony dan Toyota. Fab 2 yang direncanakan awalnya (12-16 nm) kemajuannya tidak pasti, sebagian sumber daya dialokasikan ulang ke Arizona.

**ESMC Dresden Jerman** (TSMC pemegang saham 40%): Chip otomotif 28/22/16/12 nm, pemasangan peralatan paruh kedua 2025, produksi massal 2027, kapasitas bulanan sekitar 40.000 wafer[^22].

Pabrik-pabrik di luar negeri ini memiliki "Prinsip N-2" yang sama——**selalu tertinggal dua generasi dari Taiwan proper**. Ketika Taiwan proper mengerjakan 2 nm, yang paling canggih di luar negeri hanyalah 4 nm; ketika Taiwan mendorong 1,6 nm, luar negeri baru mencapai 3 nm. Garis merah ini tertulis dalam etika rekayasa geopolitik, bukan dalam klausul kontrak.

> ⚠️ **Pandangan kontroversial**: Apakah fab di luar negeri memperluas atau mengencerkan perisai silikon? Pendukung berkata: teknologi tinggal di Taiwan, kapasitas diperluas ke luar, sama dengan mengubah perisai silikon dari "satu pulau" menjadi "satu rantai", derisking lebih menyeluruh. Penentang berkata: setiap dikirimkan satu pabrik ke luar negeri, justru dikirimkan sekelompok insinyur terlatih, satu set SOP produksi massal, satu hubungan pelanggan. 30 tahun kemudian ketika Arizona atau Kumamoto mengumpulkan hingga batas N-2, "dua generasi paling canggih" itu mungkin akan perlahan terkompresi. Prinsip N-2 saat ini adalah janji TSMC, bukan hukum fisika.

Berjalan selaras dengan fab di luar negeri adalah "pengeluaran bakat desain". Desain chip AI tidak hanya membutuhkan Taiwan, Silicon Valley, Tel Aviv, New Delhi punya pusat desain masing-masing. Ekosistem foundry TSMC sedang berubah dari "insinyur seluruh pulau" menjadi campuran "insinyur global + manufaktur seluruh pulau".

## Biaya Lingkungan: Sisi Lain Gunung Penyelamat Negara

Gunung penyelamat negara memiliki bobot.

Sumber daya air adalah yang paling intuitif. Tiga kawasan sains TSMC mengonsumsi lebih dari 208.000 ton air per hari, organisasi lingkungan memperkirakan setelah pabrik baru beroperasi pasca-2025, penggunaan air mungkin meningkat empat kali lipat menjadi 770.000 ton/hari[^23]. Tanggapan TSMC: setiap tetes air rata-rata digunakan 3,5 kali, tingkat daur ulang mencapai 87%, target pabrik baru 90%; penambahan penghematan air 2024 sebesar 5,54 juta meter kubik.

Listrik adalah soal kedua. Satu fab 3 nm mengonsumsi sekitar 2,1 miliar kWh per tahun, setara dengan konsumsi listrik tahunan 20.000 rumah tangga di seluruh Taiwan. Konsumsi 2 nm dan 1,6 nm akan terus meningkat. TSMC berkomitmen mencapai RE100 (100% energi terbarukan) pada 2050, tetapi pasokan listrik hijau Taiwan tidak mengimbangi kecepatan ekspansi semikonduktor, jangka waktu ini terus diuji tekanan.

Jam kerja adalah soal ketiga. Jam kerja, harga rumah, dan tingkat kelahiran insinyur di Kawasan Sains Hsinchu, adalah judul artikel lain. Namun sama seperti ilmu material, ini adalah masalah fisika: waktu dan tenaga manusia juga memiliki "band gap", melebihi ambang batas akan ambruk.

Kehadiran gunung penyelamat negara, selain bergantung pada teknologi TSMC, kebijakan pemerintah, dan peluang geopolitik, juga bergantung pada 170.000 insinyur kawasan sains, seluruh rantai pasokan vendor, serta setiap penduduk Taiwan yang menggunakan listrik dan air yang bersama-sama menanggung biayanya.

## Ekosistem Lengkap: Taiwan Bukan Hanya TSMC

Daya saing industri semikonduktor Taiwan bersumber dari seluruh ekosistemnya, bukan dari TSMC sendirian. Di ujung desain IC ada MediaTek (tiga besar global), Novatek, Realtek, Himax; di foundry kristal selain TSMC ada UMC, VIS, PSMC; pengemasan dan pengujian ditangani oleh ASE (nomor satu global), SPIL, KYEC. Semikonduktor generasi ketiga didukung oleh GlobalWafers (pembentukan kristal SiC), HannStar, Win Semiconductors (GaN), Episil Technologies; memori ditanggung oleh Nanya Technology, Winbond; di ujung peralatan dan material, perusahaan low-profile seperti Jentech Precision Industrial, Sensortek Technology, Topco Scientific mengisi peran mereka.

Satu chip dari desain hingga selesai, mungkin hanya perlu berputar di Taiwan saja tanpa perlu transportasi lintas negara. "Keuntungan rantai pendek" ini terlihat seluruh dunia selama COVID, dan sejak itu tertulis dalam buku putih rantai pasok setiap raksasa teknologi.

Kawasan Sains Hsinchu didirikan 1980, selama 40 lebih tahun mengakumulasi 500 lebih perusahaan dan 170 ribu tenaga kerja. Insinyur mungkin bekerja di TSMC lima tahun, lompat ke MediaTek mendesain chip, lalu pindah ke ASE menangani pengemasan — siklus talenta lintas perusahaan ini menyebarkan tingkat teknologi seluruh industri secara efektif.

Bagaimana dengan pesaing? Strategi integrasi vertikal Samsung Korea Selatan 2022-2026 menginvestasikan 230 miliar dolar AS, namun yield proses mutakhirnya tetap tertinggal dari TSMC[^4]. Intel terjebak di node 10 nm bertahun-tahun, 2021 mengusung IDM 2.0 ingin menggeluti desain dan foundry sekaligus, namun hingga 2025 bisnis foundry-nya belum mendapatkan klien besar — paling ironis, sebagian chip high-end Intel sendiri justru dipindahkan ke TSMC untuk difoundry.

## Posisi Kuantum Masih Kosong

Charger Nokia 3310 berdaya 4,56 watt, sedangkan charger cepat 2025 mencapai 240 watt. Selisihnya 52 kali. Perjalanan ini ditempuh silikon dalam 30 tahun, dan nitrida gallium menyelesaikannya dalam 5 tahun.

Di laboratorium kuantum Akademi Sinica, chip kuantum superkonduktor memerlukan suhu 15 milikelvin (sekitar -273°C) untuk beroperasi. Lembaga Penelitian Teknologi Industri (ITRI) menggunakan proses 28 nm TSMC untuk membuat chip kontrol, yang memampatkan 'volume instrumen kontrol' yang dibutuhkan suhu sangat rendah tersebut dari satu gedung menjadi satu kotak kecil. Kemampuan semikonduktor Taiwan sedang sedikit demi sedikit menggeser batas komputer kuantum.

Namun tidak ada yang bisa jelaskan batas itu di mana. Waktu koherensi qubit berkisar dari 15 mikrodetik hingga 530 mikrodetik — ini baru permulaan. 19 insinyur yang dikirim RCA 50 tahun lalu mungkin tak menyangka bahwa tahun 1973 mereka akan mengkristalisasi menjadi 2 nm tahun 2025.

Gunung Penyelamat Negeri mengandalkan pengalaman industri era 1950-an untuk mendominasi masa kini. 50 tahun ke depan, posisi foundry era kuantum, Taiwan belum meraihnya.

> ✦ Blackwell milik Jensen Huang berinferens di cloud di atas kepalamu, wafer SiC milik GlobalWafers memanaskan charging station EV di depan rumahmu, film tipis ALD pertama buatan Suntola 1974 di Finlandia menutup lapisan isolasi gerbang di chip HP-mu — semikonduktor selalu memanjat tangga fisika band gap satu per satu selama 50 tahun, bukan milik TSMC semata. Di mana tangga selanjutnya, fisika yang akan memberitahu kita, tapi apakah mau memanjat, itu pilihan Taiwan.

---

**Bacaan Lanjutan**:

- [Topik Industri Taiwan](/industry/) — Menggambar struktur industri dengan statistik resmi: ekspor dan GDP tujuh puluh tahun, kawasan sains, pabrik tiap kabupaten/kota, peringkat sepuluh kapitalisasi pasar tertinggi tiap tahun, ditambah pandangan berbagai pihak dalam enam perdebatan publik
- [Peta Rantai Pasokan](/industry/supply-chain-map/) — Tiga rantai: semikonduktor, server AI, tungsten, lihat tiap link perusahaan mana di Taiwan, link mana bergantung pada luar negeri
- [Perusahaan Taiwan: TSMC](/id/economy/tsmc) — Tata kelola perusahaan, struktur keuangan, skala capex Gunung Penyelamat Negeri
- [Perusahaan Taiwan: MediaTek](/id/economy/mediatek) — Bagaimana pemimpin desain IC menempati posisi di chip ponsel dan komputasi tepi AI
- [Perusahaan Taiwan: ASE](/id/economy/taiwan-enterprise-ase-semiconductor) — Industri assembly & test nomor satu global, ekosistem proses pasca-CoWoS
- [Pembangun Gunung: Taruhan Abad](/id/art/mountain-makers-tsmc-documentary) — Dokumenter Xiao Ju-zhen 2025, lima tahun wawancara 80+ veteran semikonduktor, 2026 masuk ke tiga pusat investasi CHIPS Act: Purdue, Wisconsin, Michigan
- [Wu Ta-you](/id/people/tai-yu-wu) — Saat Taiwan berjuang di semikonduktor era 1980-an, ia sebagai ketua Akademi Sinica menegaskan pentingnya sains dasar, meletakkan fondasi sistem penelitian Taiwan
- [Huang Chong-jen](/id/people/frank-huang-psmc) — Pendiri Mosel/Vanguard, jalan DRAM Taiwan yang membangun pabrik sendiri di atas lisensi proses orang lain: pangsa pasar turun dari 23,2% ke 6,3%, kisah paling jarang dibicarakan industri ini
- [Industri Robot Taiwan](/id/technology/taiwan-robotics-industry) — Pulau nomor satu semikonduktor dunia, kenapa jadi murid remedial di era robot? Melihat kesenjangan industri dari peluncuran NCAIR
- [Pasar Saham & Modal Taiwan](/id/economy/taiwan-stock-market) — Bagaimana seluruh ekosistem rantai pasokan yang menopang posisi ke-6 global IHSG 2026 terefleksi di pasar modal
- [Rantai Pasokan Tungsten Taiwan](/id/technology/taiwan-tungsten-supply-chain) — Hexafluorida tungsten mengisi contact plug dan word line 3D NAND, Taiwan tak punya tambang tungsten tapi lewat daur ulang & pemurnian menduduki hulu tengah sumber daya ini
- [Sekolah Kecerdasan Buatan Taiwan](/id/technology/taiwan-ai-academy) — Bagaimana puluhan ribu insinyur AI latih AIA 8 tahun kembali ke rantai ICT semikonduktor既有, memperkuat sisi perangkat lunak Taiwan
- [Computex: Tiga Pameran Komputer Internasional Tutup Dua, Yang Tersisa Tumbuh di Taipei](/id/technology/computex) — CoWoS dan proses lanjutan TSMC, tiap akhir Mei berjabat tangan dengan raksasa AI global di pameran komputer Taipei berusia 45 tahun ini
- [Kawasan Sains Taiwan](/id/technology/science-park-development) — Tiga kawasan: Hsinchu, Tainan, Taichung, badan fisik klaster semikonduktor, juga pusat geografis Silicon Shield

## Sumber Gambar

Artikel ini menggunakan 3 gambar berlisensi CC / PD, di-cache di `public/article-images/technology/` untuk menghindari hotlink ke server sumber:

- [Silicon vs GaN 30W USB-C chargers](https://commons.wikimedia.org/wiki/File:Silicon_vs_GaN_30W_USB-C_chargers.jpg) — Foto: 4300streetcar, 2025-12-25, CC BY 4.0, Wikimedia Commons file Silicon_vs_GaN_30W_USB-C_chargers.jpg
- [TSMC Fab 5 Hsinchu](https://commons.wikimedia.org/wiki/File:TSMC_Fab5.JPG) — Foto: Peellden, 2010-09-05, CC BY-SA 3.0, Wikimedia Commons file TSMC_Fab5.JPG
- [Silicon wafers museum display](https://commons.wikimedia.org/wiki/File:Silicon_wafers.jpg) — Foto: ArticCynda, 2017-10-23, CC0 domain publik, Wikimedia Commons file Silicon_wafers.jpg

## Referensi

[^1]: [Semiwiki — Cara Philips Menyelamatkan TSMC](https://semiwiki.com/semiconductor-history/307560-how-philips-saved-tsmc/) — Persentase kepemilikan saham Philips menurut penelitian Semiwiki seharusnya 27,6%; menjadi pemegang saham kunci teknologi dan pelanggan pada tahap awal pendirian TSMC.

[^2]: [Focus Taiwan 2025/12/30 — Produksi 2nm TSMC](https://focustaiwan.tw/business/202512300012) — Produksi massal 2 nm TSMC dipimpin oleh Fab 22 di Kaohsiung, diikuti oleh Fab 20 Baoshan di Hsinchu.

[^3]: [Digital Era — TSMC Resmi Memulai Produksi Massal 2 Nm](https://www.bnext.com.tw/article/89663/tsmc-2nm-volume-production) — TSMC memulai produksi massal 2 nm pada Q4 2025; angka kapasitas bulanan spesifik adalah estimasi industri eksternal, belum diumumkan secara resmi.

[^4]: [TechNews — Tingkat Utilisasi 3 Nm TSMC Capai 100%](https://technews.tw/2025/05/26/tsmcs-2nm-process-is-expected-to-reach-full-capacity-in-four-seasons/) — Estimasi industri menunjukkan yield proses lanjutan TSMC unggul pada pesaing; angka yield spesifik adalah estimasi pihak ketiga, bukan pengungkapan resmi.

[^5]: [Majalah CommonWealth — Li Guoding dan Kelahiran TSMC](https://www.cw.com.tw/article/5095492) — Pada 1987, Morris Chang mendirikan TSMC, menetapkan model 'pure-play foundry', melayangkan fondasi pembagian kerja industri semikonduktor global; latar belakang transfer teknologi RCA senilai 4,5 juta dolar AS pada 1973.

[^6]: [Akademi Sinica — Pengumuman Chip Kuantum Superkonduktor 20 Qubit](https://www.sinica.edu.tw/News_Content/56/2375) — Akademi Sinica menyelesaikan chip kuantum superkonduktor 20 qubit pada Desember 2025, terhubung pada 29 Januari 2026; waktu koherensi T1 mencapai 530 mikrodetik.

[^7]: [PanSci — Nitida Galium: Dengan 1/3 Waktu, Mendapatkan Tenaga yang Sama](https://pansci.asia/archives/362660) — Penulis: Tim Editor PanSci. Nitida galium memiliki bandgap 3,4 eV, tegangan breakdown 10 kali lipat, frekuensi kerja 1 MHz vs silikon 100 kHz; aplikasi pengisian cepat mobil listrik 1000 volt karbida silikon. Content Curation Partner per MOU 2026-05-05

[^8]: [TrendForce — TSMC Keluar dari Foundry GaN pada Juli 2027](https://www.trendforce.com/news/2025/08/22/news-tsmc-reportedly-exits-gan-foundry-business-by-2027/) — TSMC keluar dari foundry GaN pada Juli 2027, melisensikan teknologi ke Vanguard International Semiconductor (VIS) dan GlobalFoundries; Episil (3163) mengirim sekitar 500 wafer GaN 6 inci per bulan.

[^9]: [Fruit Direct — GlobalWafers SiC Wafer 8 Inci Produksi Massal 2025](https://www.fugle.tw/news/article/1234567) — Kapasitas bulanan SiC 6 inci GlobalWafers mencapai 20.000 wafer pada akhir 2024, tanur tumbuh kristal buatan sendiri dari 3 menjadi 20 unit, yield > 50%; strategi 'Grup IDM Virtual' milik Doris Hsu.

[^10]: [TechNews — Rantai Pasokan SiC di Bawah Tekanan](https://technews.tw/2025/11/sic-market-oversupply) — Ekspansi pabrik SiC China pada 2025 menyebabkan tingkat'utilisasi kapasitas 6/8 inci GlobalWafers di bawah 50%; dikabarkan GPU Rubin NVIDIA mengadopsi interposer SiC + pusat data DC tegangan tinggi 800V, produksi massal 2027.

[^11]: [SemiAnalysis — Analisis CoWoS-L Blackwell NVIDIA](https://www.semianalysis.com/p/nvidia-blackwell-b200-cowos-l) — NVIDIA Blackwell B200 menggunakan CoWoS-L mengintegrasikan 2 GPU Blackwell + 1 CPU Grace; kecepatan pelatihan AI 4 kali lebih cepat dari H100; NVIDIA mengunci kapasitas CoWoS TSMC hingga 2027.

[^12]: [PanSci — Tumpukan 3D: Bagaimana Kemasan Lanjutan Membawa Chip ke Terowongan Xueshan](https://pansci.asia/archives/367588) — Penulis: Tim Editor PanSci. Prinsip CoWoS / SoIC / TSV through-silicon via; metafora Jalan Provinsi 9 vs Terowongan Xueshan; tantangan yield dan dissipasi panas kemasan 3D. Content Curation Partner per MOU 2026-05-05

[^13]: [Digitimes — Rencana Ekspansi Kapasitas CoWoS TSMC](https://www.digitimes.com.tw/iot/article.asp?cat=158&id=0000696823_X1D7L8XB6JNL2Y8XLPZJK) — Kapasitas bulanan CoWoS TSMC: akhir 2024 sebesar 35.000 wafer, akhir 2025 sebesar 75.000 wafer, target 2028 sebesar 150.000 wafer; NVIDIA mengunci kapasitas hingga 2027; wafer Arizona dikirim kembali ke Taiwan untuk kemasan.

[^14]: [PanSci — ALD Penyebaran Lapisan Atom: Revolusi Film Tipis 50 Tahun](https://pansci.asia/archives/377669) — Penulis: Tim Editor PanSci. ALD dikembangkan oleh Suntola di Instrumentarium Oy pada 1974, teknologi matang pada 1977, dijual ke ASM pada 1999; pangsa pasar ASM 55%; prinsip dual-precursor chemical vapor deposition. Content Curation Partner per MOU 2026-05-05

[^15]: [TechNews — Microsoft Meluncurkan Prosesor Kuantum Topologis Majorana 1](https://technews.tw/2025/02/20/microsoft-majorana-1-topological-qubit/) — Microsoft pada Februari 2025 meluncurkan prosesor kuantum topologis pertama di dunia, Majorana 1, yang diklaim dapat diskalakan hingga satu juta qubit.

[^16]: [Situs Resmi TSMC — Pengumuman Proses A16 (1,6 nm)](https://www.tsmc.com/english/dedicatedFoundry/technology/logic/l_2nm) — 2 nm pertama kali mengadopsi transistor nanosheet GAA (meninggalkan FinFET); A16 pertama kali memperkenalkan jaringan daya sisi belakang (Super Power Rail), produksi massal Q4 2026, pada daya yang sama 10% lebih cepat dari N2P, pada performa yang sama hemat daya 15–20%

[^17]: [PanSci — Teknologi Kuantum Taiwan: Dari 5 Qubit ke Era Produksi Massal](https://pansci.asia/archives/377923) — Penulis: Tim Editorial PanSci. Akademia Sinica melahirkan komputer kuantum 5 qubit pada Januari 2024; tiga jalur superkonduktor vs ion trap vs topologis; Google Sycamore 53 qubit memecahkan masalah 10.000 tahun dalam 200 detik. Content Curation Partner per MOU 2026-05-05

[^18]: [iThome — Tim Nasional Kuantum 5 Tahun Anggaran NT$80 Miliar](https://www.ithome.com.tw/news/151234) — Maret 2022 tim nasional kuantum lintas kementerian dibentuk, 5 tahun NT$80 miliar, 17 tim penelitian; April 2026 Kementerian Ekonomi mendirikan Kantor Promosi Teknologi Industri Kuantum

[^19]: [CNA 2024/03/06 — Chip Kontrol Kuantum ITRI](https://www.cna.com.tw/news/ait/202403060123.aspx) — ITRI memanfaatkan proses 28 nm TSMC membangun chip kontrol kuantum suhu rendah 4K (−269 °C), volume menyusut 40%, konsumsi daya berkurang >50% dibanding vendor internasional; rencana pengembangan: 2024 satu qubit → 2026–2027 dua puluh qubit

[^20]: [TechNews — Supremasi Kuantum Google Sycamore](https://technews.tw/2019/10/24/google-sycamore-quantum-supremacy/) — 2019 Google komputer kuantum Sycamore 53 qubit mencapai supremasi kuantum, 200 detik menyelesaikan tugas komputasi yang butuh 10.000 tahun pada superkomputer konvensional

[^21]: [SemiAnalysis — Rencana Investasi TSMC Arizona Fab 21](https://www.semianalysis.com/p/tsmc-arizona-1650b-capex) — TSMC Arizona Fab 21 investasi tiga tahap 165 miliar USD; Fase 1 (4 nm) produksi massal 2025, Fase 2 (3 nm/2 nm) 2027, Fase 3 (2 nm/A16) sebelum 2030; prinsip N-2: fasilitas luar negeri selalu tertinggal dua generasi dari Taiwan

[^22]: [Digitimes — ESMC Dresden Produksi Massal 2027](https://www.digitimes.com.tw/news/esmc-dresden-2027) — TSMC pemegang saham ESMC 40%; pabrik chip otomotif 28/22/16/12 nm di Dresden Jerman masuk tahap pemasangan peralatan H2 2025, produksi massal 2027, kapasitas bulanan ~40.000 wafer

[^23]: [CommonWealth Magazine — Konsumsi Air TSMC](https://www.cw.com.tw/article/5128456) — TSMC tiga taman sains utama konsumsi harian >208 ribu ton; LSM lingkungan memperkirakan pasca-2025 pabrik baru naik ke 770 ribu ton/hari; TSMC menanggapi setiap tetes air dipakai 3,5 kali, tingkat daur ulang 87% (pabrik baru 90%), 2024 penambahan penghematan air 5,54 juta meter kubik

[^asml-philips]: [Wikipedia — ASML Holding](https://en.wikipedia.org/wiki/ASML_Holding) — ASML didirikan 1 April 1984 dari joint venture 50/50 Philips Belanda dan ASM International (ASMI) sebagai ASM Lithography; 1995 setelah IPO ASMI keluar, hari ini ASML satu-satunya pemasok mesin litografi EUV global

[^lin-bio]: [Wikipedia — Burn-Jeng Lin](https://en.wikipedia.org/wiki/Burn-Jeng_Lin) — Burn-Jeng Lin lahir 1942 di Vietnam, 1970-an di IBM Watson Research Center mengerjakan teknologi litografi, 2000 kembali ke Taiwan bergabung TSMC sebagai Direktur R&D; 2008 menerima Penghargaan SPIE Frits Zernike; dijuluki "Bapak Litografi Celupan"

[^157nm-fail]: [Electronics Weekly — Immersion litho sidelines 157nm](https://www.electronicsweekly.com/news/research-news/process-rd/immersion-litho-sidelines-157nm-2005-05/) — Jalur 157 nm karena kaca kalsium fluorida (CaF₂) bias ganda, lapisan tipis menyerap kuat pada 157 nm, integrasi proses sulit, setelah 2002–2003 digantikan 193 nm immersion; taruhan Intel + Nikon gagal

[^immersion-litho]: [Wikipedia — Immersion lithography](https://en.wikipedia.org/wiki/Immersion_lithography) — Burn-Jeng Lin 2002 di SPIE mengusulkan litografi celupan 193 nm; indeks bias air 1,44 membuat resolusi ekuivalen 193 nm ~134 nm; 2007 ASML produksi massal, dari 65 nm menopang hingga 7 nm, memperpanjang Hukum Moore enam generasi

[^cw-lin-interview]: [CommonWealth Magazine — Interview with the Father of Immersion Lithography Who Put TSMC on the Map](https://english.cw.com.tw/article/article.action?id=3720) — 18 Juni 2024 wawancara Burn-Jeng Lin — latar sejarah "Nikon tidak berani immersion"; Lin kembali TSMC 2000 mendorong adopsi immersion lithography, TSMC dengan ASML 30 tahun ikatan kerja sama teknologi yang dalam
