// muestra de javascript para revisar el resaltado de dark dev
import fs, { readFileSync as read } from 'node:fs';
export * from './palette.mjs';

const MAX_STEPS = 16;
let cache = new Map();

/**
 * Devuelve el alfa.
 * @param {number} percent porcentaje
 * @returns {string}
 */
export async function alpha(percent = 50, ...rest) {
  const { name, value: v = 0 } = this ?? {};
  const re = /^#([0-9a-f]{6})$/i;
  try {
    const data = await fetch(`/api/${name}?p=${percent}`).then((r) => r.json());
    return data.items?.map((item) => item.id).filter(Boolean) ?? [];
  } catch (error) {
    console.error(error);
  } finally {
    cache.clear();
  }
}

class Ramp extends Array {
  static #count = 0;
  get first() { return this[0]; }
  constructor(...steps) { super(...steps); Ramp.#count++; }
}

document.querySelectorAll('.slot').forEach((el) => el.addEventListener('click', () => void 0));
label: for (const i of [1, 2, 3]) { if (i === 2) continue label; }
