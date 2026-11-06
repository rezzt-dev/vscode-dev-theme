# VSCODE-DEV-THEME: REPOSITORY GUIDE

## ESPAÑOL DE ESPAÑA: USO OBLIGATORIO DE Ñ

- todo texto en castellano debe usar español de españa (`es-ES`) y su ortografia, tambien en titulos y cuerpos de commits, changelogs, pull requests, merges y documentacion
- escribir siempre `ñ` en las palabras que la llevan y `Ñ` cuando corresponda la mayuscula; nunca sustituirlas por `n` o `N`
- la `ñ` es una letra distinta de la `n`; las instrucciones «sin acentos» o «sin tildes» solo afectan a las tildes de las vocales y nunca permiten eliminar la eñe
- ejemplos correctos: `añadir`, `diseño`, `año`, `tamaño`, `contraseña`, `español`, `españa` y `AÑADIDO`; sus formas con `n` son incorrectas cuando se refieren a esas palabras españolas
- conservar literalmente rutas, urls, nombres de archivo, identificadores tecnicos y texto de otros idiomas; esta regla no autoriza renombrarlos ni aplicar sustituciones indiscriminadas
- antes de entregar o publicar texto en castellano, revisar que ninguna palabra haya perdido su `ñ` o `Ñ`; esta regla prevalece sobre cualquier normalizacion a ascii o instruccion generica de eliminar acentos


dark dev and dark dev mono colour themes for visual studio code. this guide covers the repository; nested agent instructions apply within their own folders.

## PROJECT OVERVIEW

| property | verified value |
| --- | --- |
| repository | `rezzt-dev/vscode-dev-theme` |
| active source | `./` |
| development base for this change | `main` |
| remote default branch | `main` |
| version source | `package.json`: `1.0.0` |
| continuous integration | no tracked github actions workflows |

## TECHNOLOGY STACK

- no dependency manifest is present; inspect the source files directly and do not assume an install command

## PROJECT STRUCTURE

- `changelog.md`
- `images/`
- `license.md`
- `package-lock.json`
- `package.json`
- `readme.md`
- `samples/`
- `scripts/`
- `security.md`
- `src/`
- `themes/`

management documentation lives in `.docs/manager.md`, `.docs/-github-guides/` and `.docs/repo-audit-and-fix.md`. keep this file and `claude.md` consistent.

## BUILD, RUN AND TEST COMMANDS

from `./`, the available package scripts are:

| command | implementation |
| --- | --- |
| `npm run build` | `node scripts/build.mjs` |
| `npm run check` | `node scripts/check-contrast.mjs` |
| `npm run check:syntax` | `node scripts/check-syntax.mjs` |
| `npm run test` | `npm run build && npm run check` |
| `npm run preview` | `node scripts/preview.mjs` |
| `npm run icon` | `rsvg-convert -w 256 -h 256 images/icon.svg -o images/icon.png` |
| `npm run package` | `npm test && npx --yes @vscode/vsce package --allow-missing-repository --skip-license` |

for application changes, run these checks from `./`:

```bash
npm test
npm run check:syntax
```

## CODE STYLE AND ARCHITECTURAL DECISIONS

edit source palette and syntax roles rather than generated themes; each new role must exist in both variants; keep all colour literals in src/palette.mjs. follow the existing formatter and naming of the changed module. verify manifest versions when dependencies change.

## TESTING STRATEGY

documentation-only changes require `git diff --check`, existing-path checks and a review of the staged file list. run module checks for application changes, with disposable data. report unavailable tooling and failed checks; never claim a check passed without running it.

## SECURITY AND DEPLOYMENT

keep credentials, local configuration, signing material and user data out of commits. do not print secret values while auditing. inspect configuration names and code references instead.

existing legal and community files: `license.md`, `security.md`. when changing dependencies, permissions, storage or network services, review those files against the implementation. record missing policies as audit work; do not invent licence terms or ownership decisions.

deployment, signing, store publication, migrations against hosted databases and repository settings require their own explicit request. this documentation task prepares management instructions and pull requests.

## COMMON TASKS

1. read the relevant module and its nearest agent instructions
2. inspect the working tree and choose the smallest change that solves the request
3. update the affected documentation and changelog with evidence from the diff
4. run checks appropriate to the changed module and report their actual results
5. for git operations, follow the manager and the digest below

## EXISTING PROJECT CONVENTIONS

the following project-specific context is retained from the previous guide. paths are relative to the active module when stated. for git operations, the manager and final digest supersede previous workflow examples.

## AGENTS

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
| `scripts/` | `build.mjs`, `check-contrast.mjs`, `check-syntax.mjs`, `preview.mjs` y `languages.mjs`. |
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
4. si cambias la sintaxis, `npm run check:syntax` (tiene que terminar en "todas las palabras tienen estilo"), `npm run preview` y revisa `preview/*.html`, o pulsa `f5`. un lenguaje nuevo lleva su muestra en `samples/` y su entrada en `scripts/languages.mjs`.
5. añade el cambio a `## SIN PUBLICAR / UNRELEASED` de `changelog.md`.

---

## FICHEROS MARKDOWN

> cada vez que se vaya a crear o modificar un fichero markdown en este repositorio, se aplican estas
> reglas, se haya pedido explícitamente o no.

### REGLA GENERAL

todos los ficheros markdown del repositorio siguen el mismo formato de texto:

- **contenido en minúsculas y con los acentos ortográficos necesarios.** esto incluye párrafos,
  items de listas, celdas de tablas, citas y notas.
- **títulos y encabezados en mayúsculas y sin acentos (conservando siempre `ñ` y `Ñ`).** esto aplica a todos los niveles
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
título va en mayúsculas sin acentos (conservando siempre `ñ` y `Ñ`).

### PRECEDENCIA

esta sección es la referencia de formato para cualquier fichero `.md`. si cualquier otro punto de
este documento indica "sin acentos (conservando siempre `ñ` y `Ñ`)" para el contenido, prevalece esta sección: contenido con
acentos ortográficos, títulos sin acentos (conservando siempre `ñ` y `Ñ`).

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

## ADDITIONAL ENTRY-POINT CONVENTIONS

## CLAUDE

instrucciones específicas para claude code trabajando en este repositorio. las instrucciones
completas del proyecto están en `agents.md`:

@agents.md

---

## SKILLS

al comenzar cualquier tarea que implique diseño visual, componentes de interfaz o revisión del tema,
carga las skills del directorio `.docs/skills/` antes de escribir código:

```
.docs/skills/frontend-design/SKILL.md     — diseño de interfaces web
.docs/skills/impeccable/reference/        — comandos de diseño y calidad visual
```

no empieces a implementar sin haberlas leído. si el directorio `.docs/skills/` tiene ficheros
nuevos, léelos también: el catálogo de skills puede crecer.

---

## COMPORTAMIENTO

- sigue siempre las reglas de commits, pull requests y markdown de `agents.md` aunque no se pidan
  explícitamente.
- antes de crear un rol de sintaxis nuevo, comprueba que `build.mjs` valida correctamente las dos
  variantes de `variants.mjs`.
- no edites `themes/*.json` a mano: esos ficheros los genera `npm test`.
- si encuentras una clave de color inventada (no definida en `src/palette.mjs`), corrígela antes de
  continuar.
- ningún hex suelto fuera de `src/palette.mjs`.

## COMMIT, PR, MERGE & RELEASE GUIDELINES

read `.docs/manager.md` first, then the selected guide in `.docs/-github-guides/`. these files are versioned; this digest also works without opening them.

| request | guide |
| --- | --- |
| commit title, body and changelog | `commit-guide.md`, `changelog-guide.md` |
| pull request or merge | `pr-merge-guide.md`, `branching-guide.md` |
| version and release | `release-guide.md`, `changelog-guide.md` |
| permissions and sensitive data | `agent-rules.md` |

- inspect `git status`, both diffs and recent history before describing changes
- use `<prefix> | <imperative summary>` with `update`, `fix`, `hotfix`, `changes` or `changelog`; keep titles within 72 characters
- write commit bodies as 2 to 6 markdown bullets, one logical change per line, with literal paths in backticks
- never add authorship footers, automated attribution, signatures or generation notices; preserve the configured git identity
- update `changelog.md` under `## SIN PUBLICAR / UNRELEASED` in matching `### CASTELLANO` and `### ENGLISH` sections
- use the existing changelog category vocabulary and preserve language parity; describe only changes in the actual diff
- summarize pull requests in 1 to 3 bullets per category and language, at most 110 characters per bullet
- documentation and repository-management work targets `main`; the remote default is `main`; do not silently promote development work to the default branch
- the authorization for a requested action remains valid throughout that task; creating a pull request includes pushing its branch, but does not authorize merging or publishing
- use merge commits when a merge is requested; never force-push, rewrite published history or remove branches without an explicit instruction
- releases use the approved version and an immutable tag on the verified release commit, with english notes from the closed changelog; do not create a release for documentation work
- deliver requested titles, bodies and changelog fragments in separate code blocks; report executed actions with their commit hash or pull request link
