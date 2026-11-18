---
title: 'O problema da identificação de Taiwan nos padrões internacionais'
description: 'Do código ISO às software livre — como o nome de Taiwan é escrito, contestado e corrigido na infraestrutura digital global'
date: 2026-03-18
category: 'Society'
tags:
  [
    'ISO 3166',
    'padrões internacionais',
    'software livre',
    'g0v',
    'soberania digital',
    'identificação de Taiwan',
  ]
subcategory: '國際關係'
author: 'Taiwan.md Contributors'
featured: false
lastVerified: 2026-03-19
lastHumanReview: false
curation: 'incubating'
curationReason: 'unverified'
translatedFrom: 'Society/台灣在國際標準中的標示問題.md'
sourceCommitSha: 'be13f045'
sourceContentHash: 'sha256:c6d4e2074d20efa4'
sourceBodyHash: 'sha256:234ae4c6ee15c7e0'
translatedAt: '2026-09-27T01:15:21+08:00'
---

# O problema da identificação de Taiwan nos padrões internacionais

> **Resumo em 30 segundos:** Na infraestrutura digital global, Taiwan é frequentemente identificada como "Taiwan, Province of China". Essa identificação remete à ordem política internacional estabelecida após a Resolução 2758 da ONU em 1971, influenciando padrões como ISO 3166 e estendendo-se ao software livre e serviços web globais. A comunidade de software livre continua a promover formas mais neutras de identificação por meio de relatórios de bugs e pull requests.

Na infraestrutura digital global, a forma como Taiwan é identificada reflete uma divergência política internacional de quase meio século. Desde ISO 3166 até a escolha de espelhos de software em Ubuntu, um detalhe técnico por trás da superfície é a disputa não resolvida sobre a identidade de Taiwan no sistema internacional.

## Contexto histórico: Da Resolução 2758 da ONU à ISO 3166

Em 1971, a Resolução 2758 da Assembleia Geral das Nações Unidas foi aprovada, decidindo que a "cadeira da China" nas Nações Unidas seria ocupada pelos representantes da República Popular da China, com a República da China (Taiwan) perdendo sua cadeira na ONU. Embora originalmente limitada apenas à representação das Nações Unidas, essa resolução foi amplamente utilizada como base para a exclusão de Taiwan em várias organizações internacionais e agências de padronização. [^1]

Em dezembro de 1974, a ISO 3166 foi publicada pela primeira vez, e desde então a denominação de Taiwan tem sido "Taiwan, Province of China", mantida até os dias atuais. A ISO 3166-1 também atribuiu a Taiwan o código de duas letras `TW`, mas a controvérsia sobre o nome oficial persiste até hoje.

A posição da ISO segue a base de dados de nomes geográficos da Divisão de Estatística das Nações Unidas (UNSD), cujas denominações remontam à ordem política estabelecida após a Resolução 2758. Isso forma um sistema interdependente: padrões internacionais citam dados das Nações Unidas, software livre cita padrões internacionais, e finalmente "Taiwan, Province of China" aparece nos menus suspensos de desenvolvedores ao redor do mundo. [^2]

## Ações de correção da comunidade de software livre

O Bug #1138121 do Ubuntu (relatado em 2013) é um dos casos mais citados. Quando usuários de Taiwan viram "Taiwan, Province of China" aparecendo na interface ao escolher servidores espelhos de software, muitos se sentiram incomodados. O relatante sugeriu adotar o campo de nome comum da ISO 3166, ou seja, simplesmente "Taiwan", ao invés do nome oficial completo.

Problemas semelhantes surgiram repetidamente em outros projetos de software livre. O Issue #43 do repositório ISO-3166-Countries-with-Regional-Codes, o PR 138672 do FreeBSD e o Issue #1938892 do Drupal todos registraram a discordância da comunidade com essa identificação. A solução costuma ser substituir os dados por informações do CLDR (Unicode Common Locale Data Repository), que oferece uma identificação mais neutra para Taiwan. [^3]

As ações de correção da comunidade de software livre refletem a interseção entre tecnologia e política: desenvolvedores geralmente desejam adotar identificações mais neutras, mas limitados pela consideração de "seguir padrões internacionais", as modificações muitas vezes exigem longas discussões comunitárias, e alguns mantenedores optam por evitar o tema. O membro da comunidade g0v, chewei, tem organizado consistentemente casos relacionados, registrando a extensão do problema de identificação de Taiwan na ecologia global de software.

## Impacto mais amplo da nomenclatura

Em contextos formais de organizações internacionais, o problema da nomenclatura de Taiwan é mais amplo. Na Assembleia Mundial da Saúde (WHA), Taiwan foi convidada como observador usando o nome "Chinese Taipei" entre 2009 e 2016 (totalizando oito sessões); a partir de 2017, a China se opôs à participação contínua de Taiwan, e os convites foram interrompidos, sem que Taiwan tenha sido oficialmente convidada desde então. [^6] Na Organização Internacional da Aviação Civil (ICAO), Taiwan também não pode participar como membro formal, dependendo de canais informais para obter informações sobre padrões técnicos de aviação, criando um potencial vazio na circulação de informações de segurança aérea. Nos Jogos Olímpicos, Taiwan tem competido desde 1981 sob o nome "Chinese Taipei" (em chinês, "Taipé Chinesa"), uma designação estabelecida pelo Protocolo de Lausana de 1981 entre o Comitê Olímpico Internacional e o Comitê Olímpico da China. Essa solução de compromisso também foi adotada por muitas organizações não governamentais internacionais e estendida a eventos como o APEC.

A questão da nomenclatura teve novas extensões na era digital. Além da ISO 3166, códigos bancários SWIFT, códigos de aeroportos ICAO e bases de dados geográficas de governos nacionais todos possuem formas diferentes de identificar Taiwan, sem um padrão único.

A identificação oficial da ISO 3166-1 permanece inalterada até hoje, e como cada empresa ou projeto de software exibirá Taiwan continua sendo decidido caso por caso.

## Mudança na capa do passaporte de 2020

Em 2 de setembro de 2020, o Ministério das Relações Exteriores da República da China anunciou o novo design do passaporte: o texto original "REPUBLIC OF CHINA" na capa foi significativamente reduzido (mantendo ainda o brasão nacional), enquanto o texto "TAIWAN" foi ampliado para ficar ao lado de "REPUBLIC OF CHINA". Essa mudança responde a incidentes durante a pandemia de COVID-19 em que passageiros de Taiwan foram erroneamente identificados como cidadãos chineses e negados entrada em vários países — pela primeira vez, o governo de Taiwan usou o design do passaporte para responder a problemas concretos de identificação de soberania. O novo passaporte passou a ser emitido a partir de janeiro de 2021. [^4]

## Controvérsia sobre "Chinese Taipei" nos Jogos Olímpicos de Paris 2024

Durante os Jogos Olímpicos de Paris, em julho e agosto de 2024, Taiwan competiu sob o nome "Chinese Taipei", mas grupos chineses em várias plataformas sociais traduziram esse nome para "China Taiwan", criando uma diferença clara com a tradução chinesa oficial estabelecida pelo Comitê Olímpico Internacional: "Chinese Taipei = Taipé Chinesa". Durante os Jogos, atletas de Taiwan tiveram suas bandeiras roubadas por espectadores chineses, e grupos de apoio taiwaneses foram interferidos por equipes chinesas, levando a sociedade taiwanesa a repensar novamente o Protocolo de Lausana de 1981. [^5]

## Casos de pressão de empresas transnacionais

A pressão da China sobre o "princípio de uma só China" expandiu-se significativamente para o setor de empresas transnacionais no final da década de 2010. A China Airlines, que por muito tempo usou o nome "China Airlines" internacionalmente, gerou controvérsias internas sobre identidade nacional taiwanesa (durante a diplomacia de máscaras de COVID-19 em 2020, uma petição no Change.org para mudar o nome da empresa contou com cerca de 40.000 apoios). Empresas como Delta Air Lines, Marriott, United Airlines e Zara foram pressionadas pela Administração Civil da Aviação da China e pela Autoridade de Informações da Internet por listarem "Taiwan" como país em seus sites, sendo forçadas a mudar para "China Taiwan" ou "região da China Taiwan". Esses casos demonstram que o "poder político do padrão ISO" expandiu-se do campo técnico para se tornar uma ferramenta de pressão geopolítica.

## Perspectiva: posição da China

Do ponto de vista oficial da República Popular da China, o "princípio de uma só China" é a base política das relações entre os dois lados do estreito, defendendo que a República Popular da China é o governo legítimo da China, e Taiwan é uma província da República Popular da China (nível administrativo sendo "Província de Taiwan"). Essa posição influenciou diretamente a ISO 3166 desde 1974, resultando na identificação "Taiwan, Province of China". Compreender a questão de identificação de Taiwan nos padrões internacionais requer observar simultaneamente a posição de oposição do governo da República da China, as reivindicações da República Popular da China e o espectro diverso de identidades taiwanesas — três aspectos que não são idênticos e não podem ser reduzidos a um só.

## Torre de Babel da soberania: preservação de soberania

O problema de identificação de Taiwan nos padrões internacionais é, essencialmente, um problema de **infraestrutura de preservação de soberania**. Garantir que a voz em primeira pessoa de Taiwan exista em cada idioma, em cada sistema, em cada banco de dados, é a forma como Taiwan continua a ser reconhecida como um sujeito político independente na era da informação. Cada relatório de bug, cada pull request, cada atualização no design do passaporte, é um tijolo nessa infraestrutura.

## Referências

[^1]: [Resolução 2758 da Assembleia Geral das Nações Unidas (1971)](<https://undocs.org/zh/A/RES/2758(XXVI)>) — Texto integral da resolução que decidiu que a representação da China nas Nações Unidas seria assumida pelos representantes da República Popular da China.

[^2]: [Agência de Manutenção ISO 3166 — Plataforma de Navegação Online](https://www.iso.org/obp/ui/#iso:code:3166:TW) — Entrada de Taiwan na ISO 3166-1, incluindo código TW e nome oficial.

[^3]: [Ubuntu Launchpad — Bug #1138121](https://bugs.launchpad.net/ubuntu/+source/software-properties/+bug/1138121) — Relatório original sobre o problema de identificação de Taiwan na interface de seleção de espelhos do Ubuntu, 2013.

[^4]: [Nova capa do passaporte amplia o texto TAIWAN; emitido a partir de janeiro de 2021](https://www.cna.com.tw/news/firstnews/202009020019.aspx) — Reportagem do Central News Agency de 2 de setembro de 2020, anunciando o novo design da capa do passaporte, com o texto TAIWAN ampliado, a ser emitido a partir de janeiro de 2021.

[^5]: [Comitê Olímpico Internacional — Protocolo de Taipé Chinesa](https://www.olympic.org/) — O Protocolo de Lausana de 1981 estabeleceu o nome "Chinese Taipei"; durante os Jogos Olímpicos de Paris 2024, traduções chinesas de "China Taiwan" causaram controvérsias.

[^6]: [Ministério da Saúde e Bem-Estar da República da China — Explicação sobre a participação de Taiwan na OMS](https://www.mohw.gov.tw/) — Taiwan participou da WHA como observador entre 2009 e 2016; a partir de 2017, não foi mais convidada; veja também o Ministério das Relações Exteriores para explicações sobre a exclusão da ICAO.

## Leituras recomendadas

- [Comunidade g0v — Compilação de casos de identificação de Taiwan](https://g0v.hackmd.io/5YRoMhveTt-aXwH60T2NZg) — Base de dados de casos de identificação de Taiwan em software livre compilada por chewei
- [Plataforma de consulta online ISO 3166](https://www.iso.org/obp/ui/#iso:code:3166:TW) — Consultar a identificação atual de Taiwan na ISO 3166-1
