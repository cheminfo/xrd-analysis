import { getLamba, toRadians } from './utils.ts';

interface ScherrerPeak {
  x: number;
  y: number;
  width: number;
  crystalliteSize?: number;
}

interface ScherrerSpectrum {
  peaks: ScherrerPeak[];
  meta: { anode: string; [key: string]: unknown };
}

/**
 * Calculate the crystallite size according to the Scherrer equation.
 * Please check the strong assumptions (e.g., grains smaller than 0.1 to 0.2 um)
 * for this analysis (https://en.wikipedia.org/wiki/Scherrer_equation).
 * The Scherrer equation only provides a lower bound, there also might be instrument broadening
 * (http://prism.mit.edu/XRAY/oldsite/CrystalSizeAnalysis.pdf)
 * @param k - Shape factor. Typical value is about 0.9 but varies with crystallite shape.
 * @param lambda - X-ray wavelength (output will be of the same unit)
 * @param beta - FWHM line broadening in degrees
 * @param theta - Bragg angle in degrees (theta, not 2theta)
 * @returns Mean size of the ordered (crystalline) domains in the unit of lambda
 */
export function scherrer(
  k: number,
  lambda: number,
  beta: number,
  theta: number,
): number {
  return (k * lambda) / (toRadians(beta) * Math.cos(toRadians(theta)));
}

/**
 * Computes the broadening according to the Scherrer equation for every reflex
 * in the diffractogram. Uses the anode metal deposited in the metadata to
 * get the wavelength and the peaks previously picked.
 * @param spectrum - Spectrum with anode metal as metadata and picked peaks with FWHM, all in 2theta units
 * @param k - Shape factor. Defaults to 0.94.
 * @returns Peaks with crystalliteSize attribute
 */
export function scherrerForSpectrum(
  spectrum: ScherrerSpectrum,
  k = 0.94,
): ScherrerPeak[] {
  const newPeaks = spectrum.peaks;
  if (!('peaks' in spectrum)) {
    throw new Error('There must be peaks to calculate the scherrer broadening');
  }

  if (!('anode' in spectrum.meta)) {
    throw new Error(
      'The anode metal must be available in the metadata of the spectrum',
    );
  }

  const lambda = getLamba(spectrum.meta.anode);

  for (const peak of newPeaks) {
    peak.crystalliteSize = scherrer(k, lambda, peak.width, peak.x / 2) / 100;
  }

  return newPeaks;
}
