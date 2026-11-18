---
title: 'BIM e tecnologia da construção em Taiwan: doze anos de adaptação caso a caso promovida pelo governo, reescritos por um protocolo de dezoito meses'
description: 'Em 23 de maio de 2014, a Comissão de Construção Pública do Yuan Executivo lançou a “Plataforma de Promoção do Uso de BIM em Obras Públicas”, adotando a diretriz de “adaptação caso a caso e avanço gradual”. Onze anos e sete meses depois, um desenvolvedor taiwanês que trabalhava em Tóquio publicou no GitHub um repositório chamado REVIT_MCP_study, que alcançou mais de setenta estrelas e oitenta forks. Nos doze anos entre esses dois momentos, o setor de arquitetura de Taiwan percorreu um longo caminho: do desenho manual e das cópias heliográficas aos modelos 3D, de experiências isoladas a padrões nacionais e da atualização de ferramentas à redefinição profissional.'
date: 2026-05-22
category: 'Technology'
tags:
  [
    'Tecnologia',
    'BIM',
    'Modelagem da Informação da Construção',
    'Tecnologia da construção',
    'Arquitetura',
    'Transformação digital',
    'Revit',
    'MCP',
    'IA',
    'CTCI',
    'CECI Engineering Consultants',
    'Shuotao',
  ]
subcategory: '建築科技'
author: 'Taiwan.md'
featured: true
lastVerified: 2026-05-22
lastHumanReview: false
readingTime: 22
researchReport: 'reports/research/2026-05/台灣BIM與營建科技.md'
image: '/article-images/technology/freecad-bim-example-2024.webp'
imageCredit: 'Maxwxyz via Wikimedia Commons'
imageLicense: 'CC BY 4.0'
imageSource: 'https://commons.wikimedia.org/wiki/File:FreeCAD_1.0_Dark_BIM_Example.png'
curation: 'incubating'
curationReason: 'unverified'
translatedFrom: 'Technology/台灣BIM與營建科技.md'
sourceCommitSha: 'b1a5fea00'
sourceContentHash: 'sha256:85f9d09627902abf'
sourceBodyHash: 'sha256:c4a7f62bbc68876d'
translatedAt: '2026-11-18T02:53:06.323625+00:00'
---

# BIM e tecnologia da construção em Taiwan: doze anos de adaptação caso a caso promovida pelo governo, reescritos por um protocolo de dezoito meses

![Captura de tela da plataforma aberta de trabalho BIM do FreeCAD 1.0 em tema escuro, com o modelo 3D de um edifício de demonstração ao centro, um painel à esquerda listando as camadas de cada especialidade — estrutura, instalações e envoltória — e, na parte inferior, o conjunto de comandos próprio do BIM Workbench; a imagem reflete a essência da transformação digital da engenharia promovida pelo BIM ao sistematizar as informações de um edifício](/article-images/technology/freecad-bim-example-2024.webp)
_Arquivo de demonstração do BIM Workbench do FreeCAD 1.0 em tema escuro. Foto: Maxwxyz, 2024-10-07. [Licença via Wikimedia Commons](https://commons.wikimedia.org/wiki/File:FreeCAD_1.0_Dark_BIM_Example.png)._

> **Visão geral em 30 segundos:** Em 23 de maio de 2014, a Comissão de Construção Pública do Yuan Executivo lançou a “Plataforma de Promoção do Uso de BIM em Obras Públicas”[^1], com implementação em três etapas, segundo os princípios de “adaptação caso a caso e avanço gradual”; até hoje, seu uso não é obrigatório[^2]. No mesmo período, o Centro de Pesquisa BIM da Universidade Nacional de Taiwan ministrou seu primeiro curso, a Taiwan Building Information Modeling Association foi formalmente fundada[^3], o governo da cidade de Nova Taipé emitiu a primeira licença de construção baseada em BIM, o Departamento de Desenvolvimento Urbano de Taipé publicou normas para modelos de conclusão de obra[^4] e a BSI assinou um memorando de entendimento com o Taiwan BIM Task Group[^5]. Onze anos e sete meses depois, em 10 de dezembro de 2025, um desenvolvedor chamado CHIANG SHUOTAO publicou no GitHub o repositório `REVIT_MCP_study`, que alcançou 73 estrelas e 85 forks[^6]. Quatro meses mais tarde, em abril de 2026, a Autodesk anunciou que o Revit 2027 teria um servidor Model Context Protocol integrado[^7]. Entre os doze anos em que o governo não conseguiu impulsionar o BIM e os dezoito meses de um protocolo da Anthropic, ocorreu uma lenta redefinição profissional do setor da construção de Taiwan: do desenho à integração de sistemas.

---

## A “adaptação caso a caso” da Comissão de Construção Pública

Em 23 de maio de 2014, a Comissão de Construção Pública do Yuan Executivo criou algo chamado “Plataforma de Promoção do Uso de Modelagem da Informação da Construção (BIM) em Obras Públicas”[^1]. A diretriz anunciada no lançamento foi: “**adaptação caso a caso e avanço gradual**”.

Essa fórmula continuaria sendo citada por muitos anos.

A Comissão dividiu a estratégia em três etapas. A primeira, em 2014, consistia em “incentivar e selecionar projetos-piloto”: órgãos responsáveis por obras não arquitetônicas seriam convidados a realizar experiências, dando prioridade a contratos integrados julgados pela proposta mais vantajosa. A segunda, entre 2015 e 2016, seria de “execução e avaliação dos projetos-piloto”. A terceira previa “**promover, a partir de 2017, o uso da tecnologia BIM em obras públicas acima de determinado valor**”[^1].

No entanto, até 2026, esse limite de “determinado valor” ainda não havia se transformado em uma obrigação geral. A Comissão reiterava que “**caberia ao órgão responsável pela obra avaliar por conta própria a adoção da tecnologia BIM em projetos mais complexos ou de maior escala, segundo as necessidades de cada caso e sua capacidade de administrar o cumprimento contratual, em vez de impor uma regra geral e obrigatória**”[^2].

Hong Kong oferece o contraponto. Seu Departamento de Desenvolvimento já obrigava projetos com custo estimado superior a 30 milhões de dólares de Hong Kong a usar BIM[^8]. Em Taiwan, os verbos “incentivar”, “testar” e “avaliar por conta própria” se alternavam em cada relatório oficial.

Os dados públicos disponíveis até a data da pesquisa indicavam que, por meio da plataforma BIM da Comissão, “mais de 60 órgãos licitantes de obras passaram a usar a tecnologia BIM, em mais de 120 contratos”[^2]. Diante das mais de dez mil obras públicas realizadas anualmente em Taiwan, esse número é insignificante.

> **📝 Nota da curadoria**
> A explicação corrente afirma que “o governo não conseguiu promover o BIM porque o setor não acompanhou”. É uma narrativa conveniente, mas inverte a causalidade. **A sequência real é mais próxima desta: desde 2014, o governo decidiu não tornar o BIM obrigatório porque isso equivaleria a destruir o sustento de metade dos escritórios de arquitetura.** A adaptação caso a caso é um cálculo político: deixar a decisão nas mãos dos poucos órgãos “com capacidade para administrar o cumprimento contratual” e permitir que todos os demais continuem usando AutoCAD, sem interferir no trabalho de ninguém.

---

## Ministério do Interior, Taipé e Nova Taipé: três eixos sem sincronia

Enquanto a Comissão de Construção Pública promovia sua iniciativa, o Instituto de Pesquisa em Arquitetura e Edificações do Ministério do Interior (ABRI) promovia a própria.

Em 2015, o ABRI iniciou o “**Programa de Pesquisa, Promoção e Aplicação do Compartilhamento Integrado de Informações da Construção**”, um plano de médio prazo com quatro anos de duração. Em 2019, deu início a uma segunda fase, também de quatro anos[^9]. Seus dois grandes objetivos eram ambiciosos: “**modernização digital da tecnologia da construção**” e “**ambiente residencial digital**”; este último integraria BIM, GIS e IoT para criar cidades digitais[^10].

Mas o ABRI não é o órgão que executa o controle de edificações. Essa competência está nas mãos dos governos municipais e de condado.

Em 2014, **o governo da cidade de Nova Taipé emitiu a primeira licença de construção aprovada mediante análise de um modelo BIM**[^11]. No mesmo ano, publicou as “**Diretrizes para Entrega de Informações em Modelos BIM de Conclusão de Edifícios Públicos da Cidade de Nova Taipé**”. Em 2026, o “Sistema Informatizado de Verificação Assistida de Licenças de Construção” do município (bim.ntpc.gov.tw) já acumulava mais de vinte modelos BIM concluídos[^11].

Quatro anos depois, em 6 de novembro de 2018, **o Departamento de Desenvolvimento Urbano do governo de Taipé publicou as “Normas Operacionais para Dados de Propriedades de Modelos BIM de Conclusão de Obras Arquitetônicas Administradas pelo Departamento de Desenvolvimento Urbano do Governo de Taipé”**[^4]. As normas tomaram como referência o formato internacional COBie (Construction Operations Building Information Exchange), além de regras publicadas em 2015 pelo ABRI e no Reino Unido[^4]. Quando diferentes programas de modelagem BIM são usados, exige-se a exportação dos dados nos padrões **IFC** (Industry Foundation Classes, Classes de Fundação da Indústria, padrão internacional aberto elaborado pela buildingSMART International, ISO 16739-1:2024) e COBie[^4][^12].

> **💡 Você sabia?**
> O IFC é um padrão internacional aberto elaborado por uma organização sem fins lucrativos chamada buildingSMART International[^12] e não está vinculado à Autodesk nem a qualquer fornecedor específico. Sua lógica é semelhante à do PDF: permitir que modelos produzidos por diferentes programas — Revit, Archicad, Tekla e Navisworks — sejam trocados sem dificuldades. **Desde 2010, o governo da Dinamarca obriga projetos de infraestrutura pública a usar o formato IFC; Noruega, Finlândia e Singapura seguiram o exemplo**[^12]. Em Taiwan, foi apenas em 2018 que o governo local de Taipé incorporou o IFC às suas normas. O padrão internacional avançou uma década antes; Taiwan veio alcançá-lo aos poucos.

Os três eixos — governo central, Taipé e Nova Taipé — avançaram em calendários inteiramente distintos. Uma mesma estação de metrô poderia seguir, na etapa de projeto, as regras BIM do Departamento de Sistemas de Transporte Rápido de Taipé, incorporadas ao contrato integrado; na etapa da licença de construção, as normas do Departamento de Desenvolvimento Urbano de Taipé para modelos de conclusão de obra, no formato COBie; e, na operação e manutenção, ainda acabar em outra ferramenta de gestão de instalações.

“**Atualmente, a maior parte das aplicações de BIM pelo setor público se restringe às etapas de projeto e construção; sua aplicação também difere entre obras convencionais e contratos integrados, enquanto a operação e a gestão posteriores ainda seguem métodos tradicionais**”[^13] — é o que afirma o próprio relatório de resultados do ABRI.

---

## Linha Wanda, estação de Miaoli e Terminal 3 de Taoyuan: a estreia do BIM nas obras públicas

Em 2011, **a Linha Wanda do metrô de Taipé foi a primeira a incluir o BIM em um contrato de projeto de engenharia**[^14].

Esse é um dos “primeiros” mais citados na promoção do BIM em Taiwan. Os diferentes lotes da Linha Wanda adotaram, por exigência contratual, modelos BIM no projeto das estações, integrando simultaneamente arquitetura, estruturas e instalações eletromecânicas, com coordenação entre especialidades para **reduzir conflitos nas interfaces de projeto**[^14].

Depois da Linha Wanda, outras obras públicas vieram em sequência: a estação elevada Y19 da Linha Circular do metrô de Taipé, diversos centros esportivos em Nova Taipé, a nova estação de Miaoli da ferrovia de alta velocidade, o Terminal 3 do Aeroporto de Taoyuan e o VLT Circular de Kaohsiung. Cada projeto ganhou um estudo de caso publicado pelo ABRI, pelo NTUBIM da Universidade Nacional de Taiwan ou em periódicos internos dos departamentos metroviários.

A “**vitória em números**” mais citada é a estação de Miaoli da ferrovia de alta velocidade. O BIM foi introduzido três meses antes do início da obra, e a equipe de fiscalização encontrou diversos conflitos no modelo 3D, **economizando 20% dos custos posteriores de alterações de projeto e antecipando em dois meses o início da locação da obra**[^15].

O Terminal 3 do Aeroporto de Taoyuan é um caso de outra escala. Em março de 2021, **um consórcio formado pela Samsung C&T e pela RSEA Engineering venceu, por NT$ 44,5 bilhões, a licitação das obras civis do edifício principal do T3**[^16]. O projeto foi liderado pela CECI Engineering Consultants, em conjunto com Rogers Stirk Harbour + Partners e Ove Arup and Partners Hong Kong. A colaboração internacional dependia da circulação de modelos BIM entre diferentes escritórios — um exemplo emblemático recorrente nos materiais internos de treinamento da CECI[^17].

> **✦** O momento em que a Linha Wanda incorporou o BIM a um contrato pela primeira vez, em 2011, foi um divisor de águas silencioso na história das obras públicas de Taiwan. Desde aquele dia, nenhum grande projeto de metrô, aeroporto, ferrovia de alta velocidade ou VLT deixou de perguntar: “como faremos o BIM?”.

Mas esses são “projetos emblemáticos”. Todos os projetos emblemáticos de Taiwan têm um defeito em comum: **são poucos**.

---

## Cinco grandes consultorias de engenharia e duas organizações: quem está por trás

As pessoas que introduziram o BIM nas obras públicas têm nomes e rostos.

**CECI Engineering Consultants, Inc., Taiwan**: criada em 2007 como investimento da China Engineering Consultants, Inc. (CECI, fundada em 1969)[^18]. **Em 2010, foi uma das primeiras empresas do setor taiwanês a criar um centro de integração BIM**[^19]. Entre seus quase dois mil funcionários, 90% têm experiência em áreas como rodovias, ferrovias, portos, aeroportos, pontes, estruturas, túneis, metrôs, arquitetura, mecânica, eletricidade e controle de sistemas, BIM, ITS e PPP[^19].

**Sinotech Engineering Consultants**: fundada em 1970; após sua transformação em organização sem fins lucrativos, em 1994, investiu na criação da Sinotech Engineering Consultants, Ltd.[^20]. Mais tarde, a Sinotech converteu o BIM em algo chamado “**Sistema de Informações de Gestão de Projetos (PMIS)**”: baseado no conceito de ambiente comum de dados (CDE) da ISO 19650, contém sete módulos principais para integrar informações entre especialidades e projetos[^21].

**Evergreen Consulting Engineering, Inc. (EGC)**: fundada em 1974. Foi responsável pelo projeto estrutural do Taipei 101 e da T&C Tower de 85 andares, em Kaohsiung[^22]. **O CTBUH — Conselho de Edifícios Altos e Habitat Urbano — classifica a EGC entre as dez maiores consultorias estruturais de edifícios altos do mundo**[^22].

No meio acadêmico, há dois pontos fundamentais:

**Centro de Pesquisa em Simulação e Gestão da Informação em Engenharia Civil da Universidade Nacional de Taiwan (NTUBIM)**: criado em 2011 e dirigido pelo professor **Hsieh Shang-hsien**, do Departamento de Engenharia Civil. Um de seus acadêmicos cofundadores, o professor associado **Kuo Jung-chin**, publicou em dezembro de 2011 o artigo “**O desenvolvimento do BIM abala o atual sistema da arquitetura**”[^23], ainda hoje uma das primeiras referências da produção acadêmica taiwanesa sobre BIM. Mais tarde, o NTUBIM executou durante anos projetos encomendados pelo ABRI e pela Comissão de Construção Pública, liderando a elaboração das diretrizes taiwanesas de colaboração BIM e a tradução chinesa da ISO 19650.

**Taiwan Building Information Modeling Association (TBIMA)**: surgiu de encontros de entusiastas da tecnologia BIM realizados em 2009, começou a ser organizada em 2011 e foi **formalmente fundada em 10 de março de 2012** como associação registrada no Ministério do Interior[^3]. Seus principais membros vieram do grupo de instrutores treinados diretamente pela Autodesk Taiwan em 2008: a linhagem das organizações civis de BIM de Taiwan nasceu diretamente do círculo de instrutores certificados pela Autodesk.

> **📝 Nota da curadoria**
> Na cerimônia de assinatura do memorando de entendimento do Taiwan BIM Task Group, em 3 de outubro de 2018[^5], cinco participantes estavam à mesa: a filial taiwanesa da BSI — British Standards Institution —, o NTUBIM da Universidade Nacional de Taiwan, o Taiwan Construction Research Institute, o Taiwan Architecture & Building Center e a TBIMA. **O ABRI figurava como “órgão orientador”, e não como “signatário”** — uma disposição hierárquica reveladora. Ela indica que, em matéria de padrões internacionais de BIM, o governo reconhecia ser preferível deixar a liderança à academia e às organizações civis, permanecendo em segundo plano. A “**versão chinesa da ISO 19650**”[^24], publicada pela BSI no ano seguinte, foi uma pequena afirmação de soberania branda: Taiwan finalmente tinha sua própria tradução chinesa oficial do padrão internacional de BIM.

---

## Revit, Archicad e Tekla: a corrente subterrânea da hegemonia do software

![Captura de tela do Autodesk Revit 2024 mostrando uma parede divisória simples, com portas e janelas representadas como objetos em um espaço tridimensional; à esquerda aparece o painel de propriedades dos componentes e, no canto inferior direito, uma visualização sincronizada em tempo real de planta, elevação e corte, refletindo a natureza orientada a objetos da modelagem em software BIM](/article-images/technology/autodesk-revit-2024-bim-objects.webp)
_Demonstração de componentes BIM no Autodesk Revit 2024. Foto: DanielDefault, 2024. [Licença via Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Revit_2024.png)._

Entre em qualquer escritório taiwanês que tenha adotado BIM: em 90% dos casos, a tela inicial será a do Revit.

“**Em Taiwan, 90% dos arquitetos com capacidade de projetar em BIM usam Revit Architecture**” — o número aparece no site de um revendedor do Archicad[^25]. Embora provenha de uma única fonte, coincide com a percepção do setor: o Revit se aproxima de um monopólio no projeto arquitetônico em Taiwan.

O Archicad é desenvolvido pela empresa húngara Graphisoft e funciona em Mac e Windows. Seu projeto é mais intuitivo e sua curva de aprendizagem, mais acessível do que a do Revit, mas sua base de usuários em Taiwan é claramente menor[^26]. A distribuidora Lungting Information realizou muitas demonstrações no leste de Taipé e ouviu repetidamente dos projetistas: “Sei usar Revit; o escritório só tem licença do Revit”. É assim que os efeitos de escala consolidam o aprisionamento tecnológico.

A área de estruturas metálicas segue outro eixo. **O Tekla Structures — produto da Trimble, anteriormente chamado XSteel — é hoje o principal software de projeto de estruturas metálicas em Taiwan**[^27]. Sua capacidade de trabalhar com aço é amplamente reconhecida no setor taiwanês de edifícios altos, pontes, estádios e fábricas.

A infraestrutura — ferrovias, rodovias e túneis — tende, por sua vez, ao ecossistema MicroStation da Bentley Systems[^28]. CTCI, Sinotech e CECI usam o MicroStation em conjunto com OpenRoads e OpenBridge, da Bentley, em grandes contratos EPC integrados e projetos ferroviários internacionais.

Sobre esses programas dominantes rodam o Dynamo, da própria Autodesk, destinado à programação visual, e o pyRevit, uma estrutura aberta de extensões em Python. **No início de 2016, a Autodesk Taiwan trouxe de Singapura instrutores da equipe de desenvolvimento do Dynamo para ministrar cursos em Taiwan**[^29]. Desde então, a ferramenta ganhou destaque entre engenheiros BIM taiwaneses. Um cenário típico: um engenheiro de instalações escreve um script no Dynamo para ordenar automaticamente as coordenadas de todos os dutos, verificar o pé-direito livre e gerar cortes — algo que exigia um dia inteiro no CAD passa a ser concluído em poucos minutos[^30].

O palco da detecção de interferências pertence ao Autodesk Navisworks. O Navisworks Manage reúne navegação 3D, detecção de conflitos, exportação de relatórios, simulação 4D de cronogramas e estimativas 5D de custos[^31]. Na engenharia eletromecânica dos metrôs de Taiwan, usa-se a sigla **CSD/SEM**: CSD (Combined Service Drawing) designa os desenhos integrados das instalações; SEM (Structure/Electric/Mechanic), os desenhos de integração entre estrutura, eletricidade e mecânica. Tradicionalmente, os desenhos CAD eram sobrepostos e conferidos em papel. Na era BIM, o Navisworks executa a verificação de interferências e identifica conflitos em 3D[^32].

“**Integração de desenhos CSD/SEM**” tornou-se um serviço obrigatório nos sites das consultorias BIM de Taiwan.

---

## CTCI, Futsu, Dacin e Obayashi: quem constrói Taiwan

![Vista de uma manhã no canteiro de obras do Taipei Dome em 21 de junho de 2020; ao fundo, a envoltória metálica da cúpula ainda está sendo montada, enquanto, em primeiro plano, um caminhão Hino 300 cruza a faixa de pedestres da avenida Zhongxiao East, perto da saída 5 da estação Sun Yat-sen Memorial Hall; a cena reflete mais de uma década de obras do maior estádio de Taipé e o papel da Obayashi na gestão da construção desta cúpula de tubos circulares de aço, com 65 mil toneladas](/article-images/technology/taipei-dome-construction-cheng-2020.webp)
_Canteiro de obras do Taipei Dome, 2020-08-16, saída 5 da estação Sun Yat-sen Memorial Hall, na avenida Zhongxiao East. Foto: Cheng-en Cheng, 2020-08-16. [Licença via Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Taipei_Dome_and_Hino_300_BEM-5593_%2850281669428%29.jpg).\_

A força que sustenta o mercado taiwanês de grandes obras é formada por empresas de contratos integrados — elas tiveram contato com o BIM antes dos escritórios de arquitetura e também foram as primeiras a tratá-lo como ferramenta de produção.

Em primeiro lugar está a **CTCI Corporation (código de ações 9933)**. A empresa foi criada em 1979 por investimentos conjuntos da CTCI Foundation, do China Development Industrial Bank e da Central Investment Company[^33]. Sua origem é incomum: a CTCI Foundation, então chamada China Technical Consultants, Inc., foi criada em 1959 como instituição de transferência tecnológica a serviço do desenvolvimento industrial de Taiwan. Com a expansão da indústria petroquímica na década de 1970, assumiu numerosos trabalhos de consultoria técnica de empresas estatais, como a CPC Corporation. Em 1979, separou suas atividades de consultoria de engenharia, dando origem à CTCI.

A CTCI trabalha no modelo **EPC** — Engineering, Procurement and Construction, isto é, contrato integrado de engenharia, compras e construção — em refinarias, petroquímica, indústria química, energia, siderurgia, armazenamento e transporte, infraestrutura de transportes, incineradores, obras públicas e engenharia ambiental[^33]. Em 2021, tinha 7.500 funcionários e filiais ou escritórios em quinze países[^33][^34]. Projeto Amine na Arábia Saudita, contrato integrado dos fornos de craqueamento de etileno da Saudi Kayan, contrato integrado de MMA e PMMA da SAMAC: esses nomes traçam a presença das empresas EPC taiwanesas no Oriente Médio durante as últimas duas décadas[^33].

Em 2011, um acontecimento alterou a estrutura acionária da CTCI: **a japonesa Chiyoda Corporation adquiriu uma participação na empresa e tornou-se sua maior acionista**[^33]. A maior empresa taiwanesa de contratos integrados tem hoje como principal acionista um grupo japonês de engenharia química. É um fato pouco conhecido.

> **⚠️ Ponto de vista controverso**
> Os projetos internacionais de grandes empresas EPC como a CTCI não são isentos de controvérsia. Em 2017, um projeto EPC de uma usina de processamento de gás na Índia sofreu grandes atrasos e gerou créditos incobráveis; o grupo admitiu uma “**falha fatal na gestão internacional de riscos**”[^35]. No mesmo ano, o projeto petroquímico Kuokuang foi cancelado e a controvérsia sobre a saúde dos moradores próximos ao complexo petroquímico de Mailiao continuava. Diversos projetos petroquímicos dos quais a CTCI participou foram mencionados nos debates ambientais. O BIM contribuiu para a precisão técnica dessas grandes obras, mas precisão não resolve os problemas políticos relacionados à terra, ao trabalho e ao meio ambiente.

No mercado privado de construção, aparecem outros nomes. A **Futsu Construction** afirma ter “a maior experiência nacional na construção de instalações de alta tecnologia em área total de piso concluída”[^36]. A **Dacin Construction (2535)** é vista como “**a construtora de confiança da TSMC**” e recebeu o contrato da superestrutura da fábrica FAB 18P3 da TSMC no Parque Científico do Sul de Taiwan[^37]. Em uma apresentação interna, o departamento de BIM da Dacin declarou: “**usar o BIM como plataforma básica para integrar e coordenar o desenvolvimento, o planejamento, o projeto e a construção de projetos arquitetônicos**”[^37] — embora isso represente apenas uma pequena parcela de seus contratos.

Duas empresas estrangeiras têm presença estrutural em Taiwan. A **Obayashi Taiwan** é a filial criada em 1989 pela japonesa Obayashi Corporation, responsável pela Tokyo Skytree. Participou de toda a construção do Taipei 101, da Linha Xinyi do metrô de Taipé, do Terminal 3 do Aeroporto de Taoyuan e do **Taipei Dome**, entre outros projetos[^38]. **A página “Visão geral da empresa” do site da Obayashi Taiwan lista explicitamente a “gestão de desenhos de construção e aplicação do BIM” entre suas principais atividades de gestão de obras**[^38].

> **💡 Você sabia?**
> A estrutura metálica do Taipei Dome pesa ao todo 65 mil toneladas, e ele é a única cúpula do mundo inteiramente construída com tubos circulares de aço[^39]. O projeto da estrutura metálica foi desenvolvido principalmente no Tekla Structures; em seguida, o modelo foi importado no Navisworks para detectar interferências com outras especialidades, como instalações eletromecânicas e sistemas de combate a incêndios. **Sem BIM, seria quase impossível concluir uma estrutura metálica da escala do Taipei Dome sem erros graves** — por isso a Obayashi incluiu o BIM em sua lista de “principais atividades de gestão de obras”.

---

## Escassez de mão de obra, envelhecimento e trabalhadores migrantes: por que a transformação digital é inevitável

Imagine uma manhã comum em um canteiro de obras. Às seis e meia, os trabalhadores começam a chegar. Mais da metade são mestres de obra com mais de quarenta anos, já em idade de serem avôs.

**As estatísticas do governo de Nova Taipé sobre mortes em acidentes de trabalho mostram que, entre mais de cem casos fatais, mais de 77% das vítimas tinham mais de quarenta anos**[^40]. Esse dado já é amplamente conhecido entre os engenheiros civis. O envelhecimento da força de trabalho da construção taiwanesa não é uma tendência em curso: é uma realidade consolidada.

Com a queda da natalidade, os jovens não entram no setor. Condições difíceis nos canteiros, salários pouco competitivos e alta taxa de acidentes — a combinação dos três fatores aumenta cada vez mais a pressão de recrutamento[^40]. Em 2024, o Ministério do Trabalho autorizou quinze mil vagas para trabalhadores migrantes na construção; no início de 2026, elas já estavam “**prestes a ser totalmente distribuídas**”[^41].

É por isso que a transformação digital se tornou inevitável para o setor.

**Há grande demanda por engenheiros BIM; iniciantes recebem entre NT$ 35 mil e NT$ 45 mil, e o banco de empregos 1111 listava 104 vagas com salários mensais superiores a NT$ 50 mil**[^42]. Mas haver muita demanda não significa que a competência seja efetivamente aproveitada: “**aprender BIM não traz necessariamente um aumento salarial significativo, e a maioria das pessoas escolhe formas mais econômicas de capacitação**”[^43]. O setor ainda não chegou a um consenso sobre o teto profissional de um engenheiro BIM.

O problema estrutural mais profundo é que o BIM retira o arquiteto da categoria profissional de quem “**desenha**” e o conduz à nova categoria de “**integrador de sistemas**”. A atualização das ferramentas é apenas a superfície.

Um arquiteto que trabalha no AutoCAD desenha conjuntos de linhas bidimensionais. Plantas, elevações e cortes são independentes; alterar a planta e esquecer a elevação é algo cotidiano. Um engenheiro que trabalha com Revit ou BIM constrói um modelo de informações: por trás de cada linha estão vinculados materiais, especificações, fornecedores, preços, sequência de execução e ciclos de manutenção[^44]. Quando a planta é alterada, elevações e cortes são sincronizados automaticamente.

Quando arquitetos mais velhos olham para jovens engenheiros BIM e dizem que “isso é coisa da nova geração”, a verdadeira razão é simples: **essa profissão já pertence a um ramo diferente daquele que eles chamavam de “arquitetura” quando entraram no setor**.

> **✦** “Os modelos BIM frequentemente se tornam trabalho terceirizado e se desconectam da obra real; muitos centros ou equipes BIM acabam dissolvidos”[^45] — esta é a observação do próprio Centro de Pesquisa BIM da Universidade Nacional de Taiwan sobre a promoção do BIM no país.

---

## Um protocolo como o USB-C: a chave com que a Anthropic conectou a IA ao Revit

Em 25 de novembro de 2024, a Anthropic lançou como código aberto algo chamado **Model Context Protocol (MCP)**[^46].

O anúncio original usava uma linguagem científica:

> **O MCP é um padrão aberto e uma estrutura de código aberto apresentada pela Anthropic para padronizar a maneira como sistemas de inteligência artificial (IA), como os grandes modelos de linguagem (LLMs), se integram e compartilham dados com ferramentas, sistemas e fontes de dados externos**[^47].

A explicação da Anthropic era mais direta:

> **Pense no MCP como uma porta USB-C para aplicações de IA**[^46].

Assim como o USB-C padronizou a conexão entre dispositivos, o MCP pretende padronizar o protocolo que conecta a IA a fontes de dados e ferramentas.

Junto com o anúncio do MCP vieram SDKs para Python, TypeScript, C# e Java, além de servidores MCP pré-construídos para integração com Google Drive, Slack, GitHub, Git, Postgres e Puppeteer[^46].

O que aconteceu em seguida avançou a uma velocidade que ninguém previa.

Em 10 de dezembro de 2025, um desenvolvedor chamado **CHIANG SHUOTAO** publicou no GitHub um repositório chamado `REVIT_MCP_study`[^48]. Sua descrição continha apenas oito palavras em inglês: “LEARN HOW TO BUILD UP YOUR REVIT MCP”. A distribuição de linguagens era: **C# 54,2%, JavaScript 18,7%, PowerShell 14,3%, TypeScript 7,0%, HTML 3,3% e Shell 1,2%**[^48]. Até maio de 2026, esse repositório pessoal havia acumulado **73 estrelas e 85 forks**[^6].

A página pessoal de Shuotao no GitHub indica “Tokyo” como localização, mas o README e toda a documentação didática estão em chinês tradicional, com numerosas referências aos fluxos de trabalho do setor de arquitetura de Taiwan. Seus repositórios relacionados — `CAD_MCP_study`, `NAVISWORK_MCP` e `IFCSH` — formam uma série pessoal de experimentos de código aberto com BIM, MCP e IA[^49].

Como interpretar esse caso?

Não significa que “Taiwan tem seu próprio BIM_MCP”. O repositório de Shuotao faz parte do mesmo ecossistema internacional de `mcp-servers-for-revit/revit-mcp` e do servidor MCP integrado ao Revit 2027 pela própria Autodesk[^7][^50]. Sua importância está em outro ponto: **menos de treze meses após o anúncio do MCP pela Anthropic, um desenvolvedor taiwanês criou um projeto didático de código aberto com mais de setenta estrelas, reconectando a prática internacional de engenharia com Revit MCP à comunidade de língua chinesa**.

Quatro meses depois, **em abril de 2026, a Autodesk anunciou que o Revit 2027 teria um servidor MCP e o Autodesk Assistant integrados**[^7]. O novo Autodesk Assistant permite comandos como: “**encontre todas as salas sem etiquetas de instalações eletromecânicas**”, “**defina como 90 minutos a resistência ao fogo de todas as portas da Fase 2**” e “**gere todas as vistas hidrossanitárias deste pavimento**”[^7] — tudo por meio de linguagem natural.

Tarefas que antes exigiam um ou dois anos de aprendizagem do Revit agora podem ser executadas com uma frase em chinês ou inglês.

> **📝 Nota da curadoria**
> Alinhando as datas: entre o lançamento da plataforma BIM da Comissão de Construção Pública, em 23 de maio de 2014, e a abertura do MCP pela Anthropic, em 25 de novembro de 2024, **passaram-se dez anos e seis meses**. Durante essa década de promoção governamental do BIM, Taiwan foi do “incentivo a projetos-piloto” à “adaptação caso a caso”, sem jamais chegar à obrigatoriedade. Entre a abertura do MCP pela Anthropic e o anúncio de sua integração ao Autodesk Revit 2027, **passaram-se apenas dezessete meses**. A velocidade com que uma plataforma tecnológica redefine a entrada de profissionais em um setor supera amplamente a promoção por políticas públicas. **A verdadeira diferença está na estrutura dos dois modelos de implementação**: tornar algo obrigatório exige coordenar centenas de partes interessadas, equilibrar dezenas de grupos de pressão setoriais e alterar diversas leis; promover uma plataforma exige apenas abrir o SDK e redigir uma boa documentação. Compreender essa estrutura é mais importante do que reclamar do governo ou venerar a IA.

---

## Do desenho à integração de sistemas: uma redefinição profissional inacabada

Voltemos a um escritório de arquitetura da década de 1990.

Nas paredes havia pranchetas, réguas T, canetas técnicas e máquinas heliográficas. Para desenhar uma planta, o arquiteto traçava as linhas com caneta técnica sobre uma grande folha A1; depois, enviava o desenho para a máquina produzir cópias. A máquina zumbia enquanto as folhas de fundo azul e linhas brancas saíam lentamente pela outra extremidade. Qualquer alteração exigia redesenhar a folha inteira.

O AutoCAD lançou uma versão para Classic Mac OS em 1992 e outra para Microsoft Windows em 1993[^51]. A partir de meados da década de 1990, os escritórios de arquitetura de Taiwan migraram em massa para o CAD. As dificuldades da transição duraram cerca de dez anos: arquitetos mais velhos resistiam, jovens projetistas aderiam, e os escritórios se dividiam entre os que desenhavam no CAD e os que continuavam desenhando na prancheta.

A passagem do AutoCAD para o Revit foi a segunda transformação. **A Autodesk só promoveu o Revit e a expressão “Building Information Modeling” em 2002**[^52]. Isso significa que houve um intervalo de cerca de vinte anos entre a transição do desenho manual para o CAD e a passagem do CAD para o BIM. Mas a transformação do BIM foi mais dolorosa porque, dessa vez, o que se exigia não era apenas trocar de ferramenta, e sim **reorganizar a forma de pensar**.

O CAD digitaliza suas linhas. O BIM exige sistematizar todas as informações do edifício. Uma parede deixa de ser apenas duas linhas paralelas e se torna um objeto de dados como: “parede divisória do escritório da zona A, no segundo andar; material: placas de gesso de 12 mm em ambas as faces, com estrutura leve de aço de 75 mm; resistência ao fogo de uma hora; fornecedor XX; custo YY; execução programada após a instalação da tubulação eletromecânica”.

A integração entre especialidades também mudou. No processo tradicional, o arquiteto fazia seus desenhos, o engenheiro estrutural produzia os dele e o engenheiro de instalações preparava um terceiro conjunto. Os conflitos só apareciam quando as três séries eram sobrepostas no canteiro: um duto atravessava uma viga, um tubo de drenagem colidia com um pilar estrutural. No fluxo BIM, os desenhos são combinados em um único modelo tridimensional ainda na etapa de projeto, e a detecção e a análise dos conflitos são concluídas no computador[^32].

“**Reduzir conflitos nas interfaces de projeto**” aparece nos relatórios de resultados de todos os estudos de caso BIM de Taiwan[^14][^15]. Mas, por trás dessas palavras, há uma transformação profissional: a estrutura de poder entre arquitetos, engenheiros estruturais, engenheiros de instalações e construtoras está sendo redistribuída. **No passado, o arquiteto era o autor único da etapa de projeto; na era BIM, projetar tornou-se uma integração de sistemas realizada por múltiplos participantes.**

Essa redefinição profissional ainda não terminou.

> **✦** “**Os proprietários não compreendem suficientemente as aplicações do BIM e frequentemente seguem processos tradicionais de engenharia, limitando a eficácia da tecnologia BIM**”[^53] — esta é a observação mais direta da BSI sobre os clientes taiwaneses. O principal obstáculo à adoção do BIM está do lado do proprietário; saber ou não operar a ferramenta é uma questão secundária.

---

## O que vem a seguir

Em maio de 2026, a situação do BIM em Taiwan era a seguinte:

- O governo central o promovia havia doze anos, mas ainda seguia a “adaptação caso a caso”, sem obrigatoriedade geral[^2].
- Taipé e Nova Taipé exigiam modelos BIM no âmbito das licenças de construção desde 2018 e 2014, respectivamente, mas cada município tinha normas próprias[^4][^11].
- Grandes consultorias de engenharia — CECI, Sinotech e Evergreen — e grandes construtoras — CTCI, Futsu, Dacin e Obayashi — já usavam BIM, e havia forte demanda por engenheiros especializados[^17][^19][^33][^42].
- A maioria dos pequenos e médios escritórios de arquitetura ainda trabalhava principalmente com AutoCAD; estimava-se que a taxa de adoção do BIM permanecia em um único dígito percentual[^43][^45].
- Dezessete meses após a abertura do MCP pela Anthropic, em novembro de 2024, a Autodesk anunciou um servidor MCP integrado ao Revit 2027[^7][^46].
- Um desenvolvedor taiwanês criou um repositório didático de Revit MCP com 73 estrelas, reconectando o ecossistema internacional à comunidade de língua chinesa[^6][^48].

Vistas em conjunto, essas seis linhas mostram que **o BIM em Taiwan é a história de uma profissão redefinida externamente por uma plataforma tecnológica**, ainda distante da maturidade industrial. A promoção governamental não acompanha a evolução tecnológica; a adoção privada não acompanha o envelhecimento demográfico. O setor taiwanês da construção é puxado simultaneamente por três forças: profissionais tradicionais cada vez mais velhos, canteiros com escassez de mão de obra e uma nova geração de ferramentas que combina IA e BIM.

Na próxima década, a profissão de “arquiteto” em Taiwan talvez já não seja como hoje. A parte do desenho será entregue à IA: uma frase como “**defina como 90 minutos a resistência ao fogo de todas as portas da Fase 2**”[^7] bastará para alterar todas as portas do projeto. O trabalho do arquiteto se aproximará mais do papel de “**integrador de sistemas**”, “**intérprete entre o proprietário e a tecnologia**” e “**curador da colaboração entre múltiplos participantes**”.

Quando a plataforma BIM da Comissão de Construção Pública realizou sua primeira reunião, em 23 de maio de 2014, a estação de Miaoli da ferrovia de alta velocidade ainda não havia sido construída. No dia em que a Autodesk anunciou o MCP integrado ao Revit 2027, em abril de 2026, a próxima fábrica da TSMC em Kaohsiung já estava sendo preparada com desenhos inteiramente em BIM. Doze anos de “adaptação caso a caso” chegaram a um destino que essa política não havia previsto: um protocolo aberto a partir dos escritórios da Anthropic na Califórnia reescreveu, pelo lado da plataforma, toda a curva de entrada no setor, contornando a via principal que originalmente dependeria da imposição governamental.

Quando Shuotao publicou o `REVIT_MCP_study` no GitHub, em dezembro de 2025[^48], haviam passado exatamente onze anos e sete meses desde o lançamento da plataforma BIM da Comissão. Nesses doze anos, o setor de arquitetura de Taiwan percorreu um longo caminho: do desenho manual e das cópias heliográficas aos modelos 3D, de experiências isoladas a padrões nacionais e da atualização de ferramentas à redefinição profissional. **Esse caminho ainda não terminou — mas a direção de seu próximo trecho já não está inteiramente nas mãos do governo de Taiwan.**

---

**Leituras complementares**:

- [Arquitetura de Taiwan](/pt/art/taiwanese-architecture) — da casa de lajes de pedra aos arranha-céus, uma narrativa da cultura arquitetônica; este artigo é sua contraparte sobre a digitalização da engenharia
- [Habitação social e justiça habitacional](/pt/society/social-housing-and-housing-justice) — a aplicação do BIM à operação e manutenção de moradias sociais tem sido um dos principais programas recentes do ABRI
- [Empresas taiwanesas: TSMC](/pt/economy/tsmc) — as fábricas da TSMC são um dos principais campos de aplicação prática do BIM para construtoras como Dacin e Futsu
- [Desenvolvimento da IA em Taiwan](/pt/technology/ai-development-in-taiwan) — o MCP da Anthropic e sua integração ao Revit 2027 são exemplos concretos da combinação entre IA e indústria
- [Indústria de semicondutores](/pt/technology/taiwan-semiconductor-industry) — soluções integradas para a construção de fábricas, somadas ao uso do BIM em instalações inteligentes, constituem a base de engenharia para a expansão dos polos de semicondutores

## Fontes das imagens

Este artigo utiliza três imagens licenciadas em CC no Wikimedia Commons, todas armazenadas em cache em `public/article-images/technology/` para evitar hotlinking aos servidores de origem:

- [FreeCAD 1.0 Dark BIM Example](https://commons.wikimedia.org/wiki/File:FreeCAD_1.0_Dark_BIM_Example.png) — Foto: Maxwxyz, 2024-10-07, CC BY 4.0 (imagem de capa: representação de um modelo 3D em uma ferramenta BIM de código aberto)
- [Demonstração de objetos no Autodesk Revit 2024](https://commons.wikimedia.org/wiki/File:Revit_2024.png) — Foto: DanielDefault, 2024, CC BY-SA 4.0 (imagem interna: modelagem orientada a objetos no Revit)
- [Taipei Dome and Hino 300 BEM-5593](https://commons.wikimedia.org/wiki/File:Taipei_Dome_and_Hino_300_BEM-5593_%2850281669428%29.jpg) — Foto: Cheng-en Cheng, 2020-08-16, CC BY-SA 2.0 (imagem interna: montagem da estrutura metálica de 65 mil toneladas no canteiro do Taipei Dome)

A matriz completa de licenças da mídia está registrada em [`reports/research/2026-05/台灣BIM與營建科技.md`](../../reports/research/2026-05/台灣BIM與營建科技.md), na seção §Matriz de Licenciamento de Mídia (媒體授權矩陣三表).

## Referências

[^1]: [Comissão de Construção Pública do Yuan Executivo da República da China (Taiwan): área dedicada ao uso da Modelagem da Informação da Construção (BIM) em obras públicas](https://www.pcc.gov.tw/content/index?eid=1345&type=C) — Página oficial da plataforma de promoção do BIM da Comissão de Construção Pública, que registra sua criação em 23 de maio de 2014 e a política oficial de três etapas: incentivo a projetos-piloto, execução dos projetos-piloto e, a partir de 2017, promoção do BIM em obras públicas acima de determinado valor.

[^2]: [Plataforma de Participação em Políticas Públicas do National Audit Office: consulta sobre a estratégia de promoção do BIM pela Comissão de Construção Pública](https://cy.join.gov.tw/policies/detail/8e95c8d6-ce87-4e05-afce-c46a33eb6f89) — Página de discussão pública que registra os princípios de “adaptação caso a caso e avanço gradual”, sem obrigatoriedade geral, e as estatísticas oficiais de mais de 60 órgãos licitantes e mais de 120 contratos com uso de BIM.

[^3]: [Site oficial da Taiwan Building Information Modeling Association (TBIMA)](https://sites.google.com/view/tbima) — Site da associação registrada no Ministério do Interior, que documenta sua origem em encontros realizados em 2009, a organização iniciada em 2011, a fundação formal em 10 de março de 2012 e a procedência de seus principais membros do círculo de instrutores treinados diretamente pela Autodesk Taiwan em 2008.

[^4]: [Departamento de Desenvolvimento Urbano do governo de Taipé: normas operacionais para dados de propriedades de modelos BIM de conclusão de obras, v2.0](https://udd.gov.taipei/assets/50-10660/Documents/竣工模型屬性資料作業規範v2.0_20181109_new.pdf) — Normas oficiais publicadas em 9 de novembro de 2018, baseadas no formato internacional COBie e com exigências concretas para exportação de dados no padrão IFC.

[^5]: [BSI e representantes do governo, da indústria e da academia assinam memorando de entendimento do Taiwan BIM Task Group](https://www.bsigroup.com/zh-TW/about-bsi/media-centre/press-release/2018-/october/bsitaiwan-bim-task-group/) — Comunicado da BSI Taiwan sobre a assinatura do memorando em 3 de outubro de 2018, registrando os cinco signatários — BSI, NTUBIM da Universidade Nacional de Taiwan, Taiwan Construction Research Institute, Taiwan Architecture & Building Center e TBIMA — e o papel orientador do ABRI.

[^6]: [Repositório shuotao/REVIT_MCP_study no GitHub](https://github.com/shuotao/REVIT_MCP_study) — Projeto didático pessoal e aberto de CHIANG SHUOTAO sobre Revit MCP, criado em dezembro de 2025; em maio de 2026, acumulava 73 estrelas, 85 forks e uma distribuição de linguagens formada por C# 54,2%, JavaScript 18,7%, PowerShell 14,3%, entre outras.

[^7]: [Autodesk Developer Blog: Revit API Agents, MCP, Copilot and Codex](https://blog.autodesk.io/revit-api-agents-mcp-copilot-and-codex/) — Anúncio oficial da Autodesk, publicado em abril de 2026, sobre o servidor MCP e o Autodesk Assistant integrados ao Revit 2027, com suporte à operação de modelos por linguagem natural.

[^8]: [ONC Lawyers: adoção do BIM no setor da construção e suas implicações jurídicas](https://www.onc.hk/zh_HK/publication/adoption-of-bim-and-its-legal-complications-for-the-construction-industry) — Artigo de um escritório de advocacia de Hong Kong que registra a obrigatoriedade do BIM, determinada pelo Departamento de Desenvolvimento, para projetos com custo estimado superior a 30 milhões de dólares de Hong Kong.

[^9]: [Instituto de Pesquisa em Arquitetura e Edificações do Ministério do Interior da República da China (Taiwan): programa de promoção da aplicação de BIM](https://www.abri.gov.tw/News_Content_Table.aspx?n=807&s=315634) — Página oficial do ABRI que registra o programa de médio prazo iniciado em 2015, com quatro anos de duração, e a segunda fase iniciada em 2019.

[^10]: [ABRI: pesquisa sobre os resultados da aplicação do BIM em Taiwan e propostas para sua promoção](https://www.abri.gov.tw/News_Content_Table.aspx?n=807&s=39612) — Relatório de pesquisa encomendado pelo ABRI, que registra os objetivos de “modernização digital da tecnologia da construção” e “ambiente residencial digital”, além da integração entre BIM, GIS e IoT para cidades digitais.

[^11]: [Departamento de Obras Públicas de Nova Taipé: Sistema Informatizado de Verificação Assistida de Licenças de Construção](https://www.bim.ntpc.gov.tw/) — Site do sistema municipal que registra a primeira licença de construção baseada em modelo BIM, emitida em 2014, o acervo de mais de vinte modelos concluídos e as diretrizes municipais para entrega de informações de modelos BIM de conclusão de edifícios públicos.

[^12]: [buildingSMART International: Industry Foundation Classes (IFC)](https://www.buildingsmart.org/standards/bsi-standards/industry-foundation-classes/) — Página oficial do padrão IFC, com informações sobre a ISO 16739-1:2024 e a adoção internacional, incluindo a obrigatoriedade do IFC em obras públicas dinamarquesas desde 2010.

[^13]: [ABRI: relatório de resultados do programa de promoção da aplicação de BIM, 2023](https://ws.moi.gov.tw/001/Upload/404/relfile/9489/315634/0cccc6e2-2dc6-496f-a45f-69b60e2811b1.pdf) — Relatório oficial que reconhece que a maior parte das aplicações públicas de BIM se concentra nas etapas de projeto e construção, enquanto a operação e a gestão ainda seguem métodos tradicionais.

[^14]: [Departamento de Sistemas de Transporte Rápido de Nova Taipé: aplicação de BIM na Linha Wanda](https://www.dorts.ntpc.gov.tw/documentary/articleInfo/P9z2zp0nZrDp?page=216) — Registro oficial que descreve a Linha Wanda do metrô de Taipé como a primeira obra pública a incluir o BIM em contrato e documenta a redução dos conflitos nas interfaces de projeto.

[^15]: [Flow BIM Service: estudo de caso de edifício comercial inteligente](https://bim.flow.tw/smartoffice-globalshowcase/) — Estudo de caso de uma consultoria BIM que atribui à aplicação do BIM na estação de Miaoli uma economia de 20% nos custos de alterações de projeto e a antecipação de dois meses no início da obra.

[^16]: [Liberty Times Net: Terminal 3 do Aeroporto de Taoyuan é adjudicado por NT$ 44,5 bilhões ao consórcio Samsung C&T–RSEA Engineering](https://ec.ltn.com.tw/article/breakingnews/3414669) — Notícia de março de 2021 que registra os detalhes da adjudicação das obras civis do edifício principal do T3.

[^17]: [iThome: o setor da construção usa BIM para criar gêmeos digitais de edifícios — o caso da CECI](https://www.ithome.com.tw/people/137308) — Reportagem de 2021 com o engenheiro-chefe Lin Yao-tsang, documentando aplicações de BIM durante todo o ciclo de vida, como a estação de Fengshan e o túnel de Baguashan, além do fluxo internacional de colaboração no T3 de Taoyuan.

[^18]: [China Engineering Consultants, Inc. (CECI): cronologia de cinquenta acontecimentos históricos](https://www.ceci.org.tw/modules/article-content.aspx?s=13&i=226) — Cronologia oficial do cinquentenário da CECI que registra sua fundação em 1969 e o investimento realizado em 2007 para criar a CECI Engineering Consultants, Inc., Taiwan.

[^19]: [CECI Engineering Consultants, Inc., Taiwan: apresentação da empresa](https://www.104.com.tw/company/d1w3jw0) — Página de recrutamento que registra quase dois mil funcionários, dos quais 90% têm experiência em rodovias, ferrovias, aeroportos, pontes, BIM, ITS, PPP e outras áreas, além da criação pioneira de um centro de integração BIM em 2010.

[^20]: [Sinotech Engineering Consultants: rumo ao cinquentenário](https://50th-anniversary.sinotech.org.tw/about_ltd.html) — Site comemorativo que registra a fundação da Sinotech em 1970 e, após sua transformação em organização sem fins lucrativos em 1994, o investimento na Sinotech Engineering Consultants, Ltd.

[^21]: [Autodesk University: projeto e aplicação da plataforma de colaboração BIM da Sinotech](https://www.autodesk.com/autodesk-university/class/zhongxinggongchengBIMxietongzuoyepingtaizhishejiyuyingyong-2020) — Apresentação técnica de 2020 que documenta a arquitetura dos sete módulos principais do PMIS e do módulo de acompanhamento de questões BIM, com base em um ambiente CDE da ISO 19650.

[^22]: [Site oficial da Evergreen Consulting Engineering](https://www.egc.com.tw/) — Registra a fundação em 1974, uma equipe de mais de oitenta profissionais, o projeto estrutural do Taipei 101 e da T&C Tower de 85 andares em Kaohsiung, além do reconhecimento pelo CTBUH como uma das dez principais consultorias estruturais de edifícios altos do mundo.

[^23]: [Centro de Pesquisa BIM da Universidade Nacional de Taiwan: “O desenvolvimento do BIM abala o atual sistema da arquitetura”, Kuo Jung-chin, dezembro de 2011](https://www.ntubim.net/bim2356027396/bim-201112) — Uma das primeiras obras de referência do discurso acadêmico taiwanês sobre BIM.

[^24]: [BSI: Taiwan BIM Task Group publica a versão chinesa do padrão internacional ISO 19650 para promover a digitalização da construção](https://www.bsigroup.com/zh-TW/about-bsi/media-centre/press-release/2019/20197/iso-19650-tw-standard-launch/) — Comunicado de 2019 que registra a publicação da versão chinesa da ISO 19650, a supervisão do diretor Wang Jung-chin, do ABRI, e a colaboração do NTUBIM na tradução.

[^25]: [BIM-API: PyRevit + Dynamo Scripts](https://www.bim-api.com/en/blog/pyrevit-dynamo-scripts/) — Artigo que registra a estimativa de que 90% dos arquitetos taiwaneses com capacidade de projetar em BIM usam Revit Architecture.

[^26]: [Site da Lungting Information, distribuidora do Graphisoft Archicad](https://www.academicd.com/) — Site da distribuidora taiwanesa, que documenta recursos de vendas, suporte e treinamento do Archicad e seu posicionamento como software BIM mais acessível do que o Revit.

[^27]: [BIM Explorer: experiência com o Tekla Structures](https://tpuaup.blogspot.com/2013/05/tekla-structures.html) — Artigo que descreve o Tekla Structures como o principal software de projeto de estruturas metálicas em Taiwan e registra seu uso em estádios, pontes e fábricas.

[^28]: [Otsuka Information Technology: MicroStation para projetos de infraestrutura](https://www.oitc.com.tw/products-detail/MicroStation/79) — Site da distribuidora taiwanesa do Bentley MicroStation, com informações sobre seu uso em ferrovias, rodovias, túneis, pontes e outras infraestruturas.

[^29]: [BIM+ Studio da Taiwan Architecture & Building Center: curso básico de Dynamo para arquitetura](https://bimstudio.tabc.org.tw/blogs/bim%E7%9F%A5%E8%AD%98%E5%BA%AB/49627) — Apresentação de curso que registra a vinda a Taiwan, no início de 2016, de instrutores da equipe de desenvolvimento do Dynamo em Singapura, a convite da Autodesk Taiwan.

[^30]: [WeBIM Services: como o Dynamo transforma o mundo do Revit](https://webim.com.tw/en/tech-en/dynamo-application-webim-3/) — Artigo técnico que documenta aplicações concretas do Dynamo entre engenheiros BIM taiwaneses, como ordenação de coordenadas de dutos, verificação de pé-direito e geração automática de cortes.

[^31]: [Visão geral do Autodesk Navisworks](https://www.quickly.com.tw/autodesk/navisworks.php) — Site de uma distribuidora taiwanesa que registra as funções do Navisworks Manage: navegação 3D, detecção de interferências, exportação de relatórios, simulação 4D de cronogramas e estimativas 5D de custos.

[^32]: [airitiLibrary: desenvolvimento e aplicação da automação do projeto CSD/SEM metroviário com auxílio de BIM](https://www.airitilibrary.com/Article/Detail/0257554X-202107-202107290004-202107290004-77-85) — Artigo acadêmico que documenta a metodologia taiwanesa de integração BIM para CSD (Combined Service Drawing) e SEM (Structure/Electric/Mechanic) em instalações eletromecânicas de metrôs.

[^33]: [CTCI Group — Wikipédia](https://zh.wikipedia.org/zh-tw/%E4%B8%AD%E9%BC%8E%E9%9B%86%E5%9C%98) — Verbete que registra a criação da empresa em 1979 por investimentos da CTCI Foundation, do China Development Industrial Bank e da Central Investment Company; a Chiyoda Corporation como maior acionista desde 2011; os 7.500 funcionários em 2021; e grandes projetos EPC internacionais, como Amine, Saudi Kayan e SAMAC MMA.

[^34]: [Site oficial do CTCI Group](https://www.ctci.com/www/ctci2022/page.aspx?L=CH) — Registra as atividades de engenharia integrada, o modelo EPC e a presença em quinze países por meio de filiais e escritórios.

[^35]: [Crossing: a crise dos créditos incobráveis da CTCI e a falha fatal dos contratos integrados taiwaneses na gestão internacional de riscos](https://crossing.cw.com.tw/article/19832) — Reportagem que registra os grandes atrasos e créditos incobráveis de um projeto EPC de processamento de gás na Índia em 2017.

[^36]: [Futsu Construction: projetos de instalações de alta tecnologia](https://www.futsu.com.tw/p_hitech.html) — Página oficial que afirma que a empresa tem a maior experiência nacional na construção de instalações de alta tecnologia em área total de piso concluída.

[^37]: [Dacin Construction: experiência em BIM](https://www.dacin.com.tw/bim/) — Página oficial que registra o uso do BIM como plataforma básica para integrar e coordenar o desenvolvimento, o planejamento, o projeto e a execução de projetos arquitetônicos.

[^38]: [Obayashi Taiwan: visão geral da empresa](https://www.obayashi.com.tw/topic/about/preview/3250113421819124234) — Site oficial que registra a fundação da filial taiwanesa em 1989, sua relação com a Obayashi Corporation e a “gestão de desenhos de construção e aplicação do BIM” entre suas principais atividades de gestão.

[^39]: [Taipei Dome — Wikipédia](https://zh.wikipedia.org/zh-tw/%E8%87%BA%E5%8C%97%E5%A4%A7%E5%B7%A8%E8%9B%8B) — Verbete que registra uma área total de piso de 120 mil metros quadrados, estrutura metálica de 65 mil toneladas e a condição de única cúpula do mundo inteiramente construída com tubos circulares de aço.

[^40]: [United Daily News: trabalhadores em idade de avôs sustentam o setor, enquanto a construção enfrenta uma ruptura de competências](https://udn.com/news/story/124689/9220106) — Reportagem que registra que pessoas com mais de quarenta anos representam 77% das mais de cem mortes em acidentes de trabalho na construção em Nova Taipé.

[^41]: [Liberty Times Net: escassez nacional de mão de obra — quinze mil vagas para trabalhadores migrantes da construção estão prestes a se esgotar](https://estate.ltn.com.tw/article/21452) — Reportagem que registra a abertura, entre 2024 e 2026, de quinze mil vagas para trabalhadores migrantes no setor e sua iminente distribuição integral.

[^42]: [1111 Job Bank: vagas para engenheiros BIM com salário mensal superior a NT$ 50 mil](https://www.1111.com.tw/search/job?page=1&col=ab&sort=desc&ks=bim,%E7%B9%AA%E5%9C%96&st=1&sa0=50000*) — Página de busca que registra 104 vagas com salário mensal acima de NT$ 50 mil e remuneração inicial de NT$ 35 mil a NT$ 45 mil.

[^43]: [Por que o BIM encontra dificuldades para se consolidar em Taiwan? Quatro etapas revelam a realidade e as oportunidades](https://engineeringlifetw.com/whynotbim/) — Análise sobre obstáculos culturais à promoção do BIM, incluindo a dependência histórica do CAD, a terceirização dos modelos BIM e a dissolução de centros e equipes especializados.

[^44]: [Verakey: o que é BIM? Análise completa de cinco vantagens](https://veracityconsultant.com.tw/what-is-bim/) — Página de uma consultoria BIM que explica como a tecnologia sistematiza materiais, especificações, fornecedores, preços, sequências de execução e ciclos de manutenção dos edifícios.

[^45]: [ABRI: programa de promoção da aplicação de BIM](https://www.abri.gov.tw/News_Content_Table.aspx?n=807&s=39506) — Página que registra o diagnóstico de que modelos BIM se tornam trabalho terceirizado, desconectam-se das obras reais e levam à dissolução de muitos centros ou equipes BIM.

[^46]: [Anthropic: Introducing the Model Context Protocol](https://www.anthropic.com/news/model-context-protocol) — Anúncio oficial de 25 de novembro de 2024 sobre a abertura do Model Context Protocol, com a comparação a uma porta USB-C para aplicações de IA e o lançamento de SDKs para Python, TypeScript, C# e Java.

[^47]: [Wikipedia: Model Context Protocol](https://en.wikipedia.org/wiki/Model_Context_Protocol) — Verbete em inglês que registra a abertura do MCP pela Anthropic em 25 de novembro de 2024 e sua doação, em dezembro de 2025, à Agentic AI Foundation, vinculada à Linux Foundation.

[^48]: [Página pessoal de shuotao no GitHub](https://github.com/shuotao) — Perfil de CHIANG SHUOTAO, que registra sua localização em Tóquio e os repositórios de sua série pessoal de experimentos abertos com BIM, MCP e IA, como CAD_MCP_study, NAVISWORK_MCP e IFCSH.

[^49]: [Repositório shuotao/CAD_MCP_study no GitHub](https://github.com/shuotao/CAD_MCP_study) — Projeto didático aberto de Shuotao sobre CAD e MCP, parte de uma série pessoal de experimentos que também inclui REVIT_MCP_study e NAVISWORK_MCP.

[^50]: [Architosh: Autodesk Revit 2027 — grandes novidades em IA e gráficos](https://architosh.com/2026/04/autodesk-revit-2027-big-new-ai-and-graphics-changes/) — Reportagem especializada de abril de 2026 que descreve detalhadamente as funções e a arquitetura do servidor MCP e do Autodesk Assistant integrados ao Revit 2027.

[^51]: [AutoCAD — Wikipedia](https://en.wikipedia.org/wiki/AutoCAD) — Verbete em inglês que registra o lançamento inicial em dezembro de 1982 para CP/M e IBM PC, a versão para Classic Mac OS em 1992 e a versão para Microsoft Windows em 1993.

[^52]: [Modelagem da Informação da Construção — Wikipédia](https://zh.wikipedia.org/zh-tw/%E5%BB%BA%E7%AF%89%E4%BF%A1%E6%81%AF%E6%A8%A1%E5%9E%8B) — Verbete em chinês tradicional que registra a primeira formulação do BIM em 1975, as pesquisas realizadas na Finlândia e nos Estados Unidos na década de 1980 e a promoção do termo “Building Information Modeling” pela Autodesk em 2002.

[^53]: [BSI Taiwan: o valor comercial da Modelagem da Informação da Construção (BIM)](https://www.bsigroup.com/zh-TW/insights-and-media/insights/blogs/business-value-of-building-information-modelling-bim/) — Artigo oficial que observa que os proprietários não compreendem suficientemente as aplicações do BIM e continuam seguindo processos tradicionais de engenharia, limitando a eficácia da tecnologia.
