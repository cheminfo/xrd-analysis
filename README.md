# xrd-analysis

[![NPM version][npm-image]][npm-url]
[![build status][ci-image]][ci-url]
[![npm download][download-image]][download-url]

Parse Bruker and PowDLL PXRD files.
Perform basic analysis such as computing the crystallinity or crystallite width.
Calculate the powder pattern of a crystal structure.

## Installation

`$ npm i xrd-analysis`

## Usage

```js
import { fromBRML } from 'xrd-analysis';

const analysis = await fromBRML(brmlFile);
```

### Powder pattern of a crystal structure

```js
import {
  calculatePowderPattern,
  kAlpha1Angstrom,
  powderPatternToXY,
} from 'xrd-analysis';

// Caesium chloride, written in P1: both atoms of the cell are listed.
const pattern = calculatePowderPattern(
  {
    cell: { a: 4.123, b: 4.123, c: 4.123, alpha: 90, beta: 90, gamma: 90 },
    sites: [
      { element: 'Cs', x: 0, y: 0, z: 0, uiso: 0.02 },
      { element: 'Cl', x: 0.5, y: 0.5, z: 0.5, uiso: 0.02 },
    ],
  },
  { wavelength: kAlpha1Angstrom.CuKa1, twoThetaRange: [10, 60] },
);
// pattern.peaks, 2θ and intensity: 21.54° 38.4, 30.64° 100, 37.76° 11.6,
// 43.88° 16.2, 49.39° 15.1, 54.47° 30.5

// A profile to draw, with the Cu Kα2 doublet.
const { x, y } = powderPatternToXY(pattern, {
  fwhm: 0.1,
  alpha2: { wavelength: kAlpha1Angstrom.CuKa2 },
});
```

From a CIF, pass the cell, every symmetry operation as written in
`_space_group_symop_operation_xyz`, and the `_atom_site` loop (`element`, `x`,
`y`, `z`, `occupancy`, `uiso`). With the operations, the asymmetric unit is
enough, and each peak lists one reflection per set of equivalents with its
multiplicity.

Each peak sums m·|F|²·Lp over its reflections, with:

- the form factors of the neutral atoms fitted by
  [Waasmaier & Kirfel (1995)](https://doi.org/10.1107/S0108767394013292);
- an isotropic Debye–Waller factor per site (`defaultUiso`, 0.02 Å², when a
  site gives none);
- the Lorentz-polarization factor of an unpolarized beam.

Anomalous dispersion, absorption and preferred orientation are not modelled.
Positions match pymatgen to 10⁻⁹°, and |F|² matches gemmi to 10⁻⁴ of the
strongest reflection.

## [API Documentation](https://cheminfo.github.io/xrd-analysis/)

## License

[MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/xrd-analysis.svg
[npm-url]: https://www.npmjs.com/package/xrd-analysis
[ci-image]: https://github.com/cheminfo/xrd-analysis/workflows/Node.js%20CI/badge.svg?branch=main
[ci-url]: https://github.com/cheminfo/xrd-analysis/actions?query=workflow%3A%22Node.js+CI%22
[download-image]: https://img.shields.io/npm/dm/xrd-analysis.svg
[download-url]: https://www.npmjs.com/package/xrd-analysis
