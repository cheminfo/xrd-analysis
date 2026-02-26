import { expect, test } from 'vitest';

import { generatePattern } from '../generatePattern.ts';

import { dummyAnalysis } from './utils.ts';

test('generate pattern', () => {
  const analysis = dummyAnalysis();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const spectrum: any = analysis.getXYSpectrum();
  spectrum.peaks = [
    { x: 1, y: 100 },
    { x: 10, y: 10 },
  ];

  const pattern = generatePattern(spectrum);

  expect(pattern).toHaveProperty('x');
  expect(pattern.x).toHaveLength(999);
  expect(Math.min(...pattern.x)).toBe(10);
  expect(pattern.y).toHaveLength(999);
});
