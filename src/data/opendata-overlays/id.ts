import type { DeepPartial, OpendataContent } from '../opendata-content';

export const id: DeepPartial<OpendataContent> = {
  meta: {
    title:
      'Kurasi Data Terbuka — Panduan lapisan makna untuk data terbuka Taiwan × Twinkle Hub',
    description:
      'Lima puluh ribu set data pemerintah akan membuat siapa pun kewalahan. Halaman ini adalah kurasi data Taiwan.md: set data mana yang layak dilihat, bagaimana menggabungkannya saat ingin menganalisis sesuatu, dan kisah apa di pulau ini yang terhubung dengan tiap kelompok angka. Disertai penilaian langsung dari pemakaian nyata atas kelengkapan, stabilitas, dan kemudahan akses Twinkle Hub.',
  },
  hero: {
    eyebrow: 'KURASI DATA TERBUKA',
    title: 'Kurasi Data Terbuka',
    subtitle: 'Panduan lapisan makna untuk data terbuka Taiwan × Twinkle Hub',
    intro: [
      'Platform data terbuka pemerintah Taiwan memuat lebih dari lima puluh dua ribu set data. Angka itu membuat siapa pun yang sungguh ingin memakainya kewalahan: tidak tahu mana yang penting, sejauh mana diperbarui, dua tabel mana yang bisa digabung, apalagi apa kaitannya dengan pertanyaan yang Anda pedulikan.',
      'Taiwan.md telah menulis lebih dari seribu seratus artikel tentang Taiwan, dan di balik tiap artikel ada satu penilaian: data apa yang seharusnya memverifikasi hal ini? Halaman ini membuka lapisan penilaian itu: bagaimana kami menilai infrastruktur data, set data mana yang digabung (dan bagaimana) saat menganalisis suatu pertanyaan, dan kisah apa di pulau ini yang terhubung dengan tiap ranah data.',
    ],
    viz: {
      stats: [
        { label: 'set data pemerintah (2026-10-23)' },
        { label: 'putusan pengadilan teks penuh' },
        { label: 'soal ujian nasional' },
        { label: 'baris analisis gizi' },
        { label: 'catatan pengadaan' },
      ],
      graphHint:
        'Jaringan di bawah ini nyata: di kiri, 20 ranah data dan lima korpus vertikal (dari hasil perayapan Twinkle Hub); di kanan, artikel Taiwan.md yang sudah ditulis. Setiap garis adalah satu penilaian kurasi di halaman ini. Seret dan arahkan kursor untuk melihat data yang berantakan terhubung ke kisah yang jelas.',
      legend: {
        domain: 'Ranah data',
        vertical: 'Korpus vertikal',
        article: 'Artikel Taiwan.md',
        center: 'Lapisan makna Taiwan.md',
      },
    },
  },
  ecosystem: {
    title: 'Peta ekosistem: tiga lapisan, masing-masing memegang perannya',
    lead: 'Agar AI (atau manusia) benar-benar bisa menjawab pertanyaan tentang Taiwan, tiga lapisan harus bekerja bersama: rumah bagi data, jalur untuk kueri, dan lapisan makna.',
    layers: [
      {
        name: 'data.gov.tw dan sistem instansi',
        role: 'Rumah data (sumber tunggal)',
        desc: 'Platform data terbuka pemerintah adalah identitas permanen tiap set data: ID set data, ketentuan lisensi, instansi penanggung jawab, unduhan mentah. Setiap kutipan pada akhirnya harus bisa dilacak ke sini.',
        stat: 'lebih dari 52.000 set data (2026-10-23)',
      },
      {
        name: 'Twinkle Hub',
        role: 'Jalur kueri (gerbang MCP)',
        desc: 'Hub MCP pertama di Taiwan, membungkus data yang tersebar di ratusan portal pemerintah menjadi satu titik kueri: pencarian semantik, kueri baris terstruktur, dan alat untuk lima ranah vertikal. AI mendapat datanya dalam satu panggilan, tanpa menyusuri portal satu per satu.',
        stat: '21 alat · 20 ranah',
      },
      {
        name: 'Taiwan.md',
        role: 'Lapisan makna (kurasi)',
        desc: 'Data tidak berbicara sendiri. Set data mana yang layak ditunjuk, klaim mana yang diverifikasinya, bagian sejarah mana yang terhubung dengannya — itulah kerja kurasi. Sejak Juni 2026, artikel kami satu per satu mendapat bagian "Data publik" yang menyambungkan narasi dengan data mentah.',
        stat: '1.100+ artikel · 15 penunjuk set data aktif',
      },
    ],
  },
  assessment: {
    title: 'Penilaian tiga dimensi: temuan dari pengujian langsung kami',
    lead: 'Berikut penilaian langsung Taiwan.md sebagai pengguna, dijalankan dengan alat verifikasi kami sendiri (dua putaran uji, Mei dan Juni 2026), dipaparkan dalam tiga dimensi. Ini bukan iklan; ini pemeriksaan kesehatan.',
    gapsLabel: 'Kekurangan yang jujur',
    dims: [
      {
        name: 'Kelengkapan data',
        verdict: 'Cakupannya nyata, dan melampaui sekadar cermin',
      },
      {
        name: 'Stabilitas',
        verdict: 'Sesuai sifat alfa-nya: berjalan cepat, berubah cepat pula',
      },
      {
        name: 'Kemudahan akses',
        verdict: 'Inilah sisi terkuatnya',
      },
    ],
  },
  verticals: {
    title: 'Lima korpus vertikal: bagian yang melampaui cermin',
    lead: 'Membungkus set data dengan antarmuka pencarian bukan hal istimewa; lima ranah vertikal ini menambahkan pencarian semantik dan ekstraksi terstruktur — bagian yang membuat Twinkle Hub lebih dari sekadar "cermin data.gov.tw".',
    logNote:
      'Batang skala memakai skala logaritmik: korpus putusan 17 kali lipat izin obat; bila digambar linear, empat batang lainnya akan terhimpit hingga tak terlihat.',
    items: [
      {
        name: 'Paten',
        stat: 'Teks penuh paten invensi terbitan TIPO',
        desc: 'Kueri bahasa alami atas korpus paten, dengan uraian teknis dan klaim lengkap yang bisa diambil. Saat menulis tentang industri Taiwan, pertanyaan "apakah perusahaan ini sungguh memegang teknologi itu" untuk pertama kalinya bisa diverifikasi lewat pencarian semantik.',
      },
      {
        name: 'Ujian nasional',
        stat: '64.815 naskah ujian · 320.000 soal (2012–2025)',
        desc: 'Naskah ujian Kementerian Ujian dari tahun ke tahun, dapat dicari hingga tingkat soal. Budaya ujian pegawai negeri Taiwan — demam kerja di sektor publik, jalan-jalan penuh bimbel — adalah kisah yang belum diceritakan dengan data.',
      },
      {
        name: 'Putusan pengadilan',
        stat: 'sekitar 1,24 juta catatan (2024-05 s.d. 2026-03, alfa)',
        desc: 'Penelusuran korpus putusan dengan bahasa sehari-hari. Untuk artikel tentang peradilan, sengketa perburuhan, dan konflik sewa, pertanyaan "bagaimana pengadilan memutus dalam praktik" kini punya pintu masuk yang bisa diverifikasi.',
      },
      {
        name: 'Obat dan kesehatan',
        stat: '71.836 izin obat · 96.803 kode ICD-10 bahasa Mandarin',
        desc: 'Izin edar obat, bidang terstruktur pada brosur obat, sertifikasi pangan kesehatan, dan penyaringan awal interaksi obat. Lapisan fakta untuk artikel tentang Asuransi Kesehatan Nasional dan kedokteran.',
      },
      {
        name: 'Gizi pangan',
        stat: '226.825 baris analisis gizi',
        desc: 'Basis data komposisi gizi pangan Kementerian Kesehatan dan Kesejahteraan: dua puluhan zat gizi per bahan, bisa diurutkan per zat dan dijumlahkan per santapan. Fondasi angka untuk artikel pasar malam dan kuliner.',
      },
    ],
  },
  domains: {
    title: 'Dua puluh ranah data × peta kisah Taiwan.md',
    lead: 'Di kiri, kategori ranah Twinkle Hub (dari hasil perayapan); di kanan, pemetaan kurasi kami: artikel mana di pulau ini yang terhubung dengan data tiap ranah. Untuk ranah bertanda "Kisah belum ditulis", set data unggulan dan jalur analisisnya sudah dikurasi lengkap tetapi artikelnya belum ditulis: itulah peta pengembangan kami sekaligus undangan terbuka bagi siapa pun yang mau menulisnya.',
    questionsLabel: 'Pertanyaan khas',
    articlesLabel: 'Artikel terkait',
    blankLabel: 'Kisah belum ditulis',
    proposedStoryLabel: 'Kisah yang bisa lahir darinya',
    proposedHowLabel: 'Cara menganalisisnya',
  },
  recipes: {
    title:
      'Resep analisis: data apa yang dipakai, dan cara menggabungkannya, untuk memahami satu hal',
    lead: 'Inilah inti halaman ini. Setiap kartu adalah pertanyaan analisis nyata: set data apa yang dipakai, kunci apa yang menyambungkannya, metode apa untuk membacanya, dan artikel mana yang sudah mengubah analisis itu menjadi kisah.',
    combineLabel: 'Cara menggabungkan',
    methodLabel: 'Cara terbaik menganalisis',
    articlesLabel: 'Kisah yang sudah ditulis',
    items: [
      {
        question:
          'Keadilan perumahan: rumah murah yang dibangun pemerintah — siapa yang akhirnya diuntungkan?',
      },
      {
        question:
          'Transisi energi: tenaga nuklir turun ke nol lalu dinyalakan kembali — apa yang terjadi dalam angka?',
      },
      {
        question:
          'Keuangan Asuransi Kesehatan Nasional: siapa yang memakai, siapa yang membayar, dan berapa tahun lagi sistem ini bertahan?',
      },
      {
        question:
          'Kualitas demokrasi: seberapa besar elektorat tiap pemilu, dan seberapa keras penegakan hukumnya?',
      },
      {
        question:
          'Ekonomi jalanan: bagaimana sebenarnya output 230.000 lapak pedagang kaki lima dihitung?',
      },
      {
        question:
          'Keselamatan jalan: apa yang menghubungkan 14 juta sepeda motor dengan tiga ribu kematian per tahun?',
      },
    ],
  },
  method: {
    title: 'Metodologi penggabungan: kunci yang menyelaraskan dua tabel',
    lead: 'Satu set data hanyalah satu titik; hanya dengan penggabungan terbentuk jaringan. Inilah petunjuk penggabungan yang paling berguna dari pengujian kami.',
    spectrum: {
      title:
        'Frekuensi pembaruan = resolusi analisis: spektrum lima belas set data contoh',
      left: '← Diperbarui tiap bulan: studi peristiwa dimungkinkan',
      right: 'Lima tahun sekali: hanya perbandingan antarperiode →',
      note: 'Setiap titik adalah satu set data yang dikutip di halaman ini; arahkan kursor untuk melihat namanya. Sebelum merancang analisis, periksa di ujung spektrum mana data Anda berada.',
    },
    items: [
      { name: 'Kode wilayah administratif' },
      { name: 'Nomor induk usaha' },
      { name: 'Koordinat dan kode stasiun' },
      { name: 'Tingkat kualitas' },
      { name: 'Frekuensi pembaruan adalah resolusi analisis' },
      { name: 'Prinsip penunjuk ganda' },
    ],
  },
  tools: {
    title: 'Katalog alat: daftar lengkap 21 alat',
    lead: 'Diambil langsung dari titik akhir MCP (perayapan terakhir yang berhasil tercatat di bagian bawah halaman). Pengelompokannya buatan kami.',
    groups: [
      { label: 'Empat alat inti set data + indeks ranah' },
      { label: 'Paten' },
      { label: 'Ujian nasional' },
      { label: 'Putusan pengadilan' },
      { label: 'Obat dan kode medis' },
      { label: 'Gizi pangan' },
    ],
  },
  footer: {
    crawledLabel:
      'Daftar alat dan ranah di halaman ini terakhir berhasil dirayapi pada',
    note: 'Twinkle Hub masih berstatus alfa, dan penilaian di halaman ini akan diperbarui seiring perkembangannya. Saat ini Taiwan.md tidak memiliki hubungan komersial apa pun dengan Twinkle Hub; halaman ini adalah pemeriksaan kesehatan langsung dari pengguna berat — sekaligus undangan: hanya bila lapisan data dan lapisan makna bekerja bersama, Taiwan dapat dipahami secara utuh.',
    pilotTitle: 'Artikel yang sudah tersambung ke lapisan data',
    pilotLead:
      'Sejak Juni 2026, kami menambahkan bagian "Data publik" di akhir artikel: tiap bagian mendaftar set data yang dapat memverifikasi (atau menggugurkan) klaim artikel, dengan satu baris alasan mengapa penunjuk itu ada. Gelombang pertama berisi enam artikel:',
  },
};
