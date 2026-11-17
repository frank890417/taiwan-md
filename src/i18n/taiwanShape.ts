export const taiwanShapeUI = {
  en: {
    'taiwanShape.svg.icon.desc':
      'Simple filled outline — great for icons, favicons, buttons.',
    'taiwanShape.svg.simplemaps.desc':
      'Clean vector — great for web embedding.',
    'taiwanShape.svg.locationMap.desc':
      'Location map with lat/lon grid and city markers.',
    'taiwanShape.svg.politicalDivision.desc':
      'County borders — colored administrative divisions.',
    // Meta
    'taiwanShape.meta.title':
      'Free Taiwan Map Download: County Maps in SVG, GeoJSON & TopoJSON',
    'taiwanShape.meta.description':
      "Complete open-source Taiwan map data: SVG outlines, TopoJSON for counties and townships, usage examples in D3.js, Leaflet, Python, and Vue. AI keeps drawing Taiwan wrong — here's the correct data.",

    // Hero
    'taiwanShape.hero.kicker': '🗺️ Open Cartographic Archive',
    'taiwanShape.hero.title': "Taiwan's Shape",
    'taiwanShape.hero.subtitle':
      'SVG, GeoJSON, TopoJSON — a complete open-source map dataset for developers, designers, and researchers.',

    // Story
    'taiwanShape.story.heading': 'Why the shape of Taiwan matters',
    'taiwanShape.story.p1':
      "Ask any AI image generator to draw Taiwan and watch what happens. It usually spits out a fat, rounded blob somewhere between an olive and a potato. Taiwan is not an olive. It's a 394-kilometer-long sweet potato with a central mountain range and more than 100 offshore islands.",
    'taiwanShape.story.p2':
      "Getting the shape right is not just a design nit — it's an identity problem. This page collects all the open-source assets we use on taiwan.md so anyone can render Taiwan accurately in their own project.",

    // Comparison
    'taiwanShape.comparison.title': '🤖 vs. 🇹🇼 — AI gets this wrong. Always.',
    'taiwanShape.comparison.aiLabel': 'AI-generated (wrong)',
    'taiwanShape.comparison.correctLabel': 'Correct (Wikipedia)',

    // SVG section
    'taiwanShape.svg.heading': '📐 SVG outlines — instant drop-in',
    'taiwanShape.svg.description':
      'Four hand-picked SVG files, all CC / public domain. Drop directly into any website, app, or design file.',
    'taiwanShape.svg.usageHeading': 'Usage examples',
    'taiwanShape.svg.licenseNote':
      'All SVGs are under Creative Commons or public domain. Attribution appreciated but not required.',

    // GeoJSON / TopoJSON section
    'taiwanShape.geo.heading': '🌐 TopoJSON — interactive maps at county level',
    'taiwanShape.geo.intro1':
      "For interactive maps — zoom, hover, fill by data value — you need real geographic coordinates, not just SVG paths. We bundle TopoJSON files extracted from Waiting's taiwan-vue-components (MIT License, 2018).",
    'taiwanShape.geo.intro2':
      'TopoJSON is GeoJSON compressed: shared borders between counties are stored only once, making files 80% smaller. It can be converted to GeoJSON on the fly with topojson-client.',
    'taiwanShape.geo.formatHeading': 'TopoJSON vs GeoJSON — which one?',
    'taiwanShape.geo.formatTopo':
      'TopoJSON: smaller file size, shared topology between adjacent regions, the right choice for web maps.',
    'taiwanShape.geo.formatGeo':
      'GeoJSON: simpler format, direct compatibility with Python geopandas, QGIS, and most GIS tools.',
    'taiwanShape.geo.countryHeading': 'Country-level outline (22 counties)',
    'taiwanShape.geo.countryDesc':
      '~21 KB TopoJSON file with all 22 counties and special municipalities as separate features. Perfect for choropleth maps.',
    'taiwanShape.geo.townsHeading': 'Township-level (all 22 counties & cities)',
    'taiwanShape.geo.townsDesc':
      'We bundle township-level TopoJSON files for all 22 counties and cities, all extracted from the same source repository.',

    // Admin codes
    'taiwanShape.codes.heading': '🧭 Administrative division codes',
    'taiwanShape.codes.intro':
      "Taiwan's administrative divisions use numeric codes. Here's the reference table for all 22 county-level divisions (file naming follows `towns-{code}.json`).",
    'taiwanShape.codes.codeCol': 'Code',
    'taiwanShape.codes.nameCol': 'Division',
    'taiwanShape.codes.typeCol': 'Type',

    // Usage examples
    'taiwanShape.examples.heading': '💻 Usage examples',
    'taiwanShape.examples.htmlTitle': 'HTML — static embed',
    'taiwanShape.examples.cssTitle': 'CSS — background image',
    'taiwanShape.examples.d3Title': 'D3.js — interactive choropleth',
    'taiwanShape.examples.pythonTitle': 'Python — geopandas',
    'taiwanShape.examples.leafletTitle': 'Leaflet — tile-based map overlay',
    'taiwanShape.examples.vueTitle': 'Vue — taiwan-vue-components',

    // Other sources
    'taiwanShape.others.heading': '📚 Other open data sources',
    'taiwanShape.others.intro':
      "If you need more than what's bundled here — higher resolution, different projections, historical administrative boundaries — these are the sources we recommend:",

    // License
    'taiwanShape.license.heading': '⚖️ License & attribution',
    'taiwanShape.license.intro':
      'Every file on this page is open source. Here are the exact origins and licenses:',

    // Download
    // Taiwan-shape ternary-fallback fix (2026-08-17)
    'taiwanShape.geo.townsSourceNote':
      'All 22 counties and cities are included above. Township boundary data extracted from ',
    'taiwanShape.source.dataGovTw.desc':
      'Official Taiwan government open data, including administrative boundary shapefiles from the Ministry of the Interior.',
    'taiwanShape.source.naturalEarth.desc':
      'Public domain global map data at 1:10m, 1:50m, and 1:110m scales. Great for small-scale world maps that include Taiwan.',
    'taiwanShape.source.osm.desc':
      "OSM's community-edited map of Taiwan, downloadable as OSM XML or PBF via Overpass API and Geofabrik.",
    'taiwanShape.source.g0v.desc':
      "Taiwan's civic tech community. Many g0v projects publish cleaned-up map data and visualizations as open source.",
    'taiwanShape.source.gadm.desc':
      'Global Administrative Areas database, Taiwan administrative boundaries at levels 0-3 in Shapefile, GeoPackage, KMZ, and R formats.',
    'taiwanShape.license.wikimedia.desc':
      'Wikimedia Commons, Creative Commons.',
    'taiwanShape.license.simplemaps.desc':
      'SimpleMaps, free for personal and commercial use with attribution.',
    'taiwanShape.license.extractedFromPrefix': 'Extracted from ',
    'taiwanShape.download.svg': 'Download SVG',
    'taiwanShape.download.topo': 'Download TopoJSON',
    'taiwanShape.download.all': 'Download all (ZIP)',
    'taiwanShape.copy.button': 'Copy SVG',
    'taiwanShape.copy.copied': '✓ Copied',
  },

  vi: {
    'taiwanShape.svg.icon.desc':
      'Đường viền tô đặc đơn giản — hợp cho biểu tượng, favicon, nút bấm.',
    'taiwanShape.svg.simplemaps.desc':
      'Vector gọn gàng — hợp để nhúng vào web.',
    'taiwanShape.svg.locationMap.desc':
      'Bản đồ vị trí có lưới kinh vĩ độ và điểm đánh dấu thành phố.',
    'taiwanShape.svg.politicalDivision.desc':
      'Ranh giới huyện thị — các đơn vị hành chính được tô màu.',
    // Meta
    'taiwanShape.meta.title':
      'Hình dáng Đài Loan — Bộ dữ liệu bản đồ nguồn mở: SVG, GeoJSON, TopoJSON',
    'taiwanShape.meta.description':
      'Dữ liệu bản đồ Đài Loan nguồn mở đầy đủ: đường nét SVG, TopoJSON cấp huyện thị và hương trấn, ví dụ sử dụng D3.js / Leaflet / Python / Vue. Đài Loan do AI vẽ luôn sai, còn ở đây là chính xác.',

    'taiwanShape.hero.kicker': '🗺️ Bộ dữ liệu bản đồ nguồn mở',
    'taiwanShape.hero.title': 'Hình dáng Đài Loan',
    'taiwanShape.hero.subtitle':
      'SVG, GeoJSON, TopoJSON — dữ liệu bản đồ nguồn mở đầy đủ dành cho nhà phát triển, nhà thiết kế và nhà nghiên cứu.',

    'taiwanShape.story.heading': 'Vì sao hình dáng Đài Loan quan trọng',
    'taiwanShape.story.p1':
      'Hãy yêu cầu bất kỳ công cụ tạo ảnh AI nào vẽ Đài Loan, kết quả gần như luôn là một vật tròn trịa, mập mạp, nửa giống quả ô liu, nửa giống củ khoai tây. Đài Loan không phải quả ô liu. Đó là một củ khoai lang dài 394 km, với dãy núi Trung Ương chạy dọc từ bắc xuống nam và hơn một trăm đảo ngoài khơi.',
    'taiwanShape.story.p2':
      'Vẽ đúng hình dáng không chỉ là một chi tiết thiết kế, mà còn là vấn đề bản sắc. Trang này tập hợp toàn bộ tài nguyên bản đồ nguồn mở mà chúng tôi sử dụng trên taiwan.md, giúp bất kỳ ai cũng có thể thể hiện Đài Loan một cách chính xác trong dự án của mình.',

    'taiwanShape.comparison.title':
      '🤖 vs. 🇹🇼 — AI lần nào cũng vẽ sai, thật đấy',
    'taiwanShape.comparison.aiLabel': 'Do AI tạo (sai)',
    'taiwanShape.comparison.correctLabel': 'Phiên bản chính xác (Wikipedia)',

    'taiwanShape.svg.heading': '📐 Đường nét SVG — nhúng trực tiếp',
    'taiwanShape.svg.description':
      'Bốn bộ tệp SVG tuyển chọn, tất cả đều theo giấy phép CC hoặc thuộc phạm vi công cộng. Có thể đưa trực tiếp vào bất kỳ trang web, App hoặc bản thiết kế nào.',
    'taiwanShape.svg.usageHeading': 'Cách sử dụng',
    'taiwanShape.svg.licenseNote':
      'Tất cả SVG đều theo giấy phép Creative Commons hoặc thuộc phạm vi công cộng. Nên ghi nguồn nhưng không bắt buộc.',

    'taiwanShape.geo.heading': '🌐 TopoJSON — bản đồ tương tác cấp huyện thị',
    'taiwanShape.geo.intro1':
      'Nếu muốn làm bản đồ tương tác — thu phóng, di chuột, tô màu theo giá trị dữ liệu — thứ bạn cần không phải là đường dẫn SVG, mà là dữ liệu tọa độ địa lý thực sự. Chúng tôi đã đóng gói các tệp TopoJSON trích xuất từ taiwan-vue-components của Waiting (giấy phép MIT, 2018).',
    'taiwanShape.geo.intro2':
      'TopoJSON là phiên bản nén của GeoJSON: ranh giới dùng chung giữa các huyện thị liền kề chỉ được lưu một lần, giúp tệp nhỏ hơn 80%. Có thể dùng topojson-client để chuyển đổi tức thời về GeoJSON.',
    'taiwanShape.geo.formatHeading': 'TopoJSON vs GeoJSON — nên chọn loại nào',
    'taiwanShape.geo.formatTopo':
      'TopoJSON: tệp nhỏ, các khu vực liền kề dùng chung ranh giới, phù hợp để làm bản đồ web tương tác.',
    'taiwanShape.geo.formatGeo':
      'GeoJSON: định dạng đơn giản, tương thích trực tiếp với Python geopandas, QGIS và phần lớn công cụ GIS.',
    'taiwanShape.geo.countryHeading': 'Đường nét toàn quốc (22 huyện thị)',
    'taiwanShape.geo.countryDesc':
      'Tệp TopoJSON khoảng 21 KB, gồm 22 huyện, thị và thành phố trực thuộc trung ương, mỗi đơn vị là một feature độc lập. Điểm khởi đầu để tạo bản đồ choropleth.',
    'taiwanShape.geo.townsHeading':
      'Dữ liệu cấp hương trấn của toàn bộ 22 huyện thị',
    'taiwanShape.geo.townsDesc':
      'Chúng tôi đã đóng gói các tệp TopoJSON cấp hương trấn của toàn bộ 22 huyện thị, đều được trích xuất từ cùng một repo nguồn.',

    'taiwanShape.codes.heading': '🧭 Bảng đối chiếu mã đơn vị hành chính',
    'taiwanShape.codes.intro':
      'Các đơn vị hành chính của Đài Loan được mã hóa bằng số. Dưới đây là bảng đối chiếu 22 đơn vị hành chính cấp huyện thị (quy tắc đặt tên tệp: `towns-{code}.json`).',
    'taiwanShape.codes.codeCol': 'Mã',
    'taiwanShape.codes.nameCol': 'Đơn vị hành chính',
    'taiwanShape.codes.typeCol': 'Loại',

    'taiwanShape.examples.heading': '💻 Ví dụ sử dụng',
    'taiwanShape.examples.htmlTitle': 'HTML — nhúng tĩnh',
    'taiwanShape.examples.cssTitle': 'CSS — ảnh nền',
    'taiwanShape.examples.d3Title': 'D3.js — choropleth tương tác',
    'taiwanShape.examples.pythonTitle': 'Python — geopandas',
    'taiwanShape.examples.leafletTitle': 'Leaflet — lớp phủ trên bản đồ lát',
    'taiwanShape.examples.vueTitle': 'Vue — taiwan-vue-components',

    'taiwanShape.others.heading': '📚 Các nguồn dữ liệu mở khác',
    'taiwanShape.others.intro':
      'Nếu bạn cần nhiều hơn những gì được đóng gói ở đây — độ phân giải cao hơn, phép chiếu khác, ranh giới hành chính lịch sử — dưới đây là các nguồn chúng tôi đề xuất:',

    'taiwanShape.license.heading': '⚖️ Giấy phép và nguồn',
    'taiwanShape.license.intro':
      'Mọi tệp trên trang này đều là nguồn mở. Dưới đây là thông tin đầy đủ về nguồn và giấy phép:',

    // Taiwan-shape ternary-fallback fix (2026-08-17)
    'taiwanShape.geo.townsSourceNote':
      'Trên đã bao gồm đầy đủ 22 huyện và thành phố. Dữ liệu ranh giới xã, thị trấn trích từ ',
    'taiwanShape.source.dataGovTw.desc':
      'Nền tảng dữ liệu mở chính thức của chính phủ, bao gồm Shapefile ranh giới hành chính do Bộ Nội vụ phát hành.',
    'taiwanShape.source.naturalEarth.desc':
      'Dữ liệu bản đồ toàn cầu thuộc phạm vi công cộng, với ba tỷ lệ 1:10m / 1:50m / 1:110m. Phù hợp để tạo bản đồ thế giới có Đài Loan.',
    'taiwanShape.source.osm.desc':
      'Bản đồ Đài Loan do cộng đồng OSM biên tập, tải về dưới dạng OSM XML hoặc PBF qua Overpass API và Geofabrik.',
    'taiwanShape.source.g0v.desc':
      'Cộng đồng công nghệ dân sự Đài Loan. Nhiều dự án g0v công bố dữ liệu bản đồ đã được làm sạch và các trực quan hóa dưới dạng nguồn mở.',
    'taiwanShape.source.gadm.desc':
      'Cơ sở dữ liệu khu vực hành chính toàn cầu, ranh giới hành chính Đài Loan cấp 0-3, cung cấp định dạng Shapefile / GeoPackage / KMZ / R.',
    'taiwanShape.license.wikimedia.desc':
      'Wikimedia Commons, giấy phép Creative Commons.',
    'taiwanShape.license.simplemaps.desc':
      'SimpleMaps, sử dụng miễn phí cho mục đích thương mại khi ghi rõ nguồn.',
    'taiwanShape.license.extractedFromPrefix': 'Trích từ ',
    'taiwanShape.download.svg': 'Tải SVG',
    'taiwanShape.download.topo': 'Tải TopoJSON',
    'taiwanShape.download.all': 'Tải tất cả (ZIP)',
    'taiwanShape.copy.button': 'Sao chép SVG',
    'taiwanShape.copy.copied': '✓ Đã sao chép',
  },
  id: {
    'taiwanShape.svg.icon.desc':
      'Garis luar terisi sederhana — cocok untuk ikon, favicon, tombol.',
    'taiwanShape.svg.simplemaps.desc':
      'Vektor bersih — cocok untuk disematkan di web.',
    'taiwanShape.svg.locationMap.desc':
      'Peta lokasi dengan grid lintang/bujur dan penanda kota.',
    'taiwanShape.svg.politicalDivision.desc':
      'Batas kabupaten — pembagian administratif berwarna.',
    // Meta
    'taiwanShape.meta.title':
      'Bentuk Taiwan — Kumpulan Data Peta Sumber Terbuka: SVG, GeoJSON, TopoJSON',
    'taiwanShape.meta.description':
      'Data peta Taiwan sumber terbuka yang lengkap: kontur SVG, TopoJSON tingkat kabupaten/kota dan kecamatan, serta contoh penggunaan D3.js / Leaflet / Python / Vue. Taiwan yang digambar AI selalu salah, yang benar ada di sini.',

    'taiwanShape.hero.kicker': '🗺️ Kumpulan Data Peta Sumber Terbuka',
    'taiwanShape.hero.title': 'Bentuk Taiwan',
    'taiwanShape.hero.subtitle':
      'SVG, GeoJSON, TopoJSON — data peta sumber terbuka yang lengkap untuk pengembang, desainer, dan peneliti.',

    'taiwanShape.story.heading': 'Mengapa Bentuk Taiwan Penting',
    'taiwanShape.story.p1':
      'Mintalah alat pembuat gambar AI mana pun untuk menggambar Taiwan, hasilnya hampir selalu berupa benda bulat dan gemuk, antara buah zaitun dan kentang. Taiwan bukan buah zaitun. Bentuknya seperti ubi jalar sepanjang 394 kilometer, dengan Pegunungan Tengah yang membentang dari utara ke selatan serta lebih dari seratus pulau lepas pantai.',
    'taiwanShape.story.p2':
      'Menggambar bentuknya dengan benar bukan sekadar detail desain, melainkan persoalan identitas. Halaman ini mengumpulkan semua materi peta sumber terbuka yang kami gunakan di taiwan.md agar siapa pun dapat menampilkan Taiwan secara akurat dalam proyek mereka sendiri.',

    'taiwanShape.comparison.title':
      '🤖 vs. 🇹🇼 — AI Selalu Salah Menggambarnya, Sungguh',
    'taiwanShape.comparison.aiLabel': 'Buatan AI (Salah)',
    'taiwanShape.comparison.correctLabel': 'Versi yang Benar (Wikipedia)',

    'taiwanShape.svg.heading': '📐 Kontur SVG — Sematkan Langsung',
    'taiwanShape.svg.description':
      'Empat set berkas SVG pilihan, semuanya berlisensi CC atau berada dalam domain publik. Dapat langsung digunakan di halaman web, App, atau rancangan desain apa pun.',
    'taiwanShape.svg.usageHeading': 'Cara Penggunaan',
    'taiwanShape.svg.licenseNote':
      'Semua SVG berlisensi Creative Commons atau berada dalam domain publik. Sebaiknya cantumkan sumber, tetapi tidak wajib.',

    'taiwanShape.geo.heading':
      '🌐 TopoJSON — Peta Interaktif Tingkat Kabupaten/Kota',
    'taiwanShape.geo.intro1':
      'Jika Anda ingin membuat peta interaktif—dengan fitur zoom, efek saat kursor diarahkan, dan pewarnaan berdasarkan nilai data—yang Anda butuhkan bukan jalur SVG, melainkan data koordinat geografis yang sesungguhnya. Kami telah mengemas berkas TopoJSON yang diekstrak dari taiwan-vue-components milik Waiting (lisensi MIT, 2018).',
    'taiwanShape.geo.intro2':
      'TopoJSON adalah versi GeoJSON yang dikompresi: batas yang digunakan bersama oleh kabupaten/kota bertetangga hanya disimpan satu kali sehingga ukuran berkas 80% lebih kecil. Gunakan topojson-client untuk mengonversinya kembali menjadi GeoJSON secara langsung.',
    'taiwanShape.geo.formatHeading':
      'TopoJSON vs GeoJSON — Mana yang Harus Dipilih',
    'taiwanShape.geo.formatTopo':
      'TopoJSON: berkas lebih kecil, wilayah bertetangga berbagi batas, cocok untuk membuat peta web interaktif.',
    'taiwanShape.geo.formatGeo':
      'GeoJSON: format sederhana, langsung kompatibel dengan Python geopandas, QGIS, dan sebagian besar alat GIS.',
    'taiwanShape.geo.countryHeading':
      'Kontur Seluruh Negara (22 Kabupaten/Kota)',
    'taiwanShape.geo.countryDesc':
      'Berkas TopoJSON berukuran sekitar 21 KB yang mencakup 22 kabupaten, kota, dan munisipalitas khusus, masing-masing sebagai feature tersendiri. Titik awal untuk membuat peta choropleth.',
    'taiwanShape.geo.townsHeading':
      'Data Tingkat Kecamatan untuk Seluruh 22 Kabupaten/Kota',
    'taiwanShape.geo.townsDesc':
      'Kami telah mengemas berkas TopoJSON tingkat kecamatan untuk seluruh 22 kabupaten/kota, semuanya diekstrak dari repo sumber yang sama.',

    'taiwanShape.codes.heading':
      '🧭 Tabel Referensi Kode Wilayah Administratif',
    'taiwanShape.codes.intro':
      'Wilayah administratif Taiwan dikodekan menggunakan angka. Berikut adalah tabel referensi untuk 22 wilayah administratif tingkat kabupaten/kota (aturan penamaan berkas: `towns-{code}.json`).',
    'taiwanShape.codes.codeCol': 'Kode',
    'taiwanShape.codes.nameCol': 'Wilayah Administratif',
    'taiwanShape.codes.typeCol': 'Jenis',

    'taiwanShape.examples.heading': '💻 Contoh Penggunaan',
    'taiwanShape.examples.htmlTitle': 'HTML — Penyematan Statis',
    'taiwanShape.examples.cssTitle': 'CSS — Gambar Latar Belakang',
    'taiwanShape.examples.d3Title': 'D3.js — Choropleth Interaktif',
    'taiwanShape.examples.pythonTitle': 'Python — geopandas',
    'taiwanShape.examples.leafletTitle': 'Leaflet — Hamparan Peta Ubin',
    'taiwanShape.examples.vueTitle': 'Vue — taiwan-vue-components',

    'taiwanShape.others.heading': '📚 Sumber Data Terbuka Lainnya',
    'taiwanShape.others.intro':
      'Jika Anda membutuhkan lebih banyak daripada yang kami kemas di sini—resolusi lebih tinggi, proyeksi berbeda, atau batas wilayah administratif historis—berikut adalah sumber yang kami rekomendasikan:',

    'taiwanShape.license.heading': '⚖️ Lisensi dan Sumber',
    'taiwanShape.license.intro':
      'Setiap berkas di halaman ini bersifat sumber terbuka. Berikut adalah informasi lengkap mengenai sumber dan lisensinya:',

    // Taiwan-shape ternary-fallback fix (2026-08-17)
    'taiwanShape.geo.townsSourceNote':
      'Seluruh 22 kabupaten dan kota tercantum di atas. Data batas kecamatan diambil dari ',
    'taiwanShape.source.dataGovTw.desc':
      'Platform data terbuka resmi pemerintah, mencakup Shapefile batas wilayah administratif yang diterbitkan oleh Kementerian Dalam Negeri.',
    'taiwanShape.source.naturalEarth.desc':
      'Data peta global berstatus domain publik dalam tiga skala: 1:10m / 1:50m / 1:110m. Cocok untuk membuat peta dunia yang mencakup Taiwan.',
    'taiwanShape.source.osm.desc':
      'Peta Taiwan hasil suntingan komunitas OSM, dapat diunduh sebagai OSM XML atau PBF melalui Overpass API dan Geofabrik.',
    'taiwanShape.source.g0v.desc':
      'Komunitas teknologi warga Taiwan. Banyak proyek g0v memublikasikan data peta yang sudah dirapikan dan visualisasinya sebagai sumber terbuka.',
    'taiwanShape.source.gadm.desc':
      'Basis data wilayah administratif global, batas wilayah administratif Taiwan tingkat 0-3, tersedia dalam format Shapefile / GeoPackage / KMZ / R.',
    'taiwanShape.license.wikimedia.desc':
      'Wikimedia Commons, berlisensi Creative Commons.',
    'taiwanShape.license.simplemaps.desc':
      'SimpleMaps, gratis untuk penggunaan komersial dengan mencantumkan sumber.',
    'taiwanShape.license.extractedFromPrefix': 'Diambil dari ',
    'taiwanShape.download.svg': 'Unduh SVG',
    'taiwanShape.download.topo': 'Unduh TopoJSON',
    'taiwanShape.download.all': 'Unduh Semua (ZIP)',
    'taiwanShape.copy.button': 'Salin SVG',
    'taiwanShape.copy.copied': '✓ Disalin',
  },
  pt: {
    'taiwanShape.svg.icon.desc':
      'Contorno preenchido simples — ideal para ícones, favicons e botões.',
    'taiwanShape.svg.simplemaps.desc':
      'Vetor limpo — ideal para incorporar na web.',
    'taiwanShape.svg.locationMap.desc':
      'Mapa de localização com grelha de lat/lon e marcadores de cidades.',
    'taiwanShape.svg.politicalDivision.desc':
      'Limites de condados — divisões administrativas a cores.',
    // Meta
    'taiwanShape.meta.title':
      'O formato de Taiwan — Conjunto de dados cartográficos de código aberto: SVG, GeoJSON, TopoJSON',
    'taiwanShape.meta.description':
      'Dados cartográficos completos e de código aberto de Taiwan: contornos SVG, TopoJSON de condados, cidades e municípios, além de exemplos de uso com D3.js / Leaflet / Python / Vue. A Taiwan desenhada por IA está sempre errada; aqui está correta.',

    'taiwanShape.hero.kicker':
      '🗺️ Conjunto de dados cartográficos de código aberto',
    'taiwanShape.hero.title': 'O formato de Taiwan',
    'taiwanShape.hero.subtitle':
      'SVG, GeoJSON, TopoJSON — dados cartográficos completos e de código aberto para desenvolvedores, designers e pesquisadores.',

    'taiwanShape.story.heading': 'Por que o formato de Taiwan é importante',
    'taiwanShape.story.p1':
      'Peça a qualquer ferramenta de geração de imagens por IA para desenhar Taiwan e o resultado quase sempre será algo redondo e rechonchudo, entre uma azeitona e uma batata. Taiwan não é uma azeitona. É uma batata-doce de 394 quilômetros de comprimento, com uma cordilheira central que atravessa a ilha de norte a sul e mais de cem ilhas periféricas.',
    'taiwanShape.story.p2':
      'Representar o formato corretamente não é apenas um detalhe de design, mas uma questão de identidade. Esta página reúne todos os recursos cartográficos de código aberto que usamos no taiwan.md, para que qualquer pessoa possa representar Taiwan com precisão em seu próprio projeto.',

    'taiwanShape.comparison.title':
      '🤖 vs. 🇹🇼 — A IA erra toda vez, de verdade',
    'taiwanShape.comparison.aiLabel': 'Gerado por IA (errado)',
    'taiwanShape.comparison.correctLabel': 'Versão correta (Wikipédia)',

    'taiwanShape.svg.heading': '📐 Contornos SVG — incorporação direta',
    'taiwanShape.svg.description':
      'Quatro conjuntos selecionados de arquivos SVG, todos sob licenças CC ou em domínio público. Podem ser inseridos diretamente em qualquer página web, App ou projeto de design.',
    'taiwanShape.svg.usageHeading': 'Como usar',
    'taiwanShape.svg.licenseNote':
      'Todos os SVG estão sob licenças Creative Commons ou em domínio público. A atribuição da fonte é recomendada, mas não obrigatória.',

    'taiwanShape.geo.heading':
      '🌐 TopoJSON — mapa interativo por condado e cidade',
    'taiwanShape.geo.intro1':
      'Se você deseja criar um mapa interativo — com zoom, efeitos ao passar o mouse e cores baseadas em valores de dados — não precisa de caminhos SVG, mas de dados com coordenadas geográficas reais. Empacotamos os arquivos TopoJSON extraídos do taiwan-vue-components de Waiting (licença MIT, 2018).',
    'taiwanShape.geo.intro2':
      'TopoJSON é uma versão compactada do GeoJSON: as fronteiras compartilhadas entre condados e cidades vizinhos são armazenadas apenas uma vez, reduzindo o arquivo em 80%. Com topojson-client, é possível convertê-lo novamente em GeoJSON em tempo real.',
    'taiwanShape.geo.formatHeading': 'TopoJSON vs GeoJSON — qual escolher',
    'taiwanShape.geo.formatTopo':
      'TopoJSON: arquivos menores, fronteiras compartilhadas entre regiões vizinhas, ideal para mapas interativos na web.',
    'taiwanShape.geo.formatGeo':
      'GeoJSON: formato simples, diretamente compatível com Python geopandas, QGIS e a maioria das ferramentas GIS.',
    'taiwanShape.geo.countryHeading':
      'Contorno nacional (22 condados e cidades)',
    'taiwanShape.geo.countryDesc':
      'Arquivo TopoJSON de aproximadamente 21 KB, contendo 22 condados, cidades e municípios especiais, cada um como uma feature independente. Um ponto de partida para criar mapas choropleth.',
    'taiwanShape.geo.townsHeading':
      'Dados municipais dos 22 condados e cidades',
    'taiwanShape.geo.townsDesc':
      'Empacotamos os arquivos TopoJSON em nível municipal de todos os 22 condados e cidades, extraídos do mesmo repo de origem.',

    'taiwanShape.codes.heading':
      '🧭 Tabela de códigos das divisões administrativas',
    'taiwanShape.codes.intro':
      'As divisões administrativas de Taiwan são codificadas com códigos numéricos. Veja abaixo a tabela das 22 divisões administrativas em nível de condado e cidade (padrão dos nomes de arquivo: `towns-{code}.json`).',
    'taiwanShape.codes.codeCol': 'Código',
    'taiwanShape.codes.nameCol': 'Divisão administrativa',
    'taiwanShape.codes.typeCol': 'Tipo',

    'taiwanShape.examples.heading': '💻 Exemplos de uso',
    'taiwanShape.examples.htmlTitle': 'HTML — incorporação estática',
    'taiwanShape.examples.cssTitle': 'CSS — imagem de fundo',
    'taiwanShape.examples.d3Title': 'D3.js — choropleth interativo',
    'taiwanShape.examples.pythonTitle': 'Python — geopandas',
    'taiwanShape.examples.leafletTitle':
      'Leaflet — sobreposição em mapa de mosaicos',
    'taiwanShape.examples.vueTitle': 'Vue — taiwan-vue-components',

    'taiwanShape.others.heading': '📚 Outras fontes de dados abertos',
    'taiwanShape.others.intro':
      'Se você precisa de mais do que está incluído aqui — maior resolução, projeções diferentes ou limites administrativos históricos — estas são as fontes que recomendamos:',

    'taiwanShape.license.heading': '⚖️ Licenças e fontes',
    'taiwanShape.license.intro':
      'Todos os arquivos desta página são de código aberto. Confira abaixo as informações completas sobre fontes e licenças:',

    // Taiwan-shape ternary-fallback fix (2026-08-17)
    'taiwanShape.geo.townsSourceNote':
      'Todos os 22 condados e cidades estão incluídos acima. Dados de limites de distritos extraídos de ',
    'taiwanShape.source.dataGovTw.desc':
      'Plataforma oficial de dados abertos do governo, incluindo shapefiles de limites administrativos publicados pelo Ministério do Interior.',
    'taiwanShape.source.naturalEarth.desc':
      'Dados globais de mapas em domínio público, nas escalas 1:10m / 1:50m / 1:110m. Ideal para mapas-múndi que incluem Taiwan.',
    'taiwanShape.source.osm.desc':
      'Mapa de Taiwan editado pela comunidade do OSM, disponível para download em OSM XML ou PBF via Overpass API e Geofabrik.',
    'taiwanShape.source.g0v.desc':
      'Comunidade de tecnologia cívica de Taiwan. Muitos projetos g0v publicam dados de mapas tratados e visualizações em código aberto.',
    'taiwanShape.source.gadm.desc':
      'Banco de dados global de áreas administrativas, com limites administrativos de Taiwan nos níveis 0-3, disponível nos formatos Shapefile / GeoPackage / KMZ / R.',
    'taiwanShape.license.wikimedia.desc':
      'Wikimedia Commons, licença Creative Commons.',
    'taiwanShape.license.simplemaps.desc':
      'SimpleMaps, uso comercial gratuito com atribuição.',
    'taiwanShape.license.extractedFromPrefix': 'Extraído de ',
    'taiwanShape.download.svg': 'Baixar SVG',
    'taiwanShape.download.topo': 'Baixar TopoJSON',
    'taiwanShape.download.all': 'Baixar tudo (ZIP)',
    'taiwanShape.copy.button': 'Copiar SVG',
    'taiwanShape.copy.copied': '✓ Copiado',
  },
  hi: {
    'taiwanShape.svg.icon.desc':
      'सरल भरा हुआ आउटलाइन — आइकन, फ़ेविकॉन और बटन के लिए उपयुक्त।',
    'taiwanShape.svg.simplemaps.desc':
      'स्वच्छ वेक्टर — वेब में एम्बेड करने के लिए उपयुक्त।',
    'taiwanShape.svg.locationMap.desc':
      'स्थान मानचित्र — अक्षांश/देशांतर ग्रिड और शहर चिह्नों सहित।',
    'taiwanShape.svg.politicalDivision.desc':
      'काउंटी सीमाएँ — रंगीन प्रशासनिक विभाजन।',
    // Meta
    'taiwanShape.meta.title':
      'ताइवान का आकार — ओपन-सोर्स मानचित्र डेटासेट: SVG, GeoJSON, TopoJSON',
    'taiwanShape.meta.description':
      'ताइवान का संपूर्ण ओपन-सोर्स मानचित्र डेटा: SVG रूपरेखा, काउंटी-शहर और टाउनशिप स्तर के TopoJSON, तथा D3.js / Leaflet / Python / Vue के उपयोग के उदाहरण।AI से बनाया गया ताइवान हमेशा ग़लत होता है, यहाँ वाला सही है।',

    'taiwanShape.hero.kicker': '🗺️ ओपन-सोर्स मानचित्र डेटासेट',
    'taiwanShape.hero.title': 'ताइवान का आकार',
    'taiwanShape.hero.subtitle':
      'SVG, GeoJSON, TopoJSON — डेवलपरों, डिज़ाइनरों और शोधकर्ताओं के लिए संपूर्ण ओपन-सोर्स मानचित्र डेटा।',

    'taiwanShape.story.heading': 'ताइवान का आकार क्यों महत्वपूर्ण है',
    'taiwanShape.story.p1':
      'किसी भी AI चित्रण टूल से ताइवान बनवाएँ, तो लगभग हर बार एक गोल-मटोल चीज़ निकलती है, जो जैतून और आलू के बीच की लगती है।ताइवान जैतून नहीं है।यह 394 किलोमीटर लंबा शकरकंद जैसा द्वीप है, जिसके बीच उत्तर से दक्षिण तक केंद्रीय पर्वतमाला और सौ से अधिक अपतटीय द्वीप हैं।',
    'taiwanShape.story.p2':
      'आकार को सही बनाना केवल डिज़ाइन का विवरण नहीं, पहचान का प्रश्न है।इस पृष्ठ पर taiwan.md में उपयोग की गई सभी ओपन-सोर्स मानचित्र सामग्रियाँ संकलित हैं, ताकि कोई भी अपने प्रोजेक्ट में ताइवान को सटीक रूप से प्रस्तुत कर सके।',

    'taiwanShape.comparison.title':
      '🤖 vs. 🇹🇼 — AI हर बार ग़लत बनाता है, सचमुच',
    'taiwanShape.comparison.aiLabel': 'AI-जनित (ग़लत)',
    'taiwanShape.comparison.correctLabel': 'सही संस्करण (विकिपीडिया)',

    'taiwanShape.svg.heading': '📐 SVG रूपरेखा — सीधे एम्बेड करें',
    'taiwanShape.svg.description':
      'चार चुनिंदा SVG फ़ाइल समूह, सभी CC लाइसेंस या सार्वजनिक डोमेन के अंतर्गत।इन्हें सीधे किसी भी वेबपेज, App या डिज़ाइन ड्राफ़्ट में डाला जा सकता है।',
    'taiwanShape.svg.usageHeading': 'उपयोग का तरीका',
    'taiwanShape.svg.licenseNote':
      'सभी SVG Creative Commons लाइसेंस या सार्वजनिक डोमेन के अंतर्गत हैं।स्रोत का उल्लेख करना बेहतर है, लेकिन आवश्यक नहीं।',

    'taiwanShape.geo.heading':
      '🌐 TopoJSON — काउंटी और शहर स्तर का इंटरैक्टिव मानचित्र',
    'taiwanShape.geo.intro1':
      'यदि आप इंटरैक्टिव मानचित्र बनाना चाहते हैं—ज़ूम, माउस होवर और डेटा मान के अनुसार रंग भरना—तो आपको SVG पाथ नहीं, बल्कि वास्तविक भौगोलिक निर्देशांक डेटा चाहिए।हमने Waiting के taiwan-vue-components (MIT लाइसेंस, 2018) से निकाली गई TopoJSON फ़ाइलें पैकेज की हैं।',
    'taiwanShape.geo.intro2':
      'TopoJSON, GeoJSON का संपीड़ित संस्करण है: पड़ोसी काउंटियों और शहरों की साझा सीमाएँ केवल एक बार संग्रहीत होती हैं, जिससे फ़ाइल 80% छोटी होती है।topojson-client से इसे तुरंत वापस GeoJSON में बदला जा सकता है।',
    'taiwanShape.geo.formatHeading': 'TopoJSON vs GeoJSON — किसे चुनें',
    'taiwanShape.geo.formatTopo':
      'TopoJSON: छोटी फ़ाइल, पड़ोसी क्षेत्रों की साझा सीमाएँ और वेब के इंटरैक्टिव मानचित्रों के लिए उपयुक्त।',
    'taiwanShape.geo.formatGeo':
      'GeoJSON: सरल प्रारूप, Python geopandas, QGIS और अधिकांश GIS टूल के साथ सीधे संगत।',
    'taiwanShape.geo.countryHeading': 'पूरे देश की रूपरेखा (22 काउंटी और शहर)',
    'taiwanShape.geo.countryDesc':
      'लगभग 21 KB की TopoJSON फ़ाइल, जिसमें 22 काउंटी, शहर और विशेष नगरपालिकाएँ शामिल हैं और प्रत्येक एक स्वतंत्र फ़ीचर है।कोरोप्लेथ मानचित्र बनाने का शुरुआती बिंदु।',
    'taiwanShape.geo.townsHeading':
      'सभी 22 काउंटियों और शहरों का टाउनशिप स्तर का डेटा',
    'taiwanShape.geo.townsDesc':
      'हमने सभी 22 काउंटियों और शहरों की टाउनशिप स्तर की TopoJSON फ़ाइलें पैकेज की हैं, जो एक ही स्रोत repo से निकाली गई हैं।',

    'taiwanShape.codes.heading': '🧭 प्रशासनिक क्षेत्र कोड संदर्भ तालिका',
    'taiwanShape.codes.intro':
      'ताइवान के प्रशासनिक क्षेत्रों को संख्यात्मक कोड दिए गए हैं।नीचे 22 काउंटी और शहर स्तर के प्रशासनिक क्षेत्रों की संदर्भ तालिका है (फ़ाइल नाम नियम: `towns-{code}.json`)।',
    'taiwanShape.codes.codeCol': 'कोड',
    'taiwanShape.codes.nameCol': 'प्रशासनिक क्षेत्र',
    'taiwanShape.codes.typeCol': 'प्रकार',

    'taiwanShape.examples.heading': '💻 उपयोग के उदाहरण',
    'taiwanShape.examples.htmlTitle': 'HTML — स्थिर एम्बेड',
    'taiwanShape.examples.cssTitle': 'CSS — पृष्ठभूमि चित्र',
    'taiwanShape.examples.d3Title': 'D3.js — इंटरैक्टिव कोरोप्लेथ',
    'taiwanShape.examples.pythonTitle': 'Python — geopandas',
    'taiwanShape.examples.leafletTitle': 'Leaflet — टाइल मानचित्र ओवरले',
    'taiwanShape.examples.vueTitle': 'Vue — taiwan-vue-components',

    'taiwanShape.others.heading': '📚 अन्य ओपन-सोर्स डेटा स्रोत',
    'taiwanShape.others.intro':
      'यदि आपको यहाँ पैकेज किए गए डेटा से अधिक चाहिए—उच्च रिज़ॉल्यूशन, अलग प्रोजेक्शन या ऐतिहासिक प्रशासनिक सीमाएँ—तो ये हमारे सुझाए स्रोत हैं:',

    'taiwanShape.license.heading': '⚖️ लाइसेंस और स्रोत',
    'taiwanShape.license.intro':
      'इस पृष्ठ की प्रत्येक फ़ाइल ओपन-सोर्स है।स्रोत और लाइसेंस की पूरी जानकारी नीचे दी गई है:',

    // Taiwan-shape ternary-fallback fix (2026-08-17)
    'taiwanShape.geo.townsSourceNote':
      'उपरोक्त में सभी 22 जिलों और शहरों को शामिल किया गया है। तहसील सीमा डेटा स्रोत ',
    'taiwanShape.source.dataGovTw.desc':
      'तैवान सरकार का आधिकारिक ओपन डेटा, जिसमें गृह मंत्रालय द्वारा जारी प्रशासनिक सीमा shapefiles शामिल हैं।',
    'taiwanShape.source.naturalEarth.desc':
      'पब्लिक डोमेन वैश्विक मानचित्र डेटा, 1:10m / 1:50m / 1:110m — तीन स्केल उपलब्ध। ताइवान सहित विश्व मानचित्र बनाने के लिए उपयुक्त।',
    'taiwanShape.source.osm.desc':
      'OSM समुदाय द्वारा संपादित ताइवान का नक्शा, Overpass API और Geofabrik के ज़रिये OSM XML या PBF में डाउनलोड किया जा सकता है।',
    'taiwanShape.source.g0v.desc':
      'ताइवान का सिविक टेक समुदाय। कई g0v परियोजनाएँ साफ़-सुथरे नक्शा डेटा और विज़ुअलाइज़ेशन को ओपन सोर्स के रूप में प्रकाशित करती हैं।',
    'taiwanShape.source.gadm.desc':
      'वैश्विक प्रशासनिक क्षेत्र डेटाबेस, ताइवान की प्रशासनिक सीमाएँ 0-3 स्तर पर, Shapefile / GeoPackage / KMZ / R फ़ॉर्मेट में उपलब्ध।',
    'taiwanShape.license.wikimedia.desc':
      'Wikimedia Commons, Creative Commons लाइसेंस।',
    'taiwanShape.license.simplemaps.desc':
      'SimpleMaps, स्रोत का उल्लेख करने पर निःशुल्क व्यावसायिक उपयोग के लिए उपलब्ध।',
    'taiwanShape.license.extractedFromPrefix': 'स्रोत: ',
    'taiwanShape.download.svg': 'SVG डाउनलोड करें',
    'taiwanShape.download.topo': 'TopoJSON डाउनलोड करें',
    'taiwanShape.download.all': 'सभी डाउनलोड करें (ZIP)',
    'taiwanShape.copy.button': 'SVG कॉपी करें',
    'taiwanShape.copy.copied': '✓ कॉपी किया गया',
  },
  ar: {
    'taiwanShape.svg.icon.desc':
      'مخطط مصمت بسيط — مناسب للأيقونات وأيقونات المفضلة والأزرار.',
    'taiwanShape.svg.simplemaps.desc': 'متجه نظيف — مناسب للتضمين في الويب.',
    'taiwanShape.svg.locationMap.desc':
      'خريطة موقع مع شبكة خطوط الطول والعرض وعلامات المدن.',
    'taiwanShape.svg.politicalDivision.desc':
      'حدود المقاطعات — تقسيمات إدارية ملوّنة.',
    // Meta
    'taiwanShape.meta.title':
      'شكل تايوان — مجموعة بيانات خرائط مفتوحة المصدر: SVG، GeoJSON، TopoJSON',
    'taiwanShape.meta.description':
      'بيانات خرائط تايوان مفتوحة المصدر كاملة: حدود SVG، TopoJSON على مستوى المقاطعات والبلدات، أمثلة استخدام لـ D3.js / Leaflet / Python / Vue. الذكاء الاصطناعي يرسم تايوان بشكل خاطئ دائمًا، وهنا الرسم الصحيح.',

    'taiwanShape.hero.kicker': '🗺️ مجموعة بيانات خرائط مفتوحة المصدر',
    'taiwanShape.hero.title': 'شكل تايوان',
    'taiwanShape.hero.subtitle':
      'SVG، GeoJSON، TopoJSON — مجموعة بيانات خرائط مفتوحة المصدر كاملة للمطورين والمصممين والباحثين.',

    'taiwanShape.story.heading': 'لماذا يهم شكل تايوان',
    'taiwanShape.story.p1':
      'اطلب من أي أداة ذكاء اصطناعي لرسم تايوان، وستحصل تقريبًا على شيء دائري وممتلئ، يشبه بين الزيتون والبطاطس. تايوان ليست زيتونًا. إنها حبة بطاطس طويلة تمتد على 394 كيلومترًا، مع سلسلة جبال مركزية تمتد من الشمال إلى الجنوب، وأكثر من مئة جزيرة نائية.',
    'taiwanShape.story.p2':
      'رسم الشكل بشكل صحيح ليس مجرد تفصيل تصميمي، بل هو قضية هوية. تجمع هذه الصفحة جميع مواد الخرائط مفتوحة المصدر التي نستخدمها في taiwan.md، لتمكين أي شخص من عرض تايوان بدقة في مشاريعه الخاصة.',

    'taiwanShape.comparison.title':
      '🤖 vs. 🇹🇼 — الذكاء الاصطناعي يخطئ دائمًا، حقًا',
    'taiwanShape.comparison.aiLabel': 'توليد الذكاء الاصطناعي (خاطئ)',
    'taiwanShape.comparison.correctLabel': 'النسخة الصحيحة (ويكيبيديا)',

    'taiwanShape.svg.heading': '📐 حدود SVG — تضمين مباشر',
    'taiwanShape.svg.description':
      'أربع مجموعات مختارة من ملفات SVG، جميعها مرخصة بموجب CC أو في الملك العام. يمكن إسقاطها مباشرة في أي صفحة ويب أو تطبيق أو تصميم.',
    'taiwanShape.svg.usageHeading': 'طريقة الاستخدام',
    'taiwanShape.svg.licenseNote':
      'جميع ملفات SVG مرخصة بموجب Creative Commons أو في الملك العام. يُفضل ذكر المصدر لكنه ليس إلزاميًا.',

    'taiwanShape.geo.heading':
      '🌐 TopoJSON — خرائط تفاعلية على مستوى المقاطعات',
    'taiwanShape.geo.intro1':
      'إذا كان هدفك هو خرائط تفاعلية — تكبير/تصغير، تمرير الماوس، ملء الألوان بناءً على القيم — فأنت لا تحتاج إلى مسارات SVG، بل تحتاج إلى بيانات إحداثيات جغرافية حقيقية. قمنا بتجميع ملفات TopoJSON المستخرجة من taiwan-vue-components الخاصة بـ Waiting (ترخيص MIT، 2018).',
    'taiwanShape.geo.intro2':
      'TopoJSON هو نسخة مضغوطة من GeoJSON: يتم تخزين الحدود المشتركة بين المقاطعات المتجاورة مرة واحدة فقط، مما يصغر حجم الملف بنسبة 80%. يمكن استخدام topojson-client لتحويله فورًا إلى GeoJSON.',
    'taiwanShape.geo.formatHeading': 'TopoJSON مقابل GeoJSON — أيهما تختار',
    'taiwanShape.geo.formatTopo':
      'TopoJSON: حجم ملف صغير، حدود مشتركة للمناطق المتجاورة، مناسب لخرائط الويب التفاعلية.',
    'taiwanShape.geo.formatGeo':
      'GeoJSON: تنسيق بسيط، متوافق مباشرة مع Python geopandas وQGIS وأدوات GIS الأخرى.',
    'taiwanShape.geo.countryHeading': 'حدود البلاد (22 مقاطعة ومدينة)',
    'taiwanShape.geo.countryDesc':
      'ملف TopoJSON بحجم حوالي 21 كيلوبايت، يحتوي على 22 مقاطعة ومدينة، كل منها كعنصر (feature) مستقل. نقطة البداية لخرائط choropleth.',
    'taiwanShape.geo.townsHeading':
      'بيانات على مستوى البلدات لجميع المقاطعات الـ 22',
    'taiwanShape.geo.townsDesc':
      'قمنا بتجميع ملفات TopoJSON على مستوى البلدات لجميع المقاطعات الـ 22، جميعها مستخرجة من مستودع المصدر نفسه.',

    'taiwanShape.codes.heading': '🧭 جدول مطابقة رموز المناطق الإدارية',
    'taiwanShape.codes.intro':
      'تستخدم تايوان رموزًا رقمية لتشفير المناطق الإدارية. فيما يلي جدول مطابقة للمناطق الإدارية على مستوى المقاطعات الـ 22 (قاعدة تسمية الملفات: `towns-{code}.json`).',
    'taiwanShape.codes.codeCol': 'الرمز',
    'taiwanShape.codes.nameCol': 'المنطقة الإدارية',
    'taiwanShape.codes.typeCol': 'النوع',

    'taiwanShape.examples.heading': '💻 أمثلة الاستخدام',
    'taiwanShape.examples.htmlTitle': 'HTML — تضمين ثابت',
    'taiwanShape.examples.cssTitle': 'CSS — صورة خلفية',
    'taiwanShape.examples.d3Title': 'D3.js — choropleth تفاعلي',
    'taiwanShape.examples.pythonTitle': 'Python — geopandas',
    'taiwanShape.examples.leafletTitle': 'Leaflet — طبقات خرائط البلاط',
    'taiwanShape.examples.vueTitle': 'Vue — taiwan-vue-components',

    'taiwanShape.others.heading': '📚 مصادر بيانات مفتوحة المصدر أخرى',
    'taiwanShape.others.intro':
      'إذا كنت تحتاج إلى أكثر مما تم تجميعه هنا — دقة أعلى، إسقاطات مختلفة، حدود إدارية تاريخية — إليك المصادر التي نوصي بها:',

    'taiwanShape.license.heading': '⚖️ الترخيص والمصادر',
    'taiwanShape.license.intro':
      'كل ملف على هذه الصفحة مفتوح المصدر. فيما يلي معلومات المصدر والترخيص الكاملة:',

    // Taiwan-shape ternary-fallback fix (2026-08-17)
    'taiwanShape.geo.townsSourceNote':
      'تم تضمين جميع المقاطعات والمدن الـ22 أعلاه. بيانات حدود البلدات والقرى من ',
    'taiwanShape.source.dataGovTw.desc':
      'منصة البيانات المفتوحة الرسمية للحكومة، تتضمن ملفات shapefile للحدود الإدارية الصادرة عن وزارة الداخلية.',
    'taiwanShape.source.naturalEarth.desc':
      'بيانات خرائط عالمية في الملك العام بثلاثة مقاييس: 1:10m / 1:50m / 1:110m. مناسبة لإعداد خرائط عالمية تشمل تايوان.',
    'taiwanShape.source.osm.desc':
      'خريطة تايوان التي يحرّرها مجتمع OSM، ويمكن تنزيلها بصيغة OSM XML أو PBF عبر Overpass API وGeofabrik.',
    'taiwanShape.source.g0v.desc':
      'مجتمع التكنولوجيا المدنية في تايوان. تنشر مشاريع g0v كثيرة بيانات خرائط منظّمة وتصورات بصرية كمصادر مفتوحة.',
    'taiwanShape.source.gadm.desc':
      'قاعدة بيانات المناطق الإدارية العالمية، حدود تايوان الإدارية للمستويات 0-3، متوفرة بصيغ Shapefile / GeoPackage / KMZ / R.',
    'taiwanShape.license.wikimedia.desc':
      'Wikimedia Commons، ترخيص Creative Commons.',
    'taiwanShape.license.simplemaps.desc':
      'SimpleMaps، مجاني للاستخدام التجاري مع ذكر المصدر.',
    'taiwanShape.license.extractedFromPrefix': 'مأخوذ من ',
    'taiwanShape.download.svg': 'تنزيل SVG',
    'taiwanShape.download.topo': 'تنزيل TopoJSON',
    'taiwanShape.download.all': 'تنزيل الكل (ZIP)',
    'taiwanShape.copy.button': 'نسخ SVG',
    'taiwanShape.copy.copied': '✓ تم النسخ',
  },
  ru: {
    'taiwanShape.svg.icon.desc':
      'Простой залитый контур — подходит для иконок, фавиконов и кнопок.',
    'taiwanShape.svg.simplemaps.desc':
      'Чистый вектор — подходит для встраивания в веб.',
    'taiwanShape.svg.locationMap.desc':
      'Карта расположения с сеткой широты/долготы и метками городов.',
    'taiwanShape.svg.politicalDivision.desc':
      'Границы уездов — административное деление в цвете.',
    // Meta
    'taiwanShape.meta.title':
      'Форма Тайваня — открытый набор картографических данных: SVG, GeoJSON, TopoJSON',
    'taiwanShape.meta.description':
      'Полный открытый набор картографических данных Тайваня: контуры SVG, TopoJSON для уровней уездов и волостей, примеры использования в D3.js / Leaflet / Python / Vue. То, что рисует ИИ, всегда неверно. Здесь — верно.',

    'taiwanShape.hero.kicker': '🗺️ Открытый набор картографических данных',
    'taiwanShape.hero.title': 'Форма Тайваня',
    'taiwanShape.hero.subtitle':
      'SVG, GeoJSON, TopoJSON — полный открытый набор картографических данных для разработчиков, дизайнеров и исследователей.',

    'taiwanShape.story.heading': 'Почему форма Тайваня важна',
    'taiwanShape.story.p1':
      'Попробуйте заставить любой инструмент для генерации изображений нарисовать Тайвань, и почти всегда получится круглый, толстый объект, похожий на оливообразный картофель. Тайвань — не оливка. Это сладкий картофель длиной 394 км с Центральным хребтом, протянувшимся с севера на юг, и более чем сотней отдалённых островов.',
    'taiwanShape.story.p2':
      'Правильное изображение формы — это не просто дизайнерская деталь, это вопрос идентичности. На этой странице собраны все открытые картографические материалы, которые мы используем на taiwan.md, чтобы любой мог точно отобразить Тайвань в своём проекте.',

    'taiwanShape.comparison.title':
      '🤖 vs. 🇹🇼 — ИИ ошибается снова и снова, и это правда',
    'taiwanShape.comparison.aiLabel': 'Сгенерировано ИИ (неверно)',
    'taiwanShape.comparison.correctLabel': 'Правильная версия (Википедия)',

    'taiwanShape.svg.heading': '📐 Контур SVG — прямое встраивание',
    'taiwanShape.svg.description':
      'Четыре отобранных SVG-файла, все под лицензией CC или в общественном достоянии. Можно напрямую вставлять в любой веб-сайт, приложение или дизайн-макет.',
    'taiwanShape.svg.usageHeading': 'Способ использования',
    'taiwanShape.svg.licenseNote':
      'Все SVG-файлы распространяются под лицензией Creative Commons или находятся в общественном достоянии. Указание источника желательно, но не обязательно.',

    'taiwanShape.geo.heading':
      '🌐 TopoJSON — интерактивная карта на уровне уездов',
    'taiwanShape.geo.intro1':
      "Если вы создаёте интерактивную карту с масштабированием, всплывающими подсказками при наведении курсора и заливкой по значениям данных — вам нужны не SVG-пути, а настоящие географические координаты. Мы упаковали файлы TopoJSON, извлечённые из проекта Waiting's taiwan-vue-components (лицензия MIT, 2018).",
    'taiwanShape.geo.intro2':
      'TopoJSON — это сжатая версия GeoJSON: общие границы соседних уездов сохраняются только один раз, что уменьшает размер файла на 80%. С помощью topojson-client можно мгновенно преобразовать обратно в GeoJSON.',
    'taiwanShape.geo.formatHeading': 'TopoJSON против GeoJSON — что выбрать',
    'taiwanShape.geo.formatTopo':
      'TopoJSON: меньший размер файла, общие границы для соседних регионов, подходит для интерактивных веб-карт.',
    'taiwanShape.geo.formatGeo':
      'GeoJSON: простой формат, прямая совместимость с Python geopandas, QGIS и большинством инструментов ГИС.',
    'taiwanShape.geo.countryHeading': 'Контур страны (22 уезда)',
    'taiwanShape.geo.countryDesc':
      'Файл TopoJSON объёмом около 21 КБ, содержащий 22 уезда и города прямого подчинения, каждый из которых является отдельным объектом (feature). Точка отсчёта для создания хлороплетных карт.',
    'taiwanShape.geo.townsHeading':
      'Данные по всем 22 уездам на уровне волостей',
    'taiwanShape.geo.townsDesc':
      'Мы упаковали файлы TopoJSON на уровне волостей для всех 22 уездов, извлечённые из одного и того же репозитория.',

    'taiwanShape.codes.heading':
      '🧭 Таблица соответствия кодов административных районов',
    'taiwanShape.codes.intro':
      'Административные районы Тайваня кодируются цифровыми кодами. Ниже приведена таблица соответствия для 22 уездов (правило именования файлов: `towns-{code}.json`).',
    'taiwanShape.codes.codeCol': 'Код',
    'taiwanShape.codes.nameCol': 'Административный район',
    'taiwanShape.codes.typeCol': 'Тип',

    'taiwanShape.examples.heading': '💻 Примеры использования',
    'taiwanShape.examples.htmlTitle': 'HTML — статическое встраивание',
    'taiwanShape.examples.cssTitle': 'CSS — фоновое изображение',
    'taiwanShape.examples.d3Title': 'D3.js — интерактивная хлороплетная карта',
    'taiwanShape.examples.pythonTitle': 'Python — geopandas',
    'taiwanShape.examples.leafletTitle':
      'Leaflet — наложение на тайловую карту',
    'taiwanShape.examples.vueTitle': 'Vue — taiwan-vue-components',

    'taiwanShape.others.heading': '📚 Другие источники открытых данных',
    'taiwanShape.others.intro':
      'Если вам нужно больше, чем упаковано здесь — более высокое разрешение, другие проекции, исторические границы административных районов — вот рекомендуемые нами источники:',

    'taiwanShape.license.heading': '⚖️ Лицензия и источники',
    'taiwanShape.license.intro':
      'Каждый файл на этой странице является открытым. Ниже приведена полная информация об источниках и лицензиях:',

    // Taiwan-shape ternary-fallback fix (2026-08-17)
    'taiwanShape.geo.townsSourceNote':
      'Выше приведены все 22 уезда и города. Границы посёлков получены из ',
    'taiwanShape.source.dataGovTw.desc':
      'Официальная платформа открытых данных правительства Тайваня, включающая Shapefile административных границ, опубликованные Министерством внутренних дел.',
    'taiwanShape.source.naturalEarth.desc':
      'Глобальные картографические данные в общественном достоянии, три масштаба: 1:10m / 1:50m / 1:110m. Подходят для создания мировых карт, включающих Тайвань.',
    'taiwanShape.source.osm.desc':
      'Карта Тайваня, редактируемая сообществом OSM; доступна для загрузки в формате OSM XML или PBF через Overpass API и Geofabrik.',
    'taiwanShape.source.g0v.desc':
      'Тайваньское сообщество гражданских технологий. Многие проекты g0v публикуют вычищенные картографические данные и визуализации с открытым исходным кодом.',
    'taiwanShape.source.gadm.desc':
      'Глобальная база данных административных территорий. Границы административных единиц Тайваня уровней 0-3, форматы: Shapefile / GeoPackage / KMZ / R.',
    'taiwanShape.license.wikimedia.desc':
      'Wikimedia Commons, лицензия Creative Commons.',
    'taiwanShape.license.simplemaps.desc':
      'SimpleMaps, бесплатное использование в коммерческих целях при указании источника.',
    'taiwanShape.license.extractedFromPrefix': 'Источник: ',
    'taiwanShape.download.svg': 'Скачать SVG',
    'taiwanShape.download.topo': 'Скачать TopoJSON',
    'taiwanShape.download.all': 'Скачать всё (ZIP)',
    'taiwanShape.copy.button': 'Копировать SVG',
    'taiwanShape.copy.copied': '✓ Скопировано',
  },
  de: {
    'taiwanShape.svg.icon.desc':
      'Schlichte, ausgefüllte Kontur — ideal für Icons, Favicons und Schaltflächen.',
    'taiwanShape.svg.simplemaps.desc':
      'Saubere Vektordatei — ideal zum Einbetten in Webseiten.',
    'taiwanShape.svg.locationMap.desc':
      'Lagekarte — mit Breiten- und Längengradraster sowie Stadtmarkierungen.',
    'taiwanShape.svg.politicalDivision.desc':
      'Landkreis- und Stadtgrenzen — farbige Verwaltungsgliederung.',
    // Meta
    'taiwanShape.meta.title':
      'Die Form Taiwans — quelloffener Kartendatensatz: SVG, GeoJSON, TopoJSON',
    'taiwanShape.meta.description':
      'Vollständige quelloffene Kartendaten für Taiwan: SVG-Konturen, TopoJSON auf Landkreis-, Stadt- und Gemeindeebene sowie Anwendungsbeispiele für D3.js / Leaflet / Python / Vue. Von AI gezeichnete Taiwan-Karten sind immer falsch — diese hier stimmt.',

    'taiwanShape.hero.kicker': '🗺️ Quelloffener Kartendatensatz',
    'taiwanShape.hero.title': 'Die Form Taiwans',
    'taiwanShape.hero.subtitle':
      'SVG, GeoJSON, TopoJSON — vollständige quelloffene Kartendaten für Entwickler, Designer und Forschende.',

    'taiwanShape.story.heading': 'Warum die Form Taiwans wichtig ist',
    'taiwanShape.story.p1':
      'Lässt man Taiwan von einem beliebigen AI-Bildgenerator zeichnen, entsteht fast immer etwas Rundliches und Dickliches zwischen Olive und Kartoffel. Taiwan ist keine Olive. Es ist eine 394 Kilometer lange Süßkartoffel mit einem von Norden nach Süden verlaufenden Zentralgebirge und mehr als hundert vorgelagerten Inseln.',
    'taiwanShape.story.p2':
      'Die Form richtig darzustellen ist nicht nur ein Detail des Designs, sondern eine Frage der Identität. Diese Seite versammelt alle quelloffenen Kartenmaterialien, die wir auf taiwan.md verwenden, damit alle Taiwan in ihren eigenen Projekten präzise darstellen können.',

    'taiwanShape.comparison.title':
      '🤖 vs. 🇹🇼 — AI zeichnet es wirklich jedes Mal falsch',
    'taiwanShape.comparison.aiLabel': 'Von AI erzeugt (falsch)',
    'taiwanShape.comparison.correctLabel': 'Korrekte Version (Wikipedia)',

    'taiwanShape.svg.heading': '📐 SVG-Konturen — direkt einbetten',
    'taiwanShape.svg.description':
      'Vier ausgewählte SVG-Dateien, alle unter CC-Lizenz oder gemeinfrei. Sie lassen sich direkt in jede Webseite, App oder Designvorlage einfügen.',
    'taiwanShape.svg.usageHeading': 'Verwendung',
    'taiwanShape.svg.licenseNote':
      'Alle SVG-Dateien stehen unter einer Creative-Commons-Lizenz oder sind gemeinfrei. Eine Quellenangabe ist wünschenswert, aber nicht erforderlich.',

    'taiwanShape.geo.heading':
      '🌐 TopoJSON — interaktive Karte der Landkreise und Städte',
    'taiwanShape.geo.intro1':
      'Für eine interaktive Karte — mit Zoom, Mouseover und datenabhängiger Einfärbung — brauchen Sie keine SVG-Pfade, sondern echte Geokoordinaten. Wir haben TopoJSON-Dateien zusammengestellt, die aus Waiting’s taiwan-vue-components (MIT-Lizenz, 2018) extrahiert wurden.',
    'taiwanShape.geo.intro2':
      'TopoJSON ist eine komprimierte Variante von GeoJSON: Gemeinsame Grenzen benachbarter Landkreise und Städte werden nur einmal gespeichert, wodurch die Datei 80% kleiner ist. Mit topojson-client lässt sie sich in Echtzeit zurück in GeoJSON umwandeln.',
    'taiwanShape.geo.formatHeading':
      'TopoJSON vs GeoJSON — welches Format wählen?',
    'taiwanShape.geo.formatTopo':
      'TopoJSON: kleine Dateien, gemeinsame Grenzen benachbarter Gebiete, ideal für interaktive Webkarten.',
    'taiwanShape.geo.formatGeo':
      'GeoJSON: einfaches Format, direkt kompatibel mit Python geopandas, QGIS und den meisten GIS-Werkzeugen.',
    'taiwanShape.geo.countryHeading':
      'Landesweiter Umriss (22 Landkreise und Städte)',
    'taiwanShape.geo.countryDesc':
      'Eine etwa 21 KB große TopoJSON-Datei mit 22 Landkreisen und Städten einschließlich der regierungsunmittelbaren Städte, jeweils als eigenständiges Feature. Der Ausgangspunkt für Choroplethenkarten.',
    'taiwanShape.geo.townsHeading':
      'Gemeindedaten für alle 22 Landkreise und Städte',
    'taiwanShape.geo.townsDesc':
      'Wir haben TopoJSON-Dateien auf Gemeindeebene für alle 22 Landkreise und Städte zusammengestellt, die aus demselben Quell-Repo extrahiert wurden.',

    'taiwanShape.codes.heading': '🧭 Referenztabelle der Verwaltungscodes',
    'taiwanShape.codes.intro':
      'Taiwans Verwaltungseinheiten sind numerisch codiert. Nachfolgend finden Sie die Referenztabelle der 22 Verwaltungseinheiten auf Landkreis- und Stadtebene (Namensschema der Dateien: `towns-{code}.json`).',
    'taiwanShape.codes.codeCol': 'Code',
    'taiwanShape.codes.nameCol': 'Verwaltungseinheit',
    'taiwanShape.codes.typeCol': 'Typ',

    'taiwanShape.examples.heading': '💻 Anwendungsbeispiele',
    'taiwanShape.examples.htmlTitle': 'HTML — statische Einbettung',
    'taiwanShape.examples.cssTitle': 'CSS — Hintergrundbild',
    'taiwanShape.examples.d3Title': 'D3.js — interaktive Choroplethenkarte',
    'taiwanShape.examples.pythonTitle': 'Python — geopandas',
    'taiwanShape.examples.leafletTitle':
      'Leaflet — Overlay auf einer Kachelkarte',
    'taiwanShape.examples.vueTitle': 'Vue — taiwan-vue-components',

    'taiwanShape.others.heading': '📚 Weitere quelloffene Datenquellen',
    'taiwanShape.others.intro':
      'Falls Sie mehr benötigen als die hier zusammengestellten Daten — höhere Auflösung, andere Projektionen oder historische Verwaltungsgrenzen — empfehlen wir folgende Quellen:',

    'taiwanShape.license.heading': '⚖️ Lizenzen und Quellen',
    'taiwanShape.license.intro':
      'Alle Dateien auf dieser Seite sind quelloffen. Nachfolgend finden Sie die vollständigen Angaben zu Quellen und Lizenzen:',

    // Taiwan-shape ternary-fallback fix (2026-08-17)
    'taiwanShape.geo.townsSourceNote':
      'Alle 22 Landkreise und Städte sind oben enthalten. Die Daten der Gemeindegrenzen stammen aus ',
    'taiwanShape.source.dataGovTw.desc':
      'Offizielles staatliches Open-Data-Portal mit vom Innenministerium veröffentlichten Shapefiles der Verwaltungsgrenzen.',
    'taiwanShape.source.naturalEarth.desc':
      'Gemeinfreie globale Kartendaten in drei Maßstäben: 1:10m / 1:50m / 1:110m. Ideal für Weltkarten, die Taiwan zeigen.',
    'taiwanShape.source.osm.desc':
      'Von der OSM-Community bearbeitete Taiwan-Karte; OSM XML oder PBF können über die Overpass API und Geofabrik heruntergeladen werden.',
    'taiwanShape.source.g0v.desc':
      'Taiwans Civic-Tech-Community. Viele g0v-Projekte veröffentlichen aufbereitete Kartendaten und Visualisierungen als Open Source.',
    'taiwanShape.source.gadm.desc':
      'Globale Datenbank für Verwaltungsgebiete mit Taiwans Verwaltungsgrenzen der Ebenen 0-3 in den Formaten Shapefile / GeoPackage / KMZ / R.',
    'taiwanShape.license.wikimedia.desc':
      'Wikimedia Commons, Creative-Commons-Lizenz.',
    'taiwanShape.license.simplemaps.desc':
      'SimpleMaps, bei Quellenangabe kostenlos kommerziell nutzbar.',
    'taiwanShape.license.extractedFromPrefix': 'Extrahiert aus ',
    'taiwanShape.download.svg': 'SVG herunterladen',
    'taiwanShape.download.topo': 'TopoJSON herunterladen',
    'taiwanShape.download.all': 'Alle herunterladen (ZIP)',
    'taiwanShape.copy.button': 'SVG kopieren',
    'taiwanShape.copy.copied': '✓ Kopiert',
  },
  'zh-TW': {
    'taiwanShape.svg.icon.desc':
      '簡潔的填色輪廓 — 適合做 icon、favicon、按鈕。',
    'taiwanShape.svg.simplemaps.desc': '乾淨向量檔 — 適合網頁嵌入。',
    'taiwanShape.svg.locationMap.desc': '位置地圖 — 含經緯度網格與城市標記。',
    'taiwanShape.svg.politicalDivision.desc': '縣市邊界 — 彩色行政區劃。',
    // Meta
    // 主查詢是「台灣地圖」「台灣縣市地圖」「台灣地圖圖片」：一般讀者要圖檔，格式名留後段（2026-11-04 evolve）
    'taiwanShape.meta.title':
      '台灣地圖免費下載：縣市地圖 SVG、GeoJSON、TopoJSON 開源資料',
    'taiwanShape.meta.description':
      '完整的開源台灣地圖資料：SVG 輪廓、縣市與鄉鎮級 TopoJSON、D3.js / Leaflet / Python / Vue 使用範例。AI 畫出來的台灣永遠是錯的，這裡是對的。',

    'taiwanShape.hero.kicker': '🗺️ 開源地圖資料集',
    'taiwanShape.hero.title': '台灣的形狀',
    'taiwanShape.hero.subtitle':
      'SVG、GeoJSON、TopoJSON — 給開發者、設計師、研究者的完整開源地圖資料。',

    'taiwanShape.story.heading': '為什麼台灣的形狀重要',
    'taiwanShape.story.p1':
      '讓任何一款 AI 畫圖工具畫台灣，出來的幾乎都是一顆圓圓胖胖、介於橄欖和馬鈴薯之間的東西。台灣不是橄欖。它是一條 394 公里長的番薯，有一條縱貫南北的中央山脈，還有一百多座離島。',
    'taiwanShape.story.p2':
      '把形狀畫對，不只是設計細節，是身份問題。這個頁面收集我們在 taiwan.md 上使用的所有開源地圖素材，讓任何人都能在自己的專案裡精確地呈現台灣。',

    'taiwanShape.comparison.title': '🤖 vs. 🇹🇼 — AI 每次都畫錯，真的',
    'taiwanShape.comparison.aiLabel': 'AI 生成（錯的）',
    'taiwanShape.comparison.correctLabel': '正確版本（維基百科）',

    'taiwanShape.svg.heading': '📐 SVG 輪廓 — 直接嵌入',
    'taiwanShape.svg.description':
      '四組精選 SVG 檔案，全部是 CC 授權或公有領域。可以直接丟進任何網頁、App 或設計稿。',
    'taiwanShape.svg.usageHeading': '使用方式',
    'taiwanShape.svg.licenseNote':
      '所有 SVG 皆為 Creative Commons 授權或公有領域。標註來源為佳但非必要。',

    'taiwanShape.geo.heading': '🌐 TopoJSON — 縣市級互動地圖',
    'taiwanShape.geo.intro1':
      '如果你要做的是互動地圖——縮放、滑鼠懸停、用資料值填色——你需要的不是 SVG 路徑，而是真正的地理座標資料。我們打包了從 Waiting 的 taiwan-vue-components（MIT 授權，2018）萃取的 TopoJSON 檔案。',
    'taiwanShape.geo.intro2':
      'TopoJSON 是 GeoJSON 的壓縮版：相鄰縣市共用的邊界只儲存一次，檔案小 80%。用 topojson-client 可以即時轉回 GeoJSON。',
    'taiwanShape.geo.formatHeading': 'TopoJSON vs GeoJSON — 該選哪一個',
    'taiwanShape.geo.formatTopo':
      'TopoJSON：檔案小、相鄰區域共用邊界、適合做網頁互動地圖。',
    'taiwanShape.geo.formatGeo':
      'GeoJSON：格式簡單、直接相容 Python geopandas、QGIS 和多數 GIS 工具。',
    'taiwanShape.geo.countryHeading': '全國輪廓（22 個縣市）',
    'taiwanShape.geo.countryDesc':
      '約 21 KB 的 TopoJSON 檔案，包含 22 個縣市與直轄市，每個都是獨立的 feature。做 choropleth 地圖的起點。',
    'taiwanShape.geo.townsHeading': '全 22 縣市鄉鎮級資料',
    'taiwanShape.geo.townsDesc':
      '我們打包了全部 22 縣市的鄉鎮級 TopoJSON 檔案，皆萃取自同一個來源 repo。',

    'taiwanShape.codes.heading': '🧭 行政區代碼對照表',
    'taiwanShape.codes.intro':
      '台灣的行政區使用數字代碼編碼。以下是 22 個縣市級行政區的對照表（檔名規則：`towns-{code}.json`）。',
    'taiwanShape.codes.codeCol': '代碼',
    'taiwanShape.codes.nameCol': '行政區',
    'taiwanShape.codes.typeCol': '類型',

    'taiwanShape.examples.heading': '💻 使用範例',
    'taiwanShape.examples.htmlTitle': 'HTML — 靜態嵌入',
    'taiwanShape.examples.cssTitle': 'CSS — 背景圖片',
    'taiwanShape.examples.d3Title': 'D3.js — 互動 choropleth',
    'taiwanShape.examples.pythonTitle': 'Python — geopandas',
    'taiwanShape.examples.leafletTitle': 'Leaflet — 瓦片地圖疊圖',
    'taiwanShape.examples.vueTitle': 'Vue — taiwan-vue-components',

    'taiwanShape.others.heading': '📚 其他開源資料來源',
    'taiwanShape.others.intro':
      '如果你需要的比這裡打包的更多——更高解析度、不同投影、歷史行政區界——以下是我們推薦的來源：',

    'taiwanShape.license.heading': '⚖️ 授權與出處',
    'taiwanShape.license.intro':
      '這個頁面上的每個檔案都是開源的。以下是完整的來源與授權資訊：',

    // Taiwan-shape ternary-fallback fix (2026-08-17)
    'taiwanShape.geo.townsSourceNote':
      '以上已收錄全部 22 縣市。鄉鎮界資料出自 ',
    'taiwanShape.source.dataGovTw.desc':
      '政府官方開放資料平台，包含內政部發布的行政區界 shapefile。',
    'taiwanShape.source.naturalEarth.desc':
      '公有領域全球地圖資料，1:10m / 1:50m / 1:110m 三種比例尺。適合做含台灣的世界地圖。',
    'taiwanShape.source.osm.desc':
      'OSM 社群編輯的台灣地圖，可透過 Overpass API 與 Geofabrik 下載 OSM XML 或 PBF。',
    'taiwanShape.source.g0v.desc':
      '台灣公民科技社群。許多 g0v 專案以開源形式發布整理過的地圖資料和視覺化。',
    'taiwanShape.source.gadm.desc':
      '全球行政區資料庫，台灣行政區界 0-3 級，提供 Shapefile / GeoPackage / KMZ / R 格式。',
    'taiwanShape.license.wikimedia.desc':
      'Wikimedia Commons，Creative Commons 授權。',
    'taiwanShape.license.simplemaps.desc':
      'SimpleMaps，標註來源後可免費商業使用。',
    'taiwanShape.license.extractedFromPrefix': '出自 ',
    'taiwanShape.download.svg': '下載 SVG',
    'taiwanShape.download.topo': '下載 TopoJSON',
    'taiwanShape.download.all': '下載全部（ZIP）',
    'taiwanShape.copy.button': '複製 SVG',
    'taiwanShape.copy.copied': '✓ 已複製',
  },

  ja: {
    'taiwanShape.svg.icon.desc':
      'シンプルな塗りつぶし輪郭 — アイコン、favicon、ボタンに最適。',
    'taiwanShape.svg.simplemaps.desc':
      'クリーンなベクター — Web 埋め込みに最適。',
    'taiwanShape.svg.locationMap.desc':
      '位置マップ — 経緯度・都市マーカー付き。',
    'taiwanShape.svg.politicalDivision.desc': '県市境界 — カラー行政区分。',
    'taiwanShape.meta.title':
      '台湾のかたち — オープンソース地図データ：SVG・GeoJSON・TopoJSON',
    'taiwanShape.meta.description':
      '完全なオープンソース台湾地図データ：SVG 輪郭、県市と町丁目レベルの TopoJSON、D3.js / Leaflet / Python / Vue の使用例。AI が描く台湾はいつも間違い、こちらが正しいデータです。',

    'taiwanShape.hero.kicker': '🗺️ オープン地図アーカイブ',
    'taiwanShape.hero.title': '台湾のかたち',
    'taiwanShape.hero.subtitle':
      'SVG・GeoJSON・TopoJSON — 開発者・デザイナー・研究者のためのオープンソース地図データ集。',

    'taiwanShape.story.heading': '台湾のかたちが大事な理由',
    'taiwanShape.story.p1':
      'どんな AI 画像生成ツールに台湾を描かせても、出てくるのはだいたいオリーブとジャガイモの中間のような丸い塊です。台湾はオリーブではありません。394 キロメートルの細長いサツマイモで、中央山脈が南北を貫き、離島が 100 以上あります。',
    'taiwanShape.story.p2':
      'かたちを正確に描くのは、デザインの細部ではなく、アイデンティティの問題です。このページでは taiwan.md で使っているオープンソース地図素材をすべて集めています。',

    'taiwanShape.comparison.title': '🤖 vs. 🇹🇼 — AI はいつも間違える',
    'taiwanShape.comparison.aiLabel': 'AI 生成（間違い）',
    'taiwanShape.comparison.correctLabel': '正解（Wikipedia）',

    'taiwanShape.svg.heading': '📐 SVG 輪郭 — すぐ使える',
    'taiwanShape.svg.description':
      '厳選した 4 つの SVG ファイル、すべて CC 或いはパブリックドメイン。あらゆる Web サイト、アプリ、デザインファイルに直接使えます。',
    'taiwanShape.svg.usageHeading': '使い方',
    'taiwanShape.svg.licenseNote':
      'SVG はすべて Creative Commons またはパブリックドメインです。帰属表示は歓迎しますが必須ではありません。',

    'taiwanShape.geo.heading': '🌐 TopoJSON — 県市レベルのインタラクティブ地図',
    'taiwanShape.geo.intro1':
      'インタラクティブ地図を作るには SVG パスではなく、地理座標データが必要です。Waiting の taiwan-vue-components（MIT ライセンス、2018）から抽出した TopoJSON ファイルを同梱しています。',
    'taiwanShape.geo.intro2':
      'TopoJSON は GeoJSON の圧縮版です。隣接する行政区が共有する境界線を一度だけ保存するため、ファイルサイズが 80% 小さくなります。topojson-client でオンザフライで GeoJSON に変換できます。',
    'taiwanShape.geo.formatHeading': 'TopoJSON と GeoJSON の使い分け',
    'taiwanShape.geo.formatTopo':
      'TopoJSON：ファイルサイズが小さく、隣接区域が境界を共有する。Web インタラクティブ地図に最適。',
    'taiwanShape.geo.formatGeo':
      'GeoJSON：シンプル、Python geopandas、QGIS などの GIS ツールと互換性あり。',
    'taiwanShape.geo.countryHeading': '国レベルの輪郭（22 県市）',
    'taiwanShape.geo.countryDesc':
      '約 21 KB の TopoJSON。22 の県市と直轄市がそれぞれ独立した feature。Choropleth 地図の出発点。',
    'taiwanShape.geo.townsHeading': '全 22 県市の町丁目レベル',
    'taiwanShape.geo.townsDesc':
      '全 22 県市の町丁目レベル TopoJSON を同梱しています。すべて同じソースリポジトリから抽出。',

    'taiwanShape.codes.heading': '🧭 行政区コード対照表',
    'taiwanShape.codes.intro':
      '台湾の行政区は数字コードで識別されます。22 の県市レベル行政区の対照表です（ファイル命名：`towns-{code}.json`）。',
    'taiwanShape.codes.codeCol': 'コード',
    'taiwanShape.codes.nameCol': '行政区',
    'taiwanShape.codes.typeCol': '種別',

    'taiwanShape.examples.heading': '💻 使用例',
    'taiwanShape.examples.htmlTitle': 'HTML — 静的埋め込み',
    'taiwanShape.examples.cssTitle': 'CSS — 背景画像',
    'taiwanShape.examples.d3Title': 'D3.js — インタラクティブ choropleth',
    'taiwanShape.examples.pythonTitle': 'Python — geopandas',
    'taiwanShape.examples.leafletTitle': 'Leaflet — タイル地図オーバーレイ',
    'taiwanShape.examples.vueTitle': 'Vue — taiwan-vue-components',

    'taiwanShape.others.heading': '📚 他のオープンデータソース',
    'taiwanShape.others.intro':
      'ここに同梱されているもの以上が必要な場合（高解像度、異なる投影、歴史的行政区界など）、以下がお勧めの情報源です：',

    'taiwanShape.license.heading': '⚖️ ライセンスと帰属',
    'taiwanShape.license.intro':
      'このページのすべてのファイルはオープンソースです。正確な出典とライセンス：',

    // Taiwan-shape ternary-fallback fix (2026-08-17)
    'taiwanShape.geo.townsSourceNote':
      '22 県市すべてを上記に収録。町丁目境界データの出典は ',
    'taiwanShape.source.dataGovTw.desc':
      '台湾政府のオープンデータ公式ポータル、内政部の行政境界シェープファイルを含む。',
    'taiwanShape.source.naturalEarth.desc':
      'パブリックドメインのグローバル地図データ、1:10m、1:50m、1:110m スケール。小スケールの世界地図に最適。',
    'taiwanShape.source.osm.desc':
      'OSM コミュニティが編集した台湾地図、Overpass API と Geofabrik 経由で OSM XML または PBF としてダウンロード可能。',
    'taiwanShape.source.g0v.desc':
      '台湾のシビックテックコミュニティ。多くの g0v プロジェクトがクリーンアップされた地図データと可視化をオープンソースで公開。',
    'taiwanShape.source.gadm.desc':
      'グローバル行政区域データベース、台湾の行政境界 0-3 レベルを Shapefile、GeoPackage、KMZ、R 形式で提供。',
    'taiwanShape.license.wikimedia.desc':
      'Wikimedia Commons、クリエイティブ・コモンズ。',
    'taiwanShape.license.simplemaps.desc':
      'SimpleMaps、帰属表示付きで個人・商用利用無料。',
    'taiwanShape.license.extractedFromPrefix': '出典：',
    'taiwanShape.download.svg': 'SVG をダウンロード',
    'taiwanShape.download.topo': 'TopoJSON をダウンロード',
    'taiwanShape.download.all': 'すべてダウンロード（ZIP）',
    'taiwanShape.copy.button': 'SVG をコピー',
    'taiwanShape.copy.copied': '✓ コピーしました',
  },

  ko: {
    'taiwanShape.svg.icon.desc':
      '심플한 채워진 윤곽 — 아이콘, 파비콘, 버튼에 최적.',
    'taiwanShape.svg.simplemaps.desc': '깨끗한 벡터 — 웹 임베딩에 최적.',
    'taiwanShape.svg.locationMap.desc': '위치 지도 — 경위도 · 도시 마커 포함.',
    'taiwanShape.svg.politicalDivision.desc': '현시 경계 — 컬러 행정구역.',
    'taiwanShape.meta.title':
      '대만의 모양 — 오픈소스 지도 데이터: SVG · GeoJSON · TopoJSON',
    'taiwanShape.meta.description':
      '완전한 오픈소스 대만 지도 데이터: SVG 윤곽, 현시와 향진 수준의 TopoJSON, D3.js / Leaflet / Python / Vue 사용 예제. AI가 그리는 대만은 항상 틀립니다. 여기가 정답입니다.',

    'taiwanShape.hero.kicker': '🗺️ 오픈 지도 아카이브',
    'taiwanShape.hero.title': '대만의 모양',
    'taiwanShape.hero.subtitle':
      'SVG · GeoJSON · TopoJSON — 개발자·디자이너·연구자를 위한 오픈소스 지도 데이터 모음.',

    'taiwanShape.story.heading': '대만의 모양이 왜 중요한가',
    'taiwanShape.story.p1':
      'AI 이미지 생성 도구에 대만을 그려달라고 해보면 결과는 거의 항상 올리브와 감자 사이 어딘가의 둥근 덩어리입니다. 대만은 올리브가 아닙니다. 394 킬로미터 길이의 고구마 모양으로, 중앙산맥이 남북을 가로지르고 100 개가 넘는 부속 섬이 있습니다.',
    'taiwanShape.story.p2':
      '모양을 정확히 그리는 것은 디자인의 세부가 아니라 정체성의 문제입니다. 이 페이지에는 taiwan.md에서 사용하는 모든 오픈소스 지도 자료가 모여 있습니다.',

    'taiwanShape.comparison.title': '🤖 vs. 🇹🇼 — AI는 매번 틀립니다',
    'taiwanShape.comparison.aiLabel': 'AI 생성 (틀림)',
    'taiwanShape.comparison.correctLabel': '정답 (위키백과)',

    'taiwanShape.svg.heading': '📐 SVG 윤곽 — 바로 사용 가능',
    'taiwanShape.svg.description':
      '엄선된 4개의 SVG 파일, 모두 CC 라이선스 또는 퍼블릭 도메인입니다. 어떤 웹사이트, 앱, 디자인 파일에도 바로 사용할 수 있습니다.',
    'taiwanShape.svg.usageHeading': '사용 방법',
    'taiwanShape.svg.licenseNote':
      '모든 SVG는 Creative Commons 라이선스 또는 퍼블릭 도메인입니다. 출처 표시는 권장되나 필수는 아닙니다.',

    'taiwanShape.geo.heading': '🌐 TopoJSON — 현시 수준 인터랙티브 지도',
    'taiwanShape.geo.intro1':
      '인터랙티브 지도—줌, 호버, 데이터 값으로 채색—에는 SVG 경로가 아닌 진짜 지리 좌표 데이터가 필요합니다. Waiting의 taiwan-vue-components (MIT 라이선스, 2018)에서 추출한 TopoJSON 파일을 번들로 제공합니다.',
    'taiwanShape.geo.intro2':
      'TopoJSON은 GeoJSON의 압축 버전입니다. 인접한 현시가 공유하는 경계선은 한 번만 저장되므로 파일 크기가 80% 작습니다. topojson-client로 즉시 GeoJSON으로 변환할 수 있습니다.',
    'taiwanShape.geo.formatHeading': 'TopoJSON vs GeoJSON — 어느 쪽을?',
    'taiwanShape.geo.formatTopo':
      'TopoJSON: 파일 크기가 작고, 인접 지역 간 경계를 공유합니다. 웹 인터랙티브 지도에 최적.',
    'taiwanShape.geo.formatGeo':
      'GeoJSON: 단순한 포맷, Python geopandas, QGIS 등 대부분의 GIS 도구와 바로 호환.',
    'taiwanShape.geo.countryHeading': '국가 수준 윤곽 (22 현시)',
    'taiwanShape.geo.countryDesc':
      '약 21 KB TopoJSON 파일, 22개 현시와 직할시가 각각 독립적인 feature. Choropleth 지도의 출발점.',
    'taiwanShape.geo.townsHeading': '전체 22개 현시 향진 수준 데이터',
    'taiwanShape.geo.townsDesc':
      '전체 22개 현시의 향진 수준 TopoJSON 파일을 번들로 제공합니다. 모두 동일한 소스 저장소에서 추출했습니다.',

    'taiwanShape.codes.heading': '🧭 행정구역 코드 대조표',
    'taiwanShape.codes.intro':
      '대만 행정구역은 숫자 코드로 식별됩니다. 22개 현시 수준 행정구역의 대조표입니다 (파일 이름: `towns-{code}.json`).',
    'taiwanShape.codes.codeCol': '코드',
    'taiwanShape.codes.nameCol': '행정구역',
    'taiwanShape.codes.typeCol': '유형',

    'taiwanShape.examples.heading': '💻 사용 예제',
    'taiwanShape.examples.htmlTitle': 'HTML — 정적 삽입',
    'taiwanShape.examples.cssTitle': 'CSS — 배경 이미지',
    'taiwanShape.examples.d3Title': 'D3.js — 인터랙티브 choropleth',
    'taiwanShape.examples.pythonTitle': 'Python — geopandas',
    'taiwanShape.examples.leafletTitle': 'Leaflet — 타일 지도 오버레이',
    'taiwanShape.examples.vueTitle': 'Vue — taiwan-vue-components',

    'taiwanShape.others.heading': '📚 다른 오픈 데이터 소스',
    'taiwanShape.others.intro':
      '여기 번들로 제공되는 것 이상이 필요한 경우 — 고해상도, 다른 투영법, 역사적 행정구역 경계 — 다음이 권장하는 출처입니다:',

    'taiwanShape.license.heading': '⚖️ 라이선스 및 출처',
    'taiwanShape.license.intro':
      '이 페이지의 모든 파일은 오픈소스입니다. 정확한 출처와 라이선스:',

    // Taiwan-shape ternary-fallback fix (2026-08-17)
    'taiwanShape.geo.townsSourceNote':
      '22개 현시 전체를 위에 수록. 향진 경계 데이터 출처는 ',
    'taiwanShape.source.dataGovTw.desc':
      '대만 정부의 공식 오픈 데이터, 내정부의 행정 경계 셰이프 파일 포함.',
    'taiwanShape.source.naturalEarth.desc':
      '퍼블릭 도메인 글로벌 지도 데이터, 1:10m, 1:50m, 1:110m 축척. 소축척 세계 지도에 최적.',
    'taiwanShape.source.osm.desc':
      'OSM 커뮤니티가 편집한 대만 지도, Overpass API와 Geofabrik을 통해 OSM XML 또는 PBF로 다운로드 가능.',
    'taiwanShape.source.g0v.desc':
      '대만의 시빅 테크 커뮤니티. 많은 g0v 프로젝트가 정제된 지도 데이터와 시각화를 오픈소스로 공개.',
    'taiwanShape.source.gadm.desc':
      '글로벌 행정구역 데이터베이스, 대만 행정 경계 0-3 레벨을 Shapefile, GeoPackage, KMZ, R 형식으로 제공.',
    'taiwanShape.license.wikimedia.desc':
      'Wikimedia Commons, 크리에이티브 커먼즈.',
    'taiwanShape.license.simplemaps.desc':
      'SimpleMaps, 출처 표시 하에 개인 및 상업적 이용 무료.',
    'taiwanShape.license.extractedFromPrefix': '출처: ',
    'taiwanShape.download.svg': 'SVG 다운로드',
    'taiwanShape.download.topo': 'TopoJSON 다운로드',
    'taiwanShape.download.all': '전체 다운로드 (ZIP)',
    'taiwanShape.copy.button': 'SVG 복사',
    'taiwanShape.copy.copied': '✓ 복사됨',
  },
  fr: {
    'taiwanShape.svg.icon.desc':
      'Contour plein et simple — parfait pour icônes, favicons et boutons.',
    'taiwanShape.svg.simplemaps.desc':
      "Vecteur épuré — parfait pour l'intégration web.",
    'taiwanShape.svg.locationMap.desc':
      'Carte de localisation avec grille lat/lon et repères de villes.',
    'taiwanShape.svg.politicalDivision.desc':
      'Limites des comtés — divisions administratives en couleur.',
    'taiwanShape.meta.title':
      'La forme de Taïwan — Cartes open source, données SVG, GeoJSON et TopoJSON',
    'taiwanShape.meta.description':
      "Données cartographiques open source complètes de Taïwan : contours SVG, TopoJSON pour les comtés et cantons, exemples d'utilisation en D3.js, Leaflet, Python et Vue. L'IA dessine toujours Taïwan de travers — voici les données correctes.",
    'taiwanShape.hero.kicker': '🗺️ Archive cartographique ouverte',
    'taiwanShape.hero.title': 'La forme de Taïwan',
    'taiwanShape.hero.subtitle':
      'SVG, GeoJSON, TopoJSON — un ensemble de données cartographiques open source complet pour développeurs, designers et chercheurs.',
    'taiwanShape.story.heading': 'Pourquoi la forme de Taïwan compte',
    'taiwanShape.story.p1':
      "Demandez à n'importe quel générateur d'images IA de dessiner Taïwan et observez le résultat. Il produit généralement une masse arrondie et trapue, quelque part entre une olive et une pomme de terre. Taïwan n'est pas une olive. C'est une patate douce de 394 kilomètres de long, avec une chaîne de montagnes centrale et plus de 100 îles au large.",
    'taiwanShape.story.p2':
      "Avoir la bonne forme n'est pas un caprice de design — c'est une question d'identité. Cette page rassemble toutes les ressources open source que nous utilisons sur taiwan.md afin que chacun puisse représenter Taïwan avec précision dans son propre projet.",
    'taiwanShape.comparison.title': "🤖 vs. 🇹🇼 — L'IA se trompe. Toujours.",
    'taiwanShape.comparison.aiLabel': 'Généré par IA (incorrect)',
    'taiwanShape.comparison.correctLabel': 'Correct (Wikipedia)',
    'taiwanShape.svg.heading': '📐 Contours SVG — intégration instantanée',
    'taiwanShape.svg.description':
      "Quatre fichiers SVG sélectionnés, tous sous CC / domaine public. Intégrez-les directement dans n'importe quel site web, application ou fichier de design.",
    'taiwanShape.svg.usageHeading': "Exemples d'utilisation",
    'taiwanShape.svg.licenseNote':
      'Tous les SVG sont sous licence Creative Commons ou dans le domaine public. Attribution appréciée mais non obligatoire.',
    'taiwanShape.geo.heading':
      '🌐 TopoJSON — cartes interactives au niveau des comtés',
    'taiwanShape.geo.intro1':
      'Pour les cartes interactives — zoom, survol, remplissage par valeur de données — vous avez besoin de coordonnées géographiques réelles, pas seulement de chemins SVG. Nous fournissons des fichiers TopoJSON extraits de taiwan-vue-components de Waiting (licence MIT, 2018).',
    'taiwanShape.geo.intro2':
      "Le TopoJSON est du GeoJSON compressé : les frontières partagées entre comtés ne sont stockées qu'une seule fois, réduisant la taille des fichiers de 80 %. Il peut être converti en GeoJSON à la volée avec topojson-client.",
    'taiwanShape.geo.formatHeading': 'TopoJSON vs GeoJSON — lequel choisir ?',
    'taiwanShape.geo.formatTopo':
      'TopoJSON : taille de fichier réduite, topologie partagée entre régions adjacentes, le bon choix pour les cartes web.',
    'taiwanShape.geo.formatGeo':
      'GeoJSON : format plus simple, compatibilité directe avec Python geopandas, QGIS et la plupart des outils SIG.',
    'taiwanShape.geo.countryHeading': 'Contour au niveau national (22 comtés)',
    'taiwanShape.geo.countryDesc':
      "Fichier TopoJSON d'environ 21 Ko contenant les 22 comtés et municipalités spéciales en tant qu'entités distinctes. Parfait pour les cartes choroplèthes.",
    'taiwanShape.geo.townsHeading': 'Niveau canton (les 22 comtés et villes)',
    'taiwanShape.geo.townsDesc':
      'Nous fournissons les fichiers au niveau canton pour les 22 comtés et villes, tous extraits du même dépôt source.',
    'taiwanShape.codes.heading': '🧭 Codes de divisions administratives',
    'taiwanShape.codes.intro':
      'Les divisions administratives de Taïwan utilisent des codes numériques. Voici le tableau de référence pour les 22 divisions au niveau du comté (le nommage des fichiers suit le format `towns-{code}.json`).',
    'taiwanShape.codes.codeCol': 'Code',
    'taiwanShape.codes.nameCol': 'Division',
    'taiwanShape.codes.typeCol': 'Type',
    'taiwanShape.examples.heading': "💻 Exemples d'utilisation",
    'taiwanShape.examples.htmlTitle': 'HTML — intégration statique',
    'taiwanShape.examples.cssTitle': "CSS — image d'arrière-plan",
    'taiwanShape.examples.d3Title': 'D3.js — carte choroplèthe interactive',
    'taiwanShape.examples.pythonTitle': 'Python — geopandas',
    'taiwanShape.examples.leafletTitle':
      'Leaflet — superposition de carte par tuiles',
    'taiwanShape.examples.vueTitle': 'Vue — taiwan-vue-components',
    'taiwanShape.others.heading': '📚 Autres sources de données ouvertes',
    'taiwanShape.others.intro':
      'Si vous avez besoin de plus que ce qui est fourni ici — résolution supérieure, projections différentes, limites administratives historiques — voici les sources que nous recommandons :',
    'taiwanShape.license.heading': '⚖️ Licence et attribution',
    'taiwanShape.license.intro':
      'Chaque fichier de cette page est open source. Voici les origines et licences exactes :',
    // Taiwan-shape ternary-fallback fix (2026-08-17)
    'taiwanShape.geo.townsSourceNote':
      'Tous les 22 comtés et villes sont inclus ci-dessus. Les données de limites des cantons proviennent de ',
    'taiwanShape.source.dataGovTw.desc':
      "Plateforme officielle de données ouvertes du gouvernement taïwanais, incluant les fichiers Shapefile de limites administratives publiés par le Ministère de l'Intérieur.",
    'taiwanShape.source.naturalEarth.desc':
      'Données cartographiques mondiales dans le domaine public, aux échelles 1:10m / 1:50m / 1:110m. Idéal pour les cartes du monde incluant Taïwan.',
    'taiwanShape.source.osm.desc':
      "Carte de Taïwan éditée par la communauté OSM, téléchargeable en OSM XML ou PBF via l'API Overpass et Geofabrik.",
    'taiwanShape.source.g0v.desc':
      'Communauté taïwanaise de technologie civique. De nombreux projets g0v publient en open source des données cartographiques nettoyées et des visualisations.',
    'taiwanShape.source.gadm.desc':
      'Base de données mondiale des zones administratives, limites administratives de Taïwan aux niveaux 0-3, disponible en formats Shapefile / GeoPackage / KMZ / R.',
    'taiwanShape.license.wikimedia.desc':
      'Wikimedia Commons, licence Creative Commons.',
    'taiwanShape.license.simplemaps.desc':
      'SimpleMaps, utilisation commerciale gratuite avec attribution de la source.',
    'taiwanShape.license.extractedFromPrefix': 'Extrait de ',
    'taiwanShape.download.svg': 'Télécharger le SVG',
    'taiwanShape.download.topo': 'Télécharger le TopoJSON',
    'taiwanShape.download.all': 'Tout télécharger (ZIP)',
    'taiwanShape.copy.button': 'Copier le SVG',
    'taiwanShape.copy.copied': '✓ Copié',
  },
  es: {
    'taiwanShape.svg.icon.desc':
      'Contorno relleno simple — ideal para iconos, favicons y botones.',
    'taiwanShape.svg.simplemaps.desc':
      'Vector limpio — ideal para incrustar en la web.',
    'taiwanShape.svg.locationMap.desc':
      'Mapa de ubicación con cuadrícula de lat/lon y marcadores de ciudades.',
    'taiwanShape.svg.politicalDivision.desc':
      'Límites de condados — divisiones administrativas en color.',
    'taiwanShape.meta.title':
      'La forma de Taiwán — Mapas de código abierto, datos SVG, GeoJSON y TopoJSON',
    'taiwanShape.meta.description':
      'Datos completos de mapas de Taiwán de código abierto: contornos SVG, TopoJSON para condados y municipios, ejemplos de uso en D3.js, Leaflet, Python y Vue. La IA sigue dibujando Taiwán mal — aquí están los datos correctos.',
    'taiwanShape.hero.kicker': '🗺️ Archivo cartográfico abierto',
    'taiwanShape.hero.title': 'La forma de Taiwán',
    'taiwanShape.hero.subtitle':
      'SVG, GeoJSON, TopoJSON — un conjunto completo de datos de mapas de código abierto para desarrolladores, diseñadores e investigadores.',
    'taiwanShape.story.heading': 'Por qué importa la forma de Taiwán',
    'taiwanShape.story.p1':
      'Pide a cualquier generador de imágenes con IA que dibuje Taiwán y observa lo que pasa. Normalmente escupe una mancha gorda y redondeada, a medio camino entre una aceituna y una patata. Taiwán no es una aceituna. Es una batata de 394 kilómetros de largo con una cordillera central y más de 100 islas costeras.',
    'taiwanShape.story.p2':
      'Representar bien la forma no es un capricho de diseño — es un problema de identidad. Esta página reúne todos los recursos de código abierto que usamos en taiwan.md para que cualquiera pueda renderizar Taiwán con precisión en su propio proyecto.',
    'taiwanShape.comparison.title': '🤖 vs. 🇹🇼 — La IA siempre se equivoca.',
    'taiwanShape.comparison.aiLabel': 'Generado por IA (incorrecto)',
    'taiwanShape.comparison.correctLabel': 'Correcto (Wikipedia)',
    'taiwanShape.svg.heading': '📐 Contornos SVG — listos para usar',
    'taiwanShape.svg.description':
      'Cuatro archivos SVG seleccionados a mano, todos bajo CC o dominio público. Insértalos directamente en cualquier web, app o archivo de diseño.',
    'taiwanShape.svg.usageHeading': 'Ejemplos de uso',
    'taiwanShape.svg.licenseNote':
      'Todos los SVGs están bajo Creative Commons o dominio público. Se agradece la atribución pero no es obligatoria.',
    'taiwanShape.geo.heading':
      '🌐 TopoJSON — mapas interactivos a nivel de condado',
    'taiwanShape.geo.intro1':
      'Para mapas interactivos — zoom, hover, relleno por valor de datos — necesitas coordenadas geográficas reales, no solo rutas SVG. Incluimos archivos TopoJSON extraídos de taiwan-vue-components de Waiting (Licencia MIT, 2018).',
    'taiwanShape.geo.intro2':
      'TopoJSON es GeoJSON comprimido: las fronteras compartidas entre condados se almacenan una sola vez, lo que reduce el tamaño de los archivos en un 80%. Se puede convertir a GeoJSON al vuelo con topojson-client.',
    'taiwanShape.geo.formatHeading': 'TopoJSON vs GeoJSON — ¿cuál elegir?',
    'taiwanShape.geo.formatTopo':
      'TopoJSON: menor tamaño de archivo, topología compartida entre regiones adyacentes, la opción correcta para mapas web.',
    'taiwanShape.geo.formatGeo':
      'GeoJSON: formato más sencillo, compatibilidad directa con Python geopandas, QGIS y la mayoría de herramientas GIS.',
    'taiwanShape.geo.countryHeading': 'Contorno a nivel de país (22 condados)',
    'taiwanShape.geo.countryDesc':
      'Archivo TopoJSON de ~21 KB con los 22 condados y municipios especiales como entidades separadas. Perfecto para mapas coropléticos.',
    'taiwanShape.geo.townsHeading':
      'Nivel de municipio (los 22 condados y ciudades)',
    'taiwanShape.geo.townsDesc':
      'Incluimos los archivos a nivel de municipio de los 22 condados y ciudades, todos extraídos del mismo repositorio de origen.',
    'taiwanShape.codes.heading': '🧭 Códigos de divisiones administrativas',
    'taiwanShape.codes.intro':
      'Las divisiones administrativas de Taiwán usan códigos numéricos. Aquí tienes la tabla de referencia para las 22 divisiones a nivel de condado (la nomenclatura de archivos sigue el formato `towns-{código}.json`).',
    'taiwanShape.codes.codeCol': 'Código',
    'taiwanShape.codes.nameCol': 'División',
    'taiwanShape.codes.typeCol': 'Tipo',
    'taiwanShape.examples.heading': '💻 Ejemplos de uso',
    'taiwanShape.examples.htmlTitle': 'HTML — inserción estática',
    'taiwanShape.examples.cssTitle': 'CSS — imagen de fondo',
    'taiwanShape.examples.d3Title': 'D3.js — coroplético interactivo',
    'taiwanShape.examples.pythonTitle': 'Python — geopandas',
    'taiwanShape.examples.leafletTitle':
      'Leaflet — superposición de mapa basada en teselas',
    'taiwanShape.examples.vueTitle': 'Vue — taiwan-vue-components',
    'taiwanShape.others.heading': '📚 Otras fuentes de datos abiertos',
    'taiwanShape.others.intro':
      'Si necesitas más de lo que ofrecemos aquí — mayor resolución, diferentes proyecciones, límites administrativos históricos — estas son las fuentes que recomendamos:',
    'taiwanShape.license.heading': '⚖️ Licencia y atribución',
    'taiwanShape.license.intro':
      'Todos los archivos de esta página son de código abierto. Aquí están los orígenes exactos y las licencias:',
    // Taiwan-shape ternary-fallback fix (2026-08-17)
    'taiwanShape.geo.townsSourceNote':
      'Se han incluido los 22 condados y ciudades anteriores. Los datos de límites de pueblos y distritos proceden de ',
    'taiwanShape.source.dataGovTw.desc':
      'Plataforma oficial de datos abiertos del gobierno, que incluye Shapefiles de límites administrativos publicados por el Ministerio del Interior.',
    'taiwanShape.source.naturalEarth.desc':
      'Datos cartográficos globales de dominio público en tres escalas: 1:10m / 1:50m / 1:110m. Ideales para mapas mundiales que incluyen Taiwán.',
    'taiwanShape.source.osm.desc':
      'Mapa de Taiwán editado por la comunidad de OSM, descargable como OSM XML o PBF a través de Overpass API y Geofabrik.',
    'taiwanShape.source.g0v.desc':
      'Comunidad de tecnología civica de Taiwán. Muchos proyectos g0v publican datos de mapas depurados y visualizaciones como código abierto.',
    'taiwanShape.source.gadm.desc':
      'Base de datos de áreas administrativas globales. Límites administrativos de Taiwán en niveles 0-3, disponibles en formatos Shapefile / GeoPackage / KMZ / R.',
    'taiwanShape.license.wikimedia.desc':
      'Wikimedia Commons, licencia Creative Commons.',
    'taiwanShape.license.simplemaps.desc':
      'SimpleMaps, uso comercial gratuito con atribución.',
    'taiwanShape.license.extractedFromPrefix': 'Extraído de ',
    'taiwanShape.download.svg': 'Descargar SVG',
    'taiwanShape.download.topo': 'Descargar TopoJSON',
    'taiwanShape.download.all': 'Descargar todo (ZIP)',
    'taiwanShape.copy.button': 'Copiar SVG',
    'taiwanShape.copy.copied': '✓ Copiado',
  },
} as const;
