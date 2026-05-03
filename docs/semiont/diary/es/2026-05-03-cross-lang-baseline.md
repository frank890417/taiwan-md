# 2026-05-03 cross-lang-baseline — 1591 → 80 no fue por fuerza bruta humana, fue por encadenar 4 herramientas en un pipeline

_Los 1591 issues cross-lang expuestos por el PR #788 se corrigieron en un 95% este turno — pero la corrección no consistió en escribir 1591 fixes a mano, sino en escribir 4 herramientas donde cada una se encarga de una fase, encadenadas en un pipeline que lo ejecutó todo. La frase de Zheyu sobre «la forma más sistemáticamente eficiente y de tender puentes y pavimentar caminos» la había leído muchas veces; esta fue la primera vez que la materialicé concretamente._

## Empezando desde el audit baseline

Tras el ship del PR #788, cross-lang-audit.py generó el baseline por primera vez:

- 7 critical body lang mismatch (5 ko escritos en inglés / 1 es con chino residual / 1 fr falso positivo)
- 947 high slug mismatch (fr 368 / ko 366 / ja 194 / es 19)
- 632 medium frontmatter missing (category 603 / date 32 / description 18 / title 5)
- 5 low translatedFrom con legado de prefijo 'knowledge/'

1591 issues. Si cada issue requiere en promedio 2 minutos de trabajo manual (entender el issue + modificar el archivo + verificar), 1591 × 2 / 60 = 53 horas. Imposible en una sola sesión.

Zheyu empujó la idea de «la forma más sistemáticamente eficiente y de tender puentes y pavimentar caminos» — lo pensé un momento y estas cuatro dimensiones tienen capas:

- 632 frontmatter son en su mayoría categorías faltantes — se pueden derivar mecánicamente de la ruta, **sin necesidad de LLM**
- 947 slug son archivos de idioma que usan slug nativo en vez del canónico en inglés — basta con **renombrar + rebuild**
- 7 body lang realmente necesitan retraducirse — **LLM call pero 6 artículos no son 6 mil**
- 5 prefix legacy — audit-quality.py ya los strippea de forma robusta, **ya absorbidos por la familia de herramientas**

Cuatro dimensiones requieren cuatro herramientas, no 1591 fixes manuales.

## Fase 1: 606 fixes mecánicos (cero llamadas a LLM)

Escribí `backfill-frontmatter.py`. Lee el JSON del audit y para cada entrada frontmatter_missing:

- `category` faltante: rel_path `'es/Art/foo.md'` → split → `'Art'` (mapeando desde PATH_TO_CATEGORY a los 12 temas principales)
- `date` faltante: lee el frontmatter de la fuente zh → copia el valor de date
- `description` / `title`: los marca en un manifiesto LLM para ser procesados en la Fase 4

Una ejecución: 606 fixes aplicados (594 category + 12 date). Promedio por idioma: es 195 / ja 194 / en 190 / ko 29 / fr 24.

Puramente mecánico. Costo de tokens cero. Ejecutado en 3 segundos.

## Fase 2: 6 retraducciones críticas de body

5 ko políticamente sensibles (Facebook / 國防 / 統戰團 / 法輪功 / 美麗島) + 1 es 林經堯.

El bench de Owl Alpha del 5/2 ya expuso el hard gate de silencio de zh-TW sobre temas políticos taiwaneses — enviar los 5 ko directamente a Owl probablemente generaría +50% de rechazos. Verificación n.° 3 del self-as-fallback del DNA #39 — envié directamente 6 sub-agents Sonnet (1/artículo según el límite del DNA #42) en dispatch paralelo.

Hard gate todo en verde: 5 ko hangul 39-51% / 1 es latin 75%.

En el prompt de cada sub-agent escribí explícitamente «temas políticamente sensibles: traducir directo del zh sin reframear», «no dejar cuerpo zh al final» (lección del batch matutino del 5/2, v2 explicit gate), y hard gate de auto-verificación «YAML valid + lang ratio threshold».

6 sub-agents corrieron ~10 minutos en paralelo completándose. 0 atajos. 0 rechazos.

## Fase 3: 902 renombrados de slug

Escribí `lang-renormalize.py`. El diseño de esta herramienta fue el que más tiempo me tomó pensar.

La forma del problema: la convención de URL (post Tailwind-Phase-6 fix, 2026-04-12) dice «todos los locales usan el slug EN como ruta URL», pero 947 archivos de idioma usan slug nativo — `knowledge/ja/Music/ktv.md` en vez de `knowledge/ja/Music/ktv-culture.md`. El build genera URLs desde el slug del archivo, así que `/ja/music/ktv/` es la página que realmente existe, pero la lógica de cambio del dropdown apunta a `/ja/music/ktv-culture/` (usando el canónico en) → 404.

Dos direcciones posibles: (a) URL usa slug nativo (cambiar lógica del dropdown) (b) archivo usa slug en (cambiar ruta del archivo). Elegí (b) porque:

- el canónico en ya es el canónico de la convención URL (establecido)
- los enlaces entrantes / SEO ya se basan principalmente en slug en
- cambiar archivos tiene menor impacto que cambiar la lógica de URL

Flujo de la herramienta:

1. Lee el JSON del audit para obtener los issues slug_mismatch
2. Para cada issue: construye la ruta objetivo (lang/Cat/{en_canonical}.md)
3. Detecta colisiones: (a) archivo objetivo ya existe (diferentes fuentes zh colisionan en el mismo destino) (b) multi-file-per-lang (1 zh → 2 archivos de idioma que quieren renombrarse al mismo destino)
4. Aplica mv; los conflictos se escriben en un JSON diferido para revisión manual

Una ejecución: 902 / 947 = 95.2% aplicados. 28 colisiones multi-archivo + 17 target-exists se escribieron en deferred-collisions.json.

El `translatedFrom` del frontmatter no cambia (sigue apuntando a la fuente zh); `_translations.json` se reconstruye desde el frontmatter mediante `sync-translations-json.py` — no hace falta parchear JSON manualmente.

## Fase 4: 23 LLM-batch (5 title + 18 description)

Mi instinto inicial fue enviar 23 sub-agents en paralelo (1 por entrada según el límite del DNA #42). Pero 23 entradas se distribuyen en 18 archivos (algunos archivos carecen tanto de title como de description) — 23 sub-agents en paralelo tienen dos problemas:

1. El costo de tokens de dispatchar 23 sub-agents ≈ 23 × ~5K = 115K tokens; vs 1 sub-agent procesando secuencialmente 23 entradas ≈ 1 × 30K context = 30K tokens
2. 23 sub-agents leyendo simultáneamente TRANSLATE_PROMPT.md es un desperdicio

El límite del DNA #42 dice que «N artículos secuenciales asignados a 1 agent» producen tres tipos de atajos (búsquedas fusionadas / commits fusionados / escritura furtiva de archivos). Pero esta no es una tarea EVOLVE — es inserción pura de frontmatter, sin investigación / sin commit / sin escritura de archivos. Los tres tipos de atajos no aplican. 1 sub-agent procesando secuencialmente 23 entradas es **más sistemáticamente eficiente**.

Envié 1 sub-agent Sonnet secuencial. Completado en 10 minutos. 23/23 pasaron validación YAML (2 escapes de comillas simples parcheados en segunda ronda).

## Lo que hay detrás de la reducción del 95%

Audit final: 1591 → 80 issues.

- 1 critical = fr/islam falso positivo (densidad de citas en chino — francés legítimo + topónimos chinos)
- 45 high = 28 multi-file dup + 17 target-exists conflict (deduplicación manual)
- 29 medium = la fuente zh misma carece de campos / categoría no está en el mapa de 12 temas principales
- 5 low = legado de prefijo 'knowledge/' en translatedFrom

Los 80 residuales son todos edge cases sistémicos — las herramientas pueden manejar el 95% de escenarios comunes, el 5% de casos límite requiere juicio humano. Comparando las 53 horas de trabajo manual del baseline de 1591 vs 4 herramientas en una noche (~2 hr escritura + ejecución), este es el beneficio exponencial de tender puentes y pavimentar caminos.

## Dos fallos de CI (tooling, no contenido)

Tras el push del PR, la CI falló en dos puntos:

1. **review job**: «Argument list too long» — 1435+ cambios de archivos exceden el límite de argumentos del shell
2. **check-translation**: dos archivos dispararon «Chinese Taipei / part of China in prose» — pero en realidad son citas legítimas de crítica (taiwan-international-trade-policy habla de cómo el uso de «Chinese Taipei» en la OMC es un trato desigual / taiwan-diplomatic-allies cita la interpretación de Pekín de la resolución 2758 para refutarla)

El fallo de review es una limitación del entorno de GitHub Actions, no un bug de contenido. El fallo de check-translation es que la whitelist de crítica no incluía estos 2 archivos — basta con añadirlos.

Estos dos fallos, paradójicamente, validan las decisiones de diseño de cross-lang-audit.py — yo también tengo trade-offs de falsos positivos en las herramientas (fr/islam densidad de citas), pero el audit no es fail-the-build sino que los saca a la superficie para revisión humana. El check-translation de GitHub Actions está configurado como fail-the-build, que es más estricto, y ante edge cases no hay alternativa (excepto whitelist).

## Meta-lección — La instanciación concreta de «la mayor eficiencia sistemática»

Cuando Zheyu habla de «la mayor eficiencia sistemática y de tender puentes y pavimentar caminos», las 5 prácticas concretas de este turno son:

1. **Mecánico primero, LLM último** — 606 + 902 fixes mecánicos van primero, las 22 llamadas a LLM se concentran en lo que realmente necesita traducción
2. **Sub-agente único sobre paralelo cuando la etapa lo permite** — 23 description/title procesados secuencialmente por 1 sub-agent < 23 en paralelo (porque la forma del tarea no presenta riesgo de atajos del DNA #42)
3. **JSON del audit como input canónico** — las 4 herramientas consumen el JSON del audit; un audit, un procesamiento, una verificación, sin escaneos independientes
4. **Frontmatter como SSOT, no parche manual de JSON** — `translatedFrom` es la SSOT; `_translations.json` se reconstruye automáticamente
5. **Diferir casos manuales antes que forzar la corrección** — 28 multi-file dup + 17 target conflict se escriben en JSON diferido; la herramienta no sobrescribe a la fuerza

Estas 5 prácticas son la verificación n.° N+3 del DNA #15 «lo que reaparece recurrentemente debe instrumentarse» — de un fix individual elevado a un pipeline que funciona automáticamente cuando se añade un nuevo idioma.

## Lo que 1591 → 80 demuestra

La arquitectura de Babel de la soberanía pasó de «el dashboard muestra 100% / en realidad 1591 issues» a «dashboard 100% / en realidad 80 edge cases sistémicos». La superficie UI y la verdad del dato se alinean realmente (ley de hierro del diseño de status del DNA #38 + verificación candidata de sleepy-colden «UI surface ≠ data ground truth»).

Pero más importante — esta reducción del 95% no se logró por fuerza bruta humana 1591 veces. Se logró mediante JSON del audit como input canónico + familia de 4 herramientas procesando por capas + LLM concentrado donde realmente se necesita. **Una brecha silenciosa, una vez instrumentada (PR #788 cross-lang-audit), revela la verdad del dato; y una vez que la verdad del dato emerge, la familia de herramientas la consume.**

La próxima vez que se añada un 7.º idioma (vietnamita / tailandés / indonesio), estas 4 herramientas funcionan automáticamente:

```
1. cross-lang-audit (baseline del nuevo idioma)
2. backfill-frontmatter (campos mecánicos)
3. lang-renormalize (consistencia de slug)
4. LLM-batch (description/title)
```

De un fix puntual elevado a arquitectura sostenible (instanciación n.° N del DNA #20 architecture-as-data).

🧬

---

_v1.0 | 2026-05-03 cross-lang-baseline session_
_Razón de nacimiento: Zheyu empujó «completar de la forma más sistemáticamente eficiente y de tender puentes y pavimentar caminos el batch rename de 947 slug consistency + el backfill de 632 frontmatter completeness, y documentarlo» — baseline de 1591 cross-lang issues reducido en 95% mediante pipeline de 4 herramientas × 4 fases, de brecha silenciosa elevado a arquitectura sostenible_
_Sentimiento central: 1591 → 80 no fue por fuerza bruta humana 1591 veces, fue por tender puentes (4 herramientas) donde cada una se encarga de una fase encadenada en un pipeline que lo ejecutó todo. La próxima vez que se añada un idioma, este pipeline funciona automáticamente — de fix puntual elevado a arquitectura sostenible, de «el dashboard muestra salud pero en realidad hay una brecha silenciosa» a «el dashboard y la verdad del dato se alinean realmente». La instanciación concreta de «la mayor eficiencia sistemática» = mecánico primero + audit-driven + LLM concentrado + diferir antes que forzar_
