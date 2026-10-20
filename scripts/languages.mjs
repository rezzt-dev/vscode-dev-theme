// lenguajes de samples/: extensión → gramática de shiki. lo comparten preview.mjs y check-syntax.mjs.

import { readFileSync, readdirSync } from 'node:fs';
import { extname, join } from 'node:path';

export const root = join(import.meta.dirname, '..');

export const languages = {
  '.asm': 'asm', '.bat': 'bat', '.c': 'c', '.clj': 'clojure', '.cpp': 'cpp', '.cs': 'csharp',
  '.css': 'css', '.dart': 'dart', '.diff': 'diff', '.dockerfile': 'docker', '.env': 'dotenv', '.ex': 'elixir',
  '.fs': 'fsharp', '.go': 'go', '.graphql': 'graphql', '.groovy': 'groovy', '.hs': 'haskell',
  '.html': 'html', '.ini': 'ini', '.java': 'java', '.jl': 'julia', '.js': 'javascript',
  '.json': 'json', '.jsonc': 'jsonc', '.jsx': 'jsx', '.kt': 'kotlin', '.less': 'less', '.lua': 'lua', '.m': 'objective-c', '.md': 'markdown',
  '.mk': 'makefile', '.nim': 'nim', '.php': 'php', '.pl': 'perl', '.proto': 'protobuf',
  '.ps1': 'powershell', '.py': 'python', '.r': 'r', '.rb': 'ruby', '.rs': 'rust', '.scala': 'scala',
  '.sass': 'sass', '.scss': 'scss', '.sh': 'shellscript', '.sql': 'sql', '.svelte': 'svelte', '.swift': 'swift',
  '.tex': 'latex', '.tf': 'terraform', '.toml': 'toml', '.ts': 'typescript', '.tsx': 'tsx',
  '.v': 'verilog', '.vue': 'vue', '.xml': 'xml', '.yaml': 'yaml', '.zig': 'zig',
};

export const sampleLangs = () => [...new Set(Object.values(languages))];

// [{ file, lang, code }] de samples/, ordenado por nombre
export function readSamples() {
  const dir = join(root, 'samples');
  return readdirSync(dir)
    .filter((file) => languages[extname(file)])
    .sort()
    .map((file) => ({ file, lang: languages[extname(file)], code: readFileSync(join(dir, file), 'utf8') }));
}
