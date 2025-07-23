import { test, expect } from 'vitest';

import { calculateInterplanarSpacing, calculateReflexes } from '../convert.js';

test('interplanar spacing', () => {
  let result = calculateInterplanarSpacing([5, 5]);
  expect(result).toHaveLength(2);
  expect(result[0]).toBeCloseTo(8.845315015351806, 2);
  expect(result[1]).toBeCloseTo(8.845315015351806, 2);
});

test('reflexes', () => {
  let result = calculateReflexes([8.845315015351806, 1.54184]);
  expect(result).toHaveLength(2);
  expect(result[0]).toBeCloseTo(5, 2);
  expect(result[1]).toBeCloseTo(30, 2);
});
