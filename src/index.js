import { JSGraph as OriginalJSGraph } from 'common-spectrum';

import { getAnnotations } from './jsgraph/getAnnotations';

export {
  AnalysesManager,
  Analysis,
  autoPeakPicking,
  fromJcamp,
  peakPicking,
  toJcamp,
} from 'common-spectrum';

export { fromBRML } from './from/fromBRML';
export { fromPowDLLXY } from './from/fromPowDLLXY';
export { kAlpha1Angstrom } from './constants/wavelengths';

export {
  calculateInterplanarSpacing,
  calculateReflexes,
} from './analysis/convert';
export { scherrerForSpectrum } from './analysis/scherrerForSpectrum';
export { computeCrystallinity } from './analysis/computeCrystallinity';
export { generatePattern } from './analysis/generatePattern';

export const JSGraph = { ...OriginalJSGraph, getAnnotations };
