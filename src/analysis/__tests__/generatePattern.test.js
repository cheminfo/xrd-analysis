import { generatePattern } from '../generatePattern.js';

import { dummyAnalysis } from './utils.js';

test('generate pattern', () => {
  let analysis = dummyAnalysis();
  let spectrum = analysis.getXYSpectrum();
  spectrum.peaks = [
    { x: 1, y: 100 },
    { x: 10, y: 10 },
  ];

  const pattern = generatePattern(spectrum);
  expect(pattern).toHaveProperty('x');
  expect(pattern.x).toHaveLength(999);
  expect(Math.min(...pattern.x)).toStrictEqual(10);
  expect(pattern.y).toHaveLength(999);
});
