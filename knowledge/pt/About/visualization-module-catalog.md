---
title: 'Catálogo de Módulos de Visualização: Dezenove Maneiras de Ver os Dados de Taiwan'
description: 'Exemplos vivos dos módulos de visualização de artigos do Taiwan.md — renderizando cada módulo tw-* uma vez com dados reais de habitação, população, saúde e parlamento de Taiwan, acompanhados da sintaxe e princípios de design do graph.md.'
date: 2026-06-06
category: 'About'
tags:
  [
    'Visualização de dados',
    'Justiça habitacional',
    'Política habitacional',
    'Dados abertos',
  ]
author: 'Taiwan.md'
readingTime: 11
featured: false
lastVerified: 2026-06-12
lastHumanReview: false
image: '/article-images/society/taipei-skyline-housing-2026.webp'
imageCredit: 'Heeheemalu'
imageLicense: 'CC BY-SA 4.0'
imageSource: 'https://commons.wikimedia.org/wiki/File:20260204_Taipei,_Taiwan_Skyline.jpg'
relatedDiary: ['2026-07-16-222859-viz-evolution']
translatedFrom: 'About/視覺化模組型錄.md'
sourceCommitSha: '756ab2957'
sourceContentHash: 'sha256:e634c73174fd4145'
sourceBodyHash: 'sha256:5fe923f8d157fe62'
translatedAt: '2026-10-23T16:39:24.604499+00:00'
---

# Catálogo de Módulos de Visualização: Dezenove Maneiras de Ver os Dados de Taiwan

> **Visão geral em 30 segundos:** Esta página é o "exemplo vivo" do sistema de visualização do Taiwan.md — renderiza cada um dos dezenove módulos visuais de artigo uma vez, todos com dados reais de Taiwan (razão preço-renda, habitação pública, envelhecimento, referendos, razão enfermeiro-paciente, assentos legislativos). É o parceiro do guia editorial [graph.md](https://github.com/frank890417/taiwan-md/blob/main/docs/editorial/graph.md): **o graph.md explica "quando usar qual, como fazer bem, como escrever a sintaxe", esta página mostra "como fica".** Cada módulo é renderizado em HTML/SVG puro, então pessoas, leitores de tela, Google e rastreadores de IA leem a mesma base de dados — é precisamente por isso que escolhemos visualização estática em vez de gráficos interativos.

Ao escrever um artigo sobre números, o maior medo é transformar dados em parágrafos empilhados de cifras, fazendo o leitor desligar no terceiro percentual. O trabalho da visualização é reverter a entropia de uma "prosa densa de números" para uma "estrutura legível num relance".

Mas a visualização do Taiwan.md tem uma disciplina que outros não têm: **fazemos apenas visualização que "um LLM também consegue ler"**. Um gráfico interativo feito com D3 ou Canvas é vistoso, mas GPTBot, PerplexityBot, ClaudeBot — esses rastreadores de IA não executam JavaScript; para eles, aquele gráfico é uma tela em branco. Já nossos gráficos feitos com HTML semântico e SVG inline têm os dados no código-fonte; a IA lê e cita os dados de primeira mão de Taiwan em seis idiomas. **Visualização que LLM lê é visualização de soberania.**

Abaixo, os dezenove módulos, do mais simples "um grande número" ao "mapa de ladrilhos por condado/cidade" e "arco de assentos", exibidos em sequência. A sintaxe completa e os princípios de design estão no graph.md; aqui vai apenas uma frase do tipo "o que é, quando usar".

## Número grande tw-figure

O mais simples e mais potente: colocar um número dramático no tamanho máximo, com contraponto anterior/posterior contando uma virada. Ideal para abrir o artigo com um "sledgehammer stat" (número-martelo).

```tw-figure
67 mil → 870 mil / ping
Preço de venda estocado da Chenggong Habitação Nacional de Taipé em 1985, ao preço médio de corretoras em 2026 — o mesmo endereço, cerca de 13 vezes mais
Plataforma de corretoras de Registro de Preços Reais (Chenggong Habitação Nacional)
```

## Grupo de dados tw-stat

Quando um parágrafo enfia três ou quatro números-chave lado a lado, em vez de uma frase comprida, melhor alinhar como uma fileira de cartões para o leitor varrer num golpe de olho.

```tw-stat
174.891 unidades | Habitação pública construída diretamente pelo governo | 1976–1999
390 mil+ unidades | Total de habitação pública em sentido amplo | Até a revogação em 2015
84,4% | Taxa de propriedade de moradia própria em Taiwan | 2024
Fonte: Comunicado do Yuan Executivo sobre revogação da Lei de Habitação Nacional, Plataforma de Informação Imobiliária do Ministério do Interior
```

Módulos editoriais com dados (grupo de dados, cartão de comparação, eixo de política) devem exibir `Fonte:` igual aos módulos de gráfico. A auditoria de todo o site em 2026-07 descobriu que os módulos vigiados pelo portão automático tinham taxa de citação de fonte de 100%; justamente os três módulos de alta frequência não vigiados é que "corriam nus" em 40% dos exemplos. Agora eles também entraram no portão viz-health.

## Cartão de comparação tw-versus

Dois regimes, duas posições, ou dois estados anterior/posterior comparados ponto a ponto. Esquerda cor quente, direita cor fria, um "vs" no meio, para a diferença ser lida linha a linha.

```tw-versus
Guózhái de Taiwan | Juūk de Hong Kong
Governo subsidia, vende barato ao morador | Governo subsidia, vende barato ao morador
Após morar 1 ano, pode revender a preço de mercado | Revenda no mercado aberto exige primeiro "pagar o valor do terreno"
Valorização fica quase toda com o indivíduo | Valorização devolvida ao erário na proporção do desconto original
Estoque público perdido de uma vez | Vantagem pública recuperável
Fonte: Gazeta do Yuan Legislativo, Comitê de Habitação de Hong Kong
```

## Barras de proporção tw-bars

Comparação ou ranking de poucas categorias; o comprimento da barra horizontal escala automaticamente pelo valor, o máximo preenche a largura. Módulos de dados lembram de adicionar uma linha final `Fonte:`, que vira automaticamente a nota de rodapé.

```tw-bars
Nacional 2014 | 8,41 vezes
Nacional 2024 | 10,76 vezes
Taipé 2024 | 16,60 vezes | Pico histórico
Fonte: Plataforma de Informação Imobiliária do Ministério do Interior, Centro de Pesquisa Imobiliária da Universidade Nacional Chengchi
```

## Gráfico de grade (waffle) tw-waffle

Composição parte-versus-todo em proporção; cem quadradinhos representam cem por cento, mais intuitivo que pizza — você pode literalmente contar os quadradinhos. Adequado para dados "quanto cada categoria representa" somando aproximadamente 100.

```tw-waffle
Composição da habitação de Viena (2023)
Habitação social municipal | 21,9
Habitação social com lucro limitado | 21,4
Moradia própria | 20,4
Aluguel privado | 36,3
Fonte: Estatísticas de habitação do Governo de Viena (Stadt Wien)
```

## Eixo de política tw-timeline

Encadeamento dos marcos institucionais ou de política, ligados por uma linha do tempo com nós. Atenção: isto é "auxílio visual", não substitui o fato de que o texto corrido não deve usar estilo annalístico ("1975..." como subtítulo).

```tw-timeline
1975 | Lei de Habitação Nacional entra em vigor | Governo constrói e vende, define "qualificação de comprador" em circuito fechado, subsídio não vaza
2002 | Aquela parede é derrubada | Emenda revoga restrição de qualificação de comprador, Guózhái morado 1 ano pode ser vendido a qualquer um
2015 | Lei de Habitação Nacional revogada | Razão oficial: taxa de propriedade já 85%, muda para só alugar, não vender, habitação social
2026 | Taoyuan recoloca o portão | Habitação acessível: revenda não pode exceder preço original de aquisição
Fonte: Gazeta do Yuan Legislativo, Comunicado do Yuan Executivo sobre revogação da Lei de Habitação Nacional
```

## Cartão de citação tw-quote

Quando uma frase sozinha carrega a tensão central do artigo, amplie-a num cartão de citação. Não coloque aspas você mesmo, o módulo coloca. A citação deve ser textual e verificável.

```tw-quote
Uma casa de 30 milhões no preço de mercado vira casa de 60 a 70 milhões... roubar dos pobres para dar aos ricos, o Estado gasta dinheiro ajudando gente rica a reconstruir casa
Lin Chih-chun | Advogado, 2025, criticando proposta "Estado financia renovação urbana da Chenggong Habitação Nacional"
```

## Chip de fonte tw-source

Concentrar as fontes de uma análise num chip discreto, ao lado do parágrafo. Credibilidade faz parte da curadoria — mídia digital de Taiwan frequentemente esquece de citar fonte, é onde podemos ser diferentes.

```tw-source
Plataforma de Informação Imobiliária do Ministério do Interior, Registro de Preços Reais, Centro de Pesquisa Imobiliária da Universidade Nacional Chengchi, Gazeta do Yuan Legislativo, Comitê de Habitação de Hong Kong
```

## Caixa de explicação tw-note

Metade da credibilidade do jornalismo de dados está em "como você calculou". Repórteres em data journalism usam blocos 【Explicação】 para detalhar método de cálculo e (nota) para marcar correções; transformamos essa convenção em módulo. Primeira linha escreve `Explicação`/`Método`/`Nota`/`Correção`/`Atualização` um deles; cada linha seguinte forma seu próprio parágrafo.

```tw-note
Explicação
O "índice de envelhecimento" desta página = população ≥ 65 anos ÷ população 0–14 anos × 100. Igual a 100 significa idosos e crianças em número igual; quanto maior o número, mais "cabeça pesada, pés leves" o lugar.
Taxa de envelhecimento e índice de envelhecimento vêm das estatísticas de final de 2025 do Departamento de Administração Doméstica do Ministério do Interior; análise completa dos 22 condados/cidades ver 〈Veja os 22 condados/cidades de Taiwan com dados〉.
```

## Gráfico de linhas tw-line

Quatro ou mais pontos no tempo para tendência, desenhado em SVG inline; os limites superior/inferior do eixo y aparecem para o leitor ver o intervalo. O mais crucial: **gera automaticamente uma tabela de dados oculta**, para leitores de tela e rastreadores de IA lerem os valores brutos. O gráfico é para pessoas, a tabela é para máquinas, ambas da mesma fonte.

```tw-line
Subida de dez anos da razão preço-renda nacional (vezes)
Ano | Nacional
2014 | 8,41
2016 | 9,32
2018 | 8,57
2020 | 9,20
2022 | 9,61
2024 | 10,76
Base: ponto de partida 2014 | 8,41
Fonte: Centro de Pesquisa Imobiliária da Universidade Nacional Chengchi, Plataforma de Informação Imobiliária do Ministério do Interior
```

O gráfico de linhas também suporta **linha de base**: adicione uma linha `Base: rótulo | valor`, vira tracejada, sem extremidades, só um rótulo, visualmente separada da série medida. O leitor não confunde um limiar fixo com um dado medido.

## Gráfico de inclinação (slope) tw-slope

Quando só há "dois pontos no tempo", o gráfico de linhas desperdiça o meio em branco. O slope liga as duas pontas direto; quem subiu mais forte, quem ultrapassou quem, se vê num golpe. Adicionar `*` no começo do rótulo destaca aquela linha; as demais viram cinza de contexto.

```tw-slope
Razão preço-renda: quem subiu mais forte em dez anos (vezes)
2014 | 2024
Nacional | 8,41 | 10,76
*Taipé | 12,0 | 16,60
Fonte: Plataforma de Informação Imobiliária do Ministério do Interior, Centro de Pesquisa Imobiliária da Universidade Nacional Chengchi
```

## Mapa de calor tw-heatmap

Região×indicador, ou ano×categoria, matriz de comparação. Cada coluna normalizada independentemente em intensidade de cor; valor maior = mais quente. Ele próprio já é uma tabela HTML, logo nativamente legível por IA — por isso o heatmap no nosso sistema ganha de "uma imagem colorida".

```tw-heatmap
Condado/Cidade | Razão preço-renda (vezes) | Taxa de esforço hipotecário (%)
Taipé | 16,60 | 63,9
Novo Taipé | 13,03 | 56,9
Taichung | 11,11 | 48,0
Taoyuan | 9,0 | 40,0
Fonte: Plataforma de Informação Imobiliária do Ministério do Interior
```

## Gráfico de pontos tw-dot

Gráficos de barras comparam "quantidade", gráficos de pontos mostram "distribuição": todos os pontos caem na mesma escala, você vê quem está agrupado, quem são os valores atípicos. Uma coluna com um valor é um dot strip; com dois valores desenha-se um intervalo "daqui até ali"; com três valores (`estimativa pontual | limite inferior | limite superior`) desenha-se ao estilo de pesquisas de opinião "estimativa pontual + faixa de incerteza". A margem de erro de ±3% não deve ser ignorada — esta é a honestidade que mais falha em anos eleitorais. `*` também pode ser usado para enfatizar.

```tw-dot
Os dois extremos da taxa de envelhecimento: dos condados/cidades mais jovens aos mais velhos (proporção de 65 anos ou mais, %)
Hsinchu County | 15.08 | O mais jovem de Taiwan
Taoyuan | 16.72
Taichung | 17.40
New Taipei | 19.95
Tainan | 20.48
Kaohsiung | 20.79
*Chiayi County | 24.11 | Índice de envelhecimento mais alto de Taiwan
*Taipei | 24.18 | O mais alto de Taiwan
Fonte: Departamento de Administração Doméstica do Ministério do Interior, final de 2025
```

## Barras empilhadas tw-stack

Waffle serve para "composição de um todo"; barras empilhadas servem para **comparar composição entre várias linhas** — cada linha normalizada a 100%, segmentos largos recebem o valor escrito dentro da faixa de cor.

```tw-stack
Três referendos nucleares: Sim vs Não (% votos válidos)
Referendo | Sim | Não
2018 Nuclear para energia verde | 59 | 41
2021 Reiniciar Quarta Usina | 47 | 53
2025 Extensão da Terceira Usina | 74 | 26
Fonte: Resultados oficiais dos três referendos da Comissão Eleitoral Central
```

## Pirâmide tw-pyramid

Barras costas com costas, dois campos à esquerda e à direita, rótulo compartilhado no meio; clássico da demografia. Aqui olhamos o "cabeça pesada, pés leves" de seis condados/cidades: esquerda crianças, direita idosos; comparando os dois lados, o envelhecimento deixa de ser percentual abstrato.

```tw-pyramid
Cabeça pesada, pés leves: proporção população jovem vs idosa em seis condados/cidades (%)
Condado/Cidade | 0–14 anos | ≥ 65 anos
Condado de Hsinchu | 14,80 | 15,08
Taoyuan | 13,13 | 16,72
Taichung | 12,75 | 17,40
Taipé | 11,97 | 24,18
Keelung | 9,28 | 22,28
Condado de Chiayi | 8,27 | 24,11
Fonte: Departamento de Administração Doméstica do Ministério do Interior, final de 2025; proporção jovem estimada por taxa de envelhecimento ÷ índice de envelhecimento × 100
```

## Mapa de ladrilhos tw-tiles

O mapa coroplético de Taiwan tem dois vícios velhos: Hualien e Taitung grandes demais roubam peso visual; Taiwan desenhado à mão por IA vive virando "entre azeitona e batata". O mapa de ladrilhos arranja os 22 condados/cidades em tijolos de mesmo tamanho (layout fixo no sistema, respeitando posições relativas reais); cada ladrilho pesa igual, o número escrito em cima. A forma está sempre certa, porque simplesmente não desenha forma.

```tw-tiles
Taxa de envelhecimento dos 22 condados/cidades de Taiwan (população ≥ 65 anos, %)
Taipé | 24,18
Novo Taipé | 19,95
Taoyuan | 16,72
Taichung | 17,40
Tainan | 20,48
Kaohsiung | 20,79
Keelung | 22,28
Hsinchu | 16,16
Chiayi | 19,90
Condado de Hsinchu | 15,08
Condado de Miaoli | 20,23
Condado de Changhua | 20,37
Condado de Nantou | 22,66
Condado de Yunlin | 21,76
Condado de Chiayi | 24,11
Condado de Pingtung | 21,84
Condado de Yilan | 20,77
Condado de Hualien | 21,52
Condado de Taitung | 20,93
Condado de Penghu | 21,03
Condado de Kinmen | 19,69
Condado de Lienchiang | 17,14
Fonte: Departamento de Administração Doméstica do Ministério do Interior, final de 2025
```

## Gráfico de unidades (isotype) tw-iso

"174.891 unidades" é número que se lê e esquece; nove bolinhas que se contam nos dedos não são. O isotype troca o número grande por "um símbolo = quantos" em unidades contáveis; é a lição dos repórteres que fazem reportagem sobre pesca de alto mar: transformar o número vasto sem sensação em unidade que o público sente. Símbolo só usa inteiros (não corta meio), valor exato escrito ao lado.

```tw-iso
Quantas habitações públicas o governo construiu nestes 24 anos
單位：● = 20.000 unidades
Construção direta do governo | 174.891 unidades | 1976–1999
Total habitação pública amplo | 390.000+ unidades | Até revogação em 2015
Fonte: Comunicado do Yuan Executivo sobre revogação da Lei de Habitação Nacional
```

## Arco de assentos tw-arc

A composição de assentos do parlamento tem seu gráfico próprio: meia-circunferência de pontos, um assento = um ponto, partidos na ordem listada formando setores contíguos. Pizza compara ângulo (olho humano é ruim nisso); arco de assentos deixa você contar pontos, a linha da maioria desenhada exatamente onde deve. Aqui usamos o resultado da eleição legislativa de 2024: 113 assentos, três partidos sem maioria, aquela linha tracejada é o ponto de partida de todo o cabo de guerra do grande recall posterior. Atenção: é gráfico de parlamento; eleição de 22 prefeitos de condado/cidade tipo "um distrito um vencedor" usa o mapa de ladrilhos abaixo.

```tw-arc
Assentos do Yuan Legislativo 2024: três partidos sem maioria (113 assentos)
過半：57
KMT | 52
DPP | 51
TPP | 8
Independentes | 2 | Tendência pan-azul
Fonte: Comissão Eleitoral Central
```

## Grade de pequenos múltiplos tw-multiples

Uma figura espremendo cinco linhas vira macarronada; pequenos múltiplos dão a cada linha sua própria celula, **todas as células compartilham a mesma régua**, para as formas serem comparáveis. Aqui usamos as três razões enfermeiro-paciente por turno: o heatmap (acima) dá a matriz exata; pequenos múltiplos dão a forma "todo nível sobe madrugada adentro, o nível de base sobe mais íngreme". Mesmos dados, perguntas diferentes, gráfico diferente.

```tw-multiples
Quanto mais funda a noite, quanto mais base o hospital, mais camas um enfermeiro cuida (pessoas)
Coluna: Turno | Razão enfermeiro-paciente
--- Centro médico
Turno diurno | 6
Turno vespertino | 9
Turno noturno | 11
--- Hospital regional
Turno diurno | 7
Turno vespertino | 11
Turno noturno | 13
--- *Hospital distrital
Turno diurno | 10
Turno vespertino | 13
Turno noturno | 15
Fonte: Anúncio do padrão de razão enfermeiro-paciente nos três turnos do Ministério da Saúde e Bem-Estar, 2024
```

## Como usar estes módulos

Cada módulo se escreve no Markdown do artigo como um bloco ` ```tw-* `, colunas separadas por `|`; na build vira automaticamente o que você vê acima — o autor não escreve nenhum HTML ou JavaScript. Sintaxe completa, quando usar qual, como fazer cores e eixos sem induzir a erro, e checklist de visualização antes de publicar, tudo no [graph.md](https://github.com/frank890417/taiwan-md/blob/main/docs/editorial/graph.md).

Este sistema bebeu da filosofia editorial do veículo de narrativa visual [The Pudding](https://pudding.cool/) — pergunta antes dos dados, conclusão clara, anotação é protagonista — mas cresceu órgãos próprios do Taiwan.md: estático, multilíngue, legível por IA. O fio condutor do design está no [Relatório de Design do Sistema de Visualização](https://github.com/frank890417/taiwan-md/blob/main/reports/article-visualization-design-2026-06-06.md).

Para ver estes módulos entrelaçados na narrativa de um artigo profundo real, leia [Habitação Pública e Justiça Habitacional](/pt/society/public-housing-justice) — a maioria dos dados desta página vem da pesquisa daquele artigo.

## Este sistema também está em evolução

A página que você lê agora é fruto de três rodadas de evolução. Já que é página que fala de linha do tempo, use o próprio módulo de eixo de política para contar a própria história:

```tw-timeline
2026-06-06 | Nasce dez módulos | Após pesquisar classificação de gráficos do The Pudding e FT, nasce primeiro lote: número grande, cartão de comparação, barras de proporção, linhas
2026-06-12 | Uma semana depois chega a dezessete | Acrescenta inclinação, pontos, empilhadas, pirâmide, mapa de ladrilhos, isotype; validador de pixels viz-shot nasce no mesmo dia, porque "markup existe" e "renderizou certo" são duas coisas
2026-07-16 | Dezenove, e aprendeu a falar seis idiomas | Arco de assentos e pequenos múltiplos entram; "fonte de dados" e outras strings do sistema passam a ser renderizadas nas seis línguas, versão inglês/japonês do mapa de ladrilhos não vira mais barras compridas
Fonte: Relatório de Design e Evolução do Sistema de Visualização do Taiwan.md (2026-06 a 2026-07, público no GitHub)
```

O foco da terceira rodada na verdade não foram novos tipos de gráfico, foi um check-up honesto. Auditoria de todo o site achou: módulos vigiados pelo portão automático, taxa de citação de fonte 100%; três módulos de alta frequência não vigiados, 40% "correndo nus". Regra escrita no guia editorial há dois meses, comportamento porém seguia totalmente o formato do instrumento; por isso desta vez alargamos o instrumento para ficar tão largo quanto a regra. Na mesma rodada também pegamos strings do sistema nas páginas inglês, japonês, coreano renderizando todas em chinês, até um caractere simplificado misturado em tag de acessibilidade sem ninguém notar. Para um sistema que afirma "fazer LLM ler dados de Taiwan em seis idiomas", esses cantos importam mais que feature nova.

Pesquisas recentes também deram lastro a esta rota: precisão de IA multimodal reconstruindo valores de gráfico a partir de imagem não é confiável; nós de texto é o que máquina lê de forma estável. É exatamente por isso que o mapa de ladrilhos escreve o número no ladrilho, cada gráfico traz uma tabela oculta. Processo completo de pesquisa e decisões de design no [Relatório Profundo de Pesquisa e Implementação do Sistema de Visualização v3.0](https://github.com/frank890417/taiwan-md/blob/main/reports/viz-module-evolution-2026-07-16.md).

**Leitura complementar**:

- [Habitação Pública e Justiça Habitacional](/pt/society/public-housing-justice) — A história completa por trás destes dados de habitação: como a habitação pública virou escada de ativos, fonte da maioria dos módulos desta página
- [Veja os 22 condados/cidades de Taiwan com dados](/pt/geography/data-taiwan-22-cities) — Dados de envelhecimento do gráfico de pontos, pirâmide, mapa de ladrilhos e caixa de explicação vêm da análise completa dos 22 condados/cidades deste artigo
- [Taiwan e o Debate Nuclear](/pt/society/taiwan-nuclear-debate) — A história completa daqueles três referendos das barras empilhadas: ganhou o debate, perdeu o sistema
- [Lei de Saúde](/pt/society/medical-care-act) — A história completa daqueles números de razão enfermeiro-paciente dos três turnos dos pequenos múltiplos: a lei escreve quantas camas cuidar, não escreve se existem aquelas mãos
- [Grande Recall](/pt/history/great-recall-movement-2024) — O depois daquela linha tracejada da maioria do arco de assentos: como o Yuan Legislativo de três partidos sem maioria chegou a 31 casos de recall
- [Crise de Natalidade em Taiwan](/pt/society/taiwan-low-birth-rate-crisis) — Não conseguir comprar casa e não conseguir ter filhos, o outro lado da justiça intergeracional

## Créditos de imagem

Este artigo usa 1 imagem licenciada CC, em cache em `public/article-images/society/`:

- [Horizonte residencial de Taipé (vista do Monte Elefante)](https://commons.wikimedia.org/wiki/File:20260204_Taipei,_Taiwan_Skyline.jpg) — Foto: Heeheemalu, 2026, CC BY-SA 4.0 (hero)

## Referências

[^1]: [Plataforma de Informação Imobiliária do Ministério do Interior](https://pip.moi.gov.tw/Publicize/Info/E1050) — Razão preço-renda, taxa de esforço hipotecário, taxa de propriedade e outras estatísticas oficiais de habitação.

[^2]: [Centro de Pesquisa Imobiliária da Universidade Nacional Chengchi](https://rer.nccu.edu.tw/article/detail/2210058908437) — Indicadores anuais de acessibilidade habitacional, fonte da série nacional de razão preço-renda do gráfico de linhas e barras de proporção desta página.

[^3]: [Comunicado do Yuan Executivo sobre revogação da Lei de Habitação Nacional](https://www.ey.gov.tw/Page/9277F759E41CCD91/d4afaf10-ece5-4b4f-9482-35ce16bdc657) — Total acumulado de unidades de habitação pública (aprox. 390 mil+ unidades) e outros dados oficiais.

[^4]: [Dados estatísticos populacionais do Departamento de Administração Doméstica do Ministério do Interior](https://www.ris.gov.tw/app/portal/346) — Taxa de população ≥ 65 anos e índice de envelhecimento por condado/cidade no final de 2025, fonte do gráfico de pontos, pirâmide, mapa de ladrilhos e caixa de explicação desta página; cadeia completa de verificação ver 〈[Veja os 22 condados/cidades de Taiwan com dados](/pt/geography/data-taiwan-22-cities)〉.

[^5]: [Comissão Eleitoral Central - Resultado do Caso 16 do Referendo de 2018 (PDF)](https://web.cec.gov.tw/api/file/0132581c-18b5-4951-bc24-3cc083924666.pdf) — Percentuais de Sim nos três referendos nucleares (59%/47%/74%) são resultados oficiais da Comissão Eleitoral; cadeia de verificação caso a caso ver 〈[Taiwan e o Debate Nuclear](/pt/society/taiwan-nuclear-debate)〉.

[^6]: [CNA: Eleição legislativa de 2024 - três partidos sem maioria](https://www.cna.com.tw/news/aipl/202401130361.aspx) — Distribuição dos 113 assentos do arco de assentos (KMT 52, DPP 51, TPP 8, Independentes 2) é resultado oficial da Comissão Eleitoral; cadeia de verificação ver 〈[Grande Recall](/pt/history/great-recall-movement-2024)〉.

[^7]: [Anúncio do padrão de razão enfermeiro-paciente nos três turnos do Ministério da Saúde e Bem-Estar (2024)](https://www.mohw.gov.tw/) — Valores padrão dos três níveis × três turnos dos pequenos múltiplos; cadeia de verificação ver 〈[Lei de Saúde](/pt/society/medical-care-act)〉.
