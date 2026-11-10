/**
 * names.ts — /names（台灣人的名字）專題的頁面文案表。
 *
 * 這張表不併進 src/i18n/ui.ts：專題文案量大、只有這兩頁用，放在自己的檔案裡，
 * 加語言只要加一個物件。fallback 順序跟全站一致（getFallbackChain）。
 * 目前有 zh-TW／en／ja 三語，三語各自撰寫，不是逐句互譯。
 *
 * 字串裡的兩種記號由模板處理：
 *   {name}        → 數字或名字，模板從 src/data/names/moi.json 取值填入（文案不手抄數字）
 *   [^S1 p.26]    → 來源編號，連到頁尾來源清單（id 對應 src/data/names/story.ts 的 SOURCES）
 *   **粗體**       → <strong>
 *
 * 書寫紀律：MANIFESTO §11。kicker 是詩句層，H2 是斷言層。
 */
import { getFallbackChain } from './utils';

type Dict = Record<string, string>;

const zh: Dict = {
  'meta.title': '台灣人的名字：姓氏、世代、拼音與族語',
  'meta.desc':
    '兩千三百萬人用 1,785 個姓，前十個就占一半。同一個名字在護照上有四套官方拼法，原住民族的名字可以只寫族語。官方統計畫成圖，附姓名拼音工具。',
  'hero.eyebrow': '專題 · 名字',
  'hero.title': '台灣人的名字',
  'hero.subtitle': '{nSurnames} 個姓、四套拼音，還有寫回族語的名字',
  'hero.verse':
    '一個名字，護照上可以有四種寫法，\n每一種都是官方的。\n這一頁把名字拆開來看：姓、名、聲音，還有誰來決定。',
  'hero.stat1.l': '全國的姓氏數',
  'hero.stat1.sub': '2023 年 6 月底',
  'hero.stat2.l': '前十大姓占人口',
  'hero.stat2.sub': '陳、林、黃、張、李、王、吳、劉、蔡、楊',
  'hero.stat3.l': '官方拼音對照表的音節數',
  'hero.stat3.sub': '四套拼音系統並列',
  'hero.stat4.l': '新生兒從母姓',
  'hero.stat4.sub': '2025 年 1 到 9 月，歷年最高',
  'anat.name': '王小明',
  'anat.surname': '姓',
  'anat.given': '名',
  'anat.cap':
    '這一頁用「王小明」當例子。照領事事務局的對照表，這三個字可以拼成四種，申請護照時由本人決定用哪一種。[^S3][^S5]',
  'hero.brief': '三分鐘版',
  'hero.jump': '段落導覽',
  'subnav.label': '段落',
  'common.src': '來源：',
  'common.table': '資料表',
  'common.related': '延伸閱讀',
  'common.people': '人',
  'common.rank': '排名',
  'common.share': '占總人口',
  'common.derived': '占比由人數除以總人口算出',
  'common.wan': '萬',
  'common.sep': '、',
  's2.roc': '民國 {a}–{b} 年',

  'toc.s0': '構造',
  'toc.s0.take': '姓在前、名在後，結婚不改姓。',
  'toc.s1': '姓氏',
  'toc.s1.take': '十個姓占了 {top10Pct}% 的人口。',
  'toc.s2': '年代',
  'toc.s2.take': '聽名字大概猜得到哪一年生。',
  'toc.s3': '拼音',
  'toc.s3.take': '同一個姓，官方對照表最多有四種拼法。',
  'toc.s4': '台語客語',
  'toc.s4.take': '護照可以照台語、客語的讀音拼。',
  'toc.s5': '原住民族',
  'toc.s5.take': '族語名字可以單獨寫在身分證上。',
  'toc.s6': '改名從姓',
  'toc.s6.take': '改名要有理由，從母姓升到 {momLatest}%。',
  'toc.s7': '英文名',
  'toc.s7.take': '英文名不是法定名字，歸化要取中文名。',
  'toc.s8': '怎麼用',
  'toc.s8.take': '稱呼、取名、查證的指引與全部來源。',

  's0.kicker': '姓在前，名在後。\n中間沒有別的東西。',
  's0.h2': '姓在前、名在後，法律規定的只有這個順序',
  's0.lede':
    '台灣人的本名是戶籍登記的那一個，法律規定只能有一個。[^S8] 它通常是一個字的姓加兩個字的名，沒有中間名，也沒有父名。先認得這個基本形狀，後面每一段都在講它的例外。',
  's0.c1.h': '姓在前，名在後',
  's0.c1.p':
    '《姓名條例》第 3 條寫明姓氏在前、名字在後，中間不加空格或符號。[^S8] 全國 {nSurnames} 個姓裡，{nCompound} 個是複姓，共 {compoundPop} 人，人數最多的是張簡、歐陽、范姜。[^S1 p.24, 28]',
  's0.c2.h': '名字的長度',
  's0.c2.p':
    '名只有一個字的有 {singlePop} 人，占 {singlePct}%。姓名超過六個字（不含用間隔號或空格分開的）有 {longTotal} 人，其中 {longIndPct}% 具原住民身分。[^S1 p.60, 83] 兩個字、三個字、四個字各占多少，內政部的報告沒有統計。',
  's0.c3.h': '結婚不改姓',
  's0.c3.p':
    '《民法》第 1000 條：夫妻各保有其本姓，可以書面約定冠配偶的姓。[^S13] 目前仍冠配偶姓的有 {spouseTotal} 人，占總人口 {spousePct}%，其中 {spouseFemPct}% 是女性。[^S1 p.37]',
  's0.c4.h': '英文名字不在戶籍上',
  's0.c4.p':
    '很多人有一個日常使用的英文名字，但戶籍只登記中文姓名。護照上的英文是中文姓名的音譯，另外可以申請一個「外文別名」。[^S6]',

  's1.kicker': '陳、林、黃、張、李。\n念到第十個，\n已經過了半個台灣。',
  's1.h2': '十個姓，占了 {top10Pct}% 的人口',
  's1.lede':
    '內政部每隔幾年把全國戶籍的姓名數一次。最近一次是 2023 年 6 月底：{nSurnames} 個姓，分給 2,337 萬人。[^S1 p.24] 分得很不平均。',
  's1.conc.title': '前十大姓占一半，前一百大姓占 {top100Pct}%',
  's1.conc.sub': '全國姓氏依人口排序後的累計占比',
  's1.conc.l0': '第 1 到 10 姓',
  's1.conc.l1': '第 11 到 20 姓',
  's1.conc.l2': '第 21 到 100 姓',
  's1.conc.l3': '其餘 {restSurnames} 個姓與其他',
  's1.bars.title': '每九個人就有一個姓陳',
  's1.bars.sub': '前二十大姓的人數（2023-06-30）',
  's1.bars.col1': '姓',
  's1.bars.col2': '人數',
  's1.tiles.title': '二十個縣市的第一大姓是陳，宜蘭與雲林是林',
  's1.tiles.sub':
    '大字是各縣市人數最多的姓，小字是進了該縣市前十名、卻不在全國前十名的姓',
  's1.tiles.legend':
    '<b class="cool">藍色</b>的兩格第一大姓是林。<b class="warm">橘色小字</b>是地方榜單才有的姓，例如宜蘭的游、新竹縣的彭徐曾、澎湖的許洪呂、連江的曹鄭。',
  's1.p1':
    '姓陳的有 {chenN} 人，占 {chenPct}%。陳、林兩姓相加是 {chenLinPct}%，大約每五個人一個。[^S1 p.26] 排到第一百名，累計已經是 {top100Pct}%。',
  's1.p2':
    '名單的另一頭很長。全國只有一個人在用的姓有 {rareOne} 個，十個人以下的姓共 {rareTen} 個，占全部姓氏的 {rareTenPct}%。[^S1 p.52]',
  's1.p3':
    '地方的前十名跟全國不一樣。22 個縣市裡有 20 個第一大姓是陳，宜蘭縣與雲林縣是林。[^S1 p.30, 31] 報告只列出分布，沒有解釋成因，這一頁也不替它補。',
  's1.note':
    '<b>怎麼算的</b>　報告把「黃」與「黄」、「温」與「溫」當成不同的姓分開統計，這裡照原表，不合併。原住民族傳統姓名與外文音譯的姓名（共 {indOther} 人）不列入姓氏排序。[^S1 p.24, 41]',

  's2.kicker': '聽名字，\n大概猜得到哪一年生。',
  's2.h2': '淑芬生在六〇年代，雅婷生在八〇年代，品妍還在念中小學',
  's2.lede':
    '全國最多人用的名字，女生是淑芬（{shufenN} 人），男生是家豪（{jiahaoN} 人）。[^S1 p.56] 把同名的人照出生年排開，每個名字都擠在自己的那二十年。',
  's2.tbl.title': '每十年換一批名字',
  's2.tbl.sub':
    '各出生年代最多人用的名字（前三名）。人數是 2023 年 6 月底還設籍的同名者，不是當年的出生數',
  's2.col.years': '出生年',
  's2.col.f': '女',
  's2.col.m': '男',
  's2.more': '各年代前十名（資料表）',
  's2.p1':
    '全國 {shufenN} 位淑芬裡，{shufenPeak} 位生在 1961 到 1980 年，占 {shufenPeakPct}%。[^S1 p.281] 雅婷接手之後的二十年，再來是宜蓁與品妍。男生從正雄、武雄走到志明、志偉，再到家豪、承恩。',
  's2.p2':
    '表的最上面幾列人數很少，因為那幾代人大多已經不在戶籍上。最下面幾列人數也少，原因不同：出生的人變少了，名字也分散了。這兩個因素各占多少，報告沒有拆開。',
  's2.p3':
    '疊字名是另一個看得出性別的地方：全國 {redupPop} 人取疊字名，其中 {redupFemale} 人是女性，最多的是婷婷。[^S1 p.62]',
  's2.note':
    '<b>這張表不能拿來做什麼</b>　它只有每個年代的前十名。前十名以外的名字、名字與姓的組合，這一頁都沒有，也不提供。',

  's3.kicker': '護照上那一行英文，\n是你自己選的。',
  's3.h2': '同一個姓，官方對照表最多給四種拼法',
  's3.lede':
    '申請護照時，中文姓名要「逐字音譯為拉丁字母」。[^S6] 怎麼音譯，領事事務局提供一張對照表：{bocaRows} 個音節，每個音節並列四套系統的拼法。[^S3] 四套都可以用，領事事務局也寫明不強制用哪一套。[^S5]',
  's3.rom.title': '張可以是 CHANG、ZHANG、JHANG 或 JANG',
  's3.rom.sub': '前十五大姓在四套系統裡的拼法，橘色是跟威妥瑪拼法不同的格子',
  's3.col.han': '姓',
  's3.col.zy': '注音',
  's3.col.wg': '威妥瑪',
  's3.col.hanyu': '漢語拼音',
  's3.col.tongyong': '通用拼音',
  's3.col.mps2': '國音二式',
  's3.p1':
    '前十五大姓裡，{romSame} 個姓四套拼法完全相同（例如陳、林、黃、李、王），其餘的至少有兩種寫法。威妥瑪在護照上不寫送氣符號，所以張與常都是 CHANG。護照拼音也不標聲調，許與徐在每一套裡都拼得一樣。',
  's3.p2':
    '護照的規定只有幾條：姓在前、名在後、用逗號隔開，含空格不超過 39 個字母，換發護照要沿用原來的拼法，姓氏的拼法跟直系血親或兄弟姊妹不一樣的，可以申請改成一致。[^S6]',
  's3.p3':
    '全國的護照上哪一套用得最多，查不到官方或學術統計。這一頁不引用沒有出處的說法。',
  's3.tl.h': '拼音政策的幾個日期',
  's3.tool.h': '試試看：把名字拼成四種',
  's3.tool.p':
    '輸入漢字姓名，並列四套拼法。多音字可以自己選讀音。完整版（含反查念法與使用限制）在拼音工具頁。',
  's3.tool.more': '打開完整的拼音工具',
  's3.voices.h': '該用哪一套：各方說法',
  's3.voices.note':
    '<b>並列說明</b>　以下引述多半來自 2000 年與 2008 年兩次政策轉換時的報導，兩方的第一手聲明這次找到的都不多。',

  's4.kicker': '陳，華語念 Chén，\n台語念 Tân，\n客語念 Ciin。',
  's4.h2': '護照可以照台語、客語的讀音拼，2019 年寫進規定',
  's4.lede':
    '漢字是同一個，聲音不只一種。2019 年 8 月 9 日起，護照外文姓名依「國家語言讀音」音譯，不再限於華語。[^S6] 領事事務局請申請人參考教育部的台語與客語辭典。[^S3]',
  's4.tbl.title': '同一個姓，三種語言三種聲音',
  's4.tbl.sub':
    '前十二大姓的華語、台語、客語讀音。台語與客語照教育部辭典的姓氏讀音，點得到原條目',
  's4.col.mandarin': '華語（漢語拼音）',
  's4.col.taigi': '台語（臺羅）',
  's4.col.sixian': '客語四縣腔',
  's4.col.hailu': '客語海陸腔',
  's4.p1':
    '黃在台語念 N̂g，吳念 Ngôo，許念 Khóo，跟華語的拼法完全對不上。客語有六個腔調，同一個姓在四縣腔與海陸腔的聲調也不同。',
  's4.p2':
    '這一頁只列前三十大姓的姓氏讀音。名字怎麼用台語或客語念，請用教育部《臺灣台語常用詞辭典》與《臺灣客語辭典》的姓名查詢。[^S15][^S16] 外文別名的姓氏從 2016 年起就可以照母語讀音拼。已經領過護照的人，以讀音不符為理由改拼法，只能改一次。[^S6]',

  's5.kicker': '先是被改，後來可以改回，\n現在可以只寫族語。',
  's5.h2': '原住民族的名字，2024 年起可以只用族語文字登記',
  's5.lede':
    '原住民族各族有自己的命名方式，結構跟漢人的「姓加名」不一樣。1940 年起殖民政府開放臺灣人改日式姓名，戰後的政府要沒有漢名的原住民取漢名。1995 年法律開始允許改回傳統姓名，2024 年允許只寫族語。[^S8][^S12]',
  's5.tl.h': '從被改名到寫回族語',
  's5.sys.h': '五種名字的組法',
  's5.sys.p':
    '原住民族委員會把十六族的命名方式整理成五類。[^S11] 這是考究後整理出來的參考，每個族人實際的用法可能跟分類有出入。',
  's5.sys.who': '族別',
  's5.num.h': '有多少人用傳統名字',
  's5.p1':
    '2023 年 6 月底，原住民族人口 {indPop} 人，其中 {indParallel} 人的姓名並列羅馬拼音，占 {indParallelPct}%。2008 到 2022 年的十五年間，{indRestored} 人申請回復傳統姓名，{indBirthTrad} 人出生時就用傳統姓名登記，另有 {indRestoredHan} 人申請回復漢人姓名。[^S1 p.248, 250]',
  's5.p2':
    '2024 年修法之後，有多少人改成只寫族語，查不到官方公布的累計數字。原民會 2024 年的計畫文件寫登記傳統名字的族人「不到 4 萬人」，約占 6%，沒有標明統計日與算法。[^S32]',
  's5.p3':
    '原住民族人口的前十大姓是林、陳、黃、張、李、王、高、潘、吳、楊，合計占 {indTop10Pct}%。[^S1 p.38] 這些漢姓怎麼來的，上面的時間軸寫了。',
  's5.voices.h': '單列族語名字：各方說法',

  's6.kicker': '名字可以改，\n但法律要你說一個理由。',
  's6.h2': '改名的人一年比一年少，從母姓的新生兒來到 {momLatest}%',
  's6.lede':
    '司法院大法官 1996 年的釋字第 399 號解釋把姓名權列為人格權。[^S31] 《姓名條例》列出可以改名的七種情形，其中「字義粗俗不雅、音譯過長或有特殊原因」這一款有次數上限：三次。[^S8]',
  's6.nc.title': '改名人數九年少了 {ncDropPct}%',
  's6.nc.sub': '每年辦理名字變更的人數',
  's6.nc.col1': '年',
  's6.nc.col2': '改名人數',
  's6.p1':
    '2013 年有 {nc2013} 人改名，2022 年是 {nc2022} 人。[^S1 p.73] 三次的上限只算「特殊原因」這一款。跟同事同名同姓、被收養、原住民族基於文化慣俗改名，都不算在三次裡。',
  's6.salmon.h': '鮭魚之亂有多少人',
  's6.salmon.p':
    '2021 年 3 月，連鎖壽司店推出名字裡有「鮭魚」就免費的活動，兩天內各地有人到戶政事務所改名。人數沒有一份官方總表：報紙引戶政司資料寫 298 人申請、159 人已改回，[^S24] 立委質詢時引用的數字是 332 人。[^S25] 可以確定的寫法是「大約三百人」。《姓名條例》第 9 條三次的上限至今沒有變。',
  's6.mom.title':
    '從母姓的新生兒：2008 年 {mom2008}%，2025 年前九個月 {momLatest}%',
  's6.mom.sub': '各年出生登記從母姓的比率（%）。2025 年為 1 到 9 月',
  's6.mom.series': '從母姓',
  's6.mom.annot': '2025 年 1–9 月 {momLatest}%',
  's6.p2':
    '《民法》第 1059 條在 2007 年改成由父母在出生登記前書面約定子女從父姓或母姓，現行條文規定約定不成時在戶政事務所抽籤。[^S13] 2025 年 1 到 9 月的 {momLatestTotal} 名新生兒裡，{momLatestN} 人從母姓。父母雙方約定的占絕大多數，其中從母姓的是 {agreedMotherPct}%，由一方決定的 {oneParty} 人裡，{onePartyMotherPct}% 從母姓，抽籤決定的有 {draw} 人。[^S2]',
  's6.p3':
    '各縣市差很多：臺東縣 {taitung}%、花蓮縣 {hualien}% 最高。[^S2] 冠配偶姓則往另一個方向走，2018 到 2022 年新冠姓 {spFlowAdd} 人，撤銷冠姓 {spFlowRemove} 人。[^S1 p.72]',

  's7.kicker': '班上有三個 Kevin。\n戶口名簿上，一個也沒有。',
  's7.h2': '英文名字不是法定姓名，歸化的人則要取一個中文姓名',
  's7.lede':
    '兩件事方向相反。台灣人習慣替自己取一個英文名字，法律不管，外國人歸化成台灣人，法律要求取一個中文姓名。',
  's7.c1.h': '英文名字放在哪裡',
  's7.c1.p':
    '戶籍不登記英文名字。護照可以加一個「外文別名」，別名要有姓氏，姓氏跟外文姓名一致，或照中文姓氏的國家語言讀音音譯。[^S6] 持照期間第一次要加別名，得換發護照。[^S26]',
  's7.c2.h': '多少人有英文名字',
  's7.c2.p':
    '沒有全國性的調查。學術研究的樣本都很小，例如 2015 年一篇論文分析了某大學 248 位學生的英文名字。[^S29]',
  's7.c3.h': '歸化者的中文姓名',
  's7.c3.p':
    '《姓名條例》規定辦理戶籍登記、歸化或護照時應取用中文姓名，用字限通用字典所列。[^S8] 可以用原名的音譯，不必換成漢人的姓，歸化時原來的外文姓名可以用羅馬拼音並列登記，中文姓名可以更改一次。[^S27][^S14]',
  's7.c4.h': '「符合使用姓名之習慣」',
  's7.c4.p':
    '條文要求外籍配偶與歸化者的中文姓名符合「我國國民使用姓名之習慣」。內政部 2012 年把這句話解釋成只指姓在前、名在後，沒有姓的可以只登記名字。[^S14]',
  's7.voices.h': '新住民的中文姓名：找得到的說法',
  's7.voices.note':
    '<b>資料缺口</b>　這個題目有名有姓、有日期的公開論述，這次只找到 2011 到 2012 年的。2015 年修法之後的討論還沒有查到可靠來源。',

  's8.kicker': '名字是別人叫你的方式，\n也是你要別人怎麼叫你。',
  's8.h2': '怎麼用這一頁',
  's8.g1.h': '看到一個台灣名字，怎麼稱呼',
  's8.g1.p':
    '第一個字（複姓是前兩個字）是姓。稱呼用姓加稱謂，例如陳小姐、林老師。英文寫法有時把名放前面，名的兩個音節常用短橫連在一起。原住民族的名字不一定有姓，照本人的寫法與順序。',
  's8.g2.h': '替虛構角色取名',
  's8.g2.p':
    '先決定角色哪一年生，從年代表找那一代常見的字。再決定家裡說什麼語言，這會影響長輩怎麼叫他。最後決定護照上用哪一套拼音，同一家人的姓要拼得一樣。',
  's8.g3.h': '辦護照要拼音',
  's8.g3.p':
    '這一頁的工具只是對照表的另一種查法。實際辦理以領事事務局的規定與本人的舊護照、家人的拼法為準。',
  's8.g4.h': '尋根：家裡的拼法對不上',
  's8.g4.p':
    '長輩的姓可能是照台語、客語的讀音拼的，也可能用的是現在少見的拼音系統。用拼音工具的反查，可以看一個拼法落在哪一套系統。',
  's8.g5.h': '數字的日期',
  's8.g5.p':
    '姓氏與名字的統計是 2023 年 6 月 30 日的戶籍資料，內政部還沒有出新版。從母姓更新到 2025 年 9 月。法規以 2026 年 11 月的現行條文為準。',
  's8.g6.h': '這一頁沒有的',
  's8.g6.p':
    '姓氏的來源與堂號、名字的字義與吉凶、任意名字的人數查詢、名字產生器。前兩項找不到可查證的資料，後兩項官方沒有公開資料，我們也不打算做。',
  's8.sources.h': '來源',
  's8.sources.p':
    '頁面上每個數字旁的編號對應下面的清單。法規與政府統計連到原始文件，各方說法連到當時的報導。',
  's8.related.h': '站上相關的文章',
  's8.updated': '資料整理日期：',
  's8.corrections': '發現錯誤，請告訴我們',
  's8.tool': '姓名拼音工具',
  's8.data': '下載這一頁的資料',
  'rel.people': '名字本身有故事的人',

  // ── 拼音工具 ──
  'tool.tabsLabel': '工具模式',
  'tool.tabFwd': '漢字 → 拼音',
  'tool.tabRev': '拼音 → 怎麼念',
  'tool.inputLabel': '輸入中文姓名（只在你的瀏覽器裡計算，不會送出）',
  'tool.surnameLen': '姓是幾個字',
  'tool.slenAuto': '自動',
  'tool.slen1': '姓 1 字',
  'tool.slen2': '姓 2 字',
  'tool.outCaption': '四套拼音的護照格式拼法',
  'tool.noscript':
    '這個工具需要 JavaScript。沒有 JavaScript 時，可以直接查下面的官方對照表。',
  'tool.revLabel': '輸入護照或名片上的拼法（例：Hsieh Tsung-han）',
  'tool.revFoot':
    '反查只知道音節，不知道聲調，也不知道是哪個漢字。同一個拼法可能對應好幾個音。',
  'tool.privacy':
    '你輸入的內容只在這個頁面裡處理：不送到伺服器、不儲存，也不會自動寫進網址。',
  'tool.sysWg': '威妥瑪',
  'tool.sysWgSub': 'Wade–Giles',
  'tool.sysHanyu': '漢語拼音',
  'tool.sysHanyuSub': 'Hanyu Pinyin',
  'tool.sysTongyong': '通用拼音',
  'tool.sysTongyongSub': 'Tongyong Pinyin',
  'tool.sysMps2': '國音第二式',
  'tool.sysMps2Sub': 'MPS II',
  'tool.loading': '載入字音表⋯⋯',
  'tool.loadFail': '字音表載入失敗，請重新整理頁面再試一次。',
  'tool.warnNoHan':
    '沒有讀到漢字。原住民族的族語名字、英文名字不經過這個工具。',
  'tool.warnDropped': '這些不是漢字，已略過：{x}',
  'tool.warnOneChar': '只有一個字，當成姓處理。',
  'tool.warnCompound':
    '「{x}」是複姓，兩個字都當成姓。如果不是，請按「姓 1 字」。',
  'tool.warnFour':
    '四個字以上，先不切姓與名，整串逐字拼出。原住民族名字不分姓與名，建議以族語羅馬字為準，如果是複姓、冠配偶姓或雙姓，請按「姓 2 字」。',
  'tool.pickReading': '選擇「{x}」的讀音',
  'tool.unknownShort': '查無',
  'tool.warnUnknown': '字音表裡沒有「{x}」，無法拼音。',
  'tool.warnPoly': '「{x}」有 {n} 個讀音，目前用 {z}。可以在上面改選。',
  'tool.warnPolySurname':
    '「{x}」當姓時通常念 {z}，已經替你選好，其他讀音也可以改選。',
  'tool.warnNotOfficial':
    '「{x}」的讀音 {z} 不在官方對照表的 409 個音節裡，下面的拼法是照規則推的，僅供參考。',
  'tool.altSpelling': '官方表另列：{x}',
  'tool.copy': '複製',
  'tool.copied': '已複製',
  'tool.share': '複製分享連結',
  'tool.shareNote':
    '按了才會產生帶名字的連結（名字放在 # 後面，不會送到伺服器），平常輸入的內容不會出現在網址裡。',
  'tool.warn39': '這個拼法超過護照規定的 39 個字母（含空格）。',
  'tool.sayTitle': '怎麼念',
  'tool.sayZhuyin': '注音',
  'tool.sayPinyin': '拼音',
  'tool.speak': '🔊 聽聽看',
  'tool.infoLocal':
    '「{x}」的台語讀音是 {t}，客語四縣腔是 {h}（教育部辭典）。護照可以照這些讀音拼。',
  'tool.revTaigi': '也可能是「{x}」的台語讀音 {t}',
  'tool.revHakka': '也可能是「{x}」的客語四縣腔讀音 {t}',
  'tool.revNone':
    '不是四套華語拼音裡的音節。可能是台語、客語或原住民族語的拼法，可能是早期的其他拼音，也可能是英文名字。',

  // ── 拼音工具頁 ──
  'rz.meta.title': '姓名拼音工具 2026：中文姓名的四種護照拼法與念法',
  'rz.meta.desc':
    '輸入中文姓名，並列威妥瑪、漢語拼音、通用拼音、國音第二式四套護照拼法，附注音與念法，也能輸入拼音反查怎麼念。規則逐列對照領事事務局 2026 年對照表。',
  'rz.hero.eyebrow': '台灣人的名字 · 工具',
  'rz.hero.title': '姓名拼音工具',
  'rz.hero.subtitle': '一個中文名字的四種官方拼法，以及看到拼音時怎麼念',
  'rz.back': '← 回到「台灣人的名字」',
  'rz.limits.h': '這個工具做不到的事',
  'rz.limits.1':
    '它告訴你「照對照表會怎麼拼」。護照上實際的拼法以本人的舊護照、家人的姓氏拼法與本人的選擇為準，領事事務局不強制任何一套。',
  'rz.limits.2':
    '多音字只能把讀音列出來讓你選。大約 360 個罕見多音字沒有常用度資料，預設值只是清單的第一個。',
  'rz.limits.3':
    '字音表裡有 7 個音節不在官方對照表，遇到時會提醒，拼法僅供參考。',
  'rz.limits.4': '冠配偶姓與雙姓合用從字面看不出來，請用「姓是幾個字」切換。',
  'rz.limits.5':
    '原住民族的族語名字不經過這個工具。單列族語文字的人，護照外文姓名就是那個族語拼寫。',
  'rz.limits.6':
    '台語、客語只收前三十大姓的姓氏讀音，名字的讀音請用教育部辭典的姓名查詢。',
  'rz.limits.7': '反查不知道聲調，也分不出同音的漢字。',
  'rz.limits.8':
    '朗讀用的是你裝置上的語音，裝置沒有台灣華語語音時不會出現按鈕，念出來的腔調也因裝置而異。',
  'rz.how.h': '它怎麼算的',
  'rz.how.p1':
    '每個漢字先查讀音（注音），再照規則把注音轉成四套拼法。規則寫好之後，拿領事事務局對照表的 {bocaRows} 個音節逐格比對，四套系統全部一致才算通過。[^S3]',
  'rz.how.p2':
    '字的讀音來自小麥注音的字音資料（21,745 字），一個字有好幾個讀音時，預設用 Unicode Unihan 資料庫標示的台灣讀音。[^S30] 十五個多音姓（例如曾、沈、單、解）當姓時另外指定讀音。',
  'rz.table.h': '官方對照表全文',
  'rz.table.p':
    '外交部領事事務局〈護照外文姓名拼音對照表〉，2026 年 5 月 29 日版。原表註明僅供參考。',
  'rz.table.summary': '展開 {bocaRows} 個音節',
  'rz.col.zy': '注音',
  'rz.h.method': '拼法怎麼來的？',
  'common.scrollHint': '← 表格可以左右滑動 →',
  'date.amended': '修正',
  'date.filed': '行政院備查',
  'date.retrieved': '取用',
  'date.pinned': '釘版本',
  'date.asOf': '資料基準日',
  'date.decision': '會議決議',
  'date.updated': '更新',
  'rz.reading':
    '四列是同一個名字照四套系統拼出來的結果，格式跟護照一樣：姓在前、逗號、名的音節之間用短橫。上面每個字底下是它的注音，字有不只一個讀音時會變成下拉選單，改選之後四列一起更新。「怎麼念」那一行給注音、帶聲調的漢語拼音與國際音標。',
  'rz.disclaimer':
    '這個工具是對照表的另一種查法，不是申請文件。護照外文姓名以外交部領事事務局的規定與核發結果為準。',
  'rz.embedSource':
    '拼法：外交部領事事務局〈護照外文姓名拼音對照表〉，2026-05-29 版',
  'rz.related.main': '台灣人的名字：姓氏、世代、拼音與族語',
  'rz.related.spelling': '為什麼同一個姓有四種拼法',
  'rz.related.local': '台語、客語怎麼念這些姓',
  'rz.faq.1.q': '護照的英文名字一定要用哪一種拼音嗎？',
  'rz.faq.1.a':
    '不用。領事事務局的對照表並列四套系統，並說明沒有強制申請人只能用哪一種。已經領過護照的人，換發時沿用原來的拼法。',
  'rz.faq.2.q': '為什麼同一個姓，有人拼 Chang、有人拼 Zhang？',
  'rz.faq.2.a':
    '因為用的拼音系統不同。「張」在威妥瑪是 CHANG，漢語拼音是 ZHANG，通用拼音是 JHANG，國音第二式是 JANG，四種都在官方對照表上。',
  'rz.faq.3.q': '可以照台語或客語的讀音拼嗎？',
  'rz.faq.3.a':
    '可以。2019 年 8 月 9 日起，護照外文姓名依「國家語言讀音」音譯。這個工具附前三十大姓的台語與客語姓氏讀音，名字的讀音請查教育部的台語、客語辭典。',
  'rz.faq.4.q': '護照上的拼法之後可以改嗎？',
  'rz.faq.4.a':
    '換發護照原則上沿用原拼法。施行細則列出可以變更的情形，包括拼法跟國家語言讀音不符（以一次為限），以及姓氏拼法跟直系血親或兄弟姊妹不同。',
  'rz.faq.5.q': '看到 Hsieh、Tsai 這種拼法，要怎麼知道怎麼念？',
  'rz.faq.5.a':
    '切到「拼音 → 怎麼念」，輸入拼法。工具會列出它在哪一套系統裡是合法音節、對應哪個注音。Hsieh 是威妥瑪的 ㄒㄧㄝ（例如謝），Tsai 是 ㄘㄞ（例如蔡）。',
  'rz.faq.6.q': '我輸入的名字會被記錄嗎？',
  'rz.faq.6.a':
    '不會。計算都在你的瀏覽器裡完成，輸入的內容不會送到伺服器，也不會寫進網址，除非你自己按「複製分享連結」。',
};

const en: Dict = {
  'meta.title': 'Taiwanese Names: How They Work, Surnames and Spelling',
  'meta.desc':
    'How Taiwanese names work: family name first, ten surnames shared by half the country, names by generation, four official spellings, plus a passport-spelling converter.',
  'hero.eyebrow': 'Feature · Names',
  'hero.title': 'Taiwanese Names',
  'hero.subtitle':
    '{nSurnames} surnames, four spelling systems, and names written back into their own languages',
  'hero.verse':
    'One name can have four spellings on a passport,\nand every one of them is official.\nThis page takes a name apart: the family, the generation, the sound, and who gets to decide.',
  'hero.stat1.l': 'surnames in use',
  'hero.stat1.sub': 'as of 30 June 2023',
  'hero.stat2.l': 'of people share ten surnames',
  'hero.stat2.sub': 'Chen, Lin, Huang, Chang, Li, Wang, Wu, Liu, Tsai, Yang',
  'hero.stat3.l': 'syllables in the official table',
  'hero.stat3.sub': 'spelled in four systems side by side',
  'hero.stat4.l': 'of newborns take the mother’s surname',
  'hero.stat4.sub': 'Jan–Sep 2025, a record high',
  'anat.name': '王小明',
  'anat.surname': 'FAMILY NAME',
  'anat.given': 'GIVEN NAME',
  'anat.cap':
    'This page uses 王小明 (Wang Xiaoming) as its example. Under the Bureau of Consular Affairs table its three characters can be spelled four ways, and the passport applicant chooses.[^S3][^S5]',
  'hero.brief': 'The three-minute version',
  'hero.jump': 'Jump to a section',
  'subnav.label': 'Sections',
  'common.src': 'Source: ',
  'common.table': 'Data table',
  'common.related': 'Related',
  'common.people': '',
  'common.rank': 'Rank',
  'common.share': 'Share of population',
  'common.derived': 'share computed as count ÷ total population',
  'common.wan': '',
  'common.sep': ' · ',
  's2.roc': 'ROC {a}–{b}',

  'toc.s0': 'Structure',
  'toc.s0.take': 'Family name first. Marriage does not change it.',
  'toc.s1': 'Surnames',
  'toc.s1.take': 'Ten surnames cover {top10Pct}% of the population.',
  'toc.s2': 'Generations',
  'toc.s2.take': 'A given name usually tells you the decade.',
  'toc.s3': 'Spelling',
  'toc.s3.take': 'One surname, up to four official spellings.',
  'toc.s4': 'Taigi & Hakka',
  'toc.s4.take': 'A passport may follow Taiwanese or Hakka sounds.',
  'toc.s5': 'Indigenous names',
  'toc.s5.take': 'A name can now stand in its own language alone.',
  'toc.s6': 'Changing names',
  'toc.s6.take':
    'A name change needs a reason; {momLatest}% of babies take the mother’s surname.',
  'toc.s7': 'English names',
  'toc.s7.take':
    'English names are informal; new citizens must take a Chinese one.',
  'toc.s8': 'Using this page',
  'toc.s8.take':
    'How to address people, name a character, and check our sources.',

  's0.kicker': 'Family name first, given name after.\nNothing in between.',
  's0.h2': 'Family name first, given name after: the order is the only rule',
  's0.lede':
    'A person’s legal name in Taiwan is the one on the household register, and the law allows exactly one.[^S8] It is usually a one-character family name followed by a two-character given name. There is no middle name and no patronymic. If you have just met someone called Chen Yi-chun, she is Ms. Chen.',
  's0.c1.h': 'Which part is the family name?',
  's0.c1.p':
    'The first. The Name Act puts the surname before the given name with no space or symbol between them.[^S8] Of {nSurnames} surnames in use, {nCompound} are two-character compounds held by {compoundPop} people; the most common are 張簡 (Changchien), 歐陽 (Ouyang) and 范姜 (Fanchiang).[^S1 p.24, 28] In English text some people flip the order, so look for the hyphen: in “Tsai Ing-wen” the hyphenated pair is the given name.',
  's0.c2.h': 'How long is a name?',
  's0.c2.p':
    '{singlePop} people, {singlePct}% of the population, have a single-character given name. {longTotal} people have names longer than six characters (not counting names divided by a dot or space), and {longIndPct}% of them are Indigenous.[^S1 p.60, 83] The official report does not break down two-, three- and four-character names.',
  's0.c3.h': 'Marriage does not change a surname',
  's0.c3.p':
    'Under article 1000 of the Civil Code each spouse keeps their own surname, and may add the other’s in front by written agreement.[^S13] {spouseTotal} people ({spousePct}%) still carry a spouse’s surname this way; {spouseFemPct}% of them are women.[^S1 p.37] So a mother and her children usually have different surnames.',
  's0.c4.h': 'The English name is not on the register',
  's0.c4.p':
    'Many Taiwanese go by an English given name at school or work. It has no legal standing. The Latin-letter name in a passport is a transliteration of the Chinese name; an “alias” line can carry one more.[^S6]',

  's1.kicker':
    'Chen, Lin, Huang, Chang, Li.\nBy the tenth name\nyou have counted half of Taiwan.',
  's1.h2': 'Ten surnames cover {top10Pct}% of the population',
  's1.lede':
    'Every few years the Ministry of the Interior counts every name on the household register. The latest count, for 30 June 2023, found {nSurnames} surnames among 23.37 million people.[^S1 p.24] They are shared very unevenly.',
  's1.conc.title': 'The top ten cover half; the top hundred cover {top100Pct}%',
  's1.conc.sub':
    'Cumulative share of population, surnames ranked by number of bearers',
  's1.conc.l0': 'Surnames 1–10',
  's1.conc.l1': 'Surnames 11–20',
  's1.conc.l2': 'Surnames 21–100',
  's1.conc.l3': 'The other {restSurnames} surnames and unclassified names',
  's1.bars.title': 'One person in nine is a Chen',
  's1.bars.sub':
    'The twenty most common surnames, number of bearers (30 June 2023). Spelled in Wade–Giles, with Hanyu Pinyin in brackets where it differs',
  's1.bars.col1': 'Surname',
  's1.bars.col2': 'People',
  's1.tiles.title':
    'Chen leads in 20 of 22 counties and cities; Lin leads in Yilan and Yunlin',
  's1.tiles.sub':
    'Large character: the most common surname locally. Small characters: surnames in the local top ten that are not in the national top ten',
  's1.tiles.legend':
    'In the two <b class="cool">blue</b> tiles the leading surname is 林 (Lin). The <b class="warm">orange</b> characters are surnames found only in local rankings, for example 游 (Yu) in Yilan, 彭徐曾 (Peng, Hsu, Tseng) in Hsinchu County, 許洪呂 (Hsu, Hung, Lu) in Penghu and 曹鄭 (Tsao, Cheng) in Lienchiang.',
  's1.p1':
    '{chenN} people are named Chen, {chenPct}% of the population. Chen and Lin together make {chenLinPct}%, about one person in five.[^S1 p.26] By the hundredth surname the running total is {top100Pct}%.',
  's1.p2':
    'The other end of the list is long. {rareOne} surnames have exactly one bearer, and {rareTen} surnames, {rareTenPct}% of all surnames, have ten or fewer.[^S1 p.52]',
  's1.p3':
    'Local rankings differ from the national one. Chen is the largest surname in 20 of the 22 counties and cities; in Yilan and Yunlin it is Lin.[^S1 p.30, 31] The report lists the distribution without explaining it, and this page does not fill that in.',
  's1.note':
    '<b>How it is counted</b>　The report treats variant characters such as 黃 and 黄 as separate surnames; we follow it. Indigenous traditional names and transliterated foreign names ({indOther} people) are not ranked as surnames.[^S1 p.24, 41]',

  's2.kicker': 'Hear the name\nand you can guess the decade.',
  's2.h2':
    'Shu-fen was born in the 1960s, Ya-ting in the 1980s, and Pin-yen is still at school',
  's2.lede':
    'The most common given name for women is 淑芬 Shu-fen ({shufenN} people); for men it is 家豪 Chia-hao ({jiahaoN}).[^S1 p.56] Sort the bearers of any popular name by year of birth and they crowd into about twenty years.',
  's2.tbl.title': 'A new set of names every decade',
  's2.tbl.sub':
    'The three most common given names in each birth cohort. Counts are people of that name still on the register on 30 June 2023, not births. Spelled here in Wade–Giles as in the official table; real passports vary (see Spelling)',
  's2.col.years': 'Born',
  's2.col.f': 'Women',
  's2.col.m': 'Men',
  's2.more': 'Top ten for every cohort (data table)',
  's2.p1':
    'Of the {shufenN} women named Shu-fen, {shufenPeak} were born between 1961 and 1980: {shufenPeakPct}%.[^S1 p.281] Ya-ting took over for the next twenty years, then Yi-chen and Pin-yen. For men the line runs from Cheng-hsiung and Wu-hsiung to Chih-ming and Chih-wei, then Chia-hao and Cheng-en.',
  's2.p2':
    'Counts in the top rows are small because most of those generations are no longer on the register. Counts in the bottom rows are small for a different reason: fewer babies, spread over more names. The report does not separate the two effects.',
  's2.p3':
    'Doubled-character names are another strongly gendered pattern: {redupPop} people have one, and {redupFemale} of them are women. The most common is 婷婷 Ting-ting.[^S1 p.62]',
  's2.note':
    '<b>What this table is not</b>　It holds only the top ten names per cohort. Names outside the top ten, and combinations of surname and given name, are not on this page and we do not provide them.',

  's3.kicker':
    'That line of Latin letters in the passport?\nThe holder picked it.',
  's3.h2': 'One surname, up to four official spellings',
  's3.lede':
    'A passport name is the Chinese name “transliterated character by character into Latin letters”.[^S6] For how, the Bureau of Consular Affairs publishes a table: {bocaRows} syllables, each spelled in four systems.[^S3] All four are acceptable, and the Bureau says it does not require any one of them.[^S5] This is why two Taiwanese colleagues with the same surname may spell it differently.',
  's3.rom.title': '張 can be CHANG, ZHANG, JHANG or JANG',
  's3.rom.sub':
    'The fifteen most common surnames in all four systems. Orange cells differ from the Wade–Giles spelling',
  's3.col.han': 'Surname',
  's3.col.zy': 'Zhuyin',
  's3.col.wg': 'Wade–Giles',
  's3.col.hanyu': 'Hanyu Pinyin',
  's3.col.tongyong': 'Tongyong Pinyin',
  's3.col.mps2': 'MPS II',
  's3.p1':
    'Of the fifteen most common surnames, {romSame} are spelled the same in all four systems (Chen, Lin, Huang, Li and Wang among them); the rest have at least two spellings. Passport Wade–Giles drops the apostrophes that mark aspiration, so 張 and 常 are both CHANG. No system marks tones on a passport, so 許 and 徐 are spelled alike in each of them.',
  's3.p2':
    'The passport rules themselves are short: surname first, a comma, then the given name, at most 39 letters including spaces; a renewed passport keeps the old spelling; and a surname spelled differently from that of a lineal relative or sibling may be changed to match.[^S6]',
  's3.p3':
    'Which system is most common on real passports? We found no official or academic count, and this page does not repeat unsourced claims.',
  's3.tl.h': 'The policy, by date',
  's3.tool.h': 'Try it: one name, four spellings',
  's3.tool.p':
    'Type a name in Chinese characters to see all four spellings. Where a character has more than one reading, you choose. The full tool also works backwards, from a spelling to its pronunciation.',
  's3.tool.more': 'Open the full romanization tool',
  's3.voices.h': 'Which system should be used? The positions',
  's3.voices.note':
    '<b>A note on balance</b>　Most of these statements come from press coverage of the two policy changes, in 2000 and 2008. We found few first-hand statements from either side.',

  's4.kicker': '陳 is Chén in Mandarin,\nTân in Taiwanese,\nCiin in Hakka.',
  's4.h2':
    'Since 2019 a passport may follow the Taiwanese or Hakka pronunciation',
  's4.lede':
    'The character is the same; the sound is not. From 9 August 2019 passport names are transliterated from the reading “in a national language”, no longer only Mandarin.[^S6] The Bureau of Consular Affairs points applicants to the Ministry of Education’s Taiwanese and Hakka dictionaries.[^S3]',
  's4.tbl.title': 'One surname, three languages, three sounds',
  's4.tbl.sub':
    'The twelve most common surnames in Mandarin, Taiwanese (Taigi) and Hakka. Taiwanese and Hakka readings are the surname readings in the Ministry of Education dictionaries; each links to its entry',
  's4.col.mandarin': 'Mandarin (Hanyu Pinyin)',
  's4.col.taigi': 'Taiwanese (Tâi-lô)',
  's4.col.sixian': 'Hakka, Sixian',
  's4.col.hailu': 'Hakka, Hailu',
  's4.p1':
    '黃 is N̂g in Taiwanese, 吳 is Ngôo and 許 is Khóo, none of which resembles the Mandarin spelling. Hakka has six varieties in Taiwan, and the same surname takes different tones in Sixian and Hailu.',
  's4.p2':
    'This page lists surname readings for the thirty most common surnames only. For given names, use the name look-up in the Ministry of Education’s Taiwanese and Hakka dictionaries.[^S15][^S16] The surname in a passport alias could already follow a mother-tongue reading from 2016. Someone who already holds a passport may change the spelling on the ground that it does not match the pronunciation, once.[^S6]',

  's5.kicker':
    'First changed by others, then restorable,\nnow registrable in its own script.',
  's5.h2':
    'Since 2024 an Indigenous name can be registered in its own script alone',
  's5.lede':
    'Each of Taiwan’s Indigenous peoples has its own way of naming, built differently from the Han “surname plus given name”. From 1940 the colonial government opened Japanese-style names to Taiwanese; after the war the new government had Indigenous people without a Chinese-style name adopt one. In 1995 the law began to allow traditional names back; in 2024 it allowed them to stand without Chinese characters.[^S8][^S12]',
  's5.tl.h': 'From renamed to written in their own language',
  's5.sys.h': 'Five ways to build a name',
  's5.sys.p':
    'The Council of Indigenous Peoples groups the naming customs of the sixteen recognised peoples into five types.[^S11] It is a reference compiled by the Council; what an individual actually does may differ from the classification.',
  's5.sys.who': 'Peoples',
  's5.num.h': 'How many people use a traditional name',
  's5.p1':
    'On 30 June 2023 there were {indPop} Indigenous people on the register; {indParallel} of them, {indParallelPct}%, had a romanized name registered beside their name. Over the fifteen years from 2008 to 2022, {indRestored} people applied to restore a traditional name, {indBirthTrad} were registered with one at birth, and {indRestoredHan} applied to go back to a Han name.[^S1 p.248, 250]',
  's5.p2':
    'We found no published total for how many people have switched to an Indigenous-script-only name since 2024. A 2024 Council planning document says fewer than 40,000 people, about 6%, have registered a traditional name, without giving a date or method.[^S32]',
  's5.p3':
    'The ten most common surnames among Indigenous people are Lin, Chen, Huang, Chang, Li, Wang, Kao, Pan, Wu and Yang, together {indTop10Pct}%.[^S1 p.38] The timeline above explains where those Han surnames came from.',
  's5.voices.h': 'Names in Indigenous script only: the positions',

  's6.kicker': 'A name can be changed.\nThe law asks for a reason.',
  's6.h2':
    'Fewer people change their names each year, and {momLatest}% of newborns now take the mother’s surname',
  's6.lede':
    'Judicial Yuan Interpretation No. 399 (1996) treats the right to one’s name as a personality right.[^S31] The Name Act lists seven grounds for changing a given name. One of them, that the name is “vulgar, too long when transliterated, or for other special reasons”, carries a limit: three times.[^S8]',
  's6.nc.title': 'Name changes fell {ncDropPct}% in nine years',
  's6.nc.sub': 'People who changed their given name, by year',
  's6.nc.col1': 'Year',
  's6.nc.col2': 'Name changes',
  's6.p1':
    '{nc2013} people changed their given name in 2013 and {nc2022} in 2022.[^S1 p.73] The limit of three applies only to the “special reasons” ground. Sharing a full name with a colleague, adoption, and changes made under Indigenous custom do not count toward it.',
  's6.salmon.h': 'How many people became “Salmon”?',
  's6.salmon.p':
    'In March 2021 a sushi chain offered free meals to anyone with the characters for “salmon” (鮭魚) in their name, and over two days people went to household registration offices to change theirs. There is no single official total. One newspaper, citing the household registration department, reported 298 applicants of whom 159 had already changed back;[^S24] a legislator cited 332.[^S25] “About three hundred” is as precise as the record allows. The limit of three in article 9 of the Name Act has not changed since.',
  's6.mom.title':
    'Newborns given the mother’s surname: {mom2008}% in 2008, {momLatest}% in the first nine months of 2025',
  's6.mom.sub':
    'Share of birth registrations taking the mother’s surname (%). 2025 covers January to September',
  's6.mom.series': 'Mother’s surname',
  's6.mom.annot': 'Jan–Sep 2025: {momLatest}%',
  's6.p2':
    'Article 1059 of the Civil Code was amended in 2007 so that parents agree in writing, before registration, whether a child takes the father’s or the mother’s surname; under the current text, if they cannot agree, lots are drawn at the registration office.[^S13] Of {momLatestTotal} babies registered in the first nine months of 2025, {momLatestN} took the mother’s surname. Where both parents agreed, which is nearly all cases, {agreedMotherPct}% chose the mother’s; of the {oneParty} decided by one parent, {onePartyMotherPct}% did; {draw} were settled by lot.[^S2]',
  's6.p3':
    'The rate varies widely: Taitung County {taitung}% and Hualien County {hualien}% are highest.[^S2] Adding a spouse’s surname is moving the other way: from 2018 to 2022, {spFlowAdd} people added one and {spFlowRemove} removed one.[^S1 p.72]',

  's7.kicker':
    'Three Kevins in one classroom.\nNot one of them on the household register.',
  's7.h2':
    'An English name has no legal standing; a new citizen must take a Chinese name',
  's7.lede':
    'Two rules that point in opposite directions. Taiwanese people often give themselves an English name, and the law does not care. A foreigner who naturalises is required to take a Chinese one.',
  's7.c1.h': 'Where an English name can go',
  's7.c1.p':
    'The household register holds no English name. A passport can carry one “alias”, which must include a surname: the same one as in the passport name, or a transliteration of the Chinese surname in a national language.[^S6] Adding an alias for the first time during a passport’s validity means getting a new passport.[^S26]',
  's7.c2.h': 'How many people have one?',
  's7.c2.p':
    'Nobody has counted nationally. The academic studies are small: a 2015 paper, for example, analysed the English names of 248 students at one university.[^S29]',
  's7.c3.h': 'The Chinese name of a naturalised citizen',
  's7.c3.p':
    'The Name Act requires a Chinese name for household registration, naturalisation or a passport, written in characters found in standard dictionaries.[^S8] It may be a transliteration of the original name and need not use a Han surname. The original name may be registered beside it in Latin letters, and the Chinese name may be changed once.[^S27][^S14]',
  's7.c4.h': '“In keeping with naming custom”',
  's7.c4.p':
    'The Act says the Chinese name of a foreign spouse or naturalised citizen must fit “the naming customs of nationals”. In 2012 the Ministry of the Interior read this to mean only surname-first order; a person with no surname may register a given name alone.[^S14]',
  's7.voices.h': 'Chinese names for new citizens: what we could find',
  's7.voices.note':
    '<b>A gap in the record</b>　The only attributable, dated statements we found on this question are from 2011–2012. We have not found reliable sources for the debate since the 2015 amendment.',

  's8.kicker':
    'A name is how other people call you,\nand how you ask to be called.',
  's8.h2': 'How to use this page',
  's8.g1.h': 'Addressing someone',
  's8.g1.p':
    'The first character (the first two, for a compound surname) is the family name. Use it with a title: Ms. Chen, Professor Lin. Do not shorten a hyphenated given name: Yi-chun is one name, not “Yi”. An Indigenous name may have no surname at all; follow the order and spelling the person uses.',
  's8.g2.h': 'Naming a fictional character',
  's8.g2.p':
    'Decide the birth year first and take characters that were common for that cohort; a teenager called Shu-fen would be as odd as a teenage Mildred. Decide what language the family speaks at home, which shapes what the grandparents call the character. Then pick one romanization system and keep the family surname consistent.',
  's8.g3.h': 'Spelling a name for a passport',
  's8.g3.p':
    'The tool here is another way to read the official table. What applies in practice is the Bureau of Consular Affairs’ rules, the applicant’s previous passport and the family’s existing spelling.',
  's8.g4.h': 'Family history: when the spelling does not match',
  's8.g4.p':
    'An older relative’s surname may have been spelled from the Taiwanese or Hakka pronunciation, or in a system that is rare today. The reverse look-up in the tool shows which system a spelling belongs to.',
  's8.g5.h': 'How current the numbers are',
  's8.g5.p':
    'Surname and given-name statistics are from the household register on 30 June 2023; the ministry has not published a newer edition. Mother’s-surname figures run to September 2025. Laws are as in force in November 2026.',
  's8.g6.h': 'What is not here',
  's8.g6.p':
    'Surname origins and clan halls, the meaning or luck of characters, look-ups for arbitrary names, and a name generator. For the first two we found no verifiable data; for the last two there is no public data and we do not intend to build them.',
  's8.sources.h': 'Sources',
  's8.sources.p':
    'The numbers beside each figure match the list below. Laws and government statistics link to the original documents, almost all in Chinese; statements by named people link to the reporting at the time.',
  's8.related.h': 'Related articles on Taiwan.md',
  's8.updated': 'Data compiled: ',
  's8.corrections': 'Found an error? Tell us',
  's8.tool': 'Name romanization tool',
  's8.data': 'Download the data behind this page',
  'rel.people': 'People whose names have a story',

  'tool.tabsLabel': 'Mode',
  'tool.tabFwd': 'Characters → spelling',
  'tool.tabRev': 'Spelling → pronunciation',
  'tool.inputLabel':
    'Enter a name in Chinese characters (computed in your browser; nothing is sent)',
  'tool.surnameLen': 'Length of the surname',
  'tool.slenAuto': 'Auto',
  'tool.slen1': '1-char surname',
  'tool.slen2': '2-char surname',
  'tool.outCaption': 'Passport-style spellings in four systems',
  'tool.noscript':
    'This tool needs JavaScript. Without it, you can read the official table below directly.',
  'tool.revLabel':
    'Enter a name as spelled on a passport or business card (e.g. Hsieh Tsung-han)',
  'tool.revFoot':
    'The reverse look-up knows syllables, not tones, and cannot tell which character was meant. One spelling may match several sounds.',
  'tool.privacy':
    'What you type stays on this page: it is not sent to a server, not stored, and not put in the URL unless you ask for a link.',
  'tool.sysWg': 'Wade–Giles',
  'tool.sysWgSub': '威妥瑪',
  'tool.sysHanyu': 'Hanyu Pinyin',
  'tool.sysHanyuSub': '漢語拼音',
  'tool.sysTongyong': 'Tongyong Pinyin',
  'tool.sysTongyongSub': '通用拼音',
  'tool.sysMps2': 'MPS II',
  'tool.sysMps2Sub': '國音第二式',
  'tool.loading': 'Loading the reading table…',
  'tool.loadFail':
    'The reading table failed to load. Reload the page and try again.',
  'tool.warnNoHan':
    'No Chinese characters found. Indigenous-language names and English names do not go through this tool.',
  'tool.warnDropped': 'Skipped because they are not Chinese characters: {x}',
  'tool.warnOneChar': 'Only one character, so it is treated as the surname.',
  'tool.warnCompound':
    '{x} is a compound surname, so both characters are treated as the surname. If that is wrong, choose “1-char surname”.',
  'tool.warnFour':
    'Four or more characters, so the name is not split into surname and given name and every character is spelled in turn. Indigenous names have no surname/given-name division, and the spelling in the person’s own language should take precedence. For a compound surname, a spouse’s surname added in front, or a double surname, choose “2-char surname”.',
  'tool.pickReading': 'Choose the reading of {x}',
  'tool.unknownShort': 'not found',
  'tool.warnUnknown':
    '{x} is not in the reading table, so it cannot be romanized.',
  'tool.warnPoly':
    '{x} has {n} readings; {z} is selected. You can change it above.',
  'tool.warnPolySurname':
    'As a surname {x} is usually read {z}, so that is selected; you can still choose another reading.',
  'tool.warnNotOfficial':
    'The reading {z} of {x} is not among the 409 syllables in the official table. The spellings below follow the rules but are only indicative.',
  'tool.altSpelling': 'The official table also lists: {x}',
  'tool.copy': 'Copy',
  'tool.copied': 'Copied',
  'tool.share': 'Copy a shareable link',
  'tool.shareNote':
    'The link will contain the name after a “#”, which is not sent to the server. Nothing you type appears in the URL unless you press this.',
  'tool.warn39':
    'This spelling is longer than the 39 letters (including spaces) a passport allows.',
  'tool.sayTitle': 'How to say it',
  'tool.sayZhuyin': 'Zhuyin',
  'tool.sayPinyin': 'Pinyin',
  'tool.speak': '🔊 Listen',
  'tool.infoLocal':
    'In Taiwanese {x} is read {t}; in Sixian Hakka, {h} (Ministry of Education dictionaries). A passport may follow these readings.',
  'tool.revTaigi': 'Could also be the Taiwanese reading {t} of the surname {x}',
  'tool.revHakka':
    'Could also be the Sixian Hakka reading {t} of the surname {x}',
  'tool.revNone':
    'Not a syllable in any of the four Mandarin systems. It may be spelled from Taiwanese, Hakka or an Indigenous language, it may use an older system, or it may be an English name.',

  'rz.meta.title':
    'Chinese Name Romanization Converter: Taiwan Passport Spelling 2026',
  'rz.meta.desc':
    'Convert a Chinese name to its Taiwan passport spelling in Wade–Giles, Hanyu Pinyin, Tongyong and MPS II, or look up how a romanized name is said.',
  'rz.hero.eyebrow': 'Taiwanese Names · Tool',
  'rz.hero.title': 'Name Romanization Tool',
  'rz.hero.subtitle':
    'The four official spellings of a Chinese name, and how to read a spelling aloud',
  'rz.back': '← Back to Taiwanese Names',
  'rz.limits.h': 'What this tool cannot do',
  'rz.limits.1':
    'It shows how the table would spell a name. The spelling on a real passport depends on the holder’s previous passport, the family’s surname spelling and the holder’s own choice; the Bureau of Consular Affairs does not impose a system.',
  'rz.limits.2':
    'For characters with several readings it can only list them for you to choose. About 360 rare characters have no frequency data, so the default is simply the first in the list.',
  'rz.limits.3':
    'Seven syllables in the reading table are not in the official table. The tool flags them, and those spellings are only indicative.',
  'rz.limits.4':
    'A spouse’s surname added in front, or a double surname, cannot be detected from the characters. Use the surname-length switch.',
  'rz.limits.5':
    'Indigenous-language names do not go through this tool. For someone registered in an Indigenous script only, that spelling is the passport name.',
  'rz.limits.6':
    'Taiwanese and Hakka readings cover the thirty most common surnames only. For given names use the Ministry of Education dictionaries.',
  'rz.limits.7':
    'The reverse look-up does not know tones and cannot tell homophones apart.',
  'rz.limits.8':
    'Speech uses the voice installed on your device. Without a Taiwan Mandarin voice the button does not appear, and accents differ between devices.',
  'rz.how.h': 'How it works',
  'rz.how.p1':
    'Each character is looked up for its reading in Zhuyin, and rules turn the Zhuyin into the four systems. The rules are then checked, cell by cell, against all {bocaRows} syllables of the Bureau of Consular Affairs table; they pass only if all four systems match.[^S3]',
  'rz.how.p2':
    'Readings come from the McBopomofo input method’s open data (21,745 characters). Where a character has several readings, the default is the Taiwan reading given in the Unicode Unihan database.[^S30] Fifteen surnames with a special reading (such as 曾, 沈, 單 and 解) are set by hand.',
  'rz.table.h': 'The official table in full',
  'rz.table.p':
    'Bureau of Consular Affairs, Passport Name Romanization Table, edition of 29 May 2026. The original is marked “for reference only”.',
  'rz.table.summary': 'Show all {bocaRows} syllables',
  'rz.col.zy': 'Zhuyin',
  'rz.h.method': 'Where do the spellings come from?',
  'common.scrollHint': '← swipe the table sideways →',
  'date.amended': 'amended',
  'date.filed': 'filed with the Executive Yuan',
  'date.retrieved': 'retrieved',
  'date.pinned': 'pinned at',
  'date.asOf': 'data as of',
  'date.decision': 'meeting decision',
  'date.updated': 'updated',
  'rz.reading':
    'The four rows are the same name in four systems, laid out as on a passport: surname, a comma, then the given name with a hyphen between syllables. Under each character is its reading in Zhuyin; where a character has more than one reading it becomes a menu, and all four rows update when you change it. The “How to say it” line gives Zhuyin, Hanyu Pinyin with tone marks, and IPA.',
  'rz.disclaimer':
    'This tool is another way of reading the official table, not an application form. The name on a passport is decided by the Bureau of Consular Affairs under its own rules.',
  'rz.embedSource':
    'Spellings: Bureau of Consular Affairs, Passport Name Romanization Table, 29 May 2026',
  'rz.related.main': 'Taiwanese Names: how they work',
  'rz.related.spelling': 'Why one surname has four spellings',
  'rz.related.local': 'The same surnames in Taiwanese and Hakka',
  'rz.faq.1.q': 'Which romanization system does Taiwan use for names?',
  'rz.faq.1.a':
    'There is no single one. The official passport table lists four systems side by side (Wade–Giles, Hanyu Pinyin, Tongyong Pinyin and MPS II), and the Bureau of Consular Affairs says applicants are not required to use any particular one. A renewed passport keeps the earlier spelling.',
  'rz.faq.2.q': 'Why is the same Taiwanese surname spelled Chang and Zhang?',
  'rz.faq.2.a':
    'They are the same surname, 張, in different systems: CHANG in Wade–Giles, ZHANG in Hanyu Pinyin, JHANG in Tongyong Pinyin and JANG in MPS II. All four appear in the official table.',
  'rz.faq.3.q': 'How do you pronounce Hsieh, Tsai or Hsu?',
  'rz.faq.3.a':
    'These are Wade–Giles spellings. Switch to “Spelling → pronunciation” and type the name: the tool shows the Zhuyin syllable, the Hanyu Pinyin equivalent and IPA. Hsieh is the syllable written xie in Pinyin, Tsai is cai and Hsu is xu.',
  'rz.faq.4.q':
    'Can a Taiwanese name be spelled from Taiwanese (Taigi) or Hakka?',
  'rz.faq.4.a':
    'Yes. Since 9 August 2019 a passport name may follow the reading in any national language, not only Mandarin. This tool gives Taiwanese and Hakka readings for the thirty most common surnames; for given names, use the Ministry of Education dictionaries.',
  'rz.faq.5.q': 'Can the spelling on a Taiwan passport be changed later?',
  'rz.faq.5.a':
    'A renewed passport normally keeps the old spelling. The rules allow a change in listed cases, including a spelling that does not match the pronunciation (once only) and a surname spelled differently from a parent’s or sibling’s.',
  'rz.faq.6.q': 'Is the name I type stored?',
  'rz.faq.6.a':
    'No. Everything is computed in your browser. What you type is not sent to a server and is not put in the URL unless you press “Copy a shareable link”.',
};

const ja: Dict = {
  'meta.title': '台湾人の名前：姓・世代・ローマ字表記・原住民族の名前',
  'meta.desc':
    '台湾人の名前の仕組みをデータで解説。上位10姓で人口の半分、世代で変わる名前、パスポートの四つの公式ローマ字、民族語で登記できる原住民族の名前。変換ツール付き。',
  'hero.eyebrow': '特集・名前',
  'hero.title': '台湾人の名前',
  'hero.subtitle':
    '{nSurnames}の姓、四つのローマ字方式、そして民族語に書き戻された名前',
  'hero.verse':
    '一つの名前に、パスポートでは四通りの綴りがありうる。\nどれも公式のもの。\nこのページでは名前を分解する。姓、名、音、そして誰が決めるのか。',
  'hero.stat1.l': '台湾全体の姓の数',
  'hero.stat1.sub': '2023年6月末',
  'hero.stat2.l': '上位10姓が人口に占める割合',
  'hero.stat2.sub': '陳・林・黃・張・李・王・吳・劉・蔡・楊',
  'hero.stat3.l': '公式対照表の音節数',
  'hero.stat3.sub': '四つの方式を併記',
  'hero.stat4.l': '母の姓を名乗る新生児',
  'hero.stat4.sub': '2025年1〜9月、過去最高',
  'anat.name': '王小明',
  'anat.surname': '姓',
  'anat.given': '名',
  'anat.cap':
    'このページでは「王小明」を例に使う。領事事務局の対照表に従うと、この三文字は四通りに綴ることができ、どれを使うかは申請する本人が決める。[^S3][^S5]',
  'hero.brief': '3分で読む',
  'hero.jump': 'セクションへ移動',
  'subnav.label': 'セクション',
  'common.src': '出典：',
  'common.table': 'データ表',
  'common.related': '関連記事',
  'common.people': '人',
  'common.rank': '順位',
  'common.share': '総人口比',
  'common.derived': '比率は人数÷総人口で算出',
  'common.wan': '万',
  'common.sep': '、',
  's2.roc': '民国{a}〜{b}年',

  'toc.s0': '構造',
  'toc.s0.take': '姓が先、名が後。結婚しても姓は変わらない。',
  'toc.s1': '姓',
  'toc.s1.take': '10の姓で人口の{top10Pct}%。',
  'toc.s2': '世代',
  'toc.s2.take': '名前を聞けば、生まれた年代の見当がつく。',
  'toc.s3': 'ローマ字',
  'toc.s3.take': '同じ姓に、公式の綴りが最大四つある。',
  'toc.s4': '台湾語・客家語',
  'toc.s4.take': 'パスポートは台湾語や客家語の読みでも綴れる。',
  'toc.s5': '原住民族',
  'toc.s5.take': '民族語の名前だけで身分証に登記できる。',
  'toc.s6': '改名・子の姓',
  'toc.s6.take': '改名には理由が要る。母の姓を名乗る新生児は{momLatest}%。',
  'toc.s7': '英語名',
  'toc.s7.take': '英語名は法的な名前ではない。帰化には中国語の氏名が必要。',
  'toc.s8': '使い方',
  'toc.s8.take': '呼び方、名付け、出典の確認。',

  's0.kicker': '姓が先、名が後。\nあいだには何も入らない。',
  's0.h2': '姓が先、名が後。法律が定めるのはこの順序だけ',
  's0.lede':
    '台湾人の本名は戸籍に登記された名前で、法律上一つに限られる。[^S8] 多くは一文字の姓に二文字の名が続く。漢字は日本と共通していても読みは違い、「陳」は「ちん」ではなく華語で Chén と読む。まずこの基本形を押さえておきたい。以下の各節はその例外の話である。',
  's0.c1.h': '姓が先、名が後',
  's0.c1.p':
    '『姓名条例』第3条は、姓を先、名を後とし、間に空白や記号を入れないと定める。[^S8] 全国{nSurnames}の姓のうち{nCompound}が二文字の複姓で、合わせて{compoundPop}人。多いのは張簡、欧陽、范姜。[^S1 p.24, 28]',
  's0.c2.h': '名前の長さ',
  's0.c2.p':
    '名が一文字の人は{singlePop}人で{singlePct}%。氏名が六文字を超える人（中黒や空白で区切る名を除く）は{longTotal}人で、その{longIndPct}%が原住民の身分を持つ。[^S1 p.60, 83] 二文字・三文字・四文字それぞれの割合は、内政部の報告書に統計がない。',
  's0.c3.h': '結婚しても姓は変わらない',
  's0.c3.p':
    '『民法』第1000条により、夫婦はそれぞれ自分の姓を保つ。書面で合意すれば配偶者の姓を自分の姓の前に付けることもできる。[^S13] 現在も配偶者の姓を冠している人は{spouseTotal}人（総人口の{spousePct}%）で、その{spouseFemPct}%が女性。[^S1 p.37]',
  's0.c4.h': '英語名は戸籍にない',
  's0.c4.p':
    '学校や職場で英語名を使う人は多いが、戸籍に登記されるのは中国語の氏名だけ。パスポートのローマ字は中国語氏名の音訳で、ほかに「外国語別名」を一つ記載できる。[^S6]',

  's1.kicker':
    '陳、林、黄、張、李。\n十番目まで数えれば、\n台湾の半分を過ぎている。',
  's1.h2': '10の姓が人口の{top10Pct}%を占める',
  's1.lede':
    '内政部は数年おきに全国の戸籍の氏名を集計している。最新は2023年6月末時点で、{nSurnames}の姓を2,337万人が名乗っている。[^S1 p.24] その分布は大きく偏っている。',
  's1.conc.title': '上位10姓で半分、上位100姓で{top100Pct}%',
  's1.conc.sub': '人口順に並べた姓の累計比率',
  's1.conc.l0': '1〜10位',
  's1.conc.l1': '11〜20位',
  's1.conc.l2': '21〜100位',
  's1.conc.l3': '残り{restSurnames}の姓とその他',
  's1.bars.title': '9人に1人が「陳」さん',
  's1.bars.sub': '上位20姓の人数（2023年6月30日）',
  's1.bars.col1': '姓',
  's1.bars.col2': '人数',
  's1.tiles.title': '22県市のうち20で最多は「陳」、宜蘭と雲林は「林」',
  's1.tiles.sub':
    '大きい字は各県市で最も多い姓。小さい字は、その県市の上位10に入るが全国上位10には入らない姓',
  's1.tiles.legend':
    '<b class="cool">青</b>の二つは最多の姓が「林」。<b class="warm">橙色の小さい字</b>は地域の順位にだけ現れる姓で、たとえば宜蘭の游、新竹県の彭・徐・曾、澎湖の許・洪・呂、連江の曹・鄭。',
  's1.p1':
    '陳姓は{chenN}人で{chenPct}%。陳と林を合わせると{chenLinPct}%、およそ5人に1人になる。[^S1 p.26] 100位まで数えると累計は{top100Pct}%に達する。',
  's1.p2':
    '一覧の反対側は長い。全国でただ一人しかいない姓が{rareOne}、10人以下の姓は{rareTen}で、姓全体の{rareTenPct}%を占める。[^S1 p.52]',
  's1.p3':
    '地域の上位10は全国と同じではない。22県市のうち20で最多は陳、宜蘭県と雲林県は林である。[^S1 p.30, 31] 報告書は分布を示すだけで理由には触れていない。このページもそこは補わない。',
  's1.note':
    '<b>集計について</b>　報告書は「黃」と「黄」、「温」と「溫」のような異体字を別の姓として数えている。ここでも原表のままとした。原住民族の伝統名と外国語の音訳名（計{indOther}人）は姓の順位に含まれない。[^S1 p.24, 41]',

  's2.kicker': '名前を聞けば、\n生まれた年代の見当がつく。',
  's2.h2': '淑芬は1960年代、雅婷は1980年代、品妍はいま小中学生',
  's2.lede':
    '全国で最も多い名は、女性が淑芬（{shufenN}人）、男性が家豪（{jiahaoN}人）。[^S1 p.56] 同じ名前の人を生年順に並べると、どの名前も二十年ほどの幅に集中している。',
  's2.tbl.title': '十年ごとに名前が入れ替わる',
  's2.tbl.sub':
    '出生年代ごとの最多の名（上位3）。人数は2023年6月末時点で戸籍にある同名者で、出生数ではない',
  's2.col.years': '生年',
  's2.col.f': '女性',
  's2.col.m': '男性',
  's2.more': '各年代の上位10（データ表）',
  's2.p1':
    '全国{shufenN}人の淑芬のうち{shufenPeak}人、{shufenPeakPct}%が1961〜1980年生まれ。[^S1 p.281] 続く二十年は雅婷、その後は宜蓁と品妍。男性は正雄・武雄から志明・志偉へ、さらに家豪、承恩へと移る。1931〜1950年生まれの男性では「雄」で終わる名が上位に並ぶ。この二十年の前半は日本統治期にあたる。',
  's2.p2':
    '表の上の数行は人数が少ない。その世代の多くがすでに戸籍にないためだ。下の数行も少ないが理由は別で、出生数が減り、名前も分散している。二つの要因の内訳は報告書では分けられていない。',
  's2.p3':
    '同じ字を重ねる名も性別がはっきり表れる。全国で{redupPop}人、うち{redupFemale}人が女性で、最多は婷婷。[^S1 p.62]',
  's2.note':
    '<b>この表でできないこと</b>　載っているのは各年代の上位10だけ。それ以外の名前や、姓と名の組み合わせはこのページになく、提供もしない。',

  's3.kicker': 'パスポートのあのローマ字は、\n本人が選んだもの。',
  's3.h2': '同じ姓に、公式の綴りが最大四つある',
  's3.lede':
    'パスポートを申請するとき、中国語の氏名は「一字ずつラテン文字に音訳」する。[^S6] その方法として領事事務局は対照表を公開している。{bocaRows}の音節それぞれに、四つの方式の綴りが並ぶ。[^S3] 四つとも使ってよく、領事事務局はどれか一つを強制しないと明記している。[^S5] そのため、同じ「張」さんでも綴りが違うことがある。',
  's3.rom.title': '「張」は CHANG、ZHANG、JHANG、JANG のどれにもなる',
  's3.rom.sub': '上位15姓の四方式での綴り。橙色はウェード式と異なるマス',
  's3.col.han': '姓',
  's3.col.zy': '注音',
  's3.col.wg': 'ウェード式',
  's3.col.hanyu': '漢語拼音',
  's3.col.tongyong': '通用拼音',
  's3.col.mps2': '国音第二式',
  's3.p1':
    '上位15姓のうち{romSame}は四方式とも同じ綴りになり（陳・林・黃・李・王など）、残りは少なくとも二通りに分かれる。パスポートのウェード式は有気音の記号を書かないので、張と常はどちらも CHANG になる。どの方式も声調を書かないため、許と徐はそれぞれの方式で同じ綴りになる。',
  's3.p2':
    'パスポートの規定そのものは少ない。姓が先、名が後、コンマで区切り、空白を含め39字以内。更新時は以前の綴りを引き継ぐ。親やきょうだいと姓の綴りが違う場合は、そろえる変更を申請できる。[^S6]',
  's3.p3':
    '実際のパスポートでどの方式が最も多いのか、公的・学術的な統計は見つからなかった。出典のない説はここでは引用しない。',
  's3.tl.h': 'ローマ字政策の主な日付',
  's3.tool.h': '試してみる：一つの名前を四通りに',
  's3.tool.p':
    '漢字で氏名を入力すると四方式の綴りが並ぶ。読みが複数ある字は自分で選べる。綴りから読みを調べる機能と制約の説明は、ツールのページにある。',
  's3.tool.more': 'ローマ字変換ツールを開く',
  's3.voices.h': 'どの方式を使うべきか：それぞれの主張',
  's3.voices.note':
    '<b>並べ方について</b>　以下の発言の多くは、2000年と2008年の二度の政策転換時の報道による。どちらの立場も、一次的な声明は今回あまり見つからなかった。',

  's4.kicker': '陳は、華語で Chén、\n台湾語で Tân、\n客家語で Ciin。',
  's4.h2': '2019年から、パスポートは台湾語や客家語の読みでも綴れる',
  's4.lede':
    '漢字は同じでも、音は一つではない。2019年8月9日から、パスポートの外国語氏名は「国家言語の読み」で音訳することになり、華語に限られなくなった。[^S6] 領事事務局は教育部の台湾語・客家語辞典を参照するよう案内している。[^S3]',
  's4.tbl.title': '同じ姓、三つの言語、三つの音',
  's4.tbl.sub':
    '上位12姓の華語・台湾語・客家語の読み。台湾語と客家語は教育部辞典の姓の読みで、各項目にリンクしている',
  's4.col.mandarin': '華語（漢語拼音）',
  's4.col.taigi': '台湾語（台羅）',
  's4.col.sixian': '客家語・四県',
  's4.col.hailu': '客家語・海陸',
  's4.p1':
    '黄は台湾語で N̂g、呉は Ngôo、許は Khóo と読み、華語の綴りとはまったく重ならない。客家語は台湾に六つの変種があり、同じ姓でも四県と海陸では声調が違う。',
  's4.p2':
    'このページに載せたのは上位30姓の姓の読みだけ。名の台湾語・客家語の読みは、教育部『台湾台語常用詞辞典』『台湾客語辞典』の氏名検索を使ってほしい。[^S15][^S16] 外国語別名の姓は、2016年からすでに母語の読みで綴ることができた。すでにパスポートを持つ人が読みとの不一致を理由に綴りを変えられるのは一度だけ。[^S6]',

  's5.kicker':
    'まず変えられ、やがて戻せるようになり、\nいまは民族語だけで登記できる。',
  's5.h2': '原住民族の名前は、2024年から民族語の文字だけで登記できる',
  's5.lede':
    '台湾の原住民族はそれぞれ独自の命名法を持ち、その構造は漢人の「姓＋名」とは異なる。1940年から総督府は台湾人に日本式氏名への改姓名を認め、戦後の政府は漢名を持たない原住民に漢名を定めさせた。1995年に法律が伝統名への回復を認め、2024年には漢字を伴わない登記も認めた。[^S8][^S12]',
  's5.tl.h': '改名させられてから、民族語に書き戻すまで',
  's5.sys.h': '名前の組み立て方、五つの型',
  's5.sys.p':
    '原住民族委員会は、16民族の命名慣習を五つの型に整理している。[^S11] 委員会がまとめた参考であり、一人ひとりの実際の用法は分類と異なることがある。',
  's5.sys.who': '民族',
  's5.num.h': '伝統名を使う人はどれくらいか',
  's5.p1':
    '2023年6月末の原住民族人口は{indPop}人。うち{indParallel}人（{indParallelPct}%）が氏名にローマ字を併記している。2008〜2022年の15年間に、{indRestored}人が伝統名への回復を申請し、{indBirthTrad}人が出生時から伝統名で登記され、{indRestoredHan}人が漢名への回復を申請した。[^S1 p.248, 250]',
  's5.p2':
    '2024年の改正後、民族語のみの表記に改めた人が何人いるか、公表された累計は見つからなかった。原住民族委員会の2024年の計画文書は、伝統名を登記した人を「4万人足らず」（約6%）としているが、統計の基準日と算出方法は示されていない。[^S32]',
  's5.p3':
    '原住民族人口の上位10姓は林・陳・黄・張・李・王・高・潘・呉・楊で、合わせて{indTop10Pct}%。[^S1 p.38] これらの漢姓がどこから来たかは、上の年表が示している。',
  's5.voices.h': '民族語のみの登記：それぞれの主張',

  's6.kicker': '名前は変えられる。\nただし法律は理由を求める。',
  's6.h2': '改名する人は年々減り、母の姓を名乗る新生児は{momLatest}%に',
  's6.lede':
    '1996年の司法院釈字第399号解釈は、氏名権を人格権の一つと位置づけた。[^S31] 『姓名条例』は名を変えられる場合を七つ挙げる。そのうち「字義が粗俗、音訳が長すぎる、または特別な理由がある」場合だけに回数の上限があり、三回までとされている。[^S8]',
  's6.nc.title': '改名者数は9年で{ncDropPct}%減',
  's6.nc.sub': '各年の名の変更人数',
  's6.nc.col1': '年',
  's6.nc.col2': '改名者数',
  's6.p1':
    '2013年の改名者は{nc2013}人、2022年は{nc2022}人。[^S1 p.73] 三回という上限は「特別な理由」の場合だけに適用される。同僚との同姓同名、養子縁組、原住民族の慣習にもとづく改名は回数に数えない。',
  's6.salmon.h': '「サーモン騒動」は何人だったのか',
  's6.salmon.p':
    '2021年3月、寿司チェーンが名前に「鮭魚」（サーモン）の字がある人を無料にする企画を行い、二日間に各地の戸政事務所で改名する人が出た。公式の総数は一つに定まらない。新聞は戸政司の資料として申請298人、うち159人がすでに元の名に戻したと報じ、[^S24] 立法委員は質疑で332人という数字を挙げた。[^S25] 確かに言えるのは「およそ300人」まで。『姓名条例』第9条の三回という上限は、その後も変わっていない。',
  's6.mom.title':
    '母の姓を名乗る新生児：2008年の{mom2008}%から、2025年1〜9月は{momLatest}%',
  's6.mom.sub': '出生登記で母の姓を選んだ割合（%）。2025年は1〜9月',
  's6.mom.series': '母の姓',
  's6.mom.annot': '2025年1〜9月 {momLatest}%',
  's6.p2':
    '『民法』第1059条は2007年の改正で、子が父母どちらの姓を名乗るかを出生登記の前に父母が書面で取り決めることとした。現行の条文では、決まらなければ戸政事務所で抽選になる。[^S13] 2025年1〜9月に生まれた{momLatestTotal}人のうち、{momLatestN}人が母の姓を名乗った。大半を占める父母の合意による場合、母の姓は{agreedMotherPct}%。一方が決めた{oneParty}人では{onePartyMotherPct}%が母の姓。抽選で決まったのは{draw}人。[^S2]',
  's6.p3':
    '県市による差は大きく、台東県{taitung}%、花蓮県{hualien}%が高い。[^S2] 配偶者の姓を冠する人は逆に減っている。2018〜2022年に新たに冠した人は{spFlowAdd}人、取り消した人は{spFlowRemove}人。[^S1 p.72]',

  's7.kicker': 'クラスに Kevin が三人。\n戸籍には一人もいない。',
  's7.h2':
    '英語名は法的な氏名ではなく、帰化する人は中国語の氏名を持つ必要がある',
  's7.lede':
    '向きが逆の二つの決まりがある。台湾の人は自分で英語名をつける習慣があるが、法律は関知しない。外国人が帰化するときは、法律が中国語の氏名を求める。',
  's7.c1.h': '英語名はどこに載るのか',
  's7.c1.p':
    '戸籍に英語名は登記されない。パスポートには「外国語別名」を一つ加えられる。別名には姓が必要で、外国語氏名の姓と同じにするか、中国語の姓を国家言語の読みで音訳する。[^S6] 有効期間中に初めて別名を加えるには、パスポートの再発行が必要になる。[^S26]',
  's7.c2.h': '英語名を持つ人の割合',
  's7.c2.p':
    '全国規模の調査はない。学術研究はいずれも小規模で、たとえば2015年の論文は一つの大学の学生248人の英語名を分析している。[^S29]',
  's7.c3.h': '帰化した人の中国語氏名',
  's7.c3.p':
    '『姓名条例』は、戸籍登記・帰化・パスポート申請の際に中国語の氏名を用いること、字は一般的な辞書にあるものに限ることを定める。[^S8] 元の名前の音訳でよく、漢人の姓に替える必要はない。帰化の際は元の外国語氏名をローマ字で併記でき、中国語氏名は一度だけ変更できる。[^S27][^S14]',
  's7.c4.h': '「氏名使用の慣習に合致」',
  's7.c4.p':
    '条文は、外国人配偶者や帰化者の中国語氏名が「国民の氏名使用の慣習」に合うことを求める。内政部は2012年、これを姓が先・名が後という順序だけを指すと解釈した。姓のない人は名だけを登記できる。[^S14]',
  's7.voices.h': '新住民の中国語氏名：見つかった主張',
  's7.voices.note':
    '<b>資料の空白</b>　この問題について、発言者と日付が確認できる公開の議論は、今回2011〜2012年のものしか見つからなかった。2015年の改正以降については信頼できる出典がまだない。',

  's8.kicker':
    '名前は、人があなたを呼ぶ方法であり、\nあなたが人にどう呼ばれたいかでもある。',
  's8.h2': 'このページの使い方',
  's8.g1.h': '台湾の人をどう呼ぶか',
  's8.g1.p':
    '最初の一文字（複姓なら二文字）が姓。「陳さん」「林先生」のように姓に敬称を付ける。漢字を日本語の音読みで読むか、華語の音で読むかは相手に尋ねるのがよい。原住民族の名前には姓がないこともあり、本人の書き方と順序に従う。',
  's8.g2.h': '創作で登場人物に名前を付ける',
  's8.g2.p':
    'まず生年を決め、年代表からその世代に多い字を選ぶ。次に家庭で話す言語を決める。祖父母がその人物をどう呼ぶかが変わる。最後にローマ字方式を一つ選び、家族の姓の綴りをそろえる。',
  's8.g3.h': 'パスポートの綴りを調べる',
  's8.g3.p':
    'ここのツールは公式の対照表を別の形で引けるようにしたもの。実際の手続きは領事事務局の規定、本人の以前のパスポート、家族の綴りによる。',
  's8.g4.h': 'ルーツ探し：綴りが合わないとき',
  's8.g4.p':
    '年長の親族の姓は、台湾語や客家語の読みで綴られていることも、いまは少ない方式で綴られていることもある。ツールの逆引きで、その綴りがどの方式に当たるかを確認できる。',
  's8.g5.h': '数字の時点',
  's8.g5.p':
    '姓と名の統計は2023年6月30日の戸籍データで、内政部はまだ新しい版を出していない。母の姓の統計は2025年9月まで。法令は2026年11月時点の現行条文による。',
  's8.g6.h': 'このページにないもの',
  's8.g6.p':
    '姓の由来や堂号、字の意味や吉凶、任意の名前の人数検索、名前の自動生成。前の二つは検証できる資料が見つからず、後の二つは公的なデータが公開されておらず、作る予定もない。',
  's8.sources.h': '出典',
  's8.sources.p':
    '本文中の番号は下の一覧に対応する。法令と政府統計は原文（ほぼすべて中国語）に、各立場の発言は当時の報道にリンクしている。',
  's8.related.h': 'Taiwan.md の関連記事',
  's8.updated': 'データ整理日：',
  's8.corrections': '誤りを見つけたらお知らせください',
  's8.tool': '名前のローマ字変換ツール',
  's8.data': 'このページのデータをダウンロード',
  'rel.people': '名前に物語のある人たち',

  'tool.tabsLabel': 'モード',
  'tool.tabFwd': '漢字 → ローマ字',
  'tool.tabRev': 'ローマ字 → 読み方',
  'tool.inputLabel':
    '中国語の名前を漢字（繁体字）で入力（計算はブラウザ内のみ。送信されません）',
  'tool.surnameLen': '姓の文字数',
  'tool.slenAuto': '自動',
  'tool.slen1': '姓1文字',
  'tool.slen2': '姓2文字',
  'tool.outCaption': '四方式によるパスポート形式の綴り',
  'tool.noscript':
    'このツールには JavaScript が必要です。使えない場合は、下の公式対照表を直接ご覧ください。',
  'tool.revLabel': 'パスポートや名刺の綴りを入力（例：Hsieh Tsung-han）',
  'tool.revFoot':
    '逆引きでわかるのは音節だけで、声調も、どの漢字かもわからない。一つの綴りが複数の音に当たることがある。',
  'tool.privacy':
    '入力内容はこのページの中だけで処理されます。サーバーに送らず、保存もせず、自動的にURLへ入ることもありません。',
  'tool.sysWg': 'ウェード式',
  'tool.sysWgSub': '威妥瑪 Wade–Giles',
  'tool.sysHanyu': '漢語拼音',
  'tool.sysHanyuSub': 'Hanyu Pinyin',
  'tool.sysTongyong': '通用拼音',
  'tool.sysTongyongSub': 'Tongyong Pinyin',
  'tool.sysMps2': '国音第二式',
  'tool.sysMps2Sub': 'MPS II',
  'tool.loading': '読みの表を読み込んでいます…',
  'tool.loadFail':
    '読みの表を読み込めませんでした。ページを再読み込みしてください。',
  'tool.warnNoHan':
    '漢字が見つかりません。原住民族の民族語の名前や英語名はこのツールの対象外です。',
  'tool.warnDropped': '漢字ではないため省きました：{x}',
  'tool.warnOneChar': '一文字だけなので、姓として扱います。',
  'tool.warnCompound':
    '「{x}」は複姓なので、二文字とも姓として扱います。違う場合は「姓1文字」を押してください。',
  'tool.warnFour':
    '四文字以上のため、姓と名に分けず、全体を一字ずつ綴っています。原住民族の名前は姓と名に分かれないので、民族語のローマ字を優先してください。複姓、配偶者の姓を冠した名、二つの姓を並べた名の場合は「姓2文字」を押してください。',
  'tool.pickReading': '「{x}」の読みを選ぶ',
  'tool.unknownShort': '該当なし',
  'tool.warnUnknown': '「{x}」は読みの表にないため、ローマ字にできません。',
  'tool.warnPoly':
    '「{x}」には読みが{n}つあり、いまは {z} を使っています。上で変更できます。',
  'tool.warnPolySurname':
    '「{x}」は姓としては通常 {z} と読むため、それを選んであります。ほかの読みにも変更できます。',
  'tool.warnNotOfficial':
    '「{x}」の読み {z} は公式対照表の409音節に含まれません。下の綴りは規則から導いた参考値です。',
  'tool.altSpelling': '公式表の別表記：{x}',
  'tool.copy': 'コピー',
  'tool.copied': 'コピーしました',
  'tool.share': '共有リンクをコピー',
  'tool.shareNote':
    '押したときだけ、名前を含むリンクが作られます（名前は # の後ろに入り、サーバーには送られません）。入力しただけではURLに名前は入りません。',
  'tool.warn39':
    'この綴りは、パスポートの上限である39字（空白を含む）を超えています。',
  'tool.sayTitle': '読み方',
  'tool.sayZhuyin': '注音',
  'tool.sayPinyin': '拼音',
  'tool.speak': '🔊 聞く',
  'tool.infoLocal':
    '「{x}」は台湾語で {t}、客家語（四県）で {h} と読む（教育部辞典）。パスポートはこれらの読みでも綴れる。',
  'tool.revTaigi': '姓「{x}」の台湾語の読み {t} の可能性もある',
  'tool.revHakka': '姓「{x}」の客家語（四県）の読み {t} の可能性もある',
  'tool.revNone':
    '華語の四方式のどの音節にも当たらない。台湾語・客家語・原住民族語による綴りか、古い別の方式か、英語名の可能性がある。',

  'rz.meta.title': '台湾人の名前 ローマ字変換・読み方 2026',
  'rz.meta.desc':
    '中国語の名前を入力すると、ウェード式・漢語拼音・通用拼音・国音第二式の四方式によるパスポート表記を表示。ローマ字から読み方も調べられます。台湾外交部の2026年対照表と照合済み。',
  'rz.hero.eyebrow': '台湾人の名前・ツール',
  'rz.hero.title': '名前のローマ字変換ツール',
  'rz.hero.subtitle':
    '中国語の名前の四つの公式表記と、ローマ字を見たときの読み方',
  'rz.back': '← 「台湾人の名前」に戻る',
  'rz.limits.h': 'このツールにできないこと',
  'rz.limits.1':
    '示すのは「対照表に従うとどう綴るか」。実際のパスポートの綴りは、本人の以前のパスポート、家族の姓の綴り、本人の選択によって決まり、領事事務局はどの方式も強制していない。',
  'rz.limits.2':
    '読みが複数ある字は、候補を並べて選んでもらうことしかできない。約360の珍しい字には頻度のデータがなく、初期値は候補の先頭にすぎない。',
  'rz.limits.3':
    '読みの表にある7つの音節は公式対照表にない。該当する場合は注意を表示し、綴りは参考値とする。',
  'rz.limits.4':
    '配偶者の姓を冠した名や二つの姓を並べた名は、字面からは判別できない。「姓の文字数」で切り替えてほしい。',
  'rz.limits.5':
    '原住民族の民族語の名前は対象外。民族語の文字のみで登記した人は、その表記がそのままパスポート名になる。',
  'rz.limits.6':
    '台湾語・客家語は上位30姓の姓の読みだけ。名の読みは教育部の辞典の氏名検索を使ってほしい。',
  'rz.limits.7': '逆引きは声調がわからず、同音の漢字も区別できない。',
  'rz.limits.8':
    '読み上げは端末の音声を使う。台湾華語の音声がない端末ではボタンが表示されず、発音も端末によって異なる。',
  'rz.how.h': '計算の仕組み',
  'rz.how.p1':
    'まず漢字ごとに読み（注音）を調べ、規則に従って注音を四方式の綴りに変える。規則は領事事務局の対照表の{bocaRows}音節すべてと一マスずつ照合し、四方式とも一致して初めて合格としている。[^S3]',
  'rz.how.p2':
    '字の読みは入力ソフト「小麦注音」の公開データ（21,745字）による。読みが複数ある字は、Unicode の Unihan データベースが示す台湾の読みを初期値とする。[^S30] 姓として特別な読みを持つ15字（曾・沈・單・解など）は個別に指定している。',
  'rz.table.h': '公式対照表の全文',
  'rz.table.p':
    '外交部領事事務局「護照外文姓名拼音對照表」2026年5月29日版。原表には「参考用」と明記されている。',
  'rz.table.summary': '{bocaRows}音節をすべて表示',
  'rz.col.zy': '注音',
  'rz.h.method': '綴りはどこから来るのか',
  'common.scrollHint': '← 表は左右にスクロールできます →',
  'date.amended': '改正',
  'date.filed': '行政院備査',
  'date.retrieved': '取得',
  'date.pinned': '固定版',
  'date.asOf': 'データ基準日',
  'date.decision': '会議決定',
  'date.updated': '更新',
  'rz.reading':
    '四つの行は、同じ名前を四つの方式で綴った結果で、パスポートと同じ形式（姓、コンマ、名の音節をハイフンでつなぐ）になっている。各漢字の下はその字の注音。読みが複数ある字はメニューになり、選び直すと四行とも更新される。「読み方」の行には注音、声調付きの漢語拼音、国際音声記号を示す。',
  'rz.disclaimer':
    'このツールは公式対照表を別の形で引けるようにしたもので、申請書類ではありません。パスポートの氏名表記は台湾外交部領事事務局の規定と発給結果によります。',
  'rz.embedSource':
    '綴り：外交部領事事務局「護照外文姓名拼音對照表」2026年5月29日版',
  'rz.related.main': '台湾人の名前：姓・世代・ローマ字表記',
  'rz.related.spelling': '同じ姓に綴りが四つある理由',
  'rz.related.local': '同じ姓の台湾語・客家語の読み',
  'rz.faq.1.q': '台湾人の名前のローマ字は、なぜ人によって綴りが違うのですか？',
  'rz.faq.1.a':
    '方式が一つに決まっていないためです。パスポート用の公式対照表はウェード式・漢語拼音・通用拼音・国音第二式の四つを並べており、領事事務局はどれか一つを強制していません。「張」は CHANG、ZHANG、JHANG、JANG のどれにもなります。',
  'rz.faq.2.q': 'Hsieh や Tsai はどう読みますか？',
  'rz.faq.2.a':
    'どちらもウェード式の綴りです。「ローマ字 → 読み方」に切り替えて入力すると、対応する注音、漢語拼音、国際音声記号が表示されます。Hsieh は漢語拼音の xie（謝など）、Tsai は cai（蔡など）にあたります。',
  'rz.faq.3.q': '台湾のパスポートではどのローマ字方式を使うのですか？',
  'rz.faq.3.a':
    '申請者が選べます。教育部の原則は漢語拼音を「奨励」していますが、人名は本人の意思を尊重できるとされています。パスポートを更新するときは以前の綴りを引き継ぎます。',
  'rz.faq.4.q': '台湾語や客家語の読みで表記することはできますか？',
  'rz.faq.4.a':
    'できます。2019年8月9日から、パスポートの外国語氏名は「国家言語の読み」で音訳できるようになりました。このツールには上位30姓の台湾語・客家語の姓の読みを載せています。名の読みは教育部の辞典で調べてください。',
  'rz.faq.5.q': '日本語の音読みと同じように読んでよいですか？',
  'rz.faq.5.a':
    '漢字は共通でも音は別です。「陳」は華語で Chén、台湾語で Tân と読みます。相手がどう呼ばれたいかを尋ねるのが確実です。',
  'rz.faq.6.q': '入力した名前は保存されますか？',
  'rz.faq.6.a':
    '保存されません。計算はすべてブラウザ内で行われ、入力内容はサーバーに送られません。「共有リンクをコピー」を押さない限り、URLにも入りません。',
};

export const namesUI: Record<string, Dict> = { 'zh-TW': zh, en, ja };
export const NAMES_LANGS = Object.keys(namesUI);

/** 取文案；缺 key 時照全站 fallback 順序往下找，最後回 key 本身（方便在畫面上發現漏字） */
export function useNames(lang: string) {
  const chain = getFallbackChain(lang as any) as readonly string[];
  const order = [...chain, 'en', 'zh-TW'];
  return (key: string, vars?: Record<string, string | number>): string => {
    let s: string | undefined;
    for (const l of order) {
      s = namesUI[l]?.[key];
      if (s !== undefined) break;
    }
    if (s === undefined) return key;
    if (!vars) return s;
    return s.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m));
  };
}

/** 工具元件要的文案子表（去掉 tool. 前綴） */
export function toolStrings(lang: string): Dict {
  const t = useNames(lang);
  const out: Dict = {};
  for (const k of Object.keys(zh))
    if (k.startsWith('tool.')) out[k.slice(5)] = t(k);
  return out;
}
