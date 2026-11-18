---
title: 'Isu Penamaan Taiwan dalam Standar Internasional'
description: 'Dari kode ISO hingga perangkat lunak sumber terbuka—bagaimana nama Taiwan ditulis, diperdebatkan, dan dikoreksi dalam infrastruktur digital global'
date: 2026-03-18
category: 'Society'
tags:
  [
    'ISO 3166',
    'standar internasional',
    'perangkat lunak sumber terbuka',
    'g0v',
    'kedaulatan digital',
    'penamaan Taiwan',
  ]
subcategory: '國際關係'
author: 'Taiwan.md Contributors'
featured: false
lastVerified: 2026-03-19
lastHumanReview: false
curation: 'incubating'
curationReason: 'unverified'
translatedFrom: 'Society/台灣在國際標準中的標示問題.md'
sourceCommitSha: 'be13f045'
sourceContentHash: 'sha256:c6d4e2074d20efa4'
sourceBodyHash: 'sha256:234ae4c6ee15c7e0'
translatedAt: '2026-09-27T05:04:34+08:00'
---

# Isu Penamaan Taiwan dalam Standar Internasional

> **Ringkasan 30 Detik:** Dalam infrastruktur digital global, Taiwan sering ditandai sebagai "Taiwan, Provinsi Tiongkok". Penandaan ini berasal dari lanskap politik internasional setelah Resolusi Majelis Umum PBB ke-2758 pada tahun 1971, yang memengaruhi standar internasional seperti ISO 3166 dan meluas ke perangkat lunak sumber terbuka serta layanan web global. Komunitas sumber terbuka secara berkelanjutan mendorong metode penandaan yang lebih netral melalui laporan bug dan permintaan tarik (pull request).

Cara penamaan Taiwan dalam infrastruktur digital global mencerminkan perbedaan politik selama setengah abad. Di balik detail teknis, mulai dari ISO 3166 hingga antarmuka pilihan situs cermin Ubuntu, terdapat sengketa yang belum terselesaikan mengenai pengakuan identitas Taiwan dalam sistem internasional.

## Konteks Sejarah: PBB 2758 hingga ISO 3166

Pada tahun 1971, Resolusi Majelis Umum PBB ke-2758 disahkan, yang menentukan bahwa kursi Tiongkok di Perserikatan Bangsa-Bangsa akan ditempati oleh perwakilan Republik Rakyat Tiongkok, sehingga Republik Tiongkok kehilangan kursi PBB. Meskipun resolusi ini awalnya hanya menyangkut kursi delegasi PBB, ia kemudian secara luas dirujuk sebagai dasar pengecualian atau penandaan Taiwan dengan cara tertentu dalam berbagai organisasi internasional dan badan penetapan standar.[^1]

ISO 3166 pertama kali diterbitkan pada Desember 1974, dan nama entitas untuk Taiwan sejak saat itu adalah "Taiwan, Provinsi Tiongkok", yang masih digunakan hingga kini. ISO 3166-1 juga memberikan kode dua huruf `TW` untuk Taiwan, tetapi sengketa atas nama resmi ini terus berlanjut.

Posisi ISO mengikuti basis data geografi dari Biro Statistik PBB (UNSD), dan penandaan terakhir merujuk pada lanskap politik pasca PBB 2758. Hal ini menciptakan sistem yang saling bergantung: standar internasional mengutip data PBB, perangkat lunak sumber terbuka mengutip standar internasional, dan akhirnya "Taiwan, Provinsi Tiongkok" muncul di menu tarik-turun para pengembang global.[^2]

## Tindakan Koreksi Komunitas Perangkat Lunak Sumber Terbuka

Bug #1138121 Ubuntu (dilaporkan pada tahun 2013) adalah salah satu kasus yang paling sering dikutip. Ketika pengguna Taiwan melihat "Taiwan, Provinsi Tiongkok" di antarmuka saat memilih situs cermin sumber perangkat lunak, banyak orang merasa terganggu. Pelapor menyarankan penggunaan kolom nama umum dalam ISO 3166, yaitu hanya "Taiwan", bukan nama resmi lengkap.

Masalah serupa juga berulang kali muncul di proyek sumber terbuka lainnya. Issue #43 dari ISO-3166-Countries-with-Regional-Codes, PR FreeBSD 138672, dan Drupal Issue #1938892 semuanya mencatat keberatan komunitas terhadap penandaan ini. Solusinya biasanya adalah menggunakan data CLDR (Unicode Common Locale Data Repository), yang memiliki penandaan yang lebih netral untuk Taiwan.[^3]

Tindakan koreksi oleh komunitas sumber terbuka mencerminkan persimpangan antara teknologi dan politik: pengembang umumnya ingin menggunakan penandaan yang lebih netral, tetapi dibatasi oleh pertimbangan "mengikuti standar internasional," sehingga modifikasi sering memerlukan diskusi komunitas yang panjang, dan beberapa pemelihara memilih untuk menghindari isu ini. Anggota komunitas g0v, chewei, telah mengumpulkan kasus-kasus terkait dalam jangka waktu lama, mencatat luasnya masalah penamaan Taiwan dalam ekosistem perangkat lunak global.

## Dampak Penamaan yang Lebih Luas

Di forum resmi organisasi internasional, masalah penamaan Taiwan memiliki cakupan yang lebih luas. Di Sidang Kesehatan Dunia (WHA), Taiwan pernah diundang dengan status "Chinese Taipei" sebagai pengamat selama periode 2009 hingga 2016 (total delapan kali); sejak tahun 2017, Tiongkok menolak partisipasi Taiwan dan undangan terhenti, sehingga Taiwan tidak pernah menerima undangan resmi lagi.[^6] Di Organisasi Penerbangan Sipil Internasional (ICAO), Taiwan juga gagal berpartisipasi dalam pengambilan keputusan sebagai anggota resmi, secara jangka panjang mengandalkan saluran informal untuk mendapatkan informasi standar penerbangan, yang menciptakan celah potensial dalam sirkulasi informasi keselamatan penerbangan. Dalam Olimpiade, Taiwan berkompetisi sejak tahun 1981 dengan nama "Chinese Taipei"—nama ini berasal dari Kesepakatan Lausanne yang ditandatangani oleh Komite Olimpiade Internasional dan Komite Olimpiade Tiongkok pada tahun 1981. Solusi kompromi ini juga diadopsi oleh banyak organisasi internasional non-pemerintah dan meluas ke acara seperti APEC.

Masalah penamaan memiliki perluasan baru di era digital. Selain ISO 3166, kode bank SWIFT, kode bandara ICAO, dan basis data geografi pemerintah negara masing-masing, semuanya memiliki cara penandaan Taiwan yang berbeda, tanpa standar tunggal.

Penandaan resmi ISO 3166-1 sendiri belum berubah hingga saat ini; bagaimana setiap perusahaan dan proyek perangkat lunak menampilkan Taiwan masih ditentukan secara kasus per kasus.

## Perubahan Sampul Paspor 2020

Pada **2 September 2020**, Kementerian Luar Negeri Republik Tiongkok (Taiwan) mengumumkan desain paspor baru: tulisan "REPUBLIC OF CHINA" di sampul yang sebelumnya terlihat jelas diperkecil (meskipun lambang negara tetap ada), sementara kata "TAIWAN" diperbesar secara signifikan agar sejajar dengan "REPUBLIC OF CHINA". Perubahan ini merupakan respons terhadap insiden wisatawan Taiwan ditolak masuk di berbagai negara karena disalahartikan sebagai warga Tiongkok selama pandemi COVID-19, menjadikannya tanggapan pertama pemerintah Taiwan terhadap masalah konkret "kebingungan penandaan kedaulatan." Paspor edisi baru mulai diterbitkan pada **Januari 2021**.[^4]

## Sengketa Chinese Taipei di Olimpiade Paris 2024

Selama **Olimpiade Paris Juli-Agustus 2024**, Taiwan berkompetisi dengan nama "Chinese Taipei," tetapi masyarakat Tiongkok menerjemahkan nama tersebut sebagai "Tiongkok Taipei" di berbagai platform sosial, yang jelas berbeda dari terjemahan resmi Olimpiade ("Chinese Taipei = Chinese Taipei"). Insiden seperti penyerbuan bendera oleh penonton Tiongkok dan gangguan terhadap delegasi Taiwan oleh pemimpin Tiongkok selama Olimpiade memicu refleksi ulang masyarakat Taiwan terhadap Kesepakatan Lausanne tahun 1981.[^5]

## Kasus Tekanan Perusahaan Lintas Negara

Ekspansi tekanan Tiongkok mengenai "Prinsip Satu Tiongkok" meluas secara signifikan ke ranah perusahaan lintas negara pada akhir dekade 2010-an. **China Airlines** telah lama menggunakan nama "China Airlines," yang memicu sengketa internal identitas nasional Taiwan (sekitar 40.000 orang merespons petisi di Change.org untuk "mengganti nama China Airlines" selama diplomasi masker pandemi tahun 2020). Perusahaan seperti **Delta Air Lines**, **Marriott**, **United Airlines**, dan **Zara** pernah ditekan oleh Biro Penerbangan Sipil Tiongkok atau Komisi Keamanan Siber karena mencantumkan "Taiwan" sebagai negara di situs web mereka, memaksa mereka untuk mengubahnya menjadi "China Taiwan" atau "Wilayah Taiwan Tiongkok." Kasus-kasus ini menunjukkan bahwa "kekuatan politik standar ISO" telah meluas dari ranah teknis ke alat tekanan geopolitik.

## Perspektif: Sudut Pandang Tiongkok

Dari sudut pandang resmi Republik Rakyat Tiongkok, "Prinsip Satu Tiongkok" adalah dasar politik hubungan lintas selat, yang menyatakan bahwa Republik Rakyat Tiongkok adalah satu-satunya pemerintahan yang sah di Tiongkok dan Taiwan adalah salah satu provinsi dari Republik Rakyat Tiongkok (dengan tingkat administratif "Provinsi Taiwan"). Sudut pandang ini secara langsung memengaruhi penandaan ISO 3166 terhadap Taiwan sebagai "Taiwan, Provinsi Tiongkok" sejak tahun 1974. Memahami masalah Taiwan dalam standar internasional memerlukan pemahaman simultan tentang posisi oposisi pemerintah Republik Tiongkok (Taiwan), klaim Republik Rakyat Tiongkok, dan spektrum pengakuan yang beragam di masyarakat Taiwan—ketiganya tidak selaras dan tidak dapat disederhanakan.

## Menara Babel Kedaulatan: pelestarian kedaulatan

Masalah penandaan Taiwan dalam standar internasional pada dasarnya adalah masalah **infrastruktur pelestarian kedaulatan**. Memastikan adanya suara orang pertama (first-person voice) Taiwan di setiap bahasa, sistem, dan basis data adalah cara untuk memastikan Taiwan terus terlihat sebagai subjek politik independen di era informasi. Setiap laporan bug, setiap permintaan tarik, dan setiap pembaruan desain paspor adalah batu bata dari infrastruktur ini.

## Referensi

[^1]: [Resolusi Majelis Umum PBB ke-2758 (1971)](<https://undocs.org/zh/A/RES/2758(XXVI)>) — Teks lengkap resolusi yang menentukan bahwa kursi delegasi di Perserikatan Bangsa-Bangsa akan ditempati oleh perwakilan Republik Rakyat Tiongkok.

[^2]: [Agen Pemeliharaan ISO 3166 — Platform Penjelajahan Online](https://www.iso.org/obp/ui/#iso:code:3166:TW) — Entri Taiwan dalam ISO 3166-1, termasuk kode TW dan nama resmi.

[^3]: [Ubuntu Launchpad — Bug #1138121](https://bugs.launchpad.net/ubuntu/+source/software-properties/+bug/1138121) — Laporan asli mengenai masalah penandaan Taiwan pada antarmuka sumber perangkat lunak Ubuntu, tahun 2013.

[^4]: [Sampul Paspor Baru Memperbesar Kata TAIWAN Diterbitkan Januari Tahun ke-110](https://www.cna.com.tw/news/firstnews/202009020019.aspx) — Liputan Central News tanggal 2 September 2020, di mana Kementerian Luar Negeri mengumumkan desain sampul paspor baru dengan kata TAIWAN yang diperbesar dan diterbitkan pada Januari 2021.

[^5]: [Komite Olimpiade Internasional — Kesepakatan Olimpiade Chinese Taipei](https://www.olympic.org/) — Kesepakatan Lausanne tahun 1981 menetapkan nama "Chinese Taipei"; sengketa muncul selama Olimpiade Paris 2024 karena terjemahan Tiongkok yang salah menjadi "Tiongkok Taipei".

[^6]: [Departemen Kesehatan dan Kesejahteraan Republik Tiongkok (Taiwan) — Penjelasan Partisipasi Taiwan di WHO](https://www.mohw.gov.tw/) — Taiwan menghadiri WHA sebagai pengamat dari tahun 2009 hingga 2016, dan tidak pernah diundang lagi sejak 2017; latar belakang pengecualian ICAO dijelaskan dalam dokumen terkait Kementerian Luar Negeri.

## Bacaan Lanjutan

- [Komunitas g0v — Kompilasi Masalah Penamaan Taiwan](https://g0v.hackmd.io/5YRoMhveTt-aXwH60T2NZg) — Basis data kasus penandaan perangkat lunak sumber terbuka yang dikumpulkan oleh chewei
- [Platform Pencarian Online ISO 3166](https://www.iso.org/obp/ui/#iso:code:3166:TW) — Tempat untuk mencari penandaan Taiwan dalam ISO 3166-1
