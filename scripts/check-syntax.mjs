// busca tokens sin colorear en samples/: `node scripts/check-syntax.mjs [lenguaje]`.
// tokeniza cada muestra con las gramáticas de vs code y lista los scopes de las palabras que
// caen en el color por defecto, que es donde falta una regla. no falla el build: es una guía.
// ignora los scopes genéricos (`source.*`, `text.*`, `meta.*`): ahí la gramática no distingue nada.
// con `--meta` muestra también los `meta.*`.

import { createHighlighter } from 'shiki';

import { buildTheme, variants } from './build.mjs';
import { readSamples, sampleLangs } from './languages.mjs';

const args = process.argv.slice(2);
const showMeta = args.includes('--meta');
const only = args.find((a) => !a.startsWith('--'));
const theme = { ...buildTheme(variants[0]), name: 'dark-dev' };
const fallback = theme.colors['editor.foreground'].toLowerCase();
const samples = readSamples().filter(({ lang }) => !only || lang === only);

const highlighter = await createHighlighter({ themes: [theme], langs: sampleLangs() });

let total = 0;
for (const { file, lang, code } of samples) {
  const gaps = new Map();
  const { tokens } = highlighter.codeToTokens(code, { lang, theme: 'dark-dev', includeExplanation: true });
  for (const token of tokens.flat()) {
    for (const part of token.explanation ?? []) {
      const word = part.content.trim();
      if (!/[\p{L}\p{N}]/u.test(word)) continue;
      const style = part.scopes.at(-1)?.themeMatches.at(-1)?.settings;
      if (style?.foreground) continue;
      const scope = part.scopes.at(-1).scopeName;
      if (/^(source|text)\./.test(scope) || (!showMeta && scope.startsWith('meta.'))) continue;
      const entry = gaps.get(scope) ?? new Set();
      entry.add(word);
      gaps.set(scope, entry);
    }
  }
  if (!gaps.size) continue;
  console.log(`\n${file} (${lang})`);
  for (const [scope, words] of gaps) {
    console.log(`  ${scope}  ← ${[...words].slice(0, 4).join(' ')}`);
    total += 1;
  }
}
console.log(total ? `\n${total} scopes sin estilo propio (usan ${fallback})` : '\ntodas las palabras tienen estilo');
