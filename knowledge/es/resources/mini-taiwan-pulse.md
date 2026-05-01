---
title: 'Mini Taiwan Pulse — Visualización 3D en tiempo real del transporte en Taiwán'
description: 'Siente el pulso de Taiwán a través de datos abiertos: estelas de luz de vuelos surcando el cielo, barcos navegando la superficie marítima, trenes corriendo por las vías. 23 capas presentan en tiempo real la respiración de esta isla.'
date: 2026-03-22
tags:
  [
    recursos,
    datos-abiertos,
    visualización,
    transporte,
    3D,
    tiempo-real,
    Taiwan.md,
  ]
translatedFrom: resources/mini-taiwan-pulse.md
sourceCommitSha: 528d1c04
sourceContentHash: sha256:409b7d5c9d0f3bbd
translatedAt: 2026-05-01T22:19:10+08:00
---

# Mini Taiwan Pulse — Visualización 3D en tiempo real del transporte en Taiwán 🌐

> 📖 **Artículo en profundidad**: Este recurso se ha ampliado como artículo de investigación en tecnología cívica. La versión completa está disponible en [Mini Taiwan Pulse: cómo un analista de datos convirtió el pulso del transporte de Taiwán en estelas 3D que respiran](/technology/mini-taiwan-pulse) (2026-04-19). Esta página se conserva como entrada de índice en el listado de recursos.

> **Resumen en 30 segundos:** Un proyecto de código abierto que transforma la dinámica del transporte en Taiwán en esferas luminosas y estelas de luz en 3D. Los aviones trazan arcos en el cielo, los barcos dejan estelas sobre la superficie marítima, los trenes corren por las vías — 23 capas conmutables que te permiten "ver" el pulso de Taiwán.

## Por qué merece atención

La mayoría de la gente mira un mapa de Taiwán y ve un contorno estático. Mini Taiwan Pulse te permite ver una **isla que respira**.

La ambición de este proyecto no es pequeña: integrar en un mismo mapa 3D los datos abiertos dispersos entre distintas agencias gubernamentales — vuelos, AIS de embarcaciones, horarios de TRA y THSR, líneas de metro, estadísticas demográficas, observaciones meteorológicas. No se trata de simples marcadores puntuales, sino de utilizar un lenguaje visual de esferas luminosas, estelas de luz y colas de cometa para convertir datos en paisajes en movimiento.

> **📝 Nota del curador**
> La infraestructura de datos abiertos de Taiwán se encuentra entre las mejores de Asia (el [Índice Global de Datos Abiertos](https://index.okfn.org/) la ha situado repetidamente entre los diez primeros), pero existe una brecha enorme entre "datos abiertos" y "datos visibles". Mini Taiwan Pulse está cerrando esa brecha.

## Tres capas de pulso

### Cielo — Estelas de luz de vuelos ✈️

Cubre la dinámica en tiempo real de más de 1.500 vuelos en 14 aeropuertos de todo Taiwán. Cada avión es una esfera luminosa que arrastra una estela de luz con degradado en forma de cola de cometa. La exageración de altitud es ajustable (1x–5x), permitiendo distinguir de un vistazo las rutas de baja altitud de las de gran altitud.

Fuente de datos: API de FlightRadar24.

### Océano — Seguimiento de embarcaciones 🚢

La posición de los barcos en las aguas circundantes de Taiwán se indica con esferas luminosas en azul verdoso, dejando cada embarcación una estela de 30 minutos. El sistema filtra automáticamente saltos GPS anómalos y MMSI no válidos, asegurando que cada punto luminoso que ves corresponde a un barco real.

Fuente de datos: datos de posición de embarcaciones del AIS (Sistema Automático de Identificación).

### Tierra — Seis sistemas ferroviarios 🚄

Esta es quizás la parte más impresionante. Seis sistemas ferroviarios funcionando de forma sincronizada:

| Sistema                     | Escala                                                    |
| --------------------------- | --------------------------------------------------------- |
| TRA (ferrocarril)           | 265 rutas, 333 trenes, clasificados por tipo en 6 colores |
| THSR (AVE)                  | Línea norte-sur principal + ramales                       |
| Metro de Taipéi             | 8 líneas                                                  |
| Metro de Kaohsiung          | Línea roja + línea naranja                                |
| Tranvía ligero de Kaohsiung | Tranvía circular                                          |
| Metro de Taichung           | Línea verde + línea azul                                  |

El procesamiento del TRA es especialmente complejo — el emparejamiento de rutas OD, las rutas divergentes como el triángulo de Changhua, cuentan con motores dedicados.

Fuente de datos: horarios públicos + datos de vías de [OpenStreetMap](https://www.openstreetmap.org/).

## Más allá del transporte

Además de los vehículos en movimiento, el proyecto superpone múltiples capas estáticas y analíticas:

- **Infraestructura**: perímetros de 14 aeropuertos, columnas luminosas en 535 estaciones (altura = número de paradas), haces rotativos 3D de 36 faros
- **Red vial**: autopistas nacionales (rojo), carreteras provinciales (naranja), ciclovías (verde), ancho adaptable al nivel de zoom
- **Análisis demográfico**: mapa de calor poblacional con hexágonos H3, conmutable entre flujo diurno/nocturno, 9 indicadores demográficos
- **Meteorología**: datos en tiempo real de estaciones de observación + superficie 3D de ondas de temperatura (resolución de malla de 0,03°)
- **Noticias**: RSS de CNA (Central News Agency) + geocodificación con API de Gemini, situando eventos noticiosos en el mapa
- **Congestión en autopistas**: codificación por colores del nivel de congestión en tiempo real

En total, **23 capas conmutables de forma independiente**, organizadas en diez categorías.

## Aspectos técnicos destacados

- **TypeScript + Mapbox GL + Three.js**: el mapa 2D se renderiza de forma nativa con Mapbox, mientras que los elementos 3D (esferas luminosas, estelas, columnas, superficies de temperatura) se superponen con Three.js
- **Rendimiento**: las embarcaciones se renderizan por lotes con InstancedMesh; el descarte por viewport (viewport culling) evita renderizar objetos fuera del campo de visión
- **Ciencia del color**: las capas demográficas utilizan escalas de color perceptualmente uniformes como Plasma / Viridis / Inferno, con normalización log1p + gamma para distribuciones de cola pesada, aptas para personas daltónicas
- **Licencia MIT**: completamente de código abierto, se invita a hacer fork y contribuir

> **📝 Nota del curador**
> Utilizar additive blending para superponer estelas de luz es una elección inteligente: las zonas donde múltiples rutas se cruzan se iluminan de forma natural, permitiendo apreciar visualmente la intensidad del tráfico aéreo sin necesidad de gráficos estadísticos adicionales.

## Ecosistema de datos abiertos

Las fuentes de datos que conecta este proyecto constituyen en sí mismas una guía de los datos abiertos de Taiwán:

| Dato                                         | Fuente                                                                |
| -------------------------------------------- | --------------------------------------------------------------------- |
| Posición en tiempo real de vuelos            | API de FlightRadar24                                                  |
| AIS de embarcaciones                         | Sistema Automático de Identificación de embarcaciones internacional   |
| Horarios ferroviarios                        | Horarios públicos + OSM                                               |
| Autobuses/bicicletas                         | [TDX Datos de Transporte Público](https://tdx.transportdata.tw/)      |
| Estadísticas demográficas                    | [SEGIS Información Estadística Geográfica](https://segis.moi.gov.tw/) |
| Observaciones meteorológicas                 | [Administración Central de Meteorología](https://www.cwa.gov.tw/)     |
| Parques eólicos marinos                      | Ministerio de Economía — Bureau of Energy                             |
| Eventos noticiosos                           | RSS de CNA (Central News Agency)                                      |
| Perímetros de aeropuertos/puertos/estaciones | [API Overpass de OSM](https://overpass-turbo.eu/)                     |

⚠️ **Cabe destacar:** el [servicio TDX de datos de transporte](https://tdx.transportdata.tw/) de Taiwán es una de las pocas plataformas gubernamentales que unifica y estandariza los datos de transporte público a nivel nacional, cubriendo autobuses, transporte interurbano, ferrocarriles, bicicletas, etc., con documentación API completa y uso gratuito. Esto es poco común a nivel mundial.

## Enlaces

- **GitHub**: [ianlkl11234s/mini-taiwan-pulse](https://github.com/ianlkl11234s/mini-taiwan-pulse)
- **Licencia**: MIT License
- **Lenguaje**: TypeScript
- **Recursos relacionados**: [Plataforma TDX de datos de transporte](https://tdx.transportdata.tw/) · [Plataforma de Datos Abiertos del Gobierno](https://data.gov.tw/) · [SEGIS Información Estadística Geográfica](https://segis.moi.gov.tw/)

---

_Última verificación: 2026-03-22_
