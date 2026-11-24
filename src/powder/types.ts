/**
 * The unit cell: three edges in ångström, three angles in degrees.
 */
export interface UnitCell {
  a: number;
  b: number;
  c: number;
  alpha: number;
  beta: number;
  gamma: number;
}

/**
 * One atom of the asymmetric unit, as a CIF `_atom_site` loop gives it.
 */
export interface CrystalSite {
  /**
   * The chemical symbol. A charge or a trailing label is ignored (`O2-`, `Cl1`),
   * and deuterium and tritium scatter as hydrogen.
   */
  element: string;
  /**
   * Fractional coordinate along **a**.
   */
  x: number;
  /**
   * Fractional coordinate along **b**.
   */
  y: number;
  /**
   * Fractional coordinate along **c**.
   */
  z: number;
  /**
   * The chemical occupancy of the site, as `_atom_site_occupancy`.
   * @default 1
   */
  occupancy?: number;
  /**
   * The isotropic displacement parameter U in Å², as `_atom_site_U_iso_or_equiv`.
   * `null` or absent takes `defaultUiso`.
   * @default null
   */
  uiso?: number | null;
}

/**
 * A crystal structure: the cell, the symmetry operations and the asymmetric unit.
 */
export interface CrystalStructure {
  cell: UnitCell;
  /**
   * Every operation of the space group, centring included, as a CIF writes them
   * (`-x+1/2, y, -z`). Absent means P1.
   * @default ['x,y,z']
   */
  operations?: readonly string[];
  sites: readonly CrystalSite[];
}

/**
 * One reflection of a powder peak, standing for all its equivalents.
 */
export interface PowderReflection {
  /**
   * Miller indices of one of the equivalent reflections.
   */
  hkl: [number, number, number];
  /**
   * How many reflections the Laue group makes equivalent to this one.
   */
  multiplicity: number;
  /**
   * |F|², in electrons², which does not depend on the wavelength.
   */
  structureFactorSquared: number;
}

/**
 * A line of the powder pattern: reflections that diffract at the same angle.
 */
export interface PowderPeak {
  /**
   * In degrees.
   */
  twoTheta: number;
  /**
   * Interplanar spacing in Å.
   */
  d: number;
  /**
   * Integrated intensity, relative to the strongest peak at 100.
   */
  intensity: number;
  reflections: PowderReflection[];
}

/**
 * A calculated powder pattern, as a list of peaks.
 */
export interface PowderPattern {
  /**
   * In Å.
   */
  wavelength: number;
  /**
   * In degrees.
   */
  twoThetaRange: [number, number];
  /**
   * Sorted by increasing 2θ.
   */
  peaks: PowderPeak[];
}
