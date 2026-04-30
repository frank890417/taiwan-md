---
title: 'Morris Chang'
description: 'The semiconductor patriarch and founder of TSMC, the legendary entrepreneur who reshaped the global tech industry with the pure-play foundry model'
date: 2026-03-17
tags:
  [
    'People',
    'Morris Chang',
    'TSMC',
    'Semiconductor',
    'Entrepreneur',
    'Foundry',
    'Silicon Shield',
  ]
subcategory: 'Tech & Business'
lastVerified: 2026-03-19
lastHumanReview: false
featured: true
lifeTree:
  protagonist: 'Morris Chang (張忠謀)'
  birthYear: 1931
  span: '1931–2018'
  source:
    article: 'knowledge/People/張忠謀.md'
    commit: '2acf410b'
    commitDate: '2026-03-17'
    extractedBy: 'Taiwan.md (Semiont) β-r5'
    extractedAt: '2026-04-26 13:30 +0800'
    note: 'Original article has no footnotes; sources inferred from references section (autobiography / TSMC annual reports / Wikipedia / ITRI / NTHU) plus public historical records. A few psychological motivations marked [speculative].'
  intro: 'A son of a Chinese banker who fled to Hong Kong at 14, enrolled in Harvard Literature at 18, switched to MIT Engineering at 20, and at 54 left a US vice-president post to found TSMC in Taiwan. This tree maps every crossroads he chose (geographic, skills, business model, succession) and those he did not — from the Harvard literature path to staying safely in America to continuing the IDM model.'
  themes:
    - id: homeland
      label: 'Overseas vs Homeland'
      color: '#10B981'
    - id: expert-leader
      label: 'Engineer vs Executive'
      color: '#8B5CF6'
    - id: business-model
      label: 'Integrated vs Foundry'
      color: '#F59E0B'
    - id: succession
      label: 'In Office vs Legacy'
      color: '#EC4899'
  nodes:
    - id: birth
      year: 1931
      age: 0
      type: given
      theme: homeland
      label: 'Born in Ningbo, Zhejiang'
      scene: 'Father Zhang Weiguan was a banker; mother Xu Yunzheng came from a scholarly family. A literary household in a turbulent era.'
    - id: hong-kong
      year: 1945
      age: 14
      type: choice
      theme: homeland
      scene: 'Childhood migration: Ningbo to Shanghai to Nanjing to Chongqing to Shanghai to Guangzhou to Hong Kong. Settled in Hong Kong at 14.'
      chose:
        label: 'Received secondary education under the British colonial system'
        consequence: "Hong Kong's international environment and English training laid the language and global outlook for his future in the US. It also gave him an early sense of operating as an outsider within a great-power system."
      alternatives:
        - label: 'Stayed on the Chinese mainland'
          plausibility: structural
          note: 'Most families of the same generation could not relocate to Hong Kong. Banker descendants who remained after 1949 followed a completely different trajectory — they would not have appeared in Silicon Valley.'
        - label: 'Gone directly to the US'
          plausibility: structural
          note: 'A handful of wealthy families sent children directly to the US in the late 1940s. Without four years in Hong Kong, the English and international foundation would have been weaker, making Harvard admission much harder.'
    - id: harvard-mit
      year: 1950
      age: 19
      type: choice
      theme: expert-leader
      scene: 'Entered Harvard in 1949 to study literature. One year later, lacking passion for literature and facing financial pressures.'
      chose:
        label: 'Transferred to MIT Mechanical Engineering'
        consequence: "MIT's rigorous engineering education cultivated logical thinking and problem-solving skills. Received a BS in Mechanical Engineering in 1952. This pivot from arts to technology was a defining fork."
      alternatives:
        - label: 'Stayed at Harvard studying literature'
          plausibility: speculative
          note: '[Speculative] Had he stayed, he might have pursued an academic or literary path — the semiconductor career would never have existed. But the tension of why someone interested in literature succeeded in MIT Engineering later became the reason he could view the tech industry through a humanistic lens.'
        - label: 'Switched to business school'
          plausibility: structural
          note: 'Some Chinese students of the same era chose Harvard Business School. Without engineering hands-on experience, the technical roles at TI would have been inaccessible, and the precision of semiconductor manufacturing would have been opaque.'
    - id: korea-war-civilian
      year: 1952
      age: 21
      type: event
      theme: homeland
      label: 'Graduated from MIT during the Korean War; foreign-student status barred him from US defense-related work'
      scene: 'Defense industry closed to foreign nationals during wartime.'
    - id: sylvania
      year: 1955
      age: 24
      type: choice
      theme: expert-leader
      scene: 'Three years after graduation, found a job opportunity.'
      chose:
        label: 'Joined Sylvania for three years in semiconductors'
        consequence: 'First contact with the semiconductor industry. The sector was still nascent, but he keenly sensed its enormous potential. Learned the fundamentals of semiconductor manufacturing and cultivated attention to technical detail.'
      alternatives:
        - label: 'Joined an established mature industry'
          plausibility: structural
          note: 'The mainstream choices in the 1950s were automotive, mechanical, and chemical industries. Without joining semiconductors in their infancy, the TI opportunity would never have come.'
    - id: ti-1958
      year: 1958
      age: 27
      type: choice
      theme: expert-leader
      scene: 'Texas Instruments was aggressively building its semiconductor business.'
      chose:
        label: 'Joined TI as a semiconductor engineer'
        consequence: 'Improved manufacturing processes, raised yields, reduced costs. Rose from engineer to vice president over 25 years — TI was the stage that defined his life.'
      alternatives:
        - label: 'Stay at Sylvania'
          plausibility: structural
          note: 'Sylvania gradually exited semiconductors. Had he stayed, career ceiling would have been obvious.'
        - label: 'Found a startup'
          plausibility: structural
          note: "Some contemporaries chose to leave big companies and start ventures (e.g., Intel founders Noyce and Moore left Fairchild in 1968). But Chang took the grow-within-a-large-corporation path for 25 years — that patience later became the root of TSMC's play-the-long-game culture."
    - id: stanford-phd
      year: 1961
      age: 30
      type: choice
      theme: expert-leader
      scene: 'TI sponsored him to pursue a doctorate in Electrical Engineering at Stanford.'
      chose:
        label: 'Earned PhD'
        consequence: 'Stanford EE PhD in 1964. Returned to TI in key management roles (GM of Germanium, Silicon Transistors, and IC divisions). Dual-track: technical + management.'
      alternatives:
        - label: 'Remain an engineer without a PhD'
          plausibility: structural
          note: 'Many engineers of the era skipped the doctorate; career ceiling was roughly senior/staff engineer. For the technical-management track that led to vice president, the PhD was an invisible prerequisite.'
    - id: vp-1972
      year: 1972
      age: 41
      type: choice
      theme: expert-leader
      scene: '14 years after joining TI as an engineer, reached the top.'
      chose:
        label: 'Named Group Vice President of TI and President of the Semiconductor Group'
        consequence: "One of the highest-ranking Chinese-American executives in major American corporations at the time. Broke through the racial ceiling. Led TI's most critical business unit."
      alternatives:
        - label: 'Jump to a competitor'
          plausibility: structural
          note: 'Intel, AMD, and Motorola were all recruiting senior semiconductor executives in the 1970s. A move might have yielded a CEO title but would have sacrificed the political capital and networks accumulated at TI.'
    - id: itri-call
      year: 1985
      age: 54
      type: choice
      theme: homeland
      scene: 'ITRI Chairman Hsu Hsien-hsiu, Premier Yu Kuo-hua, and Policy Minister Li Kuo-ting jointly invited him.'
      chose:
        label: 'Returned to Taiwan as President of ITRI'
        consequence: 'At 54, with a successful career and comfortable life in the US, returning to Taiwan was a high-risk decision. But this was the precondition for TSMC — without the ITRI presidency, there would have been no government support and no equity structure for what came next.'
      alternatives:
        - label: 'Stay in the US'
          plausibility: structural
          note: "Most Chinese-American executives of his generation chose to remain in the US until retirement. Had he stayed, a stable career — but no TSMC. Taiwan's semiconductor trajectory would have been entirely different."
        - label: 'Go to mainland China'
          plausibility: structural
          note: "1985 was the seventh year of China's reform and opening. Overseas Chinese technology leaders were also being courted. Choosing the mainland would have meant being absorbed into state semiconductor plans (like SMIC later), with very different path constraints and commercial model freedom."
    - id: tsmc-foundry
      year: 1987
      age: 56
      type: choice
      theme: business-model
      scene: 'During his tenure at ITRI, he conceived a revolutionary business model.'
      chose:
        label: 'Founded TSMC with a pure-play foundry model'
        consequence: 'Incorporated February 21, 1987, with initial capital of NT$22 billion. Broke the dominant IDM (Integrated Device Manufacturer) model. Clients could design chips without massive capital investment in fabs. Later reshaped the global semiconductor ecosystem and spawned the fabless industry.'
      alternatives:
        - label: 'Pursue the traditional IDM model (design + manufacture)'
          plausibility: structural
          note: 'The mainstream model at the time (Intel, TI, Motorola were all IDMs). Choosing IDM would have put TSMC in direct competition with Samsung and Japanese NEC — almost certainly a losing fight. The foundry model was the key to bypassing the Western IDM home field.'
        - label: 'Design only, no manufacturing'
          plausibility: structural
          note: "Another direction: a Taiwanese fabless company (like MediaTek later). But in 1987, Taiwan's design capability was far behind its manufacturing potential — this route would have started too late."
        - label: "Don't start a company; stay in ITRI doing policy"
          plausibility: structural
          note: 'Some returning overseas technical leaders chose a pure policy role. Had he done so, TSMC would not exist, and Taiwan would have taken another decade to catch Korea in semiconductors.'
    - id: retire-2005
      year: 2005
      age: 74
      type: choice
      theme: succession
      scene: 'TSMC was the global foundry leader.'
      chose:
        label: 'First retirement — handed CEO role to Rick Tsai — retained Chairman position'
        consequence: 'A carefully prepared succession plan. Paved the way for corporate sustainability. But retaining the chairmanship kept strategic decision-making authority.'
      alternatives:
        - label: 'Complete exit'
          plausibility: structural
          note: 'Full retirement is the clean-exit model (like Bill Gates in 2008). But if Chang had fully stepped away, TSMC might not have found its footing when the 2008 financial crisis hit. Retaining the chairmanship was what enabled his comeback.'
    - id: comeback-2009
      year: 2009
      age: 78
      type: choice
      theme: succession
      scene: 'The 2008 global financial crisis battered TSMC. Revenue fell; competition intensified.'
      chose:
        label: 'Returned at 78 to serve again as CEO'
        consequence: 'Stabilized market confidence, led the company through difficulty, and cultivated Liu Te-yin and Wei Che-chia as successors. A classic case of a veteran returning to rescue a ship.'
      alternatives:
        - label: "Don't return; let Rick Tsai handle it"
          plausibility: structural
          note: 'Respecting the established succession plan was the other road. But the double pressure of the financial crisis plus insufficient successor authority might have caused TSMC to miss the critical 28nm window.'
    - id: retire-2018
      year: 2018
      age: 87
      type: choice
      theme: succession
      scene: 'TSMC reached global process leadership under his second nine-year tenure.'
      chose:
        label: 'Formally retired and established co-leadership (Liu Te-yin as Chairman / Wei Che-chia as CEO)'
        consequence: 'A model retirement. The co-leadership balanced external and internal responsibilities. A 31-year legendary career ended. Widely cited as a textbook case of corporate succession.'
      alternatives:
        - label: 'Single successor'
          plausibility: structural
          note: "The American corporate tradition (Apple with Cook, Microsoft with Nadella are both single-successor). But given TSMC's scale and two equally strong candidates, the co-leadership model avoided two-tigers-fighting while enabling complementary strengths."
        - label: 'Stay on until 90'
          plausibility: structural
          note: 'The Berkshire Hathaway / Buffett model. But Chang chose to exit proactively, avoiding the risk of gerontocracy. The self-restraint itself was part of the succession quality.'
translatedFrom: 'People/張忠謀.md'
sourceCommitSha: '4a5b7958'
sourceContentHash: 'sha256:cd227d8ac5698cc4'
translatedAt: '2026-05-01T08:56:11+08:00'
---

# Morris Chang (張忠謀)

Morris Chang — legendary entrepreneur known as the "Father of Semiconductors" — is the founder of Taiwan Semiconductor Manufacturing Company (TSMC). He not only created the world's first dedicated semiconductor foundry, but pioneered a business model that permanently altered the global technology ecosystem. From his role as a Chinese-American vice president at Texas Instruments to returning to Taiwan and building TSMC, his life traces the arc of the global semiconductor industry while cementing Taiwan's pivotal place in the global technology supply chain.

## 30-Second Overview

**Why the world should know Morris Chang**

TSMC, founded by Morris Chang, is not only the world's largest semiconductor foundry — it is a critical pillar of modern digital civilization. From smartphones and computers to AI chips, the vast majority of the world's advanced semiconductors are manufactured by TSMC. The "pure-play foundry" business model he created allowed countless technology companies to focus on chip design without investing enormous capital in wafer fabs, fundamentally changing the global technology industry.

TSMC is called Taiwan's "Silicon Shield," carrying enormous strategic significance in geopolitics. Morris Chang is not merely a successful entrepreneur — he is an innovator who changed the world, and his story is a legend of vision, perseverance, and business acumen.

## Early Life and Education

### Growing Up in a Time of Upheaval

**Birth and family background:**
On July 10, 1931, Morris Chang was born in Ningbo, Zhejiang Province, China. His father Zhang Weiguan was a banker; his mother Xu Yunzheng came from a scholarly family. Strong family education in turbulent times gave him a deep cultural foundation.

**A childhood of migrations:**
War drove a childhood of constant movement — from Ningbo to Shanghai, Nanjing, Chongqing, back to Shanghai, then Guangzhou, Hong Kong, and ultimately America. These years of displacement built his adaptability and international outlook.

**School years in Hong Kong:**
In 1945, at 14, Chang settled in Hong Kong with his family and received a secondary education under the British colonial system. Hong Kong's international environment and English-language instruction laid critical groundwork for his later studies and career in the United States.

### A Decisive Pivot in the US

**A brief stint at Harvard:**
In 1949, at 18, Chang entered Harvard University to study literature. Within a year, lacking passion for literature and facing financial pressure, he transferred to the Massachusetts Institute of Technology (MIT).

**Engineering education at MIT:**
At MIT, Chang chose Mechanical Engineering as his major. The choice seemed accidental but proved foundational for his later success in manufacturing. MIT's rigorous engineering training cultivated logical thinking and problem-solving abilities.

**BS degree in 1952:**
Chang graduated from MIT with a degree in Mechanical Engineering in 1952. Graduating during the Korean War, he was barred as a foreign national from defense-related work — a constraint that steered him toward civilian industry.

## Early Career: Sylvania

### First Steps into Semiconductors

**Opportunity in 1955:**
After graduation, Chang spent three years at Sylvania, his first exposure to the semiconductor industry. Semiconductors were still in their infancy, but he keenly sensed the enormous potential of this nascent field.

**Building technical skills:**
At Sylvania, Chang worked in semiconductor device manufacturing, learning the fundamentals of semiconductor processes. The experience revealed the complexity and precision of semiconductor manufacturing and cultivated his attention to technical detail.

**Early signs of management ability:**
Even in an entry-level technical role, Chang demonstrated exceptional management capability — organizing teams effectively and resolving technical problems — laying the groundwork for his management career.

## Texas Instruments: A Platform for Leadership

### The Defining Pivot of 1958

**Joining Texas Instruments:**
In 1958, Chang joined Texas Instruments (TI), the most important turning point of his professional career. TI was aggressively developing its semiconductor business, giving him an exceptional stage for growth.

**From engineer to manager:**
At TI, Chang started as a semiconductor engineer responsible for wafer production. He distinguished himself not only technically but also in management, quickly earning the attention of senior leadership.

**Process improvements:**
During his time at TI, Chang significantly improved the company's semiconductor manufacturing processes, raising yield rates and production efficiency. These technical gains saved the company substantial costs and earned him a strong reputation.

### Doctorate at Stanford

**Learning opportunity in 1961:**
In 1961, TI sponsored Chang to pursue a doctorate in Electrical Engineering at Stanford University — recognition of his abilities and an example of American corporate investment in talent development.

**Gains from the doctorate:**
Chang earned a Stanford EE PhD in 1964. Beyond deepening his technical skills, it expanded his vision and professional network.

**New role upon return:**
After the doctorate, Chang returned to TI in progressively important management positions — General Manager of the Germanium Transistor Division, the Silicon Transistor Division, and the Integrated Circuit Division.

### Breaking Through the Racial Ceiling

**A historic promotion in 1972:**
In 1972, Chang was named Group Vice President of TI, becoming one of the highest-ranking Chinese-American executives in major American corporations at the time — a rare achievement in that era's American business environment.

**President of the Semiconductor Group:**
Chang simultaneously served as President of TI's Semiconductor Group, leading the company's most critical business unit. Under his leadership, TI's semiconductor business expanded rapidly to become a leading global supplier.

**25 years at TI summarized:**
Over 25 years at TI, Chang rose from entry-level engineer to senior executive, accumulating vast technical and managerial experience. More importantly, he developed a deep understanding of the semiconductor industry's development dynamics and commercial logic.

## The Call from Taiwan: ITRI Presidency

### A Life-Turning Moment in 1985

**The invitation:**
In 1985, Chang was invited by ITRI Chairman Hsu Hsien-hsiu, Premier Yu Kuo-hua, and Policy Minister Li Kuo-ting to serve as President of the Industrial Technology Research Institute (ITRI). This decision changed not only his life trajectory but the fate of Taiwan's technology industry.

**The courage to leave comfort:**
At 54, Chang already had a successful career and a comfortable life in the US. Choosing to return to Taiwan was a decision full of risk and challenge — one that reflected his sense of mission for Taiwan's technological development.

**Reforms at ITRI:**
As ITRI President, Chang vigorously promoted the integration of research and industry, raising Taiwan's capacity for technological innovation. His management philosophy and international vision brought new directions to the institute.

### Assessing Taiwan's Semiconductor Potential

**Analyzing the industrial environment:**
Chang conducted an in-depth analysis of Taiwan's industrial environment and strengths. He concluded that Taiwan had excellent engineering talent, relatively lower costs, and flexible manufacturing capacity — conditions well-suited for semiconductor manufacturing.

**Conceptualizing the foundry model:**
During his ITRI tenure, Chang began thinking about a revolutionary business model: the dedicated wafer foundry. This concept emerged from his deep insight into industry trends and crystallized decades of industry experience.

**The importance of government support:**
Chang recognized that developing the semiconductor industry required strong government support — capital investment, policy backing, and talent cultivation. He actively communicated with government officials, laying groundwork for TSMC's eventual founding.

## TSMC: The 1987 Innovation

### The Foundry Model Innovation

**Breaking with the old paradigm:**
In 1987, Chang introduced the concept of the "pure-play wafer foundry." Unlike the traditional IDM model, TSMC would focus exclusively on manufacturing chips for customers — without designing its own products.

**The model's revolutionary significance:**
The model's revolutionary nature was this: it enabled companies without the resources to build wafer fabs to design advanced chips, dramatically lowering the barriers to entering the semiconductor industry and catalyzing innovation.

**Impact on the industrial ecosystem:**
The pure-play foundry model created an entirely new ecosystem, allowing design companies to focus on innovation while foundries focused on manufacturing — a professional division of labor that raised efficiency across the entire industry.

### The Founding of TSMC

**The historic moment of February 21, 1987:**
Taiwan Semiconductor Manufacturing Company was formally incorporated on February 21, 1987, with initial capital of NT$22 billion — the result of collaboration among the government, private enterprises, and foreign investors.

**Equity structure:**
TSMC's shareholders included ITRI, Dutch electronics giant Philips, and Taiwanese private enterprises. This diversified structure brought technology, capital, and market resources to the company.

**Chang's dual role:**
Chang served as both Chairman and CEO, overseeing the company's overall strategy and day-to-day operations. His leadership style blended the efficiency of American management with the wisdom of Chinese cultural traditions.

## TSMC's Development

### Early Challenges and Breakthroughs

**1987–1990 — The difficult founding years:**
TSMC faced enormous challenges in its early years. The pure-play foundry was an entirely new business model, and the market was skeptical; clients needed time to accept the concept. Chang had to simultaneously build manufacturing capability and convince clients.

**Building technical capability:**
TSMC's initial technology came from ITRI transfers and Philips collaboration. Chang led the team to rapidly learn and improve process technology, establishing reliable manufacturing capability.

**Winning the first customers:**
TSMC's early clients were primarily American fabless semiconductor companies — precisely the ones that needed dedicated foundry services, giving TSMC its early business foundation.

### Rapid Growth in the 1990s

**The technology leadership strategy:**
In the 1990s, Chang formulated a "technology leadership" strategy, investing heavily in R&D to ensure TSMC stayed ahead in process technology. This approach underpinned the company's long-term development.

**Capacity expansion and global positioning:**
As orders grew, TSMC aggressively expanded capacity, building multiple fabs in Taiwan, and began considering a global footprint to be closer to major clients and markets.

**Customer diversification:**
TSMC's customer base expanded from early American fabless companies to include the world's major semiconductor design houses — Qualcomm, Broadcom, NVIDIA, and others.

### Leadership in the 21st Century

**The race for advanced nodes:**
Into the 21st century, semiconductor process development became progressively more difficult and expensive. TSMC maintained leadership in advanced process technology through sustained R&D investment and innovation.

**From 28nm to 5nm:**
From 28nm to 16nm, 7nm, 5nm, and 3nm, TSMC maintained technology leadership at each generation, consolidating its position in the high-end market.

**The Apple milestone:**
The partnership with Apple — particularly manufacturing processors for iPhone and iPad — became a landmark milestone in TSMC's history, significantly boosting revenue and market position.

## Business Philosophy and Management

### Commitment to Technical Innovation

**Valuing R&D investment:**
Chang consistently emphasized the importance of technical innovation. TSMC invested a significant portion of annual revenue in R&D to maintain technological leadership — a key long-term ingredient of the company's success.

**Pursuing Moore's Law:**
As Moore's Law faced challenges, Chang led TSMC to continue advancing process technology, sustaining the law's vitality and contributing significantly to the development of the entire semiconductor industry.

**Balancing technology and market:**
Chang was adept at finding the balance between technology leadership and market demand — maintaining competitive advantage while ensuring technologies had commercial value, avoiding the trap of running too far ahead.

### Talent and Corporate Culture

**Integrity as the cultural core:**
Chang built a corporate culture centered on integrity and honesty at TSMC. He championed core values of "Integrity, Commitment, Innovation, and Customer Trust," which became the cultural foundation of the company.

**Investment in talent:**
Chang placed extraordinary emphasis on talent development, building a comprehensive training system. He believed talent is a company's most important asset — only excellent people sustain long-term growth.

**International management style:**
Chang brought the efficiency and transparency of American management to TSMC, establishing modern corporate governance, while simultaneously incorporating the wisdom of Chinese cultural traditions to create a unique company culture.

### Strategic Thinking and Execution

**Long-term strategy:**
Chang possessed exceptional strategic thinking — the ability to discern industry trends and formulate long-range development plans. TSMC's "technology leadership" strategy is a direct expression of that foresight.

**Prioritizing execution:**
Beyond strategy, Chang placed great emphasis on execution. He built comprehensive management systems to ensure strategies were effectively implemented — a critical factor in TSMC's sustained growth.

**Crisis management wisdom:**
In facing various crises and challenges, Chang demonstrated exceptional leadership and the wisdom to navigate adversity, guiding TSMC through difficult periods and maintaining stable development.

## Retirement and Legacy

### First Retirement in 2005

**Initiating the succession plan:**
In 2005, at 74, Chang announced his retirement and handed the CEO role to Rick Tsai. This was part of a carefully prepared succession plan reflecting his commitment to corporate sustainability.

**Retaining the chairmanship:**
Although stepping down as CEO, Chang retained the chairmanship, continuing to participate in major strategic decisions and providing guidance and support to the succession team.

**Life after retirement:**
Chang did not completely withdraw from business activity after retirement. He actively participated in forums and conferences, sharing his experience and insights, contributing his wisdom to industry development.

### The Comeback of 2009

**The challenge of the financial crisis:**
The 2008 global financial crisis severely impacted TSMC, creating the twin pressures of falling revenue and intensifying competition. At this critical moment, Chang decided to return.

**Returning as CEO:**
In 2009, at 78, Chang resumed the role of TSMC CEO, personally leading the company through the difficult period. His return stabilized market confidence and provided the leadership needed for recovery.

**Cultivating Liu Te-yin and Wei Che-chia:**
During his second term, Chang focused on developing Liu Te-yin and Wei Che-chia as successor candidates, preparing the talent base for the company's future.

### Formal Retirement in 2018

**Completing the legacy:**
In June 2018, at 87, Morris Chang formally retired, ending his 31-year legendary career at TSMC. He handed the chairmanship to Liu Te-yin and the CEO role to Wei Che-chia.

**Establishing co-leadership:**
Chang instituted a "co-leadership" model — Liu Te-yin as Chairman handling external matters, Wei Che-chia as CEO managing operations — an arrangement designed to support stable development.

**A model retirement:**
Chang's retirement is regarded as a benchmark for corporate succession: exiting at the right moment, giving the next generation of leaders ample room to perform, while ensuring a stable transition.

## Impact on the Global Semiconductor Industry

### Business Model Innovation

**Popularizing the foundry model:**
The pure-play foundry model Chang created has become one of the standard business models in the semiconductor industry. Hundreds of fabless semiconductor companies worldwide depend on foundry services — a model that dramatically accelerated industry development.

**Reshaping the industrial ecosystem:**
The foundry model reshaped the semiconductor industry's ecosystem, promoted professional specialization, raised industry efficiency, and lowered the threshold for innovation — enabling more companies to participate in chip design.

**Building a global supply chain:**
TSMC became a critical node in the global semiconductor supply chain, providing manufacturing services to technology companies around the world — a truly globalized semiconductor supply chain.

### Driving Technological Progress

**Maintaining process leadership:**
Under Chang's leadership, TSMC maintained global leadership in process technology, driving technological progress across the entire semiconductor industry and sustaining Moore's Law's vitality.

**Democratizing advanced nodes:**
TSMC's advanced process services allowed small companies to access the latest technology — a "democratization" of advanced manufacturing that fueled a boom in innovation.

**Opening new technology domains:**
From traditional digital chips to AI chips, from consumer electronics to automotive electronics, TSMC provided manufacturing support across emerging technology domains, driving the application of technological innovation.

## Taiwan's Meaning: Founding Father of the Silicon Island

### Technology Industry Development

**Building the Silicon Shield:**
TSMC is called Taiwan's "Silicon Shield" — not only for its enormous economic value but for its critical position in the global technology supply chain. Chang created a vital strategic asset for Taiwan.

**Cultivating technology talent:**
TSMC's development cultivated a vast pool of semiconductor professionals. These people support not only TSMC's growth but provide the talent foundation for Taiwan's entire technology industry.

**Forming an industry cluster:**
With TSMC at the center, Taiwan developed a complete semiconductor industry cluster — including equipment suppliers, materials suppliers, and packaging and testing companies — creating enormous industrial value.

### Contribution to Economic Development

**A major GDP contributor:**
TSMC has become Taiwan's largest company, making critical contributions to GDP. The company's success has driven related industries and created abundant employment opportunities.

**A pillar of export trade:**
Semiconductors have become Taiwan's most important export commodity. TSMC's success has substantially elevated Taiwan's position in global trade and strengthened the competitiveness of the Taiwanese economy.

**Improving the investment environment:**
TSMC's success story attracted more international investment, improved Taiwan's investment climate, and elevated Taiwan's standing in the eyes of global investors.

### Geopolitical Influence

**The importance of technology sovereignty:**
In the current geopolitical environment, the importance of semiconductor technology is increasingly evident. TSMC's existence enhances Taiwan's importance and voice in the international community.

**A bargaining chip in international relations:**
TSMC's critical position in the global technology supply chain has become an important asset in Taiwan's international relations and has strengthened Taiwan's global influence.

**Security strategy considerations:**
Various countries' attention to semiconductor technology also presents Taiwan with new security challenges and opportunities. How to balance competing interests while maintaining TSMC's competitive advantage is a critical strategic consideration.

## Personal Qualities and Leadership Style

### Vision and Execution Combined

**Extraordinary strategic foresight:**
Chang's greatest quality was exceptional strategic vision — the ability to discern industry trends and foresee the direction of future development. This foresight was the key factor in TSMC's success.

**Practical execution:**
Beyond vision, Chang possessed outstanding execution capability. He could translate strategic concepts into concrete action plans and ensure their effective implementation — a combination of strategic thinking and execution that is exceedingly rare.

**Lifelong learning:**
Even in his later years, Chang maintained a spirit of continuous learning, staying attuned to the latest industry developments. This learning attitude allowed him to maintain sharp thinking and accurate judgment.

### Leadership Characteristics

**Charismatic leadership:**
Chang possessed strong personal charisma and persuasiveness, capable of inspiring teams to strive toward shared goals. His speeches and writings consistently communicated complex concepts with clarity, earning deep respect from employees and industry peers.

**Rational decision-making:**
Facing major decisions, Chang consistently insisted on rational analysis — making judgments based on facts and data, avoiding emotional or political considerations that might compromise the correctness of decisions.

**Long-term thinking:**
Chang consistently adhered to long-term thinking, refusing to be swayed by short-term difficulties or gains. This long-range perspective enabled TSMC to maintain sustained competitive advantage in the fiercely competitive semiconductor industry.

## Honors and Recognition

### International Awards

**IEEE Honors:**
Chang received multiple honorary medals from the Institute of Electrical and Electronics Engineers (IEEE), recognizing his contributions to the development of semiconductor technology.

**Honorary doctorates:**
Stanford University, MIT, National Tsing Hua University, and other prominent institutions awarded Chang honorary doctoral degrees, commending his contributions to the technology industry and education.

**Business magazine rankings:**
Chang was repeatedly named one of the world's most influential business leaders by _Fortune_, _BusinessWeek_, and other international business magazines, establishing his place in global business.

### Recognition in Taiwan

**Government decorations:**
The Taiwan government awarded Chang multiple important honors, recognizing his outstanding contributions to Taiwan's economic development and technological progress.

**Industry veneration:**
Chang is venerated by Taiwan's industry as the "Father of Semiconductors." His experience and wisdom serve as a model for the next generation of entrepreneurs.

**Recognized social influence:**
Beyond his business achievements, Chang's social influence has been widely recognized, with his contributions to Taiwan's social development highly valued across all sectors.

## Philosophy and Life Wisdom

### Understanding Success

**The combination of ability and opportunity:**
Chang believed success requires both ability and opportunity — ability is the foundation, but timing matters too. He emphasized the importance of preparation: opportunities favor the prepared.

**The value of long-term perseverance:**
He stressed the importance of long-term persistence, believing that true success requires accumulated time — there are no shortcuts. TSMC's success is the result of sustained perseverance.

**The necessity of continuous innovation:**
Chang believed that in the technology industry, continuous innovation is a prerequisite for survival. Companies must constantly invest in innovation to maintain competitiveness.

### Reflections on Life

**Work-life balance:**
Despite tremendous professional success, Chang emphasized the importance of work-life balance. He enjoyed reading and music — these interests nourished him spiritually.

**Social responsibility:**
Chang believed successful entrepreneurs have a responsibility to give back to society. He actively participated in education and philanthropic work, contributing to social development.

**The importance of legacy:**
He placed great importance on the transmission of knowledge and experience — not only cultivating successors within the company but sharing his experience and wisdom through various channels.

## The Legend Continues

Morris Chang's story is a legend of vision, perseverance, and innovation. From a boy in a time of war, to a high-ranking executive in American corporations, to the founder of TSMC — his life trajectory witnessed the transformation of an era and created history. He built not only a great enterprise; more importantly, he changed the trajectory of an entire industry and influenced the lives of countless people.

TSMC is called the "Silicon Shield," but Morris Chang himself is no less a "national treasure" of Taiwan. His success belongs not only to Taiwan — it belongs to the entire world. In today's era of rapid technological development, the business model and corporate culture he established continue to play an important role, shaping the next generation of entrepreneurs and engineers.

The Morris Chang legend continues. Though he has retired, the enterprise he built and the intellectual legacy he left will continue to influence the world. In an era of rapidly developing AI, 5G, and IoT, semiconductors are more important than ever — and TSMC, as the global leader in semiconductor manufacturing, will continue to play a critical role in driving technological progress.

This is the Morris Chang legend — a story of dreams made real, a story of how one person changed the world.

---

_References:_

- [Morris Chang Autobiography (Volumes 1 & 2)](https://www.books.com.tw/products/0010784799)
- [TSMC Annual Reports and Official Information](https://investor.tsmc.com/english/annual-reports)
- [Industrial Technology Research Institute (ITRI)](https://www.itri.org.tw/)
- [Wikipedia: Morris Chang](https://zh.wikipedia.org/zh-hant/%E5%BC%B5%E5%BF%A0%E8%AC%80)
- [National Tsing Hua University — Morris Chang Resources](https://www.nthu.edu.tw/)
