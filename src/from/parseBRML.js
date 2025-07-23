import { XMLParser } from 'fast-xml-parser';
import JSZip from 'jszip/dist/jszip.min.js';

/**
 * Parse metadata from xml file that is contained in BRML
 * @export
 * @param {string} file
 * @returns {object} containing data (x: 2theta, y: counts), info and metadata
 */
export function parseDiffractogram(file) {
  const options = {
    ignoreAttributes: false,
    attributeNamePrefix: '__',
  };
  const parser = new XMLParser(options);

  let json = parser.parse(file);
  const data = json.RawData;
  let axes =
    data.DataRoutes.DataRoute.ScanInformation.ScanAxes.ScanAxisInfo.map(
      (element) => ({
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

  let adddata = {
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

  let label = adddata.axes[0].name.replace(/two/i, '2').replace(/theta/i, 'ϴ');
  let unit = adddata.axes[0].unitBase.replace(/degree/i, '°');

  diffractogram.info.xUnits = `${label} [${unit}]`;

  return diffractogram;
}

/**
 * @param  {Array} data - array of strings of the measured points
 */
function getXYDiffractogram(data) {
  let axis1 = [];
  let axis2 = [];
  let measuredTimePerStep = [];
  let plannedTimePerStep = [];
  let counts = [];

  for (const element of data) {
    const factors = element.split(',');
    measuredTimePerStep.push(Number.parseFloat(factors[0]));
    plannedTimePerStep.push(Number.parseFloat(factors[1]));
    axis1.push(Number.parseFloat(factors[2]));
    axis2.push(Number.parseFloat(factors[3]));
    counts.push(Number.parseFloat(factors[4]));
  }

  const diffractogram = {
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
 * Read a BRML file (produced by Bruker instruments, a zip file that contains XMLs)
 * @export
 * @param {String/Array of bytes/ArrayBuffer/Uint8Array/Buffer/Blob/Promise} binary - BRML file
 * @returns {object} containing data (x: 2theta, y: counts), info and metadata
 */
export async function readBRML(binary) {
  let zip = new JSZip();
  const txt = await zip.loadAsync(binary).then((zipFiles) => {
    return zipFiles.file('Experiment0/RawData0.xml').async('text');
  });

  const diffractogram = parseDiffractogram(txt);

  return diffractogram;
}
