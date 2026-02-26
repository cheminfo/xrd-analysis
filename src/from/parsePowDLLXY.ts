interface PowDLLMeta {
  id: string;
  comment: string;
  userName: string;
  anode: string;
  scanType: string;
  timePerStep: number;
}

interface PowDLLDiffractogram {
  data: { x: number[]; y: number[] };
  info: {
    xUnits: string;
    yUnits: string;
    dataType: string;
    origin: string;
  };
  meta: PowDLLMeta;
}

/**
 * Parse diffractograms saved in xy files that are generated with PowDLL.
 * @param text - Text containing the data
 * @returns Object containing data (x: 2theta, y: counts), info and metadata
 */
export function parsePowDLLXY(text: string): PowDLLDiffractogram {
  const lines = text.split(/\r?\n/).filter((line) => !line.match(/^\s*$/));
  const [header, ...dataLines] = lines;
  if (!header) {
    throw new Error('Empty PowDLL XY file');
  }
  const data: { x: number[]; y: number[] } = {
    x: [],
    y: [],
  };
  for (const line of dataLines) {
    const [xValue, yValue] = line.split(/\s+/);
    data.x.push(Number.parseFloat((xValue as string).trim()));
    data.y.push(Number.parseFloat((yValue as string).trim()));
  }
  const headerLines = header.split('" ');

  // try to make metadata consistent with Bruker
  const meta: PowDLLMeta = {
    id: trimReplace(headerLines[0] as string),
    comment: trimReplace(headerLines[1] as string),
    userName: trimReplace(headerLines[2] as string),
    anode: trimReplace(headerLines[3] as string),
    scanType: trimReplace(headerLines[4] as string),
    timePerStep: Number.parseInt(trimReplace(headerLines[5] as string), 10),
  };

  const diffractogram: PowDLLDiffractogram = {
    data: { x: data.x, y: data.y },
    info: {
      xUnits: '2ϴ [°]',
      yUnits: 'counts',
      dataType: 'XRD pattern',
      origin: 'Data converted from xy using convert-to-jcamp',
    },
    meta,
  };

  return diffractogram;
}

function trimReplace(string: string): string {
  const parts = string.split(':');
  return (parts[1] ?? '').replace('"', '').replace("'", '').trim();
}
