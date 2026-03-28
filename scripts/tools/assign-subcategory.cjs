#!/usr/bin/env node
/**
 * Batch assign subcategory to all knowledge/ articles based on SUBCATEGORY.md mapping.
 * Usage: node tools/assign-subcategory.js [--dry-run]
 */

const fs = require('fs');
const path = require('path');

const dryRun = process.argv.includes('--dry-run');
const knowledgeDir = path.resolve(__dirname, '../..', 'knowledge');

// Definitive mapping: category → { keyword patterns → subcategory }
const mapping = {
  History: [
    { sub: '史觀與方法論', match: ['島史觀'] },
    { sub: '史前與原住民', match: ['史前', '原住民族歷史'] },
    { sub: '殖民與帝國', match: ['荷西', '明鄭', '清治', '日治'] },
    { sub: '戰後與威權', match: ['國民政府', '戒嚴', '白色恐怖', '戰後重建'] },
    { sub: '民主與治理', match: ['民主轉型', '選舉', '政黨', '台海', '兩岸'] },
    { sub: '經濟發展史', match: ['經濟奇蹟', '亞洲四小龍', '戰後經濟'] },
    { sub: '軍事歷史', match: ['二二八', '湖口營區', '軍事'] },
    {
      sub: '社會與日常史',
      match: [
        '眷村',
        '鐵道',
        '海洋貿易',
        '淡江',
        '源興牛',
        '森林開發',
        '民主化',
      ],
    },
  ],
  Geography: [
    { sub: '交通與基礎設施', match: ['交通運輸'] },
    { sub: '地標', match: ['台北101', '漯底山'] },
    { sub: '水文與水資源', match: ['河川', '水庫', '水資源', '水文'] },
    { sub: '氣候與溫泉', match: ['氣候', '溫泉'] },
    { sub: '島嶼與海洋', match: ['島嶼地理', '離島', '海洋文化'] },
    { sub: '生態地理', match: ['生態多樣性', '國家風景區'] },
    { sub: '城市與人文地理', match: ['都市', '城鄉', '城市特色', '農業地景'] },
    {
      sub: '地形與地質',
      match: ['地形', '地理結構', '板塊', '地震', '海岸地形'],
    },
  ],
  Culture: [
    {
      sub: '宗教與民俗',
      match: [
        '寺廟',
        '廟會',
        '陣頭',
        '媽祖',
        '關聖帝君',
        '九天玄女',
        '擲筊',
        '新興宗教',
        '大道公',
      ],
    },
    {
      sub: '族群文化',
      match: ['原住民文化', '原住民族16族', '客家文化', '族群', '原住民語言'],
    },
    { sub: '語言與文字', match: ['語言多樣性', '母語', '外來語', '注音'] },
    { sub: '節慶與禮俗', match: ['節慶', '婚喪', '禮俗', '諧音禁忌'] },
    { sub: '網路文化', match: ['VTuber', 'YouTuber', '迷因', '無名小站'] },
    { sub: '工藝與美學', match: ['花布', '製香', '茶道', '茶文化'] },
    { sub: '離島文化', match: ['澎湖'] },
    { sub: '運動文化', match: ['棒球', '巧固球'] },
    { sub: '藝術園區', match: ['文創園區', '文化創意', '街頭藝術', '塗鴉'] },
    { sub: '出版與媒體', match: ['人間雜誌', '漫畫', '動漫'] },
    { sub: '區域特色', match: ['感性'] },
    { sub: '老街與商圈', match: ['老街'] },
    { sub: '庶民文化', match: ['乖乖'] },
  ],
  Food: [
    { sub: '飲食場景', match: ['夜市', '辦桌'] },
    {
      sub: '族群飲食',
      match: ['原住民飲食', '客家飲食', '眷村菜', '新住民美食'],
    },
    { sub: '經典小吃', match: ['小吃', '鹹酥雞', '滷肉飯', '牛肉麵'] },
    {
      sub: '飲品文化',
      match: ['珍珠奶茶', '手搖飲', '咖啡產業', '豆漿', '茶文化'],
    },
    { sub: '主食與米麵', match: ['米食', '麵食'] },
    { sub: '早餐文化', match: ['早餐'] },
    { sub: '食材與調味', match: ['水果', '海鮮', '醬料', '發酵'] },
    { sub: '烘焙與甜點', match: ['麵包', '烘焙', '冰品'] },
    { sub: '精緻餐飲', match: ['米其林', '手路菜'] },
    { sub: '飲食哲學', match: ['素食', '茶文化'] },
  ],
  Art: [
    { sub: '文學', match: ['文學', '現代詩', '散文', '原住民文學'] },
    { sub: '視覺藝術', match: ['水彩', '攝影', '漫畫', '插畫', '雕塑'] },
    { sub: '表演藝術', match: ['劇場', '表演藝術', '傳統藝術'] },
    { sub: '新媒體與數位藝術', match: ['新媒體', '實驗', 'FAB DAO'] },
    { sub: '電影', match: ['電影'] },
    { sub: '建築', match: ['建築'] },
    { sub: '策展與教育', match: ['策展', '藝術教育', '金馬賓館'] },
    { sub: '當代藝術', match: ['當代藝術'] },
  ],
  Music: [
    { sub: '當代原住民音樂', match: ['原住民創作歌手'] },
    {
      sub: '傳統音樂',
      match: ['民謠', '歌謠', '客家音樂', '原住民音樂', '國樂'],
    },
    { sub: '電子與實驗', match: ['電子音樂', '聲音地景', '派對'] },
    { sub: '獨立與搖滾', match: ['獨立音樂', '搖滾', '嘻哈', '饒舌'] },
    { sub: '樂器與製造', match: ['樂器'] },
    {
      sub: '音樂產業',
      match: ['串流', '音樂祭', 'KTV', '影視配樂', '音樂產業'],
    },
    {
      sub: '流行音樂',
      match: ['金曲獎', '台語歌', '民歌運動', '流行音樂', '黃金旋律'],
    },
  ],
  Technology: [
    { sub: '人工智慧', match: ['AI', '人工智慧'] },
    { sub: '半導體與硬體', match: ['半導體'] },
    { sub: '電動車與移動', match: ['電動車'] },
    { sub: '太空與前沿', match: ['太空'] },
    { sub: '醫療體系', match: ['醫療', '災難醫療'] },
    { sub: '數位娛樂', match: ['遊戲', '數位影像', '動畫', '數位娛樂'] },
    { sub: '社群與數位文化', match: ['Threads'] },
    { sub: '新創與創業', match: ['新創'] },
    { sub: '科技園區', match: ['科技園區'] },
    { sub: '開源社群', match: ['g0v', '開源'] },
    { sub: '文字與工具', match: ['輸入法'] },
    { sub: '音響產業', match: ['音響'] },
    {
      sub: '數位與網路',
      match: [
        '5G',
        '資安',
        '軟體',
        '電子商務',
        '數位身分',
        'PTT',
        '數位支付',
        '數位政府',
      ],
    },
  ],
  Nature: [
    { sub: '國家公園與步道', match: ['國家公園', '步道'] },
    {
      sub: '野生動物',
      match: [
        '黑熊',
        '石虎',
        '穿山甲',
        '藍鵲',
        '皇蛾',
        '鯨豚',
        '黑冠麻鷺',
        '窗殺',
        '海洋生態',
      ],
    },
    {
      sub: '生態系統',
      match: ['森林生態', '高山生態', '珊瑚礁', '生態多樣性', '特有種'],
    },
    { sub: '地質與地熱', match: ['溫泉', '地熱'] },
    {
      sub: '保育與環境',
      match: [
        '環境運動',
        '海洋保育',
        '海洋污染',
        '氣候變遷',
        '淨零',
        '原住民生態',
      ],
    },
    { sub: '山岳與登山', match: ['山岳', '登山'] },
    { sub: '原住民生態智慧', match: ['原住民生態', '原住民.*保育'] },
    { sub: '博物學', match: ['博物學'] },
  ],
  People: [
    {
      sub: '政治與民主',
      match: [
        '李登輝',
        '蔡英文',
        '施明德',
        '呂秀蓮',
        '鄭南榕',
        '林義雄',
        '陳水扁',
        '馬英九',
        '賴清德',
        '陳建仁',
        '高俊明',
      ],
    },
    {
      sub: '科技與企業',
      match: [
        '張忠謀',
        '黃仁勳',
        '郭台銘',
        '施振榮',
        '張明正',
        '林百里',
        '童子賢',
        '簡立峰',
        '王永慶',
        '許文龍',
        '葉國一',
        '魏哲家',
        '劉德音',
        '杜奕瑾',
      ],
    },
    { sub: '音樂與表演', match: ['五月天', '周杰倫', '蕭敬騰'] },
    {
      sub: '音樂',
      match: [
        '伍佰',
        '張惠妹',
        '李宗盛',
        '林俊傑',
        '盧廣仲',
        '羅大佑',
        '蔡依林',
        '鄧雨賢',
        '鄧麗君',
        '陳昇',
        '江蕙',
        '林宥嘉',
      ],
    },
    {
      sub: '電影與戲劇',
      match: [
        '侯孝賢',
        '李安',
        '楊德昌',
        '張艾嘉',
        '林青霞',
        '桂綸鎂',
        '蔡明亮',
        '鈕承澤',
        '陳玉勳',
        '魏德聖',
      ],
    },
    {
      sub: '文學',
      match: [
        '白先勇',
        '龍應台',
        '黃春明',
        '席慕蓉',
        '朱天文',
        '李昂',
        '陳映真',
        '鍾理和',
        '吳明益',
        '黃震南',
        '洪醒夫',
        '林良',
      ],
    },
    {
      sub: '藝術與設計',
      match: [
        '幾米',
        '聶永真',
        '方序中',
        '蕭青陽',
        '賴聲川',
        '明華園',
        '朱宗慶',
        '許芳宜',
        '李國修',
        '陳俊良',
        '沈聖博',
      ],
    },
    { sub: '藝術與創作', match: ['林懷民', '李梅樹', '齊柏林'] },
    {
      sub: '體育',
      match: [
        '王建民',
        '戴資穎',
        '郭婞淳',
        '曾雅妮',
        '李智凱',
        '林書豪',
        '林義傑',
        '楊傳廣',
        '楊勇緯',
        '盧彥勳',
        '莊智淵',
        '紀政',
        '許淑淨',
        '謝淑薇',
        '鄭兆村',
        '陳偉殷',
        '郭泓志',
        '陽岱鋼',
        '麟洋配',
      ],
    },
    {
      sub: '科學與學術',
      match: [
        '李遠哲',
        '吳大猷',
        '朱經武',
        '翁啟惠',
        '杜聰明',
        '許倬雲',
        '蔣為文',
      ],
    },
    {
      sub: '教育與社會',
      match: ['唐鳳', '嚴長壽', '葉丙成', '呂冠緯', '陳樹菊', '黃國珍'],
    },
    { sub: '餐飲與職人', match: ['江振誠', '吳寶春'] },
    { sub: '數位與媒體', match: ['Ray', '何飛鵬', '豬哥亮'] },
    { sub: '歷史人物', match: ['朱一貴', '鄭成功', '莫那', '郁永河'] },
    { sub: '社會與公益', match: ['楊右任'] },
    { sub: '新媒體藝術', match: ['吳哲宇'] },
    { sub: '流行文化', match: ['周子瑜', '小虎隊'] },
  ],
  Society: [
    {
      sub: '民主與政治',
      match: ['政治環境', '選舉制度', '太陽花', '野百合', '民主制度'],
    },
    {
      sub: '人權與平等',
      match: ['人權', '性別', '同婚', '平權', '居住正義', '社會住宅'],
    },
    { sub: '人口與世代', match: ['少子化'] },
    {
      sub: '社會運動',
      match: [
        '社會運動',
        '公民參與',
        '環境正義',
        '土地正義',
        '傳統領域',
        '環保',
        '永續',
      ],
    },
    { sub: '國際關係', match: ['邦交', '國際外交', '國際標示', '標示問題'] },
    { sub: '媒體與言論', match: ['媒體', '新聞自由'] },
    { sub: '社會福利', match: ['長期照顧', '長照'] },
    {
      sub: '社區與日常',
      match: ['社區', '里文化', '早餐店阿姨', '自助餐', '志工文化', '志工'],
    },
    { sub: '社會韌性', match: ['災難志工', '志工文化'] },
    { sub: '動物與倫理', match: ['流浪動物', '動物園', '展演動物'] },
    { sub: '無障礙與共融', match: ['全齡', '共融'] },
    { sub: '教育', match: ['教育制度', '升學'] },
  ],
  Economy: [
    { sub: '企業列傳', match: ['台灣企業'] },
    { sub: '經濟發展', match: ['經濟奇蹟', '產業轉型', '經濟發展'] },
    { sub: '貿易與全球化', match: ['外貿', '國際貿易', '供應鏈'] },
    { sub: '農業經濟', match: ['農業', '農村'] },
    { sub: '金融與科技', match: ['金融科技'] },
    { sub: '能源與永續', match: ['能源轉型', '綠能', '循環經濟'] },
    { sub: '新創經濟', match: ['新創'] },
    { sub: '文化產業', match: ['動畫代工'] },
    { sub: '庶民經濟', match: ['夜市經濟'] },
  ],
  Lifestyle: [
    { sub: '醫療與健保', match: ['健保', '醫療'] },
    { sub: '交通與移動', match: ['交通', '捷運', '機車'] },
    { sub: '城市生活', match: ['便利商店', '垃圾車', '騎樓', '小綠人'] },
    { sub: '飲食生活', match: ['咖啡文化', '市場文化', '傳統市場'] },
    { sub: '休閒與娛樂', match: ['公園', '夜生活', 'KTV', '溫泉文化'] },
    { sub: '教育', match: ['教育制度'] },
    { sub: '環保與回收', match: ['回收', '資源循環'] },
    { sub: '信仰與心靈', match: ['宗教', '民間信仰'] },
  ],
};

let updated = 0;
let skipped = 0;
let noMatch = 0;

for (const [category, rules] of Object.entries(mapping)) {
  const catDir = path.join(knowledgeDir, category);
  if (!fs.existsSync(catDir)) continue;

  const files = fs
    .readdirSync(catDir)
    .filter((f) => f.endsWith('.md') && !f.startsWith('_'));

  for (const file of files) {
    const filePath = path.join(catDir, file);
    let content = fs.readFileSync(filePath, 'utf-8');

    // Check if already has subcategory
    if (/^subcategory:\s*.+/m.test(content)) {
      skipped++;
      continue;
    }

    // Find matching subcategory
    const title = file.replace(/\.md$/, '');
    let matched = null;

    for (const rule of rules) {
      for (const kw of rule.match) {
        if (title.includes(kw) || content.slice(0, 500).includes(kw)) {
          matched = rule.sub;
          break;
        }
      }
      if (matched) break;
    }

    if (!matched) {
      console.log(`⚠️  NO MATCH: ${category}/${file}`);
      noMatch++;
      continue;
    }

    // Insert subcategory after tags line (or after date if no tags)
    const insertAfter = /^tags:\s*\[.*\]$/m;
    const insertAfterDate = /^date:\s*.+$/m;

    if (insertAfter.test(content)) {
      content = content.replace(insertAfter, `$&\nsubcategory: '${matched}'`);
    } else if (insertAfterDate.test(content)) {
      content = content.replace(
        insertAfterDate,
        `$&\nsubcategory: '${matched}'`,
      );
    } else {
      console.log(`⚠️  NO INSERT POINT: ${category}/${file}`);
      noMatch++;
      continue;
    }

    if (dryRun) {
      console.log(`✅ [DRY] ${category}/${file} → ${matched}`);
    } else {
      fs.writeFileSync(filePath, content, 'utf-8');
      console.log(`✅ ${category}/${file} → ${matched}`);
    }
    updated++;
  }
}

console.log(`\n--- Summary ---`);
console.log(`Updated: ${updated}`);
console.log(`Already had subcategory: ${skipped}`);
console.log(`No match: ${noMatch}`);
console.log(`Total: ${updated + skipped + noMatch}`);
