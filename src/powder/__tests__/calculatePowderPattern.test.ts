import { expect, test } from 'vitest';

import { calculatePowderPattern } from '../calculatePowderPattern.ts';
import { cellAtoms } from '../cellAtoms.ts';
import { parseSymmetryOperation } from '../symmetryOperation.ts';
import type { CrystalStructure, PowderPeak } from '../types.ts';

import type { Fixture } from './fixtures.ts';
import { STRUCTURES, item, readFixture } from './fixtures.ts';

function withUiso(fixture: Fixture, uiso: number | null): CrystalStructure {
  return {
    ...fixture,
    sites: fixture.sites.map((site) => ({ ...site, uiso })),
  };
}

function nearest<T extends { twoTheta: number }>(peaks: T[], twoTheta: number) {
  let best = item(peaks, 0);
  for (const peak of peaks) {
    if (
      Math.abs(peak.twoTheta - twoTheta) < Math.abs(best.twoTheta - twoTheta)
    ) {
      best = peak;
    }
  }
  return best;
}

function squaredSinThetaOverLambda(peak: PowderPeak) {
  return 1 / (4 * peak.d * peak.d);
}

function braggAngle(wavelength: number, d: number) {
  return (360 / Math.PI) * Math.asin(wavelength / (2 * d));
}

test.each(STRUCTURES)('%s: the pattern pymatgen calculates', (name) => {
  const fixture = readFixture(name);
  const { peaks } = calculatePowderPattern(withUiso(fixture, 0), {
    twoThetaRange: [5, 90],
  });
  const reference = fixture.pymatgen;

  for (const expected of reference) {
    if (expected.intensity < 0.05) continue;
    const peak = nearest(peaks, expected.twoTheta);

    expect(peak.twoTheta).toBeCloseTo(expected.twoTheta, 9);
    expect(peak.d).toBeCloseTo(expected.d, 9);
    // pymatgen draws its form factors from electron scattering factors
    // (Mott–Bethe); the Waasmaier–Kirfel fit differs by up to 2 % per peak.
    expect(Math.abs(peak.intensity - expected.intensity)).toBeLessThan(0.5);
  }
  for (const peak of peaks) {
    if (peak.intensity < 0.05) continue;

    expect(nearest(reference, peak.twoTheta).twoTheta).toBeCloseTo(
      peak.twoTheta,
      9,
    );
  }
});

test.each(STRUCTURES)(
  '%s: the same pattern from the whole cell in P1',
  (name) => {
    const fixture = readFixture(name);
    const operations = fixture.operations.map((operation) =>
      parseSymmetryOperation(operation),
    );
    const atoms = cellAtoms(fixture.cell, operations, fixture.sites);
    const sites = Array.from(atoms.sites.entries(), ([atom, siteIndex]) => ({
      ...item(fixture.sites, siteIndex),
      x: item(atoms.positions, atom * 3),
      y: item(atoms.positions, atom * 3 + 1),
      z: item(atoms.positions, atom * 3 + 2),
    }));
    const options = { twoThetaRange: [5, 70] as [number, number] };
    const symmetric = calculatePowderPattern(fixture, options).peaks;
    const p1 = calculatePowderPattern(
      { cell: fixture.cell, sites },
      options,
    ).peaks;

    expect(p1).toHaveLength(symmetric.length);

    for (const [index, peak] of symmetric.entries()) {
      expect(item(p1, index).twoTheta).toBeCloseTo(peak.twoTheta, 9);
      expect(item(p1, index).intensity).toBeCloseTo(peak.intensity, 9);
    }
  },
);

test('halite: the lines, their indices and multiplicities', () => {
  const halite = readFixture('halite');
  const { wavelength, twoThetaRange, peaks } = calculatePowderPattern(halite, {
    twoThetaRange: [5, 100],
  });
  const line200 = item(peaks, 1);

  expect(wavelength).toBe(1.54056);
  expect(twoThetaRange).toStrictEqual([5, 100]);
  expect(
    peaks.map((peak) =>
      peak.reflections.map(({ hkl, multiplicity }) => [
        hkl.join(''),
        multiplicity,
      ]),
    ),
  ).toStrictEqual([
    [['111', 8]],
    [['200', 6]],
    [['220', 12]],
    [['311', 24]],
    [['222', 8]],
    [['400', 6]],
    [['331', 24]],
    [['420', 24]],
    [['422', 24]],
    [
      ['333', 8],
      ['511', 24],
    ],
  ]);
  expect(line200.intensity).toBe(100);
  expect(line200.d).toBeCloseTo(2.81, 12);
  expect(line200.twoTheta).toBeCloseTo(braggAngle(1.54056, 2.81), 12);
});

test('the Debye–Waller factor damps high angles', () => {
  const halite = readFixture('halite');
  const still = calculatePowderPattern(withUiso(halite, 0)).peaks;
  const warm = calculatePowderPattern(withUiso(halite, 0.02)).peaks;
  const line200 = item(still, 1);
  const line220 = item(still, 2);
  const damping = Math.exp(
    -16 *
      Math.PI *
      Math.PI *
      0.02 *
      (squaredSinThetaOverLambda(line220) - squaredSinThetaOverLambda(line200)),
  );

  expect(item(warm, 1).intensity).toBe(100);
  expect(item(warm, 2).intensity).toBeCloseTo(line220.intensity * damping, 10);
});

test('a site without U takes defaultUiso', () => {
  const quartz = readFixture('quartz');
  const given = calculatePowderPattern(withUiso(quartz, 0.03)).peaks;
  const missing = calculatePowderPattern(withUiso(quartz, null), {
    defaultUiso: 0.03,
  }).peaks;

  expect(missing).toStrictEqual(given);
});

test('|F|² does not depend on the wavelength', () => {
  const calcite = readFixture('calcite');
  const copper = calculatePowderPattern(calcite).peaks;
  const molybdenum = calculatePowderPattern(calcite, {
    wavelength: 0.7093,
    twoThetaRange: [0, 40],
  }).peaks;
  const strongest = nearest(
    copper.filter((peak) => peak.intensity === 100),
    0,
  );
  const same = nearest(molybdenum, braggAngle(0.7093, strongest.d));

  expect(same.d).toBeCloseTo(strongest.d, 12);
  expect(same.reflections).toStrictEqual(strongest.reflections);
});

test('range and threshold', () => {
  const aspirin = readFixture('aspirin');
  const { peaks } = calculatePowderPattern(aspirin, {
    twoThetaRange: [20, 30],
    minIntensity: 10,
  });
  const intensities = peaks.map((peak) => peak.intensity);
  const angles = peaks.map((peak) => peak.twoTheta);

  expect(peaks).toHaveLength(11);
  expect(Math.min(...intensities)).toBeGreaterThanOrEqual(10);
  expect(Math.max(...intensities)).toBe(100);
  expect(Math.min(...angles)).toBeGreaterThanOrEqual(20);
  expect(Math.max(...angles)).toBeLessThanOrEqual(30);
});

test('an unknown element throws', () => {
  expect(() =>
    calculatePowderPattern({
      cell: { a: 4, b: 4, c: 4, alpha: 90, beta: 90, gamma: 90 },
      sites: [{ element: 'Q', x: 0, y: 0, z: 0 }],
    }),
  ).toThrow('No X-ray form factor for the element "Q"');
});
