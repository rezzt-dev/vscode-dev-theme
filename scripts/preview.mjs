// renderiza samples/ con las dos variantes en preview/*.html, usando las mismas gramáticas
// textmate que vs code. necesita `npm install` (shiki es la única dependencia de desarrollo).

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { createHighlighter } from 'shiki';

import { buildTheme, variants } from './build.mjs';
import { slots, ink } from '../src/palette.mjs';
import { readSamples, root, sampleLangs } from './languages.mjs';

const samples = readSamples();

const themes = variants.map((v) => ({ ...buildTheme(v), name: v.file.replace('-color-theme.json', '') }));
const highlighter = await createHighlighter({ themes, langs: sampleLangs() });

mkdirSync(join(root, 'preview'), { recursive: true });
for (const theme of themes) {
  const sections = samples
    .map(({ file, lang, code }) => `<section><h2>${file}</h2>${highlighter.codeToHtml(code, { lang, theme: theme.name })}</section>`)
    .join('\n');
  const html = `<!doctype html><meta charset="utf-8"><title>${theme.name}</title><style>
body{background:${slots.appBackground};margin:0;padding:16px;font:13px/1.5 'JetBrains Mono',monospace;columns:2 640px;column-gap:16px}
section{break-inside:avoid;border:1px solid ${ink[10]};margin:0 0 16px}
h2{margin:0;padding:6px 12px;font-size:10.5px;letter-spacing:4px;text-transform:uppercase;color:${ink[40]};border-bottom:1px solid ${ink[10]};background:${slots.appBackgroundAlt}}
pre{margin:0;padding:12px;overflow-x:auto}</style>
${sections}`;
  writeFileSync(join(root, 'preview', `${theme.name}.html`), html);
  console.log(`preview/${theme.name}.html`);
}
