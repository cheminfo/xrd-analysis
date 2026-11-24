import { expect, test } from 'vitest';

import { reciprocalMetric } from '../metric.ts';
import type { UniqueReflections } from '../reflections.ts';
import { laueGroup, uniqueReflections } from '../reflections.ts';
import { parseSymmetryOperation } from '../symmetryOperation.ts';

import type { Fixture } from './fixtures.ts';
import { STRUCTURES, item, readFixture } from './fixtures.ts';

const LAUE_ORDER: Record<(typeof STRUCTURES)[number], number> = {
  halite: 48,
  quartz: 12,
  calcite: 12,
  wurtzite: 24,
  perovskite: 8,
  gypsum: 4,
  chalcanthite: 2,
  aspirin: 4,
  naphthalene: 4,
};

function operationsOf(fixture: Fixture) {
  return fixture.operations.map((operation) =>
    parseSymmetryOperation(operation),
  );
}

function byIndices({ hkl, multiplicity }: UniqueReflections) {
  const indexed: Record<string, number> = {};
  for (const [index, count] of multiplicity.entries()) {
    indexed[Array.from(hkl.subarray(index * 3, index * 3 + 3)).join(' ')] =
      count;
  }
  return indexed;
}

test.each(STRUCTURES)('%s: the Laue group has its order', (name) => {
  const fixture = readFixture(name);

  expect(laueGroup(operationsOf(fixture))).toHaveLength(LAUE_ORDER[name]);
});

test('P1 gives the Laue group -1', () => {
  expect(laueGroup([parseSymmetryOperation('x,y,z')])).toHaveLength(2);
});

test.each(STRUCTURES)(
  '%s: the multiplicities add up to every reflection in the sphere',
  (name) => {
    const fixture = readFixture(name);
    const dMin = 1.2;
    const { hkl, multiplicity } = uniqueReflections(
      fixture.cell,
      operationsOf(fixture),
      dMin,
      Infinity,
    );
    const metric = reciprocalMetric(fixture.cell);
    const g = (index: number) => item(metric, index);
    let inSphere = 0;
    for (let h = -20; h <= 20; h++) {
      for (let k = -20; k <= 20; k++) {
        for (let l = -20; l <= 20; l++) {
          if (h === 0 && k === 0 && l === 0) continue;
          const value =
            g(0) * h * h +
            g(4) * k * k +
            g(8) * l * l +
            2 * (g(1) * h * k + g(2) * h * l + g(5) * k * l);
          if (value <= 1 / (dMin * dMin)) inSphere++;
        }
      }
    }
    let total = 0;
    for (const count of multiplicity) total += count;

    expect(total).toBe(inSphere);
    expect(hkl).toHaveLength(3 * multiplicity.length);
  },
);

test('cubic multiplicities of m-3m', () => {
  const halite = readFixture('halite');
  const indexed = byIndices(
    uniqueReflections(halite.cell, operationsOf(halite), 1.08, Infinity),
  );

  expect(indexed).toMatchObject({
    '1 0 0': 6,
    '1 1 0': 12,
    '1 1 1': 8,
    '2 1 0': 24,
    '2 1 1': 24,
    '3 2 1': 48,
    '5 1 1': 24,
    '3 3 3': 8,
  });
  expect(Object.keys(indexed)).toHaveLength(30);
});

test('monoclinic multiplicities of 2/m, b unique', () => {
  const aspirin = readFixture('aspirin');
  const reflections = uniqueReflections(
    aspirin.cell,
    operationsOf(aspirin),
    5,
    Infinity,
  );

  expect(byIndices(reflections)).toStrictEqual({
    '0 0 1': 2,
    '0 0 2': 2,
    '0 1 0': 2,
    '0 1 1': 4,
    '1 0 -2': 2,
    '1 0 -1': 2,
    '1 0 0': 2,
    '1 0 1': 2,
    '1 1 -1': 4,
    '1 1 0': 4,
    '1 1 1': 4,
    '2 0 -1': 2,
    '2 0 0': 2,
  });
});

test('dMax leaves out the low-angle reflections', () => {
  const halite = readFixture('halite');
  const { hkl } = uniqueReflections(halite.cell, operationsOf(halite), 2, 3);

  expect(Array.from(hkl)).toStrictEqual([2, 0, 0, 2, 1, 0, 2, 1, 1]);
});
