// estilo de cada rol de sintaxis en las dos variantes.
// la estructura del código (palabras clave, funciones, puntuación) va siempre en la rampa de tinta;
// lo único que cambia entre variantes es si los literales y los tipos llevan color de datos.

import { inkSolid, nexus as n, slots } from '../palette.mjs';

const s = (foreground, fontStyle = '') => ({ foreground, fontStyle });

// roles comunes: idénticos en las dos variantes.
const shared = {
  comment: s(inkSolid[50], 'italic'), // ink50: el gris más bajo que sigue pasando aa (5.3 : 1)
  commentDoc: s(slots.textSecondary, 'italic'),
  keyword: s(slots.ink),
  keywordControl: s(slots.ink, 'bold'),
  storage: s(slots.ink),
  operator: s(slots.textSecondary),
  punctuation: s(slots.textSecondary),
  embedded: s(slots.ink),
  function: s(slots.ink),
  variable: s(inkSolid[90]),
  supportVariable: s(inkSolid[90]),
  parameter: s(inkSolid[90], 'italic'),
  property: s(inkSolid[80]),
  boolean: s(slots.accent, 'italic'),
  label: s(slots.textSecondary, 'italic'),

  invalid: s(slots.danger, 'underline'),
  deprecated: s(slots.textSecondary, 'strikethrough'),

  heading: s(slots.ink, 'bold'),
  bold: s(slots.ink, 'bold'),
  italic: s(inkSolid[90], 'italic'),
  strike: s(slots.textSecondary, 'strikethrough'),
  quote: s(slots.textSecondary, 'italic'),
  list: s(slots.textSecondary),
  separator: s(inkSolid[40]),

  inserted: s(slots.success),
  deleted: s(slots.danger),
  changed: s(slots.highlight),
  diffRange: s(slots.textSecondary, 'italic'),
};

// dark dev: copia exacta de la sintaxis de "nexus dark" (catppuccin mocha). mapa completo:
// no hereda color de `shared` (que es la tinta de la variante mono); cada rol lleva su hex de nexus.
export const darkDev = {
  comment: s(n.comment, 'italic'),
  commentDoc: s(n.comment, 'italic'),

  // estructura: palabras clave, almacenamiento y etiquetas en rosa cursiva; operadores en azul.
  keyword: s(n.pink, 'italic'),
  keywordControl: s(n.pink, 'italic'),
  macro: s(n.pink, 'italic'),
  storage: s(n.pink, 'italic'),
  operator: s(n.blue),
  punctuation: s(n.text),
  embedded: s(n.text),

  // literales y constantes.
  string: s(n.green),
  stringEscape: s(n.flamingo),
  regexp: s(n.green),
  number: s(n.flamingo),
  boolean: s(n.flamingo),
  constantLanguage: s(n.flamingo),
  constant: s(n.yellow),

  // nombres: funciones en melocotón, tipos en amarillo, globales en cielo.
  function: s(n.peach),
  type: s(n.yellow),
  typeParameter: s(n.yellow),
  variable: s(n.subtext),
  supportVariable: s(n.sky),
  parameter: s(n.subtext),
  property: s(n.text),
  self: s(n.mauve, 'italic'),
  namespace: s(n.lavender),

  // marcado y plantillas.
  tag: s(n.pink),
  attribute: s(n.peach),
  pseudo: s(n.peach),
  decorator: s(n.peach),
  label: s(n.subtext),

  invalid: s(n.pink, 'underline'),
  deprecated: s(n.pink, 'italic underline'),

  heading: s(n.pink, 'bold'),
  bold: s(n.text, 'bold'),
  italic: s(n.text, 'italic'),
  strike: s(n.subtext, 'strikethrough'),
  inlineCode: s(n.green),
  link: s(n.blue),
  quote: s(n.subtext, 'italic'),
  list: s(n.subtext),
  separator: s(n.comment),

  inserted: s(n.green),
  deleted: s(n.pink),
  changed: s(n.yellow),
  diffRange: s(n.blue),
};

// dark dev mono: solo tinta. el color queda reservado al estado (errores, diffs).
export const darkDevMono = {
  ...shared,
  string: s(slots.textSecondary),
  stringEscape: s(slots.ink, 'bold'),
  regexp: s(slots.textSecondary, 'italic'),
  number: s(slots.accent),
  constantLanguage: s(slots.accent, 'italic'),
  macro: s(inkSolid[80], 'bold'),
  constant: s(slots.ink, 'italic'),
  type: s(slots.ink, 'italic'),
  typeParameter: s(inkSolid[80], 'italic'),
  self: s(inkSolid[80], 'italic'),
  namespace: s(inkSolid[80]),
  tag: s(slots.ink),
  attribute: s(slots.textSecondary, 'italic'),
  pseudo: s(inkSolid[80], 'italic'),
  decorator: s(slots.textSecondary, 'italic'),
  inlineCode: s(slots.textSecondary),
  link: s(inkSolid[90], 'underline'),
};
