import { XMLParser } from 'fast-xml-parser';
import JSZip from 'jszip';

interface BRMLAxis {
  id: string;
  name: string;
  unitBase: string;
  unitPrefix: string;
  reference: unknown;
  start: unknown;
  stop: unknown;
  increment: unknown;
}

interface BRMLDiffractogram {
  data: { x: number[]; y: number[] };
  info: {
    xUnits: string;
    yUnits: string;
    dataType: string;
    origin: string;
  };
  meta: Record<string, unknown>;
}

/**
 * Parse metadata from xml file that is contained in BRML.
 * @param file - XML string from the BRML archive
 * @returns Object containing data (x: 2theta, y: counts), info and metadata
 */

export function parseDiffractogram(file: string): BRMLDiffractogram {
  const options = {
    ignoreAttributes: false,
    attributeNamePrefix: '__',
  };
  const parser = new XMLParser(options);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const json: any = parser.parse(file);
  const data = json.RawData;
  const axes: BRMLAxis[] =
    data.DataRoutes.DataRoute.ScanInformation.ScanAxes.ScanAxisInfo.map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (element: any) => ({
        id: element.__AxisId,
        name: element.__AxisName,
        unitBase: element.Unit.__Base,
        unitPrefix: element.Unit.__Prefix,
        reference: element.reference,
        start: element.start,
        stop: element.stop,
        increment: element.increment,
      }),
    );

  const adddata = {
    startTime: data.TimeStampStarted,
    endTime: data.TimeStampFinished,
    measurmentPoints:
      data.DataRoutes.DataRoute.ScanInformation.MeasurementPoints,
    timePerStep: data.DataRoutes.DataRoute.ScanInformation.TimePerStep,
    timePerStepEffective:
      data.DataRoutes.DataRoute.ScanInformation.TimePerStepEffective,
    scanMode: data.DataRoutes.DataRoute.ScanInformation.ScanMode,
    scanModeVisibleName:
      data.DataRoutes.DataRoute.ScanInformation.ScanModeVisibleName,
    userName: data.Identifier.__UserName,
    machineName: data.Identifier.__MachineName,
    guid: data.Identifier.Guid,
    axes,
    goniometerType: data.FixedInformation.Instrument.GoniometerType,

    anode:
      data.FixedInformation.Instrument.PrimaryTracks.TrackInfoData.MountedOptics
        .InfoData[0].Tube.TubeMaterial,
    anodeVoltage:
      data.FixedInformation.Instrument.PrimaryTracks.TrackInfoData.MountedOptics
        .InfoData[0].Tube.Generator.Voltage.__Value,
    anodeVoltageUnit:
      data.FixedInformation.Instrument.PrimaryTracks.TrackInfoData.MountedOptics
        .InfoData[0].Tube.Generator.Voltage.__Unit,
    anodeSerialNumber:
      data.FixedInformation.Instrument.PrimaryTracks.TrackInfoData.MountedOptics
        .InfoData[0].Tube.SerialNumber.__Value,
  };

  const diffractogram = getXYDiffractogram(data.DataRoutes.DataRoute.Datum);

  diffractogram.meta = { ...adddata, ...diffractogram.meta };

  const firstAxis = axes[0];
  if (!firstAxis) {
    throw new Error('No axis information found in BRML file');
  }
  const label = firstAxis.name.replace(/two/i, '2').replace(/theta/i, 'ϴ');
  const unit = firstAxis.unitBase.replace(/degree/i, '°');

  diffractogram.info.xUnits = `${label} [${unit}]`;

  return diffractogram;
}

/**
 * Parse measured data points into an XY diffractogram.
 * @param data - Array of comma-separated strings of measured points
 * @returns Diffractogram object
 */
function getXYDiffractogram(data: string[]): BRMLDiffractogram {
  const axis1: number[] = [];
  const axis2: number[] = [];
  const measuredTimePerStep: number[] = [];
  const plannedTimePerStep: number[] = [];
  const counts: number[] = [];

  for (const element of data) {
    const [measuredTime, plannedTime, a1, a2, count] = element.split(',');
    measuredTimePerStep.push(Number.parseFloat(measuredTime as string));
    plannedTimePerStep.push(Number.parseFloat(plannedTime as string));
    axis1.push(Number.parseFloat(a1 as string));
    axis2.push(Number.parseFloat(a2 as string));
    counts.push(Number.parseFloat(count as string));
  }

  const diffractogram: BRMLDiffractogram = {
    data: { x: axis1, y: counts },
    info: {
      xUnits: '2ϴ [°]',
      yUnits: 'counts',
      dataType: 'XRD pattern',
      origin: 'Data converted from BRML using convert-to-jcamp',
    },
    meta: {
      axis2,
      measuredTimePerStep,
      plannedTimePerStep,
    },
  };

  return diffractogram;
}

/**
 * Read a BRML file (produced by Bruker instruments, a zip file that contains XMLs).
 * @param binary - BRML file as ArrayBuffer, Uint8Array, Buffer, Blob, or similar
 * @returns Object containing data (x: 2theta, y: counts), info and metadata
 */
export async function readBRML(
  binary: ArrayBuffer | Uint8Array | Buffer | Blob,
): Promise<BRMLDiffractogram> {
  const zip = new JSZip();
  const txt = await zip.loadAsync(binary).then((zipFiles) => {
    const file = zipFiles.file('Experiment0/RawData0.xml');
    if (!file) {
      throw new Error('Experiment0/RawData0.xml not found in BRML archive');
    }
    return file.async('text');
  });

  const diffractogram = parseDiffractogram(txt);

  return diffractogram;
}
