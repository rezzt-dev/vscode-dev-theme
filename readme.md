<div align="center">

# DARK DEV

tema de negro puro para visual studio code y code - oss, sacado del tema incorporado **dark dev**
de enki: brutalismo editorial suizo, monocromo y pensado para pantallas oled. el fondo es
`#000000` real y el color de verdad se reserva para el estado.

<br>

[![licencia](https://img.shields.io/badge/licencia-MIT-000000?style=flat-square&labelColor=1a1a1a)](license.md)
[![vs code](https://img.shields.io/badge/vs%20code-%5E1.75-000000?style=flat-square&labelColor=1a1a1a&logo=visualstudiocode&logoColor=ffffff)](https://marketplace.visualstudio.com/items?itemName=rezzt.dark-dev-theme)
[![open vsx](https://img.shields.io/badge/open%20vsx-disponible-000000?style=flat-square&labelColor=1a1a1a&logo=vscodium&logoColor=ffffff)](https://open-vsx.org/extension/rezzt/dark-dev-theme)

</div>

---

## VARIANTES

| tema | sintaxis |
|---|---|
| **dark dev** | estructura en tinta (palabras clave, funciones, puntuación) y literales, tipos y marcado con la paleta de datos fija de enki: verde para cadenas, ámbar para números, cian para tipos, magenta para constantes. |
| **dark dev mono** | solo la rampa de tinta: la sintaxis se distingue por peso, cursiva y gris. el color aparece únicamente en errores, avisos y diffs. |

las dos variantes comparten exactamente la misma interfaz.

---

## PRINCIPIOS

- **negro real.** el editor, el panel y la barra de estado van en `#000000`; la barra lateral y las
  pestañas inactivas en `#050505`; los widgets flotantes en `#0D0D0D`.
- **la tinta es el acento.** no hay color de marca: hovers, bordes, selección y guías salen de la
  rampa de opacidades `ink05…ink90` (blanco a distintas opacidades sobre negro).
- **bordes, no sombras.** todas las sombras están desactivadas. menús, sugerencias, quick input y
  notificaciones se recortan con un borde `ink20`, que sobre negro puro es lo único que los separa.
- **inversión para lo primario.** el botón principal, las opciones activas de búsqueda y la
  selección del terminal se pintan en blanco con texto negro.
- **color solo para el estado.** rojo `#EF4444` para errores y borrados, verde `#22C55E` para
  añadidos y éxito, amarillo `#EAB308` para avisos y coincidencias de búsqueda.
- **contraste comprobado.** todo token de sintaxis pasa wcag aa (4.5 : 1) sobre el fondo; los
  comentarios usan `#808080` (5.3 : 1) y no el atenuado `#555555`.

---

## PALETA

### fondos y texto

| slot | valor | uso |
|---|---|---|
| `appBackground` | `#000000` | editor, barra de actividad, panel, barra de estado |
| `sidebarBackground` | `#050505` | barra lateral y pestañas inactivas |
| `panelBackground` | `#0D0D0D` | tarjetas, popovers, modales, menús y sugerencias |
| `textPrimary` | `#FFFFFF` | texto principal |
| `textSecondary` | `#A0A0A0` | subtítulos, metadatos, iconos en reposo |
| `textMuted` | `#555555` | placeholders y elementos deshabilitados (no para texto legible) |

### estado

| slot | valor | uso |
|---|---|---|
| `danger` | `#EF4444` | errores, borrados, conflictos y destructivo |
| `success` | `#22C55E` | añadidos, éxito y notificaciones positivas |
| `highlight` | `#EAB308` | avisos y coincidencias de búsqueda |

### sintaxis de dark dev (paleta de datos de enki)

| rol | valor | token |
|---|---|---|
| cadenas | `#3E9767` | `string`, `inlineCode` |
| números y regexp | `#B28426` | `number`, `regexp`, `constantLanguage` |
| tipos | `#328BA7` | `type`, `typeParameter` |
| constantes | `#C552C5` | `constant` |
| etiquetas html/xml | `#5980CD` | `tag` |
| atributos | `#8D76B5` | `attribute` |
| pseudo, decoradores | `#818CF8` | `pseudo`, `decorator` |
| macros y preprocesador | `#AB61D5` | `macro` |
| enlaces | `#3785CA` | `link` |

---

## INSTALACION

**desde el marketplace:**

busca **Dark Dev** en la vista de extensiones de vs code o vscodium, instálalo y selecciona el
tema con <kbd>Ctrl</kbd>+<kbd>K</kbd> <kbd>Ctrl</kbd>+<kbd>T</kbd>.

**desde un `.vsix` local:**

```sh
npm run package
code --install-extension dark-dev-theme-1.0.0.vsix
```

---

## AJUSTES RECOMENDADOS

los temas de color no pueden cambiar fuentes ni radios. para acercarte al aspecto de enki
(jetbrains mono, cursor de bloque y barra de título propia):

<details>
<summary><code>settings.json</code></summary>

```json
{
  "workbench.colorTheme": "Dark Dev",
  "editor.fontFamily": "'JetBrains Mono', monospace",
  "editor.fontSize": 14,
  "editor.lineHeight": 1.6,
  "editor.cursorStyle": "block",
  "editor.cursorBlinking": "solid",
  "editor.renderLineHighlight": "all",
  "editor.bracketPairColorization.enabled": true,
  "editor.guides.bracketPairs": "active",
  "terminal.integrated.fontFamily": "'JetBrains Mono', monospace",
  "window.titleBarStyle": "custom",
  "workbench.tree.indent": 14
}
```

</details>

---

## DESARROLLO

el tema se genera a partir de tokens; los ficheros de `themes/` no se editan a mano.

| ruta | contenido |
|---|---|
| `src/palette.mjs` | los 19 slots, la rampa de tinta, los colores de datos y los helpers `alpha` y `mix`. es el único sitio con hex. |
| `src/workbench.mjs` | las ~900 claves de color de la interfaz, agrupadas por zona. |
| `src/syntax/scopes.mjs` | los roles de sintaxis y los scopes textmate y semánticos que los activan. |
| `src/syntax/variants.mjs` | el estilo de cada rol en dark dev y en dark dev mono. |
| `scripts/build.mjs` | genera `themes/*.json` y valida que todos los valores sean hex. |
| `scripts/check-contrast.mjs` | comprueba el contraste wcag de la sintaxis y los pares de la interfaz. |
| `scripts/preview.mjs` | renderiza `samples/` con las dos variantes en `preview/*.html`. |
| `scripts/check-syntax.mjs` | lista los tokens de `samples/` que caen en el color por defecto (falta una regla). |
| `scripts/languages.mjs` | lenguajes de `samples/`: extensión → gramática. |

```sh
npm run build     # regenera themes/
npm test          # build + contraste
npm install       # solo hace falta para la vista previa (shiki)
npm run preview   # preview/dark-dev.html y preview/dark-dev-mono.html
```

para probarlo en vivo, abre el proyecto en vs code y pulsa <kbd>F5</kbd>: se abre una ventana de
desarrollo con el tema cargado y la carpeta `samples/`.

**publicación:**

```sh
npm run publish:vscode    # marketplace de microsoft (necesita un token de vsce)
npm run publish:openvsx   # open vsx, para vscodium y code - oss (necesita OVSX_PAT)
```

---

## CONTRIBUIR

cualquier cambio en `src/` tiene que pasar `npm test` antes de abrir una pull request. los
criterios de calidad son:

- todos los tokens de sintaxis pasan wcag aa (4.5 : 1) sobre `#000000`.
- no hay claves de color fuera de `src/palette.mjs`.
- las dos variantes de `variants.mjs` definen todos los roles de `scopes.mjs`.

el formato de commits, pull requests y changelog está documentado en [`agents.md`](agents.md).

---

<div align="center">

hecho por [rezzt](https://rezzt.dev) · [licencia MIT](license.md)

</div>
