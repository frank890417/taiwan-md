/**
 * i18n UI strings for all supported locales
 * Usage: import { t, getLocaleFromPath } from '../i18n/ui';
 */

export type Locale = 'zh-TW' | 'en' | 'es' | 'ja' | 'ko' | 'fr';

export const defaultLocale: Locale = 'zh-TW';

export const localeNames: Record<Locale, string> = {
  'zh-TW': '繁中',
  en: 'English',
  es: 'Español',
  ja: '日本語',
  ko: '한국어',
  fr: 'Français',
};

export const localeFlags: Record<Locale, string> = {
  'zh-TW': 'ZH',
  en: 'EN',
  es: 'ES',
  ja: 'JA',
  ko: 'KO',
  fr: 'FR',
};

const ui = {
  'zh-TW': {
    // Navbar
    'nav.home': '首頁',
    'nav.journey': '旅程路徑',
    'nav.map': '互動地圖',
    'nav.topics': '主題探索',
    'nav.stories': '故事',
    'nav.contribute': '貢獻',
    'nav.about': '關於',
    'nav.graph': '知識圖譜',
    'nav.resources': '資源',
    'nav.data': '數據',
    'nav.assets': 'SVG 素材',
    'nav.projects': '專案',
    'nav.search': '搜尋',
    'nav.language': '語言',

    // Hero
    'hero.title': '福爾摩沙等你探索',
    'hero.subtitle': '你的台灣私人地圖',
    'hero.description': '一步步發現真實的台灣',
    'hero.cta.journey': '開始你的旅程',
    'hero.cta.map': '開啟互動地圖',

    // Journey Section
    'journey.title': '你的台灣旅程',
    'journey.subtitle': '選擇一條路徑，開始探索',
    'journey.nature.title': '自然與地理',
    'journey.nature.desc': '從 3,952 公尺的高峰到珊瑚環礁，探索台灣壯麗的自然景觀',
    'journey.history.title': '歷史與人物',
    'journey.history.desc': '走過台灣四百年的故事，認識塑造這片土地的人們',
    'journey.culture.title': '文化與傳統',
    'journey.culture.desc': '深入節慶、原住民藝術與多元文化的融合',
    'journey.flavors.title': '風味與生活',
    'journey.flavors.desc': '品味夜市、茶文化與日常生活的節奏',
    'journey.begin': '開始探索 →',
    'journey.readtime': '分鐘閱讀',

    // Categories
    'categories.title': '知識分類',
    'categories.subtitle': '台灣知識的十二個面向',
    'categories.articles': '篇',
    'categories.explore': '探索 →',
    'cat.history': '歷史', 'cat.geography': '地理', 'cat.culture': '文化',
    'cat.food': '美食', 'cat.art': '藝術', 'cat.music': '音樂',
    'cat.technology': '科技', 'cat.nature': '自然', 'cat.people': '人物',
    'cat.society': '社會', 'cat.economy': '經濟', 'cat.lifestyle': '生活',
    'cat.history.desc': '從史前時代到現代，台灣歷史的完整脈絡',
    'cat.geography.desc': '台灣的自然環境、地形特色與區域發展',
    'cat.culture.desc': '多元族群文化的融合與在地特色',
    'cat.food.desc': '從夜市小吃到精緻料理的美食文化',
    'cat.art.desc': '傳統工藝到當代藝術的創作能量',
    'cat.music.desc': '從原住民音樂到流行音樂的聲音風景',
    'cat.technology.desc': '科技島的創新發展與數位轉型',
    'cat.nature.desc': '豐富的生態環境與環保議題',
    'cat.people.desc': '影響台灣發展的重要人物與故事',
    'cat.society.desc': '社會變遷與當代議題的深度探討',
    'cat.economy.desc': '經濟奇蹟的成因與轉型挑戰',
    'cat.lifestyle.desc': '台灣人的生活方式與價值觀',

    // Footer
    'footer.explore': '探索',
    'footer.project': '專案',
    'footer.connect': '聯繫',
    'footer.desc': '開源、AI-friendly 的台灣知識庫',
    'footer.built': '用心在台灣製作',
    'footer.support': '支持我們',

    // Search
    'search.placeholder': '搜尋文章...',
    'search.hint': '輸入關鍵字搜尋所有文章',
    'search.noResults': '找不到相關文章',
    'search.more': '還有 {n} 篇',

    // Article
    'article.tts.play': '朗讀文章',
    'article.tts.pause': '暫停',
    'article.tts.stop': '停止',
    'article.backToJourney': '返回旅程',
    'article.readingTime': '{n} 分鐘閱讀',
    'article.share': '分享',
    'article.editOnGithub': '在 GitHub 編輯',
    'article.toc': '目錄',
    'article.related': '相關文章',

    // Welcome Modal
    'welcome.title': '歡迎來到 Taiwan.md',
    'welcome.slide1': '這是一個開源的台灣知識庫',
    'welcome.slide2': '選擇你的旅程路徑',
    'welcome.slide3': '用互動地圖探索台灣',
    'welcome.slide4': '選擇你的語言',
    'welcome.skip': '跳過',
    'welcome.next': '下一步',
    'welcome.start': '開始探索',

    // Side Tools
    'tools.currency': '匯率換算',
    'tools.visa': '簽證查詢',
    'tools.tips': '旅遊小貼士',
    'tools.backToJourney': '返回旅程',
  },

  en: {
    'nav.home': 'Home',
    'nav.journey': 'Journey Paths',
    'nav.map': 'Interactive Map',
    'nav.topics': 'Topics',
    'nav.stories': 'Stories',
    'nav.contribute': 'Contribute',
    'nav.about': 'About',
    'nav.graph': 'Knowledge Graph',
    'nav.resources': 'Resources',
    'nav.data': 'Data',
    'nav.assets': 'SVG Assets',
    'nav.projects': 'Projects',
    'nav.search': 'Search',
    'nav.language': 'Language',

    'hero.title': 'Formosa Awaits',
    'hero.subtitle': 'Your Personal Map to Taiwan',
    'hero.description': 'Discover the real Taiwan step by step',
    'hero.cta.journey': 'Start Your Journey',
    'hero.cta.map': 'Open Interactive Map',

    'journey.title': 'Your Taiwan Journey',
    'journey.subtitle': 'Choose a path and start exploring',
    'journey.nature.title': 'Nature & Geography',
    'journey.nature.desc': 'Explore Taiwan\'s dramatic landscapes from 3,952m peaks to coral atolls',
    'journey.history.title': 'History & People',
    'journey.history.desc': 'Walk through 400 years of Taiwan\'s story and meet its remarkable people',
    'journey.culture.title': 'Culture & Traditions',
    'journey.culture.desc': 'Dive into festivals, indigenous arts, and the fusion of traditions',
    'journey.flavors.title': 'Flavors & Lifestyle',
    'journey.flavors.desc': 'Taste night markets, tea culture, and the rhythms of daily life',
    'journey.begin': 'Begin Path →',
    'journey.readtime': 'min read',

    'categories.title': 'Knowledge Topics',
    'categories.subtitle': 'Twelve dimensions of Taiwan knowledge',
    'categories.articles': 'articles',
    'categories.explore': 'Explore →',
    'cat.history': 'History', 'cat.geography': 'Geography', 'cat.culture': 'Culture',
    'cat.food': 'Food', 'cat.art': 'Art', 'cat.music': 'Music',
    'cat.technology': 'Technology', 'cat.nature': 'Nature', 'cat.people': 'People',
    'cat.society': 'Society', 'cat.economy': 'Economy', 'cat.lifestyle': 'Lifestyle',
    'cat.history.desc': 'A complete timeline of Taiwan from prehistory to the modern era',
    'cat.geography.desc': 'Taiwan\'s natural environment, terrain, and regional development',
    'cat.culture.desc': 'The fusion of diverse ethnic cultures and local traditions',
    'cat.food.desc': 'From night market snacks to fine dining and tea culture',
    'cat.art.desc': 'Traditional crafts to contemporary art and creative energy',
    'cat.music.desc': 'The soundscape from indigenous songs to Mandopop',
    'cat.technology.desc': 'Innovation and digital transformation on the tech island',
    'cat.nature.desc': 'Rich ecosystems, national parks, and conservation',
    'cat.people.desc': 'Remarkable individuals who shaped Taiwan\'s development',
    'cat.society.desc': 'Social change, civil movements, and contemporary issues',
    'cat.economy.desc': 'The economic miracle and challenges of transformation',
    'cat.lifestyle.desc': 'The way of life and values of Taiwanese people',

    'footer.explore': 'Explore',
    'footer.project': 'Project',
    'footer.connect': 'Connect',
    'footer.desc': 'Open-source, AI-friendly knowledge base about Taiwan',
    'footer.built': 'Crafted in Taiwan',
    'footer.support': 'Support us',

    'search.placeholder': 'Search articles...',
    'search.hint': 'Type to search across all articles',
    'search.noResults': 'No results found',
    'search.more': '...and {n} more',

    'article.tts.play': 'Read Aloud',
    'article.tts.pause': 'Pause',
    'article.tts.stop': 'Stop',
    'article.backToJourney': 'Back to Journey',
    'article.readingTime': '{n} min read',
    'article.share': 'Share',
    'article.editOnGithub': 'Edit on GitHub',
    'article.toc': 'Table of Contents',
    'article.related': 'Related Articles',

    'welcome.title': 'Welcome to Taiwan.md',
    'welcome.slide1': 'An open-source Taiwan knowledge base',
    'welcome.slide2': 'Choose your journey path',
    'welcome.slide3': 'Explore Taiwan with the interactive map',
    'welcome.slide4': 'Pick your language',
    'welcome.skip': 'Skip',
    'welcome.next': 'Next',
    'welcome.start': 'Start Exploring',

    'tools.currency': 'Currency Converter',
    'tools.visa': 'Visa Quick-Check',
    'tools.tips': 'Travel Tips',
    'tools.backToJourney': 'Back to Journey',
  },

  es: {
    'nav.home': 'Inicio',
    'nav.journey': 'Rutas de Viaje',
    'nav.map': 'Mapa Interactivo',
    'nav.topics': 'Temas',
    'nav.stories': 'Historias',
    'nav.contribute': 'Contribuir',
    'nav.about': 'Acerca de',
    'nav.graph': 'Grafo de Conocimiento',
    'nav.resources': 'Recursos',
    'nav.data': 'Datos',
    'nav.assets': 'Recursos SVG',
    'nav.projects': 'Proyectos',
    'nav.search': 'Buscar',
    'nav.language': 'Idioma',

    'hero.title': 'Formosa Te Espera',
    'hero.subtitle': 'Tu Mapa Personal de Taiwán',
    'hero.description': 'Descubre el verdadero Taiwán paso a paso',
    'hero.cta.journey': 'Comienza Tu Viaje',
    'hero.cta.map': 'Abrir Mapa Interactivo',

    'journey.title': 'Tu Viaje por Taiwán',
    'journey.subtitle': 'Elige un camino y empieza a explorar',
    'journey.nature.title': 'Naturaleza y Geografía',
    'journey.nature.desc': 'Explora los paisajes dramáticos de Taiwán, desde picos de 3.952 m hasta atolones de coral',
    'journey.history.title': 'Historia y Personas',
    'journey.history.desc': 'Recorre 400 años de historia taiwanesa y conoce a sus personas extraordinarias',
    'journey.culture.title': 'Cultura y Tradiciones',
    'journey.culture.desc': 'Sumérgete en festivales, artes indígenas y la fusión de tradiciones',
    'journey.flavors.title': 'Sabores y Estilo de Vida',
    'journey.flavors.desc': 'Saborea mercados nocturnos, cultura del té y los ritmos de la vida cotidiana',
    'journey.begin': 'Comenzar Ruta →',
    'journey.readtime': 'min de lectura',

    'categories.title': 'Temas de Conocimiento',
    'categories.subtitle': 'Doce dimensiones del conocimiento sobre Taiwán',
    'categories.articles': 'artículos',
    'categories.explore': 'Explorar →',
    'cat.history': 'Historia', 'cat.geography': 'Geografía', 'cat.culture': 'Cultura',
    'cat.food': 'Gastronomía', 'cat.art': 'Arte', 'cat.music': 'Música',
    'cat.technology': 'Tecnología', 'cat.nature': 'Naturaleza', 'cat.people': 'Personas',
    'cat.society': 'Sociedad', 'cat.economy': 'Economía', 'cat.lifestyle': 'Estilo de Vida',
    'cat.history.desc': 'Una línea temporal completa de Taiwán desde la prehistoria hasta la era moderna',
    'cat.geography.desc': 'El entorno natural, terreno y desarrollo regional de Taiwán',
    'cat.culture.desc': 'La fusión de diversas culturas étnicas y tradiciones locales',
    'cat.food.desc': 'Desde bocadillos del mercado nocturno hasta alta cocina y cultura del té',
    'cat.art.desc': 'Artesanía tradicional y arte contemporáneo con energía creativa',
    'cat.music.desc': 'El paisaje sonoro desde canciones indígenas hasta Mandopop',
    'cat.technology.desc': 'Innovación y transformación digital en la isla tecnológica',
    'cat.nature.desc': 'Ecosistemas ricos, parques nacionales y conservación',
    'cat.people.desc': 'Personas extraordinarias que dieron forma al desarrollo de Taiwán',
    'cat.society.desc': 'Cambio social, movimientos civiles y temas contemporáneos',
    'cat.economy.desc': 'El milagro económico y los desafíos de la transformación',
    'cat.lifestyle.desc': 'El modo de vida y valores del pueblo taiwanés',

    'footer.explore': 'Explorar',
    'footer.project': 'Proyecto',
    'footer.connect': 'Contacto',
    'footer.desc': 'Base de conocimiento de código abierto sobre Taiwán',
    'footer.built': 'Hecho con amor en Taiwán',
    'footer.support': 'Apóyanos',

    'search.placeholder': 'Buscar artículos...',
    'search.hint': 'Escribe para buscar en todos los artículos',
    'search.noResults': 'No se encontraron resultados',
    'search.more': '...y {n} más',

    'article.tts.play': 'Leer en Voz Alta',
    'article.tts.pause': 'Pausar',
    'article.tts.stop': 'Detener',
    'article.backToJourney': 'Volver al Viaje',
    'article.readingTime': '{n} min de lectura',
    'article.share': 'Compartir',
    'article.editOnGithub': 'Editar en GitHub',
    'article.toc': 'Índice',
    'article.related': 'Artículos Relacionados',

    'welcome.title': 'Bienvenido a Taiwan.md',
    'welcome.slide1': 'Una base de conocimiento de código abierto sobre Taiwán',
    'welcome.slide2': 'Elige tu ruta de viaje',
    'welcome.slide3': 'Explora Taiwán con el mapa interactivo',
    'welcome.slide4': 'Elige tu idioma',
    'welcome.skip': 'Omitir',
    'welcome.next': 'Siguiente',
    'welcome.start': 'Empezar a Explorar',

    'tools.currency': 'Conversor de Moneda',
    'tools.visa': 'Consulta de Visa',
    'tools.tips': 'Consejos de Viaje',
    'tools.backToJourney': 'Volver al Viaje',
  },

  ja: {} as Record<string, string>,
  ko: {} as Record<string, string>,
  fr: {} as Record<string, string>,
} as const;

type UIStrings = typeof ui;
type UIKey = keyof UIStrings['en'];

/**
 * Get a translated string for the given locale and key.
 * Falls back to English, then zh-TW.
 */
export function t(key: string, lang: Locale = defaultLocale): string {
  const localeStrings = ui[lang] as Record<string, string> | undefined;
  if (localeStrings && key in localeStrings) {
    return localeStrings[key];
  }
  // Fallback chain: en → zh-TW
  if (lang !== 'en' && key in ui.en) {
    return ui.en[key as UIKey];
  }
  if (key in ui['zh-TW']) {
    return ui['zh-TW'][key as keyof typeof ui['zh-TW']];
  }
  return key;
}

/**
 * Get locale from URL pathname
 */
export function getLocaleFromPath(path: string): Locale {
  if (path.startsWith('/en')) return 'en';
  if (path.startsWith('/es')) return 'es';
  if (path.startsWith('/ja')) return 'ja';
  if (path.startsWith('/ko')) return 'ko';
  if (path.startsWith('/fr')) return 'fr';
  return 'zh-TW';
}

/**
 * Get the language prefix for URLs
 */
export function getLangPrefix(lang: Locale): string {
  if (lang === 'zh-TW') return '';
  return `/${lang}`;
}

/**
 * Get available locales with content
 */
export function getActiveLocales(): Locale[] {
  return ['zh-TW', 'en', 'es'];
}
