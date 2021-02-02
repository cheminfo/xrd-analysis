import { calculateInterplanarSpacing } from '../convert.js';

test('interplanar spacing', () => {
  let result = calculateInterplanarSpacing([5]);
  expect(result).toHaveLength(1);
  expect(result[0]).toBeCloseTo(8.845315015351806, 2);
});
