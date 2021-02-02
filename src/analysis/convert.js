import { toRadians, getLamba } from './utils';

/**
 * d = Order of Reflection (n) × Wavelength (λ) / 2 × Sinθ
 *
 */

/**
 * Calculates the interplanar spacing d according to Bragg's equation
 *
 * @export
 * @param {Array<number>} thetas. Note that this is *not* 2θ but θ.
 * @param {Object} options.
 * @param {Number} options.orderOfReflection. Order of relection n. Defaults to 1.
 * @param {String} options.anode. Anode type. Defaults to "CuKa" Available options in constants.wavelengths.kAlpha1Angstrom
 * @returns {Array<number>} Interplanar spacings in Angstrom.
 */
export function calculateInterplanarSpacing(thetas, options = {}) {
  let { orderOfReflection = 1, anode = 'CuKa' } = options;
  const wavelength = getLamba(anode);
  return thetas.map((theta) => {
    return (orderOfReflection * wavelength) / (2 * Math.sin(toRadians(theta)));
  });
}
