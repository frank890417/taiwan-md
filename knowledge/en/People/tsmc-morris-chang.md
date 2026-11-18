---
title: 'Morris Chang (Zhang Zhongmou)'
description: 'Semiconductor patriarch, founder of TSMC, legendary entrepreneur who changed the global tech industry with the wafer foundry model'
date: 2026-03-17
category: 'People'
tags:
  [
    'People',
    'Morris Chang',
    'TSMC',
    'Semiconductors',
    'Entrepreneur',
    'Wafer Foundry',
    'National Guardian Mountain',
  ]
subcategory: '科技與企業'
author: 'Taiwan.md Contributors'
featured: true
lastVerified: 2026-09-18
lastHumanReview: false
lifeTree:
  protagonist: '張忠謀（Morris Chang）'
  birthYear: 1931
  span: '1931–'
  source:
    article: 'knowledge/People/張忠謀.md'
    commit: '2acf410b'
    commitDate: '2026-03-17'
    extractedBy: 'Taiwan.md (Semiont) β-r5'
    extractedAt: '2026-04-26 13:30 +0800'
    note: '原文無 footnote，source 推測基於 §參考資料區（自傳 / TSMC 年報 / 維基 / 工研院 / 清大）+ 公開歷史紀錄。少數心理動機 alternative 標 [推測]。'
  intro: '一個 17 歲流亡到香港、18 歲進哈佛、19 歲轉 MIT 工程的中國銀行家之子，54 歲離開美國副總職位回台灣創立台積電。這棵樹列出他每次跨界（地理、技能、商業模式、世代）選的路，也列出他沒選的——從哈佛文學的延續到留美安全路徑到 IDM 模式的延續。'
  themes:
    - id: 'homeland'
      label: '海外 vs 故土'
      color: '#10B981'
    - id: 'expert-leader'
      label: '工程師 vs 管理者'
      color: '#8B5CF6'
    - id: 'business-model'
      label: '自製 vs 代工'
      color: '#F59E0B'
    - id: 'succession'
      label: '在位 vs 傳承'
      color: '#EC4899'
  nodes:
    - id: 'birth'
      year: 1931
      age: 0
      type: 'given'
      theme: 'homeland'
      label: '出生於浙江寧波'
      scene: '父親張蔚觀是銀行家，母親徐君偉出身書香門第。動盪年代的書香家庭。'
    - id: 'hong-kong'
      year: 1948
      age: 17
      type: 'choice'
      theme: 'homeland'
      scene: '童年在寧波 → 南京 → 廣州 → 香港 → 重慶 → 上海 → 香港之間遷徙。1948 年國共內戰，17 歲隨家人再度遷往香港'
      chose:
        label: '從香港赴美求學'
        consequence: '中學讀的是重慶南開與上海南洋模範；1949 年從香港赴美進哈佛。少年時代一路遷徙，讓他對「邊緣身份在大國體制內運作」有早期感覺。'
      alternatives:
        - label: '留在中國大陸'
          plausibility: 'structural'
          note: '同代多數家庭沒能跟著遷移到香港。1949 後留在中國的銀行家後代命運與張忠謀完全分流，不會出現在矽谷。'
        - label: '直接赴美'
          plausibility: 'structural'
          note: '少數富裕家庭 1940 年代末就直接送孩子赴美。沒有香港四年，英文與國際化基礎會更弱，哈佛申請會更難。'
    - id: 'harvard-mit'
      year: 1950
      age: 19
      type: 'choice'
      theme: 'expert-leader'
      scene: '1949 年進哈佛念文學。一年後因對文學缺乏熱情、加上經濟考量'
      chose:
        label: '轉學 MIT 機械工程'
        consequence: 'MIT 嚴謹工程教育培養邏輯思維與解決問題能力。1952 拿機械工程學士。這個轉軌是「藝術 → 技術」的關鍵 fork。'
      alternatives:
        - label: '留在哈佛念文學'
          plausibility: 'speculative'
          note: '[推測] 如果留下，可能走學術或文學路徑。完全不會出現半導體事業。但「為什麼一個對文學有興趣的人能在 MIT 工程系成功」這個張力，後來變成他能用人文視角看技術產業的原因。'
        - label: '轉去念商學'
          plausibility: 'structural'
          note: '同代華人留學生有人選哈佛商學院。但少了 engineering hands-on，後來 TI 的技術職位無法擔任，也無法理解半導體製程的精密性。'
    - id: 'korea-war-civilian'
      year: 1952
      age: 21
      type: 'event'
      theme: 'homeland'
      label: 'MIT 畢業遇韓戰，外國學生身份無法進美國軍方相關工作'
      scene: '畢業時正值韓戰期間，國防工業對外籍生關閉。'
    - id: 'sylvania'
      year: 1955
      age: 24
      type: 'choice'
      theme: 'expert-leader'
      scene: '畢業三年後找工作機會'
      chose:
        label: '進希凡尼亞做半導體三年'
        consequence: '首次接觸半導體行業。當時這個產業還在起步階段，但他敏銳察覺巨大潛力。學到半導體製程基礎，也培養對技術細節的關注。'
      alternatives:
        - label: '進其他成熟產業'
          plausibility: 'structural'
          note: '1950 年代的主流選擇是汽車、機械、化工。如果選成熟產業，不會在半導體萌芽期就累積經驗，後來 TI 的機會不會降臨。'
    - id: 'ti-1958'
      year: 1958
      age: 27
      type: 'choice'
      theme: 'expert-leader'
      scene: '德州儀器（TI）正積極發展半導體業務'
      chose:
        label: '加入 TI 從半導體工程師做起'
        consequence: '改善公司製程、提高良率、節省成本。25 年從工程師升到副總，是 TI 改變他一生的舞台。'
      alternatives:
        - label: '留在希凡尼亞'
          plausibility: 'structural'
          note: '希凡尼亞後來逐漸退出半導體領域。如果留下，事業天花板會非常明顯。'
        - label: '創業'
          plausibility: 'structural'
          note: '同期有人選擇離開大公司創業（如 Intel 創辦人 Noyce / Moore 1968 年離開 Fairchild）。但張忠謀走「大公司內部成長」路徑長達 25 年，這個耐性後來反而成為台積電「打長期仗」文化的根。'
    - id: 'stanford-phd'
      year: 1961
      age: 30
      type: 'choice'
      theme: 'expert-leader'
      scene: 'TI 支持他前往史丹佛攻讀電機工程博士'
      chose:
        label: '念博士'
        consequence: '1964 年拿史丹佛 EE PhD。回 TI 後升上重要管理職（鍺、矽電晶體、IC 部門總經理）。技術 + 管理雙軌。'
      alternatives:
        - label: '只當工程師不念博士'
          plausibility: 'structural'
          note: '同代很多工程師不念博士，職涯天花板大致是 senior engineer / staff engineer。對於走技術管理線、後來坐到副總，PhD 是隱形必需品。'
    - id: 'vp-1972'
      year: 1972
      age: 41
      type: 'choice'
      theme: 'expert-leader'
      scene: '在 TI 從工程師一路升上去 14 年後'
      chose:
        label: '升任德儀集團副總經理 + 半導體集團總經理'
        consequence: '當時美國大型企業中最高階的華人高管之一。突破種族天花板。負責 TI 最重要的業務部門。'
      alternatives:
        - label: '跳槽到競爭對手'
          plausibility: 'structural'
          note: '70 年代 Intel / AMD / Motorola 都在搶半導體高管。如果跳槽，可能拿到 CEO 級職位但失去 TI 累積的政治資本與人脈。'
    - id: 'itri-call'
      year: 1985
      age: 54
      type: 'choice'
      theme: 'homeland'
      scene: '工研院董事長徐賢修、行政院長俞國華、政委李國鼎力邀'
      chose:
        label: '回台灣擔任工研院院長'
        consequence: '54 歲，在美國有成功事業與優渥生活。回台是充滿風險的決定。但這是台積電誕生的前提——沒有工研院院長身份，沒有後來的政府支持與股權結構。'
      alternatives:
        - label: '留在美國'
          plausibility: 'structural'
          note: '同代華人高管多數選擇留美直到退休。如果留下，職涯穩定但不會有台積電。台灣半導體產業發展軌跡會完全不同。'
        - label: '回中國大陸'
          plausibility: 'structural'
          note: '1985 年中國改革開放第七年，亦曾邀請海外華人技術領袖。如果選大陸，會被綁進國家半導體計畫（如後來的中芯），路徑與商業模式自由度都不同。'
    - id: 'tsmc-foundry'
      year: 1987
      age: 56
      type: 'choice'
      theme: 'business-model'
      scene: '工研院院長期間，思考一個革命性商業模式'
      chose:
        label: '創立台積電 + 提出「專業晶圓代工」純代工模式'
        consequence: '1987/2/21 成立，總投資約 1.45 億美元。打破當時 IDM（整合元件製造商）主流模式。客戶不必投入巨資建廠就能設計晶片。後來重塑全球半導體產業生態，催生 fabless 產業。'
      alternatives:
        - label: '走傳統 IDM 模式（自己設計+製造）'
          plausibility: 'structural'
          note: '當時主流模式（Intel、TI、Motorola 都是 IDM）。如果選 IDM，台積電會跟韓國三星、日本 NEC 同象限競爭，多半會輸。代工模式才是繞過西方 IDM 主場的關鍵。'
        - label: '只做設計不做製造'
          plausibility: 'structural'
          note: '另一個方向：台版 fabless（如後來的聯發科）。但 1987 年台灣設計能力遠不及製造潛力，這條路會起步太晚。'
        - label: '不創公司，留在工研院做政策'
          plausibility: 'structural'
          note: '部分海外回國技術領袖選擇純政策角色。如果如此，台積電不會出現，台灣半導體會多十年才追上韓國。'
    - id: 'retire-2005'
      year: 2005
      age: 74
      type: 'choice'
      theme: 'succession'
      scene: '台積電已是全球代工龍頭'
      chose:
        label: '第一次退休 / 執行長交給蔡力行 / 自己保留董事長'
        consequence: '精心準備的接班計畫。為企業永續發展鋪路。但留住董事長職位讓他保有戰略決策權。'
      alternatives:
        - label: '完全退出'
          plausibility: 'structural'
          note: '完全退休是「乾淨退出」典範（如 Bill Gates 2008 退出微軟日常）。但 2008 金融危機如果張忠謀完全離場，台積電可能找不到回神能力。保留董事長是後來能復出的關鍵。'
    - id: 'comeback-2009'
      year: 2009
      age: 78
      type: 'choice'
      theme: 'succession'
      scene: '2008 全球金融危機重創台積電。業績下滑、競爭加劇'
      chose:
        label: '78 歲復出重新擔任執行長'
        consequence: '穩定市場信心、領導公司度過困難。順便培養劉德音與魏哲家。「老將回鍋救火」的經典案例。'
      alternatives:
        - label: '不復出讓蔡力行硬撐'
          plausibility: 'structural'
          note: '尊重既定接班計畫的另一條路。但金融危機 + 接班人威信不足的雙重壓力，台積電可能失去 28nm 製程的關鍵機會窗。'
    - id: 'retire-2018'
      year: 2018
      age: 87
      type: 'choice'
      theme: 'succession'
      scene: '台積電在他第二輪 9 年領導後達到製程全球領先'
      chose:
        label: '正式退休 + 建立雙首長制（劉德音董事長 / 魏哲家 CEO）'
        consequence: '功成身退典範。雙首長制平衡對外與對內。31 年傳奇生涯結束。被視為企業接班的教科書案例。'
      alternatives:
        - label: '單一接班人'
          plausibility: 'structural'
          note: '美國企業傳統路徑（Apple Cook / Microsoft Nadella 都是單一接班）。但台積電規模 + 兩位接班人都很強，雙首長制避免「兩虎相爭」也讓彼此互補。'
        - label: '繼續任 90 歲'
          plausibility: 'structural'
          note: 'Berkshire Hathaway 巴菲特模式。但張忠謀選擇主動退場，避免「老人政治」的風險，這個自我克制本身是傳承品質的一部分。'
curation: 'incubating'
curationReason: 'unverified'
translatedFrom: 'People/張忠謀.md'
sourceCommitSha: 'b1a5fea00'
sourceContentHash: 'sha256:a6a3cf2441fdbe3c'
sourceBodyHash: 'sha256:0b0d1fd6c8d63d0e'
translatedAt: '2026-11-18T15:48:45.771210+00:00'
---

# Morris Chang (Zhang Zhongmou)

Morris Chang, hailed as the legendary "semiconductor patriarch," is the founder of Taiwan Semiconductor Manufacturing Company (TSMC). He created the world's first dedicated wafer foundry company, pioneering a business model that reshaped the global tech industry ecosystem. From a Chinese-American executive at Texas Instruments to returning to Taiwan to found TSMC, his life trajectory witnessed the development of the global semiconductor industry and established Taiwan's key position in the global tech supply chain.

## 30-Second Overview

**Why the world should know Morris Chang?**

The TSMC founded by Morris Chang is the highest-valued wafer foundry company in the world and a crucial cornerstone of modern digital civilization. From smartphones and computers to AI chips, the vast majority of advanced semiconductors worldwide are manufactured by TSMC. He pioneered the "pure foundry" business model, allowing countless tech companies to focus on chip design without investing massive amounts of capital in building wafer fabs, fundamentally reshaping the global tech industry ecosystem.

TSMC is hailed as Taiwan's "National Guardian Mountain," holding an irreplaceable strategic position in geopolitics. Morris Chang is one of the few people in the 20th century who truly changed the industry structure—he redefined the business boundaries of the semiconductor industry, enabling Taiwan to start from foundry services and become a core node in the global tech supply chain.

Born in 1931 in Ningbo, Zhejiang Province, China, and founded TSMC in Taiwan in 1987: Morris Chang's life itself is a microcosm of Asia's rise in technology in the 20th century.

## Early Life and Education

### Growing Up in Turbulent Times

**Birth and Family Background:**
On July 10, 1931, Morris Chang was born in Ningbo City, Zhejiang Province, China[^1]. His father, Zhang Weiguan, was a banker, and his mother, Xu Junwei, came from a scholarly family. In those turbulent times, his father Zhang Weiguan was well-versed in literature and history, and the family had a rich collection of books, giving him a humanistic vision throughout his engineering journey.

**Childhood Migration Experience:**
Due to the war, Morris Chang's childhood was filled with migrations. From Ningbo to Shanghai, Nanjing, Chongqing, Shanghai again, then to Guangzhou, Hong Kong, and finally to the United States, this journey of hardship cultivated his adaptability and international perspective.

**Schooling in Hong Kong:**
In 1945, after the victory of the War of Resistance, his family moved to Shanghai, where he entered Nanyang Model Middle School; in 1948, during the Chinese Civil War, 17-year-old Morris Chang moved with his family to Hong Kong[^1]. The following year, he left Hong Kong for the United States to study.

### Key Turning Point in American Studies

**Harvard University Experience:**
In 1949, 18-year-old Morris Chang entered Harvard University[^2], initially studying literature. However, after a year, due to a lack of passion for literature and economic considerations, he transferred to the Massachusetts Institute of Technology (MIT).

**Engineering Education at MIT:**
At MIT, Morris Chang chose mechanical engineering as his major. This choice seemed coincidental but gave him first-hand engineering intuition in the core of semiconductor manufacturing (precision mechanical processes), which became an important foundation for later leading TSMC's process improvements.

**Bachelor's Degree in 1952:**
Morris Chang received his Bachelor's degree in Mechanical Engineering from MIT in 1952[^3]. At the time of graduation, the Korean War was ongoing, and due to his status as a foreign student, he could not obtain relevant jobs with the U.S. military, which ironically led him to the civilian industry.

## Career Start: Sylvania Company

### First Entry into the Semiconductor Industry

**Opportunity in 1955:**
After graduation, Morris Chang worked at Sylvania for about three years[^4], which was his first contact with the semiconductor industry. At that time, the semiconductor industry was still in its early stages, but Morris Chang keenly sensed the enormous potential of this emerging industry.

**Technical Skills Development:**
At Sylvania, Morris Chang was responsible for semiconductor device manufacturing, learning the basic knowledge of semiconductor processes. This experience helped him understand the complexity and precision of semiconductor manufacturing and cultivated his attention to technical details.

**Initial Display of Management Talent:**
Even in grassroots technical positions, Morris Chang showed excellent management capabilities. He was good at organizing teams and solving technical problems. This three-year experience made him realize the precision requirements of semiconductor manufacturing.

## Texas Instruments Period: Display of Management Talent

### Important Turning Point in 1958

**Joining Texas Instruments:**
In 1958, Morris Chang joined Texas Instruments (TI)[^5], which was a key turning point in his career. At that time, Texas Instruments was expanding its semiconductor business and needed talents who could bridge engineering and management.

**From Engineer to Manager:**
At Texas Instruments, Morris Chang started as a semiconductor engineer, responsible for wafer production. He performed excellently in technology and showed outstanding management talent, quickly gaining the attention of superiors.

**Contributions to Process Improvement:**
During his time at Texas Instruments, Morris Chang greatly improved the company's semiconductor processes, increasing product yield and production efficiency. These technical improvements saved the company a lot of costs and won him a reputation.

### Advanced Studies at Stanford University

**Learning Opportunity in 1961:**
In 1961, Texas Instruments supported Morris Chang to study at Stanford University for a doctoral degree in electrical engineering. This was the company's recognition of his abilities and also showed American companies' emphasis on talent cultivation.

**Harvest of Doctoral Degree:**
In 1964, Morris Chang received his doctoral degree in electrical engineering from Stanford University.[^6] This study period enhanced his theoretical depth and industry connections, and upon returning to TI, he was immediately promoted.

**New Role Upon Return:**
After obtaining his doctorate, Morris Chang returned to Texas Instruments and took on higher-level management positions. He successively served as general manager of the germanium department, silicon department, and integrated circuit department, and his status at TI rose year by year with performance.

### Breaking Through the Glass Ceiling

**Historic Promotion in 1972:**
In 1972, Morris Chang was promoted to deputy general manager of Texas Instruments Group[^7], becoming one of the highest-ranking Chinese-American executives in American large companies at that time. This promotion was a rare achievement in the American business environment at that time.

**General Manager of Semiconductor Group:**
Morris Chang also served as general manager of Texas Instruments' semiconductor group, responsible for the company's core business departments. Under his leadership, Texas Instruments' semiconductor business developed rapidly and became a major global semiconductor supplier.

**Summary of 25 Years in America:**
In 25 years at Texas Instruments, Morris Chang rose from a grassroots engineer to a senior executive, deeply understanding the technical rhythms and business logic of the semiconductor industry. This experience made his market judgment far more accurate than any purely academic background person when he returned to Taiwan to start a business in 1987.

## Call of Taiwan: Director of Industrial Technology Research Institute

### Life Turning Point in 1985

**Invitation from Sun Yun-suan:**
In 1985, Morris Chang was invited by former Premier Sun Yun-suan[^8], Industrial Technology Research Institute Chairman Xu Xiansheng, Premier Yu Guohua, and Political Affairs Commissioner Li Guoding to serve as director of the Industrial Technology Research Institute. Sun Yun-suan had long been promoting the development of high-tech industries in Taiwan and was an important force in inviting Morris Chang back to Taiwan. This decision changed his life trajectory and also changed the fate of Taiwan's tech industry.

**Courage to Leave the Comfort Zone:**
At that time, 54-year-old Morris Chang had already achieved business success and a comfortable life in the United States. Choosing to return to Taiwan was a decision full of risks and challenges, demonstrating his sense of mission for Taiwan's tech development.

**Reform of the Industrial Technology Research Institute:**
During his tenure as director of the Industrial Technology Research Institute, Morris Chang promoted the close integration of research and industry, using American management thinking to reorganize the institute's research direction. His international perspective turned the Industrial Technology Research Institute from a government research institution into a more commercially conscious technology incubator.

### Assessment of Taiwan's Semiconductor Industry

**Analysis of Industrial Environment:**
Morris Chang carefully assessed Taiwan's industrial environment and advantages. He believed that Taiwan had excellent engineer talent, relatively low costs, and flexible manufacturing capabilities, all of which were suitable for developing the semiconductor manufacturing industry.

**Concept of Foundry Model:**
During his time at the Industrial Technology Research Institute, Morris Chang began to think about a revolutionary business model—dedicated wafer foundry. This concept came from his deep insight into industry trends and was also the culmination of his years of industry experience.

**Importance of Government Support:**
Morris Chang realized that developing the semiconductor industry required full government support, including funding investment, policy coordination, and talent cultivation. He communicated closely with government officials and fought for the special structure of Industrial Technology Research Institute technical authorization and government equity investment for the establishment of TSMC.

## Birth of TSMC: Innovation in 1987

### Innovation of Professional Foundry Model

**Breakthrough of Foundry Concept:**
In 1987, Morris Chang proposed the innovative concept of "dedicated wafer foundry"[^11]. Unlike the traditional integrated device manufacturer (IDM) model, TSMC focused on providing wafer foundry services to customers without designing its own products.

**Revolutionary Business Model:**
The revolutionary nature of this model was that it allowed many companies without the ability to build wafer fabs to design advanced chips, greatly lowering the threshold for entering the semiconductor industry and enabling chip design companies to grow exponentially from the 1990s to the 2020s.

**Impact on Industrial Ecosystem:**
The professional foundry model created a brand-new industrial ecosystem, allowing design companies to focus on innovation, foundry companies to focus on manufacturing, achieving professional division of labor, and improving the overall efficiency of the industry.

### Process of TSMC Establishment

**Historic Moment on February 21, 1987:**
On February 21, 1987, Taiwan Semiconductor Manufacturing Company was officially established with a total investment of approximately $14.5 million: government investment of $70 million accounting for 48.3%, Dutch Philips $40 million accounting for 27.5%, and private sectors $35 million accounting for 24.2%[^9]. This was the result of cooperation between the government, private enterprises, and foreign investors.

**Design of Equity Structure:**
TSMC's equity structure included the Industrial Technology Research Institute, Dutch Philips Company, and Taiwan's private enterprises[^10]. This diversified equity structure brought technology, funds, and market resources to TSMC.

**Dual Identity of Morris Chang:**
Morris Chang served as chairman and general manager (later changed to CEO) of TSMC, responsible for the company's overall strategy and daily operations. His leadership style combined the efficiency of American management with the wisdom of Chinese culture.

## Development History of TSMC

### Early Challenges and Breakthroughs

**1987-1990: Startup Difficulties:**
In the early days of TSMC's establishment, it faced huge challenges. Professional foundry was a brand-new business model, and the market was skeptical, requiring time for customers to accept this concept. Morris Chang had to simultaneously build manufacturing capabilities and convince customers.

**Establishment of Technical Capabilities:**
TSMC's early technology came from the transfer of Industrial Technology Research Institute and cooperation with Philips. Under Morris Chang's leadership, the team quickly learned and improved process technology, establishing reliable manufacturing capabilities.

**Development of First Customers:**
TSMC's first customers were mainly American fabless semiconductor companies. These companies just needed professional foundry services, providing an early business foundation for TSMC.

### Rapid Development in the 1990s

**Technology Leadership Strategy:**
In the 1990s, Morris Chang formulated a "technology leadership" strategy, investing heavily in R&D to ensure that TSMC would not lag behind competitors in each process generation. TSMC successively built multiple wafer fabs in Taiwan, and its customer base expanded from early American fabless companies to global major design companies such as Qualcomm, Broadcom, and NVIDIA.

### Leadership Position in the 21st Century

**Competition in Advanced Processes:**
Entering the 21st century, semiconductor process technology became increasingly difficult and expensive. Relying on R&D investment higher than the industry average every year, TSMC maintained its leadership in advanced processes.

**Breakthrough from 28nm to 5nm:**
From 28nm to 16nm, 7nm, then to 5nm and 3nm, TSMC maintained technological leadership in each generation of advanced processes, consolidating its position in the high-end market.

**Milestone of Cooperation with Apple:**
Starting from the A-series chips in 2013, TSMC provided foundry services for the core processors of iPhone and iPad, bringing huge order volumes and enabling TSMC's advanced process capabilities to be verified by the most stringent commercial standards.[^12]

## Business Philosophy and Management Philosophy

### Persistence in Technological Innovation

**Emphasis on R&D Investment:**
Morris Chang always emphasized the importance of technological innovation, with TSMC investing about 8% of its revenue in R&D every year to ensure that it would not fall behind competitors in technology.[^13] In the era when Moore's Law faced physical limits, during his tenure, TSMC completed 7nm mass production, and 5nm (2020) and 3nm (2022) were the achievements of the successor team after his retirement; the advanced processes pushed down generation by generation provided manufacturing capabilities for the development of the entire semiconductor industry.

**Balance Between Technology and Market:**
Morris Chang was good at finding a balance point between technological leadership and market demand, both maintaining technological advantages and ensuring the commercial value of technology, avoiding excessive advancement leading to high costs.

### Talent Cultivation and Corporate Culture

**Corporate Culture of Integrity:**
Morris Chang established a corporate culture centered on integrity at TSMC. He emphasized the core values of "integrity, commitment, innovation, and customer trust," which became the cultural foundation of TSMC.

**Emphasis on Talent Development:**
Morris Chang attached great importance to talent cultivation and established a systematic engineer training and promotion system at TSMC. He believed that talent is the core competitiveness of enterprises. While TSMC's employee turnover rate was far lower than the industry average, it also cultivated Liu Deyin and Wei Zhejia, who later led TSMC.

**Internationalized Management Style:**
Morris Chang introduced the efficiency and transparency of American management to TSMC, establishing a modern corporate governance structure. He also incorporated the wisdom of Chinese culture, creating a unique corporate culture.

### Strategic Thinking and Execution

**Long-term Strategy Formulation:**
Morris Chang had outstanding strategic thinking, able to perceive industry trends and forecast future development directions. TSMC's "technology leadership" strategy was a reflection of his strategic vision.

**Emphasis on Execution:**
In addition to strategic planning, Morris Chang also attached great importance to execution. He established a precise management system that allowed technological blueprints to go from decision-making to wafer factory landing, which was the key reason why TSMC could keep up with the pace of each process generation.

**Wisdom in Crisis Response:**
When facing various crises and challenges, Morris Chang showed excellent leadership and crisis response wisdom, leading TSMC through many difficult periods and maintaining the company's stable development.

## Retirement and Succession

### First Retirement in 2005

**Initiation of Succession Plan:**
In 2005, 74-year-old Morris Chang announced his retirement and handed over the CEO position to Cai Lixing[^14]. This was part of his carefully prepared succession plan, reflecting his sense of responsibility for the company's sustainable development.

**Retention of Chairman Position:**
Although he stepped down as CEO, Morris Chang still retained the chairman position and continued to participate in the company's major strategic decisions, providing guidance and support for the successor team.

**Arrangement of Retirement Life:**
After retirement, Morris Chang did not completely leave business activities. He attended international forums such as APEC as a representative of Taiwan and shared his views on geopolitics and the future of semiconductors at many speeches.

### Return in 2009

**Challenges of Financial Crisis:**
The 2008 global financial crisis had a significant impact on TSMC, with the company facing the dual challenges of declining performance and intensified competition. At this critical moment, Morris Chang decided to return.

**Reappointment as CEO:**
In 2009, 78-year-old Morris Chang returned to serve as CEO of TSMC[^15], personally leading the company through a difficult period. His return stabilized market confidence and provided leadership for the company's recovery.

**Cultivation of Liu Deyin and Wei Zhejia:**
During his second term, Morris Chang focused on cultivating successor candidates such as Liu Deyin and Wei Zhejia, preparing talent for the company's future development.

### Formal Retirement in 2018

**Completion of Succession Plan:**
In June 2018, 87-year-old Morris Chang officially retired, ending his legendary 31-year tenure at TSMC[^16]. He passed the chairman position to Liu Deyin and the CEO position to Wei Zhejia.

**Establishment of Dual Leadership System:**
Morris Chang established a "dual leadership system," with Liu Deyin serving as chairman responsible for external affairs and Wei Zhejia serving as CEO responsible for internal affairs, which was conducive to the company's stable development.

**Model of Retirement:**
Morris Chang's retirement was seen as a model for corporate succession, retiring at the right time to give the new generation of leaders sufficient space to play, while also ensuring a stable transition for the company.

## Impact on Global Semiconductor Industry

### Innovation of Business Model

**Popularization of Professional Foundry Model:**
The professional foundry model created by Morris Chang has become one of the standard business models in the semiconductor industry. Hundreds of fabless semiconductor companies worldwide rely on foundry services, and this model has greatly promoted the development of the industry.

**Reconstruction of Industrial Ecosystem:**
The professional foundry model reconstructed the ecosystem of the semiconductor industry, promoting professional division of labor, improving industrial efficiency, and lowering the threshold for innovation, allowing more companies to participate in chip design.

**Establishment of Global Supply Chain:**
TSMC became a key node in the global semiconductor supply chain, providing manufacturing services to tech companies around the world and establishing a truly globalized semiconductor industry supply chain.

### Promotion of Technological Progress

**Leading Process Technology:**
Under Morris Chang's leadership, TSMC maintained global leadership in process technology, driving the technological progress of the entire semiconductor industry and extending the life of Moore's Law.

**Democratization of Advanced Processes:**
TSMC's advanced process services allowed smaller design companies to use the latest technology, realizing the "democratization" of advanced processes—a fabless startup with only a few dozen people could have TSMC mass-produce 7nm chips.

**Exploration of New Technology Fields:**
TSMC's manufacturing capabilities cover digital chips, AI accelerators, automotive semiconductors, and other application fields, providing manufacturing foundations for various emerging technologies.

## Significance to Taiwan: Founder of the Technology Island

### Development of Tech Industry

**Establishment of National Guardian Mountain:**
TSMC is hailed as Taiwan's "National Guardian Mountain," not only because of its huge economic value but also because of its key position in the global tech supply chain. Morris Chang established this most irreplaceable strategic asset for Taiwan beyond national defense.

**Cultivation of Tech Talent:**
The development of TSMC cultivated a large number of semiconductor professionals, who not only supported the development of TSMC but also provided a talent foundation for Taiwan's entire tech industry.

**Formation of Industrial Cluster:**
Taking TSMC as the center, Taiwan formed a semiconductor industry cluster covering equipment suppliers, material suppliers, and packaging testing factories, creating huge industrial value.

### Contribution to Economic Development

**Important Contribution to GDP:**
TSMC has become Taiwan's largest company and makes a very important contribution to Taiwan's GDP. The company's success also drove the development of related industries and created a large number of jobs.

**Pillar of Export Trade:**
Semiconductors account for about one-third of Taiwan's total exports, and TSMC's success greatly enhanced Taiwan's position in global trade and enhanced Taiwan's economic competitiveness.[^17]

**Improvement of Investment Environment:**
TSMC's success case attracted more international investment, improved Taiwan's investment environment, and enhanced Taiwan's position in the hearts of global investors.

### Geopolitical Influence

**Importance of Tech Sovereignty:**
In the current geopolitical environment, semiconductor technology has become a core asset for major powers to compete for. TSMC mastering the world's most advanced processes gives Taiwan an irreplaceable strategic position in international society.

**Strategic Asset in International Relations:**
TSMC's key position in the global tech supply chain gives Taiwan a voice in semiconductor issues that major powers must pay attention to. The United States, the European Union, and Japan successively offered subsidies to invite TSMC to build factories, proving the real value of this position.

**Security Strategy Considerations:**
The attention of various countries to semiconductor technology also brought new security challenges and opportunities to Taiwan. How to balance the interests of all parties, maintain TSMC's competitive advantage, is one of the core issues of Taiwan's diplomatic and security policies.

## Personal Characteristics and Leadership Style

### Combination of Vision and Execution

**Excellent Strategic Vision:**
Morris Chang's biggest characteristic is his excellent strategic vision. He can perceive industry trends and foresee future development directions, and this vision is a key factor in TSMC's success.

**Practical Execution Ability:**
In addition to vision, Morris Chang also had excellent execution ability. He could turn strategic concepts into concrete action plans and track every detail of execution, which is a rare combination of strategic thinking and execution in the business world.

**Attitude of Lifelong Learning:**
Even in old age, Morris Chang still maintained the habit of reading widely and paying attention to industry development. He maintained the habit of reading two English books per month, and The New Yorker had never stopped for seventy years; he himself said those books "are not literature." This attitude kept his thinking sharp in his later years.

### Characteristics of Leadership Style

**Charismatic Leadership:**
Morris Chang had strong personal charisma and persuasion, able to inspire the team to strive for common goals. His speeches and articles always managed to clearly express complex concepts, earning respect from employees and industry insiders.

**Insistence on Rational Decision-Making:**
When facing major decisions, Morris Chang always insisted on rational analysis, making judgments based on facts and data, avoiding emotional or political considerations affecting the correctness of decisions.

**Practice of Long-term Thinking:**
Morris Chang always insisted on long-term thinking, not being affected by short-term difficulties or interests. Even at the deepest point of the 2008 financial crisis, he still approved the R&D budget for advanced processes, and this long-term perspective allowed TSMC to pull ahead of competitors after the crisis.

## Honors and Recognition

### International Awards and Recognition

**IEEE Honorary Medal:**
Morris Chang received multiple honorary medals from the Institute of Electrical and Electronics Engineers (IEEE), which is an important recognition of his contributions to semiconductor technology development.

**Honorary Doctorates from Various Countries:**
Including Tsing Hua University, National Chiao Tung University, National Taiwan University, and other universities awarded Morris Chang honorary doctoral degrees, commending his contributions to the tech industry and education.

**Selection by International Business Magazines:**
Morris Chang was repeatedly selected by international business magazines such as Fortune and Business Week as one of the top tech industry leaders of the times, establishing his status in the global business community.

### Recognition in Taiwan

**Government Awards:**
The Taiwan government awarded Morris Chang multiple important medals, commending his outstanding contributions to Taiwan's economic development and technological progress.

**Respect from the Industry:**
Morris Chang was respected by the Taiwan industry as the "semiconductor patriarch," and his experience and wisdom became a model for later entrepreneurs to learn from.

**Social Influence Recognition:**
In addition to business achievements, Morris Chang's social influence was widely recognized, and his contributions to Taiwan's social development were highly evaluated by all sectors.

## Philosophical Thinking and Life Wisdom

### Understanding of Success

**Combination of Strength and Opportunity:**
Morris Chang believed that success requires the combination of strength and opportunity, strength is the foundation, but also needs to seize the opportunity. He emphasized the importance of preparation, and opportunities always wait for those who are prepared.

**Value of Long-term Persistence:**
He emphasized the importance of long-term persistence, believing that true success needs the accumulation of time and cannot be achieved overnight. TSMC's success was the result of long-term persistence.

**Necessity of Innovation:**
Morris Chang believed that in the tech industry, innovation is a necessary condition for survival. TSMC's history shows: as long as you stop making breakthroughs in processes, competitors will fill the gap.

### Insights on Life

**Balance Between Work and Life:**
Although his business was very successful, Morris Chang also emphasized the importance of work-life balance. He liked reading and listening to music, and these hobbies provided spiritual sustenance for him.

**Sense of Social Responsibility:**
Morris Chang believed that successful entrepreneurs have a responsibility to give back to society. He led TSMC to donate to Tsing Hua University and other academic institutions and participated in discussions on educational policies, making specific suggestions for the reform of Taiwan's higher education. [^18]

**Importance of Succession:**
He attached great importance to the inheritance of knowledge and experience, not only cultivating successors within the company but also sharing his own experience and wisdom through various channels.

## Historical Evaluation

When Morris Chang retired in 2018, TSMC's market value surpassed Intel, becoming the world's most valuable semiconductor company.[^19] He spent 31 years verifying an counterintuitive proposition: a foundry that does not design its own chips can become the manufacturing foundation of the entire digital era.

From Ningbo, Zhejiang to Harvard, MIT, and then from Texas Instruments executives to 54 years old, giving up the comfortable life in the United States to return to Taiwan, every turn of his was not a mainstream choice, but the results all pointed in the same direction. TSMC's current status is both the result of semiconductor technology competition and the result of his bet on the business model in 1987 that few people believed in.

TSMC's market value first exceeded NT$10 trillion on July 21, 2020, and exceeded NT$20 trillion on March 8, 2024, becoming one of the highest-valued tech companies in Asia.[^20] This is a scale that was difficult to imagine when he made that bet in 1987, and also the clearest footnote to his life.

## Extended Reading

- [Taiwan Enterprises: TSMC](/en/economy/tsmc) — The National Guardian Mountain he founded in 1987 with the wafer foundry model, now worth over NT$60 trillion, is itself Morris Chang's most complete footnote
- [Shi Zhenrong](/en/people/stan-shih) — The founder of Acer who served as a TSMC director for 21 years, also the author of the "smiling curve"; what TSMC did with "mid-stage manufacturing" was the most valuable part of that curve that was criticized and reality
- [Guo Tai-ming](/en/people/terry-gou) — Another Taiwanese entrepreneur who changed the world through "foundry," Foxconn's assembly foundry and TSMC's wafer foundry are the two paths of Taiwan manufacturing going global
- [Semiconductor Industry](/en/technology/taiwan-semiconductor-industry) — From RCA's technology transfer in 1976 to the National Guardian Mountain, Morris Chang personally brought Taiwan into the entire industry battlefield
- [Huang Zhongren](/en/people/frank-huang-psmc) — The person who came to find Morris Chang when Lanji was almost acquired by United Microelectronics in the late 1990s, walking on another cliff-like path of Taiwan's semiconductors
- [Taiwan Industry Transformation and Upgrade](/en/economy/industrial-transformation-from-manufacturing-to-innovation) — TSMC is the most concrete case of Taiwan transforming from a "foundry island" to a "technology island," and also the core coordinate of this 40-year transformation

---

## References

[^1]: Morris Chang was born on July 10, 1931, in Ningbo City, Zhejiang Province, China. See: Wikipedia "Morris Chang" entry <https://zh.wikipedia.org/zh-hant/%E5%BC%B5%E5%BF%A0%E8%AC%80>

[^2]: In 1949, he entered Harvard University to study literature, and transferred to MIT mechanical engineering after one year. See: Wikipedia "Morris Chang" entry <https://zh.wikipedia.org/zh-hant/%E5%BC%B5%E5%BF%A0%E8%AC%80>

[^3]: In 1952, he received a bachelor's degree in mechanical engineering from MIT. See: Wikipedia "Morris Chang" entry <https://zh.wikipedia.org/zh-hant/%E5%BC%B5%E5%BF%A0%E8%AC%80>

[^4]: From 1955, he worked in semiconductor manufacturing at Sylvania for about three years. See: Wikipedia "Morris Chang" entry <https://zh.wikipedia.org/zh-hant/%E5%BC%B5%E5%BF%A0%E8%AC%80>

[^5]: In 1958, he joined Texas Instruments as a semiconductor engineer. See: Wikipedia "Morris Chang" entry <https://zh.wikipedia.org/zh-hant/%E5%BC%B5%E5%BF%A0%E8%AC%80>

[^6]: In 1964, he received a doctoral degree in electrical engineering from Stanford University. See: English Wikipedia "Morris Chang" entry <https://en.wikipedia.org/wiki/Morris_Chang>

[^7]: In 1972, he was promoted to deputy general manager of Texas Instruments Group and general manager of the semiconductor group. See: Wikipedia "Morris Chang" entry <https://zh.wikipedia.org/zh-hant/%E5%BC%B5%E5%BF%A0%E8%AC%80>

[^8]: Sun Yun-suan (1913–2006), former Premier (1978–1984), promoted semiconductors and tech industries during his tenure. See: Wikipedia "Sun Yun-suan" entry <https://zh.wikipedia.org/wiki/%E5%AD%AB%E9%81%8B%E7%92%87>

[^9]: On February 21, 1987, TSMC was established; government investment of $70 million accounting for 48.3%, Philips $40 million accounting for 27.5%, and private sectors $35 million accounting for 24.2%. See: Wikipedia "Taiwan Semiconductor Manufacturing" entry <https://zh.wikipedia.org/wiki/%E5%8F%B0%E7%81%A3%E7%A9%8D%E9%AB%94%E9%9B%BB%E8%B7%AF%E8%A3%BD%E9%80%A0>

[^10]: TSMC's early shareholders included Dutch Philips Company. See: Wikipedia "Taiwan Semiconductor Manufacturing" entry <https://zh.wikipedia.org/wiki/%E5%8F%B0%E7%81%A3%E7%A9%8D%E9%AB%94%E9%9B%BB%E8%B7%AF%E8%A3%BD%E9%80%A0>

[^11]: In 1987, Morris Chang proposed the "dedicated wafer foundry" pure foundry business model. See: Wikipedia "Taiwan Semiconductor Manufacturing" entry <https://zh.wikipedia.org/wiki/%E5%8F%B0%E7%81%A3%E7%A9%8D%E9%AB%94%E9%9B%BB%E8%B7%AF%E8%A3%BD%E9%80%A0>

[^12]: Since the 2010s, TSMC has been providing foundry services for Apple's A-series mobile processors, and since 2013, it has become the main supplier of iPhone core chips. See: Wikipedia "Taiwan Semiconductor Manufacturing" entry <https://zh.wikipedia.org/wiki/%E5%8F%B0%E7%81%A3%E7%A9%8D%E9%AB%94%E9%9B%BB%E8%B7%AF%E8%A3%BD%E9%80%A0>

[^13]: TSMC has long invested about 8% of its revenue in R&D (the proportion varies slightly each year according to the annual report). See: Wikipedia "Taiwan Semiconductor Manufacturing" entry <https://zh.wikipedia.org/wiki/%E5%8F%B0%E7%81%A3%E7%A9%8D%E9%AB%94%E9%9B%BB%E8%B7%AF%E8%A3%BD%E9%80%A0>

[^14]: In 2005, Morris Chang resigned as CEO and was succeeded by Cai Lixing. See: Wikipedia "Morris Chang" entry <https://zh.wikipedia.org/zh-hant/%E5%BC%B5%E5%BF%A0%E8%AC%80>

[^15]: In 2009, 78-year-old Morris Chang returned to serve as CEO of TSMC due to the global financial crisis. See: Wikipedia "Morris Chang" entry <https://zh.wikipedia.org/zh-hant/%E5%BC%B5%E5%BF%A0%E8%AC%80>

[^16]: On June 5, 2018, Morris Chang officially retired, with Liu Deyin as chairman and Wei Zhejia as CEO. See: Wikipedia "Morris Chang" entry <https://zh.wikipedia.org/zh-hant/%E5%BC%B5%E5%BF%A0%E8%AC%80>

[^17]: [Taiwan Economy - Chinese Wikipedia](https://zh.wikipedia.org/wiki/%E5%8F%B0%E7%81%A3%E7%B6%93%E6%BF%9F) — Semiconductors account for about 30% of Taiwan's exports year after year.

[^18]: [The Joy of Enterprise Learning: "TSMC Building" of the College of Technology Management at National Tsing Hua University](https://www.nthu.edu.tw/hotNews/content/708) — TSMC donated NT$180 million to build the "TSMC Building" of the College of Technology Management at National Tsing Hua University, completed in April 2008; the donor is TSMC, not Morris Chang personally.

[^19]: In 2018, when Morris Chang retired, TSMC's market value had already surpassed Intel. See: Wikipedia "Taiwan Semiconductor Manufacturing" entry <https://zh.wikipedia.org/wiki/%E5%8F%B0%E7%81%A3%E7%A9%8D%E9%AB%94%E9%9B%BB%E8%B7%AF%E8%A3%BD%E9%80%A0>

[^20]: TSMC's market value first exceeded NT$10 trillion on July 21, 2020, and exceeded NT$20 trillion on March 8, 2024. See: Wikipedia "Taiwan Semiconductor Manufacturing" entry <https://zh.wikipedia.org/wiki/%E5%8F%B0%E7%81%A3%E7%A9%8D%E9%AB%94%E9%9B%BB%E8%B7%AF%E8%A3%BD%E9%80%A0>

_References:_

- [Morris Chang's Autobiography (Volume 1 + Volume 2)](https://www.books.com.tw/products/0010784799)
- [TSMC Company Annual Report and Official Data](https://investor.tsmc.com/english/annual-reports)
- [Industrial Technology Research Institute](https://www.itri.org.tw/)
- [Wikipedia "Morris Chang" Entry](https://zh.wikipedia.org/zh-hant/%E5%BC%B5%E5%BF%A0%E8%AC%80)
- [National Tsing Hua University Morris Chang Related Data](https://www.nthu.edu.tw/)
