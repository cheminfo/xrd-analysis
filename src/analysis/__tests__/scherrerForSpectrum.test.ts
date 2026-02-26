import { expect, test } from 'vitest';

import { scherrer, scherrerForSpectrum } from '../scherrerForSpectrum.ts';

import { dummyAnalysis } from './utils.ts';

test('scherrerCrystalliteSize', () => {
  const crystalliteSize = scherrer(0.94, 1.54056, 0.3, 23.3 / 2);

  expect(crystalliteSize).toBe(282.38915490482884);
});

test('scherrerForSpectrum', () => {
  const analysis = dummyAnalysis();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const spectrum: any = analysis.getXYSpectrum();
  spectrum.peaks = [{ x: 23.3, y: 10, width: 0.3 }];

  const broadenings = scherrerForSpectrum(spectrum);

  expect(broadenings).toHaveLength(1);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  expect(broadenings[0]!.crystalliteSize).toBeCloseTo(2.82623, 2);

  spectrum.peaks.push({ x: 13.3, y: 10, width: 0.2 });

  const broadenings2 = scherrerForSpectrum(spectrum);

  expect(broadenings2).toHaveLength(2);
});

test('no peaks', () => {
  const analysis = dummyAnalysis();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const spectrumNoPeaks: any = analysis.getXYSpectrum();

  expect(() => scherrerForSpectrum(spectrumNoPeaks)).toThrowError(
    'There must be peaks to calculate the scherrer broadening',
  );
});

test('no anode', () => {
  const analysis = dummyAnalysis();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const spectrum: any = analysis.getXYSpectrum();
  spectrum.peaks = [{ x: 23.3, y: 10, width: 0.3 }];
  delete spectrum.meta.anode;

  expect(() => scherrerForSpectrum(spectrum)).toThrowError(
    'The anode metal must be available in the metadata of the spectrum',
  );
});
