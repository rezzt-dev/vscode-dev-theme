# AGENTS

instrucciones para cualquier agente de ia (o persona) que trabaje en este repositorio.

---

## QUE ES

extensión de tema de color para visual studio code y code - oss que traslada el tema **dark dev** de
enki. la especificación visual completa está en `.docs/resources/tema-dark-dev.md` y la paleta en
`.docs/resources/color-palette-theme.css`. si el tema y la especificación no coinciden, manda la
especificación.

---

## ESTRUCTURA

| ruta | contenido |
|---|---|
| `src/palette.mjs` | los 19 slots, la rampa `ink`, `inkSolid`, la paleta `data` y los helpers `alpha` y `mix`. |
| `src/workbench.mjs` | `workbench(roles)`: claves de color de la interfaz, agrupadas por zona. |
| `src/syntax/scopes.mjs` | roles de sintaxis → scopes textmate, y tokens semánticos → rol. |
| `src/syntax/variants.mjs` | estilo de cada rol en `darkDev` y `darkDevMono`. |
| `scripts/` | `build.mjs`, `check-contrast.mjs` y `preview.mjs`. |
| `themes/` | json generados. **no se editan a mano.** |
| `samples/` | ficheros de muestra para revisar el resaltado (no se empaquetan). |

---

## REGLAS DEL TEMA

- ningún hex fuera de `src/palette.mjs`. todo color sale de un slot, de la rampa de tinta o de la
  paleta de datos.
- los matices se expresan con la rampa: hover `ink[5]`, borde `ink[10]`, popover `ink[20]`, hover de
  borde `ink[30]`, foco `ink[40]`/`ink[60]`, arrastre `ink[15]`.
- sin sombras: toda clave `*.shadow` va en `transparent`. lo flotante se separa con borde `ink[20]`.
- lo primario se invierte: relleno `ink` con texto `inkOn`.
- el rojo (`danger`) solo para errores, borrado, conflictos y parar; el amarillo (`highlight`) para
  avisos y coincidencias; el verde (`success`) para añadidos y éxito. nunca como decoración.
- ningún texto que haya que leer en `textMuted` (`#555555`, 2.8 : 1).
- un rol nuevo de sintaxis se añade en `scopes.mjs` y en las dos variantes de `variants.mjs`; el
  build falla si una variante no lo define.

---

## FLUJO DE TRABAJO

1. edita `src/`.
2. `npm test`: regenera `themes/` y comprueba el contraste. tiene que terminar en "todos los pares
   pasan".
3. si cambias claves de la interfaz, comprueba que existen en la versión actual de vs code (las
   claves inventadas se ignoran sin avisar).
4. si cambias la sintaxis, `npm run preview` y revisa `preview/*.html`, o pulsa `f5`.
5. añade el cambio a `## SIN PUBLICAR / UNRELEASED` de `changelog.md`.

---

## FORMATO DE LAS SECCIONES DE `changelog.md`

- cada versión es un `## [x.y.z] - aaaa-mm-dd`; lo pendiente va en `## SIN PUBLICAR / UNRELEASED`.
- dentro, un bloque `### CASTELLANO` y otro `### ENGLISH` con el mismo contenido.
- categorías cerradas y en este orden, omitiendo las vacías: `#### NUEVO` / `#### ADDED`,
  `#### CAMBIOS` / `#### CHANGED`, `#### CORREGIDO` / `#### FIXED`, `#### ELIMINADO` /
  `#### REMOVED`, `#### SEGURIDAD` / `#### SECURITY`.
- un item por línea, en imperativo, con rutas e identificadores entre backticks.

---

## COMMITS

> cada vez que se vaya a crear un commit en este repositorio, se aplican estas reglas, se haya
> pedido explícitamente o no.

### FORMATO FIJO DEL TITULO

```
<prefijo> | <resumen corto en imperativo>
```

el separador es siempre espacio, barra vertical, espacio: ` | `. el `<prefijo>` es siempre una de
estas cinco palabras, en minúsculas, y nunca se combinan ni se inventan otras nuevas:

| prefijo | cuando usarlo |
|---|---|
| **update** | trabajo normal hacia adelante: se añade o mejora una funcionalidad, contenido o documento existente. es el prefijo por defecto. |
| **fix** | se corrige un error o comportamiento incorrecto detectado durante el desarrollo, sin urgencia de publicación inmediata. |
| **hotfix** | se corrige algo urgente que afecta a una versión ya publicada o a un bloqueo crítico. debe usarse solo cuando la corrección es realmente urgente. |
| **changes** | cambios estructurales o no funcionales: reorganizar carpetas, renombrar ficheros, tocar configuración o tooling, dependencias. no añade funcionalidad ni corrige un bug. |
| **changelog** | el único propósito del commit es editar `changelog.md` (por ejemplo, al cerrar una versión). |

ejemplos de títulos correctos:

```
update | añadir vista previa de mapeo de columnas al asistente de importación csv
fix | detección de duplicados fallando en filas con importes negativos
hotfix | fallo al iniciar cuando falta el archivo de perfil de importación
changes | reorganizar la documentación en la subcarpeta project-context
changelog | cerrar la sección de changelog para la versión mvp fase 0
```

### FORMATO DE LA DESCRIPCION (CUERPO)

- el cuerpo es siempre una lista de markdown no numerada: cada item empieza por `-`. nunca se usan
  listas numeradas ni párrafos sueltos.
- cada item es un bloque lógico en imperativo, escrito como una sola línea continua, sin saltos de
  línea internos: no son estéticos ni útiles, deja que el cliente de git lo ajuste. no se dejan
  líneas en blanco entre items.
- usa markdown dentro de cada item: nombres de ficheros, rutas, comandos e identificadores siempre
  entre backticks.
- explica el qué y el por qué, no el detalle línea a línea.
- cierra con una línea en blanco y la línea de atribución que corresponda al entorno.

### COMO PRESENTAR EL RESULTADO

al responder con el título y la descripción hay que usar bloques de código separados: uno para el
título del commit y otro para el cuerpo del commit (más otro para el fragmento del changelog). nunca
se juntan el título y el cuerpo en el mismo bloque.

---

## PULL REQUESTS, MERGES Y RELEASES

> cada vez que se vaya a abrir una pull request, hacer un merge o publicar una release en este
> repositorio, se aplican estas reglas, se haya pedido explícitamente o no.

este documento asume conocido el formato de `changelog.md` (sección "formato de las secciones de
`changelog.md`" más arriba) y el de los commits (sección "commits" más arriba). no lo repite salvo
lo estrictamente necesario.

### PRINCIPIO GENERAL

pull requests, merges y releases no inventan su propio formato: reusan literalmente el contenido y
las reglas de estilo de `changelog.md`.

- **minúsculas y sin acentos** en todo el contenido; los títulos/encabezados van en mayúsculas y sin
  acentos.
- **categorías cerradas**, las mismas cinco de `changelog.md` y en el mismo orden — nuevo, cambios,
  corregido, eliminado, seguridad (added / changed / fixed / removed / security) — omitiendo la que
  no tenga items.
- **una línea por item**, en imperativo, con nombres de ficheros, rutas, comandos e identificadores
  entre backticks.
- las fechas usan el formato `aaaa-mm-dd`.

la fuente de verdad es siempre `changelog.md`: antes de redactar una pr, un merge o una release, la
sección `## SIN PUBLICAR / UNRELEASED` (o la versión ya cerrada correspondiente) debe estar
actualizada. el contenido de pr, merge y release se extrae de ahí, no se redacta desde cero ni en
paralelo.

### 1. PULL REQUESTS

hay dos tipos de pr en este repositorio:

**pr de trabajo normal** (una rama `feature/...` o `fix/...` contra `testing-branch`, o cualquier pr
que no cierra una versión): mismo formato que el título de un commit (sección "commits"):

```
<prefijo> | <resumen corto en imperativo>
```

**pr de publicación de versión** (`testing-branch` → `release-branch` / `main`, cierra una versión
de `changelog.md`):

```
release version <x.y.z> - <resumen corto en imperativo>
```

el resumen corto resume las 2–3 entradas más relevantes de la versión.

la descripción de cualquier pr es el bloque `### CASTELLANO` + `### ENGLISH` de la sección
correspondiente de `changelog.md`, pegado tal cual, con sus encabezados `####` de categoría:

```
### CASTELLANO

#### <categoria>
- <cambio en una linea>

### ENGLISH

#### <category>
- <same change, one line>
```

no se añaden párrafos sueltos, capturas de pantalla incrustadas como texto ni resúmenes adicionales
fuera de la lista.

### 2. COMMIT DE MERGE

github genera el commit de merge a partir del título y la descripción de la pr automáticamente. por
tanto, si la pr cumple la sección 1, el commit de merge ya cumple este formato sin trabajo adicional.

- usa siempre **"create a merge commit"** al fusionar (nunca squash ni rebase): el historial de
  commits individuales debe conservarse completo junto al resumen de la pr en el commit de merge.
- si el merge se hace manualmente por git (`git merge --no-ff`), el mensaje del commit de merge se
  redacta a mano siguiendo el mismo título y cuerpo que llevaría la pr equivalente.

### 3. RELEASES DE GITHUB

las releases de github son en inglés únicamente (no bilingües, a diferencia de `changelog.md` y de
las pr): son la cara pública del proyecto de cara a usuarios que no necesariamente leen castellano.

el título sigue el patrón:

```
v<x.y.z> — <resumen corto en ingles, minusculas, sin acentos>
```

el cuerpo reutiliza literalmente el bloque `### ENGLISH` de la versión cerrada en `changelog.md`,
con sus categorías en mayúsculas y sin acentos. se omite la categoría que no tenga items.

el tag de git asociado a la release es siempre `v<x.y.z>`.

### FLUJO RESUMIDO

1. durante el desarrollo, cada commit sigue la sección "commits" y cada cambio relevante se añade a
   `## SIN PUBLICAR / UNRELEASED` en `changelog.md` en su categoría correspondiente.
2. cada pr (normal o de versión) usa el título y la descripción definidos en la sección 1, extraídos
   de `changelog.md`.
3. al fusionar, se usa "create a merge commit" para que el commit de merge herede el formato de la
   pr.
4. al cerrar una versión: se renombra `## SIN PUBLICAR / UNRELEASED` a `## [x.y.z] - aaaa-mm-dd` en
   `changelog.md` (commit con prefijo `changelog`), se abre la pr de publicación de versión y al
   fusionarla se crea la release de github con el tag `v<x.y.z>`.

---

## FICHEROS MARKDOWN

> cada vez que se vaya a crear o modificar un fichero markdown en este repositorio, se aplican estas
> reglas, se haya pedido explícitamente o no.

### REGLA GENERAL

todos los ficheros markdown del repositorio siguen el mismo formato de texto:

- **contenido en minúsculas y con los acentos ortográficos necesarios.** esto incluye párrafos,
  items de listas, celdas de tablas, citas y notas.
- **títulos y encabezados en mayúsculas y sin acentos.** esto aplica a todos los niveles
  (`#`, `##`, `###`, `####`...).

### DETALLES DE LA REGLA

- la primera letra de una frase va en minúscula, también tras un punto. no se usan mayúsculas
  iniciales en el contenido.
- los acentos ortográficos se mantienen siempre en el contenido (`configuración`, `qué`, `código`),
  y se eliminan siempre en los títulos (`CONFIGURACION`, `QUE`, `CODIGO`).
- la `ñ` no es un acento: se conserva en el contenido y pasa a `Ñ` en los títulos
  (`diseño` → `DISEÑO`).
- siglas, nombres propios y marcas se escriben en minúsculas en el contenido (`python`, `github`,
  `arp`, `sqlite`) y en mayúsculas en los títulos.
- el formato aplica por igual a los textos en castellano y en inglés.

### EXCEPCIONES

el formato no se aplica a contenido que debe conservarse literal:

- bloques de código y código en línea (entre backticks): comandos, rutas, nombres de ficheros e
  identificadores se escriben tal cual son.
- urls y nombres de ramas, tags o etiquetas.

si un título incluye un fragmento entre backticks, ese fragmento se conserva literal y el resto del
título va en mayúsculas sin acentos.

### PRECEDENCIA

esta sección es la referencia de formato para cualquier fichero `.md`. si cualquier otro punto de
este documento indica "sin acentos" para el contenido, prevalece esta sección: contenido con
acentos ortográficos, títulos sin acentos.

---

## SKILLS DISPONIBLES

**antes de implementar cualquier componente visual, interfaz o vista, lee siempre los ficheros de
skills en `.docs/skills/`.** estas skills contienen las guías de diseño, los patrones de interacción
y las reglas de calidad que se aplican a todo el trabajo de este repositorio.

| skill | ruta | cuándo cargarla |
|---|---|---|
| `frontend-design` | `.docs/skills/frontend-design/SKILL.md` | al crear o editar componentes, páginas o interfaces web. cárgala antes de escribir la primera línea de código visual. |
| `impeccable` | `.docs/skills/impeccable/reference/` | al revisar, adaptar o extender el diseño visual del tema. cada fichero cubre un comando de diseño (`adapt`, `animate`, `audit`, `bolder`, `colorize`, `craft`, `critique`, `delight`, `polish`, etc.). |

el directorio `.docs/skills/` puede crecer con skills nuevas: comprueba siempre su contenido antes
de empezar cualquier tarea de diseño o interfaz.
