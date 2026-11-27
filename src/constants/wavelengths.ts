// source: https://gisaxs.com/index.php/X-ray_energy

/**
 * The Kα1, Kα2, weighted Kα and Kβ1 lines of the usual anodes, in Å, by name:
 * `CuKa1`, `MoKa`, `CoKb1`…
 */
export const kAlpha1Angstrom = {
  CuKa: 1.54184,
  CuKa2: 1.54439,
  CuKa1: 1.54056,
  CuKb1: 1.39222,
  MoKa: 0.71073,
  MoKa2: 0.71359,
  MoKa1: 0.7093,
  MoKb1: 0.63229,
  CrKa: 2.291,
  CrKa2: 2.29361,
  CrKa1: 2.2897,
  CrKb1: 2.08487,
  FeKa: 1.93735,
  FeKa2: 1.93998,
  FeKa1: 1.93604,
  FeKb1: 1.75661,
  CoKa: 1.79026,
  CoKa2: 1.79285,
  CoKa1: 1.78896,
  CoKb1: 1.63079,
  AgKa: 0.560885,
  AgKa2: 0.563813,
  AgKa1: 0.559421,
  AgKb1: 0.497082,
} satisfies Record<string, number>;

/**
 * The name of a line of {@link kAlpha1Angstrom}, e.g. `CuKa1`.
 */
export type XrayLine = keyof typeof kAlpha1Angstrom;

/**
 * Whether a name is one of the lines of {@link kAlpha1Angstrom}.
 * @param name - A name read from a file, e.g. `CuKa`.
 * @returns True when the table holds it.
 */
export function isXrayLine(name: string): name is XrayLine {
  return Object.hasOwn(kAlpha1Angstrom, name);
}
