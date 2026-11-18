---
title: 'Mini Taiwan Pulse — Visualisasi 3D Waktu Nyata Transportasi Taiwan'
description: 'Rasakan denyut nadi Taiwan dengan data terbuka—jejak cahaya penerbangan melintas langit, kapal mengarungi lautan, kereta berlari di rel, 23 lapisan menampilkan napas pulau ini secara waktu nyata.'
date: 2026-03-22
category: 'resources'
tags:
  [
    'sumber daya',
    'data-terbuka',
    'visualisasi',
    'transportasi',
    '3D',
    'waktu-nyata',
    'Taiwan.md',
  ]
subcategory: '公民科技'
author: 'Taiwan.md'
featured: false
lastVerified: 2026-03-22
lastHumanReview: false
curation: 'incubating'
curationReason: 'unverified'
translatedFrom: 'resources/mini-taiwan-pulse.md'
sourceCommitSha: 'be13f045'
sourceContentHash: 'sha256:409b7d5c9d0f3bbd'
sourceBodyHash: 'sha256:215016d553b05404'
translatedAt: '2026-09-13T05:56:48+08:00'
---

# Mini Taiwan Pulse — Visualisasi 3D Waktu Nyata Transportasi Taiwan 🌐

> 📖 **Artikel mendalam**: Sumber daya ini telah ditingkatkan menjadi artikel penelitian teknologi sipil mendalam, versi lengkap silakan baca [Mini Taiwan Pulse: Bagaimana Seorang Analis Data Menggambarkan Denyut Transportasi Taiwan Menjadi Jejak Cahaya 3D yang Bernapas](/id/technology/mini-taiwan-pulse-civic-tech) (2026-04-19). Halaman ini disimpan sebagai entri indeks daftar sumber daya.

> **Ringkasan 30 detik:** Sebuah proyek sumber terbuka yang memvisualisasikan dinamika transportasi Taiwan secara waktu nyata menjadi bola cahaya 3D dan jejak cahaya. Penerbangan mengukir busur di langit, kapal meninggalkan ekor di lautan, kereta berlari di rel—23 lapisan yang dapat dialihkan, memungkinkan Anda "melihat" denyut nadi Taiwan.

## Mengapa Patut Diperhatikan

Kebanyakan orang melihat peta Taiwan, yang terlihat adalah garis batas statis. Mini Taiwan Pulse memungkinkan Anda melihat sebuah **pulau yang sedang bernapas**.

Ambisi proyek ini tidak kecil: mengintegrasikan data terbuka yang tersebar di berbagai instansi pemerintah—penerbangan, AIS kapal, jadwal KA Taiwan (TRA) dan HSR, rute MRT, statistik populasi, observasi cuaca—ke dalam satu peta 3D yang sama. Bukan sekadar penandaan titik-titik sederhana, melainkan menggunakan bahasa visual bola cahaya, jejak cahaya, ekor komet, mengubah data menjadi pemandangan bergerak.

> **📝 Catatan Kurator**
> Infrastruktur data terbuka Taiwan berada di peringkat teratas di Asia (Indeks Data Terbuka Global [https://index.okfn.org/] beberapa kali masuk sepuluh besar), namun antara "data dibuka" dan "data terlihat" terdapat jurang yang besar. Mini Taiwan Pulse sedang mengisi kesenjangan ini.

## Tiga Lapisan Denyut

### Langit — Jejak Cahaya Penerbangan ✈️

Mencakup 14 bandara di seluruh Taiwan, dinamika waktu nyata 1.500+ penerbangan. Setiap pesawat adalah bola cahaya, di belakangnya menarik jejak cahaya gradien berbentuk ekor komet. Faktor perbesaran ketinggian dapat disesuaikan (1x–5x), membuat perbedaan jalur penerbangan rendah dan tinggi terlihat jelas.

Sumber data: FlightRadar24 API.

### Lautan — Pelacakan Kapal 🚢

Posisi kapal di perairan sekitar Taiwan, ditandai dengan bola cahaya biru kehijauan, setiap kapal meninggalkan jejak ekor selama 30 menit. Sistem secara otomatis menyaring lompatan GPS abnormal dan MMSI tidak valid, memastikan setiap titik cahaya yang Anda lihat adalah kapal nyata.

Sumber data: AIS (Sistem Identifikasi Otomatis) data posisi kapal.

### Darat — Enam Sistem Rel 🚄

Ini mungkin bagian paling menakjubkan. Enam sistem rel berjalan sinkron:

| Sistem               | Skala                                                               |
| -------------------- | ------------------------------------------------------------------- |
| KA Taiwan (TRA)      | 265 rute, 333 kereta, diklasifikasikan 6 warna menurut jenis kereta |
| HSR (THSR)           | Utama utara-selatan + cabang                                        |
| MRT Taipei (TRTC)    | 8 rute                                                              |
| MRT Kaohsiung (KRTC) | Merah + Oranye                                                      |
| LRT Kaohsiung (KLRT) | LRT lingkaran                                                       |
| MRT Taichung (TMRT)  | Hijau + Biru                                                        |

Penanganan KA Taiwan sangat kompleks—pencocokan rel OD, rute bercabang seperti Segitiga Changhua, semuanya memiliki mesin khusus untuk memprosesnya.

Sumber data: Jadwal publik + data rel [OpenStreetMap](https://www.openstreetmap.org/).

## Bukan Hanya Transportasi

Selain kendaraan bergerak, proyek ini juga menumpuk banyak lapisan analisis statis:

- **Infrastruktur**: batas 14 bandara, 535 tiang cahaya stasiun (ketinggian = frekuensi berhenti), 36 mercusuar dengan sinar putar 3D
- **Jaringan jalan**: jalan tol (merah), jalan provinsi (oranye), jalur sepeda (hijau), lebar adaptif zoom
- **Analisis populasi**: peta panas populasi H3 heksagonal, mendukung pergantian arus harian/malam, 9 indikator populasi
- **Cuaca**: data stasiun observasi waktu nyata + permukaan gelombang suhu 3D (resolusi grid 0.03°)
- **Berita**: RSS CNA Lembaga Berita Pusat + Gemini API geocoding, menandai kejadian berita di peta
- **Kemacetan jalan tol**: tingkat kemacetan waktu nyata dikodekan warna

Total **23 lapisan yang dapat dialihkan secara independen**, sepuluh kategori.

## Sorotan Teknis

- **TypeScript + Mapbox GL + Three.js**: peta 2D menggunakan rendering asli Mapbox, elemen 3D (bola cahaya, jejak cahaya, tiang cahaya, permukaan suhu) ditumpang menggunakan Three.js
- **Pertimbangan performa**: kapal menggunakan InstancedMesh rendering batch, pemotongan viewport (viewport culling) menghindari rendering objek yang tidak terlihat
- **Ilmu warna**: lapisan populasi menggunakan Plasma / Viridis / Inferno dan skala warna seragam persepsi, normalisasi log1p + gamma menangani distribusi ekor tebal, ramah buta warna
- **Lisensi MIT**: sepenuhnya sumber terbuka, selamat fork dan kontribusi

> **📝 Catatan Kurator**
> Penggunaan additive blending untuk penumpukan jejak cahaya adalah pilihan cerdas—area di mana banyak jalur penerbangan tumpang tindih secara alami menjadi lebih terang, secara visual langsung terlihat tingkat kesibukan jalur penerbangan, tanpa perlu grafik statistik tambahan.

## Ekosistem Data Terbuka

Sumber data yang dihubungkan proyek ini, sendiri sudah merupakan daftar panduan data terbuka Taiwan:

| Data                            | Sumber                                                          |
| ------------------------------- | --------------------------------------------------------------- |
| Posisi penerbangan waktu nyata  | FlightRadar24 API                                               |
| AIS kapal                       | Sistem Identifikasi Otomatis Kapal Internasional                |
| Jadwal rel                      | Jadwal publik + OSM                                             |
| Bus/angkutan/sepeda             | [TDX Data Transportasi Umum](https://tdx.transportdata.tw/)     |
| Statistik populasi              | [SEGIS Informasi Geografi Statistik](https://segis.moi.gov.tw/) |
| Observasi cuaca                 | [Badan Meteorologi Pusat](https://www.cwa.gov.tw/)              |
| Ladang angin lepas pantai       | Kementerian Ekonomi Biro Energi                                 |
| Kejadian berita                 | RSS CNA Lembaga Berita Pusat                                    |
| Batas bandara/pelabuhan/stasiun | [OSM Overpass API](https://overpass-turbo.eu/)                  |

⚠️ **Perlu dicatat:** [TDX Layanan Sirkulasi Data Transportasi](https://tdx.transportdata.tw/) Taiwan adalah sedikit platform pemerintah yang menstandarisasi data transportasi umum seluruh negara, mencakup bus, angkutan antar kota, rel, sepeda, dll., dokumentasi API lengkap dan gratis digunakan. Hal ini tidak umum di skala global.

## Tautan

- **GitHub**：[ianlkl11234s/mini-taiwan-pulse](https://github.com/ianlkl11234s/mini-taiwan-pulse)
- **Lisensi**：MIT License
- **Bahasa**：TypeScript
- **Sumber daya terkait**：[Platform Data TDX Transportasi](https://tdx.transportdata.tw/) · [Platform Data Terbuka Pemerintah](https://data.gov.tw/) · [Geografi Statistik SEGIS](https://segis.moi.gov.tw/)

---

_Terakhir diverifikasi: 2026-03-22_
