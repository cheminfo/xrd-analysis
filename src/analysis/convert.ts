import { getLamba, toDegrees, toRadians } from './utils.ts';

/**
 * d = Order of Reflection (n) x Wavelength (lambda) / 2 x Sin(theta)
 */

export interface SpacingOptions {
  /** Order of reflection n. Defaults to 1. */
  orderOfReflection?: number;
  /** Anode type. Defaults to "CuKa". */
  anode?: string;
}

/**
 * Calculates the interplanar spacing d according to Bragg's equation.
 * @param twoThetas - Array of 2theta angles in degrees. Note that this is 2theta, not theta.
 * @param options - Calculation options
 * @returns Interplanar spacings in Angstrom
 */
export function calculateInterplanarSpacing(
  twoThetas: number[],
  options: SpacingOptions = {},
): number[] {
  const { orderOfReflection = 1, anode = 'CuKa' } = options;
  const wavelength = getLamba(anode);
  return twoThetas.map((theta) => {
    return (orderOfReflection * wavelength) / (2 * Math.sin(toRadians(theta)));
  });
}

/**
 * Calculates the reflex angles based on the interplanar spacings.
 * @param ds - Interplanar spacings in Angstrom
 * @param options - Calculation options
 * @returns Array of 2theta angles in degrees
 */
export function calculateReflexes(
  ds: number[],
  options: SpacingOptions = {},
): number[] {
  const { orderOfReflection = 1, anode = 'CuKa' } = options;
  const wavelength = getLamba(anode);
  return ds.map((d) => {
    return toDegrees(Math.asin((orderOfReflection * wavelength) / (2 * d)));
  });
}
