import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { describe, expect, it } from 'vitest';

import { parsePowDLLXY } from '../parsePowDLLXY.js';

describe('parseXY', () => {
  const xy = readFileSync(
    join(__dirname, '../../../testFiles/MG1-Cu2O-28_bg_subtracted.xy'),
    'utf8',
  );

  it('check the dictionary', () => {
    const diffractogram = parsePowDLLXY(xy);

    expect(diffractogram.meta.userName).toBe('Lab Manager');
    expect(diffractogram.data.x[0]).toBe(10);
    expect(diffractogram.data.y[1]).toBe(-0.0755227112146954);
    expect(diffractogram.data.x[3448]).toBe(70.0050142705441);
    expect(diffractogram.data.y[3448]).toBe(0);
    expect(diffractogram.data.x).toHaveLength(3449);
    expect(diffractogram.data.y).toHaveLength(3449);
    expect(diffractogram.info.origin).toBe(
      'Data converted from xy using convert-to-jcamp',
    );
  });
});
