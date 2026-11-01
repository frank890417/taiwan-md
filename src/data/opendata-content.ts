/**
 * opendata-content.ts — /opendata（OpenData 策展）per-lang editorial content.
 *
 * 跟 mcp-content.ts 同一套機制：zh-TW 是 canonical，其他語言缺 key 時
 * template 以 OPENDATA_CONTENT[lang] ?? OPENDATA_CONTENT['zh-TW'] fallback。
 * 翻譯階段（哲宇確認中文定稿後）再補 en / ja / ko / es / fr 物件。
 *
 * 機器資料（20 domains / 21 tools / 15 showcase datasets）不在這裡——
 * 在 src/data/opendata-curation.json（scripts/tools/twinkle-hub-crawl.py 產生）。
 * 這個檔案只放 Taiwan.md 的策展判斷：怎麼評估、怎麼組合、對應哪些文章。
 */

import { OPENDATA_OVERLAYS } from './opendata-overlays';

export type OpendataLang =
  | 'zh-TW'
  | 'en'
  | 'ja'
  | 'ko'
  | 'es'
  | 'fr'
  | 'vi'
  | 'id'
  | 'pt'
  | 'hi'
  | 'ar'
  | 'ru'
  | 'de';

export type DeepPartial<T> = T extends (infer U)[]
  ? DeepPartial<U>[]
  : T extends object
    ? { [K in keyof T]?: DeepPartial<T[K]> }
    : T;

interface LinkItem {
  title: string;
  href: string;
}

interface Recipe {
  question: string;
  datasets: { name: string; href: string; freq: string }[];
  combine: string;
  method: string;
  articles: LinkItem[];
}

interface DomainMap {
  /** domain key（對齊 opendata-curation.json 的 domains[].key） */
  key: string;
  /** Taiwan.md 對應文章（驗證過存在的路徑） */
  articles?: LinkItem[];
  /**
   * 故事還沒寫成文章的領域：策展已完成（旗艦資料集 + 分析路徑 + 可寫的故事），
   * 文章待寫。2026-06-10 哲宇 directive「待開發的東西全部開發完跟思考完」。
   */
  proposed?: {
    story: string;
    datasets: { name: string; href: string; freq: string }[];
    how: string;
  };
}

export interface OpendataContent {
  meta: { title: string; description: string };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    intro: string[];
    viz: {
      stats: { n: number; suffix: string; label: string }[];
      graphHint: string;
      legend: {
        domain: string;
        vertical: string;
        article: string;
        center: string;
      };
    };
  };
  ecosystem: {
    title: string;
    lead: string;
    layers: { name: string; role: string; desc: string; stat: string }[];
  };
  assessment: {
    title: string;
    lead: string;
    dims: {
      name: string;
      verdict: string;
      points: string[];
      gaps: string[];
    }[];
    gapsLabel: string;
  };
  verticals: {
    title: string;
    lead: string;
    logNote: string;
    items: { name: string; stat: string; desc: string }[];
  };
  domains: {
    title: string;
    lead: string;
    questionsLabel: string;
    articlesLabel: string;
    blankLabel: string;
    proposedStoryLabel: string;
    proposedHowLabel: string;
    map: DomainMap[];
  };
  recipes: {
    title: string;
    lead: string;
    combineLabel: string;
    methodLabel: string;
    articlesLabel: string;
    items: Recipe[];
  };
  method: {
    title: string;
    lead: string;
    spectrum: {
      title: string;
      left: string;
      right: string;
      note: string;
    };
    items: { name: string; desc: string }[];
  };
  tools: {
    title: string;
    lead: string;
    groups: { prefix: string[]; label: string }[];
  };
  footer: {
    crawledLabel: string;
    note: string;
    pilotTitle: string;
    pilotLead: string;
    pilotArticles: LinkItem[];
  };
}

export const OPENDATA_CONTENT: Partial<Record<string, OpendataContent>> & {
  'zh-TW': OpendataContent;
} = {
  'zh-TW': {
    meta: {
      title: 'OpenData 策展 — 台灣開放資料 × Twinkle Hub 的意義層導覽',
      description:
        '五萬個政府資料集對任何人都是壓垮性的。這一頁是 Taiwan.md 的資料策展：哪些資料值得看、要分析一件事該怎麼組合、以及每一批數字跟島上哪些故事相連。含對 Twinkle Hub 完整性、穩定性、存取簡化的第一手實測評估。',
    },
    hero: {
      eyebrow: 'OPEN DATA CURATION',
      title: 'OpenData 策展',
      subtitle: '台灣開放資料 × Twinkle Hub 的意義層導覽',
      intro: [
        '台灣政府的開放資料平台上有五萬兩千多個資料集。這個數字對任何想用它的人都是壓垮性的：你不知道哪個重要、哪個更新到什麼時候、哪兩張表可以對在一起，更不知道它們跟你關心的問題有什麼關係。',
        'Taiwan.md 寫了一千一百多篇關於台灣的文章，每一篇背後都有「這件事該用什麼資料驗證」的判斷。這一頁把這層判斷攤開來：我們怎麼評估資料基礎建設、要分析一件事的時候用哪些資料集怎麼組合、以及每一個資料領域跟島上哪些故事相連。',
      ],
      viz: {
        stats: [
          { n: 52556, suffix: '', label: '政府資料集（2026-10-23）' },
          { n: 1240000, suffix: '+', label: '判決書全文' },
          { n: 320663, suffix: '', label: '國考題目' },
          { n: 226825, suffix: '', label: '營養分析列' },
          { n: 135000, suffix: '+', label: '採購紀錄' },
        ],
        graphHint:
          '下面這張網是真的：左側是 20 個資料領域與五大語料庫（即時爬取），右側是已經寫成的 Taiwan.md 文章。每一條線都是本頁的策展判斷。拖拉、懸停，看複雜的資料怎麼接上清晰的故事。',
        legend: {
          domain: '資料領域',
          vertical: '垂直語料庫',
          article: 'Taiwan.md 文章',
          center: 'Taiwan.md 意義層',
        },
      },
    },
    ecosystem: {
      title: '生態地圖：三層各守一層',
      lead: '一個 AI（或一個人）要真正回答「關於台灣的事」，需要三層合作：資料的家、查詢的路、意義的層。',
      layers: [
        {
          name: 'data.gov.tw 與各機關系統',
          role: '資料的家（SSOT）',
          desc: '政府資料開放平臺是每個資料集的持久身分：dataset 編號、授權條款、主管機關、原始下載。所有引用最終都該回到這裡。',
          stat: '約 5 萬個資料集',
        },
        {
          name: 'Twinkle Hub',
          role: '查詢的路（MCP 閘道）',
          desc: '台灣第一個 MCP Hub，把分散在上百個政府入口的資料包成單一查詢端點：語意搜尋、結構化查列、五個垂直領域工具。讓 AI 一次呼叫就拿到資料，省掉跨入口的人工泥沼。',
          stat: '21 個工具・20 個領域',
        },
        {
          name: 'Taiwan.md',
          role: '意義的層（策展）',
          desc: '資料不會自己說話。哪個資料集值得指、它驗證哪個論點、跟哪段歷史相連——這是策展的工作。我們的文章從 2026 年 6 月起逐篇接上「公開數據」段，把敘事跟原始資料縫在一起。',
          stat: '1,100+ 篇文章・15 個資料集指標上線',
        },
      ],
    },
    assessment: {
      title: '三維評估：我們實測到什麼',
      lead: '以下是 Taiwan.md 以使用者身分、用自己的查核工具做的第一手評估（2026 年 5 月與 6 月兩輪實測），按三個維度攤開。不是廣告，是體檢。',
      gapsLabel: '誠實的缺口',
      dims: [
        {
          name: '資料的完整',
          verdict: '覆蓋面是真的，而且超出鏡像',
          points: [
            'data.gov.tw 官方平台截至 2026-10-23 上架 52,556 個資料集；Twinkle Hub 站上標示台灣來源 53,185 個（含自策資料集），外加 13.5 萬筆政府電子採購紀錄與立法院資料（2026-06 盤點）',
            '20 個領域分類各帶「典型問題」與「定錨範例」，每個資料集標品質分層（白金到銅）、更新頻率、格式與可串連鍵',
            '自策資料集補了政府入口的洞：全國實價登錄（買賣／預售／租賃）直接接內政部地政司系統',
            '五個垂直語料庫超出單純鏡像：專利全文、國考題庫、判決書、藥證與食品營養（規模見下節）',
          ],
          gaps: [
            '搜尋排名偏向縣市切片：搜「出生率」回來是南投、桃園、高雄三個縣市級資料集，全國尺度的那一份要靠人挑——這正是策展存在的理由',
            '查不到每個領域的資料集總數，盤點只能靠官方宣稱數字',
            '部分老資料集仍是未正規化的 ODS 格式，無法結構化查列',
          ],
        },
        {
          name: '穩定性',
          verdict: 'alpha 本色：跑得快，也改得快',
          points: [
            '查詢延遲實測快取命中低於 100ms，每次回應帶 trace_id 與成本欄位，透明度好',
            '工具描述內嵌版本號（v1.11.2 聚合查詢、v1.18 判決書），迭代節奏看得見',
            '判決書語料目前明標 alpha 範圍（2024-05 至 2026-03 共約 124 萬筆）——標清楚邊界比假裝完整誠實',
          ],
          gaps: [
            '兩個月內兩次 API 介面變動：2026-05-11 到 06-10 之間，連線方式改為 session 握手、工具從 40 個重組為 21 個、整組確定性工具下架',
            'alpha 期已出現流量限制（HTTP 429），但限制窗口未公布',
            '我們的對策：薄包裝層隔離介面變動，文章引用一律寫成靜態指標、不在執行期依賴 API——任何 alpha 服務都該這樣接',
          ],
        },
        {
          name: '存取的簡化',
          verdict: '這是它最強的一面',
          points: [
            '一個 MCP 端點取代上百個政府入口：搜尋、取 metadata、查列、彙整四段式，欄位 schema 一致',
            '結構化查列支援 SQL 條件與聚合，已正規化的資料集可以直接當資料庫用',
            '同一個地址、年份、行政區問題，過去要跨三到五個入口人工核對 15 到 30 分鐘；現在一次呼叫不到一秒',
            '一鍵安裝包讓 Claude、Cursor 等十種以上 AI 客戶端直接接上——「讓 AI 讀得到台灣的資料」這件事的摩擦力被砍掉一個數量級',
          ],
          gaps: [
            '需要 API 金鑰（bearer token），目前 alpha 免費、未來按工具計費——免費路徑會不會永遠存在，是開放資料生態該持續追問的問題',
            '服務本身閉源：資料是開放的，通道目前不是。data.gov.tw 的原始下載永遠是繞過任何閘道的保底路徑',
          ],
        },
      ],
    },
    verticals: {
      title: '五個垂直語料庫：超出鏡像的部分',
      lead: '把資料集包成搜尋介面不稀奇；下面這五個垂直領域做了語意檢索與結構化抽取，是 Twinkle Hub 超出「data.gov.tw 鏡像」的部分。',
      logNote:
        '量級條為對數尺度：判決書語料是藥證的 17 倍，線性畫會把其他四條壓成看不見。',
      items: [
        {
          name: '專利',
          stat: 'TIPO 發明專利公開案全文',
          desc: '自然語言查詢專利語料，可取完整技術描述與請求項。寫台灣產業文章時，「這家公司真的有這個技術嗎」第一次可以用語意搜尋驗證。',
        },
        {
          name: '國家考試',
          stat: '64,815 份試卷・32 萬題（2012–2025）',
          desc: '考選部歷年試卷與題目級檢索。台灣的國考文化（公職熱、補習街）是還沒被資料化說過的故事。',
        },
        {
          name: '判決書',
          stat: '約 124 萬筆（2024-05 至 2026-03，alpha）',
          desc: '白話檢索判決書語料。司法、勞資、租屋糾紛類文章的「實務上法院怎麼判」有了可查證的入口。',
        },
        {
          name: '藥品與健康',
          stat: '71,836 件藥證・96,803 個 ICD-10 中文碼',
          desc: '藥品許可證、仿單結構化欄位、健康食品認證、交互作用初篩。健保與醫療文章的事實層。',
        },
        {
          name: '食品營養',
          stat: '226,825 列營養分析',
          desc: '衛福部食品營養成分資料庫：每個食材二十多項營養素，可按營養素排行、可算一餐總和。夜市與飲食文章的數字底。',
        },
      ],
    },
    domains: {
      title: '二十個資料領域 × Taiwan.md 的故事地圖',
      lead: '左邊是 Twinkle Hub 的領域分類（即時爬取），右邊是我們的策展對應：這個領域的資料跟島上哪些文章相連。標「故事待寫」的領域，旗艦資料集與分析路徑已經策展完成，文章還沒寫成：那是我們的開發地圖，也是給任何想寫的人的邀請。',
      questionsLabel: '典型問題',
      articlesLabel: '相連的文章',
      blankLabel: '故事待寫',
      proposedStoryLabel: '可以寫成的故事',
      proposedHowLabel: '怎麼分析',
      map: [
        {
          key: 'realestate_land',
          articles: [
            { title: '國宅與居住正義', href: '/society/國宅與居住正義' },
            {
              title: '社會住宅與居住正義',
              href: '/society/社會住宅與居住正義',
            },
          ],
        },
        {
          key: 'economy_business',
          articles: [
            { title: '經濟分類文章總覽', href: '/economy' },
            {
              title: '台灣企業：中華電信',
              href: '/economy/台灣企業：中華電信',
            },
          ],
        },
        {
          key: 'procurement_subsidy',
          proposed: {
            story: '誰標到了台灣：13.5 萬筆決標紀錄裡的政府外包地圖',
            datasets: [
              {
                name: '政府電子採購網招標／決標公告',
                href: 'https://web.pcc.gov.tw/',
                freq: '每半月',
              },
              {
                name: '巨額採購履約期間廠商名單',
                href: 'https://data.gov.tw/dataset/7264',
                freq: '每 1 日',
              },
            ],
            how: '以統一編號把決標紀錄接上商業登記：一家廠商歷年從哪些機關標到多少錢。金額、機關、年份三軸做成熱力圖，公共支出的地理跟人脈會自己浮出來。',
          },
        },
        {
          key: 'public_finance',
          articles: [
            { title: '中央政府總預算', href: '/politics/中央政府總預算' },
          ],
        },
        {
          key: 'tax_revenue',
          proposed: {
            story: '你的縣市靠什麼稅活著：地方財政的體質檢查',
            datasets: [
              {
                name: '桃園市地方稅實徵淨額每年統計',
                href: 'https://data.gov.tw/dataset/147936',
                freq: '每 1 年',
              },
              {
                name: '花蓮縣各項稅捐實徵淨額（本月數）',
                href: 'https://data.gov.tw/dataset/177569',
                freq: '不定期',
              },
            ],
            how: '各縣市實徵淨額按稅目拆開：誰靠地價稅與房屋稅（都會區），誰靠中央統籌分配（非都會）。跟人口與房價資料用行政區代碼對齊，財政自主性的排行自己就算得出來。',
          },
        },
        {
          key: 'transport',
          articles: [
            { title: '台灣交通系統', href: '/lifestyle/台灣交通系統' },
            { title: '台灣機車文化', href: '/lifestyle/台灣機車文化' },
          ],
        },
        {
          key: 'public_safety',
          articles: [{ title: '颱風', href: '/nature/颱風' }],
        },
        {
          key: 'judicial_legal',
          articles: [
            {
              title: '台灣司法改革與預防性羈押制度',
              href: '/society/台灣司法改革與預防性羈押制度',
            },
          ],
        },
        {
          key: 'legislature',
          articles: [{ title: '太陽花學運', href: '/society/太陽花學運' }],
        },
        {
          key: 'health_food',
          articles: [
            {
              title: '台灣醫療與全民健保',
              href: '/lifestyle/台灣醫療與全民健保',
            },
          ],
        },
        {
          key: 'environment',
          articles: [
            { title: '台灣環境運動史', href: '/nature/台灣環境運動史' },
            {
              title: '台灣氣候危機與淨零轉型',
              href: '/nature/台灣氣候危機與淨零轉型',
            },
          ],
        },
        {
          key: 'education_research',
          articles: [
            { title: '台灣教育制度', href: '/lifestyle/台灣教育制度' },
            { title: '台灣偏鄉教育', href: '/society/台灣偏鄉教育' },
          ],
        },
        {
          key: 'agriculture_fisheries',
          articles: [
            { title: '台灣咖啡產業', href: '/food/台灣咖啡產業' },
            { title: '茶文化', href: '/food/茶文化' },
          ],
        },
        {
          key: 'labor_employment',
          articles: [{ title: '誰算低薪', href: '/society/誰算低薪' }],
        },
        {
          key: 'social_population',
          articles: [
            { title: '台灣少子化危機', href: '/society/台灣少子化危機' },
            { title: '2026 九合一選舉', href: '/politics/2026 九合一選舉' },
          ],
        },
        {
          key: 'culture_tourism_sport',
          articles: [
            { title: '夜市文化', href: '/food/夜市文化' },
            { title: '台灣棒球文化', href: '/culture/台灣棒球文化' },
          ],
        },
        {
          key: 'foreign_affairs',
          articles: [
            {
              title: '台灣邦交國與國際外交',
              href: '/society/台灣邦交國與國際外交',
            },
          ],
        },
        {
          key: 'gov_publication',
          proposed: {
            story: '公報裡的台灣：政府每個月自己公告了什麼',
            datasets: [
              {
                name: '行政院公報資訊網',
                href: 'https://gazette.nat.gov.tw/',
                freq: '每 1 日',
              },
              {
                name: '臺北市政府公報',
                href: 'https://data.gov.tw/dataset/132348',
                freq: '每 1 月',
              },
            ],
            how: '公報全文做法規異動的關鍵詞時間序列，再對照 legislature 域的立法院紀錄：行政公告與立法軌跡之間的時間差，就是一項政策真正生效的速度。',
          },
        },
        {
          key: 'geo_basemap',
          articles: [
            { title: '台灣地圖怎麼讀', href: '/geography/台灣地圖怎麼讀' },
          ],
        },
        {
          key: 'utilities_telecom',
          articles: [
            { title: '台灣與核能的討論', href: '/society/台灣與核能的討論' },
          ],
        },
      ],
    },
    recipes: {
      title: '分析組合：要看懂一件事，用哪些資料、怎麼組',
      lead: '這是這一頁的核心。每張卡片是一個真實的分析問題：用哪些資料集、靠什麼鍵組合、用什麼方法看，以及哪篇文章已經把這個分析寫成了故事。',
      combineLabel: '怎麼組合',
      methodLabel: '怎麼分析最好',
      articlesLabel: '已經寫成的故事',
      items: [
        {
          question: '居住正義：政府蓋的便宜房，最後養肥了誰？',
          datasets: [
            {
              name: '全國實價登錄（買賣）',
              href: 'https://lvr.land.moi.gov.tw/',
              freq: '每 3 月',
            },
            {
              name: '臺北市國民住宅配售（租）情形',
              href: 'https://data.gov.tw/dataset/121267',
              freq: '不定期',
            },
            {
              name: '臺北市社宅包租代管媒合統計',
              href: 'https://data.gov.tw/dataset/155779',
              freq: '每 1 年',
            },
          ],
          combine:
            '以行政區與社區名對齊：國宅配售紀錄給「政府當年用什麼價賣出」，實價登錄給「同一個門牌今天值多少」，社宅統計給「不賣改租之後的量」。',
          method:
            '同一社區做時間序列，再用政策節點切段對照：1985 配售、2002 拆牆、2016 只租不售、2026 桃園回賣。增值倍數除以年數，就是「資產扶梯」的斜率。',
          articles: [
            { title: '國宅與居住正義', href: '/society/國宅與居住正義' },
            {
              title: '社會住宅與居住正義',
              href: '/society/社會住宅與居住正義',
            },
          ],
        },
        {
          question: '能源轉型：核電歸零又重啟，數字上發生了什麼？',
          datasets: [
            {
              name: '台電近10年核能發電績效及減碳效益',
              href: 'https://data.gov.tw/dataset/10859',
              freq: '每 1 年',
            },
            {
              name: '台電核能發電廠位置及機組設備',
              href: 'https://data.gov.tw/dataset/10858',
              freq: '不定期',
            },
          ],
          combine:
            '發電績效給年度發電量與容量因數，機組表給每部機的除役時點。兩張表用年份對齊，再疊上公投與政策節點。',
          method:
            '畫一條容量因數年度曲線，標三場公投（2018、2021、2025）：曲線怎麼走向零、公投過後一年內有沒有任何一個數字動了——「政治決定」與「物理現實」的時差會自己浮出來。',
          articles: [
            { title: '台灣與核能的討論', href: '/society/台灣與核能的討論' },
            {
              title: '台灣氣候危機與淨零轉型',
              href: '/nature/台灣氣候危機與淨零轉型',
            },
          ],
        },
        {
          question: '健保財務：誰在用、誰在繳，這套制度還撐得住幾年？',
          datasets: [
            {
              name: '健保保險對象按類別性別年齡層統計',
              href: 'https://data.gov.tw/dataset/20254',
              freq: '每 3 月',
            },
            {
              name: '全民健康保險會會議議事錄',
              href: 'https://data.gov.tw/dataset/7554',
              freq: '每 1 月',
            },
            {
              name: '各級政府補助弱勢保險對象統計',
              href: 'https://data.gov.tw/dataset/23719',
              freq: '每 1 月',
            },
          ],
          combine:
            '年齡層投保人數算出「繳的人」跟「用的人」的結構比，議事錄給費率決策的時間軸，弱勢補助統計給「量能付費」的執行面。',
          method:
            '把年齡結構比做成逐季序列，疊上費率決策節點：結構在惡化、費率不動，中間的缺口靠什麼補（撥補、點值、部分負擔），議事錄裡每一次「維持不調整」都有對應的代價條目。',
          articles: [
            {
              title: '台灣醫療與全民健保',
              href: '/lifestyle/台灣醫療與全民健保',
            },
            { title: '台灣少子化危機', href: '/society/台灣少子化危機' },
          ],
        },
        {
          question: '民主品質：一場選舉的母體多大、查察強度多強？',
          datasets: [
            {
              name: '選舉人數（中選會）',
              href: 'https://data.gov.tw/dataset/27491',
              freq: '每 4 年',
            },
            {
              name: '違反選罷法案件裁判確定人數',
              href: 'https://data.gov.tw/dataset/15035',
              freq: '每 1 月',
            },
          ],
          combine:
            '選舉人數給每屆選舉的母體，選罷法裁判統計給賄選與介選的歷年定罪量。兩者都能按縣市切，跟選舉結果對齊。',
          method:
            '每屆選舉做一組「母體 × 定罪率」對照，跨屆比較查察強度的變化；2026 這屆多了 AI 假訊息這個新查察重點，傳統兩項（賄選、介選）的基線先立好，新威脅的量才有參照系。',
          articles: [
            { title: '2026 九合一選舉', href: '/politics/2026 九合一選舉' },
            { title: '太陽花學運', href: '/society/太陽花學運' },
          ],
        },
        {
          question: '街頭經濟：23 萬個攤位的產值是怎麼算出來的？',
          datasets: [
            {
              name: '攤販經營概況調查',
              href: 'https://data.gov.tw/dataset/10918',
              freq: '每 5 年',
            },
            {
              name: '臺中市列管夜市',
              href: 'https://data.gov.tw/dataset/85028',
              freq: '不定期',
            },
          ],
          combine:
            '主計總處的五年普查給全國攤販的母體（攤數、從業人員、營收），縣市列管清單給「正式被政府承認的夜市」名錄。',
          method:
            '跨期普查比較是關鍵：攤位數與營收的五年變化，對照行動支付滲透與觀光人次。下一次普查發布時，所有引用 23.3 萬攤的文章都該回來對表。',
          articles: [
            { title: '夜市經濟學', href: '/economy/夜市經濟學' },
            { title: '夜市文化', href: '/food/夜市文化' },
          ],
        },
        {
          question: '交通安全：1,400 萬輛機車與每年三千條人命的關係？',
          datasets: [
            {
              name: '機動車輛登記數統計',
              href: 'https://data.gov.tw/dataset/14208',
              freq: '每 1 月',
            },
            {
              name: '桃園市 A1/A2 事故傷亡統計（91–114 年）',
              href: 'https://data.gov.tw/dataset/25932',
              freq: '每 1 年',
            },
          ],
          combine:
            '車輛登記數給分母（暴險量），事故傷亡給分子。縣市級長序列（桃園 24 年）先當方法樣板，再擴到其他縣市。',
          method:
            '別只看死亡絕對數——用每十萬輛車傷亡率 normalize，機車與汽車分開算；「行人地獄」的爭論需要的正是這個分母。',
          articles: [
            { title: '台灣交通系統', href: '/lifestyle/台灣交通系統' },
            { title: '台灣機車文化', href: '/lifestyle/台灣機車文化' },
          ],
        },
      ],
    },
    method: {
      title: '串連方法論：讓兩張表對在一起的鍵',
      lead: '單一資料集是一個點，能組合才是一張網。這些是我們實測下來最有用的串連線索。',
      spectrum: {
        title: '更新頻率＝分析解析度：十五個示範資料集的光譜',
        left: '← 每月更新：能做事件研究',
        right: '五年一度：只能跨期比較 →',
        note: '每個點是本頁引用的一個資料集，懸停看名字。設計分析之前先看你的資料落在光譜哪一端。',
      },
      items: [
        {
          name: '行政區代碼',
          desc: '最通用的串連鍵。縣市與鄉鎮市區的標準代碼讓人口、房價、事故、稅收可以對齊到同一張地圖；同名區（兩個信義區）靠代碼消歧。',
        },
        {
          name: '統一編號',
          desc: '公司的身分證。商業登記、採購得標、專利申請、裁罰名單都掛統編——追一家公司的完整足跡靠它。',
        },
        {
          name: '經緯度與測站代碼',
          desc: '環境資料（空品、水質、氣象）掛測站，地理資料掛座標。跟行政區代碼互換是空間分析的第一步。',
        },
        {
          name: '品質分層',
          desc: '白金到銅的分層是「這個資料集可不可以直接用」的快篩：白金級多半已正規化、可結構化查列；未檢測的（如自策的實價登錄）要自己驗。',
        },
        {
          name: '更新頻率即分析解析度',
          desc: '每月更新的資料能做事件研究，每年的只能看趨勢，每五年的（攤販普查）只能跨期比較。先看頻率再設計分析，不要反過來。',
        },
        {
          name: '雙層指標原則',
          desc: 'Taiwan.md 文章引用資料集時，連結永遠指 data.gov.tw 或主管機關的持久頁面，查詢層（Twinkle Hub）是並列的加值路徑。資料的家與查詢的路分開，任何一層變動都不會斷鏈。',
        },
      ],
    },
    tools: {
      title: '工具型錄：21 個工具的完整清單',
      lead: '以下直接爬自 MCP 端點（每次重建頁面時更新）。分組是我們加的。',
      groups: [
        {
          prefix: [
            'search_datasets',
            'get_dataset',
            'query_rows',
            'materialize_dataset',
            'list_domains',
          ],
          label: '資料集四件套 + 領域索引',
        },
        { prefix: ['search_patents', 'get_patent_body'], label: '專利' },
        {
          prefix: ['search_exam', 'search_exam_questions', 'get_exam_paper'],
          label: '國家考試',
        },
        { prefix: ['search_judicial', 'get_judicial_full'], label: '判決書' },
        {
          prefix: [
            'lookup_icd10',
            'search_drug',
            'get_drug_details',
            'search_health_supplements',
            'search_drug_label',
            'check_drug_interaction',
          ],
          label: '藥品與醫療代碼',
        },
        {
          prefix: [
            'query_food_nutrition',
            'search_foods_by_nutrient',
            'analyze_meal_nutrition',
          ],
          label: '食品營養',
        },
      ],
    },
    footer: {
      crawledLabel: '本頁工具與領域清單即時爬取於',
      note: 'Twinkle Hub 處於 alpha，本頁的評估會隨它的演進更新。Taiwan.md 與 Twinkle Hub 目前沒有任何商業關係；這一頁是一個重度使用者的第一手體檢，也是一份邀請：資料層與意義層合作，台灣才會被完整地理解。',
      pilotTitle: '已經接上資料層的文章',
      pilotLead:
        '2026 年 6 月起，我們開始在文章末尾加「公開數據」段：每篇列出可以驗證（或推翻）該文論點的資料集，附一句「為什麼指向」。第一批六篇：',
      pilotArticles: [
        { title: '台灣與核能的討論', href: '/society/台灣與核能的討論' },
        { title: '國宅與居住正義', href: '/society/國宅與居住正義' },
        { title: '台灣醫療與全民健保', href: '/lifestyle/台灣醫療與全民健保' },
        { title: '夜市經濟學', href: '/economy/夜市經濟學' },
        { title: '台灣交通系統', href: '/lifestyle/台灣交通系統' },
        { title: '2026 九合一選舉', href: '/politics/2026 九合一選舉' },
      ],
    },
  },

  en: {
    meta: {
      title:
        "Open Data Curation — A meaning-layer guide to Taiwan's open data × Twinkle Hub",
      description:
        "Fifty thousand government datasets would overwhelm anyone. This page is Taiwan.md's data curation: which datasets are worth your attention, how to combine them when you want to analyze something, and which stories on this island each batch of numbers connects to. Includes a first-hand, hands-on assessment of Twinkle Hub's completeness, stability, and access simplification.",
    },
    hero: {
      eyebrow: 'OPEN DATA CURATION',
      title: 'Open Data Curation',
      subtitle: "A meaning-layer guide to Taiwan's open data × Twinkle Hub",
      intro: [
        "Taiwan's government open data platform hosts over fifty-two thousand datasets. That number overwhelms anyone who actually wants to use them: you don't know which ones matter, how far each is kept up to date, or which two tables can be joined, let alone how any of it relates to the questions you care about.",
        'Taiwan.md has written over eleven hundred articles about Taiwan, and behind every one sits a judgment call: what data should verify this? This page lays that layer of judgment open: how we assess the data infrastructure, which datasets to combine (and how) when analyzing a question, and which stories on this island each data domain connects to.',
      ],
      viz: {
        stats: [
          {
            n: 52556,
            suffix: '',
            label: 'government datasets (2026-10-23)',
          },
          {
            n: 1240000,
            suffix: '+',
            label: 'full-text court judgments',
          },
          {
            n: 320663,
            suffix: '',
            label: 'national exam questions',
          },
          {
            n: 226825,
            suffix: '',
            label: 'nutrition analysis rows',
          },
          {
            n: 135000,
            suffix: '+',
            label: 'procurement records',
          },
        ],
        graphHint:
          'The web below is real: on the left, 20 data domains and five vertical corpora (crawled live); on the right, Taiwan.md articles already written. Every line is a curation judgment made on this page. Drag and hover to watch messy data connect to clear stories.',
        legend: {
          domain: 'Data domain',
          vertical: 'Vertical corpus',
          article: 'Taiwan.md article',
          center: 'Taiwan.md meaning layer',
        },
      },
    },
    ecosystem: {
      title: 'The ecosystem map: three layers, each holding its own',
      lead: 'For an AI (or a person) to genuinely answer questions about Taiwan, three layers have to work together: a home for the data, a path for queries, and a layer of meaning.',
      layers: [
        {
          name: 'data.gov.tw and agency systems',
          role: 'The home of the data (SSOT)',
          desc: "The government open data platform is each dataset's persistent identity: dataset ID, license terms, competent authority, raw downloads. Every citation should ultimately trace back here.",
          stat: 'about 50,000 datasets',
        },
        {
          name: 'Twinkle Hub',
          role: 'The path for queries (MCP gateway)',
          desc: "Taiwan's first MCP hub, wrapping data scattered across hundreds of government portals into a single query endpoint: semantic search, structured row queries, and tools for five vertical domains. An AI gets the data in one call, skipping the manual slog across portals.",
          stat: '21 tools · 20 domains',
        },
        {
          name: 'Taiwan.md',
          role: 'The layer of meaning (curation)',
          desc: "Data doesn't speak for itself. Which dataset deserves pointing to, which claim it verifies, which stretch of history it connects to — that is curation work. Starting June 2026, our articles are getting 'Public data' sections one by one, stitching narrative to raw data.",
          stat: '1,100+ articles · 15 dataset pointers live',
        },
      ],
    },
    assessment: {
      title: 'Three-dimension assessment: what our hands-on testing found',
      lead: "What follows is Taiwan.md's first-hand assessment as a user, run with our own verification tools (two rounds of testing, May and June 2026), laid out along three dimensions. This is not an ad; it's a checkup.",
      gapsLabel: 'Honest gaps',
      dims: [
        {
          name: 'Data completeness',
          verdict: 'The coverage is real, and it goes beyond mirroring',
          points: [
            "data.gov.tw itself lists 52,556 datasets as of 2026-10-23; Twinkle Hub's site shows 53,185 for Taiwan (self-curated sets included), plus 135,000 government e-procurement records and Legislative Yuan data (counted 2026-06)",
            "Each of the 20 domain categories comes with 'typical questions' and anchor examples; every dataset is tagged with a quality tier (platinum to bronze), update frequency, format, and joinable keys",
            "Self-curated datasets patch holes in the government portals: nationwide real-price registration (sales / pre-sale / rentals) connects straight to the Ministry of the Interior's Land Administration systems",
            'Five vertical corpora go beyond simple mirroring: patent full texts, national exam question banks, court judgments, drug licenses, and food nutrition (scale detailed in the next section)',
          ],
          gaps: [
            "Search ranking skews toward county-level slices: a query for 'birth rate' returns county datasets for Nantou, Taoyuan, and Kaohsiung, and a human has to pick out the national-scale one — exactly why curation exists",
            'There is no way to query the dataset count per domain, so any inventory has to lean on officially claimed figures',
            'Some older datasets remain in un-normalized ODS format and cannot be queried as structured rows',
          ],
        },
        {
          name: 'Stability',
          verdict:
            'True to its alpha nature: it runs fast, and it changes fast',
          points: [
            'Measured query latency under 100ms on cache hits; every response carries a trace_id and cost fields — good transparency',
            'Version numbers are embedded in tool descriptions (v1.11.2 aggregate queries, v1.18 judgments), so the iteration cadence stays visible',
            'The judgment corpus explicitly labels its alpha scope (about 1.24 million records, 2024-05 through 2026-03) — marking boundaries clearly is more honest than pretending to be complete',
          ],
          gaps: [
            'Two API interface changes within two months: between 2026-05-11 and 06-10, the connection moved to a session handshake, the tools were reorganized from 40 down to 21, and an entire set of deterministic tools was retired',
            'Rate limiting (HTTP 429) has already appeared during alpha, but the limit window is unpublished',
            'Our countermeasure: a thin wrapper layer isolates interface changes, and article citations are always written as static pointers, never depending on the API at runtime — the way any alpha service should be integrated',
          ],
        },
        {
          name: 'Access simplification',
          verdict: 'This is its strongest side',
          points: [
            'One MCP endpoint replaces hundreds of government portals: a four-step flow of search, metadata fetch, row query, and aggregation, with a consistent field schema',
            'Structured row queries support SQL conditions and aggregation; normalized datasets can be used directly as a database',
            'A question spanning one address, one year, and one administrative district used to take 15 to 30 minutes of manual cross-checking across three to five portals; now it is a single call, under a second',
            "One-click install packages plug Claude, Cursor, and ten-plus other AI clients straight in — the friction of 'making Taiwan's data readable to AI' has been cut by an order of magnitude",
          ],
          gaps: [
            'Requires an API key (bearer token); free during alpha, with per-tool pricing planned — whether a free path will always exist is a question the open data ecosystem should keep asking',
            'The service itself is closed-source: the data is open, the channel currently is not. Raw downloads from data.gov.tw remain the fallback path that bypasses any gateway',
          ],
        },
      ],
    },
    verticals: {
      title: 'Five vertical corpora: the part beyond mirroring',
      lead: "Wrapping datasets in a search interface is nothing special; these five vertical domains add semantic retrieval and structured extraction — the part of Twinkle Hub that goes beyond being a 'data.gov.tw mirror'.",
      logNote:
        'The magnitude bars use a log scale: the judgment corpus is 17 times the size of drug licenses, and a linear plot would squash the other four bars into invisibility.',
      items: [
        {
          name: 'Patents',
          stat: 'TIPO published invention patents, full text',
          desc: "Natural-language queries over the patent corpus, with full technical descriptions and claims retrievable. When writing about Taiwan's industries, 'does this company actually hold this technology' can be verified by semantic search for the first time.",
        },
        {
          name: 'National exams',
          stat: '64,815 exam papers · 320,000 questions (2012–2025)',
          desc: "Ministry of Examination papers across the years, searchable down to the question level. Taiwan's civil service exam culture — the public-sector job craze, the cram school streets — is a story no one has told with data yet.",
        },
        {
          name: 'Court judgments',
          stat: 'about 1.24 million records (2024-05 to 2026-03, alpha)',
          desc: "Plain-language retrieval over the judgment corpus. For articles on the judiciary, labor disputes, and rental conflicts, 'how courts actually rule in practice' now has a verifiable entry point.",
        },
        {
          name: 'Drugs and health',
          stat: '71,836 drug licenses · 96,803 Chinese ICD-10 codes',
          desc: 'Drug permits, structured package-insert fields, health food certifications, and preliminary interaction screening. The factual layer for articles on National Health Insurance and medicine.',
        },
        {
          name: 'Food nutrition',
          stat: '226,825 nutrition analysis rows',
          desc: "The Ministry of Health and Welfare's food nutrition composition database: twenty-plus nutrients per ingredient, rankable by nutrient, summable per meal. The numeric base for night market and food articles.",
        },
      ],
    },
    domains: {
      title: "Twenty data domains × Taiwan.md's story map",
      lead: "On the left, Twinkle Hub's domain categories (crawled live); on the right, our curation mapping: which articles on this island each domain's data connects to. For domains marked 'Story not yet written', the flagship datasets and analysis paths are fully curated but the article hasn't been written: that is our development map, and an open invitation to anyone who wants to write it.",
      questionsLabel: 'Typical questions',
      articlesLabel: 'Connected articles',
      blankLabel: 'Story not yet written',
      proposedStoryLabel: 'The story it could become',
      proposedHowLabel: 'How to analyze it',
      map: [
        {
          key: 'realestate_land',
          articles: [
            {
              title: 'Public housing and housing justice',
              href: '/society/國宅與居住正義',
            },
            {
              title: 'Social housing and housing justice',
              href: '/society/社會住宅與居住正義',
            },
          ],
        },
        {
          key: 'economy_business',
          articles: [
            {
              title: 'Economy category overview',
              href: '/economy',
            },
            {
              title: 'Taiwanese companies: Chunghwa Telecom',
              href: '/economy/台灣企業：中華電信',
            },
          ],
        },
        {
          key: 'procurement_subsidy',
          proposed: {
            story:
              'Who won Taiwan: the government outsourcing map inside 135,000 contract award records',
            datasets: [
              {
                name: 'Government e-Procurement System tender and award announcements',
                href: 'https://web.pcc.gov.tw/',
                freq: 'semimonthly',
              },
              {
                name: 'Supplier list for mega procurements during contract performance',
                href: 'https://data.gov.tw/dataset/7264',
                freq: 'daily',
              },
            ],
            how: 'Join award records to business registrations via the unified business number: which agencies a supplier has won how much from over the years. Plot a heatmap on three axes — amount, agency, year — and the geography and networks of public spending surface on their own.',
          },
        },
        {
          key: 'public_finance',
          articles: [
            {
              title: 'Central government general budget',
              href: '/politics/中央政府總預算',
            },
          ],
        },
        {
          key: 'tax_revenue',
          proposed: {
            story:
              'What taxes keep your county alive: a fitness check on local public finance',
            datasets: [
              {
                name: 'Taoyuan City annual net local tax collections',
                href: 'https://data.gov.tw/dataset/147936',
                freq: 'yearly',
              },
              {
                name: 'Hualien County net tax collections by category (current month)',
                href: 'https://data.gov.tw/dataset/177569',
                freq: 'irregular',
              },
            ],
            how: "Break each county's net collections down by tax category: who lives on land value and house taxes (metro areas), and who lives on centrally allotted funds (everywhere else). Align with population and housing-price data via administrative district codes, and the fiscal autonomy ranking computes itself.",
          },
        },
        {
          key: 'transport',
          articles: [
            {
              title: "Taiwan's transportation system",
              href: '/lifestyle/台灣交通系統',
            },
            {
              title: "Taiwan's scooter culture",
              href: '/lifestyle/台灣機車文化',
            },
          ],
        },
        {
          key: 'public_safety',
          articles: [
            {
              title: 'Typhoons',
              href: '/nature/颱風',
            },
          ],
        },
        {
          key: 'judicial_legal',
          articles: [
            {
              title: "Taiwan's judicial reform and preventive detention",
              href: '/society/台灣司法改革與預防性羈押制度',
            },
          ],
        },
        {
          key: 'legislature',
          articles: [
            {
              title: 'The Sunflower Movement',
              href: '/society/太陽花學運',
            },
          ],
        },
        {
          key: 'health_food',
          articles: [
            {
              title: "Taiwan's healthcare and National Health Insurance",
              href: '/lifestyle/台灣醫療與全民健保',
            },
          ],
        },
        {
          key: 'environment',
          articles: [
            {
              title: "A history of Taiwan's environmental movements",
              href: '/nature/台灣環境運動史',
            },
            {
              title: "Taiwan's climate crisis and net-zero transition",
              href: '/nature/台灣氣候危機與淨零轉型',
            },
          ],
        },
        {
          key: 'education_research',
          articles: [
            {
              title: "Taiwan's education system",
              href: '/lifestyle/台灣教育制度',
            },
            {
              title: 'Rural education in Taiwan',
              href: '/society/台灣偏鄉教育',
            },
          ],
        },
        {
          key: 'agriculture_fisheries',
          articles: [
            {
              title: "Taiwan's coffee industry",
              href: '/food/台灣咖啡產業',
            },
            {
              title: 'Tea culture',
              href: '/food/茶文化',
            },
          ],
        },
        {
          key: 'labor_employment',
          articles: [
            { title: 'Who counts as low-paid', href: '/society/誰算低薪' },
          ],
        },
        {
          key: 'social_population',
          articles: [
            {
              title: "Taiwan's low birthrate crisis",
              href: '/society/台灣少子化危機',
            },
            {
              title: '2026 nine-in-one elections',
              href: '/politics/2026 九合一選舉',
            },
          ],
        },
        {
          key: 'culture_tourism_sport',
          articles: [
            {
              title: 'Night market culture',
              href: '/food/夜市文化',
            },
            {
              title: "Taiwan's baseball culture",
              href: '/culture/台灣棒球文化',
            },
          ],
        },
        {
          key: 'foreign_affairs',
          articles: [
            {
              title: "Taiwan's diplomatic allies and international diplomacy",
              href: '/society/台灣邦交國與國際外交',
            },
          ],
        },
        {
          key: 'gov_publication',
          proposed: {
            story:
              'Taiwan in the gazettes: what the government announces about itself each month',
            datasets: [
              {
                name: 'Executive Yuan Gazette Online',
                href: 'https://gazette.nat.gov.tw/',
                freq: 'daily',
              },
              {
                name: 'Taipei City Government Gazette',
                href: 'https://data.gov.tw/dataset/132348',
                freq: 'monthly',
              },
            ],
            how: 'Build keyword time series of regulatory changes from gazette full texts, then set them against the Legislative Yuan records in the legislature domain: the time gap between administrative announcements and the legislative trail is the real speed at which a policy takes effect.',
          },
        },
        {
          key: 'geo_basemap',
          articles: [
            {
              title: 'How to read a map of Taiwan',
              href: '/geography/台灣地圖怎麼讀',
            },
          ],
        },
        {
          key: 'utilities_telecom',
          articles: [
            {
              title: "Taiwan's nuclear power debate",
              href: '/society/台灣與核能的討論',
            },
          ],
        },
      ],
    },
    recipes: {
      title:
        'Analysis recipes: which data to use, and how to combine it, to understand one thing',
      lead: 'This is the heart of the page. Each card is a real analysis question: which datasets to use, what keys join them, what method to read them with, and which article has already turned the analysis into a story.',
      combineLabel: 'How to combine',
      methodLabel: 'How best to analyze',
      articlesLabel: 'Stories already written',
      items: [
        {
          question:
            'Housing justice: the cheap homes the government built — who got rich off them in the end?',
          datasets: [
            {
              name: 'Nationwide real-price registration (sales)',
              href: 'https://lvr.land.moi.gov.tw/',
              freq: 'quarterly',
            },
            {
              name: 'Taipei City public housing allocation and rental records',
              href: 'https://data.gov.tw/dataset/121267',
              freq: 'irregular',
            },
            {
              name: 'Taipei City social housing sublease-and-management matching statistics',
              href: 'https://data.gov.tw/dataset/155779',
              freq: 'yearly',
            },
          ],
          combine:
            'Align by administrative district and housing complex name: allocation records tell you what price the government sold at back then, real-price registration tells you what the same address is worth today, and the social housing statistics give the volumes after the shift from selling to renting.',
          method:
            "Build a time series for the same complex, then segment it by policy milestones: allocation sales in 1985, the resale wall coming down in 2002, rent-only-no-sale in 2016, Taoyuan's return to selling in 2026. The appreciation multiple divided by the years elapsed is the slope of the 'asset escalator'.",
          articles: [
            {
              title: 'Public housing and housing justice',
              href: '/society/國宅與居住正義',
            },
            {
              title: 'Social housing and housing justice',
              href: '/society/社會住宅與居住正義',
            },
          ],
        },
        {
          question:
            'Energy transition: nuclear power went to zero and then restarted — what happened in the numbers?',
          datasets: [
            {
              name: 'Taipower: 10-year nuclear generation performance and carbon reduction',
              href: 'https://data.gov.tw/dataset/10859',
              freq: 'yearly',
            },
            {
              name: 'Taipower: nuclear plant locations and unit equipment',
              href: 'https://data.gov.tw/dataset/10858',
              freq: 'irregular',
            },
          ],
          combine:
            "Generation performance gives annual output and capacity factors; the unit table gives each reactor's decommissioning date. Align the two tables by year, then overlay the referendum and policy milestones.",
          method:
            "Draw an annual capacity-factor curve and mark the three referendums (2018, 2021, 2025): how the curve descends to zero, and whether a single number moves within a year of each vote — the time lag between 'political decisions' and 'physical reality' surfaces on its own.",
          articles: [
            {
              title: "Taiwan's nuclear power debate",
              href: '/society/台灣與核能的討論',
            },
            {
              title: "Taiwan's climate crisis and net-zero transition",
              href: '/nature/台灣氣候危機與淨零轉型',
            },
          ],
        },
        {
          question:
            'NHI finances: who uses it, who pays in, and how many more years can the system hold?',
          datasets: [
            {
              name: 'NHI enrollees by category, sex, and age bracket',
              href: 'https://data.gov.tw/dataset/20254',
              freq: 'quarterly',
            },
            {
              name: 'National Health Insurance Committee meeting minutes',
              href: 'https://data.gov.tw/dataset/7554',
              freq: 'monthly',
            },
            {
              name: 'Government subsidies for disadvantaged enrollees (all levels)',
              href: 'https://data.gov.tw/dataset/23719',
              freq: 'monthly',
            },
          ],
          combine:
            'Enrollment counts by age bracket yield the structural ratio of those who pay to those who use; the minutes give the timeline of premium-rate decisions; the subsidy statistics show the implementation side of ability-to-pay.',
          method:
            "Turn the age-structure ratio into a quarterly series and overlay the premium-rate decisions: the structure keeps deteriorating while the rate stays put, so what fills the gap (budget injections, point values, copayments)? Every 'maintain without adjustment' in the minutes has a corresponding cost entry.",
          articles: [
            {
              title: "Taiwan's healthcare and National Health Insurance",
              href: '/lifestyle/台灣醫療與全民健保',
            },
            {
              title: "Taiwan's low birthrate crisis",
              href: '/society/台灣少子化危機',
            },
          ],
        },
        {
          question:
            "Democratic quality: how big is an election's electorate, and how intense is the enforcement?",
          datasets: [
            {
              name: 'Eligible voter counts (Central Election Commission)',
              href: 'https://data.gov.tw/dataset/27491',
              freq: 'every 4 years',
            },
            {
              name: 'Persons with final convictions under the Election and Recall Act',
              href: 'https://data.gov.tw/dataset/15035',
              freq: 'monthly',
            },
          ],
          combine:
            "Voter counts give each election's electorate; the conviction statistics give the yearly conviction volumes for vote-buying and election interference. Both slice by county and align with election results.",
          method:
            "Build an 'electorate × conviction rate' pairing for each election cycle and compare enforcement intensity across cycles. The 2026 round adds AI disinformation as a new enforcement focus — establish the baseline for the two traditional categories (vote-buying, interference) first, so the scale of the new threat has a frame of reference.",
          articles: [
            {
              title: '2026 nine-in-one elections',
              href: '/politics/2026 九合一選舉',
            },
            {
              title: 'The Sunflower Movement',
              href: '/society/太陽花學運',
            },
          ],
        },
        {
          question:
            'Street economy: how was the output of 230,000 vendor stalls actually calculated?',
          datasets: [
            {
              name: 'Street vendor operations census',
              href: 'https://data.gov.tw/dataset/10918',
              freq: 'every 5 years',
            },
            {
              name: 'Taichung City registered night markets',
              href: 'https://data.gov.tw/dataset/85028',
              freq: 'irregular',
            },
          ],
          combine:
            'The five-year census by DGBAS (Directorate-General of Budget, Accounting and Statistics) gives the national vendor population (stall counts, workers, revenue); the county registries give the roster of night markets officially recognized by government.',
          method:
            'Cross-census comparison is the key: five-year changes in stall counts and revenue, set against mobile-payment penetration and tourist arrivals. When the next census lands, every article citing the 233,000-stall figure should come back and reconcile.',
          articles: [
            {
              title: 'Night market economics',
              href: '/economy/夜市經濟學',
            },
            {
              title: 'Night market culture',
              href: '/food/夜市文化',
            },
          ],
        },
        {
          question:
            'Road safety: what links 14 million scooters to three thousand deaths a year?',
          datasets: [
            {
              name: 'Motor vehicle registration statistics',
              href: 'https://data.gov.tw/dataset/14208',
              freq: 'monthly',
            },
            {
              name: 'Taoyuan City A1/A2 crash casualty statistics (2002–2025)',
              href: 'https://data.gov.tw/dataset/25932',
              freq: 'yearly',
            },
          ],
          combine:
            'Vehicle registrations give the denominator (exposure); crash casualties give the numerator. Use the long county-level series (24 years for Taoyuan) as the methodological template first, then extend to other counties.',
          method:
            "Don't stop at absolute death counts — normalize to casualties per 100,000 vehicles, computed separately for scooters and cars; the 'pedestrian hell' debate needs exactly this denominator.",
          articles: [
            {
              title: "Taiwan's transportation system",
              href: '/lifestyle/台灣交通系統',
            },
            {
              title: "Taiwan's scooter culture",
              href: '/lifestyle/台灣機車文化',
            },
          ],
        },
      ],
    },
    method: {
      title: 'Joining methodology: the keys that line two tables up',
      lead: 'A single dataset is a dot; only combination makes a web. These are the joining clues our testing found most useful.',
      spectrum: {
        title:
          'Update frequency = analysis resolution: a spectrum of the fifteen showcase datasets',
        left: '← Updated monthly: event studies possible',
        right: 'Once every five years: cross-period comparison only →',
        note: 'Each dot is a dataset cited on this page; hover to see its name. Before designing an analysis, check which end of the spectrum your data sits on.',
      },
      items: [
        {
          name: 'Administrative district codes',
          desc: 'The most universal join key. Standard codes for counties, cities, townships, and districts let population, housing prices, crashes, and tax revenue align onto one map; identically named districts (two Xinyi Districts) are disambiguated by code.',
        },
        {
          name: 'Unified business numbers',
          desc: "A company's ID card. Business registrations, procurement awards, patent filings, and penalty lists all carry the unified number — it is how you trace a company's complete footprint.",
        },
        {
          name: 'Coordinates and station codes',
          desc: 'Environmental data (air quality, water quality, weather) hangs off monitoring stations; geographic data hangs off coordinates. Converting between these and administrative district codes is step one of any spatial analysis.',
        },
        {
          name: 'Quality tiers',
          desc: "The platinum-to-bronze tiers are a quick screen for 'can this dataset be used as-is': platinum ones are mostly normalized and queryable as structured rows; untested ones (like the self-curated real-price registration) you verify yourself.",
        },
        {
          name: 'Update frequency is analysis resolution',
          desc: 'Monthly data supports event studies, yearly data only trends, five-yearly data (the vendor census) only cross-period comparison. Check the frequency before designing the analysis, not the other way around.',
        },
        {
          name: 'The dual-pointer principle',
          desc: "When Taiwan.md articles cite a dataset, the link always points to data.gov.tw or the competent authority's persistent page, with the query layer (Twinkle Hub) as a parallel value-added path. Keep the data's home and the query path separate, and a change in either layer never breaks the chain.",
        },
      ],
    },
    tools: {
      title: 'Tool catalog: the complete list of 21 tools',
      lead: 'Crawled directly from the MCP endpoint (refreshed on every page rebuild). The grouping is ours.',
      groups: [
        {
          prefix: [
            'search_datasets',
            'get_dataset',
            'query_rows',
            'materialize_dataset',
            'list_domains',
          ],
          label: 'Core dataset four-piece kit + domain index',
        },
        {
          prefix: ['search_patents', 'get_patent_body'],
          label: 'Patents',
        },
        {
          prefix: ['search_exam', 'search_exam_questions', 'get_exam_paper'],
          label: 'National exams',
        },
        {
          prefix: ['search_judicial', 'get_judicial_full'],
          label: 'Court judgments',
        },
        {
          prefix: [
            'lookup_icd10',
            'search_drug',
            'get_drug_details',
            'search_health_supplements',
            'search_drug_label',
            'check_drug_interaction',
          ],
          label: 'Drugs and medical codes',
        },
        {
          prefix: [
            'query_food_nutrition',
            'search_foods_by_nutrient',
            'analyze_meal_nutrition',
          ],
          label: 'Food nutrition',
        },
      ],
    },
    footer: {
      crawledLabel: 'Tool and domain lists on this page crawled live at',
      note: "Twinkle Hub is in alpha, and this page's assessment will be updated as it evolves. Taiwan.md currently has no commercial relationship of any kind with Twinkle Hub; this page is a heavy user's first-hand checkup — and an invitation: only when the data layer and the meaning layer work together will Taiwan be understood in full.",
      pilotTitle: 'Articles already wired to the data layer',
      pilotLead:
        "Starting June 2026, we are adding a 'Public data' section at the end of articles: each lists the datasets that could verify (or overturn) the article's claims, with one line on why each pointer is there. The first batch of six:",
      pilotArticles: [
        {
          title: "Taiwan's nuclear power debate",
          href: '/society/台灣與核能的討論',
        },
        {
          title: 'Public housing and housing justice',
          href: '/society/國宅與居住正義',
        },
        {
          title: "Taiwan's healthcare and National Health Insurance",
          href: '/lifestyle/台灣醫療與全民健保',
        },
        {
          title: 'Night market economics',
          href: '/economy/夜市經濟學',
        },
        {
          title: "Taiwan's transportation system",
          href: '/lifestyle/台灣交通系統',
        },
        {
          title: '2026 nine-in-one elections',
          href: '/politics/2026 九合一選舉',
        },
      ],
    },
  },
  ja: {
    meta: {
      title:
        'オープンデータ・キュレーション — 台湾オープンデータ × Twinkle Hub の意味レイヤーガイド',
      description:
        '5万件の政府データセットは、誰にとっても圧倒される量です。このページは Taiwan.md によるデータキュレーション：どのデータが見る価値を持つのか、ひとつの問いを分析するにはどう組み合わせるのか、そしてそれぞれの数字がこの島のどんな物語とつながっているのか。Twinkle Hub の完全性・安定性・アクセス簡素化に関する一次実測評価も含みます。',
    },
    hero: {
      eyebrow: 'OPEN DATA CURATION',
      title: 'オープンデータ・キュレーション',
      subtitle: '台湾オープンデータ × Twinkle Hub の意味レイヤーガイド',
      intro: [
        '台湾政府のオープンデータプラットフォームには、5万2千件を超えるデータセットがあります。この数字は、使おうとする誰にとっても圧倒的です。どれが重要なのか、どれがいつまで更新されているのか、どの2つの表を突き合わせられるのか分からず、ましてや自分が気にかけている問いとどう関係するのかは見当もつきません。',
        'Taiwan.md は台湾について1,100本以上の記事を書いてきました。その一本一本の背後には「この話はどのデータで検証すべきか」という判断があります。このページはその判断の層を開いて見せるものです。私たちがデータ基盤をどう評価しているのか、ひとつの問いを分析するときにどのデータセットをどう組み合わせるのか、そしてそれぞれのデータ領域がこの島のどんな物語とつながっているのか。',
      ],
      viz: {
        stats: [
          {
            n: 52556,
            suffix: '',
            label: '政府データセット（2026-10-23）',
          },
          {
            n: 1240000,
            suffix: '+',
            label: '判決文全文',
          },
          {
            n: 320663,
            suffix: '',
            label: '国家試験問題',
          },
          {
            n: 226825,
            suffix: '',
            label: '栄養分析行',
          },
          {
            n: 135000,
            suffix: '+',
            label: '調達記録',
          },
        ],
        graphHint:
          'この下に広がる網は本物です。左側は20のデータ領域と5つの垂直コーパス（リアルタイムでクロール）、右側はすでに書かれた Taiwan.md の記事。一本一本の線が、このページのキュレーション判断そのものです。ドラッグしたりホバーしたりしながら、複雑なデータが明快な物語へつながっていく様子を見てください。',
        legend: {
          domain: 'データ領域',
          vertical: '垂直コーパス',
          article: 'Taiwan.md 記事',
          center: 'Taiwan.md 意味レイヤー',
        },
      },
    },
    ecosystem: {
      title: 'エコシステムの地図：三つの層、それぞれの持ち場',
      lead: 'AI（あるいは人間）が「台湾についての問い」に本当に答えるには、三つの層の協働が必要です。データの家、クエリの道、そして意味の層。',
      layers: [
        {
          name: 'data.gov.tw と各機関のシステム',
          role: 'データの家（SSOT）',
          desc: '政府データオープンプラットフォームは、各データセットの恒久的なアイデンティティです。データセット番号、ライセンス、所管機関、元データのダウンロード。すべての引用は、最終的にここへ帰るべきです。',
          stat: '約5万件のデータセット',
        },
        {
          name: 'Twinkle Hub',
          role: 'クエリの道（MCP ゲートウェイ）',
          desc: '台湾初の MCP Hub。100以上の政府ポータルに散らばるデータを、単一のクエリエンドポイントに包み込みます。セマンティック検索、構造化された行クエリ、5つの垂直領域ツール。AI が一度の呼び出しでデータを手にでき、ポータルをまたぐ人力の泥沼を省けます。',
          stat: '21のツール・20の領域',
        },
        {
          name: 'Taiwan.md',
          role: '意味の層（キュレーション）',
          desc: 'データは自分では語りません。どのデータセットを指すべきか、それがどの論点を検証するのか、どの歴史とつながるのか——それがキュレーションの仕事です。Taiwan.md の記事は2026年6月から順次「公開データ」セクションを備え、物語と一次データを縫い合わせています。',
          stat: '1,100本超の記事・15のデータセットポインタ稼働中',
        },
      ],
    },
    assessment: {
      title: '三つの軸での評価：実測で何が見えたか',
      lead: '以下は、Taiwan.md がいちユーザーとして、自前の検証ツールで行った一次評価です（2026年5月と6月の2回の実測）。三つの軸に沿って開いて見せます。広告ではなく、健康診断です。',
      gapsLabel: '正直な弱点',
      dims: [
        {
          name: 'データの完全性',
          verdict: 'カバレッジは本物、しかも単なるミラーを超えている',
          points: [
            'data.gov.tw 自体は2026-10-23時点で52,556件のデータセットを公開。Twinkle Hub のサイトは台湾分として53,185件（自前キュレーション分を含む）を表示し、さらに13.5万件の政府電子調達記録と立法院データも収録（2026-06棚卸し）',
            '20の領域分類それぞれに「典型的な問い」と「アンカー例」が付き、各データセットには品質階層（プラチナから銅まで）・更新頻度・フォーマット・結合可能なキーを明記',
            '独自キュレーションのデータセットが政府ポータルの穴を埋めている：全国不動産実取引価格登録（売買／完成前販売／賃貸）は内政部地政司のシステムに直結',
            '5つの垂直コーパスは単純なミラーを超えている：特許全文、国家試験問題バンク、判決文、医薬品許可証と食品栄養（規模は次節参照）',
          ],
          gaps: [
            '検索ランキングが県市スライスに偏る：「出生率」で検索すると南投・桃園・高雄という3つの県市レベルのデータセットが返り、全国スケールの1件は人の目で拾うしかない——まさにキュレーションが存在する理由',
            '領域ごとのデータセット総数は照会できず、棚卸しは公式の公称値に頼るしかない',
            '一部の古いデータセットはいまだ正規化されていない ODS 形式で、構造化された行クエリができない',
          ],
        },
        {
          name: '安定性',
          verdict: 'alpha の素顔：走るのも速く、変わるのも速い',
          points: [
            'クエリ遅延は実測でキャッシュヒット時100ms未満。毎回のレスポンスに trace_id とコスト欄が付き、透明性が高い',
            'ツール説明にバージョン番号が埋め込まれており（v1.11.2 集計クエリ、v1.18 判決文）、イテレーションのリズムが見える',
            '判決文コーパスは現在 alpha の範囲を明記している（2024-05〜2026-03の約124万件）——境界をはっきり示すほうが、完全なふりをするより誠実',
          ],
          gaps: [
            '2か月で2回の API インターフェース変更：2026-05-11から06-10の間に、接続方式が session ハンドシェイクへ変わり、ツールは40個から21個へ再編され、決定論的ツール群はまるごと廃止された',
            'alpha 期間ですでにレート制限（HTTP 429）が発生しているが、制限ウィンドウは未公表',
            '私たちの対策：薄いラッパー層でインターフェース変更を隔離し、記事からの参照はすべて静的ポインタとして書き、実行時に API へ依存しない——alpha サービスへの接続はすべてこうあるべき',
          ],
        },
        {
          name: 'アクセスの簡素化',
          verdict: 'これがいちばんの強み',
          points: [
            '1つの MCP エンドポイントが100以上の政府ポータルを置き換える：検索・メタデータ取得・行クエリ・集約の4段構成で、フィールドスキーマが一貫している',
            '構造化された行クエリは SQL 条件と集計に対応し、正規化済みのデータセットはそのままデータベースとして使える',
            '同じ住所・年・行政区の問いに、かつては3〜5のポータルをまたいで15〜30分の人手照合が必要だった。いまは一度の呼び出しで1秒未満',
            'ワンクリックのインストールパッケージで Claude、Cursor など10種以上の AI クライアントが直接つながる——「AI が台湾のデータを読める」ことの摩擦が一桁減った',
          ],
          gaps: [
            'API キー（bearer token）が必要。現在は alpha につき無料、将来はツール単位の課金——無料の経路が永遠に残るのかは、オープンデータのエコシステムが問い続けるべき問題',
            'サービス自体はクローズドソース：データは開かれているが、通り道は今のところそうではない。data.gov.tw の元データダウンロードは、どんなゲートウェイをも迂回できる最後の保険であり続ける',
          ],
        },
      ],
    },
    verticals: {
      title: '5つの垂直コーパス：ミラーを超えた部分',
      lead: 'データセットを検索インターフェースで包むだけなら珍しくありません。以下の5つの垂直領域はセマンティック検索と構造化抽出まで踏み込んでおり、Twinkle Hub が「data.gov.tw のミラー」を超えている部分です。',
      logNote:
        '規模バーは対数スケールです。判決文コーパスは医薬品許可証の17倍あり、線形で描くと残りの4本は見えないほど潰れてしまいます。',
      items: [
        {
          name: '特許',
          stat: 'TIPO 発明特許公開案件の全文',
          desc: '特許コーパスを自然言語で照会でき、完全な技術記述と請求項を取得できます。台湾の産業記事を書くとき、「この会社は本当にこの技術を持っているのか」を、初めてセマンティック検索で検証できるようになりました。',
        },
        {
          name: '国家試験',
          stat: '64,815部の試験問題・32万問（2012–2025）',
          desc: '考選部の歴代試験問題と設問単位の検索。台湾の国家試験文化（公務員ブーム、予備校街）は、まだデータで語られたことのない物語です。',
        },
        {
          name: '判決文',
          stat: '約124万件（2024-05〜2026-03、alpha）',
          desc: '判決文コーパスを平易な言葉で検索できます。司法・労使・賃貸トラブル系の記事における「実務で裁判所はどう判断しているのか」に、検証可能な入口ができました。',
        },
        {
          name: '医薬品と健康',
          stat: '71,836件の医薬品許可証・96,803の ICD-10 中国語コード',
          desc: '医薬品許可証、添付文書の構造化フィールド、健康食品認証、相互作用の一次スクリーニング。健康保険・医療記事のファクト層です。',
        },
        {
          name: '食品栄養',
          stat: '226,825行の栄養分析',
          desc: '衛生福利部の食品栄養成分データベース。食材ごとに20余りの栄養素が載り、栄養素別のランキングも一食分の合計計算もできます。夜市・食文化記事の数字の土台です。',
        },
      ],
    },
    domains: {
      title: '20のデータ領域 × Taiwan.md の物語マップ',
      lead: '左は Twinkle Hub の領域分類（リアルタイムでクロール）、右は私たちのキュレーション対応：その領域のデータが、この島のどの記事とつながっているか。「物語はこれから」と記した領域は、旗艦データセットと分析パスのキュレーションは完了し、記事はまだ書かれていません。それは私たちの開発マップであり、書いてみたい誰かへの招待状でもあります。',
      questionsLabel: '典型的な問い',
      articlesLabel: 'つながる記事',
      blankLabel: '物語はこれから',
      proposedStoryLabel: '書きうる物語',
      proposedHowLabel: '分析の方法',
      map: [
        {
          key: 'realestate_land',
          articles: [
            {
              title: '国民住宅と居住正義',
              href: '/society/國宅與居住正義',
            },
            {
              title: '社会住宅と居住正義',
              href: '/society/社會住宅與居住正義',
            },
          ],
        },
        {
          key: 'economy_business',
          articles: [
            {
              title: '経済カテゴリの記事一覧',
              href: '/economy',
            },
            {
              title: '台湾企業：中華電信',
              href: '/economy/台灣企業：中華電信',
            },
          ],
        },
        {
          key: 'procurement_subsidy',
          proposed: {
            story:
              '誰が台湾を落札したのか：13.5万件の落札記録に見る政府アウトソーシングの地図',
            datasets: [
              {
                name: '政府電子調達網の入札・落札公告',
                href: 'https://web.pcc.gov.tw/',
                freq: '半月ごと',
              },
              {
                name: '巨額調達の履行期間中の業者リスト',
                href: 'https://data.gov.tw/dataset/7264',
                freq: '毎日',
              },
            ],
            how: '統一番号で落札記録を商業登記につなぎます。ある業者が歴年、どの機関からいくら落札してきたのか。金額・機関・年の3軸でヒートマップにすれば、公共支出の地理と人脈がおのずと浮かび上がります。',
          },
        },
        {
          key: 'public_finance',
          articles: [
            { title: '中央政府総予算', href: '/politics/中央政府總預算' },
          ],
        },
        {
          key: 'tax_revenue',
          proposed: {
            story: 'あなたの県市はどの税で生きているのか：地方財政の体質検査',
            datasets: [
              {
                name: '桃園市の地方税実徴収純額・年次統計',
                href: 'https://data.gov.tw/dataset/147936',
                freq: '毎年',
              },
              {
                name: '花蓮県の各税目実徴収純額（当月分）',
                href: 'https://data.gov.tw/dataset/177569',
                freq: '不定期',
              },
            ],
            how: '各県市の実徴収純額を税目別に分解します。誰が地価税と家屋税に頼り（都市部）、誰が中央統籌分配税款（交付金）に頼っているのか（非都市部）。人口・住宅価格データと行政区コードで揃えれば、財政自主性のランキングはおのずと算出できます。',
          },
        },
        {
          key: 'transport',
          articles: [
            {
              title: '台湾の交通システム',
              href: '/lifestyle/台灣交通系統',
            },
            {
              title: '台湾のバイク文化',
              href: '/lifestyle/台灣機車文化',
            },
          ],
        },
        {
          key: 'public_safety',
          articles: [
            {
              title: '台風',
              href: '/nature/颱風',
            },
          ],
        },
        {
          key: 'judicial_legal',
          articles: [
            {
              title: '台湾の司法改革と予防的勾留制度',
              href: '/society/台灣司法改革與預防性羈押制度',
            },
          ],
        },
        {
          key: 'legislature',
          articles: [
            {
              title: 'ひまわり学生運動',
              href: '/society/太陽花學運',
            },
          ],
        },
        {
          key: 'health_food',
          articles: [
            {
              title: '台湾の医療と全民健康保険',
              href: '/lifestyle/台灣醫療與全民健保',
            },
          ],
        },
        {
          key: 'environment',
          articles: [
            {
              title: '台湾環境運動史',
              href: '/nature/台灣環境運動史',
            },
            {
              title: '台湾の気候危機とネットゼロ転換',
              href: '/nature/台灣氣候危機與淨零轉型',
            },
          ],
        },
        {
          key: 'education_research',
          articles: [
            {
              title: '台湾の教育制度',
              href: '/lifestyle/台灣教育制度',
            },
            {
              title: '台湾のへき地教育',
              href: '/society/台灣偏鄉教育',
            },
          ],
        },
        {
          key: 'agriculture_fisheries',
          articles: [
            {
              title: '台湾のコーヒー産業',
              href: '/food/台灣咖啡產業',
            },
            {
              title: '茶文化',
              href: '/food/茶文化',
            },
          ],
        },
        {
          key: 'labor_employment',
          articles: [{ title: '誰が低賃金なのか', href: '/society/誰算低薪' }],
        },
        {
          key: 'social_population',
          articles: [
            {
              title: '台湾の少子化危機',
              href: '/society/台灣少子化危機',
            },
            {
              title: '2026年九合一選挙',
              href: '/politics/2026 九合一選舉',
            },
          ],
        },
        {
          key: 'culture_tourism_sport',
          articles: [
            {
              title: '夜市文化',
              href: '/food/夜市文化',
            },
            {
              title: '台湾の野球文化',
              href: '/culture/台灣棒球文化',
            },
          ],
        },
        {
          key: 'foreign_affairs',
          articles: [
            {
              title: '台湾の国交樹立国と国際外交',
              href: '/society/台灣邦交國與國際外交',
            },
          ],
        },
        {
          key: 'gov_publication',
          proposed: {
            story: '公報の中の台湾：政府は毎月、自ら何を公告しているのか',
            datasets: [
              {
                name: '行政院公報情報ネット',
                href: 'https://gazette.nat.gov.tw/',
                freq: '毎日',
              },
              {
                name: '台北市政府公報',
                href: 'https://data.gov.tw/dataset/132348',
                freq: '毎月',
              },
            ],
            how: '公報全文から法規改正キーワードの時系列を作り、legislature 領域の立法院記録と対照します。行政の公告と立法の軌跡のあいだの時間差こそ、ひとつの政策が本当に効力を持つまでの速度です。',
          },
        },
        {
          key: 'geo_basemap',
          articles: [
            {
              title: '台湾の地図の読み方',
              href: '/geography/台灣地圖怎麼讀',
            },
          ],
        },
        {
          key: 'utilities_telecom',
          articles: [
            {
              title: '台湾と原子力をめぐる議論',
              href: '/society/台灣與核能的討論',
            },
          ],
        },
      ],
    },
    recipes: {
      title: '分析レシピ：ひとつの問いを読み解くために、どのデータをどう組むか',
      lead: 'ここがこのページの核心です。各カードはひとつの実在する分析の問い：どのデータセットを使い、どのキーで組み合わせ、どの方法で見るのか。そして、どの記事がすでにこの分析を物語として書き上げたのか。',
      combineLabel: '組み合わせ方',
      methodLabel: '最適な分析方法',
      articlesLabel: 'すでに書かれた物語',
      items: [
        {
          question:
            '居住正義：政府が建てた安い住宅は、最後に誰を太らせたのか？',
          datasets: [
            {
              name: '全国不動産実取引価格登録（売買）',
              href: 'https://lvr.land.moi.gov.tw/',
              freq: '3か月ごと',
            },
            {
              name: '台北市国民住宅の分譲（賃貸）状況',
              href: 'https://data.gov.tw/dataset/121267',
              freq: '不定期',
            },
            {
              name: '台北市社会住宅の借り上げ・管理代行マッチング統計',
              href: 'https://data.gov.tw/dataset/155779',
              freq: '毎年',
            },
          ],
          combine:
            '行政区と団地名で揃えます。国民住宅の分譲記録は「政府が当時いくらで売ったか」を、実取引価格登録は「同じ住所が今いくらか」を、社会住宅統計は「売るのをやめて貸すことにした後の量」を与えてくれます。',
          method:
            '同じ団地で時系列を作り、政策の節目で区切って対照します。1985年の分譲、2002年の壁の撤去、2016年の「貸すだけで売らない」、2026年の桃園での販売再開。値上がり倍率を年数で割れば、それが「資産のエスカレーター」の傾きです。',
          articles: [
            {
              title: '国民住宅と居住正義',
              href: '/society/國宅與居住正義',
            },
            {
              title: '社会住宅と居住正義',
              href: '/society/社會住宅與居住正義',
            },
          ],
        },
        {
          question:
            'エネルギー転換：原発がゼロになり、また再稼働へ。数字の上では何が起きたのか？',
          datasets: [
            {
              name: '台湾電力：直近10年の原子力発電実績とCO2削減効果',
              href: 'https://data.gov.tw/dataset/10859',
              freq: '毎年',
            },
            {
              name: '台湾電力：原子力発電所の位置と各号機の設備',
              href: 'https://data.gov.tw/dataset/10858',
              freq: '不定期',
            },
          ],
          combine:
            '発電実績の表からは年間発電量と設備利用率が、号機一覧からは各号機の退役時点が得られます。2つの表を年度で揃え、その上に国民投票と政策の節目を重ねます。',
          method:
            '設備利用率の年次カーブを1本描き、3回の国民投票（2018、2021、2025）に印を付けます。カーブはどうゼロへ向かったのか、投票後1年以内に動いた数字がひとつでもあったのか——「政治の決定」と「物理の現実」の時差がおのずと浮かび上がります。',
          articles: [
            {
              title: '台湾と原子力をめぐる議論',
              href: '/society/台灣與核能的討論',
            },
            {
              title: '台湾の気候危機とネットゼロ転換',
              href: '/nature/台灣氣候危機與淨零轉型',
            },
          ],
        },
        {
          question:
            '健康保険の財政：誰が使い、誰が払い、この制度はあと何年持つのか？',
          datasets: [
            {
              name: '健康保険の被保険者：類別・性別・年齢層別統計',
              href: 'https://data.gov.tw/dataset/20254',
              freq: '3か月ごと',
            },
            {
              name: '全民健康保険会の会議議事録',
              href: 'https://data.gov.tw/dataset/7554',
              freq: '毎月',
            },
            {
              name: '各級政府による弱者被保険者への補助統計',
              href: 'https://data.gov.tw/dataset/23719',
              freq: '毎月',
            },
          ],
          combine:
            '年齢層別の加入者数から「払う人」と「使う人」の構造比を算出します。議事録は保険料率決定のタイムラインを、弱者補助統計は「能力に応じて払う」の執行面を与えてくれます。',
          method:
            '年齢構造比を四半期ごとの系列にし、保険料率決定の節目を重ねます。構造は悪化し、料率は動かない。その間の穴を何で埋めるのか（公費繰入、点数単価、一部負担）。議事録の中の「調整せず維持」の一回一回に、対応する代価の項目があります。',
          articles: [
            {
              title: '台湾の医療と全民健康保険',
              href: '/lifestyle/台灣醫療與全民健保',
            },
            {
              title: '台湾の少子化危機',
              href: '/society/台灣少子化危機',
            },
          ],
        },
        {
          question:
            '民主主義の品質：ひとつの選挙の母集団はどれだけ大きく、取り締まりはどれだけ強いのか？',
          datasets: [
            {
              name: '選挙人数（中央選挙委員会）',
              href: 'https://data.gov.tw/dataset/27491',
              freq: '4年ごと',
            },
            {
              name: '選挙罷免法違反事件の裁判確定人数',
              href: 'https://data.gov.tw/dataset/15035',
              freq: '毎月',
            },
          ],
          combine:
            '選挙人数は各回の選挙の母集団を、選挙罷免法の裁判統計は買収と選挙介入の歴年の有罪確定数を与えます。どちらも県市別に切り分けられ、選挙結果と揃えられます。',
          method:
            '選挙ごとに「母集団 × 有罪率」の対照を作り、回をまたいで取り締まり強度の変化を比べます。2026年のこの回には AI 偽情報という新しい取り締まり重点が加わりました。従来の2項目（買収、選挙介入）のベースラインを先に立ててこそ、新しい脅威の量に参照系が生まれます。',
          articles: [
            {
              title: '2026年九合一選挙',
              href: '/politics/2026 九合一選舉',
            },
            {
              title: 'ひまわり学生運動',
              href: '/society/太陽花學運',
            },
          ],
        },
        {
          question:
            'ストリート経済：23万の屋台の生産額は、どうやって算出されたのか？',
          datasets: [
            {
              name: '露店商の経営概況調査',
              href: 'https://data.gov.tw/dataset/10918',
              freq: '5年ごと',
            },
            {
              name: '台中市の管理対象夜市',
              href: 'https://data.gov.tw/dataset/85028',
              freq: '不定期',
            },
          ],
          combine:
            '行政院主計総処の5年ごとのセンサスは全国の露店商の母集団（屋台数、従業者、売上）を、県市の管理対象リストは「政府に正式に認められた夜市」の名簿を与えてくれます。',
          method:
            '期をまたいだセンサス比較が鍵です。屋台数と売上の5年間の変化を、モバイル決済の浸透や観光客数と対照します。次のセンサスが公表されたら、23.3万の屋台を引用しているすべての記事はここへ戻って数字を照合すべきです。',
          articles: [
            {
              title: '夜市の経済学',
              href: '/economy/夜市經濟學',
            },
            {
              title: '夜市文化',
              href: '/food/夜市文化',
            },
          ],
        },
        {
          question: '交通安全：1,400万台のバイクと毎年3,000人の命の関係は？',
          datasets: [
            {
              name: '自動車・バイク登録台数統計',
              href: 'https://data.gov.tw/dataset/14208',
              freq: '毎月',
            },
            {
              name: '桃園市 A1/A2 事故死傷統計（民国91–114年）',
              href: 'https://data.gov.tw/dataset/25932',
              freq: '毎年',
            },
          ],
          combine:
            '車両登録台数が分母（リスク曝露量）を、事故死傷が分子を与えます。県市レベルの長期系列（桃園の24年分）をまず方法のテンプレートにし、その後ほかの県市へ広げます。',
          method:
            '死亡者の絶対数だけを見てはいけません——10万台あたりの死傷率で正規化し、バイクと自動車を分けて計算します。「歩行者地獄」論争に必要なのは、まさにこの分母です。',
          articles: [
            {
              title: '台湾の交通システム',
              href: '/lifestyle/台灣交通系統',
            },
            {
              title: '台湾のバイク文化',
              href: '/lifestyle/台灣機車文化',
            },
          ],
        },
      ],
    },
    method: {
      title: '結合の方法論：2つの表を突き合わせるためのキー',
      lead: '単一のデータセットは点にすぎず、組み合わせられて初めて網になります。以下は、私たちの実測で最も役に立った結合の手がかりです。',
      spectrum: {
        title:
          '更新頻度＝分析の解像度：15のショーケースデータセットのスペクトラム',
        left: '← 毎月更新：イベントスタディが可能',
        right: '5年に1度：期をまたぐ比較のみ →',
        note: '各点はこのページで引用しているデータセットのひとつで、ホバーすると名前が見えます。分析を設計する前に、自分のデータがスペクトラムのどちら側に落ちるかをまず確かめてください。',
      },
      items: [
        {
          name: '行政区コード',
          desc: '最も汎用的な結合キーです。県市と郷鎮市区の標準コードによって、人口・住宅価格・事故・税収を同じ地図に揃えられます。同名の区（2つの信義区）もコードで曖昧さを解消できます。',
        },
        {
          name: '統一番号',
          desc: '会社の身分証です。商業登記、調達の落札、特許出願、処分リストのすべてに統一番号が付いています——1つの会社の完全な足跡を追うなら、これに頼ります。',
        },
        {
          name: '経緯度と観測所コード',
          desc: '環境データ（大気質、水質、気象）は観測所に、地理データは座標に紐づきます。行政区コードとの相互変換が空間分析の第一歩です。',
        },
        {
          name: '品質階層',
          desc: 'プラチナから銅までの階層は「このデータセットはそのまま使えるか」のクイック判定です。プラチナ級の多くは正規化済みで、構造化された行クエリが可能。未検査のもの（独自キュレーションの実取引価格登録など）は自分で検証する必要があります。',
        },
        {
          name: '更新頻度すなわち分析の解像度',
          desc: '毎月更新のデータはイベントスタディができ、毎年のものはトレンドしか見えず、5年ごとのもの（露店商センサス）は期をまたぐ比較しかできません。まず頻度を見てから分析を設計する。逆にしてはいけません。',
        },
        {
          name: '二層ポインタ原則',
          desc: 'Taiwan.md の記事がデータセットを引用するとき、リンクは常に data.gov.tw か所管機関の恒久ページを指し、クエリ層（Twinkle Hub）は並列の付加価値ルートに置きます。データの家とクエリの道を分けておけば、どちらの層が変わってもリンクは切れません。',
        },
      ],
    },
    tools: {
      title: 'ツールカタログ：21ツールの完全リスト',
      lead: '以下は MCP エンドポイントから直接クロールしたものです（ページの再ビルドごとに更新）。グルーピングは私たちが加えました。',
      groups: [
        {
          prefix: [
            'search_datasets',
            'get_dataset',
            'query_rows',
            'materialize_dataset',
            'list_domains',
          ],
          label: 'データセット4点セット + 領域インデックス',
        },
        {
          prefix: ['search_patents', 'get_patent_body'],
          label: '特許',
        },
        {
          prefix: ['search_exam', 'search_exam_questions', 'get_exam_paper'],
          label: '国家試験',
        },
        {
          prefix: ['search_judicial', 'get_judicial_full'],
          label: '判決文',
        },
        {
          prefix: [
            'lookup_icd10',
            'search_drug',
            'get_drug_details',
            'search_health_supplements',
            'search_drug_label',
            'check_drug_interaction',
          ],
          label: '医薬品と医療コード',
        },
        {
          prefix: [
            'query_food_nutrition',
            'search_foods_by_nutrient',
            'analyze_meal_nutrition',
          ],
          label: '食品栄養',
        },
      ],
    },
    footer: {
      crawledLabel: 'このページのツールと領域リストのクロール日時',
      note: 'Twinkle Hub は alpha 段階にあり、このページの評価はその進化に合わせて更新されます。Taiwan.md と Twinkle Hub のあいだに現在、商業的な関係は一切ありません。このページはヘビーユーザーによる一次健康診断であり、同時にひとつの招待状でもあります。データの層と意味の層が手を組んで初めて、台湾は完全に理解されるのです。',
      pilotTitle: 'すでにデータ層につながった記事',
      pilotLead:
        '2026年6月から、記事の末尾に「公開データ」セクションを加え始めました。各記事の論点を検証（あるいは反証）できるデータセットを列挙し、「なぜこれを指すのか」を一言添えています。第一陣の6本：',
      pilotArticles: [
        {
          title: '台湾と原子力をめぐる議論',
          href: '/society/台灣與核能的討論',
        },
        {
          title: '国民住宅と居住正義',
          href: '/society/國宅與居住正義',
        },
        {
          title: '台湾の医療と全民健康保険',
          href: '/lifestyle/台灣醫療與全民健保',
        },
        {
          title: '夜市の経済学',
          href: '/economy/夜市經濟學',
        },
        {
          title: '台湾の交通システム',
          href: '/lifestyle/台灣交通系統',
        },
        {
          title: '2026年九合一選挙',
          href: '/politics/2026 九合一選舉',
        },
      ],
    },
  },
  ko: {
    meta: {
      title:
        '오픈데이터 큐레이션 — 대만 공공데이터 × Twinkle Hub 의미 레이어 가이드',
      description:
        '5만 개의 정부 데이터셋은 누구에게나 압도적입니다. 이 페이지는 Taiwan.md의 데이터 큐레이션입니다: 어떤 데이터가 볼 가치가 있는지, 무언가를 분석하려면 어떻게 조합해야 하는지, 그리고 각 숫자 뭉치가 이 섬의 어떤 이야기와 이어지는지. Twinkle Hub의 완전성·안정성·접근 단순화에 대한 1차 실측 평가를 담았습니다.',
    },
    hero: {
      eyebrow: 'OPEN DATA CURATION',
      title: '오픈데이터 큐레이션',
      subtitle: '대만 공공데이터 × Twinkle Hub 의미 레이어 가이드',
      intro: [
        '대만 정부의 공공데이터 플랫폼에는 5만 2천 개가 넘는 데이터셋이 있습니다. 이 숫자는 쓰려는 사람 누구에게나 압도적입니다. 어떤 것이 중요한지, 어디까지 갱신됐는지, 어느 두 표를 맞붙일 수 있는지, 그리고 그것들이 내가 관심 있는 문제와 무슨 관계인지 알 수 없기 때문입니다.',
        'Taiwan.md는 대만에 관한 1,100여 편의 글을 썼고, 모든 글 뒤에는 "이 일은 어떤 데이터로 검증해야 하는가"라는 판단이 있습니다. 이 페이지는 그 판단의 층을 펼쳐 보입니다: 우리가 데이터 인프라를 어떻게 평가하는지, 무언가를 분석할 때 어떤 데이터셋을 어떻게 조합하는지, 그리고 각 데이터 영역이 이 섬의 어떤 이야기와 이어지는지.',
      ],
      viz: {
        stats: [
          {
            n: 52556,
            suffix: '',
            label: '정부 데이터셋 (2026-10-23)',
          },
          {
            n: 1240000,
            suffix: '+',
            label: '판결문 전문',
          },
          {
            n: 320663,
            suffix: '',
            label: '국가고시 문항',
          },
          {
            n: 226825,
            suffix: '',
            label: '영양 분석 행',
          },
          {
            n: 135000,
            suffix: '+',
            label: '조달 기록',
          },
        ],
        graphHint:
          '아래 그물망은 실제 데이터입니다. 왼쪽은 20개 데이터 영역과 5대 코퍼스(실시간 크롤링), 오른쪽은 이미 쓰인 Taiwan.md 글입니다. 모든 선 하나하나가 이 페이지의 큐레이션 판단입니다. 드래그하고 마우스를 올려, 복잡한 데이터가 어떻게 선명한 이야기로 이어지는지 보세요.',
        legend: {
          domain: '데이터 영역',
          vertical: '수직 코퍼스',
          article: 'Taiwan.md 글',
          center: 'Taiwan.md 의미 레이어',
        },
      },
    },
    ecosystem: {
      title: '생태 지도: 세 층이 각자의 자리를 지킨다',
      lead: 'AI(또는 사람)가 "대만에 관한 것"에 제대로 답하려면 세 층의 협력이 필요합니다: 데이터의 집, 조회의 길, 의미의 층.',
      layers: [
        {
          name: 'data.gov.tw와 각 기관 시스템',
          role: '데이터의 집(SSOT)',
          desc: '정부 공공데이터 플랫폼은 모든 데이터셋의 영속적 신원입니다: 데이터셋 번호, 라이선스, 주관 기관, 원본 다운로드. 모든 인용은 결국 여기로 돌아와야 합니다.',
          stat: '약 5만 개 데이터셋',
        },
        {
          name: 'Twinkle Hub',
          role: '조회의 길(MCP 게이트웨이)',
          desc: '대만 최초의 MCP Hub. 수백 개 정부 포털에 흩어진 데이터를 단일 조회 엔드포인트로 묶었습니다: 시맨틱 검색, 구조화 행 조회, 다섯 개 수직 영역 도구. AI가 한 번의 호출로 데이터를 받아, 포털을 넘나드는 수작업의 늪을 건너뜁니다.',
          stat: '21개 도구・20개 영역',
        },
        {
          name: 'Taiwan.md',
          role: '의미의 층(큐레이션)',
          desc: '데이터는 스스로 말하지 않습니다. 어떤 데이터셋을 가리킬 가치가 있는지, 그것이 어떤 논점을 검증하는지, 어떤 역사와 이어지는지를 정하는 것이 큐레이션의 일입니다. 우리 글은 2026년 6월부터 한 편씩 "공개 데이터" 섹션을 달아, 서사와 원본 데이터를 꿰매고 있습니다.',
          stat: '1,100+ 편의 글・15개 데이터셋 포인터 가동 중',
        },
      ],
    },
    assessment: {
      title: '3차원 평가: 우리가 실측한 것',
      lead: '아래는 Taiwan.md가 사용자 입장에서 자체 검증 도구로 수행한 1차 평가입니다(2026년 5월과 6월 두 차례 실측). 세 가지 차원으로 펼쳤습니다. 광고가 아니라 건강검진입니다.',
      gapsLabel: '정직한 한계',
      dims: [
        {
          name: '데이터의 완전성',
          verdict: '커버리지는 진짜이며, 미러링을 넘어선다',
          points: [
            'data.gov.tw 자체는 2026-10-23 기준 52,556개 데이터셋을 공개 중이고, Twinkle Hub 사이트는 대만 몫으로 53,185개(자체 큐레이션 포함)를 표시하며, 추가로 13.5만 건의 정부 전자조달 기록과 입법원 자료(2026-06 집계)',
            '20개 영역 분류마다 "전형적 질문"과 "앵커 예시"가 붙고, 각 데이터셋에 품질 등급(플래티넘~브론즈)·갱신 주기·포맷·연결 키가 표시됨',
            '자체 큐레이션 데이터셋이 정부 포털의 빈틈을 메움: 전국 실거래가 등록(매매/분양/임대)을 내정부 지정사 시스템에 직접 연결',
            '다섯 개 수직 코퍼스는 단순 미러링을 넘어섬: 특허 전문, 국가고시 문제은행, 판결문, 의약품 허가와 식품 영양(규모는 아래 섹션 참조)',
          ],
          gaps: [
            "검색 랭킹이 시·현 단위 조각에 치우침: '출생률'을 검색하면 난터우·타오위안·가오슝 세 개 지자체급 데이터셋이 나오고, 전국 단위 데이터는 사람이 골라야 합니다 — 바로 이것이 큐레이션이 존재하는 이유",
            '영역별 데이터셋 총수를 조회할 수 없어, 집계는 공식 발표 숫자에 의존할 수밖에 없음',
            '일부 오래된 데이터셋은 아직 정규화되지 않은 ODS 포맷이라 구조화 행 조회가 불가능',
          ],
        },
        {
          name: '안정성',
          verdict: '알파다운 모습: 빠르게 달리고, 빠르게 바뀐다',
          points: [
            '조회 지연은 실측 기준 캐시 적중 시 100ms 미만, 모든 응답에 trace_id와 비용 필드가 포함되어 투명성이 좋음',
            '도구 설명에 버전 번호가 내장되어(v1.11.2 집계 쿼리, v1.18 판결문) 반복 개발의 리듬이 보임',
            '판결문 코퍼스는 현재 알파 범위를 명시(2024-05~2026-03, 약 124만 건). 경계를 분명히 밝히는 것이 완전한 척하는 것보다 정직합니다',
          ],
          gaps: [
            '두 달 사이 두 번의 API 인터페이스 변경: 2026-05-11~06-10 사이 연결 방식이 세션 핸드셰이크로 바뀌고, 도구가 40개에서 21개로 재편되고, 결정론적 도구 묶음 전체가 내려감',
            '알파 기간에 이미 트래픽 제한(HTTP 429)이 등장했지만 제한 윈도는 미공개',
            '우리의 대응: 얇은 래퍼 층으로 인터페이스 변경을 격리하고, 글의 인용은 전부 정적 포인터로 쓰며 런타임에 API에 의존하지 않습니다. 어떤 알파 서비스든 이렇게 연결해야 합니다',
          ],
        },
        {
          name: '접근의 단순화',
          verdict: '이것이 가장 강한 면이다',
          points: [
            '하나의 MCP 엔드포인트가 수백 개 정부 포털을 대체: 검색, 메타데이터 조회, 행 조회, 집계의 4단계, 필드 스키마 일관',
            '구조화 행 조회는 SQL 조건과 집계를 지원하여, 정규화된 데이터셋은 그대로 데이터베이스처럼 쓸 수 있음',
            '같은 주소·연도·행정구역 문제를 예전에는 서너 개 포털을 오가며 15~30분 수작업으로 대조했지만, 지금은 한 번의 호출로 1초도 안 걸림',
            '원클릭 설치 패키지로 Claude, Cursor 등 열 가지 이상의 AI 클라이언트가 바로 연결됩니다. "AI가 대만의 데이터를 읽게 한다"는 일의 마찰이 한 자릿수 줄었습니다',
          ],
          gaps: [
            'API 키(bearer token)가 필요하고, 현재 알파는 무료이며 향후 도구별 과금 예정입니다. 무료 경로가 영원히 남을지는 오픈데이터 생태계가 계속 물어야 할 질문입니다',
            '서비스 자체는 클로즈드소스: 데이터는 열려 있지만 통로는 아직 아닙니다. data.gov.tw의 원본 다운로드는 어떤 게이트웨이든 우회할 수 있는 최후의 보장 경로입니다',
          ],
        },
      ],
    },
    verticals: {
      title: '다섯 개의 수직 코퍼스: 미러링을 넘어선 부분',
      lead: '데이터셋을 검색 인터페이스로 감싸는 건 드문 일이 아닙니다. 아래 다섯 개 수직 영역은 시맨틱 검색과 구조화 추출까지 해냈으며, 이것이 Twinkle Hub가 "data.gov.tw 미러"를 넘어서는 부분입니다.',
      logNote:
        '규모 막대는 로그 스케일입니다: 판결문 코퍼스는 의약품 허가의 17배라, 선형으로 그리면 나머지 네 막대가 보이지 않게 눌립니다.',
      items: [
        {
          name: '특허',
          stat: 'TIPO 발명특허 공개안 전문',
          desc: '자연어로 특허 코퍼스를 조회하고 완전한 기술 설명과 청구항을 받을 수 있습니다. 대만 산업 글을 쓸 때 "이 회사가 정말 이 기술을 가졌는가"를 처음으로 시맨틱 검색으로 검증할 수 있게 됐습니다.',
        },
        {
          name: '국가고시',
          stat: '64,815개 시험지・32만 문항(2012–2025)',
          desc: '고시원(考選部) 역대 시험지와 문항 단위 검색. 대만의 국가고시 문화(공직 열풍, 학원가)는 아직 데이터로 이야기된 적 없는 서사입니다.',
        },
        {
          name: '판결문',
          stat: '약 124만 건(2024-05~2026-03, 알파)',
          desc: '일상 언어로 판결문 코퍼스를 검색합니다. 사법·노사·임대차 분쟁 글의 "실무에서 법원은 어떻게 판결하는가"에 검증 가능한 입구가 생겼습니다.',
        },
        {
          name: '의약품과 건강',
          stat: '71,836건 의약품 허가・96,803개 ICD-10 중문 코드',
          desc: '의약품 허가증, 첨부문서 구조화 필드, 건강기능식품 인증, 상호작용 1차 스크리닝. 건강보험·의료 글의 사실 레이어입니다.',
        },
        {
          name: '식품 영양',
          stat: '226,825행 영양 분석',
          desc: '위생복리부 식품 영양성분 데이터베이스: 식재료마다 20여 항목의 영양소, 영양소별 순위와 한 끼 합산 계산 가능. 야시장과 음식 글의 숫자 기반입니다.',
        },
      ],
    },
    domains: {
      title: '20개 데이터 영역 × Taiwan.md의 이야기 지도',
      lead: '왼쪽은 Twinkle Hub의 영역 분류(실시간 크롤링), 오른쪽은 우리의 큐레이션 대응입니다: 이 영역의 데이터가 섬의 어떤 글과 이어지는지. "아직 쓰이지 않은 이야기"가 붙은 영역은 대표 데이터셋과 분석 경로의 큐레이션은 끝났지만 글이 아직 없습니다. 그것은 우리의 개발 지도이자, 쓰고 싶은 모든 이에게 보내는 초대장입니다.',
      questionsLabel: '전형적 질문',
      articlesLabel: '이어진 글',
      blankLabel: '아직 쓰이지 않은 이야기',
      proposedStoryLabel: '쓸 수 있는 이야기',
      proposedHowLabel: '분석 방법',
      map: [
        {
          key: 'realestate_land',
          articles: [
            {
              title: '국민주택과 주거 정의',
              href: '/society/國宅與居住正義',
            },
            {
              title: '사회주택과 주거 정의',
              href: '/society/社會住宅與居住正義',
            },
          ],
        },
        {
          key: 'economy_business',
          articles: [
            {
              title: '경제 카테고리 글 모아보기',
              href: '/economy',
            },
            {
              title: '대만 기업: 중화텔레콤',
              href: '/economy/台灣企業：中華電信',
            },
          ],
        },
        {
          key: 'procurement_subsidy',
          proposed: {
            story:
              '누가 대만을 낙찰받았나: 13.5만 건 낙찰 기록 속 정부 외주 지도',
            datasets: [
              {
                name: '정부 전자조달망 입찰/낙찰 공고',
                href: 'https://web.pcc.gov.tw/',
                freq: '격주',
              },
              {
                name: '거액 조달 이행 중 업체 명단',
                href: 'https://data.gov.tw/dataset/7264',
                freq: '매일',
              },
            ],
            how: '사업자 통일번호로 낙찰 기록을 상업 등기에 연결: 한 업체가 역대 어느 기관에서 얼마를 낙찰받았는지. 금액·기관·연도 세 축으로 히트맵을 그리면 공공지출의 지리와 인맥이 저절로 떠오릅니다.',
          },
        },
        {
          key: 'public_finance',
          articles: [
            { title: '중앙정부 총예산', href: '/politics/中央政府總預算' },
          ],
        },
        {
          key: 'tax_revenue',
          proposed: {
            story: '당신의 지자체는 어떤 세금으로 사는가: 지방재정 체질 검사',
            datasets: [
              {
                name: '타오위안시 지방세 실징수 순액 연간 통계',
                href: 'https://data.gov.tw/dataset/147936',
                freq: '매년',
              },
              {
                name: '화롄현 세목별 실징수 순액(당월)',
                href: 'https://data.gov.tw/dataset/177569',
                freq: '비정기',
              },
            ],
            how: '지자체별 실징수 순액을 세목별로 쪼갭니다: 누가 지가세·주택세에 기대는지(대도시), 누가 중앙 교부금에 기대는지(비도시). 인구·집값 데이터와 행정구역 코드로 맞추면 재정 자립도 순위가 저절로 계산됩니다.',
          },
        },
        {
          key: 'transport',
          articles: [
            {
              title: '대만 교통 시스템',
              href: '/lifestyle/台灣交通系統',
            },
            {
              title: '대만 오토바이 문화',
              href: '/lifestyle/台灣機車文化',
            },
          ],
        },
        {
          key: 'public_safety',
          articles: [
            {
              title: '태풍',
              href: '/nature/颱風',
            },
          ],
        },
        {
          key: 'judicial_legal',
          articles: [
            {
              title: '대만 사법개혁과 예방적 구속 제도',
              href: '/society/台灣司法改革與預防性羈押制度',
            },
          ],
        },
        {
          key: 'legislature',
          articles: [
            {
              title: '해바라기 학생운동',
              href: '/society/太陽花學運',
            },
          ],
        },
        {
          key: 'health_food',
          articles: [
            {
              title: '대만 의료와 전민건강보험',
              href: '/lifestyle/台灣醫療與全民健保',
            },
          ],
        },
        {
          key: 'environment',
          articles: [
            {
              title: '대만 환경운동사',
              href: '/nature/台灣環境運動史',
            },
            {
              title: '대만 기후위기와 넷제로 전환',
              href: '/nature/台灣氣候危機與淨零轉型',
            },
          ],
        },
        {
          key: 'education_research',
          articles: [
            {
              title: '대만 교육 제도',
              href: '/lifestyle/台灣教育制度',
            },
            {
              title: '대만 농산어촌 교육',
              href: '/society/台灣偏鄉教育',
            },
          ],
        },
        {
          key: 'agriculture_fisheries',
          articles: [
            {
              title: '대만 커피 산업',
              href: '/food/台灣咖啡產業',
            },
            {
              title: '차 문화',
              href: '/food/茶文化',
            },
          ],
        },
        {
          key: 'labor_employment',
          articles: [{ title: '누가 저임금인가', href: '/society/誰算低薪' }],
        },
        {
          key: 'social_population',
          articles: [
            {
              title: '대만 저출산 위기',
              href: '/society/台灣少子化危機',
            },
            {
              title: '2026 구합일 지방선거',
              href: '/politics/2026 九合一選舉',
            },
          ],
        },
        {
          key: 'culture_tourism_sport',
          articles: [
            {
              title: '야시장 문화',
              href: '/food/夜市文化',
            },
            {
              title: '대만 야구 문화',
              href: '/culture/台灣棒球文化',
            },
          ],
        },
        {
          key: 'foreign_affairs',
          articles: [
            {
              title: '대만의 수교국과 국제 외교',
              href: '/society/台灣邦交國與國際外交',
            },
          ],
        },
        {
          key: 'gov_publication',
          proposed: {
            story: '관보 속의 대만: 정부는 매달 무엇을 스스로 공고했나',
            datasets: [
              {
                name: '행정원 관보 정보망',
                href: 'https://gazette.nat.gov.tw/',
                freq: '매일',
              },
              {
                name: '타이베이시정부 관보',
                href: 'https://data.gov.tw/dataset/132348',
                freq: '매월',
              },
            ],
            how: '관보 전문으로 법규 변동의 키워드 시계열을 만들고, legislature 영역의 입법원 기록과 대조합니다: 행정 공고와 입법 궤적 사이의 시차가 곧 한 정책이 실제로 발효되는 속도입니다.',
          },
        },
        {
          key: 'geo_basemap',
          articles: [
            {
              title: '대만 지도 읽는 법',
              href: '/geography/台灣地圖怎麼讀',
            },
          ],
        },
        {
          key: 'utilities_telecom',
          articles: [
            {
              title: '대만과 원자력 논쟁',
              href: '/society/台灣與核能的討論',
            },
          ],
        },
      ],
    },
    recipes: {
      title: '분석 조합: 하나를 제대로 보려면 어떤 데이터를 어떻게 엮을까',
      lead: '이 페이지의 핵심입니다. 각 카드는 하나의 실제 분석 질문입니다: 어떤 데이터셋을 쓰고, 어떤 키로 엮고, 어떤 방법으로 보는지, 그리고 어떤 글이 이미 이 분석을 이야기로 써냈는지.',
      combineLabel: '조합 방법',
      methodLabel: '가장 좋은 분석법',
      articlesLabel: '이미 쓰인 이야기',
      items: [
        {
          question: '주거 정의: 정부가 지은 싼 집은 결국 누구를 살찌웠나?',
          datasets: [
            {
              name: '전국 실거래가 등록(매매)',
              href: 'https://lvr.land.moi.gov.tw/',
              freq: '분기별',
            },
            {
              name: '타이베이시 국민주택 분양(임대) 현황',
              href: 'https://data.gov.tw/dataset/121267',
              freq: '비정기',
            },
            {
              name: '타이베이시 사회주택 전대관리 매칭 통계',
              href: 'https://data.gov.tw/dataset/155779',
              freq: '매년',
            },
          ],
          combine:
            '행정구역과 단지명으로 맞춥니다: 국민주택 분양 기록은 "정부가 당시 얼마에 팔았는가"를, 실거래가 등록은 "같은 주소가 오늘 얼마인가"를, 사회주택 통계는 "팔지 않고 임대로 바꾼 뒤의 물량"을 줍니다.',
          method:
            '같은 단지로 시계열을 만들고 정책 변곡점으로 구간을 나눠 대조합니다: 1985 분양, 2002 규제 철폐, 2016 임대 전용, 2026 타오위안의 분양 재개. 상승 배수를 연수로 나누면 그것이 "자산 에스컬레이터"의 기울기입니다.',
          articles: [
            {
              title: '국민주택과 주거 정의',
              href: '/society/國宅與居住正義',
            },
            {
              title: '사회주택과 주거 정의',
              href: '/society/社會住宅與居住正義',
            },
          ],
        },
        {
          question:
            '에너지 전환: 원전 제로에서 재가동까지, 숫자에선 무슨 일이 있었나?',
          datasets: [
            {
              name: '대만전력 최근 10년 원자력 발전 실적과 탄소 감축 효과',
              href: 'https://data.gov.tw/dataset/10859',
              freq: '매년',
            },
            {
              name: '대만전력 원자력발전소 위치와 설비 현황',
              href: 'https://data.gov.tw/dataset/10858',
              freq: '비정기',
            },
          ],
          combine:
            '발전 실적 표는 연간 발전량과 이용률을, 설비 표는 각 호기의 폐쇄 시점을 줍니다. 두 표를 연도로 맞추고 국민투표와 정책 변곡점을 얹습니다.',
          method:
            '이용률 연간 곡선을 그리고 세 번의 국민투표(2018, 2021, 2025)를 표시합니다: 곡선이 어떻게 0으로 갔는지, 투표 후 1년 안에 어떤 숫자라도 움직였는지. "정치적 결정"과 "물리적 현실" 사이의 시차가 저절로 드러납니다.',
          articles: [
            {
              title: '대만과 원자력 논쟁',
              href: '/society/台灣與核能的討論',
            },
            {
              title: '대만 기후위기와 넷제로 전환',
              href: '/nature/台灣氣候危機與淨零轉型',
            },
          ],
        },
        {
          question:
            '건강보험 재정: 누가 쓰고 누가 내며, 이 제도는 몇 년을 더 버틸까?',
          datasets: [
            {
              name: '건강보험 가입자 유형·성별·연령대별 통계',
              href: 'https://data.gov.tw/dataset/20254',
              freq: '분기별',
            },
            {
              name: '전민건강보험회 회의록',
              href: 'https://data.gov.tw/dataset/7554',
              freq: '매월',
            },
            {
              name: '각급 정부의 취약계층 보험료 지원 통계',
              href: 'https://data.gov.tw/dataset/23719',
              freq: '매월',
            },
          ],
          combine:
            '연령대별 가입자 수로 "내는 사람"과 "쓰는 사람"의 구조비를 계산하고, 회의록은 보험료율 결정의 타임라인을, 취약계층 지원 통계는 "능력껏 부담" 원칙의 집행 면을 보여줍니다.',
          method:
            '연령 구조비를 분기별 시계열로 만들어 보험료율 결정 시점을 얹습니다: 구조는 악화되는데 요율은 그대로일 때 그 틈을 무엇으로 메우는지(재정 투입, 수가 점수, 본인부담). 회의록 속 "동결 유지" 한 번 한 번마다 대응하는 대가 항목이 있습니다.',
          articles: [
            {
              title: '대만 의료와 전민건강보험',
              href: '/lifestyle/台灣醫療與全民健保',
            },
            {
              title: '대만 저출산 위기',
              href: '/society/台灣少子化危機',
            },
          ],
        },
        {
          question:
            '민주주의의 품질: 한 선거의 모집단은 얼마나 크고, 단속 강도는 얼마나 센가?',
          datasets: [
            {
              name: '선거인 수(중앙선거위원회)',
              href: 'https://data.gov.tw/dataset/27491',
              freq: '4년마다',
            },
            {
              name: '선거법 위반 사건 판결 확정 인원',
              href: 'https://data.gov.tw/dataset/15035',
              freq: '매월',
            },
          ],
          combine:
            '선거인 수는 각 선거의 모집단을, 선거법 판결 통계는 금권선거와 선거 개입의 역대 유죄 건수를 줍니다. 둘 다 지자체별로 쪼갤 수 있어 선거 결과와 맞출 수 있습니다.',
          method:
            '선거마다 "모집단 × 유죄율" 대조를 만들어 회차 간 단속 강도의 변화를 비교합니다. 2026년에는 AI 가짜뉴스라는 새 단속 중점이 추가됐으니, 전통적 두 항목(금권선거·개입)의 기준선을 먼저 세워야 새 위협의 양에 참조계가 생깁니다.',
          articles: [
            {
              title: '2026 구합일 지방선거',
              href: '/politics/2026 九合一選舉',
            },
            {
              title: '해바라기 학생운동',
              href: '/society/太陽花學運',
            },
          ],
        },
        {
          question: '길거리 경제: 23만 개 노점의 매출은 어떻게 계산됐나?',
          datasets: [
            {
              name: '노점상 경영 실태 조사',
              href: 'https://data.gov.tw/dataset/10918',
              freq: '5년마다',
            },
            {
              name: '타이중시 등록 야시장',
              href: 'https://data.gov.tw/dataset/85028',
              freq: '비정기',
            },
          ],
          combine:
            '주계총처의 5년 주기 전수조사는 전국 노점의 모집단(점포 수, 종사자, 매출)을, 지자체 등록 명단은 "정부가 공식 인정한 야시장" 목록을 줍니다.',
          method:
            '기간 간 전수조사 비교가 핵심입니다: 점포 수와 매출의 5년 변화를 모바일 결제 보급률·관광객 수와 대조합니다. 다음 조사가 발표되면 23.3만 개 노점을 인용한 모든 글이 돌아와 대조해야 합니다.',
          articles: [
            {
              title: '야시장 경제학',
              href: '/economy/夜市經濟學',
            },
            {
              title: '야시장 문화',
              href: '/food/夜市文化',
            },
          ],
        },
        {
          question:
            '교통안전: 1,400만 대의 오토바이와 매년 3천 명의 목숨은 어떤 관계인가?',
          datasets: [
            {
              name: '자동차·오토바이 등록 대수 통계',
              href: 'https://data.gov.tw/dataset/14208',
              freq: '매월',
            },
            {
              name: '타오위안시 A1/A2 사고 사상자 통계(민국 91~114년)',
              href: 'https://data.gov.tw/dataset/25932',
              freq: '매년',
            },
          ],
          combine:
            '차량 등록 대수가 분모(노출량), 사고 사상자가 분자입니다. 지자체급 장기 시계열(타오위안 24년)을 먼저 방법론 템플릿으로 삼고 다른 지자체로 넓힙니다.',
          method:
            '사망 절대 수만 보지 마세요. 차량 10만 대당 사상률로 정규화하고 오토바이와 자동차를 따로 계산합니다. "보행자 지옥" 논쟁에 필요한 것이 바로 이 분모입니다.',
          articles: [
            {
              title: '대만 교통 시스템',
              href: '/lifestyle/台灣交通系統',
            },
            {
              title: '대만 오토바이 문화',
              href: '/lifestyle/台灣機車文化',
            },
          ],
        },
      ],
    },
    method: {
      title: '연결 방법론: 두 표를 맞붙게 하는 키',
      lead: '데이터셋 하나는 점일 뿐이고, 조합할 수 있어야 그물이 됩니다. 아래는 우리가 실측으로 찾아낸 가장 유용한 연결 단서들입니다.',
      spectrum: {
        title: '갱신 주기 = 분석 해상도: 15개 시범 데이터셋의 스펙트럼',
        left: '← 매월 갱신: 사건 연구 가능',
        right: '5년에 한 번: 기간 간 비교만 가능 →',
        note: '점 하나하나가 이 페이지에서 인용한 데이터셋입니다. 마우스를 올리면 이름이 보입니다. 분석을 설계하기 전에 당신의 데이터가 스펙트럼 어느 끝에 있는지 먼저 보세요.',
      },
      items: [
        {
          name: '행정구역 코드',
          desc: '가장 범용적인 연결 키입니다. 시·현과 향·진·시·구의 표준 코드 덕분에 인구·집값·사고·세수를 같은 지도에 맞출 수 있고, 동명 지역(두 개의 신이구)은 코드로 구분합니다.',
        },
        {
          name: '사업자 통일번호',
          desc: '회사의 주민등록증입니다. 상업 등기, 조달 낙찰, 특허 출원, 제재 명단 모두 통일번호에 걸려 있어, 한 회사의 전체 발자취를 추적하는 열쇠입니다.',
        },
        {
          name: '위경도와 관측소 코드',
          desc: '환경 데이터(대기질·수질·기상)는 관측소에, 지리 데이터는 좌표에 걸려 있습니다. 행정구역 코드와 상호 변환하는 것이 공간 분석의 첫걸음입니다.',
        },
        {
          name: '품질 등급',
          desc: '플래티넘부터 브론즈까지의 등급은 "이 데이터셋을 바로 쓸 수 있는가"의 빠른 선별입니다: 플래티넘급은 대부분 정규화되어 구조화 조회가 가능하고, 미검측(자체 큐레이션 실거래가 등)은 직접 검증해야 합니다.',
        },
        {
          name: '갱신 주기가 곧 분석 해상도',
          desc: '매월 갱신되는 데이터는 사건 연구가 가능하고, 연간 데이터는 추세만, 5년 주기(노점 조사)는 기간 간 비교만 가능합니다. 주기를 먼저 보고 분석을 설계하세요. 순서를 거꾸로 하면 안 됩니다.',
        },
        {
          name: '이중 포인터 원칙',
          desc: 'Taiwan.md 글이 데이터셋을 인용할 때 링크는 언제나 data.gov.tw 또는 주관 기관의 영속 페이지를 가리키고, 조회 레이어(Twinkle Hub)는 병렬의 부가 경로입니다. 데이터의 집과 조회의 길을 분리하면 어느 층이 바뀌어도 사슬이 끊기지 않습니다.',
        },
      ],
    },
    tools: {
      title: '도구 카탈로그: 21개 도구 전체 목록',
      lead: '아래는 MCP 엔드포인트에서 직접 크롤링한 것입니다(페이지를 다시 빌드할 때마다 갱신). 분류는 우리가 더했습니다.',
      groups: [
        {
          prefix: [
            'search_datasets',
            'get_dataset',
            'query_rows',
            'materialize_dataset',
            'list_domains',
          ],
          label: '데이터셋 4종 세트 + 영역 색인',
        },
        {
          prefix: ['search_patents', 'get_patent_body'],
          label: '특허',
        },
        {
          prefix: ['search_exam', 'search_exam_questions', 'get_exam_paper'],
          label: '국가고시',
        },
        {
          prefix: ['search_judicial', 'get_judicial_full'],
          label: '판결문',
        },
        {
          prefix: [
            'lookup_icd10',
            'search_drug',
            'get_drug_details',
            'search_health_supplements',
            'search_drug_label',
            'check_drug_interaction',
          ],
          label: '의약품과 의료 코드',
        },
        {
          prefix: [
            'query_food_nutrition',
            'search_foods_by_nutrient',
            'analyze_meal_nutrition',
          ],
          label: '식품 영양',
        },
      ],
    },
    footer: {
      crawledLabel: '이 페이지의 도구·영역 목록 크롤링 시각:',
      note: 'Twinkle Hub는 알파 단계이며, 이 페이지의 평가는 그 진화에 따라 갱신됩니다. Taiwan.md와 Twinkle Hub 사이에 현재 어떤 상업적 관계도 없습니다. 이 페이지는 헤비 유저의 1차 건강검진이자 초대장입니다: 데이터 레이어와 의미 레이어가 협력할 때, 대만은 비로소 온전히 이해됩니다.',
      pilotTitle: '데이터 레이어에 이미 연결된 글',
      pilotLead:
        '2026년 6월부터 글 말미에 "공개 데이터" 섹션을 달기 시작했습니다: 각 글의 논점을 검증(또는 반박)할 수 있는 데이터셋을 나열하고, "왜 가리키는가" 한 문장을 덧붙입니다. 첫 여섯 편:',
      pilotArticles: [
        {
          title: '대만과 원자력 논쟁',
          href: '/society/台灣與核能的討論',
        },
        {
          title: '국민주택과 주거 정의',
          href: '/society/國宅與居住正義',
        },
        {
          title: '대만 의료와 전민건강보험',
          href: '/lifestyle/台灣醫療與全民健保',
        },
        {
          title: '야시장 경제학',
          href: '/economy/夜市經濟學',
        },
        {
          title: '대만 교통 시스템',
          href: '/lifestyle/台灣交通系統',
        },
        {
          title: '2026 구합일 지방선거',
          href: '/politics/2026 九合一選舉',
        },
      ],
    },
  },
  es: {
    meta: {
      title:
        'Curaduría de datos abiertos — Datos abiertos de Taiwán × Twinkle Hub: una guía por la capa de significado',
      description:
        'Cincuenta mil conjuntos de datos gubernamentales abruman a cualquiera. Esta página es la curaduría de datos de Taiwan.md: qué datos vale la pena mirar, cómo combinarlos para analizar algo y con qué historias de la isla se conecta cada lote de cifras. Incluye una evaluación de primera mano, con pruebas propias, de la integridad, la estabilidad y la simplificación de acceso de Twinkle Hub.',
    },
    hero: {
      eyebrow: 'OPEN DATA CURATION',
      title: 'Curaduría de datos abiertos',
      subtitle:
        'Datos abiertos de Taiwán × Twinkle Hub: una guía por la capa de significado',
      intro: [
        'La plataforma de datos abiertos del gobierno de Taiwán reúne más de cincuenta y dos mil conjuntos de datos. Esa cifra abruma a cualquiera que quiera usarla: no sabes cuál importa, hasta cuándo se actualiza cada uno, qué dos tablas pueden cruzarse, y mucho menos qué relación tienen con las preguntas que te importan.',
        'Taiwan.md ha escrito más de novecientos artículos sobre Taiwán, y detrás de cada uno hay un juicio: «¿con qué datos se verifica esto?». Esta página despliega esa capa de juicio: cómo evaluamos la infraestructura de datos, qué conjuntos de datos usamos y cómo los combinamos cuando analizamos algo, y con qué historias de la isla se conecta cada dominio de datos.',
      ],
      viz: {
        stats: [
          {
            n: 52556,
            suffix: '',
            label: 'conjuntos de datos gubernamentales (2026-10-23)',
          },
          {
            n: 1240000,
            suffix: '+',
            label: 'textos completos de sentencias',
          },
          {
            n: 320663,
            suffix: '',
            label: 'preguntas de exámenes nacionales',
          },
          {
            n: 226825,
            suffix: '',
            label: 'filas de análisis nutricional',
          },
          {
            n: 135000,
            suffix: '+',
            label: 'registros de contratación pública',
          },
        ],
        graphHint:
          'La red de abajo es real: a la izquierda están los 20 dominios de datos y los cinco grandes corpus (rastreados en tiempo real); a la derecha, los artículos de Taiwan.md ya escritos. Cada línea es un juicio curatorial de esta página. Arrastra y pasa el cursor para ver cómo unos datos complejos se conectan con historias claras.',
        legend: {
          domain: 'Dominio de datos',
          vertical: 'Corpus vertical',
          article: 'Artículo de Taiwan.md',
          center: 'Capa de significado de Taiwan.md',
        },
      },
    },
    ecosystem: {
      title: 'Mapa del ecosistema: tres capas, cada una en su puesto',
      lead: 'Para que una IA (o una persona) responda de verdad a «las cosas de Taiwán» hacen falta tres capas cooperando: el hogar de los datos, el camino de las consultas y la capa del significado.',
      layers: [
        {
          name: 'data.gov.tw y los sistemas de cada organismo',
          role: 'El hogar de los datos (SSOT)',
          desc: 'La plataforma de datos abiertos del gobierno es la identidad persistente de cada conjunto de datos: número de dataset, licencia, organismo responsable, descarga original. Toda cita debería, en última instancia, volver aquí.',
          stat: 'unos 50 000 conjuntos de datos',
        },
        {
          name: 'Twinkle Hub',
          role: 'El camino de las consultas (puerta de enlace MCP)',
          desc: 'El primer hub MCP de Taiwán: empaqueta los datos dispersos en más de cien portales gubernamentales en un único punto de consulta, con búsqueda semántica, consulta estructurada de filas y herramientas para cinco dominios verticales. Una IA obtiene los datos en una sola llamada, sin el pantano manual de saltar entre portales.',
          stat: '21 herramientas · 20 dominios',
        },
        {
          name: 'Taiwan.md',
          role: 'La capa del significado (curaduría)',
          desc: 'Los datos no hablan solos. Qué conjunto de datos merece ser señalado, qué argumento verifica, con qué tramo de la historia se conecta: ese es el trabajo de la curaduría. Desde junio de 2026 nuestros artículos van incorporando, uno a uno, una sección de «datos públicos» que cose la narrativa con los datos originales.',
          stat: '1,100+ artículos · 15 referencias a conjuntos de datos ya en línea',
        },
      ],
    },
    assessment: {
      title: 'Evaluación en tres dimensiones: qué encontramos al probarlo',
      lead: 'Lo que sigue es la evaluación de primera mano que Taiwan.md hizo como usuario, con sus propias herramientas de verificación (dos rondas de pruebas, mayo y junio de 2026), desplegada en tres dimensiones. No es publicidad: es un chequeo médico.',
      gapsLabel: 'Brechas honestas',
      dims: [
        {
          name: 'Integridad de los datos',
          verdict: 'La cobertura es real, y va más allá de un espejo',
          points: [
            'data.gov.tw publica por sí mismo 52 556 conjuntos de datos a 2026-10-23; el sitio de Twinkle Hub muestra 53 185 para Taiwán (incluidos los de curaduría propia), más 135 000 registros de contratación electrónica del gobierno y datos del Yuan Legislativo',
            'Cada una de las 20 categorías de dominio trae «preguntas típicas» y «ejemplos ancla»; cada conjunto de datos lleva etiquetas de nivel de calidad (de platino a bronce), frecuencia de actualización, formato y claves de enlace',
            'Sus conjuntos de datos de curaduría propia tapan agujeros de los portales gubernamentales: el registro nacional de precios reales de transacciones inmobiliarias (compraventa / preventa / alquiler) se conecta directamente al sistema del Departamento de Administración de Tierras del Ministerio del Interior',
            'Cinco corpus verticales van más allá del simple espejo: textos completos de patentes, banco de preguntas de exámenes nacionales, sentencias judiciales, licencias de medicamentos y nutrición alimentaria (las escalas, en la sección siguiente)',
          ],
          gaps: [
            'El ranking de búsqueda favorece los cortes por ciudad y condado: al buscar «tasa de natalidad» vuelven tres conjuntos de datos de nivel municipal (Nantou, Taoyuan, Kaohsiung) y el de escala nacional hay que elegirlo a mano; justo la razón por la que existe la curaduría',
            'No se puede consultar el total de conjuntos de datos de cada dominio; el inventario depende de las cifras declaradas oficialmente',
            'Parte de los conjuntos de datos antiguos sigue en formato ODS sin normalizar y no admite consulta estructurada de filas',
          ],
        },
        {
          name: 'Estabilidad',
          verdict: 'Carácter alfa: corre rápido y cambia rápido',
          points: [
            'Latencia de consulta medida por debajo de 100 ms con acierto de caché; cada respuesta trae trace_id y campos de costo: buena transparencia',
            'Las descripciones de las herramientas llevan incrustado el número de versión (v1.11.2 en consultas agregadas, v1.18 en sentencias): el ritmo de iteración está a la vista',
            'El corpus de sentencias marca hoy explícitamente su alcance alfa (de 2024-05 a 2026-03, cerca de 1,24 millones de registros); marcar los límites con claridad es más honesto que fingir completitud',
          ],
          gaps: [
            'Dos cambios de interfaz de API en dos meses: entre el 2026-05-11 y el 06-10 la conexión pasó a un handshake de sesión, las herramientas se reorganizaron de 40 a 21 y se retiró un grupo entero de herramientas deterministas',
            'En la fase alfa ya aparecieron límites de tráfico (HTTP 429), pero la ventana del límite no está publicada',
            'Nuestra contramedida: una capa de envoltura delgada aísla los cambios de interfaz, y las citas en los artículos se escriben siempre como referencias estáticas, sin depender de la API en tiempo de ejecución; así debería integrarse cualquier servicio alfa',
          ],
        },
        {
          name: 'Simplificación del acceso',
          verdict: 'Esta es su cara más fuerte',
          points: [
            'Un solo punto MCP reemplaza más de cien portales gubernamentales: búsqueda, obtención de metadatos, consulta de filas y consolidación en cuatro pasos, con un esquema de campos consistente',
            'La consulta estructurada de filas admite condiciones SQL y agregaciones; los conjuntos de datos ya normalizados pueden usarse directamente como una base de datos',
            'Una misma pregunta de dirección, año y distrito administrativo exigía antes cotejar a mano entre tres y cinco portales durante 15 a 30 minutos; hoy es una llamada que tarda menos de un segundo',
            'El paquete de instalación de un clic conecta directamente a más de diez clientes de IA como Claude o Cursor: la fricción de «que la IA pueda leer los datos de Taiwán» cae un orden de magnitud',
          ],
          gaps: [
            'Requiere clave de API (bearer token); hoy la fase alfa es gratuita y en el futuro se cobrará por herramienta. Si el camino gratuito existirá para siempre es una pregunta que el ecosistema de datos abiertos debe seguir haciendo',
            'El servicio en sí es de código cerrado: los datos son abiertos, el canal por ahora no. La descarga original de data.gov.tw es siempre la ruta de respaldo que esquiva cualquier puerta de enlace',
          ],
        },
      ],
    },
    verticals: {
      title: 'Cinco corpus verticales: lo que va más allá del espejo',
      lead: 'Envolver conjuntos de datos en una interfaz de búsqueda no tiene nada de raro; estos cinco dominios verticales hacen recuperación semántica y extracción estructurada, y son la parte en la que Twinkle Hub va más allá de un «espejo de data.gov.tw».',
      logNote:
        'Las barras de magnitud están en escala logarítmica: el corpus de sentencias es 17 veces el de licencias de medicamentos; dibujado en escala lineal, las otras cuatro barras quedarían aplastadas hasta volverse invisibles.',
      items: [
        {
          name: 'Patentes',
          stat: 'Textos completos de patentes de invención publicadas por la TIPO',
          desc: 'Consulta en lenguaje natural sobre el corpus de patentes, con acceso a la descripción técnica completa y a las reivindicaciones. Al escribir artículos sobre la industria taiwanesa, «¿esta empresa de verdad tiene esta tecnología?» puede verificarse por primera vez con búsqueda semántica.',
        },
        {
          name: 'Exámenes nacionales',
          stat: '64 815 cuadernillos de examen · 320 000 preguntas (2012–2025)',
          desc: 'Los cuadernillos históricos del Ministerio de Exámenes, con búsqueda a nivel de pregunta. La cultura taiwanesa del examen nacional (la fiebre por el empleo público, las calles de academias) es una historia que todavía nadie ha contado con datos.',
        },
        {
          name: 'Sentencias judiciales',
          stat: 'cerca de 1,24 millones de registros (2024-05 a 2026-03, alfa)',
          desc: 'Búsqueda en lenguaje llano sobre el corpus de sentencias. Para los artículos sobre justicia, conflictos laborales o disputas de alquiler, el «¿cómo fallan los tribunales en la práctica?» tiene por fin una entrada verificable.',
        },
        {
          name: 'Medicamentos y salud',
          stat: '71 836 licencias de medicamentos · 96 803 códigos ICD-10 en chino',
          desc: 'Licencias de medicamentos, campos estructurados de los prospectos, certificaciones de alimentos saludables y cribado inicial de interacciones. La capa factual de los artículos sobre el seguro de salud y la medicina.',
        },
        {
          name: 'Nutrición alimentaria',
          stat: '226 825 filas de análisis nutricional',
          desc: 'La base de datos de composición nutricional del Ministerio de Salud y Bienestar: más de veinte nutrientes por ingrediente, con ranking por nutriente y suma total por comida. El piso numérico de los artículos sobre mercados nocturnos y gastronomía.',
        },
      ],
    },
    domains: {
      title: 'Veinte dominios de datos × el mapa de historias de Taiwan.md',
      lead: 'A la izquierda, la clasificación de dominios de Twinkle Hub (rastreada en tiempo real); a la derecha, nuestra correspondencia curatorial: con qué artículos de la isla se conectan los datos de cada dominio. En los dominios marcados «Historia por escribir», los conjuntos de datos insignia y la ruta de análisis ya están curados, pero el artículo aún no existe: ese es nuestro mapa de desarrollo, y también una invitación para quien quiera escribirlo.',
      questionsLabel: 'Preguntas típicas',
      articlesLabel: 'Artículos conectados',
      blankLabel: 'Historia por escribir',
      proposedStoryLabel: 'La historia que podría escribirse',
      proposedHowLabel: 'Cómo analizarlo',
      map: [
        {
          key: 'realestate_land',
          articles: [
            {
              title: 'Vivienda pública y justicia habitacional',
              href: '/society/國宅與居住正義',
            },
            {
              title: 'Vivienda social y justicia habitacional',
              href: '/society/社會住宅與居住正義',
            },
          ],
        },
        {
          key: 'economy_business',
          articles: [
            {
              title: 'Panorama de los artículos de economía',
              href: '/economy',
            },
            {
              title: 'Empresas de Taiwán: Chunghwa Telecom',
              href: '/economy/台灣企業：中華電信',
            },
          ],
        },
        {
          key: 'procurement_subsidy',
          proposed: {
            story:
              'Quién se adjudicó Taiwán: el mapa de la subcontratación pública en 135 000 registros de adjudicación',
            datasets: [
              {
                name: 'Anuncios de licitación y adjudicación del portal de contratación electrónica del gobierno',
                href: 'https://web.pcc.gov.tw/',
                freq: 'quincenal',
              },
              {
                name: 'Lista de proveedores con contrataciones de gran cuantía en periodo de ejecución',
                href: 'https://data.gov.tw/dataset/7264',
                freq: 'diaria',
              },
            ],
            how: 'Con el número de identificación fiscal unificado se cruzan los registros de adjudicación con el registro mercantil: cuánto dinero ganó cada proveedor, de qué organismos, a lo largo de los años. Un mapa de calor con tres ejes —monto, organismo, año— hace aflorar por sí sola la geografía y las redes del gasto público.',
          },
        },
        {
          key: 'public_finance',
          articles: [
            {
              title: 'El presupuesto general del gobierno central',
              href: '/politics/中央政府總預算',
            },
          ],
        },
        {
          key: 'tax_revenue',
          proposed: {
            story:
              'De qué impuestos vive tu ciudad: un chequeo de la salud fiscal local',
            datasets: [
              {
                name: 'Estadística anual de recaudación neta de impuestos locales de la ciudad de Taoyuan',
                href: 'https://data.gov.tw/dataset/147936',
                freq: 'anual',
              },
              {
                name: 'Recaudación neta de cada impuesto del condado de Hualien (cifra del mes)',
                href: 'https://data.gov.tw/dataset/177569',
                freq: 'irregular',
              },
            ],
            how: 'La recaudación neta de cada ciudad y condado, desglosada por tipo de impuesto: quién vive del impuesto al valor del suelo y a la vivienda (zonas metropolitanas) y quién de las transferencias centralizadas (las no metropolitanas). Alineada con los datos de población y de precios de vivienda mediante los códigos de distrito administrativo, la clasificación de autonomía fiscal se calcula sola.',
          },
        },
        {
          key: 'transport',
          articles: [
            {
              title: 'El sistema de transporte de Taiwán',
              href: '/lifestyle/台灣交通系統',
            },
            {
              title: 'La cultura de la moto en Taiwán',
              href: '/lifestyle/台灣機車文化',
            },
          ],
        },
        {
          key: 'public_safety',
          articles: [
            {
              title: 'Tifones',
              href: '/nature/颱風',
            },
          ],
        },
        {
          key: 'judicial_legal',
          articles: [
            {
              title: 'La reforma judicial de Taiwán y la prisión preventiva',
              href: '/society/台灣司法改革與預防性羈押制度',
            },
          ],
        },
        {
          key: 'legislature',
          articles: [
            {
              title: 'El Movimiento Estudiantil Girasol',
              href: '/society/太陽花學運',
            },
          ],
        },
        {
          key: 'health_food',
          articles: [
            {
              title: 'La medicina en Taiwán y el Seguro Nacional de Salud',
              href: '/lifestyle/台灣醫療與全民健保',
            },
          ],
        },
        {
          key: 'environment',
          articles: [
            {
              title: 'Historia del movimiento ambiental de Taiwán',
              href: '/nature/台灣環境運動史',
            },
            {
              title:
                'La crisis climática de Taiwán y la transición a cero neto',
              href: '/nature/台灣氣候危機與淨零轉型',
            },
          ],
        },
        {
          key: 'education_research',
          articles: [
            {
              title: 'El sistema educativo de Taiwán',
              href: '/lifestyle/台灣教育制度',
            },
            {
              title: 'La educación en las zonas remotas de Taiwán',
              href: '/society/台灣偏鄉教育',
            },
          ],
        },
        {
          key: 'agriculture_fisheries',
          articles: [
            {
              title: 'La industria del café en Taiwán',
              href: '/food/台灣咖啡產業',
            },
            {
              title: 'La cultura del té',
              href: '/food/茶文化',
            },
          ],
        },
        {
          key: 'labor_employment',
          articles: [
            {
              title: 'Quién cuenta como mal pagado',
              href: '/society/誰算低薪',
            },
          ],
        },
        {
          key: 'social_population',
          articles: [
            {
              title: 'La crisis de natalidad de Taiwán',
              href: '/society/台灣少子化危機',
            },
            {
              title: 'Elecciones locales nueve en uno de 2026',
              href: '/politics/2026 九合一選舉',
            },
          ],
        },
        {
          key: 'culture_tourism_sport',
          articles: [
            {
              title: 'La cultura de los mercados nocturnos',
              href: '/food/夜市文化',
            },
            {
              title: 'La cultura del béisbol en Taiwán',
              href: '/culture/台灣棒球文化',
            },
          ],
        },
        {
          key: 'foreign_affairs',
          articles: [
            {
              title:
                'Los aliados diplomáticos de Taiwán y su diplomacia internacional',
              href: '/society/台灣邦交國與國際外交',
            },
          ],
        },
        {
          key: 'gov_publication',
          proposed: {
            story:
              'Taiwán en el boletín oficial: qué anuncia el propio gobierno cada mes',
            datasets: [
              {
                name: 'Portal de información del Boletín Oficial del Yuan Ejecutivo',
                href: 'https://gazette.nat.gov.tw/',
                freq: 'diaria',
              },
              {
                name: 'Boletín Oficial del Gobierno de la Ciudad de Taipéi',
                href: 'https://data.gov.tw/dataset/132348',
                freq: 'mensual',
              },
            ],
            how: 'Con el texto completo del boletín se construyen series temporales de palabras clave sobre cambios normativos, contrastadas con los registros del Yuan Legislativo del dominio legislature: el desfase entre el anuncio administrativo y la trayectoria legislativa es la velocidad real a la que una política entra en vigor.',
          },
        },
        {
          key: 'geo_basemap',
          articles: [
            {
              title: 'Cómo leer un mapa de Taiwán',
              href: '/geography/台灣地圖怎麼讀',
            },
          ],
        },
        {
          key: 'utilities_telecom',
          articles: [
            {
              title: 'Taiwán y el debate sobre la energía nuclear',
              href: '/society/台灣與核能的討論',
            },
          ],
        },
      ],
    },
    recipes: {
      title:
        'Combinaciones de análisis: para entender algo, qué datos usar y cómo combinarlos',
      lead: 'Este es el corazón de la página. Cada tarjeta es una pregunta de análisis real: qué conjuntos de datos usar, con qué claves combinarlos, con qué método mirarlos y qué artículo ya convirtió ese análisis en historia.',
      combineLabel: 'Cómo combinarlos',
      methodLabel: 'Cómo analizarlo mejor',
      articlesLabel: 'Historias ya escritas',
      items: [
        {
          question:
            'Justicia habitacional: las viviendas baratas que construyó el gobierno, ¿a quién acabaron engordando?',
          datasets: [
            {
              name: 'Registro nacional de precios reales de transacciones (compraventa)',
              href: 'https://lvr.land.moi.gov.tw/',
              freq: 'trimestral',
            },
            {
              name: 'Situación de la asignación en venta (y alquiler) de vivienda pública nacional en Taipéi',
              href: 'https://data.gov.tw/dataset/121267',
              freq: 'irregular',
            },
            {
              name: 'Estadísticas de emparejamiento del programa de subarriendo y administración de vivienda social de Taipéi',
              href: 'https://data.gov.tw/dataset/155779',
              freq: 'anual',
            },
          ],
          combine:
            'Se alinean por distrito administrativo y nombre del complejo residencial: los registros de asignación de vivienda pública dicen «a qué precio vendió el gobierno en su día», el registro de precios reales dice «cuánto vale hoy esa misma dirección» y las estadísticas de vivienda social dan «el volumen tras pasar de vender a alquilar».',
          method:
            'Serie temporal del mismo complejo, segmentada y contrastada con los hitos de política: la asignación en venta de 1985, el «derribo del muro» de 2002, el «solo alquiler, no venta» de 2016, la reventa en Taoyuan de 2026. El múltiplo de plusvalía dividido entre los años es la pendiente de la «escalera de activos».',
          articles: [
            {
              title: 'Vivienda pública y justicia habitacional',
              href: '/society/國宅與居住正義',
            },
            {
              title: 'Vivienda social y justicia habitacional',
              href: '/society/社會住宅與居住正義',
            },
          ],
        },
        {
          question:
            'Transición energética: la energía nuclear llegó a cero y volvió a arrancar, ¿qué pasó en los números?',
          datasets: [
            {
              name: 'Taipower: rendimiento de la generación nuclear y beneficio de reducción de carbono en los últimos 10 años',
              href: 'https://data.gov.tw/dataset/10859',
              freq: 'anual',
            },
            {
              name: 'Taipower: ubicación de las centrales nucleares y equipos de las unidades',
              href: 'https://data.gov.tw/dataset/10858',
              freq: 'irregular',
            },
          ],
          combine:
            'El rendimiento de generación da la producción anual y el factor de capacidad; la tabla de unidades, la fecha de retiro de cada reactor. Las dos tablas se alinean por año y encima se superponen los referendos y los hitos de política.',
          method:
            'Se traza la curva anual del factor de capacidad y se marcan los tres referendos (2018, 2021, 2025): cómo la curva baja hacia cero y si algún número se movió en el año posterior a cada referendo; el desfase entre la «decisión política» y la «realidad física» aflora solo.',
          articles: [
            {
              title: 'Taiwán y el debate sobre la energía nuclear',
              href: '/society/台灣與核能的討論',
            },
            {
              title:
                'La crisis climática de Taiwán y la transición a cero neto',
              href: '/nature/台灣氣候危機與淨零轉型',
            },
          ],
        },
        {
          question:
            'Finanzas del seguro de salud: quién lo usa, quién lo paga, ¿cuántos años más aguanta este sistema?',
          datasets: [
            {
              name: 'Asegurados del Seguro Nacional de Salud por categoría, sexo y grupo de edad',
              href: 'https://data.gov.tw/dataset/20254',
              freq: 'trimestral',
            },
            {
              name: 'Actas de reunión del Comité del Seguro Nacional de Salud',
              href: 'https://data.gov.tw/dataset/7554',
              freq: 'mensual',
            },
            {
              name: 'Estadísticas de subsidios gubernamentales a asegurados en situación vulnerable',
              href: 'https://data.gov.tw/dataset/23719',
              freq: 'mensual',
            },
          ],
          combine:
            'Con los afiliados por grupo de edad se calcula la proporción estructural entre «los que pagan» y «los que usan»; las actas dan la línea de tiempo de las decisiones sobre la tasa de cotización, y las estadísticas de subsidios a vulnerables muestran la cara ejecutiva del «pagar según la capacidad».',
          method:
            'La proporción de la estructura etaria como serie trimestral, superpuesta con los hitos de decisión de la tasa: la estructura empeora, la tasa no se mueve, ¿con qué se tapa la brecha intermedia (transferencias presupuestarias, valor del punto, copagos)? Cada «se mantiene sin ajuste» de las actas tiene su partida de costo correspondiente.',
          articles: [
            {
              title: 'La medicina en Taiwán y el Seguro Nacional de Salud',
              href: '/lifestyle/台灣醫療與全民健保',
            },
            {
              title: 'La crisis de natalidad de Taiwán',
              href: '/society/台灣少子化危機',
            },
          ],
        },
        {
          question:
            'Calidad democrática: ¿qué tan grande es el padrón de una elección y qué tan intensa la fiscalización?',
          datasets: [
            {
              name: 'Número de electores (Comisión Electoral Central)',
              href: 'https://data.gov.tw/dataset/27491',
              freq: 'cada 4 años',
            },
            {
              name: 'Personas con sentencia firme en casos por infracción de la Ley de Elección y Destitución',
              href: 'https://data.gov.tw/dataset/15035',
              freq: 'mensual',
            },
          ],
          combine:
            'El número de electores da el padrón de cada elección; las estadísticas de sentencias por la Ley de Elección y Destitución dan el volumen histórico de condenas por compra de votos e interferencia electoral. Ambos pueden cortarse por ciudad y condado y alinearse con los resultados electorales.',
          method:
            'Para cada elección se arma un contraste «padrón × tasa de condenas» y se compara entre elecciones cómo cambia la intensidad de la fiscalización; la de 2026 suma la desinformación generada con IA como nuevo foco de control, así que primero hay que fijar la línea base de los dos rubros tradicionales (compra de votos, interferencia) para que la magnitud de la nueva amenaza tenga un sistema de referencia.',
          articles: [
            {
              title: 'Elecciones locales nueve en uno de 2026',
              href: '/politics/2026 九合一選舉',
            },
            {
              title: 'El Movimiento Estudiantil Girasol',
              href: '/society/太陽花學運',
            },
          ],
        },
        {
          question:
            'Economía callejera: ¿cómo se calculó el valor de producción de 230 000 puestos ambulantes?',
          datasets: [
            {
              name: 'Encuesta sobre la situación operativa de los puestos ambulantes',
              href: 'https://data.gov.tw/dataset/10918',
              freq: 'cada 5 años',
            },
            {
              name: 'Mercados nocturnos registrados de la ciudad de Taichung',
              href: 'https://data.gov.tw/dataset/85028',
              freq: 'irregular',
            },
          ],
          combine:
            'El censo quinquenal de la DGBAS (Dirección General de Presupuesto, Contabilidad y Estadística) da la población nacional de puestos ambulantes (número de puestos, personal, ingresos); las listas municipales dan el directorio de «mercados nocturnos oficialmente reconocidos por el gobierno».',
          method:
            'La clave es comparar los censos entre periodos: el cambio quinquenal en el número de puestos y en los ingresos, contrastado con la penetración del pago móvil y las cifras de turistas. Cuando se publique el próximo censo, todos los artículos que citan los 233 000 puestos deberán volver a cotejar la tabla.',
          articles: [
            {
              title: 'La economía de los mercados nocturnos',
              href: '/economy/夜市經濟學',
            },
            {
              title: 'La cultura de los mercados nocturnos',
              href: '/food/夜市文化',
            },
          ],
        },
        {
          question:
            'Seguridad vial: ¿qué relación hay entre 14 millones de motos y tres mil vidas al año?',
          datasets: [
            {
              name: 'Estadísticas del número de vehículos motorizados registrados',
              href: 'https://data.gov.tw/dataset/14208',
              freq: 'mensual',
            },
            {
              name: 'Estadísticas de víctimas de accidentes A1/A2 en Taoyuan (años ROC 91–114, 2002–2025)',
              href: 'https://data.gov.tw/dataset/25932',
              freq: 'anual',
            },
          ],
          combine:
            'Los vehículos registrados dan el denominador (la exposición al riesgo); las víctimas de accidentes, el numerador. La serie larga de nivel municipal (24 años de Taoyuan) sirve primero como plantilla del método, para luego extenderla a otras ciudades y condados.',
          method:
            'No mires solo el número absoluto de muertes: normaliza con la tasa de víctimas por cada cien mil vehículos y calcula motos y autos por separado; la polémica del «infierno de los peatones» necesita exactamente ese denominador.',
          articles: [
            {
              title: 'El sistema de transporte de Taiwán',
              href: '/lifestyle/台灣交通系統',
            },
            {
              title: 'La cultura de la moto en Taiwán',
              href: '/lifestyle/台灣機車文化',
            },
          ],
        },
      ],
    },
    method: {
      title: 'Metodología de enlace: las claves que hacen coincidir dos tablas',
      lead: 'Un conjunto de datos aislado es un punto; solo al combinarse se vuelve una red. Estas son las pistas de enlace que más nos sirvieron en las pruebas.',
      spectrum: {
        title:
          'Frecuencia de actualización = resolución de análisis: el espectro de los quince conjuntos de datos de muestra',
        left: '← Actualización mensual: permite estudios de eventos',
        right: 'Cada cinco años: solo comparación entre periodos →',
        note: 'Cada punto es un conjunto de datos citado en esta página; pasa el cursor para ver su nombre. Antes de diseñar un análisis, mira en qué extremo del espectro caen tus datos.',
      },
      items: [
        {
          name: 'Códigos de distrito administrativo',
          desc: 'La clave de enlace más universal. Los códigos estándar de ciudades, condados y municipios permiten alinear población, precios de vivienda, accidentes y recaudación en un mismo mapa; los distritos homónimos (hay dos distritos Xinyi) se desambiguan por código.',
        },
        {
          name: 'Número de identificación fiscal unificado',
          desc: 'El documento de identidad de las empresas. El registro mercantil, las adjudicaciones de contratos, las solicitudes de patente y las listas de sanciones cuelgan todos de este número: con él se sigue la huella completa de una empresa.',
        },
        {
          name: 'Coordenadas y códigos de estación de medición',
          desc: 'Los datos ambientales (calidad del aire, agua, meteorología) cuelgan de estaciones de medición; los geográficos, de coordenadas. Convertir entre estos y los códigos de distrito administrativo es el primer paso del análisis espacial.',
        },
        {
          name: 'Niveles de calidad',
          desc: 'La escala de platino a bronce es un cribado rápido de «¿este conjunto de datos puede usarse tal cual?»: los de nivel platino suelen estar ya normalizados y admitir consulta estructurada de filas; los no evaluados (como el registro de precios reales de curaduría propia) hay que verificarlos por cuenta propia.',
        },
        {
          name: 'La frecuencia de actualización es la resolución del análisis',
          desc: 'Los datos mensuales permiten estudios de eventos; los anuales, solo tendencias; los quinquenales (el censo de puestos ambulantes), solo comparaciones entre periodos. Primero mira la frecuencia y luego diseña el análisis, no al revés.',
        },
        {
          name: 'Principio de referencia en dos capas',
          desc: 'Cuando un artículo de Taiwan.md cita un conjunto de datos, el enlace apunta siempre a la página persistente de data.gov.tw o del organismo responsable; la capa de consulta (Twinkle Hub) es una ruta de valor añadido en paralelo. Con el hogar de los datos separado del camino de las consultas, un cambio en cualquiera de las capas no rompe la cadena.',
        },
      ],
    },
    tools: {
      title: 'Catálogo de herramientas: la lista completa de las 21',
      lead: 'Lo siguiente se rastrea directamente del punto MCP (se actualiza en cada reconstrucción de la página). La agrupación es nuestra.',
      groups: [
        {
          prefix: [
            'search_datasets',
            'get_dataset',
            'query_rows',
            'materialize_dataset',
            'list_domains',
          ],
          label: 'Cuarteto de conjuntos de datos + índice de dominios',
        },
        {
          prefix: ['search_patents', 'get_patent_body'],
          label: 'Patentes',
        },
        {
          prefix: ['search_exam', 'search_exam_questions', 'get_exam_paper'],
          label: 'Exámenes nacionales',
        },
        {
          prefix: ['search_judicial', 'get_judicial_full'],
          label: 'Sentencias judiciales',
        },
        {
          prefix: [
            'lookup_icd10',
            'search_drug',
            'get_drug_details',
            'search_health_supplements',
            'search_drug_label',
            'check_drug_interaction',
          ],
          label: 'Medicamentos y códigos médicos',
        },
        {
          prefix: [
            'query_food_nutrition',
            'search_foods_by_nutrient',
            'analyze_meal_nutrition',
          ],
          label: 'Nutrición alimentaria',
        },
      ],
    },
    footer: {
      crawledLabel:
        'La lista de herramientas y dominios de esta página se rastreó en tiempo real el',
      note: 'Twinkle Hub está en fase alfa, y la evaluación de esta página se actualizará a medida que evolucione. Taiwan.md y Twinkle Hub no tienen hoy ninguna relación comercial; esta página es el chequeo de primera mano de un usuario intensivo, y también una invitación: solo cuando la capa de datos y la capa de significado cooperan, Taiwán puede ser comprendido por completo.',
      pilotTitle: 'Artículos ya conectados a la capa de datos',
      pilotLead:
        'Desde junio de 2026 empezamos a añadir al final de los artículos una sección de «datos públicos»: cada una lista los conjuntos de datos que pueden verificar (o refutar) los argumentos del texto, con una línea sobre «por qué apunta ahí». Los primeros seis:',
      pilotArticles: [
        {
          title: 'Taiwán y el debate sobre la energía nuclear',
          href: '/society/台灣與核能的討論',
        },
        {
          title: 'Vivienda pública y justicia habitacional',
          href: '/society/國宅與居住正義',
        },
        {
          title: 'La medicina en Taiwán y el Seguro Nacional de Salud',
          href: '/lifestyle/台灣醫療與全民健保',
        },
        {
          title: 'La economía de los mercados nocturnos',
          href: '/economy/夜市經濟學',
        },
        {
          title: 'El sistema de transporte de Taiwán',
          href: '/lifestyle/台灣交通系統',
        },
        {
          title: 'Elecciones locales nueve en uno de 2026',
          href: '/politics/2026 九合一選舉',
        },
      ],
    },
  },
  fr: {
    meta: {
      title:
        'Curation des données ouvertes — données ouvertes de Taïwan × Twinkle Hub : le guide de la couche de sens',
      description:
        "Cinquante mille jeux de données publics, c'est écrasant pour n'importe qui. Cette page est la curation de données de Taiwan.md : quelles données méritent le regard, comment les combiner pour analyser une question, et à quelles histoires de l'île chaque série de chiffres se relie. Avec une évaluation de première main de Twinkle Hub — complétude, stabilité, simplicité d'accès — fondée sur nos propres tests.",
    },
    hero: {
      eyebrow: 'OPEN DATA CURATION',
      title: 'Curation des données ouvertes',
      subtitle:
        'Les données ouvertes de Taïwan × Twinkle Hub : le guide de la couche de sens',
      intro: [
        "La plateforme de données ouvertes du gouvernement taïwanais compte plus de cinquante-deux mille jeux de données. Ce chiffre écrase quiconque veut s'en servir : impossible de savoir lesquels comptent, jusqu'à quand ils sont tenus à jour, quelles tables peuvent se croiser — et encore moins ce qu'ils ont à voir avec les questions qui vous préoccupent.",
        "Taiwan.md a écrit plus de neuf cents articles sur Taïwan, et derrière chacun il y a un jugement : « avec quelles données vérifier cette affirmation ». Cette page étale ce jugement au grand jour : comment nous évaluons l'infrastructure de données, quels jeux de données combiner — et comment — pour analyser une question, et à quelles histoires de l'île chaque domaine de données se relie.",
      ],
      viz: {
        stats: [
          {
            n: 52556,
            suffix: '',
            label: 'jeux de données publics (2026-10-23)',
          },
          {
            n: 1240000,
            suffix: '+',
            label: 'jugements en texte intégral',
          },
          {
            n: 320663,
            suffix: '',
            label: "questions d'examens nationaux",
          },
          {
            n: 226825,
            suffix: '',
            label: "lignes d'analyse nutritionnelle",
          },
          {
            n: 135000,
            suffix: '+',
            label: 'marchés publics enregistrés',
          },
        ],
        graphHint:
          'Le réseau ci-dessous est réel : à gauche, les 20 domaines de données et les cinq grands corpus verticaux (collectés en direct) ; à droite, les articles Taiwan.md déjà écrits. Chaque ligne est un jugement de curation de cette page. Faites glisser, survolez — regardez des données complexes se brancher sur des histoires claires.',
        legend: {
          domain: 'Domaine de données',
          vertical: 'Corpus vertical',
          article: 'Article Taiwan.md',
          center: 'Taiwan.md, couche de sens',
        },
      },
    },
    ecosystem: {
      title: "Carte de l'écosystème : trois couches, chacune garde la sienne",
      lead: "Pour qu'une IA (ou une personne) réponde vraiment à une question « sur Taïwan », il faut trois couches qui coopèrent : la maison des données, le chemin des requêtes, la couche du sens.",
      layers: [
        {
          name: 'data.gov.tw et les systèmes des administrations',
          role: 'La maison des données (SSOT)',
          desc: "La plateforme nationale de données ouvertes est l'identité pérenne de chaque jeu de données : numéro de dataset, licence, administration responsable, téléchargement d'origine. Toute citation doit, au bout du compte, revenir ici.",
          stat: 'env. 50 000 jeux de données',
        },
        {
          name: 'Twinkle Hub',
          role: 'Le chemin des requêtes (passerelle MCP)',
          desc: 'Premier hub MCP de Taïwan : il regroupe des données dispersées sur une centaine de portails publics en un point de requête unique — recherche sémantique, interrogation structurée des lignes, outils pour cinq domaines verticaux. Une IA obtient les données en un seul appel, sans le bourbier manuel du passage de portail en portail.',
          stat: '21 outils · 20 domaines',
        },
        {
          name: 'Taiwan.md',
          role: 'La couche du sens (curation)',
          desc: "Les données ne parlent pas d'elles-mêmes. Quel jeu de données mérite d'être pointé, quelle affirmation il vérifie, à quel pan d'histoire il se relie — c'est le travail de curation. Depuis juin 2026, nos articles reçoivent un à un une section « Données publiques » qui coud le récit aux données d'origine.",
          stat: '1,100+ articles · 15 pointeurs de jeux de données en ligne',
        },
      ],
    },
    assessment: {
      title: 'Évaluation sur trois axes : ce que nos tests ont montré',
      lead: "Voici l'évaluation de première main menée par Taiwan.md en tant qu'utilisateur, avec ses propres outils de vérification (deux campagnes de tests, mai et juin 2026), déployée selon trois axes. Ce n'est pas une publicité, c'est un bilan de santé.",
      gapsLabel: 'Lacunes assumées',
      dims: [
        {
          name: 'Complétude des données',
          verdict: 'La couverture est réelle, et elle dépasse le simple miroir',
          points: [
            'data.gov.tw recense lui-même 52 556 jeux de données au 23 octobre 2026 ; le site de Twinkle Hub en affiche 53 185 pour Taïwan (jeux auto-curés inclus), plus 135 000 marchés publics électroniques et les données du Yuan législatif',
            "Les 20 catégories de domaines arrivent chacune avec leurs « questions types » et leurs « exemples d'ancrage » ; chaque jeu de données porte un niveau de qualité (du platine au bronze), sa fréquence de mise à jour, son format et ses clés de jointure",
            "Les jeux de données constitués par le hub lui-même comblent les trous des portails publics : le registre national des prix immobiliers réels (ventes / préventes / locations) se branche directement sur le système du Département des affaires foncières du ministère de l'Intérieur",
            'Cinq corpus verticaux vont au-delà du simple miroir : texte intégral des brevets, banque de questions des examens nationaux, jugements, autorisations de médicaments et nutrition alimentaire (les échelles sont dans la section suivante)',
          ],
          gaps: [
            "Le classement de recherche favorise les tranches locales : chercher « taux de natalité » renvoie trois jeux de données à l'échelle des villes et comtés — Nantou, Taoyuan, Kaohsiung — et la version nationale doit être repêchée à la main. C'est précisément la raison d'être de la curation",
            "Le nombre total de jeux de données par domaine reste introuvable ; l'inventaire ne peut s'appuyer que sur les chiffres officiellement annoncés",
            'Une partie des vieux jeux de données reste au format ODS non normalisé, impossible à interroger de façon structurée',
          ],
        },
        {
          name: 'Stabilité',
          verdict: 'Un alpha assumé : ça tourne vite, ça change vite',
          points: [
            'Latence mesurée sous les 100 ms en cas de hit de cache ; chaque réponse embarque un trace_id et un champ de coût — la transparence est bonne',
            "Les descriptions d'outils embarquent leur numéro de version (v1.11.2 pour les requêtes agrégées, v1.18 pour les jugements) : le rythme d'itération se voit",
            "Le corpus de jugements affiche explicitement son périmètre alpha (de mai 2024 à mars 2026, environ 1,24 million de documents) — tracer clairement ses limites est plus honnête que feindre l'exhaustivité",
          ],
          gaps: [
            "Deux changements d'interface API en deux mois : entre le 11 mai et le 10 juin 2026, la connexion est passée à une poignée de main de session, les outils ont été réorganisés de 40 à 21, et un groupe entier d'outils déterministes a été retiré",
            "Des limites de débit (HTTP 429) sont déjà apparues pendant l'alpha, sans que la fenêtre de limitation soit publiée",
            "Notre parade : une fine couche d'encapsulation isole les changements d'interface, et les articles citent toujours des pointeurs statiques, sans dépendre de l'API à l'exécution — c'est ainsi qu'il faut se brancher sur n'importe quel service alpha",
          ],
        },
        {
          name: "Simplicité d'accès",
          verdict: "C'est son point le plus fort",
          points: [
            "Un seul point d'accès MCP remplace une centaine de portails publics : recherche, métadonnées, interrogation des lignes, agrégation — un parcours en quatre temps, avec un schéma de champs homogène",
            "L'interrogation structurée accepte conditions SQL et agrégations : un jeu de données déjà normalisé s'utilise directement comme une base de données",
            "La même question d'adresse, d'année ou de circonscription exigeait hier 15 à 30 minutes de recoupement manuel sur trois à cinq portails ; aujourd'hui, un appel, moins d'une seconde",
            "Un paquet d'installation en un clic branche directement plus de dix clients IA, dont Claude et Cursor — la friction de « rendre les données de Taïwan lisibles par les IA » vient d'être réduite d'un ordre de grandeur",
          ],
          gaps: [
            "Il faut une clé API (bearer token) ; l'alpha est gratuit, la facturation par outil viendra — la pérennité d'un chemin gratuit est une question que l'écosystème des données ouvertes doit continuer à poser",
            "Le service lui-même est fermé : les données sont ouvertes, le canal, pour l'instant, ne l'est pas. Le téléchargement direct sur data.gov.tw restera toujours le filet de sécurité qui contourne n'importe quelle passerelle",
          ],
        },
      ],
    },
    verticals: {
      title: 'Cinq corpus verticaux : la part qui dépasse le miroir',
      lead: "Emballer des jeux de données dans une interface de recherche n'a rien d'extraordinaire ; ces cinq domaines verticaux, eux, font de la recherche sémantique et de l'extraction structurée — c'est la part de Twinkle Hub qui dépasse le « miroir de data.gov.tw ».",
      logNote:
        "Les barres de volume sont en échelle logarithmique : le corpus de jugements pèse 17 fois celui des autorisations de médicaments — en linéaire, les quatre autres barres seraient écrasées jusqu'à l'invisible.",
      items: [
        {
          name: 'Brevets',
          stat: "Texte intégral des demandes de brevets d'invention publiées par le TIPO",
          desc: "Interroger le corpus des brevets en langage naturel, avec accès aux descriptions techniques complètes et aux revendications. En écrivant sur l'industrie taïwanaise, « cette entreprise possède-t-elle vraiment cette technologie ? » devient, pour la première fois, vérifiable par recherche sémantique.",
        },
        {
          name: 'Examens nationaux',
          stat: '64 815 épreuves · 320 000 questions (2012–2025)',
          desc: "Les épreuves du ministère des Examens, interrogeables jusqu'à la question près. La culture taïwanaise des concours nationaux (la fièvre de la fonction publique, les rues d'écoles de bachotage) est une histoire que les données n'ont encore jamais racontée.",
        },
        {
          name: 'Jugements',
          stat: 'env. 1,24 million de documents (mai 2024 – mars 2026, alpha)',
          desc: "Chercher dans le corpus des jugements en langage courant. Pour les articles sur la justice, les conflits du travail ou les litiges locatifs, « comment les tribunaux tranchent en pratique » a désormais une porte d'entrée vérifiable.",
        },
        {
          name: 'Médicaments et santé',
          stat: '71 836 autorisations de médicaments · 96 803 codes ICD-10 en chinois',
          desc: "Autorisations de mise sur le marché, notices en champs structurés, certifications d'aliments santé, premier filtrage des interactions médicamenteuses. La couche factuelle des articles sur l'assurance maladie et la médecine.",
        },
        {
          name: 'Nutrition alimentaire',
          stat: "226 825 lignes d'analyse nutritionnelle",
          desc: 'La base de composition nutritionnelle du ministère de la Santé : plus de vingt nutriments par aliment, classement par nutriment, total calculable pour un repas. Le socle chiffré des articles sur les marchés de nuit et la cuisine.',
        },
      ],
    },
    domains: {
      title: 'Vingt domaines de données × la carte des histoires de Taiwan.md',
      lead: "À gauche, la classification par domaines de Twinkle Hub (collectée en direct) ; à droite, notre correspondance de curation : à quels articles de l'île les données de chaque domaine se relient. Dans les domaines marqués « Histoire à écrire », les jeux de données phares et le chemin d'analyse sont déjà prêts, l'article ne l'est pas encore : c'est notre carte de développement — et une invitation à quiconque voudrait l'écrire.",
      questionsLabel: 'Questions types',
      articlesLabel: 'Articles reliés',
      blankLabel: 'Histoire à écrire',
      proposedStoryLabel: "L'histoire qu'on pourrait écrire",
      proposedHowLabel: 'Comment analyser',
      map: [
        {
          key: 'realestate_land',
          articles: [
            {
              title: 'Logement national et justice du logement',
              href: '/society/國宅與居住正義',
            },
            {
              title: 'Logement social et justice du logement',
              href: '/society/社會住宅與居住正義',
            },
          ],
        },
        {
          key: 'economy_business',
          articles: [
            {
              title: "Vue d'ensemble des articles Économie",
              href: '/economy',
            },
            {
              title: 'Entreprises de Taïwan : Chunghwa Telecom',
              href: '/economy/台灣企業：中華電信',
            },
          ],
        },
        {
          key: 'procurement_subsidy',
          proposed: {
            story:
              "Qui a remporté Taïwan : la carte de l'externalisation publique dans 135 000 avis d'attribution",
            datasets: [
              {
                name: "Avis d'appel d'offres et d'attribution du portail des marchés publics électroniques",
                href: 'https://web.pcc.gov.tw/',
                freq: 'bimensuel',
              },
              {
                name: "Liste des fournisseurs en cours d'exécution de marchés de montant exceptionnel",
                href: 'https://data.gov.tw/dataset/7264',
                freq: 'quotidien',
              },
            ],
            how: "Joindre les avis d'attribution au registre du commerce par le numéro d'entreprise unifié : quel fournisseur a remporté combien, auprès de quelles administrations, année après année. Une carte de chaleur sur trois axes — montant, administration, année — et la géographie comme les réseaux de la dépense publique remontent d'eux-mêmes à la surface.",
          },
        },
        {
          key: 'public_finance',
          articles: [
            {
              title: 'Le budget général du gouvernement central',
              href: '/politics/中央政府總預算',
            },
          ],
        },
        {
          key: 'tax_revenue',
          proposed: {
            story:
              'De quels impôts vit votre ville : le bilan de santé des finances locales',
            datasets: [
              {
                name: 'Statistiques annuelles des recettes fiscales locales nettes de la ville de Taoyuan',
                href: 'https://data.gov.tw/dataset/147936',
                freq: 'annuel',
              },
              {
                name: 'Recettes nettes par impôt du comté de Hualien (chiffres du mois)',
                href: 'https://data.gov.tw/dataset/177569',
                freq: 'irrégulier',
              },
            ],
            how: "Décomposer les recettes nettes de chaque ville et comté par impôt : qui vit de la taxe sur la valeur foncière et de la taxe sur les bâtiments (les métropoles), qui vit des dotations de péréquation centrales (les autres). Une fois alignés sur la population et les prix immobiliers par code administratif, le classement de l'autonomie fiscale se calcule tout seul.",
          },
        },
        {
          key: 'transport',
          articles: [
            {
              title: 'Le système de transports de Taïwan',
              href: '/lifestyle/台灣交通系統',
            },
            {
              title: 'La culture du scooter à Taïwan',
              href: '/lifestyle/台灣機車文化',
            },
          ],
        },
        {
          key: 'public_safety',
          articles: [
            {
              title: 'Typhons',
              href: '/nature/颱風',
            },
          ],
        },
        {
          key: 'judicial_legal',
          articles: [
            {
              title: 'Réforme judiciaire et détention préventive à Taïwan',
              href: '/society/台灣司法改革與預防性羈押制度',
            },
          ],
        },
        {
          key: 'legislature',
          articles: [
            {
              title: 'Le mouvement étudiant des Tournesols',
              href: '/society/太陽花學運',
            },
          ],
        },
        {
          key: 'health_food',
          articles: [
            {
              title: "La santé à Taïwan et l'assurance maladie universelle",
              href: '/lifestyle/台灣醫療與全民健保',
            },
          ],
        },
        {
          key: 'environment',
          articles: [
            {
              title: 'Histoire du mouvement environnemental taïwanais',
              href: '/nature/台灣環境運動史',
            },
            {
              title:
                'Crise climatique et transition vers la neutralité carbone à Taïwan',
              href: '/nature/台灣氣候危機與淨零轉型',
            },
          ],
        },
        {
          key: 'education_research',
          articles: [
            {
              title: 'Le système éducatif taïwanais',
              href: '/lifestyle/台灣教育制度',
            },
            {
              title: "L'éducation en zone rurale à Taïwan",
              href: '/society/台灣偏鄉教育',
            },
          ],
        },
        {
          key: 'agriculture_fisheries',
          articles: [
            {
              title: "L'industrie du café à Taïwan",
              href: '/food/台灣咖啡產業',
            },
            {
              title: 'La culture du thé',
              href: '/food/茶文化',
            },
          ],
        },
        {
          key: 'labor_employment',
          articles: [{ title: 'Qui est mal payé', href: '/society/誰算低薪' }],
        },
        {
          key: 'social_population',
          articles: [
            {
              title: 'La crise de la dénatalité à Taïwan',
              href: '/society/台灣少子化危機',
            },
            {
              title: 'Les élections neuf-en-un de 2026',
              href: '/politics/2026 九合一選舉',
            },
          ],
        },
        {
          key: 'culture_tourism_sport',
          articles: [
            {
              title: 'La culture des marchés de nuit',
              href: '/food/夜市文化',
            },
            {
              title: 'La culture du baseball à Taïwan',
              href: '/culture/台灣棒球文化',
            },
          ],
        },
        {
          key: 'foreign_affairs',
          articles: [
            {
              title:
                'Les alliés diplomatiques de Taïwan et sa diplomatie internationale',
              href: '/society/台灣邦交國與國際外交',
            },
          ],
        },
        {
          key: 'gov_publication',
          proposed: {
            story:
              'Taïwan au journal officiel : ce que le gouvernement annonce lui-même chaque mois',
            datasets: [
              {
                name: 'Portail du Journal officiel du Yuan exécutif',
                href: 'https://gazette.nat.gov.tw/',
                freq: 'quotidien',
              },
              {
                name: 'Journal officiel de la municipalité de Taipei',
                href: 'https://data.gov.tw/dataset/132348',
                freq: 'mensuel',
              },
            ],
            how: "Transformer le texte intégral des journaux officiels en séries temporelles de mots-clés sur les changements réglementaires, puis les confronter aux archives parlementaires du domaine legislature : l'écart de temps entre l'annonce administrative et la trajectoire législative, c'est la vitesse réelle à laquelle une politique entre en vigueur.",
          },
        },
        {
          key: 'geo_basemap',
          articles: [
            {
              title: 'Comment lire une carte de Taïwan',
              href: '/geography/台灣地圖怎麼讀',
            },
          ],
        },
        {
          key: 'utilities_telecom',
          articles: [
            {
              title: 'Taïwan et le débat sur le nucléaire',
              href: '/society/台灣與核能的討論',
            },
          ],
        },
      ],
    },
    recipes: {
      title:
        "Recettes d'analyse : pour comprendre une question, quelles données, et comment les assembler",
      lead: "C'est le cœur de cette page. Chaque carte est une vraie question d'analyse : quels jeux de données mobiliser, par quelles clés les joindre, avec quelle méthode regarder — et quel article a déjà transformé cette analyse en histoire.",
      combineLabel: 'Comment combiner',
      methodLabel: 'Comment analyser au mieux',
      articlesLabel: 'Histoires déjà écrites',
      items: [
        {
          question:
            "Justice du logement : les logements bon marché construits par l'État, qui ont-ils fini par engraisser ?",
          datasets: [
            {
              name: 'Registre national des prix immobiliers réels (ventes)',
              href: 'https://lvr.land.moi.gov.tw/',
              freq: 'trimestriel',
            },
            {
              name: 'Situation des attributions (et locations) de logements nationaux à Taipei',
              href: 'https://data.gov.tw/dataset/121267',
              freq: 'irrégulier',
            },
            {
              name: "Statistiques d'appariement des logements sociaux en location-gérance à Taipei",
              href: 'https://data.gov.tw/dataset/155779',
              freq: 'annuel',
            },
          ],
          combine:
            "Aligner par circonscription et par nom de résidence : les registres d'attribution des logements nationaux disent « à quel prix l'État a vendu à l'époque », le registre des prix réels dit « ce que vaut la même adresse aujourd'hui », les statistiques du logement social donnent « les volumes depuis qu'on loue au lieu de vendre ».",
          method:
            "Construire la série temporelle d'une même résidence, puis la découper aux jalons politiques : attribution en 1985, « chute du mur » en 2002, location sans vente en 2016, retour à la vente à Taoyuan en 2026. Le multiple de plus-value divisé par le nombre d'années : voilà la pente de « l'escalator patrimonial ».",
          articles: [
            {
              title: 'Logement national et justice du logement',
              href: '/society/國宅與居住正義',
            },
            {
              title: 'Logement social et justice du logement',
              href: '/society/社會住宅與居住正義',
            },
          ],
        },
        {
          question:
            "Transition énergétique : le nucléaire ramené à zéro puis relancé — que s'est-il passé dans les chiffres ?",
          datasets: [
            {
              name: 'Taipower : performance du nucléaire et gains carbone sur les dix dernières années',
              href: 'https://data.gov.tw/dataset/10859',
              freq: 'annuel',
            },
            {
              name: 'Taipower : implantation des centrales nucléaires et équipement des tranches',
              href: 'https://data.gov.tw/dataset/10858',
              freq: 'irrégulier',
            },
          ],
          combine:
            "La performance donne la production annuelle et le facteur de capacité ; le tableau des tranches donne la date de mise à l'arrêt de chaque réacteur. Aligner les deux tables par année, puis superposer référendums et jalons politiques.",
          method:
            "Tracer la courbe annuelle du facteur de capacité et y marquer les trois référendums (2018, 2021, 2025) : comment la courbe descend vers zéro, et si un seul chiffre a bougé dans l'année qui suit chaque vote — le décalage temporel entre « décision politique » et « réalité physique » remonte tout seul à la surface.",
          articles: [
            {
              title: 'Taïwan et le débat sur le nucléaire',
              href: '/society/台灣與核能的討論',
            },
            {
              title:
                'Crise climatique et transition vers la neutralité carbone à Taïwan',
              href: '/nature/台灣氣候危機與淨零轉型',
            },
          ],
        },
        {
          question:
            "Finances de l'assurance maladie : qui l'utilise, qui cotise — combien d'années ce système peut-il encore tenir ?",
          datasets: [
            {
              name: "Assurés de l'assurance maladie par catégorie, sexe et tranche d'âge",
              href: 'https://data.gov.tw/dataset/20254',
              freq: 'trimestriel',
            },
            {
              name: "Procès-verbaux du Comité de l'assurance maladie universelle",
              href: 'https://data.gov.tw/dataset/7554',
              freq: 'mensuel',
            },
            {
              name: 'Statistiques des subventions publiques aux assurés vulnérables, tous échelons confondus',
              href: 'https://data.gov.tw/dataset/23719',
              freq: 'mensuel',
            },
          ],
          combine:
            "Les effectifs assurés par tranche d'âge donnent le rapport structurel entre « ceux qui cotisent » et « ceux qui consomment » ; les procès-verbaux donnent la chronologie des décisions sur le taux de cotisation ; les statistiques de subventions montrent le versant concret de la « contribution selon les moyens ».",
          method:
            "Mettre ce rapport d'âges en série trimestrielle et y superposer les décisions de taux : la structure se dégrade, le taux ne bouge pas — avec quoi comble-t-on l'écart (rallonges budgétaires, valeur du point, ticket modérateur) ? Dans les procès-verbaux, chaque « maintien sans ajustement » a sa ligne de coût en face.",
          articles: [
            {
              title: "La santé à Taïwan et l'assurance maladie universelle",
              href: '/lifestyle/台灣醫療與全民健保',
            },
            {
              title: 'La crise de la dénatalité à Taïwan',
              href: '/society/台灣少子化危機',
            },
          ],
        },
        {
          question:
            "Qualité de la démocratie : quelle est la taille du corps électoral d'un scrutin, et quelle est l'intensité des poursuites ?",
          datasets: [
            {
              name: "Nombre d'électeurs (Commission électorale centrale)",
              href: 'https://data.gov.tw/dataset/27491',
              freq: 'tous les 4 ans',
            },
            {
              name: 'Condamnations définitives pour infraction à la loi sur les élections et les révocations',
              href: 'https://data.gov.tw/dataset/15035',
              freq: 'mensuel',
            },
          ],
          combine:
            "Le nombre d'électeurs donne le corps électoral de chaque scrutin ; les statistiques judiciaires donnent, année par année, le volume de condamnations pour achat de votes et pour ingérence électorale. Les deux se découpent par ville et comté, et s'alignent sur les résultats.",
          method:
            "Construire pour chaque scrutin le couple « corps électoral × taux de condamnation », puis comparer d'un scrutin à l'autre l'intensité des poursuites ; en 2026 s'ajoute un nouveau front, la désinformation par IA — posez d'abord la ligne de base des deux fronts classiques (achat de votes, ingérence), et l'ampleur de la nouvelle menace aura un référentiel.",
          articles: [
            {
              title: 'Les élections neuf-en-un de 2026',
              href: '/politics/2026 九合一選舉',
            },
            {
              title: 'Le mouvement étudiant des Tournesols',
              href: '/society/太陽花學運',
            },
          ],
        },
        {
          question:
            "Économie de la rue : d'où sort le chiffre d'affaires des 230 000 étals ?",
          datasets: [
            {
              name: 'Enquête sur la situation des vendeurs de rue',
              href: 'https://data.gov.tw/dataset/10918',
              freq: 'tous les 5 ans',
            },
            {
              name: 'Marchés de nuit homologués de la ville de Taichung',
              href: 'https://data.gov.tw/dataset/85028',
              freq: 'irrégulier',
            },
          ],
          combine:
            'Le recensement quinquennal de la DGBAS (Direction générale du budget, de la comptabilité et des statistiques) donne la population nationale des étals — nombre, personnes employées, recettes ; les listes municipales donnent le répertoire des marchés de nuit « officiellement reconnus par les pouvoirs publics ».',
          method:
            "La comparaison entre vagues de recensement est la clé : l'évolution sur cinq ans du nombre d'étals et des recettes, mise en regard de la pénétration du paiement mobile et de la fréquentation touristique. À la sortie du prochain recensement, tous les articles qui citent les 233 000 étals devront revenir se recaler.",
          articles: [
            {
              title: "L'économie des marchés de nuit",
              href: '/economy/夜市經濟學',
            },
            {
              title: 'La culture des marchés de nuit',
              href: '/food/夜市文化',
            },
          ],
        },
        {
          question:
            'Sécurité routière : quel lien entre 14 millions de scooters et trois mille vies chaque année ?',
          datasets: [
            {
              name: 'Statistiques des immatriculations de véhicules à moteur',
              href: 'https://data.gov.tw/dataset/14208',
              freq: 'mensuel',
            },
            {
              name: "Ville de Taoyuan : victimes d'accidents A1/A2 (années ROC 91–114)",
              href: 'https://data.gov.tw/dataset/25932',
              freq: 'annuel',
            },
          ],
          combine:
            "Les immatriculations donnent le dénominateur (l'exposition au risque), les victimes d'accidents donnent le numérateur. La longue série municipale (24 ans à Taoyuan) sert d'abord de gabarit de méthode, avant extension aux autres villes et comtés.",
          method:
            "Ne regardez pas seulement les morts en valeur absolue : normalisez en taux de victimes pour 100 000 véhicules, scooters et voitures comptés séparément ; c'est exactement ce dénominateur que réclame le débat sur « l'enfer des piétons ».",
          articles: [
            {
              title: 'Le système de transports de Taïwan',
              href: '/lifestyle/台灣交通系統',
            },
            {
              title: 'La culture du scooter à Taïwan',
              href: '/lifestyle/台灣機車文化',
            },
          ],
        },
      ],
    },
    method: {
      title:
        'Méthodologie de jointure : les clés qui font tenir deux tables ensemble',
      lead: "Un jeu de données isolé n'est qu'un point ; c'est la combinaison qui fait un réseau. Voici les fils de jointure les plus utiles d'après nos tests.",
      spectrum: {
        title:
          "Fréquence de mise à jour = résolution d'analyse : le spectre des quinze jeux de données vitrines",
        left: "← Mise à jour mensuelle : l'étude d'événement est possible",
        right: 'Tous les cinq ans : seule la comparaison entre vagues →',
        note: "Chaque point est un jeu de données cité sur cette page ; survolez pour lire son nom. Avant de concevoir une analyse, regardez d'abord de quel côté du spectre tombent vos données.",
      },
      items: [
        {
          name: 'Codes de circonscription administrative',
          desc: 'La clé de jointure la plus universelle. Les codes standard des villes, comtés et districts alignent population, prix immobiliers, accidents et recettes fiscales sur une même carte ; les districts homonymes (les deux Xinyi) se départagent par le code.',
        },
        {
          name: "Numéro d'entreprise unifié",
          desc: "La carte d'identité des entreprises. Registre du commerce, marchés remportés, dépôts de brevets, listes de sanctions : tout y est accroché — c'est par lui qu'on suit la trace complète d'une entreprise.",
        },
        {
          name: 'Coordonnées et codes de stations',
          desc: "Les données environnementales (qualité de l'air, eau, météo) sont rattachées aux stations de mesure, les données géographiques aux coordonnées. Convertir vers les codes administratifs — et inversement — est le premier pas de l'analyse spatiale.",
        },
        {
          name: 'Niveaux de qualité',
          desc: "L'échelle du platine au bronze est un test éclair du « peut-on utiliser ce jeu de données tel quel » : le niveau platine est le plus souvent déjà normalisé, interrogeable de façon structurée ; le non-testé (comme le registre des prix réels constitué par le hub lui-même) se vérifie soi-même.",
        },
        {
          name: "La fréquence de mise à jour est la résolution d'analyse",
          desc: "Des données mensuelles permettent l'étude d'événement ; des données annuelles ne montrent que des tendances ; des données quinquennales (le recensement des étals) ne permettent que la comparaison entre vagues. Regardez la fréquence avant de concevoir l'analyse — jamais l'inverse.",
        },
        {
          name: 'Le principe du double pointeur',
          desc: "Quand un article Taiwan.md cite un jeu de données, le lien pointe toujours vers la page pérenne de data.gov.tw ou de l'administration responsable ; la couche de requête (Twinkle Hub) est un chemin à valeur ajoutée, en parallèle. La maison des données et le chemin des requêtes restent séparés : quelle que soit la couche qui bouge, la chaîne ne casse pas.",
        },
      ],
    },
    tools: {
      title: "Catalogue d'outils : la liste complète des 21 outils",
      lead: "La liste ci-dessous est collectée directement depuis le point d'accès MCP (rafraîchie à chaque reconstruction de la page). Le regroupement, lui, est de nous.",
      groups: [
        {
          prefix: [
            'search_datasets',
            'get_dataset',
            'query_rows',
            'materialize_dataset',
            'list_domains',
          ],
          label: "Le quatuor des jeux de données + l'index des domaines",
        },
        {
          prefix: ['search_patents', 'get_patent_body'],
          label: 'Brevets',
        },
        {
          prefix: ['search_exam', 'search_exam_questions', 'get_exam_paper'],
          label: 'Examens nationaux',
        },
        {
          prefix: ['search_judicial', 'get_judicial_full'],
          label: 'Jugements',
        },
        {
          prefix: [
            'lookup_icd10',
            'search_drug',
            'get_drug_details',
            'search_health_supplements',
            'search_drug_label',
            'check_drug_interaction',
          ],
          label: 'Médicaments et codes médicaux',
        },
        {
          prefix: [
            'query_food_nutrition',
            'search_foods_by_nutrient',
            'analyze_meal_nutrition',
          ],
          label: 'Nutrition alimentaire',
        },
      ],
    },
    footer: {
      crawledLabel: 'Outils et domaines de cette page collectés en direct le',
      note: "Twinkle Hub est en alpha ; l'évaluation de cette page sera mise à jour au fil de son évolution. Taiwan.md n'a, à ce jour, aucune relation commerciale avec Twinkle Hub ; cette page est le bilan de santé de première main d'un utilisateur intensif — et une invitation : c'est quand la couche des données et la couche du sens coopèrent que Taïwan peut être compris dans son entier.",
      pilotTitle: 'Les articles déjà branchés sur la couche de données',
      pilotLead:
        "Depuis juin 2026, nous ajoutons en fin d'article une section « Données publiques » : chaque article y liste les jeux de données capables de vérifier (ou de réfuter) ses affirmations, avec une ligne expliquant « pourquoi ce pointeur ». Première fournée, six articles :",
      pilotArticles: [
        {
          title: 'Taïwan et le débat sur le nucléaire',
          href: '/society/台灣與核能的討論',
        },
        {
          title: 'Logement national et justice du logement',
          href: '/society/國宅與居住正義',
        },
        {
          title: "La santé à Taïwan et l'assurance maladie universelle",
          href: '/lifestyle/台灣醫療與全民健保',
        },
        {
          title: "L'économie des marchés de nuit",
          href: '/economy/夜市經濟學',
        },
        {
          title: 'Le système de transports de Taïwan',
          href: '/lifestyle/台灣交通系統',
        },
        {
          title: 'Les élections neuf-en-un de 2026',
          href: '/politics/2026 九合一選舉',
        },
      ],
    },
  },
};

// ── 取用入口 ────────────────────────────────────────────────────────────────
// 六語（zh-TW/en/ja/ko/es/fr）有完整內容；vi/id/pt/hi/ar/ru/de 用「英文底稿 +
// overlay」：overlay 翻譯最顯眼的部分（hero、各區標題與說明、卡片標題），
// 其餘（逐項要點、資料集名稱、故事標題）退回英文，絕不退回中文。
// 陣列按索引逐項合併，所以 overlay 的陣列可以只寫前幾項的部分欄位。
function deepMerge<T>(base: T, over: DeepPartial<T> | undefined): T {
  if (over === undefined || over === null) return base;
  if (Array.isArray(base)) {
    const o = over as unknown as unknown[];
    return base.map((b, i) => deepMerge(b, o[i] as never)) as unknown as T;
  }
  if (base && typeof base === 'object') {
    const out: Record<string, unknown> = { ...(base as object) };
    for (const [k, v] of Object.entries(over as object)) {
      out[k] = deepMerge(
        (base as Record<string, unknown>)[k] as never,
        v as never,
      );
    }
    return out as T;
  }
  return over as unknown as T;
}

export function getOpendataContent(lang: string): OpendataContent {
  const full = OPENDATA_CONTENT[lang];
  if (full) return full;
  const en = OPENDATA_CONTENT.en ?? OPENDATA_CONTENT['zh-TW'];
  const overlay = OPENDATA_OVERLAYS[lang];
  return overlay ? deepMerge(en, overlay) : en;
}
