import { reciprocalMetric } from './metric.ts';
import type { SymmetryOperation } from './symmetryOperation.ts';
import type { UnitCell } from './types.ts';

/**
 * The reflections between two spacings, one per set of equivalents.
 */
export interface UniqueReflections {
  /**
   * h k l of each reflection, the greatest of its equivalents.
   */
  hkl: Int32Array;
  multiplicity: Int32Array;
  /**
   * 1/d², in Å⁻².
   */
  inverseDSquared: Float64Array;
}

/**
 * List the reflections with dMin ≤ d ≤ dMax, merging the reflections the Laue
 * group — the rotations of the space group with the inversion added — makes
 * equivalent. Each set is represented by its lexicographically greatest member.
 * @param cell - The unit cell.
 * @param operations - Every operation of the space group.
 * @param dMin - Smallest spacing, in Å.
 * @param dMax - Largest spacing, in Å; `Infinity` keeps every low-order one.
 * @returns The reflections, in no particular order.
 */
export function uniqueReflections(
  cell: UnitCell,
  operations: readonly SymmetryOperation[],
  dMin: number,
  dMax: number,
): UniqueReflections {
  const metric = reciprocalMetric(cell);
  const laue = laueGroup(operations);
  const maximum = 1 / (dMin * dMin);
  const minimum = 1 / (dMax * dMax);
  const slack = maximum * 1e-12;
  const hLimit = Math.floor(cell.a / dMin);
  const kLimit = Math.floor(cell.b / dMin);
  const lLimit = Math.floor(cell.c / dMin);
  const hkl: number[] = [];
  const multiplicity: number[] = [];
  const inverseDSquared: number[] = [];
  const image = new Int32Array(3);
  for (let h = -hLimit; h <= hLimit; h++) {
    for (let k = -kLimit; k <= kLimit; k++) {
      for (let l = -lLimit; l <= lLimit; l++) {
        if (h === 0 && k === 0 && l === 0) continue;
        const value = quadraticForm(metric, h, k, l);
        if (value > maximum + slack || value < minimum - slack) continue;
        let stabilizer = 0;
        let isRepresentative = true;
        for (const rotation of laue) {
          for (let column = 0; column < 3; column++) {
            image[column] =
              h * (rotation[column] as number) +
              k * (rotation[3 + column] as number) +
              l * (rotation[6 + column] as number);
          }
          const order = compare(image, h, k, l);
          if (order > 0) {
            isRepresentative = false;
            break;
          }
          if (order === 0) stabilizer++;
        }
        if (!isRepresentative) continue;
        hkl.push(h, k, l);
        multiplicity.push(laue.length / stabilizer);
        inverseDSquared.push(value);
      }
    }
  }
  return {
    hkl: Int32Array.from(hkl),
    multiplicity: Int32Array.from(multiplicity),
    inverseDSquared: Float64Array.from(inverseDSquared),
  };
}

/**
 * The Laue group of the operations: their rotations and the inversion, closed
 * under composition, so an incomplete list still gives a group.
 * @param operations - Symmetry operations.
 * @returns Row-major integer rotations, the identity first.
 */
export function laueGroup(
  operations: readonly SymmetryOperation[],
): Int8Array[] {
  const keys = new Set<string>();
  const members: Int8Array[] = [];
  const include = (rotation: Int8Array) => {
    const key = rotation.join(',');
    if (keys.has(key)) return;
    keys.add(key);
    members.push(rotation);
  };
  include(Int8Array.of(1, 0, 0, 0, 1, 0, 0, 0, 1));
  include(Int8Array.of(-1, 0, 0, 0, -1, 0, 0, 0, -1));
  for (const { rotation } of operations) include(Int8Array.from(rotation));
  let size = 0;
  while (members.length > size) {
    size = members.length;
    for (let left = 0; left < size; left++) {
      for (let right = 0; right < size; right++) {
        include(
          multiply(members[left] as Int8Array, members[right] as Int8Array),
        );
      }
    }
    if (members.length > 48) {
      throw new Error(
        'The symmetry operations do not form a crystallographic group',
      );
    }
  }
  return members;
}

function multiply(left: Int8Array, right: Int8Array): Int8Array {
  const product = new Int8Array(9);
  for (let row = 0; row < 3; row++) {
    for (let column = 0; column < 3; column++) {
      let sum = 0;
      for (let index = 0; index < 3; index++) {
        sum +=
          (left[row * 3 + index] as number) *
          (right[index * 3 + column] as number);
      }
      product[row * 3 + column] = sum;
    }
  }
  return product;
}

function quadraticForm(metric: Float64Array, h: number, k: number, l: number) {
  return (
    (metric[0] as number) * h * h +
    (metric[4] as number) * k * k +
    (metric[8] as number) * l * l +
    2 *
      ((metric[1] as number) * h * k +
        (metric[2] as number) * h * l +
        (metric[5] as number) * k * l)
  );
}

function compare(image: Int32Array, h: number, k: number, l: number): number {
  const imageH = image[0] as number;
  if (imageH !== h) return imageH - h;
  const imageK = image[1] as number;
  if (imageK !== k) return imageK - k;
  return (image[2] as number) - l;
}
