// estilo de cada rol de sintaxis en las dos variantes.
// la estructura del código (palabras clave, funciones, puntuación) va siempre en la rampa de tinta;
// lo único que cambia entre variantes es si los literales y los tipos llevan color de datos.

import { data, inkSolid, slots } from '../palette.mjs';

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
  parameter: s(inkSolid[90], 'italic'),
  property: s(inkSolid[80]),
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

// dark dev: la paleta de datos de enki para literales, tipos y marcado.
export const darkDev = {
  ...shared,
  string: s(data.green),
  stringEscape: s(slots.highlight),
  regexp: s(data.amber),
  number: s(data.amber),
  constantLanguage: s(data.amber),
  constant: s(data.magenta),
  type: s(data.cyan),
  typeParameter: s(data.cyan, 'italic'),
  self: s(data.plum, 'italic'),
  namespace: s(data.steel),
  tag: s(data.blue),
  attribute: s(data.mauve, 'italic'),
  pseudo: s(data.indigo),
  decorator: s(data.indigo),
  inlineCode: s(data.green),
  link: s(data.sky, 'underline'),
};

// dark dev mono: solo tinta. el color queda reservado al estado (errores, diffs).
export const darkDevMono = {
  ...shared,
  string: s(slots.textSecondary),
  stringEscape: s(slots.ink, 'bold'),
  regexp: s(slots.textSecondary, 'italic'),
  number: s(slots.accent),
  constantLanguage: s(slots.accent, 'italic'),
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
