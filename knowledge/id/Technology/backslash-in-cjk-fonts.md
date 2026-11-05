---
title: "Backslash di dalam karakter 'fung': Dua lapis pajak default yang dibayar insinyur Taiwan setiap hari"
description: "Di Windows 11 dengan locale zh-TW, skrip status terjemahan melempar lebih dari empat ribu jalur yang terdeteksi ke root, membuat Technology menjadi nol, padahal CI Linux pada minggu yang sama hijau. Skrip menggunakan slash forward untuk memisahkan nama kategori, sedangkan disk menggunakan backslash, sehingga tidak bisa memisahkannya. Lapisan yang lebih tua tertanam di dalam karakter: byte kedua karakter 'fung' dalam Big5 adalah backslash ASCII, yang disebut komunitas pengembang sebagai 'He Gong Gai'. Bagaimanapun cara menulis jalur dan simbol apa yang ada di dalam karakter, nilai default tidak memasukkan mesin ini. quotePath Git adalah masalah lain dengan penyebab yang berbeda."
date: 2026-08-13
category: 'Technology'
tags:
  [
    'sumber terbuka',
    'Windows',
    'Big5',
    'UTF-8',
    'pengkodean karakter',
    'Tionghoa Tradisional',
  ]
subcategory: '文字與工具'
author: 'Taiwan.md Contributors'
featured: false
lastVerified: 2026-08-13
lastHumanReview: false
image: '/article-images/technology/big5-gong-5c-backslash.webp'
imageAlt: "Karakter besar 'fung' di sampingnya kode Big5-nya A5 dan 5C dua kotak, kotak 5C dengan panah menunjuk ke backslash ASCII 0x5C; di bawahnya adalah output Python sebenarnya, byte kedua dari tiga karakter 'He Gong Gai' semuanya adalah backslash"
imageCredit: 'Taiwan.md Contributors（自製圖解）· CC BY-SA 4.0'
curation: 'incubating'
curationReason: 'unverified'
translatedFrom: 'Technology/功字裡的那根反斜線.md'
sourceCommitSha: 'ef8369eef'
sourceContentHash: 'sha256:dbee36211f1b2080'
sourceBodyHash: 'sha256:cfc0fe9c1ed37efb'
translatedAt: '2026-11-05T06:52:22.471849+00:00'
---

> **Ringkasan 30 Detik:** Saya menjalankan skrip status terjemahan, layar menampilkan 4546, semuanya di `root`. GitHub CI di Linux hijau. Baru kemudian saya sadar dua hal. Backslash jalur Windows, skrip memakai forward slash tidak bisa memisahkannya. Kode Big5 karakter「功」 bagian kedua, **sendiri adalah** ASCII `\`. Kedua hal mekanismenya berbeda, tapi sering muncul bersama di satu mesin Windows tradisional China yang sama.

Saya memelihara skrip status terjemahan Taiwan.md di Windows 11 bahasa zh-TW. Malam itu seperti biasa jalankan `i18n-status.py`, tunggu terminal mencetak angka. Konsol adalah cp950. Output tidak ada teks merah.

Layar berhenti di 4546. Semua di satu kategori bernama `root`. Technology adalah 0.

Minggu yang sama push ke GitHub, CI di Linux lampu hijau.

Variabel skrip bernama `zh_articles`, memindai `knowledge` kecuali direktori bahasa Inggris, about, dan underscore, bahasa Jepang, Korea, Arab juga dihitung. Malam itu ia bahkan nama kategori tidak bisa potong, empat ribu lebih jalur masuk ke satu kotak sama. Tidak ada pengecualian, tidak ada peringatan. Statistik kelihatannya seperti seluruh situs rusak, file tidak satu pun kurang.[^8]

Jalur di disk adalah `knowledge\Technology\artikel-tertentu.md`, antar folder dipisah backslash. Skrip pakai `split('/')` ambil nama kategori. Di Linux baris ini bisa, karena jalur memang pakai forward slash. Di Windows ia tidak memotong backslash, seluruh jalur kembali utuh, artikel dilempar ke `root` default.[^1]

Setelah biarkan `pathlib` urus direktori, Technology di bawahnya 59 artikel, konsisten dengan isi folder. Di antara hanya terpisah satu asumsi: mesin Anda pakai garis mana memisahkan folder.

![Output terminal Python aktual: jalur Windows sama dipotong split('/') mengembalikan list satu elemen; diserahkan ke PureWindowsPath(p).parts, memotong knowledge, Technology, nama file tiga segmen](/article-images/technology/windows-path-split-vs-pathlib.svg)

_Satu jalur, dua cara potong. `split('/')` tidak temui forward slash, seluruhnya kembali utuh; `PureWindowsPath` kenal backslash, Technology baru kembali. Taiwan.md Contributors buat sendiri, CC BY-SA 4.0._

> **📝 Catatan Kurator:** Sintaks skrip tidak salah, CI memang jalan tes. Retaknya di antara「mesin tempat penulis duduk」dan「mesin yang dikira alat tempat Anda duduk」. Celah ini tidak milik tahap manapun, jadi tidak ada yang bertanggung jawab memantau.

## Garis di dalam 'Gong'

Path adalah lapisan pertama. Lapisan kedua jauh lebih tua, tertanam di dalam karakter.

Big5 disepakati pada 1984, satu karakter Tionghoa dua byte. Jika byte kedua jatuh di `0x40` hingga `0x7E`, akan tumpang tindih dengan simbol ASCII umum: `[`, `]`, `{`, `}`, `\`, `|`. Mantan Wakil Kepala Jurusan Manajemen Informasi Universitas Teknologi Chaoyang, Hong Chao-gui (pensiun Agustus 2023), pernah menulis di halaman pengajarannya: "Karena 40-7E adalah rentang kode ASCII untuk karakter umum, hal ini terkadang membawa kesulitan bagi programmer."[^2]

Kode karakter 'Gong' adalah `A5 5C`. Byte kedua `0x5C` dalam ASCII adalah backslash `\`. Program yang memindai string per byte dan memperlakukan `\` sebagai escape atau pemisah, saat memindai bagian kedua 'Gong', akan mengira menemukan path. Nama file yang mengandung 'Gong', path yang mengandung 'Gong', keduanya bisa tersandung di sini.

Komunitas pengembang Taiwan dan Hong Kong menyebutnya 'Xu Gong-gai': 'Xu' adalah `B3 5C`, 'Gong' adalah `A5 5C`, 'Gai' adalah `BB 5C`, tiga karakter umum yang ditulis berurutan mirip nama orang.[^5] Hong Chao-gui juga mencantumkan 'Jia Ye Cheng Zhen Gong', byte kedua masing-masing menabrak `[`, `]`, `{`, `}`, `\`, dan membuat alat pemindaian `b5tm`.[^2] Sebuah bug diberi nama orang, biasanya karena muncul cukup sering, sehingga satu generasi harus punya cara menunjuk dan membicarakannya.

2015, penulis blog 'Darkthread' beralih ke Visual Studio 2015. File `.cs` lama masih disimpan sebagai BIG5. Setelah compiler beralih ke Roslyn, Xu Gong-gai di dalam file menjadi error kompilasi.

Dua hari kemudian rekan kerjanya bilang, mereka juga macet lama setelah migrasi, akhirnya menemukan artikelnya lewat pencarian. Seorang netizen punya ribuan file, konversi satu pun masih banyak error, "tidak punya pilihan selain bilang Goodbye pada VS2015". Ia kemudian menulis alat batch konversi ke UTF-8, karena simpan manual tak akan selesai.[^7]

Ini bukan hal yang sama dengan `split('/')` di atas. Satu adalah asumsi alat modern soal bentuk path. Satu adalah empat puluh tahun lalu memilih double-byte, lalu simbol menempati tubuh karakter. Mekanisme berbeda, tagihan tapi sering datang bersamaan di mesin cp950 yang sama. Soal sisi input bagaimana memasukkan karakter ke komputer, lihat [Metode Input Teks Asia Timur](/id/technology/east-asian-input-methods/). Di sini bahas soal karakter sudah di disk, rantai alat apakah masih mengenalinya.

## Nilai bawaan tidak membuka cabang untuk mesin ini

Git secara bawaan mengaktifkan `core.quotePath`. Nama file dengan byte lebih besar dari `0x80`, `git status` akan mencetaknya sebagai `\344\270\255` berupa oktal. Nama file berbahasa Tionghoa masih ada, hanya saja Anda setiap hari tidak mengerti repositori sendiri sedang mengatakan apa.[^3] Yang di-escape-nya adalah byte tinggi UTF-8. `0x5C` Big5 adalah jalur lain. Keduanya terlihat sebagai backslash, tetapi penyebabnya berbeda.

![Keluaran terminal sebenarnya: git status --short mencetak nama file berbahasa Tionghoa dalam artikel ini menjadi urutan escape oktal dengan tanda kutip; setelah ditambahkan -c core.quotePath=false, nama file yang sama dicetak dalam bahasa Tionghoa](/article-images/technology/git-quotepath-octal-cjk.svg)

_File yang sama, di bawah nilai bawaan adalah rangkaian `\345\212\237`. Backslash di sini adalah escape yang ditambahkan Git, tidak ada hubungannya dengan `0x5C` di dalam karakter "功". Dibuat oleh Kontributor Taiwan.md, CC BY-SA 4.0._

Python 3 di Windows jika `open()` tidak menulis `encoding='utf-8'`, mungkin mengikuti locale sistem. File UTF-8 yang sama, Linux bisa membaca, mesin ini menggunakan cp950 untuk mendekode, tanda baca atau bopomofo jadi rusak.[^4] Saya sendiri pernah membayar sekali: menggunakan `Get-Content | Set-Content` PowerShell 5.1 mengubah file ke UTF-8, strip panjang (em dash) di diff berubah menjadi `??`. Itu juga pajak bawaan, bukan topik kedua.

Saat pesan status membawa emoji, konsol cp950 ini akan langsung crash. Charset-nya tidak memiliki simbol-simbol tersebut, Python tidak bisa mencetak, exception meledak ke tingkat teratas. CI Linux tidak mendeteksi hal ini, karena tidak dijalankan di mesin ini.

`$HOME/project/src` di jalur contoh Git, Python, CI, tidak membuka cabang terpisah untuk Windows zh-TW.

Hong Chao-gui pada 2015 menerima wawancara iThome, membahas format apa yang harus digunakan pemerintah untuk membuka file, dan berapa lama file bisa bertahan. Liputan mengutip maksudnya: jika pemerintah hanya menggunakan produk Microsoft untuk membuka data file, berarti mempercayai umur Microsoft akan lebih panjang dari Republik Tiongkok (Taiwan).[^6] Kalimat itu membahas format file dan jangka penyimpanan. Data terikat pada alat bawaan mana, begitu waktu ditarik panjang, jadi siapa yang masih bisa membaca. Kolaborasi open source terikat pada lingkungan bawaan suatu jenis mesin. Tarik-menarik teknologi sipil dengan format file pemerintah, lihat [Komunitas Open Source dan g0v](/id/technology/open-source-and-g0v/). Pengembang Taiwan lama menyerap budaya kesenjangan ini, lihat [Semangat Open Source Taiwan](/id/technology/taiwan-open-source-spirit/).

Pemisah jalur, encoding terminal, `$HOME` di contoh CI, tidak ada cabang yang dibuka untuk mesin ini. Hari ketika 4546 jalur diklasifikasikan salah, tidak ada satu baris pun program melaporkan error. Statistik terlihat normal, sampai Anda duduk di depan mesin ini.

## Bacaan Lanjutan

- [Semangat Open Source Taiwan](/id/technology/taiwan-open-source-spirit): Budaya dan konteks pengembang Taiwan berpartisipasi dalam open source.
- [Metode Input Teks Asia Timur](/id/technology/east-asian-input-methods): Bagaimana karakter diketik ke komputer, dari tabel kode ke keyboard.
- [Komunitas Open Source dan g0v](/id/technology/open-source-and-g0v): Kolaborasi antara data terbuka dan format pemerintah.

## Sumber Gambar

- **Kode Big5 dan Backslash untuk「功」（hero）**：Ilustrasi buatan Kontributor Taiwan.md, CC BY-SA 4.0, tersimpan di `public/article-images/technology/big5-gong-5c-backslash.webp`. Baris di bawah adalah output aktual dari eksekusi Python 3 `'許功蓋'.encode('big5')`; posisi kode konsisten dengan entri Big5 Wikipedia.[^5]
- **split('/') dan PureWindowsPath**: Taiwan.md Contributors 自製, CC BY-SA 4.0, tersimpan di `public/article-images/technology/windows-path-split-vs-pathlib.svg`. Konten adalah hasil eksekusi Python 3 aktual; `PureWindowsPath` memotong jalur sesuai aturan Windows di sistem operasi apa pun, sehingga tidak perlu mesin Windows untuk mereproduksikannya.
- **Output Oktal Git core.quotePath**: Taiwan.md Contributors 自製, CC BY-SA 4.0, tersimpan di `public/article-images/technology/git-quotepath-octal-cjk.svg`. Konten adalah output aktual `git status --short` setelah menambahkan nama file dokumen ini ke repo staging; perilaku ini tidak bergantung pada sistem operasi.

## Referensi

[^1]: [Microsoft Learn: Format Jalur File di Sistem Windows](https://learn.microsoft.com/zh-tw/dotnet/standard/io/file-path-formats) — Dokumen .NET menjelaskan jalur DOS tradisional menggunakan garis miring terbalik sebagai pemisah direktori, garis miring akan dikonversi menjadi garis miring terbalik.

[^2]: [Hong Chao-gui: Masalah Kode Big-5 yang Mungkin Ditemui saat Menulis Program](https://frdm.cyut.edu.tw/~ckhung/b/pl/big5.php) — Halaman tutorial mencantumkan karakter umum dengan byte kedua berada di rentang berbahaya ASCII (加也程陣功 / jia ye cheng zhen gong), serta memperkenalkan alat pemindaian b5tm. Akhir halaman tidak mencantumkan jabatan. Tahun 2015 iThome menyebutnya sebagai profesor madya. Halaman pribadinya mencantumkan menjabat di Manajemen Informasi Chaoyang dari 1997 hingga 2023, pensiun Agustus 2023.

[^3]: [git-config: core.quotePath](https://git-scm.com/docs/git-config) — Dokumen resmi menjelaskan secara default jalur dengan byte lebih besar dari 0x80 akan ditampilkan sebagai urutan escape oktal.

[^4]: [Python 3: open()](https://docs.python.org/3/library/functions.html#open) — Penjelasan fungsi menyatakan jika encoding tidak ditentukan, mungkin menggunakan locale sistem sebagai encoding default.

[^5]: [Wikipedia: Big5](https://zh.wikipedia.org/zh-tw/大五碼) — Mencantumkan 「功」0xA55C、「許」0xB35C、「蓋」0xBB5C, dan menjelaskan masalah ini disebut lelucon sebagai 許功蓋 (Xu Gong Gai).

[^6]: [iThome: Wawancara Hong Chao-gui](https://www.ithome.com.tw/news/93606) — Wawancara tahun 2015, artikel menyebutnya sebagai profesor madya Jurusan Manajemen Informasi Universitas Teknologi Chaoyang. Halaman asli sering mengembalikan 403, kalimat tentang masa pakai Microsoft hanya menggunakan pernyataan dari hasil pencarian, tidak sebagai kutipan kata demi kata.

[^7]: [Darkthread: Mesin Potensial - Menyelesaikan Masalah Kompatibilitas BIG5 File Program VS2015](https://blog.darkthread.net/blog/big5-utf8-source-code-batch-converter/) — Catatan tahun 2015 saat Visual Studio 2015 mengompilasi kode sumber BIG5, 許功蓋 (Xu Gong Gai) menyebabkan kesalahan kompilasi. Artikel berisi 「只好跟VS2015說Goodbye」 (hanya bisa mengucapkan selamat tinggal pada VS2015).

[^8]: [taiwan-md PR #1260](https://github.com/frank890417/taiwan-md/pull/1260) — Digabungkan 2026-07-26. Sebelum perbaikan di Windows categories hanya tersisa root: 4546, setelah perbaikan Technology zh: 59. Turut menghapus emoji yang menyebabkan konsol cp950 mogok.
