import { expect, test } from 'vitest';

import { kAlpha1Angstrom } from '../../constants/wavelengths.ts';
import { calculatePowderPattern } from '../calculatePowderPattern.ts';
import { powderPatternToXY } from '../powderPatternToXY.ts';

import { item, readFixture } from './fixtures.ts';

const halite = calculatePowderPattern(readFixture('halite'), {
  twoThetaRange: [20, 60],
});
const line111 = item(halite.peaks, 0);
const line200 = item(halite.peaks, 1);
const line220 = item(halite.peaks, 2);
const copperKa2 = kAlpha1Angstrom.CuKa2;

function valueAt(x: Float64Array, y: Float64Array, twoTheta: number): number {
  let best = 0;
  for (const [index, value] of x.entries()) {
    if (Math.abs(value - twoTheta) < Math.abs(item(x, best) - twoTheta)) {
      best = index;
    }
  }
  return item(y, best);
}

function area(x: Float64Array, y: Float64Array, center: number) {
  let sum = 0;
  for (const [index, value] of x.entries()) {
    if (Math.abs(value - center) <= 1) sum += item(y, index);
  }
  return sum;
}

function fullWidth(x: Float64Array, y: Float64Array, center: number) {
  const half = valueAt(x, y, center) / 2;
  let points = 0;
  for (const [index, value] of x.entries()) {
    if (Math.abs(value - center) < 1 && item(y, index) >= half) points++;
  }
  return points * (item(x, 1) - item(x, 0));
}

function caglioti(twoTheta: number) {
  const tangent = Math.tan((twoTheta * Math.PI) / 360);
  return Math.sqrt(0.2 * tangent * tangent - 0.01 * tangent + 0.001);
}

test('one point every 0.01° over the range, the strongest at 100', () => {
  const { x, y } = powderPatternToXY(halite);

  expect(x).toHaveLength(4001);
  expect(x[0]).toBe(20);
  expect(x.at(-1)).toBe(60);
  expect(Math.max(...y)).toBeCloseTo(100, 10);
  expect(line200.intensity).toBe(100);
  expect(valueAt(x, y, line200.twoTheta)).toBeGreaterThan(99);
});

test('each peak holds its integrated intensity', () => {
  const { x, y } = powderPatternToXY(halite, { fwhm: 0.05 });
  const ratio = area(x, y, line111.twoTheta) / area(x, y, line200.twoTheta);

  expect(ratio).toBeCloseTo(line111.intensity / line200.intensity, 2);
});

test('Kα2 repeats every peak at half the intensity', () => {
  const { x, y } = powderPatternToXY(halite, {
    fwhm: 0.02,
    nbPoints: 40001,
    alpha2: { wavelength: copperKa2 },
  });
  const alpha2 = (360 / Math.PI) * Math.asin(copperKa2 / (2 * line200.d));

  expect(alpha2 - line200.twoTheta).toBeCloseTo(0.0812, 4);
  expect(valueAt(x, y, line200.twoTheta)).toBeCloseTo(100, 0);
  expect(valueAt(x, y, alpha2)).toBeGreaterThan(48);
  expect(valueAt(x, y, alpha2)).toBeLessThan(53);
});

test('Caglioti widths grow with the angle', () => {
  const { x, y } = powderPatternToXY(halite, {
    caglioti: { u: 0.2, v: -0.01, w: 0.001 },
    lorentzianFraction: 0,
  });
  const narrow = fullWidth(x, y, line111.twoTheta);
  const broad = fullWidth(x, y, line220.twoTheta);

  expect(narrow).toBeCloseTo(caglioti(line111.twoTheta), 1);
  expect(broad).toBeCloseTo(caglioti(line220.twoTheta), 1);
  expect(broad).toBeGreaterThan(narrow + 0.05);
});
