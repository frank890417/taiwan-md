---
title: 'Morris Chang (Zhang Zhongmou)'
description: 'Patriarca do semicondutor, fundador da TSMC, empreendedor lendário que transformou a indústria global de tecnologia com o modelo de fabricação de wafers'
date: 2026-03-17
category: 'People'
tags:
  [
    'pessoa',
    'Morris Chang',
    'TSMC',
    'semicondutores',
    'empreendedorismo',
    'fabricação de wafers',
    '"montanha protetora"',
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
translatedAt: '2026-11-18T15:04:56.198670+00:00'
---

# Zhang Zhongmou (Morris Chang)

Zhang Zhongmou, considerado o "pai do semicondutor", é um empreendedor lendário e fundador da Taiwan Semiconductor Manufacturing Company (TSMC). Ele criou a primeira empresa global de fabricação de wafers dedicada exclusivamente a terceiros, estabelecendo um modelo comercial que redefiniu a ecologia da indústria tecnológica mundial. Sua trajetória — da carreira como executivo asiático na Texas Instruments aos fundos de TSMC em Taiwan — testemunha o desenvolvimento da indústria de semicondutores globais e consolidou a posição estratégica de Taiwan na cadeia de suprimentos tecnológica.

## Visão geral em 30 segundos

**Por que o mundo deve conhecer Zhang Zhongmou?**

A TSMC, fundada por Zhang Zhongmou, é a empresa de fabricação de wafers com maior valor de mercado global e uma das bases essenciais da civilização digital moderna. A maioria dos semicondutores avançados — desde smartphones e computadores até chips de inteligência artificial — é produzida pela TSMC. O modelo de "fabricação pura" criado por Zhang Zhongmou permitiu que inúmeras empresas tecnológicas se concentrassem apenas no design dos chips, sem precisar investir bilhões em fábricas de wafers, transformando radicalmente a ecologia da indústria tecnológica.

A TSMC é conhecida como a "montanha protetora" de Taiwan, ocupando uma posição estratégica indispensável na geopolítica global. Zhang Zhongmou é um dos poucos que realmente mudaram a estrutura industrial no século XX — redefiniu as fronteiras comerciais do setor de semicondutores, levando Taiwan de um ponto de partida de fabricação a ser um nó central da cadeia global de tecnologia.

Nascido em 1931 em Ningbo, Zhejiang, e fundando a TSMC em 1987: a vida de Zhang Zhongmou é a própria encarnação do ascenso tecnológico da Ásia no século XX.

## Infância e formação

### Caminhos marcados pela turbulência

**Nascimento e origens familiares:**
10 de julho de 1931, Zhang Zhongmou nasceu na cidade de Ningbo, província de Zhejiang, na China[^1]. Seu pai, Zhang Weiguan, era banqueiro, e sua mãe, Xu Junwei, vinha de uma família letrada. Em uma época de instabilidade, o pai, que dominava letras e história, mantinha uma biblioteca caseira rica, o que permitiu que Zhang desenvolvesse uma visão humanística ao longo de sua carreira técnica.

**Viagens de infância:**
Devido aos conflitos, a infância de Zhang Zhongmou foi marcada por mudanças constantes. De Ningbo a Xangai, Nanquim, Chongqing, de volta a Xangai, Guangzhou, Hong Kong e finalmente os Estados Unidos — essa jornada de adaptação constante cultivou sua resiliência e visão internacional.

**Estudos em Hong Kong:**
Em 1945, após o fim da guerra, a família se mudou para Xangai, onde Zhang ingressou no colégio Yangzheng Modelo; em 1948, com 17 anos, mudou-se para Hong Kong[^1]. No ano seguinte, partiu de Hong Kong para os Estados Unidos para estudar.

### Virada decisiva nos Estados Unidos

**Experiência breve na Universidade de Harvard:**
Em 1949, com 18 anos, Zhang Zhongmou entrou na Universidade de Harvard[^2], inicialmente cursando letras. No entanto, após um ano, devido à falta de interesse pela área e restrições financeiras, transferiu-se para o Instituto de Tecnologia de Massachusetts (MIT).

**Formação em engenharia no MIT:**
No MIT, Zhang optou por engenharia mecânica como sua especialização. Essa escolha, aparentemente acidental, proporcionou a ele uma intuição prática sobre os processos mecânicos essenciais à fabricação de semicondutores — uma base fundamental para suas futuras inovações na TSMC.

**Formação de bacharel em 1952:**
Em 1952, Zhang Zhongmou obteve seu diploma de bacharel em engenharia mecânica pelo MIT[^3]. Durante a Guerra da Coreia, sua condição de estudante estrangeiro impediu que ele obtesse empregos ligados ao exército norte-americano, o que o direcionou para a indústria civil.

## Início profissional: empresa Sylvania

### Primeiros passos no setor de semicondutores

**Oportunidade de 1955:**
Após a formatura, Zhang trabalhou por cerca de três anos na empresa Sylvania[^4], onde teve seu primeiro contato com a indústria de semicondutores. Naquela época, o setor ainda estava em fase inicial, mas Zhang rapidamente reconheceu seu imenso potencial.

**Desenvolvimento técnico:**
Na Sylvania, Zhang era responsável pela fabricação de dispositivos semicondutores, aprendendo os fundamentos dos processos de fabricação. Essa experiência o ajudou a compreender a complexidade e precisão envolvidas na produção de semicondutores.

**Primeiros sinais de liderança:**
Mesmo em cargos técnicos de base, Zhang demonstrou habilidades excepcionais de gestão. Ele sabia organizar equipes e resolver problemas técnicos, o que consolidou sua compreensão dos rigorosos padrões de fabricação de semicondutores.

## Período na Texas Instruments: consolidação do talento

### Mudança crucial em 1958

**Admissão na Texas Instruments:**
Em 1958, Zhang Zhongmou ingressou na Texas Instruments (TI)[^5], marcando uma virada decisiva em sua carreira. A TI estava expandindo ativamente seus negócios em semicondutores e precisava de profissionais capazes de unir engenharia e gestão.

**Da engenharia à gestão:**
Na TI, Zhang começou como engenheiro de semicondutores, responsável pela produção de wafers. Ele se destacou tanto tecnicamente quanto na liderança, rapidamente ganhando reconhecimento da alta administração.

**Contribuições para aprimoramento de processos:**
Durante seu tempo na TI, Zhang melhorou significativamente os processos de fabricação de semicondutores, aumentando a eficiência e a taxa de rendimento. Essas melhorias reduziram custos operacionais e ampliaram sua reputação na indústria.

### Estudos avançados na Stanford

**Oportunidade de aprendizado em 1961:**
Em 1961, a TI patrocinou Zhang para fazer um doutorado em engenharia elétrica na Universidade de Stanford. Essa oportunidade refletia o reconhecimento da empresa sobre seu potencial.

**Frutos do doutorado:**
Em 1964, Zhang Zhongmou obteve seu doutorado em engenharia elétrica pela Stanford[^6]. Essa formação aprofundou seu conhecimento teórico e ampliou sua rede de contatos profissionais, facilitando sua promoção ao retornar à TI.

**Nova posição na empresa:**
Após concluir seu doutorado, Zhang retornou à Texas Instruments, assumindo cargos gerenciais de maior responsabilidade. Ele liderou os departamentos de semicondutores, silício e circuitos integrados, com sua posição fortalecendo-se ao longo dos anos.

### Superando barreiras raciais

**Promoção histórica em 1972:**
Em 1972, Zhang foi promovido a vice-presidente da Texas Instruments[^7], tornando-se um dos executivos asiáticos mais altos da cadeia de comando de uma grande corporação norte-americana. Essa promoção era extremamente rara naquele contexto.

**Liderança do grupo de semicondutores:**
Zhang também assumiu o cargo de diretor do grupo de semicondutores da TI, responsável pelo núcleo central dos negócios da empresa. Sob seu comando, os negócios de semicondutores da TI cresceram rapidamente, posicionando-a como um dos principais fornecedores globais.

**Resumo de 25 anos nos EUA:**
Durante seus 25 anos na TI, Zhang evoluiu de um engenheiro de base a um executivo sênior, aprofundando seu entendimento dos rituais técnicos e lógica comercial do setor de semicondutores. Essa experiência foi crucial para sua decisão de retornar a Taiwan em 1987.

## Chamado de Taiwan: período como diretor do ITRI

### Virada de 1985

**Convite de Sun Yun-suan:**
Em 1985, Zhang foi convidado por Sun Yun-suan[^8], então presidente do conselho, o presidente do ITRI, Xu Xianqiu, o primeiro-ministro Yu Zongxian e o membro do conselho Li Guoding, para assumir a presidência do Instituto de Pesquisa Industrial de Taiwan (ITRI). Sun, que havia promovido consistentemente o desenvolvimento da indústria de tecnologia em Taiwan, foi um dos principais impulsionadores desse convite. Essa decisão mudou o rumo de sua vida e o destino da indústria tecnológica de Taiwan.

**Coragem de deixar a zona de conforto:**
Com 54 anos, Zhang já tinha uma carreira estabelecida e uma vida confortável nos Estados Unidos. Decidir retornar a Taiwan era uma escolha arriscada e desafiadora, mas refletia seu senso de missão para o desenvolvimento tecnológico de Taiwan.

**Reformas no ITRI:**
Como diretor do ITRI, Zhang implementou uma gestão baseada em práticas norte-americanas, alinhando a pesquisa e desenvolvimento com as necessidades do mercado. Sua visão internacional transformou o ITRI de uma instituição de pesquisa governamental em um incubador de tecnologia mais voltado ao comércio.

### Avaliação da indústria de semicondutores de Taiwan

**Análise do ambiente industrial:**
Zhang analisou cuidadosamente o ambiente industrial de Taiwan. Ele reconheceu que Taiwan contava com engenheiros talentosos, custos relativamente baixos e uma capacidade de fabricação flexível — condições ideais para o desenvolvimento da indústria de semicondutores.

**Concepção do modelo de terceirização:**
Durante seu tempo no ITRI, Zhang começou a formular uma ideia revolucionária: a fabricação de wafers especializada para terceiros. Essa visão emergiu de sua profunda compreensão das tendências do setor e da experiência acumulada ao longo de sua carreira.

**Importância do apoio governamental:**
Zhang reconheceu que o desenvolvimento da indústria de semicondutores exigia apoio governamental, incluindo financiamento, políticas e formação de talentos. Ele trabalhou em estreita colaboração com autoridades governamentais para garantir financiamento e licenças tecnológicas do ITRI para a fundação da TSMC.

## Nascimento da TSMC: inovação em 1987

### Inovação no modelo de terceirização

**Quebra de paradigmas no modelo de terceirização:**
Em 1987, Zhang Zhongmou propôs a inovação do "modelo de fabricação de wafers especializada para terceiros"[^11]. Diferentemente do modelo tradicional de fabricantes de componentes integrados (IDM), a TSMC se dedicava exclusivamente à fabricação de wafers para clientes, sem desenvolver seus próprios produtos.

**Revolução no modelo comercial:**
Esse modelo revolucionário permitiu que empresas sem capacidade de construir fábricas de wafers pudessem projetar chips avançados, significativamente reduzindo as barreiras de entrada para a indústria de semicondutores e impulsionando o crescimento exponencial das empresas de design de chips desde os anos 1990 até os anos 2020.

**Impacto na ecologia industrial:**
O modelo de terceirização criou uma nova ecologia industrial, permitindo que empresas de design se concentrassem na inovação enquanto as fábricas de wafers focavam na produção, promovendo uma divisão especializada e aumentando a eficiência de todo o setor.

### Processo de fundação da TSMC

**Momento histórico em 21 de fevereiro de 1987:**
Em 21 de fevereiro de 1987, a Taiwan Semiconductor Manufacturing Company foi oficialmente fundada, com um investimento inicial de US$ 145 milhões: US$ 70 milhões do governo (48,3%), US$ 40 milhões da Philips dos Países Baixos (27,5%) e US$ 35 milhões de investidores privados (24,2%)[^9]. Essa parceria entre governo, setor privado e investidores estrangeiros foi um marco na história.

**Estrutura de propriedade:**
Os acionistas iniciais da TSMC incluíam o ITRI, a Philips dos Países Baixos e empresas privadas de Taiwan[^10]. Essa estrutura diversificada proporcionou à TSMC recursos tecnológicos, financeiros e de mercado.

**Dobro de papéis de Zhang:**
Zhang assumiu o cargo de presidente e diretor-geral (posteriormente rebaixado para diretor executivo), liderando a estratégia geral e operações diárias da empresa. Seu estilo de liderança combinava a eficiência da gestão norte-americana com a sabedoria cultural chinesa.

## Trajetória de desenvolvimento da TSMC

### Desafios iniciais e superações

**1987-1990: fase de fundação:**
Nos primeiros anos, a TSMC enfrentou desafios significativos. O modelo de terceirização era inédito, e o mercado resistia a aceitá-lo. Zhang precisava não apenas construir capacidade de fabricação, mas também convencer os clientes a adotar o novo conceito.

**Construção de capacidade técnica:**
A tecnologia inicial da TSMC vinha do ITRI e da parceria com a Philips. Zhang liderou a equipe na rápida absorção e aperfeiçoamento dos processos tecnológicos, estabelecendo uma capacidade de fabricação confiável.

**Aquisição de primeiros clientes:**
Os primeiros clientes da TSMC eram principalmente empresas norte-americanas sem fábricas (fabless). Essas empresas precisavam justamente de serviços de fabricação especializados, fornecendo uma base sólida para os negócios iniciais.

### Crescimento acelerado na década de 1990

**Estratégia de liderança tecnológica:**
Na década de 1990, Zhang implementou a estratégia de "liderança tecnológica", investindo pesadamente em P&D para garantir que a TSMC nunca ficasse atrás da concorrência em nenhuma geração de processos. A TSMC construiu várias fábricas de wafers em Taiwan, expandindo sua base de clientes de empresas norte-americanas para incluir empresas globais como Qualcomm, Broadcom e NVIDIA.

### Liderança no século XXI

**Competitividade em processos avançados:**
No século XXI, o desenvolvimento de tecnologia de processos de semicondutores tornou-se cada vez mais complexo e caro. A TSMC manteve sua posição de liderança graças a investimentos anuais acima da média do setor em P&D.

**Avanços de 28nm a 5nm:**
Das tecnologias de 28nm a 16nm, 7nm, 5nm e 3nm, a TSMC manteve a liderança tecnológica em cada geração, consolidando sua posição no mercado de alta ponta.

**Marco com a Apple:**
A parceria com a Apple, iniciada com os chips A da série em 2013, tornou a TSMC o fornecedor principal de chips para iPhones e iPads, trazendo encomendas massivas e validando comercialmente sua capacidade de processos avançados.[^12]

## Filosofia de gestão e valores corporativos

### Compromisso com a inovação tecnológica

**Ênfase em investimentos de P&D:**
Zhang sempre destacou a importância da inovação tecnológica, mantendo a TSMC investindo cerca de 8% de sua receita anual em P&D para garantir vantagem competitiva tecnológica.[^13] Mesmo diante dos limites físicos da Lei de Moore, a TSMC concluiu a produção em escala de 7nm durante seu mandato; as tecnologias de 5nm (2020) e 3nm (2022) foram concluídas pela equipe sucessora após sua aposentadoria — avanços que forneceram capacidade de fabricação para toda a indústria de semicondutores.

**Equilíbrio entre tecnologia e mercado:**
Zhang sabia equilibrar a liderança tecnológica com as demandas do mercado, mantendo vantagem tecnológica sem comprometer o valor comercial, evitando excessos que aumentariam os custos.

### Desenvolvimento de talentos e cultura corporativa

**Cultura de integridade:**
Zhang estabeleceu uma cultura corporativa baseada na integridade, compromisso, inovação e confiança do cliente. Esses valores tornaram-se a pedra fundamental da identidade da TSMC.

**Desenvolvimento de talentos:**
Zhang valorizou fortemente o desenvolvimento de talentos, criando sistemas de treinamento e promoção estruturados para engenheiros. Ele acreditava que os talentos eram a vantagem competitiva central, e a TSMC manteve uma taxa de rotatividade muito abaixo da média do setor, formando líderes futuros como Liu Derong e Wei Zhiya.

**Gestão internacionalizada:**
Zhang introduziu práticas de gestão norte-americana, como eficiência e transparência, enquanto incorporava a sabedoria cultural chinesa, criando uma cultura corporativa única.

### Pensamento estratégico e execução

**Formulação de estratégias de longo prazo:**
Zhang possuía visão estratégica excepcional, capaz de prever tendências e definir diretrizes de desenvolvimento a longo prazo. A estratégia de "liderança tecnológica" da TSMC refletia sua visão estratégica.

**Ênfase na execução:**
Além de planejar, Zhang também valorizava a execução. Ele estabeleceu sistemas de gestão rigorosos, garantindo que as estratégias fossem implementadas com precisão, o que permitiu à TSMC acompanhar o ritmo de cada geração de processos.

**Sabedoria em crise:**
Diante de crises e desafios, Zhang demonstrou habilidade excepcional de liderança, guiando a TSMC por períodos difíceis e mantendo o crescimento estável da empresa.

## Aposentadoria e sucessão

### Primeira aposentadoria em 2005

**Início do plano de sucessão:**
Em 2005, com 74 anos, Zhang anunciou sua aposentadoria, passando o cargo de diretor executivo para Cao Lixiang[^14]. Essa transição foi parte de um plano de sucessão cuidadosamente elaborado, refletindo seu senso de responsabilidade com a sustentabilidade da empresa.

**Permanência como presidente:**
Embora deixasse o cargo de diretor executivo, Zhang manteve o cargo de presidente, participando ativamente das decisões estratégicas importantes e apoiando a equipe de sucessão.

**Atividades pós-aposentadoria:**
Após a aposentadoria, Zhang não se afastou completamente dos negócios. Ele participou de fóruns internacionais como a APEC representando Taiwan e compartilhou suas visões sobre geopolítica e o futuro dos semicondutores em diversas palestras.

### Retorno em 2009

**Desafios da crise financeira global:**
A crise financeira global de 2008 impactou fortemente a TSMC, enfrentando queda de desempenho e intensificação da competição. Nesse momento crítico, Zhang decidiu retornar.

**Retomada do cargo de diretor executivo:**
Em 2009, com 78 anos, Zhang reassumiu o cargo de diretor executivo da TSMC[^15], liderando pessoalmente a empresa durante o período difícil. Sua volta restaurou a confiança do mercado e forneceu liderança para a recuperação da empresa.

**Formação de Liu Derong e Wei Zhiya:**
Durante seu segundo mandato, Zhang focou em desenvolver Liu Derong e Wei Zhiya como sucessores, preparando o terreno para o futuro da empresa.

### Aposentadoria definitiva em 2018

**Conclusão do plano de sucessão:**
Em junho de 2018, com 87 anos, Zhang se aposentou oficialmente, encerrando uma carreira de 31 anos na TSMC[^16]. Ele passou o cargo de presidente para Liu Derong e o de diretor executivo para Wei Zhiya.

**Implementação do modelo de "dois líderes":**
Zhang estabeleceu o modelo de "dois líderes", com Liu Derong como presidente responsável por relações externas e Wei Zhiya como diretor executivo responsável por operações internas, promovendo estabilidade e continuidade na empresa.

**Modelo de aposentadoria exemplar:**
A aposentadoria de Zhang foi considerada um modelo para a sucessão corporativa, pois ele sabia quando deixar o poder, permitindo que a nova geração de líderes tivesse espaço para atuar, garantindo uma transição suave da empresa.

## Impacto na indústria global de semicondutores

### Inovação no modelo comercial

**Popularização do modelo de terceirização:**
O modelo de terceirização criado por Zhang tornou-se um dos modelos comerciais padrão da indústria de semicondutores. Centenas de empresas sem fábricas dependem dos serviços de fábricas de terceiros, impulsionando significativamente o desenvolvimento do setor.

**Reestruturação da ecologia industrial:**
O modelo de terceirização redefiniu a ecologia da indústria de semicondutores, promovendo divisão especializada, aumentando a eficiência e reduzindo as barreiras para a inovação, permitindo que mais empresas participassem do design de chips.

**Construção da cadeia global de suprimentos:**
A TSMC tornou-se um nó essencial na cadeia global de semicondutores, fornecendo serviços de fabricação para empresas tecnológicas em todo o mundo, estabelecendo uma cadeia de suprimentos verdadeiramente globalizada.

### Impulsionamento do avanço tecnológico

**Liderança em tecnologia de processos:**
Sob o comando de Zhang, a TSMC manteve uma posição de liderança global em tecnologia de processos, impulsionando o avanço tecnológico em toda a indústria de semicondutores e mantendo viva a Lei de Moore.

**Democratização de processos avançados:**
Os serviços de processos avançados da TSMC permitiram que empresas menores também pudessem utilizar as tecnologias mais recentes, democratizando o acesso a processos avançados — mesmo uma startup de dezenas de funcionários pode ter chips de 7nm produzidos pela TSMC.

**Exploração de novas áreas tecnológicas:**
A capacidade de fabricação da TSMC abrange chips digitais, aceleradores de IA, semicondutores automotivos e outras aplicações, fornecendo a base de fabricação para diversas tecnologias emergentes.

## Significado para Taiwan: fundador da "ilha tecnológica"

### Desenvolvimento da indústria tecnológica

**Construção da "montanha protetora":**
A TSMC é conhecida como a "montanha protetora" de Taiwan, não apenas por seu valor econômico massivo, mas por sua posição indispensável na cadeia global de tecnologia. Zhang forneceu a Taiwan uma peça estratégica de defesa que não pode ser substituída.

**Formação de talentos tecnológicos:**
O desenvolvimento da TSMC cultivou grandes quantidades de talentos especializados em semicondutores, que não apenas apoiaram o crescimento da TSMC, mas também forneceram a base de talentos para toda a indústria tecnológica de Taiwan.

**Formação de agrupamentos industriais:**
Com a TSMC como núcleo, Taiwan formou um agrupamento industrial de semicondutores que incluía fornecedores de equipamentos, materiais e serviços de encapsulamento e teste, criando um valor industrial imenso.

### Contribuições para o desenvolvimento econômico

**Contribuição significativa para o PIB:**
A TSMC tornou-se a maior empresa de Taiwan, contribuindo significativamente para o PIB do país. O sucesso da empresa também impulsionou o desenvolvimento de indústrias relacionadas, criando grandes quantidades de empregos.

**Pilar das exportações:**
Os semicondutores representam cerca de um terço das exportações totais de Taiwan, e o sucesso da TSMC elevou significativamente a posição de Taiwan no comércio global, fortalecendo a competitividade econômica de Taiwan.

**Melhoria do ambiente de investimento:**
O caso de sucesso da TSMC atraiu mais investimentos internacionais, melhorando o ambiente de investimento de Taiwan e elevando a posição de Taiwan no coração dos investidores globais.

### Impacto geopolítico

**Importância da soberania tecnológica:**
Na atualidade de intensa competição geopolítica, a tecnologia de semicondutores tornou-se um ponto central de competição entre potências. A TSMC, com suas tecnologias de processos mais avançadas, conferiu a Taiwan uma posição estratégica indispensável na comunidade internacional.

**Peso na diplomacia internacional:**
A posição central da TSMC na cadeia global de tecnologia conferiu a Taiwan uma voz influente nos assuntos de semicondutores, com países como Estados Unidos, União Europeia e Japão competindo para convidá-la a instalar fábricas — uma prova concreta dessa posição estratégica.

**Considerações de segurança:**
A importância dos semicondutores também trouxe novos desafios e oportunidades de segurança para Taiwan. Como equilibrar os interesses de diferentes partes e manter a vantagem competitiva da TSMC, tornou-se um dos principais temas de política externa e de segurança de Taiwan.

## Características pessoais e estilo de liderança

### Combinação de visão e execução

**Excelência estratégica:**
A maior característica de Zhang é sua visão estratégica excepcional. Ele podia prever tendências e antecipar diretrizes futuras, e essa visão foi a chave para o sucesso da TSMC.

**Capacidade prática de execução:**
Além de sua visão, Zhang também possuía habilidades excepcionais de execução. Ele podia transformar ideias estratégicas em planos de ação concretos e supervisionar cada detalhe, uma combinação rara no mundo empresarial.

**Mentalidade de aprendizado contínuo:**
Mesmo na idade avançada, Zhang mantinha o hábito de ler amplamente e seguir o desenvolvimento da indústria. Ele mantinha a rotina de ler dois livros em inglês por mês e nunca interromperia a leitura do jornal _The New Yorker_ por 70 anos; ele próprio disse que "nenhum desses livros é literatura". Essa atitude manteve sua mente alerta e perspicaz até os dias finais.

### Estilo de liderança

**Liderança carismática:**
Zhang possuía carisma e persuasão pessoais excepcionais, capazes de inspirar equipes a perseguir objetivos comuns. Suas palestras e artigos sempre expressavam conceitos complexos de forma clara, conquistando o respeito de funcionários e da indústria.

**Decisões baseadas em razão:**
Diante de decisões importantes, Zhang sempre optava por análises racionais e fundamentadas em dados, evitando deixar emoções ou considerações políticas interferirem na precisão das decisões.

**Visão de longo prazo:**
Zhang mantinha firme sua visão de longo prazo, nunca deixando-se levar por dificuldades temporárias ou interesses imediatos. Mesmo no auge da crise financeira de 2008, ele aprovou orçamentos de P&D para processos avançados — uma decisão que ampliou a vantagem da TSMC sobre os concorrentes após a crise.

## Reconhecimentos e honrarias

### Reconhecimentos internacionais

**Medalhas honrosas da IEEE:**
Zhang recebeu diversas medalhas de reconhecimento da IEEE (Instituto de Engenheiros Eletricistas e Eletrônicos), uma homenagem ao seu contributo para o desenvolvimento da tecnologia de semicondutores.

**Doutorados honorários:**
Várias universidades, incluindo Tsinghua, Nacional de Taiwan e Universidade de Taiwan, concederam a Zhang títulos de doutor honoris causa, reconhecendo sua contribuição para a indústria tecnológica e a educação.

**Reconhecimento da imprensa comercial:**
Zhang foi eleito repetidamente entre os líderes mais influentes da indústria tecnológica por revistas internacionais como _Fortune_ e _Business Week_, consolidando sua posição na vanguarda do mundo empresarial global.

### Reconhecimentos em Taiwan

**Honrarias governamentais:**
O governo de Taiwan concedeu a Zhang diversas honrarias importantes, reconhecendo sua contribuição excepcional para o desenvolvimento econômico e tecnológico de Taiwan.

**Respeito da indústria:**
Zhang é amplamente respeitado como o "pai do semicondutor" em Taiwan, e sua experiência e sabedoria tornaram-se referência para empreendedores posteriores.

**Influência social:**
Além de seus feitos comerciais, a influência social de Zhang também foi amplamente reconhecida, com seu contributo para o desenvolvimento social de Taiwan recebendo elogios de toda a sociedade.

## Reflexões filosóficas e sabedoria de vida

### Compreensão do sucesso

**União de capacidade e oportunidade:**
Zhang acredita que o sucesso depende da combinação de capacidade e oportunidade. A capacidade é a base, mas é preciso saber aproveitar o momento certo. Ele enfatiza a importância da preparação, pois as oportunidades tendem a favorecer os que estão preparados.

**Valor da persistência a longo prazo:**
Zhang destaca a importância de persistir a longo prazo, acreditando que o verdadeiro sucesso requer acumulação de tempo. Não se deve buscar resultados imediatos. O sucesso da TSMC é fruto dessa persistência a longo prazo.

**Necessidade da inovação:**
Zhang considera a inovação uma condição essencial para a sobrevivência na indústria de tecnologia. A história da TSMC prova que, se parar de inovar em processos, os concorrentes rapidamente ocuparão a lacuna.

### Reflexões sobre a vida

**Equilíbrio entre trabalho e vida:**
Apesar de seu grande sucesso profissional, Zhang também enfatiza a importância do equilíbrio entre trabalho e vida. Ele gosta de ler e ouvir música, hobbies que proporcionam nutrição espiritual.

**Responsabilidade social:**
Zhang acredita que empreendedores de sucesso têm a responsabilidade de retribuir à sociedade. Ele liderou a TSMC em doações à Universidade Nacional de Tsinghua e participou de debates sobre políticas educacionais, propondo sugestões concretas para a reforma da educação superior em Taiwan.

**Importância da transmissão de conhecimento:**
Zhang valoriza a transmissão de conhecimento e experiência, não apenas cultivando sucessores internos, mas também compartilhando sua sabedoria por meio de diversos canais, contribuindo para o desenvolvimento da próxima geração.

## Avaliação histórica

Quando Zhang se aposentou em 2018, a TSMC já havia ultrapassado a Intel em valor de mercado, tornando-se a empresa de semicondutores mais valiosa do mundo. Ele usou 31 anos para provar uma ideia contra-intuitiva: uma fábrica de wafers que não projetava seus próprios chips poderia se tornar a base da fabricação da era digital.

De Ningbo, Zhejiang, a Harvard e MIT, da alta direção da TI ao sacrificar uma vida confortável nos EUA aos 54 anos para retornar a Taiwan — cada uma de suas escolhas foi uma decisão fora do comum, mas todas apontavam na mesma direção. A posição da TSMC hoje é tanto o resultado da competição tecnológica quanto a aposta que ele fez em 1987 nesse modelo de negócios pouco acreditado.

O valor de mercado da TSMC ultrapassou pela primeira vez os 10 trilhões de dólares taiuanos em julho de 2020 e os 20 trilhões em março de 2024, tornando-a uma das empresas tecnológicas mais valiosas da Ásia. Essa escala era impensável em 1987, quando Zhang fez sua aposta, e é a prova mais clara de seu legado.

## Leituras recomendadas

- [Empresas de Taiwan: TSMC](/pt/economy/tsmc) — A "montanha protetora" fundada por Zhang em 1987 com o modelo de fabricação de wafers, hoje com valor de mercado superior a 60 trilhões, é a própria encarnação do legado de Zhang
- [Shi Zhenrong](/pt/people/stan-shih) — O fundador da Acer que serviu como diretor da TSMC por 21 anos e autor da "curva sorridente"; a "manufatura intermediária" feita pela TSMC é exatamente a parte mais valiosa dessa curva, que todos esperavam que desabar
- [Guo Taiqing](/pt/people/terry-gou) — Outro empreendedor taiwanês que mudou o mundo com o modelo de terceirização, a manufatura de montagem da Foxconn e a fabricação de wafers da TSMC são os dois caminhos pelos quais Taiwan levou sua produção ao mundo
- [Indústria de semicondutores](/pt/technology/taiwan-semiconductor-industry) — Desde a transferência tecnológica da RCA em 1976 até a "montanha protetora", o campo de batalha inteiro que Zhang levou Taiwan a entrar
- [Huang Zhongcheng](/pt/people/frank-huang-psmc) — A pessoa que procurou Zhang quando a Force Semiconductor quase foi absorvida pela United Semiconductor no final dos anos 1990, tomando um caminho ainda mais perigoso na indústria de semicondutores de Taiwan
- [Transformação e upgrade industrial de Taiwan](/pt/economy/industrial-transformation-from-manufacturing-to-innovation) — A TSMC é o caso mais concreto de como Taiwan evoluiu de "ilha da terceirização" para "ilha da tecnologia", e também o ponto central dessa transformação de quarenta anos

---

## Referências

[^1]: Zhang Zhongmou nasceu em 10 de julho de 1931 na cidade de Ningbo, província de Zhejiang, China. Consulte: Wikipedia "Zhang Zhongmou" <https://zh.wikipedia.org/zh-hant/%E5%BC%B5%E5%BF%A0%E8%AC%80>

[^2]: Em 1949, ingressou na Universidade de Harvard para estudar letras, transferindo-se para o MIT um ano depois para engenharia mecânica. Consulte: Wikipedia "Zhang Zhongmou" <https://zh.wikipedia.org/zh-hant/%E5%BC%B5%E5%BF%A0%E8%AC%80>

[^3]: Em 1952, obteve o diploma de bacharel em engenharia mecânica pelo MIT. Consulte: Wikipedia "Zhang Zhongmou" <https://zh.wikipedia.org/zh-hant/%E5%BC%B5%E5%BF%A0%E8%AC%80>

[^4]: A partir de 1955, trabalhou por cerca de três anos na Sylvania realizando tarefas de fabricação de semicondutores. Consulte: Wikipedia "Zhang Zhongmou" <https://zh.wikipedia.org/zh-hant/%E5%BC%B5%E5%BF%A0%E8%AC%80>

[^5]: Em 1958, ingressou na Texas Instruments como engenheiro de semicondutores. Consulte: Wikipedia "Zhang Zhongmou" <https://zh.wikipedia.org/zh-hant/%E5%BC%B5%E5%BF%A0%E8%AC%80>

[^6]: Em 1964, obteve o doutorado em engenharia elétrica pela Universidade de Stanford. Consulte: Wikipedia em inglês "Morris Chang" <https://en.wikipedia.org/wiki/Morris_Chang>

[^7]: Em 1972, foi promovido a vice-presidente da Texas Instruments e diretor do grupo de semicondutores. Consulte: Wikipedia "Zhang Zhongmou" <https://zh.wikipedia.org/zh-hant/%E5%BC%B5%E5%BF%A0%E8%AC%80>

[^8]: Sun Yun-suan (1913–2006), ex-presidente do conselho (1978–1984), promoveu consistentemente a indústria de semicondutores e tecnologia. Consulte: Wikipedia "Sun Yun-suan" <https://zh.wikipedia.org/wiki/%E5%AD%AB%E9%81%8B%E7%92%87>

[^9]: A TSMC foi fundada em 21 de fevereiro de 1987; investimento governamental de US$ 70 milhões (48,3%), Philips US$ 40 milhões (27,5%), investidores privados US$ 35 milhões (24,2%). Consulte: Wikipedia "Taiwan Semiconductor Manufacturing" <https://zh.wikipedia.org/wiki/%E5%8F%B0%E7%81%A3%E7%A9%8D%E9%AB%94%E9%9B%BB%E8%B7%AF%E8%A3%BD%E9%80%A0>

[^10]: Os acionistas iniciais da TSMC incluíam a Philips dos Países Baixos. Consulte: Wikipedia "Taiwan Semiconductor Manufacturing" <https://zh.wikipedia.org/wiki/%E5%8F%B0%E7%81%A3%E7%A9%8D%E9%AB%94%E9%9B%BB%E8%B7%AF%E8%A3%BD%E9%80%A0>

[^11]: Em 1987, Zhang Zhongmou propôs o modelo de "fabricação de wafers especializada para terceiros". Consulte: Wikipedia "Taiwan Semiconductor Manufacturing" <https://zh.wikipedia.org/wiki/%E5%8F%B0%E7%81%A3%E7%A9%8D%E9%AB%94%E9%9B%BB%E8%B7%AF%E8%A3%BD%E9%80%A0>

[^12]: A TSMC começou a fabricar chips A da Apple em 2010, tornando-se o fornecedor principal de chips para iPhone a partir de 2013. Consulte: Wikipedia "Taiwan Semiconductor Manufacturing" <https://zh.wikipedia.org/wiki/%E5%8F%B0%E7%81%A3%E7%A9%8D%E9%AB%94%E9%9B%BB%E8%B7%AF%E8%A3%BD%E9%80%A0>

[^13]: A TSMC mantém anualmente cerca de 8% de sua receita em P&D (com variações leves entre os anos). Consulte: Wikipedia "Taiwan Semiconductor Manufacturing" <https://zh.wikipedia.org/wiki/%E5%8F%B0%E7%81%A3%E7%A9%8D%E9%AB%94%E9%9B%BB%E8%B7%AF%E8%A3%BD%E9%80%A0>

[^14]: Em 2005, Zhang deixou o cargo de diretor executivo, sendo substituído por Cao Lixiang. Consulte: Wikipedia "Zhang Zhongmou" <https://zh.wikipedia.org/zh-hant/%E5%BC%B5%E5%BF%A0%E8%AC%80>

[^15]: Em 2009, Zhang, com 78 anos, retornou como diretor executivo da TSMC devido à crise financeira global. Consulte: Wikipedia "Zhang Zhongmou" <https://zh.wikipedia.org/zh-hant/%E5%BC%B5%E5%BF%A0%E8%AC%80>

[^16]: Em 5 de junho de 2018, Zhang se aposentou oficialmente; Liu Derong assumiu a presidência e Wei Zhiya o cargo de diretor executivo. Consulte: Wikipedia "Zhang Zhongmou" <https://zh.wikipedia.org/zh-hant/%E5%BC%B5%E5%BF%A0%E8%AC%80>

[^17]: [Economia de Taiwan — Wikipédia em chinês](https://zh.wikipedia.org/wiki/%E5%8F%B0%E7%81%A3%E7%B6%93%E6%BF%9F) — Semicondutores representam cerca de 30% das exportações totais de Taiwan.

[^18]: [Evento de celebração do centenário do "Instituto de Gestão da Tecnologia — Edifício TSMC" — Universidade Nacional de Tsinghua](https://www.nthu.edu.tw/hotNews/content/708) — A TSMC doou 180 milhões de dólares taiuanos para construir o "Edifício TSMC" na faculdade de administração da Universidade Nacional de Tsinghua, concluído em abril de 2008; o doador foi a TSMC, não Zhang Zhongmou pessoalmente.

[^19]: Em 2018, quando Zhang se aposentou, a TSMC já havia ultrapassado a Intel em valor de mercado. Consulte: Wikipedia "Taiwan Semiconductor Manufacturing" <https://zh.wikipedia.org/wiki/%E5%8F%B0%E7%81%A3%E7%A9%8D%E9%AB%94%E9%9B%BB%E8%B7%AF%E8%A3%BD%E9%80%A0>

[^20]: A TSMC ultrapassou pela primeira vez os 10 trilhões de dólares taiuanos em 21 de julho de 2020 e os 20 trilhões em 8 de março de 2024. Consulte: Wikipedia "Taiwan Semiconductor Manufacturing" <https://zh.wikipedia.org/wiki/%E5%8F%B0%E7%81%A3%E7%A9%8D%E9%AB%94%E9%9B%BB%E8%B7%AF%E8%A3%BD%E9%80%A0>

_Referências:_

- [Autobiografia de Zhang Zhongmou (Volume 1 + Volume 2)](https://www.books.com.tw/products/0010784799)
- [Relatórios anuais e dados oficiais da TSMC](https://investor.tsmc.com/english/annual-reports)
- [Instituto de Pesquisa Industrial de Taiwan (ITRI)](https://www.itri.org.tw/)
- [Wikipedia "Zhang Zhongmou"](https://zh.wikipedia.org/zh-hant/%E5%BC%B5%E5%BF%A0%E8%AC%80)
- [Materiais relacionados a Zhang Zhongmou da Universidade Nacional de Tsinghua](https://www.nthu.edu.tw/)
