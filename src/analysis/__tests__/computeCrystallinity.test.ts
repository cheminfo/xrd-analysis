import { expect, test } from 'vitest';

import { computeCrystallinity } from '../computeCrystallinity.ts';

import { dummyAnalysis } from './utils.ts';

test('crystallinity computation', () => {
  const analysis = dummyAnalysis();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const spectrum: any = analysis.getXYSpectrum();
  spectrum.peaks = [{ x: 23.3, y: 10, width: 0.3 }];
  const crystallinity = computeCrystallinity(spectrum);

  expect(crystallinity).toBeGreaterThan(0);

  const analysis2 = dummyAnalysis(0.1, 1);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const spectrum2: any = analysis2.getXYSpectrum();
  spectrum2.peaks = [{ x: 23.3, y: 10, width: 0.3 }];
  const crystallinity2 = computeCrystallinity(spectrum2);

  expect(crystallinity2).toBeLessThan(crystallinity);
});
