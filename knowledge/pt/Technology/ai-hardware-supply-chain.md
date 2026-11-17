---
title: 'Cadeia de suprimentos de hardware de IA: Onde Taiwan transforma a nuvem em máquinas'
description: 'A IA generativa parece um serviço de nuvem, mas exige uma infraestrutura física: design de chips, fabricação de wafers, encapsulamento, memória, energia, resfriamento e montagem. A importância de Taiwan vai além da TSMC; o país concentra pontos críticos dessa cadeia, gerando interesses comuns que envolvem recursos hídricos, emissões de carbono e riscos geopolíticos.'
date: 2026-07-11
category: 'Technology'
tags:
  [
    'Hardware de IA',
    'Semicondutores',
    'Cadeia de suprimentos',
    'Servidores de IA',
    'Processos avançados',
    'Encapsulamento avançado',
    'Indústria tecnológica de Taiwan',
  ]
subcategory: '半導體與硬體'
author: 'Taiwan.md Contributors'
featured: false
lastVerified: 2026-07-11
lastHumanReview: false
researchReport: 'reports/research/2026-07/半導體供應鏈草稿地圖.md'
rationale:
  why_this_hook: '從「兆元宴」座位表切入，讓讀者先看見 AI 硬體供應鏈不是單一公司，而是一整組台灣工程節點。'
  whats_excluded: '不做完整產業百科，也不逐一列出台灣所有半導體、伺服器與零組件公司。'
  where_it_hedges: '把台灣的供應鏈價值與水電、碳排、所得分配、海外設廠、地緣政治風險一起處理。'
  whos_pushing_back: '全球客戶與盟友一方面需要台灣，另一方面也透過海外設廠降低對台灣海峽周邊產能的單點依賴。'
image: '/article-images/technology/ai-hardware-supply-chain-flow.svg'
imageCredit: 'Taiwan.md Contributors'
imageLicense: 'CC BY-SA 4.0'
translatedFrom: 'Technology/AI硬體供應鏈.md'
sourceCommitSha: '1ec0df23b'
sourceContentHash: 'sha256:de7f4ddf0c4e6168'
sourceBodyHash: 'sha256:fb0ee951dd4978bf'
translatedAt: '2026-11-02T05:45:38+08:00'
---

# Cadeia de suprimentos de hardware de IA: Onde Taiwan transforma a nuvem em máquinas

> **Resumo de 30 segundos:** A IA parece ser apenas responder perguntas em uma tela, mas por trás disso existe um longo revezamento físico. Alguém gera a demanda, alguém projeta o chip, alguém o fabrica, e alguém combina chips, memória, resfriamento, energia e placas-mãe para criar máquinas que são enviadas aos centros de dados. A importância de Taiwan não se resume ao fato de a "TSMC ser forte"; vários elos cruciais desse revezamento estão em Taiwan. Esse interesse comum é real, mas não é uma garantia; ele traz simultaneamente pressões sobre recursos hídricos, energia, emissões de carbono, distribuição de renda, fábricas no exterior e geopolítica.

Em 28 de maio de 2026, Jensen Huang (黄仁勋) organizou um jantar em Taipé. A mídia o chamou de "Jantar de Trilhões", devido ao valor de mercado astronômico das empresas representadas pelos convidados. Mas o que realmente vale a pena observar naquele jantar não é quem ocupava a mesa principal, nem o valor total dessas empresas.

O que realmente importa é a lista de presença.

Na fabricação de wafers, temos Wei Zhe-jia (魏哲家) da TSMC; na montagem de servidores e racks de IA, temos Liu Yang-wei (刘扬伟) da Foxconn, Lin Bai-li (林百里) da Quanta, Lin Xian-ming (林宪铭) da Wistron e Hung Li-ning (洪丽宁) da Wiwynn. No design de ICs, temos Tsai Li-hsing (蔡力行) da MediaTek. Em energia e resfriamento, Zheng Ping (郑平) da Delta Electronics, Qiu Sen-bin (邱森彬) da Lite-On e Shen Qing-xing (沈庆行) da Auras Technology. Nas placas-mãe e marcas finais, temos Shi Chong-tang (施崇棠) da ASUS, Ye Pei-cheng (叶培城) da Gigabyte e Chen Jun-sheng (陈俊圣) da Acer. As categorias de cadeia de suprimentos listadas pela Central News Agency no relatório — desde fabricação de wafers, encapsulamento e teste, módulos de resfriamento, gerenciamento de energia e placas-mãe até montagem ODM/EMS e marcas — são quase um corte transversal de um servidor de IA aberto. [^1]

![Jensen Huang segurando uma GPU RTX Blackwell durante seu discurso principal na CES 2025; o logotipo da NVIDIA e o novo módulo de chip de IA podem ser vistos contra o fundo preto do palco](/article-images/technology/jensen-huang-ces-2025-blackwell.webp)

_Jensen Huang exibindo a GPU RTX Blackwell em seu discurso na CES 2025. Esta imagem traz a "IA" da interface de software de volta para o hardware físico nas mãos. Foto: Steve Jurvetson. CC BY 2.0 via Wikimedia Commons._

Não foi um jantar corporativo comum. Foi como colocar uma questão sobre a mesa: quando o mundo diz que precisa de Taiwan para a IA, do que exatamente ele precisa?

A resposta não é apenas uma empresa, nem apenas um chip. É mais parecido com um caminho: começa com uma frase como "precisamos de mais poder computacional de IA" e percorre chips, fábricas, encapsulamento, energia, resfriamento, placas-mãe e racks, até chegar ao centro de dados. Taiwan está posicionada em vários pontos críticos desse caminho.

## Primeiro, pense na IA como um serviço que precisa de um corpo

O público geral interage com a IA geralmente através de celulares, computadores ou páginas da web. Você digita um texto e a resposta aparece. Parece mágica, ou um serviço de nuvem sem peso.

![Pavilhão de Exposições de Nangang em Taipé durante a Computex; corredores amplos ladeados por estandes de fornecedores de tecnologia e multidões, mostrando como a cadeia de suprimentos de hardware de Taiwan é visível em feiras](/article-images/technology/computex-nangang-floor-2015.webp)

_Exposição Computex no Centro de Exposições de Nangang, Taipé. A cadeia de suprimentos de hardware de IA não existe apenas nos relatórios financeiros, mas é vista concretamente em pavilhões, protótipos, racks e reuniões de negócios. Foto: Solomon203. CC BY-SA 4.0 via Wikimedia Commons._

Mas para a IA responder perguntas, deve haver máquinas realizando cálculos por trás. Essas máquinas ficam em centros de dados, consomem eletricidade, geram calor, precisam de manutenção e precisam ser fabricadas, montadas e entregues aos clientes.

Você pode pensar na IA como um grande restaurante: você vê o garçom trazendo o prato à mesa, mas não vê o design do menu, as compras, a cozinha, o gás, a água, a eletricidade, a refrigeração, o fluxo de saída dos pratos e a limpeza. A IA é igual. Você vê a resposta na tela, mas por trás há uma cozinha completa de hardware.

A posição de Taiwan está justamente em muitas das bancadas de trabalho importantes dessa cozinha.

## Como um pedido se transforma em um rack

Uma cadeia de suprimentos de hardware de IA geralmente começa com uma necessidade comum: empresas de nuvem, desenvolvedoras de modelos ou grandes corporações precisam de mais poder computacional. Isso soa como comprar um serviço de nuvem, mas logo se transforma em uma série de problemas físicos: que chip deve ser projetado? Onde ele pode ser fabricado? Como a memória se aproxima dele? Como o calor é dissipado? Como a energia é entregue? E, finalmente, quem monta esses componentes caros em máquinas que podem ser entregues, mantidas e colocadas em centros de dados?

![Fluxograma da cadeia de suprimentos de hardware de IA: A demanda de IA passa pelo design de chips, processos avançados, encapsulamento avançado, HBM e substratos, resfriamento e energia, placas-mãe, ODM/EMS, racks de IA e finalmente entra no centro de dados; o gráfico destaca os pontos críticos de engenharia onde Taiwan é altamente concentrada, como processos, encapsulamento, eletricidade e calor, placas, montagem e racks](/article-images/technology/ai-hardware-supply-chain-flow.svg)

_Diagrama ilustrativo criado pelo Taiwan.md. Este gráfico não é um mapa de participação de mercado ou um mapa completo de empresas; ele serve para ilustrar um caminho central: como a demanda de IA se transforma em máquinas alimentadas, resfriadas e prontas para entrega._

O design de chips na ponta inicial está majoritariamente nas mãos de empresas como NVIDIA, AMD, Broadcom, Google, Amazon e Microsoft. Um dos locais estratégicos de Taiwan é quando o projeto precisa se tornar um chip físico. A rota tecnológica oficial da TSMC lista processos lógicos de 7nm, 5nm, 3nm, 2nm, A16, A14, etc., com o N2 marcado para produção em massa no quarto trimestre de 2025. [^2] Para muitos chips de IA, este é o ponto onde o design toca o solo de Taiwan pela primeira vez.

Mas fabricar o chip não significa que a IA possa entrar no ar: os chips de IA precisam estar próximos da memória e precisam conectar diferentes dies (matrizes de silício) em um sistema capaz de cooperar em alta velocidade. A TSMC descreve o 3DFabric como uma combinação de tecnologias de empilhamento de silício 3D e encapsulamento avançado, incluindo SoIC, CoWoS e InFO. Quando a Associated Press relatou sobre a nova fábrica da Silican (矽品) em Taichung, também colocou isso no contexto do fortalecimento da produção de chips de IA. [^3][^4] Aqui, o papel de Taiwan começa a se estender de "fabricar o chip" para "conectar os chips em módulos funcionais".

Seguindo adiante, a cadeia de suprimentos deixa de ser uma linha reta. A memória de alta largura de banda (HBM) é dominada principalmente por empresas coreanas. Equipamentos, materiais e softwares de design envolvem fornecedores dos EUA, Holanda, Japão e Europa. As plataformas de nuvem e serviços de modelos estão majoritariamente nos EUA. Taiwan não detém o monopólio de cada etapa, nem captura o maior lucro em todas elas. Sua singularidade reside no fato de que nós críticos — fabricação de wafers, encapsulamento, teste, substratos, energia, resfriamento, placas-mãe e montagem completa — estão muito próximos uns dos outros, habituados a resolver problemas de engenharia em conjunto.

![Diagrama de camadas de um servidor de IA: chips e aceleradores, placas e placas-mãe, energia e resfriamento, servidores e racks, centros de dados, empilhados sequencialmente para mostrar como uma GPU se torna uma infraestrutura de IA operacional](/article-images/technology/ai-server-rack-stack.svg)

_Diagrama ilustrativo criado pelo Taiwan.md. A GPU é apenas um dos núcleos do servidor de IA; ela precisa ser conectada a placas, energia, resfriamento, ao sistema completo, ao rack e ao centro de dados._

Na fase de montagem completa, os problemas tornam-se muito concretos. Quanto mais forte o chip, maior a corrente elétrica e mais difícil é dissipar o calor. Placas-mãe, energia, resfriamento, gabinete, sistemas de gerenciamento e cronogramas de entrega movem-se juntos. Empresas como Foxconn, Quanta, Wistron, Wiwynn, Inventec (英業達), Compal (仁寶) e Pegatron (和碩) assumem o trabalho de transformar chips, placas, energia, resfriamento e design mecânico em servidores e racks de IA. Quando a Central News Agency reportou sobre a entrega da nova plataforma da Foxconn, também o fez no contexto da demonstração de sistemas de servidores de IA. [^10]

Portanto, o que esse fluxograma deve mostrar é: o valor de Taiwan não está apenas em uma empresa ou em um único chip, mas na capacidade de transformar produtos complexos — do wafer ao encapsulamento até o rack e o centro de dados — em distâncias e tempos muito curtos. Essa densidade é o que diferencia Taiwan das bases de fabricação de baixo custo comuns.

Para o leitor comum, esse caminho oferece uma forma de ler as notícias. Da próxima vez que vir uma empresa anunciando uma nova plataforma de IA, não pergunte apenas quem projetou o chip; pergunte também: onde é o encapsulamento? Quem faz a máquina completa? Quem cuida da energia e do calor? Quem assume o prazo de entrega e a manutenção? Ao fazer essas perguntas, o contorno de Taiwan na cadeia de suprimentos se tornará mais claro, concreto e fácil de avaliar.

## O semicondutor é a porta de entrada, não o destino final

É conveniente descrever a indústria tecnológica de Taiwan como "apenas a TSMC", mas isso faz com que se perca muita coisa.

A fábrica de wafers responde à pergunta: "o chip pode ser fabricado?". A cadeia de suprimentos de hardware de IA precisa responder a outras perguntas: O chip pode ser conectado à memória? Ele pode ser alimentado, resfriado, testado e mantido? Ele pode ser montado em racks, fileiras ou centros de dados inteiros dentro do prazo exigido pelo cliente?

O que realmente deve ser questionado é o que cada etapa está tentando resolver em termos de limitações. O processo lógico de ponta resolve "se podemos colocar mais transistores em um chip menor e mais econômico". O encapsulamento avançado resolve "quando um único chip não é suficiente, se podemos conectar chips de computação, memória e diferentes dies de forma próxima e rápida". Já o servidor de IA exige outra coisa: se esses componentes caros podem ser transformados em uma máquina estável, reparável, produzível em massa e entregável.

Portanto, resfriamento e energia não são coadjuvantes. Quanto mais forte o chip, maior a corrente e mais difícil o calor. Se a energia for instável ou o calor não for dissipado, até o chip mais avançado terá que reduzir a velocidade ou nem sequer poderá operar. Os processos maduros também não desaparecem por causa disso, pois uma máquina de IA ainda precisa de muitos chips de controle, conexão, gerenciamento de energia e periféricos. Os processos de ponta são como o motor; os processos maduros e os componentes são como os freios, o sistema de combustível, o painel e o sistema de arrefecimento. Sem qualquer uma dessas partes, o carro não roda com confiabilidade.

Neste grande quadro, basta entender uma coisa: o semicondutor é a porta de entrada, não o destino final. Para que a IA realmente funcione, ela precisa atravessar todo um caminho que transforma chips em máquinas.

É por isso que "Taiwan tem valor" não deve ser apenas um consolo abstrato. Isso deve poder ser decomposto em um gráfico: quem faz o wafer, quem faz o encapsulamento, quem faz o resfriamento, quem faz a energia, quem faz a placa-mãe, quem monta a máquina completa, quem assume o prazo de entrega, quem arca com os custos de água e eletricidade, e quem é o primeiro a sofrer cortes de pedidos quando a economia vira.

Este gráfico também ajuda a decifrar a linguagem das notícias: quando um empresário diz "Taiwan é um parceiro", você pode perguntar se ele depende do processo, do encapsulamento, da ODM ou da velocidade de resposta de todo o sistema. Quando um político fala em "interesses comuns", você pode perguntar em quais empresas, cidades e trabalhadores esses interesses estão concentrados. Quando um investidor diz que "as perspectivas para a IA são boas", você pode questionar se esse otimismo recai sobre o design de chips, a capacidade de encapsulamento, a montagem de servidores ou os componentes de resfriamento e energia. Uma vez que os slogans abstratos são decompostos em camadas, torna-se mais difícil para o leitor ser levado apenas pela emoção.

## O interesse comum é real, mas não é mágica

A posição de Taiwan na cadeia de suprimentos de hardware de IA cria, de fato, interesses comuns.

Para a NVIDIA, os gigantes da nuvem e as empresas globais de IA, Taiwan é o lugar onde transformam design em produto. Para países como EUA, Japão e Europa, Taiwan é um nó de suprimento inevitável para chips avançados e infraestrutura de IA. Para Taiwan, essa relação de necessidade traz exportações, investimentos, empregos, visibilidade no mercado de ações e influência política internacional.

Ao reportar sobre a economia de IA de Taiwan em 2026, a Associated Press colocou o forte crescimento, o aumento das exportações e a expansão da presença da NVIDIA em Taiwan no mesmo contexto que as bolhas de IA, riscos geopolíticos e desigualdade de renda. [^5] Essa justaposição é importante porque lembra ao leitor: o interesse comum não é uma proteção unilateral, nem um amuleto que nunca falha.

Outros países estão se esforçando para mover parte da cadeia de suprimentos para fora. A TSMC estabelecendo fábricas nos EUA, Japão e Alemanha prova, por um lado, que o mundo precisa da TSMC; por outro, representa que clientes e governos não querem apostar todos os riscos em Taiwan. Fábricas no exterior podem não replicar a densidade completa de Taiwan a curto prazo, mas mudarão a estrutura de negociação a longo prazo.

Além disso, interesses corporativos não são iguais aos interesses nacionais. A NVIDIA quer fornecimento estável e alta margem de lucro. A TSMC quer liderança tecnológica e clientes globais. As fabricantes ODM querem pedidos e taxa de utilização de capacidade. A sociedade de Taiwan quer salários, habitação, segurança energética, sustentabilidade ambiental e garantias de segurança. Esses interesses se sobrepõem, mas também conflitam.

Todos à mesa são importantes, mas o poder não é distribuído igualmente. A NVIDIA detém a arquitetura da GPU, o ecossistema CUDA e o ritmo das plataformas. A TSMC detém os processos avançados e a capacidade crítica de encapsulamento. Os gigantes da nuvem detêm as compras dos centros de dados. As fabricantes ODM detêm o design do sistema completo, a montagem de racks e o grande volume de entregas, mas suas margens de lucro costumam ser muito inferiores às das empresas de design de chips. Fabricantes de componentes como energia, resfriamento, substratos e interfaces de teste podem obter lucros melhores devido a barreiras tecnológicas, enquanto outros flutuam conforme os pedidos dos grandes clientes. É por isso que o "interesse comum" precisa ser analisado em camadas: na mesma cadeia de suprimentos, cada elo é necessário, mas nem todos recebem o mesmo poder.

Uma afirmação mais precisa seria cautelosa: o mundo precisa de Taiwan, o que deu a Taiwan um conjunto importante de cartas de negociação. Mas essas cartas devem ser mantidas através da defesa nacional, diplomacia, energia, governança industrial e distribuição social.

## Fábricas no exterior não são tão simples quanto uma mudança de endereço

O fato de a TSMC construir fábricas nos EUA, Japão e Alemanha é frequentemente colocado em um mesmo sentimento de ansiedade: se a fabricação avançada for levada embora, o "escudo de silício" de Taiwan ficará mais fino?

Essa pergunta não pode ser respondida com um simples "sim" ou "não".

Por um lado, as fábricas no exterior são uma extensão da capacidade de Taiwan: clientes e aliados estão dispostos a oferecer subsídios, terras e capital político justamente porque a TSMC e a cadeia de suprimentos de Taiwan são cruciais. Essas instalações aproximam a TSMC dos clientes e tornam a cadeia de suprimentos global politicamente mais aceitável.

Por outro lado, as fábricas no exterior são uma ação para diversificar riscos. EUA, Europa e Japão não querem que os chips mais críticos estejam permanentemente concentrados ao lado do estreito de Taiwan. Taiwan é necessário, por isso recebe investimento. Taiwan é importante demais, por isso é diversificado. Ambas as afirmações são verdadeiras.

Mas uma fábrica não equivale a um ecossistema inteiro: processos avançados exigem equipamentos, materiais, produtos químicos, engenheiros, manutenção, experiência em rendimento (yield), capacidade de encapsulamento, colaboração com clientes e velocidade de resposta dos fornecedores. Mover uma parte da capacidade é uma dificuldade; mover todo o ecossistema de engenharia é outra completamente diferente.

Portanto, as fábricas no exterior funcionam mais como a expansão de alguns nós da cadeia de suprimentos de Taiwan para fora, em vez de remover Taiwan da cadeia. Isso mudará gradualmente a estrutura de negociação e testará como Taiwan preserva sua pesquisa central, produção de ponta e densidade de suprimentos.

## Processos maduros também estão no mesmo mapa

O entusiasmo pela IA pode fazer com que todos folem a atenção para 3nm, 2nm e CoWoS. Mas uma máquina de IA não funciona apenas com os chips mais avançados.

ICs de gerenciamento de energia, controladores, sensores, chips de rede, chips periféricos, chips automotivos e industriais — muitos ainda usam processos maduros. Esses chips não aparecem tanto nos jornais quanto as GPUs, mas sustentam a conversão de energia, o controle de sinais, o monitoramento de equipamentos e inúmeras funções discretas nos centros de dados.

A escassez global de chips durante a pandemia fez com que as indústrias automotiva, de eletrodomésticos e industrial entendessem uma coisa: o mundo não carece apenas de chips de ponta, mas também daqueles nós maduros que parecem comuns, mas sem os quais nada pode ser entregue. O mapa de semicondutores de Taiwan, portanto, não deve olhar apenas para o topo. TSMC, UMC (联电), Vanguard (世界先进), VIS (力积电) e um grupo de empresas de processos especiais, encapsulamento e materiais formam uma base muito mais espessa.

Este ponto é importante para o leitor: o valor de Taiwan não deve ser entendido como uma corrida por números nanométricos. Quanto mais complexa a IA, mais ela precisa que o avançado e o maduro trabalhem juntos. Quanto mais ela precisa que o sistema completo e os componentes sejam entregues em conjunto.

Assim, os processos maduros devem ser reintegrados ao mesmo mapa. Eles são o chassi que permite que o hardware de IA funcione de forma estável. As GPUs mais avançadas precisam estar apoiadas em uma vasta quantidade de chips comuns para se tornarem máquinas realmente utilizáveis, reparáveis e produzíveis em massa.

## A conta do grupo "Montanhas Protetoras da Nação"

Conectar a demanda global de hardware de IA a Taiwan também deixa a conta em Taiwan.

A primeira conta é a eletricidade: fábricas de wafers avançadas, exposição EUV, linhas de encapsulamento, testes de servidores de IA e centros de dados exigem energia estável. A mídia tecnológica já alertou sobre a pressão que a indústria de semicondutores de Taiwan exerce sobre o fornecimento de energia e energia verde. A TSMC também divulga continuamente seus planos de economia de energia EUV e gestão de recursos hídricos. [^6][^7] O aumento da eficiência é importante, mas enquanto a demanda por IA continuar crescendo, a pressão pelo volume total persistirá.

A segunda conta é a água e a vulnerabilidade climática. A fabricação de wafers exige enormes quantidades de água ultrapura. Relatos da WIRED sobre o uso de água na fabricação de chips indicam que uma única fábrica pode usar milhões de galões por dia; durante as secas em Taiwan, a tensão entre o uso agrícola e a produção de chips veio à tona. A capacidade de processo não pode se dissociar de reservatórios, chuvas, água reciclada e gestão regional. [^8]

A terceira conta é as emissões de carbono e o aprisionamento industrial: estudos como o de Roussilhe et al. usam fabricantes de componentes eletrônicos de Taiwan como amostra para discutir como energia, água e emissões de gases de efeito estufa aumentam com a produção, além do risco de _carbon lock-in_. [^9] O grupo das "Montanhas Protetoras da Nação" traz influência internacional, mas também vincula profundamente o uso de energia e terra do país à manufatura de alto consumo.

A quarta conta é a distribuição: a IA faz as ações taiwanesas, as exportações e os salários do setor tecnológico subirem, mas nem todos estão nessa cadeia de crescimento principal. Indústrias tradicionais, setor de serviços, locatários e jovens fora da área tecnológica podem não receber esses dividendos simultaneamente. Quando o preço das casas, a eletricidade, a terra e os investimentos públicos são influenciados pela alta tecnologia, "perspectivas positivas para Taiwan" não significa necessariamente que "a vida de cada taiwanês melhorou".

Isso não é para negar a importância dos semicondutores e da cadeia de suprimentos de IA. Pelo contrário, justamente por ser importante, é necessário detalhar também as contas.

## Onde Taiwan se coloca

A cadeia de suprimentos de hardware de IA oferece a Taiwan, além de divisas e pedidos, uma forma de entender a si mesma.

Taiwan não é apenas uma pequena ilha protegida pelo mundo, nem um império tecnológico que pode controlar unilateralmente a IA mundial. Ela se parece mais com um centro de engenharia altamente especializado: necessária, portanto tem influência. Dependente, portanto tem responsabilidade. Concentrada, portanto assume riscos.

Quando o leitor ouvir "Taiwan é insubstituível" da próxima vez, não pare apenas no slogan. Deixe que um caminho físico surja em sua mente: a demanda das empresas de modelos entra no design de chips, o design entra nos processos da TSMC, os wafers entram no encapsulamento avançado, os módulos entram no resfriamento, energia, placas-mãe e racks, e finalmente são entregues aos centros de dados pelas ODMs/EMS de Taiwan.

Este caminho é a evidência concreta. Ele transforma o "interesse comum" de uma emoção em um fato que pode ser discutido, questionado e defendido.

Taiwan transforma a nuvem em máquinas. O verdadeiro significado desta frase é: até a IA mais abstrata precisa, no fim das contas, passar pela ilha mais concreta.

Esta é uma das posições mais claras de Taiwan neste momento, e uma que mais precisa ser compreendida.

## Leitura Adicional

- [Comércio Externo de Taiwan e Cadeia de Suprimentos Global](/pt/economy/taiwan-foreign-trade-and-global-supply-chain) — O contexto macroeconômico, desde a orientação para exportação e comércio triangular até a reestruturação das cadeias entre EUA e China.
- [NVIDIA em Taiwan](/pt/technology/nvidia-in-taiwan) — Como a NVIDIA delega profundamente a fabricação de chips, encapsulamento e montagem de servidores em Taiwan.
- [Indústria de Semicondutores](/pt/technology/taiwan-semiconductor-industry) — O contexto histórico de longo prazo, desde a transferência de tecnologia da RCA até a fabricação pela TSMC e as batalhas de materiais e encapsulamento.
- [Computex](/pt/technology/computex) — Por que a Computex Taipei se tornou um local de peregrinação para o lado da oferta de hardware global na era da IA.
- [Eletricidade e Semicondutores em Taiwan](/pt/technology/taiwan-electricity-and-semiconductors) — A conta de energia por trás da cadeia de suprimentos de IA, a pressão pela energia verde e a segurança energética.
- [Água nos Semicondutores e Recursos Hídricos de Taiwan](/pt/technology/semiconductor-water-use-and-taiwan-water-resources) — Como as fábricas de wafers se conectam a reservatórios, secas, água regenerada e governança local.
- [Fábricas de IA no Exterior](/pt/technology/ai-supply-chain-overseas-manufacturing) — Como a cadeia de suprimentos de Taiwan está sendo convidada pelo mundo, da TSMC e Foxconn à Delta Electronics.

## Fontes das Imagens

- **Fluxograma da Cadeia de Suprimentos de Hardware de IA**: Diagrama SVG criado pelos colaboradores do Taiwan.md, CC BY-SA 4.0. Os nós foram organizados com base no texto e referências deste artigo para ilustrar como a demanda de IA passa pelo design de chips, processos avançados, encapsulamento avançado, HBM/substratos, resfriamento/energia, placas-mãe, ODM/EMS e racks de IA até chegar ao centro de dados; não é um mapa de participação de mercado nem um mapa completo de empresas.
- **Diagrama de Camadas de um Servidor de IA**: Diagrama SVG criado pelos colaboradores do Taiwan.md, CC BY-SA 4.0. Usado para ilustrar as camadas do sistema de um servidor de IA, do chip ao centro de dados; não representa um mapa completo de empresas ou participação de mercado.
- **Jensen Huang exibindo RTX Blackwell GPU**: [Jensen Huang holding RTX Blackwell at CES 2025](<https://commons.wikimedia.org/wiki/File:Jensen_Huang_-_RTX_Blackwell_-_Nvidia_Keynote_-_CES_2025_Las_Vegas_(3).jpg>) — Foto: Pronoia, Wikimedia Commons, CC0. Versão em cache utilizada no artigo.
- **Computex Pavilhão de Nangang**: [Computex Taipei at Taipei Nangang Exhibition Center](https://commons.wikimedia.org/wiki/File:Computex_Taipei_at_Taipei_Nangang_Exhibition_Center_20150602.jpg) — Foto: NVIDIA Taiwan, Wikimedia Commons, CC BY 2.0. Versão em cache utilizada no artigo.

## Referências

[^1]: [Central News Agency: O "Jantar de Trilhões" de Jensen Huang; grandes nomes como Wei Zhe-jia e Liu Yang-wei comparecem](https://www.cna.com.tw/news/afe/202605280300.aspx) — Reportagem da Central News Agency de 28 de maio de 2026 sobre o jantar de Jensen Huang em Taipé com executivos da cadeia de suprimentos de IA, listando categorias como fabricação de wafers, encapsulamento, resfriamento, energia, placas-mãe e montagem.

[^2]: [TSMC Logic Technology](https://www.tsmc.com/english/dedicatedFoundry/technology/logic) — Página oficial de tecnologia de processos lógicos da TSMC, listando processos avançados como 7nm, 5nm, 3nm, 2nm, A16, A14 e suas rotas tecnológicas.

[^3]: [TSMC Advanced Packaging Services](https://www.tsmc.com/english/dedicatedFoundry/services/advanced-packaging) — Página oficial de serviços de encapsulamento avançado da TSMC, explicando que o 3DFabric inclui tecnologias de integração como SoIC, CoWoS e InFO.

[^4]: [AP: Taiwan takes a further step in production of AI chips with advanced new plant](https://apnews.com/article/1e087e92592b0b9ab7fb20442a5b8dc7) — Reportagem da Associated Press sobre a nova fábrica da Silican em Taichung e a presença de Jensen Huang, oferecendo uma perspectiva internacional sobre o papel do encapsulamento avançado na cadeia de chips de IA.

[^5]: [AP: Taiwan's AI-powered economy soars in the shadow of bubble fears and China threats](https://apnews.com/article/7527bd4bf3089cbd2dab1c530ee61c3e) — Reportagem da Associated Press de 2026 sobre como a demanda de IA impulsiona o crescimento econômico e as exportações de Taiwan, ao mesmo tempo que aborda bolhas de IA, riscos geopolíticos e desigualdade de renda.

[^6]: [Tom's Hardware: TSMC-led semiconductor association warns of power supply pressure](https://www.tomshardware.com/tech-industry/tmsc-led-semiconductor-association-begs-taiwan-government-for-clean-green-energy-as-demand-skyrockets-fabs-are-struggling-to-keep-up-with-power-needs) — Mídia tecnológica reportando o alerta da indústria de semicondutores de Taiwan sobre a pressão no fornecimento de energia e energia verde; fonte secundária para limitações energéticas.

[^7]: [Tom's Hardware: TSMC reduces peak power consumption of EUV tools by 44%](https://www.tomshardware.com/tech-industry/semiconductors/tsmc-reduces-peak-power-consumption-of-euv-tools-by-44-percent-company-to-save-190-million-kilowatt-hours-of-electricity-by-2030) — Reportagem sobre o plano de economia de energia EUV da TSMC e escala de consumo, útil para ilustrar a tensão entre eficiência e crescimento de volume.

[^8]: [WIRED: Want to Win a Chip War? You’re Gonna Need a Lot of Water](https://www.wired.com/story/want-to-win-a-chip-war-youre-gonna-need-a-lot-of-water/) — Reportagem da WIRED de 2023 sobre a demanda de água ultrapura na fabricação de semicondutores e a tensão entre a TSMC e o uso agrícola durante secas em Taiwan.

[^9]: [Roussilhe et al.: From Silicon Shield to Carbon Lock-in?](https://arxiv.org/abs/2209.12523) — Estudo da pegada ambiental de 16 fabricantes de componentes eletrônicos de Taiwan (2015-2020), discutindo o aumento de energia, água e emissões com a produção e o risco de _carbon lock-in_.

[^10]: [Central News Agency: Liu Yang-wei: Otimista com as entregas da NVIDIA Vera Rubin no segundo semestre](https://www.cna.com.tw/news/afe/202605290100.aspx) — Reportagem da Central News Agency de 29 de maio de 2026 sobre o presidente da Foxconn, Liu Yang-wei, discutindo a plataforma Vera Rubin, CPO/fotônica de silício e sistemas de servidores de IA.
