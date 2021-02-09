import { toRadians, getLamba, toDegrees } from './utils';

/**
 * d = Order of Reflection (n) × Wavelength (λ) / 2 × Sinθ
 *
 */

/**
 * Calculates the interplanar spacing d according to Bragg's equation
 *
 * @export
 * @param {Array<number>} twoThetas. Note that this is 2θ *not* θ.
 * @param {Object} options.
 * @param {Number} options.orderOfReflection. Order of relection n. Defaults to 1.
 * @param {String} options.anode. Anode type. Defaults to "CuKa" Available options in constants.wavelengths.kAlpha1Angstrom
 * @returns {Array<number>} Interplanar spacings in Angstrom.
 */
export function calculateInterplanarSpacing(twoThetas, options = {}) {
  let { orderOfReflection = 1, anode = 'CuKa' } = options;
  const wavelength = getLamba(anode);
  return twoThetas.map((theta) => {
    return (orderOfReflection * wavelength) / (2 * Math.sin(toRadians(theta)));
  });
}

/**
 * Calculates the reflex angles based on the interplanar spacings.
 *
 * @export
 * @param {Array<number>} ds spacings. In Angstrom.
 * @param {Object} options.
 * @param {Number} options.orderOfReflection. Order of relection n. Defaults to 1.
 * @param {String} options.anode. Anode type. Defaults to "CuKa" Available options in constants.wavelengths.kAlpha1Angstrom
 * @returns {Array<number>} twoThetas.
 */
export function calculateReflexes(ds, options = {}) {
  let { orderOfReflection = 1, anode = 'CuKa' } = options;
  const wavelength = getLamba(anode);
  return ds.map((d) => {
    return toDegrees(Math.asin((orderOfReflection * wavelength) / (2 * d)));
  });
}
