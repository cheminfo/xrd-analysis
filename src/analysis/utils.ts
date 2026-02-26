import { kAlpha1Angstrom } from '../constants/wavelengths.ts';

/**
 * Convert an angle from degrees to radians.
 * @param angle - Angle in degrees
 * @returns Angle in radians
 */
export function toRadians(angle: number): number {
  return angle * (Math.PI / 180);
}

/**
 * Convert an angle from radians to degrees.
 * @param radians - Angle in radians
 * @returns Angle in degrees
 */
export function toDegrees(radians: number): number {
  return (radians * 180) / Math.PI;
}

/**
 * Get X-ray wavelength for the given anode material.
 * @param anode - Anode material identifier (e.g., 'CuKa', 'MoKa')
 * @returns Wavelength in Angstrom
 */
export function getLamba(anode: string): number {
  const wavelength = kAlpha1Angstrom[anode];
  if (wavelength === undefined) {
    throw new Error(
      'The wavelength for the anode metal in the metadata is not defined',
    );
  }

  return wavelength;
}
