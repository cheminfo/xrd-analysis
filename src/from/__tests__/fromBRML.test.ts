import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { expect, test } from 'vitest';

import { fromBRML } from '../fromBRML.ts';

test('fromBRML', async () => {
  const brml = readFileSync(join(import.meta.dirname, 'data/test.brml'));
  const analysis = await fromBRML(brml);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const spectrum = analysis.getXYSpectrum()!;

  expect(spectrum.variables.x.data).toHaveLength(2443);
  expect(spectrum.variables.y.data).toHaveLength(2443);
  expect(spectrum.variables.x.label).toBe('2ϴ');
  expect(spectrum.variables.x.units).toBe('°');
  expect(spectrum.variables.y.label).toBe('counts');
  expect(spectrum.variables.y.units).toBeUndefined();
});
