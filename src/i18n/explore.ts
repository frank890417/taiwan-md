/**
 * exploreUI — i18n strings for /explore (database discovery hub).
 *
 * Born 2026-05-10 (issue #615 child) — replaces the old `/#categories`
 * anchor with a dedicated database front-page so visitors who arrive
 * looking to *find* things (not read narrative) get a search-first
 * interface with hot keywords + category cards + featured picks.
 *
 * Hot search keywords are intentionally translated per language (not
 * shared) so each locale surfaces terms that locale's readers actually
 * search for. They can later be replaced with GA4-derived top queries
 * via fetch-search-events.py without touching this file's structure.
 */
export const exploreUI = {
  en: {
    // Meta
    'explore.meta.title': 'Explore Taiwan.md — Browse the open knowledge base',
    'explore.meta.description':
      'Browse 1156+ curated articles about Taiwan: history, geography, culture, food, art, music, technology, nature, people, society, economy, and lifestyle. Search, discover, and explore.',

    // Hero
    'explore.hero.eyebrow': 'KNOWLEDGE HUB',
    'explore.hero.title': 'Explore Taiwan.md',
    'explore.hero.subtitle':
      'Curated long-form narratives about Taiwan — search, discover, or browse by category.',

    // Search section
    'explore.search.heading': 'Search the database',
    'explore.search.placeholder': 'Search Taiwan — people, places, events…',
    'explore.search.button': 'Search',
    'explore.search.random': 'Random discovery',
    'explore.search.randomSubtitle':
      'Roll the dice — find a story you didn’t know you were looking for',
    'explore.hotSearches.label': 'Trending',
    'explore.hotSearches.term1': 'Semiconductors',
    'explore.hotSearches.term2': 'Night Markets',
    'explore.hotSearches.term3': 'Indigenous Peoples',
    'explore.hotSearches.term4': '228 Incident',
    'explore.hotSearches.term5': 'TSMC',
    'explore.hotSearches.term6': 'Bubble Tea',

    // Stats ribbon
    'explore.stats.articles': 'articles',
    'explore.stats.contributors': 'contributors',
    'explore.stats.languages': 'languages',
    'explore.stats.last30d': 'updates / 30d',

    // Categories section
    'explore.categories.heading': 'Browse by category',
    'explore.categories.subtitle':
      'Twelve domains, each with its own curated angle on the island.',

    // Featured picks section
    'explore.featured.heading': 'Featured deep-dives',
    'explore.featured.subtitle':
      'A-grade articles with extensive citations and cross-references.',
    'explore.featured.viewAll': 'View all featured →',
    'explore.featured.citations': 'citations',
    'explore.featured.minRead': 'min read',
    'explore.popular.heading': 'Popular now',
    'explore.popular.subtitle': 'Most-read articles over the past 7 days.',
    'explore.popular.views': 'views',

    // More ways to explore
    'explore.more.heading': 'More ways to explore',
    'explore.more.graph.title': 'Knowledge Graph',
    'explore.more.graph.desc':
      'See how every article connects in a force-directed visualization.',
    'explore.more.graph.cta': 'Open the graph →',
    'explore.more.map.title': 'Geographic Map',
    'explore.more.map.desc': 'Find articles by their location on the island.',
    'explore.more.map.cta': 'Open the map →',
    'explore.more.terminology.title': 'Terminology',
    'explore.more.terminology.desc':
      'Quick reference for terms used across the knowledge base.',
    'explore.more.terminology.cta': 'Open glossary →',

    // CTA footer
    'explore.cta.heading': "Can't find what you're looking for?",
    'explore.cta.body':
      'Taiwan.md is open-source — anyone can contribute an article, fix a fact, or translate a page.',
    'explore.cta.contribute': 'Contribute an article',
    'explore.cta.github': 'View on GitHub',
  },
  ja: {
    'explore.meta.title': 'Taiwan.md を探索 — オープン知識ベースを閲覧',
    'explore.meta.description':
      '台湾に関する 1156+ 本のキュレーション記事を閲覧。歴史・地理・文化・グルメ・アート・音楽・テクノロジー・自然・人物・社会・経済・暮らし — 検索して、発見して、探索する。',

    'explore.hero.eyebrow': '知識ハブ',
    'explore.hero.title': 'Taiwan.md を探索',
    'explore.hero.subtitle':
      'キュレーションされた台湾の深い物語 — 検索・発見・カテゴリーで閲覧。',

    'explore.search.heading': 'データベースを検索',
    'explore.search.placeholder': '台湾を検索 — 人物・場所・出来事…',
    'explore.search.button': '検索',
    'explore.search.random': 'ランダム発見',
    'explore.search.randomSubtitle':
      'サイコロを振って — 知らなかった物語と出会う',
    'explore.hotSearches.label': '人気',
    'explore.hotSearches.term1': '半導体',
    'explore.hotSearches.term2': '夜市',
    'explore.hotSearches.term3': '原住民族',
    'explore.hotSearches.term4': '二・二八事件',
    'explore.hotSearches.term5': 'TSMC',
    'explore.hotSearches.term6': 'タピオカミルクティー',

    'explore.stats.articles': '記事',
    'explore.stats.contributors': '貢献者',
    'explore.stats.languages': '言語',
    'explore.stats.last30d': '30日の更新',

    'explore.categories.heading': 'カテゴリーで閲覧',
    'explore.categories.subtitle':
      '12 の分野 — それぞれが島の別の側面を切り取ります。',

    'explore.featured.heading': '注目の深掘り記事',
    'explore.featured.subtitle':
      '豊富な引用とクロスリファレンスを備えた A 級記事。',
    'explore.featured.viewAll': '注目記事をすべて見る →',
    'explore.featured.citations': '引用',
    'explore.featured.minRead': '分',
    'explore.popular.heading': '人気の記事',
    'explore.popular.subtitle': '過去7日間で最も読まれた記事。',
    'explore.popular.views': '閲覧',

    'explore.more.heading': 'もっと探す方法',
    'explore.more.graph.title': '知識グラフ',
    'explore.more.graph.desc':
      'すべての記事のつながりをフォースシミュレーションで可視化。',
    'explore.more.graph.cta': 'グラフを開く →',
    'explore.more.map.title': '地理マップ',
    'explore.more.map.desc': '記事を島の地理上から探す。',
    'explore.more.map.cta': 'マップを開く →',
    'explore.more.terminology.title': '用語集',
    'explore.more.terminology.desc':
      '知識ベース全体で使われる用語のクイックリファレンス。',
    'explore.more.terminology.cta': '用語集を開く →',

    'explore.cta.heading': '探しているものが見つからなかった？',
    'explore.cta.body':
      'Taiwan.md はオープンソース — 誰でも記事を書き足したり、事実を修正したり、翻訳を投稿できます。',
    'explore.cta.contribute': '記事を投稿する',
    'explore.cta.github': 'GitHub で見る',
  },
  ko: {
    'explore.meta.title': 'Taiwan.md 탐색 — 오픈 지식 베이스 둘러보기',
    'explore.meta.description':
      '대만에 관한 1156+ 큐레이션 기사 둘러보기: 역사·지리·문화·음식·예술·음악·기술·자연·인물·사회·경제·생활. 검색하고, 발견하고, 탐색하세요.',

    'explore.hero.eyebrow': '지식 허브',
    'explore.hero.title': 'Taiwan.md 탐색',
    'explore.hero.subtitle':
      '큐레이션된 대만의 깊은 이야기 — 검색·발견·카테고리로 탐색하세요.',

    'explore.search.heading': '데이터베이스 검색',
    'explore.search.placeholder': '대만 검색 — 인물·장소·사건…',
    'explore.search.button': '검색',
    'explore.search.random': '랜덤 탐색',
    'explore.search.randomSubtitle':
      '주사위를 굴려 — 몰랐던 이야기를 만나보세요',
    'explore.hotSearches.label': '인기',
    'explore.hotSearches.term1': '반도체',
    'explore.hotSearches.term2': '야시장',
    'explore.hotSearches.term3': '원주민족',
    'explore.hotSearches.term4': '2·28 사건',
    'explore.hotSearches.term5': 'TSMC',
    'explore.hotSearches.term6': '버블티',

    'explore.stats.articles': '편 기사',
    'explore.stats.contributors': '명 기여자',
    'explore.stats.languages': '개 언어',
    'explore.stats.last30d': '30일 업데이트',

    'explore.categories.heading': '카테고리별 탐색',
    'explore.categories.subtitle':
      '12 개 분야 — 각각이 섬의 다른 단면을 보여줍니다.',

    'explore.featured.heading': '추천 심층 기사',
    'explore.featured.subtitle': '풍부한 인용과 상호 참조를 갖춘 A 등급 기사.',
    'explore.featured.viewAll': '추천 기사 전체 보기 →',
    'explore.featured.citations': '인용',
    'explore.featured.minRead': '분',
    'explore.popular.heading': '인기 기사',
    'explore.popular.subtitle': '지난 7일간 가장 많이 읽힌 기사.',
    'explore.popular.views': '조회',

    'explore.more.heading': '더 많은 탐색 방법',
    'explore.more.graph.title': '지식 그래프',
    'explore.more.graph.desc':
      '모든 기사의 연결을 포스 시뮬레이션으로 시각화합니다.',
    'explore.more.graph.cta': '그래프 열기 →',
    'explore.more.map.title': '지리 지도',
    'explore.more.map.desc': '섬의 위치별로 기사를 찾아보세요.',
    'explore.more.map.cta': '지도 열기 →',
    'explore.more.terminology.title': '용어집',
    'explore.more.terminology.desc':
      '지식 베이스에서 사용되는 용어의 빠른 참조.',
    'explore.more.terminology.cta': '용어집 열기 →',

    'explore.cta.heading': '찾고 있는 것을 찾지 못했나요?',
    'explore.cta.body':
      'Taiwan.md 는 오픈소스입니다 — 누구나 기사를 기여하거나, 사실을 수정하거나, 페이지를 번역할 수 있습니다.',
    'explore.cta.contribute': '기사 기여하기',
    'explore.cta.github': 'GitHub 에서 보기',
  },
  vi: {
    'explore.meta.title':
      'Khám phá Taiwan.md — Duyệt kho tri thức mở về Đài Loan',
    'explore.meta.description':
      'Duyệt hơn 1156 bài viết tuyển chọn về Đài Loan: lịch sử, địa lý, văn hóa, ẩm thực, nghệ thuật, âm nhạc, công nghệ, thiên nhiên, nhân vật, xã hội, kinh tế, đời sống. Tìm kiếm, khám phá, tìm hiểu.',

    'explore.hero.eyebrow': 'Kho tri thức',
    'explore.hero.title': 'Khám phá Taiwan.md',
    'explore.hero.subtitle':
      'Những câu chuyện chuyên sâu được tuyển chọn về hòn đảo — tìm kiếm, khám phá, duyệt theo danh mục.',

    'explore.search.heading': 'Tìm kiếm cơ sở dữ liệu',
    'explore.search.placeholder':
      'Tìm kiếm mọi điều về Đài Loan (con người, địa danh, văn hóa, sự kiện)',
    'explore.search.button': 'Tìm kiếm',
    'explore.search.random': 'Khám phá ngẫu nhiên',
    'explore.search.randomSubtitle':
      'Gieo xúc xắc — gặp một câu chuyện bạn chưa từng nghĩ tới',
    'explore.hotSearches.label': 'Tìm kiếm phổ biến',
    'explore.hotSearches.term1': 'Chất bán dẫn',
    'explore.hotSearches.term2': 'Chợ đêm',
    'explore.hotSearches.term3': 'Người bản địa',
    'explore.hotSearches.term4': 'Sự kiện 28 tháng 2',
    'explore.hotSearches.term5': 'TSMC',
    'explore.hotSearches.term6': 'Trà sữa trân châu',

    'explore.stats.articles': 'bài viết',
    'explore.stats.contributors': 'người đóng góp',
    'explore.stats.languages': 'ngôn ngữ',
    'explore.stats.last30d': 'Cập nhật trong 30 ngày qua',

    'explore.categories.heading': 'Duyệt theo danh mục',
    'explore.categories.subtitle':
      'Mười hai lĩnh vực, mỗi lĩnh vực là một lát cắt của hòn đảo này.',

    'explore.featured.heading': 'Tuyển chọn chuyên sâu',
    'explore.featured.subtitle':
      'Bài viết hạng A — chú thích đầy đủ, trích dẫn chéo giữa các bài, tiến trình nghiên cứu có thể truy nguyên.',
    'explore.featured.viewAll': 'Xem toàn bộ tuyển chọn →',
    'explore.featured.citations': 'Trích dẫn',
    'explore.featured.minRead': 'phút',
    'explore.popular.heading': 'Bài viết phổ biến',
    'explore.popular.subtitle':
      'Những bài được đọc nhiều nhất trong 7 ngày qua.',
    'explore.popular.views': 'lượt xem',

    'explore.more.heading': 'Các cách khám phá khác',
    'explore.more.graph.title': 'Đồ thị tri thức',
    'explore.more.graph.desc':
      'Xem cách các bài viết liên kết với nhau bằng đồ thị hướng lực.',
    'explore.more.graph.cta': 'Mở đồ thị →',
    'explore.more.map.title': 'Bản đồ địa lý',
    'explore.more.map.desc': 'Tìm bài viết theo vị trí trên đảo.',
    'explore.more.map.cta': 'Mở bản đồ →',
    'explore.more.terminology.title': 'Đối chiếu thuật ngữ',
    'explore.more.terminology.desc':
      'Bảng tra cứu nhanh các thuật ngữ dùng chung trong kho tri thức.',
    'explore.more.terminology.cta': 'Mở bảng đối chiếu →',

    'explore.cta.heading': 'Không tìm thấy nội dung mong muốn?',
    'explore.cta.body':
      'Taiwan.md là dự án mã nguồn mở — bất kỳ ai cũng có thể đóng góp một bài viết, sửa một dữ kiện hoặc dịch một trang.',
    'explore.cta.contribute': 'Đóng góp một bài',
    'explore.cta.github': 'Duyệt trên GitHub',
  },
  id: {
    'explore.meta.title':
      'Jelajahi Taiwan.md — Telusuri basis pengetahuan terbuka Taiwan',
    'explore.meta.description':
      'Telusuri 1156+ artikel pilihan tentang Taiwan: sejarah, geografi, budaya, kuliner, seni, musik, teknologi, alam, tokoh, masyarakat, ekonomi, dan kehidupan. Cari, temukan, jelajahi.',

    'explore.hero.eyebrow': 'Basis Pengetahuan',
    'explore.hero.title': 'Jelajahi Taiwan.md',
    'explore.hero.subtitle':
      'Narasi mendalam pilihan tentang pulau ini — cari, temukan, dan telusuri berdasarkan kategori.',

    'explore.search.heading': 'Cari di Basis Data',
    'explore.search.placeholder':
      'Cari segala hal tentang Taiwan (tokoh, tempat, budaya, peristiwa)',
    'explore.search.button': 'Cari',
    'explore.search.random': 'Jelajahi Secara Acak',
    'explore.search.randomSubtitle':
      'Lempar dadu — temukan kisah yang tak pernah kamu bayangkan',
    'explore.hotSearches.label': 'Pencarian Populer',
    'explore.hotSearches.term1': 'Semikonduktor',
    'explore.hotSearches.term2': 'Pasar malam',
    'explore.hotSearches.term3': 'Masyarakat adat',
    'explore.hotSearches.term4': 'Insiden 28 Februari',
    'explore.hotSearches.term5': 'TSMC',
    'explore.hotSearches.term6': 'Teh susu mutiara',

    'explore.stats.articles': 'artikel',
    'explore.stats.contributors': 'kontributor',
    'explore.stats.languages': 'bahasa',
    'explore.stats.last30d': 'diperbarui dalam 30 hari terakhir',

    'explore.categories.heading': 'Telusuri Berdasarkan Kategori',
    'explore.categories.subtitle':
      'Dua belas bidang, masing-masing menampilkan satu sisi pulau ini.',

    'explore.featured.heading': 'Pilihan Mendalam',
    'explore.featured.subtitle':
      'Artikel kelas A — catatan kaki lengkap, rujukan antarartikel, dan jejak penelitian yang dapat ditelusuri.',
    'explore.featured.viewAll': 'Lihat semua pilihan →',
    'explore.featured.citations': 'Kutipan',
    'explore.featured.minRead': 'menit',
    'explore.popular.heading': 'Artikel Populer',
    'explore.popular.subtitle':
      'Artikel yang paling banyak dibaca dalam 7 hari terakhir.',
    'explore.popular.views': 'tayangan',

    'explore.more.heading': 'Cara Lain untuk Menjelajah',
    'explore.more.graph.title': 'Graf Pengetahuan',
    'explore.more.graph.desc':
      'Lihat keterkaitan antarartikel melalui graf berbasis gaya.',
    'explore.more.graph.cta': 'Buka graf →',
    'explore.more.map.title': 'Peta Geografis',
    'explore.more.map.desc':
      'Temukan artikel berdasarkan lokasinya di pulau ini.',
    'explore.more.map.cta': 'Buka peta →',
    'explore.more.terminology.title': 'Padanan Istilah',
    'explore.more.terminology.desc':
      'Panduan ringkas istilah yang digunakan bersama dalam basis pengetahuan.',
    'explore.more.terminology.cta': 'Buka tabel padanan →',

    'explore.cta.heading': 'Tidak menemukan yang ingin dibaca?',
    'explore.cta.body':
      'Taiwan.md bersifat sumber terbuka — siapa pun dapat menyumbangkan artikel, memperbaiki fakta, atau menerjemahkan halaman.',
    'explore.cta.contribute': 'Sumbangkan artikel',
    'explore.cta.github': 'Telusuri di GitHub',
  },
  pt: {
    'explore.meta.title':
      'Explore Taiwan.md — Navegue pela base de conhecimento aberta de Taiwan',
    'explore.meta.description':
      'Navegue por mais de 1156 artigos selecionados sobre Taiwan: história, geografia, cultura, gastronomia, arte, música, tecnologia, natureza, personalidades, sociedade, economia e cotidiano. Pesquise, descubra, explore.',

    'explore.hero.eyebrow': 'Base de conhecimento',
    'explore.hero.title': 'Explore Taiwan.md',
    'explore.hero.subtitle':
      'Narrativas aprofundadas e selecionadas sobre a ilha — pesquise, descubra e navegue por categoria.',

    'explore.search.heading': 'Pesquise na base de dados',
    'explore.search.placeholder':
      'Pesquise tudo sobre Taiwan (pessoas, lugares, cultura, eventos)',
    'explore.search.button': 'Pesquisar',
    'explore.search.random': 'Explorar aleatoriamente',
    'explore.search.randomSubtitle':
      'Jogue os dados — encontre uma história que você não esperava',
    'explore.hotSearches.label': 'Pesquisas populares',
    'explore.hotSearches.term1': 'Semicondutores',
    'explore.hotSearches.term2': 'Mercados noturnos',
    'explore.hotSearches.term3': 'Povos indígenas',
    'explore.hotSearches.term4': 'Incidente de 28 de fevereiro',
    'explore.hotSearches.term5': 'TSMC',
    'explore.hotSearches.term6': 'Chá com pérolas de tapioca',

    'explore.stats.articles': 'artigos',
    'explore.stats.contributors': 'colaboradores',
    'explore.stats.languages': 'idiomas',
    'explore.stats.last30d': 'atualizados nos últimos 30 dias',

    'explore.categories.heading': 'Navegue por categoria',
    'explore.categories.subtitle':
      'Doze áreas, cada uma revelando uma faceta desta ilha.',

    'explore.featured.heading': 'Seleção aprofundada',
    'explore.featured.subtitle':
      'Artigos de nível A — notas de rodapé completas, referências cruzadas e um percurso de pesquisa rastreável.',
    'explore.featured.viewAll': 'Ver toda a seleção →',
    'explore.featured.citations': 'citações',
    'explore.featured.minRead': 'minutos',
    'explore.popular.heading': 'Artigos populares',
    'explore.popular.subtitle': 'Os artigos mais lidos nos últimos 7 dias.',
    'explore.popular.views': 'visualizações',

    'explore.more.heading': 'Outras formas de explorar',
    'explore.more.graph.title': 'Grafo de conhecimento',
    'explore.more.graph.desc':
      'Veja em um grafo direcionado por forças como cada artigo se conecta aos demais.',
    'explore.more.graph.cta': 'Abrir o grafo →',
    'explore.more.map.title': 'Mapa geográfico',
    'explore.more.map.desc':
      'Encontre artigos de acordo com sua localização na ilha.',
    'explore.more.map.cta': 'Abrir o mapa →',
    'explore.more.terminology.title': 'Glossário comparativo',
    'explore.more.terminology.desc':
      'Uma referência rápida dos termos usados em toda a base de conhecimento.',
    'explore.more.terminology.cta': 'Abrir o glossário →',

    'explore.cta.heading': 'Não encontrou o que procurava?',
    'explore.cta.body':
      'Taiwan.md é de código aberto — qualquer pessoa pode contribuir com um artigo, corrigir um fato ou traduzir uma página.',
    'explore.cta.contribute': 'Contribuir com um artigo',
    'explore.cta.github': 'Navegar no GitHub',
  },
  hi: {
    'explore.meta.title':
      'Taiwan.md खोजें — ताइवान के खुले ज्ञानकोश को ब्राउज़ करें',
    'explore.meta.description':
      'ताइवान पर 1156+ क्यूरेटेड लेख ब्राउज़ करें: इतिहास, भूगोल, संस्कृति, खान-पान, कला, संगीत, प्रौद्योगिकी, प्रकृति, व्यक्तित्व, समाज, अर्थव्यवस्था और जीवन। खोजें, जानें, अन्वेषण करें।',

    'explore.hero.eyebrow': 'ज्ञानकोश',
    'explore.hero.title': 'Taiwan.md खोजें',
    'explore.hero.subtitle':
      'द्वीप की गहन क्यूरेटेड कथाएँ — खोजें, जानें और श्रेणी के अनुसार ब्राउज़ करें।',

    'explore.search.heading': 'डेटाबेस खोजें',
    'explore.search.placeholder':
      'ताइवान से जुड़ी हर चीज़ खोजें (लोग, स्थान, संस्कृति, घटनाएँ)',
    'explore.search.button': 'खोजें',
    'explore.search.random': 'अचानक कुछ खोजें',
    'explore.search.randomSubtitle':
      'पासा फेंकें — किसी अनपेक्षित कहानी से मिलें',
    'explore.hotSearches.label': 'लोकप्रिय खोजें',
    'explore.hotSearches.term1': 'सेमीकंडक्टर',
    'explore.hotSearches.term2': 'रात्रि बाज़ार',
    'explore.hotSearches.term3': 'मूल निवासी',
    'explore.hotSearches.term4': '228 घटना',
    'explore.hotSearches.term5': 'TSMC',
    'explore.hotSearches.term6': 'बबल टी',

    'explore.stats.articles': 'लेख',
    'explore.stats.contributors': 'योगदानकर्ता',
    'explore.stats.languages': 'भाषाएँ',
    'explore.stats.last30d': 'पिछले 30 दिनों में अपडेट',

    'explore.categories.heading': 'श्रेणी के अनुसार ब्राउज़ करें',
    'explore.categories.subtitle':
      'बारह क्षेत्र, जिनमें से हर एक इस द्वीप का एक अलग पहलू दिखाता है।',

    'explore.featured.heading': 'गहन चयन',
    'explore.featured.subtitle':
      'श्रेणी A के लेख — संपूर्ण पाद-टिप्पणियाँ, लेखों के बीच संदर्भ और सत्यापन योग्य शोध-क्रम।',
    'explore.featured.viewAll': 'पूरा चयन देखें →',
    'explore.featured.citations': 'संदर्भ',
    'explore.featured.minRead': 'मिनट',
    'explore.popular.heading': 'लोकप्रिय लेख',
    'explore.popular.subtitle': 'पिछले 7 दिनों में सबसे अधिक पढ़े गए लेख।',
    'explore.popular.views': 'व्यू',

    'explore.more.heading': 'खोजने के अन्य तरीके',
    'explore.more.graph.title': 'ज्ञान ग्राफ़',
    'explore.more.graph.desc':
      'फ़ोर्स-डायरेक्टेड ग्राफ़ में देखें कि हर लेख दूसरे लेखों से कैसे जुड़ा है।',
    'explore.more.graph.cta': 'ग्राफ़ खोलें →',
    'explore.more.map.title': 'भौगोलिक मानचित्र',
    'explore.more.map.desc': 'द्वीप पर लेखों के स्थान के अनुसार उन्हें खोजें।',
    'explore.more.map.cta': 'मानचित्र खोलें →',
    'explore.more.terminology.title': 'शब्दावली मिलान',
    'explore.more.terminology.desc':
      'ज्ञानकोश में प्रयुक्त साझा शब्दों की त्वरित संदर्भ-सूची।',
    'explore.more.terminology.cta': 'मिलान-सूची खोलें →',

    'explore.cta.heading': 'मनचाही सामग्री नहीं मिली?',
    'explore.cta.body':
      'Taiwan.md ओपन सोर्स है — कोई भी लेख लिख सकता है, किसी तथ्य को सुधार सकता है या किसी पृष्ठ का अनुवाद कर सकता है।',
    'explore.cta.contribute': 'लेख का योगदान करें',
    'explore.cta.github': 'GitHub पर ब्राउज़ करें',
  },
  ru: {
    'explore.meta.title':
      'Исследуйте Taiwan.md — открытый архив знаний о Тайване',
    'explore.meta.description':
      '1156+ кураторских статей о Тайване: история, география, культура, кухня, искусство, музыка, технологии, природа, личности, общество, экономика, повседневность. Поиск, открытие, исследование.',

    'explore.hero.eyebrow': 'Архив знаний',
    'explore.hero.title': 'Исследуйте Taiwan.md',
    'explore.hero.subtitle':
      'Глубокие нарративы острова — поиск, открытие, навигация по категориям.',

    'explore.search.heading': 'Поиск по архиву',
    'explore.search.placeholder':
      'Ищите всё о Тайване (люди, места, культура, события)',
    'explore.search.button': 'Поиск',
    'explore.search.random': 'Случайное исследование',
    'explore.search.randomSubtitle':
      'Бросьте кубик — откройте историю, о которой вы не думали',
    'explore.hotSearches.label': 'Популярные запросы',
    'explore.hotSearches.term1': 'Полупроводники',
    'explore.hotSearches.term2': 'Ночные рынки',
    'explore.hotSearches.term3': 'Коренные народы',
    'explore.hotSearches.term4': '228',
    'explore.hotSearches.term5': 'TSMC',
    'explore.hotSearches.term6': 'Жемчужный чай',

    'explore.stats.articles': 'статей',
    'explore.stats.contributors': 'авторов',
    'explore.stats.languages': 'языков',
    'explore.stats.last30d': 'обновлено за последние 30 дней',

    'explore.categories.heading': 'Навигация по категориям',
    'explore.categories.subtitle':
      'Двенадцать сфер, каждая из которых отражает грант этого острова.',

    'explore.featured.heading': 'Избранное',
    'explore.featured.subtitle':
      'Статьи высшего класса — полные сноски, перекрёстные ссылки, прослеживаемая исследовательская траектория.',
    'explore.featured.viewAll': 'Смотреть все избранные →',
    'explore.featured.citations': 'Цитирований',
    'explore.featured.minRead': 'минут',
    'explore.popular.heading': 'Популярные статьи',
    'explore.popular.subtitle': 'Самые читаемые за последние 7 дней.',
    'explore.popular.views': 'Просмотров',

    'explore.more.heading': 'Другие способы исследования',
    'explore.more.graph.title': 'Граф знаний',
    'explore.more.graph.desc':
      'Визуализируйте, как каждая статья связана с другими через ориентированный граф.',
    'explore.more.graph.cta': 'Открыть граф →',
    'explore.more.map.title': 'Географическая карта',
    'explore.more.map.desc': 'Находите статьи по их расположению на острове.',
    'explore.more.map.cta': 'Открыть карту →',
    'explore.more.terminology.title': 'Словарь терминов',
    'explore.more.terminology.desc':
      'Быстрый справочник по общим терминам архива.',
    'explore.more.terminology.cta': 'Открыть словарь →',

    'explore.cta.heading': 'Не нашли нужное?',
    'explore.cta.body':
      'Taiwan.md — проект с открытым исходным кодом — любой может внести статью, исправить факт или перевести страницу.',
    'explore.cta.contribute': 'Внести вклад',
    'explore.cta.github': 'Посмотреть на GitHub',
  },
  ar: {
    'explore.meta.title':
      'استكشف Taiwan.md — تصفح قاعدة المعرفة التايوانية المفتوحة',
    'explore.meta.description':
      'تصفح أكثر من 1156 مقالًا تايوانيًا مختارًا: التاريخ، الجغرافيا، الثقافة، المأكولات، الفنون، الموسيقى، التكنولوجيا، الطبيعة، الشخصيات، المجتمع، الاقتصاد، الحياة. ابحث، اكتشف، استكشف.',

    'explore.hero.eyebrow': 'قاعدة المعرفة',
    'explore.hero.title': 'استكشف Taiwan.md',
    'explore.hero.subtitle':
      'سرديات عميقة لجزيرة — ابحث، اكتشف، تصفح حسب التصنيف.',

    'explore.search.heading': 'البحث في قاعدة البيانات',
    'explore.search.placeholder':
      'ابحث عن كل شيء في تايوان (أشخاص، أماكن، ثقافة، أحداث)',
    'explore.search.button': 'بحث',
    'explore.search.random': 'استكشاف عشوائي',
    'explore.search.randomSubtitle': 'ارمي النرد — اكتشف قصة لم تكن تتوقعها',
    'explore.hotSearches.label': 'البحث الشائع',
    'explore.hotSearches.term1': 'أشباه الموصلات',
    'explore.hotSearches.term2': 'أسواق ليلية',
    'explore.hotSearches.term3': 'السكان الأصليون',
    'explore.hotSearches.term4': '28 فبراير',
    'explore.hotSearches.term5': 'TSMC',
    'explore.hotSearches.term6': 'شاي اللؤلؤ',

    'explore.stats.articles': 'مقال',
    'explore.stats.contributors': 'مساهم',
    'explore.stats.languages': 'لغة',
    'explore.stats.last30d': 'تم التحديث خلال آخر 30 يومًا',

    'explore.categories.heading': 'تصفح حسب التصنيف',
    'explore.categories.subtitle': 'اثنا عشر مجالًا، كل منها وجه لجزيرة.',

    'explore.featured.heading': 'مختارات عميقة',
    'explore.featured.subtitle':
      'مقالات من الفئة A — هوامش كاملة، اقتباسات متقاطعة، مسارات بحثية قابلة للتتبع.',
    'explore.featured.viewAll': 'عرض كل المختارات →',
    'explore.featured.citations': 'اقتباسات',
    'explore.featured.minRead': 'دقيقة',
    'explore.popular.heading': 'المقالات الشائعة',
    'explore.popular.subtitle': 'المقالات الأكثر قراءة خلال آخر 7 أيام.',
    'explore.popular.views': 'مشاهدة',

    'explore.more.heading': 'طرق أخرى للاستكشاف',
    'explore.more.graph.title': 'مخطط المعرفة',
    'explore.more.graph.desc':
      'استكشف كيف ترتبط كل مقالات ببعضها البعض من خلال الرسم البياني.',
    'explore.more.graph.cta': 'افتح المخطط →',
    'explore.more.map.title': 'الخريطة الجغرافية',
    'explore.more.map.desc': 'ابحث بناءً على موقع المقال على الجزيرة.',
    'explore.more.map.cta': 'افتح الخريطة →',
    'explore.more.terminology.title': 'مقارنة المصطلحات',
    'explore.more.terminology.desc':
      'جدول مرجعي سريع للمصطلحات المشتركة في قاعدة المعرفة.',
    'explore.more.terminology.cta': 'افتح جدول المقارنة →',

    'explore.cta.heading': 'لم تجد ما تبحث عنه؟',
    'explore.cta.body':
      'Taiwan.md مفتوحة المصدر — يمكن لأي شخص المساهمة بمقال، تصحيح حقيقة، أو ترجمة صفحة.',
    'explore.cta.contribute': 'ساهم بمقال',
    'explore.cta.github': 'تصفح على GitHub',
  },
  de: {
    'explore.meta.title':
      'Taiwan.md erkunden — die offene Wissensdatenbank über Taiwan durchstöbern',
    'explore.meta.description':
      'Durchstöbere 1156+ kuratierte Artikel über Taiwan: Geschichte, Geografie, Kultur, Essen, Kunst, Musik, Technologie, Natur, Menschen, Gesellschaft, Wirtschaft und Alltag. Suchen, entdecken, erkunden.',

    'explore.hero.eyebrow': 'Wissensdatenbank',
    'explore.hero.title': 'Taiwan.md erkunden',
    'explore.hero.subtitle':
      'Fundierte Geschichten einer kuratierten Insel — suchen, entdecken und nach Kategorien stöbern.',

    'explore.search.heading': 'Wissensdatenbank durchsuchen',
    'explore.search.placeholder':
      'Alles über Taiwan suchen (Menschen, Orte, Kultur, Ereignisse)',
    'explore.search.button': 'Suchen',
    'explore.search.random': 'Zufällig erkunden',
    'explore.search.randomSubtitle':
      'Würfle — und entdecke eine Geschichte, mit der du nicht gerechnet hast',
    'explore.hotSearches.label': 'Beliebte Suchbegriffe',
    'explore.hotSearches.term1': 'Halbleiter',
    'explore.hotSearches.term2': 'Nachtmärkte',
    'explore.hotSearches.term3': 'Indigene Völker',
    'explore.hotSearches.term4': 'Zwischenfall vom 28. Februar',
    'explore.hotSearches.term5': 'TSMC',
    'explore.hotSearches.term6': 'Bubble Tea',

    'explore.stats.articles': 'Artikel',
    'explore.stats.contributors': 'Mitwirkende',
    'explore.stats.languages': 'Sprachen',
    'explore.stats.last30d': 'In den letzten 30 Tagen aktualisiert',

    'explore.categories.heading': 'Nach Kategorien stöbern',
    'explore.categories.subtitle':
      'Zwölf Themengebiete, jedes davon zeigt eine andere Facette dieser Insel.',

    'explore.featured.heading': 'Ausgewählte vertiefende Artikel',
    'explore.featured.subtitle':
      'Artikel der Stufe A — vollständige Fußnoten, artikelübergreifende Verweise und nachvollziehbare Recherchewege.',
    'explore.featured.viewAll': 'Alle Empfehlungen ansehen →',
    'explore.featured.citations': 'Quellenangaben',
    'explore.featured.minRead': 'Minuten',
    'explore.popular.heading': 'Beliebte Artikel',
    'explore.popular.subtitle':
      'Die meistgelesenen Artikel der letzten 7 Tage.',
    'explore.popular.views': 'Aufrufe',

    'explore.more.heading': 'Weitere Möglichkeiten zum Erkunden',
    'explore.more.graph.title': 'Wissensgraph',
    'explore.more.graph.desc':
      'Ein kraftgerichteter Graph zeigt, wie die Artikel miteinander verknüpft sind.',
    'explore.more.graph.cta': 'Graph öffnen →',
    'explore.more.map.title': 'Landkarte',
    'explore.more.map.desc':
      'Artikel nach ihrem Standort auf der Insel finden.',
    'explore.more.map.cta': 'Karte öffnen →',
    'explore.more.terminology.title': 'Begriffsübersicht',
    'explore.more.terminology.desc':
      'Ein Nachschlagewerk für die gemeinsamen Begriffe der Wissensdatenbank.',
    'explore.more.terminology.cta': 'Übersicht öffnen →',

    'explore.cta.heading': 'Nicht gefunden, wonach du suchst?',
    'explore.cta.body':
      'Taiwan.md ist Open Source — alle können einen Artikel beitragen, eine Angabe korrigieren oder eine Seite übersetzen.',
    'explore.cta.contribute': 'Artikel beitragen',
    'explore.cta.github': 'Auf GitHub durchstöbern',
  },
  'zh-TW': {
    'explore.meta.title': '探索 Taiwan.md — 瀏覽開放的台灣知識庫',
    'explore.meta.description':
      '瀏覽 1156+ 篇台灣策展文章：歷史、地理、文化、美食、藝術、音樂、科技、自然、人物、社會、經濟、生活。搜尋、發現、探索。',

    'explore.hero.eyebrow': '知識庫',
    'explore.hero.title': '探索 Taiwan.md',
    'explore.hero.subtitle': '策展島嶼的深度敘事 — 搜尋、發現、依分類瀏覽。',

    'explore.search.heading': '搜尋資料庫',
    'explore.search.placeholder': '搜尋台灣的一切（人、地、文化、事件）',
    'explore.search.button': '搜尋',
    'explore.search.random': '隨機探索',
    'explore.search.randomSubtitle': '擲一把骰子 — 遇見一個你沒想到的故事',
    'explore.hotSearches.label': '熱門搜尋',
    'explore.hotSearches.term1': '半導體',
    'explore.hotSearches.term2': '夜市',
    'explore.hotSearches.term3': '原住民',
    'explore.hotSearches.term4': '二二八',
    'explore.hotSearches.term5': '台積電',
    'explore.hotSearches.term6': '珍珠奶茶',

    'explore.stats.articles': '篇文章',
    'explore.stats.contributors': '位貢獻者',
    'explore.stats.languages': '種語言',
    'explore.stats.last30d': '近 30 天更新',

    'explore.categories.heading': '依分類瀏覽',
    'explore.categories.subtitle': '十二個領域，每個都是這座島嶼的一個切面。',

    'explore.featured.heading': '深度精選',
    'explore.featured.subtitle':
      'A 級文章 — 完整腳註、跨篇引用、可追溯的研究軌跡。',
    'explore.featured.viewAll': '看完整精選 →',
    'explore.featured.citations': '引用',
    'explore.featured.minRead': '分鐘',
    'explore.popular.heading': '熱門文章',
    'explore.popular.subtitle': '近 7 天最多人讀的文章。',
    'explore.popular.views': '瀏覽',

    'explore.more.heading': '其他探索方式',
    'explore.more.graph.title': '知識圖譜',
    'explore.more.graph.desc': '用力導向圖看每篇文章如何彼此連結。',
    'explore.more.graph.cta': '打開圖譜 →',
    'explore.more.map.title': '地理地圖',
    'explore.more.map.desc': '依文章在島上的位置查找。',
    'explore.more.map.cta': '打開地圖 →',
    'explore.more.terminology.title': '名詞對照',
    'explore.more.terminology.desc': '知識庫共用名詞的速查表。',
    'explore.more.terminology.cta': '打開對照表 →',

    'explore.cta.heading': '找不到想看的？',
    'explore.cta.body':
      'Taiwan.md 是開源的 — 任何人都可以貢獻一篇文章、修一個事實，或翻譯一頁。',
    'explore.cta.contribute': '貢獻一篇',
    'explore.cta.github': '在 GitHub 上瀏覽',
  },
  es: {
    'explore.meta.title':
      'Explora Taiwan.md — Navega la base de conocimiento abierta',
    'explore.meta.description':
      'Navega 1156+ artículos curados sobre Taiwán: historia, geografía, cultura, gastronomía, arte, música, tecnología, naturaleza, personas, sociedad, economía y estilo de vida. Busca, descubre, explora.',

    'explore.hero.eyebrow': 'CENTRO DE CONOCIMIENTO',
    'explore.hero.title': 'Explora Taiwan.md',
    'explore.hero.subtitle':
      'Narrativas profundas y curadas sobre Taiwán — busca, descubre o navega por categoría.',

    'explore.search.heading': 'Buscar en la base de datos',
    'explore.search.placeholder': 'Busca Taiwán — personas, lugares, eventos…',
    'explore.search.button': 'Buscar',
    'explore.search.random': 'Descubrimiento aleatorio',
    'explore.search.randomSubtitle':
      'Tira el dado — encuentra una historia que no sabías que buscabas',
    'explore.hotSearches.label': 'Tendencias',
    'explore.hotSearches.term1': 'Semiconductores',
    'explore.hotSearches.term2': 'Mercados nocturnos',
    'explore.hotSearches.term3': 'Pueblos indígenas',
    'explore.hotSearches.term4': 'Incidente 228',
    'explore.hotSearches.term5': 'TSMC',
    'explore.hotSearches.term6': 'Té de burbujas',

    'explore.stats.articles': 'artículos',
    'explore.stats.contributors': 'colaboradores',
    'explore.stats.languages': 'idiomas',
    'explore.stats.last30d': 'actualizaciones / 30 d',

    'explore.categories.heading': 'Navegar por categoría',
    'explore.categories.subtitle':
      'Doce dominios, cada uno con su propio ángulo curado sobre la isla.',

    'explore.featured.heading': 'Artículos destacados en profundidad',
    'explore.featured.subtitle':
      'Artículos de grado A con citas extensivas y referencias cruzadas.',
    'explore.featured.viewAll': 'Ver todos los destacados →',
    'explore.featured.citations': 'citas',
    'explore.featured.minRead': 'min',
    'explore.popular.heading': 'Lo más leído',
    'explore.popular.subtitle':
      'Los artículos más leídos en los últimos 7 días.',
    'explore.popular.views': 'vistas',

    'explore.more.heading': 'Más formas de explorar',
    'explore.more.graph.title': 'Grafo de conocimiento',
    'explore.more.graph.desc':
      'Mira cómo se conecta cada artículo en una visualización por fuerzas.',
    'explore.more.graph.cta': 'Abrir el grafo →',
    'explore.more.map.title': 'Mapa geográfico',
    'explore.more.map.desc': 'Encuentra artículos por su ubicación en la isla.',
    'explore.more.map.cta': 'Abrir el mapa →',
    'explore.more.terminology.title': 'Glosario',
    'explore.more.terminology.desc':
      'Referencia rápida de términos usados en toda la base de conocimiento.',
    'explore.more.terminology.cta': 'Abrir el glosario →',

    'explore.cta.heading': '¿No encuentras lo que buscas?',
    'explore.cta.body':
      'Taiwan.md es de código abierto — cualquiera puede contribuir con un artículo, corregir un dato o traducir una página.',
    'explore.cta.contribute': 'Contribuye un artículo',
    'explore.cta.github': 'Ver en GitHub',
  },
  fr: {
    'explore.meta.title':
      'Explorer Taiwan.md — Parcourir la base de connaissances ouverte',
    'explore.meta.description':
      'Parcourez 1156+ articles curatés sur Taïwan : histoire, géographie, culture, cuisine, art, musique, technologie, nature, personnalités, société, économie et mode de vie. Cherchez, découvrez, explorez.',

    'explore.hero.eyebrow': 'CENTRE DE CONNAISSANCES',
    'explore.hero.title': 'Explorer Taiwan.md',
    'explore.hero.subtitle':
      'Récits longs et curatés sur Taïwan — cherchez, découvrez, ou parcourez par catégorie.',

    'explore.search.heading': 'Rechercher dans la base',
    'explore.search.placeholder':
      'Cherchez Taïwan — personnes, lieux, événements…',
    'explore.search.button': 'Rechercher',
    'explore.search.random': 'Découverte aléatoire',
    'explore.search.randomSubtitle':
      'Lancez le dé — trouvez une histoire que vous ne cherchiez pas',
    'explore.hotSearches.label': 'Tendances',
    'explore.hotSearches.term1': 'Semi-conducteurs',
    'explore.hotSearches.term2': 'Marchés de nuit',
    'explore.hotSearches.term3': 'Peuples autochtones',
    'explore.hotSearches.term4': 'Incident 228',
    'explore.hotSearches.term5': 'TSMC',
    'explore.hotSearches.term6': 'Bubble tea',

    'explore.stats.articles': 'articles',
    'explore.stats.contributors': 'contributeurs',
    'explore.stats.languages': 'langues',
    'explore.stats.last30d': 'mises à jour / 30 j',

    'explore.categories.heading': 'Parcourir par catégorie',
    'explore.categories.subtitle':
      'Douze domaines, chacun avec son angle curaté sur l’île.',

    'explore.featured.heading': 'Articles de fond mis en avant',
    'explore.featured.subtitle':
      'Articles de niveau A avec citations abondantes et renvois croisés.',
    'explore.featured.viewAll': 'Voir tous les articles en avant →',
    'explore.featured.citations': 'citations',
    'explore.featured.minRead': 'min',
    'explore.popular.heading': 'Les plus lus',
    'explore.popular.subtitle':
      'Les articles les plus lus ces 7 derniers jours.',
    'explore.popular.views': 'vues',

    'explore.more.heading': 'Autres façons d’explorer',
    'explore.more.graph.title': 'Graphe de connaissances',
    'explore.more.graph.desc':
      'Voir comment chaque article se connecte dans une visualisation par forces.',
    'explore.more.graph.cta': 'Ouvrir le graphe →',
    'explore.more.map.title': 'Carte géographique',
    'explore.more.map.desc':
      'Trouvez des articles par leur localisation sur l’île.',
    'explore.more.map.cta': 'Ouvrir la carte →',
    'explore.more.terminology.title': 'Terminologie',
    'explore.more.terminology.desc':
      'Référence rapide pour les termes utilisés dans toute la base.',
    'explore.more.terminology.cta': 'Ouvrir le glossaire →',

    'explore.cta.heading': 'Vous ne trouvez pas ce que vous cherchez ?',
    'explore.cta.body':
      'Taiwan.md est en open source — n’importe qui peut contribuer un article, corriger un fait, ou traduire une page.',
    'explore.cta.contribute': 'Contribuer un article',
    'explore.cta.github': 'Voir sur GitHub',
  },
} as const;
