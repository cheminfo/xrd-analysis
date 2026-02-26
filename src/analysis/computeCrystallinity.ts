import type { Shape1D } from 'ml-peak-shape-generator';
import { getShape1D } from 'ml-peak-shape-generator';
import { xyIntegration } from 'ml-spectra-processing';

interface XRDPeak {
  x: number;
  y: number;
  width: number;
}

interface XRDSpectrum {
  variables: {
    x: { data: number[] };
    y: { data: number[] };
  };
  peaks: XRDPeak[];
}

interface CrystallinityOptions {
  /** Peak shape kind. Defaults to gaussian. */
  shape?: { kind: Shape1D['kind'] };
}

/**
 * Computes the crystallinity as the ratio of peak area to total area.
 * @param spectrum - Spectrum with variables and picked peaks
 * @param options - Options for the crystallinity computation
 * @returns Crystallinity ratio
 */
export function computeCrystallinity(
  spectrum: XRDSpectrum,
  options: CrystallinityOptions = {},
): number {
  const { shape = { kind: 'gaussian' } } = options;
  const totalArea = xyIntegration({
    x: spectrum.variables.x.data,
    y: spectrum.variables.y.data,
  });
  let peakArea = 0;

  for (const peak of spectrum.peaks) {
    const shapeInstance = getShape1D({
      kind: shape.kind,
      fwhm: peak.width,
    } as Shape1D);
    peakArea += shapeInstance.getArea(peak.y);
  }

  return peakArea / totalArea;
}
