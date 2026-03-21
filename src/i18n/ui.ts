import type { Lang } from '../types';
import { homeUI } from './home';
import { aboutUI } from './about';
import { dataUI } from './data';

export type Locale = Lang;

export const languages: Record<Lang, string> = {
  en: 'English',
  'zh-TW': '中文',
  es: 'Español',
};

export const localeNames: Record<Lang, string> = languages;

export const localeFlags: Record<Lang, string> = {
  'zh-TW': '🇹🇼',
  en: '🇺🇸',
  es: '🇪🇸',
};

export const defaultLang: Lang = 'zh-TW';
export const showDefaultLang = false;

export const ui = {
  en: {
    ...homeUI.en,
    ...aboutUI.en,
    ...dataUI.en,
    'nav.aria-home': 'Taiwan.md Home',
    'nav.aria-img-label': 'Taiwan.md logo',
    'nav.aria-toggle-menu': 'Toggle navigation menu',
    'nav.aria-main-navigation': 'Main navigation',
    'nav.aria-mobile-navigation': 'Mobile navigation',
    'nav.aria-search': 'Search',
    'nav.aria-language-selection': 'Language selection',
    'nav.aria-switch-to-zh-tw': 'Switch to Traditional Chinese',
    'nav.aria-switch-to-en': 'Switch to English',
    'hero.title': 'Know Taiwan Deeply',
    'hero.subtitle': 'Curating the Deep Narratives of an Island',
    'hero.description': 'Open-source, AI-friendly knowledge base — 660+ pages on history, culture, geography and more.',
    'hero.cta.journey': 'Start the Journey',
    'hero.cta.map': 'Geographic Taiwan',
    'nav.home': 'Home',
    'nav.journey': 'Journey',
    'nav.changelog': 'Changelog',
    'nav.topics': 'Topics',
    'nav.random': 'Random Discovery',
    'nav.search': 'Search',
    'nav.language': 'Language',
    'nav.about': 'About',
    'nav.twitter': 'Twitter',
    'nav.explore': '🕸️ Knowledge Graph',
    'nav.graph': '🕸️ Graph',
    'nav.graph-view': 'Knowledge Graph',
    'nav.map': '📍 Geographic Taiwan',
    'nav.contribute': '✋ Contribute',
    'nav.resources': '🔗 Resources',
    'nav.data': '📊 Data Taiwan',
    'nav.assets': 'SVG Assets',
    'nav.projects': 'Projects',
    'nav.language-switch': 'Language',
    'nav.search-modal.input-placeholder': 'Search articles',
    'nav.search-modal.type-to-search': 'Type to search across all articles',
    'footer.explore': 'Explore',
    'footer.history': 'History',
    'footer.culture': 'Culture',
    'footer.food': 'Food',
    'footer.technology': 'Technology',
    'footer.nature': 'Nature',
    'footer.society': 'Society',
    'footer.project': 'Project',
    'footer.about': 'About',
    'footer.graph': 'Knowledge Graph',
    'footer.contribute': 'Contribute Guide',
    'footer.changelog': 'Update History',
    'footer.contact': 'Connect',
    'footer.report': 'Report Issue',
    'footer.discuss': 'Discussions',
    'footer.desc': 'Open-source, AI-friendly knowledge base about Taiwan',
    'footer.support-us': 'Support us',
    'footer.font-sponsor-prefix': 'Web fonts sponsored by',
    'footer.font-sponsor-suffix': ' ',
    'categoryConfig.history': 'History',
    'categoryConfig.geography': 'Geography',
    'categoryConfig.culture': 'Culture',
    'categoryConfig.food': 'Food',
    'categoryConfig.art': 'Art',
    'categoryConfig.music': 'Music',
    'categoryConfig.technology': 'Technology',
    'categoryConfig.nature': 'Nature',
    'categoryConfig.people': 'People',
    'categoryConfig.society': 'Society',
    'categoryConfig.economy': 'Economy',
    'categoryConfig.lifestyle': 'Lifestyle',
    'categoryConfig.history.description':
      "The complete timeline of Taiwan's history from prehistoric times to the present",
    'categoryConfig.geography.description':
      "Taiwan's natural environment, topographic features, and regional development",
    'categoryConfig.culture.description':
      'The fusion of diverse ethnic cultures and local characteristics',
    'categoryConfig.food.description':
      'Culinary culture from night market snacks to fine dining',
    'categoryConfig.art.description':
      'Creative energy from traditional crafts to contemporary art',
    'categoryConfig.music.description':
      'The soundscape from indigenous music to popular music',
    'categoryConfig.technology.description':
      'Innovation and digital transformation of the tech island',
    'categoryConfig.nature.description':
      'Rich ecosystems and environmental issues',
    'categoryConfig.people.description':
      "Important figures and stories that shaped Taiwan's development",
    'categoryConfig.society.description':
      'In-depth exploration of social changes and contemporary issues',
    'categoryConfig.economy.description':
      'The origins of the economic miracle and transformation challenges',
    'categoryConfig.lifestyle.description':
      'Lifestyle and values of the Taiwanese people',
    'CategoryGrid.article': 'article',
    'CategoryGrid.articles': 'articles',
    'CategoryGrid.explore': 'explore',
    'CategoryGrid.aria-section': 'Taiwan knowledge categories',
    'CategoryGrid.aria-explore': 'Explore',
    'CategoryGrid.aria-explore-suffix': ' ',
    'CategoryGrid.alt-category-image-suffix': 'category image',
  },
  'zh-TW': {
    ...homeUI['zh-TW'],
    ...aboutUI['zh-TW'],
    ...dataUI['zh-TW'],
    'nav.aria-home': 'Taiwan.md 首頁',
    'nav.aria-img-label': 'Taiwan.md 標誌圖示',
    'nav.aria-toggle-menu': '開啟/關閉導航選單',
    'nav.aria-main-navigation': '主要導航',
    'nav.aria-mobile-navigation': '行動裝置導航',
    'nav.aria-search': '搜尋',
    'nav.aria-language-selection': '語言選擇',
    'nav.aria-switch-to-zh-tw': '切換至繁體中文',
    'nav.aria-switch-to-en': '切換至英文',
    'hero.title': '深度認識台灣',
    'hero.subtitle': '策展島嶼深層敘事',
    'hero.description': '開源 AI-friendly 知識庫 — 660+ 頁深度內容，涵蓋歷史、文化、地理等 12 大主題。',
    'hero.cta.journey': '開始旅程',
    'hero.cta.map': '地理台灣',
    'nav.home': '首頁',
    'nav.journey': '知識旅程',
    'nav.changelog': '更新紀錄',
    'nav.topics': '主題',
    'nav.random': '隨機發現',
    'nav.search': '搜尋',
    'nav.language': '語言',
    'nav.about': '關於',
    'nav.twitter': '推特',
    'nav.explore': '🕸️ 知識圖譜',
    'nav.graph': '🕸️ 圖譜',
    'nav.graph-view': '知識圖譜',
    'nav.map': '📍 地理台灣',
    'nav.contribute': '✋ 參與專案',
    'nav.resources': '🔗 延伸資源',
    'nav.data': '📊 數據台灣',
    'nav.assets': 'SVG 素材',
    'nav.projects': '專案',
    'nav.language-switch': '語言 / Language',
    'nav.search-modal.input-placeholder': '搜尋文章',
    'nav.search-modal.type-to-search': '輸入關鍵字搜尋所有文章',
    'footer.explore': '探索',
    'footer.history': '歷史',
    'footer.culture': '文化',
    'footer.food': '美食',
    'footer.technology': '科技',
    'footer.nature': '自然',
    'footer.society': '社會',
    'footer.project': '專案',
    'footer.about': '關於',
    'footer.graph': '知識圖譜',
    'footer.contribute': '貢獻指南',
    'footer.changelog': '更新紀錄',
    'footer.contact': '聯繫',
    'footer.report': '回報問題',
    'footer.discuss': '討論區',
    'footer.desc': '開源、AI-friendly 的台灣知識庫',
    'footer.support-us': '支持我們',
    'footer.font-sponsor-prefix': '字體由',
    'footer.font-sponsor-suffix': '提供',
    'categoryConfig.history': '歷史',
    'categoryConfig.geography': '地理',
    'categoryConfig.culture': '文化',
    'categoryConfig.food': '美食',
    'categoryConfig.art': '藝術',
    'categoryConfig.music': '音樂',
    'categoryConfig.technology': '科技',
    'categoryConfig.nature': '自然',
    'categoryConfig.people': '人物',
    'categoryConfig.society': '社會',
    'categoryConfig.economy': '經濟',
    'categoryConfig.lifestyle': '生活',
    'categoryConfig.history.description':
      '從史前時代到現代，台灣歷史的完整脈絡',
    'categoryConfig.geography.description':
      '台灣的自然環境、地形特色與區域發展',
    'categoryConfig.culture.description': '多元族群文化的融合與在地特色',
    'categoryConfig.food.description': '從夜市小吃到精緻料理的美食文化',
    'categoryConfig.art.description': '傳統工藝到當代藝術的創作能量',
    'categoryConfig.music.description': '從原住民音樂到流行音樂的聲音風景',
    'categoryConfig.technology.description': '科技島的創新發展與數位轉型',
    'categoryConfig.nature.description': '豐富的生態環境與環保議題',
    'categoryConfig.people.description': '影響台灣發展的重要人物與故事',
    'categoryConfig.society.description': '社會變遷與當代議題的深度探討',
    'categoryConfig.economy.description': '經濟奇蹟的成因與轉型挑戰',
    'categoryConfig.lifestyle.description': '台灣人的生活方式與價值觀',
    'CategoryGrid.article': '篇',
    'CategoryGrid.articles': '篇',
    'CategoryGrid.explore': '探索',
    'CategoryGrid.aria-section': '台灣知識分類',
    'CategoryGrid.aria-explore': '探索',
    'CategoryGrid.aria-explore-suffix': '主題',
    'CategoryGrid.alt-category-image-suffix': '主題相關圖片',
  },
  es: {
    'hero.title': 'Conoce Taiwán a Fondo',
    'hero.subtitle': 'Curación de las Narrativas Profundas de una Isla',
    'hero.description': 'Base de conocimiento de código abierto — 660+ páginas sobre historia, cultura, geografía y más.',
    'hero.cta.journey': 'Comenzar el Recorrido',
    'hero.cta.map': 'Taiwán Geográfico',
    'nav.home': 'Inicio',
    'nav.journey': 'Recorrido',
    'nav.changelog': 'Registro de Cambios',
    'nav.topics': 'Temas',
    'nav.random': 'Descubrimiento Aleatorio',
    'nav.search': 'Buscar',
    'nav.language': 'Idioma',
    'nav.map': '📍 Mapa Interactivo',
    'nav.contribute': '✋ Contribuir',
    'nav.about': 'Acerca de',
    'nav.graph': '🕸️ Grafo de Conocimiento',
    'nav.graph-view': 'Grafo de Conocimiento',
    'nav.resources': '🔗 Recursos',
    'nav.data': '📊 Datos',
    'nav.assets': 'Recursos SVG',
    'nav.projects': 'Proyectos',
    'nav.language-switch': 'Idioma',
    'nav.search-modal.input-placeholder': 'Buscar artículos...',
    'nav.search-modal.type-to-search': 'Escribe para buscar en todos los artículos',
    'footer.explore': 'Explorar',
    'footer.project': 'Proyecto',
    'footer.about': 'Acerca de',
    'footer.graph': 'Grafo de Conocimiento',
    'footer.contribute': 'Guía de Contribución',
    'footer.changelog': 'Historial de Actualizaciones',
    'footer.contact': 'Contacto',
    'footer.report': 'Reportar Problema',
    'footer.discuss': 'Discusiones',
    'footer.desc': 'Base de conocimiento de código abierto sobre Taiwán',
    'footer.support-us': 'Apóyanos',
    'footer.font-sponsor-prefix': 'Fuentes web patrocinadas por',
    'footer.font-sponsor-suffix': ' ',
    'categoryConfig.history': 'Historia',
    'categoryConfig.geography': 'Geografía',
    'categoryConfig.culture': 'Cultura',
    'categoryConfig.food': 'Gastronomía',
    'categoryConfig.art': 'Arte',
    'categoryConfig.music': 'Música',
    'categoryConfig.technology': 'Tecnología',
    'categoryConfig.nature': 'Naturaleza',
    'categoryConfig.people': 'Personas',
    'categoryConfig.society': 'Sociedad',
    'categoryConfig.economy': 'Economía',
    'categoryConfig.lifestyle': 'Estilo de Vida',
    'categoryConfig.history.description':
      'De la prehistoria al presente, el hilo completo de la historia taiwanesa',
    'categoryConfig.geography.description':
      'El entorno natural, relieve y desarrollo regional de Taiwán',
    'categoryConfig.culture.description':
      'La fusión de tradiciones indígenas, chinas y contemporáneas',
    'categoryConfig.food.description':
      'Del bocadillo callejero a la alta cocina, el alma culinaria de Taiwán',
    'categoryConfig.art.description':
      'De la artesanía ancestral al arte contemporáneo, pura energía creativa',
    'categoryConfig.music.description':
      'Del canto indígena al Mandopop, el paisaje sonoro de la isla',
    'categoryConfig.technology.description':
      'Innovación y transformación digital en la isla tecnológica del mundo',
    'categoryConfig.nature.description':
      'Ecosistemas únicos, parques nacionales y biodiversidad insular',
    'categoryConfig.people.description':
      'Figuras extraordinarias que forjaron el destino de Taiwán',
    'categoryConfig.society.description':
      'Cambio social, movimientos ciudadanos y debates contemporáneos',
    'categoryConfig.economy.description':
      'El milagro económico asiático y sus retos actuales',
    'categoryConfig.lifestyle.description':
      'El modo de vida, los valores y el pulso cotidiano del pueblo taiwanés',
    'CategoryGrid.article': 'artículo',
    'CategoryGrid.articles': 'artículos',
    'CategoryGrid.explore': 'explorar',
    'CategoryGrid.aria-section': 'Categorías de conocimiento sobre Taiwán',
    'CategoryGrid.aria-explore': 'Explorar',
    'CategoryGrid.aria-explore-suffix': ' ',
    'CategoryGrid.alt-category-image-suffix': 'imagen de categoría',
  },
} as const;

// Utility functions for ES locale support
export function getLangPrefix(lang: Lang): string {
  if (lang === 'zh-TW') return '';
  return `/${lang}`;
}

export function getLocaleFromPath(path: string): Lang {
  if (path.startsWith('/en')) return 'en';
  if (path.startsWith('/es')) return 'es';
  return 'zh-TW';
}

export function getActiveLocales(): Lang[] {
  return ['zh-TW', 'en', 'es'];
}

export function t(key: string, lang: Lang = defaultLang): string {
  const localeStrings = ui[lang] as Record<string, string> | undefined;
  if (localeStrings && key in localeStrings) {
    return localeStrings[key];
  }
  if (lang !== 'en' && key in ui.en) {
    return ui.en[key as keyof typeof ui.en];
  }
  if (key in ui['zh-TW']) {
    return ui['zh-TW'][key as keyof typeof ui['zh-TW']];
  }
  return key;
}
