import { expect, test } from 'vitest';

import {
  scatteringElement,
  xrayScatteringFactor,
} from '../scatteringFactor.ts';

import { readJson } from './fixtures.ts';

const xraydb = readJson('f0') as Record<string, { s: number[]; f0: number[] }>;

test.each(Object.entries(xraydb))(
  '%s: f0 as xraydb computes it',
  (element, { s, f0 }) => {
    for (const [index, value] of s.entries()) {
      expect(xrayScatteringFactor(element, value)).toBeCloseTo(
        f0[index] ?? NaN,
        5,
      );
    }
  },
);

test('f0 at s = 0 is about the number of electrons', () => {
  expect(xrayScatteringFactor('H', 0)).toBeCloseTo(1, 2);
  expect(xrayScatteringFactor('Cl', 0)).toBeCloseTo(17, 2);
  expect(xrayScatteringFactor('U', 0)).toBeCloseTo(92, 1);
});

test('a type symbol is read as its element', () => {
  expect(scatteringElement('Na')).toBe('Na');
  expect(scatteringElement('O2-')).toBe('O');
  expect(scatteringElement('Fe3+')).toBe('Fe');
  expect(scatteringElement('CL')).toBe('Cl');
  expect(scatteringElement('Cl1')).toBe('Cl');
  expect(scatteringElement('C12')).toBe('C');
  expect(scatteringElement('Hg')).toBe('Hg');
  expect(scatteringElement('Dy')).toBe('Dy');
  expect(scatteringElement('D')).toBe('H');
  expect(scatteringElement('D2')).toBe('H');
  expect(scatteringElement(' Si ')).toBe('Si');
});

test('an unknown element throws', () => {
  expect(() => scatteringElement('Xx')).toThrow(
    'No X-ray form factor for the element "Xx"',
  );
  expect(() => scatteringElement('12')).toThrow(
    'No X-ray form factor for the element "12"',
  );
});
