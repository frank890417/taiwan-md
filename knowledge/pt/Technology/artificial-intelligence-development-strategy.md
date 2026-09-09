---
title: 'Desenvolvimento e estratégia futura da IA em Taiwan: o bilhete de entrada do hardware está garantido, mas onde se travará a próxima batalha?'
description: 'A 8 de outubro de 2024, o Nobel da Física foi atribuído a Hopfield e Hinton; no dia seguinte, o da Química aos três investigadores do AlphaFold. A 29 de maio do mesmo ano, Jensen Huang jantou ostras no mercado noturno de Ningxia, em Taipé, com Morris Chang. Taiwan fabrica 90% dos servidores de IA do mundo e 72% das wafers avançadas, mas esteve ausente das respostas aos enigmas de 42 anos das redes neuronais e 50 anos do dobramento de proteínas. Do Taiwan AI Labs do fundador do PTT, Ethan Tu, ao modelo LLM em chinês tradicional TAIDE, apostado pelo Conselho Nacional de Ciência e Tecnologia, bastará a esta ilha continuar a ser apenas uma fábrica por encomenda?'
date: 2026-03-19
category: 'Technology'
tags:
  [
    'inteligência artificial',
    'IA',
    'semicondutores',
    'política tecnológica',
    'transformação digital',
    'Nobel',
    'AlphaFold',
  ]
subcategory: '人工智慧'
author: 'Taiwan.md'
difficulty: 'advanced'
readingTime: 18
featured: true
lastVerified: 2026-05-19
lastHumanReview: true
image: '/article-images/technology/alphafold-cbln1-structure-2025.webp'
imageCredit: 'BQUB25-UPoch (own work, AlphaFold + PyMOL)'
imageLicense: 'CC BY 4.0'
imageSource: 'https://commons.wikimedia.org/wiki/File:Estructura_tridimensional_de_la_prote%C3%AFna_CBLN1_per_AlphaFold_amb_codificaci%C3%B3_rainbow.png'
translatedFrom: 'Technology/台灣人工智慧發展與未來策略.md'
sourceCommitSha: 'b67b190fb'
sourceContentHash: 'sha256:15e7aa6f99cf7a84'
sourceBodyHash: 'sha256:50acff1d4627c3c4'
translatedAt: '2026-09-09T11:22:17.322454+00:00'
---

# Desenvolvimento e estratégia futura da IA em Taiwan: o bilhete de entrada do hardware está garantido, mas onde se travará a próxima batalha

> **Visão geral em 30 segundos:** A 8 de outubro de 2024, o Nobel da Física foi entregue ao físico que criou a Hopfield Network e ao cientista cognitivo que formulou o backpropagation[^N1]. No dia seguinte, 9 de outubro, o Nobel da Química distinguiu três investigadores que usaram IA para resolver o enigma do dobramento de proteínas, com meio século de existência[^N2]. Em 29 de maio do mesmo ano, o CEO da NVIDIA, Jensen Huang, apareceu no mercado noturno de Ningxia, em Taipé, a comer omelete de ostras com Morris Chang, Barry Lam e Rick Tsai. A TSMC detém 72% da receita global de fundição de wafers; Foxconn, Quanta e Wistron produzem, juntas, nove em cada dez servidores de IA do planeta. Mas nesta cerimónia científica de dois dias, que conferiu legitimidade a 42 anos de história das redes neuronais, não consta um único nome vindo de Taiwan. Do Taiwan AI Labs, fundado por Ethan Tu (杜奕瑾), criador do PTT (批踢踢), ao modelo de linguagem de grande escala em chinês tradicional TAIDE, no qual o governo aposta, desenrola-se uma aposta que vai de «fabricar IA» a «ser IA».

---

## 42 anos de reconhecimento: dois Nobéis em dois dias em 2024

Na manhã de 8 de outubro de 2024, em Estocolmo. A Real Academia Sueca de Ciências anunciou que o Prêmio Nobel de Física daquele ano seria concedido a dois cientistas de IA: John J. Hopfield, professor emérito de Princeton aos 91 anos, e Geoffrey Hinton, de 76 anos, que havia deixado o Google cinco meses antes. O prêmio de 11 milhões de coroas suecas foi dividido igualmente entre os dois[^N1].

O comitê de avaliação citou como justificativa «descobertas e invenções fundamentais que permitem a aprendizagem de máquina com redes neurais artificiais»[^N1]. Foi a primeira vez na história do Nobel de Física que o prêmio foi concedido diretamente ao campo das redes neurais.

No dia seguinte, 9 de outubro, o Nobel de Química. Três laureados: David Baker, da Universidade de Washington, e dois pesquisadores da DeepMind, Demis Hassabis e John Jumper. Baker recebeu metade do prêmio, enquanto Hassabis e Jumper dividiram a outra metade[^N2]. A justificativa foi dividida em duas partes: a primeira para o «design computacional de proteínas» de Baker, a segunda para a «previsão de estrutura de proteínas» de Hassabis e Jumper.

Dois dias, dois Nobéis, ambos relacionados à IA. Não há precedente na história do Prêmio Nobel.

Compare a linha do tempo: quando Hopfield publicou em 1982 nos _Proceedings of the National Academy of Sciences_ (PNAS) o artigo «Neural networks and physical systems with emergent collective computational abilities», ele acabara de migrar da física da matéria condensada para a neurociência[^N3]. De 1982 a 2024, foram exatos 42 anos. O artigo de 1986 em que Hinton e Rumelhart transformaram o algoritmo de retropropagação em ferramenta utilizável[^N4] levou 38 anos da publicação ao prêmio. O AlphaFold, desde sua estreia no CASP13 em 2018 até o Nobel de 2024, levou apenas 6 anos.

No fim das contas, o que esses dois dias de Nobel premiaram não foi o ChatGPT, mas aqueles artigos de três, quatro décadas atrás que ninguém conseguia entender. O descompasso entre pesquisa básica e aplicação industrial sempre foi assim.

![Retrato oficial de Geoffrey E. Hinton durante a Semana do Nobel em Estocolmo em 8 de dezembro de 2024, terno escuro, cabelos brancos, expressão serena diante da câmera](/article-images/technology/hinton-nobel-2024.webp)
_Geoffrey Hinton, vencedor do Nobel de Física 2024, na Semana do Nobel em Estocolmo. Foto: Arthur Petron, 2024-12-08. [CC BY-SA 4.0 via Wikimedia Commons](<https://commons.wikimedia.org/wiki/File:Geoffrey%5FE.%5FHinton,%5F2024%5FNobel%5FPrize%5FLaureate%5Fin%5FPhysics%5F(3x4%5Fcropped).jpg>)._

## O jantar de biliões no mercado de Ningxia

Ao final da tarde de 29 de maio de 2024, véspera da abertura da Computex, o mercado noturno de Ningxia, em Taipé, recebeu um grupo de clientes invulgar. O CEO da NVIDIA, Jensen Huang, acompanhado do fundador da TSMC, Morris Chang, do chairman da Quanta, Barry Lam, e do CEO da MediaTek, Rick Tsai, apertavam-se numa banca a comer omelete de ostras[^1]. Transeuntes reconheceram Huang e, num instante, a comitiva foi cercada por fãs e jornalistas, numa cena digna de perseguição a estrelas.

O valor de mercado somado das empresas representadas à mesa ultrapassava vários biliões de dólares. Mas a verdadeira história não está na mesa, e sim na cadeia industrial por trás dela: estas pessoas representam as empresas que sustentam a base física da computação de IA global. Huang disse, durante essa visita a Taiwan: «Taiwan é um dos países mais importantes do mundo.»[^2] Não foi frase de circunstância. Sem Taiwan, a base de hardware da revolução da IA não existiria.

Jensen Huang nasceu em Taipé em 1963, passou a infância em Tainan e emigrou para os EUA aos nove anos[^3]. A NVIDIA, que cofundou em 1993, é hoje sinónimo de chips de IA. Todos os GPUs avançados desenhados pela NVIDIA — desde os A100 e H100 que treinaram o ChatGPT até à mais recente série Blackwell — são fabricados pela TSMC[^4].

Quatro meses depois, em Estocolmo, as duas listas de laureados do Nobel não continham nenhum nome ligado a esse jantar. Este fosso não é coincidência; é um facto estrutural.

---

## Hardware: uma ilha sustenta toda a revolução da IA

A posição de Taiwan na cadeia de fornecimento de hardware de IA é tal que descrevê-la como «crítica» fica aquém da realidade.

No fabrico de chips, a TSMC obteve, em 2025, 72% da receita global de fundição de wafers[^5]. Nos processos mais avançados, de 7 nm para baixo, a sua quota de mercado supera 90%. A NVIDIA detém cerca de 86% do mercado de GPUs para IA, e praticamente todos esses GPUs são fabricados pela TSMC[^6]. A esmagadora maioria da capacidade de computação usada para treinar e executar modelos de IA nasce nas salas limpas de Taiwan.

Depois de feitos, os chips têm de ser montados em servidores para entrarem nos centros de dados. Esta etapa é igualmente dominada por Taiwan. Foxconn, Quanta e Wistron, os três grandes ODMs, produzem juntos cerca de 90% dos servidores de IA do mundo[^7]. Em 2025, a receita anual de cada uma destas três empresas ultrapassou um bilião de novos dólares taiwaneses (cerca de 32 mil milhões de USD), e a receita de servidores de IA superou, no segundo trimestre, a de eletrónica de consumo pela primeira vez[^8].

O desempenho dos chips de IA não depende apenas da miniaturização do processo, mas também da tecnologia de encapsulamento. O CoWoS (Chip on Wafer on Substrate) da TSMC é essencial para que os GPUs topo de gama da NVIDIA atinjam as metas de desempenho. Em 2026, prevê-se que a procura da NVIDIA por wafers CoWoS atinja 595 mil unidades, representando 60% da procura global total[^9].

A Foxconn colabora ainda com a NVIDIA e o governo de Taiwan na construção, em Kaohsiung, de uma fábrica-supercomputador de IA de 100 megawatts (MW), baseada na mais recente arquitetura Blackwell da NVIDIA[^10]. Taiwan está a passar de «local onde se fabricam chips de IA» para «local onde a IA roda».

![Fachada da Fab 5 da TSMC no Parque Científico de Hsinchu, cenário dos anos 2010, local físico de fabrico por encomenda de chips de IA](/article-images/technology/tsmc-fab5-hsinchu-2010.webp)
_Fab 5 da TSMC em Hsinchu, o local físico de fabrico por encomenda de chips de IA. Foto: Wikimedia Commons via [ficheiro TSMC Fab 5](https://commons.wikimedia.org/wiki/File:TSMC_Fab_5.jpg)._

A questão é: o hardware já tem o bilhete de entrada; a próxima batalha travar-se-á onde?

> 📝 **Nota do curador**
>
> A narrativa corrente diz que a «montanha sagrada protetora de Taiwan sustenta a revolução da IA». Esta formulação é narrativamente conveniente, mas inverte metade da causalidade. Foi a revolução da IA que precisou de GPUs e escolheu a TSMC, não a TSMC que cresceu graças à revolução da IA. A verdadeira tensão reside em: quando o GPU se tornar commodity, para onde deslizará a próxima camada de valor? Os dois Nobéis de 2024 dão a resposta: o próprio modelo — as 12 páginas de Hopfield, a noite em que Hinton e o aluno Krizhevsky fizeram o AlexNet baixar a taxa de erro do ImageNet de 26,2% para 15,3%[^N5], e a tarde em que a equipa de Hassabis alcançou uma mediana GDT de 92,4 no CASP14 com o AlphaFold.

---

## Hopfield 1982: o modelo de memória de um físico

Em 1982, o físico da matéria condensada John Hopfield, de Princeton, escreveu um artigo de apenas 12 páginas, com um título longo: _Neural networks and physical systems with emergent collective computational abilities_, publicado nos _Proceedings of the National Academy of Sciences_[^N3].

O que ele fez, essencialmente, foi traduzir a "memória" para a linguagem da física.

Na física existe algo chamado _spin glass_ (vidro de spin): um conjunto de átomos magnéticos, cada um com sua direção de spin, interagindo entre si, e o sistema todo encontra espontaneamente um ponto de energia mínima. Hopfield transportou esse conceito para os neurônios: imaginou os neurônios como spins, a força das conexões como interações, e a rede toda converge espontaneamente para um "mínimo de energia" (energy minimum) estável[^N3]. Cada mínimo de energia corresponde a uma memória armazenada.

A elegância deste modelo reside em tornar a memória algo descrevível em linguagem física. Dada uma pista incompleta, a rede encontra sozinha o mínimo de energia mais próximo, completando toda a memória. Esse é o ancestral matemático do que a IA generativa faz hoje.

Naquele ano de 1982, em Taiwan a indústria eletrônica estava apenas começando, e a TSMC ainda não existia. Morris Chang só fundaria a empresa que, 42 anos depois, se tornaria a "montanha sagrada que protege o país" em 1987. As citações do artigo de Hopfield no Google Scholar já acumulavam mais de vinte e sete mil até 2026[^N6].

Mais interessante ainda é o que Hopfield disse depois. Ele passou a vida toda fazendo física da matéria condensada em Princeton, e sua incursão na neurociência foi vista pelos pares da época como diletantismo. Quando a lista do Nobel de 2024 foi anunciada, ele tinha 91 anos; a Real Academia Sueca de Ciências perguntou-lhe, em entrevista por telefone, o que sentia ao receber o prêmio, e ele respondeu que se sentia inquieto com o fato de "ninguém entender ou controlar a direção da IA"[^N7].

Quem escreveu os fundamentos matemáticos de toda a IA moderna, no dia em que recebeu a medalha, lembrou a todos para terem cautela.

![John J. Hopfield 2024 年 12 月 8 日於斯德哥爾摩諾貝爾週受訪人像，深色西裝、白髮、神情沉穩](/article-images/technology/hopfield-nobel-2024.webp)
_John J. Hopfield, Nobel de Física 2024, semana do Nobel em Estocolmo. Foto: Arthur Petron, 2024-12-08. [CC BY-SA 4.0 via Wikimedia Commons](https://commons.wikimedia.org/wiki/File:John_J._Hopfield,_2024_Nobel_Prize_Laureate_in_Physics_1_(cropped).jpg).\_\_\_

## Hinton: o artigo de 1986 e o aviso de 2023 ao deixar a Google

Geoffrey Hinton, nascido em 1947 em Wimbledon, Londres, é o outro homem que a história levou 38 anos a reconhecer[^N8].

Em 1986, Hinton, David Rumelhart e Ronald Williams publicaram na _Nature_ um artigo sobre backpropagation[^N4]. O algoritmo significa: quando a rede neuronal erra, o sinal de erro propaga-se em sentido inverso através das camadas, ajustando os pesos de ligação camada a camada. É assim que todos os modelos de aprendizagem profunda se treinam hoje.

O algoritmo foi escrito em 1986, mas teve de esperar que três condições se reunissem para explodir: poder de computação barato o suficiente, volume massivo de dados e gente disposta a acreditar naquele caminho. As duas primeiras chegaram no início dos anos 2010; a terceira teve em Hinton e nos seus dois alunos, Alex Krizhevsky e Ilya Sutskever, os seus rostos. Em 2012, usaram GPUs para treinar a rede convolucional AlexNet, que venceu o desafio ImageNet com taxa de erro top-5 de 15,3%, deixando o segundo classificado, com 26,2%, bem para trás[^N5]. Nesse momento, a indústria inteira percebeu que o backpropagation funcionava mesmo.

Em março de 2013, a Google comprou a pequena empresa de Hinton, a DNNresearch, por 44 milhões de dólares, integrando-o aos 65 anos[^N8]. Durante a década seguinte, foi o académico de IA mais prestigiado do Vale do Silício.

Até 1 de maio de 2023, quando o _New York Times_ publicou uma entrevista: Hinton tinha saído da Google.

Não foi por reforma. Disse na entrevista que queria «poder falar livremente dos riscos da IA, sem ter de considerar o impacto na Google»[^N9]. Alertou para: sistemas de IA que podem rapidamente superar a inteligência humana; uso malicioso por atores mal-intencionados; e a dificuldade de travar tudo isto — «é difícil ver qual seria a solução»[^N9]. Chegou a dizer que «uma parte de si se arrepende do trabalho de uma vida»[^N9].

Quando, em 2024, lhe foi atribuído o Nobel da Física, repetiu, na entrevista telefónica, o aviso: cuidado com a possibilidade de a IA fugir ao controlo[^N10].

Quem escreveu o algoritmo de treino da aprendizagem profunda e quem escreveu o modelo de memória, em outubro de 2024, subiram juntos ao pódio da Real Academia Sueca e, juntos, avisaram que isto pode ser mais perigoso do que se imagina. A cena tem um sabor de contraponto com a expressão de Oppenheimer, em 1945, no deserto do Novo México, a ver a nuvem em cogumelo erguer-se.

Dois meses depois, a 8 de dezembro de 2024, Hinton proferiu a sua conferência de Nobel no Aula Magna da Universidade de Estocolmo. Título: «Boltzmann Machines» — o trabalho inicial, na linhagem de Hopfield, que introduziu distribuições de probabilidade termodinâmicas nas redes neuronais. Só ouvindo se percebe que o artigo de 1986 sobre backpropagation não foi um insight isolado, mas parte de todo um corpo de pensamento nascido na intersecção da física e da ciência cognitiva nos anos 80:

<div class="video-embed" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;margin:1.5rem 0;border-radius:8px;">
  <iframe src="https://www.youtube.com/embed/iCS1ds0UDP8" title="Boltzmann Machines — Nobel Prize lecture by Geoffrey Hinton, Nobel Prize in Physics 2024" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

_Canal oficial da Real Academia Sueca de Ciências: conferência de Geoffrey Hinton, Nobel da Física 2024, «Boltzmann Machines». Desde as máquinas de Boltzmann que escreveu com Sejnowski nos anos 80, passando pelo backpropagation, até aos LLMs de hoje — quarenta anos inteiros. Nos últimos 5 minutos, repete mais uma vez a sua preocupação com os riscos da IA, desta vez do púlpito do Nobel._

---

## Do PTT ao Laboratório de IA: as duas fundações de Ethan Tu

Voltemos a esta ilha. Enquanto Hopfield escrevia o seu modelo de memória, Taiwan mal começava a ter departamentos de informática.

Em 1995, Ethan Tu (杜奕瑾), aluno do segundo ano de Engenharia Informática da Universidade Nacional de Taiwan, usou um computador 486 e software livre para montar, no quarto do dormitório, o PTT (批踢踢), que se tornaria o maior quadro de avisos eletrónico de Taiwan. Trinta anos depois, o PTT continua a receber dezenas de milhares de utilizadores por dia; é um fóssil vivo da cultura da internet taiwanesa.

Tu foi depois para a Microsoft, onde participou no desenvolvimento da assistente de voz Cortana. Em abril de 2017, deixou o alto salário do Vale do Silício e regressou a Taiwan para fundar o «Taiwan AI Labs» (Laboratório de IA de Taiwan), a primeira instituição de investigação em IA sem fins lucrativos e aberta da Ásia[^11].

A motivação era direta: Taiwan tem talento de software de nível mundial, mas esse talento vai todo para o Vale do Silício. Ele queria criar uma plataforma onde quem quisesse voltar ou ficar tivesse onde fazer investigação em IA.

O produto mais conhecido do Taiwan AI Labs é o «Yating Transcript» (雅婷逐字稿), um sistema de reconhecimento de voz otimizado para chinês tradicional e sotaques de Taiwan. Durante a pandemia de COVID-19, o laboratório desenvolveu ainda ferramentas de deteção de desinformação e IA médica baseada em aprendizagem federada[^N12]. O ponto comum destes projetos: resolvem problemas locais de Taiwan, com dados locais, em vez de traduzir modelos americanos para os usar.

A história de Tu, do PTT ao AI Labs, é, em certa medida, o espelho do desenvolvimento de software em Taiwan: não falta capacidade técnica, falta o ecossistema que faça o talento ficar.

> 💡 **Sabia que?**
>
> Em 1986, ano em que Hinton publicou o backpropagation, o PIB de Taiwan era de cerca de 77,9 mil milhões de USD, o PIB per capita de 4.007 USD, e o Parque Científico de Hsinchu funcionava há seis anos[^N11]. Três factos no mesmo planeta, ao mesmo tempo, mas foi preciso esperar 26 anos, até ao dataset ImageNet, para que estas linhas históricas se cruzassem. A escala temporal da investigação fundamental é sempre mais longa do que a que a narrativa industrial sente.

---

## AlphaFold: a outra metade do Nobel para o enigma de 50 anos do dobramento de proteínas

A história do Nobel da Química de 2024 começa com uma pergunta de 1972.

Nesse ano, o bioquímico americano Christian Anfinsen, no discurso de aceitação do Nobel da Química, formulou uma hipótese: a estrutura tridimensional de dobramento de uma proteína é inteiramente determinada pela sua sequência de aminoácidos[^N12]. Se a hipótese fosse verdadeira, bastaria ver uma sequência de aminoácidos para calcular a estrutura 3D correspondente. Mas esse «deveria» manteve-se por meio século sem se concretizar. O dobramento de proteínas foi chamado _grand challenge_. A comunidade organiza a cada dois anos o concurso CASP, comparando previsões com estruturas experimentais; desde a primeira edição em 1994, passaram-se 13 edições sem que ninguém conseguisse romper a barreira[^N13].

Até 2018, no CASP13, a DeepMind inscreveu a primeira geração do AlphaFold e venceu, mas a precisão ainda não era utilizável. O verdadeiro ponto de viragem foi 30 de novembro de 2020, no CASP14: o AlphaFold 2 apresentou uma mediana GDT de 92,4[^N13]. GDT 92,4 significa que mais de metade das previsões tinham desvio atómico inferior a um angstrom em relação ao valor experimental, atingindo resolução experimental. O organizador do CASP, John Moult, disse nesse dia: «Em grande medida, este problema está resolvido»[^N13].

Um enigma de 50 anos, resolvido em seis anos por uma equipa de investigação de Londres.

A aceleração continuou. Em julho de 2021, o código do AlphaFold 2 foi aberto; no mesmo ano, a DeepMind e o Laboratório Europeu de Biologia Molecular (EMBL-EBI) criaram uma base de dados pública com as estruturas previstas. Em julho de 2022, esta base cobria 1 milhão de espécies e cerca de 200 milhões de estruturas proteicas, ou seja, praticamente todos os modelos 3D de proteínas conhecidas na Terra, libertados gratuitamente[^N14].

A 8 de maio de 2024, a DeepMind publicou na _Nature_ o AlphaFold 3, alargando a previsão de proteínas isoladas para interações entre proteínas, DNA, RNA, ligantes e iões[^N15]. Da descoberta de fármacos ao desenho de vacinas e engenharia enzimática, todos os campos que precisam de saber como as moléculas se encaixam viram as suas bases reescritas por esta ferramenta.

Demis Hassabis, criador do AlphaFold, não é um bioquímico tradicional. Aos quatro anos começou a jogar xadrez, aos 13 já era mestre; aos 17, em 1994, co-desenvolveu com Peter Molyneux o jogo de simulação _Theme Park_, que vendeu milhões[^N16]. Em 2010 fundou a DeepMind em Londres com Shane Legg e Mustafa Suleyman; em 2014 foi comprada pela Google por 400 milhões de libras[^N16]. 2016: AlphaGo vence Lee Sedol; 2020: AlphaFold 2; 2024: Nobel — três marcos em menos de dez anos.

O fio condutor é a mesma aposta: usar redes neuronais para resolver problemas que o cérebro humano não conseguia resolver sozinho. O Go tem regras fechadas; o dobramento de proteínas tem regras abertas, mas fortes constrições físicas. Hassabis escolheu bem os dois campos de batalha.

Em Taiwan, durante o mandato do presidente da Academia Sinica, James C. Liao (翁啟惠) (2006-2016), foi criado o centro de investigação de glicobiologia e estrutura de proteínas, o investimento académico taiwanês mais próximo desta frente[^N17]. O Instituto de Ciências Biomédicas e o Instituto de Bioquímica da Academia Sinica têm equipas a usar os pesos abertos do AlphaFold para investigação a jusante. Mas desenvolvimento de modelos nucleares ao nível do AlphaFold, Taiwan não tem, por enquanto, estrutura correspondente.

> ⚠️ **Ponto de controvérsia**
>
> O Nobel da Química para o AlphaFold gerou debate na academia: alguns biólogos estruturais acham que o prémio devia ir para quem fez as experiências-chave de difração de raios X ou ressonância magnética nuclear, não para elevar uma ferramenta computacional ao panteão da química[^N18]. Outros consideram que o próprio debate está ultrapassado — quando um algoritmo consegue, em cinco anos, ajudar a humanidade a completar as estruturas 3D de quase todas as proteínas da Terra, isso _é_ química. As duas posições tenderam, após outubro de 2024, para a segunda, mas a tensão que representam não desapareceu: à medida que a IA alarga o que consegue fazer, as fronteiras das disciplinas tradicionais devem ser redesenhadas?

---

## TAIDE: por que precisa Taiwan do seu próprio modelo de linguagem

Em abril de 2023, meio ano após o ChatGPT varrer o mundo, o Conselho Nacional de Ciência e Tecnologia (NSTC, 國科會) de Taiwan lançou o projeto «TAIDE», acrónimo de Trustworthy AI Dialogue Engine (Motor de Diálogo de IA Confiável)[^13].

Por que precisa uma nação insular de 23 milhões de pessoas de fazer o seu próprio modelo de linguagem de grande escala?

A razão não é apenas autonomia tecnológica. O chinês tradicional representa uma fatia ínfima dos dados de treino globais de IA; a maior parte dos dados em chinês vem de sites em chinês simplificado. Quando taiwaneses usam o ChatGPT ou outros modelos, as respostas trazem frequentemente hábitos linguísticos e pressupostos de visão de mundo da China continental. «視頻» em vez de «影片», «質量» em vez de «品質» — diferenças aparentemente subtis, mas que tocam a subjetividade cultural. A _CommonWealth Magazine_ (天下雜誌) titulou diretamente: «Prevenir a invasão cultural da IA chinesa» ao noticiar o TAIDE[^14].

Em abril de 2024, a equipa TAIDE lançou a versão comercial TAIDE-LX-7B e a versão académica TAIDE-LX-13B, com bom desempenho em escrita, tradução e resumo[^15]. Em 2026, saiu o TAIDE 2.0, juntando-se o modelo Breeze-8B apoiado pela MediaTek, e o ecossistema de LLM de Taiwan passou da fase de «perseguição» para a de «utilizável»[^16].

Mais interessante é a floração na camada de aplicações. A Universidade Nacional Chung Hsing usou o TAIDE para criar o sistema de recuperação de conhecimento agrícola «Shennong TAIDE»; a Universidade Nacional de Tainan desenvolveu um chatbot Taiwanês-Inglês para ensino de taiwanês; a Universidade Nacional Yang Ming Chiao Tung treinou versões do TAIDE em taiwanês e hakka[^17]. Estas aplicações provam uma coisa: o modelo de linguagem é simultaneamente produto tecnológico e veículo cultural. Uma IA que não entenda «oferta ao Imperador Jade» (天穿日) nem «procissão de Mazu» (媽祖遶境) não pode servir verdadeiramente os taiwaneses.

Contudo, a escala do TAIDE continua pequena: 8B parâmetros na versão comercial e 13B na académica, dois a três ordens de grandeza abaixo do GPT-4 (estimado em mais de 1 bilião de parâmetros). Por trás desta diferença está o orçamento de GPUs, não a capacidade. Treinar um LLM de fronteira custa centenas de milhões de dólares em computação, valor comparável ao orçamento anual de um instituto nacional de investigação.

---

## A cibersegurança de IA forjada sob ataque

Taiwan é um dos países mais atacados do mundo em ciberespaço. Esta infeliz realidade gerou, inadvertidamente, uma indústria robusta de cibersegurança baseada em IA.

A CyCraft (奧義智慧), fundada no final de 2017, foi a primeira empresa taiwanesa a combinar IA com monitorização de endpoints. A sua tecnologia foi incluída sete vezes em relatórios da Gartner; é o único fornecedor taiwanês a passar três vezes pela avaliação autoritativa MITRE ATT&CK dos EUA[^18]. Em fevereiro de 2026, a CyCraft listou-se no board de inovação da Bolsa de Taiwan, tornando-se a primeira empresa original de software de cibersegurança de IA com capacidade de I&D de nível internacional no mercado de capitais taiwanês[^19].

Os clientes da CyCraft incluem agências governamentais, unidades de defesa, bancos e empresas de semicondutores — precisamente os alvos preferidos de hackers de nível estatal. A empresa tem subsidiárias no Japão e em Singapura, exportando para toda a Ásia-Pacífico a «experiência real de combate forjada sob ataque».

Este caso ilustra uma coisa: a vantagem de Taiwan em IA não vem só dos semicondutores, mas também da capacidade de combate real temperada pela sua posição geopolítica única.

---

## Política: do «Ano Inaugural da IA» ao Ministério do Desenvolvimento Digital

O desenvolvimento da política de IA em Taiwan pode ser lido em três marcos.

2017-2018: fase inicial. O Yuan Executivo declarou 2017 «Ano Inaugural da IA», apresentou o conceito de «Pequeno País, Grande Estratégia para IA», reconhecendo o mercado pequeno, mas enfatizando três trunfos: fabrico de semicondutores, cadeia de fornecimento TIC e talento em ciências e engenharia. Em 2018 arrancou a primeira fase do «Plano de Ação de IA de Taiwan», com investimento superior a 40 mil milhões de novos dólares taiwaneses em quatro anos, com destaque para a infraestrutura de computação «Taiwan AI Cloud» (TWCC)[^20].

2022: institucionalização. Criação do Ministério do Desenvolvimento Digital (moda), integrando assuntos digitais antes dispersos pelo Ministério da Ciência e Tecnologia, Ministério da Economia e Ministério dos Transportes. O significado: a política de IA deixou de ser «projeto do Ministério da Ciência» para se tornar «estratégia nacional transversal». No mesmo ano, o governo publicou as «Diretrizes para Investigação e Desenvolvimento em Inteligência Artificial», enfatizando princípios como centralidade no ser humano, transparência e explicabilidade, equidade e não discriminação.

2023 até hoje: viragem para IA generativa. O choque do ChatGPT forçou uma guinada na política. Lançamento do projeto TAIDE, impulso à lei-quadro de IA, aceleração da adoção de IA no setor público. A estratégia de Taiwan é pragmática: não compete com EUA e China em volume de artigos de investigação fundamental, mas encaixa a IA nas vantagens de fabrico já existentes. Manufatura inteligente, imagiologia médica, previsão de yield de semicondutores — são áreas onde Taiwan tem dados, cenários e competitividade.

O problema é que as listas de laureados dos dois Nobéis de outubro de 2024 não incluem nenhum nome vindo desta rota de «manufatura inteligente».

---

## Ansiedade: o fosso de software do império de hardware

Por trás dos números brilhantes, o desenvolvimento de IA em Taiwan tem um problema estrutural: desequilíbrio severo entre hardware e software.

Taiwan produz 90% dos servidores de IA do mundo e a maior parte dos chips de IA, mas no desenvolvimento de modelos de IA, ecossistema de dados, software de plataforma — os elos «suaves» — a presença é baixa. Nos 20 maiores modelos de IA globais, incluindo GPT, Claude, Gemini, LLaMA, nenhum vem de Taiwan. Confrontando com o trabalho laureado nos dois Nobéis de 2024 — da Hopfield Network ao backpropagation e ao AlphaFold —, as três linhas estão longe da indústria taiwanesa.

A causa é a velha questão numa nova versão. Quando engenheiros da TSMC ganham salários anuais acima de 2 milhões de novos dólares taiwaneses, startups de software dificilmente competem pelo melhor talento. Google, Microsoft, NVIDIA têm centros de I&D em Taiwan; salários e benefícios criam forte efeito de aspiração. A primeira escolha de um recém-licenciado em Engenharia Informática da NTU costuma ser empresa estrangeira ou TI da TSMC, não uma startup local de IA.

O desafio mais fundo são os dados. O valor dos modelos de IA vem dos dados de treino, e o volume de dados de alta qualidade em chinês tradicional é ínfimo comparado com inglês ou chinês simplificado. Os 23 milhões de taiwaneses produzem, por natureza, menos texto que o mundo anglófono ou a China continental. O projeto TAIDE tenta resolver isto, mas a desvantagem de escala dos dados é estrutural.

A verdadeira aposta de Taiwan em IA assenta em aplicações verticais, não em modelos fundamentais: em vez de confronto frontal com OpenAI ou Google em modelos gerais, Taiwan escolhe encontrar posição insubstituível em IA para processos de semicondutores, IA em imagiologia médica, IA de cibersegurança, PLN em chinês tradicional. Nestes domínios, Taiwan tem vantagem única de dados e cenários, difíceis de replicar por outros.

---

## As escolhas de IA de uma ilha

Em 2026, Taiwan está numa posição única: nunca foi tão indispensável na cadeia de fornecimento de hardware de IA, mas continua na margem do ecossistema de software de IA.

Isso não é inteiramente mau. Historicamente, o modelo de sucesso de Taiwan sempre foi «não ser a marca, ser a marca por trás da marca». O modelo de fundição pura inventado por Morris Chang em 1987 fez da TSMC uma das dez maiores empresas por capitalização bolsista. Hoje, a mesma lógica repete-se na indústria de servidores de IA: a Foxconn não faz modelos de IA, mas todos os modelos de IA do mundo correm em servidores montados pela Foxconn.

Mas as regras do jogo na era da IA podem ser diferentes. Quando o centro de gravidade do valor desliza do hardware para software e dados, a margem de lucro de quem só faz fundição será comprimida. Os dois Nobéis de 2024 foram todos para gente da camada de software. Hopfield escreveu modelo matemático; Hinton escreveu algoritmo de treino; Hassabis escreveu método de resolução biológica. Todos correm em hardware feito em Taiwan, mas as medalhas não foram para o hardware.

Taiwan precisa, sobre a base da hegemonia de hardware, fazer crescer capacidade de software e dados: o hardware continua a ser o chassis, a nova camada de valor empilha-se por cima. TAIDE é uma tentativa, CyCraft é uma tentativa, Taiwan AI Labs é uma tentativa. O ponto comum: não procuram fazer «a maior IA do mundo», mas «a IA que melhor entende Taiwan».

Há 42 anos, quando Hopfield escreveu aquelas 12 páginas em Princeton, ninguém sabia que se tornariam a base matemática dos modelos de memória da humanidade atual. Há 50 anos, quando Anfinsen formulou a hipótese do dobramento de proteínas no discurso do Nobel, ninguém previu que se teria de esperar até àquela tarde de 2020 para que um grupo de londrinos a resolvesse. A escala temporal da investigação fundamental é mais longa que qualquer Computex.

Aquele jantar no mercado de Ningxia é a posição acumulada por Taiwan nestes 42 anos. A próxima batalha não é na banca de omelete de ostras, mas em saber se Taiwan tem a coragem de deixar que algum aluno que agora esteja a programar num dormitório da NTU, daqui a vinte ou trinta anos, receba o Nobel que pertence a esta ilha.

---

**Leitura adicional**:

- [O ascenso da nação-ilha da IA: desenvolvimento e estratégia futura da inteligência artificial em Taiwan](/pt/technology/ai-development-in-taiwan) — versão inicial da narrativa de política, plano de ação de IA, cinco domínios estratégicos, como a montanha sagrada dos semicondutores se encaixa na revolução da IA.
- [Laboratório de Inteligência Artificial de Taiwan](/pt/technology/taiwan-ai-labs) — percurso completo de Ethan Tu, do PTT ao AI Labs, ecossistema de modelos de linguagem open source TAIDE / TAME / FedGPT.
- [Escola de Inteligência Artificial de Taiwan](/pt/technology/taiwan-ai-academy) — aquela chamada não completada, e os 1,8 mil milhões angariados por Chen Sheng-wei (陳昇瑋) para criar a academia militar de IA: oito anos, mais de dez mil alumni na história de formação de talento.
- [O quotidiano da IA em Taiwan](/pt/technology/taiwan-ai-in-daily-life) — registo documental da entrada da IA generativa no quotidiano taiwanês, do pedido em loja de conveniência à revisão em lote pela Administração de Seguro de Saúde, observação a nível de cenário.
- [Empresa de Taiwan: TSMC](/pt/economy/tsmc) — líder global de fundição de wafers, núcleo do fabrico de chips de IA, do modelo de fundição pura de Morris Chang à história do encapsulamento avançado.
- [Indústria de semicondutores](/pt/technology/taiwan-semiconductor-industry) — do design de IC ao encapsulamento e teste, panorama completo do ecossistema de semicondutores de Taiwan.
- [Desenvolvimento da indústria de cibersegurança de Taiwan](/pt/technology/taiwan-cybersecurity-industry-development) — como a pressão geopolítica gerou uma indústria de cibersegurança de IA de nível Ásia-Pacífico.

---

## Fontes das imagens

Este artigo utiliza 4 imagens de domínio público / licença CC, todas em cache em `public/article-images/technology/` para evitar hotlink dos servidores de origem:

- [Estructura tridimensional de la proteïna CBLN1 per AlphaFold amb codificació rainbow](https://commons.wikimedia.org/wiki/File:Estructura_tridimensional_de_la_prote%C3%AFna_CBLN1_per_AlphaFold_amb_codificaci%C3%B3_rainbow.png) — hero, estrutura 3D da proteína CBLN1 prevista pelo AlphaFold, codificação de cores rainbow N→C terminal. Foto: BQUB25-UPoch (trabalho próprio, AlphaFold + PyMOL), 2025-11-15, CC BY 4.0.
- [Geoffrey E. Hinton, 2024 Nobel Prize Laureate in Physics (3x4 cropped)](<https://commons.wikimedia.org/wiki/File:Geoffrey%5FE.%5FHinton,%5F2024%5FNobel%5FPrize%5FLaureate%5Fin%5FPhysics%5F(3x4%5Fcropped).jpg>) — inline, retrato oficial de Hinton na semana do Nobel 2024. Foto: Arthur Petron, 2024-12-08, CC BY-SA 4.0.
- [John J. Hopfield, 2024 Nobel Prize Laureate in Physics 1 (cropped)](<https://commons.wikimedia.org/wiki/File:John_J._Hopfield,_2024_Nobel_Prize_Laureate_in_Physics_1_(cropped).jpg>) — inline, retrato oficial de Hopfield na semana do Nobel 2024. Foto: Arthur Petron, 2024-12-08, CC BY-SA 4.0.
- [TSMC Fab 5](https://commons.wikimedia.org/wiki/File:TSMC_Fab_5.jpg) — inline, fábrica Fab 5 da TSMC em Hsinchu, local físico de fabricação de chips de IA. Foto: Wikimedia Commons (cache existente).

## Referências

[^1]: [Tom's Hardware: Semiconductor legends take a stroll in a Taiwanese night market](https://www.tomshardware.com/tech-industry/semiconductor-legends-take-a-stroll-in-a-taiwanese-night-market-nvidia-tsmc-mediatek-and-quanta-heads-seen-eating-dinner) — reportagem de 29 de maio de 2024 sobre a cena no mercado de Ningxia, regista Huang, Chang, Lam e Tsai a jantar juntos.

[^2]: [Taiwan News: Nvidia CEO calls Taiwan 'one of the most important countries in the world'](https://www.taiwannews.com.tw/news/5880054) — declaração pública de Huang durante visita a Taiwan, 30-05-2024.

[^3]: [Wikipedia: Jensen Huang](https://en.wikipedia.org/wiki/Jensen_Huang) — dados biográficos: Huang nascido em 1963 em Taipé, infância em Tainan, emigrou aos nove anos para os EUA.

[^4]: [Klover.ai: TSMC AI Fabricating Dominance](https://www.klover.ai/tsmc-ai-fabricating-dominance-chip-manufacturing-leadership-ai-era/) — Todos os GPUs avançados da NVIDIA (A100, H100, série Blackwell) são fabricados pela TSMC. Ver

[^5]: [SQ Magazine: AI Chip Statistics 2025](https://sqmagazine.co.uk/ai-chip-statistics/) — fonte do dado de 72% de quota de receita de fundição da TSMC em 2025; ver também reportagem contemporânea do Motley Fool.

[^6]: [PatentPC: The AI Chip Market Explosion](https://patentpc.com/blog/the-ai-chip-market-explosion-key-stats-on-nvidia-amd-and-intels-ai-dominance) — fonte do dado de 86% de quota de mercado de GPUs de IA da NVIDIA.

[^7]: [Tech-Now: Taiwan Leads Global AI Server Shift, Surpassing iPhones in 2025](https://tech-now.io/en/blogs/taiwans-ai-server-revolution-how-foxconn-and-odms-redefined-global-tech-leadership-in-2025) — dado de 90% de expedição global de servidores de IA por Foxconn, Quanta e Wistron.

[^8]: [DigiTimes: Foxconn, Wistron, Quanta to sustain trillion-dollar revenue on AI server in 2026](https://www.digitimes.com/news/a20260109PD249/revenue-ai-server-foxconn-wistron-quanta.html) — reportagem sobre receita anual acima de um bilião das três ODMs, servidores de IA superam eletrónica de consumo.

[^9]: [36Kr: Who Will Divide Up the CoWoS Production Capacity in 2026?](https://eu.36kr.com/en/p/3580962946874242) — procura da NVIDIA por wafers CoWoS de 595 mil unidades, 60% do total global.

[^10]: [NVIDIA Newsroom: Foxconn Builds AI Factory in Partnership With Taiwan and NVIDIA](https://nvidianews.nvidia.com/news/foxconn-builds-ai-factory-in-partnership-with-taiwan-and-nvidia) — caso de cooperação da fábrica de IA de 100 MW em Kaohsiung; ver também reportagem da CNBC sobre capacidade de 100 MW.

[^11]: [Site oficial do Taiwan AI Labs: Sobre nós](https://ailabs.tw/zh/關於我們/) — introdução oficial: Tu fundou PTT na NTU em 1995, regressou a Taiwan em abril de 2017 para fundar Taiwan AI Labs.

[^12]: [TechNews: Talento de IA em Taiwan, ficar ou ir? Entrevista exclusiva com Ethan Tu, fundador do Taiwan AI Labs](https://finance.technews.tw/2025/08/18/taiwan-ai-labs-ethan/) — apresentação de projetos nucleares como Yating Transcript, IA médica com aprendizagem federada.

[^13]: [Yuan Executivo: Aperfeiçoar a infraestrutura de IA de Taiwan — construir o motor de diálogo de IA confiável TAIDE](https://www.ey.gov.tw/Page/5A8A0CB5B41DA11E/582206fe-26fc-4184-b911-aa6e4569ff3e) — explicação oficial do lançamento do projeto TAIDE em abril de 2023.

[^14]: [CommonWealth Magazine: «Prevenir a invasão cultural da IA chinesa» — o primeiro modelo de linguagem em chinês tradicional de Taiwan, TAIDE, o que pode fazer?](https://www.cw.com.tw/article/5129076) — reportagem temática sobre TAIDE, fonte do discurso de subjetividade cultural do LLM em chinês tradicional.

[^15]: [Comunicado do NSTC: TAIDE tem resultados em um ano, colaboração público-privada impulsiona modelo de linguagem de grande escala com características de Taiwan](https://www.nstc.gov.tw/folksonomy/detail/dd2d9d72-8f7b-44dd-976c-438d5ce683af?l=ch) — lançamento em abril de 2024 das versões comercial TAIDE-LX-7B e académica 13B.

[^16]: [CloudInsight: Estado do desenvolvimento de LLM em Taiwan 2026](https://cloudinsight.cc/en/blog/taiwan-llm) — inventário completo do ecossistema de LLM de Taiwan: TAIDE 2.0, Breeze-8B, etc.

[^17]: Idem, relatório CloudInsight. Casos de aplicação: «Shennong TAIDE» da Universidade Chung Hsing, chatbot Taiwanês-Inglês da Universidade de Tainan, modelos TAIDE em taiwanês e hakka da Yang Ming Chiao Tung.

[^18]: [CIO Taiwan: Roteiro da indústria de cibersegurança de Taiwan — CyCraft](https://www.cio.com.tw/taiwanese-ahn-an-smart-technology/) — detalhe das sete inclusões no Gartner e três aprovações no MITRE ATT&CK da CyCraft.

[^19]: [Site oficial da CyCraft: Estreia no board de inovação, rei da cibersegurança de IA! CyCraft lista-se hoje](https://www.cycraft.com/news/taiwans-first-ai-cybersecurity-stock-20260205) — comunicado de 5 de fevereiro de 2026 sobre listagem no board de inovação.

[^20]: [NSTC: Estratégia de investigação em IA](https://www.nstc.gov.tw/folksonomy/detail/dbf8da09-22be-4ef1-8294-8832fc6e8a26?l=ch) — arquitetura de política: orçamento de 40 mil milhões do primeiro plano de ação de IA de Taiwan, construção do TWCC, etc.

[^N1]: [Comunicado de imprensa do Nobel da Física 2024](https://www.nobelprize.org/prizes/physics/2024/press-release/) — anúncio formal de 8 de outubro de 2024 pela Real Academia Sueca de Ciências. Texto original: «The Royal Swedish Academy of Sciences has decided to award the Nobel Prize in Physics 2024 to John J. Hopfield and Geoffrey Hinton 'for foundational discoveries and inventions that enable machine learning with artificial neural networks.'» Prémio de 11 milhões de coroas suecas, dividido entre os dois.

[^N2]: [Comunicado de imprensa do Nobel da Química 2024](https://www.nobelprize.org/prizes/chemistry/2024/press-release/) — anúncio de 9 de outubro de 2024. Prémio de 11 milhões de coroas suecas, metade para David Baker «for computational protein design», outra metade partilhada por Demis Hassabis e John Jumper «for protein structure prediction».

[^N3]: [PNAS, 79(8), 2554-2558](https://www.pnas.org/doi/10.1073/pnas.79.8.2554) — Hopfield, J. J. (1982). "Neural networks and physical systems with emergent collective computational abilities."

[^N4]: [Nature, 323, 533-536](https://www.nature.com/articles/323533a0) — Rumelhart, D. E., Hinton, G. E., & Williams, R. J. (1986). "Learning representations by back-propagating errors."

[^N5]: [NeurIPS 2012 / NIPS Proceedings](https://papers.nips.cc/paper/2012/hash/c399862d3b9d6b76c8436e924a68c45b-Abstract.html) — Krizhevsky, A., Sutskever, I., & Hinton, G. E. (2012). "ImageNet Classification with Deep Convolutional Neural Networks."

[^N6]: [PanSci: Nobel da Física 2024 — Hopfield e Hinton abriram a era da aprendizagem automática com redes neuronais artificiais](https://pansci.asia/archives/378242) — Content Curation Partner per MOU 2026-05-05. Abrange contexto da Hopfield Network, analogia spin glass, citações acumuladas, ligação matemática com aprendizagem profunda contemporânea.

[^N7]: [The Guardian: Nobel physics prize 2024 winner John Hopfield warns of AI dangers](https://www.theguardian.com/science/2024/oct/08/nobel-prize-physics-2024-john-hopfield-geoffrey-hinton-ai-machine-learning) — reportagem de 08-10-2024 sobre entrevista telefónica do Nobel da Física, Hopfield e Hinton alertam no mesmo dia para riscos de IA.

[^N8]: [Wikipedia: Geoffrey Hinton](https://en.wikipedia.org/wiki/Geoffrey_Hinton) — Hinton nascido a 6 de dezembro de 1947 em Wimbledon, Londres; março de 2013 Google compra DNNresearch por 44 milhões de USD e integra Hinton.

[^N9]: [BBC News: AI 'godfather' Geoffrey Hinton warns of dangers as he quits Google](https://www.bbc.com/news/world-us-canada-65452940) — 01-05-2023 Hinton sai da Google e expressa à BBC preocupação com riscos de IA. Texto original «I left so that I could talk about the dangers of AI without considering how this impacts Google», «a part of me now regrets my life's work». Detalhes da entrevista ao NYT também citados nesta reportagem.

[^N10]: [Nature: AI scientist Geoffrey Hinton wins Nobel prize for physics](https://www.nature.com/articles/d41586-024-03213-8) — descrição detalhada da Nature sobre a cerimónia do Nobel da Física 2024 e entrevista telefónica de Hinton.

[^N11]: [Wikipedia: Economic history of Taiwan](https://en.wikipedia.org/wiki/Economic_history_of_Taiwan) — dados do PIB de Taiwan em 1986; Parque Científico de Hsinchu criado em dezembro de 1980.

[^N12]: [Science, 181(4096), 223-230](https://www.science.org/doi/10.1126/science.181.4096.223) — Anfinsen, C. B. (1973). "Principles that govern the folding of protein chains."

[^N13]: [Nature: 'It will change everything': DeepMind's AI makes gigantic leap in solving protein structures](https://www.nature.com/articles/d41586-020-03348-4) — reportagem de 30-11-2020 sobre resultados do CASP14, AlphaFold 2 mediana GDT 92,4, comentário do organizador John Moult «in some sense the problem is solved».

[^N14]: [DeepMind: AlphaFold reveals the structure of the protein universe](https://www.deepmind.com/blog/alphafold-reveals-the-structure-of-the-protein-universe) — anúncio de 28-07-2022: base de dados de estruturas proteicas do AlphaFold cobre 1 milhão de espécies, cerca de 200 milhões de estruturas.

[^N15]: [Abramson, J., Adler, J., Dunger, J. et al. (2024). Accurate structure prediction of biomolecular interactions with AlphaFold 3. Nature 630, 493-500](https://www.nature.com/articles/s41586-024-07487-w) — publicação de 8 de maio de 2024 do AlphaFold 3, alargado a previsão de complexos proteína-DNA/RNA/ligante/iões.

[^N16]: [Wikipedia: Demis Hassabis](https://en.wikipedia.org/wiki/Demis_Hassabis) — Hassabis: xadrez aos 4 anos, mestre aos 13; aos 17 (1994) co-desenvolveu _Theme Park_ com Peter Molyneux; 2010 fundou DeepMind em Londres; 2014 Google compra por ~400 milhões de libras.

[^N17]: [Centro de Investigação Genómica da Academia Sinica](https://www.genomics.sinica.edu.tw/) — centro de investigação de estrutura de glicoproteínas criado durante mandato do presidente James C. Liao (2006-2016).

[^N18]: [PanSci: Nobel da Química 2024 — David Baker, Demis Hassabis, John Jumper resolveram enigma do dobramento de proteínas](https://pansci.asia/archives/378388) — Content Curation Partner per MOU 2026-05-05. Abrange controvérsia do Nobel da Química para AlphaFold, discussão de fronteiras disciplinares entre biologia estrutural e química computacional.

[^N19]: [PanSci: AlphaFold 3 prevê interações de proteínas com outras moléculas, desenvolvimento de fármacos sobe de nível](https://pansci.asia/archives/377917) — Content Curation Partner per MOU 2026-05-05. Análise de impacto a jusante do AlphaFold 3 em desenvolvimento de fármacos e engenharia enzimática.

[^N20]: [PanSci: «Cérebro artificial» OI desafia IA — tecido cerebral em placa de Petri pode substituir chips de silício?](https://pansci.asia/archives/366027) — Content Curation Partner per MOU 2026-05-05. Investigação de organoides cerebrais de Thomas Hartung em Johns Hopkins, como direção alternativa de computação fora da via IA.
