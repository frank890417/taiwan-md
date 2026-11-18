---
title: 'Transparencia de donaciones políticas: plataforma del Yuan de Control, visualización de g0v, 22 años de infraestructura de apertura'
description: 'Abra la plataforma pública de consulta de donaciones políticas del Yuan de Control, introduzca el nombre de cualquier candidato y podrá ver de cuánto dinero recibió y de quién, y en qué actividades de campaña lo gastó. Esta infraestructura no cayó del cielo: es el resultado de la promulgación de la Ley de Donaciones Políticas en 2004, la puesta en marcha de la plataforma en 2008, el acuerdo de apertura de datos entre la Comisión Electoral Central y el Yuan de Control en 2017, y una década de ingenieros ciudadanos de g0v cubriendo las brechas de visualización, construida ley por ley, informe contable por informe contable, ingeniero ciudadano por ingeniero ciudadano.'
date: 2026-05-27
author: 'Taiwan.md'
category: 'Politics'
subcategory: '公民監督'
tags:
  [
    'donaciones políticas',
    'transparencia',
    'Yuan de Control',
    'g0v',
    'financiamiento electoral',
    'legislación de 2004',
    'elecciones 2026',
  ]
readingTime: 12
lastVerified: 2026-05-27
lastHumanReview: false
featured: false
curation: 'incubating'
curationReason: 'unverified'
translatedFrom: 'Politics/政治獻金透明度.md'
sourceCommitSha: 'be13f045'
sourceContentHash: 'sha256:8a7814971a9249c7'
sourceBodyHash: 'sha256:214c403ec0d7137c'
translatedAt: '2026-07-11T00:35:00+08:00'
---

# Transparencia de donaciones políticas: cuando la infraestructura democrática se convierte en un CSV descargable

> **Resumen en 30 segundos:** Un fin de semana de 2014, un ingeniero de g0v abrió los informes de donaciones políticas del Yuan de Control en el espacio de hackathon de la calle Qingdao Este en Taipéi. No quería ver mucho: qué empresas habían donado a los candidatos a legislador en la elección anterior y cuánto cada una. Pero el archivo descargado era un PDF. No una tabla, no un CSV, no un JSON: un PDF escaneado. Dejó el café, abrió la terminal y comenzó a escribir la primera línea del script para extraer los datos. Diez años después, Taiwán tiene el sistema de visualización "Flujo de dinero electoral" — no hecho por el gobierno, sino completado por ingenieros ciudadanos. Pero la posición que cubrieron no estaba vacía; debajo de esa posición hay una ley promulgada en 2004, una plataforma de consulta puesta en línea en 2008, y hojas de informes contables subidas al Yuan de Control conforme a la ley. Este artículo trata sobre esa posición: la transparencia de las donaciones políticas, el fragmento más técnico, más frecuentemente ignorado y sin embargo más concreto de 22 años de infraestructura democrática en Taiwán.

---

## Por qué empezar por el PDF

El ciudadano común no consulta las donaciones políticas. Es un hecho.

Abrir la plataforma pública de consulta de donaciones políticas del Yuan de Control[^1], introducir el nombre de un candidato, descargar el informe — esta secuencia de acciones no está en la rutina de la gran mayoría de los votantes. Ir a la casilla electoral la mañana de la votación, emitir un voto y volver a casa a ver la transmisión de los resultados es la experiencia dominante de participación democrática.

Pero **el valor de la infraestructura de transparencia no reside en cuántos la usan, sino en su mera existencia**.

Cuando un periodista de investigación quiere rastrear un flujo de dinero — la plataforma está ahí.
Cuando un candidato a legislador quiere saber qué empresas donaron al legislador actual en la elección anterior — la plataforma está ahí.
Cuando un ingeniero de g0v quiere hacer una visualización para que los datos sean más comprensibles — los datos originales están ahí.
Cuando un académico quiere estudiar la estructura de la política de influencia monetaria — veinte años de datos acumulados están ahí.

Cuando la plataforma no existe, todas estas preguntas son imposibles. Cuando la plataforma existe, la calidad democrática tiene un límite inferior verificable.

Por eso, cuando se promulgó la Ley de Donaciones Políticas en 2004[^2], no fue un partido el que ganó — fue la infraestructura democrática de Taiwán la que desarrolló un nuevo órgano.

---

## 2004: el año del raro consenso bipartidista

El 26 de marzo de 2004, el Yuan Legislativo aprobó en tercera lectura la Ley de Donaciones Políticas[^2].

El clima político de ese año era en realidad muy hostil: apenas habían pasado siete días desde el atentado del 19 de marzo, los resultados de la elección presidencial provocaron una confrontación entre el panazul y el panverde, y los manifestantes frente a la avenida Ketagalan aún no se habían dispersado. Pero la Ley de Donaciones Políticas se aprobó precisamente en esta primavera de máxima tensión.

¿Por qué los dos partidos alcanzaron un consenso en este momento? La respuesta está en la historia de la década anterior.

Desde la década de 1990, el término "política de influencia monetaria" fue casi un punto débil para ambos partidos. Se acusó al Kuomintang de combinar facciones locales con capitalistas, se acusó al Partido Progresista Democrático de recibir patrocinadores de empresas emergentes, y los candidatos independientes recibían dinero sin que nadie los supervisara. Después de cada elección había escándalos monetarios aislados, pero como no había ley especial, ni obligación de revelación, ni sanciones — el escándalo pasaba, la opinión pública se apagaba.

No fue hasta la primera alternancia de partido en 2000 que el gobierno de Chen Shui-bian impulsó la legislación. Aunque la mayoría del Kuomintang en el Yuan Legislativo se oponía al ejecutivo en muchos temas, en la cuestión de "si las donaciones políticas deben ser transparentes", **ambos partidos se dieron cuenta de que habían sufrido la etiqueta de política de influencia monetaria**. La demanda de una imagen de integridad era mayor que la conveniencia de la opacidad.

La Ley de Donaciones Políticas nació en este momento — no impulsada por un héroe, no forzada por un movimiento, sino de la intersección de ambos partidos en un punto de interés común.

---

## El esqueleto legal: quién puede recibir, quién puede donar, cuáles son los límites, cómo declarar

El texto completo de la Ley de Donaciones Políticas no es largo, pero su esqueleto es claro[^3].

**Artículo 5: Quién puede recibir donaciones políticas.** La ley define tres tipos de "receptores de donaciones políticas":

- Candidatos (registrados)
- Partidos políticos
- Grupos políticos (constituidos legalmente)

Cualquier persona fuera de estas tres categorías que reciba donaciones políticas — es ilegal. Un asistente legislativo que reciba, un jefe de campaña que reciba en nombre del candidato, el cónyuge de un candidato que reciba — todo está prohibido. El diseño de la ley canaliza el flujo de dinero hacia el conducto de las "entidades declarables", exprimiendo el espacio gris.

**Artículo 7: Quién puede donar.** La ley permite tres tipos de donantes:

- Ciudadanos nacionales
- Empresas nacionales
- Organizaciones sin fines de lucro nacionales

**Se prohíben las siguientes categorías**:

- Empresas extranjeras, gobiernos extranjeros, personas extranjeras
- Personas, entidades jurídicas y grupos de la región de la República Popular China
- Órganos gubernamentales, empresas públicas
- Entidades jurídicas en las que el gobierno o empresas públicas posean más del 20% de las acciones
- Contratistas con contratos vigentes con el gobierno[^4]

La última — que los contratistas gubernamentales no puedan donar — está diseñada como el cortafuegos más básico para bloquear el intercambio de "donaciones políticas por contratos gubernamentales".

**Artículo 18: Límites de cantidad.** Esta es la cláusula más discutida[^5]:

- Persona física a un mismo candidato: 100.000 nuevos dólares taiwaneses al año
- Empresa a un mismo candidato: 1.000.000 de nuevos dólares taiwaneses al año [NEEDS-VERIFY]
- Persona física a un partido político: 300.000 nuevos dólares taiwaneses al año
- Empresa a un partido político: 3.000.000 de nuevos dólares taiwaneses al año [NEEDS-VERIFY]

La lógica del límite es evitar que un solo donante tenga una influencia excesiva sobre un solo candidato — pero más adelante veremos cómo esta lógica es eludida estructuralmente mediante la "donación fragmentada".

**Artículo 20: Obligación de declaración.** Los candidatos deben declarar ante el Yuan de Control, dentro de un plazo determinado tras la elección, un detalle completo de ingresos y gastos de donaciones políticas — quién donó cuánto, en qué partidas se gastó, cuánto sobra. Los datos declarados se cargan en el sistema de verificación de cuentas especiales de donaciones políticas del Yuan de Control, como fuente de datos para consulta pública futura.

**Artículo 26: Sanciones.** Los infractores enfrentan multas de 1 a 5 veces el monto, y los casos graves constituyen responsabilidad penal — con una pena máxima de hasta cinco años de prisión[^6]. El diseño de las sanciones hace que "simplemente no declarar" no sea una opción razonable.

La ley hasta aquí — el esqueleto está completo. Pero un esqueleto no es un órgano; un órgano necesita carne y sangre. La carne y la sangre son la plataforma.

---

## 2008: la plataforma del Yuan de Control entra en línea

La elección presidencial número 12 de 2008 — Ma Ying-jeou contra Hsieh Chang-ting — fue la primera elección presidencial en Taiwán "plenamente sujeta a la Ley de Donaciones Políticas y con declaración obligatoria"[^7] [NEEDS-VERIFY].

Ese año, la plataforma pública de consulta de donaciones políticas del Yuan de Control entró oficialmente en línea. URL: `https://ardata.cy.gov.tw/`[^1].

El objetivo de diseño de la primera versión de la plataforma era simple: digitalizar los datos en papel declarados por los candidatos, subirlos a internet y abrirlos a consulta pública. Cualquiera podía introducir el nombre del candidato / nombre del partido político / nombre del grupo político y consultar los detalles de ingresos y gastos de declaraciones históricas — incluyendo el nombre de cada donante, el monto y la clasificación del uso.

Este es uno de los pocos diseños en Asia. **Los datos de la FEC (Comisión Federal de Elecciones) de Estados Unidos son más profundos — pero históricamente se abrían después de las elecciones**[^8]. Japón también tiene un mecanismo de revelación después de fortalecer la Ley de Regulación de Fondos Políticos en 2007, pero la "laguna de los grupos políticos" permite que los principales flujos de dinero tomen desvíos[^9]. Corea del Sur gestiona centralmente a través de la Comisión Electoral Central, pero su interfaz es menos amigable que la de Taiwán[^10] [NEEDS-VERIFY].

Taiwán está en realidad adelantado en esta posición — pero la posición de liderazgo no evita el siguiente problema.

**El problema es: la interfaz es difícil de usar, los datos no están estructurados, no se pueden descargar por lotes**.

Al abrir la primera versión de la plataforma, había que hacer clic en cada PDF uno por uno. Si querías ver qué empresas donaron a un candidato — abrías el PDF 1. Si querías ver al siguiente — abrías el PDF 2. Si querías hacer comparaciones entre candidatos — copiabas las tablas manualmente. Si querías hacer análisis de series temporales — organizabas la línea de tiempo tú mismo. Si querías ver si el mismo grupo había dividido las donaciones en decenas de personas — tenías que comparar manualmente direcciones y apellidos.

Esta es la escena en la que el ingeniero de g0v abrió el archivo en 2014.

---

## 2014: g0v comienza a cubrir la brecha con "Flujo de dinero electoral"

g0v es la comunidad de hackers ciudadanos de Taiwán[^11]. El nombre viene de "cambiar gov.tw a g0v.tw" — el trabajo de datos abiertos que el gobierno no hace, la comunidad lo hace por sí misma.

En un hackathon de 2014, varios ingenieros decidieron emprender el proyecto "Flujo de dinero electoral"[^12]. Los objetivos eran claros:

1. Descargar los informes en PDF del Yuan de Control
2. Analizarlos en datos estructurados (CSV / JSON)
3. Hacer visualizaciones para que la gente pueda entenderlos
4. Liberar como código abierto todos los scripts de extracción y análisis

El primer paso fue un obstáculo — los PDF eran escaneados, no PDF digitales reales. El texto no se podía copiar directamente. Tuvieron que escribir un pipeline de OCR, escribir corrección de formato, escribir comparación de nombres, escribir deduplicación de empresas.

Meses después, la primera versión de "Flujo de dinero electoral" entró en línea[^12]. Al abrir la página web, lo que veías no era un informe — era un gráfico de red.

- Los puntos representan candidatos o donantes
- Las líneas representan la dirección del flujo de dinero
- El grosor de las líneas representa el monto
- Las empresas asociadas del mismo grupo se agrupan por color

Al hacer clic en cualquier nodo, se ve el detalle completo. Al hacer clic en cualquier enlace, se ve la fuente de declaración original (indicando la página del PDF del Yuan de Control).

**Lo que hace esta visualización es convertir datos que el Yuan de Control ya había hecho públicos en datos explorables**. Ley + plataforma + visualización — las tres capas juntas crean la posibilidad operativa de "rastrear flujos de dinero abriendo un navegador".

No solo el proyecto "Flujo de dinero electoral". El ecosistema de supervisión política de g0v también incluye:

- **councilor-voter-guide** (Guía de votación para concejales)[^13]: Integra las donaciones políticas, tasa de asistencia, historial de propuestas e historial de interpelaciones de los candidatos a concejal, creando una tarjeta de identidad del concejal
- **Donaciones políticas oscuras**[^14] [NEEDS-VERIFY]: Marca patrones de flujo de dinero sospechosos o potencialmente irregulares
- **Contratos gubernamentales × comparación cruzada de donaciones políticas**: Conecta los datos de la Gaceta de Contratación Gubernamental con los datos de donaciones políticas para ver qué empresas adjudicatarias también son donantes políticos

La característica de estos proyectos es: **todos los datos originales provienen de fuentes de datos públicos del gobierno**. La comunidad no hace "revelar secretos", sino "convertir datos ya públicos pero difíciles de usar en utilizables".

Este es el modelo saludable de la infraestructura de supervisión ciudadana en Taiwán: el gobierno proporciona los datos originales, la comunidad complementa la interfaz y el análisis, los medios y académicos usan los resultados de la comunidad para la supervisión. Tres capas de división de trabajo, cada una haciendo lo que mejor sabe.

---

## 2017: el acuerdo de apertura de datos entre el Yuan de Control y la Comisión Electoral Central

2017 fue un punto de inflexión.

Ese año, el Yuan de Control y la Comisión Electoral Central firmaron un acuerdo de apertura de datos [NEEDS-VERIFY], y parte de los datos de donaciones políticas comenzaron a abrirse al público en formato estructurado (CSV / algunos campos de API)[^15]. Aunque no era una API completa y muchos datos seguían en formato PDF — esta fue la primera vez que una plataforma oficial de datos en Taiwán reconocía formalmente que "los datos estructurados son la verdadera apertura".

El "Flujo de dinero electoral" de g0v también recibió su segunda versión en este momento[^12]. La nueva versión ya no necesitaba OCR para procesar grandes cantidades de datos, podía consumir directamente los CSV oficiales — la eficiencia de procesamiento mejoró, los errores disminuyeron, la cobertura se expandió.

Pero **una API completa aún no se ha implementado**. En 2026, si quieres hacer un análisis masivo de donaciones políticas entre distritos, años y candidatos, todavía tienes que depender parcialmente de los canales de scraping mantenidos por g0v. La línea de "datos abiertos gubernamentales" en la posición de donaciones políticas ha caminado veintidós años y aún no ha llegado al final.

---

## Problemas estructurales: la ley está escrita pero existen lagunas

La Ley de Donaciones Políticas ha operado durante veintidós años y ha acumulado varios problemas estructurales. Estos problemas no son fallos de diseño de la ley en sí — son desafíos universales que enfrenta cualquier ley de transparencia.

### 1. Donación fragmentada para eludir los límites

Los límites de 100.000 para personas físicas y el límite para empresas establecidos en el Artículo 18 de la ley parecen suficientes para evitar la influencia concentrada. Pero en la práctica, un grupo puede **dividir una donación grande en decenas de donaciones individuales**. Directores del grupo, cónyuges de directores, responsables de subsidiarias, empleados — cada uno dona 100.000 como persona física, y el total colectivo supera el límite cien veces[^16].

Técnicamente, este patrón no viola el Artículo 18 — cada persona física está dentro del límite. Pero en sustancia es una elusión. Para demostrar que se trata de la misma fuente de fondos "fragmentada", se requiere rastrear el origen del dinero, entrevistar a las personas involucradas — la capacidad de verificación del Yuan de Control no permite investigar cada caso a fondo.

### 2. La zona gris de las cláusulas de préstamo

La ley permite que los candidatos "se presten dinero a sí mismos" para la campaña — es decir, el propio candidato o su familia pueden proporcionar grandes préstamos a la actividad de campaña, y luego pagarlos con otros ingresos [NEEDS-VERIFY]. Este diseño original era para garantizar que los candidatos no quedaran excluidos por falta de fondos iniciales, pero en la práctica **los préstamos a menudo se convierten en la principal fuente de financiamiento**. Un préstamo no se considera "donación política" — no está sujeto al límite del Artículo 18, ni aparece en la misma tabla de revelación pública de "donantes".

El resultado es que las donaciones políticas declaradas por un candidato pueden ser solo unos pocos millones, pero los gastos reales de campaña pueden alcanzar decenas de millones, con la diferencia proveniente de "autopréstamos" — y la fuente final de pago de los "autopréstamos" a menudo está fuera del alcance de supervisión de la Ley de Donaciones Políticas.

### 3. Donaciones políticas ≠ gastos de campaña

Este es el punto que más fácilmente se confunde.

Las **donaciones políticas** son el "dinero recibido" por el candidato — sujeto al límite del Artículo 18, debe declararse ante el Yuan de Control.
Los **gastos de campaña** es el "dinero gastado" por el candidato — sujeto al límite de gastos del Artículo 41 de la Ley de Elecciones y Revocación de Funcionarios Públicos[^17], debe declararse ante la Comisión Electoral Central.

Son dos entidades diferentes (Yuan de Control vs. Comisión Electoral Central), dos sistemas de declaración diferentes, dos interfaces públicas diferentes, dos definiciones de campos diferentes. **En teoría deberían cuadrar** — el dinero recibido menos el sobrante es igual al dinero gastado — pero en la práctica los datos de ambos lados a menudo no coinciden. Las razones son diferencias de definición, diferencias en los plazos de declaración, diferencias en el uso de los remanentes.

La comunidad de g0v intentó hacer una "verificación cruzada de donaciones políticas × gastos de campaña" — pero el trabajo de normalización requerido para conectar plataformas es enorme[^12].

### 4. La revocación y los referéndums no están sujetos a requisitos de revelación

La Ley de Donaciones Políticas regula las "elecciones de candidatos" — no incluye a los proponentes de revocación, no incluye a los proponentes de referéndum.

Durante el movimiento de gran revocación de 2025, las fuentes de financiamiento de los grupos de petición no tenían la misma obligación de revelación[^18]. Los grupos proponentes podían recibir donaciones, podían movilizar, pero no había un sistema de declaración correspondiente en el Yuan de Control. Esta laguna se convirtió en una dirección de reforma discutida después de la revocación masiva de 2025 — pero la Ley de Donaciones Políticas no ha sido enmendada desde 2018 y, a julio de 2026, los flujos de dinero de los proponentes de revocación y referéndum siguen fuera de la obligación legal de declaración.

---

## Comparación internacional: la posición relativa de Taiwán en Asia

Volviendo al sistema de coordenadas asiático:

| País           | Autoridad               | Tiempo de revelación                                                  | Amigabilidad de interfaz                     | Sistema de límites                        |
| -------------- | ----------------------- | --------------------------------------------------------------------- | -------------------------------------------- | ----------------------------------------- |
| Taiwán         | Yuan de Control         | 3-6 meses después de la elección                                      | Media (parcialmente estructurada)            | 100.000 persona física / empresa limitada |
| Estados Unidos | FEC                     | Después de la elección (algunas declaraciones periódicas previas)[^8] | Alta (API completa)                          | Persona física / PAC por niveles          |
| Japón          | Ministerio del Interior | Informes anuales                                                      | Baja (principalmente PDF)[^9]                | Gran laguna de grupos políticos           |
| Corea del Sur  | Comisión Electoral      | Después de la elección                                                | Baja (interfaz obsoleta)[^10] [NEEDS-VERIFY] | Gestión centralizada                      |

La posición relativa de Taiwán es: **base legal completa, plataforma existente, límites razonables, pero la interfaz aún tiene margen de mejora, las lagunas estructurales requieren reforma legal**.

No es la mejor — la FEC de Estados Unidos sigue siendo el referente internacional en profundidad de datos y completitud de API.
Pero tampoco es la peor — comparada con algunos países vecinos donde "formalmente hay revelación pero sustantivamente no se puede recuperar", la plataforma del Yuan de Control de Taiwán más la cobertura de g0v es un ecosistema en funcionamiento.

---

## Puntos de observación para las elecciones de 2026

Las elecciones unificadas del 28 de noviembre de 2026 — 6 alcaldes de municipios especiales, 380 concejales, 16 magistrados de condado, 532 concejales de condado, 198 alcaldes de municipio, 2.148 representantes, 6 jefes de distrito indígena, 50 representantes de distrito, 7.748 jefes de aldea — un total de más de 10.000 cargos electivos[^19].

Los puntos de observación de transparencia de donaciones políticas para estas elecciones incluyen varios aspectos dignos de seguimiento:

**1. Si se amplía la declaración en tiempo real.** Actualmente los candidatos declaran después de la elección, se hacen públicos meses después. Si pudieran hacerse públicos periódicamente antes de la elección (incluso actualizaciones mensuales), el significado para la decisión de los votantes sería mayor. Esto requeriría reforma legal o ajustes a nivel de orden ejecutivo del Yuan de Control.

**2. Si el espejo en tiempo real de g0v puede cubrir.** "Flujo de dinero electoral" de g0v históricamente hace visualizaciones completas después de cada elección general, pero la cobertura "antes de la elección" sigue siendo limitada. Si 2026 puede tener un canal de datos ciudadanos más cercano al tiempo real, dependerá de la energía de la comunidad.

**3. Concentración de donaciones grandes.** Observar la proporción del total de donaciones de un candidato que proviene de unos pocos donantes — cuanto mayor la concentración, mayor la dependencia del candidato de patrocinadores específicos. Este es un indicador proxy para medir la estructura de la política de influencia monetaria.

**4. Comparación con contratistas gubernamentales.** El Artículo 7 prohíbe las donaciones de contratistas gubernamentales — pero la ejecución entre períodos tiene retrasos (la relación temporal entre la fecha de firma del contrato y la fecha de donación es compleja). Después de cada elección hay casos aislados que activan investigaciones del Yuan de Control. La profundidad de cobertura de estos casos en 2026 también es un punto de observación.

**5. Lagunas de revelación de revocación / referéndum.** Si la discusión de reforma mencionada anteriormente se materializa.

---

## Por qué esta infraestructura merece ser valorada

Volvamos a la escena inicial del ingeniero de g0v abriendo el PDF.

Si le preguntaras: "¿Por qué pasas el fin de semana haciendo esto? De todas formas la mayoría no lo usará." — no respondería "por la democracia", no respondería "por la transparencia", probablemente tampoco respondería "por la supervisión ciudadana".

Respondería — "porque estos datos **deberían** poder usarse de esta manera, pero ahora no se puede".

Esta es la esencia de la cultura de ingeniería ciudadana de Taiwán — **no es revolución, no es protesta, es cubrir brechas**. El gobierno ya ha hecho el 80% del trabajo, el 20% restante de usabilidad, explorabilidad y analizabilidad lo cubre la comunidad.

El Yuan de Control ha hecho lo máximo que la Ley de Donaciones Políticas le permite hacer — recibir datos, almacenar datos, proporcionar interfaz de consulta. g0v ha hecho extensiones fuera de la interfaz del Yuan de Control — visualización, comparación entre fuentes de datos, API, documentación comunitaria. Los medios han hecho reportajes de investigación sobre las visualizaciones de g0v — sacando a la luz las historias detrás de los gráficos de red. Los académicos han hecho análisis estructurales de datos acumulados a largo plazo — escribiendo las tendencias de cada elección como artículos académicos.

**Estas cuatro capas de división de trabajo no trabajan cada una por su cuenta, son diferentes nodos de la misma cadena**. Cada capa complementa lo que la anterior no puede hacer. Sin cualquiera de las capas, la siguiente no podría existir.

El día de las elecciones unificadas de 2026, desde los 7.748 jefes de aldea hasta los 6 alcaldes de municipios especiales — termina la votación, termina el escrutinio, ganadores y perdedores — todos desvían la mirada. Pero esta infraestructura no se detiene. El sistema de declaración del Yuan de Control recibirá los informes contables de todos los candidatos, el scraping de g0v descargará la nueva ronda de datos, una nueva generación de visualizaciones comenzará a escribirse en la mesa de café de algún hackathon.

**La forma más concreta de la infraestructura democrática es esta ingeniería sin héroes, día tras día, que hace que los datos sean utilizables**.

Abrir el navegador, introducir la URL, buscar el nombre de un candidato — detrás de esta acción hay la legislación de 2004, la plataforma de 2008, el hackathon de 2014, el acuerdo de 2017, el mantenimiento continuo de 2026.

Veintidós años, un flujo de dinero invisible se vuelve consultable.

🧬

---

## Lecturas complementarias

- [Comunidad de código abierto y g0v](/es/technology/open-source-and-g0v) — Cómo funciona la comunidad de hackers ciudadanos y por qué Taiwán tiene este ecosistema
- [Centro de Política](/politics) — Perspectiva panorámica de la infraestructura democrática
- [Elecciones unificadas de 2026](/politics/2026 九合一選舉) — Organización del sistema y calendario de las elecciones de 2026
- [Sistema de la Comisión Electoral Central](/es/politics/central-election-commission) — Diseño y funcionamiento de la Comisión Electoral Central
- [Qué son las elecciones unificadas](/es/politics/nine-in-one-elections-explained) — Nueve tipos de cargos, nueve historias

---

## Referencias

[^1]: [Plataforma pública de consulta de donaciones políticas del Yuan de Control](https://ardata.cy.gov.tw/) — Entrada oficial del Yuan de Control para consulta de datos de donaciones políticas, proporciona datos de declaraciones históricas de candidatos / partidos políticos / grupos políticos.

[^2]: [Proceso legislativo de la Ley de Donaciones Políticas](https://lis.ly.gov.tw/lglawc/lawsingle?00396B05E12200000000000000014000000004000000^03083093032600^00133001001) — Sistema integrado de búsqueda de datos legales del Yuan Legislativo, aprobado en tercera lectura el 26 de marzo de 2004. [NEEDS-VERIFY enlace]

[^3]: [Texto completo de la Ley de Donaciones Políticas](https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=D0020042) — Base de datos nacional de regulaciones del Ministerio de Justicia.

[^4]: [Artículo 7 de la Ley de Donaciones Políticas](https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=D0020042) — Fuente oficial del Artículo 7 de la Ley de Donaciones Políticas

[^5]: [Artículo 18 de la Ley de Donaciones Políticas](https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=D0020042) — Límites de monto de donaciones políticas. Las cifras exactas deben consultarse en la versión más reciente de la base de datos de regulaciones.

[^6]: [Artículos 26 a 31 de la Ley de Donaciones Políticas](https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=D0020042) — Fuente oficial de los Artículos 26 a 31 de la Ley de Donaciones Políticas

[^7]: [Historial de activación de la plataforma de donaciones políticas del Yuan de Control](https://ardata.cy.gov.tw/) — La página "Acerca de" de la plataforma documenta los ajustes importantes históricos. [NEEDS-VERIFY año exacto de puesta en línea]

[^8]: [FEC: Comisión Federal de Elecciones](https://www.fec.gov/) — Sitio web oficial de la Comisión Federal de Elecciones de Estados Unidos, proporciona API financiera completa de candidatos.

[^9]: [Ley de Regulación de Fondos Políticos de Japón](https://www.soumu.go.jp/senkyo/seiji_s/) — Página principal del Ministerio del Interior de Japón sobre fondos políticos.

[^10]: [Comisión Electoral Nacional de Corea del Sur](https://www.nec.go.kr/) — Comisión Electoral Central de Corea del Sur. [NEEDS-VERIFY evaluación de amigabilidad de interfaz]

[^11]: [g0v Gobierno Cero](https://g0v.tw/) — Sitio web oficial de la comunidad de hackers ciudadanos de Taiwán.

[^12]: [Proyecto Flujo de dinero electoral de g0v](https://g0v-money-flow.github.io/elections/) — Sitio web del proyecto de visualización de donaciones políticas.

[^13]: [g0v councilor-voter-guide](https://github.com/g0v/councilor-voter-guide) — Repositorio GitHub de la guía de votación para concejales.

[^14]: [Colección de proyectos electorales de g0v](https://g0v.tw/projects) — Conjunto de herramientas de código abierto para la supervisión ciudadana de donaciones políticas. Los nombres específicos de los proyectos están pendientes de completar.

[^15]: [Descripción de datos abiertos de donaciones políticas del Yuan de Control](https://ardata.cy.gov.tw/) — Descripción de descarga de datos y campos abiertos de la plataforma. [NEEDS-VERIFY fecha de firma del acuerdo de 2017]

[^16]: [Artículos de la conferencia anual de la Asociación de Ciencia Política de Taiwán](http://www.tpsahome.org.tw/) — Las discusiones académicas sobre la elusión de límites mediante donación fragmentada se encuentran dispersas en ellos. Los casos específicos no se citan en este artículo siguiendo el principio común de "no nombrar".

[^17]: [Artículo 41 de la Ley de Elecciones y Revocación de Funcionarios Públicos](https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=D0020010) — Método de cálculo del monto máximo de gastos de campaña.

[^18]: [Sistema integrado de propuestas del Yuan Legislativo](https://misq.ly.gov.tw/) — Las discusiones de reforma sobre la revelación de flujos de dinero relacionados con el movimiento de gran revocación de 2025 se encuentran dispersas en él; el Yuan Legislativo aún no lo ha incluido en la agenda formal.

[^19]: [Anuncios relacionados con las elecciones unificadas de 2026 de la Comisión Electoral Central](https://www.cec.gov.tw/) — Sitio web oficial de la Comisión Electoral Central. [NEEDS-VERIFY las cifras exactas de cargos están sujetas al anuncio final de la Comisión Electoral Central]

---

_Última actualización: 2026-05-27 — Serie del Centro de Política de las elecciones unificadas de 2026, artículo NUEVO._
_Autor: Taiwan.md 🧬_
