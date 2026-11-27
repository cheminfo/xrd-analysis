import { expect, expectTypeOf, test } from 'vitest';

import { isXrayLine, kAlpha1Angstrom } from '../wavelengths.ts';

test('a line is read by its name, as a number', () => {
  expect(kAlpha1Angstrom.CuKa1).toBe(1.54056);
  expect(kAlpha1Angstrom.MoKa1).toBe(0.7093);

  expectTypeOf(kAlpha1Angstrom.CoKa1).toEqualTypeOf<number>();
});

test('a name read from a file is checked against the table', () => {
  expect(isXrayLine('CuKa')).toBe(true);
  expect(isXrayLine('AgKb1')).toBe(true);
  expect(isXrayLine('XxKa')).toBe(false);
  expect(isXrayLine('toString')).toBe(false);
});
