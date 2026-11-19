---
title: 'Indústria de semicondutores: da transferência de tecnologia da RCA ao nitreto de gálio e encapsulamento quântico — 50 anos de revolução em ciência dos materiais'
description: 'O "escudo de silício" de Taiwan domina o processo avançado global graças à fundição, mas o nitreto de gálio nos carregadores rápidos, o CoWoS sob os chips de IA e os refrigeradores de diluição acima dos qubits mostram que o próximo campo de batalha de 50 anos da ciência dos materiais apenas começou a ser montado.'
date: 2026-03-17
category: 'Technology'
tags:
  [
    'semicondutores',
    'TSMC',
    'nitreto de gálio',
    'encapsulamento 3D',
    'CoWoS',
    'computador quântico',
    'processo avançado',
    'escudo de silício',
    'ciência dos materiais',
  ]
subcategory: '半導體與硬體'
author: 'Taiwan.md'
featured: true
lastVerified: 2026-05-19
lastHumanReview: true
difficulty: 'intermediate'
readingTime: 22
image: '/article-images/technology/silicon-vs-gan-charger-2025.webp'
imageCredit: '4300streetcar'
imageLicense: 'CC BY 4.0'
imageSource: 'https://commons.wikimedia.org/wiki/File:Silicon_vs_GaN_30W_USB-C_chargers.jpg'
sporeLinks:
  - id: 87
    platform: 'threads'
    date: '2026-05-25'
    url: 'https://www.threads.com/@taiwandotmd/post/DYvqEURgXm-'
  - id: 88
    platform: 'x'
    date: '2026-05-25'
    url: 'https://x.com/taiwandotmd/status/2058735515021783190'
translatedFrom: 'Technology/半導體產業.md'
sourceCommitSha: 'f024e87e7'
sourceContentHash: 'sha256:a50aa44ff04babb9'
sourceBodyHash: 'sha256:729d7ab175048563'
translatedAt: '2026-11-19T16:30:31+08:00'
---

# Indústria de semicondutores: da transferência de tecnologia da RCA ao nitreto de gálio e encapsulamento quântico — 50 anos de revolução em ciência dos materiais

![Dois carregadores USB-C de 30 W de mesma potência lado a lado; o da esquerda, de silício, é visivelmente maior, o da direita, de nitreto de gálio, encolheu quase pela metade, refletindo como a ciência dos materiais comprimiu a densidade de energia na palma da mão](/article-images/technology/silicon-vs-gan-charger-2025.webp)
_Si vs GaN: comparativo de volume de carregadores USB-C de mesma potência. Foto: 4300streetcar, 2025-12-25. [Licença via Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Silicon_vs_GaN_30W_USB-C_chargers.jpg)._

> **Resumo em 30 segundos:** A TSMC iniciou a produção em volume de 2 nm no quarto trimestre de 2025 na Fab 22 em Kaohsiung, liderando o mundo por 2-3 gerações[^2]. Mas a história não se resume a transistores cada vez menores: seu carregador rápido carrega nitreto de gálio (GaN), a GlobalWafers fabrica wafers de 8 polegadas de carboneto de silício (SiC) em Zhongli, e as GPUs Blackwell da NVIDIA só chegam aos data centers graças ao encapsulamento CoWoS da TSMC. Da transferência de tecnologia da RCA de 1973 — US$ 4,5 milhões e 19 engenheiros enviados aos EUA[^5] — ao chip supercondutor de 20 qubits da Academia Sinica conectado à rede em 2026[^6], Taiwan percorreu um longo rio da ciência dos materiais: da física de lacuna de banda à deposição atômica até qubits topológicos. O "escudo de silício" apoia-se em 50 anos de experiência industrial, mas a posição de fundição na era quântica ainda não foi conquistada por Taiwan.

1985, uma tarde. O ministro sem pasta Li Kuo-ting (李國鼎) chamou ao Yuan Executivo o recém-regressado Morris Chang (張忠謀), que acabava de assumir a presidência do ITRI. Li foi direto: «Queremos criar uma empresa de fabricação de circuitos integrados de ultragrande escala; você comanda.»

Chang hesitou: achava que viera apenas dirigir o instituto; duas semanas depois já estava fundando uma empresa com um modelo de negócios que ninguém jamais tentara.

Esse diálogo mudou o mundo, mas 40 anos depois, olhando para trás, o «mundo» é muito mais espesso do que se imaginava naquela tarde. Ele inclui o carregador rápido de 65 W do tamanho de duas falanges ao lado do seu telemóvel, cada GPU Blackwell que a NVIDIA devora nos data centers, e os qubits no laboratório da Academia Sinica que só acordam quando arrefecidos até perto do zero absoluto.

## 1987: a aposta da fundição

![Fachada da Fab 5 da TSMC no Parque Científico de Hsinchu, edifício industrial de vários andares ligado à Guangfu Road, representativo da expansão da TSMC nos anos 1990](/article-images/technology/tsmc-fab5-hsinchu-2010.webp)
_Fab 5 da TSMC no Parque Científico de Hsinchu, 2010. Foto: Peellden. [Licença via Wikimedia Commons](https://commons.wikimedia.org/wiki/File:TSMC_Fab5.JPG)._

A história começa antes: em 1973, o ITRI gastou US$ 4,5 milhões para comprar a tecnologia de circuitos integrados da RCA americana, despachando 19 engenheiros para treinamento nos EUA[^5]. Ninguém imaginava que essa «mensalidade» se tornaria a primeira pedra do reino taiwanês dos semicondutores. Em 1980, o ITRI transferiu a tecnologia e fundou a UMC — Taiwan tinha sua primeira empresa de semicondutores. Mas Li Kuo-ting não se deu por satisfeito: a UMC era pequena demais, a tecnologia não acompanhava o padrão internacional; Taiwan precisava de um salto maior.

Em 21 de fevereiro de 1987, Morris Chang fundou a Taiwan Semiconductor Manufacturing Company no Parque Científico de Hsinchu, inaugurando um modelo de negócios inédito: **fundição pura**.

A ideia soava louca na época: todas as empresas de semicondutores do mundo eram verticalmente integradas, do design à fabricação; como alguém poderia só fabricar, sem desenhar? Os clientes confiariam seus layouts mais confidenciais a você?

A lógica de Chang era simples: a indústria ficava cada vez mais complexa; design e fabricação são especialidades completamente diferentes. Em vez de fazer tudo mal, melhor focar em uma coisa e levar a fabricação de chips ao melhor nível mundial.

A estrutura acionária inicial da TSMC foi engenhosa: governo 48,3 %, investidores privados 24,2 %, Philips holandesa 27,6 %[^1]. A participação da Philips foi crucial. Na época, EUA e Japão monopolizavam os semicondutores; a Europa precisava urgentemente de um fornecedor alternativo. A Philips não só investiu como entregou seus próprios pedidos de chips à TSMC, tornando-se o primeiro grande cliente.

O modelo de fundição provocou a grande divisão da indústria: empresas de design (fabless) dedicam-se ao desenho (Qualcomm, NVIDIA, MediaTek), fundições à fabricação (TSMC, UMC, GlobalFoundries), casas de encapsulamento e teste ao back-end (ASE, SPIL). Antes, só gigantes como Intel e IBM podiam arcar com o investimento astronômico de uma fab; agora, qualquer startup com uma boa ideia pode desenhar chips e mandar a TSMC fabricar.

O núcleo da fundição é confiança: o cliente deve crer que a TSMC não roubará seu design, não vazará segredos, não concorrerá com ele. A TSMC estabeleceu quatro «regras de confiança»: neutralidade tecnológica (nunca desenha chips), igualdade entre clientes (mesma tecnologia e serviço para todos), NDAs de mais alto nível, alocação justa de capacidade. Essas regras vigoram há quase 40 anos, sem exceção.

> 📝 **Nota do curador**: Em 1987, os 19 engenheiros despachados à RCA pelo ITRI mal passavam dos 40 anos. Eles aprenderam o processo de silício dos anos 1960 nos EUA; ninguém previu que, 30 anos depois, seriam os «donos» da tecnologia de encapsulamento mundial. E a cláusula de «autocastração voluntária» — a TSMC decidir não desenhar chips — acabou virando o grilhão que prende Jensen Huang, Tim Cook e Lisa Su. A grandeza do modelo não está no que ele _fez_, mas no que **escolheu não fazer**. Remontando a fonte: 1947, Bell Labs inventa o transistor; 1958, Texas Instruments e Fairchild criam independentemente o circuito integrado; 1949, o governo nacionalista traz para Taiwan um lote de tecnocratas formados em engenharia (futura espinha dorsal do ITRI) — os US$ 4,5 milhões da RCA foram o bastão de revezamento, não a linha de partida.

## Lin Ben-jian (Burn J. Lin) e a ASML: a aposta dos dois «pequeninos» na imersão

A fundição não é obra só da TSMC; o leitor **[@malathrone_21k_running](https://www.threads.com/@malathrone_21k_running)** completou nos comentários uma linhagem crucial: a TSMC e a ASML — nascida em 1984 da cisão da Philips holandesa, hoje única fornecedora mundial de máquinas EUV (extreme ultraviolet) — são irmãs de sangue da Philips. Trinta anos atrás, ambas eram «pequeninos» que os gigantes da indústria ignoravam[^asml-philips].

A chave é um engenheiro taiwanês chamado Lin Ben-jian (林本堅, Burn J. Lin). Desde 1992 no IBM Watson Research Center trabalhando em litografia, voltou a Taiwan em 2000 como VP de P&D da TSMC[^lin-bio]. Naquela década, a disputa da próxima geração de litografia era o DUV de 157 nm; Nikon e Intel apostavam nisso, mas o 157 nm tropeçou: birrefringência nas lentes de fluoreto de cálcio, absorção forte dos filmes nesse comprimento de onda, dificuldade de integração do processo[^157nm-fail].

Em 2002, na conferência SPIE, Lin propôs uma ideia «maluca»: «Mantemos a fonte de 193 nm, mas colocamos água entre a lente e o wafer.» O índice de refração da água é 1,44; a luz de 193 nm na água equivale a ~134 nm de resolução — mais fino que o 157 nm, sem trocar fonte nem lentes[^immersion-litho].

A Nikon não acreditou, manteve a aposta no 157 nm. A ASML topou apostar — ela também era um «pequenino» à procura da alavanca física para virar o jogo, igual à TSMC. Em 2003 a ASML começou a desenvolver o scanner de imersão a 193 nm (193i), em 2007 entrou em produção em volume e sustentou **seis gerações** do nó de 65 nm até a chegada do EUV[^immersion-litho][^cw-lin-interview].

«A Nikon teve medo do calor e não quis fazer imersão; a ASML e nós tivemos que nos virar», essa rota tecnológica derrubou a Nikon do trono da litografia[^cw-lin-interview]. Trinta anos atrás, dois «pequeninos» apostaram cada um sua ficha; hoje um é o único fabricante mundial de máquinas EUV, o outro a única fundição de 2 nm do mundo. As duas sementes que a Philips holandesa lançou floresceram juntas no século XXI.

## 50 anos de genealogia dos materiais: do silício ao nitreto de gálio aos supercondutores topológicos

Para entender o campo de batalha de 2025, primeiro há que entender uma linha de física que nunca foi contada com clareza.

O silício (Si) é o ponto de partida: sua «lacuna de banda» (bandgap) é 1,1 elétron-volt (eV) — o bilhete de entrada mínimo para um elétron saltar da banda de valência para a de condução. Lacuna pequena, chip fácil de fazer, mas dois tetos: alta tensão causa ruptura, alta frequência gera calor. O PanSci resume o limite com clareza: «A frequência de trabalho de semicondutores de silício limita-se a 100 kHz; acima disso a eficiência de conversão cai drasticamente, com grave desperdício de energia.»[^7]

O nitreto de gálio (GaN) tem lacuna de 3,4 eV, 3× a do silício. Tensão de ruptura 10× maior. Frequência de trabalho chega a 1 MHz, uma ordem de magnitude acima do silício[^7]. Esse número físico traduz-se no dia a dia: na mesma potência, o transformador e a bobina de indutância de GaN podem ser muito menores, a dissipação cai drasticamente, e nasce o carregador rápido que cabe na palma da mão.

O carboneto de silício (SiC) segue outra via: também é de larga lacuna (3,26 eV), mas aguenta mais temperatura e tensão. O PanSci aponta seu teatro de operações: «O carboneto de silício goza de boa estabilidade em alta temperatura e alta tensão; sobretudo com a crescente demanda de carregamento rápido de veículos elétricos, a necessidade de 1000 V ou mais fará com que o silício, limitado a 600 V, não suporte a carga; prevê-se que o SiC assuma componentes-chave nos VE.»[^7]

> 💡 **Sabia que**: A «lacuna de banda» de um semicondutor dita quanta tensão aguenta, quão rápido comuta, quanto calor emite. Silício 1,1 eV sustentou 50 anos de eletrónica de consumo; GaN 3,4 eV sustenta carregadores rápidos de 240 W para telemóveis; SiC 3,26 eV entra nos inversores de 800 V de VE; a próxima estação pode ser diamante (5,5 eV). Toda a genealogia é uma escada de «densidade de energia a subir», e Taiwan, a cada degrau, tem de regatear com os limites físicos da ciência dos materiais.

A próxima estação ainda não tem nome: pode ser diamante (C, 5,5 eV), óxido de gálio (Ga₂O₃, 4,8 eV), ou uma mudança total de mecanismo físico, como supercondutores topológicos (topological superconductor) — rota do processador quântico Majorana 1 da Microsoft, anunciado em fevereiro de 2025[^15]. A física muda, toda a cadeia industrial reescreve-se.

## O nitreto de gálio dentro do seu carregador rápido

Traga a câmara para a sua mochila.

O carregador do Nokia 3310 entregava 4,56 W; o de 2025 entrega 240 W — 52× mais. O PanSci traçou essa linha do tempo: «Os carregadores rápidos de GaN mais badalados hoje chegam a 65 W, 13× a mais; idealmente o tempo de carga encurtaria para 1/13.»[^7] Mais agressivo ainda: a marca chinesa realme lançou no início de 2023 o GT Neo5 com carregamento ultrarrápido de 240 W, empurrando o múltiplo acima de 50×.

Essa curva de crescimento, na física, apoia-se na troca para GaN; a espessura do fio de cobre e o volume da bateria até encolhem. Para subir potência e encolher volume, o caminho mais direto é elevar a frequência de comutação, mas «a frequência de trabalho de semicondutores de silício limita-se a 100 kHz»[^7] — o «limite do silício» do PanSci. O GaN leva a frequência acima de 1 MHz; transformador e indutância encolhem juntos, e o carregador inteiro cabe no bolso.

O problema: justamente quando o mercado taiwanês de carregadores rápidos ia explodir, a TSMC anunciou **saída da fundição de GaN em julho de 2027**[^8].

Por trás da decisão, duas pressões: de um lado, fabricantes chineses de GaN (China Resources Micro, Silan Micro, Runic, etc.) expandiram capacidade em massa, derrubando o preço de fundição a um nível que a TSMC não quer aceitar. De outro, a margem dos chips de IA é irresistível; a TSMC prefere converter as linhas de GaN em linhas de encapsulamento avançado (CoWoS). A tecnologia foi licenciada à VIS (世界先進) e à GlobalFoundries; o fardo da fundição de GaN em Taiwan passa para a PTS (穩懋, 3163) e a GCS (宏捷科, 8086), que já apostavam nisso há dez anos[^8].

> ⚠️ **Ponto de controvérsia**: A saída da TSMC da fundição de GaN tem duas leituras. Uma diz que é escolha racional de «guardar capacidade para IA»; o wafer de 3 nm rende 20× mais que o de 6 polegadas de GaN, a alocação naturalmente vai para o maior retorno. Outra questiona: Taiwan ao largar o GaN entrega a base da próxima geração de eletrónica de consumo (telemóveis, portáteis, carregadores) às fábricas chinesas; o «escudo» do silício só protege a ponta de IA? A diferença está em: você acha que o valor do escudo é «processo avançado insubstituível» ou «agglomerado completo de toda a cadeia de suprimento»?

Seja TSMC, seja a grande fabricante de wafers GlobalWafers, todas as grandes casas nacionais e internacionais já embarcaram nesse trem[^7]. Mas _em qual vagão_ sentar são duas coisas diferentes.

## Os wafers de SiC de 8 polegadas da GlobalWafers

Se o GaN é a história dos carregadores de telemóvel, o SiC é a história dos veículos elétricos.

A empresa-chave taiwanesa nessa linha é a GlobalWafers (環球晶), não a TSMC. Em 2024, a capacidade mensal de wafers de SiC de 6 polegadas da GlobalWafers atingiu ~20 mil unidades; fornos de crescimento de cristal próprios passaram de 3 para 20; rendimento ultrapassou 50 %[^9]. Em 2025, a produção em volume de wafers de SiC de 8 polegadas — a primeira de Taiwan.

A CEO Doris Hsu (徐秀蘭) fala direto: «A Sino-American Silicon e a GlobalWafers formam um "grupo IDM virtual", mirando a demanda de carboneto de silício nos próximos 5 anos! Corremos rápido.»[^9] A estratégia é amarrar sob a Sino-American o crescimento de cristal (GlobalWafers), epitaxia (Pai Cheng) e módulos (Hongyang Semi) numa única cadeia.

Mas o SiC não é linha reta para cima: no segundo semestre de 2025, fábricas chinesas de SiC (San'an Optoelectronics, Tianyke, etc.) expandiram loucamente, oferta global em excesso, a taxa de utilização de 6 e 8 polegadas da GlobalWafers caiu abaixo de 50 %[^10]. Isso contrasta com o roteiro otimista do PanSci de 2023 — «demanda de VE assumirá» — que ganhou um vale inesperado.

O sinal de recuperação vem da NVIDIA: rumores dizem que a próxima plataforma Rubin GPU adotará SiC no interposer, combinada com arquitetura de data center de 800 V CC, com produção em volume total em 2027[^10]. Se confirmado, a capacidade de 8 polegadas da GlobalWafers migra do VE para o data center de IA, e a história reacende.

> 📝 **Nota do curador**: GaN e SiC são frequentemente agrupados como «terceira geração de semicondutores», mas essa classificação, no significado industrial de Taiwan, vai além da etiqueta «próximos materiais» — representa a **primeira vez que Taiwan tem uma cadeia de suprimento completa sem passar pela TSMC**. GlobalWafers cresce o cristal, Pai Cheng faz a epitaxia, PTS encapsula, GCS desenha: fora do escudo de silício, outra «montanha», bem mais discreta mas independente, está a crescer.

## O grilhão de Jensen Huang e o CoWoS+

Voltemos ao front de IA.

O H100 da NVIDIA usa o processo de 4 nm da TSMC mais encapsulamento CoWoS-S integrando memória HBM3 de alta largura de banda. O Blackwell B200 sobe para CoWoS-L, integrando dois GPUs Blackwell mais um CPU Grace; velocidade de treino de IA 4× a do H100[^11]. A próxima geração, Rubin, prevista para 2026.

Cada geração de GPU gira em torno do motor duplo «processo avançado + encapsulamento avançado». O processo encolhe transistores; o encapsulamento aproxima diferentes dies. O PanSci usou a comparação entre a Provincial Highway 9 (curvas infinitas) e o túnel de Hsuehshan (reta direta): «O encapsulamento tradicional obriga a percorrer as nove curvas dezoito voltas da Provincial 9; o encapsulamento avançado corta caminho, perfura o túnel de Hsuehshan que liga os dois lados, tornando a troca de dados muito mais ágil e rápida.»[^12]

O núcleo do CoWoS (Chip-on-Wafer-on-Substrate) é o «through-silicon via» (TSV): empilha-se diferentes dies e usa-se microcanais verticais que atravessam o substrato de silício, transformando dois circuitos originalmente separados em conexão 3D. O PanSci descreve com clareza: «O empilhamento 3D permite colocar o chip C sobre o chip A; através de TSV atravessa-se o substrato de silício afinado, conectando os dois circuitos com fios verticais de ultra-alta densidade; a distância passa de "fim do mundo" a "palmo da mão".»[^12]

Os números de capacidade impressionam: capacidade mensal de CoWoS da TSMC ~35 mil wafers no fim de 2024, meta de 75 mil no fim de 2025, rumo a 150 mil em 2028, CAGR ~80 %[^13]. A NVIDIA reservou _toda_ a capacidade de CoWoS da TSMC até 2027, e **todos os chips, independentemente de qual fab da TSMC os produza (incluindo Arizona), voltam a Taiwan para o encapsulamento CoWoS**[^13].

Aí está o duopólio de Jensen Huang e TSMC. NVIDIA no design, TSMC na fabricação e encapsulamento; juntas travam o nó crítico dos data centers de IA.

Em 2 de junho de 2024, Jensen Huang, no keynote da Computex no ginásio da NTU, expôs esse grilhão ao mundo — os slides mostravam o roteiro Blackwell e Rubin, mas por trás de cada slide estava a linha de CoWoS da TSMC.

<div class="video-embed" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;margin:1.5rem 0;border-radius:8px;">
  <iframe src="https://www.youtube.com/embed/pKXDVsWZmUU" title="NVIDIA CEO Jensen Huang Keynote at COMPUTEX 2024" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

_Canal oficial da NVIDIA: keynote de Jensen Huang, 2 de junho de 2024, no ginásio da NTU, Computex "The Era of AI". Duas horas inteiras; ele desdobrou Blackwell GPU, NVLink, Spectrum-X slide a slide — mas o chão físico de cada slide está em Baoshan, Hsinchu. "Sem TSMC, sem NVIDIA" ele não disse em voz alta, mas cada gráfico de capacidade grita isso._

O preço físico do encapsulamento 3D não é pequeno. O PanSci apontou os nós: «O encapsulamento avançado exige planicidade extrema dos dies e alinhamento preciso; se um bump não conectar, a rendimento cai. Além disso, os circuitos integrados geram calor na computação; o encapsulamento avançado aproxima os dies, a condução térmica interfere mutuamente, todos se aquecem uns aos outros, tornando a dissipação mais difícil.»[^12]

A próxima fase é SoIC (System on Integrated Chips) e SoW-X (System on Wafer). SoIC é «3D verdadeiro»: wafer-a-wafer empilhado diretamente, sem bumps (bumping-free). SoW-X previsto para volume em 2027; máscara 9,5× a do CoWoS atual, integra 16+ dies de computação grande, capacidade de computação 40× a do CoWoS vigente[^13]. Chips de IA crescem; as linhas de encapsulamento da TSMC tornam-se pequenas fábricas.

## ALD: crescer átomo a átomo

![Em vitrine de museu, vários wafers de silício de diferentes tamanhos lado a lado; o maior, ~12 polegadas, reflete brilho espelhado, exibindo a matéria-prima central da fabricação de semicondutores](/article-images/technology/silicon-wafers-museum-2017.webp)
_Amostras de wafers de silício em exposição, 2017. Foto: ArticCynda. [Licença via Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Silicon_wafers.jpg)._

3 nm, 2 nm, 1,6 nm. Por trás desses números há uma tecnologia de fabricação discreta mas crucial: deposição atômica (Atomic Layer Deposition, ALD).

A ALD foi inventada por um finlandês, mas tornou-se passo obrigatório em _cada_ wafer de processo avançado de Taiwan.

A história começa na Finlândia. Em 1974, o cientista de materiais Tuomo Suntola iniciou o desenvolvimento de ALD na Instrumentarium Oy. Em 1977 a tecnologia amadureceu e estreou em feira industrial[^14]. Na época servia só para displays eletroluminescentes; o próprio Suntola não imaginava que 30 anos depois viraria a veia da litografia na escala nanométrica. Em 1999 vendeu a tecnologia à ASM, empresa holandesa de equipamentos. Hoje a ASM detém >55 % do mercado de ALD[^14].

O PanSci explica o princípio com limpidez: «A deposição atômica é uma CVD melhorada; divide o processo em dois passos. Primeiro injeta-se o primeiro precursor, que reage com a superfície do substrato… quando a superfície satura, injeta-se o segundo precursor, que reage com o precursor já aderido, formando o material alvo e completando a deposição da película.»[^14] Dois precursores alternados, cada ciclo cresce uma monocamada atômica.

Por que isso importa? No nó de 2 nm, o gate do transistor tem apenas alguns átomos de espessura, e o dielétrico do gate deve ter planicidade e controle de espessura atômicos. CVD tradicional não consegue, PVD não consegue, só a ALD consegue «crescer camada a camada». Cada fab avançada da TSMC está cheia de equipamentos ALD da ASM; essa cadeia — equipamento holandês, tecnologia finlandesa, processo taiwanês — é a base física que permite a produção em volume de 2 nm.

> 💡 **Sabia que**: A menor dimensão crítica de 2 nm equivale a ~20 átomos de silício lado a lado. Se cada átomo de silício fosse uma bola de pingue-pongue, o transistor de 2 nm teria o comprimento de uma mesa de tênis de mesa. O trabalho da ALD é «bola a bola» revestir essa mesa com material isolante.

A ASM não é listada em Taiwan, mas quase todos os seus maiores clientes de equipamentos ALD de 12 polegadas estão em Taiwan. **Essa cadeia de suprimento é invisível mas insubstituível**; se a TSMC travar no 2 nm, não há segunda fonte de ALD no mundo que possa tapar o buraco.

## Depois do 2 nm vem o quântico

A escala angstrom (1 nm = 10 Å) ainda não tem final escrito pela TSMC.

No quarto trimestre de 2025, a TSMC iniciou produção em volume de 2 nm na Fab 22 em Kaohsiung; a Fab 20 em Baoshan, Hsinchu, seguiu em seguida[^2]. O 2 nm estreia a arquitetura GAA (Gate-All-Around) nanosheet, abandonando o FinFET usado do 22 nm ao 3 nm[^16]. 2 nm ≈ 20 átomos de silício de largura, já beira o limite teórico da física. Primeiros clientes incluem a série A da Apple e chips de IA da NVIDIA; capacidade de 2 nm expandirá trimestre a trimestre[^3].

Próxima estação: 1,6 nm (A16), prevista para volume no quarto trimestre de 2026, estreia «rede de alimentação pelo verso» (Backside Power Delivery Network), batizada pela TSMC de Super Power Rail[^16]. Mesmo consumo: +10 % velocidade vs N2P; mesmo desempenho: -15–20 % consumo.

Mas depois do 1,6 nm? O custo explode à medida que o nó desce. P&D de 28 nm ~US$ 1 bi; 7 nm saltou para ~3 bi; 3 nm disparou para ~10 bi; 2 nm estimado >20 bi[^4]. A curva exponencial da Lei de Moore transforma o custo de P&D da cauda em números astronômicos; é o que o PanSci chama de «a complexidade e o investimento no desenvolvimento de processos avançados aumentam exponencialmente, e investimento e retorno muitas vezes não são proporcionais»[^12].

Por isso a indústria mudou a estratégia: expansão horizontal virou empilhamento vertical (encapsulamento 3D), silício virou novos materiais (GaN/SiC), e no fim pode trocar para física de computação totalmente diferente, como computação quântica.

A linha do tempo da Academia Sinica vai assim. Outubro de 2023: computador quântico supercondutor de 5 qubits concluído. 29 de janeiro de 2024: presidente Tsai Ing-wen (蔡英文) visita; computador quântico entra em linha[^6]. O PanSci registrou: «Em janeiro de 2024, o primeiro computador quântico autodesenvolvido de Taiwan nasceu oficialmente na Academia Sinica; embora possua apenas 5 qubits, abriu o prólogo da presença de Taiwan no palco global da computação quântica.»[^17]

Dezembro de 2025: chip supercondutor de 20 qubits concluído. Janeiro de 2026: anúncio de entrada em linha[^6]. Tempo de coerência (coherence time T1) saltou dos 15–30 µs da era de 5 qubits para 530 µs nos 20 qubits. Tempo de coerência é o tempo que o qubit mantém a superposição; quanto maior, «menos ruído, computação mais complexa possível».

A equipe nacional quântica interministerial formou-se em março de 2022; orçamento de 5 anos: NT$ 8 bi; 17 equipes de pesquisa[^18]. O Ministério da Economia criou em abril de 2026 o «Escritório de Promoção da Tecnologia da Indústria Quântica», fazendo a ponte entre P&D acadêmico e indústria.

O ITRI faz algo especialmente interessante: usa o processo de 28 nm da TSMC para fazer «chips de controle de qubits». A CNA de março de 2024 citou o ITRI: «Aproveitando o design de IC de micro-ondas em que Taiwan é forte e o processo de 28 nm da TSMC, criamos chips e módulos de controle a baixa temperatura (4 K, ou seja, -269 °C)… encolhemos o instrumento de controle para dentro do refrigerador de diluição, reduzindo volume total em 40 %, simplificando cabos, com vantagem de comercialização… consumo do módulo 50 % abaixo dos dados publicados por grandes fabricantes internacionais.»[^19]

> 📝 **Nota do curador**: A estratégia quântica de Taiwan **não está em fabricar qubits** (esse é território de IBM, Google, Academia Sinica), mas em miniaturizar o circuito de controle até caber dentro do refrigerador de diluição. De 5 a 20 qubits, o chip de controle do ITRI evoluiu de suporte a 1 qubit, 2 qubits, 8 qubits; prevê-se 20 qubits em 2026-2027. **A próxima estação do escudo de silício é ser a fundição da era quântica, não disputar o trono quântico**. Mas esse posto de fundição ainda não tem ninguém a cravar o prego «entregue a Taiwan».

## Três rotas quânticas: supercondutor, íons aprisionados, topológico

Computador quântico não tem rota única.

**Qubits supercondutores** (superconducting qubits) — rota de IBM, Google, Academia Sinica. Vantagem: processo compatível com fabs de semicondutores existentes (aí está a chance de Taiwan), velocidade de controle alta. Desvantagem: precisa de refrigerador de diluição a ~15 mK (≈ -273 °C), ruído alto. Google em 2019 usou 53 qubits «Sycamore» e declarou supremacia quântica: 200 segundos para tarefa que supercomputador clássico levaria 10 mil anos[^20].

**Qubits de íons aprisionados** (trapped ion qubits) — rota de laser controlando átomos individuais. O PanSci resumiu a diferença: «A tecnologia de íons aprisionados usa laser para controlar átomos individuais e computar; tem precisão e estabilidade extremas, mas enfrenta complexidade técnica e custo.»[^17] Representantes: IonQ, Quantinuum. Vantagem: alta fidelidade, estabilidade, não precisa de frio extremo. Desvantagem: controle lento, difícil escalar para muitos qubits.

**Qubits topológicos** (topological qubits) — aposta de próxima geração da Microsoft. Fevereiro de 2025: Microsoft anuncia processador quântico topológico Majorana 1, alegando escalabilidade até 1 milhão de qubits[^15]. Em teoria, qubits topológicos têm imunidade a ruído fortíssima, mas é a rota menos madura; a existência da partícula Majorana ainda está em verificação na física.

As três rotas têm seus riscos. A estratégia de Taiwan é **«garantir que, vença qual rota vencer, Taiwan tenha um nó de cadeia de suprimento»**, sem apostar tudo numa única rota. Rota supercondutora apoia-se no chip de controle de 28 nm da TSMC. Rota de íons aprisionados precisa de óptica de precisão, que comunica com a indústria optoeletrônica de Taiwan; rota topológica, se vingar, vai precisar de filmes de pureza extrema — de volta ao território da ALD.

## Fabs no exterior: expansão ou diluição?

A globalização da TSMC acelerou nos anos 2020.

**EUA, Arizona, Fab 21**: Fase 1 (4 nm) volume no 1º semestre de 2025; Fase 2 (3 nm/2 nm) 2º semestre de 2027; Fase 3 (2 nm/A16) antes de 2030. Capex total ~US$ 165 bi[^21]. Mas um «porém» crucial: **todo encapsulamento CoWoS de chips de IA continua só em Taiwan**; wafers saídos de Arizona voltam a Taiwan para finalizar o encapsulamento[^13].

**Japão, Kumamoto, Fab 1**: 22–28 nm, volume em 2024, parceria com Sony e Toyota. Fab 2 original (12–16 nm) progresso incerto; parte dos recursos realocada para Arizona.

**Alemanha, Dresden, ESMC** (TSMC 40 %): 28/22/16/12 nm para automotivo; 2º semestre de 2025 equipamentos entram; volume em 2027; capacidade ~40 mil wafers/mês[^22].

Todas as fabs no exterior compartilham um «princípio N-2» — **ficam para sempre duas gerações atrás de Taiwan**. Quando Taiwan faz 2 nm, o mais avançado no exterior é 4 nm; quando Taiwan empurra 1,6 nm, o exterior chega a 3 nm. Essa linha vermelha está escrita na ética de engenharia geopolítica, não em cláusulas contratuais.

> ⚠️ **Ponto de controvérsia**: Fabs no exterior expandem ou diluem o escudo de silício? Defensores dizem: tecnologia fica em Taiwan, capacidade sai fora = transforma o escudo de «uma ilha» em «uma cadeia», desrisco mais completo. Críticos dizem: cada fab exportada leva engenheiros treinados, SOPs de volume, relacionamento com clientes. Daqui a 30 anos, quando Arizona ou Kumamoto acumularem até a fronteira N-2, aqueles «dois gerações mais avançados» podem ser lentamente comprimidos. O princípio N-2 hoje é promessa da TSMC, não lei da física.

Paralelo às fabs no exterior corre a «fuga de talentos de design». Design de chips de IA não precisa só de Taiwan; Vale do Silício, Tel Aviv, Nova Déli têm seus centros. O ecossistema de fundição da TSMC está mudando de «engenheiros de toda a ilha» para «engenheiros globais + fabricação na ilha» híbrido.

## Custo ambiental: o outro lado do escudo de silício

O escudo de silício tem peso.

Água é o mais visível. Os três parques científicos da TSMC consomem >208 mil toneladas/dia; ONGs ambientais estimam que, após novas fabs entrarem em operação pós-2025, o consumo pode quadruplicar para 770 mil t/dia[^23]. Resposta da TSMC: cada gota usada em média 3,5×, taxa de reciclagem 87 % (novas fabs meta 90 %); 2024 economia adicional de 5,54 milhões m³.

Energia é o segundo tema. Uma fab de 3 nm consome ~2,1 TWh/ano, equivalente a 20 mil lares taiwaneses/ano. 2 nm e 1,6 nm vão consumir ainda mais. TSMC compromete-se RE100 (100 % renovável) até 2050, mas a oferta de energia verde de Taiwan não acompanha a velocidade de expansão dos semicondutores; essa timeline vive sob teste de estresse.

Horas de trabalho é o terceiro tema. Horas dos engenheiros de Hsinchu, preços de imóveis, taxa de natalidade — tema para outro artigo. Mas, como a ciência dos materiais, é problema físico: tempo e energia humanos também têm «lacuna de banda»; acima do limiar, colapsam.

A existência do escudo de silício depende, além da tecnologia da TSMC, política do governo, oportunidade geopolítica, também dos 170 mil engenheiros dos parques científicos, de toda a cadeia de suprimento, e de cada residente de Taiwan que partilha o custo de eletricidade e água.

## Ecossistema completo: Taiwan não é só TSMC

A competitividade da indústria taiwanesa de semicondutores vem do aglomerado inteiro, não de soldado único da TSMC. No design: MediaTek (top 3 global), Novatek, Realtek, Himax; na fundição além da TSMC: UMC, VIS, PSMC; no encapsulamento e teste: ASE (nº 1 global), SPIL, KYEC no back-end. Terceira geração: GlobalWafers (crescimento de cristal SiC), Pai Cheng, PTS (GaN), GCS; memória: Nanya, Winbond; equipamentos e materiais: Gudeng, Sinyun, Chung Yue, esses heróis invisíveis a cobrir posições.

Um chip do design ao fim pode dar uma volta em Taiwan e ficar pronto, sem transporte transfronteiriço. Essa «vantagem de cadeia curta» foi vista pelo mundo inteiro durante a COVID; desde então entra em todo white paper de cadeia de suprimento das big techs.

Parque Científico de Hsinchu criado em 1980; 40+ anos acumularam 500+ empresas, 170 mil profissionais. Engenheiro pode ficar 5 anos na TSMC, pular para MediaTek desenhar chips, depois ir para ASE fazer encapsulamento — essa circulação interempresas difunde eficientemente o nível técnico de toda a indústria.

Concorrentes? Samsung Coreia, estratégia vertical 2022-2026 investe US$ 230 bi, mas rendimento de processo avançado ainda atrás da TSMC[^4]. Intel travou anos no 10 nm; 2021 lançou IDM 2.0 querendo fazer design e fundição; mas em 2025 o negócio de fundição ainda não ganhou cliente de peso — o mais irônico: parte dos chips high-end da própria Intel passou a ser fabricada pela TSMC.

## O posto quântico continua vago

Carregador do Nokia 3310: 4,56 W. Carregador rápido de 2025: 240 W. 52×. O silício levou 30 anos; o GaN completou em 5.

No laboratório quântico da Academia Sinica, o chip supercondutor precisa operar a 15 mK (≈ -273 °C). O ITRI, com o processo de 28 nm da TSMC, fez o chip de controle que comprimiu o «volume do instrumento de controle» necessário a esse frio extremo de um prédio inteiro para uma caixa pequena. A capacidade de semicondutores de Taiwan está, pouco a pouco, empurrando a fronteira do computador quântico.

Mas onde fica essa fronteira, ninguém diz com clareza. Tempo de coerência de 15 µs a 530 µs — ainda é começo. Os 19 engenheiros despachados pela RCA em 1973 talvez também não soubessem que seu 1973 cristalizaria no 2 nm de 2025.

O escudo de silício montou-se em 50 anos de experiência industrial e domina o presente. Nos próximos 50 anos, o posto de fundição da era quântica, Taiwan ainda não o conquistou.

> ✦ O Blackwell de Jensen Huang roda inferência na nuvem acima da sua cabeça; o wafer SiC da GlobalWafers aquece no poste de carregamento do VE à sua porta; a primeira película ALD de Suntola em 1974 na Finlândia sela o dielétrico do gate no chip do seu telemóvel — os semicondutores sempre foram uma genealogia inteira de materiais subindo degrau a degrau pela física da lacuna de banda durante 50 anos, não pertencem só à TSMC. O próximo degrau onde está, a física nos dirá; se subimos ou não, é escolha de Taiwan.

---

**Leitura complementar**:

- [Tópicos da indústria de Taiwan](/industry/) — Desenha a estrutura industrial com estatísticas oficiais: exportação e PIB 70 anos, parques científicos, fábricas por condado, top 10 de valor de mercado histórico, mais seis debates públicos com argumentos de cada lado
- [Mapa da cadeia de suprimento](/industry/supply-chain-map/) — Semicondutores, servidores de IA, tungstênio: três cadeias, elo a elo, ver quais empresas estão em Taiwan, qual elo depende do exterior
- [Empresa de Taiwan: TSMC](/pt/economy/tsmc) — Governança corporativa, estrutura financeira, escala de capex do escudo de silício
- [Empresa de Taiwan: MediaTek](/pt/economy/mediatek) — Como o líder de design de IC se posiciona em chips móveis e IA de borda
- [Empresa de Taiwan: ASE](/pt/economy/taiwan-enterprise-ase-semiconductor) — Encapsulamento e teste nº 1 global, ecossistema de back-end além do CoWoS
- [Os criadores de montanhas: a aposta do século](/pt/art/mountain-makers-tsmc-documentary) — Documentário 2025 de Hsiao Ju-chen, 5 anos, 80+ entrevistas a veteranos de semicondutores; 2026 entra em Purdue, Wisconsin, Michigan — três polos de investimento do CHIPS Act
- [Wu Ta-you](/pt/people/tai-yu-wu) — Enquanto Taiwan apostava nos semicondutores nos anos 80, como presidente da Academia Sinica defendia a ciência básica, fundando o sistema de pesquisa de Taiwan
- [Huang Chung-jen](/pt/people/frank-huang-psmc) — Fundador da Mosel/Vitelic, a rota de Taiwan na DRAM: construir fab própria sobre licença alheia; market share de 23,2 % caiu a 6,3 %, o pedaço menos contado desta indústria
- [Indústria de robótica de Taiwan](/pt/technology/taiwan-robotics-industry) — Ilha nº 1 em semicondutores, por que na era robótica é aluna de recuperação? Da inauguração do NCAIR vê-se a fratura industrial
- [Bolsa e mercado de capitais de Taiwan](/pt/economy/taiwan-stock-market) — Como o ecossistema de cadeia de suprimento que sustenta o 6º maior mercado global em 2026 se reflete no mercado de capitais
- [Cadeia de suprimento de tungstênio de Taiwan](/pt/technology/taiwan-tungsten-supply-chain) — Hexafluoreto de tungstênio preenche contatos e word-lines de 3D NAND; Taiwan não tem mina de tungstênio mas sobe ao midstream via reciclagem e refino
- [Escola de IA de Taiwan](/pt/technology/taiwan-ai-academy) — Como os 10 mil engenheiros de IA formados em 8 anos pela AIA voltam à cadeia ICT de semicondutores, reforçando o lado software de Taiwan
- [Computex: três grandes feiras internacionais, duas recolhidas, a que sobrou cresce em Taipei](/pt/technology/computex) — CoWoS e processo avançado da TSMC, todo fim de maio nessa feira de 45 anos apertam a mão dos gigantes globais de IA
- [Parques científicos de Taiwan](/pt/technology/science-park-development) — Hsinchu, Tainan, Taichung: três parques, corpo físico do aglomerado de semicondutores, também centro geográfico do escudo de silício

## Fontes das imagens

Este artigo usa 3 imagens sob licença CC / PD, em cache em `public/article-images/technology/` para evitar hotlink:

- [Silicon vs GaN 30W USB-C chargers](https://commons.wikimedia.org/wiki/File:Silicon_vs_GaN_30W_USB-C_chargers.jpg) — Foto: 4300streetcar, 2025-12-25, CC BY 4.0, Wikimedia Commons file Silicon_vs_GaN_30W_USB-C_chargers.jpg
- [TSMC Fab 5 Hsinchu](https://commons.wikimedia.org/wiki/File:TSMC_Fab5.JPG) — Foto: Peellden, 2010-09-05, CC BY-SA 3.0, Wikimedia Commons file TSMC_Fab5.JPG
- [Silicon wafers museum display](https://commons.wikimedia.org/wiki/File:Silicon_wafers.jpg) — Foto: ArticCynda, 2017-10-23, CC0 domínio público, Wikimedia Commons file Silicon_wafers.jpg

## Referências

[^1]: [Semiwiki — How Philips Saved TSMC](https://semiwiki.com/semiconductor-history/307560-how-philips-saved-tsmc/) — Participação da Philips apurada pelo Semiwiki em 27,6 %; acionista-chave na fundação da TSMC, trouxe tecnologia e primeiros clientes

[^2]: [Focus Taiwan 2025/12/30 — TSMC 2nm production](https://focustaiwan.tw/business/202512300012) — Produção em volume de 2 nm da TSMC tem como fab principal a Fab 22 em Kaohsiung; Fab 20 em Baoshan, Hsinchu, segue depois

[^3]: [DigiTimes — TSMC 2 nm volume production officially starts](https://www.bnext.com.tw/article/89663/tsmc-2nm-volume-production) — TSMC inicia volume de 2 nm no 4º tri de 2025; capacidade mensal concreta é estimativa externa, não divulgada oficialmente

[^4]: [TechNews — TSMC 3 nm utilization hits 100 %](https://technews.tw/2025/05/26/tsmcs-2nm-process-is-expected-to-reach-full-capacity-in-four-seasons/) — Rendimento de processo avançado da TSMC estimado superior a concorrentes; números concretos são estimativas de terceiros, não oficiais

[^5]: [CommonWealth Magazine — Li Kuo-ting and the birth of TSMC](https://www.cw.com.tw/article/5095492) — 1987 Morris Chang funda TSMC, estabelece modelo «fundição pura», base da divisão global da indústria de semicondutores; contexto da transferência RCA de 1973, US$ 4,5 milhões

[^6]: [Academia Sinica — 20-qubit superconducting quantum chip announcement](https://www.sinica.edu.tw/News_Content/56/2375) — Academia Sinica conclui chip supercondutor de 20 qubits em dezembro de 2025, entra em linha em 29 de janeiro de 2026; tempo de coerência T1 atinge 530 µs

[^7]: [PanSci — Nitreto de gálio: 1/3 do tempo, mesma potência](https://pansci.asia/archives/362660) — Autor: equipe PanSci. Lacuna de GaN 3,4 eV, tensão de ruptura 10×, frequência 1 MHz vs silício 100 kHz; SiC 1000 V aplicação em carregamento rápido de VE. Content Curation Partner per MOU 2026-05-05

[^8]: [TrendForce — TSMC exits GaN foundry by July 2027](https://www.trendforce.com/news/2025/08/22/news-tsmc-reportedly-exits-gan-foundry-business-by-2027/) — TSMC sai da fundição de GaN em julho de 2027; tecnologia licenciada à VIS e GlobalFoundries; PTS (3163) envia ~500 wafers/mês de 6 polegadas GaN

[^9]: [Fugu Direct — GlobalWafers SiC 8-inch wafer volume 2025](https://www.fugle.tw/news/article/1234567) — GlobalWafers 6 polegadas SiC capacidade mensal 20 mil no fim de 2024; fornos próprios 3 → 20; rendimento >50 %; estratégia «grupo IDM virtual» de Doris Hsu

[^10]: [TechNews — SiC supply chain under pressure](https://technews.tw/2025/11/sic-market-oversupply) — 2025 fábricas chinesas de SiC expandem, utilização de 6/8 polegadas da GlobalWafers cai abaixo de 50 %; rumor: NVIDIA Rubin GPU adota SiC interposer + data center 800 V CC volume 2027

[^11]: [SemiAnalysis — NVIDIA Blackwell CoWoS-L Analysis](https://www.semianalysis.com/p/nvidia-blackwell-b200-cowos-l) — Blackwell B200 usa CoWoS-L integrando 2 GPUs Blackwell + 1 CPU Grace; treino IA 4× H100; NVIDIA reserva capacidade CoWoS da TSMC até 2027

[^12]: [PanSci — Empilhamento 3D: como o encapsulamento avançado faz chips entrarem no túnel de Hsuehshan](https://pansci.asia/archives/367588) — Autor: equipe PanSci. Princípio CoWoS / SoIC / TSV; metáfora Provincial 9 vs túnel Hsuehshan; desafios de rendimento e dissipação do encapsulamento 3D. Content Curation Partner per MOU 2026-05-05

[^13]: [DigiTimes — TSMC CoWoS capacity expansion plan](https://www.digitimes.com.tw/iot/article.asp?cat=158&id=0000696823_X1D7L8XB6JNL2Y8XLPZJK) — Capacidade mensal CoWoS: fim 2024 35 mil, fim 2025 75 mil, meta 2028 150 mil; NVIDIA reserva até 2027; wafers de Arizona voltam a Taiwan para encapsulamento

[^14]: [PanSci — ALD deposição atômica: 50 anos de revolução em películas finas](https://pansci.asia/archives/377669) — Autor: equipe PanSci. ALD 1974 Suntola na Instrumentarium Oy, 1977 madura, 1999 vendida à ASM; ASM 55 % market share; princípio duplo precursor CVD. Content Curation Partner per MOU 2026-05-05

[^15]: [TechNews — Microsoft Majorana 1 topological quantum processor announced](https://technews.tw/2025/02/20/microsoft-majorana-1-topological-qubit/) — Microsoft fevereiro de 2025 anuncia 1º processador quântico topológico Majorana 1, alega escalabilidade a 1 milhão de qubits

[^16]: [TSMC official — A16 (1.6nm) process announcement](https://www.tsmc.com/english/dedicatedFoundry/technology/logic/l_2nm) — 2 nm estreia GAA nanosheet (abandona FinFET); A16 estreia backside power delivery (Super Power Rail), volume 4º tri 2026, mesmo consumo +10 % vs N2P, mesmo desempenho -15–20 % consumo

[^17]: [PanSci — Tecnologia quântica de Taiwan: de 5 qubits à era de volume](https://pansci.asia/archives/377923) — Autor: equipe PanSci. Academia Sinica janeiro 2024 nasce computador quântico de 5 qubits; supercondutor vs íons aprisionados vs topológico três rotas; Google Sycamore 53 qubits 200 s resolve problema de 10 mil anos. Content Curation Partner per MOU 2026-05-05

[^18]: [iThome — Equipe nacional quântica 5 anos NT$ 8 bi](https://www.ithome.com.tw/news/151234) — Março 2022 equipe nacional quântica interministerial forma-se; 5 anos NT$ 8 bi; 17 equipes; abril 2026 Ministério da Economia cria Escritório de Promoção da Tecnologia da Indústria Quântica

[^19]: [CNA 2024/03/06 — ITRI quantum control chip](https://www.cna.com.tw/news/ait/202403060123.aspx) — ITRI usa processo 28 nm da TSMC para chip de controle quântico a 4 K (-269 °C); volume -40 %, consumo 50 % abaixo de grandes fabricantes internacionais; roteiro 2024 1 qubit → 2026-2027 20 qubits

[^20]: [TechNews — Google Sycamore quantum supremacy](https://technews.tw/2019/10/24/google-sycamore-quantum-supremacy/) — 2019 Google 53 qubits Sycamore atinge supremacia quântica; 200 s completa tarefa que supercomputador clássico precisa 10 mil anos

[^21]: [SemiAnalysis — TSMC Arizona Fab 21 investment plan](https://www.semianalysis.com/p/tsmc-arizona-1650b-capex) — TSMC Arizona Fab 21 três fases US$ 165 bi; Fase 1 (4 nm) 2025 volume, Fase 2 (3 nm/2 nm) 2027, Fase 3 (2 nm/A16) antes 2030; princípio N-2 no exterior sempre duas gerações atrás de Taiwan

[^22]: [DigiTimes — ESMC Dresden 2027 volume](https://www.digitimes.com.tw/news/esmc-dresden-2027) — TSMC ESMC 40 %; Dresden 28/22/16/12 nm automotivo; 2º sem 2025 equipamentos, 2027 volume, capacidade ~40 mil wafers/mês

[^23]: [CommonWealth Magazine — TSMC water consumption](https://www.cw.com.tw/article/5128456) — Três parques científicos TSMC consomem >208 mil t/dia; ONGs estimam pós-2025 novas fabs → 770 mil t/dia; TSMC responde: cada gota 3,5×, reciclagem 87 % (novas 90 %), 2024 economia 5,54 milhões m³

[^asml-philips]: [Wikipedia — ASML Holding](https://en.wikipedia.org/wiki/ASML_Holding) — ASML 1º abril 1984 nasce de joint venture 50/50 Philips (Holanda) + ASM International (ASMI); 1995 IPO ASMI sai; hoje ASML único fornecedor mundial de scanner EUV

[^lin-bio]: [Wikipedia — Burn-Jeng Lin](https://en.wikipedia.org/wiki/Burn-Jeng_Lin) — Lin Ben-jian nascido 1942 no Vietnã, 1970s IBM Watson lithography, 2000 volta a Taiwan como VP P&D TSMC; 2008 SPIE Frits Zernike Award; cognominado «pai da litografia por imersão»

[^157nm-fail]: [Electronics Weekly — Immersion litho sidelines 157nm](https://www.electronicsweekly.com/news/research-news/process-rd/immersion-litho-sidelines-157nm-2005-05/) — Rota 157 nm falha por birrefringência CaF₂, absorção forte de filmes a 157 nm, integração de processo difícil; 2002-2003 substituída por 193 nm imersão; aposta Intel + Nikon perdida

[^immersion-litho]: [Wikipedia — Immersion lithography](https://en.wikipedia.org/wiki/Immersion_lithography) — Lin Ben-jian 2002 SPIE propõe 193 nm imersão; índice água 1,44 faz 193 nm equivaler ~134 nm; 2007 ASML volume, de 65 nm até 7 nm, estende Lei de Moore seis gerações

[^cw-lin-interview]: [CommonWealth Magazine — Interview with the Father of Immersion Lithography Who Put TSMC on the Map](https://english.cw.com.tw/article/article.action?id=3720) — 2024-06-18 entrevista Lin Ben-jian — «Nikon não ousou fazer imersão» contexto histórico; Lin volta à TSMC 2000 impulsiona adoção imersão, sangue da colaboração TSMC-ASML 30 anos
