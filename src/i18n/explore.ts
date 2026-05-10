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
      'Browse 685+ curated articles about Taiwan: history, geography, culture, food, art, music, technology, nature, people, society, economy, and lifestyle. Search, discover, and explore.',

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
      '台湾に関する 685+ 本のキュレーション記事を閲覧。歴史・地理・文化・グルメ・アート・音楽・テクノロジー・自然・人物・社会・経済・暮らし — 検索して、発見して、探索する。',

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
      '대만에 관한 685+ 큐레이션 기사 둘러보기: 역사·지리·문화·음식·예술·음악·기술·자연·인물·사회·경제·생활. 검색하고, 발견하고, 탐색하세요.',

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
  'zh-TW': {
    'explore.meta.title': '探索 Taiwan.md — 瀏覽開放的台灣知識庫',
    'explore.meta.description':
      '瀏覽 685+ 篇台灣策展文章：歷史、地理、文化、美食、藝術、音樂、科技、自然、人物、社會、經濟、生活。搜尋、發現、探索。',

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
      'Navega 685+ artículos curados sobre Taiwán: historia, geografía, cultura, gastronomía, arte, música, tecnología, naturaleza, personas, sociedad, economía y estilo de vida. Busca, descubre, explora.',

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
      'Parcourez 685+ articles curatés sur Taïwan : histoire, géographie, culture, cuisine, art, musique, technologie, nature, personnalités, société, économie et mode de vie. Cherchez, découvrez, explorez.',

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
