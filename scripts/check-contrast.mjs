// comprueba el contraste wcag de cada variante: `node scripts/check-contrast.mjs`.
// la sintaxis tiene que pasar aa (4.5 : 1) sobre el editor; los pares de la interfaz,
// el mínimo que se indica en cada uno. sale con código 1 si algo no llega.

import { buildTheme, variants } from './build.mjs';

const channels = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
const opacity = (hex) => (hex.length === 9 ? parseInt(hex.slice(7, 9), 16) / 255 : 1);

// compone un color con alfa sobre un fondo opaco
const over = (hex, base) => {
  const a = opacity(hex);
  const top = channels(hex);
  const bottom = channels(base);
  return `#${top.map((v, i) => Math.round((bottom[i] + (v - bottom[i]) * a) * 255).toString(16).padStart(2, '0')).join('')}`;
};

const luminance = (hex) => {
  const [r, g, b] = channels(hex).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

export const contrast = (fg, bg) => {
  const solid = over(fg, bg);
  const [hi, lo] = [luminance(solid), luminance(bg)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

// roles de sintaxis decorativos que solo necesitan 3 : 1 (componente de interfaz, no texto que leer)
const decorativeRoles = { separator: 3 };

// [primer plano, fondo, mínimo]. el fondo puede llevar alfa: se compone sobre editor.background.
const uiPairs = [
  ['foreground', 'editor.background', 7],
  ['editor.foreground', 'editor.background', 7],
  ['sideBar.foreground', 'sideBar.background', 4.5],
  ['list.activeSelectionForeground', 'list.activeSelectionBackground', 7],
  ['tab.activeForeground', 'tab.activeBackground', 7],
  ['tab.inactiveForeground', 'tab.inactiveBackground', 4.5],
  ['statusBar.foreground', 'statusBar.background', 4.5],
  ['statusBar.debuggingForeground', 'statusBar.debuggingBackground', 7],
  ['statusBarItem.remoteForeground', 'statusBarItem.remoteBackground', 7],
  ['statusBarItem.errorForeground', 'statusBarItem.errorBackground', 4.5],
  ['statusBarItem.warningForeground', 'statusBarItem.warningBackground', 4.5],
  ['button.foreground', 'button.background', 7],
  ['button.foreground', 'button.hoverBackground', 7],
  ['button.secondaryForeground', 'editor.background', 7],
  ['badge.foreground', 'badge.background', 4.5],
  ['activityBarBadge.foreground', 'activityBarBadge.background', 7],
  ['activityBar.inactiveForeground', 'activityBar.background', 4.5],
  ['input.foreground', 'input.background', 7],
  ['inputOption.activeForeground', 'inputOption.activeBackground', 7],
  ['editorWidget.foreground', 'editorWidget.background', 7],
  ['editorSuggestWidget.foreground', 'editorSuggestWidget.background', 4.5],
  ['menu.foreground', 'menu.background', 7],
  ['quickInput.foreground', 'quickInput.background', 7],
  ['descriptionForeground', 'editor.background', 4.5],
  ['editorLineNumber.activeForeground', 'editor.background', 7],
  ['editorInlayHint.foreground', 'editorInlayHint.background', 4.5],
  ['errorForeground', 'editor.background', 4.5],
  ['editorError.foreground', 'editor.background', 4.5],
  ['editorWarning.foreground', 'editor.background', 4.5],
  ['terminal.foreground', 'terminal.background', 7],
  // decorativos: componentes de interfaz, no texto que leer
  ['editorLineNumber.foreground', 'editor.background', 2.5],
  ['pickerGroup.foreground', 'quickInput.background', 3],
  ['focusBorder', 'editor.background', 3],
];

const solidBackground = (colors, key) => {
  const value = colors[key];
  return opacity(value) < 1 ? over(value, colors['editor.background']) : value.slice(0, 7);
};

let failures = 0;
const report = (ok, label, ratio, min) => {
  if (!ok) failures += 1;
  console.log(`  ${ok ? 'ok  ' : 'FAIL'} ${ratio.toFixed(2).padStart(5)} : 1  (mín. ${min})  ${label}`);
};

for (const variant of variants) {
  const theme = buildTheme(variant);
  const editorBg = theme.colors['editor.background'];
  console.log(`\n${theme.name} — sintaxis sobre ${editorBg}`);

  const seen = new Set();
  for (const rule of theme.tokenColors) {
    const key = `${rule.name}:${rule.settings.foreground}`;
    if (seen.has(key)) continue;
    seen.add(key);
    const min = decorativeRoles[rule.name] ?? 4.5;
    const ratio = contrast(rule.settings.foreground, editorBg);
    report(ratio >= min, `${rule.name} ${rule.settings.foreground}`, ratio, min);
  }

  console.log(`${theme.name} — interfaz`);
  for (const [fgKey, bgKey, min] of uiPairs) {
    const bg = solidBackground(theme.colors, bgKey);
    const ratio = contrast(theme.colors[fgKey], bg);
    report(ratio >= min, `${fgKey} sobre ${bgKey}`, ratio, min);
  }
}

console.log(failures ? `\n${failures} pares por debajo del mínimo` : '\ntodos los pares pasan');
process.exit(failures ? 1 : 0);
