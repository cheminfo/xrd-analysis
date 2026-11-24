/**
 * A symmetry operation on fractional coordinates: x' = R·x + t.
 * `rotation` is row-major, row i giving the coefficients of x, y, z in the i-th
 * coordinate.
 */
export interface SymmetryOperation {
  rotation: Int8Array;
  translation: Float64Array;
}

/**
 * Read an operation as a CIF writes it, e.g. `-y, x-y, z+2/3` or `1/2+X,1/2-Y,Z`.
 * @param text - Three comma-separated expressions in x, y and z.
 * @returns The rotation and the translation.
 */
export function parseSymmetryOperation(text: string): SymmetryOperation {
  const parts = text.toLowerCase().replaceAll(/\s+/g, '').split(',');
  if (parts.length !== 3) {
    throw new Error(`Symmetry operation "${text}" does not have three parts`);
  }
  const rotation = new Int8Array(9);
  const translation = new Float64Array(3);
  for (let row = 0; row < 3; row++) {
    const terms = (parts[row] as string).match(/[+-]?[^+-]+/g);
    if (!terms) {
      throw new Error(`Symmetry operation "${text}" has an empty part`);
    }
    for (const term of terms) {
      const axis = 'xyz'.indexOf(term.at(-1) as string);
      if (axis === -1) {
        translation[row] =
          (translation[row] as number) + readNumber(term, text);
        continue;
      }
      const factor = term.slice(0, -1).replace(/\*$/, '');
      const coefficient =
        factor === '' || factor === '+'
          ? 1
          : factor === '-'
            ? -1
            : readNumber(factor, text);
      rotation[row * 3 + axis] = coefficient;
    }
  }
  return { rotation, translation };
}

function readNumber(term: string, text: string): number {
  const [numerator, denominator] = term.split('/', 2);
  const value =
    denominator === undefined
      ? Number(numerator)
      : Number(numerator) / Number(denominator);
  if (!Number.isFinite(value)) {
    throw new Error(`Symmetry operation "${text}" has an unreadable term`);
  }
  return value;
}
