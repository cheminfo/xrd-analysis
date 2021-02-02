import { kAlpha1Angstrom } from '../constants/wavelengths';

export function toRadians(angle) {
  return angle * (Math.PI / 180);
}

export function getLamba(anode) {
  if (!(anode in kAlpha1Angstrom)) {
    throw new Error(
      'The wavelength for the anode metal in the metadata is not defined',
    );
  }

  return kAlpha1Angstrom[anode];
}
