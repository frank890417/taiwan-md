---
title: 'Komunitas Open Source dan g0v'
description: 'Pada Februari 2020, saat dunia berebut masker, sekelompok programmer Taiwan membuat peta stok masker dalam 72 jam. Tanpa perintah pemerintah atau anggaran, hanya dengan keyakinan: mengubah masyarakat melalui kode. Inilah g0v (Zero Government), sebuah eksperimen unik "fork pemerintah".'
date: 2026-03-23
category: 'Technology'
tags: ['Teknologi', 'Komunitas Open Source', 'g0v', 'Civic Tech']
subcategory: '開源社群'
author: 'Taiwan.md'
featured: false
lastVerified: 2026-03-23
lastHumanReview: true
readingTime: 8
translatedFrom: 'Technology/開源社群與g0v.md'
sourceCommitSha: 'ab9964d668'
sourceContentHash: 'sha256:49bc798dac7c0848'
sourceBodyHash: 'sha256:3eab141a44932c8b'
translatedAt: '2026-11-24T11:37:51+08:00'
---

# Komunitas Open Source dan g0v

> **Ringkasan 30 Detik:** Pada tahun 2012, karena pemerintah menghabiskan banyak uang untuk iklan yang tidak berbobot, sekelompok insinyur memutuskan untuk "fork pemerintah"—mengubah gov.tw menjadi g0v.tw, dan merancang ulang bagaimana seharusnya bentuk pemerintahan. Delapan tahun kemudian, saat pandemi COVID-19 meledak, kelompok programmer "amatir" ini membangun peta masker dalam 72 jam, memungkinkan seluruh rakyat Taiwan mencari stok masker di 13.000 apotek secara real-time. Ini bukan prestasi pemerintah, melainkan kemenangan warga negara.

Pada suatu malam di bulan Oktober 2012, Kao Chia-liang (高嘉良) duduk di depan komputer menonton iklan "Skema Pendorong Dinamika Ekonomi" milik pemerintah, dan ia merasa semakin geram. Pemerintah menghabiskan lebih dari NT$40 juta untuk membuat video promosi, tetapi isinya begitu kosong hingga membuatnya bertanya: apakah uang ini tidak lebih bermakna jika langsung dibuang ke selokan saja?

Malam itu, ia membuat keputusan yang mengubah Taiwan: **Jika pemerintah tidak bisa melakukannya dengan baik, kami yang akan melakukannya sendiri.**

Ia mengubah huruf "o" dalam domain pemerintah gov.tw menjadi "0", menjadi g0v.tw[^1]. Permainan kata sederhana ini melambangkan sebuah konsep baru: **fork the government**. Seperti perangkat lunak sumber terbuka (open source), jika versi aslinya bermasalah, Anda melakukan _fork_ pada cabangnya dan menulis ulang versi yang lebih baik sendiri.

## Fork Pemerintah: Eksperimen Warga di Era Digital

g0v tidak bertujuan untuk menggulingkan pemerintah, melainkan untuk menciptakan pemerintahan "paralel"—menggunakan cara kolaborasi open source untuk membayangkan kembali seperti apa seharusnya layanan pemerintah.

Pada **Desember 2012**, hackathon g0v yang pertama diadakan di Academia Sinica dengan partisipasi lebih dari 40 orang. Proyek pertamanya adalah menyelamatkan "Anggaran Umum Pemerintah Pusat" dari "neraka PDF" dan mengubahnya menjadi situs visualisasi interaktif.

Awalnya, dokumen anggaran pemerintah adalah PDF setebal lebih dari 500 halaman dengan angka dan tabel yang sangat padat, sehingga orang awam tidak bisa memahaminya sama sekali. Relawan g0v menyusun ulang data ini menjadi grafik interaktif—**hanya dengan satu klik, Anda bisa melihat ke mana uang pajak Anda dialokasikan oleh pemerintah.**

> **📝 Catatan Kurator**
> Pemilihan visualisasi anggaran pemerintah sebagai proyek pertama g0v bukanlah sebuah kebetulan. Anggaran adalah inti dari politik demokrasi—rakyat berhak tahu untuk apa pemerintah menggunakan uang mereka. Namun, dokumen anggaran tradisional memang dirancang agar sulit dipahami. g0v menggunakan teknologi untuk membongkar "ketidakterbukaan yang disengaja" ini.

Eksperimen kecil ini membuktikan satu hal: **Jika pemerintah tidak melakukannya, bukan berarti hal itu tidak bisa dilakukan. Hanya saja tidak ada yang mau mengerjakannya.**

## Gerakan Mahasiswa 318: Demonstrasi Kekuatan Civic Tech

Pada malam 18 Maret 2014, para mahasiswa menduduki Legislatif. Keesokan paginya, relawan g0v muncul di lokasi, bukan untuk berdemonstrasi, melainkan untuk "membangun infrastruktur".

**Tanpa ada yang mengorganisir, tanpa ada yang memberi komando.** Para partisipan komunitas g0v secara spontan melakukan hal-hal berikut:

- **Siaran Langsung (Live Streaming)**: Membangun sistem siaran langsung multi-kamera agar seluruh dunia dapat melihat situasi di dalam ruang sidang.
- **Integrasi Informasi**: Membuat folder hackfoldr[^2] untuk mengumpulkan, menyusun, dan memverifikasi berbagai informasi di internet secara real-time.
- **Kolaborasi Massa**: Membangun sistem catatan bersama (collaborative note-taking) agar warga yang tidak berada di lokasi tetap dapat berpartisipasi dalam pengumpulan data dan verifikasi fakta.
- **Koneksi Eksternal**: Menyediakan terjemahan langsung multibahasa agar media internasional dapat memahami tuntutan protes secara instan.

**Pendudukan selama 24 hari tersebut disiarkan secara kualitas tinggi (HD) tanpa putus.** Ini adalah pencapaian teknis yang luar biasa pada tahun 2014. Saat itu Facebook Live belum ada dan siaran langsung YouTube belum umum, namun relawan g0v menggunakan alat open source untuk membangun sistem siaran yang lebih stabil daripada media profesional.

Yang lebih penting, mereka membuktikan kekuatan dari "transparansi". Karena adanya siaran langsung, semua orang dapat melihat apa yang terjadi di dalam ruang sidang, sehingga mustahil bagi pemerintah untuk memutarbalikkan fakta. Model "mengawasi pemerintah dengan teknologi" ini kemudian dipandang oleh luar negeri sebagai sebuah templat potensial; Korea Selatan, Thailand, Jepang, dan Jerman pun menumbuhkan komunitas civic tech dengan karakteristik serupa[^3].

## Peta Masker: Keajaiban dalam 72 Jam

Pada awal Februari 2020, pandemi COVID-19 meledak di Taiwan. Pemerintah mengumumkan kebijakan pembelian masker berbasis identitas asli, di mana setiap orang dapat membeli 2 masker per minggu. Masalahnya adalah: di mana harus membelinya? Apotek mana yang masih memiliki stok?

Pada **6 Februari**, Komisioner Kebijakan Digital Audrey Tang (唐鳳) (yang merupakan salah satu pendiri g0v) mengumumkan: pemerintah akan membuka data stok masker dari 13.000 apotek mitra di seluruh Taiwan, dengan pembaruan setiap 30 menit[^4].

Pada **8 Februari**, peta masker pertama diluncurkan.
Pada **9 Februari**, lebih dari 100 versi berbeda dari peta masker telah muncul.

Ini bukanlah proyek yang dipesan pemerintah kepada perusahaan TI, melainkan hasil dari "lembur sukarela" para programmer di seluruh Taiwan. **Setiap orang ingin berkontribusi dalam pencegahan pandemi, dan hal yang bisa dilakukan oleh programmer adalah menulis kode.**

Versi yang paling populer meliputi:

- **Taiwan Mask Map** oleh Howard Wu: Antarmuka peta yang ringkas dan jelas.
- **Masih Ada Masker? (還有口罩嗎)** oleh netizen kiang: Mengintegrasikan ulasan apotek dan informasi jam operasional.
- **Beli Masker di Mana (口罩哪裡買)** oleh Finjon Kiang: Mendukung fungsi pencarian suara.

Dalam 72 jam, Taiwan memiliki sistem pengecekan stok masker paling lengkap di dunia[^5]. **Saat warga di negara lain masih mengantre untuk berebut membeli, warga Taiwan sudah bisa mengecek melalui ponsel mereka berapa sisa masker di apotek terdekat.**

> **⚠️ Sudut Pandang Kontroversial**
> Ada kritik yang menyebut pemerintah "mengalihdayakan tanggung jawab kepada relawan" dengan membiarkan sektor swasta membuatkan sistem secara gratis. Namun, tanggapan komunitas g0v sangat lugas: Kami tidak dimanfaatkan oleh pemerintah; kami secara aktif memilih untuk memberikan kontribusi kepada masyarakat menggunakan keahlian kami. Terlebih lagi, peta masker open source jauh lebih berguna, inovatif, dan sesuai dengan kebutuhan pengguna dibandingkan sistem yang dibuat sendiri oleh pemerintah.

## Keajaiban Kolaborasi Open Source

Model operasional g0v sangat sederhana: **Tanpa bos, tanpa karyawan, tanpa anggaran, tanpa kantor.** Yang ada hanyalah sekelompok orang yang bersedia menggunakan teknologi untuk menyelesaikan masalah sosial, serta sebuah budaya kolaborasi open source.

### Budaya Hackathon

Setiap dua bulan sekali diadakan "Big Hack" (hackathon skala besar), di mana partisipan mengajukan proposal, membentuk tim, dan melakukan implementasi langsung di lokasi. Alurnya adalah:

1. **Proposal Tiga Menit**: Siapa pun boleh naik ke panggung untuk menyampaikan ide.
2. **Pembentukan Tim Bebas**: Orang yang tertarik dapat bergabung dengan proyek tersebut.
3. **Implementasi Langsung**: Mulai mengerjakan proyek pada hari itu juga.
4. **Presentasi Hasil**: Berbagi kemajuan yang dicapai pada sore hari.

**Tidak ada yang ditolak, tidak ada ide yang disangkal.** Satu-satunya syarat adalah: proyek harus bersifat open source agar orang lain dapat melanjutkan pengembangannya.

### Alat Kolaborasi

- **Saluran Slack**: Untuk diskusi harian dan berbagi informasi.
- **GitHub**: Manajemen kode dan kontrol versi[^6].
- **HackMD**: Dokumen kolaboratif dan notulensi rapat.
- **Trello**: Manajemen proyek dan pelacakan kemajuan.

### Tiga Semangat Inti

1. **Open Source**: Semua kode, data, dan dokumen proyek bersifat terbuka untuk publik.
2. **Desentralisasi**: Tidak ada hierarki kepemimpinan; siapa pun dapat memulai proyek.
3. **Implementasi adalah yang Utama**: "_Talk is cheap, show me the code_" (Bicara itu murah, tunjukkan kodenya).

> **💡 Tahukah Anda?**
> Komunitas g0v memiliki tradisi: setiap hackathon akan menyiapkan stiker "tupai kecil". Jika ini adalah pertama kalinya Anda berpartisipasi, Anda akan mendapatkan satu stiker tupai kecil. Desain ini menyiratkan bahwa meskipun Anda seorang pemula, Anda tetap disambut untuk memberikan sedikit kekuatan, seperti tupai yang mengumpulkan biji ek; setiap kontribusi kecil sangatlah penting.

## Proyek Penting dan Dampak Sosial

Selama 8 tahun, komunitas g0v telah menghasilkan ratusan proyek, banyak di antaranya berdampak langsung pada kebijakan pemerintah dan operasional sosial.

### Transparansi Prosedur Legislatif

**Risalah Sidang Legislatif** dulunya hanya tersedia dalam versi teks, sehingga masyarakat umum sulit memahami apa yang sebenarnya dilakukan oleh anggota legislatif di parlemen. Relawan g0v membangun platform "Transparansi Prosedur Legislatif" yang menyediakan:

- **Siaran Langsung**: Siaran langsung dari ruang sidang Legislatif.
- **Catatan Pidato**: Statistik dan pencarian konten pidato setiap anggota legislatif.
- **Catatan Pemungutan Suara**: Hasil pemungutan suara untuk undang-undang penting.
- **Pelacakan Proposal**: Proses lengkap sebuah rancangan undang-undang mulai dari pengajuan hingga pembacaan ketiga.

Hasilnya adalah: **Anggota legislatif mulai mempedulikan "data" mereka sendiri.** Tingkat kehadiran, jumlah interpelasi, dan jumlah proposal—angka-angka yang dulunya tidak dipedulikan siapa pun—kini telah dihitung oleh situs web untuk Anda. Perwakilan rakyat menyadari bahwa setiap gerak-gerik mereka diawasi, sehingga perilaku mereka mulai berubah.

### vTaiwan: Eksperimen Demokrasi Digital

Pada tahun 2014, g0v bekerja sama dengan pemerintah untuk meluncurkan platform vTaiwan[^7], yang memungkinkan warga berpartisipasi dalam proses pembuatan kebijakan. Kasus yang paling terkenal adalah kontroversi Uber:

Pada **tahun 2015**, operasional Uber di Taiwan memicu protes dari pengemudi taksi konvensional. Cara penanganan tradisional adalah pemerintah memutuskan secara sepihak, namun vTaiwan menyediakan jalan ketiga: membiarkan semua pemangku kepentingan berdialog di platform daring untuk menemukan solusi yang saling menguntungkan (_win-win solution_).

Setelah diskusi daring dan lokakarya fisik selama beberapa bulan, akhirnya terbentuklah kebijakan "Taksi Multidimensi" (多元計程車), yang melindungi hak pengemudi taksi konvensional sekaligus mengizinkan model layanan inovatif untuk tetap ada.

**Ini adalah pertama kalinya Taiwan menggunakan "demokrasi digital" untuk menyelesaikan sengketa kebijakan.**

### Penggerak Pemerintah Terbuka

Advokasi g0v berdampak langsung pada kebijakan pemerintah:

- **2012**: Proyek visualisasi anggaran mendorong pemerintah membuka data anggaran.
- **2013**: Proyek transparansi legislatif mendorong siaran langsung prosedur sidang parlemen.
- **2014**: Pasca Gerakan Bunga Matahari, pemerintah berkomitmen untuk mendorong revisi _Undang-Undang Keterbukaan Informasi Pemerintah_.
- **2015**: Platform vTaiwan menjadi saluran resmi partisipasi kebijakan pemerintah.
- **2016**: Audrey Tang menjabat sebagai Komisioner Digital, membawa pengalaman g0v ke dalam pemerintahan.

## Pengaruh dan Koneksi Internasional

Pengalaman g0v tidak hanya memengaruhi Taiwan, tetapi juga menginspirasi gerakan civic tech di seluruh dunia.

### Jaringan Code for All

g0v adalah anggota pendiri jaringan internasional **Code for All**[^8], yang bekerja sama erat dengan organisasi seperti Code for Japan, Code for Korea, dan Code for America di Amerika Serikat.

Pada **tahun 2019**, g0v summit diadakan di Taipei, mempertemukan komunitas civic tech dari lebih 30 negara untuk berbagi pengalaman dan teknologi.

### Kerja Sama Internasional Selama Pandemi

Selama pandemi tahun 2020, pengalaman peta masker g0v dipelajari oleh negara lain:

- **Italia**: Peta masker versi Roma.
- **Jerman**: Peta masker versi Berlin.
- **Amerika Serikat**: Peta PPE (Alat Pelindung Diri).
- **Korea Selatan**: 마스크맵 (_mask map_).

Relawan g0v juga secara proaktif membantu negara lain membangun sistem serupa, membagikan pengalaman teknologi pencegahan pandemi Taiwan kepada seluruh dunia.

## Tantangan dan Masa Depan

Sebagai "organisasi tanpa bos", g0v menghadapi tantangan yang dialami oleh semua komunitas open source.

### Keberlanjutan Proyek

Banyak proyek g0v adalah produk dari "momentum sesaat" dan kekurangan pemeliharaan jangka panjang. Peta masker sangat aktif selama pandemi, tetapi setelah pandemi berakhir, tidak ada lagi yang memeliharanya secara bertahap. **Bagaimana membuat proyek yang baik terus beroperasi adalah tantangan terbesar bagi g0v.**

### Kelelahan Partisipan

Partisipasi relawan dengan intensitas tinggi selama 8 tahun berturut-turut membuat beberapa kontributor awal mulai merasa lelah. Bagaimana menarik darah segar dan bagaimana membuat partisipasi lebih berkelanjutan adalah masalah yang harus dihadapi komunitas.

### Hubungan dengan Pemerintah

Hubungan g0v dengan pemerintah sangat halus: bekerja sama sekaligus mengawasi. Ketika pemerintah secara proaktif merangkul open source dan demokrasi digital, peran "perlawanan" g0v menjadi kabur. Bagaimana menjaga independensi dan semangat kritis di tengah kerja sama adalah tantangan yang berkelanjutan.

### Disinformasi dan Perang Informasi

Di era perang informasi, prinsip keterbukaan dan transparansi juga dapat disalahgunakan. Bagaimana tetap terbuka sambil menghindari menjadi saluran penyebaran disinformasi adalah tantangan baru.

## Sebuah Eksperimen yang Masih Berlanjut

Pada tahun 2012, saat Kao Chia-liang mengubah gov.tw menjadi g0v.tw, ia hanya ingin mengekspresikan ketidakpuasannya terhadap pemerintah. Dua belas tahun kemudian, g0v telah menjadi bagian dari demokrasi Taiwan dan juga kekuatan penting dalam gerakan civic tech di seluruh dunia.

Eksperimen ini membuktikan beberapa hal:

1. **Teknologi dapat menjadi alat partisipasi warga**, bukan sekadar sarana mencari keuntungan komersial.
2. **Keterbukaan dan transparansi lebih penting daripada efisiensi pemerintah**, karena transparansi akan membawa efisiensi.
3. **Kemarahan kecil dapat mengubah dunia**, asalkan Anda bersedia turun tangan melakukannya.
4. **Melakukan _fork_ terhadap pemerintah bukanlah menggulingkan pemerintah**, melainkan membuktikan adanya kemungkinan yang lebih baik.

Di era kemunduran demokrasi ini, g0v mengingatkan kita: **Warga negara bukanlah pengguna pemerintah, melainkan rekan pencipta.** Hal-hal yang tidak bisa dilakukan dengan baik oleh pemerintah, dapat kita lakukan sendiri. Hal-hal yang sudah dilakukan dengan baik oleh pemerintah, dapat kita bantu untuk menjadi lebih baik lagi.

Ini bukanlah sebuah revolusi yang telah berakhir, melainkan sebuah eksperimen yang terus berjalan. Setiap hackathon, setiap proyek baru, dan setiap baris kode sedang menjawab pertanyaan yang sama: Di era digital, seperti apa rupa demokrasi?

Jawabannya masih ditulis, dan setiap orang yang bersedia berkontribusi adalah penulis dari jawaban tersebut.

## Referensi

[^1]: [Situs Resmi g0v Zero Government](https://g0v.tw/) — Situs web komunitas g0v, memperkenalkan kegiatan hackathon dan model operasional berbagai proyek.

[^2]: [Folder Kolaborasi g0v hackfoldr](https://beta.hackfoldr.org/) — Platform kolaborasi dokumen dan data yang digunakan secara jangka panjang oleh komunitas g0v.

[^3]: [A Guide to Win Democracy Back: Civic Tech Project and Community Handbook (Friedrich Naumann Foundation, 2025-06-09)](https://www.freiheit.org/fr/node/49973) — Panduan civic tech yang disusun dengan partisipasi komunitas g0v dan diterbitkan oleh Yayasan Friedrich Naumann di Jerman; menyebutkan bahwa g0v adalah salah satu kekuatan terpenting dalam demokrasi digital Taiwan dan berpotensi menjadi templat dunia, mencakup kasus dari Korea Selatan, Thailand, Jepang, dan Jerman.

[^4]: [How digital innovation can fight pandemics and strengthen democracy (Audrey Tang, TED2020)](https://www.ted.com/talks/audrey_tang_how_digital_innovation_can_fight_pandemics_and_strengthen_democracy) — Audrey Tang berbicara di TED tentang bagaimana Taiwan menghindari _lockdown_ pada awal 2020 melalui alat digital, termasuk peta masker.

[^5]: [Wawancara Pengembang Peta Masker](https://www.ithome.com.tw/news/136038) — Wawancara iThome dengan pengembang peta masker, mencatat perjalanan pengembang dalam mendedikasikan diri pada proyek pencegahan pandemi.

[^6]: [Organisasi GitHub g0v](https://github.com/g0v) — Repositori kode dan catatan kolaborasi untuk proyek-proyek open source komunitas g0v.

[^7]: [Platform Demokrasi Digital vTaiwan](https://vtaiwan.tw/) — Platform diskusi kebijakan daring dan konsensus yang dikembangkan melalui kerja sama g0v dengan pemerintah.

[^8]: [Jaringan Internasional Code for All](https://codeforall.org/) — Situs resmi jaringan internasional Code for All yang menghubungkan organisasi civic tech di seluruh dunia.

## Topik Terkait

- [Open Culture Foundation (開放文化基金會)](/id/technology/open-culture-foundation): Yayasan di balik g0v yang menangani administrasi dan keuangan komunitas, serta kisah bagaimana ia berkembang menjadi penjaga hak digital.
- [Industri Semikonduktor](/id/technology/taiwan-semiconductor-industry): Fondasi kekuatan teknologi Taiwan.
- [Mini Taiwan Pulse](/id/technology/mini-taiwan-pulse-civic-tech): Implementasi open source pribadi untuk civic tech tahun 2026—menggunakan data terbuka TDX + Three.js untuk menggambar Taiwan dalam lintasan cahaya 3D.
