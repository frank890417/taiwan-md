---
title: 'Mini Taiwan Pulse — Visualização 3D em tempo real do tráfego de Taiwan'
description: 'Sinta o pulso de Taiwan com dados abertos — trilhas luminosas de voos cortam o céu, navios cruzam o mar, trens correm nos trilhos, 23 camadas mostram em tempo real a respiração desta ilha.'
date: 2026-03-22
author: 'Taiwan.md'
category: 'resources'
subcategory: '公民科技'
tags:
  [
    'recursos',
    'dados-abertos',
    'visualização',
    'transporte',
    '3D',
    'tempo-real',
    'Taiwan.md',
  ]
lastVerified: 2026-03-22
lastHumanReview: false
featured: false
curation: 'incubating'
curationReason: 'unverified'
translatedFrom: 'resources/mini-taiwan-pulse.md'
sourceCommitSha: 'be13f045'
sourceContentHash: 'sha256:409b7d5c9d0f3bbd'
sourceBodyHash: 'sha256:215016d553b05404'
translatedAt: '2026-07-25T12:49:30+08:00'
---

# Mini Taiwan Pulse — Visualização 3D em tempo real do tráfego de Taiwan 🌐

> 📖 **Artigo aprofundado**: este recurso foi atualizado para um artigo de pesquisa aprofundada em tecnologia cívica; a versão completa está em [Mini Taiwan Pulse: como um analista de dados transformou o pulso do tráfego de Taiwan em trilhas 3D luminosas que respiram](/pt/technology/mini-taiwan-pulse-civic-tech) (2026-04-19). Esta página permanece como entrada de índice na lista de recursos.

> **Visão geral em 30 segundos:** um projeto de código aberto que transforma a dinâmica em tempo real do transporte de Taiwan em esferas e trilhas luminosas 3D. Voos traçam arcos no céu, navios deixam rastros no mar, trens correm nos trilhos — 23 camadas alternáveis permitem que você «veja» o pulso de Taiwan.

## Por que vale a pena acompanhar

A maioria das pessoas, ao olhar o mapa de Taiwan, vê um contorno estático. O Mini Taiwan Pulse mostra uma **ilha que respira**.

A ambição do projeto é grande: integrar em um único mapa 3D os dados abertos espalhados por vários órgãos governamentais — voos, AIS de navios, horários da ferrovia convencional (TRA) e do trem-bala (THSR), linhas de metrô, estatísticas populacionais, observações meteorológicas. Não são simples marcadores pontuais; a linguagem visual usa esferas luminosas, trilhas, rastros de cauda tipo cometa para transformar dados em paisagem em movimento.

> **📝 Nota do curador**
> A infraestrutura de dados abertos de Taiwan figura entre as melhores da Ásia (o [Índice Global de Dados Abertos](https://index.okfn.org/) colocou o país várias vezes no top 10), mas existe um abismo entre «dados abertos» e «dados vistos». O Mini Taiwan Pulse está preenchendo essa lacuna.

## Três camadas de pulso

### Céu — Trilhas de voos ✈️

Cobre 14 aeroportos de Taiwan e mais de 1.500 voos em tempo real. Cada avião é uma esfera emissora de luz, seguida por uma trilha gradiente em forma de cauda de cometa. O fator de exagero de altitude é ajustável (1×–5×), tornando evidentes as diferenças entre rotas de baixa e alta altitude.

Fonte de dados: API do FlightRadar24.

### Oceano — Rastreamento de navios 🚢

Posições de navios nas águas ao redor de Taiwan, marcadas com esferas azul-esverdeadas; cada embarcação deixa um rastro de 30 minutos. O sistema filtra automaticamente saltos anômalos de GPS e MMSI inválidos, garantindo que cada ponto de luz corresponda a um navio real.

Fonte de dados: AIS (Sistema de Identificação Automática) de posições de navios.

### Terra — Seis sistemas ferroviários 🚄

Talvez a parte mais impressionante. Seis sistemas operam sincronizados:

| Sistema                   | Escala                                                      |
| ------------------------- | ----------------------------------------------------------- |
| TRA (ferrovia conv.)      | 265 linhas, 333 trens, 6 cores por tipo de material rodante |
| THSR (trem-bala)          | Linha principal norte-sul + ramais                          |
| Metrô de Taipé (TRTC)     | 8 linhas                                                    |
| Metrô de Kaohsiung (KRTC) | Linha Vermelha + Linha Laranja                              |
| VLT de Kaohsiung (KLRT)   | VLT circular                                                |
| Metrô de Taichung (TMRT)  | Linha Verde + Linha Azul                                    |

O tratamento da TRA é especialmente complexo — correspondência OD de trilhos, ramificações como a linha triangular de Changhua têm engines dedicados.

Fonte de dados: horários públicos + dados de trilhos do [OpenStreetMap](https://www.openstreetmap.org/).

## Não é só transporte

Além dos veículos em movimento, o projeto sobrepõe múltiplas camadas estáticas e analíticas:

- **Infraestrutura**: limites de 14 aeroportos, 535 colunas luminosas de estações (altura = frequência de parada), 36 faróis com feixes rotativos 3D
- **Malha viária**: autoestradas nacionais (vermelho), estradas provinciais (laranja), ciclovias (verde), largura adaptativa ao zoom
- **Análise populacional**: mapa de calor hexagonal H3, com alternância entre fluxo diurno/noturno, 9 indicadores populacionais
- **Meteorologia**: dados em tempo real de estações + superfície 3D de ondas de temperatura (resolução de grade 0,03°)
- **Notícias**: RSS da CNA (Agência Central de Notícias) + geocodificação via API Gemini, posicionando eventos noticiosos no mapa
- **Congestionamento em autoestradas**: codificação de cor por nível de congestionamento em tempo real

Total de **23 camadas independentes e alternáveis**, organizadas em dez categorias.

## Destaques técnicos

- **TypeScript + Mapbox GL + Three.js**: mapa 2D com renderização nativa do Mapbox; elementos 3D (esferas, trilhas, colunas, superfície de temperatura) sobrepostos via Three.js
- **Desempenho**: navios usam InstancedMesh para renderização em lote; _viewport culling_ evita renderizar objetos fora da vista
- **Ciência da cor**: camadas populacionais usam escalas perceptualmente uniformes (Plasma, Viridis, Inferno), normalização log1p + gama para lidar com distribuições de cauda pesada, paleta amiga de daltônicos
- **Licença MIT**: totalmente aberto, _forks_ e contribuições são bem-vindos

> **📝 Nota do curador**
> Usar _additive blending_ para sobrepor trilhas foi uma escolha esperta — onde várias rotas se cruzam, a região fica naturalmente mais brilhante, revelando visualmente a intensidade do tráfego aéreo sem precisar de gráficos estatísticos adicionais.

## Ecossistema de dados abertos

As fontes de dados que o projeto conecta formam, por si só, um guia do ecossistema de dados abertos de Taiwan:

| Dado                                  | Fonte                                                                          |
| ------------------------------------- | ------------------------------------------------------------------------------ |
| Posição de voos em tempo real         | API do FlightRadar24                                                           |
| AIS de navios                         | Sistema Internacional de Identificação Automática de Navios                    |
| Horários ferroviários                 | Horários públicos + OSM                                                        |
| Ônibus/intermunicipais/bicicletas     | [TDX Plataforma de Dados de Transporte Público](https://tdx.transportdata.tw/) |
| Estatísticas populacionais            | [SEGIS Informação Geoestatística](https://segis.moi.gov.tw/)                   |
| Observações meteorológicas            | [Administração Meteorológica Central](https://www.cwa.gov.tw/)                 |
| Parques eólicos offshore              | Bureau de Energia, Ministério da Economia                                      |
| Eventos noticiosos                    | RSS da CNA (Agência Central de Notícias)                                       |
| Limites de aeroportos/portos/estações | [OSM Overpass API](https://overpass-turbo.eu/)                                 |

⚠️ **Vale notar:** o [Serviço de Circulação de Dados de Transporte TDX](https://tdx.transportdata.tw/) de Taiwan é uma das raras plataformas governamentais no mundo que padroniza nacionalmente dados de transporte público — ônibus, intermunicipais, ferrovias, bicicletas — com documentação de API completa e uso gratuito.

## Links

- **GitHub**: [ianlkl11234s/mini-taiwan-pulse](https://github.com/ianlkl11234s/mini-taiwan-pulse)
- **Licença**: MIT License
- **Linguagem**: TypeScript
- **Recursos relacionados**: [Plataforma de Dados de Transporte TDX](https://tdx.transportdata.tw/) · [Plataforma de Dados Abertos do Governo](https://data.gov.tw/) · [SEGIS Geoestatística](https://segis.moi.gov.tw/)

---

_Última verificação: 2026-03-22_
