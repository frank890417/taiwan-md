import { useTranslations } from '../i18n/utils';

export const getCategoryConfigs = (t: ReturnType<typeof useTranslations>) => ({
  about: {
    name: 'About',
    description: 'About Taiwan.md - Origin story, team, and mission',
    icon: '📖',
    color: '#4b5563',
    colorLight: '#4b556320',
    gradient: 'linear-gradient(135deg, #4b5563, #6b7280)',
    cover: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Taroko_national_park.jpg/640px-Taroko_national_park.jpg',
  },
  history: {
    name: t('categoryConfig.history'),
    description: t('categoryConfig.history.description'),

    icon: '📜',
    color: '#92400e',
    colorLight: '#f59e0b20',
    gradient: 'linear-gradient(135deg, #92400e, #d97706)',
    cover:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Presidential_Office_Building_%28Taiwan%29.jpg/640px-Presidential_Office_Building_%28Taiwan%29.jpg',
  },
  geography: {
    name: t('categoryConfig.geography'),
    description: t('categoryConfig.geography.description'),
    icon: '🗺️',
    color: '#065f46',
    colorLight: '#059f4620',
    gradient: 'linear-gradient(135deg, #065f46, #10b981)',
    cover:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Taroko_national_park.jpg/640px-Taroko_national_park.jpg',
  },
  culture: {
    name: t('categoryConfig.culture'),
    description: t('categoryConfig.culture.description'),

    icon: '🎭',
    color: '#7c3aed',
    colorLight: '#7c3aed20',
    gradient: 'linear-gradient(135deg, #7c3aed, #a855f7)',
    cover:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Lukang_Tianhou_Temple.JPG/640px-Lukang_Tianhou_Temple.JPG',
  },
  food: {
    name: t('categoryConfig.food'),
    description: t('categoryConfig.food.description'),
    icon: '🍜',
    color: '#ea580c',
    colorLight: '#ea580c20',
    gradient: 'linear-gradient(135deg, #ea580c, #f97316)',
    cover:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Taipei_Shilin_Night_Market.jpg/640px-Taipei_Shilin_Night_Market.jpg',
  },
  art: {
    name: t('categoryConfig.art'),
    description: t('categoryConfig.art.description'),
    icon: '🎨',
    color: '#be185d',
    colorLight: '#be185d20',
    gradient: 'linear-gradient(135deg, #be185d, #ec4899)',
    cover:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Taipei_Fine_Arts_Museum_2019.jpg/640px-Taipei_Fine_Arts_Museum_2019.jpg',
  },
  music: {
    name: t('categoryConfig.music'),
    description: t('categoryConfig.music.description'),
    icon: '🎵',
    color: '#0891b2',
    colorLight: '#0891b220',
    gradient: 'linear-gradient(135deg, #0891b2, #06b6d4)',
    cover:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/National_Concert_Hall%2C_Taipei_2015.jpg/640px-National_Concert_Hall%2C_Taipei_2015.jpg',
  },
  technology: {
    name: t('categoryConfig.technology'),
    description: t('categoryConfig.technology.description'),
    icon: '💻',
    color: '#1d4ed8',
    colorLight: '#1d4ed820',
    gradient: 'linear-gradient(135deg, #1d4ed8, #3b82f6)',
    cover:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/TSMC_Fab12.jpg/640px-TSMC_Fab12.jpg',
  },
  nature: {
    name: t('categoryConfig.nature'),
    description: t('categoryConfig.nature.description'),
    icon: '🌿',
    color: '#15803d',
    colorLight: '#15803d20',
    gradient: 'linear-gradient(135deg, #15803d, #22c55e)',
    cover:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Yushan_main_peak%2BBlue_arrow.jpg/640px-Yushan_main_peak%2BBlue_arrow.jpg',
  },
  people: {
    name: t('categoryConfig.people'),
    description: t('categoryConfig.people.description'),
    description_en: "Key figures and stories that shaped Taiwan's development",
    icon: '👥',
    color: '#b45309',
    colorLight: '#b4530920',
    gradient: 'linear-gradient(135deg, #b45309, #f59e0b)',
    cover:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Ang_Lee_-_66%C3%A8me_Festival_de_Venise_%28Mostra%29.jpg/400px-Ang_Lee_-_66%C3%A8me_Festival_de_Venise_%28Mostra%29.jpg',
  },
  society: {
    name: t('categoryConfig.society'),
    description: t('categoryConfig.society.description'),
    icon: '🏛️',
    color: '#475569',
    colorLight: '#47556920',
    gradient: 'linear-gradient(135deg, #475569, #64748b)',
    cover:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Legislative_Yuan%2C_the_Republic_of_China.JPG/640px-Legislative_Yuan%2C_the_Republic_of_China.JPG',
  },
  economy: {
    name: t('categoryConfig.economy'),
    description: t('categoryConfig.economy.description'),
    icon: '📊',
    color: '#c2410c',
    colorLight: '#c2410c20',
    gradient: 'linear-gradient(135deg, #c2410c, #ea580c)',
    cover:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Taipei_101_from_afar.jpg/400px-Taipei_101_from_afar.jpg',
  },
  lifestyle: {
    name: t('categoryConfig.lifestyle'),
    description: t('categoryConfig.lifestyle.description'),
    icon: '🏠',
    color: '#4d7c0f',
    colorLight: '#4d7c0f20',
    gradient: 'linear-gradient(135deg, #4d7c0f, #65a30d)',
    cover:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/7-Eleven_in_Taipei.jpg/640px-7-Eleven_in_Taipei.jpg',
  },
});

const __plainCategoryConfig = getCategoryConfigs((key) => key as any);

export const categoryList = Object.keys(__plainCategoryConfig) as CategoryKey[];
export type CategoryKey = keyof typeof __plainCategoryConfig;
