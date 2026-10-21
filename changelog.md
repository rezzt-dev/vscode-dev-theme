# CHANGELOG

## SIN PUBLICAR / UNRELEASED

### CASTELLANO

#### NUEVO
- añadir la paleta `nexus` (catppuccin mocha) a `src/palette.mjs` como referencia de color exacta para la variante a color
- añadir el rol `boolean` a `src/syntax/scopes.mjs` con los scopes de `constant.language.boolean`, `.null`, `.undefined`, `.nan`, `.infinity` y `variable.language.null`, separándolos de `constantLanguage`
- añadir el rol `supportVariable` a `src/syntax/scopes.mjs` con los scopes de globales del dom, process, node y handlebars, separándolos de `variable`
- añadir scopes de c, c++, c#, java, go, php, ruby, swift, kotlin, scala, dart, objective-c, f#, groovy, haskell, elixir, clojure, r, julia, perl, lua, zig, nim, sql, graphql, protobuf, terraform, yaml, toml, ini, dockerfile, makefile, powershell, batch, latex, scss, sass, less, jsx, jsonc, dotenv, vue, svelte, xml, diff y ensamblador a los roles de `src/syntax/scopes.mjs`
- añadir el rol `macro` (directivas del preprocesador y macros) a `src/syntax/scopes.mjs` y a las dos variantes de `src/syntax/variants.mjs`
- añadir los tokens semánticos de rust-analyzer y clangd (`lifetime`, `builtinType`, `selfKeyword`, `attribute`, `derive`, `concept`…) y `variable.readonly` → `constant`
- añadir `scripts/check-syntax.mjs` (`npm run check:syntax`) para listar las palabras de `samples/` que no reciben estilo
- añadir 49 muestras en `samples/` y `scripts/languages.mjs` con el mapa extensión → gramática que comparten `preview.mjs` y `check-syntax.mjs`
- añadir el tema `Dark Dev` para visual studio code y code - oss, con la interfaz completa (~900 claves) mapeada a los 19 slots y a la rampa de tinta de enki
- añadir la variante `Dark Dev Mono`, con sintaxis solo en tinta y color reservado al estado
- añadir el generador `scripts/build.mjs`, que construye `themes/*.json` a partir de `src/palette.mjs`, `src/workbench.mjs` y `src/syntax/`
- añadir `scripts/check-contrast.mjs` para validar que la sintaxis pasa wcag aa sobre el fondo y que los pares de la interfaz llegan a su mínimo
- añadir `scripts/preview.mjs` y la carpeta `samples/` para revisar el resaltado con las gramáticas textmate de vs code
- añadir el icono de la extensión y la configuración de `f5` para probar el tema en una ventana de desarrollo

#### CAMBIOS
- reescribir la variante `darkDev` en `src/syntax/variants.mjs` con el mapa completo de nexus dark (catppuccin mocha): cada rol lleva su hex de nexus sin heredar de `shared`, igualando visualmente al tema nexus dark
- añadir `supportVariable` y `boolean` a `shared` en `src/syntax/variants.mjs` para que `darkDevMono` los herede con tinta correctamente
- redirigir los tokens semánticos `variable.defaultLibrary` y `boolean` a los nuevos roles `supportVariable` y `boolean` en `src/syntax/scopes.mjs` (antes apuntaban a `constantLanguage`)
- actualizar los 19 slots de `src/palette.mjs` a la nueva paleta de enki: fondos más cálidos (#080808–#181818), tinta e texto primario al 93% de blanco (#EEEEEE), estado suavizado (danger #FF6B6B, success #54AD7D, highlight #D9A952) e inkOn oscuro (#181818)
- actualizar `baseDark` con variantes más claras proporcionales a los nuevos colores de estado del terminal
- activar el slot `surface` (#0D0D0D) en `src/workbench.mjs`: usado ahora en `surface.background`, `peekViewTitle.background`, `peekViewResult.background` y `notebook.cellEditorBackground`
- cambiar `editorInlayHint.foreground` de `inkSolid[50]` a `textSecondary` para garantizar contraste mínimo 4.5:1 sobre el nuevo fondo de panel (#101010)
- sincronizar `.docs/resources/color-palette-theme.css` con los valores nuevos de la paleta
- cambiar el token semántico `macro` de `src/syntax/scopes.mjs` para que use el rol `macro` en lugar de `function`
- refactorizar `scripts/preview.mjs` para leer las muestras y sus gramáticas de `scripts/languages.mjs` en lugar de una lista fija de ocho lenguajes
- documentar `check:syntax`, `scripts/languages.mjs` y el rol `macro` en `readme.md` y `agents.md`

#### CORREGIDO
- declarar `repository` en `package.json` para que `npm run package` no falle por el enlace relativo a `license.md` del readme

### ENGLISH

#### ADDED
- add the `nexus` palette (catppuccin mocha) to `src/palette.mjs` as the exact colour reference for the coloured variant
- add the `boolean` role to `src/syntax/scopes.mjs` with the `constant.language.boolean`, `.null`, `.undefined`, `.nan`, `.infinity` and `variable.language.null` scopes, separated from `constantLanguage`
- add the `supportVariable` role to `src/syntax/scopes.mjs` with the dom, process, node and handlebars global scopes, separated from `variable`
- add scopes for c, c++, c#, java, go, php, ruby, swift, kotlin, scala, dart, objective-c, f#, groovy, haskell, elixir, clojure, r, julia, perl, lua, zig, nim, sql, graphql, protobuf, terraform, yaml, toml, ini, dockerfile, makefile, powershell, batch, latex, scss, sass, less, jsx, jsonc, dotenv, vue, svelte, xml, diff and assembly to the roles in `src/syntax/scopes.mjs`
- add the `macro` role (preprocessor directives and macros) to `src/syntax/scopes.mjs` and both variants in `src/syntax/variants.mjs`
- add the rust-analyzer and clangd semantic tokens (`lifetime`, `builtinType`, `selfKeyword`, `attribute`, `derive`, `concept`…) and `variable.readonly` → `constant`
- add `scripts/check-syntax.mjs` (`npm run check:syntax`) to list the words in `samples/` that get no style
- add 49 samples in `samples/` and `scripts/languages.mjs` with the extension → grammar map shared by `preview.mjs` and `check-syntax.mjs`
- add the `Dark Dev` theme for visual studio code and code - oss, with the full workbench (~900 keys) mapped to enki's 19 slots and ink ramp
- add the `Dark Dev Mono` variant, with ink-only syntax and colour reserved for state
- add the `scripts/build.mjs` generator, which builds `themes/*.json` from `src/palette.mjs`, `src/workbench.mjs` and `src/syntax/`
- add `scripts/check-contrast.mjs` to check that syntax passes wcag aa on the background and that workbench pairs reach their minimum
- add `scripts/preview.mjs` and the `samples/` folder to review highlighting with vs code's textmate grammars
- add the extension icon and the `f5` launch configuration to try the theme in a development window

#### CHANGED
- rewrite the `darkDev` variant in `src/syntax/variants.mjs` with the full nexus dark (catppuccin mocha) colour map: each role carries its nexus hex without inheriting from `shared`, matching nexus dark visually
- add `supportVariable` and `boolean` to `shared` in `src/syntax/variants.mjs` so `darkDevMono` inherits them correctly in ink
- redirect the `variable.defaultLibrary` and `boolean` semantic tokens to the new `supportVariable` and `boolean` roles in `src/syntax/scopes.mjs` (previously pointing to `constantLanguage`)
- update the 19 slots in `src/palette.mjs` to the new enki palette: warmer backgrounds (#080808–#181818), ink and primary text at 93% white (#EEEEEE), softened state colours (danger #FF6B6B, success #54AD7D, highlight #D9A952) and a dark inkOn (#181818)
- update `baseDark` with proportionally lighter variants for the new terminal state colours
- activate the `surface` slot (#0D0D0D) in `src/workbench.mjs`: now used for `surface.background`, `peekViewTitle.background`, `peekViewResult.background` and `notebook.cellEditorBackground`
- change `editorInlayHint.foreground` from `inkSolid[50]` to `textSecondary` to guarantee a minimum 4.5:1 contrast on the new panel background (#101010)
- sync `.docs/resources/color-palette-theme.css` with the new palette values
- change the `macro` semantic token in `src/syntax/scopes.mjs` to use the `macro` role instead of `function`
- refactor `scripts/preview.mjs` to read samples and their grammars from `scripts/languages.mjs` instead of a fixed list of eight languages
- document `check:syntax`, `scripts/languages.mjs` and the `macro` role in `readme.md` and `agents.md`

#### FIXED
- declare `repository` in `package.json` so `npm run package` no longer fails on the readme's relative link to `license.md`
