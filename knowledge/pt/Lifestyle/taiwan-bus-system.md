---
title: 'O sistema de autocarros de Taiwan: quando a Hsinchu Bus partiu, quem vai buscar aqueles que não têm volante'
description: 'Na manhã de 15 de setembro de 2024, na estação ferroviária de Tunglo, mais de 30 pessoas — de crianças de jardim de infância a um idoso de 90 anos — apanharam o último autocarro da Hsinchu Bus, a linha 5658. Desde a primeira linha de operação conjunta de Taipé em 1977, até às zonas rurais com apenas dois autocarros por dia, motoristas com idade média de 51 anos, e o passe mensal TPASS que fez a procura em Hualien disparar quase 70%, os autocarros sempre transportaram aqueles que não têm escolha: estudantes a caminho da escola, idosos que não conduzem, famílias sem carro — e esse serviço está a ser-lhes retirado, linha a linha, de debaixo dos pés.'
date: 2026-06-25
category: 'Lifestyle'
tags:
  [
    'autocarro',
    'transporte rodoviário',
    'transporte público',
    'TPASS',
    'zonas rurais',
    'equidade no transporte',
    'autocarro elétrico',
    'dados abertos',
    'escassez de motoristas',
  ]
subcategory: '交通與移動'
author: 'Taiwan.md Contributors'
readingTime: 24
featured: false
lastVerified: 2026-06-25
lastHumanReview: false
researchReport: 'reports/research/2026-06/台灣的公車系統.md'
image: '/article-images/lifestyle/scooters-and-bus-taipei-1996.webp'
imageCredit: 'Holly Cheng'
imageLicense: 'CC BY-SA 3.0'
imageSource: 'https://commons.wikimedia.org/wiki/File:Taipei_street_scene.jpg'
datasets:
  - name: '台灣好行各路線搭乘人次'
    url: 'https://data.gov.tw/dataset/140008'
  - name: '機動車輛登記數'
    url: 'https://data.gov.tw/dataset/14208'
relatedDiary: ['2026-06-25-204254-公車系統']
curation: 'incubating'
curationReason: 'unverified'
translatedFrom: 'Lifestyle/台灣的公車系統.md'
sourceCommitSha: 'be13f045'
sourceContentHash: 'sha256:7d3802fe03c60e03'
sourceBodyHash: 'sha256:24a950fc8509e96a'
translatedAt: '2026-10-13T05:59:13.200296+00:00'
---

Na manhã de 15 de setembro de 2024, em frente à estação ferroviária de Tunglo, em Miaoli. Mais de 30 pessoas estavam debaixo do sinal de paragem, a mais nova ainda no jardim de infância, a mais velha com 90 anos. Não esperavam o autocarro para ir trabalhar, nem para ir à escola. Esperavam o último autocarro da linha 5658 da Hsinchu Bus.

A partir desse dia, esta empresa centenária retirava-se por completo da região de Taoyuan-Hsinchu-Miaoli, e as 12 linhas de Miaoli passavam para os «Pequenos Amarelos Felizes» — um tipo de táxi de reserva prévia[^1]. No momento em que o autocarro da Hsinchu Bus entrou lentamente na estação, ouviu-se uma salva de palmas. O representante local de Tunglo, Hsu Yu-feng, organizou a ida de todos para apanhar esta última viagem como recordação, e disse: «Andar de autocarro da Hsinchu Bus é a memória de muita gente, acompanhou a juventude de muitos.»[^1]

As palmas eram para um autocarro, mas por baixo das palmas escondia-se algo mais cruel. Aqueles que estavam debaixo do sinal a bater palmas são os alunos do ensino básico que ainda não podem andar de mota, os avôs que já não podem andar de mota, as pessoas que em casa não têm um segundo carro — precisamente o grupo que menos pode dizer «vou já» e ir. O autocarro é para eles. E o colapso do sistema de autocarros de Taiwan começa precisamente debaixo dos pés deles.

> **Resumo em 30 segundos:** Os autocarros de Taiwan transportam os «sem volante»: estudantes, idosos que não conduzem, famílias sem carro. 53,3% das deslocações das famílias sem carro dependem de transporte público, contra apenas 13,7% das famílias com carro[^2]. Mas o sistema está a parar exatamente onde mais faz falta: motoristas de transporte rodoviário caíram de 5.646 para 3.551 em seis anos, menos de um terço[^3]; nas zonas rurais restam dois autocarros por dia, o último passa muito cedo. O mesmo gesto de «esperar o autocarro», em Taipé é queixar-se que demora, no campo de Changhua é «será que ainda consigo sair sozinho». Por trás sustenta-se um sistema de dados abertos que até o Google usa, mas na ponta final é muitas vezes não chegar o autocarro, ou virem dois juntos. A sua qualidade mede se uma sociedade está disposta a levar aqueles que não podem ir por conta própria.

## Quem levanta a mão debaixo do sinal

Primeiro, esclarecer uma coisa: quem é que anda de autocarro afinal?

O inquérito de veículos do Ministério dos Transportes deu uma resposta contra-intuitiva. Separando as famílias por «ter ou não carro», as sem carro fazem 53,3% das deslocações em transporte público, as com carro apenas 13,7%[^2]. Quase quatro vezes mais. Ou seja, os autocarros (juntamente com metro e comboio) transportam sobretudo quem não tem carro ou não conduz. A faixa etária é ainda mais clara: os estudantes são o grupo com maior taxa de uso de transporte público entre todos os propósitos de viagem, mais de 40% das viagens escolares usam transporte público[^2].

```tw-bars
Quem anda em transporte público: quem tem carro quase não anda, quem não tem depende dele (quota de deslocações %)
*Sem carro | 53,3 | Depende dele
Com carro | 13,7
Fonte: Inquérito de Veículos do Departamento de Estatística do Ministério dos Transportes
```

Esta gente tem um ponto em comum: não têm volante na mão. Os adolescentes ainda não podem conduzir mota, os idosos de 70 e 80 anos já não podem, as famílias que não podem ou não querem comprar carro não têm escolha. Para um avô de 78 anos em Changhua, o autocarro nunca foi sobre «conveniente ou não», responde a «hoje consigo ir sozinho ao médico? Consigo voltar sozinho para casa?». Trata-se de dignidade.

Aqui convém bloquear já um contra-argumento na moda. De vez em quando alguém diz que a verdadeira espinha dorsal de Taiwan é a mota, não o autocarro, escrever sobre autocarro é «framing de elite urbana». A ilha das motas é facto: Taiwan tem 599 motas por mil habitantes, 83,7% dos lares têm mota, apenas cerca de 12,5% das pessoas dependem principalmente de transporte público[^4]. Mas este argumento aponta a arma na direção errada. O autocarro é precisamente a linha de vida dos não-elite: transporta famílias sem carro, estudantes, idosos rurais que não podem andar de mota. Quem pode andar de mota desde logo não precisa tanto dele. Quem realmente depende do autocarro são aqueles que nem mota podem conduzir.

> 📝 **Nota do curador**: A narrativa corrente lê «muitas motas» diretamente como «autocarro não é importante», saltando um elo: a mota resolve a mobilidade de «quem pode ir por conta própria», o autocarro resolve a de «quem não pode ir por conta própria». Servem pessoas fundamentalmente diferentes. Quando uma linha rural para, quem não é afetado é o jovem adulto de mota; quem primeiro fica sem transporte é a avó que ia de autocarro à consulta. Tratar o autocarro como coadjuvante é tratar esta gente toda como coadjuvante.

Aproveito para clarificar um equívoco comum: muita gente acha que os trabalhadores migrantes são a clientela principal dos autocarros. Não são. Em Taiwan, os trabalhadores migrantes, por política de longa data que restringe a compra de veículos, deslocam-se sobretudo de mota no dia a dia; só em viagens longas de fim de semana é que apanham autocarros rodoviários[^5]. Igualar «vulnerável» a «anda de autocarro» é um preconceito preguiçoso.

## Bilhetes de um segmento, dois segmentos e o "bipe" ao descer

![Autocarro de piso baixo da Xingnan Bus, em Tainan, circulando na linha principal vermelha; há símbolos de acessibilidade junto à porta e design de piso baixo](/article-images/lifestyle/low-floor-bus-tainan-2016.webp)
_Autocarro de piso baixo da Xingnan Bus, em Tainan, 2016. O piso baixo permite o acesso de carrinhos de bebé e cadeiras de rodas, sendo um indicador essencial de "acessibilidade" nos autocarros urbanos. Photo: Nutnse0008, CC BY-SA 4.0 (ver fontes das imagens no final do artigo)._

Há uma série de movimentos que os taiwaneses fazem desde pequenos, mas que costumam deixar os estrangeiros confusos: é preciso levantar a mão ao chegar à paragem, caso contrário o motorista passa direto sem parar. Ao subir, ouve-se um "bipe"; por vezes, ao descer, é necessário fazer "bipe" novamente. Por trás destes gestos, existe um sistema de tarifação muito mais sofisticado do que se imagina.

A origem deste sistema remonta a 1977. Antes disso, as várias empresas de autocarros em Taipé operavam de forma independente, com números de linha, tarifas e bilhetes totalmente desuniformizados. Em 1976, a cidade de Taipé estabeleceu o "Comité Preparatório para a Cooperação entre Autocarros Públicos e Privados" para unificar estes elementos. Em 1 de janeiro de 1977, as linhas 202 e 202, operadas em regime de cooperação, foram as primeiras a entrar em serviço. Em 30 de abril do mesmo ano, a primeira fase de 33 linhas de autocarros cooperativos começou a operar oficialmente[^6]. O conceito de "cooperação" (聯營) significa que, independentemente da empresa que opere o veículo, os passageiros utilizam o mesmo sistema de numeração de linhas, as mesmas tarifas e o mesmo tipo de bilhete; este foi o ponto de partida do sistema de autocarros urbanos em Taiwan.

A tarifação por segmentos também nasceu daqui. Com a expansão urbana para Nova Taipé, uma única viagem pode atravessar várias zonas tarifárias: a zona antiga conta como um segmento, enquanto a extensão para a periferia pode contar como dois ou três segmentos. Os pontos de transição são geralmente estabelecidos perto de nós de transporte ou fronteiras municipais, como na Ponte de Taipé ou em Shilin; subir ou descer dentro de duas paragens antes ou depois desses pontos ainda conta apenas como um segmento (o que é chamado de "zona de amortecimento"). É por isso que, ao apanhar uma linha que atravessa diferentes segmentos, é necessário validar o cartão ao entrar e também ao sair: o sistema precisa de saber quantos segmentos percorreu para cobrar o valor correto. A dúvida mais comum dos estrangeiros — «porque é que às vezes se entra pela porta da frente e outras vezes pela porta de trás?» — também tem a sua resposta aqui: onde se entra ou sai, e se valida uma ou duas vezes, depende inteiramente de como aquela linha específica está dividida em segmentos.

O próprio sistema de bilhética também evoluiu. O EasyCard foi implementado integralmente nos autocarros no final de setembro de 2002[^7], enquanto o iPASS de Kaohsiung foi lançado em 2014, juntamente com o Metro de Kaohsiung[^7]. A validação bidirecional (validar ao entrar e ao sair) foi introduzida em fases: a primeira fase começou a 1 de julho de 2019 e a segunda fase foi implementada totalmente em fevereiro de 2020, com o objetivo de calcular com precisão as tarifas por segmento, oferecer descontos para transferências e recolher dados sobre o fluxo de passageiros[^8]. Aqui, é importante corrigir um erro comum: a validação bidirecional é algo de 2019, não de 2012. O iPASS é de 2014, também não de 2012.

No entanto, este sistema tem os seus limites. O volume de passageiros dos autocarros urbanos em Taiwan está extremamente concentrado na região de Taipei e Nova Taipé: em 2020, estas duas cidades representaram 73,7% do volume total de passageiros de autocarros urbanos em todo o país[^9]. Numa linha principal de Taipé, durante as horas de ponta, passa um autocarro a cada 4 ou 6 minutos, e os habitantes de Taipé queixam-se se tiverem de esperar 5 minutos. No mesmo instante, numa paragem em zonas do centro, sul ou leste do país, pode passar apenas um autocarro por hora, e o último serviço termina logo às cinco ou seis da tarde. O sistema é o mesmo, mas aplicados a locais diferentes, resultam em duas realidades de vida distintas.

## O Google sabe quantos minutos faltam para o seu autocarro, porque Taiwan abriu os dados

Você abre o telemóvel e vê a contagem decrescente «chega em 3 minutos». Parece óbvio, mas é um feito de Taiwan que poucos conhecem.

Taiwan começou em 2015 a inventariar os dados nacionais de transporte público e a definir padrões unificados, em 2016 criou a plataforma PTX, em dezembro de 2022 integrou e atualizou para o atual TDX (Serviço de Circulação de Dados de Transporte)[^10]. A sua escala: mais de mil conjuntos de dados, mais de 4,9 milhões de chamadas API por dia, mais de 540 milhões de registos acumulados, mais de 3.000 empresas de valor acrescentado a usar[^11]. Mais crucial: a informação de chegada dos autocarros no Google Maps em Taiwan vem efetivamente de parceiros locais que acedem aos dados do TDX/PTX[^11]. Isso torna Taiwan um dos poucos sítios do mundo onde o Google Maps tem previsão de chegada de autocarro com granularidade fina.

Mas há que ser honesto, não exagerar. Os dados abertos de Taiwan são «líderes na região», não têm avaliação internacional que os certifique como «de classe mundial». Usa um formato OData «quatro estrelas» proprietário, não o padrão internacional GTFS/GTFS-RT, o que dificulta a integração direta no ecossistema internacional. Também não se encontra nenhuma organização internacional que ponha Taiwan como referência de dados abertos[^12]. É forte em escala e普及, fraco na interoperabilidade do padrão.

E por mais inteligente que seja o back-end, não salva a experiência do front-end. Todas aquelas apps de autocarro (Taipé Espera Autocarro, vários BusTracker, Autocarro na Nuvem) no back-end ligam todas ao mesmo TDX, só a interface muda[^13]. Por isso o tempo de chegada que você vê na app A é igual ao da app B, porque copiam o mesmo trabalho. O verdadeiro problema está na fonte: o GPS desvia-se entre arranha-céus, a previsão de chegada desvia-se com ele.

O mais ilustrativo é a queixa de um utilizador de Taichung no PTT. Um utilizador chamado LeiHide escreveu: «Da última vez a app mostrava 2 autocarros a chegar, na realidade não veio nenhum», «são pura e simplesmente fantasmas». Outro, teddykitty, disse: «Claramente havia o das 6:50, mas eu e mais duas senhoras que não nos conhecíamos ficámos todas à toa à espera»[^14]. O back-end é o dado aberto unificado de toda a ilha, o front-end são três estranhos debaixo do sinal à espera de um autocarro que nunca vem. Esta é a face mais fraturada dos autocarros de Taiwan.

(Um ponto frequentemente citado errado: na net diz-se que «1968» é a app de autocarros da cidade de Taipé. Não é. 1968 é o sistema de numeração de linhas de autoestrada, e também a app de informação em tempo real de autoestrada do organismo rodoviário, nada tem a ver com autocarros urbanos[^13].)

## Vêm dois juntos, e depois uma longa espera vazia

![Abrigo de paragem no lado da Rua Chengchou da Estação de Taipé, sinal e passageiros à espera](/article-images/lifestyle/taipei-bus-shelter-2020.webp)
_Abrigo de paragem no lado da Rua Chengchou da Estação de Taipé, 2020. Para quem não tem volante, o sinal é o ponto de partida de cada dia, e também o lugar de longas esperas. Foto: T Gordon Cheng, CC BY-SA 4.0 (ver fontes das imagens no final)._

Quem já andou de autocarro conhece aquele absurdo: espera-se 20 minutos e não vem nenhum, e de repente dois do mesmo número entram de rabo colado.

Este fenómeno chama-se «agrupamento» (bunching), é uma propriedade física do sistema de autocarros, nada tem a ver com o motorista ser preguiçoso ou não. O primeiro autocarro atrasa-se um pouco, acumula mais passageiros ao longo do percurso, demora mais a subir e descer gente, por isso vai cada vez mais devagar. O de trás, como o da frente já levou os passageiros, vai fluido, aproxima-se cada vez mais, no fim colam-se. Quanto maior o intervalo programado, mais violenta a bola de neve.

Para os taipenses, o agrupamento é chatice. Para os do campo, é luxo — nem «dois juntos» chegam a ver, porque o dia todo são só aqueles poucos. Volta-se à fratura invisível cidade-campo: o taipense queixa-se que 5 minutos é demais, porque tem de que se queixar. Quem no campo de Changhua espera 40 minutos, ou tem só dois autocarros no dia, não tem de que se queixar. A mesma palavra mede duas condições radicalmente diferentes. Quem menos escolha tem, menos autocarro apanha — esta frase vai voltar várias vezes neste artigo.

## Como os "autocarros clandestinos" se tornaram a United Bus

![Autocarro de longa distância na autoestrada da Kuo-Kuang Bus, matrícula KKA-1897](/article-images/lifestyle/kuokuang-intercity-coach-2026.webp)
_Autocarro de longa distância da Kuo-Kuang Bus, 2026. O seu antecessor foi a Taiwan Bus, durante a era do monopólio da Direção de Estradas; em 2001, foi assumida através de um esforço de capitalização de milhares de funcionários. Photo: Wei Ting Hsu, CC BY-SA 4.0 (ver fontes das imagens no fim do artigo)._

Para entender por que os autocarros são como são hoje, é preciso recuar e ver como o setor passou de um monopólio estatal para uma rede espalhada por todas as ruas.

O ponto de partida do transporte rodoviário em Taiwan foi a Direção de Estradas da Província de Taiwan, fundada em 1946. Em 1977, os serviços de autocarro da Direção de Estradas tornaram-se independentes, resultando na criação da Taiwan Bus Company (abreviada como Taiwan Bus). No seu auge, a empresa contava com mais de 500 rotas, 3.600 veículos e dezenas de milhares de funcionários[^15]. Essa foi a era em que a Direção de Estradas detinha o monopólio do transporte rodoviário de longa distância, algo que as gerações mais velhas ainda se lembram.

A reviravolta ocorreu por volta do período do levantamento da lei marcial. No final da década de 1980, começaram a surgir nas estradas os chamados "autocarros clandestinos" (野雞車), veículos sem licença que faziam transporte privado de passageiros. Em vez de tentar uma repressão impossível de conter, o Ministério dos Transportes optou por orientá-los para a legalização. Em 6 de setembro de 1989, foi fundada a United Bus (統聯客運), nomeada pelo então diretor do Instituto de Investigação de Transportes do Ministério dos Transportes, Chang Chia-chu, com o significado de "liderar todas as direções e operar em conjunto". Esta tornou-se a primeira empresa privada de autocarros de longa distância em autoestradas legalizada em Taiwan[^16]. Assim que o mercado foi aberto, empresas como Hsin Yi, Kavalan, Aloha e Capital Bus juntaram-se sucessivamente à concorrência, transformando o transporte de longa distância de um monopólio estatal num mercado vibrante com dezenas de operadores.

```tw-timeline
1946 | Fundação da Direção de Estradas da Província de Taiwan | Gestão direta do governo, monopólio do transporte rodoviário em Taiwan
1977 | Criação independente da Taiwan Bus | Separação dos serviços de autocarro da Direção de Estradas; auge com dezenas de milhares de funcionários
1989 | Fundação da United Bus | Legalização dos autocarros clandestinos; primeira empresa privada de autocarros em autoestradas
2001 | Assunção da Kuo-Kuang Bus | Taiwan Bus com prejuízo anual de NT$5 mil milhões; mil funcionários capitalizam para fundar a Kuo-Kuang
Fonte: Registos históricos da Direção de Estradas, da Taiwan Bus e da Kuo-Kuang Bus (Taiwan Bus: mais de 500 rotas, 3.600 veículos, 1.090 funcionários em 2001) e reportagens sobre a fundação da United Bus em 1989[^15][^16]
```

O lado estatal, no entanto, não teve o mesmo sucesso. A Taiwan Bus registava prejuízos constantes, com perdas anuais de cerca de NT$5 mil milhões cobertas pelo tesouro nacional; após a abertura à concorrência, as rotas e o pessoal diminuíram drasticamente[^15]. Em junho de 2001, 1.090 funcionários da Taiwan Bus contribuíram individualmente com NT$300.000 cada para fundar a Kuo-Kuang Bus que, em julho, assumiu as 96 rotas anteriormente pertencentes à Taiwan Bus[^15]. Muitos funcionários de meia-idade, entre os 40 e 50 anos, que ainda não tinham reunido as condições para a reforma, protestaram contra esta medida. O nome "Kuo-Kuang" (國光), na verdade, provém do modelo de autocarro de prestígio da Taiwan Bus de 1967; foi o fim de uma era, onde um império deixou a sua marca para quem assumiu o seu lugar.

(Esta parte sobre a história institucional serve apenas como contexto. A nostalgia turística que vai desde o modelo Chinma até ao Kuo-Kuang, bem como os detalhes da época em que os autocarros clandestinos eram desenfreados, pertencem a outro artigo sobre autocarros de turismo; aqui, serve apenas como ponto de referência.)

## Sai às 5h30, recolhe às 20h, folga quatro dias por mês

O que puxa os autocarros linha a linha não são vilões. A causa direta é simples: não se encontra quem conduza.

Os números postos na mesa são frios. Motoristas de autocarros urbanos caíram de 11.811 em 2015 para 10.588 em 2023, a idade média no mesmo período subiu de 45,2 para 51,2 anos, envelheceram 6 anos em dez anos[^17]. No rodoviário é pior, motoristas caíram de 5.646 em 2019 para 3.551 em 2024, seis anos a menos de um terço[^3]. Falta em todo o lado: urbanos em falta 1.443, rodoviários 772, somando os de turismo, a falta de motoristas de pesados passa de 5.000[^17][^3]. Motoristas abaixo dos 35 anos caíram de 14% há dez anos para 5,6%[^17], o setor envelhece a toda a velocidade e sem sucessão.

```tw-line
Quem conduz autocarros cada vez menos e mais velho (motoristas de autocarros urbanos)
Ano | Motoristas | Idade média
2015 | 11811 | 45,2
2023 | 10588 | 51,2
Fonte: Ministério dos Transportes, United Daily News Ação Sol
```

Por que os jovens não vêm, os velhos não ficam? A resposta está na estrutura salarial. Repórteres investigaram o local de trabalho da Taoyuan Bus e descobriram que o salário mensal do motorista compõe-se de até 14 rubricas, o salário base é só 26.400 NT$, o resto tem de se completar com horas extra (35% a 40%) e «prémio por quilómetro», «prémio por passageiros»[^18]. O problema é que estes dois prémios não entram no salário base fixo, logo o salário médio horário usado para calcular horas extra, segundo o cálculo do repórter, fica em apenas 88 NT$[^18]. As horas de trabalho são desumanas: no máximo 10 horas de condução por dia, mas o tempo de «espera de turno» não conta como horas de trabalho, um turno típico é sair às 5h30, recolher às 20h, ficar no terminal 16 horas, folgar 4 a 5 dias por mês[^18]. O dormitório da Taoyuan Bus, escreve o repórter: num espaço de menos de 5 ping (≈16,5 m²) enfiaram 8 beliches, 16 motoristas partilham uma casa de banho minúscula[^18].

Esta estrutura empurra escolhas concretas de pessoas concretas. O motorista ativo da Taoyuan Bus, Chen Wei-chen, diz claro: «Precisamos é de dinheiro, toda a gente só se dispõe a esforçar-se assim por causa do dinheiro. Agora a empresa não para de cortar horas, cada vez mais exagerado.» Fez as contas: «O salário já não chega, antes 60 mil por mês, agora 45 a 48 mil. Embora me faltem 6 anos para a reforma, já não quero continuar.»[^18]

Para onde vão os que saem? Maioria para logística, entregas, Uber. O ex-motorista da Taoyuan Bus, Hsu Yung-fa, mudou para logística, o salário baixou mais de 10 mil, mas disse uma frase que resume a condição do setor: «Levar pessoas e levar mercadoria não é a mesma coisa, a pressão é menor, não se anda com o coração na mão, o salário que deve ser dado a empresa dá.» Depois de sair, «finalmente soube o que é fim de semana de dois dias»[^18]. O subchefe do departamento de operações da Sanchung Bus, Chang Hsien-te, completa a lógica com uma comparação mais direta: «São todos conduzir… na logística o que cai é carga, perde-se dinheiro e pronto; no transporte de passageiros o que cai são passageiros, caem dois dentes da frente.»[^19]

Mas não é uma história unilateral de «motoristas coitados, passageiros maus». Do lado dos passageiros também há fonte de pressão: uma queixa pode custar milhares ao motorista, daí muitos desenvolverem atitude defensiva, menos interação melhor[^18]. O estereótipo de «motorista de autocarro conduz rápido, atitude má» tem por baixo turnos longos mais estrutura de desconto salarial ao menor pretexto. E a pressão dos «denunciadores profissionais» vistos pelos passageiros é a outra face. As duas pontas apertadas pela mesma estrutura irracional.

A frase que mais sufoca vem do motorista da Taoyuan Bus, também ativo no sindicato, Fan Kuang-ming. A raiva ao falar de horas extra: «11 horas, 8 horas, tudo treta! Na Taoyuan Bus absolutamente nenhum motorista dorme mais de 8 horas!»[^18] E quando conta que por causa de correr para o turno não chegou a tempo do fim do pai, a raiva vira arrependimento: «Quando cheguei ao hospital, o lençol branco já estava posto, nem um "pai" consegui chamar, no dia do funeral dei 12 cabeçadas ao meu pai, sou um filho ímpio.»[^18]

> 📝 **Nota do curador**: Quando nós na paragem nos queixamos «por que é que não vem», «por que é que vai tão rápido», por trás dessa queixa está alguém num dormitório de 5 ping a fazer turnos, a esforçar-se por um salário médio de 88 NT$/h até não conseguir ver o pai pela última vez. A raiz da escassez de motoristas é bem mais complexa que «jovens não querem sofrer»: uma estrutura que usa o salário fixo mais baixo, o tempo de espera mais longo, para sustentar um trabalho cujo custo de erro é o mais alto (o que cai são passageiros), finalmente não aguentou. O autocarro não sai, porque as pessoas dispostas a serem assim espremidas são cada vez menos.

## Depois da Hsinchu Bus partir

![Mini autocarro «Pequeno Amarelo Feliz» de zona rural de Hsinchu parado no terminal, com a inscrição «Pequeno Amarelo Feliz» na carroçaria](/article-images/lifestyle/happy-bus-hsinchu-rural-2025.webp)
_Os «Pequenos Amarelos Felizes» de Hukou e Baoshan, em Hsinchu, 2025. Depois da Hsinchu Bus sair de Taoyuan-Hsinchu-Miaoli, este tipo de mini autocarro de reserva prévia assumiu parte das linhas paradas. Foto: T Gordon Cheng, CC BY-SA 4.0 (ver fontes das imagens no final)._

A escassez de motoristas rebentou primeiro onde menos escolha há.

Voltemos à cena inicial. A Hsinchu Bus sair de Taoyuan-Hsinchu-Miaoli é só uma onda de saídas de empresas. A Aloha Bus fechou em 2022. A Hualien Bus no final de 2023 encerrou parte das operações; em Taichung a Jenyou, a Fengrong, a Sifang, a Chieshun saíram; até a Kuo-Kuang Bus, que assumiu a Taiwan Bus, acumula dívidas acima de 2 mil milhões, no primeiro semestre de 2025 atrasou salários duas vezes, e chegou a planear parar 14 linhas[^20]. O professor do Departamento de Gestão de Transportes da Universidade Tamkang, Chang Sheng-hsiung, aponta a raiz numa frase: «Tarifas reprimidas a longo prazo aliviam o fardo dos cidadãos, mas também limitam a qualidade dos autocarros e do transporte rodoviário.»[^21] Tarifas pressionadas para baixo, as empresas não ganham, só aguentam com subsídios; subsídios que não acompanham, linhas fecham uma a uma.

É o ciclo vicioso que os académicos descrevem: frequência rareia, passageiros fogem; passageiros fogem, prejuízo alarga; prejuízo alarga, empresa corta mais frequência. O diretor-geral do Grupo Capital, Lee Chien-wen, a falar destas linhas que quanto mais andam mais perdem, disse duas vezes «sem solução»: «Sem solução, completamente sem solução», porque para linhas deficitárias «quanto mais leva, mais perde»[^22]. O subsídio rural de Taiwan calcula a diferença entre «custo razoável por quilómetro-viatura menos receita», linhas com menos de 2 passageiros por quilómetro-viatura podem candidatar-se[^23]. Mas o dinheiro do subsídio é limitado, motoristas dispostos a conduzir ainda mais.

Então, os idosos rurais que mais dependem do autocarro, foram mesmo abandonados? Aqui há uma viragem fácil de ser encoberta pela narrativa pessimista. Taiwan começou em 2016 a testar transporte responsivo à procura (DRTS), em 2019 batizou de «Autocarro Feliz», «Pequeno Amarelo Feliz», não cumprem horário fixo, usam mini autocarros ou táxis de reserva prévia, onde houver gente a querer ir, lá vão, custo por quilómetro-viatura 30 a 40 NT$, mais barato que os 45,85 NT$ do rodoviário tradicional[^24]. Graças a este mecanismo de substituição, a cobertura de transporte público rural subiu dos 70% de 2016 para 91,96% em 2023, e 94,37% em março de 2025, meta de 100% em 2028[^25]. As 12 linhas que a Hsinchu Bus deixou em Miaoli foram exatamente entregues aos Pequenos Amarelos Felizes[^1]. Atrás daquele autocarro grande que partiu, vieram uns quantos Pequenos Amarelos de reserva prévia a tapar o buraco.

```tw-line
Cobertura de transporte público rural: autocarros grandes saem, mini autocarros e amarelos tapam (%)
Ano | Cobertura
2016 | 70
2023 | 91,96
2025 | 94,37
Fonte: Yuan Executivo, Direção de Estradas do Ministério dos Transportes, Agência Central de Notícias
```

A cobertura voltar acima de 90% é verdade, mas não se leia como «problema resolvido». Um mini autocarro de reserva leva muito menos gente que um autocarro grande; ter de reservar antes também filtra alguns idosos que precisam de sair de imediato ou não dominam o telemóvel. É um remendo honesto, não um triunfo.

## O comboio de alta velocidade levou os passageiros do rodoviário de longa distância

O que empurra os autocarros para o abismo não é só a falta de motoristas, há ainda o comboio de alta velocidade a passar por cima.

Depois da abertura do HSR em 2007, os passageiros de longa distância do corredor oeste transferiram-se em massa. As partidas de autocarros de autoestrada caíram a pique: segundo dados da Direção de Estradas compilados pela Rádio Central e United Daily News, as partidas caíram cerca de 40% de 2016 a 2024, passageiros caíram 32,8%[^26]; outro indicador, o número de linhas de rodoviário geral caiu 43,7% de 2012 a 2022[^27]. (Um conta partidas, outro conta linhas, anos-base diferentes, não tratem como a mesma coisa.) Taipé-Kaohsiung, essa longa distância oeste, até hoje só recuperou pouco mais de 60% do pré-pandemia; a linha norte-Hualien consolidou até só restar a Kamalan a circular aos fins de semana[^26]. A distância média das viagens encolheu de 93 km para 67 km, os clientes de longa distância foram levados pelo HSR, ficaram os de médio e curto[^26].

A consequência mais visível: terminais viraram cidades-fantasma. O segundo andar do Terminal de Taipé viu empresas rescindir, o andar inteiro ficou vazio à espera de arrendatário[^28]; os vários centros de transbordo que Taichung construiu, receia-se que virem elefantes brancos. Perante esta avalanche, a Direção de Estradas arrancou em 2025 o «maior ajuste de rede em 30 anos»[^20], que é ao mesmo tempo reconhecer que a velha rede não aguenta e uma tentativa de baralhar de novo.

## O progresso das cidades e os seus limites

Ao voltarmos o olhar para as áreas urbanas, vemos uma face completamente diferente. Com o mesmo sistema, o lado urbano está a dar grandes passos em frente, mas cada passo é dado no limite da sua capacidade.

O primeiro avanço são os autocarros de linha tronco (_trunk lines_). Entre 2017 e 2018, a cidade de Taipé reclassificou a sua rede de autocarros; nos horários de ponta, as rotas de linha tronco têm uma frequência tão alta, entre 4 a 6 minutos, que se tornaram tão fáceis de entender e esperar como o metro[^29]. O segundo é o passe mensal de transporte TPASS. Originado de promessas eleitorais de 2022, foi implementado em julho de 2023, com um orçamento especial de NT$20 mil milhões para os primeiros três anos: passes mensais de NT$1.200 para a região de Keelung-Taipé-New Taipei-Taoyuan; NT$699 ou NT$999 para Miaoli-Taichung-Changhua-Touku; e NT$999 para o sul (Kaohsiung-Pingtung), permitindo viagens ilimitadas em autocarros e metro[^30].

O relatório de desempenho do TPASS deve ser lido com nuances. O lado positivo é que ele realmente atraiu pessoas para o transporte público: o volume de passageiros em autocarros aumentou 19,6% e no metro aumentou 36,9%[^31]. No entanto, quanto à capacidade de converter condutores de carros e motociclos em utilizadores de transporte público, o efeito foi limitado: entrevistas presenciais em Taipé mostram que a proporção real de transferência de veículos privados para o transporte público foi de apenas 7,33%[^32]. Em outras palavras, a maioria dos novos passageiros são pessoas que "já usavam o transporte e agora usam mais", e não pessoas que "antes conduziam e agora mudaram para o transporte público".

Mais realista ainda é a questão financeira: o orçamento especial de NT$20 mil milhões do TPASS expira no final de 2025. O novo plano de continuidade tem uma escala de NT$36,38 mil milhões, mas enfrenta o risco de interrupção porque o orçamento total está bloqueado no Legislativo. Isso afeta 20 condados e cidades em todo o país, com muitos locais dependendo do adiantamento de fundos pelas próprias empresas para sobreviver[^32][^33]. Uma boa política que trouxe pessoas para o transporte público está agora presa num impasse político.

![Autocarro elétrico BYD K9 da Taipei Bus a circular em frente ao Taipei Municipal Zoo](/article-images/lifestyle/electric-bus-byd-taipei-2026.webp)
_O autocarro elétrico BYD K9 da Taipei Bus passa em frente ao Taipei Municipal Zoo, em 2026. O objetivo é que os autocarros urbanos sejam totalmente eletrificados até 2030, mas em 2024 apenas cerca de 18% estão em circulação. Photo: 厦门金龙永远的神, CC BY 4.0 (ver fontes de imagem no final do artigo)._

A eletrificação é o terceiro avanço das cidades e também onde a disparidade é mais gritante. O governo declarou que os autocarros urbanos serão totalmente elétricos até 2030, visando substituir quase dez mil autocarros a combustão (um inventário de cerca de 9.400 veículos) com uma meta de subsídio para aquisição de 11.700 unidades; o plano completo foi aprovado em junho de 2023, com um orçamento de NT$64,3 mil milhões[^34]. O ideal é elevado, mas a realidade é lenta: até 2024, apenas cerca de 1.926 autocarros elétricos estão efetivamente em circulação (18%), e sete condados ainda têm zero unidades[^35].

```tw-bars
A distância para a eletrificação total em 2030 (progresso da eletrificação dos autocarros urbanos)
Autocarros elétricos em circulação em 2024 | 1926 | Proporção de 18%
Meta de aquisição subsidiada para 2030 | 11700 | Sete condados ainda com zero unidades
Fonte: Yuan Executivo, Ministério dos Transportes, final de 2024
```

Onde está o bloqueio? Há perdas em cada etapa, desde a aprovação do subsídio ao nível local até à assinatura efetiva dos contratos (o montante caiu de 2.080 para 1.404 e depois para 744); além disso, as infraestruturas de carregamento são caras, com uma estação de carregamento custando mais de NT$60 milhões[^35]. Com um veículo a custar NT$11 milhões e um subsídio de NT$6,8 milhões, as empresas ainda precisam de levantar NT$4,2 milhões por conta própria. Para um setor que já sobrevive com dificuldade graças aos subsídios e que nem sequer consegue contratar motoristas, esta é uma decisão difícil de tomar.

> 📝 **Nota do Curador**: Estes três temas urbanos (linhas tronco, passe mensal e eletrificação) parecem uma lista de progresso quando analisados isoladamente. No entanto, eles partilham um pressuposto invisível comum: é preciso haver alguém para conduzir os veículos. Quando a idade média dos condutores sobe para 51 anos e o défice ultrapassa as 5.000 pessoas, por mais inteligente que seja o passe mensal ou tão ecológicos que sejam os autocarros elétricos, eles serão apenas carcaças de metal paradas nos terminais. O progresso urbano é real, mas ele está a avançar sentado sobre uma base laboral que envelhece rapidamente.

## Taiwan não é caso único

Olhamos lá fora, descobrimos que as dificuldades de Taiwan não estão sozinhas.

O Japão, sempre invejado no transporte público, no lado rural já colapsou: 85% das empresas de autocarros rurais em prejuízo, motoristas de táxi de Hiroshima com idade média de 63 anos, mais de 20% da população vive em locais demasiado longe de estação ou paragem[^36]. Seul na Coreia discute a sério trazer motoristas estrangeiros, porque quase metade dos atuais tem mais de 60 anos[^37]. Na Europa 129 milhões de pessoas vivem em zonas com transporte público insuficiente, no Reino Unido a receita de bilhetes de autocarro rural não cobre nem 25% do custo[^38]. «Perda populacional rural, envelhecimento de motoristas, encolhimento de linhas» é problema estrutural comum na Ásia Oriental e no mundo; a diferença de Taiwan está só na dependência mais profunda da mota, que faz o autocarro viver desde o início à sombra da mota.

Curiosamente, Taiwan tem uma coisa que virou referência internacional ao contrário. A organização californiana de defesa do transporte Seamless Bay Area pôs o TPASS como exemplo para a Califórnia aprender, resumiu três chaves do sucesso: subsídio suficiente, vontade política central, flexibilidade de execução local[^39]. E quem mais beneficia do TPASS, paradoxalmente, não é a elite urbana, é o campo. Depois do TPASS, a procura de autocarro em Hualien cresceu 69,8%, o efeito rural mais marcante desta análise[^39].

```tw-figure
+69,8%
Crescimento da procura de autocarro em Hualien depois do TPASS — um passe mensal barato, no sítio onde menos escolha há, faz o maior efeito
Análise Seamless Bay Area
```

Este número dá exatamente uma bofetada na narrativa «autocarro é brinquedo de elite urbana». Um passe mensal barato, em Taipé é cereja no bolo, em Hualien baixa real e concretamente o custo de sair de casa. Quanto menos escolha há, mais força tem uma pequena melhoria.

## O último autocarro, vai para quem mais precisa dele

Voltemos àquela manhã na estação de Tunglo.

Aquelas 30 e tal pessoas, de crianças de jardim de infância a um idoso de 90 anos, bateram palmas a despedir o último autocarro 5658 da Hsinchu Bus. Desde a primeira linha de operação conjunta de Taipé em 1977, às carrinhas pirata que viraram UBus em 1989, aos dados abertos que sustentam a contagem do Google, à idade média de 51 anos dos motoristas e às linhas rurais que param uma a uma, este sistema cresceu até hoje a carregar sempre a mesma gente: os que não têm volante na mão, os que não podem ir por conta própria. O seu lado mais cruel é parar precisamente debaixo dos pés de quem mais precisa.

Mas a história não parou naquele autocarro grande que partiu. Depois das palmas, as 12 linhas de Miaoli viraram uma frota de Pequenos Amarelos Felizes, o passageiro liga, o autocarro vai à porta. Não é triunfo: mini autocarro de reserva leva pouca gente, tem de reservar antes, não dá para toda a gente apanhar. Mas é um sinal: quando o autocarro grande não aguenta, o sistema está a tentar com outra forma voltar a apanhar aqueles que sempre devia apanhar. A cobertura rural voltar a 94% não é porque há mais autocarros, é porque uma sociedade ainda não decidiu deixar esta gente fora do autocarro.

Da próxima vez que você estiver debaixo do sinal, seja em Taipé a queixar-se que demora, seja no campo de Changhua à espera de um dos dois do dia, lembre-se: você não espera só um autocarro. Espera um sistema que se esforça pelos «sem volante», e que precisamente onde mais faz falta é que primeiro fica sem fôlego. Se ele vem ou não, nunca mede eficiência de transporte. Mede a escolha de uma sociedade: quer ou não levar aqueles que não podem ir por conta própria.

Aquele último 5658 partiu. Mas enquanto houver alguém a levantar a mão debaixo do sinal, ainda há um autocarro que deve a eles vir buscá-los.

**Leitura complementar**: [Sistema de transportes de Taiwan](/pt/lifestyle/transportation-system)、[Cultura da mota em Taiwan](/pt/lifestyle/taiwan-scooter-culture)、[História do metro de Taiwan](/pt/lifestyle/history-of-taiwan-mrt-development)、[Autocarros de turismo](/pt/lifestyle/tour-bus)

## Fontes das imagens

Este artigo usa 6 imagens com licença Creative Commons, todas em cache em `public/article-images/lifestyle/` para evitar hotlink aos servidores de origem:

- [Holly Cheng](https://commons.wikimedia.org/wiki/File:Taipei_street_scene.jpg) — Mota e autocarro em cruzamento de Taipé (hero), 1996, CC BY-SA 3.0
- [Nutnse0008](https://commons.wikimedia.org/wiki/File:Shing_Nan_Bus_421-U9_20160423.jpg) — Autocarro de piso baixo da Hsingnan Bus de Tainan, 2016, CC BY-SA 4.0
- [T Gordon Cheng](<https://commons.wikimedia.org/wiki/File:Taipei_Main_Station_(Zhengzhou)_bus_shelter_20201024.jpg>) — Abrigo de paragem da Estação de Taipé, 2020, CC BY-SA 4.0
- [Wei Ting Hsu](<https://commons.wikimedia.org/wiki/File:%E5%9C%8B%E5%85%89%E5%AE%A2%E9%81%8B_KKA-1897_(2026.3.11).jpg>) — Autocarro rodoviário da Kuo-Kuang Bus, 2026, CC BY-SA 4.0
- [T Gordon Cheng](https://commons.wikimedia.org/wiki/File:%E6%B9%96%E5%8F%A3%E9%84%89%E5%B9%B8%E7%A6%8F%E5%B7%B4%E5%A3%AB_1%E8%99%9F%E7%B7%9A_and_%E5%AF%B6%E5%B1%B1%E9%84%89%E5%B9%B8%E7%A6%8F%E5%B7%B4%E5%A3%AB_%E4%B8%89%E5%B3%B0%E7%B7%9A_2025-09-30.jpg) — Pequeno Amarelo Feliz rural de Hsinchu, 2025, CC BY-SA 4.0
- [厦门金龙永远的神](https://commons.wikimedia.org/wiki/File:Taipei_bus_BYD_K9.jpg) — Autocarro elétrico BYD K9 da Taipé Bus, 2026, CC BY 4.0

## Referências

[^1]: [Agência Central de Notícias: Habitantes de Tunglo apanham último autocarro da Hsinchu Bus para recordar](https://www.cna.com.tw/news/ahel/202409150184.aspx) — Reportagem de 15 de setembro de 2024, regista a saída da Hsinchu Bus de Taoyuan-Hsinchu-Miaoli, cena de despedida do último 5658 em Tunglo, com declarações literais do representante Hsu Yu-feng, hora, local, linha verificáveis.

[^2]: [Departamento de Estatística do Ministério dos Transportes: Inquérito à situação de uso de veículos pelos cidadãos](https://www.motc.gov.tw/ch/app/data/doc?id=55&module=topics&detailNo=1&serno=202201270001&type=s) — Inquérito oficial de veículos do Ministério dos Transportes, fornece dados de primeira mão: 53,3% das famílias sem carro vs 13,7% das com carro em quota de transporte público, taxas de uso por faixa etária e viagens escolares.

[^3]: [Taiwan People News: Colapso do rodoviário, motoristas caem um terço em seis anos](https://www.taisounds.com/news/content/125/204965) — Reporta motoristas de rodoviário de 5.646 em 2019 para 3.551 em 2024, falta de efetivos e dívida da Kuo-Kuang Bus acima de 2 mil milhões, cita estatísticas da Direção de Estradas.

[^4]: [ScienceDirect: Investigação sobre viagem e desenvolvimento urbano na cidade das motas de Taiwan](https://www.sciencedirect.com/science/article/abs/pii/S0967070X25002446) — Artigo académico, quantifica dependência da mota em Taiwan: 599 por mil habitantes, 83,7% dos lares com mota, apenas 12,5% dependem principalmente de transporte público.

[^5]: [Vocus: Veículos de transporte e vida dos trabalhadores migrantes em Taiwan](https://vocus.cc/article/63dcb90efd89780001509011) — Explica que trabalhadores migrantes em Taiwan, por política de longa data que restringe compra de veículo, usam mota no dia a dia, só em viagens longas de fim de semana apanham rodoviário, corrige o equívoco comum «migrantes dependem de autocarro».

[^6]: [Wikipédia: Autocarros urbanos da cidade de Taipé](https://zh.wikipedia.org/zh-tw/臺北市市區公車) — Regista história da operação conjunta de Taipé: 1976 criação do comité preparatório, 1 de janeiro de 1977 linhas 201/202 arrancam, 30 de abril primeira fase de 33 linhas em serviço.

[^7]: [Wikipédia: EasyCard](https://zh.wikipedia.org/zh-hk/悠遊卡) — Regista EasyCard a 30 de setembro de 2002 em toda a rede de autocarros, iPass em 2014 com metro de Kaohsiung, cronologia da bilhética eletrónica.

[^8]: [Gabinete de Transportes Públicos de Taipé: Comunicado de imprensa sobre cobrança bidirecional de entrada e saída](https://pto.gov.taipei/News_Content.aspx?n=6B4D38874E971F4B&sms=87415A8B9CE81B16&s=954214BF3AA2EA89) — Dados de primeira mão do Gabinete de Taipé, explica validação bidirecional a 1 de julho de 2019 primeira fase, fevereiro de 2020 segunda fase em toda a rede, e objetivos de cálculo preciso de tarifa por secções e desconto de transbordo.

[^9]: [Ministério dos Transportes: Estatísticas de procura de autocarros urbanos](https://www.motc.gov.tw/ch/app/data/doc?id=55&module=topics&detailNo=1&serno=202112090001&type=s) — Estatísticas oficiais do Ministério, 2020 Taipé-Novo Taipé representam 73,7% da procura total de autocarros urbanos da ilha, dado duro de concentração urbano-rural.

[^10]: [Site oficial TDX Serviço de Circulação de Dados de Transportes](https://tdx.transportdata.tw/) — Plataforma oficial do Ministério dos Transportes, regista PTX criado em 2016, dezembro de 2022 integrado e atualizado para TDX, história de governança de dados abertos.

[^11]: [iThome: Escala dos dados abertos TDX e uso pelo Google Maps](https://www.ithome.com.tw/news/142077) — Reporta TDX com mais de 4,9 milhões de chamadas API/dia, 540 milhões de registos acumulados, 3.000+ empresas de valor acrescentado, e confirma que informação de chegada de autocarro no Google Maps Taiwan usa dados TDX.

[^12]: [Medium: Tutorial da API TDX e análise de padrão de dados](https://medium.com/@ycpin/data-mining-transport-data-exchange-tdx-api-tutorial-and-demonstration-14bba4a58e9b) — Análise técnica, explica TDX usa formato OData «quatro estrelas» proprietário, tem GTFS Beta mas não padrão internacional, e não se encontra organização internacional que ponha Taiwan como referência.

[^13]: [PTT fórum Bus: Discussão apps de autocarro back-end mesmo TDX](https://www.ptt.cc/bbs/Bus/M.1613871840.A.47D.html) — Utilizadores revelam que várias apps de autocarro back-end ligam todas ao TDX, GPS instável em arranha-céus, e clarificam que «1968» é numeração de linhas de autoestrada e app de info em tempo real de autoestrada, não app de autocarros urbanos.

[^14]: [PTT fórum Taichung: Tópico de queixas sobre autocarros fantasma de Taichung](https://www.ptt.cc/bbs/TaichungBun/M.1691104386.A.D22.html) — Tópico público de 2023, utilizadores LeiHide, teddykitty descrevem literalmente a experiência de app mostrar autocarro mas não vir, «autocarros fantasma», verificável com Ctrl-F.

[^15]: [Revista Taiwan Panorama: Da Taiwan Bus à Kuo-Kuang Bus](https://www.taiwan-panorama.com/Articles/Details?Guid=593707a8-2be1-462d-aed7-73883b3e20f0) — Detalha Direção de Estradas 1946, Taiwan Bus 1977 criada, prejuízo anual 5 mil milhões, 2001 1.090 funcionários cada um 300 mil criam Kuo-Kuang Bus assumem 96 linhas, percurso de privatização.

[^16]: [Wikipédia: UBus](https://zh.wikipedia.org/zh-tw/統聯客運) — Regista UBus nomeada pelo diretor do Instituto de Investigação de Transportes Chang Chia-chu com sentido de «comandar os quatro cantos, operação conjunta», criada a 6 de setembro de 1989, primeira empresa legal privada de autocarros de autoestrada de Taiwan.

[^17]: [United Daily News Ação Sol: Inquérito à escassez de motoristas de autocarros](https://udn.com/news/story/10098/8766101) — Cita dados do Ministério dos Transportes, motoristas urbanos 2015 11.811 → 2023 10.588, idade média 45,2 → 51,2, falta urbanos 1.443 mais rodoviários 772.

[^18]: [The Reporter: Salário horário só 88 NT$, local de sobrecarga dos motoristas da Taoyuan Bus](https://www.twreporter.org/a/tybus-driver-overwork) — Investigação profunda à estrutura laboral da Taoyuan Bus: 14 rubricas salariais, base 26.400, salário médio horário calculado em 88 NT$, dormitório 5 ping 16 pessoas, com declarações literais de Fan Kuang-ming, Chen Wei-chen, Hsu Yung-fa.

[^19]: [The Reporter: Onda de falta de mão de obra no rodoviário (parte 2)](https://www.twreporter.org/a/current-challenges-of-bus-industry-2) — Entrevista subchefe de operações da Sanchung Bus Chang Hsien-te, chefe da estação de Nangang Wang Shuo-chien, declarações literais sobre dificuldade de contratar motoristas, diferença de responsabilidade entre levar pessoas e carga.

[^20]: [United Daily News: Direção de Estradas arranca maior ajuste de rede em 30 anos](https://udn.com/news/story/7266/9256802) — Reporta queda de partidas e linhas de rodoviário de autoestrada, dívida da Kuo-Kuang acima de 2 mil milhões e atraso de salários, onda de saídas de empresas, e plano de ajuste de rede de 2025 da Direção de Estradas.

[^21]: [The Reporter: Crise do 9005 só num sentido e impasse do rodoviário](https://www.twreporter.org/a/current-challenges-of-bus-industry-1) — Cita professor do Departamento de Gestão de Transportes da Universidade Tamkang Chang Sheng-hsiung literalmente, sobre como tarifas reprimidas a longo prazo limitam qualidade de autocarros e rodoviário.

[^22]: [The Reporter: Crise do 9005 só num sentido e impasse do rodoviário](https://www.twreporter.org/a/current-challenges-of-bus-industry-1) — Entrevista diretor-geral do Grupo Capital Lee Chien-wen literalmente «sem solução, completamente sem solução» «quanto mais leva mais perde», disseca o impasse estrutural de linhas deficitárias que quanto mais carregam mais perdem.

[^23]: [Regulamento de subsídio a linhas de autocarros de serviço rural de Taipé](https://laws.gov.taipei/law/LawSearch/LawArticleContent/FL026380) — Diploma de primeira mão, define fórmula de subsídio rural como (custo razoável por quilómetro-viatura menos receita) vezes partidas vezes quilómetros, menos de 2 passageiros por quilómetro-viatura pode candidatar-se.

[^24]: [Site oficial Autocarro Feliz: O que é o Autocarro Feliz](https://www.happybus.com.tw/Whatisbus) — Oficial da Direção de Estradas, explica transporte responsivo à procura (DRTS) 2016 teste, 2019 batizado «Autocarro Feliz», «Pequeno Amarelo Feliz», custo por quilómetro-viatura 30 a 40 NT$.

[^25]: [Yuan Executivo: Cobertura de transporte público rural e equidade no transporte](https://www.ey.gov.tw/Page/5A8A0CB5B41DA11E/25b3096e-90ec-42cf-bd2b-5a0b65d409eb) — Dados oficiais, cobertura rural 2016 base 70%, 2023 91,96%, março de 2025 94,37%, meta 2028 atingir 100%.

[^26]: [Rádio Central: Rodoviário de autoestrada sob impacto do HSR](https://www.rti.org.tw/news?pid=186039&uid=3) — Reporta após HSR partidas de rodoviário de autoestrada 2016 a 2024 caem cerca de 40%, passageiros -32,8%, distância média de 93 km para 67 km, leste só Kamalan fins de semana.

[^27]: [The Critical Review Network: Linhas de rodoviário geral encolhem há dez anos](https://www.thenewslens.com/article/193854) — Cita dados da Direção de Estradas, linhas de rodoviário geral 2012 a 2022 encolhem 43,7%, mostra indicador de declínio com bitola diferente das partidas.

[^28]: [ETtoday: Segundo andar do Terminal de Taipé rescindido vira cidade-fantasma](https://www.ettoday.net/news/20241020/2838555.htm) — Reporta após desvio do HSR empresas do segundo andar do Terminal de Taipé rescindem, andar inteiro vazio à espera de arrendatário, reflete impacto conexo do declínio do rodoviário de autoestrada nas instalações de transbordo.

[^29]: [Wikipédia: Linhas tronco de autocarros da cidade de Taipé](https://zh.wikipedia.org/wiki/臺北市幹線公車) — Regista Taipé 2017, 2018 rede reclassificada em quatro níveis, linhas tronco hora de ponta 4 a 6 minutos, desenho institucional.

[^30]: [The Reporter: Passe mensal TPASS um ano depois](https://www.twreporter.org/a/data-reporter-a-year-after-tpass-was-launched) — Reportagem profunda sobre origem da política TPASS, Taipé-Novo Taipé-Keelung-Taoyuan 1.200 NT$/mês, 3 anos 200 mil milhões orçamento especial e análise multifacetada dos resultados do primeiro ano.

[^31]: [Taipei Times: TPASS puxa procura de autocarro e metro](https://www.taipeitimes.com/News/front/archives/2024/07/11/2003820639) — Reportagem em inglês, TPASS depois de entrar procura autocarro +19,6%, metro +36,9%, utilizadores passam 700 mil.

[^32]: [Storm Media: Taxa de transferência TPASS só 7,33% e crise de rutura em 2026](https://www.storm.mg/lifestyle/11093047) — Reporta transferência real de veículo privado só 7,33%, novo plano 363,8 mil milhões travado no orçamento geral enfrenta rutura, 20 condados/cidades afetados.

[^33]: [PTS News: Orçamento especial TPASS acaba, plano de continuação travado](https://news.pts.org.tw/article/801336) — Reporta 200 mil milhões orçamento especial TPASS acaba fim de 2025, novo 363,8 mil milhões afetado por revisão do orçamento geral, localidades a adiantar dinheiro a aguentar.

[^34]: [Yuan Executivo: Política 2030 autocarros 100% elétricos](https://www.ey.gov.tw/Page/5A8A0CB5B41DA11E/fbaa04ca-a430-48e7-8ba1-0b35d1dc4879) — Política oficial, 2030 autocarros urbanos 100% elétricos, perto de 10 mil a diesel para substituir, meta de subsídio de compra 11.700, plano aprovado junho de 2023 com 64,3 mil milhões.

[^35]: [Epoch Times: Autocarros elétricos 2024 fim de ano 1.926 matriculados](https://www.epochtimes.com/b5/25/1/8/n14409087.htm) — Cita dados do Ministério dos Transportes, 2024 fim de ano autocarros elétricos efetivamente na rua cerca de 1.926, 18%, 7 condados/cidades a zero, e explica vazamento de dotação da aprovação à assinatura e custo de postos de carregamento.

[^36]: [Fórum Económico Mundial: Dificuldades do transporte público rural no Japão](https://www.weforum.org/stories/2020/01/japans-much-admired-public-transit-system-is-leaving-its-rural-areas-behind/) — Reportagem em inglês, 85% empresas rurais de autocarros no Japão em prejuízo, motoristas de táxi de Hiroshima idade média 63, mais de 20% população vive longe de estação/paragem.

[^37]: [Korea Herald: Envelhecimento de motoristas de autocarro em Seul e discussão de motoristas estrangeiros](https://www.koreaherald.com/article/10011103) — Reportagem em inglês, motoristas de Seul 60+ quase metade, falta cerca de 600, autoridades discutem trazer motoristas estrangeiros, mostra escassez comum na Ásia Oriental.

[^38]: [Interreg Europe: Desafios do transporte rural na Europa](https://www.interregeurope.eu/rural-mobility) — Plataforma de cooperação regional da UE, aponta 129 milhões de europeus em zonas com transporte público insuficiente, receita de bilhetes de autocarro rural no Reino Unido não chega a 25% do custo, corrobora que rodoviário rural é problema estrutural global.

[^39]: [Seamless Bay Area: Integração de bilhética de Taiwan dá lição à Califórnia](https://www.seamlessbayarea.org/blog/2025/1/5/notes-from-taiwan-regional-transit-fare-integration-programs-fuel-taiwans-ridership-growth) — Organização californiana de defesa do transporte analisa, vê TPASS como padrão para a Califórnia aprender, resume três chaves: subsídio suficiente, vontade política central, flexibilidade de execução local.
