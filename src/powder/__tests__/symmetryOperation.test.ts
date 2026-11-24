import { expect, test } from 'vitest';

import { parseSymmetryOperation } from '../symmetryOperation.ts';

test('the identity', () => {
  const { rotation, translation } = parseSymmetryOperation('x,y,z');

  expect(Array.from(rotation)).toStrictEqual([1, 0, 0, 0, 1, 0, 0, 0, 1]);
  expect(Array.from(translation)).toStrictEqual([0, 0, 0]);
});

test('a hexagonal screw axis', () => {
  const { rotation, translation } = parseSymmetryOperation('-y, x-y, z+2/3');

  expect(Array.from(rotation)).toStrictEqual([0, -1, 0, 1, -1, 0, 0, 0, 1]);
  expect(translation[0]).toBe(0);
  expect(translation[1]).toBe(0);
  expect(translation[2]).toBeCloseTo(2 / 3, 15);
});

test('translations written first, in capitals', () => {
  const { rotation, translation } = parseSymmetryOperation('1/2+X,1/2-Y,-Z');

  expect(Array.from(rotation)).toStrictEqual([1, 0, 0, 0, -1, 0, 0, 0, -1]);
  expect(Array.from(translation)).toStrictEqual([0.5, 0.5, 0]);
});

test('decimal translations and a negative one', () => {
  const { rotation, translation } = parseSymmetryOperation('0.5-x, -y-1/2, +z');

  expect(Array.from(rotation)).toStrictEqual([-1, 0, 0, 0, -1, 0, 0, 0, 1]);
  expect(Array.from(translation)).toStrictEqual([0.5, -0.5, 0]);
});

test('an operation without three parts throws', () => {
  expect(() => parseSymmetryOperation('x,y')).toThrow(
    'Symmetry operation "x,y" does not have three parts',
  );
  expect(() => parseSymmetryOperation('x,y,')).toThrow(
    'Symmetry operation "x,y," has an empty part',
  );
  expect(() => parseSymmetryOperation('x,y,q/2')).toThrow(
    'Symmetry operation "x,y,q/2" has an unreadable term',
  );
});
