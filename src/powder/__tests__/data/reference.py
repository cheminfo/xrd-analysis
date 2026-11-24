"""Reference data for xrd-analysis' powder pattern calculation.

- wk.json: Waasmaier-Kirfel coefficients of the neutral atoms, from xraydb.
- f0.json: xraydb's f0 at a few sin(theta)/lambda, to check the table.
- <name>.json per CIF: the asymmetric unit as gemmi reads it, structure
  factors from gemmi (IT92 table) and the pattern from pymatgen.

wk.json feeds src/powder/waasmaierKirfel.ts. Run in a container with
`pip install pymatgen xraydb gemmi`, from this folder:
  python reference.py . .
"""

import glob
import json
import lzma
import math
import os
import sqlite3
import sys

import gemmi
import numpy as np
import xraydb
from pymatgen.analysis.diffraction.xrd import XRDCalculator
from pymatgen.io.cif import CifParser

WAVELENGTH = 1.54056
TWO_THETA = (5, 90)
out_dir = sys.argv[2]
os.makedirs(out_dir, exist_ok=True)


def decode(blob):
    return json.loads(lzma.decompress(blob).decode())


db_file = glob.glob(os.path.join(os.path.dirname(xraydb.__file__), '*.sqlite'))[0]
db = sqlite3.connect(db_file)
wk = {}
for element, ion, offset, scale, exponents in db.execute(
    'select element, ion, offset, scale, exponents from Waasmaier order by atomic_number'
):
    if element != ion:
        continue
    wk[element] = [*decode(scale), *decode(exponents), offset]
json.dump(wk, open(os.path.join(out_dir, 'wk.json'), 'w'))

f0 = {}
for element in ['H', 'C', 'O', 'Na', 'Cl', 'Ca', 'Cu', 'Ba', 'U']:
    q = [0, 0.1, 0.25, 0.5, 1, 2]
    f0[element] = {'s': q, 'f0': [float(v) for v in xraydb.f0(element, q)]}
json.dump(f0, open(os.path.join(out_dir, 'f0.json'), 'w'))

it92 = {}
for cif in sorted(glob.glob(os.path.join(sys.argv[1], '*.cif'))):
    name = os.path.basename(cif)[:-4]
    small = gemmi.read_small_structure(cif)
    small.setup_cell_images()
    cell = small.cell
    doc = gemmi.cif.read(cif)
    block = doc.sole_block()
    operations = list(block.find_values('_space_group_symop_operation_xyz')) or list(
        block.find_values('_symmetry_equiv_pos_as_xyz')
    )
    operations = [gemmi.cif.as_string(op) for op in operations]
    sites = []
    for site in small.sites:
        element = site.element.name
        it92[element] = site.element.it92.get_coefs()
        sites.append(
            {
                'label': site.label,
                'element': element,
                'x': site.fract.x,
                'y': site.fract.y,
                'z': site.fract.z,
                'occupancy': site.occ,
                'uiso': site.u_iso,
            }
        )

    # gemmi's own expansion of the cell, special positions merged, then its
    # structure factor calculator on that P1 cell (isotropic U only).
    all_sites = small.get_all_unit_cell_sites()
    p1 = gemmi.SmallStructure()
    p1.cell = cell
    p1.spacegroup_hm = 'P 1'
    for site in all_sites:
        site.aniso = gemmi.SMat33d(0, 0, 0, 0, 0, 0)
        p1.add_site(site)
    p1.setup_cell_images()
    calc = gemmi.StructureFactorCalculatorX(p1.cell)
    d_min = WAVELENGTH / (2 * math.sin(math.radians(TWO_THETA[1] / 2)))
    hkls = []
    limits = [int(abs(v) / d_min) + 1 for v in (cell.a, cell.b, cell.c)]
    for h in range(-limits[0], limits[0] + 1):
        for k in range(-limits[1], limits[1] + 1):
            for l in range(-limits[2], limits[2] + 1):
                if (h, k, l) == (0, 0, 0):
                    continue
                if (h, k, l) < (0, 0, 0):
                    continue
                d = cell.calculate_d([h, k, l])
                if d >= d_min:
                    hkls.append((d, h, k, l))
    hkls.sort(reverse=True)
    factors = []
    for d, h, k, l in hkls[:400]:
        value = calc.calculate_sf_from_small_structure(p1, [h, k, l])
        factors.append([h, k, l, d, abs(value) ** 2])

    structure = CifParser(cif).parse_structures(primitive=False)[0]
    pattern = XRDCalculator(wavelength=WAVELENGTH).get_pattern(
        structure, scaled=True, two_theta_range=TWO_THETA
    )
    peaks = [
        {'twoTheta': float(x), 'intensity': float(y), 'd': float(d)}
        for x, y, d in zip(pattern.x, pattern.y, pattern.d_hkls)
    ]

    json.dump(
        {
            'name': name,
            'cell': {
                'a': cell.a,
                'b': cell.b,
                'c': cell.c,
                'alpha': cell.alpha,
                'beta': cell.beta,
                'gamma': cell.gamma,
            },
            'operations': operations,
            'sites': sites,
            'cellAtoms': len(all_sites),
            'structureFactors': factors,
            'pymatgen': peaks,
        },
        open(os.path.join(out_dir, f'{name}.json'), 'w'),
        indent=1,
    )
    print(name, len(operations), 'ops', len(sites), 'sites', len(all_sites), 'in cell', len(factors), 'F', len(peaks), 'peaks')

json.dump(it92, open(os.path.join(out_dir, 'it92.json'), 'w'))
print(len(wk), 'WK elements')
