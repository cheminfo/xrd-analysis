import { computeCrystallinity } from '../computeCrystallinity';

import { dummyAnalysis } from './utils.js';

test('crystallinity computation', () => {
  let analysis = dummyAnalysis();
  let spectrum = analysis.getXYSpectrum();
  spectrum.peaks = [{ x: 23.3, y: 10, width: 0.3 }];
  let crystallinity = computeCrystallinity(spectrum);
  expect(crystallinity).toBeGreaterThan(0);

  let analysis2 = dummyAnalysis(0.1, 1);
  let spectrum2 = analysis2.getXYSpectrum();
  spectrum2.peaks = [{ x: 23.3, y: 10, width: 0.3 }];
  let crystallinity2 = computeCrystallinity(spectrum2);
  expect(crystallinity2).toBeLessThan(crystallinity);
});
