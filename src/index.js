import { JSGraph as OriginalJSGraph } from 'common-spectrum';

import { getAnnotations } from './jsgraph/getAnnotations.js';

export {
  AnalysesManager,
  Analysis,
  autoPeakPicking,
  fromJcamp,
  peakPicking,
  toJcamp,
} from 'common-spectrum';

export { fromBRML } from './from/fromBRML.js';
export { fromPowDLLXY } from './from/fromPowDLLXY.js';
export { kAlpha1Angstrom } from './constants/wavelengths.js';

export {
  calculateInterplanarSpacing,
  calculateReflexes,
} from './analysis/convert.js';
export { scherrerForSpectrum } from './analysis/scherrerForSpectrum.js';
export { computeCrystallinity } from './analysis/computeCrystallinity.js';
export { generatePattern } from './analysis/generatePattern.js';

export const JSGraph = { ...OriginalJSGraph, getAnnotations };
