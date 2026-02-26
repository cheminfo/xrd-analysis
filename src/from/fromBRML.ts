import { Analysis } from 'common-spectrum';

import { readBRML } from './parseBRML.ts';

/**
 * Creates a new Analysis element from a BRML file.
 * @param blob - Binary content of the BRML file
 * @returns Analysis instance with the parsed XRD data
 */
export async function fromBRML(
  blob: ArrayBuffer | Uint8Array | Buffer | Blob,
): Promise<Analysis> {
  const parsed = await readBRML(blob);
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
