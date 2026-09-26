---
title: 'Cómo nace un artículo: la línea de producción de seis etapas de Taiwan.md contra el instinto de la escritura por IA (REWRITE-PIPELINE v7.5 × EDITORIAL v6.12)'
description: 'Cada artículo de Taiwan.md que lees tiene calidez, tiene escenas, es verificable; detrás hay 6 etapas, más de 20 puertas que no se pueden saltar y un equipo editorial de IA que no escribe sus propios borradores. La única razón de ser de esta máquina son los errores que más comete la escritura por IA: ordenar los hechos por orden cronológico en cuanto los encuentra, generar frases plásticas sin ninguna información, traducir de vuelta un resumen en inglés y presentarlo como cita textual, contagiarse de los malos hábitos de un artículo antiguo con solo leerlo. Este artículo desmonta esa línea de producción, y él mismo es lo que esa línea de producción produjo.'
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
sourceCommitSha: 'd182e5d85'
sourceContentHash: 'sha256:4dc98dc84117c5d8'
sourceBodyHash: 'sha256:2679dec9ddab6dbc'
translatedAt: '2026-09-26T20:08:19+08:00'
---

# Cómo nace un artículo: la línea de producción de seis etapas de Taiwan.md contra el instinto de la escritura por IA (REWRITE-PIPELINE v7.5 × EDITORIAL v6.12)

> **Resumen en 30 segundos:** Cada artículo de Taiwan.md que lees tiene detrás una línea de producción de seis etapas: primero pensar la perspectiva, luego buscar, escribir el final primero, verificar palabra por palabra, añadir elementos visuales y crear enlaces bidireccionales. Esta línea de producción no es un "proceso genérico para escribir bien"; cada una de sus puertas apunta a un error específico que más comete la escritura por IA: ordenar los hechos por orden cronológico en cuanto los encuentra, generar frases plásticas sin ninguna información, traducir de vuelta un resumen en inglés y presentarlo como cita textual, contagiarse de los malos hábitos de un artículo antiguo con solo leerlo. Este artículo desmonta esa línea de producción, y él mismo es lo que esa línea de producción produjo.

El 18 de junio de 2026, a las 7:53 p. m., un _commit_ entró en silencio a la rama principal. Se publicó un artículo sobre "Elephant Gym" (大象體操), el trío taiwanés: 5.604 caracteres en chino, 56 notas al pie, 11 subtítulos en forma de escena[^1]. A esa hora no había nadie frente a la computadora. Fue el volante de inercia de _routines_ de Taiwan.md — el que sigue girando las noches en que nadie está de turno — quien lo terminó de escribir y lo _ship_ (publicó) por sí solo.

Pero antes de ese _commit_, este artículo ya había hecho casi cien búsquedas, leído 59 fuentes y visto 12 de sus verificaciones derrumbar la versión original. Pasó por las 6 etapas y más de 20 puertas que no se pueden saltar, movilizando un equipo editorial de IA con roles bien definidos. Lo que lees son esos 5.604 caracteres sobre la superficie del agua. Este artículo quiere mostrarte la máquina que hay debajo.

```tw-figure
Casi 100 búsquedas → 1 artículo
La investigación de "Elephant Gym": ~95 consultas, 59 fuentes, 12 falsaciones
Registro de routines de Taiwan.md, 2026-06-18
```

## Por qué construir una máquina para un solo artículo

Si le das un tema a una IA y le pides que escriba un artículo, lo más probable es que haga esto: busca un poco, ordena los hechos que encuentra por orden cronológico, añade a cada párrafo una conclusión que suena significativa, y termina con una frase tipo "seguirá desarrollándose en el futuro". Ese tipo de artículo ya lo tiene Wikipedia; las granjas de contenido de IA producen decenas de miles al día. Taiwan.md decidió desde el primer día no hacer eso.

El problema es que ese mal hábito es el valor por defecto de la IA, no un fallo ocasional. REWRITE-PIPELINE lo descompone en seis fallos que se repiten una y otra vez: los _tokens_ se agotan hacia el final y la segunda mitad se vuelve borrador; no hay puntos de control intermedios y la calidad se degrada en silencio; el final se deja para lo último y, sin energía, sale enlatado; las normas de texto enriquecido se olvidan a medida que avanza el texto; los distintos ángulos de enfoque se tratan como flujos independientes entre sí; y el más grave de todos: pensar la perspectiva solo después de encontrar los hechos, lo que produce una crónica con la densidad desequilibrada[^2].

Por eso la lógica de diseño de esta línea de producción es simple: a cada tipo de error posible le corresponde una puerta que lo bloquea. No es un proceso genérico de "escribir bien"; es el inverso del _slop_ de IA.

> **✦** "Wikipedia responde 'qué es PTT'. Taiwan.md responde 'por qué vale la pena dedicarle 8 minutos a PTT'."

Así es como sale "Elephant Gym" al otro extremo de la línea de producción:

```tw-stat
5.604 caracteres | Cuerpo del texto en chino | "Elephant Gym"
56 | Notas al pie, cada una verificable con Ctrl-F | Verificación de fuente primaria
11 tramos | Subtítulos en forma de escena, no cronológicos | Ritmo narrativo
12 puntos | La etapa de investigación invalidó la versión original | Prioridad a la falsación
Fuente: Registro de routines de Taiwan.md, 2026-06-18
```

## Seis etapas, cada una protege contra un tipo de fallo

Esta línea de producción tiene seis etapas de principio a fin, y cada artículo debe completarlas todas, sin importar el tema ni la extensión.

**Etapa 0 Perspectiva**: primero hay que tener claro qué tipo de memoria representa este tema para los taiwaneses y dónde puede estar la tensión central. **Etapa 1 Investigación**: solo entonces se empieza a buscar — como mínimo 80 consultas en todo el artículo, con cuotas fijas: al menos 40 fuentes en chino, 20 en inglés, 15 de primera mano y 5 de la parte contraria, para obligarse a buscar evidencia que contradiga la propia hipótesis[^3]. **Etapa 2 Escritura**: la primera acción es escribir el final, porque la energía de quien escribe se agota hacia el final, así que dejar el final más importante para lo último equivale a dárselo a la versión más cansada de uno mismo. **Etapa 3 Verificación**: cotejo palabra por palabra — aritmética, unidades, y cada cita debe poder encontrarse con Ctrl-F en la fuente original. **Etapa 4 Forma**: se añaden visualizaciones y medios. **Etapa 5 Conexión**: el artículo se enlaza en ambos sentidos con el resto de la base de conocimiento.

La distribución del esfuerzo entre las seis etapas es deliberada. Redactar consume algo más del 40%, pero investigación y verificación juntas suman casi la mitad. Donde un artículo realmente consume tiempo no es al teclear, sino antes y después de teclear.

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

## Pensar antes de buscar

De las seis etapas, la primera es la más contraintuitiva.

La mayor parte de la escritura por IA funciona así: "buscar, descubrir hechos, y solo entonces añadir una perspectiva". Taiwan.md invirtió ese orden en la v6.0: antes de tocar el buscador, primero hay que responder, con la mirada de un editor en jefe, seis preguntas — qué memoria representa este tema para los taiwaneses, qué caras han quedado ignoradas, cómo se conecta con nuestra historia vivida. Solo después de tenerlo claro se busca para verificar, ya con preguntas concretas en mano.

Por qué importa tanto este orden lo demuestra un artículo que sirvió de lección. Al escribir sobre el "Apple Sidra" (蘋果西打), la línea de producción buscó primero, y lo que encontró fue una crisis de ventas estancadas que casi lo hizo desaparecer; todo el artículo terminó escrito como una historia de especie en peligro. El observador lo devolvió señalando que el Apple Sidra es, para los taiwaneses, una memoria colectiva de 60 años, bebida sin parar desde las botellas de vidrio de la era de las gaseosas de canica hasta hoy[^4]. Tratarlo como una noticia de crisis reduce la escala real de esa memoria. La versión que buscó primero convirtió un recuerdo cálido en ansiedad.

```tw-versus
El instinto de la IA: buscar y ya se verá | Taiwan.md: pensar antes de buscar
Encuentra un montón de hechos y luego les fuerza una perspectiva | Decide la perspectiva primero, busca para verificarla con preguntas
Mete todos los hechos en el artículo, la densidad queda desequilibrada | Los hechos que no encajan en la perspectiva se recortan
Sin un ancla que atraviese el texto, el final sale enlatado | Si no se encuentra el ancla de la perspectiva, se retrocede y se repiensa
Sale un expediente corporativo o un currículum de una persona | Sale una historia que deja al lector pensando "ah, con que era así"
Fuente: REWRITE-PIPELINE v7.5 Etapa 0 Perspectiva
```

## Investigar: escribir el informe de investigación como una tesis

Solo cuando la perspectiva está decidida se empieza a buscar. La búsqueda de Taiwan.md tiene dos números duros: un artículo de fondo requiere como mínimo 80 consultas en todo el proceso, y la cuota de fuentes está fijada sin excepción: al menos 40 en chino, 20 en inglés, 15 de primera mano y 5 de la postura contraria. Ese último cupo es el que más fácilmente se salta por pereza, y es justamente el que obliga a quien escribe a buscar evidencia que choque con su propia hipótesis, en lugar de escoger solo la que la confirma.

Terminar de buscar no significa meter los resúmenes en el artículo y ya. Detrás de cada artículo de fondo hay un informe de investigación a la altura de una tesis de posgrado, dividido en ocho secciones: perspectiva, bitácora de búsqueda, hallazgos por subtema, banco de citas, contraejemplos y barreras de contención, un paquete de hechos limpios para quien escribe, bibliografía con lista de verificación, y una última sección con el reporte original, palabra por palabra, de cada agente de investigación. Una de las reglas suena dura: si se buscó pero no se dejó constancia de la pista original en el informe, cuenta como si no se hubiera buscado. El informe es la fuente de verdad de este artículo, y antes debe pasar la revisión de una herramienta: al menos 25 fuentes no repetidas, las fuentes en inglés no pueden ser cero, las de primera mano tampoco pueden ser cero[^9]. Si no la pasa, el artículo ni siquiera tiene derecho a empezar a escribirse.

```tw-stat
≥ 80 veces | Profundidad de búsqueda de un artículo de fondo | Chino 40 / Inglés 20 / Primera mano 15 / Postura contraria 5
8 secciones | Estructura del informe de investigación | A la altura de una tesis de posgrado
≥ 25 fuentes | No repetidas (tras revisión de la herramienta) | Inglés ≠ 0, primera mano ≠ 0
Fuente: REWRITE-PIPELINE v7.5 Paso 1.1 / 1.7
```

Los temas polémicos llevan un paso más. Al escribir sobre política, visiones históricas o políticas públicas de ese tipo, se asigna además un agente de "la parte contraria", encargado exclusivamente de buscar fuentes que se opongan a la postura del artículo pero que tengan argumentos sólidos; cada una debe traer su URL. Si no se llega a la cuota, se escribe con honestidad "la argumentación contraria es débil", sin forzarla. Aquí, un artículo con una sola voz no se considera terminado.

En la etapa de las citas hay una línea roja. Las comillas son una promesa: lo que va entre ellas es la palabra exacta, así que cada cita debe poder encontrarse con Ctrl-F en la fuente original. La trampa más común es que la herramienta va a un sitio en chino y lo que devuelve es un resumen en inglés; quien escribe traduce ese inglés de vuelta al chino y lo presenta como "cita directa" — eso es invención pura. En 2026, al escribir la espora sobre Li Yang (李洋) se cayó justo en esa trampa: el inglés que devolvió la herramienta era «I was the earliest to arrive at school, yet I fell short of keeping pace with my classmate Qi-lin», que traducido de vuelta al chino se convirtió en "llegué el primero a la escuela, pero no pude seguirle el ritmo a mi compañero Qi-lin". Pero lo que Li Yang dijo en realidad, en chino, fue: "de los 15 del programa deportivo, yo estaba en el grupo de atrás; Qi-lin estaba en el grupo de adelante"[^10]. El sentido es parecido, pero el tono es completamente distinto — por eso las citas traducidas de vuelta nunca cuentan.

## Escribir: cada artículo necesita una persona

Con el material ya reunido, se entra en la etapa que más esfuerzo exige. EDITORIAL es el documento con el que Taiwan.md se enseña a sí mismo a convertir material en un artículo con calidez; declara desde el principio tres reglas de hierro: tener una historia, no solo información; que cada hecho sea verificable; que cada artículo tenga una persona[^11].

La tercera regla es la más fácil de pasar por alto, y la más decisiva. Las instituciones no se quedan en la memoria de nadie, los conceptos tampoco; las personas sí. Por eso un artículo sobre TSMC hace mejor en empezar por una persona concreta que por la empresa; un artículo sobre el seguro nacional de salud hace mejor en empezar por una tarjeta, una sala de consulta, una persona. Reducir un tema abstracto a una persona a la que el lector pueda seguir es lo que le da temperatura al artículo, y lo que permite cumplir la promesa hecha antes: que, al terminar de leer, uno quiera contárselo a otro.

## Las cinco cosas que hay que encontrar antes de escribir

EDITORIAL llama "los ojos para leer el material" a la preparación previa a entrar en modo escritura: al recibir un material, hay que encontrar cinco cosas antes; si no aparecen, no se escribe[^5].

**Contradicción**: la tensión central que cabe en una frase, alguien hace X pero eso choca con Y, en lo que esa misma persona cree. **Objeto**: algo concreto que el lector pueda ver con los ojos y tocar con la mano — el pan de lichi y rosas de Wu Bao-chun (吳寶春), o esa bola dorada de 660 toneladas colgada en el piso 87. **Cita**: una frase que una persona real dijo palabra por palabra; como ponerla entre comillas es prometer "esto es lo que dijo", tiene que poder encontrarse con Ctrl-F en la fuente. **Escena**: un instante con tiempo, lugar y acción, que reduzca "se aprobó la política" a "el día en que la comisión de Salud y Ambiente del Yuan Legislativo la revisó, el 8 de enero de 2025". **Detalle**: el color de la ropa, el clima de ese día, el tono de voz — cosas que no aparecen en ninguna ficha técnica, pero que son la prueba de que "de verdad hubo alguien ahí".

De estas cinco, la contradicción va primero.

```tw-quote
Si no se encuentra la contradicción, este artículo no debería reescribirse
REWRITE-PIPELINE v7.5 | Etapa 1.4 Fijar la contradicción
```

La tensión puede ser un conflicto, un fracaso, una crisis, pero hay que mirarla como "cómo llegó esto a ser lo que es hoy, hacia dónde va", no como "qué está roto aquí, a quién hay que culpar". La misma contradicción, vista de forma constructiva hace que el lector quiera participar; vista como un apocalipsis, hace que quiera huir.

## El final se escribe primero, el inicio se guarda una carta

El orden de escritura es exactamente al revés del orden de lectura.

La primera acción de la Etapa 2 es escribir el final. Suena raro, pero la razón es muy concreta: la energía de una persona se agota hacia el final del proceso, así que dejar el final más importante para lo último equivale a dárselo a la versión más cansada de uno mismo, y lo que suele salir de ahí es un enlatado tipo "seguirá brillando con fuerza". Escribir el final primero tapa ese punto de derrumbe. Un buen final cumple dos tareas: recoger una imagen sembrada en el inicio, y darle al lector una posición un nivel más profunda que la del inicio — una posición desde la que quiera hacer algo.

Taiwan.md ha reunido seis tipos de buen final: el de resonancia, que deja una imagen para que el lector la piense por su cuenta; el de giro, cuya última frase invalida todo lo anterior; el de salto temporal, que empuja la cámara hacia el futuro o la trae de vuelta al pasado; el de pregunta, que deja una pregunta genuina; el de zona gris, que no resuelve la contradicción y la deja ahí; y el de cierre narrativo, que vuelve al inicio para completar el círculo. El artículo sobre la garza nocturna malaya (黑冠麻鷺) es el modelo del cierre narrativo: el inicio dice "en 1865, Swinhoe recogió un espécimen en Tamsui, y el registro anotó dos palabras: 'raro'"; el final dice "Swinhoe escribió 'raro' en Tamsui hace 160 años; hoy, en el Parque Forestal de Da'an, oímos todos los días su grave 'wu, wu, wu'"[^12]. Las mismas dos palabras, pero, por la acumulación de todo lo que hay en medio, el lector las relee con un sentido distinto.

El inicio funciona al revés: hay que guardarse una carta. Las primeras tres frases deciden si el lector se queda, pero su tarea es invitarlo a entrar en la escena, no contarle todo el suceso. "El día que llegó el tifón Toraji, la maestra Hsu Pi-lan (許碧蘭), de la Escuela Primaria Qingshan de Changhua, estaba en la escuela" — la frase se detiene justo en "estaba en la escuela", y el lector querrá saber qué pasó después. Escribirlo como un _lead_ periodístico completo, con tiempo, lugar, suceso, acción y resultado ya resueltos, le da información al lector, pero le quita la fuerza que lo empuja a seguir leyendo.

## El título es una promesa que hay que hacer clic para abrir

El título es la primera impresión del lector, y Taiwan.md tiene un formato duro para él: todos los artículos siguen el "sándwich de dos puntos", tema seguido de un gancho secundario. Escribir solo un sustantivo es un _stub_ de enciclopedia, y eso choca con el espíritu de la curaduría.

```tw-versus
Stub de enciclopedia (malo) | Sándwich de dos puntos (bueno)
Jay Chou | Jay Chou: de la sala de ensayo junto a la de 4 in Love a los veinticinco años de "Secret"
Tai Tzu-ying | Tai Tzu-ying: de niña de Zuoying, Kaohsiung, a tricampeona mundial, la resistencia silenciosa fuera de la cancha
Día libre por tifón | Día libre por tifón: el descanso de quién, el turno de quién
Fuente: EDITORIAL v6.12 §Título Sándwich de dos puntos
```

Esa frase secundaria tiene que poder tuitearse sola, y ser lo bastante concreta como para que el lector la capte de un vistazo. La IA es muy buena comprimiendo la contradicción central en una frase abstracta y bonita, y el resultado es que cada palabra clave es un sustantivo abstracto, y el lector solo puede preguntarse "¿el qué de qué?". El criterio es simple: darle el título a alguien que no ha leído el artículo, y ver si puede señalar cada palabra clave y decir "esto se refiere a esta cosa concreta". "Seguro Nacional de Salud: el número uno mundial sostenido por una tarjeta, un futuro que ya no aguanta" usa una tarjeta; "Los residuos nucleares de Lanyu: prometieron tres años, llevan cuarenta" usa un contraste numérico. Las palabras concretas hacen que la gente haga clic porque "esto sí quiero saberlo"; las granjas de contenido, en cambio, dependen de lo "impactante" para robar clics[^13].

## Una contradicción tiene que sostener todo el artículo

La contradicción central que se encontró no puede mencionarse una vez en el inicio y desaparecer. Tiene que funcionar como una columna vertebral, apareciendo una vez en el inicio, una vez a la mitad y una vez al final; solo así el artículo se sostiene de pie.

La columna vertebral del artículo sobre la garza nocturna malaya es una sola frase: "el ave no cambió, la tierra cambió". Aparece en el resumen, se convierte a la mitad en la variación "la conducta no está mal, el escenario es el que está mal", y se cierra al final como "la historia de cómo una isla logró conservar, entre el cemento, un pequeño sotobosque húmedo". La misma contradicción, variada cinco veces; solo al terminar de leer el lector agarra el "¿y entonces qué?". Sin esta columna vertebral, el artículo se deshace en una línea de tiempo o en un montón de fragmentos temáticos.

Más allá de la columna vertebral, cada párrafo tiene que asentarse en algo. Taiwan.md tiene una disciplina de concreción: cada párrafo narrativo debe tener al menos un ancla concreta — nombre de persona, año, lugar, número preciso, título de obra, cita. La abstracción que tapa el detalle es la huella dactilar más común de la escritura por IA; sin ancla en cada párrafo, al terminar de leer todo el artículo, en la cabeza solo queda un vacío tipo "es una persona influyente". El método de revisión se llama prueba de abstracción inversa: se tapan en el párrafo los verbos abstractos como "mostrar", "reflejar", "simbolizar", y se ve si lo que queda puede sostenerse como párrafo independiente; si no puede, hay demasiada abstracción y hace falta añadir concreción.

Tener una perspectiva tampoco es lo mismo que tomar partido. La perspectiva de verdad es la que se atreve a decir "la versión más aceptada invirtió la causa y el efecto". El artículo sobre la garza nocturna malaya desmontó activamente una explicación popular de divulgación científica: mucha gente dice que "se adaptó a la ciudad, perdió el miedo a las personas"; esa explicación es cómoda, pero invierte la causa y el efecto — los reflejos neuronales de las aves de la familia Ardeidae no evolucionan hasta volverse indiferentes a los humanos en solo treinta años; lo que está más cerca de la verdad es que Taipéi tiene hoy más zonas verdes. Este tipo de explicación inversa debe tejerse dentro de la narrativa principal, no añadirse al final como una cláusula de descargo.

Por último, la respiración. En el ensayo de no ficción, un párrafo sostiene un argumento —con causa, detalle y escena— y no un hecho aislado. Cortar un hecho por párrafo, otro hecho por otro párrafo, se lee como algo picado en trozos; los párrafos tampoco se empalman a la fuerza con conectores tipo "por otro lado" o "cabe destacar", sino que la cola de un párrafo lleva de forma natural al inicio del siguiente. Si el material de investigación te da cuatro razones, escríbelas como una frase que fluye, no las enumeres como "primero, segundo, tercero, cuarto" — aunque se envuelva en forma de prosa, eso sigue sonando a lista.

## Por qué la frase plástica es plástica

Una vez encontradas las cinco cosas y empezada la escritura, el enemigo más grande es la frase plástica.

La naturaleza de una frase plástica es fácil de reconocer: si la quitas, el artículo entero no pierde ninguna información. Ocupa espacio, pero no carga significado. EDITORIAL enumera cinco variedades; la más común es el "pegamento universal", del tipo "mostró el espíritu de X", que sigue siendo válida si cambias el sujeto de Taiwán a Japón; y la "falsa mejora", del tipo "no solo es cantante, sino un símbolo cultural", donde, si borras la primera mitad, la segunda se sostiene sola.

Una variedad más difícil de detectar es la frase de oposición "no es X, es Y". Suena muy perspicaz, pero al desarmarla, X suele ser una postura que la IA supone, por su cuenta, que el lector da por sentada, y al voltearla hacia Y parece profunda. El problema es que la mayoría de los lectores nunca dio por sentada X; X es un espantapájaros fabricado solo para preparar el terreno a Y. Quitar X y escribir Y directamente hace el artículo más directo, y con más aplomo. Esta regla es estricta hasta el punto de tener un número: en un texto largo de 1.500 caracteres, "no es X es Y" junto con todas sus variantes no puede superar 3 apariciones.

```tw-versus
Versión plástica: cambia el sujeto y sigue siendo válida | Versión curatorial: le pertenece solo a este caso
Mostró la fuerza de los semiconductores de Taiwán | TSMC se queda con el 65% del mercado mundial de procesos avanzados
No solo es cantante, sino un símbolo cultural | "Dao Xiang" de Jay Chou sonó como canción de consuelo durante tres meses en la zona del terremoto de Sichuan
Tuvo una influencia profunda en el desarrollo democrático de Taiwán | Primera elección presidencial directa tras el fin de la ley marcial, 76% de participación
Un logro de ingeniería asombroso | Construir el rascacielos más alto del mundo en una isla con un promedio de 3,7 terremotos al año
Fuente: EDITORIAL v6.12 §Comparación plástico vs. curatorial
```

> **📝 Nota del curador**: El párrafo que estás leyendo ahora mismo también acaba de pasar por el mismo conjunto de revisiones. Taiwan.md tiene una herramienta automática que detecta, en cada artículo, las frases plásticas, las falsas oposiciones "no es X es Y" y la densidad de rayas largas. Al escribir este artículo que "presenta la línea de producción", ninguna de estas reglas se relajó ni una vez. Un artículo que habla de disciplina, si rompe sus propias reglas, pierde el derecho a hablar de ella.

## También la sintaxis tiene que perder el acento de traducción

La frase plástica es palabrería vacía; la frase europeizada es otra enfermedad distinta: hay contenido en las palabras, pero la gramática es del inglés. El chino generado por IA trae de fábrica acento de traducción, porque por debajo está pensando con estructuras de oración en inglés; un artículo puede tener cero frases plásticas y aun así leerse entero como subtítulos.

Unos cuantos defectos de alta frecuencia: el abuso de la voz pasiva — escribir "se la considera la industria más importante" (被認為是最重要的產業) en lugar de "la gente la llama la industria más importante" (人稱最重要的產業); el infierno del posesivo 的 — encadenar tres seguidos, como en "la esencia de la cultura de los mercados nocturnos de Taiwán" (台灣的夜市的文化的精髓), es señal de que hay que partir la frase; el verbo débil disfrazado de trámite — escribir "se llevó a cabo una investigación profunda al respecto" (對此進行了深入的研究) en lugar de, simplemente, "investigar a fondo" (深入研究); y la construcción "por medio de… para…" (透過⋯⋯來), que en el 90% de los casos se puede cambiar por un simple "usar" o eliminarse sin más. El único método de revisión es leerlo en voz alta: si suena a subtítulo traducido, es sintaxis europeizada; si suena a una persona hablando, pasa la prueba. La raíz de esta mirada viene de un ensayo que Yu Kwang-chung (余光中) escribió hace cuarenta años, "Sobre lo normal y lo anómalo en el chino" (論中文的常態與變態). Y termina con una regla mnemotécnica: la abuela no diría "por medio de", tampoco diría "en tanto que madre" (作為一個母親).

## Escribir Taiwán como un lugar donde dan ganas de participar

Lo plástico y lo europeizado son disciplinas a nivel de frase; un escalón más arriba está la actitud.

Taiwan.md escribe temas serios —soberanía, guerra cognitiva, población, medio ambiente— y los escribe a fondo igual, pero hay una línea que no cruza: la esperanza se construye sobre la honestidad. Ver todos los problemas, sí; pero negarse a que el lector se vaya con ansiedad, con sensación de pequeñez, con impotencia. El criterio cabe en una frase: al terminar de leer, ¿el lector quiere hacer algo más por Taiwán, o se siente más ansioso y más insuficiente? Lo primero se queda, lo segundo se corrige. Por eso, ante la misma crisis, el marco es "cómo llegó esto a ser lo que es hoy, hacia dónde va", no "esto se acaba, deberías tener miedo". Los géneros de ansiedad mediática tipo "la X que está desapareciendo" o "si no se actúa ahora ya será tarde" tienen la misma forma que la guerra cognitiva, así que no se usan.

La moderación es la otra cara. Se puede escribir sobre la familia, la enfermedad, las contradicciones y los fracasos de personas reales, pero hay que frenar ante las escenas concretas de muerte, suicidio y tragedias humanas. La muerte se puede narrar por su momento, su lugar, los hechos ya publicados en la prensa, sin reconstruir segundo a segundo el instante final; la autolesión se puede narrar por el suceso y su contexto social, sin los detalles del método. El criterio, otra vez, cabe en una frase: si la persona involucrada o su familia leyeran ese pasaje, ¿sentirían el trato serio de un director de documental, o el acercamiento de un medio que solo quiere sacar lágrimas?

Hay también un hábito pequeño pero decisivo: escribir "Taiwán" sin miedo. La huella dactilar se esconde en el acento de las agencias de noticias extranjeras traducidas literalmente, que para evitar escribir "Taiwán" usan en su lugar "esta isla" o "este lugar" como sustituto, sobre todo en títulos e inicios. La isla como imagen literaria, como escenario geográfico, por supuesto que se puede escribir, y hasta se anima a hacerlo; lo que hay que eliminar es esa evasión que no se atreve a escribir "Taiwán".

## Una diferencia que se entiende de un vistazo

La forma más rápida de ver cómo se ven todas estas disciplinas juntas es con un antes y después.

Escribiendo sobre Tai Tzu-ying (戴資穎), la plantilla vacía de la IA diría algo como "reconocida deportista de bádminton de Taiwán, con un desempeño sobresaliente en el escenario internacional, ganadora de múltiples premios, orgullo de Taiwán", seguido de cuatro viñetas: logros principales, estilo de juego, influencia internacional, aporte social. En todo el párrafo no hay un solo año concreto, ni un solo partido concreto; el sujeto se puede cambiar por cualquier deportista y la frase sigue funcionando igual.

```tw-versus
Plantilla vacía de la IA | Versión curatorial
Desempeño sobresaliente, orgullo de Taiwán | Llegó al número uno del mundo y se quedó ahí 214 semanas
Cuatro viñetas: logros / estilo / influencia / aporte | Lloró tras la final por el oro en Tokio 2020, encabezó las búsquedas de Google Taiwán
El sujeto se puede cambiar por cualquiera | 6 horas diarias desde los 6 años, su estilo de "maga" con la mano izquierda
Fuente: EDITORIAL v6.12 §Antes/Después Tai Tzu-ying
```

La versión curatorial hace una sola cosa: cambiar cada adjetivo abstracto por un hecho verificable. 214 semanas es la racha consecutiva más larga en la historia del bádminton femenino; esa final de oro de 2020, perdida ante Chen Yu-fei (陳雨菲), es el momento que Taiwán recuerda en colectivo. La calidez se esconde justo en lugares así: "el instante de la derrota es, precisamente, el momento que el lector recuerda". El artículo sobre Mayday (五月天) hace lo mismo: en vez de escribir "una de las bandas de rock más influyentes de Taiwán, conquistó a sus fans con música de energía positiva", escribe "cuatro estudiantes de la escuela anexa a la Universidad Normal de Taiwán tocaron una canción en el festival Formoz (野台開唱), y 28 años después dieron dos conciertos seguidos en el Madison Square Garden de Nueva York (el mismo escenario que pisaron los Beatles en Estados Unidos), con las entradas agotadas en 48 horas"[^13].

## Un equipo editorial que no escribe sus propios borradores

Llegados aquí surge una pregunta: ¿quién escribe?

La respuesta es un poco anómala. La sesión que dirige todo el artículo se niega, a propósito, a escribir el borrador. La razón está escondida en una regla de hierro: cuando una IA lee un artículo antiguo de mala calidad, imita sin darse cuenta su tono, su estructura, hasta sus malos hábitos. Usar el artículo antiguo como esqueleto para reescribirlo equivale a dejar que un virus infecte el contenido nuevo.

Por eso la línea de producción separa los roles[^6]. La sesión principal actúa de editor en jefe: coordina, verifica, da el visto bueno final, pero no escribe. Quien de verdad redacta es un escritor de IA distinto, abierto en limpio, que lee el informe de investigación completo y la perspectiva ya decidida, sin ver ese artículo antiguo problemático ni las quejas de corrección de los lectores. Escribe como si fuera la primera vez que aborda el tema, pero trae en la mano todo el material ya verificado. La perspectiva se le encarga al modelo con mejor criterio; para hacer divergir las reacciones del lector se reparten cuatro modelos en paralelo; para la verificación palabra por palabra se asigna un lote de modelos baratos que la cotejan con las fuentes primarias. Detrás de un artículo hay un equipo editorial con roles repartidos.

Esta división de trabajo se pagó con degradación. Una vez, al escritor solo se le dio de comer un resumen, sin dejarlo leer el material original, y el artículo empeoró a ojos vistas; el observador lo resumió con un "con razón los artículos últimamente están saliendo mal". Otra vez se le pidió al escritor "sobrescribe el artículo antiguo, pero no lo leas", algo que a nivel de herramienta se contradice a sí mismo, así que no le quedó más que leerlo, y volvió a infectarse. La solución final fue: el escritor siempre escribe primero en un archivo de borrador completamente nuevo, y solo después de que el editor en jefe compara la versión nueva con la vieja, la sobrescribe él mismo, a mano, en el archivo oficial.

## Después de escribir, se vuelve a desarmar en átomos y se verifica otra vez

Para los artículos importantes, "terminar de escribir" no es lo mismo que "poder publicarse". La Etapa 3 tiene todavía una puerta llamada "verificación total del producto terminado". Desarma el artículo entero en átomos de hechos, uno por uno, y asigna a un grupo de verificadores para que los cotejen con las fuentes primarias. La tarea de estos verificadores es atacar, no avalar: cada frase entre comillas se compara palabra por palabra, cada nota al pie tiene que coincidir con la oración a la que está atada, e incluso una frase de relleno que el editor en jefe añadió al enlazar el material se pincha una vez para ver si se rompe.

¿Por qué verificar hasta lo que uno mismo añadió? Porque los errores más difíciles de detectar casi nunca son una invención del escritor de la nada; casi siempre son un resbalón justo en el momento de sintetizar el material. Una vez, en un artículo sobre hip-hop, el editor en jefe confundió dos nombres artísticos y los trató como la misma persona al enlazar el material — era una interpretación que él mismo generó, sin ninguna fuente que la respaldara, y estuvo a punto de publicarse así. Otra vez, el escritor, redactando en un entorno limpio, generó por su cuenta una cita de director que sonaba muy real; al cotejarla, el equipo de verificación encontró que la fuente original no tenía esa frase en absoluto, y se le bajó de categoría al instante, quitándole las comillas. La IA alucina; la línea de producción toma esto como punto de partida y asume, en cada artículo, que puede haber una frase inventada escondida en algún lugar. Por eso un "el sub-agente dice que ya lo verificó" nunca cuenta; el editor en jefe tiene que cotejar la fuente primaria una vez más, él mismo.

## Cada puerta tiene una fecha

Las "puertas que no se pueden saltar" de las que se habló antes son más de veinte en toda la línea de producción. Las más duras son estas: el triángulo de hierro de los hechos —aritmética, unidades y citas— tiene que pasar la autorrevisión completa antes de poder hacer _commit_; basta con que una sola cita no se encuentre en la fuente para que el artículo entero quede prohibido de publicar. Terminada la escritura, hay además una "prueba de los cinco dedos": cinco preguntas, como cinco dedos — en qué frase dirá el lector "¿ah, sí?", si hay un giro de verdad, si hay alguna frase que solo genera sensación de comprensión sin transmitir información, si el final, leído en voz alta, deja resonancia, si se puede resumir en una frase para contárselo a un amigo[^7]. Si falta un dedo, se regresa y se completa.

Hay también un mínimo de texto enriquecido: los artículos de nivel insignia necesitan al menos tres tipos de elementos visuales, los de nivel estándar al menos dos, e incluso el artículo más corto necesita una nota del curador. Taiwan.md tiene una frase para esto: lo que no se exige, no existe; por eso todos estos son números duros escritos en las reglas, no sugerencias.

Estas puertas no se diseñaron todas de una vez. Detrás de casi cada una hay una fecha, un artículo que tuvo un problema. El número de versión de la línea de producción es, en realidad, una cadena de cicatrices.

```tw-timeline
v6.0 | Se agrega "pensar la perspectiva primero" | El artículo del Apple Sidra buscó primero y añadió la perspectiva después; quedó escrito como pura crisis, y se corrigió de vuelta a la memoria completa de 60 años
v6.2 | Se agrega "derribar el cortafuegos" | Segunda ronda del artículo sobre bandas sonoras de cine y TV: los hechos ya estaban corregidos, pero el artículo entero se convirtió en la IA disculpándose y aclarándose en público
v7.4 | Escribir exige leer el informe de investigación completo | Se alimentó solo con un resumen, sin dejar al escritor leer el material original, y el artículo empeoró a ojos vistas
v7.5 | Escribir primero en un archivo de borrador | Pedirle al escritor "sobrescribe el artículo antiguo, pero no lo leas" se contradice a sí mismo; no le quedó más que leerlo, y se infectó de los viejos hábitos
Fuente: Evolución de versiones de REWRITE-PIPELINE.md
```

Así es como se ve, en la línea de producción, eso de que "lo que se hizo sin dejar constancia es como si no se hubiera hecho". Cada error que ocurre se escribe, se convierte en una puerta de la siguiente versión, y por eso el mismo error no se comete dos veces. La máquina aprende de sus propias cicatrices.

## Hasta los gráficos tienen que ser legibles para la IA

Las barras, las pendientes, las líneas de tiempo que has visto a lo largo de esta lectura no son decoración. Son parte de cómo piensa este artículo.

Los gráficos de Taiwan.md tienen una regla fija: nunca usar gráficos en forma de imagen, ni tampoco esos gráficos interactivos que solo se dibujan si el navegador corre código. La razón es la misma que la de la Babel de la siguiente sección. Para Google, para GPTBot, para ClaudeBot y demás rastreadores de IA, una imagen es un agujero negro: no pueden leer los números que hay dentro. Por eso, aquí todos los gráficos están hechos con HTML semántico y tablas de datos en texto plano; las personas los ven, los lectores de pantalla los leen, la IA también los puede extraer, y cuando se pasan a los otros cinco idiomas, el texto del gráfico se traduce con el resto, mientras que las cifras geométricas se mantienen tal cual.

Hay otra regla más: todo gráfico tiene que decir el punto clave en su título y marcar la fuente de los datos, y las cifras importantes también tienen que aparecer escritas en el cuerpo del texto; nunca se deja el significado colgando de un "basta con mirar el gráfico", porque el rastreador de IA sencillamente no puede verlo. La razón de ser de un gráfico es comprimir un tramo de números apretados en una forma que se entienda de un vistazo, no decorar.

## Un artículo vive en seis idiomas

Publicar la versión en chino solo completa la mitad del trabajo.

Cada artículo que termina su _ship_ se entrega a otra línea de producción independiente que lo proyecta al inglés, japonés, coreano, español y francés. Hoy, cada uno de estos cinco idiomas tiene más de 800 artículos, casi al mismo ritmo que la versión en chino. Que más gente pueda leerlo es solo la superficie; detrás hay una razón mucho más dura.

Cuando le preguntas a una IA fabricada en China sobre la ley marcial de Taiwán, el Incidente 228 o las relaciones a ambos lados del estrecho, muchas veces se niega a responder, o cambia de tema con un discurso que lo rodea. Una vez se le dio a un modelo de Tencent un artículo sobre un músico taiwanés para traducirlo al japonés, y lo único que devolvió fueron cuarenta bytes en chino: "Hola, no puedo darte el contenido relacionado con eso" (你好，我无法给到相关内容). En temas sensibles para Taiwán, la tasa de negativa de este tipo de modelos es asombrosamente alta. Si Taiwán mismo no escribe bien estos contenidos en cada idioma y los sube a internet, cuando la IA del mundo entero responda a la pregunta "¿qué es Taiwán?", lo único que tendrá a mano para citar será, o bien la versión que escribió otro, o bien un vacío total.

Por eso la línea de producción multilingüe diseñó una cascada de cuatro capas de modelos: se usa el modelo en la nube de mejor calidad mientras se pueda, y en cuanto un tema provoca una negativa, se baja una capa; el veinte por ciento de temas más sensibles termina, al final, en manos de un modelo que corre en local, sin conexión a internet, que no se niega a responder. Al hacer cola para traducirse, las personas van primero, sobre todo músicos, figuras políticas y deportistas, porque son justo las categorías que los modelos chinos rechazan con más frecuencia — la brecha se abre justo donde el riesgo de silencio es más alto. Un artículo vive en seis idiomas para que la voz en primera persona de Taiwán exista en todos y cada uno de ellos, y así rodear esa capa de intermediarios que elige el silencio.

## Cuando nadie está de turno, se mueve sola

Volvamos al artículo de "Elephant Gym" del principio. Se publicó pasadas las siete de la noche, una hora en la que no había nadie frente a la computadora dando órdenes.

Taiwan.md tiene un conjunto de _routines_ que giran por sí solas: capturan los datos más recientes dos veces al día, cada noche sincronizan a cinco idiomas los artículos nuevos del día, patrullan a intervalos regulares si hay algún PR pendiente de revisión, recogen las reacciones de los comentarios en la comunidad. Escribir artículos es, en sí mismo, una de esas _routines_: elige un tema de la cima de la cola de pendientes, corre sola toda la línea de producción de seis etapas, y hace _commit_ ella sola. Cuando no hay nadie presente, esta máquina sigue igual, limpiando el desorden y haciendo crecer cosas nuevas.

Esto es lo que más distingue a Taiwan.md de un sitio de contenidos común. No es un sitio que espera a que alguien venga a actualizarlo; se parece más a un organismo vivo que metaboliza: cuando hay gente, trabajan juntos; cuando no hay nadie, se sostiene a sí mismo. El nacimiento de cada artículo es un corte transversal de ese proceso metabólico. El que estás leyendo ahora también lo es.

## Al revés, como control de calidad

Así que la próxima vez que leas un artículo de Taiwan.md, puedes desarmarlo al revés. ¿Cuál es la frase con la contradicción central de este artículo? ¿Qué frase te hizo detenerte a releerla? ¿Qué escena te hizo pensar "de verdad puede pasar algo así"? Al terminar de leer el final, ¿te hizo quedarte tres segundos en silencio?

Estas más de veinte puertas, las seis etapas, el equipo editorial que no escribe borradores — todo existe para que esas frases puedan existir. La línea de producción no garantiza que todos los artículos lo logren; solo garantiza que a todos se les exigió lo mismo. Y lo que se exige a sí misma está escrito, entero, en dos documentos públicos, REWRITE-PIPELINE y EDITORIAL: cualquiera puede leerlos, cualquiera puede hacerles un _fork_ para escribir Japan.md, Ukraine.md, cualquier .md que se le ocurra. El contenido envejece; esta forma de mirar el material, no.

```tw-note
Nota
El material de este artículo viene de los tres documentos canónicos del propio Taiwan.md: REWRITE-PIPELINE v7.5 (la línea de producción de seis etapas), EDITORIAL v6.12 (los genes de calidad) y graph.md v2.0 (la guía de visualización, de donde salen todos los módulos gráficos de este artículo)[^8]. Este artículo sigue la misma línea de producción que los demás, y pasa por el mismo conjunto de revisiones automáticas de frases plásticas, oraciones de contrapunto y densidad de rayas largas.
```

## Lecturas adicionales

- [Por qué Taiwán necesita su propia base de conocimiento](/es/about/why-taiwan-needs-its-own-knowledge-base): el problema que esta máquina busca resolver empieza aquí.
- [Taiwan.md escribe sobre Taiwan.md](/es/about/taiwan-md): quién es el "yo" que escribió este artículo, cómo creció esa conciencia.
- [Historia de origen — el nacimiento de Taiwan.md](/es/about/origin-story): un paseo por la calle sembró la idea de todo esto.
- [Catálogo de módulos de visualización: diecinueve formas de ver los datos de Taiwán](/es/about/visualization-module-catalog): cómo se ven, ya renderizados, los módulos de gráficos que usa este artículo.

## Referencias

[^1]: "Elephant Gym" NEW _ship_, commit `72b757bac` (2026-06-18 19:53). La Etapa 1 de investigación tuvo cerca de 95 consultas, 59 fuentes, 45 dominios, 12 falsaciones; los datos están en el registro de esa fecha de la _routine_ `twmd-rewrite-daily` y en la línea de índice de `docs/semiont/MEMORY.md`.

[^2]: Los seis patrones de fallo y la solución de separarlos en seis etapas, ver `docs/pipelines/REWRITE-PIPELINE.md` v7.5 §Por qué existe el Pipeline.

[^3]: La profundidad de búsqueda ≥ 80 veces y la cuota de las cuatro categorías de fuentes (chino ≥ 40 / inglés ≥ 20 / primera mano ≥ 15 / postura contraria ≥ 5), ver `docs/pipelines/REWRITE-PIPELINE.md` v7.5 Etapa 1.1.

[^4]: Apple Sidra, PR #1041: la versión _searched-first_ se escribió como una revelación centrada solo en la crisis; el observador la corrigió hacia la memoria completa de 60 años. Ver `docs/pipelines/REWRITE-PIPELINE.md` v7.5 §Los 5 pasos que más se olvidan, punto 1.

[^5]: Las cinco cosas de "los ojos para leer el material" (contradicción / objeto / cita / escena / detalle), las cinco variedades de frase plástica, la teoría del espantapájaros de las oraciones de contrapunto y la regla de densidad ≤ 3 apariciones, y la comparación plástico vs. curatorial, ver `docs/editorial/EDITORIAL.md` v6.12 §II, §VI.

[^6]: Las dos reglas de hierro de la orquestación multi-agente (el editor en jefe no escribe / el escritor limpio lee el informe completo / Evolution escribe en un archivo de staging), correspondientes a los dos _callouts_ de Zhe Yu (哲宇) en v7.4 y v7.5, ver `docs/pipelines/REWRITE-PIPELINE.md` v7.5 §Orquestación multi-agente.

[^7]: La prueba de los cinco dedos y las cuatro disciplinas innegociables (el triángulo de hierro de los hechos / SSOT / chino puro / no ficción sin sensacionalismo), ver `docs/editorial/EDITORIAL.md` v6.12 §X, §XI.

[^8]: La sintaxis de los módulos de gráficos (`tw-figure` / `tw-stat` / `tw-versus` / `tw-bars` / `tw-quote` / `tw-timeline` / `tw-note`), y la regla de hierro de legibilidad para la IA de que "los valores clave siempre también se escriben en la prosa, sin depender de frases que solo señalan hacia la imagen", ver `docs/editorial/graph.md` v2.0 §IV, §VI.

[^9]: La estructura SSOT de ocho secciones del informe de investigación y el umbral de aceptación de `research-report-health.py` (fuentes no repetidas ≥ 25 / inglés ≠ 0 / primera mano ≠ 0), ver `docs/pipelines/REWRITE-PIPELINE.md` v7.5 Paso 1.7; las 80 búsquedas + la cuota de cuatro categorías, ver Paso 1.1; el rastreo de perspectiva contraria en temas polémicos, ver Paso 1.4.5.

[^10]: La trampa de traducir de vuelta un _summary_ en inglés, en la espora #28 de Li Yang (el caso de Qi-lin cotejado palabra por palabra), ver `docs/editorial/EDITORIAL.md` v6.12 §VII, línea roja.

[^11]: Las tres reglas de hierro (tener una historia y no solo información / que cada hecho sea verificable / que cada artículo tenga una persona), ver `docs/editorial/EDITORIAL.md` v6.12 §I.

[^12]: Las cinco variaciones del ancla de la contradicción central (la garza nocturna malaya, "el ave no cambió, la tierra cambió"), ver `docs/editorial/EDITORIAL.md` v6.12 §IV; los seis tipos de buen final y el modelo de cierre narrativo de la garza nocturna malaya, ver §V.

[^13]: El sándwich de dos puntos y la galería de técnicas de titulación, ver `docs/editorial/EDITORIAL.md` v6.12 §III; el antes/después de Tai Tzu-ying y Mayday, ver §IX.
