# CHANGELOG

## SIN PUBLICAR / UNRELEASED

### CASTELLANO

#### CAMBIOS
- actualizar los 19 slots de `src/palette.mjs` a la nueva paleta de enki: fondos más cálidos (#080808–#181818), tinta e texto primario al 93% de blanco (#EEEEEE), estado suavizado (danger #FF6B6B, success #54AD7D, highlight #D9A952) e inkOn oscuro (#181818)
- actualizar `baseDark` con variantes más claras proporcionales a los nuevos colores de estado del terminal
- activar el slot `surface` (#0D0D0D) en `src/workbench.mjs`: usado ahora en `surface.background`, `peekViewTitle.background`, `peekViewResult.background` y `notebook.cellEditorBackground`
- cambiar `editorInlayHint.foreground` de `inkSolid[50]` a `textSecondary` para garantizar contraste mínimo 4.5:1 sobre el nuevo fondo de panel (#101010)
- sincronizar `.docs/resources/color-palette-theme.css` con los valores nuevos de la paleta

#### NUEVO
- añadir el tema `Dark Dev` para visual studio code y code - oss, con la interfaz completa (~900 claves) mapeada a los 19 slots y a la rampa de tinta de enki
- añadir la variante `Dark Dev Mono`, con sintaxis solo en tinta y color reservado al estado
- añadir el generador `scripts/build.mjs`, que construye `themes/*.json` a partir de `src/palette.mjs`, `src/workbench.mjs` y `src/syntax/`
- añadir `scripts/check-contrast.mjs` para validar que la sintaxis pasa wcag aa sobre el fondo y que los pares de la interfaz llegan a su mínimo
- añadir `scripts/preview.mjs` y la carpeta `samples/` para revisar el resaltado con las gramáticas textmate de vs code
- añadir el icono de la extensión y la configuración de `f5` para probar el tema en una ventana de desarrollo

### ENGLISH

#### CHANGED
- update the 19 slots in `src/palette.mjs` to the new enki palette: warmer backgrounds (#080808–#181818), ink and primary text at 93% white (#EEEEEE), softened state colours (danger #FF6B6B, success #54AD7D, highlight #D9A952) and a dark inkOn (#181818)
- update `baseDark` with proportionally lighter variants for the new terminal state colours
- activate the `surface` slot (#0D0D0D) in `src/workbench.mjs`: now used for `surface.background`, `peekViewTitle.background`, `peekViewResult.background` and `notebook.cellEditorBackground`
- change `editorInlayHint.foreground` from `inkSolid[50]` to `textSecondary` to guarantee a minimum 4.5:1 contrast on the new panel background (#101010)
- sync `.docs/resources/color-palette-theme.css` with the new palette values

#### ADDED
- add the `Dark Dev` theme for visual studio code and code - oss, with the full workbench (~900 keys) mapped to enki's 19 slots and ink ramp
- add the `Dark Dev Mono` variant, with ink-only syntax and colour reserved for state
- add the `scripts/build.mjs` generator, which builds `themes/*.json` from `src/palette.mjs`, `src/workbench.mjs` and `src/syntax/`
- add `scripts/check-contrast.mjs` to check that syntax passes wcag aa on the background and that workbench pairs reach their minimum
- add `scripts/preview.mjs` and the `samples/` folder to review highlighting with vs code's textmate grammars
- add the extension icon and the `f5` launch configuration to try the theme in a development window
