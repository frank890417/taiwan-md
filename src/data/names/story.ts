/**
 * story.ts — /names 專題的結構化內容：來源清單、時間軸、命名制度、各方說法。
 * 三語欄位（zh／en／ja）各自撰寫，不是互譯；缺某語時模板退回 en 再退回 zh。
 * 每一筆事實帶 src（對應 SOURCES 的 id），頁面上顯示成編號並連到來源清單。
 * 研究原始檔：reports/research/2026-11/names-*.md；設計報告：reports/design-names-topic-2026-11-10.md
 */

export type L3 = { zh: string; en: string; ja?: string };

export interface Source {
  id: string;
  title: L3;
  url: string;
  /** 文件日期或版本 */
  date: string;
}

/** 順序＝頁面上的編號。新增只往後加，不要插隊（編號會變）。 */
export const SOURCES: Source[] = [
  {
    id: 'S1',
    title: {
      zh: '內政部《全國姓名統計分析》112 年版',
      en: 'Ministry of the Interior, National Name Statistics, 2023 edition (in Chinese)',
      ja: '内政部『全国姓名統計分析』112年版（2023年、中国語）',
    },
    url: 'https://www.ris.gov.tw/documents/data/5/2/112namestat.pdf',
    date: '2023-10（資料基準日 2023-06-30）',
  },
  {
    id: 'S2',
    title: {
      zh: '內政部統計處《內政統計通報》114 年第 46 週：出生嬰兒從姓統計',
      en: 'MOI Department of Statistics, Weekly Bulletin 2025 no. 46: surnames given to newborns (in Chinese)',
      ja: '内政部統計処『内政統計通報』2025年第46週：出生児の姓の統計（中国語）',
    },
    url: 'https://www.moi.gov.tw/News_Content.aspx?n=9&sms=9009&s=333314',
    date: '2025-11-15',
  },
  {
    id: 'S3',
    title: {
      zh: '外交部領事事務局〈護照外文姓名拼音對照表〉',
      en: 'Bureau of Consular Affairs, Passport Name Romanization Table (in Chinese)',
      ja: '外交部領事事務局「パスポート外国語氏名ローマ字対照表」（中国語）',
    },
    url: 'https://www.boca.gov.tw/cp-2-4226-c0eff-1.html',
    date: '2026-05-29',
  },
  {
    id: 'S4',
    title: {
      zh: '外交部領事事務局〈外文姓名中譯英系統：4 種拼音方式介紹〉',
      en: 'Bureau of Consular Affairs, notes on the four romanization systems (in Chinese)',
      ja: '外交部領事事務局「4種類のローマ字表記方式の紹介」（中国語）',
    },
    url: 'https://www.boca.gov.tw/cp-2-8194-ee028-1.html',
    date: '2026-05-28',
  },
  {
    id: 'S5',
    title: {
      zh: '外交部領事事務局常見問答：護照外文姓名的拼音方式',
      en: 'Bureau of Consular Affairs FAQ: which romanization may be used on a passport (in Chinese)',
      ja: '外交部領事事務局FAQ：パスポートのローマ字表記方式（中国語）',
    },
    url: 'https://www.boca.gov.tw/fp-35-7873-3a928-1.html',
    date: '2026-05-28',
  },
  {
    id: 'S6',
    title: {
      zh: '《護照條例施行細則》第 13、14、14-1 條',
      en: 'Enforcement Rules of the Passport Act, arts. 13, 14 and 14-1 (in Chinese)',
      ja: '『護照条例施行細則』第13・14・14-1条（中国語）',
    },
    url: 'https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=E0030004',
    date: '2025-05-09 修正',
  },
  {
    id: 'S7',
    title: {
      zh: '教育部《中文譯音使用原則》',
      en: 'Ministry of Education, Guidelines on the Use of Chinese Romanization (in Chinese)',
      ja: '教育部『中文訳音使用原則』（中国語）',
    },
    url: 'https://edu.law.moe.gov.tw/LawContent.aspx?id=GL000499',
    date: '2002-08-22、2003-08-20、2008-12-18 行政院備查',
  },
  {
    id: 'S8',
    title: {
      zh: '《姓名條例》現行條文與沿革',
      en: 'Name Act, current text and amendment history (in Chinese)',
      ja: '『姓名条例』現行条文と沿革（中国語）',
    },
    url: 'https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=D0030011',
    date: '2024-05-29 修正',
  },
  {
    id: 'S9',
    title: {
      zh: '內政部新聞稿：立法院三讀通過《姓名條例》修正',
      en: 'MOI press release on the 2024 Name Act amendment (in Chinese)',
      ja: '内政部プレスリリース：2024年『姓名条例』改正（中国語）',
    },
    url: 'https://www.ris.gov.tw/info-liferay/app/channel/pressReleaseDetail/24136836',
    date: '2024-05-14',
  },
  {
    id: 'S10',
    title: {
      zh: '臺北高等行政法院 110 年度訴字第 1084 號判決',
      en: 'Taipei High Administrative Court, judgment 110-Su-1084 (in Chinese)',
      ja: '台北高等行政法院 110年度訴字第1084号判決（中国語）',
    },
    url: 'https://judgment.judicial.gov.tw/FILES/TPBA/110%2c%e8%a8%b4%2c1084%2c20231102%2c4.pdf',
    date: '2023-11-02',
  },
  {
    id: 'S11',
    title: {
      zh: '原住民族委員會〈臺灣原住民族傳統名字文化慣俗簡介〉',
      en: 'Council of Indigenous Peoples, overview of traditional naming customs (in Chinese)',
      ja: '原住民族委員会「台湾原住民族の伝統的な名前の慣習」（中国語）',
    },
    url: 'https://taiwan-indigenous-name.info/zh-tw/menu/data-nlist/42DC8BA2DBDFF688C9BE8B414469649F-info.html?cumid=42DC8BA2DBDFF688C9BE8B414469649F',
    date: '2025-06-08',
  },
  {
    id: 'S12',
    title: {
      zh: '國史館臺灣文獻館電子報第 113 期：蕭碧珍〈清除殖民印記－光復初期回復姓名〉',
      en: 'Taiwan Historica newsletter no. 113, Hsiao Pi-chen on postwar name restoration (in Chinese, archived copy)',
      ja: '国史館台湾文献館電子報第113号：蕭碧珍「戦後初期の姓名回復」（中国語、アーカイブ）',
    },
    url: 'https://web.archive.org/web/20230802065316/https://www.th.gov.tw/epaper/site/page/113/1588',
    date: '2013-08-29',
  },
  {
    id: 'S13',
    title: {
      zh: '《民法》第 1000、1059 條與沿革',
      en: 'Civil Code, arts. 1000 and 1059, with amendment history (in Chinese)',
      ja: '『民法』第1000条・第1059条と沿革（中国語）',
    },
    url: 'https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=B0000001',
    date: '1998-06-17、2007-05-23、2010-05-19 修正',
  },
  {
    id: 'S14',
    title: {
      zh: '內政部戶政司〈外國人、無國籍人及其子女取用中文姓名之原則〉',
      en: 'MOI Department of Household Registration, principles for Chinese names of foreign nationals (in Chinese)',
      ja: '内政部戸政司「外国人等の中国語氏名に関する原則」（中国語）',
    },
    url: 'https://www.ris.gov.tw/documents/html/8/7/6/349.html',
    date: '2012-01-30 會議決議',
  },
  {
    id: 'S15',
    title: {
      zh: '教育部《臺灣台語常用詞辭典》附錄：百家姓',
      en: 'Ministry of Education, Dictionary of Frequently-Used Taiwanese Taigi, surname appendix',
      ja: '教育部『台湾台語常用詞辞典』付録：百家姓',
    },
    url: 'https://sutian.moe.edu.tw/zh-hant/huliok/105/',
    date: '取用 2026-11-10',
  },
  {
    id: 'S16',
    title: {
      zh: '教育部《臺灣客語辭典》附錄：百家姓表',
      en: 'Ministry of Education, Dictionary of Taiwan Hakka, surname appendix',
      ja: '教育部『台湾客語辞典』付録：百家姓表',
    },
    url: 'https://hakkadict.moe.edu.tw/appendix/%E7%99%BE%E5%AE%B6%E5%A7%93%E8%A1%A8',
    date: '取用 2026-11-10',
  },
  {
    id: 'S17',
    title: {
      zh: '美國之音中文網：〈台灣中文譯音明年起改用漢語拼音〉',
      en: 'VOA Chinese, report on the 2008 switch to Hanyu Pinyin (in Chinese)',
      ja: 'VOA中国語版：2008年の漢語拼音採用に関する報道（中国語）',
    },
    url: 'https://www.voachinese.com/a/a-21-w2008-09-18-voa54-58954127/1104953.html',
    date: '2008-09-18',
  },
  {
    id: 'S18',
    title: {
      zh: 'Taipei Times：〈Tongyong Pinyin the new system for romanization〉',
      en: 'Taipei Times, “Tongyong Pinyin the new system for romanization”',
      ja: 'Taipei Times：通用拼音採用に関する報道（英語）',
    },
    url: 'https://www.taipeitimes.com/News/local/archives/2000/10/12/0000056944',
    date: '2000-10-12',
  },
  {
    id: 'S19',
    title: {
      zh: '大紀元：台灣華語拼音聯盟執行長專訪',
      en: 'Epoch Times, interview with the head of the Taiwan Pinyin Alliance (in Chinese)',
      ja: '大紀元：台湾華語拼音連盟執行長インタビュー（中国語）',
    },
    url: 'https://www.epochtimes.com/b5/8/10/20/n2302236.htm',
    date: '2008-10-20',
  },
  {
    id: 'S20',
    title: {
      zh: 'Right Plus 多多益善：〈以我的族名呼喚我〉系列報導',
      en: 'Right Plus, reporting on single-listed Indigenous names (in Chinese)',
      ja: 'Right Plus：民族語の名前の単独登記に関する報道（中国語）',
    },
    url: 'https://rightplus.org/2024/05/14/indigenousname-1/',
    date: '2024-05-14',
  },
  {
    id: 'S21',
    title: {
      zh: '民間司法改革基金會等八團體聯合聲明',
      en: 'Joint statement by the Judicial Reform Foundation and seven other groups (in Chinese)',
      ja: '民間司法改革基金会など8団体の共同声明（中国語）',
    },
    url: 'https://www.jrf.org.tw/articles/2709',
    date: '2024-05-15',
  },
  {
    id: 'S22',
    title: {
      zh: '中時新聞網：尖石鄉回復傳統姓名人數與原民會說明',
      en: 'China Times, on name restoration in Jianshi Township (in Chinese)',
      ja: '中時新聞網：尖石郷の伝統名回復者数（中国語）',
    },
    url: 'https://chinatimes.com/realtimenews/20240423003664-264214',
    date: '2024-04-23',
  },
  {
    id: 'S23',
    title: {
      zh: '公視新聞：族名並列後的印章與金融機構問題',
      en: 'PTS News, on practical problems after adding Indigenous names (in Chinese)',
      ja: '公視ニュース：民族名併記後の実務上の問題（中国語）',
    },
    url: 'https://news.pts.org.tw/article/792933',
    date: '2026-01-29',
  },
  {
    id: 'S24',
    title: {
      zh: 'Taipei Times：〈Dozens change name to ‘salmon’ to cash in on sushi deal〉',
      en: 'Taipei Times, “Dozens change name to ‘salmon’ to cash in on sushi deal”',
      ja: 'Taipei Times：「サーモン」改名騒動の報道（英語）',
    },
    url: 'https://taipeitimes.com/News/taiwan/archives/2021/03/21/2003754223',
    date: '2021-03-21',
  },
  {
    id: 'S25',
    title: {
      zh: '自由時報：立委質詢引用鮭魚改名人數',
      en: 'Liberty Times, legislator cites the number of “salmon” name changes (in Chinese)',
      ja: '自由時報：立法委員が引用した「鮭魚」改名者数（中国語）',
    },
    url: 'https://news.ltn.com.tw/news/life/breakingnews/3472139',
    date: '2021-03-19',
  },
  {
    id: 'S26',
    title: {
      zh: '外交部領事事務局：護照加簽與外文別名說明',
      en: 'Bureau of Consular Affairs, passport endorsements and aliases (in Chinese)',
      ja: '外交部領事事務局：パスポートの追記と外国語別名（中国語）',
    },
    url: 'https://www.boca.gov.tw/cp-32-26-a85b6-1.html',
    date: '2024-08-16（2026-01-28 更新）',
  },
  {
    id: 'S27',
    title: {
      zh: '《姓名條例施行細則》',
      en: 'Enforcement Rules of the Name Act (in Chinese)',
      ja: '『姓名条例施行細則』（中国語）',
    },
    url: 'https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=D0030012',
    date: '2024-11-28 修正',
  },
  {
    id: 'S28',
    title: {
      zh: '自由時報：歸化者中文姓名規定的討論',
      en: 'Liberty Times, 2011 debate over Chinese names for naturalized citizens (in Chinese)',
      ja: '自由時報：帰化者の中国語氏名規定をめぐる議論（中国語）',
    },
    url: 'https://news.ltn.com.tw/news/life/paper/539746',
    date: '2011-11-17',
  },
  {
    id: 'S29',
    title: {
      zh: 'Chen, L. N. H. (2015). Choices and Patterns of English Names among Taiwanese Students. Names, 63(4)',
      en: 'Chen, L. N. H. (2015). Choices and Patterns of English Names among Taiwanese Students. Names, 63(4)',
    },
    url: 'https://ans-names.pitt.edu/ans/article/view/2060',
    date: '2015',
  },
  {
    id: 'S30',
    title: {
      zh: '小麥注音字音資料（MIT）與 Unicode Unihan 16.0.0（kMandarin）',
      en: 'McBopomofo reading data (MIT) and Unicode Unihan 16.0.0 (kMandarin)',
    },
    url: 'https://github.com/openvanilla/McBopomofo/tree/1f98c58c19177c115cf752e9d49ca2b8e39091d5/Source/Data',
    date: '釘版本 1f98c58',
  },
  {
    id: 'S31',
    title: {
      zh: '司法院釋字第 399 號解釋',
      en: 'Judicial Yuan Interpretation No. 399 (in Chinese)',
      ja: '司法院釈字第399号解釈（中国語）',
    },
    url: 'https://cons.judicial.gov.tw/docdata.aspx?fid=100&id=310580',
    date: '1996-03-22',
  },
  {
    id: 'S32',
    title: {
      zh: '原住民族委員會〈推動原住民族登記傳統名字便民措施 3 年計畫〉',
      en: 'Council of Indigenous Peoples, three-year plan to ease registration of traditional names (in Chinese)',
      ja: '原住民族委員会「伝統名登記の利便化3か年計画」（中国語）',
    },
    url: 'https://www-ws.gov.taipei/001/Upload/382/relfile/10173/9178227/47f98f43-d8c9-4079-90ea-6e89c54840f8.pdf',
    date: '2024-05-19',
  },
];

export interface TimelineItem {
  date: string;
  text: L3;
  src: string;
  kind?: 'key' | 'pass';
}

/** §3 拼音政策時間軸 */
export const ROMAN_TIMELINE: TimelineItem[] = [
  {
    date: '1986-01',
    text: {
      zh: '教育部公告「國語注音符號第二式」，是戰後政府第一套自訂的羅馬拼音。',
      en: 'The Ministry of Education announces MPS II, the first postwar romanization system designed by the government.',
      ja: '教育部が「国語注音符号第二式」を公告。戦後、政府が自ら定めた最初のローマ字方式。',
    },
    src: 'S4',
  },
  {
    date: '1998-01',
    text: {
      zh: '臺北市政府公布使用通用拼音。',
      en: 'Taipei City Government adopts Tongyong Pinyin.',
      ja: '台北市政府が通用拼音の使用を公布。',
    },
    src: 'S4',
  },
  {
    date: '2002-08-22',
    text: {
      zh: '行政院備查《中文譯音使用原則》，地名譯音以通用拼音為準。',
      en: 'The Executive Yuan files the Guidelines on Chinese Romanization: place names are to use Tongyong Pinyin.',
      ja: '行政院が『中文訳音使用原則』を備査。地名のローマ字は通用拼音を基準とする。',
    },
    src: 'S7',
  },
  {
    date: '2003-08-20',
    text: {
      zh: '修正備查，範圍擴大成「我國中文譯音除另有規定外，以通用拼音為準」。',
      en: 'The guidelines are widened: Tongyong Pinyin becomes the default for Chinese romanization in general.',
      ja: '改正により対象を拡大。中国語のローマ字表記全般で通用拼音を基準とする。',
    },
    src: 'S7',
  },
  {
    date: '2008-12-18',
    text: {
      zh: '行政院修正備查，改成「以漢語拼音為準」。人名的譯寫「均得尊重當事人之意願」。',
      en: 'The default is switched to Hanyu Pinyin. For personal names, the guidelines say the person’s own wishes are to be respected.',
      ja: '基準を漢語拼音に変更。人名の表記は「本人の意思を尊重できる」と明記。',
    },
    src: 'S7',
    kind: 'key',
  },
  {
    date: '2019-08-09',
    text: {
      zh: '《護照條例施行細則》第 14 條把「國語讀音」改成「國家語言讀音」，護照外文姓名可以照台語、客語、原住民族語的讀音音譯。',
      en: 'Passport rules replace “Mandarin reading” with “reading in a national language”: a passport name may now follow Taiwanese, Hakka or an Indigenous language.',
      ja: '『護照条例施行細則』第14条の「国語の読み」を「国家言語の読み」に改正。台湾語・客家語・原住民族語の読みでパスポート名を表記できるようになった。',
    },
    src: 'S6',
    kind: 'key',
  },
  {
    date: '2026-05-29',
    text: {
      zh: '領事事務局現行對照表：409 個音節，四套拼法並列，註明「僅供參考」。',
      en: 'The current Bureau of Consular Affairs table: 409 syllables in four systems, marked “for reference only”.',
      ja: '領事事務局の現行対照表：409音節を4方式で併記。「参考用」と明記されている。',
    },
    src: 'S3',
  },
];

/** §5 原住民族名字時間軸 */
export const INDIGENOUS_TIMELINE: TimelineItem[] = [
  {
    date: '1940-02-11',
    text: {
      zh: '臺灣總督府修改戶口規則，開放臺灣人改日式姓名，採許可制。報載 1940 到 1943 年累計約 12 萬 6 千人，之後沒有留下全島統計。',
      en: 'The Government-General opens Japanese-style name changes to Taiwanese, by permit. A 1944 newspaper count put the 1940–43 total at about 126,000; no island-wide figure survives for the years after.',
      ja: '台湾総督府が戸口規則を改正し、許可制で日本式氏名への改姓名を認める。1940〜43年の累計は新聞報道で約12万6千人。それ以降の全島統計は残っていない。',
    },
    src: 'S12',
  },
  {
    date: '1946-05-21',
    text: {
      zh: '行政長官公署公布《修正臺灣省人民回復原有姓名辦法》，限三個月內申辦。沒有原有漢名可以回復的原住民，辦法要他們參照中國姓名自定姓名。',
      en: 'The postwar provincial administration orders residents to restore their original names within three months. Indigenous people with no Chinese-style name to “restore” are told to adopt one.',
      ja: '行政長官公署が「修正台湾省人民回復原有姓名弁法」を公布、3か月以内の手続きを求める。回復すべき漢名を持たない原住民は、中国式の氏名を自ら定めることとされた。',
    },
    src: 'S12',
  },
  {
    date: '1995-01-20',
    text: {
      zh: '《姓名條例》第 1 條修正：原住民族的姓名登記依其文化慣俗，已登記漢人姓氏者可以申請回復傳統姓名。',
      en: 'Name Act art. 1 amended: Indigenous names are registered according to custom, and those registered under Han surnames may apply to restore traditional names.',
      ja: '『姓名条例』第1条改正：原住民族の氏名登記は文化的慣習によるとし、漢姓で登記済みの者は伝統名への回復を申請できる。',
    },
    src: 'S8',
    kind: 'key',
  },
  {
    date: '2001-06-20',
    text: {
      zh: '傳統姓名可以並列羅馬拼音登記。2003-06-25 再修正，漢人姓名也可以並列傳統姓名的羅馬拼音。',
      en: 'Traditional names may be registered with a romanized form alongside. From 25 June 2003 a Han name may also carry the romanized traditional name beside it.',
      ja: '伝統名にローマ字を併記して登記できるようになる。2003年6月25日の改正で、漢名にも伝統名のローマ字を併記可能に。',
    },
    src: 'S8',
  },
  {
    date: '2023-11-02',
    text: {
      zh: '臺北高等行政法院判決：戶政事務所應准許原告把姓名變更登記為只有族語拼寫的「Bawtu Payen」。',
      en: 'The Taipei High Administrative Court orders a household registration office to register the plaintiff’s name as “Bawtu Payen”, in his own language only.',
      ja: '台北高等行政法院が、原告の氏名を民族語表記のみの「Bawtu Payen」として登記するよう戸政事務所に命じる判決。',
    },
    src: 'S10',
    kind: 'key',
  },
  {
    date: '2024-05-29',
    text: {
      zh: '《姓名條例》修正公布（5 月 14 日三讀）。第 2 條新增：依文化慣俗登記傳統姓名者，得使用原住民族文字。',
      en: 'The amended Name Act is promulgated (passed 14 May). New art. 2: a traditional name registered according to custom may be written in an Indigenous script.',
      ja: '改正『姓名条例』公布（5月14日可決）。第2条に追加：慣習に基づき伝統名を登記する者は、原住民族の文字を使用できる。',
    },
    src: 'S8',
    kind: 'pass',
  },
  {
    date: '2025-05-09',
    text: {
      zh: '《護照條例施行細則》跟進：單列族語文字的人，護照外文姓名就用那個族語拼寫。',
      en: 'Passport rules follow: for someone whose name is registered in an Indigenous script only, that spelling is the passport name.',
      ja: '『護照条例施行細則』も対応。民族語の文字のみで登記した人は、その表記がそのままパスポート名になる。',
    },
    src: 'S6',
  },
];

export interface NamingSystem {
  name: L3;
  form: L3;
  peoples: L3;
  note: L3;
}

/** §5 五種名制（原民會 2025 年整理，S11） */
export const NAMING_SYSTEMS: NamingSystem[] = [
  {
    name: { zh: '親子連名', en: 'Patronymic / matronymic', ja: '親子連名' },
    form: {
      zh: '自己的名＋父或母的名',
      en: 'own name + a parent’s name',
      ja: '本人の名＋父または母の名',
    },
    peoples: {
      zh: '泰雅、賽德克、太魯閣、噶瑪蘭、撒奇萊雅，以及部分阿美',
      en: 'Atayal, Seediq, Truku, Kavalan, Sakizaya and some Amis',
      ja: 'タイヤル、セデック、タロコ、クバラン、サキザヤ、一部のアミ',
    },
    note: {
      zh: '名字的第二段會隨世代換掉，一家人不共用一個「姓」。',
      en: 'The second element changes every generation, so a family does not share one “surname”.',
      ja: '二つ目の要素は世代ごとに変わる。家族で同じ「姓」を共有しない。',
    },
  },
  {
    name: {
      zh: '親子連名加氏族名',
      en: 'Parent’s name plus clan name',
      ja: '親子連名＋氏族名',
    },
    form: {
      zh: '自己的名＋親名＋氏族名',
      en: 'own name + parent’s name + clan name',
      ja: '本人の名＋親の名＋氏族名',
    },
    peoples: {
      zh: '賽夏，以及有氏族的阿美亞群',
      en: 'Saisiyat, and Amis groups that have clans',
      ja: 'サイシャット、氏族を持つアミの一部',
    },
    note: {
      zh: '氏族名排在最後，位置跟漢姓相反。',
      en: 'The clan name comes last, the opposite of where a Han surname sits.',
      ja: '氏族名は最後に置かれ、漢姓とは位置が逆になる。',
    },
  },
  {
    name: { zh: '家屋名', en: 'House name', ja: '家屋名' },
    form: {
      zh: '自己的名＋家屋名',
      en: 'own name + house name',
      ja: '本人の名＋家屋名',
    },
    peoples: {
      zh: '排灣、魯凱、卑南',
      en: 'Paiwan, Rukai, Pinuyumayan',
      ja: 'パイワン、ルカイ、プユマ',
    },
    note: {
      zh: '家屋名標示出生的那個家。離開本家另立新家，家屋名會跟著換。',
      en: 'The house name marks the house a person was born into; founding a new house means a new house name.',
      ja: '家屋名は生まれた家を示す。分家すれば家屋名も変わる。',
    },
  },
  {
    name: { zh: '氏族名', en: 'Clan name', ja: '氏族名' },
    form: {
      zh: '自己的名＋氏族名',
      en: 'own name + clan name',
      ja: '本人の名＋氏族名',
    },
    peoples: {
      zh: '布農、鄒、邵、卡那卡那富、拉阿魯哇',
      en: 'Bunun, Tsou, Thao, Kanakanavu, Hla’alua',
      ja: 'ブヌン、ツォウ、サオ、カナカナブ、サアロア',
    },
    note: {
      zh: '結構最接近「名＋姓」，只是順序是名在前。',
      en: 'Structurally the closest to “given name + surname”, with the given name first.',
      ja: '構造は「名＋姓」に最も近いが、名が先に来る。',
    },
  },
  {
    name: { zh: '親從子名', en: 'Teknonymy', ja: '親従子名（テクノニミー）' },
    form: {
      zh: '稱謂＋長嗣的名',
      en: 'kin term + first child’s name',
      ja: '呼称＋最初の子の名',
    },
    peoples: { zh: '雅美（達悟）', en: 'Yami (Tao)', ja: 'ヤミ（タオ）' },
    note: {
      zh: '第一個孩子出生後，父母與祖父母的名字都跟著改，一生會換好幾個名字。',
      en: 'When a first child is born, parents and grandparents all take new names; a person is renamed several times in a lifetime.',
      ja: '最初の子が生まれると父母・祖父母の名も変わる。一生のうちに何度も名が変わる。',
    },
  },
];

export interface VoiceItem {
  text: L3;
  src: string;
}
export interface VoiceSide {
  title: L3;
  items: VoiceItem[];
}

/** §3 拼音：各方說法（並列，不下結論） */
export const ROMAN_VOICES: VoiceSide[] = [
  {
    title: {
      zh: '主張用漢語拼音',
      en: 'For Hanyu Pinyin',
      ja: '漢語拼音を支持する立場',
    },
    items: [
      {
        text: {
          zh: '教育部執行秘書陳雪玉（2008）：外籍人士反映各縣市譯音不一致，改採漢語拼音是「以實用作為考量」。',
          en: 'Chen Hsueh-yu, Ministry of Education (2008): foreigners reported inconsistent spellings between cities; the switch was made on practical grounds.',
          ja: '教育部の陳雪玉執行秘書（2008年）：自治体ごとに表記が異なると外国人から指摘があり、実用面を考えて漢語拼音に改めたと説明。',
        },
        src: 'S17',
      },
      {
        text: {
          zh: '領事事務局的系統介紹：漢語拼音是國際標準組織採認的中文羅馬拼音標準，通用於國際學術出版與圖書資訊。',
          en: 'Bureau of Consular Affairs notes: Hanyu Pinyin is the ISO-recognised standard, widely used in academic publishing and library systems.',
          ja: '領事事務局の解説：漢語拼音はISOが採用する標準で、国際的な学術出版や図書情報で広く使われている。',
        },
        src: 'S4',
      },
    ],
  },
  {
    title: {
      zh: '主張用通用拼音或本土拼音',
      en: 'For Tongyong or locally designed systems',
      ja: '通用拼音・台湾独自の方式を支持する立場',
    },
    items: [
      {
        text: {
          zh: '通用拼音設計者余伯泉（2000）：通用拼音要在國際化與自主之間取得平衡，也說兩套系統可以並存。',
          en: 'Yu Bor-chuan, designer of Tongyong Pinyin (2000): the system seeks a balance between internationalisation and autonomy; he also said the two could coexist.',
          ja: '通用拼音の設計者・余伯泉（2000年）：国際化と自主性のバランスを取る方式であり、二つの方式は併存できるとも述べた。',
        },
        src: 'S18',
      },
      {
        text: {
          zh: '台灣華語拼音聯盟執行長張淑芬（2008）：反對全面改制，主張專有名詞的拼音應該「名從主人」，並質疑改制的花費。',
          en: 'Chang Shu-fen, Taiwan Pinyin Alliance (2008): opposed the wholesale switch, argued that proper names should follow the owner’s choice, and questioned the cost.',
          ja: '台湾華語拼音連盟の張淑芬執行長（2008年）：全面的な切り替えに反対し、固有名詞の表記は「名は主人に従う」べきだと主張、費用にも疑問を呈した。',
        },
        src: 'S19',
      },
    ],
  },
  {
    title: {
      zh: '現行規定怎麼處理人名',
      en: 'What the rules say about personal names',
      ja: '現行規定での人名の扱い',
    },
    items: [
      {
        text: {
          zh: '《中文譯音使用原則》：護照外文姓名「鼓勵使用漢語拼音」，人名的譯寫「均得尊重當事人之意願」。',
          en: 'The guidelines “encourage” Hanyu Pinyin for passport names, and say the person’s wishes are to be respected.',
          ja: '『中文訳音使用原則』：パスポート名には漢語拼音を「奨励」しつつ、人名の表記は本人の意思を尊重できるとしている。',
        },
        src: 'S7',
      },
      {
        text: {
          zh: '領事事務局：中譯英系統僅供參考，沒有強制申請人只能用哪一種拼音。',
          en: 'Bureau of Consular Affairs: its conversion tool is for reference only; applicants are not required to use any one system.',
          ja: '領事事務局：変換システムは参考用であり、特定の方式の使用を申請者に強制していない。',
        },
        src: 'S5',
      },
    ],
  },
];

/** §5 單列族語名字：各方說法 */
export const INDIGENOUS_VOICES: VoiceSide[] = [
  {
    title: {
      zh: '推動單列的一方',
      en: 'Those who pushed for it',
      ja: '単独登記を求めた側',
    },
    items: [
      {
        text: {
          zh: 'Bawtu Payen（行政訴訟原告）：以姓名權與人格權為主張，訴訟打了約兩年半，2023 年勝訴。',
          en: 'Bawtu Payen (plaintiff): argued from the right to one’s name and personality rights; won in 2023 after about two and a half years in court.',
          ja: 'Bawtu Payen氏（行政訴訟の原告）：氏名権と人格権を主張し、約2年半の訴訟を経て2023年に勝訴。',
        },
        src: 'S20',
      },
      {
        text: {
          zh: '民間司法改革基金會等八個團體（2024）：肯定修法，同時要求檢討回復族名「以一次為限」的規定。',
          en: 'Eight civic groups (2024): welcomed the amendment and asked lawmakers to revisit the rule that a name may be restored only once.',
          ja: '民間司法改革基金会など8団体（2024年）：改正を評価しつつ、伝統名の回復を「1回限り」とする規定の見直しを求めた。',
        },
        src: 'S21',
      },
    ],
  },
  {
    title: {
      zh: '行政機關提出的顧慮',
      en: 'Concerns raised by agencies',
      ja: '行政機関が示した懸念',
    },
    items: [
      {
        text: {
          zh: '內政部戶政司：戶政系統的中文姓名與羅馬拼音分欄，其他機關若只讀中文欄，單列族名的人辦事可能卡住，各機關系統要配套調整。',
          en: 'MOI household registration: Chinese names and romanized names sit in separate fields; agencies that read only the Chinese field may fail on single-listed names, so systems need adjusting together.',
          ja: '内政部戸政司：戸籍システムでは中国語氏名とローマ字が別欄になっており、他機関が中国語欄しか読まない場合に支障が出る恐れがあるため、各機関のシステム調整が必要だと説明。',
        },
        src: 'S20',
      },
      {
        text: {
          zh: '原民會處長雲天寶（2024）：流通的文書以漢語為主，改回傳統名字要換掉所有證件，並列羅馬拼音又缺少誘因。',
          en: 'Yun Tien-pao, Council of Indigenous Peoples (2024): most paperwork runs in Chinese, restoring a name means replacing every document, and adding a romanized form offers little incentive.',
          ja: '原住民族委員会の雲天寶処長（2024年）：流通する文書は中国語が中心で、伝統名に戻すとすべての証明書を作り直す必要があり、ローマ字併記には動機づけが乏しいと述べた。',
        },
        src: 'S22',
      },
    ],
  },
  {
    title: {
      zh: '上路之後的第一線',
      en: 'On the ground since',
      ja: '施行後の現場',
    },
    items: [
      {
        text: {
          zh: '公視報導（2026）：族名並列之後，印章要改刻橫式，各金融機構的要求不一致。',
          en: 'PTS News (2026): after adding an Indigenous name, people need new horizontal seals, and banks ask for different things.',
          ja: '公視の報道（2026年）：民族名を併記した後、印鑑を横書きに作り直す必要があり、金融機関ごとに求められる対応が異なる。',
        },
        src: 'S23',
      },
    ],
  },
];

/** §7 新住民中文姓名：各方說法 */
export const IMMIGRANT_VOICES: VoiceSide[] = [
  {
    title: {
      zh: '主張放寬',
      en: 'For loosening the rule',
      ja: '緩和を求める立場',
    },
    items: [
      {
        text: {
          zh: '法務部參事彭坤業（2011）：外國人與我國的命名方式不同，法律不宜硬性規定一定要用特定中文字命名。',
          en: 'Peng Kun-yeh, Ministry of Justice (2011): naming customs differ, and the law should not force a particular set of Chinese characters on people.',
          ja: '法務部の彭坤業参事（2011年）：外国人と台湾では命名の仕方が異なり、特定の漢字での命名を法律で一律に強いるべきではないと発言。',
        },
        src: 'S28',
      },
    ],
  },
  {
    title: {
      zh: '行政機關的做法',
      en: 'What the administration did',
      ja: '行政側の対応',
    },
    items: [
      {
        text: {
          zh: '內政部 2012 年會議決議：為尊重多元文化並兼顧民情，「習慣」只指姓在前、名在後，可以用外文音譯；仍須取中文姓名，用字限字典所列。',
          en: 'A 2012 MOI decision: out of respect for cultural diversity, “custom” means only surname-first order, and transliterations are fine; a Chinese name is still required and must use dictionary characters.',
          ja: '内政部の2012年の決定：多文化を尊重しつつ、「慣習」とは姓が先・名が後という順序のみを指し、音訳も可とした。ただし中国語氏名は必須で、使える字は辞書収録字に限る。',
        },
        src: 'S14',
      },
    ],
  },
];
