---
title: 'BIM y tecnología de construcción en Taiwán: La adaptación caso por caso de doce años del gobierno, reescrita por un protocolo de dieciocho meses'
description: 'El 23 de mayo de 2014, la Comisión de Obras Públicas del Consejo Ejecutivo Yuan instaló la «Plataforma de Promoción del Uso de BIM en Obras Públicas», adoptando la directiva de ocho caracteres «adaptación caso por caso y avance gradual». Once años y siete meses después, un desarrollador taiwanés que trabajaba en Tokio subió a GitHub el repositorio llamado REVIT_MCP_study, obteniendo más de setenta estrellas y más de ochenta bifurcaciones (forks). Durante esos doce años, la industria de la construcción en Taiwán recorrió un largo camino desde los planos dibujados a mano hasta los modelos 3D, desde los intentos individuales hasta las normas nacionales, y desde la actualización de herramientas hasta la redefinición de las profesiones.'
date: 2026-05-22
category: 'Technology'
tags:
  [
    'Tecnología',
    'BIM',
    'Modelado de Información de Construcción',
    'Tecnología de la Construcción',
    'Arquitectura',
    'Transformación Digital',
    'Revit',
    'MCP',
    'IA',
    'Chungching Engineering',
    'Taiwan Engineering Consulting',
    'Shuoto',
  ]
subcategory: '建築科技'
author: 'Taiwan.md'
featured: true
lastVerified: 2026-05-22
lastHumanReview: false
readingTime: 22
researchReport: 'reports/research/2026-05/台灣BIM與營建科技.md'
image: '/article-images/technology/freecad-bim-example-2024.webp'
imageCredit: 'Maxwxyz via Wikimedia Commons'
imageLicense: 'CC BY 4.0'
imageSource: 'https://commons.wikimedia.org/wiki/File:FreeCAD_1.0_Dark_BIM_Example.png'
curation: 'incubating'
curationReason: 'unverified'
translatedFrom: 'Technology/台灣BIM與營建科技.md'
sourceCommitSha: 'b1a5fea0'
sourceContentHash: 'sha256:85f9d09627902abf'
sourceBodyHash: 'sha256:c4a7f62bbc68876d'
translatedAt: '2026-09-10T08:31:51.904411+00:00'
---

# El BIM y la tecnología de la construcción en Taiwán: La adaptación caso por caso impulsada por el gobierno durante doce años, reescrita por un protocolo de dieciocho meses

![Captura de pantalla del tema oscuro de FreeCAD 1.0, una plataforma BIM de código abierto; en el centro de la pantalla se muestra un modelo 3D de un edificio de demostración, el panel izquierdo enumera las capas profesionales (estructura, MEP, envolvente), y la barra de herramientas inferior muestra el conjunto de comandos exclusivo del BIM workbench, reflejando la esencia de la transformación digital de la ingeniería del BIM al sistematizar la información del edificio](/article-images/technology/freecad-bim-example-2024.webp)
_Ejemplo de demostración del BIM workbench en el tema oscuro de FreeCAD 1.0. Foto: Maxwxyz, 07-10-2024. [Licencia vía Wikimedia Commons](https://commons.wikimedia.org/wiki/File:FreeCAD_1.0_Dark_BIM_Example.png)._

> **Resumen en 30 segundos:** El 23 de mayo de 2014, la Comisión de Obras Públicas del Ejecutivo Yuan de la República de China instaló la «Plataforma de Promoción del Uso de BIM en Obras Públicas»[^1], implementándola en tres fases bajo el principio de «adaptación caso por caso y progreso gradual», sin llegar a ser obligatoria hasta la fecha[^2]. En el mismo período, el Centro de Investigación BIM de la Universidad Nacional de Taiwán impartió su primera clase, la Asociación de Modelado de Información de Construcción de Taiwán fue registrada oficialmente[^3], el gobierno municipal de Nuevas Taipéi emitió la primera licencia de construcción BIM, el Bureau de Desarrollo Urbano de Taipéi publicó las especificaciones operativas para los modelos de obra terminada[^4], y BSI firmó el memorándum de entendimiento (MOU) del Taiwan BIM Task Group[^5]. Once años y siete meses después, el 10 de diciembre de 2025, un desarrollador llamado CHIANG SHUOTAO subió a GitHub el repositorio `REVIT_MCP_study`, obteniendo setenta y tres estrellas y ochenta y cinco forks[^6]. Cuatro meses después, en abril de 2026, Autodesk anunció que Revit 2027 incluiría nativamente un servidor Model Context Protocol[^7]. Entre los doce años en los que el gobierno no pudo imponer cambios y el protocolo de dieciocho meses de Anthropic, se encuentra la lenta redefinición profesional de la industria de la construcción en Taiwán, desde el dibujo técnico hasta la integración de sistemas.

---

## La «Adaptación según el caso» de la Comisión de Obras Públicas

El 23 de mayo de 2014, la Comisión de Obras Públicas del Ejecutivo Yuan de la República de China creó una plataforma denominada «Plataforma de Promoción del Uso de Modelado de Información de Construcción (BIM) en Obras Públicas»[^1]. Los ocho caracteres que la inauguraron fueron «**Adaptación según el caso, progreso paso a paso**».

Estos ocho caracteres han sido citados durante muchos años.

La Comisión de Obras Públicas dividió la estrategia de promoción en tres fases: la primera fase (año 103 del calendario de la República de China, equivalente a 2014) «Incentivos y proyectos piloto seleccionados», invitando a las agencias principales de proyectos de ingeniería no arquitectónicos a participar como casos piloto, priorizando los contratos de diseño y construcción (EPC) basados en la oferta más ventajosa; la segunda fase (años 104-105, equivalentes a 2015-2016) «Ejecución y evaluación de los proyectos piloto»; y la tercera fase «**Promoción del uso de la tecnología BIM en obras públicas con un valor superior a una cierta cantidad a partir del año 106 (2017)**»[^1].

Sin embargo, el umbral de «cierta cantidad» nunca se convirtió en una obligación total hasta 2026. La Comisión de Obras Públicas ha insistido repetidamente en la siguiente redacción: «**Las agencias principales de ingeniería evaluarán por su cuenta, según las necesidades del caso y la capacidad de gestión del cumplimiento del contrato de la agencia, si adoptan la tecnología BIM, en lugar de una disposición general y obligatoria**»[^2].

El grupo de control es Hong Kong. El Departamento de Desarrollo de Hong Kong ya ha impuesto obligatoriamente el uso de BIM en proyectos de ingeniería con un valor estimado superior a 30 millones de dólares de Hong Kong[^8]. En Taiwán, los verbos «incentivar», «probar piloto» y «evaluar por cuenta propia» aparecen alternadamente en cada libro blanco.

Según los datos públicos disponibles hasta la fecha de búsqueda, la plataforma BIM de la Comisión de Obras Públicas ha acumulado «más de 60 agencias de licitación de ingeniería que utilizan la tecnología BIM, con más de 120 proyectos aplicados»[^2]. Esta cifra, en el contexto de las más de 10.000 obras públicas anuales en Taiwán, ni siquiera representa una fracción mínima.

> **📝 Nota del curador**
> La narrativa común es «el gobierno no logra impulsar el BIM porque la industria no puede seguirle el ritmo». Esta explicación es narrativa y conveniente, pero invierte la causalidad. **La secuencia real es más bien: el gobierno decidió desde 2014 no obligar el uso de BIM, porque obligarlo equivaldría a arruinar el sustento de la mitad de los despachos de arquitectura**. La «adaptación según el caso» es un cálculo político: dejar la elección en manos de la minoría de agencias «con capacidad de gestión del cumplimiento del contrato», mientras el resto continúa usando AutoCAD, sin que nadie moleste al otro.

---

## El Ministerio del Interior, Taipéi y Nuevas Taipéi: tres ejes de promoción no sincronizados

La Comisión de Obras Públicas del Ejecutivo Yuan impulsa su propia agenda, mientras que el Instituto de Investigación de Construcción del Ministerio del Interior promueve la suya.

El ABRI (Instituto de Investigación de Construcción del Ministerio del Interior) lanzó en el año 104 del calendario de la República de China (2015) el **Plan de Investigación, Promoción y Aplicación de la Integración, Compartición y Desarrollo de la Información de la Construcción** como un proyecto de caso a mediano plazo de 4 años, y en el año 108 (2019) dio paso a su segundo plan de 4 años[^9]. Los dos grandes objetivos del segundo plan están planteados con gran ambición: «**Actualización Digital de la Tecnología de la Construcción**» + «**Entorno de Vivienda Digital**», donde el segundo busca integrar el BIM con el GIS y el IoT para crear una ciudad digital[^10].

Sin embargo, el ABRI no es el órgano ejecutivo de la gestión de la construcción. La gestión de la construcción recae en los gobiernos de los condados y ciudades.

En 2014, el **Gobierno Municipal de Nuevas Taipéi emitió la primera licencia de construcción aprobada mediante un modelo BIM**[^11]. Ese mismo año, Nuevas Taipéi publicó las «**Normas de Entrega de Información de Modelos BIM de Obra Terminada para Edificios Públicos de Nuevas Taipéi**». Para 2026, el «Sistema de Verificación Asistida por Computadora de Licencias de Construcción» del gobierno de Nuevas Taipéi (bim.ntpc.gov.tw) ya había acumulado más de 20 modelos BIM completados[^11].

Cuatro años después, el 6 de noviembre de 2018, la **Oficina de Desarrollo Urbano del Gobierno Municipal de Taipéi publicó las «Normas Operativas de Datos de Atributos de Modelos BIM de Obra Terminada para Proyectos de Ingeniería de la Construcción Patrocinados por la Oficina de Desarrollo Urbano del Gobierno Municipal de Taipéi»**[^4]. Las normas de Taipéi se basan en el formato internacional COBie (Construction Operations Building Information Exchange) e incorporan las normas relevantes del año 104 del Instituto de Investigación de Construcción del Ministerio del Interior y las de Reino Unido[^4]. Las normas exigen que, al utilizar diferentes softwares de modelado BIM, se deban entregar los datos en formato **IFC** (Industry Foundation Classes, Clases de Fundación de la Industria, un estándar internacional abierto establecido por buildingSMART International, ISO 16739-1:2024) y en el estándar COBie[^4][^12].

> **💡 ¿Sabías que...**
> El IFC es un estándar internacional abierto establecido por una organización sin fines de lucro llamada buildingSMART International[^12], y no tiene relación con Autodesk ni con ningún fabricante específico. Su lógica de existencia es similar a la del PDF: permite que los modelos creados por diferentes software (Revit, ArchiCAD, Tekla, Navisworks) se intercambien sin problemas. **Desde 2010, el gobierno de Dinamarca ha impuesto el uso del formato IFC en proyectos de infraestructura pública, y Noruega, Finlandia y Singapur les han seguido el ejemplo**[^12]. Taiwán solo incorporó el IFC en sus normas en 2018, a nivel local por parte del Gobierno Municipal de Taipéi. Los estándares internacionales llevan diez años avanzando, y Taiwán va poco a poco poniéndose al día.

Los puntos de inicio de la promoción de los tres ejes —el gobierno central, Taipéi y Nuevas Taipéi— no están sincronizados. En una misma estación de metro, es posible que en la fase de diseño se utilicen las normas BIM del Bureau de Ingeniería del Metro de Taipéi (vinculadas al contrato de llave en mano), en la fase de licencia de construcción se apliquen las normas operativas de modelos BIM de obra terminada de la Oficina de Desarrollo Urbano de Taipéi (formato COBie), y en la fase de mantenimiento y operación se caiga en otra herramienta de _facility management_.

«**Actualmente, la mayoría de las aplicaciones del sector público del BIM pertenecen a las fases de diseño y construcción; también existen diferencias en la aplicación entre la ingeniería de estilo tradicional y la de estilo de contrato integral (llave en mano), y el modelo de gestión posterior de la operación aún adopta prácticas tradicionales**»[^13]: esto es lo que escribe el propio informe de resultados del ABRI.

---

## Línea Wanda, estación Miaoli, T3 del Aeropuerto de Taoyuan: la llegada de la BIM a la obra pública

En 2011, **la Línea Wanda del Metro de Taipéi incluyó por primera vez la BIM en el contrato de diseño de ingeniería**[^14].

Este es uno de los eventos «primero» más citados en la promoción de la BIM en Taiwán. Según los requisitos contractuales, cada sección de la Línea Wanda adoptó el modelo BIM para el diseño de las estaciones del metro, integrando simultáneamente las especialidades de arquitectura, estructura e instalaciones electromecánicas, logrando una integración interdisciplinaria que **redujo los conflictos en las interfaces de diseño**[^14].

Siguiendo el ejemplo de la Línea Wanda, los proyectos de obra pública comenzaron a llegar uno tras otro. La estación elevada Y19 de la Línea Circular del Metro de Taipéi, varios centros deportivos de Nuevas Taipéi, la nueva estación de Miaoli del [Tren de Alta Velocidad de Taiwán](/es/lifestyle/taiwan-high-speed-rail/), el tercer hangar del [Aeropuerto de Taoyuan](/es/lifestyle/taoyuan-airport/), el tren ligero circular de Kaohsiung: en cada caso existe un estudio de caso publicado en las revistas internas de ABRI, del Centro de Investigación BIM de la Universidad Nacional de Taiwán (NTU) o de la Oficina del Metro.

El «**victoria de los números**» más citada es la estación de Miaoli del Tren de Alta Velocidad de Taiwán: al implementar la BIM tres meses antes del inicio de la obra, el equipo de supervisión identificó múltiples puntos de conflicto en el modelo 3D, **ahorrando el 20 % de los costos posteriores de cambios de diseño y adelantando en dos meses el inicio de las obras respecto al cronograma previsto**[^15].

El tercer hangar del Aeropuerto de Taoyuan es otro caso con una escala diferente. En marzo de 2019, **el consorcio formado por Samsung C&T y el equipo de ingeniería Wing Hang ganó la licitación para la obra civil del hangar principal T3 por un monto de NT$ 44 500 millones**[^16]. Todo el T3 fue diseñado bajo la dirección de Taiwan Engineering Consulting Co., Ltd. (junto con Rogers Stirk Harbour + Partners y Ove Arup and Partners Hong Kong); la colaboración transnacional dependía del flujo de modelos BIM entre diferentes despachos: este es el caso emblemático que se repite constantemente en el material de formación interna de Taiwan Engineering Consulting[^17].

> **✦** El momento en que la Línea Wanda incluyó por primera vez la BIM en el contrato en 2011 fue un punto de inflexión silencioso en la historia de la obra pública en Taiwán. Desde ese día, ningún proyecto público importante —metro, aeropuerto, tren de alta velocidad o tren ligero— ha dejado de preguntarse «cómo implementar la BIM».

Pero estos son solo «casos emblemáticos». Todos los casos emblemáticos en Taiwán comparten una única desventaja común: **son la minoría**.

---

## Cinco grandes consultoras de ingeniería + dos organizaciones: las personas detrás

Quienes impulsaron el BIM en la ingeniería pública tienen nombre y rostro.

**Taiwan Engineering Consulting Co., Ltd.**: Se constituyó en 2007 como inversión filial del Fung Kuang Engineering Consultants, Inc. (CECI, fundado en 1969)[^18]. **En 2010, estableció pioneramente el Centro de Integración BIM**[^19], siendo uno de los primeros centros de integración de la industria taiwanesa. De sus casi 2.000 colaboradores, el 90 % cuenta con formación en ingeniería vial, ferroviaria, portuaria, aeroportuaria, puentes, estructuras, túneles, metro, arquitectura, mecánica, electricidad y control de sistemas, BIM, ITS (Sistemas Inteligentes de Transporte) o PPP[^19].

**Chung Hsin Engineering Consultants, Inc.**: Fundada en 1970, tras su transformación en una NPO en 1994, invirtió en la constitución de Chung Hsin Engineering Consultants, Inc. como sociedad anónima[^20]. Más tarde, Chung Hsin desarrolló el BIM bajo la denominación de **Sistema de Información de Gestión de Proyectos (PMIS)**: basado en el espíritu del Entorno Común de Datos (CDE) de la norma ISO 19650, integra siete módulos principales que facilitan la integración de información interdisciplinaria e interproyectos[^21].

**Evergreen Consulting Engineering Co., Ltd. (EGC)**: Fundada en 1974. El diseño estructural del Taipei 101 y del T&C Tower de 85 pisos en Kaohsiung fueron realizados por esta firma[^22]. **El CTBUH (Consejo de Edificios Altos y Hábitat Urbano) clasifica a EGC como una de las diez principales consultoras de estructuras de rascacielos del mundo**[^22].

En el ámbito académico, existen dos hitos clave:

**Centro de Investigación NTU sobre Simulación y Gestión de Información en Ingeniería Civil (NTUBIM)**: Fundado en 2011, su director es el profesor **Shang-Hsien Hsieh** del Departamento de Ingeniería Civil. El co-fundador, el profesor asistente **Chung-Chin Kuo**, escribió en diciembre de 2011 el artículo «**El desarrollo del BIM impacta el sistema arquitectónico vigente**»[^23], el cual se ha convertido hasta hoy en uno de los textos fundacionales e indicadores del discurso académico sobre el BIM en Taiwán. NTUBIM ha asumido posteriormente los encargos de la ABRI y de la Comisión de Ingeniería Pública, liderando la guía de trabajo colaborativo BIM de Taiwán y la traducción al chino de la ISO 19650.

**Asociación de Modelado de Información de Construcción de Taiwán (TBIMA)**: Su antecedente fue el encuentro de entusiastas de la tecnología BIM en Taiwán en 2009; comenzó a prepararse en 2011 y se constituyó oficialmente el **10 de marzo de 2012** como una asociación registrada ante el Ministerio de Asuntos Internos[^3]. Los miembros principales de la asociación provienen de los instructores formados por la sede de Autodesk Taiwan en 2008: el linaje de las organizaciones civiles taiwanesas de BIM surgió directamente del círculo de instructores certificados por Autodesk.

> **📝 Nota de curaduría**
> En la ceremonia de firma del MOU del 3 de octubre de 2018 del Taiwan BIM Task Group[^5], en la mesa se sentaron cinco rostros: BSI (British Standards Institution) Taiwán, NTUBIM de la Universidad Nacional de Taiwán, el Instituto de Investigación de la Construcción de Taiwán, el Centro de Construcción de Taiwán y TBIMA. **El Instituto de Investigación de la Construcción del Ministerio de Asuntos Internos actuó como «unidad de orientación» y no como «unidad signataria»**; esta disposición jerárquica resulta reveladora. Significa que el gobierno reconoce que, en materia de estándares internacionales de BIM, es preferible que la academia y las organizaciones civiles lideren, mientras el Estado se retira a un segundo plano. Al año siguiente, la publicación por parte de BSI de la **versión china de la ISO 19650**[^24] constituyó una sutil declaración de soberanía blanda: Taiwán finalmente contó con su propia traducción oficial en chino de los estándares internacionales de BIM.

---

## Revit, ArchiCAD, Tekla: las corrientes subterráneas del hegemonismo del software

![Captura de pantalla de la interfaz de Autodesk Revit 2024, que muestra la presentación en objetos de una pared divisoria simple junto con puertas y ventanas en el espacio tridimensional; el panel de atributos de los componentes está a la izquierda y la vista previa sincronizada en tiempo real de las vistas en planta, alzado y sección se encuentra en la parte inferior derecha, reflejando la naturaleza del modelado orientado a objetos del software BIM](/article-images/technology/autodesk-revit-2024-bim-objects.webp)
_Demostración de componentes BIM de Autodesk Revit 2024. Foto: DanielDefault, 2024. [Licencia vía Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Revit_2024.png)._

Al entrar en cualquier estudio en Taiwán que haya adoptado el BIM, el 90 % de las pantallas de inicio muestran Revit.

«**En Taiwán, el 90 % de los arquitectos (con capacidad de diseño BIM) utilizan Revit Architecture**», afirma una cifra publicada en el sitio web de un distribuidor de ArchiCAD[^25]. Aunque se trata de una cita de una única fuente, coincide con la percepción de la industria: Revit domina casi en exclusiva el campo del diseño arquitectónico en Taiwán.

ArchiCAD, desarrollado por la empresa húngara Graphisoft, funciona en Mac y Windows. Ofrece una intuición de diseño y una curva de aprendizaje más amigables que las de Revit, pero cuenta con un número de usuarios significativamente menor en Taiwán[^26]. La distribuidora Long Ting Information ha organizado numerosas sesiones de demostración en el este de Taipéi, donde siempre se escucha a los diseñadores decir: «Sé usar Revit, en el estudio solo tenemos licencias de Revit». Esto es el bloqueo causado por los efectos de escala.

En el ámbito de la estructura de acero, existe otro eje diferente. **Tekla Structures (producto de la empresa Trimble, cuyo predecesor fue XSteel) es actualmente el software predominante para el diseño de estructuras de acero en Taiwán**[^27]. La capacidad de Tekla para gestionar estructuras de acero es reconocida por la industria en los campos de los rascacielos, puentes, estadios y fábricas de Taiwán.

En el sector de la infraestructura (ferrocarriles, carreteras, túneles), las soluciones se orientan hacia el sistema MicroStation de Bentley Systems[^28]. Empresas como CTCI, Chung Hsin Engineering Consultants y Taiwan Consulting Engineer & Architect, Inc. utilizan MicroStation junto con OpenRoads / OpenBridge de Bentley en grandes proyectos EPC integrales y en proyectos ferroviarios transnacionales.

Sobre estas plataformas de software predominante se ejecutan Dynamo (programación visual) de propiedad de Autodesk y pyRevit (marco de extensión de Python) de código abierto. **A principios de 2016, Autodesk Taiwán invitó específicamente a los instructores del equipo de desarrollo de Dynamo desde Singapur a impartir cursos en Taiwán**[^29]. Desde entonces, Dynamo ha captado la atención en el círculo de ingenieros BIM de Taiwán. Un escenario típico es el siguiente: un ingeniero de instalaciones (MEP) escribe un script de Dynamo que ordena automáticamente las coordenadas de todos los conductos de ventilación, verifica la altura libre y genera secciones: lo que antes, con CAD, requería un día entero, ahora se resuelve en unos pocos minutos[^30].

El escenario de la detección de conflictos (clash detection) corresponde a Autodesk Navisworks. Navisworks Manage integra la navegación 3D, la detección de conflictos, la exportación de informes, la simulación 4D de cronogramas y la funcionalidad de valoración 5D[^31]. En la ingeniería MEP del metro de Taiwán existe un término específico llamado **CSD / SEM**: CSD (Combined Service Drawing) se refiere a los planos integrales de instalaciones, mientras que SEM (Structure / Electric / Mechanic) corresponde a los planos integrados de estructura e instalaciones. El método tradicional consistía en superponer planos con CAD y verificarlos en papel; en la era del BIM, se utiliza Navisworks para realizar pruebas de colisión, buscando los puntos de conflicto desde una perspectiva 3D[^32].

La frase «**Integración de planos CSD/SEM**» es ahora un servicio obligatorio que aparece en los sitios web de las consultoras BIM de Taiwán.

---

## CTCI, Huzhu, Daxin y Obayashi: ¿quién construye en Taiwán?

![Imagen de la calle en el sitio de construcción del Gran Estadio de Taipéi el 21 de junio de 2020 por la mañana; al fondo, la estructura de acero y la cubierta de chapa del Gran Estadio aún están en proceso de montaje; al primer plano, un camión Hino 300 cruza el paso de peatones cerca de la salida 5 de la estación de metro del Memorial Sun Yat-sen en la Avenida Zhongxiao, reflejando la realidad de una construcción que ha durado más de diez años para el estadio deportivo más grande de Taipéi y el papel de gestión de la obra de Obayashi en la construcción de este estadio gigante de 65.000 toneladas con forma de huevo y tubos de acero circulares](/article-images/technology/taipei-dome-construction-cheng-2020.webp)
_Sitio de construcción del Gran Estadio de Taipéi, 2020-08-16, salida 5 de la estación Memorial Sun Yat-sen en la Avenida Zhongxiao. Foto: Cheng-en Cheng, 2020-08-16. [Licencia vía Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Taipei_Dome_and_Hino_300_BEM-5593_%2850281669428%29.jpg).\_

El pilar que sostiene el mercado de la construcción de gran escala en Taiwán es un conjunto de empresas de ingeniería integral (llave en mano): adoptaron el BIM antes que los despachos de arquitectura y lo utilizaron como una herramienta de producción desde el principio.

El primero en la lista es **CTCI Engineering, Consulting, Inc. (CTCI, código bursátil 9933)**. CTCI fue fundada en 1979 mediante la inversión conjunta del Instituto Chino de Servicios Técnicos (una fundación), el Banco Industrial de Desarrollo de China y la Compañía de Inversión Central[^33]. Este contexto de fundación es muy especial: el Instituto Chino de Servicios Técnicos (Fundación China de Servicios Técnicos) se estableció en 1959 como una institución de transferencia de tecnología al servicio del desarrollo industrial de Taiwán; en la década de 1970, durante el auge de la industria petroquímica, asumió gran parte de las labores de consultoría técnica de empresas estatales como la Compañía de Petróleo de Taiwán (CPC). En 1979, el Instituto Chino de Servicios Técnicos escindió sus servicios de consultoría de ingeniería, dando lugar a CTCI.

El negocio de CTCI es el **EPC** (Ingeniería, Adquisición y Construcción, una solución integral llave en mano de diseño de ingeniería, compra y construcción): refinería, petroquímica, química, energía, acero, almacenamiento y transporte, transporte, incineradoras, infraestructura pública e ingeniería ambiental[^33]. Hasta 2021 contaba con 7.500 empleados y había establecido sucursales u oficinas en 15 países[^33][^34]. Los proyectos Amine en Arabia Saudita, la ingeniería integral de los hornos de craqueo de etileno Saudi Kayan y los proyectos integrales SAMAC MMA and PMMA: estos nombres trazan la huella de Medio Oriente de los proveedores de EPC de Taiwán en los últimos 20 años[^33].

En 2011 ocurrió un hecho que reescribió la estructura accionaria de CECI: **la empresa japonesa Chiyoda Corporation adquirió acciones de CECI, convirtiéndose en el mayor accionista**[^33]. Se trata de la empresa local de ingeniería EPC (Encargo Llave en Mano) más grande de Taiwán, cuyo mayor accionista actual es un grupo japonés de construcción química. Este dato curioso es desconocido para la mayoría.

> **⚠️ Perspectiva controvertida**
> Los proyectos de ingeniería en el extranjero de grandes empresas EPC como CECI no están exentos de controversias. En 2017, el proyecto EPC de una planta de procesamiento de gas natural de CECI en la India sufrió importantes retrasos y deudas incobrables, y el grupo reconoció la existencia de una **«brecha fatal en el control de riesgos internacionales»**[^35]. Ese mismo año, tras la cancelación del proyecto de Petroquímicos Guoguang y la continua fermentación de las controversias sobre la salud de los residentes de Liuzao (Seis Luces), varios proyectos petroquímicos en los que participó CECI fueron señalados en las narrativas ambientales. Aunque el BIM ayudó en la precisión de la ingeniería de estos grandes proyectos, la precisión técnica no resuelve los problemas políticos relacionados con la tierra, la mano de obra y el medio ambiente.

En el mercado de constructores privados existe otro grupo de nombres: **Huzhu Construction Co., Ltd.**, que ha «acumulado la mayor superficie total de planta de fábrica de alta tecnología completada en el país»[^36]; **Daxin Engineering (2535)** es considerada por el público como «la constructora de confianza de TSMC», habiendo obtenido el contrato para la estructura superior de la planta FAB 18P3 de TSMC en el Parque Industrial de Nuevos Taipéi (Nangang) en el sur de Taiwán[^37]. El departamento de BIM de Daxin indica en sus presentaciones internas: «**utilizar el BIM como plataforma de herramientas base para llevar a cabo el desarrollo, planificación, diseño, construcción y la integración y coordinación relacionadas de los proyectos arquitectónicos**»[^37]; sin embargo, esto representa solo una pequeña parte de los contratos asumidos por Daxin.

Las empresas extranjeras tienen dos presencias estructurales en Taiwán. **Obayashi Corporation Taiwan (Taiwan Obayashi)** es una sucursal establecida por la empresa japonesa Obayashi Corporation (la misma que construyó la Torre Tokyo Skytree) en 1989, habiendo construido el Taipei 101 en su totalidad, la Línea Xinyi del Metro de Taipéi, el T3 del Aeropuerto de Taoyuan y el **Taipei Dome**, entre otros[^38]. La página de «Resumen de la Empresa» en el **sitio web oficial de la sucursal taiwanesa de Obayashi lista explícitamente la «Gestión de planos de construcción y uso del BIM» como uno de los principales ítems de gestión de obra**[^38].

> **💡 ¿Sabías que?**
> El peso total de la estructura de acero del Taipei Dome es de 65.000 toneladas, siendo el único estadio en el mundo cuya cúpula completa está construida con tubos de acero circulares[^39]. El diseño de la estructura de acero se realiza generalmente en Tekla Structures, y luego el modelo se importa a Navisworks para realizar detección de conflictos con otras especialidades (MEP, contra incendios). **Sin el BIM, sería casi imposible completar proyectos de estructura de acero de la magnitud del Taipei Dome sin cometer errores graves** — y esa es la razón por la que Obayashi incluye el BIM en la lista de «principales ítems de gestión de obra» en el resumen de su empresa.

---

## Escasez de mano de obra, envejecimiento y trabajadores migrantes: por qué la transformación digital es indispensable

Llevemos la escena a la mañana de un sitio de construcción común: a las seis y media, los trabajadores van llegando poco a poco. Más de la mitad son maestros de obra de la «generación abuelo», mayores de 40 años.

**Las estadísticas de muertes por accidentes laborales del Gobierno Municipal de Nuevas Taipéi muestran que, entre más de 100 casos mortales, más del 77 % tienen más de 40 años**[^40]. Este número ya es de conocimiento común en el círculo de ingenieros civiles. El envejecimiento de la fuerza laboral en la industria de la construcción de Taiwán es una realidad, no una tendencia en proceso.

La baja natalidad hace que los jóvenes no ingresen a la industria de la construcción. Las condiciones difíciles en los sitios de obra, salarios poco competitivos y altas tasas de lesiones y muertes: estos tres factores combinados hacen que la presión por contratar personal en la industria de la construcción sea cada vez mayor[^40]. En 2024, el Ministerio de Trabajo autorizó la apertura de cupos para 15 000 trabajadores migrantes en la industria de la construcción; a principios de 2026, ya se encuentra «**casi agotado**»[^41].

Por eso la transformación digital se ha convertido en algo indispensable para la industria de la construcción.

**La demanda de puestos de ingenieros BIM es alta; el salario inicial para principiantes oscila entre 35 000 y 45 000 yuanes, y hay 104 ofertas de empleo con salarios mensuales superiores a 50 000 yuanes en el banco de empleo 1111**[^42]. Pero «alta demanda» y «capacidad de uso» son dos cosas distintas: «**aprender BIM no necesariamente genera un crecimiento salarial significativo, y la mayoría de las personas eligen rutas de aprendizaje más económicas**»[^43]. Aún no hay consenso en la industria sobre cuál es el techo profesional de los ingenieros BIM.

El problema estructural más profundo radica en que el BIM eleva al arquitecto de la categoría profesional de «**dibujante**» a la nueva categoría de «**integrador de sistemas**». La actualización de herramientas es solo la superficie.

El arquitecto que dibuja con AutoCAD traza un conjunto de líneas bidimensionales. Dibuja plantas, alzados y secciones: cada plano es independiente, y es habitual modificar la planta y olvidar modificar el alzado. El ingeniero que utiliza Revit / BIM construye un modelo de información: detrás de cada línea hay vinculados materiales, especificaciones, proveedores, precios, secuencias de construcción y ciclos de mantenimiento[^44]. Al modificar la planta, el alzado y las secciones se sincronizan automáticamente.

El arquitecto veterano observa al joven ingeniero BIM y dice «esto es cosa de la nueva generación»; la razón real detrás de esta afirmación es sencilla: **esa profesión ya pertenece a un oficio diferente al de «arquitecto» cuando ellos ingresaron a la industria**.

> **✦** «Los modelos BIM a menudo se convierten en trabajo subcontratado, desconectándose de la ingeniería real, y muchos centros o equipos BIM se disuelven»[^45]: esta es la observación que el propio Centro de Investigación BIM de la Universidad Nacional de Taiwán hace sobre la situación actual de la promoción del BIM en Taiwán.

---

## El protocolo como USB-C: la llave con la que Anthropic conecta la IA a Revit

El 25 de noviembre de 2024, Anthropic abrió el código fuente de **Model Context Protocol (MCP)**[^46].

El texto original del anuncio era muy técnico: «**MCP is an open standard, open-source framework introduced by Anthropic to standardize the way artificial intelligence (AI) systems like large language models (LLMs) integrate and share data with external tools, systems, and data sources**»[^47]. La explicación de Anthropic era más coloquial: «**Think of MCP like a USB-C port for AI applications**»[^46]: al igual que USB-C unificó la conexión de dispositivos, MCP pretende unificar el protocolo de conexión entre la IA, las fuentes de datos y las herramientas.

Junto con el anuncio de MCP, se lanzaron los SDKs en Python, TypeScript, C# y Java, además de servidores MCP preconfigurados para conectar con Google Drive, Slack, GitHub, Git, Postgres y Puppeteer[^46].

Lo que siguió, nadie lo había previsto en cuanto a velocidad.

El 10 de diciembre de 2025, un desarrollador llamado **CHIANG SHUOTAO** subió a GitHub el repositorio `REVIT_MCP_study`[^48]. La descripción del repositorio tenía solo ocho palabras en inglés: «LEARN HOW TO BUILD UP YOUR REVIT MCP». La distribución de lenguajes era: **C# 54.2 %, JavaScript 18.7 %, PowerShell 14.3 %, TypeScript 7.0 %, HTML 3.3 %, Shell 1.2 %**[^48]. Para mayo de 2026, este repositorio personal había acumulado **73 estrellas y 85 forks**[^6].

En la página personal de GitHub de Shuotao, la ubicación aparece como «Tokyo», pero el README y todos los documentos de enseñanza están en chino tradicional, y el contenido hace referencia extensamente al flujo de trabajo de la industria de la construcción en Taiwán. Sus repositorios periféricos: `CAD_MCP_study`, `NAVISWORK_MCP`, `IFCSH` —forman una serie de experimentos de código abierto personales sobre BIM × MCP × IA[^49].

¿Cómo se interpreta este caso?

No se trata de que «Taiwán tenga su propio BIM_MCP»: el repositorio de Shuotao y el `mcp-servers-for-revit/revit-mcp` internacional, así como el servidor MCP integrado nativo de Revit 2027 de Autodesk[^7][^50], son parte del mismo ecosistema. Su significado radica en que: **un desarrollador de Taiwán, en menos de 13 meses después del anuncio de MCP por parte de Anthropic, creó un proyecto de enseñanza de código abierto con más de setenta estrellas, integrando la práctica de ingeniería de Revit MCP a nivel internacional en la comunidad de habla china**.

Cuatro meses después, **en abril de 2026, Autodesk anunció el servidor MCP integrado nativo en Revit 2027 y Autodesk Assistant**[^7]. El nuevo Autodesk Assistant puede hacer cosas como: «**Encontrar todas las habitaciones que carecen de etiquetas de instalaciones electromecánicas**», «**Establecer el nivel de resistencia al fuego de todas las puertas de la Fase 2 en 90 minutos**», «**Generar todas las vistas de fontanería y saneamiento de este piso**»[^7]: operar Revit mediante lenguaje natural.

Antes, se tardaba uno o dos años en aprender a hacer esto en Revit; ahora, basta con decirlo en chino (o en inglés).

> **📝 Nota del curador**
>
> Alineando la línea temporal: el 23 de mayo de 2014 se inauguró la plataforma BIM del Bureau de Ingeniería (Engineering Commission), y el 25 de noviembre de 2024 Anthropic abrió el código fuente de MCP; **han pasado 10 años y 6 meses**. Durante estos 10 años en que el gobierno de Taiwán promovió BIM, se pasó de «alentar la experimentación» a «adaptar según el caso», sin llegar nunca a la obligatoriedad. Desde que Anthropic abrió el código fuente de MCP hasta el anuncio de la integración nativa de MCP en Autodesk Revit 2027, **solo han pasado 17 meses**. La velocidad con la que la plataforma tecnológica reescribe la velocidad de incorporación (onboarding) de la industria es mucho mayor que la velocidad de la promoción política. **La verdadera brecha está en la estructura de los dos modelos de impulso**: la promoción obligatoria requiere coordinar a cientos de partes interesadas, equilibrar decenas de lobbies industriales y ajustar varias leyes; la promoción basada en plataformas solo requiere abrir el código fuente del SDK y escribir bien la documentación. Entender claramente esta estructura es más importante que quejarse del gobierno o adorar a la IA.

---

## De los planos a la integración de sistemas: una redefinición profesional inconclusa

Llevemos la cámara hacia atrás, a los estudios de arquitectura de la década de 1990.

En aquella época, las paredes de los estudios colgaban mesas de dibujo, reglas en T, plumillas y reprografadoras (máquinas de planitos azules). Los arquitectos dibujaban los planos en hojas grandes tamaño A1 utilizando plumillas; al terminar un plano, debían enviarlo a la reprografadora para obtener copias: la máquina zumbaba y, poco a poco, los planos con fondo azul y líneas blancas salían rodando por el otro extremo de la máquina. Si se debía modificar un solo detalle, había que volver a dibujar todo el plano.

AutoCAD lanzó su versión para Classic Mac OS en 1992 y su versión para Microsoft Windows en 1993[^51]. A partir de mediados de la década de 1990, los estudios de arquitectura en Taiwán comenzaron a adoptar masivamente el CAD. El dolor de la transformación duró aproximadamente una década: los arquitectos mayores se resistían, mientras que los diseñadores jóvenes lo abrazaban, dividiendo a los estudios en dos facciones: «los que dibujan en CAD» y «los que dibujan en la mesa».

De AutoCAD a Revit representa una segunda transformación. **Autodesk no presentó Revit junto con el término «Building Information Modeling» (Modelado de Información de Construcción) hasta 2002**[^52]. Es decir, pasaron aproximadamente veinte años entre el paso del dibujo a mano al CAD y del CAD al BIM. Sin embargo, el dolor de la transformación del BIM fue más profundo que el del CAD, porque esta vez el nivel exigido pasó del simple cambio de herramienta a una **reorganización del modelo mental**.

El CAD digitaliza tus líneas. El BIM exige que sistematices la información de todo el edificio. Una pared se convierte en un objeto de datos como este: «Muro divisorio del espacio de oficinas de la Zona A del segundo piso, material: placa de yeso de doble cara de 12 mm con estructura de acero ligero de 75 mm, resistencia al fuego de 1 hora, fabricante XX, costo YY, orden de construcción posterior a las tuberías de instalaciones electromecánicas», dejando de ser simplemente dos líneas paralelas.

La integración interdisciplinaria también cambió. El flujo tradicional consistía en que el arquitecto dibujara los planos, el ingeniero estructural dibujara los planos y el ingeniero de instalaciones electromecánicas dibujara los planos; al superponer los planos en el sitio de construcción, se descubrían conflictos: una tubería de ventilación atravesaba una viga, la posición de un tubo de drenaje chocaba con una columna estructural. El flujo de trabajo del BIM realiza la superposición de planos en un mismo modelo tridimensional durante la fase de diseño, completando las verificaciones de colisiones y la revisión de conflictos en la computadora[^32].

«**Reducir los conflictos en las interfaces de diseño**» son las seis palabras que aparecen en los informes de resultados de todos los estudios de casos de BIM en Taiwán[^14][^15]. Pero el cambio profesional subyacente a estas seis palabras es que la estructura de poder entre arquitectos, ingenieros estructurales, ingenieros de instalaciones electromecánicas y contratistas se está reordenando. **En el pasado, el arquitecto era el único autor en la fase de diseño; en la era del BIM, el diseño es una integración de sistemas de colaboración multifacética**.

Esta redefinición profesional aún está inconclusa.

> **✦** «**Los propietarios carecen de un conocimiento suficiente sobre la aplicación del BIM y suelen operar según los flujos de trabajo de ingeniería tradicionales, lo que limita la eficacia de la tecnología BIM**»[^53]: esta es la observación más directa de BSI sobre los propietarios en Taiwán. El cuello de botella que impide el avance del BIM se encuentra en el lado de los propietarios; que los ingenieros sepan o no usar la tecnología es, en cambio, un asunto secundario.

---

## Lo que viene

En mayo de 2026, la situación del BIM en Taiwán es la siguiente:

- El gobierno central lleva 12 años impulsándolo, pero sigue aplicando el principio de «caso por caso», sin una obligatoriedad generalizada[^2]
- Taipei y Nuevas Taipéi exigen modelos BIM a nivel de permisos de construcción desde 2014 y 2018 respectivamente, pero las normativas municipales son distintas entre sí[^4][^11]
- Grandes consultoras de ingeniería (Taiwan Engineering Consulting, Chung Hsin, Evergreen) y grandes contratistas (CTCI, Huzhu, Daxin, Obayashi Corporation Taiwan) ya lo utilizan, y la demanda de ingenieros BIM es alta[^17][^19][^33][^42]
- La mayoría de los estudios de arquitectura de pequeña y mediana escala aún se basan en AutoCAD; se estima que la tasa de adopción del BIM está en un dígito porcentual[^43][^45]
- 17 meses después de la apertura del código fuente de Anthropic MCP en noviembre de 2024, Autodesk anunció que Revit 2027 incluirá un servidor MCP integrado[^7][^46]
- Un desarrollador taiwanés creó un repositorio de enseñanza de Revit MCP con 73 estrellas, reconectando el ecosistema internacional con la comunidad en chino[^6][^48]

Al observar estas seis líneas en conjunto, **el BIM en Taiwán es la historia de una profesión que está siendo redefinida externamente por una plataforma tecnológica**, y aún falta camino para convertirse en una industria madura. La velocidad de la promoción gubernamental no sigue el ritmo de la iteración tecnológica, y la velocidad de adopción del sector privado no sigue el ritmo del envejecimiento demográfico. La industria de la construcción en Taiwán está siendo estirada simultáneamente por tres fuerzas: los trabajadores tradicionales que envejecen, la escasez de mano de obra en los chantiers, y las herramientas de la nueva generación de IA × BIM.

En la próxima década, la profesión de «arquitecto» en Taiwán podría no ser como la conocemos hoy. La parte de dibujo se le entregará a la IA: con una sola frase como «**establecer el nivel de resistencia al fuego de 90 minutos para todas las puertas de la Fase 2**»[^7], se puede modificar todo el proyecto de puertas. El trabajo del arquitecto se parecerá más al de un «**integrador de sistemas**», un «**traductor entre el cliente y la tecnología**» y un «**curador de la colaboración multifacética**».

El 23 de mayo de 2014, cuando la Plataforma BIM de la Comisión de Obras Públicas del Ejecutivo Yuan de la República de China celebró su primera reunión, la estación de Miaoli del Tren de Alta Velocidad de Taiwán aún no se había construido. El 2 de abril de 2026, cuando Autodesk anunció la integración de MCP en Revit 2027, la siguiente planta de fabricación (fab) de TSMC en Kaohsiung ya se estaba preparando con documentación completamente en BIM. Los doce años de «aplicación caso por caso» han llegado a un lugar que nadie había previsto: un protocolo abierto desde la oficina de Anthropic en California, que ha reescrito la curva de incorporación (onboarding) de toda la industria desde la perspectiva de la plataforma, sorteando la ruta principal original de la obligación gubernamental.

El 14 de diciembre de 2025, cuando Long Ting Information subió `REVIT_MCP_study` a GitHub[^48], habían pasado exactamente 11 años y 7 meses desde que la Plataforma BIM de la Comisión de Obras Públicas fue establecida. Durante esos doce años, la industria de la construcción en Taiwán recorrió un largo camino: desde el dibujo a mano y los planos al secado hasta los modelos 3D, desde intentos individuales hasta estándares nacionales, desde la actualización de herramientas hasta la redefinición de las profesiones. **Este camino no ha terminado; pero cómo se recorrerá la siguiente etapa ya no depende únicamente del gobierno de Taiwán**.

---

**Lecturas adicionales**:

- [Arquitectura taiwanesa](/es/art/taiwanese-architecture) — Una narrativa de la cultura arquitectónica desde las casas de piedra hasta los rascacielos; este artículo es la pieza hermana de su capa de digitalización ingenieril
- [Vivienda social y justicia habitacional](/es/society/social-housing-and-housing-justice) — La aplicación del BIM en la gestión y mantenimiento de la vivienda social es un proyecto clave del Instituto de Investigación de Construcción del Ministerio del Interior en los últimos años
- [Empresas de Taiwán: TSMC](/es/economy/tsmc) — La aplicación del BIM en las plantas de TSMC es el principal campo de práctica para contratistas como Daxin y Huzhu
- [Desarrollo de IA en Taiwán](/es/technology/ai-development-in-taiwan) — Anthropic MCP y la integración de MCP en Revit 2027 son casos concretos de IA × industria
- [Industria de semiconductores](/es/technology/taiwan-semiconductor-industry) — La solución integral de ingeniería de las plantas de fabricación (fab) + la construcción inteligente asistida por BIM es la base ingenieril para la expansión del clúster de semiconductores

## Fuentes de las imágenes

Este artículo utiliza 3 imágenes con licencia CC de Wikimedia Commons, todas almacenadas en caché en `public/article-images/technology/` para evitar enlaces directos a los servidores de origen:

- [FreeCAD 1.0 Dark BIM Example](https://commons.wikimedia.org/wiki/File:FreeCAD_1.0_Dark_BIM_Example.png) — Foto: Maxwxyz, 2024-10-07, CC BY 4.0 (imagen principal: representación 3D de modelos de herramientas BIM de código abierto)
- [Autodesk Revit 2024 物件示範](https://commons.wikimedia.org/wiki/File:Revit_2024.png) — Foto: DanielDefault, 2024, CC BY-SA 4.0 (imagen en línea: pantalla de modelado basado en objetos de Revit)
- [Taipei Dome and Hino 300 BEM-5593](https://commons.wikimedia.org/wiki/File:Taipei_Dome_and_Hino_300_BEM-5593_%2850281669428%29.jpg) — Foto: Cheng-en Cheng, 2020-08-16, CC BY-SA 2.0 (imagen en línea: en el sitio de construcción del Taipei Dome, se está montando una estructura de acero de 65 000 toneladas)

El registro completo de la matriz de licencias de medios se encuentra en [`reports/research/2026-05/台灣BIM與營建科技.md`](../../reports/research/2026-05/台灣BIM與營建科技.md) § Matriz de licencias de medios, tres tablas.

## Referencias

[^1]: [Comisión de Obras Públicas del Ejecutivo Yuan de la República de China: Zona Especial de Modelado de Información de Construcción (BIM) en Obras Públicas](https://www.pcc.gov.tw/content/index?eid=1345&type=C) — Página oficial de la plataforma de promoción BIM de la Comisión de Obras Públicas del Ejecutivo Yuan, que documenta el documento de política oficial de creación el 23 de mayo de 2014 y la estrategia de promoción en tres fases: 'Fomentar pruebas piloto / Ejecución de pruebas piloto / Promover obras públicas con un monto superior a partir de 2017'.

[^2]: [Plataforma de Participación en Políticas Públicas de la Oficina de Contabilidad: Recopilación de Opiniones sobre la Estrategia de Promoción BIM de la Comisión de Obras Públicas](https://cy.join.gov.tw/policies/detail/8e95c8d6-ce87-4e05-afce-c46a33eb6f89) — Página de discusión abierta de la Oficina de Contabilidad, que registra que el principio de promoción de la Comisión de Obras Públicas es 'adaptado al caso y progresivo', no obligatorio en general; y las estadísticas oficiales que acumulan más de 60 agencias de licitación de ingeniería utilizando BIM y más de 120 proyectos de licitación aplicados.

[^3]: [Sitio Web Oficial de la Asociación de Modelado de Información de Construcción de Taiwán (TBIMA)](https://sites.google.com/view/tbima) — Sitio web oficial de la asociación registrada ante el Ministerio del Interior, que documenta el contexto histórico del origen de las reuniones en 2009, la preparación en 2011 y el establecimiento formal el 10 de marzo de 2012, con miembros principales provenientes del círculo de instructores de capacitación original de Autodesk Taiwan en 2008.

[^4]: [Bureau de Desarrollo Urbano del Gobierno Municipal de Taipéi: Especificaciones de Operación de Datos de Atributos de Modelos BIM de Obra Terminada v2.0](https://udd.gov.taipei/assets/50-10660/Documents/竣工模型屬性資料作業規範v2.0_20181109_new.pdf) — Norma oficial publicada por el Bureau de Desarrollo Urbano del Gobierno Municipal de Taipéi el 9 de noviembre de 2018, con especificaciones concretas que hacen referencia al formato internacional COBie y requieren la exportación de datos estándar IFC.

[^5]: [BSI Firma el Memorándum de Entendimiento de Colaboración 'Taiwan BIM Task Group' con Industria, Gobierno, Academia e Investigación](https://www.bsigroup.com/zh-TW/about-bsi/media-centre/press-release/2018-/october/bsitaiwan-bim-task-group/) — Nota de prensa de la firma del MOU por BSI Taiwán el 3 de octubre de 2018, que registra las cinco unidades firmantes (BSI, NTUBIM de la Universidad Nacional de Taiwán, Instituto de Investigación de Construcción de Taiwán, Centro de Construcción de Taiwán, TBIMA) y el papel de orientación del Instituto de Investigación de Construcción del Ministerio del Interior.

[^6]: [shuotao/REVIT_MCP_study Repositorio de GitHub](https://github.com/shuotao/REVIT_MCP_study) — Proyecto de enseñanza de Revit MCP de código abierto de CHIANG SHUOTAO (Shuotao), creado en diciembre de 2025, con 73 estrellas y 85 forks acumulados en mayo de 2026, distribución de lenguajes como C# 54.2% + JavaScript 18.7% + PowerShell 14.3%.

[^7]: [Blog de Desarrolladores de Autodesk: Agentes de Revit API, MCP, Copilot y Codex](https://blog.autodesk.io/revit-api-agents-mcp-copilot-and-codex/) — Anuncio del blog oficial de desarrolladores de Autodesk en abril de 2026, que el servidor MCP integrado en Revit 2027 y Autodesk Assistant admiten la operación de modelos Revit mediante lenguaje natural.

[^8]: [ONC Lawyers: Adopción del Simulador de Información de Construcción BIM en la Industria de la Construcción y sus Impactos Legales](https://www.onc.hk/zh_HK/publication/adoption-of-bim-and-its-legal-complications-for-the-construction-industry) — Artículo de un bufete de abogados de Hong Kong, que registra el contraste de políticas de Hong Kong donde el Departamento de Desarrollo exige el uso obligatorio de BIM en proyectos de ingeniería con un costo estimado superior a 30 millones de HKD.

[^9]: [Instituto de Investigación de Construcción del Ministerio del Interior de la República de China: Plan de Promoción de la Aplicación de Modelado de Información de Construcción BIM](https://www.abri.gov.tw/News_Content_Table.aspx?n=807&s=315634) — Página oficial del plan de ABRI, que registra los objetivos y el alcance del plan de medio plazo de abril de 2015 (año 104 de la República de China) y el plan de la segunda fase de 2019 (año 108).

[^10]: [Instituto de Investigación de Construcción del Ministerio del Interior: Investigación de Aplicación de Resultados de Desarrollo de Modelado de Información de Construcción (BIM) en Taiwán y Estudio de Planes de Promoción](https://www.abri.gov.tw/News_Content_Table.aspx?n=807&s=39612) — Informe de resultados de investigación encargado por ABRI, que registra los dos grandes objetivos de la segunda fase: 'Actualización Digital de la Tecnología de Construcción' + 'Entorno de Vivienda Digital', y la dirección de integración de ciudades digitales BIM × GIS × IoT.

[^11]: [Bureau de Obras Públicas del Gobierno Municipal de Nuevas Taipéi: Sistema de Verificación Asistida por Computadora de Licencias de Construcción](https://www.bim.ntpc.gov.tw/) — Sitio web oficial del sistema de verificación BIM de licencias de construcción del Gobierno Municipal de Nuevas Taipéi, que registra la primera licencia de construcción BIM modelo en 2014, los resultados acumulados de más de 20 modelos BIM completados y las 'Normas de Entrega de Información de Modelos BIM de Obra Terminada de Edificios Públicos de Nuevas Taipéi'.

[^12]: [buildingSMART International: Clases de Fundación de la Industria (IFC)](https://www.buildingsmart.org/standards/bsi-standards/industry-foundation-classes/) — Página de estándares IFC del sitio web oficial de buildingSMART International, que registra el estándar internacional ISO 16739-1:2024 y la adopción internacional como el uso obligatorio de IFC en obras públicas iniciado en Dinamarca en 2010.

[^13]: [Instituto de Investigación de Construcción del Ministerio del Interior: Informe de Resultados del Plan de Promoción de la Aplicación de Modelado de Información de Construcción BIM (Año 112)](https://ws.moi.gov.tw/001/Upload/404/relfile/9489/315634/0cccc6e2-2dc6-496f-a45f-69b60e2811b1.pdf) — Informe de resultados de ABRI de 2023 (año 112 de la República de China), que reconoce el diagnóstico oficial de que 'la mayoría de las aplicaciones del sector público de BIM pertenecen a las etapas de diseño y construcción, mientras que la gestión operativa aún adopta métodos tradicionales'.

[^14]: [Bureau de Ingeniería del Metro de Nuevas Taipéi: Aplicación BIM de la Línea Wan Da del Metro](https://www.dorts.ntpc.gov.tw/documentary/articleInfo/P9z2zp0nZrDp?page=216) — Registro oficial en la colección de ingeniería del Bureau del Metro de Nuevas Taipéi, que indica que la Línea Wan Da del Metro de Taipéi es el 'primer proyecto de ingeniería pública que incluye BIM en el contrato', reduciendo conflictos de interfaz de diseño.

[^15]: [Flow BIM Service: Compartir Casos de Edificios Comerciales Inteligentes](https://bim.flow.tw/smartoffice-globalshowcase/) — Compartición de casos de la empresa de consultoría BIM Ruo Shui Guoji, que cita datos específicos de la aplicación BIM de la Estación Miaoli de la Alta Velocidad de Taiwán: 'ahorro del 20% en costos de cambios de diseño y inicio de obra dos meses antes'.

[^16]: [Liberty Times: Sealing of Taoyuan Airport Terminal 3 Contract Awarded to Samsung C&T and Wing Hang Engineering Team for NT$44.5 Billion](https://ec.ltn.com.tw/article/breakingnews/3414669) — Liberty Times news release from March 2021, detailing the contract award for the civil works of Taoyuan Airport Terminal 3 by the Samsung C&T and Wing Hang Engineering consortium.

[^17]: [iThome: Construction Industry Achieves Digital Twin via BIM, Case Study of Taiwan Engineering Consulting Co.](https://www.ithome.com.tw/people/137308) — iThome in-depth report from 2021, interviewing Chief Engineer Lin Yao-tsang of Taiwan Engineering Consulting Co., documenting BIM lifecycle cases such as Fengshan Station and Bagua Mountain Tunnel, and the cross-border BIM collaboration process for Taoyuan Airport T3.

[^18]: [CECI (China Engineering Consultants, Inc.): 50th Anniversary Chronicle of Classic Events](https://www.ceci.org.tw/modules/article-content.aspx?s=13&i=226) — CECI website's 50th-anniversary chronicle, recording the official history of its establishment in 1969 and the investment to establish Taiwan Engineering Consulting Co., Ltd. in 2007.

[^19]: [Taiwan Engineering Consulting Co., Ltd.: Company Profile](https://www.104.com.tw/company/d1w3jw0) — Taiwan Engineering Consulting's 104 job posting page, recording official information that nearly 2,000 employees possess expertise in highways, railways, airports, bridges, BIM, ITS, PPP, etc., and that it was the first to establish a BIM Integration Center in 2010.

[^20]: [Chung Hsin Engineering Consultants, Inc.: Moving Towards the 50th Anniversary of Chung Hsin Engineering](https://50th-anniversary.sinotech.org.tw/about_ltd.html) — Chung Hsin Engineering Consultants' 50th-anniversary website, recording the history of its establishment in 1970 and the transformation into a non-profit organization in 1994, followed by the investment to establish Chung Hsin Engineering Consultants Co., Ltd.

[^21]: [Autodesk University: Design and Application of Chung Hsin Engineering's BIM Collaborative Platform](https://www.autodesk.com/autodesk-university/class/zhongxinggongchengBIMxietongzuoyepingtaizhishejiyuyingyong-2020) — Autodesk University 2020 technical presentation, recording the technical architecture of Chung Hsin Engineering's BIM issue tracking module and seven main PMIS modules built on the ISO 19650 CDE environment.

[^22]: [Evergreen Consulting Engineering Co., Ltd. Official Website](https://www.egc.com.tw/) — Evergreen's official website, recording official information that it was founded in 1974, has over 80 professional staff, designed the structures of Taipei 101 and Kaohsiung 85 Tower T&C, and is one of the top ten global high-rise structural consultants by CTBUH.

[^23]: [NTU BIM Research Center: BIM Development Impact on Current Building Systems (Kuo Jung-chin, Dec 2011)](https://www.ntubim.net/bim2356027396/bim-201112) — A landmark early academic paper from NTU NTUBIM, one of the representative works of Taiwan's BIM academic discourse published by Associate Professor Kuo Jung-chin in 2011.

[^24]: [BSI: Boosting Digitalization in Construction, Taiwan BIM Task Group Releases ISO 19650 Chinese Version](https://www.bsigroup.com/zh-TW/about-bsi/media-centre/press-release/2019/20197/iso-19650-tw-standard-launch/) — BSI press release from 2019, recording the release of the ISO 19650 Chinese version, the supervision by Director Wang Jung-chin of the National Research Institute of Building and Construction, and the specific division of labor with NTU NTUBIM for translation assistance.

[^25]: [BIM-API: PyRevit + Dynamo Scripts](https://www.bim-api.com/en/blog/pyrevit-dynamo-scripts/) — A BIM-API blog post recording the industry observation statistic that '90% of architects in Taiwan (with BIM design capabilities) use Revit Architecture'.

[^26]: [Long Ting Information Graphisoft Archicad Agent Official Website](https://www.academicd.com/) — The official website of Long Ting Information, the Graphisoft Taiwan agent, recording sales support and training resources for ArchiCAD in Taiwan, positioning the market as 'a BIM software more user-friendly than Revit'.

[^27]: [BIM Explorer: Sharing Experiences with Tekla Structures](https://tpuaup.blogspot.com/2013/05/tekla-structures.html) — A BIM blog post recording the current industry status where Tekla Structures is the mainstream software for steel structure design in Taiwan, handling complex steel structures such as stadiums, bridges, and factories.

[^28]: [Otsuka Information Technology: MicroStation Infrastructure Design](https://www.oitc.com.tw/products-detail/MicroStation/79) — The official website of Taiwan's Bentley MicroStation agent, recording the application scope of MicroStation in Taiwan's infrastructure engineering such as railways, highways, tunnels, and bridges.

[^29]: [Digital Architecture Academy BIM+ Studio: Dynamo Architecture Basics Course](https://bimstudio.tabc.org.tw/blogs/bim%E7%9F%A5%E8%AD%98%E5%BA%AB/49627) — Course introduction from Taiwan's Building Research and Advisory Center's BIM+ Studio, recording the key timeline when Autodesk Taiwan invited the Dynamo R&D team from Singapore to teach in Taiwan in early 2016.

[^30]: [WeBIM Services: How Dynamo Transforms the World of Revit](https://webim.com.tw/en/tech-en/dynamo-application-webim-3/) — A WeBIM technical article recording specific application cases of Dynamo in Taiwan's BIM engineer community, such as duct coordinate sorting, clearance judgment, and automatic generation of section views.

[^31]: [Autodesk Navisworks: Resumen del Producto](https://www.quickly.com.tw/autodesk/navisworks.php) — Sitio web oficial del distribuidor de Autodesk en Taiwán, Kuaikeli, que documenta las funciones completas de Navisworks Manage, integrando navegación 3D, detección de conflictos, exportación de informes, simulación de cronograma 4D y estimación de costos 5D.

[^32]: [airitiLibrary: Desarrollo y Aplicación de la Automatización del Diseño CSD/SEM de MRT Asistido por BIM](https://www.airitilibrary.com/Article/Detail/0257554X-202107-202107290004-202107290004-77-85) — Artículo de revista académica en la Biblioteca en Línea Hanyi, que documenta la metodología de integración BIM para el CSD (Dibujos de Servicios Combinados) y SEM (Estructura/Electricidad/Mecánica) en la ingeniería electromecánica del metro de Taiwán.

[^33]: [Grupo CTCI - Wikipedia](https://zh.wikipedia.org/zh-tw/%E4%B8%AD%E9%BC%8E%E9%9B%86%E5%9C%98) — Entrada de Wikipedia sobre el Grupo CTCI, que registra su fundación en 1979 por la Sociedad Técnica de China y el Banco Industrial de Desarrollo de China, junto con la Compañía de Inversiones Central; en 2011, la empresa japonesa Chiyoda Chemical Engineering se convirtió en el mayor accionista; cuenta con 7.500 empleados (2021) y casos importantes de EPC en el extranjero como Amine, Saudi Kayan y SAMAC MMA en Arabia Saudita.

[^34]: [Sitio Web Oficial del Grupo CTCI](https://www.ctci.com/www/ctci2022/page.aspx?L=CH) — Sitio web oficial de CTCI Engineering, que registra el alcance de negocio de sus oficinas y sucursales en 15 países bajo el modelo de EPC y negocios de ingeniería llave en mano.

[^35]: [The News Lens: Crisis de Deudas Incobrables Millonarias en el Extranjero del Grupo CTCI, Revelando la Brecha Fatal en el 'Control de Riesgos Internacionales' de las Empresas de Construcción Taiwanesas](https://crossing.cw.com.tw/article/19832) — Reportaje de investigación profunda de The News Lens, que documenta la controversia del caso EPC de planta de procesamiento de gas natural en la India en 2017, donde el Grupo CTCI enfrentó retrasos significativos y deudas incobrables.

[^36]: [Huzhu Construction Co., Ltd.: Resultados de Fábricas de Alta Tecnología](https://www.futsu.com.tw/p_hitech.html) — Página de fábricas de alta tecnología del sitio web de Huzhu Construction, que registra la declaración oficial de 'la mayor experiencia nacional en construcción de fábricas en términos de área total de piso completada'.

[^37]: [Daxin Engineering: Experiencia en BIM](https://www.dacin.com.tw/bim/) — Página de experiencia en BIM del sitio web de Daxin Engineering, que registra la declaración oficial de 'utilizar BIM como plataforma de herramientas base para el desarrollo, planificación, diseño, integración y coordinación de proyectos de construcción'.

[^38]: [Taiwan大林組 (Obayashi Corporation Taiwan): Resumen de la Empresa](https://www.obayashi.com.tw/topic/about/preview/3250113421819124234) — Sitio web oficial de Obayashi Corporation Taiwan, que registra la información oficial sobre su fundación en 1989, la sede central Obayashi Corporation (constructora de Tokyo Skytree) y que la gestión de planos de construcción y el uso de BIM son los principales elementos de gestión de construcción.

[^39]: [Taipei Dome - Wikipedia](https://zh.wikipedia.org/zh-tw/%E8%87%BA%E5%8C%97%E5%A4%A7%E5%B7%A8%E8%9B%8B) — Entrada de Wikipedia sobre el Taipei Dome, que registra las especificaciones de ingeniería de un área total de piso de 120.000 metros cuadrados, un peso total de estructura de acero de 65.000 toneladas y ser la única cúpula del mundo construida completamente con tubos de acero circulares.

[^40]: [United Daily News: Trabajadores de la Generación del Abuelo Mantienen el Escenario, la Industria de la Construcción Enfrenta una Brecha Tecnológica](https://udn.com/news/story/124689/9220106) — Reportaje de investigación de United Daily News, que documenta la realidad del envejecimiento en la industria de la construcción, donde más del 77% de las más de 100 muertes por accidentes laborales en Nueva Taipei son personas mayores de 40 años.

[^41]: [Liberty Times Net: Escasez Generalizada de Mano de Obra en Todo el País! Cuotas de Trabajadores Migrantes para la Industria de la Construcción de 15.000 Se Agotan Pronto](https://estate.ltn.com.tw/article/21452) — Reporte financiero de Liberty Times Net, que documenta la crisis estructural de la fuerza laboral donde el Ministerio de Trabajo de Taiwán aprobó la apertura de 15.000 cuotas de trabajadores migrantes para la industria de la construcción entre 2024 y 2026, las cuales están a punto de agotarse.

[^42]: [1111 Human Resources Bank: Resultados de Búsqueda de Puestos de Ingeniero BIM con Salario Mensual de 50.000+](https://www.1111.com.tw/search/job?page=1&col=ab&sort=desc&ks=bim,%E7%B9%AA%E5%9C%96&st=1&sa0=50000*) — Página de búsqueda de puestos de ingeniero BIM en 1111 Human Resources Bank, que documenta la situación salarial actual de los ingenieros BIM en Taiwán, con 104 puestos que ofrecen salarios mensuales de 50.000+ y salarios iniciales para principiantes entre 35.000 y 45.000.

[^43]: [¿Por qué es difícil implementar BIM en Taiwán? Cuatro Fases Revelan la Verdad y las Oportunidades](https://engineeringlifetw.com/whynotbim/) — Artículo de análisis profundo del blog 'Gongdi Rensheng' (Vida en la Obra), que documenta las resistencias culturales en la implementación de BIM en Taiwán: 'el modelo BIM se convirtió en un trabajo subcontratado, desconectado de la ingeniería real, y muchos centros o equipos de BIM se disolvieron'.

[^44]: [Verakey Tuopu Engineering: ¿Qué es BIM? Análisis Completo de las 5 Grandes Ventajas de BIM](https://veracityconsultant.com.tw/what-is-bim/) — Sitio web de la empresa de consultoría BIM Verakey, que explica la esencia de la transformación digital de la ingeniería de BIM, que sistematiza la información del edificio (materiales, especificaciones, fabricantes, precios, secuencia de construcción, ciclo de mantenimiento).

[^45]: [Instituto de Investigación de Construcción del Ministerio del Interior de la República de China: Plan de Promoción de Aplicación de BIM](https://www.abri.gov.tw/News_Content_Table.aspx?n=807&s=39506) — Página del proyecto ABRI, que registra el diagnóstico autoevaluado de la situación actual de la promoción de BIM en Taiwán: 'el modelo BIM se convirtió en un trabajo subcontratado, se desconectó de la ingeniería real y muchos centros o equipos de BIM se disolvieron'.

[^46]: [Anthropic: Presentación del Protocolo de Contexto del Modelo](https://www.anthropic.com/news/model-context-protocol) — Anuncio oficial de Anthropic del 25 de noviembre de 2024 sobre la apertura del código fuente del Protocolo de Contexto del Modelo (MCP), describiéndolo como «un puerto USB-C para aplicaciones de IA» junto con los SDKs de Python, TypeScript, C# y Java publicados simultáneamente.

[^47]: [Wikipedia: Protocolo de Contexto del Modelo](https://en.wikipedia.org/wiki/Model_Context_Protocol) — Artículo de la Wikipedia en inglés sobre MCP, que registra la cronología completa desde su apertura de código fuente por Anthropic el 25 de noviembre de 2024 hasta la donación de MCP a la Fundación Agentic AI (bajo Linux Foundation) prevista para diciembre de 2025.

[^48]: [Página personal de GitHub de shuotao](https://github.com/shuotao) — Página personal de GitHub de CHIANG SHUOTAO, que registra su ubicación en Tokio y una serie de repositorios de experimentación de código abierto en BIM, MCP e IA (como CAD_MCP_study, NAVISWORK_MCP, IFCSH, etc.).

[^49]: [Repositorio GitHub shuotao/CAD_MCP_study](https://github.com/shuotao/CAD_MCP_study) — Proyecto de enseñanza de código abierto de CAD con MCP por Shuotao, que forma parte de una serie de experimentos personales de código abierto en BIM, MCP e IA, junto con REVIT_MCP_study y NAVISWORK_MCP.

[^50]: [Architosh: Autodesk Revit 2027 — Grandes cambios en IA y gráficos](https://architosh.com/2026/04/autodesk-revit-2027-big-new-ai-and-graphics-changes/) — Reporte de abril de 2026 del medio especializado en software de arquitectura Architosh, que detalla las funciones y la arquitectura específicas del servidor MCP integrado y Autodesk Assistant en Autodesk Revit 2027.

[^51]: [AutoCAD - Wikipedia](https://en.wikipedia.org/wiki/AutoCAD) — Artículo de la Wikipedia en inglés sobre AutoCAD, que registra la cronología histórica desde su lanzamiento inicial en diciembre de 1982 para CP/M e IBM PC, pasando por la versión de Classic Mac OS en 1992 y la de Microsoft Windows en 1993.

[^52]: [Modelo de Información de Construcción - Wikipedia](https://zh.wikipedia.org/zh-tw/%E5%BB%BA%E7%AF%89%E4%BF%A1%E6%81%AF%E6%A8%A1%E5%9E%8B) — Artículo de la Wikipedia en chino tradicional sobre BIM, que registra la historia del desarrollo académico desde su primera propuesta en 1975, los estudios de académicos finlandeses y estadounidenses en la década de 1980, hasta la introducción del término «Building Information Modeling» por Autodesk en 2002.

[^53]: [BSI Taiwán: El valor comercial del Modelo de Información de Construcción (BIM)](https://www.bsigroup.com/zh-TW/insights-and-media/insights/blogs/business-value-of-building-information-modelling-bim/) — Blog oficial de BSI Taiwán, que registra la observación sobre la estructura de problemas del lado del cliente: la falta de comprensión plena de los propietarios sobre la aplicación de BIM, lo que lleva a operar con flujos de trabajo de ingeniería tradicionales y limita la eficacia de la tecnología BIM.
