import type { UnitCell } from './types.ts';

/**
 * The metric tensor of the cell, G = [a·a a·b a·c; …], row-major: the squared
 * length of a fractional vector u is uᵀ G u.
 * @param cell - Edges in Å, angles in degrees.
 * @returns Nine numbers, in Å².
 */
export function directMetric(cell: UnitCell): Float64Array {
  const { g11, g12, g13, g22, g23, g33 } = metricTerms(cell);
  return Float64Array.of(g11, g12, g13, g12, g22, g23, g13, g23, g33);
}

/**
 * The reciprocal metric tensor G* = G⁻¹: 1/d² of the planes (hkl) is hᵀ G* h.
 * @param cell - Edges in Å, angles in degrees.
 * @returns Nine numbers, in Å⁻².
 */
export function reciprocalMetric(cell: UnitCell): Float64Array {
  const { g11, g12, g13, g22, g23, g33 } = metricTerms(cell);
  const c11 = g22 * g33 - g23 * g23;
  const c12 = g13 * g23 - g12 * g33;
  const c13 = g12 * g23 - g13 * g22;
  const c22 = g11 * g33 - g13 * g13;
  const c23 = g12 * g13 - g11 * g23;
  const c33 = g11 * g22 - g12 * g12;
  const determinant = g11 * c11 + g12 * c12 + g13 * c13;
  if (!(determinant > 0)) {
    throw new Error('The unit cell has no volume');
  }
  const inverse = Float64Array.of(c11, c12, c13, c12, c22, c23, c13, c23, c33);
  for (let index = 0; index < 9; index++) {
    inverse[index] = (inverse[index] as number) / determinant;
  }
  return inverse;
}

function metricTerms(cell: UnitCell) {
  const { a, b, c } = cell;
  const toRadians = Math.PI / 180;
  return {
    g11: a * a,
    g12: a * b * Math.cos(cell.gamma * toRadians),
    g13: a * c * Math.cos(cell.beta * toRadians),
    g22: b * b,
    g23: b * c * Math.cos(cell.alpha * toRadians),
    g33: c * c,
  };
}
