---
title: 'O espírito open source de Taiwan — Engenheiros que "geram energia com amor"'
description: 'O projeto open source mais influente de Taiwan não é um software, mas um grupo de engenheiros que diz ao governo em hackathons: "você não consegue fazer direito, nós faremos".'
date: 2026-03-29
category: 'Technology'
tags:
  [
    'open source',
    'g0v',
    'COSCUP',
    'GitHub',
    'tecnologia cívica',
    'software livre',
  ]
subcategory: '社群與數位文化'
author: 'p3nchan'
featured: false
lastVerified: 2026-03-29
lastHumanReview: false
readingTime: 8
curation: 'incubating'
curationReason: 'unverified'
translatedFrom: 'Technology/台灣開源精神.md'
sourceCommitSha: '22286539e'
sourceContentHash: 'sha256:8cc121a9cccbf90a'
sourceBodyHash: 'sha256:98feb4bab36f053f'
translatedAt: '2026-11-05T00:25:27+08:00'
---

> A escala da indústria de software de Taiwan não é das principais do mundo, mas há mais de 44.000 usuários marcados como Taiwan no GitHub, com mais de 70 hackathons comunitários e milhares de contribuidores — quase todos desenvolvedores individuais que trabalham por conta própria após o expediente. Este artigo não fala apenas sobre o g0v, mas desenha um mapa completo da cultura open source de Taiwan sob quatro perspectivas: pessoas, comunidade, educação e indústria.

---

## Um hackathon provocado por um anúncio

Em outubro de 2012, o Executivo transmitiu um anúncio de 40 segundos na televisão para promover o "Plano de Impulso do Dinamismo Econômico". O conteúdo do anúncio era apenas uma frase: "Este plano é realmente complexo e não pode ser explicado claramente com apenas algumas palavras simples."

Kao Chia-liang (高嘉良, clkao), graduado em Ciência da Computação pela Universidade Nacional de Taiwan (NTU), assistiu ao anúncio e abriu o computador. Ele e alguns amigos participaram do Yahoo! Open Hack Day, mudaram o tema de última hora e, em três dias, desenvolveram o projeto "Visualização do Orçamento do Governo Central", conquistando um prêmio de menção honrosa. Dois meses depois, Kao registrou o g0v.tw e usou o prêmio para organizar a "0ª Mobilização de Hackathon contra a Desordem".

O nome "g0v" vem da substituição da letra "o" de _gov_ (governo) pelo número "0". O significado é direto: se você não consegue fazer direito, nós faremos.

Isso não é uma organização. O g0v não tem escritório, não tem conselho de administração e não tem funcionários em tempo integral. É uma comunidade descentralizada que se mantém por meio de hackathons bimestrais. Até o final de 2025, já foram realizados mais de 70 hackathons, com mais de 8.000 membros no Slack e mais de 4.500 notas colaborativas acumuladas no HackMD.

---

## 72 horas, 100 aplicativos

O momento em que o g0v ganhou visibilidade internacional foi em 2020.

No início do surto de COVID-19, Taiwan implementou o sistema de registro nominal para o uso de máscaras. O Ministério da Saúde e Bem-Estar liberou uma API aberta com o estoque de máscaras das farmácias, e a então Ministra Digital, Audrey Tang (唐鳳), publicou a notícia no canal de chat do g0v. Nas 72 horas seguintes, a comunidade de desenvolvedores de Taiwan explodiu em uma energia de colaboração sem precedentes: Chiang Ming-tsung (江明宗, kiang) criou o mapa de máscaras das farmácias, Jarvis Lin desenvolveu um aplicativo Android, e um chatbot para o LINE também foi lançado no mesmo dia.

Em uma semana, surgiram mais de 100 aplicativos relacionados à consulta de máscaras. Estima-se que quase mil engenheiros tenham participado do desenvolvimento.

A revista _Foreign Affairs_ publicou um artigo especial intitulado _Civic Technology Can Help Stop a Pandemic_, afirmando que Taiwan demonstrou uma terceira via, diferente da vigilância ao estilo da China e diferente das gigantes tecnológicas ocidentais: a inovação democrática impulsionada pela tecnologia cívica (_civic tech_). Um relatório da Faculdade de Medicina de Stanford registrou 124 intervenções independentes implementadas por Taiwan durante a pandemia. A NPR, a MIT Technology Review e a Harvard Business Review também realizaram reportagens especiais sobre o tema.

Este não foi um mérito do governo, nem apenas de Audrey Tang. Foi feito por um grupo de engenheiros sem salário, que abriram seus laptops durante o fim de semana.

---

## Antes de Audrey Tang: As raízes do open source em Taiwan

O motivo pelo qual o g0v pôde se formar rapidamente em 2012 é que Taiwan já possuía um solo fértil de open source há vinte anos.

Audrey Tang aprendeu Perl aos 12 anos e abandonou os estudos para empreender aos 14. Antes de entrar para o governo, ela iniciou mais de 100 projetos no CPAN (plataforma de módulos do Perl), liderou o Pugs — a primeira versão executável de Perl 6 implementada em Haskell — e desenvolveu o EtherCalc junto com Dan Bricklin, o pai das planilhas eletrônicas. Ela era uma figura de liderança reconhecida nas comunidades de Perl e Haskell, com influência no cenário internacional de open source muito antes de sua carreira política.

Hung Jen-yu (洪任諭, PCMan) é outra figura representativa. Ele é médico de clínica médica e, no ensino médio, aprendeu programação por conta própria e escreveu o software de conexão BBS, o PCMan. Em 2006, ele iniciou o projeto LXDE — um ambiente de desktop Linux leve. O LXDE já foi o ambiente de desktop principal com o menor consumo de memória do mundo, sendo adotado por distribuições como Knoppix e Lubuntu. Um ambiente de desktop escrito por um médico taiwanês rodava em máquinas Linux ao redor do mundo. Hung posteriormente ingressou no Google, mas sua história ilustra uma característica típica dos contribuidores de open source de Taiwan: a profissão principal não é software, mas usam o tempo livre para criar projetos de nível internacional.

Huang Ching-chun (黃敬群, jserv) seguiu outro caminho. Ele participou do desenvolvimento de software de sistema em empresas como MediaTek e Andes Technology, e mais tarde tornou-se professor no Departamento de Ciência da Computação da Universidade Nacional de Sucesso (National Cheng Kung University), onde leciona o curso "Design de Kernel Linux" — o único curso universitário em Taiwan que disseca sistematicamente o kernel Linux mais recente. Seus alunos enviam _patches_ diretamente para o Linux, glibc, GCC e LLVM. Ele palestrou diversas vezes no COSCUP e no FOSDEM, na Europa. jserv não representa um contribuinte do tipo "gênio", mas sim uma tentativa de integrar a prática open source ao sistema educacional.

---

## Ecossistema comunitário: Não apenas o COSCUP

A densidade da comunidade open source de Taiwan é considerada excepcional para os padrões asiáticos.

**COSCUP** (Conference for Open Source Coders, Users and Promoters), que ocorre desde 2006, é a maior conferência anual de open source de Taiwan. Em 2024, contou com mais de 2.800 participantes e mais de 40 trilhas comunitárias (_community rooms_), abrangendo temas como Kubernetes, PostgreSQL, Ruby, Python e Blockchain. Cada trilha tem cerca de 6 horas de agenda, planejada autonomamente por cada comunidade. O COSCUP não cobra ingressos. Há mais de cem voluntários, todos trabalhando gratuitamente. 2025 marcará a 20ª edição do COSCUP.

**SITCON** (Students' Information Technology Conference), que começou em 2013, é totalmente iniciada e organizada por estudantes. Seu propósito é permitir que alunos do ensino médio de 18 anos vejam que não precisam esperar a graduação para participar do open source. O SITCON realiza sua conferência anual em março, além de eventos como HackGen durante o semestre, acampamentos de verão e encontros quinzenais.

**PyCon TW** é a conferência anual da comunidade Python, reunindo usuários de diversas áreas. **MozTW** é a comunidade de voluntários da Mozilla em Taiwan, que mantém a versão em chinês tradicional do Firefox desde 2004, além de gerenciar programas de embaixadores estudantis e grupos de tradução de legendas. O espaço comunitário "Moz Workshop" em Taipé operou de 2014 a 2023; após o fim do patrocínio da Mozilla, foi mantido por doações locais.

Há uma grande interconexão entre essas comunidades. A mesma pessoa pode ser palestrante no COSCUP, contribuinte do g0v e voluntária no PyCon TW. O círculo de open source em Taiwan não é grande, mas é denso.

---

## Legado e ruptura institucional

Taiwan já teve tentativas de o governo promover o open source.

Em 2003, o Instituto de Ciência da Informação da Academia Sinica recebeu subsídios do Bureau de Indústria do Ministério da Economia para estabelecer a "Open Source Software Foundry" (OSSF). A OSSF oferecia hospedagem de projetos, consultoria jurídica e promoção via newsletters, cultivando a comunidade local de open source por mais de uma década. Em 2015, o Ministério da Ciência e Tecnologia decidiu interromper os subsídios, encerrando as operações da OSSF; seu site foi mantido até o fechamento no final de 2021.

O desaparecimento da OSSF não causou um declínio nas atividades de open source em Taiwan — isso prova justamente que a energia do open source em Taiwan nunca dependeu do governo. O que realmente sustenta o ecossistema é a "Open Culture Foundation" (OCF, Fundação Cultura Aberta), fundada em 2014. A OCF foi criada por várias comunidades de open source e é uma fundação sem fins lucrativos que atua como gestora financeira das comunidades: emite notas fiscais para o COSCUP, processa doações para projetos e oferece consultoria jurídica sobre licenciamento open source. A OCF também colabora com instituições internacionais como o AIT (Instituto de Taiwan nos EUA), o Escritório Britânico em Taiwan e o Banco Mundial, exportando a experiência de tecnologia cívica de Taiwan para o mundo.

Essa estrutura é interessante: quando os planos do governo terminam, as fundações civis assumem. O sistema cresceu de baixo para cima.

---

## As razões estruturais para "gerar energia com amor"

A grande maioria dos contribuidores de open source em Taiwan é individual. Não existem empresas de open source do nível da Red Hat, nem programas de patrocínio corporativo na escala do Google Summer of Code; o investimento das empresas de tecnologia costuma ser "permitir que os funcionários trabalhem no tempo livre" em vez de "incluir o open source nos KPIs".

Por quê?

A indústria tecnológica de Taiwan tem como núcleo a fabricação de hardware e o design de circuitos integrados (IC). Os modelos de negócios da TSMC, MediaTek e Hon Hai baseiam-se em capacidade de fabricação e barreiras de patentes, não em código aberto. O software, neste ecossistema, é frequentemente um "acessório para o hardware", e não uma fonte de receita independente. Entre as milhares de empresas de serviços de software, 90% fazem integração de sistemas voltada para o mercado interno.

O resultado é: há muitos programadores, mas quase ninguém que "vive de open source". O open source é algo para depois do expediente, para encontros comunitários ou para hackathons aos sábados. Na lista de patrocinadores do COSCUP, você verá mais empresas estrangeiras (Google, LINE, Trend Micro) do que empresas locais.

Isso nem sempre é ruim. Justamente por não ser um KPI, a motivação dos participantes é mais pura. O mapa de máscaras do g0v pôde ser lançado em 72 horas não porque alguém abriu um chamado de trabalho, mas porque mil engenheiros sentiram que "isso precisava ser feito".

Mas esse modelo tem um teto. Sem investimento corporativo contínuo, os projetos tendem a estagnar quando os mantenedores principais sofrem de _burnout_. Taiwan não carece de _weekend hackers_, carece de cargos que permitam dedicação integral ao open source.

---

## O poder silencioso de 44.000 pessoas

Existem 44.408 usuários marcados como Taiwan no GitHub (estatística de março de 2026). São necessários pelo menos 67 seguidores para entrar no ranking de Taiwan do committers.top. Considerando a população de 23 milhões de Taiwan, esse número significa que um em cada 500 taiwaneses possui uma conta ativa no GitHub. Comparado ao Japão, Singapura e Hong Kong, a atividade média por usuário de desenvolvedores de Taiwan está entre as principais da Ásia.

O mais importante não são os números, mas o tipo de contribuição. O papel dos desenvolvedores de Taiwan em projetos internacionais é frequentemente o de "infraestrutura invisível": _patches_ de kernel, otimização de compiladores, traduções de localização e escrita de documentação. Estudantes da Universidade Nacional de Sucesso enviam código diretamente para o kernel Linux. O MozTW manteve a versão em chinês do Firefox por vinte anos. Essas contribuições não saem nos jornais, mas sem elas, o software não funcionaria.

A comunidade open source de Taiwan tem ainda uma característica rara na Ásia: o g0v aplica metodologias open source em políticas públicas. A plataforma vTaiwan utiliza a tecnologia Polis para realizar consultas online, tratando de mais de 30 temas, como a regulamentação do Uber e normas de fintech. A _MIT Technology Review_ descreve-a como "um sistema simples, mas engenhoso, que Taiwan usa para fazer o crowdsourcing de suas leis". Isso já não é apenas uma questão de programação; é aplicar a lógica de colaboração do código aberto à governança democrática.

O open source em Taiwan nunca foi apenas uma questão de comunidades técnicas. É uma atitude: ver um problema, abrir o editor e começar a escrever.

---

## Referências

1. [Manual de Projetos e Comunidade de Tecnologia Cívica g0v](https://g0v.hackmd.io/@jothon/ctpbook) (Fonte primária)
2. [Um ano turbulento em 2020, a contribuição do g0v vai muito além do "mapa de máscaras"](https://www.gvm.com.tw/article/76428) — Revista View (Yuanjian)
3. [Civic Technology Can Help Stop a Pandemic](https://www.foreignaffairs.com/articles/asia/2020-03-20/how-civic-technology-can-help-stop-pandemic) — Foreign Affairs (Fonte em inglês)
4. [Poder Hacker Cívico: g0v Governo Zero](https://www.taiwan-panorama.com/Articles/Details?Guid=61281c3d-f79c-4db7-93d9-d18b29f90ba0) — Revista Taiwan Guanghua
5. [Líder da comunidade internacional de open source, Audrey Tang: Open Source é o novo paradigma de troca](https://www.ithome.com.tw/news/93603) — iThome
6. [Hung Jen-yu — Wikipédia](https://zh.wikipedia.org/zh-tw/%E6%B4%AA%E4%BB%BB%E8%AB%AD)
7. [Huang Ching-chun — Wikipédia](https://zh.wikipedia.org/zh-tw/%E9%BB%83%E6%95%AC%E7%BE%A4)
8. [Open Source Software Foundry — Wikipédia](https://zh.wikipedia.org/zh-tw/%E8%87%AA%E7%94%B1%E8%BB%9F%E9%AB%94%E9%91%84%E9%80%A0%E5%A0%B4)
9. [About OCF — Open Culture Foundation](https://ocf.tw/en/p/what_is_ocf_en.html)
10. [committers.top — Most active GitHub users in Taiwan](https://committers.top/taiwan.html)
11. [COSCUP — Wikipedia](https://en.wikipedia.org/wiki/COSCUP)
12. [The simple but ingenious system Taiwan uses to crowdsource its laws](https://www.technologyreview.com/2018/08/21/240284/the-simple-but-ingenious-system-taiwan-uses-to-crowdsource-its-laws/) — MIT Technology Review

---

## Leitura complementar

- [Comunidade Open Source e g0v](/pt/technology/open-source-and-g0v) — A narrativa coletiva que faz um "fork" no governo
- [História das migrações das comunidades online de Taiwan](/pt/technology/taiwan-online-community-migration) — Uma história geracional, do BBS ao Discord
- [Mini Taiwan Pulse](/pt/technology/mini-taiwan-pulse-civic-tech) — O modelo individual de tecnologia cívica; 193 commits em seis semanas transformando dados abertos em trajetórias de luz 3D
- [Da Yu Shuang Jian](/pt/technology/softstar-twin-classics) — Outra história taiwanesa de "fazer coisas grandiosas com paixão" (um RPG que nasceu nas ruas do Guanghua Digital Plaza)
- [Como dormir sem entrar em um porão?](/pt/technology/into-the-cellar-taiwan-game-podcast) — A comunidade de jogadores de 6 milhões de membros que surgiu dos dormitórios da Universidade Central (NCU)
