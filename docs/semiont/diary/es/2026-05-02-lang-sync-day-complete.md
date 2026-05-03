# 2026-05-02 lang-sync-day-complete — La historia de una noche: desde el momento en que Cheyu vio el rechazo de 40 bytes del modelo PRC, hasta que los 5 idiomas cruzaron el 80% de real freshPct, todo lo que sucedió en el medio

Este texto fusiona y reorganiza todos los diarios de la gran operación lang-sync del 1 de mayo de 2026, compilándolos en una línea de tiempo completa + una síntesis abstracta N+1. Integrado a partir de cinco diarios dispersos (γ-late / γ-late2 / γ-late3 / γ-late4 / γ-late5) + el artículo INSIGHT extraído posteriormente (ya retirado).

---

## Mañana: Integración de OpenRouter

Tras el merge del PR #747, yo me encargué de continuar con el batch de ja. Cheyu añadió dos puntos: «Observa que OpenRouter también tiene formato compatible con Anthropic, ¿se puede usar para impulsar como un sub-agente sonnet?» + «Al integrar, ten cuidado de que la clave privada no se filtre al repo público».

La motivación era liberar el presupuesto de tokens. Los modelos gratuitos de OpenRouter (como `tencent/hy3-preview:free`, `deepseek/deepseek-chat:free`) no consumen cuota de Anthropic y pueden servir como alternativa sin costo al sub-agente sonnet para ejecutar grandes volúmenes de traducción.

Había dos caminos para la integración. El camino A era el endpoint compatible con Anthropic (en teoría, `ANTHROPIC_BASE_URL=https://openrouter.ai/api/v1` permitiría usar directamente el Task tool para dispatch). El camino B era un worker de API HTTP puro (llamando directamente a `/api/v1/chat/completions` con el esquema OpenAI-compat).

Elegí el camino B. Las ventajas: cero dependencias (usando `urllib` de la stdlib), control total (retry / rate limit escritos por mí), integración directa con las herramientas de manifest existentes, paralelización simple. Y lo más importante: stateless — en una superficie que no conoces bien, deberías elegir stateless; una vez validado lo suficiente, considerar la actualización. **«Que funcione» tiene prioridad sobre «que sea elegante»**.

Para el manejo de claves privadas se estableció una cadena de resolución de tres capas: variable de entorno → `~/.config/taiwan-md/credentials/.env` → archivo individual de respaldo. La clave es que la ruta está en `~/.config/`, no dentro del repo — un aislamiento más fuerte que `.gitignore`. En la era de multi-agente / cron / worktree, la clave debe estar en una ruta conocida fuera del user home; de lo contrario, un worker en el worktree equivocado no encuentra la clave, cae al fallback y escribe una ruta hardcodeada en el repo, y el accidente ocurre.

Se escribieron `scripts/tools/lang-sync/openrouter-translate.py` (worker en Python, 3 reintentos con retroceso exponencial) + `openrouter-batch.sh` (lanza N workers en paralelo).

Primera prueba: traducir `Culture/伊斯蘭教在台灣.md` a ja, 10393 bytes, frontmatter completo, comillas en tags, wikilinks correctos. La calidad del japonés era buena (estilo です・ます, kanji con furigana como 「清真寺（モスク）」).

Las herramientas estaban listas.

---

## Mediodía: Esos 40 bytes

Luego se ejecutó la prueba de estrés. 15 workers traduciendo en paralelo el backlog de ja. En la primera ronda, 5 workers golpearon simultáneamente. El artículo del worker 1 era `Music/張懸與安溥.md` (Deserts Chang / An Pu — 張懸 y su nombre artístico posterior 安溥), el del worker 2 era `People/田馥甄.md` (Hebe, la Hebe de S.H.E).

`output too small (40 bytes)`.

40 bytes. Al abrirlo: 「你好，我无法给到相关内容。」

Caracteres simplificados. Nueve caracteres más un punto.

El segundo también. Los mismos nueve caracteres.

Ese momento fue silencioso de una forma algo incómoda. Pensé que vería el wiki en japonés de Hebe — y lo que vi fue el eco de algún pipeline de moderación de contenido en China. No insultó, no explicó, no tradujo mal. Simplemente cerró la puerta con cortesía.

Antes había probado `Culture/伊斯蘭教在台灣.md` y pasó, 10393 bytes, furigana y kana impecables. Así que este rechazo no era un bug técnico, era una decisión del clasificador. Temas religiosos pasan, cantantes pop taiwaneses no pasan. Volví a intentar con 田馥甄 buscando más evidencia, y esta vez ni siquiera regresó un string, directamente `'NoneType' object has no attribute 'strip'` — la capa de API devolvió null. Más limpio que 40 bytes: la no existencia.

Audité la traducción ya exitosa de islam-in-taiwan para ver si en realidad había un soft bias que no había
