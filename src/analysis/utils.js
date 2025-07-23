import { kAlpha1Angstrom } from '../constants/wavelengths.js';

export function toRadians(angle) {
  return angle * (Math.PI / 180);
}

export function toDegrees(radians) {
  return (radians * 180) / Math.PI;
}

export function getLamba(anode) {
  if (!(anode in kAlpha1Angstrom)) {
    throw new Error(
      'The wavelength for the anode metal in the metadata is not defined',
    );
  }

  return kAlpha1Angstrom[anode];
}
