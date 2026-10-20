// genera themes/*.json a partir de src/. sin dependencias: `node scripts/build.mjs`.

import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { semantic, scopes } from '../src/syntax/scopes.mjs';
import { darkDev, darkDevMono } from '../src/syntax/variants.mjs';
import { workbench } from '../src/workbench.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

export const variants = [
  { name: 'Dark Dev', file: 'dark-dev-color-theme.json', roles: darkDev },
  { name: 'Dark Dev Mono', file: 'dark-dev-mono-color-theme.json', roles: darkDevMono },
];

const hex = /^#([0-9A-F]{6}|[0-9A-F]{8})$/i;

function tokenColors(roles) {
  return Object.entries(scopes).map(([role, scope]) => {
    const style = roles[role];
    if (!style) throw new Error(`el rol "${role}" no tiene estilo`);
    const settings = { foreground: style.foreground };
    if (style.fontStyle !== undefined) settings.fontStyle = style.fontStyle;
    return { name: role, scope, settings };
  });
}

function semanticTokenColors(roles) {
  const out = Object.fromEntries(
    Object.entries(semantic).map(([token, role]) => {
      const { foreground, fontStyle } = roles[role];
      return [token, fontStyle ? { foreground, fontStyle } : foreground];
    }),
  );
  // modificadores que no dependen del rol
  out['*.deprecated'] = { fontStyle: 'strikethrough' };
  return out;
}

function validate(theme) {
  const bad = [];
  for (const [key, value] of Object.entries(theme.colors)) {
    if (!hex.test(value)) bad.push(`colors.${key} = ${value}`);
  }
  for (const rule of theme.tokenColors) {
    if (!hex.test(rule.settings.foreground)) bad.push(`tokenColors.${rule.name} = ${rule.settings.foreground}`);
  }
  if (bad.length) throw new Error(`${theme.name}: valores no válidos\n  ${bad.join('\n  ')}`);
}

export function buildTheme({ name, roles }) {
  const theme = {
    $schema: 'vscode://schemas/color-theme',
    name,
    type: 'dark',
    semanticHighlighting: true,
    colors: workbench(roles),
    tokenColors: tokenColors(roles),
    semanticTokenColors: semanticTokenColors(roles),
  };
  validate(theme);
  return theme;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  for (const variant of variants) {
    const path = join(root, 'themes', variant.file);
    mkdirSync(dirname(path), { recursive: true });
    const theme = buildTheme(variant);
    writeFileSync(path, `${JSON.stringify(theme, null, 2)}\n`);
    console.log(`${variant.name}: ${Object.keys(theme.colors).length} colores, ${theme.tokenColors.length} reglas → themes/${variant.file}`);
  }
}
