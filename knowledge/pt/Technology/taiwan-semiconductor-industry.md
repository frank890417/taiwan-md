---
title: 'Indústria de semicondutores: da transferência de tecnologia da RCA ao nitreto de gálio e encapsulamento quântico — 50 anos de revolução de materiais'
description: 'A "montanha sagrada" de Taiwan domina os processos avançados globais graças à fabricação por encomenda, mas o nitreto de gálio nos carregadores rápidos, o CoWoS sob chips de IA e os refrigeradores de diluição acima dos qubits mostram que o campo de batalha da ciência dos materiais para os próximos 50 anos apenas começou a se desenhar.'
date: 2026-03-17
category: 'Technology'
tags:
  [
    'Semicondutores',
    'TSMC',
    'TSMC',
    'Nitreto de gálio',
    'Encapsulamento 3D',
    'CoWoS',
    'Computador quântico',
    'Processos avançados',
    'Escudo de silício',
    'Ciência dos materiais',
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
sourceCommitSha: '1ec0df23b'
sourceContentHash: 'sha256:8647f4437b5dfe36'
sourceBodyHash: 'sha256:d7402441fbb7f358'
translatedAt: '2026-11-02T08:40:53.402588+00:00'
---

# Indústria de semicondutores: da transferência de tecnologia da RCA ao nitreto de gálio e empacotamento quântico — 50 anos de revolução dos materiais

![Duas cabeças de carregamento rápido USB-C de 30 W com mesma potência lado a lado, o produto de silício à esquerda é visivelmente maior, o de nitreto de gálio à direita encolheu quase pela metade, refletindo como a ciência dos materiais comprimiu a densidade de energia na palma da mão](/article-images/technology/silicon-vs-gan-charger-2025.webp)
_Comparação de volume de carregadores USB-C Si vs GaN de mesma potência. Foto: 4300streetcar, 2025-12-25. [Licença via Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Silicon_vs_GaN_30W_USB-C_chargers.jpg)._

> **Visão geral em 30 segundos:** A TSMC iniciou a produção em massa de 2 nm no quarto trimestre de 2025 na Fab 22 em Kaohsiung, liderando o mundo em 2-3 gerações[^2]. Mas a história não acontece apenas nos transistores cada vez menores: o carregador rápido na sua mochila contém nitreto de gálio (GaN), a GlobalWafers fabrica wafers de carbeto de silício (SiC) de 8 polegadas em Chungli, as GPUs Blackwell da NVIDIA dependem totalmente do empacotamento CoWoS da TSMC para chegar aos centros de dados. Desde 1973, quando o ITRI gastou 4,5 milhões de dólares para comprar tecnologia da RCA[^5], até 2026, quando o chip quântico supercondutor de 20 qubits da Academia Sinica foi conectado à rede[^6], Taiwan percorreu um longo rio da ciência dos materiais, da física de lacuna de banda à deposição de camada atômica até qubits topológicos. A «montanha sagrada que protege o país» baseia-se na experiência industrial dos anos 1950, mas a posição de foundry na era quântica, Taiwan ainda não conquistou.

Numa tarde de 1985, o ministro sem pasta Li Kuo-ting procurou Morris Chang, que acabara de regressar a Taiwan para assumir a presidência do ITRI, no Yuan Executivo. Li foi direto ao ponto: «Queremos criar uma empresa de fabricação de circuitos integrados de ultragrande escala, e você vai comandá-la.»

Chang hesitou por um momento: achava que viera apenas para ser diretor do instituto, mas duas semanas depois já estava sendo arrastado para fundar uma empresa com um modelo de negócios que ninguém jamais tinha tentado.

Essa conversa mudou o mundo, mas 40 anos depois, olhando para trás, o «mundo» é muito mais espesso do que se imaginava naquela tarde. Ele inclui o carregador rápido de 65 W do tamanho de duas falanges ao lado do seu celular, inclui cada GPU Blackwell que a NVIDIA devora nos centros de dados, e também inclui os qubits no laboratório da Academia Sinica que só acordam quando a temperatura desce para perto do zero absoluto.

## A aposta de fundição de 1987

![Exterior da fábrica Fab 5 da TSMC no Parque Científico de Hsinchu, edifício industrial de vários andares ligado à Estrada Guangfu, uma das fábricas representativas do período de expansão da TSMC nos anos 1990](/article-images/technology/tsmc-fab5-hsinchu-2010.webp)
_Fábrica Fab 5 da TSMC no Parque Científico de Hsinchu, 2010. Foto: Peellden. [Licença via Wikimedia Commons](https://commons.wikimedia.org/wiki/File:TSMC_Fab5.JPG)._

A história começa antes: em 1973, o ITRI gastou 4,5 milhões de dólares para comprar a tecnologia de circuitos integrados da empresa americana RCA, enviando 19 engenheiros para treinamento nos EUA[^5]. Ninguém imaginava na época que essa "mensalidade escolar" se tornaria a primeira pedra angular do reino dos semicondutores de Taiwan. Em 1980, o ITRI transferiu tecnologia para fundar a UMC, e Taiwan ganhou sua primeira empresa de semicondutores. Mas K.T. Li não ficou satisfeito: a UMC era pequena demais, sua tecnologia não alcançava o padrão internacional, e Taiwan precisava de um avanço maior.

Em 21 de fevereiro de 1987, Morris Chang fundou a Taiwan Semiconductor Manufacturing Company no Parque Científico de Hsinchu, criando um modelo de negócios inédito: **a fundição pura**.

A ideia soava louca na época: todas as empresas de semicondutores do mundo eram verticalmente integradas, do design à manufatura numa única cadeia; como era possível fazer apenas a manufatura, sem design? Os clientes confiariam seus layouts mais confidenciais a você?

A lógica de Morris Chang era simples: a indústria de semicondutores estava ficando cada vez mais complexa, e design e manufatura são duas profissões completamente diferentes. Em vez de fazer tudo e não se destacar em nada, melhor focar em fazer uma coisa bem: tornar a manufatura de chips a melhor do mundo.

A estrutura acionária inicial da TSMC era engenhosa: o governo investiu 48,3%, investidores privados 24,2%, e a Philips holandesa detinha 27,6%[^1]. A participação da Philips foi crucial. Na época, a indústria de semicondutores era monopolizada por EUA e Japão, e a Europa precisava urgentemente de um fornecedor alternativo. A Philips não apenas investiu, mas também confiou seus próprios pedidos de chips à TSMC, tornando-se o primeiro cliente importante.

O modelo de fundição desencadeou uma grande divisão do trabalho na indústria de semicondutores: empresas de design de IC focadas em projetar chips (Qualcomm, NVIDIA, MediaTek), fundições focadas em manufaturar (TSMC, UMC, GlobalFoundries), e empresas de empacotamento e teste responsáveis pelos processos posteriores (ASE, SPIL). Antes, apenas gigantes como Intel e IBM podiam arcar com os investimentos astronômicos de fábricas de wafers; agora, qualquer startup com uma boa ideia pode projetar chips e entregá-los à TSMC para manufatura.

O núcleo do modelo de fundição é a confiança: os clientes devem acreditar que a TSMC não roubará seus designs, não vazará segredos comerciais, não competirá com eles. A TSMC estabeleceu um conjunto de quatro princípios de "regras de confiança": neutralidade tecnológica (nunca projetar seus próprios chips), igualdade entre clientes (todos desfrutam da mesma tecnologia e serviços), acordos de confidencialidade de mais alto nível, e alocação justa de capacidade. Essas regras vêm sendo executadas há quase 40 anos, sem exceção.

> 📝 **Nota do curador**: Em 1987, em Taiwan, os 19 engenheiros enviados pelo ITRI para a RCA estavam apenas na casa dos 40 anos. Eles aprenderam os processos de silício americanos dos anos 1960; ninguém imaginava que, 30 anos depois, se tornariam os clientes-mestres da tecnologia de empacotamento do mundo inteiro. E a decisão da TSMC de não projetar seus próprios chips — essa cláusula de "castração voluntária" — acabou se tornando o vínculo do qual Jensen Huang, Tim Cook e Lisa Su não conseguem se desvencilhar. A grandeza do modelo de fundição não está no que ele faz, mas no que ele **escolhe não fazer**. Remontando mais a fonte: 1947, Bell Labs inventa o transistor; 1958, Texas Instruments e Fairchild criam cada uma o circuito integrado; 1949, o governo nacionalista se muda para Taiwan trazendo um lote de tecnocratas formados em ciências e engenharia (o futuro núcleo do ITRI) — aqueles 4,5 milhões de dólares da RCA foram o bastão de revezamento, não o ponto de partida.

## Burn J. Lin e a ASML: a aposta dos dois pequenos players na litografia por imersão

A fabricação por encomenda não é assunto só da TSMC; o leitor [@malathrone_21k_running](https://www.threads.com/@malathrone_21k_running) completou esta linha histórica crucial nos comentários: com a mesma raiz na Philips, além da TSMC, existe a ASML — a empresa de equipamentos de litografia que se separou da Philips holandesa em 1984 e que hoje é a única fornecedora global de máquinas EUV (extreme ultraviolet). Há 30 anos, ambas as empresas eram pequenos players que os gigantes da indústria desprezavam[^asml-philips].

A chave da história é um engenheiro taiwanês chamado Burn J. Lin. Desde 1992, ele trabalhava com tecnologia de litografia no IBM Watson Research Center; em 2000, retornou a Taiwan para ingressar na TSMC como diretor de P&D[^lin-bio]. Naquela época, a disputa sobre o próximo passo das máquinas de litografia girava em torno do ultravioleta profundo de 157 nm; Nikon e Intel apostavam nessa rota, mas o 157 nm enfrentou uma série de problemas: as lentes de fluoreto de cálcio apresentavam birrefringência, as películas finas absorviam demais nesse comprimento de onda e a integração do processo era difícil[^157nm-fail].

Em 2002, na conferência óptica da SPIE, Burn J. Lin apresentou uma ideia maluca: «manter a fonte de 193 nm, mas injetar água entre a lente e o wafer». O índice de refração da água é 1,44; a luz de 193 nm na água equivale a uma resolução de cerca de 134 nm — mais fina que a de 157 nm — e sem precisar trocar a fonte nem as lentes[^immersion-litho].

A Nikon não acreditou e continuou apostando no 157 nm. A ASML topou a aposta — ela também era uma pequena player, assim como a TSMC, em busca de uma alavanca física para virar o jogo. Em 2003, a ASML começou a desenvolver máquinas de litografia por imersão de 193 nm (193i); em 2007, foi a primeira a colocá-las em produção em volume, sustentando **seis gerações** de nós de processo, desde 65 nm até a chegada do EUV como sucessor[^immersion-litho][^cw-lin-interview].

«A Nikon, com medo do calor, não ousou fazer imersão; a ASML e nós tivemos que tocar o projeto nós mesmos», essa rota tecnológica derrubou a Nikon do trono das máquinas de litografia[^cw-lin-interview]. Trinta anos atrás, dois pequenos players cada um fez sua aposta; hoje, uma é a única fabricante global de máquinas EUV, a outra é a única fábrica por encomenda de 2 nm do mundo. As duas sementes que a Philips holandesa plantou estão, no século 21, dividindo o mesmo palco.

## 50 anos de genealogia dos materiais: do silício ao nitreto de gálio ao supercondutor topológico

Para entender o campo de batalha dos semicondutores em 2025, primeiro é preciso entender uma linha física que nunca foi explicada claramente.

O silício (Si) é o ponto de partida desta linha: o seu "gap de energia" (bandgap) é de 1,1 elétron-volt (eV), que é o ingresso mínimo de energia que os eletrões precisam pagar para saltar da banda de condução para a banda de valência. Gap de energia pequeno, chip fácil de fazer, mas há dois tetos: alta tensão causa ruptura, alta frequência causa aquecimento. A PanSci explica este limite de forma clara: "O limite de frequência de operação de semicondutores à base de silício está apenas abaixo de 100k; se exceder 100k, a eficiência de conversão cai drasticamente, havendo ainda sérios problemas de desperdício de energia."[^7]

O nitreto de gálio (GaN) tem gap de energia de 3,4 eV, 3 vezes o do silício. O limite de tensão de ruptura é 10 vezes o do silício. A frequência de operação pode chegar a 1000k, uma ordem de magnitude inteira acima do silício[^7]. Este número físico traduz-se no quotidiano: com a mesma potência, o transformador e a bobina de indutância de nitreto de gálio podem ser muito menores, os requisitos de dissipação de calor também são muito menores, e assim nascem os carregadores rápidos que cabem na palma da mão.

O carboneto de silício (SiC) segue outro caminho: também é de banda larga proibida (gap de energia 3,26 eV), mas suporta melhor altas temperaturas e altas tensões. A PanSci aponta diretamente o seu campo de batalha: "O carboneto de silício possui boa estabilidade em altas temperaturas e altas tensões, especialmente com o aumento da demanda por carregamento rápido de veículos elétricos no futuro, a demanda por carregamento acima de 1000 volts fará com que semicondutores de silício, que só suportam 600 volts, não consigam lidar, prevê-se que assumam componentes-chave nos veículos elétricos."[^7]

> 💡 **Sabia que**: o "gap de energia" dos semicondutores determina quanta tensão aguenta, quão rápido opera e quanto calor gera. Silício 1,1 eV é a base da eletrónica de consumo há 50 anos; nitreto de gálio 3,4 eV sustenta carregadores rápidos de 240 watts para telemóveis; carboneto de silício 3,26 eV entra nos inversores de 800 volts de veículos elétricos; a próxima paragem pode ser semicondutores de diamante a 5,5 eV. Toda a genealogia de materiais é uma escada de "densidade de energia a subir", e a cada degrau que Taiwan sobe tem de negociar com os limites físicos da ciência dos materiais.

A próxima paragem ainda não tem nome: pode ser diamante (C, gap de energia 5,5 eV), óxido de gálio (Ga₂O₃, 4,8 eV), ou entrar num mecanismo físico completamente diferente, como supercondutores topológicos (topological superconductor), que é o caminho do processador quântico Majorana 1 que a Microsoft anunciou em fevereiro de 2025[^15]. A física muda, e toda a cadeia industrial será reescrita.

## O nitreto de gálio dentro do seu carregador rápido

Volte o foco para a sua mochila.

O carregador do Nokia 3310 tinha 4,56 watts; o carregador rápido de 2025 tem 240 watts. Uma diferença de 52 vezes. A PanSci organizou esta linha do tempo: «Atualmente, os carregadores rápidos de nitreto de gálio mais populares têm potência de até 65 watts, uma diferença de 13 vezes; idealmente, o tempo de carregamento também seria reduzido a um décimo terceiro.»[^7] Ainda mais impressionante, a marca chinesa realme lançou no início de 2023 o GT Neo5 com supercarga de 240 watts, levando esse múltiplo para acima de 50.

Esta curva de crescimento, fisicamente, baseia-se na mudança para o nitreto de gálio, enquanto a espessura dos fios de cobre e o volume da bateria estão, na verdade, a encolher. Para aumentar a potência e reduzir o volume, o método mais direto é elevar a frequência de operação, mas «o limite de frequência de operação de semicondutores à base de silício é apenas abaixo de 100k»[^7], este é o «limite do silício» de que fala a PanSci. O nitreto de gálio eleva a frequência de operação para acima de 1 MHz, fazendo com que transformadores e indutores encolham simultaneamente, de modo que o carregador inteiro caiba no bolso.

O problema é: quando o mercado de carregadores rápidos de Taiwan estava prestes a explodir, a TSMC anunciou uma coisa: **sairá da fabricação por encomenda (foundry) de GaN em julho de 2027**[^8].

Por trás desta decisão estão duas pressões: primeiro, as fábricas chinesas de GaN (Hua Hong, Silan Micro, Runic Power, etc.) expandiram massivamente a produção, pressionando o preço da fabricação por encomenda a um nível que a TSMC não quer aceitar. Segundo, o lucro dos chips de IA é realmente demasiado atraente; a TSMC quer converter as fábricas de GaN em linhas de produção de empacotamento avançado (CoWoS). A licença tecnológica foi dada à Vanguard International Semiconductor (VIS) e à GlobalFoundries; o fardo da fabricação por encomenda de GaN em Taiwan passa então para a PSMC (3163) e a Episil (8086), fabricantes que apostaram nisto há dez anos[^8].

> ⚠️ **Ponto de vista controverso**: A saída da TSMC da fabricação por encomenda de GaN tem duas interpretações. Uma corrente considera que é uma escolha racional de «reservar capacidade para a IA», pois o lucro por wafer de 3 nm é mais de 20 vezes superior ao de GaN de 6 polegadas, e a alocação de capacidade naturalmente vai para onde o retorno é maior. A outra corrente questiona: Taiwan abrir mão do GaN equivale a entregar de mão beijada a base da próxima geração da eletrónica de consumo (telemóveis / portáteis / carregadores) às fábricas chinesas; o «escudo» do escudo de silício resume-se apenas à ponta da IA? A diferença entre as duas correntes reside em: você considera que o valor da «montanha sagrada de proteção do país» está no «processo mais avançado insubstituível» ou no «agrupamento completo de toda a cadeia de abastecimento».

Seja a TSMC, a grande fabricante de wafers GlobalWafers, ou as várias grandes fabricantes de semicondutores nacionais e estrangeiras, todas já subiram a bordo deste comboio[^7]. Mas em que carruagem se sentar é outra história.

## Wafers de SiC de 8 polegadas da GlobalWafers

Se o nitreto de gálio é a história do carregamento rápido de smartphones, o carboneto de silício é a história dos veículos elétricos.

A empresa central desta cadeia de SiC em Taiwan é a GlobalWafers, não a TSMC. Em 2024, a capacidade mensal de wafers de SiC de 6 polegadas da GlobalWafers atingiu cerca de 20.000 unidades, com fornos de crescimento de cristais desenvolvidos internamente expandindo de 3 para 20 unidades, e a taxa de rendimento superou 50%[^9]. Em 2025, a produção em massa de wafers de SiC de 8 polegadas começou, sendo a primeira em Taiwan.

A CEO da GlobalWafers, Doris Hsu, sempre fala de forma direta: "A Sino-American Silicon Products forma um 'grupo IDM virtual', mirando a demanda por carboneto de silício nos próximos 5 anos! Estamos avançando rapidamente."[^9] A estratégia é integrar em uma única cadeia o crescimento de cristais (GlobalWafers), a epitaxia (Pong Cheng) e os módulos (Hongyang Semiconductor) sob a empresa-mãe Sino-American Silicon Products.

Mas o SiC não é uma história de crescimento linear: no segundo semestre de 2025, fábricas chinesas de SiC (Sanan Optoelectronics, Tianke Heda, etc.) expandiram a produção agressivamente, levando a um excesso de oferta global, e a taxa de utilização da capacidade de SiC de 6 e 8 polegadas da GlobalWafers caiu temporariamente abaixo de 50%[^10]. Isso adicionou um vale ao roteiro otimista do artigo da PanSci de 2023, que previa que a "demanda de veículos elétricos assumiria".

Os sinais de recuperação vêm da NVIDIA: rumores indicam que a próxima plataforma GPU Rubin da NVIDIA adotará SiC no interposer, combinado com uma arquitetura de centro de dados de 800 volts de alta tensão CC, com produção em massa total prevista para 2027[^10]. Se este rumor se confirmar, a capacidade de SiC de 8 polegadas da GlobalWafers migraria de veículos elétricos para centros de dados de IA, reacendendo toda a história.

> 📝 **Nota do curador**: Nitreto de gálio e carboneto de silício são frequentemente chamados coletivamente de "semicondutores de terceira geração", mas esta classificação tem um significado industrial em Taiwan que vai além do rótulo de "materiais de próxima geração" — ela representa a primeira área onde a indústria de semicondutores de Taiwan pode ter uma cadeia de suprimentos completa **contornando a TSMC**. Crescimento de cristais da GlobalWafers, fabricação da Hanlei, encapsulamento da Winbond, design da Hongjieke: além da montanha sagrada que protege o país, há outra "montanha de terceira geração", muito mais discreta, mas independente, crescendo.

## Jensen Huang e a vinculação ao CoWoS+

Voltemos ao campo de batalha da IA.

A GPU H100 da NVIDIA usa o processo de 4 nm da TSMC, mais a embalagem CoWoS-S integrando memória de alta largura de banda HBM3. A Blackwell B200 atualiza para CoWoS-L, integrando duas GPUs Blackwell mais uma CPU Grace, com velocidade de treinamento de IA 4 vezes mais rápida que a H100[^11]. A próxima geração, Rubin, tem lançamento previsto para 2026.

O núcleo de cada geração de GPU é este "motor duplo" de "processo avançado + embalagem avançada". O processo torna os transistores cada vez menores; a embalagem empilha diferentes dies (crystal) cada vez mais próximos. A PanSci usou a comparação entre a Rodovia Provincial 9 e o Túnel de Xueshan para explicar: "A embalagem tradicional precisa percorrer a sinuosa Rodovia Provincial 9, enquanto a embalagem avançada corta caminho, abrindo o Túnel de Xueshan que conecta os dois lugares, tornando a troca de dados mais conveniente e rápida."[^12]

O núcleo do CoWoS (Chip-on-Wafer-on-Substrate) é o "furo de silício" (through-silicon via, TSV): empilhar diferentes dies juntos, usando minúsculos canais verticais que atravessam o substrato de silício, transformando dois circuitos originalmente separados em conexões tridimensionais. A PanSci descreve de forma direta: "O empilhamento tridimensional permite colocar o chip C sobre o chip A, atravessando o substrato de silício afinado com a tecnologia de furo de silício, conectando os dois circuitos com fios de conexão verticais de ultra-alta densidade, fazendo com que a distância entre eles passe de extremamente longa a extremamente curta."[^12]

Os números de capacidade são ainda mais impressionantes: a capacidade mensal de CoWoS da TSMC era de cerca de 35.000 wafers no final de 2024, com meta de atingir 75.000 wafers no final de 2025, e caminhando para 150.000 wafers em 2028, uma taxa de crescimento anual composta de quase 80%[^13]. A NVIDIA reservou diretamente toda a capacidade de CoWoS da TSMC até 2027, e **todos os chips, independentemente de em qual fábrica da TSMC sejam produzidos (incluindo Arizona), no final devem ser enviados de volta a Taiwan para embalagem CoWoS**[^13].

Este é o duopólio de duas pontas entre Jensen Huang e a TSMC. A NVIDIA no lado do design, a TSMC no lado da fabricação e embalagem; as duas empresas juntas travam os nós críticos dos data centers de IA.

Em 2 de junho de 2024, Jensen Huang, no ginásio da Universidade Nacional de Taiwan durante a palestra principal da Computex, tornou pública essa vinculação para o mundo inteiro — os slides mostravam o roteiro da Blackwell e da Rubin, mas por trás de cada um estava a linha de produção de CoWoS da TSMC.

<div class="video-embed" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;margin:1.5rem 0;border-radius:8px;">
  <iframe src="https://www.youtube.com/embed/pKXDVsWZmUU" title="NVIDIA CEO Jensen Huang Keynote at COMPUTEX 2024" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

_Canal oficial da NVIDIA: Jensen Huang em 2 de junho de 2024 no ginásio da Universidade Nacional de Taiwan na palestra principal da Computex "The Era of AI". Durante duas horas inteiras, ele expôs GPU Blackwell, NVLink, Spectrum-X slide a slide — mas o local físico de cada slide está em Baoshan, Hsinchu. "Sem TSMC, sem NVIDIA" ele não disse em voz alta, mas cada gráfico de capacidade diz isso._

O custo físico da embalagem 3D também não é pequeno. A PanSci apontou as dificuldades: "A embalagem avançada exige alta planaridade do die nu e alinhamento preciso dos chips; se durante o empilhamento algum ponto de contato não conectar corretamente, causará perda de rendimento. Além disso, circuitos integrados geram perda de energia durante o cálculo, elevando a temperatura; a embalagem avançada aproxima a distância entre dies nus, a condução térmica afeta-se mutuamente, todos se aquecem uns aos outros, tornando a dissipação de calor ainda mais difícil."[^12]

A próxima fase é SoIC (System on Integrated Chips) e SoW-X (System on Wafer). O SoIC é o "verdadeiro 3D", com empilhamento direto wafer-a-wafer, sem esferas (bumping-free). O SoW-X tem produção em massa prevista para 2027, com tamanho de máscara 9,5 vezes o do CoWoS atual, integrando 16 ou mais grandes chips de computação, com capacidade de computação 40 vezes superior ao CoWoS existente[^13]. Quanto maiores ficam os chips de IA, mais as linhas de embalagem da TSMC se assemelham a pequenas fábricas.

## ALD: Crescendo camada por camada de átomos

![Amostras de wafers de silício de diferentes tamanhos exibidas lado a lado em uma vitrine de museu, a maior com diâmetro de aproximadamente 12 polegadas, refletindo um brilho espelhado que mostra a matéria-prima central da fabricação de semicondutores](/article-images/technology/silicon-wafers-museum-2017.webp)
_Exibição de amostras de wafers de silício, 2017. Foto: ArticCynda. [Licença via Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Silicon_wafers.jpg)._

3 nanômetros, 2 nanômetros, 1,6 nanômetros. Por trás desses números há uma tecnologia de fabricação discreta, mas crucial: a deposição de camadas atômicas (Atomic Layer Deposition, ALD).

A ALD foi inventada por finlandeses, mas tornou-se um passo central que nenhum wafer de processo avançado de Taiwan consegue contornar.

A história começa na Finlândia. Em 1974, o cientista de materiais Tuomo Suntola iniciou o desenvolvimento da ALD na empresa finlandesa Instrumentarium Oy. A tecnologia amadureceu em 1977 e fez sua estreia em uma exposição industrial[^14]. Na época, a técnica servia apenas para fabricar displays eletroluminescentes; o próprio Suntola não previu que, 30 anos depois, ela se tornaria a espinha dorsal dos processos em nanômetros. Em 1999, ele vendeu a tecnologia de ALD para a empresa holandesa de equipamentos de semicondutores ASM. Hoje, a ASM detém mais de 55% de participação no mercado de ALD[^14].

O PanSci explica o princípio da ALD de forma clara: «A deposição de camadas atômicas é uma técnica aprimorada de deposição química em fase vapor, que divide o processo de deposição em duas etapas. Primeiro, injeta-se o primeiro precursor, que reage com a superfície do substrato… Quando a superfície se satura, injeta-se o segundo precursor, que reage com o precursor já aderido, formando o material-alvo e completando o processo do filme fino.»[^14] Os dois precursores são injetados alternadamente, um de cada vez, e cada ciclo cresce apenas uma camada de filme fino com a espessura de um átomo.

Por que isso importa? Porque o gate (porta) dos transistores no processo de 2 nanômetros tem apenas alguns átomos de espessura, e a camada isolante do gate precisa atingir planaridade e controle de espessura em nível atômico. A deposição química em fase vapor tradicional (CVD) não consegue; a deposição física em fase vapor (PVD) não consegue; só a ALD consegue «crescer camada por camada». Cada uma das fábricas de processos avançados da TSMC está equipada com máquinas de ALD da ASM; essa cadeia composta por equipamentos holandeses, tecnologia finlandesa e processo de Taiwan é a base física que torna possível a produção em massa de 2 nanômetros.

> 💡 **Você sabia**: o menor tamanho de característica do processo de 2 nanômetros é aproximadamente a largura de 20 átomos de silício lado a lado. Se ampliássemos os átomos de silício ao tamanho de bolas de bilhar, um transistor de 2 nanômetros teria aproximadamente o comprimento de uma mesa de tênis de mesa. O trabalho da ALD é revestir essa mesa «bola por bola» com material isolante.

A ASM não tem capital aberto em Taiwan, mas quase todos os seus maiores clientes de máquinas de ALD de 12 polegadas estão em Taiwan. **Essa cadeia de suprimentos é invisível, mas insubstituível**: se a produção em massa de 2 nanômetros da TSMC enfrentar dificuldades, não existe uma segunda fábrica de ALD no mundo capaz de assumir o posto.

## Depois do 2 nm vem o quântico

A história além do nível angstrom (angstrom, 1 nm = 10 angstroms) ainda não foi escrita pela TSMC.

No quarto trimestre de 2025, a TSMC iniciou a produção em massa de 2 nm na Fab 22 em Kaohsiung, seguida pela Fab 20 em Baoshan, Hsinchu[^2]. O 2 nm adota pela primeira vez a arquitetura de transistores nanosheet GAA (Gate-All-Around), abandonando os transistores de barbatana (FinFET) usados desde o 22 nm até o 3 nm[^16]. O 2 nm equivale à largura de 20 átomos de silício, já se aproximando do limite teórico da física. Os primeiros clientes incluem os chips da série A da Apple e os chips de IA da NVIDIA, e a capacidade de produção do processo de 2 nm será expandida trimestre a trimestre[^3].

A próxima etapa é o 1,6 nm (A16), com produção em massa prevista para o quarto trimestre de 2026, estreando a «rede de fornecimento de energia traseira» (Backside Power Delivery Network), batizada pela TSMC de Super Power Rail[^16]. Com o mesmo consumo de energia, é 10% mais rápido que o N2P; com o mesmo desempenho, consome 15-20% menos energia.

Mas e depois do 1,6 nm? Os nós de processo ficam mais caros quanto mais se avança. O custo de P&D do processo de 28 nm foi de cerca de 1 bilhão de dólares; o de 7 nm saltou para 3 bilhões; o de 3 nm disparou para 10 bilhões; e o de 2 nm estima-se em mais de 20 bilhões[^4]. A curva exponencial da Lei de Moore transformou os custos de P&D da fase final em números astronômicos, como diz a PanSci: «a complexidade e o capital investido no desenvolvimento de processos avançados aumentam exponencialmente, e o investimento e o retorno muitas vezes não são proporcionais»[^12].

Assim, a indústria de semicondutores mudou de estratégia: da expansão horizontal para o empilhamento vertical (encapsulamento 3D), do silício para novos materiais (GaN/SiC), e por fim possivelmente para uma física de computação completamente diferente, como a computação quântica.

A linha do tempo da Academia Sinica segue assim. Em outubro de 2023, foi concluído o desenvolvimento de um computador quântico supercondutor de 5 qubits. Em 29 de janeiro de 2024, a presidente Tsai Ing-wen visitou as instalações e o computador quântico foi oficialmente colocado on-line[^6]. A PanSci registrou: «Em janeiro de 2024, o primeiro computador quântico desenvolvido autonomamente por Taiwan nasceu oficialmente na Academia Sinica; embora possuísse apenas 5 qubits, abriu o caminho para Taiwan ocupar seu lugar no cenário global da computação quântica.»[^17]

Em dezembro de 2025, foi concluído o chip quântico supercondutor de 20 qubits. Em janeiro de 2026, foi anunciada sua disponibilidade para uso on-line[^6]. O tempo de coerência (coherence time T1) saltou dos 15-30 microssegundos da era de 5 qubits para 530 microssegundos nos 20 qubits. O tempo de coerência é a duração durante a qual um qubit consegue manter o estado de superposição; quanto mais longo, «menos ruído há, permitindo realizar computações mais complexas».

A equipe nacional quântica interministerial foi formalmente constituída em março de 2022, com orçamento de 5 anos de NT$ 8 bilhões e 17 equipes de pesquisa[^18]. O Ministério da Economia, por sua vez, criou em abril de 2026 o «Escritório de Promoção da Tecnologia da Indústria Quântica», fazendo a ponte entre o P&D acadêmico e a indústria.

O ITRI faz algo particularmente interessante: usa o processo de 28 nm da TSMC para fabricar «chips de controle de qubits». A CNA de março de 2024 citou o ITRI: «Aproveitando o design de IC de micro-ondas em que Taiwan se destaca e o processo de 28 nm da TSMC, criamos chips e módulos de controle criogênicos (4 K, ou seja, -269 °C)… reduzimos o volume total do equipamento em 40%, simplificamos a fiação, obtendo vantagem comercial… o consumo deste módulo é reduzido em mais de 50% em relação aos dados publicados por grandes fabricantes internacionais.»[^19]

> 📝 **Nota do curador**: A estratégia quântica de Taiwan não está em fabricar os próprios qubits (isso é território da IBM, Google, Academia Sinica), mas em miniaturizar os circuitos de controle para que caibam dentro de um refrigerador de diluição. Dos 5 aos 20 qubits, os chips de controle do ITRI evoluíram de suporte a 1 qubit, 2 qubits, 8 qubits, com previsão de atingir 20 qubits em 2026-2027. **A próxima estação da «Montanha Sagrada Protetora» é ser a fábrica de foundry da era quântica, não disputar diretamente a supremacia quântica**. Mas essa posição de foundry ainda não teve ninguém a cravar o prego do «entreguem a Taiwan».

## Três rotas quânticas: supercondutor, íons aprisionados, topológico

O computador quântico não tem apenas uma única rota.

**Qubits supercondutores** (superconducting qubits) é o caminho seguido pela IBM, Google e Academia Sinica. A vantagem é que o processo é compatível com as fabs de semicondutores existentes (é aqui que Taiwan tem oportunidade), com velocidade de controle rápida. A desvantagem é a necessidade de refrigeradores de diluição próximos ao zero absoluto (15 mK, cerca de -273°C), com alto ruído. Em 2019, o Google anunciou ter alcançado a supremacia quântica com 53 qubits do "Sycamore", completando em 200 segundos uma tarefa que um supercomputador tradicional levaria 10.000 anos[^20].

**Qubits de íons aprisionados** (trapped ion qubits) seguem o caminho do controle a laser de átomos individuais. A PanSci já resumiu as diferenças desta rota: "A tecnologia de íons aprisionados utiliza lasers para controlar átomos individuais para realizar cálculos; essa tecnologia possui precisão e estabilidade extremamente altas, mas também enfrenta problemas de complexidade técnica e custo."[^17] As empresas representativas são IonQ e Quantinuum. Vantagens: alta precisão, boa estabilidade, não requer temperaturas extremamente baixas. Desvantagens: velocidade de controle lenta, difícil de escalar para grande número de qubits.

**Qubits topológicos** (topological qubits) são a aposta da Microsoft para a próxima geração. Em fevereiro de 2025, a Microsoft apresentou o processador quântico topológico Majorana 1, alegando que pode escalar para um milhão de qubits[^15]. Teoricamente, os qubits topológicos têm capacidade extremamente forte de resistência a interferências, mas esta rota é a menos madura; a existência das partículas de Majorana em si ainda está em fase de verificação na física.

Estas três rotas apresentam cada uma seus riscos. A estratégia de Taiwan é "garantir que, independentemente de qual rota vença, Taiwan tenha nós na cadeia de suprimentos", em vez de apostar em uma única rota vencedora. A rota supercondutora conta com o chip de controle de 28 nm da TSMC. A rota de íons aprisionados precisa de óptica de precisão, que se conecta à indústria optoeletrônica de Taiwan; se a rota topológica tiver sucesso, ainda precisará de filmes finos de pureza extrema, voltando ao domínio da ALD.

## Fábricas no exterior: expansão ou exportação?

A globalização da TSMC acelerou a partir da década de 2020.

**Fábrica 21 da TSMC no Arizona, EUA**: primeira fase com processo de 4 nm, produção em massa no primeiro semestre de 2025; segunda fase com 3 nm/2 nm, produção em massa no segundo semestre de 2027; terceira fase com 2 nm/A16, prevista para antes de 2030. Despesas de capital totais de aproximadamente US$ 165 bilhões[^21]. Mas há um "porém" importante: todo o encapsulamento CoWoS de chips de IA ainda ocorre apenas em Taiwan; os wafers produzidos no Arizona são enviados de volta a Taiwan para conclusão do encapsulamento[^13].

**Fábrica 1 da TSMC em Kumamoto, Japão**: processo de 22-28 nm, produção em massa em 2024, em parceria com Sony e Toyota. A Fábrica 2 originalmente planejada (12-16 nm) tem cronograma incerto, com parte dos recursos realocados para o Arizona.

**ESMC em Dresden, Alemanha** (TSMC com 40% de participação): chips automotivos de 28/22/16/12 nm, instalação de equipamentos no segundo semestre de 2025, produção em massa em 2027, capacidade mensal de cerca de 40.000 wafers[^22].

Essas fábricas no exterior compartilham um princípio comum de "N-2" — **sempre duas gerações atrás de Taiwan**. Quando Taiwan produz em 2 nm, o mais avançado no exterior é 4 nm; quando Taiwan avança para 1,6 nm, o exterior chega a 3 nm. Essa linha vermelha está escrita na ética de engenharia geopolítica, não em cláusulas contratuais.

> ⚠️ **Ponto de vista controverso**: As fábricas no exterior ampliam ou diluem o escudo de silício? Defensores dizem: tecnologia fica em Taiwan, capacidade expande-se para fora, transformando o escudo de silício de "uma ilha" em "uma cadeia", com desrisco mais completo. Críticos dizem: a cada fábrica enviada ao exterior, envia-se um lote de engenheiros treinados, um SOP de produção em massa, uma rede de relacionamentos com clientes. Daqui a 30 anos, quando Arizona ou Kumamoto atingirem a fronteira N-2, essa "diferença de duas gerações mais avançadas" pode ser lentamente comprimida. O princípio N-2 é hoje um compromisso da TSMC, não uma lei da física.

Paralelamente às fábricas no exterior, ocorre a "migração de talentos de design". O design de chips de IA não precisa mais apenas de Taiwan; Vale do Silício, Tel Aviv, Nova Déli têm seus próprios centros de design. O ecossistema de foundry da TSMC está evoluindo de "engenheiros de toda a ilha" para um híbrido de "engenheiros globais + fabricação em toda a ilha".

## O Custo Ambiental: O Outro Lado da Montanha Sagrada Protetora da Nação

A montanha sagrada protetora da nação tem peso.

Os recursos hídricos são os mais óbvios. Os três grandes parques científicos da TSMC consomem mais de 208.000 toneladas de água por dia, e grupos ambientalistas estimam que, após a entrada em operação de novas fábricas pós-2025, o consumo de água pode quadruplicar para 770.000 toneladas/dia[^23]. A resposta da TSMC: cada gota de água é usada em média 3,5 vezes, a taxa de reciclagem atinge 87%, com meta de 90% para novas fábricas; em 2024, a economia adicional de água foi de 5,54 milhões de metros cúbicos.

A eletricidade é a segunda questão. Uma fab de 3 nanômetros consome cerca de 2,1 bilhões de kWh por ano, equivalente ao consumo anual de eletricidade de 20.000 famílias em toda Taiwan. O consumo de 2 nanômetros e 1,6 nanômetros continuará a subir. A TSMC promete atingir RE100 (100% energia renovável) até 2050, mas o fornecimento de energia verde em Taiwan não acompanha a velocidade da expansão dos semicondutores, e esse cronograma vem sendo submetido a testes de estresse constantes.

As horas de trabalho são a terceira questão. As horas de trabalho, os preços da habitação e a taxa de natalidade dos engenheiros do parque científico de Hsinchu são tema para outro artigo. Mas, assim como a ciência dos materiais, é um problema de física: o tempo e a energia humanos também têm um "intervalo de banda (bandgap)", e ultrapassar o limiar leva ao colapso.

A existência da montanha sagrada protetora da nação depende não apenas da tecnologia da TSMC, das políticas do governo e das oportunidades geopolíticas, mas também dos 170.000 engenheiros dos parques científicos, de toda a cadeia de fornecedores e de cada residente de Taiwan que compartilha o ônus do consumo de eletricidade e água.

## Ecossistema completo: Taiwan não é apenas a TSMC

A competitividade da indústria de semicondutores de Taiwan vem de todo o cluster, não apenas da TSMC sozinha. No design de IC, há a MediaTek (top 3 global), Novatek, Realtek, Himax; na fundição de wafers, além da TSMC, existem a UMC, VIS, PSMC; em embalagem e teste, a ASE (número 1 global), SPIL, KYEC cuidam do back-end. Em semicondutores de terceira geração, contam com a GlobalWafers (cristais SiC), HannStar, Win Semiconductors (GaN), Macroblock; memória a cargo da Nanya Technology, Winbond; em equipamentos e materiais, empresas "invisíveis" como Jentech Precision, Syntron, Topco Scientific preenchem as lacunas.

Um chip pode ir do design à conclusão dando uma volta completa em Taiwan, sem necessidade de transporte transfronteiriço. Essa "vantagem de cadeia curta" foi vista pelo mundo inteiro durante a COVID e, desde então, entrou no white paper de supply chain de cada gigante tech.

O Parque Científico de Hsinchu foi criado em 1980 e, em mais de 40 anos, acumulou mais de 500 empresas e 170 mil profissionais. Um engenheiro pode passar cinco anos na TSMC, pular para a MediaTek desenhar chips, depois ir para a ASE cuidar de embalagem — essa circulação de talentos entre empresas faz o nível técnico de toda a indústria se difundir eficazmente.

E os concorrentes? A estratégia de integração vertical da Samsung da Coreia investiu 230 bilhões de dólares em 2022-2026, mas o rendimento de processos avançados ainda fica atrás da TSMC[^4]. A Intel travou no nó de 10 nm por anos, lançou o IDM 2.0 em 2021 querendo fazer design e fundição juntos, mas até 2025 seu negócio de fundição ainda não conquistou clientes de peso — o mais irônico é que parte dos próprios chips high-end da Intel passou a ser fabricada pela TSMC.

## A posição quântica continua vaga

O carregador do Nokia 3310 tinha 4,56 watts; o carregador rápido de 2025 tem 240 watts. Uma diferença de 52 vezes. O silício levou 30 anos para percorrer esse caminho; o nitreto de gálio completou em 5 anos.

No laboratório quântico da Academia Sinica, chips quânticos supercondutores precisam operar a 15 milikelvin (cerca de -273 °C). O ITRI, usando o processo de 28 nm da TSMC, produziu um chip de controle que comprimiu o "volume do instrumento de controle" necessário para essa temperatura extrema de um prédio inteiro para uma pequena caixa. A capacidade de semicondutores de Taiwan está, pouco a pouco, deslocando as fronteiras do computador quântico.

Mas ninguém sabe dizer onde fica essa fronteira. O tempo de coerência dos qubits varia de 15 a 530 microssegundos — e isso é apenas o começo. Os 19 engenheiros que a RCA enviou há 50 anos provavelmente não imaginavam que seu trabalho de 1973 se cristalizaria no processo de 2 nm de 2025.

A "montanha sagrada da nação" dominou o presente graças à experiência industrial dos anos 50. Nos próximos 50 anos, a posição de foundry da era quântica ainda não foi conquistada por Taiwan.

> ✦ O Blackwell de Jensen Huang roda inferência na nuvem acima da sua cabeça; os wafers de SiC da GlobalWafers aquecem no posto de recarga de veículos elétricos na sua esquina; a primeira película fina de ALD que Suntola fez em 1974 na Finlândia sela a camada de isolamento do gate no chip do seu telefone — os semicondutores sempre foram um espectro inteiro de materiais subindo degrau a degrau pela física do bandgap ao longo de 50 anos, e não pertencem apenas à TSMC. Onde fica o próximo degrau, a física nos dirá; mas se vamos subi-lo ou não, é escolha de Taiwan.

---

**Leitura complementar**:

- [Empresas de Taiwan: TSMC](/pt/economy/tsmc) — A governança corporativa, estrutura financeira e escala de capex da montanha sagrada da nação
- [Empresas de Taiwan: MediaTek](/pt/economy/mediatek) — Como a líder em design de IC se posiciona em chips para celular e computação de borda com IA
- [Empresas de Taiwan: ASE](/pt/economy/taiwan-enterprise-ase-semiconductor) — Líder global em encapsulamento e teste, o ecossistema de back-end além do CoWoS
- [Os Construtores da Montanha: A Aposta do Século](/pt/art/mountain-makers-tsmc-documentary) — Documentário de 2025 de Hsiao Ju-chen, cinco anos entrevistando 80+ veteranos de semicondutores; em 2026 visita Purdue, Wisconsin e Michigan, três polos de investimento do CHIPS Act
- [Wu Ta-you](/pt/people/tai-yu-wu) — Enquanto Taiwan se lançava nos semicondutores nos anos 80, como presidente da Academia Sinica ele insistia na importância da ciência básica, lançando as bases do sistema de pesquisa de Taiwan
- [Huang Chung-jen](/pt/people/frank-huang-psmc) — Fundador da Powerchip / PSMC, a rota de Taiwan no DRAM de construir fábricas próprias com licenças de processo alheias: market share caiu de 23,2% para 6,3%, o trecho menos contado desta indústria
- [Indústria de Robótica de Taiwan](/pt/technology/taiwan-robotics-industry) — A ilha número um em semicondutores, por que é aluna repetente na era da robótica? A fratura industrial vista a partir da inauguração do NCAIR
- [Bolsa e Mercado de Capitais de Taiwan](/pt/economy/taiwan-stock-market) — Como todo o ecossistema da cadeia de suprimentos que sustenta o posto de 6º maior mercado global da bolsa de Taiwan em 2026 se reflete no mercado de capitais
- [Cadeia de Suprimentos de Tungstênio de Taiwan](/pt/technology/taiwan-tungsten-supply-chain) — O hexafluoreto de tungstênio preenche contatos e word lines de 3D NAND; Taiwan não tem minas de tungstênio, mas alcançou o midstream dessa matéria-prima via reciclagem e refino
- [Escola de Inteligência Artificial de Taiwan](/pt/technology/taiwan-ai-academy) — Como os dezenas de milhares de engenheiros de IA treinados em oito anos pela AIA retornam à cadeia ICT existente de semicondutores, reforçando o lado de software de Taiwan
- [Computex: Três Grandes Feiras Internacionais de Computadores, Duas Fecharam, a que Sobrou Cresce em Taipé](/pt/technology/computex) — O CoWoS e os processos avançados da TSMC apertam a mão dos gigantes globais de IA todo fim de maio nesta feira de computadores de 45 anos em Taipé
- [Parques Científicos de Taiwan](/pt/technology/science-park-development) — Os três parques de Hsinchu, Tainan e Taichung, suporte físico do cluster de semicondutores e centro geográfico do escudo de silício

## Fontes das imagens

Este artigo utiliza 3 imagens licenciadas sob CC / PD, armazenadas em cache em `public/article-images/technology/` para evitar hotlink dos servidores de origem:

- [Silicon vs GaN 30W USB-C chargers](https://commons.wikimedia.org/wiki/File:Silicon_vs_GaN_30W_USB-C_chargers.jpg) — Foto: 4300streetcar, 2025-12-25, CC BY 4.0, Wikimedia Commons file Silicon_vs_GaN_30W_USB-C_chargers.jpg
- [TSMC Fab 5 Hsinchu](https://commons.wikimedia.org/wiki/File:TSMC_Fab5.JPG) — Foto: Peellden, 2010-09-05, CC BY-SA 3.0, Wikimedia Commons file TSMC_Fab5.JPG
- [Silicon wafers museum display](https://commons.wikimedia.org/wiki/File:Silicon_wafers.jpg) — Foto: ArticCynda, 2017-10-23, CC0 domínio público, Wikimedia Commons file Silicon_wafers.jpg

## Referências

[^1]: [Semiwiki — Como a Philips Salvou a TSMC](https://semiwiki.com/semiconductor-history/307560-how-philips-saved-tsmc/) — A participação acionária da Philips, segundo pesquisa do Semiwiki, deve ser de 27,6%; foi acionista-chave de tecnologia e cliente nos estágios iniciais da fundação da TSMC.

[^2]: [Focus Taiwan 2025/12/30 — Produção de 2 nm da TSMC](https://focustaiwan.tw/business/202512300012) — A produção em massa de 2 nm da TSMC tem a Fab 22 em Kaohsiung como fábrica principal, seguida pela Fab 20 em Baoshan, Hsinchu.

[^3]: [Era Digital — TSMC Inicia Produção em Massa de 2 nm Oficialmente](https://www.bnext.com.tw/article/89663/tsmc-2nm-volume-production) — A TSMC começa a produção em massa de 2 nm no Q4 de 2025; números concretos de capacidade mensal são estimativas externas da indústria, não divulgados oficialmente.

[^4]: [TechNews — Utilização de 3 nm da TSMC Atinge 100%](https://technews.tw/2025/05/26/tsmcs-2nm-process-is-expected-to-reach-full-capacity-in-four-seasons/) — Estimativas da indústria indicam que o rendimento dos processos avançados da TSMC é superior ao dos concorrentes; números concretos de rendimento são estimativas de terceiros, não divulgação oficial.

[^5]: [CommonWealth Magazine — K.T. Li e o Nascimento da TSMC](https://www.cw.com.tw/article/5095492) — Em 1987, Morris Chang fundou a TSMC, estabelecendo o modelo de 'fundição pura', lançando as bases para a divisão global da indústria de semicondutores; contexto da transferência de tecnologia da RCA de 4,5 milhões de dólares em 1973.

[^6]: [Academia Sinica — Anúncio de Chip Quântico Supercondutor de 20 Qubits](https://www.sinica.edu.tw/News_Content/56/2375) — A Academia Sinica completou em dezembro de 2025 um chip quântico supercondutor de 20 qubits, com conexão em 29 de janeiro de 2026; tempo de coerência T1 atinge 530 microssegundos.

[^7]: [PanSci — Nitreto de Gálio: Com 1/3 do Tempo, Obtém-se a Mesma Potência](https://pansci.asia/archives/362660) — Autor: Equipe Editorial da PanSci. Nitreto de gálio com bandgap de 3,4 eV, tensão de ruptura 10 vezes maior, frequência de operação de 1 MHz vs 100 kHz do silício; aplicação de carboneto de silício em carregamento rápido de veículos elétricos a 1000 volts. Parceiro de Curadoria de Conteúdo conforme MOU 2026-05-05

[^8]: [TrendForce — TSMC Sai da Fundição de GaN até Julho de 2027](https://www.trendforce.com/news/2025/08/22/news-tsmc-reportedly-exits-gan-foundry-business-by-2027/) — A TSMC sai da fundição de GaN em julho de 2027, licenciando tecnologia para a Vanguard International Semiconductor (VIS) e GlobalFoundries; a Episil (3163) envia cerca de 500 wafers de 6 polegadas de GaN por mês.

[^9]: [Fruit Direct — GlobalWafers SiC Wafers de 8 Polegadas em Produção em Massa 2025](https://www.fugle.tw/news/article/1234567) — A capacidade mensal de SiC de 6 polegadas da GlobalWafers atingiu 20.000 wafers no final de 2024, fornos de crescimento de cristal desenvolvidos internamente aumentaram de 3 para 20, rendimento > 50%; estratégia de 'Grupo IDM Virtual' de Hsu Hsiu-lan.

[^10]: [TechNews — Cadeia de Fornecimento de SiC Sob Pressão](https://technews.tw/2025/11/sic-market-oversupply) — A expansão de fábricas de SiC na China em 2025 leva a taxa de utilização de capacidade de 6/8 polegadas da GlobalWafers abaixo de 50%; rumores de que GPU Rubin da NVIDIA adotará interposer de SiC + centro de dados de corrente contínua de alta tensão de 800V para produção em massa em 2027.

[^11]: [SemiAnalysis — Análise do CoWoS-L do NVIDIA Blackwell](https://www.semianalysis.com/p/nvidia-blackwell-b200-cowos-l) — O NVIDIA Blackwell B200 usa CoWoS-L integrando 2 GPUs Blackwell + 1 CPU Grace; velocidade de treinamento de IA 4 vezes mais rápida que H100; NVIDIA reserva toda capacidade CoWoS da TSMC até 2027.

[^12]: [PanSci — Empilhamento Tridimensional: Como o Empacotamento Avançado Faz os Chips Entrar no Túnel de Xueshan](https://pansci.asia/archives/367588) — Autor: Equipe Editorial da PanSci. Princípios de CoWoS / SoIC / TSV de via de silício; metáfora da Rodovia 9 vs Túnel de Xueshan; desafios de rendimento e dissipação de calor do empacotamento 3D. Parceiro de Curadoria de Conteúdo conforme MOU 2026-05-05

[^13]: [DigiTimes — Plano de Expansão de Capacidade CoWoS da TSMC](https://www.digitimes.com.tw/iot/article.asp?cat=158&id=0000696823_X1D7L8XB6JNL2Y8XLPZJK) — Capacidade mensal CoWoS da TSMC: 35.000 wafers no final de 2024, 75.000 no final de 2025, meta de 150.000 em 2028; NVIDIA reserva capacidade até 2027; wafers do Arizona enviados de volta a Taiwan para empacotamento.

[^14]: [PanSci — ALD Deposição de Camada Atômica: 50 Anos de Revolução em Películas Finas](https://pansci.asia/archives/377669) — Autor: Equipe Editorial da PanSci. ALD desenvolvido por Suntola na Instrumentarium Oy em 1974, tecnologia madura em 1977, vendida para ASM em 1999; ASM com 55% de participação de mercado; princípio de precursor duplo de deposição química de vapor. Parceiro de Curadoria de Conteúdo conforme MOU 2026-05-05

[^15]: [TechNews — Microsoft Apresenta Processador Quântico Topológico Majorana 1](https://technews.tw/2025/02/20/microsoft-majorana-1-topological-qubit/) — Em fevereiro de 2025, a Microsoft apresenta o primeiro processador quântico topológico do mundo, Majorana 1, alegando escalabilidade para um milhão de qubits.

[^16]: [Site oficial da TSMC — Anúncio do processo A16 (1,6 nm)](https://www.tsmc.com/english/dedicatedFoundry/technology/logic/l_2nm) — 2 nm adota pela primeira vez transistores nanosheet GAA (abandona FinFET); A16 introduz pela primeira vez rede de alimentação traseira (Super Power Rail), produção em massa no 4º trimestre de 2026, 10% mais rápido que N2P com mesmo consumo, 15-20% menos consumo com mesmo desempenho

[^17]: [PanSci — Tecnologia quântica de Taiwan: de 5 qubits à era de produção em massa](https://pansci.asia/archives/377923) — Autor: equipe editorial da PanSci. Em janeiro de 2024, a Academia Sinica lança computador quântico de 5 qubits; três rotas: supercondutor vs armadilha de íons vs topológica; Google Sycamore de 53 qubits resolve em 200 segundos problema que levaria 10 mil anos. Parceiro de curadoria de conteúdo conforme MOU 2026-05-05

[^18]: [iThome — Equipe nacional quântica: orçamento de NT$8 bilhões em 5 anos](https://www.ithome.com.tw/news/151234) — Em março de 2022, forma-se a equipe nacional quântica interministerial, orçamento de NT$8 bilhões em 5 anos, 17 equipes de pesquisa; em abril de 2026, o Ministério da Economia cria o Escritório de Promoção de Tecnologia da Indústria Quântica

[^19]: [Agência Central de Notícias 2024/03/06 — Chip de controle quântico do ITRI](https://www.cna.com.tw/news/ait/202403060123.aspx) — O ITRI utiliza processo de 28 nm da TSMC para criar chip de controle quântico a 4 K (-269 °C), volume reduzido em 40%, consumo 50% menor que grandes fabricantes internacionais; roteiro: 2024 um qubit → 2026-2027 vinte qubits

[^20]: [TechNews — Supremacia quântica do Google Sycamore](https://technews.tw/2019/10/24/google-sycamore-quantum-supremacy/) — Em 2019, o computador quântico Sycamore de 53 qubits do Google alcança supremacia quântica, completando em 200 segundos tarefa que levaria 10 mil anos em supercomputador tradicional

[^21]: [SemiAnalysis — Plano de investimento da Fab 21 da TSMC no Arizona](https://www.semianalysis.com/p/tsmc-arizona-1650b-capex) — Investimento de três fases da Fab 21 da TSMC no Arizona totaliza US$ 165 bilhões; Fase 1 (4 nm) produção em massa em 2025, Fase 2 (3 nm/2 nm) 2027, Fase 3 (2 nm/A16) antes de 2030; princípio N-2: fábricas no exterior sempre duas gerações atrás de Taiwan

[^22]: [Digitimes — ESMC Dresden produção em massa em 2027](https://www.digitimes.com.tw/news/esmc-dresden-2027) — TSMC detém 40% da ESMC; fábrica de chips automotivos de 28/22/16/12 nm em Dresden, Alemanha, equipamentos entram no 2º semestre de 2025, produção em massa em 2027, capacidade mensal de cerca de 40 mil wafers

[^23]: [Revista CommonWealth — Consumo de recursos hídricos da TSMC](https://www.cw.com.tw/article/5128456) — Os três parques científicos da TSMC consomem mais de 208 mil toneladas de água por dia; grupos ambientalistas estimam que, após 2025, novas fábricas elevarão o consumo a 770 mil toneladas/dia; a TSMC responde que cada gota é usada 3,5 vezes, taxa de reciclagem de 87% (novas fábricas 90%), economia adicional de 5,54 milhões de metros cúbicos em 2024

[^asml-philips]: [Wikipédia — ASML Holding](https://en.wikipedia.org/wiki/ASML_Holding) — A ASML foi fundada em 1º de abril de 1984 como joint venture 50/50 entre a Philips dos Países Baixos e a ASM International (ASMI); após o IPO em 1995, a ASMI saiu, e hoje a ASML é a única fornecedora global de equipamentos de litografia EUV

[^lin-bio]: [Wikipédia — Burn-Jeng Lin](https://en.wikipedia.org/wiki/Burn-Jeng_Lin) — Burn-Jeng Lin nasceu em 1942 no Vietnã, trabalhou em tecnologia de litografia no IBM Watson Research Center a partir dos anos 1970, retornou a Taiwan em 2000 para ingressar na TSMC como diretor de P&D; recebeu o Prêmio SPIE Frits Zernike em 2008; conhecido como 'pai da litografia por imersão'

[^157nm-fail]: [Electronics Weekly — Litografia por imersão deixa rota de 157 nm de lado](https://www.electronicsweekly.com/news/research-news/process-rd/immersion-litho-sidelines-157nm-2005-05/) — A rota de 157 nm foi abandonada após 2002-2003 devido a problemas como birrefringência de lentes de fluoreto de cálcio (CaF₂), forte absorção de filmes finos a 157 nm e dificuldades de integração de processo, sendo substituída pela imersão a 193 nm; aposta da Intel + Nikon falha

[^immersion-litho]: [Wikipédia — Litografia por imersão](https://en.wikipedia.org/wiki/Immersion_lithography) — Burn-Jeng Lin propõe litografia por imersão a 193 nm no SPIE 2002; índice de refração da água 1,44 torna resolução efetiva de 193 nm cerca de 134 nm; ASML inicia produção em massa em 2007, estendendo de 65 nm a 7 nm, prolongando a lei de Moore por seis gerações

[^cw-lin-interview]: [Revista CommonWealth — Entrevista com o pai da litografia por imersão que colocou a TSMC no mapa](https://english.cw.com.tw/article/article.action?id=3720) — Entrevista de 18/06/2024 com Burn-Jeng Lin — contexto histórico de 'Nikon não ousava fazer imersão'; Lin impulsiona adoção de litografia por imersão na TSMC desde 2000, 30 anos de colaboração tecnológica TSMC-ASML
