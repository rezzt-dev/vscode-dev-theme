// paleta de dark dev: los 19 slots de enki, la rampa de tinta y los colores derivados.
// es la única fuente de hex del tema: el resto de módulos consume estos tokens.

export const slots = {
  // fondos
  appBackground: '#080808',
  appBackgroundAlt: '#0A0A0A',
  sidebarBackground: '#0A0A0A',
  surface: '#0D0D0D',
  panelBackground: '#101010',
  panelBackgroundHover: '#181818',
  inputBackground: '#0C0C0C',
  rowBackground: '#0C0C0C',
  rowBackgroundHover: '#151515',

  // texto
  textPrimary: '#EEEEEE',
  textSecondary: '#929292',
  textMuted: '#585858',

  // tinta y acento
  ink: '#EEEEEE',
  inkOn: '#181818',
  accent: '#CCCCCC',

  // scroll
  scrollTrack: '#080808',

  // estado
  danger: '#FF6B6B',
  success: '#54AD7D',
  highlight: '#D9A952',
};

// colores de datos fijos (calendarlayerpalette.cs): no dependen del tema y todos
// tienen ~0.22 de luminancia, así que pasan aa sobre negro y sobre el panel.
export const data = {
  red: '#D5585C', // columna kanban "pendientes"
  amber: '#B28426', // columna kanban "en proceso"
  green: '#3E9767', // columna kanban "realizadas"
  cyan: '#328BA7',
  blue: '#5980CD',
  magenta: '#C552C5',
  steel: '#5B86A7',
  mauve: '#8D76B5',
  plum: '#B963A5',
  sky: '#3785CA',
  violet: '#AB61D5',
  indigo: '#818CF8', // capa de recordatorios
};

// colores de estado de la base dark: variantes más claras para los bright del terminal.
export const baseDark = {
  danger: '#FF9494',
  success: '#76BD97',
  highlight: '#E1BA75',
};

const toHex = (n) => Math.round(n).toString(16).padStart(2, '0').toUpperCase();
const channels = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));

// un color con opacidad: '#RRGGBB' + alfa. vs code lo compone sobre lo que tenga debajo.
export const alpha = (hex, percent) => `${hex.slice(0, 7)}${toHex((percent / 100) * 255)}`;

// mezcla opaca de `hex` sobre `base`, para las claves que vs code exige sin transparencia.
export const mix = (hex, base, percent) => {
  const a = channels(hex);
  const b = channels(base);
  return `#${a.map((v, i) => toHex(b[i] + (v - b[i]) * (percent / 100))).join('')}`;
};

// la rampa ink05…ink90: tinta con opacidad fija. es el verdadero sistema de color.
const inkSteps = [5, 10, 15, 20, 30, 40, 50, 60, 70, 80, 90];
export const ink = Object.fromEntries(inkSteps.map((p) => [p, alpha(slots.ink, p)]));

// la misma rampa resuelta sobre el fondo, para las claves que no admiten alfa.
export const inkSolid = Object.fromEntries(
  inkSteps.map((p) => [p, mix(slots.ink, slots.appBackground, p)]),
);

export const transparent = '#00000000';
