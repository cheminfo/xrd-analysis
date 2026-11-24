import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import type { CrystalSite, UnitCell } from '../types.ts';

/**
 * Nine COD structures, from cubic to triclinic, read by `data/reference.py`.
 */
export const STRUCTURES = [
  'halite',
  'quartz',
  'calcite',
  'wurtzite',
  'perovskite',
  'gypsum',
  'chalcanthite',
  'aspirin',
  'naphthalene',
] as const;

export interface Fixture {
  name: string;
  cell: UnitCell;
  operations: string[];
  sites: Array<Required<CrystalSite> & { label: string; uiso: number }>;
  /**
   * How many atoms gemmi puts in the cell.
   */
  cellAtoms: number;
  /**
   * h, k, l, d, |F|² from gemmi, with its IT92 form factors.
   */
  structureFactors: Array<[number, number, number, number, number]>;
  /**
   * pymatgen's pattern, Cu Kα1, 5–90°, no Debye–Waller factor.
   */
  pymatgen: Array<{ twoTheta: number; intensity: number; d: number }>;
}

/**
 * Read a JSON file of the data folder.
 * @param name - File name without `.json`.
 * @returns The parsed content.
 */
export function readJson(name: string): unknown {
  return JSON.parse(
    readFileSync(join(import.meta.dirname, 'data', `${name}.json`), 'utf8'),
  );
}

/**
 * Read one of the {@link STRUCTURES}.
 * @param name - Its name.
 * @returns The structure and what gemmi and pymatgen make of it.
 */
export function readFixture(name: string): Fixture {
  return readJson(name) as Fixture;
}

/**
 * The item at an index, which must exist.
 * @param list - An array or a typed array.
 * @param index - The index.
 * @returns The item.
 */
export function item<T>(list: ArrayLike<T>, index: number): T {
  const value = list[index];
  if (value === undefined) throw new Error(`Nothing at index ${index}`);
  return value;
}
