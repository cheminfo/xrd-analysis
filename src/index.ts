import { JSGraph as OriginalJSGraph } from 'common-spectrum';

import { getAnnotations } from './jsgraph/getAnnotations.ts';

export {
  AnalysesManager,
  Analysis,
  autoPeakPicking,
  fromJcamp,
  peakPicking,
  toJcamp,
} from 'common-spectrum';

export { fromBRML } from './from/fromBRML.ts';
export { fromPowDLLXY } from './from/fromPowDLLXY.ts';
export { kAlpha1Angstrom } from './constants/wavelengths.ts';

export {
  calculateInterplanarSpacing,
  calculateReflexes,
} from './analysis/convert.ts';
export { scherrerForSpectrum } from './analysis/scherrerForSpectrum.ts';
export { computeCrystallinity } from './analysis/computeCrystallinity.ts';
export { generatePattern } from './analysis/generatePattern.ts';

export const JSGraph: typeof OriginalJSGraph & {
  getAnnotations: typeof getAnnotations;
} = { ...OriginalJSGraph, getAnnotations };
