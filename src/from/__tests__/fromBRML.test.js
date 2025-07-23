import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { expect, test } from 'vitest';

import { fromBRML } from '../fromBRML.js';

test('fromBRML', async () => {
  let brml = readFileSync(join(__dirname, '../../../testFiles/test.brml'));
  let analysis = await fromBRML(brml);

  let spectrum = analysis.getXYSpectrum();

  expect(spectrum.variables.x.data).toHaveLength(2443);
  expect(spectrum.variables.y.data).toHaveLength(2443);
  expect(spectrum.variables.x.label).toBe('2ϴ');
  expect(spectrum.variables.x.units).toBe('°');
  expect(spectrum.variables.y.label).toBe('counts');
  expect(spectrum.variables.y.units).toBeUndefined();
});
