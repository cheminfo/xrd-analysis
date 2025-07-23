import { getShape1D } from 'ml-peak-shape-generator';
import { xyIntegration } from 'ml-spectra-processing';

export function computeCrystallinity(spectrum, options = {}) {
  let { shape = { kind: 'gaussian' } } = options;
  const totalArea = xyIntegration({
    x: spectrum.variables.x.data,
    y: spectrum.variables.y.data,
  });
  let peakArea = 0;

  for (const peak of spectrum.peaks) {
    peakArea += getShape1D({
      kind: shape.kind,
      fwhm: peak.width,
      height: peak.y,
    }).getArea();
  }

  return peakArea / totalArea;
}
