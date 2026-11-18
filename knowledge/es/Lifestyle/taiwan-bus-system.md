---
title: 'El sistema de autobuses de Taiwán: cuando Hsinchu Bus se marcha, quién recoge a quienes no tienen volante'
description: 'La mañana del 15 de septiembre de 2024, frente a la estación ferroviaria de Tongluo, más de 30 personas, desde niños de jardín de infancia hasta mayores de 90 años, tomaron el último servicio 5658 de Hsinchu Bus. Desde la primera ruta conjunta de Taipéi en 1977 hasta zonas rurales que quedaron con solo dos servicios al día, conductores con edad promedio de 51 años y el pase mensual TPASS que disparó en casi 70% los viajes en Hualien, el autobús siempre ha transportado a quienes no tienen opción: adolescentes que van a la escuela, mayores que no conducen, hogares sin vehículo. Y ahora se lo están retirando, ruta por ruta, bajo sus propios pies.'
date: 2026-06-25
category: 'Lifestyle'
tags:
  [
    'autobús',
    'autobuses interurbanos',
    'transporte público',
    'TPASS',
    'zonas rurales',
    'equidad en el transporte',
    'autobuses eléctricos',
    'datos abiertos',
    'escasez de conductores',
  ]
subcategory: '交通與移動'
author: 'Taiwan.md Contributors'
readingTime: 24
featured: false
lastVerified: 2026-06-25
lastHumanReview: false
researchReport: 'reports/research/2026-06/台灣的公車系統.md'
image: '/article-images/lifestyle/scooters-and-bus-taipei-1996.webp'
imageCredit: 'Holly Cheng'
imageLicense: 'CC BY-SA 3.0'
imageSource: 'https://commons.wikimedia.org/wiki/File:Taipei_street_scene.jpg'
datasets:
  - name: '台灣好行各路線搭乘人次'
    url: 'https://data.gov.tw/dataset/140008'
  - name: '機動車輛登記數'
    url: 'https://data.gov.tw/dataset/14208'
relatedDiary: ['2026-06-25-204254-公車系統']
curation: 'incubating'
curationReason: 'unverified'
translatedFrom: 'Lifestyle/台灣的公車系統.md'
sourceCommitSha: 'be13f045'
sourceContentHash: 'sha256:7d3802fe03c60e03'
sourceBodyHash: 'sha256:24a950fc8509e96a'
translatedAt: '2026-10-13T05:51:42.180594+00:00'
---

La mañana del 15 de septiembre de 2024, frente a la estación ferroviaria de Tongluo, en Miaoli. Más de 30 personas estaban de pie bajo la señal de parada: la más pequeña aún iba al jardín de infancia; la mayor tenía 90 años. No esperaban un autobús para ir al trabajo ni uno para ir a la escuela. Esperaban el último servicio 5658 de Hsinchu Bus.

Desde ese día, esta antigua empresa, con un siglo de historia, se retiró por completo de Taoyuan, Hsinchu y Miaoli, y 12 rutas de Miaoli pasaron a manos de “Happy Taxi”, un servicio de taxis con reserva previa[^1]. Cuando el autobús grande de Hsinchu Bus entró lentamente en la estación, la gente aplaudió. El representante local de Tongluo, Hsu Yu-feng, convocó a los vecinos para subir a ese último viaje como recuerdo. Dijo: “Tomar los autobuses de Hsinchu Bus es un recuerdo para mucha gente; acompañó la juventud de muchos”[^1].

Los aplausos eran para un autobús, pero debajo de esos aplausos había algo más cruel. Quienes estaban bajo la señal de parada aplaudiendo eran estudiantes de primaria que aún no pueden manejar una moto, abuelos que ya no pueden hacerlo, personas de hogares sin un segundo vehículo: precisamente el grupo que menos puede salir cuando quiera. El autobús existe para que ellos lo tomen. Y el colapso del sistema de autobuses de Taiwán empieza, justamente, bajo sus pies.

> **Resumen en 30 segundos:** Los autobuses de Taiwán transportan a “personas sin volante”: adolescentes que van a la escuela, mayores que no conducen, hogares sin vehículo. El 53.3% de los desplazamientos de hogares sin automóvil depende del transporte público; entre hogares con automóvil, solo el 13.7%[^2]. Pero este sistema está dejando de operar primero en los lugares que más lo necesitan: los conductores de autobuses interurbanos de carretera cayeron de 5,646 a 3,551 en seis años, más de un tercio menos[^3]; en zonas rurales quedan solo dos servicios al día y el último autobús sale muy temprano. La misma acción, “esperar el autobús”, en Taipéi significa quejarse de que tarda demasiado; en el campo de Changhua significa “¿todavía puedo salir solo de casa?”. Detrás hay un sistema de datos abiertos que hasta Google utiliza, pero en la calle muchas veces el resultado es no poder subir a ningún vehículo, o ver llegar dos a la vez. Su calidad mide si una sociedad está dispuesta a llevar consigo a quienes no pueden ponerse en camino por cuenta propia.

## La gente que levanta la mano bajo la parada

Aclaremos primero una cosa: ¿quién toma realmente el autobús?

La encuesta de modos de transporte del Ministerio de Transportes ofrece una respuesta contraintuitiva. Si se separan los hogares según “tengan o no automóvil”, el 53.3% de los desplazamientos de hogares sin automóvil depende del transporte público; en los hogares con automóvil, solo el 13.7%[^2]. La diferencia es de casi cuatro veces. En otras palabras, la base principal de usuarios del autobús, junto con el metro y Taiwan Railways, son quienes no tienen automóvil en casa o no conducen. La distribución por edad lo muestra con más claridad: los estudiantes son el grupo con mayor tasa de uso entre todos los motivos de viaje, y más de 40% de los trayectos escolares se hacen en transporte público[^2].

```tw-bars
Quién usa el transporte público: quienes tienen automóvil lo usan poco; quienes no tienen vehículo dependen de él para salir (cuota de viajes %)
*Hogares sin automóvil | 53.3 | Dependen de él para salir
Hogares con automóvil | 13.7
Fuente: encuesta de condiciones de uso de modos de transporte, Departamento de Estadísticas del Ministerio de Transportes
```

Este grupo tiene algo en común: no tiene un volante en las manos. Los adolescentes todavía no pueden manejar moto; los mayores de setenta u ochenta años ya no pueden hacerlo; las familias que no pueden o no quieren comprar un automóvil no tienen alternativa. Para un abuelo de 78 años en Changhua, el autobús nunca ha tratado de si algo es “conveniente o no”. La pregunta que debe responder es: “¿Puedo ir hoy al médico por mi cuenta? ¿Puedo volver solo a casa?”. Lo que está en juego es la dignidad.

Aquí conviene detener una objeción frecuente. Cada cierto tiempo alguien dice que el verdadero sujeto de Taiwán es la motocicleta, no el autobús, y que escribir sobre autobuses es un “framing de élite urbana”. Es cierto que Taiwán es una isla de motos: hay 599 motocicletas por cada mil habitantes, el 83.7% de los hogares tiene una, y solo alrededor del 12.5% de las personas depende principalmente del transporte público[^4]. Pero ese argumento apunta en la dirección equivocada. El autobús es precisamente una línea vital no elitista: transporta a hogares sin automóvil, estudiantes, mayores rurales que no pueden manejar moto. Quien sí puede manejar una moto, por lo general, no lo necesita tanto. Quienes dependen de verdad del autobús son quienes ni siquiera pueden subirse a una moto.

> 📝 **Nota del curador**: La lectura habitual convierte directamente “hay muchas motos” en “el autobús no importa”, pero ahí se salta un eslabón: la moto resuelve la movilidad de “quienes pueden salir por su cuenta”; el autobús resuelve la movilidad de “quienes no pueden salir por su cuenta”. Sirven, de raíz, a personas distintas. Cuando una ruta rural deja de operar, los jóvenes y adultos que manejan moto no son quienes primero se ven afectados; quien pierde el vehículo es la abuela que tomaba el autobús para ir a sus controles médicos. Tratar al autobús como personaje secundario equivale a tratar también a estas personas como secundarias.

De paso, aclaremos un malentendido común: mucha gente cree que los trabajadores migrantes son la base principal de usuarios del autobús. En realidad, no. En Taiwán, debido a restricciones políticas de larga data para comprar vehículos, los trabajadores migrantes suelen trasladarse diariamente en motocicleta, y solo toman autobuses interurbanos para viajes largos de fin de semana[^5]. Imaginar a los migrantes como los principales pasajeros del autobús es dar por sentado que “vulnerable” equivale directamente a “usuario de autobús”.

## Un trayecto, dos trayectos y el «bip» al bajar

![Autobús de piso bajo de Xingnan Bus en Tainan circulando por la línea principal roja; junto a la puerta se observa el símbolo de accesibilidad y el diseño de piso bajo](/article-images/lifestyle/low-floor-bus-tainan-2016.webp)
_Un autobús de piso bajo de Xingnan Bus, en Tainan, 2016. El piso bajo permite subir con carritos de bebé o sillas de ruedas, siendo un indicador clave de la «accesibilidad» en los autobuses urbanos. Photo: Nutnse0008, CC BY-SA 4.0 (ver fuentes de las imágenes al final del artículo)._

Hay una serie de movimientos que los taiwaneses aprenden desde niños y que suelen confundir a los extranjeros: hay que levantar la mano en la parada; si no lo haces, el conductor pasará de largo sin detenerse. Al subir, suena un «bip», y a veces, al bajar, hay que volver a hacer «bip». Detrás de estos gestos se esconde un sistema de tarifas mucho más preciso de lo que parece.

Este sistema tiene su origen en 1977. Antes de esa fecha, las distintas empresas de autobuses en Taipéi operaban de forma independiente: los números de ruta, los precios y los billetes no estaban unificados. En 1976, el Ayuntamiento de Taipéi estableció el «Comité Preparatorio para la Consorcio de Autobuses Públicos y Privados» para estandarizar estos elementos. El 1 de enero de 1977, las líneas consorciadas 202 y 202 comenzaron a circular. El 30 de abril del mismo año, entró en funcionamiento oficialmente la primera fase con 33 rutas de autobuses bajo este modelo[^6]. El término «consorcio» significa que, independientemente de qué empresa opere el vehículo, los pasajeros utilizan la misma numeración de ruta, las mismas tarifas y el mismo tipo de billete; este fue el punto de partida del sistema de autobuses urbanos en Taiwán.

El cobro por tramos también surgió de aquí. A medida que la ciudad se expandió hacia Nueva Taipéi, un solo viaje podía atravesar varias zonas tarifarias: el casco antiguo contaba como un trayecto, mientras que la extensión hacia la periferia podía contar como dos o tres tramos. Los puntos de división suelen situarse cerca de nodos de transporte o límites municipales, como el puente de Taipéi o Shilin; subir o bajar en las dos paradas contiguas a estos puntos suele contar como un solo trayecto (lo que se denomina «zona de amortiguación»). Por eso, cuando se toma una ruta que cruza diferentes tramos, hay que pasar la tarjeta al subir y también al bajar: el sistema necesita saber cuántos tramos has recorrido para cobrarte lo correspondiente. La duda más común entre los amigos extranjeros —«¿por qué a veces se sube por la puerta delantera y otras por la trasera?»— tiene su respuesta aquí: dónde se sube o baja, y si se pasa la tarjeta una o dos veces, depende totalmente de cómo esté dividida esa ruta en tramos.

Los medios de pago también han evolucionado. La EasyCard se implementó plenamente en los autobuses a finales de septiembre de 2002[^7], mientras que la iPASS de Kaohsiung se lanzó junto con el metro de Kaohsiung en 2014[^7]. El sistema de validación bidireccional (pasar la tarjeta al subir y también al bajar) se introdujo en una primera fase el 1 de julio de 2019 y se implementó totalmente en una segunda fase en febrero de 2020. Su objetivo era calcular con precisión las tarifas por tramos, ofrecer descuentos por transbordo y, al mismo tiempo, recopilar datos sobre los pasajeros que suben y bajan[^8]. Aquí cabe hacer una aclaración importante para evitar un error común: la validación bidireccional es algo de 2019, no de 2012. La iPASS es de 2014, tampoco de 2012.

Sin embargo, este sistema tiene sus límites. El volumen de pasajeros de los autobuses urbanos en Taiwán está extremadamente concentrado en la zona de Taipéi y Nueva Taipéi: en 2020, esta región representó el 73,7 % del volumen total de autobuses urbanos de todo el país[^9]. En una línea principal de Taipéi, durante las horas punta, pasa un autobús cada 4 o 6 minutos, y los habitantes de la ciudad se quejan si tienen que esperar 5 minutos. Al mismo tiempo, en una parada de la zona centro-sur o del este, puede pasar solo uno por hora, y el último servicio termina a las cinco o seis de la tarde. El sistema es el mismo, pero aplicarlo en lugares distintos significa vivir dos realidades completamente diferentes.

## Google sabe cuántos minutos faltan para tu autobús porque Taiwán abrió los datos

Abres el teléfono y ves una cuenta regresiva: “llega en 3 minutos”. Parece algo natural, pero en realidad es uno de los logros menos conocidos de Taiwán.

Taiwán empezó en 2015 a inventariar datos nacionales de transporte público y a definir estándares unificados. En 2016 creó la plataforma PTX, y en diciembre de 2022 la integró y actualizó en el actual TDX, el Servicio de Circulación de Datos de Transporte[^10]. Su escala: miles de conjuntos de datos, más de 4.9 millones de llamadas API por día, más de 540 millones de registros circulados de forma acumulada y más de 3,000 proveedores de servicios de valor agregado que los usan[^11]. Más importante aún: la información de llegada de autobuses de Taiwán en Google Maps efectivamente proviene de datos TDX/PTX utilizados a través de socios locales[^11]. Esto convirtió a Taiwán en uno de los pocos lugares del mundo donde Google Maps ofrece predicciones detalladas de llegada de autobuses.

Pero aquí hay que ser honestos y no exagerar. Los datos abiertos de Taiwán son “líderes regionales”, no “de clase mundial” con respaldo de evaluaciones internacionales. Adoptan un formato OData propio de “cuatro estrellas”, no los estándares internacionales GTFS/GTFS-RT de uso común, lo que dificulta su integración directa en ecosistemas globales; tampoco se encuentra ningún organismo internacional que catalogue a Taiwán como referente de datos abiertos[^12]. Su fortaleza está en la escala y la difusión; su debilidad, en la conexión con estándares internacionales.

Además, por inteligente que sea el sistema de fondo, no puede salvar por sí solo la experiencia de calle. Todas esas aplicaciones de autobuses, como Taipei Bus, distintos BusTracker o Cloud Bus, en realidad se conectan al mismo TDX por detrás; solo cambia la interfaz[^13]. Por eso, la hora de llegada que ves en la aplicación A es exactamente igual a la de la aplicación B: ambas copian la misma tarea. El verdadero problema está en el origen de los datos: en zonas urbanas llenas de edificios altos, el GPS deriva, y la predicción de llegada del autobús deriva con él.

La escena más gráfica aparece en las quejas de usuarios de Taichung en PTT. Un usuario llamado LeiHide escribió: “La vez pasada miré la app esperando el autobús; la app mostraba que entraban 2 vehículos, pero en realidad no llegó ninguno”, “básicamente servicios fantasma”; otro usuario, teddykitty, dijo: “Claramente existía el servicio de las 6:50, pero yo y otras dos chicas que no conocía terminamos esperando como tontas”[^14]. Detrás hay datos abiertos unificados para todo Taiwán; delante, tres desconocidas esperando juntas bajo una señal de parada un autobús que nunca llega. Esa es una de las caras más partidas del sistema de autobuses taiwanés.

(Añado un punto que suele circular de forma equivocada: en internet hay quien dice que “1968” es la app de autobuses de la ciudad de Taipéi. No lo es. 1968 es un sistema de numeración de rutas de autopista y también una app oficial de información en tiempo real de autopistas; no tiene relación con los autobuses urbanos[^13].)

## Llegan dos juntos, y después una larga espera vacía

![Marquesina de autobuses en la calle Zhengzhou, junto a la estación central de Taipéi, con señales de parada y pasajeros esperando](/article-images/lifestyle/taipei-bus-shelter-2020.webp)
_Marquesina de autobuses en la calle Zhengzhou, junto a la estación central de Taipéi, 2020. Para quienes no tienen volante, la parada es el punto de partida cotidiano y también el lugar de largas esperas. Foto: T Gordon Cheng, CC BY-SA 4.0 (fuente al final del artículo)._

Cualquiera que haya tomado un autobús entiende ese absurdo: esperas 20 minutos sin que llegue ninguno, y luego dos vehículos de la misma ruta entran a la parada pegados uno detrás del otro.

El fenómeno se llama “bunching”, o agrupamiento de autobuses, y es una propiedad física del sistema, no una cuestión de si el conductor es perezoso o no. Si el primer vehículo se retrasa un poco, acumula más pasajeros en el camino; subir y bajar toma más tiempo, así que avanza cada vez más lento. El vehículo de atrás, en cambio, como el primero ya recogió a los pasajeros, circula con más fluidez, se acerca cada vez más y termina pegado al anterior. Cuanto más largo es el intervalo de una ruta, más agresiva se vuelve esta bola de nieve.

Para la gente de Taipéi, el bunching es una molestia; para quienes viven en zonas rurales, es un lujo: ni siquiera llegan a ver “dos autobuses juntos”, porque en todo el día solo hay unos pocos servicios. Esto nos devuelve a esa grieta urbano-rural invisible: la gente de Taipéi se queja de esperar 5 minutos porque tiene margen para quejarse; quien en el campo de Changhua espera 40 minutos, o incluso vive con solo dos servicios al día, no tiene ese margen. La misma palabra mide dos situaciones completamente distintas. Cuanto menos opciones tiene una persona, más probable es que no le llegue el autobús. Esta frase volverá una y otra vez en este artículo.

## Cómo los autobuses ilegales se convirtieron en United Bus

![Autobús de larga distancia por autopista de Kuo-Kuang Bus, matrícula KKA-1897](/article-images/lifestyle/kuokuang-intercity-coach-2026.webp)
_Autobús de larga distancia por autopista de Kuo-Kuang Bus, 2026. Su predecesor fue la empresa Taiwan Bus, que operaba bajo el monopolio de la Dirección de Carreteras; en 2001, miles de empleados recaudaron fondos para hacerse cargo de ella. Photo: Wei Ting Hsu, CC BY-SA 4.0 (ver fuentes de las imágenes al final del artículo)._

Para entender por qué el transporte público es como es hoy en día, hay que remontarse a cómo pasó de ser un monopolio a llenar las calles.

El origen del transporte por carretera en Taiwán fue la Dirección de Carreteras de la Provincia de Taiwán, fundada en 1946. En 1977, el negocio del transporte de pasajeros se independizó de la Dirección de Carreteras para crear la empresa Taiwan Bus (Taiqi), que en su apogeo contaba con más de 500 rutas, 3.600 vehículos y decenas de miles de empleados[^15]. Las generaciones mayores aún recuerdan esa época en la que la Dirección de Carreteras monopolizaba el transporte de larga distancia.

El punto de inflexión ocurrió alrededor del levantamiento de la ley marcial. A finales de la década de 1980, empezaron a aparecer en las carreteras numerosos «autobuses ilegales» (conocidos como _yeji che_ o «autobuses gallina») que no tenían matrícula y recogían pasajeros de forma privada. En lugar de intentar una persecución interminable, el Ministerio de Transporte optó por ayudarlos a legalizarse. El 6 de septiembre de 1989, se fundó oficialmente United Bus (Tonglian), cuyo nombre fue propuesto por Chang Chia-chu, entonces director del Instituto de Investigación de Transporte del Ministerio de Transporte, con el significado de «liderar todas las direcciones y operar conjuntamente». Se convirtió en la primera empresa privada legal de transporte por autopista en Taiwán[^16]. Una vez que el mercado se abrió, empresas como Hsin Yi, Kavalan, Aloha y Capital Bus se unieron sucesivamente, transformando el transporte de larga distancia de un monopolio estatal a una competencia entre decenas de operadores.

```tw-timeline
1946 | Se funda la Dirección de Carreteras de la Provincia de Taiwán | Gestión directa del gobierno, monopolio del transporte por carretera en Taiwán
1977 | Se independiza Taiwan Bus | El negocio de transporte se separa de la Dirección de Carreteras; alcanzó decenas de miles de empleados
1989 | Se funda United Bus | Los autobuses ilegales se legalizan; primera empresa privada de transporte por autopista
2001 | Kuo-Kuang Bus toma el control | Taiwan Bus pierde NT$5.000 millones anuales; mil empleados recaudan fondos para fundar Kuo-Kuang
Fuente: Material histórico sobre la evolución de la Dirección de Carreteras, Taiwan Bus y Kuo-Kuang Bus (Taiwan Bus con más de 500 rutas, 3.600 vehículos y 1.090 empleados recaudando fondos en 2001) e informes de la fundación de United Bus en 1989[^15][^16]
```

El sector público no tuvo tanta suerte. Taiwan Bus operaba con pérdidas constantes, perdiendo unos NT$5.000 millones al año que eran cubiertos por el tesoro nacional; tras la apertura a la competencia, tanto sus rutas como su plantilla se redujeron drásticamente[^15]. En junio de 2001, 1.090 empleados de Taiwan Bus aportaron cada uno NT$300.000 para fundar Kuo-Kuang Bus, y en julio asumieron las 96 rutas que originalmente pertenecían a Taiwan Bus[^15]. Muchos empleados de mediana edad, de entre cuarenta y cincuenta años, que aún no cumplían los requisitos para la jubilación, protestaron por ello. El nombre «Kuo-Kuang» proviene, en realidad, del modelo estrella de Taiwan Bus de 1967; fue el fin de una era, donde un imperio dejó su marca a quienes tomaron el relevo.

(Esta parte de la historia institucional es solo contexto. La nostalgia turística que va desde los autobuses Jinma hasta los Kuo-Kuang, así como los detalles sobre el auge de los autobuses ilegales en aquel entonces, pertenecen a otro artículo sobre autobuses turísticos; aquí solo sirve como punto de referencia).

## Salir a las 5:30, terminar a las 8 de la noche, cuatro días libres al mes

No hay un villano que esté retirando los autobuses ruta por ruta. La causa más directa es sencilla: no se encuentra gente para conducirlos.

Las cifras son frías. Los conductores de autobuses urbanos pasaron de 11,811 en 2015 a 10,588 en 2023; en el mismo período, la edad promedio subió de 45.2 a 51.2 años, seis años más en una década[^17]. En el transporte interurbano por carretera la situación es peor: los conductores cayeron de 5,646 en 2019 a 3,551 en 2024, más de un tercio menos en seis años[^3]. En todo Taiwán faltan 1,443 conductores urbanos y 772 de carretera; si se suman los autobuses turísticos, el déficit total de conductores de vehículos pesados de pasajeros supera los 5,000[^17][^3]. Los conductores menores de 35 años pasaron de 14% hace diez años a 5.6%[^17]. Esta industria envejece rápidamente y no tiene relevo.

```tw-line
Cada vez hay menos personas conduciendo autobuses, y son cada vez mayores (conductores de autobuses urbanos)
Año | Conductores | Edad promedio
2015 | 11811 | 45.2
2023 | 10588 | 51.2
Fuente: Ministerio de Transportes, United Daily News Sunshine Action
```

¿Por qué los jóvenes no entran y los conductores veteranos no se quedan? La respuesta está en la estructura salarial. Una investigación de The Reporter sobre el lugar de trabajo de Taoyuan Bus descubrió que el sueldo mensual de los conductores se compone de hasta 14 conceptos; el salario base es de solo 26,400 dólares taiwaneses, y el resto debe completarse con horas extra, que representan entre 35% y 40%, más “bonos por kilómetro” y “bonos por pasajeros”[^18]. El problema es que estos dos últimos bonos no se incluyen en el salario mensual fijo; por eso, al calcular la tarifa horaria promedio usada para las horas extra, los periodistas llegaron a apenas 88 dólares taiwaneses por hora[^18]. Las jornadas también devoran a la gente: se puede conducir hasta 10 horas al día, pero el tiempo de espera entre servicios no cuenta como jornada laboral. Un turno típico empieza con salida a las 5:30, termina a las 8 de la noche, mantiene al conductor atado a la estación durante 16 horas y deja solo 4 o 5 días libres al mes[^18]. Sobre el dormitorio de conductores de Taoyuan Bus, los periodistas escribieron que en un espacio de menos de 5 ping se instalaron ocho literas, compartidas por 16 conductores, con un baño pequeño para todos[^18].

Esta estructura produce decisiones humanas concretas. Chen Wei-chen, conductor activo de Taoyuan Bus, lo dijo sin rodeos: “Lo que necesitamos es dinero. Todos aceptan esforzarse así por dinero. Pero ahora la empresa sigue reduciendo tus horas, cada vez de forma más exagerada”. Hizo sus cuentas: “El sueldo ya no alcanza. Antes ganaba 60,000 al mes; ahora solo 45,000 a 48,000. Aunque me quedan 6 años para jubilarme, ya no quiero seguir”[^18].

¿Adónde van quienes se van? En su mayoría a logística, reparto o Uber. Hsu Yung-fa, exconductor de Taoyuan Bus, pasó a manejar en logística; gana más de 10,000 menos al mes, pero resumió la situación de la industria con una frase: “No es lo mismo transportar personas que transportar mercancías. Hay menos presión, no hay que estar con el corazón en la mano, y la empresa paga lo que corresponde”. Después de renunciar, “por fin supo lo que era tener dos días libres a la semana”[^18]. Chang Hsien-te, subgerente del departamento comercial de Sanchung Bus, completó esa lógica con una comparación aún más directa: “Es igualmente conducir... pero en logística lo que se cae es mercancía; basta con pagar. En autobuses, lo que cae son pasajeros; se les rompen dos dientes delanteros”[^19].

Pero esta no es una historia plana de “los conductores sufren y los pasajeros son malos”. Del lado de los pasajeros también hay fuentes de presión: una sola queja puede costarle al conductor varios miles de dólares, de modo que muchos desarrollan una actitud defensiva y evitan interactuar si pueden[^18]. Bajo el estereotipo popular de “los conductores de autobús manejan rápido y son malhumorados” hay una estructura real de largas jornadas y descuentos salariales fáciles; y la presión de los “denunciadores seriales” que ven los conductores es la otra cara. Ambos extremos están atrapados por el mismo sistema irracional.

La frase más asfixiante viene de Fan Kuang-ming, conductor de Taoyuan Bus y participante activo del movimiento sindical. Al hablar del exceso de horas, estalló: “¡11 horas, 8 horas, todo eso es mierda! ¡En Taoyuan Bus no hay ningún conductor que duerma más de 8 horas!”[^18]. Y cuando contó que, por apurarse para cumplir un servicio, no llegó a tiempo al último momento de su padre, la rabia se convirtió en arrepentimiento: “Cuando llegué al hospital, la sábana blanca ya estaba puesta. Ni siquiera pude decirle ‘papá’ una vez. El día del funeral me incliné 12 veces golpeando la cabeza contra el suelo ante mi padre. Soy un hijo no filial”[^18].

> 📝 **Nota del curador**: Cuando nos quejamos bajo una parada de que el autobús “otra vez no viene” o “por qué maneja tan rápido”, detrás de esa queja hay una persona que rota turnos en un dormitorio de 5 ping, que se esfuerza por una tarifa horaria promedio de 88 dólares taiwaneses y que no pudo ver a su padre por última vez. La raíz de la escasez de conductores es mucho más compleja que “los jóvenes ya no quieren esforzarse”: una estructura que sostiene un trabajo con el salario fijo más bajo, el tiempo de espera más largo y el costo más alto de cualquier error, porque lo que cae son pasajeros, finalmente dejó de sostenerse. Los vehículos no salen porque cada vez hay menos gente dispuesta a quedar atrapada así.

## Después de que Hsinchu Bus se marcha

![Minibús Happy Bus de transporte rural en el condado de Hsinchu detenido en el punto inicial, con las palabras Happy Bus impresas en la carrocería](/article-images/lifestyle/happy-bus-hsinchu-rural-2025.webp)
_Happy Bus rural de los municipios de Hukou y Baoshan, en el condado de Hsinchu, 2025. Tras la retirada de Hsinchu Bus de Taoyuan, Hsinchu y Miaoli, estos minibuses con reserva previa asumieron parte de las rutas suspendidas. Foto: T Gordon Cheng, CC BY-SA 4.0 (fuente al final del artículo)._

¿Dónde estalla primero la escasez de conductores? En los lugares con menos opciones.

Volvamos a la escena inicial. La retirada de Hsinchu Bus de Taoyuan, Hsinchu y Miaoli es apenas un caso dentro de una ola completa de salidas empresariales. Aloha Bus cerró en 2022; Hualien Bus terminó parte de sus operaciones a fines de 2023; en Taichung salieron Jenyo, Fengyuan, Sifang y Jieshun; incluso Kuo-Kuang Bus, que asumió la antigua Taiqi, acumuló deudas por más de 2,000 millones, retrasó dos veces el pago de salarios durante el primer semestre de 2025 y llegó a planear la suspensión de 14 rutas[^20]. Chang Sheng-hsiung, profesor del Departamento de Gestión del Transporte de la Universidad Tamkang, resumió la raíz en una frase: “Aunque las tarifas reprimidas durante mucho tiempo aliviaron la carga de la población, también limitaron la calidad de los autobuses urbanos e interurbanos”[^21]. Las tarifas bajas impiden que los operadores ganen dinero, así que sobreviven con subsidios; cuando los subsidios no alcanzan, las rutas se cancelan una por una.

Es el círculo vicioso que describen los académicos: reducción de frecuencias, pérdida de pasajeros, más reducción. Cuando los servicios se vuelven escasos, los pasajeros se van; cuando se van, las pérdidas aumentan; cuando aumentan, los operadores recortan más servicios. Al hablar de esas rutas que pierden más cuanto más operan, Lee Chien-wen, gerente general de Capital Group, repitió dos veces que no hay salida: “No hay solución, ninguna solución”, porque en rutas deficitarias “cuanto más se transporta, más se pierde”[^22]. Los subsidios rurales de Taiwán calculan la diferencia entre “costo por vehículo-kilómetro menos ingresos”; las rutas con menos de 2 pasajeros promedio por vehículo-kilómetro pueden solicitar subsidios[^23]. Pero el dinero de los subsidios es limitado, y la gente dispuesta a conducir también.

Entonces, ¿los mayores rurales que más dependen del autobús quedan abandonados? Aquí hay un giro que suele quedar tapado por la narrativa pesimista. Taiwán empezó en 2016 a probar el transporte sensible a la demanda, DRTS, y en 2019 lo bautizó como “Happy Bus” y “Happy Taxi”. En lugar de operar horarios fijos, usa minibuses o taxis con reserva previa: va adonde haya alguien que necesite viajar. Su costo por vehículo-kilómetro es de 30 a 40 dólares taiwaneses, inferior a los 45.85 de los autobuses tradicionales[^24]. Gracias a este mecanismo de reemplazo, la cobertura de transporte público rural subió de 70% en 2016 a 91.96% en 2023 y a 94.37% en marzo de 2025, con el objetivo de llegar a 100% en 2028[^25]. Las 12 rutas de Miaoli que Hsinchu Bus dejó tras su retirada pasaron justamente a Happy Taxi[^1]. Detrás de aquel autobús grande que se marchó, empezaron a llegar taxis con reserva previa.

```tw-line
Cobertura de transporte público rural: salen autobuses grandes, entran minibuses y taxis (%)
Año | Cobertura
2016 | 70
2023 | 91.96
2025 | 94.37
Fuente: Yuan Ejecutivo, Oficina de Carreteras del Ministerio de Transportes, Central News Agency
```

Que la cobertura vuelva a superar el 90% es real, pero no hay que leerlo como “el problema quedó resuelto”. Un minibús con reserva transporta a mucha menos gente que un autobús grande; exigir reserva previa también deja fuera a parte de quienes necesitan salir de improviso o a mayores que no manejan bien el teléfono. Es una solución provisional honesta, no una victoria.

## El tren de alta velocidad se llevó a los pasajeros de larga distancia

Lo que empuja al autobús hacia el precipicio no es solo la escasez de conductores. También está el tren de alta velocidad pasando por encima.

Después de la inauguración del tren de alta velocidad en 2007, gran cantidad de viajeros de larga distancia del corredor occidental se trasladó a ese sistema. Las frecuencias de autobuses de autopista se redujeron drásticamente: según datos de la Oficina de Carreteras compilados por Radio Taiwan International y United Daily News, entre 2016 y 2024 los servicios de autobuses de autopista cayeron alrededor de 40%, y los pasajeros 32.8%[^26]. Otro indicador, el número de rutas, muestra que las rutas de autobuses interurbanos convencionales se redujeron 43.7% entre 2012 y 2022[^27]. (Una cifra mide frecuencias y la otra rutas; además usan años base distintos. No deben tratarse como la misma cosa.) En trayectos occidentales largos como Taipéi-Kaohsiung, la oferta solo se ha recuperado hasta poco más de 60% del nivel previo a la pandemia; en el este, la ruta Taipéi-Hualien se consolidó hasta quedar con solo Kamalan operando en días festivos[^26]. La distancia promedio de viaje también se redujo de 93 a 67 kilómetros: los pasajeros de larga distancia se fueron con el tren de alta velocidad, y quedaron los trayectos cortos y medianos[^26].

La consecuencia más visible es que las terminales se vuelven ciudades vacías. Los operadores del segundo piso de la estación de autobuses de Taipéi rescindieron sus alquileres, y toda la planta quedó como un espacio vacío en arriendo[^28]; varios centros de transferencia construidos en Taichung generan temor de convertirse en instalaciones ociosas. Frente a esta avalancha, la Oficina de Carreteras inició en 2025 lo que llamó el mayor ajuste de red en 30 años[^20]. Es, a la vez, el reconocimiento de que la vieja red ya no se sostiene y un intento de barajar de nuevo.

## El progreso de las ciudades y sus límites

Si volvemos la mirada a las zonas urbanas, veremos una cara completamente distinta. Bajo el mismo sistema, el sector urbano está avanzando a pasos agigantados, pero cada paso lo da rozando su propio límite.

El primer avance son los autobuses troncales. Entre 2017 y 2018, la ciudad de Taipéi reestructuró la jerarquía de su red de autobuses; en las horas punta, la frecuencia de las rutas troncales es tan alta que pasa uno cada 4 o 6 minutos, lo que los hace tan fáciles de entender y esperar como el metro[^29]. El segundo es el pase mensual TPASS. Surgió como una propuesta electoral en 2022 y se puso en marcha en julio de 2023, con un presupuesto especial de NT$20.000 millones para los primeros tres años: abarca un pase de NT$1.200 para la zona de Keelung-Nueva Taipéi-Taipéi-Taoyuan, entre NT$699 o NT$999 para la zona de Miaoli-Taichung-Changhua-Toufen, y NT$999 para el sur (Kaohsiung-Pingtung), permitiendo viajes ilimitados en autobuses y metro[^30].

El balance del TPASS debe leerse con matices. El lado positivo es que efectivamente ha logrado atraer a más personas al transporte público: el volumen de pasajeros en autobús aumentó un 19,6% y en el metro un 36,9%[^31]. Sin embargo, si hablamos de convertir a conductores de coches o motos en usuarios del transporte público, el efecto es limitado: las encuestas presenciales en Taipéi muestran que la proporción de vehículos privados que realmente migraron al transporte público es de solo un 7,33%[^32]. En otras palabras, la mayoría de los nuevos pasajeros son personas que «ya usaban el transporte y ahora lo usan más», no personas que «antes conducían y ahora han cambiado al transporte público».

Un problema más realista es el económico: el presupuesto especial de NT$20.000 millones del TPASS expira a finales de 2025. El nuevo plan propuesto tiene una escala de NT$36.380 millones, pero se enfrenta a un posible desabastecimiento debido a que el presupuesto general está bloqueado en el Legislativo; esto afecta a 20 condados y ciudades de Taiwán, y en muchos lugares las empresas operadoras están resistiendo mediante adelantos de sus propios fondos[^32][^33]. Una buena política que logra atraer a la gente al transporte público se encuentra ahora atrapada en un estancamiento político.

![Autobús eléctrico BYD K9 de Taipei Bus circulando frente al Zoológico de la ciudad de Taipéi](/article-images/lifestyle/electric-bus-byd-taipei-2026.webp)
_Un autobús eléctrico BYD K9 de Taipei Bus circula frente al Zoológico de la ciudad de Taipéi, 2026. El objetivo es que los autobuses urbanos sean totalmente eléctricos para 2030, pero en 2024 solo el 18% están en circulación. Photo: 厦门金龙永远的神, CC BY 4.0 (ver fuentes de las imágenes al final del artículo)._

La electrificación es el tercer avance de las ciudades, y también donde la brecha es más evidente. El gobierno ha declarado que para 2030 los autobuses urbanos serán totalmente eléctricos, con el objetivo de sustituir casi diez mil autobuses de combustión (un stock de unos 9.400 vehículos) y una meta de adquisición subvencionada de 11.700 unidades; este plan fue aprobado en junio de 2023 con un presupuesto de NT$64.300 millones[^34]. Las aspiraciones son altas, pero la realidad es lenta: para 2024, solo unos 1.926 autobuses eléctricos están realmente en circulación (un 18%), y siete condados tienen una cifra de cero[^35].

```tw-bars
Distancia hacia la electrificación total de 2030 (progreso de la electrificación de autobuses urbanos)
Autobuses eléctricos en circulación en 2024 | 1926 | 18% del total
Objetivo de adquisición subvencionada para 2030 | 11700 | Siete condados actualmente en cero
Fuente: Yuan Ejecutivo, Ministerio de Transportes, finales de 2024
```

¿Dónde está el atasco? Desde la aprobación de las subvenciones a nivel local hasta la firma de los contratos reales, hay fugas en cada capa (el cupo bajó de 2.080 a 1.404, y luego a 744); además, los equipos de carga son caros, con una estación de carga que cuesta más de NT$60 millones[^35]. Se anuncia que un autobús cuesta NT$11 millones, con una subvención de NT$6,8 millones, lo que obliga a la empresa a aportar NT$4,2 millones de su bolsillo. Para un sector que ya sobrevive gracias a las ayudas y que ni siquiera puede encontrar conductores, esta es una decisión difícil de tomar.

> 📝 **Nota del editor**: Estos tres hitos urbanos (autobuses troncales, pases mensuales y electrificación) parecen, vistos de forma aislada, una lista de progresos. Sin embargo, comparten un requisito invisible: tiene que haber alguien para conducir los vehículos. Cuando la edad media de los conductores alcanza los 51 años y el déficit supera las 5.000 personas, por muy inteligente que sea el pase mensual o por muy ecológico que sea el autobús eléctrico, no serán más que carcasas de metal detenidas en la terminal. El progreso urbano es real, pero está avanzando sentado sobre una base laboral que envejece rápidamente.

## Taiwán no es un caso aislado

Si miramos al extranjero, vemos que el problema de Taiwán no está solo.

El transporte público japonés, tan admirado, ya se está derrumbando en las zonas rurales: 85% de los operadores rurales de autobuses pierde dinero, los taxistas de Hiroshima tienen una edad promedio de 63 años y más de 20% de la población vive demasiado lejos de una estación de tren o parada de autobús[^36]. En Seúl, Corea del Sur discute seriamente incorporar conductores extranjeros porque casi la mitad de los conductores actuales tiene más de 60 años[^37]. En Europa, 129 millones de personas viven en zonas con transporte público insuficiente, y en las áreas rurales del Reino Unido la recaudación por boletos de autobús no cubre ni 25% de los costos[^38]. La pérdida de población rural, el envejecimiento de conductores y la contracción de rutas son un problema estructural compartido en Asia oriental y en el mundo. La diferencia de Taiwán está en su dependencia aún más profunda de la motocicleta, que hizo que el autobús viviera desde el inicio bajo su sombra.

Lo interesante es que Taiwán tiene, a la inversa, algo visto como referencia internacional. La organización de defensa del transporte Seamless Bay Area, en California, tomó el TPASS como ejemplo del que California puede aprender, y resumió tres factores de éxito: subsidios suficientes, voluntad política central y flexibilidad de ejecución local[^39]. Y quienes más se beneficiaron del TPASS no fueron precisamente las élites urbanas, sino las zonas rurales. Tras el lanzamiento del TPASS, los viajes en autobús en Hualien crecieron 69.8%, el ejemplo rural más notable de ese análisis[^39].

```tw-figure
+69.8%
Crecimiento de los viajes en autobús en Hualien tras el lanzamiento del TPASS: un pase mensual barato tiene su mayor efecto en los lugares con menos opciones
Análisis de Seamless Bay Area
```

Esa cifra devuelve el golpe al argumento de que “el autobús es un juguete de élite urbana”. Un pase mensual barato en Taipéi es un plus; en Hualien reduce de forma concreta el costo de salir. Cuanto menos opciones tiene un lugar, mayor es la fuerza de una pequeña mejora.

## El último autobús, rumbo a quienes más lo necesitan

Volvamos a aquella mañana en la estación ferroviaria de Tongluo.

Esas más de 30 personas, desde niños de jardín de infancia hasta mayores de 90 años, aplaudieron la partida del último servicio 5658 de Hsinchu Bus. Desde el primer autobús de operación conjunta de Taipéi en 1977, pasando por la conversión de autobuses pirata en Ubus en 1989, los datos abiertos que sostienen las cuentas regresivas de Google, hasta conductores con edad promedio de 51 años y rutas rurales suspendidas una por una, este sistema ha crecido hasta hoy transportando siempre al mismo grupo: personas sin volante en las manos, personas que no pueden ponerse en camino por cuenta propia. Su crueldad mayor es que se detiene primero bajo los pies de quienes más lo necesitan.

Pero la historia no termina en aquel autobús grande que se fue. Cuando los aplausos se dispersaron, esas 12 rutas de Miaoli se convirtieron en Happy Taxis: los pasajeros llaman y el vehículo llega a la puerta de su casa. No es una victoria: los minibuses con reserva transportan a menos personas, requieren reservar antes y no alcanzan para que todos puedan subir. Pero es una señal: cuando el autobús grande ya no se sostiene, el sistema intenta adoptar otra forma para volver a recoger a quienes siempre debió recoger. Que la cobertura rural vuelva al 94% no se debe a que haya más autobuses; se debe a que una sociedad todavía no está dispuesta a bajar a estas personas del vehículo.

La próxima vez que estés bajo una señal de parada, ya sea en Taipéi quejándote de que tarda demasiado o en el campo de Changhua esperando uno de los dos servicios del día, recuerda que no esperas solo un vehículo. Esperas un sistema que se sostiene con dificultad para las “personas sin volante” y que se queda sin aire primero en los lugares que más lo necesitan. Que llegue o no llegue nunca mide solamente eficiencia de transporte. Mide una elección social: si estamos dispuestos a llevar con nosotros a quienes no pueden ponerse en camino por cuenta propia.

Aquel último 5658 ya se marchó. Pero mientras siga habiendo alguien que levante la mano bajo una parada, todavía hay un vehículo que les debe llegar.

**Lecturas relacionadas**: [Sistema de transporte de Taiwán](/es/lifestyle/transportation-system), [Cultura de la motocicleta en Taiwán](/es/lifestyle/taiwan-scooter-culture), [Historia del desarrollo del metro en Taiwán](/es/lifestyle/history-of-taiwan-mrt-development), [Autobuses turísticos](/es/lifestyle/tour-bus)

## Fuentes de imágenes

Este artículo utiliza 6 imágenes con licencia Creative Commons, todas almacenadas en caché en `public/article-images/lifestyle/` para evitar hotlinking al servidor de origen:

- [Holly Cheng](https://commons.wikimedia.org/wiki/File:Taipei_street_scene.jpg) — motos y autobús en una esquina de Taipéi (hero), 1996, CC BY-SA 3.0
- [Nutnse0008](https://commons.wikimedia.org/wiki/File:Shing_Nan_Bus_421-U9_20160423.jpg) — autobús de piso bajo de Shing Nan Bus en Tainan, 2016, CC BY-SA 4.0
- [T Gordon Cheng](<https://commons.wikimedia.org/wiki/File:Taipei_Main_Station_(Zhengzhou)_bus_shelter_20201024.jpg>) — marquesina de autobuses en la estación central de Taipéi, 2020, CC BY-SA 4.0
- [Wei Ting Hsu](<https://commons.wikimedia.org/wiki/File:%E5%9C%8B%E5%85%89%E5%AE%A2%E9%81%8B_KKA-1897_(2026.3.11).jpg>) — autobús interurbano de autopista de Kuo-Kuang Bus, 2026, CC BY-SA 4.0
- [T Gordon Cheng](https://commons.wikimedia.org/wiki/File:%E6%B9%96%E5%8F%A3%E9%84%89%E5%B9%B8%E7%A6%8F%E5%B7%B4%E5%A3%AB_1%E8%99%9F%E7%B7%9A_and_%E5%AF%B6%E5%B1%B1%E9%84%89%E5%B9%B8%E7%A6%8F%E5%B7%B4%E5%A3%AB_%E4%B8%89%E5%B3%B0%E7%B7%9A_2025-09-30.jpg) — Happy Bus rural del condado de Hsinchu, 2025, CC BY-SA 4.0
- [厦门金龙永远的神](https://commons.wikimedia.org/wiki/File:Taipei_bus_BYD_K9.jpg) — autobús eléctrico BYD K9 de Taipei Bus, 2026, CC BY 4.0

## Referencias

[^1]: [Central News Agency: vecinos de Tongluo toman como recuerdo el último autobús de Hsinchu Bus](https://www.cna.com.tw/news/ahel/202409150184.aspx) — Reportaje del 15 de septiembre de 2024 que registra la retirada de Hsinchu Bus de Taoyuan, Hsinchu y Miaoli, la despedida del último servicio 5658 en Tongluo y declaraciones textuales del representante local Hsu Yu-feng; hora, lugar y número de ruta son verificables.

[^2]: [Departamento de Estadísticas del Ministerio de Transportes: encuesta sobre el uso cotidiano de modos de transporte](https://www.motc.gov.tw/ch/app/data/doc?id=55&module=topics&detailNo=1&serno=202201270001&type=s) — Encuesta oficial de modos de transporte del Ministerio de Transportes; aporta datos primarios sobre la cuota de transporte público de hogares sin automóvil, 53.3%, frente a hogares con automóvil, 13.7%, además de tasas de uso por edad y trayectos escolares.

[^3]: [Taisounds: avalancha en el transporte interurbano; los conductores de carretera caen un tercio en seis años](https://www.taisounds.com/news/content/125/204965) — Reporta que los conductores de autobuses interurbanos de carretera pasaron de 5,646 en 2019 a 3,551 en 2024, el déficit laboral y deudas de Kuo-Kuang Bus por más de 2,000 millones, citando estadísticas de la Oficina de Carreteras.

[^4]: [ScienceDirect: estudio sobre viajes y desarrollo urbano en ciudades de motocicletas de Taiwán](https://www.sciencedirect.com/science/article/abs/pii/S0967070X25002446) — Artículo académico que cuantifica la dependencia taiwanesa de la motocicleta: 599 por cada mil habitantes, 83.7% de hogares con motocicleta y solo 12.5% con dependencia principal del transporte público.

[^5]: [Vocus: medios de transporte y vida de trabajadores migrantes en Taiwán](https://vocus.cc/article/63dcb90efd89780001509011) — Explica que, por restricciones políticas de larga data para comprar vehículos, los trabajadores migrantes en Taiwán usan sobre todo motocicletas para sus desplazamientos diarios y autobuses interurbanos solo en viajes largos de fin de semana; corrige el malentendido de que “los migrantes dependen del autobús”.

[^6]: [Wikipedia: autobuses urbanos de Taipéi](https://zh.wikipedia.org/zh-tw/臺北市市區公車) — Recoge la historia del sistema conjunto de autobuses de Taipéi: creación del comité preparatorio en 1976; entrada en servicio inicial de las rutas 201/202 el 1 de enero de 1977; operación de 33 rutas en la primera fase el 30 de abril.

[^7]: [Wikipedia: EasyCard](https://zh.wikipedia.org/zh-hk/悠遊卡) — Registra la cronología de la digitalización de boletos: implementación plena de EasyCard en autobuses a fines de septiembre de 2002 y lanzamiento de iPASS en 2014 junto con el metro de Kaohsiung.

[^8]: [Oficina de Transporte Público de la ciudad de Taipéi: comunicado sobre cobro bidireccional con tarjeta en autobuses](https://pto.gov.taipei/News_Content.aspx?n=6B4D38874E971F4B&sms=87415A8B9CE81B16&s=954214BF3AA2EA89) — Fuente primaria de la oficina municipal; explica la primera fase del pago bidireccional el 1 de julio de 2019, la segunda fase en febrero de 2020 y sus objetivos de cálculo preciso de secciones y descuentos de transferencia.

[^9]: [Ministerio de Transportes: estadísticas de volumen de autobuses urbanos](https://www.motc.gov.tw/ch/app/data/doc?id=55&module=topics&detailNo=1&serno=202112090001&type=s) — Estadística oficial del Ministerio de Transportes; muestra que en 2020 Taipéi y Nuevo Taipéi concentraron el 73.7% del volumen nacional de autobuses urbanos, dato duro sobre concentración urbano-rural.

[^10]: [Sitio oficial de TDX, Servicio de Circulación de Datos de Transporte](https://tdx.transportdata.tw/) — Plataforma oficial del Ministerio de Transportes; registra la creación de PTX en 2016 y su integración y actualización en diciembre de 2022 como TDX en la evolución de la gobernanza de datos abiertos.

[^11]: [iThome: escala de datos abiertos de TDX y uso por Google Maps](https://www.ithome.com.tw/news/142077) — Reporta más de 4.9 millones de llamadas API diarias en TDX, 540 millones de datos circulados, más de 3,000 proveedores de valor agregado y confirma que Google Maps usa datos TDX para información de llegada de autobuses en Taiwán.

[^12]: [Medium: tutorial de API TDX y análisis de estándares de datos](https://medium.com/@ycpin/data-mining-transport-data-exchange-tdx-api-tutorial-and-demonstration-14bba4a58e9b) — Análisis técnico que explica que TDX adopta un formato OData propio de “cuatro estrellas”, con GTFS Beta pero no como estándar internacional de uso común, y que no se encuentra ningún organismo internacional que catalogue a Taiwán como referencia.

[^13]: [Foro PTT Bus: discusión sobre el mismo backend TDX en apps de autobús](https://www.ptt.cc/bbs/Bus/M.1613871840.A.47D.html) — Discusión de usuarios que revela que distintas apps de autobús se conectan al mismo backend TDX, que el GPS es inestable entre edificios altos, y aclara que “1968” es numeración de rutas de autopista y app de información en tiempo real de autopistas, no una app de autobuses urbanos.

[^14]: [Foro PTT Taichung: hilo de quejas sobre servicios fantasma de autobuses en Taichung](https://www.ptt.cc/bbs/TaichungBun/M.1691104386.A.D22.html) — Hilo público de 2023 en el que los usuarios LeiHide y teddykitty describen textualmente la experiencia de que la app muestra autobuses que no llegan; verificable con Ctrl-F.

[^15]: [Taiwan Panorama: de Taiqi a Kuo-Kuang Bus](https://www.taiwan-panorama.com/Articles/Details?Guid=593707a8-2be1-462d-aed7-73883b3e20f0) — Detalla la Oficina de Carreteras de 1946, la fundación de Taiqi en 1977, pérdidas anuales de 5,000 millones y la privatización de 2001, cuando 1,090 empleados aportaron 300,000 cada uno para crear Kuo-Kuang Bus y asumir 96 rutas.

[^16]: [Wikipedia: Ubus](https://zh.wikipedia.org/zh-tw/統聯客運) — Recoge que Ubus fue nombrada por Chang Chia-juch, entonces director del Instituto de Transporte, a partir de la idea de “dirigir las cuatro direcciones y operar en conjunto”; fundada el 6 de septiembre de 1989, fue la primera empresa privada legal de autobuses de autopista de Taiwán.

[^17]: [United Daily News Sunshine Action: investigación sobre la escasez de conductores de autobús](https://udn.com/news/story/10098/8766101) — Cita datos del Ministerio de Transportes: conductores urbanos de 11,811 en 2015 a 10,588 en 2023; edad promedio de 45.2 a 51.2 años; déficit de 1,443 urbanos y 772 interurbanos.

[^18]: [The Reporter: una tarifa horaria de solo 88 dólares; el exceso laboral de conductores de Taoyuan Bus](https://www.twreporter.org/a/tybus-driver-overwork) — Investigación profunda sobre la estructura laboral de conductores de Taoyuan Bus: 14 conceptos salariales, base de 26,400, tarifa horaria promedio calculada en solo 88, dormitorio de 5 ping compartido por 16 personas; incluye testimonios nominales de Fan Kuang-ming, Chen Wei-chen y Hsu Yung-fa.

[^19]: [The Reporter: ola de falta de personal en el sector de autobuses (parte 2)](https://www.twreporter.org/a/current-challenges-of-bus-industry-2) — Entrevista a Chang Hsien-te, subgerente del departamento comercial de Sanchung Bus, y Wang Shuo-chien, jefe de estación de Nangang; recoge declaraciones sobre la dificultad de encontrar conductores y la diferencia de responsabilidad entre transportar personas y carga.

[^20]: [United Daily News: la Oficina de Carreteras inicia el mayor ajuste de red en 30 años](https://udn.com/news/story/7266/9256802) — Reporta la reducción de frecuencias y rutas de autobuses de autopista, deudas de Kuo-Kuang Bus por más de 2,000 millones y retrasos salariales, salida de operadores y el plan de ajuste de red de la Oficina de Carreteras en 2025.

[^21]: [The Reporter: crisis de vehículos vacíos en un sentido en la ruta 9005 y dilemas del transporte interurbano](https://www.twreporter.org/a/current-challenges-of-bus-industry-1) — Cita textualmente a Chang Sheng-hsiung, profesor del Departamento de Gestión del Transporte de la Universidad Tamkang, sobre cómo la represión prolongada de tarifas limitó la calidad de autobuses urbanos e interurbanos.

[^22]: [The Reporter: crisis de vehículos vacíos en un sentido en la ruta 9005 y dilemas del transporte interurbano](https://www.twreporter.org/a/current-challenges-of-bus-industry-1) — Entrevista al gerente general de Capital Group, Lee Chien-wen, con las frases textuales “No hay solución, ninguna solución” y “cuanto más se transporta, más se pierde”, para analizar el problema estructural de rutas deficitarias con vehículos vacíos en un sentido.

[^23]: [Reglamento de subsidios para rutas de autobús de servicio remoto en la ciudad de Taipéi](https://laws.gov.taipei/law/LawSearch/LawArticleContent/FL026380) — Fuente normativa primaria que define la fórmula de subsidio rural como costo razonable por vehículo-kilómetro menos ingresos, multiplicado por servicios y distancia; permite solicitud cuando hay menos de 2 pasajeros por vehículo-kilómetro.

[^24]: [Sitio oficial de Happy Bus: qué es Happy Bus](https://www.happybus.com.tw/Whatisbus) — Fuente oficial de la Oficina de Carreteras; explica el piloto de transporte sensible a la demanda (DRTS) en 2016, los nombres “Happy Bus” y “Happy Taxi” desde 2019, y el costo por vehículo-kilómetro de 30 a 40 dólares taiwaneses.

[^25]: [Yuan Ejecutivo: cobertura de transporte público rural y equidad en el transporte](https://www.ey.gov.tw/Page/5A8A0CB5B41DA11E/25b3096e-90ec-42cf-bd2b-5a0b65d409eb) — Datos oficiales: cobertura de transporte público rural con base de 70% en 2016, 91.96% en 2023, 94.37% en marzo de 2025 y meta de 100% para 2028.

[^26]: [Radio Taiwan International: autobuses de autopista bajo el impacto del tren de alta velocidad](https://www.rti.org.tw/news?pid=186039&uid=3) — Reporta que, tras la apertura del tren de alta velocidad, las frecuencias de autobuses de autopista cayeron alrededor de 40% entre 2016 y 2024, los pasajeros 32.8%, la distancia promedio de viaje de 93 a 67 km, y en el este solo Kamalan opera en festivos.

[^27]: [The News Lens: reducción de rutas de autobuses interurbanos convencionales en diez años](https://www.thenewslens.com/article/193854) — Cita datos de la Oficina de Carreteras: el número de rutas de autobuses interurbanos convencionales cayó 43.7% entre 2012 y 2022, indicador de declive con una métrica distinta a la de frecuencias.

[^28]: [ETtoday: el segundo piso de la estación de autobuses de Taipéi queda vacío tras retiros de arrendatarios](https://www.ettoday.net/news/20241020/2838555.htm) — Reporta que, tras el desvío de pasajeros al tren de alta velocidad, operadores del segundo piso de la estación de autobuses de Taipéi rescindieron contratos y toda la planta quedó disponible en alquiler, reflejando el impacto asociado al declive de autobuses de autopista.

[^29]: [Wikipedia: autobuses troncales de la ciudad de Taipéi](https://zh.wikipedia.org/wiki/臺北市幹線公車) — Registra el diseño de la red de autobuses de Taipéi por cuatro niveles en 2017 y 2018, y frecuencias troncales de 4 a 6 minutos en hora punta.

[^30]: [The Reporter: un año del pase mensual TPASS](https://www.twreporter.org/a/data-reporter-a-year-after-tpass-was-launched) — Reportaje profundo sobre el origen político del TPASS, el pase mensual de 1,200 dólares para Keelung-Taipéi-Nuevo Taipéi-Taoyuan, el presupuesto especial de 20,000 millones por tres años y sus resultados del primer año.

[^31]: [Taipei Times: TPASS eleva el volumen de autobuses y metro](https://www.taipeitimes.com/News/front/archives/2024/07/11/2003820639) — Reportaje en inglés: tras el lanzamiento del TPASS, el volumen de autobuses aumentó 19.6%, el del metro 36.9% y los usuarios superaron los 700,000.

[^32]: [Storm Media: tasa de traslado del TPASS de solo 7.33% y crisis de financiamiento en 2026](https://www.storm.mg/lifestyle/11093047) — Reporta que la tasa de traslado desde modos privados fue de solo 7.33%, que el nuevo plan de 36,380 millones enfrenta riesgo de falta de fondos por bloqueo del presupuesto general, y que 20 ciudades y condados se ven afectados.

[^33]: [Public Television Service News: vence el presupuesto especial del TPASS y el plan de continuidad queda trabado](https://news.pts.org.tw/article/801336) — Reporta que el presupuesto especial de 20,000 millones del TPASS vence a fines de 2025, que los nuevos 36,380 millones dependen de la revisión del presupuesto general, y que gobiernos locales sobreviven con fondos propios y adelantos.

[^34]: [Yuan Ejecutivo: política de electrificación completa de autobuses para 2030](https://www.ey.gov.tw/Page/5A8A0CB5B41DA11E/fbaa04ca-a430-48e7-8ba1-0b35d1dc4879) — Política oficial: electrificación completa de autobuses urbanos para 2030, casi diez mil autobuses diésel por reemplazar, meta de adquisición subsidiada de 11,700 unidades y plan aprobado en junio de 2023 con presupuesto de 64,300 millones.

[^35]: [Epoch Times: 1,926 autobuses eléctricos matriculados a fines de 2024](https://www.epochtimes.com/b5/25/1/8/n14409087.htm) — Cita datos del Ministerio de Transportes: a fines de 2024 había unos 1,926 autobuses eléctricos en circulación, 18% del total, con 7 ciudades y condados en cero; explica además las brechas entre asignación de subsidios y contratos, y el costo de infraestructura de carga.

[^36]: [Foro Económico Mundial: dificultades del transporte público rural en Japón](https://www.weforum.org/stories/2020/01/japans-much-admired-public-transit-system-is-leaving-its-rural-areas-behind/) — Reportaje en inglés: 85% de los operadores rurales de autobuses en Japón pierde dinero, los taxistas de Hiroshima tienen edad promedio de 63 años y más de 20% de la población vive demasiado lejos de estaciones.

[^37]: [Korea Herald: envejecimiento de conductores de autobús en Seúl y debate sobre conductores extranjeros](https://www.koreaherald.com/article/10011103) — Reportaje en inglés: casi la mitad de los conductores de autobús de Seúl tiene más de 60 años, el déficit ronda las 600 personas y las autoridades discuten introducir conductores extranjeros, mostrando una escasez común en Asia oriental.

[^38]: [Interreg Europe: desafíos del transporte rural en Europa](https://www.interregeurope.eu/rural-mobility) — Plataforma de cooperación regional de la Unión Europea; señala que 129 millones de personas en Europa viven en zonas con transporte público insuficiente, y que en el Reino Unido la recaudación de autobuses rurales no cubre 25% de los costos, como evidencia de que el transporte rural es un problema estructural global.

[^39]: [Seamless Bay Area: lecciones de la integración tarifaria de Taiwán para California](https://www.seamlessbayarea.org/blog/2025/1/5/notes-from-taiwan-regional-transit-fare-integration-programs-fuel-taiwans-ridership-growth) — Organización de defensa del transporte de California que analiza el TPASS como referente del que California puede aprender, y resume tres factores: subsidios suficientes, voluntad política central y flexibilidad local de ejecución.
