import { SpectrumGenerator } from 'spectrum-generator';

interface Peak {
  x: number;
  y: number;
}

interface Spectrum {
  variables: {
    x: { data: number[] };
  };
  peaks: Peak[];
}

interface GeneratePatternOptions {
  /** Start of the pattern range. Defaults to minimum x value. */
  from?: number;
  /** End of the pattern range. Defaults to maximum x value. */
  to?: number;
  /** Number of points in the generated pattern. Defaults to 999. */
  nbPoints?: number;
}

/**
 * Generates a synthetic diffraction pattern from picked peaks.
 * @param spectrum - Spectrum with variables and picked peaks
 * @param options - Options for the pattern generation
 * @returns Object with x and y arrays
 */
export function generatePattern(
  spectrum: Spectrum,
  options: GeneratePatternOptions = {},
) {
  const {
    from = Math.min(...spectrum.variables.x.data),
    to = Math.max(...spectrum.variables.x.data),
    nbPoints = 999,
  } = options;
  const generator = new SpectrumGenerator({
    from,
    to,
    nbPoints,
  });
  generator.addPeaks(spectrum.peaks);
  return generator.getSpectrum();
}
