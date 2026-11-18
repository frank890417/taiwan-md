---
title: 'Pagos móviles en Taiwán: ¿Por qué, a pesar de tener varias aplicaciones de pago en el teléfono, seguimos llevando efectivo al salir?'
description: 'En el tercer trimestre de 2024, una muestra en línea de 5.000 encuestadas por el MIC (Instituto de Investigación y Desarrollo Industrial) reveló que el 92 % había utilizado y el 84 % usaba habitualmente pagos móviles. Sin embargo, otra encuesta nacional de adultos del Banco Central muestra que el 73,8 % sigue combinando efectivo y medios no monetarios. Este artículo desmonta las diferentes herramientas, contratos y flujos de confirmación detrás de los pagos con el móvil, responde por qué la alta tasa de penetración aún tiene dos barreras para prescindir del efectivo y explica qué ha resuelto el Código QR común (TWQR) y qué excepciones de aceptación y fallos quedan pendientes.'
date: 2026-09-01
category: 'Technology'
tags:
  [
    'Pagos móviles',
    'Pagos electrónicos',
    'TWQR',
    'Taiwan Pay',
    'Código QR',
    'Efectivo',
    'Fintech',
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
translatedAt: '2026-09-11T01:19:45+08:00'
---

# Pagos móviles en Taiwán: ¿Por qué, a pesar de tener varias aplicaciones de pago en el teléfono, seguimos llevando efectivo al salir?

![Imagen de la tienda en la miniatura de la entrevista oficial de TWQR con el cartel de pago móvil](/article-images/technology/taiwan-mobile-payments-merchant-2026.webp)
_Miniatura de la entrevista oficial de TWQR, utilizada únicamente como material de análisis de la propaganda institucional. La imagen solo representa a ese establecimiento entrevistado y no puede considerarse una evidencia de campo independiente sobre la adopción en las pequeñas tiendas de todo el país. Imagen: Corporación de Información Financiera (Sitio web oficial de TWQR), uso legítimo para comentarios._

> **Resumen en 30 segundos:** En una muestra en línea del tercer trimestre de 2024, el MIC (Instituto de Investigación y Desarrollo Industrial) reveló que el 92 % había utilizado pagos móviles. Sin embargo, una encuesta externa del Banco Central muestra que el 73,8 % de los adultos aún combinan efectivo y medios no monetarios. Las dos cifras miden poblaciones y preguntas diferentes, pero juntas apuntan a lo mismo: usar el móvil para pagar, poder completar transacciones en todas partes y sentirse seguro sin llevar efectivo son tres barreras distintas. Tener varias aplicaciones a veces compensa vacíos en la red de aceptación, a veces persigue recompensas y funciones de membresía. El TWQR está integrando el Código QR común, pero aún no ha fusionado todas las fuentes de fondos, los contratos de las tiendas y los escenarios de fallos en un solo método de pago.

En septiembre de 2025, Hu Zi-li (胡自立), analista senior de industria del MIC, publicó una encuesta sobre los consumidores de pagos móviles. Observó que los usuarios activos instalan más de cinco herramientas, «principalmente para poder usar pagos móviles en diferentes canales».[^1] Esta afirmación se asemeja mucho a lo que muchas personas hacen frente al mostrador: primero miran qué logotipos están pegados en la puerta de cristal o en el mostrador, y luego deciden desbloquear qué aplicación. Si no encuentran un logotipo familiar, levantan la vista y preguntan: «¿Qué tipo de pago aceptan aquí?».

Las opciones en el teléfono aumentan, pero en la billetera aún quedan algunos billetes. Esta imagen coexistente se interpreta fácilmente como que el mercado de pagos en Taiwán es demasiado fragmentado, o también se usa desde el otro lado para describirlo como una simple elección de promociones. Ambas explicaciones capturan una parte de la realidad. Las fricciones institucionales en la aceptación e interoperabilidad ciertamente llevan a instalar más herramientas y a conservar el efectivo, pero las recompensas, la membresía, las transferencias, los hábitos, las preferencias personales y la redundancia ante fallos también están actuando simultáneamente. Para entender esto claramente, debemos desglosar las tres barreras: si las personas lo adoptan, si las transacciones son universales entre diferentes escenarios, y si, ante un fallo en la transacción, se puede restaurar un estado que permita al usuario sentirse seguro dejando el último billete en casa.

## Que el móvil pueda pagar no significa que hoy sea suficiente con llevar solo el móvil

El 92 % de «uso previo» y el 84 % de «uso habitual» publicados por el MIC provienen de una muestra en línea de 5.000 encuestas durante dos meses en el tercer trimestre de 2024. La página pública no enumera completamente el marco de muestreo, el rango de edad y los métodos de ponderación, por lo que estas dos proporciones solo pueden describir esa muestra en línea y no pueden escribirse directamente como la tasa de penetración de toda la población de Taiwán.[^2] Incluso manteniendo esta limitación, sigue mostrando que en el grupo de consumidores que llena encuestas en línea, el pago con el móvil ya ha superado la etapa de tecnología extraña.

Otra encuesta realizada por el Banco Central y encargada al Instituto de Economía de Taiwán pregunta cómo utilizan el efectivo y los medios no monetarios en su vida diaria las personas mayores de 18 años. La encuesta se basa en teléfonos fijos y móviles, con internet como complemento, cubre 22 condados y ciudades, y se pondera según la estructura demográfica, con una muestra efectiva de 4.234 personas. Los resultados muestran que el 73,8 % utiliza simultáneamente efectivo y medios no monetarios, el 25 % solo usa efectivo y solo el 1,2 % usa exclusivamente medios no monetarios.[^3] Los medios no monetarios aquí también incluyen tarjetas de crédito, tarjetas financieras y tarjetas de recarga, por lo que no se pueden usar como cuota de mercado de pagos móviles, pero son muy adecuados para describir la forma actual de la billetera.

```tw-waffle
La mezcla es el día a día de la mayoría (%)
Usan efectivo y no efectivo | 73.8
Solo usan efectivo | 25
Solo usan no efectivo | 1.2
Fuente: Encuesta de herramientas de pago externa del Banco Central, publicada en 2024
```

Por lo tanto, que una persona use el móvil en una cafetería de cadena por la mañana, escanee códigos para acumular puntos en el almuerzo y pague en efectivo en el mercado por la tarde, no tiene ninguna contradicción. Ya ha superado la primera barrera de «las personas saben usarlo», pero aún debe cambiar de herramienta según el lugar, la tienda y el equipo. La frase «siguen llevando efectivo» del título solo puede entenderse como una redundancia a escala de escenarios, no como una necesidad diaria e idéntica para cada taiwanés.

Los hábitos de pago han cambiado, pero las excepciones de escenario aún permanecen en el camino. Instalar varias aplicaciones parece poder compensar cada excepción, pero para entender por qué puede suplir esa función, primero debemos reconocer que esas aplicaciones no son lo mismo. El momento de abrir el teléfono es similar, pero el camino posterior de la transacción puede ser completamente diferente.

## Varias aplicaciones parecen estar pagando, pero detrás no siguen el mismo camino

Los materiales didácticos de la Comisión de Supervisión Bancaria y Financiera (FSB) dividen las tarjetas de crédito móviles, las tarjetas financieras móviles, la escaneo de códigos QR, las instituciones de pago electrónico y los bonos electrónicos según la herramienta de vinculación, la tecnología y la normativa aplicable.[^4]

Lo que el consumidor hace en el frente puede ser simplemente apoyarse, escanear o presionar un botón de confirmación, pero en la parte trasera puede estar completado por diferentes herramientas de vinculación, tecnología, terminal de cobro y reglas. Pagar desde el móvil puede implicar el uso de una tarjeta vinculada o una cuenta de pago electrónico. La terminal de cobro y las especificaciones a las que se conecta el comerciante determinarán qué combinaciones están disponibles. LINE Pay,街口 (Jiekou), Apple Pay, Fullpay (全支付) y Taiwan Pay no pueden simplemente alinearse como cinco billeteras homogéneas basadas en sus logotipos. Algunas compiten entre sí, otras cooperan en capas dentro de una misma transacción y otras se complementan en diferentes canales.

Si desea ver cómo plataformas como PChome, Shopee y KooChang modifican el escenario de las compras en línea, consulte la lectura complementaria [Ecosistema de comercio electrónico y pagos digitales en Taiwán](/es/technology/e-commerce-and-digital-payment-ecosystem). Este artículo se detiene solo en la última milla del cobro físico.

Por lo tanto, tener una determinada marca en el teléfono solo responde si el usuario tiene la herramienta, pero no responde directamente si el comerciante se ha conectado a una terminal de cobro compatible. Ver el mismo código QR no significa que cada aplicación, dirección de escaneo y fuente de fondos puedan completar la transacción. Saltar directamente desde el icono del móvil a «disponible en todo el país» omite al menos tres capas: la herramienta de vinculación, el contrato del comerciante y las especificaciones de la transacción.

La cantidad de aplicaciones también debe recuperar la exageración del «promedio de cinco». La muestra en línea de 2024 del MIC muestra que el 86 % utiliza cinco o menos aplicaciones, de las cuales el 61 % utiliza tres o menos, y el 14 % utiliza más de seis. Los datos públicos no muestran la media ni la mediana, ni la distribución completa de uno a cinco aplicaciones.[^5] Puede apoyar el uso múltiple, pero no puede moldear a un «usuario típico» que tenga exactamente cinco aplicaciones instaladas.

La tabla mensual de junio de 2026 de la FSB suma las declaraciones de las instituciones de pago electrónico a 41,129 millones. Esto es el total de las instituciones, no el número de personas naturales descontado entre instituciones. Mide una instantánea contractual y no puede responder cuántas herramientas tiene instaladas un usuario típico.[^6]

> **📝 Nota del curador**
> El logotipo en el mostrador es una marca, lo que se muestra en el móvil es una interfaz, y lo acumulado en las tablas de la FSB es un conjunto de contratos de cuenta aún no terminados. Llamar a estos tres elementos con el mismo «número de usuarios» aplanaría el nivel más valioso para entender el mercado de pagos.

Lo que parece similar en el frente, las diferencias emergen cuando la transacción llega al otro extremo. Descargar tantas aplicaciones como el usuario quiera no puede completar la solicitud, confirmación y conciliación para la tienda. La segunda barrera está justo detrás del mostrador.

## Lo que el consumidor ve es un solo escaneo, pero la tienda debe conectar todo el proceso

Para aceptar Taiwan Pay, una tienda debe primero solicitar a una institución financiera adquirente convertirse en un comerciante firmado, obtener el código de la institución adquirente, el código del comerciante y el código del terminal, y luego completar el registro del servicio.[^7] Una vez que comienza a cobrar, el equipo y la red deben funcionar, el empleado debe saber cómo confirmar la notificación y gestionar devoluciones, y la parte trasera debe completar la conciliación y el desembolso. Para una pequeña tienda, pegar el código de cobro es solo el comienzo, seguido de un flujo de operaciones que debe cerrarse diariamente.

La sección de preguntas frecuentes (FAQ) para comerciantes de Taiwan Pay describe de manera muy específica el momento más fácil de ocultar detrás de un código QR: cuando el dispositivo está fuera de línea, el comerciante aún puede generar un código QR sin monto en la página de inicio de sesión para que el consumidor lo escanee, pero el teléfono del comerciante no recibe la notificación de la transacción.[^8] La pantalla del cliente muestra que ya se pagó, pero la terminal de cobro pierde la notificación en ese momento, por lo que el mostrador debe decidir si dejar pasar la mercancía y dónde verificar esa transacción. Escanear el código es solo el inicio de la acción; la confirmación en el acto y la verificación posterior son lo que hacen que la transacción se asiente realmente.

Taiwan Pay deja las tarifas a discreción del contrato entre el comerciante y la institución adquirente; la explicación oficial es «las tarifas de procesamiento de transacciones se establecen según el contrato entre el comerciante (receptor) y la institución adquirente (banco)». Otros planes públicos, las negociaciones de precios de las cadenas y las diferentes fuentes de pago tienen sus propias condiciones.[^9] Las comisiones de manejo entrarán en el juicio del comerciante, pero también entrarán los tiempos de desembolso, devoluciones, red, equipo, clientela, aprendizaje y conciliación.

Una investigación académica sobre comerciantes en barrios comerciales de Tainan incluso descubrió que la utilidad percibida, la facilidad de uso, la adopción por parte del consumidor y la compatibilidad tienen una correlación positiva con la intención de adopción, mientras que el costo percibido no tuvo una relación significativa en esa muestra.[^10] Esto también indica que los comerciantes no solo asumen costos; también miden si la herramienta es fácil de usar y si los clientes ya la han adoptado. Esta investigación local no se puede extrapolar a todo el país, pero es suficiente para detener la explicación única de «los comerciantes no aceptan solo por las tarifas».

La encuesta externa del Banco Central dio magnitud a las diferencias de aceptación. De 611 muestras de vendedores ambulantes, el 76,1 % solo acepta efectivo. De 1.436 muestras de tiendas, esta proporción es del 46,8 %. El informe conecta la proporción más alta de vendedores ambulantes con el lugar, el equipo y el tamaño.[^11] El «solo acepta efectivo» aquí es relativo a todas las herramientas no monetarias, no se puede inferir hacia atrás como la tasa de aceptación de pagos móviles ni se puede usar para criticar la falta de voluntad de progreso de los vendedores ambulantes.

```tw-bars
Vendedores ambulantes y tiendas, las condiciones de aceptación son diferentes (solo efectivo, %)
Muestra de vendedores ambulantes | 76.1 | 611 muestras
Muestra de tiendas | 46.8 | 1.436 muestras
Fuente: Encuesta de herramientas de pago externa del Banco Central, publicada en 2024
```

La universalidad del pago debe completarse desde ambos extremos: el consumidor tiene la herramienta y el comerciante también tiene el proceso continuo de cobro, confirmación, devolución y conciliación. Las fricciones institucionales aquí ya tienen forma, pero aún solo explican una parte de la coexistencia de múltiples aplicaciones y efectivo. La siguiente aplicación a veces es un neumático de repuesto, a veces es más como una tarjeta de membresía.

## Instalar una aplicación más a veces es para poder usarla, a veces es solo para usarla mejor

Cuando la encuesta del Banco Central preguntó sobre las dificultades de uso de los pagos móviles, el 18,9 % eligió que la tienda no lo acepta, el 12,0 % eligió que la tienda no acepta la herramienta habitual del usuario, y solo el 7,6 % fue que hay demasiadas variedades en el mercado. La mala señal de red ocupó el 6,5 % y la batería del móvil se agotó el 3,4 %.[^12] Todos estos son autoinformes de selección múltiple y no se pueden considerar como proporciones causales de los factores que generan transacciones en efectivo, pero muestran que existe una brecha real entre «tener una aplicación» y «que esta aplicación en la mano funcione».

Lo que Hu Zi-li llama «diferentes canales» corresponde exactamente a esta motivación de suplencia. Si una tienda no acepta la herramienta habitual, el usuario puede instalar otra. Las reuniones de amigos requieren dividir la cuenta, los familiares quieren transferir puntos, lo que también puede dejar otra aplicación. La misma serie de encuestas del MIC indica que el 57 % de los usuarios han utilizado servicios financieros de pago distintos al consumo, siendo los más comunes la división de cuentas y la transferencia de puntos, que ocupan el 38 %.[^13] Estas funciones hacen que las aplicaciones de pago entren en la vida social y de membresía, y las razones para tenerlas van mucho más allá de si se puede escanear en el mostrador.

En un estudio transnacional de cuatro lugares encargado por Visa en 2022, se entrevistó a 1.000 encuestados taiwaneses, de entre 18 y 55 años, de los cuales el 40 % realiza un seguimiento regular de los puntos de consumo y el 22 % calcula meticulosamente para obtener las mejores recompensas.[^14] Estos datos no pueden estimar «cuántas personas instalan aplicaciones adicionales por las recompensas», pero solo muestran que algunos encuestados realizan un seguimiento de puntos y calculan beneficios para obtener recompensas. El ecosistema de membresía minorista también creará sus propias herramientas de pago. Si desea ver cómo Fullmart (全聯) ha pasado de su red de tiendas y gestión de membresía a una plataforma de vida de alta frecuencia, consulte [Fullmart (全聯)](/es/economy/pxmart-supermarket), aquí no se reescribe la historia de la empresa ni las controversias.

La encuesta sobre el sector minorista del Ministerio de Economía ofrece cambios aún más largos. Calculando el monto del pago en la muestra de la tabla de retorno, la proporción de uso de pagos móviles por parte de los consumidores aumentó del 0,6 % en 2017 al 11,2 % en 2023, mientras que el efectivo bajó del 41,1 % al 23,0 %. Las autoridades atribuyen parcialmente los cambios en el comercio minorista de productos de uso diario y la industria de cosméticos y productos farmacéuticos al ecosistema de membresía y a las herramientas de pago autoconstruidas por los operadores.[^15] La proporción de pagos móviles se expandió y, simultáneamente, la proporción de efectivo disminuyó. La competencia de múltiples marcas ciertamente crea opciones. Si solo se diagnostica la multiplicidad de aplicaciones como un fallo institucional, esta trayectoria ascendente y las preferencias activas de los usuarios se perderían.

```tw-slope
Proporción del monto de pago minorista: aumento de pagos móviles, disminución de efectivo (%)
2017 | 2023
*Pagos móviles | 0.6 | 11.2
Efectivo | 41.1 | 23.0
Fuente: Oficina de Estadísticas del Ministerio de Economía, Encuesta de la situación operativa de la industria mayorista, minorista y de restauración
```

Las múltiples herramientas desempeñan así dos roles: una compensa los vacíos en la aceptación y las fuentes de fondos, la otra soporta descuentos, puntos, membresía y transferencias. El número de aplicaciones por sí solo no mide la distancia hacia la penetración, la universalidad o la ausencia de efectivo. Después de que la competencia y la suplencia se entrelazan, la pregunta recae en qué nivel se ha logrado la integración.

## La integración del TWQR con el Código QR común no ha fusionado todos los pagos en uno

El TWQR es una respuesta sustantiva a «demasiadas especificaciones de pago, demasiados carteles en las tiendas». Este estándar de Código QR común conecta las instituciones financieras y las instituciones de pago electrónicas participantes. A finales de 2025, los datos del Banco Central enumeran 44 instituciones financieras, 10 instituciones de pago electrónico y 678.000 comercios asociados. Las transacciones de todo 2025 sumaron 146,73 millones de transacciones y 713,6 mil millones de yuanes.[^16] «Taiwán QR no puede interoperar en absoluto» ya no se ajusta a la realidad.

![Ilustración oficial del sistema de pagos múltiples de un contrato del TWQR](/article-images/technology/taiwan-mobile-payments-single-contract-2026.webp)
_Material de explicación del sistema oficial del TWQR «un contrato, pagos múltiples», que presenta el método de conexión del comerciante defendido por la Corporación Financiera. Esta es una ilustración de propaganda institucional y no puede demostrar de forma independiente que cada tienda asociada esté activa, que cada transacción tenga éxito o que todas las fuentes de pago estén interconectadas. Imagen: Corporación de Información Financiera (Sitio web oficial de TWQR), uso legítimo para comentarios._

El Código QR común ha resuelto una capa importante, pero la página de adquirente pública del Banco Cooperativo (Cooperativa de Taiwán) también muestra que los límites persisten. La lista de «escaneo principal» en esa página enumera 11 herramientas como Taiwan Pay, Jiekou, Fullpay, EasyWallet (悠遊付) y iPass (一卡通). La lista de «escaneo secundario» es más corta y limita la especificación QR Auth. Fullpay, A-Mei Card (愛金卡) y Fullpay (全盈支付) aparecen en la lista de escaneo principal, pero no en la lista de escaneo secundario de esa página.[^17] La dirección de escaneo, las especificaciones y la participación de las instituciones cambiarán la combinación disponible, y los comerciantes aún deben solicitar el TWQR a la institución adquirente.

678.000 es el número de comercios asociados; esta datos públicos del Banco Central no proporciona cuántas tiendas están activas continuamente, ni la proporción de todo el mercado ni la tasa de éxito en el sitio. El Código QR común tampoco unifica automáticamente las fuentes de fondos como tarjetas de crédito o cuentas, los puntos de membresía, las recompensas, los contratos de las tiendas, las tarifas y los procesos de devolución. Avanza los carteles y las especificaciones de transacción hacia un nivel común, pero no aplanará completamente el mundo comercial de cada aplicación.

> **📝 Nota del curador**
> El logro más reconocible del TWQR se esconde en el alcance de las palabras «común»: el Código QR común y los mensajes interinstitucionales han formado una base de gran escala, pero la activación diaria de las tiendas asociadas, cada fuente de fondos y cada conjunto de reglas de membresía siguen siendo determinados por otras capas. La universalidad se está construyendo capa por capa.

La barrera de interoperabilidad se ha desplazado hacia adelante, pero el número de tiendas asociadas no se convierte automáticamente en que cada persona, cada transacción y cada fuente de fondos sean utilizables. Cuando la ingeniería de integración aún está en curso, el hecho de que el efectivo permanezca tiene otra explicación.

## El efectivo no demuestra que los pagos móviles hayan fallado, usualmente aún no necesita preguntar si se puede usar primero

Para que una herramienta sea universal, al menos debe permitir que el usuario la obtenga, que la tienda la identifique y confirme, que la transacción se complete, y también debe tener un método de recuperación predecible cuando el móvil se queda sin batería, la red es inestable o la notificación falla. Esto significa que ambas partes saben dónde consultar, cuándo reintentar y por qué camino cambiar si falla. Después de completar la transacción, si ambas partes pueden consultar el mismo registro también es parte de la recuperación.

Con esta regla, los pagos móviles ya han acortado el tiempo de cobro en gran parte del consumo diario, pero aún no pueden ofrecer el mismo camino para cada escenario. En la mayoría de las transacciones pequeñas cara a cara, el efectivo no requiere registro ni dispositivo, la entrega y la confirmación ocurren simultáneamente, por lo que sigue sirviendo como la interfaz común mínima. También tiene costos de cambio, custodia y recuento; aquí se comparan las barreras de aceptación y fallos, no los costos operativos totales.

La encuesta externa del Banco Central introdujo diferencias humanas en el papel del efectivo: las proporciones de solo uso de efectivo son más altas entre los encuestados mayores de 40 años y de las áreas remotas. Los datos apoyan diferencias direccionales, pero no se pueden extender a un único retrato de todos los ancianos o residentes de áreas rurales.[^18] Esta ronda de investigación tampoco tiene suficientes datos para asignar proporciones o inventar voces para menores, personas con discapacidad, trabajadores migrantes y turistas de corta estancia. Que las herramientas populares sean convenientes para algunas personas no significa que todos puedan obtener la misma cuenta, tarjeta, teléfono o red.

Los usuarios pesados pueden, efectivamente, no tocar billetes durante mucho tiempo en cadenas familiares y círculos de vida. Otra persona conserva el efectivo, quizás solo por hábito, preferencia de privacidad o control de gastos, y no porque haya fallado en un pago. Las fricciones institucionales, la aceptación por parte del comerciante, las recompensas, la membresía, los hábitos, las preferencias y la resiliencia ante fallos actúan conjuntamente; las encuestas existentes no pueden ordenarlas en una única clasificación causal.

La barrera de penetración pregunta cuántas personas saben usarla. La barrera de universalidad pregunta si diferentes personas y tiendas pueden completar transacciones entre escenarios. Para prescindir del efectivo, aún debemos preguntar si se puede recuperar después de un fallo. Cuanto más avanzan las dos primeras barreras, menos personas llevarán efectivo, pero cuándo se aleja el último billete de la billetera depende de si las excepciones se han reducido a un punto en el que la redundancia ya no vale la pena.

El siguiente es un escenario hipotético basado en las limitaciones de desconexión de las preguntas frecuentes oficiales, no un caso real: el teléfono del comerciante está fuera de línea, la página de inicio de sesión aún puede mostrar un código QR sin monto. El cliente escanea el código, pero el comerciante no recibe la notificación de depósito. Ambos miran sus respectivas pantallas, la transacción se queda atascada entre «puede pagar» y «puede confirmar en el acto». El cliente finalmente guarda el móvil y saca un billete. Ese billete no le juzga la victoria o la derrota a la tecnología; simplemente, en este escenario, aún no necesita preguntar primero: «¿Qué tipo de pago aceptan aquí?».

## Lecturas complementarias

- [Ecosistema de comercio electrónico y pagos digitales en Taiwán](/es/technology/e-commerce-and-digital-payment-ecosystem) — Revise la guerra de plataformas y logística de los e-commerce en Taiwán durante veinte años.
- [Desarrollo de la Fintech en Taiwán](/es/economy/taiwan-fintech-development) — Devuelva los casos de pago al desarrollo de diez años de la Fintech en Taiwán entre la apertura y el control de riesgos.
- [Fullmart (全聯)](/es/economy/pxmart-supermarket) — Vea cómo Fullmart ha pasado de su red de tiendas y gestión de membresía a una plataforma de vida de alta frecuencia.

## Fuentes de imágenes

- Imagen principal: Corporación de Información Financiera (Sitio web oficial de TWQR), [fuente original](https://www.twqr.com.tw/), comentario editorial de uso legítimo. La imagen original es la miniatura del video oficial «La verdad en el corazón de los dueños de tienda | Ri Yue Xiang Meat Floss», este artículo solo se utiliza para comentar la propaganda del sistema TWQR.
- Imágenes internas: Corporación de Información Financiera (Sitio web oficial de TWQR), [fuente original](https://www.twqr.com.tw/), comentario editorial de uso legítimo. La imagen original es la ilustración oficial del sistema «un contrato, pagos múltiples».

## Referencias

[^1]: [Encuesta de consumidores de pagos móviles 2025 del MIC](https://mic.iii.org.tw/research.aspx?id=730) — Hu Zi-li explica que los usuarios activos instalan más herramientas para diferentes canales y publica los métodos de encuesta, tasas de adopción y rangos de cantidad.

[^2]: [Encuesta de consumidores de pagos móviles 2025 del MIC](https://mic.iii.org.tw/research.aspx?id=730) — Datos recopilados en el tercer trimestre de 2024, encuesta en línea, muestra efectiva de 5.000. El 92 % de uso previo y el 84 % de uso habitual se limitan a esa muestra.

[^3]: [Resultados de la encuesta externa sobre el tema del BCDC del Banco Central](https://knowledge.cbc.gov.tw/uploads/20240613/d2196a6b-784b-45ea-b559-10b824915887.pdf) — Métodos de encuesta, muestra y explicación de ponderación, así como los resultados de que el 73,8 % mezcla, el 25 % solo usa efectivo y el 1,2 % solo usa no efectivo.

[^4]: [Materiales didácticos de pagos móviles de la FSB](https://moneywise.fsc.gov.tw/uploaddowndoc?file=financeroom%2F202001131202240.pdf&filedisplay=%E6%96%B0%E5%A2%9E%E6%95%99%E6%9D%90PPT-+%E8%A1%8C%E5%8B%95%E6%94%AF%E4%BB%98-%E5%AE%9A%E7%A8%BF.pdf&flag=doc) — Divide tarjetas de crédito móviles, tarjetas financieras móviles, escaneo de códigos QR, instituciones de pago electrónico y bonos electrónicos según la herramienta de vinculación, tecnología y normativa.

[^5]: [Encuesta de consumidores de pagos móviles 2025 del MIC](https://mic.iii.org.tw/research.aspx?id=730) — Publica la distribución de rangos de cinco o menos, tres o menos y más de seis en 2024, sin publicar la media ni la mediana.

[^6]: [Información importante de las cuentas de pago electrónico de junio de 2026 de la Oficina Bancaria de la FSB](https://www.fsc.gov.tw/userfiles/file/BB-1156_%E9%9B%BB%E5%AD%90%E6%94%AF%E4%BB%98%E5%B8%B3%E6%88%B6%E9%87%8D%E8%A6%81%E8%B3%87%E8%A8%8A%E6%8F%AD%E9%9C%B2.pdf) — Suma total de 41.128.870, nota al pie define como el número de usuarios registrados y abiertos por cada institución y cuyo contrato no ha terminado.

[^7]: [Preguntas frecuentes de operación de comerciantes de pagos móviles en Taiwán](https://www.twmp.com.tw/Faq?n=95c7608a1dfc4fa1834f4467d41a32d1) — Explica que los comerciantes deben firmar con la institución financiera adquirente y obtener los códigos de la institución adquirente, comerciante y terminal.

[^8]: [Preguntas frecuentes de cobro para comerciantes de pagos móviles en Taiwán](https://www.twmp.com.tw/Faq?n=29250e1aae5e4963a550de09d86a26be) — Explica que cuando el dispositivo está fuera de línea, aún se puede generar un código QR sin monto, pero no se puede iniciar sesión ni recibir notificaciones de transacciones.

[^9]: [Preguntas frecuentes de cobro para comerciantes de pagos móviles en Taiwán](https://www.twmp.com.tw/Faq?n=29250e1aae5e4963a550de09d86a26be) — El oficial indica explícitamente que las tarifas de procesamiento de transacciones se establecen según el contrato entre el comerciante y el banco adquirente, no se puede inferir como una tarifa unificada de todo el mercado.

[^10]: [Investigación sobre la adopción de pagos móviles en comerciantes de barrios comerciales de Tainan de la Universidad Nacional Cheng Kung](https://researchoutput.ncku.edu.tw/en/studentTheses/what-factors-affect-stores-willingness-to-adopt-mobile-payment-de/) — El resumen de la tesis doctoral enumera los factores significativos y no significativos de la intención de adopción, el alcance de la investigación se limita a la muestra de barrios comerciales de Tainan.

[^11]: [Resultados de la encuesta externa sobre el tema del BCDC del Banco Central](https://knowledge.cbc.gov.tw/uploads/20240613/d2196a6b-784b-45ea-b559-10b824915887.pdf) — Muestras de 611 vendedores ambulantes y 1.436 tiendas, y conecta la diferencia de solo efectivo con el lugar, el equipo y el tamaño.

[^12]: [Encuesta de herramientas de pago contenida en el Informe de Estabilidad Financiera del Banco Central](https://www.cbc.gov.tw/tw/dl-207586-2f35d674d8a34ee09d1d1c0fd68a6fea.html) — El gráfico enumera las dificultades de selección múltiple como la no aceptación por parte de la tienda, la no aceptación de la herramienta habitual, demasiadas variedades, señal y batería del móvil.

[^13]: [Encuesta de consumidores de pagos móviles 2025 del MIC](https://mic.iii.org.tw/research.aspx?id=730) — La encuesta enumera servicios financieros distintos al pago de consumo, donde la división de cuentas y la transferencia de puntos son los tipos más comunes.

[^14]: [Estudio de consumidores de billeteras móviles y pagos electrónicos de Visa Taiwán 2022](https://www.visa.com.tw/about-visa/newsroom/press-releases/nr-tw-230310.html) — Revela la proporción de seguimiento de recompensas y cálculo de beneficios en una muestra de 1.000 taiwaneses de 18 a 55 años.

[^15]: [Nota de prensa PDF sobre la proporción de pagos móviles en el sector minorista de la Oficina de Estadísticas del Ministerio de Economía](https://www.moea.gov.tw/Mns/populace/news/wHandNews_File.ashx?file_id=116845) — Proporción del monto de pago en 2017 y 2023 de la Encuesta de la situación operativa de la industria mayorista, minorista y de restauración y la explicación del ecosistema de membresía.

[^16]: [Informe anual 2025 del Banco Central](https://www.cbc.gov.tw/tw/dl-225165-b56d9b5e547843a4822acd679cb4868e.html) — Enumera las instituciones participantes del TWQR a finales de 2025, comercios asociados, así como el número y monto de transacciones de todo el año.

[^17]: [Servicio de cobro interinstitucional TWQR del Banco Cooperativo (Cooperativa de Taiwán)](https://www.tcb-bank.com.tw/company-banking/credit-card/special-store/twqr) — Divide las instituciones disponibles para escaneo principal y secundario, especificaciones QR Auth y métodos de solicitud del comerciante, mostrando que la interoperabilidad se divide por dirección y especificación.

[^18]: [Resultados de la encuesta externa sobre el tema del BCDC del Banco Central](https://knowledge.cbc.gov.tw/uploads/20240613/d2196a6b-784b-45ea-b559-10b824915887.pdf) — El informe presenta diferencias direccionales de edad y región, este artículo no inventa proporciones o voces específicas de ciertos grupos basándose en esto.
