import { Analysis } from 'common-spectrum';

import { parsePowDLLXY } from './parsePowDLLXY.ts';

/**
 * Creates a new Analysis element from a PowDLL XY file.
 * @param text - Text content of the XY file
 * @returns Analysis instance with the parsed XRD data
 */
export function fromPowDLLXY(text: string): Analysis {
  const parsed = parsePowDLLXY(text);
  const analysis = new Analysis();
  const variables = {
    x: {
      data: parsed.data.x,
      label: parsed.info.xUnits,
    },
    y: {
      data: parsed.data.y,
      label: parsed.info.yUnits,
    },
  };

  analysis.pushSpectrum(variables, {
    meta: parsed.meta,
    dataType: 'XRD pattern',
  });

  return analysis;
}
