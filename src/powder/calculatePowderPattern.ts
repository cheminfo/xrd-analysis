import { kAlpha1Angstrom } from '../constants/wavelengths.ts';

import { cellAtoms } from './cellAtoms.ts';
import { uniqueReflections } from './reflections.ts';
import { coefficientsOf, scatteringElement } from './scatteringFactor.ts';
import { structureFactorsSquared } from './structureFactors.ts';
import { parseSymmetryOperation } from './symmetryOperation.ts';
import type {
  CrystalStructure,
  PowderPattern,
  PowderPeak,
  PowderReflection,
} from './types.ts';

/**
 * Options of {@link calculatePowderPattern}.
 */
export interface PowderPatternOptions {
  /**
   * The X-ray wavelength, in Å.
   * @default 1.54056 (Cu Kα1)
   */
  wavelength?: number;
  /**
   * The 2θ range of the pattern, in degrees.
   * @default [0, 90]
   */
  twoThetaRange?: [number, number];
  /**
   * The isotropic displacement U, in Å², of a site that gives none
   * (B = 8π²U ≈ 1.6 Å²).
   * @default 0.02
   */
  defaultUiso?: number;
  /**
   * Peaks weaker than this, the strongest being 100, are left out.
   * @default 0.001
   */
  minIntensity?: number;
}

/**
 * Reflections whose 2θ differ by less than this, in degrees, are one peak.
 */
const SAME_ANGLE = 1e-5;

/**
 * The X-ray powder pattern of a crystal structure, as a list of peaks.
 *
 * Each peak sums its reflections' m·|F|²·Lp, with the form factors of the
 * neutral atoms (Waasmaier & Kirfel), an isotropic Debye–Waller factor per site
 * and the Lorentz-polarization factor of an unpolarized beam,
 * (1 + cos² 2θ) / (sin² θ cos θ). Anomalous dispersion, absorption and
 * preferred orientation are not modelled.
 * @param structure - The cell, the symmetry operations and the asymmetric unit.
 * @param options - Wavelength, range and thresholds.
 * @returns The peaks, by increasing 2θ, the strongest at 100.
 */
export function calculatePowderPattern(
  structure: CrystalStructure,
  options: PowderPatternOptions = {},
): PowderPattern {
  const {
    wavelength = kAlpha1Angstrom.CuKa1,
    twoThetaRange = [0, 90],
    defaultUiso = 0.02,
    minIntensity = 0.001,
  } = options;
  const [from, to] = twoThetaRange;
  const operations = (structure.operations ?? ['x,y,z']).map((operation) =>
    parseSymmetryOperation(operation),
  );
  const dMin = wavelength / (2 * Math.sin((Math.min(to, 180) * Math.PI) / 360));
  const dMax =
    from > 0 ? wavelength / (2 * Math.sin((from * Math.PI) / 360)) : Infinity;
  const reflections = uniqueReflections(structure.cell, operations, dMin, dMax);
  const atoms = cellAtoms(structure.cell, operations, structure.sites);
  const sites = structure.sites.map((site) => ({
    coefficients: coefficientsOf(scatteringElement(site.element)),
    occupancy: site.occupancy ?? 1,
    uiso: site.uiso ?? defaultUiso,
  }));
  const factors = structureFactorsSquared(
    reflections.hkl,
    reflections.inverseDSquared,
    atoms,
    sites,
  );
  const lines = toLines(reflections, factors, wavelength);
  return {
    wavelength,
    twoThetaRange: [from, to],
    peaks: toPeaks(lines, minIntensity),
  };
}

interface Line {
  twoTheta: number;
  d: number;
  intensity: number;
  reflection: PowderReflection;
}

function toLines(
  reflections: ReturnType<typeof uniqueReflections>,
  factors: Float64Array,
  wavelength: number,
): Line[] {
  const { hkl, multiplicity, inverseDSquared } = reflections;
  const lines: Line[] = [];
  for (let index = 0; index < factors.length; index++) {
    const d = 1 / Math.sqrt(inverseDSquared[index] as number);
    const sinTheta = Math.min(1, wavelength / (2 * d));
    const theta = Math.asin(sinTheta);
    const cos2Theta = Math.cos(2 * theta);
    const lorentzPolarization =
      (1 + cos2Theta * cos2Theta) / (sinTheta * sinTheta * Math.cos(theta));
    const factor = factors[index] as number;
    const count = multiplicity[index] as number;
    lines.push({
      twoTheta: (360 * theta) / Math.PI,
      d,
      intensity: count * factor * lorentzPolarization,
      reflection: {
        hkl: [
          hkl[index * 3] as number,
          hkl[index * 3 + 1] as number,
          hkl[index * 3 + 2] as number,
        ],
        multiplicity: count,
        structureFactorSquared: factor,
      },
    });
  }
  return lines.toSorted((left, right) => left.twoTheta - right.twoTheta);
}

function toPeaks(lines: Line[], minIntensity: number): PowderPeak[] {
  let strongestLine = 0;
  for (const line of lines) {
    if (line.intensity > strongestLine) strongestLine = line.intensity;
  }
  const absent = strongestLine * 1e-12;
  const peaks: PowderPeak[] = [];
  for (const line of lines) {
    if (line.intensity <= absent) continue;
    const last = peaks.at(-1);
    if (last && line.twoTheta - last.twoTheta < SAME_ANGLE) {
      last.intensity += line.intensity;
      last.reflections.push(line.reflection);
      continue;
    }
    peaks.push({
      twoTheta: line.twoTheta,
      d: line.d,
      intensity: line.intensity,
      reflections: [line.reflection],
    });
  }
  let strongest = 0;
  for (const peak of peaks) {
    if (peak.intensity > strongest) strongest = peak.intensity;
  }
  const kept: PowderPeak[] = [];
  for (const peak of peaks) {
    peak.intensity = (peak.intensity / strongest) * 100;
    if (peak.intensity >= minIntensity) kept.push(peak);
  }
  return kept;
}
