export const mapUI = {
  en: {
    // Meta
    'map.meta.title': 'Explore Taiwan by Map: Click a County, Read Its Stories',
    'map.meta.description':
      'Click a county or a place on the map to read the Taiwan.md articles about it. Filter by region (north, central, south, east, outlying islands) or by topic: food, history, nature, culture and more.',

    // Hero Section
    'map.hero.kicker': 'Map View',
    'map.hero.title': 'Taiwan Map',
    'map.hero.subtitle':
      "Explore Taiwan's culture, cuisine, nature, and history through an interactive map.",

    // Controls - Region Filter
    'map.controls.region.title': 'Region Filter',
    'map.controls.region.all': 'All',
    'map.controls.region.north': 'North',
    'map.controls.region.central': 'Central',
    'map.controls.region.south': 'South',
    'map.controls.region.east': 'East',
    'map.controls.region.islands': 'Islands',

    // Controls - Category Filter
    'map.controls.category.title': 'Category Filter',
    'map.controls.category.all': 'All',
    'map.controls.category.food': '🍜 Food',
    'map.controls.category.history': '📜 History',
    'map.controls.category.nature': '🌿 Nature',
    'map.controls.category.culture': '🎭 Culture',
    'map.controls.category.technology': '💻 Technology',
    'map.controls.category.economy': '📈 Economy',
    'map.controls.category.lifestyle': '🏮 Lifestyle',
    'map.controls.category.art': '🎨 Art',
    'map.controls.category.geography': '🗺️ Geography',

    // Route Section
    'map.route.title': '🗺️ Curated Routes',
    'map.route.normal-mode': 'Normal Mode',

    // Sidebar - Default
    'map.sidebar.default.title': '📍 Explore Taiwan Articles',
    'map.sidebar.default.hint':
      'Click on counties or markers on the map to explore articles',

    // Sidebar - County
    'map.sidebar.county.clear': '✕ Clear Selection',
    'map.sidebar.county.articles-count': 'articles',
    'map.sidebar.county.no-articles': 'No articles in this region yet',

    // Sidebar - Article
    'map.sidebar.article.back': '← Back',
    'map.sidebar.article.read-more': 'Read More →',

    // Zoom Controls
    'map.zoom.in': '＋',
    'map.zoom.out': '－',
    'map.zoom.reset': '⌂',

    // Tooltips
    'map.tooltip.county.articles': 'related articles',
    'map.tooltip.county.click': 'Click to filter this region',
    'map.tooltip.marker.reading-time': 'min read',

    // Panel (for simpler English version compatibility)
    'map.panel.title': 'Taiwan Knowledge Map',
    'map.panel.stat.points': 'Knowledge Points',
    'map.panel.stat.categories': 'Categories',
    'map.panel.category-distribution': 'Category Distribution',
    'map.panel.link.graph': '🕸️ Knowledge Graph',
    'map.panel.link.home': '🏠 Category Hubs',

    // Category Names (for JS usage)
    'map.category.history': '📜 History',
    'map.category.geography': '🗺️ Geography',
    'map.category.culture': '🎭 Culture',
    'map.category.food': '🍜 Food',
    'map.category.art': '🎨 Art',
    'map.category.music': '🎵 Music',
    'map.category.technology': '💻 Technology',
    'map.category.nature': '🌿 Nature',
    'map.category.people': '👥 People',
    'map.category.society': '⚖️ Society',
    'map.category.economy': '📈 Economy',
    'map.category.lifestyle': '🏮 Lifestyle',

    // Additional UI text
    'map.sidebar.more-articles': '⋯and',
    'map.sidebar.more-articles-suffix': 'more',

    // Routes
    'map.routes.nightMarkets.name': '🍜 Night Market Tour',
    'map.routes.nightMarkets.description':
      "From north to south, Taiwan's most iconic night market culture",
    'map.routes.nationalParks.name': '🏔️ National Parks',
    'map.routes.nationalParks.description':
      "From 3,952m peaks to tropical coral reefs, Taiwan's natural wonders",
    'map.routes.historyTrail.name': '📜 History Trail',
    'map.routes.historyTrail.description':
      'From Dutch colonization to democratization, walking through 400 years of Taiwan',
    'map.routes.oldStreets.name': '🏮 Old Street Walk',
    'map.routes.oldStreets.description':
      'Taiwanese memories in century-old streets, architecture as history',

    'map.routes.counties22.name': '📍 22 Counties Deep Dive',
    'map.routes.counties22.description':
      'Walk through Taiwan.md’s 22 county deep-dives — one core contradiction per place, from Keelung pilot to New Taipei finale.',
    'map.counties22.panel.title': '📍 22 Counties Deep Dive',
    'map.counties22.panel.hint':
      'Open a county card here, or click a county on the map',
    'map.counties22.tooltip.openDeep': 'Click to open deep-dive article',
    'map.counties22.deepCard.badge': '📖 22 Counties Series · Deep Dive',
    'map.counties22.deepCard.cta': 'Read full article →',

    // Night Markets Stops
    'map.stops.shilinNightMarket.name': 'Shilin Night Market',
    'map.stops.shilinNightMarket.note':
      "Taiwan's largest tourist night market, birthplace of the big pancake wrapped with small pancake",
    'map.stops.raoheNightMarket.name': 'Raohe Night Market',
    'map.stops.raoheNightMarket.note':
      'Pepper bun queuing destination, local favorite of Taipei residents',
    'map.stops.ningxiaNightMarket.name': 'Ningxia Night Market',
    'map.stops.ningxiaNightMarket.note':
      'Highest food density, Michelin-recommended street food',
    'map.stops.fengjiaNightMarket.name': 'Fengjia Night Market',
    'map.stops.fengjiaNightMarket.note':
      'Creative snack laboratory, frontline of Taiwan night market innovation',
    'map.stops.huayuanNightMarket.name': 'Garden Night Market',
    'map.stops.huayuanNightMarket.note':
      "Tainan's largest night market, limited carnival only open three days a week",
    'map.stops.liuheNightMarket.name': 'Liuhe Night Market',
    'map.stops.liuheNightMarket.note':
      'Kaohsiung landmark night market, seafood is the star here',

    // National Parks Stops
    'map.stops.yangmingshanNationalPark.name': 'Yangmingshan National Park',
    'map.stops.yangmingshanNationalPark.note':
      "Taipei's backyard garden, volcanic terrain and hot spring paradise",
    'map.stops.tarokoNationalPark.name': 'Taroko National Park',
    'map.stops.tarokoNationalPark.note':
      'Marble gorge, world-class geological wonder',
    'map.stops.yushanNationalPark.name': 'Yushan National Park',
    'map.stops.yushanNationalPark.note':
      "Northeast Asia's highest peak (3,952m), the roof of Taiwan",
    'map.stops.alishanScenicArea.name': 'Alishan Scenic Area',
    'map.stops.alishanScenicArea.note':
      'Sunrise sea of clouds, sacred trees and forest railway',
    'map.stops.sunMoonLakeScenicArea.name': 'Sun Moon Lake Scenic Area',
    'map.stops.sunMoonLakeScenicArea.note':
      "Taiwan's largest natural lake, sacred lake of the Thao people",
    'map.stops.kentingNationalPark.name': 'Kenting National Park',
    'map.stops.kentingNationalPark.note':
      "Taiwan's southernmost point, tropical coral reefs and Hengchun Peninsula",

    // History Trail Stops
    'map.stops.anpingFort.name': 'Anping Fort',
    'map.stops.anpingFort.note':
      "Built by the Dutch in 1624, Taiwan's earliest fortress",
    'map.stops.chikanTower.name': 'Chikan Tower',
    'map.stops.chikanTower.note':
      "From Dutch Provintia to symbol of Koxinga's rule",
    'map.stops.lukang.name': 'Lukang',
    'map.stops.lukang.note':
      'Qing Dynasty\'s second largest city in Taiwan, "One Fu, Two Lu, Three Mengka"',
    'map.stops.presidentialOffice.name':
      "Presidential Office (former Taiwan Governor-General's Office)",
    'map.stops.presidentialOffice.note':
      'Completed in 1919, highest authority center during Japanese colonial period',
    'map.stops.chiangKaiShekMemorialHall.name': 'Chiang Kai-shek Memorial Hall',
    'map.stops.chiangKaiShekMemorialHall.note':
      'Symbol of authoritarianism and focus of transitional justice debate',
    'map.stops.legislativeYuan.name': 'Legislative Yuan (Sunflower Movement)',
    'map.stops.legislativeYuan.note':
      '2014 Sunflower Movement site, milestone of Taiwan democracy',

    // Old Streets Stops
    'map.stops.dihuaStreet.name': 'Dihua Street',
    'map.stops.dihuaStreet.note':
      'Heart of Dadaocheng, dry goods and New Year street',
    'map.stops.jiufenOldStreet.name': 'Jiufen Old Street',
    'map.stops.jiufenOldStreet.note':
      'Golden age of mining and inspiration for Spirited Away',
    'map.stops.lukangOldStreet.name': 'Lukang Old Street',
    'map.stops.lukangOldStreet.note':
      'Red brick traditional houses and traditional crafts living museum',
    'map.stops.anpingOldStreet.name': 'Anping Old Street',
    'map.stops.anpingOldStreet.note':
      "Taiwan's first street, four hundred years of historical layers",
    'map.stops.qishanOldStreet.name': 'Qishan Old Street',
    'map.stops.qishanOldStreet.note':
      "Banana Kingdom's baroque architecture cluster",
    'map.stops.tamsuiOldStreet.name': 'Tamsui Old Street',
    'map.stops.tamsuiOldStreet.note':
      'Sunset, A-gei and historical charm of Tamsui River estuary',

    // Cities
    'map.city.taipei': 'Taipei',
    'map.city.newTaipei': 'New Taipei',
    'map.city.keelung': 'Keelung',
    'map.city.taoyuan': 'Taoyuan',
    'map.city.hsinchu': 'Hsinchu',
    'map.city.miaoli': 'Miaoli',
    'map.city.taichung': 'Taichung',
    'map.city.changhua': 'Changhua',
    'map.city.nantou': 'Nantou',
    'map.city.chiayi': 'Chiayi',
    'map.city.tainan': 'Tainan',
    'map.city.kaohsiung': 'Kaohsiung',
    'map.city.pingtung': 'Pingtung',
    'map.city.yilan': 'Yilan',
    'map.city.hualien': 'Hualien',
    'map.city.taitung': 'Taitung',
    'map.city.penghu': 'Penghu',
    'map.city.kinmen': 'Kinmen',

    // Markers
    'map.markers.founderCheYuWu.title': 'Founder — Che-Yu Wu',
    'map.markers.founderCheYuWu.desc':
      "From code to poetry: A Taiwanese artist's journey to international breakthrough",
    'map.markers.taiwanIndigenousContemporaryArt.title':
      'Taiwan Indigenous Contemporary Art',
    'map.markers.taiwanIndigenousContemporaryArt.desc':
      "From traditional crafts to contemporary creation, explore how Taiwan's Indigenous artists voice their presence on the global art stage, redefining the dialogue between Indigenous identity and contemporary art",
    'map.markers.taiwanExperimentalNewMediaArt.title':
      'Taiwan Experimental and New Media Art',
    'map.markers.taiwanExperimentalNewMediaArt.desc':
      "From video art to VR interactions, explore the innovative development of Taiwan's new media art and its technological art ecosystem",
    'map.markers.taiwanArchitecture.title': 'Taiwan Architecture',
    'map.markers.taiwanArchitecture.desc':
      "From stone slab houses to skyscrapers: An island's architectural journey through time",
    'map.markers.taiwanNewMediaArt.title': 'Taiwan New Media Art',
    'map.markers.taiwanNewMediaArt.desc':
      "Explore Taiwan's culture and stories",
    'map.markers.taiwanWatercolorCenturyEvolution.title':
      'Century of Taiwan Watercolor Evolution',
    'map.markers.taiwanWatercolorCenturyEvolution.desc':
      "From Kinichiro Ishikawa's enlightenment during the Japanese colonial period to contemporary Chien Chung-Wei's international fame, Taiwan watercolor has journeyed through a century to become Asia's most vibrant watercolor creation hub.",
    'map.markers.taiwanModernPoetry.title': 'Taiwan Modern Poetry',
    'map.markers.taiwanModernPoetry.desc':
      'How modernist experiments emerging from three study rooms unexpectedly gave birth to the most nativist poetry revolution',
    'map.markers.taiwanContemporarySculpture.title':
      'Taiwan Contemporary Sculpture Development',
    'map.markers.taiwanContemporarySculpture.desc':
      "From Yuyu Yang and Ju Ming to the new generation, explore the evolutionary trajectory and creative spirit of Taiwan's sculpture art",
    'map.markers.taiwanCuratorsArtCulture.title':
      'Taiwan Curators and Art Culture Construction',
    'map.markers.taiwanCuratorsArtCulture.desc':
      "From independent curation to museum systems, how Taiwan's curators construct contemporary art's cultural discourse and international dialogue",
    'map.markers.newMediaArt.title': 'New Media Art',
    'map.markers.newMediaArt.desc':
      "Taiwan's pioneering exploration of digital art, merging technology and humanities from laboratory to international stage",
    'map.markers.contemporaryTaiwanLiterature.title':
      'Contemporary Taiwan Literature',
    'map.markers.contemporaryTaiwanLiterature.desc':
      "Explore Taiwan's culture and stories",
    'map.markers.taiwanContemporaryArt.title': 'Taiwan Contemporary Art',
    'map.markers.taiwanContemporaryArt.desc':
      "From TFAM to the Taiwan Pavilion at Venice Biennale, Taiwan contemporary art's unique position on the global stage",
    'map.markers.kinmenGuesthouseMuseum.title':
      'Kinmen Guesthouse Museum of Contemporary Art',
    'map.markers.kinmenGuesthouseMuseum.desc':
      "A Cold War military station that witnessed farewell and reunion, dormant for twenty years before being awakened by a father-daughter duo, now Lonely Planet's top choice museum in Kaohsiung.",
    'map.markers.renjianMagazine.title': 'Renjian Magazine',
    'map.markers.renjianMagazine.desc':
      "47 issues, four years, a quiet revolution waged with photography and writing—the starting point of Taiwan's reportage literature",
    'map.markers.taiwanIndigenousCulture.title': 'Taiwan Indigenous Culture',
    'map.markers.taiwanIndigenousCulture.desc':
      "From the diverse traditions of sixteen tribes to contemporary artistic revival, explore the profound depth and modern transformation of Taiwan's Indigenous culture",
    'map.markers.taiwan16IndigenousTribes.title':
      "Taiwan's 16 Indigenous Tribes Cultural Map",
    'map.markers.taiwan16IndigenousTribes.desc':
      "Explore the distribution areas, language systems, important festivals, and contemporary creative developments of Taiwan's 16 Indigenous peoples, understanding the diverse cultural landscape of Taiwan's Indigenous nations",
    'map.markers.taiwanNightMarketCulture.title':
      'Taiwan Night Market Culture and Street Food',
    'map.markers.taiwanNightMarketCulture.desc':
      "Deep dive into the formation background and unique charm of Taiwan's night market culture, along with the historical stories and cultural significance of representative street foods",
    'map.markers.taiwanSensibilityKoreanPerspective.title':
      'Taiwan Sensibility: Taiwan Aesthetics Through Korean Eyes',
    'map.markers.taiwanSensibilityKoreanPerspective.desc':
      'From K-pop MVs to Seoul book fairs, how "대만감성" (Taiwan-gamseong) transforms Taiwan\'s everyday streetscapes into Asia\'s most captivating aesthetic symbol',
    'map.markers.taiwanCulturalCreativeParks.title':
      'Taiwan Cultural and Creative Parks Development',
    'map.markers.taiwanCulturalCreativeParks.desc':
      "From revitalizing old buildings to creative clusters, the development journey and innovative models of Taiwan's cultural and creative parks",
    'map.markers.taiwanOldStreetCulture.title':
      'Taiwan Old Street Culture and Commercial Districts',
    'map.markers.taiwanOldStreetCulture.desc':
      "From Qing Dynasty port prosperity to Japanese-era Baroque buildings, Taiwan's old streets are a common people's history written in brick and tile",
    'map.markers.taiwanTeaCeremonyLifeAesthetics.title':
      'Taiwan Tea Ceremony and Life Aesthetics',
    'map.markers.taiwanTeaCeremonyLifeAesthetics.desc':
      'From Gongfu tea to tea ceremony aesthetics, explore how Taiwan innovatively merges Eastern tea culture with local life aesthetics',
    'map.markers.taiwanStreetArtGraffiti.title':
      'Taiwan Street Art and Graffiti Culture',
    'map.markers.taiwanStreetArtGraffiti.desc':
      "From underground graffiti to legal murals, how city walls became the creative stage for Taiwan's artists",
    'map.markers.taiwanIncenseMakingCulture.title':
      'Taiwan Incense Making Culture and Its Homeland',
    'map.markers.taiwanIncenseMakingCulture.desc':
      "From the century-old incense-making craftsmanship of Chiayi's Yunxiao community to the incense industry spread across Taiwan—an ancient trade about devotion, craftsmanship, and perseverance",
    'map.markers.taiwanHomophoneTaboos.title':
      'Taiwan Homophone Taboo Culture: Why Does "Four" Make Society Skip Floors?',
    'map.markers.taiwanHomophoneTaboos.desc':
      'From hospitals without fourth floors to license plate "8888" selling for astronomical prices, Taiwanese sensitivity to homophones is arguably world-class',
    'map.markers.hakkaCultureLanguage.title': 'Hakka Culture and Language',
    'map.markers.hakkaCultureLanguage.desc':
      "Hard-necked spirit and Sky-Mending Festival: The cultural heritage and modern revival of Taiwan's Hakka people",
    'map.markers.ethnicGroupsTaiwan.title':
      'Ethnic Groups (Hoklo, Hakka, Indigenous, Mainlander, New Immigrants)',
    'map.markers.ethnicGroupsTaiwan.desc':
      "Taiwan's ethnic diversity is not only a result of historical development but also key to understanding contemporary Taiwanese society. This pluralistic coexistence is both the source of Taiwan's cultural creativity and an important foundation for democratic political development. How to build a shared Taiwanese identity while respecting each ethnic group's cultural characteristics remains an important ongoing challenge for Taiwanese society.",
    'map.markers.chinaSteel.title':
      'China Steel: The Iron-headed Minister and the Steel Legend of the Ten Major Construction Projects',
    'map.markers.chinaSteel.desc':
      "From Chao Yao-Tung's shrewd negotiations with Europe and America for technology, to the first plume of white smoke rising from Kaohsiung's Xiaogang, China Steel spent 50 years building the backbone of Taiwan's heavy industry—the most successful jewel of the Ten Major Construction Projects",
    'map.markers.taiwanCement.title':
      "Taiwan Cement: The First Listed Company's Green Transformation Legend",
    'map.markers.taiwanCement.desc':
      "The Taiwan Stock Exchange was born for it in 1962, with stock code 1101 symbolizing the origin of Taiwan stocks. Through three generations of the Koo family's 76-year management, Taiwan Cement witnessed Taiwan's construction miracle with cement kilns, now transforming into a green enterprise to face the carbon-neutral era",
    'map.markers.tsmc.title': 'Taiwan Enterprise: TSMC',
    'map.markers.tsmc.desc':
      'Global semiconductor foundry leader, holding the key lifeline of human digital civilization',
    'map.markers.chimeiCorporation.title':
      "Chi Mei Corporation: Hsu Wen-Long's Acrylic Kingdom and Museum Dream",
    'map.markers.chimeiCorporation.desc':
      "Starting from a small factory in Tainan's Rende in 1960, Hsu Wen-Long spent a lifetime building Asia's largest ABS materials kingdom, and established the Chi Mei Museum to give back to society—proving that Taiwan enterprises can balance commercial success with humanistic care",
    'map.markers.acer.title': 'Acer Group - Pioneer of PC Industry Revolution',
    'map.markers.acer.desc':
      'A personal computer pioneer starting from Taoyuan, Taiwan, creating the "multi-brand, multi-channel" business model to become the engine of global PC industry transformation',
    'map.markers.giantBicycles.title': 'Taiwan Enterprise: Giant Manufacturing',
    'map.markers.giantBicycles.desc':
      'From abandoned OEM slave to hidden empire setting global bicycle technology standards',
    'map.markers.quantaComputer.title': 'Taiwan Enterprise: Quanta Computer',
    'map.markers.quantaComputer.desc':
      'From factory fire to global laptop king, how did Barry Lam build a new empire for the AI era?',
    'map.markers.aseGroup.title': 'Taiwan Enterprise: ASE Group',
    'map.markers.aseGroup.desc':
      "World's largest semiconductor assembly and testing company—why did a construction company boss pivot to semiconductors?",
    'map.markers.esunFinancialHolding.title':
      'Taiwan Enterprise: E.SUN Financial Holding',
    'map.markers.esunFinancialHolding.desc':
      'From credit card specialist bank to digital finance pioneer, the breakthrough story of the youngest financial holding company CEO at age 43',
    'map.markers.changChunPetrochemical.title':
      'Taiwan Enterprise: Chang Chun Petrochemical',
    'map.markers.changChunPetrochemical.desc':
      'From a small Tainan factory in 1949 to global chemical giant, the hidden champion story of "no IPO, no borrowing"',
    'map.markers.formosaPlasticsGroup.title':
      'Taiwan Enterprise: Evergreen Marine',
    'map.markers.formosaPlasticsGroup.desc':
      "From a single used ship to global shipping empire, Chang Yung-fa's blue ocean legend",
    'map.markers.taipeiFubon.title':
      'Night Market Economics: A Commercial Miracle Without Brands',
    'map.markers.taipeiFubon.desc':
      "Explore how Taiwan's night markets create an economic miracle worth nearly NT$400 billion annually without brands, decor, or fixed locations",
    'map.markers.taiwan7Eleven.title': 'Taiwan Coffee Industry',
    'map.markers.taiwan7Eleven.desc':
      "From cultivation origins in the Japanese colonial period to Simple Kaffa's world championship, Taiwan coffee's century of evolution",
    'map.markers.taiwanHighSpeedRail.title': 'Taiwan Local Delicacies Map',
    'map.markers.taiwanHighSpeedRail.desc':
      "From Keelung Miaokou's rice cake rolls to Pingtung Wanluan's pork knuckles, from Hsinchu meatballs to Taitung sugar apples, each city has its unique flavor DNA. Follow local footsteps to explore the most representative local delicacies across Taiwan's 22 counties and cities, savoring the island's most authentic common people's culture.",
    'map.markers.taiwanSemiconductorIndustry.title':
      'Taiwan Home-style Dishes: Vanishing Taste Memories',
    'map.markers.taiwanSemiconductorIndustry.desc':
      "From Chiayi mint chicken to leftover soup, grandma's signature dishes carry family memories but are gradually being lost in the tide of changing times",
    'map.markers.taiwanBankingSystem.title':
      'Taiwan New Immigrant Culinary Fusion',
    'map.markers.taiwanBankingSystem.desc':
      "When Thai sweet-and-sour meets Taiwan's sweet-salty, when Vietnamese pho encounters Taiwanese braised delicacies, when Indonesian spices embrace local ingredients—a cross-border culinary revolution is quietly unfolding in Taiwan. New immigrants bring not only their homeland cuisine but also fresh possibilities for enriching Taiwan's food culture.",
    'map.markers.taiwanSmes.title': 'Taiwan Fruit Kingdom',
    'map.markers.taiwanSmes.desc':
      'From mangoes and lychees to sugar apples and wax apples, the sweet legend of tropical fruit diversity and agricultural technology breakthroughs',
    'map.markers.youbikePublicBikeSystem.title': 'Taiwan Seafood Culture',
    'map.markers.youbikePublicBikeSystem.desc':
      "Fresh direct delivery from fishing ports, seafood restaurant culture, oyster omelets and other maritime delicacies showcase Taiwan's island characteristics surrounded by ocean and rich seafood culinary traditions",
    'map.markers.taiwanFoodBeverageIndustry.title':
      'Taiwan Michelin and Fine Dining',
    'map.markers.taiwanFoodBeverageIndustry.desc':
      "In 2018, the Michelin Guide's red cover first bore the word \"TAIPEI,\" marking Taiwan's food and beverage industry's official entry into the international rating system. From street stalls to Michelin-starred restaurants, from common people's food to refined cuisine, Taiwan's culinary culture displays a captivating blend of tradition and innovation on the international stage.",
    'map.markers.taiwanAgriculturalReform.title': 'Night Market Culture',
    'map.markers.taiwanAgriculturalReform.desc':
      '164 registered night markets, Tainan averages one night market per 38,000 people—from temple squares to international tourist attractions',
    'map.markers.taiwanTeaIndustry.title': 'Hakka Culinary Culture',
    'map.markers.taiwanTeaIndustry.desc':
      "The rich and diverse culinary culture of Hakka people, from the mellow fragrance of lei cha to wild ginger flower rice dumplings' mountain forest essence, demonstrating Hakka people's wisdom of frugality and using local materials",
    'map.markers.taiwanFishingIndustry.title': 'Beef Noodles',
    'map.markers.taiwanFishingIndustry.desc':
      "From mainlander immigrant nostalgia to Taiwan's national dish, beef noodles' cultural fusion and global fragrance",
    'map.markers.taiwanFruitIndustry.title': 'Tea Culture',
    'map.markers.taiwanFruitIndustry.desc':
      "Taiwan's tea culture evolution from traditional tea ceremony to modern bubble tea, showcasing the island's unique tea varieties and tea-drinking culture",
    'map.markers.taiwanRiceVarieties.title':
      'On a Shaking Island, They Built a Tower That Can Fly',
    'map.markers.taiwanRiceVarieties.desc':
      "Only 200 meters from an active fault, Taiwanese insisted on building the world's tallest building on the most unstable land—then a madman spent 91 minutes climbing it with bare hands.",
    'map.markers.nightMarketCulture.title':
      "Taiwan's Five Major Terrains and Geographic Structure: Island Landscape from Mountains to Plains",
    'map.markers.nightMarketCulture.desc':
      "Explore Taiwan's unique geographic structure, from the Central Mountain Range to the western plains, discovering this island's terrain diversity",
    'map.markers.bubbleTeaGlobalPhenomenon.title':
      'Taiwan Transportation Network',
    'map.markers.bubbleTeaGlobalPhenomenon.desc':
      "High-speed rail, MRT, highways, aviation—weaving a three-dimensional transportation network for Taiwan's mobility",
    'map.markers.taiwanBeefNoodle.title': 'Taiwan National Scenic Area System',
    'map.markers.taiwanBeefNoodle.desc':
      "From Northeast Coast to Kenting, Taiwan's 13 national scenic areas showcase rich natural and cultural landscapes",
    'map.markers.taiwanHotPotCulture.title':
      'Taiwan Island Geographic Features and Formation',
    'map.markers.taiwanHotPotCulture.desc':
      "Explore Taiwan's unique island geographic features, from tectonic movements to terrain structure, understanding the natural mysteries of Formosa",
    'map.markers.taiwanFineDining.title':
      'Taiwan Tectonic Movement and Seismic Activity',
    'map.markers.taiwanFineDining.desc':
      "Examining Taiwan's geological characteristics at the junction of the Eurasian Plate and Philippine Sea Plate, and the causes of frequent seismic activity",
    'map.markers.taiwanStreetFood.title':
      'Taiwan Reservoirs and Water Resource Management',
    'map.markers.taiwanStreetFood.desc':
      "From water shortage crises to reservoir sedimentation, Taiwan's water resource challenges and the north-south distribution imbalance dilemma",
    'map.markers.taiwanVegetarianCulture.title':
      'Taiwan River System and Hydrological Features: Short Rapid Flows and Seasonal Changes in Hydrological Geography',
    'map.markers.taiwanVegetarianCulture.desc':
      "Explore Taiwan's unique river system, from Zhuoshui River to Gaoping River, understanding how island terrain shapes Taiwan's hydrological characteristics",
    'map.markers.taiwanCoffeeCulture.title':
      'Taiwan Coastal Terrain and Marine Landscape',
    'map.markers.taiwanCoffeeCulture.desc':
      "From northern cape and bay coasts to eastern fault coasts, Taiwan's rich and varied coastal terrain demonstrates tectonic movement's masterful craftsmanship",
    'map.markers.taiwanSnackCulture.title': 'Taiwan Hot Spring Landscape',
    'map.markers.taiwanSnackCulture.desc':
      'Beitou, Zhiben, Jiaoxi—the beautiful convergence of hot spring culture and geological science',
    'map.markers.taiwanSeafoodCulture.title': 'Taiwan Biodiversity Hotspot',
    'map.markers.taiwanSeafoodCulture.desc':
      'A 36,000 square kilometer island packed with 59,000 species, density 100 times the global average',
    'map.markers.taiwanPineappleCake.title':
      'Taiwan Agricultural Landscape and Industry Distribution',
    'map.markers.taiwanPineappleCake.desc':
      'Agricultural landscape changes from north to south, highlighting Taiwan\'s transformation from "Taiwan Granary" to "Refined Agriculture"',
    'map.markers.taiwanPorkRibSoup.title':
      'Taiwan Urban Development and Urban-Rural Divide',
    'map.markers.taiwanPorkRibSoup.desc':
      'Uneven urban-rural development in Taiwan under the six special municipalities framework, spatial transformation from agricultural Taiwan to urban Taiwan',
    'map.markers.taiwanOysterOmelette.title': 'Terrain and Geology',
    'map.markers.taiwanOysterOmelette.desc':
      "A 6-million-year-old island harboring 200-million-year-old ancient memories—a miracle of the world's youngest mountain belt and most dramatic tectonic collision",
    'map.markers.taiwanBreakfastCulture.title':
      'City Characteristics and Regional Culture',
    'map.markers.taiwanBreakfastCulture.desc':
      "From Taipei's international metropolitan character to Tainan's ancient capital charm, how Taiwan's cities shape unique local identities",
    'map.markers.taiwanConvenienceStoreFood.title':
      "Outlying Islands and Marine Culture: From World's Highest Stone Weir Density to Flying Fish Season Ecological Law",
    'map.markers.taiwanConvenienceStoreFood.desc':
      'Fewer than 600 stone weirs exist worldwide, yet Penghu has 574. An island people specialized in catching flying fish transformed taboos into the most sophisticated marine resource management system',
    'map.markers.dutchSpanishColonialPeriod.title':
      "228 Incident and White Terror: Trauma and Memory Under Taiwan's Authoritarian Rule",
    'map.markers.dutchSpanishColonialPeriod.desc':
      'From the 228 Incident of 1947 to 38 years of martial law, Taiwan experienced state violence under authoritarian rule, only beginning to confront historical trauma and pursue transitional justice after lifting martial law.',
    'map.markers.zhengDynastyPeriod.title':
      'Taiwan Strait Crises and Cross-Strait Relations Development',
    'map.markers.zhengDynastyPeriod.desc':
      'Reviewing three major Taiwan Strait crises and over seventy years of cross-strait relations development, understanding the historical context and contemporary challenges of the Taiwan Strait situation',
    'map.markers.qingDynastyTaiwanHistory.title':
      'Taiwan Maritime Trade History',
    'map.markers.qingDynastyTaiwanHistory.desc':
      'Taiwan in the Age of Exploration, the rise and fall legend from international trade center to pirate kingdom',
    'map.markers.japaneseColonialRule.title':
      "Taiwan Military Dependents' Village History",
    'map.markers.japaneseColonialRule.desc':
      'From Burma\'s lone army to bamboo fence kingdoms, how a 1.2 million migration redefined "home"',
    'map.markers.februaryTwentyEightIncident.title': 'Taiwan Railway History',
    'map.markers.februaryTwentyEightIncident.desc':
      "From Qing Dynasty's Liu Ming-chuan to Japanese-era trunk line to high-speed rail, how railways shaped Taiwan's urban development and cultural memory",
    'map.markers.martialLawPeriod.title':
      'KMT Government Relocation to Taiwan and Post-War Reconstruction',
    'map.markers.martialLawPeriod.desc':
      "Exploring the historical background, process, and impact of the KMT government's 1949 relocation to Taiwan, and post-war Taiwan's political, economic, and social reconstruction",
    'map.markers.democratization.title': 'Japanese Colonial Period',
    'map.markers.democratization.desc':
      "1895-1945: Japan's 50-year rule of Taiwan brought comprehensive modernization and institutionalized management while implementing assimilation policies, profoundly influencing Taiwan's social development",
    'map.markers.taiwanIndependenceMovement.title': 'Qing Dynasty Period',
    'map.markers.taiwanIndependenceMovement.desc':
      "1683-1895: Qing Dynasty ruled Taiwan for approximately 212 years, from passive governance to active construction, establishing the foundation for modern Taiwan's administrative divisions and Han society",
    'map.markers.taiwanChinaRelations.title': 'Dutch-Spanish-Zheng Period',
    'map.markers.taiwanChinaRelations.desc':
      "Taiwan's first systematic colonial rule, from Dutch establishment of Fort Zeelandia to Koxinga's opening of Taiwan, laying the foundation for Han immigration and political institutions",
    'map.markers.taiwanUsRelations.title': 'Convenience Store Culture',
    'map.markers.taiwanUsRelations.desc':
      "Taiwan's convenience stores with world-highest density—how they transformed from retail shops into an entire nation's life operating system",
    'map.markers.taiwanInternationalStatus.title':
      'Taiwan Transportation System',
    'map.markers.taiwanInternationalStatus.desc':
      'High-speed rail traversing north to south in 90 minutes, MRT densely weaving urban arteries, scooters threading through alleyways',
    'map.markers.taiwanHistoricalFigures.title':
      'Taiwan Convenience Store Culture',
    'map.markers.taiwanHistoricalFigures.desc':
      "World's highest density convenience store kingdom, 7-Eleven and FamilyMart's localized innovation redefining modern lifestyle",
    'map.markers.taiwanPoliticalFigures.title':
      'Taiwan Parks and Daily Leisure',
    'map.markers.taiwanPoliticalFigures.desc':
      'From dawn tai chi to evening strolls—cultural observation of Taiwan parks as cross-generational social spaces',
    'map.markers.kuomintangHistory.title': 'Taiwan Coffee Culture',
    'map.markers.kuomintangHistory.desc':
      "World's top-three independent cafe density, from Alishan beans to cafe office work—island coffee studies",
    'map.markers.democraticProgressivePartyHistory.title':
      "The Island That Chases Garbage Trucks: Taiwan's Journey from Garbage Crisis to Recycling Miracle",
    'map.markers.democraticProgressivePartyHistory.desc':
      'A place with 400 nearly-full landfills in the 1990s, called "Garbage Island" by international media, used Beethoven\'s music to make 23 million people chase garbage trucks daily—30 years later, its recycling rate surpasses most European countries',
    'map.markers.taipeiHistory.title':
      'Taiwan MRT Development History: An Urban Evolution Written in Blood and Money',
    'map.markers.taipeiHistory.desc':
      "209 tons of steel beams falling from the sky took 4 lives, NT$1.64 billion in compensation, Taipei MRT's core business still loses money—the real cost behind Taiwan's MRT systems",
    'map.markers.taiwanPrehistoricCulture.title':
      'Taiwan Education System: Island Experiment from Joint Entrance Exam Hell to Multichoice Maze',
    'map.markers.taiwanPrehistoricCulture.desc':
      'Taiwan spent 30 years trying to break the joint entrance exam system, yet the latest subject test doubled cram school enrollments. How does an island repeatedly experiment socially between academic pressure and educational equity?',
    'map.markers.taiwanIndigenousHistory.title': 'Taiwan Scooter Culture',
    'map.markers.taiwanIndigenousHistory.desc':
      'Island kingdom with globally leading motorcycle density, cultural evolution from commute tool to lifestyle',
    'map.markers.taiwanMilitaryHistory.title':
      'Taiwan Arcade Culture and Streetscapes',
    'map.markers.taiwanMilitaryHistory.desc':
      'Life corridors sheltering from wind and rain, Taiwan street memories woven with scooters, street vendors, and human warmth',
    'map.markers.taiwanWomenHistory.title': 'Nightlife and KTV Culture',
    'map.markers.taiwanWomenHistory.desc':
      "From Cashbox private rooms to late-night diners, the island's 24-hour non-stop nightlife",
    'map.markers.taiwanEducationHistory.title':
      'Religion and Folk Beliefs: From Fear Management to Faith Empire',
    'map.markers.taiwanEducationHistory.desc':
      "Taiwan has the world's highest temple density yet ranks first globally in religious freedom—this contradiction hides the survival wisdom of 17th-century military migrants",
    'map.markers.taiwanReligiousHistory.title': 'Hot Spring Culture',
    'map.markers.taiwanReligiousHistory.desc':
      "From military rehabilitation to one of the world's three great mud springs: How Taiwan accidentally became a hot spring kingdom",
    'map.markers.taiwanMediaHistory.title':
      'Taiwan Indigenous Music Traditions',
    'map.markers.taiwanMediaHistory.desc':
      "Explore the rich musical culture of Taiwan's 16 Indigenous peoples, from ancient chanting to traditional instruments, witnessing thousands of years of cultural heritage",
    'map.markers.badmintonChampions.title':
      'Taiwan Musical Instrument Manufacturing: From Houli Saxophones to Global Music Factory',
    'map.markers.badmintonChampions.desc':
      "Explore Taiwan's musical instrument manufacturing development journey, from Houli saxophones' global dominance to guitar OEM kingdom, to music box manufacturing's precision craftsmanship—how Taiwan evolved from OEM to its own brands",
    'map.markers.baseballCulture.title': 'Taiwan Folk Song Movement',
    'map.markers.baseballCulture.desc':
      'From "Sing Our Own Songs" to transforming the entire Mandopop scene—the 1970s cultural revolution that belonged to young people',
    'map.markers.taiwanBasketball.title':
      'Taiwan Independent Music Scene Evolution',
    'map.markers.taiwanBasketball.desc':
      "From underground bands to independent music, explore Taiwan's alternative music thirty-year development trajectory and cultural significance",
    'map.markers.marathonRunning.title':
      'Taiwan Electronic Music and Party Culture: From Underground Rave to International Stage',
    'map.markers.marathonRunning.desc':
      'From 1990s rave party culture to Road to Ultra electronic music festival, how Taiwan electronic music moved from underground to mainstream, nurturing international DJs and independent electronic labels',
    'map.markers.taiwanEsports.title':
      'Taiwan Music Festival Culture: From Spring Scream to Blooming Youth Culture Carriers',
    'map.markers.taiwanEsports.desc':
      "Explore Taiwan's music festival development from Spring Scream, Ocean Music Festival to Megaport Festival, how they became incubators for indie bands and core platforms for youth cultural expression",
    'map.markers.taiwanOlympics.title':
      'Contemporary Taiwan Independent Music Scene',
    'map.markers.taiwanOlympics.desc':
      "From underground performances to industry matrix, analyzing modern Taiwan independent music ecosystem's developmental context and cultural influence",
    'map.markers.taipeiCycle.title':
      'Taiwan Indigenous Ecological Wisdom and Environmental Conservation',
    'map.markers.taipeiCycle.desc':
      "Examining Taiwan Indigenous peoples' thousands of years of accumulated traditional ecological knowledge and its important value and practical methods in modern environmental conservation",
    'map.markers.taiwanBetelNutCulture.title':
      'Taiwan Mountains and Mountaineering Culture',
    'map.markers.taiwanBetelNutCulture.desc':
      '268 mountains over 3,000 meters and the Baiyue culture: Taiwan mountaineering sports development and mountain conservation challenges',
    'map.markers.taiwanElections.title': 'Taiwan Forest Ecosystem',
    'map.markers.taiwanElections.desc':
      "From subtropical coast to alpine coniferous forests, Taiwan's rich forest world within 3,000 meters of vertical drop",
    'map.markers.taiwanLgbtCulture.title':
      'Taiwan Climate Change and Net-Zero Transformation',
    'map.markers.taiwanLgbtCulture.desc':
      'Taiwan faces climate change impacts—from frequent extreme weather to 2050 net-zero carbon emissions policy planning, exploring opportunities and challenges in the energy transition process',
    'map.markers.taiwanMotorcycleCulture.title':
      "Taiwan Marine Conservation: Why Can't a 30-Year System Save Coral Bleaching?",
    'map.markers.taiwanMotorcycleCulture.desc':
      "In 2020, Taiwan's waters experienced the largest coral bleaching in history. From Xiaoliuqiu to Dongsha Atoll, even corals in protected areas died in high temperatures. What problem does this expose?",
    'map.markers.taipeiMrt.title':
      'Taiwan Marine Pollution Control and Conservation Challenges',
    'map.markers.taipeiMrt.desc':
      "Facing marine waste, overfishing, and climate change, exploring Taiwan's marine conservation status, challenges, and innovative solutions",
    'map.markers.kaohsiungMrt.title': 'Taiwan Marine Ecology',
    'map.markers.kaohsiungMrt.desc':
      "Waters protected by Tao people's taboos now bleach under high temperatures and underwater noise: When millennia of ecological wisdom meets modern marine crisis",
    'map.markers.taichungMrt.title':
      'Taiwan Marine Ecology and Coral Reef Conservation',
    'map.markers.taichungMrt.desc':
      "Surrounded by sea, Taiwan possesses rich marine ecology—from coral bleaching crises to cetacean conservation, examining marine national parks' protection effectiveness and future challenges",
    'map.markers.taiwanTrainSystem.title': 'Taiwan Hot Springs and Geothermal',
    'map.markers.taiwanTrainSystem.desc':
      "From the failed geothermal power plant 30 years ago to the world's only Hokutolite: How an island transforms underground fire into healing and green electricity",
    'map.markers.taiwanBusSystem.title': 'Taiwan Leopard Cat Conservation',
    'map.markers.taiwanBusSystem.desc':
      'The phantom cat with fewer than 500 left in Taiwan—as the last native feline walks toward the edge of extinction',
    'map.markers.taiwanInnovationEcosystem.title': 'Taiwan Pangolin',
    'map.markers.taiwanInnovationEcosystem.desc':
      "The world's most trafficked mammal found a safe home in Taiwan",
    'map.markers.taiwanMedicalSystem.title':
      'Taiwan Alpine Ecosystem and Ice Age Relicts',
    'map.markers.taiwanMedicalSystem.desc':
      "Examining Taiwan's unique alpine ecosystem above 3,000 meters, from Taiwan cypress and Yushan rhododendron to precious biodiversity of Ice Age relict species",
    'map.markers.taiwanEducationSystem.title': 'Taiwan Black Bear',
    'map.markers.taiwanEducationSystem.desc':
      "The white V on its chest is its signature—Taiwan's last mountain king and its unfinished conservation battle",
    'map.markers.taiwanMusicIndustry.title': 'National Parks',
    'map.markers.taiwanMusicIndustry.desc':
      "9 national parks packed into 36,197 square kilometers—world's highest density conservation miracle",
    'map.markers.mandarinPopMusic.title':
      "Island's Mountain and Sea Summit: Taiwan National Parks' Ecology and Landscape",
    'map.markers.mandarinPopMusic.desc':
      "Explore Taiwan's nine national parks' unique ecosystems and conservation value, complete landscapes from subtropical coast to alpine snow line",
    'map.markers.taiwaneseIndieMusic.title': 'Endemic Species',
    'map.markers.taiwaneseIndieMusic.desc':
      "Taiwan's rich endemic species demonstrate island biogeography's evolutionary miracle and conservation importance",
    'map.markers.taiwanRapHipHop.title': 'Ecological Diversity',
    'map.markers.taiwanRapHipHop.desc':
      'Taiwan accounts for only 0.025% of global area yet hosts over 50,000 species, with 60.71% forest coverage ranking 33rd globally',
    'map.markers.taiwanElectronicMusic.title': "Taiwan's Cetaceans",
    'map.markers.taiwanElectronicMusic.desc':
      'Habitat for one-third of global cetacean species—from past whaling to present whale watching, how did Taiwan transform into a marine ecology research center?',
    'map.markers.taiwanTraditionalMusic.title': 'Mayday',
    'map.markers.taiwanTraditionalMusic.desc':
      'From Normal University Affiliated High School to world stage, the eternal youth defining Mandarin rock spirit',
    'map.markers.taiwanFilmIndustry.title': 'Wu Bai',
    'map.markers.taiwanFilmIndustry.desc':
      'Taiwan rock national treasure, synonym for local rock music, establishing rock status with works like "Norwegian Wood"',
    'map.markers.newTaiwanCinema.title': 'Wu Pao-chun',
    'map.markers.newTaiwanCinema.desc':
      'World Bread Competition champion, stunning the world with lychee rose bread, from Pingtung countryside to world-class master baker',
    'map.markers.taiwanDocumentary.title': 'Annette Lu',
    'map.markers.taiwanDocumentary.desc':
      "From rebel to vice president: The legendary life of the Chinese-speaking world's first female vice president",
    'map.markers.taiwanAnimationIndustry.title': 'Jimmy Liao',
    'map.markers.taiwanAnimationIndustry.desc':
      'Illustrator-poet warming the world with picture books, bringing Taiwan picture books to the international stage',
    'map.markers.taiwanTelevisionIndustry.title': 'Tai Tzu-ying',
    'map.markers.taiwanTelevisionIndustry.desc':
      "214-week world number one record holder, Taiwan's badminton queen from Kaohsiung Qianzhen to Olympic silver",
    'map.markers.taiwanOttPlatforms.title': 'Li Ang',
    'map.markers.taiwanOttPlatforms.desc':
      'Author of "The Butcher\'s Wife" and "The Lost Garden," Taiwan feminist literature pioneer',
    'map.markers.taiwanPodcastIndustry.title': 'Lee Chih-kai',
    'map.markers.taiwanPodcastIndustry.desc':
      'From "Jump! Boys" market Kai to Olympic silver, Taiwan\'s pommel horse prince\'s sixteen-year tumbling life',
    'map.markers.taiwanPublishing.title': 'Yuan T. Lee',
    'map.markers.taiwanPublishing.desc':
      "1986 Nobel Prize in Chemistry laureate, pioneering new fields in chemical dynamics with crossed molecular beam technique, Taiwan's first Nobel science laureate",
    'map.markers.taiwanBookstoreCulture.title': 'Du Congming',
    'map.markers.taiwanBookstoreCulture.desc':
      "Taiwan's first medical doctorate holder, father of modern Taiwanese medicine",
    'map.markers.taiwanComicMangaIndustry.title': 'Jeremy Lin',
    'map.markers.taiwanComicMangaIndustry.desc':
      'From Harvard scholar to NBA champion, Taiwanese-American player who sparked global Linsanity',
    'map.markers.taiwanGameIndustry.title': 'Kevin Lin',
    'map.markers.taiwanGameIndustry.desc':
      'From skinny kid rejected by track team to polar runner creating history by walking across the Sahara Desert',
    'map.markers.nationalPalaceMuseum.title': 'Lin Yi-hsiung',
    'map.markers.nationalPalaceMuseum.desc':
      'Democracy movement pioneer, Lin residence massacre victim, anti-nuclear power plant four movement leader',
    'map.markers.nationalParks.title': 'Edward Yang',
    'map.markers.nationalParks.desc':
      'Core figure of Taiwan New Cinema movement, Cannes Best Director, poet of urban alienation',
    'map.markers.taiwanGeography.title': 'Pai Hsien-yung',
    'map.markers.taiwanGeography.desc':
      'Author of "Taipei People," modern literature master and Kunqu opera revival advocate',
    'map.markers.taiwanClimate.title': 'Crowd Lu',
    'map.markers.taiwanClimate.desc':
      'Taiwan singer-songwriter and actor, Triple Crown winner (Golden Melody, Golden Bell, Golden Horse), known for grassroots friendly image and unique singing style',
    'map.markers.taiwanEcosystem.title': 'Chuang Chih-yuan',
    'map.markers.taiwanEcosystem.desc':
      'Table tennis godfather, four-time Olympic representative, the lonely hero training in solitude',
    'map.markers.taiwanEndangeredSpecies.title': 'Tsai Ming-liang',
    'map.markers.taiwanEndangeredSpecies.desc':
      'Venice Golden Lion winner, Malaysian Chinese, slow cinema aesthetics master',
    'map.markers.taiwanMarineEcology.title': 'Hsu Wen-lung',
    'map.markers.taiwanMarineEcology.desc':
      'Chi Mei Corporation founder, triple identity of entrepreneur, violinist, and art collector, Chi Mei Museum creator',
    'map.markers.taiwanBirdwatching.title': 'Hsu Fang-yi',
    'map.markers.taiwanBirdwatching.desc':
      "From Yilan girl to Martha Graham Dance Company principal, then returning to Taiwan to found Fang-Yi Hsu & Bare Dance—she tells Taiwan's most powerful stories through her body",
    'map.markers.taiwanHotSprings.title':
      "Lai Ching-te: From Miner's Family to Presidential Office Public Health Physician",
    'map.markers.taiwanHotSprings.desc':
      "Taiwan's 16th president, first political figure in ROC constitutional history to run as vice president and successfully win election",
    'map.markers.taiwanIslands.title': 'Kuo Hsing-chun',
    'map.markers.taiwanIslands.desc':
      "Taiwan's weightlifting goddess, 2021 Tokyo Olympics gold medalist, three Olympic records holder in the 59kg category",
    'map.markers.taiwanMountains.title': 'Deng Yu-xian',
    'map.markers.taiwanMountains.desc':
      'Father of Taiwan\'s folk songs, composer of classic Taiwanese songs including "Looking Forward to Spring Breeze," "Rainy Night Flower," and "Moonlit Melancholy"',
    'map.markers.taiwanRivers.title': 'Chung Li-ho',
    'map.markers.taiwanRivers.desc':
      'Author of "The Dull-ice Flower," father of Taiwan literature, literary fighter persisting in creation despite poverty and illness',
    'map.markers.taiwanCoastline.title': 'Chen Shu-chu',
    'map.markers.taiwanCoastline.desc':
      'Ordinary acts of kindness from a Taitung vegetable vendor, using a lifetime to interpret what true wealth means',
    'map.markers.taiwanForests.title': 'Chen Shui-bian',
    'map.markers.taiwanForests.desc':
      "10th and 11th president, protagonist of 2000's first party alternation, important figure in Taiwan's democratization",
    'map.markers.taiwanNaturalDisasters.title': 'Ma Ying-jeou',
    'map.markers.taiwanNaturalDisasters.desc':
      '12th and 13th president, driving force behind cross-strait relations thaw, ECFA signatory',
    'map.markers.taiwanEarthquakes.title': 'Huang Chun-ming',
    'map.markers.taiwanEarthquakes.desc':
      'Author of "The Gong and Drum" and "The Days of Looking at the Sea," representative writer of Yilan nativist literature',
    'map.markers.taiwanTyphoons.title':
      'Huang Zhen-nan: The Takeshi Kaneshiro of Bibliophiles and Living Source of Taiwan History',
    'map.markers.taiwanTyphoons.desc':
      'Huang Zhen-nan is a Taiwan history researcher, bibliophile, and author who started with PTT username Sizumaru, running the "Living Water Old Book Room" page to share Taiwan history and old book culture. Author of books like "The Most Entertaining Taiwan History," he\'s dubbed the Takeshi Kaneshiro of bibliophiles. Starting from his scholarly family in Chiayi Liujiao, father and son divide north-south work collecting documents, dedicated to making serious Taiwan history interesting and accessible.',
    'map.markers.sunflowerMovement.title': 'Zoos and Exhibition Animal Ethics',
    'map.markers.sunflowerMovement.desc':
      "From elephants in iron cages to Xpark's jellyfish walls—Taiwan is redefining the relationship between humans and exhibited animals",
    'map.markers.taiwanSocialMovements.title':
      'Taiwan Indigenous Land Justice and Traditional Territories',
    'map.markers.taiwanSocialMovements.desc':
      'Examining the historical context of Taiwan Indigenous land rights, legal developments, traditional territory demarcation controversies, and achievements of the Indigenous Peoples Transitional Justice Committee',
    'map.markers.taiwanMarriageEquality.title':
      'Taiwan Marriage Equality and Gender Equality',
    'map.markers.taiwanMarriageEquality.desc':
      "From martial law prisoner to Asia's first same-sex marriage law—how one man's 30-year struggle rewrote the island's definition of love",
    'map.markers.taiwanEnvironmentalJustice.title':
      'Taiwan Environmental Justice and NIMBY Controversies',
    'map.markers.taiwanEnvironmentalJustice.desc':
      "Examining Taiwan's unequal distribution of environmental burdens, from incinerators and nuclear waste to petrochemical industry NIMBY conflicts, analyzing environmental inequality and social justice issues",
    'map.markers.taiwanCommunityRiCulture.title':
      'Taiwan Community and Li Culture',
    'map.markers.taiwanCommunityRiCulture.desc':
      'From grassroots democratic practice to community building social innovation',
    'map.markers.taiwanLongTermCare.title':
      'Taiwan Long-Term Care System Development',
    'map.markers.taiwanLongTermCare.desc':
      "The world's most advanced long-term care system, yet simultaneously housing the largest invisible care system",
    'map.markers.taiwanLaborMovement.title':
      'Environmental Protection and Sustainable Development',
    'map.markers.taiwanLaborMovement.desc':
      'From smokestack island to net-zero Taiwan: The 40-year awakening path of the environmental movement',
    'map.markers.taiwanHousingIssues.title':
      'Social Housing and Housing Justice',
    'map.markers.taiwanHousingIssues.desc':
      'How Taiwan achieves housing justice through social housing policies, giving everyone a place to settle',
    'map.markers.taiwanHealthcareSystem.title': 'Science Park Development',
    'map.markers.taiwanHealthcareSystem.desc':
      "From Hsinchu Science Park to Southern Taiwan Science Park, exploring Taiwan's science park development journey and three major parks' unique positioning",
    'map.markers.taiwanImmigration.title': 'Semiconductor Industry',
    'map.markers.taiwanImmigration.desc':
      "From Morris Chang's historical gamble to the 2-nanometer era: How TSMC made Taiwan the global tech lifeline",
    'map.markers.taiwanReligiousDiversity.title':
      'Taiwan Coastal Terrain and Marine Landscape',
    'map.markers.taiwanReligiousDiversity.desc':
      "The neck of Yehliu's Queen's Head is thinning at 0.2 cm per year and will someday break—this is the fate and beauty of Taiwan's coastal terrain",
    'map.markers.taiwanBuddhismTaoism.title':
      'Taiwan Tea Ceremony and Life Aesthetics',
    'map.markers.taiwanBuddhismTaoism.desc':
      'The night Wistaria Tea House opened in 1981, opposition members and literati gathered for tea—this was more than a teahouse, it was a secret base for the opposition movement',
    'map.markers.taiwanFolkReligion.title':
      'Taiwan Elections and Party Politics',
    'map.markers.taiwanFolkReligion.desc':
      'From local councilors in 1950 to party alternation in 2000, see how Taiwan used ballots to write a democratic transformation miracle',
    'map.markers.taiwanChristianity.title':
      'Taiwan Urban Development and Urban-Rural Divide',
    'map.markers.taiwanChristianity.desc':
      "70 years from agricultural island to urban island, light and shadow of 70% population concentrated in six special municipalities: Prosperous Taichung vs. declining Yunlin's cruel contrast",
    'map.markers.taiwanIslamJudaism.title':
      'City Characteristics and Regional Culture',
    'map.markers.taiwanIslamJudaism.desc':
      "From New Taipei's 4.04 million to Tainan's 1.85 million, see how the six special municipalities shape their respective city characters through industrial transformation",
    'map.markers.kaohsiungIncident.title': 'Democratization',
    'map.markers.kaohsiungIncident.desc':
      "The December 10, 1979 police-civilian clash on Kaohsiung streets ultimately gave birth to Taiwan's democratic transition—but at what cost in youth and freedom?",
    'map.markers.wangLeeOlympicGold.title':
      'Wang Chi-lin and Lee Yang (The Lin-Yang Pair)',
    'map.markers.wangLeeOlympicGold.desc':
      'From junior high classmates to Olympic gold: "The Lin-Yang Pair" defeated China in straight sets within 34 minutes, writing the first Olympic gold in Taiwan badminton history',
  },
  ja: {
    // Meta
    'map.meta.title': '台湾マップ',
    'map.meta.description': 'マップ視点でTaiwan.mdのコンテンツを探索する',

    // Hero Section
    'map.hero.kicker': 'Map View',
    'map.hero.title': '台湾マップ',
    'map.hero.subtitle':
      'マップ視点で台湾の文化・グルメ・自然・歴史スポットを探索しよう。',

    // Controls - Region Filter
    'map.controls.region.title': 'エリア絞り込み',
    'map.controls.region.all': 'すべて',
    'map.controls.region.north': '北部',
    'map.controls.region.central': '中部',
    'map.controls.region.south': '南部',
    'map.controls.region.east': '東部',
    'map.controls.region.islands': '離島',

    // Controls - Category Filter
    'map.controls.category.title': 'カテゴリ絞り込み',
    'map.controls.category.all': 'すべて',
    'map.controls.category.food': '🍜 グルメ',
    'map.controls.category.history': '📜 歴史',
    'map.controls.category.nature': '🌿 自然',
    'map.controls.category.culture': '🎭 文化',
    'map.controls.category.technology': '💻 テクノロジー',
    'map.controls.category.economy': '📈 経済',
    'map.controls.category.lifestyle': '🏮 ライフスタイル',
    'map.controls.category.art': '🎨 アート',
    'map.controls.category.geography': '🗺️ 地理',

    // Route Section
    'map.route.title': '🗺️ キュレーションルート',
    'map.route.normal-mode': '通常モード',

    // Sidebar - Default
    'map.sidebar.default.title': '📍 台湾の記事を探索',
    'map.sidebar.default.hint':
      'マップ上の県市やマーカーをクリックして記事を探索しよう',

    // Sidebar - County
    'map.sidebar.county.clear': '✕ 選択解除',
    'map.sidebar.county.articles-count': '件の記事',
    'map.sidebar.county.no-articles': 'このエリアにはまだ記事がありません',

    // Sidebar - Article
    'map.sidebar.article.back': '← 戻る',
    'map.sidebar.article.read-more': '全文を読む →',

    // Zoom Controls
    'map.zoom.in': '＋',
    'map.zoom.out': '－',
    'map.zoom.reset': '⌂',

    // Tooltips
    'map.tooltip.county.articles': '件の関連記事',
    'map.tooltip.county.click': 'クリックしてこのエリアを絞り込む',
    'map.tooltip.marker.reading-time': '分で読める',

    // Panel
    'map.panel.title': '台湾ナレッジマップ',
    'map.panel.stat.points': 'ナレッジポイント',
    'map.panel.stat.categories': 'カテゴリ',
    'map.panel.category-distribution': 'カテゴリ分布',
    'map.panel.link.graph': '🕸️ ナレッジグラフ',
    'map.panel.link.home': '🏠 カテゴリ一覧',

    // Category Names (for JS usage)
    'map.category.history': '📜 歴史',
    'map.category.geography': '🗺️ 地理',
    'map.category.culture': '🎭 文化',
    'map.category.food': '🍜 グルメ',
    'map.category.art': '🎨 アート',
    'map.category.music': '🎵 音楽',
    'map.category.technology': '💻 テクノロジー',
    'map.category.nature': '🌿 自然',
    'map.category.people': '👥 人物',
    'map.category.society': '⚖️ 社会',
    'map.category.economy': '📈 経済',
    'map.category.lifestyle': '🏮 ライフスタイル',

    // Additional UI text
    'map.sidebar.more-articles': '⋯ほか',
    'map.sidebar.more-articles-suffix': '件',

    // Routes
    'map.routes.nightMarkets.name': '🍜 夜市めぐり',
    'map.routes.nightMarkets.description':
      '北から南まで、台湾を代表する夜市文化',
    'map.routes.nationalParks.name': '🏔️ 国立公園めぐり',
    'map.routes.nationalParks.description':
      '標高3,952mの高山から熱帯サンゴ礁まで、台湾の自然の奇跡',
    'map.routes.historyTrail.name': '📜 歴史の足跡',
    'map.routes.historyTrail.description':
      'オランダ植民地時代から民主化まで、台湾400年を歩く',
    'map.routes.oldStreets.name': '🏮 老街散策',
    'map.routes.oldStreets.description':
      '百年の街並みに刻まれた台湾の記憶、建築が語る歴史',
    'map.routes.counties22.name': '📍 22県市深掘り記事',
    'map.routes.counties22.description':
      'Taiwan.md の22本の県市深掘り記事を辿る——基隆のパイロットから新北のフィナーレまで、各県市にひとつの核心的矛盾。',
    'map.counties22.panel.title': '📍 22県市深掘り記事',
    'map.counties22.panel.hint': '県市カードを開くか、地図上で県市をクリック',
    'map.counties22.tooltip.openDeep': 'クリックで深掘り記事を開く',
    'map.counties22.deepCard.badge': '📖 22県市シリーズ · 深掘り記事',
    'map.counties22.deepCard.cta': '全文を読む →',

    // Night Markets Stops
    'map.stops.shilinNightMarket.name': '士林夜市',
    'map.stops.shilinNightMarket.note':
      '台湾最大の観光夜市、大餅包小餅の発祥地',
    'map.stops.raoheNightMarket.name': '饒河夜市',
    'map.stops.raoheNightMarket.note':
      '胡椒餅の行列スポット、台北っ子に愛される地元の夜市',
    'map.stops.ningxiaNightMarket.name': '寧夏夜市',
    'map.stops.ningxiaNightMarket.note':
      '屋台密度ナンバーワン、ミシュラン推薦の庶民グルメストリート',
    'map.stops.fengjiaNightMarket.name': '逢甲夜市',
    'map.stops.fengjiaNightMarket.note':
      'クリエイティブスナックの実験室、台湾夜市イノベーションの最前線',
    'map.stops.huayuanNightMarket.name': '花園夜市',
    'map.stops.huayuanNightMarket.note':
      '台南最大の夜市、週3日限定のカーニバル',
    'map.stops.liuheNightMarket.name': '六合夜市',
    'map.stops.liuheNightMarket.note': '高雄のランドマーク夜市、海鮮が主役',

    // National Parks Stops
    'map.stops.yangmingshanNationalPark.name': '陽明山国立公園',
    'map.stops.yangmingshanNationalPark.note':
      '台北の裏庭、火山地形と温泉パラダイス',
    'map.stops.tarokoNationalPark.name': '太魯閣国立公園',
    'map.stops.tarokoNationalPark.note': '大理石の峡谷、世界クラスの地質奇観',
    'map.stops.yushanNationalPark.name': '玉山国立公園',
    'map.stops.yushanNationalPark.note':
      '北東アジア最高峰（3,952m）、台湾の屋根',
    'map.stops.alishanScenicArea.name': '阿里山国家風景区',
    'map.stops.alishanScenicArea.note': '日の出の雲海、神木群と森林鉄道',
    'map.stops.sunMoonLakeScenicArea.name': '日月潭国家風景区',
    'map.stops.sunMoonLakeScenicArea.note':
      '台湾最大の天然湖、サオ族の聖なる湖',
    'map.stops.kentingNationalPark.name': '墾丁国立公園',
    'map.stops.kentingNationalPark.note': '台湾最南端、熱帯サンゴ礁と恒春半島',

    // History Trail Stops
    'map.stops.anpingFort.name': '安平古堡',
    'map.stops.anpingFort.note': '1624年にオランダ人が建造、台湾最古の城塞',
    'map.stops.chikanTower.name': '赤崁楼',
    'map.stops.chikanTower.note':
      'オランダのプロビンシア城から鄭成功の統治の象徴へ',
    'map.stops.lukang.name': '鹿港',
    'map.stops.lukang.note': '清代台湾第二の都市、「一府二鹿三艋舺」',
    'map.stops.presidentialOffice.name': '総統府（旧台湾総督府）',
    'map.stops.presidentialOffice.note':
      '1919年竣工、日本統治時代の最高権力の中枢',
    'map.stops.chiangKaiShekMemorialHall.name': '中正紀念堂',
    'map.stops.chiangKaiShekMemorialHall.note':
      '権威主義の象徴と移行期正義をめぐる議論の焦点',
    'map.stops.legislativeYuan.name': '立法院（ひまわり学生運動）',
    'map.stops.legislativeYuan.note':
      '2014年ひまわり学生運動の現場、台湾民主主義のマイルストーン',

    // Old Streets Stops
    'map.stops.dihuaStreet.name': '迪化街',
    'map.stops.dihuaStreet.note': '大稻埕の心臓部、乾物と年越し準備の街',
    'map.stops.jiufenOldStreet.name': '九份老街',
    'map.stops.jiufenOldStreet.note':
      '鉱業の黄金時代と「千と千尋の神隠し」のインスピレーション',
    'map.stops.lukangOldStreet.name': '鹿港老街',
    'map.stops.lukangOldStreet.note':
      '赤レンガの伝統家屋と伝統工芸の生きた博物館',
    'map.stops.anpingOldStreet.name': '安平老街',
    'map.stops.anpingOldStreet.note': '台湾第一の通り、400年の歴史が積み重なる',
    'map.stops.qishanOldStreet.name': '旗山老街',
    'map.stops.qishanOldStreet.note': 'バナナ王国のバロック建築群',
    'map.stops.tamsuiOldStreet.name': '淡水老街',
    'map.stops.tamsuiOldStreet.note': '夕焼け、阿給、淡水河河口の歴史情緒',

    // Cities
    'map.city.taipei': '台北',
    'map.city.newTaipei': '新北',
    'map.city.keelung': '基隆',
    'map.city.taoyuan': '桃園',
    'map.city.hsinchu': '新竹',
    'map.city.miaoli': '苗栗',
    'map.city.taichung': '台中',
    'map.city.changhua': '彰化',
    'map.city.nantou': '南投',
    'map.city.chiayi': '嘉義',
    'map.city.tainan': '台南',
    'map.city.kaohsiung': '高雄',
    'map.city.pingtung': '屏東',
    'map.city.yilan': '宜蘭',
    'map.city.hualien': '花蓮',
    'map.city.taitung': '台東',
    'map.city.penghu': '澎湖',
    'map.city.kinmen': '金門',

    // Markers
    'map.markers.founderCheYuWu.title': '創設者 — 呉哲宇 Che-Yu Wu',
    'map.markers.founderCheYuWu.desc':
      'コードから詩へ：台湾人アーティストの国際的ブレイクスルーへの道',
    'map.markers.taiwanIndigenousContemporaryArt.title':
      '台湾原住民族コンテンポラリーアート',
    'map.markers.taiwanIndigenousContemporaryArt.desc':
      '伝統工芸から現代創作まで、台湾原住民族のアーティストが世界の舞台で発信し、原住民族アイデンティティと現代アートの対話を再定義する姿を探る',
    'map.markers.taiwanExperimentalNewMediaArt.title':
      '台湾実験・ニューメディアアート',
    'map.markers.taiwanExperimentalNewMediaArt.desc':
      'ビデオアートからVRインタラクションまで、台湾ニューメディアアートの革新的発展とテクノロジーアートのエコシステムを探る',
    'map.markers.taiwanArchitecture.title': '台湾建築',
    'map.markers.taiwanArchitecture.desc':
      '石板家屋から超高層ビルへ：島の建築タイムトラベル',
    'map.markers.taiwanNewMediaArt.title': '台湾ニューメディアアート',
    'map.markers.taiwanNewMediaArt.desc': '台湾の文化と物語を探る',
    'map.markers.taiwanWatercolorCenturyEvolution.title':
      '台湾水彩画の百年変遷',
    'map.markers.taiwanWatercolorCenturyEvolution.desc':
      '日本統治時代の石川欽一郎の啓蒙から現代の簡忠威の国際的名声まで、台湾水彩画は百年をかけてアジア屈指の水彩創作拠点へと成長した',
    'map.markers.taiwanModernPoetry.title': '台湾現代詩',
    'map.markers.taiwanModernPoetry.desc':
      '三つの書斎から生まれたモダニズム実験が、最も土着的な詩の革命を生んだ経緯',
    'map.markers.taiwanContemporarySculpture.title': '台湾現代彫刻の発展',
    'map.markers.taiwanContemporarySculpture.desc':
      '楊英風、朱銘から新世代まで、台湾彫刻芸術の変遷と創作精神を探る',
    'map.markers.taiwanCuratorsArtCulture.title':
      '台湾キュレーターと芸術文化の構築',
    'map.markers.taiwanCuratorsArtCulture.desc':
      '独立キュレーションから美術館体制まで、台湾のキュレーターが現代アートの文化的言説と国際対話をいかに構築してきたか',
    'map.markers.newMediaArt.title': 'ニューメディアアート',
    'map.markers.newMediaArt.desc':
      '台湾デジタルアートのフロンティア探索、実験室から国際舞台へのテクノロジーと人文の融合',
    'map.markers.contemporaryTaiwanLiterature.title': '現代台湾文学',
    'map.markers.contemporaryTaiwanLiterature.desc': '台湾の文化と物語を探る',
    'map.markers.taiwanContemporaryArt.title': '台湾コンテンポラリーアート',
    'map.markers.taiwanContemporaryArt.desc':
      '台北市立美術館からヴェネツィア・ビエンナーレ台湾館まで、台湾現代アートの国際的位置づけ',
    'map.markers.kinmenGuesthouseMuseum.title': '金馬賓館当代美術館',
    'map.markers.kinmenGuesthouseMuseum.desc':
      '別離と再会を見届けた冷戦時代の軍事中継地が、20年の眠りを経て父娘に目覚めさせられ、「ロンリープラネット」推薦の高雄随一の美術館に',
    'map.markers.renjianMagazine.title': '人間雑誌',
    'map.markers.renjianMagazine.desc':
      '47号、4年間、写真と文章で起こした静かな革命——台湾ルポルタージュ文学の原点',
    'map.markers.taiwanIndigenousCulture.title': '台湾原住民族文化',
    'map.markers.taiwanIndigenousCulture.desc':
      '16部族の多様な伝統から現代の芸術復興まで、台湾原住民族文化の奥深さと現代的変容を探る',
    'map.markers.taiwan16IndigenousTribes.title':
      '台湾原住民族16部族文化マップ',
    'map.markers.taiwan16IndigenousTribes.desc':
      '台湾16の原住民族の分布エリア・言語体系・重要祭典・現代創作の展開を探り、台湾原住民族の多彩な文化を知る',
    'map.markers.taiwanNightMarketCulture.title':
      '台湾夜市文化とストリートフード',
    'map.markers.taiwanNightMarketCulture.desc':
      '台湾夜市文化の成り立ちと独自の魅力、代表的屋台グルメの歴史と文化的意義を深掘りする',
    'map.markers.taiwanSensibilityKoreanPerspective.title':
      '台湾センシビリティ：韓国人の目に映る台湾美学',
    'map.markers.taiwanSensibilityKoreanPerspective.desc':
      'K-popのMVからソウル国際ブックフェアまで、「대만감성（台湾感性）」が台湾の日常風景をアジアで最も魅力的な美学シンボルに変えた',
    'map.markers.taiwanCulturalCreativeParks.title':
      '台湾文化クリエイティブパークの発展',
    'map.markers.taiwanCulturalCreativeParks.desc':
      '古い建物の再生からクリエイティブ集積地まで、台湾文化クリエイティブパークの発展の軌跡と革新モデル',
    'map.markers.taiwanOldStreetCulture.title': '台湾老街文化と商業街区',
    'map.markers.taiwanOldStreetCulture.desc':
      '清朝の港町の繁栄から日本統治時代のバロック洋館まで、台湾の老街はレンガと瓦で書かれた庶民の歴史',
    'map.markers.taiwanTeaCeremonyLifeAesthetics.title': '台湾茶道と生活美学',
    'map.markers.taiwanTeaCeremonyLifeAesthetics.desc':
      '功夫茶から茶席美学まで、台湾が東洋茶文化と地域の生活美学を融合させた革新を探る',
    'map.markers.taiwanStreetArtGraffiti.title':
      '台湾ストリートアートとグラフィティ文化',
    'map.markers.taiwanStreetArtGraffiti.desc':
      'アンダーグラウンドのグラフィティから合法壁画まで、都市の壁が台湾アーティストの創作ステージになるまで',
    'map.markers.taiwanIncenseMakingCulture.title': '台湾製香文化とその故郷',
    'map.markers.taiwanIncenseMakingCulture.desc':
      '嘉義・雲霄地区の百年の線香づくりから台湾各地に広がる製香産業まで——信仰・手仕事・こだわりにまつわる古き営み',
    'map.markers.taiwanHomophoneTaboos.title':
      '台湾の同音忌避文化：なぜ「四」で社会は階を飛ばすのか？',
    'map.markers.taiwanHomophoneTaboos.desc':
      '病院に4階がないことからナンバープレート「8888」の高額落札まで、台湾人の同音への敏感さは世界屈指',
    'map.markers.hakkaCultureLanguage.title': '客家文化と言語',
    'map.markers.hakkaCultureLanguage.desc':
      '「硬頸精神」と天穿日：台湾客家人の文化継承と現代の復興',
    'map.markers.ethnicGroupsTaiwan.title':
      'エスニックグループ（閩南・客家・原住民族・外省人・新住民）',
    'map.markers.ethnicGroupsTaiwan.desc':
      '台湾の民族的多様性は歴史的発展の産物であると同時に、現代台湾社会を理解する鍵でもある。この多元的共存は台湾文化の創造力の源泉であり、民主政治発展の重要な基盤でもある。各民族の文化的特色を尊重しながら共通の台湾アイデンティティを構築することは、台湾社会が向き合い続ける重要な課題である。',
    'map.markers.chinaSteel.title': '中国鋼鉄：鉄頭部長と十大建設の鉄鋼伝説',
    'map.markers.chinaSteel.desc':
      '趙耀東が欧米交渉で技術を勝ち取り、高雄・小港から最初の白煙が上がるまで。中国鋼鉄は50年かけて台湾重工業の背骨を築き、十大建設の最も輝かしい成果となった',
    'map.markers.taiwanCement.title':
      '台湾セメント：台湾初の上場企業のグリーン転換伝説',
    'map.markers.taiwanCement.desc':
      '1962年に台湾証券取引所がこの会社のために設立、銘柄コード1101は台湾株の起源を象徴する。辜家三代76年の経営を経て、台湾セメントはセメント窯で台湾の建設奇跡を見届け、今やカーボンニュートラル時代に向けてグリーン企業へ転身',
    'map.markers.tsmc.title': '台湾企業：TSMC',
    'map.markers.tsmc.desc':
      '世界半導体ファウンドリのリーダー、人類デジタル文明の鍵を握る',
    'map.markers.chimeiCorporation.title':
      '奇美実業：許文龍のアクリル王国と博物館の夢',
    'map.markers.chimeiCorporation.desc':
      '1960年台南・仁徳の小さな工場からスタートし、許文龍は生涯をかけてアジア最大のABS素材王国を築き、奇美博物館を創設して社会に還元。台湾企業が商業的成功と人文的配慮を両立できることを証明した',
    'map.markers.acer.title': 'Acerグループ — PC産業変革のパイオニア',
    'map.markers.acer.desc':
      '台湾・桃園発のPC先駆者、「マルチブランド・マルチチャネル」モデルで世界PC産業変革のエンジンに',
    'map.markers.giantBicycles.title': '台湾企業：ジャイアント',
    'map.markers.giantBicycles.desc':
      '米国大手に切り捨てられたOEM下請けから、世界の自転車技術標準を決める隠れた帝国へ',
    'map.markers.quantaComputer.title': '台湾企業：広達電脳',
    'map.markers.quantaComputer.desc':
      '工場火災からノートPC世界一へ、林百里はいかにしてAI時代の新帝国を築いたか？',
    'map.markers.aseGroup.title': '台湾企業：日月光半導体',
    'map.markers.aseGroup.desc':
      '世界最大の半導体パッケージング・テスト企業——建設会社の社長がなぜ半導体に転身したのか？',
    'map.markers.esunFinancialHolding.title':
      '台湾企業：玉山フィナンシャルホールディングス',
    'map.markers.esunFinancialHolding.desc':
      'クレジットカード専門銀行からデジタル金融のパイオニアへ、43歳史上最年少の金融持株会社CEOのブレイクスルー物語',
    'map.markers.changChunPetrochemical.title': '台湾企業：長春石油化学',
    'map.markers.changChunPetrochemical.desc':
      '1949年台南の小さな工場からグローバル化学大手へ、「上場せず借金もしない」隠れたチャンピオンの物語',
    'map.markers.formosaPlasticsGroup.title': '台湾企業：長栄海運',
    'map.markers.formosaPlasticsGroup.desc':
      '中古船1隻から世界的海運帝国へ、張栄発のブルーオーシャン伝説',
    'map.markers.taipeiFubon.title': '夜市経済学：ブランドなき商業の奇跡',
    'map.markers.taipeiFubon.desc':
      '台湾の夜市がブランドも装飾も固定店舗もなしに、年間約4,000億台湾ドルの経済奇跡を生み出す仕組みを探る',
    'map.markers.taiwan7Eleven.title': '台湾コーヒー産業',
    'map.markers.taiwan7Eleven.desc':
      '日本統治時代の栽培起源からSimple Kaffa世界チャンピオンまで、台湾コーヒーの百年進化史',
    'map.markers.taiwanHighSpeedRail.title': '台湾ご当地グルメマップ',
    'map.markers.taiwanHighSpeedRail.desc':
      '基隆廟口の鼎辺糊から屏東萬巒の豚足、新竹の貢丸から台東の釈迦まで、各都市にはそれぞれの味覚DNAがある。地元の人の足跡を辿り、台湾22県市で最も代表的なご当地グルメを味わい、島の最も真実な庶民文化に触れる。',
    'map.markers.taiwanSemiconductorIndustry.title':
      '台湾の家庭料理：消えゆく味の記憶',
    'map.markers.taiwanSemiconductorIndustry.desc':
      '嘉義の薄荷鶏から菜尾湯まで、おばあちゃんの得意料理には家族の記憶が宿るが、時代の流れの中で少しずつ失われつつある',
    'map.markers.taiwanBankingSystem.title': '台湾新住民の食の融合',
    'map.markers.taiwanBankingSystem.desc':
      'タイの酸っぱ辛いが台湾の甘じょっぱいと出会い、ベトナムのフォーが台湾の煮込み料理と邂逅し、インドネシアのスパイスが地元食材を抱きしめる——国境を超えた味覚革命が台湾で静かに進行中。新住民が持ち込んだのは故郷の料理だけでなく、台湾食文化を豊かにする新たな可能性だ。',
    'map.markers.taiwanSmes.title': '台湾フルーツ王国',
    'map.markers.taiwanSmes.desc':
      'マンゴーやライチから釈迦やレンブまで、熱帯フルーツの多様性と農業技術のブレイクスルーが織りなす甘い伝説',
    'map.markers.youbikePublicBikeSystem.title': '台湾シーフード文化',
    'map.markers.youbikePublicBikeSystem.desc':
      '漁港からの新鮮直送、シーフードレストラン文化、蚵仔煎をはじめとする海の幸が、四方を海に囲まれた台湾の島嶼としての特色と豊かな海鮮食文化を体現',
    'map.markers.taiwanFoodBeverageIndustry.title':
      '台湾ミシュランと高級レストラン',
    'map.markers.taiwanFoodBeverageIndustry.desc':
      '2018年、ミシュランガイドの赤い表紙に初めて「TAIPEI」の文字が刻まれ、台湾の飲食業が国際的評価体系に正式参入。屋台から星付きレストランまで、庶民グルメから精緻料理まで、台湾の食文化は国際舞台で伝統と革新が融合した魅力を放つ。',
    'map.markers.taiwanAgriculturalReform.title': '夜市文化',
    'map.markers.taiwanAgriculturalReform.desc':
      '164の登録夜市、台南は平均3.8万人に1つの夜市——廟の広場から国際的観光スポットへ',
    'map.markers.taiwanTeaIndustry.title': '客家の食文化',
    'map.markers.taiwanTeaIndustry.desc':
      '客家の豊かで多彩な食文化、擂茶の芳醇な香りから野薑花粽の山の風情まで、客家民族の倹約と地産地消の生活の知恵を体現',
    'map.markers.taiwanFishingIndustry.title': '牛肉麺',
    'map.markers.taiwanFishingIndustry.desc':
      '外省人移民の郷愁から台湾の国民食へ、牛肉麺の文化的融合と世界への広がり',
    'map.markers.taiwanFruitIndustry.title': 'お茶文化',
    'map.markers.taiwanFruitIndustry.desc':
      '伝統的な茶芸から現代のタピオカミルクティーまで、台湾独自の茶葉品種と飲茶文化の変遷',
    'map.markers.taiwanRiceVarieties.title':
      '揺れる島に、空を飛べるタワーを建てた',
    'map.markers.taiwanRiceVarieties.desc':
      '活断層からわずか200m、台湾人はあえて最も不安定な土地に世界一高いビルを建てた——そしてある男が91分間で素手で登りきった。',
    'map.markers.nightMarketCulture.title':
      '台湾の五大地形と地理構造：山脈から平原までの島嶼景観',
    'map.markers.nightMarketCulture.desc':
      '台湾の独特な地理構造を探る——中央山脈から西部平原まで、この島の地形の多様性を知る',
    'map.markers.bubbleTeaGlobalPhenomenon.title': '台湾交通ネットワーク',
    'map.markers.bubbleTeaGlobalPhenomenon.desc':
      '高速鉄道・MRT・高速道路・航空、台湾のモビリティを支える立体交通ネットワーク',
    'map.markers.taiwanBeefNoodle.title': '台湾国家風景区システム',
    'map.markers.taiwanBeefNoodle.desc':
      '東北角から墾丁まで、台湾13カ所の国家風景区が豊かな自然と人文の景観を見せる',
    'map.markers.taiwanHotPotCulture.title': '台湾島嶼の地理的特色と形成',
    'map.markers.taiwanHotPotCulture.desc':
      '台湾の独特な島嶼地理を探る——プレート運動から地形構造まで、フォルモサ島の自然の神秘を知る',
    'map.markers.taiwanFineDining.title': '台湾のプレート運動と地震活動',
    'map.markers.taiwanFineDining.desc':
      'ユーラシアプレートとフィリピン海プレートの境界に位置する台湾の地質的特性と、頻発する地震活動の原因を探る',
    'map.markers.taiwanStreetFood.title': '台湾のダムと水資源管理',
    'map.markers.taiwanStreetFood.desc':
      '水不足危機からダムの堆砂問題まで、台湾の水資源が直面する課題と南北の配分不均衡のジレンマ',
    'map.markers.taiwanVegetarianCulture.title':
      '台湾の河川システムと水文特性：急流・短流河川と季節変動の水文地理',
    'map.markers.taiwanVegetarianCulture.desc':
      '台湾の独特な河川システムを探る——濁水渓から高屏渓まで、島の地形がいかに台湾の水文特性を形づくるか',
    'map.markers.taiwanCoffeeCulture.title': '台湾の海岸地形と海洋景観',
    'map.markers.taiwanCoffeeCulture.desc':
      '北部の岬湾海岸から東部の断層海岸まで、台湾の多彩な海岸地形がプレート運動の造形美を見せる',
    'map.markers.taiwanSnackCulture.title': '台湾の温泉景観',
    'map.markers.taiwanSnackCulture.desc':
      '北投・知本・礁渓——温泉文化と地質科学が美しく交差する場所',
    'map.markers.taiwanSeafoodCulture.title': '台湾の生物多様性ホットスポット',
    'map.markers.taiwanSeafoodCulture.desc':
      '3.6万km²の島に5.9万種の生物がひしめく、密度は世界平均の100倍',
    'map.markers.taiwanPineappleCake.title': '台湾の農業景観と産業分布',
    'map.markers.taiwanPineappleCake.desc':
      '北から南への農業景観の変化が映す、「台湾の穀倉」から「精密農業」への転換の道',
    'map.markers.taiwanPorkRibSoup.title': '台湾の都市発展と都市農村格差',
    'map.markers.taiwanPorkRibSoup.desc':
      '六都体制下の台湾における都市農村発展の不均衡、農業台湾から都市台湾への空間的転換',
    'map.markers.taiwanOysterOmelette.title': '地形と地質',
    'map.markers.taiwanOysterOmelette.desc':
      '600万年の島に2億年の古い記憶が眠る——世界最年の造山帯と最も劇的なプレート衝突の奇跡',
    'map.markers.taiwanBreakfastCulture.title': '都市の個性と地域文化',
    'map.markers.taiwanBreakfastCulture.desc':
      '台北の国際都市としての顔から台南の古都の風情まで、台湾の各都市がいかに独自のローカルアイデンティティを形成してきたか',
    'map.markers.taiwanConvenienceStoreFood.title':
      '離島と海洋文化：石滬密度世界一から飛魚季の生態法則まで',
    'map.markers.taiwanConvenienceStoreFood.desc':
      '世界に600基足らずの石滬のうち574基が澎湖にある。飛魚漁を専門とする島の民族が、タブーを最も精密な海洋資源管理システムに変えた',
    'map.markers.dutchSpanishColonialPeriod.title':
      '二二八事件と白色テロ：台湾権威主義体制下のトラウマと記憶',
    'map.markers.dutchSpanishColonialPeriod.desc':
      '1947年の二二八事件から38年に及ぶ戒厳体制まで、台湾は権威主義統治下で国家暴力を経験し、戒厳令解除後にようやく歴史のトラウマと向き合い、移行期正義を推進し始めた。',
    'map.markers.zhengDynastyPeriod.title': '台湾海峡危機と両岸関係の発展',
    'map.markers.zhengDynastyPeriod.desc':
      '台湾海峡における三度の重大危機と70年以上に及ぶ両岸関係の歩みを振り返り、台湾海峡情勢の歴史的文脈と現代の課題を理解する',
    'map.markers.qingDynastyTaiwanHistory.title': '台湾海洋貿易史',
    'map.markers.qingDynastyTaiwanHistory.desc':
      '大航海時代の台湾、国際貿易の中心地から海賊王国への興亡伝説',
    'map.markers.japaneseColonialRule.title': '台湾眷村の歴史',
    'map.markers.japaneseColonialRule.desc':
      'ビルマの孤軍から竹垣の王国まで、120万人の大移動がいかに「家」を再定義したか',
    'map.markers.februaryTwentyEightIncident.title': '台湾鉄道史',
    'map.markers.februaryTwentyEightIncident.desc':
      '清朝の劉銘伝から日本統治時代の縦貫線、そして高速鉄道まで、鉄道がいかに台湾の都市発展と文化的記憶を形づくったか',
    'map.markers.martialLawPeriod.title': '国民政府の台湾移転と戦後復興',
    'map.markers.martialLawPeriod.desc':
      '1949年の国民政府台湾移転の歴史的背景・経緯・影響、そして戦後台湾の政治・経済・社会の再建を探る',
    'map.markers.democratization.title': '日本統治時代',
    'map.markers.democratization.desc':
      '1895〜1945年、日本が台湾を50年間統治。全面的な近代化と制度的管理をもたらす一方、同化政策を実施し、台湾社会の発展に深い影響を与えた',
    'map.markers.taiwanIndependenceMovement.title': '清朝統治時代',
    'map.markers.taiwanIndependenceMovement.desc':
      '1683〜1895年、清朝が台湾を約212年間統治。消極的統治から積極的建設へと変遷し、現代台湾の行政区画と漢民族社会の基盤を築いた',
    'map.markers.taiwanChinaRelations.title': 'オランダ・スペイン・鄭氏時代',
    'map.markers.taiwanChinaRelations.desc':
      '台湾史上初の体系的な植民地統治。オランダ人によるゼーランディア城の建設から鄭成功の台湾開拓まで、漢民族移住と政治制度の基盤を築いた',
    'map.markers.taiwanUsRelations.title': 'コンビニ文化',
    'map.markers.taiwanUsRelations.desc':
      '世界一の密度を誇る台湾のコンビニが、小売店から一国の生活インフラへと変貌した過程',
    'map.markers.taiwanInternationalStatus.title': '台湾交通システム',
    'map.markers.taiwanInternationalStatus.desc':
      '高速鉄道が90分で南北を貫通、MRTが都市の動脈を密に織り、バイクが路地裏を駆け抜ける',
    'map.markers.taiwanHistoricalFigures.title': '台湾コンビニ文化',
    'map.markers.taiwanHistoricalFigures.desc':
      '密度世界一のコンビニ王国、セブン-イレブンとファミリーマートのローカライズ革新が現代ライフスタイルを再定義',
    'map.markers.taiwanPoliticalFigures.title': '台湾の公園と日常のレジャー',
    'map.markers.taiwanPoliticalFigures.desc':
      '早朝の太極拳から夜の散歩まで——世代を超えた社交空間としての台湾の公園を文化的に観察する',
    'map.markers.kuomintangHistory.title': '台湾コーヒー文化',
    'map.markers.kuomintangHistory.desc':
      '独立系カフェの密度が世界トップ3、阿里山産豆からカフェでのリモートワークまで——島のコーヒー学',
    'map.markers.democraticProgressivePartyHistory.title':
      'ごみ収集車を追いかける島：台湾のごみ危機からリサイクル奇跡への道',
    'map.markers.democraticProgressivePartyHistory.desc':
      '1990年代に400カ所近い満杯の埋立地を抱え、国際メディアに「ゴミ島」と呼ばれた場所が、ベートーヴェンの音楽で2,300万人を毎日ごみ収集車に走らせ、30年後にはリサイクル率で多くの欧州諸国を上回った',
    'map.markers.taipeiHistory.title':
      '台湾MRT発展史：血と資金で書かれた都市進化論',
    'map.markers.taipeiHistory.desc':
      '209トンの鋼梁が空から落下し4人の命を奪い、16.4億台湾ドルの賠償、台北MRTの本業は今なお赤字——台湾のMRTシステムの裏にある本当のコスト',
    'map.markers.taiwanPrehistoricCulture.title':
      '台湾教育制度：共通入試の地獄から多元選抜の迷宮までの島の実験',
    'map.markers.taiwanPrehistoricCulture.desc':
      '台湾は30年かけて共通入試制度を壊そうとしたが、最新の分科測験で予備校の入塾が倍増した。受験圧力と教育の公平性の間で、この島はいかに社会実験を繰り返してきたか？',
    'map.markers.taiwanIndigenousHistory.title': '台湾バイク文化',
    'map.markers.taiwanIndigenousHistory.desc':
      'バイク密度が世界トップクラスの島嶼王国、通勤手段からライフスタイルへの文化的変遷',
    'map.markers.taiwanMilitaryHistory.title': '台湾の騎楼文化と街並み',
    'map.markers.taiwanMilitaryHistory.desc':
      '風雨をしのぐ生活の回廊、バイク・屋台・人情味が織りなす台湾の街頭の記憶',
    'map.markers.taiwanWomenHistory.title': 'ナイトライフとKTV文化',
    'map.markers.taiwanWomenHistory.desc':
      'カラオケの個室から深夜食堂まで、24時間眠らない島のナイトライフ',
    'map.markers.taiwanEducationHistory.title':
      '宗教と民間信仰：恐怖管理から信仰帝国へ',
    'map.markers.taiwanEducationHistory.desc':
      '台湾は世界最高の廟宇密度を誇りながら、宗教の自由度でも世界一——この矛盾の裏に17世紀の軍事移民の生存知恵が隠されている',
    'map.markers.taiwanReligiousHistory.title': '温泉文化',
    'map.markers.taiwanReligiousHistory.desc':
      '軍事療養施設から世界三大泥温泉の一つへ：台湾が偶然にして温泉王国になった物語',
    'map.markers.taiwanMediaHistory.title': '台湾原住民族の音楽伝統',
    'map.markers.taiwanMediaHistory.desc':
      '台湾16の原住民族の豊かな音楽文化を探る——古調の詠唱から伝統楽器まで、数千年の文化継承を見届ける',
    'map.markers.badmintonChampions.title':
      '台湾楽器製造業：后里のサクソフォンから世界の音楽工場へ',
    'map.markers.badmintonChampions.desc':
      '台湾楽器製造業の発展を探る——后里サクソフォンの世界的地位からギターOEM王国、音楽オルゴール製造の精密工芸まで、台湾がいかにOEMから自社ブランドへ進化したか',
    'map.markers.baseballCulture.title': '台湾フォークソング運動',
    'map.markers.baseballCulture.desc':
      '「自分たちの歌を歌おう」から華語音楽シーン全体を変えるまで——1970年代、若者たちが起こした文化革命',
    'map.markers.taiwanBasketball.title':
      '台湾インディーミュージックシーンの変遷',
    'map.markers.taiwanBasketball.desc':
      'アンダーグラウンドバンドからインディーミュージックへ、台湾オルタナティブ音楽30年の発展軌跡と文化的意義を探る',
    'map.markers.marathonRunning.title':
      '台湾エレクトロニックミュージックとパーティー文化：アンダーグラウンドレイブから国際舞台へ',
    'map.markers.marathonRunning.desc':
      '1990年代のレイブパーティー文化からRoad to Ultraまで、台湾の電子音楽がアンダーグラウンドからメインストリームへ躍進し、国際的DJや独立系レーベルを育んだ軌跡',
    'map.markers.taiwanEsports.title':
      '台湾音楽フェス文化：春天吶喊から百花繚乱の若者文化へ',
    'map.markers.taiwanEsports.desc':
      '春天吶喊、海洋音楽祭から大港開唱までの台湾音楽フェスの発展を探り、それがインディーバンドのインキュベーターであり若者文化の中核的表現プラットフォームになった経緯を知る',
    'map.markers.taiwanOlympics.title': '現代台湾インディーミュージックシーン',
    'map.markers.taiwanOlympics.desc':
      'アンダーグラウンドの演奏空間から産業マトリクスまで、現代台湾インディーミュージックのエコシステムの発展と文化的影響力を分析する',
    'map.markers.taipeiCycle.title': '台湾原住民族の生態知恵と環境保全',
    'map.markers.taipeiCycle.desc':
      '台湾原住民族が数千年にわたって蓄積した伝統的生態知識と、現代の環境保全における重要な価値と実践方法を探る',
    'map.markers.taiwanBetelNutCulture.title': '台湾の山岳と登山文化',
    'map.markers.taiwanBetelNutCulture.desc':
      '268座の3,000m超の山々と百岳文化：台湾登山スポーツの発展と山岳保全の課題',
    'map.markers.taiwanElections.title': '台湾の森林生態系',
    'map.markers.taiwanElections.desc':
      '亜熱帯の海岸から高山針葉樹林まで、台湾の3,000m級の垂直落差が生む豊かな森林世界',
    'map.markers.taiwanLgbtCulture.title': '台湾の気候変動とネットゼロ転換',
    'map.markers.taiwanLgbtCulture.desc':
      '台湾が直面する気候変動の影響——極端気象の頻発から2050年ネットゼロ排出目標の政策立案まで、エネルギー転換の機会と課題を探る',
    'map.markers.taiwanMotorcycleCulture.title':
      '台湾の海洋保全：30年かけて築いた体制は、なぜサンゴの白化を救えないのか？',
    'map.markers.taiwanMotorcycleCulture.desc':
      '2020年、台湾の海域で史上最大規模のサンゴ白化が発生。小琉球から東沙環礁まで、保護区内のサンゴさえ高温で死滅した。これは何を暴露しているのか？',
    'map.markers.taipeiMrt.title': '台湾の海洋汚染対策と保全の課題',
    'map.markers.taipeiMrt.desc':
      '海洋廃棄物・乱獲・気候変動に直面し、台湾の海洋保全の現状・課題・革新的ソリューションを探る',
    'map.markers.kaohsiungMrt.title': '台湾の海洋生態',
    'map.markers.kaohsiungMrt.desc':
      'タオ族がタブーで守ってきた海域が高温と水中騒音で白化——数千年の生態知恵が現代の海洋危機に遭遇する時',
    'map.markers.taichungMrt.title': '台湾の海洋生態とサンゴ礁保全',
    'map.markers.taichungMrt.desc':
      '四方を海に囲まれた台湾は豊かな海洋生態を有する——サンゴ白化危機からクジラ・イルカ保全まで、海洋国立公園の保護成果と今後の課題を探る',
    'map.markers.taiwanTrainSystem.title': '台湾の温泉と地熱',
    'map.markers.taiwanTrainSystem.desc':
      '30年前に失敗した地熱発電所から世界唯一の北投石まで：島が地底の火を癒しとクリーンエネルギーに変える',
    'map.markers.taiwanBusSystem.title': '台湾のヤマネコ保全',
    'map.markers.taiwanBusSystem.desc':
      '全台湾で500匹にも満たない幻の猫——最後の在来ネコ科が絶滅の瀬戸際を歩む',
    'map.markers.taiwanInnovationEcosystem.title': '台湾のセンザンコウ',
    'map.markers.taiwanInnovationEcosystem.desc':
      '世界で最も密猟されている哺乳類が、台湾に安全な棲家を見つけた',
    'map.markers.taiwanMedicalSystem.title': '台湾の高山生態系と氷河期遺存種',
    'map.markers.taiwanMedicalSystem.desc':
      '台湾の3,000m以上の高山環境が持つ独特な生態系を探る——タイワンスギ・ニイタカシャクナゲから氷河期遺存種の貴重な生物多様性まで',
    'map.markers.taiwanEducationSystem.title': '台湾ツキノワグマ',
    'map.markers.taiwanEducationSystem.desc':
      '胸の白いV字が彼のサイン——台湾の山林に残る最後の王者と、まだ終わっていない保全の闘い',
    'map.markers.taiwanMusicIndustry.title': '国立公園',
    'map.markers.taiwanMusicIndustry.desc':
      '36,197km²に9つの国立公園が詰まった、密度世界一の保全の奇跡',
    'map.markers.mandarinPopMusic.title':
      '島の山と海の頂：台湾国立公園の生態と景観',
    'map.markers.mandarinPopMusic.desc':
      '台湾9つの国立公園の独特な生態系と保全価値を探る——亜熱帯海岸から高山雪線までの完全な景観',
    'map.markers.taiwaneseIndieMusic.title': '固有種',
    'map.markers.taiwaneseIndieMusic.desc':
      '台湾の豊富な固有種が示す、島嶼生物地理学の進化の奇跡と保全の重要性',
    'map.markers.taiwanRapHipHop.title': '生態多様性',
    'map.markers.taiwanRapHipHop.desc':
      '台湾の面積は地球の0.025%に過ぎないが、5万種以上の生物が生息し、森林被覆率60.71%は世界第33位',
    'map.markers.taiwanElectronicMusic.title': '台湾のクジラとイルカ',
    'map.markers.taiwanElectronicMusic.desc':
      '世界の鯨類の3分の1が生息する海域——かつての捕鯨から現在のホエールウォッチングへ、台湾はいかにして海洋生態研究の拠点に転身したか？',
    'map.markers.taiwanTraditionalMusic.title': '五月天（Mayday）',
    'map.markers.taiwanTraditionalMusic.desc':
      '師大附属高校から世界の舞台へ、華語ロックスピリットを定義し続ける永遠の少年たち',
    'map.markers.taiwanFilmIndustry.title': '伍佰',
    'map.markers.taiwanFilmIndustry.desc':
      '台湾ロックの国宝、本土ロック音楽の代名詞。「ノルウェイの森」などの作品でロックの地位を確立',
    'map.markers.newTaiwanCinema.title': '呉宝春',
    'map.markers.newTaiwanCinema.desc':
      '世界パンコンペティションのチャンピオン、ライチローズパンで世界を驚かせた。屏東の田舎から世界トップクラスのパン職人へ',
    'map.markers.taiwanDocumentary.title': '呂秀蓮',
    'map.markers.taiwanDocumentary.desc':
      '反体制活動家から副総統へ：華語圏初の女性副総統の波乱万丈の人生',
    'map.markers.taiwanAnimationIndustry.title': '幾米（ジミー・リャオ）',
    'map.markers.taiwanAnimationIndustry.desc':
      '絵本で世界を温める挿画詩人、台湾の絵本を国際舞台に押し上げた',
    'map.markers.taiwanTelevisionIndustry.title': '戴資穎（タイ・ツーイン）',
    'map.markers.taiwanTelevisionIndustry.desc':
      '214週連続世界ランキング1位の記録保持者、高雄・前鎮からオリンピック銀メダルまでの台湾バドミントン女王',
    'map.markers.taiwanOttPlatforms.title': '李昂',
    'map.markers.taiwanOttPlatforms.desc':
      '「殺夫」「迷園」の著者、台湾フェミニスト文学の先駆者',
    'map.markers.taiwanPodcastIndustry.title': '李智凱',
    'map.markers.taiwanPodcastIndustry.desc':
      '「翻滚吧！男孩」の市場カイからオリンピック銀メダルへ、台湾のあん馬プリンスの16年の体操人生',
    'map.markers.taiwanPublishing.title': '李遠哲（Yuan T. Lee）',
    'map.markers.taiwanPublishing.desc':
      '1986年ノーベル化学賞受賞者、交差分子線技術で化学動力学の新領域を開拓した台湾初のノーベル科学賞受賞者',
    'map.markers.taiwanBookstoreCulture.title': '杜聡明',
    'map.markers.taiwanBookstoreCulture.desc':
      '台湾初の医学博士、台湾近代医学の父',
    'map.markers.taiwanComicMangaIndustry.title': 'ジェレミー・リン',
    'map.markers.taiwanComicMangaIndustry.desc':
      'ハーバードの秀才からNBAチャンピオンへ、世界を席巻した「リンサニティ」を巻き起こした台湾系アメリカ人選手',
    'map.markers.taiwanGameIndustry.title': '林義傑',
    'map.markers.taiwanGameIndustry.desc':
      '陸上部に拒まれた痩せっぽちの少年から、サハラ砂漠を徒歩で横断し歴史を刻んだ極地ランナーへ',
    'map.markers.nationalPalaceMuseum.title': '林義雄',
    'map.markers.nationalPalaceMuseum.desc':
      '民主化運動の先駆者、林宅血事件の被害者、反原発第四運動のリーダー',
    'map.markers.nationalParks.title': '楊徳昌（エドワード・ヤン）',
    'map.markers.nationalParks.desc':
      '台湾ニューシネマの中核人物、カンヌ最優秀監督賞、都市の疎外を詠む詩人',
    'map.markers.taiwanGeography.title': '白先勇',
    'map.markers.taiwanGeography.desc':
      '「台北人」の著者、現代文学の巨匠にして崑曲復興の推進者',
    'map.markers.taiwanClimate.title': '盧広仲（クラウド・ルー）',
    'map.markers.taiwanClimate.desc':
      '台湾のシンガーソングライター・俳優、金曲・金鐘・金馬の三冠達成者。親しみやすい庶民的キャラクターと独特の歌唱スタイルで知られる',
    'map.markers.taiwanEcosystem.title': '荘智淵',
    'map.markers.taiwanEcosystem.desc':
      '卓球のゴッドファーザー、オリンピック4大会出場、孤独に鍛錬する孤高のヒーロー',
    'map.markers.taiwanEndangeredSpecies.title': '蔡明亮（ツァイ・ミンリャン）',
    'map.markers.taiwanEndangeredSpecies.desc':
      'ヴェネツィア金獅子賞受賞者、マレーシア華人、スロー・シネマ美学の巨匠',
    'map.markers.taiwanMarineEcology.title': '許文龍',
    'map.markers.taiwanMarineEcology.desc':
      '奇美グループ創設者。実業家・ヴァイオリニスト・芸術コレクターの三つの顔を持ち、奇美博物館を創建',
    'map.markers.taiwanBirdwatching.title': '許芳宜',
    'map.markers.taiwanBirdwatching.desc':
      '宜蘭の少女からマーサ・グラハム・ダンスカンパニーのプリンシパルへ、そして台湾に戻り拉芳舞団を設立——身体で台湾の最も力強い物語を語る',
    'map.markers.taiwanHotSprings.title':
      '頼清徳：炭鉱夫の家庭から総統府へ——公衆衛生医師の道',
    'map.markers.taiwanHotSprings.desc':
      '台湾第16代総統、中華民国憲政史上初めて副総統から立候補し当選を果たした政治家',
    'map.markers.taiwanIslands.title': '郭婞淳',
    'map.markers.taiwanIslands.desc':
      '台湾の重量挙げの女神、2021年東京オリンピック金メダリスト、59kg級で3つのオリンピック記録保持者',
    'map.markers.taiwanMountains.title': '鄧雨賢',
    'map.markers.taiwanMountains.desc':
      '台湾歌謡の父。「望春風」「雨夜花」「月夜愁」などの台湾語クラシック歌謡を作曲',
    'map.markers.taiwanRivers.title': '鍾理和',
    'map.markers.taiwanRivers.desc':
      '「原郷人」の著者、台湾文学の父、貧困と病に苦しみながらも創作を貫いた文学の闘士',
    'map.markers.taiwanCoastline.title': '陳樹菊',
    'map.markers.taiwanCoastline.desc':
      '台東の野菜売りの平凡な善行が、一生をかけて本当の豊かさとは何かを教えてくれる',
    'map.markers.taiwanForests.title': '陳水扁',
    'map.markers.taiwanForests.desc':
      '第10・11代総統、2000年初の政権交代の主役、台湾民主化の重要人物',
    'map.markers.taiwanNaturalDisasters.title': '馬英九',
    'map.markers.taiwanNaturalDisasters.desc':
      '第12・13代総統、両岸関係の雪解けの推進者、ECFA締結者',
    'map.markers.taiwanEarthquakes.title': '黄春明',
    'map.markers.taiwanEarthquakes.desc':
      '「兒子的大玩偶」「看海的日子」の著者、宜蘭郷土文学の代表的作家',
    'map.markers.taiwanTyphoons.title':
      '黄震南：蔵書界の竹野内豊と台湾文史の活水源',
    'map.markers.taiwanTyphoons.desc':
      '黄震南は台湾の文史研究者・蔵書家・作家。PTTのハンドルネームSizumaruで出発し、「活水来冊房」ページで台湾の歴史と古書文化を発信。「台湾史上最有梗的台灣史」などの著者で、蔵書界の竹野内豊と称される。嘉義六脚の書香の家庭から出発し、父子で南北分担して文献を収集、堅い台湾史を面白く親しみやすくすることに尽力している。',
    'map.markers.sunflowerMovement.title': '動物園と展示動物の倫理',
    'map.markers.sunflowerMovement.desc':
      '鉄柵の中の象からXparkのクラゲの壁まで——台湾が人と展示動物の関係を再定義しつつある',
    'map.markers.taiwanSocialMovements.title':
      '台湾原住民族の土地正義と伝統領域',
    'map.markers.taiwanSocialMovements.desc':
      '台湾原住民族の土地権利の歴史的背景・法的発展・伝統領域画定の論争・原住民族移行期正義委員会の成果を探る',
    'map.markers.taiwanMarriageEquality.title':
      '台湾の婚姻平等とジェンダー平等',
    'map.markers.taiwanMarriageEquality.desc':
      '戒厳令下の獄中囚からアジア初の同性婚法へ——一人の男性の30年の闘いがいかにしてこの島の愛の定義を書き換えたか',
    'map.markers.taiwanEnvironmentalJustice.title': '台湾の環境正義とNIMBY問題',
    'map.markers.taiwanEnvironmentalJustice.desc':
      '台湾における環境負荷の不均等な配分を探る——焼却施設・核廃棄物から石油化学産業のNIMBY紛争まで、環境的不平等と社会正義の問題を分析する',
    'map.markers.taiwanCommunityRiCulture.title': '台湾のコミュニティと里文化',
    'map.markers.taiwanCommunityRiCulture.desc':
      '最も草の根的な民主実践からコミュニティづくりの社会イノベーションまで',
    'map.markers.taiwanLongTermCare.title': '台湾の長期介護制度の発展',
    'map.markers.taiwanLongTermCare.desc':
      '世界で最も先進的な長期介護制度を擁しながら、同時に最大の目に見えない介護体系が存在する',
    'map.markers.taiwanLaborMovement.title': '環境保護と持続可能な発展',
    'map.markers.taiwanLaborMovement.desc':
      '煙突の島からネットゼロ台湾へ：40年にわたる環境運動の覚醒の道',
    'map.markers.taiwanHousingIssues.title': '社会住宅と居住の正義',
    'map.markers.taiwanHousingIssues.desc':
      '台湾がいかに社会住宅政策を通じて居住の正義を実現し、すべての人に安住の場を提供するか',
    'map.markers.taiwanHealthcareSystem.title': 'サイエンスパークの発展',
    'map.markers.taiwanHealthcareSystem.desc':
      '新竹サイエンスパークから南部サイエンスパークまで、台湾のサイエンスパークの発展と3大パークの独自のポジショニングを探る',
    'map.markers.taiwanImmigration.title': '半導体産業',
    'map.markers.taiwanImmigration.desc':
      '張忠謀の歴史的賭けから2ナノメートル時代まで：TSMCがいかに台湾を世界のテクノロジーライフラインにしたか',
    'map.markers.taiwanReligiousDiversity.title': '台湾の海岸地形と海洋景観',
    'map.markers.taiwanReligiousDiversity.desc':
      '野柳の女王頭の首は年0.2cmずつ細くなり、いつか折れる——それこそが台湾の海岸地形の宿命と美しさ',
    'map.markers.taiwanBuddhismTaoism.title': '台湾茶道と生活美学',
    'map.markers.taiwanBuddhismTaoism.desc':
      '1981年に紫藤廬が開いた夜、党外人士と文人が集って茶を嗜んだ——ここは単なる茶館ではなく、反対運動の秘密基地だった',
    'map.markers.taiwanFolkReligion.title': '台湾の選挙と政党政治',
    'map.markers.taiwanFolkReligion.desc':
      '1950年の地方議員選挙から2000年の政権交代まで、台湾がいかに投票で民主化の奇跡を書き記したか',
    'map.markers.taiwanChristianity.title': '台湾の都市発展と都市農村格差',
    'map.markers.taiwanChristianity.desc':
      '70年で農業の島から都市の島へ。六都に人口の7割が集中する光と影：繁栄する台中と衰退する雲林の残酷な対比',
    'map.markers.taiwanIslamJudaism.title': '都市の個性と地域文化',
    'map.markers.taiwanIslamJudaism.desc':
      '新北の404万人から台南の185万人まで、六都がいかに産業転換の中でそれぞれの都市キャラクターを形成してきたか',
    'map.markers.kaohsiungIncident.title': '民主化',
    'map.markers.kaohsiungIncident.desc':
      '1979年12月10日、高雄の街頭で起きた警察と市民の衝突は、やがて台湾の民主化を生んだ——しかしその代償は、どれほどの若さと自由だったのか？',
    'map.markers.wangLeeOlympicGold.title': '王齊麟と李洋（麟洋ペア）',
    'map.markers.wangLeeOlympicGold.desc':
      '中学の同級生からオリンピック金メダルへ：「麟洋ペア」が34分でストレート勝ちし中国を破り、台湾バドミントン史上初のオリンピック金メダルを刻んだ',
  },
  ko: {
    // Meta
    'map.meta.title': '대만 지도',
    'map.meta.description':
      '지도에서 현·시나 장소를 누르면 그곳에 관한 Taiwan.md 글을 바로 읽을 수 있습니다. 북부·중부·남부·동부·도서 지역별로, 또는 미식·역사·자연·문화 등 주제별로 골라 볼 수 있습니다.',

    // Hero Section
    'map.hero.kicker': 'Map View',
    'map.hero.title': '대만 지도',
    'map.hero.subtitle':
      '지도 시점으로 대만의 문화, 미식, 자연, 역사 거점을 탐색하세요.',

    // Controls - Region Filter
    'map.controls.region.title': '지역 필터',
    'map.controls.region.all': '전체',
    'map.controls.region.north': '북부',
    'map.controls.region.central': '중부',
    'map.controls.region.south': '남부',
    'map.controls.region.east': '동부',
    'map.controls.region.islands': '도서',

    // Controls - Category Filter
    'map.controls.category.title': '카테고리 필터',
    'map.controls.category.all': '전체',
    'map.controls.category.food': '🍜 미식',
    'map.controls.category.history': '📜 역사',
    'map.controls.category.nature': '🌿 자연',
    'map.controls.category.culture': '🎭 문화',
    'map.controls.category.technology': '💻 기술',
    'map.controls.category.economy': '📈 경제',
    'map.controls.category.lifestyle': '🏮 생활',
    'map.controls.category.art': '🎨 예술',
    'map.controls.category.geography': '🗺️ 지리',

    // Route Section
    'map.route.title': '🗺️ 큐레이션 루트',
    'map.route.normal-mode': '일반 모드',

    // Sidebar - Default
    'map.sidebar.default.title': '📍 대만 기사 탐색',
    'map.sidebar.default.hint':
      '지도에서 시/군이나 마커를 클릭하여 기사를 탐색하세요',

    // Sidebar - County
    'map.sidebar.county.clear': '✕ 선택 해제',
    'map.sidebar.county.articles-count': '편의 기사',
    'map.sidebar.county.no-articles': '아직 이 지역에 기사가 없습니다',

    // Sidebar - Article
    'map.sidebar.article.back': '← 뒤로',
    'map.sidebar.article.read-more': '전문 읽기 →',

    // Zoom Controls
    'map.zoom.in': '＋',
    'map.zoom.out': '－',
    'map.zoom.reset': '⌂',

    // Tooltips
    'map.tooltip.county.articles': '편의 관련 기사',
    'map.tooltip.county.click': '클릭하여 이 지역 필터링',
    'map.tooltip.marker.reading-time': '분 읽기',

    // Panel
    'map.panel.title': '대만 지식 지도',
    'map.panel.stat.points': '지식 포인트',
    'map.panel.stat.categories': '카테고리',
    'map.panel.category-distribution': '카테고리 분포',
    'map.panel.link.graph': '🕸️ 지식 그래프',
    'map.panel.link.home': '🏠 카테고리 총람',

    // Category Names (for JS usage)
    'map.category.history': '📜 역사',
    'map.category.geography': '🗺️ 지리',
    'map.category.culture': '🎭 문화',
    'map.category.food': '🍜 미식',
    'map.category.art': '🎨 예술',
    'map.category.music': '🎵 음악',
    'map.category.technology': '💻 기술',
    'map.category.nature': '🌿 자연',
    'map.category.people': '👥 인물',
    'map.category.society': '⚖️ 사회',
    'map.category.economy': '📈 경제',
    'map.category.lifestyle': '🏮 생활',

    // Additional UI text
    'map.sidebar.more-articles': '⋯그 외',
    'map.sidebar.more-articles-suffix': '편',

    // Routes
    'map.routes.nightMarkets.name': '🍜 야시장 투어',
    'map.routes.nightMarkets.description':
      '북에서 남까지, 대만을 대표하는 야시장 문화',
    'map.routes.nationalParks.name': '🏔️ 국립공원 투어',
    'map.routes.nationalParks.description':
      '해발 3,952m 고산부터 열대 산호초까지, 대만의 자연 기적',
    'map.routes.historyTrail.name': '📜 역사의 발자취',
    'map.routes.historyTrail.description':
      '네덜란드 식민 시대부터 민주화까지, 대만 400년을 걷다',
    'map.routes.oldStreets.name': '🏮 옛 거리 산책',
    'map.routes.oldStreets.description':
      '백 년 된 거리 속 대만의 기억, 건축이 곧 역사',

    'map.routes.counties22.name': '📍 22개 현·시 심층 기사',
    'map.routes.counties22.description':
      'Taiwan.md 22편의 현·시 심층 기사를 따라가며, 지롱 파일럿부터 신베이 피날레까지 — 현·시마다 하나의 핵심 모순.',
    'map.counties22.panel.title': '📍 22개 현·시 심층 기사',
    'map.counties22.panel.hint':
      '현·시 카드를 누르거나 지도에서 현·시를 클릭해 기사를 탐색하세요',
    'map.counties22.tooltip.openDeep': '클릭하여 심층 기사 열기',
    'map.counties22.deepCard.badge': '📖 22현시 시리즈 · 심층 기사',
    'map.counties22.deepCard.cta': '전문 읽기 →',

    // Night Markets Stops
    'map.stops.shilinNightMarket.name': '스린 야시장',
    'map.stops.shilinNightMarket.note':
      '대만 최대 관광 야시장, 큰 전병에 작은 전병을 싸 먹는 음식의 발상지',
    'map.stops.raoheNightMarket.name': '라오허 야시장',
    'map.stops.raoheNightMarket.note':
      '후추빵 줄서기 성지, 타이베이 사람들의 단골 야시장',
    'map.stops.ningxiaNightMarket.name': '닝샤 야시장',
    'map.stops.ningxiaNightMarket.note':
      '음식 밀도 최고, 미슐랭 추천 서민 음식 거리',
    'map.stops.fengjiaNightMarket.name': '펑자 야시장',
    'map.stops.fengjiaNightMarket.note':
      '창의 간식 실험실, 대만 야시장 혁신의 최전선',
    'map.stops.huayuanNightMarket.name': '화위안 야시장',
    'map.stops.huayuanNightMarket.note':
      '타이난 최대 야시장, 주 3일만 여는 한정판 축제',
    'map.stops.liuheNightMarket.name': '류허 야시장',
    'map.stops.liuheNightMarket.note':
      '가오슝 랜드마크 야시장, 해산물이 주인공',

    // National Parks Stops
    'map.stops.yangmingshanNationalPark.name': '양명산 국립공원',
    'map.stops.yangmingshanNationalPark.note':
      '타이베이의 뒷정원, 화산 지형과 온천 천국',
    'map.stops.tarokoNationalPark.name': '타로코 국립공원',
    'map.stops.tarokoNationalPark.note': '대리석 협곡, 세계적 지질 경관',
    'map.stops.yushanNationalPark.name': '위산(옥산) 국립공원',
    'map.stops.yushanNationalPark.note':
      '동북아시아 최고봉(3,952m), 대만의 지붕',
    'map.stops.alishanScenicArea.name': '아리산 국가풍경구',
    'map.stops.alishanScenicArea.note': '일출 운해, 신목군과 삼림철도',
    'map.stops.sunMoonLakeScenicArea.name': '르웨탄(일월담) 국가풍경구',
    'map.stops.sunMoonLakeScenicArea.note':
      '대만 최대 천연 호수, 사오족의 성스러운 호수',
    'map.stops.kentingNationalPark.name': '컨딩 국립공원',
    'map.stops.kentingNationalPark.note': '대만 최남단, 열대 산호초와 헝춘반도',

    // History Trail Stops
    'map.stops.anpingFort.name': '안핑 고성',
    'map.stops.anpingFort.note': '1624년 네덜란드인이 건설한 대만 최초의 성채',
    'map.stops.chikanTower.name': '츠칸러우(적감루)',
    'map.stops.chikanTower.note':
      '네덜란드 프로빈시아성에서 정성공 통치의 상징으로',
    'map.stops.lukang.name': '루강',
    'map.stops.lukang.note': '청대 대만 제2의 도시, 「일부이록삼맹갑」',
    'map.stops.presidentialOffice.name': '총통부(구 대만총독부)',
    'map.stops.presidentialOffice.note':
      '1919년 준공, 일제강점기 최고 권력 중심',
    'map.stops.chiangKaiShekMemorialHall.name': '중정기념당',
    'map.stops.chiangKaiShekMemorialHall.note':
      '권위주의의 상징이자 전환기 정의 논쟁의 초점',
    'map.stops.legislativeYuan.name': '입법원(해바라기 운동)',
    'map.stops.legislativeYuan.note':
      '2014년 해바라기 학생운동 현장, 대만 민주주의의 이정표',

    // Old Streets Stops
    'map.stops.dihuaStreet.name': '디화제',
    'map.stops.dihuaStreet.note': '다다오청의 심장, 건어물과 설 장터',
    'map.stops.jiufenOldStreet.name': '지우펀 옛거리',
    'map.stops.jiufenOldStreet.note':
      '광업 황금시대와 《센과 치히로의 행방불명》의 영감',
    'map.stops.lukangOldStreet.name': '루강 옛거리',
    'map.stops.lukangOldStreet.note':
      '붉은 벽돌 고택과 전통 공예의 살아있는 박물관',
    'map.stops.anpingOldStreet.name': '안핑 옛거리',
    'map.stops.anpingOldStreet.note': '대만 최초의 거리, 400년 역사가 겹겹이',
    'map.stops.qishanOldStreet.name': '치산 옛거리',
    'map.stops.qishanOldStreet.note': '바나나 왕국의 바로크 건축군',
    'map.stops.tamsuiOldStreet.name': '단수이 옛거리',
    'map.stops.tamsuiOldStreet.note': '석양, 아게이와 단수이 하구의 역사 정취',

    // Cities
    'map.city.taipei': '타이베이',
    'map.city.newTaipei': '신베이',
    'map.city.keelung': '지룽',
    'map.city.taoyuan': '타오위안',
    'map.city.hsinchu': '신주',
    'map.city.miaoli': '먀오리',
    'map.city.taichung': '타이중',
    'map.city.changhua': '장화',
    'map.city.nantou': '난터우',
    'map.city.chiayi': '자이',
    'map.city.tainan': '타이난',
    'map.city.kaohsiung': '가오슝',
    'map.city.pingtung': '핑둥',
    'map.city.yilan': '이란',
    'map.city.hualien': '화롄',
    'map.city.taitung': '타이둥',
    'map.city.penghu': '펑후',
    'map.city.kinmen': '진먼',

    // Markers
    'map.markers.founderCheYuWu.title': '창립자 — 우저위 Che-Yu Wu',
    'map.markers.founderCheYuWu.desc':
      '코드에서 시(詩)로: 한 대만 아티스트의 세계 무대 도전기',
    'map.markers.taiwanIndigenousContemporaryArt.title': '대만 원주민 현대미술',
    'map.markers.taiwanIndigenousContemporaryArt.desc':
      '전통 공예에서 현대 창작까지, 대만 원주민 예술가들이 세계 미술 무대에서 목소리를 내며 원주민 정체성과 현대미술의 대화를 재정의하다',
    'map.markers.taiwanExperimentalNewMediaArt.title':
      '대만 실험·뉴미디어 아트',
    'map.markers.taiwanExperimentalNewMediaArt.desc':
      '비디오아트에서 VR 인터랙션까지, 대만 뉴미디어 아트의 혁신적 발전과 테크놀로지 아트 생태계를 탐구하다',
    'map.markers.taiwanArchitecture.title': '대만 건축',
    'map.markers.taiwanArchitecture.desc':
      '석판 가옥에서 초고층 빌딩까지: 한 섬의 건축 시간 여행',
    'map.markers.taiwanNewMediaArt.title': '대만 뉴미디어 아트',
    'map.markers.taiwanNewMediaArt.desc': '대만의 문화와 이야기를 탐험하세요',
    'map.markers.taiwanWatercolorCenturyEvolution.title':
      '대만 수채화 100년의 변천',
    'map.markers.taiwanWatercolorCenturyEvolution.desc':
      '일제강점기 이시카와 킨이치로의 계몽에서 현대 젠중웨이의 국제적 명성까지, 대만 수채화는 100년을 걸어 아시아에서 가장 활발한 수채화 창작 거점이 되었다.',
    'map.markers.taiwanModernPoetry.title': '대만 현대시',
    'map.markers.taiwanModernPoetry.desc':
      '세 개의 서재에서 출발한 모더니즘 실험이 어떻게 가장 토착적인 시 혁명을 탄생시켰는가',
    'map.markers.taiwanContemporarySculpture.title': '대만 현대 조각의 발전',
    'map.markers.taiwanContemporarySculpture.desc':
      '양잉펑, 주밍에서 신세대까지, 대만 조각예술의 진화 궤적과 창작 정신을 탐구하다',
    'map.markers.taiwanCuratorsArtCulture.title':
      '대만 큐레이터와 예술문화 구축',
    'map.markers.taiwanCuratorsArtCulture.desc':
      '독립 큐레이팅에서 미술관 체계까지, 대만 큐레이터들이 현대미술의 문화 담론과 국제 대화를 어떻게 구축하는가',
    'map.markers.newMediaArt.title': '뉴미디어 아트',
    'map.markers.newMediaArt.desc':
      '대만 디지털 아트의 선구적 탐구, 실험실에서 국제 무대까지 기술과 인문의 융합',
    'map.markers.contemporaryTaiwanLiterature.title': '현대 대만 문학',
    'map.markers.contemporaryTaiwanLiterature.desc':
      '대만의 문화와 이야기를 탐험하세요',
    'map.markers.taiwanContemporaryArt.title': '대만 현대미술',
    'map.markers.taiwanContemporaryArt.desc':
      '타이베이시립미술관에서 베니스비엔날레 대만관까지, 대만 현대미술의 글로벌 무대에서의 독특한 위치',
    'map.markers.kinmenGuesthouseMuseum.title': '진마빈관 현대미술관',
    'map.markers.kinmenGuesthouseMuseum.desc':
      '이별과 재회를 목격한 냉전 군사 역참, 20년간 잠들어 있다가 부녀에 의해 깨어나 《론리플래닛》이 추천한 가오슝 최고의 미술관이 되다.',
    'map.markers.renjianMagazine.title': '인간잡지',
    'map.markers.renjianMagazine.desc':
      '47호, 4년, 사진과 글로 일으킨 조용한 혁명 — 대만 르포르타주 문학의 출발점',
    'map.markers.taiwanIndigenousCulture.title': '대만 원주민 문화',
    'map.markers.taiwanIndigenousCulture.desc':
      '16개 부족의 다양한 전통에서 현대 예술 부흥까지, 대만 원주민 문화의 깊은 저력과 현대적 변용을 탐구하다',
    'map.markers.taiwan16IndigenousTribes.title': '대만 원주민 16족 문화 지도',
    'map.markers.taiwan16IndigenousTribes.desc':
      '대만 16개 원주민족의 분포 지역, 언어 체계, 주요 축제 및 현대 창작 발전을 탐구하며 대만 원주민의 다채로운 문화적 면모를 이해하다',
    'map.markers.taiwanNightMarketCulture.title':
      '대만 야시장 문화와 길거리 음식',
    'map.markers.taiwanNightMarketCulture.desc':
      '대만 야시장 문화의 형성 배경과 독특한 매력, 그리고 대표적인 길거리 음식의 역사적 이야기와 문화적 의미를 깊이 탐구하다',
    'map.markers.taiwanSensibilityKoreanPerspective.title':
      '대만감성: 한국인이 바라본 대만식 미학',
    'map.markers.taiwanSensibilityKoreanPerspective.desc':
      'K-pop 뮤직비디오에서 서울 북페어까지, 「대만감성」이 어떻게 대만의 일상 풍경을 아시아에서 가장 매력적인 미학 상징으로 만들었는가',
    'map.markers.taiwanCulturalCreativeParks.title': '대만 문화창의원구 발전',
    'map.markers.taiwanCulturalCreativeParks.desc':
      '오래된 건물 활성화에서 크리에이티브 클러스터까지, 대만 문화창의원구의 발전 과정과 혁신 모델',
    'map.markers.taiwanOldStreetCulture.title': '대만 옛거리 문화와 상업 지구',
    'map.markers.taiwanOldStreetCulture.desc':
      '청대 항구의 번영에서 일제 바로크 양식 건물까지, 대만 옛거리는 벽돌과 기와로 쓴 서민의 역사',
    'map.markers.taiwanTeaCeremonyLifeAesthetics.title':
      '대만 다도와 생활 미학',
    'map.markers.taiwanTeaCeremonyLifeAesthetics.desc':
      '공부차(功夫茶)에서 다석(茶席) 미학까지, 대만이 동양 차 문화와 현지 생활 미학을 어떻게 융합 혁신하는가를 탐구하다',
    'map.markers.taiwanStreetArtGraffiti.title':
      '대만 스트리트 아트와 그래피티 문화',
    'map.markers.taiwanStreetArtGraffiti.desc':
      '지하 그래피티에서 합법 벽화까지, 도시의 벽이 어떻게 대만 예술가들의 창작 무대가 되었는가',
    'map.markers.taiwanIncenseMakingCulture.title':
      '대만 제향(製香) 문화와 향의 고향',
    'map.markers.taiwanIncenseMakingCulture.desc':
      '자이 윈샤오 마을의 백 년 향 제조 기술에서 대만 전역에 퍼진 제향 산업까지 — 경건함, 장인 정신, 인내에 관한 오래된 직업',
    'map.markers.taiwanHomophoneTaboos.title':
      '대만 동음이의어 금기 문화: 왜 「4」 때문에 건물 층수를 건너뛰는가?',
    'map.markers.taiwanHomophoneTaboos.desc':
      '병원에 4층이 없는 것부터 번호판 8888이 천문학적 가격에 거래되는 것까지, 대만인의 동음이의어 민감도는 세계 최고 수준',
    'map.markers.hakkaCultureLanguage.title': '하카(객가) 문화와 언어',
    'map.markers.hakkaCultureLanguage.desc':
      '경경정신(硬頸精神)과 천천일(天穿日): 대만 하카인의 문화 전승과 현대 부흥',
    'map.markers.ethnicGroupsTaiwan.title':
      '민족집단(민남·하카·원주민·외성인·신주민)',
    'map.markers.ethnicGroupsTaiwan.desc':
      '대만의 민족적 다양성은 역사적 발전의 결과일 뿐만 아니라, 현대 대만 사회를 이해하는 핵심이다. 이러한 다원적 공존 구조는 대만 문화 창의력의 원천이자 민주 정치 발전의 중요한 토대이다. 각 민족의 문화적 특색을 존중하면서 공동의 대만 정체성을 구축하는 것은 대만 사회가 계속 직면하는 중요한 과제이다.',
    'map.markers.chinaSteel.title':
      '중강(中鋼): 철두 부장과 10대 건설의 철강 전설',
    'map.markers.chinaSteel.desc':
      '자오야오둥이 유럽·미국과의 협상으로 기술을 획득하고, 가오슝 샤오강에서 첫 흰 연기가 피어오르기까지, 중강은 50년에 걸쳐 대만 중공업의 기둥을 세웠다 — 10대 건설의 가장 빛나는 보석',
    'map.markers.taiwanCement.title':
      '대만시멘트(台泥): 대만 최초 상장기업의 친환경 전환 전설',
    'map.markers.taiwanCement.desc':
      '1962년 대만증권거래소가 이 회사를 위해 탄생했고, 주식 코드 1101은 대만 주식의 기원을 상징한다. 구씨 가문 3대 76년 경영을 거쳐 대만시멘트는 시멘트 가마로 대만 건설 기적을 목격했고, 이제 탄소중립 시대를 맞아 친환경 기업으로 전환 중이다',
    'map.markers.tsmc.title': '대만 기업: TSMC',
    'map.markers.tsmc.desc':
      '글로벌 파운드리 업계의 선두주자, 인류 디지털 문명의 핵심 생명선을 쥐고 있다',
    'map.markers.chimeiCorporation.title':
      '치메이실업: 쉬원룽의 아크릴 왕국과 박물관의 꿈',
    'map.markers.chimeiCorporation.desc':
      '1960년 타이난 런더의 작은 공장에서 출발해, 쉬원룽은 평생에 걸쳐 아시아 최대 ABS 소재 왕국을 건설하고, 치메이박물관을 세워 사회에 환원했다 — 대만 기업이 상업적 성공과 인문적 관심을 양립할 수 있음을 증명하다',
    'map.markers.acer.title': '에이서 그룹 (Acer) - PC 산업 혁명의 선구자',
    'map.markers.acer.desc':
      '대만 타오위안에서 출발한 개인용 컴퓨터 선구자, 「멀티 브랜드·멀티 채널」 비즈니스 모델을 창조해 글로벌 PC 산업 변혁의 엔진이 되다',
    'map.markers.giantBicycles.title': '대만 기업: 자이언트(거대기계)',
    'map.markers.giantBicycles.desc':
      '미국 대기업에 버림받은 OEM 종속에서 글로벌 자전거 기술 표준을 정하는 숨겨진 제국으로',
    'map.markers.quantaComputer.title': '대만 기업: 광달전뇌(Quanta)',
    'map.markers.quantaComputer.desc':
      '공장 화재에서 글로벌 노트북 왕까지, 린바이리는 어떻게 AI 시대의 새 제국을 세웠나?',
    'map.markers.aseGroup.title': '대만 기업: ASE그룹(일월광반도체)',
    'map.markers.aseGroup.desc':
      '세계 최대 반도체 패키징·테스트 기업 — 건설회사 사장이 왜 반도체에 뛰어들었나?',
    'map.markers.esunFinancialHolding.title': '대만 기업: E.SUN금융지주',
    'map.markers.esunFinancialHolding.desc':
      '신용카드 전문은행에서 디지털 금융 선구자로, 43세 최연소 금융지주 사장의 돌파 이야기',
    'map.markers.changChunPetrochemical.title': '대만 기업: 장춘석화',
    'map.markers.changChunPetrochemical.desc':
      '1949년 타이난 작은 공장에서 글로벌 화학 대기업으로, 「상장 안 하고 대출 안 하는」 히든 챔피언의 이야기',
    'map.markers.formosaPlasticsGroup.title': '대만 기업: 에버그린해운',
    'map.markers.formosaPlasticsGroup.desc':
      '중고선 한 척에서 글로벌 해운 제국까지, 장룽파의 블루오션 전설',
    'map.markers.taipeiFubon.title': '야시장 경제학: 브랜드 없는 상업 기적',
    'map.markers.taipeiFubon.desc':
      '대만 야시장이 어떻게 브랜드도, 인테리어도, 고정 장소도 없이 연간 약 4천억 대만달러의 경제 기적을 창출하는지 탐구하다',
    'map.markers.taiwan7Eleven.title': '대만 커피 산업',
    'map.markers.taiwan7Eleven.desc':
      '일제강점기 재배 기원에서 Simple Kaffa 세계 챔피언까지, 대만 커피의 100년 진화사',
    'map.markers.taiwanHighSpeedRail.title': '대만 지방 별미 지도',
    'map.markers.taiwanHighSpeedRail.desc':
      '지룽 먀오커우의 딩볜후에서 핑둥 완롼의 족발까지, 신주 공환에서 타이둥 석가까지, 각 도시마다 고유한 맛의 DNA가 있다. 현지인의 발걸음을 따라 대만 22개 시·군의 대표 지방 별미를 탐험하며, 섬의 가장 진정한 서민 문화를 음미하자.',
    'map.markers.taiwanSemiconductorIndustry.title':
      '대만 가정식: 사라져 가는 맛의 기억',
    'map.markers.taiwanSemiconductorIndustry.desc':
      '자이의 박하닭에서 남은 국까지, 할머니의 솜씨 좋은 요리는 가족의 기억을 담고 있지만 시대 변화 속에서 점점 사라지고 있다',
    'map.markers.taiwanBankingSystem.title': '대만 신주민 음식 퓨전',
    'map.markers.taiwanBankingSystem.desc':
      '태국식 새콤매운맛이 대만식 달콤짭짤함을 만나고, 베트남 쌀국수가 대만식 루웨이를 만나고, 인도네시아 향신료가 현지 식재료를 품을 때 — 국경을 넘는 미각의 혁명이 대만에서 조용히 진행 중이다. 신주민이 가져온 것은 고향 음식만이 아니라 대만 음식 문화를 풍요롭게 할 새로운 가능성이다.',
    'map.markers.taiwanSmes.title': '대만 과일 왕국',
    'map.markers.taiwanSmes.desc':
      '망고·리치에서 석가·왁스애플까지, 열대 과일 다양성과 농업기술 돌파의 달콤한 전설',
    'map.markers.youbikePublicBikeSystem.title': '대만 해산물 문화',
    'map.markers.youbikePublicBikeSystem.desc':
      '어항에서 바로 배송, 해산물 식당 문화, 굴전 등 해양 요리가 사면이 바다로 둘러싸인 대만의 섬 특성과 풍부한 해산물 식문화 전통을 보여준다',
    'map.markers.taiwanFoodBeverageIndustry.title': '대만 미슐랭과 파인 다이닝',
    'map.markers.taiwanFoodBeverageIndustry.desc':
      '2018년, 미슐랭 가이드의 빨간 표지에 처음으로 「TAIPEI」가 새겨지며 대만 외식산업이 공식적으로 국제 평가 체계에 진입했다. 노점에서 미슐랭 스타 레스토랑까지, 서민 음식에서 정찬까지, 대만 음식 문화는 국제 무대에서 전통과 혁신이 어우러진 매력적인 모습을 보여준다.',
    'map.markers.taiwanAgriculturalReform.title': '야시장 문화',
    'map.markers.taiwanAgriculturalReform.desc':
      '164개 등록 야시장, 타이난은 평균 3.8만 명당 야시장 하나 — 사찰 마당에서 국제 관광 명소로',
    'map.markers.taiwanTeaIndustry.title': '하카 음식 문화',
    'map.markers.taiwanTeaIndustry.desc':
      '하카인의 풍부하고 다채로운 음식 문화, 레이차의 그윽한 향에서 야생 생강꽃 종자의 산림 정취까지, 검소하고 현지 재료를 활용하는 하카인의 생활 지혜를 보여준다',
    'map.markers.taiwanFishingIndustry.title': '소고기 면',
    'map.markers.taiwanFishingIndustry.desc':
      '외성인 이민자의 향수에서 대만 국민 음식으로, 소고기 면의 문화 융합과 세계적 확산',
    'map.markers.taiwanFruitIndustry.title': '차 문화',
    'map.markers.taiwanFruitIndustry.desc':
      '대만의 전통 다예에서 현대 버블티까지의 차 문화 변천, 섬의 독특한 차 품종과 음다 문화를 보여주다',
    'map.markers.taiwanRiceVarieties.title':
      '흔들리는 섬 위에 날 수 있는 탑을 세우다',
    'map.markers.taiwanRiceVarieties.desc':
      '활성 단층에서 불과 200m, 대만인은 가장 불안정한 땅 위에 세계 최고층 빌딩을 세웠고 — 그리고 어떤 미치광이가 91분 만에 맨손으로 올라갔다.',
    'map.markers.nightMarketCulture.title':
      '대만의 5대 지형과 지리 구조: 산맥에서 평야까지의 섬 풍경',
    'map.markers.nightMarketCulture.desc':
      '대만의 독특한 지리 구조를 탐구하다, 중앙산맥에서 서부 평원까지, 이 섬의 지형 다양성을 알아보다',
    'map.markers.bubbleTeaGlobalPhenomenon.title': '대만 교통 운수 네트워크',
    'map.markers.bubbleTeaGlobalPhenomenon.desc':
      '고속철도, 지하철, 도로, 항공이 엮어내는 대만의 입체적 교통 네트워크',
    'map.markers.taiwanBeefNoodle.title': '대만 국가풍경구 시스템',
    'map.markers.taiwanBeefNoodle.desc':
      '동북각에서 컨딩까지, 대만 13개 국가풍경구가 펼치는 풍부한 자연·인문 경관',
    'map.markers.taiwanHotPotCulture.title': '대만 섬 지리 특성과 형성',
    'map.markers.taiwanHotPotCulture.desc':
      '대만의 독특한 섬 지리 특성을 탐구하다, 판구조 운동에서 지형 구조까지, 포르모사 섬의 자연의 비밀을 이해하다',
    'map.markers.taiwanFineDining.title': '대만 판구조 운동과 지진 활동',
    'map.markers.taiwanFineDining.desc':
      '유라시아판과 필리핀해판 경계에 위치한 대만의 지질 특성과 잦은 지진 활동의 원인을 탐구하다',
    'map.markers.taiwanStreetFood.title': '대만 저수지와 수자원 관리',
    'map.markers.taiwanStreetFood.desc':
      '물 부족 위기에서 저수지 퇴적까지, 대만 수자원의 도전과 남북 분배 불균형 딜레마',
    'map.markers.taiwanVegetarianCulture.title':
      '대만 하천 수계와 수문 특성: 짧고 급한 흐름과 계절 변동의 수문 지리',
    'map.markers.taiwanVegetarianCulture.desc':
      '대만의 독특한 하천 수계를 탐구하다, 줘수이시에서 가오핑시까지, 섬 지형이 어떻게 대만의 수문 특성을 형성하는지를 이해하다',
    'map.markers.taiwanCoffeeCulture.title': '대만 해안 지형과 해양 경관',
    'map.markers.taiwanCoffeeCulture.desc':
      '북부 곶-만 해안에서 동부 단층 해안까지, 대만의 풍부하고 다양한 해안 지형은 판구조 운동의 걸작을 보여준다',
    'map.markers.taiwanSnackCulture.title': '대만 온천 경관',
    'map.markers.taiwanSnackCulture.desc':
      '베이터우, 즈번, 자오시 — 온천 문화와 지질과학의 아름다운 만남',
    'map.markers.taiwanSeafoodCulture.title': '대만 생태다양성 핫스팟',
    'map.markers.taiwanSeafoodCulture.desc':
      '3.6만km² 섬에 5.9만 종의 생물이 밀집, 밀도가 세계 평균의 100배',
    'map.markers.taiwanPineappleCake.title': '대만 농업 경관과 산업 분포',
    'map.markers.taiwanPineappleCake.desc':
      '북에서 남으로의 농업 경관 변화가 보여주는, 「대만 곡창」에서 「정밀 농업」으로의 전환',
    'map.markers.taiwanPorkRibSoup.title': '대만 도시 발전과 도농 격차',
    'map.markers.taiwanPorkRibSoup.desc':
      '6개 직할시 체제 하의 대만 도농 불균형 발전, 농업 대만에서 도시 대만으로의 공간 변화',
    'map.markers.taiwanOysterOmelette.title': '지형과 지질',
    'map.markers.taiwanOysterOmelette.desc':
      '600만 년 된 섬에 2억 년의 고대 기억이 숨어 있다 — 세계에서 가장 젊은 조산대와 가장 격렬한 판 충돌의 기적',
    'map.markers.taiwanBreakfastCulture.title': '도시 특성과 지역 문화',
    'map.markers.taiwanBreakfastCulture.desc':
      '타이베이의 국제 대도시 성격에서 타이난의 고도(古都) 풍정까지, 대만 각 도시가 어떻게 독특한 지역 정체성을 형성하는가',
    'map.markers.taiwanConvenienceStoreFood.title':
      '도서(離島)와 해양 문화: 세계 최고 석호(石滬) 밀도에서 날치철 생태 법칙까지',
    'map.markers.taiwanConvenienceStoreFood.desc':
      '전 세계 석호가 600기도 안 되는데, 펑후에만 574기가 있다. 날치를 전문으로 잡는 섬 민족이 금기를 가장 정밀한 해양 자원 관리 시스템으로 바꾸다',
    'map.markers.dutchSpanishColonialPeriod.title':
      '2·28 사건과 백색 테러: 대만 권위주의 통치 하의 트라우마와 기억',
    'map.markers.dutchSpanishColonialPeriod.desc':
      '1947년 2·28 사건에서 38년간의 계엄 체제까지, 대만은 권위주의 통치 하의 국가 폭력을 겪었고, 계엄 해제 후에야 비로소 역사적 트라우마에 직면하고 전환기 정의를 추진하기 시작했다.',
    'map.markers.zhengDynastyPeriod.title': '대만해협 위기와 양안관계 발전',
    'map.markers.zhengDynastyPeriod.desc':
      '대만해협 3대 위기와 양안관계 70여 년의 발전 과정을 돌아보며, 대만해협 정세의 역사적 맥락과 현대적 도전을 이해하다',
    'map.markers.qingDynastyTaiwanHistory.title': '대만 해양 무역사',
    'map.markers.qingDynastyTaiwanHistory.desc':
      '대항해시대의 대만, 국제 무역 중심에서 해적 왕국까지의 흥망성쇠 전설',
    'map.markers.japaneseColonialRule.title': '대만 쥐안춘(眷村) 역사',
    'map.markers.japaneseColonialRule.desc':
      '미얀마 고군에서 대나무 울타리 왕국까지, 120만 명의 대이동이 어떻게 「가정」을 재정의했는가',
    'map.markers.februaryTwentyEightIncident.title': '대만 철도사',
    'map.markers.februaryTwentyEightIncident.desc':
      '청대 류밍촨에서 일제 종관선, 고속철도까지, 철도가 어떻게 대만의 도시 발전과 문화적 기억을 형성했는가',
    'map.markers.martialLawPeriod.title': '국민정부 대만 이전과 전후 재건',
    'map.markers.martialLawPeriod.desc':
      '1949년 국민정부의 대만 이전 역사적 배경, 과정, 영향, 그리고 전후 대만의 정치·경제·사회 재건을 탐구하다',
    'map.markers.democratization.title': '일제강점기',
    'map.markers.democratization.desc':
      '1895-1945년 일본의 대만 50년 통치, 전면적 근대화 건설과 제도적 관리를 가져온 동시에 동화정책을 시행하여 대만 사회 발전에 깊은 영향을 미치다',
    'map.markers.taiwanIndependenceMovement.title': '청(清) 통치 시기',
    'map.markers.taiwanIndependenceMovement.desc':
      '1683-1895년 청조의 대만 약 212년 통치, 소극적 통치에서 적극적 건설로, 현대 대만 행정구역과 한인 사회의 기초를 다지다',
    'map.markers.taiwanChinaRelations.title': '네덜란드·에스파냐·정(鄭)씨 시기',
    'map.markers.taiwanChinaRelations.desc':
      '대만 역사상 최초의 체계적 식민 통치, 네덜란드의 열란차성 건설에서 정성공의 대만 개척까지, 한인 이주와 정치 제도의 기초를 닦다',
    'map.markers.taiwanUsRelations.title': '편의점 문화',
    'map.markers.taiwanUsRelations.desc':
      '밀도 세계 1위의 대만 편의점, 소매점에서 국가 전체의 생활 운영 시스템으로 어떻게 변모했는가',
    'map.markers.taiwanInternationalStatus.title': '대만 교통 시스템',
    'map.markers.taiwanInternationalStatus.desc':
      '고속철도 90분 남북 종단, 지하철이 도시의 혈맥을 촘촘히 잇고, 오토바이가 골목을 누비다',
    'map.markers.taiwanHistoricalFigures.title': '대만 편의점 문화',
    'map.markers.taiwanHistoricalFigures.desc':
      '밀도 세계 1위 편의점 왕국, 세븐일레븐과 패밀리마트의 현지화 혁신이 현대 생활방식을 재정의하다',
    'map.markers.taiwanPoliticalFigures.title': '대만 공원과 일상 여가',
    'map.markers.taiwanPoliticalFigures.desc':
      '새벽 태극권에서 저녁 산책까지 — 세대를 초월한 사교 공간으로서의 대만 공원 문화 관찰',
    'map.markers.kuomintangHistory.title': '대만 커피 문화',
    'map.markers.kuomintangHistory.desc':
      '독립 카페 밀도 세계 3위권, 아리산 원두에서 카페 재택근무까지의 섬 커피학',
    'map.markers.democraticProgressivePartyHistory.title':
      '쓰레기차를 쫓는 섬: 대만의 쓰레기 위기에서 재활용 기적까지',
    'map.markers.democraticProgressivePartyHistory.desc':
      '1990년대 400곳의 거의 포화된 매립지가 있어 국제 언론에 「쓰레기 섬」이라 불렸던 곳이 베토벤 음악으로 2,300만 명에게 매일 쓰레기차를 쫓게 했고, 30년 후 재활용률은 대부분의 유럽 국가를 넘어섰다',
    'map.markers.taipeiHistory.title':
      '대만 지하철 발전사: 피와 돈으로 쓴 도시 진화론',
    'map.markers.taipeiHistory.desc':
      '209톤 철골보가 하늘에서 떨어져 4명의 생명을 앗아가고, 16.4억 배상금, 타이베이 지하철 본업은 아직도 적자 — 대만 지하철 뒤의 진짜 비용',
    'map.markers.taiwanPrehistoricCulture.title':
      '대만 교육 제도: 수능 지옥에서 다원 미로까지의 섬 실험',
    'map.markers.taiwanPrehistoricCulture.desc':
      '대만은 30년간 수능 제도를 깨뜨리려 했지만, 최신 분과시험은 재수학원 등록을 두 배로 늘렸다. 하나의 섬이 입시 압박과 교육 형평성 사이에서 어떻게 반복적으로 사회 실험을 하는가?',
    'map.markers.taiwanIndigenousHistory.title': '대만 오토바이 문화',
    'map.markers.taiwanIndigenousHistory.desc':
      '오토바이 밀도가 세계 최고 수준인 섬 왕국, 통근 수단에서 생활양식으로의 문화적 진화',
    'map.markers.taiwanMilitaryHistory.title':
      '대만 아케이드(기러우) 문화와 거리 풍경',
    'map.markers.taiwanMilitaryHistory.desc':
      '비바람을 피하는 생활 통로, 오토바이·노점·인정(人情)이 어우러진 대만 거리의 기억',
    'map.markers.taiwanWomenHistory.title': '나이트라이프와 KTV 문화',
    'map.markers.taiwanWomenHistory.desc':
      '전궤(錢櫃) 룸에서 심야 식당까지, 24시간 잠들지 않는 섬의 야간 생활',
    'map.markers.taiwanEducationHistory.title':
      '종교와 민간 신앙: 두려움의 관리에서 신앙 제국까지',
    'map.markers.taiwanEducationHistory.desc':
      '대만은 세계 최고 사찰 밀도를 가졌으면서도 종교 자유 세계 1위 — 이 모순 뒤에는 17세기 군사 이민자들의 생존 지혜가 숨어 있다',
    'map.markers.taiwanReligiousHistory.title': '온천 문화',
    'map.markers.taiwanReligiousHistory.desc':
      '군사 요양에서 세계 3대 머드 온천까지: 대만이 우연히 온천 왕국이 된 이야기',
    'map.markers.taiwanMediaHistory.title': '대만 원주민 음악 전통',
    'map.markers.taiwanMediaHistory.desc':
      '대만 16족 원주민의 풍부한 음악 문화를 탐구하다, 고대 노래에서 전통 악기까지, 수천 년 문화 전승을 목격하다',
    'map.markers.badmintonChampions.title':
      '대만 악기 제조업: 허우리 색소폰에서 글로벌 음악 팩토리까지',
    'map.markers.badmintonChampions.desc':
      '대만 악기 제조업의 발전 과정을 탐구하다, 허우리 색소폰의 글로벌 지배에서 기타 OEM 왕국, 오르골 제조의 정밀 공예까지 — 대만이 어떻게 OEM에서 자체 브랜드로 나아갔는가',
    'map.markers.baseballCulture.title': '대만 포크송(민가) 운동',
    'map.markers.baseballCulture.desc':
      '「자기 노래를 부르자」에서 화어(華語) 음악계 전체를 바꾸기까지 — 1970년대 젊은이들의 문화 혁명',
    'map.markers.taiwanBasketball.title': '대만 인디 음악 씬의 변천',
    'map.markers.taiwanBasketball.desc':
      '언더그라운드 밴드에서 인디 음악까지, 대만 비주류 음악 30년 발전 궤적과 문화적 의미를 탐구하다',
    'map.markers.marathonRunning.title':
      '대만 전자음악과 파티 문화: 언더그라운드 레이브에서 국제 무대로',
    'map.markers.marathonRunning.desc':
      '1990년대 레이브 파티 문화에서 Road to Ultra 일렉 페스티벌까지, 대만 전자음악이 어떻게 언더에서 메인스트림으로, 세계적 DJ와 독립 일렉 레이블을 키워냈는가',
    'map.markers.taiwanEsports.title':
      '대만 음악 페스티벌 문화: 춘텐나한에서 전국에 만개한 청년문화의 매개체',
    'map.markers.taiwanEsports.desc':
      '대만 음악 페스티벌의 발전을 탐구하다, 춘텐나한·해양음악제에서 다강카이창까지, 인디 밴드의 인큐베이터이자 청년 문화 표현의 핵심 플랫폼이 되기까지',
    'map.markers.taiwanOlympics.title': '현대 대만 인디 음악 씬',
    'map.markers.taiwanOlympics.desc':
      '언더그라운드 공연에서 산업 매트릭스까지, 현대 대만 인디 음악 생태계의 발전 맥락과 문화적 영향력을 분석하다',
    'map.markers.taipeiCycle.title': '대만 원주민 생태 지혜와 환경 보전',
    'map.markers.taipeiCycle.desc':
      '대만 원주민족이 수천 년에 걸쳐 축적한 전통 생태 지식과 현대 환경 보전에서의 중요한 가치 및 실천 방식을 탐구하다',
    'map.markers.taiwanBetelNutCulture.title': '대만 산악과 등산 문화',
    'map.markers.taiwanBetelNutCulture.desc':
      '3천 미터 이상 산 268좌와 백악(百岳) 문화: 대만 등산 스포츠의 발전과 산악 보전 과제',
    'map.markers.taiwanElections.title': '대만 삼림 생태계',
    'map.markers.taiwanElections.desc':
      '아열대 해안에서 고산 침엽수림까지, 3,000m 수직 낙차 속 대만의 풍부한 삼림 세계',
    'map.markers.taiwanLgbtCulture.title': '대만 기후변화와 넷제로 전환',
    'map.markers.taiwanLgbtCulture.desc':
      '대만이 직면한 기후변화 충격 — 극한 기후 빈발에서 2050 넷제로 탄소배출 목표의 정책 수립까지, 에너지 전환 과정의 기회와 도전을 탐구하다',
    'map.markers.taiwanMotorcycleCulture.title':
      '대만 해양 보전: 왜 30년에 걸쳐 구축한 체계가 산호 백화를 막지 못하는가?',
    'map.markers.taiwanMotorcycleCulture.desc':
      '2020년, 대만 해역은 역사상 최대 규모의 산호 백화를 경험했다. 샤오류추에서 둥사환초까지, 보호구역 내의 산호까지 고온에서 죽었다. 이것이 드러내는 문제는 무엇인가?',
    'map.markers.taipeiMrt.title': '대만 해양 오염 대책과 보전 과제',
    'map.markers.taipeiMrt.desc':
      '해양 쓰레기, 남획, 기후변화에 직면하여, 대만 해양 보전의 현황·과제·혁신적 해결책을 탐구하다',
    'map.markers.kaohsiungMrt.title': '대만 해양 생태',
    'map.markers.kaohsiungMrt.desc':
      '다우족이 금기로 지켜온 해역이 고온과 수중 소음에 백화되다: 수천 년 생태 지혜가 현대 해양 위기와 만날 때',
    'map.markers.taichungMrt.title': '대만 해양 생태와 산호초 보전',
    'map.markers.taichungMrt.desc':
      '사면이 바다인 대만은 풍부한 해양 생태를 보유하고 있다. 산호초 백화 위기에서 고래·돌고래 보전까지, 해양 국립공원의 보호 성과와 미래 과제를 탐구하다',
    'map.markers.taiwanTrainSystem.title': '대만 온천과 지열',
    'map.markers.taiwanTrainSystem.desc':
      '30년 전 실패한 지열 발전소에서 세계 유일의 베이터우석(北投石)까지: 한 섬이 어떻게 지하의 불을 치유와 녹색 전력으로 바꾸는가',
    'map.markers.taiwanBusSystem.title': '대만 삵 보전',
    'map.markers.taiwanBusSystem.desc':
      '대만에 500마리도 남지 않은 유령 고양이 — 마지막 토종 고양이과 동물이 멸종 가장자리를 걷다',
    'map.markers.taiwanInnovationEcosystem.title': '대만 천산갑',
    'map.markers.taiwanInnovationEcosystem.desc':
      '세계에서 가장 많이 밀거래되는 포유류가 대만에서 안전한 보금자리를 찾다',
    'map.markers.taiwanMedicalSystem.title': '대만 고산 생태계와 빙하 잔존종',
    'map.markers.taiwanMedicalSystem.desc':
      '해발 3,000m 이상 고산 환경의 독특한 생태계를 탐구하다, 대만삼나무와 옥산진달래에서 빙하시대 잔존종의 귀중한 생물다양성까지',
    'map.markers.taiwanEducationSystem.title': '대만 흑곰',
    'map.markers.taiwanEducationSystem.desc':
      '가슴의 흰 V자가 시그니처 — 대만 산림의 마지막 왕자와 아직 끝나지 않은 보전 전쟁',
    'map.markers.taiwanMusicIndustry.title': '국립공원',
    'map.markers.taiwanMusicIndustry.desc':
      '36,197km²에 국립공원 9곳을 품다, 밀도 세계 1위의 보전 기적',
    'map.markers.mandarinPopMusic.title': '대만 국립공원',
    'map.markers.mandarinPopMusic.desc':
      '대만 9개 국립공원의 독특한 생태계와 보전 가치를 탐구하다, 아열대 해안에서 고산 설선까지의 완전한 경관',
    'map.markers.taiwaneseIndieMusic.title': '고유종',
    'map.markers.taiwaneseIndieMusic.desc':
      '대만의 풍부한 고유종 생물, 섬 생물지리학의 진화적 기적과 보전의 중요성을 보여주다',
    'map.markers.taiwanRapHipHop.title': '생태 다양성',
    'map.markers.taiwanRapHipHop.desc':
      '대만은 지구 면적의 0.025%에 불과하지만 5만 종 이상의 생물을 보유, 삼림 피복률 60.71%로 세계 33위',
    'map.markers.taiwanElectronicMusic.title': '대만의 고래와 돌고래',
    'map.markers.taiwanElectronicMusic.desc':
      '전 세계 고래류의 3분의 1이 서식하는 곳 — 과거 포경에서 현재 고래 관광까지, 대만은 어떻게 해양 생태 연구 거점으로 변신했는가?',
    'map.markers.taiwanTraditionalMusic.title': '오월천(메이데이)',
    'map.markers.taiwanTraditionalMusic.desc':
      '스다부중(사범대부속고)에서 세계 무대까지, 화어 록의 정신을 정의하는 영원한 소년들',
    'map.markers.taiwanFilmIndustry.title': '우바이(伍佰)',
    'map.markers.taiwanFilmIndustry.desc':
      '대만 록의 국보, 토착 록 음악의 대명사, 《노르웨이의 숲》 등으로 록 지위를 확립하다',
    'map.markers.newTaiwanCinema.title': '우바오춘(吳寶春)',
    'map.markers.newTaiwanCinema.desc':
      '세계제빵대회 챔피언, 리치 장미빵으로 세계를 놀라게 하다, 핑둥 시골에서 세계 정상급 제빵 장인으로',
    'map.markers.taiwanDocumentary.title': '뤼슈렌(呂秀蓮)',
    'map.markers.taiwanDocumentary.desc':
      '반란죄범에서 부총통으로: 중화권 최초의 여성 부총통의 전설적 인생',
    'map.markers.taiwanAnimationIndustry.title': '지미(幾米)',
    'map.markers.taiwanAnimationIndustry.desc':
      '그림책으로 세상을 따뜻하게 하는 일러스트 시인, 대만 그림책을 국제 무대에 올리다',
    'map.markers.taiwanTelevisionIndustry.title': '다이쯔잉(戴資穎)',
    'map.markers.taiwanTelevisionIndustry.desc':
      '214주 세계 랭킹 1위 기록 보유자, 가오슝 첸전에서 올림픽 은메달까지의 대만 배드민턴 여왕',
    'map.markers.taiwanOttPlatforms.title': '리앙(李昂)',
    'map.markers.taiwanOttPlatforms.desc':
      '《살부(殺夫)》《미원(迷園)》의 작가, 대만 페미니즘 문학의 선구자',
    'map.markers.taiwanPodcastIndustry.title': '리즈카이(李智凱)',
    'map.markers.taiwanPodcastIndustry.desc':
      '《뒤집어라! 소년들》의 시장 카이에서 올림픽 은메달까지, 대만 안마(鞍馬) 왕자의 16년 텀블링 인생',
    'map.markers.taiwanPublishing.title': '리위안저(李遠哲)',
    'map.markers.taiwanPublishing.desc':
      '1986년 노벨 화학상 수상자, 교차분자빔 기법으로 화학 동력학의 새 영역을 개척, 대만 최초의 노벨 과학상 수상자',
    'map.markers.taiwanBookstoreCulture.title': '두총밍(杜聰明)',
    'map.markers.taiwanBookstoreCulture.desc':
      '대만 최초의 의학 박사, 대만 현대 의학의 아버지',
    'map.markers.taiwanComicMangaIndustry.title': '제레미 린(林書豪)',
    'map.markers.taiwanComicMangaIndustry.desc':
      '하버드 수재에서 NBA 챔피언까지, 전 세계에 린사니티를 일으킨 대만계 미국인 선수',
    'map.markers.taiwanGameIndustry.title': '린이제(林義傑)',
    'map.markers.taiwanGameIndustry.desc':
      '육상부에서 거부당한 깡마른 아이에서, 사하라 사막 도보 횡단으로 역사를 만든 극지 러너로',
    'map.markers.nationalPalaceMuseum.title': '린이슝(林義雄)',
    'map.markers.nationalPalaceMuseum.desc':
      '민주운동 선구자, 린가 혈안 사건 피해자, 반핵4운동 지도자',
    'map.markers.nationalParks.title': '양더창(楊德昌)',
    'map.markers.nationalParks.desc':
      '대만 뉴시네마 운동의 핵심 인물, 칸 최우수 감독상, 도시적 소외의 시인',
    'map.markers.taiwanGeography.title': '바이셴용(白先勇)',
    'map.markers.taiwanGeography.desc':
      '《타이베이 사람들》의 작가, 현대문학 거장이자 쿤취(崑曲) 부흥 추진자',
    'map.markers.taiwanClimate.title': '루광중(盧廣仲)',
    'map.markers.taiwanClimate.desc':
      '대만 싱어송라이터·배우, 삼금(金曲·金鐘·金馬) 수상자, 소탈한 이미지와 독특한 창법으로 유명',
    'map.markers.taiwanEcosystem.title': '좡즈위안(莊智淵)',
    'map.markers.taiwanEcosystem.desc':
      '탁구의 대부, 올림픽 4회 대표, 홀로 훈련한 외로운 영웅',
    'map.markers.taiwanEndangeredSpecies.title': '차이밍량(蔡明亮)',
    'map.markers.taiwanEndangeredSpecies.desc':
      '베니스 황금사자상 수상자, 말레이시아 화인, 슬로 시네마 미학의 거장',
    'map.markers.taiwanMarineEcology.title': '쉬원룽(許文龍)',
    'map.markers.taiwanMarineEcology.desc':
      '치메이그룹 창업자, 기업인·바이올리니스트·예술 수집가의 삼중 정체성, 치메이박물관 설립자',
    'map.markers.taiwanBirdwatching.title': '쉬팡이(許芳宜)',
    'map.markers.taiwanBirdwatching.desc':
      '이란 소녀에서 마사 그레이엄 무용단 수석으로, 다시 대만으로 돌아와 라팡무용단을 창립 — 그녀는 몸으로 대만의 가장 강렬한 이야기를 말한다',
    'map.markers.taiwanHotSprings.title':
      '라이칭더: 광부 가정에서 총통부까지의 공중보건 의사',
    'map.markers.taiwanHotSprings.desc':
      '대만 제16대 총통, 중화민국 헌정사상 최초로 부총통 신분으로 출마해 당선된 정치인',
    'map.markers.taiwanIslands.title': '궈싱춘(郭婞淳)',
    'map.markers.taiwanIslands.desc':
      '대만 역도의 여신, 2021 도쿄 올림픽 금메달리스트, 59kg급 3개 올림픽 기록 보유자',
    'map.markers.taiwanMountains.title': '덩위셴(鄧雨賢)',
    'map.markers.taiwanMountains.desc':
      '대만 가요의 아버지, 《망춘풍(望春風)》《우야화(雨夜花)》《월야수(月夜愁)》 등 클래식 대만어 가요 작곡',
    'map.markers.taiwanRivers.title': '종리허(鍾理和)',
    'map.markers.taiwanRivers.desc':
      '《원향인(原鄉人)》의 작가, 대만 문학의 아버지, 가난과 병마 속에서도 창작을 고집한 문학 투사',
    'map.markers.taiwanCoastline.title': '천수주(陳樹菊)',
    'map.markers.taiwanCoastline.desc':
      '타이둥 채소 장수의 평범한 선행, 평생으로 진정한 부유함이 무엇인지 보여주다',
    'map.markers.taiwanForests.title': '천수이볜(陳水扁)',
    'map.markers.taiwanForests.desc':
      '제10·11대 총통, 2000년 최초 정권 교체의 주역, 대만 민주화의 중요 인물',
    'map.markers.taiwanNaturalDisasters.title': '마잉주(馬英九)',
    'map.markers.taiwanNaturalDisasters.desc':
      '제12·13대 총통, 양안관계 해빙의 추진자, ECFA 서명자',
    'map.markers.taiwanEarthquakes.title': '황춘밍(黃春明)',
    'map.markers.taiwanEarthquakes.desc':
      '《아들의 큰 인형》《바다를 바라보는 날》의 작가, 이란 향토문학의 대표 작가',
    'map.markers.taiwanTyphoons.title':
      '황전난: 장서계의 다케노우치 유타카이자 대만 문사(文史)의 살아 있는 샘',
    'map.markers.taiwanTyphoons.desc':
      '황전난은 대만 문사 연구가·장서가·작가로, PTT 닉네임 Sizumaru로 시작해 「활수래책방」 페이지를 운영하며 대만 역사와 헌책 문화를 공유한다. 《대만 역사상 가장 재미있는 대만사》 등의 저서가 있으며, 장서계의 다케노우치 유타카로 불린다. 자이 류자오의 서향 집안에서 출발해, 부자가 남북으로 나누어 문헌을 수집하며 진지한 대만사를 재미있고 친근하게 만드는 데 힘쓰고 있다.',
    'map.markers.sunflowerMovement.title': '동물원과 전시 동물 윤리',
    'map.markers.sunflowerMovement.desc':
      '철창 속 코끼리에서 Xpark의 해파리 벽까지 — 대만은 인간과 전시 동물의 관계를 재정의하고 있다',
    'map.markers.taiwanSocialMovements.title':
      '대만 원주민 토지 정의와 전통 영역',
    'map.markers.taiwanSocialMovements.desc':
      '대만 원주민 토지 권리의 역사적 맥락, 법률 발전, 전통 영역 획정 논쟁, 원주민족 전환기 정의 위원회의 성과를 탐구하다',
    'map.markers.taiwanMarriageEquality.title': '대만 동성혼과 성평등',
    'map.markers.taiwanMarriageEquality.desc':
      '계엄 시기의 수감자에서 아시아 최초 동성혼 법률까지 — 한 남자의 30년 투쟁이 어떻게 섬의 사랑 정의를 다시 썼는가',
    'map.markers.taiwanEnvironmentalJustice.title':
      '대만 환경 정의와 님비(NIMBY) 논쟁',
    'map.markers.taiwanEnvironmentalJustice.desc':
      '대만의 환경 부담 불균형 분배 현상을 탐구하다, 소각장·핵폐기물에서 석유화학 님비 갈등까지, 환경 불평등과 사회 정의 문제를 분석하다',
    'map.markers.taiwanCommunityRiCulture.title': '대만 커뮤니티와 리(里) 문화',
    'map.markers.taiwanCommunityRiCulture.desc':
      '가장 기초적인 민주주의 실천에서 마을 만들기 사회 혁신까지',
    'map.markers.taiwanLongTermCare.title': '대만 장기요양 제도 발전',
    'map.markers.taiwanLongTermCare.desc':
      '세계에서 가장 선진적인 장기요양 제도이면서, 동시에 가장 큰 보이지 않는 돌봄 체계가 존재한다',
    'map.markers.taiwanLaborMovement.title': '환경보호와 지속가능 발전',
    'map.markers.taiwanLaborMovement.desc':
      '굴뚝의 섬에서 넷제로 대만까지: 40년 환경운동의 각성의 길',
    'map.markers.taiwanHousingIssues.title': '사회주택과 주거 정의',
    'map.markers.taiwanHousingIssues.desc':
      '대만이 사회주택 정책으로 어떻게 주거 정의를 실현해 모든 사람이 안정적으로 살 수 있게 하는가',
    'map.markers.taiwanHealthcareSystem.title': '과학단지 발전',
    'map.markers.taiwanHealthcareSystem.desc':
      '신주 과학단지에서 난부 과학단지까지, 대만 과학단지의 발전 과정과 3대 단지의 고유한 포지셔닝을 탐구하다',
    'map.markers.taiwanImmigration.title': '반도체 산업',
    'map.markers.taiwanImmigration.desc':
      '장중머우의 역사적 도박에서 2나노 시대까지: TSMC가 어떻게 대만을 글로벌 기술 생명선으로 만들었나',
    'map.markers.taiwanReligiousDiversity.title': '대만 해안 지형과 해양 경관',
    'map.markers.taiwanReligiousDiversity.desc':
      '예류 여왕머리의 목이 매년 0.2cm씩 가늘어져 언젠가 부러질 것이다 — 이것이 바로 대만 해안 지형의 운명과 아름다움',
    'map.markers.taiwanBuddhismTaoism.title': '대만 다도와 생활 미학',
    'map.markers.taiwanBuddhismTaoism.desc':
      '1981년 쯔텅루(紫藤廬) 개장 그 밤, 재야 인사와 문인들이 차를 마시며 모였다 — 여기는 단순한 찻집이 아니라 반대 운동의 비밀 거점이었다',
    'map.markers.taiwanFolkReligion.title': '대만 선거와 정당 정치',
    'map.markers.taiwanFolkReligion.desc':
      '1950년 지방의원에서 2000년 정권 교체까지, 대만이 어떻게 투표로 민주적 전환의 기적을 써내려갔는가를 보다',
    'map.markers.taiwanChristianity.title': '대만 도시 발전과 도농 격차',
    'map.markers.taiwanChristianity.desc':
      '70년 만에 농업 섬에서 도시 섬으로, 6개 직할시에 인구 70% 집중의 빛과 그림자: 번영하는 타이중 vs 쇠락하는 윈린의 잔혹한 대비',
    'map.markers.taiwanIslamJudaism.title': '도시 특성과 지역 문화',
    'map.markers.taiwanIslamJudaism.desc':
      '신베이 404만 명에서 타이난 185만 명까지, 6개 직할시가 산업 전환 속에서 어떻게 각자의 도시 성격을 형성하는가',
    'map.markers.kaohsiungIncident.title': '민주화',
    'map.markers.kaohsiungIncident.desc':
      '1979년 12월 10일 가오슝 거리의 경찰-시민 충돌은 결국 대만의 민주적 전환을 탄생시켰다 — 그러나 그 대가는 얼마나 많은 이의 청춘과 자유였는가?',
    'map.markers.wangLeeOlympicGold.title': '왕치린과 리양(린양 페어)',
    'map.markers.wangLeeOlympicGold.desc':
      '중학교 동급생에서 올림픽 금메달까지: 「린양 페어」가 34분 만에 중국을 2-0으로 꺾고 대만 배드민턴 역사상 첫 올림픽 금메달을 쓰다',
  },
  vi: {
    // Meta
    'map.meta.title': 'Bản đồ Đài Loan',
    'map.meta.description':
      'Khám phá mạch nội dung của Taiwan.md dưới góc nhìn bản đồ',

    // Hero Section
    'map.hero.kicker': 'Map View',
    'map.hero.title': 'Bản đồ Đài Loan',
    'map.hero.subtitle':
      'Khám phá các dấu mốc văn hóa, ẩm thực, thiên nhiên và lịch sử của Đài Loan qua bản đồ.',

    // Controls - Region Filter
    'map.controls.region.title': 'Lọc theo khu vực',
    'map.controls.region.all': 'Tất cả',
    'map.controls.region.north': 'Miền Bắc',
    'map.controls.region.central': 'Miền Trung',
    'map.controls.region.south': 'Miền Nam',
    'map.controls.region.east': 'Miền Đông',
    'map.controls.region.islands': 'Các đảo ngoài khơi',

    // Controls - Category Filter
    'map.controls.category.title': 'Lọc theo danh mục',
    'map.controls.category.all': 'Tất cả',
    'map.controls.category.food': '🍜 Ẩm thực',
    'map.controls.category.history': '📜 Lịch sử',
    'map.controls.category.nature': '🌿 Thiên nhiên',
    'map.controls.category.culture': '🎭 Văn hóa',
    'map.controls.category.technology': '💻 Công nghệ',
    'map.controls.category.economy': '📈 Kinh tế',
    'map.controls.category.lifestyle': '🏮 Đời sống',
    'map.controls.category.art': '🎨 Nghệ thuật',
    'map.controls.category.geography': '🗺️ Địa lý',

    // Route Section
    'map.route.title': '🗺️ Lộ trình tuyển chọn',
    'map.route.normal-mode': 'Chế độ thông thường',

    // Sidebar - Default
    'map.sidebar.default.title': '📍 Khám phá bài viết về Đài Loan',
    'map.sidebar.default.hint':
      'Nhấp vào huyện, thành phố hoặc điểm đánh dấu trên bản đồ để khám phá bài viết',

    // Sidebar - County
    'map.sidebar.county.clear': '✕ Xóa lựa chọn',
    'map.sidebar.county.articles-count': 'bài viết',
    'map.sidebar.county.no-articles': 'Khu vực này chưa có bài viết',

    // Sidebar - Article
    'map.sidebar.article.back': '← Quay lại',
    'map.sidebar.article.read-more': 'Đọc toàn văn →',

    // Zoom Controls
    'map.zoom.in': '＋',
    'map.zoom.out': '－',
    'map.zoom.reset': '⌂',

    // Tooltips
    'map.tooltip.county.articles': 'bài viết liên quan',
    'map.tooltip.county.click': 'Nhấp để lọc khu vực này',
    'map.tooltip.marker.reading-time': 'phút đọc',

    // Panel (for compatibility)
    'map.panel.title': 'Bản đồ tri thức Đài Loan',
    'map.panel.stat.points': 'Điểm tri thức',
    'map.panel.stat.categories': 'Danh mục',
    'map.panel.category-distribution': 'Phân bố danh mục',
    'map.panel.link.graph': '🕸️ Đồ thị tri thức',
    'map.panel.link.home': '🏠 Tổng quan danh mục',

    // Category Names (for JS usage)
    'map.category.history': '📜 Lịch sử',
    'map.category.geography': '🗺️ Địa lý',
    'map.category.culture': '🎭 Văn hóa',
    'map.category.food': '🍜 Ẩm thực',
    'map.category.art': '🎨 Nghệ thuật',
    'map.category.music': '🎵 Âm nhạc',
    'map.category.technology': '💻 Công nghệ',
    'map.category.nature': '🌿 Thiên nhiên',
    'map.category.people': '👥 Nhân vật',
    'map.category.society': '⚖️ Xã hội',
    'map.category.economy': '📈 Kinh tế',
    'map.category.lifestyle': '🏮 Đời sống',

    // Additional UI text
    'map.sidebar.more-articles': '⋯và',
    'map.sidebar.more-articles-suffix': 'bài khác',

    // Routes
    'map.routes.nightMarkets.name': '🍜 Hành trình khám phá chợ đêm',
    'map.routes.nightMarkets.description':
      'Từ Bắc chí Nam, khám phá văn hóa chợ đêm tiêu biểu nhất của Đài Loan',
    'map.routes.nationalParks.name':
      '🏔️ Hành trình khám phá công viên quốc gia',
    'map.routes.nationalParks.description':
      'Từ núi cao 3,952 mét đến rạn san hô nhiệt đới, khám phá những kỳ quan thiên nhiên của Đài Loan',
    'map.routes.historyTrail.name': '📜 Dấu chân lịch sử',
    'map.routes.historyTrail.description':
      'Từ thời kỳ thuộc địa Hà Lan đến dân chủ hóa, ngược dòng bốn trăm năm lịch sử Đài Loan',
    'map.routes.oldStreets.name': '🏮 Dạo bước phố cổ',
    'map.routes.oldStreets.description':
      'Ký ức Đài Loan trên những con phố trăm năm, nơi kiến trúc chính là lịch sử',

    'map.routes.counties22.name': '📍 22 bài chuyên sâu về huyện, thành phố',
    'map.routes.counties22.description':
      'Khám phá 22 bài chuyên sâu về các huyện, thành phố trên Taiwan.md, từ pilot Cơ Long đến finale Tân Bắc — mỗi nơi xoay quanh một mâu thuẫn cốt lõi.',
    'map.counties22.panel.title': '📍 22 bài chuyên sâu về huyện, thành phố',
    'map.counties22.panel.hint':
      'Nhấp vào thẻ huyện, thành phố để mở hoặc chọn địa phương trên bản đồ',
    'map.counties22.tooltip.openDeep': 'Nhấp để mở bài viết chuyên sâu',
    'map.counties22.deepCard.badge':
      '📖 Loạt bài 22 huyện, thành phố · Bài viết chuyên sâu',
    'map.counties22.deepCard.cta': 'Đọc toàn văn →',

    // Night Markets Stops
    'map.stops.shilinNightMarket.name': 'Chợ đêm Sĩ Lâm',
    'map.stops.shilinNightMarket.note':
      'Chợ đêm du lịch lớn nhất Đài Loan, nơi khai sinh món bánh lớn bọc bánh nhỏ',
    'map.stops.raoheNightMarket.name': 'Chợ đêm Nhiêu Hà',
    'map.stops.raoheNightMarket.note':
      'Thánh địa xếp hàng mua bánh tiêu, điểm đến địa phương được người Đài Bắc yêu thích',
    'map.stops.ningxiaNightMarket.name': 'Chợ đêm Ninh Hạ',
    'map.stops.ningxiaNightMarket.note':
      'Nơi có mật độ hàng quán cao nhất, phố ẩm thực bình dân được Michelin đề xuất',
    'map.stops.fengjiaNightMarket.name': 'Chợ đêm Phùng Giáp',
    'map.stops.fengjiaNightMarket.note':
      'Phòng thí nghiệm món ăn vặt sáng tạo, tuyến đầu đổi mới của chợ đêm Đài Loan',
    'map.stops.huayuanNightMarket.name': 'Chợ đêm Hoa Viên',
    'map.stops.huayuanNightMarket.note':
      'Chợ đêm lớn nhất Đài Nam, lễ hội náo nhiệt chỉ diễn ra ba ngày mỗi tuần',
    'map.stops.liuheNightMarket.name': 'Chợ đêm Lục Hợp',
    'map.stops.liuheNightMarket.note':
      'Chợ đêm biểu tượng của Cao Hùng, nơi hải sản giữ vai trò chủ đạo',

    // National Parks Stops
    'map.stops.yangmingshanNationalPark.name':
      'Công viên quốc gia Dương Minh Sơn',
    'map.stops.yangmingshanNationalPark.note':
      'Khu vườn sau nhà của Đài Bắc, với địa hình núi lửa và những suối nước nóng bí ẩn',
    'map.stops.tarokoNationalPark.name': 'Công viên quốc gia Taroko',
    'map.stops.tarokoNationalPark.note':
      'Hẻm núi đá cẩm thạch, kỳ quan địa chất đẳng cấp thế giới',
    'map.stops.yushanNationalPark.name': 'Công viên quốc gia Ngọc Sơn',
    'map.stops.yushanNationalPark.note':
      'Đỉnh cao nhất Đông Bắc Á（3,952m）, nóc nhà của Đài Loan',
    'map.stops.alishanScenicArea.name': 'Khu thắng cảnh quốc gia A Lý Sơn',
    'map.stops.alishanScenicArea.note':
      'Bình minh trên biển mây, quần thể cổ thụ và đường sắt xuyên rừng',
    'map.stops.sunMoonLakeScenicArea.name':
      'Khu thắng cảnh quốc gia Nhật Nguyệt Đàm',
    'map.stops.sunMoonLakeScenicArea.note':
      'Hồ tự nhiên lớn nhất Đài Loan, hồ thiêng của người Thao',
    'map.stops.kentingNationalPark.name': 'Công viên quốc gia Khẩn Đinh',
    'map.stops.kentingNationalPark.note':
      'Cực nam Đài Loan, với rạn san hô nhiệt đới và bán đảo Hằng Xuân',

    // History Trail Stops
    'map.stops.anpingFort.name': 'Pháo đài cổ An Bình',
    'map.stops.anpingFort.note':
      'Do người Hà Lan xây dựng năm 1624, là pháo đài lâu đời nhất Đài Loan',
    'map.stops.chikanTower.name': 'Xích Khảm Lâu',
    'map.stops.chikanTower.note':
      'Từ thành Provintia của Hà Lan đến biểu tượng quyền lực của Trịnh Thành Công',
    'map.stops.lukang.name': 'Lộc Cảng',
    'map.stops.lukang.note':
      'Thành phố lớn thứ hai Đài Loan thời Thanh,「nhất Phủ, nhì Lộc, tam Mãnh Giáp」',
    'map.stops.presidentialOffice.name':
      'Phủ Tổng thống（nguyên là Phủ Tổng đốc Đài Loan）',
    'map.stops.presidentialOffice.note':
      'Hoàn thành năm 1919, trung tâm quyền lực tối cao thời Nhật trị',
    'map.stops.chiangKaiShekMemorialHall.name': 'Nhà tưởng niệm Trung Chính',
    'map.stops.chiangKaiShekMemorialHall.note':
      'Biểu tượng của chế độ uy quyền và tâm điểm tranh luận về công lý chuyển tiếp',
    'map.stops.legislativeYuan.name':
      'Lập pháp viện（Phong trào Hoa Hướng Dương）',
    'map.stops.legislativeYuan.note':
      'Địa điểm diễn ra Phong trào Sinh viên Hoa Hướng Dương năm 2014, một cột mốc của nền dân chủ Đài Loan',

    // Old Streets Stops
    'map.stops.dihuaStreet.name': 'Phố Địch Hóa',
    'map.stops.dihuaStreet.note':
      'Trái tim của Đại Đạo Trình, khu phố chuyên bán hàng hóa nam bắc và đồ Tết',
    'map.stops.jiufenOldStreet.name': 'Phố cổ Cửu Phần',
    'map.stops.jiufenOldStreet.note':
      'Dấu ấn thời hoàng kim của ngành khai khoáng và nguồn cảm hứng cho Vùng đất linh hồn',
    'map.stops.lukangOldStreet.name': 'Phố cổ Lộc Cảng',
    'map.stops.lukangOldStreet.note':
      'Bảo tàng sống của những ngôi nhà gạch đỏ cổ kính và nghề thủ công truyền thống',
    'map.stops.anpingOldStreet.name': 'Phố cổ An Bình',
    'map.stops.anpingOldStreet.note':
      'Con phố đầu tiên của Đài Loan, nơi lưu giữ những lớp trầm tích của bốn trăm năm lịch sử',
    'map.stops.qishanOldStreet.name': 'Phố cổ Kỳ Sơn',
    'map.stops.qishanOldStreet.note':
      'Quần thể kiến trúc Baroque của vương quốc chuối',
    'map.stops.tamsuiOldStreet.name': 'Phố cổ Đạm Thủy',
    'map.stops.tamsuiOldStreet.note':
      'Hoàng hôn, a-gei và nét lịch sử đặc sắc nơi cửa sông Đạm Thủy',

    // Cities
    'map.city.taipei': 'Đài Bắc',
    'map.city.newTaipei': 'Tân Bắc',
    'map.city.keelung': 'Cơ Long',
    'map.city.taoyuan': 'Đào Viên',
    'map.city.hsinchu': 'Tân Trúc',
    'map.city.miaoli': 'Miêu Lật',
    'map.city.taichung': 'Đài Trung',
    'map.city.changhua': 'Chương Hóa',
    'map.city.nantou': 'Nam Đầu',
    'map.city.chiayi': 'Chiayi',
    'map.city.tainan': 'Đài Nam',
    'map.city.kaohsiung': 'Cao Hùng',
    'map.city.pingtung': 'Bình Đông',
    'map.city.yilan': 'Nghi Lan',
    'map.city.hualien': 'Hoa Liên',
    'map.city.taitung': 'Đài Đông',
    'map.city.penghu': 'Bành Hồ',
    'map.city.kinmen': 'Kim Môn',

    // Markers
    'map.markers.founderCheYuWu.title': 'Nhà sáng lập — Ngô Triết Vũ Che-Yu Wu',
    'map.markers.founderCheYuWu.desc':
      'Từ mã lệnh đến thi ca: hành trình đột phá trên trường quốc tế của một nghệ sĩ Đài Loan',
    'map.markers.taiwanIndigenousContemporaryArt.title':
      'Nghệ thuật đương đại của người bản địa Đài Loan',
    'map.markers.taiwanIndigenousContemporaryArt.desc':
      'Từ nghề thủ công truyền thống đến sáng tác đương đại, khám phá cách các nghệ sĩ bản địa Đài Loan cất tiếng nói trên sân khấu nghệ thuật toàn cầu, tái định nghĩa bản sắc bản địa và cuộc đối thoại với nghệ thuật đương đại',
    'map.markers.taiwanExperimentalNewMediaArt.title':
      'Nghệ thuật thể nghiệm và truyền thông mới Đài Loan',
    'map.markers.taiwanExperimentalNewMediaArt.desc':
      'Từ nghệ thuật video đến tương tác VR, khám phá bước phát triển đổi mới của nghệ thuật truyền thông mới và hệ sinh thái nghệ thuật công nghệ tại Đài Loan',
    'map.markers.taiwanArchitecture.title': 'Kiến trúc Đài Loan',
    'map.markers.taiwanArchitecture.desc':
      'Từ nhà đá phiến đến những tòa nhà chọc trời: hành trình xuyên thời gian của kiến trúc trên một hòn đảo',
    'map.markers.taiwanNewMediaArt.title':
      'Nghệ thuật truyền thông mới Đài Loan',
    'map.markers.taiwanNewMediaArt.desc':
      'Khám phá văn hóa và những câu chuyện của Đài Loan',
    'map.markers.taiwanWatercolorCenturyEvolution.title':
      'Một thế kỷ biến chuyển của hội họa màu nước Đài Loan',
    'map.markers.taiwanWatercolorCenturyEvolution.desc':
      'Từ sự khai mở của Ishikawa Kinichiro thời Nhật trị đến danh tiếng quốc tế của Giản Trung Uy đương đại, hội họa màu nước Đài Loan đã trải qua hành trình trăm năm và trở thành một trong những trung tâm sáng tác màu nước năng động nhất châu Á.',
    'map.markers.taiwanModernPoetry.title': 'Thơ hiện đại Đài Loan',
    'map.markers.taiwanModernPoetry.desc':
      'Những thử nghiệm chủ nghĩa hiện đại bước ra từ ba thư phòng đã bất ngờ khai sinh cuộc cách mạng thi ca mang đậm bản sắc bản địa như thế nào',
    'map.markers.taiwanContemporarySculpture.title':
      'Sự phát triển của điêu khắc đương đại Đài Loan',
    'map.markers.taiwanContemporarySculpture.desc':
      'Từ Dương Anh Phong, Chu Minh đến thế hệ mới, khám phá tiến trình biến đổi và tinh thần sáng tạo của nghệ thuật điêu khắc Đài Loan',
    'map.markers.taiwanCuratorsArtCulture.title':
      'Giám tuyển Đài Loan và công cuộc kiến tạo văn hóa nghệ thuật',
    'map.markers.taiwanCuratorsArtCulture.desc':
      'Từ giám tuyển độc lập đến hệ thống bảo tàng mỹ thuật, các giám tuyển Đài Loan đã kiến tạo diễn ngôn văn hóa và đối thoại quốc tế cho nghệ thuật đương đại như thế nào',
    'map.markers.newMediaArt.title': 'Nghệ thuật truyền thông mới',
    'map.markers.newMediaArt.desc':
      'Hành trình tiên phong khám phá nghệ thuật số Đài Loan, nơi công nghệ và nhân văn giao thoa từ phòng thí nghiệm đến sân khấu quốc tế',
    'map.markers.contemporaryTaiwanLiterature.title':
      'Văn học Đài Loan đương đại',
    'map.markers.contemporaryTaiwanLiterature.desc':
      'Khám phá văn hóa và những câu chuyện của Đài Loan',
    'map.markers.taiwanContemporaryArt.title': 'Nghệ thuật đương đại Đài Loan',
    'map.markers.taiwanContemporaryArt.desc':
      'Từ Bảo tàng Mỹ thuật Đài Bắc đến Gian trưng bày Đài Loan tại Biennale Venezia, vị thế độc đáo của nghệ thuật đương đại Đài Loan trên sân khấu toàn cầu',
    'map.markers.kinmenGuesthouseMuseum.title':
      'Bảo tàng Nghệ thuật Đương đại Kim Mã Tân Quán',
    'map.markers.kinmenGuesthouseMuseum.desc':
      'Một trạm quân sự thời Chiến tranh Lạnh từng chứng kiến những cuộc chia ly và đoàn tụ, được hai cha con đánh thức sau hai mươi năm ngủ quên để trở thành bảo tàng mỹ thuật hàng đầu tại Cao Hùng do《Lonely Planet》đề xuất.',
    'map.markers.renjianMagazine.title': 'Tạp chí Nhân Gian',
    'map.markers.renjianMagazine.desc':
      '47 số, bốn năm, một cuộc cách mạng thầm lặng được khởi xướng bằng nhiếp ảnh và ngôn từ——khởi điểm của văn học phóng sự Đài Loan',
    'map.markers.taiwanIndigenousCulture.title':
      'Văn hóa người bản địa Đài Loan',
    'map.markers.taiwanIndigenousCulture.desc':
      'Từ truyền thống đa dạng của mười sáu dân tộc đến sự phục hưng trong nghệ thuật đương đại, khám phá chiều sâu di sản và quá trình chuyển hóa hiện đại của văn hóa bản địa Đài Loan',
    'map.markers.taiwan16IndigenousTribes.title':
      'Bản đồ văn hóa 16 dân tộc bản địa Đài Loan',
    'map.markers.taiwan16IndigenousTribes.desc':
      'Khám phá khu vực phân bố, hệ thống ngôn ngữ, lễ hội quan trọng và sự phát triển sáng tác đương đại của 16 dân tộc bản địa Đài Loan, qua đó tìm hiểu diện mạo văn hóa đa dạng của các dân tộc bản địa Đài Loan',
    'map.markers.taiwanNightMarketCulture.title':
      'Văn hóa chợ đêm và ẩm thực đường phố Đài Loan',
    'map.markers.taiwanNightMarketCulture.desc':
      'Khám phá chuyên sâu bối cảnh hình thành, sức hấp dẫn độc đáo của văn hóa chợ đêm Đài Loan, cùng những câu chuyện lịch sử và ý nghĩa văn hóa của các món ăn tiêu biểu',
    'map.markers.taiwanSensibilityKoreanPerspective.title':
      'Cảm thức Đài Loan: mỹ học kiểu Đài Loan trong mắt người Hàn Quốc',
    'map.markers.taiwanSensibilityKoreanPerspective.desc':
      'Từ MV K-pop đến hội sách Seoul,「대만감성」đã biến cảnh phố thường nhật của Đài Loan thành biểu tượng thẩm mỹ quyến rũ bậc nhất châu Á như thế nào',
    'map.markers.taiwanCulturalCreativeParks.title':
      'Sự phát triển của các công viên văn hóa sáng tạo Đài Loan',
    'map.markers.taiwanCulturalCreativeParks.desc':
      'Từ tái sinh công trình cũ đến hình thành các cụm sáng tạo, tiến trình phát triển và mô hình đổi mới của các công viên văn hóa sáng tạo Đài Loan',
    'map.markers.taiwanOldStreetCulture.title':
      'Văn hóa phố cổ và các khu phố thương mại Đài Loan',
    'map.markers.taiwanOldStreetCulture.desc':
      'Từ sự phồn thịnh của các thương cảng thời Thanh đến những dãy nhà kiểu Tây mang phong cách Baroque thời Nhật trị, phố cổ Đài Loan là pho sử dân gian được viết bằng gạch ngói',
    'map.markers.taiwanTeaCeremonyLifeAesthetics.title':
      'Trà đạo Đài Loan và mỹ học đời sống',
    'map.markers.taiwanTeaCeremonyLifeAesthetics.desc':
      'Từ trà công phu đến mỹ học trà tịch, khám phá cách Đài Loan dung hòa và đổi mới văn hóa trà phương Đông với mỹ học đời sống bản địa',
    'map.markers.taiwanStreetArtGraffiti.title':
      'Nghệ thuật đường phố và văn hóa graffiti Đài Loan',
    'map.markers.taiwanStreetArtGraffiti.desc':
      'Từ graffiti ngầm đến tranh tường hợp pháp, những bức tường đô thị đã trở thành sân khấu sáng tác của các nghệ sĩ Đài Loan như thế nào',
    'map.markers.taiwanIncenseMakingCulture.title':
      'Văn hóa làm hương Đài Loan và quê hương của chân hương',
    'map.markers.taiwanIncenseMakingCulture.desc':
      'Từ kỹ nghệ làm chân hương trăm năm tại cộng đồng Vân Tiêu ở Chiayi đến ngành sản xuất hương trải khắp Đài Loan — một nghề cổ xưa gắn liền với lòng thành kính, tay nghề và sự kiên trì',
    'map.markers.taiwanHomophoneTaboos.title':
      'Văn hóa kiêng kỵ từ đồng âm tại Đài Loan: Vì sao số「四」khiến cả xã hội bỏ qua một tầng lầu?',
    'map.markers.taiwanHomophoneTaboos.desc':
      'Từ bệnh viện không có tầng bốn đến biển số 8888 được đấu giá với mức giá trên trời, mức độ nhạy cảm của người Đài Loan với từ đồng âm có thể xem là cao nhất thế giới',
    'map.markers.hakkaCultureLanguage.title': 'Văn hóa và ngôn ngữ Khách Gia',
    'map.markers.hakkaCultureLanguage.desc':
      'Tinh thần ngạnh cảnh và Ngày Thiên Xuyên: Sự kế thừa văn hóa và công cuộc phục hưng hiện đại của người Khách Gia tại Đài Loan',
    'map.markers.ethnicGroupsTaiwan.title':
      'Các cộng đồng sắc tộc（Mân Nam, Khách Gia, thổ dân bản địa, người từ các tỉnh Trung Quốc và tân di dân）',
    'map.markers.ethnicGroupsTaiwan.desc':
      'Sự đa dạng sắc tộc của Đài Loan không chỉ là kết quả của tiến trình lịch sử mà còn là chìa khóa để thấu hiểu xã hội Đài Loan đương đại. Cấu trúc xã hội đa nguyên cùng tồn tại này vừa là nguồn cảm hứng cho sức sáng tạo văn hóa Đài Loan, vừa là nền tảng quan trọng cho sự phát triển chính trị dân chủ. Làm thế nào để xây dựng bản sắc Đài Loan chung trong khi vẫn tôn trọng đặc trưng văn hóa của từng cộng đồng là vấn đề quan trọng mà xã hội Đài Loan không ngừng đối diện.',
    'map.markers.chinaSteel.title':
      'China Steel: Huyền thoại gang thép của vị bộ trưởng cứng đầu và Mười công trình kiến thiết lớn',
    'map.markers.chinaSteel.desc':
      'Từ việc Triệu Diệu Đông (Chao Yao-tung) khôn khéo giành được công nghệ trong các cuộc đàm phán với Âu Mỹ đến làn khói trắng đầu tiên bay lên tại Tiểu Cảng, Cao Hùng, China Steel đã dành 50 năm xây dựng xương sống cho ngành công nghiệp nặng Đài Loan, trở thành viên ngọc thành công nhất của Mười công trình kiến thiết lớn',
    'map.markers.taiwanCement.title':
      'Taiwan Cement: Huyền thoại chuyển đổi xanh của công ty niêm yết đầu tiên tại Đài Loan',
    'map.markers.taiwanCement.desc':
      'Năm 1962, Sở Giao dịch Chứng khoán Đài Loan ra đời vì công ty này, còn mã cổ phiếu 1101 tượng trưng cho nguồn cội của thị trường chứng khoán Đài Loan. Qua ba thế hệ gia tộc họ Cô điều hành suốt 76 năm, Taiwan Cement đã dùng từng lò nung xi măng để chứng kiến kỳ tích kiến thiết Đài Loan, nay chuyển mình thành doanh nghiệp xanh nhằm đón đầu kỷ nguyên trung hòa carbon',
    'map.markers.tsmc.title': 'Doanh nghiệp Đài Loan: TSMC',
    'map.markers.tsmc.desc':
      'Doanh nghiệp dẫn đầu thế giới về gia công chip, nắm giữ huyết mạch then chốt của nền văn minh số nhân loại',
    'map.markers.chimeiCorporation.title':
      'Chi Mei Corporation: Vương quốc acrylic và giấc mơ bảo tàng của Hứa Văn Long',
    'map.markers.chimeiCorporation.desc':
      'Khởi đầu từ một nhà máy nhỏ tại Nhân Đức, Đài Nam vào năm 1960, Hứa Văn Long (Shi Wen-long) đã dành cả đời gây dựng vương quốc vật liệu ABS lớn nhất châu Á, đồng thời thành lập Bảo tàng Chi Mei để cống hiến cho xã hội. Câu chuyện chứng minh doanh nghiệp Đài Loan có thể đồng thời đạt thành công thương mại và đề cao tinh thần nhân văn',
    'map.markers.acer.title':
      'Tập đoàn Acer - Nhà tiên phong cải cách ngành PC',
    'map.markers.acer.desc':
      'Nhà tiên phong máy tính cá nhân khởi nghiệp tại Đào Viên, Đài Loan đã sáng tạo mô hình kinh doanh「đa thương hiệu, đa kênh phân phối」, trở thành động lực cải cách ngành PC toàn cầu',
    'map.markers.giantBicycles.title':
      'Doanh nghiệp Đài Loan: Giant Manufacturing',
    'map.markers.giantBicycles.desc':
      'Từ kẻ gia công lệ thuộc bị tập đoàn lớn của Mỹ ruồng bỏ đến đế chế vô hình thiết lập các tiêu chuẩn công nghệ xe đạp toàn cầu',
    'map.markers.quantaComputer.title':
      'Doanh nghiệp Đài Loan: Quanta Computer',
    'map.markers.quantaComputer.desc':
      'Từ vụ cháy nhà máy đến ngôi vương máy tính xách tay toàn cầu, Lâm Bách Lý (Barry Lam) đã xây dựng đế chế mới của kỷ nguyên AI như thế nào?',
    'map.markers.aseGroup.title': 'Doanh nghiệp Đài Loan: ASE Semiconductor',
    'map.markers.aseGroup.desc':
      'Doanh nghiệp đóng gói và kiểm thử bán dẫn lớn nhất thế giới: Vì sao một ông chủ công ty xây dựng lại chuyển sang ngành bán dẫn?',
    'map.markers.esunFinancialHolding.title':
      'Doanh nghiệp Đài Loan: E.Sun Financial Holding',
    'map.markers.esunFinancialHolding.desc':
      'Từ ngân hàng chuyên về thẻ tín dụng đến tiên phong tài chính số, câu chuyện đột phá của vị tổng giám đốc tập đoàn tài chính trẻ nhất ở tuổi 43',
    'map.markers.changChunPetrochemical.title':
      'Doanh nghiệp Đài Loan: Chang Chun Petrochemical',
    'map.markers.changChunPetrochemical.desc':
      'Từ nhà máy nhỏ tại Đài Nam năm 1949 đến tập đoàn hóa chất toàn cầu, câu chuyện về nhà vô địch ẩn mình「không niêm yết, không vay tiền」',
    'map.markers.formosaPlasticsGroup.title':
      'Doanh nghiệp Đài Loan: Evergreen Marine',
    'map.markers.formosaPlasticsGroup.desc':
      'Từ một con tàu cũ đến đế chế vận tải biển toàn cầu, huyền thoại đại dương xanh của Trương Vinh Phát (Chang Yung-fa)',
    'map.markers.taipeiFubon.title':
      'Kinh tế học chợ đêm: Một kỳ tích kinh doanh không thương hiệu',
    'map.markers.taipeiFubon.desc':
      'Khám phá cách các chợ đêm Đài Loan tạo nên kỳ tích kinh tế với giá trị sản lượng hằng năm gần 4000 tỷ dù không có thương hiệu, trang trí cửa hàng hay địa điểm cố định',
    'map.markers.taiwan7Eleven.title': 'Ngành cà phê Đài Loan',
    'map.markers.taiwan7Eleven.desc':
      'Từ nguồn gốc canh tác dưới thời Nhật Bản cai trị đến chức vô địch thế giới của Simple Kaffa, lịch sử tiến hóa trăm năm của cà phê Đài Loan',
    'map.markers.taiwanHighSpeedRail.title':
      'Bản đồ đặc sản địa phương Đài Loan',
    'map.markers.taiwanHighSpeedRail.desc':
      'Từ canh đỉnh biên hồ ở khu miếu Khẩu, Cơ Long đến chân giò Vạn Loan, Bình Đông, từ thịt viên Tân Trúc đến mãng cầu Đài Đông, mỗi thành phố đều có DNA hương vị riêng. Hãy theo chân người bản địa khám phá những món ăn địa phương tiêu biểu nhất tại 22 huyện, thành phố của Đài Loan và thưởng thức văn hóa bình dân chân thực nhất trên hòn đảo.',
    'map.markers.taiwanSemiconductorIndustry.title':
      'Món sở trường Đài Loan: Ký ức vị giác đang dần biến mất',
    'map.markers.taiwanSemiconductorIndustry.desc':
      'Từ gà bạc hà Chiayi đến canh thái vĩ, những món sở trường của bà lưu giữ ký ức gia đình nhưng đang dần thất truyền giữa biến thiên thời đại',
    'map.markers.taiwanBankingSystem.title':
      'Sự giao thoa ẩm thực của tân di dân Đài Loan',
    'map.markers.taiwanBankingSystem.desc':
      'Khi vị chua cay Thái Lan gặp vị ngọt mặn Đài Loan, khi phở Việt Nam hội ngộ món kho kiểu Đài, khi gia vị Indonesia hòa quyện cùng nguyên liệu bản địa, một cuộc cách mạng vị giác vượt biên giới đang âm thầm diễn ra tại Đài Loan. Những tân di dân không chỉ mang đến món ăn quê hương mà còn mở ra những khả năng hoàn toàn mới, làm phong phú văn hóa ẩm thực Đài Loan.',
    'map.markers.taiwanSmes.title': 'Vương quốc trái cây Đài Loan',
    'map.markers.taiwanSmes.desc':
      'Từ xoài, vải đến mãng cầu, mận roi, huyền thoại ngọt ngào về sự đa dạng của trái cây nhiệt đới và những đột phá trong công nghệ nông nghiệp',
    'map.markers.youbikePublicBikeSystem.title': 'Văn hóa hải sản Đài Loan',
    'map.markers.youbikePublicBikeSystem.desc':
      'Hải sản tươi giao thẳng từ cảng cá, văn hóa nhà hàng hải sản và các món đậm vị biển như hàu chiên trứng thể hiện đặc trưng hải đảo bốn bề giáp biển cùng truyền thống ẩm thực hải sản phong phú của Đài Loan',
    'map.markers.taiwanFoodBeverageIndustry.title':
      'Michelin Đài Loan và ẩm thực cao cấp',
    'map.markers.taiwanFoodBeverageIndustry.desc':
      'Năm 2018, bìa đỏ của Cẩm nang Michelin lần đầu tiên in dòng chữ「TAIPEI」, đánh dấu ngành ẩm thực Đài Loan chính thức bước vào hệ thống đánh giá quốc tế. Từ hàng quán ven đường đến nhà hàng được gắn sao, từ món ăn bình dân đến ẩm thực cao cấp, văn hóa ẩm thực Đài Loan phô diễn diện mạo quyến rũ vừa truyền thống vừa sáng tạo trên sân khấu quốc tế.',
    'map.markers.taiwanAgriculturalReform.title': 'Văn hóa chợ đêm',
    'map.markers.taiwanAgriculturalReform.desc':
      '164 chợ đêm được quản lý, tại Đài Nam trung bình cứ 3.8 vạn người lại có một chợ đêm, từ sân miếu đến điểm tham quan quốc tế',
    'map.markers.taiwanTeaIndustry.title': 'Văn hóa ẩm thực Khách Gia',
    'map.markers.taiwanTeaIndustry.desc':
      'Văn hóa ẩm thực phong phú và đa dạng của người Khách Gia, từ hương vị đậm đà của trà lôi đến phong vị núi rừng của bánh ú hoa dã khương, thể hiện trí tuệ đời sống cần kiệm, vun vén gia đình và tận dụng nguyên liệu tại chỗ của cộng đồng Khách Gia',
    'map.markers.taiwanFishingIndustry.title': 'Mì bò',
    'map.markers.taiwanFishingIndustry.desc':
      'Từ nỗi hoài hương của người di cư từ các tỉnh Trung Quốc đến món ăn quốc dân Đài Loan, sự giao thoa văn hóa và hương thơm lan tỏa toàn cầu của mì bò',
    'map.markers.taiwanFruitIndustry.title': 'Văn hóa trà',
    'map.markers.taiwanFruitIndustry.desc':
      'Sự phát triển văn hóa trà Đài Loan từ nghệ thuật trà truyền thống đến đồ uống pha lắc hiện đại, thể hiện các giống trà và văn hóa thưởng trà độc đáo của hòn đảo',
    'map.markers.taiwanRiceVarieties.title':
      'Trên hòn đảo rung chuyển, họ đã dựng nên một tòa tháp có thể bay',
    'map.markers.taiwanRiceVarieties.desc':
      'Chỉ cách đứt gãy đang hoạt động 200 mét, người Đài Loan vẫn quyết xây tòa nhà cao nhất thế giới trên vùng đất bất ổn nhất——rồi một kẻ điên đã tay không trèo lên đó trong 91 phút.',
    'map.markers.nightMarketCulture.title':
      'Năm dạng địa hình lớn và cấu trúc địa lý Đài Loan: Diện mạo hải đảo từ núi non đến đồng bằng',
    'map.markers.nightMarketCulture.desc':
      'Khám phá cấu trúc địa lý độc đáo của Đài Loan, từ dãy núi Trung Ương đến đồng bằng phía tây, tìm hiểu sự đa dạng địa hình của hòn đảo này',
    'map.markers.bubbleTeaGlobalPhenomenon.title':
      'Mạng lưới giao thông vận tải Đài Loan',
    'map.markers.bubbleTeaGlobalPhenomenon.desc':
      'Đường sắt cao tốc, metro, đường bộ và hàng không đan thành mạng lưới giao thông đa tầng đưa Đài Loan chuyển động',
    'map.markers.taiwanBeefNoodle.title':
      'Hệ thống khu thắng cảnh quốc gia Đài Loan',
    'map.markers.taiwanBeefNoodle.desc':
      'Từ Đông Bắc Giác đến Khẩn Đinh, 13 khu thắng cảnh quốc gia của Đài Loan thể hiện cảnh quan thiên nhiên và nhân văn phong phú',
    'map.markers.taiwanHotPotCulture.title':
      'Đặc trưng và quá trình hình thành địa lý đảo Đài Loan',
    'map.markers.taiwanHotPotCulture.desc':
      'Khám phá những đặc trưng địa lý đảo độc đáo của Đài Loan, từ vận động kiến tạo mảng đến cấu trúc địa hình, qua đó tìm hiểu những bí ẩn tự nhiên của đảo Formosa',
    'map.markers.taiwanFineDining.title':
      'Vận động kiến tạo mảng và hoạt động động đất tại Đài Loan',
    'map.markers.taiwanFineDining.desc':
      'Tìm hiểu đặc điểm địa chất của Đài Loan tại ranh giới giữa mảng Á-Âu và mảng biển Philippines, cũng như nguyên nhân dẫn đến hoạt động động đất thường xuyên',
    'map.markers.taiwanStreetFood.title':
      'Hồ chứa và quản lý tài nguyên nước tại Đài Loan',
    'map.markers.taiwanStreetFood.desc':
      'Từ khủng hoảng thiếu nước đến bồi lắng hồ chứa, những thách thức đối với tài nguyên nước Đài Loan và tình trạng phân bổ không đồng đều giữa miền bắc và miền nam',
    'map.markers.taiwanVegetarianCulture.title':
      'Hệ thống sông ngòi và đặc trưng thủy văn Đài Loan: dòng chảy ngắn, xiết và biến đổi theo mùa',
    'map.markers.taiwanVegetarianCulture.desc':
      'Khám phá hệ thống sông ngòi độc đáo của Đài Loan, từ sông Trạc Thủy đến sông Cao Bình, qua đó tìm hiểu cách địa hình đảo định hình các đặc trưng thủy văn của Đài Loan',
    'map.markers.taiwanCoffeeCulture.title':
      'Địa hình bờ biển và cảnh quan đại dương Đài Loan',
    'map.markers.taiwanCoffeeCulture.desc':
      'Từ bờ biển mũi-vịnh ở miền bắc đến bờ biển đứt gãy ở miền đông, địa hình bờ biển phong phú và đa dạng của Đài Loan phô bày kỳ công của vận động kiến tạo mảng',
    'map.markers.taiwanSnackCulture.title': 'Cảnh quan suối nước nóng Đài Loan',
    'map.markers.taiwanSnackCulture.desc':
      'Bắc Đầu, Tri Bản, Tiêu Khê — nơi văn hóa suối nước nóng giao hòa tuyệt đẹp với khoa học địa chất',
    'map.markers.taiwanSeafoodCulture.title':
      'Điểm nóng đa dạng sinh thái Đài Loan',
    'map.markers.taiwanSeafoodCulture.desc':
      'Hòn đảo rộng 3.6 vạn km² quy tụ 5.9 vạn loài sinh vật, với mật độ gấp 100 lần mức trung bình toàn cầu',
    'map.markers.taiwanPineappleCake.title':
      'Cảnh quan nông nghiệp và phân bố ngành sản xuất tại Đài Loan',
    'map.markers.taiwanPineappleCake.desc':
      'Sự biến đổi cảnh quan nông nghiệp từ bắc xuống nam cho thấy hành trình chuyển mình của Đài Loan từ 「vựa lúa Đài Loan」 sang 「nông nghiệp tinh hoa」',
    'map.markers.taiwanPorkRibSoup.title':
      'Phát triển đô thị và khoảng cách thành thị-nông thôn tại Đài Loan',
    'map.markers.taiwanPorkRibSoup.desc':
      'Sự phát triển không đồng đều giữa thành thị và nông thôn Đài Loan trong cục diện sáu đô thị trực thuộc, cùng quá trình chuyển đổi không gian từ một Đài Loan nông nghiệp sang một Đài Loan đô thị',
    'map.markers.taiwanOysterOmelette.title': 'Địa hình và địa chất',
    'map.markers.taiwanOysterOmelette.desc':
      'Hòn đảo 600 vạn năm tuổi lưu giữ ký ức cổ xưa suốt 2 ức năm — kỳ tích của vành đai tạo sơn trẻ nhất thế giới và sự va chạm kiến tạo mảng dữ dội nhất',
    'map.markers.taiwanBreakfastCulture.title':
      'Đặc trưng đô thị và văn hóa vùng miền',
    'map.markers.taiwanBreakfastCulture.desc':
      'Từ đô thị quốc tế Đài Bắc đến phong vị cố đô Đài Nam, các thành phố Đài Loan đã định hình bản sắc địa phương độc đáo như thế nào',
    'map.markers.taiwanConvenienceStoreFood.title':
      'Hải đảo và văn hóa đại dương: từ mật độ đăng đá bắt cá cao nhất thế giới đến luật sinh thái mùa cá chuồn',
    'map.markers.taiwanConvenienceStoreFood.desc':
      'Toàn thế giới có chưa đến 600 đăng đá bắt cá, riêng Bành Hồ đã có 574. Một cộng đồng dân tộc trên đảo chuyên đánh bắt cá chuồn đã biến những điều cấm kỵ thành hệ thống quản lý tài nguyên biển tinh vi nhất',
    'map.markers.dutchSpanishColonialPeriod.title':
      'Sự kiện 28 tháng 2 và Khủng bố Trắng: sang chấn và ký ức dưới chế độ uy quyền tại Đài Loan',
    'map.markers.dutchSpanishColonialPeriod.desc':
      'Từ Sự kiện 28 tháng 2 năm 1947 đến chế độ thiết quân luật kéo dài 38 năm, Đài Loan đã trải qua bạo lực nhà nước dưới ách cai trị uy quyền; chỉ sau khi dỡ bỏ thiết quân luật, xã hội mới bắt đầu đối diện với sang chấn lịch sử và thúc đẩy công lý chuyển tiếp.',
    'map.markers.zhengDynastyPeriod.title':
      'Khủng hoảng eo biển Đài Loan và sự phát triển quan hệ hai bờ',
    'map.markers.zhengDynastyPeriod.desc':
      'Nhìn lại ba cuộc khủng hoảng lớn tại eo biển Đài Loan và tiến trình hơn bảy mươi năm phát triển quan hệ hai bờ, qua đó hiểu rõ bối cảnh lịch sử và những thách thức đương đại của tình hình eo biển',
    'map.markers.qingDynastyTaiwanHistory.title':
      'Lịch sử thương mại hàng hải Đài Loan',
    'map.markers.qingDynastyTaiwanHistory.desc':
      'Đài Loan trong Thời đại Khám phá, với huyền thoại thăng trầm từ trung tâm thương mại quốc tế đến vương quốc hải tặc',
    'map.markers.japaneseColonialRule.title':
      'Lịch sử các làng quân nhân Đài Loan',
    'map.markers.japaneseColonialRule.desc':
      'Từ đội quân cô độc ở Miến Điện đến vương quốc hàng rào tre, cuộc đại di cư của 120 vạn người đã định nghĩa lại 「nhà」 như thế nào',
    'map.markers.februaryTwentyEightIncident.title':
      'Lịch sử đường sắt Đài Loan',
    'map.markers.februaryTwentyEightIncident.desc':
      'Từ Lưu Minh Truyền thời nhà Thanh, tuyến đường sắt dọc đảo thời Nhật trị đến đường sắt cao tốc, đường sắt đã định hình sự phát triển đô thị và ký ức văn hóa Đài Loan như thế nào',
    'map.markers.martialLawPeriod.title':
      'Chính phủ Quốc dân dời sang Đài Loan và công cuộc tái thiết hậu chiến',
    'map.markers.martialLawPeriod.desc':
      'Tìm hiểu bối cảnh lịch sử, quá trình và tác động của việc Chính phủ Quốc dân dời sang Đài Loan năm 1949, cũng như công cuộc tái thiết chính trị, kinh tế và xã hội tại Đài Loan sau chiến tranh',
    'map.markers.democratization.title': 'Thời kỳ Nhật trị',
    'map.markers.democratization.desc':
      'Trong 50 năm Nhật Bản cai trị Đài Loan từ 1895-1945, chính quyền đã tiến hành hiện đại hóa toàn diện và quản lý theo thể chế, đồng thời thực thi chính sách đồng hóa, tác động sâu sắc đến sự phát triển xã hội Đài Loan',
    'map.markers.taiwanIndependenceMovement.title': 'Thời kỳ Thanh trị',
    'map.markers.taiwanIndependenceMovement.desc':
      'Trong khoảng 212 năm nhà Thanh cai trị Đài Loan từ 1683-1895, chính sách chuyển từ quản lý thụ động sang xây dựng tích cực, đặt nền móng cho phân chia hành chính Đài Loan hiện đại và xã hội người Hán',
    'map.markers.taiwanChinaRelations.title':
      'Thời kỳ Hà Lan, Tây Ban Nha và Minh-Trịnh',
    'map.markers.taiwanChinaRelations.desc':
      'Lần đầu tiên trong lịch sử Đài Loan xuất hiện chế độ thuộc địa có hệ thống, từ khi người Hà Lan xây dựng thành Zeelandia đến khi Trịnh Thành Công (Koxinga) khai phá Đài Loan, đặt nền móng cho sự di cư của người Hán và hệ thống chính trị',
    'map.markers.taiwanUsRelations.title': 'Văn hóa cửa hàng tiện lợi',
    'map.markers.taiwanUsRelations.desc':
      'Các cửa hàng tiện lợi Đài Loan có mật độ cao nhất thế giới đã chuyển mình từ điểm bán lẻ thành hệ điều hành đời sống của cả một quốc gia như thế nào',
    'map.markers.taiwanInternationalStatus.title':
      'Hệ thống giao thông Đài Loan',
    'map.markers.taiwanInternationalStatus.desc':
      'Đường sắt cao tốc xuyên suốt bắc-nam trong 90 phút, tàu điện ngầm dệt kín huyết mạch đô thị, xe máy len lỏi giữa những ngõ hẻm',
    'map.markers.taiwanHistoricalFigures.title':
      'Văn hóa cửa hàng tiện lợi Đài Loan',
    'map.markers.taiwanHistoricalFigures.desc':
      'Vương quốc cửa hàng tiện lợi có mật độ cao nhất thế giới, với những đổi mới bản địa hóa của 7-11 và FamilyMart, đã định nghĩa lại lối sống hiện đại',
    'map.markers.taiwanPoliticalFigures.title':
      'Công viên và hoạt động thư giãn thường nhật tại Đài Loan',
    'map.markers.taiwanPoliticalFigures.desc':
      'Từ tập thái cực quyền lúc bình minh đến tản bộ ban đêm——góc nhìn văn hóa về công viên Đài Loan như không gian giao lưu liên thế hệ',
    'map.markers.kuomintangHistory.title': 'Văn hóa cà phê Đài Loan',
    'map.markers.kuomintangHistory.desc':
      'Nằm trong ba nơi có mật độ quán cà phê độc lập cao nhất thế giới, từ hạt cà phê A Lý Sơn đến văn hóa làm việc tại quán — một nền cà phê học của đảo',
    'map.markers.democraticProgressivePartyHistory.title':
      'Hòn đảo đuổi theo xe rác: Đài Loan từ khủng hoảng rác thải đến kỳ tích tái chế',
    'map.markers.democraticProgressivePartyHistory.desc':
      'Một nơi từng có 400 bãi chôn lấp sắp đầy vào thập niên 1990 và bị truyền thông quốc tế gọi là 「đảo rác」 đã dùng âm nhạc của Beethoven để 2,300 vạn người đuổi theo xe rác mỗi ngày; 30 năm sau, tỷ lệ tái chế tài nguyên vượt qua phần lớn các nước châu Âu',
    'map.markers.taipeiHistory.title':
      'Lịch sử phát triển tàu điện ngầm Đài Loan: thuyết tiến hóa đô thị được viết bằng máu và tiền',
    'map.markers.taipeiHistory.desc':
      'Dầm thép nặng 209 tấn từ trên trời rơi xuống cướp đi 4 sinh mạng, khoản bồi thường 16.4 ức, hoạt động cốt lõi của tàu điện ngầm Đài Bắc đến nay vẫn thua lỗ——cái giá thực sự phía sau hệ thống tàu điện ngầm toàn Đài Loan',
    'map.markers.taiwanPrehistoricCulture.title':
      'Hệ thống giáo dục Đài Loan: cuộc thử nghiệm trên đảo từ địa ngục thi tuyển chung đến mê cung đa dạng',
    'map.markers.taiwanPrehistoricCulture.desc':
      'Đài Loan dành 30 năm để tìm cách phá bỏ chế độ thi tuyển chung, nhưng kỳ thi phân ban mới nhất lại khiến số học viên đăng ký các lớp luyện thi lại tăng gấp đôi. Một hòn đảo đã liên tục tiến hành những thử nghiệm xã hội giữa áp lực học lên và công bằng giáo dục như thế nào?',
    'map.markers.taiwanIndigenousHistory.title': 'Văn hóa xe máy Đài Loan',
    'map.markers.taiwanIndigenousHistory.desc':
      'Vương quốc đảo có mật độ xe máy thuộc nhóm cao nhất thế giới, với quá trình phát triển văn hóa từ phương tiện đi lại hằng ngày thành lối sống',
    'map.markers.taiwanMilitaryHistory.title':
      'Văn hóa hành lang mái vòm và cảnh quan đường phố Đài Loan',
    'map.markers.taiwanMilitaryHistory.desc':
      'Hành lang sinh hoạt che mưa chắn gió, nơi xe máy, hàng rong và tình người đan xen thành ký ức đường phố Đài Loan',
    'map.markers.taiwanWomenHistory.title': 'Đời sống về đêm và văn hóa KTV',
    'map.markers.taiwanWomenHistory.desc':
      'Từ phòng hát Cashbox Partyworld đến quán ăn đêm, đời sống về đêm trên hòn đảo không ngủ suốt 24 giờ',
    'map.markers.taiwanEducationHistory.title':
      'Tôn giáo và tín ngưỡng dân gian: từ quản trị nỗi sợ đến đế chế đức tin',
    'map.markers.taiwanEducationHistory.desc':
      'Đài Loan có mật độ đền miếu cao nhất thế giới, đồng thời đứng đầu thế giới về tự do tôn giáo——đằng sau nghịch lý này là trí tuệ sinh tồn của những di dân quân sự từ thế kỷ 17',
    'map.markers.taiwanReligiousHistory.title': 'Văn hóa suối nước nóng',
    'map.markers.taiwanReligiousHistory.desc':
      'Từ nơi điều dưỡng quân sự đến một trong ba suối bùn lớn nhất thế giới: câu chuyện Đài Loan bất ngờ trở thành vương quốc suối nước nóng',
    'map.markers.taiwanMediaHistory.title':
      'Truyền thống âm nhạc của các dân tộc bản địa Đài Loan',
    'map.markers.taiwanMediaHistory.desc':
      'Khám phá nền văn hóa âm nhạc phong phú của 16 dân tộc bản địa Đài Loan, từ lối ngâm hát cổ truyền đến nhạc cụ truyền thống, chứng kiến di sản văn hóa được lưu truyền suốt hàng nghìn năm',
    'map.markers.badmintonChampions.title':
      'Ngành chế tạo nhạc cụ Đài Loan: từ saxophone Hậu Lý đến công xưởng âm nhạc toàn cầu',
    'map.markers.badmintonChampions.desc':
      'Khám phá quá trình phát triển của ngành chế tạo nhạc cụ Đài Loan, từ vị thế thống trị toàn cầu của saxophone Hậu Lý, vương quốc gia công guitar đến kỹ nghệ chế tác hộp nhạc tinh xảo, cùng hành trình Đài Loan chuyển từ gia công sang xây dựng thương hiệu riêng',
    'map.markers.baseballCulture.title': 'Phong trào dân ca Đài Loan',
    'map.markers.baseballCulture.desc':
      'Từ «hát những bài ca của chính mình» đến thay đổi toàn bộ nền âm nhạc Hoa ngữ——cuộc cách mạng văn hóa của giới trẻ trong thập niên 1970',
    'map.markers.taiwanBasketball.title':
      'Sự chuyển mình của đời sống âm nhạc độc lập Đài Loan',
    'map.markers.taiwanBasketball.desc':
      'Từ ban nhạc ngầm đến âm nhạc độc lập, khám phá hành trình phát triển ba mươi năm và ý nghĩa văn hóa của âm nhạc phi chính thống Đài Loan',
    'map.markers.marathonRunning.title':
      'Âm nhạc điện tử và văn hóa tiệc tùng Đài Loan: từ Rave ngầm đến sân khấu quốc tế',
    'map.markers.marathonRunning.desc':
      'Từ văn hóa tiệc Rave thập niên 1990 đến lễ hội nhạc điện tử Road to Ultra, âm nhạc điện tử Đài Loan đã đi từ thế giới ngầm ra dòng chính, nuôi dưỡng các DJ đẳng cấp quốc tế và hãng đĩa điện tử độc lập như thế nào',
    'map.markers.taiwanEsports.title':
      'Văn hóa lễ hội âm nhạc Đài Loan: từ Spring Scream đến phương tiện chuyên chở văn hóa thanh niên nở rộ khắp nơi',
    'map.markers.taiwanEsports.desc':
      'Khám phá hành trình phát triển của các lễ hội âm nhạc Đài Loan, từ Spring Scream, Lễ hội Âm nhạc Đại dương đến Megaport Festival, cùng cách chúng trở thành vườn ươm ban nhạc độc lập và nền tảng biểu đạt cốt lõi của văn hóa thanh niên',
    'map.markers.taiwanOlympics.title':
      'Đời sống âm nhạc độc lập Đài Loan đương đại',
    'map.markers.taiwanOlympics.desc':
      'Từ các buổi biểu diễn ngầm đến hệ sinh thái công nghiệp, phân tích tiến trình phát triển và sức ảnh hưởng văn hóa của hệ sinh thái âm nhạc độc lập Đài Loan hiện đại',
    'map.markers.taipeiCycle.title':
      'Trí tuệ sinh thái và bảo tồn môi trường của các dân tộc bản địa Đài Loan',
    'map.markers.taipeiCycle.desc':
      'Tìm hiểu tri thức sinh thái truyền thống được các dân tộc bản địa Đài Loan tích lũy suốt hàng nghìn năm, cùng giá trị quan trọng và phương thức thực hành trong công cuộc bảo tồn môi trường hiện đại',
    'map.markers.taiwanBetelNutCulture.title':
      'Núi non và văn hóa leo núi Đài Loan',
    'map.markers.taiwanBetelNutCulture.desc':
      '268 ngọn núi cao ba nghìn mét và văn hóa Bách Nhạc: sự phát triển của phong trào leo núi Đài Loan và những thách thức trong bảo tồn núi rừng',
    'map.markers.taiwanElections.title': 'Hệ sinh thái rừng Đài Loan',
    'map.markers.taiwanElections.desc':
      'Từ bờ biển cận nhiệt đới đến rừng lá kim vùng núi cao, thế giới rừng phong phú trong chênh lệch độ cao 3000 mét của Đài Loan',
    'map.markers.taiwanLgbtCulture.title':
      'Biến đổi khí hậu và chuyển đổi phát thải ròng bằng 0 tại Đài Loan',
    'map.markers.taiwanLgbtCulture.desc':
      'Đài Loan đang đối mặt với tác động của biến đổi khí hậu, từ hiện tượng thời tiết cực đoan xảy ra thường xuyên đến kế hoạch chính sách nhằm đạt mục tiêu phát thải carbon ròng bằng 0 vào năm 2050, qua đó tìm hiểu những cơ hội và thách thức trong quá trình chuyển đổi năng lượng',
    'map.markers.taiwanMotorcycleCulture.title':
      'Bảo tồn biển Đài Loan: vì sao hệ thống được xây dựng suốt 30 năm không thể cứu nổi một đợt tẩy trắng san hô?',
    'map.markers.taiwanMotorcycleCulture.desc':
      'Năm 2020, vùng biển Đài Loan trải qua đợt tẩy trắng san hô lớn nhất trong lịch sử. Từ Tiểu Lưu Cầu đến rạn san hô vòng Đông Sa, ngay cả san hô trong các khu bảo tồn cũng chết vì nhiệt độ cao. Điều này phơi bày những vấn đề gì?',
    'map.markers.taipeiMrt.title':
      'Quản lý ô nhiễm biển và thách thức bảo tồn tại Đài Loan',
    'map.markers.taipeiMrt.desc':
      'Trước rác thải biển, tình trạng đánh bắt quá mức và biến đổi khí hậu, tìm hiểu thực trạng, thách thức cùng các giải pháp sáng tạo trong công cuộc bảo tồn biển tại Đài Loan',
    'map.markers.kaohsiungMrt.title': 'Sinh thái biển Đài Loan',
    'map.markers.kaohsiungMrt.desc':
      'Vùng biển được người Tao bảo vệ bằng những điều cấm kỵ nay đang tẩy trắng giữa nhiệt độ cao và tiếng ồn dưới nước: khi trí tuệ sinh thái hàng nghìn năm đối mặt với khủng hoảng đại dương hiện đại',
    'map.markers.taichungMrt.title':
      'Sinh thái biển và bảo tồn rạn san hô Đài Loan',
    'map.markers.taichungMrt.desc':
      'Đài Loan bốn bề giáp biển và sở hữu hệ sinh thái biển phong phú; từ khủng hoảng tẩy trắng rạn san hô đến bảo tồn cá voi và cá heo, tìm hiểu hiệu quả bảo vệ của các công viên quốc gia biển cùng những thách thức trong tương lai',
    'map.markers.taiwanTrainSystem.title':
      'Suối nước nóng và địa nhiệt Đài Loan',
    'map.markers.taiwanTrainSystem.desc':
      'Từ nhà máy điện địa nhiệt thất bại 30 năm trước đến đá Bắc Đầu duy nhất trên thế giới: một hòn đảo đã biến ngọn lửa dưới lòng đất thành liệu pháp chữa lành và điện xanh như thế nào',
    'map.markers.taiwanBusSystem.title': 'Bảo tồn mèo báo Đài Loan',
    'map.markers.taiwanBusSystem.desc':
      'Loài mèo ma chỉ còn chưa đến năm trăm cá thể trên toàn Đài Loan——khi loài mèo bản địa cuối cùng tiến đến bờ vực biến mất',
    'map.markers.taiwanInnovationEcosystem.title': 'Tê tê Đài Loan',
    'map.markers.taiwanInnovationEcosystem.desc':
      'Loài thú bị buôn lậu nhiều nhất thế giới đã tìm thấy một mái nhà an toàn tại Đài Loan',
    'map.markers.taiwanMedicalSystem.title':
      'Hệ sinh thái núi cao và các loài sót lại từ thời băng hà tại Đài Loan',
    'map.markers.taiwanMedicalSystem.desc':
      'Tìm hiểu hệ sinh thái độc đáo ở vùng núi cao trên 3000 mét của Đài Loan, từ sam Đài Loan, đỗ quyên Ngọc Sơn đến sự đa dạng sinh học quý giá của các loài sót lại từ thời băng hà',
    'map.markers.taiwanEducationSystem.title': 'Gấu đen Đài Loan',
    'map.markers.taiwanEducationSystem.desc':
      'Chữ V màu trắng trước ngực là dấu ấn của loài——vị vua cuối cùng của núi rừng Đài Loan và cuộc chiến bảo tồn vẫn chưa kết thúc',
    'map.markers.taiwanMusicIndustry.title': 'Công viên quốc gia',
    'map.markers.taiwanMusicIndustry.desc':
      '36,197 kilômét vuông chứa 9 công viên quốc gia, kỳ tích bảo tồn có mật độ cao nhất thế giới',
    'map.markers.mandarinPopMusic.title': 'Các công viên quốc gia Đài Loan',
    'map.markers.mandarinPopMusic.desc':
      'Khám phá hệ sinh thái độc đáo và giá trị bảo tồn của chín công viên quốc gia Đài Loan, từ bờ biển cận nhiệt đới đến đường tuyết vùng núi cao, tạo nên một cảnh quan toàn vẹn',
    'map.markers.taiwaneseIndieMusic.title': 'Các loài đặc hữu',
    'map.markers.taiwaneseIndieMusic.desc':
      'Nguồn sinh vật đặc hữu phong phú của Đài Loan thể hiện kỳ tích tiến hóa của địa sinh học hải đảo và tầm quan trọng của công tác bảo tồn',
    'map.markers.taiwanRapHipHop.title': 'Đa dạng sinh thái',
    'map.markers.taiwanRapHipHop.desc':
      'Diện tích Đài Loan chỉ chiếm 0.025% toàn cầu nhưng có hơn 5 vạn loài sinh vật, với tỷ lệ che phủ rừng 60.71%, đứng thứ 33 thế giới',
    'map.markers.taiwanElectronicMusic.title': 'Cá voi và cá heo tại Đài Loan',
    'map.markers.taiwanElectronicMusic.desc':
      'Môi trường sống của một phần ba số loài cá voi và cá heo trên toàn cầu——từ săn bắt cá voi trong quá khứ đến ngắm cá voi ngày nay, Đài Loan đã chuyển mình thành trung tâm nghiên cứu sinh thái biển như thế nào?',
    'map.markers.taiwanTraditionalMusic.title': 'Mayday',
    'map.markers.taiwanTraditionalMusic.desc':
      'Từ Trường Trung học trực thuộc Đại học Sư phạm Quốc gia Đài Loan vươn ra sân khấu thế giới, những chàng trai mãi tuổi thanh xuân đã định hình tinh thần rock Hoa ngữ',
    'map.markers.taiwanFilmIndustry.title': 'Wu Bai',
    'map.markers.taiwanFilmIndustry.desc':
      'Báu vật quốc gia của rock Đài Loan, biểu tượng của nhạc rock bản địa, khẳng định vị thế trong làng rock bằng các tác phẩm như «Rừng Na Uy»',
    'map.markers.newTaiwanCinema.title': 'Ngô Bảo Xuân (Wu Pao-chun)',
    'map.markers.newTaiwanCinema.desc':
      'Nhà vô địch cuộc thi bánh mì thế giới, gây tiếng vang quốc tế với bánh mì vải thiều hoa hồng, từ miền quê Bình Đông vươn lên hàng ngũ nghệ nhân làm bánh hàng đầu thế giới',
    'map.markers.taiwanDocumentary.title': 'Lữ Tú Liên (Annette Lu)',
    'map.markers.taiwanDocumentary.desc':
      'Từ tội phạm phản loạn đến phó tổng thống: cuộc đời huyền thoại của nữ phó tổng thống đầu tiên trong thế giới Hoa ngữ',
    'map.markers.taiwanAnimationIndustry.title': 'Jimmy Liao',
    'map.markers.taiwanAnimationIndustry.desc':
      'Nhà thơ minh họa sưởi ấm thế giới bằng sách tranh, đưa sách tranh Đài Loan lên sân khấu quốc tế',
    'map.markers.taiwanTelevisionIndustry.title': 'Tai Tzu-ying',
    'map.markers.taiwanTelevisionIndustry.desc':
      'Người giữ kỷ lục 214 tuần đứng đầu thế giới, nữ hoàng cầu lông Đài Loan vươn từ Tiền Trấn, Cao Hùng đến tấm huy chương bạc Olympic',
    'map.markers.taiwanOttPlatforms.title': 'Lý Ngang (Li Ang)',
    'map.markers.taiwanOttPlatforms.desc':
      'Tác giả 《Giết chồng》《Khu vườn mê lộ》, nhà tiên phong của văn học nữ quyền Đài Loan',
    'map.markers.taiwanPodcastIndustry.title': 'Lý Trí Khải (Lee Chih-kai)',
    'map.markers.taiwanPodcastIndustry.desc':
      'Từ cậu Khải chợ rau trong 《Lộn nhào nào! Các cậu bé》 đến huy chương bạc Olympic, hành trình nhào lộn 16 năm của hoàng tử ngựa tay quay Đài Loan',
    'map.markers.taiwanPublishing.title': 'Lý Viễn Triết (Lee Yuan-tseh)',
    'map.markers.taiwanPublishing.desc':
      'Chủ nhân Giải Nobel Hóa học năm 1986, người khai mở lĩnh vực mới trong động lực học hóa học bằng kỹ thuật chùm phân tử giao nhau và là nhà khoa học Đài Loan đầu tiên đoạt Giải Nobel',
    'map.markers.taiwanBookstoreCulture.title': 'Đỗ Thông Minh (Tu Tsung-ming)',
    'map.markers.taiwanBookstoreCulture.desc':
      'Tiến sĩ y khoa đầu tiên của Đài Loan, cha đẻ của nền y học hiện đại Đài Loan',
    'map.markers.taiwanComicMangaIndustry.title': 'Lâm Thư Hào (Jeremy Lin)',
    'map.markers.taiwanComicMangaIndustry.desc':
      'Cầu thủ người Mỹ gốc Đài Loan đi từ sinh viên xuất sắc Harvard đến chức vô địch NBA, tạo nên cơn sốt Linsanity toàn cầu',
    'map.markers.taiwanGameIndustry.title': 'Lâm Nghĩa Kiệt (Kevin Lin)',
    'map.markers.taiwanGameIndustry.desc':
      'Từ cậu bé gầy gò bị đội điền kinh từ chối đến vận động viên chạy địa hình khắc nghiệt lập nên lịch sử khi băng qua sa mạc Sahara bằng đôi chân',
    'map.markers.nationalPalaceMuseum.title': 'Lâm Nghĩa Hùng (Lin I-hsiung)',
    'map.markers.nationalPalaceMuseum.desc':
      'Nhà tiên phong của phong trào dân chủ, nạn nhân vụ thảm sát gia đình họ Lâm và lãnh tụ phong trào phản đối Nhà máy điện hạt nhân số 4',
    'map.markers.nationalParks.title': 'Edward Yang (Dương Đức Xương)',
    'map.markers.nationalParks.desc':
      'Nhân vật nòng cốt của phong trào Điện ảnh mới Đài Loan, đạo diễn xuất sắc nhất Cannes và thi sĩ của sự tha hóa đô thị',
    'map.markers.taiwanGeography.title': 'Bạch Tiên Dũng (Pai Hsien-yung)',
    'map.markers.taiwanGeography.desc':
      'Tác giả 《Người Đài Bắc》, bậc thầy văn học hiện đại và người thúc đẩy sự phục hưng Côn khúc',
    'map.markers.taiwanClimate.title': 'Crowd Lu (Lư Quảng Trọng)',
    'map.markers.taiwanClimate.desc':
      'Ca sĩ kiêm nhạc sĩ sáng tác và diễn viên Đài Loan, chủ nhân ba giải Kim Khúc, Kim Chung và Kim Mã, nổi tiếng với hình ảnh bình dị, gần gũi cùng lối hát độc đáo',
    'map.markers.taiwanEcosystem.title': 'Trang Trí Uyên (Chuang Chih-yuan)',
    'map.markers.taiwanEcosystem.desc':
      'Người được mệnh danh là cha đỡ đầu của bóng bàn, đại diện bốn kỳ Olympic và người hùng cô độc một mình khổ luyện',
    'map.markers.taiwanEndangeredSpecies.title':
      'Tsai Ming-liang (Thái Minh Lượng)',
    'map.markers.taiwanEndangeredSpecies.desc':
      'Chủ nhân Sư tử vàng Venice, nhà làm phim người Hoa tại Malaysia và bậc thầy mỹ học điện ảnh chậm',
    'map.markers.taiwanMarineEcology.title': 'Hứa Văn Long (Shi Wen-long)',
    'map.markers.taiwanMarineEcology.desc':
      'Nhà sáng lập Tập đoàn Chi Mei, mang ba vai trò doanh nhân, nghệ sĩ vĩ cầm và nhà sưu tập nghệ thuật, đồng thời là người sáng lập Bảo tàng Chi Mei',
    'map.markers.taiwanBirdwatching.title': 'Hứa Phương Nghi (Fang-Yi Sheu)',
    'map.markers.taiwanBirdwatching.desc':
      'Từ cô gái Nghi Lan đến vũ công chính của Đoàn vũ kịch Martha Graham, rồi trở về Đài Loan thành lập LAFA & Artists——cô dùng cơ thể kể những câu chuyện mạnh mẽ nhất của Đài Loan',
    'map.markers.taiwanHotSprings.title':
      'Lại Thanh Đức (Lai Ching-te): từ gia đình thợ mỏ đến vị bác sĩ y tế công cộng tại Phủ Tổng thống',
    'map.markers.taiwanHotSprings.desc':
      'Tổng thống thứ 16 của Đài Loan, chính khách đầu tiên trong lịch sử hiến chính Trung Hoa Dân Quốc tranh cử từ cương vị phó tổng thống và đắc cử',
    'map.markers.taiwanIslands.title': 'Quách Hạnh Thuần (Kuo Hsing-chun)',
    'map.markers.taiwanIslands.desc':
      'Nữ thần cử tạ Đài Loan, chủ nhân huy chương vàng Olympic Tokyo 2021 và người giữ ba kỷ lục Olympic hạng 59 kg',
    'map.markers.taiwanMountains.title': 'Đặng Vũ Hiền (Teng Yu-hsien)',
    'map.markers.taiwanMountains.desc':
      'Cha đẻ của dân ca Đài Loan, tác giả những ca khúc tiếng Đài kinh điển như 《Ngóng gió xuân》《Hoa đêm mưa》《Sầu đêm trăng》',
    'map.markers.taiwanRivers.title': 'Chung Lý Hòa (Chung Li-ho)',
    'map.markers.taiwanRivers.desc':
      'Tác giả 《Người quê cũ》, cha đẻ của văn học Đài Loan và chiến sĩ văn chương vẫn kiên trì sáng tác giữa cảnh nghèo khó, bệnh tật',
    'map.markers.taiwanCoastline.title': 'Trần Thụ Cúc (Chen Shu-chu)',
    'map.markers.taiwanCoastline.desc':
      'Những nghĩa cử bình dị của người bán rau tại Đài Đông đã dùng cả cuộc đời để diễn giải thế nào là giàu có đích thực',
    'map.markers.taiwanForests.title': 'Trần Thủy Biển (Chen Shui-bian)',
    'map.markers.taiwanForests.desc':
      'Tổng thống thứ mười và mười một, nhân vật chính trong cuộc chuyển giao quyền lực giữa các chính đảng lần đầu tiên vào năm 2000 và là nhân vật quan trọng của tiến trình dân chủ hóa Đài Loan',
    'map.markers.taiwanNaturalDisasters.title': 'Mã Anh Cửu (Ma Ying-jeou)',
    'map.markers.taiwanNaturalDisasters.desc':
      'Tổng thống thứ mười hai và mười ba, người thúc đẩy phá băng quan hệ hai bờ eo biển và ký kết ECFA',
    'map.markers.taiwanEarthquakes.title': 'Hoàng Xuân Minh (Huang Chun-ming)',
    'map.markers.taiwanEarthquakes.desc':
      'Tác giả 《Con rối lớn của con trai》《Những ngày ngắm biển》, nhà văn tiêu biểu của văn học bản địa Nghi Lan',
    'map.markers.taiwanTyphoons.title':
      'Hoàng Chấn Nam (Huang Chen-nan): “Takenouchi Yutaka của giới sưu tầm sách” và nguồn nước sống của văn sử Đài Loan',
    'map.markers.taiwanTyphoons.desc':
      'Hoàng Chấn Nam là nhà nghiên cứu văn sử, nhà sưu tầm sách và nhà văn Đài Loan, khởi đầu với biệt danh Sizumaru trên PTT, điều hành trang “Hoạt Thủy Lai Sách Phòng” để chia sẻ lịch sử Đài Loan và văn hóa sách cũ. Ông là tác giả của những cuốn sách như 《Lịch sử Đài Loan dí dỏm nhất trong lịch sử Đài Loan》, được mệnh danh là Takenouchi Yutaka của giới sưu tầm sách. Xuất thân từ một gia đình hiếu học tại Lục Cước, Chiayi, ông cùng cha phân công hai miền nam bắc để sưu tầm tư liệu, nỗ lực đưa lịch sử Đài Loan nghiêm túc trở nên thú vị và gần gũi.',
    'map.markers.sunflowerMovement.title':
      'Vườn thú và đạo đức đối với động vật biểu diễn',
    'map.markers.sunflowerMovement.desc':
      'Từ những chú voi trong lồng sắt đến bức tường sứa tại Xpark——Đài Loan đang định nghĩa lại mối quan hệ giữa con người và động vật bị trưng bày',
    'map.markers.taiwanSocialMovements.title':
      'Công lý đất đai và lãnh thổ truyền thống của các dân tộc bản địa Đài Loan',
    'map.markers.taiwanSocialMovements.desc':
      'Khảo sát bối cảnh lịch sử của quyền đất đai các dân tộc bản địa Đài Loan, quá trình phát triển pháp luật, tranh cãi về việc phân định lãnh thổ truyền thống và thành quả hoạt động của Ủy ban Công lý Chuyển tiếp cho các Dân tộc Bản địa',
    'map.markers.taiwanMarriageEquality.title':
      'Hôn nhân đồng giới và bình đẳng giới tại Đài Loan',
    'map.markers.taiwanMarriageEquality.desc':
      'Từ một tù nhân thời thiết quân luật đến đạo luật hôn nhân đồng giới đầu tiên ở châu Á, cuộc đấu tranh 30 năm của một người đàn ông đã viết lại định nghĩa tình yêu trên hòn đảo ra sao',
    'map.markers.taiwanEnvironmentalJustice.title':
      'Công lý môi trường và tranh cãi NIMBY tại Đài Loan',
    'map.markers.taiwanEnvironmentalJustice.desc':
      'Khảo sát hiện tượng phân bổ bất bình đẳng gánh nặng môi trường tại Đài Loan, từ xung đột NIMBY quanh lò đốt rác, chất thải hạt nhân đến ngành hóa dầu, qua đó phân tích bất bình đẳng môi trường và các vấn đề công bằng xã hội',
    'map.markers.taiwanCommunityRiCulture.title':
      'Cộng đồng và văn hóa lý tại Đài Loan',
    'map.markers.taiwanCommunityRiCulture.desc':
      'Từ thực hành dân chủ ở cấp cơ sở nhất đến đổi mới xã hội trong kiến tạo cộng đồng',
    'map.markers.taiwanLongTermCare.title':
      'Sự phát triển của hệ thống chăm sóc dài hạn Đài Loan',
    'map.markers.taiwanLongTermCare.desc':
      'Một trong những hệ thống chăm sóc dài hạn tiên tiến nhất thế giới, nhưng đồng thời tồn tại mạng lưới chăm sóc vô hình lớn nhất',
    'map.markers.taiwanLaborMovement.title':
      'Bảo vệ môi trường và phát triển bền vững',
    'map.markers.taiwanLaborMovement.desc':
      'Từ hòn đảo ống khói đến Đài Loan phát thải ròng bằng 0: hành trình thức tỉnh của 40 năm phong trào bảo vệ môi trường',
    'map.markers.taiwanHousingIssues.title': 'Nhà ở xã hội và công lý cư trú',
    'map.markers.taiwanHousingIssues.desc':
      'Đài Loan hiện thực hóa công lý cư trú thông qua chính sách nhà ở xã hội ra sao để mọi người đều có chốn an cư lạc nghiệp',
    'map.markers.taiwanHealthcareSystem.title': 'Phát triển khu công nghệ',
    'map.markers.taiwanHealthcareSystem.desc':
      'Từ Khu khoa học Tân Trúc đến Khu khoa học miền Nam, khảo sát tiến trình phát triển các khu khoa học Đài Loan và vị thế riêng biệt của ba khu lớn',
    'map.markers.taiwanImmigration.title': 'Ngành công nghiệp bán dẫn',
    'map.markers.taiwanImmigration.desc':
      'Từ canh bạc lịch sử của Morris Chang đến kỷ nguyên 2 nanomet: TSMC đã đưa Đài Loan trở thành huyết mạch công nghệ toàn cầu ra sao',
    'map.markers.taiwanReligiousDiversity.title':
      'Địa hình bờ biển và cảnh quan biển Đài Loan',
    'map.markers.taiwanReligiousDiversity.desc':
      'Phần cổ của Đầu Nữ vương Dã Liễu đang mỏng đi với tốc độ 0.2 cm mỗi năm và một ngày nào đó sẽ gãy——đó chính là định mệnh và vẻ đẹp của địa hình bờ biển Đài Loan',
    'map.markers.taiwanBuddhismTaoism.title':
      'Trà đạo và mỹ học đời sống Đài Loan',
    'map.markers.taiwanBuddhismTaoism.desc':
      'Đêm khai trương Tử Đằng Lư năm 1981, các nhân sĩ đối lập và văn nhân tao nhã tụ họp thưởng trà; nơi đây không chỉ là một trà quán mà còn là căn cứ bí mật của phong trào đối lập',
    'map.markers.taiwanFolkReligion.title':
      'Bầu cử và chính trị đảng phái Đài Loan',
    'map.markers.taiwanFolkReligion.desc':
      'Từ hội đồng địa phương năm 1950 đến cuộc chuyển giao quyền lực giữa các chính đảng năm 2000, hãy nhìn lại cách Đài Loan dùng lá phiếu viết nên kỳ tích chuyển đổi dân chủ',
    'map.markers.taiwanChristianity.title':
      'Phát triển đô thị và khoảng cách thành thị–nông thôn tại Đài Loan',
    'map.markers.taiwanChristianity.desc':
      'Trong 70 năm, từ một hòn đảo nông nghiệp trở thành đảo đô thị, ánh sáng và bóng tối khi 70% dân số tập trung tại sáu đô thị trực thuộc: sự đối lập khắc nghiệt giữa Đài Trung phồn vinh và Vân Lâm suy tàn',
    'map.markers.taiwanIslamJudaism.title':
      'Đặc trưng đô thị và văn hóa vùng miền',
    'map.markers.taiwanIslamJudaism.desc':
      'Từ 4,04 triệu người ở Tân Bắc đến 1,85 triệu người ở Đài Nam, hãy nhìn cách sáu đô thị trực thuộc định hình bản sắc riêng trong quá trình chuyển đổi công nghiệp',
    'map.markers.kaohsiungIncident.title': 'Dân chủ hóa',
    'map.markers.kaohsiungIncident.desc':
      'Cuộc xung đột giữa cảnh sát và người dân trên đường phố Cao Hùng ngày 10 tháng 12 năm 1979 cuối cùng đã thúc đẩy quá trình chuyển đổi dân chủ của Đài Loan——nhưng bao nhiêu người đã phải đánh đổi tuổi trẻ và tự do?',
    'map.markers.wangLeeOlympicGold.title':
      'Vương Tề Lân và Lý Dương（cặp đôi Lân–Dương）',
    'map.markers.wangLeeOlympicGold.desc':
      'Từ bạn học thời trung học cơ sở đến huy chương vàng Olympic：「cặp đôi Lân–Dương」chỉ mất 34 phút để đánh bại Trung Quốc sau hai ván liên tiếp, giành tấm huy chương vàng Olympic đầu tiên trong lịch sử cầu lông Đài Loan',
  },
  id: {
    // Meta
    'map.meta.title': 'Peta Taiwan',
    'map.meta.description':
      'Klik kabupaten/kota atau lokasi di peta untuk langsung membaca artikel Taiwan.md tentang tempat itu. Saring menurut wilayah (utara, tengah, selatan, timur, kepulauan terluar) atau topik: kuliner, sejarah, alam, budaya, dan lainnya.',

    // Hero Section
    'map.hero.kicker': 'Tampilan Peta',
    'map.hero.title': 'Peta Taiwan',
    'map.hero.subtitle':
      'Jelajahi simpul budaya, kuliner, alam, dan sejarah Taiwan melalui perspektif peta.',

    // Controls - Region Filter
    'map.controls.region.title': 'Filter Wilayah',
    'map.controls.region.all': 'Semua',
    'map.controls.region.north': 'Utara',
    'map.controls.region.central': 'Tengah',
    'map.controls.region.south': 'Selatan',
    'map.controls.region.east': 'Timur',
    'map.controls.region.islands': 'Kepulauan Terluar',

    // Controls - Category Filter
    'map.controls.category.title': 'Filter Kategori',
    'map.controls.category.all': 'Semua',
    'map.controls.category.food': '🍜 Kuliner',
    'map.controls.category.history': '📜 Sejarah',
    'map.controls.category.nature': '🌿 Alam',
    'map.controls.category.culture': '🎭 Budaya',
    'map.controls.category.technology': '💻 Teknologi',
    'map.controls.category.economy': '📈 Ekonomi',
    'map.controls.category.lifestyle': '🏮 Gaya Hidup',
    'map.controls.category.art': '🎨 Seni',
    'map.controls.category.geography': '🗺️ Geografi',

    // Route Section
    'map.route.title': '🗺️ Rute Kurasi',
    'map.route.normal-mode': 'Mode Normal',

    // Sidebar - Default
    'map.sidebar.default.title': '📍 Jelajahi Artikel Taiwan',
    'map.sidebar.default.hint':
      'Klik kota/kabupaten atau penanda di peta untuk menjelajahi artikel',

    // Sidebar - County
    'map.sidebar.county.clear': '✕ Hapus Pilihan',
    'map.sidebar.county.articles-count': 'artikel',
    'map.sidebar.county.no-articles': 'Belum ada artikel untuk wilayah ini',

    // Sidebar - Article
    'map.sidebar.article.back': '← Kembali',
    'map.sidebar.article.read-more': 'Baca Selengkapnya →',

    // Zoom Controls
    'map.zoom.in': '＋',
    'map.zoom.out': '－',
    'map.zoom.reset': '⌂',

    // Tooltips
    'map.tooltip.county.articles': 'artikel terkait',
    'map.tooltip.county.click': 'Klik untuk memfilter wilayah ini',
    'map.tooltip.marker.reading-time': 'menit baca',

    // Panel (for compatibility)
    'map.panel.title': 'Peta Pengetahuan Taiwan',
    'map.panel.stat.points': 'Titik Pengetahuan',
    'map.panel.stat.categories': 'Kategori',
    'map.panel.category-distribution': 'Distribusi Kategori',
    'map.panel.link.graph': '🕸️ Graf Pengetahuan',
    'map.panel.link.home': '🏠 Ikhtisar Kategori',

    // Category Names (for JS usage)
    'map.category.history': '📜 Sejarah',
    'map.category.geography': '🗺️ Geografi',
    'map.category.culture': '🎭 Budaya',
    'map.category.food': '🍜 Kuliner',
    'map.category.art': '🎨 Seni',
    'map.category.music': '🎵 Musik',
    'map.category.technology': '💻 Teknologi',
    'map.category.nature': '🌿 Alam',
    'map.category.people': '👥 Tokoh',
    'map.category.society': '⚖️ Masyarakat',
    'map.category.economy': '📈 Ekonomi',
    'map.category.lifestyle': '🏮 Gaya Hidup',

    // Additional UI text
    'map.sidebar.more-articles': '⋯dan lainnya',
    'map.sidebar.more-articles-suffix': 'artikel',

    // Routes
    'map.routes.nightMarkets.name': '🍜 Wisata Pasar Malam',
    'map.routes.nightMarkets.description':
      'Budaya pasar malam paling representatif di Taiwan, dari utara hingga selatan',
    'map.routes.nationalParks.name': '🏔️ Wisata Taman Nasional',
    'map.routes.nationalParks.description':
      'Dari pegunungan setinggi 3,952 meter hingga terumbu karang tropis, keajaiban alam Taiwan',
    'map.routes.historyTrail.name': '📜 Jejak Sejarah',
    'map.routes.historyTrail.description':
      'Menelusuri empat ratus tahun Taiwan, dari penjajahan Belanda hingga demokratisasi',
    'map.routes.oldStreets.name': '🏮 Jelajah Jalan Tua',
    'map.routes.oldStreets.description':
      'Kenangan Taiwan di jalan-jalan berusia seabad, arsitektur adalah sejarah',

    'map.routes.counties22.name': '📍 22 Artikel Mendalam Kota dan Kabupaten',
    'map.routes.counties22.description':
      'Jelajahi 22 artikel mendalam kota dan kabupaten Taiwan.md, dari pilot Keelung hingga finale New Taipei — satu kontradiksi utama untuk setiap kota dan kabupaten.',
    'map.counties22.panel.title': '📍 22 Artikel Mendalam Kota dan Kabupaten',
    'map.counties22.panel.hint':
      'Klik kartu kota/kabupaten untuk membuka, atau klik kota/kabupaten di peta',
    'map.counties22.tooltip.openDeep': 'Klik untuk membuka artikel mendalam',
    'map.counties22.deepCard.badge':
      '📖 Seri 22 Kota dan Kabupaten · Artikel Mendalam',
    'map.counties22.deepCard.cta': 'Baca Selengkapnya →',

    // Night Markets Stops
    'map.stops.shilinNightMarket.name': 'Pasar Malam Shilin',
    'map.stops.shilinNightMarket.note':
      'Pasar malam wisata terbesar di Taiwan, tempat asal kue besar membungkus kue kecil',
    'map.stops.raoheNightMarket.name': 'Pasar Malam Raohe',
    'map.stops.raoheNightMarket.note':
      'Tempat antre legendaris untuk roti lada, favorit warga lokal Taipei',
    'map.stops.ningxiaNightMarket.name': 'Pasar Malam Ningxia',
    'map.stops.ningxiaNightMarket.note':
      'Kepadatan kuliner tertinggi, pusat jajanan rakyat rekomendasi Michelin',
    'map.stops.fengjiaNightMarket.name': 'Pasar Malam Fengjia',
    'map.stops.fengjiaNightMarket.note':
      'Laboratorium jajanan kreatif, garis depan inovasi pasar malam Taiwan',
    'map.stops.huayuanNightMarket.name': 'Pasar Malam Huayuan',
    'map.stops.huayuanNightMarket.note':
      'Pasar malam terbesar di Tainan, pesta terbatas yang hanya buka tiga hari seminggu',
    'map.stops.liuheNightMarket.name': 'Pasar Malam Liuhe',
    'map.stops.liuheNightMarket.note':
      'Pasar malam ikonis Kaohsiung, dengan hidangan laut sebagai bintang utama',

    // National Parks Stops
    'map.stops.yangmingshanNationalPark.name': 'Taman Nasional Yangmingshan',
    'map.stops.yangmingshanNationalPark.note':
      'Halaman belakang Taipei, dengan bentang alam vulkanis dan mata air panas tersembunyi',
    'map.stops.tarokoNationalPark.name': 'Taman Nasional Taroko',
    'map.stops.tarokoNationalPark.note':
      'Ngarai marmer, keajaiban geologi kelas dunia',
    'map.stops.yushanNationalPark.name': 'Taman Nasional Yushan',
    'map.stops.yushanNationalPark.note':
      'Puncak tertinggi di Asia Timur Laut（3,952m）, atap Taiwan',
    'map.stops.alishanScenicArea.name': 'Kawasan Pemandangan Nasional Alishan',
    'map.stops.alishanScenicArea.note':
      'Matahari terbit di lautan awan, gugusan pohon keramat, dan kereta api hutan',
    'map.stops.sunMoonLakeScenicArea.name':
      'Kawasan Pemandangan Nasional Danau Sun Moon',
    'map.stops.sunMoonLakeScenicArea.note':
      'Danau alami terbesar di Taiwan, danau suci suku Thao',
    'map.stops.kentingNationalPark.name': 'Taman Nasional Kenting',
    'map.stops.kentingNationalPark.note':
      'Ujung paling selatan Taiwan, dengan terumbu karang tropis dan Semenanjung Hengchun',

    // History Trail Stops
    'map.stops.anpingFort.name': 'Benteng Kuno Anping',
    'map.stops.anpingFort.note':
      'Dibangun oleh Belanda pada 1624, benteng tertua di Taiwan',
    'map.stops.chikanTower.name': 'Menara Chihkan',
    'map.stops.chikanTower.note':
      'Dari Fort Provintia Belanda hingga simbol pemerintahan Koxinga',
    'map.stops.lukang.name': 'Lukang',
    'map.stops.lukang.note':
      'Kota terbesar kedua di Taiwan pada zaman Dinasti Qing, “pertama Tainan, kedua Lukang, ketiga Bangka”',
    'map.stops.presidentialOffice.name':
      'Kantor Kepresidenan (bekas Kantor Gubernur Jenderal Taiwan)',
    'map.stops.presidentialOffice.note':
      'Selesai dibangun pada 1919, pusat kekuasaan tertinggi pada masa pemerintahan Jepang',
    'map.stops.chiangKaiShekMemorialHall.name':
      'Balai Peringatan Chiang Kai-shek',
    'map.stops.chiangKaiShekMemorialHall.note':
      'Simbol otoritarianisme dan pusat perdebatan tentang keadilan transisional',
    'map.stops.legislativeYuan.name':
      'Yuan Legislatif (Gerakan Bunga Matahari)',
    'map.stops.legislativeYuan.note':
      'Lokasi Gerakan Mahasiswa Bunga Matahari pada 2014, tonggak demokrasi Taiwan',

    // Old Streets Stops
    'map.stops.dihuaStreet.name': 'Jalan Dihua',
    'map.stops.dihuaStreet.note':
      'Jantung Dadaocheng, pusat bahan pangan dari utara dan selatan serta belanja Tahun Baru Imlek',
    'map.stops.jiufenOldStreet.name': 'Jalan Tua Jiufen',
    'map.stops.jiufenOldStreet.note':
      'Kenangan masa keemasan pertambangan dan sumber inspirasi Spirited Away',
    'map.stops.lukangOldStreet.name': 'Jalan Tua Lukang',
    'map.stops.lukangOldStreet.note':
      'Museum hidup rumah bata merah bersejarah dan kerajinan tradisional',
    'map.stops.anpingOldStreet.name': 'Jalan Tua Anping',
    'map.stops.anpingOldStreet.note':
      'Jalan pertama Taiwan, tempat berlapisnya sejarah selama empat ratus tahun',
    'map.stops.qishanOldStreet.name': 'Jalan Tua Qishan',
    'map.stops.qishanOldStreet.note':
      'Kompleks bangunan bergaya Barok di kerajaan pisang',
    'map.stops.tamsuiOldStreet.name': 'Jalan Tua Tamsui',
    'map.stops.tamsuiOldStreet.note':
      'Pesona sejarah matahari terbenam, ageh, dan muara Sungai Tamsui',

    // Cities
    'map.city.taipei': 'Taipei',
    'map.city.newTaipei': 'New Taipei',
    'map.city.keelung': 'Keelung',
    'map.city.taoyuan': 'Taoyuan',
    'map.city.hsinchu': 'Hsinchu',
    'map.city.miaoli': 'Miaoli',
    'map.city.taichung': 'Taichung',
    'map.city.changhua': 'Changhua',
    'map.city.nantou': 'Nantou',
    'map.city.chiayi': 'Chiayi',
    'map.city.tainan': 'Tainan',
    'map.city.kaohsiung': 'Kaohsiung',
    'map.city.pingtung': 'Pingtung',
    'map.city.yilan': 'Yilan',
    'map.city.hualien': 'Hualien',
    'map.city.taitung': 'Taitung',
    'map.city.penghu': 'Penghu',
    'map.city.kinmen': 'Kinmen',

    // Markers
    'map.markers.founderCheYuWu.title': 'Pendiri — Wu Che-Yu Che-Yu Wu',
    'map.markers.founderCheYuWu.desc':
      'Dari kode program menuju puisi: perjalanan seorang seniman Taiwan menembus panggung internasional',
    'map.markers.taiwanIndigenousContemporaryArt.title':
      'Seni Kontemporer Masyarakat Adat Taiwan',
    'map.markers.taiwanIndigenousContemporaryArt.desc':
      'Dari kerajinan tradisional hingga kreasi kontemporer, menelusuri cara seniman masyarakat adat Taiwan menyuarakan diri di panggung seni global serta mendefinisikan ulang dialog antara identitas masyarakat adat dan seni kontemporer',
    'map.markers.taiwanExperimentalNewMediaArt.title':
      'Seni Eksperimental dan Media Baru Taiwan',
    'map.markers.taiwanExperimentalNewMediaArt.desc':
      'Dari seni video hingga interaksi VR, menelusuri perkembangan inovatif seni media baru dan ekosistem seni teknologi Taiwan',
    'map.markers.taiwanArchitecture.title': 'Arsitektur Taiwan',
    'map.markers.taiwanArchitecture.desc':
      'Dari rumah batu sabak hingga pencakar langit: perjalanan arsitektur sebuah negara melintasi waktu',
    'map.markers.taiwanNewMediaArt.title': 'Seni Media Baru Taiwan',
    'map.markers.taiwanNewMediaArt.desc': 'Menjelajahi budaya dan kisah Taiwan',
    'map.markers.taiwanWatercolorCenturyEvolution.title':
      'Seabad Transformasi Seni Cat Air Taiwan',
    'map.markers.taiwanWatercolorCenturyEvolution.desc':
      'Dari perintisan Ishikawa Kinichiro pada masa pemerintahan Jepang hingga keberhasilan internasional Chien Chung-Wei pada era kontemporer, seni cat air Taiwan telah menempuh perjalanan satu abad dan menjadi salah satu pusat penciptaan cat air paling aktif di Asia.',
    'map.markers.taiwanModernPoetry.title': 'Puisi Modern Taiwan',
    'map.markers.taiwanModernPoetry.desc':
      'Bagaimana eksperimen modernisme yang lahir dari tiga ruang studi tanpa diduga memicu revolusi puisi yang paling membumi',
    'map.markers.taiwanContemporarySculpture.title':
      'Perkembangan Seni Patung Kontemporer Taiwan',
    'map.markers.taiwanContemporarySculpture.desc':
      'Dari Yuyu Yang dan Ju Ming hingga generasi baru, menelusuri evolusi dan semangat kreatif seni patung Taiwan',
    'map.markers.taiwanCuratorsArtCulture.title':
      'Kurator Taiwan dan Pembentukan Budaya Seni',
    'map.markers.taiwanCuratorsArtCulture.desc':
      'Dari kurasi independen hingga sistem museum seni, cara kurator Taiwan membangun wacana budaya dan dialog internasional tentang seni kontemporer',
    'map.markers.newMediaArt.title': 'Seni Media Baru',
    'map.markers.newMediaArt.desc':
      'Eksplorasi perintis seni digital Taiwan, memadukan teknologi dan humaniora dari laboratorium hingga panggung internasional',
    'map.markers.contemporaryTaiwanLiterature.title':
      'Sastra Taiwan Kontemporer',
    'map.markers.contemporaryTaiwanLiterature.desc':
      'Menjelajahi budaya dan kisah Taiwan',
    'map.markers.taiwanContemporaryArt.title': 'Seni Kontemporer Taiwan',
    'map.markers.taiwanContemporaryArt.desc':
      'Dari Museum Seni Rupa Taipei hingga Paviliun Taiwan di Biennale Venesia, posisi unik seni kontemporer Taiwan di panggung global',
    'map.markers.kinmenGuesthouseMuseum.title':
      'Museum Seni Kontemporer Jinma Guesthouse',
    'map.markers.kinmenGuesthouseMuseum.desc':
      'Sebuah penginapan militer era Perang Dingin yang menjadi saksi perpisahan dan pertemuan kembali, dibangunkan oleh sepasang ayah dan anak perempuan setelah tertidur selama dua puluh tahun, lalu menjadi museum seni pilihan utama di Kaohsiung yang direkomendasikan oleh Lonely Planet.',
    'map.markers.renjianMagazine.title': 'Majalah Ren Jian',
    'map.markers.renjianMagazine.desc':
      '47 edisi, empat tahun, sebuah revolusi senyap yang digerakkan melalui fotografi dan tulisan—titik awal sastra reportase Taiwan',
    'map.markers.taiwanIndigenousCulture.title':
      'Budaya Masyarakat Adat Taiwan',
    'map.markers.taiwanIndigenousCulture.desc':
      'Dari keragaman tradisi enam belas suku hingga kebangkitan seni kontemporer, menelusuri kekayaan budaya masyarakat adat Taiwan dan transformasi modernnya',
    'map.markers.taiwan16IndigenousTribes.title':
      'Peta Budaya 16 Suku Masyarakat Adat Taiwan',
    'map.markers.taiwan16IndigenousTribes.desc':
      'Menjelajahi wilayah persebaran, sistem bahasa, upacara penting, dan perkembangan kreasi kontemporer 16 suku masyarakat adat Taiwan untuk memahami wajah multikultural masyarakat adat Taiwan',
    'map.markers.taiwanNightMarketCulture.title':
      'Budaya Pasar Malam dan Pesona Jajanan Taiwan',
    'map.markers.taiwanNightMarketCulture.desc':
      'Menjelajahi secara mendalam latar terbentuknya budaya pasar malam Taiwan, daya tariknya yang khas, serta kisah sejarah dan makna budaya jajanan ikoniknya',
    'map.markers.taiwanSensibilityKoreanPerspective.title':
      'Kepekaan Taiwan: Estetika Khas Taiwan di Mata Orang Korea',
    'map.markers.taiwanSensibilityKoreanPerspective.desc':
      'Dari MV K-pop hingga pameran buku Seoul, bagaimana “대만감성” menjadikan pemandangan jalanan sehari-hari Taiwan sebagai simbol estetika paling memikat di Asia',
    'map.markers.taiwanCulturalCreativeParks.title':
      'Perkembangan Taman Budaya dan Kreatif Taiwan',
    'map.markers.taiwanCulturalCreativeParks.desc':
      'Dari revitalisasi bangunan tua hingga komunitas kreatif, perjalanan perkembangan dan model inovatif taman budaya dan kreatif Taiwan',
    'map.markers.taiwanOldStreetCulture.title':
      'Budaya Jalan Tua dan Kawasan Niaga Taiwan',
    'map.markers.taiwanOldStreetCulture.desc':
      'Dari kemakmuran pelabuhan zaman Dinasti Qing hingga bangunan Barat bergaya Barok pada masa pemerintahan Jepang, jalan-jalan tua Taiwan adalah sejarah rakyat yang ditulis dengan batu bata dan genting',
    'map.markers.taiwanTeaCeremonyLifeAesthetics.title':
      'Upacara Minum Teh dan Estetika Kehidupan Taiwan',
    'map.markers.taiwanTeaCeremonyLifeAesthetics.desc':
      'Dari teh kungfu hingga estetika penyajian teh, menelusuri cara Taiwan memadukan dan memperbarui budaya teh Timur dengan estetika kehidupan setempat',
    'map.markers.taiwanStreetArtGraffiti.title':
      'Seni Jalanan dan Budaya Grafiti Taiwan',
    'map.markers.taiwanStreetArtGraffiti.desc':
      'Dari grafiti bawah tanah hingga mural legal, bagaimana tembok kota menjadi panggung kreasi bagi seniman Taiwan',
    'map.markers.taiwanIncenseMakingCulture.title':
      'Budaya Pembuatan Dupa Taiwan dan Kampung Halaman Batang Dupa',
    'map.markers.taiwanIncenseMakingCulture.desc':
      'Dari keterampilan membuat batang dupa berusia seabad di Komunitas Yunxiao, Chiayi, hingga industri dupa yang tersebar di seluruh Taiwan——sebuah usaha kuno tentang kesalehan, keterampilan tangan, dan ketekunan',
    'map.markers.taiwanHomophoneTaboos.title':
      'Budaya Tabu Homofon Taiwan: Mengapa「Empat」Membuat Seluruh Masyarakat Melewatkan Nomor Lantai?',
    'map.markers.taiwanHomophoneTaboos.desc':
      'Dari rumah sakit tanpa lantai empat hingga pelat nomor 8888 yang dilelang dengan harga fantastis, kepekaan orang Taiwan terhadap homofon dapat disebut yang tertinggi di dunia',
    'map.markers.hakkaCultureLanguage.title': 'Budaya dan Bahasa Hakka',
    'map.markers.hakkaCultureLanguage.desc':
      'Semangat pantang menyerah dan Hari Tianchuan: pewarisan budaya dan kebangkitan modern masyarakat Hakka Taiwan',
    'map.markers.ethnicGroupsTaiwan.title':
      'Kelompok Etnis（Hoklo, Hakka, Masyarakat Adat, Waishengren, Penduduk Baru）',
    'map.markers.ethnicGroupsTaiwan.desc':
      'Keberagaman kelompok etnis Taiwan bukan hanya hasil perkembangan sejarah, melainkan juga kunci untuk memahami masyarakat Taiwan masa kini. Struktur sosial yang beragam dan hidup berdampingan ini merupakan sumber kreativitas budaya Taiwan sekaligus landasan penting perkembangan politik demokratis. Membangun identitas Taiwan bersama seraya menghormati kekhasan budaya setiap kelompok etnis adalah persoalan penting yang terus dihadapi masyarakat Taiwan.',
    'map.markers.chinaSteel.title':
      'China Steel: Menteri Berkepala Besi dan Legenda Baja Sepuluh Proyek Pembangunan Besar',
    'map.markers.chinaSteel.desc':
      'Dari keberhasilan Chao Yao-tung memperoleh teknologi melalui perundingan di Eropa dan Amerika hingga kepulan asap putih pertama di Siaogang, Kaohsiung, China Steel membangun tulang punggung industri berat Taiwan selama 50 tahun dan menjadi permata tersukses dari Sepuluh Proyek Pembangunan Besar',
    'map.markers.taiwanCement.title':
      'Taiwan Cement: Legenda Transformasi Hijau Perusahaan Publik Pertama Taiwan',
    'map.markers.taiwanCement.desc':
      'Pada 1962 Bursa Efek Taiwan didirikan untuknya, dan kode saham 1101 melambangkan awal pasar saham Taiwan. Dari pengelolaan tiga generasi keluarga Koo selama 76 tahun, Taiwan Cement menyaksikan keajaiban pembangunan Taiwan melalui deretan tanur semennya, dan kini bertransformasi menjadi perusahaan hijau untuk menghadapi era netralitas karbon',
    'map.markers.tsmc.title': 'Perusahaan Taiwan: TSMC',
    'map.markers.tsmc.desc':
      'Pemimpin global manufaktur cip kontrak yang memegang urat nadi utama peradaban digital manusia',
    'map.markers.chimeiCorporation.title':
      'Chi Mei Corporation: Kerajaan Akrilik Hsu Wen-lung dan Impian Museum',
    'map.markers.chimeiCorporation.desc':
      'Berawal dari pabrik kecil di Rende, Tainan, pada 1960, Hsu Wen-lung mengabdikan hidupnya untuk membangun kerajaan bahan ABS terbesar di Asia dan mendirikan Museum Chimei sebagai bentuk kontribusi kepada masyarakat. Ini membuktikan bahwa perusahaan Taiwan dapat meraih kesuksesan bisnis sekaligus menjunjung kepedulian humanis',
    'map.markers.acer.title':
      'Acer Group (Acer) - Pelopor Transformasi Industri PC',
    'map.markers.acer.desc':
      'Pelopor komputer pribadi yang berawal dari Taoyuan, Taiwan, menciptakan model bisnis「multimerek, multisaluran」dan menjadi penggerak transformasi industri PC global',
    'map.markers.giantBicycles.title': 'Perusahaan Taiwan: Giant Manufacturing',
    'map.markers.giantBicycles.desc':
      'Dari budak manufaktur kontrak yang ditinggalkan perusahaan besar Amerika Serikat hingga menjadi imperium tak kasatmata yang menetapkan standar teknologi sepeda global',
    'map.markers.quantaComputer.title': 'Perusahaan Taiwan: Quanta Computer',
    'map.markers.quantaComputer.desc':
      'Dari kebakaran pabrik hingga menjadi raja laptop dunia, bagaimana Barry Lam membangun imperium baru pada era AI?',
    'map.markers.aseGroup.title': 'Perusahaan Taiwan: ASE Semiconductor',
    'map.markers.aseGroup.desc':
      'Perusahaan pengemasan dan pengujian semikonduktor terbesar di dunia, mengapa pemilik perusahaan konstruksi beralih ke industri semikonduktor?',
    'map.markers.esunFinancialHolding.title':
      'Perusahaan Taiwan: E.SUN Financial Holding',
    'map.markers.esunFinancialHolding.desc':
      'Dari bank spesialis kartu kredit hingga pelopor keuangan digital, kisah terobosan direktur utama perusahaan induk keuangan termuda yang berusia 43 tahun',
    'map.markers.changChunPetrochemical.title':
      'Perusahaan Taiwan: Chang Chun Petrochemical',
    'map.markers.changChunPetrochemical.desc':
      'Dari pabrik kecil di Tainan pada 1949 hingga menjadi raksasa kimia global, kisah sang juara tersembunyi yang「tidak melantai di bursa dan tidak meminjam uang」',
    'map.markers.formosaPlasticsGroup.title':
      'Perusahaan Taiwan: Evergreen Marine',
    'map.markers.formosaPlasticsGroup.desc':
      'Dari sebuah kapal bekas hingga menjadi imperium pelayaran global, legenda samudra biru Chang Yung-fa',
    'map.markers.taipeiFubon.title':
      'Ekonomi Pasar Malam: Keajaiban Bisnis Tanpa Merek',
    'map.markers.taipeiFubon.desc':
      'Menelusuri bagaimana pasar malam Taiwan menciptakan keajaiban ekonomi dengan nilai produksi tahunan hampir 4000 miliar tanpa merek, dekorasi, maupun lokasi tetap',
    'map.markers.taiwan7Eleven.title': 'Industri Kopi Taiwan',
    'map.markers.taiwan7Eleven.desc':
      'Dari awal penanaman pada masa pemerintahan Jepang hingga gelar juara dunia Simple Kaffa, sejarah evolusi kopi Taiwan selama seabad',
    'map.markers.taiwanHighSpeedRail.title': 'Peta Kudapan Khas Daerah Taiwan',
    'map.markers.taiwanHighSpeedRail.desc':
      'Dari ding bian hu di Pasar Malam Kuil Keelung hingga kaki babi Wanluan di Pingtung, dari bakso babi Hsinchu hingga srikaya Taitung, setiap kota memiliki DNA cita rasanya sendiri. Ikuti langkah warga setempat untuk menjelajahi kudapan daerah paling representatif dari 22 kabupaten dan kota di Taiwan serta menikmati budaya rakyat yang paling autentik di negara ini.',
    'map.markers.taiwanSemiconductorIndustry.title':
      'Hidangan Keahlian Tradisional Taiwan: Kenangan Rasa yang Mulai Menghilang',
    'map.markers.taiwanSemiconductorIndustry.desc':
      'Dari ayam mint Chiayi hingga sup caiwei, hidangan andalan nenek menyimpan kenangan keluarga, tetapi perlahan menghilang ditelan perubahan zaman',
    'map.markers.taiwanBankingSystem.title':
      'Perpaduan Kuliner Penduduk Baru Taiwan',
    'map.markers.taiwanBankingSystem.desc':
      'Ketika rasa asam pedas Thailand bertemu rasa manis asin Taiwan, ketika pho Vietnam berjumpa luwei ala Taiwan, dan ketika rempah Indonesia berpadu dengan bahan pangan setempat, revolusi cita rasa lintas batas tengah berlangsung diam-diam di Taiwan. Penduduk baru tidak hanya membawa masakan kampung halaman, tetapi juga kemungkinan baru yang memperkaya budaya kuliner Taiwan.',
    'map.markers.taiwanSmes.title': 'Kerajaan Buah Taiwan',
    'map.markers.taiwanSmes.desc':
      'Dari mangga dan leci hingga srikaya dan jambu air, legenda manis keberagaman buah tropis dan terobosan teknologi pertanian',
    'map.markers.youbikePublicBikeSystem.title': 'Budaya Hidangan Laut Taiwan',
    'map.markers.youbikePublicBikeSystem.desc':
      'Hasil laut segar yang dikirim langsung dari pelabuhan perikanan, budaya restoran hidangan laut, dan olahan bercita rasa laut seperti omelet tiram menampilkan ciri khas Taiwan yang dikelilingi laut serta kekayaan tradisi kuliner hasil lautnya',
    'map.markers.taiwanFoodBeverageIndustry.title':
      'Michelin dan Santapan Mewah Taiwan',
    'map.markers.taiwanFoodBeverageIndustry.desc':
      'Pada 2018, sampul merah Panduan Michelin untuk pertama kalinya memuat tulisan「TAIPEI」, menandai masuknya industri kuliner Taiwan secara resmi ke dalam sistem penilaian internasional. Dari kios pinggir jalan hingga restoran berbintang, dari kuliner rakyat hingga hidangan mewah, budaya kuliner Taiwan menampilkan pesona yang tradisional sekaligus inovatif di panggung internasional.',
    'map.markers.taiwanAgriculturalReform.title': 'Budaya Pasar Malam',
    'map.markers.taiwanAgriculturalReform.desc':
      '164 pasar malam terdaftar, rata-rata satu pasar malam untuk setiap 3.8 ribu orang di Tainan, dari pelataran kuil hingga destinasi wisata internasional',
    'map.markers.taiwanTeaIndustry.title': 'Budaya Kuliner Hakka',
    'map.markers.taiwanTeaIndustry.desc':
      'Budaya kuliner masyarakat Hakka yang kaya dan beragam, dari aroma lembut dan pekat lei cha hingga nuansa pegunungan pada bakcang bunga jahe liar, mencerminkan kebijaksanaan hidup masyarakat Hakka yang hemat, pandai mengelola rumah tangga, dan memanfaatkan bahan setempat',
    'map.markers.taiwanFishingIndustry.title': 'Mi Daging Sapi',
    'map.markers.taiwanFishingIndustry.desc':
      'Dari kerinduan kampung halaman para pendatang waishengren hingga menjadi makanan nasional Taiwan, perpaduan budaya dan aroma mi daging sapi yang mendunia',
    'map.markers.taiwanFruitIndustry.title': 'Budaya Teh',
    'map.markers.taiwanFruitIndustry.desc':
      'Evolusi budaya teh Taiwan dari seni teh tradisional hingga minuman racikan tangan modern, menampilkan varietas teh dan budaya minum teh yang khas dari negara ini',
    'map.markers.taiwanRiceVarieties.title':
      'Di Atas Tanah yang Berguncang, Mereka Membangun Menara yang Bisa Terbang',
    'map.markers.taiwanRiceVarieties.desc':
      'Hanya berjarak 200 meter dari sesar aktif, orang Taiwan justru bersikeras membangun gedung tertinggi di dunia di atas tanah yang paling tidak stabil——lalu seorang nekat memanjatnya dengan tangan kosong selama 91 menit.',
    'map.markers.nightMarketCulture.title':
      'Lima Bentang Alam Utama dan Struktur Geografis Taiwan: Panorama dari Pegunungan hingga Dataran',
    'map.markers.nightMarketCulture.desc':
      'Menjelajahi struktur geografis Taiwan yang unik, dari Pegunungan Tengah hingga dataran barat, serta mengenal keragaman bentang alam negara ini',
    'map.markers.bubbleTeaGlobalPhenomenon.title':
      'Jaringan Transportasi Taiwan',
    'map.markers.bubbleTeaGlobalPhenomenon.desc':
      'Kereta cepat, MRT, jalan raya, dan penerbangan merajut jaringan transportasi multidimensi yang menggerakkan Taiwan',
    'map.markers.taiwanBeefNoodle.title':
      'Sistem Kawasan Pemandangan Nasional Taiwan',
    'map.markers.taiwanBeefNoodle.desc':
      'Dari Pantai Timur Laut hingga Kenting, 13 kawasan pemandangan nasional Taiwan menampilkan kekayaan bentang alam dan budaya',
    'map.markers.taiwanHotPotCulture.title':
      'Karakteristik dan Pembentukan Geografi Kepulauan Taiwan',
    'map.markers.taiwanHotPotCulture.desc':
      'Jelajahi karakteristik unik geografi kepulauan Taiwan, mulai dari pergerakan lempeng hingga struktur topografi, serta pahami misteri alam Pulau Formosa',
    'map.markers.taiwanFineDining.title':
      'Pergerakan Lempeng dan Aktivitas Gempa Bumi di Taiwan',
    'map.markers.taiwanFineDining.desc':
      'Membahas karakteristik geologis Taiwan yang terletak di pertemuan Lempeng Eurasia dan Lempeng Laut Filipina, serta penyebab seringnya aktivitas gempa bumi',
    'map.markers.taiwanStreetFood.title':
      'Waduk dan Pengelolaan Sumber Daya Air Taiwan',
    'map.markers.taiwanStreetFood.desc':
      'Dari krisis kekurangan air hingga sedimentasi waduk, tantangan sumber daya air Taiwan dan persoalan ketimpangan distribusi antara wilayah utara dan selatan',
    'map.markers.taiwanVegetarianCulture.title':
      'Sistem Sungai dan Karakteristik Hidrologi Taiwan: Aliran Pendek dan Deras serta Perubahan Musiman dalam Geografi Hidrologi',
    'map.markers.taiwanVegetarianCulture.desc':
      'Jelajahi sistem sungai Taiwan yang unik, dari Sungai Zhuoshui hingga Sungai Gaoping, serta pahami bagaimana topografi kepulauan membentuk karakteristik hidrologi Taiwan',
    'map.markers.taiwanCoffeeCulture.title':
      'Topografi Pesisir dan Bentang Laut Taiwan',
    'map.markers.taiwanCoffeeCulture.desc':
      'Dari pesisir tanjung dan teluk di utara hingga pesisir patahan di timur, keragaman topografi pesisir Taiwan memperlihatkan mahakarya pergerakan lempeng',
    'map.markers.taiwanSnackCulture.title':
      'Bentang Alam Mata Air Panas Taiwan',
    'map.markers.taiwanSnackCulture.desc':
      'Beitou, Zhiben, Jiaoxi—pertemuan indah antara budaya mata air panas dan ilmu geologi',
    'map.markers.taiwanSeafoodCulture.title':
      'Titik Panas Keanekaragaman Hayati Taiwan',
    'map.markers.taiwanSeafoodCulture.desc':
      'Wilayah seluas 36.000 kilometer persegi menampung 59.000 spesies, dengan kepadatan 100 kali rata-rata global',
    'map.markers.taiwanPineappleCake.title':
      'Bentang Pertanian dan Persebaran Industri Taiwan',
    'map.markers.taiwanPineappleCake.desc':
      'Perubahan bentang pertanian dari utara ke selatan mencerminkan perjalanan transformasi Taiwan dari 「Lumbung Taiwan」 menuju 「pertanian bernilai tinggi」',
    'map.markers.taiwanPorkRibSoup.title':
      'Perkembangan Perkotaan dan Kesenjangan Kota-Desa di Taiwan',
    'map.markers.taiwanPorkRibSoup.desc':
      'Ketimpangan perkembangan kota-desa Taiwan dalam tatanan enam munisipalitas khusus, serta transformasi ruang dari Taiwan agraris menuju Taiwan urban',
    'map.markers.taiwanOysterOmelette.title': 'Topografi dan Geologi',
    'map.markers.taiwanOysterOmelette.desc':
      'Daratan berusia 6 juta tahun yang menyimpan kenangan purba selama 200 juta tahun — keajaiban sabuk pembentukan pegunungan termuda dan tumbukan lempeng terdahsyat di dunia',
    'map.markers.taiwanBreakfastCulture.title':
      'Karakteristik Kota dan Budaya Regional',
    'map.markers.taiwanBreakfastCulture.desc':
      'Dari metropolis internasional Taipei hingga pesona kota tua Tainan, bagaimana setiap kota di Taiwan membentuk identitas lokal yang unik',
    'map.markers.taiwanConvenienceStoreFood.title':
      'Pulau Terluar dan Budaya Bahari: Dari Kepadatan Bendungan Perangkap Ikan Tertinggi di Dunia hingga Hukum Ekologi Musim Ikan Terbang',
    'map.markers.taiwanConvenienceStoreFood.desc':
      'Di seluruh dunia terdapat kurang dari 600 bendungan perangkap ikan, dan 574 di antaranya berada di Penghu. Sebuah suku kepulauan yang khusus menangkap ikan terbang mengubah pantangan menjadi sistem pengelolaan sumber daya laut yang sangat presisi',
    'map.markers.dutchSpanishColonialPeriod.title':
      'Insiden 28 Februari dan Teror Putih: Trauma dan Ingatan di Bawah Pemerintahan Otoriter Taiwan',
    'map.markers.dutchSpanishColonialPeriod.desc':
      'Dari Insiden 28 Februari 1947 hingga rezim darurat militer selama 38 tahun, Taiwan mengalami kekerasan negara di bawah pemerintahan otoriter dan baru mulai menghadapi trauma sejarah serta mendorong keadilan transisional setelah darurat militer dicabut.',
    'map.markers.zhengDynastyPeriod.title':
      'Krisis Selat Taiwan dan Perkembangan Hubungan Lintas Selat',
    'map.markers.zhengDynastyPeriod.desc':
      'Meninjau tiga krisis besar Selat Taiwan dan perjalanan perkembangan hubungan lintas selat selama lebih dari tujuh puluh tahun untuk memahami konteks sejarah dan tantangan kontemporer situasi Selat Taiwan',
    'map.markers.qingDynastyTaiwanHistory.title':
      'Sejarah Perdagangan Maritim Taiwan',
    'map.markers.qingDynastyTaiwanHistory.desc':
      'Kisah legendaris pasang surut Taiwan pada Zaman Penjelajahan, dari pusat perdagangan internasional hingga kerajaan bajak laut',
    'map.markers.japaneseColonialRule.title':
      'Sejarah Permukiman Keluarga Militer Taiwan',
    'map.markers.japaneseColonialRule.desc':
      'Dari pasukan terlantar di Myanmar hingga kerajaan berpagar bambu, bagaimana migrasi besar 120萬 orang mendefinisikan ulang 「rumah」',
    'map.markers.februaryTwentyEightIncident.title':
      'Sejarah Perkeretaapian Taiwan',
    'map.markers.februaryTwentyEightIncident.desc':
      'Dari Liu Ming-chuan pada masa Dinasti Qing, Jalur Utama masa pemerintahan Jepang, hingga kereta cepat, bagaimana perkeretaapian membentuk perkembangan kota dan ingatan budaya Taiwan',
    'map.markers.martialLawPeriod.title':
      'Perpindahan Pemerintah Nasionalis ke Taiwan dan Rekonstruksi Pascaperang',
    'map.markers.martialLawPeriod.desc':
      'Membahas latar belakang sejarah, proses, dan dampak perpindahan Pemerintah Nasionalis ke Taiwan pada 1949, serta rekonstruksi politik, ekonomi, dan sosial Taiwan pascaperang',
    'map.markers.democratization.title': 'Masa Pemerintahan Jepang',
    'map.markers.democratization.desc':
      'Pada 1895-1945, Jepang memerintah Taiwan selama 50 tahun, menghadirkan pembangunan modernisasi menyeluruh dan pengelolaan terlembaga sekaligus menerapkan kebijakan asimilasi yang sangat memengaruhi perkembangan masyarakat Taiwan',
    'map.markers.taiwanIndependenceMovement.title': 'Masa Pemerintahan Qing',
    'map.markers.taiwanIndependenceMovement.desc':
      'Pada 1683-1895, Dinasti Qing memerintah Taiwan selama sekitar 212 tahun, beralih dari tata kelola pasif menuju pembangunan aktif serta meletakkan dasar pembagian administratif Taiwan modern dan masyarakat Han',
    'map.markers.taiwanChinaRelations.title':
      'Masa Belanda, Spanyol, dan Kerajaan Tungning',
    'map.markers.taiwanChinaRelations.desc':
      'Pemerintahan kolonial sistematis pertama dalam sejarah Taiwan, dari pembangunan Benteng Zeelandia oleh Belanda hingga pembukaan Taiwan oleh Koxinga, yang meletakkan dasar migrasi masyarakat Han dan sistem politik',
    'map.markers.taiwanUsRelations.title': 'Budaya Toko Serba Ada',
    'map.markers.taiwanUsRelations.desc':
      'Bagaimana toko serba ada Taiwan, yang kepadatannya tertinggi di dunia, bertransformasi dari gerai ritel menjadi sistem operasi kehidupan bagi seluruh negara',
    'map.markers.taiwanInternationalStatus.title': 'Sistem Transportasi Taiwan',
    'map.markers.taiwanInternationalStatus.desc':
      'Kereta cepat melintasi utara dan selatan dalam 90 menit, MRT merajut urat nadi perkotaan dengan rapat, dan sepeda motor menyusuri gang-gang',
    'map.markers.taiwanHistoricalFigures.title': 'Budaya Toko Serba Ada Taiwan',
    'map.markers.taiwanHistoricalFigures.desc':
      'Negara toko serba ada dengan kepadatan tertinggi di dunia; inovasi lokalisasi 7-11 dan FamilyMart mendefinisikan ulang gaya hidup modern',
    'map.markers.taiwanPoliticalFigures.title':
      'Taman dan Rekreasi Sehari-hari di Taiwan',
    'map.markers.taiwanPoliticalFigures.desc':
      'Dari tai chi pada dini hari hingga berjalan-jalan pada malam hari——pengamatan budaya terhadap taman Taiwan sebagai ruang sosial lintas generasi',
    'map.markers.kuomintangHistory.title': 'Budaya Kopi Taiwan',
    'map.markers.kuomintangHistory.desc':
      'Dengan kepadatan kedai kopi independen termasuk tiga tertinggi di dunia, dari biji Alishan hingga bekerja di kedai kopi—seluk-beluk kopi di negara kepulauan ini',
    'map.markers.democraticProgressivePartyHistory.title':
      'Negara yang Mengejar Truk Sampah: Taiwan dari Krisis Sampah hingga Keajaiban Daur Ulang',
    'map.markers.democraticProgressivePartyHistory.desc':
      'Sebuah tempat yang pada 1990-an memiliki 400 tempat pembuangan akhir yang hampir penuh dan disebut 「negara sampah」 oleh media internasional, menggunakan musik Beethoven agar 23 juta orang mengejar truk sampah setiap hari; 30 tahun kemudian, tingkat daur ulang sumber dayanya melampaui sebagian besar negara Eropa',
    'map.markers.taipeiHistory.title':
      'Sejarah Perkembangan MRT Taiwan: Evolusi Kota yang Ditulis dengan Darah dan Uang',
    'map.markers.taipeiHistory.desc':
      'Balok baja seberat 209 ton jatuh dari langit dan merenggut 4 nyawa, ganti rugi NT$1,64 miliar, sementara bisnis utama MRT Taipei masih merugi hingga kini——harga nyata di balik seluruh sistem MRT Taiwan',
    'map.markers.taiwanPrehistoricCulture.title':
      'Sistem Pendidikan Taiwan: Eksperimen Negara Kepulauan dari Neraka Ujian Bersama hingga Labirin Multijalur',
    'map.markers.taiwanPrehistoricCulture.desc':
      'Taiwan menghabiskan 30 tahun untuk menghapus sistem ujian masuk bersama, tetapi ujian mata pelajaran terbaru justru membuat pendaftaran di lembaga persiapan ujian ulang melonjak dua kali lipat. Bagaimana sebuah negara kepulauan berulang kali menjalankan eksperimen sosial di antara tekanan melanjutkan pendidikan dan keadilan pendidikan?',
    'map.markers.taiwanIndigenousHistory.title': 'Budaya Sepeda Motor Taiwan',
    'map.markers.taiwanIndigenousHistory.desc':
      'Negara kepulauan dengan salah satu kepadatan sepeda motor tertinggi di dunia, serta evolusi budayanya dari sarana komuter menjadi gaya hidup',
    'map.markers.taiwanMilitaryHistory.title':
      'Budaya Arkade dan Lanskap Jalan Taiwan',
    'map.markers.taiwanMilitaryHistory.desc':
      'Koridor kehidupan yang melindungi dari angin dan hujan, serta kenangan jalanan Taiwan tempat sepeda motor, pedagang kaki lima, dan kehangatan antarmanusia berpadu',
    'map.markers.taiwanWomenHistory.title': 'Kehidupan Malam dan Budaya KTV',
    'map.markers.taiwanWomenHistory.desc':
      'Dari ruang karaoke Cashbox Partyworld hingga kedai makan larut malam, kehidupan malam Taiwan yang berlangsung 24 jam tanpa henti',
    'map.markers.taiwanEducationHistory.title':
      'Agama dan Kepercayaan Rakyat: Dari Pengelolaan Ketakutan hingga Imperium Keagamaan',
    'map.markers.taiwanEducationHistory.desc':
      'Taiwan memiliki kepadatan kuil tertinggi di dunia, tetapi juga menempati peringkat pertama dunia dalam kebebasan beragama—di balik kontradiksi ini tersembunyi kearifan bertahan hidup para migran militer abad ke-17',
    'map.markers.taiwanReligiousHistory.title': 'Budaya Pemandian Air Panas',
    'map.markers.taiwanReligiousHistory.desc':
      'Dari pemulihan kesehatan militer hingga salah satu dari tiga mata air lumpur utama dunia: kisah Taiwan yang tanpa diduga menjadi kerajaan pemandian air panas',
    'map.markers.taiwanMediaHistory.title':
      'Tradisi Musik Masyarakat Adat Taiwan',
    'map.markers.taiwanMediaHistory.desc':
      'Menjelajahi kekayaan budaya musik 16 kelompok masyarakat adat Taiwan, dari lantunan melodi kuno hingga alat musik tradisional, serta menyaksikan warisan budaya selama ribuan tahun',
    'map.markers.badmintonChampions.title':
      'Industri Manufaktur Alat Musik Taiwan: Dari Saksofon Houli hingga Pabrik Musik Dunia',
    'map.markers.badmintonChampions.desc':
      'Menjelajahi perkembangan industri manufaktur alat musik Taiwan, dari dominasi global saksofon Houli dan kerajaan produksi gitar berdasarkan kontrak hingga keahlian presisi pembuatan kotak musik, serta bagaimana Taiwan beralih dari produksi kontrak menuju merek sendiri',
    'map.markers.baseballCulture.title': 'Gerakan Lagu Rakyat Taiwan',
    'map.markers.baseballCulture.desc':
      'Dari “menyanyikan lagu kita sendiri” hingga mengubah seluruh kancah musik berbahasa Tionghoa—revolusi budaya milik kaum muda pada 1970-an',
    'map.markers.taiwanBasketball.title':
      'Evolusi Kancah Musik Independen Taiwan',
    'map.markers.taiwanBasketball.desc':
      'Dari grup musik bawah tanah hingga musik independen, menjelajahi tiga dekade perkembangan dan makna budaya musik nonarus utama Taiwan',
    'map.markers.marathonRunning.title':
      'Musik Elektronik dan Budaya Pesta Taiwan: Dari Rave Bawah Tanah hingga Panggung Internasional',
    'map.markers.marathonRunning.desc':
      'Dari budaya pesta Rave pada 1990-an hingga festival musik elektronik Road to Ultra, bagaimana musik elektronik Taiwan beralih dari bawah tanah ke arus utama serta melahirkan DJ kelas internasional dan label elektronik independen',
    'map.markers.taiwanEsports.title':
      'Budaya Festival Musik Taiwan: Dari Spring Scream hingga Wadah Budaya Kaum Muda yang Berkembang di Mana-mana',
    'map.markers.taiwanEsports.desc':
      'Menjelajahi perkembangan festival musik Taiwan dari Spring Scream dan Hohaiyan Rock Festival hingga Megaport Festival, serta bagaimana festival-festival tersebut menjadi inkubator grup musik independen dan wadah utama ekspresi budaya kaum muda',
    'map.markers.taiwanOlympics.title':
      'Kancah Musik Independen Taiwan Kontemporer',
    'map.markers.taiwanOlympics.desc':
      'Dari pertunjukan bawah tanah hingga matriks industri, menguraikan perkembangan ekosistem musik independen Taiwan modern dan pengaruh budayanya',
    'map.markers.taipeiCycle.title':
      'Kearifan Ekologis dan Pelestarian Lingkungan Masyarakat Adat Taiwan',
    'map.markers.taipeiCycle.desc':
      'Mengkaji pengetahuan ekologis tradisional yang dihimpun masyarakat adat Taiwan selama ribuan tahun serta nilai penting dan penerapannya dalam pelestarian lingkungan modern',
    'map.markers.taiwanBetelNutCulture.title':
      'Pegunungan dan Budaya Pendakian Taiwan',
    'map.markers.taiwanBetelNutCulture.desc':
      '268 gunung setinggi tiga ribu meter dan budaya Seratus Puncak: perkembangan olahraga pendakian Taiwan dan tantangan pelestarian pegunungan',
    'map.markers.taiwanElections.title': 'Ekosistem Hutan Taiwan',
    'map.markers.taiwanElections.desc':
      'Dari pesisir subtropis hingga hutan konifer pegunungan tinggi, kekayaan dunia hutan dalam perbedaan elevasi vertikal 3000 meter di Taiwan',
    'map.markers.taiwanLgbtCulture.title':
      'Perubahan Iklim dan Transisi Nol Bersih Taiwan',
    'map.markers.taiwanLgbtCulture.desc':
      'Taiwan menghadapi dampak perubahan iklim, dari makin seringnya cuaca ekstrem hingga perencanaan kebijakan untuk mencapai target emisi karbon nol bersih pada 2050, seraya mengkaji peluang dan tantangan dalam proses transisi energi',
    'map.markers.taiwanMotorcycleCulture.title':
      'Pelestarian Laut Taiwan: Mengapa Sistem yang Dibangun Selama 30 Tahun Tak Mampu Menyelamatkan Satu Peristiwa Pemutihan Karang?',
    'map.markers.taiwanMotorcycleCulture.desc':
      'Pada 2020, perairan Taiwan mengalami pemutihan karang terbesar sepanjang sejarah. Dari Xiaoliuqiu hingga Atol Dongsha, bahkan karang di dalam kawasan lindung mati akibat suhu tinggi. Masalah apa yang diungkap oleh peristiwa ini?',
    'map.markers.taipeiMrt.title':
      'Pengendalian Pencemaran Laut dan Tantangan Pelestarian Taiwan',
    'map.markers.taipeiMrt.desc':
      'Menghadapi sampah laut, penangkapan ikan berlebihan, dan perubahan iklim, mengkaji kondisi terkini, tantangan, serta solusi inovatif bagi pelestarian laut Taiwan',
    'map.markers.kaohsiungMrt.title': 'Ekologi Laut Taiwan',
    'map.markers.kaohsiungMrt.desc':
      'Perairan yang dijaga suku Tao melalui pantangan kini memutih akibat suhu tinggi dan kebisingan bawah air: ketika kearifan ekologis ribuan tahun berhadapan dengan krisis laut modern',
    'map.markers.taichungMrt.title':
      'Ekologi Laut dan Pelestarian Terumbu Karang Taiwan',
    'map.markers.taichungMrt.desc':
      'Dikelilingi laut, Taiwan memiliki ekologi laut yang kaya; dari krisis pemutihan terumbu karang hingga pelestarian paus dan lumba-lumba, mengkaji efektivitas perlindungan taman nasional laut dan tantangan masa depannya',
    'map.markers.taiwanTrainSystem.title':
      'Pemandian Air Panas dan Energi Panas Bumi Taiwan',
    'map.markers.taiwanTrainSystem.desc':
      'Dari pembangkit listrik tenaga panas bumi yang gagal 30 tahun lalu hingga hokutolit yang satu-satunya di dunia: bagaimana Taiwan mengubah api bawah tanah menjadi sarana penyembuhan dan listrik hijau',
    'map.markers.taiwanBusSystem.title': 'Pelestarian Kucing Tutul Taiwan',
    'map.markers.taiwanBusSystem.desc':
      'Kucing hantu yang tersisa kurang dari lima ratus ekor di seluruh Taiwan—ketika spesies kucing asli terakhir berada di ambang kepunahan',
    'map.markers.taiwanInnovationEcosystem.title': 'Trenggiling Taiwan',
    'map.markers.taiwanInnovationEcosystem.desc':
      'Mamalia yang paling banyak diselundupkan di dunia menemukan rumah yang aman di Taiwan',
    'map.markers.taiwanMedicalSystem.title':
      'Ekosistem Pegunungan Tinggi dan Relik Glasial Taiwan',
    'map.markers.taiwanMedicalSystem.desc':
      'Mengkaji ekosistem unik lingkungan pegunungan Taiwan di atas 3000 meter serta keanekaragaman hayati berharganya, dari Taiwania dan rhododendron Yushan hingga spesies relik zaman es',
    'map.markers.taiwanEducationSystem.title': 'Beruang Hitam Taiwan',
    'map.markers.taiwanEducationSystem.desc':
      'Huruf V putih di dadanya adalah ciri khasnya—penguasa terakhir hutan pegunungan Taiwan dan perjuangan pelestariannya yang belum usai',
    'map.markers.taiwanMusicIndustry.title': 'Taman Nasional',
    'map.markers.taiwanMusicIndustry.desc':
      '9 taman nasional dalam wilayah seluas 36,197 kilometer persegi, keajaiban pelestarian dengan kepadatan tertinggi di dunia',
    'map.markers.mandarinPopMusic.title': 'Taman Nasional Taiwan',
    'map.markers.mandarinPopMusic.desc':
      'Menjelajahi ekosistem unik dan nilai pelestarian sembilan taman nasional Taiwan, dari pesisir subtropis hingga garis salju pegunungan tinggi dengan bentang alam yang lengkap',
    'map.markers.taiwaneseIndieMusic.title': 'Spesies Endemik',
    'map.markers.taiwaneseIndieMusic.desc':
      'Kekayaan spesies endemik Taiwan memperlihatkan keajaiban evolusi biogeografi kepulauan dan pentingnya pelestarian',
    'map.markers.taiwanRapHipHop.title': 'Keanekaragaman Ekologis',
    'map.markers.taiwanRapHipHop.desc':
      'Luas Taiwan hanya mencakup 0.025% wilayah dunia, tetapi memiliki lebih dari 50.000 spesies, dengan tutupan hutan sebesar 60.71% yang menempati peringkat ke-33 dunia',
    'map.markers.taiwanElectronicMusic.title': 'Paus dan Lumba-Lumba Taiwan',
    'map.markers.taiwanElectronicMusic.desc':
      'Habitat bagi sepertiga spesies paus dan lumba-lumba dunia—dari perburuan paus pada masa lalu hingga wisata pengamatan paus masa kini, bagaimana Taiwan bertransformasi menjadi pusat penting penelitian ekologi laut?',
    'map.markers.taiwanTraditionalMusic.title': 'Mayday',
    'map.markers.taiwanTraditionalMusic.desc':
      'Dari SMA Afiliasi Universitas Normal Nasional Taiwan menuju panggung dunia, para pemuda abadi yang mendefinisikan semangat musik rock berbahasa Tionghoa',
    'map.markers.taiwanFilmIndustry.title': 'Wu Bai',
    'map.markers.taiwanFilmIndustry.desc':
      'Pusaka nasional musik rock Taiwan dan sosok yang identik dengan musik rock lokal, yang mengukuhkan kedudukannya melalui karya-karya seperti 《Norwegian Wood》',
    'map.markers.newTaiwanCinema.title': 'Wu Pao-chun',
    'map.markers.newTaiwanCinema.desc':
      'Juara kompetisi roti dunia yang memukau dunia internasional dengan roti mawar lecinya, dari pedesaan Pingtung hingga menjadi perajin roti kelas dunia',
    'map.markers.taiwanDocumentary.title': 'Lu Hsiu-lien',
    'map.markers.taiwanDocumentary.desc':
      'Dari terpidana pemberontakan hingga wakil presiden: kisah hidup legendaris wakil presiden perempuan pertama di dunia Tionghoa',
    'map.markers.taiwanAnimationIndustry.title': 'Jimmy Liao',
    'map.markers.taiwanAnimationIndustry.desc':
      'Penyair ilustrasi yang menghangatkan dunia melalui buku bergambar dan membawa buku bergambar Taiwan ke panggung internasional',
    'map.markers.taiwanTelevisionIndustry.title': 'Tai Tzu-ying',
    'map.markers.taiwanTelevisionIndustry.desc':
      'Pemegang rekor peringkat satu dunia selama 214 pekan, ratu bulu tangkis Taiwan yang meniti jalan dari Qianzhen, Kaohsiung, hingga meraih medali perak Olimpiade',
    'map.markers.taiwanOttPlatforms.title': 'Li Ang',
    'map.markers.taiwanOttPlatforms.desc':
      'Penulis 《Istri Tukang Jagal》 dan 《Taman yang Tersesat》, pelopor sastra feminis Taiwan',
    'map.markers.taiwanPodcastIndustry.title': 'Lee Chih-kai',
    'map.markers.taiwanPodcastIndustry.desc':
      'Dari Kai si anak pasar dalam 《Jump! Boys》 hingga meraih medali perak Olimpiade, enam belas tahun perjalanan jungkir balik sang pangeran kuda pelana Taiwan',
    'map.markers.taiwanPublishing.title': 'Lee Yuan-tseh',
    'map.markers.taiwanPublishing.desc':
      'Pemenang Hadiah Nobel Kimia 1986 yang merintis bidang baru dinamika kimia melalui teknik berkas molekul bersilang, serta ilmuwan Taiwan pertama yang meraih Hadiah Nobel',
    'map.markers.taiwanBookstoreCulture.title': 'Tu Tsung-ming',
    'map.markers.taiwanBookstoreCulture.desc':
      'Doktor ilmu kedokteran pertama Taiwan, bapak kedokteran modern Taiwan',
    'map.markers.taiwanComicMangaIndustry.title': 'Jeremy Lin',
    'map.markers.taiwanComicMangaIndustry.desc':
      'Pemain Amerika keturunan Taiwan yang melangkah dari mahasiswa berprestasi Harvard hingga menjadi juara NBA dan memicu demam Linsanity di seluruh dunia',
    'map.markers.taiwanGameIndustry.title': 'Lin Yi-chieh',
    'map.markers.taiwanGameIndustry.desc':
      'Dari anak kurus yang ditolak tim atletik hingga pelari ekstrem yang mencetak sejarah dengan menyeberangi Gurun Sahara berjalan kaki',
    'map.markers.nationalPalaceMuseum.title': 'Lin Yi-hsiung',
    'map.markers.nationalPalaceMuseum.desc':
      'Pelopor gerakan demokrasi, korban Pembantaian Keluarga Lin, dan pemimpin gerakan penolakan PLTN Keempat',
    'map.markers.nationalParks.title': 'Edward Yang',
    'map.markers.nationalParks.desc':
      'Tokoh utama gerakan Sinema Baru Taiwan, peraih penghargaan Sutradara Terbaik Cannes, dan penyair keterasingan perkotaan',
    'map.markers.taiwanGeography.title': 'Pai Hsien-yung',
    'map.markers.taiwanGeography.desc':
      'Penulis 《Orang-Orang Taipei》, maestro sastra modern dan penggerak kebangkitan opera Kunqu',
    'map.markers.taiwanClimate.title': 'Crowd Lu',
    'map.markers.taiwanClimate.desc':
      'Penyanyi-penulis lagu dan aktor Taiwan, pemenang tiga penghargaan utama (Golden Melody, Golden Bell, dan Golden Horse), terkenal karena citranya yang membumi dan ramah serta gaya bernyanyinya yang khas',
    'map.markers.taiwanEcosystem.title': 'Chuang Chih-yuan',
    'map.markers.taiwanEcosystem.desc':
      'Bapak tenis meja Taiwan, wakil Taiwan dalam empat Olimpiade, dan pahlawan penyendiri yang berlatih keras seorang diri',
    'map.markers.taiwanEndangeredSpecies.title': 'Tsai Ming-liang',
    'map.markers.taiwanEndangeredSpecies.desc':
      'Peraih Singa Emas Venesia, seorang Tionghoa Malaysia, dan maestro estetika sinema lambat',
    'map.markers.taiwanMarineEcology.title': 'Hsu Wen-lung',
    'map.markers.taiwanMarineEcology.desc':
      'Pendiri Chi Mei Group yang sekaligus berkiprah sebagai pengusaha, pemain biola, dan kolektor seni, serta pendiri Museum Chimei',
    'map.markers.taiwanBirdwatching.title': 'Hsu Fang-yi',
    'map.markers.taiwanBirdwatching.desc':
      'Dari gadis Yilan menjadi penari utama Martha Graham Dance Company, lalu kembali ke Taiwan untuk mendirikan LAFA & Artists——melalui tubuhnya, ia menuturkan kisah Taiwan yang paling penuh daya',
    'map.markers.taiwanHotSprings.title':
      'Lai Ching-te: dokter kesehatan masyarakat dari keluarga penambang hingga Istana Kepresidenan',
    'map.markers.taiwanHotSprings.desc':
      'Presiden Taiwan ke-16, tokoh politik pertama dalam sejarah konstitusional Republik Tiongkok (Taiwan) yang mencalonkan diri sebagai presiden ketika menjabat wakil presiden dan berhasil terpilih',
    'map.markers.taiwanIslands.title': 'Kuo Hsing-chun',
    'map.markers.taiwanIslands.desc':
      'Dewi angkat besi Taiwan, peraih medali emas Olimpiade Tokyo 2021, dan pemegang tiga rekor Olimpiade kelas 59 kilogram',
    'map.markers.taiwanMountains.title': 'Teng Yu-hsien',
    'map.markers.taiwanMountains.desc':
      'Bapak lagu rakyat Taiwan, pencipta lagu klasik berbahasa Taiwan seperti 《Bāng Chhun-hong》, 《Ú-iā Hoe》, dan 《Gue̍h-iā Chhiû》',
    'map.markers.taiwanRivers.title': 'Chung Li-ho',
    'map.markers.taiwanRivers.desc':
      'Penulis 《Orang dari Kampung Halaman》, bapak sastra Taiwan, dan pejuang sastra yang terus berkarya meski didera kemiskinan dan penyakit',
    'map.markers.taiwanCoastline.title': 'Chen Shu-chu',
    'map.markers.taiwanCoastline.desc':
      'Kebaikan sederhana seorang pedagang sayur dari Taitung yang sepanjang hidupnya menunjukkan arti kekayaan sejati',
    'map.markers.taiwanForests.title': 'Chen Shui-bian',
    'map.markers.taiwanForests.desc':
      'Presiden ke-10 dan ke-11, tokoh utama peralihan kekuasaan antarpartai pertama pada 2000, dan figur penting demokratisasi Taiwan',
    'map.markers.taiwanNaturalDisasters.title': 'Ma Ying-jeou',
    'map.markers.taiwanNaturalDisasters.desc':
      'Presiden ke-12 dan ke-13, penggerak pencairan hubungan lintas Selat Taiwan, dan penanda tangan ECFA',
    'map.markers.taiwanEarthquakes.title': 'Huang Chun-ming',
    'map.markers.taiwanEarthquakes.desc':
      'Penulis 《Boneka Besar Putraku》 dan 《Hari-Hari Menatap Laut》, sastrawan terkemuka sastra kedaerahan Yilan',
    'map.markers.taiwanTyphoons.title':
      'Huang Chen-nan: “Takeshi Kaneshiro” dunia koleksi buku dan mata air hidup sejarah serta budaya Taiwan',
    'map.markers.taiwanTyphoons.desc':
      'Huang Chen-nan adalah pegiat sejarah dan budaya Taiwan, kolektor buku, serta penulis. Ia mengawali kiprahnya dengan nama pengguna PTT Sizumaru dan mengelola laman 「Ruang Buku Mata Air Hidup」 untuk berbagi sejarah Taiwan serta budaya buku lawas. Ia menulis buku seperti 《Sejarah Taiwan Paling Jenaka dalam Sejarah Taiwan》 dan dijuluki “Takeshi Kaneshiro” dunia koleksi buku. Berasal dari keluarga pencinta buku di Liujiao, Chiayi, ia dan ayahnya berbagi tugas mengumpulkan dokumen di Taiwan utara dan selatan, serta berupaya menjadikan sejarah Taiwan yang serius terasa menarik dan mudah didekati.',
    'map.markers.sunflowerMovement.title':
      'Kebun Binatang dan Etika Satwa Pertunjukan',
    'map.markers.sunflowerMovement.desc':
      'Dari gajah dalam kandang besi hingga dinding ubur-ubur Xpark——Taiwan tengah mendefinisikan ulang hubungan manusia dengan satwa yang dipamerkan',
    'map.markers.taiwanSocialMovements.title':
      'Keadilan Tanah dan Wilayah Tradisional Masyarakat Adat Taiwan',
    'map.markers.taiwanSocialMovements.desc':
      'Membahas konteks sejarah hak atas tanah masyarakat adat Taiwan, perkembangan hukum, sengketa penetapan wilayah tradisional, serta hasil kerja Komisi Keadilan Transisional Masyarakat Adat',
    'map.markers.taiwanMarriageEquality.title':
      'Pernikahan Sesama Jenis dan Kesetaraan Gender di Taiwan',
    'map.markers.taiwanMarriageEquality.desc':
      'Dari narapidana pada masa darurat militer hingga undang-undang pernikahan sesama jenis pertama di Asia, bagaimana perjuangan seorang pria selama 30 tahun mengubah definisi cinta di Taiwan',
    'map.markers.taiwanEnvironmentalJustice.title':
      'Keadilan Lingkungan dan Sengketa NIMBY di Taiwan',
    'map.markers.taiwanEnvironmentalJustice.desc':
      'Membahas ketimpangan distribusi beban lingkungan di Taiwan, dari konflik NIMBY terkait insinerator, limbah nuklir, hingga industri petrokimia, serta menganalisis persoalan ketidaksetaraan lingkungan dan keadilan sosial',
    'map.markers.taiwanCommunityRiCulture.title':
      'Budaya Komunitas dan Lingkungan Setempat di Taiwan',
    'map.markers.taiwanCommunityRiCulture.desc':
      'Dari praktik demokrasi paling akar rumput hingga inovasi sosial dalam pembangunan komunitas',
    'map.markers.taiwanLongTermCare.title':
      'Perkembangan Sistem Perawatan Jangka Panjang Taiwan',
    'map.markers.taiwanLongTermCare.desc':
      'Salah satu sistem perawatan jangka panjang paling maju di dunia, tetapi sekaligus memiliki sistem perawatan tak kasatmata terbesar',
    'map.markers.taiwanLaborMovement.title':
      'Pelestarian Lingkungan dan Pembangunan Berkelanjutan',
    'map.markers.taiwanLaborMovement.desc':
      'Dari pulau cerobong asap menuju Taiwan nol emisi bersih: perjalanan kebangkitan gerakan lingkungan selama 40 tahun',
    'map.markers.taiwanHousingIssues.title':
      'Perumahan Sosial dan Keadilan Hunian',
    'map.markers.taiwanHousingIssues.desc':
      'Bagaimana Taiwan mewujudkan keadilan hunian melalui kebijakan perumahan sosial agar setiap orang memiliki tempat tinggal yang aman',
    'map.markers.taiwanHealthcareSystem.title':
      'Perkembangan Kawasan Sains dan Teknologi',
    'map.markers.taiwanHealthcareSystem.desc':
      'Dari Hsinchu Science Park hingga Southern Taiwan Science Park, menelusuri perkembangan kawasan sains Taiwan dan posisi unik ketiga kawasan utamanya',
    'map.markers.taiwanImmigration.title': 'Industri Semikonduktor',
    'map.markers.taiwanImmigration.desc':
      'Dari pertaruhan bersejarah Morris Chang hingga era 2 nanometer: bagaimana TSMC menjadikan Taiwan urat nadi teknologi global',
    'map.markers.taiwanReligiousDiversity.title':
      'Bentang Alam Pesisir dan Laut Taiwan',
    'map.markers.taiwanReligiousDiversity.desc':
      'Leher Queen’s Head di Yehliu menipis dengan kecepatan 0.2 sentimeter per tahun dan suatu hari akan patah——inilah takdir sekaligus keindahan bentang alam pesisir Taiwan',
    'map.markers.taiwanBuddhismTaoism.title':
      'Budaya Teh dan Estetika Kehidupan Taiwan',
    'map.markers.taiwanBuddhismTaoism.desc':
      'Pada malam Wistaria Tea House dibuka pada 1981, tokoh oposisi dan sastrawan berkumpul menikmati teh; tempat ini bukan sekadar kedai teh, melainkan juga markas rahasia gerakan perlawanan',
    'map.markers.taiwanFolkReligion.title':
      'Pemilu dan Politik Kepartaian Taiwan',
    'map.markers.taiwanFolkReligion.desc':
      'Dari anggota dewan daerah pada 1950 hingga pergantian partai berkuasa pada 2000, lihat bagaimana Taiwan menorehkan keajaiban transisi demokrasi melalui surat suara',
    'map.markers.taiwanChristianity.title':
      'Perkembangan Perkotaan dan Kesenjangan Kota-Desa di Taiwan',
    'map.markers.taiwanChristianity.desc':
      'Dalam 70 tahun, Taiwan berubah dari pulau agraris menjadi pulau perkotaan; sisi terang dan gelap ketika enam kota khusus menampung 70% populasi: kontras tajam antara Taichung yang makmur dan Yunlin yang merosot',
    'map.markers.taiwanIslamJudaism.title':
      'Ciri Khas Kota dan Budaya Regional',
    'map.markers.taiwanIslamJudaism.desc':
      'Dari New Taipei berpenduduk 4,04 juta jiwa hingga Tainan berpenduduk 1,85 juta jiwa, lihat bagaimana enam kota khusus membentuk karakter perkotaan masing-masing di tengah transformasi industri',
    'map.markers.kaohsiungIncident.title': 'Demokratisasi',
    'map.markers.kaohsiungIncident.desc':
      'Bentrok antara polisi dan warga di jalanan Kaohsiung pada 10 Desember 1979 akhirnya melahirkan transisi demokrasi Taiwan——tetapi berapa banyak masa muda dan kebebasan yang harus dikorbankan?',
    'map.markers.wangLeeOlympicGold.title':
      'Wang Chi-lin dan Lee Yang（Pasangan Lin-Yang）',
    'map.markers.wangLeeOlympicGold.desc':
      'Dari teman semasa SMP hingga peraih medali emas Olimpiade:「Pasangan Lin-Yang」mengalahkan Tiongkok dua gim langsung dalam 34 menit, menorehkan medali emas Olimpiade pertama dalam sejarah bulu tangkis Taiwan',
  },
  pt: {
    // Meta
    'map.meta.title': 'Mapa de Taiwan',
    'map.meta.description':
      'Explore as conexões do conteúdo do Taiwan.md por meio do mapa',

    // Hero Section
    'map.hero.kicker': 'Map View',
    'map.hero.title': 'Mapa de Taiwan',
    'map.hero.subtitle':
      'Explore a cultura, a gastronomia, a natureza e os marcos históricos de Taiwan por meio do mapa.',

    // Controls - Region Filter
    'map.controls.region.title': 'Filtrar por região',
    'map.controls.region.all': 'Todas',
    'map.controls.region.north': 'Norte',
    'map.controls.region.central': 'Centro',
    'map.controls.region.south': 'Sul',
    'map.controls.region.east': 'Leste',
    'map.controls.region.islands': 'Ilhas periféricas',

    // Controls - Category Filter
    'map.controls.category.title': 'Filtrar por categoria',
    'map.controls.category.all': 'Todas',
    'map.controls.category.food': '🍜 Gastronomia',
    'map.controls.category.history': '📜 História',
    'map.controls.category.nature': '🌿 Natureza',
    'map.controls.category.culture': '🎭 Cultura',
    'map.controls.category.technology': '💻 Tecnologia',
    'map.controls.category.economy': '📈 Economia',
    'map.controls.category.lifestyle': '🏮 Estilo de vida',
    'map.controls.category.art': '🎨 Arte',
    'map.controls.category.geography': '🗺️ Geografia',

    // Route Section
    'map.route.title': '🗺️ Roteiros temáticos',
    'map.route.normal-mode': 'Modo normal',

    // Sidebar - Default
    'map.sidebar.default.title': '📍 Explore artigos sobre Taiwan',
    'map.sidebar.default.hint':
      'Clique em uma cidade, um condado ou um marcador no mapa para explorar os artigos',

    // Sidebar - County
    'map.sidebar.county.clear': '✕ Limpar seleção',
    'map.sidebar.county.articles-count': 'artigos',
    'map.sidebar.county.no-articles': 'Ainda não há artigos sobre esta região',

    // Sidebar - Article
    'map.sidebar.article.back': '← Voltar',
    'map.sidebar.article.read-more': 'Leia o artigo completo →',

    // Zoom Controls
    'map.zoom.in': '＋',
    'map.zoom.out': '－',
    'map.zoom.reset': '⌂',

    // Tooltips
    'map.tooltip.county.articles': 'artigos relacionados',
    'map.tooltip.county.click': 'Clique para filtrar esta região',
    'map.tooltip.marker.reading-time': 'minutos de leitura',

    // Panel (for compatibility)
    'map.panel.title': 'Mapa do conhecimento de Taiwan',
    'map.panel.stat.points': 'Pontos de conhecimento',
    'map.panel.stat.categories': 'Categorias',
    'map.panel.category-distribution': 'Distribuição por categoria',
    'map.panel.link.graph': '🕸️ Grafo do conhecimento',
    'map.panel.link.home': '🏠 Visão geral das categorias',

    // Category Names (for JS usage)
    'map.category.history': '📜 História',
    'map.category.geography': '🗺️ Geografia',
    'map.category.culture': '🎭 Cultura',
    'map.category.food': '🍜 Gastronomia',
    'map.category.art': '🎨 Arte',
    'map.category.music': '🎵 Música',
    'map.category.technology': '💻 Tecnologia',
    'map.category.nature': '🌿 Natureza',
    'map.category.people': '👥 Personalidades',
    'map.category.society': '⚖️ Sociedade',
    'map.category.economy': '📈 Economia',
    'map.category.lifestyle': '🏮 Estilo de vida',

    // Additional UI text
    'map.sidebar.more-articles': '⋯e mais',
    'map.sidebar.more-articles-suffix': 'artigos',

    // Routes
    'map.routes.nightMarkets.name': '🍜 Circuito dos mercados noturnos',
    'map.routes.nightMarkets.description':
      'De norte a sul, a emblemática cultura dos mercados noturnos de Taiwan',
    'map.routes.nationalParks.name': '🏔️ Circuito dos parques nacionais',
    'map.routes.nationalParks.description':
      'Das montanhas de 3,952 metros aos recifes de coral tropicais, as maravilhas naturais de Taiwan',
    'map.routes.historyTrail.name': '📜 Trilha histórica',
    'map.routes.historyTrail.description':
      'Da colonização neerlandesa à democratização, percorra quatrocentos anos de Taiwan',
    'map.routes.oldStreets.name': '🏮 Passeio pelas ruas históricas',
    'map.routes.oldStreets.description':
      'As memórias de Taiwan em ruas centenárias, onde a arquitetura é história',

    'map.routes.counties22.name':
      '📍 Artigos aprofundados sobre 22 cidades e condados',
    'map.routes.counties22.description':
      'Explore os 22 artigos aprofundados do Taiwan.md sobre cidades e condados, do pilot de Keelung ao finale de Nova Taipé — cada local revela uma tensão central.',
    'map.counties22.panel.title':
      '📍 Artigos aprofundados sobre 22 cidades e condados',
    'map.counties22.panel.hint':
      'Clique no cartão ou selecione a cidade ou o condado no mapa',
    'map.counties22.tooltip.openDeep': 'Clique para abrir o artigo aprofundado',
    'map.counties22.deepCard.badge':
      '📖 Série das 22 cidades e condados · Artigo aprofundado',
    'map.counties22.deepCard.cta': 'Leia o artigo completo →',

    // Night Markets Stops
    'map.stops.shilinNightMarket.name': 'Mercado Noturno de Shilin',
    'map.stops.shilinNightMarket.note':
      'O maior mercado noturno turístico de Taiwan e berço do bolinho grande recheado com bolinho pequeno',
    'map.stops.raoheNightMarket.name': 'Mercado Noturno de Raohe',
    'map.stops.raoheNightMarket.note':
      'Templo das filas pelo bolinho de pimenta e favorito dos moradores de Taipé',
    'map.stops.ningxiaNightMarket.name': 'Mercado Noturno de Ningxia',
    'map.stops.ningxiaNightMarket.note':
      'A maior concentração de sabores, em uma rua de comida popular recomendada pelo Michelin',
    'map.stops.fengjiaNightMarket.name': 'Mercado Noturno de Fengchia',
    'map.stops.fengjiaNightMarket.note':
      'Laboratório de petiscos criativos e vanguarda da inovação nos mercados noturnos de Taiwan',
    'map.stops.huayuanNightMarket.name': 'Mercado Noturno de Huayuan',
    'map.stops.huayuanNightMarket.note':
      'O maior mercado noturno de Tainan, uma celebração exclusiva que acontece apenas três dias por semana',
    'map.stops.liuheNightMarket.name': 'Mercado Noturno de Liuhe',
    'map.stops.liuheNightMarket.note':
      'Mercado noturno emblemático de Kaohsiung, onde os frutos do mar são protagonistas',

    // National Parks Stops
    'map.stops.yangmingshanNationalPark.name':
      'Parque Nacional de Yangmingshan',
    'map.stops.yangmingshanNationalPark.note':
      'O quintal de Taipé, com paisagens vulcânicas e refúgios de águas termais',
    'map.stops.tarokoNationalPark.name': 'Parque Nacional de Taroko',
    'map.stops.tarokoNationalPark.note':
      'Um cânion de mármore e maravilha geológica de nível mundial',
    'map.stops.yushanNationalPark.name': 'Parque Nacional de Yushan',
    'map.stops.yushanNationalPark.note':
      'O pico mais alto do nordeste da Ásia（3,952m）e o teto de Taiwan',
    'map.stops.alishanScenicArea.name': 'Área Cênica Nacional de Alishan',
    'map.stops.alishanScenicArea.note':
      'Nascer do sol sobre um mar de nuvens, árvores sagradas e ferrovia florestal',
    'map.stops.sunMoonLakeScenicArea.name':
      'Área Cênica Nacional do Lago Sun Moon',
    'map.stops.sunMoonLakeScenicArea.note':
      'O maior lago natural de Taiwan e lago sagrado do povo Thao',
    'map.stops.kentingNationalPark.name': 'Parque Nacional de Kenting',
    'map.stops.kentingNationalPark.note':
      'O extremo sul de Taiwan, com recifes de coral tropicais e a Península de Hengchun',

    // History Trail Stops
    'map.stops.anpingFort.name': 'Forte de Anping',
    'map.stops.anpingFort.note':
      'Construído pelos holandeses em 1624, é o forte mais antigo de Taiwan',
    'map.stops.chikanTower.name': 'Torre Chikan',
    'map.stops.chikanTower.note':
      'Do forte holandês Provintia ao símbolo do domínio de Koxinga',
    'map.stops.lukang.name': 'Lukang',
    'map.stops.lukang.note':
      'Segunda maior cidade de Taiwan durante a dinastia Ching: “Tainan em primeiro, Lukang em segundo e Manka em terceiro”',
    'map.stops.presidentialOffice.name':
      'Palácio Presidencial (antigo Gabinete do Governador-Geral de Taiwan)',
    'map.stops.presidentialOffice.note':
      'Concluído em 1919, foi o principal centro de poder durante o domínio japonês',
    'map.stops.chiangKaiShekMemorialHall.name': 'Memorial Chiang Kai-shek',
    'map.stops.chiangKaiShekMemorialHall.note':
      'Símbolo do autoritarismo e foco dos debates sobre justiça de transição',
    'map.stops.legislativeYuan.name': 'Yuan Legislativo (Movimento Girassol)',
    'map.stops.legislativeYuan.note':
      'Palco do Movimento Estudantil Girassol de 2014, um marco da democracia de Taiwan',

    // Old Streets Stops
    'map.stops.dihuaStreet.name': 'Rua Dihua',
    'map.stops.dihuaStreet.note':
      'O coração de Dadaocheng, famoso pelos produtos do norte e do sul e pelo mercado de Ano-Novo',
    'map.stops.jiufenOldStreet.name': 'Rua Antiga de Jiufen',
    'map.stops.jiufenOldStreet.note':
      'Os anos dourados da mineração e a inspiração para A Viagem de Chihiro',
    'map.stops.lukangOldStreet.name': 'Rua Antiga de Lukang',
    'map.stops.lukangOldStreet.note':
      'Um museu vivo de antigas casas de tijolos vermelhos e artesanato tradicional',
    'map.stops.anpingOldStreet.name': 'Rua Antiga de Anping',
    'map.stops.anpingOldStreet.note':
      'A primeira rua de Taiwan, com quatrocentos anos de história acumulada',
    'map.stops.qishanOldStreet.name': 'Rua Antiga de Chishan',
    'map.stops.qishanOldStreet.note':
      'O conjunto arquitetônico barroco do reino da banana',
    'map.stops.tamsuiOldStreet.name': 'Rua Antiga de Tamsui',
    'map.stops.tamsuiOldStreet.note':
      'O pôr do sol, o agei e a atmosfera histórica da foz do rio Tamsui',

    // Cities
    'map.city.taipei': 'Taipé',
    'map.city.newTaipei': 'Nova Taipé',
    'map.city.keelung': 'Keelung',
    'map.city.taoyuan': 'Taoyuan',
    'map.city.hsinchu': 'Hsinchu',
    'map.city.miaoli': 'Miaoli',
    'map.city.taichung': 'Taichung',
    'map.city.changhua': 'Changhua',
    'map.city.nantou': 'Nantou',
    'map.city.chiayi': 'Chiayi',
    'map.city.tainan': 'Tainan',
    'map.city.kaohsiung': 'Kaohsiung',
    'map.city.pingtung': 'Pingtung',
    'map.city.yilan': 'Yilan',
    'map.city.hualien': 'Hualien',
    'map.city.taitung': 'Taitung',
    'map.city.penghu': 'Penghu',
    'map.city.kinmen': 'Kinmen',

    // Markers
    'map.markers.founderCheYuWu.title': 'Fundador — Wu Che-Yu',
    'map.markers.founderCheYuWu.desc':
      'Do código à poesia: a trajetória de projeção internacional de um artista taiwanês',
    'map.markers.taiwanIndigenousContemporaryArt.title':
      'Arte indígena contemporânea de Taiwan',
    'map.markers.taiwanIndigenousContemporaryArt.desc':
      'Do artesanato tradicional à criação contemporânea, descubra como os artistas indígenas de Taiwan fazem suas vozes serem ouvidas no cenário artístico mundial e redefinem o diálogo entre identidade indígena e arte contemporânea',
    'map.markers.taiwanExperimentalNewMediaArt.title':
      'Arte experimental e de novas mídias de Taiwan',
    'map.markers.taiwanExperimentalNewMediaArt.desc':
      'Da videoarte às experiências interativas em VR, explore o desenvolvimento inovador e o ecossistema de arte e tecnologia das novas mídias de Taiwan',
    'map.markers.taiwanArchitecture.title': 'Arquitetura de Taiwan',
    'map.markers.taiwanArchitecture.desc':
      'Das casas de pedra aos arranha-céus: uma viagem pela história arquitetônica de uma ilha',
    'map.markers.taiwanNewMediaArt.title': 'Arte de novas mídias de Taiwan',
    'map.markers.taiwanNewMediaArt.desc':
      'Explore a cultura e as histórias de Taiwan',
    'map.markers.taiwanWatercolorCenturyEvolution.title':
      'Um século de transformações na aquarela de Taiwan',
    'map.markers.taiwanWatercolorCenturyEvolution.desc':
      'Da iniciação promovida por Ishikawa Kinichiro durante o domínio japonês ao reconhecimento internacional de Chien Chung-wei na atualidade, a aquarela de Taiwan percorreu um século e tornou a ilha um dos centros mais ativos dessa arte na Ásia.',
    'map.markers.taiwanModernPoetry.title': 'Poesia moderna de Taiwan',
    'map.markers.taiwanModernPoetry.desc':
      'Como os experimentos modernistas surgidos de três gabinetes de estudo desencadearam, inesperadamente, a mais local das revoluções poéticas',
    'map.markers.taiwanContemporarySculpture.title':
      'Desenvolvimento da escultura contemporânea de Taiwan',
    'map.markers.taiwanContemporarySculpture.desc':
      'De Yuyu Yang e Ju Ming à nova geração, explore a evolução e o espírito criativo da escultura de Taiwan',
    'map.markers.taiwanCuratorsArtCulture.title':
      'Curadores e construção da cultura artística em Taiwan',
    'map.markers.taiwanCuratorsArtCulture.desc':
      'Da curadoria independente ao sistema de museus de arte, descubra como os curadores de Taiwan constroem o discurso cultural e o diálogo internacional da arte contemporânea',
    'map.markers.newMediaArt.title': 'Arte de novas mídias',
    'map.markers.newMediaArt.desc':
      'A exploração pioneira da arte digital de Taiwan, unindo tecnologia e humanidades dos laboratórios ao cenário internacional',
    'map.markers.contemporaryTaiwanLiterature.title':
      'Literatura contemporânea de Taiwan',
    'map.markers.contemporaryTaiwanLiterature.desc':
      'Explore a cultura e as histórias de Taiwan',
    'map.markers.taiwanContemporaryArt.title': 'Arte contemporânea de Taiwan',
    'map.markers.taiwanContemporaryArt.desc':
      'Do Museu de Belas Artes de Taipé ao Pavilhão de Taiwan na Bienal de Veneza, a posição singular da arte contemporânea taiwanesa no cenário mundial',
    'map.markers.kinmenGuesthouseMuseum.title':
      'Museu de Arte Contemporânea ALIEN Art Centre',
    'map.markers.kinmenGuesthouseMuseum.desc':
      'Uma antiga hospedaria militar da Guerra Fria que testemunhou partidas e reencontros, despertada após vinte anos por um pai e sua filha e transformada no museu de arte mais recomendado de Kaohsiung pelo Lonely Planet.',
    'map.markers.renjianMagazine.title': 'Revista Renjian',
    'map.markers.renjianMagazine.desc':
      '47 edições, quatro anos, uma revolução silenciosa conduzida pela fotografia e pela escrita — o ponto de partida da literatura de reportagem de Taiwan',
    'map.markers.taiwanIndigenousCulture.title': 'Cultura indígena de Taiwan',
    'map.markers.taiwanIndigenousCulture.desc':
      'Das diversas tradições dos dezesseis povos à revitalização pela arte contemporânea, explore as raízes profundas e as transformações modernas das culturas indígenas de Taiwan',
    'map.markers.taiwan16IndigenousTribes.title':
      'Mapa cultural dos 16 povos indígenas de Taiwan',
    'map.markers.taiwan16IndigenousTribes.desc':
      'Explore a distribuição territorial, os sistemas linguísticos, os principais festivais e o desenvolvimento da criação contemporânea dos 16 povos indígenas de Taiwan e conheça a diversidade de suas culturas',
    'map.markers.taiwanNightMarketCulture.title':
      'Cultura dos mercados noturnos e petiscos de Taiwan',
    'map.markers.taiwanNightMarketCulture.desc':
      'Explore em profundidade as origens e o encanto singular da cultura dos mercados noturnos de Taiwan, bem como as histórias e os significados culturais de seus petiscos mais representativos',
    'map.markers.taiwanSensibilityKoreanPerspective.title':
      'Sensibilidade taiwanesa: a estética de Taiwan pelo olhar coreano',
    'map.markers.taiwanSensibilityKoreanPerspective.desc':
      'Dos videoclipes de K-pop à Feira do Livro de Seul, como a “대만감성” transformou as paisagens urbanas cotidianas de Taiwan em um dos símbolos estéticos mais fascinantes da Ásia',
    'map.markers.taiwanCulturalCreativeParks.title':
      'Desenvolvimento dos parques culturais e criativos de Taiwan',
    'map.markers.taiwanCulturalCreativeParks.desc':
      'Da revitalização de edifícios antigos à formação de polos criativos, a trajetória e os modelos inovadores dos parques culturais e criativos de Taiwan',
    'map.markers.taiwanOldStreetCulture.title':
      'Cultura das ruas antigas e distritos comerciais de Taiwan',
    'map.markers.taiwanOldStreetCulture.desc':
      'Da prosperidade portuária da dinastia Ching aos edifícios barrocos do domínio japonês, as ruas antigas de Taiwan são uma história popular escrita em tijolos e telhas',
    'map.markers.taiwanTeaCeremonyLifeAesthetics.title':
      'Cerimônia do chá e estética da vida em Taiwan',
    'map.markers.taiwanTeaCeremonyLifeAesthetics.desc':
      'Do chá gongfu à estética da mesa de chá, explore como Taiwan integra e reinventa a cultura oriental do chá e a estética da vida local',
    'map.markers.taiwanStreetArtGraffiti.title':
      'Arte de rua e cultura do grafite em Taiwan',
    'map.markers.taiwanStreetArtGraffiti.desc':
      'Do grafite clandestino aos murais autorizados, como os muros urbanos se tornaram o palco criativo dos artistas de Taiwan',
    'map.markers.taiwanIncenseMakingCulture.title':
      'A cultura da fabricação de incenso em Taiwan e a terra natal das varetas',
    'map.markers.taiwanIncenseMakingCulture.desc':
      'Da técnica centenária de varetas de incenso da comunidade Yunxiao, em Chiayi, à indústria de incenso espalhada por toda Taiwan — um ofício ancestral marcado por devoção, habilidade e perseverança',
    'map.markers.taiwanHomophoneTaboos.title':
      'A cultura dos tabus homófonos em Taiwan: por que o número「四」faz toda a sociedade pular andares?',
    'map.markers.taiwanHomophoneTaboos.desc':
      'De hospitais sem quarto andar a placas 8888 leiloadas por preços exorbitantes, a sensibilidade dos taiwaneses aos homófonos está entre as maiores do mundo',
    'map.markers.hakkaCultureLanguage.title': 'Cultura e língua hakka',
    'map.markers.hakkaCultureLanguage.desc':
      'O espírito de obstinação e o Dia do Céu Perfurado: a herança cultural e a revitalização moderna dos hakkas de Taiwan',
    'map.markers.ethnicGroupsTaiwan.title':
      'Grupos étnicos (hoklo, hakka, povos indígenas, continentais e novos imigrantes)',
    'map.markers.ethnicGroupsTaiwan.desc':
      'A diversidade étnica de Taiwan não é apenas resultado de seu desenvolvimento histórico, mas também a chave para compreender a sociedade taiwanesa contemporânea. Essa estrutura social de coexistência plural é tanto fonte da criatividade cultural de Taiwan quanto uma base importante para o desenvolvimento de sua política democrática. Construir uma identidade taiwanesa comum, respeitando ao mesmo tempo as particularidades culturais de cada grupo, é um desafio importante que a sociedade de Taiwan continua enfrentando.',
    'map.markers.chinaSteel.title':
      'China Steel: o ministro cabeça-dura e a lenda siderúrgica dos Dez Grandes Projetos de Infraestrutura',
    'map.markers.chinaSteel.desc':
      'Das negociações astutas de Chao Yao-tung na Europa e nos Estados Unidos para obter tecnologia à primeira coluna de fumaça branca que se ergueu em Hsiaokang, Kaohsiung, a China Steel levou 50 anos para construir a espinha dorsal da indústria pesada de Taiwan e se tornou a joia mais bem-sucedida dos Dez Grandes Projetos de Infraestrutura',
    'map.markers.taiwanCement.title':
      'Taiwan Cement: a lendária transformação verde da primeira empresa de Taiwan listada em bolsa',
    'map.markers.taiwanCement.desc':
      'Em 1962, a Bolsa de Valores de Taiwan nasceu para ela, e o código de ação 1101 simboliza a origem do mercado acionário taiwanês. Administrada por três gerações da família Koo ao longo de 76 anos, a Taiwan Cement testemunhou o milagre da construção de Taiwan por meio de cada um de seus fornos de cimento e agora se transforma em uma empresa verde para enfrentar a era da neutralidade de carbono',
    'map.markers.tsmc.title': 'Empresa taiwanesa: TSMC',
    'map.markers.tsmc.desc':
      'Líder mundial na fabricação de chips por contrato, controla uma artéria vital da civilização digital humana',
    'map.markers.chimeiCorporation.title':
      'Chi Mei Corporation: o império do acrílico e o sonho de um museu de Hsu Wen-lung',
    'map.markers.chimeiCorporation.desc':
      'Partindo de uma pequena fábrica em Jen-te, Tainan, em 1960, Hsu Wen-lung dedicou a vida a construir o maior império de materiais ABS da Ásia e criou o Museu Chimei para retribuir à sociedade. Uma prova de que as empresas de Taiwan podem conciliar o sucesso comercial com a preocupação humanista',
    'map.markers.acer.title':
      'Grupo Acer (Acer) - pioneiro da transformação do setor de PCs',
    'map.markers.acer.desc':
      'Pioneira dos computadores pessoais, nascida em Taoyuan, Taiwan, criou o modelo de negócios de「múltiplas marcas e múltiplos canais」e se tornou um motor da transformação mundial do setor de PCs',
    'map.markers.giantBicycles.title': 'Empresa taiwanesa: Giant Manufacturing',
    'map.markers.giantBicycles.desc':
      'De fabricante terceirizada explorada e abandonada por uma gigante americana a império invisível que define os padrões tecnológicos mundiais das bicicletas',
    'map.markers.quantaComputer.title': 'Empresa taiwanesa: Quanta Computer',
    'map.markers.quantaComputer.desc':
      'De um incêndio na fábrica à liderança mundial em notebooks: como Barry Lam construiu um novo império para a era da AI?',
    'map.markers.aseGroup.title': 'Empresa taiwanesa: ASE Semiconductor',
    'map.markers.aseGroup.desc':
      'Maior empresa mundial de encapsulamento e testes de semicondutores: por que o dono de uma construtora migrou para o setor de semicondutores?',
    'map.markers.esunFinancialHolding.title':
      'Empresa taiwanesa: E.SUN Financial Holding',
    'map.markers.esunFinancialHolding.desc':
      'De banco especializado em cartões de crédito a pioneiro das finanças digitais, a história de superação do mais jovem presidente de uma holding financeira, aos 43 anos',
    'map.markers.changChunPetrochemical.title':
      'Empresa taiwanesa: Chang Chun Petrochemical',
    'map.markers.changChunPetrochemical.desc':
      'De uma pequena fábrica em Tainan, em 1949, a gigante química mundial: a história da campeã invisível que「não abre capital nem toma dinheiro emprestado」',
    'map.markers.formosaPlasticsGroup.title':
      'Empresa taiwanesa: Evergreen Marine',
    'map.markers.formosaPlasticsGroup.desc':
      'De um navio de segunda mão a um império mundial do transporte marítimo, a lenda do oceano azul de Chang Yung-fa',
    'map.markers.taipeiFubon.title':
      'A economia dos mercados noturnos: um milagre comercial sem marcas',
    'map.markers.taipeiFubon.desc':
      'Descubra como os mercados noturnos de Taiwan criam um milagre econômico com produção anual de quase 400 bilhões, sem marcas, decoração ou locais fixos',
    'map.markers.taiwan7Eleven.title': 'A indústria do café em Taiwan',
    'map.markers.taiwan7Eleven.desc':
      'Das origens do cultivo durante o domínio japonês ao título mundial do Simple Kaffa, um século de evolução do café taiwanês',
    'map.markers.taiwanHighSpeedRail.title':
      'Mapa dos petiscos regionais de Taiwan',
    'map.markers.taiwanHighSpeedRail.desc':
      'Da sopa ting-pien-hu da região do Templo de Keelung ao joelho de porco de Wanluan, em Pingtung, das almôndegas de peixe de Hsinchu às pinhas de Taitung, cada cidade tem seu próprio DNA de sabores. Siga os passos dos moradores locais, descubra os petiscos regionais mais representativos dos 22 condados e cidades de Taiwan e saboreie a cultura popular mais autêntica da ilha.',
    'map.markers.taiwanSemiconductorIndustry.title':
      'Pratos artesanais de Taiwan: memórias gustativas que estão desaparecendo',
    'map.markers.taiwanSemiconductorIndustry.desc':
      'Do frango com hortelã de Chiayi à sopa de sobras, as especialidades da vovó carregam memórias familiares, mas desaparecem lentamente em meio às mudanças dos tempos',
    'map.markers.taiwanBankingSystem.title':
      'A fusão gastronômica dos novos imigrantes de Taiwan',
    'map.markers.taiwanBankingSystem.desc':
      'Quando o azedo e picante tailandês encontra o doce e salgado de Taiwan, quando o pho vietnamita cruza com os petiscos refogados taiwaneses e quando as especiarias indonésias abraçam ingredientes locais, uma revolução de sabores que atravessa fronteiras acontece silenciosamente em Taiwan. Os novos imigrantes não trazem apenas a culinária de sua terra natal, mas também possibilidades inteiramente novas que enriquecem a cultura gastronômica taiwanesa.',
    'map.markers.taiwanSmes.title': 'Taiwan, o reino das frutas',
    'map.markers.taiwanSmes.desc':
      'Da manga e lichia à pinha e maçã-d’água, uma doce lenda de diversidade de frutas tropicais e avanços na tecnologia agrícola',
    'map.markers.youbikePublicBikeSystem.title':
      'A cultura dos frutos do mar em Taiwan',
    'map.markers.youbikePublicBikeSystem.desc':
      'Produtos frescos vindos diretamente dos portos pesqueiros, a cultura dos restaurantes de frutos do mar e pratos marítimos como omelete de ostras revelam o caráter insular de Taiwan, cercada pelo mar, e sua rica tradição culinária de frutos do mar',
    'map.markers.taiwanFoodBeverageIndustry.title':
      'A gastronomia Michelin e a alta cozinha de Taiwan',
    'map.markers.taiwanFoodBeverageIndustry.desc':
      'Em 2018, a palavra「TAIPEI」apareceu pela primeira vez na capa vermelha do Guia Michelin, marcando a entrada oficial do setor gastronômico de Taiwan no sistema internacional de avaliação. Das barracas de rua aos restaurantes estrelados, da comida popular à alta cozinha, a cultura gastronômica taiwanesa exibe no cenário internacional um charme fascinante que combina tradição e inovação.',
    'map.markers.taiwanAgriculturalReform.title':
      'Cultura dos mercados noturnos',
    'map.markers.taiwanAgriculturalReform.desc':
      '164 mercados noturnos regulamentados e uma média de um mercado para cada 38 mil habitantes em Tainan: dos pátios dos templos às atrações turísticas internacionais',
    'map.markers.taiwanTeaIndustry.title': 'Cultura gastronômica hakka',
    'map.markers.taiwanTeaIndustry.desc':
      'A rica e diversificada cultura gastronômica hakka, do aroma encorpado do chá moído às notas da floresta dos bolinhos de arroz envoltos em folhas de gengibre-selvagem, revela a sabedoria cotidiana dos hakkas para administrar o lar com diligência e economia e aproveitar ingredientes locais',
    'map.markers.taiwanFishingIndustry.title': 'Macarrão com carne bovina',
    'map.markers.taiwanFishingIndustry.desc':
      'Da nostalgia dos imigrantes continentais a prato nacional de Taiwan, a fusão cultural e a fama mundial do macarrão com carne bovina',
    'map.markers.taiwanFruitIndustry.title': 'Cultura do chá',
    'map.markers.taiwanFruitIndustry.desc':
      'A evolução da cultura do chá em Taiwan, da arte tradicional às modernas bebidas preparadas na hora e agitadas à mão, revela as variedades de chá e os hábitos de consumo únicos da ilha',
    'map.markers.taiwanRiceVarieties.title':
      'Em uma ilha que treme, eles construíram uma torre capaz de voar',
    'map.markers.taiwanRiceVarieties.desc':
      'A apenas 200 metros de uma falha ativa, os taiwaneses insistiram em erguer o edifício mais alto do mundo sobre o solo mais instável — e então um louco o escalou com as próprias mãos em 91 minutos.',
    'map.markers.nightMarketCulture.title':
      'As cinco principais formas de relevo e a estrutura geográfica de Taiwan: das montanhas às planícies, as paisagens da ilha',
    'map.markers.nightMarketCulture.desc':
      'Explore a estrutura geográfica singular de Taiwan, da Cordilheira Central às planícies ocidentais, e conheça a diversidade de relevo desta ilha',
    'map.markers.bubbleTeaGlobalPhenomenon.title':
      'Rede de transportes de Taiwan',
    'map.markers.bubbleTeaGlobalPhenomenon.desc':
      'Trem de alta velocidade, metrô, rodovias e aviação tecem uma rede de transportes multidimensional que movimenta Taiwan',
    'map.markers.taiwanBeefNoodle.title':
      'Sistema nacional de áreas cênicas de Taiwan',
    'map.markers.taiwanBeefNoodle.desc':
      'Do Cabo Nordeste a Kenting, as 13 áreas cênicas nacionais de Taiwan revelam uma rica diversidade de paisagens naturais e culturais',
    'map.markers.taiwanHotPotCulture.title':
      'Características geográficas e formação da ilha de Taiwan',
    'map.markers.taiwanHotPotCulture.desc':
      'Explore as características geográficas únicas de Taiwan, dos movimentos tectônicos à estrutura do relevo, e descubra os mistérios naturais da ilha Formosa',
    'map.markers.taiwanFineDining.title':
      'Movimentos tectônicos e atividade sísmica em Taiwan',
    'map.markers.taiwanFineDining.desc':
      'Conheça as características geológicas de Taiwan, situada no encontro das placas Eurasiática e do Mar das Filipinas, e as causas de sua frequente atividade sísmica',
    'map.markers.taiwanStreetFood.title':
      'Reservatórios e gestão dos recursos hídricos de Taiwan',
    'map.markers.taiwanStreetFood.desc':
      'Da crise de escassez de água ao assoreamento dos reservatórios, os desafios dos recursos hídricos de Taiwan e a desigualdade de sua distribuição entre o norte e o sul',
    'map.markers.taiwanVegetarianCulture.title':
      'Sistema fluvial e características hidrológicas de Taiwan: rios curtos e rápidos e variações sazonais',
    'map.markers.taiwanVegetarianCulture.desc':
      'Explore o sistema fluvial único de Taiwan, do rio Choshui ao rio Kaoping, e descubra como o relevo da ilha molda suas características hidrológicas',
    'map.markers.taiwanCoffeeCulture.title':
      'Relevo costeiro e paisagens marinhas de Taiwan',
    'map.markers.taiwanCoffeeCulture.desc':
      'Das costas recortadas por cabos e baías no norte às costas de falha no leste, o rico e variado relevo costeiro de Taiwan revela a extraordinária ação dos movimentos tectônicos',
    'map.markers.taiwanSnackCulture.title': 'Paisagens termais de Taiwan',
    'map.markers.taiwanSnackCulture.desc':
      'Beitou, Chihpen e Chiaohsi: um belo encontro entre a cultura das águas termais e a ciência geológica',
    'map.markers.taiwanSeafoodCulture.title':
      'Ponto crítico de biodiversidade de Taiwan',
    'map.markers.taiwanSeafoodCulture.desc':
      'Uma ilha de 3.6 dezenas de milhares de quilômetros quadrados abriga 5.9 dezenas de milhares de espécies, uma densidade 100 vezes superior à média mundial',
    'map.markers.taiwanPineappleCake.title':
      'Paisagens agrícolas e distribuição produtiva de Taiwan',
    'map.markers.taiwanPineappleCake.desc':
      'As mudanças nas paisagens agrícolas de norte a sul refletem a transformação de Taiwan, de «celeiro de Taiwan» para uma «agricultura sofisticada»',
    'map.markers.taiwanPorkRibSoup.title':
      'Desenvolvimento urbano e desigualdade entre áreas urbanas e rurais em Taiwan',
    'map.markers.taiwanPorkRibSoup.desc':
      'O desenvolvimento desigual entre áreas urbanas e rurais de Taiwan sob a estrutura dos seis municípios especiais e sua transformação espacial de uma Taiwan agrícola para uma Taiwan urbana',
    'map.markers.taiwanOysterOmelette.title': 'Relevo e geologia',
    'map.markers.taiwanOysterOmelette.desc':
      'Uma ilha de 600 milhões de anos guarda memórias de 200 milhões de anos — o milagre do cinturão orogênico mais jovem do mundo e de uma das colisões tectônicas mais intensas',
    'map.markers.taiwanBreakfastCulture.title':
      'Características urbanas e culturas regionais',
    'map.markers.taiwanBreakfastCulture.desc':
      'Da metrópole internacional de Taipé ao charme histórico da antiga capital Tainan, como as cidades de Taiwan constroem identidades locais únicas',
    'map.markers.taiwanConvenienceStoreFood.title':
      'Ilhas periféricas e cultura marítima: da maior densidade mundial de armadilhas de pedra para peixes às leis ecológicas da temporada dos peixes-voadores',
    'map.markers.taiwanConvenienceStoreFood.desc':
      'Há menos de 600 armadilhas de pedra para peixes no mundo, e Penghu abriga 574 delas. Um povo insular especializado na pesca de peixes-voadores transformou tabus no mais sofisticado sistema de gestão de recursos marinhos',
    'map.markers.dutchSpanishColonialPeriod.title':
      'Incidente de 28 de Fevereiro e Terror Branco: trauma e memória sob o regime autoritário de Taiwan',
    'map.markers.dutchSpanishColonialPeriod.desc':
      'Do Incidente de 28 de Fevereiro de 1947 aos 38 anos de lei marcial, Taiwan sofreu a violência estatal do regime autoritário e só após o fim da lei marcial começou a enfrentar seus traumas históricos e promover a justiça de transição.',
    'map.markers.zhengDynastyPeriod.title':
      'Crises no estreito de Taiwan e evolução das relações através do estreito',
    'map.markers.zhengDynastyPeriod.desc':
      'Relembre as três grandes crises no estreito de Taiwan e mais de setenta anos de relações através do estreito para compreender o contexto histórico e os desafios atuais da região',
    'map.markers.qingDynastyTaiwanHistory.title':
      'História do comércio marítimo de Taiwan',
    'map.markers.qingDynastyTaiwanHistory.desc':
      'Taiwan na Era dos Descobrimentos: a lendária ascensão e queda de um centro de comércio internacional que se tornou um reino pirata',
    'map.markers.japaneseColonialRule.title':
      'História das vilas de dependentes militares de Taiwan',
    'map.markers.japaneseColonialRule.desc':
      'Dos soldados isolados na Birmânia aos reinos cercados por bambu, como a grande migração de 120 milhões de pessoas redefiniu o conceito de «lar»',
    'map.markers.februaryTwentyEightIncident.title':
      'História ferroviária de Taiwan',
    'map.markers.februaryTwentyEightIncident.desc':
      'De Liu Ming-chuan na dinastia Ching à linha longitudinal do período japonês e ao trem de alta velocidade, como as ferrovias moldaram o desenvolvimento urbano e a memória cultural de Taiwan',
    'map.markers.martialLawPeriod.title':
      'Transferência do governo nacionalista para Taiwan e reconstrução pós-guerra',
    'map.markers.martialLawPeriod.desc':
      'Uma análise do contexto histórico, do processo e dos impactos da transferência do governo nacionalista para Taiwan em 1949, além da reconstrução política, econômica e social do pós-guerra',
    'map.markers.democratization.title': 'Período do domínio japonês',
    'map.markers.democratization.desc':
      'Entre 1895-1945, o Japão governou Taiwan por 50 anos, promovendo ampla modernização e gestão institucionalizada, mas também aplicando políticas de assimilação que marcaram profundamente o desenvolvimento da sociedade taiwanesa',
    'map.markers.taiwanIndependenceMovement.title': 'Período do domínio Ching',
    'map.markers.taiwanIndependenceMovement.desc':
      'Entre 1683-1895, a dinastia Ching governou Taiwan por cerca de 212 anos, passando de uma administração passiva a investimentos ativos e estabelecendo as bases das divisões administrativas modernas e da sociedade han de Taiwan',
    'map.markers.taiwanChinaRelations.title':
      'Períodos colonial holandês e espanhol e do Reino de Tungning',
    'map.markers.taiwanChinaRelations.desc':
      'O primeiro domínio colonial sistemático da história de Taiwan, da construção do Forte Zeelandia pelos holandeses à abertura da ilha por Cheng Cheng-kung, estabeleceu as bases da migração han e das instituições políticas',
    'map.markers.taiwanUsRelations.title': 'Cultura das lojas de conveniência',
    'map.markers.taiwanUsRelations.desc':
      'Como as lojas de conveniência de Taiwan, com a maior densidade do mundo, deixaram de ser simples pontos de varejo para se tornar o sistema operacional cotidiano de um país inteiro',
    'map.markers.taiwanInternationalStatus.title':
      'Sistema de transportes de Taiwan',
    'map.markers.taiwanInternationalStatus.desc':
      'O trem de alta velocidade cruza o país de norte a sul em 90 minutos, o metrô tece as artérias urbanas e as motocicletas percorrem vielas',
    'map.markers.taiwanHistoricalFigures.title':
      'Cultura das lojas de conveniência de Taiwan',
    'map.markers.taiwanHistoricalFigures.desc':
      'O reino das lojas de conveniência com a maior densidade do mundo: as inovações locais da 7-11 e da FamilyMart redefinem o modo de vida moderno',
    'map.markers.taiwanPoliticalFigures.title':
      'Parques e lazer cotidiano em Taiwan',
    'map.markers.taiwanPoliticalFigures.desc':
      'Do tai chi ao amanhecer aos passeios noturnos——um olhar cultural sobre os parques de Taiwan como espaços de convivência entre gerações',
    'map.markers.kuomintangHistory.title': 'Cultura do café em Taiwan',
    'map.markers.kuomintangHistory.desc':
      'Uma das três maiores densidades mundiais de cafeterias independentes: dos grãos de Alishan ao trabalho remoto em cafés, a cultura insular do café',
    'map.markers.democraticProgressivePartyHistory.title':
      'A ilha que corre atrás do caminhão de lixo: da crise dos resíduos ao milagre da reciclagem em Taiwan',
    'map.markers.democraticProgressivePartyHistory.desc':
      'Um lugar que, nos anos 1990, tinha 400 aterros quase lotados e era chamado de «ilha do lixo» pela imprensa internacional usou a música de Beethoven para fazer 2,300 dezenas de milhares de pessoas correrem diariamente atrás do caminhão de lixo; 30 anos depois, sua taxa de reciclagem supera a da maioria dos países europeus',
    'map.markers.taipeiHistory.title':
      'História do metrô de Taiwan: uma evolução urbana escrita com sangue e dinheiro',
    'map.markers.taipeiHistory.desc':
      'Uma viga de aço de 209 toneladas despencou e tirou 4 vidas, as indenizações chegaram a 16.4 centenas de milhões, e a atividade principal do metrô de Taipé continua deficitária——o verdadeiro preço por trás dos sistemas de metrô de Taiwan',
    'map.markers.taiwanPrehistoricCulture.title':
      'Sistema educacional de Taiwan: um experimento insular do inferno dos vestibulares ao labirinto da diversidade',
    'map.markers.taiwanPrehistoricCulture.desc':
      'Taiwan passou 30 anos tentando acabar com o sistema de vestibular unificado, mas o mais recente exame por disciplinas dobrou as matrículas nos cursinhos para repetentes. Como uma ilha realiza repetidos experimentos sociais entre a pressão pelo ingresso universitário e a igualdade educacional?',
    'map.markers.taiwanIndigenousHistory.title':
      'Cultura das motocicletas em Taiwan',
    'map.markers.taiwanIndigenousHistory.desc':
      'Um reino insular com uma das maiores densidades de motocicletas do mundo e sua evolução cultural, de meio de transporte diário a estilo de vida',
    'map.markers.taiwanMilitaryHistory.title':
      'Cultura das galerias cobertas e paisagem urbana de Taiwan',
    'map.markers.taiwanMilitaryHistory.desc':
      'Corredores cotidianos protegidos do vento e da chuva, onde motocicletas, vendedores ambulantes e calor humano se entrelaçam nas memórias das ruas de Taiwan',
    'map.markers.taiwanWomenHistory.title': 'Vida noturna e cultura de KTV',
    'map.markers.taiwanWomenHistory.desc':
      'Das salas privativas do Cashbox Partyworld aos restaurantes da madrugada, a vida noturna de uma ilha que nunca fecha',
    'map.markers.taiwanEducationHistory.title':
      'Religião e crenças populares: da gestão do medo ao império da fé',
    'map.markers.taiwanEducationHistory.desc':
      'Taiwan tem a maior densidade de templos do mundo e, ao mesmo tempo, lidera o mundo em liberdade religiosa — por trás dessa contradição está a sabedoria de sobrevivência dos colonos militares do século XVII',
    'map.markers.taiwanReligiousHistory.title': 'Cultura das fontes termais',
    'map.markers.taiwanReligiousHistory.desc':
      'Da convalescença militar a uma das três grandes fontes de lama do mundo: a história de como Taiwan se tornou, por acaso, o reino das fontes termais',
    'map.markers.taiwanMediaHistory.title':
      'Tradições musicais dos povos indígenas de Taiwan',
    'map.markers.taiwanMediaHistory.desc':
      'Explore a rica cultura musical dos 16 povos indígenas de Taiwan, dos cantos ancestrais aos instrumentos tradicionais, testemunhando milhares de anos de transmissão cultural',
    'map.markers.badmintonChampions.title':
      'Indústria de instrumentos musicais de Taiwan: dos saxofones de Houli à fábrica musical do mundo',
    'map.markers.badmintonChampions.desc':
      'Explore a trajetória da indústria de instrumentos musicais de Taiwan, da liderança mundial dos saxofones de Houli ao reino da fabricação terceirizada de violões e à precisão artesanal das caixas de música, e descubra como Taiwan passou da produção sob encomenda às marcas próprias',
    'map.markers.baseballCulture.title': 'Movimento da música folk de Taiwan',
    'map.markers.baseballCulture.desc':
      'De “cantar nossas próprias canções” a transformar todo o universo da música em língua chinesa — a revolução cultural dos jovens na década de 1970',
    'map.markers.taiwanBasketball.title':
      'Evolução da cena musical independente de Taiwan',
    'map.markers.taiwanBasketball.desc':
      'Das bandas underground à música independente, explore três décadas de evolução e significado cultural da música alternativa de Taiwan',
    'map.markers.marathonRunning.title':
      'Música eletrônica e cultura de festas em Taiwan: das raves underground ao cenário internacional',
    'map.markers.marathonRunning.desc':
      'Da cultura das raves da década de 1990 ao festival Road to Ultra, veja como a música eletrônica de Taiwan saiu do underground e chegou ao mainstream, revelando DJs de nível internacional e selos eletrônicos independentes',
    'map.markers.taiwanEsports.title':
      'Cultura dos festivais de música de Taiwan: do Spring Scream à efervescência cultural da juventude por toda a ilha',
    'map.markers.taiwanEsports.desc':
      'Explore a evolução dos festivais de música de Taiwan, do Spring Scream e do Hohaiyan Rock Festival ao Megaport Festival, e descubra como se tornaram incubadoras de bandas independentes e plataformas centrais de expressão da cultura jovem',
    'map.markers.taiwanOlympics.title':
      'Cena musical independente contemporânea de Taiwan',
    'map.markers.taiwanOlympics.desc':
      'Dos shows underground à matriz industrial, analise a evolução e a influência cultural do ecossistema moderno da música independente de Taiwan',
    'map.markers.taipeiCycle.title':
      'Sabedoria ecológica e conservação ambiental dos povos indígenas de Taiwan',
    'map.markers.taipeiCycle.desc':
      'Conheça o saber ecológico tradicional acumulado pelos povos indígenas de Taiwan ao longo de milhares de anos, bem como seu valor e suas práticas essenciais na conservação ambiental moderna',
    'map.markers.taiwanBetelNutCulture.title':
      'Montanhas e cultura do montanhismo em Taiwan',
    'map.markers.taiwanBetelNutCulture.desc':
      '268 montanhas com mais de três mil metros e a cultura dos Cem Picos: o desenvolvimento do montanhismo em Taiwan e os desafios da conservação das montanhas',
    'map.markers.taiwanElections.title': 'Ecossistemas florestais de Taiwan',
    'map.markers.taiwanElections.desc':
      'Do litoral subtropical às florestas de coníferas das altas montanhas, o rico universo florestal de Taiwan em um desnível vertical de 3000 metros',
    'map.markers.taiwanLgbtCulture.title':
      'Mudanças climáticas e transição para emissões líquidas zero em Taiwan',
    'map.markers.taiwanLgbtCulture.desc':
      'Taiwan enfrenta os impactos das mudanças climáticas, desde a crescente frequência de eventos extremos até o planejamento de políticas para alcançar emissões líquidas zero de carbono em 2050; conheça as oportunidades e os desafios da transição energética',
    'map.markers.taiwanMotorcycleCulture.title':
      'Conservação marinha em Taiwan: por que um sistema construído ao longo de 30 anos não conseguiu impedir um episódio de branqueamento de corais?',
    'map.markers.taiwanMotorcycleCulture.desc':
      'Em 2020, as águas de Taiwan sofreram o maior branqueamento de corais de sua história. De Hsiao Liuchiu ao Atol de Dongsha, até os corais em áreas protegidas morreram devido às altas temperaturas. Que problemas isso revelou?',
    'map.markers.taipeiMrt.title':
      'Combate à poluição marinha e desafios da conservação em Taiwan',
    'map.markers.taipeiMrt.desc':
      'Diante do lixo marinho, da pesca excessiva e das mudanças climáticas, conheça a situação atual, os desafios e as soluções inovadoras para a conservação marinha em Taiwan',
    'map.markers.kaohsiungMrt.title': 'Ecologia marinha de Taiwan',
    'map.markers.kaohsiungMrt.desc':
      'As águas protegidas pelos tabus do povo Tao agora embranquecem em meio às altas temperaturas e ao ruído subaquático: quando milhares de anos de sabedoria ecológica encontram a crise marinha moderna',
    'map.markers.taichungMrt.title':
      'Ecologia marinha e conservação dos recifes de coral em Taiwan',
    'map.markers.taichungMrt.desc':
      'Cercada pelo mar, Taiwan possui uma rica ecologia marinha; da crise do branqueamento de corais à conservação de cetáceos, conheça a eficácia da proteção nos parques nacionais marinhos e os desafios futuros',
    'map.markers.taiwanTrainSystem.title':
      'Fontes termais e energia geotérmica de Taiwan',
    'map.markers.taiwanTrainSystem.desc':
      'Da usina geotérmica que fracassou há 30 anos à hokutolita, única no mundo: como uma ilha transformou o fogo subterrâneo em bem-estar e energia verde',
    'map.markers.taiwanBusSystem.title':
      'Conservação do gato-leopardo de Taiwan',
    'map.markers.taiwanBusSystem.desc':
      'O gato-fantasma, do qual restam menos de quinhentos em toda Taiwan — quando o último felino nativo se aproxima da extinção',
    'map.markers.taiwanInnovationEcosystem.title': 'Pangolim de Taiwan',
    'map.markers.taiwanInnovationEcosystem.desc':
      'O mamífero mais traficado do mundo encontrou um lar seguro em Taiwan',
    'map.markers.taiwanMedicalSystem.title':
      'Ecossistemas de alta montanha e relíquias glaciais de Taiwan',
    'map.markers.taiwanMedicalSystem.desc':
      'Conheça os ecossistemas singulares das montanhas de Taiwan acima de 3000 metros e a preciosa biodiversidade que vai da Cunninghamia konishii e dos rododendros de Yushan às espécies remanescentes da era glacial',
    'map.markers.taiwanEducationSystem.title': 'Urso-negro-de-Taiwan',
    'map.markers.taiwanEducationSystem.desc':
      'O V branco no peito é sua assinatura — o último soberano das florestas de Taiwan e sua batalha inacabada pela conservação',
    'map.markers.taiwanMusicIndustry.title': 'Parques nacionais',
    'map.markers.taiwanMusicIndustry.desc':
      '9 parques nacionais concentrados em 36,197 quilômetros quadrados, um milagre de conservação com a maior densidade do mundo',
    'map.markers.mandarinPopMusic.title': 'Parques nacionais de Taiwan',
    'map.markers.mandarinPopMusic.desc':
      'Explore os ecossistemas singulares e o valor de conservação dos nove parques nacionais de Taiwan, com paisagens completas que vão do litoral subtropical à linha de neve das altas montanhas',
    'map.markers.taiwaneseIndieMusic.title': 'Espécies endêmicas',
    'map.markers.taiwaneseIndieMusic.desc':
      'A rica biodiversidade endêmica de Taiwan revela os milagres evolutivos da biogeografia insular e a importância da conservação',
    'map.markers.taiwanRapHipHop.title': 'Diversidade ecológica',
    'map.markers.taiwanRapHipHop.desc':
      'Taiwan ocupa apenas 0.025% da área do planeta, mas abriga mais de 50 mil espécies e tem 60.71% de cobertura florestal, a 33ª maior do mundo',
    'map.markers.taiwanElectronicMusic.title': 'Cetáceos de Taiwan',
    'map.markers.taiwanElectronicMusic.desc':
      'Habitat de um terço das espécies de cetáceos do mundo — da antiga caça às baleias à atual observação desses animais, como Taiwan se transformou em um importante centro de pesquisa da ecologia marinha?',
    'map.markers.taiwanTraditionalMusic.title': 'Mayday',
    'map.markers.taiwanTraditionalMusic.desc':
      'Da Escola Secundária Afiliada à Universidade Nacional Normal de Taiwan aos palcos mundiais, os eternos jovens que definiram o espírito do rock em língua chinesa',
    'map.markers.taiwanFilmIndustry.title': 'Wu Bai',
    'map.markers.taiwanFilmIndustry.desc':
      'Tesouro nacional do rock de Taiwan e sinônimo do rock local, consolidou seu lugar no gênero com obras como “Norwegian Forest”',
    'map.markers.newTaiwanCinema.title': 'Wu Pao-chun',
    'map.markers.newTaiwanCinema.desc':
      'Campeão mundial de panificação, surpreendeu o mundo com seu pão de lichia e rosas e saiu do interior de Pingtung para se tornar um dos melhores padeiros do mundo',
    'map.markers.taiwanDocumentary.title': 'Annette Lu',
    'map.markers.taiwanDocumentary.desc':
      'De condenada por sedição a vice-presidente: a vida lendária da primeira mulher a ocupar a vice-presidência no mundo de língua chinesa',
    'map.markers.taiwanAnimationIndustry.title': 'Jimmy Liao',
    'map.markers.taiwanAnimationIndustry.desc':
      'O poeta da ilustração que aqueceu o mundo com seus livros ilustrados e levou a produção taiwanesa ao cenário internacional',
    'map.markers.taiwanTelevisionIndustry.title': 'Tai Tzu-ying',
    'map.markers.taiwanTelevisionIndustry.desc':
      'Detentora do recorde de 214 semanas como número 1 do mundo, a rainha taiwanesa do badminton que saiu de Cianjhen, Kaohsiung, para conquistar a prata olímpica',
    'map.markers.taiwanOttPlatforms.title': 'Li Ang',
    'map.markers.taiwanOttPlatforms.desc':
      'Autora de 《A morte do marido》 e 《O jardim dos enigmas》, pioneira da literatura feminista de Taiwan',
    'map.markers.taiwanPodcastIndustry.title': 'Lee Chih-kai',
    'map.markers.taiwanPodcastIndustry.desc':
      'De Kai do mercado, em 《Salto mortal! Garotos》, à prata olímpica: os dezesseis anos de acrobacias do príncipe taiwanês do cavalo com alças',
    'map.markers.taiwanPublishing.title': 'Lee Yuan-tseh',
    'map.markers.taiwanPublishing.desc':
      'Laureado com o Nobel de Química de 1986, abriu uma nova área na dinâmica química com a técnica de feixes moleculares cruzados e foi o primeiro taiwanês a receber um Nobel científico',
    'map.markers.taiwanBookstoreCulture.title': 'Tu Tsung-ming',
    'map.markers.taiwanBookstoreCulture.desc':
      'Primeiro doutor em medicina de Taiwan e pai da medicina moderna taiwanesa',
    'map.markers.taiwanComicMangaIndustry.title': 'Jeremy Lin',
    'map.markers.taiwanComicMangaIndustry.desc':
      'De aluno brilhante de Harvard a campeão da NBA, o jogador taiwanês-americano que desencadeou a Linsanity no mundo inteiro',
    'map.markers.taiwanGameIndustry.title': 'Kevin Lin',
    'map.markers.taiwanGameIndustry.desc':
      'Da criança franzina rejeitada pela equipe de atletismo ao corredor de ultradistância que fez história atravessando o deserto do Saara a pé',
    'map.markers.nationalPalaceMuseum.title': 'Lin I-hsiung',
    'map.markers.nationalPalaceMuseum.desc':
      'Pioneiro do movimento democrático, vítima do massacre da família Lin e líder do movimento contra a quarta usina nuclear',
    'map.markers.nationalParks.title': 'Edward Yang',
    'map.markers.nationalParks.desc':
      'Figura central do movimento do Novo Cinema Taiwanês, melhor diretor em Cannes e poeta da alienação urbana',
    'map.markers.taiwanGeography.title': 'Pai Hsien-yung',
    'map.markers.taiwanGeography.desc':
      'Autor de 《Gente de Taipé》, mestre da literatura moderna e impulsionador do renascimento da ópera kunqu',
    'map.markers.taiwanClimate.title': 'Crowd Lu',
    'map.markers.taiwanClimate.desc':
      'Cantor-compositor e ator taiwanês, vencedor dos três grandes prêmios de Taiwan — Golden Melody, Golden Bell e Golden Horse —, conhecido por sua imagem simples e acolhedora e por seu estilo vocal singular',
    'map.markers.taiwanEcosystem.title': 'Chuang Chih-yuan',
    'map.markers.taiwanEcosystem.desc':
      'Padrinho do tênis de mesa, representante olímpico em quatro edições e herói solitário que treinou por conta própria',
    'map.markers.taiwanEndangeredSpecies.title': 'Tsai Ming-liang',
    'map.markers.taiwanEndangeredSpecies.desc':
      'Vencedor do Leão de Ouro de Veneza, sino-malaio e mestre da estética do cinema lento',
    'map.markers.taiwanMarineEcology.title': 'Hsu Wen-lung',
    'map.markers.taiwanMarineEcology.desc':
      'Fundador do Grupo Chimei, reuniu as identidades de empresário, violinista e colecionador de arte e criou o Museu Chimei',
    'map.markers.taiwanBirdwatching.title': 'Fang-Yi Sheu',
    'map.markers.taiwanBirdwatching.desc':
      'De garota de Yilan a bailarina principal da Martha Graham Dance Company, antes de voltar a Taiwan para fundar a LAFA Dance Company — com o corpo, ela conta as histórias mais poderosas de Taiwan',
    'map.markers.taiwanHotSprings.title':
      'Lai Ching-te: o médico sanitarista que saiu de uma família de mineiros para chegar ao Palácio Presidencial',
    'map.markers.taiwanHotSprings.desc':
      '16º presidente de Taiwan e primeira figura política na história constitucional da República da China (Taiwan) a concorrer como vice-presidente e ser eleita com sucesso',
    'map.markers.taiwanIslands.title': 'Kuo Hsing-chun',
    'map.markers.taiwanIslands.desc':
      'Deusa taiwanesa do levantamento de peso, medalhista de ouro nos Jogos Olímpicos de Tóquio de 2021 e detentora dos três recordes olímpicos da categoria até 59 kg',
    'map.markers.taiwanMountains.title': 'Teng Yu-hsien',
    'map.markers.taiwanMountains.desc':
      'Pai da música popular taiwanesa, compôs clássicos em taiwanês como «Esperando a Brisa de Primavera» (望春風), «Flor da Noite Chuvosa» (雨夜花) e «Melancolia ao Luar» (月夜愁)',
    'map.markers.taiwanRivers.title': 'Chung Li-ho',
    'map.markers.taiwanRivers.desc':
      'Autor de 《O homem da terra natal》, pai da literatura taiwanesa e guerreiro das letras que continuou escrevendo apesar da pobreza e da doença',
    'map.markers.taiwanCoastline.title': 'Chen Shu-chu',
    'map.markers.taiwanCoastline.desc':
      'Os gestos simples de bondade de uma vendedora de verduras de Taitung que mostrou, ao longo da vida, o verdadeiro significado da riqueza',
    'map.markers.taiwanForests.title': 'Chen Shui-bian',
    'map.markers.taiwanForests.desc':
      '10º e 11º presidente, protagonista da primeira alternância partidária em 2000 e figura importante da democratização de Taiwan',
    'map.markers.taiwanNaturalDisasters.title': 'Ma Ying-jeou',
    'map.markers.taiwanNaturalDisasters.desc':
      '12º e 13º presidente, promotor do degelo nas relações entre Taiwan e a China e signatário do ECFA',
    'map.markers.taiwanEarthquakes.title': 'Huang Chun-ming',
    'map.markers.taiwanEarthquakes.desc':
      'Autor de 《O grande boneco do filho》 e 《Os dias de contemplar o mar》, escritor representativo da literatura regional de Yilan',
    'map.markers.taiwanTyphoons.title':
      'Huang Chen-nan: o “Takenouchi Yutaka dos bibliófilos” e a fonte viva da história e da cultura de Taiwan',
    'map.markers.taiwanTyphoons.desc':
      'Huang Chen-nan é pesquisador da história e da cultura de Taiwan, bibliófilo e escritor. Tornou-se conhecido no PTT pelo apelido Sizumaru e administra a página 「活水來冊房」, onde compartilha a história de Taiwan e a cultura dos livros antigos. Autor de obras como 《A história mais cheia de sacadas da história de Taiwan》, é chamado de “Takenouchi Yutaka dos bibliófilos”. Oriundo de uma família de estudiosos de Lioujiao, Chiayi, divide com o pai a coleta de documentos entre o norte e o sul e se dedica a tornar a rigorosa história de Taiwan interessante e acessível.',
    'map.markers.sunflowerMovement.title':
      'Zoológicos e ética dos animais em exibição',
    'map.markers.sunflowerMovement.desc':
      'Do elefante na jaula de ferro à parede de águas-vivas do Xpark — Taiwan está redefinindo a relação entre as pessoas e os animais expostos',
    'map.markers.taiwanSocialMovements.title':
      'Justiça territorial e territórios tradicionais dos povos indígenas de Taiwan',
    'map.markers.taiwanSocialMovements.desc':
      'Uma análise do contexto histórico dos direitos territoriais dos povos indígenas de Taiwan, da evolução jurídica, das controvérsias sobre a demarcação dos territórios tradicionais e dos resultados do trabalho da Comissão de Justiça Transicional Indígena',
    'map.markers.taiwanMarriageEquality.title':
      'Casamento entre pessoas do mesmo sexo e igualdade de gênero em Taiwan',
    'map.markers.taiwanMarriageEquality.desc':
      'De prisioneiro durante a lei marcial à primeira lei asiática sobre o casamento entre pessoas do mesmo sexo: como os 30 anos de luta de um homem reescreveram a definição do amor na ilha',
    'map.markers.taiwanEnvironmentalJustice.title':
      'Justiça ambiental e conflitos de rejeição local em Taiwan',
    'map.markers.taiwanEnvironmentalJustice.desc':
      'Uma análise da distribuição desigual dos impactos ambientais em Taiwan, dos conflitos de rejeição local envolvendo incineradores, resíduos nucleares e a indústria petroquímica às questões de desigualdade ambiental e justiça social',
    'map.markers.taiwanCommunityRiCulture.title':
      'Comunidades e cultura dos bairros li de Taiwan',
    'map.markers.taiwanCommunityRiCulture.desc':
      'Da prática democrática mais básica à inovação social do desenvolvimento comunitário',
    'map.markers.taiwanLongTermCare.title':
      'Desenvolvimento do sistema de cuidados de longa duração de Taiwan',
    'map.markers.taiwanLongTermCare.desc':
      'Um dos sistemas de cuidados de longa duração mais avançados do mundo, que ao mesmo tempo abriga a maior rede invisível de cuidadores',
    'map.markers.taiwanLaborMovement.title':
      'Proteção ambiental e desenvolvimento sustentável',
    'map.markers.taiwanLaborMovement.desc':
      'Da ilha das chaminés a Taiwan com emissões líquidas zero: o despertar de 40 anos de movimento ambientalista',
    'map.markers.taiwanHousingIssues.title':
      'Habitação social e justiça habitacional',
    'map.markers.taiwanHousingIssues.desc':
      'Como Taiwan busca concretizar a justiça habitacional por meio de políticas de moradia social, garantindo a todos um lugar seguro para viver',
    'map.markers.taiwanHealthcareSystem.title':
      'Desenvolvimento dos parques tecnológicos',
    'map.markers.taiwanHealthcareSystem.desc':
      'De Hsinchu ao sul de Taiwan, uma análise da evolução dos parques científicos taiwaneses e do posicionamento singular dos três principais parques',
    'map.markers.taiwanImmigration.title': 'Indústria de semicondutores',
    'map.markers.taiwanImmigration.desc':
      'Da aposta histórica de Morris Chang à era dos 2 nanômetros: como a TSMC transformou Taiwan no eixo vital da tecnologia mundial',
    'map.markers.taiwanReligiousDiversity.title':
      'Relevo costeiro e paisagens marinhas de Taiwan',
    'map.markers.taiwanReligiousDiversity.desc':
      'O pescoço da Cabeça da Rainha de Yehliu está afinando 0.2 centímetro por ano e um dia acabará se rompendo — esse é precisamente o destino e a beleza do relevo costeiro de Taiwan',
    'map.markers.taiwanBuddhismTaoism.title':
      'Cultura do chá e estética da vida em Taiwan',
    'map.markers.taiwanBuddhismTaoism.desc':
      'Na noite da inauguração da Wistaria Tea House, em 1981, oposicionistas e intelectuais se reuniram para tomar chá; mais que uma casa de chá, o local era uma base secreta do movimento de oposição',
    'map.markers.taiwanFolkReligion.title':
      'Eleições e política partidária em Taiwan',
    'map.markers.taiwanFolkReligion.desc':
      'Dos vereadores locais de 1950 à alternância partidária de 2000, veja como Taiwan escreveu com votos o milagre de sua transição democrática',
    'map.markers.taiwanChristianity.title':
      'Desenvolvimento urbano e desigualdade entre cidade e campo em Taiwan',
    'map.markers.taiwanChristianity.desc':
      'Em 70 anos, uma ilha agrícola tornou-se urbana; luzes e sombras das seis municipalidades especiais, que concentram 7 décimos da população: o contraste cruel entre a próspera Taichung e Yunlin em declínio',
    'map.markers.taiwanIslamJudaism.title':
      'Características urbanas e culturas regionais',
    'map.markers.taiwanIslamJudaism.desc':
      'Dos 404 grupos de dez mil habitantes de Nova Taipé aos 185 grupos de dez mil de Tainan, veja como as seis municipalidades especiais moldaram personalidades urbanas próprias durante a transformação industrial',
    'map.markers.kaohsiungIncident.title': 'Democratização',
    'map.markers.kaohsiungIncident.desc':
      'O confronto entre policiais e cidadãos nas ruas de Kaohsiung em 10 de dezembro de 1979 acabou impulsionando a transição democrática de Taiwan — mas quantas pessoas pagaram com sua juventude e liberdade?',
    'map.markers.wangLeeOlympicGold.title':
      'Wang Chi-lin e Lee Yang (dupla Lin-Yang)',
    'map.markers.wangLeeOlympicGold.desc':
      'De colegas no ensino fundamental a campeões olímpicos: em 34 minutos, a dupla Lin-Yang derrotou a China em dois sets diretos e conquistou a primeira medalha de ouro olímpica da história do badminton de Taiwan',
  },
  hi: {
    // Meta
    'map.meta.title': 'ताइवान मानचित्र',
    'map.meta.description':
      'मानचित्र के दृष्टिकोण से Taiwan.md की विषयवस्तु के संदर्भों को जानें',

    // Hero Section
    'map.hero.kicker': 'Map View',
    'map.hero.title': 'ताइवान का मानचित्र',
    'map.hero.subtitle':
      'मानचित्र के माध्यम से ताइवान की संस्कृति, खान-पान, प्रकृति और ऐतिहासिक स्थलों को जानें।',

    // Controls - Region Filter
    'map.controls.region.title': 'क्षेत्र फ़िल्टर',
    'map.controls.region.all': 'सभी',
    'map.controls.region.north': 'उत्तरी क्षेत्र',
    'map.controls.region.central': 'मध्य क्षेत्र',
    'map.controls.region.south': 'दक्षिणी क्षेत्र',
    'map.controls.region.east': 'पूर्वी क्षेत्र',
    'map.controls.region.islands': 'बाहरी द्वीप',

    // Controls - Category Filter
    'map.controls.category.title': 'श्रेणी फ़िल्टर',
    'map.controls.category.all': 'सभी',
    'map.controls.category.food': '🍜 खान-पान',
    'map.controls.category.history': '📜 इतिहास',
    'map.controls.category.nature': '🌿 प्रकृति',
    'map.controls.category.culture': '🎭 संस्कृति',
    'map.controls.category.technology': '💻 प्रौद्योगिकी',
    'map.controls.category.economy': '📈 अर्थव्यवस्था',
    'map.controls.category.lifestyle': '🏮 जीवनशैली',
    'map.controls.category.art': '🎨 कला',
    'map.controls.category.geography': '🗺️ भूगोल',

    // Route Section
    'map.route.title': '🗺️ क्यूरेटेड मार्ग',
    'map.route.normal-mode': 'सामान्य मोड',

    // Sidebar - Default
    'map.sidebar.default.title': '📍 ताइवान संबंधी लेख खोजें',
    'map.sidebar.default.hint':
      'लेख खोजने के लिए मानचित्र पर किसी काउंटी, शहर या चिह्न पर क्लिक करें',

    // Sidebar - County
    'map.sidebar.county.clear': '✕ चयन हटाएँ',
    'map.sidebar.county.articles-count': ' लेख',
    'map.sidebar.county.no-articles': 'इस क्षेत्र पर अभी कोई लेख नहीं है',

    // Sidebar - Article
    'map.sidebar.article.back': '← वापस',
    'map.sidebar.article.read-more': 'पूरा लेख पढ़ें →',

    // Zoom Controls
    'map.zoom.in': '＋',
    'map.zoom.out': '－',
    'map.zoom.reset': '⌂',

    // Tooltips
    'map.tooltip.county.articles': ' संबंधित लेख',
    'map.tooltip.county.click': 'इस क्षेत्र को फ़िल्टर करने के लिए क्लिक करें',
    'map.tooltip.marker.reading-time': ' मिनट का पठन',

    // Panel (for compatibility)
    'map.panel.title': 'ताइवान ज्ञान मानचित्र',
    'map.panel.stat.points': 'ज्ञान बिंदु',
    'map.panel.stat.categories': 'श्रेणियाँ',
    'map.panel.category-distribution': 'श्रेणी वितरण',
    'map.panel.link.graph': '🕸️ ज्ञान ग्राफ़',
    'map.panel.link.home': '🏠 श्रेणी अवलोकन',

    // Category Names (for JS usage)
    'map.category.history': '📜 इतिहास',
    'map.category.geography': '🗺️ भूगोल',
    'map.category.culture': '🎭 संस्कृति',
    'map.category.food': '🍜 खान-पान',
    'map.category.art': '🎨 कला',
    'map.category.music': '🎵 संगीत',
    'map.category.technology': '💻 प्रौद्योगिकी',
    'map.category.nature': '🌿 प्रकृति',
    'map.category.people': '👥 व्यक्तित्व',
    'map.category.society': '⚖️ समाज',
    'map.category.economy': '📈 अर्थव्यवस्था',
    'map.category.lifestyle': '🏮 जीवनशैली',

    // Additional UI text
    'map.sidebar.more-articles': '⋯और अन्य',
    'map.sidebar.more-articles-suffix': ' लेख',

    // Routes
    'map.routes.nightMarkets.name': '🍜 रात्रि बाज़ार यात्रा',
    'map.routes.nightMarkets.description':
      'उत्तर से दक्षिण तक ताइवान की सर्वाधिक प्रतिनिधि रात्रि बाज़ार संस्कृति',
    'map.routes.nationalParks.name': '🏔️ राष्ट्रीय उद्यान यात्रा',
    'map.routes.nationalParks.description':
      '3,952 मीटर ऊँचे पर्वतों से उष्णकटिबंधीय प्रवाल भित्तियों तक, ताइवान के प्राकृतिक चमत्कार',
    'map.routes.historyTrail.name': '📜 इतिहास के पदचिह्न',
    'map.routes.historyTrail.description':
      'डच उपनिवेश से लोकतंत्रीकरण तक, ताइवान के चार सौ वर्षों की यात्रा',
    'map.routes.oldStreets.name': '🏮 पुरानी गलियों की सैर',
    'map.routes.oldStreets.description':
      'सदियों पुरानी गलियों में ताइवान की स्मृतियाँ, जहाँ वास्तुकला ही इतिहास है',

    'map.routes.counties22.name': '📍 22 काउंटियों और शहरों पर गहन लेख',
    'map.routes.counties22.description':
      'Taiwan.md पर 22 काउंटियों और शहरों के गहन लेख पढ़ें, कीलुंग pilot से न्यू ताइपे finale तक — हर काउंटी और शहर का एक केंद्रीय अंतर्विरोध।',
    'map.counties22.panel.title': '📍 22 काउंटियों और शहरों पर गहन लेख',
    'map.counties22.panel.hint':
      'खोलने के लिए काउंटी या शहर के कार्ड पर अथवा मानचित्र में उस काउंटी या शहर पर क्लिक करें',
    'map.counties22.tooltip.openDeep': 'गहन लेख खोलने के लिए क्लिक करें',
    'map.counties22.deepCard.badge': '📖 22 काउंटी और शहर श्रृंखला · गहन लेख',
    'map.counties22.deepCard.cta': 'पूरा लेख पढ़ें →',

    // Night Markets Stops
    'map.stops.shilinNightMarket.name': 'शिलिन रात्रि बाज़ार',
    'map.stops.shilinNightMarket.note':
      'पूरे ताइवान का सबसे बड़ा पर्यटक रात्रि बाज़ार और बड़े पैनकेक में छोटा पैनकेक लपेटने वाले व्यंजन का जन्मस्थान',
    'map.stops.raoheNightMarket.name': 'राओहे रात्रि बाज़ार',
    'map.stops.raoheNightMarket.note':
      'काली मिर्च वाले बन के लिए कतारों का प्रसिद्ध स्थल और ताइपे निवासियों का स्थानीय पसंदीदा बाज़ार',
    'map.stops.ningxiaNightMarket.name': 'निंगशिया रात्रि बाज़ार',
    'map.stops.ningxiaNightMarket.note':
      'खान-पान की सर्वाधिक सघन विविधता वाली मिशलिन-अनुशंसित जनसाधारण की फूड स्ट्रीट',
    'map.stops.fengjiaNightMarket.name': 'फेंगजिया रात्रि बाज़ार',
    'map.stops.fengjiaNightMarket.note':
      'रचनात्मक स्नैक्स की प्रयोगशाला और ताइवान के रात्रि बाज़ार नवाचार का अग्रिम मोर्चा',
    'map.stops.huayuanNightMarket.name': 'हुआयुआन रात्रि बाज़ार',
    'map.stops.huayuanNightMarket.note':
      'ताइनान का सबसे बड़ा रात्रि बाज़ार, जो सप्ताह में केवल तीन दिन लगने वाला विशेष उत्सव है',
    'map.stops.liuheNightMarket.name': 'लिउहे रात्रि बाज़ार',
    'map.stops.liuheNightMarket.note':
      'काऊशुंग का प्रतिष्ठित रात्रि बाज़ार, जहाँ समुद्री भोजन मुख्य आकर्षण है',

    // National Parks Stops
    'map.stops.yangmingshanNationalPark.name': 'यांगमिंगशान राष्ट्रीय उद्यान',
    'map.stops.yangmingshanNationalPark.note':
      'ताइपे का पिछला बगीचा, ज्वालामुखीय भूभाग और छिपे हुए गर्म पानी के झरने',
    'map.stops.tarokoNationalPark.name': 'तारोको राष्ट्रीय उद्यान',
    'map.stops.tarokoNationalPark.note':
      'संगमरमर की घाटी और विश्वस्तरीय भूवैज्ञानिक अजूबा',
    'map.stops.yushanNationalPark.name': 'यूशान राष्ट्रीय उद्यान',
    'map.stops.yushanNationalPark.note':
      'पूर्वोत्तर एशिया की सबसे ऊँची चोटी（3,952m）और ताइवान की छत',
    'map.stops.alishanScenicArea.name': 'अलीशान राष्ट्रीय मनोरम क्षेत्र',
    'map.stops.alishanScenicArea.note':
      'सूर्योदय, बादलों का सागर, पवित्र वृक्षों के समूह और वन रेलवे',
    'map.stops.sunMoonLakeScenicArea.name':
      'सन मून लेक राष्ट्रीय मनोरम क्षेत्र',
    'map.stops.sunMoonLakeScenicArea.note':
      'ताइवान की सबसे बड़ी प्राकृतिक झील और थाओ लोगों की पवित्र झील',
    'map.stops.kentingNationalPark.name': 'केंटिंग राष्ट्रीय उद्यान',
    'map.stops.kentingNationalPark.note':
      'ताइवान का सबसे दक्षिणी छोर, उष्णकटिबंधीय प्रवाल भित्तियाँ और हेंगचुन प्रायद्वीप',

    // History Trail Stops
    'map.stops.anpingFort.name': 'आनपिंग पुराना किला',
    'map.stops.anpingFort.note':
      '1624 में डच लोगों द्वारा निर्मित, ताइवान का सबसे पुराना किला',
    'map.stops.chikanTower.name': 'चिहकान टावर',
    'map.stops.chikanTower.note':
      'डच फोर्ट प्रोविंटिया से कोक्सिंगा के शासन के प्रतीक तक',
    'map.stops.lukang.name': 'लुकांग',
    'map.stops.lukang.note':
      'छिंग राजवंश के समय ताइवान का दूसरा सबसे बड़ा नगर, “पहला ताइनान, दूसरा लुकांग, तीसरा बांगका”',
    'map.stops.presidentialOffice.name':
      'राष्ट्रपति कार्यालय (पूर्व ताइवान गवर्नर-जनरल कार्यालय)',
    'map.stops.presidentialOffice.note':
      '1919 में निर्मित, जापानी शासनकाल में सत्ता का सर्वोच्च केंद्र',
    'map.stops.chiangKaiShekMemorialHall.name': 'च्यांग काई-शेक स्मारक भवन',
    'map.stops.chiangKaiShekMemorialHall.note':
      'अधिनायकवाद के प्रतीक और संक्रमणकालीन न्याय पर बहस का केंद्र',
    'map.stops.legislativeYuan.name': 'विधायी युआन (सूरजमुखी आंदोलन)',
    'map.stops.legislativeYuan.note':
      '2014 के सूरजमुखी छात्र आंदोलन का प्रमुख स्थल, ताइवान के लोकतंत्र का एक मील का पत्थर',

    // Old Streets Stops
    'map.stops.dihuaStreet.name': 'दिहुआ स्ट्रीट',
    'map.stops.dihuaStreet.note':
      'दादाओचेंग का हृदय, उत्तर-दक्षिण के सामान और नववर्ष की खरीदारी का प्रमुख बाज़ार',
    'map.stops.jiufenOldStreet.name': 'जिउफेन ओल्ड स्ट्रीट',
    'map.stops.jiufenOldStreet.note':
      'खनन उद्योग के स्वर्णिम वर्षों और स्पिरिटेड अवे की प्रेरणा का स्रोत',
    'map.stops.lukangOldStreet.name': 'लुकांग ओल्ड स्ट्रीट',
    'map.stops.lukangOldStreet.note':
      'लाल ईंटों के पुराने मकानों और पारंपरिक शिल्प का जीवंत संग्रहालय',
    'map.stops.anpingOldStreet.name': 'आनपिंग ओल्ड स्ट्रीट',
    'map.stops.anpingOldStreet.note':
      'ताइवान की पहली सड़क, चार सौ वर्षों के इतिहास की परतें',
    'map.stops.qishanOldStreet.name': 'छीशान ओल्ड स्ट्रीट',
    'map.stops.qishanOldStreet.note':
      'केला साम्राज्य की बारोक वास्तुकला का समूह',
    'map.stops.tamsuiOldStreet.name': 'तामसुई ओल्ड स्ट्रीट',
    'map.stops.tamsuiOldStreet.note':
      'सूर्यास्त, आ-गेई और तामसुई नदी के मुहाने का ऐतिहासिक आकर्षण',

    // Cities
    'map.city.taipei': 'ताइपे',
    'map.city.newTaipei': 'न्यू ताइपे',
    'map.city.keelung': 'कीलुंग',
    'map.city.taoyuan': 'ताओयुआन',
    'map.city.hsinchu': 'शिन्चू',
    'map.city.miaoli': 'मियाओली',
    'map.city.taichung': 'ताइचुंग',
    'map.city.changhua': 'चांगहुआ',
    'map.city.nantou': 'नानतोउ',
    'map.city.chiayi': 'चियाई',
    'map.city.tainan': 'ताइनान',
    'map.city.kaohsiung': 'काओशिउंग',
    'map.city.pingtung': 'पिंगतुंग',
    'map.city.yilan': 'यीलान',
    'map.city.hualien': 'हुआलिएन',
    'map.city.taitung': 'ताइतुंग',
    'map.city.penghu': 'पेंघू',
    'map.city.kinmen': 'किनमेन',

    // Markers
    'map.markers.founderCheYuWu.title': 'संस्थापक — वू चे-यू Che-Yu Wu',
    'map.markers.founderCheYuWu.desc':
      'कोड से काव्यात्मकता तक: ताइवान के एक कलाकार की अंतरराष्ट्रीय सफलता की यात्रा',
    'map.markers.taiwanIndigenousContemporaryArt.title':
      'ताइवान की आदिवासी समकालीन कला',
    'map.markers.taiwanIndigenousContemporaryArt.desc':
      'पारंपरिक शिल्प से समकालीन सृजन तक, जानें कि ताइवान के आदिवासी कलाकार वैश्विक कला मंच पर अपनी आवाज़ कैसे बुलंद कर रहे हैं और आदिवासी पहचान एवं समकालीन कला के बीच संवाद को कैसे पुनर्परिभाषित कर रहे हैं',
    'map.markers.taiwanExperimentalNewMediaArt.title':
      'ताइवान की प्रयोगात्मक और न्यू मीडिया कला',
    'map.markers.taiwanExperimentalNewMediaArt.desc':
      'वीडियो कला से VR संवादात्मक अनुभवों तक, ताइवान की न्यू मीडिया कला के अभिनव विकास और कला-प्रौद्योगिकी पारिस्थितिकी को जानें',
    'map.markers.taiwanArchitecture.title': 'ताइवान की वास्तुकला',
    'map.markers.taiwanArchitecture.desc':
      'पत्थर की पट्टियों वाले घरों से गगनचुंबी इमारतों तक: एक द्वीप की वास्तुशिल्पीय समय-यात्रा',
    'map.markers.taiwanNewMediaArt.title': 'ताइवान की न्यू मीडिया कला',
    'map.markers.taiwanNewMediaArt.desc':
      'ताइवान की संस्कृति और कहानियों को जानें',
    'map.markers.taiwanWatercolorCenturyEvolution.title':
      'ताइवान की जलरंग चित्रकला का शताब्दी विकास',
    'map.markers.taiwanWatercolorCenturyEvolution.desc':
      'जापानी शासनकाल में इशिकावा किनइचिरो की प्रेरणा से लेकर समकालीन चिएन चुंग-वेई की अंतरराष्ट्रीय ख्याति तक, ताइवान की जलरंग चित्रकला ने सौ वर्षों की यात्रा तय की है और एशिया के सबसे सक्रिय जलरंग सृजन केंद्रों में स्थान बनाया है।',
    'map.markers.taiwanModernPoetry.title': 'ताइवान की आधुनिक कविता',
    'map.markers.taiwanModernPoetry.desc':
      'तीन अध्ययन-कक्षों से निकले आधुनिकतावादी प्रयोग ने अनायास ही सबसे अधिक स्थानीयता से जुड़ी काव्य क्रांति को कैसे जन्म दिया',
    'map.markers.taiwanContemporarySculpture.title':
      'ताइवान की समकालीन मूर्तिकला का विकास',
    'map.markers.taiwanContemporarySculpture.desc':
      'यांग यिंग-फेंग और जू मिंग से नई पीढ़ी तक, ताइवान की मूर्तिकला के विकासक्रम और सृजनात्मक भावना को जानें',
    'map.markers.taiwanCuratorsArtCulture.title':
      'ताइवान के क्यूरेटर और कला-संस्कृति का निर्माण',
    'map.markers.taiwanCuratorsArtCulture.desc':
      'स्वतंत्र क्यूरेशन से कला संग्रहालय व्यवस्था तक, जानें कि ताइवान के क्यूरेटर समकालीन कला का सांस्कृतिक विमर्श और अंतरराष्ट्रीय संवाद कैसे गढ़ते हैं',
    'map.markers.newMediaArt.title': 'न्यू मीडिया कला',
    'map.markers.newMediaArt.desc':
      'ताइवान की डिजिटल कला की अग्रणी खोज, प्रयोगशाला से अंतरराष्ट्रीय मंच तक प्रौद्योगिकी और मानविकी का संगम',
    'map.markers.contemporaryTaiwanLiterature.title': 'समकालीन ताइवानी साहित्य',
    'map.markers.contemporaryTaiwanLiterature.desc':
      'ताइवान की संस्कृति और कहानियों को जानें',
    'map.markers.taiwanContemporaryArt.title': 'ताइवान की समकालीन कला',
    'map.markers.taiwanContemporaryArt.desc':
      'ताइपे फाइन आर्ट्स म्यूज़ियम से वेनिस बिएनाले के ताइवान पवेलियन तक, वैश्विक मंच पर ताइवान की समकालीन कला का विशिष्ट स्थान',
    'map.markers.kinmenGuesthouseMuseum.title':
      'जिनमा गेस्टहाउस समकालीन कला संग्रहालय',
    'map.markers.kinmenGuesthouseMuseum.desc':
      'बिछोह और पुनर्मिलन का साक्षी रहा शीतयुद्धकालीन सैन्य पड़ाव, जिसे बीस वर्षों की निद्रा के बाद एक पिता-पुत्री ने जगाया और जो 《Lonely Planet》 द्वारा अनुशंसित काओशिउंग का शीर्ष कला संग्रहालय बना।',
    'map.markers.renjianMagazine.title': 'रेनजियान पत्रिका',
    'map.markers.renjianMagazine.desc':
      '47 अंक, चार वर्ष और फोटोग्राफी एवं शब्दों से छेड़ी गई एक शांत क्रांति——ताइवान के रिपोर्ताज साहित्य का आरंभ-बिंदु',
    'map.markers.taiwanIndigenousCulture.title': 'ताइवान की आदिवासी संस्कृति',
    'map.markers.taiwanIndigenousCulture.desc':
      '16 समुदायों की विविध परंपराओं से समकालीन कला के पुनरुत्थान तक, ताइवान की आदिवासी संस्कृति की गहरी विरासत और आधुनिक रूपांतरण को जानें',
    'map.markers.taiwan16IndigenousTribes.title':
      'ताइवान के 16 आदिवासी समुदायों का सांस्कृतिक मानचित्र',
    'map.markers.taiwan16IndigenousTribes.desc':
      'ताइवान के 16 आदिवासी समुदायों के वितरण क्षेत्रों, भाषा प्रणालियों, प्रमुख अनुष्ठानों और समकालीन रचनात्मक विकास को जानें तथा ताइवान के आदिवासी समुदायों की बहुसांस्कृतिक छवि को समझें',
    'map.markers.taiwanNightMarketCulture.title':
      'ताइवान की नाइट मार्केट संस्कृति और अल्पाहारों का आकर्षण',
    'map.markers.taiwanNightMarketCulture.desc':
      'ताइवान की नाइट मार्केट संस्कृति के उद्भव की पृष्ठभूमि, उसके अनूठे आकर्षण तथा प्रतिनिधि अल्पाहारों की ऐतिहासिक कहानियों और सांस्कृतिक अर्थों को गहराई से जानें',
    'map.markers.taiwanSensibilityKoreanPerspective.title':
      'ताइवान संवेदना: कोरियाई नज़र से ताइवानी सौंदर्यबोध',
    'map.markers.taiwanSensibilityKoreanPerspective.desc':
      'K-pop MV से सियोल पुस्तक मेले तक, जानें कि “대만감성” ने ताइवान के रोज़मर्रा के सड़क-दृश्यों को एशिया का सबसे मनमोहक सौंदर्य प्रतीक कैसे बनाया',
    'map.markers.taiwanCulturalCreativeParks.title':
      'ताइवान के सांस्कृतिक एवं रचनात्मक पार्कों का विकास',
    'map.markers.taiwanCulturalCreativeParks.desc':
      'पुरानी इमारतों के पुनर्जीवन से रचनात्मक समूहों तक, ताइवान के सांस्कृतिक एवं रचनात्मक पार्कों की विकास-यात्रा और नवाचार मॉडल',
    'map.markers.taiwanOldStreetCulture.title':
      'ताइवान की पुरानी सड़कों की संस्कृति और वाणिज्यिक क्षेत्र',
    'map.markers.taiwanOldStreetCulture.desc':
      'छिंग राजवंशकालीन बंदरगाहों की समृद्धि से जापानी शासनकालीन बारोक शैली की इमारतों तक, ताइवान की पुरानी सड़कें ईंटों और खपरैलों में लिखा आम लोगों का इतिहास हैं',
    'map.markers.taiwanTeaCeremonyLifeAesthetics.title':
      'ताइवान की चाय परंपरा और जीवन-सौंदर्य',
    'map.markers.taiwanTeaCeremonyLifeAesthetics.desc':
      'गोंगफू चाय से लेकर चाय-सज्जा के सौंदर्यशास्त्र तक, जानें कि ताइवान ने पूर्वी चाय संस्कृति और स्थानीय जीवन-सौंदर्य को मिलाकर कैसे नवाचार किया',
    'map.markers.taiwanStreetArtGraffiti.title':
      'ताइवान की स्ट्रीट आर्ट और ग्रैफिटी संस्कृति',
    'map.markers.taiwanStreetArtGraffiti.desc':
      'भूमिगत ग्रैफिटी से लेकर वैध भित्तिचित्रों तक, शहरों की दीवारें ताइवान के कलाकारों का रचनात्मक मंच कैसे बनीं',
    'map.markers.taiwanIncenseMakingCulture.title':
      'ताइवान की अगरबत्ती-निर्माण संस्कृति और अगरबत्ती की डंडियों का मूल क्षेत्र',
    'map.markers.taiwanIncenseMakingCulture.desc':
      'चियाई के युनशियाओ समुदाय में अगरबत्ती की डंडियां बनाने की सदियों पुरानी कला से लेकर पूरे ताइवान में फैले अगरबत्ती उद्योग तक——आस्था, कारीगरी और दृढ़ता से जुड़ा एक प्राचीन व्यवसाय',
    'map.markers.taiwanHomophoneTaboos.title':
      'ताइवान में समोच्चारित शब्दों से जुड़ी वर्जनाएं：क्यों「चार」के कारण पूरा समाज एक मंजिल छोड़ देता है？',
    'map.markers.taiwanHomophoneTaboos.desc':
      'अस्पतालों में चौथी मंजिल न होने से लेकर 8888 नंबर प्लेट की आसमान छूती नीलामी कीमत तक, समोच्चारित शब्दों के प्रति ताइवान के लोगों की संवेदनशीलता दुनिया में शायद सबसे अधिक है',
    'map.markers.hakkaCultureLanguage.title': 'हक्का संस्कृति और भाषा',
    'map.markers.hakkaCultureLanguage.desc':
      'दृढ़ता की भावना और थ्यान-छ्वान दिवस：ताइवान के हक्का समुदाय की सांस्कृतिक विरासत और आधुनिक पुनरुत्थान',
    'map.markers.ethnicGroupsTaiwan.title':
      'जातीय समुदाय（होक्लो हक्का मूलनिवासी युद्धोत्तर चीनी प्रवासी नए निवासी）',
    'map.markers.ethnicGroupsTaiwan.desc':
      'ताइवान की जातीय विविधता केवल ऐतिहासिक विकास का परिणाम नहीं, बल्कि समकालीन ताइवानी समाज को समझने की कुंजी भी है। विविध समुदायों के सह-अस्तित्व वाली यह सामाजिक संरचना ताइवानी संस्कृति की रचनात्मकता का स्रोत होने के साथ लोकतांत्रिक राजनीति के विकास की महत्वपूर्ण नींव भी है। प्रत्येक समुदाय की सांस्कृतिक विशेषताओं का सम्मान करते हुए साझा ताइवानी पहचान का निर्माण कैसे किया जाए, यह ताइवानी समाज के सामने लगातार बना हुआ एक महत्वपूर्ण प्रश्न है।',
    'map.markers.chinaSteel.title':
      'चाइना स्टील：लौह-पुरुष मंत्री और दस प्रमुख निर्माण परियोजनाओं की इस्पाती गाथा',
    'map.markers.chinaSteel.desc':
      'चाओ याओ-तुंग द्वारा यूरोप और अमेरिका से बातचीत में चतुराई से तकनीक हासिल करने से लेकर काऊशुंग के शियाओकांग में उठे सफेद धुएं के पहले गुबार तक, चाइना स्टील ने 50 वर्षों में ताइवान के भारी उद्योग की रीढ़ तैयार की और दस प्रमुख निर्माण परियोजनाओं का सबसे सफल रत्न बना',
    'map.markers.taiwanCement.title':
      'ताइवान सीमेंट：ताइवान की पहली सूचीबद्ध कंपनी के हरित रूपांतरण की गाथा',
    'map.markers.taiwanCement.desc':
      '1962 में ताइवान स्टॉक एक्सचेंज इसी के लिए अस्तित्व में आया और स्टॉक कोड 1101 ताइवानी शेयर बाजार की उत्पत्ति का प्रतीक बना। कू परिवार की तीन पीढ़ियों के 76 वर्षों के संचालन में ताइवान सीमेंट ने अपनी सीमेंट भट्ठियों से ताइवान के निर्माण चमत्कार को देखा और अब कार्बन-तटस्थता के युग का सामना करने के लिए हरित उद्यम में बदल रहा है',
    'map.markers.tsmc.title': 'ताइवानी कंपनी：TSMC',
    'map.markers.tsmc.desc':
      'दुनिया की अग्रणी चिप फाउंड्री कंपनी, जिसके हाथों में मानवता की डिजिटल सभ्यता की महत्वपूर्ण जीवनरेखा है',
    'map.markers.chimeiCorporation.title':
      'ची मेई कॉरपोरेशन：श्यू वेन-लोंग का ऐक्रिलिक साम्राज्य और संग्रहालय का सपना',
    'map.markers.chimeiCorporation.desc':
      '1960 में ताइनान के रेनदे स्थित एक छोटे कारखाने से शुरुआत कर श्यू वेन-लोंग ने अपना पूरा जीवन एशिया का सबसे बड़ा ABS सामग्री साम्राज्य बनाने में लगाया और समाज को लौटाने के लिए ची मेई संग्रहालय भी स्थापित किया। उन्होंने सिद्ध किया कि ताइवानी कंपनियां व्यावसायिक सफलता और मानवीय सरोकार दोनों को साथ लेकर चल सकती हैं',
    'map.markers.acer.title': 'Acer समूह - PC उद्योग में बदलाव का अग्रदूत',
    'map.markers.acer.desc':
      'ताइवान के ताओयुआन से उभरे पर्सनल कंप्यूटर अग्रदूत ने「कई ब्रांड、कई बिक्री माध्यम」का व्यावसायिक मॉडल बनाकर वैश्विक PC उद्योग में बदलाव का इंजन बनने तक का सफर तय किया',
    'map.markers.giantBicycles.title': 'ताइवानी कंपनी：जायंट मैन्युफैक्चरिंग',
    'map.markers.giantBicycles.desc':
      'एक बड़ी अमेरिकी कंपनी द्वारा छोड़े गए ठेका-निर्माण मजदूर से लेकर वैश्विक साइकिल तकनीकी मानक तय करने वाले अदृश्य साम्राज्य तक',
    'map.markers.quantaComputer.title': 'ताइवानी कंपनी：क्वांटा कंप्यूटर',
    'map.markers.quantaComputer.desc':
      'कारखाने में आग लगने से लेकर दुनिया का लैपटॉप बादशाह बनने तक, बैरी लैम ने AI युग का नया साम्राज्य कैसे बनाया？',
    'map.markers.aseGroup.title': 'ताइवानी कंपनी：ASE सेमीकंडक्टर',
    'map.markers.aseGroup.desc':
      'दुनिया की सबसे बड़ी सेमीकंडक्टर असेंबली और परीक्षण कंपनी, एक निर्माण कंपनी के मालिक ने सेमीकंडक्टर उद्योग का रुख क्यों किया？',
    'map.markers.esunFinancialHolding.title':
      'ताइवानी कंपनी：E.SUN फाइनेंशियल होल्डिंग',
    'map.markers.esunFinancialHolding.desc':
      'क्रेडिट कार्ड विशेषज्ञ बैंक से डिजिटल वित्त के अग्रदूत तक, 43 वर्ष की आयु में सबसे युवा फाइनेंशियल होल्डिंग महाप्रबंधक बनने की उपलब्धि की कहानी',
    'map.markers.changChunPetrochemical.title':
      'ताइवानी कंपनी：चांग चुन पेट्रोकेमिकल',
    'map.markers.changChunPetrochemical.desc':
      '1949 में ताइनान के छोटे कारखाने से वैश्विक रासायनिक दिग्गज तक,「न सूचीबद्ध होना न कर्ज लेना」की नीति वाले अदृश्य विजेता की कहानी',
    'map.markers.formosaPlasticsGroup.title': 'ताइवानी कंपनी：एवरग्रीन मरीन',
    'map.markers.formosaPlasticsGroup.desc':
      'एक पुराने जहाज से वैश्विक समुद्री परिवहन साम्राज्य तक, चांग युंग-फा की महासागरीय गाथा',
    'map.markers.taipeiFubon.title':
      'रात्रि बाजार का अर्थशास्त्र：बिना ब्रांड का एक व्यावसायिक चमत्कार',
    'map.markers.taipeiFubon.desc':
      'जानें कि ताइवान के रात्रि बाजारों ने ब्रांड、साज-सज्जा और स्थायी स्थान के बिना करीब 4000 अरब की वार्षिक उत्पादन-वैल्यू वाला आर्थिक चमत्कार कैसे रचा',
    'map.markers.taiwan7Eleven.title': 'ताइवान का कॉफी उद्योग',
    'map.markers.taiwan7Eleven.desc':
      'जापानी शासनकाल में खेती की शुरुआत से लेकर Simple Kaffa की विश्व चैंपियनशिप तक, ताइवानी कॉफी के सौ वर्षों के विकास का इतिहास',
    'map.markers.taiwanHighSpeedRail.title':
      'ताइवान के स्थानीय व्यंजनों का मानचित्र',
    'map.markers.taiwanHighSpeedRail.desc':
      'कीलुंग के मियाओकोउ के तिंगपियनहू से लेकर पिंगतुंग के वानलुआन के पोर्क नकल तक, शिनचू के मीटबॉल से लेकर ताइतुंग के शरीफे तक, हर शहर का अपना स्वाद-DNA है। स्थानीय लोगों के कदमों पर चलते हुए ताइवान की 22 काउंटियों और शहरों के सबसे प्रतिनिधि स्थानीय व्यंजनों को खोजें और इस द्वीप की सबसे प्रामाणिक जन-संस्कृति का स्वाद चखें।',
    'map.markers.taiwanSemiconductorIndustry.title':
      'ताइवान के पारंपरिक भोज-व्यंजन：लुप्त होती स्वाद-स्मृतियां',
    'map.markers.taiwanSemiconductorIndustry.desc':
      'चियाई के पुदीना चिकन से लेकर बची हुई सामग्री के सूप तक, दादी के खास व्यंजनों में परिवार की यादें बसी हैं, लेकिन बदलते समय के साथ वे धीरे-धीरे लुप्त हो रहे हैं',
    'map.markers.taiwanBankingSystem.title':
      'ताइवान के नए निवासियों का पाक-संलयन',
    'map.markers.taiwanBankingSystem.desc':
      'जब थाई खट्टा-तीखा स्वाद ताइवानी मीठे-नमकीन स्वाद से मिलता है、जब वियतनामी फो की भेंट ताइवानी ब्रेज़्ड व्यंजनों से होती है、जब इंडोनेशियाई मसाले स्थानीय सामग्रियों को अपनाते हैं, तब ताइवान में सीमाओं से परे स्वाद की एक क्रांति चुपचाप जन्म ले रही है। नए निवासी केवल अपनी मातृभूमि के व्यंजन ही नहीं लाए हैं, बल्कि ताइवान की खाद्य संस्कृति को समृद्ध करने वाली बिल्कुल नई संभावनाएं भी लेकर आए हैं।',
    'map.markers.taiwanSmes.title': 'ताइवान का फल साम्राज्य',
    'map.markers.taiwanSmes.desc':
      'आम और लीची से लेकर शरीफा और वैक्स एप्पल तक, उष्णकटिबंधीय फलों की विविधता और कृषि-तकनीकी सफलताओं की मधुर गाथा',
    'map.markers.youbikePublicBikeSystem.title':
      'ताइवान की समुद्री भोजन संस्कृति',
    'map.markers.youbikePublicBikeSystem.desc':
      'मत्स्य बंदरगाहों से सीधे पहुंचने वाली ताजा उपज、समुद्री भोजन रेस्तरां की संस्कृति、ऑयस्टर ऑमलेट जैसे समुद्री स्वाद वाले व्यंजन, चारों ओर समुद्र से घिरे ताइवान की द्वीपीय विशेषता और समृद्ध समुद्री भोजन परंपरा को दर्शाते हैं',
    'map.markers.taiwanFoodBeverageIndustry.title':
      'ताइवान के मिशेलिन और उत्कृष्ट भोजनालय',
    'map.markers.taiwanFoodBeverageIndustry.desc':
      '2018 में मिशेलिन गाइड के लाल आवरण पर पहली बार「TAIPEI」छपा, जिसने ताइवान के भोजन उद्योग के औपचारिक रूप से अंतरराष्ट्रीय मूल्यांकन प्रणाली में प्रवेश को चिह्नित किया। सड़क किनारे के ठेलों से लेकर सितारा-प्राप्त रेस्तरां तक, आम लोगों के भोजन से लेकर उत्कृष्ट पाक-कला तक, ताइवान की भोजन संस्कृति अंतरराष्ट्रीय मंच पर परंपरा और नवाचार के आकर्षक संगम के रूप में उभरी है।',
    'map.markers.taiwanAgriculturalReform.title': 'रात्रि बाजार संस्कृति',
    'map.markers.taiwanAgriculturalReform.desc':
      '164 पंजीकृत रात्रि बाजार、ताइनान में औसतन हर 38,000 लोगों पर एक रात्रि बाजार, मंदिर प्रांगण से अंतरराष्ट्रीय पर्यटन स्थल तक',
    'map.markers.taiwanTeaIndustry.title': 'हक्का खानपान संस्कृति',
    'map.markers.taiwanTeaIndustry.desc':
      'हक्का समुदाय की समृद्ध और विविध खानपान संस्कृति, लेई चा की गहरी सुगंध से लेकर जंगली अदरक के फूल में लिपटे चावल के पकवान के पर्वतीय स्वाद तक, मितव्ययी गृह-प्रबंधन और स्थानीय सामग्री के उपयोग से जुड़ी हक्का जीवन-बुद्धि को दर्शाती है',
    'map.markers.taiwanFishingIndustry.title': 'बीफ नूडल सूप',
    'map.markers.taiwanFishingIndustry.desc':
      'युद्धोत्तर चीनी प्रवासियों की घर की याद से लेकर ताइवान के राष्ट्रीय व्यंजन तक, बीफ नूडल सूप के सांस्कृतिक संलयन और विश्वव्यापी सुगंध की कहानी',
    'map.markers.taiwanFruitIndustry.title': 'चाय संस्कृति',
    'map.markers.taiwanFruitIndustry.desc':
      'पारंपरिक चाय-कला से लेकर आधुनिक हाथ से बनाए जाने वाले पेयों तक ताइवान की चाय संस्कृति का विकास, द्वीप की अनूठी चाय किस्मों और चाय पीने की संस्कृति को दर्शाता है',
    'map.markers.taiwanRiceVarieties.title':
      'हिलते हुए द्वीप पर उन्होंने एक ऐसी मीनार बनाई जो उड़ सकती है',
    'map.markers.taiwanRiceVarieties.desc':
      'सक्रिय भ्रंश से केवल 200 मीटर दूर, ताइवान के लोगों ने सबसे अस्थिर भूमि पर ही दुनिया की सबसे ऊंची इमारत खड़ी करने की ठानी——फिर एक सनकी 91 मिनट में बिना किसी उपकरण के उस पर चढ़ गया।',
    'map.markers.nightMarketCulture.title':
      'ताइवान की पांच प्रमुख भू-आकृतियां और भौगोलिक संरचना：पर्वत शृंखलाओं से मैदानों तक द्वीप का स्वरूप',
    'map.markers.nightMarketCulture.desc':
      'ताइवान की अनूठी भौगोलिक संरचना को जानें, केंद्रीय पर्वत शृंखला से पश्चिमी मैदानों तक इस द्वीप की भू-आकृतिक विविधता को समझें',
    'map.markers.bubbleTeaGlobalPhenomenon.title': 'ताइवान का परिवहन नेटवर्क',
    'map.markers.bubbleTeaGlobalPhenomenon.desc':
      'हाई-स्पीड रेल、मेट्रो、राजमार्ग और विमान सेवाएं, ताइवान को गतिमान रखने वाला बहुस्तरीय परिवहन नेटवर्क बुनती हैं',
    'map.markers.taiwanBeefNoodle.title':
      'ताइवान की राष्ट्रीय दर्शनीय क्षेत्र प्रणाली',
    'map.markers.taiwanBeefNoodle.desc':
      'पूर्वोत्तर तट से केंटिंग तक, ताइवान के 13 राष्ट्रीय दर्शनीय क्षेत्र समृद्ध प्राकृतिक और सांस्कृतिक परिदृश्य प्रस्तुत करते हैं',
    'map.markers.taiwanHotPotCulture.title':
      'ताइवान द्वीप की भौगोलिक विशेषताएँ और निर्माण',
    'map.markers.taiwanHotPotCulture.desc':
      'प्लेट विवर्तनिकी से लेकर भू-आकृतिक संरचना तक, ताइवान की अनूठी द्वीपीय भौगोलिक विशेषताओं और फॉर्मोसा द्वीप के प्राकृतिक रहस्यों को जानें',
    'map.markers.taiwanFineDining.title':
      'ताइवान में प्लेट विवर्तनिकी और भूकंपीय गतिविधि',
    'map.markers.taiwanFineDining.desc':
      'यूरेशियन प्लेट और फिलीपीन सागर प्लेट की सीमा पर स्थित ताइवान की भूवैज्ञानिक विशेषताओं तथा बार-बार आने वाले भूकंपों के कारणों का विश्लेषण',
    'map.markers.taiwanStreetFood.title':
      'ताइवान में जलाशय और जल संसाधन प्रबंधन',
    'map.markers.taiwanStreetFood.desc':
      'जल संकट से लेकर जलाशयों में गाद भरने तक, ताइवान के जल संसाधनों की चुनौतियाँ और उत्तर-दक्षिण असमान वितरण की समस्या',
    'map.markers.taiwanVegetarianCulture.title':
      'ताइवान की नदी प्रणाली और जलवैज्ञानिक विशेषताएँ: छोटी तीव्र धाराएँ और मौसमी बदलावों का जल-भूगोल',
    'map.markers.taiwanVegetarianCulture.desc':
      'झुओशुई नदी से गाओपिंग नदी तक, ताइवान की अनूठी नदी प्रणाली और द्वीपीय भू-आकृति द्वारा निर्मित उसकी जलवैज्ञानिक विशेषताओं को जानें',
    'map.markers.taiwanCoffeeCulture.title':
      'ताइवान की तटीय भू-आकृतियाँ और समुद्री परिदृश्य',
    'map.markers.taiwanCoffeeCulture.desc':
      'उत्तर के अंतरीप-खाड़ी तट से पूर्व के भ्रंश तट तक, ताइवान की विविध तटीय भू-आकृतियाँ प्लेट विवर्तनिकी की विलक्षण कारीगरी दर्शाती हैं',
    'map.markers.taiwanSnackCulture.title':
      'ताइवान के गर्म जलस्रोतों का परिदृश्य',
    'map.markers.taiwanSnackCulture.desc':
      'बेइतौ, झिबेन और जियाओशी में गर्म जलस्रोत संस्कृति और भूवैज्ञानिक विज्ञान का सुंदर संगम',
    'map.markers.taiwanSeafoodCulture.title':
      'ताइवान: जैव विविधता का प्रमुख केंद्र',
    'map.markers.taiwanSeafoodCulture.desc':
      '3.6 लाख वर्ग किलोमीटर के द्वीप में 5.9 लाख प्रजातियाँ सिमटी हैं, जिनका घनत्व वैश्विक औसत से 100 गुना है',
    'map.markers.taiwanPineappleCake.title':
      'ताइवान के कृषि परिदृश्य और उद्योग का वितरण',
    'map.markers.taiwanPineappleCake.desc':
      'उत्तर से दक्षिण तक बदलते कृषि परिदृश्य ताइवान के「ताइवान का अन्नभंडार」से「उन्नत कृषि」तक रूपांतरण की राह दर्शाते हैं',
    'map.markers.taiwanPorkRibSoup.title':
      'ताइवान का शहरी विकास और शहर-गाँव का अंतर',
    'map.markers.taiwanPorkRibSoup.desc':
      'छह विशेष नगरपालिकाओं की संरचना में ताइवान का असमान शहरी-ग्रामीण विकास और कृषि-प्रधान ताइवान से शहरी ताइवान तक स्थानिक रूपांतरण',
    'map.markers.taiwanOysterOmelette.title': 'भू-आकृति और भूविज्ञान',
    'map.markers.taiwanOysterOmelette.desc':
      '600लाख वर्ष पुराने द्वीप में छिपी है2करोड़ वर्षों पुरानी स्मृति — विश्व की सबसे युवा पर्वतनिर्माण पट्टी और सबसे भीषण प्लेट टकराव का चमत्कार',
    'map.markers.taiwanBreakfastCulture.title':
      'शहरी विशेषताएँ और क्षेत्रीय संस्कृति',
    'map.markers.taiwanBreakfastCulture.desc':
      'ताइपे के अंतरराष्ट्रीय महानगर से ताइनान के प्राचीन राजधानी वाले परिवेश तक, ताइवान के शहरों ने अपनी विशिष्ट स्थानीय पहचान कैसे गढ़ी',
    'map.markers.taiwanConvenienceStoreFood.title':
      'दूरस्थ द्वीप और समुद्री संस्कृति: विश्व में सबसे अधिक पत्थर के ज्वारीय जाल से उड़नमछली ऋतु के पारिस्थितिक नियमों तक',
    'map.markers.taiwanConvenienceStoreFood.desc':
      'दुनिया भर में पत्थर के ज्वारीय जाल 600 से भी कम हैं, जबकि पेंगहू में ही 574 हैं। उड़नमछली पकड़ने वाला एक द्वीपीय समुदाय वर्जनाओं को सबसे परिष्कृत समुद्री संसाधन प्रबंधन प्रणाली में बदल देता है',
    'map.markers.dutchSpanishColonialPeriod.title':
      '28 फरवरी घटना और श्वेत आतंक: ताइवान में अधिनायकवादी शासन के घाव और स्मृतियाँ',
    'map.markers.dutchSpanishColonialPeriod.desc':
      '1947की 28 फरवरी घटना से लेकर 38वर्ष लंबी मार्शल लॉ व्यवस्था तक, ताइवान ने अधिनायकवादी शासन में राजकीय हिंसा झेली और मार्शल लॉ हटने के बाद ही ऐतिहासिक घावों का सामना कर संक्रमणकालीन न्याय को आगे बढ़ाना शुरू किया।',
    'map.markers.zhengDynastyPeriod.title':
      'ताइवान जलडमरूमध्य संकट और दोनों ओर के संबंधों का विकास',
    'map.markers.zhengDynastyPeriod.desc':
      'ताइवान जलडमरूमध्य के तीन बड़े संकटों और दोनों ओर के संबंधों के सत्तर से अधिक वर्षों के विकास की समीक्षा के जरिए ऐतिहासिक संदर्भ और समकालीन चुनौतियों को समझें',
    'map.markers.qingDynastyTaiwanHistory.title':
      'ताइवान के समुद्री व्यापार का इतिहास',
    'map.markers.qingDynastyTaiwanHistory.desc':
      'समुद्री अन्वेषण युग के ताइवान में अंतरराष्ट्रीय व्यापार केंद्र से समुद्री डाकू साम्राज्य तक उत्थान-पतन की गाथा',
    'map.markers.japaneseColonialRule.title':
      'ताइवान की सैन्य-आश्रित बस्तियों का इतिहास',
    'map.markers.japaneseColonialRule.desc':
      'म्यांमार की अलग-थलग सेना से बाँस की बाड़ वाले साम्राज्य तक, 120लाख लोगों के विशाल पलायन ने「घर」को कैसे नई परिभाषा दी',
    'map.markers.februaryTwentyEightIncident.title':
      'ताइवान के रेलमार्गों का इतिहास',
    'map.markers.februaryTwentyEightIncident.desc':
      'चिंग राजवंश के लियू मिंग-चुआन से जापानी शासन की उत्तर-दक्षिण मुख्य रेल लाइन और हाई-स्पीड रेल तक, रेलमार्गों ने ताइवान के शहरी विकास और सांस्कृतिक स्मृति को कैसे आकार दिया',
    'map.markers.martialLawPeriod.title':
      'राष्ट्रवादी सरकार का ताइवान स्थानांतरण और युद्धोत्तर पुनर्निर्माण',
    'map.markers.martialLawPeriod.desc':
      '1949में राष्ट्रवादी सरकार के ताइवान स्थानांतरण की ऐतिहासिक पृष्ठभूमि, प्रक्रिया और प्रभावों तथा युद्धोत्तर ताइवान के राजनीतिक, आर्थिक और सामाजिक पुनर्निर्माण का विश्लेषण',
    'map.markers.democratization.title': 'जापानी शासन काल',
    'map.markers.democratization.desc':
      '1895-1945के बीच जापान ने ताइवान पर 50वर्ष शासन किया, व्यापक आधुनिकीकरण और संस्थागत प्रबंधन के साथ आत्मसातीकरण नीतियाँ लागू कीं, जिन्होंने ताइवान के सामाजिक विकास पर गहरा प्रभाव डाला',
    'map.markers.taiwanIndependenceMovement.title': 'चिंग शासन काल',
    'map.markers.taiwanIndependenceMovement.desc':
      '1683-1895के बीच चिंग राजवंश ने ताइवान पर लगभग 212वर्ष शासन किया और निष्क्रिय प्रशासन से सक्रिय निर्माण तक आधुनिक ताइवान के प्रशासनिक विभाजन तथा हान समाज की नींव रखी',
    'map.markers.taiwanChinaRelations.title': 'डच-स्पेनी और मिंग-झेंग काल',
    'map.markers.taiwanChinaRelations.desc':
      'ताइवान के इतिहास में पहली व्यवस्थित औपनिवेशिक सत्ता—डचों द्वारा फोर्ट ज़ीलैंडिया के निर्माण से लेकर कोक्सिंगा द्वारा ताइवान में शासन स्थापित करने तक—ने हान प्रवासन और राजनीतिक संस्थाओं की नींव रखी',
    'map.markers.taiwanUsRelations.title': 'कन्वीनियंस स्टोर संस्कृति',
    'map.markers.taiwanUsRelations.desc':
      'विश्व में सर्वाधिक घनत्व वाले ताइवान के कन्वीनियंस स्टोर खुदरा दुकानों से पूरे देश की दैनिक जीवन संचालन प्रणाली कैसे बने',
    'map.markers.taiwanInternationalStatus.title': 'ताइवान की परिवहन प्रणाली',
    'map.markers.taiwanInternationalStatus.desc':
      'हाई-स्पीड रेल 90 मिनट में उत्तर से दक्षिण तक जाती है, मेट्रो शहरों की धमनियों का घना जाल बुनती है और स्कूटर गलियों में दौड़ते हैं',
    'map.markers.taiwanHistoricalFigures.title':
      'ताइवान की कन्वीनियंस स्टोर संस्कृति',
    'map.markers.taiwanHistoricalFigures.desc':
      'विश्व में सबसे अधिक घनत्व वाला कन्वीनियंस स्टोर साम्राज्य, 7-11और फैमिलीमार्ट के स्थानीय नवाचारों ने आधुनिक जीवनशैली को नई परिभाषा दी',
    'map.markers.taiwanPoliticalFigures.title':
      'ताइवान के पार्क और रोजमर्रा का अवकाश',
    'map.markers.taiwanPoliticalFigures.desc':
      'सुबह की ताई ची से रात की सैर तक——पीढ़ियों के बीच सामाजिक मेलजोल के स्थल के रूप में ताइवान के पार्कों का सांस्कृतिक अवलोकन',
    'map.markers.kuomintangHistory.title': 'ताइवान की कॉफी संस्कृति',
    'map.markers.kuomintangHistory.desc':
      'स्वतंत्र कैफ़े के घनत्व में विश्व के शीर्ष तीन में शामिल ताइवान की कॉफी संस्कृति—अलीशान की फलियों से कैफ़े में काम करने तक',
    'map.markers.democraticProgressivePartyHistory.title':
      'कचरा गाड़ी के पीछे दौड़ता द्वीप: कचरा संकट से पुनर्चक्रण चमत्कार तक ताइवान',
    'map.markers.democraticProgressivePartyHistory.desc':
      '1990के दशक में 400लगभग भर चुके लैंडफिल वाला और अंतरराष्ट्रीय मीडिया द्वारा「कचरा द्वीप」कहा गया स्थान बीथोवेन के संगीत से 2,300लाख लोगों को हर दिन कचरा गाड़ी के पीछे दौड़ाता है; 30वर्ष बाद इसकी संसाधन पुनर्चक्रण दर अधिकांश यूरोपीय देशों से आगे है',
    'map.markers.taipeiHistory.title':
      'ताइवान मेट्रो का विकास इतिहास: खून और पैसे से लिखा शहरी विकास का सिद्धांत',
    'map.markers.taipeiHistory.desc':
      '209 टन वजनी इस्पात की शहतीर आसमान से गिरने पर 4 लोगों की जान गई, 16.4 करोड़ का मुआवजा हुआ और ताइपे मेट्रो का मूल परिचालन आज भी घाटे में है——पूरे ताइवान की मेट्रो व्यवस्था की वास्तविक कीमत',
    'map.markers.taiwanPrehistoricCulture.title':
      'ताइवान की शिक्षा व्यवस्था: संयुक्त प्रवेश परीक्षा के नरक से बहुविकल्पी भूलभुलैया तक द्वीपीय प्रयोग',
    'map.markers.taiwanPrehistoricCulture.desc':
      'ताइवान ने संयुक्त प्रवेश परीक्षा प्रणाली खत्म करने में 30वर्ष लगाए, लेकिन नवीनतम विषय-आधारित परीक्षा से दोबारा परीक्षा की तैयारी कराने वाले संस्थानों में दाखिले दोगुने हो गए। एक द्वीप उच्च शिक्षा प्रवेश के दबाव और शैक्षिक समानता के बीच बार-बार सामाजिक प्रयोग कैसे करता है？',
    'map.markers.taiwanIndigenousHistory.title': 'ताइवान की स्कूटर संस्कृति',
    'map.markers.taiwanIndigenousHistory.desc':
      'मोटरबाइक घनत्व में विश्व के अग्रणी द्वीपों में शामिल ताइवान में आवागमन के साधन से जीवनशैली तक का सांस्कृतिक विकास',
    'map.markers.taiwanMilitaryHistory.title':
      'ताइवान की आर्केड संस्कृति और सड़कों का दृश्य',
    'map.markers.taiwanMilitaryHistory.desc':
      'धूप और बारिश से बचाने वाले जीवन गलियारे, जहाँ स्कूटर, रेहड़ी-पटरी वाले और मानवीय अपनापन मिलकर ताइवान की सड़कों की स्मृतियाँ बुनते हैं',
    'map.markers.taiwanWomenHistory.title': 'रात्रिजीवन और KTV संस्कृति',
    'map.markers.taiwanWomenHistory.desc':
      'कैशबॉक्स के निजी कमरों से देर रात के भोजनालयों तक, 24 घंटे कभी न थमने वाला द्वीपीय रात्रिजीवन',
    'map.markers.taiwanEducationHistory.title':
      'धर्म और लोक आस्था: भय के प्रबंधन से आस्था के साम्राज्य तक',
    'map.markers.taiwanEducationHistory.desc':
      'ताइवान में दुनिया में मंदिरों का घनत्व सबसे अधिक है, फिर भी वह धार्मिक स्वतंत्रता में विश्व में पहले स्थान पर है—इस विरोधाभास के पीछे 17वीं सदी के सैन्य प्रवासियों की जीवन-रक्षा की बुद्धिमत्ता छिपी है',
    'map.markers.taiwanReligiousHistory.title': 'गर्म झरनों की संस्कृति',
    'map.markers.taiwanReligiousHistory.desc':
      'सैन्य आरोग्य-लाभ से दुनिया के तीन प्रमुख मृदा-स्रोतों तक: ताइवान के अनायास गर्म झरनों का साम्राज्य बनने की कहानी',
    'map.markers.taiwanMediaHistory.title':
      'ताइवान के मूल निवासियों की संगीत परंपराएं',
    'map.markers.taiwanMediaHistory.desc':
      'ताइवान के 16 मूल निवासी समुदायों की समृद्ध संगीत संस्कृति का अन्वेषण—प्राचीन धुनों के गायन से पारंपरिक वाद्ययंत्रों तक—और हजारों वर्षों की सांस्कृतिक विरासत का साक्षात्कार',
    'map.markers.badmintonChampions.title':
      'ताइवान का वाद्ययंत्र निर्माण उद्योग: हौली के सैक्सोफोन से वैश्विक संगीत कारखाने तक',
    'map.markers.badmintonChampions.desc':
      'ताइवान के वाद्ययंत्र निर्माण उद्योग की विकास-यात्रा का अन्वेषण—हौली के सैक्सोफोन के वैश्विक वर्चस्व से गिटार अनुबंध-निर्माण के साम्राज्य और फिर संगीत-पेटी निर्माण की सूक्ष्म शिल्पकला तक—और यह कि ताइवान अनुबंध-निर्माण से अपने ब्रांडों तक कैसे पहुंचा',
    'map.markers.baseballCulture.title': 'ताइवान का लोकगीत आंदोलन',
    'map.markers.baseballCulture.desc':
      '“अपने गीत गाओ” से पूरे चीनी-भाषी संगीत जगत को बदलने तक—1970 के दशक की वह सांस्कृतिक क्रांति, जो युवाओं की थी',
    'map.markers.taiwanBasketball.title':
      'ताइवान के स्वतंत्र संगीत परिदृश्य का विकास',
    'map.markers.taiwanBasketball.desc':
      'भूमिगत बैंडों से स्वतंत्र संगीत तक, ताइवान के गैर-मुख्यधारा संगीत की तीस वर्षों की विकास-यात्रा और सांस्कृतिक महत्त्व का अन्वेषण',
    'map.markers.marathonRunning.title':
      'ताइवान का इलेक्ट्रॉनिक संगीत और पार्टी संस्कृति: भूमिगत Rave से अंतरराष्ट्रीय मंच तक',
    'map.markers.marathonRunning.desc':
      '1990 के दशक की Rave पार्टी संस्कृति से Road to Ultra इलेक्ट्रॉनिक संगीत महोत्सव तक, ताइवान का इलेक्ट्रॉनिक संगीत किस तरह भूमिगत दुनिया से मुख्यधारा में आया और अंतरराष्ट्रीय स्तर के DJ तथा स्वतंत्र इलेक्ट्रॉनिक लेबल तैयार हुए',
    'map.markers.taiwanEsports.title':
      'ताइवान की संगीत महोत्सव संस्कृति: स्प्रिंग स्क्रीम से हर ओर फलते-फूलते युवा संस्कृति के माध्यम तक',
    'map.markers.taiwanEsports.desc':
      'स्प्रिंग स्क्रीम, होहाईयान रॉक फेस्टिवल से मेगापोर्ट फेस्टिवल तक ताइवान के संगीत महोत्सवों की विकास-यात्रा और उनके स्वतंत्र बैंडों की पौधशाला तथा युवा संस्कृति की अभिव्यक्ति का केंद्रीय मंच बनने का अन्वेषण',
    'map.markers.taiwanOlympics.title':
      'समकालीन ताइवान का स्वतंत्र संगीत परिदृश्य',
    'map.markers.taiwanOlympics.desc':
      'भूमिगत प्रस्तुतियों से उद्योग तंत्र तक, आधुनिक ताइवान के स्वतंत्र संगीत पारिस्थितिकी तंत्र के विकास और सांस्कृतिक प्रभाव का विश्लेषण',
    'map.markers.taipeiCycle.title':
      'ताइवान के मूल निवासियों का पारिस्थितिक ज्ञान और पर्यावरण संरक्षण',
    'map.markers.taipeiCycle.desc':
      'ताइवान के मूल निवासी समुदायों द्वारा हजारों वर्षों में संचित पारंपरिक पारिस्थितिक ज्ञान तथा आधुनिक पर्यावरण संरक्षण में उसके महत्त्वपूर्ण मूल्य और व्यावहारिक तरीकों की पड़ताल',
    'map.markers.taiwanBetelNutCulture.title':
      'ताइवान के पर्वत और पर्वतारोहण संस्कृति',
    'map.markers.taiwanBetelNutCulture.desc':
      '3000 मीटर ऊंचे 268 पर्वत और सौ शिखरों की संस्कृति: ताइवान में पर्वतारोहण का विकास और पर्वत संरक्षण की चुनौतियां',
    'map.markers.taiwanElections.title': 'ताइवान का वन पारिस्थितिकी तंत्र',
    'map.markers.taiwanElections.desc':
      'उपोष्णकटिबंधीय तटों से ऊंचे पर्वतों के शंकुधारी वनों तक, ताइवान के 3000 मीटर ऊर्ध्वाधर अंतराल में फैला समृद्ध वन संसार',
    'map.markers.taiwanLgbtCulture.title':
      'ताइवान में जलवायु परिवर्तन और नेट-ज़ीरो संक्रमण',
    'map.markers.taiwanLgbtCulture.desc':
      'ताइवान जलवायु परिवर्तन के प्रभावों का सामना कर रहा है—चरम मौसम की बढ़ती घटनाओं से 2050 के नेट-ज़ीरो कार्बन उत्सर्जन लक्ष्य की नीतिगत योजना तक—ऊर्जा संक्रमण की प्रक्रिया में अवसरों और चुनौतियों की पड़ताल',
    'map.markers.taiwanMotorcycleCulture.title':
      'ताइवान का समुद्री संरक्षण: 30 वर्षों में बनी व्यवस्था प्रवाल विरंजन की एक घटना को क्यों नहीं रोक सकी?',
    'map.markers.taiwanMotorcycleCulture.desc':
      '2020 में ताइवान के समुद्री क्षेत्र ने इतिहास के सबसे बड़े प्रवाल विरंजन का सामना किया। श्याओ लिउचिउ से दोंगशा एटोल तक, संरक्षित क्षेत्रों के भीतर के प्रवाल भी ऊंचे तापमान में मर गए। इससे कौन-सी समस्याएं उजागर हुईं?',
    'map.markers.taipeiMrt.title':
      'ताइवान में समुद्री प्रदूषण प्रबंधन और संरक्षण की चुनौतियां',
    'map.markers.taipeiMrt.desc':
      'समुद्री कचरे, अत्यधिक मछली पकड़ने और जलवायु परिवर्तन के बीच ताइवान के समुद्री संरक्षण की मौजूदा स्थिति, चुनौतियों और अभिनव समाधानों की पड़ताल',
    'map.markers.kaohsiungMrt.title': 'ताइवान की समुद्री पारिस्थितिकी',
    'map.markers.kaohsiungMrt.desc':
      'ताओ समुदाय ने जिस समुद्री क्षेत्र की वर्जनाओं से रक्षा की, वह आज ऊंचे तापमान और पानी के भीतर के शोर से विरंजित हो रहा है: जब हजारों वर्षों का पारिस्थितिक ज्ञान आधुनिक समुद्री संकट से टकराता है',
    'map.markers.taichungMrt.title':
      'ताइवान की समुद्री पारिस्थितिकी और प्रवाल भित्ति संरक्षण',
    'map.markers.taichungMrt.desc':
      'चारों ओर समुद्र से घिरे ताइवान में समृद्ध समुद्री पारिस्थितिकी है—प्रवाल भित्तियों के विरंजन संकट से व्हेल और डॉल्फ़िन संरक्षण तक—समुद्री राष्ट्रीय उद्यानों के संरक्षण-प्रभाव और भावी चुनौतियों की पड़ताल',
    'map.markers.taiwanTrainSystem.title':
      'ताइवान के गर्म झरने और भूतापीय ऊर्जा',
    'map.markers.taiwanTrainSystem.desc':
      '30 वर्ष पहले विफल हुए भूतापीय बिजलीघर से दुनिया के एकमात्र बेइतौ पत्थर तक: एक द्वीप ने धरती के भीतर की आग को आरोग्य और हरित बिजली में कैसे बदला',
    'map.markers.taiwanBusSystem.title': 'ताइवान में तेंदुआ बिल्ली का संरक्षण',
    'map.markers.taiwanBusSystem.desc':
      'पूरे ताइवान में 500 से भी कम बची अदृश्य-सी बिल्लियां—जब अंतिम देशज बिल्ली प्रजाति विलुप्ति के कगार पर पहुंचती है',
    'map.markers.taiwanInnovationEcosystem.title': 'ताइवान का पैंगोलिन',
    'map.markers.taiwanInnovationEcosystem.desc':
      'दुनिया में सबसे अधिक तस्करी किया जाने वाला स्तनपायी, जिसे ताइवान में एक सुरक्षित घर मिला',
    'map.markers.taiwanMedicalSystem.title':
      'ताइवान का उच्च पर्वतीय पारिस्थितिकी तंत्र और हिमयुगीय अवशेष',
    'map.markers.taiwanMedicalSystem.desc':
      'ताइवान में 3000 मीटर से अधिक ऊंचाई वाले पर्वतीय पर्यावरण के विशिष्ट पारिस्थितिकी तंत्र की पड़ताल—ताइवानिया, युशान रोडोडेंड्रॉन से हिमयुगीन अवशेष प्रजातियों की बहुमूल्य जैव विविधता तक',
    'map.markers.taiwanEducationSystem.title': 'ताइवान का काला भालू',
    'map.markers.taiwanEducationSystem.desc':
      'छाती पर सफ़ेद V उसका हस्ताक्षर है—ताइवान के पर्वतीय वनों का अंतिम सम्राट और उसके संरक्षण की अधूरी लड़ाई',
    'map.markers.taiwanMusicIndustry.title': 'राष्ट्रीय उद्यान',
    'map.markers.taiwanMusicIndustry.desc':
      '36,197 वर्ग किलोमीटर में समाए 9 राष्ट्रीय उद्यान—दुनिया में सर्वाधिक घनत्व वाला संरक्षण चमत्कार',
    'map.markers.mandarinPopMusic.title': 'ताइवान के राष्ट्रीय उद्यान',
    'map.markers.mandarinPopMusic.desc':
      'ताइवान के नौ राष्ट्रीय उद्यानों के विशिष्ट पारिस्थितिकी तंत्र और संरक्षण-मूल्य का अन्वेषण—उपोष्णकटिबंधीय तटों से ऊंचे पर्वतों की हिमरेखा तक का संपूर्ण भूदृश्य',
    'map.markers.taiwaneseIndieMusic.title': 'स्थानिक प्रजातियां',
    'map.markers.taiwaneseIndieMusic.desc':
      'ताइवान की समृद्ध स्थानिक जैव प्रजातियां द्वीपीय जैव-भूगोल के विकासवादी चमत्कार और संरक्षण के महत्त्व को दर्शाती हैं',
    'map.markers.taiwanRapHipHop.title': 'पारिस्थितिक विविधता',
    'map.markers.taiwanRapHipHop.desc':
      'ताइवान का क्षेत्रफल दुनिया का केवल 0.025% है, फिर भी यहां 50,000 से अधिक जैव प्रजातियां हैं और 60.71% वनावरण के साथ यह दुनिया में 33वें स्थान पर है',
    'map.markers.taiwanElectronicMusic.title': 'ताइवान की व्हेल और डॉल्फ़िन',
    'map.markers.taiwanElectronicMusic.desc':
      'दुनिया की एक-तिहाई व्हेल और डॉल्फ़िन प्रजातियों का आवास—अतीत के व्हेल शिकार से आज के व्हेल-दर्शन तक, ताइवान समुद्री पारिस्थितिकी अनुसंधान का प्रमुख केंद्र कैसे बना?',
    'map.markers.taiwanTraditionalMusic.title': 'मेडे',
    'map.markers.taiwanTraditionalMusic.desc':
      'नेशनल ताइवान नॉर्मल यूनिवर्सिटी के संबद्ध सीनियर हाई स्कूल से विश्व मंच तक, चीनी-भाषी रॉक की भावना को परिभाषित करने वाले चिरयुवा',
    'map.markers.taiwanFilmIndustry.title': 'वू बाई',
    'map.markers.taiwanFilmIndustry.desc':
      'ताइवान के रॉक संगीत का राष्ट्रीय गौरव और स्थानीय रॉक का पर्याय, जिन्होंने 《नॉर्वेजियन वुड》 जैसी कृतियों से रॉक जगत में अपना स्थान स्थापित किया',
    'map.markers.newTaiwanCinema.title': 'वू पाओ-चुन',
    'map.markers.newTaiwanCinema.desc':
      'विश्व ब्रेड प्रतियोगिता के विजेता, जिन्होंने लीची-गुलाब ब्रेड से अंतरराष्ट्रीय जगत को चकित किया और पिंगतुंग के ग्रामीण इलाके से दुनिया के शीर्ष बेकिंग शिल्पकार बने',
    'map.markers.taiwanDocumentary.title': 'एनेट लू',
    'map.markers.taiwanDocumentary.desc':
      'राजद्रोह की दोषी से उपराष्ट्रपति तक: चीनी-भाषी दुनिया की पहली महिला उपराष्ट्रपति का असाधारण जीवन',
    'map.markers.taiwanAnimationIndustry.title': 'जिमी',
    'map.markers.taiwanAnimationIndustry.desc':
      'चित्र-पुस्तकों से दुनिया को स्नेह देने वाले चित्रकार-कवि, जिन्होंने ताइवान की चित्र-पुस्तकों को अंतरराष्ट्रीय मंच तक पहुंचाया',
    'map.markers.taiwanTelevisionIndustry.title': 'ताई त्ज़ु-यिंग',
    'map.markers.taiwanTelevisionIndustry.desc':
      '214 सप्ताह तक विश्व नंबर 1 रहने का रिकॉर्ड रखने वाली, काऊशुंग के चिएनचेन से ओलंपिक रजत पदक तक पहुँची ताइवान की बैडमिंटन रानी',
    'map.markers.taiwanOttPlatforms.title': 'ली आंग',
    'map.markers.taiwanOttPlatforms.desc':
      '《पति की हत्या》《भटकता उपवन》 की लेखिका और ताइवान के नारीवादी साहित्य की अग्रदूत',
    'map.markers.taiwanPodcastIndustry.title': 'ली चिह-काई',
    'map.markers.taiwanPodcastIndustry.desc':
      '《कूदो! लड़कों》 के मार्केट काई से ओलंपिक रजत पदक तक, ताइवान के पॉमेल हॉर्स राजकुमार का सोलह वर्षों का कलाबाज़ी भरा जीवन',
    'map.markers.taiwanPublishing.title': 'ली युआन-त्से',
    'map.markers.taiwanPublishing.desc':
      '1986 के रसायन विज्ञान नोबेल पुरस्कार विजेता, जिन्होंने क्रॉस्ड मॉलेक्युलर बीम तकनीक से रासायनिक गतिकी में नया क्षेत्र खोला और ताइवान से विज्ञान का नोबेल पुरस्कार पाने वाले पहले व्यक्ति बने',
    'map.markers.taiwanBookstoreCulture.title': 'तु त्सुंग-मिंग',
    'map.markers.taiwanBookstoreCulture.desc':
      'ताइवान के पहले चिकित्सा डॉक्टरेट और ताइवान की आधुनिक चिकित्सा के जनक',
    'map.markers.taiwanComicMangaIndustry.title': 'जेरेमी लिन',
    'map.markers.taiwanComicMangaIndustry.desc':
      'हार्वर्ड के मेधावी छात्र से NBA चैंपियन तक, वैश्विक ‘लिनसैनिटी’ की लहर पैदा करने वाले ताइवानी-अमेरिकी खिलाड़ी',
    'map.markers.taiwanGameIndustry.title': 'लिन यी-चिए',
    'map.markers.taiwanGameIndustry.desc':
      'एथलेटिक्स टीम से ठुकराए गए दुबले बच्चे से सहारा रेगिस्तान को पैदल पार कर इतिहास रचने वाले चरम-दूरी धावक तक',
    'map.markers.nationalPalaceMuseum.title': 'लिन यी-शिओंग',
    'map.markers.nationalPalaceMuseum.desc':
      'लोकतंत्र आंदोलन के अग्रदूत, लिन परिवार हत्याकांड के पीड़ित और चौथे परमाणु संयंत्र-विरोधी आंदोलन के नेता',
    'map.markers.nationalParks.title': 'एडवर्ड यांग',
    'map.markers.nationalParks.desc':
      'ताइवान न्यू सिनेमा आंदोलन के केंद्रीय व्यक्तित्व, कान के सर्वश्रेष्ठ निर्देशक और शहरी अलगाव के कवि',
    'map.markers.taiwanGeography.title': 'पाई श्येन-युंग',
    'map.markers.taiwanGeography.desc':
      '《ताइपे के लोग》 के लेखक, आधुनिक साहित्य के दिग्गज और कुनक्यू ओपेरा के पुनरुत्थान के प्रमुख प्रेरक',
    'map.markers.taiwanClimate.title': 'क्राउड लू',
    'map.markers.taiwanClimate.desc':
      'ताइवान के गायक-गीतकार और अभिनेता, तीन गोल्ड पुरस्कारों—गोल्डन मेलोडी, गोल्डन बेल और गोल्डन हॉर्स—के विजेता, अपने सहज जमीनी व्यक्तित्व और अनूठी गायन शैली के लिए प्रसिद्ध',
    'map.markers.taiwanEcosystem.title': 'चुआंग चिह-युआन',
    'map.markers.taiwanEcosystem.desc':
      'टेबल टेनिस के दिग्गज, चार बार के ओलंपियन और अकेले कठिन अभ्यास करने वाले एकाकी नायक',
    'map.markers.taiwanEndangeredSpecies.title': 'त्साई मिंग-लियांग',
    'map.markers.taiwanEndangeredSpecies.desc':
      'वेनिस गोल्डन लायन विजेता, मलेशियाई चीनी और स्लो सिनेमा सौंदर्यशास्त्र के उस्ताद',
    'map.markers.taiwanMarineEcology.title': 'श्यू वेन-लॉन्ग',
    'map.markers.taiwanMarineEcology.desc':
      'ची मेई समूह के संस्थापक, उद्यमी, वायलिनवादक और कला संग्राहक की तिहरी पहचान वाले तथा ची मेई संग्रहालय के निर्माता',
    'map.markers.taiwanBirdwatching.title': 'फांग-यी श्यू',
    'map.markers.taiwanBirdwatching.desc':
      'यीलान की एक लड़की से मार्था ग्राहम डांस कंपनी की प्रधान नृत्यांगना और फिर ताइवान लौटकर ला फांग डांस कंपनी की संस्थापक बनने तक——उन्होंने अपने शरीर से ताइवान की सबसे सशक्त कहानी कही',
    'map.markers.taiwanHotSprings.title':
      'लाई चिंग-ते: खनिक परिवार से राष्ट्रपति कार्यालय तक पहुँचे जनस्वास्थ्य चिकित्सक',
    'map.markers.taiwanHotSprings.desc':
      'ताइवान के 16वें राष्ट्रपति और चीन गणराज्य (ताइवान) के संवैधानिक इतिहास में उपराष्ट्रपति रहते हुए राष्ट्रपति चुनाव लड़कर सफलतापूर्वक निर्वाचित होने वाले पहले राजनेता',
    'map.markers.taiwanIslands.title': 'कुओ ह्सिंग-चुन',
    'map.markers.taiwanIslands.desc':
      'ताइवान की भारोत्तोलन देवी, 2021 टोक्यो ओलंपिक की स्वर्ण पदक विजेता और 59 किलोग्राम वर्ग की तीनों स्पर्धाओं में ओलंपिक रिकॉर्डधारक',
    'map.markers.taiwanMountains.title': 'तेंग यू-श्येन',
    'map.markers.taiwanMountains.desc':
      'ताइवान के लोकगीतों के जनक, जिन्होंने 《वसंत की हवा की प्रतीक्षा》《बरसाती रात का फूल》《चाँदनी रात का दुख》 जैसे क्लासिक ताइवानी-भाषी गीत रचे',
    'map.markers.taiwanRivers.title': 'चुंग ली-हो',
    'map.markers.taiwanRivers.desc':
      '《मूलभूमि का मनुष्य》 के लेखक, ताइवान साहित्य के जनक और गरीबी व बीमारी के बावजूद लेखन में डटे रहने वाले साहित्यिक योद्धा',
    'map.markers.taiwanCoastline.title': 'चेन शू-चू',
    'map.markers.taiwanCoastline.desc':
      'ताइतुंग की सब्ज़ी विक्रेता के साधारण परोपकारी कार्य, जिन्होंने अपने पूरे जीवन से सच्ची समृद्धि का अर्थ समझाया',
    'map.markers.taiwanForests.title': 'चेन शुई-बियान',
    'map.markers.taiwanForests.desc':
      '10वें और 11वें राष्ट्रपति, 2000 में पहली बार सत्ता के दलगत हस्तांतरण के केंद्रीय व्यक्तित्व और ताइवान के लोकतंत्रीकरण की अहम हस्ती',
    'map.markers.taiwanNaturalDisasters.title': 'मा यिंग-जिउ',
    'map.markers.taiwanNaturalDisasters.desc':
      '12वें और 13वें राष्ट्रपति, ताइवान जलडमरूमध्य के दोनों ओर संबंधों में जमी बर्फ तोड़ने के प्रमुख प्रेरक और ECFA के हस्ताक्षरकर्ता',
    'map.markers.taiwanEarthquakes.title': 'हुआंग चुन-मिंग',
    'map.markers.taiwanEarthquakes.desc':
      '《बेटे की बड़ी गुड़िया》《समुद्र देखने के दिन》 के लेखक और यीलान के स्थानीय साहित्य के प्रतिनिधि रचनाकार',
    'map.markers.taiwanTyphoons.title':
      'हुआंग चेन-नान: पुस्तक-संग्रह जगत के ताकेनोउची युताका और ताइवान के इतिहास-संस्कृति का जीवंत स्रोत',
    'map.markers.taiwanTyphoons.desc':
      'हुआंग चेन-नान ताइवान के इतिहास-संस्कृति शोधकर्ता, पुस्तक-संग्राहक और लेखक हैं। उन्होंने PTT पर Sizumaru उपनाम से शुरुआत की और ताइवान के इतिहास तथा पुरानी पुस्तकों की संस्कृति साझा करने के लिए 「हुओशुई लाई पुस्तक-कक्ष」 पेज चलाया। 《ताइवान के इतिहास का सबसे मज़ेदार ताइवान इतिहास》 समेत कई पुस्तकों के लेखक हुआंग को पुस्तक-संग्रह जगत का ताकेनोउची युताका कहा जाता है। चियाई के लिउचियाओ में पुस्तक-प्रेमी परिवार से निकले हुआंग और उनके पिता उत्तर-दक्षिण में काम बाँटकर दस्तावेज़ जुटाते हैं तथा ताइवान के गंभीर इतिहास को रोचक और जनसुलभ बनाने के लिए समर्पित हैं।',
    'map.markers.sunflowerMovement.title':
      'चिड़ियाघर और प्रदर्शन में रखे जाने वाले पशुओं की नैतिकता',
    'map.markers.sunflowerMovement.desc':
      'लोहे के पिंजरे में बंद हाथी से Xpark की जेलीफ़िश दीवार तक——ताइवान मनुष्यों और प्रदर्शित किए जाने वाले पशुओं के संबंध को नए सिरे से परिभाषित कर रहा है',
    'map.markers.taiwanSocialMovements.title':
      'ताइवान के मूलनिवासी समुदायों के लिए भूमि न्याय और पारंपरिक क्षेत्र',
    'map.markers.taiwanSocialMovements.desc':
      'ताइवान के मूलनिवासी समुदायों के भूमि अधिकारों की ऐतिहासिक पृष्ठभूमि, कानूनी विकास, पारंपरिक क्षेत्रों के सीमांकन संबंधी विवादों और मूलनिवासी ऐतिहासिक न्याय एवं संक्रमणकालीन न्याय समिति के कार्य-परिणामों का विश्लेषण',
    'map.markers.taiwanMarriageEquality.title':
      'ताइवान में समलैंगिक विवाह और लैंगिक समानता',
    'map.markers.taiwanMarriageEquality.desc':
      'मार्शल लॉ काल के एक जेल बंदी से एशिया के पहले समलैंगिक विवाह कानून तक, एक व्यक्ति के 30 वर्षों के संघर्ष ने द्वीप पर प्रेम की परिभाषा कैसे बदल दी',
    'map.markers.taiwanEnvironmentalJustice.title':
      'ताइवान में पर्यावरणीय न्याय और NIMBY विवाद',
    'map.markers.taiwanEnvironmentalJustice.desc':
      'ताइवान में पर्यावरणीय बोझ के असमान वितरण का अध्ययन—कचरा भस्मीकरण संयंत्रों और परमाणु कचरे से पेट्रोकेमिकल उद्योग तक के NIMBY संघर्षों के माध्यम से पर्यावरणीय असमानता और सामाजिक न्याय के मुद्दों का विश्लेषण',
    'map.markers.taiwanCommunityRiCulture.title':
      'ताइवान के समुदाय और ली संस्कृति',
    'map.markers.taiwanCommunityRiCulture.desc':
      'लोकतंत्र के सबसे जमीनी अभ्यास से समुदाय निर्माण के सामाजिक नवाचार तक',
    'map.markers.taiwanLongTermCare.title':
      'ताइवान की दीर्घकालिक देखभाल व्यवस्था का विकास',
    'map.markers.taiwanLongTermCare.desc':
      'दुनिया की सबसे उन्नत दीर्घकालिक देखभाल व्यवस्थाओं में से एक, जिसके साथ सबसे विशाल अदृश्य देखभाल तंत्र भी मौजूद है',
    'map.markers.taiwanLaborMovement.title': 'पर्यावरण संरक्षण और सतत विकास',
    'map.markers.taiwanLaborMovement.desc':
      'धुएँ की चिमनियों के द्वीप से नेट-ज़ीरो ताइवान तक: पर्यावरण आंदोलन के 40 वर्षों की जागृति-यात्रा',
    'map.markers.taiwanHousingIssues.title': 'सामाजिक आवास और आवासीय न्याय',
    'map.markers.taiwanHousingIssues.desc':
      'ताइवान सामाजिक आवास नीति के माध्यम से आवासीय न्याय कैसे साकार कर रहा है, ताकि हर व्यक्ति को स्थिर और सुरक्षित घर मिल सके',
    'map.markers.taiwanHealthcareSystem.title':
      'विज्ञान एवं प्रौद्योगिकी पार्कों का विकास',
    'map.markers.taiwanHealthcareSystem.desc':
      'शिनचू साइंस पार्क से सदर्न ताइवान साइंस पार्क तक, ताइवान के विज्ञान पार्कों की विकास-यात्रा और तीन प्रमुख पार्कों की विशिष्ट भूमिकाओं का अध्ययन',
    'map.markers.taiwanImmigration.title': 'सेमीकंडक्टर उद्योग',
    'map.markers.taiwanImmigration.desc':
      'मॉरिस चांग के ऐतिहासिक दाँव से 2 नैनोमीटर युग तक: TSMC ने ताइवान को वैश्विक प्रौद्योगिकी की जीवनरेखा कैसे बनाया',
    'map.markers.taiwanReligiousDiversity.title':
      'ताइवान की तटीय स्थलाकृति और समुद्री भू-दृश्य',
    'map.markers.taiwanReligiousDiversity.desc':
      'येह्लिउ की क्वीन्स हेड चट्टान की गर्दन हर वर्ष 0.2 सेंटीमीटर की दर से पतली हो रही है और एक दिन टूट जाएगी——यही ताइवान की तटीय स्थलाकृति की नियति और सुंदरता है',
    'map.markers.taiwanBuddhismTaoism.title':
      'ताइवान की चाय परंपरा और जीवन-सौंदर्य',
    'map.markers.taiwanBuddhismTaoism.desc':
      '1981 में विस्टेरिया टी हाउस के उद्घाटन की रात, विपक्षी कार्यकर्ताओं और साहित्यकारों ने चाय पर गोष्ठी की; यह सिर्फ़ चायघर नहीं, बल्कि विपक्षी आंदोलन का गुप्त अड्डा भी था',
    'map.markers.taiwanFolkReligion.title': 'ताइवान में चुनाव और दलीय राजनीति',
    'map.markers.taiwanFolkReligion.desc':
      '1950 के स्थानीय पार्षद चुनावों से लेकर 2000 में सत्ता परिवर्तन तक, देखिए ताइवान ने मतपत्रों से लोकतांत्रिक बदलाव का चमत्कार कैसे रचा',
    'map.markers.taiwanChristianity.title':
      'ताइवान का शहरी विकास और शहर-गांव की खाई',
    'map.markers.taiwanChristianity.desc':
      '70 वर्षों में कृषि प्रधान द्वीप से शहरी द्वीप तक, छह महानगरों में 70 प्रतिशत आबादी के केंद्रीकरण के उजले और स्याह पहलू: समृद्ध ताइचुंग vs उजड़ता युनलिन',
    'map.markers.taiwanIslamJudaism.title':
      'शहरों की विशेषताएं और क्षेत्रीय संस्कृति',
    'map.markers.taiwanIslamJudaism.desc':
      'न्यू ताइपे के 404 लाख लोगों से लेकर ताइनान के 185 लाख लोगों तक, देखिए औद्योगिक बदलाव के बीच छह महानगरों ने अपना अलग शहरी चरित्र कैसे गढ़ा',
    'map.markers.kaohsiungIncident.title': 'लोकतंत्रीकरण',
    'map.markers.kaohsiungIncident.desc':
      '1979年12月10日 को काऊशुंग की सड़कों पर पुलिस और नागरिकों के बीच हुआ टकराव अंततः ताइवान के लोकतांत्रिक बदलाव का कारण बना——लेकिन इसकी कीमत कितने लोगों की जवानी और आज़ादी थी？',
    'map.markers.wangLeeOlympicGold.title':
      'वांग ची-लिन और ली यांग（लिन-यांग जोड़ी）',
    'map.markers.wangLeeOlympicGold.desc':
      'मिडिल स्कूल के सहपाठियों से ओलंपिक स्वर्ण विजेता तक：「लिन-यांग जोड़ी」ने 34 मिनट में चीन को सीधे 2 गेमों में हराकर ताइवान के बैडमिंटन इतिहास का पहला ओलंपिक स्वर्ण पदक जीता',
  },
  ar: {
    // Meta
    'map.meta.title': 'خريطة تايوان',
    'map.meta.description': 'استكشف سياق محتوى Taiwan.md من خلال منظور الخريطة',

    // Hero Section
    'map.hero.kicker': 'عرض الخريطة',
    'map.hero.title': 'خريطة تايوان',
    'map.hero.subtitle':
      'استكشف ثقافة تايوان ومطبخها وطبيعتها ونقاطها التاريخية من خلال منظور الخريطة.',

    // Controls - Region Filter
    'map.controls.region.title': 'تصفية المناطق',
    'map.controls.region.all': 'الكل',
    'map.controls.region.north': 'الشمال',
    'map.controls.region.central': 'الوسط',
    'map.controls.region.south': 'الجنوب',
    'map.controls.region.east': 'الشرق',
    'map.controls.region.islands': 'الجزر',

    // Controls - Category Filter
    'map.controls.category.title': 'تصفية الفئات',
    'map.controls.category.all': 'الكل',
    'map.controls.category.food': '🍜 المأكولات',
    'map.controls.category.history': '📜 التاريخ',
    'map.controls.category.nature': '🌿 الطبيعة',
    'map.controls.category.culture': '🎭 الثقافة',
    'map.controls.category.technology': '💻 التكنولوجيا',
    'map.controls.category.economy': '📈 الاقتصاد',
    'map.controls.category.lifestyle': '🏮 نمط الحياة',
    'map.controls.category.art': '🎨 الفنون',
    'map.controls.category.geography': '🗺️ الجغرافيا',

    // Route Section
    'map.route.title': '🗺️ مسارات مختارة',
    'map.route.normal-mode': 'الوضع العادي',

    // Sidebar - Default
    'map.sidebar.default.title': '📍 استكشف مقالات تايوان',
    'map.sidebar.default.hint':
      'انقر على المقاطعات أو العلامات على الخريطة لاستكشاف المقالات',

    // Sidebar - County
    'map.sidebar.county.clear': '✕ مسح الاختيار',
    'map.sidebar.county.articles-count': 'مقالات',
    'map.sidebar.county.no-articles': 'لا توجد مقالات في هذه المنطقة بعد',

    // Sidebar - Article
    'map.sidebar.article.back': '← رجوع',
    'map.sidebar.article.read-more': 'اقرأ المزيد →',

    // Zoom Controls
    'map.zoom.in': '＋',
    'map.zoom.out': '－',
    'map.zoom.reset': '⌂',

    // Tooltips
    'map.tooltip.county.articles': 'مقال ذو صلة',
    'map.tooltip.county.click': 'انقر لتصفية هذه المنطقة',
    'map.tooltip.marker.reading-time': 'دقائق قراءة',

    // Panel (for compatibility)
    'map.panel.title': 'خريطة معرفة تايوان',
    'map.panel.stat.points': 'نقطة معرفة',
    'map.panel.stat.categories': 'تصنيفات',
    'map.panel.category-distribution': 'توزيع التصنيفات',
    'map.panel.link.graph': '🕸️ شبكة المعرفة',
    'map.panel.link.home': '🏠 نظرة عامة على التصنيفات',

    // Category Names (for JS usage)
    'map.category.history': '📜 التاريخ',
    'map.category.geography': '🗺️ الجغرافيا',
    'map.category.culture': '🎭 الثقافة',
    'map.category.food': '🍜 المأكولات',
    'map.category.art': '🎨 الفنون',
    'map.category.music': '🎵 الموسيقى',
    'map.category.technology': '💻 التكنولوجيا',
    'map.category.nature': '🌿 الطبيعة',
    'map.category.people': '👥 الشخصيات',
    'map.category.society': '⚖️ المجتمع',
    'map.category.economy': '📈 الاقتصاد',
    'map.category.lifestyle': '🏮 نمط الحياة',

    // Additional UI text
    'map.sidebar.more-articles': '⋯ وأخرى',
    'map.sidebar.more-articles-suffix': 'مقال',

    // Routes
    'map.routes.nightMarkets.name': '🍜 جولة أسواق الليل',
    'map.routes.nightMarkets.description':
      'من الشمال إلى الجنوب، ثقافة أسواق الليل الأكثر تمثيلًا في تايوان',
    'map.routes.nationalParks.name': '🏔️ جولة الحدائق الوطنية',
    'map.routes.nationalParks.description':
      'من الجبال الشاهقة على ارتفاع 3,952 متر إلى الشعاب المرجانية الاستوائية، العجائب الطبيعية في تايوان',
    'map.routes.historyTrail.name': '📜 آثار التاريخ',
    'map.routes.historyTrail.description':
      'من الاستعمار الهولندي إلى الديمقراطية، مررنا بأربعة قرون من تاريخ تايوان',
    'map.routes.oldStreets.name': '🏮 جولة في الشوارع القديمة',
    'map.routes.oldStreets.description':
      'ذاكرة تايوان في شوارع عمرها مئة عام، العمارة هي التاريخ',

    'map.routes.counties22.name': '📍 مقالات عميقة عن 22 مقاطعة ومدينة',
    'map.routes.counties22.description':
      'زُر المقالات العميقة الـ 22 عن المقاطعات والمدن في Taiwan.md، من كيتلونغ كنقطة انطلاق إلى شينبيه كنقطة ختامية — لكل مقاطعة ومدينة تناقض جوهري واحد.',
    'map.counties22.panel.title': '📍 مقالات عميقة عن 22 مقاطعة ومدينة',
    'map.counties22.panel.hint':
      'انقر على بطاقة المقاطعة للفتح، أو اختر المقاطعة من الخريطة',
    'map.counties22.tooltip.openDeep': 'انقر لفتح المقال العميق',
    'map.counties22.deepCard.badge':
      '📖 سلسلة الـ 22 مقاطعة ومدينة · مقالات عميقة',
    'map.counties22.deepCard.cta': 'اقرأ المقال كاملاً →',

    // Night Markets Stops
    'map.stops.shilinNightMarket.name': 'سوق شيلين الليلي',
    'map.stops.shilinNightMarket.note':
      'أكبر سوق سياحي ليلي في جميع أنحاء تايوان، مسقط رأس "الكعكة الكبيرة المحاطة بالكيكة الصغيرة"',
    'map.stops.raoheNightMarket.name': 'سوق راوه الليلي',
    'map.stops.raoheNightMarket.note':
      'المكان المقدس لانتظار طابور كعك الفلفل، المفضلة لدى أهل تايبيه',
    'map.stops.ningxiaNightMarket.name': 'سوق نينغشيا الليلي',
    'map.stops.ningxiaNightMarket.note':
      'أعلى كثافة للأطعمة، شارع للأطعمة الشعبية الموصى به من دليل ميشلان',
    'map.stops.fengjiaNightMarket.name': 'سوق فنجيا الليلي',
    'map.stops.fengjiaNightMarket.note':
      'مختبر الابتكار للأطباق الخفيفة، الجبهة الأمامية لابتكار أسواق تايوان الليلية',
    'map.stops.huayuanNightMarket.name': 'سوق هوايوان الليلي',
    'map.stops.huayuanNightMarket.note':
      'أكبر سوق ليلي في تاينان، احتفال محدود يفتح ثلاثة أيام فقط في الأسبوع',
    'map.stops.liuheNightMarket.name': 'سوق ليوهي الليلي',
    'map.stops.liuheNightMarket.note':
      'سوق ليلي رمزي في كاوهسيونغ، حيث الأسماك والمأكولات البحرية هي البطل',

    // National Parks Stops
    'map.stops.yangmingshanNationalPark.name': 'الحديقة الوطنية يانغمينغشان',
    'map.stops.yangmingshanNationalPark.note':
      'حديقة تايبيه الخلفية، تضاريس بركانية وأسرار الينابيع الساخنة',
    'map.stops.tarokoNationalPark.name': 'الحديقة الوطنية تاروكو',
    'map.stops.tarokoNationalPark.note':
      'وادي الرخام، ظاهرة جيولوجية عالمية المستوى',
    'map.stops.yushanNationalPark.name': 'حديقة يوشان الوطنية',
    'map.stops.yushanNationalPark.note':
      'أعلى قمة في شمال شرق آسيا (3,952 م)، عمود تايوان',
    'map.stops.alishanScenicArea.name': 'منطقة عليشان السياحية الوطنية',
    'map.stops.alishanScenicArea.note':
      'شروق الشمس، بحر السحب، غابات الأشجار القديمة وسكك الحديد الغابية',
    'map.stops.sunMoonLakeScenicArea.name':
      'منطقة بحيرة الشمس والقمر السياحية الوطنية',
    'map.stops.sunMoonLakeScenicArea.note':
      'أكبر بحيرة طبيعية في تايوان، البحيرة المقدسة لقبيلة شاو',
    'map.stops.kentingNationalPark.name': 'حديقة كنتينغ الوطنية',
    'map.stops.kentingNationalPark.note':
      'أقصى جنوب تايوان، الشعاب المرجانية الاستوائية وشبه جزيرة hengchun',

    // History Trail Stops
    'map.stops.anpingFort.name': 'قلعة أنبينغ القديمة',
    'map.stops.anpingFort.note':
      'بناها الهولنديون عام 1624، أقدم قلعة في تايوان',
    'map.stops.chikanTower.name': 'برج تشيكان',
    'map.stops.chikanTower.note':
      'من قلعة فوكييان الهولندية إلى رمز حكم تشنغ تشنغ كونغ',
    'map.stops.lukang.name': 'لوكانغ',
    'map.stops.lukang.note':
      'المدينة الثانية في تايوان خلال عهد تشينغ، "مقاطعة واحدة، مدينتان، ثلاثة ميناءات"',
    'map.stops.presidentialOffice.name':
      'مكتب الرئاسة (مقر الحاكم العام السابق لتايوان)',
    'map.stops.presidentialOffice.note':
      'تم بناؤها عام 1919، مركز السلطة العليا في فترة الحكم الياباني',
    'map.stops.chiangKaiShekMemorialHall.name': 'قاعة تشيانغ كاي شيك التذكارية',
    'map.stops.chiangKaiShekMemorialHall.note':
      'رمز الاستبداد ومحور جدال التحول العادل',
    'map.stops.legislativeYuan.name': 'المجلس التشريعي (حركة زهرة الربيع)',
    'map.stops.legislativeYuan.note':
      'موقع حركة طلاب زهرة الربيع عام 2014، علامة فارقة في ديمقراطية تايوان',

    // Old Streets Stops
    'map.stops.dihuaStreet.name': 'شارع ديهوا',
    'map.stops.dihuaStreet.note':
      'قلب داوديانغ، شارع البضائع الشمالية والجنوبية وأعياد رأس السنة',
    'map.stops.jiufenOldStreet.name': 'شارع جيوفن القديم',
    'map.stops.jiufenOldStreet.note':
      'سنوات الذهب في التعدين ومصدر إلهام فيلم "هملت"',
    'map.stops.lukangOldStreet.name': 'شارع لوكانغ القديم',
    'map.stops.lukangOldStreet.note':
      'متحف حي للبيوت القديمة الطوبية والحرف التقليدية',
    'map.stops.anpingOldStreet.name': 'شارع أنبين القديم',
    'map.stops.anpingOldStreet.note':
      'أقدم شارع في تايوان، تراكم تاريخي يمتد لأربعة قرون',
    'map.stops.qishanOldStreet.name': 'شارع تشيشان القديم',
    'map.stops.qishanOldStreet.note': 'مجمعات معمارية باروكية في مملكة الموز',
    'map.stops.tamsuiOldStreet.name': 'شارع تانسيوي القديم',
    'map.stops.tamsuiOldStreet.note':
      'غروب الشمس، أغفي، وسحر تاريخي عند مصب نهر تانسيوي',

    // Cities
    'map.city.taipei': 'تايبيه',
    'map.city.newTaipei': 'تايبيه الجديدة',
    'map.city.keelung': 'كيلونغ',
    'map.city.taoyuan': 'تاويوان',
    'map.city.hsinchu': 'هسينتشو',
    'map.city.miaoli': 'مياولي',
    'map.city.taichung': 'تايchung',
    'map.city.changhua': 'تشانغهوا',
    'map.city.nantou': 'نانتو',
    'map.city.chiayi': 'تشيائي',
    'map.city.tainan': 'تاينانغ',
    'map.city.kaohsiung': 'كاوهسيونغ',
    'map.city.pingtung': 'بينغتونغ',
    'map.city.yilan': 'ييلان',
    'map.city.hualien': 'هوالين',
    'map.city.taitung': 'تايتونغ',
    'map.city.penghu': 'بنغهو',
    'map.city.kinmen': 'جينمن',

    // Markers
    'map.markers.founderCheYuWu.title': 'المؤسس — وو زهييو Che-Yu Wu',
    'map.markers.founderCheYuWu.desc':
      'من الكود إلى الشعر: طريق الاختراق الدولي لفنان تايواني',
    'map.markers.taiwanIndigenousContemporaryArt.title':
      'الفن المعاصر للسكان الأصليين في تايوان',
    'map.markers.taiwanIndigenousContemporaryArt.desc':
      'من الحرف التقليدية إلى الإبداعات المعاصرة، استكشف كيف يعبّر فنانون تايوانيون أصليون عن أصواتهم على المسرح الفني العالمي، ويعيدون تعريف حوار الهوية الأصلية مع الفن المعاصر',
    'map.markers.taiwanExperimentalNewMediaArt.title':
      'الفن التجريبي والإعلام الجديد في تايوان',
    'map.markers.taiwanExperimentalNewMediaArt.desc':
      'من فن الفيديو إلى التفاعل بالواقع الافتراضي، استكشف التطور المبتكر لفن الإعلام الجديد في تايوان والنظام البيئي للفن التكنولوجي',
    'map.markers.taiwanArchitecture.title': 'الهندسة المعمارية في تايوان',
    'map.markers.taiwanArchitecture.desc':
      'من بيت الحجارة إلى ناطحة السحاب: رحلة معمارية عبر الزمن في جزيرة تايوان',
    'map.markers.taiwanNewMediaArt.title': 'الفنون الإعلامية الجديدة في تايوان',
    'map.markers.taiwanNewMediaArt.desc': 'استكشاف ثقافة تايوان وقصصها',
    'map.markers.taiwanWatercolorCenturyEvolution.title':
      'التطور المائتي اللون في فن الرسم المائي التايواني',
    'map.markers.taiwanWatercolorCenturyEvolution.desc':
      'من إرشادات ستوكاوا كينيتشيرو في حقبة الحكم الياباني، إلى شهرة جيان تشونغ وي المعاصرة على الساحة الدولية، قطع فن الرسم المائي في تايوان مسيرته المائتي اللون ليصبح مركزًا نشطًا للإبداع المائي في آسيا.',
    'map.markers.taiwanModernPoetry.title': 'الشعر الحديث في تايوان',
    'map.markers.taiwanModernPoetry.desc':
      'كيف ولّد التجريب الحداثي، النابع من ثلاثة مكتبات شخصية، بشكل غير متوقع ثورة شعرية ذات طابع محلي أصيل',
    'map.markers.taiwanContemporarySculpture.title':
      'تطور النحت المعاصر في تايوان',
    'map.markers.taiwanContemporarySculpture.desc':
      'استكشاف مسارات تطور النحت التايواني وروحه الإبداعية، من يانغ يينغ فونغ وجو مينغ إلى الجيل الجديد',
    'map.markers.taiwanCuratorsArtCulture.title':
      'المعرضون التايوانيون وبناء الثقافة والفنون',
    'map.markers.taiwanCuratorsArtCulture.desc':
      'من المعارض المستقلة إلى نظام المتاحف، كيف يبني معرضو تايوان الخطابات الثقافية للفنون المعاصرة والحوار الدولي',
    'map.markers.newMediaArt.title': 'الفنون الإعلامية الجديدة',
    'map.markers.newMediaArt.desc':
      'الاستكشاف الرائد للفنون الرقمية في تايوان، حيث يندمج العلم والإنسان من المختبر إلى المسرح الدولي',
    'map.markers.contemporaryTaiwanLiterature.title': 'الأدب التايواني المعاصر',
    'map.markers.contemporaryTaiwanLiterature.desc':
      'استكشاف ثقافة تايوان وقصصها',
    'map.markers.taiwanContemporaryArt.title': 'الفنون التايوانية المعاصرة',
    'map.markers.taiwanContemporaryArt.desc':
      'المكانة الفريدة للفنون التايوانية المعاصرة على المسرح العالمي، من متحف الفنون الجميلة في تايبيه إلى جناح تايوان في بينالي البندقية',
    'map.markers.kinmenGuesthouseMuseum.title': 'متحف كينمن للضيوف المعاصر',
    'map.markers.kinmenGuesthouseMuseum.desc':
      'محطة عسكرية من حقبة الحرب الباردة شهدت الفراق واللمّ، استيقظت بعد عشرين عامًا من السكون على يد أب وابنته لتصبح المتحف الموصى به في كائونه الأول من دليل "ليون جارد" في غاوشيونغ.',
    'map.markers.renjianMagazine.title': 'مجلة رينجيان',
    'map.markers.renjianMagazine.desc':
      'العدد 47، على مدى أربع سنوات، ثورة هادئة انطلقت عبر التصوير الفوتوغرافي والنصوص — نقطة انطلاق الأدب التايواني التقريرية',
    'map.markers.taiwanIndigenousCulture.title':
      'ثقافة السكان الأصليين في تايوان',
    'map.markers.taiwanIndigenousCulture.desc':
      'من التقاليد المتنوعة للستة عشر مجموعة إلى إحياء الفنون المعاصرة، استكشاف الجذور العميقة للثقافة التايوانية الأصلية وتحولاتها الحديثة',
    'map.markers.taiwan16IndigenousTribes.title':
      'خريطة ثقافية لستة عشر قبيلة من السكان الأصليين في تايوان',
    'map.markers.taiwan16IndigenousTribes.desc':
      'استكشاف المناطق الموزعة للستة عشر مجموعة من السكان الأصليين في تايوان، وأنظمة لغاتهم، والاحتفالات الهامة، والتطورات في الإبداع المعاصر، لفهم المشهد الثقافي المتنوع للسكان الأصليين في تايوان',
    'map.markers.taiwanNightMarketCulture.title':
      'ثقافة أسواق الليل والمأكولات الشعبية في تايوان',
    'map.markers.taiwanNightMarketCulture.desc':
      'استكشاف عميق الخلفية التاريخية لتشكل ثقافة أسواق الليل في تايوان، وسحرها الفريد، وقصص تاريخية ومعاني ثقافية لأشهر المأكولات الشعبية',
    'map.markers.taiwanSensibilityKoreanPerspective.title':
      'الإحساس التايواني: الجمالية التايوانية من منظور كوري',
    'map.markers.taiwanSensibilityKoreanPerspective.desc':
      'من مقاطع موسيقى K-pop إلى معرض سيول للكتب، كيف جعلت «اللمسة التايوانية» (대만감성) الشوارع اليومية في تايوان رمزًا جماليًا الأكثر جاذبية في آسيا',
    'map.markers.taiwanCulturalCreativeParks.title':
      'تطور المتنزهات الثقافية والإبداعية في تايوان',
    'map.markers.taiwanCulturalCreativeParks.desc':
      'من إحياء المباني القديمة إلى تجمعات إبداعية، رحلة تطور المتنزهات الثقافية والإبداعية في تايوان ونماذجها المبتكرة',
    'map.markers.taiwanOldStreetCulture.title':
      'ثقافة الشوارع القديمة والمناطق التجارية في تايوان',
    'map.markers.taiwanOldStreetCulture.desc':
      'من ازدهار الموانئ في عهد أسرة تشينغ إلى العمارة الباروكية الغربية في حقبة الحكم الياباني، شارع تايوان القديم هو تاريخ شعبي مكتوب بالطوب والقرميد',
    'map.markers.taiwanTeaCeremonyLifeAesthetics.title':
      'طقوس الشاي والجماليات الحياتية في تايوان',
    'map.markers.taiwanTeaCeremonyLifeAesthetics.desc':
      'من شاي الكونغ فو إلى جماليات طاولة الشاي، استكشاف كيفية دمج تايوان وتحويلها للابتكار بين ثقافة الشاي الشرقية والجماليات الحياتية المحلية',
    'map.markers.taiwanStreetArtGraffiti.title':
      'فن الشارع والجرافيتي في تايوان',
    'map.markers.taiwanStreetArtGraffiti.desc':
      'من الجرافيتي تحت الأرض إلى اللوحات الجدارية القانونية، كيف أصبحت جدران المدن مسرحًا لإبداع الفنانين التايوانيين',
    'map.markers.taiwanIncenseMakingCulture.title':
      'ثقافة صنع البخور وموطن صناعه في تايوان',
    'map.markers.taiwanIncenseMakingCulture.desc':
      'من حرفة صنع العطور الممتدة لقرون في مجتمع يونكسو من جياي، إلى صناعة العطور المنتشرة في جميع أنحاء الجزيرة — مهنة قديمة تجمع بين الإيمان العميق، والحرفية، والإصرار',
    'map.markers.taiwanHomophoneTaboos.title':
      'ثقافة المحظورات الصوتية في تايوان: لماذا يتخطى المجتمع بأكمله الطابق الرابع؟',
    'map.markers.taiwanHomophoneTaboos.desc':
      'من عدم وجود طابق رابع في المستشفيات إلى بيع لوحة ترخيص السيارة 8888 بأعلى سعر في المزادات، يُعد حساسية التايوانيين تجاه التناغم الصوتي من أعلى مستوياتها في العالم',
    'map.markers.hakkaCultureLanguage.title': 'ثقافة ولغة الهكا',
    'map.markers.hakkaCultureLanguage.desc':
      'روح العناد وجيو تشوان: الإرث الثقافي لشعب الهكا في تايوان والتجديد المعاصر',
    'map.markers.ethnicGroupsTaiwan.title':
      'المجموعات العرقية (مينان، الهكا، السكان الأصليون، الخارجيون، المقيمون الجدد)',
    'map.markers.ethnicGroupsTaiwan.desc':
      'تنوع المجموعات العرقية في تايوان ليس مجرد نتيجة للتطور التاريخي، بل هو أيضًا المفتاح لفهم المجتمع التايواني المعاصر. إن هيكل المجتمع هذا الذي يتعايش فيه الجميع، هو مصدر الإبداع الثقافي في تايوان، وهو أيضًا أساس مهم لتطوير السياسة الديمقراطية. كيف يمكن، مع احترام الخصائص الثقافية لكل مجموعة عرقية، بناء هوية تايوانية مشتركة، هو موضوع مهم مستمر يواجهه المجتمع التايواني.',
    'map.markers.chinaSteel.title':
      'شركة الصين للصلب: قصة الصلب الأسطورية لوزير "الرأس الحديدي" ومشاريع البناء العشرة الكبرى',
    'map.markers.chinaSteel.desc':
      'من ذكاء تشاو ياودونغ في التفاوض على التكنولوجيا مع أوروبا وأمريكا، إلى أول دخان أبيض يرتفع من شياوغانغ في كاوهسيونغ، بنى الصلب الصيني العمود الفقري للصناعة الثقيلة في تايوان على مدى 50 عامًا، وهو ألمع جوه في مشاريع البناء العشرة الكبرى',
    'map.markers.taiwanCement.title':
      'تايوان للإسمنت: قصة التحول الأخضر لأول شركة مدرجة في تايوان',
    'map.markers.taiwanCement.desc':
      'تأسست بورصة تايوان للقيم المالية في عام 1962 من أجلها، ورقم السهم 1101 يرمز إلى أصل سوق الأسهم التايواني. من إدارة عائلة غو على مدى ثلاثة أجيال لمدة 76 عامًا، شهدت أفران الإسمنت في تايوان للإسمنت معجزات البناء في تايوان، والآن تتحول إلى شركة خضراء لمواجهة عصر الحياد الكربوني',
    'map.markers.tsmc.title': 'شركات تايوان: شركة تايوان لصناعة أشباه الموصلات',
    'map.markers.tsmc.desc':
      'الرائد العالمي في تصنيع الرقائق، يمسك بالشريان الحيوي الحاسم للحضارة الرقمية البشرية',
    'map.markers.chimeiCorporation.title':
      'شركة تشيمي الصناعية: مملكة أكسيلي من شو ون لون وحلم المتحف',
    'map.markers.chimeiCorporation.desc':
      'بدأت من مصنع صغير في رينده، تاينان في عام 1960، بنى شو ون لون مملكة ABS الأكبر في آسيا طوال حياته، وأنشأ أيضًا متحف تشيمي لإعطاء المجتمع. أثبت أن الشركات التايوانية يمكنها الجمع بين النجاح التجاري والاهتمام الإنساني',
    'map.markers.acer.title':
      'مجموعة هونداي (Acer) - رائد التغيير في صناعة الحواسيب الشخصية',
    'map.markers.acer.desc':
      'رائد الحواسيب الشخصية الذي انطلق من تايتونغ في تايوان، خلق نموذج أعمال "متعدد العلامات التجارية، متعدد القنوات"، وأصبح محرك التغيير في صناعة الحواسيب الشخصية العالمية',
    'map.markers.giantBicycles.title':
      'شركات تايوان: giant bicycles (المركبات العملاقة)',
    'map.markers.giantBicycles.desc':
      'من العبيد في التصنيع الذين تخلت عنهم الشركات العملاقة الأمريكية إلى الإمبراطورية الخفية التي تحدد معايير تقنية الدراجات الهوائية عالميًا',
    'map.markers.quantaComputer.title': 'شركة تايوانية: غوانغ داه كومبيوتر',
    'map.markers.quantaComputer.desc':
      'من حرائق المصانع إلى ملك الحواسيب المحمولة العالمي، كيف بنى لين باي لي إمبراطورية جديدة في عصر الذكاء الاصطناعي؟',
    'map.markers.aseGroup.title': 'شركة تايوانية: مجموعة أسيمك سيكوندكتر',
    'map.markers.aseGroup.desc':
      'أكبر مصنع في العالم للتغليف والاختبار، لماذا حوّل صاحب الشركة تركيزه إلى أشباه الموصلات؟',
    'map.markers.esunFinancialHolding.title':
      'شركة تايوانية: يو شان المالية القابضة',
    'map.markers.esunFinancialHolding.desc':
      'من البنك المتخصص في بطاقات الائتمان إلى رائد في الخدمات المالية الرقمية، قصة اختراق أصغر مدير تنفيذي لمجموعة مالية عمره 43 عامًا',
    'map.markers.changChunPetrochemical.title':
      'شركة تايوانية: تشانغ تشون للبتروكيماويات',
    'map.markers.changChunPetrochemical.desc':
      'من مصنع صغير في تاي نانغ عام 1949 إلى عملاق كيميائي عالمي، قصة البطل الخفي الذي «لا يطرح أسهمًا ولا يقترض أموالًا»',
    'map.markers.formosaPlasticsGroup.title':
      'شركة تايوانية: تشانغ رونغ للشحن البحري',
    'map.markers.formosaPlasticsGroup.desc':
      'من سفينة مستعملة واحدة إلى إمبراطورية شحن بحري عالمية، أسطورة المياه الزرقاء لتشانغ يونغ فا',
    'map.markers.taipeiFubon.title':
      'اقتصاد أسواق الطعام الليلية: معجزة تجارية بدون علامة تجارية',
    'map.markers.taipeiFubon.desc':
      'استكشف كيف تخلق أسواق الطعام الليلية في تايوان معجزة اقتصادية بقيمة إنتاج سنوية تقارب 400 مليار دون وجود علامة تجارية أو ديكور أو موقع ثابت',
    'map.markers.taiwan7Eleven.title': 'صناعة القهوة في تايوان',
    'map.markers.taiwan7Eleven.desc':
      'من أصول الزراعة في حقبة الحكم الياباني إلى بطل العالم في سيمبل كافا، تاريخ التطور المئوي لقهوة تايوان',
    'map.markers.taiwanHighSpeedRail.title':
      'خريطة الوجبات الخفيفة المحلية في تايوان',
    'map.markers.taiwanHighSpeedRail.desc':
      'من دينغ بيان هو في معبد كيتشينغ إلى أقدام الخنزير في وان لوان بينغشي، من كونغ وان في هسينتشو إلى الساكى في تاي تونغ، لكل مدينة حمضها النووي الذوقي الخاص. اتبع خطوات السكان المحليين واكتشف أكثر الوجبات الخفيفة المحلية تمثيلاً في 22 مقاطعة ومدينة في تايوان، واستمتع بأصوات الثقافة الشعبية الأكثر أصالة في الجزيرة.',
    'map.markers.taiwanSemiconductorIndustry.title':
      'أطباق تايوان التقليدية: ذكريات ذائقة تختفي',
    'map.markers.taiwanSemiconductorIndustry.desc':
      'من دجاج النعناع في جيا يي إلى حساء مخلفات الخضار، الأطباق المميزة لجداتنا تحمل ذكريات العائلة، لكنها تتلاشى ببطء في ظل التحولات الزمنية',
    'map.markers.taiwanBankingSystem.title':
      'اندماج المأكولات الجديدة في تايوان',
    'map.markers.taiwanBankingSystem.desc':
      'عندما تلتقي الحامض الحار التايلاندي بالحلو المالح التايواني، وعندما تتقابل حساء الفيناميت مع الأطباق المخللة التايوانية، وعندما تحتضن التوابل الإندونيسية المكونات المحلية، تحدث ثورة ذوقية عابرة للحدود في تايوان بهدوء. لا يجلب المقيمون الجدد فقط أطباق بلدانهم الأصلية، بل أيضًا إمكانيات جديدة غنية لثقافة الطعام التايوانية.',
    'map.markers.taiwanSmes.title': 'مملكة الفواكه التايوانية',
    'map.markers.taiwanSmes.desc':
      'من المانغو والليشي إلى الجاك فروت والوا لوف، أسطورة حلوة من تنوع الفواكه الاستوائية والاختراقات التقنية الزراعية',
    'map.markers.youbikePublicBikeSystem.title':
      'ثقافة المأكولات البحرية التايوانية',
    'map.markers.youbikePublicBikeSystem.desc':
      'توصيل طازج من الموانئ السمكية، وثقافة مطاعم المأكولات البحرية، وأطباق المأكولات البحرية مثل كعكة المحار، مما يعرض خصائص الجزيرة المحاطة بالبحار من جميع الجوانب والتقاليد الغذائية الغنية للمأكولات البحرية في تايوان',
    'map.markers.taiwanFoodBeverageIndustry.title':
      'مطعم ميشلان وتناول الطعام الفاخر في تايوان',
    'map.markers.taiwanFoodBeverageIndustry.desc':
      'في عام 2018، ظهرت غلاف دليل ميشلان الأحمر لأول مرة بكلمة "تايبيه"، مما يشير إلى دخول صناعة المطاعم التايوانية رسميًا إلى نظام التقييم الدولي. من أكشاك الشوارع إلى المطاعم النجمية، ومن الطعام الشعبي إلى الأطباق الفاخرة، تظهر الثقافة الغذائية التايوانية على المسرح الدولي مظهرًا جذابًا يجمع بين التقليد والابتكار.',
    'map.markers.taiwanAgriculturalReform.title': 'ثقافة أسواق الليل',
    'map.markers.taiwanAgriculturalReform.desc':
      '164 سوق ليل تحت الإشراف، يتمتع في تاينان كل 38 ألف شخص بسوق ليل واحد، من ساحات المعابد إلى الوجهات السياحية الدولية',
    'map.markers.taiwanTeaIndustry.title': 'ثقافة الطعام الهكا',
    'map.markers.taiwanTeaIndustry.desc':
      'الثقافة الغذائية الغنية والمتنوعة لشعب الهكا، من الرائحة الغنية والكثيفة للشاي المخلوط إلى جو الجبال والغابات لأرزونج الزنجبيل البري، مما يعرض الحكمة الحياتية لشعب الهكا في الادخار والكفاح واستخدام المواد المحلية',
    'map.markers.taiwanFishingIndustry.title': 'نودلز لحم البقر',
    'map.markers.taiwanFishingIndustry.desc':
      'من حنين المهاجرين الخارجيين إلى طعام الشعب الوطني في تايوان، الاندماج الثقافي ونفحات العطر العالمية لنودلز لحم البقر',
    'map.markers.taiwanFruitIndustry.title': 'ثقافة الشاي',
    'map.markers.taiwanFruitIndustry.desc':
      'تطور ثقافة الشاي في تايوان من فن الشاي التقليدي إلى مشروبات الشاي الحديثة، مما يعرض أصناف الشاي الفريدة للجزيرة وثقافة شرب الشاي',
    'map.markers.taiwanRiceVarieties.title':
      'على الجزيرة الهزوزة، بنوا برجًا يمكنه الطيران',
    'map.markers.taiwanRiceVarieties.desc':
      'على بعد 200 متر فقط من الصدع النشط، يصر الناس في تايوان على بناء أطول ناطحة سحاب في العالم على أكثر الأراضي عدم استقرارًا — ثم صعد مجنون على الأيدي لمدة 91 دقيقة.',
    'map.markers.nightMarketCulture.title':
      'المعالم الجغرافية الخمسة الكبرى في تايوان وهيكلها الجغرافي: من السلاسل الجبلية إلى السهول، ملامح الجزيرة',
    'map.markers.nightMarketCulture.desc':
      'استكشف الهيكل الجغرافي الفريد لتايوان، من سلسلة جبال المركزية إلى السهول الغربية، وتعرّف على تنوع تضاريس هذه الجزيرة',
    'map.markers.bubbleTeaGlobalPhenomenon.title':
      'شبكة النقل والمواصلات في تايوان',
    'map.markers.bubbleTeaGlobalPhenomenon.desc':
      'القطارات فائقة السرعة، والمترو، والطرق السريعة، والطيران، تشكّل شبكة نقل ثلاثية الأبعاد تربط أجزاء تايوان',
    'map.markers.taiwanBeefNoodle.title':
      'نظام مناطق الجذب السياحي الوطنية في تايوان',
    'map.markers.taiwanBeefNoodle.desc':
      'من الزاوية الشمالية الشرقية إلى كيندينغ، تُظهر المناطق السياحية الوطنية الـ 13 في تايوان مناظر طبيعية وثقافية غنية',
    'map.markers.taiwanHotPotCulture.title':
      'خصائص وتكوين جغرافيا جزيرة تايوان',
    'map.markers.taiwanHotPotCulture.desc':
      'استكشف الخصائص الجغرافية الفريدة لجزيرة تايوان، من حركة الصفائح التكتونية إلى الهيكل التضاريسي، واكتشف الأسرار الطبيعية لجزيرة فورموزا',
    'map.markers.taiwanFineDining.title':
      'حركة الصفائح التكتونية والنشاط الزلزالي في تايوان',
    'map.markers.taiwanFineDining.desc':
      'استكشاف الخصائص الجيولوجية لتايوان الواقعة عند حدود تقاطع صفيحة أوراسيا وصفيحة بحر الفلبين، والأسباب الكامنة وراء النشاط الزلزالي المتكرر',
    'map.markers.taiwanStreetFood.title':
      'السدود وإدارة الموارد المائية في تايوان',
    'map.markers.taiwanStreetFood.desc':
      'من أزمة نقص المياه إلى ترسيب السدود، التحديات التي تواجه الموارد المائية في تايوان وصعوبات عدم التوزيع العادل بين الشمال والجنوب',
    'map.markers.taiwanVegetarianCulture.title':
      'نظام الأنهار وخصائص الهيدرولوجيا في تايوان: الجريان المائي السريع والقصير والتغيرات الموسمية',
    'map.markers.taiwanVegetarianCulture.desc':
      'استكشف نظام الأنهار الفريد في تايوان، من نهر تشويشوي إلى نهر غاوبينغ، وتعرّف على كيفية تشكيل تضاريس الجزيرة للخصائص الهيدرولوجية لتايوان',
    'map.markers.taiwanCoffeeCulture.title':
      'التضاريس الساحلية والمناظر البحرية في تايوان',
    'map.markers.taiwanCoffeeCulture.desc':
      'من السواحل الخلجية الشمالية إلى السواحل الصدعية الشرقية، تُظهر التضاريس الساحلية المتنوعة والغنية في تايوان براعة حركة الصفائح التكتونية',
    'map.markers.taiwanSnackCulture.title':
      'المناظر الحرارية المائية في تايوان',
    'map.markers.taiwanSnackCulture.desc':
      'بيتو، تشيبان، جياوشي، التقاء جميل بين الثقافة الحرارية المائية والعلوم الجيولوجية',
    'map.markers.taiwanSeafoodCulture.title':
      'مراكز التنوع البيولوجي في تايوان',
    'map.markers.taiwanSeafoodCulture.desc':
      'تتزاحم 59,000 نوع من الكائنات الحية ضمن 36,000 كيلومتر مربع من الجزيرة، والكثافة أعلى بمئة مرة من المتوسط العالمي',
    'map.markers.taiwanPineappleCake.title':
      'مناظر الزراعة والتوزيع الصناعي في تايوان',
    'map.markers.taiwanPineappleCake.desc':
      'التغيرات في المناظر الزراعية من الشمال إلى الجنوب، تبرز مسار تحول تايوان من «مخزن الحبوب لتايوان» إلى «الزراعة الدقيقة»',
    'map.markers.taiwanPorkRibSoup.title':
      'التطور الحضري والفجوة بين المدينة والريف في تايوان',
    'map.markers.taiwanPorkRibSoup.desc':
      'التطور غير المتكافئ بين الريف والمدينة في تايوان تحت هيكلية «المدن الست»، التحول المكاني من تايوان الزراعية إلى تايوان الحضرية',
    'map.markers.taiwanOysterOmelette.title': 'التضاريس والجيولوجيا',
    'map.markers.taiwanOysterOmelette.desc':
      'جزيرة عمرها 6 ملايين سنة، تخفي ذاكرة قديمة عمرها 200 مليون سنة — عجيبة في أصغر نطاق جبلي في العالم وأكثر تصادمات الصفائح تواترًا',
    'map.markers.taiwanBreakfastCulture.title':
      'خصائص المدن والثقافة الإقليمية',
    'map.markers.taiwanBreakfastCulture.desc':
      'من العاصمة الدولية في تايبيه إلى طابع العاصمة القديمة في تاينان، كيف تشكلت هوية محلية فريدة في مختلف مدن تايوان',
    'map.markers.taiwanConvenienceStoreFood.title':
      'ثقافة الجزر النائية والمحيط: من كثافة أحواض الصيد الحجرية الأولى عالميًا إلى القوانين البيئية لموسم أسماك الطيران',
    'map.markers.taiwanConvenienceStoreFood.desc':
      'أقل من 600 حوض صيد حجري في العالم، و574 منها في بيسكو. شعب جزيري متخصص في صيد أسماك الطيران، حوّل المحظورات إلى نظام إدارة موارد محيطية دقيق للغاية',
    'map.markers.dutchSpanishColonialPeriod.title':
      'حادث 28 فبراير والإرهاب الأبيض: الصدمة والذاكرة في ظل الحكم الاستبدادي لتايوان',
    'map.markers.dutchSpanishColonialPeriod.desc':
      'من حادث 28 فبراير عام 1947 إلى نظام الحكم العسكري الذي استمر 38 عامًا، عانت تايوان من عنف الدولة في ظل الحكم الاستبدادي، ولم تبدأ في مواجهة الصدمات التاريخية ودفع العدالة الانتقالية إلا بعد رفع الأحكام العسكرية.',
    'map.markers.zhengDynastyPeriod.title':
      'أزمة مضيق تايوان وتطور العلاقات عبر المضيق',
    'map.markers.zhengDynastyPeriod.desc':
      'استعراض ثلاث أزمات كبرى في مضيق تايوان ومسار تطور العلاقات عبر المضيق لأكثر من 70 عامًا، لفهم السياق التاريخي للوضع في مضيق تايوان والتحديات المعاصرة',
    'map.markers.qingDynastyTaiwanHistory.title':
      'تاريخ التجارة البحرية في تايوان',
    'map.markers.qingDynastyTaiwanHistory.desc':
      'تايوان في عصر الملاحة الكبرى، من مركز التجارة الدولية إلى أسطورة صعود وسقوط مملكة القراصنة',
    'map.markers.japaneseColonialRule.title': 'تاريخ قرى المهاجرين في تايوان',
    'map.markers.japaneseColonialRule.desc':
      'من الجيش المنعزل في ميانمار إلى مملكة السياج الخيزراني، كيف أعادت الهجرة الكبرى لـ1.2 مليون شخص تعريف «المنزل»',
    'map.markers.februaryTwentyEightIncident.title':
      'تاريخ السكك الحديدية في تايوان',
    'map.markers.februaryTwentyEightIncident.desc':
      'من ليو مينغتشوان في عهد أسرة تشينغ إلى الخط الرئيسي في الحقبة اليابانية إلى القطارات فائقة السرعة، كيف شكّلت السكك الحديدية التطور الحضري والذاكرة الثقافية لتايوان',
    'map.markers.martialLawPeriod.title':
      'انتقال حكومة الكومينتانغ إلى تايوان وإعادة الإعمار بعد الحرب',
    'map.markers.martialLawPeriod.desc':
      'استكشاف الخلفية التاريخية وعملية وتأثير انتقال حكومة الكومينتانغ إلى تايوان عام 1949، وإعادة الإعمار السياسي والاقتصادي والاجتماعي لتايوان بعد الحرب',
    'map.markers.democratization.title': 'الفترة اليابانية',
    'map.markers.democratization.desc':
      'حكم اليابان لتايوان لمدة 50 عامًا بين عامي 1895 و1945، حيث جلب بناءً حديثًا شاملاً وإدارة مؤسسية، مع تطبيق سياسات التنصت التي أثّرت بعمق في تطور المجتمع التايواني',
    'map.markers.taiwanIndependenceMovement.title': 'الفترة التشينغية',
    'map.markers.taiwanIndependenceMovement.desc':
      'حكم أسرة تشينغ لتايوان لمدة حوالي 212 عامًا بين عامي 1683 و1895، من الحكم السلبي إلى البناء النشط، مما وضع الأساس لتقسيمات تايوان الإدارية الحديثة والمجتمع الصيني',
    'map.markers.taiwanChinaRelations.title':
      'فترة حكم هونغشي وتشينغ تشونغ-تشينغ',
    'map.markers.taiwanChinaRelations.desc':
      'أول حكم استعماري منهجي في تاريخ تايوان، من بناء الهولنديين لقلعة زيلانديا إلى تشينغ تشونغ-تشينغ الذي أسس تايوان، مما وضع الأساس لهجرة الصينيين ونظامهم السياسي',
    'map.markers.taiwanUsRelations.title': 'ثقافة المتاجر الصغيرة',
    'map.markers.taiwanUsRelations.desc':
      'كيف تحولت متاجر تايوان الصغيرة ذات الكثافة الأولى عالميًا من محلات بيع التجزئة إلى نظام تشغيلي كامل لحياة الدولة',
    'map.markers.taiwanInternationalStatus.title': 'نظام النقل في تايوان',
    'map.markers.taiwanInternationalStatus.desc':
      'القطارات فائقة السرعة تعبر الشمال والجنوب في 90 دقيقة، والمترو يشبّك الشرايين الحضرية بكثافة، والدراجات النارية تتنقل بين الأزقة',
    'map.markers.taiwanHistoricalFigures.title':
      'ثقافة المتاجر الصغيرة في تايوان',
    'map.markers.taiwanHistoricalFigures.desc':
      'مملكة المتاجر الصغيرة ذات الكثافة الأولى عالميًا، مع الابتكارات المحلية لـ 7-11 و FamilyMart، تعيد تعريف نمط الحياة الحديث',
    'map.markers.taiwanPoliticalFigures.title': 'حدائق تايوان والترفيه اليومي',
    'map.markers.taiwanPoliticalFigures.desc':
      'من التاي تشي في الصباح الباكر إلى المشي ليلاً - ملاحظة ثقافية لحدائق تايوان كفضاء اجتماعي يمتد عبر الأجيال',
    'map.markers.kuomintangHistory.title': 'ثقافة القهوة في تايوان',
    'map.markers.kuomintangHistory.desc':
      'كثافة المقاهي المستقلة ضمن أفضل ثلاث دول عالميًا، من حبوب أليشان إلى ثقافة المقاهي المكتبية، علم القهوة في الجزيرة',
    'map.markers.democraticProgressivePartyHistory.title':
      'جزيرة مطاردة شاحنات القمامة: من أزمة النفايات إلى معجبة إعادة التدوير في تايوان',
    'map.markers.democraticProgressivePartyHistory.desc':
      'مكان كان يُطلق عليه الإعلام الدولي لقب "جزيرة النفايات" في تسعينيات القرن الماضي بسبب وجود 400 مكب نفايات ممتلئًا وشيكًا، استخدم موسيقى بيتهوفن لجعل 23 مليون شخص يطاردون شاحنات القمامة يوميًا، وبعد 30 عامًا تجاوزت نسبة إعادة التدوير معظم الدول الأوروبية',
    'map.markers.taipeiHistory.title':
      'تاريخ تطوير مترو تايبيه: نظرية تطور المدينة المكتوبة بالدم والمال',
    'map.markers.taipeiHistory.desc':
      'سقوط 209 أطنان من العوارض الفولاذية من السماء وأودى بحياة 4 أشخاص، وتعويضات بقيمة 1.64 مليار دولار تايواني، ولا يزال العمل الأساسي لمترو تايبيه يخسر المال حتى اليوم — التكلفة الحقيقية وراء مترو تايوان بأكمله',
    'map.markers.taiwanPrehistoricCulture.title':
      'النظام التعليمي في تايوان: تجربة جزيرة من جحيم الامتحانات الموحدة إلى متاهة التنوع',
    'map.markers.taiwanPrehistoricCulture.desc':
      'حاولت تايوان كسر نظام الامتحانات الموحدة على مدار 30 عامًا، لكن أحدث اختبارات التصنيف أدت إلى تضاعف عدد المسجلين في فصول إعادة الاختبار. كيف تخوض جزيرة تجارب اجتماعية متكررة بين ضغط القبول الجامعي والعدالة التعليمية؟',
    'map.markers.taiwanIndigenousHistory.title':
      'ثقافة الدراجات النارية في تايوان',
    'map.markers.taiwanIndigenousHistory.desc':
      'مملكة جزيرة تحتل مرتبة متقدمة عالميًا في كثافة الدراجات النارية، تطور ثقافي من وسيلة المواصلات إلى نمط الحياة',
    'map.markers.taiwanMilitaryHistory.title':
      'ثقافة الممرات المغطاة والمشاهد الشارعية في تايوان',
    'map.markers.taiwanMilitaryHistory.desc':
      'ممرات الحياة التي تحمي من الرياح والأمطار، ذكريات الشوارع في تايوان حيث تتشابك الدراجات النارية والباعة المتجرون والروح الإنسانية',
    'map.markers.taiwanWomenHistory.title':
      'حياة الليل وثقافة الكاريوكيه (KTV)',
    'map.markers.taiwanWomenHistory.desc':
      'من صالات الحجز في تشيان تشوان إلى المطاعم المتأخرة، حياة ليلية في الجزيرة لا تتوقف على مدار 24 ساعة',
    'map.markers.taiwanEducationHistory.title':
      'الدين والمعتقدات الشعبية: من إدارة الخوف إلى إمبراطورية الإيمان',
    'map.markers.taiwanEducationHistory.desc':
      'تايوان تمتلك أعلى كثافة للمعابد في العالم، ومع ذلك هي الأولى عالميًا في حرية الدين — الحكمة البقاء العسكرية للمهاجرين في القرن السابع عشر مخبأة وراء هذا التناقض',
    'map.markers.taiwanReligiousHistory.title': 'ثقافة الينابيع الساخنة',
    'map.markers.taiwanReligiousHistory.desc':
      'من العلاج العسكري إلى أكبر ينابيع طينية في العالم الثلاث: قصة كيف أصبحت تايوان مملكة الينابيع الساخنة بالصدفة',
    'map.markers.taiwanMediaHistory.title':
      'التقاليد الموسيقية للسكان الأصليين في تايوان',
    'map.markers.taiwanMediaHistory.desc':
      'استكشاف الثقافة الموسيقية الغنية لـ 16 مجموعة من السكان الأصليين في تايوان، من التراتيل القديمة إلى الآلات الموسيقية التقليدية، وشهد نقلًا ثقافيًا يمتد لآلاف السنين',
    'map.markers.badmintonChampions.title':
      'صناعة الآلات الموسيقية في تايوان: من الساكسفون في هولي إلى مصنع الموسيقى العالمي',
    'map.markers.badmintonChampions.desc':
      'استكشف مسار تطور صناعة الآلات الموسيقية في تايوان، من الهيمنة العالمية للساكسفون في هولي إلى مملكة التصنيع بالاشتراك في الغيتار، وصولاً إلى الحرف الدقيقة لصناعة صناديق الموسيقى، وكيف انتقلت تايوان من التصنيع بالاشتراك إلى العلامات التجارية الخاصة',
    'map.markers.baseballCulture.title': 'حركة الموسيقى الشعبية في تايوان',
    'map.markers.baseballCulture.desc':
      'من "غناء أغانينا الخاصة" إلى تغيير دائرة الموسيقى الصينية بأكملها — الثورة الثقافية التي قادها الشباب في سبعينيات القرن الماضي',
    'map.markers.taiwanBasketball.title':
      'تطور مشهد الموسيقى المستقلة في تايوان',
    'map.markers.taiwanBasketball.desc':
      'من الفرق الموسيقية تحت الأرض إلى الموسيقى المستقلة، استكشف المسار التطوري والمعنى الثقافي لتطور الموسيقى غير السائدة في تايوان على مدى ثلاثين عاماً',
    'map.markers.marathonRunning.title':
      'ثقافة الموسيقى الإلكترونية وحفلات الرقص في تايوان: من حفلات الراف تحت الأرض إلى المسرح الدولي',
    'map.markers.marathonRunning.desc':
      'من ثقافة حفلات الراف في تسعينيات القرن الماضي إلى مهرجان الموسيقى الإلكترونية "Road to Ultra"، كيف انتقلت الموسيقى الإلكترونية في تايوان من تحت الأرض إلى التيار الرئيسي، مما أفرز فرقاً موسيقية مستقلة ودي جيّات على مستوى دولي',
    'map.markers.taiwanEsports.title':
      'ثقافة مهرجانات الموسيقى في تايوان: من "Spring Scream" إلى ظاهرة الشباب المنتشرة في كل مكان كحامل ثقافي',
    'map.markers.taiwanEsports.desc':
      'استكشف مسار تطور مهرجانات الموسيقى في تايوان من "Spring Scream" و"Ocean Music Festival" إلى "Dagang Kaichang"، وكيف أصبحت حاضنة للفرق المستقلة ومنصة التعبير الأساسية لثقافة الشباب',
    'map.markers.taiwanOlympics.title':
      'مشهد الموسيقى المستقلة المعاصر في تايوان',
    'map.markers.taiwanOlympics.desc':
      'من العروض تحت الأرض إلى المصفوفة الصناعية، تحليل السياق التطوري للنظام البيئي للموسيقى المستقلة الحديثة في تايوان وتأثيرها الثقافي',
    'map.markers.taipeiCycle.title':
      'حكمة البيئة لدى السكان الأصليين في تايوان والحفاظ على البيئة',
    'map.markers.taipeiCycle.desc':
      'بحث المعرفة البيئية التقليدية التي تراكمها السكان الأصليون في تايوان على مدى آلاف السنين، وقيمتها وممارساتها المهمة في الحفاظ على البيئة الحديثة',
    'map.markers.taiwanBetelNutCulture.title': 'ثقافة الجبال والتسلق في تايوان',
    'map.markers.taiwanBetelNutCulture.desc':
      '268 قمة جبلية تتجاوز ارتفاعها 3000 متر وثقافة "المئة قمة": تطور رياضة التسلق في تايوان وتحديات الحفاظ على الجبال',
    'map.markers.taiwanElections.title': 'النظام البيئي للغابات في تايوان',
    'map.markers.taiwanElections.desc':
      'من السواحل شبه الاستوائية إلى غابات الصنوبر الجبلية العالية، العالم الغني للغابات في تايوان ضمن الانخفاض الرأسي البالغ 3000 متر',
    'map.markers.taiwanLgbtCulture.title':
      'تغير المناخ والتحول نحو صافي الانبعاثات الصفري في تايوان',
    'map.markers.taiwanLgbtCulture.desc':
      'تواجه تايوان تأثيرات تغير المناخ، من تكرر حدوث المناخ المتطرف إلى التخطيط السياسي لتحقيق هدف صافي الانبعاثات الصفرية بحلول عام 2050، حيث يتم استكشاف الفرص والتحديات في عملية تحول الطاقة',
    'map.markers.taiwanMotorcycleCulture.title':
      'حفظ المحيطات في تايوان: لماذا لم تنقِ النظام الذي استغرق بناؤه 30 عامًا موجة ابيضان المرجان؟',
    'map.markers.taiwanMotorcycleCulture.desc':
      'في عام 2020، شهدت المياه الإقليمية لتايوان أكبر موجة ابيضان مرجاني مسجلة في التاريخ. من ليوكيو إلى حاجز الدونشا المرجاني، حتى المرجان داخل المناطق المحمية مات بسبب الحرارة العالية. ما المشكلة التي تكشف عنها؟',
    'map.markers.taipeiMrt.title':
      'تحديات حماية المحيطات ومعالجة التلوث في تايوان',
    'map.markers.taipeiMrt.desc':
      'في مواجهة النفايات البحرية والصيد الجائر وتغير المناخ، يتم استكشاف الوضع الحالي لتحفظ المحيطات في تايوان، والتحديات والحلول المبتكرة',
    'map.markers.kaohsiungMrt.title': 'النظام البيئي البحري في تايوان',
    'map.markers.kaohsiungMrt.desc':
      'المياه المحمية بحظر شعب داوتو، التي أصبحت بيضاء الآن بسبب الحرارة العالية والضوضاء تحت الماء: عندما تلتقي الحكمة البيئية لآلاف السنين بأزمة المحيطات الحديثة',
    'map.markers.taichungMrt.title':
      'النظام البيئي البحري وحفظ الشعب المرجانية في تايوان',
    'map.markers.taichungMrt.desc':
      'تايوان محاطة بالبحار من جميع الجهات وتتمتع بنظام بيئي بحري غني، من أزمة ابيضان الشعب المرجانية إلى حفظ الحيتان والدلافين، يتم استكشاف فعالية حماية الحدائق الوطنية البحرية والتحديات المستقبلية',
    'map.markers.taiwanTrainSystem.title':
      'الينابيع الساخنة والطاقة الحرارية الأرضية في تايوان',
    'map.markers.taiwanTrainSystem.desc':
      'من محطة الطاقة الحرارية الأرضية الفاشلة قبل 30 عامًا إلى حجر البياوتو الفريد في العالم: كيف حولت جزيرة واحدة نار باطن الأرض إلى علاج وطاقة خضراء',
    'map.markers.taiwanBusSystem.title':
      'حفظ النمر الآسيوي (القطط البرية) في تايوان',
    'map.markers.taiwanBusSystem.desc':
      'القطط الشبحية المتبقية في جميع أنحاء تايوان أقل من 500 فرد — عندما تقترب آخر القطط البرية الأصلية من حافة الانقراض',
    'map.markers.taiwanInnovationEcosystem.title': 'المانغوس في تايوان',
    'map.markers.taiwanInnovationEcosystem.desc':
      'أكثر الثدييات تهريبًا في العالم، وجدت في تايوان منزلًا آمنًا',
    'map.markers.taiwanMedicalSystem.title':
      'النظام البيئي الجبلي العالي وآثار العصر الجليدي في تايوان',
    'map.markers.taiwanMedicalSystem.desc':
      'استكشاف النظام البيئي الفريد للبيئة الجبلية العالية فوق 3000 متر في تايوان، من التنوب التايواني، وزهرة الكاميليا التايوانية (يوشان)، إلى التنوع البيولوجي الثمين لأنواع البقايا من العصر الجليدي',
    'map.markers.taiwanEducationSystem.title':
      'الدب الأسود الآسيوي (دب تايوان) في تايوان',
    'map.markers.taiwanEducationSystem.desc':
      'الحرف V الأبيض على صدره هو توقيعها — ملكة الجبال والغابات الأخيرة في تايوان، ومعركتها المستمرة للحفظ',
    'map.markers.taiwanMusicIndustry.title': 'الحدائق الوطنية',
    'map.markers.taiwanMusicIndustry.desc':
      '36,197 كيلومترًا مربعًا مضغوطة في 9 حدائق وطنية، معجزة حفظ طبيعية تتصدر العالم كثافةً',
    'map.markers.mandarinPopMusic.title': 'حدائق تايوان الوطنية',
    'map.markers.mandarinPopMusic.desc':
      'استكشف النظم البيئية الفريدة وقيمة الحفظ في الحدائق الوطنية التسع في تايوان، من السواحل شبه الاستوائية إلى خط الثلج الجبلي العالي',
    'map.markers.taiwaneseIndieMusic.title': 'الأنواع المميزة',
    'map.markers.taiwaneseIndieMusic.desc':
      'تنوع الأنواع المميزة الغني في تايوان، يعكس معجزة التطور في علم الجغرافيا الحيوية للجزيرة وأهمية الحفظ',
    'map.markers.taiwanRapHipHop.title': 'التنوع البيولوجي',
    'map.markers.taiwanRapHipHop.desc':
      'تشكل تايوان 0.025% فقط من مساحة العالم، لكنها تضم أكثر من 50,000 نوع من الكائنات الحية، وتحتل المرتبة 33 عالميًا في غطاء الغابات بنسبة 60.71%',
    'map.markers.taiwanElectronicMusic.title': 'الحيتان والدلافين في تايوان',
    'map.markers.taiwanElectronicMusic.desc':
      'موطن ثلث أنواع الحيتان والدلافين في العالم — من صيد الحيتان في الماضي إلى مشاهدة الحيتان اليوم، كيف تحولت تايوان لتصبح مركزًا للبحوث البيئية البحرية؟',
    'map.markers.taiwanTraditionalMusic.title': 'ماي تيان',
    'map.markers.taiwanTraditionalMusic.desc':
      'من مدرسة شيه دا الثانوية إلى المسرح العالمي، عرّفوا روح الروك الصينية الدائمة للشباب',
    'map.markers.taiwanFilmIndustry.title': 'وو باي',
    'map.markers.taiwanFilmIndustry.desc':
      'أيقونة الروك التايوانية، المرادف للروك المحلي، رسّخ مكانته في الروك من خلال أعمال مثل "غابة النرويج"',
    'map.markers.newTaiwanCinema.title': 'وو باو تشون',
    'map.markers.newTaiwanCinema.desc':
      'بطل مسابقة الخبز العالمية، أبهر العالم بخبز الليتشي والورود، من الريف في بينغتون إلى أرقى حرفيي الخبز في العالم',
    'map.markers.taiwanDocumentary.title': 'لو شيو ليان',
    'map.markers.taiwanDocumentary.desc':
      'من معتقلة سياسية إلى نائبة رئيس: قصة حياة أسطورية لأول نائبة رئيس في العالم الصيني',
    'map.markers.taiwanAnimationIndustry.title': 'جيمي',
    'map.markers.taiwanAnimationIndustry.desc':
      'شاعر الرسم بالصور الذي دافئ العالم بالمجلدات المصورة، جعل كتب الرسوم التوضيحية التايوانية تصل إلى المسرح العالمي',
    'map.markers.taiwanTelevisionIndustry.title': 'داي تشي ينغ',
    'map.markers.taiwanTelevisionIndustry.desc':
      'حاصلة على الرقم القياسي العالمي لـ 214 أسبوعًا كملكة كرة الريشة، من غاووشيانغ تشيانجشن إلى ميدالية الفضية الأولمبية، ملكة الريشة التايوانية',
    'map.markers.taiwanOttPlatforms.title': 'لي أون',
    'map.markers.taiwanOttPlatforms.desc':
      'مؤلفة أعمال "قتل الزوجة" و"الحديقة المبهمة"، رائدة الأدب النسوي في تايوان',
    'map.markers.taiwanPodcastIndustry.title': 'لي تشي-كاي',
    'map.markers.taiwanPodcastIndustry.desc':
      'من "كاى" في سوق الخضار في فيلم "انطلق يا فتى" إلى الميدالية الفضية الأولمبية، حياة لي تشي-كاي التايوانية "أمير المتوازي" التي استمرت ستة عشر عامًا من التقلب',
    'map.markers.taiwanPublishing.title': 'لي يوان-تشيه',
    'map.markers.taiwanPublishing.desc':
      'حائز على جائزة نوبل في الكيمياء عام 1986، أسس مجالًا جديدًا في حركية الكيمياء باستخدام تقنية حزم الجزيئات المتقاطعة، أول حائز على جائزة نوبل في العلوم من تايوان',
    'map.markers.taiwanBookstoreCulture.title': 'تو تشونغ-مينغ',
    'map.markers.taiwanBookstoreCulture.desc':
      'أول دكتور في الطب من تايوان، أبو الطب الحديث في تايوان',
    'map.markers.taiwanComicMangaIndustry.title': 'لين شو-هاو',
    'map.markers.taiwanComicMangaIndustry.desc':
      'من العبقري في جامعة هارفارد إلى بطل الدوري الوطني لكرة السلة (NBA)، اللاعب الأمريكي من أصل تايواني الذي أشعل ظاهرة "لين هيام" عالميًا',
    'map.markers.taiwanGameIndustry.title': 'لين يي-جييه',
    'map.markers.taiwanGameIndustry.desc':
      'من الطفل النحيل الذي رفضته فريق ألعاب القوى، إلى عدّاء القطبين الذي عبر الصحراء الكبرى سيرًا على الأقدام ليصنع التاريخ',
    'map.markers.nationalPalaceMuseum.title': 'لين يي-شيونغ',
    'map.markers.nationalPalaceMuseum.desc':
      'رائد الحركة الديمقراطية، ضحية مذبحة عائلة لين، زعيم حركة معارضة المفاعل النووي الرابع',
    'map.markers.nationalParks.title': 'يانغ دي-تشانغ',
    'map.markers.nationalParks.desc':
      'الشخصية المحورية في حركة السينما الجديدة في تايوان، أفضل مخرج في كان، شاعر العزلة الحضرية',
    'map.markers.taiwanGeography.title': 'باي شيان-يونغ',
    'map.markers.taiwanGeography.desc':
      'مؤلف "أشخاص تايبيه"، عبقري الأدب الحديث وداعم إحياء فن الأوبرا الكونتشو',
    'map.markers.taiwanClimate.title': 'لو غوانغ-جونغ',
    'map.markers.taiwanClimate.desc':
      'مغني وكاتب أغاني وممثل تايواني، حاصل على جائزة "الثلاثية الذهبية" (جائزة金曲، جائزة الجرس الذهبي، جائزة الحصان الذهبي)، يشتهر بصورته الشعبية المميزة وأدائه الصوتي الفريد',
    'map.markers.taiwanEcosystem.title': 'تشوانج تشي-يوان',
    'map.markers.taiwanEcosystem.desc':
      'مؤسس كرة الطاولة، ممثل أولمبي لأربع دورات، بطل وحيد تدرب بصعوبة بمفرده',
    'map.markers.taiwanEndangeredSpecies.title': 'تساي مينغ-ليانغ',
    'map.markers.taiwanEndangeredSpecies.desc':
      'حائز على جائزة الأسد الذهبي في فينيسيا، صيني ماليزي، معلم جمالي للأفلام البطيئة',
    'map.markers.taiwanMarineEcology.title': 'هسو ون-لونغ',
    'map.markers.taiwanMarineEcology.desc':
      'مؤسس مجموعة تشي مي، رجل أعمال، وعازف كمان، وهوية ثلاثية كجامع فنون، ومؤسس متحف تشي مي',
    'map.markers.taiwanBirdwatching.title': 'هسو فانغ-ي',
    'map.markers.taiwanBirdwatching.desc':
      'من فتاة من يي لان إلى الرائدة الأولى في فرقة ماشينغ للرقص، ثم عادت لتأسس فرقة لافانغ للرقص في تايوان — هي تروي أقوى قصة لتايوان عبر جسدها',
    'map.markers.taiwanHotSprings.title':
      'لاي تشينغ تي: من عائلة عمال المناجم إلى طبيب الصحة العامة في القصر الرئاسي',
    'map.markers.taiwanHotSprings.desc':
      'الرئيس السادس عشر لتايوان، أول شخصية سياسية في التاريخ الدستوري لجمهورية الصين (تايوان) تترشح بنائب الرئيس وتنجح في الانتخابات',
    'map.markers.taiwanIslands.title': 'قوه شيان تشون',
    'map.markers.taiwanIslands.desc':
      'إلهة رفع الأثقال في تايوان، حائزة على ذهبية أولمبياد طوكيو 2021، حافظة لأرقام أولمبية في فئة 59 كيلوغرامًا',
    'map.markers.taiwanMountains.title': 'تينغ يو شيان',
    'map.markers.taiwanMountains.desc':
      'أبو الأغاني التايوانية، مؤلف كلاسيكيات أغاني تايو مثل "نظر إلى ربيع الرياح" و"زهرة زهرة في ليلة ممطرة" و"قلق في ليلة قمرية"',
    'map.markers.taiwanRivers.title': 'تشونغ لي هيه',
    'map.markers.taiwanRivers.desc':
      'مؤلف "أصل الوطن"، أبو الأدب التايواني، محارب أدبي أصر على الإبداع رغم الفقر والمرض',
    'map.markers.taiwanCoastline.title': 'تشين شو تشو',
    'map.markers.taiwanCoastline.desc':
      'أعمال خيرية عادية لبائعة الخضار في تاي دونغ، جسدت معنى الثراء الحقيقي طوال حياتها',
    'map.markers.taiwanForests.title': 'تشين شوي بيان',
    'map.markers.taiwanForests.desc':
      'الرئيس العاشر والحادي عشر، بطل الدور الأول في أول تبديل للحزب الحاكم عام 2000، شخصية مهمة في ديمقراطية تايوان',
    'map.markers.taiwanNaturalDisasters.title': 'ما يينغ جيوس',
    'map.markers.taiwanNaturalDisasters.desc':
      'الرئيس الثاني عشر والثالث عشر، محفز كسر الجليد في علاقات المضيق، موقع اتفاقية التجارة الحرة الاقتصادية (ECFA)',
    'map.markers.taiwanEarthquakes.title': 'هوانغ تشون مينغ',
    'map.markers.taiwanEarthquakes.desc':
      'مؤلف "حورية البحر" و"يوم مشاهدة البحر"، ممثل بارز للأدب المحلي في إيلان',
    'map.markers.taiwanTyphoons.title':
      'هوانغ زينان: «تاكينوتشي يوتاكا» عالم جمع الكتب، ومنبع حيّ لتاريخ تايوان وتراثها',
    'map.markers.taiwanTyphoons.desc':
      'هوانغ زينان هو باحث في تاريخ وتراث تايوان، وجامع كتب، وروائي. بدأ مسيرته تحت الاسم المستعار Sizumaru على PTT، وأدار صفحة "مكتبة هوانغ شوي لاى" لمشاركة تاريخ تايوان وثقافة الكتب القديمة. له مؤلفات مثل "أكثر التاريخ التايواني إثارة للدهشة في تاريخ تايوان"، ويُعتبر يوكيو ناكامورا في عالم الكتب. انطلق من عائلةٍ عريقةٍ في حبّ الكتب في ليوجيو، تشيآي، حيث عمل الأب والابن بتقسيمٍ بين الجنوب والشمال لجمع الوثائق، ساعيًا لجعل التاريخ التايواني الجاد ممتعًا وشائعًا.',
    'map.markers.sunflowerMovement.title':
      'الحديقة الحيوانية وأخلاقيات عرض الحيوانات',
    'map.markers.sunflowerMovement.desc':
      'من الفيل في القفص إلى جدار قنديل البحر في Xpark — تايوان تعيد تعريف العلاقة بين الإنسان والحيوانات المعروضة',
    'map.markers.taiwanSocialMovements.title':
      'العدالة الأرضية للشعوب الأصلية في تايوان والمجالات التقليدية',
    'map.markers.taiwanSocialMovements.desc':
      'استكشاف السياق التاريخي لحقوق أراضي الشعوب الأصلية في تايوان، والتطور القانوني، والجدل حول تحديد المجالات التقليدية، وإنجازات لجنة العدالة الانتقالية للشعوب الأصلية',
    'map.markers.taiwanMarriageEquality.title':
      'زواج المثليين والمساواة الجندرية في تايوان',
    'map.markers.taiwanMarriageEquality.desc':
      'من سجين في فترة الحكم العسكري إلى أول قانون لزواج المثليين في آسيا، كيف غيّر كفاح رجل لمدة 30 عامًا تعريف الحب في الجزيرة',
    'map.markers.taiwanEnvironmentalJustice.title':
      'العدالة البيئية والنزاعات المحلية في تايوان',
    'map.markers.taiwanEnvironmentalJustice.desc':
      'استكشاف ظاهرة عدم المساواة في توزيع الأعباء البيئية في تايوان، من حرق النفايات إلى النفايات النووية وصناعة البتروكيماويات، تحليل قضايا عدم المساواة البيئية والعدالة الاجتماعية',
    'map.markers.taiwanCommunityRiCulture.title':
      'ثقافة المجتمع والري في تايوان',
    'map.markers.taiwanCommunityRiCulture.desc':
      'من الممارسة الديمقراطية على أدنى مستوى إلى الابتكار الاجتماعي في بناء المجتمع',
    'map.markers.taiwanLongTermCare.title':
      'تطور نظام الرعاية طويلة الأمد في تايوان',
    'map.markers.taiwanLongTermCare.desc':
      'أقدم نظام رعاية طويلة الأمد في العالم، لكنه يوجد في نفس الوقت أكبر نظام رعاية خفي',
    'map.markers.taiwanLaborMovement.title': 'البيئة والتنمية المستدامة',
    'map.markers.taiwanLaborMovement.desc':
      'من جزيرة المداخن إلى تايوان صافية الكربون: طريق الاستيقاظ لحركة البيئة على مدار 40 عامًا',
    'map.markers.taiwanHousingIssues.title': 'السكن الاجتماعي والعدالة السكنية',
    'map.markers.taiwanHousingIssues.desc':
      'كيف يمكن لتايوان تحقيق العدالة السكنية من خلال سياسة السكن الاجتماعي، لتمكين كل فرد من مكان آمن للعيش والعمل',
    'map.markers.taiwanHealthcareSystem.title': 'تطور الحدائق العلمية والتقنية',
    'map.markers.taiwanHealthcareSystem.desc':
      'من حديقة تشو إلى الحديقة الجنوبية، استكشاف مسار تطور الحدائق العلمية في تايوان والمواقع الفريدة للحدائق الثلاثة الكبرى',
    'map.markers.taiwanImmigration.title': 'صناعة أشباه الموصلات',
    'map.markers.taiwanImmigration.desc':
      'من رهان تشانغ تشونغ-مو التاريخي إلى عصر 2 نانومتر: كيف جعلت شركة تاسك (TSMC) من تايوان الشريان الحيوي للتكنولوجيا العالمية',
    'map.markers.taiwanReligiousDiversity.title':
      'التضاريس الساحلية وتكوينات المحيط في تايوان',
    'map.markers.taiwanReligiousDiversity.desc':
      'عنق رأس الملكة في ييليو يتناقص سمكه بمعدل 0.2 سم سنويًا، وفي يوم من الأيام سينفصل تمامًا - وهذا هو القدر والجمال لتضاريس تايوان الساحلية',
    'map.markers.taiwanBuddhismTaoism.title':
      'فن الشاي والحياة الجمالية في تايوان',
    'map.markers.taiwanBuddhismTaoism.desc':
      'في ليلة افتتاح مقهى زيتينغلو عام 1981، اجتمع الشخصيات غير المنتمية للحزب والأدباء لتذوق الشاي؛ لم يكن هذا المكان مجرد مقهى شاي، بل كان أيضًا قاعدة سرية لحركة المعارضة',
    'map.markers.taiwanFolkReligion.title':
      'الانتخابات في تايوان والسياسة الحزبية',
    'map.markers.taiwanFolkReligion.desc':
      'من أعضاء مجلس النواب المحليين عام 1950 إلى تبديل الأحزاب عام 2000، انظر كيف كتبت تايوان معجزة التحول الديمقراطي عبر الأصوات',
    'map.markers.taiwanChristianity.title':
      'التطور الحضري والفجوة بين المدينة والريف في تايوان',
    'map.markers.taiwanChristianity.desc':
      'من جزيرة زراعية إلى جزيرة حضرية على مدى 70 عامًا، الضوء والظل لتركيز 70٪ من السكان في المدن الست: المقارنة القاسية بين تايونغز المزدهرة ويونلين المتدهورة',
    'map.markers.taiwanIslamJudaism.title': 'خصائص المدن والثقافة الإقليمية',
    'map.markers.taiwanIslamJudaism.desc':
      'من 4.04 مليون نسمة في شمال تايوان إلى 1.85 مليون في تاي نان، انظر كيف شكلت المدن الست شخصياتها الحضرية الخاصة بها خلال التحول الصناعي',
    'map.markers.kaohsiungIncident.title': 'الديمقراطية',
    'map.markers.kaohsiungIncident.desc':
      'الصراع بين الشرطة والسكان في شوارع غاوشيونغ في 10 ديسمبر 1979، أدى في النهاية إلى التحول الديمقراطي في تايوان - ولكن ما هو الثمن الذي دفعه الشباب والحرية؟',
    'map.markers.wangLeeOlympicGold.title':
      'وانغ تشي لين ولي يانغ (زوجية لين ويانغ)',
    'map.markers.wangLeeOlympicGold.desc':
      'من زملاء الدراسة في المدرسة الثانوية إلى الميداليات الذهبية الأولمبية: هزمت "زوجية لين ويانغ" الصين في ثلاثين دقيقة وأربعين دقيقة دون خسارة أي شوط، مسجلين أول ميدالية ذهبية أولمبية في تاريخ الريشة الطائرة لتايوان',
  },
  ru: {
    // Meta
    'map.meta.title': 'Карта Тайваня',
    'map.meta.description': 'Изучайте контекст Taiwan.md через призму карты',

    // Hero Section
    'map.hero.kicker': 'Вид карты',
    'map.hero.title': 'Карта Тайваня',
    'map.hero.subtitle':
      'Исследуйте культуру, кухню, природу и ключевые исторические точки Тайваня через карту.',

    // Controls - Region Filter
    'map.controls.region.title': 'Фильтр по регионам',
    'map.controls.region.all': 'Все',
    'map.controls.region.north': 'Северный',
    'map.controls.region.central': 'Центральный',
    'map.controls.region.south': 'Южный',
    'map.controls.region.east': 'Восточный',
    'map.controls.region.islands': 'Островные',

    // Controls - Category Filter
    'map.controls.category.title': 'Фильтр по категориям',
    'map.controls.category.all': 'Все',
    'map.controls.category.food': '🍜 Еда',
    'map.controls.category.history': '📜 История',
    'map.controls.category.nature': '🌿 Природа',
    'map.controls.category.culture': '🎭 Культура',
    'map.controls.category.technology': '💻 Технологии',
    'map.controls.category.economy': '📈 Экономика',
    'map.controls.category.lifestyle': '🏮 Образ жизни',
    'map.controls.category.art': '🎨 Искусство',
    'map.controls.category.geography': '🗺️ География',

    // Route Section
    'map.route.title': '🗺️ Кураторский маршрут',
    'map.route.normal-mode': 'Обычный режим',

    // Sidebar - Default
    'map.sidebar.default.title': '📍 Статьи о Тайване',
    'map.sidebar.default.hint':
      'Нажмите на уезд или маркер на карте, чтобы изучить статьи',

    // Sidebar - County
    'map.sidebar.county.clear': '✕ Очистить выбор',
    'map.sidebar.county.articles-count': 'статей',
    'map.sidebar.county.no-articles': 'В этом районе пока нет статей',

    // Sidebar - Article
    'map.sidebar.article.back': '← Назад',
    'map.sidebar.article.read-more': 'Читать далее →',

    // Zoom Controls
    'map.zoom.in': '＋',
    'map.zoom.out': '－',
    'map.zoom.reset': '⌂',

    // Tooltips
    'map.tooltip.county.articles': 'статей',
    'map.tooltip.county.click': 'нажмите, чтобы отфильтровать этот регион',
    'map.tooltip.marker.reading-time': 'минут чтения',

    // Panel (for compatibility)
    'map.panel.title': 'Карта знаний Тайваня',
    'map.panel.stat.points': 'точки знаний',
    'map.panel.stat.categories': 'категории',
    'map.panel.category-distribution': 'Распределение по категориям',
    'map.panel.link.graph': '🕸️ Граф знаний',
    'map.panel.link.home': '🏠 Обзор категорий',

    // Category Names (for JS usage)
    'map.category.history': '📜 История',
    'map.category.geography': '🗺️ География',
    'map.category.culture': '🎭 Культура',
    'map.category.food': '🍜 Кулинария',
    'map.category.art': '🎨 Искусство',
    'map.category.music': '🎵 Музыка',
    'map.category.technology': '💻 Технологии',
    'map.category.nature': '🌿 Природа',
    'map.category.people': '👥 Люди',
    'map.category.society': '⚖️ Общество',
    'map.category.economy': '📈 Экономика',
    'map.category.lifestyle': '🏮 Образ жизни',

    // Additional UI text
    'map.sidebar.more-articles': '⋯ и другие',
    'map.sidebar.more-articles-suffix': 'статья',

    // Routes
    'map.routes.nightMarkets.name': '🍜 Обзор ночных рынков',
    'map.routes.nightMarkets.description':
      'С севера на юг — самая репрезентативная культура ночных рынков Тайваня',
    'map.routes.nationalParks.name': '🏔️ Обзор национальных парков',
    'map.routes.nationalParks.description':
      'От гор высотой 3952 метра до тропических коралловых рифов — природные чудеса Тайваня',
    'map.routes.historyTrail.name': '📜 Исторические тропы',
    'map.routes.historyTrail.description':
      'От голландской колонизации до демократизации: четыре столетия истории Тайваня',
    'map.routes.oldStreets.name': '🏮 Прогулки по старым улицам',
    'map.routes.oldStreets.description':
      'Память Тайваня в столетних улицах: архитектура — это история',

    'map.routes.counties22.name': '📍 Глубокие статьи по 22 уездам и городам',
    'map.routes.counties22.description':
      'Посетите 22 глубокие статьи Taiwan.md по уездам и городам: от пилотного Цзилуна до финального Синьбэя — в каждом уезде и городе одна ключевая противоречивая линия.',
    'map.counties22.panel.title': '📍 Глубокие статьи по 22 уездам и городам',
    'map.counties22.panel.hint':
      'Откройте панель уезда/города или выберите уезд/город на карте',
    'map.counties22.tooltip.openDeep': 'Нажмите, чтобы открыть глубокую статью',
    'map.counties22.deepCard.badge':
      '📖 Серия 22 уездов/городов · Глубокие статьи',
    'map.counties22.deepCard.cta': 'Читать полностью →',

    // Night Markets Stops
    'map.stops.shilinNightMarket.name': 'Ночной рынок Шилинь',
    'map.stops.shilinNightMarket.note':
      'Крупнейший в Тайване туристический ночной рынок, родина «больших пирожков с маленькими пирожками»',
    'map.stops.raoheNightMarket.name': 'Ночной рынок Раохэ',
    'map.stops.raoheNightMarket.note':
      'Священное место очередей за перцовыми пирожками, любимое местными жителями Тайбэя',
    'map.stops.ningxiaNightMarket.name': 'Ночной рынок Нинся',
    'map.stops.ningxiaNightMarket.note':
      'Улица с самой высокой концентрацией вкусной еды, рекомендованная Мишленом',
    'map.stops.fengjiaNightMarket.name': 'Фэнцзя (рынок)',
    'map.stops.fengjiaNightMarket.note':
      'Лаборатория креативной уличной еды, передний край тайваньских рынков',
    'map.stops.huayuanNightMarket.name': 'Хуайюань (рынок)',
    'map.stops.huayuanNightMarket.note':
      'Крупнейший рынок Тайнаня, ограниченный три днями в неделю',
    'map.stops.liuheNightMarket.name': 'Люхэ (рынок)',
    'map.stops.liuheNightMarket.note':
      'Ночной рынок Люхэ в Гаосюне, морепродукты здесь — главные герои',

    // National Parks Stops
    'map.stops.yangmingshanNationalPark.name': 'Национальный парк Янминшань',
    'map.stops.yangmingshanNationalPark.note':
      'Задний сад Тайбэя, вулканический рельеф и секретные горячие источники',
    'map.stops.tarokoNationalPark.name': 'Национальный парк Тароко',
    'map.stops.tarokoNationalPark.note':
      'Долима мрамора, геологическое чудо мирового уровня',
    'map.stops.yushanNationalPark.name': 'Национальный парк Юйшань',
    'map.stops.yushanNationalPark.note':
      'Высочайшая вершина Северо-Восточной Азии (3 952 м), хребет Тайваня',
    'map.stops.alishanScenicArea.name': 'Пейзажная зона Алишань',
    'map.stops.alishanScenicArea.note':
      'Рассвет, морское облако, древние деревья и лесная железная дорога',
    'map.stops.sunMoonLakeScenicArea.name':
      'Национальный парк пейзажей озер Суньюэ',
    'map.stops.sunMoonLakeScenicArea.note':
      'Крупнейшее естественное озеро Тайваня, священное озеро народа шао',
    'map.stops.kentingNationalPark.name': 'Национальный парк Кэнтин',
    'map.stops.kentingNationalPark.note':
      'Самая южная точка Тайваня, тропические коралловые рифы и полуостров Хэнчунь',

    // History Trail Stops
    'map.stops.anpingFort.name': 'Крепость Аньпин',
    'map.stops.anpingFort.note':
      'Построена голландцами в 1624 году, самый старый форт на Тайване',
    'map.stops.chikanTower.name': 'Чжиганьлоу',
    'map.stops.chikanTower.note':
      'От голландской крепости Провинциального совета до символа правления Чжэн Чэнгуна',
    'map.stops.lukang.name': 'Луган',
    'map.stops.lukang.note':
      'Второй по величине город Тайваня в эпоху Цин, «Первый Фу, второй Лу, третий Мэнся»',
    'map.stops.presidentialOffice.name':
      'Здание президентства (бывшая резиденция генерал-губернатора Тайваня)',
    'map.stops.presidentialOffice.note':
      'Построено в 1919 году, центр высшей власти в японский колониальный период',
    'map.stops.chiangKaiShekMemorialHall.name': 'Мемориальный зал Чан Кайши',
    'map.stops.chiangKaiShekMemorialHall.note':
      'Символ авторитаризма и предмет дебатов о трансформации и справедливости',
    'map.stops.legislativeYuan.name':
      'Юань законодательный (Движение подсолнечного цветка)',
    'map.stops.legislativeYuan.note':
      'Место проведения протестов «Солнечных цветов» 2014 года, веха тайваньской демократии',

    // Old Streets Stops
    'map.stops.dihuaStreet.name': 'Улица Дихуа',
    'map.stops.dihuaStreet.note':
      'Сердце района Даодаочэн, улица ювелирных изделий и товаров для праздников',
    'map.stops.jiufenOldStreet.name': 'Старая улица Цзюфэнь',
    'map.stops.jiufenOldStreet.note':
      'Золотая эпоха горнодобывающей промышленности и источник вдохновения для «Скрытого в облаках»',
    'map.stops.lukangOldStreet.name': 'Старая улица Луган',
    'map.stops.lukangOldStreet.note':
      'Живой музей из красных кирпичных старых домов и традиционных ремёсел',
    'map.stops.anpingOldStreet.name': 'Старая улица Аньпин',
    'map.stops.anpingOldStreet.note':
      'Первая улица Тайваня, напластование четырёхсотлетней истории',
    'map.stops.qishanOldStreet.name': 'Старая улица Цисань',
    'map.stops.qishanOldStreet.note':
      'Барочная архитектура Бананового королевства',
    'map.stops.tamsuiOldStreet.name': 'Старая улица Таньшэя',
    'map.stops.tamsuiOldStreet.note':
      'Закат, агэй и исторический колорит устья реки Таньшуй',

    // Cities
    'map.city.taipei': 'Тайбэй',
    'map.city.newTaipei': 'Синьбэй',
    'map.city.keelung': 'Цзилун',
    'map.city.taoyuan': 'Тайюань',
    'map.city.hsinchu': 'Синьчжу',
    'map.city.miaoli': 'Миали',
    'map.city.taichung': 'Тайчжун',
    'map.city.changhua': 'Чанхуа',
    'map.city.nantou': 'Наньтоу',
    'map.city.chiayi': 'Цзяи',
    'map.city.tainan': 'Тайнань',
    'map.city.kaohsiung': 'Гаосюн',
    'map.city.pingtung': 'Пиндун',
    'map.city.yilan': 'Илань',
    'map.city.hualien': 'Хуалиэн',
    'map.city.taitung': 'Тайтун',
    'map.city.penghu': 'Пэнху',
    'map.city.kinmen': 'Цзиньмэнь',

    // Markers
    'map.markers.founderCheYuWu.title': 'Основатель — У Чжэюй Che-Yu Wu',
    'map.markers.founderCheYuWu.desc':
      'От кода к поэзии: путь международного прорыва тайваньского художника',
    'map.markers.taiwanIndigenousContemporaryArt.title':
      'Современное искусство тайваньских аборигенов',
    'map.markers.taiwanIndigenousContemporaryArt.desc':
      'От традиционных ремёсел до современных произведений: исследуйте, как тайваньские аборигенные художники заявляют о себе на мировой арт-сцене и переосмысляют диалог между аборигенной идентичностью и современным искусством',
    'map.markers.taiwanExperimentalNewMediaArt.title':
      'Экспериментальное и медиаискусство Тайваня',
    'map.markers.taiwanExperimentalNewMediaArt.desc':
      'От видеоарта до VR-интерактива: исследование инновационного развития и экосистемы технологического искусства Тайваня',
    'map.markers.taiwanArchitecture.title': 'Архитектура Тайваня',
    'map.markers.taiwanArchitecture.desc':
      'От каменных хижин до небоскрёбов: архитектурное путешествие сквозь время одного острова',
    'map.markers.taiwanNewMediaArt.title': 'Новые медиа-искусство Тайваня',
    'map.markers.taiwanNewMediaArt.desc': 'Изучение культуры и истории Тайваня',
    'map.markers.taiwanWatercolorCenturyEvolution.title':
      'Сот лет эволюции тайваньской акварели',
    'map.markers.taiwanWatercolorCenturyEvolution.desc':
      'От просветительской деятельности Исикава Кинити в японский колониальный период до международного признания современного художника Цзянь Чжунвэя, тайваньская акварель прошла путь в сто лет, став самым активным центром акварельного творчества в Азии.',
    'map.markers.taiwanModernPoetry.title': 'Современная поэзия Тайваня',
    'map.markers.taiwanModernPoetry.desc':
      'Модернистские эксперименты, вышедшие из трёх кабинетов, неожиданно породили самую народную поэтическую революцию',
    'map.markers.taiwanContemporarySculpture.title':
      'Развитие современной скульптуры на Тайване',
    'map.markers.taiwanContemporarySculpture.desc':
      'От Ян Инфэна и Чжу Мина к новому поколению: исследование эволюционных тенденций и творческого духа тайваньской скульптуры',
    'map.markers.taiwanCuratorsArtCulture.title':
      'Тайваньские кураторы и конструирование искусства и культуры',
    'map.markers.taiwanCuratorsArtCulture.desc':
      'От независимого кураторства до системы музеев: как тайваньские кураторы формируют культурные нарративы современного искусства и международный диалог',
    'map.markers.newMediaArt.title': 'Новые медиа в искусстве',
    'map.markers.newMediaArt.desc':
      'Пионерские исследования цифрового искусства Тайваня: синтез технологий и гуманизма от лабораторий до международной сцены',
    'map.markers.contemporaryTaiwanLiterature.title':
      'Современная тайваньская литература',
    'map.markers.contemporaryTaiwanLiterature.desc':
      'Изучайте культуру и истории Тайваня',
    'map.markers.taiwanContemporaryArt.title': 'Современное искусство Тайваня',
    'map.markers.taiwanContemporaryArt.desc':
      'Уникальное положение современного искусства Тайваня на мировой арене: от Музея современного искусства до павильона Тайваня на Венецианской биеннале',
    'map.markers.kinmenGuesthouseMuseum.title':
      'Музей современного искусства «Гостевой дом Цзиньма»',
    'map.markers.kinmenGuesthouseMuseum.desc':
      'Военный форпост холодной войны, ставший свидетелем разлуки и воссоединения. Проспав двадцать лет, он был пробуждён отцом и дочерью и стал главным музеем в Тайбэне по рекомендации Lonely Planet.',
    'map.markers.renjianMagazine.title': 'Журнал «Жэньцзян»',
    'map.markers.renjianMagazine.desc':
      '47 номеров, четыре года, тихая революция, развязанная фотографией и словом — начало тайваньской репортажной литературы',
    'map.markers.taiwanIndigenousCulture.title':
      'Культура коренных народов Тайваня',
    'map.markers.taiwanIndigenousCulture.desc':
      'От многообразных традиций шестнадцати этносов до возрождения современного искусства — исследуйте глубокую основу и современную трансформацию культуры коренных народов Тайваня',
    'map.markers.taiwan16IndigenousTribes.title':
      'Карта культуры 16 этнических групп коренных народов Тайваня',
    'map.markers.taiwan16IndigenousTribes.desc':
      'Изучите ареалы расселения, языковые системы, ключевые фестивали и современное творческое развитие 16 коренных народов Тайваня, чтобы понять многообразие их культурного облика',
    'map.markers.taiwanNightMarketCulture.title':
      'Культура ночных рынков и уличная кухня Тайваня',
    'map.markers.taiwanNightMarketCulture.desc':
      'Глубокое погружение в исторические предпосылки формирования, уникальное очарование ночных рынков Тайваня, а также исторические истории и культурное значение их знаковых уличных блюд',
    'map.markers.taiwanSensibilityKoreanPerspective.title':
      'Тайваньская чувственность: тайваньская эстетика глазами корейцев',
    'map.markers.taiwanSensibilityKoreanPerspective.desc':
      'От клипов K-pop до Сеульского книжного салона: как «тайваньская чувственность» превратила повседневные уличные пейзажи Тайваня в самый притягательный эстетический символ Азии',
    'map.markers.taiwanCulturalCreativeParks.title':
      'Развитие парков культурного и креативного дизайна Тайваня',
    'map.markers.taiwanCulturalCreativeParks.desc':
      'От оживления старых зданий до творческих кластеров: история развития и инновационные модели культурно-креативных парков Тайваня',
    'map.markers.taiwanOldStreetCulture.title':
      'Культура старых улиц и торговые кварталы Тайваня',
    'map.markers.taiwanOldStreetCulture.desc':
      'От процветания портов эпохи Цин до барочных особняков японского колониального периода: старые улицы Тайваня — это народная история, написанная кирпичом и черепицей',
    'map.markers.taiwanTeaCeremonyLifeAesthetics.title':
      'Чайная церемония и эстетика жизни на Тайване',
    'map.markers.taiwanTeaCeremonyLifeAesthetics.desc':
      'От гунфу-чая до эстетики чайной церемонии: исследуйте, как Тайвань синтезирует и инновационно переосмысляет восточную чайную культуру с местной эстетикой жизни',
    'map.markers.taiwanStreetArtGraffiti.title':
      'Уличное искусство и культура граффити на Тайване',
    'map.markers.taiwanStreetArtGraffiti.desc':
      'От уличных граффити до легальных муралов: как городские стены стали сценой для тайваньских художников',
    'map.markers.taiwanIncenseMakingCulture.title':
      'Культура производства благовоний и историческая родина мастеров в Тайване',
    'map.markers.taiwanIncenseMakingCulture.desc':
      'От вековых навыков мастеров благовоний в районе Юньсяо уезда Цзяи до индустрии производства благовоний, охватывающей весь остров Тайвань — древнее ремесло, основанное на благочестии, мастерстве и упорстве',
    'map.markers.taiwanHomophoneTaboos.title':
      'Культура табу на омонимы в Тайване: почему «четыре» заставляет общество пропускать целые этажи?',
    'map.markers.taiwanHomophoneTaboos.desc':
      'От больниц без четвёртого этажа до астрономических цен на номера 8888 — чувствительность тайваньцев к омонимам является одной из самых высоких в мире',
    'map.markers.hakkaCultureLanguage.title': 'Культура и язык хакка',
    'map.markers.hakkaCultureLanguage.desc':
      'Стойкий дух и День Небесного Проёма: культурное наследие и современное возрождение хакка на Тайване',
    'map.markers.ethnicGroupsTaiwan.title':
      'Этнические группы (миньнань, хакка, аборигены, вайшэн, новые жители)',
    'map.markers.ethnicGroupsTaiwan.desc':
      'Этническое разнообразие Тайваня — это не только результат исторического развития, но и ключ к пониманию современного тайваньского общества. Эта структура общества, основанная на сосуществовании различных этносов, является источником культурного креатива и важной основой для развития демократической политики. Построение общей тайваньской идентичности при уважении культурных особенностей каждой этнической группы остаётся важной задачей, с которой тайваньское общество продолжает сталкиваться.',
    'map.markers.chinaSteel.title':
      'China Steel: легендарная история стали, связанная с министром «Железная голова» и Десятью крупными проектами',
    'map.markers.chinaSteel.desc':
      'От хитроумного освоения технологий в переговорах Чжао Яодуна с Европой и США до первых белых дымов, поднявшихся над районом Сяоган в Гаосюне, China Steel за 50 лет создала хребет тяжёлой промышленности Тайваня, став самой успешной жемчужиной из Десяти крупных проектов',
    'map.markers.taiwanCement.title':
      'Taiwan Cement: легенда зелёного перехода первой публичной компании Тайваня',
    'map.markers.taiwanCement.desc':
      'В 1962 году Тайваньская фондовая биржа была создана для неё, код акции 1101 символизирует истоки тайваньского рынка акций. За 76 лет управления тремя поколениями семьи Гу Taiwan Cement своими цементными печами свидетельствовала о чудесах строительства Тайваня, сегодня трансформируясь в зелёное предприятие для противостояния эпохе углеродной нейтральности',
    'map.markers.tsmc.title': 'Тайваньские компании: TSMC',
    'map.markers.tsmc.desc':
      'Лидер мирового рынка контрактного производства чипов, контролирующий ключевую артерию цифровой цивилизации человечества',
    'map.markers.chimeiCorporation.title':
      'Chimei Corporation: акриловое королевство Сюй Вэньлуна и мечта о музее',
    'map.markers.chimeiCorporation.desc':
      'Начав с небольшой фабрики в Жэньдэ (Наньтан) в 1960 году, Сюй Вэньлун за свою жизнь создал крупнейшее в Азии королевство ABS-материалов и основал Музей Цимэй в знак благодарности обществу. Это доказывает, что тайваньские компании могут сочетать коммерческий успех с гуманитарной заботой',
    'map.markers.acer.title': 'Группа Acer (Acer) — новатор в индустрии ПК',
    'map.markers.acer.desc':
      'Пионер персональных компьютеров, зародившийся в Таойюане (Тайвань), создал бизнес-модель «множество брендов, множество каналов сбыта» и стал двигателем реформ в мировой индустрии ПК',
    'map.markers.giantBicycles.title': 'Тайваньская корпорация: Giant Bicycles',
    'map.markers.giantBicycles.desc':
      'От раба-контрактного производителя, отвергнутого американскими гигантами, до невидимой империи, устанавливающей мировые технические стандарты в велосипедной индустрии',
    'map.markers.quantaComputer.title': 'Тайваньская компания: Quanta Computer',
    'map.markers.quantaComputer.desc':
      'От пожара на заводе до короля глобальных ноутбуков: как Линь Байли построил новую империю эпохи ИИ?',
    'map.markers.aseGroup.title': 'Тайваньская компания: ASE Group',
    'map.markers.aseGroup.desc':
      'Крупнейший в мире производитель упаковки и тестирования микросхем: почему владелец строительной компании переключился на полупроводники?',
    'map.markers.esunFinancialHolding.title':
      'Тайваньские компании: Esun Financial Holding',
    'map.markers.esunFinancialHolding.desc':
      'От специализированного банка кредитных карт до цифрового финансового пионера: история прорыва самого молодого генерального директора среди финансовых холдингов в возрасте 43 лет',
    'map.markers.changChunPetrochemical.title':
      'Тайваньские компании: Chang Chun Petrochemical',
    'map.markers.changChunPetrochemical.desc':
      'От маленькой фабрики в Тайнане в 1949 году до мирового химического гиганта: история невидимого чемпиона «без листинга, без займов',
    'map.markers.formosaPlasticsGroup.title':
      'Тайваньская компания: Evergreen Marine',
    'map.markers.formosaPlasticsGroup.desc':
      'От подержанного судна до мировой морской империи: синергетическая легенда Чжан Жунфа',
    'map.markers.taipeiFubon.title':
      'Экономика ночных рынков: коммерческое чудо без бренда',
    'map.markers.taipeiFubon.desc':
      'Исследуйте, как ночные рынки Тайваня создают экономическое чудо с годовым объемом производства почти в 400 миллиардов, не имея бренда, оформления и фиксированного места',
    'map.markers.taiwan7Eleven.title': 'Кофейная индустрия Тайваня',
    'map.markers.taiwan7Eleven.desc':
      'От истоков выращивания в японский период до чемпиона мира в Simple Kaffa — столетняя история эволюции тайваньского кофе',
    'map.markers.taiwanHighSpeedRail.title': 'Карта местных закусок Тайваня',
    'map.markers.taiwanHighSpeedRail.desc':
      'От динбяньху у храма Цзилун до свиных ножек в Ваньлуане (Пиндун), от фрикаделек из Синьчжу до сахарных яблок из Тайтуна — в каждом городе есть свой уникальный вкусовой ДНК. Следуйте за местными жителями, исследуйте самые репрезентативные уличные закуски 22 уездов и городов Тайваня, вкушая самую подлинную народную культуру острова.',
    'map.markers.taiwanSemiconductorIndustry.title':
      'Настоящие тайваньские блюда: исчезающие вкусовые воспоминания',
    'map.markers.taiwanSemiconductorIndustry.desc':
      'От курицы с мятой из Цзяи до супа из рыбьих голов — фирменные блюда бабушки хранят семейную память, но постепенно исчезают в эпоху перемен',
    'map.markers.taiwanBankingSystem.title':
      'Гастрономический синтез новых резидентов Тайваня',
    'map.markers.taiwanBankingSystem.desc':
      'Когда тайский кисло-острый вкус встречается с тайваньским сладко-солёным, когда вьетнамский фо встречается с тайваньскими тушёными закусками лувэй, когда индонезийские специи обнимают местные ингредиенты, на Тайване тихо разворачивается вкусовая революция, преодолевающая границы. Новые резиденты привносят не только блюда своей родины, но и новые возможности для обогащения гастрономической культуры Тайваня.',
    'map.markers.taiwanSmes.title': 'Королевство тайваньских фруктов',
    'map.markers.taiwanSmes.desc':
      'Сладкая легенда о разнообразии тропических фруктов — от манго и личи до гуавы и розового яблока — и прорывах в сельскохозяйственных технологиях',
    'map.markers.youbikePublicBikeSystem.title':
      'Культура морепродуктов Тайваня',
    'map.markers.youbikePublicBikeSystem.desc':
      'Свежие поставки из рыбных гаваней, культура ресторанов морепродуктов, блюда вроде жареных устричных оладий, демонстрирующие островную специфику Тайваня, окружённого со всех сторон морем, и богатые традиции морской кухни',
    'map.markers.taiwanFoodBeverageIndustry.title':
      'Тайваньская мишленовская и изысканная кухня',
    'map.markers.taiwanFoodBeverageIndustry.desc':
      'В 2018 году красная обложка «Мишлен гид» впервые получила надпись «ТАЙБЭЙ», ознаменовав официальный выход тайваньской ресторанной индустрии на международную оценочную арену. От уличных ларьков до ресторанов со звёздами, от народной еды до изысканных блюд — тайваньская кулинарная культура демонстрирует на мировой сцене очаровательное сочетание традиций и инноваций.',
    'map.markers.taiwanAgriculturalReform.title': 'Культура ночных рынков',
    'map.markers.taiwanAgriculturalReform.desc':
      '164 контролируемых ночных рынка, в Тайнане в среднем 38 тысяч человек на один ночной рынок, от площади перед храмом до международных туристических достопримечательностей',
    'map.markers.taiwanTeaIndustry.title': 'Хаккская пищевая культура',
    'map.markers.taiwanTeaIndustry.desc':
      'Разнообразная и богатая пищевая культура хакков, от насыщенного аромата лэйча до лесного колорита цзун с цветками дикого имбиря, демонстрирует жизненную мудрость хаккского этноса в бережливом ведении хозяйства и использовании местных ресурсов',
    'map.markers.taiwanFishingIndustry.title': 'Говяжий суп с лапшой',
    'map.markers.taiwanFishingIndustry.desc':
      'От тоски по дому иммигрантов из других провинций до национального блюда Тайваня: культурный синтез и всемирная известность',
    'map.markers.taiwanFruitIndustry.title': 'Чайная культура',
    'map.markers.taiwanFruitIndustry.desc':
      'Эволюция чайной культуры Тайваня от традиционного чайного искусства до современных напитков с ручной мешалкой, демонстрирующая уникальные для острова сорта чая и традиции чаепития',
    'map.markers.taiwanRiceVarieties.title':
      'На качающемся острове они построили башню, способную летать',
    'map.markers.taiwanRiceVarieties.desc':
      'Всего в 200 метрах от активного разлома тайваньцы упрямо возводят небоскрёб — самый высокий в мире, — а затем какой-то безумец забирается на него голыми руками за 91 минуту.',
    'map.markers.nightMarketCulture.title':
      'Пять основных геоморфологических типов и географическая структура Тайваня: облик острова от горных хребтов до равнин',
    'map.markers.nightMarketCulture.desc':
      'Изучите уникальную географическую структуру Тайваня: от Центрального хребта до западных равнин — познакомьтесь с разнообразием рельефа этого острова',
    'map.markers.bubbleTeaGlobalPhenomenon.title': 'Транспортная сеть Тайваня',
    'map.markers.bubbleTeaGlobalPhenomenon.desc':
      'Высокоскоростная железная дорога, метро, автодороги и авиация формируют многоуровневую транспортную сеть, обеспечивающую мобильность на Тайване',
    'map.markers.taiwanBeefNoodle.title':
      'Система национальных пейзажных зон Тайваня',
    'map.markers.taiwanBeefNoodle.desc':
      'От Северо-Востового угла до Кэнтин: 13 национальных туристических зон Тайваня демонстрируют богатые природные и культурные пейзажи',
    'map.markers.taiwanHotPotCulture.title':
      'Географические особенности и формирование островного архипелага Тайваня',
    'map.markers.taiwanHotPotCulture.desc':
      'Изучите уникальные географические особенности островного архипелага Тайваня: от тектонических движений до структуры рельефа — откройте для себя природные тайны острова Формоза',
    'map.markers.taiwanFineDining.title':
      'Тектоника плит и сейсмическая активность на Тайване',
    'map.markers.taiwanFineDining.desc':
      'Изучение геологических особенностей Тайваня, расположенного на границе Евразийской и Филиппинской плит, а также причин частых землетрясений',
    'map.markers.taiwanStreetFood.title':
      'Водохранилища и управление водными ресурсами Тайваня',
    'map.markers.taiwanStreetFood.desc':
      'Вызовы водных ресурсов Тайваня: от кризиса нехватки воды до заиления водохранилищ и неравномерного распределения между севером и югом',
    'map.markers.taiwanVegetarianCulture.title':
      'Система рек и гидрологические особенности Тайваня: быстрые потоки и сезонные изменения гидрогеографии',
    'map.markers.taiwanVegetarianCulture.desc':
      'Изучите уникальную систему рек Тайваня, от реки Чжуошуй до реки Гаопин, чтобы понять, как островной рельеф формирует гидрологические особенности Тайваня',
    'map.markers.taiwanCoffeeCulture.title':
      'Прибрежный рельеф и морской ландшафт Тайваня',
    'map.markers.taiwanCoffeeCulture.desc':
      'От полуостровного побережья северного залива до разломного побережья востока богатые и изменчивые береговые формы Тайваня демонстрируют мастерство тектонических процессов',
    'map.markers.taiwanSnackCulture.title': 'Термальные ландшафты Тайваня',
    'map.markers.taiwanSnackCulture.desc':
      'Северные Бэйтоу, Чибань и Цзяоси — прекрасное пересечение культуры термальных источников и геологической науки',
    'map.markers.taiwanSeafoodCulture.title':
      'Горячая точка биоразнообразия Тайваня',
    'map.markers.taiwanSeafoodCulture.desc':
      '3,6 тыс. кв. км островов вмещают 59 тыс. видов организмов, плотность в 100 раз выше среднемировой',
    'map.markers.taiwanPineappleCake.title':
      'Агроландшафты и распределение отраслей в Тайване',
    'map.markers.taiwanPineappleCake.desc':
      'Изменения агроландшафтов с севера на юг демонстрируют путь Тайваня от «зерновой житницы» к «прецизионному сельскому хозяйству»',
    'map.markers.taiwanPorkRibSoup.title':
      'Городское развитие и разрыв между городом и селом в Тайване',
    'map.markers.taiwanPorkRibSoup.desc':
      'Неравномерное развитие городских и сельских территорий Тайваня в условиях структуры «шести крупных муниципалитетов»: пространственная трансформация от аграрного Тайваня к урбанизированному',
    'map.markers.taiwanOysterOmelette.title': 'Рельеф и геология',
    'map.markers.taiwanOysterOmelette.desc':
      'Остров возрастом 6 миллионов лет, хранящий 200-миллионные древние воспоминания — чудо самой молодой в мире складчатой области и самых интенсивных тектонических столкновений',
    'map.markers.taiwanBreakfastCulture.title':
      'Городские особенности и региональная культура',
    'map.markers.taiwanBreakfastCulture.desc':
      'От международного мегаполиса Тайбэя до исторического колорита древней столицы Наньтуна — как различные города Тайваня формируют уникальную местную идентичность',
    'map.markers.taiwanConvenienceStoreFood.title':
      'Островная и морская культура: от первой в мире плотности каменных ловушек до экологического законодательства сезона летучей рыбы',
    'map.markers.taiwanConvenienceStoreFood.desc':
      'По всему миру существует менее 600 каменных ловушек, а на Пэнху их 574. Островной народ, специализирующийся на ловле летучей рыбы, превратил табу в самую точную систему управления морскими ресурсами',
    'map.markers.dutchSpanishColonialPeriod.title':
      'События 28 февраля и белый террор: травмы и память в эпоху авторитарного правления на Тайване',
    'map.markers.dutchSpanishColonialPeriod.desc':
      'От событий 28 февраля 1947 года до 38-летнего режима военного положения Тайвань пережил государственное насилие в эпоху авторитарного правления, и лишь после отмены военного положения начал осмысливать исторические травмы и продвигать переход к справедливости.',
    'map.markers.zhengDynastyPeriod.title':
      'Кризисы на Тайванском проливе и развитие отношений между двумя берегами',
    'map.markers.zhengDynastyPeriod.desc':
      'Взгляд на три великих кризиса в Тайванском проливе и семидесятилетнюю историю развития отношений через Тайваньский пролив, понимание исторического контекста и современных вызовов ситуации в Тайванском проливе',
    'map.markers.qingDynastyTaiwanHistory.title':
      'История морской торговли Тайваня',
    'map.markers.qingDynastyTaiwanHistory.desc':
      'Тайвань эпохи Великих географических открытий: от центра международной торговли до легенд о взлёте и падении королевства пиратов',
    'map.markers.japaneseColonialRule.title':
      'История военных посёлков Тайваня',
    'map.markers.japaneseColonialRule.desc':
      'От отрядов отступивших из Бирмы до королевства бамбуковых заборов: как 1,2 млн переселенцев переопределили понятие «родина»',
    'map.markers.februaryTwentyEightIncident.title':
      'История железных дорог Тайваня',
    'map.markers.februaryTwentyEightIncident.desc':
      'От Лю Минчуана эпохи Цин до трансконтинентальной линии японского периода и скоростных железных дорог: как железные дороги формировали городское развитие и культурную память Тайваня',
    'map.markers.martialLawPeriod.title':
      'Перенос правительства Гоминьдана на Тайвань и послевоенное восстановление',
    'map.markers.martialLawPeriod.desc':
      'Изучение исторического контекста, процесса и последствий переноса правительства Гоминьдана на Тайвань в 1949 году, а также политического, экономического и социального восстановления Тайваня после войны',
    'map.markers.democratization.title': 'Японский период',
    'map.markers.democratization.desc':
      '50 лет японского правления на Тайване (1895–1945 гг.) принесли всеобъемлющую модернизацию и институционализацию, одновременно проводя политику ассимиляции, что оказало глубокое влияние на развитие тайваньского общества',
    'map.markers.taiwanIndependenceMovement.title':
      'Период правления династии Цин',
    'map.markers.taiwanIndependenceMovement.desc':
      'С 1683 по 1895 год Тайвань находился под управлением династии Цин на протяжении примерно 212 лет. От пассивного управления до активного строительства — были заложены основы современных административных границ Тайваня и общества ханьцев',
    'map.markers.taiwanChinaRelations.title':
      'Период голландско-испанского владычества и эпоха Минского Чжэн',
    'map.markers.taiwanChinaRelations.desc':
      'Исторически первое систематическое колониальное правление на Тайване, от строительства голландцами крепости Зеландия до открытия острова Чжэн Чэнгуном, заложившее основу для ханьской миграции и политической системы',
    'map.markers.taiwanUsRelations.title': 'Культура convenience-магазинов',
    'map.markers.taiwanUsRelations.desc':
      'Тайваньские convenience-магазины с самой высокой плотностью в мире: как они превратились из розничных точек в операционную систему жизни целой страны',
    'map.markers.taiwanInternationalStatus.title':
      'Транспортная система Тайваня',
    'map.markers.taiwanInternationalStatus.desc':
      'Высокоскоростная железная дорога соединяет север и юг за 90 минут, метро плотно оплетает городские артерии, мопеды снуют между переулками',
    'map.markers.taiwanHistoricalFigures.title':
      'Культура convenience-магазинов Тайваня',
    'map.markers.taiwanHistoricalFigures.desc':
      'Королевство convenience-магазинов с самой высокой плотностью в мире: локализация и инновации 7-Eleven и FamilyMart переопределяют современный образ жизни',
    'map.markers.taiwanPoliticalFigures.title':
      'Парки Тайваня и повседневный отдых',
    'map.markers.taiwanPoliticalFigures.desc':
      'От утреннего тайцзи до вечерних прогулок — культурный анализ парков Тайваня как межпоколенческой социальной среды',
    'map.markers.kuomintangHistory.title': 'Кофейная культура Тайваня',
    'map.markers.kuomintangHistory.desc':
      'Три ведущих места в мире по плотности независимых кофеен: от зерен с горы Алишан до островной кофейной науки с офисами в кафе',
    'map.markers.democraticProgressivePartyHistory.title':
      'Остров, гоняющийся за мусоровозами: от мусорного кризиса к чуду переработки на Тайване',
    'map.markers.democraticProgressivePartyHistory.desc':
      'Место, которое в 1990-х годах имело 400 переполненных свалок и было названо международными СМИ «мусорным островом», заставило 23 миллиона человек ежедневно гоняться за мусоровозами под музыку Бетховена, и через 30 лет достигло уровня переработки ресурсов, превышающего показатели большинства европейских стран',
    'map.markers.taipeiHistory.title':
      'История развития метро Тайбэя: эволюция города, написанная кровью и деньгами',
    'map.markers.taipeiHistory.desc':
      '209 тонн стальных баллонных конструкций рухнули с неба, забрав 4 жизни; компенсация в размере 1,64 млрд — основной бизнес метро Тайбэя до сих пор работает в убыток. Реальная цена, стоящая за метрополитеном всего острова',
    'map.markers.taiwanPrehistoricCulture.title':
      'Образовательная система Тайваня: островной эксперимент от ада совместных экзаменов до лабиринта многообразия',
    'map.markers.taiwanPrehistoricCulture.desc':
      'Тайвань потратил 30 лет на то, чтобы преодолеть систему единых вступительных экзаменов, но последние изменения в системе предметных тестов привели к двукратному росту набора в подготовительные классы. Как островное государство проводит социальные эксперименты в поиске баланса между давлением в сфере образования и справедливостью доступа к учёбе?',
    'map.markers.taiwanIndigenousHistory.title': 'Тайваньская культура мопедов',
    'map.markers.taiwanIndigenousHistory.desc':
      'Островное государство, входящее в число мировых лидеров по плотности мопедов: культурная эволюция от средства передвижения до образа жизни',
    'map.markers.taiwanMilitaryHistory.title':
      'Культура и уличная облик Тайваня',
    'map.markers.taiwanMilitaryHistory.desc':
      'Жизненные коридоры, защищающие от ветра и дождя, уличные воспоминания Тайваня, где переплетаются мопеды, уличные торговцы и человеческое тепло',
    'map.markers.taiwanWomenHistory.title':
      'Ночная жизнь и культура караоке (KTV)',
    'map.markers.taiwanWomenHistory.desc':
      'От залов Qianchao до закусочных глубокой ночи, ночная жизнь острова, которая не закрывается 24 часа',
    'map.markers.taiwanEducationHistory.title':
      'Религия и народные верования: от управления страхом к империи веры',
    'map.markers.taiwanEducationHistory.desc':
      'На Тайване самая высокая в мире плотность храмов, но также и первая в мире свобода вероисповедания — за этим противоречием скрывается выживательная мудрость военных переселенцев XVII века',
    'map.markers.taiwanReligiousHistory.title': 'Культура горячих источников',
    'map.markers.taiwanReligiousHistory.desc':
      'От военного санатория до трёх величайших грязевых источников мира: история, благодаря которой Тайвань стал императором горячих источников',
    'map.markers.taiwanMediaHistory.title':
      'Традиции музыки тайваньских аборигенов',
    'map.markers.taiwanMediaHistory.desc':
      'Исследуйте богатую музыкальную культуру 16 аборигенных групп Тайваня: от древних напевов до традиционных инструментов, свидетелей тысячелетнего культурного наследия',
    'map.markers.badmintonChampions.title':
      'Индустрия производства музыкальных инструментов Тайваня: от саксофонов Хоули до мировой музыкальной фабрики',
    'map.markers.badmintonChampions.desc':
      'Изучите историю развития индустрии производства музыкальных инструментов Тайваня: от глобального лидерства в производстве саксофонов в Хоули и королевства контрактного производства гитар до прецизионного искусства создания музыкальных шкатулок. Как Тайвань перешёл от контрактного производства к собственным брендам',
    'map.markers.baseballCulture.title': 'Движение народной музыки Тайваня',
    'map.markers.baseballCulture.desc':
      'От «Пения своих песен» до изменения всего китайскоязычного музыкального круга — культурная революция 1970-х годов, принадлежавшая молодежи',
    'map.markers.taiwanBasketball.title':
      'Эволюция независимой музыкальной сцены Тайваня',
    'map.markers.taiwanBasketball.desc':
      'От андеграундных групп до независимой музыки: исследование тридцатилетнего пути развития и культурного значения неглавенного музыкального движения Тайваня',
    'map.markers.marathonRunning.title':
      'Электронная музыка и вечеринки Тайваня: от андеграундных рейвов до мировой сцены',
    'map.markers.marathonRunning.desc':
      'От рейв-культуры 1990-х до фестиваля Road to Ultra: как электронная музыка Тайваня перешла из андеграунда в мейнстрим, породив диджеев международного уровня и независимые лейблы',
    'map.markers.taiwanEsports.title':
      'Культура музыкальных фестивалей Тайваня: от Spring Scream до молодёжных культурных явлений, расцветших повсюду',
    'map.markers.taiwanEsports.desc':
      'Изучите эволюцию тайваньских музыкальных фестивалей от Spring Scream и Ocean Music Festival до Daga Open Sing, их роль как инкубатора для независимых групп и ключевого выражения молодёжной культуры',
    'map.markers.taiwanOlympics.title':
      'Современная сцена независимой музыки Тайваня',
    'map.markers.taiwanOlympics.desc':
      'От андеграундных выступлений до индустриальной экосистемы: анализ развития и культурного влияния современного тайваньского сообщества независимой музыки',
    'map.markers.taipeiCycle.title':
      'Экологическая мудрость и охрана окружающей среды коренных народов Тайваня',
    'map.markers.taipeiCycle.desc':
      'Изучение традиционных экологических знаний, накопленных коренными народами Тайваня на протяжении тысячелетий, и их важной ценности и практического применения в современном природоохранном деле',
    'map.markers.taiwanBetelNutCulture.title':
      'Горная культура и альпинизм Тайваня',
    'map.markers.taiwanBetelNutCulture.desc':
      '268 гор высотой более 3000 метров и культура «Соты великих вершин»: развитие альпинизма на Тайване и проблемы сохранения горных экосистем',
    'map.markers.taiwanElections.title': 'Лесные экосистемы Тайваня',
    'map.markers.taiwanElections.desc':
      'От субтропических побережий до горных хвойных лесов: богатый лесной мир Тайваня при вертикальном перепаде в 3000 метров',
    'map.markers.taiwanLgbtCulture.title':
      'Изменение климата и переход к чистой экономике в Тайване',
    'map.markers.taiwanLgbtCulture.desc':
      'Тайвань сталкивается с последствиями изменения климата: от учащения экстремальных погодных явлений до планов политики достижения нулевого уровня выбросов углерода к 2050 году, рассматриваются возможности и вызовы в процессе энергетического перехода',
    'map.markers.taiwanMotorcycleCulture.title':
      'Культура мототуризма на Тайване',
    'map.markers.taiwanMotorcycleCulture.desc':
      'В 2020 году в акватории Тайваня произошло самое масштабное в истории обесцвечивание кораллов. От Ляоцюлю до рифа Дунша даже кораллы в заповедных зонах погибли от высокой температуры. Что это обнажает?',
    'map.markers.taipeiMrt.title':
      'Вызовы в области борьбы с загрязнением морских вод и охраны природы на Тайване',
    'map.markers.taipeiMrt.desc':
      'Перед лицом морского мусора, чрезмерного вылова и изменения климата: анализ текущего положения, вызовов и инновационных решений в области охраны морских ресурсов Тайваня',
    'map.markers.kaohsiungMrt.title': 'Морская экосистема Тайваня',
    'map.markers.kaohsiungMrt.desc':
      'Водные пространства, охраняемые табу даоту, сегодня обесцвечиваются из-за высоких температур и подводного шума: когда тысячелетняя экологическая мудрость сталкивается с современным морским кризисом',
    'map.markers.taichungMrt.title':
      'Морская экосистема Тайваня и охрана коралловых рифов',
    'map.markers.taichungMrt.desc':
      'Тайвань окружён морем со всех сторон и обладает богатым морским биоразнообразием: от кризиса обесцвечивания коралловых рифов до охраны китообразных и дельфинов — рассматриваются результаты защиты морских национальных парков и будущие вызовы',
    'map.markers.taiwanTrainSystem.title':
      'Тайваньские горячие источники и геотермальная энергия',
    'map.markers.taiwanTrainSystem.desc':
      'От неудачной геотермальной электростанции 30-летней давности до уникального в мире камня битоу: как остров превратил подземное пламя в исцеление и зелёную электроэнергию',
    'map.markers.taiwanBusSystem.title':
      'Охрана барбариса тайваньского в Тайване',
    'map.markers.taiwanBusSystem.desc':
      'Вся Тайвань: осталось менее пятисот особей призрачных кошек — когда последние аборигенные виды кошачьих выходят на грань исчезновения',
    'map.markers.taiwanInnovationEcosystem.title': 'Тайваньская панголина',
    'map.markers.taiwanInnovationEcosystem.desc':
      'Самое контрабандно переправляемое млекопитающее в мире нашло на Тайване безопасный дом',
    'map.markers.taiwanMedicalSystem.title':
      'Тайваньская высокогорная экосистема и реликты ледниковой эпохи',
    'map.markers.taiwanMedicalSystem.desc':
      'Изучение уникальной экосистемы высокогорий Тайваня выше 3000 метров: от тайваньских тисов и рододендронов юйшаньских до драгоценного биоразнообразия реликтовых видов ледникового периода',
    'map.markers.taiwanEducationSystem.title': 'Тайваньский бурый медведь',
    'map.markers.taiwanEducationSystem.desc':
      'Белая V-образная отметина на груди — его визитная карточка: последний король тайваньских лесов и его незавершенная битва за сохранение вида',
    'map.markers.taiwanMusicIndustry.title': 'Национальные парки',
    'map.markers.taiwanMusicIndustry.desc':
      '36 197 кв. км, вмещающих 9 нацпарков, — чудо сохранения природы с самой высокой в мире плотностью',
    'map.markers.mandarinPopMusic.title': 'Нацпарки Тайваня',
    'map.markers.mandarinPopMusic.desc':
      'Изучите уникальные экосистемы и природоохранные ценности девяти нацпарков Тайваня: от субтропических побережий до снежной линии высокогорий',
    'map.markers.taiwaneseIndieMusic.title': 'Уникальные виды',
    'map.markers.taiwaneseIndieMusic.desc':
      'Богатые уникальные виды Тайваня демонстрируют эволюционное чудо островной биогеографии и важность их сохранения',
    'map.markers.taiwanRapHipHop.title': 'Биоразнообразие',
    'map.markers.taiwanRapHipHop.desc':
      'Площадь Тайваня составляет лишь 0,025% от мировой, однако здесь обитает более 50 тысяч видов организмов, а доля лесного покрова в размере 60,71% занимает 33-е место в мире',
    'map.markers.taiwanElectronicMusic.title': 'Киты и дельфины Тайваня',
    'map.markers.taiwanElectronicMusic.desc':
      'Место обитания трети всех видов китов и дельфинов мира — от прежнего китобойного промысла до современного наблюдения за китами: как Тайвань превратился в центр исследований морской экологии?',
    'map.markers.taiwanTraditionalMusic.title': 'Mayday',
    'map.markers.taiwanTraditionalMusic.desc':
      'От старшей школы Университета Нормального к мировой сцене: вечно юные юноши, определившие дух ханьюй-рока',
    'map.markers.taiwanFilmIndustry.title': 'У Бай',
    'map.markers.taiwanFilmIndustry.desc':
      'Национальное достояние тайваньского рока, синоним местного рок-музыканта, утвердивший свой рок-статус благодаря таким произведениям, как «Норвежский лес»',
    'map.markers.newTaiwanCinema.title': 'У Баочунь',
    'map.markers.newTaiwanCinema.desc':
      'Чемпион Всемирного чемпионата по хлебу, поразивший мировую общественность своим хлебобулочным изделием с личи и розой, превратившись из пиншуйского провинциала в мирового топ-пекаря-ремесленника',
    'map.markers.taiwanDocumentary.title': 'Лю Сяолянь',
    'map.markers.taiwanDocumentary.desc':
      'От преступника к вице-президенту: легендарная жизнь первой в китайском мире женщины-вице-президента',
    'map.markers.taiwanAnimationIndustry.title': 'Цзи Мэй',
    'map.markers.taiwanAnimationIndustry.desc':
      'Поэт-иллюстратор, согревающий мир книгами с картинками, выведший тайваньские комиксы на международную сцену',
    'map.markers.taiwanTelevisionIndustry.title': 'Дай Цзыин',
    'map.markers.taiwanTelevisionIndustry.desc':
      'Обладательница мирового рекорда «Королева тенниса» на 214-й неделе, тайваньская королева бадминтона от Цяньчжэня в Гаосюне до серебряной медали Олимпиады',
    'map.markers.taiwanOttPlatforms.title': 'Ли Ан',
    'map.markers.taiwanOttPlatforms.desc':
      'Автор «Убийцы жены» и «Лабиринта», пионер тайваньского феминистского литературного движения',
    'map.markers.taiwanPodcastIndustry.title': 'Ли Чжицзай',
    'map.markers.taiwanPodcastIndustry.desc':
      'От «Кая с овощного рынка» в фильме «Кувыркайся, мальчик!» до олимпийской серебряной медали: шестнадцатилетний кувырок принца тайваньской опоры',
    'map.markers.taiwanPublishing.title': 'Ли Юаньчжэ',
    'map.markers.taiwanPublishing.desc':
      'Лауреат Нобелевской премии по химии 1986 года, открывший новую область химической кинетики с помощью технологии перекрестных молекулярных пучков, первый тайванец, получивший Нобелевскую премию по науке',
    'map.markers.taiwanBookstoreCulture.title': 'Ду Цунмин',
    'map.markers.taiwanBookstoreCulture.desc':
      'Первый тайваньский доктор медицины, отец современной тайваньской медицины',
    'map.markers.taiwanComicMangaIndustry.title': 'Линь Шуэхao',
    'map.markers.taiwanComicMangaIndustry.desc':
      'От харвардского отличника до чемпиона НБА: тайваньско-американский баскетболист, вызвавший глобальную «линоманию»',
    'map.markers.taiwanGameIndustry.title': 'Линь Ицзе',
    'map.markers.taiwanGameIndustry.desc':
      'От худого ребёнка, отвергнутого легкоатлетической командой, до полярного бегуна, создавшего историю, пешком пересекшего пустыню Сахара',
    'map.markers.nationalPalaceMuseum.title': 'Линь Исюн',
    'map.markers.nationalPalaceMuseum.desc':
      'Пионер демократического движения, жертва кровавой расправы в резиденции Линя, лидер движения против строительства четвёртой АЭС',
    'map.markers.nationalParks.title': 'Ян Дэчан',
    'map.markers.nationalParks.desc':
      'Ключевая фигура нового движения тайваньского кино, лучший режиссёр Каннского фестиваля, поэт городской отчуждённости',
    'map.markers.taiwanGeography.title': 'Бай Сяньюн',
    'map.markers.taiwanGeography.desc':
      'Автор «Тайбэйцев», мастер современной литературы и пропагандист возрождения куньку',
    'map.markers.taiwanClimate.title': 'Лу Гуанчжун',
    'map.markers.taiwanClimate.desc':
      'Тайваньский автор-исполнитель и актёр, обладатель «Трёх Золотых» (Золотая мелодия, Золотой телеэкран, Золотой конь), известный народным, близким имиджем и уникальным вокальным стилем',
    'map.markers.taiwanEcosystem.title': 'Чжуан Чжиюань',
    'map.markers.taiwanEcosystem.desc':
      'Кумир настольного тенниса, олимпийский атлет четырёх игр, одинокий герой, тренировавшийся в изоляции',
    'map.markers.taiwanEndangeredSpecies.title': 'Цай Минлян',
    'map.markers.taiwanEndangeredSpecies.desc':
      'Лауреат премии «Золотой лев» Венецианской биеннале, мастер медленного кино малайзийского китайского происхождения',
    'map.markers.taiwanMarineEcology.title': 'Сюй Вэньлун',
    'map.markers.taiwanMarineEcology.desc':
      'Основатель группы Chi Mei, предприниматель, скрипач и коллекционер искусства, создатель музея Chi Mei',
    'map.markers.taiwanBirdwatching.title': 'Сюй Фанъи',
    'map.markers.taiwanBirdwatching.desc':
      'От девушки из Илань до солистки труппы Ма Чэн и основательницы труппы Ла Фан на Тайване — она рассказывает самые сильные истории Тайваня своим телом',
    'map.markers.taiwanHotSprings.title':
      'Лай Циндэ: от семьи шахтёра до врача общественного здравоохранения в Президентском дворце',
    'map.markers.taiwanHotSprings.desc':
      '16-й президент Тайваня, первая политическая фигура в конституционной истории Китайской Республики, избранная на пост президента, будучи вице-президентом',
    'map.markers.taiwanIslands.title': 'Го Сянчунь',
    'map.markers.taiwanIslands.desc':
      'Богиня тяжёлой атлетики Тайваня, золотая медалистка Олимпийских игр 2021 года в Токио, обладательница трёх олимпийских рекордов в весовой категории до 59 кг',
    'map.markers.taiwanMountains.title': 'Дэн Юйсянь',
    'map.markers.taiwanMountains.desc':
      'Отец тайваньской песни, автор классических песен на тайваньском языке «Взгляд на весенний ветер», «Цветы в дождливую ночь», «Тревога в лунную ночь» и др.',
    'map.markers.taiwanRivers.title': 'Чжун Лихэ',
    'map.markers.taiwanRivers.desc':
      'Автор «Родового человека», отец тайваньской литературы, литературный борец, который, несмотря на бедность и болезнь, продолжал творить',
    'map.markers.taiwanCoastline.title': 'Чэнь Шуцзюй',
    'map.markers.taiwanCoastline.desc':
      'Простой добрый поступок продавца овощей из Тайдуна, который всей своей жизнью показал, что такое истинное богатство',
    'map.markers.taiwanForests.title': 'Шуй Ляньфань',
    'map.markers.taiwanForests.desc':
      'Десятый и одиннадцатый президент, ключевая фигура первой смены партийной власти в 2000 году, важная персона демократизации Тайваня',
    'map.markers.taiwanNaturalDisasters.title': 'Ма Иньюй',
    'map.markers.taiwanNaturalDisasters.desc':
      'Двенадцатый и тринадцатый президент, пионер размораживания отношений через пролив, подписант ECFA',
    'map.markers.taiwanEarthquakes.title': 'Хуань Чуньмин',
    'map.markers.taiwanEarthquakes.desc':
      'Автор «Сына-великана» и «Дня, когда смотрели на море», представитель иланьской литературы родного края',
    'map.markers.taiwanTyphoons.title':
      'Хуан Чжэньнань: «Нинбо» мира библиофилов и живой источник тайваньской истории и культуры',
    'map.markers.taiwanTyphoons.desc':
      'Хуан Чжэньнань — тайваньский исследователь истории и культуры, книголюб и писатель, начавший свою деятельность под псевдонимом Sizumaru на PTT, ведёт страницу «Хуошуйлай Цэфань» (Книжный магазин «Хуошуйлай»), где делится знаниями об истории Тайваня и культуре старых книг. Автор таких книг, как «Самые запоминающиеся истории тайваньской истории», его называют «Такэути Набуко» мира книголюбия. Он вырос в семье с традициями чтения в уезде Цзяи, шэнь Чжэньцзяо, где отец и сын разделили обязанности по сбору литературы на севере и юге страны, стремясь сделать серьёзную историю Тайваня интересной и доступной для широкой публики.',
    'map.markers.sunflowerMovement.title':
      'Зоопарк и этика использования животных в шоу',
    'map.markers.sunflowerMovement.desc':
      'От слона в клетке до медуз в Xpark — Тайвань переосмысливает отношения между людьми и демонстрируемыми животными',
    'map.markers.taiwanSocialMovements.title':
      'Земельная справедливость и традиционные территории тайваньских коренных народов',
    'map.markers.taiwanSocialMovements.desc':
      'Изучение исторического контекста, правового развития, споров о разграничении традиционных территорий и результатов работы Комиссии по трансформации справедливости для коренных народов Тайваня',
    'map.markers.taiwanMarriageEquality.title':
      'Однополые браки и гендерное равенство на Тайване',
    'map.markers.taiwanMarriageEquality.desc':
      'От заключенных тюрем периода военного положения до первого в Азии закона об однополых браках: как 30-летняя борьба одного человека переопределила понятие любви на этом острове',
    'map.markers.taiwanEnvironmentalJustice.title':
      'Экологическая справедливость и конфликт интересов на Тайване',
    'map.markers.taiwanEnvironmentalJustice.desc':
      'Изучение явления неравномерного распределения экологических нагрузок на Тайване: от конфликтов Нимби вокруг мусоросжигательных заводов, ядерных отходов и нефтехимической промышленности — анализ проблем экологического неравенства и социальной справедливости',
    'map.markers.taiwanCommunityRiCulture.title':
      'Культура тайваньских общин и районов (ли)',
    'map.markers.taiwanCommunityRiCulture.desc':
      'От демократической практики на самом низовом уровне до социальных инноваций в создании общин',
    'map.markers.taiwanLongTermCare.title':
      'Развитие системы долгосрочного ухода на Тайване',
    'map.markers.taiwanLongTermCare.desc':
      'Самая передовая в мире система долгосрочного ухода, одновременно существующая в виде крупнейшей невидимой системы ухода',
    'map.markers.taiwanLaborMovement.title': 'Экология и устойчивое развитие',
    'map.markers.taiwanLaborMovement.desc':
      'От «Острова дымовых труб» к «Нулевому углероду Тайваня»: путь пробуждения 40-летней экологической борьбы',
    'map.markers.taiwanHousingIssues.title':
      'Социальное жильё и справедливость в сфере жилья',
    'map.markers.taiwanHousingIssues.desc':
      'Как Тайвань реализует справедливость в сфере жилья через политику социального обеспечения, обеспечивая каждому место для жизни',
    'map.markers.taiwanHealthcareSystem.title':
      'Развитие технологических парков',
    'map.markers.taiwanHealthcareSystem.desc':
      'От Чжу-Кэна до Нань-Кэна: изучение истории развития научных парков Тайваня и уникальной специализации трёх основных парков',
    'map.markers.taiwanImmigration.title': 'Полупроводниковая промышленность',
    'map.markers.taiwanImmigration.desc':
      'От исторической ставки Чжуна Му до эры 2-нанометровых техпроцессов: как TSMC превратила Тайвань в ключевое звено глобальной технологической цепи',
    'map.markers.taiwanReligiousDiversity.title':
      'Побережье и морские ландшафты Тайваня',
    'map.markers.taiwanReligiousDiversity.desc':
      'Шея головы королевы в Янлюйю утончается со скоростью 0,2 см в год, и однажды она обломится — это судьба и красота береговых форм Тайваня',
    'map.markers.taiwanBuddhismTaoism.title':
      'Чайная церемония и эстетика жизни на Тайване',
    'map.markers.taiwanBuddhismTaoism.desc':
      'В ночь открытия «Цзытанлу» в 1981 году представители внепартийных движений и литературная элита собирались за чаем; это был не просто чайный дом, а секретная база оппозиционного движения',
    'map.markers.taiwanFolkReligion.title':
      'Выборы и партийная политика Тайваня',
    'map.markers.taiwanFolkReligion.desc':
      'От местных депутатов в 1950 году до смены партий у власти в 2000 году: как Тайвань с помощью голосовалки написал чудо демократической трансформации',
    'map.markers.taiwanChristianity.title':
      'Городское развитие и разрыв между городом и деревней на Тайване',
    'map.markers.taiwanChristianity.desc':
      'За 70 лет аграрный остров стал городским: свет и тень концентрации 70% населения в шести крупных городах — жестокий контраст процветающего Тайчжуна и приходящего в упадок Юньлиня',
    'map.markers.taiwanIslamJudaism.title':
      'Особенности городов и региональная культура',
    'map.markers.taiwanIslamJudaism.desc':
      'От 4,04 млн жителей в Синьбэе до 1,85 млн в Тайнане: как шесть главных городов формируют свой уникальный характер в процессе промышленной трансформации',
    'map.markers.kaohsiungIncident.title': 'Демократизация',
    'map.markers.kaohsiungIncident.desc':
      'Конфликт между полицией и жителями на улицах Гаосюна 10 декабря 1979 года в конечном итоге привёл к демократической трансформации Тайваня — но какой ценой в годах жизни и свободе?',
    'map.markers.wangLeeOlympicGold.title':
      'Ван Цики и Ли Ян (парная комбинация «Лин-Ян»)',
    'map.markers.wangLeeOlympicGold.desc':
      'От одноклассников средней школы до олимпийских чемпионов: за 34 минуты «Лин-Ян» одержали победу над Китаем со счётом 2:0, став первой олимпийской золотой медалью в истории тайваньского бадминтона',
  },
  de: {
    // Meta
    'map.meta.title': 'Taiwan-Karte',
    'map.meta.description':
      'Die inhaltlichen Zusammenhänge von Taiwan.md aus Kartenperspektive erkunden',

    // Hero Section
    'map.hero.kicker': 'Map View',
    'map.hero.title': 'Taiwan-Karte',
    'map.hero.subtitle':
      'Taiwans Kultur, Küche, Natur und historische Schauplätze aus Kartenperspektive erkunden.',

    // Controls - Region Filter
    'map.controls.region.title': 'Nach Region filtern',
    'map.controls.region.all': 'Alle',
    'map.controls.region.north': 'Norden',
    'map.controls.region.central': 'Zentralregion',
    'map.controls.region.south': 'Süden',
    'map.controls.region.east': 'Osten',
    'map.controls.region.islands': 'Außeninseln',

    // Controls - Category Filter
    'map.controls.category.title': 'Nach Kategorie filtern',
    'map.controls.category.all': 'Alle',
    'map.controls.category.food': '🍜 Küche',
    'map.controls.category.history': '📜 Geschichte',
    'map.controls.category.nature': '🌿 Natur',
    'map.controls.category.culture': '🎭 Kultur',
    'map.controls.category.technology': '💻 Technologie',
    'map.controls.category.economy': '📈 Wirtschaft',
    'map.controls.category.lifestyle': '🏮 Alltagsleben',
    'map.controls.category.art': '🎨 Kunst',
    'map.controls.category.geography': '🗺️ Geografie',

    // Route Section
    'map.route.title': '🗺️ Kuratierte Routen',
    'map.route.normal-mode': 'Normaler Modus',

    // Sidebar - Default
    'map.sidebar.default.title': '📍 Artikel über Taiwan erkunden',
    'map.sidebar.default.hint':
      'Auf einen Landkreis, eine Stadt oder eine Markierung auf der Karte klicken, um Artikel zu erkunden',

    // Sidebar - County
    'map.sidebar.county.clear': '✕ Auswahl aufheben',
    'map.sidebar.county.articles-count': 'Artikel',
    'map.sidebar.county.no-articles':
      'Für diese Region sind noch keine Artikel verfügbar',

    // Sidebar - Article
    'map.sidebar.article.back': '← Zurück',
    'map.sidebar.article.read-more': 'Vollständigen Artikel lesen →',

    // Zoom Controls
    'map.zoom.in': '＋',
    'map.zoom.out': '－',
    'map.zoom.reset': '⌂',

    // Tooltips
    'map.tooltip.county.articles': 'zugehörige Artikel',
    'map.tooltip.county.click': 'Klicken, um nach dieser Region zu filtern',
    'map.tooltip.marker.reading-time': 'Minuten Lesezeit',

    // Panel (for compatibility)
    'map.panel.title': 'Taiwan-Wissenskarte',
    'map.panel.stat.points': 'Wissenspunkte',
    'map.panel.stat.categories': 'Kategorien',
    'map.panel.category-distribution': 'Kategorienverteilung',
    'map.panel.link.graph': '🕸️ Wissensgraph',
    'map.panel.link.home': '🏠 Kategorienübersicht',

    // Category Names (for JS usage)
    'map.category.history': '📜 Geschichte',
    'map.category.geography': '🗺️ Geografie',
    'map.category.culture': '🎭 Kultur',
    'map.category.food': '🍜 Küche',
    'map.category.art': '🎨 Kunst',
    'map.category.music': '🎵 Musik',
    'map.category.technology': '💻 Technologie',
    'map.category.nature': '🌿 Natur',
    'map.category.people': '👥 Persönlichkeiten',
    'map.category.society': '⚖️ Gesellschaft',
    'map.category.economy': '📈 Wirtschaft',
    'map.category.lifestyle': '🏮 Alltagsleben',

    // Additional UI text
    'map.sidebar.more-articles': '⋯und weitere',
    'map.sidebar.more-articles-suffix': 'Artikel',

    // Routes
    'map.routes.nightMarkets.name': '🍜 Tour durch die Nachtmärkte',
    'map.routes.nightMarkets.description':
      'Von Norden nach Süden: Taiwans prägendste Nachtmarktkultur',
    'map.routes.nationalParks.name': '🏔️ Tour durch die Nationalparks',
    'map.routes.nationalParks.description':
      'Von 3,952 Meter hohen Bergen bis zu tropischen Korallenriffen: Taiwans Naturwunder',
    'map.routes.historyTrail.name': '📜 Historische Spuren',
    'map.routes.historyTrail.description':
      'Von der niederländischen Kolonialzeit bis zur Demokratisierung: vierhundert Jahre Taiwan',
    'map.routes.oldStreets.name': '🏮 Spaziergang durch historische Straßen',
    'map.routes.oldStreets.description':
      'Taiwans Erinnerungen in jahrhundertealten Straßen, wo Architektur Geschichte erzählt',

    'map.routes.counties22.name':
      '📍 Hintergrundartikel zu 22 Landkreisen und Städten',
    'map.routes.counties22.description':
      '22 Hintergrundartikel von Taiwan.md über alle Landkreise und Städte – vom Pilotartikel zu Keelung bis zum Finale über Neu-Taipeh: für jeden Ort ein zentraler Widerspruch.',
    'map.counties22.panel.title':
      '📍 Hintergrundartikel zu 22 Landkreisen und Städten',
    'map.counties22.panel.hint':
      'Eine Ortskarte anklicken oder einen Ort auf der Karte auswählen',
    'map.counties22.tooltip.openDeep':
      'Klicken, um den Hintergrundartikel zu öffnen',
    'map.counties22.deepCard.badge':
      '📖 Reihe zu 22 Landkreisen und Städten · Hintergrundartikel',
    'map.counties22.deepCard.cta': 'Vollständigen Artikel lesen →',

    // Night Markets Stops
    'map.stops.shilinNightMarket.name': 'Shilin-Nachtmarkt',
    'map.stops.shilinNightMarket.note':
      'Taiwans größter touristischer Nachtmarkt und Ursprungsort des mit kleinem Fladen gefüllten Fladens',
    'map.stops.raoheNightMarket.name': 'Raohe-Nachtmarkt',
    'map.stops.raoheNightMarket.note':
      'Pilgerstätte für Pfefferbrötchen und lokaler Favorit der Menschen in Taipeh',
    'map.stops.ningxiaNightMarket.name': 'Ningxia-Nachtmarkt',
    'map.stops.ningxiaNightMarket.note':
      'Höchste Imbissdichte und von Michelin empfohlene Straße mit bodenständiger Küche',
    'map.stops.fengjiaNightMarket.name': 'Fengjia-Nachtmarkt',
    'map.stops.fengjiaNightMarket.note':
      'Experimentierfeld für kreative Snacks und Vorreiter der Innovation auf Taiwans Nachtmärkten',
    'map.stops.huayuanNightMarket.name': 'Huayuan-Nachtmarkt',
    'map.stops.huayuanNightMarket.note':
      'Tainans größter Nachtmarkt – ein Spektakel, das nur an drei Tagen pro Woche stattfindet',
    'map.stops.liuheNightMarket.name': 'Liuhe-Nachtmarkt',
    'map.stops.liuheNightMarket.note':
      'Kaohsiungs berühmter Nachtmarkt, auf dem Meeresfrüchte im Mittelpunkt stehen',

    // National Parks Stops
    'map.stops.yangmingshanNationalPark.name': 'Yangmingshan-Nationalpark',
    'map.stops.yangmingshanNationalPark.note':
      'Taipehs Naherholungsgebiet mit Vulkanlandschaften und verborgenen heißen Quellen',
    'map.stops.tarokoNationalPark.name': 'Taroko-Nationalpark',
    'map.stops.tarokoNationalPark.note':
      'Eine Marmorschlucht und ein geologisches Naturwunder von Weltrang',
    'map.stops.yushanNationalPark.name': 'Yushan-Nationalpark',
    'map.stops.yushanNationalPark.note':
      'Der höchste Gipfel Nordostasiens (3,952m) und das Dach Taiwans',
    'map.stops.alishanScenicArea.name': 'Nationales Landschaftsgebiet Alishan',
    'map.stops.alishanScenicArea.note':
      'Sonnenaufgang über dem Wolkenmeer, Baumriesen und Waldeisenbahn',
    'map.stops.sunMoonLakeScenicArea.name':
      'Nationales Landschaftsgebiet Sonne-Mond-See',
    'map.stops.sunMoonLakeScenicArea.note':
      'Taiwans größter natürlicher See und heiliger See der Thao',
    'map.stops.kentingNationalPark.name': 'Kenting-Nationalpark',
    'map.stops.kentingNationalPark.note':
      'Taiwans äußerster Süden mit tropischen Korallenriffen und der Hengchun-Halbinsel',

    // History Trail Stops
    'map.stops.anpingFort.name': 'Fort Zeelandia',
    'map.stops.anpingFort.note':
      '1624 von den Niederländern erbaut, Taiwans älteste Festung',
    'map.stops.chikanTower.name': 'Chihkan-Turm',
    'map.stops.chikanTower.note':
      'Vom niederländischen Fort Provintia zum Herrschaftssymbol von Koxinga',
    'map.stops.lukang.name': 'Lukang',
    'map.stops.lukang.note':
      'Taiwans zweitgrößte Stadt unter der Qing-Dynastie: „Tainan zuerst, Lukang zweitens, Monga drittens“',
    'map.stops.presidentialOffice.name':
      'Präsidentenpalast (ehemaliges Generalgouverneursamt von Taiwan)',
    'map.stops.presidentialOffice.note':
      '1919 fertiggestellt, oberstes Machtzentrum während der japanischen Herrschaft',
    'map.stops.chiangKaiShekMemorialHall.name':
      'Chiang-Kai-shek-Gedächtnishalle',
    'map.stops.chiangKaiShekMemorialHall.note':
      'Symbol der autoritären Herrschaft und Brennpunkt der Debatte über Übergangsjustiz',
    'map.stops.legislativeYuan.name': 'Legislativ-Yuan (Sonnenblumen-Bewegung)',
    'map.stops.legislativeYuan.note':
      'Schauplatz der Sonnenblumen-Studentenbewegung von 2014 und Meilenstein der taiwanischen Demokratie',

    // Old Streets Stops
    'map.stops.dihuaStreet.name': 'Dihua-Straße',
    'map.stops.dihuaStreet.note':
      'Das Herz von Dadaocheng, bekannt für Lebensmittel aus Nord und Süd sowie den Neujahrsmarkt',
    'map.stops.jiufenOldStreet.name': 'Altstadtstraße von Jiufen',
    'map.stops.jiufenOldStreet.note':
      'Erinnerungen an die goldene Ära des Bergbaus und Inspirationsquelle für Chihiros Reise ins Zauberland',
    'map.stops.lukangOldStreet.name': 'Altstadtstraße von Lukang',
    'map.stops.lukangOldStreet.note':
      'Ein lebendiges Museum aus historischen Backsteinhäusern und traditionellem Handwerk',
    'map.stops.anpingOldStreet.name': 'Altstadtstraße von Anping',
    'map.stops.anpingOldStreet.note':
      'Taiwans erste Straße, geprägt von vierhundert Jahren Geschichte',
    'map.stops.qishanOldStreet.name': 'Altstadtstraße von Qishan',
    'map.stops.qishanOldStreet.note':
      'Barockes Architekturensemble aus dem Königreich der Bananen',
    'map.stops.tamsuiOldStreet.name': 'Altstadtstraße von Tamsui',
    'map.stops.tamsuiOldStreet.note':
      'Sonnenuntergänge, A-gei und historisches Flair an der Mündung des Tamsui-Flusses',

    // Cities
    'map.city.taipei': 'Taipeh',
    'map.city.newTaipei': 'Neu-Taipeh',
    'map.city.keelung': 'Keelung',
    'map.city.taoyuan': 'Taoyuan',
    'map.city.hsinchu': 'Hsinchu',
    'map.city.miaoli': 'Miaoli',
    'map.city.taichung': 'Taichung',
    'map.city.changhua': 'Changhua',
    'map.city.nantou': 'Nantou',
    'map.city.chiayi': 'Chiayi',
    'map.city.tainan': 'Tainan',
    'map.city.kaohsiung': 'Kaohsiung',
    'map.city.pingtung': 'Pingtung',
    'map.city.yilan': 'Yilan',
    'map.city.hualien': 'Hualien',
    'map.city.taitung': 'Taitung',
    'map.city.penghu': 'Penghu',
    'map.city.kinmen': 'Kinmen',

    // Markers
    'map.markers.founderCheYuWu.title': 'Gründer — 吳哲宇 Che-Yu Wu',
    'map.markers.founderCheYuWu.desc':
      'Vom Programmcode zur Poesie: der internationale Durchbruch eines taiwanischen Künstlers',
    'map.markers.taiwanIndigenousContemporaryArt.title':
      'Zeitgenössische indigene Kunst Taiwans',
    'map.markers.taiwanIndigenousContemporaryArt.desc':
      'Vom traditionellen Handwerk bis zur zeitgenössischen Kunst: Wie indigene Kunstschaffende Taiwans auf der globalen Kunstbühne ihre Stimme erheben und den Dialog zwischen indigener Identität und zeitgenössischer Kunst neu bestimmen',
    'map.markers.taiwanExperimentalNewMediaArt.title':
      'Experimentelle Kunst und Medienkunst aus Taiwan',
    'map.markers.taiwanExperimentalNewMediaArt.desc':
      'Von Videokunst bis zu interaktiver VR: die innovative Entwicklung der taiwanischen Medienkunst und ihres Kunst-und-Technologie-Ökosystems',
    'map.markers.taiwanArchitecture.title': 'Taiwanische Architektur',
    'map.markers.taiwanArchitecture.desc':
      'Vom Schieferhaus bis zum Wolkenkratzer: eine architektonische Zeitreise über eine Insel',
    'map.markers.taiwanNewMediaArt.title': 'Taiwanische Medienkunst',
    'map.markers.taiwanNewMediaArt.desc':
      'Taiwans Kultur und Geschichten entdecken',
    'map.markers.taiwanWatercolorCenturyEvolution.title':
      'Ein Jahrhundert taiwanischer Aquarellmalerei',
    'map.markers.taiwanWatercolorCenturyEvolution.desc':
      'Von der wegweisenden Arbeit Ishikawa Kinichirōs während der japanischen Herrschaft bis zum internationalen Erfolg des zeitgenössischen Künstlers Chien Chung-wei: In einem Jahrhundert entwickelte sich Taiwan zu einem der lebendigsten Zentren der Aquarellkunst in Asien.',
    'map.markers.taiwanModernPoetry.title': 'Moderne taiwanische Lyrik',
    'map.markers.taiwanModernPoetry.desc':
      'Wie modernistische Experimente aus drei Studierzimmern unerwartet eine Revolution der heimatverbundenen Lyrik auslösten',
    'map.markers.taiwanContemporarySculpture.title':
      'Entwicklung der zeitgenössischen Bildhauerei Taiwans',
    'map.markers.taiwanContemporarySculpture.desc':
      'Von Yuyu Yang und Ju Ming bis zur neuen Generation: Entwicklungslinien und schöpferischer Geist der taiwanischen Bildhauerei',
    'map.markers.taiwanCuratorsArtCulture.title':
      'Taiwanische Kuratoren und der Aufbau der Kunstkultur',
    'map.markers.taiwanCuratorsArtCulture.desc':
      'Von unabhängiger Kuration bis zum Museumssystem: Wie taiwanische Kuratoren den kulturellen Diskurs und internationalen Dialog der zeitgenössischen Kunst gestalten',
    'map.markers.newMediaArt.title': 'Medienkunst',
    'map.markers.newMediaArt.desc':
      'Taiwans wegweisende Erkundung der digitalen Kunst: die Verbindung von Technologie und Geisteswissenschaften, vom Labor bis zur internationalen Bühne',
    'map.markers.contemporaryTaiwanLiterature.title':
      'Zeitgenössische taiwanische Literatur',
    'map.markers.contemporaryTaiwanLiterature.desc':
      'Taiwans Kultur und Geschichten entdecken',
    'map.markers.taiwanContemporaryArt.title': 'Zeitgenössische Kunst Taiwans',
    'map.markers.taiwanContemporaryArt.desc':
      'Vom Taipei Fine Arts Museum bis zum Taiwan-Pavillon der Biennale von Venedig: die besondere Stellung der zeitgenössischen Kunst Taiwans auf der Weltbühne',
    'map.markers.kinmenGuesthouseMuseum.title': 'ALIEN Art Centre',
    'map.markers.kinmenGuesthouseMuseum.desc':
      'Eine Militärherberge aus dem Kalten Krieg, die Abschied und Wiedersehen erlebte, nach zwanzig Jahren Schlaf von einem Vater und seiner Tochter wiedererweckt wurde und heute von Lonely Planet als erste Adresse für Kunst in Kaohsiung empfohlen wird.',
    'map.markers.renjianMagazine.title': 'Ren-Jian Magazine',
    'map.markers.renjianMagazine.desc':
      '47 Ausgaben, vier Jahre, eine stille Revolution mit Fotografie und Text — der Ausgangspunkt der taiwanischen Reportageliteratur',
    'map.markers.taiwanIndigenousCulture.title': 'Indigene Kulturen Taiwans',
    'map.markers.taiwanIndigenousCulture.desc':
      'Von den vielfältigen Traditionen der sechzehn anerkannten Völker bis zur zeitgenössischen Wiederbelebung durch die Kunst: die tiefen Wurzeln und moderne Transformation der indigenen Kulturen Taiwans',
    'map.markers.taiwan16IndigenousTribes.title':
      'Kulturkarte der 16 indigenen Völker Taiwans',
    'map.markers.taiwan16IndigenousTribes.desc':
      'Verbreitungsgebiete, Sprachsysteme, bedeutende Feste und die Entwicklung zeitgenössischer Kunst der 16 indigenen Völker Taiwans entdecken und ihre kulturelle Vielfalt kennenlernen',
    'map.markers.taiwanNightMarketCulture.title':
      'Taiwans Nachtmarktkultur und Imbissvielfalt',
    'map.markers.taiwanNightMarketCulture.desc':
      'Eine vertiefte Erkundung der Entstehung und besonderen Faszination taiwanischer Nachtmärkte sowie der Geschichte und kulturellen Bedeutung ihrer typischen Imbissgerichte',
    'map.markers.taiwanSensibilityKoreanPerspective.title':
      'Taiwan Sensibility: taiwanische Ästhetik aus koreanischer Sicht',
    'map.markers.taiwanSensibilityKoreanPerspective.desc':
      'Von K-pop MV bis zur Buchmesse in Seoul: Wie „대만감성“ Taiwans alltägliche Straßenszenen zu einem der faszinierendsten ästhetischen Symbole Asiens macht',
    'map.markers.taiwanCulturalCreativeParks.title':
      'Entwicklung der Kultur- und Kreativparks Taiwans',
    'map.markers.taiwanCulturalCreativeParks.desc':
      'Von der Revitalisierung alter Gebäude bis zu Kreativquartieren: Entwicklung und innovative Modelle der Kultur- und Kreativparks Taiwans',
    'map.markers.taiwanOldStreetCulture.title':
      'Taiwans historische Straßen und Geschäftsviertel',
    'map.markers.taiwanOldStreetCulture.desc':
      'Vom florierenden Hafenhandel der Qing-Dynastie bis zu barocken Häusern aus der japanischen Herrschaft: Taiwans historische Straßen erzählen eine in Ziegel und Stein geschriebene Alltagsgeschichte',
    'map.markers.taiwanTeaCeremonyLifeAesthetics.title':
      'Taiwanische Teekultur und Ästhetik des Alltags',
    'map.markers.taiwanTeaCeremonyLifeAesthetics.desc':
      'Von Gongfu-Tee bis zur Ästhetik des Teetischs: Wie Taiwan östliche Teekultur mit lokaler Lebensästhetik verbindet und weiterentwickelt',
    'map.markers.taiwanStreetArtGraffiti.title':
      'Street-Art- und Graffiti-Kultur in Taiwan',
    'map.markers.taiwanStreetArtGraffiti.desc':
      'Von illegalen Graffiti bis zu legalen Wandmalereien: Wie städtische Wände zur kreativen Bühne für Taiwans Kunstschaffende werden',
    'map.markers.taiwanIncenseMakingCulture.title':
      'Taiwans Räucherstäbchen-Kultur und die Heimat der Räucherstäbchenstäbe',
    'map.markers.taiwanIncenseMakingCulture.desc':
      'Von der hundertjährigen Kunst der Räucherstäbchenstäbe in der Gemeinde Yunxiao in Chiayi bis zur landesweit verbreiteten Räucherstäbchenindustrie Taiwans — ein altes Gewerbe, geprägt von Frömmigkeit, Handwerkskunst und Beharrlichkeit',
    'map.markers.taiwanHomophoneTaboos.title':
      'Homophone Tabus in Taiwan: Warum lässt die Zahl „vier“ eine ganze Gesellschaft Stockwerke überspringen?',
    'map.markers.taiwanHomophoneTaboos.desc':
      'Von Krankenhäusern ohne vierten Stock bis zu Rekordpreisen für das Kennzeichen 8888: Taiwans Sensibilität für gleichklingende Wörter sucht weltweit ihresgleichen',
    'map.markers.hakkaCultureLanguage.title': 'Kultur und Sprache der Hakka',
    'map.markers.hakkaCultureLanguage.desc':
      'Der Geist unbeugsamer Beharrlichkeit und der Tag, an dem der Himmel geflickt wird: kulturelle Überlieferung und moderne Wiederbelebung der Hakka in Taiwan',
    'map.markers.ethnicGroupsTaiwan.title':
      'Bevölkerungsgruppen (Hoklo, Hakka, Indigene, Waishengren und neue Zugewanderte)',
    'map.markers.ethnicGroupsTaiwan.desc':
      'Taiwans ethnische Vielfalt ist nicht nur das Ergebnis seiner historischen Entwicklung, sondern auch ein Schlüssel zum Verständnis der heutigen taiwanischen Gesellschaft. Diese Gesellschaftsstruktur des vielfältigen Zusammenlebens ist sowohl eine Quelle der kulturellen Kreativität Taiwans als auch eine wichtige Grundlage für die Entwicklung seiner Demokratie. Eine gemeinsame taiwanische Identität zu schaffen und zugleich die kulturellen Besonderheiten aller Bevölkerungsgruppen zu achten, bleibt eine zentrale Aufgabe für Taiwans Gesellschaft.',
    'map.markers.chinaSteel.title':
      'China Steel: Der „eiserne Minister“ und die Stahllegende der zehn großen Infrastrukturprojekte',
    'map.markers.chinaSteel.desc':
      'Von Chao Yao-tungs geschicktem Technologieerwerb bei Verhandlungen in Europa und den USA bis zur ersten weißen Rauchfahne über Xiaogang in Kaohsiung: In 50 Jahren schuf China Steel das Rückgrat der taiwanischen Schwerindustrie und wurde zum erfolgreichsten Juwel der zehn großen Infrastrukturprojekte',
    'map.markers.taiwanCement.title':
      'Taiwan Cement: Die grüne Transformation von Taiwans erstem börsennotierten Unternehmen',
    'map.markers.taiwanCement.desc':
      '1962 entstand Taiwans Börse eigens für dieses Unternehmen; der Börsencode 1101 symbolisiert den Ursprung des taiwanischen Aktienmarkts. Unter drei Generationen der Familie Koo und nach 76 Jahren Geschäftstätigkeit bezeugen die Zementöfen von Taiwan Cement Taiwans Bauwunder. Heute wandelt sich das Unternehmen zu einem grünen Konzern für das Zeitalter der Klimaneutralität',
    'map.markers.tsmc.title': 'Taiwanisches Unternehmen: TSMC',
    'map.markers.tsmc.desc':
      'Weltmarktführer in der Auftragsfertigung von Halbleitern und entscheidende Lebensader der digitalen Zivilisation',
    'map.markers.chimeiCorporation.title':
      'Chi Mei Corporation: Hsu Wen-lungs Acrylimperium und sein Museumstraum',
    'map.markers.chimeiCorporation.desc':
      'Ausgehend von einer kleinen Fabrik in Rende, Tainan, schuf Hsu Wen-lung ab 1960 in einem Lebenswerk Asiens größtes ABS-Materialienimperium und gründete zudem das Chimei Museum, um der Gesellschaft etwas zurückzugeben. Ein Beleg dafür, dass taiwanische Unternehmen wirtschaftlichen Erfolg mit humanistischem Engagement verbinden können',
    'map.markers.acer.title':
      'Acer Group (Acer) - Wegbereiter des Wandels in der PC-Branche',
    'map.markers.acer.desc':
      'Der aus Taoyuan in Taiwan stammende PC-Pionier entwickelte das Geschäftsmodell „mehrere Marken, mehrere Vertriebskanäle“ und wurde zu einem Motor des Wandels in der weltweiten PC-Branche',
    'map.markers.giantBicycles.title':
      'Taiwanisches Unternehmen: Giant Manufacturing',
    'map.markers.giantBicycles.desc':
      'Vom abhängigen Auftragsfertiger, den ein großer US-Konzern fallen ließ, zum verborgenen Imperium, das weltweite technische Standards für Fahrräder setzt',
    'map.markers.quantaComputer.title':
      'Taiwanisches Unternehmen: Quanta Computer',
    'map.markers.quantaComputer.desc':
      'Vom Fabrikbrand zum weltgrößten Notebookhersteller: Wie Barry Lam ein neues Imperium für das KI-Zeitalter errichtete',
    'map.markers.aseGroup.title': 'Taiwanisches Unternehmen: ASE Semiconductor',
    'map.markers.aseGroup.desc':
      'Der weltweit größte Anbieter für Halbleitermontage und -tests: Warum wechselte ein Bauunternehmer in die Halbleiterbranche?',
    'map.markers.esunFinancialHolding.title':
      'Taiwanisches Unternehmen: E.Sun Financial Holding',
    'map.markers.esunFinancialHolding.desc':
      'Von einer auf Kreditkarten spezialisierten Bank zum Vorreiter des digitalen Finanzwesens: die Erfolgsgeschichte des mit 43 Jahren jüngsten Geschäftsführers einer Finanzholding',
    'map.markers.changChunPetrochemical.title':
      'Taiwanisches Unternehmen: Chang Chun Petrochemical',
    'map.markers.changChunPetrochemical.desc':
      'Von einer kleinen Fabrik im Tainan des Jahres 1949 zum weltweiten Chemiekonzern: die Geschichte eines verborgenen Champions nach dem Grundsatz „kein Börsengang, keine Kredite“',
    'map.markers.formosaPlasticsGroup.title':
      'Taiwanisches Unternehmen: Evergreen Marine',
    'map.markers.formosaPlasticsGroup.desc':
      'Von einem gebrauchten Schiff zum weltweiten Schifffahrtsimperium: Chang Yung-fas Blue-Ocean-Legende',
    'map.markers.taipeiFubon.title':
      'Ökonomie der Nachtmärkte: ein Geschäftswunder ohne Marken',
    'map.markers.taipeiFubon.desc':
      'Wie Taiwans Nachtmärkte ohne Marken, Ladenausstattung oder feste Standorte ein Wirtschaftswunder mit einem jährlichen Produktionswert von fast 4000億 schaffen',
    'map.markers.taiwan7Eleven.title': 'Taiwans Kaffeeindustrie',
    'map.markers.taiwan7Eleven.desc':
      'Von den Anfängen des Anbaus während der japanischen Kolonialzeit bis zum Weltmeister Simple Kaffa: hundert Jahre Entwicklung des taiwanischen Kaffees',
    'map.markers.taiwanHighSpeedRail.title':
      'Karte regionaler Spezialitäten Taiwans',
    'map.markers.taiwanHighSpeedRail.desc':
      'Von Dingbianhu am Tempelmarkt von Keelung bis zu Schweinshaxen aus Wanluan in Pingtung, von Fleischbällchen aus Hsinchu bis zu Zimtäpfeln aus Taitung: Jede Stadt besitzt ihre eigene kulinarische DNA. Auf den Spuren der Einheimischen geht es zu den typischsten regionalen Spezialitäten der 22 Städte und Landkreise Taiwans — und zur authentischen Alltagskultur der Insel.',
    'map.markers.taiwanSemiconductorIndustry.title':
      'Taiwans traditionelle Festgerichte: Geschmackserinnerungen, die zu verschwinden drohen',
    'map.markers.taiwanSemiconductorIndustry.desc':
      'Von Minzhhähnchen aus Chiayi bis zur Suppe aus Festtagsresten: Großmutters Spezialitäten bewahren Familienerinnerungen, doch im Wandel der Zeit geht dieses Wissen allmählich verloren',
    'map.markers.taiwanBankingSystem.title':
      'Kulinarische Fusion der neuen Zugewanderten in Taiwan',
    'map.markers.taiwanBankingSystem.desc':
      'Wenn thailändische Säure und Schärfe auf Taiwans süß-salzige Aromen treffen, vietnamesische Pho taiwanische Luwei begegnet und indonesische Gewürze heimische Zutaten umarmen, vollzieht sich in Taiwan still eine kulinarische Revolution über Landesgrenzen hinweg. Die neuen Zugewanderten bringen nicht nur die Küche ihrer Heimat mit, sondern eröffnen auch völlig neue Möglichkeiten für Taiwans Esskultur.',
    'map.markers.taiwanSmes.title': 'Taiwan, das Königreich der Früchte',
    'map.markers.taiwanSmes.desc':
      'Von Mangos und Litschis bis zu Zimtäpfeln und Javaäpfeln: eine süße Erfolgsgeschichte tropischer Vielfalt und landwirtschaftlicher Innovation',
    'map.markers.youbikePublicBikeSystem.title': 'Taiwans Meeresfrüchtekultur',
    'map.markers.youbikePublicBikeSystem.desc':
      'Fangfrische Lieferungen aus den Fischereihäfen, die Kultur der Meeresfrüchterestaurants und Gerichte wie Austernomeletts zeigen den Inselcharakter des ringsum vom Meer umgebenen Taiwan und seine reiche kulinarische Tradition mit Meeresfrüchten',
    'map.markers.taiwanFoodBeverageIndustry.title':
      'Michelin und gehobene Gastronomie in Taiwan',
    'map.markers.taiwanFoodBeverageIndustry.desc':
      '2018 erschien auf dem roten Umschlag des Guide Michelin erstmals der Schriftzug „TAIPEI“ — ein Zeichen dafür, dass Taiwans Gastronomie offiziell Teil des internationalen Bewertungssystems geworden war. Vom Straßenstand bis zum Sternerestaurant, von Alltagsgerichten bis zur Haute Cuisine präsentiert Taiwans Esskultur auf der internationalen Bühne eine faszinierende Verbindung von Tradition und Innovation.',
    'map.markers.taiwanAgriculturalReform.title': 'Nachtmarktkultur',
    'map.markers.taiwanAgriculturalReform.desc':
      '164 registrierte Nachtmärkte, in Tainan durchschnittlich ein Nachtmarkt je 3.8萬 Einwohner: vom Tempelvorplatz zur internationalen Touristenattraktion',
    'map.markers.taiwanTeaIndustry.title': 'Esskultur der Hakka',
    'map.markers.taiwanTeaIndustry.desc':
      'Die reiche und vielfältige Esskultur der Hakka reicht vom vollmundigen Aroma des Lei Cha bis zum Waldduft der in Blätter gewickelten Wildingwer-Reisklößchen und zeigt ihre Lebensklugheit: sparsam haushalten und nutzen, was vor Ort verfügbar ist',
    'map.markers.taiwanFishingIndustry.title': 'Rindfleischnudelsuppe',
    'map.markers.taiwanFishingIndustry.desc':
      'Von der Sehnsucht der vom chinesischen Festland Zugewanderten zum taiwanischen Nationalgericht: kulturelle Verschmelzung und weltweite Verbreitung der Rindfleischnudelsuppe',
    'map.markers.taiwanFruitIndustry.title': 'Teekultur',
    'map.markers.taiwanFruitIndustry.desc':
      'Die Entwicklung der taiwanischen Teekultur von der traditionellen Teekunst bis zu modernen handgeschüttelten Getränken zeigt die einzigartigen Teesorten und Trinkgewohnheiten der Insel',
    'map.markers.taiwanRiceVarieties.title':
      'Auf einer schwankenden Insel bauten sie einen Turm, der fliegen kann',
    'map.markers.taiwanRiceVarieties.desc':
      'Nur 200 Meter von einer aktiven Verwerfung entfernt bestanden die Menschen in Taiwan darauf, auf denkbar instabilem Boden das höchste Gebäude der Welt zu errichten — und dann kletterte ein Verrückter in 91 Minuten mit bloßen Händen hinauf.',
    'map.markers.nightMarketCulture.title':
      'Taiwans fünf große Landschaftsformen und seine geografische Struktur: Inselwelten von Gebirgen bis zu Ebenen',
    'map.markers.nightMarketCulture.desc':
      'Taiwans einzigartige geografische Struktur entdecken: vom Zentralgebirge bis zu den westlichen Ebenen und zur landschaftlichen Vielfalt dieser Insel',
    'map.markers.bubbleTeaGlobalPhenomenon.title': 'Taiwans Verkehrsnetz',
    'map.markers.bubbleTeaGlobalPhenomenon.desc':
      'Hochgeschwindigkeitsbahn, Metro, Straßen und Luftverkehr verweben Taiwan zu einem dreidimensionalen Verkehrsnetz',
    'map.markers.taiwanBeefNoodle.title':
      'Taiwans System nationaler Landschaftsschutzgebiete',
    'map.markers.taiwanBeefNoodle.desc':
      'Von der Nordostküste bis Kenting präsentieren Taiwans 13 nationale Landschaftsschutzgebiete vielfältige Natur- und Kulturlandschaften',
    'map.markers.taiwanHotPotCulture.title':
      'Geografische Besonderheiten und Entstehung der Insel Taiwan',
    'map.markers.taiwanHotPotCulture.desc':
      'Eine Erkundung der einzigartigen Inselgeografie Taiwans – von der Plattentektonik bis zur Geländeformation – und der Naturgeheimnisse der Insel Formosa',
    'map.markers.taiwanFineDining.title':
      'Plattentektonik und Erdbebenaktivität in Taiwan',
    'map.markers.taiwanFineDining.desc':
      'Eine Untersuchung der geologischen Besonderheiten Taiwans an der Grenze zwischen der Eurasischen und der Philippinischen Platte sowie der Ursachen häufiger Erdbeben',
    'map.markers.taiwanStreetFood.title':
      'Stauseen und Wasserressourcenmanagement in Taiwan',
    'map.markers.taiwanStreetFood.desc':
      'Von Wasserknappheit bis zur Versandung der Stauseen: Taiwans Herausforderungen bei den Wasserressourcen und das Gefälle zwischen Nord und Süd',
    'map.markers.taiwanVegetarianCulture.title':
      'Taiwans Flusssysteme und hydrologische Besonderheiten: kurze, reißende Flüsse und jahreszeitlicher Wandel',
    'map.markers.taiwanVegetarianCulture.desc':
      'Eine Erkundung der einzigartigen Flusssysteme Taiwans, vom Zhuoshui bis zum Gaoping, und der Frage, wie die Inseltopografie Taiwans hydrologische Besonderheiten prägt',
    'map.markers.taiwanCoffeeCulture.title':
      'Taiwans Küstenformen und Meereslandschaften',
    'map.markers.taiwanCoffeeCulture.desc':
      'Von den Buchten und Kaps im Norden bis zu den Verwerfungsküsten im Osten: Taiwans vielfältige Küstenformen zeigen die eindrucksvolle Gestaltungskraft der Plattentektonik',
    'map.markers.taiwanSnackCulture.title':
      'Taiwans Thermalquellenlandschaften',
    'map.markers.taiwanSnackCulture.desc':
      'Beitou, Zhiben und Jiaoxi: eine faszinierende Begegnung von Thermalquellenkultur und Geologie',
    'map.markers.taiwanSeafoodCulture.title':
      'Taiwan als Hotspot der biologischen Vielfalt',
    'map.markers.taiwanSeafoodCulture.desc':
      'Auf einer Insel von 3.6 萬 Quadratkilometern leben 5.9 萬 Arten – ihre Dichte ist 100-mal so hoch wie der weltweite Durchschnitt',
    'map.markers.taiwanPineappleCake.title':
      'Agrarlandschaften und räumliche Verteilung der Landwirtschaft in Taiwan',
    'map.markers.taiwanPineappleCake.desc':
      'Der Wandel der Agrarlandschaften von Nord nach Süd verdeutlicht Taiwans Weg von der „Kornkammer Taiwans“ zur „hochwertigen Landwirtschaft“',
    'map.markers.taiwanPorkRibSoup.title':
      'Stadtentwicklung und Stadt-Land-Gefälle in Taiwan',
    'map.markers.taiwanPorkRibSoup.desc':
      'Taiwans ungleiche Stadt-Land-Entwicklung im Gefüge der sechs regierungsunmittelbaren Städte und der räumliche Wandel vom landwirtschaftlich geprägten zum urbanen Taiwan',
    'map.markers.taiwanOysterOmelette.title': 'Topografie und Geologie',
    'map.markers.taiwanOysterOmelette.desc':
      'Eine 600萬 Jahre alte Insel birgt 2億 Jahre alte Erinnerungen – ein Wunder des jüngsten Gebirgsgürtels der Welt und einer der heftigsten Plattenkollisionen',
    'map.markers.taiwanBreakfastCulture.title':
      'Städtische Besonderheiten und regionale Kulturen',
    'map.markers.taiwanBreakfastCulture.desc':
      'Von der internationalen Metropole Taipei bis zum historischen Flair Tainans: Wie Taiwans Städte jeweils eine eigene lokale Identität formen',
    'map.markers.taiwanConvenienceStoreFood.title':
      'Vorgelagerte Inseln und maritime Kultur: von der weltweit höchsten Dichte an Steinwehrfischereien bis zum ökologischen Recht der Fliegende-Fische-Saison',
    'map.markers.taiwanConvenienceStoreFood.desc':
      'Weltweit gibt es weniger als 600 Steinwehrfischereien, davon 574 allein auf Penghu. Ein Inselvolk, das gezielt Fliegende Fische fängt, verwandelte Tabus in ein hochpräzises System zur Bewirtschaftung mariner Ressourcen',
    'map.markers.dutchSpanishColonialPeriod.title':
      'Der Zwischenfall vom 28. Februar und der Weiße Terror: Trauma und Erinnerung unter Taiwans autoritärer Herrschaft',
    'map.markers.dutchSpanishColonialPeriod.desc':
      'Vom Zwischenfall vom 28. Februar 1947 bis zum 38 Jahre währenden Kriegsrecht erlebte Taiwan staatliche Gewalt unter autoritärer Herrschaft. Erst nach dessen Aufhebung begann die Aufarbeitung historischer Traumata und die Förderung der Übergangsjustiz.',
    'map.markers.zhengDynastyPeriod.title':
      'Krisen in der Taiwanstraße und Entwicklung der Beziehungen zwischen Taiwan und China',
    'map.markers.zhengDynastyPeriod.desc':
      'Ein Rückblick auf die drei großen Krisen in der Taiwanstraße und die über siebzigjährige Entwicklung der Beziehungen zwischen Taiwan und China, um den historischen Kontext und die heutigen Herausforderungen zu verstehen',
    'map.markers.qingDynastyTaiwanHistory.title':
      'Geschichte des taiwanischen Seehandels',
    'map.markers.qingDynastyTaiwanHistory.desc':
      'Taiwan im Zeitalter der Entdeckungen: die wechselvolle Geschichte vom internationalen Handelszentrum zum Piratenkönigreich',
    'map.markers.japaneseColonialRule.title':
      'Geschichte der Militärsiedlungen in Taiwan',
    'map.markers.japaneseColonialRule.desc':
      'Von den versprengten Truppen aus Myanmar bis zum Reich hinter Bambuszäunen: Wie eine Massenmigration von 120萬 Menschen den Begriff „Heimat“ neu definierte',
    'map.markers.februaryTwentyEightIncident.title':
      'Geschichte der Eisenbahn in Taiwan',
    'map.markers.februaryTwentyEightIncident.desc':
      'Von Liu Mingchuan unter der Qing-Dynastie über die Nord-Süd-Bahn unter japanischer Herrschaft bis zur Hochgeschwindigkeitsbahn: Wie die Eisenbahn Taiwans Stadtentwicklung und kulturelles Gedächtnis prägte',
    'map.markers.martialLawPeriod.title':
      'Übersiedlung der Nationalregierung nach Taiwan und Wiederaufbau nach dem Krieg',
    'map.markers.martialLawPeriod.desc':
      'Eine Untersuchung der historischen Hintergründe, des Ablaufs und der Folgen der Übersiedlung der Nationalregierung nach Taiwan im Jahr 1949 sowie des politischen, wirtschaftlichen und gesellschaftlichen Wiederaufbaus Taiwans nach dem Krieg',
    'map.markers.democratization.title': 'Zeit der japanischen Herrschaft',
    'map.markers.democratization.desc':
      'Von 1895-1945 herrschte Japan 50 Jahre lang über Taiwan, führte eine umfassende Modernisierung und institutionalisierte Verwaltung ein, betrieb zugleich jedoch Assimilationspolitik und prägte Taiwans gesellschaftliche Entwicklung tiefgreifend',
    'map.markers.taiwanIndependenceMovement.title': 'Zeit der Qing-Herrschaft',
    'map.markers.taiwanIndependenceMovement.desc':
      'Von 1683-1895 herrschte die Qing-Dynastie etwa 212 Jahre über Taiwan. Der Wandel von passiver Verwaltung zu aktivem Ausbau legte die Grundlagen der heutigen Verwaltungsgliederung Taiwans und der Han-chinesischen Gesellschaft',
    'map.markers.taiwanChinaRelations.title':
      'Zeit der niederländischen, spanischen und Zheng-Herrschaft',
    'map.markers.taiwanChinaRelations.desc':
      'Die erste systematische Kolonialherrschaft in Taiwans Geschichte, von der Errichtung Fort Zeelandias durch die Niederländer bis zur Erschließung Taiwans durch Koxinga, legte die Grundlagen für die Ansiedlung von Han-Chinesen und die politischen Institutionen',
    'map.markers.taiwanUsRelations.title': 'Convenience-Store-Kultur',
    'map.markers.taiwanUsRelations.desc':
      'Wie Taiwans Convenience Stores mit der weltweit höchsten Dichte vom Einzelhandel zum Betriebssystem für den Alltag eines ganzen Landes wurden',
    'map.markers.taiwanInternationalStatus.title': 'Taiwans Verkehrssystem',
    'map.markers.taiwanInternationalStatus.desc':
      'Die Hochgeschwindigkeitsbahn durchquert Taiwan von Nord nach Süd in 90 Minuten, Metrolinien durchziehen die Städte wie Blutbahnen und Motorroller schlängeln sich durch die Gassen',
    'map.markers.taiwanHistoricalFigures.title':
      'Taiwans Convenience-Store-Kultur',
    'map.markers.taiwanHistoricalFigures.desc':
      'Ein Convenience-Store-Königreich mit der weltweit höchsten Filialdichte: Die lokalen Innovationen von 7-11 und FamilyMart definieren den modernen Lebensstil neu',
    'map.markers.taiwanPoliticalFigures.title':
      'Taiwans Parks und alltägliche Freizeitkultur',
    'map.markers.taiwanPoliticalFigures.desc':
      'Vom morgendlichen Taijiquan bis zum abendlichen Spaziergang – eine kulturelle Betrachtung taiwanischer Parks als generationenübergreifende Begegnungsorte',
    'map.markers.kuomintangHistory.title': 'Taiwans Kaffeekultur',
    'map.markers.kuomintangHistory.desc':
      'Eine Inselkultur des Kaffees: weltweit unter den ersten drei bei der Dichte unabhängiger Cafés, von Bohnen aus Alishan bis zum Arbeiten im Café',
    'map.markers.democraticProgressivePartyHistory.title':
      'Die Insel, die Müllwagen hinterherläuft: Taiwans Weg von der Müllkrise zum Recyclingwunder',
    'map.markers.democraticProgressivePartyHistory.desc':
      'Ein Ort, der in den 1990er Jahren 400 fast volle Deponien hatte und von internationalen Medien als „Müllinsel“ bezeichnet wurde, ließ 2,300萬 Menschen täglich zu Beethovens Musik den Müllwagen hinterherlaufen – 30 Jahre später übertrifft seine Recyclingquote die der meisten europäischen Länder',
    'map.markers.taipeiHistory.title':
      'Geschichte der Metro in Taiwan: eine mit Blut und Geld geschriebene Evolution der Städte',
    'map.markers.taipeiHistory.desc':
      'Ein 209 Tonnen schwerer Stahlträger stürzte herab und forderte 4 Menschenleben, es wurden 16.4 億 Schadenersatz gezahlt, und das Kerngeschäft der Metro Taipei schreibt bis heute Verluste – der wahre Preis hinter Taiwans Metrosystemen',
    'map.markers.taiwanPrehistoricCulture.title':
      'Taiwans Bildungssystem: ein Inselexperiment von der Aufnahmeprüfungshölle zum Labyrinth der Vielfalt',
    'map.markers.taiwanPrehistoricCulture.desc':
      'Taiwan versuchte 30 Jahre lang, das System gemeinsamer Aufnahmeprüfungen abzuschaffen. Doch die jüngste fachspezifische Prüfung ließ die Anmeldungen bei Vorbereitungsschulen für Wiederholungsprüfungen um das Doppelte steigen. Wie führt eine Insel zwischen Bildungsdruck und Bildungsgerechtigkeit immer neue gesellschaftliche Experimente durch?',
    'map.markers.taiwanIndigenousHistory.title': 'Taiwans Motorrollerkultur',
    'map.markers.taiwanIndigenousHistory.desc':
      'Ein Inselreich mit einer der weltweit höchsten Motorrollerdichten und seine kulturelle Entwicklung vom Verkehrsmittel für den Arbeitsweg zur Lebensweise',
    'map.markers.taiwanMilitaryHistory.title':
      'Taiwans Arkadenkultur und Straßenbild',
    'map.markers.taiwanMilitaryHistory.desc':
      'Alltagskorridore als Schutz vor Wind und Regen: Taiwans Straßenerinnerungen, in denen sich Motorroller, Straßenstände und menschliche Wärme verweben',
    'map.markers.taiwanWomenHistory.title': 'Nachtleben und KTV-Kultur',
    'map.markers.taiwanWomenHistory.desc':
      'Von den Privaträumen der Cashbox-KTV-Kette bis zu nächtlichen Lokalen: das rund um die Uhr pulsierende Nachtleben der Insel',
    'map.markers.taiwanEducationHistory.title':
      'Religion und Volksglaube: Von der Bewältigung von Angst zum Glaubensimperium',
    'map.markers.taiwanEducationHistory.desc':
      'Taiwan hat die weltweit höchste Tempeldichte und zugleich die größte Religionsfreiheit – hinter diesem Widerspruch verbirgt sich die Überlebensweisheit militärischer Einwanderer des 17. Jahrhunderts',
    'map.markers.taiwanReligiousHistory.title': 'Thermalquellenkultur',
    'map.markers.taiwanReligiousHistory.desc':
      'Von der militärischen Genesung bis zu einer der drei bedeutendsten Schlammquellen der Welt: Wie Taiwan unerwartet zum Reich der Thermalquellen wurde',
    'map.markers.taiwanMediaHistory.title':
      'Musiktraditionen der indigenen Völker Taiwans',
    'map.markers.taiwanMediaHistory.desc':
      'Eine Entdeckungsreise durch die reiche Musikkultur der 16 indigenen Völker Taiwans – von alten Gesängen bis zu traditionellen Instrumenten und einem jahrtausendealten kulturellen Erbe',
    'map.markers.badmintonChampions.title':
      'Taiwans Musikinstrumentenindustrie: Von den Saxofonen aus Houli zur globalen Musikfabrik',
    'map.markers.badmintonChampions.desc':
      'Die Entwicklung der taiwanischen Musikinstrumentenindustrie: von der weltweiten Vormachtstellung der Saxofone aus Houli über das Königreich der Gitarren-Auftragsfertigung bis zur Präzisionskunst des Spieluhrenbaus – und Taiwans Weg vom Auftragsfertiger zur eigenen Marke',
    'map.markers.baseballCulture.title': 'Taiwans Campus-Folk-Bewegung',
    'map.markers.baseballCulture.desc':
      'Von „Singt eure eigenen Lieder“ bis zur Umgestaltung der gesamten chinesischsprachigen Musikwelt – die Kulturrevolution einer jungen Generation in den 1970er-Jahren',
    'map.markers.taiwanBasketball.title':
      'Die Entwicklung der unabhängigen Musikszene Taiwans',
    'map.markers.taiwanBasketball.desc':
      'Von Undergroundbands zur unabhängigen Musik: drei Jahrzehnte Entwicklung und kulturelle Bedeutung der nichtkommerziellen Musik Taiwans',
    'map.markers.marathonRunning.title':
      'Elektronische Musik und Partykultur in Taiwan: Vom Underground-Rave auf die internationale Bühne',
    'map.markers.marathonRunning.desc':
      'Von der Rave-Kultur der 1990er-Jahre bis zum Festival Road to Ultra: Wie Taiwans elektronische Musik aus dem Untergrund in den Mainstream gelangte und internationale DJs sowie unabhängige Elektrolabels hervorbrachte',
    'map.markers.taiwanEsports.title':
      'Taiwans Musikfestivalkultur: Vom Spring Scream zum landesweiten Träger der Jugendkultur',
    'map.markers.taiwanEsports.desc':
      'Die Entwicklung der taiwanischen Musikfestivals – vom Spring Scream über das Hohaiyan Rock Festival bis zum Megaport Festival – und wie sie zu Brutstätten unabhängiger Bands und zentralen Ausdrucksplattformen der Jugendkultur wurden',
    'map.markers.taiwanOlympics.title':
      'Taiwans zeitgenössische unabhängige Musikszene',
    'map.markers.taiwanOlympics.desc':
      'Von Underground-Auftritten zum Branchengefüge: Entwicklungslinien und kultureller Einfluss des modernen unabhängigen Musikökosystems Taiwans',
    'map.markers.taipeiCycle.title':
      'Ökologisches Wissen und Umweltschutz der indigenen Völker Taiwans',
    'map.markers.taipeiCycle.desc':
      'Das über Jahrtausende gesammelte traditionelle ökologische Wissen der indigenen Völker Taiwans sowie sein bedeutender Wert und seine praktische Anwendung im modernen Umweltschutz',
    'map.markers.taiwanBetelNutCulture.title':
      'Taiwans Berge und Bergsteigerkultur',
    'map.markers.taiwanBetelNutCulture.desc':
      '268 Dreitausender und die Kultur der „Hundert Gipfel“: die Entwicklung des Bergsports in Taiwan und die Herausforderungen des Gebirgsschutzes',
    'map.markers.taiwanElections.title': 'Taiwans Waldökosysteme',
    'map.markers.taiwanElections.desc':
      'Von der subtropischen Küste bis zum Nadelwald im Hochgebirge: Taiwans vielfältige Waldwelt über 3000 Höhenmeter',
    'map.markers.taiwanLgbtCulture.title':
      'Klimawandel und Netto-Null-Transformation in Taiwan',
    'map.markers.taiwanLgbtCulture.desc':
      'Taiwan steht vor den Folgen des Klimawandels: von immer häufigeren Extremwetterereignissen bis zur politischen Planung für das Ziel von Netto-Null-Emissionen bis 2050 – Chancen und Herausforderungen der Energiewende',
    'map.markers.taiwanMotorcycleCulture.title':
      'Taiwans Meeresschutz: Warum kann ein über 30 Jahre aufgebautes System eine Korallenbleiche nicht verhindern?',
    'map.markers.taiwanMotorcycleCulture.desc':
      '2020 erlebten Taiwans Gewässer die schwerste Korallenbleiche ihrer Geschichte. Von Xiaoliuqiu bis zum Dongsha-Atoll starben selbst Korallen in Schutzgebieten an der Hitze. Welche Probleme offenbart das?',
    'map.markers.taipeiMrt.title':
      'Bekämpfung der Meeresverschmutzung und Herausforderungen des Meeresschutzes in Taiwan',
    'map.markers.taipeiMrt.desc':
      'Angesichts von Meeresmüll, Überfischung und Klimawandel: die aktuelle Lage des Meeresschutzes in Taiwan, seine Herausforderungen und innovative Lösungsansätze',
    'map.markers.kaohsiungMrt.title': 'Taiwans Meeresökologie',
    'map.markers.kaohsiungMrt.desc':
      'Die durch Tabus des indigenen Volkes der Tao geschützten Gewässer bleichen heute unter Hitze und Unterwasserlärm aus: Wenn jahrtausendealtes ökologisches Wissen auf die moderne Meereskrise trifft',
    'map.markers.taichungMrt.title':
      'Taiwans Meeresökologie und Schutz der Korallenriffe',
    'map.markers.taichungMrt.desc':
      'Taiwan ist ringsum vom Meer umgeben und verfügt über eine reiche Meeresökologie: von der Krise der Korallenbleiche bis zum Schutz von Walen und Delfinen – Schutzwirkung und künftige Herausforderungen der Meeresnationalparks',
    'map.markers.taiwanTrainSystem.title':
      'Thermalquellen und Geothermie in Taiwan',
    'map.markers.taiwanTrainSystem.desc':
      'Vom gescheiterten Geothermiekraftwerk vor 30 Jahren bis zum weltweit einzigartigen Hokutolith: Wie eine Insel das Feuer unter der Erde in Heilwirkung und grünen Strom verwandelt',
    'map.markers.taiwanBusSystem.title': 'Schutz der Bengalkatze in Taiwan',
    'map.markers.taiwanBusSystem.desc':
      'Die Geisterkatze, von der in ganz Taiwan weniger als fünfhundert Exemplare verblieben sind – die letzte einheimische Katzenart am Rand des Verschwindens',
    'map.markers.taiwanInnovationEcosystem.title': 'Taiwans Schuppentiere',
    'map.markers.taiwanInnovationEcosystem.desc':
      'Das weltweit am häufigsten geschmuggelte Säugetier hat in Taiwan ein sicheres Zuhause gefunden',
    'map.markers.taiwanMedicalSystem.title':
      'Taiwans Hochgebirgsökosysteme und Eiszeitrelikte',
    'map.markers.taiwanMedicalSystem.desc':
      'Die einzigartigen Ökosysteme der taiwanischen Hochgebirge über 3000 Meter: von der Taiwanie und der Yushan-Alpenrose bis zur wertvollen Artenvielfalt eiszeitlicher Reliktarten',
    'map.markers.taiwanEducationSystem.title': 'Taiwanischer Schwarzbär',
    'map.markers.taiwanEducationSystem.desc':
      'Das weiße V auf seiner Brust ist sein Markenzeichen – Taiwans letzter Herrscher der Bergwälder und sein noch nicht gewonnener Kampf ums Überleben',
    'map.markers.taiwanMusicIndustry.title': 'Nationalparks',
    'map.markers.taiwanMusicIndustry.desc':
      '9 Nationalparks auf 36,197 Quadratkilometern: ein Naturschutzwunder mit der weltweit höchsten Dichte',
    'map.markers.mandarinPopMusic.title': 'Taiwans Nationalparks',
    'map.markers.mandarinPopMusic.desc':
      'Eine Entdeckungsreise durch die einzigartigen Ökosysteme und den Schutzwert der neun Nationalparks Taiwans – von subtropischen Küsten bis zur Schneegrenze im Hochgebirge',
    'map.markers.taiwaneseIndieMusic.title': 'Endemische Arten',
    'map.markers.taiwaneseIndieMusic.desc':
      'Taiwans reiche Vielfalt endemischer Arten verdeutlicht das evolutionäre Wunder der Inselbiogeografie und ihre Bedeutung für den Naturschutz',
    'map.markers.taiwanRapHipHop.title': 'Biologische Vielfalt',
    'map.markers.taiwanRapHipHop.desc':
      'Taiwan umfasst nur 0.025% der weltweiten Landfläche, beherbergt jedoch mehr als 5萬 Arten und liegt mit einer Waldbedeckung von 60.71% weltweit auf Rang 33',
    'map.markers.taiwanElectronicMusic.title': 'Wale und Delfine Taiwans',
    'map.markers.taiwanElectronicMusic.desc':
      'Lebensraum für ein Drittel aller Wal- und Delfinarten weltweit – vom einstigen Walfang zur heutigen Walbeobachtung: Wie wurde Taiwan zu einem Zentrum der Meeresökologieforschung?',
    'map.markers.taiwanTraditionalMusic.title': 'Mayday',
    'map.markers.taiwanTraditionalMusic.desc':
      'Von der Affiliated Senior High School of National Taiwan Normal University auf die Weltbühne: die ewigen Jugendlichen, die den Geist des chinesischsprachigen Rocks prägten',
    'map.markers.taiwanFilmIndustry.title': 'Wu Bai',
    'map.markers.taiwanFilmIndustry.desc':
      'Taiwans Nationalschatz des Rock und Inbegriff des einheimischen Rock – mit Werken wie „Norwegian Forest“ festigte er seinen Status als Rockikone',
    'map.markers.newTaiwanCinema.title': 'Wu Pao-chun',
    'map.markers.newTaiwanCinema.desc':
      'Gewinner der Brot-Weltmeisterschaft, der mit seinem Litschi-Rosen-Brot international für Aufsehen sorgte – vom ländlichen Pingtung zum Bäcker von Weltrang',
    'map.markers.taiwanDocumentary.title': 'Annette Lu',
    'map.markers.taiwanDocumentary.desc':
      'Von der wegen Aufruhrs Verurteilten zur Vizepräsidentin: das außergewöhnliche Leben der ersten Vizepräsidentin der chinesischsprachigen Welt',
    'map.markers.taiwanAnimationIndustry.title': 'Jimmy Liao',
    'map.markers.taiwanAnimationIndustry.desc':
      'Der poetische Illustrator, der mit Bilderbüchern die Welt erwärmt und Taiwans Bilderbücher auf die internationale Bühne gebracht hat',
    'map.markers.taiwanTelevisionIndustry.title': 'Tai Tzu-ying',
    'map.markers.taiwanTelevisionIndustry.desc':
      'Rekordhalterin mit 214 Wochen an der Spitze der Weltrangliste: vom Kaohsiunger Stadtteil Cianjhen zur olympischen Silbermedaille – Taiwans Badmintonkönigin',
    'map.markers.taiwanOttPlatforms.title': 'Li Ang',
    'map.markers.taiwanOttPlatforms.desc':
      'Autorin von „Die Gattin des Schlächters“ und „Der Irrgarten“, Pionierin der feministischen Literatur Taiwans',
    'map.markers.taiwanPodcastIndustry.title': 'Lee Chih-kai',
    'map.markers.taiwanPodcastIndustry.desc':
      'Vom Marktkind Kai aus „Jump! Boys“ zum olympischen Silbermedaillengewinner: das sechzehnjährige Turnerleben von Taiwans Pauschenpferdprinzen',
    'map.markers.taiwanPublishing.title': 'Lee Yuan-tseh',
    'map.markers.taiwanPublishing.desc':
      'Träger des Nobelpreises für Chemie 1986, erschloss mit der Molekularstrahltechnik ein neues Feld der chemischen Dynamik und war Taiwans erster naturwissenschaftlicher Nobelpreisträger',
    'map.markers.taiwanBookstoreCulture.title': 'Tu Tsung-ming',
    'map.markers.taiwanBookstoreCulture.desc':
      'Taiwans erster Doktor der Medizin und Vater der modernen Medizin Taiwans',
    'map.markers.taiwanComicMangaIndustry.title': 'Jeremy Lin',
    'map.markers.taiwanComicMangaIndustry.desc':
      'Vom Harvard-Spitzenstudenten zum NBA-Champion: der taiwanisch-amerikanische Basketballspieler, der weltweit die „Linsanity“ auslöste',
    'map.markers.taiwanGameIndustry.title': 'Lin Yi-chieh',
    'map.markers.taiwanGameIndustry.desc':
      'Vom schmächtigen Jungen, den das Leichtathletikteam ablehnte, zum Extremläufer, der mit der Durchquerung der Sahara zu Fuß Geschichte schrieb',
    'map.markers.nationalPalaceMuseum.title': 'Lin Yi-hsiung',
    'map.markers.nationalPalaceMuseum.desc':
      'Pionier der Demokratiebewegung, Opfer der Morde an der Familie Lin und führende Stimme der Bewegung gegen das vierte Kernkraftwerk',
    'map.markers.nationalParks.title': 'Edward Yang',
    'map.markers.nationalParks.desc':
      'Schlüsselfigur des Neuen Taiwanischen Films, bester Regisseur von Cannes und Poet der urbanen Entfremdung',
    'map.markers.taiwanGeography.title': 'Pai Hsien-yung',
    'map.markers.taiwanGeography.desc':
      'Autor von „Taipeh-Leute“, Meister der modernen Literatur und treibende Kraft hinter der Wiederbelebung der Kunqu-Oper',
    'map.markers.taiwanClimate.title': 'Crowd Lu',
    'map.markers.taiwanClimate.desc':
      'Taiwanischer Singer-Songwriter und Schauspieler, ausgezeichnet mit den drei Goldenen Preisen – Golden Melody, Golden Bell und Golden Horse – und bekannt für sein bodenständiges, nahbares Auftreten sowie seinen unverwechselbaren Gesangsstil',
    'map.markers.taiwanEcosystem.title': 'Chuang Chih-yuan',
    'map.markers.taiwanEcosystem.desc':
      'Vater des taiwanischen Tischtennis, Teilnehmer an vier Olympischen Spielen und einsamer Held, der auf sich allein gestellt unermüdlich trainierte',
    'map.markers.taiwanEndangeredSpecies.title': 'Tsai Ming-liang',
    'map.markers.taiwanEndangeredSpecies.desc':
      'Gewinner des Goldenen Löwen von Venedig, chinesischstämmiger Malaysier und Meister der Ästhetik des Slow Cinema',
    'map.markers.taiwanMarineEcology.title': 'Hsu Wen-lung',
    'map.markers.taiwanMarineEcology.desc':
      'Gründer der Chi-Mei-Gruppe, Unternehmer, Geiger und Kunstsammler in einer Person sowie Gründer des Chimei-Museums',
    'map.markers.taiwanBirdwatching.title': 'Fang-Yi Sheu',
    'map.markers.taiwanBirdwatching.desc':
      'Vom Mädchen aus Yilan zur Solistin der Martha Graham Dance Company und zurück nach Taiwan, wo sie die LAFA Dance Company gründete – mit ihrem Körper erzählt sie Taiwans kraftvollste Geschichten',
    'map.markers.taiwanHotSprings.title':
      'Lai Ching-te: vom Sohn einer Bergarbeiterfamilie zum Arzt für öffentliche Gesundheit im Präsidentenamt',
    'map.markers.taiwanHotSprings.desc':
      '16. Präsident Taiwans und erster Politiker in der Verfassungsgeschichte der Republik China, der als amtierender Vizepräsident für das Präsidentenamt kandidierte und gewählt wurde',
    'map.markers.taiwanIslands.title': 'Kuo Hsing-chun',
    'map.markers.taiwanIslands.desc':
      'Taiwans Gewichtheberkönigin, Goldmedaillengewinnerin der Olympischen Spiele 2021 in Tokio und Halterin aller drei olympischen Rekorde in der 59-Kilogramm-Klasse',
    'map.markers.taiwanMountains.title': 'Teng Yu-hsien',
    'map.markers.taiwanMountains.desc':
      'Vater des taiwanischen Liedguts und Schöpfer klassischer taiwanischer Lieder wie „Sehnsucht nach der Frühlingsbrise“, „Blume der Regennacht“ und „Trauer in der Mondnacht“',
    'map.markers.taiwanRivers.title': 'Chung Li-ho',
    'map.markers.taiwanRivers.desc':
      'Autor von „Der Mann aus der Heimat“, Vater der taiwanischen Literatur und literarischer Kämpfer, der trotz Armut und Krankheit unbeirrt weiterschrieb',
    'map.markers.taiwanCoastline.title': 'Chen Shu-chu',
    'map.markers.taiwanCoastline.desc':
      'Die schlichte Wohltätigkeit einer Gemüsehändlerin aus Taitung, die mit ihrem Leben zeigte, was wahrer Reichtum bedeutet',
    'map.markers.taiwanForests.title': 'Chen Shui-bian',
    'map.markers.taiwanForests.desc':
      '10. und 11. Präsident, zentrale Figur des ersten Regierungswechsels zwischen Parteien im Jahr 2000 und bedeutender Akteur der Demokratisierung Taiwans',
    'map.markers.taiwanNaturalDisasters.title': 'Ma Ying-jeou',
    'map.markers.taiwanNaturalDisasters.desc':
      '12. und 13. Präsident, Wegbereiter des Tauwetters in den Beziehungen zwischen Taiwan und China und Unterzeichner des ECFA',
    'map.markers.taiwanEarthquakes.title': 'Huang Chun-ming',
    'map.markers.taiwanEarthquakes.desc':
      'Autor von „Der große Sohn-Puppe“ und „Tage, an denen sie das Meer sah“, führender Vertreter der Heimatliteratur aus Yilan',
    'map.markers.taiwanTyphoons.title':
      'Huang Chen-nan: der Takenouchi Yutaka der Bibliophilenszene und eine lebendige Quelle der Kulturgeschichte Taiwans',
    'map.markers.taiwanTyphoons.desc':
      'Huang Chen-nan ist ein taiwanischer Kulturhistoriker, Büchersammler und Schriftsteller. Bekannt wurde er unter dem PTT-Nutzernamen Sizumaru; auf der Seite „Huoshui Lai Ceshufang“ vermittelt er Taiwans Geschichte und Kultur alter Bücher. Er schrieb unter anderem „Die pointenreichste Geschichte Taiwans“ und gilt als Takenouchi Yutaka der Bibliophilenszene. Er stammt aus einer literarisch geprägten Familie in Liujiao, Chiayi; Vater und Sohn sammeln arbeitsteilig im Norden und Süden historische Dokumente und machen die ernste Geschichte Taiwans unterhaltsam und zugänglich.',
    'map.markers.sunflowerMovement.title':
      'Zoos und die Ethik der Zurschaustellung von Tieren',
    'map.markers.sunflowerMovement.desc':
      'Vom Elefanten im Eisenkäfig bis zur Quallenwand im Xpark – Taiwan definiert die Beziehung zwischen Menschen und ausgestellten Tieren neu',
    'map.markers.taiwanSocialMovements.title':
      'Landgerechtigkeit und traditionelle Gebiete der indigenen Völker Taiwans',
    'map.markers.taiwanSocialMovements.desc':
      'Ein Überblick über den historischen Kontext der Landrechte indigener Völker Taiwans, die rechtliche Entwicklung, Kontroversen um die Ausweisung traditioneller Gebiete und die Ergebnisse der Kommission für Übergangsgerechtigkeit für indigene Völker',
    'map.markers.taiwanMarriageEquality.title':
      'Gleichgeschlechtliche Ehe und Geschlechtergleichstellung in Taiwan',
    'map.markers.taiwanMarriageEquality.desc':
      'Vom Gefängnisinsassen während des Kriegsrechts bis zum ersten Gesetz zur gleichgeschlechtlichen Ehe in Asien: Wie der 30-jährige Kampf eines Mannes die Definition der Liebe auf der Insel neu schrieb',
    'map.markers.taiwanEnvironmentalJustice.title':
      'Umweltgerechtigkeit und Konflikte um unerwünschte Anlagen in Taiwan',
    'map.markers.taiwanEnvironmentalJustice.desc':
      'Eine Untersuchung der ungleichen Verteilung von Umweltbelastungen in Taiwan – von Müllverbrennungsanlagen und Atommüll bis zur Petrochemie – sowie der daraus entstehenden Standortkonflikte, Umweltungleichheit und Fragen sozialer Gerechtigkeit',
    'map.markers.taiwanCommunityRiCulture.title':
      'Taiwans Gemeinwesen und Kultur der Stadt- und Ortsteile',
    'map.markers.taiwanCommunityRiCulture.desc':
      'Von demokratischer Praxis auf der untersten Ebene bis zu sozialer Innovation durch Gemeinwesenentwicklung',
    'map.markers.taiwanLongTermCare.title':
      'Entwicklung des Langzeitpflegesystems in Taiwan',
    'map.markers.taiwanLongTermCare.desc':
      'Eines der fortschrittlichsten Langzeitpflegesysteme der Welt – und zugleich eines der größten unsichtbaren Pflegenetzwerke',
    'map.markers.taiwanLaborMovement.title':
      'Umweltschutz und nachhaltige Entwicklung',
    'map.markers.taiwanLaborMovement.desc':
      'Von der Insel der Schornsteine zum klimaneutralen Taiwan: der 40-jährige Weg des Erwachens der Umweltbewegung',
    'map.markers.taiwanHousingIssues.title':
      'Sozialer Wohnungsbau und Wohngerechtigkeit',
    'map.markers.taiwanHousingIssues.desc':
      'Wie Taiwan durch sozialen Wohnungsbau Wohngerechtigkeit verwirklichen und allen Menschen ein sicheres Zuhause ermöglichen will',
    'map.markers.taiwanHealthcareSystem.title':
      'Entwicklung der Wissenschaftsparks',
    'map.markers.taiwanHealthcareSystem.desc':
      'Von Hsinchu bis Südtaiwan: die Entwicklung der taiwanischen Wissenschaftsparks und die besonderen Profile der drei großen Standorte',
    'map.markers.taiwanImmigration.title': 'Halbleiterindustrie',
    'map.markers.taiwanImmigration.desc':
      'Von Morris Changs historischem Wagnis bis zum 2-Nanometer-Zeitalter: Wie TSMC Taiwan zum Lebensnerv der globalen Technologiebranche machte',
    'map.markers.taiwanReligiousDiversity.title':
      'Taiwans Küstenformen und Meereslandschaften',
    'map.markers.taiwanReligiousDiversity.desc':
      'Der Hals des Königinnenkopfs von Yehliu wird jedes Jahr um 0.2 Zentimeter dünner und eines Tages abbrechen – genau darin liegen das Schicksal und die Schönheit der Küstenformen Taiwans',
    'map.markers.taiwanBuddhismTaoism.title':
      'Taiwanische Teekultur und Ästhetik des Alltags',
    'map.markers.taiwanBuddhismTaoism.desc':
      'Am Eröffnungsabend des Wistaria Tea House im Jahr 1981 trafen sich Oppositionelle und Intellektuelle zum Tee – der Ort war nicht nur ein Teehaus, sondern auch ein geheimer Stützpunkt der Oppositionsbewegung',
    'map.markers.taiwanFolkReligion.title':
      'Wahlen und Parteienpolitik in Taiwan',
    'map.markers.taiwanFolkReligion.desc':
      'Von den Kommunalabgeordneten im Jahr 1950 bis zum ersten Machtwechsel zwischen Parteien im Jahr 2000: Wie Taiwan mit Stimmzetteln das Wunder seines demokratischen Übergangs schrieb',
    'map.markers.taiwanChristianity.title':
      'Stadtentwicklung und Stadt-Land-Gefälle in Taiwan',
    'map.markers.taiwanChristianity.desc':
      'In 70 Jahren von einer Agrarinsel zu einer urbanisierten Insel: Licht und Schatten der Konzentration von 7 Zehnteln der Bevölkerung in den sechs regierungsunmittelbaren Städten – das prosperierende Taichung vs das schrumpfende Yunlin',
    'map.markers.taiwanIslamJudaism.title':
      'Städtische Besonderheiten und regionale Kulturen',
    'map.markers.taiwanIslamJudaism.desc':
      'Von 404 Zehntausend Einwohnern in Neu-Taipeh bis zu 185 Zehntausend in Tainan: Wie die sechs regierungsunmittelbaren Städte im industriellen Wandel ihren jeweils eigenen Charakter entwickelten',
    'map.markers.kaohsiungIncident.title': 'Demokratisierung',
    'map.markers.kaohsiungIncident.desc':
      'Die Zusammenstöße zwischen Polizei und Bevölkerung am 10. Dezember 1979 auf den Straßen Kaohsiungs gaben schließlich den Anstoß für Taiwans demokratischen Übergang – doch wie viele Menschen bezahlten dafür mit ihrer Jugend und Freiheit?',
    'map.markers.wangLeeOlympicGold.title':
      'Wang Chi-lin und Lee Yang („Lin-Yang-Duo“)',
    'map.markers.wangLeeOlympicGold.desc':
      'Von Mitschülern in der Mittelstufe zu Olympiasiegern: Das „Lin-Yang-Duo“ besiegte China in 34 Minuten ohne Satzverlust und gewann Taiwans erste olympische Goldmedaille im Badminton',
  },
  'zh-TW': {
    // Meta
    // 標題不用「台灣地圖」：這個詞讓給 /taiwan-shape/（地圖圖檔下載），本頁講它實際做的事（2026-11-04 evolve）
    'map.meta.title': '用地圖找文章：點縣市讀台灣各地的美食、歷史與自然',
    'map.meta.description':
      '在地圖上點一個縣市或地點，直接讀那裡的 Taiwan.md 文章。可以依北、中、南、東部與離島篩選區域，或依美食、歷史、自然、文化等分類找文章。',

    // Hero Section
    'map.hero.kicker': 'Map View',
    'map.hero.title': '台灣地圖',
    'map.hero.subtitle': '用地圖視角探索台灣的文化、美食、自然與歷史節點。',

    // Controls - Region Filter
    'map.controls.region.title': '區域篩選',
    'map.controls.region.all': '全部',
    'map.controls.region.north': '北部',
    'map.controls.region.central': '中部',
    'map.controls.region.south': '南部',
    'map.controls.region.east': '東部',
    'map.controls.region.islands': '離島',

    // Controls - Category Filter
    'map.controls.category.title': '分類篩選',
    'map.controls.category.all': '全部',
    'map.controls.category.food': '🍜 美食',
    'map.controls.category.history': '📜 歷史',
    'map.controls.category.nature': '🌿 自然',
    'map.controls.category.culture': '🎭 文化',
    'map.controls.category.technology': '💻 科技',
    'map.controls.category.economy': '📈 經濟',
    'map.controls.category.lifestyle': '🏮 生活',
    'map.controls.category.art': '🎨 藝術',
    'map.controls.category.geography': '🗺️ 地理',

    // Route Section
    'map.route.title': '🗺️ 策展路線',
    'map.route.normal-mode': '一般模式',

    // Sidebar - Default
    'map.sidebar.default.title': '📍 探索台灣文章',
    'map.sidebar.default.hint': '點擊地圖上的縣市或標記來探索文章',

    // Sidebar - County
    'map.sidebar.county.clear': '✕ 清除選擇',
    'map.sidebar.county.articles-count': '篇文章',
    'map.sidebar.county.no-articles': '此區域尚無文章',

    // Sidebar - Article
    'map.sidebar.article.back': '← 返回',
    'map.sidebar.article.read-more': '閱讀全文 →',

    // Zoom Controls
    'map.zoom.in': '＋',
    'map.zoom.out': '－',
    'map.zoom.reset': '⌂',

    // Tooltips
    'map.tooltip.county.articles': '篇相關文章',
    'map.tooltip.county.click': '點擊篩選此區域',
    'map.tooltip.marker.reading-time': '分鐘閱讀',

    // Panel (for compatibility)
    'map.panel.title': '台灣知識地圖',
    'map.panel.stat.points': '知識點',
    'map.panel.stat.categories': '分類',
    'map.panel.category-distribution': '分類分布',
    'map.panel.link.graph': '🕸️ 知識圖譜',
    'map.panel.link.home': '🏠 分類總覽',

    // Category Names (for JS usage)
    'map.category.history': '📜 歷史',
    'map.category.geography': '🗺️ 地理',
    'map.category.culture': '🎭 文化',
    'map.category.food': '🍜 美食',
    'map.category.art': '🎨 藝術',
    'map.category.music': '🎵 音樂',
    'map.category.technology': '💻 科技',
    'map.category.nature': '🌿 自然',
    'map.category.people': '👥 人物',
    'map.category.society': '⚖️ 社會',
    'map.category.economy': '📈 經濟',
    'map.category.lifestyle': '🏮 生活',

    // Additional UI text
    'map.sidebar.more-articles': '⋯及其他',
    'map.sidebar.more-articles-suffix': '篇',

    // Routes
    'map.routes.nightMarkets.name': '🍜 夜市巡禮',
    'map.routes.nightMarkets.description': '從北到南，台灣最具代表性的夜市文化',
    'map.routes.nationalParks.name': '🏔️ 國家公園巡禮',
    'map.routes.nationalParks.description':
      '從 3,952 公尺高山到熱帶珊瑚礁，台灣的自然奇蹟',
    'map.routes.historyTrail.name': '📜 歷史足跡',
    'map.routes.historyTrail.description': '從荷蘭殖民到民主化，走過台灣四百年',
    'map.routes.oldStreets.name': '🏮 老街漫遊',
    'map.routes.oldStreets.description': '百年街道裡的台灣記憶，建築即歷史',

    'map.routes.counties22.name': '📍 22 縣市深度文章',
    'map.routes.counties22.description':
      '走訪 Taiwan.md 22 篇縣市深度文章，從基隆 pilot 到新北 finale — 每個縣市一條核心矛盾。',
    'map.counties22.panel.title': '📍 22 縣市深度文章',
    'map.counties22.panel.hint': '點縣市卡開啟，或從地圖點縣市',
    'map.counties22.tooltip.openDeep': '點擊開啟深度文章',
    'map.counties22.deepCard.badge': '📖 22 縣市系列 · 深度文章',
    'map.counties22.deepCard.cta': '閱讀全文 →',

    // Night Markets Stops
    'map.stops.shilinNightMarket.name': '士林夜市',
    'map.stops.shilinNightMarket.note': '全台最大觀光夜市，大餅包小餅的發源地',
    'map.stops.raoheNightMarket.name': '饒河夜市',
    'map.stops.raoheNightMarket.note': '胡椒餅排隊聖地，台北人的在地最愛',
    'map.stops.ningxiaNightMarket.name': '寧夏夜市',
    'map.stops.ningxiaNightMarket.note': '美食密度最高，米其林推薦的庶民美食街',
    'map.stops.fengjiaNightMarket.name': '逢甲夜市',
    'map.stops.fengjiaNightMarket.note': '創意小吃實驗室，台灣夜市創新的前線',
    'map.stops.huayuanNightMarket.name': '花園夜市',
    'map.stops.huayuanNightMarket.note': '台南最大夜市，每週只開三天的限定狂歡',
    'map.stops.liuheNightMarket.name': '六合夜市',
    'map.stops.liuheNightMarket.note': '高雄地標夜市，海鮮是這裡的主角',

    // National Parks Stops
    'map.stops.yangmingshanNationalPark.name': '陽明山國家公園',
    'map.stops.yangmingshanNationalPark.note': '台北後花園，火山地形與溫泉秘境',
    'map.stops.tarokoNationalPark.name': '太魯閣國家公園',
    'map.stops.tarokoNationalPark.note': '大理石峽谷，世界級的地質奇觀',
    'map.stops.yushanNationalPark.name': '玉山國家公園',
    'map.stops.yushanNationalPark.note': '東北亞最高峰（3,952m），台灣的屋脊',
    'map.stops.alishanScenicArea.name': '阿里山國家風景區',
    'map.stops.alishanScenicArea.note': '日出雲海、神木群與森林鐵路',
    'map.stops.sunMoonLakeScenicArea.name': '日月潭國家風景區',
    'map.stops.sunMoonLakeScenicArea.note': '台灣最大天然湖泊，邵族聖湖',
    'map.stops.kentingNationalPark.name': '墾丁國家公園',
    'map.stops.kentingNationalPark.note': '台灣最南端，熱帶珊瑚礁與恆春半島',

    // History Trail Stops
    'map.stops.anpingFort.name': '安平古堡',
    'map.stops.anpingFort.note': '1624 年荷蘭人建造，台灣最早的城堡',
    'map.stops.chikanTower.name': '赤崁樓',
    'map.stops.chikanTower.note': '從荷蘭普羅民遮城到鄭成功的統治象徵',
    'map.stops.lukang.name': '鹿港',
    'map.stops.lukang.note': '清代台灣第二大城，「一府二鹿三艋舺」',
    'map.stops.presidentialOffice.name': '總統府（原台灣總督府）',
    'map.stops.presidentialOffice.note': '1919 年建成，日治時期最高權力中心',
    'map.stops.chiangKaiShekMemorialHall.name': '中正紀念堂',
    'map.stops.chiangKaiShekMemorialHall.note': '威權象徵與轉型正義辯論的焦點',
    'map.stops.legislativeYuan.name': '立法院（太陽花運動）',
    'map.stops.legislativeYuan.note': '2014 年太陽花學運現場，台灣民主的里程碑',

    // Old Streets Stops
    'map.stops.dihuaStreet.name': '迪化街',
    'map.stops.dihuaStreet.note': '大稻埕的心臟，南北貨與年貨大街',
    'map.stops.jiufenOldStreet.name': '九份老街',
    'map.stops.jiufenOldStreet.note': '礦業黃金歲月與神隱少女的靈感來源',
    'map.stops.lukangOldStreet.name': '鹿港老街',
    'map.stops.lukangOldStreet.note': '紅磚古厝與傳統工藝的活博物館',
    'map.stops.anpingOldStreet.name': '安平老街',
    'map.stops.anpingOldStreet.note': '台灣第一街，四百年的歷史堆疊',
    'map.stops.qishanOldStreet.name': '旗山老街',
    'map.stops.qishanOldStreet.note': '香蕉王國的巴洛克建築群',
    'map.stops.tamsuiOldStreet.name': '淡水老街',
    'map.stops.tamsuiOldStreet.note': '夕陽、阿給與淡水河口的歷史風情',

    // Cities
    'map.city.taipei': '台北',
    'map.city.newTaipei': '新北',
    'map.city.keelung': '基隆',
    'map.city.taoyuan': '桃園',
    'map.city.hsinchu': '新竹',
    'map.city.miaoli': '苗栗',
    'map.city.taichung': '台中',
    'map.city.changhua': '彰化',
    'map.city.nantou': '南投',
    'map.city.chiayi': '嘉義',
    'map.city.tainan': '台南',
    'map.city.kaohsiung': '高雄',
    'map.city.pingtung': '屏東',
    'map.city.yilan': '宜蘭',
    'map.city.hualien': '花蓮',
    'map.city.taitung': '台東',
    'map.city.penghu': '澎湖',
    'map.city.kinmen': '金門',

    // Markers
    'map.markers.founderCheYuWu.title': '創辦人 — 吳哲宇 Che-Yu Wu',
    'map.markers.founderCheYuWu.desc':
      '從程式碼到詩意：一位台灣藝術家的國際突破之路',
    'map.markers.taiwanIndigenousContemporaryArt.title': '台灣原住民當代藝術',
    'map.markers.taiwanIndigenousContemporaryArt.desc':
      '從傳統工藝到當代創作，探索台灣原住民藝術家如何在全球藝術舞台上發聲，重新定義原住民身份與當代藝術的對話',
    'map.markers.taiwanExperimentalNewMediaArt.title': '台灣實驗與新媒體藝術',
    'map.markers.taiwanExperimentalNewMediaArt.desc':
      '從錄像藝術到VR互動，探索台灣新媒體藝術的創新發展與科技藝術生態',
    'map.markers.taiwanArchitecture.title': '台灣建築',
    'map.markers.taiwanArchitecture.desc':
      '從石板屋到摩天樓：一座島嶼的建築時光之旅',
    'map.markers.taiwanNewMediaArt.title': '台灣新媒體藝術',
    'map.markers.taiwanNewMediaArt.desc': '探索台灣的文化與故事',
    'map.markers.taiwanWatercolorCenturyEvolution.title':
      '台灣水彩畫的百年流變',
    'map.markers.taiwanWatercolorCenturyEvolution.desc':
      '從日治時期石川欽一郎的啟蒙，到當代簡忠威揚名國際，台灣水彩畫走過百年歷程，成為亞洲最活躍的水彩創作重鎮。',
    'map.markers.taiwanModernPoetry.title': '台灣現代詩',
    'map.markers.taiwanModernPoetry.desc':
      '從三個書房走出的現代主義實驗，如何意外催生最鄉土的詩歌革命',
    'map.markers.taiwanContemporarySculpture.title': '台灣當代雕塑發展',
    'map.markers.taiwanContemporarySculpture.desc':
      '從楊英風、朱銘到新世代，探索台灣雕塑藝術的演變軌跡與創作精神',
    'map.markers.taiwanCuratorsArtCulture.title': '台灣策展人與藝術文化建構',
    'map.markers.taiwanCuratorsArtCulture.desc':
      '從獨立策展到美術館體系，台灣策展人如何建構當代藝術的文化論述與國際對話',
    'map.markers.newMediaArt.title': '新媒體藝術',
    'map.markers.newMediaArt.desc':
      '台灣數位藝術的先鋒探索，從實驗室到國際舞台的科技與人文融合',
    'map.markers.contemporaryTaiwanLiterature.title': '當代台灣文學',
    'map.markers.contemporaryTaiwanLiterature.desc': '探索台灣的文化與故事',
    'map.markers.taiwanContemporaryArt.title': '台灣當代藝術',
    'map.markers.taiwanContemporaryArt.desc':
      '從北美館到威尼斯雙年展台灣館，台灣當代藝術在全球舞台的獨特位置',
    'map.markers.kinmenGuesthouseMuseum.title': '金馬賓館當代美術館',
    'map.markers.kinmenGuesthouseMuseum.desc':
      '一座見證離別與重逢的冷戰軍事驛站，沉睡二十年後被一對父女喚醒，成為《孤獨星球》推薦的高雄首選美術館。',
    'map.markers.renjianMagazine.title': '人間雜誌',
    'map.markers.renjianMagazine.desc':
      '47 期，四年，一場用攝影和文字發動的安靜革命——台灣報導文學的起點',
    'map.markers.taiwanIndigenousCulture.title': '台灣原住民文化',
    'map.markers.taiwanIndigenousCulture.desc':
      '從十六族的多元傳統到當代藝術復振，探索台灣原住民文化的深厚底蘊與現代轉化',
    'map.markers.taiwan16IndigenousTribes.title': '台灣原住民族16族文化地圖',
    'map.markers.taiwan16IndigenousTribes.desc':
      '探索台灣16個原住民族的分布區域、語言系統、重要祭典與當代創作發展，了解台灣原住民族的多元文化面貌',
    'map.markers.taiwanNightMarketCulture.title': '台灣夜市文化與小吃風情',
    'map.markers.taiwanNightMarketCulture.desc':
      '深度探索台灣夜市文化的形成背景、獨特魅力，以及代表性小吃的歷史故事與文化意義',
    'map.markers.taiwanSensibilityKoreanPerspective.title':
      '台灣感性：韓國人眼中的台式美學',
    'map.markers.taiwanSensibilityKoreanPerspective.desc':
      '從 K-pop MV 到首爾書展，「대만감성」如何讓台灣的日常街景成為亞洲最迷人的美學符號',
    'map.markers.taiwanCulturalCreativeParks.title': '台灣文化創意園區發展',
    'map.markers.taiwanCulturalCreativeParks.desc':
      '從舊建築活化到創意聚落，台灣文化創意園區的發展歷程與創新模式',
    'map.markers.taiwanOldStreetCulture.title': '台灣老街文化與商業街區',
    'map.markers.taiwanOldStreetCulture.desc':
      '從清代港口繁華到日治巴洛克洋樓，台灣老街是一部用磚瓦寫成的庶民史',
    'map.markers.taiwanTeaCeremonyLifeAesthetics.title': '台灣茶道與生活美學',
    'map.markers.taiwanTeaCeremonyLifeAesthetics.desc':
      '從功夫茶到茶席美學，探索台灣如何將東方茶文化與在地生活美學融合創新',
    'map.markers.taiwanStreetArtGraffiti.title': '台灣街頭藝術與塗鴉文化',
    'map.markers.taiwanStreetArtGraffiti.desc':
      '從地下塗鴉到合法彩繪，城市牆面如何成為台灣藝術家的創作舞台',
    'map.markers.taiwanIncenseMakingCulture.title': '台灣製香文化與香腳原鄉',
    'map.markers.taiwanIncenseMakingCulture.desc':
      '從嘉義雲霄社區的百年香腳技藝，到台灣遍布全島的製香產業——一門關於虔誠、手藝與堅持的古老行業',
    'map.markers.taiwanHomophoneTaboos.title':
      '台灣諧音禁忌文化：為什麼「四」讓整個社會跳過樓層？',
    'map.markers.taiwanHomophoneTaboos.desc':
      '從醫院沒有四樓到車牌8888天價標售，台灣人對諧音的敏感程度堪稱世界之最',
    'map.markers.hakkaCultureLanguage.title': '客家文化與語言',
    'map.markers.hakkaCultureLanguage.desc':
      '硬頸精神與天穿日：台灣客家人的文化傳承與現代復振',
    'map.markers.ethnicGroupsTaiwan.title': '族群（閩南客家原住民外省新住民）',
    'map.markers.ethnicGroupsTaiwan.desc':
      '台灣的族群多元性不僅是歷史發展的結果，更是理解當代台灣社會的關鍵。這種多元共存的社會結構，既是台灣文化創意的源泉，也是民主政治發展的重要基礎。如何在尊重各族群文化特色的同時，建構共同的台灣認同，是台灣社會持續面對的重要課題。',
    'map.markers.chinaSteel.title': '中鋼：鐵頭部長與十大建設的鋼鐵傳奇',
    'map.markers.chinaSteel.desc':
      '從趙耀東歐美談判智取技術，到高雄小港升起的第一縷白煙，中鋼用50年打造台灣重工業脊樑，是十大建設最成功的明珠',
    'map.markers.taiwanCement.title': '台泥：台灣第一上市公司的綠色轉型傳奇',
    'map.markers.taiwanCement.desc':
      '1962年台灣證交所為它而生，股票代號1101象徵台股起源。從辜家三代經營76年，台泥用一座座水泥窯見證台灣建設奇蹟，如今轉型綠色企業迎戰碳中和時代',
    'map.markers.tsmc.title': '台灣企業：台積電',
    'map.markers.tsmc.desc': '全球晶片代工龍頭，掌握人類數位文明的關鍵命脈',
    'map.markers.chimeiCorporation.title':
      '奇美實業：許文龍的壓克力王國與博物館夢想',
    'map.markers.chimeiCorporation.desc':
      '從1960年台南仁德小工廠起步，許文龍用一生打造亞洲最大ABS材料王國，更創建奇美博物館回饋社會。證明台灣企業可以兼顧商業成功與人文關懷',
    'map.markers.acer.title': '宏碁集團 (Acer) - PC 產業的變革先驅',
    'map.markers.acer.desc':
      '從台灣桃園起家的個人電腦先驅，創造「多品牌、多通路」商業模式，成為全球 PC 產業的變革引擎',
    'map.markers.giantBicycles.title': '台灣企業：巨大機械',
    'map.markers.giantBicycles.desc':
      '從被美國大廠拋棄的代工奴隸，到制定全球自行車技術標準的隱形帝國',
    'map.markers.quantaComputer.title': '台灣企業：廣達電腦',
    'map.markers.quantaComputer.desc':
      '從工廠火災到全球筆電王，林百里如何建造AI時代的新帝國？',
    'map.markers.aseGroup.title': '台灣企業：日月光半導體',
    'map.markers.aseGroup.desc':
      '全球第一大封測廠，建設公司老闆為何轉戰半導體？',
    'map.markers.esunFinancialHolding.title': '台灣企業：玉山金控',
    'map.markers.esunFinancialHolding.desc':
      '從信用卡專業銀行到數位金融先鋒，43歲最年輕金控總經理的突破故事',
    'map.markers.changChunPetrochemical.title': '台灣企業：長春石化',
    'map.markers.changChunPetrochemical.desc':
      '1949年台南小工廠到全球化工巨頭，「不上市不借錢」的隱形冠軍故事',
    'map.markers.formosaPlasticsGroup.title': '台灣企業：長榮海運',
    'map.markers.formosaPlasticsGroup.desc':
      '從一艘二手船到全球海運帝國，張榮發的藍海傳奇',
    'map.markers.taipeiFubon.title': '夜市經濟學：一場沒有品牌的商業奇蹟',
    'map.markers.taipeiFubon.desc':
      '探索台灣夜市如何在沒有品牌、裝潢和固定地點的情況下，創造年產值近4000億的經濟奇蹟',
    'map.markers.taiwan7Eleven.title': '台灣咖啡產業',
    'map.markers.taiwan7Eleven.desc':
      '從日治時期的種植起源到Simple Kaffa世界冠軍，台灣咖啡的百年進化史',
    'map.markers.taiwanHighSpeedRail.title': '台灣地方小吃地圖',
    'map.markers.taiwanHighSpeedRail.desc':
      '從基隆廟口的鼎邊糊到屏東萬巒的豬腳，從新竹的貢丸到台東的釋迦，每個城市都有專屬的味覺DNA。跟著在地人的腳步，探索台灣22個縣市最具代表性的地方小吃，品味島嶼上最真實的庶民文化。',
    'map.markers.taiwanSemiconductorIndustry.title':
      '台灣手路菜：正在消失的味覺記憶',
    'map.markers.taiwanSemiconductorIndustry.desc':
      '從嘉義薄荷雞到菜尾湯，阿嬤的拿手好菜承載著家族記憶，卻正在時代變遷中慢慢失傳',
    'map.markers.taiwanBankingSystem.title': '台灣新住民美食融合',
    'map.markers.taiwanBankingSystem.desc':
      '當泰式酸辣遇上台灣甜鹹、當越南河粉邂逅台式滷味、當印尼香料擁抱本土食材，一場跨越國界的味覺革命正在台灣悄然發生。新住民帶來的不只是故鄉的料理，更是豐富台灣美食文化的全新可能。',
    'map.markers.taiwanSmes.title': '台灣水果王國',
    'map.markers.taiwanSmes.desc':
      '從芒果荔枝到釋迦蓮霧，熱帶水果多樣性與農業技術突破的甜美傳奇',
    'map.markers.youbikePublicBikeSystem.title': '台灣海鮮文化',
    'map.markers.youbikePublicBikeSystem.desc':
      '漁港新鮮直送、海鮮餐廳文化、蚵仔煎等海味料理，展現台灣四面環海的島嶼特色與豐富的海鮮飲食傳統',
    'map.markers.taiwanFoodBeverageIndustry.title': '台灣米其林與精緻餐飲',
    'map.markers.taiwanFoodBeverageIndustry.desc':
      '2018年，米其林指南的紅色封面首次印上「TAIPEI」字樣，標誌著台灣餐飲業正式進入國際評價體系。從街邊小攤到星級餐廳，從庶民美食到精緻料理，台灣餐飲文化在國際舞台上展現出既傳統又創新的迷人風貌。',
    'map.markers.taiwanAgriculturalReform.title': '夜市文化',
    'map.markers.taiwanAgriculturalReform.desc':
      '164個列管夜市、台南平均3.8萬人擁有一個夜市，從廟埕到國際觀光景點',
    'map.markers.taiwanTeaIndustry.title': '客家飲食文化',
    'map.markers.taiwanTeaIndustry.desc':
      '客家人豐富多元的飲食文化，從擂茶的醇厚香味到野薑花粽的山林風情，展現客家族群勤儉持家與就地取材的生活智慧',
    'map.markers.taiwanFishingIndustry.title': '牛肉麵',
    'map.markers.taiwanFishingIndustry.desc':
      '從外省移民鄉愁到台灣國民美食，牛肉麵的文化融合與全球飄香',
    'map.markers.taiwanFruitIndustry.title': '茶文化',
    'map.markers.taiwanFruitIndustry.desc':
      '台灣從傳統茶藝到現代手搖飲的茶文化演進，展現島嶼獨特的茶葉品種與飲茶文化',
    'map.markers.taiwanRiceVarieties.title':
      '在搖晃的島嶼上，他們蓋了一座能飛的塔',
    'map.markers.taiwanRiceVarieties.desc':
      '距離活動斷層僅 200 公尺，台灣人偏要在最不穩定的土地上建出世界最高樓——然後有個瘋子花 91 分鐘徒手爬了上去。',
    'map.markers.nightMarketCulture.title':
      '台灣五大地形與地理結構：從山脈到平原的島嶼風貌',
    'map.markers.nightMarketCulture.desc':
      '探索台灣獨特的地理結構，從中央山脈到西部平原，認識這座島嶼的地形多樣性',
    'map.markers.bubbleTeaGlobalPhenomenon.title': '台灣交通運輸網絡',
    'map.markers.bubbleTeaGlobalPhenomenon.desc':
      '高鐵、捷運、公路、航空，編織移動台灣的立體交通網絡',
    'map.markers.taiwanBeefNoodle.title': '台灣國家風景區系統',
    'map.markers.taiwanBeefNoodle.desc':
      '從東北角到墾丁，台灣13處國家風景區展現豐富的自然與人文景觀',
    'map.markers.taiwanHotPotCulture.title': '台灣島嶼地理特色與形成',
    'map.markers.taiwanHotPotCulture.desc':
      '探索台灣獨特的島嶼地理特色，從板塊運動到地形結構，了解福爾摩沙島的自然奧秘',
    'map.markers.taiwanFineDining.title': '台灣板塊運動與地震活動',
    'map.markers.taiwanFineDining.desc':
      '探討台灣位於歐亞板塊與菲律賓海板塊交界的地質特性，以及造成頻繁地震活動的原因',
    'map.markers.taiwanStreetFood.title': '台灣水庫與水資源管理',
    'map.markers.taiwanStreetFood.desc':
      '從缺水危機到水庫淤積，台灣水資源的挑戰與南北分配不均的困境',
    'map.markers.taiwanVegetarianCulture.title':
      '台灣河川系統與水文特色：短急流與季節變遷的水文地理',
    'map.markers.taiwanVegetarianCulture.desc':
      '探索台灣獨特的河川系統，從濁水溪到高屏溪，了解島嶼地形如何塑造台灣的水文特色',
    'map.markers.taiwanCoffeeCulture.title': '台灣海岸地形與海洋地景',
    'map.markers.taiwanCoffeeCulture.desc':
      '從北部岬灣海岸到東部斷層海岸，台灣豐富多變的海岸地形展現板塊運動的鬼斧神工',
    'map.markers.taiwanSnackCulture.title': '台灣溫泉地景',
    'map.markers.taiwanSnackCulture.desc':
      '北投、知本、礁溪，溫泉文化與地質科學的美麗交會',
    'map.markers.taiwanSeafoodCulture.title': '台灣生態多樣性熱點',
    'map.markers.taiwanSeafoodCulture.desc':
      '3.6 萬平方公里島嶼擠下 5.9 萬種生物，密度是全球平均值的 100 倍',
    'map.markers.taiwanPineappleCake.title': '台灣農業地景與產業分布',
    'map.markers.taiwanPineappleCake.desc':
      '從北到南的農業地景變化，彰顯台灣從「台灣穀倉」到「精緻農業」的轉型之路',
    'map.markers.taiwanPorkRibSoup.title': '台灣都市發展與城鄉差距',
    'map.markers.taiwanPorkRibSoup.desc':
      '六都格局下的台灣城鄉發展不均，從農業台灣到都市台灣的空間轉型',
    'map.markers.taiwanOysterOmelette.title': '地形與地質',
    'map.markers.taiwanOysterOmelette.desc':
      '600萬年的島嶼，藏著2億年的古老記憶 — 全球最年輕造山帶與最劇烈板塊碰撞的奇蹟',
    'map.markers.taiwanBreakfastCulture.title': '城市特色與區域文化',
    'map.markers.taiwanBreakfastCulture.desc':
      '從台北的國際都會到台南的古都風情，台灣各城市如何形塑獨特的地方認同',
    'map.markers.taiwanConvenienceStoreFood.title':
      '離島與海洋文化：從石滬密度世界第一到飛魚季生態法律',
    'map.markers.taiwanConvenienceStoreFood.desc':
      '全世界石滬不到600座，澎湖就有574座。一個專門抓飛魚的島嶼民族，把禁忌變成了最精密的海洋資源管理系統',
    'map.markers.dutchSpanishColonialPeriod.title':
      '二二八事件與白色恐怖：台灣威權統治下的創傷與記憶',
    'map.markers.dutchSpanishColonialPeriod.desc':
      '從1947年二二八事件到長達38年的戒嚴體制，台灣經歷了威權統治下的國家暴力，直到解嚴後才開始面對歷史創傷，推動轉型正義。',
    'map.markers.zhengDynastyPeriod.title': '台海危機與兩岸關係發展',
    'map.markers.zhengDynastyPeriod.desc':
      '回顧台海三次重大危機及兩岸關係七十餘年發展歷程，理解台海局勢的歷史脈絡與當代挑戰',
    'map.markers.qingDynastyTaiwanHistory.title': '台灣海洋貿易史',
    'map.markers.qingDynastyTaiwanHistory.desc':
      '大航海時代的台灣，從國際貿易中心到海盜王國的興衰傳奇',
    'map.markers.japaneseColonialRule.title': '台灣眷村歷史',
    'map.markers.japaneseColonialRule.desc':
      '從緬甸孤軍到竹籬笆王國，120萬大遷徙如何重新定義「家」',
    'map.markers.februaryTwentyEightIncident.title': '台灣鐵道史',
    'map.markers.februaryTwentyEightIncident.desc':
      '從清朝劉銘傳到日治縱貫線到高鐵，鐵道如何塑造台灣的城市發展與文化記憶',
    'map.markers.martialLawPeriod.title': '國民政府遷台與戰後重建',
    'map.markers.martialLawPeriod.desc':
      '探討1949年國民政府遷台的歷史背景、過程與影響，以及戰後台灣的政治、經濟與社會重建',
    'map.markers.democratization.title': '日治時期',
    'map.markers.democratization.desc':
      '1895-1945年日本統治台灣50年，帶來全面現代化建設與制度化管理，同時實施同化政策，深刻影響台灣社會發展',
    'map.markers.taiwanIndependenceMovement.title': '清治時期',
    'map.markers.taiwanIndependenceMovement.desc':
      '1683-1895年清朝統治台灣約212年，從消極治理到積極建設，奠定現代台灣行政區劃與漢人社會基礎',
    'map.markers.taiwanChinaRelations.title': '荷西明鄭時期',
    'map.markers.taiwanChinaRelations.desc':
      '台灣歷史上首次有系統性的殖民統治，從荷蘭人建立熱蘭遮城到鄭成功開台，奠定漢人移居與政治制度基礎',
    'map.markers.taiwanUsRelations.title': '便利商店文化',
    'map.markers.taiwanUsRelations.desc':
      '密度世界第一的台灣超商，如何從零售店變成一整個國家的生活作業系統',
    'map.markers.taiwanInternationalStatus.title': '台灣交通系統',
    'map.markers.taiwanInternationalStatus.desc':
      '高鐵 90 分鐘縱貫南北，捷運密織都市血脈，機車穿梭巷弄間',
    'map.markers.taiwanHistoricalFigures.title': '台灣便利商店文化',
    'map.markers.taiwanHistoricalFigures.desc':
      '密度世界第一的便利商店王國，7-11與全家的在地化創新，重新定義現代生活方式',
    'map.markers.taiwanPoliticalFigures.title': '台灣公園與日常休閒',
    'map.markers.taiwanPoliticalFigures.desc':
      '從清晨太極到夜間散步——台灣公園作為跨世代社交場域的文化觀察',
    'map.markers.kuomintangHistory.title': '台灣咖啡文化',
    'map.markers.kuomintangHistory.desc':
      '獨立咖啡廳密度世界前三，從阿里山豆到咖啡廳辦公的島嶼咖啡學',
    'map.markers.democraticProgressivePartyHistory.title':
      '追垃圾車的島：台灣從垃圾危機到回收奇蹟',
    'map.markers.democraticProgressivePartyHistory.desc':
      '一個1990年代有400座快滿的掩埋場、被國際媒體稱為「垃圾島」的地方，用貝多芬的音樂讓2,300萬人每天追垃圾車，30年後資源回收率超越多數歐洲國家',
    'map.markers.taipeiHistory.title':
      '台灣捷運發展史：一部用血與錢寫成的城市進化論',
    'map.markers.taipeiHistory.desc':
      '209 噸鋼梁從天而降奪走 4 條人命，16.4 億賠款，台北捷運本業至今仍在虧錢——全台捷運背後的真實代價',
    'map.markers.taiwanPrehistoricCulture.title':
      '台灣教育制度：從聯考地獄到多元迷宮的島嶼實驗',
    'map.markers.taiwanPrehistoricCulture.desc':
      '台灣花30年想破除聯考制度，結果最新的分科測驗讓重考班招生暴增一倍。一個島嶼如何在升學壓力與教育公平之間，反覆進行社會實驗？',
    'map.markers.taiwanIndigenousHistory.title': '台灣機車文化',
    'map.markers.taiwanIndigenousHistory.desc':
      '摩托車密度全球前列的島嶼王國，從通勤工具到生活方式的文化演進',
    'map.markers.taiwanMilitaryHistory.title': '台灣騎樓文化與街景',
    'map.markers.taiwanMilitaryHistory.desc':
      '遮風避雨的生活廊道，機車、攤販與人情味交織的台灣街頭記憶',
    'map.markers.taiwanWomenHistory.title': '夜生活與KTV文化',
    'map.markers.taiwanWomenHistory.desc':
      '從錢櫃包廂到深夜食堂，24 小時不打烊的島嶼夜生活',
    'map.markers.taiwanEducationHistory.title':
      '宗教與民間信仰：從恐懼管理到信仰帝國',
    'map.markers.taiwanEducationHistory.desc':
      '台灣有全球最高廟宇密度，卻也是宗教自由世界第一——這套矛盾背後隱藏17世紀軍事移民的生存智慧',
    'map.markers.taiwanReligiousHistory.title': '溫泉文化',
    'map.markers.taiwanReligiousHistory.desc':
      '從軍事療養到世界三大泥泉：台灣意外成為溫泉王國的故事',
    'map.markers.taiwanMediaHistory.title': '台灣原住民音樂傳統',
    'map.markers.taiwanMediaHistory.desc':
      '探索台灣 16 族原住民豐富的音樂文化，從古調吟唱到傳統樂器，見證數千年文化傳承',
    'map.markers.badmintonChampions.title':
      '台灣樂器製造業：從后里薩克斯風到全球音樂工廠',
    'map.markers.badmintonChampions.desc':
      '探索台灣樂器製造業的發展歷程，從后里薩克斯風的全球霸主地位到吉他代工王國，再到音樂盒製造的精密工藝，台灣如何從代工走向自有品牌',
    'map.markers.baseballCulture.title': '台灣民歌運動',
    'map.markers.baseballCulture.desc':
      '從「唱自己的歌」到改變整個華語音樂圈——1970年代那場屬於年輕人的文化革命',
    'map.markers.taiwanBasketball.title': '台灣獨立音樂場景演變',
    'map.markers.taiwanBasketball.desc':
      '從地下樂團到獨立音樂，探索台灣非主流音樂三十年發展軌跡與文化意義',
    'map.markers.marathonRunning.title':
      '台灣電子音樂與派對文化：從地下 Rave 到國際舞台',
    'map.markers.marathonRunning.desc':
      '從1990年代 Rave 派對文化到 Road to Ultra 電音節，台灣電子音樂如何從地下走向主流，孕育出國際級 DJ 與獨立電子廠牌',
    'map.markers.taiwanEsports.title':
      '台灣音樂祭文化：從春天吶喊到遍地開花的青年文化載體',
    'map.markers.taiwanEsports.desc':
      '探索台灣音樂祭從春吶、海洋音樂祭到大港開唱的發展歷程，如何成為獨立樂團孵化器與青年文化的核心表達平台',
    'map.markers.taiwanOlympics.title': '當代台灣獨立音樂場景',
    'map.markers.taiwanOlympics.desc':
      '從地下展演到產業矩陣，解析現代台灣獨立音樂生態圈的發展脈絡與文化影響力',
    'map.markers.taipeiCycle.title': '台灣原住民生態智慧與環境保育',
    'map.markers.taipeiCycle.desc':
      '探討台灣原住民族數千年來累積的傳統生態知識，以及在現代環境保育中的重要價值與實踐方式',
    'map.markers.taiwanBetelNutCulture.title': '台灣山岳與登山文化',
    'map.markers.taiwanBetelNutCulture.desc':
      '268座三千公尺高山與百岳文化：台灣登山運動的發展與山岳保育挑戰',
    'map.markers.taiwanElections.title': '台灣森林生態系',
    'map.markers.taiwanElections.desc':
      '從亞熱帶海岸到高山針葉林，台灣3000公尺垂直落差中的豐富森林世界',
    'map.markers.taiwanLgbtCulture.title': '台灣氣候變遷與淨零轉型',
    'map.markers.taiwanLgbtCulture.desc':
      '台灣面臨氣候變遷衝擊，從極端氣候頻繁發生到2050淨零碳排目標的政策規劃，探討能源轉型過程中的機會與挑戰',
    'map.markers.taiwanMotorcycleCulture.title':
      '台灣海洋保育：為什麼花30年建成的體系，救不了一場珊瑚白化？',
    'map.markers.taiwanMotorcycleCulture.desc':
      '2020年，台灣海域經歷史上最大規模珊瑚白化。從小琉球到東沙環礁，連保護區內的珊瑚都在高溫中死去。這暴露了什麼問題？',
    'map.markers.taipeiMrt.title': '台灣海洋污染治理與保育挑戰',
    'map.markers.taipeiMrt.desc':
      '面對海洋廢棄物、過度捕撈與氣候變遷，探討台灣海洋保育的現況、挑戰與創新解決方案',
    'map.markers.kaohsiungMrt.title': '台灣海洋生態',
    'map.markers.kaohsiungMrt.desc':
      '達悟族用禁忌守護的海域，如今在高溫與水下噪音中白化：當數千年生態智慧遇上現代海洋危機',
    'map.markers.taichungMrt.title': '台灣海洋生態與珊瑚礁保育',
    'map.markers.taichungMrt.desc':
      '台灣四面環海擁有豐富海洋生態，從珊瑚礁白化危機到鯨豚保育，探討海洋國家公園的保護成效與未來挑戰',
    'map.markers.taiwanTrainSystem.title': '台灣溫泉與地熱',
    'map.markers.taiwanTrainSystem.desc':
      '從 30 年前失敗的地熱電廠到世界唯一北投石：一座島嶼如何把地底之火變成療癒與綠電',
    'map.markers.taiwanBusSystem.title': '台灣石虎保育',
    'map.markers.taiwanBusSystem.desc':
      '全台剩不到五百隻的幽靈貓——當最後的原生貓科走上消失的邊緣',
    'map.markers.taiwanInnovationEcosystem.title': '台灣穿山甲',
    'map.markers.taiwanInnovationEcosystem.desc':
      '全世界被走私最多的哺乳動物，在台灣找到了一個安全的家',
    'map.markers.taiwanMedicalSystem.title': '台灣高山生態系與冰河孑遺',
    'map.markers.taiwanMedicalSystem.desc':
      '探討台灣3000公尺以上高山環境的獨特生態系統，從台灣杉、玉山杜鵑到冰河時期孑遺物種的珍貴生物多樣性',
    'map.markers.taiwanEducationSystem.title': '台灣黑熊',
    'map.markers.taiwanEducationSystem.desc':
      '胸前的白色 V 字是牠的簽名——台灣山林最後的王者，與牠未完的保育戰',
    'map.markers.taiwanMusicIndustry.title': '國家公園',
    'map.markers.taiwanMusicIndustry.desc':
      '36,197 平方公里塞進 9 座國家公園，密度世界第一的保育奇蹟',
    'map.markers.mandarinPopMusic.title': '台灣國家公園',
    'map.markers.mandarinPopMusic.desc':
      '探索台灣九座國家公園的獨特生態系統與保育價值，從亞熱帶海岸到高山雪線的完整地景',
    'map.markers.taiwaneseIndieMusic.title': '特有種',
    'map.markers.taiwaneseIndieMusic.desc':
      '台灣豐富的特有種生物，展現島嶼生物地理學的演化奇蹟與保育重要性',
    'map.markers.taiwanRapHipHop.title': '生態多樣性',
    'map.markers.taiwanRapHipHop.desc':
      '台灣面積僅佔全球0.025%，卻擁有超過5萬種生物，森林覆蓋率60.71%排名全球第33位',
    'map.markers.taiwanElectronicMusic.title': '臺灣的鯨豚',
    'map.markers.taiwanElectronicMusic.desc':
      '全球三分之一鯨豚物種的棲息地——從昔日捕鯨到今日賞鯨，臺灣如何轉身成為海洋生態研究重鎮？',
    'map.markers.taiwanTraditionalMusic.title': '五月天',
    'map.markers.taiwanTraditionalMusic.desc':
      '從師大附中走向世界舞台，定義華語搖滾精神的永遠少年',
    'map.markers.taiwanFilmIndustry.title': '伍佰',
    'map.markers.taiwanFilmIndustry.desc':
      '台灣搖滾國寶，本土搖滾樂的代名詞，以《挪威的森林》等作品奠定搖滾地位',
    'map.markers.newTaiwanCinema.title': '吳寶春',
    'map.markers.newTaiwanCinema.desc':
      '世界麵包大賽冠軍，以荔枝玫瑰麵包驚艷國際，從屏東鄉下到世界頂尖烘焙職人',
    'map.markers.taiwanDocumentary.title': '呂秀蓮',
    'map.markers.taiwanDocumentary.desc':
      '從叛亂犯到副總統：華人世界第一位女性副總統的傳奇人生',
    'map.markers.taiwanAnimationIndustry.title': '幾米',
    'map.markers.taiwanAnimationIndustry.desc':
      '用繪本溫暖世界的插畫詩人，讓台灣繪本走上國際舞台',
    'map.markers.taiwanTelevisionIndustry.title': '戴資穎',
    'map.markers.taiwanTelevisionIndustry.desc':
      '214週世界球后紀錄保持者，從高雄前鎮到奧運銀牌的台灣羽球女王',
    'map.markers.taiwanOttPlatforms.title': '李昂',
    'map.markers.taiwanOttPlatforms.desc':
      '《殺夫》《迷園》作者，台灣女性主義文學先鋒',
    'map.markers.taiwanPodcastIndustry.title': '李智凱',
    'map.markers.taiwanPodcastIndustry.desc':
      '從《翻滾吧！男孩》的菜市場凱到奧運銀牌，台灣鞍馬王子十六年的翻滾人生',
    'map.markers.taiwanPublishing.title': '李遠哲',
    'map.markers.taiwanPublishing.desc':
      '1986 年諾貝爾化學獎得主，以交叉分子束技術開創化學動力學新領域，台灣首位諾貝爾科學獎得主',
    'map.markers.taiwanBookstoreCulture.title': '杜聰明',
    'map.markers.taiwanBookstoreCulture.desc':
      '台灣第一位醫學博士，台灣現代醫學之父',
    'map.markers.taiwanComicMangaIndustry.title': '林書豪',
    'map.markers.taiwanComicMangaIndustry.desc':
      '從哈佛學霸到NBA總冠軍，引爆全球林來瘋的台裔美國球員',
    'map.markers.taiwanGameIndustry.title': '林義傑',
    'map.markers.taiwanGameIndustry.desc':
      '從被田徑隊拒絕的瘦小孩，到徒步橫越撒哈拉沙漠創造歷史的極地跑者',
    'map.markers.nationalPalaceMuseum.title': '林義雄',
    'map.markers.nationalPalaceMuseum.desc':
      '民主運動先驅，林宅血案受害者，反核四運動領袖',
    'map.markers.nationalParks.title': '楊德昌',
    'map.markers.nationalParks.desc':
      '台灣新電影運動核心人物，坎城最佳導演，都市疏離的詩人',
    'map.markers.taiwanGeography.title': '白先勇',
    'map.markers.taiwanGeography.desc':
      '《台北人》作者，現代文學大師與崑曲復興推手',
    'map.markers.taiwanClimate.title': '盧廣仲',
    'map.markers.taiwanClimate.desc':
      '台灣創作歌手、演員，三金得主（金曲、金鐘、金馬），以草根親切形象與獨特唱腔聞名',
    'map.markers.taiwanEcosystem.title': '莊智淵',
    'map.markers.taiwanEcosystem.desc':
      '桌球教父，四屆奧運代表，獨自苦練的孤獨英雄',
    'map.markers.taiwanEndangeredSpecies.title': '蔡明亮',
    'map.markers.taiwanEndangeredSpecies.desc':
      '威尼斯金獅獎得主，馬來西亞華人，慢電影美學大師',
    'map.markers.taiwanMarineEcology.title': '許文龍',
    'map.markers.taiwanMarineEcology.desc':
      '奇美集團創辦人，企業家、小提琴家、藝術收藏家的三重身份，奇美博物館創建者',
    'map.markers.taiwanBirdwatching.title': '許芳宜',
    'map.markers.taiwanBirdwatching.desc':
      '從宜蘭女孩到瑪乘舞團首席，再回台灣創立拉芳舞團——她用身體說出台灣最有力量的故事',
    'map.markers.taiwanHotSprings.title':
      '賴清德：從礦工家庭到總統府的公共衛生醫師',
    'map.markers.taiwanHotSprings.desc':
      '台灣第16任總統，中華民國憲政史上首位以副總統身分參選並成功當選的政治人物',
    'map.markers.taiwanIslands.title': '郭婞淳',
    'map.markers.taiwanIslands.desc':
      '台灣舉重女神，2021 東京奧運金牌得主，59 公斤級三項奧運紀錄保持人',
    'map.markers.taiwanMountains.title': '鄧雨賢',
    'map.markers.taiwanMountains.desc':
      '台灣歌謠之父，創作《望春風》《雨夜花》《月夜愁》等經典台語歌謠',
    'map.markers.taiwanRivers.title': '鍾理和',
    'map.markers.taiwanRivers.desc':
      '《原鄉人》作者，台灣文學之父，貧病交加仍堅持創作的文學鬥士',
    'map.markers.taiwanCoastline.title': '陳樹菊',
    'map.markers.taiwanCoastline.desc':
      '台東菜販的平凡善舉，用一生詮釋什麼是真正的富有',
    'map.markers.taiwanForests.title': '陳水扁',
    'map.markers.taiwanForests.desc':
      '第十、十一任總統，2000年首次政黨輪替主角，台灣民主化重要人物',
    'map.markers.taiwanNaturalDisasters.title': '馬英九',
    'map.markers.taiwanNaturalDisasters.desc':
      '第十二、十三任總統，兩岸關係破冰推手，ECFA簽署者',
    'map.markers.taiwanEarthquakes.title': '黃春明',
    'map.markers.taiwanEarthquakes.desc':
      '《兒子的大玩偶》《看海的日子》作者，宜蘭鄉土文學代表作家',
    'map.markers.taiwanTyphoons.title':
      '黃震南：藏書界竹野內豐與台灣文史的活水源頭',
    'map.markers.taiwanTyphoons.desc':
      '黃震南是台灣文史工作者、藏書家與作家，以PTT暱稱Sizumaru起家，經營「活水來冊房」專頁分享台灣歷史與舊書文化。著有《台灣史上最有梗的台灣史》等書，被譽為藏書界的竹野內豐。他從嘉義六腳書香家庭出發，父子南北分工蒐集文獻，致力讓嚴肅台灣史變得有趣親民。',
    'map.markers.sunflowerMovement.title': '動物園與展演動物倫理',
    'map.markers.sunflowerMovement.desc':
      '從鐵籠裡的大象到 Xpark 的水母牆——台灣正在重新定義人與被展示動物的關係',
    'map.markers.taiwanSocialMovements.title': '台灣原住民族土地正義與傳統領域',
    'map.markers.taiwanSocialMovements.desc':
      '探討台灣原住民族土地權利的歷史脈絡、法律發展、傳統領域劃設爭議與原住民族轉型正義委員會的工作成果',
    'map.markers.taiwanMarriageEquality.title': '台灣同婚與性別平權',
    'map.markers.taiwanMarriageEquality.desc':
      '從戒嚴期的監獄囚犯到亞洲第一部同婚法，一個男人的30年奮鬥如何改寫島嶼的愛情定義',
    'map.markers.taiwanEnvironmentalJustice.title': '台灣環境正義與鄰避爭議',
    'map.markers.taiwanEnvironmentalJustice.desc':
      '探討台灣環境負擔分配不均現象，從焚化爐、核廢料到石化業的鄰避衝突，分析環境不平等問題與社會公義議題',
    'map.markers.taiwanCommunityRiCulture.title': '台灣社區與里文化',
    'map.markers.taiwanCommunityRiCulture.desc':
      '從最基層的民主實踐到社區營造的社會創新',
    'map.markers.taiwanLongTermCare.title': '台灣長期照顧制度發展',
    'map.markers.taiwanLongTermCare.desc':
      '全世界最先進的長照制度，卻同時存在著最大的隱形照顧體系',
    'map.markers.taiwanLaborMovement.title': '環保與永續發展',
    'map.markers.taiwanLaborMovement.desc':
      '從煙囪之島到淨零台灣：40年環保運動的覺醒之路',
    'map.markers.taiwanHousingIssues.title': '社會住宅與居住正義',
    'map.markers.taiwanHousingIssues.desc':
      '台灣如何透過社會住宅政策實現居住正義，讓每個人都有安身立命的地方',
    'map.markers.taiwanHealthcareSystem.title': '科技園區發展',
    'map.markers.taiwanHealthcareSystem.desc':
      '從竹科到南科，探討台灣科學園區的發展歷程與三大園區的獨特定位',
    'map.markers.taiwanImmigration.title': '半導體產業',
    'map.markers.taiwanImmigration.desc':
      '從張忠謀的歷史賭注到2奈米時代：台積電如何讓台灣成為全球科技命脈',
    'map.markers.taiwanReligiousDiversity.title': '台灣海岸地形與海洋地景',
    'map.markers.taiwanReligiousDiversity.desc':
      '野柳女王頭的脖子正以每年0.2公分的速度變細，總有一天會斷裂——這正是台灣海岸地形的宿命與美麗',
    'map.markers.taiwanBuddhismTaoism.title': '台灣茶道與生活美學',
    'map.markers.taiwanBuddhismTaoism.desc':
      '1981年紫藤廬開幕那晚，黨外人士與文人雅集品茗，這裡不只是茶館，更是反對運動的秘密基地',
    'map.markers.taiwanFolkReligion.title': '台灣選舉與政黨政治',
    'map.markers.taiwanFolkReligion.desc':
      '從1950年地方議員到2000年政黨輪替，看台灣如何用選票寫下民主轉型的奇蹟',
    'map.markers.taiwanChristianity.title': '台灣都市發展與城鄉差距',
    'map.markers.taiwanChristianity.desc':
      '70年從農業島變都市島，六都集中7成人口的光與影：繁榮台中vs凋零雲林的殘酷對比',
    'map.markers.taiwanIslamJudaism.title': '城市特色與區域文化',
    'map.markers.taiwanIslamJudaism.desc':
      '從新北404萬人到台南185萬人，看六都如何在產業轉型中塑造各自的城市性格',
    'map.markers.kaohsiungIncident.title': '民主化',
    'map.markers.kaohsiungIncident.desc':
      '1979年12月10日高雄街頭的警民衝突，最終催生了台灣的民主轉型——但代價是多少人的青春與自由？',
    'map.markers.wangLeeOlympicGold.title': '王齊麟與李洋（麟洋配）',
    'map.markers.wangLeeOlympicGold.desc':
      '從國中同學到奧運金牌：「麟洋配」34分鐘內直落二擊敗中國，寫下台灣羽球史上第一面奧運金牌',
  },
  fr: {
    'map.meta.title': 'Carte de Taïwan',
    'map.meta.description':
      'Explorez Taiwan.md à travers une approche cartographique',
    'map.hero.kicker': 'Vue Carte',
    'map.hero.title': 'Carte de Taïwan',
    'map.hero.subtitle':
      "Explorez la culture, la gastronomie, la nature et l'histoire de Taïwan grâce à une carte interactive.",
    'map.controls.region.title': 'Filtre par Région',
    'map.controls.region.all': 'Toutes',
    'map.controls.region.north': 'Nord',
    'map.controls.region.central': 'Centre',
    'map.controls.region.south': 'Sud',
    'map.controls.region.east': 'Est',
    'map.controls.region.islands': 'Îles',
    'map.controls.category.title': 'Filtre par Catégorie',
    'map.controls.category.all': 'Toutes',
    'map.controls.category.food': '🍜 Gastronomie',
    'map.controls.category.history': '📜 Histoire',
    'map.controls.category.nature': '🌿 Nature',
    'map.controls.category.culture': '🎭 Culture',
    'map.controls.category.technology': '💻 Technologie',
    'map.controls.category.economy': '📈 Économie',
    'map.controls.category.lifestyle': '🏮 Art de vivre',
    'map.controls.category.art': '🎨 Art',
    'map.controls.category.geography': '🗺️ Géographie',
    'map.route.title': '🗺️ Parcours Sélectionnés',
    'map.route.normal-mode': 'Mode Normal',
    'map.sidebar.default.title': '📍 Explorer les Articles sur Taïwan',
    'map.sidebar.default.hint':
      'Cliquez sur les comtés ou les marqueurs de la carte pour explorer les articles',
    'map.sidebar.county.clear': '✕ Effacer la Sélection',
    'map.sidebar.county.articles-count': 'articles',
    'map.sidebar.county.no-articles': "Pas encore d'articles dans cette région",
    'map.sidebar.article.back': '← Retour',
    'map.sidebar.article.read-more': 'En Savoir Plus →',
    'map.zoom.in': '＋',
    'map.zoom.out': '－',
    'map.zoom.reset': '⌂',
    'map.tooltip.county.articles': 'articles associés',
    'map.tooltip.county.click': 'Cliquez pour filtrer cette région',
    'map.tooltip.marker.reading-time': 'min de lecture',
    'map.panel.title': 'Carte du Savoir de Taïwan',
    'map.panel.stat.points': 'Points de Connaissance',
    'map.panel.stat.categories': 'Catégories',
    'map.panel.category-distribution': 'Répartition des Catégories',
    'map.panel.link.graph': '🕸️ Graphe de Connaissances',
    'map.panel.link.home': '🏠 Hubs par Catégorie',
    'map.category.history': '📜 Histoire',
    'map.category.geography': '🗺️ Géographie',
    'map.category.culture': '🎭 Culture',
    'map.category.food': '🍜 Gastronomie',
    'map.category.art': '🎨 Art',
    'map.category.music': '🎵 Musique',
    'map.category.technology': '💻 Technologie',
    'map.category.nature': '🌿 Nature',
    'map.category.people': '👥 Personnalités',
    'map.category.society': '⚖️ Société',
    'map.category.economy': '📈 Économie',
    'map.category.lifestyle': '🏮 Art de vivre',
    'map.sidebar.more-articles': '⋯et',
    'map.sidebar.more-articles-suffix': 'autres',
    'map.routes.nightMarkets.name': '🍜 Tournée des Marchés Nocturnes',
    'map.routes.nightMarkets.description':
      'Du nord au sud, la culture des marchés nocturnes les plus emblématiques de Taïwan',
    'map.routes.nationalParks.name': '🏔️ Parcs Nationaux',
    'map.routes.nationalParks.description':
      'Des sommets à 3 952 m aux récifs coralliens tropicaux, les merveilles naturelles de Taïwan',
    'map.routes.historyTrail.name': '📜 Sentier Historique',
    'map.routes.historyTrail.description':
      "De la colonisation hollandaise à la démocratisation, 400 ans d'histoire de Taïwan",
    'map.routes.oldStreets.name': '🏮 Promenade des Vieilles Rues',
    'map.routes.oldStreets.description':
      "Les souvenirs taïwanais dans des rues centenaires, l'architecture comme histoire",
    'map.routes.counties22.name': '📍 22 comtés et villes en profondeur',
    'map.routes.counties22.description':
      'Parcourez les 22 articles de fond de Taiwan.md — une contradiction centrale par lieu, du pilote de Keelung au finale de Nouveau Taipei.',
    'map.counties22.panel.title': '📍 22 comtés et villes en profondeur',
    'map.counties22.panel.hint':
      'Ouvrez une carte de comté ici, ou cliquez sur un comté sur la carte',
    'map.counties22.tooltip.openDeep': "Cliquez pour ouvrir l'article de fond",
    'map.counties22.deepCard.badge': '📖 Série 22 comtés · Article de fond',
    'map.counties22.deepCard.cta': "Lire l'article complet →",
    'map.stops.shilinNightMarket.name': 'Marché Nocturne de Shilin',
    'map.stops.shilinNightMarket.note':
      'Le plus grand marché nocturne touristique de Taïwan, berceau de la galette enveloppée dans une galette',
    'map.stops.raoheNightMarket.name': 'Marché Nocturne de Raohe',
    'map.stops.raoheNightMarket.note':
      'Destination incontournable pour les brioches au poivre, favori des habitants de Taipei',
    'map.stops.ningxiaNightMarket.name': 'Marché Nocturne de Ningxia',
    'map.stops.ningxiaNightMarket.note':
      'La plus forte densité culinaire, street food recommandée par le Michelin',
    'map.stops.fengjiaNightMarket.name': 'Marché Nocturne de Fengjia',
    'map.stops.fengjiaNightMarket.note':
      "Laboratoire de snacks créatifs, avant-garde de l'innovation des marchés nocturnes taïwanais",
    'map.stops.huayuanNightMarket.name': 'Marché Nocturne du Jardin',
    'map.stops.huayuanNightMarket.note':
      'Le plus grand marché nocturne de Tainan, carnaval éphémère ouvert seulement trois jours par semaine',
    'map.stops.liuheNightMarket.name': 'Marché nocturne de Liuhe',
    'map.stops.liuheNightMarket.note':
      "Marché nocturne emblématique de Kaohsiung, les fruits de mer y sont à l'honneur",
    'map.stops.yangmingshanNationalPark.name': 'Parc national de Yangmingshan',
    'map.stops.yangmingshanNationalPark.note':
      'Le jardin de Taipei, terrain volcanique et paradis des sources chaudes',
    'map.stops.tarokoNationalPark.name': 'Parc national de Taroko',
    'map.stops.tarokoNationalPark.note':
      'Gorge de merveille géologique de classe mondiale',
    'map.stops.yushanNationalPark.name': 'Parc national de Yushan',
    'map.stops.yushanNationalPark.note':
      "Le plus haut sommet du nord-est de l'Asie (3 952 m), le toit de Taiwan",
    'map.stops.alishanScenicArea.name': "Zone panoramique d'Alishan",
    'map.stops.alishanScenicArea.note':
      'Lever de soleil sur une mer de nuages, arbres sacrés et chemin de fer forestier',
    'map.stops.sunMoonLakeScenicArea.name': 'Zone panoramique du lac Sun Moon',
    'map.stops.sunMoonLakeScenicArea.note':
      'Le plus grand lac naturel de Taiwan, lac sacré du peuple Thao',
    'map.stops.kentingNationalPark.name': 'Parc national de Kenting',
    'map.stops.kentingNationalPark.note':
      'Le point le plus au sud de Taiwan, récifs coralliens tropicaux et péninsule de Hengchun',
    'map.stops.anpingFort.name': "Fort d'Anping",
    'map.stops.anpingFort.note':
      'Construit par les Néerlandais en 1624, la plus ancienne forteresse de Taiwan',
    'map.stops.chikanTower.name': 'Tour de Chikan',
    'map.stops.chikanTower.note':
      'De la Provintia néerlandaise au symbole du règne de Koxinga',
    'map.stops.lukang.name': 'Lukang',
    'map.stops.lukang.note':
      'Deuxième plus grande ville de Taiwan sous la dynastie Qing, « Un Fu, Deux Lu, Trois Mengka »',
    'map.stops.presidentialOffice.name':
      'Bureau présidentiel (ancien Bureau du gouverneur général de Taiwan)',
    'map.stops.presidentialOffice.note':
      'Achevé en 1919, centre du pouvoir suprême durant la période coloniale japonaise',
    'map.stops.chiangKaiShekMemorialHall.name': 'Mémorial de Chiang Kai-shek',
    'map.stops.chiangKaiShekMemorialHall.note':
      "Symbole de l'autoritarisme et enjeu du débat sur la justice transitionnelle",
    'map.stops.legislativeYuan.name':
      'Yuan législatif (Mouvement du Tournesol)',
    'map.stops.legislativeYuan.note':
      'Site du Mouvement du Tournesol de 2014, jalon de la démocratie taïwanaise',
    'map.stops.dihuaStreet.name': 'Rue Dihua',
    'map.stops.dihuaStreet.note':
      'Cœur de Dadaocheng, rue des produits secs et des fêtes du Nouvel An',
    'map.stops.jiufenOldStreet.name': 'Vieille rue de Jiufen',
    'map.stops.jiufenOldStreet.note':
      "L'âge d'or minier et l'inspiration du Voyage de Chihiro",
    'map.stops.lukangOldStreet.name': 'Vieille rue de Lukang',
    'map.stops.lukangOldStreet.note':
      "Maisons traditionnelles en briques rouges et musée vivant de l'artisanat traditionnel",
    'map.stops.anpingOldStreet.name': "Vieille rue d'Anping",
    'map.stops.anpingOldStreet.note':
      'La première rue de Taiwan, quatre siècles de strates historiques',
    'map.stops.qishanOldStreet.name': 'Vieille rue de Qishan',
    'map.stops.qishanOldStreet.note':
      "Ensemble d'architecture baroque du Royaume de la banane",
    'map.stops.tamsuiOldStreet.name': 'Vieille rue de Tamsui',
    'map.stops.tamsuiOldStreet.note':
      "Coucher de soleil, A-gei et charme historique de l'estuaire de la rivière Tamsui",
    'map.city.taipei': 'Taipei',
    'map.city.newTaipei': 'Nouveau Taipei',
    'map.city.keelung': 'Keelung',
    'map.city.taoyuan': 'Taoyuan',
    'map.city.hsinchu': 'Hsinchu',
    'map.city.miaoli': 'Miaoli',
    'map.city.taichung': 'Taichung',
    'map.city.changhua': 'Changhua',
    'map.city.nantou': 'Nantou',
    'map.city.chiayi': 'Chiayi',
    'map.city.tainan': 'Tainan',
    'map.city.kaohsiung': 'Kaohsiung',
    'map.city.pingtung': 'Pingtung',
    'map.city.yilan': 'Yilan',
    'map.city.hualien': 'Hualien',
    'map.city.taitung': 'Taitung',
    'map.city.penghu': 'Penghu',
    'map.city.kinmen': 'Kinmen',
    'map.markers.founderCheYuWu.title': 'Fondateur — Che-Yu Wu',
    'map.markers.founderCheYuWu.desc':
      "Du code à la poésie : le parcours d'un artiste taïwanais vers la reconnaissance internationale",
    'map.markers.taiwanIndigenousContemporaryArt.title':
      'Art contemporain autochtone de Taiwan',
    'map.markers.taiwanIndigenousContemporaryArt.desc':
      "De l'artisanat traditionnel à la création contemporaine, explorez comment les artistes autochtones de Taiwan font entendre leur présence sur la scène artistique mondiale, redéfinissant le dialogue entre identité autochtone et art contemporain",
    'map.markers.taiwanExperimentalNewMediaArt.title':
      'Art expérimental et nouveaux médias de Taiwan',
    'map.markers.taiwanExperimentalNewMediaArt.desc':
      "De l'art vidéo aux interactions VR, explorez le développement innovant de l'art des nouveaux médias à Taiwan et son écosystème d'art technologique",
    'map.markers.taiwanArchitecture.title': 'Architecture de Taiwan',
    'map.markers.taiwanArchitecture.desc':
      "Des maisons en dalle de pierre aux gratte-ciel : le parcours architectural d'une île à travers le temps",
    'map.markers.taiwanNewMediaArt.title': 'Art des nouveaux médias de Taiwan',
    'map.markers.taiwanNewMediaArt.desc':
      'Explorez la culture et les récits de Taiwan',
    'map.markers.taiwanWatercolorCenturyEvolution.title':
      "Un siècle d'évolution de l'aquarelle à Taiwan",
    'map.markers.taiwanWatercolorCenturyEvolution.desc':
      "De l'éveil de Kinichiro Ishikawa durant la période coloniale japonaise à la renommée internationale de Chien Chung-Wei, l'aquarelle taïwanaise a parcouru un siècle pour devenir le centre de création aquarelliste le plus dynamique d'Asie.",
    'map.markers.taiwanModernPoetry.title': 'Poésie moderne de Taiwan',
    'map.markers.taiwanModernPoetry.desc':
      'Comment des expérimentations modernistes issues de trois cabinets de travail ont donné naissance à la révolution poétique la plus nativiste',
    'map.markers.taiwanContemporarySculpture.title':
      'Développement de la sculpture contemporaine à Taiwan',
    'map.markers.taiwanContemporarySculpture.desc':
      "De Yuyu Yang et Ju Ming à la nouvelle génération, explorez la trajectoire évolutive et l'esprit créatif de l'art sculptural taïwanais",
    'map.markers.taiwanCuratorsArtCulture.title':
      "Commissaires d'exposition et construction culturelle à Taiwan",
    'map.markers.taiwanCuratorsArtCulture.desc':
      "De la commissariat indépendant aux systèmes muséaux, comment les commissaires taïwanais construisent le discours culturel de l'art contemporain et le dialogue international",
    'map.markers.newMediaArt.title': 'Art des nouveaux médias',
    'map.markers.newMediaArt.desc':
      "L'exploration pionnière de Taïwan en matière d'art numérique, alliant technologie et sciences humaines, du laboratoire à la scène internationale",
    'map.markers.contemporaryTaiwanLiterature.title':
      'Littérature contemporaine de Taïwan',
    'map.markers.contemporaryTaiwanLiterature.desc':
      'Explorez la culture et les récits de Taïwan',
    'map.markers.taiwanContemporaryArt.title': 'Art contemporain de Taïwan',
    'map.markers.taiwanContemporaryArt.desc':
      "Du TFAM au pavillon de Taïwan à la Biennale de Venise, la position unique de l'art contemporain taïwanais sur la scène mondiale",
    'map.markers.kinmenGuesthouseMuseum.title':
      "Musée d'art contemporain de la Guesthouse de Kinmen",
    'map.markers.kinmenGuesthouseMuseum.desc':
      "Une station militaire de la Guerre froide témoin d'adieux et de retrouvailles, endormie pendant vingt ans avant d'être réveillée par un duo père-fille, aujourd'hui musée coup de cœur de Lonely Planet à Kaohsiung.",
    'map.markers.renjianMagazine.title': 'Renjian Magazine',
    'map.markers.renjianMagazine.desc':
      "47 numéros, quatre ans, une révolution menée en douceur par la photographie et l'écriture — le point de départ du reportage littéraire à Taïwan",
    'map.markers.taiwanIndigenousCulture.title': 'Culture autochtone de Taïwan',
    'map.markers.taiwanIndigenousCulture.desc':
      'Des traditions diverses de seize tribus au renouveau artistique contemporain, explorez la profondeur et la transformation moderne de la culture autochtone de Taïwan',
    'map.markers.taiwan16IndigenousTribes.title':
      'Carte culturelle des 16 peuples autochtones de Taïwan',
    'map.markers.taiwan16IndigenousTribes.desc':
      'Explorez les zones de répartition, les systèmes linguistiques, les fêtes importantes et les développements créatifs contemporains des 16 peuples autochtones de Taïwan, pour comprendre le paysage culturel diversifié des nations autochtones de Taïwan',
    'map.markers.taiwanNightMarketCulture.title':
      'Culture des marchés nocturnes et street food de Taïwan',
    'map.markers.taiwanNightMarketCulture.desc':
      'Plongez dans les origines et le charme unique de la culture des marchés nocturnes de Taïwan, ainsi que dans les histoires et la signification culturelle des street foods emblématiques',
    'map.markers.taiwanSensibilityKoreanPerspective.title':
      "Sensibilité taïwanaise : l'esthétique de Taïwan à travers les yeux coréens",
    'map.markers.taiwanSensibilityKoreanPerspective.desc':
      "Des clips K-pop aux foires du livre de Séoul, comment le « 대만감성 » (Taiwan-gamseong) transforme les rues quotidiennes de Taïwan en symbole esthétique le plus captivant d'Asie",
    'map.markers.taiwanCulturalCreativeParks.title':
      'Développement des parcs culturels et créatifs de Taïwan',
    'map.markers.taiwanCulturalCreativeParks.desc':
      "De la revitalisation d'anciens bâtiments aux clusters créatifs, le parcours de développement et les modèles innovants des parcs culturels et créatifs de Taïwan",
    'map.markers.taiwanOldStreetCulture.title':
      'Culture des vieilles rues et quartiers commerciaux de Taïwan',
    'map.markers.taiwanOldStreetCulture.desc':
      "De la prospérité portuaise sous la dynastie Qing aux bâtiments baroques de l'ère japonaise, les vieilles rues de Taïwan racontent une histoire populaire écrite en briques et tuiles",
    'map.markers.taiwanTeaCeremonyLifeAesthetics.title':
      'Cérémonie du thé et esthétique de vie à Taïwan',
    'map.markers.taiwanTeaCeremonyLifeAesthetics.desc':
      "Du Gongfu tea à l'esthétique de la cérémonie du thé, explorez comment Taïwan fusionne de manière innovante la culture orientale du thé avec l'esthétique de la vie locale",
    'map.markers.taiwanStreetArtGraffiti.title':
      'Art urbain et culture graffiti de Taïwan',
    'map.markers.taiwanStreetArtGraffiti.desc':
      'Du graffiti clandestin aux fresques murales autorisées, comment les murs de la ville sont devenus la scène créative des artistes taïwanais',
    'map.markers.taiwanIncenseMakingCulture.title':
      "Culture de la fabrication d'encens à Taïwan et sa terre natale",
    'map.markers.taiwanIncenseMakingCulture.desc':
      "Du savoir-faire séculaire de la communauté de Yunxiao à Chiayi à l'industrie de l'encens répartie à travers Taïwan — un ancien métier de dévotion, d'artisanat et de persévérance",
    'map.markers.taiwanHomophoneTaboos.title':
      'Culture des tabous homophones à Taïwan : pourquoi le « quatre » fait-il sauter des étages ?',
    'map.markers.taiwanHomophoneTaboos.desc':
      "Des hôpitaux sans quatrième étage aux plaques d'immatriculation « 8888 » vendues à prix d'or, la sensibilité taïwanaise aux homophones est sans doute de classe mondiale",
    'map.markers.hakkaCultureLanguage.title': 'Culture et langue hakka',
    'map.markers.hakkaCultureLanguage.desc':
      "L'esprit inflexible et la Fête de la Réparation du Ciel : l'héritage culturel et le renouveau moderne du peuple hakka de Taïwan",
    'map.markers.ethnicGroupsTaiwan.title':
      'Groupes ethniques (Hoklo, Hakka, Autochtones, Continentaux, Nouveaux immigrants)',
    'map.markers.ethnicGroupsTaiwan.desc':
      "La diversité ethnique de Taïwan n'est pas seulement le fruit d'un développement historique, mais aussi une clé pour comprendre la société taïwanaise contemporaine. Cette coexistence pluraliste est à la fois la source de la créativité culturelle de Taïwan et un fondement important du développement politique démocratique. Construire une identité taïwanaise partagée tout en respectant les caractéristiques culturelles de chaque groupe ethnique reste un défi permanent pour la société taïwanaise.",
    'map.markers.chinaSteel.title':
      "China Steel : le ministre à la tête de fer et la légende de l'acier des Dix Grands Projets de Construction",
    'map.markers.chinaSteel.desc':
      "Des négociations astucieuses de Chao Yao-Tung avec l'Europe et l'Amérique pour obtenir la technologie, à la première fumée blanche s'élevant de Xiaogang à Kaohsiung, China Steel a mis 50 ans à bâtir l'épine dorsale de l'industrie lourde taïwanaise — le joyau le plus abouti des Dix Grands Projets de Construction",
    'map.markers.taiwanCement.title':
      'Taiwan Cement : la légende de la transformation verte de la première entreprise cotée',
    'map.markers.taiwanCement.desc':
      "La Bourse de Taïwan est née pour elle en 1962, le code 1101 symbolisant l'origine des actions taïwanaises. À travers trois générations de gestion familiale Koo sur 76 ans, Taiwan Cement a été témoin du miracle de la construction taïwanaise avec ses fours à ciment, se transformant aujourd'hui en entreprise verte pour affronter l'ère de la neutralité carbone",
    'map.markers.tsmc.title': 'Entreprise taïwanaise : TSMC',
    'map.markers.tsmc.desc':
      'Leader mondial de la fonderie de semi-conducteurs, détenteur du fil vital de la civilisation numérique humaine',
    'map.markers.chimeiCorporation.title':
      'Chi Mei Corporation : le royaume acrylique de Hsu Wen-Long et son rêve de musée',
    'map.markers.chimeiCorporation.desc':
      "Parti d'une petite usine à Rende, Tainan, en 1960, Hsu Wen-Long a consacré sa vie à bâtir le plus grand royaume de matériaux ABS d'Asie, et a fondé le Musée Chi Mei pour rendre à la société — prouvant que les entreprises taïwanaises peuvent allier succès commercial et sensibilité humaniste",
    'map.markers.acer.title':
      "Groupe Acer — Pionnier de la révolution de l'industrie du PC",
    'map.markers.acer.desc':
      "Un pionnier de l'informatique personnelle originaire de Taoyuan, Taïwan, créant le modèle d'entreprise « multi-marques, multi-canaux » pour devenir le moteur de la transformation mondiale de l'industrie du PC",
    'map.markers.giantBicycles.title':
      'Entreprise taïwanaise : Giant Manufacturing',
    'map.markers.giantBicycles.desc':
      "De l'esclave OEM abandonné à l'empire caché fixant les normes mondiales de technologie cycliste",
    'map.markers.quantaComputer.title':
      'Entreprise taïwanaise : Quanta Computer',
    'map.markers.quantaComputer.desc':
      "De l'incendie d'usine au roi mondial de l'ordinateur portable, comment Barry Lam a-t-il bâti un nouvel empire pour l'ère de l'IA ?",
    'map.markers.aseGroup.title': 'Entreprise taïwanaise : ASE Group',
    'map.markers.aseGroup.desc':
      "La plus grande entreprise mondiale d'assemblage et de test de semi-conducteurs — pourquoi un patron du Bâtiment s'est-il tourné vers les semi-conducteurs ?",
    'map.markers.esunFinancialHolding.title':
      'Entreprise taïwanaise : E.SUN Financial Holding',
    'map.markers.esunFinancialHolding.desc':
      "De la banque spécialiste des cartes de crédit au pionnier de la finance numérique, l'histoire de la percée du PDG le plus jeune d'un holding financier à 43 ans",
    'map.markers.changChunPetrochemical.title':
      'Entreprise taïwanaise : Chang Chun Petrochemical',
    'map.markers.changChunPetrochemical.desc':
      "D'une petite usine de Tainan en 1949 au géant chimique mondial, l'histoire du champion caché du « pas d'IPO, pas d'emprunt »",
    'map.markers.formosaPlasticsGroup.title':
      'Entreprise taïwanaise : Evergreen Marine',
    'map.markers.formosaPlasticsGroup.desc':
      "D'un seul navire d'occasion à l'empire maritime mondial, la légende de l'océan bleu de Chang Yung-fa",
    'map.markers.taipeiFubon.title':
      'Économie des marchés nocturnes : un miracle commercial sans marques',
    'map.markers.taipeiFubon.desc':
      "Explorez comment les marchés nocturnes de Taïwan créent un miracle économique d'environ 400 milliards de NT$ par an, sans marques, sans décor ni emplacement fixe",
    'map.markers.taiwan7Eleven.title': 'Industrie du café à Taïwan',
    'map.markers.taiwan7Eleven.desc':
      "Des origines de la culture à l'époque coloniale japonaise au championnat du monde de Simple Kaffa, un siècle d'évolution du café taïwanais",
    'map.markers.taiwanHighSpeedRail.title':
      'Carte des spécialités locales de Taïwan',
    'map.markers.taiwanHighSpeedRail.desc':
      "Des rouleaux de gâteau de riz de Miaokou à Keelung aux jarrets de porc de Wanluan à Pingtung, des boulettes de viande de Hsinchu aux pommes sucrées de Taitung, chaque ville possède son ADN gustatif unique. Suivez les pas des locaux pour explorer les spécialités locales les plus représentatives des 22 comtés et villes de Taïwan, en savourant la culture populaire la plus authentique de l'île.",
    'map.markers.taiwanSemiconductorIndustry.title':
      'Plats maison de Taïwan : des souvenirs gustatifs en voie de disparition',
    'map.markers.taiwanSemiconductorIndustry.desc':
      'Du poulet à la menthe de Chiayi à la soupe de restes, les plats signature de grand-mère portent des souvenirs familiaux mais se perdent progressivement dans le flot du temps qui change',
    'map.markers.taiwanBankingSystem.title':
      'Fusion culinaire des nouveaux immigrants à Taïwan',
    'map.markers.taiwanBankingSystem.desc':
      "Quand l'aigre-doux thaï rencontre le sucré-salé taïwanais, quand le pho vietnamien rencontre les délices mijotés taïwanais, quand les épices indonésiennes enlacent les ingrédients locaux — une révolution culinaire transfrontalière se déploie en silence à Taïwan. Les nouveaux immigrants apportent non seulement la cuisine de leur pays d'origine, mais aussi de nouvelles possibilités pour enrichir la culture alimentaire de Taïwan.",
    'map.markers.taiwanSmes.title': 'Royaume des fruits de Taïwan',
    'map.markers.taiwanSmes.desc':
      'Des mangues et litchis aux pommes sucrées et pommes cireuses, la légende sucrée de la diversité des fruits tropicaux et des percées en technologie agricole',
    'map.markers.youbikePublicBikeSystem.title':
      'Culture des fruits de mer à Taïwan',
    'map.markers.youbikePublicBikeSystem.desc':
      "Livraison directe depuis les ports de pêche, culture des restaurants de fruits de mer, omelettes aux huîtres et autres délices maritimes mettent en valeur le caractère insulaire de Taïwan entouré par l'océan et ses riches traditions culinaires de fruits de mer",
    'map.markers.taiwanFoodBeverageIndustry.title':
      'Michelin et gastronomie raffinée à Taïwan',
    'map.markers.taiwanFoodBeverageIndustry.desc':
      "En 2018, la couverture rouge du Guide Michelin a porté pour la première fois le mot « TAIPEI », marquant l'entrée officielle de l'industrie agroalimentaire taïwanaise dans le système de notation international. Des étals de rue aux restaurants étoilés Michelin, de la cuisine populaire à la gastronomie raffinée, la culture culinaire taïwanaise dévoile un mélange captivant de tradition et d'innovation sur la scène internationale.",
    'map.markers.taiwanAgriculturalReform.title':
      'Culture des marchés nocturnes',
    'map.markers.taiwanAgriculturalReform.desc':
      '164 marchés nocturnes recensés, Tainan compte en moyenne un marché nocturne pour 38 000 habitants — des places de temple aux attractions touristiques internationales',
    'map.markers.taiwanTeaIndustry.title': 'Culinaire hakka',
    'map.markers.taiwanTeaIndustry.desc':
      "La riche et diversifiée culinaire culture du peuple Hakka, de la fragrance moelleuse du lei cha à l'essence forestière des boulettes de riz aux fleurs de gingembre sauvage, démontrant la sagesse du peuple Hakka en matière d'économie et d'utilisation des ressources locales",
    'map.markers.taiwanFishingIndustry.title': 'Nouilles au bœuf',
    'map.markers.taiwanFishingIndustry.desc':
      'De la nostalgie des immigrants continentaux au plat national de Taïwan, la fusion culturelle et la fragrance mondiale des nouilles au bœuf',
    'map.markers.taiwanFruitIndustry.title': 'Culture du thé',
    'map.markers.taiwanFruitIndustry.desc':
      "L'évolution de la culture du thé à Taïwan, de la cérémonie traditionnelle au bubble tea moderne, mettant en valeur les variétés de thé uniques de l'île et la culture de la dégustation",
    'map.markers.taiwanRiceVarieties.title':
      'Sur une île qui tremble, ils ont construit une tour qui peut voler',
    'map.markers.taiwanRiceVarieties.desc':
      "À seulement 200 mètres d'une faille active, les Taïwanais ont insisté pour construire le plus haut bâtiment du monde sur le sol le plus instable—puis un fou a passé 91 minutes à l'escalader à mains nues.",
    'map.markers.nightMarketCulture.title':
      'Les cinq grands terrains et la structure géographique de Taïwan : paysage insulaire des montagnes aux plaines',
    'map.markers.nightMarketCulture.desc':
      'Explorez la structure géographique unique de Taïwan, de la chaîne de montagnes centrale aux plaines occidentales, découvrant la diversité des reliefs de cette île',
    'map.markers.bubbleTeaGlobalPhenomenon.title':
      'Réseau de transport de Taïwan',
    'map.markers.bubbleTeaGlobalPhenomenon.desc':
      'TGV, métro, autoroutes, aviation—tissant un réseau de transport tridimensionnel pour la mobilité à Taïwan',
    'map.markers.taiwanBeefNoodle.title':
      'Système de sites panoramiques nationaux de Taïwan',
    'map.markers.taiwanBeefNoodle.desc':
      'De la côte nord-est à Kenting, les 13 sites panoramiques nationaux de Taïwan mettent en valeur des paysages naturels et culturels riches',
    'map.markers.taiwanHotPotCulture.title':
      'Caractéristiques géographiques insulaires et formation de Taïwan',
    'map.markers.taiwanHotPotCulture.desc':
      'Explorez les caractéristiques géographiques insulaires uniques de Taïwan, des mouvements tectoniques à la structure du relief, pour comprendre les mystères naturels de Formose',
    'map.markers.taiwanFineDining.title':
      'Mouvement tectonique et activité sismique de Taïwan',
    'map.markers.taiwanFineDining.desc':
      "Examen des caractéristiques géologiques de Taïwan à la jonction de la plaque eurasienne et de la plaque de la mer des Philippines, et des causes de l'activité sismique fréquente",
    'map.markers.taiwanStreetFood.title':
      'Barrages de Taïwan et gestion des ressources en eau',
    'map.markers.taiwanStreetFood.desc':
      "Des crises de pénurie d'eau à l'envasement des barrages, les défis des ressources en eau de Taïwan et le dilemme du déséquilibre de la distribution nord-sud",
    'map.markers.taiwanVegetarianCulture.title':
      'Réseau fluvial et caractéristiques hydrologiques de Taïwan : écoulements courts et rapides et changements saisonniers en géographie hydrologique',
    'map.markers.taiwanVegetarianCulture.desc':
      'Explorez le réseau fluvial unique de Taïwan, du fleuve Zhuoshui au fleuve Gaoping, pour comprendre comment le relief insulaire façonne les caractéristiques hydrologiques de Taïwan',
    'map.markers.taiwanCoffeeCulture.title':
      'Relief côtier et paysage marin de Taïwan',
    'map.markers.taiwanCoffeeCulture.desc':
      "Des côtes de caps et baies du nord aux côtes de failles de l'est, le relief côtier riche et varié de Taïwan témoigne du savoir-faire magistral des mouvements tectoniques",
    'map.markers.taiwanSnackCulture.title': 'Paysage thermal de Taïwan',
    'map.markers.taiwanSnackCulture.desc':
      'Beitou, Zhiben, Jiaoxi—la belle convergence de la culture des sources chaudes et des sciences géologiques',
    'map.markers.taiwanSeafoodCulture.title':
      'Point chaud de la biodiversité de Taïwan',
    'map.markers.taiwanSeafoodCulture.desc':
      'Une île de 36 000 kilomètres carrés abritant 59 000 espèces, une densité 100 fois supérieure à la moyenne mondiale',
    'map.markers.taiwanPineappleCake.title':
      'Paysage agricole et répartition industrielle de Taïwan',
    'map.markers.taiwanPineappleCake.desc':
      "Évolution du paysage agricole du nord au sud, mettant en lumière la transformation de Taïwan, du « grenier de Taïwan » à l'« agriculture de précision »",
    'map.markers.taiwanPorkRibSoup.title':
      'Développement urbain et fracture ville-campagne à Taïwan',
    'map.markers.taiwanPorkRibSoup.desc':
      "Le développement inégal entre villes et campagnes à Taïwan dans le cadre des six municipalités spéciales, la transformation spatiale d'un Taïwan agricole à un Taïwan urbain",
    'map.markers.taiwanOysterOmelette.title': 'Relief et géologie',
    'map.markers.taiwanOysterOmelette.desc':
      "Une île de 6 millions d'années abritant des souvenirs anciens de 200 millions d'années—un miracle de la plus jeune chaîne de montagnes du monde et de la collision tectonique la plus spectaculaire",
    'map.markers.taiwanBreakfastCulture.title':
      'Caractéristiques des villes et culture régionale',
    'map.markers.taiwanBreakfastCulture.desc':
      "Du caractère métropolitain international de Taipei au charme de l'ancienne capitale Tainan, comment les villes de Taïwan façonnent des identités locales uniques",
    'map.markers.taiwanConvenienceStoreFood.title':
      'Îles périphériques et culture marine : de la plus haute densité mondiale de barrages de pierre à la loi écologique de la saison des poissons volants',
    'map.markers.taiwanConvenienceStoreFood.desc':
      'Moins de 600 barrages de pierre existent dans le monde, mais Penghu en compte 574. Un peuple insulaire spécialisé dans la pêche aux poissons volants a transformé les tabous en système de gestion des ressources marines le plus sophistiqué',
    'map.markers.dutchSpanishColonialPeriod.title':
      'Incident du 228 et Terreur blanche : traumatisme et mémoire sous le régime autoritaire de Taïwan',
    'map.markers.dutchSpanishColonialPeriod.desc':
      "De l'incident du 228 de 1947 aux 38 ans de loi martiale, Taïwan a connu la violence d'État sous un régime autoritaire, ne commençant à affronter les traumatismes historiques et à poursuivre la justice transitionnelle qu'après la levée de la loi martiale.",
    'map.markers.zhengDynastyPeriod.title':
      'Crises du détroit de Taïwan et évolution des relations transstraitières',
    'map.markers.zhengDynastyPeriod.desc':
      "Retour sur les trois grandes crises du détroit de Taïwan et sur plus de soixante-dix ans d'évolution des relations transstraitières, pour comprendre le contexte historique et les défis contemporains de la situation dans le détroit de Taïwan",
    'map.markers.qingDynastyTaiwanHistory.title':
      'Histoire du commerce maritime de Taïwan',
    'map.markers.qingDynastyTaiwanHistory.desc':
      "Taïwan à l'ère des Grandes Découvertes, la légende de l'essor et du déclin, du centre du commerce international au royaume des pirates",
    'map.markers.japaneseColonialRule.title':
      'Histoire des villages de militaires à Taïwan',
    'map.markers.japaneseColonialRule.desc':
      "De l'armée solitaire de Birmanie aux royaumes de clôtures de bambou, comment une migration de 1,2 million de personnes a redéfini le concept de « chez soi »",
    'map.markers.februaryTwentyEightIncident.title':
      'Histoire du chemin de fer à Taïwan',
    'map.markers.februaryTwentyEightIncident.desc':
      "Du Liu Ming-chuan de la dynastie Qing à la ligne principale de l'ère japonaise puis au TGV, comment les chemins de fer ont façonné le développement urbain et la mémoire culturelle de Taïwan",
    'map.markers.martialLawPeriod.title':
      "Transfert du gouvernement du KMT à Taïwan et reconstruction d'après-guerre",
    'map.markers.martialLawPeriod.desc':
      "Exploration du contexte historique, du processus et de l'impact du transfert du gouvernement du KMT à Taïwan en 1949, ainsi que de la reconstruction politique, économique et sociale de Taïwan d'après-guerre",
    'map.markers.democratization.title': 'Période coloniale japonaise',
    'map.markers.democratization.desc':
      "1895-1945 : 50 ans de domination japonaise sur Taïwan ont apporté une modernisation globale et une gestion institutionnalisée tout en mettant en œuvre des politiques d'assimilation, influençant profondément le développement social de Taïwan",
    'map.markers.taiwanIndependenceMovement.title':
      'Période de la dynastie Qing',
    'map.markers.taiwanIndependenceMovement.desc':
      "1683-1895 : la dynastie Qing a gouverné Taïwan pendant environ 212 ans, d'une gouvernance passive à une construction active, établissant les fondations des divisions administratives modernes de Taïwan et de la société Han",
    'map.markers.taiwanChinaRelations.title':
      'Période néerlandaise-espagnole-Zheng',
    'map.markers.taiwanChinaRelations.desc':
      "Le premier système de colonisation systématique de Taïwan, de l'établissement du Fort Zeelandia par les Hollandais à l'ouverture de Taïwan par Koxinga, posant les fondations de l'immigration Han et des institutions politiques",
    'map.markers.taiwanUsRelations.title': 'Culture des supérettes',
    'map.markers.taiwanUsRelations.desc':
      "Les supérettes de Taïwan, à la densité la plus élevée au monde—comment elles se sont transformées de commerces de détail en système d'exploitation de la vie de toute une nation",
    'map.markers.taiwanInternationalStatus.title':
      'Système de transport de Taïwan',
    'map.markers.taiwanInternationalStatus.desc':
      'Le TGV traversant le nord au sud en 90 minutes, le métro tissant densément les artères urbaines, les scooters se faufilant dans les ruelles',
    'map.markers.taiwanHistoricalFigures.title':
      'Culture des supérettes à Taïwan',
    'map.markers.taiwanHistoricalFigures.desc':
      "Royaume des supérettes à la densité la plus élevée au monde, l'innovation localisée de 7-Eleven et FamilyMart redéfinissant le mode de vie moderne",
    'map.markers.taiwanPoliticalFigures.title':
      'Parcs de Taïwan et loisirs quotidiens',
    'map.markers.taiwanPoliticalFigures.desc':
      "Du tai-chi à l'aube aux promenades du soir—observation culturelle des parcs de Taïwan en tant qu'espaces sociaux intergénérationnels",
    'map.markers.kuomintangHistory.title': 'Culture du café à Taïwan',
    'map.markers.kuomintangHistory.desc':
      "Troisième densité mondiale de cafés indépendants, des grains d'Alishan au travail de bureau en café—études du café insulaire",
    'map.markers.democraticProgressivePartyHistory.title':
      "L'île qui poursuit les camions-poubelles : le parcours de Taïwan de la crise des déchets au miracle du recyclage",
    'map.markers.democraticProgressivePartyHistory.desc':
      "Un lieu comptant 400 décharges presque pleines dans les années 1990, qualifié d'« île des déchets » par les médias internationaux, a utilisé la musique de Beethoven pour faire courir 23 millions de personnes après les camions-poubelles chaque jour—30 ans plus tard, son taux de recyclage dépasse celui de la plupart des pays européens",
    'map.markers.taipeiHistory.title':
      'Histoire du développement du MRT de Taïwan : une évolution urbaine écrite en sang et en argent',
    'map.markers.taipeiHistory.desc':
      "209 tonnes de poutres d'acier tombant du ciel ont coûté 4 vies, 1,64 milliard de dollars taïwanais d'indemnisation, l'activité principale du MRT de Taipei perd encore de l'argent—le réel coût derrière les systèmes MRT de Taïwan",
    'map.markers.taiwanPrehistoricCulture.title':
      "Système éducatif de Taïwan : expérience insulaire de l'enfer du concours d'entrée unifié au labyrinthe du multichoix",
    'map.markers.taiwanPrehistoricCulture.desc':
      "Taïwan a passé 30 ans à tenter de briser le système du concours d'entrée unifié, pourtant le dernier examen par matière a doublé les inscriptions aux cours de soutien. Comment une île expérimente-t-elle socialement de manière répétée entre pression académique et équité éducative ?",
    'map.markers.taiwanIndigenousHistory.title': 'Culture du scooter à Taïwan',
    'map.markers.taiwanIndigenousHistory.desc':
      "Royaume insulaire à la densité de motocyclettes la plus élevée au monde, évolution culturelle d'un outil de trajet quotidien à un mode de vie",
    'map.markers.taiwanMilitaryHistory.title':
      'Culture des arcades et paysages de rue à Taïwan',
    'map.markers.taiwanMilitaryHistory.desc':
      'Couloirs de vie abritant du vent et de la pluie, souvenirs de rues taïwanaises tissés de scooters, de vendeurs ambulants et de chaleur humaine',
    'map.markers.taiwanWomenHistory.title': 'Vie nocturne et culture KTV',
    'map.markers.taiwanWomenHistory.desc':
      "Des salles privées de Cashbox aux restaurants de nuit, la vie nocturne ininterrompue de l'île qui ne dort jamais",
    'map.markers.taiwanEducationHistory.title':
      "Religion et croyances populaires : De la gestion de la peur à l'empire de la foi",
    'map.markers.taiwanEducationHistory.desc':
      'Taiwan possède la plus forte densité de temples au monde tout en se classant première mondiale en matière de liberté religieuse — cette contradiction cache la sagesse de survie des migrants militaires du XVIIe siècle',
    'map.markers.taiwanReligiousHistory.title': 'Culture des sources chaudes',
    'map.markers.taiwanReligiousHistory.desc':
      "De la réhabilitation militaire à l'une des trois plus grandes sources de boue au monde : Comment Taiwan est devenu accidentellement un royaume des sources chaudes",
    'map.markers.taiwanMediaHistory.title':
      'Traditions musicales autochtones de Taiwan',
    'map.markers.taiwanMediaHistory.desc':
      "Explorez la riche culture musicale des 16 peuples autochtones de Taiwan, des chants anciens aux instruments traditionnels, témoins de milliers d'années d'héritage culturel",
    'map.markers.badmintonChampions.title':
      "Fabrication d'instruments de musique à Taiwan : Des saxophones de Houli à l'usine musicale mondiale",
    'map.markers.badmintonChampions.desc':
      "Explorez le parcours de développement de la fabrication d'instruments de musique à Taiwan, de la domination mondiale des saxophones de Houli au royaume de la sous-traitance de guitares, jusqu'à la précision artisanale de la fabrication de boîtes à musique — comment Taiwan est passé de la sous-traitance à ses propres marques",
    'map.markers.baseballCulture.title':
      'Mouvement des chansons populaires de Taiwan',
    'map.markers.baseballCulture.desc':
      'De « Chantons nos propres chansons » à la transformation de toute la scène Mandopop — la révolution culturelle des années 1970 qui appartenait aux jeunes',
    'map.markers.taiwanBasketball.title':
      'Évolution de la scène musicale indépendante de Taiwan',
    'map.markers.taiwanBasketball.desc':
      'Des groupes underground à la musique indépendante, explorez la trajectoire de trente ans et la signification culturelle de la musique alternative à Taiwan',
    'map.markers.marathonRunning.title':
      'Musique électronique et culture des soirées à Taiwan : Du rave underground à la scène internationale',
    'map.markers.marathonRunning.desc':
      "De la culture rave des années 1990 au festival de musique électronique Road to Ultra, comment la musique électronique taïwanaise est passée de l'underground au grand public, en formant des DJ internationaux et des labels électroniques indépendants",
    'map.markers.taiwanEsports.title':
      'Culture des festivals de musique à Taiwan : De Spring Scream aux vecteurs florissants de la culture jeune',
    'map.markers.taiwanEsports.desc':
      "Explorez le développement des festivals de musique à Taiwan, de Spring Scream en passant par l'Ocean Music Festival jusqu'au Megaport Festival, et comment ils sont devenus des incubateurs pour les groupes indépendants et des plateformes centrales d'expression culturelle jeune",
    'map.markers.taiwanOlympics.title':
      'Scène musicale indépendante contemporaine de Taiwan',
    'map.markers.taiwanOlympics.desc':
      "Des performances underground à la matrice industrielle, analysez le contexte de développement et l'influence culturelle de l'écosystème musical indépendant moderne de Taiwan",
    'map.markers.taipeiCycle.title':
      'Sagesse écologique autochtone et conservation environnementale à Taiwan',
    'map.markers.taipeiCycle.desc':
      "Examiner les savoirs écologiques traditionnels accumulés pendant des milliers d'années par les peuples autochtones de Taiwan et leur valeur importante ainsi que leurs méthodes pratiques dans la conservation environnementale moderne",
    'map.markers.taiwanBetelNutCulture.title':
      "Montagnes et culture d'alpinisme à Taiwan",
    'map.markers.taiwanBetelNutCulture.desc':
      '268 sommets de plus de 3 000 mètres et la culture du Baiyue : Développement des sports de montagne et défis de conservation à Taiwan',
    'map.markers.taiwanElections.title': 'Écosystème forestier de Taiwan',
    'map.markers.taiwanElections.desc':
      'De la côte subtropicale aux forêts de conifères alpines, le monde forestier riche de Taiwan dans un dénivelé de 3 000 mètres',
    'map.markers.taiwanLgbtCulture.title':
      'Changement climatique et transformation zéro émission nette à Taiwan',
    'map.markers.taiwanLgbtCulture.desc':
      "Taiwan fait face aux impacts du changement climatique — des phénomènes météorologiques extrêmes fréquents à la planification de la politique zéro émission nette de carbone d'ici 2050, explorant les opportunités et les défis du processus de transition énergétique",
    'map.markers.taiwanMotorcycleCulture.title':
      'Conservation marine à Taiwan : Pourquoi un système de 30 ans ne peut-il pas sauver le blanchissement des coraux ?',
    'map.markers.taiwanMotorcycleCulture.desc':
      "En 2020, les eaux de Taiwan ont connu le plus grand blanchissement de coraux de l'histoire. De Xiaoliuqiu à l'atoll de Dongsha, même les coraux des zones protégées sont morts sous l'effet des hautes températures. Quel problème cela révèle-t-il ?",
    'map.markers.taipeiMrt.title':
      'Lutte contre la pollution marine et défis de conservation à Taiwan',
    'map.markers.taipeiMrt.desc':
      "Face aux déchets marins, à la surpêche et au changement climatique, exploration de l'état de la conservation marine, des défis et des solutions innovantes à Taiwan",
    'map.markers.kaohsiungMrt.title': 'Écologie marine de Taiwan',
    'map.markers.kaohsiungMrt.desc':
      "Des eaux protégées par les tabous du peuple Tao blanchissent désormais sous l'effet des hautes températures et du bruit sous-marin : Quand des millénaires de sagesse écologique rencontrent la crise marine moderne",
    'map.markers.taichungMrt.title':
      'Écologie marine et conservation des récifs coralliens à Taiwan',
    'map.markers.taichungMrt.desc':
      "Entourée par la mer, Taiwan possède une riche écologie marine — de la crise du blanchissement des coraux à la conservation des cétacés, examen de l'efficacité de la protection des parcs nationaux marins et des défis futurs",
    'map.markers.taiwanTrainSystem.title':
      'Sources chaudes et géothermie à Taiwan',
    'map.markers.taiwanTrainSystem.desc':
      'De la centrale géothermique avortée il y a 30 ans à la seule Hokutolite au monde : Comment une île transforme le feu souterrain en guérison et en électricité verte',
    'map.markers.taiwanBusSystem.title':
      'Conservation du chat-léopard de Taiwan',
    'map.markers.taiwanBusSystem.desc':
      "Le chat fantôme dont il reste moins de 500 spécimens à Taiwan — alors que le dernier félin natif marche vers le bord de l'extinction",
    'map.markers.taiwanInnovationEcosystem.title': 'Pangolin de Taiwan',
    'map.markers.taiwanInnovationEcosystem.desc':
      'Le mammifère le plus trafiqué au monde a trouvé un foyer sûr à Taiwan',
    'map.markers.taiwanMedicalSystem.title':
      "Écosystème alpin et reliquats de l'ère glaciaire à Taiwan",
    'map.markers.taiwanMedicalSystem.desc':
      "Examen de l'écosystème alpin unique de Taiwan au-dessus de 3 000 mètres, du cyprès de Taiwan et de la rhododendron de Yushan à la précieuse biodiversité des espèces reliquats de l'ère glaciaire",
    'map.markers.taiwanEducationSystem.title': 'Ours noir de Taiwan',
    'map.markers.taiwanEducationSystem.desc':
      'Le V blanc sur sa poitrine est sa signature — le dernier roi des montagnes de Taiwan et son combat de conservation inachevé',
    'map.markers.taiwanMusicIndustry.title': 'Parcs nationaux',
    'map.markers.taiwanMusicIndustry.desc':
      '9 parcs nationaux concentrés sur 36 197 kilomètres carrés — un miracle de conservation à la plus forte densité mondiale',
    'map.markers.mandarinPopMusic.title':
      "Sommet montagne et mer de l'île : Écologie et paysage des parcs nationaux de Taiwan",
    'map.markers.mandarinPopMusic.desc':
      'Explorez les écosystèmes uniques et la valeur de conservation des neuf parcs nationaux de Taiwan, des paysages complets de la côte subtropicale à la ligne des neiges alpines',
    'map.markers.taiwaneseIndieMusic.title': 'Espèces endémiques',
    'map.markers.taiwaneseIndieMusic.desc':
      "Les riches espèces endémiques de Taiwan démontrent le miracle évolutif de la biogéographie insulaire et l'importance de la conservation",
    'map.markers.taiwanRapHipHop.title': 'Diversité écologique',
    'map.markers.taiwanRapHipHop.desc':
      'Taiwan ne représente que 0,025 % de la surface mondiale mais abrite plus de 50 000 espèces, avec 60,71 % de couverture forestière, se classant au 33e rang mondial',
    'map.markers.taiwanElectronicMusic.title': 'Cétacés de Taiwan',
    'map.markers.taiwanElectronicMusic.desc':
      "Habitat d'un tiers des espèces de cétacés mondiales — de la chasse à la baleine passée à l'observation des baleines actuelle, comment Taiwan s'est-il transformé en centre de recherche en écologie marine ?",
    'map.markers.taiwanTraditionalMusic.title': 'Mayday',
    'map.markers.taiwanTraditionalMusic.desc':
      "Du lycée affilié à l'Université Normale à la scène mondiale, la jeunesse éternelle définissant l'esprit du rock mandarin",
    'map.markers.taiwanFilmIndustry.title': 'Wu Bai',
    'map.markers.taiwanFilmIndustry.desc':
      'Trésor national du rock taïwanais, synonyme de musique rock locale, établissant le statut du rock avec des œuvres comme « Norwegian Wood »',
    'map.markers.newTaiwanCinema.title': 'Wu Pao-chun',
    'map.markers.newTaiwanCinema.desc':
      'Champion du Concours mondial de la boulangerie, stupéfiant le monde avec son pain lychee-rose, de la campagne de Pingtung à maître boulanger de classe mondiale',
    'map.markers.taiwanDocumentary.title': 'Annette Lu',
    'map.markers.taiwanDocumentary.desc':
      'De rebelle à vice-présidente : La vie légendaire de la première femme vice-présidente du monde sinophone',
    'map.markers.taiwanAnimationIndustry.title': 'Jimmy Liao',
    'map.markers.taiwanAnimationIndustry.desc':
      'Illustrateur-poète réchauffant le monde avec des livres illustrés, portant les livres illustrés taïwanais sur la scène internationale',
    'map.markers.taiwanTelevisionIndustry.title': 'Tai Tzu-ying',
    'map.markers.taiwanTelevisionIndustry.desc':
      "Détentrice du record de 214 semaines au rang mondial numéro un, la reine du badminton taïwanaise de Kaohsiung Qianzhen à l'argent olympique",
    'map.markers.taiwanOttPlatforms.title': 'Li Ang',
    'map.markers.taiwanOttPlatforms.desc':
      'Auteure de « La Femme du boucher » et « Le Jardin perdu », pionnière de la littérature féministe taïwanaise',
    'map.markers.taiwanPodcastIndustry.title': 'Lee Chih-kai',
    'map.markers.taiwanPodcastIndustry.desc':
      "Du marché Kai de « Jump! Boys » à l'argent olympique, la vie de seize ans de tumbling du prince du cheval d'arçons de Taiwan",
    'map.markers.taiwanPublishing.title': 'Yuan T. Lee',
    'map.markers.taiwanPublishing.desc':
      'Lauréat du prix Nobel de chimie 1986, pionnier de nouveaux domaines en dynamique chimique avec la technique des faisceaux moléculaires croisés, premier lauréat Nobel scientifique de Taiwan',
    'map.markers.taiwanBookstoreCulture.title': 'Du Congming',
    'map.markers.taiwanBookstoreCulture.desc':
      "Premier titulaire d'un doctorat en médecine à Taïwan, père de la médecine taïwanaise moderne",
    'map.markers.taiwanComicMangaIndustry.title': 'Jeremy Lin',
    'map.markers.taiwanComicMangaIndustry.desc':
      'De diplômé de Harvard à champion NBA, joueur américano-taïwanais qui a déclenché la Linsanity mondiale',
    'map.markers.taiwanGameIndustry.title': 'Kevin Lin',
    'map.markers.taiwanGameIndustry.desc':
      "Du jeune homme maigre rejeté par l'équipe d'athlétisme au coureur polaire créant l'histoire en traversant le désert du Sahara à pied",
    'map.markers.nationalPalaceMuseum.title': 'Lin Yi-hsiung',
    'map.markers.nationalPalaceMuseum.desc':
      'Pionnier du mouvement démocratique, victime du massacre de la résidence Lin, leader du mouvement anti-centrale nucléaire quatre',
    'map.markers.nationalParks.title': 'Edward Yang',
    'map.markers.nationalParks.desc':
      "Figure centrale du mouvement du Nouveau Cinéma taïwanais, meilleur réalisateur à Cannes, poète de l'aliénation urbaine",
    'map.markers.taiwanGeography.title': 'Pai Hsien-yung',
    'map.markers.taiwanGeography.desc':
      "Auteur de « Taipei People », maître de la littérature moderne et défenseur de la renaissance de l'opéra Kunqu",
    'map.markers.taiwanClimate.title': 'Crowd Lu',
    'map.markers.taiwanClimate.desc':
      'Auteur-compositeur-interprète et acteur taïwanais, triple lauréat (Golden Melody, Golden Bell, Golden Horse), connu pour son image populaire et son style vocal unique',
    'map.markers.taiwanEcosystem.title': 'Chuang Chih-yuan',
    'map.markers.taiwanEcosystem.desc':
      "Parrain du tennis de table, quatre fois olympien, héros solitaire s'entraînant dans la solitude",
    'map.markers.taiwanEndangeredSpecies.title': 'Tsai Ming-liang',
    'map.markers.taiwanEndangeredSpecies.desc':
      "Lauréat du Lion d'or à Venise, Chinois de Malaisie, maître de l'esthétique du cinéma lent",
    'map.markers.taiwanMarineEcology.title': 'Hsu Wen-lung',
    'map.markers.taiwanMarineEcology.desc':
      "Fondateur de Chi Mei Corporation, triple identité d'entrepreneur, violoniste et collectionneur d'art, créateur du Musée Chi Mei",
    'map.markers.taiwanBirdwatching.title': 'Hsu Fang-yi',
    'map.markers.taiwanBirdwatching.desc':
      'De la jeune fille de Yilan à la première danseuse de la Martha Graham Dance Company, puis retour à Taïwan pour fonder Fang-Yi Hsu & Bare Dance — elle raconte les histoires les plus puissantes de Taïwan à travers son corps',
    'map.markers.taiwanHotSprings.title':
      'Lai Ching-te : De la famille de mineurs au Bureau présidentiel, médecin de santé publique',
    'map.markers.taiwanHotSprings.desc':
      "16e président de Taïwan, première figure politique de l'histoire constitutionnelle de la ROC à se présenter comme vice-président et à remporter l'élection",
    'map.markers.taiwanIslands.title': 'Kuo Hsing-chun',
    'map.markers.taiwanIslands.desc':
      "Déesse de l'haltérophilie taïwanaise, médaillée d'or aux JO de Tokyo 2021, détentrice de trois records olympiques dans la catégorie des 59 kg",
    'map.markers.taiwanMountains.title': 'Deng Yu-xian',
    'map.markers.taiwanMountains.desc':
      'Père des chansons populaires taïwanaises, compositeur de classiques taïwanais dont « En attendant la brise printanière », « Fleur de nuit pluvieuse » et « Mélancolie au clair de lune »',
    'map.markers.taiwanRivers.title': 'Chung Li-ho',
    'map.markers.taiwanRivers.desc':
      'Auteur de « La Fleur de glace terne », père de la littérature taïwanaise, combattant littéraire persistant dans la création malgré la pauvreté et la maladie',
    'map.markers.taiwanCoastline.title': 'Chen Shu-chu',
    'map.markers.taiwanCoastline.desc':
      "Des actes de bonté ordinaires d'une vendeuse de légumes de Taitung, utilisant toute une vie pour interpréter ce que signifie la vraie richesse",
    'map.markers.taiwanForests.title': 'Chen Shui-bian',
    'map.markers.taiwanForests.desc':
      '10e et 11e président, protagoniste de la première alternance politique en 2000, figure importante de la démocratisation de Taïwan',
    'map.markers.taiwanNaturalDisasters.title': 'Ma Ying-jeou',
    'map.markers.taiwanNaturalDisasters.desc':
      "12e et 13e président, moteur du dégel des relations transstraitières, signataire de l'ECFA",
    'map.markers.taiwanEarthquakes.title': 'Huang Chun-ming',
    'map.markers.taiwanEarthquakes.desc':
      'Auteur de « Le Gong et le Tambour » et « Les Jours à regarder la mer », écrivain représentatif de la littérature nativiste de Yilan',
    'map.markers.taiwanTyphoons.title':
      "Huang Zhen-nan : Le Takeshi Kaneshiro des bibliophiles et source vivante de l'histoire de Taïwan",
    'map.markers.taiwanTyphoons.desc':
      "Huang Zhen-nan est un chercheur en histoire taïwanaise, bibliophile et auteur qui a commencé avec le pseudonyme PTT Sizumaru, gérant la page « Living Water Old Book Room » pour partager l'histoire de Taïwan et la culture des vieux livres. Auteur d'ouvrages comme « L'histoire la plus divertissante de Taïwan », il est surnommé le Takeshi Kaneshiro des bibliophiles. Partant de sa famille d'érudits à Chiayi Liujiao, père et fils se divisent le travail nord-sud de collecte de documents, dédiés à rendre l'histoire sérieuse de Taïwan intéressante et accessible.",
    'map.markers.sunflowerMovement.title':
      "Éthique des zoos et des animaux d'exposition",
    'map.markers.sunflowerMovement.desc':
      'Des éléphants en cages de fer aux murs de méduses de Xpark — Taïwan redéfinit la relation entre humains et animaux exposés',
    'map.markers.taiwanSocialMovements.title':
      'Justice foncière des peuples autochtones et territoires traditionnels',
    'map.markers.taiwanSocialMovements.desc':
      'Examen du contexte historique des droits fonciers des peuples autochtones de Taïwan, des évolutions juridiques, des controverses de démarcation des territoires traditionnels et des réalisations du Comité de justice transitionnelle des peuples autochtones',
    'map.markers.taiwanMarriageEquality.title':
      'Mariage pour tous et égalité des genres à Taïwan',
    'map.markers.taiwanMarriageEquality.desc':
      "De prisonnier sous la loi martiale à la première loi sur le mariage homosexuel en Asie — comment la lutte de 30 ans d'un homme a redéfini l'amour sur l'île",
    'map.markers.taiwanEnvironmentalJustice.title':
      'Justice environnementale et controverses NIMBY à Taïwan',
    'map.markers.taiwanEnvironmentalJustice.desc':
      "Examen de la répartition inégale des charges environnementales à Taïwan, des incinérateurs et déchets nucléaires aux conflits NIMBY de l'industrie pétrochimique, analyse des inégalités environnementales et des questions de justice sociale",
    'map.markers.taiwanCommunityRiCulture.title':
      'Communautés et culture de quartier à Taïwan',
    'map.markers.taiwanCommunityRiCulture.desc':
      "De la pratique démocratique de base à l'innovation sociale par le développement communautaire",
    'map.markers.taiwanLongTermCare.title':
      'Développement du système de soins de longue durée à Taïwan',
    'map.markers.taiwanLongTermCare.desc':
      'Le système de soins de longue durée le plus avancé au monde, mais abritant simultanément le plus grand système de soins invisible',
    'map.markers.taiwanLaborMovement.title':
      "Protection de l'environnement et développement durable",
    'map.markers.taiwanLaborMovement.desc':
      "De l'île des cheminées à Taïwan zéro émission nette : le parcours d'éveil de 40 ans du mouvement environnemental",
    'map.markers.taiwanHousingIssues.title':
      'Logement social et justice du logement',
    'map.markers.taiwanHousingIssues.desc':
      "Comment Taïwan atteint la justice du logement grâce aux politiques de logement social, offrant à chacun un lieu où s'installer",
    'map.markers.taiwanHealthcareSystem.title':
      'Développement des parcs scientifiques',
    'map.markers.taiwanHealthcareSystem.desc':
      'Du parc scientifique de Hsinchu au parc scientifique du sud de Taïwan, exploration du parcours de développement des parcs scientifiques taïwanais et du positionnement unique des trois grands parcs',
    'map.markers.taiwanImmigration.title': 'Industrie des semi-conducteurs',
    'map.markers.taiwanImmigration.desc':
      "Du pari historique de Morris Chang à l'ère des 2 nanomètres : comment TSMC a fait de Taïwan la ligne de vie technologique mondiale",
    'map.markers.taiwanReligiousDiversity.title':
      'Terrain côtier et paysage marin de Taïwan',
    'map.markers.taiwanReligiousDiversity.desc':
      "Le cou de la Tête de la Reine de Yehliu s'amincit de 0,2 cm par an et finira par se briser — c'est le destin et la beauté du terrain côtier de Taïwan",
    'map.markers.taiwanBuddhismTaoism.title':
      'Cérémonie du thé et esthétique de vie à Taïwan',
    'map.markers.taiwanBuddhismTaoism.desc':
      "La nuit où le Wistaria Tea House a ouvert en 1981, membres de l'opposition et lettrés se sont réunis pour le thé — c'était plus qu'un salon de thé, c'était une base secrète pour le mouvement d'opposition",
    'map.markers.taiwanFolkReligion.title':
      'Élections et vie politique partisane à Taïwan',
    'map.markers.taiwanFolkReligion.desc':
      "Des conseillers municipaux en 1950 à l'alternance politique en 2000, voyez comment Taïwan a utilisé les bulletins de vote pour écrire un miracle de transformation démocratique",
    'map.markers.taiwanChristianity.title':
      'Développement urbain et fracture ville-campagne à Taïwan',
    'map.markers.taiwanChristianity.desc':
      "70 ans d'île agricole à île urbaine, lumières et ombres de 70 % de la population concentrée dans six municipalités spéciales : Taichung prospère vs. le contraste cruel du déclin de Yunlin",
    'map.markers.taiwanIslamJudaism.title':
      'Caractéristiques des villes et culture régionale',
    'map.markers.taiwanIslamJudaism.desc':
      'Des 4,04 millions de New Taipei aux 1,85 million de Tainan, voyez comment les six municipalités spéciales façonnent leur caractère urbain respectif à travers la transformation industrielle',
    'map.markers.kaohsiungIncident.title': 'Démocratisation',
    'map.markers.kaohsiungIncident.desc':
      "L'affrontement police-civils du 10 décembre 1979 dans les rues de Kaohsiung a finalement donné naissance à la transition démocratique de Taïwan — mais au prix de combien de jeunesse et de liberté ?",
    'map.markers.wangLeeOlympicGold.title':
      'Wang Chi-lin et Lee Yang (Le duo Lin-Yang)',
    'map.markers.wangLeeOlympicGold.desc':
      "Du collège aux médailles olympiques : « Le duo Lin-Yang » a battu la Chine en 34 minutes en deux sets, écrivant la première médaille d'or olympique de l'histoire du badminton taïwanais",
  },
  es: {
    'map.meta.title': 'Mapa de Taiwán',
    'map.meta.description': 'Explora Taiwan.md a través de un enfoque de mapa',
    'map.hero.kicker': 'Vista del Mapa',
    'map.hero.title': 'Mapa de Taiwán',
    'map.hero.subtitle':
      'Explora la cultura, gastronomía, naturaleza e historia de Taiwán a través de un mapa interactivo.',
    'map.controls.region.title': 'Filtro de Región',
    'map.controls.region.all': 'Todas',
    'map.controls.region.north': 'Norte',
    'map.controls.region.central': 'Centro',
    'map.controls.region.south': 'Sur',
    'map.controls.region.east': 'Este',
    'map.controls.region.islands': 'Islas',
    'map.controls.category.title': 'Filtro de Categoría',
    'map.controls.category.all': 'Todas',
    'map.controls.category.food': '🍜 Gastronomía',
    'map.controls.category.history': '📜 Historia',
    'map.controls.category.nature': '🌿 Naturaleza',
    'map.controls.category.culture': '🎭 Cultura',
    'map.controls.category.technology': '💻 Tecnología',
    'map.controls.category.economy': '📈 Economía',
    'map.controls.category.lifestyle': '🏮 Estilo de Vida',
    'map.controls.category.art': '🎨 Arte',
    'map.controls.category.geography': '🗺️ Geografía',
    'map.route.title': '🗺️ Rutas Curadas',
    'map.route.normal-mode': 'Modo Normal',
    'map.sidebar.default.title': '📍 Explora Artículos de Taiwán',
    'map.sidebar.default.hint':
      'Haz clic en los condados o marcadores del mapa para explorar artículos',
    'map.sidebar.county.clear': '✕ Limpiar Selección',
    'map.sidebar.county.articles-count': 'artículos',
    'map.sidebar.county.no-articles': 'Aún no hay artículos en esta región',
    'map.sidebar.article.back': '← Volver',
    'map.sidebar.article.read-more': 'Leer Más →',
    'map.zoom.in': '＋',
    'map.zoom.out': '－',
    'map.zoom.reset': '⌂',
    'map.tooltip.county.articles': 'artículos relacionados',
    'map.tooltip.county.click': 'Haz clic para filtrar esta región',
    'map.tooltip.marker.reading-time': 'min de lectura',
    'map.panel.title': 'Mapa de Conocimiento de Taiwán',
    'map.panel.stat.points': 'Puntos de Conocimiento',
    'map.panel.stat.categories': 'Categorías',
    'map.panel.category-distribution': 'Distribución por Categoría',
    'map.panel.link.graph': '🕸️ Grafo de Conocimiento',
    'map.panel.link.home': '🏠 Centros de Categorías',
    'map.category.history': '📜 Historia',
    'map.category.geography': '🗺️ Geografía',
    'map.category.culture': '🎭 Cultura',
    'map.category.food': '🍜 Gastronomía',
    'map.category.art': '🎨 Arte',
    'map.category.music': '🎵 Música',
    'map.category.technology': '💻 Tecnología',
    'map.category.nature': '🌿 Naturaleza',
    'map.category.people': '👥 Personas',
    'map.category.society': '⚖️ Sociedad',
    'map.category.economy': '📈 Economía',
    'map.category.lifestyle': '🏮 Estilo de Vida',
    'map.sidebar.more-articles': '⋯y',
    'map.sidebar.more-articles-suffix': 'más',
    'map.routes.nightMarkets.name': '🍜 Tour de Mercados Nocturnos',
    'map.routes.nightMarkets.description':
      'De norte a sur, la cultura de mercados nocturnos más icónica de Taiwán',
    'map.routes.nationalParks.name': '🏔️ Parques Nacionales',
    'map.routes.nationalParks.description':
      'Desde picos de 3.952 m hasta arrecifes de coral tropicales, las maravillas naturales de Taiwán',
    'map.routes.historyTrail.name': '📜 Ruta Histórica',
    'map.routes.historyTrail.description':
      'Desde la colonización holandesa hasta la democratización, recorriendo 400 años de Taiwán',
    'map.routes.oldStreets.name': '🏮 Paseo por Calles Antiguas',
    'map.routes.oldStreets.description':
      'Recuerdos taiwaneses en calles centenarias, la arquitectura como historia',
    'map.routes.counties22.name': '📍 22 condados y ciudades en profundidad',
    'map.routes.counties22.description':
      'Recorre los 22 artículos en profundidad de Taiwan.md — una contradicción central por lugar, del piloto de Keelung al final en Nuevo Taipéi.',
    'map.counties22.panel.title': '📍 22 condados y ciudades en profundidad',
    'map.counties22.panel.hint':
      'Abre una tarjeta de condado aquí, o haz clic en un condado en el mapa',
    'map.counties22.tooltip.openDeep':
      'Haz clic para abrir el artículo en profundidad',
    'map.counties22.deepCard.badge': '📖 Serie 22 condados · En profundidad',
    'map.counties22.deepCard.cta': 'Leer el artículo completo →',
    'map.stops.shilinNightMarket.name': 'Mercado Nocturno de Shilin',
    'map.stops.shilinNightMarket.note':
      'El mercado nocturno turístico más grande de Taiwán, cuna del panqueque grande envuelto con panqueque pequeño',
    'map.stops.raoheNightMarket.name': 'Mercado Nocturno de Raohe',
    'map.stops.raoheNightMarket.note':
      'Destino para hacer cola por bollos de pimienta, favorito de los residentes de Taipéi',
    'map.stops.ningxiaNightMarket.name': 'Mercado Nocturno de Ningxia',
    'map.stops.ningxiaNightMarket.note':
      'La mayor densidad gastronómica, comida callejera recomendada por Michelin',
    'map.stops.fengjiaNightMarket.name': 'Mercado Nocturno de Fengjia',
    'map.stops.fengjiaNightMarket.note':
      'Laboratorio de snacks creativos, vanguardia de la innovación en mercados nocturnos de Taiwán',
    'map.stops.huayuanNightMarket.name': 'Mercado Nocturno del Jardín',
    'map.stops.huayuanNightMarket.note':
      'El mercado nocturno más grande de Tainán, carnaval limitado abierto solo tres días a la semana',
    'map.stops.liuheNightMarket.name': 'Mercado Nocturno Liuhe',
    'map.stops.liuheNightMarket.note':
      'Mercado nocturno emblemático de Kaohsiung, el marisco es la estrella aquí',
    'map.stops.yangmingshanNationalPark.name': 'Parque Nacional Yangmingshan',
    'map.stops.yangmingshanNationalPark.note':
      'El jardín trasero de Taipéi, paraíso de terreno volcánico y aguas termales',
    'map.stops.tarokoNationalPark.name': 'Parque Nacional Taroko',
    'map.stops.tarokoNationalPark.note':
      'Garganta de mármol, maravilla geológica de clase mundial',
    'map.stops.yushanNationalPark.name': 'Parque Nacional Yushan',
    'map.stops.yushanNationalPark.note':
      'El pico más alto del noreste de Asia (3.952 m), el techo de Taiwán',
    'map.stops.alishanScenicArea.name': 'Zona Escénica de Alishan',
    'map.stops.alishanScenicArea.note':
      'Amanecer entre mar de nubes, árboles sagrados y ferrocarril forestal',
    'map.stops.sunMoonLakeScenicArea.name': 'Zona Escénica del Lago Sun Moon',
    'map.stops.sunMoonLakeScenicArea.note':
      'El lago natural más grande de Taiwán, lago sagrado del pueblo Thao',
    'map.stops.kentingNationalPark.name': 'Parque Nacional Kenting',
    'map.stops.kentingNationalPark.note':
      'El punto más al sur de Taiwán, arrecifes de coral tropicales y península de Hengchun',
    'map.stops.anpingFort.name': 'Fuerte de Anping',
    'map.stops.anpingFort.note':
      'Construido por los holandeses en 1624, la fortaleza más antigua de Taiwán',
    'map.stops.chikanTower.name': 'Torre Chikan',
    'map.stops.chikanTower.note':
      'De la Provintia holandesa al símbolo del dominio de Koxinga',
    'map.stops.lukang.name': 'Lukang',
    'map.stops.lukang.note':
      'La segunda ciudad más grande de Taiwán en la dinastía Qing, "Uno Fu, Dos Lu, Tres Mengka"',
    'map.stops.presidentialOffice.name':
      'Oficina Presidencial (antigua Oficina del Gobernador General de Taiwán)',
    'map.stops.presidentialOffice.note':
      'Completada en 1919, centro de máxima autoridad durante el período colonial japonés',
    'map.stops.chiangKaiShekMemorialHall.name':
      'Salón Conmemorativo de Chiang Kai-shek',
    'map.stops.chiangKaiShekMemorialHall.note':
      'Símbolo del autoritarismo y foco del debate sobre justicia transicional',
    'map.stops.legislativeYuan.name':
      'Yuan Legislativo (Movimiento del Girasol)',
    'map.stops.legislativeYuan.note':
      'Sitio del Movimiento del Girasol de 2014, hito de la democracia taiwanesa',
    'map.stops.dihuaStreet.name': 'Calle Dihua',
    'map.stops.dihuaStreet.note':
      'Corazón de Dadaocheng, productos secos y calle de Año Nuevo',
    'map.stops.jiufenOldStreet.name': 'Calle Vieja de Jiufen',
    'map.stops.jiufenOldStreet.note':
      'Era dorada de la minería e inspiración de El viaje de Chihiro',
    'map.stops.lukangOldStreet.name': 'Calle Vieja de Lukang',
    'map.stops.lukangOldStreet.note':
      'Casas tradicionales de ladrillo rojo y museo vivo de artesanías tradicionales',
    'map.stops.anpingOldStreet.name': 'Calle Vieja de Anping',
    'map.stops.anpingOldStreet.note':
      'La primera calle de Taiwán, cuatrocientos años de capas históricas',
    'map.stops.qishanOldStreet.name': 'Calle Vieja de Qishan',
    'map.stops.qishanOldStreet.note':
      'Conjunto de arquitectura barroca del Reino del Plátano',
    'map.stops.tamsuiOldStreet.name': 'Calle Vieja de Tamsui',
    'map.stops.tamsuiOldStreet.note':
      'Atardecer, A-gei y encanto histórico de la desembocadura del río Tamsui',
    'map.city.taipei': 'Taipéi',
    'map.city.newTaipei': 'Nuevo Taipéi',
    'map.city.keelung': 'Keelung',
    'map.city.taoyuan': 'Taoyuan',
    'map.city.hsinchu': 'Hsinchu',
    'map.city.miaoli': 'Miaoli',
    'map.city.taichung': 'Taichung',
    'map.city.changhua': 'Changhua',
    'map.city.nantou': 'Nantou',
    'map.city.chiayi': 'Chiayi',
    'map.city.tainan': 'Tainán',
    'map.city.kaohsiung': 'Kaohsiung',
    'map.city.pingtung': 'Pingtung',
    'map.city.yilan': 'Yilan',
    'map.city.hualien': 'Hualien',
    'map.city.taitung': 'Taitung',
    'map.city.penghu': 'Penghu',
    'map.city.kinmen': 'Kinmen',
    'map.markers.founderCheYuWu.title': 'Fundador — Che-Yu Wu',
    'map.markers.founderCheYuWu.desc':
      'Del código a la poesía: el viaje de un artista taiwés hacia el reconocimiento internacional',
    'map.markers.taiwanIndigenousContemporaryArt.title':
      'Arte Contemporáneo Indígena de Taiwán',
    'map.markers.taiwanIndigenousContemporaryArt.desc':
      'De las artesanías tradicionales a la creación contemporánea, explora cómo los artistas indígenas de Taiwán hacen oír su presencia en el escenario artístico global, redefiniendo el diálogo entre identidad indígena y arte contemporáneo',
    'map.markers.taiwanExperimentalNewMediaArt.title':
      'Arte Experimental y de Nuevos Medios de Taiwán',
    'map.markers.taiwanExperimentalNewMediaArt.desc':
      'Del arte en video a las interacciones en RV, explora el desarrollo innovador del arte de nuevos medios de Taiwán y su ecosistema artístico tecnológico',
    'map.markers.taiwanArchitecture.title': 'Arquitectura de Taiwán',
    'map.markers.taiwanArchitecture.desc':
      'De las casas de losa de piedra a los rascacielos: el viaje arquitectónico de una isla a través del tiempo',
    'map.markers.taiwanNewMediaArt.title': 'Arte de Nuevos Medios de Taiwán',
    'map.markers.taiwanNewMediaArt.desc':
      'Explora la cultura e historias de Taiwán',
    'map.markers.taiwanWatercolorCenturyEvolution.title':
      'Siglo de Evolución de la Acuarela en Taiwán',
    'map.markers.taiwanWatercolorCenturyEvolution.desc':
      'Desde la iluminación de Kinichiro Ishikawa durante el período colonial japonés hasta la fama internacional del contemporáneo Chien Chung-Wei, la acuarela taiwanesa ha recorrido un siglo para convertirse en el centro de creación de acuarela más vibrante de Asia.',
    'map.markers.taiwanModernPoetry.title': 'Poesía Moderna de Taiwán',
    'map.markers.taiwanModernPoetry.desc':
      'Cómo los experimentos modernistas surgidos de tres salas de estudio dieron origen inesperadamente a la revolución poética más nativista',
    'map.markers.taiwanContemporarySculpture.title':
      'Desarrollo de la Escultura Contemporánea en Taiwán',
    'map.markers.taiwanContemporarySculpture.desc':
      'De Yuyu Yang y Ju Ming a la nueva generación, explora la trayectoria evolutiva y el espíritu creativo del arte escultórico de Taiwán',
    'map.markers.taiwanCuratorsArtCulture.title':
      'Curadores de Taiwán y Construcción de la Cultura Artística',
    'map.markers.taiwanCuratorsArtCulture.desc':
      'De la curaduría independiente a los sistemas museísticos, cómo los curadores de Taiwán construyen el discurso cultural del arte contemporáneo y el diálogo internacional',
    'map.markers.newMediaArt.title': 'Nuevos Medios Artísticos',
    'map.markers.newMediaArt.desc':
      'La exploración pionera de Taiwán en el arte digital, fusionando tecnología y humanidades desde el laboratorio hasta el escenario internacional',
    'map.markers.contemporaryTaiwanLiterature.title':
      'Literatura Contemporánea de Taiwán',
    'map.markers.contemporaryTaiwanLiterature.desc':
      'Explora la cultura e historias de Taiwán',
    'map.markers.taiwanContemporaryArt.title': 'Arte Contemporáneo de Taiwán',
    'map.markers.taiwanContemporaryArt.desc':
      'Desde el TFAM hasta el Pabellón de Taiwán en la Bienal de Venecia, la posición única del arte contemporáneo taiwanés en el escenario global',
    'map.markers.kinmenGuesthouseMuseum.title':
      'Museo de Arte Contemporáneo Kinmen Guesthouse',
    'map.markers.kinmenGuesthouseMuseum.desc':
      'Una estación militar de la Guerra Fría que fue testigo de despedidas y reencuentros, dormida durante veinte años antes de ser despertada por un dúo padre-hija, ahora el museo favorito de Lonely Planet en Kaohsiung.',
    'map.markers.renjianMagazine.title': 'Revista Renjian',
    'map.markers.renjianMagazine.desc':
      '47 números, cuatro años, una revolución silenciosa librada con fotografía y escritura: el punto de partida de la literatura de reportaje en Taiwán',
    'map.markers.taiwanIndigenousCulture.title': 'Cultura Indígena de Taiwán',
    'map.markers.taiwanIndigenousCulture.desc':
      'Desde las diversas tradiciones de dieciséis tribus hasta el resurgimiento artístico contemporáneo, explora la profunda profundidad y transformación moderna de la cultura indígena de Taiwán',
    'map.markers.taiwan16IndigenousTribes.title':
      'Mapa Cultural de las 16 Tribus Indígenas de Taiwán',
    'map.markers.taiwan16IndigenousTribes.desc':
      'Explora las áreas de distribución, sistemas lingüísticos, festivales importantes y desarrollos creativos contemporáneos de los 16 pueblos indígenas de Taiwán, comprendiendo el diverso paisaje cultural de las naciones indígenas taiwanesas',
    'map.markers.taiwanNightMarketCulture.title':
      'Cultura de los Nocturnmercados y Comida Callejera de Taiwán',
    'map.markers.taiwanNightMarketCulture.desc':
      'Sumérgete en los antecedentes y el encanto único de la cultura de los nocturnmercados de Taiwán, junto con las historias y el significado cultural de las comidas callejeras representativas',
    'map.markers.taiwanSensibilityKoreanPerspective.title':
      'Sensibilidad Taiwanesa: Estética de Taiwán a Través de Ojos Coreanos',
    'map.markers.taiwanSensibilityKoreanPerspective.desc':
      'Desde videos musicales de K-pop hasta ferias del libro de Seúl, cómo el "대만감성" (Taiwan-gamseong) transforma los paisajes cotidianos de Taiwán en el símbolo estético más cautivador de Asia',
    'map.markers.taiwanCulturalCreativeParks.title':
      'Desarrollo de Parques Culturales y Creativos de Taiwán',
    'map.markers.taiwanCulturalCreativeParks.desc':
      'Desde la revitalización de edificios antiguos hasta conglomerados creativos, el recorrido de desarrollo y los modelos innovadores de los parques culturales y creativos de Taiwán',
    'map.markers.taiwanOldStreetCulture.title':
      'Cultura de las Calles Antiguas y Distritos Comerciales de Taiwán',
    'map.markers.taiwanOldStreetCulture.desc':
      'Desde la prosperidad portuaria de la dinastía Qing hasta los edificios barrocos de la era japonesa, las calles antiguas de Taiwán son una historia del pueblo escrita en ladrillo y teja',
    'map.markers.taiwanTeaCeremonyLifeAesthetics.title':
      'Ceremonia del Té y Estética de Vida de Taiwán',
    'map.markers.taiwanTeaCeremonyLifeAesthetics.desc':
      'Desde el té Gongfu hasta la estética de la ceremonia del té, explora cómo Taiwán fusiona innovadoramente la cultura oriental del té con la estética de vida local',
    'map.markers.taiwanStreetArtGraffiti.title':
      'Arte Callejero y Cultura del Grafiti en Taiwán',
    'map.markers.taiwanStreetArtGraffiti.desc':
      'Desde el grafiti subterráneo hasta los murales legales, cómo las paredes de la ciudad se convirtieron en el escenario creativo de los artistas taiwaneses',
    'map.markers.taiwanIncenseMakingCulture.title':
      'Cultura de la Fabricación de Incienso y Su Tierra Natal en Taiwán',
    'map.markers.taiwanIncenseMakingCulture.desc':
      'Desde la centenaria artesanía de fabricación de incienso de la comunidad Yunxiao en Chiayi hasta la industria del incienso extendida por todo Taiwán: un antiguo oficio sobre devoción, artesanía y perseverancia',
    'map.markers.taiwanHomophoneTaboos.title':
      'Cultura de Tabúes de Homófonos en Taiwán: ¿Por Qué el "Cuatro" Hace que la Sociedad Salte Pisos?',
    'map.markers.taiwanHomophoneTaboos.desc':
      'Desde hospitales sin cuarto piso hasta matrículas "8888" vendidas a precios astronómicos, la sensibilidad taiwanesa a los homófonos es posiblemente de clase mundial',
    'map.markers.hakkaCultureLanguage.title': 'Cultura y Lengua Hakka',
    'map.markers.hakkaCultureLanguage.desc':
      'Espíritu tenaz y Festival de Reparación del Cielo: la herencia cultural y el resurgimiento moderno del pueblo Hakka de Taiwán',
    'map.markers.ethnicGroupsTaiwan.title':
      'Grupos Étnicos (Hoklo, Hakka, Indígenas, Continental, Nuevos Inmigrantes)',
    'map.markers.ethnicGroupsTaiwan.desc':
      'La diversidad étnica de Taiwán no es solo resultado del desarrollo histórico, sino también clave para comprender la sociedad taiwanesa contemporánea. Esta coexistencia pluralista es tanto la fuente de la creatividad cultural de Taiwán como una base importante para el desarrollo político democrático. Cómo construir una identidad taiwanesa compartida respetando las características culturales de cada grupo étnico sigue siendo un desafío importante y continuo para la sociedad taiwanesa.',
    'map.markers.chinaSteel.title':
      'China Steel: El Ministro de Cabeza de Hierro y la Leyenda del Acero de los Diez Grandes Proyectos de Construcción',
    'map.markers.chinaSteel.desc':
      'Desde las astutas negociaciones de Chao Yao-Tung con Europa y América por tecnología, hasta la primera columna de humo blanco que se elevó en Xiaogang, Kaohsiung, China Steel pasó 50 años construyendo la columna vertebral de la industria pesada de Taiwán: la joya más exitosa de los Diez Grandes Proyectos de Construcción',
    'map.markers.taiwanCement.title':
      'Taiwan Cement: La Leyenda de la Transformación Verde de la Primera Empresa Cotizada',
    'map.markers.taiwanCement.desc':
      'La Bolsa de Valores de Taiwán nació para ella en 1962, con el código bursátil 1101 simbolizando el origen de las acciones taiwanesas. A través de tres generaciones de gestión de la familia Koo durante 76 años, Taiwan Cement fue testigo del milagro de la construcción de Taiwán con hornos de cemento, transformándose ahora en una empresa verde para enfrentar la era de la neutralidad de carbono',
    'map.markers.tsmc.title': 'Empresa Taiwanesa: TSMC',
    'map.markers.tsmc.desc':
      'Líder mundial en fundición de semiconductores, sosteniendo la línea de vida clave de la civilización digital humana',
    'map.markers.chimeiCorporation.title':
      'Chi Mei Corporation: El Reino del Acrílico de Hsu Wen-Long y Su Sueño de Museo',
    'map.markers.chimeiCorporation.desc':
      'Partiendo de una pequeña fábrica en Rende, Tainan, en 1960, Hsu Wen-Long pasó toda la vida construyendo el reino más grande de materiales ABS de Asia, y estableció el Museo Chi Mei para retribuir a la sociedad, demostrando que las empresas taiwanesas pueden equilibrar el éxito comercial con el cuidado humanístico',
    'map.markers.acer.title':
      'Grupo Acer - Pionero de la Revolución de la Industria de PC',
    'map.markers.acer.desc':
      'Un pionero de la computadora personal que comenzó en Taoyuan, Taiwán, creando el modelo de negocio "multimarca, multicanal" para convertirse en el motor de la transformación de la industria global de PC',
    'map.markers.giantBicycles.title': 'Empresa Taiwanesa: Giant Manufacturing',
    'map.markers.giantBicycles.desc':
      'De esclavo OEM abandonado a imperio oculto que establece estándares globales de tecnología de bicicletas',
    'map.markers.quantaComputer.title': 'Empresa Taiwanesa: Quanta Computer',
    'map.markers.quantaComputer.desc':
      'De incendio en fábrica a rey global de portátiles, ¿cómo construyó Barry Lam un nuevo imperio para la era de la IA?',
    'map.markers.aseGroup.title': 'Empresa Taiwanesa: ASE Group',
    'map.markers.aseGroup.desc':
      'La empresa de ensamblaje y prueba de semiconductores más grande del mundo: ¿por qué un jefe de empresa de construcción cambió a los semiconductores?',
    'map.markers.esunFinancialHolding.title':
      'Empresa Taiwanesa: E.SUN Financial Holding',
    'map.markers.esunFinancialHolding.desc':
      'De banco especializado en tarjetas de crédito a pionero en finanzas digitales, la historia de superación del CEO más joven de una empresa de holding financiero a los 43 años',
    'map.markers.changChunPetrochemical.title':
      'Empresa Taiwanesa: Chang Chun Petrochemical',
    'map.markers.changChunPetrochemical.desc':
      'De una pequeña fábrica en Tainan en 1949 a gigante químico global, la historia del campeón oculto de "sin OPI, sin préstamos"',
    'map.markers.formosaPlasticsGroup.title':
      'Empresa Taiwanesa: Evergreen Marine',
    'map.markers.formosaPlasticsGroup.desc':
      'De un solo barco usado a imperio naviero global, la leyenda del océano azul de Chang Yung-fa',
    'map.markers.taipeiFubon.title':
      'Economía de Nocturnmercados: Un Milagro Comercial Sin Marcas',
    'map.markers.taipeiFubon.desc':
      'Explora cómo los nocturnmercados de Taiwán crean un milagro económico valorado en casi 400 mil millones de TWD anuales sin marcas, decoración ni ubicaciones fijas',
    'map.markers.taiwan7Eleven.title': 'Industria del Café de Taiwán',
    'map.markers.taiwan7Eleven.desc':
      'Desde los orígenes de cultivo en el período colonial japonés hasta el campeonato mundial de Simple Kaffa, un siglo de evolución del café taiwanés',
    'map.markers.taiwanHighSpeedRail.title':
      'Mapa de Delicias Locales de Taiwán',
    'map.markers.taiwanHighSpeedRail.desc':
      'Desde los rollos de pastel de arroz de Miaokou en Keelung hasta las manitas de cerdo de Wanluan en Pingtung, desde las albóndigas de carne de Hsinchu hasta las chirimoyas de Taitung, cada ciudad tiene su ADN de sabor único. Sigue los pasos locales para explorar las delicias locales más representativas de los 22 condados y ciudades de Taiwán, saboreando la cultura popular más auténtica de la isla.',
    'map.markers.taiwanSemiconductorIndustry.title':
      'Platos Caseros de Taiwán: Recuerdos de Sabores que Desaparecen',
    'map.markers.taiwanSemiconductorIndustry.desc':
      'Desde el pollo con menta de Chiayi hasta la sopa de sobras, los platos signature de la abuela llevan recuerdos familiares pero se están perdiendo gradualmente en la marea de los tiempos cambiantes',
    'map.markers.taiwanBankingSystem.title':
      'Fusión Culinaria de Nuevos Inmigrantes en Taiwán',
    'map.markers.taiwanBankingSystem.desc':
      'Cuando el agridulce tailandés se encuentra con el salado-dulce taiwanés, cuando el pho vietnamita se encuentra con las delicias estofadas taiwanesas, cuando las especias indonesias abrazan los ingredientes locales: una revolución culinaria transfronteriza se está desarrollando silenciosamente en Taiwán. Los nuevos inmigrantes traen no solo la cocina de su tierra natal, sino también posibilidades frescas para enriquecer la cultura alimentaria de Taiwán.',
    'map.markers.taiwanSmes.title': 'Reino de las Frutas de Taiwán',
    'map.markers.taiwanSmes.desc':
      'Desde mangos y lichis hasta chirimoyas y cera-apples, la dulce leyenda de la diversidad de frutas tropicales y los avances en tecnología agrícola',
    'map.markers.youbikePublicBikeSystem.title': 'Cultura Mariscos de Taiwán',
    'map.markers.youbikePublicBikeSystem.desc':
      'Entrega fresca directa desde puertos pesqueros, cultura de restaurantes de mariscos, tortillas de ostras y otras delicias marítimas que muestran las características insulares de Taiwán rodeado de océano y ricas tradiciones culinarias de mariscos',
    'map.markers.taiwanFoodBeverageIndustry.title':
      'Michelin y Alta Cocina de Taiwán',
    'map.markers.taiwanFoodBeverageIndustry.desc':
      'En 2018, la cubierta roja de la Guía Michelin llevó por primera vez la palabra "TAIPEI", marcando la entrada oficial de la industria de alimentos y bebidas de Taiwán en el sistema de calificación internacional. Desde puestos callejeros hasta restaurantes con estrellas Michelin, desde comida popular hasta cocina refinada, la cultura culinaria de Taiwán muestra una cautivadora fusión de tradición e innovación en el escenario internacional.',
    'map.markers.taiwanAgriculturalReform.title': 'Cultura de Nocturnmercados',
    'map.markers.taiwanAgriculturalReform.desc':
      '164 nocturnmercados registrados, Tainan promedia un nocturnmercado por cada 38,000 personas: desde plazas de templos hasta atracciones turísticas internacionales',
    'map.markers.taiwanTeaIndustry.title': 'Cultura Culinaria Hakka',
    'map.markers.taiwanTeaIndustry.desc':
      'La rica y diversa cultura culinaria del pueblo Hakka, desde la fragancia suave del lei cha hasta la esencia silvestre de los dumplings de arroz con flor de jengibre, demostrando la sabiduría Hakka de austeridad y aprovechamiento de materiales locales',
    'map.markers.taiwanFishingIndustry.title': 'Sopa de Fideos con Carne',
    'map.markers.taiwanFishingIndustry.desc':
      'De la nostalgia de los inmigrantes del continente al plato nacional de Taiwán, la fusión cultural y la fragancia global de la sopa de fideos con carne',
    'map.markers.taiwanFruitIndustry.title': 'Cultura del Té',
    'map.markers.taiwanFruitIndustry.desc':
      'La evolución de la cultura del té en Taiwán, desde la ceremonia tradicional del té hasta el bubble tea moderno, mostrando las variedades únicas de té de la isla y su cultura de consumo',
    'map.markers.taiwanRiceVarieties.title':
      'En una Isla Temblorosa, Construyeron una Torre que Puede Volar',
    'map.markers.taiwanRiceVarieties.desc':
      'A solo 200 metros de una falla activa, los taiwaneses insistieron en construir el edificio más alto del mundo en el terreno más inestable—y luego un loco lo escaló durante 91 minutos con las manos desnudas.',
    'map.markers.nightMarketCulture.title':
      'Las Cinco Grandes Formaciones y Estructura Geográfica de Taiwán: Paisaje Insular de Montañas a Llanuras',
    'map.markers.nightMarketCulture.desc':
      'Explora la estructura geográfica única de Taiwán, desde la Cordillera Central hasta las llanuras occidentales, descubriendo la diversidad del terreno de esta isla',
    'map.markers.bubbleTeaGlobalPhenomenon.title':
      'Red de Transporte de Taiwán',
    'map.markers.bubbleTeaGlobalPhenomenon.desc':
      'Tren de alta velocidad, MRT, autopistas, aviación—tejiendo una red de transporte tridimensional para la movilidad de Taiwán',
    'map.markers.taiwanBeefNoodle.title':
      'Sistema de Escenarios Nacionales de Taiwán',
    'map.markers.taiwanBeefNoodle.desc':
      'Desde la Costa Noreste hasta Kenting, los 13 escenarios nacionales de Taiwán muestran ricos paisajes naturales y culturales',
    'map.markers.taiwanHotPotCulture.title':
      'Características Geográficas y Formación de la Isla de Taiwán',
    'map.markers.taiwanHotPotCulture.desc':
      'Explora las características geográficas insulares únicas de Taiwán, desde los movimientos tectónicos hasta la estructura del terreno, comprendiendo los misterios naturales de Formosa',
    'map.markers.taiwanFineDining.title':
      'Movimiento Tectónico y Actividad Sísmica de Taiwán',
    'map.markers.taiwanFineDining.desc':
      'Examinando las características geológicas de Taiwán en la unión de la Placa Euroasiática y la Placa del Mar de Filipinas, y las causas de la frecuente actividad sísmica',
    'map.markers.taiwanStreetFood.title':
      'Embalses y Gestión de Recursos Hídricos de Taiwán',
    'map.markers.taiwanStreetFood.desc':
      'Desde las crisis de escasez de agua hasta la sedimentación de embalses, los desafíos de recursos hídricos de Taiwán y el dilema del desequilibrio en la distribución norte-sur',
    'map.markers.taiwanVegetarianCulture.title':
      'Sistema Fluvial e Hidrología de Taiwán: Caudales Cortos y Rápidos y Cambios Estacionales en la Geografía Hidrológica',
    'map.markers.taiwanVegetarianCulture.desc':
      'Explora el sistema fluvial único de Taiwán, desde el Río Zhuoshui hasta el Río Gaoping, comprendiendo cómo el terreno insular moldea las características hidrológicas de Taiwán',
    'map.markers.taiwanCoffeeCulture.title':
      'Terreno Costero y Paisaje Marino de Taiwán',
    'map.markers.taiwanCoffeeCulture.desc':
      'Desde las costas de cabos y bahías del norte hasta las costas de falla del este, el rico y variado terreno costero de Taiwán demuestra la maestría del movimiento tectónico',
    'map.markers.taiwanSnackCulture.title': 'Paisaje Termal de Taiwán',
    'map.markers.taiwanSnackCulture.desc':
      'Beitou, Zhiben, Jiaoxi—la hermosa convergencia de la cultura termal y la ciencia geológica',
    'map.markers.taiwanSeafoodCulture.title':
      'Punto Caliente de Biodiversidad de Taiwán',
    'map.markers.taiwanSeafoodCulture.desc':
      'Una isla de 36.000 kilómetros cuadrados con 59.000 especies, una densidad 100 veces superior al promedio mundial',
    'map.markers.taiwanPineappleCake.title':
      'Paisaje Agrícola y Distribución Industrial de Taiwán',
    'map.markers.taiwanPineappleCake.desc':
      'Cambios en el paisaje agrícola de norte a sur, destacando la transformación de Taiwán de "Granero de Taiwán" a "Agricultura Refinada"',
    'map.markers.taiwanPorkRibSoup.title':
      'Desarrollo Urbano y División Urbano-Rural en Taiwán',
    'map.markers.taiwanPorkRibSoup.desc':
      'El desigual desarrollo urbano-rural en Taiwán bajo el marco de los seis municipios especiales, la transformación espacial del Taiwán agrícola al Taiwán urbano',
    'map.markers.taiwanOysterOmelette.title': 'Terreno y Geología',
    'map.markers.taiwanOysterOmelette.desc':
      'Una isla de 6 millones de años que alberga memorias antiguas de 200 millones de años—un milagro del cinturón montañoso más joven del mundo y la colisión tectónica más dramática',
    'map.markers.taiwanBreakfastCulture.title':
      'Características Urbanas y Cultura Regional',
    'map.markers.taiwanBreakfastCulture.desc':
      'Desde el carácter metropolitano internacional de Taipéi hasta el encanto de la antigua capital de Tainan, cómo las ciudades de Taiwán moldean identidades locales únicas',
    'map.markers.taiwanConvenienceStoreFood.title':
      'Islas Exteriores y Cultura Marina: Desde la Mayor Diquis de Piedra del Mundo hasta la Ley Ecológica de la Temporada del Pez Volador',
    'map.markers.taiwanConvenienceStoreFood.desc':
      'Menos de 600 diquis de piedra existen en el mundo, pero Penghu tiene 574. Un pueblo isleño especializado en la pesca del pez volador transformó tabúes en el sistema de gestión de recursos marinos más sofisticado',
    'map.markers.dutchSpanishColonialPeriod.title':
      'Incidente del 228 y Terror Blanco: Trauma y Memoria Bajo el Régimen Autoritario de Taiwán',
    'map.markers.dutchSpanishColonialPeriod.desc':
      'Desde el Incidente del 228 de 1947 hasta 38 años de ley marcial, Taiwán experimentó violencia estatal bajo el régimen autoritario, comenzando solo a confrontar el trauma histórico y buscar justicia transicional tras el levantamiento de la ley marcial.',
    'map.markers.zhengDynastyPeriod.title':
      'Crisis del Estrecho de Taiwán y Desarrollo de las Relaciones Transfronterizas',
    'map.markers.zhengDynastyPeriod.desc':
      'Revisando las tres grandes crisis del Estrecho de Taiwán y más de setenta años de desarrollo de las relaciones transfronterizas, comprendiendo el contexto histórico y los desafíos contemporáneos de la situación en el Estrecho de Taiwán',
    'map.markers.qingDynastyTaiwanHistory.title':
      'Historia del Comercio Marítimo de Taiwán',
    'map.markers.qingDynastyTaiwanHistory.desc':
      'Taiwán en la Era de la Exploración, la leyenda del ascenso y caída desde centro de comercio internacional hasta reino pirata',
    'map.markers.japaneseColonialRule.title':
      'Historia de las Aldeas Militares de Taiwán',
    'map.markers.japaneseColonialRule.desc':
      'Desde el ejército solitario de Birmania hasta los reinos de cercas de bambú, cómo una migración de 1,2 millones redefinió el concepto de "hogar"',
    'map.markers.februaryTwentyEightIncident.title':
      'Historia del Ferrocarril de Taiwán',
    'map.markers.februaryTwentyEightIncident.desc':
      'Desde el ferrocarril de Liu Ming-chuan en la Dinastía Qing hasta la línea principal en la era japonesa y el tren de alta velocidad, cómo los ferrocarriles moldearon el desarrollo urbano y la memoria cultural de Taiwán',
    'map.markers.martialLawPeriod.title':
      'Traslado del Gobierno del KMT a Taiwán y Reconstrucción de Posguerra',
    'map.markers.martialLawPeriod.desc':
      'Explorando el contexto histórico, proceso e impacto del traslado del gobierno del KMT a Taiwán en 1949, y la reconstrucción política, económica y social de Taiwán de posguerra',
    'map.markers.democratization.title': 'Período Colonial Japonés',
    'map.markers.democratization.desc':
      '1895-1945: Los 50 años de dominio japonés sobre Taiwán trajeron modernización integral y gestión institucionalizada, al tiempo que implementaron políticas de asimilación, influyendo profundamente en el desarrollo social de Taiwán',
    'map.markers.taiwanIndependenceMovement.title':
      'Período de la Dinastía Qing',
    'map.markers.taiwanIndependenceMovement.desc':
      '1683-1895: La Dinastía Qing gobernó Taiwán durante aproximadamente 212 años, desde una gobernanza pasiva hasta una construcción activa, estableciendo las bases de las divisiones administrativas modernas de Taiwán y la sociedad Han',
    'map.markers.taiwanChinaRelations.title': 'Período Holandés-Español-Zheng',
    'map.markers.taiwanChinaRelations.desc':
      'El primer dominio colonial sistemático de Taiwán, desde el establecimiento holandés de Fort Zeelandia hasta la apertura de Taiwán por Koxinga, sentando las bases para la inmigración Han y las instituciones políticas',
    'map.markers.taiwanUsRelations.title':
      'Cultura de las Tiendas de Conveniencia',
    'map.markers.taiwanUsRelations.desc':
      'Las tiendas de conveniencia de Taiwán con la mayor densidad del mundo—cómo se transformaron de tiendas minoristas en el sistema operativo de vida de toda una nación',
    'map.markers.taiwanInternationalStatus.title':
      'Sistema de Transporte de Taiwán',
    'map.markers.taiwanInternationalStatus.desc':
      'Tren de alta velocidad recorriendo de norte a sur en 90 minutos, MRT tejiendo densamente las arterias urbanas, scooters deslizándose por callejones',
    'map.markers.taiwanHistoricalFigures.title':
      'Cultura de las Tiendas de Conveniencia de Taiwán',
    'map.markers.taiwanHistoricalFigures.desc':
      'Reino con la mayor densidad de tiendas de conveniencia del mundo, la innovación localizada de 7-Eleven y FamilyMart redefiniendo el estilo de vida moderno',
    'map.markers.taiwanPoliticalFigures.title':
      'Parques de Taiwán y Ocio Cotidiano',
    'map.markers.taiwanPoliticalFigures.desc':
      'Desde el tai chi al amanecer hasta los paseos vespertinos—observación cultural de los parques de Taiwán como espacios sociales intergeneracionales',
    'map.markers.kuomintangHistory.title': 'Cultura del Café en Taiwán',
    'map.markers.kuomintangHistory.desc':
      'Tercer mayor densidad mundial de cafés independientes, desde los granos de Alishan hasta el trabajo de oficina en cafeterías—estudios del café isleño',
    'map.markers.democraticProgressivePartyHistory.title':
      'La Isla que Persigue Camiones de Basura: El Viaje de Taiwán de la Crisis de Basura al Milagro del Reciclaje',
    'map.markers.democraticProgressivePartyHistory.desc':
      'Un lugar con 400 vertederos casi llenos en los años 90, llamado "Isla Basura" por medios internacionales, usó la música de Beethoven para hacer que 23 millones de personas persiguieran camiones de basura diariamente—30 años después, su tasa de reciclaje supera a la de la mayoría de países europeos',
    'map.markers.taipeiHistory.title':
      'Historia del Desarrollo del MRT de Taiwán: Una Evolución Urbana Escrita en Sangre y Dinero',
    'map.markers.taipeiHistory.desc':
      '209 toneladas de vigas de acero cayendo del cielo cobraron 4 vidas, NT$1.64 mil millones en compensación, el negocio central del MRT de Taipéi aún pierde dinero—el verdadero costo detrás de los sistemas MRT de Taiwán',
    'map.markers.taiwanPrehistoricCulture.title':
      'Sistema Educativo de Taiwán: Experimento Isleño desde el Infierno del Examen de Ingreso Conjunto al Laberinto de la Opción Múltiple',
    'map.markers.taiwanPrehistoricCulture.desc':
      'Taiwán pasó 30 años intentando romper el sistema de examen de ingreso conjunto, sin embargo, la última prueba de materias duplicó las inscripciones en academias. ¿Cómo experimenta repetidamente una isla socialmente entre la presión académica y la equidad educativa?',
    'map.markers.taiwanIndigenousHistory.title':
      'Cultura de la Scooter en Taiwán',
    'map.markers.taiwanIndigenousHistory.desc':
      'Reino isleño con densidad de motocicletas líder a nivel mundial, evolución cultural desde herramienta de transporte hasta estilo de vida',
    'map.markers.taiwanMilitaryHistory.title':
      'Cultura de Arcades y Paisajes Urbanos de Taiwán',
    'map.markers.taiwanMilitaryHistory.desc':
      'Corredores de vida protegiendo del viento y la lluvia, recuerdos de las calles de Taiwán tejidos con scooters, vendedores ambulantes y calidez humana',
    'map.markers.taiwanWomenHistory.title': 'Vida nocturna y cultura KTV',
    'map.markers.taiwanWomenHistory.desc':
      'Desde las salas privadas de Cashbox hasta los restaurantes nocturnos, la vida nocturna ininterrumpida de 24 horas de la isla',
    'map.markers.taiwanEducationHistory.title':
      'Religión y creencias populares: Del manejo del miedo al imperio de la fe',
    'map.markers.taiwanEducationHistory.desc':
      'Taiwán tiene la mayor densidad de templos del mundo, pero ocupa el primer lugar mundial en libertad religiosa: esta contradicción esconde la sabiduría de supervivencia de los migrantes militares del siglo XVII',
    'map.markers.taiwanReligiousHistory.title': 'Cultura de aguas termales',
    'map.markers.taiwanReligiousHistory.desc':
      'Desde la rehabilitación militar hasta uno de los tres grandes manantiales de lodo del mundo: cómo Taiwán se convirtió accidentalmente en un reino termal',
    'map.markers.taiwanMediaHistory.title':
      'Tradiciones musicales indígenas de Taiwán',
    'map.markers.taiwanMediaHistory.desc':
      'Explora la rica cultura musical de los 16 pueblos indígenas de Taiwán, desde los cantos ancestrales hasta los instrumentos tradicionales, testimonio de miles de años de herencia cultural',
    'map.markers.badmintonChampions.title':
      'Fabricación de instrumentos musicales en Taiwán: De los saxofones de Houli a la fábrica musical global',
    'map.markers.badmintonChampions.desc':
      'Explora el recorrido del desarrollo de la fabricación de instrumentos musicales en Taiwán, desde el dominio global de los saxofones de Houli hasta el reino de la fabricación de guitarras bajo contrato, y la artesanía de precisión en la fabricación de cajas de música: cómo Taiwán evolucionó de la fabricación bajo contrato a sus propias marcas',
    'map.markers.baseballCulture.title':
      'Movimiento de la canción folclórica taiwanesa',
    'map.markers.baseballCulture.desc':
      'Desde «Canta nuestras propias canciones» hasta la transformación de toda la escena del Mandopop: la revolución cultural de los años 70 que perteneció a los jóvenes',
    'map.markers.taiwanBasketball.title':
      'Evolución de la escena musical independiente de Taiwán',
    'map.markers.taiwanBasketball.desc':
      'Desde bandas underground hasta música independiente, explora la trayectoria de treinta años y el significado cultural de la música alternativa en Taiwán',
    'map.markers.marathonRunning.title':
      'Música electrónica y cultura de fiestas en Taiwán: Del rave underground al escenario internacional',
    'map.markers.marathonRunning.desc':
      'Desde la cultura de fiestas rave de los años 90 hasta el festival de música electrónica Road to Ultra, cómo la música electrónica taiwanesa pasó de lo underground a lo mainstream, formando DJ internacionales y sellos electrónicos independientes',
    'map.markers.taiwanEsports.title':
      'Cultura de festivales musicales en Taiwán: De Spring Scream a los portadores florecientes de la cultura juvenil',
    'map.markers.taiwanEsports.desc':
      'Explora el desarrollo de los festivales musicales en Taiwán, desde Spring Scream y Ocean Music Festival hasta Megaport Festival, y cómo se convirtieron en incubadoras de bandas indie y plataformas centrales de expresión cultural juvenil',
    'map.markers.taiwanOlympics.title':
      'Escena musical independiente contemporánea de Taiwán',
    'map.markers.taiwanOlympics.desc':
      'Desde presentaciones underground hasta una matriz industrial, análisis del contexto de desarrollo y la influencia cultural del ecosistema musical independiente moderno de Taiwán',
    'map.markers.taipeiCycle.title':
      'Sabiduría ecológica indígena taiwanesa y conservación ambiental',
    'map.markers.taipeiCycle.desc':
      'Examinando el conocimiento ecológico tradicional acumulado durante miles de años por los pueblos indígenas de Taiwán y su importante valor y métodos prácticos en la conservación ambiental moderna',
    'map.markers.taiwanBetelNutCulture.title':
      'Montañas y cultura montañista de Taiwán',
    'map.markers.taiwanBetelNutCulture.desc':
      '268 montañas de más de 3.000 metros y la cultura Baiyue: el desarrollo del deporte montañista en Taiwán y los desafíos de conservación de montañas',
    'map.markers.taiwanElections.title': 'Ecosistema forestal de Taiwán',
    'map.markers.taiwanElections.desc':
      'Desde la costa subtropical hasta los bosques de coníferas alpinas, el rico mundo forestal de Taiwán en un desnivel vertical de 3.000 metros',
    'map.markers.taiwanLgbtCulture.title':
      'Cambio climático y transformación hacia cero emisiones netas en Taiwán',
    'map.markers.taiwanLgbtCulture.desc':
      'Taiwán enfrenta los impactos del cambio climático: desde fenómenos meteorológicos extremos frecuentes hasta la planificación de políticas de cero emisiones netas de carbono para 2050, explorando oportunidades y desafíos en el proceso de transición energética',
    'map.markers.taiwanMotorcycleCulture.title':
      'Conservación marina de Taiwán: ¿Por qué un sistema de 30 años no puede salvar el blanqueamiento de coral?',
    'map.markers.taiwanMotorcycleCulture.desc':
      'En 2020, las aguas de Taiwán experimentaron el mayor blanqueamiento de coral de la historia. Desde Xiaoliuqiu hasta el atolón de Dongsha, incluso los corales en áreas protegidas murieron por las altas temperaturas. ¿Qué problema expone esto?',
    'map.markers.taipeiMrt.title':
      'Control de la contaminación marina y desafíos de conservación en Taiwán',
    'map.markers.taipeiMrt.desc':
      'Frente a los desechos marinos, la sobrepesca y el cambio climático, explorando el estado de conservación marina, los desafíos y las soluciones innovadoras de Taiwán',
    'map.markers.kaohsiungMrt.title': 'Ecología marina de Taiwán',
    'map.markers.kaohsiungMrt.desc':
      'Aguas protegidas por los tabúes del pueblo Tao ahora se blanquean bajo altas temperaturas y ruido submarino: cuando milenios de sabiduría ecológica se encuentran con la crisis marina moderna',
    'map.markers.taichungMrt.title':
      'Ecología marina y conservación de arrecifes de coral en Taiwán',
    'map.markers.taichungMrt.desc':
      'Rodeada de mar, Taiwán posee una rica ecología marina: desde la crisis del blanqueamiento de coral hasta la conservación de cetáceos, examinando la efectividad de protección de los parques nacionales marinos y los desafíos futuros',
    'map.markers.taiwanTrainSystem.title':
      'Aguas termales y energía geotérmica de Taiwán',
    'map.markers.taiwanTrainSystem.desc':
      'Desde la fallida planta geotérmica de hace 30 años hasta la única Hokutolite del mundo: cómo una isla transforma el fuego subterráneo en sanación y electricidad verde',
    'map.markers.taiwanBusSystem.title':
      'Conservación del gato leopardo de Taiwán',
    'map.markers.taiwanBusSystem.desc':
      'El gato fantasma con menos de 500 ejemplares en Taiwán: mientras el último felino nativo camina hacia el borde de la extinción',
    'map.markers.taiwanInnovationEcosystem.title': 'Pangolín de Taiwán',
    'map.markers.taiwanInnovationEcosystem.desc':
      'El mamífero más traficado del mundo encontró un hogar seguro en Taiwán',
    'map.markers.taiwanMedicalSystem.title':
      'Ecosistema alpino y reliquias de la Edad de Hielo en Taiwán',
    'map.markers.taiwanMedicalSystem.desc':
      'Examinando el ecosistema alpino único de Taiwán por encima de los 3.000 metros, desde el ciprés de Taiwán y la rododendro de Yushan hasta la valiosa biodiversidad de especies relictas de la Edad de Hielo',
    'map.markers.taiwanEducationSystem.title': 'Oso negro de Taiwán',
    'map.markers.taiwanEducationSystem.desc':
      'La V blanca en su pecho es su firma: el último rey de las montañas de Taiwán y su batalla de conservación inconclusa',
    'map.markers.taiwanMusicIndustry.title': 'Parques nacionales',
    'map.markers.taiwanMusicIndustry.desc':
      '9 parques nacionales concentrados en 36.197 kilómetros cuadrados: el milagro de conservación con mayor densidad del mundo',
    'map.markers.mandarinPopMusic.title':
      'Cumbre de montañas y mares de la isla: Ecología y paisaje de los parques nacionales de Taiwán',
    'map.markers.mandarinPopMusic.desc':
      'Explora los ecosistemas únicos y el valor de conservación de los nueve parques nacionales de Taiwán, paisajes completos desde la costa subtropical hasta la línea de nieve alpina',
    'map.markers.taiwaneseIndieMusic.title': 'Especies endémicas',
    'map.markers.taiwaneseIndieMusic.desc':
      'Las ricas especies endémicas de Taiwán demuestran el milagro evolutivo de la biogeografía insular y la importancia de su conservación',
    'map.markers.taiwanRapHipHop.title': 'Diversidad ecológica',
    'map.markers.taiwanRapHipHop.desc':
      'Taiwán representa solo el 0,025 % del área global, pero alberga más de 50.000 especies, con una cobertura forestal del 60,71 % que la ubica en el puesto 33 a nivel mundial',
    'map.markers.taiwanElectronicMusic.title': 'Cetáceos de Taiwán',
    'map.markers.taiwanElectronicMusic.desc':
      'Hábitat de un tercio de las especies de cetáceos del mundo: desde la caza de ballenas del pasado hasta la observación de ballenas actual, ¿cómo se transformó Taiwán en un centro de investigación de ecología marina?',
    'map.markers.taiwanTraditionalMusic.title': 'Mayday',
    'map.markers.taiwanTraditionalMusic.desc':
      'Desde la Escuela Secundaria Afiliada a la Universidad Normal hasta el escenario mundial, la eterna juventud que define el espíritu del rock mandarín',
    'map.markers.taiwanFilmIndustry.title': 'Wu Bai',
    'map.markers.taiwanFilmIndustry.desc':
      'Tesoro nacional del rock taiwanés, sinónimo de música rock local, que estableció su estatus con obras como «Norwegian Wood»',
    'map.markers.newTaiwanCinema.title': 'Wu Pao-chun',
    'map.markers.newTaiwanCinema.desc':
      'Campeón del Concurso Mundial de Pan, asombró al mundo con el pan de rosa de lichi, del campo de Pingtung a maestro panadero de clase mundial',
    'map.markers.taiwanDocumentary.title': 'Annette Lu',
    'map.markers.taiwanDocumentary.desc':
      'De rebelde a vicepresidenta: la legendaria vida de la primera vicepresidenta del mundo de habla china',
    'map.markers.taiwanAnimationIndustry.title': 'Jimmy Liao',
    'map.markers.taiwanAnimationIndustry.desc':
      'Ilustrador-poeta que calienta el mundo con libros ilustrados, llevando los libros ilustrados taiwaneses al escenario internacional',
    'map.markers.taiwanTelevisionIndustry.title': 'Tai Tzu-ying',
    'map.markers.taiwanTelevisionIndustry.desc':
      'Poseedora del récord de 214 semanas como número uno mundial, la reina del bádminton taiwanés de Kaohsiung Qianzhen a la medalla olímpica de plata',
    'map.markers.taiwanOttPlatforms.title': 'Li Ang',
    'map.markers.taiwanOttPlatforms.desc':
      'Autora de «La esposa del carnicero» y «El jardín perdido», pionera de la literatura feminista taiwanesa',
    'map.markers.taiwanPodcastIndustry.title': 'Lee Chih-kai',
    'map.markers.taiwanPodcastIndustry.desc':
      'Del mercado Kai de «¡Salta, chicos!» a la medalla olímpica de plata, la vida de dieciséis años de volteretas del príncipe del caballo con arzones de Taiwán',
    'map.markers.taiwanPublishing.title': 'Yuan T. Lee',
    'map.markers.taiwanPublishing.desc':
      'Premio Nobel de Química 1986, pionero en nuevos campos de la dinámica química con la técnica de haces moleculares cruzados, primer premio Nobel científico de Taiwán',
    'map.markers.taiwanBookstoreCulture.title': 'Du Congming',
    'map.markers.taiwanBookstoreCulture.desc':
      'Primer doctor en medicina de Taiwán, padre de la medicina taiwanesa moderna',
    'map.markers.taiwanComicMangaIndustry.title': 'Jeremy Lin',
    'map.markers.taiwanComicMangaIndustry.desc':
      'De erudito de Harvard a campeón de la NBA, jugador taiwanés-estadounidense que desató la Linsanity global',
    'map.markers.taiwanGameIndustry.title': 'Kevin Lin',
    'map.markers.taiwanGameIndustry.desc':
      'De chico flaco rechazado por el equipo de atletismo a corredor polar que hizo historia cruzando el desierto del Sahara a pie',
    'map.markers.nationalPalaceMuseum.title': 'Lin Yi-hsiung',
    'map.markers.nationalPalaceMuseum.desc':
      'Pionero del movimiento democrático, víctima de la masacre de la residencia Lin, líder del movimiento antinuclear de las cuatro plantas',
    'map.markers.nationalParks.title': 'Edward Yang',
    'map.markers.nationalParks.desc':
      'Figura central del Nuevo Cine de Taiwán, Mejor Director en Cannes, poeta de la alienación urbana',
    'map.markers.taiwanGeography.title': 'Pai Hsien-yung',
    'map.markers.taiwanGeography.desc':
      'Autor de "Gentes de Taipéi", maestro de la literatura moderna y promotor del renacimiento de la ópera Kunqu',
    'map.markers.taiwanClimate.title': 'Crowd Lu',
    'map.markers.taiwanClimate.desc':
      'Cantautor y actor taiwanés, ganador de la Triple Corona (Golden Melody, Golden Bell, Golden Horse), conocido por su imagen cercana al pueblo y su estilo vocal único',
    'map.markers.taiwanEcosystem.title': 'Chuang Chih-yuan',
    'map.markers.taiwanEcosystem.desc':
      'Padrino del tenis de mesa, cuatro veces representante olímpico, héroe solitario entrenando en soledad',
    'map.markers.taiwanEndangeredSpecies.title': 'Tsai Ming-liang',
    'map.markers.taiwanEndangeredSpecies.desc':
      'Ganador del León de Oro en Venecia, chino-malayo, maestro de la estética del cine lento',
    'map.markers.taiwanMarineEcology.title': 'Hsu Wen-lung',
    'map.markers.taiwanMarineEcology.desc':
      'Fundador de Chi Mei Corporation, triple identidad de empresario, violinista y coleccionista de arte, creador del Museo Chi Mei',
    'map.markers.taiwanBirdwatching.title': 'Hsu Fang-yi',
    'map.markers.taiwanBirdwatching.desc':
      'De chica de Yilan a primera bailarina de la Martha Graham Dance Company, y luego de regreso a Taiwán fundó Fang-Yi Hsu & Bare Dance: ella cuenta las historias más poderosas de Taiwán con su cuerpo',
    'map.markers.taiwanHotSprings.title':
      'Lai Ching-te: De familia minera a la Oficina Presidencial como médico de salud pública',
    'map.markers.taiwanHotSprings.desc':
      '16.º presidente de Taiwán, primera figura política en la historia constitucional de la ROC en postularse como vicepresidente y ganar las elecciones exitosamente',
    'map.markers.taiwanIslands.title': 'Kuo Hsing-chun',
    'map.markers.taiwanIslands.desc':
      'Diosa del levantamiento de pesas de Taiwán, medallista de oro en los Juegos Olímpicos de Tokio 2021, poseedora de tres récords olímpicos en la categoría de 59 kg',
    'map.markers.taiwanMountains.title': 'Deng Yu-xian',
    'map.markers.taiwanMountains.desc':
      'Padre de las canciones populares de Taiwán, compositor de clásicos taiwaneses como "Esperando la brisa primaveral", "Flor de noche lluviosa" y "Melancolía a la luz de la luna"',
    'map.markers.taiwanRivers.title': 'Chung Li-ho',
    'map.markers.taiwanRivers.desc':
      'Autor de "La flor de hielo apagado", padre de la literatura taiwanesa, luchador literario que persistió en la creación a pesar de la pobreza y la enfermedad',
    'map.markers.taiwanCoastline.title': 'Chen Shu-chu',
    'map.markers.taiwanCoastline.desc':
      'Actos de bondad cotidianos de una vendedora de verduras en Taitung, dedicando toda una vida a interpretar lo que significa la verdadera riqueza',
    'map.markers.taiwanForests.title': 'Chen Shui-bian',
    'map.markers.taiwanForests.desc':
      '10.º y 11.º presidente, protagonista de la primera alternancia de partidos en 2000, figura importante en la democratización de Taiwán',
    'map.markers.taiwanNaturalDisasters.title': 'Ma Ying-jeou',
    'map.markers.taiwanNaturalDisasters.desc':
      '12.º y 13.º presidente, impulsor del deshielo en las relaciones entre ambos lados del estrecho, firmante del ECFA',
    'map.markers.taiwanEarthquakes.title': 'Huang Chun-ming',
    'map.markers.taiwanEarthquakes.desc':
      'Autor de "El gong y el tambor" y "Los días de mirar el mar", escritor representativo de la literatura nativista de Yilan',
    'map.markers.taiwanTyphoons.title':
      'Huang Zhen-nan: El Takeshi Kaneshiro de los bibliófilos y fuente viva de la historia de Taiwán',
    'map.markers.taiwanTyphoons.desc':
      'Huang Zhen-nan es investigador de la historia de Taiwán, bibliófilo y autor que comenzó con el nombre de usuario Sizumaru en PTT, gestionando la página "Living Water Old Book Room" para compartir la historia de Taiwán y la cultura de libros antiguos. Autor de obras como "La historia más entretenida de Taiwán", es apodado el Takeshi Kaneshiro de los bibliófilos. Partiendo de su familia académica en Chiayi Liujiao, padre e hijo dividen el trabajo norte-sur recolectando documentos, dedicados a hacer que la seria historia de Taiwán sea interesante y accesible.',
    'map.markers.sunflowerMovement.title':
      'Ética en zoológicos y animales de exhibición',
    'map.markers.sunflowerMovement.desc':
      'De elefantes en jaulas de hierro a las paredes de medusas de Xpark: Taiwán está redefiniendo la relación entre humanos y animales exhibidos',
    'map.markers.taiwanSocialMovements.title':
      'Justicia territorial indígena y territorios tradicionales de Taiwán',
    'map.markers.taiwanSocialMovements.desc':
      'Examinando el contexto histórico de los derechos territoriales indígenas de Taiwán, desarrollos legales, controversias sobre la demarcación de territorios tradicionales y logros del Comité de Justicia Transicional de los Pueblos Indígenas',
    'map.markers.taiwanMarriageEquality.title':
      'Matrimonio igualitario e igualdad de género en Taiwán',
    'map.markers.taiwanMarriageEquality.desc':
      'De prisionero bajo ley marcial a la primera ley de matrimonio homosexual de Asia: cómo la lucha de 30 años de un hombre reescribió la definición de amor en la isla',
    'map.markers.taiwanEnvironmentalJustice.title':
      'Justicia ambiental y controversias NIMBY en Taiwán',
    'map.markers.taiwanEnvironmentalJustice.desc':
      'Examinando la distribución desigual de cargas ambientales en Taiwán, desde incineradores y desechos nucleares hasta conflictos NIMBY de la industria petroquímica, analizando la desigualdad ambiental y problemas de justicia social',
    'map.markers.taiwanCommunityRiCulture.title':
      'Comunidad y cultura Li en Taiwán',
    'map.markers.taiwanCommunityRiCulture.desc':
      'De la práctica democrática de base a la innovación social en construcción comunitaria',
    'map.markers.taiwanLongTermCare.title':
      'Desarrollo del sistema de cuidados a largo plazo en Taiwán',
    'map.markers.taiwanLongTermCare.desc':
      'El sistema de cuidados a largo plazo más avanzado del mundo, pero al mismo tiempo albergando el mayor sistema de cuidados invisible',
    'map.markers.taiwanLaborMovement.title':
      'Protección ambiental y desarrollo sostenible',
    'map.markers.taiwanLaborMovement.desc':
      'De isla de chimeneas a Taiwán cero neto: el camino de despertar de 40 años del movimiento ambiental',
    'map.markers.taiwanHousingIssues.title':
      'Vivienda social y justicia habitacional',
    'map.markers.taiwanHousingIssues.desc':
      'Cómo Taiwán logra la justicia habitacional mediante políticas de vivienda social, dando a todos un lugar donde establecerse',
    'map.markers.taiwanHealthcareSystem.title':
      'Desarrollo de parques científicos',
    'map.markers.taiwanHealthcareSystem.desc':
      'Del Parque Científico de Hsinchu al Parque Científico del Sur de Taiwán, explorando el recorrido de desarrollo de los parques científicos de Taiwán y el posicionamiento único de los tres grandes parques',
    'map.markers.taiwanImmigration.title': 'Industria de semiconductores',
    'map.markers.taiwanImmigration.desc':
      'De la apuesta histórica de Morris Chang a la era de los 2 nanómetros: cómo TSMC convirtió a Taiwán en la línea de vida tecnológica global',
    'map.markers.taiwanReligiousDiversity.title':
      'Terreno costero y paisaje marino de Taiwán',
    'map.markers.taiwanReligiousDiversity.desc':
      'El cuello de la Cabeza de la Reina de Yehliu se adelgaza 0,2 cm por año y algún día se romperá: este es el destino y la belleza del terreno costero de Taiwán',
    'map.markers.taiwanBuddhismTaoism.title':
      'Ceremonia del té y estética de la vida en Taiwán',
    'map.markers.taiwanBuddhismTaoism.desc':
      'La noche que abrió Wistaria Tea House en 1981, miembros de la oposición y literatos se reunieron para tomar té: esto era más que una casa de té, era una base secreta del movimiento opositor',
    'map.markers.taiwanFolkReligion.title':
      'Elecciones y política de partidos en Taiwán',
    'map.markers.taiwanFolkReligion.desc':
      'De concejales locales en 1950 a la alternancia de partidos en 2000, vea cómo Taiwán usó las urnas para escribir un milagro de transformación democrática',
    'map.markers.taiwanChristianity.title':
      'Desarrollo urbano y brecha urbano-rural en Taiwán',
    'map.markers.taiwanChristianity.desc':
      '70 años de isla agrícola a isla urbana, luces y sombras del 70% de la población concentrada en seis municipios especiales: el próspero Taichung frente al cruento contraste del declive de Yunlin',
    'map.markers.taiwanIslamJudaism.title':
      'Características urbanas y cultura regional',
    'map.markers.taiwanIslamJudaism.desc':
      'De los 4,04 millones de Nuevo Taipéi a los 1,85 millones de Tainan, vea cómo los seis municipios especiales forjan sus respectivos caracteres urbanos mediante la transformación industrial',
    'map.markers.kaohsiungIncident.title': 'Democratización',
    'map.markers.kaohsiungIncident.desc':
      'El enfrentamiento policial-civil del 10 de diciembre de 1979 en las calles de Kaohsiung finalmente dio origen a la transición democrática de Taiwán, ¿pero a qué costo en juventud y libertad?',
    'map.markers.wangLeeOlympicGold.title':
      'Wang Chi-lin y Lee Yang (La pareja Lin-Yang)',
    'map.markers.wangLeeOlympicGold.desc':
      'De compañeros de secundaria a oro olímpico: "La pareja Lin-Yang" derrotó a China en sets directos en 34 minutos, escribiendo el primer oro olímpico en la historia del bádminton de Taiwán',
  },
} as const;
