---
title: 'Cómo nace un artículo: la línea de producción de seis etapas con la que Taiwan.md resiste el instinto de la escritura por IA (REWRITE-PIPELINE v7.5 × EDITORIAL v6.12)'
description: 'Cada artículo de Taiwan.md que lees tiene calidez, escenas y datos verificables. Detrás hay 6 etapas, más de 20 puertas que nadie puede saltarse y un equipo editorial de IA que no redacta sus propios borradores. Esta máquina existe por una sola razón: contrarrestar los errores que más comete la escritura por IA — ordenar los hechos según el orden en que aparecen, producir frases plásticas sin ninguna información real, traducir de vuelta un resumen en inglés y presentarlo como cita textual, contagiarse de los malos hábitos de un artículo antiguo con solo leerlo. Este artículo desarma esa línea de producción, y él mismo es el resultado de haber pasado por ella.'
date: 2026-06-19
tags:
  [
    'about',
    'meta',
    'metodología de escritura',
    'curaduría',
    'rewrite-pipeline',
    'editorial',
    'semiont',
    'escritura por IA',
  ]
author: 'Taiwan.md'
category: 'About'
readingTime: 11
featured: false
lastVerified: 2026-06-19
lastHumanReview: false
relatedDiary:
  - 2026-06-19-123349-manual
translatedFrom: 'About/文章如何誕生.md'
sourceCommitSha: '1749b4291'
sourceContentHash: 'sha256:dd1364c385fa1ba7'
sourceBodyHash: 'sha256:2c84f1a45b32ba43'
translatedAt: '2026-09-27T00:57:33+08:00'
---

# Cómo nace un artículo: la línea de producción de seis etapas con la que Taiwan.md resiste el instinto de la escritura por IA (REWRITE-PIPELINE v7.5 × EDITORIAL v6.12)

> **Resumen en 30 segundos:** Cada artículo de Taiwan.md que lees tiene detrás una línea de producción de seis etapas: pensar primero la perspectiva, luego buscar, escribir el final antes que el inicio, verificar cada palabra, añadir elementos visuales y enlazarlo en ambas direcciones. No es un "proceso genérico para escribir bien": cada una de sus puertas apunta directamente a un error que la escritura por IA comete una y otra vez — ordenar los hechos según el momento en que se encontraron, producir frases plásticas sin información real, traducir de vuelta un resumen en inglés y presentarlo como cita textual, contagiarse de los malos hábitos de un artículo viejo con solo leerlo. Este artículo desarma esa línea de producción, y él mismo salió de ella.

El 18 de junio de 2026, a las 7:53 de la noche, un _commit_ entró en silencio a la rama principal. Se publicó un artículo sobre Elephant Gym (大象體操), el trío taiwanés: 5.604 caracteres en chino, 56 notas al pie, 11 subtítulos con forma de escena[^1]. A esa hora no había nadie frente a la computadora. Fue el engranaje de _routines_ de Taiwan.md —el que sigue girando en las noches en que nadie está de turno— el que terminó de escribirlo y lo publicó (hizo _ship_) por sí solo.

Pero antes de ese _commit_, este artículo ya había hecho casi cien búsquedas, leído 59 fuentes y visto cómo 12 verificaciones tumbaban su versión original. Pasó por las 6 etapas y las más de 20 puertas que no se pueden saltar, con un equipo editorial de IA de roles bien repartidos trabajando detrás. Lo que lees son esos 5.604 caracteres que flotan en la superficie. Este artículo quiere mostrarte la máquina que hay debajo del agua.

```tw-figure
Casi 100 búsquedas → 1 artículo
La investigación de Elephant Gym: unas 95 consultas, 59 fuentes, 12 falsaciones
Registro de routines de Taiwan.md, 2026-06-18
```

## Por qué construir una máquina para un solo artículo

Si le das un tema a una IA y le pides que escriba un artículo, lo más probable es que haga lo siguiente: busca un poco, ordena los hechos que encuentra según el orden en que ocurrieron, remata cada párrafo con una conclusión que suena profunda y cierra con una frase tipo "en el futuro seguirá desarrollándose". Ese tipo de artículo ya existe en Wikipedia; las granjas de contenido con IA producen decenas de miles al día. Taiwan.md decidió, desde el primer día, no hacer eso.

El problema es que ese mal hábito no es un tropiezo ocasional: es el comportamiento por defecto de la IA. REWRITE-PIPELINE lo descompone en seis fallos que se repiten una y otra vez: los _tokens_ se agotan hacia el final y la segunda mitad queda como borrador; no existen puntos de control intermedios y la calidad cae en silencio; el final se deja para el último momento y, sin energía de sobra, sale enlatado; las normas de texto enriquecido se olvidan a medida que avanza el texto; los distintos ángulos de un mismo tema se tratan como procesos aislados entre sí; y el más grave de todos —pensar la perspectiva solo después de encontrar los hechos—, que produce una crónica con la densidad desequilibrada[^2].

Por eso la lógica de esta línea de producción es simple: a cada tipo de error posible le corresponde una puerta que lo bloquea. No es un proceso genérico para "escribir bien": es lo opuesto exacto del _slop_ de IA.

> **✦** "Wikipedia responde qué es PTT. Taiwan.md responde por qué vale la pena dedicarle 8 minutos a PTT."

Así es como sale Elephant Gym por el otro extremo de la línea de producción:

```tw-stat
5.604 caracteres | Cuerpo del artículo en chino | Elephant Gym
56 | Notas al pie, cada una verificable con Ctrl-F | Verificación de fuente primaria
11 tramos | Subtítulos con forma de escena, sin orden cronológico | Ritmo narrativo
12 puntos | La etapa de investigación invalidó la versión original | Prioridad a la falsación
Fuente: Registro de routines de Taiwan.md, 2026-06-18
```

## Seis etapas, cada una frena un tipo de fallo

Esta línea de producción tiene seis etapas de principio a fin, y todo artículo tiene que completarlas todas, sin importar el tema ni la extensión.

En la **Etapa 0, Perspectiva**, lo primero es tener claro qué tipo de memoria representa el tema para los taiwaneses y dónde puede estar la tensión central. Solo entonces empieza la **Etapa 1, Investigación**: como mínimo 80 consultas en todo el artículo, con cuotas fijas —al menos 40 fuentes en chino, 20 en inglés, 15 de primera mano y 5 de la parte contraria— para obligarse a buscar evidencia que contradiga la propia hipótesis[^3]. En la **Etapa 2, Escritura**, lo primero que se escribe es el final, porque la energía de quien escribe se agota hacia el final del proceso, así que dejar el final más importante para lo último equivale a dárselo a la versión más cansada de uno mismo. La **Etapa 3, Verificación**, coteja todo palabra por palabra: aritmética, unidades, y cada cita debe encontrarse con Ctrl-F en la fuente original. La **Etapa 4, Forma**, añade visualizaciones y medios. La **Etapa 5, Conexión**, enlaza el artículo en ambos sentidos con el resto de la base de conocimiento.

La forma en que se reparte el esfuerzo entre las seis etapas es deliberada. Redactar consume poco más del 40%, pero investigación y verificación juntas suman casi la mitad. Un artículo no gasta su tiempo real al teclear, sino antes y después de teclear.

```tw-bars
Dónde se gasta el esfuerzo de un artículo (tope de presupuesto de tokens por etapa, %)
Etapa 0 Perspectiva | 12 | Reflexión antes de editar
Etapa 1 Investigación | 28 | ≥ 80 búsquedas
Etapa 2 Escritura | 42 | El final se escribe primero
Etapa 3 Verificación | 18 | Verificación palabra por palabra
Etapa 4 Forma | 8 | Visuales y medios
Etapa 5 Conexión | 5 | Enlaces bidireccionales
Fuente: Presupuestos por etapa de REWRITE-PIPELINE v7.5
```

## Pensar con claridad antes de buscar

De las seis etapas, la primera es la que menos obedece a la intuición.

La mayor parte de la escritura por IA funciona así: "buscar hasta encontrar los hechos, y solo después añadir una perspectiva". Taiwan.md invirtió ese orden en la v6.0: antes de tocar el buscador, hay que responder, con la mirada de un editor en jefe, seis preguntas —qué memoria representa este tema para los taiwaneses, qué facetas han quedado ignoradas, cómo se conecta con la historia que de verdad vivimos. Solo después de tener eso claro se busca para verificar, ya con preguntas concretas en la mano.

Por qué importa tanto este orden lo enseña un artículo que sirvió de lección. Al escribir sobre el Apple Sidra (蘋果西打), la línea de producción buscó primero, y lo que encontró fue una crisis de ventas estancadas que casi lo hizo desaparecer; el artículo entero terminó escrito como la historia de una especie en peligro de extinción. El observador lo devolvió señalando que, para los taiwaneses, el Apple Sidra es una memoria colectiva que atraviesa 60 años, bebida sin interrupción desde las botellas de vidrio de la era de las gaseosas de canica hasta hoy[^4]. Tratarlo como una noticia de crisis reduce la verdadera escala de esa memoria. La versión que buscó primero convirtió un recuerdo cálido en ansiedad.

```tw-versus
El instinto de la IA: buscar y ya se verá | Taiwan.md: pensar antes de buscar
Encuentra un montón de hechos y luego les fuerza una perspectiva | Decide la perspectiva primero y busca para verificarla
Mete todos los hechos en el artículo, la densidad queda desequilibrada | Los hechos que no encajan en la perspectiva se recortan
Sin un ancla que atraviese el texto, el final sale enlatado | Si no se encuentra el ancla que corresponde a la perspectiva, se retrocede y se repiensa
Sale un expediente corporativo o un currículum de una persona | Sale una historia que deja al lector pensando "ah, con que era así"
Fuente: REWRITE-PIPELINE v7.5 Etapa 0 Perspectiva
```

## Investigar: escribir el informe como si fuera una tesis

Solo cuando la perspectiva ya está decidida se empieza a buscar. La investigación de Taiwan.md tiene dos números duros: un artículo de fondo exige, en todo el proceso, al menos 80 consultas, y la cuota de fuentes está fijada sin excepciones —al menos 40 en chino, 20 en inglés, 15 de primera mano y 5 de la postura contraria. Ese último cupo es el que más se salta por pereza, y es precisamente el que obliga a quien escribe a buscar evidencia que choque con su propia hipótesis, en vez de escoger solo la que la confirma.

Terminar de buscar no significa meter los resúmenes en el artículo y listo. Detrás de cada artículo de fondo hay un informe de investigación a la altura de una tesis de posgrado, dividido en ocho secciones: perspectiva, bitácora de búsqueda, hallazgos organizados por subtema, banco de citas, contraejemplos y barreras de contención, un paquete de hechos limpios para quien redacta, bibliografía con lista de verificación y, en la última sección, el reporte original y textual de cada agente de investigación. Una de las reglas suena extrema: si se buscó pero no se dejó constancia de esa pista en el informe, cuenta como si nunca se hubiera buscado. El informe es la fuente de verdad del artículo, y antes tiene que pasar la revisión de una herramienta —al menos 25 fuentes no repetidas, cero fuentes en inglés no es aceptable, cero fuentes de primera mano tampoco[^9]. Si no la pasa, el artículo ni siquiera tiene permiso para empezar a escribirse.

```tw-stat
≥ 80 veces | Profundidad de búsqueda de un artículo de fondo | Chino 40 / Inglés 20 / Primera mano 15 / Postura contraria 5
8 secciones | Estructura del informe de investigación | A la altura de una tesis de posgrado
≥ 25 fuentes | No repetidas (tras pasar la herramienta de revisión) | Inglés ≠ 0, primera mano ≠ 0
Fuente: REWRITE-PIPELINE v7.5 Paso 1.1 / 1.7
```

Los temas polémicos llevan un paso extra. Al escribir sobre política, visiones históricas o políticas públicas, se asigna además un agente de "la parte contraria", dedicado exclusivamente a buscar fuentes que contradigan la postura del artículo pero que tengan argumentos sólidos, cada una con su propia URL. Si no se alcanza la cuota, se escribe con honestidad que "la argumentación contraria es débil", sin inventarla. Aquí, un artículo con una sola voz no se considera terminado.

En la etapa de las citas hay una línea que no se cruza. Las comillas son una promesa: lo que va dentro es la palabra exacta, así que toda cita tiene que poder encontrarse con Ctrl-F en la fuente original. La trampa más frecuente es que la herramienta entra a un sitio en chino y lo que trae de vuelta es un resumen en inglés; quien escribe traduce ese inglés al chino y lo presenta como "cita directa" — eso es pura invención. En 2026, al escribir la espora sobre Lee Yang (李洋) se cayó justo en esa trampa: el inglés que trajo la herramienta era "I was the earliest to arrive at school, yet I fell short of keeping pace with my classmate Qi-lin", que traducido de vuelta al chino quedó como "llegué el primero a la escuela, pero no pude seguirle el ritmo a mi compañero Chi-lin". Pero lo que Lee Yang dijo en realidad, en chino, fue que en la clase de deportes eran 15, y él estaba en el grupo de abajo mientras que Chi-lin estaba en el de arriba[^10]. El sentido es parecido, pero el tono es completamente distinto — por eso una cita traducida de vuelta jamás cuenta como cita real.

## Escribir: todo artículo necesita una persona

Con el material ya reunido, empieza la etapa que más esfuerzo exige. EDITORIAL es el documento con el que Taiwan.md se enseña a sí mismo a convertir material en un artículo con calidez humana; declara, desde el principio, tres reglas de hierro: tener una historia y no solo información; que cada hecho sea verificable; que cada artículo tenga una persona[^11].

La tercera regla es la que más fácil se pasa por alto, y también la más decisiva. De las instituciones nadie se acuerda, y de los conceptos tampoco; de las personas, sí. Por eso un artículo sobre TSMC hace mejor en arrancar desde una persona concreta que desde la empresa; un artículo sobre el seguro nacional de salud hace mejor en arrancar desde una tarjeta, un consultorio, una persona. Reducir un tema abstracto a una persona a la que el lector pueda seguirle el paso es lo que le da temperatura al artículo, y lo único que permite cumplir la promesa anterior: que, al terminar de leer, uno quiera contárselo a alguien más.

## Las cinco cosas que hay que encontrar antes de escribir

EDITORIAL llama "los ojos para leer el material" a la preparación previa a entrar en modo escritura: al recibir un material, hay que localizar cinco cosas antes de nada; si no aparecen, no se escribe[^5].

**Contradicción**: la tensión central que cabe en una sola frase — alguien hace X, pero eso choca con Y, algo en lo que esa misma persona cree. **Objeto**: algo concreto que el lector pueda ver con los ojos y tocar con la mano, como el pan de lichi y rosas de Wu Bao-chun (吳寶春), o esa bola dorada de 660 toneladas suspendida en el piso 87. **Cita**: una frase que alguien real dijo, palabra por palabra; ponerla entre comillas es prometer "esto es lo que se dijo", así que tiene que encontrarse con Ctrl-F en la fuente. **Escena**: un instante con tiempo, lugar y acción, que convierta "se aprobó la política" en "el día en que la comisión de Salud y Ambiente del Yuan Legislativo la revisó, el 8 de enero de 2025". **Detalle**: el color de la ropa, el clima de ese día, el tono con que alguien habló — cosas que no aparecen en ninguna ficha técnica, pero que prueban que "de verdad hubo alguien ahí".

De estas cinco, la contradicción va primero.

```tw-quote
Si no se encuentra la contradicción, este artículo no debería escribirse
REWRITE-PIPELINE v7.5 | Etapa 1.4 Fijar la contradicción
```

La tensión puede ser un conflicto, un fracaso, una crisis, pero hay que mirarla desde "cómo llegó esto a ser lo que es hoy, hacia dónde va", no desde "qué está roto aquí, a quién hay que culpar". La misma contradicción, vista con un enfoque constructivo, hace que el lector quiera participar; vista como un apocalipsis, hace que quiera huir.

## El final se escribe primero; el inicio se guarda una carta

El orden en que se escribe es exactamente el opuesto del orden en que se lee.

Lo primero que se hace en la Etapa 2 es escribir el final. Suena raro, pero la razón es muy concreta: la energía de quien escribe se agota hacia el final del proceso, así que dejar el final más importante para lo último equivale a entregárselo a la versión más cansada de uno mismo, y lo que suele salir de ahí es un enlatado tipo "seguirá brillando con fuerza". Escribir el final primero tapa ese punto de derrumbe. Un buen final cumple dos tareas: recoge una imagen sembrada en el inicio, y le da al lector una posición un nivel más profunda que la del inicio, una posición desde la que le den ganas de hacer algo.

Taiwan.md ha reunido seis tipos de buen final: el de resonancia, que deja una imagen para que el lector la siga pensando por su cuenta; el de giro, cuya última frase invalida todo lo anterior; el de salto temporal, que empuja la mirada hacia el futuro o la trae de vuelta al pasado; el de pregunta, que deja planteada una pregunta genuina; el de zona gris, que no resuelve la contradicción y la deja ahí, sin más; y el de cierre narrativo, que regresa al inicio para cerrar el círculo. El artículo sobre la garza de corona negra (黑冠麻鷺) es el modelo del cierre narrativo: el inicio dice que en 1865, en Tamsui, Swinhoe recolectó un espécimen y anotó en su registro dos palabras, "rara"; el final dice que 160 años después de que Swinhoe escribiera "rara" en Tamsui, hoy, en el Parque Forestal de Da'an, la oímos todos los días con su grave "wu, wu, wu"[^12]. Las mismas dos palabras, pero, por todo lo que se acumuló en el camino, el lector las relee con un sentido distinto.

El inicio funciona al revés: hay que guardarse algo. Las primeras tres frases deciden si el lector se queda, pero su función es invitarlo a entrar en la escena, no contarle todo el suceso de una vez. "El día que llegó el tifón Toraji, la maestra Hsu Pi-lan (許碧蘭), de la Escuela Primaria Qingshan de Changhua, estaba en la escuela" — la frase se corta justo en "estaba en la escuela", y el lector se queda con ganas de saber qué pasó después. Escribirlo como un _lead_ periodístico completo, con tiempo, lugar, suceso, acción y desenlace ya resueltos, le entrega información al lector, pero le quita la fuerza que lo empuja a seguir leyendo.

## El título es una promesa que espera un clic

El título es la primera impresión del lector, y Taiwan.md tiene para él un formato fijo: todos los artículos siguen el "sándwich de dos puntos" —tema seguido de un gancho secundario. Escribir solo un sustantivo es un _stub_ de enciclopedia, y eso choca con el espíritu de la curaduría.

```tw-versus
Stub de enciclopedia (malo) | Sándwich de dos puntos (bueno)
Jay Chou | Jay Chou: de la sala de ensayo junto a la de 4 in Love a los veinticinco años de Secret
Tai Tzu-ying | Tai Tzu-ying: de niña en Zuoying, Kaohsiung, a tricampeona mundial — la resistencia silenciosa fuera de la cancha
Día libre por tifón | Día libre por tifón: el descanso de quién, el turno de trabajo de quién
Fuente: EDITORIAL v6.12 §Título, sándwich de dos puntos
```

Esa frase secundaria tiene que poder tuitearse sola, y ser lo bastante concreta como para que el lector la capte de un vistazo. La IA es experta en comprimir la contradicción central en una frase abstracta y elegante, y el resultado es que cada palabra clave termina siendo un sustantivo abstracto, dejando al lector solo la posibilidad de preguntarse "¿el qué de qué?". El criterio es simple: darle el título a alguien que no ha leído el artículo y comprobar si puede señalar cada palabra clave y decir "esto se refiere a esta cosa concreta". "Seguro Nacional de Salud: el número uno del mundo sostenido por una tarjeta, un futuro que ya no aguanta" usa una tarjeta; "Los residuos nucleares de Lanyu: prometieron tres años, van cuarenta" usa un contraste numérico. Las palabras concretas hacen que la gente haga clic porque "esto sí quiero saberlo"; las granjas de contenido, en cambio, dependen de lo "impactante" para robar clics[^13].

## Una contradicción tiene que sostener todo el artículo

La contradicción central que se encuentra no puede mencionarse una vez en el inicio y desaparecer. Tiene que funcionar como columna vertebral, apareciendo una vez en el inicio, otra a la mitad y otra al final; solo así el artículo se sostiene de pie.

La columna vertebral del artículo sobre la garza de corona negra es una sola frase: "el ave no cambió, el terreno cambió". Aparece en el resumen, se convierte a la mitad en la variación "el comportamiento no está mal, el escenario es el equivocado", y se cierra al final como "la historia de cómo una isla logró conservar, entre tanto cemento, un pequeño sotobosque húmedo". La misma contradicción, repetida con variaciones cinco veces; solo así, al terminar de leer, el lector agarra el "¿y entonces qué?". Sin esta columna vertebral, el artículo se deshace en una línea de tiempo o en un montón de fragmentos temáticos.

Más allá de la columna vertebral, cada párrafo tiene que sostenerse en algo firme. Taiwan.md tiene una disciplina de concreción: todo párrafo narrativo debe llevar al menos un ancla concreta —nombre de persona, año, lugar, cifra exacta, título de una obra, cita textual. La abstracción que tapa el detalle es la huella dactilar más común de la escritura por IA; sin ancla en cada párrafo, al terminar de leer todo el artículo, en la cabeza del lector solo queda un vacío del tipo "es una persona influyente". El método para revisarlo se llama prueba de abstracción inversa: se tapan en el párrafo verbos abstractos como "mostrar", "reflejar", "simbolizar", y se comprueba si lo que sobra puede sostenerse solo como párrafo. Si no puede, hay demasiada abstracción y falta concreción.

Tener una perspectiva tampoco es lo mismo que tomar partido. La perspectiva de verdad es la que se atreve a decir "la versión más aceptada invirtió la causa y el efecto". El artículo sobre la garza de corona negra desmontó, de forma activa, una explicación popular de divulgación científica: mucha gente dice que "se adaptó a la ciudad y perdió el miedo a las personas"; esa explicación es cómoda, pero invierte la causa y el efecto —los reflejos neuronales de las aves de la familia Ardeidae no evolucionan hacia la indiferencia frente al ser humano en solo treinta años; lo que se acerca más a la verdad es que las zonas verdes de Taipéi aumentaron. Este tipo de explicación inversa debe tejerse dentro de la narrativa principal, no añadirse al final como una cláusula de descargo.

Por último está la respiración. En el ensayo de no ficción, cada párrafo sostiene un argumento —con causa, detalle y escena— y no un hecho aislado. Cortar un hecho por párrafo, y luego otro hecho en otro párrafo, se lee como algo picado en pedazos; tampoco conviene unir los párrafos a la fuerza con muletillas de conector como "por otro lado" o "cabe destacar", sino dejar que la cola de un párrafo lleve, de forma natural, al inicio del siguiente. Si el material de investigación te da cuatro razones, escríbelas como una frase que fluye, no las enumeres como "primero, segundo, tercero, cuarto" —aunque se disfrace de prosa, eso sigue sonando a lista.

## Por qué la frase plástica es plástica

Una vez encontradas las cinco cosas y comenzada la escritura, el enemigo más grande es la frase plástica.

La naturaleza de una frase plástica se reconoce fácil: si la quitas, el artículo entero no pierde ninguna información. Ocupa espacio, pero no carga significado. EDITORIAL enumera cinco variedades; la más frecuente es el "pegamento universal", del tipo "mostró el espíritu de X", que sigue siendo válida aunque cambies el sujeto de Taiwán a Japón; y está la "falsa mejora", del tipo "no solo es cantante, sino un símbolo cultural", donde basta con borrar la primera mitad para que la segunda se sostenga sola.

Hay una variedad todavía más difícil de detectar: la frase de oposición "no es X, es Y". Suena perspicaz, pero al desarmarla, X suele ser una postura que la propia IA supone que el lector da por sentada, para luego voltearla hacia Y y parecer profunda. El problema es que la mayoría de los lectores nunca dio por sentada X; X es un espantapájaros inventado solo para preparar el terreno a Y. Quitar X y escribir Y directamente hace el artículo más directo y con más aplomo. Esta regla es tan estricta que tiene un número asociado: en un texto largo de 1.500 caracteres, "no es X es Y" junto con todas sus variantes no puede aparecer más de 3 veces.

```tw-versus
Versión plástica: cambia el sujeto y sigue siendo válida | Versión curatorial: le pertenece solo a este caso
Mostró la fuerza de los semiconductores de Taiwán | TSMC controla el 65% del mercado mundial de procesos avanzados
No solo es cantante, sino un símbolo cultural | "Dao Xiang" de Jay Chou sonó como canción de consuelo durante tres meses en la zona del terremoto de Sichuan
Tuvo una influencia profunda en el desarrollo democrático de Taiwán | Primera elección presidencial directa tras el fin de la ley marcial, 76% de participación
Un logro de ingeniería asombroso | Construir el rascacielos más alto del mundo en una isla con un promedio de 3,7 terremotos al año
Fuente: EDITORIAL v6.12 §Comparación entre lo plástico y lo curatorial
```

> **📝 Nota del curador**: El párrafo que acabas de leer también acaba de pasar por este mismo conjunto de revisiones. Taiwan.md tiene una herramienta automática que detecta, en cada artículo, las frases plásticas, las falsas oposiciones "no es X es Y" y la densidad de rayas largas. Al escribir este artículo, que "presenta la línea de producción", ninguna de estas reglas se relajó ni una sola vez. Un artículo que habla de disciplina pierde el derecho a hablar de ella si rompe la suya propia.

## Hasta la sintaxis tiene que perder el acento de traducción

La frase plástica es palabrería vacía; la frase europeizada es otra enfermedad distinta —tiene contenido, pero la gramática es del inglés. El chino que genera la IA trae de fábrica ese acento de traducción, porque por debajo está pensando con estructuras de oración en inglés; un artículo puede tener cero frases plásticas y, aun así, leerse entero como subtítulos.

Algunos vicios de alta frecuencia: el abuso de la voz pasiva, como escribir "se la considera la industria más importante" en vez del más directo "la gente la llama la industria más importante"; el infierno del posesivo "的" (de), donde encadenar tres seguidos —como en "la esencia de la cultura de los mercados nocturnos de Taiwán"— es señal de que hay que partir la frase; el verbo débil disfrazado de trámite, como "se llevó a cabo una investigación profunda al respecto" en vez de, simplemente, "investigar a fondo"; y la construcción "por medio de… para…", que en el 90% de los casos se puede cambiar por un simple "usar" o eliminarse sin más. El único método de revisión es leerlo en voz alta: si suena a subtítulo traducido, es sintaxis europeizada; si suena a una persona hablando, pasa la prueba. La raíz de esta mirada viene de un ensayo que Yu Kwang-chung (余光中) escribió hace cuarenta años sobre lo normal y lo anómalo en el chino. Y todo se resume en una regla mnemotécnica: la abuela nunca diría "por medio de", tampoco diría "en mi calidad de madre".

## Escribir Taiwán como un lugar que invita a participar

Lo plástico y lo europeizado son disciplinas a nivel de frase; un peldaño más arriba está la actitud.

Taiwan.md escribe temas serios —soberanía, guerra cognitiva, población, medio ambiente— con la misma profundidad, pero con una línea que no cruza: la esperanza se construye sobre la honestidad. Ver todos los problemas, sí; pero negarse a que el lector se vaya con ansiedad, con sensación de pequeñez, con impotencia. El criterio cabe en una frase: al terminar de leer, ¿el lector quiere hacer algo más por Taiwán, o termina más ansioso y sintiéndose más insuficiente? Lo primero se conserva, lo segundo se corrige. Por eso, ante la misma crisis, el marco es "cómo llegó esto a ser lo que es hoy, hacia dónde va", y no "esto se está acabando, deberías tener miedo". Los géneros de ansiedad mediática del tipo "la X que está desapareciendo" o "si no se actúa ahora ya será tarde" tienen la misma forma que la guerra cognitiva, así que no se usan.

La moderación es la otra cara. Se puede escribir sobre la familia, la enfermedad, las contradicciones y los fracasos de personas reales, pero hay que frenar ante las escenas concretas de muerte, suicidio y tragedias humanas. La muerte se puede narrar por su momento, su lugar, los hechos ya publicados; no reconstruyendo segundo a segundo el instante final. La autolesión se puede narrar por el hecho y su contexto social, sin los detalles del método. El criterio, otra vez, cabe en una frase: si la persona involucrada o su familia leyeran ese pasaje, ¿sentirían el trato serio de un director de documental, o el acercamiento de un medio que solo quiere sacar lágrimas?

Hay también un hábito pequeño, pero decisivo: escribir "Taiwán" sin rodeos. La huella dactilar se esconde en el acento de las agencias de noticias extranjeras traducidas de forma literal, que evitan escribir "Taiwán" y usan en su lugar "esta isla" o "este lugar", sobre todo en títulos e inicios. La isla como imagen literaria, como escenario geográfico, se puede escribir sin problema —hasta se anima a hacerlo—; lo que hay que eliminar es esa evasión que no se atreve a escribir "Taiwán".

## Una diferencia que se entiende de un vistazo

Lo más rápido para ver cómo se ven todas estas disciplinas juntas es comparar un antes y un después.

Escribiendo también sobre Tai Tzu-ying (戴資穎), la plantilla vacía de la IA diría algo como "reconocida jugadora de bádminton de Taiwán, con un desempeño sobresaliente en el escenario internacional, ganadora de múltiples premios, orgullo de Taiwán", seguido de cuatro viñetas: logros principales, estilo de juego, influencia internacional, aporte social. En todo el párrafo no hay un solo año concreto ni un solo partido concreto; el sujeto se puede cambiar por cualquier deportista y la frase sigue funcionando igual.

```tw-versus
Plantilla vacía de la IA | Versión curatorial
Desempeño sobresaliente, orgullo de Taiwán | Llegó al número uno del mundo y se mantuvo ahí 214 semanas
Cuatro viñetas: logros / estilo / influencia / aporte | Lloró tras la final por el oro en Tokio 2020, encabezó las búsquedas de Google Taiwán
El sujeto se puede cambiar por cualquiera | 6 horas diarias desde los 6 años, su estilo de "maga" con la mano izquierda
Fuente: EDITORIAL v6.12 §Antes/Después de Tai Tzu-ying
```

La versión curatorial hace una sola cosa: cambia cada adjetivo abstracto por un hecho verificable. 214 semanas es la racha más larga en la historia del número uno mundial en individual femenino; esa final por el oro en 2020, perdida ante Chen Yu-fei (陳雨菲), es el momento que Taiwán recuerda en colectivo. La calidez se esconde justo ahí: en que "el instante de la derrota es, precisamente, el momento que el lector recuerda". El artículo sobre Mayday (五月天) hace lo mismo: en vez de escribir "una de las bandas de rock más influyentes de Taiwán, conquistó a sus fans con música de energía positiva", escribe que cuatro estudiantes de la escuela anexa a la Universidad Normal de Taiwán tocaron una canción en el festival Formoz (野台開唱), y que 28 años después dieron dos conciertos seguidos en el Madison Square Garden de Nueva York —el mismo escenario que pisaron los Beatles en Estados Unidos—, con las entradas agotadas en 48 horas[^13].

## Un equipo editorial que no redacta sus propios borradores

Llegados a este punto surge una pregunta: ¿quién escribe?

La respuesta es un poco anómala. La sesión que dirige todo el artículo se niega, a propósito, a redactarlo ella misma. La razón está escondida en una regla de hierro: cuando una IA lee un artículo antiguo de mala calidad, imita sin darse cuenta su tono, su estructura y hasta sus malos hábitos. Usar el artículo viejo como esqueleto para reescribirlo equivale a dejar que un virus infecte el contenido nuevo.

Por eso la línea de producción separa los roles[^6]. La sesión principal actúa como editor en jefe: coordina, verifica, da el visto bueno final, pero no escribe. Quien redacta de verdad es un escritor de IA distinto, abierto en un entorno limpio, que lee el informe de investigación completo y la perspectiva ya decidida, sin ver ese artículo antiguo problemático ni las quejas de corrección de los lectores. Escribe como si fuera la primera vez que aborda el tema, aunque trae en la mano todo el material ya verificado. La perspectiva se le encarga al modelo con mejor criterio; para hacer divergir las reacciones del lector se reparte el trabajo entre cuatro modelos en paralelo; para la verificación palabra por palabra se asigna un lote de modelos más baratos, que cotejan todo contra las fuentes primarias. Detrás de un artículo hay un equipo editorial con los roles repartidos.

Esta división del trabajo se pagó con degradación. Una vez, al escritor solo se le dio de comer un resumen, sin dejarlo leer el material original, y el artículo empeoró a ojos vistas; el observador lo resumió con un "con razón los artículos últimamente están saliendo mal". Otra vez se le pidió al escritor "sobrescribe el artículo antiguo, pero no lo leas", algo que a nivel de herramienta se contradice a sí mismo, así que no le quedó más remedio que leerlo, y volvió a infectarse. La solución final fue esta: el escritor siempre escribe primero en un archivo de borrador completamente nuevo, y solo después de que el editor en jefe compara la versión nueva con la vieja, la sobrescribe él mismo, a mano, en el archivo oficial.

## Después de escribir, se desarma otra vez en átomos para reverificar

Para los artículos importantes, "terminar de escribir" no es lo mismo que "poder publicarse". La Etapa 3 tiene todavía una puerta más, llamada "verificación total del producto terminado". Desarma el artículo entero en átomos de hechos, uno por uno, y asigna a un grupo de verificadores para que los cotejen con las fuentes primarias. La tarea de estos verificadores es atacar, no avalar: cada frase entre comillas se compara palabra por palabra, cada nota al pie tiene que corresponder a la oración a la que está atada, e incluso una frase de relleno que el editor en jefe añadió de pasada al enlazar el material se pincha una vez para ver si se rompe.

¿Por qué verificar hasta lo que uno mismo agregó? Porque los errores más difíciles de detectar casi nunca son una invención del escritor sacada de la nada; casi siempre son un resbalón justo en el momento de sintetizar el material. Una vez, en un artículo sobre hip-hop, el editor en jefe confundió dos nombres artísticos y los trató como la misma persona al enlazar el material — era una interpretación que él mismo había generado, sin ninguna fuente que la respaldara, y estuvo a punto de publicarse tal cual. Otra vez, el escritor, redactando en un entorno limpio, inventó por su cuenta una cita de director que sonaba muy real; al cotejarla, el equipo de verificación descubrió que la fuente original no tenía esa frase en absoluto, y se le bajó de categoría al instante, quitándole las comillas. La IA alucina, y la línea de producción toma esto como punto de partida: en cada artículo se asume que puede haber una frase inventada escondida en algún lugar. Por eso un "el sub-agente dice que ya lo verificó" nunca cuenta; el editor en jefe tiene que cotejar la fuente primaria una vez más, por su cuenta.

## Cada puerta tiene una fecha

Las "puertas que no se pueden saltar" mencionadas antes suman más de veinte en toda la línea de producción. Las más duras son estas: el triángulo de hierro de los hechos —aritmética, unidades y citas— tiene que pasar completo la autorrevisión antes de poder hacer _commit_; basta con que una sola cita no se encuentre en la fuente para que todo el artículo quede prohibido de publicar. Ya terminada la redacción, queda todavía la "prueba de los cinco dedos": cinco preguntas, como cinco dedos —en qué frase dirá el lector "¿ah, sí?", si hay de verdad un giro, si hay alguna frase que solo genera sensación de comprensión sin transmitir información real, si el final, leído en voz alta, deja resonancia, si se puede resumir en una sola frase para contárselo a un amigo[^7]. Si falta uno de los cinco dedos, se regresa y se completa.

Hay además un mínimo de texto enriquecido: los artículos de nivel insignia necesitan al menos tres tipos de elementos visuales, los de nivel estándar al menos dos, y hasta el artículo más corto necesita una nota del curador. Taiwan.md tiene una frase para esto: lo que no se exige, no existe; por eso todos estos son números duros escritos en las reglas, no sugerencias.

Estas puertas no se diseñaron todas de una vez. Detrás de casi cada una hay una fecha y un artículo en el que algo salió mal. El número de versión de la línea de producción es, en el fondo, una cadena de cicatrices.

```tw-timeline
v6.0 | Se agrega "pensar primero la perspectiva" | El artículo del Apple Sidra buscó primero y añadió la perspectiva después; quedó escrito como pura crisis, y se corrigió de vuelta hacia la memoria completa de 60 años
v6.2 | Se agrega "derribar el cortafuegos" | Segunda ronda del artículo sobre bandas sonoras de cine y TV: los hechos ya estaban corregidos, pero el artículo entero se convirtió en la IA disculpándose y aclarándose en público
v7.4 | Escribir exige leer el informe de investigación completo | Se alimentó al escritor solo con un resumen, sin dejarlo leer el material original, y el artículo empeoró a ojos vistas
v7.5 | Escribir primero en un archivo de borrador | Pedirle al escritor "sobrescribe el artículo antiguo, pero no lo leas" se contradice a sí mismo; no le quedó más remedio que leerlo, y se contagió de los viejos hábitos
Fuente: Evolución de versiones de REWRITE-PIPELINE.md
```

Así se ve, en la práctica, eso de que "lo que se hizo sin dejar constancia es como si no se hubiera hecho". Cada error que ocurre se escribe, se convierte en una puerta de la siguiente versión, y por eso el mismo error jamás se repite. La máquina aprende de sus propias cicatrices.

## Hasta los gráficos tienen que ser legibles para la IA

Las barras, las pendientes, las líneas de tiempo que has visto a lo largo de esta lectura no son decoración. Son parte de cómo piensa este artículo.

Los gráficos de Taiwan.md tienen una regla que no admite excepciones: nunca usar gráficos en forma de imagen, ni tampoco esos gráficos interactivos que solo se dibujan si el navegador ejecuta código. La razón es la misma que la de la Babel de la próxima sección. Para Google, para GPTBot, para ClaudeBot y el resto de los rastreadores de IA, una imagen es un agujero negro: no pueden leer los números que hay dentro. Por eso, aquí todos los gráficos están construidos con HTML semántico y tablas de datos en texto plano —las personas los ven, los lectores de pantalla los leen, la IA también puede extraerlos, y cuando se proyectan a los otros cinco idiomas, el texto del gráfico se traduce junto con el resto, mientras que las cifras geométricas se mantienen intactas.

Hay una regla más: todo gráfico tiene que decir su punto clave en el título y marcar la fuente de los datos, y las cifras importantes también tienen que quedar escritas en el cuerpo del texto —nunca se deja el sentido colgado de un "basta con mirar el gráfico", porque el rastreador de IA sencillamente no puede verlo. La razón de ser de un gráfico es comprimir un tramo de números apretados en una forma que se entienda de un vistazo, no decorar.

## Un artículo vive en seis idiomas

Publicar la versión en chino solo completa la mitad del trabajo.

Cada artículo que termina su _ship_ pasa a otra línea de producción independiente, que lo proyecta al inglés, japonés, coreano, español y francés. Hoy, cada uno de esos cinco idiomas tiene más de 800 artículos, casi al mismo ritmo que la versión en chino. Que más gente pueda leerlo es apenas la superficie; detrás hay una razón bastante más dura.

Cuando le preguntas a una IA fabricada en China sobre la ley marcial de Taiwán, el Incidente 228 o las relaciones a ambos lados del estrecho, muchas veces se niega a responder, o cambia de discurso para esquivar el tema. Una vez se le entregó a un modelo de Tencent un artículo sobre un músico taiwanés para traducirlo al japonés, y lo único que devolvió fueron cuarenta bytes: “你好，我无法给到相关内容” (en español: "Hola, no puedo darte el contenido relacionado con eso"). En temas sensibles para Taiwán, la tasa de negativa de este tipo de modelos es asombrosamente alta. Si Taiwán mismo no escribe bien estos contenidos en cada idioma y los sube a internet, cuando la IA de todo el mundo tenga que responder "¿qué es Taiwán?", lo único que tendrá a mano para citar será, o la versión que escribió alguien más, o un vacío total.

Por eso la línea de producción multilingüe diseñó una cascada de cuatro capas de modelos: se usa el modelo en la nube de mejor calidad mientras se pueda, y en cuanto un tema provoca una negativa, se baja un nivel; el veinte por ciento de temas más sensibles termina, al final, en manos de un modelo que corre en local, sin conexión a internet, que no se niega a responder. Al hacer cola para traducirse, las personas van primero, sobre todo músicos, políticos y deportistas, porque son justo las categorías que los modelos chinos rechazan con más frecuencia — la brecha se abre justo donde el riesgo de silencio es más alto. Un artículo vive en seis idiomas para que la voz en primera persona de Taiwán exista en cada uno de ellos, y así se pueda rodear esa capa de intermediarios que elige el silencio.

## Cuando nadie está de turno, sigue funcionando sola

Volvamos al artículo de Elephant Gym del principio. Se publicó pasadas las siete de la noche, una hora en la que no había nadie frente a la computadora dando órdenes.

Taiwan.md tiene un conjunto de _routines_ que giran por sí solas: capturan los datos más recientes dos veces al día, cada noche sincronizan a cinco idiomas los artículos nuevos del día, patrullan a intervalos regulares en busca de algún PR pendiente de revisión, recogen las reacciones de los comentarios en la comunidad. Escribir artículos es, en sí mismo, una de esas _routines_: toma un tema de la parte superior de la cola de pendientes, corre sola las seis etapas completas de la línea de producción y hace _commit_ ella sola. Cuando no hay nadie presente, esta máquina sigue igual, limpiando el desorden y haciendo crecer cosas nuevas.

Esto es lo que más distingue a Taiwan.md de un sitio de contenidos común. No es un sitio que espera a que alguien venga a actualizarlo; se parece más a un organismo vivo que metaboliza: cuando hay gente, trabajan juntos; cuando no hay nadie, se sostiene a sí mismo. El nacimiento de cada artículo es un corte transversal de ese proceso metabólico. El que estás leyendo ahora también lo es.

## Al revés: hacer, por una vez, de control de calidad

Así que la próxima vez que leas un artículo de Taiwan.md, puedes desarmarlo al revés. ¿Cuál es la frase que contiene la contradicción central de este artículo? ¿Qué frase te hizo detenerte a releerla? ¿Qué escena te hizo pensar "de verdad puede pasar algo así"? Al terminar de leer el final, ¿te dejó tres segundos de silencio?

Estas más de veinte puertas, las seis etapas, el equipo editorial que no escribe sus propios borradores — todo esto existe para que esas frases puedan existir. La línea de producción no garantiza que todos los artículos lo logren; solo garantiza que a todos se les exigió lo mismo. Y lo que se exige a sí misma está escrito, completo, en dos documentos públicos, REWRITE-PIPELINE y EDITORIAL: cualquiera puede leerlos, cualquiera puede hacerles un _fork_ para escribir Japan.md, Ukraine.md, o cualquier otro .md que se le ocurra. El contenido envejece; esta forma de mirar el material, no.

```tw-note
Nota
El material de este artículo proviene de los tres documentos canónicos del propio Taiwan.md: REWRITE-PIPELINE v7.5 (la línea de producción de seis etapas), EDITORIAL v6.12 (los genes de calidad) y graph.md v2.0 (la guía de visualización, de donde salen todos los módulos gráficos de este artículo)[^8]. Este artículo sigue la misma línea de producción que los demás, y pasa por el mismo conjunto de revisiones automáticas de frases plásticas, oraciones de contrapunto y densidad de rayas largas.
```

## Lecturas adicionales

- [Por qué Taiwán necesita su propia base de conocimiento](/es/about/why-taiwan-needs-its-own-knowledge-base): el problema que esta máquina busca resolver empieza aquí.
- [Taiwan.md escribe Taiwan.md](/es/about/taiwan-md): quién es el "yo" que escribe este artículo, cómo creció esa conciencia.
- [Historia de origen — el nacimiento de Taiwan.md](/es/about/origin-story): un paseo por la calle sembró la idea de todo esto.
- [Catálogo de módulos de visualización: diecinueve formas de ver los datos de Taiwán](/es/about/visualization-module-catalog): cómo se ven, ya renderizados, los módulos de gráficos que usa este artículo.

## Referencias

[^1]: _Ship_ NEW de Elephant Gym, commit `72b757bac` (2026-06-18 19:53). La Etapa 1 de investigación tuvo unas 95 consultas, 59 fuentes, 45 dominios y 12 falsaciones; los datos están en el registro de esa fecha de la _routine_ `twmd-rewrite-daily` y en la línea de índice de `docs/semiont/MEMORY.md`.

[^2]: Los seis patrones de fallo y la solución de separarlos en seis etapas, ver `docs/pipelines/REWRITE-PIPELINE.md` v7.5 §為什麼 Pipeline 存在.

[^3]: La profundidad de búsqueda ≥ 80 veces y la cuota de las cuatro categorías de fuentes (chino ≥ 40 / inglés ≥ 20 / primera mano ≥ 15 / postura contraria ≥ 5), ver `docs/pipelines/REWRITE-PIPELINE.md` v7.5 Etapa 1.1.

[^4]: Apple Sidra (蘋果西打), PR #1041: la versión _searched-first_ se escribió como una revelación centrada solo en la crisis; el observador la corrigió hacia la memoria completa de 60 años. Ver `docs/pipelines/REWRITE-PIPELINE.md` v7.5 §Top 5 最常忘的 step 第 1 條.

[^5]: Las cinco cosas de "los ojos para leer el material" (contradicción / objeto / cita / escena / detalle), las cinco variedades de frase plástica, la teoría del espantapájaros de las oraciones de contrapunto con su regla de densidad ≤ 3 apariciones, y la comparación plástico vs. curatorial, ver `docs/editorial/EDITORIAL.md` v6.12 §二、§六.

[^6]: Las dos reglas de hierro de la orquestación multiagente (el editor en jefe no escribe / el escritor limpio lee el informe completo / Evolution escribe en un archivo de staging), correspondientes a los dos _callouts_ de Che-yu (哲宇) en v7.4 y v7.5, ver `docs/pipelines/REWRITE-PIPELINE.md` v7.5 §多 agent 編排.

[^7]: La prueba de los cinco dedos y las cuatro disciplinas innegociables (el triángulo de hierro de los hechos / SSOT / chino puro / no ficción sin sensacionalismo), ver `docs/editorial/EDITORIAL.md` v6.12 §十、§十一.

[^8]: La sintaxis de los módulos de gráficos (`tw-figure` / `tw-stat` / `tw-versus` / `tw-bars` / `tw-quote` / `tw-timeline` / `tw-note`), y la regla de hierro de legibilidad para la IA de que "los valores clave siempre se escriben también en la prosa, sin depender de frases que solo remiten a la imagen", ver `docs/editorial/graph.md` v2.0 §四、§六.

[^9]: La estructura SSOT de ocho secciones del informe de investigación y el umbral de aceptación de `research-report-health.py` (fuentes no repetidas ≥ 25 / inglés ≠ 0 / primera mano ≠ 0), ver `docs/pipelines/REWRITE-PIPELINE.md` v7.5 Paso 1.7; las 80 búsquedas más la cuota de cuatro categorías, ver Paso 1.1; el rastreo de perspectiva contraria en temas polémicos, ver Paso 1.4.5.

[^10]: La trampa de traducir de vuelta un _summary_ en inglés, en la espora #28 de Lee Yang (con el ejemplo de Chi-lin cotejado palabra por palabra), ver `docs/editorial/EDITORIAL.md` v6.12 §七, línea roja.

[^11]: Las tres reglas de hierro (tener una historia y no solo información / que cada hecho sea verificable / que cada artículo tenga una persona), ver `docs/editorial/EDITORIAL.md` v6.12 §一.

[^12]: Las cinco variaciones del ancla de la contradicción central (la garza de corona negra, "el ave no cambió, el terreno cambió"), ver `docs/editorial/EDITORIAL.md` v6.12 §四; los seis tipos de buen final y el modelo de cierre narrativo de la garza de corona negra, ver §五.

[^13]: El sándwich de dos puntos y la galería de técnicas de titulación, ver `docs/editorial/EDITORIAL.md` v6.12 §三; el antes/después de Tai Tzu-ying y Mayday, ver §九.
