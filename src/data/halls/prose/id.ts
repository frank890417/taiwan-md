/**
 * 四展廳的策展散文：印尼文 版。
 *
 * 2026-11-19 從中文版（zh-TW.ts，經哲宇同意改版後的定稿）直譯，沒有經過英文轉譯。
 * 之後中文版改數字或說法，這份要跟著重翻。
 *
 * 格式見 ../types.ts：每段一個字串， [[…]] 標出主題藥丸（連到 category 那個分類）。
 */
import type { HallProse } from '../types';

const halls: HallProse[] = [
  {
    numeral: 'I',
    title: 'Seperti apa wajah pulau ini',
    paragraphs: [
      {
        category: 'geography',
        text: `Luasnya hanya sekitar 36,000 kilometer persegi, tetapi daratannya menjulang dari permukaan laut hingga 3,952 meter. Puncak tertingginya, Yushan, disebut Tongku Saveq oleh suku Bunun dan Patungkuonʉ, "gunung yang bersinar", oleh suku Tsou. Setiap tahun Lempeng Laut Filipina mendesak Lempeng Eurasia sekitar 8 sentimeter, mengangkat lebih dari dua ratus gunung setinggi di atas 3,000 meter di tanah ini. [[🗺️ Geografi Taiwan]] masih terus bertambah tinggi. Garis Balik Utara melintasi Chiayi; pada hari yang sama Anda bisa berkendara dari pantai tropis Kenting ke embun beku dan salju di Gunung Hehuan.`,
      },
      {
        category: 'nature',
        text: `Daftar spesies yang tercatat di Taiwan sudah melewati 60,000. Salmon sakura (櫻花鉤吻鮭) pada 1995 tinggal sekitar dua ratus ekor; setelah bendungan dibongkar dan dilakukan pemulihan, jumlahnya dalam beberapa tahun terakhir bertahan di atas 15,000 ekor. Populasi beruang hitam Taiwan diperkirakan sekitar 1,200 ekor oleh Badan Kehutanan dan Konservasi Alam pada awal 2026. [[🌿 Alam Taiwan]] menumpuk zona-zona vegetasi, dari terumbu karang di dasar laut, melintasi wilayah tropis, hingga subarktik. Di hulu Sungai Da'an masih berdiri sebatang pohon Taiwania setinggi 84.1 meter; justru karena tumbuh di tempat yang tak terjangkau manusia, ia lolos dari penebangan besar-besaran.`,
      },
      {
        category: 'lifestyle',
        text: `Ada lebih dari 14,000 minimarket, kira-kira satu untuk setiap 1,700 orang. Membayar tagihan listrik dan air, mengambil paket, membeli tiket kereta cepat, memfotokopi skripsi, semuanya selesai di satu kasir yang sama. [[🏠 Kehidupan orang Taiwan]] juga mengikuti jam-jam yang tetap: menjelang petang lagu "Für Elise" terdengar dari ujung gang, dan seisi jalan keluar menenteng sampah yang sudah dipilah. Masuk ke gang, nenek-nenek masih akan bertanya, "Sudah makan?"`,
      },
    ],
  },
  {
    numeral: 'II',
    title: 'Bagaimana pulau ini terbentuk',
    paragraphs: [
      {
        category: 'history',
        text: `Pada 1624, Belanda mulai membangun Benteng Zeelandia di Dayuan, Tainan. Selama empat ratus tahun berikutnya, Belanda, Spanyol, Kerajaan Tungning (Ming Zheng), Dinasti Qing, Jepang, dan Republik Tiongkok datang dan pergi silih berganti, tiap kali membawa bahasa dan hukum baru. [[📜 Sejarah Taiwan]] juga bisa dibaca dengan subjek yang lain. Pada 1990, Tsao Yung-ho mengajukan gagasan "sejarah pulau Taiwan", memindahkan pandangan dari rezim yang datang dan pergi kepada orang-orang yang selalu tinggal di sini. Pada 1996, 10.88 juta orang melangkah ke bilik suara dan untuk pertama kalinya memilih presiden mereka secara langsung, pada tahun kesembilan setelah darurat militer dicabut.`,
      },
      {
        category: 'culture',
        text: `Taiwan memiliki 17 suku masyarakat adat yang diakui secara hukum; yang terbaru adalah suku Siraya, ditetapkan pada 2026. Orang Hokkien membawa Mazu, orang Hakka membawa Yimin Ye (dewa pahlawan rakyat), kaum pendatang pasca-1949 (waishengren) membawa mantou Shandong dari permukiman militer (juancun), dan para imigran baru serta pekerja migran dari Asia Tenggara membawa Idulfitri. [[🎭 Budaya Taiwan]] menumpuk lapis demi lapis tanpa ada yang melebur hilang. Prosesi Mazu Dajia berlangsung sembilan hari delapan malam, diikuti ratusan ribu hingga lebih dari satu juta orang; upacara perang suku Tsou juga digelar setiap musim semi di Alishan.`,
      },
      {
        category: 'society',
        text: `Pada 17 Mei 2019, Yuan Legislatif, berdasarkan Tafsir No. 748 Mahkamah Konstitusi, meloloskan undang-undang khusus pernikahan sesama jenis dalam pembacaan ketiga, dan Taiwan menjadi negara pertama di Asia yang melegalkan pernikahan sesama jenis. Pada November tahun sebelumnya, 7.66 juta orang baru saja memilih dalam referendum untuk membatasi pernikahan dalam Kitab Undang-Undang Hukum Perdata pada seorang laki-laki dan seorang perempuan. Seminggu kemudian, pada 24 Mei, 526 pasangan di seluruh negeri mendatangi kantor catatan sipil (戶政事務所), dan pasangan pertama ada di Annan, Tainan. [[⚖️ Masyarakat Taiwan]] melangkah maju di tengah tarik-menarik seperti ini: selesai berdebat, tetap sama-sama antre membeli sarapan.`,
      },
    ],
  },
  {
    numeral: 'III',
    title: 'Apa yang dikerjakan orang-orang di pulau ini',
    paragraphs: [
      {
        category: 'people',
        text: `Yan Chang-shou lulus SMA, pada usia 23 tahun masuk American Express sebagai pesuruh, dan pada usia 28 tahun menjadi general manager wilayah Taiwan. Jeremy Lin dipecat dua tim dalam 15 hari; pada Februari 2012 ia masuk sebagai pemain pengganti, dan di tujuh pertandingan berikutnya rata-rata mencetak 24.4 poin. Chen Shu-chu mengambil alih lapak sayur ibunya pada usia 13 tahun dan menyumbangkan uang hasil jualan sayur, sedikit demi sedikit, untuk sekolah, panti asuhan, dan rumah sakit. [[👥 Tokoh Taiwan]] sering berangkat dari posisi yang tampak tak punya kelanjutan; setiap titik baliknya, pada waktunya, bisa saja tak terjadi.`,
      },
      {
        category: 'art',
        text: `Di bioskop Taiwan tahun 1930, tokoh di layar tidak bersuara, tetapi orang di samping layar bersuara. Para benshi (penutur film bisu) Taiwan menarasikan film bisu secara spontan dalam bahasa Taiwan, menuturkan alur cerita sekaligus keadaan zaman; ada pula yang seperti Lu Ping-ting, yang saat bercerita di Chiayi menyelipkan komentar politik lalu dihentikan polisi di tempat. [[🎨 Seni Taiwan]] berulang kali kembali ke pertanyaan yang sama: dengan bahasa siapa, dan di mana, kita berbicara tentang diri sendiri. Chen Chien-wu terpaksa melepaskan bahasa Jepang setelah perang, baru pada 1958 menerbitkan puisi pertamanya dalam bahasa Mandarin dengan nama pena Huan-fu, dan pada 1964 mendirikan Komunitas Puisi Li (笠詩社) bersama teman-temannya. Pada 2008 tempat latihan Cloud Gate Dance Theatre (雲門舞集) di Distrik Bali, New Taipei, terbakar; tahun berikutnya Cloud Gate menandatangani kontrak lahan baru di Tamsui, dan pada 2015 rumah baru mereka berdiri di sana.`,
      },
      {
        category: 'music',
        text: `Pada 1933, lagu "Wangchun Feng" (Angin Musim Semi) karya Deng Yu-xian lahir, menyanyikan isi hati seorang gadis dalam bahasa Taiwan. Pada 1943, Kurosawa Takatomo merekam Pasibutbut suku Bunun di permukiman Kanding, Taitung; baru ketika rekaman itu dikirim ke International Folk Music Council (IFMC) pada 1952, dunia akademik Barat mulai memperhatikannya. [[🎵 Suara Taiwan]] mengalir dari nyanyian kuno suku, 898 lagu terlarang di masa darurat militer, lagu kampus, hingga pop berbahasa Mandarin dan Golden Melody Awards (金曲獎). Sangpuy (桑布伊) dalam bahasa Puyuma, A-bao (阿爆) dalam bahasa Paiwan, dan Li Zhu-xin (李竺芯) dalam bahasa Taiwan secara berturut-turut meraih penghargaan album terbaik tahun ini yang tak memandang bahasa.`,
      },
    ],
  },
  {
    numeral: 'IV',
    title: 'Ke mana pulau ini melangkah',
    paragraphs: [
      {
        category: 'technology',
        text: `Sekitar sembilan dari sepuluh chip tercanggih dunia dibuat di Taiwan. Pada musim dingin 1979, sawah di Jinshanmian, Hsinchu, dibalik oleh buldoser, dan tahun berikutnya Hsinchu Science Park berdiri. [[💻 Pulau teknologi ini]] berawal dari sawah itu; lebih dari empat puluh tahun kemudian, pada 2025, pendapatan gabungan taman sains Hsinchu, Tainan, dan Taichung mencapai NT$5.80 triliun, dan banyak chip di ponsel, laptop, serta mobil berasal dari sini. Harganya: TSMC seorang diri memakai sekitar sepersepuluh listrik seluruh Taiwan, dan porsinya masih naik.`,
      },
      {
        category: 'economy',
        text: `Pada 1960, PDB per kapita Taiwan hanya lebih dari 150 dolar AS, lebih rendah daripada Republik Demokratik Kongo; pada 2021 untuk pertama kalinya melampaui 30,000 dolar AS. Di antaranya tak ada minyak, juga tak ada wilayah belakang sebuah negara besar. [[📈 Ekonomi Taiwan]] selama enam puluh tahun itu bertumpu pada usaha kecil dan menengah yang muncul satu demi satu. Yang memikul perjalanan ini sebagian besar adalah para bos, buruh perempuan, dan teknisi mesin yang namanya tak pernah masuk berita.`,
      },
      {
        category: 'food',
        text: `Semangkuk mi sapi memuat dasar kuah merah ala Sichuan, manisnya kecap Taiwan, dan rindu kampung halaman para veteran 1949. Dua kedai teh di Taichung dan Tainan sampai kini masing-masing mengaku sebagai yang pertama memasukkan bola tapioka ke teh susu, dan sekarang di lima benua ada orang yang mengunyah butiran kenyal itu. [[🍜 Cita rasa Taiwan]] mencakup telur dadar tiram orang Hokkien, usus babi tumis jahe orang Hakka, arak jawawut masyarakat adat, dan kecap ikan para imigran baru. Sebuah meja lipat di pasar malam muat bagi mereka yang tinggal di sini lebih dahulu, dan muat pula bagi mereka yang mendarat satu demi satu selama empat ratus tahun.`,
      },
    ],
  },
];

export default halls;
