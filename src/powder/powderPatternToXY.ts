import { getShape1D } from 'ml-peak-shape-generator';
import { xNormed } from 'ml-spectra-processing';
import { SpectrumGenerator } from 'spectrum-generator';

import type { PowderPattern } from './types.ts';

/**
 * Options of {@link powderPatternToXY}.
 */
export interface PowderProfileOptions {
  /**
   * First 2θ, in degrees.
   * @default pattern.twoThetaRange[0]
   */
  from?: number;
  /**
   * Last 2θ, in degrees.
   * @default pattern.twoThetaRange[1]
   */
  to?: number;
  /**
   * Number of points.
   * @default one every 0.01°
   */
  nbPoints?: number;
  /**
   * Full width at half maximum of every peak, in degrees.
   * @default 0.1
   */
  fwhm?: number;
  /**
   * Widths growing with the angle instead, as an instrument gives them:
   * FWHM² = U tan²θ + V tanθ + W, in degrees².
   * @default undefined
   */
  caglioti?: { u: number; v: number; w: number };
  /**
   * η, the Lorentzian fraction of the pseudo-Voigt peaks.
   * @default 0.5
   */
  lorentzianFraction?: number;
  /**
   * A second line every peak repeats, the Kα2 of a tube, at the same spacing
   * with this wavelength and a fraction of the intensity.
   * @default undefined
   */
  alpha2?: {
    /**
     * In Å, e.g. `kAlpha1Angstrom.CuKa2`.
     */
    wavelength: number;
    /**
     * Its intensity relative to the first line.
     * @default 0.5
     */
    ratio?: number;
  };
}

/**
 * Each peak is drawn over ±10 FWHM, which keeps a large pattern quick.
 */
const PEAK_EXTENT = 20;

/**
 * Draw a calculated powder pattern as a profile, one pseudo-Voigt per peak
 * holding the peak's integrated intensity.
 * @param pattern - The peaks, from `calculatePowderPattern`.
 * @param options - Range, resolution and peak shape.
 * @returns x in degrees 2θ, y with its maximum at 100.
 */
export function powderPatternToXY(
  pattern: PowderPattern,
  options: PowderProfileOptions = {},
): { x: Float64Array; y: Float64Array } {
  const {
    from = pattern.twoThetaRange[0],
    to = pattern.twoThetaRange[1],
    fwhm = 0.1,
    caglioti,
    lorentzianFraction = 0.5,
    alpha2,
  } = options;
  const nbPoints = options.nbPoints ?? Math.round((to - from) / 0.01) + 1;
  const mu = 1 - lorentzianFraction;
  const widthAt = (twoTheta: number) => {
    if (!caglioti) return fwhm;
    const tangent = Math.tan((twoTheta * Math.PI) / 360);
    return Math.sqrt(
      Math.max(
        caglioti.u * tangent * tangent + caglioti.v * tangent + caglioti.w,
        1e-8,
      ),
    );
  };
  const generator = new SpectrumGenerator({ from, to, nbPoints });
  const lines: Array<[wavelength: number, weight: number]> = [
    [pattern.wavelength, 1],
  ];
  if (alpha2) lines.push([alpha2.wavelength, alpha2.ratio ?? 0.5]);
  for (const [wavelength, weight] of lines) {
    for (const peak of pattern.peaks) {
      const sinTheta = wavelength / (2 * peak.d);
      if (sinTheta > 1) continue;
      const twoTheta = (360 * Math.asin(sinTheta)) / Math.PI;
      const width = widthAt(twoTheta);
      if (
        twoTheta < from - PEAK_EXTENT * width ||
        twoTheta > to + PEAK_EXTENT * width
      ) {
        continue;
      }
      const area = getShape1D({ kind: 'pseudoVoigt', fwhm: width, mu }).getArea(
        1,
      );
      generator.addPeak(
        { x: twoTheta, y: (weight * peak.intensity) / area, width },
        { shape: { kind: 'pseudoVoigt', mu }, factor: PEAK_EXTENT },
      );
    }
  }
  const { x, y } = generator.getSpectrum({ copy: false });
  return { x, y: xNormed(y, { algorithm: 'max', value: 100 }) };
}
