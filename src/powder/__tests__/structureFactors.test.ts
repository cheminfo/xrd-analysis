import { expect, test } from 'vitest';

import { cellAtoms } from '../cellAtoms.ts';
import { reciprocalMetric } from '../metric.ts';
import { structureFactorsSquared } from '../structureFactors.ts';
import { parseSymmetryOperation } from '../symmetryOperation.ts';

import { STRUCTURES, item, readFixture, readJson } from './fixtures.ts';

const it92 = readJson('it92') as Record<string, number[]>;

function operationsOf(operations: string[]) {
  return operations.map((operation) => parseSymmetryOperation(operation));
}

test.each(STRUCTURES)('%s: the cell holds the atoms gemmi finds', (name) => {
  const fixture = readFixture(name);
  const atoms = cellAtoms(
    fixture.cell,
    operationsOf(fixture.operations),
    fixture.sites,
  );

  expect(atoms.sites).toHaveLength(fixture.cellAtoms);
  expect(atoms.positions).toHaveLength(3 * fixture.cellAtoms);
});

test.each(STRUCTURES)('%s: 1/d² matches gemmi', (name) => {
  const fixture = readFixture(name);
  const metric = reciprocalMetric(fixture.cell);
  const g = (index: number) => item(metric, index);

  for (const [h, k, l, d] of fixture.structureFactors) {
    const value =
      h * (h * g(0) + k * g(1) + l * g(2)) +
      k * (h * g(3) + k * g(4) + l * g(5)) +
      l * (h * g(6) + k * g(7) + l * g(8));

    expect(1 / Math.sqrt(value)).toBeCloseTo(d, 10);
  }
});

test.each(STRUCTURES)('%s: |F|² matches gemmi with the IT92 table', (name) => {
  const fixture = readFixture(name);
  const atoms = cellAtoms(
    fixture.cell,
    operationsOf(fixture.operations),
    fixture.sites,
  );
  const sites = fixture.sites.map((site) => ({
    coefficients: it92[site.element] ?? [],
    occupancy: site.occupancy,
    uiso: site.uiso,
  }));
  const rows = fixture.structureFactors;
  const hkl = new Int32Array(rows.length * 3);
  const inverseDSquared = new Float64Array(rows.length);
  let largest = 0;
  for (const [index, [h, k, l, d, expected]] of rows.entries()) {
    hkl.set([h, k, l], index * 3);
    inverseDSquared[index] = 1 / (d * d);
    largest = Math.max(largest, expected);
  }

  const factors = structureFactorsSquared(hkl, inverseDSquared, atoms, sites);

  expect(factors).toHaveLength(rows.length);

  for (const [index, row] of rows.entries()) {
    // A special position the CIF rounds (quartz, wurtzite) is put back on its
    // symmetry element here, where gemmi keeps one of its images.
    expect(Math.abs(item(factors, index) - row[4])).toBeLessThan(
      1e-4 * largest,
    );
  }
});
