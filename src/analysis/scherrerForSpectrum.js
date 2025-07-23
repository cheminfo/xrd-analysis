import { getLamba, toRadians } from './utils.js';
/**
 * Calculate the crystallite size according to the Scherrer equation.
 * Please check the strong assumptions (e.g., grains smaller than 0.1 to 0.2 μm)
 * for this analysis (https://en.wikipedia.org/wiki/Scherrer_equation).
 * The Scherrer equation only provides a lower bound, there also might be instrument broadening
 * (http://prism.mit.edu/XRAY/oldsite/CrystalSizeAnalysis.pdf)
 * @export
 * @param {number} k  - shape factor. The shape factor has a typical value of about 0.9, but varies with the actual shape of the crystallite. For a discussion see J. Appl. Cryst. 11 (1978) p102-113
 * @param {number} lambda - X-ray wavelength (output will be of the same unit)
 * @param {number} beta - FWHM line broadening in degree
 * @param {number} theta  - Bragg angle in degree, i.e. theta and not 2 theta
 * @returns mean size of the ordered (crystalline) domains in the unit of lambda
 */
export function scherrer(k, lambda, beta, theta) {
  return (k * lambda) / (toRadians(beta) * Math.cos(toRadians(theta)));
}

/**
 * Computes the broadening accoding to the Scherrer equation for every reflex
 * in the diffractogram. Uses the anode metal deposited in the metadata to
 * get the wavelength and the peaks previosuly picked
 * @export
 * @param {*} spectrum -with anode metal as metadata and picked peaks with FWHM, all in 2 theta units
 * @param {number} k - shape factor
 * @returns {Array<object>} peaks with crystalliteSize attribute
 */
export function scherrerForSpectrum(spectrum, k = 0.94) {
  let newPeaks = spectrum.peaks;
  if (!('peaks' in spectrum)) {
    throw new Error('There must be peaks to calculate the scherrer broadening');
  }

  if (!('anode' in spectrum.meta)) {
    throw new Error(
      'The anode metal must be available in the metadata of the spectrum',
    );
  }

  const lambda = getLamba(spectrum.meta.anode);

  for (let peak of newPeaks) {
    peak.crystalliteSize = scherrer(k, lambda, peak.width, peak.x / 2) / 100;
  }

  return newPeaks;
}
