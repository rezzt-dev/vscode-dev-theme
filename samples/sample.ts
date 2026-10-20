// muestra de typescript para revisar el resaltado de dark dev
import { readFile } from 'node:fs/promises';
import type { Theme } from './types';

/**
 * carga un tema desde disco.
 * @param path ruta al fichero json
 * @returns el tema ya validado
 */
export async function loadTheme<T extends Theme>(path: string): Promise<T> {
  const raw = await readFile(path, 'utf8');
  const theme = JSON.parse(raw) as T;
  if (!theme.colors) throw new Error(`tema sin colores: ${path}`);
  return theme;
}

const MAX_SLOTS = 19;
const pattern = /^#([0-9a-f]{6}|[0-9a-f]{8})$/i;

enum Appearance {
  Dark = 'dark',
  Light = 'light',
}

@sealed
class ThemeRegistry {
  #active: Theme | null = null;
  private readonly themes = new Map<string, Theme>();

  constructor(public readonly appearance: Appearance = Appearance.Dark) {}

  activate(id: string): boolean {
    const theme = this.themes.get(id);
    if (theme === undefined || this.themes.size > MAX_SLOTS) return false;
    this.#active = theme;
    return pattern.test(theme.colors['editor.background'] ?? '') && true;
  }
}

function sealed(constructor: Function) {
  Object.seal(constructor);
}

export default new ThemeRegistry();
