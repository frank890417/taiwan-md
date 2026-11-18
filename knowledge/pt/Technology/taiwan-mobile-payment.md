---
title: 'Pagamento móvel em Taiwan: por que o celular tem vários apps de pagamento, mas você ainda sai com dinheiro?'
description: 'No terceiro trimestre de 2024, a pesquisa do MIC do Instituto de Pesquisa da Indústria de Tecnologia da Informação com 5.000 amostras online mostrou 92% de uso prévio e 84% de uso frequente de pagamento móvel. Outra pesquisa nacional do Banco Central com adultos, porém, revela que 73,8% ainda combinam dinheiro e meios não monetários. Do consumidor ao lojista, passando pelo código QR comum do TWQR, este artigo desmonta as diferentes ferramentas, contratos e fluxos de confirmação por trás do pagamento pelo celular, explica por que a alta adoção não elimina a necessidade de levar dinheiro e detalha o que o código QR comum já resolveu e quais exceções de aceitação e falha permanecem.'
date: 2026-09-01
category: 'Technology'
tags:
  [
    'pagamento móvel',
    'pagamento eletrônico',
    'TWQR',
    'Taiwan Pay',
    'código QR',
    'dinheiro',
    'fintech',
  ]
subcategory: '數位與網路'
author: 'Taiwan.md Contributors'
featured: false
lastVerified: 2026-09-01
lastHumanReview: false
researchReport: 'reports/research/2026-09/台灣行動支付.md'
image: '/article-images/technology/taiwan-mobile-payments-merchant-2026.webp'
imageCredit: '財金資訊股份有限公司（TWQR 官方網站）'
imageLicense: 'Fair use editorial commentary'
imageSource: 'https://www.twqr.com.tw/'
curation: 'incubating'
curationReason: 'unverified'
translatedFrom: 'Technology/台灣行動支付.md'
sourceCommitSha: 'be13f045'
sourceContentHash: 'sha256:1e2fca6dab4c2f1c'
sourceBodyHash: 'sha256:62d9c6127e29bebe'
translatedAt: '2026-09-10T07:58:50+08:00'
---

# Pagamento móvel em Taiwan: por que o celular tem vários apps de pagamento, mas você ainda sai com dinheiro?

![Miniatura da entrevista oficial do TWQR com lojista e placa de pagamento móvel](/article-images/technology/taiwan-mobile-payments-merchant-2026.webp)
_Miniatura da entrevista oficial de lojistas do TWQR, usada apenas para análise de material promocional do sistema. A imagem representa apenas a loja entrevistada, não podendo ser tomada como evidência de campo independente da adoção em pequenos comércios de toda Taiwan. Imagem: Financial Information Service Co., Ltd. (site oficial do TWQR), uso legítimo para comentário._

> **Visão geral em 30 segundos:** Na amostra online do MIC do Instituto de Pesquisa da Indústria de Tecnologia da Informação no terceiro trimestre de 2024, 92% já usaram pagamento móvel. A pesquisa encomendada pelo Banco Central, porém, mostra que 73,8% dos adultos ainda usam dinheiro e meios não monetários em conjunto. Os dois conjuntos de números medem populações e perguntas diferentes, mas apontam para a mesma realidade: saber pagar pelo celular, conseguir concluir a transação em qualquer lugar e ter confiança para sair sem dinheiro são três patamares distintos. Ter vários apps às vezes preenche lacunas de canais, às vezes busca cashback e funções de fidelidade. O TWQR está integrando o código QR comum, mas ainda não fundiu todas as fontes de recursos, contratos de lojistas e cenários de falha em um único meio de pagamento.

Em setembro de 2025, o analista sênior da indústria do MIC do Instituto de Pesquisa da Indústria de Tecnologia da Informação, Hu Tzu-li (胡自立), divulgou uma pesquisa de consumidores sobre pagamento móvel. Ele observou que usuários ativos instalam cinco ou mais ferramentas, "principalmente para poder usar pagamento móvel em diferentes canais".[^1] Essa frase lembra muito o que muita gente faz diante do caixa: primeiro olha quais logos estão colados na porta de vidro ou no balcão, depois decide qual app desbloquear. Se não encontra uma marca familiar, só então levanta a cabeça e pergunta "aqui aceita qual?"

As opções no celular só aumentam, mas a carteira ainda guarda algumas cédulas. Essa cena de coexistência é facilmente interpretada como fragmentação excessiva do mercado de pagamentos de Taiwan, ou, pelo lado oposto, como mera escolha por vantagens. As duas explicações capturam cada uma uma parte. O atrito institucional na aceitação e interoperabilidade de fato leva a instalar mais ferramentas e guardar dinheiro, mas cashback, fidelidade, transferências, hábito, preferência pessoal e reserva para falhas também atuam ao mesmo tempo. Para enxergar claro, é preciso separar três patamares: se a pessoa adota, se a transação funciona em todos os cenários e se, quando falha, dá para recuperar a ponto de o usuário se sentir seguro em deixar a última cédula em casa.

## Celular consegue pagar, não quer dizer que hoje só o celular baste

Os 92% de "já usaram" e 84% de "usam frequentemente" do MIC vêm do terceiro trimestre de 2024, duas meses de coleta, 5.000 amostras online. A página pública não lista o quadro amostral completo, faixa etária nem ponderação, portanto essas duas proporções só descrevem aquela amostra online, não podendo ser escritas diretamente como taxa de adoção de toda a população de Taiwan.[^2] Mesmo mantendo essa ressalva, elas mostram que, no grupo de consumidores que preenche questionário online, o pagamento pelo celular já passou da fase de tecnologia estranha.

Outra pesquisa, encomendada pelo Banco Central ao Instituto de Pesquisa Econômica de Taiwan, pergunta como pessoas acima de 18 anos usam dinheiro e meios não monetários no dia a dia. A pesquisa usou telefone fixo e celular como principal, internet como complementar, cobriu 22 condados e cidades, com ponderação pela estrutura populacional, resultando em 4.234 amostras válidas. O resultado: 73,8% usam ambos, 25% só dinheiro, apenas 1,2% só meios não monetários.[^3] Aqui, "não monetário" ainda inclui cartão de crédito, cartão bancário e cartão pré-pago, não servindo como market share de pagamento móvel, mas desenha bem o formato da carteira de hoje.

```tw-waffle
Misturar é a rotina da maioria (%)
Dinheiro e não monetário | 73.8
Só dinheiro | 25
Só não monetário | 1.2
Fonte: Pesquisa de instrumentos de pagamento encomendada pelo Banco Central, divulgada em 2024
```

Portanto, uma pessoa que de manhã paga por aproximação numa cafeteria de rede, no almoço escaneia código para acumular pontos, à tarde no mercado tradicional paga em dinheiro, não há contradição nenhuma. Ela já cruzou o primeiro patamar — "a pessoa sabe usar" —, mas ainda precisa trocar de ferramenta conforme local, loja e equipamento. O "ainda leva dinheiro" do título só pode ser entendido como reserva em cenários de escala, não generalizado como se todo taiwanês tivesse a mesma necessidade todo dia.

O hábito de pagamento já mudou, as exceções de cenário continuam na rua. Instalar vários apps parece preencher as exceções uma a uma, mas para entender por que conseguem preencher, primeiro há que admitir que esses apps não são a mesma coisa. No momento de abrir o celular parecem似似, mas o caminho da transação dali para frente pode ser totalmente diferente.

## Vários apps parecem todos pagar, mas por trás não correm pela mesma trilha

O material didático da Comissão de Supervisão Financeira (FSC) classifica, conforme instrumento vinculado, tecnologia e regulação aplicável: cartão de crédito móvel, cartão bancário móvel, QR code escaneado, instituição de pagamento eletrônico e bilhete eletrônico.[^4]

No front-end, o consumidor faz sempre algo parecido: encosta, escaneia, confirma uma vez. No back-end, porém, podem atuar diferentes instrumentos vinculados, tecnologias, pontas de recebimento e regras. No mesmo pagamento pelo celular, uns acionam cartão vinculado, outros usam conta de pagamento eletrônico. O terminal e a especificação que o lojista conecta decidem quais combinações funcionam. LINE Pay, JKOPAY (街口), Apple Pay, All Pay (全支付) e Taiwan Pay (台灣 Pay) não podem ser alinhados só pelos logos como cinco carteiras iguais. Uns competem entre si, outros colaboram em camadas numa mesma transação, outros se complementam em canais diferentes.

Quem quiser ver como PChome, Shopee e CoolPC (酷澎) mudam o cenário de compras online, pode estender a leitura em [Ecossistema de comércio eletrônico e pagamento digital de Taiwan](/pt/technology/e-commerce-and-digital-payment-ecosystem). Este artigo para na última milha do checkout físico.

Portanto, ter certa marca no celular só responde se o usuário obteve a ferramenta, não responde diretamente se o lojista conectou um terminal compatível. Ver o mesmo código QR também não garante que todo app, direção de escaneamento e fonte de recurso completem a transação. Do ícone no celular até "funciona em toda Taiwan", no meio faltam pelo menos três camadas: instrumento vinculado, contrato do lojista e especificação da transação.

A quantidade de apps também precisa trazer de volta à realidade a "média de cinco" exagerada. A amostra online de 2024 do MIC mostra que 86% usam no máximo cinco, dos quais 61% usam três ou menos, e 14% usam seis ou mais. O material público não traz média, mediana, nem distribuição completa de um a cinco.[^5] Isso suporta uso múltiplo, não consegue desenhar um "usuário típico" que tenha exatamente cinco.

A tabela mensal de junho de 2026 da FSC soma as declarações das instituições de pagamento eletrônico em 41.128.870. É o total das instituições, não o número de pessoas físicas após desduplicação entre instituições. Mede um instantâneo de contratos, não responde quantas ferramentas um usuário típico instalou.[^6]

> **📝 Nota do curador**
> O logo no balcão é marca, a interface no celular é front-end, a tabela da FSC acumula contratos de contas ainda não encerradas. Chamar os três de "número de usuários" achata a camada mais importante de entender do mercado de pagamentos.

No front-end parecem iguais, a transação chega na outra ponta e as diferenças aparecem. O usuário baixa quantos apps quiser, não substitui o lojista no pedido, conferência e conciliação. O segundo patamar está atrás do balcão.

## O consumidor vê um escaneamento, o lojista tem de conectar o processo inteiro

Para uma loja aceitar Taiwan Pay, primeiro deve solicitar à instituição financeira credenciadora tornar-se estabelecimento conveniado, obter código da credenciadora, código do estabelecimento e código do terminal, e completar o registro do serviço.[^7] Após começar a receber, equipamento e rede precisam funcionar, o atendente deve saber confirmar notificação, processar reembolso, o back-office ainda precisa conciliar e liquidar. Para pequeno comércio, colar o código de recebimento é só o começo, depois vem uma rotina operacional que tem de ser fechada todo dia.

A FAQ de lojistas do Taiwan Pay escreve de forma bem concreta o momento que um único código QR costuma esconder: quando o dispositivo está offline, o lojista ainda pode gerar na tela de login um QR sem valor para o consumidor escanear, mas o celular da loja não recebe a notificação da transação.[^8] A tela do cliente mostra pago, a ponta de recebimento na hora ficou sem aviso, o balcão tem de decidir se libera a mercadoria, onde consultar essa transação. Escanear é só o ponto de partida da ação, a confirmação na hora e a conciliação depois é que fazem a transação pousar de verdade.

O Taiwan Pay deixa a taxa a cargo do contrato entre lojista e credenciadora, a explicação oficial é "a taxa de processamento da transação é definida pelo contrato entre o lojista (recebedor) e a credenciadora (banco)". Outras plataformas têm planos públicos, redes de lojas têm seu poder de barganha, diferentes fontes de pagamento têm suas condições.[^9] A taxa entra no cálculo do lojista, prazo de liquidação, reembolso, rede, equipamento, clientela, aprendizado e conciliação entram junto.

Pesquisa acadêmica com lojistas de áreas comerciais de Tainan descobriu que utilidade percebida, facilidade percebida, adoção do consumidor e compatibilidade têm correlação positiva com intenção de adoção, enquanto custo percebido não teve relação significativa nessa amostra.[^10] Isso também mostra que o lojista não só arca com custo, ele pesa se a ferramenta é boa de usar, se o cliente já adotou. Esse estudo local não pode ser extrapolado para toda Taiwan, mas basta para frear a explicação única de "lojista não aceita só por causa da taxa".

A pesquisa encomendada pelo Banco Central dá magnitude à diferença de aceitação. Na amostra de 611 ambulantes, 76,1% só aceitam dinheiro. Na amostra de 1.436 lojistas, essa proporção é 46,8%. O relatório liga a proporção mais alta dos ambulantes a local, equipamento e escala.[^11] Aqui "só aceita dinheiro" é relativo a todos os instrumentos não monetários, não dá para inverter e deduzir taxa de aceitação de pagamento móvel, nem criticar ambulantes por falta de vontade de modernizar.

```tw-bars
Banca e loja, condições de aceitação diferentes (só dinheiro, %)
Amostra ambulantes | 76.1 | 611 amostras
Amostra lojistas | 46.8 | 1.436 amostras
Fonte: Pesquisa de instrumentos de pagamento encomendada pelo Banco Central, divulgada em 2024
```

A universalidade do pagamento precisa das duas pontas juntas: consumidor com ferramenta, lojista com processo sustentável de receber, confirmar, reembolsar e conciliar. O atrito institucional já tem forma aqui, mas ainda explica só parte da coexistência de multi-app e dinheiro. O próximo app às vezes é estepe, às vezes parece mais um cartão de fidelidade.

## Instalar mais um app, às vezes para conseguir usar, às vezes só para usar melhor

Quando a pesquisa do Banco Central perguntou os incômodos no uso de pagamento móvel, 18,9% marcaram "lojista não aceita", 12,0% "lojista não aceita minha ferramenta habitual", 7,6% "muitos tipos no mercado". Sinal de rede ruim 6,5%, celular sem bateria 3,4%.[^12] São múltipla escolha autodeclarada, não servem como proporção causal de cada fator gerando transação em dinheiro, mas mostram que entre "ter app" e "o app que tenho na mão funciona" de fato existe um vão.

O "diferentes canais" do Hu Tzu-li corresponde exatamente a esse motivo de preenchimento. Uma loja não aceita a ferramenta habitual, o usuário talvez instale mais uma. Jantar com amigos precisa rachar a conta, a família quer presentear pontos, também pode deixar outro app. A mesma série de pesquisas do MIC aponta que 57% dos usuários já usaram serviços financeiros de pagamento além do consumo, o mais comum sendo transferência dividida e presente de pontos, 38%.[^13] Essas funções levam o app de pagamento para a vida social e de fidelidade, o motivo de manter já extrapolou se o balcão consegue escanear.

A Visa, em pesquisa encomendada em 2022 abrangendo quatro territórios, entrevistou 1.000 pessoas em Taiwan, entre 18 e 55 anos, das quais 40% acompanham regularmente pontos de consumo, 22% calculam minuciosamente pelo melhor cashback.[^14] Esse dado não estima "quantas pessoas instalam multi-app por cashback", só mostra que parte dos entrevistados acompanha pontos e calcula vantagens para cashback. O ecossistema de fidelidade do varejo também faz nascer suas próprias ferramentas de pagamento. Quem quiser ver como PX Mart (全聯福利中心) foi da rede de lojas e gestão de sócios para plataforma de alta frequência, veja [PX Mart](/pt/economy/pxmart-supermarket), não reescrevo aqui história e controvérsias da empresa.

A pesquisa do Ministério da Economia para o varejo traz uma série mais longa. Calculando pelo valor pago nas amostras devolvidas, a participação do pagamento móvel subiu de 0,6% em 2017 para 11,2% em 2023, o dinheiro caiu de 41,1% para 23,0%. O comunicado oficial atribui parte da mudança no varejo de sortimento geral e drogarias ao ecossistema de sócios e ferramentas de pagamento próprias das empresas.[^15] A fatura do pagamento móvel cresceu, no mesmo período a do dinheiro encolheu. A competição multi-marca de fato criou escolha. Se diagnosticar multi-app só como falha do sistema, essa trajetória ascendente e a preferência ativa do usuário ficam de fora.

```tw-slope
Participação no valor do pagamento no varejo: pagamento móvel sobe, dinheiro desce (%)
2017 | 2023
*Pagamento móvel | 0.6 | 11.2
Dinheiro | 41.1 | 23.0
Fonte: Departamento de Estatística do Ministério da Economia, Pesquisa da realidade operacional do comércio atacadista, varejista e de alimentação
```

Múltiplas ferramentas passam a desempenhar dois papéis: um preenche lacunas de aceitação e fontes de recurso, outro carrega desconto, pontos, fidelidade e transferência. A quantidade de apps não mede a distância para adoção, universalidade ou sair sem dinheiro. Competição e preenchimento embolados, a questão cai no quanto a integração já chegou.

## TWQR integra código QR comum, não fundiu todos os pagamentos em um

O TWQR é a resposta concreta a "especificações de pagamento demais, placas de lojista demais". Esse padrão de código QR comum conecta instituições financeiras e instituições de pagamento eletrônico participantes. No fim de 2025, dados do Banco Central listam 44 instituições financeiras, 10 instituições de pagamento eletrônico, 678 mil estabelecimentos conveniados cooperantes. Em 2025, 146,73 milhões de transações, 713,6 bilhões de novos taiwaneses.[^16] "Pagamento QR de Taiwan totalmente não interoperável" já não condiz com a realidade.

![Ilustração oficial do TWQR "um contrato, pagamentos diversos"](/article-images/technology/taiwan-mobile-payments-single-contract-2026.webp)
_Ilustração oficial do TWQR "um contrato, pagamentos diversos", material promocional do sistema, mostrando a forma de conexão do lojista defendida pela Financial Information Service. É ilustração promocional do sistema, não prova independente de que toda loja cooperante está ativa, toda transação sucede ou todas as fontes de pagamento se comunicam. Imagem: Financial Information Service Co., Ltd. (site oficial do TWQR), uso legítimo para comentário._

O código QR comum resolveu uma camada importante, mas a página pública de credenciamento do Banco Cooperativo (合作金庫) também mostra que as fronteiras permanecem. A lista de "escaneamento ativo" (主掃) dessa página traz Taiwan Pay, JKOPAY, All Pay, EasyWallet (悠遊付), iPASS Money (一卡通) etc., 11 ferramentas. A lista de "escaneamento passivo" (被掃) é mais curta, e limitada à especificação QR Auth. All Pay, iCash (愛金卡) e All Pass (全盈支付) aparecem na lista de escaneamento ativo, mas não na de escaneamento passivo dessa página.[^17] Direção de escaneamento, especificação e participação da instituição mudam as combinações possíveis, o lojista ainda deve solicitar o TWQR à instituição credenciadora.

678 mil é o número de estabelecimentos conveniados cooperantes, esse dado público do Banco Central não informa quantos mantêm atividade contínua, nem participação de mercado total nem taxa de sucesso em campo. O código QR comum também não unifica automaticamente fontes de recurso como cartão de crédito ou conta, pontos de fidelidade, cashback, contrato de loja, taxa e fluxo de reembolso. Ele empurra a placa e a especificação da transação para a camada comum, não aplana o mundo comercial de cada app.

> **📝 Nota do curador**
> O resultado mais digno de reconhecimento do TWQR está no alcance do "comum": código QR comum e mensageria interinstitucional já formaram uma base de grande escala, a ativação diária das lojas cooperantes, cada fonte de recurso e cada regra de fidelidade ainda são decididas por outras camadas. A universalidade está sendo construída camada por camada.

O patamar da interoperabilidade avançou, mas o número de lojas cooperantes não vira automaticamente "toda pessoa, toda transação, toda fonte de recurso consegue usar". Enquanto a engenharia de integração segue em curso, o dinheiro fica com outra explicação.

## Dinheiro não prova falha do pagamento móvel, costuma ser só o que não precisa perguntar "aceita?"

Para uma ferramenta ser universal, no mínimo deve deixar o usuário obter, o lojista reconhecer e confirmar, a transação concluir, e, quando celular sem bateria, rede instável ou notificação falha, ter um método de recuperação previsível. Isso implica que ambos saibam onde consultar, quando tentar de novo, e por qual caminho alternativo seguir após a falha. Depois da transação concluída, se ambos conseguem achar o mesmo registro, também faz parte da recuperação.

Olhando por essa régua, o pagamento móvel já encurtou o checkout em grande volume de consumo diário, mas ainda não oferece a mesma trilha para todo cenário. Na maioria das transações presenciais de baixo valor, o dinheiro não pede cadastro, não pede dispositivo, entrega e confirmação acontecem ao mesmo tempo, seguindo como interface comum de denominador mais baixo. Ele também tem custo de troco, guarda e contagem, aqui se compara patamar de aceitação e falha, não custo operacional total.

A pesquisa encomendada pelo Banco Central traz a diferença das pessoas para o papel do dinheiro: entrevistados acima de 40 anos e de regiões remotas têm proporção maior de só dinheiro. Os dados suportam diferença direcional, não dá para estender como retrato único de todos os idosos ou moradores de áreas remotas.[^18] Esta rodada de pesquisa também não tem dados suficientes para preencher proporções ou inventar vozes para menores de idade, pessoas com deficiência, trabalhadores migrantes e turistas de curta estadia. Ferramenta popular sendo conveniente para uns, não significa que todo mundo consiga obter o mesmo tipo de conta, cartão, celular ou rede.

Usuários intensivos em redes de lojas familiares e círculos de vida de fato podem passar longo tempo sem tocar cédula. Outra pessoa guardar dinheiro pode ser só hábito, preferência de privacidade ou controle de gasto, não necessariamente por já ter falhado um pagamento. Atrito institucional, aceitação do lojista, cashback, fidelidade, hábito, preferência e resiliência a falhas atuam juntos, as pesquisas atuais não conseguem ordená-los em ranking causal único.

O patamar da adoção pergunta quantas pessoas usam. O da universalidade pergunta se pessoas e lojas diferentes conseguem cruzar cenários e concluir. O de sair sem dinheiro pergunta ainda: depois da falha, consegue recuperar? Os dois primeiros patamares avançando, quem leva dinheiro pode diminuir, mas quando a última cédula sai da carteira, depende de as exceções terem ficado poucas a ponto de não valer a reserva.

Abaixo, um cenário hipotético baseado nas limitações offline da FAQ oficial, não um caso real: o celular do lojista está offline, a tela de login ainda mostra um QR sem valor. O cliente escaneia, mas o lojista não recebe o aviso de entrada. Os dois olham para suas telas, a transação trava entre "consegue pagar" e "consegue confirmar na hora". O cliente guarda o celular, tira uma cédula. Essa cédula não julga a tecnologia, só nessa cena ainda não precisa perguntar primeiro: "aqui aceita qual?"

## Leitura complementar

- [Ecossistema de comércio eletrônico e pagamento digital de Taiwan](/pt/technology/e-commerce-and-digital-payment-ecosystem) — Retrospectiva de vinte anos de plataformas e guerra logística do e-commerce taiwanês.
- [Desenvolvimento fintech de Taiwan](/pt/economy/taiwan-fintech-development) — Recoloca o caso do pagamento nos dez anos de desenvolvimento fintech de Taiwan entre abertura e controle de risco.
- [PX Mart](/pt/economy/pxmart-supermarket) — Como o PX Mart foi da rede de lojas e gestão de sócios para plataforma de alta frequência.

## Fontes das imagens

- Imagem de abertura: Financial Information Service Co., Ltd. (site oficial do TWQR), [fonte original](https://www.twqr.com.tw/), Fair use editorial commentary. Imagem original é a miniatura do vídeo oficial "心裡話｜日月香肉鬆", este artigo usa apenas para comentar a promoção do sistema TWQR.
- Imagem no texto: Financial Information Service Co., Ltd. (site oficial do TWQR), [fonte original](https://www.twqr.com.tw/), Fair use editorial commentary. Imagem original é a ilustração oficial "um contrato, pagamentos diversos".

## Referências

[^1]: [MIC do Instituto de Pesquisa da Indústria de Tecnologia da Informação: Pesquisa de consumidores de pagamento móvel 2025](https://mic.iii.org.tw/research.aspx?id=730) — Hu Tzu-li explica que usuários ativos instalam mais ferramentas para diferentes canais, e divulga método, taxa de adoção e faixas de quantidade.

[^2]: [MIC do Instituto de Pesquisa da Indústria de Tecnologia da Informação: Pesquisa de consumidores de pagamento móvel 2025](https://mic.iii.org.tw/research.aspx?id=730) — Coleta no terceiro trimestre de 2024, pesquisa online, 5.000 amostras válidas. 92% já usaram e 84% usam frequentemente limitam-se a essa amostra.

[^3]: [Banco Central: Resultados de questionário encomendado sobre moeda digital do banco central](https://knowledge.cbc.gov.tw/uploads/20240613/d2196a6b-784b-45ea-b559-10b824915887.pdf) — Explicação de método, amostra e ponderação, e resultados: 73,8% misto, 25% só dinheiro, 1,2% só não monetário.

[^4]: [Rede de Sabedoria Financeira da FSC: Material didático de pagamento móvel](https://moneywise.fsc.gov.tw/uploaddowndoc?file=financeroom%2F202001131202240.pdf&filedisplay=%E6%96%B0%E5%A2%9E%E6%95%99%E6%9D%90PPT-+%E8%A1%8C%E5%8B%95%E6%94%AF%E4%BB%98-%E5%AE%9A%E7%A8%BF.pdf&flag=doc) — Classifica por instrumento vinculado, tecnologia e regulação: cartão de crédito móvel, cartão bancário móvel, QR code escaneado, instituição de pagamento eletrônico e bilhete eletrônico.

[^5]: [MIC do Instituto de Pesquisa da Indústria de Tecnologia da Informação: Pesquisa de consumidores de pagamento móvel 2025](https://mic.iii.org.tw/research.aspx?id=730) — Divulga distribuição por faixas de 2024: até cinco, até três, seis ou mais; não publica média nem mediana.

[^6]: [Departamento Bancário da FSC: Informações importantes de contas de pagamento eletrônico de junho de 2026](https://www.fsc.gov.tw/userfiles/file/BB-1156_%E9%9B%BB%E5%AD%90%E6%94%AF%E4%BB%98%E5%B8%B3%E6%88%B6%E9%87%8D%E8%A6%81%E8%B3%87%E8%A8%8A%E6%8F%AD%E9%9C%B2.pdf) — Total listado em 41.128.870, nota de rodapé define como número de usuários já cadastrados e com contrato não encerrado em cada instituição.

[^7]: [Taiwan Pay: FAQ de operação de estabelecimento](https://www.twmp.com.tw/Faq?n=95c7608a1dfc4fa1834f4467d41a32d1) — Explica que lojista deve conveniar com instituição financeira credenciadora e obter códigos de credenciadora, estabelecimento e terminal.

[^8]: [Taiwan Pay: FAQ de recebimento de lojista](https://www.twmp.com.tw/Faq?n=29250e1aae5e4963a550de09d86a26be) — Explica que dispositivo offline ainda pode gerar QR sem valor, mas não consegue logar nem receber notificação da transação.

[^9]: [Taiwan Pay: FAQ de recebimento de lojista](https://www.twmp.com.tw/Faq?n=29250e1aae5e4963a550de09d86a26be) — Oficial declara taxa de processamento definida por contrato entre lojista e banco credenciador, não dá para generalizar taxa única de mercado.

[^10]: [Universidade Nacional Cheng Kung: Pesquisa de adoção de pagamento móvel por lojistas de áreas comerciais de Tainan](https://researchoutput.ncku.edu.tw/en/studentTheses/what-factors-affect-stores-willingness-to-adopt-mobile-payment-de/) — Resumo de tese de doutorado lista fatores significativos e não significativos da intenção de adoção, escopo limitado a amostra de áreas comerciais de Tainan.

[^11]: [Banco Central: Resultados de questionário encomendado sobre moeda digital do banco central](https://knowledge.cbc.gov.tw/uploads/20240613/d2196a6b-784b-45ea-b559-10b824915887.pdf) — Ambulantes 611 amostras, lojistas 1.436 amostras, liga diferença de só dinheiro a local, equipamento e escala.

[^12]: [Banco Central: Pesquisa de instrumentos de pagamento no Relatório de Estabilidade Financeira](https://www.cbc.gov.tw/tw/dl-207586-2f35d674d8a34ee09d1d1c0fd68a6fea.html) — Gráfico lista lojista não aceita, não aceita habitual, tipos demais, sinal e bateria como incômodos de múltipla escolha.

[^13]: [MIC do Instituto de Pesquisa da Indústria de Tecnologia da Informação: Pesquisa de consumidores de pagamento móvel 2025](https://mic.iii.org.tw/research.aspx?id=730) — Pesquisa lista serviços financeiros de pagamento além do consumo, transferência dividida e presente de pontos como mais comuns.

[^14]: [Visa Taiwan: Pesquisa de consumidores de carteira móvel e pagamento eletrônico 2022](https://www.visa.com.tw/about-visa/newsroom/press-releases/nr-tw-230310.html) — Revela amostra de 1.000 em Taiwan, 18 a 55 anos, e proporções de acompanhamento de cashback e cálculo de vantagens.

[^15]: [Departamento de Estatística do Ministério da Economia: Comunicado de imprensa PDF sobre participação de pagamento móvel no varejo](https://www.moea.gov.tw/Mns/populace/news/wHandNews_File.ashx?file_id=116845) — Pesquisa da realidade operacional do comércio atacadista, varejista e de alimentação, participações no valor pago em 2017 e 2023 e explicação com ecossistema de sócios.

[^16]: [Banco Central: Relatório anual 2025](https://www.cbc.gov.tw/tw/dl-225165-b56d9b5e547843a4822acd679cb4868e.html) — Lista instituições participantes do TWQR no fim de 2025, estabelecimentos conveniados cooperantes, transações e valor do ano.

[^17]: [Banco Cooperativo: Serviço de credenciamento interinstitucional TWQR](https://www.tcb-bank.com.tw/company-banking/credit-card/special-store/twqr) — Lista instituições utilizáveis em escaneamento ativo e passivo, especificação QR Auth e forma de solicitação do lojista, mostra interoperabilidade em camadas por direção e especificação.

[^18]: [Banco Central: Resultados de questionário encomendado sobre moeda digital do banco central](https://knowledge.cbc.gov.tw/uploads/20240613/d2196a6b-784b-45ea-b559-10b824915887.pdf) — Relatório apresenta diferenças direcionais por idade e região, este artigo não inventa proporções ou vozes de grupos específicos a partir disso.
