import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { expect, test } from 'vitest';

import { fromBRML, fromJcamp, toJcamp } from '../index.ts';

test('xrdAnalysis', async () => {
  const blob = readFileSync(join(import.meta.dirname, 'data/test.brml'));
  const analysis = await fromBRML(blob);

  const jcamp = toJcamp(analysis);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const newAnalysis = fromJcamp(jcamp).getXYSpectrum()!;

  expect(newAnalysis.variables.x.data).toHaveLength(2443);
  expect(newAnalysis.variables.y.data).toHaveLength(2443);
  expect(newAnalysis.dataType).toBe('XRD pattern');
  expect(newAnalysis.variables.x.label).toBe('2ϴ');
  expect(newAnalysis.variables.y.label).toBe('counts');
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  expect(newAnalysis.meta!.scanMode).toBe('PsdFastScan');
});
