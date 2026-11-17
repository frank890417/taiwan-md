import { useTranslations } from '../i18n/utils';

export interface CategoryConfig {
  name: string;
  description: string;
  description_en?: string;
  icon: string;
  color: string;
  colorLight: string;
  gradient: string;
  /** 分類代表圖（2026-11-10 起 ArticleHero 不再拿它當背景：人物類會把李安墊在別人的文章後面，hero 改回純色）。原為文章沒有封面圖時 ArticleHero 的分類預設背景。2026-11-04 全站普查 §八 #10：原本 14 張
   * 全是 upload.wikimedia.org 縮圖熱連結，其中 8 個檔名在 Commons 查無此檔、其餘雜湊路徑
   * 也對不上（抽測 4 張全是 HTTP 400），等於 904 篇沒封面的文章頂部背景一直是破圖。改成
   * image-ingest.mjs 收進庫的本地圖（授權核對、清 EXIF、轉 WebP），消失的檔名換成同主題、
   * CC BY／BY-SA／CC0 的 Commons 圖。 */
  cover: string;
  /** 封面圖出處（CC 署名義務）。日後若再顯示 cover，要一併印出署名；原本 ArticleHero 用分類預設封面當背景時，在右下角印一行
   * 「{article.imageCredit}：作者 · 授權 · {article.imageSource}」，跟文章封面圖說同一格式，
   * 十三語共用（標籤走 i18n，授權名稱不翻譯）。 */
  coverCredit?: string;
  coverLicense?: string;
  coverSource?: string;
}
export const getCategoryConfigs = (
  t: ReturnType<typeof useTranslations>,
): Record<string, CategoryConfig> => ({
  about: {
    name: t('categoryConfig.about'),
    description: t('categoryConfig.about.description'),
    icon: '🏝️',
    color: '#4b5563',
    colorLight: '#4b556320',
    gradient: 'linear-gradient(135deg, #4b5563, #6b7280)',
    cover:
      '/article-images/covers/category-geography-taroko-gorge-pudu-bridge.webp',
    coverCredit: 'CEphoto, Uwe Aranas / Wikimedia Commons',
    coverLicense: 'CC BY-SA 3.0',
    coverSource:
      'https://commons.wikimedia.org/wiki/File:Taroko-Gorge_Hualien_Taiwan_Pudu-Bridge-at-Taroko-National-Park-01.jpg',
  },
  history: {
    name: t('categoryConfig.history'),
    description: t('categoryConfig.history.description'),

    icon: '📜',
    color: '#92400e',
    colorLight: '#f59e0b20',
    gradient: 'linear-gradient(135deg, #92400e, #d97706)',
    cover:
      '/article-images/covers/category-history-presidential-office-building.webp',
    coverCredit: 'CEphoto, Uwe Aranas / Wikimedia Commons',
    coverLicense: 'CC BY-SA 3.0',
    coverSource:
      'https://commons.wikimedia.org/wiki/File:Taipei_Taiwan_Presidential-Office-Building-01.jpg',
  },
  geography: {
    name: t('categoryConfig.geography'),
    description: t('categoryConfig.geography.description'),
    icon: '🏞️',
    color: '#065f46',
    colorLight: '#059f4620',
    gradient: 'linear-gradient(135deg, #065f46, #10b981)',
    cover:
      '/article-images/covers/category-geography-taroko-gorge-pudu-bridge.webp',
    coverCredit: 'CEphoto, Uwe Aranas / Wikimedia Commons',
    coverLicense: 'CC BY-SA 3.0',
    coverSource:
      'https://commons.wikimedia.org/wiki/File:Taroko-Gorge_Hualien_Taiwan_Pudu-Bridge-at-Taroko-National-Park-01.jpg',
  },
  culture: {
    name: t('categoryConfig.culture'),
    description: t('categoryConfig.culture.description'),

    icon: '🎭',
    color: '#7c3aed',
    colorLight: '#7c3aed20',
    gradient: 'linear-gradient(135deg, #7c3aed, #a855f7)',
    cover: '/article-images/covers/category-culture-lukang-tianhou-temple.webp',
    coverCredit: 'lienyuan lee / Wikimedia Commons',
    coverLicense: 'CC BY 3.0',
    coverSource:
      'https://commons.wikimedia.org/wiki/File:%E9%B9%BF%E6%B8%AF%E5%A4%A9%E5%90%8E%E5%AE%AE_Lugang_Tianhou_Temple_-_panoramio.jpg',
  },
  food: {
    name: t('categoryConfig.food'),
    description: t('categoryConfig.food.description'),
    icon: '🍜',
    color: '#ea580c',
    colorLight: '#ea580c20',
    gradient: 'linear-gradient(135deg, #ea580c, #f97316)',
    cover: '/article-images/covers/category-food-shilin-night-market.webp',
    coverCredit: 'Exec8 / Wikimedia Commons',
    coverLicense: 'CC BY-SA 4.0',
    coverSource:
      'https://commons.wikimedia.org/wiki/File:Shilin_Night_Market_02.jpg',
  },
  art: {
    name: t('categoryConfig.art'),
    description: t('categoryConfig.art.description'),
    icon: '🖌️',
    color: '#be185d',
    colorLight: '#be185d20',
    gradient: 'linear-gradient(135deg, #be185d, #ec4899)',
    cover:
      '/article-images/covers/category-art-taipei-fine-arts-museum-2019.webp',
    coverCredit: 'Wpcpey / Wikimedia Commons',
    coverLicense: 'CC BY 4.0',
    coverSource:
      'https://commons.wikimedia.org/wiki/File:Taipei_Fine_Arts_Museum_2019.jpg',
  },
  music: {
    name: t('categoryConfig.music'),
    description: t('categoryConfig.music.description'),
    icon: '🎵',
    color: '#0891b2',
    colorLight: '#0891b220',
    gradient: 'linear-gradient(135deg, #0891b2, #06b6d4)',
    cover: '/article-images/covers/category-music-national-concert-hall.webp',
    coverCredit: 'CEphoto, Uwe Aranas / Wikimedia Commons',
    coverLicense: 'CC BY-SA 3.0',
    coverSource:
      'https://commons.wikimedia.org/wiki/File:Taipei_Taiwan_National-Concert-Hall-01.jpg',
  },
  technology: {
    name: t('categoryConfig.technology'),
    description: t('categoryConfig.technology.description'),
    icon: '💻',
    color: '#1d4ed8',
    colorLight: '#1d4ed820',
    gradient: 'linear-gradient(135deg, #1d4ed8, #3b82f6)',
    cover: '/article-images/covers/category-technology-tsmc-fabs-hsinchu.webp',
    coverCredit: '曾 成訓 / Wikimedia Commons',
    coverLicense: 'CC BY 2.0',
    coverSource:
      'https://commons.wikimedia.org/wiki/File:TSMC_fabs_in_Hsinchu_01.jpg',
  },
  nature: {
    name: t('categoryConfig.nature'),
    description: t('categoryConfig.nature.description'),
    icon: '🌿',
    color: '#15803d',
    colorLight: '#15803d20',
    gradient: 'linear-gradient(135deg, #15803d, #22c55e)',
    cover: '/article-images/covers/category-nature-yushan-main-peak-2017.webp',
    coverCredit: 'Chi-Hung Lin / Wikimedia Commons',
    coverLicense: 'CC BY-SA 2.0',
    coverSource:
      'https://commons.wikimedia.org/wiki/File:Yushan_Main_Peak_and_Yushan_Northern_Peak_seen_from_Dongpu_Mountain_in_the_afternoon_on_28_January_2017.jpg',
  },
  people: {
    name: t('categoryConfig.people'),
    description: t('categoryConfig.people.description'),
    description_en: "Key figures and stories that shaped Taiwan's development",
    icon: '👤',
    color: '#b45309',
    colorLight: '#b4530920',
    gradient: 'linear-gradient(135deg, #b45309, #f59e0b)',
    cover: '/article-images/covers/category-people-ang-lee.webp',
    coverCredit: 'Sean Reynolds / Wikimedia Commons',
    coverLicense: 'CC BY 2.0',
    coverSource:
      'https://commons.wikimedia.org/wiki/File:Ang_Lee_%288464864982%29.jpg',
  },
  society: {
    name: t('categoryConfig.society'),
    description: t('categoryConfig.society.description'),
    icon: '👥',
    color: '#475569',
    colorLight: '#47556920',
    gradient: 'linear-gradient(135deg, #475569, #64748b)',
    cover: '/article-images/covers/category-society-legislative-yuan.webp',
    coverCredit: 'Yu tptw / Wikimedia Commons',
    coverLicense: 'CC BY-SA 4.0',
    coverSource:
      'https://commons.wikimedia.org/wiki/File:Legislative_Yuan_Building_and_cityscape.jpg',
  },
  economy: {
    name: t('categoryConfig.economy'),
    description: t('categoryConfig.economy.description'),
    icon: '🪙',
    color: '#c2410c',
    colorLight: '#c2410c20',
    gradient: 'linear-gradient(135deg, #c2410c, #ea580c)',
    cover: '/article-images/covers/category-economy-taipei-101.webp',
    coverCredit: 'peellden / Wikimedia Commons',
    coverLicense: 'CC BY-SA 3.0',
    coverSource:
      'https://commons.wikimedia.org/wiki/File:Taipei_101_from_afar.jpg',
  },
  lifestyle: {
    name: t('categoryConfig.lifestyle'),
    description: t('categoryConfig.lifestyle.description'),
    icon: '🛵',
    color: '#4d7c0f',
    colorLight: '#4d7c0f20',
    gradient: 'linear-gradient(135deg, #4d7c0f, #65a30d)',
    cover:
      '/article-images/covers/category-lifestyle-7-eleven-chunron-store-2016.webp',
    coverCredit: '玄史生 / Wikimedia Commons',
    coverLicense: 'CC0',
    coverSource:
      'https://commons.wikimedia.org/wiki/File:7-Eleven_Chunron_Store_20160125.jpg',
  },
  politics: {
    name: t('categoryConfig.politics'),
    description: t('categoryConfig.politics.description'),
    icon: '🗳️',
    color: '#7c2d12',
    colorLight: '#7c2d1220',
    gradient: 'linear-gradient(135deg, #7c2d12, #ea580c)',
    cover: '/article-images/covers/category-society-legislative-yuan.webp',
    coverCredit: 'Yu tptw / Wikimedia Commons',
    coverLicense: 'CC BY-SA 4.0',
    coverSource:
      'https://commons.wikimedia.org/wiki/File:Legislative_Yuan_Building_and_cityscape.jpg',
  },
});

const __plainCategoryConfig = getCategoryConfigs((key) => key as any);

export const categoryList = Object.keys(__plainCategoryConfig) as CategoryKey[];
export type CategoryKey = keyof typeof __plainCategoryConfig;
