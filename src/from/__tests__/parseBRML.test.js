import { readFileSync } from 'fs';
import { join } from 'path';

import { parseDiffractogram, readBRML } from '../parseBRML';

describe('parseBRML', () => {
  const xml = readFileSync(
    join(__dirname, '../../../testFiles/RawData0.xml'),
    'utf8',
  );
  it('check the dictionary', () => {
    let result = parseDiffractogram(xml);
    expect(result).toHaveProperty('data');
    expect(result.data).toHaveProperty('x');
    expect(result.data).toHaveProperty('y');
    expect(result.info.xUnits).toBe('2ϴ [°]');
    expect(result.info.yUnits).toBe('counts');
    expect(result.info.dataType).toBe('XRD pattern');
    expect(result.info.origin).toBe(
      'Data converted from BRML using convert-to-jcamp',
    );
    expect(result.meta.userName).toBe('EPFL LMER SION');
    expect(result.meta).toHaveProperty('axes');
    expect(result.meta.axes).toHaveLength(2);
    expect(Object.keys(result.meta)).toHaveLength(19);
    expect(result.meta.anode).toBe('Cu');
    expect(result.data.x).toHaveLength(3714);
    expect(result.data.y).toHaveLength(3714);
    expect(result.data.x.slice(0, 3)).toStrictEqual([2, 2.0102, 2.0205]);
    expect(result.data.y.slice(0, 3)).toStrictEqual([1080, 1024, 1009]);
    expect(result.data.x[3714 - 1]).toBe(40.0099);
    expect(result.data.y[3714 - 1]).toBe(472);
  });
});

describe('readBRML', () => {
  const data = readFileSync(join(__dirname, '../../../testFiles/test.brml'));

  it('check the output dictionary', async () => {
    let result = await readBRML(data);
    expect(result).toHaveProperty('data');
    expect(result.data).toHaveProperty('x');
    expect(result.data).toHaveProperty('y');
    expect(result.info.xUnits).toBe('2ϴ [°]');
    expect(result.info.yUnits).toBe('counts');
    expect(result.info.dataType).toBe('XRD pattern');
    expect(result.info.origin).toBe(
      'Data converted from BRML using convert-to-jcamp',
    );
    expect(Object.keys(result.meta)).toHaveLength(19);
    expect(result.data.x).toHaveLength(2443);
    expect(result.data.y).toHaveLength(2443);
  });
});
