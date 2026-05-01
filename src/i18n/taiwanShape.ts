export const taiwanShapeUI = {
  en: {
    // Meta
    'taiwanShape.meta.title':
      "Taiwan's Shape — Open-Source Maps, SVG, GeoJSON & TopoJSON Data",
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
    'taiwanShape.geo.townsHeading': 'Township-level (6 special municipalities)',
    'taiwanShape.geo.townsDesc':
      "We bundle the 6 special municipalities' township-level files. For the other 16 counties, see the source repository on GitHub.",

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
    'taiwanShape.download.svg': 'Download SVG',
    'taiwanShape.download.topo': 'Download TopoJSON',
    'taiwanShape.download.all': 'Download all (ZIP)',
    'taiwanShape.copy.button': 'Copy SVG',
    'taiwanShape.copy.copied': '✓ Copied',
  },

  'zh-TW': {
    // Meta
    'taiwanShape.meta.title':
      '台灣的形狀 — 開源地圖資料集：SVG、GeoJSON、TopoJSON',
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
    'taiwanShape.geo.townsHeading': '六都鄉鎮級資料',
    'taiwanShape.geo.townsDesc':
      '我們打包了六都的鄉鎮級 TopoJSON 檔案。其他 16 個縣市的檔案請到原始 GitHub repo 下載。',

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

    'taiwanShape.download.svg': '下載 SVG',
    'taiwanShape.download.topo': '下載 TopoJSON',
    'taiwanShape.download.all': '下載全部（ZIP）',
    'taiwanShape.copy.button': '複製 SVG',
    'taiwanShape.copy.copied': '✓ 已複製',
  },

  ja: {
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
    'taiwanShape.geo.townsHeading': '六直轄市の町丁目レベル',
    'taiwanShape.geo.townsDesc':
      '台北、新北、桃園、台中、台南、高雄の六直轄市の町丁目レベル TopoJSON を同梱しています。他の 16 県市は GitHub リポジトリをご覧ください。',

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

    'taiwanShape.download.svg': 'SVG をダウンロード',
    'taiwanShape.download.topo': 'TopoJSON をダウンロード',
    'taiwanShape.download.all': 'すべてダウンロード（ZIP）',
    'taiwanShape.copy.button': 'SVG をコピー',
    'taiwanShape.copy.copied': '✓ コピーしました',
  },

  ko: {
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
    'taiwanShape.geo.townsHeading': '6대 직할시 향진 수준 데이터',
    'taiwanShape.geo.townsDesc':
      '6대 직할시(타이베이, 신베이, 타오위안, 타이중, 타이난, 가오슝)의 향진 수준 TopoJSON 파일을 번들로 제공합니다. 나머지 16개 현시는 원본 GitHub 저장소를 참고하세요.',

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

    'taiwanShape.download.svg': 'SVG 다운로드',
    'taiwanShape.download.topo': 'TopoJSON 다운로드',
    'taiwanShape.download.all': '전체 다운로드 (ZIP)',
    'taiwanShape.copy.button': 'SVG 복사',
    'taiwanShape.copy.copied': '✓ 복사됨',
  },
  fr: {
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
    'taiwanShape.geo.townsHeading': 'Niveau canton (6 municipalités spéciales)',
    'taiwanShape.geo.townsDesc':
      'Nous fournissons les fichiers au niveau canton pour les 6 municipalités spéciales. Pour les 16 autres comtés, consultez le dépôt source sur GitHub.',
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
    'taiwanShape.download.svg': 'Télécharger le SVG',
    'taiwanShape.download.topo': 'Télécharger le TopoJSON',
    'taiwanShape.download.all': 'Tout télécharger (ZIP)',
    'taiwanShape.copy.button': 'Copier le SVG',
    'taiwanShape.copy.copied': '✓ Copié',
  },
  es: {
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
      'Nivel de municipio (6 municipios especiales)',
    'taiwanShape.geo.townsDesc':
      'Incluimos los archivos a nivel de municipio de los 6 municipios especiales. Para los otros 16 condados, consulta el repositorio de origen en GitHub.',
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
    'taiwanShape.download.svg': 'Descargar SVG',
    'taiwanShape.download.topo': 'Descargar TopoJSON',
    'taiwanShape.download.all': 'Descargar todo (ZIP)',
    'taiwanShape.copy.button': 'Copiar SVG',
    'taiwanShape.copy.copied': '✓ Copiado',
  },
} as const;
