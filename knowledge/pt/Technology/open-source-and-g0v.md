---
title: 'Comunidade de código aberto e g0v'
description: 'Em fevereiro de 2020, enquanto o mundo todo corria para comprar máscaras, um grupo de programadores em Taiwan levou 72 horas para permitir que 13.000 farmácias de conveniência consultassem o estoque de máscaras. Sem ordens do governo, sem apoio orçamentário, apenas uma convicção: usar código para mudar a sociedade. Este é o g0v governo zero, um estranho experimento de "fork do governo".'
date: 2026-03-23
category: 'Technology'
tags: ['Tecnologia', 'Comunidade de código aberto', 'g0v', 'Tecnologia cívica']
subcategory: '開源社群'
author: 'Taiwan.md'
featured: false
lastVerified: 2026-03-23
lastHumanReview: true
readingTime: 8
translatedFrom: 'Technology/開源社群與g0v.md'
sourceCommitSha: 'ab9964d668'
sourceContentHash: 'sha256:49bc798dac7c0848'
sourceBodyHash: 'sha256:3eab141a44932c8b'
translatedAt: '2026-11-24T11:37:54+08:00'
---

# Comunidade de código aberto e g0v

> **Visão geral de 30 segundos:** Em 2012, porque o governo gastou muito dinheiro produzindo um anúncio sem conteúdo, um grupo de engenheiros decidiu "fazer fork do governo" — transformou gov.tw em g0v.tw, redesenhando como o governo deveria ser. Oito anos depois, a pandemia de COVID-19 eclodiu, e esse grupo de programadores "amadores" usou 72 horas para construir o mapa de máscaras, permitindo que todos em Taiwan consultassem em tempo real o estoque de máscaras em 13.000 farmácias. Isso não é uma conquista do governo, é uma vitória dos cidadãos.

Em uma noite de outubro de 2012, Chia-liang Kao (高嘉良) sentou-se diante do computador assistindo ao anúncio do "Plano de Impulso do Dinamismo Econômico" do governo, ficando cada vez mais irritado. O governo gastou mais de 40 milhões de dólares de Taiwan novos na produção de um vídeo promocional, mas o conteúdo era tão vazio que fazia duvidar: não seria mais significativo jogar esse dinheiro no ralo?

Naquela noite, ele tomou uma decisão que mudaria Taiwan: **se o governo não faz bem, nós fazemos nós mesmos.**

Ele pegou o nome de domínio do governo gov.tw e trocou o "o" por "0", transformando em g0v.tw[^1]. Essa simples brincadeira de palavras simbolizava um conceito totalmente novo: **fork the government**. Assim como no software de código aberto, se a versão original tem problemas, faz-se um fork, criando uma ramificação própria, e reescreve-se uma versão melhor.

## Fork do governo: um experimento cívico na era digital

O g0v não visa derrubar o governo, mas sim "paralelizar" o governo — usar a colaboração de código aberto para reimaginar como os serviços governamentais deveriam ser.

**Dezembro de 2012**, a zeroth g0v hackathon (maratona de programação) foi realizada na Academia Sinica, com mais de 40 participantes. O primeiro projeto foi resgatar o "Orçamento Geral do Governo Central" do inferno dos PDFs, transformando-o em um site de visualização interativa.

Originalmente, o orçamento do governo era um PDF de mais de 500 páginas, cheio de números e tabelas densas, que pessoas comuns simplesmente não conseguiam entender. Os voluntários do g0v reorganizaram esses dados, criando gráficos interativos — **com um clique, você via para onde o governo estava enviando o dinheiro dos seus impostos.**

> **📝 Nota do curador**
> A escolha do g0v de visualizar o orçamento governamental como primeiro projeto não foi coincidência. O orçamento é o núcleo da política democrática — o que o governo faz com o dinheiro do povo, o povo tem o direito de saber. Mas o orçamento tradicional é feito justamente para você não entender. O g0v usou a tecnologia para quebrar essa "opacidade intencional".

Esse pequeno experimento provou uma coisa: **o governo não fazer não significa que não dê para fazer. Significa apenas que ninguém foi lá fazer.**

## Movimento 318: demonstração de força da tecnologia cívica

Na noite de 18 de março de 2014, estudantes ocuparam o Yuan Legislativo. Na manhã seguinte, voluntários do g0v apareceram no local, não para protestar, mas para "construir infraestrutura".

**Ninguém organizou, ninguém comandou.** Os participantes da comunidade g0v fizeram espontaneamente o seguinte:

- **Transmissão ao vivo em tempo real**: montaram um sistema de transmissão multi-câmera, permitindo que o mundo inteiro visse a situação dentro do plenário
- **Integração de informações**: criaram pastas hackfoldr[^2], coletando, organizando e verificando em tempo real todo tipo de informação da internet
- **Colaboração em massa**: estabeleceram sistema de escrita colaborativa, permitindo que cidadãos fora do local também participassem da coleta de dados e verificação de fatos
- **Conexão externa**: forneceram tradução instantânea multilíngue, para que a mídia internacional pudesse entender as demandas do protesto em tempo real

**24 dias de ocupação, transmissão em alta qualidade ininterrupta, sem queda de sinal.** Em 2014, isso era uma conquista técnica inacreditável. Na época, o Facebook Live nem existia, a transmissão ao vivo do YouTube não era popular, mas os voluntários do g0v usaram ferramentas de código aberto para construir por conta própria um sistema de transmissão mais estável que o da mídia profissional.

Mais importante, eles provaram o poder da "transparência". Por causa da transmissão ao vivo, todos podiam ver o que acontecia no plenário, tornando impossível para o governo distorcer os fatos. Esse modelo de "usar tecnologia para fiscalizar o governo" foi visto internacionalmente como um modelo possível; Coreia do Sul, Tailândia, Japão, Alemanha viram nascer comunidades de tecnologia cívica de natureza semelhante[^3].

## Mapa de máscaras: o milagre das 72 horas

No início de fevereiro de 2020, a pandemia de COVID-19 eclodiu em Taiwan. O governo anunciou a política de racionamento de máscaras com nome real, cada pessoa podia comprar 2 máscaras por semana. O problema era: onde comprar? Qual farmácia ainda tinha estoque?

**6 de fevereiro**, a ministra da Política Digital Audrey Tang (唐鳳) (ela própria membro fundador do g0v) anunciou: o governo abriria os dados de estoque de máscaras de todas as 13.000 farmácias credenciadas de Taiwan, atualizados a cada 30 minutos[^4].

**8 de fevereiro**, o primeiro mapa de máscaras entrou no ar.
**9 de fevereiro**, surgiram mais de 100 versões diferentes de mapas de máscaras.

Isso não foi um projeto contratado pelo governo a uma empresa de TI, foi o resultado de programadores de todo Taiwan "fazendo hora extra voluntariamente". **Todos queriam contribuir para a prevenção da epidemia, e o que programadores sabem fazer é escrever código.**

As versões mais populares incluíam:

- **Mapa de Máscaras de Taiwan** por Howard Wu: interface de mapa simples e clara
- **Ainda Tem Máscara?** pelo usuário kiang: integrava avaliações de farmácias e informações de funcionamento
- **Onde Comprar Máscara** por Finjon Kiang: suportava consulta por voz

Em 72 horas, Taiwan tinha o sistema de consulta de estoque de máscaras mais completo do mundo[^5]. **Enquanto cidadãos de outros países ainda faziam fila para comprar, os taiwaneses já podiam consultar no celular quantas máscaras restavam na farmácia mais próxima.**

> **⚠️ Ponto de controvérsia**
> Alguns criticam o governo por "terceirizar a responsabilidade para voluntários", deixando a sociedade civil fazer o sistema de graça para o governo. Mas a resposta da comunidade g0v é direta: não estamos sendo usados pelo governo, nós escolhemos ativamente usar nossa expertise para retribuir à sociedade. Além disso, os mapas de máscaras de código aberto eram mais fáceis de usar, mais inovadores e mais alinhados às necessidades dos usuários do que o sistema que o próprio governo faria.

## A mágica da colaboração de código aberto

O modelo operacional do g0v é simples: **sem chefe, sem funcionários, sem orçamento, sem escritório.** Existe apenas um grupo de pessoas dispostas a usar tecnologia para resolver problemas sociais, e uma cultura de colaboração de código aberto.

### Cultura de hackathon

A cada dois meses realiza-se um grande hackathon, onde participantes propõem ideias no local, formam equipes, implementam. O processo é:

1. **Proposta de três minutos**: qualquer pessoa pode subir ao palco e apresentar uma ideia
2. **Formação livre de equipes**: quem tem interesse pode entrar no projeto
3. **Implementação no local**: começa a botar a mão na massa no mesmo dia
4. **Apresentação de resultados**: à tarde compartilha-se o progresso do dia

**Ninguém é rejeitado, nenhuma ideia é negada.** O único requisito é: o projeto deve ser de código aberto, para que outros possam dar continuidade e melhorar.

### Ferramentas de colaboração

- **Canais Slack**: discussão diária e compartilhamento de informações
- **GitHub**: gestão de código e controle de versão[^6]
- **HackMD**: documentos colaborativos e atas de reunião
- **Trello**: gestão de projetos e acompanhamento de progresso

### Três espíritos centrais

1. **Código aberto**: todo código, dados e documentação dos projetos são públicos
2. **Descentralizado**: sem hierarquia de liderança, qualquer pessoa pode iniciar um projeto
3. **Implementação acima de tudo**: "Talk is cheap, show me the code"

> **💡 Você sabia?**
> A comunidade g0v tem uma tradição: em cada hackathon preparam adesivos de "pequeno esquilo". Se você está participando pela primeira vez, ganha um adesivo de pequeno esquilo. Esse design sugere: mesmo que você seja novato, é bem-vindo a contribuir com um pouquinho de força, como esquilos coletando bolotas, cada pequena contribuição é importante.

## Projetos importantes e impacto social

Ao longo de 8 anos, a comunidade g0v produziu centenas de projetos, muitos dos quais influenciaram diretamente políticas governamentais e o funcionamento da sociedade.

### Transparência dos trabalhos do Yuan Legislativo

As **atas do Yuan Legislativo** costumavam ser apenas em versão textual, e o público em geral dificilmente entendia o que os legisladores realmente faziam no Yuan. Voluntários do g0v criaram a plataforma "Transparência dos Trabalhos do Yuan Legislativo", oferecendo:

- **Transmissão ao vivo em tempo real**: transmissão ao vivo das sessões do Yuan Legislativo
- **Registros de fala**: estatísticas e busca de conteúdo das falas de cada legislador
- **Registros de votação**: resultados de votação de projetos de lei importantes
- **Acompanhamento de propostas**: processo completo desde a apresentação até a terceira leitura

O resultado foi: **os legisladores começaram a se importar com seus "dados".** Taxa de presença, número de interrogações, quantidade de propostas — esses números que antes ninguém ligava, agora têm sites que os compilam para você. Os representantes eleitos descobriram que cada movimento seu era monitorado, e o comportamento começou a mudar.

### vTaiwan: experimento de democracia digital

Em 2014, o g0v e o governo lançaram em parceria a plataforma vTaiwan[^7], permitindo que cidadãos participassem do processo de formulação de políticas. O caso mais famoso é a controvérsia do Uber:

**2015**, a operação do Uber em Taiwan provocou protestos de taxistas. A forma tradicional de lidar era o governo decidir unilateralmente, mas o vTaiwan ofereceu um terceiro caminho: deixar todas as partes interessadas dialogarem na plataforma online, buscando uma solução ganha-ganha.

Após meses de discussão online e workshops presenciais, formou-se a política de "táxis diversificados", que protegia os direitos dos taxistas tradicionais e permitia a existência de modelos de serviço inovadores.

**Foi a primeira vez que Taiwan usou a "democracia digital" para resolver uma controvérsia política.**

### Impulsionador do governo aberto

A defesa do g0v influenciou diretamente políticas governamentais:

- **2012**: projeto de visualização do orçamento impulsionou a abertura de dados orçamentários pelo governo
- **2013**: projeto de transparência do Yuan Legislativo promoveu a transmissão ao vivo das sessões
- **2014**: após o Movimento Girassol, o governo comprometeu-se a revisar a "Lei de Acesso à Informação Governamental"
- **2015**: plataforma vTaiwan tornou-se canal oficial de participação política do governo
- **2016**: Audrey Tang assumiu como Ministra da Política Digital, trazendo a experiência do g0v para dentro do governo

## Influência e conexões internacionais

A experiência do g0v não influenciou apenas Taiwan, mas inspirou o movimento de tecnologia cívica no mundo todo.

### Rede Code for All

O g0v é membro fundador da rede internacional **Code for All**[^8], colaborando estreitamente com organizações como Code for Japan (Japão), Code for Korea (Coreia do Sul), Code for America (EUA), entre outras.

**2019**, o g0v summit foi realizado em Taipé, reunindo comunidades de tecnologia cívica de mais de 30 países para compartilhar experiências e tecnologias.

### Cooperação internacional durante a pandemia

Em 2020, durante a pandemia, a experiência do mapa de máscaras do g0v foi aprendida por outros países:

- **Itália**: versão Roma do mapa de máscaras
- **Alemanha**: versão Berlim do mapa de máscaras
- **EUA**: mapa de EPI (equipamentos de proteção individual)
- **Coreia do Sul**: 마스크맵 (mapa de máscaras)

Voluntários do g0v também ajudaram ativamente outros países a construir sistemas semelhantes, compartilhando a experiência tecnológica de prevenção epidêmica de Taiwan com o mundo.

## Desafios e futuro

Como uma "organização sem chefe", o g0v enfrenta os desafios que todas as comunidades de código aberto enfrentam.

### Sustentabilidade dos projetos

Muitos projetos do g0v são "fruto de um impulso momentâneo", sem manutenção de longo prazo. O mapa de máscaras foi muito ativo durante a pandemia, mas após o fim da pandemia foi gradualmente deixado sem manutenção. **Como fazer bons projetos continuarem operando é o maior desafio do g0v.**

### Fadiga dos participantes

Oito anos de participação voluntária de alta intensidade levaram alguns contribuintes iniciais à fadiga. Como atrair novos sangues, como tornar a participação mais sustentável, são problemas que a comunidade precisa enfrentar.

### Relação com o governo

A relação do g0v com o governo é sutil: há cooperação e há fiscalização. Quando o governo abraça ativamente o código aberto e a democracia digital, o papel "antagônico" do g0v fica nebuloso. Como manter independência e espírito crítico na cooperação é um desafio contínuo.

### Desinformação e guerra de informação

Na era da guerra de informação, o princípio da abertura e transparência também pode ser abusado. Como manter a abertura evitando virar canal de propagação de desinformação é um novo desafio.

## Um experimento que continua

Em 2012, no momento em que Chia-liang Kao transformou gov.tw em g0v.tw, ele só queria expressar insatisfação com o governo. 12 anos depois, o g0v já se tornou parte da democracia de Taiwan, e uma força importante no movimento global de tecnologia cívica.

Esse experimento provou algumas coisas:

1. **A tecnologia pode ser ferramenta de participação cívica**, não apenas meio de lucro comercial
2. **Abertura e transparência são mais importantes que eficiência governamental**, porque a transparência traz eficiência
3. **Uma pequena raiva pode mudar o mundo**, desde que você esteja disposto a botar a mão na massa
4. **Fazer fork do governo não é derrubar o governo**, é provar que existe uma possibilidade melhor

Nesta era de retrocesso democrático, o g0v nos lembra: **cidadãos não são usuários do governo, são co-criadores.** O que o governo não faz bem, nós podemos fazer nós mesmos. O que o governo faz bem, nós podemos ajudar a fazer ainda melhor.

Não é uma revolução terminada, é um experimento contínuo. Cada hackathon, cada novo projeto, cada linha de código, respondem à mesma pergunta: na era digital, como pode ser a democracia?

A resposta ainda está sendo escrita, e cada pessoa disposta a contribuir é autora dessa resposta.

## Referências

[^1]: [Site oficial do g0v governo zero](https://g0v.tw/) — Portal da comunidade g0v, apresenta atividades de hackathon e modelo operacional dos vários projetos

[^2]: [Pastas compartilhadas hackfoldr do g0v](https://beta.hackfoldr.org/) — Plataforma de documentos colaborativos e colaboração de dados usada há muito tempo pela comunidade g0v

[^3]: [A Guide to Win Democracy Back: Civic Tech Project and Community Handbook (Friedrich Naumann Foundation, 2025-06-09)](https://www.freiheit.org/fr/node/49973) — Manual de tecnologia cívica escrito com participação da comunidade g0v, apresentado pela Fundação Friedrich Naumann da Alemanha, chama o g0v de uma das forças mais importantes da democracia digital de Taiwan e possível modelo para o mundo, inclui casos da Coreia do Sul, Tailândia, Japão, Alemanha

[^4]: [How digital innovation can fight pandemics and strengthen democracy (Audrey Tang, TED2020)](https://www.ted.com/talks/audrey_tang_how_digital_innovation_can_fight_pandemics_and_strengthen_democracy) — Audrey Tang no TED fala como Taiwan evitou o lockdown no início de 2020 graças a ferramentas digitais, incluindo o mapa de máscaras

[^5]: [Entrevista com desenvolvedores do mapa de máscaras](https://www.ithome.com.tw/news/136038) — iThome entrevista desenvolvedores do mapa de máscaras, registra o percurso dos desenvolvedores nos projetos de prevenção epidêmica

[^6]: [Organização g0v no GitHub](https://github.com/g0v) — Repositórios de código e registros de colaboração dos projetos de código aberto da comunidade g0v

[^7]: [Plataforma de democracia digital vTaiwan](https://vtaiwan.tw/) — Plataforma online de discussão política e construção de consenso entre g0v e governo

[^8]: [Rede internacional Code for All](https://codeforall.org/) — Site oficial da rede internacional Code for All que conecta organizações globais de tecnologia cívica

## Temas relacionados

- [Fundação Cultura Aberta](/pt/technology/open-culture-foundation): a fundação por trás do g0v que faz contabilidade, emite recibos, assume a administração da comunidade, e sua história de crescer dos bastidores para cão de guarda dos direitos digitais
- [Indústria de semicondutores](/pt/technology/taiwan-semiconductor-industry): a base do poder tecnológico de Taiwan
- [Mini Taiwan Pulse](/pt/technology/mini-taiwan-pulse-civic-tech): implementação pessoal de código aberto de tecnologia cívica em 2026 — usa dados abertos TDX + Three.js para desenhar Taiwan como trilhos de luz 3D
