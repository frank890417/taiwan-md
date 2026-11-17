---
title: 'Konflik Peradaban di Papan Ketik: Evolusi Input Teks Asia Timur Selama Seratus Tahun'
description: 'Ketika semua papan ketik di dunia terlihat sama, bagaimana peradaban yang berbeda memasukkan aksara mereka ke dalam 26 huruf Latin? Dari Zhuyin Taiwan hingga Dubeolsik Korea, input teks adalah medan perang pemeliharaan budaya yang sunyi.'
date: 2026-03-19
category: 'Technology'
tags:
  [
    'Input Teks',
    'Teknologi',
    'Budaya',
    'Zhuyin',
    'Cangjie',
    'Papan Ketik',
    'Digitalisasi',
    'Asia Timur',
    'Aksara',
  ]
subcategory: '文字與工具'
author: 'Taiwan.md'
featured: true
lastVerified: 2026-03-19
lastHumanReview: false
readingTime: 15
curation: 'incubating'
curationReason: 'unverified'
translatedFrom: 'Technology/東亞文字輸入法.md'
sourceCommitSha: 'b1a5fea00'
sourceContentHash: 'sha256:90551a3865db4ef0'
sourceBodyHash: 'sha256:2cf976c21e3add32'
translatedAt: '2026-11-17T17:56:36.968298+00:00'
---

# Konflik Peradaban di Papan Ketik: Evolusi Input Teks Asia Timur Selama Seratus Tahun

## Ikhtisar 30 Detik

Papan ketik komputer di seluruh dunia menggunakan tata letak QWERTY, sebuah konfigurasi yang dirancang untuk mesin tik bahasa Inggris pada tahun 1870-an. Namun, sistem aksara yang digunakan oleh lebih dari 2 miliar orang Asia (Aksara Hanzi, Kana, Hangul, Aksara Thai, Aksara Myanmar) tidak dapat secara langsung dipetakan ke 26 huruf Latin: Hanzi terdiri dari ribuan karakter, sementara meskipun Hangul, Aksara Thai, dan Aksara Myanmar adalah aksara fonetik, jumlah dan aturan kombinasinya sangat berbeda dari bahasa Inggris. Apa yang mereka lakukan? Jawabannya adalah: setiap peradaban menciptakan "lapisan terjemahan" mereka sendiri—yaitu input teks. Input teks ini bukan sekadar alat teknis, melainkan medan perang identitas budaya. Taiwan menggunakan Zhuyin, Tiongkok menggunakan Pinyin, Jepang menggunakan Romaji, dan Korea memecah huruf secara langsung; setiap pilihan mencerminkan filosofi berbeda yang dimiliki oleh suatu peradaban dalam menghadapi digitalisasi.

---

## Esensi Masalah: 26 Huruf vs Puluhan Ribu Karakter

Pengguna bahasa Inggris tidak pernah membutuhkan "input teks"—papan ketik memiliki 26 huruf, dan apa pun yang diketik akan menghasilkan sesuatu. Namun, Hanzi memiliki lebih dari 50.000 karakter, dengan sekitar 3.000 hingga 5.000 di antaranya yang umum digunakan. Anda tidak mungkin membuat papan ketik dengan 5.000 tombol.

Ini berarti peradaban Asia Timur harus memecahkan masalah mendasar: **Bagaimana mengekspresikan teks tak terbatas menggunakan tombol yang terbatas?**

Setiap peradaban memberikan jawaban yang sangat berbeda, dan jawaban-jawaban ini secara mendalam mencerminkan struktur bahasa mereka, sistem pendidikan, bahkan pilihan politik mereka.

---

## 🇹🇼 Taiwan: Simbol Zhuyin (Mencari Karakter Melalui "Pelafalan")

### Akar Sejarah Zhuyin

Input teks arus utama di Taiwan adalah **Zhuyin**, yang menggunakan 37 simbol Zhuyin (ㄅㄆㄇㄈ...) untuk menandai pelafalan. Jika Anda ingin mengetik "Taiwan", Anda menekan `ㄊㄞˊ ㄨㄢ`, dan sistem menampilkan karakter homofon untuk dipilih.

Simbol Zhuyin, yang awalnya disebut huruf Zhuyin, ditetapkan pada tahun 1918 setelah Kongres Unifikasi Pengucapan (教育部召開「讀音統一會」) mengadakan pertemuan berdasarkan "Niwen" dan "Yunwen" yang disederhanakan dari komponen Hanzi kuno oleh Zhang Taiyan pada tahun 1913 [^7]. Ini adalah **sistem pelafalan yang sepenuhnya independen dari alfabet Latin**, dan ini sangat penting.

### Mengapa Taiwan Mempertahankan Zhuyin?

Ada empat lapisan alasan yang saling menguatkan mengapa Taiwan mempertahankan Zhuyin. Sistem pendidikan adalah dasarnya: selama 10 minggu pertama di kelas satu sekolah dasar, fokus penuh diberikan pada pengajaran Zhuyin; ini adalah alat literasi paling mengakar bagi setiap orang Taiwan, dan biaya untuk menggantinya terlalu mahal. Identitas budaya adalah pendorongnya: simbol Zhuyin adalah sistem penanda khas dunia bahasa Mandarin Tradisional yang tidak menggunakan alfabet Latin, sehingga dianggap sebagai kelanjutan tradisi budaya Tionghoa. Secara teknis, Zhuyin dapat menandai nada standar (Guoyu) dan nada ringan secara akurat. Terakhir, papan ketik Taiwan mencantumkan simbol Zhuyin yang sesuai di samping setiap huruf Inggris, membentuk penanda ganda, sehingga sistem ini berakar kuat pada tingkat perangkat keras.

### Keterbatasan Zhuyin

Masalah terbesar dari Zhuyin adalah **terlalu banyak homofon**. Bahasa Mandarin hanya memiliki sekitar 1.300 suku kata berbeda, tetapi harus mencocokkan puluhan ribu karakter Hanzi. Mengetik "ㄕˋ" dapat menghasilkan puluhan karakter seperti "是, 事, 式, 室, 市, 試, 視, 適, 勢, 世..." Pengguna harus memilih dari daftar kandidat, yang memperlambat kecepatan input.

Dalam beberapa tahun terakhir, input Zhuyin cerdas (seperti Microsoft New Zhuyin, RIME) telah meningkatkan akurasi secara signifikan melalui prediksi konteks AI, tetapi masalah pemilihan karakter pada dasarnya masih ada.

### Cangjie: Jalan Lain

Pada tahun 1976, **Chu Bangfu**, yang dijuluki "Bapak Komputer Tionghoa", menciptakan **Cangjie**, sebuah metode yang sama sekali tidak mengandalkan pelafalan, melainkan mengandalkan **pemecahan bentuk karakter**. Setiap Hanzi dipecah menjadi 1-5 "akar kata" (字根), yang dipetakan ke 25 tombol pada papan ketik (A hingga Y, tanpa tombol Z [^2]).

Misalnya, "明" = 日 + 月 = `A` + `B`.

Keunggulan Cangjie adalah tingkat kode terendahnya di antara input teks Tionghoa [^2], sehingga pengguna yang mahir hampir tidak perlu memilih karakter. Kecepatan pengguna Cangjie yang mahir dapat melebihi Zhuyin. Pada tahun 1982, Chu Bangfu menerbitkan pengunduran hak paten untuk Cangjie [^2], memungkinkan siapa pun menggunakannya secara gratis dan terintegrasi, lebih dari sepuluh tahun sebelum konsep "sumber terbuka" muncul (1998).

Cangjie sangat populer di Hong Kong (lebih dari separuh pengguna komputer), tetapi selalu minoritas di Taiwan karena kurva pembelajarannya yang curam.

### Input Matriks (Hángniè)

**Input Matriks**, yang diciptakan oleh Liao Mingde, adalah solusi asli Taiwan lainnya, yang memecah bentuk karakter berdasarkan posisi "baris" dan "kolom" pada papan ketik. Versi awal menggunakan tombol angka di baris paling atas, dengan total 40 kode, disebut "Matriks 40"; versi saat ini, "Matriks 30", hanya menggunakan tiga baris huruf [^8]. Ini mewakili inovasi berkelanjutan Taiwan dalam bidang input teks.

---

## 🇨🇳 Tiongkok: Pinyin Hanzi (Menggunakan Huruf Latin untuk Mengetik Bahasa Tionghoa)

### Pemilihan Pinyin

Input teks arus utama di Tiongkok daratan adalah **Pinyin**, yang secara langsung menggunakan 26 huruf Inggris untuk mengeja pelafalan karakter Hanzi. Untuk mengetik "Taiwan", Anda memasukkan `taiwan`, dan sistem menerjemahkannya menjadi aksara Sederhana.

Pilihan ini memiliki latar belakang sejarah yang mendalam:

1. **Pengesahan Skema Pinyin pada tahun 1958**: Menggantikan simbol Zhuyin (yang disebut "simbol Zhuyin" di Tiongkok) dan sistem Wade-Giles sebelumnya.
2. **Reformasi Karakter Sederhana**: Pengenalan karakter Sederhana dimulai pada tahun 1956, yang melengkapi input Pinyin—pelajari Pinyin $\rightarrow$ ketik dengan Pinyin $\rightarrow$ hasilkan karakter Sederhana.
3. **Pertimbangan Internasional**: Karena Pinyin menggunakan alfabet Latin, ini memudahkan orang asing mempelajari bahasa Tionghoa dan juga memudahkan penutur bahasa Tionghoa untuk mengetik di papan ketik standar apa pun.

### Pinyin vs Zhuyin: Perbedaan Budaya yang Mungkin Tidak Anda Sadari

Secara permukaan, Zhuyin dan Pinyin sama-sama "mencari karakter melalui pelafalan". Tetapi perbedaannya sangat besar:

|                       | Zhuyin Taiwan                                      | Pinyin Tiongkok                       |
| :-------------------- | :------------------------------------------------- | :------------------------------------ |
| Sistem Simbol         | Simbol independen (ㄅㄆㄇ)                         | Huruf Latin (bpmf)                    |
| Akar Budaya           | Berasal dari komponen Hanzi                        | Berasal dari gerakan Latinisasi       |
| Prasyarat Belajar     | Tidak perlu belajar bahasa Inggris terlebih dahulu | Perlu mengenal huruf Inggris          |
| Kebutuhan Papan Ketik | Membutuhkan papan ketik yang ditandai Zhuyin       | Papan ketik Inggris apa pun           |
| Hubungan dengan Teks  | "Mendeskripsikan pelafalan"                        | "Diterjemahkan menjadi alfabet Latin" |

Perbedaan ini bukan hanya teknis, tetapi juga mencerminkan perbedaan mendasar antara kedua sisi selat mengenai "bagaimana bahasa Tionghoa harus terhubung secara internasional". Taiwan memilih untuk mempertahankan sistem simbol yang independen dari Barat, sementara Tiongkok memilih untuk merangkul Latinisasi.

### Karakter Lima Pena: Cangjie versi Tiongkok

Perlu disebutkan bahwa Tiongkok juga memiliki input berbasis bentuk karakter, yaitu **Karater Lima Pena** (Wang Yongmin, 1983). Logikanya mirip dengan Cangjie, memecah Hanzi menjadi goresan yang dipetakan ke papan ketik. Karakter Lima Pena sangat populer di kantor-kantor Tiongkok pada tahun 1990-an, tetapi penggunaannya menurun drastis seiring dengan kecerdasan input Pinyin dan penyebaran ponsel. Saat ini, sebagian besar pengguna di Tiongkok menggunakan input Pinyin.

---

## 🇯🇵 Jepang: Transformasi Tiga Tahap dari Romaji $\rightarrow$ Kana $\rightarrow$ Hanzi

### Tantangan Unik Input Bahasa Jepang

Bahasa Jepang adalah salah satu sistem penulisan paling kompleks di dunia, karena menggunakan tiga set aksara secara bersamaan:

- **Hiragana** (ひらがな): 46 simbol fonetik dasar
- **Katakana** (カタカナ): 46 simbol, terutama digunakan untuk kata serapan asing
- **Hanzi** (漢字): sekitar 2.000 hingga 3.000 yang umum digunakan

Metode standar input bahasa Jepang adalah "**Input Romaji**" (ローマ字入力):

1. Ketik huruf Inggris $\rightarrow$ Otomatis dikonversi menjadi Hiragana: `ka` $\rightarrow$ `か`, `n` $\rightarrow$ `ん`
2. Terus mengetik, sistem menyusun kata: `kanji` $\rightarrow$ `かんじ`
3. Tekan spasi untuk mengonversi menjadi Hanzi: `かんじ` $\rightarrow$ `漢字`

Ini adalah proses **tiga lapisan transformasi**: Huruf Inggris $\rightarrow$ Kana $\rightarrow$ Hanzi, dan setiap lapisan memerlukan penilaian pengguna.

### Mengapa Jepang Menggunakan Romaji, Bukan Langsung Hiragana?

Jepang memang memiliki opsi **Input Kana Langsung** (かな入力), di mana setiap tombol pada papan ketik sesuai dengan satu Kana. Namun, ini membutuhkan hafalan lebih dari 50 posisi tombol, dan sistem pendidikan Jepang sudah mengajarkan Romaji dalam pengajaran bahasa Inggris, sehingga kebanyakan orang merasa lebih nyaman menggunakan huruf Inggris.

Di komputer, mayoritas pengguna Jepang menggunakan input Romaji; sementara input Kana Langsung adalah minoritas. Sebaliknya, di ponsel, metode input yang langsung memilih Kana digunakan secara luas [^6].

### Implikasi Budaya Input Bahasa Jepang

Konversi Hanzi dalam bahasa Jepang memiliki efek budaya yang menarik: kaum muda mulai **lupa cara menulis Hanzi dengan tangan**. Karena input teks akan menampilkan Hanzi yang benar secara otomatis, pengguna hanya perlu tahu "cara membacanya" dan tidak perlu menghafal "cara menuliskannya". Orang Jepang sering bercanda bahwa setelah mengetik lama, mereka bisa mengenali Hanzi tetapi lupa cara menuliskannya.

---

## 🇰🇷 Korea: Dubeolsik (Desain Papan Ketik yang Paling Elegan)

### Kejeniusan Hangul: Huruf Dapat Dipetakan Langsung ke Tombol

Hangul (한글), sistem aksara yang diciptakan atas perintah Raja Sejong pada tahun 1443, adalah salah satu dari sedikit aksara di dunia yang "memiliki pencipta yang jelas". Aksara ini terdiri dari 14 konsonan (ㄱㄴㄷㄹ...) dan 10 vokal (ㅏㅓㅗㅜ...), yang dikombinasikan menjadi blok suku kata.

Total hanya ada 24 huruf dasar dalam Hangul, yang pas untuk muat di 26 tombol papan ketik QWERTY!

### Dubeolsik (두벌식): Konsonan Tangan Kiri, Vokal Tangan Kanan

Input standar Korea, **Dubeolsik** (두벌식, yang berarti "dua set": satu set konsonan, satu set vokal), sangat intuitif [^3]:

- **Tangan kiri** bertanggung jawab untuk menekan konsonan: ㄱ(r) ㄴ(s) ㄷ(e) ㄹ(f) ㅁ(a)...
- **Tangan kanan** bertanggung jawab untuk menekan vokal: ㅏ(k) ㅓ(j) ㅗ(h) ㅜ(n) ㅡ(m)...

Saat mengetik, kedua tangan bekerja secara bergantian dengan ritme yang sangat baik, dan yang terpenting adalah **tidak perlu memilih karakter**, apa pun yang diketik akan langsung muncul.

Di kalangan input teks budaya Hanzi, ini adalah salah satu dari sedikit metode yang **tidak memerlukan daftar kandidat** (papan ketik Korea memiliki tombol Hanzi terpisah untuk mengonversi Hangul menjadi Hanzi, tetapi tidak digunakan dalam pengetikan sehari-hari). Blok suku kata Hangul dikombinasikan secara instan: mengetik `ㅎ` + `ㅏ` + `ㄴ` = 한, dan `ㄱ` + `ㅡ` + `ㄹ` = 글. Seluruh prosesnya tanpa latensi dan tanpa pemilihan karakter.

### Mengapa Input Korea Paling Elegan?

Karena Hangul sendiri dirancang untuk "mudah dipelajari". Dalam序 (sebuah epilog) yang ditulis oleh menteri Jeong Linzhi pada tahun 1446, sistem ini dipuji oleh ajaran Raja Sejong: "Orang bijak menguasai dalam satu pagi, orang bodoh bisa belajar dalam sepuluh hari" [^9]. Enam ratus tahun kemudian, desain ini masih sangat cocok di era digital: 24 huruf pas untuk papan ketik, konsonan dan vokal dibagi antara tangan kiri dan kanan, tanpa perlu konversi, tanpa perlu memilih karakter.

---

## 🇹🇭 Thailand: Kedmanee (Tata Letak yang Dilanjutkan dari Era Mesin Tik)

### Tantangan Aksara Thai: 44 Konsonan + Simbol Nada

Aksara Thai memiliki 44 simbol konsonan, 16 simbol vokal (yang dapat dikombinasikan menjadi setidaknya 32 bentuk vokal), dan 4 simbol nada, yang totalnya melebihi 60 karakter, jauh melampaui jumlah tombol pada papan ketik standar [^10].

Solusinya adalah **Tata Letak Kedmanee** (เกษมณี), yang berasal dari mesin tik bahasa Thai yang diperkenalkan pada tahun 1920-an dan selalu disebut sebagai "tata letak tradisional," baru dinamai pada tahun 1970-an oleh desainer legendaris Suwanprasert Ketmanee [^4]. Ini menempatkan karakter yang paling sering digunakan di posisi yang tidak memerlukan Shift, sementara yang jarang digunakan ditempatkan di lapisan Shift.

### Keunikan Input Thai

Aksara Thai adalah **aksara fonetik**, tetapi aturan penulisannya sangat kompleks: vokal dapat muncul sebelum konsonan, setelah konsonan, di atas, atau di bawahnya. Misalnya, เ (e) ditulis di depan konsonan, tetapi dibaca di belakang. Ini berarti urutan pengetikan dan urutan pembacaan mungkin tidak selalu sama; pengguna perlu membiasakan diri dengan situasi tertentu "mengetik vokal terlebih dahulu baru kemudian konsonan".

Input Thai tidak memerlukan pemilihan karakter (mirip Korea), tetapi membutuhkan hafalan dua lapisan (normal + Shift).

---

## 🇲🇲 Myanmar: Perang Unicode

### Zawgyi vs Unicode Myanmar: Perang Saudara Digital

Kisah input aksara Myanmar adalah yang paling dramatis di Asia Timur. Aksara Myanmar memiliki 33 konsonan dan aturan kombinasi yang kompleks, tetapi masalah sebenarnya bukan pada input itu sendiri, melainkan pada **pengkodean font**.

**Font Zawgyi**, yang dirilis pada tahun 2007, tidak mematuhi standar Unicode, tetapi menyebar dengan cepat karena kepraktisannya dan tetap menjadi font paling umum di situs web Myanmar hingga tahun 2019 [^5].

Masalahnya: Zawgyi dan Unicode tidak kompatibel. Teks yang sama akan ditampilkan secara berbeda total dalam kedua sistem, menyebabkan kekacauan komunikasi yang besar.

Pemerintah Myanmar menetapkan tanggal 1 Oktober 2019 sebagai "U-Day," untuk beralih sepenuhnya ke **Unicode Myanmar** [^5]. Facebook juga memperkenalkan konversi otomatis untuk membantu pengguna mengubah teks Zawgyi menjadi Unicode. Transisi ini menyentuh seluruh infrastruktur seluler dan situs web negara tersebut, skalanya setara dengan pemindahan besar-besaran infrastruktur digital.

---

## Perbandingan: Filosofi Papan Ketik Enam Peradaban

| Peradaban   | Input Teks Utama | Prinsip                                      | Memerlukan Pemilihan? | Posisi Budaya         |
| :---------- | :--------------- | :------------------------------------------- | :-------------------- | :-------------------- |
| 🇹🇼 Taiwan   | Zhuyin           | Penandaan fonetik independen                 | ✅ Banyak homofon     | Independensi Budaya   |
| 🇨🇳 Tiongkok | Pinyin Hanzi     | Fonetik menggunakan huruf Latin              | ✅ Banyak homofon     | Koneksi Internasional |
| 🇯🇵 Jepang   | Romaji           | Latin $\rightarrow$ Kana $\rightarrow$ Hanzi | ✅ Konversi Hanzi     | Transformasi Berlapis |
| 🇰🇷 Korea    | Dubeolsik        | Pemetaan langsung ke huruf                   | ❌ Kombinasi instan   | Kesesuaian Sempurna   |
| 🇹🇭 Thailand | Kedmanee         | Pemetaan karakter langsung                   | ❌ Output langsung    | Warisan Mesin Tik     |
| 🇲🇲 Myanmar  | Unicode Myanmar  | Kombinasi karakter                           | ❌ Output langsung    | Perang Standardisasi  |

---

## Era Ponsel: Medan Pertempuran Baru

Ponsel pintar telah mengubah ekosistem input secara total. Papan ketik Zhuyin Taiwan (grid sembilan atau papan ketik penuh) masih menjadi arus utama di ponsel, tetapi penggunaan pengetikan tulisan tangan dan pengenalan suara meningkat pesat. Tiongkok bergerak menuju pendorong AI: Sogou Pinyin dan Baidu Input telah menjadi arus utama, dan "input geser" secara drastis meningkatkan efisiensi Pinyin. Jepang mengembangkan **Input Flick** (フリック入力), yang menggunakan gerakan jari di atas grid sembilan untuk memilih arah Kana, sama sekali tidak memerlukan huruf Inggris. Korea memiliki **Input Cheonjiin** (천지인), yang menggunakan tiga goresan dasar ㆍ(langit), ㅡ(bumi), ㅣ(manusia) untuk menggabungkan semua vokal, sangat cocok untuk layar kecil.

Era ponsel menyoroti fenomena menarik: **generasi muda kehilangan kemampuan menulis tangan**. Ini sangat parah di kalangan budaya Hanzi: ketika input teks membantu Anda mengingat semua karakter Hanzi, tangan Anda lupa.

---

## Era AI: Akhir dari Input Teks?

Dengan kemajuan pengenalan suara dan teknologi percakapan AI, masalah mendasar muncul: **Apakah kita masih membutuhkan input teks?** Input suara telah menggantikan pengetikan di banyak skenario, dengan penggunaan pesan suara WeChat Tiongkok yang sangat tinggi. Prediksi AI membuat input semakin "pintar," mampu memprediksi seluruh kalimat hanya dari beberapa ketukan. Peningkatan teknologi pengenalan tulisan tangan juga membuat "menulis dengan jari di layar" menjadi mungkin.

Namun, input teks tidak akan hilang. Karena ia bukan hanya alat—ia adalah **wadah memori budaya**. Sepuluh minggu seorang anak Taiwan belajar Zhuyin, momen ketika orang Jepang mengubah Romaji menjadi Hanzi di papan ketik, ritme tangan kiri konsonan dan kanan vokal orang Korea; semua ini adalah dialog intim setiap peradaban dengan aksara mereka di era digital.

---

## Bacaan Lanjutan

- [Industri Semikonduktor](/id/technology/taiwan-semiconductor-industry) — Industri chip di balik produksi papan ketik

## Referensi

[^1]: [Memecahkan Kode Asal Usul Papan Ketik (Bagian 2): Sejarah Budaya Input Cangjie dan Zhuyin](https://www.thenewslens.com/article/12229) — Situs ulasan penting, sejarah dan konteks budaya input Cangjie.

[^2]: [Input Cangjie](https://zh.wikipedia.org/zh-tw/倉頡輸入法) — Wikipedia; Diciptakan oleh Chu Bangfu pada tahun 1976, hak paten dilepaskan diumumkan pada tahun 1982, tingkat kode terendah di antara input teks Tionghoa.

[^3]: [Panduan Tata Letak Papan Ketik Korea](https://www.90daykorean.com/korean-keyboard/) — 90 Day Korean; Penjelasan konfigurasi papan ketik Hangul Dubeolsik (2-set).

[^4]: [Tata Letak Papan Ketik Kedmanee Thai](https://en.wikipedia.org/wiki/Thai_Kedmanee_keyboard_layout) — Wikipedia; Berasal dari mesin tik bahasa Thai tahun 1920-an, dinamai pada tahun 1970-an oleh Suwanprasert Ketmanee yang legendaris.

[^5]: [Font Zawgyi](https://en.wikipedia.org/wiki/Zawgyi_font) — Wikipedia; Dirilis pada tahun 2007, ditetapkan oleh pemerintah Myanmar sebagai U-Day pada 1 Oktober 2019 untuk beralih ke Unicode.

[^6]: [Kana Input](https://ja.wikipedia.org/wiki/かな入力) — Wikipedia Bahasa Jepang; Penggunaan Kana Input: input Kana digunakan secara luas di ponsel pintar, sementara input Romaji dominan di komputer pribadi.

[^7]: [Simbol Zhuyin](https://zh.wikipedia.org/zh-tw/注音符號) — Wikipedia; Ditetapkan oleh Konferensi Unifikasi Pengucapan berdasarkan Niwen dan Yunwen Zhang Taiyan pada tahun 1913, ditetapkan secara resmi pada tahun 1918.

[^8]: [Input Matriks (Hángniè)](https://zh.wikipedia.org/zh-tw/行列輸入法) — Wikipedia; Diciptakan oleh Liao Mingde, versi awal "Matriks 40" menggunakan tombol angka, sementara versi saat ini "Matriks 30" hanya menggunakan tiga baris huruf.

[^9]: [Xunmin Zhengyin](https://zh.wikisource.org/wiki/訓民正音) — Teks asli di perpustakaan digital; Epilog Jeong Linzhi: "Orang bijak menguasai dalam satu pagi, orang bodoh bisa belajar dalam sepuluh hari," ditandatangani pada bulan September tahun kesebelas.

[^10]: [Aksara Thai](https://en.wikipedia.org/wiki/Thai_script) — Wikipedia; 44 simbol konsonan, 16 simbol vokal yang dapat dikombinasikan menjadi setidaknya 32 bentuk vokal, dan 4 simbol nada.
