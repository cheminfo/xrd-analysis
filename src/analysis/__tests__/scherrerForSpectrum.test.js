import { scherrer, scherrerForSpectrum } from '../scherrerForSpectrum';

import { dummyAnalysis } from './utils.js';

test('scherrerCrystalliteSize', () => {
  const crystalliteSize = scherrer(0.94, 1.54056, 0.3, 23.3 / 2);
  expect(crystalliteSize).toBe(282.38915490482884);
});

test('scherrerForSpectrum', () => {
  let analysis = dummyAnalysis();
  let spectrum = analysis.getXYSpectrum();
  spectrum.peaks = [{ x: 23.3, y: 10, width: 0.3 }];

  const broadenings = scherrerForSpectrum(spectrum);
  expect(broadenings).toHaveLength(1);
  expect(broadenings[0].crystalliteSize).toBeCloseTo(2.82623, 2);
  spectrum.peaks.push({ x: 13.3, y: 10, width: 0.2 });

  const broadenings2 = scherrerForSpectrum(spectrum);
  expect(broadenings2).toHaveLength(2);
});
test('no peaks', () => {
  let analysis = dummyAnalysis();
  let spectrumNoPeaks = analysis.getXYSpectrum();
  expect(() => scherrerForSpectrum(spectrumNoPeaks)).toThrow(
    'There must be peaks to calculate the scherrer broadening',
  );
});
test('no anode', () => {
  let analysis = dummyAnalysis();
  let spectrum = analysis.getXYSpectrum();
  spectrum.peaks = [{ x: 23.3, y: 10, width: 0.3 }];
  delete spectrum.meta.anode;
  expect(() => scherrerForSpectrum(spectrum)).toThrow(
    'The anode metal must be available in the metadata of the spectrum',
  );
});
