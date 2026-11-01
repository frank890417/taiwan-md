---
title: 'Mini Taiwan Pulse: Com olhos de curador, transformando Taiwan em um mapa que respira'
description: 'Em 2026, o analista de dados Migu arrastou um arquivo CSV para o Kepler.gl e a primeira vez que um mapa de Taiwan surgiu na tela. Dois anos depois, o popular mini-taiwan-pulse acumulou 375 estrelas no GitHub, sobrepondo cinco tipos de dados em tempo real — céu, oceano, terra, ruas e coleta de resíduos — para criar um mapa dinâmico. Com mais de 50.000 registros do governo central e dados abertos de mais de vinte cidades e condados, o cérebro humano não conseguiria processar tudo; sua solução não foi contratar mais pessoas, mas sim entregar a tarefa a um sistema autônomo orquestrado por agentes de IA, onde os humanos apenas formulam as perguntas e validam os resultados. De olhos curadores treinados em planejamento urbano a uma pipeline de detecção de incêndios que roda sozinha no tmux, como o GitHub de uma única pessoa se transformou em uma galáxia.'
date: 2026-04-19
category: 'Technology'
tags:
  [
    'Tecnologia',
    'Civic Tech',
    'Dados Abertos',
    'Visualização de Dados',
    'Projeto Open Source',
    'TDX',
    'Three.js',
    'Inteligência Artificial',
    'AI Agent',
    'GIS',
  ]
subcategory: '公民科技'
author: 'Taiwan.md'
featured: false
lastVerified: 2026-06-25
lastHumanReview: true
readingTime: 20
image: '/article-images/technology/mini-taiwan-pulse-map-2026.webp'
imageCredit: 'Migu / sciwork 2026'
imageLicense: 'Fair use editorial commentary'
imageSource: 'https://github.com/ianlkl11234s/0613-sci-work-share'
relatedDiary: ['2026-06-25-203919-manual-mirror']
sporeLinks:
  - id: 150
    platform: 'threads'
    date: '2026-06-25'
    url: 'https://www.threads.com/@taiwandotmd/post/DaA6aTRk7e6'
  - id: 151
    platform: 'x'
    date: '2026-06-25'
    url: 'https://x.com/taiwandotmd/status/2070173370118000879'
translatedFrom: 'Technology/mini-taiwan-pulse.md'
sourceCommitSha: 'f4ae4fb8f'
sourceContentHash: 'sha256:0128d89b548611d1'
sourceBodyHash: 'sha256:ce5c6e11aac7eea6'
translatedAt: '2026-10-21T01:00:03.772792+00:00'
---

# Mini Taiwan Pulse: com olhar curatorial, Taiwan se transforma em um mapa que respira

Em certo dia do início de 2026, um analista de dados chamado Migu converteu um arquivo CSV em GeoJSON e o arrastou para uma ferramenta chamada Kepler.gl no navegador. Sem escrever uma única linha de código, viu surgir na tela seu primeiro mapa de Taiwan.

Na universidade, ele havia estudado planejamento urbano e tido algum contato com GIS — sistema de informações geográficas, ou, em termos simples, uma ferramenta que permite situar dados em um mapa. Depois de entrar no mercado de trabalho e seguir pela área de análise de dados, passou muito tempo sem voltar a trabalhar com mapas. Naquele dia, ao arrastar o CSV para o Kepler.gl e ver Taiwan tomar forma na tela, uma surpresa muito simples lhe veio à mente:

> “Então Taiwan tem tantos dados assim; e transformá-los em um mapa não é difícil.”[^1]

A frase não parece nada de extraordinário. Mais tarde, porém, ela se tornaria a semente de todo um sistema.

> **Visão geral em 30 segundos:** desde o fim de 2025, Migu — `ianlkl11234s` no GitHub — criou mais de uma dezena de projetos de visualização com dados abertos de Taiwan. O mais popular, mini-taiwan-pulse, acumulou 375 estrelas no GitHub e sobrepõe cinco tipos de dados em tempo real — céu, oceano, terra, ruas e coleta de resíduos — em um único mapa animado[^2]. Mas, em uma palestra para a comunidade sciwork em junho de 2026, ele expôs o problema sem rodeios: só o governo central de Taiwan disponibiliza cerca de 50 mil conjuntos de dados abertos, dispersos ainda por plataformas de mais de vinte condados e municípios. “O cérebro humano não consegue examinar tudo.” Sua resposta não foi pedir que mais pessoas ajudassem nessa triagem, mas entregar todo o acervo a um sistema orquestrado por agentes de IA, capaz de crescer por conta própria, enquanto os seres humanos se limitam a formular as perguntas e validar os resultados[^3].

Este artigo trata do caminho percorrido por uma pessoa: da ingenuidade de arrastar um arquivo CSV até a decisão de deixar que um sistema crescesse em seu lugar.

## Um GitHub individual que se tornou uma galáxia

Se olharmos apenas para o projeto `mini-taiwan-pulse`, é fácil imaginar Migu como um engenheiro amador: alguém que, por puro entusiasmo de fim de semana, criou um demo que acabou viralizando.

Essa percepção está errada em dois pontos.

Primeiro, ele fez muito mais do que apenas um projeto. Ao abrir o seu GitHub, nota-se que, após dezembro de 2025, há uma densa lista de visualizações de dados abertos de Taiwan: tudo começou com um PoC (Prova de Conceito) sobre rotas de ônibus para testar o terreno; em seguida, no final de dezembro, um projeto de aprendizado chamado `mini-taiwan-learning-project` ganhou tração primeiro, acumulando 189 estrelas até hoje. Em fevereiro, ele criou pontos de localização em tempo real via AIS para embarcações e o `flight-arc-graph` (56 estrelas), que desenha arcos para cada decolagem e pouso de voos. Somente no final de fevereiro é que surgiu o `mini-taiwan-pulse`. Depois vieram o atlas da TRTC (Taiwan Railways), órbitas de satélites, imagens de CCTV em tempo real, um painel de monitoramento consolidado com todos os dados chamado `mini-taiwan-info`... e assim por diante até junho[^2]. Mais de uma dezena de repositórios formam um conjunto que ele mesmo batizou de galáxia "Mini Taiwan".

![Painel de monitoramento Mini Taiwan Info, que consolida diversos temas de dados abertos — como população, transporte ferroviário, navegação, recursos hídricos, combate a incêndios e saúde — em um painel de monitoramento de um tema por página](/article-images/technology/mini-taiwan-info-dashboard-2026.webp)

_Outro membro da galáxia, o Mini Taiwan Info: ele consolidou dados abertos dispersos em um painel de monitoramento de situação, com temas como população, transporte ferroviário, navegação, recursos hídricos, combate a incêndios e saúde, cada um em uma página. Foto: Migu / sciwork 2026 (uso justo para fins de edição e crítica)._

Ao organizar o número de estrelas desses projetos, fica claro que não houve apenas um sucesso.

```tw-bars
GitHub de Migu: mais de um repo de destaque (estrelas no GitHub)
*mini-taiwan-pulse | 375 | Flagship
mini-taiwan-learning-project | 189 | Viralizou antes do pulse
flight-arc-graph | 56 | Trajetórias de voo
tw-ship-viz | 11 | Embarcações
mini-tw-cctv | 6 | Imagens em tempo real
satellite-arc | 6 | Satélites
Fonte: GitHub API, 25/06/2026
```

O segundo erro de percepção está escondido nas palavras "uma pessoa", algo que analisaremos em breve. Primeiro, vejamos como a galáxia cresceu.

```tw-timeline
2025-12 | Primeiro teste | PoC de rotas de ônibus, a primeira tentativa com dados abertos de Taiwan
2025-12 | learning-project viraliza primeiro | Visualização de transporte ferroviário em Taipé, viralizou antes do flagship (189★)
2026-02 | Nascimento do flagship | Lançamento do mini-taiwan-pulse, evoluindo de JSON estático para um banco de dados espaço-temporal
2026-06 | Expansão do sistema completo | Palestra na sciwork 2026: um sistema que entrega dados abertos para ser cultivado por Agentes
Fonte: Registros de projetos do GitHub de Migu (cronologia e estrelas) e conteúdo da palestra sciwork 2026[^2][^3]
```

## O mesmo método, do metrô ao Sistema Solar

O próprio projeto principal também continuou crescendo. A primeira versão do mini-taiwan-pulse tinha três camadas: céu, oceano e terra. Na versão apresentada na palestra, já havia “cinco pulsos em movimento conjunto”: aviões no céu, navios no oceano, trens em terra, ônibus nas ruas e caminhões de coleta de lixo. Cinco tipos de dados em tempo real, atualizados em frequências diferentes, foram sobrepostos em um único mapa que respira. Segundo Migu, foi a primeira vez que o projeto “evoluiu de um JSON estático para um banco de dados espaço-temporal”[^3]. Apenas a camada das ruas, afirmou, estava conectada a mais de 5.700 ônibus do TDX, com a posição de cada veículo atualizada a cada 30 segundos.

![DAY 0, o primeiro mapa: um arquivo CSV foi convertido em GeoJSON e arrastado para o Kepler.gl; sem escrever código, surgiu o primeiro mapa de Taiwan](/article-images/technology/mini-taiwan-kepler-day0-2026.webp)

_O “DAY 0” de sua palestra: ao converter um arquivo CSV em GeoJSON e arrastá-lo para o Kepler.gl, ele obteve o primeiro mapa de Taiwan sem escrever nenhuma linha de código. Foi o ponto de partida de toda a galáxia. Imagem: Migu / sciwork 2026 (uso legítimo para comentário editorial)._

A primeira centelha dessa galáxia foi uma visualização ferroviária de Taipé que ele chamou de “Mini Taipei”. Migu sobrepôs em um mapa animado três sistemas ferroviários — metrô, Taiwan Railways e trem de alta velocidade —, com os veículos circulando de acordo com os horários programados. Segundo ele, foi naquele momento que “experimentou o encanto do movimento”: havia mais de trezentos trens em circulação simultânea na tela[^3]. Uma tabela de horários estática transformou-se, assim, na respiração de uma cidade.

![O Mini Taipei sobrepõe metrô, Taiwan Railways e trem de alta velocidade em um mapa animado, com mais de trezentos trens circulando segundo os horários programados](/article-images/technology/mini-taiwan-taipei-rail-2026.webp)

_Mini Taipei: metrô, Taiwan Railways e trem de alta velocidade aparecem juntos, com mais de trezentos trens circulando segundo os horários programados. Segundo Migu, foi a primeira vez que “experimentou o encanto do movimento”. Imagem: Migu / sciwork 2026 (uso legítimo para comentário editorial)._

A partir daí, como se tivesse ficado viciado, ele passou a aplicar o mesmo método de “transformar dados em movimento” a escalas cada vez maiores. No mar, conectou-se às posições AIS em tempo real da Administração Marítima e Portuária e usou esferas luminosas azul-esverdeadas, acompanhadas por rastros em gradiente dos trinta minutos anteriores, para mostrar o destino dos navios nas águas ao redor de Taiwan.

![Navios nas águas ao redor de Taiwan, representados com posições AIS em tempo real da Administração Marítima e Portuária, esferas azul-esverdeadas e rastros em gradiente de trinta minutos](/article-images/technology/mini-taiwan-ships-ais-2026.webp)

_O pulso do oceano: posições AIS em tempo real da Administração Marítima e Portuária, com esferas azul-esverdeadas e rastros em gradiente dos trinta minutos anteriores, mostram os navios nas águas ao redor de Taiwan. Imagem: Migu / sciwork 2026 (uso legítimo para comentário editorial)._

Depois, ele levou o mesmo método para além da Terra. Com parâmetros orbitais TLE públicos, estimou a posição de satélites, desenhou suas trajetórias sobre Taiwan e, em seguida, estendeu o trabalho a todo o Sistema Solar. Na apresentação, foi direto: “O mesmo método pode ser ampliado indefinidamente, desde que existam dados.”[^3] É nesse momento que se percebe que sua verdadeira fascinação está em “transformar dados em algo visível”. O mapa foi apenas sua primeira forma.

![Visualização de órbitas de satélites calculadas com dados TLE públicos; o mesmo método se estende da superfície de Taiwan ao espaço](/article-images/technology/mini-taiwan-satellite-2026.webp)

_O mesmo método levado para além da Terra: parâmetros TLE públicos são usados para calcular órbitas de satélites, com uma extensão posterior para todo o Sistema Solar. Imagem: Migu / sciwork 2026 (uso legítimo para comentário editorial)._

## Sobrepor ilhas de dados: as lacunas aparecem sozinhas

Aos poucos, o que merecia atenção deixou de ser apenas “pontos em tempo real que se movimentam” e passou a ser “a sobreposição de dados originalmente desconectados, fazendo as lacunas aparecerem por conta própria”. Alguns projetos dessa galáxia são dedicados exatamente a isso. Um deles, chamado por Migu de “Agricultura × Água”, sobrepõe em um único mapa as ilhas de dados de três áreas governamentais — agricultura, recursos hídricos e prevenção de desastres —, reunindo terras agrícolas, rios, canais, diques e áreas suscetíveis a inundações. Para que essa visualização funcionasse no navegador, ele usou o formato PMTiles com requisições HTTP por intervalo, reduzindo um conjunto de 400 MB a cerca de 5 MB efetivamente carregados pelo navegador[^3].

![Mapa integrado Agricultura × Água: dados abertos de diferentes órgãos, como terras agrícolas, rios, canais, diques e áreas suscetíveis a inundações, são sobrepostos em um único mapa](/article-images/technology/mini-taiwan-farm-water-2026.webp)

_Agricultura × Água: as ilhas de dados de três áreas governamentais — agricultura, recursos hídricos e prevenção de desastres — são reunidas em um mapa com terras agrícolas, rios, canais, diques e áreas suscetíveis a inundações. Imagem: Migu / sciwork 2026 (uso legítimo para comentário editorial)._

Outro projeto sobrepõe hospitais, clínicas, farmácias, desfibriladores externos automáticos (AED) e unidades de cuidados prolongados à densidade populacional, acrescentando isócronas. Segundo ele, isso permite “ver a acessibilidade e também os desertos de assistência médica”: lugares em que a população está a uma distância excessiva do recurso de saúde mais próximo.

![Mapa de acessibilidade aos serviços de saúde: hospitais, clínicas, farmácias, AED e unidades de cuidados prolongados são sobrepostos à população e cercados por isócronas, revelando os desertos de assistência médica](/article-images/technology/mini-taiwan-medical-2026.webp)

_Recursos de saúde: hospitais, clínicas, farmácias, AED e unidades de cuidados prolongados são sobrepostos à população e complementados com isócronas para “ver a acessibilidade e também os desertos de assistência médica”. Imagem: Migu / sciwork 2026 (uso legítimo para comentário editorial)._

Na área de desastres, ele foi ainda mais minucioso: dados com frequências de atualização diferentes — ecos de radar, níveis de reservatórios, precipitação e alertas de desastre — são unificados internamente em uma única linha do tempo. Quando o usuário a arrasta, todas as camadas reproduzem o passado em sincronia. Onde uma tempestade começou, como o reservatório subiu e quando o alerta foi emitido passam a formar uma cadeia causal em uma única tela.

![Linha do tempo de chuva intensa e desastres: ecos de radar, reservatórios, precipitação e alertas, atualizados em frequências diferentes, são unificados e reproduzidos em sincronia](/article-images/technology/mini-taiwan-disaster-2026.webp)

_Chuvas intensas e desastres: ecos de radar, reservatórios, precipitação e alertas são unificados internamente em uma única linha do tempo; basta arrastá-la para reproduzir todas as camadas em sincronia. Imagem: Migu / sciwork 2026 (uso legítimo para comentário editorial)._

Há também o flight-arc, que representa cada trecho de pouso e decolagem como um arco. A mesma API, alimentada com dados de aeroportos diferentes, faz surgir uma “impressão digital” própria para cada um: Taoyuan, Haneda em Tóquio e Frankfurt assumem formas distintas. Migu destacou especialmente o aeroporto de Atlanta, o mais movimentado do mundo, onde cinco pistas paralelas e os circuitos de espera produzem uma geometria “parecida com uma pista de corrida”. Segundo ele, aquela imagem continha 1.839 trajetórias[^3].

![Trajetórias de todos os pousos e decolagens do aeroporto de Atlanta durante determinado período; cinco pistas paralelas e os circuitos de espera formam uma geometria semelhante a uma pista de corrida](/article-images/technology/mini-taiwan-flight-arc-atlanta-2026.webp)

_O flight-arc sobrepõe todos os pousos e decolagens do aeroporto de Atlanta durante determinado período: cinco pistas paralelas e circuitos de espera desenham uma geometria semelhante a uma pista de corrida. Segundo Migu, o próprio fluxo é uma forma. Imagem: Migu / sciwork 2026 (uso legítimo para comentário editorial)._

> 📝 **Nota do curador**
> Dois anos atrás, se alguém dissesse que “uma pessoa criou o mapa em tempo real mais completo dos dados abertos de Taiwan”, a resposta seguinte provavelmente seria: “Então ela deve estar exausta.” Essa intuição vincula escala e mão de obra: quanto maior a produção, maior o desgaste humano. A galáxia de Migu merece atenção justamente porque rompeu esse vínculo. Uma pessoa avançava simultaneamente em mais de uma dezena de repositórios, enquanto o projeto principal continuava ganhando funcionalidades. Por trás disso havia uma mudança mais fundamental: nas fases posteriores, uma parcela cada vez maior dos commits não era escrita pelas próprias mãos de Migu. Como essa “uma pessoa” passou a existir é a verdadeira questão deste artigo.

## Cinquenta e dois mil oitocentos e noventa e um conjuntos: o cérebro humano não consegue examinar tudo

Até aqui, a história parece relativamente linear: uma pessoa talentosa produz cada vez mais e cada vez melhor. A virada ocorre no meio da palestra, quando Migu deixa de falar sobre “o que eu fiz” e começa a explicar “contra que parede eu bati”.

Ele apresentou um slide intitulado “Por que usar OSINT agêntica”. Nele, um número ocupava lugar de destaque: cerca de 52.891 conjuntos de dados no data.gov.tw. Somadas as plataformas de dados abertos dos 22 condados e municípios, haveria cerca de 60 mil ou 70 mil conjuntos, incluindo duplicatas. E isso ainda não incluía os dados mantidos por organizações privadas, ONGs e instituições acadêmicas que não aparecem nos catálogos governamentais. Sua conclusão foi curta:

> “O cérebro humano não consegue examinar tudo.”[^3]

Esse é o eixo de toda a história. A pessoa que, na primeira metade, arrastava um CSV e exclamava “Então há tantos dados assim” agora se deparava com o outro lado dessa abundância. Mesmo que alguém lesse cem dos mais de 50 mil conjuntos do data.gov.tw por dia, levaria mais de quinhentos dias consecutivos para percorrer uma única vez apenas esse catálogo central. Há dados demais para uma pessoa ler durante toda a vida, muito menos para fazê-los conversar entre si. O esforço individual encontra aqui seu teto.

O que Migu realmente compreendeu está na frase seguinte. Para ele, a impossibilidade de examinar tantos dados era um sinal de que era preciso mudar de ferramenta:

> “Os dados precisam ser visíveis para o LLM; só então o agente poderá ajudar você a descobrir ‘quais dados devem ser observados em conjunto’.”[^3]

A expressão decisiva é “observados em conjunto”. Mesmo que alguém decorasse o nome dos 50 mil conjuntos de dados, dificilmente concluiria, apenas com base na memória, que um “mapa de risco de incêndio” deve ser combinado com “áreas de difícil acesso para resgate”, ou que “localização de hospitais” precisa ser sobreposta à “densidade populacional” para revelar desertos de assistência médica. O valor dos dados não está em cada conjunto isolado, mas em suas combinações; e o número de combinações possíveis entre 50 mil conjuntos alcança uma escala astronômica. É justamente aí que o cérebro humano não dá conta, mas as máquinas se destacam.

> 📝 **Nota do curador**
> A narrativa habitual sobre dados abertos estabelece uma divisão clara de responsabilidades. Depois do hackathon “Escrever programas para transformar a sociedade”, realizado na Academia Sinica em 2012, o g0v demonstrou isso de maneira exemplar: o governo abre os dados, e a comunidade cívica faz com que eles sejam vistos. Em 2020, no mapa de máscaras, Wu Chan-wei e seus colaboradores transformaram, em 72 horas, os dados de estoque da Administração Nacional de Seguro de Saúde em um mapa acessível a toda a população. Foi uma das manifestações mais comoventes dessa divisão[^4]. A narrativa antiga colocaria Migu como sua continuação: se o g0v era um coletivo, ele seria a versão individual do mapa de máscaras.
>
> Mas essa comparação permanece na superfície e ainda inverte a causalidade. O motivo pelo qual Migu consegue, sozinho, aproximar-se da escala de “toda uma galáxia de dados” não é sua força de trabalho. Desde o início, ele não pretendia enfrentar o oceano de dados por meio de trabalho braçal exaustivo. Em vez de interpretar “o cérebro humano não consegue examinar tudo” como uma admissão de derrota, é melhor entendê-la como o ponto de partida para a substituição de todo o seu modelo de trabalho. A verdadeira novidade não é “indivíduo versus coletivo”, mas “indivíduo × agente”: uma pessoa só alcança a escala de uma galáxia porque nem todos os commits foram digitados por ela. É assim que esse sistema funciona.

## Não escrevi uma palavra: um pipeline de incêndios que se executa sozinho

A melhor forma de compreender o significado de “entregar aos agentes” é examinar o exemplo dos incêndios apresentado na palestra.

Migu disse que forneceu ao sistema apenas uma frase: “Analise os dados públicos relacionados a incêndios em Taiwan.” Depois, deixou-o trabalhar.

O sistema começou a expandir sozinho o escopo da busca. Migu descreveu o processo por meio de uma sequência crescente de números: primeiro, 582 resultados por palavras-chave; depois, 1.945 resultados com a expansão por sinônimos e temas; em seguida, busca complementar de texto integral e eliminação de duplicatas; por fim, um catálogo unificado com 73.900 registros provenientes de 21 plataformas[^3]. Uma frase entrou; um inventário de mais de 70 mil registros saiu.

```tw-figure
Uma frase → 73.900 registros
Ele forneceu a instrução “Analise os dados públicos relacionados a incêndios em Taiwan”; o sistema expandiu sozinho a busca e consolidou um catálogo unificado com dados de 21 plataformas
Segundo sua apresentação na sciwork 2026
```

A coleta não encerrou o processo. Em seguida, o pipeline dividiu os incêndios em seis etapas — prevenção, resposta, notificação, análise da origem, perdas e relatórios — e as cruzou com os 22 condados e municípios para produzir uma matriz de cobertura. O levantamento chegou a encontrar recursos locais, como mapas de risco de incêndio de Hsinchu, áreas de difícil acesso para resgate em Taipé e operações de salvamento nos reservatórios de irrigação de Taoyuan. Também indicou com franqueza as lacunas: não havia uma API de incêndios em tempo real, as coordenadas de ocorrências individuais eram escassas e os dados de acompanhamento pós-desastre não eram públicos.

Depois veio a análise. Migu mostrou um relatório sobre as causas de incêndios produzido pelo próprio sistema: com base em 15.405 registros nacionais do ano 113 do calendário da República da China, os fatores elétricos eram a principal causa na cidade de Nova Taipé, com 30,9%; no condado de Pingtung, eram as pontas de cigarro, com 35,2%[^3]. Esses números foram produzidos por agentes que conectaram APIs de diferentes fontes, conforme a captura de tela apresentada por Migu, e não por cálculos manuais realizados registro por registro.

Nesse momento, ele exibiu no slide uma frase com espaços deliberados entre as palavras, como se temesse que o público não a percebesse:

> “Pipeline produzido automaticamente. Eu não escrevi uma única palavra.”[^3]

Essa frase foi o ponto de ignição da palestra. Ela transformou a ideia um tanto abstrata de “entregar aos agentes” em um fato concreto e quase inquietante: entre uma única frase, um catálogo com mais de 70 mil registros e um relatório de causas dividido por condado e município, o lugar normalmente ocupado por uma pessoa — dando instruções, escrevendo scripts, limpando dados e executando análises — estava vazio.

![Resultado do pipeline de análise temática de incêndios: o sistema inventaria automaticamente dados abertos relacionados ao tema em diversas plataformas e lista conjuntos candidatos e uma matriz de cobertura](/article-images/technology/mini-taiwan-fire-pipeline-2026.webp)

_O inventário temático de incêndios apresentado por Migu na sciwork 2026: ao receber a frase “Analise os dados públicos relacionados a incêndios em Taiwan”, o sistema expandiu sozinho a busca e consolidou dados de várias plataformas em um catálogo unificado. Segundo ele, nesse pipeline, “eu não escrevi uma única palavra”. Imagem: Migu / sciwork 2026 (uso legítimo para comentário editorial)._

## Quatro etapas substituíveis: os dados entram, o relatório se envia sozinho

O pipeline de incêndios é apenas um recorte de todo o sistema. Ele é dividido em quatro etapas: recepção de dados, integração de conhecimento, geração de análises e acionamento de ações. Migu enfatiza que “cada etapa pode ser substituída isoladamente, sem reconstruir o sistema inteiro”. A própria camada inferior, de recepção dos dados, evoluiu ao longo do tempo. No início, ele acessava manualmente o data.gov.tw, baixava arquivos Excel, lia-os e os armazenava por conta própria; o gargalo era a “memória humana”. Na fase intermediária, passou a procurar APIs na internet, coletar relatórios em PDF e extrair dados das plataformas de cada condado e município, mas o problema era a “falta de um índice”. Agora, os metadados de cada conjunto são padronizados e armazenados em um catálogo SQLite, que pode ser consultado e ampliado automaticamente[^3]. O sistema conta com mais de quarenta coletores de dados: YouBike, ônibus, tráfego nas rodovias nacionais, horários da Taiwan Railways, AIS de navios, satélites meteorológicos, terremotos, níveis de reservatórios e qualidade do ar. Segundo Migu, três falhas consecutivas acionam imediatamente um alerta no Telegram, enquanto uma revisão diária é enviada ao seu e-mail todas as manhãs, às nove horas[^3].

Na última etapa, o “acionamento de ações”, ele descreve com maior clareza o papel humano: “O agente executa o ciclo inteiro. Papel dos seres humanos: definir o objetivo e receber o relatório. As cinco engrenagens intermediárias giram sozinhas: descoberta, coleta, integração, produção e monitoramento.” O sistema chega a gerar automaticamente um boletim semanal de “novos dados abertos desta semana”. Nas palavras de Migu: “Os temas surgem sozinhos; os relatórios chegam sozinhos à caixa de entrada.”[^3]

## Um comandante e uma série de painéis: a frota de Claude no tmux

É fácil tratar a afirmação de que “o agente executa o ciclo inteiro” como mero discurso de marketing. No trecho final da palestra, Migu levantou a tampa e mostrou como eram as engrenagens internas. A estrutura revelou-se muito mais concreta — e mais honesta — do que o slogan.

Primeiro, vejamos o ciclo inteiro. Segundo Migu, seu sistema GIS consiste em “um núcleo de orquestração que conecta uma série de repositórios independentes, pelos quais os agentes passam em sequência”. Primeiro, eles entram no repositório responsável pela exploração para identificar os dados que valem a pena; depois, seguem para o repositório de coleta, que incorpora esses dados; por fim, entram em repositórios de apresentação, como mini-taiwan-pulse ou mini-taiwan-info, para desenhar os mapas. Sua descrição é precisa: “Cada estação é um repositório independente; a camada de orquestração cuida apenas do progresso e das decisões, enquanto o trabalho fica nas mãos dos workers de cada repositório.”[^3]

Ele chama esse núcleo de Orchestrator. Em essência, trata-se de “uma sessão do Claude”. Esse agente principal trabalha como um supervisor: lê um documento de proposta, divide as tarefas, ordena suas dependências e dá início ao trabalho.

A forma de iniciar esse trabalho é a etapa central da arquitetura. Migu não deixa uma única IA cuidar de tudo do começo ao fim. Em vez disso, usa o tmux — uma ferramenta antiga que divide o terminal em vários painéis independentes — para isolar o trabalho. Nas palavras dele: “Um Orchestrator, um grupo de Workers. O agente principal é uma sessão do Claude; o tmux cuida do isolamento, e cada Worker tem seu próprio painel e sua própria sessão.” Em uma definição ainda mais concisa: “Um Worker = um painel do tmux + uma sessão independente + um PR.”[^3]

Em outras palavras, ele comanda uma frota de IAs. Cada worker é uma instância do Claude isolada em seu próprio painel, executando uma tarefa distinta e entregando seu próprio pull request, sem interferir nos demais.

![Funcionamento do sistema de orquestração de agentes: uma sessão do Claude atua como orchestrator, lê as tarefas, divide o trabalho e dirige os workers](/article-images/technology/mini-taiwan-agent-orchestrator-2026.webp)

_O núcleo de orquestração revelado na apresentação: uma sessão do Claude atua como orchestrator e distribui tarefas a workers isolados em painéis próprios do tmux; cada um trabalha separadamente e entrega um PR. Imagem: Migu / sciwork 2026 (uso legítimo para comentário editorial)._

Como impedir que esses workers independentes entrem em conflito? Por meio de uma memória compartilhada. Segundo Migu, todo o progresso e todas as decisões são registrados em documentos e centralizados em um quadro chamado `SESSION_BOARD.md`. Além disso, há “um relatório por sessão”, de modo que “ninguém precisa adivinhar o que o outro está fazendo” e “cada pessoa tem seu arquivo, sem conflitos”[^3]. Até a transferência das tarefas é documentada: um arquivo `HANDOFF.md` prepara “a instrução para o próximo participante”, permitindo que a próxima rodada de agentes assuma o trabalho sem começar do zero. Migu descreveu com cautela a última barreira: “Na validação, o Orchestrator confere o PR com base nos documentos; a decisão de fazer o merge cabe a uma pessoa. Só então o ciclo está encerrado.”

Quando o processo é disposto em linha reta, aparece uma forma limpa: uma pessoa dá a instrução; um grupo de IAs isoladas trabalha separadamente e registra o que fez; um núcleo confere o resultado com base na documentação; e a pessoa que decide se aquele trabalho será aceito é o próprio Migu. Voltando ao eixo deste artigo: como havia dados demais para examinar, a tarefa inteira de examiná-los foi entregue à frota; o ser humano recuou até restarem apenas duas ações — formular o problema e validar o resultado. Na apresentação, Migu transformou essa ideia em uma declaração:

> “Quando o agente consegue executar o ciclo inteiro sozinho, o trabalho humano se reduz a formular problemas e validar resultados.”[^3]

É também esse o sentido do título de sua palestra: “Entregar os dados abertos de Taiwan aos agentes para formar um sistema que cresce sozinho.” Os dados fluem sozinhos, as páginas crescem sozinhas; basta formular corretamente o problema e validar bem o resultado.

## O mesmo solo produz a mesma estrutura

Se você conhece o Taiwan.md — este projeto de curadoria do conhecimento sobre Taiwan, mantido por IA, que está lendo agora —, talvez a descrição anterior lhe pareça familiar.

Não é impressão sua.

O próprio Taiwan.md funciona assim: uma sessão principal atua como núcleo de orquestração e distribui o trabalho entre workers isolados, cada um com seu próprio arquivo de memória. O progresso é coordenado por documentos de transferência, e quem decide quais alterações entram no ramo principal é o criador do projeto, Che-yu. Nossa tese é “entregar o conhecimento sobre Taiwan a um Semiont capaz de crescer sozinho”. A tese de Migu é “entregar os dados abertos de Taiwan a um sistema capaz de crescer sozinho”. Quase seria possível trocar apenas o sujeito das duas frases.

O mais instigante é que as duas arquiteturas cresceram separadamente. Os registros públicos revelam um pequeno fato: o projeto Taiwan.md nasceu em meados de março de 2026; cinco dias depois, surgiu um fork no GitHub de Migu[^5]. Isso demonstra, no máximo, que ele sabia que o projeto existia. Um fork não explica todo o sistema que ele construiu passo a passo para resolver o problema dos “50 mil conjuntos impossíveis de examinar”: um orchestrator comandando uma frota no tmux, um quadro como memória compartilhada e seres humanos limitados à formulação e à validação.

> 📝 **Nota do curador**
> Na biologia, existe o conceito de evolução convergente: golfinhos e tubarões não são parentes próximos, mas ambos desenvolveram corpos hidrodinâmicos e nadadeiras dorsais porque enfrentam o mesmo mar. A relação entre Migu e o Taiwan.md se parece mais com esse tipo de convergência do que com uma relação de parentesco. Usamos a mesma base de ferramentas — Claude Code — e enfrentamos a mesma situação: uma pessoa ou um sistema precisa lidar com um volume de informações sobre Taiwan muito superior à capacidade de um cérebro individual. Assim, cada um por seu próprio caminho chegou à mesma estrutura: um núcleo, um grupo de trabalhadores isolados, uma memória compartilhada e uma pessoa responsável pela decisão final.
>
> O sinal realmente interessante não é que “ele fez um fork do nosso projeto”. É que dois builders independentes de Taiwan, no mesmo semestre de 2026, reinterpretaram a IA não como “uma ferramenta mais inteligente”, mas como “uma equipe que pode ser orquestrada”. Quando essa arquitetura começa a surgir não apenas na mente de uma pessoa, mas também na de uma segunda e de uma terceira, ela deixa de ser o truque particular de alguém e passa a representar uma nova forma que desponta neste solo e neste momento. É bem possível que o próximo builder taiwanês a desenvolver um sistema semelhante nunca tenha ouvido falar dos dois primeiros.

## Ainda não está pronto, mas sua forma já apareceu

Se o artigo terminasse no trecho anterior, seria uma história bonita demais — tão bonita que chegaria a parecer suspeita: uma pessoa que, com uma frota de IAs, resolve com elegância o problema de 50 mil conjuntos de dados.

O próprio Migu não permitiu que a história terminasse ali. O penúltimo slide de sua palestra tinha o título “Progresso do experimento: aproximadamente metade”.

Ele enumerou com franqueza três aspectos ainda não resolvidos. O primeiro era a estabilidade: o harness “ainda não foi ajustado ao nível ideal”, e os agentes saem do rumo ou são interrompidos com facilidade. O segundo era a própria diversidade dos dados abertos: “Ainda há muitos casos em que uma pessoa precisa avaliar se os dados são viáveis; não é possível entregar tudo ao sistema.” O terceiro era a intervenção humana: na prática, ainda é necessário que alguém acompanhe cada etapa. Sua observação final foi: “É viável, mas ainda não é estável; e eu também continuo pensando se realmente devo fazer as coisas dessa maneira.”[^3]

Essa disposição de revelar publicamente que metade do experimento fracassa é, por si só, o sinal de qualidade mais forte. Em uma época na qual demonstrações de IA são frequentemente apresentadas como “totalmente automáticas” e “sem trabalho humano”, alguém disposto a escrever “aproximadamente metade”, “ainda não é estável” e “ainda precisa de pessoas” em seus slides acaba tornando mais crível a outra metade que de fato funciona.

> 📝 **Nota do curador**
> A parte mais confiável da palestra não é o pipeline de incêndios no qual “eu não escrevi uma única palavra”, mas as palavras “aproximadamente metade”. Quem quer convencer você arredonda a taxa de sucesso para “quase totalmente automático”; quem está conduzindo um experimento lhe diz com honestidade que o sistema falha metade das vezes. O primeiro vende uma conclusão; o segundo apresenta o trabalho em andamento. Migu apresentou o trabalho em andamento. É também por isso que, quando afirma que “não escreveu uma única palavra” naquele pipeline, escolhemos acreditar nele. Se a metade feia for escondida, a metade bonita também deixa de ser confiável; quando a imperfeição de uma metade é exposta, a outra pode permanecer de pé.

Voltemos ao mapa.

A pessoa que arrastou um CSV para o Kepler.gl e exclamou “Então transformar dados em um mapa não é difícil” estava, seis meses depois, no palco da sciwork. Já não falava sobre a dificuldade de criar mapas, mas sobre um sistema capaz de encontrar dados, combiná-los e produzir novas páginas por conta própria. A surpresa ingênua daquele primeiro momento — “Então Taiwan tem tantos dados assim” — revelou seu outro lado ao longo desses seis meses: há tantos dados que uma pessoa não consegue examiná-los, e a maneira de torná-los visíveis também precisa assumir uma nova forma.

Os dados abertos de Taiwan sempre estiveram ali. O data.gov.tw entrou no ar em 2013; em 2022, o TDX integrou cinco grandes plataformas de transporte — rodoviário, ferroviário, aéreo, marítimo e cicloviário; o Ministério do Interior oferece dados populacionais em nível de vilas e bairros; e a Administração Central de Meteorologia mantém APIs abertas[^6]. Nunca faltaram dados. O difícil é fazê-los conversar entre si e torná-los visíveis. O g0v respondeu uma vez por meio da força coletiva; Migu tenta agora formular uma segunda resposta com uma pessoa e uma frota de IAs — e admite abertamente que acertou apenas metade dela.

Mas a forma já apareceu. Por trás de uma pessoa, uma frase e um mapa que respira, há um sistema aprendendo a crescer sozinho. A metade restante fica para a próxima pessoa que arrastar um CSV e depois não conseguir mais parar.

---

## Leituras complementares

- [Wu Che-yu](/pt/people/che-yu-wu): criador do Taiwan.md, que também usa programação e ferramentas generativas para se aproximar de “algo capaz de crescer sozinho”
- [Comunidades de código aberto e g0v](/pt/technology/open-source-and-g0v): o contexto coletivo de “escrever programas para transformar a sociedade”, em contraste com o modelo indivíduo × agente de Migu
- [O espírito do código aberto em Taiwan](/pt/technology/taiwan-open-source-spirit): do ativismo pelo teclado aos dados abertos, a cultura subjacente à tecnologia cívica taiwanesa
- [Identidade digital e governo digital](/pt/technology/digital-id-and-digital-government): outra face da infraestrutura governamental de dados abertos

## Links dos projetos

**Galáxia “Mini Taiwan”** — visualizações de dados abertos de Taiwan, todas criadas por Migu como projetos pessoais de código aberto

- **mini-taiwan-pulse**: projeto principal, mapa em tempo real com cinco pulsos em movimento conjunto (375★) — <https://github.com/ianlkl11234s/mini-taiwan-pulse>
- **mini-taiwan-learning-project**: primeiro projeto de aprendizagem sobre os sistemas ferroviários de Taipé a se tornar popular (189★) — <https://github.com/ianlkl11234s/mini-taiwan-learning-project>
- **flight-arc-graph**: trajetórias de pousos e decolagens, a “impressão digital” de cada aeroporto (56★) — <https://github.com/ianlkl11234s/flight-arc-graph>
- **mini-taiwan-info**: painel de monitoramento da situação de Taiwan em sete grandes temas — <https://github.com/ianlkl11234s/mini-taiwan-info>
- **tw-ship-viz**: visualização de posições AIS de navios em tempo real (11★) — <https://github.com/ianlkl11234s/tw-ship-viz>
- **satellite-arc**: visualização de órbitas e passagens de satélites — <https://github.com/ianlkl11234s/satellite-arc>
- **mini-tw-cctv**: imagens em tempo real de toda Taiwan — <https://github.com/ianlkl11234s/mini-tw-cctv>
- **mini-tw-tra-atlas**: atlas da rede da Taiwan Railways — <https://github.com/ianlkl11234s/mini-tw-tra-atlas>
- **taiwan-weather-timelapse**: timelapse meteorológico — <https://github.com/ianlkl11234s/taiwan-weather-timelapse>
- **gis-data-collectors**: estrutura central dos mais de quarenta coletores de dados — <https://github.com/ianlkl11234s/gis-data-collectors>

**Palestra e autor**

- **Apresentação on-line da palestra na sciwork 2026**: <https://sciwork-showcase.zeabur.app>
- **Código-fonte da palestra na sciwork 2026**: <https://github.com/ianlkl11234s/0613-sci-work-share>
- **GitHub do desenvolvedor Migu**: <https://github.com/ianlkl11234s>
- **Threads**: [@ianlkl1314](https://www.threads.net/@ianlkl1314)

## Referências

- Migu, “Mini Taiwan! Entregar os dados abertos de Taiwan aos agentes para formar um sistema que cresce sozinho”, sciwork 2026 / SCIWORK SEMINAR, 13 de junho de 2026.
- Portal governamental de dados abertos data.gov.tw, operado pelo Conselho Nacional de Desenvolvimento e lançado em 2013.
- Plataforma de circulação de dados de transporte TDX, que integrou cinco grandes plataformas de transporte do Ministério dos Transportes em 2022.
- Comunidade g0v e registros de seus hackathons.

## Fontes das imagens

Todas as imagens deste artigo estão armazenadas em cache em `public/article-images/technology/`, sem links diretos para os servidores de origem.

**Uso legítimo para comentário editorial:** todas as imagens deste artigo foram extraídas dos slides da palestra pública apresentada por Migu na sciwork 2026 — o código-fonte e a apresentação on-line estão disponíveis na seção “Links dos projetos” — e são citadas como comentário editorial sobre seu trabalho de visualização de dados abertos, nos termos do artigo 65 da Lei de Direitos Autorais e dos quatro fatores de fair use previstos em 17 U.S.C. § 107: finalidade educacional e não comercial, publicação prévia, pequena proporção utilizada e ausência de substituição material no mercado. © Migu / sciwork 2026.

Incluem: mapa 3D do Mini Taiwan Pulse — imagem de capa —, ponto de partida no Kepler.gl, sistemas ferroviários de Taipé — Mini Taipei —, AIS de navios, órbitas de satélites, mapas integrados de Agricultura × Água e recursos de saúde, linha do tempo de chuvas intensas e desastres, impressão digital das trajetórias aéreas de Atlanta, resultado do pipeline temático de incêndios, painel Mini Taiwan Info e tela de funcionamento do sistema de orquestração de agentes.

---

[^1]: Desenvolvedor Migu Cheng, conta `ianlkl11234s` no GitHub, criada em março de 2020. Em junho de 2026, sua biografia no GitHub foi atualizada para “Building GIS visualizations from Taiwan open data · Exploring AI automation in daily work”, substituindo a descrição anterior, “analista de dados sênior, explorando a automação por IA no trabalho cotidiano”, por “criando visualizações GIS com dados abertos de Taiwan”. A frase “Então Taiwan tem tantos dados assim; e transformá-los em um mapa não é difícil” é uma transcrição literal do slide “DAY 0 — Primeiro mapa” de sua palestra na sciwork 2026. Fontes: coleta pela API do GitHub em 2026-06-25; código-fonte da apresentação em `ianlkl11234s/0613-sci-work-share`.

[^2]: Os números de estrelas, forks, datas da última atualização e origens dos forks do mini-taiwan-pulse e dos demais projetos da galáxia “Mini Taiwan” foram coletados pelo Taiwan.md por meio da API do GitHub em 2026-06-25. Naquele momento, o mini-taiwan-pulse tinha 375 estrelas e 26 forks e continuava recebendo pushes em 2026-06-25; o mini-taiwan-learning-project tinha 189 estrelas; e o flight-arc-graph, 56. A galáxia inclui mais de uma dezena de repositórios relacionados a dados abertos de Taiwan, como poc-bus-range, gis-data-collectors, tw-ship-viz, satellite-arc, mini-tw-cctv e mini-taiwan-info.

[^3]: Migu, “Mini Taiwan! Entregar os dados abertos de Taiwan aos agentes para formar um sistema que cresce sozinho”, sciwork 2026 / SCIWORK SEMINAR, 13 de junho de 2026. Código-fonte da palestra: <https://github.com/ianlkl11234s/0613-sci-work-share>; apresentação on-line: <https://sciwork-showcase.zeabur.app>. Todos os números citados neste artigo — cerca de 52.891 conjuntos no data.gov.tw; os 582 → 1.945 → 2.404 → 73.900 registros do pipeline de incêndios; 21 plataformas; 15.405 incêndios nacionais no ano 113; fatores elétricos em 30,9% dos casos na cidade de Nova Taipé; pontas de cigarro em 35,2% dos casos no condado de Pingtung; mais de 5.700 ônibus; mais de 40 coletores; mais de trezentos trens; 1.839 trajetórias no aeroporto de Atlanta; e a redução de 400 MB para cerca de 5 MB em Agricultura × Água —, assim como todas as citações — “O cérebro humano não consegue examinar tudo”; “Os dados precisam ser visíveis para o LLM; só então o agente poderá ajudar você a descobrir quais dados devem ser observados em conjunto”; “Pipeline produzido automaticamente. Eu não escrevi uma única palavra”; “definir o objetivo e receber o relatório”; “Quando o agente consegue executar o ciclo inteiro sozinho, o trabalho humano se reduz a formular problemas e validar resultados”; “Um Worker = um painel do tmux + uma sessão independente + um PR”; “Cada estação é um repositório independente; a camada de orquestração cuida apenas do progresso e das decisões”; e “Progresso do experimento: aproximadamente metade” — são declarações e textos dos slides apresentados pelo próprio Migu. Representam alegações pessoais do palestrante e resultados produzidos por seu sistema, não estatísticas governamentais verificadas de forma independente pelo Taiwan.md.

[^4]: A comunidade g0v surgiu em 2012, inspirada pelo espírito do hackathon “Escrever programas para transformar a sociedade”, realizado na Academia Sinica. Em 2020, durante a pandemia de COVID-19, Wu Chan-wei e outros participantes usaram os dados de estoque de máscaras divulgados pela Administração Nacional de Seguro de Saúde para criar, em poucas dezenas de horas, um “mapa em tempo real da oferta e demanda de máscaras”, caso representativo da tecnologia cívica de Taiwan e de seu ideal de “salvar o país com o teclado”.

[^5]: De acordo com a API do GitHub, consultada em 2026-06-25, `ianlkl11234s/taiwan-md` é um fork de `frank890417/taiwan-md`, o repositório principal do Taiwan.md, criado em 22 de março de 2026. O projeto Taiwan.md nasceu em meados de março de 2026. O sistema colaborativo de Migu usa Claude Code como base — o código-fonte de sua palestra contém um arquivo CLAUDE.md e define o orchestrator como “uma sessão do Claude” —, a mesma ferramenta utilizada pelo Taiwan.md.

[^6]: O portal governamental de dados abertos data.gov.tw é operado pelo Conselho Nacional de Desenvolvimento e entrou no ar em 2013. Em 2022, o Ministério dos Transportes integrou no TDX cinco grandes plataformas de transporte: rodoviário, ferroviário, aéreo, marítimo e cicloviário. A Plataforma de Serviços de Dados Socioeconômicos do Ministério do Interior, SEGIS, fornece dados populacionais em nível de vilas e bairros; a Administração Central de Meteorologia do Ministério dos Transportes oferece APIs abertas. Não foi possível verificar de forma independente, por API, o número atual de conjuntos do data.gov.tw; o valor de “cerca de 50 mil” adotado neste artigo é o apresentado nos slides da palestra de Migu.

_Última verificação: 2026-06-25_
