import { SpectrumGenerator } from 'spectrum-generator';

export function generatePattern(spectrum, options = {}) {
  let {
    from = Math.min(...spectrum.variables.x.data),
    to = Math.max(...spectrum.variables.x.data),
    nbPoints = 999,
  } = options;
  const generator = new SpectrumGenerator({
    from: from,
    to: to,
    nbPoints: nbPoints,
  });
  generator.addPeaks(spectrum.peaks);
  return generator.getSpectrum();
}
