/**
 * opendata-ui.ts — /opendata 模板裡原本寫死中文的小字串（資料星系節點名稱與
 * tooltip、更新頻率光譜的刻度、「全文語意檢索」標記）。每語一份；缺的語言退英文。
 */

export interface OpendataUi {
  fullText: string;
  kindDomain: string;
  kindVertical: string;
  kindArticle: string;
  kindCenter: string;
  records: string;
  /** 垂直語料庫節點名稱 */
  corpus: {
    judicial: string;
    exam: string;
    nutrition: string;
    drug: string;
    patent: string;
  };
  /** 更新頻率刻度（key 是 curation.json 的中文頻率字串，去掉「更新」二字） */
  freq: Record<string, string>;
}

const F = (a: string[]): Record<string, string> => ({
  每半月: a[0],
  每1月: a[1],
  每3月: a[2],
  每1年: a[3],
  每4年: a[4],
  每5年: a[5],
  不定期: a[6],
});

export const OPENDATA_UI: Record<string, OpendataUi> = {
  'zh-TW': {
    fullText: '全文語意檢索',
    kindDomain: '資料領域',
    kindVertical: '垂直語料庫',
    kindArticle: 'Taiwan.md 文章・點擊閱讀',
    kindCenter: '意義策展層',
    records: '筆',
    corpus: {
      judicial: '判決書',
      exam: '國考題庫',
      nutrition: '食品營養',
      drug: '藥品許可證',
      patent: '發明專利',
    },
    freq: F(['每半月', '每1月', '每3月', '每1年', '每4年', '每5年', '不定期']),
  },
  en: {
    fullText: 'Full-text semantic search',
    kindDomain: 'Data domain',
    kindVertical: 'Vertical corpus',
    kindArticle: 'Taiwan.md article · click to read',
    kindCenter: 'Meaning-curation layer',
    records: 'records',
    corpus: {
      judicial: 'Court judgments',
      exam: 'National exams',
      nutrition: 'Food nutrition',
      drug: 'Drug licenses',
      patent: 'Invention patents',
    },
    freq: F([
      'Semimonthly',
      'Monthly',
      'Quarterly',
      'Yearly',
      'Every 4 yrs',
      'Every 5 yrs',
      'Irregular',
    ]),
  },
  ja: {
    fullText: '全文セマンティック検索',
    kindDomain: 'データ領域',
    kindVertical: '垂直コーパス',
    kindArticle: 'Taiwan.md の記事・クリックで読む',
    kindCenter: '意味のキュレーション層',
    records: '件',
    corpus: {
      judicial: '判決書',
      exam: '国家試験問題',
      nutrition: '食品栄養',
      drug: '医薬品許可証',
      patent: '発明特許',
    },
    freq: F([
      '半月ごと',
      '月次',
      '四半期',
      '年次',
      '4年ごと',
      '5年ごと',
      '不定期',
    ]),
  },
  ko: {
    fullText: '전문 의미 검색',
    kindDomain: '데이터 영역',
    kindVertical: '수직 코퍼스',
    kindArticle: 'Taiwan.md 글・클릭하여 읽기',
    kindCenter: '의미 큐레이션 층',
    records: '건',
    corpus: {
      judicial: '판결문',
      exam: '국가시험 문제',
      nutrition: '식품 영양',
      drug: '의약품 허가증',
      patent: '발명 특허',
    },
    freq: F(['반월', '월간', '분기', '연간', '4년마다', '5년마다', '비정기']),
  },
  es: {
    fullText: 'Búsqueda semántica de texto completo',
    kindDomain: 'Dominio de datos',
    kindVertical: 'Corpus vertical',
    kindArticle: 'Artículo de Taiwan.md · clic para leer',
    kindCenter: 'Capa de curaduría de sentido',
    records: 'registros',
    corpus: {
      judicial: 'Sentencias',
      exam: 'Exámenes nacionales',
      nutrition: 'Nutrición de alimentos',
      drug: 'Licencias de fármacos',
      patent: 'Patentes de invención',
    },
    freq: F([
      'Quincenal',
      'Mensual',
      'Trimestral',
      'Anual',
      'Cada 4 años',
      'Cada 5 años',
      'Irregular',
    ]),
  },
  fr: {
    fullText: 'Recherche sémantique en texte intégral',
    kindDomain: 'Domaine de données',
    kindVertical: 'Corpus vertical',
    kindArticle: 'Article de Taiwan.md · cliquer pour lire',
    kindCenter: 'Couche de curation du sens',
    records: 'entrées',
    corpus: {
      judicial: 'Jugements',
      exam: 'Concours nationaux',
      nutrition: 'Nutrition des aliments',
      drug: 'Autorisations de médicaments',
      patent: "Brevets d'invention",
    },
    freq: F([
      'Bimensuel',
      'Mensuel',
      'Trimestriel',
      'Annuel',
      'Tous les 4 ans',
      'Tous les 5 ans',
      'Irrégulier',
    ]),
  },
  vi: {
    fullText: 'Tìm kiếm ngữ nghĩa toàn văn',
    kindDomain: 'Lĩnh vực dữ liệu',
    kindVertical: 'Kho ngữ liệu chuyên ngành',
    kindArticle: 'Bài viết Taiwan.md · bấm để đọc',
    kindCenter: 'Tầng tuyển chọn ý nghĩa',
    records: 'bản ghi',
    corpus: {
      judicial: 'Bản án',
      exam: 'Đề thi quốc gia',
      nutrition: 'Dinh dưỡng thực phẩm',
      drug: 'Giấy phép thuốc',
      patent: 'Sáng chế',
    },
    freq: F([
      'Nửa tháng',
      'Hằng tháng',
      'Hằng quý',
      'Hằng năm',
      '4 năm/lần',
      '5 năm/lần',
      'Không định kỳ',
    ]),
  },
  id: {
    fullText: 'Pencarian semantik teks penuh',
    kindDomain: 'Ranah data',
    kindVertical: 'Korpus vertikal',
    kindArticle: 'Artikel Taiwan.md · klik untuk membaca',
    kindCenter: 'Lapisan kurasi makna',
    records: 'entri',
    corpus: {
      judicial: 'Putusan pengadilan',
      exam: 'Soal ujian nasional',
      nutrition: 'Gizi pangan',
      drug: 'Izin obat',
      patent: 'Paten invensi',
    },
    freq: F([
      'Dua mingguan',
      'Bulanan',
      'Triwulanan',
      'Tahunan',
      'Tiap 4 tahun',
      'Tiap 5 tahun',
      'Tidak berkala',
    ]),
  },
  pt: {
    fullText: 'Busca semântica em texto integral',
    kindDomain: 'Domínio de dados',
    kindVertical: 'Corpus vertical',
    kindArticle: 'Artigo do Taiwan.md · clique para ler',
    kindCenter: 'Camada de curadoria de sentido',
    records: 'registros',
    corpus: {
      judicial: 'Sentenças',
      exam: 'Concursos nacionais',
      nutrition: 'Nutrição de alimentos',
      drug: 'Registros de medicamentos',
      patent: 'Patentes de invenção',
    },
    freq: F([
      'Quinzenal',
      'Mensal',
      'Trimestral',
      'Anual',
      'A cada 4 anos',
      'A cada 5 anos',
      'Irregular',
    ]),
  },
  hi: {
    fullText: 'पूर्ण-पाठ सिमेंटिक खोज',
    kindDomain: 'डेटा क्षेत्र',
    kindVertical: 'विशिष्ट कॉर्पस',
    kindArticle: 'Taiwan.md लेख · पढ़ने के लिए क्लिक करें',
    kindCenter: 'अर्थ-संकलन परत',
    records: 'प्रविष्टियाँ',
    corpus: {
      judicial: 'अदालती फ़ैसले',
      exam: 'राष्ट्रीय परीक्षाएँ',
      nutrition: 'खाद्य पोषण',
      drug: 'दवा लाइसेंस',
      patent: 'आविष्कार पेटेंट',
    },
    freq: F([
      'पाक्षिक',
      'मासिक',
      'त्रैमासिक',
      'वार्षिक',
      'हर 4 वर्ष',
      'हर 5 वर्ष',
      'अनियमित',
    ]),
  },
  ar: {
    fullText: 'بحث دلالي في النص الكامل',
    kindDomain: 'مجال البيانات',
    kindVertical: 'مدوّنة متخصصة',
    kindArticle: 'مقال من Taiwan.md · انقر للقراءة',
    kindCenter: 'طبقة تنسيق المعنى',
    records: 'سجل',
    corpus: {
      judicial: 'الأحكام القضائية',
      exam: 'الامتحانات الوطنية',
      nutrition: 'تغذية الأطعمة',
      drug: 'تراخيص الأدوية',
      patent: 'براءات الاختراع',
    },
    freq: F([
      'نصف شهري',
      'شهري',
      'ربع سنوي',
      'سنوي',
      'كل 4 سنوات',
      'كل 5 سنوات',
      'غير دوري',
    ]),
  },
  ru: {
    fullText: 'Семантический поиск по полному тексту',
    kindDomain: 'Область данных',
    kindVertical: 'Тематический корпус',
    kindArticle: 'Статья Taiwan.md · нажмите, чтобы читать',
    kindCenter: 'Слой кураторского смысла',
    records: 'записей',
    corpus: {
      judicial: 'Судебные решения',
      exam: 'Госэкзамены',
      nutrition: 'Питательность продуктов',
      drug: 'Лицензии на лекарства',
      patent: 'Патенты на изобретения',
    },
    freq: F([
      'Раз в полмесяца',
      'Ежемесячно',
      'Ежеквартально',
      'Ежегодно',
      'Раз в 4 года',
      'Раз в 5 лет',
      'Нерегулярно',
    ]),
  },
  de: {
    fullText: 'Semantische Volltextsuche',
    kindDomain: 'Datenbereich',
    kindVertical: 'Fachkorpus',
    kindArticle: 'Taiwan.md-Artikel · zum Lesen anklicken',
    kindCenter: 'Ebene der Sinnkuratierung',
    records: 'Einträge',
    corpus: {
      judicial: 'Gerichtsurteile',
      exam: 'Staatsprüfungen',
      nutrition: 'Lebensmittelnährwerte',
      drug: 'Arzneimittelzulassungen',
      patent: 'Erfindungspatente',
    },
    freq: F([
      'Halbmonatlich',
      'Monatlich',
      'Vierteljährlich',
      'Jährlich',
      'Alle 4 Jahre',
      'Alle 5 Jahre',
      'Unregelmäßig',
    ]),
  },
};

export function getOpendataUi(lang: string): OpendataUi {
  return OPENDATA_UI[lang] ?? OPENDATA_UI.en;
}
