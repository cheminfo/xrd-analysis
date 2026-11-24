import { WAASMAIER_KIRFEL } from './waasmaierKirfel.ts';

/**
 * The X-ray form factor of a neutral atom, Waasmaier & Kirfel's fit.
 * @param element - A chemical symbol, as {@link scatteringElement} reads it.
 * @param sinThetaOverLambda - sin θ / λ, in Å⁻¹.
 * @returns f0, in electrons.
 */
export function xrayScatteringFactor(
  element: string,
  sinThetaOverLambda: number,
): number {
  return formFactor(
    coefficientsOf(scatteringElement(element)),
    sinThetaOverLambda * sinThetaOverLambda,
  );
}

/**
 * The element whose form factor a site's type symbol takes: `O2-` is O, `CL1`
 * is Cl, deuterium and tritium are H.
 * @param symbol - The symbol as a CIF gives it.
 * @returns A key of the coefficient table.
 */
export function scatteringElement(symbol: string): string {
  const letters = /^[A-Za-z]{1,2}/.exec(symbol.trim())?.[0] ?? '';
  const pair =
    (letters[0] ?? '').toUpperCase() + (letters[1] ?? '').toLowerCase();
  const candidates = [pair, pair.slice(0, 1)];
  for (const candidate of candidates) {
    if (candidate === 'D' || candidate === 'T') return 'H';
    if (candidate in WAASMAIER_KIRFEL) return candidate;
  }
  throw new Error(`No X-ray form factor for the element "${symbol}"`);
}

/**
 * The coefficients a1…a5, b1…b5, c of an element of the table.
 * @param element - A key of the table, see {@link scatteringElement}.
 * @returns Eleven numbers.
 */
export function coefficientsOf(element: string): readonly number[] {
  const coefficients = WAASMAIER_KIRFEL[element];
  if (!coefficients) {
    throw new Error(`No X-ray form factor for the element "${element}"`);
  }
  return coefficients;
}

/**
 * Evaluate a sum of Gaussians plus a constant, the form every tabulated X-ray
 * form factor takes: `n` amplitudes, then `n` widths, then the constant.
 * @param coefficients - a1…an, b1…bn, c.
 * @param s2 - (sin θ / λ)², in Å⁻².
 * @returns f0, in electrons.
 */
export function formFactor(coefficients: readonly number[], s2: number) {
  const terms = (coefficients.length - 1) / 2;
  let value = coefficients.at(-1) as number;
  for (let index = 0; index < terms; index++) {
    value +=
      (coefficients[index] as number) *
      Math.exp(-(coefficients[index + terms] as number) * s2);
  }
  return value;
}
