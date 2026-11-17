---
title: 'NVIDIA em Taiwan: a empresa mais valiosa do mundo, sem produzir um único chip por conta própria'
description: 'Na Computex de maio de 2025, Jensen Huang vestiu sua jaqueta de couro enquanto o painel exibia simultaneamente os logotipos de 55 fornecedores taiwaneses — uma empresa americana nomeando publicamente toda a indústria da ilha como parte de seu próprio corpo. Desde aquela carta escrita a Morris Chang em 1996, até atingir um valor de mercado superior a 5 trilhões de dólares e o governo de Taipei investir NT$ 443,4 milhões para liberar um terreno para ela, a NVIDIA depositou todo o seu organismo em Taiwan. Por causa disso, Taiwan detém o interruptor global que ninguém pode desligar, mas com uma margem bruta de apenas 5%, recursos hídricos e elétricos sendo drenados e o risco de guerra concentrado na ilha: ser indispensável para ela não significa que Taiwan tem o controle.'
date: 2026-06-22
category: 'Technology'
tags:
  [
    'NVIDIA',
    'NVIDIA',
    'Jensen Huang',
    'IA',
    'Semicondutores',
    'TSMC',
    'Cadeia de suprimentos',
    'Escudo de Silício',
    'Inteligência Artificial',
    'Computex',
  ]
subcategory: '半導體與硬體'
author: 'Taiwan.md'
featured: true
lastVerified: 2026-06-22
lastHumanReview: false
researchReport: 'reports/research/2026-06/NVIDIA在台灣.md'
relatedDiary: ['2026-06-22-143854-nvidia-taiwan']
image: '/article-images/technology/computex-jensen-huang-2016.webp'
translatedFrom: 'Technology/NVIDIA在台灣.md'
sourceCommitSha: '1ec0df23b'
sourceContentHash: 'sha256:533b8db87f48f6de'
sourceBodyHash: 'sha256:8a6bcaa4a83cff70'
translatedAt: '2026-11-02T06:35:36.572886+00:00'
---

# NVIDIA em Taiwan: a empresa mais valiosa do mundo, sem fabricar um único chip próprio

> **Resumo em 30 segundos:** A NVIDIA é a empresa mais valiosa do planeta; em 29 de outubro de 2025, seu valor de mercado ultrapassou US$ 5 trilhões[^1], mas ela não possui uma única fábrica de semicondutores. Cada chip de IA é fabricado pela TSMC, e cada servidor de IA é montado por empresas como Foxconn, Quanta e Wistron; Taiwan detém 90% da produção global de montagem de servidores de IA[^2]. Essa dependência é tão profunda que a NVIDIA já é o maior cliente da TSMC (representando 19% de sua receita)[^3], e a arquitetura de seus chips acaba sendo determinada, inversamente, pelas taxas de rendimento do encapsulamento em Taiwan[^4]. A questão é que controlar as artérias de terceiros e receber uma fatia dos lucros são coisas distintas: a margem bruta da NVIDIA é de 75%, enquanto as fabricantes de ODM taiwanesas obtêm apenas entre 5% e 8%[^5]. Este artigo explora como essa relação desigual se desenvolveu até chegar ao estado atual.

![Jensen Huang discursando no palco do Computex Taipei, vestindo sua característica camisa escura, com um grande telão de projeção atrás dele e uma plateia lotada](/article-images/technology/computex-jensen-huang-2016.webp)
_Jensen Huang discursando no Computex Taipei em 2016. Desde 2023, ele retorna quase anualmente a esta feira para anunciar os chips de IA mais recentes da NVIDIA, diante de uma plateia composta por toda a cadeia de suprimentos taiwanesa que fabrica esses chips para ele. Foto: NVIDIA Taiwan, 2016._

19 de maio de 2025, Taipei Nangang Exhibition Center. Jensen Huang, vestindo sua icônica jaqueta de couro, subiu ao palco principal do Computex. Atrás dele, um enorme painel iluminou uma parede de logotipos: Advantech, Motiga, Delta Electronics, Gigabyte, Quanta, Wistron, Wiwynn, Foxconn, MediaTek, TSMC, UMC... um após o outro, até que a imagem congelou nos logotipos de 55 empresas taiwanesas[^6]. Somando-se ao vídeo de agradecimento exibido no local, um total de 122 empresas taiwanesas foram mencionadas[^6].

Foi a primeira vez que os taiwaneses "viram" toda a sua indústria ser enumerada de uma só vez por uma empresa americana.

O orgulho é real, mas aquela parede carrega uma questão não dita: cada logotipo na parede trabalha para essa empresa americana, enquanto o verdadeiro poder reside em quem projetou aquela parede, e não nela.

<div
  class="video-embed"
  style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;margin:1.5rem 0;border-radius:8px;"
>
  <iframe
    src="https://www.youtube.com/embed/TLzna9__DnI"
    title="NVIDIA CEO Jensen Huang Keynote at COMPUTEX 2025（Vídeo oficial completo）"
    style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;"
    loading="lazy"
    allowfullscreen
  ></iframe>
</div>

_Versão completa da palestra principal de Jensen Huang no COMPUTEX em 19 de maio de 2025 (canal oficial da NVIDIA). Foi nesta palestra que ele exibiu a parede de logotipos das 55 empresas taiwanesas e anunciou que a NVIDIA estabeleceria sua sede internacional em Taipé._

## Uma empresa que não fabrica nada tornou-se a mais valiosa do mundo

A NVIDIA é o exemplo máximo do modelo "fabless" (sem fábrica de semicondutores). Ela projeta chips, mas não constrói fábricas, não compra máquinas de litografia e não produz uma única wafer. Um império com valor de mercado de US$ 5 trilhões que não possui uma única fábrica de wafers própria sob seu nome.

Ela terceiriza todo o processo de fabricação para uma ilha do outro lado do Oceano Pacífico.

![Micrografia do die do chip GPU NVIDIA Ampere GA102, mostrando a densa estrutura de circuitos](/article-images/technology/nvidia-ampere-ga102-die.webp)
_Micrografia do die do chip NVIDIA Ampere GA102, produzido pelo processo de 8 nm da TSMC. A NVIDIA o projetou, mas cada uma das densas linhas sobre ele foi gravada em instalações de Taiwan. Photo: Fritzchens Fritz, CC0._

Os chips mais lucrativos (H200, Blackwell e o futuro Rubin) dependem inteiramente dos processos de 3 nm e 4 nm da TSMC[^7]. Em seu relatório anual enviado à Securities and Exchange Commission (SEC) dos Estados Unidos, a NVIDIA admite essa concentração em preto no branco: a cadeia de suprimentos da empresa está concentrada principalmente na região Ásia-Pacífico, utilizando fundições de semicondutores como a TSMC para produzir wafers[^8]. Este trecho consta nos documentos legais da empresa enviados à SEC. Em outras palavras, é a própria NVIDIA que lista Taiwan como sua maior fonte de risco geopolítico.

Fabricar o chip não é o suficiente. Para que uma GPU se torne algo capaz de realizar computação, ela precisa primeiro passar pelo encapsulamento avançado e depois ser instalada em um servidor. O encapsulamento CoWoS da TSMC é atualmente o gargalo global, e apenas a NVIDIA consome cerca de 60% da capacidade de CoWoS (estimativas da mídia taiwanesa sugerem que seja ainda maior, chegando a 70%)[^9]. Após o encapsulamento, os chips são entregues às empresas taiwanesas para montagem: a Ingrasys, da Foxconn, produz os sistemas de rack GB200 NVL72, e a E.SUN Securities estima que sua participação na montagem de racks de IA seja superior a 40%[^10]; a Quanta fabrica servidores em nuvem, detendo mais da metade da participação nos 50 maiores data centers do mundo[^11]; e a nova fábrica de IA da Wistron em Zhubei está totalmente ocupada por pedidos da NVIDIA[^12].

```tw-stat
75,0% | Margem bruta anual da NVIDIA FY2025 | Relatório anual da SEC
19%   | Participação da NVIDIA na receita da TSMC em 2025 | Já superou a Apple para ser o maior cliente
~90%  | Taiwan detém a montagem global de servidores de IA | Incluindo fornecedores de marcas americanas, chega a 100%
~60%  | NVIDIA consome a capacidade de encapsulamento CoWoS da TSMC | Mídia taiwanesa estima em 70%
Fonte: NVIDIA SEC 10-K, TrendForce, MIC (Institute for Information Industry), Ministério da Economia
```

Taiwan detém 90% da montagem global de servidores de IA; se incluirmos os fornecedores de marcas americanas, o número chega a 100%[^2]. Isso significa que quase todas as máquinas físicas no planeta que realizam computação de IA passaram pelas mãos de taiwaneses.

Ao sobrepor esses números, o conflito central emerge: **a empresa mais valiosa do mundo não fabrica nada, porque todo o seu corpo está depositado em Taiwan**. Taiwan é o interruptor que ela não pode desligar.

No entanto, controlar a vida de alguém e receber uma parte do dinheiro dessa pessoa são duas coisas distintas. A próxima parede está escondida atrás daqueles 55 logotipos.

## Por trás do logo, está o fundo da curva de sorriso

A indústria manufatureira possui uma "curva de sorriso" clichê: as extremidades são altas e o meio é baixo. Quem domina as duas extremidades — marca, design e tecnologia — obtém lucros generosos; quem é responsável pela parte central de "montagem e fabricação" tem as margens mais estreitas. O que Taiwan faz, justamente, é essa parte central.

A margem bruta anual da NVIDIA no ano fiscal de 2025 foi de 75,0%, conforme o número declarado pela própria empresa à SEC[^5]. No mesmo período, as margens brutas das empresas taiwanesas que montam seus servidores foram estas: Hon Hai (Foxconn) 6,18%, Quanta 4,78% (a mais baixa em quase 15 trimestres), Wistron 5,21% e Wiwynn 7,2%[^13]. A margem de lucro da NVIDIA é quase doze vezes a da Hon Hai e dezesseis vezes a da Quanta.

```tw-bars
Quem fica com o lucro: Margem bruta da cadeia de suprimentos de IA (%)
*NVIDIA | 75.0 | Design, marca, ecossistema CUDA
Delta Electronics | 37.0 | Fontes de alimentação, resfriamento (lado tecnológico)
Unimicron | 21.3 | Substratos ABF (lado tecnológico)
Wiwynn | 7.2 | Montagem de servidores
Hon Hai | 6.18 | Montagem de sistemas de racks
Wistron | 5.21 | Montagem de servidores
Quanta | 4.78 | Montagem de servidores em nuvem
Fonte: NVIDIA SEC 10-K, conferências de resultados das empresas (trimestres de FY2025–FY2026)
```

Há algo contraintuitivo escondido neste gráfico: sendo todas empresas taiwanesas, quanto mais próximas da simples "montagem", menor a margem; quanto mais próximas da "tecnologia", maior a margem. A Delta Electronics, que faz fontes de alimentação e resfriamento, tem 37%, enquanto a Unimicron, que faz substratos ABF, estima 21,3%[^14]. A diferença não é "ser ou não uma empresa de Taiwan", mas sim "em qual parte da curva você está". Na etapa de montagem, a margem será baixa, não importa quem a faça.

> 📝 **Nota do Curador**: Em maio de 2026, o Morgan Stanley calculou um dado ainda mais cortante — a margem de lucro do valor agregado na montagem de sistemas completos pelas fabricantes ODM caiu de 2,7% nos racks da geração GB300 para 1,9% na próxima geração VR200[^15]. Ou seja, cada vez que a NVIDIA lança um chip novo e mais potente, as empresas taiwanesas precisam investir mais capital, mas obtêm margens de lucro menores. À medida que esta cadeia de suprimentos avança, o fundo da curva é cada vez mais esmagado. O logo na parede é glorioso, mas a margem no fundo da curva é escassa; essas duas coisas podem ser verdadeiras ao mesmo tempo.

O orgulho e o custo se contrapõem na mesma cadeia. Devido à explosão da IA, as ações taiwanesas impulsionaram o crescimento econômico de Taiwan em 2025 para cerca de 7,37%, o mais rápido em quinze anos, colocando o país no grupo de elite global[^16]. No entanto, a acadêmica Jiang Min-hua, que estuda a economia de Taiwan, aponta um número frio: a maioria dos taiwaneses não tem sentido os benefícios desta prosperidade econômica[^16]. Os 10% com maior renda detêm 48% da renda total de Taiwan, enquanto os 50% na base recebem apenas 12%[^16]. Convertendo os dados, a renda per capita dos 10% do topo é vinte vezes superior à dos 50% da base.

Um artigo de opinião publicado pelo _The Reporter_ em junho de 2026 detalhou essa divergência em formato de "K": a "população empregada diretamente na principal cadeia de crescimento — IA, semicondutores e eletrônicos — representa menos de 10% do total de empregados"[^17]. Uma pessoa que trabalha no setor de alimentação, com um salário mensal total de NT$38.484, recebe apenas 34,6% do que recebe alguém na indústria de fabricação de componentes eletrônicos[^17]. O dividendo da IA é real, mas ele está concentrado nas mãos do capital e de uma pequena elite de engenheiros; a maioria das pessoas observa a onda de fora.

Este é o primeiro sentido de "ser indispensável não significa ter o controle": Taiwan detém o interruptor, mas recebe apenas os 5%.

## Taiwan já a sustentou, mas também quase a destruiu

Para entender como essa relação desigual começou, é preciso voltar ao final da década de 1990, quando a NVIDIA ainda corria contra a morte.

Fundada em 1993, a NVIDIA esteve à beira da falência várias vezes nos seus primeiros anos. Quando lançou o chip gráfico RIVA 128 em agosto de 1997, a empresa tinha "apenas um mês de salários em caixa" [^18]. Naquela época, Jensen Huang abria cada reunião mensal da empresa com o mesmo lema em inglês: nossa empresa está a apenas trinta dias da falência [^18]. Essa frase tornou-se, mais tarde, uma crença interna da NVIDIA, mas nunca foi dita em chinês.

O que realmente tirou a NVIDIA daquela crise foi um aporte de US$ 5 milhões da SEGA, não Taiwan [^19]. É importante esclarecer este ponto, pois a afirmação de que "Taiwan salvou a NVIDIA" é frequentemente contada de forma excessivamente romântica.

O papel desempenhado por Taiwan foi outro: o cordão umbilical da fabricação. Por volta de 1996, Jensen Huang, aos 32 anos, escreveu uma carta ao fundador da TSMC, Morris Chang, perguntando se a TSMC poderia fabricar chips por contrato para a NVIDIA [^20]. Mi Yu-chieh, da TSMC, relembrou em 2025 que essa "colaboração profunda começou em um momento crucial, em 1997", quando "Morris Chang entrou em contato pessoalmente com o fundador da NVIDIA, Jensen Huang, para atender ao pedido de serviços de fabricação da NVIDIA" [^21]. Em 1998, as duas partes assinaram o contrato formal, e a TSMC tornou-se a principal fundição de wafers da NVIDIA [^20]. Esse modelo de divisão de trabalho — "design no Vale do Silício, fabricação com a TSMC" — conectou, desde então, o corpo físico da NVIDIA a esta ilha.

> 💡 **Você sabia?**: Segundo versões que circulam, quando Jensen Huang recebeu a ligação de Morris Chang, ele teria gritado animadamente para as pessoas ao seu redor pedirem silêncio, pois era Morris Chang quem estava ligando [^22]. Essa cena é um relato de segunda mão e o tom pode não ser exato, mas ela captura uma verdade: naquela época, aquela pequena empresa prestes a quebrar viu em uma ligação da TSMC uma corda de salvamento.

No entanto, essa corda quase se tornou um laço de enforcamento: em 1998, um erro em um processo químico da TSMC causou o descarte de um grande lote de chips da NVIDIA, quase levando a empresa à falência novamente [^23]. Portanto, uma descrição mais honesta seria: Taiwan não foi a "salvadora da falência" da NVIDIA; Taiwan é o seu "cordão umbilical de fabricação" — um vínculo de via dupla onde Taiwan já a sustentou, mas também quase a destruiu. A simbiose nunca é uma gratidão unilateral.

A história seguinte é mais familiar para todos. Em 2006, a NVIDIA lançou o CUDA, e na época quase todos acharam que era uma decisão louca. Em 2012, o pesquisador Alex Krizhevsky usou duas placas de vídeo NVIDIA GTX 580 no quarto da casa de seus pais para treinar a AlexNet, reduzindo a taxa de erro de reconhecimento de imagem do ImageNet de 26% para 15,3% [^24]. Esse momento provou que a GPU é o motor do aprendizado profundo (_deep learning_). Em 2022, o ChatGPT desencadeou uma sede global por poder computacional, e o valor de mercado da NVIDIA disparou como um foguete desde então.

```tw-timeline
1993 | NVIDIA fundada no Vale do Silício | Jensen Huang e outros três fundadores criam chips gráficos
1996 | Jensen Huang escreve para Morris Chang | Pede fabricação pela TSMC; contrato formal em 1998 conecta a produção a Taiwan
2006 | Lançamento do CUDA | Transforma a GPU em uma plataforma de computação geral; visto como decisão louca na época
2012 | AlexNet treinada com duas GTX 580 | Prova que GPU = motor de deep learning
2022 | Surgimento do ChatGPT | Demanda global por processamento explode; valor de mercado da NVIDIA dispara
2025 | Valor de mercado supera US$ 5 trilhões | Primeira empresa na história a atingir tal marca; anuncia sede internacional em Taiwan no mesmo ano
Fonte: 《The Nvidia Way》, podcast Acquired, Wikipédia, CNBC
```

De uma pequena empresa a trinta dias da falência até a primeira empresa de cinco trilhões de dólares da história — cada chip no caminho foi fabricado em Taiwan.

![Jensen Huang segurando um GPU RTX Blackwell durante seu discurso principal na CES 2025](/article-images/technology/jensen-huang-ces-2025-blackwell.webp)
_Jensen Huang erguendo o novo GPU Blackwell na CES 2025. Do empreendedor que, em reuniões mensais, dizia "estamos a trinta dias da falência", ao homem com este chip disputado no mundo inteiro — que ainda assim só pode ser produzido em Taiwan. Photo: Pronoia, CC0._

## A irreemplazabilidade tem prazo de validade?

Isso nos leva a uma questão que exige honestidade: essa condição de "irreemplazável" de Taiwan é permanente ou possui limites temporais?

A curto prazo, as fronteiras são tão rígidas que quase não há brechas: entre 2025 e 2027, as GPUs de IA mais avançadas da NVIDIA — desde a fabricação até o encapsulamento final — dependem 100% das linhas de produção CoWoS-L da TSMC em Taiwan[^25]. A TSMC detém cerca de 90% a 92% dos processos avançados globais abaixo de 5 nm, e sua capacidade de encapsulamento avançado supera a soma de todos os seus concorrentes[^26]. A pesquisa do professor Yuntsai Chou, da NTUST, é muito clara: não é viável dispersar a fabricação por encomenda da TSMC no curto prazo; construir uma nova fábrica de wafers de ponta custaria de três a quatro anos e mais de US$ 10 bilhões[^27].

A prova de engenharia mais forte não está em nenhum relatório, mas no próprio design dos produtos da NVIDIA. A próxima geração, Rubin Ultra, originalmente planejava usar um encapsulamento de "quatro chips" (quad-die), mas a TrendForce apontou em abril de 2026 que o uso de quatro chips faria a área do encapsulamento expandir para 7,5 a 8 vezes o limite do retículo (mask limit), o que "prejudicaria gravemente o rendimento (yield) e os custos"; por isso, o design "agora está migrando para uma arquitetura de dois chips" (dual-die)[^4]. É preciso ler esta frase com calma: é a limitação física do rendimento de encapsulamento em Taiwan que, inversamente, determina como o chip da NVIDIA deve ser projetado. Até a empresa de design de chips mais poderosa do mundo precisa adaptar seus projetos em torno do rendimento de Taiwan; este já é um ponto de estrangulamento ao nível físico, tão rígido que não há espaço para negociação.

Mas uma "fronteira rígida de curto prazo" não significa "para sempre". Taiwan já teve exemplos dolorosos do passado.

Em 2002, Taiwan promoveu a política industrial "Duas Estrelas de Bilhão", onde os setores de painéis (LCD) e DRAM (memória) também foram considerados as artérias vitais e irreemplazáveis da proteção nacional. Qual foi o resultado? Devido à falta de tecnologia central, o investimento em P&D foi de apenas 6%, muito abaixo dos 10% a 21% de Coreia, Japão, EUA e Europa, e esses dois setores foram gradualmente esvaziados pela Coreia do Sul e pela China. Uma retrospectiva posterior do United Daily News foi contundente: "As fábricas de painéis e as fábricas de memória de semicondutores que brilharam intensamente tornaram-se deficitárias em poucos anos devido ao excesso de oferta no mercado internacional, sendo apelidadas pelos internautas como 'Mao Shan Dao Shi' (um trocadilho com a margem bruta de 3% a 4%), transformando as 'Duas Estrelas de Bilhão' em uma 'Indústria de Bilhão de Tristeza'"[^28].

> ⚠️ **O que há de diferente desta vez em relação aos painéis e à DRAM**: Os setores de painéis e DRAM foram esvaziados na época porque Taiwan não detinha a tecnologia central, permitindo que qualquer um os alcançasse. O fosso defensivo da IA parece muito mais profundo — a TSMC realmente domina o IP do processo, e o rendimento do encapsulamento CoWoS, junto com a aderência de todo o ecossistema, não é algo que se possa replicar apenas injetando dinheiro por três ou cinco anos. No entanto, isso não é razão para Taiwan baixar a guarda. A SMIC já declarou produção em massa de 5 nm, embora seu rendimento seja apenas um terço do da TSMC e o custo seja 50% mais caro, estando cerca de cinco anos atrás[^29]. Mas cinco anos, na indústria tecnológica, não é para sempre. Tratar a "dependência profunda" como "segurança eterna" foi exatamente o erro cometido por aqueles em 2002.

Após 2028, as rachaduras começarão a aparecer. Em dezembro de 2025, a NVIDIA investirá cerca de US$ 5 bilhões para adquirir participação na Intel, com o objetivo real de "garantir acesso prioritário à capacidade de encapsulamento avançado da Intel nos Estados Unidos", prevista para ser usada na arquitetura Feynman em 2028[^30]. A fábrica de encapsulamento AP1 da TSMC no Arizona deve iniciar a produção em massa em 2028[^31]. Em Taiwan, a Powertech desenvolveu o encapsulamento PiFO, que compete com o CoWoS-L e tem um custo de produção cerca de 30% menor, atraindo já "várias empresas de chips de IA dos Estados Unidos"[^32]. Estes são sinais reais de afrouxamento, embora ainda não tenham entrado na cadeia de suprimentos principal das GPUs mais avançadas da NVIDIA.

Há um número que melhor ilustra a sutileza do cenário atual: a TrendForce estima que o déficit entre oferta e demanda de CoWoS diminuirá de cerca de 20% atualmente para cerca de 10% no final de 2026[^33]. No entanto, a forma como esse déficit diminuirá é através da própria expansão da TSMC, e não pela entrada de fornecedores substitutos[^33]. Ou seja, até o momento, este gargalo ainda só pode ser resolvido pela própria Taiwan.

A irreemplazabilidade é um fato de engenharia, mas ela possui uma fronteira rígida situada próxima ao ano de 2028. As cartas na manga de Taiwan têm prazo de validade.

## NT$ 4,34 bilhões: uma cidade limpando um terreno para uma empresa de trilhões

Se a margem de lucro é uma balança abstrata de poder, o que ocorreu no segundo semestre de 2025 no Taipei Science Park (Distrito de Beitou e Shilin) é a fatia mais afiada dessa balança.

A história começa em 2021: na época, o governo municipal de Taipei leiloou dois terrenos no Taipei Science Park, T17 e T18 (totalizando 3,89 hectares), sob o regime de direito de superfície por 50 anos. A Shin Kong Life foi a única licitante, vencendo o leilão com um lance de NT$ 4,4 bilhões[^34]. Nos três anos seguintes, o terreno permaneceu ocioso e coberto por mato.

Em maio de 2025, Jensen Huang anunciou na Computex que a sede internacional da NVIDIA, a "Constellation", pretendia se instalar no Taipei Science Park[^35]. Mas surgiu um problema: o direito de superfície daquele terreno ainda estava com a Shin Kong Life, e direitos de superfície de uso público não podem ser transferidos diretamente. NVIDIA, Shin Kong Life e o governo municipal de Taipei ficaram travados por cinco meses devido a esse terreno[^36].

A solução final foi o governo municipal de Taipei gastar dinheiro para convidar a Shin Kong Life a sair. Em 12 de novembro de 2025, o Conselho Municipal de Taipei aprovou sem objeções uma taxa de rescisão de NT$ 4,34 bilhões, que seria paga à Shin Kong Life para recuperar a terra[^37]. O valor exato é: NT$ 4.434.064.085[^37].

```tw-figure
NT$4,434,064,085
Taxa de rescisão paga pelo governo municipal de Taipei à Shin Kong Life para recuperar o terreno no Taipei Science Park e entregá-lo à NVIDIA (aprovado pelo Conselho em 12/11/2025)
Conselho Municipal de Taipei, CNA, iReally News
```

A fatura de rescisão enviada pela Shin Kong Life causou indignação no Conselho. Ao receber o documento, a vereadora do KMT, You Shu-hui, escreveu: "Ao ver que, nas 8 páginas da fatura da Shin Kong Life, até custos com capina, manutenção ambiental, ajustes de logotipo e taxas de despachante devem ser reembolsados pelo governo municipal de Taipei, só consigo dar um sorriso amargo. Manutenção ambiental não é algo que o locatário deveria fazer originalmente? Até os custos de ajuste do logotipo da fusão entre Taishin e Shin Kong Life devem ser pagos pela cidade? É inacreditável... [suspiros de frustração]."[^38] No entanto, ela acabou votando a favor, acrescentando uma frase que resumiu o clima no local: "A fatura da Shin Kong Life é absurda, mas o interesse geral deve prevalecer"[^38].

Naquele dia, o Conselho apresentou uma cena rara: os partidos Azul, Verde e Branco estavam excepcionalmente harmoniosos; o grupo do DPP chegou a gritar "Apoiem a NVIDIA, assinem o contrato o quanto antes"[^39]. Um terreno e uma empresa estrangeira fizeram com que partidos que normalmente se atacam falassem a mesma língua.

> 📝 **Nota do Curador**: Vale a pena parar para observar esta estrutura de poder. Para permitir que uma empresa de trilhões de dólares se estabeleça, o governo municipal e o conselho de uma cidade mobilizam fundos públicos, transcendem divisões partidárias e superam obstáculos para limpar um terreno ocupado pelo locatário anterior em nome dela. A NVIDIA não desembolsou esses NT$ 4,34 bilhões; esse valor foi antecipado pelos contribuintes de Taipei (sendo que NT$ 1,44 bilhão corresponde aos custos próprios e impostos já pagos pela Shin Kong Life, o que será posteriormente absorvido pela NVIDIA no custo geral)[^40]. "Não conseguir viver sem" não significa "ter o controle total". Aqui, essa frase ganhou sua forma mais concreta: quando você precisa demais que alguém fique, você acaba pagando por contas que não deveria pagar.

## A sede é uma vitrine ou raízes fincadas no solo?

O que a NVIDIA deu a Taiwan? É preciso analisar isso sob dois ângulos para não cometer erros de avaliação.

Um deles é a "vitrine": a sede Constellation imita o design de "nave estelar" da sede nos Estados Unidos, com capacidade para cerca de 4.000 pessoas, com previsão de início de obras em 2026 e funcionamento apenas em 2030 — até hoje, as obras sequer começaram[^41]. Olhando apenas para isso, questionar se a "sede é apenas uma operação de relações públicas" não é um argumento sem fundamento.

O outro é o das "raízes que já foram fincadas há muito tempo". A NVIDIA não chegou a Taiwan apenas em 2025. Ela já possui escritórios em Neihu, em Taipé, com cerca de 1.800 funcionários atuais (este é um número estimado pela mídia, não oficial)[^42]. Em 2021, a empresa teve aprovado pelo Ministério da Economia o "Projeto de Centro de Pesquisa e Desenvolvimento de Inovação em IA", com um investimento total de NT$ 24,3 bilhões e subsídio governamental de NT$ 6,7 bilhões, visando contratar uma equipe de P&D de 1.000 pessoas entre 2022 e 2027[^43]. Em novembro de 2025, a empresa estabeleceu a "NVIDIA Taiwan Classic Co., Ltd.", aumentando seu capital social de NT$ 1 bilhão para NT$ 3,3 bilhões — trata-se de uma pessoa jurídica independente, capaz de pagar impostos e deter ativos de forma autônoma[^44].

Portanto, a verdade sobre a "instalação da sede" está no meio do caminho: o enraizamento substancial em P&D é real e a subsidiária que paga impostos já foi estabelecida; mas aquela sede Constellation, a mais aguardada, ainda permanece apenas no papel. Não se pode falar de apenas um dos dois fatos.

## A ilha sugada por esta cadeia de suprimentos

Além do brilho e das faturas bilionárias, há outra conta sendo paga: por cada pessoa que vive nesta ilha, através da água, da eletricidade, do ar e de casas que se tornam inacessíveis.

![Exterior da fábrica da TSMC em Taichung, fachada cinza com o logotipo da TSMC](/article-images/technology/tsmc-taichung-factory.webp)
_Fábrica da TSMC em Taichung. O corpo físico de cada geração de GPU da NVIDIA ganha forma em fábricas como esta, mas a água e a eletricidade consumidas por essas instalações são outra conta que esta ilha está pagando. Photo: Briáxis F. Mendes, CC BY-SA 4.0._

Primeiro, vejamos a eletricidade. Em 2023, o consumo de energia da TSMC foi de 24,775 bilhões de kWh, representando 8,96% do consumo total de Taiwan[^45]. A S&P prevê que, até 2030, o consumo de energia da TSMC poderá atingir 23,7% de todo o país[^45]. Ou seja, quando esse tempo chegar, para cada quatro kWh consumidos em Taiwan, quase um será utilizado por esta única empresa.

```tw-line
Proporção do consumo de energia da TSMC em relação ao total de Taiwan: Uma única empresa suga quase 1/4 da eletricidade de uma ilha (%)
Ano | Proporção
2023 | 8,96
2030 | 23,7
Fonte: S&P, Relatório de CSR da TSMC
```

As emissões de carbono acompanham esse crescimento: o relatório de abril de 2025 da Greenpeace, intitulado 《Sombras após a glória dos chips》, calculou que o consumo de energia para a fabricação global de chips de IA saltou de 218 GWh para 984 GWh, um aumento anual superior a 3,5 vezes; apenas em Taiwan, o consumo disparou para 375,8 GWh, "representando até 38% do total global"[^46]. Devido à alta dependência da TSMC em combustíveis fósseis, suas emissões de carbono na fabricação de chips de IA chegam a 185.700 toneladas de equivalente de CO2, levando a Greenpeace a apontá-la diretamente como a "campeã de emissões de carbono na fabricação de chips de IA"[^46].

E quanto à NVIDIA? A classificação da Greenpeace para ela é F. O relatório afirma que as "emissões da cadeia de suprimentos da NVIDIA quase dobraram nos últimos três anos, saltando de 3,51 milhões de toneladas em 2022 para 6,91 milhões de toneladas em 2024", e que a empresa está "apenas transferindo as emissões de carbono e a poluição de sua cadeia de suprimentos para outras partes do mundo"[^46]. Em outras palavras: a valorização e o prestígio ficam sob o nome da NVIDIA, enquanto as emissões e a poluição permanecem no céu de Taiwan.

A água segue o mesmo padrão: a TSMC consome mais de 200 mil toneladas de água por dia; das 81 mil toneladas de água fornecidas diariamente pelas quatro estações de reuso de água em Tainan, "quase toda é destinada à TSMC"[^47]. O custo recai sobre as terras agrícolas: os campos de Jiā-Nán sofreram duas interrupções na irrigação em 2021 e 2023 para ceder água à indústria de semicondutores[^48]. A fabricação de uma única wafer de 12 polegadas requer 8.327 litros de água[^49]; nesta ilha, campos que outrora pertenceram a agricultores deixaram de ser cultivados para que os chips tivessem água.

Depois, há as casas. Após o anúncio da NVIDIA de estabelecer sua sede no distrito de Taipei Science Park (Beishi Ke), os preços imobiliários daquela área reagiram imediatamente. O Departamento de Desenvolvimento Industrial de Taipé estima que a população residente e trabalhadora em Beishi Ke possa chegar a 60 mil pessoas, mas as estatísticas do 591 indicam que há apenas cerca de 1.476 unidades residenciais à venda (o uso de solo residencial ocupa apenas 13,8% da área total)[^50]. Com 60 mil pessoas disputando 1.476 unidades, é previsível para onde os preços irão: já há relatos de que transações de novos empreendimentos em áreas centrais de Beishi Ke ultrapassaram NT$ 1,5 milhão por ping (aproximadamente 3,3 m²) [^51].

É preciso distinguir dois fatos aqui para não errar o cálculo da ansiedade. No registro de preços reais, a transação mais alta em edifícios residenciais no distrito de Shilin em 2025 foi de NT$ 570.400 por metro quadrado, o que equivale a cerca de NT$ 1,88 milhão por ping (na Jihe Road, nº 39, com valor total de NT$ 447 milhões)[^52]. No entanto, esses valores astronômicos referem-se a mansões em Tianmu e no centro de Shilin, o que é uma questão distinta do próprio Beishi Ke; os novos projetos em Beishi Ke ultrapassando NT$ 1,5 milhão por ping são outro conjunto de números relatados pela mídia. Esses dois valores não devem ser confundidos. Mas, independentemente de qual seja, ambos apontam para o mesmo sentimento: o crescimento acontece na minha rua, mas eu não consigo comprá-la.

> ⚠️ **"A empresa nem começou a construir, por que os preços subiram?"**: A reação dos residentes locais é legítima. Alguns agentes imobiliários dizem em particular que, devido à infraestrutura de serviços limitada na zona industrial, "muitos funcionários não estão dispostos a se mudar... e mesmo após a mudança, um terço deles pede demissão devido ao transporte inconveniente"[^53]. O debate anônimo no PTT é ainda mais direto: antes o tema era a TSMC, agora apenas trocaram pelo tema NVIDIA[^54]. Uma sede que ainda nem começou a ser construída já elevou os preços das casas dos moradores locais — esta é a versão mais próxima da "divisão em K" (desigualdade crescente) na mesa de jantar. É preciso ser honesto: é verdade que a IA faz Taiwan ser vista pelo mundo, mas também é verdade que a água e a eletricidade estão sendo sugadas e as casas estão inacessíveis; ambos os fatos devem ser registrados.

## Não é apenas Taiwan que não pode viver sem isso

Ao ampliar o foco, percebe-se algo maior: na relação entre a NVIDIA e Taiwan, o conceito de "não poder viver sem" é bidirecional e até multidirecional. Até mesmo o outro lado do estreito está preso nesta estrutura.

![Pavilhão de Exposições Nangang, Taipei, durante a Computex; corredores amplos ladeados por estandes de fornecedores de tecnologia e multidões](/article-images/technology/computex-nangang-floor-2015.webp)
_O pavilhão da Computex no Centro de Exposições Nangang, em Taipei. Todos os anos, em junho, compradores do mundo inteiro inundam este local para buscar o que é produzido pela cadeia de suprimentos de Taiwan — e não é apenas Taiwan que não pode viver sem ela. Foto: NVIDIA Taiwan, CC BY 2.0._

Este é o conceito do "Escudo de Silício": Taiwan detém os chips de que o mundo inteiro precisa e, portanto, essa indispensabilidade tornou-se uma camada de proteção. Mas o Escudo de Silício sempre tem dois lados. Ele é tanto um amuleto de proteção quanto um depósito de pólvora amarrado à ilha. O meio acadêmico chama esses dois lados de "Escudo de Silício" (_Silicon Shield_) e "Armadilha de Silício" (_Silicon Trap_): a mesma concentração pode dissuadir uma agressão, mas também pode se tornar um incentivo para ela ou um ponto único de falha[^55].

Um debate mais acalorado surgiu em 2021 através de um artigo do United States Army War College, que defendia uma estratégia extrema de "terra arrasada/destruição de ninhos": caso a China invadisse Taiwan, não importaria destruir a própria indústria de semicondutores para que o agressor não obtivesse lucro algum. No entanto, as vozes contrárias são igualmente fortes: mesmo que isso dissuadisse a China a curto prazo, esse autossabotagem econômica poderia apenas adiar a agressão até o dia em que a China fosse capaz de produzir seus próprios semicondutores; além disso, é improvável que o próprio povo de Taiwan considere que destruir sua indústria atenda aos seus interesses[^56]. Esta não é uma questão de julgamento para Taiwan decidir, mas ela paira realisticamente por trás de cada discussão sobre "se Taiwan possui moeda de troca".

O Escudo de Silício está sendo inclusive diluído pela própria TSMC. Para diversificar riscos geopolíticos, a TSMC investiu US$ 16,5 bilhões na expansão de fábricas nos Estados Unidos[^57]. Uma manchete da MIT Technology Review de agosto de 2025 dizia: "O Escudo de Silício de Taiwan pode estar enfraquecendo"[^58]. A preocupação é que a transferência de capacidade produtiva dilua o poder de barganha de Taiwan em seu próprio território, fazendo com que países como os EUA sintam que Taiwan não vale tanto a pena ser defendido[^58]. Contudo, Bonnie Glaser, da Fundação Marshall da Alemanha, também lembra que esse ecossistema não é fácil de mudar: o ecossistema criado por Taiwan é verdadeiramente único, sendo o resultado da interação entre um reservatório de talentos, cultura e as leis de Taiwan, algo que não pode ser facilmente replicado em qualquer outro lugar[^59]. Paul Triolo, pesquisador de tecnologia chinesa, é ainda mais direto — ao falar de fabricação de ponta, o Arizona está longe desse nível e nunca chegará lá[^60].

E o que melhor ilustra o quão assimétrica é essa dependência é um momento político.

Em 29 de maio de 2024, Jensen Huang disse publicamente em Taiwan: "Taiwan is one of the most important countries in the world" (Taiwan é um dos países mais importantes do mundo)[^61]. Poucos dias depois, em 2 de junho, durante um discurso na Universidade Nacional de Taiwan (NTU), ele descreveu que "Taiwan é um herói anônimo, mas é o pilar do mundo"[^62].

```tw-quote
Taiwan é um herói anônimo, mas é o pilar do mundo.
Jensen Huang | CEO da NVIDIA, discurso na Computex/NTU, 2024
```

Dezoito dias depois, Chen Bin-hua, porta-voz do Escritório de Assuntos de Taiwan e Hong Kong do Conselho de Estado da China, respondeu: "Em relação a esse tipo de declaração extremamente errônea, o povo e os internautas da China continental já expressaram forte insatisfação. Taiwan nunca foi um país... espera-se que ele estude melhor sua história"[^63].

Mas há algo intrigante em outro detalhe: a agência Central News Agency observou na época que a mídia econômica chinesa publicou diversas reportagens sobre a visita de Jensen Huang a Taiwan, mas "não houve menção ao fato de Jensen Huang ter declarado que 'Taiwan é um país importante', parecendo omitir o tema sensível que normalmente é considerado de 'extrema importância'"[^64]. Ou seja: oficialmente, protestaram com rigor; na mídia econômica, optaram pelo silêncio.

> 📝 **Nota do Curador**: Esse silenciamento revela a real posição do poder. A China precisa dos chips da NVIDIA e, por isso, mesmo quando Jensen Huang diz as palavras que Pequim menos aceitaria, a mídia chinesa opta por não reportar ou não amplificar, temendo prejudicar a relação com este "guru da IA". Há uma frase que circula amplamente: a China precisa da NVIDIA, mas a NVIDIA não precisa da China[^65]. Nesta relação, até o vasto mercado do outro lado do estreito está, de certa forma, com o pescoço preso pela cadeia de suprimentos de uma empresa americana. Esta é precisamente a posição peculiar da ilha de Taiwan: o mundo inteiro, incluindo aquela parte que mais deseja mudar seu status, não pode viver sem os chips fabricados aqui. Apenas que "o mundo não pode viver sem você" e "por isso você está seguro e no comando" ainda são duas coisas muito diferentes. O autor não tira conclusões políticas para Taiwan, mas essa tensão em si merece ser ponderada por cada leitor.

## Indispensável não significa ter o controle

Voltando àquela parede com os logotipos de 55 empresas.

Cada nome na parede é real: eles são a carne e o osso da revolução da IA na Terra; sem eles, a NVIDIA, com seus US$ 5 trilhões, não conseguiria entregar sequer um chip. Essa indispensabilidade é um fato de engenharia, não uma figura de linguagem. Taiwan deveria ter orgulho disso.

Mas, observando todo esse percurso, o brilho, a avaliação de mercado e o poder de decisão recaem sobre quem construiu essa parede; enquanto a margem de lucro de 5%, o consumo excessivo de eletricidade e água, os preços imobiliários inflacionados ao ponto de serem inacessíveis e o risco de guerra depositado na ilha recaem sobre os nomes escritos na parede. Taiwan detém a chave que o mundo inteiro não consegue desligar, mas isso não significa que tenha o controle da situação. Além disso, essa vantagem competitiva tem um prazo de validade próximo de 2028.

Taiwan não está parado: Lai Ching-te propôs em 2025 tornar Taiwan um dos "cinco maiores centros de computação do mundo" e desenvolver a "IA soberana" [^66]; a Foxconn está construindo em Kaohsiung um supercomputador nacional que utilizará 10.000 chips Blackwell [^67]; e as "Dez Novas Grandes Construções de IA" do Executivo pretendem investir mais de NT$ 100 bilhões, com o objetivo de alcançar um valor de produção de NT$ 15 trilhões [^68]. Isso representa a ambição de passar da "fabricação para terceiros" para a "computação para si mesmo": subir um degrau a partir da base da curva de sorrisos.

Contudo, esse caminho ainda é longo: o modelo de linguagem próprio de Taiwan, o TAIDE, é descrito como estando no nível de um "estudante de ensino médio", enquanto as grandes empresas internacionais já estão no nível de "pós-graduados" [^69]. Enquanto o governo da Coreia do Sul adquire 260.000 GPUs de uma só vez, em Taiwan ainda há disputas por terrenos e taxas de rescisão contratual [^70]. Desde atender a uma ligação de Morris Chang até sustentar a capacidade de processamento de todo o mundo, Taiwan levou quase trinta anos para chegar à parede. Mas estar na parede e segurar a caneta são duas coisas diferentes.

Aquela parede continuará brilhando: na próxima Computex, haverá ainda mais logotipos no painel de Jensen Huang. Em 2026, ele revelou que os gastos anuais da NVIDIA em Taiwan já somam cerca de US$ 150 bilhões, comparado aos US$ 10 a 15 bilhões de cinco anos atrás [^71]. A pergunta "Taiwan é importante?" já tem resposta. O que Taiwan precisa responder é a questão mais difícil: quando o mundo inteiro não consegue viver sem o que você produz, como transformar o "ser indispensável" em "ter o controle"?

Os nomes na parede aumentam cada vez mais. Se quem segurará a caneta será o próprio Taiwan — para alcançar essa caneta, o país está apenas começando a esticar o braço.

---

**Leituras complementares**:

- [Jensen Huang: Do jovem que limpava banheiros ao líder de um império de US$ 5 trilhões](/pt/people/jensen-huang) — A história de vida do fundador da NVIDIA; este artigo apenas a menciona, mas sua origem em Tainan e sua trajetória de crescimento estão aqui.
- [Indústria de semicondutores](/pt/technology/taiwan-semiconductor-industry) — Por que Taiwan se tornou o centro global de fabricação de chips; este artigo oferece um contexto mais completo sobre a cadeia de suprimentos.
- [Empresas de Taiwan: TSMC](/pt/economy/tsmc) — A "montanha protetora da nação" que fabrica cada chip para a NVIDIA, e o outro lado de sua exaustão de recursos.
- [Morris Chang: O destinatário daquela carta e o império de fundição de wafers que ele construiu](/pt/people/tsmc-morris-chang) — A pessoa que recebeu a carta de Jensen Huang em 1996, o fundador da TSMC.
- [Computex: Como a feira de computação de Taipé se tornou a cerimônia de abertura da IA global](/pt/technology/computex) — O palco onde a parede de logotipos brilha, a principal arena anual da indústria tecnológica de Taiwan.
- [Indústria de Inteligência Artificial (IA)](/pt/technology/artificial-intelligence-industry) — Da fabricação de chips NVIDIA à criação de um ecossistema de IA: a posição de Taiwan na onda da IA.
- [Desenvolvimento da IA em Taiwan e estratégias futuras](/pt/technology/artificial-intelligence-development-strategy) — IA soberana, TAIDE e a ambição nacional de Taiwan de subir na cadeia de valor além da fabricação.
- [Contando histórias da tecnologia de Taiwan: Um chip nota 100, um microfone nota 60](/pt/technology/taiwan-tech-storytelling) — Duas perspectivas sobre o mesmo chip: como a indústria tecnológica de Taiwan pode aprender com o prêmio de valor que a NVIDIA extrai de suas histórias.
- [Empresas de Taiwan: Foxconn](/pt/economy/foxconn-precision-industry) — O gigante da fabricação que monta 40% dos racks de IA do mundo, a mão mais forte na base da curva de sorrisos.

## Fontes das imagens

- [Jensen Huang na Computex Taipei](https://commons.wikimedia.org/wiki/File:Jensen_Huang_at_Computex_Taipei_20160531c.jpg) — Foto: NVIDIA Taiwan, 2016, CC BY 2.0 (imagem de destaque, Jensen Huang discursando no palco da Computex)
- [Die da GPU NVIDIA Ampere GA102](<https://commons.wikimedia.org/wiki/File:Nvidia@8nm@Ampere@GA102@GeForce_RTX_3090@S_TW_2032A1_SNNB9W.000_GA102-300-A1_DSC06025-DSC06107_(50740715646).jpg>) — Foto: Fritzchens Fritz, CC0 (micrografia do die do chip)
- [Jensen Huang segurando a RTX Blackwell na CES 2025](<https://commons.wikimedia.org/wiki/File:Jensen_Huang_-_RTX_Blackwell_-_Nvidia_Keynote_-_CES_2025_Las_Vegas_(3).jpg>) — Foto: Pronoia, CC0
- [Fábrica da TSMC em Taichung](https://commons.wikimedia.org/wiki/File:TSMC_logo_on_Taichung_factory_building.jpg) — Foto: Briáxis F. Mendes (Meng Bisi), CC BY-SA 4.0
- [Computex Taipei no Centro de Exposições de Nangang, Taipé](https://commons.wikimedia.org/wiki/File:Computex_Taipei_at_Taipei_Nangang_Exhibition_Center_20150602.jpg) — Foto: NVIDIA Taiwan, 2015, CC BY 2.0
- Vídeo: [NVIDIA CEO Jensen Huang Keynote at COMPUTEX 2025](https://www.youtube.com/watch?v=TLzna9__DnI) — Canal oficial da NVIDIA no YouTube

## Referências

[^1]: [NVIDIA torna-se a primeira empresa a atingir US$ 5 trilhões de valor de mercado](https://www.cnbc.com/2025/10/29/nvidia-5-trillion-market-cap.html) — Reportagem da CNBC em 29 de outubro de 2025, informando que a NVIDIA tornou-se a primeira empresa na história a ultrapassar o valor de mercado de cinco trilhões de dólares, impulsionada pela demanda por poder computacional de IA.

[^2]: [Taiwan detém 90% do mercado global de servidores de IA](https://technews.tw/) — Dados do Ministério da Economia e do MIC (Institute for Information Industry): a produção de servidores de Taiwan já representava mais de 80% do mercado global, e a fabricação e montagem de servidores de IA já ocupam 90% do mercado mundial; incluindo os fornecedores de marcas americanas, chega a 100%. O fator impulsionador é a exigência de clientes americanos para que a produção ocorra fora da China.

[^3]: [TrendForce: NVIDIA torna-se o maior cliente da TSMC](https://www.trendforce.com/) — Dados da TrendForce de 1º de junho de 2026, indicando que a contribuição de receita do "Cliente A" (NVIDIA) para a TSMC subiu de 12% em 2024 para 19% em 2025, superando a Apple (de 22% para 17%) e tornando-se o maior cliente. Fonte primária: Relatório Anual de 2025 da TSMC (investor.tsmc.com).

[^4]: [TrendForce: Rubin Ultra adota arquitetura de chip duplo](https://www.trendforce.com/news/) — Análise da TrendForce de 1º de abril de 2026, observando que o empacotamento de quatro chips expandiria a área para 7,5–8 vezes o limite do retículo, o que "prejudicaria gravemente o rendimento e os custos", levando à mudança de design para chip duplo; a IA ocupará 36% da capacidade de 3nm em 2026, comparado a apenas 5% em 2025. As limitações físicas do rendimento de empacotamento determinam diretamente a arquitetura do chip.

[^5]: [NVIDIA FY2025 10-K (SEC)](https://www.sec.gov/Archives/edgar/data/0001045810/000104581025000023/nvda-20250126.htm) — Relatório anual do ano fiscal de 2025 da NVIDIA apresentado à Securities and Exchange Commission (SEC) dos EUA, com margem bruta GAAP anual de 75,0% (72,7% no FY2024).

[^6]: [Resumo do discurso de Jensen Huang na Computex 2025: Mural com logos de 55 empresas taiwanesas](https://money.udn.com/money/story/5612/8750451) — Compilação do Economic Daily News listando palavra por palavra as 55 empresas taiwanesas mencionadas no painel de fundo do palco da Computex 2025 (研揚, 智邦, 台達電... TSMC, UMC, Unimicron, Wistron, Wiwynn, Chung Tai), além de relatar que o mural e os vídeos de agradecimento totalizaram 122 empresas.

[^7]: [Dependência da NVIDIA em relação aos processos de 3/4 nm da TSMC](https://www.ainvest.com/news/) — Análise do setor indicando que os chips mais lucrativos da NVIDIA (H200, Blackwell e Rubin) dependem inteiramente dos processos de 3nm e 4nm da TSMC, constituindo gargalos tanto na fabricação quanto no empacotamento.

[^8]: [Divulgação concentrada da cadeia de suprimentos NVIDIA FY2025 10-K (SEC)](https://www.sec.gov/Archives/edgar/data/0001045810/000104581025000023/nvda-20250126.htm) — Texto original do relatório anual da NVIDIA: "Nossa cadeia de suprimentos está concentrada principalmente na região Ásia-Pacífico. Utilizamos fundições, como a Taiwan Semiconductor Manufacturing Company Limited, ou TSMC... para produzir nossos wafers de semicondutores." A seção de Fatores de Risco lista a concentração geográfica de fornecedores, fundição de wafers e teste/empacotamento como um risco geopolítico.

[^9]: [Capacidade CoWoS da TSMC e participação da NVIDIA](https://www.financialcontent.com/article/tokenring-2025-12-26-tsmc-boosts-cowos-capacity) — Dados da FinancialContent e SiliconAnalysts indicam que a NVIDIA detém cerca de 60% da capacidade CoWoS da TSMC (SiliconAnalysts estima cerca de 595.000 wafers), enquanto a mídia taiwanesa afirma que chegará a 70% em 2025; os três maiores clientes (NVIDIA, Broadcom e AMD) somam mais de 85%.

[^10]: [Foxconn detém mais de 40% de participação na montagem de racks de IA](https://vocus.cc/) — Estimativa da E.SUN Securities indicando que a Foxconn (Ingrasys) é responsável pelos módulos de GPU, placas de switch, placas de computação e sistemas de rack do GB200 NVL72, com participação superior a 40%. Sua fábrica em Nanjing é a primeira "fábrica farol" de servidores de IA do mundo certificada pelo Fórum Econômico Mundial (dezembro de 2023).

[^11]: [Quanta detém mais da metade da participação nos 50 maiores data centers](https://www.artificialintelligence-news.com/news/ai-servers-transform-taiwan-manufacturing-giants/) — Reportagem da AI News informando que a Quanta (QCT) é responsável pela integração L10 e L11, detendo mais de 50% de participação nos 50 maiores data centers em nuvem do mundo, sendo a segunda maior montadora de servidores global.

[^12]: [Nova fábrica de IA da Wistron em Zhubei é totalmente ocupada por pedidos da NVIDIA](https://vocus.cc/) — Reportagem do setor indicando que a Wistron é responsável pelo HGX/DGX, e sua nova unidade no Parque de IA de Zhubei foi "totalmente absorvida pelos fortes pedidos da NVIDIA".

[^13]: [Dados de conferências de resultados sobre margens de servidores de IA de empresas taiwanesas](https://www.cnyes.com/) — Conferências trimestrais de FY2025–FY2026 das empresas: Foxconn com margem bruta de 6,18% no Q1 FY2026 (servidores de IA ultrapassaram 50% da receita de rede em nuvem); Quanta com 4,78% (queda trimestral de 1,54 pontos percentuais, a mais baixa em quase 15 trimestres); Wistron com 5,21%; Wiwynn com 7,2% (contra 9,4% no mesmo período do ano passado).

[^14]: [Margens de lucro de empresas taiwanesas na cadeia de suprimentos secundária (E.SUN Securities)](https://vocus.cc/) — Empresas taiwanesas mais próximas da tecnologia apresentam margens mais altas: Delta Electronics (fontes de alimentação/resfriamento) detém mais de 60% do mercado de fontes para servidores de IA, com margem bruta de 37% no Q1 FY2026; Unimicron (substratos ABF) detém mais de 70% do mercado de substratos para AI ASIC, sendo o único fornecedor atual de placas CoWoP para a NVIDIA, com margem bruta estimada em 21,3%.

[^15]: [Morgan Stanley: Queda na margem de lucro de valor agregado da montagem ODM](https://newtalk.tw/) — Newtalk cita um relatório do Morgan Stanley de 22 de maio de 2026, indicando que a margem de lucro de valor agregado da montagem de sistemas completos de ODM caiu de 2,7% no GB300 para cerca de 1,9% no VR200; o valor agregado por rack de ODM aumentou de aproximadamente US$ 108.000 no GB300 para US$ 149.600 no VR200. Nota: esta é a margem de lucro de valor agregado da montagem do sistema completo, uma métrica diferente da margem de lucro total da empresa (5–7%).

[^16]: [Taiwan Insight: A próspera economia de Taiwan, cujos benefícios a maioria não sente](https://taiwaninsight.org/) — Min-Hua Chiang, da Universidade de Nottingham, escreveu em 12 de janeiro de 2026: "most people in Taiwan did not feel the benefits of the thriving economy." "The top 10% earners in Taiwan received 48% of total income, whereas the bottom 50% only received 12%." A taxa de crescimento econômico estimada para 2025 é de 7,37%, posicionando o país entre os líderes globais.

[^17]: [The Reporter: A divergência em forma de K sob a prosperidade da IA](https://www.twreporter.org/) — Artigo de opinião de Wang Ying-da no The Reporter em 11 de junho de 2026: "A população empregada diretamente nas principais cadeias de crescimento de IA, semicondutores e eletrônicos representa menos de 10% do total de empregados." "O salário mensal total por pessoa no setor de alimentação é de NT$ 38.484, o que equivale a apenas 34,6% em comparação com a indústria de fabricação de componentes eletrônicos." A participação da receita da indústria relacionada à eletrônica no faturamento da manufatura subiu de 58,0% para 64,7%.

[^18]: [《The Nvidia Way》: A apenas trinta dias da falência](https://www.acquired.fm/episodes/nvidia-the-gpu-company-1993-2006) — Obra de Tae Kim (2024) e podcast Acquired/Sequoia, sobre o lema interno da NVIDIA "Our company is thirty days from going out of business." (dito na abertura das reuniões mensais da empresa); em agosto de 1997, quando a RIVA 128 foi lançada, a empresa tinha apenas cerca de um mês de folga para salários. Este é um lema em inglês, sem uma versão literal em chinês.

[^19]: [5 milhões de dólares da SEGA salvaram a NVIDIA](https://www.acquired.fm/episodes/nvidia-the-gpu-company-1993-2006) — Podcast Acquired e registros históricos da fase inicial da NVIDIA; o que realmente tirou a NVIDIA da crise financeira no final da década de 1990 foi um aporte de US$ 5 milhões da SEGA, e não Taiwan; esclarece a narrativa romantizada de que "Taiwan salvou a NVIDIA".

[^20]: [Jensen Huang escreveu uma carta a Morris Chang pedindo fabricação](https://www.ettoday.net/) — ETtoday cita que, por volta de 1996, Jensen Huang escreveu uma carta ao fundador da TSMC, Morris Chang, perguntando se "a TSMC poderia fabricar o primeiro chip da NVIDIA". Em 1998, ambos assinaram formalmente um contrato de cooperação, tornando a TSMC sua principal fundição de semicondutores.

[^21]: [Mi Yu-chieh da TSMC: A colaboração profunda começou em 1997](https://technews.tw/) — Reportagem do TechNews em 19 de maio de 2025, onde Mi Yu-chieh da TSMC relembra: "A colaboração profunda começou em um momento crucial, em 1997. O fundador da TSMC, Morris Chang, entrou em contato pessoalmente com o fundador da NVIDIA, Jensen Huang, para atender à demanda por serviços de fabricação da NVIDIA."

[^22]: [A cena de Jensen Huang atendendo a ligação de Morris Chang (relato de segunda mão)](https://www.businessweekly.com.tw/) — Versão em quadrinhos extraída de uma publicação da Business Weekly relata que, ao receber a ligação de Morris Chang, Jensen Huang gritou para as pessoas ao redor: "Pessoal! Falem baixo! É o Morris Chang ligando!" Este é um relato de segunda mão e o tom pode não ser exato.

[^23]: [Erro no processo da TSMC em 1998 quase destruiu a NVIDIA](https://www.acquired.fm/episodes/nvidia-the-gpu-company-1993-2006) — Podcast Acquired e registros históricos da fase inicial da NVIDIA; em 1998, um erro em um processo químico da TSMC causou o descarte de um grande lote de chips da NVIDIA, quase levando a empresa à falência novamente — confirmando a estrutura de simbiose mútua onde "Taiwan é a artéria vital da fabricação, não o salvador da falência".

[^24]: [AlexNet foi treinada com duas GTX 580](https://en.wikipedia.org/wiki/AlexNet) — Wikipedia e Tom's Hardware; em 2012, Alex Krizhevsky usou duas placas de vídeo NVIDIA GTX 580 no quarto da casa de seus pais para treinar a AlexNet, reduzindo a taxa de erro de reconhecimento de imagem do ImageNet de 26% para 15,3%, superando o segundo colocado em 10,8 pontos percentuais, provando que as GPUs são motores para deep learning. O CUDA foi lançado em 2006.

[^25]: [Blackwell/Rubin dependem 100% do CoWoS-L em Taiwan](https://finance.biggo.com/news/) — Análise industrial (citando o Financial Times); entre 2025 e 2027, as GPUs de IA mais avançadas da NVIDIA estarão 100% dependentes das linhas de produção CoWoS-L da TSMC em Taiwan, desde a fabricação até o empacotamento final.

[^26]: [TSMC detém cerca de 90–92% dos processos avançados globais](https://www.csis.org/analysis/countering-chinas-challenge-american-ai-leadership) — Análise do CSIS; a TSMC produz cerca de 92% dos semicondutores mais avançados do mundo (abaixo de 5 nanômetros), e sua capacidade de empacotamento avançado supera a soma de todos os concorrentes; quase 90% de seus clientes dependentes de Taiwan incluem Apple, Amazon, Google, NVIDIA e Qualcomm.

[^27]: [Yuntsai Chou da NTUST: Impossibilidade de diversificar a fabricação da TSMC a curto prazo](https://www.sciencedirect.com/) — Pesquisa de Yuntsai Chou (NTUST) na ScienceDirect em 2025: "Taiwan's supply chain would be particularly vulnerable to a quarantine initiated before 2027" e "Diversifying TSMC foundries is not feasible in the short term. Building a new leading-edge fab takes 3–4 years and costs $10B+". O objetivo de produção em massa de 2 nm da TSMC em Arizona é para 2030.

[^28]: [United Daily News: As 'Duas Estrelas de Bilhão' tornaram-se 'Indústrias de Bilhão de Tristeza'](https://udn.com/) — O United Daily News revisita a política das Duas Estrelas de Bilhão: "As fabricantes de painéis e as fábricas de memória de semicondutores, que brilharam intensamente, sofreram grandes prejuízos anos depois devido ao excesso de oferta no mercado internacional, sendo apelidadas pelos internautas como 'Mao Shan Dao Shi' (termo que soa como 'margem de 3 a 4%'), referindo-se à margem de lucro bruta de apenas 3% a 4%. As 'Indústrias das Duas Estrelas de Bilhão' tornaram-se 'Indústrias de Bilhão de Tristeza'." O setor de painéis e DRAM foi esvaziado devido ao investimento em P&D de apenas 6% (muito inferior aos 10–21% da Coreia, Japão, EUA e Europa).

[^29]: [SMIC tem rendimento de 5 nm apenas um terço do da TSMC](https://technews.tw/2025/03/28/) — Reportagem da TechNews em 28 de março de 2025: "Os wafers de 5 nm da SMIC com o mesmo processo de fabricação têm preços 50% mais altos que os da TSMC, e o rendimento é apenas 33% do da TSMC devido ao uso exclusivo de equipamentos DUV"; a produção em massa foi anunciada para dezembro de 2025, com um atraso de cerca de cinco anos.

[^30]: [NVIDIA investe US$ 5 bilhões na Intel para garantir capacidade de encapsulamento](https://www.intel.com/) — Em dezembro de 2025, a NVIDIA adquiriu aproximadamente 5% das ações da Intel, com o objetivo real de "garantir acesso prioritário à capacidade de encapsulamento avançado da Intel nos EUA", visando a arquitetura Feynman para 2028 e respondendo aos gargalos de CoWoS da TSMC. Trata-se de uma proteção de longo prazo, não um substituto de curto prazo.

[^31]: [Fábrica de encapsulamento AP1 da TSMC em Arizona iniciará produção em massa em 2028](https://www.tomshardware.com/) — Relatórios do setor indicam que as fábricas de encapsulamento AP1/AP2 da TSMC em Arizona começarão a ser construídas no início de 2026, com previsão de produção em massa da AP1 em 2028; atualmente, 100% dos chips (incluindo os fabricados em Phoenix, Arizona) ainda precisam ser enviados de volta para Taiwan para o encapsulamento. A fábrica da Amkor no Arizona iniciará a produção em massa no início de 2028.

[^32]: [Encapsulamento PiFO da Powertech compara-se ao CoWoS-L](https://www.trendforce.com/news/) — TrendForce, 10 de novembro de 2025: "A tecnologia de encapsulamento avançado PiFO — comparada ao CoWoS-L da TSMC — surgiu como a principal alternativa da indústria". O substrato de vidro oferece melhor dissipação térmica e o custo de produção é cerca de 30% menor, atraindo várias empresas de chips de IA dos EUA, com pedidos já agendados até 2027. No entanto, os clientes são "outras empresas de chips de IA dos EUA", não sendo explicitamente a GPU principal da NVIDIA.

[^33]: [TrendForce: Déficit de CoWoS diminuirá devido à expansão da própria TSMC](https://www.trendforce.com/news/) — TrendForce, 15 de junho de 2026: "the CoWoS supply-demand gap is expected to narrow significantly from around 20% currently to about 10% by the end of 2026". A capacidade mensal pode atingir um recorde de 120.000 a 140.000 unidades em 2026; o déficit diminuirá através da expansão da própria TSMC, e não pela entrada de fornecedores substitutos.

[^34]: [Shin Kong Life venceu licitação de direito de superfície T17/T18 no Distrito de Taipei Science Park em 2021](https://www.cna.com.tw/news/afe/202510035002.aspx) — CNA, em 2021, o governo municipal de Taipei leiloou os direitos de superfície de 50 anos para T17 e T18 no Taipei Science Park (totalizando 3,89 hectares), sem a exigência de um plano de investimento. A Shin Kong Life foi a única licitante, vencendo T17 por NT$ 2,8 bilhões e T18 por NT$ 1,6 bilhão (totalizando NT$ 4,4 bilhões), permanecendo o terreno ocioso por três anos.

[^35]: [Jensen Huang anuncia no Computex 2025 que a sede da Constellation será no Taipei Science Park](https://focustaiwan.tw/business/202505190009) — Focus Taiwan: Em maio de 2025, durante o Computex, Jensen Huang anunciou que a sede internacional da NVIDIA, "Constellation", está planejada para o distrito de Beitou-Shilin Science Park, com investimento superior a NT$ 40 bilhões, início das obras em 2026, inauguração em 2030 e oferta de mais de 10.000 empregos.

[^36]: [Impasse de cinco meses entre NVIDIA, Shin Kong Life e o Governo de Taipei](https://news.pts.org.tw/article/777650) — PTS: Devido ao fato de os direitos de superfície de T17/T18 estarem com a Shin Kong Life e o direito de superfície para fins públicos não poder ser transferido diretamente, as três partes ficaram em impasse sobre a aquisição do terreno por cerca de cinco meses.

[^37]: [Conselho Municipal de Taipei aprova NT$ 4,434 bilhões para taxa de rescisão](https://www.cna.com.tw/news/afe/202510035002.aspx) — CNA, 12 de novembro de 2025: O Conselho Municipal de Taipei aprovou sem objeções o pagamento de uma taxa de rescisão de NT$ 4.434.064.085 (quatro bilhões, quatrocentos e trinta e quatro milhões, sessenta e quatro mil e oitenta e cinco novos dólares taiwaneses) para que o governo municipal recupere o terreno da Shin Kong Life; a extinção do direito de superfície ocorrerá em 28 de dezembro.

[^38]: [You Shu-hui critica fatura de rescisão da Shin Kong Life](https://www.nextapple.com/) — YTN (verificado via WebFetch): A vereadora do KMT, You Shu-hui, declarou textualmente: "Ao ver que na fatura de 8 páginas da Shin Kong Life, até custos como capina, manutenção ambiental, ajuste de logotipo e taxas de despachante devem ser pagos pelo governo de Taipei, só consigo sorrir amargamente... Até o custo de ajuste do logotipo da fusão entre Taishin e Shin Kong deve ser pago pela cidade? É inacreditável... Três suspiros de impotência." Prosseguindo: "A fatura enviada pela Shin Kong Life é absurda, mas o interesse geral deve prevalecer".

[^39]: [Linguagem Jurídica Simples: Partidos do Conselho aprovam rescisão em harmonia](https://plainlaw.me/) — Movimento de Linguagem Jurídica Simples: "Em 12 de novembro, o Conselho Municipal de Taipei aprovou a proposta de multa de rescisão de NT$4,434 milhões; durante o processo, os partidos mantiveram uma harmonia pacífica, e o grupo do DPP chegou a exclamar 'Apoiem a NVIDIA, assinem o contrato o mais rápido possível'"; o presidente Dai Shih-chin "não apresentou objeções para registro", e aplausos ecoaram no local.

[^40]: [Análise da composição da multa de rescisão de NT$4,434 bilhões](https://www.nextapple.com/) — O portal de notícias Eslife e os contadores externos do governo municipal de Taipei calcularam que a Shinju já havia pago cerca de NT$3 bilhões (sem obras por 3 anos) e apresentou uma fatura de rescisão de NT$4,47 bilhões (incluindo custos de capina, ajuste de logotipo e cercamento); após o contador deduzir NT$40 milhões, o valor fixou-se em NT$4,434 bilhões, dos quais os custos próprios da Shinju e impostos pagos, totalizando NT$1,441 bilhão, serão arcados pela NVIDIA.

[^41]: [Comitê de Planejamento Urbano aprova design da sede estilo 'Starship' da Constellation](https://www.cna.com.tw/news/) — CNA, 26 de janeiro de 2026: Fusão dos lotes T17 (2,29 hectares) e T18 (1,6 hectare), com taxa de ocupação subindo de 50% para 70%, coeficiente de área de 300% e altura de 119,5 metros; o design imita a 'Starship' da sede americana, possui 80% de cobertura verde, capacidade para cerca de 4.000 pessoas, com início das obras no final de 2026 e uso previsto para 2030.

[^42]: [NVIDIA Taiwan possui aproximadamente 1.800 funcionários atualmente](https://www.digitimes.com/news/a20250519PD231/) — Mídias como Digitimes estimam que o escritório da NVIDIA em Neihu, Taipei (nº 8, Jihu Rd) possui cerca de 1.800 funcionários e três filiais; este é um número estimado pela mídia, não oficial.

[^43]: [Plano do Centro de Pesquisa e Desenvolvimento de Inovação em IA da NVIDIA](https://focustaiwan.tw/business/202505190009) — Focus Taiwan e Ministério da Economia: Em 2021, a NVIDIA recebeu aprovação para o 'Plano do Centro de Pesquisa e Desenvolvimento de Inovação em IA', com investimento total de NT$24,3 bilhões e subsídio governamental de NT$6,7 bilhões, visando contratar uma equipe de P&D de 1.000 pessoas entre 2022 e 2027.

[^44]: [Fundação da NVIDIA Taiwan Classic Co., Ltd.](https://www.cna.com.tw/news/afe/202510035002.aspx) — CNA: Em novembro de 2025, a NVIDIA fundou a 'NVIDIA Taiwan Classic Co., Ltd.', com o capital social aumentado de NT$1 bilhão para NT$3,3 bilhões; trata-se de uma pessoa jurídica independente, capaz de pagar impostos e deter ativos de forma autônoma.

[^45]: [S&P: Consumo de energia da TSMC pode atingir 23,7% de Taiwan em 2030](https://theinitium.com/20250912-international-tsmc-energy-explainer/) — The Initium e S&P Global: Em 2023, o consumo de energia da TSMC foi de 24,775 bilhões de kWh, representando 8,96% de todo o país (16,2% do setor industrial); em 2024, o consumo foi de 27,456 bilhões de kWh, com apenas 14,1% de energia renovável; a S&P prevê que em 2030 o consumo poderá atingir 23,7% de Taiwan.

[^46]: [Greenpeace: "Sombras após a glória dos chips"](https://www.greenpeace.org/taiwan/press/44037/) — Relatório da Greenpeace de 10 de abril de 2025 (transcrição disponível): O consumo global de energia para fabricação de chips de IA aumentou de 218 GWh para 984 GWh (um aumento de mais de 3,5 vezes por ano), e o consumo de energia em Taiwan disparou para 375,8 GWh, "representando até 38% do total global"; as emissões de carbono dos chips de IA da TSMC atingiram 185.700 toneladas métricas, tornando-a a "campeã das emissões de carbono"; a NVIDIA recebeu nota F, com as emissões da cadeia de suprimentos aumentando de 3,51 milhões para 6,91 milhões de toneladas em três anos, "apenas transferindo o carbono e a poluição da cadeia de suprimentos para outras regiões do mundo".

[^47]: [Água reciclada de Tainan é quase inteiramente destinada à TSMC](https://theinitium.com/20250912-international-tsmc-energy-explainer/) — The Initium: O consumo diário de água da TSMC excede 200.000 toneladas (56.000 no Parque Científico de Hsinchu, 53.000 no Parque Científico de Central Taiwan e 99.000 no Parque Científico de Tainan); as quatro estações de tratamento de água reciclada de Tainan fornecem 81.000 toneladas por dia, "quase inteiramente para a TSMC".

[^48]: [Terras agrícolas de Jianan tiveram irrigação interrompida em 2021 e 2023 para priorizar semicondutores](https://theinitium.com/) — Relatos do The Initium e outros: As terras agrícolas da região de Jianan tiveram a irrigação interrompida duas vezes, em 2021 e 2023, para redirecionar a água de irrigação para o uso da indústria de semicondutores.

[^49]: [Um wafer de 12 polegadas requer 8.327 litros de água](https://www.greenpeace.org/taiwan/) — Greenpeace e dados do setor: A fabricação de um único wafer de 12 polegadas requer aproximadamente 8.327 litros de água.

[^50]: [60.000 empregos em Beishi Ke competindo por apenas 1.476 residências](https://house.udn.com/house/story/123590/8769929) — Economic Daily News Real Estate: O Departamento de Desenvolvimento Econômico de Taipei estima que a população ocupada residente em Beishi Ke pode chegar a 60.000 pessoas, mas as estatísticas da 591 mostram apenas cerca de 1.476 residências disponíveis para venda, com terrenos residenciais ocupando apenas 13,8% de toda a área.

[^51]: [Novos projetos em áreas centrais de Beishi Ke ultrapassam NT$1,5 milhão por ping](https://www.ctee.com.tw/news/20260603701575-430601) — Reportagem do Commercial Times de junho de 2026: Transações de novos projetos em áreas centrais de Beishi Ke ultrapassaram NT$1,5 milhão por ping; "60.000 pessoas competindo por 1.500 residências", com residentes locais temendo congestionamentos como os de Neihu e questionando "por que os preços sobem se a empresa ainda nem começou as obras".

[^52]: [Registro de Preços Reais: Residência no distrito de Shilin atinge máximo de NT$1,88 milhão por ping](https://lvr.land.moi.gov.tw/) — Serviço de Consulta de Transações Imobiliárias do Ministério do Interior: Em 2025, o valor mais alto de transação para um edifício residencial no distrito de Shilin foi de NT$570.400 por metro quadrado (aproximadamente NT$1,88 milhão por ping, na nº 39 Jihu Rd, com preço total de NT$447 milhões), com várias transações acima de NT$1,5 milhão/ping. Nota: Trata-se de mansões em Tianmu e no centro de Shilin, não da área de Beishi Ke propriamente dita.

[^53]: [Setor: Infraestrutura de serviços do parque é precária, um terço dos funcionários pede demissão](https://house.udn.com/house/story/123590/8769929) — United Daily News Real Estate citando setor (anônimo): "Devido à precária infraestrutura de serviços, muitos funcionários não querem se mudar para o parque... e mesmo após a mudança, um terço dos funcionários pede demissão devido à conveniência de transporte limitada"; o Diretor de Transportes, Xie Ming-hong, afirmou que o Departamento de Transportes está avaliando a adição de 3 novas rotas operacionais para Beishi Ke.

[^54]: [Opinião Anônima no PTT: Mudando o tema para a NVIDIA](https://www.ptt.cc/) — Discussão anônima no PTT (não rastreável individualmente, servindo como opinião pública anônima): "Antes estavam cansados do efeito da TSMC, agora mudaram o tema para a NVIDIA" "Muitos engenheiros em Neihu moram em outros condados; quando a NVIDIA vier para o Parque de Ciência e Tecnologia de Nangang, todos se mudarão para lá? A lógica não faz sentido.""

[^55]: [O Debate entre Escudo de Silício e Armadilha de Silício](https://www.researchgate.net/) — Pesquisa de 2025 no ResearchGate intitulada "Silicon Shield or Silicon Trap?", que explora a dualidade da concentração de chips em Taiwan, que simultaneamente constitui uma proteção dissuasória (Escudo de Silício) e um incentivo à agressão ou ponto único de falha (Armadilha de Silício).

[^56]: [Contraponto às Estratégias de "Ninho Quebrado" / "Terra Arrasada"](https://thenewslens.com/) — The News Lens e o artigo "Broken Nest" do Parameters do U.S. Army War College (McKinney & Harris, 2021) e seus contrapontos: "O autossacrifício econômico, mesmo que bem-sucedido em dissuadir a China a curto prazo, pode apenas adiar a agressão chinesa até que a China consiga atingir suas metas domésticas de produção de semicondutores" "é improvável que o público taiwanês veja tal sabotagem como sendo do interesse do próprio país".

[^57]: [Expansão da TSMC nos EUA por US$ 165 bilhões](https://www.foreignaffairs.com/) — A TSMC anunciou um investimento total de US$ 165 bilhões (US$ 65 bilhões mais US$ 100 bilhões) para expansão de fábricas no Arizona, EUA, visando diversificar riscos geopolíticos.

[^58]: [MIT Technology Review: O Escudo de Silício de Taiwan pode estar enfraquecendo](https://www.technologyreview.com/) — MIT Technology Review, 15 de agosto de 2025, "Taiwan's silicon shield could be weakening": "Agora, alguns especialistas em Taiwan e alguns cidadãos da ilha estão preocupados que este 'escudo de silício', se é que algum dia existiu, esteja rachando." Preocupação com a transferência de capacidade produtiva diluir as vantagens estratégicas locais de Taiwan.

[^59]: [Bonnie Glaser: O ecossistema de Taiwan é difícil de replicar](https://www.technologyreview.com/) — MIT Technology Review citando Bonnie Glaser, da Fundação Marshall da Alemanha: "The ecosystem they created is truly unique. It's a function of the talent pipeline, the culture, and laws in Taiwan; you can't easily replicate it anywhere."

[^60]: [Paul Triolo: O Arizona nunca chegará a esse nível](https://www.technologyreview.com/) — MIT Technology Review citando o especialista em política tecnológica Paul Triolo ao avaliar a fábrica da TSMC no Arizona: "Arizona ain't that yet, and never will be."

[^61]: [Jensen Huang: Taiwan é um dos países mais importantes do mundo](https://www.cna.com.tw/) — Relatórios de múltiplas fontes da CNA; em 29 de maio de 2024, Jensen Huang declarou publicamente em Taiwan: "Taiwan is one of the most important countries in the world." (citação original em inglês).

[^62]: [Discurso na Computex 2024 na NTU: Taiwan é um herói anônimo e o pilar do mundo](https://www.tbotaiwan.com/) — Transcrição completa do discurso de Jensen Huang na Computex 2024 na Universidade Nacional de Taiwan; transcrição do vídeo final: "Taiwan é um herói anônimo, mas é o pilar do mundo." "Obrigado, Taiwan!" "Taiwan é o centro de nossos parceiros mais preciosos, e tudo na NVIDIA começa aqui."

[^63]: [Resposta da Oficina de Assuntos de Taiwan ao comentário de Jensen Huang](https://zh.wikinews.org/) — Wiki News; porta-voz da Oficina de Assuntos de Taiwan da China, Chen Bin-hua (18 dias após o ocorrido): "Em relação a esse tipo de declaração extremamente errônea, o povo e os internautas da China continental já expressaram forte insatisfação. Taiwan nunca foi um país... espera-se que ele estude melhor sua história.""

[^64]: [CNA: Mídia chinesa silencia fala de Jensen Huang sobre "Taiwan ser um país importante"](https://www.cna.com.tw/) — CNA, 3 de junho de 2024: "Os meios de comunicação econômicos locais fizeram muitos relatórios relacionados, mas não houve menção ao fato de Jensen Huang ter declarado que 'Taiwan é um país importante', parecendo omitir um tema sensível que normalmente é considerado de 'extrema importância'.""

[^65]: [Especialista: A China precisa da NVIDIA, mas a NVIDIA não precisa da China](https://www.voacantonese.com/a/china-s-media-turned-a-blind-eye-to-jensen-huang-s-statement-20240607/7646642.html) — Voice of America (Cantonese) citando comentários de especialistas, analisando como o silenciamento da mídia econômica chinesa sobre as palavras de Jensen Huang ("Taiwan é um país importante") reflete a relação assimétrica de que "a China precisa da NVIDIA, mas a NVIDIA não precisa da China".

[^66]: [Lai Ching-te: Um dos cinco maiores centros de computação globais e IA Soberana](https://www.bnext.com.tw/article/79391/sovereign-ai) — Digital Age; em outubro de 2025, Lai Ching-te propôs o objetivo de tornar Taiwan um dos "cinco maiores centros de computação do mundo" e desenvolver a "IA Soberana".

[^67]: [Foxconn construirá supercomputador nacional com 10.000 chips Blackwell](https://blogs.nvidia.com.tw/blog/foxconn-ai-factory-tsmc-taiwan-nvidia/) — Blog da NVIDIA Taiwan; a Foxconn (Big Innovation Company) construirá em Kaohsiung um supercomputador nacional utilizando 10.000 chips Blackwell, com mais de 90 exaflops, colaborando com a TSMC e o National Science and Technology Council para criar a primeira fábrica de IA de Taiwan.

[^68]: [As Dez Novas Grandes Construções de IA do Executivo](https://iknow.stpi.niar.org.tw/post/Read.aspx?PostID=21832) — STPI iKnow; o plano das "Dez Novas Grandes Construções de IA" do Executivo prevê um investimento superior a NT$ 100 bilhões até 2040, com o objetivo de atingir um valor de produção de NT$ 15 trilhões.

[^69]: [TAIDE é como um estudante de ensino médio, grandes empresas internacionais são nível pós-graduação](https://www.cw.com.tw/article/5137534) — Revista Common Wealth: o modelo de linguagem local de Taiwan, TAIDE, foi descrito como "como um estudante de ensino médio, enquanto as grandes empresas internacionais já estão no nível de pós-graduação". O orçamento anual do projeto TAIDE é inferior ao custo de um único treinamento de modelos internacionais; o TAIDE começou com 9 unidades (72 chips) H100.

[^70]: [Governo da Coreia do Sul adquire 260.000 GPUs](https://www.cw.com.tw/) — Relatórios da Common Wealth e do setor: o governo sul-coreano adquiriu diretamente 260.000 GPUs, contrastando com a relativa hesitação de Taiwan nas decisões políticas.

[^71]: [Jensen Huang no Computex 2026: gastos anuais em Taiwan de cerca de US$ 150 bilhões](https://cryptobriefing.com/nvidia-150b-taiwan-silicon-shield-ai/) — Cryptobriefing e Reuters: Jensen Huang revelou no Computex 2026 que a NVIDIA gasta anualmente cerca de US$ 150 bilhões em Taiwan (cinco anos atrás eram apenas US$ 10 a 15 bilhões). Os parceiros da cadeia de suprimentos Vera Rubin dobraram, incluindo 150 empresas taiwanesas; a TSMC produz cerca de 90% dos processos mais avançados do mundo.
