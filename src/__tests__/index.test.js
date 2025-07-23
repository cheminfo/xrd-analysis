import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { expect, test } from 'vitest';

import { fromBRML, fromJcamp, toJcamp } from '..';

test('xrdAnalysis', async () => {
  let blob = readFileSync(join(__dirname, '../../testFiles/test.brml'));
  let analysis = await fromBRML(blob);

  let jcamp = toJcamp(analysis);

  let newAnalysis = fromJcamp(jcamp).getXYSpectrum();

  expect(newAnalysis.variables.x.data).toHaveLength(2443);
  expect(newAnalysis.variables.y.data).toHaveLength(2443);
  expect(newAnalysis.dataType).toBe('XRD pattern');
  expect(newAnalysis.variables.x.label).toBe('2ϴ');
  expect(newAnalysis.variables.y.label).toBe('counts');
  expect(newAnalysis.meta.scanMode).toBe('PsdFastScan');
});
