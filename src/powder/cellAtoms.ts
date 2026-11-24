import { directMetric } from './metric.ts';
import type { SymmetryOperation } from './symmetryOperation.ts';
import type { CrystalSite, UnitCell } from './types.ts';

/**
 * Two images of one site closer than this, in Å, are one atom.
 */
const SAME_POSITION = 0.1;

/**
 * Every atom of the cell, as parallel arrays.
 */
export interface CellAtoms {
  /**
   * Fractional coordinates, x y z for each atom, wrapped into [0, 1).
   */
  positions: Float64Array;
  /**
   * The index of the site each atom comes from.
   */
  sites: Int32Array;
}

/**
 * Fill the cell: each site is carried by every operation, and the images that
 * land on one another — a site on a mirror, an inversion centre — count once,
 * at the mean of their positions. A special position a CIF rounds (0.3333 for
 * 1/3) is thereby put back exactly on its symmetry element.
 * @param cell - The unit cell, which measures how close two images are.
 * @param operations - Every operation of the space group.
 * @param sites - The asymmetric unit.
 * @returns The atoms of the cell.
 */
export function cellAtoms(
  cell: UnitCell,
  operations: readonly SymmetryOperation[],
  sites: readonly CrystalSite[],
): CellAtoms {
  const metric = directMetric(cell);
  const tolerance = SAME_POSITION * SAME_POSITION;
  const sums: number[] = [];
  const counts: number[] = [];
  const siteIndices: number[] = [];
  const image = new Float64Array(3);
  const delta = new Float64Array(3);
  for (let siteIndex = 0; siteIndex < sites.length; siteIndex++) {
    const site = sites[siteIndex] as CrystalSite;
    const firstAtom = counts.length;
    for (const { rotation, translation } of operations) {
      for (let row = 0; row < 3; row++) {
        image[row] =
          (rotation[row * 3] as number) * site.x +
          (rotation[row * 3 + 1] as number) * site.y +
          (rotation[row * 3 + 2] as number) * site.z +
          (translation[row] as number);
      }
      const atom = findAtom(
        image,
        sums,
        counts,
        firstAtom,
        metric,
        tolerance,
        delta,
      );
      if (atom === -1) {
        sums.push(image[0] as number, image[1] as number, image[2] as number);
        counts.push(1);
        siteIndices.push(siteIndex);
        continue;
      }
      const count = counts[atom] as number;
      for (let axis = 0; axis < 3; axis++) {
        const mean = (sums[atom * 3 + axis] as number) / count;
        sums[atom * 3 + axis] =
          (sums[atom * 3 + axis] as number) + mean + (delta[axis] as number);
      }
      counts[atom] = count + 1;
    }
  }
  const positions = new Float64Array(sums.length);
  for (let index = 0; index < sums.length; index++) {
    const mean =
      (sums[index] as number) / (counts[Math.floor(index / 3)] as number);
    positions[index] = mean - Math.floor(mean);
  }
  return { positions, sites: Int32Array.from(siteIndices) };
}

/**
 * The atom of this site an image lands on, or -1.
 * @param image - The image, fractional.
 * @param sums - Summed positions of the atoms found so far.
 * @param counts - How many images each atom gathers.
 * @param firstAtom - The first atom of the site.
 * @param metric - The direct metric tensor.
 * @param tolerance - Squared distance, in Å², under which two positions meet.
 * @param delta - Receives the image's offset from the atom, wrapped to ±½.
 * @returns The index of the atom.
 */
function findAtom(
  image: Float64Array,
  sums: number[],
  counts: number[],
  firstAtom: number,
  metric: Float64Array,
  tolerance: number,
  delta: Float64Array,
): number {
  for (let atom = firstAtom; atom < counts.length; atom++) {
    const count = counts[atom] as number;
    for (let axis = 0; axis < 3; axis++) {
      const difference =
        (image[axis] as number) - (sums[atom * 3 + axis] as number) / count;
      delta[axis] = difference - Math.round(difference);
    }
    let distance2 = 0;
    for (let row = 0; row < 3; row++) {
      for (let column = 0; column < 3; column++) {
        distance2 +=
          (delta[row] as number) *
          (metric[row * 3 + column] as number) *
          (delta[column] as number);
      }
    }
    if (distance2 < tolerance) return atom;
  }
  return -1;
}
