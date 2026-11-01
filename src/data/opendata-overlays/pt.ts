import type { DeepPartial, OpendataContent } from '../opendata-content';

export const pt: DeepPartial<OpendataContent> = {
  meta: {
    title:
      'Curadoria de Dados Abertos — Um guia da camada de sentido para os dados abertos de Taiwan × Twinkle Hub',
    description:
      'Cinquenta mil conjuntos de dados governamentais sobrecarregariam qualquer pessoa. Esta página é a curadoria de dados do Taiwan.md: quais conjuntos merecem atenção, como combiná-los quando se quer analisar algo e a quais histórias desta ilha cada lote de números se liga. Inclui uma avaliação de primeira mão, feita na prática, da completude, da estabilidade e da simplificação de acesso do Twinkle Hub.',
  },
  hero: {
    eyebrow: 'CURADORIA DE DADOS ABERTOS',
    title: 'Curadoria de Dados Abertos',
    subtitle:
      'Um guia da camada de sentido para os dados abertos de Taiwan × Twinkle Hub',
    intro: [
      'A plataforma de dados abertos do governo de Taiwan reúne mais de cinquenta e dois mil conjuntos de dados. Esse número sobrecarrega quem realmente quer usá-los: não se sabe quais importam, até quando cada um é atualizado, quais duas tabelas podem ser cruzadas, muito menos como tudo isso se relaciona com as perguntas que lhe interessam.',
      'O Taiwan.md escreveu mais de mil e cem artigos sobre Taiwan, e por trás de cada um há um juízo: que dados deveriam verificar isto? Esta página abre essa camada de juízo: como avaliamos a infraestrutura de dados, quais conjuntos combinar (e como) ao analisar uma pergunta e a quais histórias desta ilha cada domínio de dados se conecta.',
    ],
    viz: {
      stats: [
        { label: 'conjuntos de dados do governo (2026-10-23)' },
        { label: 'sentenças judiciais em texto integral' },
        { label: 'questões de concursos nacionais' },
        { label: 'linhas de análise nutricional' },
        { label: 'registros de contratações' },
      ],
      graphHint:
        'A rede abaixo é real: à esquerda, 20 domínios de dados e cinco corpora verticais (a partir do rastreamento do Twinkle Hub); à direita, os artigos do Taiwan.md já escritos. Cada linha é um juízo de curadoria feito nesta página. Arraste e passe o cursor para ver dados confusos se ligarem a histórias claras.',
      legend: {
        domain: 'Domínio de dados',
        vertical: 'Corpus vertical',
        article: 'Artigo do Taiwan.md',
        center: 'Camada de sentido do Taiwan.md',
      },
    },
  },
  ecosystem: {
    title: 'O mapa do ecossistema: três camadas, cada uma com seu papel',
    lead: 'Para que uma IA (ou uma pessoa) responda de verdade a perguntas sobre Taiwan, três camadas precisam funcionar juntas: a casa dos dados, o caminho das consultas e a camada de sentido.',
    layers: [
      {
        name: 'data.gov.tw e sistemas dos órgãos',
        role: 'A casa dos dados (fonte única)',
        desc: 'A plataforma de dados abertos do governo é a identidade permanente de cada conjunto: ID do conjunto, termos de licença, órgão competente, downloads brutos. Toda citação deve, em última instância, remeter a este ponto.',
        stat: 'mais de 52.000 conjuntos de dados (2026-10-23)',
      },
      {
        name: 'Twinkle Hub',
        role: 'O caminho das consultas (porta de entrada MCP)',
        desc: 'O primeiro hub MCP de Taiwan, que reúne dados espalhados por centenas de portais do governo em um único ponto de consulta: busca semântica, consultas estruturadas por linha e ferramentas para cinco domínios verticais. A IA obtém os dados em uma chamada, sem a maratona manual entre portais.',
        stat: '21 ferramentas · 20 domínios',
      },
      {
        name: 'Taiwan.md',
        role: 'A camada de sentido (curadoria)',
        desc: 'Dados não falam por si. Qual conjunto merece ser apontado, que afirmação ele verifica, a que trecho da história se liga — isso é trabalho de curadoria. Desde junho de 2026, nossos artigos ganham, um a um, seções de "Dados públicos" que costuram a narrativa aos dados brutos.',
        stat: '1.100+ artigos · 15 indicações de dados ativas',
      },
    ],
  },
  assessment: {
    title: 'Avaliação em três dimensões: o que encontramos em testes práticos',
    lead: 'A seguir, a avaliação de primeira mão do Taiwan.md como usuário, feita com nossas próprias ferramentas de verificação (duas rodadas de testes, em maio e junho de 2026), organizada em três dimensões. Isto não é propaganda; é um check-up.',
    gapsLabel: 'Lacunas, com franqueza',
    dims: [
      {
        name: 'Completude dos dados',
        verdict: 'A cobertura é real e vai além de um simples espelho',
      },
      {
        name: 'Estabilidade',
        verdict: 'Fiel à sua natureza alfa: roda rápido e muda rápido',
      },
      {
        name: 'Simplificação de acesso',
        verdict: 'Este é o seu ponto mais forte',
      },
    ],
  },
  verticals: {
    title: 'Cinco corpora verticais: a parte que vai além do espelho',
    lead: 'Embrulhar conjuntos de dados numa interface de busca não tem nada de especial; estes cinco domínios verticais acrescentam recuperação semântica e extração estruturada — a parte do Twinkle Hub que vai além de ser um "espelho do data.gov.tw".',
    logNote:
      'As barras de magnitude usam escala logarítmica: o corpus de sentenças é 17 vezes o de registros de medicamentos, e um gráfico linear esmagaria as outras quatro barras até a invisibilidade.',
    items: [
      {
        name: 'Patentes',
        stat: 'Texto integral das patentes de invenção publicadas pelo TIPO',
        desc: 'Consultas em linguagem natural sobre o corpus de patentes, com descrições técnicas e reivindicações completas. Ao escrever sobre as indústrias de Taiwan, a pergunta "esta empresa realmente detém essa tecnologia?" pode, pela primeira vez, ser verificada por busca semântica.',
      },
      {
        name: 'Concursos nacionais',
        stat: '64.815 provas · 320.000 questões (2012–2025)',
        desc: 'Provas do Ministério dos Exames ao longo dos anos, pesquisáveis até o nível da questão. A cultura dos concursos públicos de Taiwan — a febre do emprego no setor público, as ruas de cursinhos — é uma história que ninguém contou ainda com dados.',
      },
      {
        name: 'Sentenças judiciais',
        stat: 'cerca de 1,24 milhão de registros (2024-05 a 2026-03, alfa)',
        desc: 'Recuperação em linguagem simples sobre o corpus de sentenças. Para artigos sobre o Judiciário, disputas trabalhistas e conflitos de aluguel, a pergunta "como os tribunais decidem na prática" agora tem uma porta de entrada verificável.',
      },
      {
        name: 'Medicamentos e saúde',
        stat: '71.836 registros de medicamentos · 96.803 códigos CID-10 em chinês',
        desc: 'Registros de medicamentos, campos estruturados das bulas, certificações de alimentos saudáveis e triagem preliminar de interações. A camada factual para artigos sobre o Seguro Nacional de Saúde e a medicina.',
      },
      {
        name: 'Nutrição de alimentos',
        stat: '226.825 linhas de análise nutricional',
        desc: 'A base de composição nutricional dos alimentos do Ministério da Saúde e Bem-Estar: mais de vinte nutrientes por ingrediente, ordenáveis por nutriente e somáveis por refeição. A base numérica para artigos sobre mercados noturnos e gastronomia.',
      },
    ],
  },
  domains: {
    title: 'Vinte domínios de dados × o mapa de histórias do Taiwan.md',
    lead: 'À esquerda, as categorias de domínio do Twinkle Hub (a partir do rastreamento); à direita, nosso mapeamento de curadoria: a quais artigos desta ilha os dados de cada domínio se ligam. Nos domínios marcados como "História ainda não escrita", os conjuntos principais e os caminhos de análise estão totalmente curados, mas o artigo não foi escrito: é o nosso mapa de desenvolvimento e um convite aberto a quem quiser escrevê-lo.',
    questionsLabel: 'Perguntas típicas',
    articlesLabel: 'Artigos relacionados',
    blankLabel: 'História ainda não escrita',
    proposedStoryLabel: 'A história que poderia virar',
    proposedHowLabel: 'Como analisar',
  },
  recipes: {
    title:
      'Receitas de análise: que dados usar, e como combiná-los, para entender uma coisa',
    lead: 'Este é o coração da página. Cada cartão é uma pergunta de análise real: que conjuntos usar, que chaves os unem, com que método lê-los e qual artigo já transformou a análise em história.',
    combineLabel: 'Como combinar',
    methodLabel: 'Melhor forma de analisar',
    articlesLabel: 'Histórias já escritas',
    items: [
      {
        question:
          'Justiça habitacional: as casas baratas que o governo construiu — quem acabou enriquecendo com elas?',
      },
      {
        question:
          'Transição energética: a energia nuclear caiu a zero e foi religada — o que aconteceu nos números?',
      },
      {
        question:
          'Finanças do Seguro Nacional de Saúde: quem usa, quem contribui e por quantos anos mais o sistema se sustenta?',
      },
      {
        question:
          'Qualidade da democracia: qual o tamanho do eleitorado de cada eleição e quão intensa é a fiscalização?',
      },
      {
        question:
          'Economia de rua: como foi realmente calculada a produção de 230.000 barracas de ambulantes?',
      },
      {
        question:
          'Segurança viária: o que liga 14 milhões de motonetas a três mil mortes por ano?',
      },
    ],
  },
  method: {
    title: 'Metodologia de junção: as chaves que alinham duas tabelas',
    lead: 'Um conjunto de dados isolado é um ponto; só a combinação forma uma rede. Estas são as pistas de junção mais úteis que nossos testes encontraram.',
    spectrum: {
      title:
        'Frequência de atualização = resolução da análise: o espectro dos quinze conjuntos de exemplo',
      left: '← Atualizado todo mês: estudos de eventos são possíveis',
      right: 'Uma vez a cada cinco anos: apenas comparação entre períodos →',
      note: 'Cada ponto é um conjunto citado nesta página; passe o cursor para ver o nome. Antes de desenhar uma análise, veja em qual ponta do espectro seus dados estão.',
    },
    items: [
      { name: 'Códigos de divisão administrativa' },
      { name: 'Números de cadastro empresarial' },
      { name: 'Coordenadas e códigos de estação' },
      { name: 'Níveis de qualidade' },
      { name: 'A frequência de atualização é a resolução da análise' },
      { name: 'O princípio do duplo ponteiro' },
    ],
  },
  tools: {
    title: 'Catálogo de ferramentas: a lista completa das 21 ferramentas',
    lead: 'Obtido diretamente do endpoint MCP (o último rastreamento bem-sucedido está registrado no rodapé). O agrupamento é nosso.',
    groups: [
      { label: 'Quarteto central de conjuntos de dados + índice de domínios' },
      { label: 'Patentes' },
      { label: 'Concursos nacionais' },
      { label: 'Sentenças judiciais' },
      { label: 'Medicamentos e códigos médicos' },
      { label: 'Nutrição de alimentos' },
    ],
  },
  footer: {
    crawledLabel:
      'As listas de ferramentas e domínios desta página foram rastreadas com sucesso pela última vez em',
    note: 'O Twinkle Hub está em fase alfa, e a avaliação desta página será atualizada conforme ele evolui. O Taiwan.md não tem atualmente nenhuma relação comercial com o Twinkle Hub; esta página é o check-up de primeira mão de um usuário intenso — e um convite: só quando a camada de dados e a camada de sentido trabalham juntas Taiwan pode ser compreendido por inteiro.',
    pilotTitle: 'Artigos já ligados à camada de dados',
    pilotLead:
      'Desde junho de 2026, estamos acrescentando uma seção "Dados públicos" ao final dos artigos: cada uma lista os conjuntos que poderiam verificar (ou desmentir) as afirmações do artigo, com uma linha explicando por que cada indicação está ali. O primeiro lote tem seis artigos:',
  },
};
