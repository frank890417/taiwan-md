---
title: 'Mini Taiwan Pulse — Visualisasi 3D Real-time Transportasi Taiwan'
description: 'Rasakan denyut nadi Taiwan melalui data terbuka—jejak penerbangan melintasi langit, kapal berlayar di permukaan laut, kereta melaju di rel; 23 lapisan menampilkan pernapasan pulau ini secara real-time.'
date: 2026-03-22
category: 'resources'
tags:
  [
    'sumber daya',
    'data terbuka',
    'visualisasi',
    'transportasi',
    '3D',
    'waktu nyata',
    'Taiwan.md',
  ]
subcategory: '公民科技'
author: 'Taiwan.md'
featured: false
lastVerified: 2026-03-22
lastHumanReview: false
translatedFrom: 'resources/mini-taiwan-pulse.md'
sourceCommitSha: '4b6d28c54'
sourceContentHash: 'sha256:409b7d5c9d0f3bbd'
sourceBodyHash: 'sha256:215016d553b05404'
translatedAt: '2026-09-10T03:36:19+08:00'
---

# Mini Taiwan Pulse — Visualisasi 3D Realtime Transportasi Taiwan 🌐

> 📖 **Artikel Mendalam**: Sumber daya ini telah ditingkatkan menjadi artikel penelitian teknologi sipil yang mendalam; versi lengkap dapat dilihat di [Mini Taiwan Pulse: Bagaimana seorang analis data menganimasikan denyut nadi transportasi Taiwan menjadi jejak cahaya 3D yang bernapas](/id/technology/mini-taiwan-pulse-civic-tech) (2026-04-19). Halaman ini dipertahankan sebagai entri daftar sumber daya.

> **Ikhtisar 30 Detik**: Sebuah proyek _open source_ yang mendinamisasi transportasi Taiwan menjadi bola dan jejak cahaya 3D. Pesawat melukis busur di langit, kapal meninggalkan ekor di permukaan laut, kereta berlari di rel—23 lapisan yang dapat diganti untuk membuat Anda "melihat" denyut nadi Taiwan.

## Mengapa Layak Diperhatikan

Kebanyakan orang melihat peta Taiwan sebagai garis luar statis. Mini Taiwan Pulse memungkinkan Anda melihat **pulau yang sedang bernapas**.

Proyek ini memiliki ambisi besar: mengintegrasikan data terbuka dari berbagai lembaga pemerintah—penerbangan, AIS kapal, jadwal kereta api cepat Taiwan (THSR), rute MRT, demografi, observasi meteorologi—ke dalam satu peta 3D. Ini bukan sekadar penanda titik; melainkan mengubah data menjadi pemandangan bergerak menggunakan bahasa visual seperti bola cahaya, jejak cahaya, dan ekor komet.

> **📝 Catatan Kurator**
> Infrastruktur data terbuka Taiwan menempati peringkat teratas di Asia (sering masuk sepuluh besar dalam [Indeks Data Terbuka Global](https://index.okfn.org/)), namun terdapat kesenjangan besar antara "keterbukaan data" dan "data yang terlihat". Mini Taiwan Pulse sedang mengisi celah ini.

## Tiga Lapisan Denyut Nadi

### Langit — Jejak Cahaya Penerbangan ✈️

Meliputi 14 bandara di seluruh Taiwan, dengan lebih dari 1.500 penerbangan secara dinamis. Setiap pesawat adalah bola bercahaya yang meninggalkan jejak cahaya gradien seperti komet di belakangnya. Rasio ketinggian dapat disesuaikan (1x hingga 5x), membuat perbedaan antara rute rendah dan rute tinggi terlihat jelas.

Sumber data: API FlightRadar24.

### Lautan — Pelacakan Kapal 🚢

Posisi kapal di perairan sekitar Taiwan ditandai dengan bola cahaya biru kehijauan, dan setiap kapal meninggalkan jejak selama 30 menit. Sistem secara otomatis menyaring lonjakan GPS yang abnormal dan MMSI yang tidak valid, memastikan bahwa setiap titik cahaya yang Anda lihat adalah kapal yang nyata.

Sumber data: Data posisi kapal AIS (Sistem Identifikasi Otomatis).

### Daratan — Enam Sistem Jalur 🚄

Ini mungkin bagian yang paling menakjubkan. Enam sistem jalur beroperasi secara sinkron:

| Sistem                      | Skala                                                                                    |
| :-------------------------- | :--------------------------------------------------------------------------------------- |
| Kereta Api Taiwan (TRA)     | 265 rute, 333 rangkaian kereta, diklasifikasikan dengan 6 warna berdasarkan jenis kereta |
| Kereta Cepat (THSR)         | Jalur utama Utara-Selatan + cabang                                                       |
| MRT Taipei (TRTC)           | 8 rute                                                                                   |
| MRT Kaohsiung (KRTC)        | Garis Merah + Garis Jingga                                                               |
| Light Rail Kaohsiung (KLRT) | Ringan melingkar                                                                         |
| MRT Taichung (TMRT)         | Garis Hijau + Garis Biru                                                                 |

Pemrosesan TRA sangat kompleks—pencocokan rute OD, seperti jalur bercabang di Delta Changhua, ditangani oleh mesin khusus.

Sumber data: Jadwal publik + data jalur OpenStreetMap (https://www.openstreetmap.org/).

## Lebih dari Sekadar Transportasi

Selain kendaraan yang bergerak, proyek ini juga menumpuk lapisan statis dan analitik:

- **Infrastruktur**: Batas 14 bandara, pilar cahaya 535 stasiun (tinggi = jumlah pemberhentian), berkas rotasi 36 mercusuar dalam 3D
- **Jaringan Jalan**: Jalan Nasional (Merah), Jalan Provinsi (Jingga), Jalur Sepeda (Hijau), lebar yang menyesuaikan _zoom_
- **Analisis Populasi**: Peta panas populasi heksagonal H3, mendukung peralihan lalu lintas siang/malam, 9 indikator demografi
- **Meteorologi**: Data real-time stasiun observasi + permukaan gelombang suhu 3D (resolusi grid 0.03°)
- **Berita**: RSS CNA Central News Agency + pengkodean geografis Gemini, menandai peristiwa berita di peta
- **Kemacetan Jalan Nasional**: Pengkodean warna tingkat kemacetan real-time

Total **23 lapisan yang dapat diganti secara independen**, dibagi dalam sepuluh kategori.

## Sorotan Teknis

- **TypeScript + Mapbox GL + Three.js**: Peta 2D dirender secara asli oleh Mapbox, sementara elemen 3D (bola cahaya, jejak cahaya, pilar cahaya, permukaan suhu) ditumpuk menggunakan Three.js
- **Pertimbangan Kinerja**: Penggunaan _InstancedMesh_ untuk rendering kelompok kapal, dan pemotongan pandangan (_viewport culling_) untuk menghindari rendering objek yang tidak terlihat
- **Ilmu Warna**: Lapisan populasi menggunakan skala warna perseptual seperti Plasma / Viridis / Inferno; normalisasi ekor panjang dengan log1p + gamma, ramah terhadap buta warna
- **Lisensi MIT**: Sepenuhnya _open source_, sambutan untuk _fork_ dan kontribusi

> **📝 Catatan Kurator**
> Penggunaan _additive blending_ untuk menumpuk jejak cahaya adalah pilihan cerdas—area di mana banyak rute tumpang tindih secara alami menjadi lebih terang, sehingga kepadatan rute dapat dilihat secara visual tanpa perlu grafik statistik tambahan.

## Ekosistem Data Terbuka

Sumber data yang disambungkan oleh proyek ini sendiri merupakan daftar panduan data terbuka Taiwan:

| Data                            | Sumber                                                        |
| :------------------------------ | :------------------------------------------------------------ |
| Posisi penerbangan real-time    | API FlightRadar24                                             |
| AIS kapal                       | Sistem Identifikasi Otomatis Kapal Internasional              |
| Jadwal kereta api               | Jadwal publik + OSM                                           |
| Bus/Angkutan Umum/Sepeda        | [Data Transportasi Publik TDX](https://tdx.transportdata.tw/) |
| Statistik populasi              | [Geoinformasi Statistik SEGIS](https://segis.moi.gov.tw/)     |
| Observasi meteorologi           | [Badan Meteorologi Pusat](https://www.cwa.gov.tw/)            |
| Area angin lepas pantai         | Biro Energi Kementerian Ekonomi                               |
| Peristiwa berita                | RSS CNA Central News Agency                                   |
| Batas bandara/pelabuhan/stasiun | [API Overpass OSM](https://overpass-turbo.eu/)                |

⚠️ **Perlu diperhatikan**: [Layanan Distribusi Data Transportasi TDX](https://tdx.transportdata.tw/) Taiwan adalah salah satu platform pemerintah yang menstandarisasi data transportasi publik nasional, mencakup bus, angkutan umum, kereta api, dan sepeda; dokumentasi API lengkap dan gratis untuk digunakan. Ini jarang terjadi secara global.

## Tautan

- **GitHub**: [ianlkl11234s/mini-taiwan-pulse](https://github.com/ianlkl11234s/mini-taiwan-pulse)
- **Lisensi**: Lisensi MIT
- **Bahasa**: TypeScript
- **Sumber Daya Terkait**: [Platform Data Transportasi TDX](https://tdx.transportdata.tw/) · [Platform Data Terbuka Pemerintah](https://data.gov.tw/) · [Geografi Statistik SEGIS](https://segis.moi.gov.tw/)

---

_Verifikasi terakhir: 2026-03-22_
