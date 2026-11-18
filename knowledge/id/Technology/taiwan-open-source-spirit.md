---
title: 'Semangat Open Source Taiwan — Insinyur yang Berkarya karena Cinta, Bukan Gaji'
description: 'Proyek open source paling berpengaruh di Taiwan bukan sebuah software, melainkan sekelompok insinyur yang berkata kepada pemerintah lewat hackathon: "Kalau kalian tidak becus, biar kami yang kerjakan."'
date: 2026-03-29
category: 'Technology'
tags:
  [
    'Sumber Terbuka',
    'g0v',
    'COSCUP',
    'GitHub',
    'Teknologi Sipil',
    'Perangkat Lunak Bebas',
  ]
subcategory: '社群與數位文化'
author: 'p3nchan'
featured: false
lastVerified: 2026-03-29
lastHumanReview: false
readingTime: 8
curation: 'incubating'
curationReason: 'unverified'
translatedFrom: 'Technology/台灣開源精神.md'
sourceCommitSha: '22286539'
sourceContentHash: 'sha256:8cc121a9cccbf90a'
sourceBodyHash: 'sha256:98feb4bab36f053f'
translatedAt: '2026-09-14T05:21:54+08:00'
---

> Skala industri software Taiwan memang tidak masuk jajaran dunia kelas satu, tapi pengguna GitHub yang menandai dirinya Taiwan sudah lebih dari 44.000 orang, hackathon komunitas terkumpul lebih dari 70 kali dengan ribuan kontributor — hampir semuanya pengembang individu yang merogoh kantong sendiri sepulang kerja. Artikel ini tidak cuma bicara soal g0v, tapi merangkai peta lengkap budaya open source Taiwan dari empat sudut: manusia, komunitas, pendidikan, dan industri.

---

## Hackathon yang Dipicu Sebuah Iklan

Oktober 2012, Yuan Eksekutif menayangkan iklan televisi 40 detik untuk mempromosikan "Program Pendorong Dinamika Ekonomi". Isi iklannya cuma satu kalimat: "Program ini memang rumit sekali, tidak bisa dijelaskan dengan beberapa kalimat sederhana."

Kao Chia-liang (高嘉良, clkao), lulusan Teknik Informatika NTU, menonton iklan itu lalu langsung menyalakan komputernya. Bersama beberapa teman ia ikut Yahoo! Open Hack Day, dadakan ganti topik, dan dalam tiga hari menulis proyek "Visualisasi Anggaran Pemerintah Pusat" yang meraih honorable mention. Dua bulan kemudian, Kao mendaftarkan g0v.tw, memakai uang hadiahnya untuk menggelar "Hackathon Mobilisasi Darurat ke-Nol".

Nama g0v adalah pelesetan gov (pemerintah) dengan huruf o diganti 0. Maknanya langsung: kalau kalian tidak becus, biar kami yang kerjakan.

Ini bukan organisasi. g0v tidak punya kantor, tidak punya dewan direksi, tidak punya karyawan tetap. Ia adalah komunitas terdesentralisasi yang hidup lewat hackathon dua bulanan. Sampai akhir 2025, hackathon sudah digelar lebih dari 70 kali, ada lebih dari 8.000 anggota di Slack, dan lebih dari 4.500 catatan kolaborasi terkumpul di HackMD.

---

## 72 Jam, 100 Aplikasi

Momen g0v paling dikenal dunia internasional terjadi pada 2020.

Di awal wabah COVID-19, Taiwan menerapkan sistem pembelian masker dengan kartu identitas. Kementerian Kesehatan dan Kesejahteraan merilis API terbuka untuk stok masker apotek, dan Menteri Digital saat itu, Audrey Tang (唐鳳), mengumumkannya di kanal chat g0v. 72 jam berikutnya, komunitas pengembang Taiwan meledak dengan energi kolaborasi yang belum pernah terjadi sebelumnya: Chiang Ming-chung (kiang) membuat peta stok masker apotek, Jarvis Lin membuat aplikasi Android, dan bot chat LINE juga rilis di hari yang sama.

Dalam seminggu, aplikasi terkait pencarian masker sudah lebih dari 100. Insinyur yang ikut terlibat diperkirakan mendekati seribu orang.

_Foreign Affairs_ menerbitkan artikel khusus berjudul _Civic Technology Can Help Stop a Pandemic_, menyebut Taiwan menunjukkan jalan ketiga yang berbeda dari pengawasan gaya Tiongkok maupun raksasa teknologi Barat: inovasi demokrasi yang digerakkan oleh teknologi sipil (civic tech). Laporan Sekolah Kedokteran Stanford mencatat 124 intervensi independen yang diterapkan Taiwan selama masa pandemi. NPR, MIT Technology Review, dan Harvard Business Review sama-sama menurunkan liputan khusus.

Ini bukan jasa pemerintah, dan bukan cuma jasa Audrey Tang. Ini adalah sekelompok insinyur tanpa gaji yang membuka laptop di akhir pekan.

---

## Sebelum Audrey Tang: Akar Open Source Taiwan

g0v bisa terbentuk secepat itu pada 2012 karena Taiwan sudah punya tanah open source yang disuburkan selama dua puluh tahun.

Audrey Tang belajar Perl sejak umur 12 tahun, putus sekolah dan mulai berwirausaha di umur 14. Sebelum masuk pemerintahan, ia menginisiasi lebih dari 100 proyek di CPAN (platform modul Perl), memimpin Pugs — versi pertama yang bisa jalan dari implementasi Perl 6 memakai Haskell — dan mengembangkan EtherCalc bersama Dan Bricklin, bapak spreadsheet. Ia diakui sebagai salah satu pemimpin komunitas Perl dan Haskell, dan pengaruhnya di dunia open source internasional jauh mendahului karier politiknya.

Hong Jen-yu (洪任諭, PCMan) adalah sosok representatif lainnya. Ia dokter penyakit dalam yang belajar pemrograman otodidak sejak SMA dan menulis software koneksi BBS bernama PCMan. Tahun 2006 ia memulai proyek LXDE — lingkungan desktop Linux yang ringan. LXDE pernah menjadi lingkungan desktop mainstream dengan pemakaian memori paling rendah di dunia, dipakai oleh distro seperti Knoppix dan Lubuntu. Sebuah lingkungan desktop buatan dokter Taiwan, berjalan di mesin Linux di seluruh dunia. Hong kemudian bergabung dengan Google, tapi kisah LXDE menunjukkan ciri khas kontributor open source Taiwan: pekerjaan utamanya bukan software, tapi memakai waktu luang membuat proyek kelas dunia.

Huang Ching-chun (黃敬群, jserv) mengambil jalan berbeda. Ia mengembangkan software sistem di MediaTek dan Andes Technology, lalu mengajar di Departemen Teknik Informatika Universitas Cheng Kung, membuka mata kuliah "Desain Kernel Linux" — satu-satunya mata kuliah universitas di Taiwan yang membedah kernel Linux terbaru secara sistematis. Murid-muridnya langsung mengirim patch ke Linux, glibc, GCC, dan LLVM. Ia berulang kali menjadi pembicara di COSCUP dan FOSDEM di Eropa. jserv mewakili bukan kontributor tipe "jenius", melainkan upaya menanamkan praktik open source ke dalam sistem pendidikan.

---

## Ekosistem Komunitas: Bukan Cuma COSCUP

Kepadatan komunitas open source Taiwan tergolong luar biasa di Asia.

**COSCUP** (Conference for Open Source Coders, Users and Promoters) berjalan sejak 2006, konferensi open source tahunan terbesar di Taiwan. Sampai 2024, jumlah pesertanya sudah lebih dari 2.800 orang, dengan lebih dari 40 community room yang mencakup topik seperti Kubernetes, PostgreSQL, Ruby, Python, dan Blockchain. Tiap community room punya sekitar 6 jam waktu acara yang dikurasi sendiri oleh komunitasnya masing-masing. COSCUP tidak memungut tiket masuk. Relawannya lebih dari seratus orang, semuanya tanpa bayaran. 2025 adalah COSCUP ke-20.

**SITCON** (Students' Information Technology Conference) berjalan sejak 2013, sepenuhnya diinisiasi dan diorganisasi oleh mahasiswa. Maknanya sederhana: menunjukkan pada anak SMA berusia 18 tahun bahwa mereka tidak perlu menunggu lulus dulu untuk ikut serta dalam open source. SITCON menggelar konferensi tahunan tiap Maret, ditambah HackGen di tengah semester, kemah musim panas, dan pertemuan dua mingguan.

**PyCon TW** adalah konferensi tahunan komunitas Python yang mengumpulkan pengguna Python lintas bidang. **MozTW** adalah komunitas relawan Mozilla Taiwan yang sejak 2004 merawat versi bahasa Mandarin tradisional Firefox, menjalankan program duta kampus dan kelompok penerjemah subtitle. Ruang komunitas "Mozilla Space" di Taipei beroperasi dari 2014 sampai 2023, dan setelah sponsor Mozilla berhenti, tetap bertahan lewat donasi lokal.

Ada banyak partisipasi silang antar komunitas ini. Orang yang sama bisa jadi pembicara COSCUP, kontributor g0v, dan relawan PyCon TW sekaligus. Lingkaran open source Taiwan tidak besar, tapi kepadatannya tinggi.

---

## Warisan dan Keterputusan Institusi

Taiwan pernah punya upaya pemerintah untuk mendorong open source.

Tahun 2003, Institute of Information Science, Academia Sinica menerima subsidi dari Biro Industri Kementerian Urusan Ekonomi dan mendirikan "Open Source Software Foundry" (OSSF, 自由軟體鑄造場). OSSF menyediakan hosting proyek, konsultasi hukum, dan promosi lewat newsletter, membina komunitas open source lokal selama lebih dari sepuluh tahun. Tahun 2015, Kementerian Sains dan Teknologi memutuskan menghentikan subsidi, OSSF pun berhenti beroperasi, dan situsnya baru benar-benar ditutup akhir 2021.

Hilangnya OSSF tidak membuat aktivitas open source Taiwan menurun — justru ini membuktikan energi open source Taiwan memang tidak pernah bergantung pada pemerintah. Yang benar-benar menopang ekosistem ini adalah "Open Culture Foundation" (OCF, 開放文化基金會) yang didirikan tahun 2014. OCF didirikan bersama oleh berbagai komunitas open source, berbentuk yayasan nirlaba, dan berperan sebagai pengelola keuangan komunitas: menerbitkan invoice untuk COSCUP, mengurus donasi untuk berbagai proyek, dan memberi konsultasi hukum soal lisensi open source. OCF juga bekerja sama dengan lembaga internasional seperti AIT, Kantor Dagang dan Kebudayaan Inggris di Taipei, dan Bank Dunia, membawa pengalaman teknologi sipil Taiwan ke kancah internasional.

Struktur ini menarik: program pemerintah berakhir, yayasan sipil yang mengambil alih. Institusinya tumbuh dari bawah ke atas.

---

## Alasan Struktural di Balik "Kerja karena Cinta"

Sebagian besar kontributor open source Taiwan adalah individu. Tidak ada perusahaan open source sekelas Red Hat, tidak ada program sponsor korporat sebesar Google Summer of Code; keterlibatan perusahaan teknologi dalam open source kebanyakan sebatas "mengizinkan karyawan mengerjakannya di waktu luang", bukan "memasukkan open source ke dalam KPI".

Kenapa begitu?

Industri teknologi Taiwan berporos pada manufaktur kontrak hardware dan desain IC. Model bisnis TSMC, MediaTek, dan Foxconn dibangun di atas kemampuan produksi dan benteng paten, bukan kode sumber terbuka. Dalam ekosistem ini, software sering kali cuma jadi "pelengkap hardware", bukan sumber pendapatan yang berdiri sendiri. Dari ribuan perusahaan layanan software, sembilan dari sepuluh mengerjakan integrasi sistem, melayani pasar domestik.

Hasilnya: orang yang menulis kode banyak, tapi yang "hidup dari open source" hampir tidak ada. Open source jadi urusan sepulang kerja, urusan kumpul komunitas, urusan hackathon hari Sabtu. Di daftar sponsor COSCUP, perusahaan asing (Google, LINE, Trend Micro) lebih banyak muncul dibanding perusahaan lokal.

Ini bukan sepenuhnya hal buruk. Justru karena open source bukan KPI, motivasi pesertanya jadi lebih murni. Peta stok masker g0v bisa meledak dalam 72 jam bukan karena ada yang memberi perintah kerja, tapi karena seribu insinyur merasa "ini harus dikerjakan".

Tapi model ini punya batas. Tanpa investasi berkelanjutan level korporat, proyek gampang mandek begitu maintainer utamanya kelelahan. Taiwan tidak kekurangan weekend hacker, yang kurang adalah posisi kerja penuh waktu di bidang open source.

---

## Kekuatan Diam dari 44.000 Orang

Pengguna GitHub yang menandai dirinya Taiwan berjumlah 44.408 orang (data Maret 2026). Dibutuhkan minimal 67 follower untuk masuk papan peringkat Taiwan di committers.top. Dengan populasi Taiwan 23 juta jiwa, angka ini berarti setiap 500 orang Taiwan ada satu akun GitHub aktif. Dibandingkan Jepang, Singapura, dan Hong Kong, tingkat aktivitas GitHub per kapita pengembang Taiwan termasuk papan atas Asia.

Yang lebih layak diperhatikan bukan angkanya, tapi jenis kontribusinya. Peran pengembang Taiwan di proyek internasional sering kali jadi "infrastruktur tak terlihat": patch kernel, optimisasi compiler, terjemahan lokalisasi, penulisan dokumentasi. Mahasiswa Universitas Cheng Kung langsung mengirim kode ke kernel Linux. MozTW merawat versi Mandarin Firefox selama dua puluh tahun. Kontribusi seperti ini tidak akan jadi berita, tapi tanpanya software tidak akan bisa dipakai.

Komunitas open source Taiwan juga punya satu ciri langka di Asia: g0v menerapkan metodologi open source pada kebijakan publik. Platform vTaiwan memakai teknologi Polis untuk deliberasi daring, menangani lebih dari 30 isu termasuk regulasi Uber dan aturan fintech. _MIT Technology Review_ menyebutnya "sistem sederhana tapi cerdik yang dipakai Taiwan untuk crowdsource hukumnya". Ini sudah bukan lagi soal menulis kode — ini adalah menerapkan logika kolaborasi open source ke tata kelola demokrasi.

Open source di Taiwan tidak pernah sekadar urusan komunitas teknis. Ia adalah sebuah sikap: lihat masalahnya, buka editornya, lalu mulai menulis.

---

## Referensi

1. [Buku Panduan Proyek dan Komunitas Teknologi Sipil g0v](https://g0v.hackmd.io/@jothon/ctpbook) (sumber primer)
2. [2020, Tahun Penuh Gejolak: Kontribusi g0v Tak Cuma "Peta Masker"](https://www.gvm.com.tw/article/76428) — Global Views Monthly
3. [Civic Technology Can Help Stop a Pandemic](https://www.foreignaffairs.com/articles/asia/2020-03-20/how-civic-technology-can-help-stop-pandemic) — Foreign Affairs (sumber berbahasa Inggris)
4. [Kekuatan Hacker Sipil, g0v Pemerintah Nol](https://www.taiwan-panorama.com/Articles/Details?Guid=61281c3d-f79c-4db7-93d9-d18b29f90ba0) — Taiwan Panorama
5. [Audrey Tang, Pemimpin Komunitas Open Source Internasional: Open Source Adalah Paradigma Pertukaran Era Baru](https://www.ithome.com.tw/news/93603) — iThome
6. [Hong Jen-yu — Wikipedia](https://zh.wikipedia.org/zh-tw/%E6%B4%AA%E4%BB%BB%E8%AB%AD)
7. [Huang Ching-chun — Wikipedia](https://zh.wikipedia.org/zh-tw/%E9%BB%83%E6%95%AC%E7%BE%A4)
8. [Open Source Software Foundry — Wikipedia](https://zh.wikipedia.org/zh-tw/%E8%87%AA%E7%94%B1%E8%BB%9F%E9%AB%94%E9%91%84%E9%80%A0%E5%A0%B4)
9. [About OCF — Open Culture Foundation](https://ocf.tw/en/p/what_is_ocf_en.html)
10. [committers.top — Most active GitHub users in Taiwan](https://committers.top/taiwan.html)
11. [COSCUP — Wikipedia](https://en.wikipedia.org/wiki/COSCUP)
12. [The simple but ingenious system Taiwan uses to crowdsource its laws](https://www.technologyreview.com/2018/08/21/240284/the-simple-but-ingenious-system-taiwan-uses-to-crowdsource-its-laws/) — MIT Technology Review

---

## Bacaan Lanjutan

- [Komunitas Sumber Terbuka dan g0v](/id/technology/open-source-and-g0v) — narasi kolektif tentang fork pemerintah
- [Sejarah Migrasi Komunitas Internet Taiwan](/id/technology/taiwan-online-community-migration) — sejarah lintas generasi dari BBS ke Discord
- [Mini Taiwan Pulse](/id/technology/mini-taiwan-pulse-civic-tech) — wujud open source personal dalam teknologi sipil, enam minggu 193 commit mengubah data terbuka jadi jejak cahaya 3D
- [Dua Pedang Softstar](/id/technology/softstar-twin-classics) — kisah Taiwan lain soal "berkarya melampaui skala karena semangat" (RPG yang lahir dari Guanghua Market)
- [Peta Zhongyue Taiwan](/id/technology/into-the-cellar-taiwan-game-podcast) — komunitas 6 juta anggota yang tumbuh dari asrama Universitas Central
