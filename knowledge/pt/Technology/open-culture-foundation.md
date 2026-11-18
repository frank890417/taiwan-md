---
title: 'Fundação Cultura Aberta: ajudar o grupo menos controlado de Taiwan a fazer a tarefa mais entediante'
description: 'O mapa de máscaras de 2020 ficou online em três dias, todo Taiwan lembra desse milagre, ninguém se lembra de quem cuidou da prestação de contas, dos contratos e do registro no seguro trabalhista do projeto. Essa retaguarda chama-se Fundação Cultura Aberta — um movimento descentralizado que gritava "ninguém é onipotente", para que os hackers pudessem continuar hackeando, acabou tendo que criar por conta própria uma fundação que emite notas fiscais e está sujeita a um conselho de administração. Dez anos depois, essa retaguarda que só queria ajudar com a prestação de contas tornou-se o nome que Taiwan lembra quando se fala de direitos digitais no cenário internacional.'
date: 2026-06-03
category: 'Technology'
tags:
  [
    'Tecnologia',
    'Fundação Cultura Aberta',
    'OCF',
    'Tecnologia Cívica',
    'Direitos Digitais',
    'Comunidade de Código Aberto',
    'Liberdade na Internet',
  ]
subcategory: '開源社群'
author: 'Taiwan.md'
featured: false
lastVerified: 2026-06-04
lastHumanReview: false
readingTime: 13
researchReport: 'reports/research/2026-06/開放文化基金會.md'
viewpoint_formed: true
image: '/article-images/technology/ocf-open-freedom-share-poster.webp'
imageCredit: '開放文化基金會 (OCF)'
imageLicense: 'CC BY-SA 4.0'
imageSource: 'https://ocf.tw/mediakit/'
sporeLinks:
  [
    "{'id': 117, 'platform': 'threads', 'date': '2026-06-03', 'url': 'https://www.threads.com/@taiwandotmd/post/DZIRG2tk6mZ'}",
    "{'id': 118, 'platform': 'x', 'date': '2026-06-03', 'url': 'https://x.com/taiwandotmd/status/2062197280984399945'}",
  ]
curation: 'incubating'
curationReason: 'unverified'
translatedFrom: 'Technology/開放文化基金會.md'
sourceCommitSha: 'be13f045'
sourceContentHash: 'sha256:c4ab423af923a984'
sourceBodyHash: 'sha256:429230fac9b89ba1'
translatedAt: '2026-08-01T21:49:14.186285+00:00'
---

# Fundação Open Culture: ajudando o grupo menos controlado de Taiwan a fazer a coisa mais chata

> **Resumo em 30 segundos:** Por trás daquele mapa de máscaras de 2020 que salvou Taiwan inteiro, havia hackers escrevendo código, o governo abrindo APIs e lojas de conveniência cedendo dados — mas quase ninguém perguntou quem ajudava aqueles projetos improvisados a prestar contas, assinar contratos, registrar a previdência e a saúde dos desenvolvedores. A resposta é uma fundação que você provavelmente nunca ouviu falar: a Fundação Open Culture (OCF). Ela nasceu em 2014 de um recibo de seminário que não dava para reembolsar, cresceu de 1 para 19 funcionários e passou a sustentar comunidades de código aberto que saltaram de 4 para mais de quarenta[^1]. O mais contra-intuitivo: um movimento que grita «ninguém é onipotente» e faz da descentralização intencional a sua bandeira, para sobreviver, teve de fazer nascer a própria «estrutura» — uma entidade que emite nota fiscal, responde a um conselho de administração e cuida da burocracia. E esse backoffice que só queria ajudar a prestar contas, dez anos depois, virou o nome que a comunidade internacional cita espontaneamente quando o assunto é direitos digitais em Taiwan.

Em fevereiro de 2020, a COVID chegou depressa e forte. Ninguém sabia onde ainda havia máscaras nem quantas restavam. Em três dias, um mapa de atualização em tempo real foi ao ar: um grupo de engenheiros da sociedade civil plugou nos dados abertos do seguro-saúde e marcou no Google Maps quantas máscaras cada farmácia ainda tinha[^2].

O episódio virou lenda, repetido à exaustão como o momento de glória da civic tech taiwanesa. Todos lembram do g0v, daqueles três dias, do lema «ninguém é onipotente». Mas quase ninguém faz a pergunta seguinte: quem abria conta bancária, recebia pagamentos, assinava contratos com o governo e garantia a previdência e a saúde dos engenheiros por trás daqueles projetos montados às pressas? Hackers podem parir um mapa num fim de semana, mas a burocracia chata por trás do mapa — a que atrai a atenção da Receita Federal, a que exige alguém assinando e se responsabilizando — hackers não querem nem chegar perto.

Quem faz esse trabalho é uma fundação chamada Fundação Open Culture, sigla OCF.

Você provavelmente nunca ouviu esse nome, mas quase certamente já usou algo que ela apoia ou hospeda: a comunidade g0v por trás do mapa de máscaras, o «Cofacts Really Fake» que no LINE ajuda você a checar desinformação, a conferência anual de código aberto todo verão. A OCF é esse tipo de existência típica: **você usa os resultados dela, mas não sabe dizer o nome dela.** Nem a diretora-executiva Lee Hsin-ying escapa do constrangimento: ela conta que, toda vez que monta estande num evento, «tem de explicar do zero o que é código aberto, então fica difícil ter uma conversa profunda com a outra parte»[^3]. Dez anos se passaram e até a própria gente ainda está recomeçando do zero a explicar «afinal, o que a gente faz».

## Um recibo de conferência que não se consegue declarar

![Ruas de Taipé durante o Movimento Girassol de 2014, multidões e faixas de protesto nos arredores do Yuan Legislativo, atmosfera de ocupação no chão.](/article-images/technology/ocf-sunflower-movement-2014.webp)
_Ruas de Taipé durante o Movimento Girassol de 2014. O g0v montou transmissões cidadãs durante este movimento, levando a energia de «transformar o espaço público com as próprias mãos» ao auge, e a OCF nasceu no meio dessa energia. Foto: Jesse Steele, CC BY 2.0 (fonte completa ver fontes das imagens no final do artigo)._

O ponto de partida da história não tem nada de romântico.

Em 2012, surgiu em Taiwan uma comunidade chamada g0v (lê-se gov-zero), cujo espírito é «fork o governo»: já que os sites do governo são difíceis de usar e os dados não são abertos, copia-se a funcionalidade deles e escreve-se uma versão melhor. Após o Movimento Girassol, essa energia de «transformar o espaço público com as próprias mãos» explodiu por completo, com hackathons uma atrás da outra, projetos um atrás do outro.

Aí a realidade bate à porta: organizar eventos custa dinheiro, e com dinheiro vem a prestação de contas. O problema é que o g0v é tão solto que não tem fronteiras — nas palavras do cofundador Kao Chia-liang (conhecido na comunidade como clkao), ele «não tem escopo fixo, não tem membros fixos, não tem forma de adesão, não tem porta-voz, não tem líder único»[^4]. Esse espírito de «ninguém» é bonito para escrever código, mas na hora de acertar as contas com o contador simplesmente não funciona. Chega um patrocínio, para quem se emite o recibo? Os comprovantes de um evento, em nome de quem se lançam?

O site da OCF descreve esse impasse às claras: «as finanças e os comprovantes da organização da conferência, se processados por meio de empresa privada ou associação, frequentemente enfrentam restrições», e assim a comunidade começou a discutir a criação de uma fundação. Por fim, «sob a escavação do prefeito do g0v clkao», em junho de 2014 apresentou-se pedido de aprovação ao Departamento de Cultura do Governo da Cidade de Taipé[^5]. Dito de forma crua, o nascimento da OCF resume-se a um recibo que não se consegue declarar.

> 📝 **Nota do curador**
> Aqui se esconde uma escolha que a maioria das reportagens ignora. A OCF registrou-se como «fundação» (財團法人), não como «associação» (社團法人). A associação é uma «reunião de pessoas», tem sócios, tem assembleia geral, todos votam para decidir, é essencialmente descentralizada; a fundação é uma «reunião de bens», não tem sócios, tem apenas um fundo e um conselho de administração[^6]. Em outras palavras, um movimento descentralizado que tem como crença «ninguém é onipotente, não há líder único», na hora de escolher seu recipiente institucional, optou por uma estrutura mais centralizada, que exige alguém que assine e responda por ela. É um compromisso lúcido: a comunidade descentralizada pode não ter centro, mas o balcão de atendimento da Receita Federal, esse tem de ter nome e sobrenome.

Os 5 milhões de novos dólares taiwaneses do fundo inicial vieram de rostos conhecidos do meio open source: figuras centrais das conferências COSCUP, PyCon Taiwan, OSDC, além de Lee Ming-che, na época COO da KKBOX, e da Network Action Technology, que faz ferramentas de tecnologia cívica[^5]. Curiosamente, clkao, que cavou o buraco, não acabou sentando na cadeira principal; o atual presidente do conselho é Lee Po-feng, vindo do COSCUP.

<div class="video-embed" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;margin:1.5rem 0;border-radius:8px;">
  <iframe src="https://www.youtube.com/embed/bNZUmHfCFxg" title="COSCUP 2014 - State of the unison: g0v 村情咨文 - clkao" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

_clkao apresentou o «Relatório do Estado da Vila g0v» no COSCUP 2014, explicando em primeira pessoa como funciona essa comunidade «sem líder único». Vídeo: canal oficial g0v.tw Taiwan Zero-Time Government._

## Emitir faturas para o "ninguém"

![Um grupo de pessoas sentadas ao redor de uma mesa longa colaborando, laptops e telas acesos, esta é a cena interna do 13º hackathon do g0v em 2015, participantes divididos em grupos trabalhando em projetos de tecnologia cívica.](/article-images/technology/ocf-g0v-hackathon-2015.webp)
_Cena do 13º hackathon do g0v em 2015. Hackers podem criar um projeto em um fim de semana, mas a prestação de contas, contratos, seguro trabalhista e previdência por trás do projeto precisam de alguém para assumir, e é aí que a OCF entra. Foto: g0v.tw Governo Zero, CC BY 2.0 (fonte completa nas referências de imagens ao final do artigo)._

O que a OCF realmente faz, dito sem rodeios, não tem nada de glamouroso: abrir contas, receber pagamentos, conciliar contas, emitir recibos, correr processos, solicitar subsídios, lidar com toda a burocracia de um evento do começo ao fim[^7]. Uma comunidade que queira organizar eventos, receber doações, mas não queira registrar uma organização nem arcar com custos de pessoal em tempo integral, pode jogar para a OCF essas tarefas de bastidor que enlouqueceriam qualquer um. O diretor Lee Po-feng já disse uma frase certeira: "São todas coisinhas, mas acumuladas tornam-se muitas, muito variadas."[^8] A essência da administração de bastidor está nessa frase. Nenhuma delas, vista isoladamente, é grande coisa, mas empilhadas juntas bastam para esmagar uma equipe de voluntários que só quer programar.

O exemplo mais representativo é o Cofacts. Em 2016, um grupo de engenheiros e voluntários do g0v criou este robô de verificação "É verdade ou mentira?", você envia uma mensagem suspeita no LINE e ele diz se já foi verificado, se é verdade ou mentira, sendo o primeiro robô de verificação de fatos colaborativo e de código aberto de Taiwan. Mas para o robô rodar a longo prazo, servem servidores, pessoas, e uma porção de tarefas miúdas. O Cofacts olhou depois para aquele período e disse: ele "não precisou se preocupar com a papelada complexa, sistemas contábeis nem arcar com custos de pessoal em tempo integral para fundar uma organização", podendo crescer devagar neste "berçário de comunidades" que é a OCF[^9].

Essas quatro letras, "berçário de comunidades", são provavelmente a descrição mais precisa do papel da OCF. Ela nunca age como dona desses projetos, nem posa de inventora, apenas dá aos projetos um lugar para ficar enquanto ainda são frágeis.

> 💡 **Você sabia?**
> Muita gente acha que a OCF é a "organização mãe" ou superior do g0v, mas é justamente o contrário. O clkao explicou que, justamente porque "uma comunidade solta como o g0v" dificilmente entra em redes internacionais formais, a OCF acabou "atuando como proxy para representar" o g0v dentro dessa rede[^10]. Em português claro: a OCF é o procurador legal do g0v no mundo formal, assina aqueles papéis que obrigatoriamente precisam de uma assinatura, não é a chefe dele. O g0v continua sendo aquele g0v que ninguém consegue representar por inteiro.

Por isso mesmo, a OCF nunca reivindica o Mapa de Máscaras como obra sua; foi uma junção de hackers do g0v, API do governo e canais de lojas de conveniência. O lugar dela naquele milagre fica mais atrás, mais quieto: quando a paixão precisa de um chão para pousar, ela está lá.

## De uma casa, a um castelo móvel

![Em um espaço de reunião iluminado, dezenas de pessoas sentam-se em mesas organizadas participando de um workshop, com alguém apresentando na frente; esta é a cena do Kickoff do g0v Civic Tech Grant de 2017.](/article-images/technology/ocf-g0v-civictech-grant-2017.webp)
_Workshop de Kickoff do g0v Civic Tech Grant de 2017. Quando a comunidade quer expandir seus projetos, nos bastidores precisa-se de quem gerencie dinheiro, organize eventos e faça a ponte com o exterior — e esse é exatamente o papel que a OCF veio a desempenhar. Foto: Kirby Wu, CC BY-SA 2.0 (fonte completa nas referências de imagens ao final do artigo)._

A primeira funcionária da OCF é Li Xin-ying, conhecida na comunidade como singing, e atual diretora executiva[^11]. Começando por ela sozinha, instalando-se no 4º andar do nº 94 da Seção 1 da Rua Bade, em Taipé, naquele espaço apelidado pela comunidade de «Bade 94», dez anos depois a equipe de tempo integral cresceu para 19 pessoas, sustentando comunidades de código aberto que passaram de 4 iniciais para mais de quarenta[^1].

Os números falam, mas a própria descrição da OCF é mais vívida. Ela diz que o Bade 94 é como um «posto de abastecimento das comunidades de código aberto de toda Taiwan», que ela própria «passou de um lugar onde os parceiros da comunidade podiam descansar — uma "casa" — para se tornar um castelo móvel que leva as comunidades de código aberto em diferentes direções», e que é «a ponte que liga tecnologia e direitos humanos, comunidade e governo»[^12]. Posto de abastecimento, casa, castelo móvel, ponte — essas palavras juntas formam justamente o fio condutor deste artigo: a OCF não conta com estar no palco para brilhar e ficar famosa; ela apoia-se em ser o esteio dos outros, a estação de transbordo dos outros.

No ano em que este castelo completou dez anos, organizou um evento pouco típico de uma fundação. Em setembro de 2024, mais de 800 pessoas espremeram-se em uma Live House em Taipé, com 15 bancas no local, e Lin Qiang, Kao Chiu-chin e a banda Lily Flowers subindo ao palco por sua vez[^3]. Um backoffice que nasceu da prestação de contas transformou seu décimo aniversário em um show. E o que sustenta essa animação é a tradição do maior encontro anual do círculo de código aberto de Taiwan a cada verão — como o COSCUP, a Conferência Anual de Pessoas de Código Aberto abaixo, cujos bastidores financeiros, de local e contratos costumam recair justamente sobre organizações como a OCF.

<div class="video-embed" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;margin:1.5rem 0;border-radius:8px;">
  <iframe src="https://www.youtube.com/embed/MK0BeifqfBE" title="COSCUP 2024: Welcome Day 1" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

_Abertura do COSCUP 2024, a Conferência Anual de Pessoas de Código Aberto. Por trás de encontros comunitários que facilmente reúnem mais de mil pessoas, a contabilidade, o local e os contratos costumam ficar a cargo da OCF. Vídeo: Canal oficial do COSCUP Conferência Anual de Pessoas de Código Aberto._

E uma frase do diretor Li Ming-che (conhecido na comunidade como Izero) expõe essa curva de crescimento: na fundação da OCF, «o objetivo era resolver os problemas de organização de eventos, fluxo financeiro e contabilidade das comunidades de código aberto. Agora não faz apenas isso, faz muitas coisas significativas»[^13]. «Agora não faz apenas isso» — essas seis palavras escondem uma virada: como um backoffice que originalmente só cuidava da contabilidade começou a falar com o governo em nome de toda a comunidade?

## Quem fazia as prestações de contas acabou aprendendo a falar por todos

![Retrato pessoal de Audrey Tang, usando óculos de armação fina, cabelo curto, sorrindo, fundo simples e claro.](/article-images/technology/ocf-audrey-tang-2016.webp)
_Audrey Tang: de participante do g0v à primeira Ministra do Desenvolvimento Digital de Taiwan. A OCF lidou várias vezes com o Ministério Digital sob sua liderança, tanto colaborando quanto fiscalizando. Imagem: cedida pela própria Audrey Tang, domínio público CC0 (fonte completa nas referências de imagens ao final do artigo)._

Imagine alguém numa comunidade que faz recados para todos. Ele ajuda os moradores com assinaturas e burocracias, mas, no meio da correria, acaba falando por toda a rua nas reuniões da subprefeitura. A transformação da OCF seguiu mais ou menos esse caminho. Quando ela dominou a prestação de contas, o jurídico, o RH, percebeu que ocupava uma posição única: conhecia todas as comunidades, entendia de tecnologia e tinha uma identidade formal para lidar com governo e empresas. Então passou a fazer coisas além da prestação de contas: monitorar, em nome das comunidades, aquelas questões públicas ligadas à «abertura» e à «liberdade».

O primeiro grande movimento foi em 2022. No ano em que o Ministério do Desenvolvimento Digital foi criado, foi um momento de expectativa e vigilância para a cena de tecnologia cívica: o governo finalmente tinha um ministério dedicado ao digital, mas como esse ministério usaria seu poder? A OCF articulou com a Associação de Promoção dos Direitos Humanos de Taiwan e outras organizações uma declaração com seis demandas, uma das quais era «Dinheiro Público, Código Público» (Public Money Public Code): o software desenvolvido com dinheiro dos contribuintes deveria ter seu código aberto a todos. Após a declaração, eles ainda convidaram a Ministra do Desenvolvimento Digital Audrey Tang para responder presencialmente a quase 40 perguntas da comunidade[^14].

No mesmo ano, o Legislativo analisava o projeto de Lei de Serviços de Intermediação Digital, legislação que muitos temiam se tornar uma ferramenta de controle de discurso. A resposta da OCF revela seu caráter: não foi às ruas liderar protestos, mas organizou quatro workshops, discutiu artigo por artigo, apresentou como outros países regulam plataformas, colocou diferentes posições na mesa para construir consenso[^15]. O projeto acabou devolvido e suspenso em meio a enorme controvérsia.

Ela também voltou o olhar para as empresas. Em 2023, a OCF, em parceria com a Associação de Promoção dos Direitos Humanos de Taiwan e outros aliados, usou um conjunto de indicadores internacionais para avaliar 20 plataformas e operadoras de telecom que os taiwaneses usam todo dia, verificando se elas respeitam os usuários em governança corporativa, liberdade de expressão e proteção de privacidade[^16]. O resultado é revelador: numa escala de 100 pontos, a mais bem colocada, o Rakuten Ichiba, obteve apenas 33,5 pontos; a lanterna, a Taiwan Mobile, ficou com 21,49[^17]. Até as maiores plataformas e operadoras estão longe de atingir a nota de corte quando o assunto é «respeitar seus direitos digitais».

> 📝 **Nota da curadoria**
> A explicação corrente atribui o sucesso da tecnologia cívica de Taiwan a «hackers especialmente apaixonados». Soa bonito, mas inverte a causalidade. Paixão é o combustível mais barato e que se esgota mais rápido; o entusiasmo aceso num hackathon de fim de semana não sobrevive à terceira vez em que alguém pergunta «quem vai processar a nota fiscal daquele patrocínio?». A razão pela qual a tecnologia cívica de Taiwan não foi um fogo de palha e aguentou dez anos é mais prosaica: houve quem topasse fazer as tarefas menos glamourosas, dando à paixão um lugar onde pousar. E esse backoffice especializado no trabalho chato, a força de tanto fazê-lo, acabou desenvolvendo a capacidade de falar em nome de toda a comunidade com o governo e com as empresas.

## Uma linha de comando, e um site desaparece silenciosamente de Taiwan

O que melhor revela a distância que a OCF percorreu, de "prestar contas" a "vigiar", é a questão do bloqueio de sites.

Em julho de 2024, a Lei de Prevenção e Controle de Crimes de Fraude (《詐欺犯罪危害防制條例》) foi aprovada na terceira leitura, e seu artigo 42 conferiu à autoridade competente um poder: em situações urgentes, para impedir que o público acesse sites de fraude, pode ordenar que provedores de internet "parem a resolução ou restrinjam o acesso"[^18]. "Parar a resolução" soa técnico, mas, em termos simples: o governo pode pedir às operadoras que façam de conta que não conhecem determinado endereço na rede de Taiwan. Tecnicamente, usa-se um mecanismo chamado DNS RPZ: uma vez que o endereço entra numa lista de políticas, o servidor DNS finge não encontrá-lo, e o site simplesmente desaparece silenciosamente da internet de Taiwan — você nem recebe um aviso de "este site foi bloqueado"[^19].

Combater fraudes é obviamente bom, mas o problema está em "quem pode dar essa ordem e se precisa passar por um tribunal antes". Esse mecanismo tem, na verdade, duas versões: o RPZ 1.0 inicial exigia sentença, decisão judicial ou sanção administrativa para bloquear um site, com controle judicial; o posterior RPZ 1.5 flexibilizou para que órgãos de aplicação da lei pudessem bloquear mediante pedido de emergência, sem revisão judicial prévia[^19]. A diferença entre as duas versões é assustadora nos números. Segundo relatório da Freedom House, de junho de 2023 a maio de 2024, pelo RPZ 1.0 — com ordem judicial — houve apenas 29 domínios bloqueados; pelo RPZ 1.5 — pedido de emergência — foram 36.559. No primeiro semestre de 2025, os sites designados para bloqueio ultrapassaram 50 mil, a grande maioria sem qualquer revisão judicial[^20].

> ⚠️ **Ponto de controvérsia**
> A liberdade de internet de Taiwan, de fato, figura entre as primeiras: a Freedom House atribui 79 pontos (classificação "livre"), 7º no mundo, 1º na Ásia; mas a pontuação não é perfeita, e um dos pontos deduzidos é justamente a falta de supervisão judicial no RPZ 1.5[^21]. O que mais inquieta é "se a fronteira vai se alargar": a ferramenta originalmente acordada para combater fraudes começou a ser usada em contextos não fraudulentos: em fevereiro de 2025, um fórum LGBT foi bloqueado sob a Lei de Prevenção e Controle de Exploração Sexual de Crianças e Adolescentes (《兒少性剝削防制條例》); em dezembro do mesmo ano, a plataforma social chinesa Xiaohongshu (小紅書) foi bloqueada por um ano pelo Ministério do Interior com base no artigo 42[^22]. Ambos os casos geraram controvérsia: um mecanismo de emergência criado contra fraudes não acabaria sendo aplicado, pouco a pouco, a conteúdos cada vez mais amplos que o governo não gosta? É exatamente isso que a "vigília" deve monitorar: onde traçar a linha, se é suficientemente transparente, se quem foi bloqueado pode recorrer.

A OCF não esteve ausente nesse debate, e sua forma de vigiar é muito OCF: não vai às ruas gritar slogans, mas organiza eventos, expõe o problema para discussão. Em outubro de 2024, publicou em seu blog, na coluna "Bússola dos Direitos Digitais", duas partes sobre o bloqueio de sites, questionando exatamente a questão dos limites[^23]; em dezembro do mesmo ano, realizou um "Encontro de Liberdade na Internet" com o tema direto: "A medida DNS RPZ de parada de resolução para combate a fraudes pelo governo foi longe demais?", convidando advogados e pesquisadores, sob a Regra de Chatham, para que todos falassem à vontade[^24]. Em 2025, o Ministério do Desenvolvimento Digital (數位發展部) revisou o procedimento de tratamento do DNS RPZ, exigindo expressamente sentença, decisão judicial ou sanção administrativa, e estabelecendo canais de recurso e reparação[^25]. É exatamente a direção que a OCF e esses grupos vêm pressionando continuamente. A vigília nunca consegue resultados com um único discurso; é um projeto de longo prazo sobre "onde traçar a linha", que continuará sendo debatido.

<div class="video-embed" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;margin:1.5rem 0;border-radius:8px;">
  <iframe src="https://www.youtube.com/embed/7YMu-K66jHA" title="基調座談：台灣社群與民主防衛 | g0v summit 2020" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

_Painel de abertura do g0v Summit 2020 "Comunidade de Taiwan e defesa da democracia". Manter uma internet aberta, não sujeita a bloqueios arbitrários, tem sido a tarefa compartilhada da sociedade civil de Taiwan nestes anos. Vídeo: canal oficial g0v.tw Taiwan Zero-Time Government._

## Usar os recursos do governo, vigiar as mãos do governo

Mas se a história parasse por aqui, seria limpa demais, heroica demais. A própria OCF, na verdade, não está tão tranquila assim.

A voz mais honesta vem do diretor Chen Kuei-cheng (KC). No retrospecto dos dez anos, ele disse: 「O que me preocupa agora é que, com a expansão da organização, a pressão operacional possa causar um desvio dos valores fundamentais.」[^26] Essa fala vem de dentro da organização, é o alerta da OCF sobre «crescer demais»: uma organização que passou de prestar contas a se tornar uma ponte internacional — será que, no processo de correr atrás de subsídios, de correr atrás de projetos, ela acaba esquecendo devagar por que existia no início? Outro diretor, Chao Po-chiang, apontou uma fissura mais sutil: as pessoas do núcleo do código aberto 「podem achar que direitos digitais não têm nada a ver comigo」[^27]. Quando uma organização que originalmente servia a comunidade de código aberto caminha cada vez mais para os direitos digitais, seus primeiros membros não sentirão que ela já não é mais aquela casa de antes que ajudava a prestar contas?

Há ainda uma tensão mais estrutural, que a OCF sempre é questionada e nunca evita: ela, de um lado, aceita projetos do governo; de outro, fiscaliza o governo. Em 2024, ela colaborou com o Ministério do Desenvolvimento Digital e a KPMG para realizar seis cursos de capacitação sobre «Dinheiro Público, Código Público» em toda Taiwan[^28]; ao mesmo tempo, promovia eventos questionando se o bloqueio de rede pelo governo não estaria passando dos limites. O próprio site em inglês da OCF admite abertamente que «as operações da OCF dependem de recursos provenientes do governo, empresas e outros projetos»[^29].

Essa tensão fica clara quando se usa outra organização como contraponto. A Associação de Promoção dos Direitos Humanos de Taiwan, que também atua em direitos digitais, define sua independência de forma categórica: «Não aceita subsídios ou doações de partidos políticos, não assume casos de compras ou pesquisas governamentais, nem aceita recursos que possam afetar a natureza de sua operação independente.»[^30] Ambas vigiam a mesma coisa, mas escolheram posições de financiamento completamente opostas: uma mantém distância deliberada do dinheiro do governo; a outra usa os recursos do governo enquanto vigia as mãos do governo. Qual está mais certa? Não há resposta padrão. A forma como a OCF lida com essa tensão é tornar o que faz o mais transparente possível: relatórios anuais públicos, métodos de avaliação públicos, registros de workshops públicos, para que qualquer um possa verificar se ela amoleceu o discurso por ter aceitado dinheiro.

> 💡 **Você sabia?**
> O círculo de direitos digitais de Taiwan nunca foi sustentado só pela OCF; é mais como um grupo de pessoas, cada uma guardando seu quinhão: a Associação de Promoção dos Direitos Humanos de Taiwan faz relatórios de transparência na internet, a Fundação de Reforma Judicial faz advocacy contra bloqueio de rede, o Laboratório de Democracia de Taiwan faz pesquisa sobre operações de informação. A OCF desempenha nessa rede o papel de ponte e nó que conecta todos, organiza eventos, corre o circuito internacional — não o de herói solitário. Vigiar, afinal, é trabalho de divisão e cooperação. «Ninguém é onipotente», essa frase se confirma aqui mais uma vez.

## Vigiar, também olhando para fora da ilha

Os olhos vigilantes da OCF não se detêm na ilha.

Ela é a parceira de Taiwan da OONI; a OONI é um projeto do Tor Project dedicado a monitorar a censura na internet globalmente. A OCF ajuda a traduzir documentos de monitoramento para o chinês, realiza observações de cobertura de rede em Taiwan e, em fevereiro de 2025, coorganizou um workshop com o Tor e o Tails, trazendo o desenvolvedor principal do Tor, Roger Dingledine, a Taiwan[^31]. Na Associação para Comunicações Progressistas (APC), ela se define como a única organização de Taiwan que «abrange três grandes áreas de advocacia: tecnologia aberta, direitos digitais e governança da internet»[^32]. Ela também faz pesquisa: um relatório de privacidade do Leste Asiático coloca Taiwan e Hong Kong lado a lado: o foco de Taiwan está na digitalização do cartão de identidade e nos dados do seguro saúde que não dão às pessoas a opção de «recusar»; o foco de Hong Kong está em como a lei de segurança nacional faz o espaço de advocacia encolher[^33].

Esses acúmulos culminaram, em fevereiro de 2025, em um momento de destaque: a RightsCon, a maior conferência anual de direitos digitais do mundo, chegou ao Leste Asiático pela primeira vez, com sede em Taipé — 3.000 pessoas, 150 países, mais de 500 sessões —, e a OCF foi a parceira local do evento[^34].

<div style="max-width:340px;margin:1.5rem auto;">
<div class="video-embed" style="position:relative;padding-bottom:177.78%;height:0;overflow:hidden;border-radius:8px;">
  <iframe src="https://www.youtube.com/embed/gxx0a4RmVLk" title="網路自由小聚 RECAP：全球數位人權大會 RightsCon 25 Taipei 前導介紹會" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>
</div>

_A própria OCF apresenta, no «Encontro de Liberdade na Internet», o vídeo de introdução da RightsCon 2025 em Taipé. Vídeo: canal oficial da OCF Fundação Cultura Aberta._

Foi o auge. Mas um ano depois, um acontecimento trouxe esta história de volta a um terreno mais pesado.

## Uma conferência cancelada porque «não pode haver taiwaneses»

A RightsCon 2026 ia realizar-se originalmente na Zâmbia, mas o problema estava no local: foi construído com uma doação de 30 milhões de dólares da China em 2022. Durante os preparativos, a parte chinesa exerceu pressão, exigindo a exclusão de taiwaneses e a revisão de temas relacionados com a China. A organizadora Access Now recusou a condição e acabou por cancelar toda a conferência[^35].

A OCF planeava enviar cerca de 5 representantes. Perante este tipo de situação, um representante da OCF disse-o com uma leveza que chega a doer: a interferência da China na participação internacional de Taiwan «para a comunidade de ONG de Taiwan nunca foi novidade»[^36].

Chegados aqui, traça-se uma linha completa entre o cancelamento de uma conferência e um bastidor que só sabe prestar contas. Aquilo que a OCF zela — uma internet aberta, sem censura, onde qualquer pessoa se pode ligar livremente — e a possibilidade de Taiwan aparecer no mundo com o seu próprio nome, são, na verdade, a mesma coisa. Uma conferência cancelada porque «não pode haver taiwaneses» e um site apagado da internet por uma única linha de comando têm por trás a mesma força: alguém quer decidir quem pode ser visto e quem deve desaparecer.

Por isso voltamos ao início. Um movimento que grita «ninguém é todopoderoso» acaba por precisar de alguém que, a sério, cole cada recibo e assine cada relatório anual. A OCF é essa existência que aceita de boa vontade fazer a parte menos glamorosa. Há dez anos nasceu de um recibo de seminário não reembolsável; hoje vela por uma internet ainda não bloqueada para toda a ilha.

Você já usou os seus resultados (mapa de máscaras, bot de verificação, encontro anual de open source), mas ainda não sabe dizer o seu nome. Talvez seja exatamente isso que a torna mais parecida com aquele faz-tudo da comunidade: carrega as tarefas mais ingratas, liga a rua toda, mas fica quieta naquele escritório que você passa todos os dias e nunca decorou o número da porta. Rua Bade, Secção 1, nº 94, 4.º andar.

## Leituras complementares

- [Comunidade de código aberto e g0v](/pt/technology/open-source-and-g0v) — A OCF nasceu justamente para prestar contas a comunidades como o g0v, aquele grupo de "hackers cívicos que deram fork no governo", e o mapa de máscaras de 72 horas.
- [Espírito de código aberto de Taiwan](/pt/technology/taiwan-open-source-spirit) — O ideal de "dinheiro público, código público" incorporado pela OCF é precisamente a extensão da cultura de código aberto de Taiwan do círculo técnico para a governança pública.
- [Audrey Tang](/pt/people/audrey-tang) — De participante do g0v à primeira ministra digital, a OCF cruzou várias vezes com o Ministério do Desenvolvimento Digital sob sua liderança, tanto colaborando quanto fiscalizando.
- [Guerra cognitiva](/pt/society/cognitive-warfare-against-taiwan) — O campo de batalha da desinformação onde o robô de verificação do Cofacts atua, a manipulação de informação que Taiwan enfrenta.
- [Por que Taiwan precisa de sua própria base de conhecimento](/pt/about/why-taiwan-needs-its-own-knowledge-base) — Quando a IA se tornou a primeira porta de entrada para leitores estrangeiros perguntarem "o que é Taiwan", a transparência e auditabilidade do conhecimento que a OCF vem promovendo são exatamente a infraestrutura que empurra de volta esse silêncio.

## Fontes das imagens

Este artigo utiliza as seguintes imagens de domínio público / licença CC, todas em cache em `public/article-images/technology/`, para evitar hotlink dos servidores de origem:

- [Cartaz promocional do tema "Aberto" da OCF](https://ocf.tw/mediakit/)（hero）— Imagem: Fundação Open Culture (OCF)，CC BY-SA 4.0。
- [Ruas de Taipé durante o Movimento Girassol (2014)](https://commons.wikimedia.org/wiki/File:Taipei_Sunflower_Movement_All_Is_Quiet_%2813662054395%29.jpg) — Imagem: Jesse Steele，CC BY 2.0。
- [13.º hackathon do g0v (2015)](https://commons.wikimedia.org/wiki/File:G0v_hackathon_13_%2817209196362%29.jpg) — Imagem: g0v.tw Governo Zero，CC BY 2.0。
- [Workshop de lançamento do Prémio de Tecnologia Cívica do g0v (2017)](https://commons.wikimedia.org/wiki/File:%E5%85%AC%E6%B0%91%E7%A7%91%E6%8A%80%E7%8D%8E%E5%8A%A9%E9%87%91_Kickoff_DSC_6125_%2833364440162%29.jpg) — Imagem: Kirby Wu，CC BY-SA 2.0。
- [Retrato de Audrey Tang (2016)](https://commons.wikimedia.org/wiki/File:Audrey_tang_089_%2825378300354%29_%28cropped%29.jpg) — Imagem: Audrey Tang, domínio público CC0.

Os vídeos são todos incorporados dos canais oficiais do YouTube: "Discurso do Estado da Vila" do g0v (COSCUP 2014), COSCUP 2024 Welcome, g0v Summit 2020 "Comunidades de Taiwan e Defesa da Democracia", direitos autorais pertencem ao g0v.tw Governo Zero de Taiwan / canal oficial da COSCUP Conferência Anual de Código Aberto.

## Referências

[^1]: [Dez anos, OCF | Fundação Open Culture](https://ocf.tw/story/ten-years-of-ocf/) — Revisão oficial dos dez anos da OCF, registo literal do crescimento da equipa de 1 para 19 funcionários a tempo inteiro, das comunidades open source suportadas de 4 iniciais para mais de quarenta, e da auto-descrição como 'posto de abastecimento / lar / castelo móvel / ponte'.

[^2]: [g0v | Wikipédia](https://en.wikipedia.org/wiki/G0v) — Entrada da Wikipédia sobre o movimento g0v, documentando a colaboração entre a comunidade g0v e o governo durante a COVID-19 em 2020, a integração do estoque de máscaras de todas as farmácias de Taiwan em poucos dias e a criação do mapa de máscaras.

[^3]: [Encontre o seu lugar | Fundação Open Culture](https://ocf.tw/story/find-your-place/) — Registo oficial da conferência anual de open source da OCF e participação comunitária, incluindo a fala literal da diretora executiva Li Xinying (Singing Li) sobre 'cada vez que organizamos um evento ou montamos uma banca, temos de explicar novamente o que é open source'.

[^4]: [Dez anos de observação: a empolgação e a fluidez do g0v | Kao Chia-liang (clkao)](https://clkaozh.substack.com/p/g0v-first-decade) — Coescrito pelo cofundador do g0v clkao com ipa e Kirby, descrição literal das características descentralizadas do g0v: 'sem escopo fixo, sem membros fixos, sem forma de adesão, sem porta-voz, sem líder único'.

[^5]: [Sobre nós | Fundação Open Culture](https://ocf.tw/about/) — Página oficial de apresentação da OCF, registo literal da origem da fundação em 2014 devido a problemas de prestação de contas de um seminário, iniciada pelo 'prefeito' do g0v clkao, com pedido de aprovação ao Departamento de Cultura de Taipei, e lista de doadores fundadores.

[^6]: [Diferença entre fundação e associação | Enciclopédia Jurídica](https://www.legis-pedia.com/article/company-enterprise-organization/1114) — Comparação da Enciclopédia Jurídica entre os dois tipos de pessoa jurídica: a associação é uma 'reunião de pessoas', com órgão supremo na assembleia de associados; a fundação é uma 'reunião de bens', regida por estatutos de doação e administrada por um conselho diretivo.

[^7]: [Assistência administrativa | Fundação Open Culture](https://ocf.tw/p/admin/) — Página oficial de explicação dos serviços administrativos da OCF, listando item a item a abertura de contas independentes, recebimento e pagamento, conciliação, elaboração de relatórios, emissão de recibos e outras tarefas administrativas de back-office, documento primário para entender o modelo de incubação da OCF.

[^8]: [Dez anos, OCF | Fundação Open Culture](https://ocf.tw/story/ten-years-of-ocf/) — Revisão dos dez anos da OCF, incluindo a fala literal do presidente Lee Po-feng sobre a administração de back-office: 'são todas pequenas coisas, mas acumulam-se, são muitas e variadas'.

[^9]: [Projeto comunitário: Cofacts Really Fake | Fundação Open Culture](https://ocf.tw/p/cofacts/) — Página oficial da OCF explicando que o Cofacts, iniciado em 2016 pela comunidade g0v, é o único projeto de robô de verificação de fatos colaborativo e open source, com a OCF a fornecer gestão documental, contábil e de recursos humanos, crescendo no 'berçário comunitário'.

[^10]: [Entrevista de Kao Chia-liang (clkao) à revista CommonWealth](https://medium.com/@clkao/cw-interview-73848141ac5) — clkao explica na entrevista como a OCF foi criada para 'atuar como proxy para representar' a fluida comunidade g0v, esclarecendo que a OCF não é a organização-mãe do g0v, mas sim um ponto de contacto legal.

[^11]: [O que é a OCF | Open Culture Foundation](https://ocf.tw/en/p/what_is_ocf_en.html) — Página de autoapresentação em inglês da OCF, explicando que a fundação foi criada em 2014 por várias comunidades open source de Taiwan, e confirmando Li Xinying (Singing Li) como atual diretora executiva e primeira funcionária.

[^12]: [Dez anos, OCF | Fundação Open Culture](https://ocf.tw/story/ten-years-of-ocf/) — Revisão oficial dos dez anos da OCF, registo literal das auto-metáforas 'posto de abastecimento / lar / castelo móvel / ponte', e a origem do apelido comunitário 'Bade 94' para o escritório na Rua Bade.

[^13]: [Dez anos, OCF | Fundação Open Culture](https://ocf.tw/story/ten-years-of-ocf/) — Revisão dos dez anos da OCF, incluindo a fala literal do diretor Lee Ming-che (Izero) sobre a evolução do papel da OCF, de resolver problemas de 'fluxo de caixa e contabilidade' para 'fazer muitas coisas significativas'.

[^14]: [【Declaração conjunta】 Ministério do Desenvolvimento Digital deve ter planeamento abrangente de transformação digital | Fundação Open Culture](https://ocf.tw/p/issues/2022/) — A OCF articulou com a Associação de Promoção dos Direitos Humanos de Taiwan e outras organizações para emitir, em julho de 2022, a primeira declaração conjunta da sociedade civil sobre a criação do Ministério do Desenvolvimento Digital, com seis reivindicações incluindo 'dinheiro público, código público', e convidou a ministra digital Audrey Tang para responder presencialmente a cerca de 40 perguntas da comunidade.

[^15]: [Projeto da fundação: Workshops sobre a Lei de Serviços de Intermediação Digital | Fundação Open Culture](https://ocf.tw/p/ocf) — Perante o projeto de lei de 2022 'Lei de Serviços de Intermediação Digital', a OCF e a comunidade coorganizaram quatro workshops, discutindo o texto artigo a artigo e apresentando políticas de regulação de serviços digitais de vários países, consolidando consenso social; o projeto foi posteriormente suspenso devido a controvérsias.

[^16]: [Direitos Digitais Corporativos | Fundação Cultura Aberta](https://ocf.tw/p/rdr/) — A OCF, em parceria com a Associação de Promoção dos Direitos Humanos de Taiwan e outros, utilizou em 2023 os indicadores internacionais do Ranking Digital Rights para analisar 20 empresas taiwanesas de telecomunicações, redes sociais, bancos de empregos e plataformas de comércio eletrônico, avaliando três dimensões: governança corporativa, liberdade de expressão e privacidade.

[^17]: [Resultados da Avaliação de Direitos Digitais Corporativos | Fundação Cultura Aberta](https://ocf.tw/p/rdr/) — Pontuações de cada empresa no relatório de Direitos Digitais Corporativos da OCF, incluindo Rakuten Market 33,5, Shopee 31,67, Dcard 30,76, Far EasTone 29,67, Chunghwa Telecom 26,73, Taiwan Mobile 21,49 (máximo 100).

[^18]: [Artigo 42 da Lei de Prevenção e Controle de Crimes de Fraude | Banco de Dados Nacional de Regulamentos](https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=D0080226) — Banco de dados oficial de regulamentos do governo da República da China, contendo o texto legal completo do Artigo 42 sobre a autoridade competente poder ordenar que provedores de internet 'parem a resolução ou restrinjam o acesso' a sites de fraude, em vigor desde julho de 2024.

[^19]: [Controle de Conteúdo em Plataformas Intermediárias da Internet: De 'Notificação e Remoção' a 'Bloqueio de Rede' | NCC NEWS Mensal](https://newsweb.ncc.gov.tw/202412/ch5.html) — Boletim mensal oficial da Comissão Nacional de Comunicações, explicando como o mecanismo DNS RPZ faz sites 'pararem de ser resolvidos' desaparecerem, e as diferenças entre as duas versões: RPZ 1.0 (requer decisão judicial ou administrativa) e RPZ 1.5 (solicitação de emergência).

[^20]: [Freedom on the Net 2024: Taiwan | Freedom House](https://freedomhouse.org/country/taiwan/freedom-net/2024) — Relatório anual de liberdade na internet da Freedom House, registrando dados comparativos de junho de 2023 a maio de 2024: 29 domínios bloqueados por ordens judiciais RPZ 1.0 e 36.559 domínios bloqueados por solicitações de emergência RPZ 1.5.

[^21]: [Freedom on the Net 2024: Taiwan | Freedom House](https://freedomhouse.org/country/taiwan/freedom-net/2024) — A Freedom House atribuiu a Taiwan 79 pontos em liberdade na internet (classificação 'Livre'), 7º lugar global e 1º na Ásia, e apontou que a falta de supervisão judicial no RPZ 1.5 é uma das razões para a pontuação não perfeita em restrições de conteúdo.

[^22]: [Freedom on the Net 2025: Taiwan | Freedom House](https://freedomhouse.org/country/taiwan/freedom-net/2025) — Relatório 2025 da Freedom House, registrando que mais de 50.000 sites foram designados para bloqueio via DNS RPZ no primeiro semestre em Taiwan, a grande maioria sem revisão judicial, e destacando a controvérsia sobre o uso do mecanismo em cenários atípicos de fraude (como fóruns e plataformas sociais estrangeiras).

[^23]: [Bússola dos Direitos Digitais: Aplicação e Controvérsias do Bloqueio de Rede | Blog da OCF](https://blog.ocf.tw/2024/10/ocf.html) — Coluna 'Bússola dos Direitos Digitais' de outubro de 2024 no blog da OCF, com duas partes sobre bloqueio de rede, discutindo questões limítrofes como padrões, transparência e canais de recurso do mecanismo de bloqueio de Taiwan.

[^24]: [Encontro de Liberdade na Internet: O DNS RPZ de Parada de Resolução é Excessivo? | KKTIX](https://ocftw.kktix.cc/events/internetfreedom-dec2024) — Página do evento 'Encontro de Liberdade na Internet' de dezembro de 2024 da OCF, debatendo se a medida governamental de bloqueio de rede via DNS RPZ no combate à fraude é excessiva, com advogados e pesquisadores sob a Regra de Chatham.

[^25]: [Procedimento de Referência para Parada de Resolução de Sites Ilegais via Mecanismo de Autoregulação DNS RPZ | Ministério do Desenvolvimento Digital](https://moda.gov.tw/information-service/govinfo/administrative-directions/ad-resource-management/16778) — Guia administrativo oficial do Ministério do Desenvolvimento Digital, revisado em 2025, que exige expressamente que a parada de resolução tenha sentença judicial, decisão ou ordem administrativa, e estabelece canais de recurso e reparação.

[^26]: [Dez Anos, OCF | Fundação Cultura Aberta](https://ocf.tw/story/ten-years-of-ocf/) — Retrospectiva de dez anos da OCF, incluindo a reflexão interna textual do diretor Chen Kuei-cheng (KC) sobre 'a expansão da organização poder causar desvio dos valores centrais devido à pressão operacional'.

[^27]: [Dez Anos, OCF | Fundação Cultura Aberta](https://ocf.tw/story/ten-years-of-ocf/) — Retrospectiva de dez anos da OCF, incluindo a fala textual do diretor Chao Po-chiang sobre a tensão de rota entre o núcleo do código aberto e a advocacia de direitos digitais.

[^28]: [Dinheiro Público, Código Público | Fundação Cultura Aberta](https://ocf.tw/p/pmpc/) — Página oficial da OCF, registrando o conteúdo do plano de 2024 de realizar 6 cursos de capacitação 'Dinheiro Público, Código Público' em toda Taiwan, em colaboração com o Ministério do Desenvolvimento Digital e a KPMG.

[^29]: [What is OCF | Open Culture Foundation](https://ocf.tw/en/p/what_is_ocf_en.html) — O site oficial em inglês da OCF reconhece textualmente que suas operações dependem de fundos provenientes do governo, empresas e outros projetos, sendo uma declaração primária para entender sua estrutura de financiamento e tensão de independência.

[^30]: [Sobre Nós | Associação de Promoção dos Direitos Humanos de Taiwan](https://www.tahr.org.tw/about) — Site oficial da Associação de Promoção dos Direitos Humanos de Taiwan, que textualmente estabelece o princípio de independência de 'não aceitar subsídios ou doações de partidos políticos, não assumir contratos de aquisição ou pesquisa do governo', servindo como grupo de comparação para a posição de financiamento da OCF.

[^31]: [Open Culture Foundation | OONI](https://ooni.org/partners/open-culture-foundation/) — Página oficial de parceiro da OONI (projeto de monitoramento de censura de rede do Tor Project), explicando a colaboração da OCF na observação da cobertura de rede em Taiwan, tradução de documentos e realização de workshops.

[^32]: [Open Culture Foundation (OCF) | APC](https://www.apc.org/en/open-culture-foundation-ocf) — Site oficial da Associação para Comunicações Progressistas (APC), que inclui a descrição textual da OCF como a única organização de Taiwan que 'abrange as três áreas de advocacia de tecnologia aberta, direitos digitais e governança da internet'.

[^33]: [Empowering Privacy Relatório de Privacidade do Leste Asiático | Open Culture Foundation](https://ocf.tw/en/p/dra/ep/) — Relatório de Privacidade do Leste Asiático liderado pela OCF, comparando a situação de privacidade em Taiwan e Hong Kong: Taiwan foca nas questões de opção de saída do ID digital e dados do seguro saúde; Hong Kong foca no efeito inibidor da Lei de Segurança Nacional sobre defensores.

[^34]: [RightsCon 2025 @ Taipei — Introducing OCF | RightsCon](https://www.rightscon.org/introducing-ocf/) — Página oficial do RightsCon, apresentando a OCF como parceira local da conferência de 2025 em Taipei, confirmando a escala de 3.000 pessoas, 150 países e mais de 500 sessões, sendo a primeira vez que o RightsCon ocorre no Leste Asiático.

[^35]: [RightsCon 2026 cancelado devido à pressão da China para excluir Taiwan | Focus Taiwan](https://focustaiwan.tw/politics/202605090005) — Reportagem da Focus Taiwan (versão em inglês da CNA), sobre o cancelamento do RightsCon 2026 porque o local na Zâmbia foi doado pela China, que pressionou para excluir taiwaneses e censurar temas; a organizadora Access Now recusou e cancelou o evento.

[^36]: [RightsCon 2026 cancelado: resposta da OCF | Focus Taiwan](https://focustaiwan.tw/politics/202605090005) — Reportagem da Focus Taiwan (versão em inglês da CNA), que reproduz a resposta textual do representante da OCF: 'A interferência da China na participação internacional de Taiwan nunca é novidade para a comunidade de ONGs de Taiwan'.
