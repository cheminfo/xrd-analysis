import type { CellAtoms } from './cellAtoms.ts';
import { formFactor } from './scatteringFactor.ts';

/**
 * What a site contributes besides its position.
 */
export interface SiteScattering {
  /**
   * Form factor coefficients a1…an, b1…bn, c, see `formFactor`.
   */
  coefficients: readonly number[];
  occupancy: number;
  /**
   * Isotropic displacement parameter, in Å².
   */
  uiso: number;
}

/**
 * |F(hkl)|² of each reflection, summed over every atom of the cell:
 * F = Σ occ · f(s) · exp(−8π² U s²) · exp(2πi h·x), with s = 1/(2d).
 * @param hkl - h k l of each reflection.
 * @param inverseDSquared - 1/d² of each reflection, in Å⁻².
 * @param atoms - Every atom of the cell.
 * @param sites - The scattering of each site the atoms come from.
 * @returns |F|² in electrons², one per reflection.
 */
export function structureFactorsSquared(
  hkl: Int32Array,
  inverseDSquared: Float64Array,
  atoms: CellAtoms,
  sites: readonly SiteScattering[],
): Float64Array {
  const count = inverseDSquared.length;
  const factors = new Float64Array(count);
  const { positions } = atoms;
  const atomSites = atoms.sites;
  const coefficientSets = [...new Set(sites.map((site) => site.coefficients))];
  const coefficientIndex = sites.map((site) =>
    coefficientSets.indexOf(site.coefficients),
  );
  const formFactors = new Float64Array(coefficientSets.length);
  const weights = new Float64Array(sites.length);
  const twoPi = 2 * Math.PI;
  const debyeWaller = -8 * Math.PI * Math.PI;
  for (let reflection = 0; reflection < count; reflection++) {
    const s2 = (inverseDSquared[reflection] as number) / 4;
    for (let index = 0; index < coefficientSets.length; index++) {
      formFactors[index] = formFactor(
        coefficientSets[index] as readonly number[],
        s2,
      );
    }
    for (let index = 0; index < sites.length; index++) {
      const site = sites[index] as SiteScattering;
      weights[index] =
        site.occupancy *
        (formFactors[coefficientIndex[index] as number] as number) *
        Math.exp(debyeWaller * site.uiso * s2);
    }
    const h = hkl[reflection * 3] as number;
    const k = hkl[reflection * 3 + 1] as number;
    const l = hkl[reflection * 3 + 2] as number;
    let real = 0;
    let imaginary = 0;
    for (let atom = 0; atom < atomSites.length; atom++) {
      const phase =
        twoPi *
        (h * (positions[atom * 3] as number) +
          k * (positions[atom * 3 + 1] as number) +
          l * (positions[atom * 3 + 2] as number));
      const weight = weights[atomSites[atom] as number] as number;
      real += weight * Math.cos(phase);
      imaginary += weight * Math.sin(phase);
    }
    factors[reflection] = real * real + imaginary * imaginary;
  }
  return factors;
}
