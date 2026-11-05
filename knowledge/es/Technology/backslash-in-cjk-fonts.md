---
title: 'La barra invertida en el carácter "gong": los dos impuestos predeterminados que pagan los ingenieros de Taiwán cada día'
description: 'En Windows 11 con la localización zh-TW, el script de estado de traducción envía más de cuatro mil rutas al directorio raíz (root), haciendo que Technology sea cero; en cambio, el CI de Linux durante esa semana es verde. El script usa la barra inclinada para clasificar nombres y la barra invertida para discos, por lo que no puede dividirlos. Una capa más antigua está incrustada en el carácter: el segundo byte del Big5 "gong" es la barra invertida ASCII, y la comunidad de desarrollo lo llama *Xu Gong Gai*. La forma en que se escriben las rutas y los símbolos dentro de los caracteres no consideran este dispositivo. Git''s `quotePath` es otra línea con una causa diferente.'
date: 2026-08-13
category: 'Technology'
tags:
  [
    'Open Source',
    'Windows',
    'Big5',
    'UTF-8',
    'codificación de caracteres',
    'chino tradicional',
  ]
subcategory: '文字與工具'
author: 'Taiwan.md Contributors'
featured: false
lastVerified: 2026-08-13
lastHumanReview: false
image: '/article-images/technology/big5-gong-5c-backslash.webp'
imageAlt: 'El gran carácter "gong" muestra sus dos bloques en el código Big5 A5 y 5C; el bloque 5C apunta a la barra invertida ASCII 0x5C; debajo se muestra la salida real de Python, donde el segundo byte de los tres caracteres *Xu Gong Gai* es una barra invertida.'
imageCredit: 'Taiwan.md Contributors（自製圖解）· CC BY-SA 4.0'
curation: 'incubating'
curationReason: 'unverified'
translatedFrom: 'Technology/功字裡的那根反斜線.md'
sourceCommitSha: 'ef8369eef'
sourceContentHash: 'sha256:dbee36211f1b2080'
sourceBodyHash: 'sha256:cfc0fe9c1ed37efb'
translatedAt: '2026-11-05T14:57:24.213109+00:00'
---

> **Resumen en 30 segundos:** Ejecuté el script de estado de traducción y la pantalla mostró 4546, todo en `root`. El CI de Linux en GitHub era verde. Luego entendí dos cosas. La barra invertida de las rutas de Windows no podía ser dividida por la barra inclinada; la segunda mitad del código Big5 de "gong" es la barra invertida ASCII. Dos mecanismos diferentes aparecen a menudo juntos en un Windows chino tradicional.

Estaba manteniendo el script de estado de traducción de Taiwan.md en Windows 11 con la localización zh-TW. Esa noche, ejecuté `i18n-status.py` como era costumbre, esperando que la terminal imprimiera los números. La consola principal era cp950. No había texto rojo en la salida.

La pantalla se detuvo en 4546. Todo estaba en una categoría llamada `root`. Technology era 0.

En la misma semana, al subir a GitHub, el CI de Linux fue verde.

El script tenía como nombre de variable `zh_articles`, y escaneaba las rutas bajo `knowledge` excepto los directorios de inglés, about y línea inferior; también se contaban japonés, coreano y árabe. Esa noche, ni siquiera podía dividir los nombres de categoría, y más de cuatro mil rutas fueron metidas en una sola celda. Sin excepciones, sin advertencias. El conteo parecía que todo el sitio estaba roto, pero no faltaba ningún archivo.[^8]

La ruta del disco era `knowledge\Technology\un_articulo.md`, con barras invertidas separando los directorios. El script usaba `split('/')` para obtener el nombre de la categoría. Esto funcionaba en Linux porque las rutas ya eran con barra inclinada. En Windows, no podía dividir la barra invertida, y toda la ruta volvía sin cambios; el artículo se metía en la predeterminada `root`.[^1]

Después de cambiar para que `pathlib` manejara los directorios, Technology tenía 59 artículos debajo, lo que coincidía con el contenido del directorio. Solo había una suposición intermedia: qué tipo de línea usaba tu máquina para separar directorios.

![Salida real de la terminal de Python: una ruta de Windows dividida con split('/') devuelve una lista de un solo elemento; al pasarla a PureWindowsPath(p).parts, se obtienen tres segmentos: knowledge, Technology y nombre del archivo](/article-images/technology/windows-path-split-vs-pathlib.svg)

_La misma ruta, dos formas de dividir. `split('/')` no encuentra la barra inclinada y todo vuelve igual; `PureWindowsPath` reconoce la barra invertida y devuelve Technology. Contribuyentes de Taiwan.md, CC BY-SA 4.0._

> **📝 Nota del curador:** La sintaxis del script no estaba mal escrita, y el CI sí realizó las pruebas. El punto de quiebre está entre "la máquina donde trabaja el autor" y "la máquina que cree que estás usando". Esta costura no pertenece a ningún proceso, por lo que nadie es responsable de vigilarla.

## La línea dentro de "gong"

La ruta es la primera capa. La segunda capa es mucho más antigua y está incrustada en el carácter.

Big5 se estandarizó en 1984, donde un carácter chino ocupa dos bytes. Si el segundo byte cae entre `0x40` y `0x7E`, puede superponerse con símbolos comunes de ASCII: `[` , `]` , `{` , `}` , `\` , `|`. El profesor adjunto del Departamento de Administración de Sistemas de la Universidad Tecnológica de Chaoyang (jubilado en agosto de 2023) escribió en su página de enseñanza: "Debido a que el rango 40-7E es un rango de códigos ASCII para caracteres comunes, a veces causa problemas a los programadores."[^2]

El código de "gong" es `A5 5C`. El `0x5C` posterior es la barra invertida ASCII `\`. Un programa que escanea cadenas byte por byte y trata `\` como un escape o separador, al encontrar la segunda mitad de "gong", puede pensar que ha encontrado una ruta. Si el nombre del archivo contiene "gong" o la ruta contiene "gong", ambos pueden tropezar aquí.

La comunidad de desarrollo de Taiwán y Hong Kong lo llama _Xu Gong Gai_: "許" es `B3 5C`, "功" es `A5 5C`, y "蓋" es `BB 5C`; tres caracteres comunes escritos juntos como un nombre de persona.[^5] El profesor洪朝貴 (Hong Chao-gui) también enumeró "Jia Ye Cheng Zhen Gong", donde el segundo byte coincide con `[` , `]` , `{` , `}` , `\`, y desarrolló la herramienta de escaneo `b5tm`.[^2] Un error recibió un nombre, generalmente porque aparecía lo suficientemente a menudo como para que una generación tuviera que hablar refiriéndose a él.

En 2015, el autor del blog "Dark Threads" cambió a Visual Studio 2015. Los antiguos archivos `.cs` todavía se guardaban en BIG5. Después de que el compilador cambiara a Roslyn, los _Xu Gong Gai_ en los archivos causaron errores de compilación.

Dos días después, un colega le dijo que ellos también habían tenido problemas durante mucho tiempo y finalmente rastreó su artículo. Un usuario en internet tenía miles de archivos, transformó uno y todavía le quedaban muchos, "por lo que tuvo que decir adiós a VS2015".[^7]

Esto no es lo mismo que el `split('/')` anterior. Uno es un supuesto moderno sobre cómo debe ser una ruta. El otro es un símbolo viviendo dentro del cuerpo de un carácter después de elegir dos bytes hace cuarenta años. Los mecanismos son diferentes, pero la factura a menudo llega junta en la misma máquina cp950. La parte de entrada, ¿cómo se envía el carácter a la computadora?, vé [Métodos de entrada de caracteres de Asia Oriental](/es/technology/east-asian-input-methods/). Aquí hablamos de cuando el carácter ya está en el disco y si la cadena de herramientas aún lo reconoce.

## El valor predeterminado no creó una rama para esta máquina

Git tiene `core.quotePath` activado por defecto. Los nombres de archivo con bytes mayores a `0x80` se muestran como secuencias de escape octales, como `\344\270\255`, en `git status`. El nombre del archivo chino sigue ahí; simplemente no entiendes lo que dice tu propio repositorio cada día.[^3] Escapa los bytes altos de UTF-8. El `0x5C` de Big5 es otra línea. Aparentan ser la barra invertida, pero las causas son diferentes.

![Salida real de la terminal: git status --short muestra el nombre del archivo chino como una secuencia de escape octal entre comillas; con -c core.quotePath=false, el mismo nombre de archivo se imprime en chino](/article-images/technology/git-quotepath-octal-cjk.svg)

_El mismo archivo, bajo el valor predeterminado hay una serie de `\345\212\237`. La barra invertida aquí es un escape añadido por Git y no tiene relación con el `0x5C` dentro del carácter "gong". Contribuyentes de Taiwan.md, CC BY-SA 4.0._

Si Python 3 en Windows usa `open()` sin especificar `encoding='utf-8'`, puede usar la localización del sistema. Un archivo UTF-8 idéntico se lee correctamente en Linux, pero si esta máquina lo decodifica con cp950, los signos de puntuación o las notas son incorrectos.[^4] Yo pagué esto una vez: usé `Get-Content | Set-Content` de PowerShell 5.1 para convertir un archivo a UTF-8, y el signo de raya se convirtió en `??` en diff. Eso también es un impuesto predeterminado, pero no es el segundo tema.

Cuando la información de estado lleva emojis, esta consola cp950 colapsa directamente. El conjunto de caracteres no tiene esos símbolos; Python no puede imprimirlos, y la excepción explota en el nivel superior. El CI de Linux no detecta esto porque no se ejecuta en esta máquina.

Git, Python, y los ejemplos de rutas del CI como `$HOME/project/src` no crearon una rama separada para Windows zh-TW.

En 2015,洪朝貴 (Hong Chao-gui) fue entrevistado por iThome sobre qué formato usar para abrir archivos gubernamentales y cuánto tiempo podrían sobrevivir. La reportaje resumió su significado: si el gobierno solo usa productos de Microsoft para abrir datos de archivos, es como confiar en que la vida útil de Microsoft será más larga que la de la República de China (Taiwán).[^6] Esa frase hablaba del formato del archivo y la antigüedad de la conservación. Los datos están atados a un conjunto de herramientas predeterminadas; con el tiempo, se convierte en quién puede seguir leyéndolo. La colaboración de código abierto está ligada al entorno predeterminado de cierto dispositivo. La tensión entre la tecnología ciudadana y los formatos de archivos gubernamentales, vé [Comunidad Open Source y g0v](/es/technology/open-source-and-g0v/). Los desarrolladores de Taiwán han absorbido culturalmente esta disparidad durante mucho tiempo, vé [Espíritu Open Source de Taiwán](/es/technology/taiwan-open-source-spirit/).

El separador de rutas, la codificación de la terminal y `$HOME` en el ejemplo del CI no crearon una rama para este dispositivo. El día que 4546 rutas cayeron en la categoría incorrecta, ninguna línea de código reportó un error. El conteo parecía normal hasta que te sentaste frente a esta máquina.

## Lectura adicional

- [Espíritu Open Source de Taiwán](/es/technology/taiwan-open-source-spirit): La cultura y el contexto con el que los desarrolladores de Taiwán participan en el código abierto.
- [Métodos de entrada de caracteres de Asia Oriental](/es/technology/east-asian-input-methods): Cómo se teclea un carácter, desde la tabla de códigos hasta el teclado.
- [Comunidad Open Source y g0v](/es/technology/open-source-and-g0v): La colaboración entre datos abiertos y formatos gubernamentales.

## Fuentes de imágenes

- **Código Big5 de "gong" y barra invertida (hero)**: Ilustración creada por Contribuyentes de Taiwan.md, CC BY-SA 4.0, almacenada en `public/article-images/technology/big5-gong-5c-backslash.webp`. La línea inferior es la salida real de Python 3 ejecutando `'許功蓋'.encode('big5')`, y los códigos coinciden con el artículo Big5 de Wikipedia.[^5]
- **split('/') vs PureWindowsPath**: Creado por Contribuyentes de Taiwan.md, CC BY-SA 4.0, almacenado en `public/article-images/technology/windows-path-split-vs-pathlib.svg`. El contenido es el resultado real de Python 3; `PureWindowsPath` divide la ruta siguiendo las reglas de Windows en cualquier sistema operativo, por lo que se puede replicar sin una máquina con Windows.
- **Salida octal de Git core.quotePath**: Creado por Contribuyentes de Taiwan.md, CC BY-SA 4.0, almacenado en `public/article-images/technology/git-quotepath-octal-cjk.svg`. El contenido es la salida real de `git status --short` después de agregar el nombre del archivo a un repositorio temporal; este comportamiento no tiene relación con el sistema operativo.

## Referencias

[^1]: [Microsoft Learn: Formato de ruta de archivos en sistemas Windows](https://learn.microsoft.com/zh-tw/dotnet/standard/io/file-path-formats) — La documentación .NET explica que los archivos DOS tradicionales usan la barra invertida como separador de directorios, y la barra inclinada se convierte en barra invertida.

[^2]: [洪朝貴: Problemas con códigos Big-5 al programar](https://frdm.cyut.edu.tw/~ckhung/b/pl/big5.php) — La página de enseñanza enumera caracteres comunes cuyo segundo byte cae en la zona peligrosa de ASCII (Jia Ye Cheng Zhen Gong) e introduce la herramienta de escaneo b5tm. No se menciona el cargo en la parte inferior de la página. En 2015, iThome lo llamó profesor adjunto. Mi propia página indica que trabajé en Chaoyang Admin. de 1997 a 2023 y me jubilé en agosto de 2023.

[^3]: [git-config: core.quotePath](https://git-scm.com/docs/git-config) — La documentación oficial explica que por defecto muestra las rutas con bytes mayores a 0x80 como secuencias de escape octales.

[^4]: [Python 3: open()](https://docs.python.org/3/library/functions.html#open) — La descripción de la función indica que si no se especifica `encoding`, puede usar la localización del sistema como codificación predeterminada.

[^5]: [Wikipedia: Big5](https://zh.wikipedia.org/zh-tw/大五碼) — Indica "gong" 0xA55C, "xu" 0xB35C y "gai" 0xBB5C, y explica que este problema se llama _Xu Gong Gai_.

[^6]: [iThome: Entrevista a Hong Chao-gui](https://www.ithome.com.tw/news/93606) — Entrevista de 2015; el artículo lo menciona como profesor adjunto del Departamento de Administración de Sistemas de la Universidad Tecnológica de Chaoyang. La página original a menudo devuelve 403, por lo que solo se resume la información visible en los resultados de búsqueda y no se considera una transcripción literal.

[^7]: [Dark Threads: Shielded Machine - Solución al problema de compatibilidad BIG5 de archivos de VS2015](https://blog.darkthread.net/blog/big5-utf8-source-code-batch-converter/) — Documenta el error de compilación causado por _Xu Gong Gai_ durante la compilación del código fuente BIG5 en Visual Studio 2015. El artículo menciona "tuvo que decir adiós a VS2015".

[^8]: [taiwan-md PR #1260](https://github.com/frank890417/taiwan-md/pull/1260) — Fusionado el 26/07/2026. Antes de la corrección, en Windows, las categorías solo mostraban root: 4546; después de la corrección, Technology zh: 59. También se eliminaron los emojis que hacían colapsar la consola cp950.
