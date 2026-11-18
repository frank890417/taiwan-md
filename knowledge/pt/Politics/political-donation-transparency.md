---
title: 'Transparência do financiamento político: a plataforma da Controladoria, a visualização do g0v, 22 anos de infraestrutura de abertura'
description: 'Abra a plataforma de consulta pública de financiamento político da Controladoria, digite o nome de qualquer candidato e você descobrirá de quem ele recebeu dinheiro, quanto e em que atividades de campanha foi gasto. Esta infraestrutura não caiu do céu — foi construída passo a passo pela legislação de 2004 da Lei de Financiamento Político, o lançamento da plataforma em 2008, o acordo de abertura de dados de 2017 entre a Comissão Eleitoral Central e a Controladoria, e dez anos de visualização por engenheiros do g0v.'
date: 2026-05-27
category: 'Politics'
tags:
  [
    'financiamento político',
    'transparência',
    'Controladoria',
    'g0v',
    'fluxo eleitoral',
    'legislação 2004',
    'eleições 2026',
  ]
subcategory: '公民監督'
author: 'Taiwan.md'
featured: false
lastVerified: 2026-05-27
lastHumanReview: false
readingTime: 12
curation: 'incubating'
curationReason: 'unverified'
translatedFrom: 'Politics/政治獻金透明度.md'
sourceCommitSha: 'be13f045'
sourceContentHash: 'sha256:8a7814971a9249c7'
sourceBodyHash: 'sha256:214c403ec0d7137c'
translatedAt: '2026-07-28T06:15:59+08:00'
---

# Transparência do financiamento político: quando a infraestrutura democrática vira CSV para baixar

> **Resumo em 30 segundos:** Num fim de semana de 2014, um engenheiro do g0v num hackathon na rua Chingtu East Road, em Taipé, abriu os relatórios de financiamento político da Controladoria. Ele queria pouco — ver de que empresas o candidato a deputado da legislatura anterior tinha recebido dinheiro, e quanto por transação. Mas o arquivo baixado era PDF. Não tabela, não CSV, não JSON — PDF escaneado. Ele largou o café, abriu o terminal, começou a escrever a primeira linha do script de extração. Dez anos depois, Taiwan tem o "Fluxo Eleitoral", este sistema de visualização — não foi o governo que fez, foram engenheiros cidadãos preenchendo a lacuna. Mas a lacuna que preencheram não era vazia: por baixo dela havia uma lei de 2004, uma plataforma no ar desde 2008, centenas de relatórios contábeis enviados à Controladoria conforme a lei. Este artigo fala dessa lacuna — a transparência do financiamento político, a fatia mais técnica, mais ignorada, porém mais concreta dos 22 anos de infraestrutura democrática de Taiwan.

---

## Por que começar pelo PDF

Cidadãos comuns não consultam financiamento político. É fato.

Abrir a plataforma de consulta pública de financiamento político da Controladoria[^1], digitar o nome do candidato, baixar o relatório — essa sequência de ações não faz parte do cotidiano da grande maioria dos eleitores. Ir à seção de voto na manhã da eleição, depositar uma cédula, voltar para casa assistir à apuração ao vivo — essa é a experiência majoritária de participação democrática.

Mas **o valor da infraestrutura de transparência não está em quantas pessoas a usam, está no fato de ela existir**.

Quando um jornalista investigativo precisa rastrear um fluxo de dinheiro — a plataforma está lá.
Quando um candidato a vereador quer saber de que empresas o vereador titular recebeu dinheiro na legislatura passada — a plataforma está lá.
Quando um engenheiro do g0v quer fazer visualização para tornar os dados mais compreensíveis — os dados brutos estão lá.
Quando um acadêmico quer pesquisar a estrutura do poder financeiro na política — vinte anos de dados acumulados estão lá.

Quando a plataforma não está lá, todas essas perguntas se tornam impossíveis. Quando a plataforma está lá, a qualidade democrática tem um piso verificável.

Por isso o momento da legislação da Lei de Financiamento Político em 2004[^2] não foi vitória de nenhum partido — foi o momento em que a infraestrutura democrática de Taiwan ganhou um novo órgão.

---

## 2004: o ano do raro consenso entre os dois partidos

A 26 de março de 2004, o Yuan Legislativo aprovou em terceira leitura a Lei de Financiamento Político[^2].

O clima político daquele ano era tudo menos amigável — o caso do tiroteio de 19 de março acabara de completar sete dias, o resultado da eleição presidencial gerou confronto entre os campos azul e verde, a multidão de manifestantes diante do Palácio Presidencial em Ketagalan Boulevard ainda não se dispersara. Mas a Lei de Financiamento Político passou justamente nessa primavera de tensão máxima.

Por que os dois partidos alcançaram consenso nesse momento? A resposta está nos dez anos anteriores.

Desde os anos 1990, "política do dinheiro" era praticamente uma dor de ambos os partidos. O Kuomintang era acusado de combinar facções locais com capitalistas, o DPP de receber dinheiro de novos empresários, candidatos independentes arrecadavam sem fiscalização. Após cada eleição surgiam escândalos pontuais de dinheiro, mas como não havia lei específica, nem obrigação de divulgação, nem penalidades — o escândalo eclodia e passava, a opinião pública esquentava e esfriava.

Até que, após a primeira alternância partidária em 2000, o governo Chen Shui-bian impulsionou a legislação; embora a maioria do Kuomintang no Yuan Legislativo se opusesse à administração em muitas pautas, na questão "o financiamento político deve ser transparente" **os dois partidos perceberam que ambos já haviam sofrido com o rótulo de política do dinheiro**. A necessidade de imagem de integridade superou a conveniência do não-divulgar.

A Lei de Financiamento Político nasceu nesse momento — não impulsionada por um herói, não forçada por um movimento, mas pela convergência dos dois partidos num ponto de interesse comum.

---

## O esqueleto da lei: quem pode receber, quem pode doar, qual o teto, como declarar

A Lei de Financiamento Político não é longa, mas seu esqueleto é claro[^3].

**Artigo 5: Quem pode receber financiamento político**. A lei define três categorias de "receptores de financiamento político":

- Candidatos (já registrados)
- Partidos políticos
- Associações políticas (constituídas conforme a lei)

Fora essas três categorias, receber financiamento político é ilegal. Assessor de deputado receber, chefe de campanha receber por procuração, cônjuge do candidato receber — tudo proibido. O desenho da lei é canalizar o fluxo para os "sujeitos declaráveis", espremendo o espaço cinzento.

**Artigo 7: Quem pode doar**. A lei permite três categorias de doadores:

- Cidadãos nacionais
- Empresas nacionais
- Entidades sem fins lucrativos nacionais

**São proibidas as seguintes categorias**:

- Empresas estrangeiras, governos estrangeiros, indivíduos estrangeiros
- Pessoas, pessoas jurídicas, organizações da área da República Popular da China
- Órgãos governamentais, empresas estatais
- Pessoas jurídicas nas quais o governo ou empresas estatais detenham mais de 20% das ações
- Empreiteiros com contratos em vigor com o governo[^4]

Esta última — empreiteiros do governo não podem doar — é o desenho do firewall mais básico contra "financiamento político em troca de contratos públicos".

**Artigo 18: Tetos de valor**. É o artigo mais discutido[^5]:

- Pessoa física para o mesmo candidato: até 100.000 novos dólares taiwaneses por ano
- Empresa para o mesmo candidato: até 1.000.000 de novos dólares taiwaneses por ano [NEEDS-VERIFY]
- Pessoa física para partido político: até 300.000 novos dólares taiwaneses por ano
- Empresa para partido político: até 3.000.000 de novos dólares taiwaneses por ano [NEEDS-VERIFY]

A lógica dos tetos é impedir que um único doador tenha influência excessiva sobre um único candidato — mas adiante veremos como essa lógica é estruturalmente contornada pela "doação fracionada".

**Artigo 20: Obrigação de declaração**. Após a eleição, dentro de prazo determinado, o candidato deve declarar à Controladoria o detalhamento completo de receitas e despesas de financiamento político — de quem recebeu, quanto, em que itens gastou, quanto sobrou. Os dados declarados são obrigatoriamente carregados no sistema de verificação de contas especiais de financiamento político da Controladoria, servindo de fonte para a futura consulta pública.

**Artigo 26: Penalidades**. Infratores enfrentam multa de 1 a 5 vezes o valor; casos graves incorrem em responsabilidade criminal — até cinco anos de prisão[^6]. As penalidades tornam "simplesmente não declarar" uma opção irracional.

A lei escrita até aqui — o esqueleto está pronto. Mas esqueleto não é órgão; órgão precisa de carne e sangue. Carne e sangue são a plataforma.

---

## 2008: a plataforma da Controladoria entra no ar

A eleição presidencial de 2008, a décima segunda — Ma Ying-jeou contra Hsieh Chang-ting — foi a primeira eleição presidencial de Taiwan com "aplicação integral da Lei de Financiamento Político e declaração obrigatória"[^7] [NEEDS-VERIFY].

Naquele ano, a plataforma de consulta pública de financiamento político da Controladoria entrou oficialmente no ar. Endereço: `https://ardata.cy.gov.tw/`[^1].

O objetivo da primeira versão da plataforma era simples: digitalizar os dados em papel declarados pelos candidatos, colocá-los na rede, abrir para consulta. Qualquer pessoa podia digitar nome de candidato / nome de partido / nome de associação política, consultar o detalhamento de receitas e despesas das declarações históricas — incluindo doador, valor, categoria de uso, para cada transação.

É um desenho raro na Ásia. **Os dados da FEC (Federal Election Commission) dos EUA são mais profundos — mas historicamente só abriam após a eleição**[^8]. O Japão, após reforçar a Lei de Regulação de Fundos Políticos em 2007, também tem mecanismo de divulgação, mas a brecha das "associações políticas" permite que o fluxo principal desvie[^9]. A Comissão Eleitoral Nacional da Coreia do Sul gere centralizadamente, mas a interface é ainda menos amigável que a de Taiwan[^10] [NEEDS-VERIFY].

Taiwan nessa posição de fato lidera — mas a liderança não impede o próximo problema.

**O problema é: interface difícil, dados não estruturados, não dá para baixar em lote**.

Abrindo a primeira versão da plataforma, você tinha de clicar PDF por PDF. Quer ver de que empresas um candidato recebeu dinheiro — abre PDF 1. Quer ver o próximo — abre PDF 2. Quer comparar entre candidatos — copia tabela à mão. Quer análise temporal — organiza a linha do tempo à mão. Quer saber se é o mesmo grupo fracionando em dezenas de laranjas — você tem de comparar endereços e sobrenomes manualmente.

É esse o cenário do engenheiro do g0v abrindo o arquivo em 2014.

---

## 2014: o g0v "Fluxo Eleitoral" começa a preencher a lacuna

O g0v é a comunidade de hackers cívicos de Taiwan[^11]. O nome vem de "trocar gov.tw por g0v.tw" — o trabalho de dados abertos que o governo não faz, a comunidade faz.

Num hackathon de 2014, alguns engenheiros decidiram fazer o projeto "Fluxo Eleitoral"[^12]. Objetivo claro:

1. Baixar os PDFs dos relatórios da Controladoria
2. Parsear para dados estruturados (CSV / JSON)
3. Fazer visualização para tornar compreensível
4. Abrir código de todos os scripts de extração e parseamento

A primeira etapa já travou — os PDFs eram escaneados, não PDFs digitais verdadeiros. Texto não se copiava diretamente. Tiveram de escrever pipeline de OCR, correção de formato, correspondência de nomes, desduplicação de empresas.

Meses depois, a primeira versão do "Fluxo Eleitoral" entrou no ar[^12]. Ao abrir a página, você não vê um relatório — vê um grafo de rede.

- Nós representam candidatos ou doadores
- Arestas representam direção do fluxo
- Espessura das arestas representa magnitude do valor
- Empresas relacionadas de um mesmo grupo são agrupadas por cor

Clique num nó, vê o detalhamento completo. Clique numa aresta, vê a fonte da declaração original (com indicação da página do PDF da Controladoria).

**O que essa visualização faz é transformar os dados que a Controladoria já tornava públicos em dados exploráveis**. Lei + plataforma + visualização — três camadas empilhadas, nasce a possibilidade operacional de "abrir o navegador e rastrear o dinheiro".

Não é só o "Fluxo Eleitoral". O ecossistema de fiscalização política do g0v ainda inclui:

- **councilor-voter-guide** (guia do eleitor para vereadores)[^13]: integra financiamento político, taxa de presença, histórico de proposições, histórico de interpelacões dos candidatos a vereador, gera "cartão de identidade do vereador"
- **Financiamento político obscuro**[^14] [NEEDS-VERIFY]: sinaliza padrões de fluxo suspeitos ou potencialmente irregulares
- **Cruzamento contratos públicos × financiamento político**: conecta dados do boletim de compras públicas com dados de financiamento político, vê quais empresas vencedoras são simultaneamente doadoras

A característica desses projetos é: **todos os dados brutos vêm de fontes governamentais públicas**. A comunidade não "revela segredos", "torna utilizáveis dados já públicos mas difíceis de usar".

Esse é o modelo saudável da infraestrutura de fiscalização cívica de Taiwan — governo fornece dados brutos, comunidade supre interface e análise, mídia e academia usam resultados da comunidade para fiscalizar. Três camadas, cada uma fazendo o que sabe.

---

## 2017: acordo de abertura de dados entre Controladoria e Comissão Eleitoral Central

2017 foi um ponto de virada.

Naquele ano, a Controladoria e a Comissão Eleitoral Central assinaram acordo de abertura de dados [NEEDS-VERIFY], parte dos dados de financiamento político passou a ser aberta em formato estruturado (CSV / campos parciais via API)[^15]. Embora não seja API completa, e muitos dados permaneçam em PDF — foi a primeira vez que a plataforma oficial de dados de Taiwan reconheceu formalmente que "dados estruturados é que são verdadeira abertura".

O "Fluxo Eleitoral" do g0v também迎来了 segunda geração[^12]. A nova versão não precisa processar grandes volumes via OCR, pode consumir diretamente o CSV oficial — eficiência de processamento sobe, erro desce, cobertura aumenta.

Mas **API completa até hoje não existe**. Em 2026, se você quiser fazer análise massiva de financiamento político trans-distrital, trans-anual, trans-candidato, ainda depende em parte dos pipelines de crawler mantidos pelo g0v. A linha "dados abertos do governo" nesse ponto do financiamento político caminhou vinte e dois anos e ainda não terminou.

---

## Problemas estruturais: a lei está bem escrita mas brechas existem

A Lei de Financiamento Político opera há vinte e dois anos, acumulou alguns problemas estruturais; não são falhas de desenho da lei em si — são desafios universais de qualquer lei de transparência.

### Um, doação fracionada para contornar tetos

O Artigo 18 fixa tetos de 100 mil para pessoa física, 1 milhão para empresa, aparentemente suficientes para impedir concentração de influência. Mas na prática, um grupo pode **fracionar uma grande doação única em dezenas de doações de laranjas**. Diretores do grupo, cônjuges dos diretores, responsáveis por subsidiárias, funcionários — cada um doa 100 mil como pessoa física, somando ultrapassa o teto em centenas de vezes[^16].

Esse padrão tecnicamente não viola o Artigo 18 — cada pessoa física está dentro do teto. Mas na substância é contorno. Para provar que é "fracionamento" de um mesmo recurso, precisaria rastrear origem do dinheiro, entrevistar envolvidos — a capacidade de verificação da Controladoria não alcança investigação caso a caso.

### Dois, zona cinzenta da cláusula de empréstimo

A lei permite que o candidato "empreste a si mesmo" para a campanha — ou seja, o próprio candidato ou familiares podem fornecer empréstimos de alto valor à campanha, quitados depois com outras receitas [NEEDS-VERIFY]. O desenho original visa garantir que candidatos não fiquem impossibilitados de concorrer por falta de capital inicial, mas na prática **o empréstimo vira frequentemente a fonte principal de recursos**. Empréstimo não conta como "financiamento político" — não sujeito ao teto do Artigo 18, não na mesma tabela de divulgação de doadores.

Resultado: o financiamento político declarado de um candidato pode ser apenas alguns milhões, mas o custo real de campanha chega a dezenas de milhões, a diferença vem de "autoempréstimo" — e a fonte final de quitação desse "autoempréstimo" costuma ficar fora do escopo de fiscalização da Lei de Financiamento Político.

### Três, financiamento político ≠ despesa de campanha

É o ponto mais fácil de confundir.

**Financiamento político** é o dinheiro que o candidato "recebe" — sujeito ao teto do Artigo 18, declarado à Controladoria.
**Despesa de campanha** é o dinheiro que o candidato "gasta" — sujeito ao teto do Artigo 41 da Lei de Eleição e Revogação de Funcionários Públicos[^17], declarado à Comissão Eleitoral Central.

São dois sujeitos diferentes (Controladoria vs Comissão Eleitoral), dois sistemas de declaração, duas interfaces públicas, duas definições de campos. **Em tese deveriam fechar** — dinheiro que entra menos sobra igual a dinheiro que sai — mas na prática os dois lados frequentemente não batem. Causa: diferenças de definição, prazos de declaração, destinação de sobras.

A comunidade g0v já tentou fazer "cross-check financiamento político × despesa de campanha" — mas a normalização necessária para cruzar plataformas exige volume de trabalho enorme[^12].

### Quatro, revogação e referendo não se aplicam requisitos de divulgação

A Lei de Financiamento Político regula "eleição de candidatos" — não inclui proponentes de revogação, não inclui proponentes de referendo.

Durante o grande movimento de revogação de 2025, as fontes de recursos dos grupos proponentes não tiveram obrigação de divulgação equivalente[^18]. Os grupos proponentes podem receber doações, podem mobilizar, mas não há sistema de declaração na Controladoria correspondente. Essa brecha, após a revogação em larga escala de 2025, tornou-se direção discutida de emenda legislativa — mas a Lei de Financiamento Político não é emendada desde 2018; até julho de 2026, o fluxo de proponentes de revogação e referendo permanece fora da obrigação legal de declaração.

---

## Comparação internacional: a posição relativa de Taiwan na Ásia

Voltando ao sistema de coordenadas asiático:

| País          | Órgão responsável               | Prazo de divulgação                                           | Amigabilidade da interface                   | Sistema de tetos                         |
| ------------- | ------------------------------- | ------------------------------------------------------------- | -------------------------------------------- | ---------------------------------------- |
| Taiwan        | Controladoria                   | 3-6 meses após eleição                                        | Média (parcialmente estruturado)             | Pessoa física 100 mil / empresa limitada |
| EUA           | FEC                             | Após eleição (parte com declaração periódica pré-eleição)[^8] | Alta (API completa)                          | Pessoa física / PAC em camadas           |
| Japão         | Ministério de Assuntos Internos | Relatório anual                                               | Baixa (predominantemente PDF)[^9]            | Brecha grande nas associações políticas  |
| Coreia do Sul | Comissão Eleitoral Nacional     | Após eleição                                                  | Baixa (interface legada)[^10] [NEEDS-VERIFY] | Gestão centralizada                      |

A posição relativa de Taiwan é: **base legal completa, plataforma existe, tetos razoáveis, mas interface ainda tem espaço de melhoria, brechas estruturais precisam de emenda**.

Não é o melhor — a FEC dos EUA em profundidade de dados e completude de API continua sendo benchmark internacional.
Mas também não é o pior — comparado a certos vizinhos que "têm divulgação na forma, mas na substância não dá para pesquisar", a plataforma da Controladoria mais o preenchimento do g0v formam um ecossistema em operação.

---

## Pontos de observação para a eleição de 2026

A eleição unificada de nove categorias de 28 de novembro de 2026 — 6 prefeitos de municípios especiais, 380 vereadores, 16 prefeitos de condados/cidades, 532 vereadores, 198 prefeitos de municípios/cidades rurais, 2.148 representantes, 6 chefes de distritos indígenas, 50 representantes de distritos, 7.748 chefes de vilarejos/bairros — total superior a 10.000 cargos eletivos[^19].

Pontos de observação de transparência do financiamento político para esta eleição, alguns merecem acompanhamento:

**Um, se a declaração em tempo real se expandirá**. Atualmente candidatos declaram após a eleição, divulgam meses depois. Se houver divulgação periódica pré-eleição (mesmo que mensal), o significado para a decisão do eleitor seria maior. Isso exige emenda legislativa ou ajuste no nível de ordem administrativa da Controladoria.

**Dois, se o espelho em tempo real do g0v conseguirá cobrir**. O "Fluxo Eleitoral" do g0v historicamente faz visualização completa pós-eleição, mas a cobertura "pré-eleição" segue limitada. 2026 poderá ter pipeline de dados cívico mais próximo de real-time, depende da energia da comunidade.

**Três, concentração de grandes doações**. Observar a proporção que poucos doadores ocupam no total de financiamento do candidato — quanto maior a concentração, mais profunda a dependência do candidato em relação a financiadores específicos. É indicador proxy para medir estrutura de política do dinheiro.

**Quatro, cruzamento com empreiteiros do governo**. Artigo 7 proíbe empreiteiros do governo de doar — mas execução trans-temporal tem defasagem (relação temporal complexa entre data de assinatura do contrato e data da doação). Todo ciclo pós-eleição surgem casos pontuais que disparam investigação da Controladoria. A profundidade de cobertura desses casos em 2026 também é ponto de observação.

**Cinco, brecha de divulgação de revogação / referendo**. A discussão de emenda mencionada acima se concretizará.

---

## Por que essa infraestrutura merece ser valorizada

Voltemos ao engenheiro do g0v abrindo o PDF no começo.

Se você perguntasse a ele: "Por que gastar fim de semana nisso? A maioria das pessoas nem usa." — ele não responderia "pela democracia", não responderia "pela transparência", talvez nem "pela fiscalização cívica".

Ele responderia — "porque esses dados **deveriam** poder ser usados assim, mas agora não dá".

Essa é a essência da cultura de engenheiros cívicos de Taiwan — **não é revolução, não é protesto, é preencher lacuna**. O governo já fez 80 pontos do trabalho, os 20 pontos restantes de usabilidade, explorabilidade, analisabilidade, a comunidade completa.

A Controladoria fez o máximo que a Lei de Financiamento Político permitia — receber dados, armazenar dados, fornecer interface de consulta. O g0v fez a extensão fora da interface da Controladoria — visualização, cruzamento de fontes, API-ficação, documentação comunitária. A mídia fez o jornalismo investigativo sobre a visualização do g0v — escava as histórias por trás do grafo de rede. A academia fez a análise estrutural de dados acumulados longamente — escreve as tendências de cada ciclo em papers.

**Essas quatro camadas de divisão de trabalho não são cada uma na sua, são nós diferentes da mesma cadeia**. Cada camada preenche o que a anterior não consegue. Falta uma camada, a seguinte não existe.

No dia da votação da eleição unificada de 2026, dos 7.748 chefes de vilarejo/bairro aos 6 prefeitos de municípios especiais — votação acaba, apuração acaba, eleitos e derrotados — todos desviam o olhar. Mas essa infraestrutura não para. O sistema de declaração da Controladoria receberá os relatórios contábeis de todos os candidatos, os crawlers do g0v baixarão a nova rodada de dados, uma nova geração de visualização começará a ser escrita sobre a mesa de café de algum hackathon.

**A forma mais concreta de infraestrutura democrática é justamente essa engenharia sem heróis, dia após dia, que torna os dados utilizáveis**.

Abra o navegador, digite o endereço, busque o nome do candidato — por trás dessa ação há a legislação de 2004, a plataforma de 2008, o hackathon de 2014, o acordo de 2017, a manutenção contínua de 2026.

Vinte e dois anos, um fluxo de dinheiro invisível tornou-se consultável.

🧬

---

## Leitura complementar

- [Comunidade open source e g0v](/pt/technology/open-source-and-g0v) — Como opera a comunidade de hackers cívicos, por que Taiwan tem esse ecossistema
- [Hub Político](/politics) — Visão panorâmica da infraestrutura democrática
- [Eleição unificada de 2026](/politics/2026 九合一選舉) — Sistemática e cronograma da eleição de 2026
- [Sistema da Comissão Eleitoral Central](/pt/politics/central-election-commission) — Desenho e operação da Comissão Eleitoral Central
- [O que é a eleição unificada](/pt/politics/nine-in-one-elections-explained) — Nove cargos, nove histórias

---

## Referências

[^1]: [Plataforma de consulta pública de financiamento político da Controladoria](https://ardata.cy.gov.tw/) — Entrada oficial de consulta de dados de financiamento político da Controladoria, fornece dados declarados históricos de candidatos / partidos / associações políticas.

[^2]: [Histórico legislativo da Lei de Financiamento Político](https://lis.ly.gov.tw/lglawc/lawsingle?00396B05E12200000000000000014000000004000000^03083093032600^00133001001) — Sistema integrado de recuperação de informações jurídicas do Yuan Legislativo, aprovado em terceira leitura a 26 de março de 2004. [NEEDS-VERIFY link]

[^3]: [Texto integral da Lei de Financiamento Político](https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=D0020042) — Base de dados nacional de legislação do Ministério da Justiça.

[^4]: [Artigo 7 da Lei de Financiamento Político](https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=D0020042) — Fonte oficial do Artigo 7 da Lei de Financiamento Político

[^5]: [Artigo 18 da Lei de Financiamento Político](https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=D0020042) — Limites de valor do financiamento político. Valores concretos conforme versão mais recente da base de dados de legislação.

[^6]: [Artigos 26 a 31 da Lei de Financiamento Político](https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=D0020042) — Fonte oficial dos Artigos 26 a 31 da Lei de Financiamento Político

[^7]: [Histórico de ativação da plataforma de financiamento político da Controladoria](https://ardata.cy.gov.tw/) — Página "Sobre" da plataforma registra principais ajustes históricos. [NEEDS-VERIFY ano exato de entrada no ar]

[^8]: [FEC: Federal Election Commission](https://www.fec.gov/) — Site oficial da Comissão Eleitoral Federal dos EUA, fornece API completa de finanças de candidatos.

[^9]: [Lei de Regulação de Fundos Políticos do Japão](https://www.soumu.go.jp/senkyo/seiji_s/) — Página do Ministério de Assuntos Internos do Japão sobre fundos políticos.

[^10]: [Comissão Eleitoral Nacional da Coreia do Sul](https://www.nec.go.kr/) — Comissão Eleitoral Nacional da Coreia do Sul. [NEEDS-VERIFY avaliação de amigabilidade da interface]

[^11]: [g0v Governo Zero](https://g0v.tw/) — Site oficial da comunidade de hackers cívicos de Taiwan.

[^12]: [Projeto Fluxo Eleitoral do g0v](https://g0v-money-flow.github.io/elections/) — Site do projeto de visualização de financiamento político.

[^13]: [g0v councilor-voter-guide](https://github.com/g0v/councilor-voter-guide) — Repositório GitHub do Guia do Eleitor para Vereadores.

[^14]: [Coleção de projetos eleitorais do g0v](https://g0v.tw/projects) — Conjunto de ferramentas open source de fiscalização cívica de financiamento político. Nome concreto de projeto a completar.

[^15]: [Explicação de dados abertos de financiamento político da Controladoria](https://ardata.cy.gov.tw/) — Explicação de download de dados e campos abertos da plataforma. [NEEDS-VERIFY data de assinatura do acordo de 2017]

[^16]: [Paper da Associação de Ciência Política de Taiwan](http://www.tpsahome.org.tw/) — Discussão acadêmica sobre doação fracionada para contornar tetos dispersa entre eles. Casos concretos, conforme princípio comum de "não citar nomes", não citados no texto.

[^17]: [Artigo 41 da Lei de Eleição e Revogação de Funcionários Públicos](https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=D0020010) — Forma de cálculo do teto máximo de despesa de campanha.

[^18]: [Sistema integrado de assuntos legislativos do Yuan Legislativo](https://misq.ly.gov.tw/) — Discussões de emenda sobre tema de fluxo de dinheiro da grande revogação de 2025 dispersas entre eles, Yuan Legislativo ainda não incluiu em agenda formal.

[^19]: [Anúncios relativos à eleição unificada de 2026 da Comissão Eleitoral Central](https://www.cec.gov.tw/) — Site oficial da Comissão Eleitoral Central. [NEEDS-VERIFY números exatos de cargos conforme anúncio final da Comissão Eleitoral Central]

---

_Última atualização: 2026-05-27 — Série Hub Político da eleição unificada de 2026 NOVO artigo._
_Autor: Taiwan.md 🧬_
