---
title: 'Pembayaran Bergerak Taiwan: Mengapa Ponsel Terpasang Beberapa Jenis Pembayaran, Keluar Rumah Masih Membawa Uang Tunai?'
description: 'Kuartal ketiga 2024, dari 5.000 sampel internet MIC Institute for Information Industry, 92% pernah menggunakan, 84% rutin menggunakan pembayaran bergerak. Survei dewasa nasional lain oleh Bank Sentral justru menunjukkan, 73,8% tetap mencampur uang tunai dan non-tunai. Dari konsumen, pedagang, hingga QR bersama TWQR, artikel ini mengurai di balik pembayaran ponsel berbagai alat, kontrak, dan alur verifikasi yang berbeda, juga menjawab mengapa penetrasi tinggi tidak lepas dari membawa uang tunai masih memiliki dua ambang batas, serta menjelaskan apa yang sudah diselesaikan QR bersama, dan pengecualian penerimaan dan kegagalan apa yang tersisa.'
date: 2026-09-01
category: 'Technology'
tags:
  [
    'Pembayaran Bergerak',
    'Pembayaran Elektronik',
    'TWQR',
    'Taiwan Pay',
    'QR Code',
    'Uang Tunai',
    'Teknologi Keuangan',
  ]
subcategory: '數位與網路'
author: 'Taiwan.md Contributors'
featured: false
lastVerified: 2026-09-01
lastHumanReview: false
researchReport: 'reports/research/2026-09/台灣行動支付.md'
image: '/article-images/technology/taiwan-mobile-payments-merchant-2026.webp'
imageCredit: '財金資訊股份有限公司（TWQR 官方網站）'
imageLicense: 'Fair use editorial commentary'
imageSource: 'https://www.twqr.com.tw/'
curation: 'incubating'
curationReason: 'unverified'
translatedFrom: 'Technology/台灣行動支付.md'
sourceCommitSha: 'be13f045'
sourceContentHash: 'sha256:1e2fca6dab4c2f1c'
sourceBodyHash: 'sha256:62d9c6127e29bebe'
translatedAt: '2026-09-13T17:26:32.965606+00:00'
---

# Taiwan Mobile Payment: Mengapa Ponsel Berisi Berbagai Pembayaran, Keluar Rumah Masih Bawa Uang Tunai?

![Toko dan standar pembayaran mobile dalam thumbnail wawancara merchant resmi TWQR](/article-images/technology/taiwan-mobile-payments-merchant-2026.webp)
_Thumbnail wawancara merchant resmi TWQR, hanya untuk analisis materi promosi kebijakan. Gambar hanya mewakili toko受访者 tersebut, tidak dapat sebagai bukti lapangan independen adopsi toko kecil se-Taiwan. Gambar: Financial Information Co., Ltd. (situs resmi TWQR), penggunaan wajar untuk komentar._

> **Ringkasan 30 detik:** MIC III pada kuartal ketiga 2024 menemukan 92% sampel daring pernah menggunakan pembayaran mobile. Survei yang dikontrakkan Bank Sentral justru menunjukkan 73,8% orang dewasa tetap menggunakan tunai dan non-tunai bersama-sama. Kedua angka mengukur populasi dan pertanyaan berbeda, namun bersama-sama menunjuk pada hal yang sama: bisa bayar via ponsel, transaksi bisa diselesaikan di mana saja, serta keyakinan tidak perlu bawa tunai — adalah tiga ambang batas berbeda. Banyak App terkadang mengisi celah saluran, terkadang mengejar cashback dan fungsi keanggotaan. TWQR sedang mengintegrasikan QR bersama, namun belum menyatukan semua sumber dana, kontrak toko, dan skenario kegagalan menjadi satu pembayaran.

September 2025, analis industri senior MIC III Hu Zi-li mempublikasikan survei konsumen pembayaran mobile. Ia mengamati, pengguna aktif memasang lima alat atau lebih, "utama agar bisa menggunakan pembayaran mobile di saluran berbeda".[^1] Kalimat ini mirip dengan apa yang banyak orang lakukan di kasir: lihat dulu logo mana yang menempel di pintu kaca atau meja kasir, lalu putuskan App mana yang dibuka. Baru jika tidak menemukan logo familiar, bertanya "Di sini menerima yang mana?"

Pilihan di ponsel semakin banyak, dompet masih menyisakan beberapa lembar uang. Gambar paralel ini mudah ditafsirkan sebagai pasar pembayaran Taiwan terlalu terpecah, juga mudah diklaim sisi lain sebagai sekadar pilihan insentif. Kedua penafsiran masing-masing menangkap sebagian. Gesekan sistem penerimaan dan interoperabilitas memang membuat orang memasang banyak alat, menyimpan tunai; cashback, keanggotaan, transfer, kebiasaan, preferensi pribadi, dan cadangan saat error juga bersamaan berperan. Untuk melihat jelas hal ini, harus memecah tiga ambang batas: apakah orang mengadopsi, apakah transaksi berlaku lintas skenario, dan apakah transaksi gagal bisa dipulihkan hingga pengguna berani meninggalkan lembar tunai terakhir di rumah.

## Ponsel Bisa Bayar, Tidak Berarti Hari Ini Cukup Hanya Bawa Ponsel

MIC mengumumkan 92% «pernah menggunakan» dan 84% «sering menggunakan», berasal dari kuartal ketiga 2024, periode dua bulan, 5.000 sampel jaringan. Halaman publik tidak mencantumkan lengkap kerangka pengambilan sampel, rentang usia, dan metode pembobotan, sehingga kedua proporsi ini hanya dapat menggambarkan sampel jaringan tersebut, tidak bisa langsung ditulis sebagai tingkat penetrasi seluruh populasi Taiwan.[^2] Bahkan dengan mempertahankan batasan ini, data tersebut tetap menunjukkan bahwa di kalangan konsumen yang mengisi kuesioner daring, pembayaran ponsel sudah lama melampaui tahap teknologi asing.

Survei lain yang ditugaskan Bank Sentral kepada Lembaga Penelitian Ekonomi Taiwan, menanyakan bagaimana warga di atas 18 tahun menggunakan uang tunai dan non-tunai sehari-hari. Survei menggunakan telepon rumah dan ponsel sebagai utama, daring sebagai pelengkap, mencakup 22 kota/kabupaten, dan dibobotkan sesuai struktur populasi, dengan 4.234 sampel warga yang valid. Hasilnya: 73,8% menggunakan tunai dan non-tunai bersama, 25% hanya tunai, dan hanya 1,2% hanya non-tunai.[^3] Non-tunai di sini masih termasuk kartu kredit, kartu debit, dan kartu nilai tersimpan, tidak bisa dijadikan pangsa pasar pembayaran mobile, namun sangat cocok menggambarkan bentuk dompet hari ini.

```tw-waffle
Campuran adalah kebiasaan mayoritas (%)
Tunai dan non-tunai keduanya | 73.8
Hanya tunai | 25
Hanya non-tunai | 1.2
Sumber: Survei Alat Pembayaran Luar Bank Sentral, dipublikasikan 2024
```

Oleh karena itu, seseorang pagi di kafe rantai bayar tap ponsel, siang scan kode kumpulkan poin, sore di pasar traditional bayar tunai, tidak ada kontradiksi sama sekali. Ia sudah melampaui ambang pertama «manusia bisa pakai», namun tetap harus ganti alat sesuai lokasi, toko, dan peralatan. «Masih bawa uang tunai» di judul hanya bisa dipahami sebagai cadangan skenario berskala, tidak bisa diperluas menjadi kebutuhan identik setiap orang Taiwan setiap hari.

Kebiasaan bayar sudah berubah, pengecualian skenario tetap ada di jalan. Memasang beberapa App lebih tampak bisa menutupi pengecualian satu per satu, tapi untuk memahami mengapa ia bisa menutupi, harus pertama mengakui App-App itu bukan barang yang sama. Saat membuka ponsel terlihat mirip, jalur transaksi di belakangnya bisa sama sekali berbeda.

Beberapa aplikasi terlihat sama-sama digunakan untuk membayar, tetapi di belakang layar mereka tidak berjalan di jalur yang sama.

Materi FSC mengklasifikasikan berdasarkan alat ikat, teknologi, dan regulasi yang berlaku, membaginya menjadi kartu kredit seluler, kartu debit seluler, pemindaian QR, lembaga pembayaran elektronik, dan uang elektronik.[^4]

Tindakan konsumen di sisi depan mungkin hanya menempel, memindai, atau menekan konfirmasi sekali, tetapi di sisi belakang mungkin diselesaikan bersama oleh alat ikat, teknologi, ujung penerima, dan aturan yang berbeda. Sama-sama membayar di ponsel, ada yang menggunakan kartu terikat, ada yang menggunakan rekening pembayaran elektronik. Ujung penerima dan spesifikasi yang dipasang oleh pedagang akan menentukan kombinasi mana yang dapat digunakan. LINE Pay、JKOPAY、Apple Pay、All Pay, dan Taiwan Pay oleh karena itu tidak dapat hanya disajikan sebagai lima dompet seragam berderet logo. Beberapa di antaranya bersaing, beberapa bekerja sama berlapis dalam transaksi yang sama, dan beberapa saling melengkapi di saluran yang berbeda.

Jika ingin melihat bagaimana platform seperti PChome, Shopee, dan CoolPC mengubah skenario belanja daring, silakan baca lanjutan [Ekosistem E-dagang dan Pembayaran Digital Taiwan](/id/technology/e-commerce-and-digital-payment-ecosystem). Tulisan ini hanya berhenti di mil terakhir penagihan fisik.

Jadi, keberadaan merek tertentu di ponsel hanya menjawab apakah pengguna telah memperoleh alat, tidak bisa langsung menjawab apakah pedagang telah memasang ujung penerima yang kompatibel. Melihat QR yang sama juga tidak berarti setiap aplikasi, arah pemindaian, dan sumber dana dapat menyelesaikan transaksi. Melompat langsung dari ikon ponsel ke "bisa digunakan di seluruh Taiwan", di tengahnya setidaknya terlewat tiga lapis: alat ikat, kontrak pedagang, dan spesifikasi transaksi.

Jumlah aplikasi juga perlu menarik kembali klaim melebih-lebihkan "rata-rata lima jenis". Sampel jaringan MIC 2024 menunjukkan 86% menggunakan lima aplikasi atau kurang, di antaranya 61% menggunakan tiga atau kurang, dan 14% menggunakan enam atau lebih.[^5] Data publik tidak memiliki rata-rata, median, maupun distribusi lengkap untuk satu hingga lima aplikasi.[^5] Data ini mendukung penggunaan berganda, tetapi tidak dapat membentuk "pengguna tipikal" yang tepat memasang lima aplikasi.

Bulanan FSC Juni 2026 menjumlahkan angka pelaporan lembaga pembayaran elektronik menjadi 41,129 juta. Ini adalah total institusi, bukan jumlah orang alami setelah deduplikasi lintas institusi. Ini mengukur snapshot kontrak, tidak bisa menjawab seorang pengguna tipikal memasang berapa alat.[^6]

> **📝 Catatan Kurator**
> Logo di meja kasir adalah merek, yang terlihat di ponsel adalah antarmuka, dan yang terakumulasi di dalam tabel FSC adalah kontrak akun yang belum berakhir satu per satu. Memanggil ketiganya sebagai satu jenis "jumlah pengguna" saja akan meratakan lapisan yang paling layak dipahami di pasar pembayaran.

Sisi depan terlihat serupa, tetapi ketika transaksi tiba di ujung lain, perbedaan muncul. Pengguna mengunduh berapa pun aplikasi, juga tidak bisa menggantikan toko menyelesaikan pengajuan, verifikasi, dan rekonsiliasi. Ambang kedua berada tepat di belakang meja kasir.

## Konsumen melihat sekali scan, toko harus menyambungkan seluruh alur

Sebuah toko untuk menerima Taiwan Pay, harus terlebih dahulu mengajukan permohonan ke lembaga keuangan perolehan untuk menjadi merchant berkontrak, memperoleh kode bank perolehan, kode merchant, dan kode terminal, lalu menyelesaikan registrasi layanan.[^7] Setelah mulai menerima pembayaran, perangkat dan jaringan harus berfungsi, karyawan harus tahu cara mengonfirmasi notifikasi, menangani pengembalian dana, dan back-office harus menyelesaikan rekonsiliasi dan pencairan dana. Bagi toko kecil, menempelkan kode QR pembayaran hanyalah awal, diikuti oleh alur operasional yang harus diselesaikan setiap hari.

FAQ merchant Taiwan Pay menulis dengan sangat spesifik momen dalam alur ini yang paling mudah tertutup oleh satu kode QR: saat perangkat offline, merchant tetap dapat menghasilkan QR tanpa jumlah di halaman login agar konsumen memindainya, namun ponsel merchant tidak menerima notifikasi push transaksi.[^8] Layar pelanggan menampilkan sudah bayar, sisi penerima pada saat itu kekurangan notifikasi, kasir harus memutuskan apakah melepaskan barang, ke mana memeriksa transaksi ini. Memindai kode hanyalah titik awal aksi, konfirmasi di tempat dan rekonsiliasi pasca-transaksi barulah membuat transaksi benar-benar terealisasi.

Taiwan Pay menyerahkan biaya ke kontrak antara merchant dan bank perolehan, penjelasan resmi adalah 「交易處理費係依商家（收款人）與收單行（銀行）雙方契約訂定」。Platform lain memiliki skema publik, negosiasi merchant rantai, dan sumber pembayaran berbeda, masing-masing dengan ketentuannya sendiri.[^9] Biaya transaksi masuk ke pertimbangan toko, waktu pencairan, pengembalian dana, jaringan, perangkat, segmen pelanggan, pembelajaran, dan rekonsiliasi sama-sama masuk.

Penelitian akademis merchant kawasan komersial Tainan bahkan menemukan, kegunaan yang dirasakan, kemudahan penggunaan, adopsi konsumen, dan kompatibilitas memiliki korelasi positif dengan niat adopsi, sedangkan biaya yang dirasakan dalam sampel tersebut tidak memiliki hubungan signifikan.[^10] Hal ini juga menunjukkan merchant tidak hanya menanggung biaya, mereka juga menimbang apakah alatnya mudah digunakan, apakah pelanggan sudah mengadopsi. Penelitian lokal ini tidak dapat digeneralisasi ke seluruh Taiwan, namun cukup untuk menghentikan penafsiran tunggal 「店家只因費率不收」。

Survei eksternal Bank Sentral memberikan magnitudo pada perbedaan penerimaan. Dalam 611 sampel pedagang kaki lima, 76,1% hanya menerima tunai. Dalam 1.436 sampel toko, proporsi ini 46,8%. Laporan menghubungkan proporsi lebih tinggi pedagang kaki lima dengan lokasi, peralatan, dan skala.[^11] 「只收現金」 di sini berlawanan dengan semua alat non-tunai, tidak dapat dibalik untuk disimpulkan sebagai tingkat penerimaan pembayaran mobile, juga tidak dapat digunakan untuk mengkritik pedagang kaki lima kekurangan keinginan maju.

```tw-bars
Kios dan toko, kondisi penerimaan berbeda (hanya tunai, %)
Sampel pedagang kaki lima | 76,1 | 611 sampel
Sampel toko | 46,8 | 1.436 sampel
Sumber: Survei alat pembayaran eksternal Bank Sentral, dipublikasikan 2024
```

Universalitas pembayaran harus diselesaikan oleh kedua ujung: konsumen memiliki alat, merchant juga memiliki alur yang berkelanjutan untuk menerima, mengonfirmasi, mengembalikan dana, dan merekonsiliasi. Gesekan sistem di sini sudah berbentuk, namun ia tetap hanya menjelaskan sebagian koeksistensi multi-App dan tunai. App berikutnya terkadang adalah cadangan, terkadang lebih seperti kartu keanggotaan.

## Memasang satu App lagi, kadang agar bisa dipakai, kadang hanya ingin lebih nyaman

Dalam survei Bank Sentral menanyakan kendala penggunaan pembayaran mobile, 18,9% memilih toko tidak menerima, 12,0% memilih toko tidak menerima alat favorit mereka sendiri, 7,6% baru adalah terlalu banyak jenis di pasaran. Sinyal jaringan buruk 6,5%, ponsel kehabisan baterai 3,4%. [^12] Semuanya ini adalah jawaban pilih ganda, tidak bisa dijadikan proporsi kausalitas masing-masing faktor menyebabkan transaksi tunai, namun bisa terlihat bahwa memang ada kesenjangan antara "punya App" dan "App di tangan ini bisa dipakai".

"Saluran berbeda" yang disebut Hu Tzu-li, tepat sesuai dengan motivasi pengisi celah ini. Jika suatu toko tidak menerima alat favorit, pengguna mungkin memasang aplikasi lain. Teman makan malam butuh bagi tagihan, keluarga ingin mentransfer poin, juga bisa meninggalkan aplikasi lain. Survei seri MIC yang sama menunjukkan, 57% pengguna pernah menggunakan layanan keuangan pembayaran di luar konsumsi, paling umum adalah bagi transfer dan transfer poin, mencapai 38%. [^13] Fungsi-fungsi ini memasukkan aplikasi pembayaran ke dalam kehidupan sosial dan keanggotaan, alasan pemilikan sudah lama melampaui apakah kasir bisa scan atau tidak.

Dalam penelitian lintas empat wilayah yang dikomisikan Visa pada 2022, diwawancarai 1.000 responden Taiwan, usia 18–55 tahun, di mana 40% rutin melacak poin konsumsi, 22% menghitung-hitungan untuk mendapatkan cashback terbaik. [^14] Data ini tidak bisa memperkirakan "berapa banyak orang memasang banyak App demi cashback", hanya bisa menunjukkan sebagian responden melacak poin dan menghitung promosi demi cashback. Ekosistem keanggotaan ritel juga menumbuhkan alat pembayaran sendiri. Jika ingin melihat bagaimana PX Mart dari jaringan toko dan pengelolaan keanggotaan menuju platform kehidupan frekuensi tinggi, lihat [PX Mart](/id/economy/pxmart-supermarket), di sini tidak menulis ulang sejarah dan kontroversi perusahaan.

Survei Kementerian Ekonomi terhadap industri ritel memberikan perubahan yang lebih panjang. Berdasarkan jumlah pembayaran sampel laporan kembali, proporsi konsumen menggunakan pembayaran mobile naik dari 0,6% pada 2017 menjadi 11,2% pada 2023, tunai turun dari 41,1% menjadi 23,0%. Resmi mengaitkan perubahan ritel barang umum dan kosmetik-farmasi, sebagian karena ekosistem keanggotaan dan alat pembayaran buatan sendiri industri. [^15] Porsi pembayaran mobile memperluas, pada periode yang sama porsi tunai menurun. Kompetisi multi-merek memang menciptakan pilihan. Jika hanya mendiagnosis banyak App sebagai kegagalan sistem, jejak kenaikan ini dan preferensi aktif pengguna akan terlewat.

```tw-slope
Proporsi jumlah pembayaran ritel: pembayaran mobile naik, tunai turun (%)
2017 | 2023
*Pembayaran mobile | 0,6 | 11,2
Tunai | 41,1 | 23,0
Sumber: Departemen Statistik Kementerian Ekonomi, Survei Keadaan Usaha Industri Grosir, Ritel, dan Makanan Minum
```

Berbagai alat dengan demikian memainkan dua peran: satu mengisi celah penerimaan dan sumber dana, yang lain menampung diskon, poin, keanggotaan, dan transfer. Jumlah App sendiri tidak mengukur jarak menuju penyebaran luas, universalitas, atau tanpa uang tunai. Setelah kompetisi dan pengisian celah bergabung, pertanyaan terletak pada sampai lapisan mana integrasi sudah dilakukan.

## TWQR mengintegrasikan QR bersama, tidak menggabungkan semua pembayaran menjadi satu jenis

TWQR adalah respons nyata terhadap "terlalu banyak spesifikasi pembayaran, terlalu banyak standar merchant". Standar QR bersama ini menghubungkan lembaga keuangan dan institusi pembayaran elektronik yang berpartisipasi. Pada akhir 2025, data Bank Sentral mencantumkan 44 lembaga keuangan, 10 institusi pembayaran elektronik, dan 678.000 merchant mitra. Sepanjang 2025 transaksi mencapai 146,73 juta transaksi, 713,6 miliar. [^16] "Pembayaran QR Taiwan sama sekali tidak bisa saling terhubung" sudah tidak sesuai dengan realitas.

![Ilustrasi penjelasan resmi sistem TWQR "Satu Kontrak, Pembayaran Beragam"](/article-images/technology/taiwan-mobile-payments-single-contract-2026.webp)
_Materi penjelasan sistem resmi TWQR "Satu Kontrak, Pembayaran Beragam", menampilkan cara akses merchant yang diklaim oleh Perusahaan Informasi Keuangan. Ini adalah ilustrasi promosi sistem, tidak dapat secara independen membuktikan setiap merchant mitra aktif, setiap transaksi berhasil, atau semua sumber pembayaran terhubung. Gambar: PT Informasi Keuangan (situs resmi TWQR), penggunaan wajar untuk komentar._

QR bersama menyelesaikan lapisan penting, tetapi halaman akuisisi yang dipublikasikan oleh bank mitra juga menunjukkan bahwa batasan tetap ada. Daftar "pemindai" di halaman tersebut mencantumkan Taiwan Pay, JKOPAY, All Pay, EasyWallet, iPASS, dan 6 alat lainnya (total 11). Daftar "dipindai" lebih pendek, dan dibatasi pada spesifikasi QR Auth. All Pay, iCash, dan Chingying Pay muncul di daftar pemindai, namun tidak ada di daftar dipindai halaman tersebut. [^17] Arah pemindaian, spesifikasi, dan partisipasi institusi mengubah kombinasi yang tersedia, dan merchant tetap harus mengajukan TWQR ke institusi akuisisi.

678.000 adalah jumlah merchant mitra; data publik Bank Sentral ini tidak menyediakan berapa banyak merchant yang terus aktif, juga tidak ada pangsa pasar penuh dan tingkat keberhasilan lapangan. QR bersama juga tidak secara otomatis menyatukan sumber dana seperti kartu kredit atau rekening, poin member, cashback, kontrak merchant, biaya, dan proses pengembalian dana. Ia mendorong standar tampilan dan spesifikasi transaksi ke lapisan bersama, tanpa meratakan seluruh dunia bisnis setiap App.

> **📝 Catatan Kurator**
> Hasil TWQR yang paling patut dikenali tersembunyi dalam cakupan dua kata "salingsambung": QR salingsambung dan pesan lintas institusi telah membentuk fondasi berskala besar; aktivasi harian merchant mitra, setiap sumber dana, dan setiap aturan member tetap ditentukan oleh lapisan lain. Universalitas sedang dibangun lapis demi lapis.

Ambang interoperabilitas telah maju, tetapi jumlah merchant mitra tidak otomatis berarti setiap orang, setiap transaksi, dan setiap sumber dana bisa menggunakannya. Saat rekayasa integrasi masih berlangsung, keberadaan uang tunai mendapat makna lain.

## Uang tunai tidak membuktikan kegagaran pembayaran mobile, biasanya uang tunai bahkan tidak perlu ditanya dulu apakah bisa dipakai

Agar sebuah alat dapat bersifat universal, setidaknya harus memungkinkan pengguna untuk mendapatkannya, memungkinkan pedagang mengenali dan mengonfirmasinya, memungkinkan transaksi selesai, dan juga harus ada satu set metode pemulihan yang dapat diprediksi ketika ponsel kehabisan baterai, jaringan tidak stabil, atau notifikasi gagal. Artinya kedua belah pihak tahu ke mana harus pergi untuk memeriksa, kapan harus mencoba lagi, dan jalur apa yang bisa diambil setelah kegagalan. Apakah kedua belah pihak dapat menemukan catatan yang sama setelah transaksi selesai, juga merupakan bagian dari pemulihan.

Dengan ukuran ini, pembayaran mobile telah mempercekas checkout dalam banyak konsumsi sehari-hari, namun masih tidak dapat menyediakan jalur yang sama untuk setiap skenario. Dalam sebagian besar transaksi kecil tatap muka, uang tunai tidak memerlukan registrasi, tidak memerlukan perangkat, penyerahan dan konfirmasi terjadi bersamaan, sehingga terus berperan sebagai antarmuka umum terendah. Uang tunai juga memiliki biaya kembalian, penyimpanan, dan pencatatan, namun yang dibandingkan di sini adalah ambang penerimaan dan ketahanan terhadap kegagalan, bukan biaya operasional keseluruhan.

Survei eksternal Bank Sentral membawa perbedaan manusia ke dalam peran uang tunai: responden berusia 40 tahun ke atas dan dari daerah terpencil memiliki proporsi lebih tinggi yang hanya menggunakan uang tunai. Data mendukung perbedaan arah, tidak dapat diperluas menjadi satu wajah tunggal untuk semua lansia atau penduduk pedalaman.[^18] Putaran penelitian ini juga tidak memiliki data yang cukup untuk mengisi proporsi atau menciptakan suara bagi anak-anak, penyandang disabilitas, pekerja migran, dan wisatawan jangka pendek. Alat populer mungkin nyaman bagi sebagian orang, namun tidak berarti setiap orang dapat memperoleh jenis akun, kartu, ponsel, atau jaringan yang sama.

Pengguna berat di toko rantai dan lingkungan hidup yang familiar, memang mungkin berbulan-bulan tidak menyentuh uang kertas. Orang lain menyimpan uang tunai, mungkin hanya karena kebiasaan, preferensi privasi, atau pengendalian pengeluaran, bukan karena pernah gagal bayar. Gesekan sistematis, penerimaan pedagang, cashback, keanggotaan, kebiasaan, preferensi, dan ketahanan terhadap kegagalan bekerja bersama, survei yang ada tidak dapat menata mereka ke dalam urutan sebab-akibat tunggal.

Ambang adopsi menanyakan berapa banyak orang yang akan menggunakannya. Ambang universalitas menanyakan apakah orang dan toko yang berbeda dapat menyelesaikan lintas skenario. Tanpa membawa uang tunai, masih harus ditanyakan: apakah bisa pulih setelah kegagalan. Semakin maju dua ambang pertama, orang yang membawa uang tunai mungkin semakin sedikit, namun kapan lembar uang terakhir meninggalkan dompet, bergantung pada apakah pengecualian sudah sedikit hingga tidak layak dijadikan cadangan.

Bagian berikut adalah skenario hipotetis yang dibangun berdasarkan batasan offline FAQ resmi, bukan kasus aktual: ponsel pedagang offline, halaman login tetap dapat menampilkan kode QR tanpa jumlah. Pelanggan memindai kode, namun pedagang tidak menerima notifikasi masuk rekening. Keduanya menatap layar masing-masing, transaksi terjebak di antara "dapat membayar" dan "dapat konfirmasi di tempat". Pelanggan akhirnya memasukkan ponsel, mengeluarkan selembar uang kertas. Lembar uang itu tidak menilai kemenangan atau kekalahan teknologi, ia hanya dalam skenario ini, tetap tidak perlu bertanya dulu: "Di sini menerima yang mana?"

## Bacaan Lanjutan

- [Ekosistem E-commerce dan Pembayaran Digital Taiwan](/id/technology/e-commerce-and-digital-payment-ecosystem) — Meninjau kembali dua puluh tahun perang platform dan logistik e-commerce Taiwan.
- [Pengembangan Fintech Taiwan](/id/economy/taiwan-fintech-development) — Menempatkan kasus pembayaran kembali ke dalam sepuluh tahun pengembangan fintech Taiwan di antara pembukaan dan pengendalian risiko.
- [PXmart](/id/economy/pxmart-supermarket) — Melihat bagaimana PXmart dari jaringan toko dan pengelolaan keanggotaan menuju platform kehidupan berfrekuensi tinggi.

## Sumber Gambar

- Gambar utama: PT Financial Information (situs resmi TWQR), [Sumber asli](https://www.twqr.com.tw/), Fair use editorial commentary. Gambar asli adalah thumbnail video resmi "Hati Toko｜Rousong Daging Nikumaki", artikel ini hanya menggunakannya untuk mengomentari promosi kebijakan TWQR.
- Gambar dalam teks: PT Financial Information (situs resmi TWQR), [Sumber asli](https://www.twqr.com.tw/), Fair use editorial commentary. Gambar asli adalah ilustrasi penjelasan resmi "Satu Kontrak, Pembayaran Beragam".

## Referensi

[^1]: [III MIC: Survei Konsumen Pembayaran Mobile 2025](https://mic.iii.org.tw/research.aspx?id=730) — Hu Zili menjelaskan pengguna aktif memasang lebih banyak alat untuk saluran yang berbeda, dan mengumumkan metode survei, tingkat adopsi, dan rentang jumlah aplikasi.

[^2]: [III MIC: Survei Konsumen Pembayaran Mobile 2025](https://mic.iii.org.tw/research.aspx?id=730) — Pengumpulan data pada kuartal ketiga 2024, menggunakan survei online, sampel valid 5.000. 92% pernah menggunakan dan 84% rutin menggunakan terbatas pada sampel tersebut.

[^3]: [Bank Sentral: Hasil Survei Kuesioner Eksternal Isu CBDC](https://knowledge.cbc.gov.tw/uploads/20240613/d2196a6b-784b-45ea-b559-10b824915887.pdf) — Metode survei, sampel, dan penjelasan pembobotan, serta hasil masyarakat 73,8% campuran, 25% hanya tunai, 1,2% hanya non-tunai.

[^4]: [FSC Jaringan Cerdas Keuangan: Materi Pembelajaran Pembayaran Mobile](https://moneywise.fsc.gov.tw/uploaddowndoc?file=financeroom%2F202001131202240.pdf&filedisplay=%E6%96%B0%E5%A2%9E%E6%95%99%E6%9D%90PPT-+%E8%A1%8C%E5%8B%95%E6%94%AF%E4%BB%98-%E5%AE%9A%E7%A8%BF.pdf&flag=doc) — Mengkategorikan berdasarkan alat terikat, teknologi, dan regulasi: kartu kredit mobile, kartu debit mobile, QR code scanning, institusi pembayaran elektronik, dan uang elektronik.

[^5]: [III MIC: Survei Konsumen Pembayaran Mobile 2025](https://mic.iii.org.tw/research.aspx?id=730) — Mempublikasikan distribusi rentang 2024: lima aplikasi atau kurang, tiga aplikasi atau kurang, dan enam aplikasi atau lebih; tidak mempublikasikan rata-rata atau median.

[^6]: [Direktorat Perbankan FSC: Informasi Penting Rekening Pembayaran Elektronik Juni Tahun 115](https://www.fsc.gov.tw/userfiles/file/BB-1156_%E9%9B%BB%E5%AD%90%E6%94%AF%E4%BB%98%E5%B8%B3%E6%88%B6%E9%87%8D%E8%A6%81%E8%B3%87%E8%A8%8A%E6%8F%AD%E9%9C%B2.pdf) — Total tercatat 41.128.870, catatan kaki mendefinisikan sebagai jumlah pengguna yang telah terdaftar membuka rekening dan belum mengakhiri kontrak di masing-masing institusi.

[^7]: [Taiwan Mobile Payment: FAQ Operasi Merchant](https://www.twmp.com.tw/Faq?n=95c7608a1dfc4fa1834f4467d41a32d1) — Menjelaskan merchant harus menandatangani kontrak dengan institusi keuangan akuisisi dan memperoleh kode bank akuisisi, merchant, dan terminal.

[^8]: [Taiwan Mobile Payment: FAQ Penerimaan Pembayaran Merchant](https://www.twmp.com.tw/Faq?n=29250e1aae5e4963a550de09d86a26be) — Menjelaskan perangkat offline tetap dapat menghasilkan QR tanpa jumlah, tetapi tidak dapat login atau menerima notifikasi transaksi.

[^9]: [Taiwan Mobile Payment: FAQ Penerimaan Pembayaran Merchant](https://www.twmp.com.tw/Faq?n=29250e1aae5e4963a550de09d86a26be) — Resmi menyatakan biaya pemrosesan transaksi ditetapkan oleh kontrak antara merchant dan bank akuisisi, tidak dapat didorong menjadi tarif seragam seluruh pasar.

[^10]: [Universitas Cheng Kung: Penelitian Adopsi Pembayaran Mobile oleh Merchant di Kawasan Komersial Tainan](https://researchoutput.ncku.edu.tw/en/studentTheses/what-factors-affect-stores-willingness-to-adopt-mobile-payment-de/) — Abstrak disertasi doktor mencantumkan faktor signifikan dan tidak signifikan dari niat adopsi, ruang lingkup penelitian terbatas pada sampel kawasan komersial Tainan.

[^11]: [Bank Sentral: Hasil Survei Kuesioner Eksternal Isu CBDC](https://knowledge.cbc.gov.tw/uploads/20240613/d2196a6b-784b-45ea-b559-10b824915887.pdf) — Sampel pedagang kaki lima 611, merchant 1.436, dan menghubungkan perbedaan hanya menerima tunai dengan lokasi, peralatan, dan skala.

[^12]: [Bank Sentral: Survei Instrumen Pembayaran dalam Laporan Stabilitas Keuangan](https://www.cbc.gov.tw/tw/dl-207586-2f35d674d8a34ee09d1d1c0fd68a6fea.html) — Grafik mencantumkan masalah multi-pilihan: merchant tidak menerima, tidak menerima alat favorit, terlalu banyak jenis, sinyal, dan baterai ponsel.

[^13]: [III MIC: Survei Konsumen Pembayaran Mobile 2025](https://mic.iii.org.tw/research.aspx?id=730) — Survei mencantumkan layanan keuangan di luar pembayaran konsumsi, di antaranya transfer pembagian dan transfer hadiah poin adalah jenis paling umum.

[^14]: [Visa Taiwan: Penelitian Konsumen Dompet Mobile dan Pembayaran Elektronik 2022](https://www.visa.com.tw/about-visa/newsroom/press-releases/nr-tw-230310.html) — Mengungkapkan sampel 1.000 orang Taiwan berusia 18-55 tahun serta proporsi melacak cashback dan menghitung keuntungan promosi.

[^15]: [Departemen Statistik Kementerian Ekonomi: PDF Siaran Pers Proporsi Pembayaran Mobile Industri Ritail](https://www.moea.gov.tw/Mns/populace/news/wHandNews_File.ashx?file_id=116845) — Proporsi jumlah pembayaran 2017 dan 2023 dari survei realitas usaha grosir, ritail, dan makanan minuman, serta penjelasan ekosistem keanggotaan.

[^16]: [Bank Sentral: Laporan Tahunan 2025](https://www.cbc.gov.tw/tw/dl-225165-b56d9b5e547843a4822acd679cb4868e.html) — Mencantumkan institusi peserta TWQR, toko mitra kerja sama, serta jumlah dan nilai transaksi sepanjang tahun pada akhir 2025.

[^17]: [Bank Kerjasama: Layanan Akuisisi Lintas Institusi TWQR](https://www.tcb-bank.com.tw/company-banking/credit-card/special-store/twqr) — Mencantumkan institusi yang tersedia untuk memindai dan dipindai, spesifikasi QR Auth, serta cara pengajuan pedagang, menunjukkan interoperabilitas berdasarkan arah dan lapisan spesifikasi.

[^18]: [Bank Sentral: Hasil Survei Kuesioner Terkontrak Isu CBDC](https://knowledge.cbc.gov.tw/uploads/20240613/d2196a6b-784b-45ea-b559-10b824915887.pdf) — Laporan menampilkan perbedaan arah berdasarkan usia dan wilayah; artikel ini tidak mengada-adakan proporsi atau suara kelompok spesifik berdasarkan data tersebut.
